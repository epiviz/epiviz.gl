import Handler from "./handler";
import MouseReader from "./mouse-reader";

class OffscreenHandler extends Handler {
  constructor() {
    super();

    // Create a div for reading mouse events
    this.mouseReader = new MouseReader(
      document.createElement("div"),
      this.toolbar,
      this.handleMessage.bind(this)
    );

    // Ensure div is directly on top of canvas
    this.canvas.style.position = "absolute";
    this.mouseReader.element.id = "mouse-reader";
  }

  addToDOM(worker, dataWorker) {
    this.content.appendChild(this.canvas);
    this.content.appendChild(this.mouseReader.element);
    // Reinit controls with new mouse reader
    this.mouseReader.init();

    this.offscreenCanvas = this.canvas.transferControlToOffscreen();

    this.worker = worker;
    this.worker.postMessage(
      {
        type: "init",
        canvas: this.offscreenCanvas,
        ...this.mouseReader.getViewport(),
      },
      [this.offscreenCanvas]
    );

    this.worker.onmessage = (e) => {
      if (e.data.type === "tick") {
        this.meter.tick();
      }
    };

    this.dataWorker = dataWorker;
  }

  sendDrawerState(viewport) {
    this.worker.postMessage({ type: "state", ...viewport });
  }

  forceDrawerRender() {
    this.worker.postMessage({
      type: "render",
      ...this.mouseReader.getViewport(),
    });
  }

  sendToDrawerBuffer(responseData) {
    this.worker.postMessage({ type: "buffer", responseData });
  }

  clearDrawerBuffers() {
    this.worker.postMessage({ type: "clearBuffers" });
  }

  buildDataProcessor(data) {
    this.dataWorker.postMessage({ type: "init", data });
  }

  selectPoints(points) {
    if (points.length === 4) {
      this.dataWorker.postMessage({ type: "selectBox", points });
    } else if (points.length >= 6) {
      this.dataWorker.postMessage({ type: "selectLasso", points });
    }
  }
}

export default OffscreenHandler;
