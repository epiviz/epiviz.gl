import Handler from "./handler";
import MouseReader from "./mouse-reader";

class OffscreenHandler extends Handler {
  constructor() {
    super();

    // Create a div for reading mouse events
    this.mouseReader = new MouseReader(
      document.createElement("div"),
      this.toolbar,
      this.sendDrawerState.bind(this)
    );

    // Ensure div is directly on top of canvas
    this.canvas.style.position = "absolute";
    this.mouseReader.element.id = "mouse-reader";
  }

  addToDOM(worker) {
    this.content.appendChild(this.canvas);
    this.content.appendChild(this.mouseReader.element);
    // Reinit controls with new mouse reader
    this.mouseReader.init();

    this.offscreenCanvas = this.canvas.transferControlToOffscreen();

    this.worker = worker;
    this.worker.postMessage(
      { type: "init", canvas: this.offscreenCanvas, ...this.getState() },
      [this.offscreenCanvas]
    );

    this.worker.onmessage = (e) => {
      if (e.data.type === "tick") {
        this.meter.tick();
      }
    };
  }

  sendDrawerState() {
    this.worker.postMessage({ type: "state", ...this.getState() });
  }

  forceDrawerRender() {
    this.worker.postMessage({ type: "render", ...this.getState() });
  }

  sendToDrawerBuffer(responseData) {
    this.worker.postMessage({ type: "buffer", responseData });
  }

  clearDrawerBuffers() {
    this.worker.postMessage({ type: "clearBuffers" });
  }
}

export default OffscreenHandler;
