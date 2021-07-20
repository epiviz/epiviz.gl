import csv from "url:./data/arcs.csv";

export default JSON.stringify(
  {
    xAxis: "zero",
    yAxis: "none",
    defaultData: csv,
    tracks: [
      {
        tooltips: 1,
        mark: "rect",
        x: {
          type: "genomicRange",
          chrAttribute: "region1Chrom",
          startAttribute: "region1Start",
          endAttribute: "regionEnd",
          domain: ["chr2:46000", "chr2:243149000"],
          genome: "hg19",
        },
        y: {
          value: 0,
        },
        height: {
          value: 10,
        },
        color: {
          type: "quantitative",
          attribute: "value",
          domain: [0, 60],
          colorScheme: "interpolateBlues",
        },
        opacity: {
          value: 0.25,
        },
      },
      {
        tooltips: 1,
        mark: "rect",
        x: {
          type: "genomicRange",
          chrAttribute: "region2Chrom",
          startAttribute: "region2Start",
          endAttribute: "region2End",
          domain: ["chr2:38000", "chr2:243149000"],
          genome: "hg19",
        },
        y: {
          value: 0,
        },
        height: {
          value: 10,
        },
        color: {
          type: "quantitative",
          attribute: "value",
          domain: [0, 60],
          colorScheme: "interpolateReds",
        },
        opacity: {
          value: 0.25,
        },
      },
      {
        tooltips: 1,
        mark: "arc",
        x: {
          type: "genomicRange",
          chrAttribute: "region1Chrom",
          startAttribute: "region1Start",
          endAttribute: "regionEnd",
          domain: ["chr2:38000", "chr2:243149000"],
          genome: "hg19",
        },
        width: {
          type: "genomicRange",
          chrAttribute: "region2Chrom",
          startAttribute: "region2Start",
          endAttribute: "region2End",
          domain: ["chr2:38000", "chr2:243149000"],
          genome: "hg19",
        },
        y: {
          value: 0.1,
        },
        height: {
          value: 0,
        },
        color: {
          type: "quantitative",
          attribute: "value",
          domain: [0, 60],
          colorScheme: "interpolateBuGn",
        },
      },
    ],
  },
  null,
  2
);
