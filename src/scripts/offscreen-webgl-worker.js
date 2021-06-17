/**
 * The offscreen webgl worker is meant to communicate from the {@link Scatterplot}
 * by sending data to the drawer to populate its buffers for drawing. Most messages
 * passed are containing the new viewport information for the drawer to process.
 */
import WebGLDrawer from "./webgl-drawer";
import { deserialize } from "./utilities";

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
    case "buffer":
      self.drawer.populateBuffers({
        ...message.data,
        mapPointToSpace: deserialize(message.data.mapPointToSpace),
        mapPointToColor: deserialize(message.data.mapPointToColor),
      });
      break;
    case "clearBuffers":
      self.drawer.clearBuffers();
      break;
    default:
      console.error(`Received unknown message type: ${message.type}`);
  }
};
