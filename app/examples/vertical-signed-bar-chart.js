export default JSON.stringify(
  {
    defaultData: {
      x: [1, 2, 3, 4, 5, 6, 7, 8],
      y: [10, -10, 5, 15, -15, -1, 1, 15],
      type: ["a", "b", "c", "b", "a", "c", "b", "c"],
    },
    xAxis: "bottom",
    yAxis: "zero",
    tracks: [
      {
        tooltips: 1,
        mark: "rect",
        layout: "linear",
        x: {
          value: 0,
        },
        y: {
          attribute: "x",
          type: "quantitative",
          domain: [0, 10],
        },
        color: {
          attribute: "type",
          type: "categorical",
          cardinality: 3,
        },
        height: {
          value: 10,
        },
        width: {
          attribute: "y",
          type: "quantitative",
          domain: [-20, 20],
          minWidth: -100,
          maxWidth: 100,
        },
      },
    ],
  },
  null,
  2
);
