import { GenomeScale } from "./genome-sizes";
import { getDrawModeForTrack } from "./schema-processor";
import { getQuadraticBezierCurveForPoints } from "./utilities";

// Each size unit refers to 1/200 of the clip space
// e.g. if the canvas is 1000x1000 pixels, and the size value for a mark
// is 10, then that mark takes up 10/200 = 1/20 of the clip space which
// is equal to 50 pixels
const SIZE_UNITS = 1 / 100;

const NUMBER_OF_VERTICES_PER_ARC = 20;

/**
 * Get a curve representing the arc with given start and end points
 *
 * https://math.stackexchange.com/a/1484684
 *
 * @param {Array} P0 start of arc
 * @param {Array} P2 end of arc
 * @returns function mapping 0 to beginning of arc, and 1 to end of arc
 */
const getCurveForArc = (P0, P2) => {
  const midpoint = [P0[0] / 2 + P2[0] / 2, P0[1] / 2 + P2[1] / 2];
  const slope = (P2[1] - P0[1]) / (P2[0] - P0[0]);
  const distance = Math.sqrt((P2[1] - P0[1]) ** 2 + (P2[0] - P0[0]) ** 2);
  if (!isFinite(slope)) {
    // vertical slope
    return getQuadraticBezierCurveForPoints(
      P0,
      [P0[0] - distance, midpoint[1]],
      P2
    );
  }

  const parameterized = (t) => [
    midpoint[0] + (t / distance) * (P0[1] - P2[1]),
    midpoint[1] + (t / distance) * (P2[0] - P0[0]),
  ];

  return getQuadraticBezierCurveForPoints(
    P0,
    parameterized((distance * Math.sqrt(3) * 10) / 2),
    P2
  );
};

class VertexCalculator {
  /**
   * A class used to construct the vertices of marks that are given to the drawer to draw.
   *
   * @param {Function or GenomeScale} xScale maps the x values of the data to clip space [-1, 1]
   * @param {Function or GenomeScale} yScale maps the y values of the data to clip space [-1, 1]
   * @param {Object} track from schema
   */
  constructor(xScale, yScale, track) {
    if (xScale instanceof GenomeScale) {
      this.xScale = xScale.toCallable();
    } else {
      this.xScale = xScale;
    }

    if (yScale instanceof GenomeScale) {
      this.yScale = yScale.toCallable();
    } else {
      this.yScale = yScale;
    }

    this.track = track;
    this.drawMode = getDrawModeForTrack(track);
  }

  /**
   * Transform a mark with a range for coordinates into a simpler mark to draw.
   *
   * @param {Object} mark that contains ranges for x or y
   * @returns mark with fixed x and y but with appropriate width and height for drawing
   */
  transformGenomicRangeToStandard(mark) {
    let x, y, width, height;
    if (Array.isArray(mark.x)) {
      let x1 = this.xScale([mark.x[0], mark.x[1]]);
      x = [mark.x[0], mark.x[1]];
      width = (this.xScale([mark.x[2], mark.x[3]]) - x1) / SIZE_UNITS;
    } else {
      x = mark.x;
      width = mark.width;
    }

    if (Array.isArray(mark.y)) {
      y = this.yScale([mark.y[0], mark.y[1]]);
      height = (this.yScale([mark.y[2], mark.y[3]]) - y) / SIZE_UNITS;
    } else {
      y = mark.y;
      height = mark.height;
    }
    return {
      x,
      y,
      width,
      height,
    };
  }

