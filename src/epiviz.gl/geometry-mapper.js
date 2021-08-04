import {
  SIZE_UNITS,
  transformGenomicRangeToStandard,
  transformGenomicRangeArcToStandard,
} from "./vertex-calculator";
import { getViewportForSchema } from "./utilities";

class GeometryMapper {
  /**
   * A class meant to modify data points from the getNextDataPoint method of the {@link Track} object
   * to geometries that coincide with their visibility on the canvas i.e. with a proper width, height,
   * x and y. This class is NOT meant to be used by the WebGLDrawer for rendering. It is solely used
   * by the DataProcessor to properly index the data.
   *
   * @param {SchemaProcessor} schemaObject of the visualization for these geometries
   * @param {Track} trackObject containing track info for track that these geometries are a part of
   */
  constructor(schemaObject, trackObject) {
    this.schemaObject = schemaObject;
    this.trackObject = trackObject;
    this.track = trackObject.track;
    this.xScale = this.schemaObject.xScale;
    this.yScale = this.schemaObject.yScale;

    const viewportForSchema = getViewportForSchema(schemaObject.schema);
    if (schemaObject.xScale.isGenomeScale) {
      this.xDomainWidth = 2 / 2;
    } else {
      this.xDomainWidth = (viewportForSchema[1] - viewportForSchema[0]) / 2;
    }

    if (schemaObject.yScale.isGenomeScale) {
      this.yDomainHeight = 2 / 2;
    } else {
      this.yDomainHeight = (viewportForSchema[3] - viewportForSchema[2]) / 2;
    }
  }

  /**
   * Modifies a geometry object in place based on the schema.
   *
   * @param {Object} geometry an object of the form {dimensions: Array(2), coordinates: Array(2)}
   */
  modifyGeometry(geometry) {
    if (this.xScale.isGenomeScale) {
      // transforms x part into a standard format
      if (this.trackObject.track.x.type === "genomicRange") {
        this._modifyGenomicRangeX(geometry);
      }
      geometry.coordinates[0] = this.xScale(geometry.coordinates[0]);
    }
    this._modifyStandardX(geometry);

    if (this.yScale.isGenomeScale) {
      // transforms y part into a standard format
      if (this.trackObject.track.y.type === "genomicRange") {
        this._modifyGenomicRangeY(geometry);
      }
      geometry.coordinates[1] = this.yScale(geometry.coordinates[1]);
    }
    this._modifyStandardY(geometry);
  }

  _modifyStandardX(geometry) {
    if (geometry.dimensions[0]) {
      // Transform width from the data point into visible width on the canvas
      geometry.dimensions[0] *= this.xDomainWidth * SIZE_UNITS;
    }

    // If there is no width, give very small width for flatbush indexing
    geometry.dimensions[0] = geometry.dimensions[0] || 1e-10;
  }

  _modifyStandardY(geometry) {
    if (geometry.dimensions[1]) {
      // Transform height from the data point into visible height on the canvas
      geometry.dimensions[1] *= this.yDomainHeight * SIZE_UNITS;
    }

    // If there is no height, give very small height for flatbush indexing
    geometry.dimensions[1] = geometry.dimensions[1] || 1e-10;
  }

  _modifyGenomicRangeX(geometry) {
    if (this.trackObject.track.mark === "arc") {
      /**
       * Geometry is in the form
       * {
       *   coordinates: [[[chr1,gene1], [chr2,gene2]], <y-coord handled in _modifyGenomicRangeY>]
       *   dimensions: [[[chr3,gene3], [chr3,gene3]], <height handled in _modifyGenomicRangeY>]
       * }
       *
       * and is transformed to
       * {
       *   coordinates: [x-coord between -1 and 1, <y handled elsewhere>]
       *   dimensions: [width, <height handled elsewhere>]
       * }
       */
      const standardized = transformGenomicRangeArcToStandard(
        {
          x: geometry.coordinates[0],
          y: 0,
          width: geometry.dimensions[0],
          height: 0,
        },
        this.schemaObject.xScale,
        this.schemaObject.yScale
      );

      geometry.coordinates[0] = standardized.x;
      geometry.dimensions[0] = standardized.width;
    } else {
      /**
       * Geometry is in the form
       * {
       *   coordinates: [[[chr1,gene1], [chr2,gene2]], <y-coord handled in _modifyGenomicRangeY>]
       *   dimensions: [<ignored value>, <height handled elsewhere>]
       * }
       *
       * and is transformed to
       * {
       *   coordinates: [x-coord between -1 and 1, <y handled elsewhere>]
       *   dimensions: [width, <height handled elsewhere>]
       * }
       */

      const standardized = transformGenomicRangeToStandard(
        {
          x: geometry.coordinates[0],
          y: 0,
        },
        this.schemaObject.xScale,
        this.schemaObject.yScale
      );
      geometry.coordinates[0] = standardized.x;
      geometry.dimensions[0] = standardized.width;
    }
  }

  _modifyGenomicRangeY(geometry) {
    // See comments in _modifyGenomicRangeX

    if (this.trackObject.track.mark === "arc") {
      const standardized = transformGenomicRangeArcToStandard(
        {
          x: 0,
          y: geometry.coordinates[1],
          width: 0,
          height: geometry.coordinates[1],
        },
        this.schemaObject.xScale,
        this.schemaObject.yScale
      );

      geometry.coordinates[1] = standardized.y;
      geometry.dimensions[1] = standardized.height;
    } else {
      const standardized = transformGenomicRangeToStandard(
        {
          x: 0,
          y: geometry.coordinates[1],
        },
        this.schemaObject.xScale,
        this.schemaObject.yScale
      );
      geometry.coordinates[1] = standardized.y;
      geometry.dimensions[1] = standardized.height;
    }
  }
}

export default GeometryMapper;
