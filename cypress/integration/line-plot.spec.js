describe("My First Test", () => {
  it("Does not do much!", () => {
    cy.visit("http://localhost:1234");

    cy.window()
      .then((win) => {
        win.app.visualization.setCanvasSize(200, 200);
        console.log(win);
      })
      .then(() => {
        cy.get("#schema-select").select("line-plot");
        cy.get("#refresh-schema").click();
        cy.wait(1000);
        cy.get("canvas").then(($c) => {
          console.log($c[0].toDataURL());
        });

        expect(true).to.equal(true);
      });
  });
});
