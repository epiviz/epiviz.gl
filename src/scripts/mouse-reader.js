class MouseReader {
  constructor(element, toolbar, messenger) {
    this.element = element;
    this.toolbar = toolbar;
    this.messenger = messenger;

    this.minX = -10;
    this.maxX = 10;
    this.minY = -10;
    this.maxY = 10;

    this.currentXRange = [-10, 10];
    this.currentYRange = [-10, 10];
  }

  init() {
    window.addEventListener("wheel", (e) => e.preventDefault(), {
      passive: false,
    });

    this.element.addEventListener(
      "wheel",
      (event) => {
        if (!this.toolbar.lockedX) {
          const previousX = [...this.currentXRange]; // ... to avoid aliasing
          this.currentXRange[0] -= event.wheelDelta / 500;
          this.currentXRange[1] += event.wheelDelta / 500;
          this.currentXRange[0] = Math.max(this.currentXRange[0], this.minX);
          this.currentXRange[1] = Math.min(this.currentXRange[1], this.maxX);

          if (this.currentXRange[1] < this.currentXRange[0]) {
            // Zoom in limit
            this.currentXRange = previousX;
          }
        }

        if (!this.toolbar.lockedY) {
          const previousY = [...this.currentYRange];
          this.currentYRange[0] -= event.wheelDelta / 500;
          this.currentYRange[1] += event.wheelDelta / 500;
          this.currentYRange[0] = Math.max(this.currentYRange[0], this.minY);
          this.currentYRange[1] = Math.min(this.currentYRange[1], this.maxY);

          if (this.currentYRange[1] < this.currentYRange[0]) {
            // Zoom in limit
            this.currentYRange = previousY;
          }
        }

        this.toolbar.updateSelectionWindowDisplay(
          this.currentXRange,
          this.currentYRange
        );
        this.messenger();

        return false;
      },
      false
    );

    let isMoving = false;
    this.element.addEventListener(
      "mousedown",
      () => {
        isMoving = this.toolbar.mouseAction === "pan";
      },
      false
    );

    this.element.addEventListener(
      "mousemove",
      (event) => {
        if (!isMoving) {
          return false;
        }

        if (!this.toolbar.lockedX) {
          const previousX = [...this.currentXRange]; // ... to avoid aliasing
          this.currentXRange[0] -= event.movementX / 50;
          this.currentXRange[1] -= event.movementX / 50;
          this.currentXRange[0] = Math.max(this.currentXRange[0], this.minX);
          this.currentXRange[1] = Math.min(this.currentXRange[1], this.maxX);

          if (this.currentXRange[1] < this.currentXRange[0]) {
            this.currentXRange = previousX;
          }
        }

        if (!this.toolbar.lockedY) {
          const previousY = [...this.currentYRange];
          this.currentYRange[0] += event.movementY / 50;
          this.currentYRange[1] += event.movementY / 50;
          this.currentYRange[0] = Math.max(this.currentYRange[0], this.minY);
          this.currentYRange[1] = Math.min(this.currentYRange[1], this.maxY);

          if (this.currentYRange[1] < this.currentYRange[0]) {
            this.currentYRange = previousY;
          }
        }

        this.messenger();
        this.toolbar.updateSelectionWindowDisplay(
          this.currentXRange,
          this.currentYRange
        );
      },
      false
    );

    this.element.addEventListener("mouseup", () => {
      isMoving = false;
    });
    this.element.addEventListener("mouseleave", () => {
      isMoving = false;
    });
  }

  getViewport() {
    return {
      minX: this.minX,
      maxX: this.maxX,
      minY: this.minY,
      maxY: this.maxY,
      currentXRange: this.currentXRange,
      currentYRange: this.currentYRange,
    };
  }
}

export default MouseReader;
