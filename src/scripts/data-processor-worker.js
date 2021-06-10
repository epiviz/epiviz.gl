import DataProcessor from "./data-processor";

self.onmessage = (message) => {
  switch (message.data.type) {
    case "init":
      self.processor = new DataProcessor(message.data.data);
      break;
    case "selectBox":
      self.processor.selectBox(message.data.points);
      break;
    case "selectLasso":
      self.processor.selectLasso(message.data.points);
      break;
    default:
      console.error(`Received unknown message type: ${message.type}`);
  }
};
