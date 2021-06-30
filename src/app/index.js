import Toolbar from "./toolbar";
import WebGLVis from "../epiviz.gl/webgl-vis";
import store, { getIfChanged } from "./store";

class App {
  /*
      The App class is meant to emulate an app that may use the webgl visualization as a component
  */
  constructor() {
    const container = document.querySelector(".content");
    this.visualization = new WebGLVis(container);
    this.visualization.addToDom();

    this.store = store;
    this.store.subscribe(this.subscription.bind(this));

    const toolbar = new Toolbar(this.store.dispatch);
    toolbar.init();

    document.getElementById("refresh-schema").onclick =
      this.onSchemaSubmit.bind(this);

    window.addEventListener("resize", this.onWindowResize.bind(this));
  }

  /**
   * The webgl visualization components are meant to leave application
   * state up to the developers, and this subscription is an example of
   * using redux to update the plot.
   */
  subscription() {
    const currState = this.store.getState();
    const schema = getIfChanged("schema");
    if (schema) {
      document.getElementById("schema-editor").value = schema;
    }

    this.visualization.setViewOptions({ ...currState });
  }

  onSchemaSubmit() {
    const schemaAsString = document.getElementById("schema-editor").value;
    const schema = JSON.parse(schemaAsString);
    this.visualization.setSchema(schema);
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
