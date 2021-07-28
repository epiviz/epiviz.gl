import 'fpsmeter';
import { format, precisionRound } from 'd3-format';
import 'd3-color';
import { axisBottom, axisTop, axisLeft, axisRight } from 'd3-axis';
import { scaleLinear } from 'd3-scale';
import { select } from 'd3-selection';

/**
 * Create a function which maps a genome pair to a location in the entire genome
 *
 * @param {String} genomeId key from genomeSizes object
 * @returns a function which maps a (chrId, pairNum) => to
 *  a number between 1 and total number of genes in the genome
 */
const createPairMapperToGenome = (genomeId) => {
  let chrSizes = genomeSizes[genomeId];

  let chrStarts = new Map();
  let cumulativeTotal = 0;
  chrSizes.forEach((value, key) => {
    chrStarts.set(key, cumulativeTotal);
    cumulativeTotal += value;
  });

  return (chr, pairNum) => {
    return chrStarts.get(chr) + pairNum;
  };
};

class GenomeScale {
  /**
   * A scale used to map a genome pair to a location between -1 and 1 for data visualization.
   * Also contains inverse and utility functions for getting labels for axis.
   *
   * @param {String} genomeId key from genomeSizes object
   * @param {Array} domain array of length 2 containing the start and end of the genome
   *   for the scale. ex: ["chr2:1000", "chr3:2000"]
   */
  constructor(genomeId, domain) {
    if (genomeSizes[genomeId] === undefined) {
      console.error(`${genomeId} is not a recognized genome!`);
    }
    this.genomeId = genomeId;
    this.domain = domain;

    let [startChr, startPair] = domain[0]
      .substring(3) // Remove chr
      .split(":"); // split chromesome and pair number
    startPair = parseInt(startPair);

    let [endChr, endPair] = domain[1].substring(3).split(":");
    endPair = parseInt(endPair);

    this.mapPairToGenomeIndex = createPairMapperToGenome(genomeId);
    const firstPairInDomain = this.mapPairToGenomeIndex(startChr, startPair);
    const lastPairInDomain = this.mapPairToGenomeIndex(endChr, endPair);
    this.mapGenomeIndexToClipSpace = scale(
      [firstPairInDomain, lastPairInDomain],
      [-1, 1]
    );
    this.mapGenomeIndexToClipSpaceInverse = scale(
      [-1, 1],
      [firstPairInDomain, lastPairInDomain]
    );
  }

  /**
   * Map a genome pair to [-1, 1] with the parts.
   *
   * @param {String} chr id of chromosome in genome
   * @param {Number} pair location in chromosome
   * @returns value in [-1, 1] corresponding to genome range location
   */
  toClipSpaceFromParts(chr, pair) {
    return this.mapGenomeIndexToClipSpace(this.mapPairToGenomeIndex(chr, pair));
  }

  /**
   * Utility method for calling this.toClipSpaceFromParts.
   *
   * @param {String} pairStr in form "chrID:geneNumber" ex: "chr1:1000"
   * @returns value in [-1, 1] corresponding to genome range location
   */
  toClipSpaceFromString(pairStr) {
    let [chr, pair] = pairStr.substring(3).split(":");
    pair = parseInt(pair);
    return this.toClipSpaceFromParts(chr, pair);
  }

  /**
   * Get the gene id from a value between [-1, 1]
   *
   * @param {Number} num number between [-1, 1]
   * @param {String} formatting used for formatting gene number with d3-format
   * @returns `chr${chrId}:${chrLoc}`
   */
  inverse(num, formatting = false) {
    let genomeSpot = Math.floor(this.mapGenomeIndexToClipSpaceInverse(num));
    let chrId;
    let chrLoc;
    let cumulativeTotal = 0;
    for (const [chrKey, pairCount] of genomeSizes[this.genomeId].entries()) {
      if (cumulativeTotal + pairCount >= genomeSpot) {
        chrLoc = genomeSpot - cumulativeTotal;
        chrId = chrKey;
        break;
      }
      cumulativeTotal += pairCount;
    }

    return formatting
      ? `chr${chrId}:${format(formatting)(chrLoc)}`
      : `chr${chrId}:${chrLoc}`;
  }

  getMidpoint(chr1, gene1, chr2, gene2) {
    const x1 = this.toClipSpaceFromParts(chr1, gene1);
    const x2 = this.toClipSpaceFromParts(chr2, gene2);
    const middleGene = this.inverse((x1 + x2) / 2);
    const [chrId, gene] = middleGene.substring(3).split(":");
    return [chrId, parseInt(gene)];
  }

