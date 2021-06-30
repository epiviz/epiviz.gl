/**
 * The offscreen webgl worker is meant to communicate from the {@link Scatterplot}
 * by sending data to the drawer to populate its buffers for drawing. Most messages
 * passed are containing the new viewport information for the drawer to process.
 */
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
      self.drawer.receiveViewport(message.data);
      break;
    case "render":
      self.drawer.receiveViewport(message.data);
      self.drawer.render();
      break;
    case "schema":
      self.drawer.setSchema(message.data.schema);
      break;
    case "clearBuffers":
      self.drawer.clearBuffers();
      break;
    case "resize":
      self.drawer.canvas.width = message.data.width;
      self.drawer.canvas.height = message.data.height;
      self.drawer.gl.viewport(0, 0, message.data.width, message.data.height);
      break;
    default:
      console.error(`Received unknown message type: ${message.type}`);
  }
};
