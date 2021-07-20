import csv from "url:./data/box-track.csv";

export default JSON.stringify(
  {
    defaultData: csv,
    tracks: [
      {
        tooltips: 1,
        mark: "line",
        layout: "linear",
        x: {
          type: "genomic",
          chrAttribute: "chr",
          geneAttribute: "start",
          domain: ["chr2:3049800", "chr2:9001000"],
          genome: "hg38",
        },
        y: {
          type: "quantitative",
          attribute: "score",
          domain: [0, 10],
          colorScheme: "interpolateBlues",
        },
        color: {
          type: "quantitative",
          attribute: "score",
          domain: [0, 8],
          colorScheme: "interpolateBlues",
        },
      },
    ],
  },
  null,
  2
);
