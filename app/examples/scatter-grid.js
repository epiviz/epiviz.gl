const buildGrid = (cellsPerRow) => {
  const toReturn = { x: [], y: [] };
  for (let i = 0; i < cellsPerRow; i++) {
    for (let j = 0; j < cellsPerRow; j++) {
      toReturn.x.push(i / cellsPerRow);
      toReturn.y.push(j / cellsPerRow);
    }
  }
  return toReturn;
};

export default JSON.stringify(
  {
    defaultData: buildGrid(5),
    tracks: [
      {
        tooltips: 1,
        mark: "point",
        x: {
          attribute: "x",
          type: "quantitative",
          domain: [0, 1],
        },
        y: {
          attribute: "y",
          type: "quantitative",
          domain: [0, 1],
        },
        size: {
          value: 5,
        },
      },
    ],
  },
  null,
  2
);
