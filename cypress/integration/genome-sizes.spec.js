import { GenomeScale, genomeSizes } from "../../src/epiviz.gl/genome-sizes";

describe("Creating scales for genome pairs to map to GPU space", () => {
  let currentScale;
  let genomeScale = (chr, gene) => currentScale.toClipSpaceFromParts(chr, gene);

  it("should handle a genome range in a single chromosome", () => {
    currentScale = new GenomeScale("hg38", ["chr1:1", "chr1:1000"]);

    expect(genomeScale("1", 1)).to.be.closeTo(-1, 2 ** -23);
    expect(genomeScale("1", 1000)).to.be.closeTo(1, 2 ** -23);

    currentScale = new GenomeScale("hg38", ["chr10:1", "chr10:1000000"]);

    expect(genomeScale("10", 1)).to.be.closeTo(-1, 2 ** -23);
    expect(genomeScale("10", 1000000)).to.be.closeTo(1, 2 ** -23);
  });

  it("should handle a genome range across multiple chromosomes", () => {
    currentScale = new GenomeScale("hg38", ["chr1:1", "chr2:1000"]);

    expect(genomeScale("2", 1)).to.be.closeTo(
      ((genomeSizes.hg38.get("1") + 1) / (genomeSizes.hg38.get("1") + 1000)) *
        2 -
        1,
      2 ** -23
    );
    expect(genomeScale("2", 1000)).to.be.closeTo(1, 2 ** -23);

    expect(genomeScale("1", 1)).to.be.closeTo(-1, 2 ** -23);
    expect(genomeScale("1", 100)).to.be.closeTo(
      (100 / (genomeSizes.hg38.get("1") + 1000)) * 2 - 1,
      2 ** -23
    );
  });

  it("should handle a genome range across many chromosomes", () => {
    currentScale = GenomeScale.completeScale("hg38");

    expect(genomeScale("Y", 57227415)).to.be.closeTo(1, 2 ** -23);
    expect(genomeScale("1", 1)).to.be.closeTo(-1, 2 ** -23);
  });

  it("should handle a genome range from a numbered chromosome to the X chromosome", () => {
    currentScale = new GenomeScale("hg38", ["chr22:1", "chrX:1000"]);

    expect(genomeScale("22", 1)).to.be.closeTo(-1, 2 ** -23);
    expect(genomeScale("22", 1000)).to.be.closeTo(
      (1000 / (genomeSizes.hg38.get("22") + 1000)) * 2 - 1,
      2 ** -23
    );

    expect(genomeScale("X", 1)).to.be.closeTo(
      ((genomeSizes.hg38.get("22") + 1) / (genomeSizes.hg38.get("22") + 1000)) *
        2 -
        1,
      2 ** -23
    );
    expect(genomeScale("X", 1000)).to.be.closeTo(1, 2 ** -23);
  });

  it("should handle a genome range from a numbered chromosome to the Y chromosome", () => {
    currentScale = new GenomeScale("hg38", ["chr22:1", "chrY:1000"]);

    expect(genomeScale("22", 1)).to.be.closeTo(-1, 2 ** -23);
    expect(genomeScale("22", 1000)).to.be.closeTo(
      (1000 / (genomeSizes.hg38.get("22") + genomeSizes.hg38.get("X") + 1000)) *
        2 -
        1,
      2 ** -23
    );

    expect(genomeScale("X", 1)).to.be.closeTo(
      ((genomeSizes.hg38.get("22") + 1) /
        (genomeSizes.hg38.get("22") + genomeSizes.hg38.get("X") + 1000)) *
        2 -
        1,
      2 ** -23
    );

    expect(genomeScale("X", 1000)).to.be.closeTo(
      ((genomeSizes.hg38.get("22") + 1000) /
        (genomeSizes.hg38.get("22") + genomeSizes.hg38.get("X") + 1000)) *
        2 -
        1,
      2 ** -23
    );

    expect(genomeScale("Y", 1)).to.be.closeTo(
      ((genomeSizes.hg38.get("22") + genomeSizes.hg38.get("X") + 1) /
        (genomeSizes.hg38.get("22") + genomeSizes.hg38.get("X") + 1000)) *
        2 -
        1,
      2 ** -23
    );

    expect(genomeScale("Y", 1000)).to.be.closeTo(1, 2 ** -23);
  });

  it("should handle a genome range from the X chromosome to the X chromosome", () => {
    currentScale = new GenomeScale("hg38", ["chrX:1", "chrX:1001"]);

    expect(genomeScale("X", 1)).to.be.closeTo(-1, 2 ** -23);
    expect(genomeScale("X", 501)).to.be.closeTo(0, 2 ** -23);
    expect(genomeScale("X", 1001)).to.be.closeTo(1, 2 ** -23);
  });

  it("should handle a genome range from the Y chromosome to the Y chromosome", () => {
    currentScale = new GenomeScale("hg38", ["chrY:1", "chrY:1001"]);

    expect(genomeScale("Y", 1)).to.be.closeTo(-1, 2 ** -23);
    expect(genomeScale("Y", 501)).to.be.closeTo(0, 2 ** -23);
    expect(genomeScale("Y", 1001)).to.be.closeTo(1, 2 ** -23);
  });
});

describe("Creating nice tick values for genome pair ranges", () => {
  let currentScale;

  const expectTickFormatsToBe = (formattedTicks, start, end) => {
    let formatted = currentScale.getTickCoordsAndLabels(start, end).tickLabels;
    formattedTicks.forEach((formattedTick, index) => {
      expect(formattedTick).to.eq(formatted[index]);
    });
  };

  it("should format to the millions", () => {
    currentScale = new GenomeScale("hg38", ["chr1:11111111", "chr1:77777777"]);
    expectTickFormatsToBe(
      [
        "chr1:11.11M",
        "chr1:11.12M",
        "chr1:11.13M",
        "chr1:11.14M",
        "chr1:11.15M",
        "chr1:11.16M",
        "chr1:11.17M",
      ],
      -1,
      -0.998
    );

    expectTickFormatsToBe(
      [
        "chr1:11.1M",
        "chr1:11.2M",
        "chr1:11.3M",
        "chr1:11.4M",
        "chr1:11.5M",
        "chr1:11.6M",
        "chr1:11.7M",
      ],
      -1,
      -0.98
    );

    expectTickFormatsToBe(
      [
        "chr1:11M",
        "chr1:12M",
        "chr1:13M",
        "chr1:14M",
        "chr1:15M",
        "chr1:16M",
        "chr1:17M",
      ],
      -1,
      -0.8
    );

    expectTickFormatsToBe(
      [
        "chr1:10M",
        "chr1:20M",
        "chr1:30M",
        "chr1:40M",
        "chr1:50M",
        "chr1:60M",
        "chr1:70M",
      ],
      -1,
      1
    );

    currentScale = new GenomeScale("hg38", ["chr1:1", "chr1:248956422"]);
    expectTickFormatsToBe(["chr1:0", "chr1:100M", "chr1:200M"], -1, 1);
  });

  it("should format to the chromosome", () => {
    currentScale = new GenomeScale("hg38", ["chr1:1", "chr4:2"]);
    expectTickFormatsToBe(["chr1:1", "chr2:1", "chr3:1", "chr4:1"], -1, 0.8);
  });
});
