import DataProcessor from "../../src/epiviz.gl/data-processor";
import { GenomeScale } from "../../src/epiviz.gl/genome-sizes";

const getDefaultData = () => ({
  x: [1, 2, 3, 4, 5, 6, 7],
  y: [1, 2, 3, 4, 5, 6, 7],
  category: ["a", "b", "b", "a", "b", "b", "a"],
});

const getDefaultGenomicData = () => ({
  chr: ["1", "1", "1", "1", "1", "1", "1"],
  start: [1, 100, 200, 300, 400, 500, 600],
  end: [10, 110, 310, 305, 450, 605, 700],
  category: ["a", "a", "b", "a", "a", "b", "a"],
});

const specificationPoints = {
  defaultData: getDefaultData(),
  tracks: [
    {
      mark: "point",
      x: {
        attribute: "x",
        type: "quantitative",
        domain: [1, 7],
      },
      y: {
        attribute: "y",
        type: "quantitative",
        domain: [1, 7],
      },
    },
  ],
};

const specificationRects = {
  defaultData: getDefaultData(),
  tracks: [
    {
      mark: "rect",
      x: {
        attribute: "x",
        type: "quantitative",
        domain: [1, 7],
      },
      y: {
        attribute: "y",
        type: "quantitative",
        domain: [1, 7],
      },
      width: {
        value: 20,
      },
      height: {
        value: 20,
      },
    },
  ],
};

const specificationTicks = {
  defaultData: getDefaultData(),
  tracks: [
    {
      mark: "tick",
      x: {
        attribute: "x",
        type: "quantitative",
        domain: [1, 7],
      },
      y: {
        attribute: "y",
        type: "quantitative",
        domain: [1, 7],
      },
      height: {
        value: 10,
      },
    },
  ],
};

const specificationTicksWidth = JSON.parse(JSON.stringify(specificationTicks));
specificationTicksWidth.tracks[0].height = { value: 0 };
specificationTicksWidth.tracks[0].width = { value: 10 };

const specificationArcs = {
  defaultData: getDefaultData(),
  tracks: [
    {
      mark: "arc",
      x: {
        attribute: "x",
        type: "quantitative",
        domain: [1, 7],
      },
      y: {
        attribute: "y",
        type: "quantitative",
        domain: [1, 7],
      },
      height: {
        value: 0,
      },
      width: {
        value: 10,
      },
    },
  ],
};

const specificationGenomicPoints = {
  defaultData: getDefaultGenomicData(),
  tracks: [
    {
      mark: "point",
      x: {
        type: "genomic",
        chrAttribute: "chr",
        geneAttribute: "start",
        domain: ["chr1:1", "chr1:1000"],
        genome: "hg38",
      },
      y: { value: 0 },
    },
  ],
};

const specificationGenomicRange = {
  defaultData: getDefaultGenomicData(),
  tracks: [
    {
      mark: "rect",
      x: {
        type: "genomicRange",
        chrAttribute: "chr",
        startAttribute: "start",
        endAttribute: "end",
        domain: ["chr1:1", "chr1:1000"],
        genome: "hg38",
      },
      y: { value: 0 },
      height: { value: 10 },
    },
  ],
};

const specificationGenomicArcs = {
  defaultData: {
    ...getDefaultGenomicData(),
    start2: [2, 101, 201, 301, 401, 501, 601],
    end2: [11, 111, 311, 301, 451, 606, 701],
  },
  tracks: [
    {
      mark: "arc",
      x: {
        type: "genomicRange",
        chrAttribute: "chr",
        startAttribute: "start",
        endAttribute: "end",
        domain: ["chr1:1", "chr1:1000"],
        genome: "hg38",
      },
      width: {
        type: "genomicRange",
        chrAttribute: "chr",
        startAttribute: "start2",
        endAttribute: "end2",
        domain: ["chr1:1", "chr1:1000"],
        genome: "hg38",
      },
      y: { value: 0 },
      height: { value: 0 },
    },
  ],
};

