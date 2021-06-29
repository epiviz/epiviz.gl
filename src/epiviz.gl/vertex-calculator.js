const calculateVerticesForMark = (mark, markType, drawingMode, lastMark) => {
  if (markType === "area") {
    return getVerticesForAreaSection(mark, lastMark);
  }
  if (markType === "line") {
    return getVertexForDot(mark);
  }

  switch (mark.shape) {
    case "dot":
      if (drawingMode === "POINTS") {
        return getVertexForDot(mark);
      } else {
        return getVerticesForSquare(mark);
      }
    case "triangle":
      return getVerticesForTriangle(mark);
    case "diamond":
      return getVerticesForPolygon(mark, 4);
    case "pentagon":
      return getVerticesForPolygon(mark, 5);
    case "hexagon":
      return getVerticesForPolygon(mark, 6);
    case "circle":
      return getVerticesForPolygon(mark, 16);
    case "cross":
      return getVerticesForCross(mark);
  }
};

const getVerticesForAreaSection = (mark, lastMark) => {
  if (!lastMark) {
    return []; // May need to have a check higher up the call stack
  }

  return [
    mark.x,
    mark.y,
    lastMark.x,
    lastMark.y,
    mark.x,
    0, // TODO: Replace 0 to let area charts center around some other number
    lastMark.x,
    lastMark.y,
    lastMark.x,
    0,
    mark.x,
    0,
  ];
};

const getVerticesForPolygon = (mark, sides) => {
  const vertices = [];
  for (let theta = 0; theta < 2 * Math.PI; theta += (2 * Math.PI) / sides) {
    vertices.push(
      mark.x,
      mark.y,
      mark.x + (mark.size / 2) * Math.cos(theta),
      mark.y + (mark.size / 2) * Math.sin(theta),
      mark.x + (mark.size / 2) * Math.cos(theta + (2 * Math.PI) / sides),
      mark.y + (mark.size / 2) * Math.sin(theta + (2 * Math.PI) / sides)
    );
  }
  return vertices;
};

const getVerticesForTriangle = (mark) => [
  //     1
  //    / \
  //   2---3
  mark.x,
  mark.y + mark.size / 2,
  mark.x - mark.size / 2,
  mark.y - mark.size / 2,
  mark.x + mark.size / 2,
  mark.y - mark.size / 2,
];

const getVertexForDot = (mark) => [mark.x, mark.y];

const getVerticesForSquare = (mark) => [
  mark.x + mark.size / 2, // 2------1,4
  mark.y + mark.size / 2, // |    /  |
  mark.x - mark.size / 2, // |  /    |
  mark.y + mark.size / 2, // 3,5-----6
  mark.x - mark.size / 2,
  mark.y - mark.size / 2,
  mark.x + mark.size / 2,
  mark.y + mark.size / 2,
  mark.x - mark.size / 2,
  mark.y - mark.size / 2,
  mark.x + mark.size / 2,
  mark.y - mark.size / 2,
];

const getVerticesForCross = (mark) => [];

export default calculateVerticesForMark;
