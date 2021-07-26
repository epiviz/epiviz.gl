import {
  SIZE_UNITS,
  transformGenomicRangeToStandard,
} from "./vertex-calculator";
import { getViewportForSchema } from "./utilities";

class GeometryMapper {
  constructor(schemaObject, trackObject) {
    this.schemaObject = schemaObject;
    this.trackObject = trackObject;
    this.track = trackObject.track;

    const viewportForSchema = getViewportForSchema(schemaObject.schema);
    if (schemaObject.xScale.isGenomeScale) {
      this.xDomainWidth = 2;
    } else {
      this.xDomainWidth = viewportForSchema[1] - viewportForSchema[0];
    }

    if (schemaObject.yScale.isGenomeScale) {
      this.yDomainHeight = 2;
    } else {
      this.yDomainHeight = viewportForSchema[3] - viewportForSchema[2];
    }

    console.log(this.xDomainWidth, this.yDomainHeight);
  }

  modifyGeometry(geometry) {
    if (
      this.trackObject.track.x.type === "genomicRange" ||
      this.trackObject.track.y.type === "genomicRange"
    ) {
      if (this.trackObject.track.mark === "arc") {
        const standardized = transformGenomicRangeArcToStandard(
          {
            x: geometry.coordinates[0],
            y: geometry.coordinates[1],
            width: geometry.dimensions[0],
            height: geometry.dimensions[1],
          },
          this.schemaObject.xScale,
          this.schemaObject.yScale
        );

        geometry.coordinates = [standardized.x, standardized.y];
        geometry.dimensions = [standardized.width, standardized.height];
      } else {
        const standardized = transformGenomicRangeToStandard(
          {
            x: geometry.coordinates[0],
            y: geometry.coordinates[1],
          },
          this.schemaObject.xScale,
          this.schemaObject.yScale
        );
        geometry.coordinates = [standardized.x, standardized.y];
      }
      if (!this.schemaObject.xScale.isGenomeScale && geometry.dimensions[0]) {
        // No need to do !== undefined to handle 0 case as result would be the same either way
        geometry.dimensions[0] *= (this.xDomainWidth * SIZE_UNITS) / 2;
      } else if (
        !this.schemaObject.yScale.isGenomeScale &&
        geometry.dimensions[1]
      ) {
        geometry.dimensions[1] *= (this.yDomainHeight * SIZE_UNITS) / 2;
      }

      return;
    }
    // If the x coordinate is a base pair, map it to a value between -1 and 1 for
    // data indexing
    console.log("before", geometry.dimensions);
    console.log("before", [...geometry.coordinates]);

    this._modifyX(geometry);
    this._modifyY(geometry);

    // As above but with y
    if (this.schemaObject.yScale.isGenomeScale) {
      geometry.coordinates[1] = this.schemaObject.yScale(
        geometry.coordinates[1]
      );

      if (this.trackObject.track.y.type === "genomeRange") {
        geometry.dimensions[1] =
          this.schemaObject.yScale(geometry.coordinates[1]) -
          geometry.coordinates[0];
      }
    }

    // If the track is a rect or tick, the width and height properties are used in display
    // so we need to calculate the width and height in data space for data retrieval
    if (
      this.trackObject.track.mark === "rect" ||
      this.trackObject.track.mark === "tick" ||
      this.trackObject.track.mark === "arc"
    ) {
      // Width is also a base pair, so we need to calculate the width in data space
      if (Array.isArray(geometry.dimensions[0])) {
        width =
          this.schemaObject.xScale(geometry.dimensions[0]) -
          geometry.coordinates[0];
      } else if (geometry.dimensions[0]) {
        // No need to do !== undefined to handle 0 case as result would be the same either way
        geometry.dimensions[0] *= (this.xDomainWidth * SIZE_UNITS) / 2;
      }
      // Height is also a base pair, so we need to calculate the height in data space
      if (Array.isArray(geometry.dimensions[1])) {
        height =
          this.schemaObject.yScale(geometry.dimensions[1]) -
          geometry.coordinates[1];
      } else if (geometry.dimensions[1]) {
        geometry.dimensions[1] *= (this.yDomainHeight * SIZE_UNITS) / 2;
      }
    }

    // If width and height are undefined, make very small for indexer to treat as points
    console.log("almost", geometry.dimensions);

    geometry.dimensions[0] = geometry.dimensions[0] || 1e-10;
    geometry.dimensions[1] = geometry.dimensions[1] || 1e-10;
    console.log("after", geometry.dimensions);
  }

  _modifyX(geometry) {
    // Need to map base pair to coordinate between -1 and 1
    if (this.schemaObject.xScale.isGenomeScale) {
      // If x is defined by genomic range, width is calculated here
      if (this.trackObject.track.x.type === "genomicRange") {
      }
      geometry.coordinates[0] = this.schemaObject.xScale(
        geometry.coordinates[0]
      );

      // x is defined as a range so we need to calculate width
      if (this.trackObject.track.x.type === "genomeRange") {
        // When x is a genome range, coordinates[0] and [1] no longer refer to x and y respectively.
        // They instead refer to 2-length arrays containing base pair info.
        geometry.dimensions[0] =
          this.schemaObject.xScale(geometry.coordinates[1]) -
          geometry.coordinates[0];
      }
    }
  }

  _modifyY(geometry) {}

  _mapHeightToDataSpace(geometry) {
    geometry.dimensions[1] *= (this.yDomainHeight * SIZE_UNITS) / 2;
  }

  _mapWidthToDataSpace(geometry) {
    geometry.dimensions[0] *= (this.yDomainHeight * SIZE_UNITS) / 2;
  }

  _remapGenomicRangeGeometry(geometry) {}
}

export default GeometryMapper;
