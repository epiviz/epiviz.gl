import {
  addSelectionPoint,
  clearSelectionPoints,
  setViewport,
  setSecondSelectionPoint,
} from "./state/reducers";
import { scale } from "./utilities";

class MouseReader {
  constructor(element, dispatch) {
    this.element = element;
    this.dispatch = dispatch;

    this.lockedX = false;
    this.lockedY = false;

    this._currentSelectionPoints = [];

    this.minX = -10;
    this.minY = -10;
    this.maxX = 10;
    this.maxY = 10;
    this.currentXRange = [-5, 5];
    this.currentYRange = [-5, 5];
    this.tool = "pan";
    this._boxSelectMarker = document.getElementById("box-select");
    this._lassoSelectMarker = document.getElementById("lasso-select");
    this._lassoSelectContainer = document.getElementById(
      "lasso-select-container"
    );
  }

  receiveState(state) {
    this.lockedX = state.controls.lockedX;
    this.lockedY = state.controls.lockedY;

    this.minX = state.controls.viewport.minX;
    this.minY = state.controls.viewport.minY;
    this.maxX = state.controls.viewport.maxX;
    this.maxY = state.controls.viewport.maxY;

    this.currentXRange = Array.from(state.controls.viewport.xRange);
    this.currentYRange = Array.from(state.controls.viewport.yRange);

    this.tool = state.controls.tool;
    this._currentSelectionPoints = state.controls.selectionPoints;
  }

  init() {
    this.width = this.element.getBoundingClientRect().width;
    this.height = this.element.getBoundingClientRect().height;

    this._lassoSelectContainer.setAttribute("width", this.width);
    this._lassoSelectContainer.setAttribute("height", this.height);

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
            this.dispatch(clearSelectionPoints());
            this.dispatch(
              addSelectionPoint(
                this._calculateViewportSpot(event.layerX, event.layerY)
              )
            );
            this._updateBoxSelectView();
            this._updateLassoSelectView();
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
            this.dispatch(
              setSecondSelectionPoint(
                this._calculateViewportSpot(event.layerX, event.layerY)
              )
            );
            break;
          case "lasso":
            this.dispatch(
              addSelectionPoint(
                this._calculateViewportSpot(event.layerX, event.layerY)
              )
            );
            break;
        }
        this._updateBoxSelectView();
        this._updateLassoSelectView();
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
            this.dispatch(clearSelectionPoints());
            this._updateBoxSelectView();
            return;
          }
          this._onBoxSelect();
          break;
        case "lasso":
          if (this._currentSelectionPoints.length < 6) {
            this.dispatch(clearSelectionPoints());
            this._updateLassoSelectView();
            return;
          }
          this._onLassoSelect();
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

    this.dispatch(setViewport(this.getViewport()));
    this._updateBoxSelectView();
    this._updateLassoSelectView();
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

    this.dispatch(setViewport(this.getViewport()));
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
      // Clicked away selection box
      this._boxSelectMarker.style.left = "-100px";
      this._boxSelectMarker.style.top = "-100px";

      this._boxSelectMarker.style.width = "0";
      this._boxSelectMarker.style.height = "0";
      return;
    }

    const boundingRect = this.element.getBoundingClientRect();
    const canvasTopLeft = this._calculateViewportSpotInverse(
      this._currentSelectionPoints[0],
      this._currentSelectionPoints[1]
    );
    const canvasBottomRight = this._calculateViewportSpotInverse(
      this._currentSelectionPoints[2],
      this._currentSelectionPoints[3]
    );

    const width = canvasBottomRight[0] - canvasTopLeft[0];
    const height = canvasBottomRight[1] - canvasTopLeft[1];

    // Check if user drags from bottom right to top left
    if (width < 0) {
      this._boxSelectMarker.style.left = `${
        boundingRect.left + canvasTopLeft[0] + width
      }px`;
    } else {
      this._boxSelectMarker.style.left = `${
        boundingRect.left + canvasTopLeft[0]
      }px`;
    }

    if (height < 0) {
      this._boxSelectMarker.style.top = `${
        boundingRect.top + canvasTopLeft[1] + height
      }px`;
    } else {
      this._boxSelectMarker.style.top = `${
        boundingRect.top + canvasTopLeft[1]
      }px`;
    }

    this._boxSelectMarker.style.width = `${Math.abs(width)}px`;
    this._boxSelectMarker.style.height = `${Math.abs(height)}px`;
  }

  _updateLassoSelectView() {
    if (this._currentSelectionPoints.length < 6) {
      // Clicked away selection box
      this._lassoSelectContainer.style.left = "-10000px";
      this._lassoSelectContainer.style.top = "-10000px";

      return;
    }

    const boundingRect = this.element.getBoundingClientRect();

    this._lassoSelectContainer.style.top = boundingRect.top;
    this._lassoSelectContainer.style.left = boundingRect.left;

    let pointAttr = "";
    for (let i = 0; i < this._currentSelectionPoints.length; i += 2) {
      const asCanvasPoint = this._calculateViewportSpotInverse(
        this._currentSelectionPoints[i],
        this._currentSelectionPoints[i + 1]
      );
      pointAttr += `${asCanvasPoint[0]}, ${asCanvasPoint[1]} `;
    }

    this._lassoSelectMarker.setAttribute("points", pointAttr);
  }

  _onBoxSelect() {
    console.log(this._currentSelectionPoints);
  }

  _onLassoSelect() {
    console.log(this._currentSelectionPoints);
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
