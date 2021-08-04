import SchemaProcessor, {
  DEFAULT_CHANNELS,
} from "../../src/epiviz.gl/schema-processor";
import isJSONValid from "../../src/epiviz.gl/schema-validation";
import { interpolateGreys } from "d3-scale-chromatic";
import {
  scale,
  rgbToHex,
  rgbStringToHex,
  colorSpecifierToHex,
} from "../../src/epiviz.gl/utilities";

const schema1 = {
  defaultData: {
    day: [1, 2, 3, 4, 5, 6, 7],
    price: [10, 20, 30, 20, 10, 5, 1],
    category: ["a", "b", "b", "a", "b", "b", "a"],
  },
  tracks: [
    {
      mark: "rect",
      x: {
        attribute: "day",
        type: "quantitative",
        domain: [1, 10],
      },
      y: {
        attribute: "price",
        type: "quantitative",
        domain: [0, 40],
      },
      color: {
        attribute: "category",
        type: "categorical",
        cardinality: 2,
        colorScheme: "interpolateGreys",
      },
      opacity: {
        minOpacity: 0.2,
        attribute: "price",
        type: "quantitative",
        domain: [0, 30],
      },
      width: {
        attribute: "category",
        type: "categorical",
        cardinality: 2,
        minWidth: 1,
        maxWidth: 2,
      },
      height: {
        attribute: "day",
        type: "quantitative",
        domain: [1, 7],
        minHeight: 1,
        maxHeight: 7,
      },
    },
  ],
};

const schema2 = {
  defaultData: {
    day: [1, 2, 3, 4, 5, 6, 7],
    price: [10, 20, 30, 20, 10, 5, 1],
    category: ["a", "b", "b", "a", "b", "b", "a"],
  },
  tracks: [
    {
      mark: "point",
      x: {
        attribute: "day",
        type: "quantitative",
        domain: [1, 10],
      },
      y: {
        attribute: "price",
        type: "quantitative",
        domain: [0, 40],
      },
      color: {
        attribute: "day",
        type: "quantitative",
        domain: [1, 7],
        colorScheme: "interpolateGreys",
      },
      opacity: {
        minOpacity: 0.2,
        attribute: "category",
        type: "categorical",
        cardinality: 2,
      },
      shape: {
        type: "categorical",
        attribute: "category",
        cardinality: 2,
      },
      size: {
        attribute: "day",
        type: "quantitative",
        domain: [1, 7],
        minSize: 1,
        maxSize: 7,
      },
    },
  ],
};

const schema3 = {
  defaultData: {
    day: [1, 2, 3, 4, 5, 6, 7],
    price: [10, 20, 30, 20, 10, 5, 1],
    category: ["a", "b", "b", "a", "b", "b", "a"],
  },
  tracks: [
    {
      mark: "point",
      x: {
        attribute: "day",
        type: "quantitative",
        domain: [1, 10],
      },
      y: {
        attribute: "price",
        type: "quantitative",
        domain: [0, 40],
      },
      color: {
        value: "red",
      },
      shape: {
        value: "diamond",
      },
      size: {
        value: 10,
      },
    },
  ],
};

const schema4 = {
  defaultData: {
    day: [1, 2, 3, 4, 5, 6],
    price: [10, 20, 30, 20, 10, 5],
    color: ["red", "blue", "#FFFFFF", 255 ** 3, 255 ** 2, "rgb(1,1,1)"],
    shape: ["circle", "circle", "diamond", "dot", "triangle", "triangle"],
  },
  tracks: [
    {
      mark: "point",
      x: {
        attribute: "day",
        type: "quantitative",
        domain: [1, 7],
      },
      y: {
        attribute: "price",
        type: "quantitative",
        domain: [0, 40],
      },
      color: {
        attribute: "color",
        type: "inline",
      },
      shape: {
        attribute: "shape",
        type: "inline",
      },
      width: {
        attribute: "day",
        type: "inline",
      },
      height: {
        attribute: "price",
        type: "inline",
      },
    },
  ],
};

describe("Iteration", () => {
  let schemaHelper;

  beforeEach(() => {
    let callbackCalled = false;

    schemaHelper = new SchemaProcessor(
      // Deep copy of schema since data.pop in the processor will modify the original object
      JSON.parse(JSON.stringify(schema1)),
      () => {
        callbackCalled = true;
      }
    );
    setTimeout(() => expect(callbackCalled).to.eq(true), 1);
  });

  it("can stop iteration of tracks", () => {
    let track = schemaHelper.getNextTrack();
    expect(track).to.not.eq(undefined);
    expect(track).to.not.eq(null);

    let noTrack = schemaHelper.getNextTrack();
    expect(noTrack).to.eq(null);
  });

  it("can stop iteration of marks", () => {
    let track = schemaHelper.getNextTrack();
    let marks = [];

    let currentPoint = track.getNextMark();
    while (currentPoint !== null) {
      marks.push(currentPoint);
      currentPoint = track.getNextMark();
    }

    expect(marks).to.be.an("array").that.does.not.include(null);
    expect(marks).to.be.an("array").that.does.not.include(undefined);

    expect(marks).to.have.lengthOf(schema1.defaultData.day.length);
  });
});

