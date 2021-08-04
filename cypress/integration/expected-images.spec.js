import {
  expectCanvasToLookLike,
  allPresetNames,
  longPresets,
} from "../support";

describe("The canvas should match test images", function () {
  before(() => {
    cy.visit("http://localhost:1234");
    cy.wait(200);
  });

  const renderAndCheck = (presetName, wait = 1000) => {
    cy.get("#schema-select").select(presetName);
    cy.get("#refresh-schema").click();
    cy.window().then((win) => {
      win.app.visualization.setCanvasSize(200, 200);
    });
    expectCanvasToLookLike(presetName, wait);
  };

  for (const presetName of allPresetNames) {
    it(`should match the ${presetName} preset with the integration test recording`, function () {
      if (longPresets.includes(presetName)) {
        renderAndCheck(presetName, 10000);
      } else {
        renderAndCheck(presetName);
      }
    });
  }
});
