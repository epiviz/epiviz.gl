import csv1 from "url:../data/tsne.csv";
import csv10 from "url:../data/tsne_tenth.csv";
import csv100 from "url:../data/tsne_hundreth.csv";

class Toolbar {
  constructor(messenger) {
    this.messenger = messenger;

    this.lockedX = false;
    this.lockedY = false;
    this.mouseAction = "pan";
    this.dataset = "tsne-10";
  }

  init() {
    document.getElementById("lock-x").addEventListener("change", (event) => {
      this.lockedX = event.target.checked;
    });

    document.getElementById("lock-y").addEventListener("change", (event) => {
      this.lockedY = event.target.checked;
    });

    document.getElementById("dataset").value = this.dataset;
    this.messenger({
      type: "load",
      path: this.determineDatasetPath(this.dataset),
    });

    document.getElementById("dataset").addEventListener("change", (event) => {
      this.dataset = event.target.value;
      this.messenger({
        type: "load",
        path: this.determineDatasetPath(this.dataset),
      });
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
      4
    )}, ${currentXRange[1].toFixed(4)}] x [${currentYRange[0].toFixed(
      4
    )}, ${currentYRange[1].toFixed(4)}]`;
  }

  determineDatasetPath(dataset) {
    switch (dataset) {
      case "tsne":
        return csv1;
      case "tsne-10":
        return csv10;
      case "tsne-100":
        return csv100;
      default:
        console.error(`Did not recognize dataset: ${dataset}`);
    }
  }
}

export default Toolbar;
