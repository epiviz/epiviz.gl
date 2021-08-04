export default JSON.stringify(
  {
    defaultData: {
      x: [1, 2, 3, 4],
      y: [1, 2, 3, 4],
      width: [20, 12, 5, 10],
      height: [10, 5, 12, 30],
      size: [10, 20, 30, 40],
      color: ["red", "#00FF00", 255 ** 3, "rgb(0,0,200)"],
    },
    tracks: [
      {
        mark: "rect",
        x: {
          attribute: "x",
          type: "quantitative",
          domain: [0, 5],
        },
        y: {
          attribute: "y",
          type: "quantitative",
          domain: [0, 5],
        },
        color: {
          attribute: "color",
          type: "inline",
        },
        width: {
          type: "inline",
          attribute: "width",
        },
        height: {
          type: "inline",
          attribute: "height",
        },
        opacity: {
          value: 0.4,
        },
      },
      {
        mark: "point",
        x: {
          attribute: "x",
          type: "quantitative",
          domain: [0, 5],
        },
        y: {
          attribute: "y",
          type: "quantitative",
          domain: [0, 5],
        },
        color: {
          attribute: "color",
          type: "inline",
        },
        size: {
          type: "inline",
          attribute: "size",
        },
        opacity: {
          value: 0.4,
        },
        shape: {
          value: "diamond",
        },
      },
    ],
  },
  null,
  2
);
