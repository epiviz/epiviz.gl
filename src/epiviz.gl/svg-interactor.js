import {
  scale,
  getScaleForSpecification,
  getDimAndMarginStyleForSpecification,
} from "./utilities";

import { axisBottom, axisLeft, axisTop, axisRight } from "d3-axis";
import { scaleLinear } from "d3-scale";
import { select } from "d3-selection";

class SVGInteractor {
  /**
   * A class used to illustrate state of the visualization on the main thread such as
   * selection or axis.
   *
   * @param {SVGElement} svg container for all svg elements
   */
  constructor(
    svg,
    labelClickHandler,
    labelMouseOverHandler,
    labelMouseOutHandler
  ) {
    /* This function is used to determine whether or not to render labels, and is called every time the labels are updated.
      By default, it returns null, which means that labels will always be rendered
      If the user wants to specify a function to determine whether or not to render labels, they can do so by calling the setShouldRenderLabels function
      with a function that accepts the plot as an argument and returns true or false
    */
    this.shouldRenderLabels = null;
    this.labelClickHandler = labelClickHandler;
    this.labelMouseOverHandler = labelMouseOverHandler;
    this.labelMouseOutHandler = labelMouseOutHandler;
    this.svg = svg;
    this.d3SVG = select(this.svg);
    this.svg.style.width = "100%";
    this.svg.style.height = "100%";
    this.svg.style.position = "absolute";
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
   * Set the specification for this class to refer to.
   *
   * @param {Object} specification
   */
  setSpecification(specification) {
    this.specification = specification;

    const styles = getDimAndMarginStyleForSpecification(specification);
    this.svg.style.width = styles.width;
    this.svg.style.height = styles.height;
    this.svg.style.margin = styles.margin;
    this.svg.style.cursor = "default"; // or "none"

    this.initialX = undefined; // used for updating labels
    this.initialY = undefined;
    select(this._labelMarker).selectAll("*").remove();
    for (const _ of this.specification.labels || []) {
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
        this.specification.xAxis,
        this.specification,
        getScaleForSpecification("x", this.specification),
        this.xAxisAnchor
      );

      if (this.specification.labels) {
        this.updateLabels();
      }
    }

    if (this.xAxis) {
      this.xAxisAnchor.call(this.xAxis);
    }

    if (this.currentYRange) {
      this.yAxis = this._calculateAxis(
        "y",
        this.specification.yAxis,
        this.specification,
        getScaleForSpecification("y", this.specification),
        this.yAxisAnchor
      );
    }

    if (this.yAxis) {
      this.yAxisAnchor.call(this.yAxis);
    }
  }

