import WebGLVis from "./webgl-vis";

class Scatterplot extends WebGLVis {
  setData(data) {
    this.clearDrawerBuffers();
    this.sendToDrawerBuffer(data, options);
    this.buildDataProcessor(data, options);

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

  ////////////////////////////
  // Communication with drawer
  ////////////////////////////

  ////////////////////////////////////
  // Communication with data processor
  ////////////////////////////////////

  /**
   * Utility method to call constructor of {@link DataProcessor}.
   *
   * @param {Array} data to process
   */
}

export default Scatterplot;
