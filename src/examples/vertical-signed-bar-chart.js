export default JSON.stringify(
  {
    defaultData: [
      "x,y,type",
      "1,10,a",
      "2,-10,b",
      "3,5,c",
      "4,15,b",
      "5,-15,a",
      "6,-1,c",
      "7,1,b",
      "8,15,c",
    ],

    tracks: [
      {
        tooltips: 1,
        mark: "rect",
        layout: "linear",
        x: {
          value: 0,
          axis: "bottom",
        },
        y: {
          attribute: "x",
          type: "quantitative",
          domain: [0, 10],
          axis: "left",
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
