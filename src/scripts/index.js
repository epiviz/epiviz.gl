import "@fortawesome/fontawesome-free/js/all.js";

import OffscreenHandler from "./offscreen-handler";

// Explicitly include these for parcel
require("../data/tsne.csv");
require("../data/tsne_tenth.csv");
require("../data/tsne_hundreth.csv");

document.addEventListener("DOMContentLoaded", () => {
  const handler = new OffscreenHandler();
  handler.addToDOM(
    new Worker("./offscreen-webgl-worker.js"),
    new Worker("./data-processor-worker.js")
  );

  handler.forceDrawerRender();
});
