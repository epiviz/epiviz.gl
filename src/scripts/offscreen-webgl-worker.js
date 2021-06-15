import WebGLDrawer from "./webgl-drawer";

class OffscreenWebGLDrawer extends WebGLDrawer {
  tick() {
    postMessage({ type: "tick" });
  }
}

self.onmessage = (message) => {
  switch (message.data.type) {
    case "init":
      self.drawer = new OffscreenWebGLDrawer(message.data);
      break;
    case "viewport":
      self.drawer.receiveState(message.data);
      break;
    case "render":
      self.drawer.receiveState(message.data);
      self.drawer.render();
      break;
    case "buffer":
      self.drawer.populateBuffers(message.data.responseData);
      break;
    case "clearBuffers":
      self.drawer.clearBuffers();
      break;
    default:
      console.error(`Received unknown message type: ${message.type}`);
  }
};
