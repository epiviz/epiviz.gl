import { expectCanvasToLookLike } from "../support";

const mouseReaderSelector = ".content > div > div";

describe("The mouse reader should handle zooming and panning", function () {
  let mouseReader;
  before(() => {
    cy.visit("http://localhost:1234");
    cy.get("#specification-select").select("scatter-grid");
    cy.get("#refresh-specification").click();

    cy.window().then((win) => {
      console.log("SET SIZE");
      console.log(win.app);
      win.app.visualization.setCanvasSize(200, 200);
      mouseReader = win.app.visualization.mouseReader;
    });
    cy.wait(1000); // Wait for drawing to occur
  });

  beforeEach(() => {
    cy.window().then((win) => {
      mouseReader.currentXRange = [0, 1];
      mouseReader.currentYRange = [0, 1];
      win.app.visualization.sendDrawerState(mouseReader.getViewport());
    });

    expectCanvasToLookLike("scatter-grid");
  });

  const assertMouseReaderWindowIs = (xRange, yRange) => {
    cy.window().then(() => {
      // need to access window to access mouseReader
      expect(mouseReader.currentXRange[0]).to.be.closeTo(xRange[0], 0.001);
      expect(mouseReader.currentXRange[1]).to.be.closeTo(xRange[1], 0.001);

      expect(mouseReader.currentYRange[0]).to.be.closeTo(yRange[0], 0.001);
      expect(mouseReader.currentYRange[1]).to.be.closeTo(yRange[1], 0.001);
    });
  };

  it("should zoom in and out", () => {
    cy.get(mouseReaderSelector).trigger("wheel", {
      wheelDelta: -200,
      layerX: 100,
      layerY: 100,
    });
    assertMouseReaderWindowIs([0.1, 0.9], [0.1, 0.9]);
    expectCanvasToLookLike("scatter-grid-zoomed");

    cy.get(mouseReaderSelector).trigger("wheel", {
      wheelDelta: 2000,
      layerX: 100,
      layerY: 100,
    });
    assertMouseReaderWindowIs([0, 1], [0, 1]);
    expectCanvasToLookLike("scatter-grid");
  });

  it("should not pan with no mousedown", () => {
    cy.get(mouseReaderSelector).trigger("mousemove", { movementX: -100 });
    assertMouseReaderWindowIs([0, 1], [0, 1]);
    expectCanvasToLookLike("scatter-grid");
  });

  it("should pan", () => {
    cy.get(mouseReaderSelector).trigger("wheel", {
      wheelDelta: -200,
      layerX: 100,
      layerY: 100,
    });
    assertMouseReaderWindowIs([0.1, 0.9], [0.1, 0.9]);
    expectCanvasToLookLike("scatter-grid-zoomed");

    cy.get(mouseReaderSelector).trigger("mousedown");
    cy.get(mouseReaderSelector).trigger("mousemove", { movementX: -125 });
    cy.get(mouseReaderSelector).trigger("mouseup");
    assertMouseReaderWindowIs([0.2, 1.0], [0.1, 0.9]);

    cy.get(mouseReaderSelector).trigger("mousedown");
    cy.get(mouseReaderSelector).trigger("mousemove", {
      movementX: 13,
      movementY: 13,
    });
    cy.get(mouseReaderSelector).trigger("mouseup");
    assertMouseReaderWindowIs([0.19, 0.99], [0.11, 0.91]);
  });

  it("does not zoom outside the domains", () => {
    cy.get(mouseReaderSelector).trigger("wheel", {
      wheelDelta: 100,
      layerX: 100,
      layerY: 100,
    });
    assertMouseReaderWindowIs([0, 1], [0, 1]);
    expectCanvasToLookLike("scatter-grid");
  });

  it("does not pan outside the domains", () => {
    cy.get(mouseReaderSelector).trigger("mousedown");
    cy.get(mouseReaderSelector).trigger("mousemove", {
      clientX: -200,
      clientY: -200,
    });
    cy.get(mouseReaderSelector).trigger("mouseup");
    assertMouseReaderWindowIs([0, 1.0], [0, 1]);
  });

  it("can lock the x and y axis", () => {
    cy.window().then((win) => {
      win.app.visualization.setViewOptions({ lockedX: true, lockedY: false });
    });
    cy.get(mouseReaderSelector).trigger("wheel", {
      wheelDelta: -200,
      layerX: 100,
      layerY: 100,
    });
    assertMouseReaderWindowIs([0, 1], [0.1, 0.9]);

    cy.window().then((win) => {
      win.app.visualization.setViewOptions({ lockedX: false, lockedY: true });
    });
    cy.get(mouseReaderSelector).trigger("wheel", {
      wheelDelta: -200,
      layerX: 100,
      layerY: 100,
    });
    assertMouseReaderWindowIs([0.1, 0.9], [0.1, 0.9]);
    expectCanvasToLookLike("scatter-grid-zoomed");

    cy.window().then((win) => {
      win.app.visualization.setViewOptions({ lockedX: false, lockedY: false });
    });
    cy.get(mouseReaderSelector).trigger("wheel", {
      wheelDelta: 2000,
      layerX: 100,
      layerY: 100,
    });

    assertMouseReaderWindowIs([0, 1], [0, 1]);
    expectCanvasToLookLike("scatter-grid");
  });

  it("can zoom to the mouse position", () => {
    cy.get(mouseReaderSelector).trigger("wheel", {
      wheelDelta: -100,
      layerX: 0,
      layerY: 0, // top left corner
    });
    assertMouseReaderWindowIs([0, 0.9], [0.1, 1]);

    cy.get(mouseReaderSelector).trigger("wheel", {
      wheelDelta: 150,
      layerX: 0,
      layerY: 0, // top left corner
    });
    assertMouseReaderWindowIs([0, 1], [0, 1]);
  });
});