const testGenomeScale = new GenomeScale("hg38", ["chr1:1", "chr1:1000"]);

describe("Box selection", () => {
  let dataProcessor;

  it("can select points with a box", () => {
    // Deep copy to since specification processor modifies original object
    dataProcessor = new DataProcessor(
      JSON.parse(JSON.stringify(specificationPoints))
    );

    cy.wrap(dataProcessor)
      .should("have.property", "index")
      .then(() => {
        const { points: allPoints } = dataProcessor.selectBox([1, 1, 7, 7]);

        expect(allPoints).to.have.lengthOf(
          specificationPoints.defaultData.x.length
        );
        expect(allPoints.map((datum) => datum.category)).to.include.members(
          specificationPoints.defaultData.category
        );

        const { points: somePoints } = dataProcessor.selectBox([2, 2, 4, 4]);
        expect(somePoints).to.have.lengthOf(3);

        const { points: onePoint } = dataProcessor.selectBox([5, 5, 5, 5]);
        expect(onePoint).to.have.lengthOf(1);

        const { points: noPoints } = dataProcessor.selectBox([
          10, 10, 100, 100,
        ]);
        expect(noPoints).to.have.lengthOf(0);
      });
  });

  it("can select rects with a box", () => {
    dataProcessor = new DataProcessor(
      JSON.parse(JSON.stringify(specificationRects))
    );

    cy.wrap(dataProcessor)
      .should("have.property", "index")
      .then(() => {
        const { points: allPoints } = dataProcessor.selectBox([1, 1, 7, 7]);
        expect(allPoints).to.have.lengthOf(
          specificationPoints.defaultData.x.length
        );
        expect(allPoints.map((datum) => datum.category)).to.include.members(
          specificationPoints.defaultData.category
        );

        // some points
        expect(
          dataProcessor.selectBox([1.1, 1.1, 3.3, 3.3]).points
        ).to.have.lengthOf(3);

        // lower left corner
        expect(
          dataProcessor.selectBox([3.9, 3.9, 4.5, 4.5]).points
        ).to.have.lengthOf(1);

        // lower right corner
        expect(
          dataProcessor.selectBox([5.3, 4.9, 5.5, 5.1]).points
        ).to.have.lengthOf(1);

        // top left corner
        expect(
          dataProcessor.selectBox([0.1, 1.1, 1.1, 2.1]).points
        ).to.have.lengthOf(1);

        // top right corner
        expect(
          dataProcessor.selectBox([5.9, 5.9, 6.1, 6.1]).points
        ).to.have.lengthOf(1);

        // no points
        expect(
          dataProcessor.selectBox([10, 10, 100, 100]).points
        ).to.have.lengthOf(0);
      });
  });

  it("can select ticks with a box (height)", () => {
    dataProcessor = new DataProcessor(
      JSON.parse(JSON.stringify(specificationTicks))
    );

    cy.wrap(dataProcessor)
      .should("have.property", "index")
      .then(() => {
        const allPoints = dataProcessor.selectBox([1, 1, 7, 7]).points;
        expect(allPoints).to.have.lengthOf(
          specificationPoints.defaultData.x.length
        );
        expect(allPoints.map((datum) => datum.category)).to.include.members(
          specificationPoints.defaultData.category
        );

        // some points
        expect(
          dataProcessor.selectBox([1.1, 1.1, 3.3, 3.3]).points
        ).to.have.lengthOf(2);

        // no points
        expect(
          dataProcessor.selectBox([1.1, 0, 1.1, 10]).points
        ).to.have.length(0);
        expect(
          dataProcessor.selectBox([10, 10, 100, 100]).points
        ).to.have.lengthOf(0);

        // center of tick
        expect(dataProcessor.selectBox([1, 0.9, 1, 1.1]).points).to.have.length(
          1
        );

        // top of tick
        expect(dataProcessor.selectBox([1, 1.3, 1, 2]).points).to.have.length(
          1
        );

        // bottom of tick
        expect(dataProcessor.selectBox([1, 0.9, 1, 1.1]).points).to.have.length(
          1
        );
      });
  });

  it("can select ticks with a box (width)", () => {
    dataProcessor = new DataProcessor(
      JSON.parse(JSON.stringify(specificationTicksWidth))
    );

    cy.wrap(dataProcessor)
      .should("have.property", "index")
      .then(() => {
        const allPoints = dataProcessor.selectBox([1, 1, 7, 7]).points;
        expect(allPoints).to.have.lengthOf(
          specificationTicks.defaultData.x.length
        );
        expect(allPoints.map((datum) => datum.category)).to.include.members(
          specificationTicks.defaultData.category
        );

        // some points
        expect(
          dataProcessor.selectBox([1, 1, 3.3, 3.3]).points
        ).to.have.lengthOf(3);

        // no points
        expect(
          dataProcessor.selectBox([0, 1.1, 10, 1.1]).points
        ).to.have.length(0);
        expect(
          dataProcessor.selectBox([10, 10, 100, 100]).points
        ).to.have.lengthOf(0);

        // center of tick
        expect(dataProcessor.selectBox([0.9, 1, 1.1, 1]).points).to.have.length(
          1
        );

        // left of tick
        expect(dataProcessor.selectBox([0.9, 1, 1, 1]).points).to.have.length(
          1
        );

        // right of tick
        expect(dataProcessor.selectBox([1.1, 1, 1.5, 1]).points).to.have.length(
          1
        );
      });
  });

  it("can select arcs with a box", () => {
    dataProcessor = new DataProcessor(
      JSON.parse(JSON.stringify(specificationArcs))
    );

    cy.wrap(dataProcessor)
      .should("have.property", "index")
      .then(() => {
        const allPoints = dataProcessor.selectBox([1, 1, 7, 7]).points;
        expect(allPoints).to.have.lengthOf(
          specificationArcs.defaultData.x.length
        );
        expect(allPoints.map((datum) => datum.category)).to.include.members(
          specificationPoints.defaultData.category
        );

        // some points, arc bbox only includes the endpoints
        expect(
          dataProcessor.selectBox([1.1, 1.1, 3.3, 3.3]).points
        ).to.have.lengthOf(2);

        // lower left corner
        expect(
          dataProcessor.selectBox([3.9, 3.9, 4.5, 4.5]).points
        ).to.have.lengthOf(1);

        // lower right corner
        expect(
          dataProcessor.selectBox([5.3, 4.9, 5.5, 5.1]).points
        ).to.have.lengthOf(1);

        // no points
        expect(
          dataProcessor.selectBox([10, 10, 100, 100]).points
        ).to.have.lengthOf(0);
      });
  });

  it("can select genomic ranges with a box", () => {
    dataProcessor = new DataProcessor(
      JSON.parse(JSON.stringify(specificationGenomicRange))
    );

    cy.wrap(dataProcessor)
      .should("have.property", "index")
      .then(() => {
        const allPoints = dataProcessor.selectBox([
          testGenomeScale.toClipSpaceFromString("chr1:1"),
          -1,
          testGenomeScale.toClipSpaceFromString("chr1:1000"),
          1,
        ]).points;
        expect(allPoints).to.have.lengthOf(
          specificationGenomicPoints.defaultData.start.length
        );
        expect(allPoints.map((datum) => datum.category)).to.include.members(
          specificationGenomicPoints.defaultData.category
        );
        expect(
          dataProcessor.selectBox([
            testGenomeScale.toClipSpaceFromString("chr1:1"),
            -1,
            testGenomeScale.toClipSpaceFromString("chr1:10"),
            1,
          ]).points
        ).to.have.length(1);
        expect(
          dataProcessor.selectBox([
            testGenomeScale.toClipSpaceFromString("chr1:1"),
            0,
            testGenomeScale.toClipSpaceFromString("chr1:100"),
            0,
          ]).points
        ).to.have.length(2);
        expect(
          dataProcessor.selectBox([
            testGenomeScale.toClipSpaceFromString("chr1:1"),
            0,
            testGenomeScale.toClipSpaceFromString("chr1:199"),
            0,
          ]).points
        ).to.have.length(2);
        expect(
          dataProcessor.selectBox([
            testGenomeScale.toClipSpaceFromString("chr1:100"),
            0,
            testGenomeScale.toClipSpaceFromString("chr1:310"),
            0,
          ]).points
        ).to.have.length(3);
        expect(
          dataProcessor.selectBox([
            testGenomeScale.toClipSpaceFromString("chr1:500"),
            -1,
            testGenomeScale.toClipSpaceFromString("chr1:700"),
            1,
          ]).points
        ).to.have.length(2);
        expect(
          dataProcessor.selectBox([
            testGenomeScale.toClipSpaceFromString("chr1:200"),
            -1,
            testGenomeScale.toClipSpaceFromString("chr1:310"),
            1,
          ]).points
        ).to.have.length(2);
        expect(
          dataProcessor.selectBox([
            testGenomeScale.toClipSpaceFromString("chr1:499"),
            -1,
            testGenomeScale.toClipSpaceFromString("chr1:501"),
            1,
          ]).points
        ).to.have.length(1);
      });
  });

  it("can select genomic points with a box", () => {
    dataProcessor = new DataProcessor(
      JSON.parse(JSON.stringify(specificationGenomicPoints))
    );

    cy.wrap(dataProcessor)
      .should("have.property", "index")
      .then(() => {
        const allPoints = dataProcessor.selectBox([
          testGenomeScale.toClipSpaceFromString("chr1:1"),
          -1,
          testGenomeScale.toClipSpaceFromString("chr1:1000"),
          1,
        ]).points;
        expect(allPoints).to.have.lengthOf(
          specificationGenomicPoints.defaultData.start.length
        );
        expect(allPoints.map((datum) => datum.category)).to.include.members(
          specificationGenomicPoints.defaultData.category
        );
        expect(
          dataProcessor.selectBox([
            testGenomeScale.toClipSpaceFromString("chr1:1"),
            -1,
            testGenomeScale.toClipSpaceFromString("chr1:10"),
            1,
          ]).points
        ).to.have.length(1);
        expect(
          dataProcessor.selectBox([
            testGenomeScale.toClipSpaceFromString("chr1:1"),
            0,
            testGenomeScale.toClipSpaceFromString("chr1:100"),
            0,
          ]).points
        ).to.have.length(2);
        expect(
          dataProcessor.selectBox([
            testGenomeScale.toClipSpaceFromString("chr1:1"),
            0,
            testGenomeScale.toClipSpaceFromString("chr1:199"),
            0,
          ]).points
        ).to.have.length(2);
        expect(
          dataProcessor.selectBox([
            testGenomeScale.toClipSpaceFromString("chr1:100"),
            0,
            testGenomeScale.toClipSpaceFromString("chr1:310"),
            0,
          ]).points
        ).to.have.length(3);
        expect(
          dataProcessor.selectBox([
            testGenomeScale.toClipSpaceFromString("chr1:500"),
            -1,
            testGenomeScale.toClipSpaceFromString("chr1:700"),
            1,
          ]).points
        ).to.have.length(2);
        expect(
          dataProcessor.selectBox([
            testGenomeScale.toClipSpaceFromString("chr1:1"),
            -1,
            testGenomeScale.toClipSpaceFromString("chr1:200"),
            1,
          ]).points
        ).to.have.length(3);
        expect(
          dataProcessor.selectBox([
            testGenomeScale.toClipSpaceFromString("chr1:500"),
            -1,
            testGenomeScale.toClipSpaceFromString("chr1:500"),
            1,
          ]).points
        ).to.have.length(1);
      });
  });

  it("can select genomic arcs with a box", () => {
    dataProcessor = new DataProcessor(
      JSON.parse(JSON.stringify(specificationGenomicArcs))
    );

    cy.wrap(dataProcessor)
      .should("have.property", "index")
      .then(() => {
        const allPoints = dataProcessor.selectBox([
          testGenomeScale.toClipSpaceFromString("chr1:1"),
          -1,
          testGenomeScale.toClipSpaceFromString("chr1:1000"),
          1,
        ]).points;
        expect(allPoints).to.have.lengthOf(
          specificationGenomicArcs.defaultData.start.length
        );
        expect(allPoints.map((datum) => datum.category)).to.include.members(
          specificationGenomicArcs.defaultData.category
        );
        expect(
          dataProcessor.selectBox([
            testGenomeScale.toClipSpaceFromString("chr1:1"),
            -1,
            testGenomeScale.toClipSpaceFromString("chr1:10"),
            1,
          ]).points
        ).to.have.length(1);
        expect(
          dataProcessor.selectBox([
            testGenomeScale.toClipSpaceFromString("chr1:1"),
            0,
            testGenomeScale.toClipSpaceFromString("chr1:110"),
            0,
          ]).points
        ).to.have.length(2);
        expect(
          dataProcessor.selectBox([
            testGenomeScale.toClipSpaceFromString("chr1:1"),
            0,
            testGenomeScale.toClipSpaceFromString("chr1:199"),
            0,
          ]).points
        ).to.have.length(2);
        expect(
          dataProcessor.selectBox([
            testGenomeScale.toClipSpaceFromString("chr1:100"),
            0,
            testGenomeScale.toClipSpaceFromString("chr1:310"),
            0,
          ]).points
        ).to.have.length(3);
        expect(
          dataProcessor.selectBox([
            testGenomeScale.toClipSpaceFromString("chr1:500"),
            -1,
            testGenomeScale.toClipSpaceFromString("chr1:700"),
            1,
          ]).points
        ).to.have.length(2);
        expect(
          dataProcessor.selectBox([
            testGenomeScale.toClipSpaceFromString("chr1:100"),
            -1,
            testGenomeScale.toClipSpaceFromString("chr1:312"),
            1,
          ]).points
        ).to.have.length(3);
        expect(
          dataProcessor.selectBox([
            testGenomeScale.toClipSpaceFromString("chr1:550"),
            -1,
            testGenomeScale.toClipSpaceFromString("chr1:655"),
            1,
          ]).points
        ).to.have.length(2);
      });
  });
});

