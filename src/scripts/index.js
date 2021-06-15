import OffscreenHandler from "./offscreen-handler";
import store from "./state/store";

document.addEventListener("DOMContentLoaded", () => {
  const handler = new OffscreenHandler(store);
  handler.addToDOM(
    new Worker(new URL("./offscreen-webgl-worker.js", import.meta.url)),
    new Worker(new URL("./data-processor-worker.js", import.meta.url))
  );

  handler.forceDrawerRender();
});