  /**
   * Transform a mark with a range for coordinates and a range for width or height into a simpler mark to draw.
   *
   * @param {Object} mark that contains ranges for x and y, and potentially ranges for width and height
   * @returns mark with fixed x, y, width, and height for drawing
   */
  transformGenomicRangeArcToStandard(mark) {
    let x, y, width, height;
    if (Array.isArray(mark.x)) {
      x = this.xScale.getMidpoint(...mark.x);
      let x1ClipSpace = this.xScale(x);
      let x2 = this.xScale.getMidpoint(...mark.width);
      width = (this.xScale(x2) - x1ClipSpace) / SIZE_UNITS;
    } else {
      x = mark.x;
      width = mark.width;
    }

    if (Array.isArray(mark.y)) {
      y = this.yScale.getMidpoint(...mark.y);
      let y1ClipSpace = this.xScale(y);
      let y2 = this.yScale.getMidpoint(...mark.height);
      height = (this.yScale(y2) - y1ClipSpace) / SIZE_UNITS;
    } else {
      y = mark.y;
      height = mark.height;
    }
    return {
      x,
      y,
      width,
      height,
    };
  }

  /**
   * Construct the vertices of a mark.
   *
   * @param {Object} mark to draw
   * @returns vertices of mark
   */
  calculateForMark(mark) {
    if (
      this.track.x.type === "genomicRange" ||
      this.track.y.type === "genomicRange"
    ) {
      if (this.track.mark === "arc") {
        return this._calculateForMark(
          this.transformGenomicRangeArcToStandard(mark)
        );
      }
      return this._calculateForMark(this.transformGenomicRangeToStandard(mark));
    }
    return this._calculateForMark(mark);
  }

  _calculateForMark(mark) {
    if (this.track.mark === "area") {
      const toReturn = this._getVerticesForAreaSection(mark);
      this.lastMark = mark;
      return toReturn;
    }

    if (this.track.mark === "tick") {
      return this._getVerticesForTick(mark);
    }

    if (this.track.mark === "line") {
      return this._getVertexForDot(mark);
    }

    if (this.track.mark === "rect") {
      return this._getVerticesForRect(mark);
    }

    if (this.track.mark === "arc") {
      return this._getVerticesForArc(mark);
    }

    switch (mark.shape) {
      case "dot":
        if (this.drawMode === "POINTS") {
          return this._getVertexForDot(mark);
        } else {
          return this._getVerticesForSquare(mark);
        }
      case "triangle":
        return this._getVerticesForTriangle(mark);
      case "diamond":
        return this._getVerticesForPolygon(mark, 4);
      case "pentagon":
        return this._getVerticesForPolygon(mark, 5);
      case "hexagon":
        return this._getVerticesForPolygon(mark, 6);
      case "circle":
        return this._getVerticesForPolygon(mark, 16);
      case "cross":
        return this._getVerticesForCross(mark);
    }
  }

  _mapToGPUSpace(vertices) {
    let isX = false;
    return vertices.map((coord) => {
      isX = !isX;
      return isX ? this.xScale(coord) : this.yScale(coord);
    });
  }

  _getVerticesForArc(mark) {
    const startPoint = this._mapToGPUSpace([mark.x, mark.y]);
    const quadraticCurve = getCurveForArc(startPoint, [
      startPoint[0] + mark.width * SIZE_UNITS,
      startPoint[1] + mark.height * SIZE_UNITS,
    ]);

    const vertices = [
      ...quadraticCurve(0),
      ...quadraticCurve(1 / NUMBER_OF_VERTICES_PER_ARC),
    ];

    for (let i = 2; i < NUMBER_OF_VERTICES_PER_ARC + 1; i++) {
      const nextPoint = quadraticCurve(i / NUMBER_OF_VERTICES_PER_ARC);
      vertices.push(
        vertices[vertices.length - 2],
        vertices[vertices.length - 1],
        nextPoint[0],
        nextPoint[1]
      );
    }

    return vertices;
  }

  _getVerticesForAreaSection(mark) {
    if (!this.lastMark) {
      return [];
    }

    return this._mapToGPUSpace([
      mark.x,
      mark.y,
      this.lastMark.x,
      this.lastMark.y,
      mark.x,
      0, // TODO: Replace 0 to let area charts center around some other number
      this.lastMark.x,
      this.lastMark.y,
      this.lastMark.x,
      0,
      mark.x,
      0,
    ]);
  }

