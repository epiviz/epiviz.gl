(function () {
  importScripts("./index.dc12603f.js");
  var $parcel$global = typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : {};
  var parcelRequire = $parcel$global.parcelRequire3582;
  var $467f05d4fa8d08894f84e9cd2c03a15c$init = parcelRequire("291vL");
  $467f05d4fa8d08894f84e9cd2c03a15c$init();
  self.onmessage = message => {
    switch (message.data.type) {
      case "init":
        self.processor = new ($467f05d4fa8d08894f84e9cd2c03a15c$init().default)(message.data.data);
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
})();

//# sourceMappingURL=data-processor-worker.4682cc01.js.map