  /**
   * Get a sequence of ticks for a range in the genome.
   *
   * @param {Number} start number between [-1, 1]
   * @param {Number} end number between [-1, 1] > start
   * @returns object with tickCoords and corresponding tickLabels property
   */
  getTickCoordsAndLabels(start, end) {
    let [startChr, startPair] = this.inverse(start).substring(3).split(":");
    let [endChr, endPair] = this.inverse(end).substring(3).split(":");

    const toReturn = [];
    let suggestedFormat;
    if (startChr === endChr) {
      let difference = endPair - startPair;
      let magnitude = Math.floor(Math.log10(difference));
      let startingValue = startPair - (startPair % 10 ** magnitude);
      suggestedFormat = precisionRound(10 ** magnitude, startingValue);

      for (
        let currValue = startingValue;
        currValue < endPair;
        currValue += 10 ** magnitude
      ) {
        toReturn.push(this.toClipSpaceFromParts(startChr, currValue));
      }
    } else {
      suggestedFormat = "1";
      for (const chrId of genomeSizes[this.genomeId].keys()) {
        toReturn.push(this.toClipSpaceFromParts(chrId, 1));
      }
    }
    return {
      tickCoords: toReturn,
      tickLabels: toReturn.map((coord) =>
        this.inverse(coord, format(`.${suggestedFormat}s`))
      ),
    };
  }

  toCallable() {
    // TODO investigate if using this method in the vertex calculator leads to slow downs
    const func = (args) => {
      return this.toClipSpaceFromParts(args[0], args[1]);
    };
    func.getMidpoint = this.getMidpoint.bind(this);
    return func;
  }

  /**
   * Utility method for getting a GenomeScale across an entire genome.
   *
   * @param {String} genomeId from genomeSizes
   * @returns a GenomeScale across an entire genome
   */
  static completeScale(genomeId) {
    const chrSizes = genomeSizes[genomeId];
    const finalEntry = [...chrSizes.entries()][chrSizes.size - 1];

    return new GenomeScale(genomeId, [
      "chr1:1",
      `chr${finalEntry[0]}:${finalEntry[1]}`,
    ]);
  }
}

/**
 * Available genomes to visualize. Each genome is a map from chromosome id to number of genes in chromosome.
 * Order matters as maps remember insertion order.
 */
const genomeSizes = {
  hg38: new Map([
    ["1", 248956422], // chr1
    ["2", 242193529], // chr2
    ["3", 198295559], // ...
    ["4", 190214555],
    ["5", 181538259],
    ["6", 170805979],
    ["7", 159345973],
    ["8", 145138636],
    ["9", 138394717],
    ["10", 135086622],
    ["11", 133797422],
    ["12", 133275309],
    ["13", 114364328],
    ["14", 107043718],
    ["15", 101991189],
    ["16", 90338345],
    ["17", 83257441],
    ["18", 80373285],
    ["19", 58617616],
    ["20", 64444167], // ...
    ["21", 46709983], // chr21
    ["22", 50818468], // chr22
    ["X", 156040895], // chrX
    ["Y", 57227415], // chrY
  ]),

  hg19: new Map([
    ["1", 249250621], // chr1
    ["2", 243199373], // chr2
    ["3", 198022430], // ...
    ["4", 191154276],
    ["5", 180915260],
    ["6", 171115067],
    ["7", 159138663],
    ["8", 146364022],
    ["9", 141213431],
    ["10", 135534747],
    ["11", 135006516],
    ["12", 133851895],
    ["13", 115169878],
    ["14", 107349540],
    ["15", 102531392],
    ["16", 90354753],
    ["17", 81195210],
    ["18", 78077248],
    ["19", 59128983],
    ["20", 63025520], // ...
    ["21", 48129895], // chr21
    ["22", 51304566], // chr22
    ["X", 155270560], // chrX
    ["Y", 59373566], // chrY
  ]),

  mm9: new Map([
    ["1", 197195432], 
    ["2", 181748087], 
    ["3", 159599783], 
    ["4", 155630120], 
    ["5", 152537259], 
    ["6", 149517037], 
    ["7", 152524553], 
    ["8", 131738871], 
    ["9", 124076172], 
    ["10", 129993255], 
    ["11", 121843856], 
    ["12", 121257530], 
    ["13", 120284312], 
    ["14", 125194864], 
    ["15", 103494974], 
    ["16", 98319150], 
    ["17", 95272651], 
    ["18", 90772031], 
    ["19", 61342430], 
    ["X", 166650296], 
    ["Y", 15902555]
  ]),

  mm10: new Map([
    ["1", 195471971], 
    ["2", 182113224], 
    ["3", 160039680], 
    ["4", 156508116], 
    ["5", 151834684], 
    ["6", 149736546], 
    ["7", 145441459], 
    ["8", 129401213], 
    ["9", 124595110], 
    ["10", 130694993], 
    ["11", 122082543], 
    ["12", 120129022], 
    ["13", 120421639], 
    ["14", 124902244], 
    ["15", 104043685], 
    ["16", 98207768], 
    ["17", 94987271], 
    ["18", 90702639], 
    ["19", 61431566], 
    ["X", 171031299], 
    ["Y", 91744698]
  ]),

  mm39: new Map([
    ["1", 195154279], // chr1
    ["2", 181755017], // chr2
    ["3", 159745316], // ...
    ["4", 156860686],
    ["5", 151758149],
    ["6", 149588044],
    ["7", 144995196],
    ["8", 130127694],
    ["9", 124359700],
    ["10", 130530862],
    ["11", 121973369],
    ["12", 120092757],
    ["13", 120883175],
    ["14", 125139656],
    ["15", 104073951],
    ["16", 98008968],
    ["17", 95294699], // ...
    ["18", 90720763], // chr18
    ["19", 61420004], // chr19
    ["X", 169476592], // chrX
    ["Y", 91455967], // chrY
  ]),
};

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

