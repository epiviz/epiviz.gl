const sizeOfGeneRangeForTriangles = 1000000;

class SemanticZoomer {
  /**
   * Gives guidance or takes control over canvas when semantic zooming
   * is necessary. Developers should extend this class to create semantic zooming
   * behavior.
   * @param {SpecificationProcessor} specificationHelper
   */
  constructor(specificationHelper) {
    this.specificationHelper = specificationHelper;
  }

  getRecommendedDrawingMode(trackShader, currentXRange, currentYRange) {
    if (trackShader.drawMode !== "TRIANGLES") {
      return trackShader.drawMode;
    }

    if (
      !this.specificationHelper.xScale.isGenomeScale &&
      !this.specificationHelper.yScale.isGenomeScale
    ) {
      // Currently only used for genome tracks
      return "TRIANGLES";
    }
    if (this.specificationHelper.xScale.isGenomeScale) {
      const numberOfGenes =
        this.specificationHelper.xScale.mapGenomeIndexToClipSpaceInverse(
          currentXRange[1]
        ) -
        this.specificationHelper.xScale.mapGenomeIndexToClipSpaceInverse(
          currentXRange[0]
        );
      if (numberOfGenes < sizeOfGeneRangeForTriangles) {
        return "TRIANGLES";
      }
    }
    if (this.specificationHelper.yScale.isGenomeScale) {
      const numberOfGenes =
        this.specificationHelper.yScale.mapGenomeIndexToClipSpaceInverse(
          currentYRange[1]
        ) -
        this.specificationHelper.yScale.mapGenomeIndexToClipSpaceInverse(
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
