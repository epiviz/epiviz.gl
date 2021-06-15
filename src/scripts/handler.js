import "fpsmeter";
import DataProcessor from "./data-processor";
import MouseReader from "./mouse-reader";
import Toolbar from "./toolbar";
import { getIfChangedReducer } from "./state/store";

const axios = require("axios");

class Handler {
  constructor(store) {
    this.store = store;
    this.store.subscribe(this.storeSubscription.bind(this));
    this.controlsChecker = getIfChangedReducer("controls");

    this.content = document.querySelector(".rendering-container");
    this.canvas = document.createElement("canvas");

    this.toolbar = new Toolbar(this.store.dispatch);
    this.mouseReader = new MouseReader(this.canvas, this.store.dispatch);

    this.width = Math.min(this.content.clientWidth, 1000);
    this.height = this.content.clientHeight * 0.9; // needs to match CSS canvas height
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.initFpsmeter();
  }

  storeSubscription() {
    const currState = this.store.getState();
    const dataset = this.controlsChecker("dataset");
    if (dataset) {
      this.loadCsv(currState.controls.dataset);
    }
    this.mouseReader.receiveState(currState);

    this.toolbar.updateSelectionWindowDisplay(
      currState.controls.viewport.xRange,
      currState.controls.viewport.yRange
    );

    this.sendDrawerState(currState.controls.viewport);
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
    this.toolbar.init();
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
    axios.get(path).then((response) => {
      this.buildDataProcessor(response.data);

      this.clearDrawerBuffers();
      this.sendToDrawerBuffer(response.data);
      this.forceDrawerRender();
    });
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
    if (points.length === 4) {
      this.dataProcessor.selectBox(points);
    } else if (points.length >= 6) {
      this.dataProcessor.selectLasso(points);
    }
  }
}

export default Handler;