const DEFAULT_MARGIN = "2em";
const getDimAndMarginStyleForSchema = (schema) => {
  if (schema.margins === undefined) {
    return {
      width: `calc(100% - ${DEFAULT_MARGIN} - ${DEFAULT_MARGIN}`,
      height: `calc(100% - ${DEFAULT_MARGIN} - ${DEFAULT_MARGIN}`,
      margin: DEFAULT_MARGIN,
    };
  }
  let toReturn = {};
  toReturn.width = `calc(100% - ${schema.margins.left || DEFAULT_MARGIN} - ${
    schema.margins.right || DEFAULT_MARGIN
  })`;
  toReturn.height = `calc(100% - ${schema.margins.top || DEFAULT_MARGIN} - ${
    schema.margins.bottom || DEFAULT_MARGIN
  })`;
  // Shorthand for top right bottom left
  toReturn.margin = `${schema.margins.top || DEFAULT_MARGIN}
                     ${schema.margins.right || DEFAULT_MARGIN}
                     ${schema.margins.bottom || DEFAULT_MARGIN}
                     ${schema.margins.left || DEFAULT_MARGIN}`;
  return toReturn;
};

class SVGInteractor {
  /**
   * A class used to illustrate state of the visualization on the main thread such as
   * selection or axis.
   *
   * @param {SVGElement} svg container for all svg elements
   */
  constructor(svg) {
    this.svg = svg;
    this.d3SVG = select(this.svg);
    this.svg.style.width = "100%";
    this.svg.style.height = "100%";
    this.svg.style.position = "absolute";
    this.svg.style.zIndex = "1000";
    this.svg.style.pointerEvents = "none";
    this.svg.style.overflow = "visible";

    this._selectMarker = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "polygon"
    );
    this._selectMarker.setAttribute("fill", "rgba(124, 124, 247, 0.3)");
    this._selectMarker.setAttribute("stroke", "rgb(136, 128, 247)");
    this._selectMarker.setAttribute("stroke-width", 1);
    this._selectMarker.setAttribute("stroke-dasharray", "5,5");

