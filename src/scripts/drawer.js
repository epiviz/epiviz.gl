class Drawer {
  /**
   * An interface for drawing on a canvas.
   *
   * @param {Object} drawingData object containing keys for {@link Drawer#receiveViewport}
   *  and canvas key used for drawing.
   */
  constructor(drawingData) {
    this.canvas = drawingData.canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.receiveViewport(drawingData);
  }

  /**
   * Method to set the viewport for the drawer.
   *
   * @param {Object} viewportData object containing minX,maxX,minY,maxY,xRange,yRange viewport data for drawer
   */
  receiveViewport(viewportData) {
    this.minX = viewportData.minX;
    this.maxX = viewportData.maxX;
    this.minY = viewportData.minY;
    this.maxY = viewportData.maxY;
    this.currentXRange = Array.from(viewportData.xRange);
    this.currentYRange = Array.from(viewportData.yRange);

    this.needsAnimation = true;
  }

  /**
   * Method to implement which signifies a frame has been processed. Used to
   * display FPS meter.
   */
  tick() {}

  /**
   * Method to implement animating a frame.
   */
  animate() {}

  /**
   * Method to implement preprocessing for rendering frames.
   */
  render() {
    if (this.lastFrame) {
      // Avoid overlapping animation requests
      cancelAnimationFrame(this.lastFrame);
    }
  }
}

export default Drawer;
