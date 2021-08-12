import Toolbar from "./toolbar";
import WebGLVis from "../../src/";
import store, { getIfChanged } from "./store";

class App {
  /*
      The App class is meant to emulate an app that may use the webgl visualization as a component
  */
  constructor() {
    const container = document.querySelector(".content");
    this.visualization = new WebGLVis(container);
    this.visualization.addToDom(true);

    // Demonstration of adding mouse events
    this.visualization.addEventListener("zoomIn", (event) =>
      console.log("zoomIn", event)
    );
    this.visualization.addEventListener("zoomOut", (event) =>
      console.log("zoomOut", event)
    );
    this.visualization.addEventListener("onSelection", (event) =>
      console.log("onSelection", event)
    );
    this.visualization.addEventListener("onSelectionEnd", (event) =>
      console.log("onSelectionEnd", event)
    );
    this.visualization.addEventListener("pointHovered", (event) =>
      console.log("pointHovered", event)
    );
    this.visualization.addEventListener("pan", (event) =>
      console.log("pan", event)
    );

    this.store = store;
    this.store.subscribe(this.subscription.bind(this));

    const toolbar = new Toolbar(this.store.dispatch);
    toolbar.init();

    document.getElementById("refresh-specification").onclick =
      this.onSpecificationSubmit.bind(this);

    window.addEventListener("resize", this.onWindowResize.bind(this));
  }

  /**
   * The webgl visualization components are meant to leave application
   * state up to the developers, and this subscription is an example of
   * using redux to update the plot.
   */
  subscription() {
    const currState = this.store.getState();
    const specification = getIfChanged("specification");
    if (specification) {
      document.getElementById("specification-editor").value = specification;
    }

    this.visualization.setViewOptions({ ...currState });
  }

  onSpecificationSubmit() {
    const specificationAsString = document.getElementById(
      "specification-editor"
    ).value;
    const specification = JSON.parse(specificationAsString);
    this.visualization.setSpecification(specification);
  }

  onWindowResize() {
    this.visualization.setCanvasSize(
      this.visualization.parent.clientWidth,
      this.visualization.parent.clientHeight
    );
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.app = new App(); // Add to window for testing purposes
});