    this._labelMarker = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "g"
    );
  }

  /**
   * Set the schema for this class to refer to.
   *
   * @param {Object} schema
   */
  setSchema(schema) {
    this.schema = schema;

    const styles = getDimAndMarginStyleForSchema(schema);
    this.svg.style.width = styles.width;
    this.svg.style.height = styles.height;
    this.svg.style.margin = styles.margin;

    this.initialX = undefined; // used for updating labels
    this.initialY = undefined;
    select(this._labelMarker).selectAll("*").remove();
    for (const _ of this.schema.labels || []) {
      select(this._labelMarker).append("text");
    }
  }

  /**
   * Add svg elements to the DOM
   */
  init() {
    this.svg.appendChild(this._selectMarker);
    this.svg.appendChild(this._labelMarker);
    this.xAxisAnchor = this.d3SVG.append("g");
    this.yAxisAnchor = this.d3SVG.append("g");
  }

  /**
   * Update the svg using the new viewport information
   * @param {Array} currentXRange of mousereader
   * @param {Array} currentYRange of mousereader
   * @param {Number} width of mousereader
   * @param {Number} height of mousereader
   */
  updateView(currentXRange, currentYRange, width, height) {
    this.currentXRange = currentXRange;
    this.currentYRange = currentYRange;
    this.width = width;
    this.height = height;

    if (this.currentXRange) {
      this.xAxis = this._calculateAxis(
        "x",
        this.schema.xAxis,
        this.schema,
        getScaleForSchema("x", this.schema),
        this.xAxisAnchor
      );

      if (this.schema.labels) {
        this.updateLabels();
      }
    }

    if (this.xAxis) {
      this.xAxisAnchor.call(this.xAxis);
    }

    if (this.currentYRange) {
      this.yAxis = this._calculateAxis(
        "y",
        this.schema.yAxis,
        this.schema,
        getScaleForSchema("y", this.schema),
        this.yAxisAnchor
      );
    }

    if (this.yAxis) {
      this.yAxisAnchor.call(this.yAxis);
    }
  }

  updateLabels() {
    if (!this.initialX && this.schema.labels) {
      this.initialX = this.schema.labels.map(
        (label) => this._calculateViewportSpotInverse(label.x, label.y)[0]
      );
    }
    if (!this.initialY && this.schema.labels) {
      this.initialY = this.schema.labels.map(
        (label) => this._calculateViewportSpotInverse(label.x, label.y)[1]
      );
    }

    select(this._labelMarker)
      .selectAll("text")
      .data(this.schema.labels)
      .text((d) => d.text)
      .attr("x", (d, i) => {
        if (d.fixedX) {
          return this.initialX[i];
        }
        return this._calculateViewportSpotInverse(d.x, d.y)[0];
      })
      .attr("y", (d, i) => {
        if (d.fixedY) {
          return this.initialY[i];
        }
        return this._calculateViewportSpotInverse(d.x, d.y)[1];
      })
      .each(function (d) {
        // Set any possible svg properties specified in label
        for (const property in d) {
          if (["x", "y", "text"].includes(property)) {
            continue;
          }
          select(this).attr(property, d[property]);
        }
      });
  }

  _calculateAxis(dimension, orientation, schema, genomeScale, anchor) {
    let axis, domain, range;
    if (dimension === "x") {
      domain = this.currentXRange;
      range = [0, this.width];
      switch (orientation) {
        case "none":
          anchor.attr("transform", `translate(-1000000, -1000000)`);
          return null;
        case "top":
          axis = axisTop();
          anchor.attr("transform", `translate(0, 0)`);
          break;
        case "center":
          axis = axisBottom();
          anchor.attr("transform", `translate(0, ${this.height / 2})`);
          break;
        case "zero":
          const yScale = scaleLinear()
            .domain(this.currentYRange)
            .range([this.height, 0]);

          axis = axisBottom();
          anchor.attr("transform", `translate(0, ${yScale(0)})`);
          break;
        case "bottom":
        default:
          axis = axisBottom();
          anchor.attr("transform", `translate(0, ${this.height})`);
          break;
      }
    }

    if (dimension === "y") {
      domain = this.currentYRange;
      range = [this.height, 0];
      switch (orientation) {
        case "none":
          anchor.attr("transform", `translate(-1000000, -1000000)`);
          return null;
        case "center":
          axis = axisRight();
          anchor.attr("transform", `translate(${this.width / 2}, 0)`);
          break;
        case "right":
          axis = axisRight();
          anchor.attr("transform", `translate(${this.width}, 0)`);
          break;
        case "zero":
          const xScale = scaleLinear()
            .domain(this.currentXRange)
            .range([0, this.width]);

          axis = axisLeft();
          anchor.attr("transform", `translate(${xScale(0)}, 0)`);
          break;
        case "left": // left is default behavior
        default:
          axis = axisLeft();
          anchor.attr("transform", `translate(0, 0)`);
          break;
      }
    }

    let genomic = false;
    for (const track of schema.tracks) {
      if (track[dimension].type && track[dimension].type.includes("genomic")) {
        genomic = true;
      }
    }

    if (!genomic) {
      return axis.scale(scaleLinear().domain(domain).range(range));
    }

    let tickInfo;
    if (dimension === "x") {
      tickInfo = genomeScale.getTickCoordsAndLabels(domain[0], domain[1]);
    } else {
      tickInfo = genomeScale.getTickCoordsAndLabels(range[0], range[1]);
    }

    return axis
      .scale(scaleLinear().domain(domain).range(range))
      .tickValues(tickInfo.tickCoords)
      .tickFormat((_, index) => tickInfo.tickLabels[index]);
  }

  /**
   * Updates user selection view if they have selected a box
   */
  _updateBoxSelectView(points) {
    if (points.length !== 4) {
      return;
    }

    const topLeftCorner = this._calculateViewportSpotInverse(
      points[0],
      points[1]
    );

    const bottomRightCorner = this._calculateViewportSpotInverse(
      points[2],
      points[3]
    );

    let pointAttr = `${topLeftCorner[0]},${topLeftCorner[1]} 
                     ${topLeftCorner[0]},${bottomRightCorner[1]}, 
                     ${bottomRightCorner[0]},${bottomRightCorner[1]}
                     ${bottomRightCorner[0]},${topLeftCorner[1]}
                     `;

    this._selectMarker.setAttribute("points", pointAttr);
  }

  /**
   * Update the selection box/lasso with the points as bounds
   *
   * @param {Array} points 1D array of coordinates that are used for selection ex. [x1,y1,x2,y2,...]
   */
  updateSelectView(points) {
    if (points.length === 4) {
      this._updateBoxSelectView(points);
      return;
    }
    if (points.length < 6) {
      this._selectMarker.setAttribute("points", "");
      return;
    }

    let pointAttr = "";
    for (let i = 0; i < points.length; i += 2) {
      const asCanvasPoint = this._calculateViewportSpotInverse(
        points[i],
        points[i + 1]
      );
      pointAttr += `${asCanvasPoint[0]}, ${asCanvasPoint[1]} `;
    }

    this._selectMarker.setAttribute("points", pointAttr);
  }

  /**
   * Calculate the location on the canvas a real coordniate corresponds to.
   *
   * @param {Float} viewportX x coordinate of data space
   * @param {Float} viewportY y coordniate of data space
   * @returns canvas coordindate as array
   */
  _calculateViewportSpotInverse(viewportX, viewportY) {
    const inverseScaleX = scale(this.currentXRange, [0, this.width]);
    // Flipped for Y since canvas using typical graphics coordinates but GPU clipspace is typical cartesian coordinates
    const inverseScaleY = scale(this.currentYRange, [this.height, 0]);

    return [inverseScaleX(viewportX), inverseScaleY(viewportY)];
  }
}

