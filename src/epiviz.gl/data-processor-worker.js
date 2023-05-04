/**
 * The data processor worker is meant to be an interface between the main thread
 * containing the {@link WebGLVis} a {@link DataProcessor}. It's main purpose
 * is to receive messages from the WebGLVis, call the appropriate method of
 * the DataProcessor, then post a message of the results of the method back to
 * the WebGLVis.
 */

import DataProcessor from "./data-processor";

self.onmessage = (message) => {
  function handleSelection(type, points) {
    const selectionMethod = type === "selectBox" ? "selectBox" : "selectLasso";
    const selection = self.processor[selectionMethod](points);
    postMessage({
      type,
      selection,
      bounds: points,
    });
  }

  function handlePoint(type, point) {
    const result = self.processor.getClosestPoint(point);
    postMessage({
      type,
      ...result,
    });
  }

  switch (message.data.type) {
    case "init":
      self.processor = new DataProcessor(message.data.specification);
      break;
    case "selectBox":
    case "selectLasso":
    case "getClosestPoint":
    case "getClickPoint":
      self.processor.indexDataIfNotAlreadyIndexed();
      if (
        message.data.type === "selectBox" ||
        message.data.type === "selectLasso"
      ) {
        handleSelection(message.data.type, message.data.points);
      } else {
        handlePoint(message.data.type, message.data.point);
      }
      break;
    default:
      console.error(`Received unknown message type: ${message.type}`);
  }
};
