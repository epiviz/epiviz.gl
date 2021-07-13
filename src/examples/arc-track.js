import csv from "url:../data/arcs.csv";

export default JSON.stringify(
  {
    xAxis: "zero",
    yAxis: "none",
    defaultData: csv,
    tracks: [
      {
        tooltips: 1,
        mark: "rect",
        layout: "linear",
        x: {
          type: "genomicRange",
          chrAttribute: "region1Chrom",
          startAttribute: "region1Start",
          endAttribute: "regionEnd",
          domain: ["chr2:46000", "chr2:242849000"],
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
      },
    ],
  },
  null,
  2
);