/**
 * event.layerX and event.layerY are deprecated. We will use them if they are on the event, but
 * if not we will use a manual calculation.
 *
 * @param {Event} event
 * @returns layerX and layerY, coordinates of event with origin at top right corner of bounding box
 */
const getLayerXandYFromEvent = (event) => {
  if (event.layerX !== undefined && event.layerY !== undefined) {
    return [event.layerX, event.layerY];
  }
  const bbox = event.target.getBoundingClientRect();
  const x = event.clientX - bbox.left;
  const y = event.clientY - bbox.top;
  return [x, y];
};

class MouseReader {
  /**
   *
   * @param {HTMLElement} element meant to read mouse events, necessary since OffscreenCanvas cannot read DOM events
   * @param {WebGLVis} handler WebGLVis that is using this mousereader
   */
  constructor(element, handler) {
    this.element = element;
    this.element.style.position = "absolute";
    this.element.style.width = "100%";
    this.element.style.height = "100%";

    this.handler = handler;

    this._currentSelectionPoints = [];

    this.tool = "box";

    // Initializing elements to show user their current selection
    this.SVGInteractor = new SVGInteractor(
      document.createElementNS("http://www.w3.org/2000/svg", "svg")
    );
  }

  /**
   * Set the schema of the mouse reader and the svg interaction
   * @param {Object} schema
   */
  setSchema(schema) {
    const styles = getDimAndMarginStyleForSchema(schema);
    this.element.style.width = styles.width;
    this.element.style.height = styles.height;
    this.element.style.margin = styles.margin;

    this.viewport = getViewportForSchema(schema);
    this.SVGInteractor.setSchema(schema);
    this._updateSVG();
  }

  /**
   * Set the viewport in the format mouseReader.viewport = [minX, maxX, minY, maxY].
   * Mostly used to make Scatterplot.setOptions simpler.
   */
  set viewport(toSet) {
    this.minX = toSet[0];
    this.maxX = toSet[1];
    this.minY = toSet[2];
    this.maxY = toSet[3];

    this.currentXRange = [this.minX, this.maxX];
    this.currentYRange = [this.minY, this.maxY];
  }

