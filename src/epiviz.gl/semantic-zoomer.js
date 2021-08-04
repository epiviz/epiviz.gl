const sizeOfGeneRangeForTriangles = 1000000;

class SemanticZoomer {
  /**
   * Gives guidance or takes control over canvas when semantic zooming
   * is necessary. Developers should extend this class to create semantic zooming
   * behavior.
   * @param {SchemaProcessor} schemaHelper
   */
  constructor(schemaHelper) {
    this.schemaHelper = schemaHelper;
  }

  getRecommendedDrawingMode(trackShader, currentXRange, currentYRange) {
    if (trackShader.drawMode !== "TRIANGLES") {
      return trackShader.drawMode;
    }

    if (
      !this.schemaHelper.xScale.isGenomeScale &&
      !this.schemaHelper.yScale.isGenomeScale
    ) {
      // Currently only used for genome tracks
      return "TRIANGLES";
    }
    if (this.schemaHelper.xScale.isGenomeScale) {
      const numberOfGenes =
        this.schemaHelper.xScale.mapGenomeIndexToClipSpaceInverse(
          currentXRange[1]
        ) -
        this.schemaHelper.xScale.mapGenomeIndexToClipSpaceInverse(
          currentXRange[0]
        );
      if (numberOfGenes < sizeOfGeneRangeForTriangles) {
        return "TRIANGLES";
      }
    }
    if (this.schemaHelper.yScale.isGenomeScale) {
      const numberOfGenes =
        this.schemaHelper.yScale.mapGenomeIndexToClipSpaceInverse(
          currentYRange[1]
        ) -
        this.schemaHelper.yScale.mapGenomeIndexToClipSpaceInverse(
          currentYRange[0]
        );
      if (numberOfGenes < sizeOfGeneRangeForTriangles) {
        return "TRIANGLES";
      }
    }

    return "LINES";
  }
}

export default SemanticZoomer;
