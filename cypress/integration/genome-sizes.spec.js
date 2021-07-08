import { getGenomeScale, genomeSizes } from "../../src/epiviz.gl/genome-sizes";

describe("Creating scales for genome pairs to map to GPU space", () => {
  let genomeScale;

  it("should handle a genome range in a single chromosome", () => {
    genomeScale = getGenomeScale("hg38", ["chr1:1", "chr1:1000"]);

    expect(genomeScale("1", 1)).to.be.closeTo(-1, 2 ** -23);
    expect(genomeScale("1", 1000)).to.be.closeTo(1, 2 ** -23);

    genomeScale = getGenomeScale("hg38", ["chr10:1", "chr10:1000000"]);

    expect(genomeScale("10", 1)).to.be.closeTo(-1, 2 ** -23);
    expect(genomeScale("10", 1000000)).to.be.closeTo(1, 2 ** -23);
  });

  it("should handle a genome range across multiple chromosomes", () => {
    genomeScale = getGenomeScale("hg38", ["chr1:1", "chr2:1000"]);

    expect(genomeScale("2", 1)).to.be.closeTo(
      ((genomeSizes.hg38[0] + 1) / (genomeSizes.hg38[0] + 1000)) * 2 - 1,
      2 ** -23
    );
    expect(genomeScale("2", 1000)).to.be.closeTo(1, 2 ** -23);

    expect(genomeScale("1", 1)).to.be.closeTo(-1, 2 ** -23);
    expect(genomeScale("1", 100)).to.be.closeTo(
      (100 / (genomeSizes.hg38[0] + 1000)) * 2 - 1,
      2 ** -23
    );
  });

  it("should handle a genome range from a numbered chromosome to the X chromosome", () => {
    genomeScale = getGenomeScale("hg38", ["chr22:1", "chrX:1000"]);

    expect(genomeScale("22", 1)).to.be.closeTo(-1, 2 ** -23);
    expect(genomeScale("22", 1000)).to.be.closeTo(
      (1000 / (genomeSizes.hg38[21] + 1000)) * 2 - 1,
      2 ** -23
    );

    expect(genomeScale("X", 1)).to.be.closeTo(
      ((genomeSizes.hg38[21] + 1) / (genomeSizes.hg38[21] + 1000)) * 2 - 1,
      2 ** -23
    );
    expect(genomeScale("X", 1000)).to.be.closeTo(1, 2 ** -23);
  });

  it("should handle a genome range from a numbered chromosome to the Y chromosome", () => {
    genomeScale = getGenomeScale("hg38", ["chr22:1", "chrY:1000"]);

    expect(genomeScale("22", 1)).to.be.closeTo(-1, 2 ** -23);
    expect(genomeScale("22", 1000)).to.be.closeTo(
      (1000 / (genomeSizes.hg38[21] + genomeSizes.hg38[22] + 1000)) * 2 - 1,
      2 ** -23
    );

    expect(genomeScale("X", 1)).to.be.closeTo(
      ((genomeSizes.hg38[21] + 1) /
        (genomeSizes.hg38[21] + genomeSizes.hg38[22] + 1000)) *
        2 -
        1,
      2 ** -23
    );

    expect(genomeScale("X", 1000)).to.be.closeTo(
      ((genomeSizes.hg38[21] + 1000) /
        (genomeSizes.hg38[21] + genomeSizes.hg38[22] + 1000)) *
        2 -
        1,
      2 ** -23
    );

    expect(genomeScale("Y", 1)).to.be.closeTo(
      ((genomeSizes.hg38[21] + genomeSizes.hg38[22] + 1) /
        (genomeSizes.hg38[21] + genomeSizes.hg38[22] + 1000)) *
        2 -
        1,
      2 ** -23
    );

    expect(genomeScale("Y", 1000)).to.be.closeTo(1, 2 ** -23);
  });

  it("should handle a genome range from the X chromosome to the X chromosome", () => {
    genomeScale = getGenomeScale("hg38", ["chrX:1", "chrX:1001"]);

    expect(genomeScale("X", 1)).to.be.closeTo(-1, 2 ** -23);
    expect(genomeScale("X", 501)).to.be.closeTo(0, 2 ** -23);
    expect(genomeScale("X", 1001)).to.be.closeTo(1, 2 ** -23);
  });

  it("should handle a genome range from the Y chromosome to the Y chromosome", () => {
    genomeScale = getGenomeScale("hg38", ["chrY:1", "chrY:1001"]);

    expect(genomeScale("Y", 1)).to.be.closeTo(-1, 2 ** -23);
    expect(genomeScale("Y", 501)).to.be.closeTo(0, 2 ** -23);
    expect(genomeScale("Y", 1001)).to.be.closeTo(1, 2 ** -23);
  });
});
