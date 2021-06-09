import "fpsmeter";
import MouseReader from "./mouse-reader";
import Toolbar from "./toolbar";

const axios = require("axios");

class Handler {
  constructor() {
    this.content = document.querySelector(".rendering-container");
    this.canvas = document.createElement("canvas");

    this.width = Math.min(this.content.clientWidth, 1000);
    this.height = this.content.clientHeight * 0.75;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    // Very poor state management here, best to use redux or flux
    this.toolbar = new Toolbar(this.loadCsv.bind(this));
    this.mouseReader = new MouseReader(
      this.canvas,
      this.toolbar,
      this.sendDrawerState.bind(this)
    );

    this.initFpsmeter();
    this.toolbar.init();
    this.mouseReader.init();
  }

  addToDOM(Drawer, extraArgs) {
    this.drawer = new Drawer(
      {
        canvas: this.canvas,
        ...this.getState(),
      },
      extraArgs
    );

    // Set tick for fps meter, allows drawer to have no knowledge of handler
    this.drawer.tick = () => this.meter.tick();
    this.content.appendChild(this.canvas);
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

  loadCsv(path) {
    axios.get(require(path)).then((response) => {
      this.clearDrawerBuffers();

      this.sendToDrawerBuffer(response.data);
      this.sendDrawerState();
      this.forceDrawerRender();
    });
  }

  getState() {
    return this.mouseReader.getViewport();
  }

  sendDrawerState() {
    this.drawer.receiveState({ ...this.getState() });
  }

  forceDrawerRender() {
    this.drawer.render();
  }

  sendToDrawerBuffer(responseData) {
    this.drawer.populateBuffers(responseData);
  }

  clearDrawerBuffers() {
    this.drawer.clearBuffers();
  }
}

export default Handler;