  /**
   * Init the mouse reader by adding its elements to DOM and adding event handlers
   */
  init() {
    this.width = this.element.clientWidth;
    this.height = this.element.clientHeight;

    this.element.parentElement.appendChild(this.SVGInteractor.svg);
    this.SVGInteractor.init();
    this._updateSVG();

    this.element.addEventListener("wheel", this._onWheel.bind(this), false);

    let mouseDown = false;
    this.element.addEventListener(
      "mousedown",
      (event) => {
        mouseDown = true;
        switch (this.tool) {
          case "pan":
            break;
          case "box":
          case "lasso":
            this._currentSelectionPoints = [
              ...this._calculateViewportSpot(...getLayerXandYFromEvent(event)),
            ];
            break;
        }
      },
      false
    );

    this.element.addEventListener(
      "mousemove",
      (event) => {
        if (!mouseDown) {
          return;
        }
        switch (this.tool) {
          case "pan":
            this._onPan(event);
            break;
          case "box":
            this._currentSelectionPoints = this._currentSelectionPoints
              .slice(0, 2)
              .concat(
                this._calculateViewportSpot(...getLayerXandYFromEvent(event))
              );
            break;
          case "lasso":
            this._currentSelectionPoints.push(
              ...this._calculateViewportSpot(...getLayerXandYFromEvent(event))
            );
            break;
        }
        this._updateSVG();
      },
      false
    );

    this.element.addEventListener("mouseup", (event) => {
      mouseDown = false;
      switch (this.tool) {
        case "pan":
          break;
        case "box":
          if (this._currentSelectionPoints.length !== 4) {
            this._currentSelectionPoints = [];
            return;
          }
          this._onSelect();
          break;
        case "lasso":
          if (this._currentSelectionPoints.length < 6) {
            this._currentSelectionPoints = [];
            this._updateSVG();
            return;
          }
          this._onSelect();
          break;
      }
    });

    this.element.addEventListener("mouseleave", () => {
      switch (this.tool) {
        case "pan": // Ensures panning does not continue if user leaves canvas
          mouseDown = false;
          break;
      }
    });
  }

  /**
   * Get current viewport info such as min/max bounds and current ranges
   *
   * @returns Current viewport information the mouse reader has calculated
   */
  getViewport() {
    return {
      minX: this.minX,
      maxX: this.maxX,
      minY: this.minY,
      maxY: this.maxY,
      xRange: this.currentXRange,
      yRange: this.currentYRange,
    };
  }

  /**
   * Method to handle wheel events for zooming in and out of canvas
   *
   * @param {WheelEvent} event
   */
  _onWheel(event) {
    event.preventDefault();
    if (!this.lockedX) {
      const previousX = [...this.currentXRange]; // ... to avoid aliasing
      const t = -event.wheelDelta / 1000;
      const inDataSpace = this._calculateViewportSpot(
        ...getLayerXandYFromEvent(event)
      );
      this.currentXRange[0] =
        t * inDataSpace[0] + (1 - t) * this.currentXRange[0];

      this.currentXRange[1] =
        t * inDataSpace[0] + (1 - t) * this.currentXRange[1];

      this.currentXRange[0] = Math.max(this.currentXRange[0], this.minX);
      this.currentXRange[1] = Math.min(this.currentXRange[1], this.maxX);

      if (!this._validateXRange()) {
        // Zoom in limit
        this.currentXRange = previousX;
      }
    }

    if (!this.lockedY) {
      const previousY = [...this.currentYRange];
      const t = -event.wheelDelta / 1000;
      const inDataSpace = this._calculateViewportSpot(
        ...getLayerXandYFromEvent(event)
      );

      this.currentYRange[0] =
        t * inDataSpace[1] + (1 - t) * this.currentYRange[0];
      this.currentYRange[1] =
        t * inDataSpace[1] + (1 - t) * this.currentYRange[1];
      this.currentYRange[0] = Math.max(this.currentYRange[0], this.minY);
      this.currentYRange[1] = Math.min(this.currentYRange[1], this.maxY);

      if (!this._validateYRange()) {
        // Zoom in limit
        this.currentYRange = previousY;
      }
    }

    this.handler.sendDrawerState(this.getViewport());
    this._updateSVG();
  }

  /**
   * Method to handle a clicked mouse moving around canvas to pan around canvas.
   *
   * @param {MouseEvent} event from "mousemove" event
   */
  _onPan(event) {
    if (!this.lockedX) {
      const previousX = [...this.currentXRange]; // ... to avoid aliasing
      const xDampen = (this.currentXRange[1] - this.currentXRange[0]) / 1000;
      this.currentXRange[0] -= event.movementX * xDampen;
      this.currentXRange[1] -= event.movementX * xDampen;
      this.currentXRange[0] = Math.max(this.currentXRange[0], this.minX);
      this.currentXRange[1] = Math.min(this.currentXRange[1], this.maxX);

      if (!this._validateXRange()) {
        this.currentXRange = previousX;
      }
    }

    if (!this.lockedY) {
      const previousY = [...this.currentYRange];
      const yDampen = (this.currentYRange[1] - this.currentYRange[0]) / 1000;
      this.currentYRange[0] += event.movementY * yDampen;
      this.currentYRange[1] += event.movementY * yDampen;
      this.currentYRange[0] = Math.max(this.currentYRange[0], this.minY);
      this.currentYRange[1] = Math.min(this.currentYRange[1], this.maxY);

      if (!this._validateYRange()) {
        this.currentYRange = previousY;
      }
    }

    this.handler.sendDrawerState(this.getViewport());
    this._updateSVG();
  }

