import {
  rgbStringToHex,
  scale,
  colorSpecifierToHex,
  getScaleForSpecification,
} from "./utilities";
import { SIZE_UNITS } from "./vertex-calculator";

import * as d3 from "d3-scale-chromatic";

// Default channel values of specification which is passed to webgl drawer
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
 * @param {Object} track from specification
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

class SpecificationProcessor {
  /**
   * Process a specification by reading in the data, the channel information, and producing an
   * iterator like interface with getNextTrack to feed to a drawer.
   *
   * @param {Object} specification user defined specification
   * @param {Function} callback function to call after all the data has been loaded
   */
  constructor(specification) {
    this.index = 0;
    this.specification = specification;
    this.tracks = specification.tracks.map(
      (track) => new Track(specification, track)
    );

    this.xScale = getScaleForSpecification("x", specification);
    this.yScale = getScaleForSpecification("y", specification);
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
   * Process a track from a specification by loading data and producing an iterator
   * like interface with getNextDataPoint or getNextMark.
   *
   * @param {Object} specification user defined visualization
   * @param {Object} track user defined track
   */
  constructor(specification, track) {
    this.track = track;
    if (track.data) {
      // Track has its own data
      let data;
      if (track.data.isInlineData) {
        // Track has its own inline data
        data = {};
        for (let i = 0; i < track.data.keys.length; i++) {
          const key = track.data.keys[i];
          data[key] = new Int8Array(track.data.defaultDataBuffers[i]);
        }
      } else {
        // Track has its own data file
        const decodedData = new TextDecoder("utf-8").decode(
          new Uint8Array(track.data.defaultDataBuffers[0])
        );
        data = decodedData.split("\n");
      }
      this.data = data;
      this.hasOwnData = true;
      this.isInlineData = track.data.isInlineData;
      this.processHeadersAndMappers();
    } else if (specification.defaultData) {
      // Track does not have its own data, but the specification has default data
      let defaultData;
      if (specification.defaultData.isInlineData) {
        // Specification has inline data
        defaultData = {};
        for (let i = 0; i < specification.defaultData.keys.length; i++) {
          const key = specification.defaultData.keys[i];
          defaultData[key] = new Int8Array(
            specification.defaultData.defaultDataBuffers[i]
          );
        }
      } else {
        // Specification has data file
        const decodedData = new TextDecoder("utf-8").decode(
          new Uint8Array(specification.defaultData.defaultDataBuffers[0])
        );
        defaultData = decodedData.split("\n");
      }
      this.isInlineData = specification.defaultData.isInlineData;
      this.data = defaultData;
      this.processHeadersAndMappers();
    } else {
      console.error(
        `Could not find data (no defaultData in specification and no data specified for this track) for track ${track}.`
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
      this.data.length = this.data[this.headers[0]].length; // assign length to data object for iteration
      this.index = 0;
    } else {
      this.headers = this.data[0].split(",");
      this.index = 1; // 1 to skip header
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
    if (this.index >= this.data.length) {
      return null;
    }

    const toReturn = { geometry: { coordinates: [], dimensions: [] } };
    let splitted;
    if (this.isInlineData) {
      splitted = this.headers.map((header) => this.data[header][this.index]);
    } else {
      const currRow = this.data[this.index];
      splitted = currRow.split(",");
    }

    this.index++;

    this.headers.forEach((header, index) => {
      toReturn[header] = splitted[index];
    });

    const rawHeight = this.channelMaps.get("height")(splitted);
    const rawWidth = this.channelMaps.get("width")(splitted);
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
    // Getting the next mark cannot modify the data objects as other tracks may refer to
    // the same data
    if (this.index >= this.data.length) {
      return null;
    }

    const toReturn = {};
    let splitted;
    if (this.isInlineData) {
      splitted = this.headers.map((header) => this.data[header][this.index]);
    } else {
      const currRow = this.data[this.index];
      splitted = currRow.split(",");
    }

    this.index++;

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
  buildMapperForChannel(channel) {
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
          case "inline":
            attrMapper = buildMapperForInlineChannel(channel, channelInfo);
            break;
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
  }
}

/**
 * Build a function which maps an attribute that is a channel value to a compatible value.
 *
 * @param {String} channel the name of the channel to build an inline mapper for
 * @param {Object} channelInfo the info of the channel from a track
 * @returns a function that maps attribute values to appropriate channel values.
 */
const buildMapperForInlineChannel = (channel, channelInfo) => {
  switch (channel) {
    case "width":
    case "height":
    case "size":
      return (dimension) => parseFloat(dimension);
    case "color":
      return (color) => colorSpecifierToHex(color);
    default:
      console.info(
        `No special behavior for ${channel} as an inline attribute.`
      );
      return (inlineValue) => inlineValue;
  }
};

/**
 * Build a function which maps a numerical value for an attribute to a property of a mark
 * @param {*} channel the name of the quantitative channel to map
 * @param {*} channelInfo the object containing info for this channel from the specification
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
 * @param {*} channelInfo the object containing info for this channel from the specification
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
 * @param {*} channelInfo the object containing info for this channel from the specification
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
 * @param {*} channelInfo the object containing info for this channel from the specification
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

export default SpecificationProcessor;

export { DEFAULT_CHANNELS, getDrawModeForTrack };
