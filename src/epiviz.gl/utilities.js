import { GenomeScale } from "./genome-sizes";
const d3 = require("d3-color");

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
  const asColor = d3.color(specifier);
  return rgbToHex(asColor.r, asColor.g, asColor.b);
}

/**
 * Get the VIEWPORT of the schema to be used by the mouseReader.
 * If all types for a dimension across tracks are categorical or genomic,
 * will default to [-1, 1] for that dimension for the mouseReader. If X or Y
 * has a fixed value, it will consider the width or height channel domains.
 *
 * @param {Object} schema of visualization
 * @returns [smallestX, largestX, smallestY, largestY] of viewport
 */
function getViewportForSchema(schema) {
  let smallestX = Number.POSITIVE_INFINITY;
  let largestX = Number.NEGATIVE_INFINITY;
  let smallestY = Number.POSITIVE_INFINITY;
  let largestY = Number.NEGATIVE_INFINITY;

  schema.tracks.forEach((track) => {
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
 * Given a schema, return a SCALE to be used for mapping data points to clip space
 * for the drawer.
 *
 * @param {String} dimension either x or y
 * @param {Object} schema for the visualization
 * @returns function which can be used to map to an "x" or "y" value
 */
const getScaleForSchema = (dimension, schema) => {
  if (dimension !== "x" && dimension !== "y") {
    console.error(`${dimension} is not x or y!`);
  }
  let genomic = false;
  let genome;
  for (const track of schema.tracks) {
    if (track[dimension].type && track[dimension].type.includes("genomic")) {
      genome = track[dimension].genome;
      genomic = true;
      break;
    }
  }

  if (!genomic) {
    const viewport = getViewportForSchema(schema);
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

  for (const track of schema.tracks) {
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

  return new GenomeScale(genome, [smallestGene, largestGene]);
};

export {
  scale,
  rgbToHex,
  rgbStringToHex,
  getViewportForSchema,
  colorSpecifierToHex,
  getScaleForSchema,
};
