import Toolbar from "./toolbar";
import WebGLVis from "./webgl-vis";
import store, { getIfChanged } from "./state/store";

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
}

document.addEventListener("DOMContentLoaded", () => {
  const app = new App();

  document.getElementById("refresh-schema").onclick =
    app.onSchemaSubmit.bind(app);
});
