import { GenomeScale } from "./genome-sizes";
import { color } from "d3-color";

/**
 * Returns a linear scale to map elements in domain to elements in range.
 * @param {Array} domain array of length two containing minimum and maximum values
 * @param {Array} range array of length two containing minimum and maximum values
 * @returns linear scale mapping domain to range
 */
function scale(domain, range) {
  const domainLength = domain[1] - domain[0];
  const rangeLength = range[1] - range[0];
  const slope = rangeLength / domainLength;
  const intercept = range[1] - slope * domain[1];
  return (x) => slope * x + intercept;
}

/**
 * Maps RGB values to integer for webgl buffer.
 *
 * @param {Integer} red value from 0 to 255
 * @param {Integer} green value from 0 to 255
 * @param {Integer} blue value from 0 to 255
 * @returns RGB hex value as integer
 */
function rgbToHex(red, green, blue) {
  return (red << 16) | (green << 8) | (blue << 0);
}

function rgbStringToHex(rgb) {
  const colorVals = rgb.substring(4, rgb.length - 1).split(",");
  return rgbToHex(...colorVals.map((asStr) => parseInt(asStr)));
}

function colorSpecifierToHex(specifier) {
  if (!isNaN(specifier)) {
    // Specifier is already a hex value
    return Math.floor(specifier);
  }
  const asColor = color(specifier);
  return rgbToHex(asColor.r, asColor.g, asColor.b);
}

/**
 * Get the VIEWPORT of the specification to be used by the mouseReader.
 * If all types for a dimension across tracks are categorical or genomic,
 * will default to [-1, 1] for that dimension for the mouseReader. If X or Y
 * has a fixed value, it will consider the width or height channel domains.
 *
 * @param {Object} specification of visualization
 * @returns [smallestX, largestX, smallestY, largestY] of viewport
 */
function getViewportForSpecification(specification) {
  let smallestX = Number.POSITIVE_INFINITY;
  let largestX = Number.NEGATIVE_INFINITY;
  let smallestY = Number.POSITIVE_INFINITY;
  let largestY = Number.NEGATIVE_INFINITY;

  specification.tracks.forEach((track) => {
    let xDomain = track.x.domain;
    if (
      !xDomain &&
      track.x.value !== undefined &&
      track.width.domain !== undefined
    ) {
      xDomain = track.width.domain;
    }
    let yDomain = track.y.domain;
    if (
      !yDomain &&
      track.y.value !== undefined &&
      track.height &&
      track.height.domain !== undefined
    ) {
      yDomain = track.height.domain;
    }

    if (xDomain) {
      smallestX = xDomain[0] < smallestX ? xDomain[0] : smallestX;
      largestX = xDomain[1] > largestX ? xDomain[1] : largestX;
    }
    if (yDomain) {
      smallestY = yDomain[0] < smallestY ? yDomain[0] : smallestY;
      largestY = yDomain[1] > largestY ? yDomain[1] : largestY;
    }
  });
  smallestX = smallestX === Number.POSITIVE_INFINITY ? -1 : smallestX;
  largestX = largestX === Number.NEGATIVE_INFINITY ? 1 : largestX;
  smallestY = smallestY === Number.POSITIVE_INFINITY ? -1 : smallestY;
  largestY = largestY === Number.NEGATIVE_INFINITY ? 1 : largestY;

  return [smallestX, largestX, smallestY, largestY];
}

/**
 * Given a specification, return a SCALE to be used for mapping data points to clip space
 * for the drawer.
 *
 * @param {String} dimension either x or y
 * @param {Object} specification for the visualization
 * @returns function which can be used to map to an "x" or "y" value
 */
const getScaleForSpecification = (dimension, specification) => {
  if (dimension !== "x" && dimension !== "y") {
    console.error(`${dimension} is not x or y!`);
  }
  let genomic = false;
  let genome;
  for (const track of specification.tracks) {
    if (track[dimension].type && track[dimension].type.includes("genomic")) {
      genome = track[dimension].genome;
      genomic = true;
      break;
    }
  }

  if (!genomic) {
    const viewport = getViewportForSpecification(specification);
    if (dimension === "x") {
      return scale([viewport[0], viewport[1]], [-1, 1]);
    }
    return scale([viewport[2], viewport[3]], [-1, 1]);
  }

  const geneScale = GenomeScale.completeScale(genome);

  let smallestGene = undefined;
  let smallestGeneValue = Number.POSITIVE_INFINITY;
  let largestGene = undefined;
  let largestGeneValue = Number.NEGATIVE_INFINITY;

  for (const track of specification.tracks) {
    let xDomain = track[dimension].domain;
    if (xDomain) {
      if (geneScale.toClipSpaceFromString(xDomain[0]) < smallestGeneValue) {
        smallestGeneValue = geneScale.toClipSpaceFromString(xDomain[0]);
        smallestGene = xDomain[0];
      }

      if (geneScale.toClipSpaceFromString(xDomain[1]) > largestGeneValue) {
        largestGeneValue = geneScale.toClipSpaceFromString(xDomain[1]);
        largestGene = xDomain[1];
      }
    }
  }

  const asScale = new GenomeScale(genome, [smallestGene, largestGene]);
  return asScale.toCallable();
};

