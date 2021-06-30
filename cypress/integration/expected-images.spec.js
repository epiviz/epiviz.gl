describe("The canvas should match test images", function () {
  before(() => {
    cy.visit("http://localhost:1234");
    cy.window().then((win) => {
      win.app.visualization.setCanvasSize(200, 200);
    });
    cy.wait(100); // wait for resize to occur
  });

  const renderAndCheck = (presetName) => {
    cy.get("#schema-select").select(presetName);
    cy.get("#refresh-schema").click();
    cy.wait(1000); // Wait for drawing to occur
    cy.get("canvas")
      .then(($c) => {
        return $c[0]
          .toDataURL("image/png")
          .replace("data:image/png;base64,", "");
      })
      .then((canvasData) => {
        cy.readFile(
          `cypress/integration/test-images/${presetName}.png`,
          "base64"
        ).then((correctImage) => {
          try {
            expect(canvasData).to.eq(correctImage);
          } catch (err) {
            cy.writeFile(
              `cypress/integration/failed-test-images/${presetName}.png`,
              canvasData,
              "base64"
            ).then(() => {
              expect(0).to.eq(
                1,
                `${presetName} did not produce the correct test image!`
              );
            });
          }
        });
      });
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
});
