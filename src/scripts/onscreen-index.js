import Handler from "./handler";
import WebGLDrawer from "./webgl-drawer";
import store from "./state/store";

document.addEventListener("DOMContentLoaded", () => {
  const handler = new Handler(store);
  handler.addToDOM(WebGLDrawer);

  handler.forceDrawerRender();
});