  _getVerticesForPolygon(mark, sides) {
    const center = this._mapToGPUSpace([mark.x, mark.y]);
    const vertices = [];

    for (let theta = 0; theta < 2 * Math.PI; theta += (2 * Math.PI) / sides) {
      vertices.push(
        center[0],
        center[1],
        center[0] + (mark.size / 2) * Math.cos(theta) * SIZE_UNITS,
        center[1] + (mark.size / 2) * Math.sin(theta) * SIZE_UNITS,
        center[0] +
          (mark.size / 2) *
            Math.cos(theta + (2 * Math.PI) / sides) *
            SIZE_UNITS,
        center[1] +
          (mark.size / 2) * Math.sin(theta + (2 * Math.PI) / sides) * SIZE_UNITS
      );
    }
    return vertices;
  }

  _getVerticesForTriangle(mark) {
    //     1
    //    / \
    //   2---3
    const center = this._mapToGPUSpace([mark.x, mark.y]);

    return [
      center[0],
      center[1] + (mark.size / 2) * SIZE_UNITS,
      center[0] - (mark.size / 2) * SIZE_UNITS,
      center[1] - (mark.size / 2) * SIZE_UNITS,
      center[0] + (mark.size / 2) * SIZE_UNITS,
      center[1] - (mark.size / 2) * SIZE_UNITS,
    ];
  }

  _getVertexForDot = (mark) => this._mapToGPUSpace([mark.x, mark.y]);

  _getVerticesForSquare(mark) {
    const center = this._mapToGPUSpace([mark.x, mark.y]);
    return [
      center[0] + (mark.size / 2) * SIZE_UNITS, //  2------1,4
      center[1] + (mark.size / 2) * SIZE_UNITS, //  |    /  |
      center[0] - (mark.size / 2) * SIZE_UNITS, //  |  /    |
      center[1] + (mark.size / 2) * SIZE_UNITS, // 3,5------6
      center[0] - (mark.size / 2) * SIZE_UNITS,
      center[1] - (mark.size / 2) * SIZE_UNITS,
      center[0] + (mark.size / 2) * SIZE_UNITS,
      center[1] + (mark.size / 2) * SIZE_UNITS,
      center[0] - (mark.size / 2) * SIZE_UNITS,
      center[1] - (mark.size / 2) * SIZE_UNITS,
      center[0] + (mark.size / 2) * SIZE_UNITS,
      center[1] - (mark.size / 2) * SIZE_UNITS,
    ];
  }

  _getVerticesForRect(mark) {
    //  1-----------3,6
    //  |       /    |
    //  |     /      |
    // 2,5-----------4
    const center = this._mapToGPUSpace([mark.x, mark.y]);
    return [
      center[0],
      center[1] + mark.height * SIZE_UNITS,
      center[0],
      center[1],
      center[0] + mark.width * SIZE_UNITS,
      center[1] + mark.height * SIZE_UNITS,
      center[0] + mark.width * SIZE_UNITS,
      center[1],
      center[0],
      center[1],
      center[0] + mark.width * SIZE_UNITS,
      center[1] + mark.height * SIZE_UNITS,
    ];
  }

  _getVerticesForTick(mark) {
    const center = this._mapToGPUSpace([mark.x, mark.y]);
    // 1----2
    if (this.track.width) {
      return [
        center[0] + (mark.width / 2) * SIZE_UNITS,
        center[1],
        center[0] - (mark.width / 2) * SIZE_UNITS,
        center[1],
      ];
    }

    // 1
    // |
    // 2
    if (mark.height) {
      // default to mark value which has default if height never specified in track
      return [
        center[0],
        center[1] + (mark.height / 2) * SIZE_UNITS,
        center[0],
        center[1] - (mark.height / 2) * SIZE_UNITS,
      ];
    }
  }
}

export default VertexCalculator;

export { SIZE_UNITS };
