/**
 * The data processor worker is meant to be an interface between the main thread
 * containing the {@link Scatterplot} a {@link DataProcessor}. It's main purpose
 * is to receive messages from the Scatterplot, call the appropriate method of
 * the DataProcessor, then post a message of the results of the method back to
 * the scatterplot.
 */

import DataProcessor from "./data-processor";
import { deserialize } from "./utilities";

self.onmessage = (message) => {
  switch (message.data.type) {
    case "init":
      self.processor = new DataProcessor(
        message.data.data,
        deserialize(message.data.mapPointToSpace)
      );
      break;
    case "selectBox":
      postMessage({
        type: message.data.type,
        selection: self.processor.selectBox(message.data.points),
      });
      break;
    case "selectLasso":
      postMessage({
        type: message.data.type,
        selection: self.processor.selectLasso(message.data.points),
      });
      break;
    case "getClosestPoint":
      postMessage({
        type: message.data.type,
        point: self.processor.getClosestPoint(message.data.point),
      });
      break;
    default:
      console.error(`Received unknown message type: ${message.type}`);
  }
};
