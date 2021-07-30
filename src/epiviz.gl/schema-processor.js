import {
  rgbStringToHex,
  scale,
  colorSpecifierToHex,
  getScaleForSchema,
} from "./utilities";
import { SIZE_UNITS } from "./vertex-calculator";

import * as d3 from "d3-scale-chromatic";

// Default channel values of schema which is passed to webgl drawer
const DEFAULT_CHANNELS = Object.freeze({
  size: {
    value: 1,
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
    numComponents: null, // x and y are placed in an attribute vector in the shader that is already handled
    type: null, // i.e. calls to numComponents or type should not happen as it would break the shader
  },
  y: {
    value: 0,
    numComponents: null,
    type: null,
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
  width: {
    // Default values for width and height add complications
    // to mapping geometry and creating tick vertices
    value: undefined,
    numComponents: 1,
    type: "float",
  },

  height: {
    value: undefined,
    numComponents: 1,
    type: "float",
  },
});

const DEFAULT_MAX_SIZE = 100;
const DEFAULT_MIN_SIZE = 0;
const DEFAULT_MIN_OPACITY = 0;

const DEFAULT_MIN_WIDTH = 0;
const DEFAULT_MIN_HEIGHT = 0;
const DEFAULT_MAX_WIDTH = 1 / SIZE_UNITS;
const DEFAULT_MAX_HEIGHT = 1 / SIZE_UNITS;

const DEFAULT_COLOR_SCHEME = "interpolateBrBG";

// first value is undefined as categories are 1-indexed
const SHAPES = [undefined, "dot", "triangle", "circle", "diamond"];

/**
 * Given a track, determine the WebGL draw mode for it
 *
 * @param {Object} track from schema
 * @returns WebGLDrawMode as a string
 */
const getDrawModeForTrack = (track) => {
  switch (track.mark) {
    case "line":
      return "LINE_STRIP";
    case "tick":
    case "arc":
      return "LINES";
    case "point":
      if (track.shape && track.shape.value !== "dot") {
        return "TRIANGLES";
      } else {
        return "POINTS";
      }
    case "rect":
    case "area":
      return "TRIANGLES";
  }
};

class SchemaProcessor {
  /**
   * Process a schema by reading in the data, the channel information, and producing an
   * iterator like interface with getNextTrack to feed to a drawer.
   *
   * @param {Object} schema user defined schema
   * @param {Function} callback function to call after all the data has been loaded
   */
  constructor(schema, callback) {
    this.index = 0;
    this.schema = schema;
    if (typeof schema.defaultData === "string") {
      // data is a url to get
      this.dataPromise = fetch(schema.defaultData)
        .then((response) => response.text())
        .then((text) => (this.data = text.split("\n")));
    } else if (schema.defaultData) {
      // default data is defined, assumed to be an object
      this.data = schema.defaultData;
      this.isInlineData = true;
    }
    this.tracks = schema.tracks.map((track) => new Track(this, track));

    const allPromises = this.tracks
      .map((track) => track.dataPromise)
      .filter((p) => p); // Removes undefined
    if (this.dataPromise) {
      allPromises.push(this.dataPromise);
    }

    this.xScale = getScaleForSchema("x", schema);
    this.yScale = getScaleForSchema("y", schema);

    // When all tracks have acquired their data, call the callback
    // TODO: Allow tracks to be processed while waiting for others, need to keep in mind order
    Promise.all(allPromises).then(() => callback(this));
  }

  /**
   * Get the next track to process
   * @returns {@link Track}
   */
  getNextTrack() {
    if (this.index >= this.tracks.length) {
      return null;
    }
    return this.tracks[this.index++];
  }
}

class Track {
  /**
   * Process a track from a schema by loading data and producing an iterator
   * like interface with getNextDataPoint or getNextMark.
   *
   * @param {Object} schema user defined visualization
   * @param {Object} track user defined track
   */
  constructor(schema, track) {
    this.track = track;

    if (typeof track.data === "string") {
      // Track has its own data to GET
      this.dataPromise = fetch(track.data)
        .then((response) => response.text())
        .then((text) => {
          this.data = text.split(/[\n\r]+/);
          this.processHeadersAndMappers();
          this.hasOwnData = true;
        });
    } else if (track.data) {
      // Track has its own inline data
      this.data = track.data;
      this.isInlineData = true;
      this.processHeadersAndMappers();
      this.hasOwnData = true;
    } else if (schema.data) {
      // Track does not have its own data, but the schema has default data
      this.data = schema.data;
      this.isInlineData = schema.isInlineData;
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

  /**
   * Read the headers from the first row of data and then build functions to map a data row
   * to a channel value for drawing. Ultimately a method due to clunky constructor.
   */
  processHeadersAndMappers() {
    // Processing headers
    if (this.isInlineData) {
      this.headers = Object.keys(this.data);
      this.dataLength = this.data[this.headers[0]].length;
    } else {
      this.headers = this.data[0].split(",");
      this.dataLength = this.data.length - 1; // -1 to not count header
    }

    // Creating channel mappers
    this.channelMaps = new Map();
    Object.keys(DEFAULT_CHANNELS).forEach((channel) => {
      this.channelMaps.set(channel, this.buildMapperForChannel(channel));
    });
  }

  /**
   * Get the next data point from the track. Returns null when all points have been returned.
   * @returns A data point with the x and y coordinates and other attributes from the header
   */
  getNextDataPoint() {
    if (this.dataLength <= 0) {
      // TODO potentially erase this.data for garbage collection
      return null;
    }

    const toReturn = { geometry: { coordinates: [], dimensions: [] } };
    let splitted;
    if (this.isInlineData) {
      splitted = this.headers.map((header) => this.data[header].pop());
      this.dataLength--;
    } else {
      const currRow = this.data.pop();
      splitted = currRow.split(",");
      this.dataLength--;
    }

    this.headers.forEach((header, index) => {
      toReturn[header] = splitted[index];
    });

    const rawHeight = this.channelMaps.get("height")(splitted);
    const rawWidth = this.channelMaps.get("width")(splitted);
    console.log(rawWidth);
    const x = this.channelMaps.get("x")(splitted);
    const y = this.channelMaps.get("y")(splitted);
    toReturn.geometry.coordinates.push(x, y);
    toReturn.geometry.dimensions.push(rawWidth, rawHeight);
    return toReturn;
  }

  /**
   * Get the next mark from the track for the drawer to process. Returns null when all
   * marks have been returned.
   * @returns An object containing information used to draw a mark for a row of data.
   */
  getNextMark() {
    if (this.dataLength <= 0) {
      return null;
    }
    const toReturn = {};
    let splitted;
    if (this.isInlineData) {
      splitted = this.headers.map((header) => this.data[header].pop());
      this.dataLength--;
    } else {
      const currRow = this.data.pop();
      splitted = currRow.split(",");
      this.dataLength--;
    }

    this.channelMaps.forEach((mapper, channel) => {
      toReturn[channel] = mapper(splitted);
    });

    return toReturn;
  }

  /**
   * Builds a function which maps an attribute value to a channel value for use by the drawer.
   * The function will return a default if not present in the track, or a constant if
   * value is defined.
   *
   * @param {String} channel one of the channels listed in default channels
   * @returns the function
   */
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

        switch (channelInfo.type) {
          case "quantitative":
            attrMapper = buildMapperForQuantitiveChannel(channel, channelInfo);
            break;
          case "categorical":
            attrMapper = buildMapperForCategoricalChannel(channel, channelInfo);
            break;
          case "genomic":
            const chrAttributeIndex = this.headers.indexOf(
              channelInfo.chrAttribute
            );
            const geneAttributeIndex = this.headers.indexOf(
              channelInfo.geneAttribute
            );
            attrMapper = buildMapperForGenomicChannel(channel, channelInfo);
            return (row) =>
              attrMapper(row[chrAttributeIndex], row[geneAttributeIndex]);
          case "genomicRange":
            const genomicAttributeIndices = [
              this.headers.indexOf(channelInfo.chrAttribute),
              this.headers.indexOf(channelInfo.startAttribute),
              this.headers.indexOf(channelInfo.endAttribute),
            ];
            attrMapper = buildMapperForGenomicRangeChannel(
              channel,
              channelInfo
            );
            return (
              row // Pass in values for the genomic attributes to mapper
            ) =>
              attrMapper(...genomicAttributeIndices.map((index) => row[index]));
        }
        return (row) => attrMapper(row[attributeIndex]);
      }
    } else {
      return () => DEFAULT_CHANNELS[channel].value;
    }
  };
}