const RELATIVE_LENGTH_UNITS = [
  "em",
  "ex",
  "ch",
  "rem",
  "lh",
  "vw",
  "vh",
  "vmin",
  "vmax",
  "%",
];
const getPixelMeasurement = (cssMeasurement) => {
  if (RELATIVE_LENGTH_UNITS.some((unit) => cssMeasurement.includes(unit))) {
    return false;
  }
  const asFloat = parseFloat(cssMeasurement);
  return isNaN(asFloat) ? false : asFloat;
};

const DEFAULT_MARGIN = "50px";
const DEFAULT_WIDTH = "100%";
const DEFAULT_HEIGHT = DEFAULT_WIDTH;
const getDimAndMarginStyleForSpecification = (specification) => {
  let toReturn = {};
  const calculatedMargins = {};
  if (specification.margins === undefined) {
    toReturn.margin = DEFAULT_MARGIN;
    calculatedMargins.top = DEFAULT_MARGIN;
    calculatedMargins.right = DEFAULT_MARGIN;
    calculatedMargins.bottom = DEFAULT_MARGIN;
    calculatedMargins.left = DEFAULT_MARGIN;
  } else {
    calculatedMargins.top =
      specification.margins.top === undefined
        ? DEFAULT_MARGIN
        : specification.margins.top;
    calculatedMargins.right =
      specification.margins.right === undefined
        ? DEFAULT_MARGIN
        : specification.margins.right;
    calculatedMargins.bottom =
      specification.margins.bottom === undefined
        ? DEFAULT_MARGIN
        : specification.margins.bottom;
    calculatedMargins.left =
      specification.margins.left === undefined
        ? DEFAULT_MARGIN
        : specification.margins.left;
    // Shorthand for top right bottom left
    toReturn.margin = `${calculatedMargins.top}
                       ${calculatedMargins.right}
                       ${calculatedMargins.bottom}
                       ${calculatedMargins.left}`;
  }

  const calculatedWidth = specification.width || DEFAULT_WIDTH;
  const calculatedHeight = specification.height || DEFAULT_HEIGHT;
  const allMeasurements = [
    calculatedMargins.top,
    calculatedMargins.right,
    calculatedMargins.bottom,
    calculatedMargins.left,
    calculatedWidth,
    calculatedHeight,
  ];

  if (allMeasurements.every(getPixelMeasurement)) {
    // Let's encode as a number to allow users using typescript or doing weird DOM things able to define
    // the width and height explicitly
    toReturn.width =
      getPixelMeasurement(calculatedWidth) -
      getPixelMeasurement(calculatedMargins.left) -
      getPixelMeasurement(calculatedMargins.right);
    toReturn.height =
      getPixelMeasurement(calculatedHeight) -
      getPixelMeasurement(calculatedMargins.bottom) -
      getPixelMeasurement(calculatedMargins.top);
  } else {
    // If user is using css units in their margins and dimensions, then use css calc
    toReturn.width = `calc(
      ${calculatedWidth} - 
      ${calculatedMargins.left} - 
      ${calculatedMargins.right}
    )`;

    toReturn.height = `calc(
      ${calculatedHeight} - 
      ${calculatedMargins.top} - 
      ${calculatedMargins.bottom}
    )`;
  }
  return toReturn;
};

/**
 * We need to calculate points on the arc for that mark type, but it needs to be quick.
 * In addition, it shouldn't be a perfect circle, and also should look somewhat arc like.
 * This utility funciton returns function that takes a value between 0 and 1 where 0 maps
 * to the first control point, and 1 maps to the third control point.
 *
 * https://math.stackexchange.com/a/1361717
 *
 * @param {Array} P0 first control point
 * @param {Array} P1 second control point
 * @param {Array} P2 third control point
 * @returns a function [0, 1] -> point on curve
 */
const getQuadraticBezierCurveForPoints = (P0, P1, P2) => {
  const x = (t) =>
    (1 - t) ** 2 * P0[0] + 2 * t * (1 - t) * P1[0] + t ** 2 * P2[0];
  const y = (t) =>
    (1 - t) ** 2 * P0[1] + 2 * t * (1 - t) * P1[1] + t ** 2 * P2[1];
  return (t) => [x(t), y(t)];
};

export {
  scale,
  rgbToHex,
  rgbStringToHex,
  getViewportForSpecification,
  colorSpecifierToHex,
  getScaleForSpecification,
  getDimAndMarginStyleForSpecification,
  getQuadraticBezierCurveForPoints,
  DEFAULT_WIDTH,
  DEFAULT_HEIGHT,
};
