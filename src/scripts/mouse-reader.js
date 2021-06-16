import { scale } from "./utilities";

class MouseReader {
  constructor(element, handler) {
    this.element = element;
    this.element.id = "mouse-reader";

    this.handler = handler;

    this._currentSelectionPoints = [];

    this.tool = "box";

    this._selectContainer = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    this._selectContainer.id = "select-container";

    this._selectMarker = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "polygon"
    );
    this._selectMarker.setAttribute("fill", "rgba(124, 124, 247, 0.3)");
    this._selectMarker.setAttribute("stroke", "rgb(136, 128, 247)");
    this._selectMarker.setAttribute("stroke-width", 1);
    this._selectMarker.setAttribute("stroke-dasharray", "5,5");
  }

  set viewport(toSet) {
    this.minX = toSet[0];
    this.maxX = toSet[1];
    this.minY = toSet[2];
    this.maxY = toSet[3];
  }

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
        case "pan":
          mouseDown = false;
          break;
        case "box":
          break;
        case "lasso":
          break;
        case "tooltip":
          // this.dispatch(setTooltipAnchor(null));
          break;
      }
    });
  }

  _onWheel(event) {
    event.preventDefault();
    if (!this.lockedX) {
      const previousX = [...this.currentXRange]; // ... to avoid aliasing
      this.currentXRange[0] -= event.wheelDelta / 500;
      this.currentXRange[1] += event.wheelDelta / 500;
      this.currentXRange[0] = Math.max(this.currentXRange[0], this.minX);
      this.currentXRange[1] = Math.min(this.currentXRange[1], this.maxX);

      if (!this._validateXRange()) {
        // Zoom in limit
        this.currentXRange = previousX;
      }
    }

    if (!this.lockedY) {
      const previousY = [...this.currentYRange];
      this.currentYRange[0] -= event.wheelDelta / 500;
      this.currentYRange[1] += event.wheelDelta / 500;
      this.currentYRange[0] = Math.max(this.currentYRange[0], this.minY);
      this.currentYRange[1] = Math.min(this.currentYRange[1], this.maxY);

      if (!this._validateYRange()) {
        // Zoom in limit
        this.currentYRange = previousY;
      }
    }

    this.handler.sendDrawerState(this.getViewport());
    this._updateSelectView();
    return false;
  }

  _onPan(event) {
    if (!this.lockedX) {
      const previousX = [...this.currentXRange]; // ... to avoid aliasing
      this.currentXRange[0] -= event.movementX / 50;
      this.currentXRange[1] -= event.movementX / 50;
      this.currentXRange[0] = Math.max(this.currentXRange[0], this.minX);
      this.currentXRange[1] = Math.min(this.currentXRange[1], this.maxX);

      if (!this._validateXRange()) {
        this.currentXRange = previousX;
      }
    }

    if (!this.lockedY) {
      const previousY = [...this.currentYRange];
      this.currentYRange[0] += event.movementY / 50;
      this.currentYRange[1] += event.movementY / 50;
      this.currentYRange[0] = Math.max(this.currentYRange[0], this.minY);
      this.currentYRange[1] = Math.min(this.currentYRange[1], this.maxY);

      if (!this._validateYRange()) {
        this.currentYRange = previousY;
      }
    }

    this.handler.sendDrawerState(this.getViewport());
    this._updateSelectView();
  }

  _validateXRange() {
    const windowWidth = this.currentXRange[1] - this.currentXRange[0];
    const displayAsIfThisWide =
      ((this.maxX - this.minX) / windowWidth) * this.width;
    return (
      this.currentXRange[1] >= this.currentXRange[0] &&
      displayAsIfThisWide <= 16384
    );
  }

  _validateYRange() {
    const windowHeight = this.currentYRange[1] - this.currentYRange[0];
    const displayAsIfThisHigh =
      ((this.maxY - this.minY) / windowHeight) * this.height;
    return (
      this.currentYRange[1] >= this.currentYRange[0] &&
      displayAsIfThisHigh <= 16384
    );
  }

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

  _onSelect() {
    this.handler.selectPoints(this._currentSelectionPoints);
  }

  _calculateViewportSpot(canvasX, canvasY) {
    const scaleX = scale([0, this.width], this.currentXRange);
    // Flipped for Y since canvas using typical graphics coordinates but GPU clipspace is typical cartesian coordinates
    const scaleY = scale([this.height, 0], this.currentYRange);
    return [scaleX(canvasX), scaleY(canvasY)];
  }

  _calculateViewportSpotInverse(viewportX, viewportY) {
    const inverseScaleX = scale(this.currentXRange, [0, this.width]);
    // Flipped for Y since canvas using typical graphics coordinates but GPU clipspace is typical cartesian coordinates
    const inverseScaleY = scale(this.currentYRange, [this.height, 0]);

    return [inverseScaleX(viewportX), inverseScaleY(viewportY)];
  }

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
}

export default MouseReader;
