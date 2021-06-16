class Drawer {
  constructor(data) {
    this.canvas = data.canvas;
    this.width = data.canvas.width;
    this.height = data.canvas.height;
    this.receiveState(data);
  }

  receiveState(viewportData) {
    this.minX = viewportData.minX;
    this.maxX = viewportData.maxX;
    this.minY = viewportData.minY;
    this.maxY = viewportData.maxY;
    this.currentXRange = Array.from(viewportData.xRange);
    this.currentYRange = Array.from(viewportData.yRange);

    this.needsAnimation = true;
  }

  tick() {}

  animate() {}

  render() {
    if (this.lastFrame) {
      // Avoid overlapping animation requests
      cancelAnimationFrame(this.lastFrame);
    }
  }
}

export default Drawer;
