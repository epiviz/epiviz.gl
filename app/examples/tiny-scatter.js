export default JSON.stringify(
  {
    defaultData: {
      day: [1, 2, 3, 4],
      price: [10, 22, 35, 20],
    },
    tracks: [
      {
        tooltips: 1,
        mark: "point",
        layout: "linear",
        x: {
          attribute: "day",
          type: "quantitative",
          domain: [0, 5],
        },
        y: {
          attribute: "price",
          type: "quantitative",
          domain: [0, 40],
          scale: "linear",
        },
        color: {
          value: "red",
        },
        shape: {
          value: "circle",
        },
      },
    ],
  },
  null,
  2
);
