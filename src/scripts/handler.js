import "fpsmeter";
import MouseReader from "./mouse-reader";
import serialize from "serialize-javascript";

class Handler {
  POSSIBLE_MOUSE_READER_OPTIONS = Object.freeze([
    "lockedX",
    "lockedY",
    "tool",
    "viewport",
    "currentXRange",
    "currentYRange",
  ]);

  constructor(parent) {
    this.parent = parent;
    this.canvas = document.createElement("canvas");

    this.mouseReader = new MouseReader(document.createElement("div"), this);

    this.width = Math.min(this.parent.clientWidth, 1000);
    this.height = this.parent.clientHeight * 0.9; // needs to match CSS canvas height
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.canvas.style.position = "absolute";

    this.initFpsmeter();
  }

  setData(data, mapPointToSpace, mapPointToColor, options) {
    this.clearDrawerBuffers();
    this.sendToDrawerBuffer(data, mapPointToSpace, mapPointToColor, options);
    this.buildDataProcessor(data, mapPointToSpace, options);

    this.forceDrawerRender();
  }

  setOptions(options) {
    /*
      Configurable options for the webgl drawer:
      lockedX (bool): x-axis controls
      lockedY (bool): lock y-axis controls
      tool ("pan"|"boxSelect"|"lassoSelect"|"zoom"|"tooltip"): active tool on the drawer
      viewport [minX, maxX, minY, maxY]: the bounding box around all of your data
      currentXRange [lowX, highX]: set the window to display this range of values on the x-axis
      currentYRange [lowY, highY]: set the window to display this range of values on the y-axis
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

  addToDOM() {
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

    this.mouseReader.init();
  }

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

  // Communication with drawer
  sendDrawerState(viewport) {
    this.webglWorker.postMessage({ type: "viewport", ...viewport });
  }

  forceDrawerRender() {
    this.webglWorker.postMessage({
      type: "render",
      ...this.mouseReader.getViewport(),
    });
  }

  clearDrawerBuffers() {
    this.webglWorker.postMessage({ type: "clearBuffers" });
  }

  sendToDrawerBuffer(data, mapPointToSpace, mapPointToColor, options) {
    this.webglWorker.postMessage({
      type: "buffer",
      data,
      mapPointToSpace: serialize(mapPointToSpace),
      mapPointToColor: serialize(mapPointToColor),
      options,
    });
  }

  // Communication with data processor
  buildDataProcessor(data, mapPointToSpace) {
    this.dataWorker.postMessage({
      type: "init",
      data,
      mapPointToSpace: serialize(mapPointToSpace),
    });
  }

  selectPoints(points) {
    if (points.length === 4) {
      this.dataWorker.postMessage({ type: "selectBox", points });
    } else if (points.length >= 6) {
      this.dataWorker.postMessage({ type: "selectLasso", points });
    }
  }

  getClosestPoint(point) {
    this.dataWorker.postMessage({ type: "getClosestPoint", point });
  }
}

export default Handler;
