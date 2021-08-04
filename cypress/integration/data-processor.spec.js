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

const schemaPoints = {
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

const schemaRects = {
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

const schemaTicks = {
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

const schemaTicksWidth = JSON.parse(JSON.stringify(schemaTicks));
schemaTicksWidth.tracks[0].height = { value: 0 };
schemaTicksWidth.tracks[0].width = { value: 10 };

const schemaArcs = {
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

const schemaGenomicPoints = {
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

const schemaGenomicRange = {
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

const schemaGenomicArcs = {
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
    // Deep copy to since schema processor modifies original object
    dataProcessor = new DataProcessor(JSON.parse(JSON.stringify(schemaPoints)));

    cy.wrap(dataProcessor)
      .should("have.property", "index")
      .then(() => {
        const allPoints = dataProcessor.selectBox([1, 1, 7, 7]);
        expect(allPoints).to.have.lengthOf(schemaPoints.defaultData.x.length);
        expect(allPoints.map((datum) => datum.category)).to.include.members(
          schemaPoints.defaultData.category
        );

        const somePoints = dataProcessor.selectBox([2, 2, 4, 4]);
        expect(somePoints).to.have.lengthOf(3);

        const onePoint = dataProcessor.selectBox([5, 5, 5, 5]);
        expect(onePoint).to.have.lengthOf(1);

        const noPoints = dataProcessor.selectBox([10, 10, 100, 100]);
        expect(noPoints).to.have.lengthOf(0);
      });
  });

  it("can select rects with a box", () => {
    dataProcessor = new DataProcessor(JSON.parse(JSON.stringify(schemaRects)));

    cy.wrap(dataProcessor)
      .should("have.property", "index")
      .then(() => {
        const allPoints = dataProcessor.selectBox([1, 1, 7, 7]);
        expect(allPoints).to.have.lengthOf(schemaPoints.defaultData.x.length);
        expect(allPoints.map((datum) => datum.category)).to.include.members(
          schemaPoints.defaultData.category
        );

        // some points
        expect(dataProcessor.selectBox([1.1, 1.1, 3.3, 3.3])).to.have.lengthOf(
          3
        );

        // lower left corner
        expect(dataProcessor.selectBox([3.9, 3.9, 4.5, 4.5])).to.have.lengthOf(
          1
        );

        // lower right corner
        expect(dataProcessor.selectBox([5.3, 4.9, 5.5, 5.1])).to.have.lengthOf(
          1
        );

        // top left corner
        expect(dataProcessor.selectBox([0.1, 1.1, 1.1, 2.1])).to.have.lengthOf(
          1
        );

        // top right corner
        expect(dataProcessor.selectBox([5.9, 5.9, 6.1, 6.1])).to.have.lengthOf(
          1
        );

        // no points
        expect(dataProcessor.selectBox([10, 10, 100, 100])).to.have.lengthOf(0);
      });
  });

  it("can select ticks with a box (height)", () => {
    dataProcessor = new DataProcessor(JSON.parse(JSON.stringify(schemaTicks)));

    cy.wrap(dataProcessor)
      .should("have.property", "index")
      .then(() => {
        const allPoints = dataProcessor.selectBox([1, 1, 7, 7]);
        expect(allPoints).to.have.lengthOf(schemaPoints.defaultData.x.length);
        expect(allPoints.map((datum) => datum.category)).to.include.members(
          schemaPoints.defaultData.category
        );

        // some points
        expect(dataProcessor.selectBox([1.1, 1.1, 3.3, 3.3])).to.have.lengthOf(
          2
        );

        // no points
        expect(dataProcessor.selectBox([1.1, 0, 1.1, 10])).to.have.length(0);
        expect(dataProcessor.selectBox([10, 10, 100, 100])).to.have.lengthOf(0);

        // center of tick
        expect(dataProcessor.selectBox([1, 0.9, 1, 1.1])).to.have.length(1);

        // top of tick
        expect(dataProcessor.selectBox([1, 1.3, 1, 2])).to.have.length(1);

        // bottom of tick
        expect(dataProcessor.selectBox([1, 0.9, 1, 1.1])).to.have.length(1);
      });
  });

  it("can select ticks with a box (width)", () => {
    dataProcessor = new DataProcessor(
      JSON.parse(JSON.stringify(schemaTicksWidth))
    );

    cy.wrap(dataProcessor)
      .should("have.property", "index")
      .then(() => {
        const allPoints = dataProcessor.selectBox([1, 1, 7, 7]);
        expect(allPoints).to.have.lengthOf(schemaTicks.defaultData.x.length);
        expect(allPoints.map((datum) => datum.category)).to.include.members(
          schemaTicks.defaultData.category
        );

        // some points
        expect(dataProcessor.selectBox([1, 1, 3.3, 3.3])).to.have.lengthOf(3);

        // no points
        expect(dataProcessor.selectBox([0, 1.1, 10, 1.1])).to.have.length(0);
        expect(dataProcessor.selectBox([10, 10, 100, 100])).to.have.lengthOf(0);

        // center of tick
        expect(dataProcessor.selectBox([0.9, 1, 1.1, 1])).to.have.length(1);

        // left of tick
        expect(dataProcessor.selectBox([0.9, 1, 1, 1])).to.have.length(1);

        // right of tick
        expect(dataProcessor.selectBox([1.1, 1, 1.5, 1])).to.have.length(1);
      });
  });

  it("can select arcs with a box", () => {
    dataProcessor = new DataProcessor(JSON.parse(JSON.stringify(schemaArcs)));

    cy.wrap(dataProcessor)
      .should("have.property", "index")
      .then(() => {
        const allPoints = dataProcessor.selectBox([1, 1, 7, 7]);
        expect(allPoints).to.have.lengthOf(schemaArcs.defaultData.x.length);
        expect(allPoints.map((datum) => datum.category)).to.include.members(
          schemaPoints.defaultData.category
        );

        // some points, arc bbox only includes the endpoints
        expect(dataProcessor.selectBox([1.1, 1.1, 3.3, 3.3])).to.have.lengthOf(
          2
        );

        // lower left corner
        expect(dataProcessor.selectBox([3.9, 3.9, 4.5, 4.5])).to.have.lengthOf(
          1
        );

        // lower right corner
        expect(dataProcessor.selectBox([5.3, 4.9, 5.5, 5.1])).to.have.lengthOf(
          1
        );

        // no points
        expect(dataProcessor.selectBox([10, 10, 100, 100])).to.have.lengthOf(0);
      });
  });

  it("can select genomic ranges with a box", () => {
    dataProcessor = new DataProcessor(
      JSON.parse(JSON.stringify(schemaGenomicRange))
    );

    cy.wrap(dataProcessor)
      .should("have.property", "index")
      .then(() => {
        const allPoints = dataProcessor.selectBox([
          testGenomeScale.toClipSpaceFromString("chr1:1"),
          -1,
          testGenomeScale.toClipSpaceFromString("chr1:1000"),
          1,
        ]);
        expect(allPoints).to.have.lengthOf(
          schemaGenomicPoints.defaultData.start.length
        );
        expect(allPoints.map((datum) => datum.category)).to.include.members(
          schemaGenomicPoints.defaultData.category
        );
        expect(
          dataProcessor.selectBox([
            testGenomeScale.toClipSpaceFromString("chr1:1"),
            -1,
            testGenomeScale.toClipSpaceFromString("chr1:10"),
            1,
          ])
        ).to.have.length(1);
        expect(
          dataProcessor.selectBox([
            testGenomeScale.toClipSpaceFromString("chr1:1"),
            0,
            testGenomeScale.toClipSpaceFromString("chr1:100"),
            0,
          ])
        ).to.have.length(2);
        expect(
          dataProcessor.selectBox([
            testGenomeScale.toClipSpaceFromString("chr1:1"),
            0,
            testGenomeScale.toClipSpaceFromString("chr1:199"),
            0,
          ])
        ).to.have.length(2);
        expect(
          dataProcessor.selectBox([
            testGenomeScale.toClipSpaceFromString("chr1:100"),
            0,
            testGenomeScale.toClipSpaceFromString("chr1:310"),
            0,
          ])
        ).to.have.length(3);
        expect(
          dataProcessor.selectBox([
            testGenomeScale.toClipSpaceFromString("chr1:500"),
            -1,
            testGenomeScale.toClipSpaceFromString("chr1:700"),
            1,
          ])
        ).to.have.length(2);
        expect(
          dataProcessor.selectBox([
            testGenomeScale.toClipSpaceFromString("chr1:200"),
            -1,
            testGenomeScale.toClipSpaceFromString("chr1:310"),
            1,
          ])
        ).to.have.length(2);
        expect(
          dataProcessor.selectBox([
            testGenomeScale.toClipSpaceFromString("chr1:499"),
            -1,
            testGenomeScale.toClipSpaceFromString("chr1:501"),
            1,
          ])
        ).to.have.length(1);
      });
  });

  it("can select genomic points with a box", () => {
    dataProcessor = new DataProcessor(
      JSON.parse(JSON.stringify(schemaGenomicPoints))
    );

    cy.wrap(dataProcessor)
      .should("have.property", "index")
      .then(() => {
        const allPoints = dataProcessor.selectBox([
          testGenomeScale.toClipSpaceFromString("chr1:1"),
          -1,
          testGenomeScale.toClipSpaceFromString("chr1:1000"),
          1,
        ]);
        expect(allPoints).to.have.lengthOf(
          schemaGenomicPoints.defaultData.start.length
        );
        expect(allPoints.map((datum) => datum.category)).to.include.members(
          schemaGenomicPoints.defaultData.category
        );
        expect(
          dataProcessor.selectBox([
            testGenomeScale.toClipSpaceFromString("chr1:1"),
            -1,
            testGenomeScale.toClipSpaceFromString("chr1:10"),
            1,
          ])
        ).to.have.length(1);
        expect(
          dataProcessor.selectBox([
            testGenomeScale.toClipSpaceFromString("chr1:1"),
            0,
            testGenomeScale.toClipSpaceFromString("chr1:100"),
            0,
          ])
        ).to.have.length(2);
        expect(
          dataProcessor.selectBox([
            testGenomeScale.toClipSpaceFromString("chr1:1"),
            0,
            testGenomeScale.toClipSpaceFromString("chr1:199"),
            0,
          ])
        ).to.have.length(2);
        expect(
          dataProcessor.selectBox([
            testGenomeScale.toClipSpaceFromString("chr1:100"),
            0,
            testGenomeScale.toClipSpaceFromString("chr1:310"),
            0,
          ])
        ).to.have.length(3);
        expect(
          dataProcessor.selectBox([
            testGenomeScale.toClipSpaceFromString("chr1:500"),
            -1,
            testGenomeScale.toClipSpaceFromString("chr1:700"),
            1,
          ])
        ).to.have.length(2);
        expect(
          dataProcessor.selectBox([
            testGenomeScale.toClipSpaceFromString("chr1:1"),
            -1,
            testGenomeScale.toClipSpaceFromString("chr1:200"),
            1,
          ])
        ).to.have.length(3);
        expect(
          dataProcessor.selectBox([
            testGenomeScale.toClipSpaceFromString("chr1:500"),
            -1,
            testGenomeScale.toClipSpaceFromString("chr1:500"),
            1,
          ])
        ).to.have.length(1);
      });
  });

  it("can select genomic arcs with a box", () => {
    dataProcessor = new DataProcessor(
      JSON.parse(JSON.stringify(schemaGenomicArcs))
    );

    cy.wrap(dataProcessor)
      .should("have.property", "index")
      .then(() => {
        const allPoints = dataProcessor.selectBox([
          testGenomeScale.toClipSpaceFromString("chr1:1"),
          -1,
          testGenomeScale.toClipSpaceFromString("chr1:1000"),
          1,
        ]);
        expect(allPoints).to.have.lengthOf(
          schemaGenomicArcs.defaultData.start.length
        );
        expect(allPoints.map((datum) => datum.category)).to.include.members(
          schemaGenomicArcs.defaultData.category
        );
        expect(
          dataProcessor.selectBox([
            testGenomeScale.toClipSpaceFromString("chr1:1"),
            -1,
            testGenomeScale.toClipSpaceFromString("chr1:10"),
            1,
          ])
        ).to.have.length(1);
        expect(
          dataProcessor.selectBox([
            testGenomeScale.toClipSpaceFromString("chr1:1"),
            0,
            testGenomeScale.toClipSpaceFromString("chr1:110"),
            0,
          ])
        ).to.have.length(2);
        expect(
          dataProcessor.selectBox([
            testGenomeScale.toClipSpaceFromString("chr1:1"),
            0,
            testGenomeScale.toClipSpaceFromString("chr1:199"),
            0,
          ])
        ).to.have.length(2);
        expect(
          dataProcessor.selectBox([
            testGenomeScale.toClipSpaceFromString("chr1:100"),
            0,
            testGenomeScale.toClipSpaceFromString("chr1:310"),
            0,
          ])
        ).to.have.length(3);
        expect(
          dataProcessor.selectBox([
            testGenomeScale.toClipSpaceFromString("chr1:500"),
            -1,
            testGenomeScale.toClipSpaceFromString("chr1:700"),
            1,
          ])
        ).to.have.length(2);
        expect(
          dataProcessor.selectBox([
            testGenomeScale.toClipSpaceFromString("chr1:100"),
            -1,
            testGenomeScale.toClipSpaceFromString("chr1:312"),
            1,
          ])
        ).to.have.length(3);
        expect(
          dataProcessor.selectBox([
            testGenomeScale.toClipSpaceFromString("chr1:550"),
            -1,
            testGenomeScale.toClipSpaceFromString("chr1:655"),
            1,
          ])
        ).to.have.length(2);
      });
  });
});

describe("Lasso selection", () => {
  // These tests don't need to be as expansive as the box select, since lasso select simply wraps
  // around box select and then uses @turf/boolean-point-in-polygon

  let dataProcessor;

  it("can select points with a lasso", () => {
    // Deep copy to since schema processor modifies original object
    dataProcessor = new DataProcessor(JSON.parse(JSON.stringify(schemaPoints)));

    cy.wrap(dataProcessor)
      .should("have.property", "index")
      .then(() => {
        expect(
          dataProcessor.selectLasso([1, 1, 2, 1, 3, 2, 2, 2.5])
        ).to.have.length(2);
      });
  });

  it("can select rects with a lasso", () => {
    dataProcessor = new DataProcessor(JSON.parse(JSON.stringify(schemaRects)));

    cy.wrap(dataProcessor)
      .should("have.property", "index")
      .then(() => {
        expect(
          dataProcessor.selectLasso([1, 1, 2, 1, 3, 2, 2, 2.5])
        ).to.have.length(2);
      });
  });

  it("can select ticks with a lasso (height)", () => {
    dataProcessor = new DataProcessor(JSON.parse(JSON.stringify(schemaTicks)));

    cy.wrap(dataProcessor)
      .should("have.property", "index")
      .then(() => {
        expect(
          dataProcessor.selectLasso([1, 1, 2, 1, 3, 2, 2, 2.5])
        ).to.have.length(2);
      });
  });

  it("can select ticks with a lasso (width)", () => {
    dataProcessor = new DataProcessor(
      JSON.parse(JSON.stringify(schemaTicksWidth))
    );

    cy.wrap(dataProcessor)
      .should("have.property", "index")
      .then(() => {
        expect(
          dataProcessor.selectLasso([1, 1, 2, 1, 3, 2, 2, 2.5])
        ).to.have.length(2);
      });
  });

  it("can select arcs with a lasso", () => {
    dataProcessor = new DataProcessor(JSON.parse(JSON.stringify(schemaArcs)));

    cy.wrap(dataProcessor)
      .should("have.property", "index")
      .then(() => {
        expect(
          dataProcessor.selectLasso([1, 1, 2, 1, 3, 2, 2, 2.5])
        ).to.have.length(2);
      });
  });

  it("can select genomic ranges with a lasso", () => {
    dataProcessor = new DataProcessor(
      JSON.parse(JSON.stringify(schemaGenomicPoints))
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
          ])
        ).to.have.length(3);
      });
  });

  it("can select genomic points with a lasso", () => {
    dataProcessor = new DataProcessor(
      JSON.parse(JSON.stringify(schemaGenomicPoints))
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
          ])
        ).to.have.length(3);
      });
  });

  it("can select genomic arcs with a lasso", () => {
    dataProcessor = new DataProcessor(
      JSON.parse(JSON.stringify(schemaGenomicArcs))
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
          ])
        ).to.have.length(3);
      });
  });
});