/**
 * Build a function which maps a numerical value for an attribute to a property of a mark
 * @param {*} channel the name of the quantitative channel to map
 * @param {*} channelInfo the object containing info for this channel from the schema
 * @returns a function that maps a data attribute value to a channel value
 */
const buildMapperForQuantitiveChannel = (channel, channelInfo) => {
  switch (channel) {
    case "x":
    case "y":
      // Map x and y to itself, but we need a function to do it
      return (coord) => parseFloat(coord);
    case "opacity":
      return scale(channelInfo.domain, [
        channelInfo.minOpacity || DEFAULT_MIN_OPACITY,
        1,
      ]);
    case "size":
      return scale(channelInfo.domain, [
        channelInfo.minSize || DEFAULT_MIN_SIZE,
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
    case "width":
      return scale(channelInfo.domain, [
        channelInfo.minWidth || DEFAULT_MIN_WIDTH,
        channelInfo.maxWidth || DEFAULT_MAX_WIDTH,
      ]);
    case "height":
      return scale(channelInfo.domain, [
        channelInfo.minHeight || DEFAULT_MIN_HEIGHT,
        channelInfo.maxHeight || DEFAULT_MAX_WIDTH,
      ]);
    default:
      console.error(
        `${channel} is not a supported channel for quantitative attributes!`
      );
  }
};

/**
 * Build a function which maps a discrete (integers are possible) value for an attribute
 * to a property of a mark
 * @param {*} channel the name of the categorical channel to map
 * @param {*} channelInfo the object containing info for this channel from the schema
 * @returns a function that maps a data attribute value to a channel value
 */
const buildMapperForCategoricalChannel = (channel, channelInfo) => {
  const categoryTracker = new Map();
  let channelScale;
  switch (channel) {
    case "x":
    case "y":
      // +1 here to avoid setting x or y at a boundary that makes it not visible
      channelScale = scale([1, channelInfo.cardinality + 1], [-1, 1]);
      break;
    case "opacity":
      channelScale = scale(
        [1, channelInfo.cardinality],
        [channelInfo.minOpacity || DEFAULT_MIN_OPACITY, 1]
      );
      break;
    case "size":
      channelScale = scale(
        [1, channelInfo.cardinality],
        [
          channelInfo.minSize || DEFAULT_MIN_SIZE,
          channelInfo.maxSize || DEFAULT_MAX_SIZE,
        ]
      );
      break;
    case "shape":
      channelScale = (categoryId) => SHAPES[categoryId % SHAPES.length];
      break;
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
      const zeroToOneScale = scale([1, channelInfo.cardinality], [0, 1]);
      channelScale = (categoryId) =>
        rgbStringToHex(d3colorScale(zeroToOneScale(categoryId)));
      break;
    case "width":
      channelScale = scale(
        [1, channelInfo.cardinality],
        [
          channelInfo.minWidth || DEFAULT_MIN_WIDTH,
          channelInfo.maxWidth || DEFAULT_MAX_WIDTH,
        ]
      );
      break;
    case "height":
      channelScale = scale(
        [1, channelInfo.cardinality],
        [
          channelInfo.minHeight || DEFAULT_MIN_HEIGHT,
          channelInfo.maxHeight || DEFAULT_MAX_HEIGHT,
        ]
      );
      break;
    default:
      console.error(
        `${channel} is not a supported channel for categorical attributes!`
      );
  }

  return (attrValue) => {
    if (!categoryTracker.has(attrValue)) {
      categoryTracker.set(attrValue, categoryTracker.size + 1);
    }
    return channelScale(categoryTracker.get(attrValue));
  };
};

/**
 * Build a function which maps a genome chr, gene, to an object consumable by a GenomeScale
 * @param {*} channel either x or y
 * @param {*} channelInfo the object containing info for this channel from the schema
 * @returns a function that maps (genomeChr, geneLoc) -> [chrId, geneLocation]
 *  ex: ["X", 200]
 */
const buildMapperForGenomicChannel = (channel, channelInfo) => {
  switch (channel) {
    case "x":
    case "y":
      return (chr, gene) => {
        let chrId = chr.startsWith("chr") ? chr.substring(3) : chr.toString();
        return [chrId, parseInt(gene)];
      };

    default:
      console.error(
        `${channel} is not a supported channel for genomic attributes!`
      );
  }
};

/**
 * Build a function which maps a genome chr, start, and end to an object consumable by a scale
 * @param {*} channel either x or y, width or height may be included if doing arc marks
 * @param {*} channelInfo the object containing info for this channel from the schema
 * @returns a function that maps (genomeChr, genomeStart, genomeEnd) -> an object containing mark metadata for position
 *  format: [chrId, geneLocation, chrId2, geneLocation2]
 *  ex: ["1", 1000, "X", 2000]
 */
const buildMapperForGenomicRangeChannel = (channel, channelInfo) => {
  switch (channel) {
    case "width":
    case "height":
    case "x":
    case "y":
      return (chr, genomeStart, genomeEnd) => {
        let chrId = chr.startsWith("chr") ? chr.substring(3) : chr.toString();
        return [
          [chrId, parseInt(genomeStart)],
          [chrId, parseInt(genomeEnd)],
        ];
      };

    default:
      console.error(
        `${channel} is not a supported channel for genomic attributes!`
      );
  }
};

export default SchemaProcessor;

export { DEFAULT_CHANNELS, getDrawModeForTrack };
