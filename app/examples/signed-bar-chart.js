export default JSON.stringify(
  {
    defaultData: {
      x: [1, 2, 3, 4, 5, 6, 7, 8],
      y: [10, -10, 5, 15, -15, -1, 1, 15],
      type: ["a", "b", "c", "b", "a", "c", "b", "c"],
    },
    xAxis: "zero",
    yAxis: "right",
    tracks: [
      {
        tooltips: 1,
        mark: "rect",
        layout: "linear",
        x: {
          attribute: "x",
          type: "quantitative",
          domain: [0, 10],
        },
        y: {
          value: 0,
          scale: "linear",
        },
        color: {
          attribute: "type",
          type: "categorical",
          cardinality: 3,
        },
        width: {
          value: 10,
        },
        height: {
          attribute: "y",
          type: "quantitative",
          domain: [-20, 20],
          minHeight: -100,
          maxHeight: 100,
        },
      },
    ],
  },
  null,
  2
);
