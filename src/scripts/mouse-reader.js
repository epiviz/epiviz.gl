import { scale } from "./utilities";

class MouseReader {
  /**
   *
   * @param {HTMLElement} element meant to read mouse events, necessary since OffscreenCanvas cannot read DOM events
   * @param {Handler} handler that is using
   */
  constructor(element, handler) {
    this.element = element;
    this.element.style.position = "absolute";
    this.element.style.width = "100%";
    this.element.style.height = "100%";

    this.element.id = "mouse-reader";

    this.handler = handler;

    this._currentSelectionPoints = [];

    this.tool = "box";

    // Initializing elements to show user their current selection
    this._selectContainer = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    this._selectContainer.style.width = "100%";
    this._selectContainer.style.height = "100%";
    this._selectContainer.style.position = "absolute";
    this._selectContainer.style.zIndex = "1000";
    this._selectContainer.style.pointerEvents = "none";

    this._selectMarker = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "polygon"
    );
    this._selectMarker.setAttribute("fill", "rgba(124, 124, 247, 0.3)");
    this._selectMarker.setAttribute("stroke", "rgb(136, 128, 247)");
    this._selectMarker.setAttribute("stroke-width", 1);
    this._selectMarker.setAttribute("stroke-dasharray", "5,5");
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

    this._wheelDampenX = (this.maxX - this.minX) / 1000;
    this._wheelDampenY = (this.maxY - this.minY) / 1000;

    this._panDampenX = (this.maxX - this.minX) / 1000;
    this._panDampenY = (this.maxY - this.minY) / 1000;
  }

  /**
   * Init the mouse reader by adding its elements to DOM and adding event handlers
   */
  init() {
    this.width = this.element.clientWidth;
    this.height = this.element.clientHeight;

    this.element.appendChild(this._selectContainer);
    this._selectContainer.appendChild(this._selectMarker);

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
              ...this._calculateViewportSpot(event.layerX, event.layerY),
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
              .concat(this._calculateViewportSpot(event.layerX, event.layerY));
            break;
          case "lasso":
            this._currentSelectionPoints.push(
              ...this._calculateViewportSpot(event.layerX, event.layerY)
            );
            break;
          case "tooltip":
            break;
        }
        this._updateSelectView();
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
            this._updateSelectView();
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
        case "box":
          break;
        case "lasso":
          break;
        case "tooltip":
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
      xRange: Array.from(this.currentXRange),
      yRange: Array.from(this.currentYRange),
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
      this.currentXRange[0] -= event.wheelDelta * this._wheelDampenX;
      this.currentXRange[1] += event.wheelDelta * this._wheelDampenX;
      this.currentXRange[0] = Math.max(this.currentXRange[0], this.minX);
      this.currentXRange[1] = Math.min(this.currentXRange[1], this.maxX);

      if (!this._validateXRange()) {
        // Zoom in limit
        this.currentXRange = previousX;
      }
    }

    if (!this.lockedY) {
      const previousY = [...this.currentYRange];
      this.currentYRange[0] -= event.wheelDelta * this._wheelDampenY;
      this.currentYRange[1] += event.wheelDelta * this._wheelDampenY;
      this.currentYRange[0] = Math.max(this.currentYRange[0], this.minY);
      this.currentYRange[1] = Math.min(this.currentYRange[1], this.maxY);

      if (!this._validateYRange()) {
        // Zoom in limit
        this.currentYRange = previousY;
      }
    }

    this.handler.sendDrawerState(this.getViewport());
    this._updateSelectView();
  }

  /**
   * Method to handle a clicked mouse moving around canvas to pan around canvas.
   *
   * @param {MouseEvent} event from "mousemove" event
   */
  _onPan(event) {
    if (!this.lockedX) {
      const previousX = [...this.currentXRange]; // ... to avoid aliasing
      this.currentXRange[0] -= event.movementX * this._panDampenX;
      this.currentXRange[1] -= event.movementX * this._panDampenX;
      this.currentXRange[0] = Math.max(this.currentXRange[0], this.minX);
      this.currentXRange[1] = Math.min(this.currentXRange[1], this.maxX);

      if (!this._validateXRange()) {
        this.currentXRange = previousX;
      }
    }

    if (!this.lockedY) {
      const previousY = [...this.currentYRange];
      this.currentYRange[0] += event.movementY * this._panDampenY;
      this.currentYRange[1] += event.movementY * this._panDampenY;
      this.currentYRange[0] = Math.max(this.currentYRange[0], this.minY);
      this.currentYRange[1] = Math.min(this.currentYRange[1], this.maxY);

      if (!this._validateYRange()) {
        this.currentYRange = previousY;
      }
    }

    this.handler.sendDrawerState(this.getViewport());
    this._updateSelectView();
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
   * Updates user selection view if they have selected a box
   */
  _updateBoxSelectView() {
    if (this._currentSelectionPoints.length !== 4) {
      return;
    }

    const topLeftCorner = this._calculateViewportSpotInverse(
      this._currentSelectionPoints[0],
      this._currentSelectionPoints[1]
    );

    const bottomRightCorner = this._calculateViewportSpotInverse(
      this._currentSelectionPoints[2],
      this._currentSelectionPoints[3]
    );

    let pointAttr = `${topLeftCorner[0]},${topLeftCorner[1]} 
                     ${topLeftCorner[0]},${bottomRightCorner[1]}, 
                     ${bottomRightCorner[0]},${bottomRightCorner[1]}
                     ${bottomRightCorner[0]},${topLeftCorner[1]}
                     `;
    this._selectMarker.setAttribute("points", pointAttr);
  }

  /**
   * Updates the DOM component used to show user selection.
   * If user has only 2 selection points calls {@link MouseReader#_updateBoxSelectView}
   */
  _updateSelectView() {
    if (this._currentSelectionPoints.length === 4) {
      this._updateBoxSelectView();
      return;
    }
    if (this._currentSelectionPoints.length < 6) {
      this._selectMarker.setAttribute("points", "");
      return;
    }

    let pointAttr = "";
    for (let i = 0; i < this._currentSelectionPoints.length; i += 2) {
      const asCanvasPoint = this._calculateViewportSpotInverse(
        this._currentSelectionPoints[i],
        this._currentSelectionPoints[i + 1]
      );
      pointAttr += `${asCanvasPoint[0]}, ${asCanvasPoint[1]} `;
    }

    this._selectMarker.setAttribute("points", pointAttr);
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
   * @param {Float} canvasX likely from event.layerX
   * @param {Float} canvasY likely from event.layerY
   * @returns viewport coordinate as array
   */
  _calculateViewportSpot(canvasX, canvasY) {
    const scaleX = scale([0, this.width], this.currentXRange);
    // Flipped for Y since canvas using typical graphics coordinates but GPU clipspace is typical cartesian coordinates
    const scaleY = scale([this.height, 0], this.currentYRange);
    return [scaleX(canvasX), scaleY(canvasY)];
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

export default MouseReader;