describe("The mouse reader should select points appropriately", () => {
  let mouseReader;

  const expectThisManyPointsSelected = (pointCount) => {
    cy.wait(1000);
    cy.window().then((win) => {
      cy.wrap(win)
        .should("have.property", "app")
        .should("have.property", "visualization")
        .should("have.property", "dataWorkerStream")
        .then(() => {
          cy.wait(1000);
          const event = win.app.visualization.dataWorkerStream.pop();
          expect(event.data.selection.points.length).to.eq(pointCount);
        });
    });
  };

  before(() => {
    cy.visit("http://localhost:1234");
    cy.get("#specification-select").select("scatter-grid");
    cy.get("#refresh-specification").click();

    cy.window().then((win) => {
      win.app.visualization.setCanvasSize(200, 200);
      mouseReader = win.app.visualization.mouseReader;
    });
    cy.wait(1000); // Wait for drawing to occur
  });

  beforeEach(() => {
    cy.window().then((win) => {
      mouseReader.currentXRange = [0, 1];
      mouseReader.currentYRange = [0, 1];
      win.app.visualization.sendDrawerState(mouseReader.getViewport());
    });
  });

  it("selects points with a box", () => {
    cy.get(".controls > span:nth-child(2) > img").click();
    cy.get(mouseReaderSelector).trigger("mousedown", { layerX: 0, layerY: 0 });
    cy.get(mouseReaderSelector).trigger("mousemove", {
      layerX: 200,
      layerY: 200,
    });
    cy.get(mouseReaderSelector).trigger("mouseup");
    expectThisManyPointsSelected(25);

    cy.get(mouseReaderSelector).trigger("mousedown", {
      layerX: 25,
      layerY: 25,
    });
    cy.get(mouseReaderSelector).trigger("mousemove", {
      layerX: 175,
      layerY: 175,
    });
    cy.get(mouseReaderSelector).trigger("mouseup");
    expectThisManyPointsSelected(16);
  });

  it("selects points with a lasso", () => {
    cy.get(".controls > span:nth-child(3) > img").click();
    cy.get(mouseReaderSelector).trigger("mousedown", {
      layerX: 25,
      layerY: 25,
    });
    cy.get(mouseReaderSelector).trigger("mousemove", {
      layerX: 175,
      layerY: 25,
    });

    cy.get(mouseReaderSelector).trigger("mousemove", {
      layerX: 175,
      layerY: 175,
    });
    cy.get(mouseReaderSelector).trigger("mousemove", {
      layerX: 25,
      layerY: 50,
    });

    cy.get(mouseReaderSelector).trigger("mouseup");
    expectThisManyPointsSelected(10);

    cy.get(mouseReaderSelector).trigger("mousedown", {
      layerX: 100,
      layerY: 75,
    });
    cy.get(mouseReaderSelector).trigger("mousemove", {
      layerX: 175,
      layerY: 175,
    });
    cy.get(mouseReaderSelector).trigger("mousemove", {
      layerX: 100,
      layerY: 125,
    });
    cy.get(mouseReaderSelector).trigger("mouseup");
    expectThisManyPointsSelected(2);
  });

  it("selects points with a box when zoomed in", () => {
    cy.get(mouseReaderSelector).trigger("wheel", {
      wheelDelta: -200,
      layerX: 100,
      layerY: 100,
    });
    cy.get(".controls > span:nth-child(2) > img").click();
    cy.get(mouseReaderSelector).trigger("mousedown", { layerX: 0, layerY: 0 });
    cy.get(mouseReaderSelector).trigger("mousemove", {
      layerX: 200,
      layerY: 200,
    });
    cy.get(mouseReaderSelector).trigger("mouseup");
    expectThisManyPointsSelected(16);

    cy.get(mouseReaderSelector).trigger("mousedown", {
      layerX: 30,
      layerY: 30,
    });
    cy.get(mouseReaderSelector).trigger("mousemove", {
      layerX: 170,
      layerY: 170,
    });
    cy.get(mouseReaderSelector).trigger("mouseup");
    expectThisManyPointsSelected(4);
  });

  it("selects points with a lasso when zoomed in", () => {
    cy.get(".controls > span:nth-child(3) > img").click();
    cy.get(mouseReaderSelector).trigger("wheel", {
      wheelDelta: -200,
      layerX: 100,
      layerY: 100,
    });

    cy.get(mouseReaderSelector).trigger("mousedown", {
      layerX: 20,
      layerY: 20,
    });
    cy.get(mouseReaderSelector).trigger("mousemove", {
      layerX: 180,
      layerY: 20,
    });

    cy.get(mouseReaderSelector).trigger("mousemove", {
      layerX: 180,
      layerY: 180,
    });
    cy.get(mouseReaderSelector).trigger("mousemove", {
      layerX: 20,
      layerY: 50,
    });

    cy.get(mouseReaderSelector).trigger("mouseup");
    expectThisManyPointsSelected(10);

    cy.get(mouseReaderSelector).trigger("mousedown", {
      layerX: 100,
      layerY: 75,
    });
    cy.get(mouseReaderSelector).trigger("mousemove", {
      layerX: 175,
      layerY: 175,
    });
    cy.get(mouseReaderSelector).trigger("mousemove", {
      layerX: 100,
      layerY: 125,
    });
    cy.get(mouseReaderSelector).trigger("mouseup");
    expectThisManyPointsSelected(1);
  });
});
