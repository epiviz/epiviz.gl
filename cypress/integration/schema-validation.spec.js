import { Validator } from "jsonschema";
import isJSONValid from "../../src/epiviz.gl/schema-validation";

import { channel, track } from "../../src/epiviz.gl/schema-validation";

const baseValidTrack = {
  mark: "point",
  x: {
    attribute: "attr",
    type: "quantitative",
    domain: [0, 1],
    scale: "linear",
  },
  y: {
    attribute: "attr",
    type: "quantitative",
    domain: [0, 1],
  },
};

describe("Visualization Schema Validation", function () {
  const channelValidator = new Validator();

  const trackValidator = new Validator();
  trackValidator.addSchema(channel, "/channel");

  before(() => {
    // check if the import worked correctly
    expect(isJSONValid, "isJSONValid").to.be.a("function");
  });

  context("channel validation", function () {
    let validate = (json) => channelValidator.validate(json, channel).valid;

    it("will allow extra properties for a channel", function () {
      expect(
        validate({
          type: "quantitative",
          domain: [0, 1],
          attribute: "attr",
          colorScheme: "interpolateBlues",
        })
      ).to.eq(true);
    });

    it("can reject an unrecognized type", function () {
      expect(
        validate({
          type: "quantative",
          attr: "attr",
          domain: [0, 1],
        })
      ).to.eq(false);
    });

    it("can require domain when quantitative is the type", function () {
      expect(
        validate({
          type: "quantitative",
          attribute: "attr",
          domain: [0, 1],
        })
      ).to.eq(true);

      expect(
        validate({
          type: "quantitative",
          attribute: "attr",
          domain: 10,
        })
      ).to.eq(false);

      expect(
        validate({
          type: "quantitative",
          attribute: "attr",
          domain: [0, "high"],
        })
      ).to.eq(false);

      expect(
        validate({
          type: "quantitative",
          attribute: "attr",
          domain: "a lot",
        })
      ).to.eq(false);

      expect(
        validate({
          type: "quantitative",
          attribute: "attr",
        })
      ).to.eq(false);

      expect(
        validate({
          type: "quantitative",
          attribute: "attr",
          cardinality: 10,
        })
      ).to.eq(false);
    });

    it("can require cardinality when categorical is the type", function () {
      expect(
        validate({
          type: "categorical",
          attribute: "attr",
          cardinality: 30,
        })
      ).to.eq(true);

      expect(
        validate({
          type: "categorical",
          attribute: "attr",
          cardinality: null,
        })
      ).to.eq(false);

      expect(
        validate({
          type: "categorical",
          attribute: "attr",
          cardinality: "a lot",
        })
      ).to.eq(false);

      expect(
        validate({
          type: "categorical",
          attribute: "attr",
        })
      ).to.eq(false);

      expect(
        validate({
          type: "categorical",
          attribute: "attr",
          domain: 30,
        })
      ).to.eq(false);
    });

    it("can accept a value", function () {
      expect(
        validate({
          value: 10,
        })
      ).to.eq(true);
    });

    it("can reject attribute and value defined", function () {
      expect(
        validate({
          value: "10",
          attribute: "attr",
        })
      ).to.eq(false);
    });

    it("can reject value with any other base channel property defined", function () {
      expect(
        validate({
          value: "10",
          units: "in", // allowed since unit is not property for base channel
        })
      ).to.eq(true);

      expect(
        validate({
          value: "10",
          domain: [0, 1],
        })
      ).to.eq(false);
      expect(
        validate({
          value: "10",
          type: "categorical",
        })
      ).to.eq(false);
      expect(
        validate({
          value: "10",
          cardinality: 1,
        })
      ).to.eq(false);
    });

    it("can reject with no attribute or value", function () {
      expect(
        validate({
          type: "categorical",
          cardinality: 10,
        })
      ).to.eq(false);
    });

    it("can reject with both cardinality and domain", function () {
      expect(
        validate({
          type: "categorical",
          domain: [0, 1],
          cardinality: 10,
        })
      ).to.eq(false);
    });

    it("can allow for three genomicRange attributes when type is genomicRange", function () {
      expect(
        validate({
          type: "genomicRange",
          domain: ["chr1:1", "chr1:2"],
          chrAttribute: "chr",
          startAttribute: "start",
          endAttribute: "end",
          genome: "hg38",
        })
      ).to.eq(true);

      expect(
        validate({
          type: "genomicRange",
          domain: ["chr1:1", "chr1:2"],
          startAttribute: "start",
          endAttribute: "end",
          genome: "hg38",
        })
      ).to.eq(false);

      expect(
        validate({
          type: "genomicRange",
          domain: [0, 1],
          chrAttribute: "chr",
          startAttribute: "start",
          endAttribute: "end",
          genome: "hg38",
        })
      ).to.eq(false);

      expect(
        validate({
          type: "genomicRange",
          domain: ["chr1:1", "chr1:2"],
          attribute: "chr",
          chrAttribute: "chr2",
          startAttribute: "start",
          endAttribute: "end",
          genome: "hg38",
        })
      ).to.eq(false);
    });

    it("can allow for two genomic attributes when type is genomic", function () {
      expect(
        validate({
          type: "genomic",
          domain: ["chr1:1", "chr1:2"],
          chrAttribute: "chr",
          geneAttribute: "gene",
          genome: "hg38",
        })
      ).to.eq(true);

      expect(
        validate({
          type: "genomic",
          domain: ["chr1:1", "chr1:2"],
          geneAttribute: "gene",
          genome: "hg38",
        })
      ).to.eq(false);

      expect(
        validate({
          type: "genomic",
          domain: [0, 1],
          chrAttribute: "chr",
          geneAttribute: "gene",
          genome: "hg38",
        })
      ).to.eq(false);

      expect(
        validate({
          type: "genomic",
          domain: ["chr1:1", "chr1:2"],
          attribute: "chr",
          chrAttribute: "chr",
          geneAttribute: "gene",
          genome: "hg38",
        })
      ).to.eq(false);
    });
  });

  context("track validation", function () {
    let validate = (json) => trackValidator.validate(json, track).valid;

    it("can require mark, x, and y properties", function () {
      expect(validate(baseValidTrack)).to.eq(true);

      expect(
        validate({
          x: baseValidTrack.x,
          y: baseValidTrack.y,
        })
      ).to.eq(false);

      expect(
        validate({
          mark: "point",
          y: baseValidTrack.y,
        })
      ).to.eq(false);
    });

    it("can allow x and y to be attributes or values", function () {
      expect(
        validate({
          mark: "point",
          x: baseValidTrack.x,
          y: {
            value: 10,
          },
        })
      ).to.eq(true);
      expect(
        validate({
          mark: "point",
          x: {
            value: 1,
          },
          y: baseValidTrack.y,
        })
      ).to.eq(true);
    });

    it("can expect tooltips to be between 0 and 1", function () {
      expect(
        validate({
          ...baseValidTrack,
          tooltips: 1,
        })
      ).to.eq(true);

      expect(
        validate({
          ...baseValidTrack,
          tooltips: null,
        })
      ).to.eq(false);
      expect(
        validate({
          ...baseValidTrack,
          tooltips: 10,
        })
      ).to.eq(false);
    });

    it("can allow extra properties for channels", function () {
      expect(
        validate({
          ...baseValidTrack,
          color: {
            attribute: "attr",
            type: "quantitative",
            domain: [0, 10],
            colorScheme: "interpolateBlues",
          },
        })
      ).to.eq(true);

      expect(
        validate({
          ...baseValidTrack,
          opacity: {
            attribute: "attr",
            type: "quantitative",
            domain: [0, 10],
            minOpacity: 0.1,
          },
        })
      ).to.eq(true);

      expect(
        validate({
          ...baseValidTrack,
          size: {
            attribute: "attr",
            type: "quantitative",
            domain: [0, 10],
            maxSize: 10,
          },
        })
      ).to.eq(true);
    });

    it("can allow values for channels other than x and y", function () {
      expect(
        validate({
          ...baseValidTrack,
          color: {
            value: "green",
          },
        })
      ).to.eq(true);

      expect(
        validate({
          ...baseValidTrack,
          opacity: {
            value: 0.1,
          },
        })
      ).to.eq(true);

      expect(
        validate({
          ...baseValidTrack,
          opacity: {
            value: "low", // needs to be number for opacity
          },
        })
      ).to.eq(false);

      expect(
        validate({
          ...baseValidTrack,
          size: {
            value: 1,
          },
        })
      ).to.eq(true);

      expect(
        validate({
          ...baseValidTrack,
          size: {
            value: "big", // needs to be number for opacity
          },
        })
      ).to.eq(false);

      expect(
        validate({
          ...baseValidTrack,
          shape: {
            value: "circle",
          },
        })
      ).to.eq(true);
    });

    it("can allow extra properties", function () {
      expect(
        validate({
          mark: "area",
          x: baseValidTrack.x,
          y: baseValidTrack.y,
          zeroLine: 1,
        })
      ).to.eq(true);
    });

    it("can reject an invalid channel", function () {
      expect(
        validate({
          ...baseValidTrack,
          color: {
            attribute: "attr",
            value: 10,
          },
        })
      ).to.eq(false);
    });

    it("can require data to be in the correct format", function () {
      expect(
        validate({
          ...baseValidTrack,
          data: "example.com/data.csv",
        })
      ).to.eq(true);

      expect(
        validate({
          ...baseValidTrack,
          data: ["attr,attr2", "1,2", "3,4", "5,6"],
        })
      ).to.eq(true);

      expect(
        validate({
          ...baseValidTrack,
          data: ["attr,attr2", 1, 2, 3, 4, 5, 6],
        })
      ).to.eq(false);

      expect(
        validate({
          ...baseValidTrack,
          data: [1, 2, 3, 4, 5, 6],
        })
      ).to.eq(false);
    });
  });

  context("visualization validation", function () {
    const baseValidVisualization = {
      defaultData: "example.com/data.csv",
      tracks: [baseValidTrack, baseValidTrack],
    };

    it("can require tracks property", function () {
      expect(isJSONValid(baseValidVisualization)).to.eq(true);
      expect(isJSONValid({})).to.eq(false);
    });

    it("can reject if a track is not valid", function () {
      expect(
        isJSONValid({
          tracks: [
            baseValidTrack,
            {
              x: baseValidTrack.x,
              y: baseValidTrack.y,
            },
          ],
        })
      ).to.eq(false);
    });

    it("can reject if default data is not the right format", function () {
      expect(
        isJSONValid({
          defaultData: ["attr,attr2", "1,2", "3,4", "5,6"],
          tracks: baseValidVisualization.tracks,
        })
      ).to.eq(true);

      expect(
        isJSONValid({
          defaultData: [1, 2, 3],
          tracks: baseValidVisualization.tracks,
        })
      ).to.eq(false);

      expect(
        isJSONValid({
          defaultData: ["1 2", "3 4", "5 6"],
          tracks: baseValidVisualization.tracks,
        })
      ).to.eq(false);
    });

    it("can require tracks to have data specified if defaultData is not present", function () {
      expect(
        isJSONValid({
          tracks: [{ ...baseValidTrack, data: "example.com/data.csv" }],
        })
      ).to.eq(true);

      expect(
        isJSONValid({
          tracks: baseValidVisualization.tracks,
        })
      ).to.eq(false);
    });
  });
});
