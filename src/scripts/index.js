import OffscreenHandler from "./offscreen-handler";

document.addEventListener("DOMContentLoaded", () => {
  const handler = new OffscreenHandler();
  handler.addToDOM(
    new Worker(new URL("./offscreen-webgl-worker.js", import.meta.url)),
    new Worker(new URL("./data-processor-worker.js", import.meta.url))
  );

  handler.forceDrawerRender();
});