  /**
   * Checks if this.currentXRange is valid with first element less than second
   * and if viewport zoom is not above webgl max zoom.
   *
   * @return true if range is valid, false otherwise
   */
  _validateXRange() {
    return this.currentXRange[1] >= this.currentXRange[0];
  }

  /**
   * Checks if this.currentYRange is valid with first element less than second
   * and if viewport zoom is not above webgl max zoom.
   *
   * @return true if range is valid, false otherwise
   */
  _validateYRange() {
    return this.currentYRange[1] >= this.currentYRange[0];
  }

  /**
   * Updates the DOM component used to show user selection or axis.
   * Calls methods from SVGInteractor.
   */
  _updateSVG() {
    this.SVGInteractor.updateView(
      this.currentXRange,
      this.currentYRange,
      this.width,
      this.height
    );
    this.SVGInteractor.updateSelectView(this._currentSelectionPoints);
  }

  /**
   * Executes when user has confirmed selection points (typically by releasing mouse)
   */
  _onSelect() {
    this.handler.selectPoints(this._currentSelectionPoints);
  }

  /**
   * Calculate the location on the real coordinate space a point on the canvas corresponds to.
   *
   * @param {Float} canvasX likely from event.layerX or getLayerXandYFromEvent
   * @param {Float} canvasY likely from event.layerY or getLayerXandYFromEvent
   * @returns viewport coordinate as array
   */
  _calculateViewportSpot(canvasX, canvasY) {
    const scaleX = scale([0, this.width], this.currentXRange);
    // Flipped for Y since canvas using typical graphics coordinates but GPU clipspace is typical cartesian coordinates
    const scaleY = scale([this.height, 0], this.currentYRange);
    return [scaleX(canvasX), scaleY(canvasY)];
  }
}

class WebGLVis {
  POSSIBLE_MOUSE_READER_OPTIONS = Object.freeze([
    "lockedX",
    "lockedY",
    "tool",
    "viewport",
    "currentXRange",
    "currentYRange",
  ]);

  /**
   * A class meant to display a visualization based off a given schema using webgl.
   *
   * @param {HTMLElement} container <div> or other container element meant to contain the visualization and its mousereader
   */
  constructor(container) {
    this.container = container;
    this.mouseReader = new MouseReader(document.createElement("div"), this);

    this.parent = document.createElement("div");
    this.parent.style.position = "relative";
    this.parent.style.width = "100%";
    this.parent.style.height = "100%";
    this.parent.style.overflow = "hidden";

    this.canvas = document.createElement("canvas");
    this.canvas.style.width = "100%";
    this.canvas.style.height = "100%";
  }

  /**
   * Resize the canvas to a particular size and rerender the data
   *
   * @param {Number} width in pixels to resize the canvas to
   * @param {Number} height in pixels to resize the canvas to
   */
  setCanvasSize(width, height) {
    this.webglWorker.postMessage({
      type: "resize",
      width,
      height,
    });

    this.canvas.style.width = width;
    this.canvas.style.height = height;
    this.mouseReader.width = width;
    this.mouseReader.height = height;
    this.sendDrawerState(this.mouseReader.getViewport());
  }

