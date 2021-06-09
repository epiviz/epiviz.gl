import Handler from "./handler";
import WebGLDrawer from "./webgl-drawer";

// Explicitly include these for parcel
require("../data/tsne.csv");
require("../data/tsne_tenth.csv");
require("../data/tsne_hundreth.csv");

document.addEventListener("DOMContentLoaded", () => {
  const handler = new Handler();
  handler.addToDOM(WebGLDrawer);

  handler.forceDrawerRender();
});
