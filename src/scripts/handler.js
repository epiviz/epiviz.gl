import "fpsmeter";
import DataProcessor from "./data-processor";
import MouseReader from "./mouse-reader";
import Toolbar from "./toolbar";

const axios = require("axios");

class Handler {
  constructor() {
    this.content = document.querySelector(".rendering-container");
    this.canvas = document.createElement("canvas");

    this.width = Math.min(this.content.clientWidth, 1000);
    this.height = this.content.clientHeight * 0.9; // needs to match CSS canvas height
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    // Very poor state management here, best to use redux or flux
    this.toolbar = new Toolbar(this.handleMessage.bind(this));
    this.mouseReader = new MouseReader(
      this.canvas,
      this.toolbar,
      this.handleMessage.bind(this)
    );

    this.initFpsmeter();
    this.toolbar.init();
  }

  addToDOM(Drawer, extraArgs) {
    this.drawer = new Drawer(
      {
        canvas: this.canvas,
        ...this.mouseReader.getViewport(),
      },
      extraArgs
    );

    // Set tick for fps meter, allows drawer to have no knowledge of handler
    this.drawer.tick = () => this.meter.tick();
    this.content.appendChild(this.canvas);
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

  loadCsv(path) {
    axios.get(require(path)).then((response) => {
      this.buildDataProcessor(response.data);

      this.clearDrawerBuffers();
      this.sendToDrawerBuffer(response.data);
      this.forceDrawerRender();
    });
  }

  handleMessage(message) {
    switch (message.type) {
      case "load":
        this.loadCsv(message.path);
        break;
      case "viewport":
        this.sendDrawerState(message.viewport);
        break;
      case "selectBox":
        this.selectPoints(message.points);
    }
  }

  sendDrawerState(viewport) {
    this.drawer.receiveState({ ...viewport });
  }

  forceDrawerRender() {
    this.drawer.render({ ...this.mouseReader.getViewport() });
  }

  sendToDrawerBuffer(responseData) {
    this.drawer.populateBuffers(responseData);
  }

  clearDrawerBuffers() {
    this.drawer.clearBuffers();
  }

  buildDataProcessor(data) {
    this.dataProcessor = new DataProcessor(data);
  }

  selectPoints(points) {
    this.dataProcessor.selectBox(points);
  }
}

export default Handler;
