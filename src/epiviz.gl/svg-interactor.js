import { scale, getScaleForSchema } from "./utilities";

const d3Axis = require("d3-axis");
const d3Scale = require("d3-scale");
const d3Selection = require("d3-selection");

class SVGInteractor {
  constructor(svg) {
    this.svg = svg;
    this.d3SVG = d3Selection.select(this.svg);
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
  }

  setSchema(schema) {
    this.schema = schema;
  }

  init() {
    this.svg.appendChild(this._selectMarker);
    this.xAxisAnchor = this.d3SVG.append("g");
    this.yAxisAnchor = this.d3SVG.append("g");
  }

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

  _calculateAxis(dimension, orientation, schema, genomeScale, anchor) {
    let axis, domain, range;
    if (dimension === "x") {
      domain = this.currentXRange;
      range = [0, this.width];
      switch (orientation) {
        case "top":
          axis = d3Axis.axisTop();
          anchor.attr("transform", `translate(0, 0)`);
          break;
        case "center":
          axis = d3Axis.axisBottom();
          anchor.attr("transform", `translate(0, ${this.height / 2})`);
          break;
        case "bottom":
        default:
          axis = d3Axis.axisBottom();
          anchor.attr("transform", `translate(0, ${this.height})`);
          break;
      }
    }

    if (dimension === "y") {
      domain = this.currentYRange;
      range = [this.height, 0];
      switch (orientation) {
        case "center":
          axis = d3Axis.axisRight();
          anchor.attr("transform", `translate(${this.width / 2}, 0)`);
          break;
        case "right":
          axis = d3Axis.axisRight();
          anchor.attr("transform", `translate(${this.width}, 0)`);
          break;
        case "left": // left is default behavior
        default:
          axis = d3Axis.axisLeft();
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
      return axis.scale(d3Scale.scaleLinear().domain(domain).range(range));
    }

    let tickInfo;
    if (dimension === "x") {
      tickInfo = genomeScale.getTickCoordsAndLabels(domain[0], domain[1]);
    } else {
      tickInfo = genomeScale.getTickCoordsAndLabels(range[0], range[1]);
    }

    return axis
      .scale(d3Scale.scaleLinear().domain(domain).range(range))
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

export default SVGInteractor;