describe("Get closest point", () => {
  let dataProcessor;

  it("can get the closest point in cartesian space", () => {
    // Deep copy to since schema processor modifies original object
    dataProcessor = new DataProcessor(JSON.parse(JSON.stringify(schemaPoints)));

    cy.wrap(dataProcessor)
      .should("have.property", "index")
      .then(() => {
        let closest = dataProcessor.getClosestPoint([1.1, 1.1]);
        expect(closest.category).to.eq("a");
        expect(closest.x).to.eq(1);
        expect(closest.y).to.eq(1);

        closest = dataProcessor.getClosestPoint([5.2, 5.2]);
        expect(closest.category).to.eq("b");
        expect(closest.x).to.eq(5);
        expect(closest.y).to.eq(5);
      });
  });

  it("can get the closest point in genomic space", () => {
    // Deep copy to since schema processor modifies original object
    dataProcessor = new DataProcessor(
      JSON.parse(JSON.stringify(schemaGenomicPoints))
    );

    cy.wrap(dataProcessor)
      .should("have.property", "index")
      .then(() => {
        let closest = dataProcessor.getClosestPoint([
          testGenomeScale.toClipSpaceFromString("chr1:101"),
          0,
        ]);
        expect(closest.category).to.eq("a");
        expect(closest.start).to.eq(100);

        closest = dataProcessor.getClosestPoint([
          testGenomeScale.toClipSpaceFromString("chr1:501"),
          0,
        ]);
        expect(closest.category).to.eq("b");
        expect(closest.end).to.eq(605);
      });
  });
});