  /**
   * This method does three things, and should only be called once. If changing the schema
   * use setSchema.
   *  1. Add the canvas and mousereader to the DOM for use.
   *  2. Creates the WebWorkers that render and process the data.
   *  3. Exposes the messages the webworkers send back to the main thread under this.dataWorkerStream
   */
  addToDom() {
    this.container.appendChild(this.parent);
    this.parent.appendChild(this.canvas);
    this.parent.appendChild(this.mouseReader.element);

    const canvasBox = this.canvas.getBoundingClientRect();
    this.width = this.parent.clientWidth;
    this.height = this.parent.clientHeight;
    this.canvas.width = canvasBox.width;
    this.canvas.height = canvasBox.height;

    this.canvas.style.position = "absolute";

    this.initFpsmeter();

    const offscreenCanvas = this.canvas.transferControlToOffscreen();

    this.webglWorker = new Worker(
      new URL("offscreen-webgl-worker.js", import.meta.url),
      { type: "module" }
    );
    this.webglWorker.postMessage(
      {
        type: "init",
        canvas: offscreenCanvas,
      },
      [offscreenCanvas]
    );

    // Allow OffScreenWebGLDrawer to tick FPS meter
    this.webglWorker.onmessage = (e) => {
      if (e.data.type === "tick") {
        this.meter.tick();
      }
    };

    this.dataWorkerStream = [];
    this.dataWorker = new Worker(
      new URL("data-processor-worker.js", import.meta.url),
      { type: "module" }
    );
    this.dataWorker.onmessage = (message) => {
      this.dataWorkerStream.push(message);
      console.log(this.dataWorkerStream);
    };

    // Needs to be called at the end of addToDOM so mouseReader has correct dimensions to work with
    this.mouseReader.init();
  }

  /**
   * The main method for changing the state of the visualization, such as active tool,
   * viewport, locking axis, or changing the zoom.
   *
   * The format of the options:
   *   lockedX: boolean
   *   lockedY: boolean
   *   viewport: [minX, maxX, minY, maxY] (all Numbers)
   *   currentXRange: [x1, x2] (Numbers that should be within the viewport minX and maxX)
   *   currentYRange: [y1, y2] (Numbers that should be within the viewport minY and maxY)
   *   tool: one of ["pan", "box", "lasso"]
   *
   * @param {Object} options with keys under WebGLVis.POSSIBLE_MOUSE_READER_OPTIONS
   */
  setViewOptions(options) {
    for (const option of this.POSSIBLE_MOUSE_READER_OPTIONS) {
      if (option in options) {
        this.mouseReader[option] = options[option];
      }
    }
    this.sendDrawerState(this.mouseReader.getViewport());
  }

  _setMargins(schema) {
    const styles = getDimAndMarginStyleForSchema(schema);
    this.canvas.style.width = styles.width;
    this.canvas.style.height = styles.height;
    this.canvas.style.margin = styles.margin;

    const canvasBox = this.canvas.getBoundingClientRect();
    this.setCanvasSize(canvasBox.width, canvasBox.height);
  }

  /**
   * Set the schema of the visualization, and then render it.
   *
   * @param {Object} schema describing visualization
   * @returns boolean on whether the schema was accepted
   */
  setSchema(schema) {
    // if (!isJSONValid(schema)) {
    //   return false;
    // }

    this._setMargins(schema);
    this.mouseReader.setSchema(schema);
    this.sendDrawerState(this.mouseReader.getViewport());
    this.webglWorker.postMessage({ type: "schema", schema });
    this.dataWorker.postMessage({ type: "init", schema });
    return true;
  }

  /**
   * Send the viewport to the drawer. Use setViewOptions to change the viewport.
   *
   * @param {Object} viewport likely from this.mouseReader.getViewport()
   */
  sendDrawerState(viewport) {
    this.webglWorker.postMessage({ type: "viewport", ...viewport });
  }

  /**
   * Calls render in the drawer.
   */
  forceDrawerRender() {
    this.webglWorker.postMessage({
      type: "render",
      ...this.mouseReader.getViewport(),
    });
  }

  /**
   * Utility method to have data worker call {@link DataProcessor#selectBox} or
   * {@link DataProcessor#selectLasso}.
   *
   * Does not return, posts result to this.dataWorkerStream.
   * @param {Array} points array in format [x1,y1,x2,y2,x3,y3,...]
   *  if points.length == 4, does a box select, if points.length >= 6 does a lasso select
   *    using points as a polygon
   */
  selectPoints(points) {
    if (points.length === 4) {
      this.dataWorker.postMessage({ type: "selectBox", points });
    } else if (points.length >= 6) {
      this.dataWorker.postMessage({ type: "selectLasso", points });
    }
  }

  /**
   * Utility method to have data worker call {@link DataProcessor#getClosestPoint}.
   * Does not return, posts result to this.dataWorkerStream.
   *
   * @param {Array} point to get closest point to
   */
  getClosestPoint(point) {
    this.dataWorker.postMessage({ type: "getClosestPoint", point });
  }

  /**
   * Initializes the FPS meter.
   */
  initFpsmeter() {
    this.meter = new window.FPSMeter(document.querySelector("footer"), {
      graph: 1,
      heat: 1,
      theme: "light",
      history: 25,
      top: "-20px",
      left: `${this.width / 2}px`,
      transform: "translateX(-100%)",
    });
  }
}

export default WebGLVis;