describe("Lasso selection", () => {
  // These tests don't need to be as expansive as the box select, since lasso select simply wraps
  // around box select and then uses @turf/boolean-point-in-polygon

  let dataProcessor;

  it("can select points with a lasso", () => {
    // Deep copy to since specification processor modifies original object
    dataProcessor = new DataProcessor(
      JSON.parse(JSON.stringify(specificationPoints))
    );

    cy.wrap(dataProcessor)
      .should("have.property", "index")
      .then(() => {
        expect(
          dataProcessor.selectLasso([1, 1, 2, 1, 3, 2, 2, 2.5]).points
        ).to.have.length(2);
      });
  });

  it("can select rects with a lasso", () => {
    dataProcessor = new DataProcessor(
      JSON.parse(JSON.stringify(specificationRects))
    );

    cy.wrap(dataProcessor)
      .should("have.property", "index")
      .then(() => {
        expect(
          dataProcessor.selectLasso([1, 1, 2, 1, 3, 2, 2, 2.5]).points
        ).to.have.length(2);
      });
  });

  it("can select ticks with a lasso (height)", () => {
    dataProcessor = new DataProcessor(
      JSON.parse(JSON.stringify(specificationTicks))
    );

    cy.wrap(dataProcessor)
      .should("have.property", "index")
      .then(() => {
        expect(
          dataProcessor.selectLasso([1, 1, 2, 1, 3, 2, 2, 2.5]).points
        ).to.have.length(2);
      });
  });

  it("can select ticks with a lasso (width)", () => {
    dataProcessor = new DataProcessor(
      JSON.parse(JSON.stringify(specificationTicksWidth))
    );

    cy.wrap(dataProcessor)
      .should("have.property", "index")
      .then(() => {
        expect(
          dataProcessor.selectLasso([1, 1, 2, 1, 3, 2, 2, 2.5]).points
        ).to.have.length(2);
      });
  });

  it("can select arcs with a lasso", () => {
    dataProcessor = new DataProcessor(
      JSON.parse(JSON.stringify(specificationArcs))
    );

    cy.wrap(dataProcessor)
      .should("have.property", "index")
      .then(() => {
        expect(
          dataProcessor.selectLasso([1, 1, 2, 1, 3, 2, 2, 2.5]).points
        ).to.have.length(2);
      });
  });

  it("can select genomic ranges with a lasso", () => {
    dataProcessor = new DataProcessor(
      JSON.parse(JSON.stringify(specificationGenomicPoints))
    );

    cy.wrap(dataProcessor)
      .should("have.property", "index")
      .then(() => {
        expect(
          dataProcessor.selectLasso([
            testGenomeScale.toClipSpaceFromString("chr1:90"),
            -0.1,
            testGenomeScale.toClipSpaceFromString("chr1:100"),
            -0.15,
            testGenomeScale.toClipSpaceFromString("chr1:250"),
            -0.2,
            testGenomeScale.toClipSpaceFromString("chr1:352"),
            -0.1,
            testGenomeScale.toClipSpaceFromString("chr1:340"),
            0.1,
            testGenomeScale.toClipSpaceFromString("chr1:10"),
            0.1,
          ]).points
        ).to.have.length(3);
      });
  });

  it("can select genomic points with a lasso", () => {
    dataProcessor = new DataProcessor(
      JSON.parse(JSON.stringify(specificationGenomicPoints))
    );

    cy.wrap(dataProcessor)
      .should("have.property", "index")
      .then(() => {
        expect(
          dataProcessor.selectLasso([
            testGenomeScale.toClipSpaceFromString("chr1:90"),
            -0.1,
            testGenomeScale.toClipSpaceFromString("chr1:100"),
            -0.15,
            testGenomeScale.toClipSpaceFromString("chr1:250"),
            -0.2,
            testGenomeScale.toClipSpaceFromString("chr1:352"),
            -0.1,
            testGenomeScale.toClipSpaceFromString("chr1:340"),
            0.1,
            testGenomeScale.toClipSpaceFromString("chr1:10"),
            0.1,
          ]).points
        ).to.have.length(3);
      });
  });

  it("can select genomic arcs with a lasso", () => {
    dataProcessor = new DataProcessor(
      JSON.parse(JSON.stringify(specificationGenomicArcs))
    );

    cy.wrap(dataProcessor)
      .should("have.property", "index")
      .then(() => {
        expect(
          dataProcessor.selectLasso([
            testGenomeScale.toClipSpaceFromString("chr1:90"),
            -0.1,
            testGenomeScale.toClipSpaceFromString("chr1:100"),
            -0.15,
            testGenomeScale.toClipSpaceFromString("chr1:250"),
            -0.2,
            testGenomeScale.toClipSpaceFromString("chr1:352"),
            -0.1,
            testGenomeScale.toClipSpaceFromString("chr1:340"),
            0.1,
            testGenomeScale.toClipSpaceFromString("chr1:10"),
            0.1,
          ]).points
        ).to.have.length(3);
      });
  });
});

