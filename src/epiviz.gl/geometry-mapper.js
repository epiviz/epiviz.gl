import {
  SIZE_UNITS,
  transformGenomicRangeToStandard,
  transformGenomicRangeArcToStandard,
} from "./vertex-calculator";
import { getViewportForSchema } from "./utilities";

class GeometryMapper {
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
      geometry.dimensions[0] *= this.xDomainWidth * SIZE_UNITS;
    }

    geometry.dimensions[0] = geometry.dimensions[0] || 1e-10;
  }

  _modifyStandardY(geometry) {
    if (geometry.dimensions[1]) {
      geometry.dimensions[1] *= this.yDomainHeight * SIZE_UNITS;
    }
    geometry.dimensions[1] = geometry.dimensions[1] || 1e-10;
  }

  _modifyGenomicRangeX(geometry) {
    if (this.trackObject.track.mark === "arc") {
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
