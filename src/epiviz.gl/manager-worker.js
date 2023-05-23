import {
  DATA_WORKER_NAME,
  WEBGL_WORKER_NAME,
  cloneArrayBuffer,
  fetchArrayBuffer,
  prepareData,
  transformSpecification,
} from "./utilities";

const webglWorker = new Worker(
  new URL("offscreen-webgl-worker.js", import.meta.url),
  { type: "module" }
);

webglWorker.onmessage = (message) => {
  // This is a hack to get around the fact that the webgl worker
  // is not able to request animation frames. Instead, we will
  // request animation frames from the manager worker and then
  // pass the message along to the webgl worker.
  if (message.data?.command === "requestAnimationFrame") {
    requestAnimationFrame(() => {
      webglWorker.postMessage({ type: "animate" });
    });
    return;
  }

  self.postMessage({
    worker: WEBGL_WORKER_NAME,
    data: message.data,
  });
};

const dataWorker = new Worker(
  new URL("data-processor-worker.js", import.meta.url),
  { type: "module" }
);

dataWorker.onmessage = (message) => {
  self.postMessage({
    worker: DATA_WORKER_NAME,
    data: message.data,
  });
};

self.onmessage = (message) => {
  const { worker, data, action } = message.data;

  if (action === "setSpecification") {
    transformSpecification(data.specification).then(
      ({ specification, buffers }) => {
        const clonedBuffers = buffers.map(cloneArrayBuffer);

        webglWorker.postMessage(
          {
            type: "specification",
            specification,
          },
          clonedBuffers
        );

        dataWorker.postMessage(
          {
            type: "init",
            specification,
          },
          buffers
        );
      }
    );
    return;
  }

  switch (worker) {
    case WEBGL_WORKER_NAME:
      if (data.type === "init") {
        webglWorker.postMessage(data, [data.canvas]);
      } else {
        webglWorker.postMessage(data);
      }
      break;
    case DATA_WORKER_NAME:
      dataWorker.postMessage(data);
      break;
    default:
      throw new Error(`Unknown worker: ${worker}`);
  }
};