describe("Get closest point", () => {
  let dataProcessor;

  it("can get the closest point in cartesian space", () => {
    // Deep copy to since specification processor modifies original object
    dataProcessor = new DataProcessor(
      JSON.parse(JSON.stringify(specificationPoints))
    );

    cy.wrap(dataProcessor)
      .should("have.property", "index")
      .then(() => {
        let closest = dataProcessor.getClosestPoint([1.1, 1.1]).closestPoint;
        expect(closest.category).to.eq("a");
        expect(closest.x).to.eq(1);
        expect(closest.y).to.eq(1);

        closest = dataProcessor.getClosestPoint([5.2, 5.2]).closestPoint;
        expect(closest.category).to.eq("b");
        expect(closest.x).to.eq(5);
        expect(closest.y).to.eq(5);
      });
  });

  it("can get the closest point in cartesian space with a max distance", () => {
    // Deep copy to since specification processor modifies original object
    dataProcessor = new DataProcessor(
      JSON.parse(JSON.stringify(specificationPoints))
    );

    cy.wrap(dataProcessor)
      .should("have.property", "index")
      .then(() => {
        let closest = dataProcessor.getClosestPoint([1, 1]);
        expect(closest.closestPoint.category).to.eq("a");
        expect(closest.closestPoint.x).to.eq(1);
        expect(closest.closestPoint.y).to.eq(1);
        expect(closest.isInside).to.eq(true);
        expect(closest.distance).to.eq(0);

        closest = dataProcessor.getClosestPoint([1.1, 1.1]);
        expect(closest.closestPoint.category).to.eq("a");
        expect(closest.closestPoint.x).to.eq(1);
        expect(closest.closestPoint.y).to.eq(1);
        expect(closest.isInside).to.eq(false);
        expect(closest.distance).to.be.closeTo(
          Math.sqrt(1 / 10 ** 2 + 1 / 10 ** 2),
          1e-10
        );
      });
  });

  it("can get the closest point in a rectangle in cartesian space with a max distance", () => {
    // Deep copy to since specification processor modifies original object
    dataProcessor = new DataProcessor(
      JSON.parse(JSON.stringify(specificationRects))
    );

    cy.wrap(dataProcessor)
      .should("have.property", "index")
      .then(() => {
        let closest = dataProcessor.getClosestPoint([1.1, 1.1]);
        expect(closest.closestPoint.category).to.eq("a");
        expect(closest.closestPoint.x).to.eq(1);
        expect(closest.closestPoint.y).to.eq(1);
        expect(closest.isInside).to.eq(true);
        expect(closest.distance).to.eq(0);

        closest = dataProcessor.getClosestPoint([2, 1.5]);
        expect(closest.closestPoint.category).to.eq("a");
        expect(closest.closestPoint.x).to.eq(1);
        expect(closest.closestPoint.y).to.eq(1);
        expect(closest.isInside).to.eq(false);
        expect(closest.distance).to.be.closeTo(
          Math.sqrt(1 ** 2 + 1 / 2 ** 2),
          1e-10
        );
      });
  });

  it("can get the closest point in genomic space", () => {
    // Deep copy to since specification processor modifies original object
    dataProcessor = new DataProcessor(
      JSON.parse(JSON.stringify(specificationGenomicPoints))
    );

    cy.wrap(dataProcessor)
      .should("have.property", "index")
      .then(() => {
        let closest = dataProcessor.getClosestPoint([
          testGenomeScale.toClipSpaceFromString("chr1:101"),
          0,
        ]).closestPoint;
        expect(closest.category).to.eq("a");
        expect(closest.start).to.eq(100);

        closest = dataProcessor.getClosestPoint([
          testGenomeScale.toClipSpaceFromString("chr1:501"),
          0,
        ]).closestPoint;
        expect(closest.category).to.eq("b");
        expect(closest.end).to.eq(605);
      });
  });
});
