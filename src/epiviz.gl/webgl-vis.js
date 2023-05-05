import "fpsmeter";
import MouseReader from "./mouse-reader";
import isJSONValid from "./specification-validation/index";
import {
  getDimAndMarginStyleForSpecification,
  DEFAULT_HEIGHT,
  DEFAULT_WIDTH,
} from "./utilities";

class WebGLVis {
  /**
   * A class meant to display a visualization based off a given specification using webgl.
   *
   * @param {HTMLElement} container <div> or other container element meant to contain the visualization and its mousereader
   */
  constructor(container) {
    this.container = container;
    this.mouseReader = new MouseReader(document.createElement("div"), this);

    this.parent = document.createElement("div");
    this.parent.style.position = "relative";
    this.parent.style.overflow = "hidden";

    this.canvas = document.createElement("canvas");
    this.canvas.style.position = "absolute";

    this.POSSIBLE_MOUSE_READER_OPTIONS = Object.freeze([
      "lockedX",
      "lockedY",
      "tool",
      "viewport",
      "currentXRange",
      "currentYRange",
    ]);
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
   * This method does three things, and should only be called once. If changing the specification
   * use setSpecification.
   *  1. Add the canvas and mousereader to the DOM for use.
   *  2. Creates the WebWorkers that render and process the data.
   *  3. Exposes the messages the webworkers send back to the main thread under this.dataWorkerStream
   *
   * @param {Boolean} displayFPSMeter whether or not to display an fps meter
   */
  addToDom(displayFPSMeter) {
    this.container.appendChild(this.parent);
    this.parent.appendChild(this.canvas);
    this.parent.appendChild(this.mouseReader.element);

    if (displayFPSMeter) {
      this.initFpsmeter();
    }

    const offscreenCanvas = this.canvas.transferControlToOffscreen();

    this.webglWorker = new Worker(
      new URL("offscreen-webgl-worker.js", import.meta.url),
      { type: "module" }
    );
    this.webglWorker.postMessage(
      {
        type: "init",
        canvas: offscreenCanvas,
        displayFPSMeter,
      },
      [offscreenCanvas]
    );

    // Allow OffScreenWebGLDrawer to tick FPS meter
    this.webglWorker.onmessage = (e) => {
      if (e.data.type === "tick") {
        this.meter.tick();
      }
    };

    this.webglWorker.onerror = (e) => {
      throw e;
    };

    this.dataWorkerStream = [];
    this.dataWorker = new Worker(
      new URL("data-processor-worker.js", import.meta.url),
      { type: "module" }
    );
    this.dataWorker.onmessage = (message) => {
      if (message.data.type === "getClosestPoint") {
        if (message.data.closestPoint === undefined) {
          return;
        }
        this.parent.dispatchEvent(
          new CustomEvent("pointHovered", { detail: message })
        );
      } else if (message.data.type === "getClickPoint") {
        if (message.data.closestPoint === undefined) {
          return;
        }
        this.parent.dispatchEvent(
          new CustomEvent("pointClicked", { detail: message })
        );
      } else if (
        message.data.type === "selectBox" ||
        message.data.type === "selectLasso"
      ) {
        this.parent.dispatchEvent(
          new CustomEvent("onSelectionEnd", { detail: message })
        );
        this.dataWorkerStream.push(message);
        console.log(this.dataWorkerStream);
      }
    };
    this.dataWorker.onerror = (e) => {
      throw e;
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

  _setMargins(specification) {
    const styles = getDimAndMarginStyleForSpecification(specification);
    this.parent.style.width = specification.width || DEFAULT_WIDTH;
    this.parent.style.height = specification.height || DEFAULT_HEIGHT;
    this.canvas.style.width = styles.width;
    this.canvas.style.height = styles.height;
    this.canvas.style.margin = styles.margin;

    if (isNaN(styles.width) || isNaN(styles.height)) {
      // Using css calc
      const canvasBox = this.canvas.getBoundingClientRect();
      this.setCanvasSize(canvasBox.width, canvasBox.height);
    } else {
      this.setCanvasSize(styles.width, styles.height);
    }
  }

  /**
   * Set the specification of the visualization, and then render it.
   *
   * @param {Object} specification describing visualization
   * @returns boolean on whether the specification was accepted
   */
  setSpecification(specification) {
    if (!isJSONValid(specification)) {
      return false;
    }

    this._setMargins(specification);
    this.mouseReader.setSpecification(specification);
    this.sendDrawerState(this.mouseReader.getViewport());
    this.webglWorker.postMessage({ type: "specification", specification });
    this.dataWorker.postMessage({ type: "init", specification });
    return true;
  }

  updateSpecification(specification) {
    if (!isJSONValid(specification)) {
      return false;
    }

    this.webglWorker.postMessage({ type: "specification", specification });
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
    this.dataWorker.postMessage({
      type: "getClosestPoint",
      point,
    });
  }

  /**
   * Utility method to have data worker call {@link DataProcessor#getClosestPoint}.
   * Does not return, posts result to this.dataWorkerStream.
   *
   * @param {Array} point to get closest point to
   */
  getClickPoint(point) {
    this.dataWorker.postMessage({
      type: "getClickPoint",
      point,
    });
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
      left: `100px`,
      transform: "translateX(-100%)",
    });
  }

  /**
   * Adds an event listener to visualization on the appropriate component.
   * Current event types that are supported are
   * "zoomIn": fires when user zooms in
   * "zoomOut": fires when user zooms out
   * "pan": fires when user pans
   * "onSelection": fires while user is changing the selection box/lasso
   * "onSelectionEnd": fires when a selection has been completed and the results are in the dataWorkerStream
   * "pointHovered": fires when pointer hovers over a datapoint
   *
   * For information on the parameters and functionality see:
   *   https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
   *
   * @param {String} type
   * @param {Function} listener
   * @param {Object} options
   */
  addEventListener(type, listener, options) {
    this.parent.addEventListener(type, listener, options);
  }

  /**
   * Clears the polygon selection on the visualization
   */
  clearSelection() {
    this.mouseReader.clear();
  }
}

export default WebGLVis;
