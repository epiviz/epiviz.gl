// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

// Alternatively you can use CommonJS syntax:
// require('./commands')

const expectCanvasToLookLike = (presetName, wait = 100) => {
  cy.wait(wait); // wait for drawing
  cy.get("canvas")
    .then(($c) => {
      return $c[0].toDataURL("image/png").replace("data:image/png;base64,", "");
    })
    .then((canvasData) => {
      cy.readFile(
        `cypress/fixtures/test-images/${presetName}.png`,
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

export { expectCanvasToLookLike };