describe("Mapping the channels with attributes correctly (schema 1)", () => {
  let schemaHelper;
  let track;
  let marks;

  before(() => {
    expect(isJSONValid(schema1)).to.eq(true);
  });

  beforeEach(() => {
    let callbackCalled = false;
    schemaHelper = new SchemaProcessor(
      // Deep copy of schema since data.pop in the processor will modify the original object
      JSON.parse(JSON.stringify(schema1)),
      () => (callbackCalled = true)
    );
    setTimeout(() => expect(callbackCalled).to.eq(true), 1);

    track = schemaHelper.getNextTrack();
    marks = [];

    let currentPoint = track.getNextMark();

    while (currentPoint !== null) {
      marks.push(currentPoint);
      currentPoint = track.getNextMark();
    }

    expect(marks).to.be.an("array").that.does.not.include(null);
    expect(marks).to.be.an("array").that.does.not.include(undefined);
    expect(marks).to.have.lengthOf(schema1.defaultData.day.length);
  });

  it("can get the x and y values back", () => {
    expect(marks.map((mark) => mark.x)).to.deep.equal(schema1.defaultData.day);
    expect(marks.map((mark) => mark.y)).to.deep.equal(
      schema1.defaultData.price
    );
  });

  it("can map the color scheme categorically correctly", () => {
    expect(marks.map((mark) => mark.color)).to.deep.equal([
      rgbToHex(255, 255, 255), // white
      rgbToHex(0, 0, 0), // black
      rgbToHex(0, 0, 0),
      rgbToHex(255, 255, 255),
      rgbToHex(0, 0, 0),
      rgbToHex(0, 0, 0),
      rgbToHex(255, 255, 255),
    ]);
  });

  it("can map a dimension categorically correctly (width with 2 categories and min and max options", () => {
    expect(marks.map((mark) => mark.width)).to.deep.equal([
      1,
      2, // black
      2,
      1,
      2,
      2,
      1,
    ]);
  });

  it("can map a dimension quantitatively correctly (height with and min and max options", () => {
    expect(marks.map((mark) => mark.height)).to.deep.equal(
      schema1.defaultData.day
    );
  });

  it("can map the opacity quantitatively correctly (with min opacity options)", () => {
    let opacityScale = scale([0, 30], [0.2, 1]);
    expect(marks.map((mark) => mark.opacity)).to.deep.equal(
      schema1.defaultData.price.map((datum) => opacityScale(datum))
    );
  });
});

describe("Mapping the channels with attributes correctly (schema 2)", () => {
  let schemaHelper;
  let track;
  let marks;

  before(() => {
    expect(isJSONValid(schema2)).to.eq(true);
  });

  beforeEach(() => {
    let callbackCalled = false;
    schemaHelper = new SchemaProcessor(
      JSON.parse(JSON.stringify(schema2)),
      () => (callbackCalled = true)
    );
    setTimeout(() => expect(callbackCalled).to.eq(true), 1);

    track = schemaHelper.getNextTrack();
    marks = [];

    let currentPoint = track.getNextMark();

    while (currentPoint !== null) {
      marks.push(currentPoint);
      currentPoint = track.getNextMark();
    }

    expect(marks).to.be.an("array").that.does.not.include(null);
    expect(marks).to.be.an("array").that.does.not.include(undefined);
    expect(marks).to.have.lengthOf(schema1.defaultData.day.length);
  });

  it("can get the x and y values back", () => {
    expect(marks.map((mark) => mark.x)).to.deep.equal(schema2.defaultData.day);
    expect(marks.map((mark) => mark.y)).to.deep.equal(
      schema2.defaultData.price
    );
  });

  it("can map the color scheme quantitatively correctly", () => {
    const zeroToOneScale = scale([1, 7], [0, 1]);
    expect(marks.map((mark) => mark.color)).to.deep.equal(
      schema2.defaultData.day.map((datum) =>
        rgbStringToHex(interpolateGreys(zeroToOneScale(datum)))
      )
    );
  });

  it("can map the opacity categorically correctly (with min opacity options)", () => {
    const actual = marks.map((mark) => mark.opacity);
    const expected = [0.2, 1.0, 1.0, 0.2, 1.0, 1.0, 0.2];

    for (let i = 0; i < expected.length; i++) {
      expect(actual[i]).to.be.closeTo(expected[i], 1e-8);
    }
  });

  it("can map the shape categorically correctly", () => {
    expect(marks.map((mark) => mark.shape)).to.deep.equal([
      "dot",
      "triangle",
      "triangle",
      "dot",
      "triangle",
      "triangle",
      "dot",
    ]);
  });

  it("can map the size quantitatively correctly (with min and max options)", () => {
    expect(marks.map((mark) => mark.size)).to.deep.equal(
      schema2.defaultData.day
    );
  });
});

