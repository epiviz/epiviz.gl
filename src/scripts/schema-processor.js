import { rgbStringToHex, scale, colorSpecifierToHex } from "./utilities";

const d3 = require("d3-scale-chromatic");
const axios = require("axios");

// Default channel values of schema which is passed to webgl drawer
const DEFAULT_CHANNELS = Object.freeze({
  size: {
    value: 5,
    numComponents: 1,
    type: "float",
  },
  color: {
    value: 255 ** 3,
    numComponents: 1,
    type: "float",
  },
  x: {
    value: 0,
    numComponents: 2,
    type: "vec2",
  },
  y: {
    value: 0,
    numComponents: 2,
    type: "vec2",
  },
  opacity: {
    value: 1,
    numComponents: 1,
    type: "float",
  },
  shape: {
    value: "dot",
    numComponents: null,
    type: null, // Will not interact with shader code
  },
});

const DEFAULT_MAX_SIZE = 20;
const DEFAULT_COLOR_SCHEME = "interpolateBrBG";

const SHAPES = ["dot", "triangle", "circle", "diamond"];

class SchemaProcessor {
  constructor(schema, callback) {
    this.index = 0;
    this.schema = schema;
    if (Array.isArray(schema.defaultData)) {
      this.data = schema.defaultData;
    } else if (typeof schema.defaultData === "string") {
      this.dataPromise = axios.get(schema.defaultData).then((response) => {
        this.data = response.data.split("\n");
      });
    }
    this.tracks = schema.tracks.map((track) => new Track(this, track));

    const allPromises = this.tracks
      .map((track) => track.dataPromise)
      .filter((p) => p);
    if (this.dataPromise) {
      allPromises.push(this.dataPromise);
    }

    // When all tracks have acquired their data, call the callback
    // TODO: Allow tracks to be processed while waiting for others, need to keep in mind order
    Promise.all(allPromises).then(() => callback(this));
  }

  getNextTrack() {
    if (this.index >= this.tracks.length) {
      return null;
    }
    return this.tracks[this.index++];
  }
}

class Track {
  constructor(schema, track) {
    this.track = track;
    this.index = 1; // Start at 1 to skip headers

    if (Array.isArray(track.data)) {
      // Track has its own inline data
      this.data = track.data;
      this.processHeadersAndMappers();
      this.hasOwnData = true;
    } else if (typeof track.data === "string") {
      // Track has its own data to GET
      this.dataPromise = axios.get(track.data).then((response) => {
        this.data = response.data.split("\n");
        this.processHeadersAndMappers();
        this.hasOwnData = true;
      });
    } else if (schema.data) {
      // Track does not have its own data, but the schema has default data
      this.data = schema.data;
      this.processHeadersAndMappers();
    } else if (schema.dataPromise) {
      // Track does not have its own data, but the schema is GETting default data
      schema.dataPromise.then(() => {
        this.data = schema.data;
        this.processHeadersAndMappers();
      });
    } else {
      console.error(
        `Could not find data (no defaultData in schema and no data specified for this track) for track ${track}.`
      );
    }
  }

  processHeadersAndMappers() {
    // Processing headers
    this.headers = this.data[0].split(",");

    // Creating channel mappers
    this.channelMaps = new Map();
    Object.keys(DEFAULT_CHANNELS).forEach((channel) => {
      this.channelMaps.set(channel, this.buildMapperForChannel(channel));
    });
  }

  getNextDataPoint() {
    if (this.index >= this.data.length) {
      return null;
    }

    const toReturn = { geometry: { coordinates: [] } };
    const currRow = this.data[this.index++];
    const splitted = currRow.split(",");
    this.headers.forEach((header, index) => {
      toReturn[header] = splitted[index];
    });

    toReturn.geometry.coordinates.push(this.channelMaps.get("x")(splitted));
    toReturn.geometry.coordinates.push(this.channelMaps.get("y")(splitted));
    return toReturn;
  }

  getNextMark() {
    if (this.index >= this.data.length) {
      return null;
    }
    const toReturn = {};
    const currRow = this.data[this.index++];
    const splitted = currRow.split(",");

    this.channelMaps.forEach((mapper, channel) => {
      toReturn[channel] = mapper(splitted);
    });

    return toReturn;
  }

  buildMapperForChannel = (channel) => {
    if (channel in this.track) {
      const channelInfo = this.track[channel];
      if ("value" in channelInfo) {
        if (channel === "color") {
          channelInfo.value = colorSpecifierToHex(channelInfo.value);
        }
        return () => channelInfo.value;
      } else {
        const attributeIndex = this.headers.indexOf(channelInfo.attribute);
        let attrMapper;

        if (channelInfo.type === "quantitative") {
          attrMapper = buildMapperForQuantitiveChannel(channel, channelInfo);
        } else if (channelInfo.type === "categorical") {
          attrMapper = buildMapperForCategoricalChannel(channel, channelInfo);
        }
        return (row) => attrMapper(row[attributeIndex]);
      }
    } else {
      return () => DEFAULT_CHANNELS[channel].value;
    }
  };
}

const buildMapperForQuantitiveChannel = (channel, channelInfo) => {
  switch (channel) {
    case "x":
    case "y":
      // Map x and y to itself, but we need a function to do it
      return (coord) => parseFloat(coord);
    case "opacity":
      return scale(channelInfo.domain, [0, 1]);
    case "size":
      return scale(channelInfo.domain, [
        0,
        channelInfo.maxSize || DEFAULT_MAX_SIZE,
      ]);
    case "color":
      const d3colorScale =
        !channelInfo.colorScheme || !(channelInfo.colorScheme in d3)
          ? d3[DEFAULT_COLOR_SCHEME]
          : d3[channelInfo.colorScheme];
      const zeroToOneScale = scale(channelInfo.domain, [0, 1]);
      return (attrValue) =>
        rgbStringToHex(d3colorScale(zeroToOneScale(attrValue)));
    default:
      console.error(
        `${channel} is not a supported channel for quantitative attributes!`
      );
  }
};

const buildMapperForCategoricalChannel = (channel, channelInfo) => {
  const categoryTracker = new Map();
  let channelScale;
  switch (channel) {
    case "x":
    case "y":
      channelScale = scale([0, channelInfo.cardinality], [-1, 1]);
      break;
    case "opacity":
      channelScale = scale([0, channelInfo.cardinality], [0, 1]);
    case "size":
      channel = scale(
        [0, channelInfo.cardinality],
        [0, channelInfo.maxSize || DEFAULT_MAX_SIZE]
      );
    case "shape":
      channelScale = (categoryId) => SHAPES[categoryId % SHAPES.length];
    case "color":
      let d3colorScale =
        !channelInfo.colorScheme || !(channelInfo.colorScheme in d3)
          ? d3[DEFAULT_COLOR_SCHEME]
          : d3[channelInfo.colorScheme];
      if (Array.isArray(d3colorScale)) {
        console.error(
          "Currenty only interpolating color schemes are supported, using default"
        );
        d3colorScale = d3[DEFAULT_COLOR_SCHEME];
      }
      const zeroToOneScale = scale([0, channelInfo.cardinality], [0, 1]);
      channelScale = (categoryId) =>
        rgbStringToHex(d3colorScale(zeroToOneScale(categoryId)));
  }

  return (attrValue) => {
    if (!categoryTracker.has(attrValue)) {
      categoryTracker.set(attrValue, categoryTracker.size + 1);
    }
    return channelScale(categoryTracker.get(attrValue));
  };
};
export default SchemaProcessor;

export { DEFAULT_CHANNELS };
