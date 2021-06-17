import "fpsmeter";
import MouseReader from "./mouse-reader";
import serialize from "serialize-javascript";

class Scatterplot {
  POSSIBLE_MOUSE_READER_OPTIONS = Object.freeze([
    "lockedX",
    "lockedY",
    "tool",
    "viewport",
    "currentXRange",
    "currentYRange",
  ]);

  /**
   * A class meant to display a scatterplot using webgl.
   *
   * @param {HTMLElement} container <div> or other container element meant to contain the scatterplot and its components
   */
  constructor(container) {
    this.container = container;
    this.mouseReader = new MouseReader(document.createElement("div"), this);

    this.parent = document.createElement("div");
    this.parent.style.position = "relative";
    this.parent.style.width = "100%";
    this.parent.style.height = "100%";

    this.canvas = document.createElement("canvas");
  }

  /**
   * Set the data for the scatterplot to display
   *
   * @param {Array} data where each element is expected to be passed to mapPointToSpace and mapPointToColor
   * @param {*} mapPointToSpace maps an element from data to an array of 3 elements, the first two are
   *   coordinates of the data point, the third is extra metadata from the data point
   * @param {*} mapPointToColor maps an from data to a color, should map to a hex code as an integer
   *   OR a hashable type if options.colorMapIsCategorical is true
   * @param {*} options to send to workers for processing
   */
  setData(data, mapPointToSpace, mapPointToColor, options) {
    this.clearDrawerBuffers();
    this.sendToDrawerBuffer(data, mapPointToSpace, mapPointToColor, options);
    this.buildDataProcessor(data, mapPointToSpace, options);

    this.forceDrawerRender();
  }

  /**
   * Set the options for the webgl drawer
   *
   * {
   *   lockedX (bool): x-axis controls
   *   lockedY (bool): lock y-axis controls
   *   tool ("pan"|"boxSelect"|"lassoSelect"|"zoom"|"tooltip"): active tool on the drawer
   *   viewport [minX, maxX, minY, maxY]: the bounding box around all of your data
   *   currentXRange [lowX, highX]: set the window to display this range of values on the x-axis
   *   currentYRange [lowY, highY]: set the window to display this range of values on the y-axis
   * }
   * @param {Object} options outlined above
   */
  setOptions(options) {
    /*
      Configurable options for the webgl drawer:
      
    */
    for (const option of this.POSSIBLE_MOUSE_READER_OPTIONS) {
      if (option in options) {
        this.mouseReader[option] = options[option];
      }
    }
    if (
      this.webglWorker &&
      ("currentXRange" in options || "currentYRange" in options)
    ) {
      this.sendDrawerState(this.mouseReader.getViewport());
    }
  }

  /**
   * After constructing the scatterplot, add it and its sibling elements to DOM.
   * Also initializes WebWorkers for internal use.
   */
  addToDOM() {
    this.container.appendChild(this.parent);

    this.width = this.parent.clientWidth;
    this.height = this.parent.clientHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.canvas.style.position = "absolute";

    this.initFpsmeter();

    this.parent.appendChild(this.canvas);
    this.parent.appendChild(this.mouseReader.element);

    this.offscreenCanvas = this.canvas.transferControlToOffscreen();

    this.webglWorker = new Worker(
      new URL("./offscreen-webgl-worker.js", import.meta.url)
    );
    this.webglWorker.postMessage(
      {
        type: "init",
        canvas: this.offscreenCanvas,
        ...this.mouseReader.getViewport(),
      },
      [this.offscreenCanvas]
    );

    // Allow OffScreenWebGLDrawer to tick FPS meter
    this.webglWorker.onmessage = (e) => {
      if (e.data.type === "tick") {
        this.meter.tick();
      }
    };

    this.dataWorkerStream = [];
    this.dataWorker = new Worker(
      new URL("./data-processor-worker.js", import.meta.url)
    );
    this.dataWorker.onmessage = (message) => {
      this.dataWorkerStream.push(message);
      console.log(this.dataWorkerStream);
    };

    // Needs to be called at the end of addToDOM so mouseReader has correct dimensions to work with
    this.mouseReader.init();
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
      left: `${this.width}px`,
      transform: "translateX(-100%)",
    });
  }

  ////////////////////////////
  // Communication with drawer
  ////////////////////////////

  /**
   * Send the viewport to the drawer.
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
   * Clears the drawer buffers causing blank canvas to render.
   */
  clearDrawerBuffers() {
    this.webglWorker.postMessage({ type: "clearBuffers" });
  }

  /**
   * Send data to drawer to place into buffers for rendering.
   *
   * @param {Array} data to process
   * @param {Function} mapPointToSpace function to map element in data to 2D space and metadata.
   * @param {Function} mapPointToColor maps an from data to a color, should map to a hex code as an integer
   *   OR a hashable type if options.colorMapIsCategorical is true
   * @param {Object} options to send to worker for processing
   */
  sendToDrawerBuffer(data, mapPointToSpace, mapPointToColor, options) {
    this.webglWorker.postMessage({
      type: "buffer",
      data,
      mapPointToSpace: serialize(mapPointToSpace),
      mapPointToColor: serialize(mapPointToColor),
      options,
    });
  }

  ////////////////////////////////////
  // Communication with data processor
  ////////////////////////////////////

  /**
   * Utility method to call constructor of {@link DataProcessor}.
   *
   * @param {Array} data to process
   * @param {Function} mapPointToSpace function to map element in data to 2D space and metadata.
   */
  buildDataProcessor(data, mapPointToSpace) {
    this.dataWorker.postMessage({
      type: "init",
      data,
      mapPointToSpace: serialize(mapPointToSpace),
    });
  }

  /**
   * Utility method to have data worker call {@link DataProcessor#selectBox} or
   * {@link DataProcessor#selectLasso}.
   *
   * Does not return, posts result to this.dataWorkerStream.
   * @param {Array} points array in format [x1,y1,x2,y2,x3,y3,...]
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
}

export default Scatterplot;