  updateLabels() {
    let specificationLabels = this.specification.labels;

    // If the user has specified a function to determine whether or not to render labels, check that
    if (this.shouldRenderLabels) {
      const shouldRenderLabels = this.shouldRenderLabels();

      // If the function returns a boolean value and it is false, remove all labels and do not render any
      // If the function returns a boolean value and it is true, dont do anything (render all labels)
      if (typeof shouldRenderLabels === "boolean" && !shouldRenderLabels) {
        select(this._labelMarker).selectAll("*").remove();
        return;
      } else if (
        Array.isArray(shouldRenderLabels) &&
        shouldRenderLabels.length === 2
      ) {
        // If the function returns an array of boolean values, remove the labels that correspond to false values
        specificationLabels = specificationLabels.filter(
          (label) =>
            (label.type === "row" && shouldRenderLabels[0]) ||
            (label.type === "column" && shouldRenderLabels[1])
        );
      }
    }

    if (!this.initialX && specificationLabels) {
      this.initialX = specificationLabels.map(
        (label) => this._calculateViewportSpotInverse(label.x, label.y)[0]
      );
    }
    if (!this.initialY && specificationLabels) {
      this.initialY = specificationLabels.map(
        (label) => this._calculateViewportSpotInverse(label.x, label.y)[1]
      );
    }

    const svgNode = this.d3SVG.node();
    const svgRect = svgNode.getBoundingClientRect();
    const svgWidth = svgRect.width;
    const svgHeight = svgRect.height;

    const labels = select(this._labelMarker)
      .selectAll("text")
      .data(specificationLabels);
    labels
      .enter()
      .append("text")
      .merge(labels) // Updates both existing and new nodes
      .text((d) => d.text)
      .attr("style", "pointer-events: bounding-box") // Add this line to make the labels respond to pointer events
      .style("user-select", "none") // add this line
      .on("click", (event, d) => {
        const clickedIndex = select(this._labelMarker)
          .selectAll("text")
          .nodes()
          .indexOf(event.currentTarget);

        this.labelClickHandler({
          label: d.text,
          index: clickedIndex,
          labelObject: d,
          event,
        });
      })
      .on("mouseover", (event, d) => {
        const hoveredIndex = select(this._labelMarker)
          .selectAll("text")
          .nodes()
          .indexOf(event.currentTarget);

        this.labelMouseOverHandler({
          label: d.text,
          index: hoveredIndex,
          labelObject: d,
          groupNode: this._labelMarker,
          event,
        });
      })
      .on("mouseout", (event, d) => {
        const hoveredIndex = select(this._labelMarker)
          .selectAll("text")
          .nodes()
          .indexOf(event.currentTarget);

        this.labelMouseOutHandler({
          label: d.text,
          index: hoveredIndex,
          labelObject: d,
          groupNode: this._labelMarker,
          event,
        });
      })
      .attr("x", (d, i, nodes) => {
        if (d.fixedX) {
          return this.initialX[i];
        }

        const xPos = this._calculateViewportSpotInverse(d.x, d.y)[0];

        if (xPos < 0 || xPos > svgWidth) {
          select(nodes[i]).remove();
        } else {
          return xPos;
        }
      })
      .attr("y", (d, i, nodes) => {
        if (d.fixedY) {
          return this.initialY[i];
        }

        const yPos = this._calculateViewportSpotInverse(d.x, d.y)[1];

        if (yPos < 0 || yPos > svgHeight) {
          select(nodes[i]).remove();
        } else {
          return yPos;
        }
      })
      .each((d, i, nodes) => {
        const xPos = d.fixedX
          ? this.initialX[i]
          : this._calculateViewportSpotInverse(d.x, d.y)[0];
        const yPos = d.fixedY
          ? this.initialY[i]
          : this._calculateViewportSpotInverse(d.x, d.y)[1];

        // Check if the 'transformRotate' property exists
        if (d.transformRotate) {
          select(nodes[i]).attr(
            "transform",
            `rotate(${d.transformRotate}, ${xPos}, ${yPos})`
          );
        }
      })
      .each(function (d) {
        // Set any possible svg properties specified in label
        for (const property in d) {
          if (
            ["x", "y", "text", "transformRotate", "type", "index"].includes(
              property
            )
          ) {
            continue;
          }
          select(this).attr(property, d[property]);
        }
      });

    // Remove any old labels
    labels.exit().remove();
  }

  _calculateAxis(dimension, orientation, specification, genomeScale, anchor) {
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
    for (const track of specification.tracks) {
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

  /**
   * Set the function that determines whether or not to render labels
   * @param {Function} shouldRenderLabels function that returns a boolean value or an array of boolean values
   * @returns null
   * @example
   * This example shows how to set a function that will render both row and column labels
   * (plot) => {
   *  return true;
   * }
   * @example
   * This example shows how to set a function that will render row labels but not column labels
   * (plot) => {
   * return [true, false];
   * }
   */
  setShouldRenderLabels(shouldRenderLabels) {
    this.shouldRenderLabels = shouldRenderLabels;
  }

  /**
   * Clears the polygon selection on the visualization
   */
  clear() {
    this._selectMarker.setAttribute("points", "");
  }
}

export default SVGInteractor;
