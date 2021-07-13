import csv from "url:../data/heatmap.csv";

export default JSON.stringify(
  {
    margins: {
      top: "4em",
      left: "3em",
      bottom: 0,
      right: 0,
    },
    labels: [
      {
        x: -0.5,
        y: 1.1,
        text: "SUBJECT VS SAMPLE MAP",
        fixedX: true,
        fixedY: true,
      },
      {
        x: -0.8,
        y: 1.05,
        text: "a",
        fixedY: true,
      },
      {
        x: -0.3,
        y: 1.05,
        text: "b",
        fixedY: true,
      },
      {
        x: 0.2,
        y: 1.05,
        text: "c",
        fixedY: true,
      },
      {
        x: 0.7,
        y: 1.05,
        text: "d",
        fixedY: true,
      },

      {
        x: -1.1,
        y: 0.8,
        text: "a",
        fixedX: true,
      },
      {
        x: -1.1,
        y: 0.3,
        text: "b",
        fixedX: true,
      },
      {
        x: -1.1,
        y: -0.3,
        text: "c",
        fixedX: true,
      },
      {
        x: -1.1,
        y: -0.8,
        text: "d",
        fixedX: true,
      },
    ],
    xAxis: "none",
    yAxis: "none",
    defaultData: csv,
    tracks: [
      {
        tooltips: 1,
        mark: "rect",
        x: {
          attribute: "sample",
          type: "categorical",
          cardinality: 4,
          scale: "linear",
        },
        y: {
          attribute: "subject",
          type: "categorical",
          cardinality: 4,
          scale: "linear",
        },
        color: {
          attribute: "strength",
          type: "quantitative",
          domain: [0, 1],
          colorScheme: "interpolateReds",
        },
        width: {
          value: 200 / 4, // 200 divided by x cardinality will produce flush rects
        },
        height: {
          value: 200 / 4, // 200 divided by y cardinality will produce flush rects
        },
      },
    ],
  },
  null,
  2
);
