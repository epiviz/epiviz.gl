import { expectCanvasToLookLike } from "../support";

describe("The canvas should match test images", function () {
  before(() => {
    cy.visit("http://localhost:1234");
  });

  const renderAndCheck = (presetName) => {
    cy.get("#schema-select").select(presetName);
    cy.get("#refresh-schema").click();
    cy.window().then((win) => {
      win.app.visualization.setCanvasSize(200, 200);
    });
    cy.wait(1000); // Wait for drawing to occur
    expectCanvasToLookLike(presetName);
  };

  it("renders a basic line plot correctly", () => {
    renderAndCheck("line-plot");
  });

  it("renders a basic double line plot correctly", () => {
    renderAndCheck("double-line-plot");
  });

  it("renders a basic area chart correctly", () => {
    renderAndCheck("area-chart");
  });

  it("renders a 1/100th of the tsne data correctly", () => {
    renderAndCheck("double-line-plot");
  });

  it("renders the scatter grid correctly", () => {
    renderAndCheck("scatter-grid");
  });
});
