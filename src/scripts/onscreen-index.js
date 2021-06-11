import Handler from "./handler";
import WebGLDrawer from "./webgl-drawer";

document.addEventListener("DOMContentLoaded", () => {
  const handler = new Handler();
  handler.addToDOM(WebGLDrawer);

  handler.forceDrawerRender();
});
