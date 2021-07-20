import csv from "url:./data/box-track.csv";

export default JSON.stringify(
  {
    margins: {
      left: "4em",
    },
    labels: [
      {
        y: 0.05,
        x: -1.3,
        text: "Box 1",
        fixedX: true,
      },
    ],
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
          chrAttribute: "chr",
          startAttribute: "start",
          endAttribute: "end",
          domain: ["chr2:3049800", "chr2:9001000"],
          genome: "hg38",
        },
        y: {
          value: 0,
        },
        height: {
          value: 10,
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
