import "fpsmeter";
import MouseReader from "./mouse-reader";
import { schemaViewport } from "./utilities";
import isJSONValid from "./schema-validation";

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

  setCanvasSize(width, height) {
    this.webglWorker.postMessage({
      type: "resize",
      width,
      height,
    });
    this.mouseReader.width = width;
    this.mouseReader.height = height;
    this.sendDrawerState(this.mouseReader.getViewport());
  }

  addToDom() {
    this.container.appendChild(this.parent);

    this.width = this.parent.clientWidth;
    this.height = this.parent.clientHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.canvas.style.position = "absolute";

    this.initFpsmeter();

    this.parent.appendChild(this.canvas);
    this.parent.appendChild(this.mouseReader.element);

    const offscreenCanvas = this.canvas.transferControlToOffscreen();

    this.webglWorker = new Worker(
      new URL("./offscreen-webgl-worker.js", import.meta.url)
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
      new URL("./data-processor-worker.js", import.meta.url)
    );
    this.dataWorker.onmessage = (message) => {
      this.dataWorkerStream.push(message);
      console.log(this.dataWorkerStream);
    };

    // Needs to be called at the end of addToDOM so mouseReader has correct dimensions to work with
    this.mouseReader.init();
  }

  setViewOptions(options) {
    for (const option of this.POSSIBLE_MOUSE_READER_OPTIONS) {
      if (option in options) {
        this.mouseReader[option] = options[option];
      }
    }
  }

  setSchema(schema) {
    if (!isJSONValid(schema)) {
      return;
    }
    this.mouseReader.viewport = schemaViewport(schema);
    this.sendDrawerState(this.mouseReader.getViewport());
    this.webglWorker.postMessage({ type: "schema", schema });
    this.dataWorker.postMessage({ type: "init", schema });
  }

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

  buildDataProcessor(data, options) {
    this.dataWorker.postMessage({
      type: "init",
      data,
      options,
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
}

export default WebGLVis;
