import { getCanvasImage, allPresetNames, longPresets } from "../support";

describe("Integration test recording test suite", function () {
  const recordPreset = (presetName, wait = 1000) => {
    cy.get("#specification-select").select(presetName);
    cy.get("#refresh-specification").click();
    cy.window().then((win) => {
      win.app.visualization.setCanvasSize(200, 200);
    });
    cy.wait(wait); // Wait for drawing to occur

    getCanvasImage().then((canvasData) => {
      cy.writeFile(
        `cypress/fixtures/test-images/${presetName}.png`,
        canvasData,
        "base64"
      );
    });
  };

  before(function () {
    if (!Cypress.env("recording")) {
      cy.log("SKIPPING recording integration tests.");
      this.skip();
    } else {
      cy.log("RECORDING integration tests.");
      cy.visit("http://localhost:1234");
    }
  });

  for (const presetName of allPresetNames) {
    it(`recording the ${presetName} preset`, function () {
      if (longPresets.includes(presetName)) {
        recordPreset(presetName, 10000);
      } else {
        recordPreset(presetName);
      }
    });
  }
});
