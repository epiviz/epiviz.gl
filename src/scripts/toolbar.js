class Toolbar {
  constructor(messenger) {
    this.messenger = messenger;

    this.lockedX = false;
    this.lockedY = false;
    this.mouseAction = "pan";
    this.dataset = "tsne";
  }

  init() {
    document.getElementById("lock-x").addEventListener("change", (event) => {
      this.lockedX = event.target.checked;
    });

    document.getElementById("lock-y").addEventListener("change", (event) => {
      this.lockedY = event.target.checked;
    });

    document.getElementById("dataset").value = this.dataset;
    this.messenger(this.determineDatasetPath(this.dataset));

    document.getElementById("dataset").addEventListener("change", (event) => {
      this.dataset = event.target.value;
      this.messenger(this.determineDatasetPath(this.dataset));
    });

    this.prevIcon = null; // force only 1 icon to have selected class
    document.querySelectorAll(".controls img").forEach((icon) => {
      icon.addEventListener("click", () => {
        // useless hack to save lines of code
        if (this.prevIcon) {
          this.prevIcon.classList.remove("selected");
        }
        this.mouseAction = icon.alt.substring(0, icon.alt.indexOf(" "));
        icon.classList.add("selected");
        this.prevIcon = icon;
      });
    });
  }

  updateSelectionWindowDisplay(currentXRange, currentYRange) {
    // This may slow down the rendering since it needs to call the DOM before animating, may need to remove for true benchmark
    document.querySelector(
      ".selection-window"
    ).textContent = `[${currentXRange[0].toFixed(
      2
    )}, ${currentXRange[1].toFixed(2)}] x [${currentYRange[0].toFixed(
      2
    )}, ${currentYRange[1].toFixed(2)}]`;
  }

  determineDatasetPath(dataset) {
    switch (dataset) {
      case "tsne":
        return "../data/tsne.csv";
      case "tsne-10":
        return "../data/tsne_tenth.csv";
      case "tsne-100":
        return "../data/tsne_hundreth.csv";
      default:
        console.error(`Did not recognize dataset: ${dataset}`);
    }
  }
}

export default Toolbar;
