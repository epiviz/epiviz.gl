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
    if (this.currentYRange) {
      this.yAxis = this._calculateAxis(
        "y",
        schema.yAxis,
        schema,
        getScaleForSchema("y", schema)
      );
    }
  }

  init() {
    this.svg.appendChild(this._selectMarker);
    this.axisAnchor = this.d3SVG.append("g");
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
        getScaleForSchema("x", this.schema)
      );
    }

    if (this.xAxis) {
      console.log(this.xAxis);
      this.axisAnchor.call(this.xAxis);
    }
    // if (this.currentXRange) {
    //   this.axisAnchor.call(
    //     d3Axis
    //       .axisBottom()
    //       .scale(
    //         d3Scale
    //           .scaleLinear()
    //           .domain(this.currentXRange)
    //           .range([0, this.width])
    //       )
    //   );
    // }
  }

  _calculateAxis(dimension, orientation, schema, genomeScale) {
    let axis, domain, range;
    if (dimension === "x") {
      domain = this.currentXRange;
      range = [0, this.width];
      if (orientation === "top") {
        axis = d3Axis.axisTop();
      } else {
        axis = d3Axis.axisBottom(); //.translate(0, this.height);
      }
    }

    if (dimension === "y") {
      domain = this.currentYRange;
      range = [0, this.height];
      if (orientation === "right") {
        axis = d3Axis.axisRight().translate(this.width, 0);
      } else {
        axis = d3Axis.axisLeft();
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

    return axis
      .scale(d3Scale.scaleLinear().domain(domain).range(range))
      .tickValues([])
      .tickFormat((d) => genomeScale.inverse(d));
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