describe("Mapping the channels with values and defaults correctly (schema 3)", () => {
  let schemaHelper;
  let track;
  let marks;

  before(() => {
    expect(isJSONValid(schema3)).to.eq(true);
  });

  beforeEach(() => {
    let callbackCalled = false;
    schemaHelper = new SchemaProcessor(
      JSON.parse(JSON.stringify(schema3)),
      () => (callbackCalled = true)
    );
    setTimeout(() => expect(callbackCalled).to.eq(true), 1);

    track = schemaHelper.getNextTrack();
    marks = [];

    let currentPoint = track.getNextMark();

    while (currentPoint !== null) {
      marks.push(currentPoint);
      currentPoint = track.getNextMark();
    }

    expect(marks).to.be.an("array").that.does.not.include(null);
    expect(marks).to.be.an("array").that.does.not.include(undefined);
    expect(marks).to.have.lengthOf(schema1.defaultData.day.length);
  });

  const expectAllElementsToEqual = (elements, expectedValue) => {
    expect(elements).to.deep.equal(
      [...Array(elements.length)].map(() => expectedValue)
    );
  };

  it("can get the x and y values back", () => {
    expect(marks.map((mark) => mark.x)).to.deep.equal(schema3.defaultData.day);
    expect(marks.map((mark) => mark.y)).to.deep.equal(
      schema3.defaultData.price
    );
  });

  it("can map the color with given value correctly", () => {
    expectAllElementsToEqual(
      marks.map((mark) => mark.color),
      rgbToHex(255, 0, 0)
    );
  });

  it("can map the opacity with default correctly", () => {
    expectAllElementsToEqual(
      marks.map((mark) => mark.opacity),
      DEFAULT_CHANNELS.opacity.value
    );
  });

  it("can map the shape with given value correctly", () => {
    expectAllElementsToEqual(
      marks.map((mark) => mark.shape),
      "diamond"
    );
  });

  it("can map the size with given value correctly", () => {
    expectAllElementsToEqual(
      marks.map((mark) => mark.size),
      10
    );
  });
});

describe("Mapping the channels with inline values (schema 4)", () => {
  let schemaHelper;
  let track;
  let marks;

  before(() => {
    expect(isJSONValid(schema4)).to.eq(true);
  });

  beforeEach(() => {
    let callbackCalled = false;
    schemaHelper = new SchemaProcessor(
      JSON.parse(JSON.stringify(schema4)),
      () => (callbackCalled = true)
    );
    setTimeout(() => expect(callbackCalled).to.eq(true), 1);

    track = schemaHelper.getNextTrack();
    marks = [];

    let currentPoint = track.getNextMark();

    while (currentPoint !== null) {
      marks.push(currentPoint);
      currentPoint = track.getNextMark();
    }

    expect(marks).to.be.an("array").that.does.not.include(null);
    expect(marks).to.be.an("array").that.does.not.include(undefined);
    expect(marks).to.have.lengthOf(schema4.defaultData.day.length);
  });

  it("can get the x and y values back", () => {
    expect(marks.map((mark) => mark.x)).to.deep.equal(schema4.defaultData.day);
    expect(marks.map((mark) => mark.y)).to.deep.equal(
      schema4.defaultData.price
    );
  });

  it("can get the color from the data correctly", () => {
    expect(marks.map((mark) => mark.color)).to.deep.equal(
      schema4.defaultData.color.map(colorSpecifierToHex)
    );
  });

  it("can get the shape from the data correctly", () => {
    expect(marks.map((mark) => mark.shape)).to.deep.equal(
      schema4.defaultData.shape
    );
  });

  it("can get the width from the data correctly", () => {
    expect(marks.map((mark) => mark.width)).to.deep.equal(
      schema4.defaultData.day
    );
  });

  it("can get the height from the data correctly", () => {
    expect(marks.map((mark) => mark.height)).to.deep.equal(
      schema4.defaultData.price
    );
  });
});
