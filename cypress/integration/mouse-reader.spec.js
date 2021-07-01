import { expectCanvasToLookLike } from "../support";

describe("The mouse reader should handle zooming and panning", function () {
  let mouseReader;
  before(() => {
    cy.visit("http://localhost:1234");
    cy.window().then((win) => {
      win.app.visualization.setCanvasSize(200, 200);
      mouseReader = win.app.visualization.mouseReader;
    });
    cy.wait(100); // wait for resize to occur
    cy.get("#schema-select").select("scatter-grid");
    cy.get("#refresh-schema").click();
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
    cy.get("#mouse-reader").trigger("wheel", { wheelDelta: -100 });
    assertMouseReaderWindowIs([0.1, 0.9], [0.1, 0.9]);
    expectCanvasToLookLike("scatter-grid-zoomed");

    cy.get("#mouse-reader").trigger("wheel", { wheelDelta: 100 });
    assertMouseReaderWindowIs([0, 1], [0, 1]);
    expectCanvasToLookLike("scatter-grid");
  });

  it("should not pan with no mousedown", () => {
    cy.get("#mouse-reader").trigger("mousemove", { movementX: -100 });
    assertMouseReaderWindowIs([0, 1], [0, 1]);
    expectCanvasToLookLike("scatter-grid");
  });

  it("should pan", () => {
    cy.get("#mouse-reader").trigger("wheel", { wheelDelta: -100 });
    assertMouseReaderWindowIs([0.1, 0.9], [0.1, 0.9]);
    expectCanvasToLookLike("scatter-grid-zoomed");

    cy.get("#mouse-reader").trigger("mousedown");
    cy.get("#mouse-reader").trigger("mousemove", { movementX: -100 });
    cy.get("#mouse-reader").trigger("mouseup");
    assertMouseReaderWindowIs([0.2, 1.0], [0.1, 0.9]);

    cy.get("#mouse-reader").trigger("mousedown");
    cy.get("#mouse-reader").trigger("mousemove", {
      movementX: 10,
      movementY: 10,
    });
    cy.get("#mouse-reader").trigger("mouseup");
    assertMouseReaderWindowIs([0.19, 0.99], [0.11, 0.91]);
  });

  it("does not zoom outside the domains", () => {
    cy.get("#mouse-reader").trigger("wheel", { wheelDelta: 100 });
    assertMouseReaderWindowIs([0, 1], [0, 1]);
    expectCanvasToLookLike("scatter-grid");
  });

  it("does not pan outside the domains", () => {
    cy.get("#mouse-reader").trigger("mousedown");
    cy.get("#mouse-reader").trigger("mousemove", {
      movementX: -200,
      movementY: -200,
    });
    cy.get("#mouse-reader").trigger("mouseup");
    assertMouseReaderWindowIs([0.2, 1.0], [0, 0.8]);
  });
});

describe("The mouse reader should select points appropriately", () => {
  let mouseReader;

  const expectThisManyPointsSelected = (pointCount) => {
    cy.wait(100);
    cy.window().then((win) => {
      const event = win.app.visualization.dataWorkerStream.pop();
      expect(event.data.selection.length).to.eq(pointCount);
    });
  };

  before(() => {
    cy.visit("http://localhost:1234");
    cy.window().then((win) => {
      win.app.visualization.setCanvasSize(200, 200);
      mouseReader = win.app.visualization.mouseReader;
    });
    cy.wait(100); // wait for resize to occur
    cy.get("#schema-select").select("scatter-grid");
    cy.get("#refresh-schema").click();
    cy.wait(1000); // Wait for drawing to occur
  });

  it("selects points with a box", () => {
    cy.get(".controls > img:nth-child(2)").click();
    cy.get("#mouse-reader").trigger("mousedown", { layerX: 0, layerY: 0 });
    cy.get("#mouse-reader").trigger("mousemove", {
      layerX: 200,
      layerY: 200,
    });
    cy.get("#mouse-reader").trigger("mouseup");
    expectThisManyPointsSelected(25);

    cy.get("#mouse-reader").trigger("mousedown", { layerX: 25, layerY: 25 });
    cy.get("#mouse-reader").trigger("mousemove", {
      layerX: 175,
      layerY: 175,
    });
    cy.get("#mouse-reader").trigger("mouseup");
    expectThisManyPointsSelected(16);
  });

  it("selects points with a lasso", () => {
    cy.get(".controls > img:nth-child(3)").click();
    cy.get("#mouse-reader").trigger("mousedown", { layerX: 25, layerY: 25 });
    cy.get("#mouse-reader").trigger("mousemove", {
      layerX: 175,
      layerY: 25,
    });

    cy.get("#mouse-reader").trigger("mousemove", {
      layerX: 175,
      layerY: 175,
    });
    cy.get("#mouse-reader").trigger("mousemove", {
      layerX: 25,
      layerY: 50,
    });

    cy.get("#mouse-reader").trigger("mouseup");
    expectThisManyPointsSelected(10);

    cy.get("#mouse-reader").trigger("mousedown", { layerX: 100, layerY: 75 });
    cy.get("#mouse-reader").trigger("mousemove", {
      layerX: 175,
      layerY: 175,
    });
    cy.get("#mouse-reader").trigger("mousemove", {
      layerX: 100,
      layerY: 125,
    });
    cy.get("#mouse-reader").trigger("mouseup");
    expectThisManyPointsSelected(2);
  });
});
