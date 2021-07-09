import { scale } from "./utilities";

const createPairMapperToGenome = (genomeId) => {
  let chrSizes = genomeSizes[genomeId];

  let chrStarts = new Map(
    chrSizes
      .slice(0, chrSizes.length - 2) // exclude X and Y chromosomes
      .map((_, index) => [
        (index + 1).toString(), // treat chromosomes as string to avoid having X and Y be special cases
        arraySum(chrSizes.slice(0, index)),
      ])
  );

  chrStarts.set(
    "X",
    chrStarts.get(chrStarts.size.toString()) + chrSizes[chrStarts.size - 1]
  );

  chrStarts.set("Y", chrStarts.get("X") + chrSizes[chrStarts.size - 1]);
  return (chr, pairNum) => {
    return chrStarts.get(chr) + pairNum;
  };
};

class GenomeScale {
  constructor(genomeId, domain) {
    if (genomeSizes[genomeId] === undefined) {
      console.error(`${genomeId} is not a recognized genome!`);
    }
    this.genomeId = genomeId;
    this.domain = domain;

    let [startChr, startPair] = domain[0]
      .substring(3) // Remove chr
      .split(":"); // split chromesome and pair number
    startPair = parseInt(startPair);

    let [endChr, endPair] = domain[1].substring(3).split(":");
    endPair = parseInt(endPair);

    this.mapPairToGenomeIndex = createPairMapperToGenome(genomeId);
    const firstPairInDomain = this.mapPairToGenomeIndex(startChr, startPair);
    const lastPairInDomain = this.mapPairToGenomeIndex(endChr, endPair);
    this.mapGenomeIndexToClipSpace = scale(
      [firstPairInDomain, lastPairInDomain],
      [-1, 1]
    );
    this.mapGenomeIndexToClipSpaceInverse = scale(
      [-1, 1],
      [firstPairInDomain, lastPairInDomain]
    );
  }

  toClipSpaceFromParts(chr, pair) {
    return this.mapGenomeIndexToClipSpace(this.mapPairToGenomeIndex(chr, pair));
  }

  toClipSpaceFromString(pairStr) {
    let [chr, pair] = pairStr.substring(3).split(":");
    pair = parseInt(pair);
    return this.toClipSpaceFromParts(chr, pair);
  }

  inverse(num) {
    let genomeSpot = Math.floor(this.mapGenomeIndexToClipSpaceInverse(num));
    let chrNum = 1;
    let chrLoc;
    let cumulativeTotal = 0;
    for (const pairCount of genomeSizes[this.genomeId]) {
      if (cumulativeTotal + pairCount > genomeSpot) {
        chrLoc = genomeSpot - cumulativeTotal;
        break;
      }
    }

    if (chrNum === genomeSizes[this.genomeId].length) {
      chrNum = "Y";
    } else if (chrNum === genomeSizes[this.genomeId].length - 1) {
      chrNum = "X";
    }
    return `chr${chrNum}:${chrLoc}`;
  }

  static completeScale(genomeId) {
    const chrSizes = genomeSizes[genomeId];
    const finalChrSize = chrSizes[chrSizes.length - 1];

    return new GenomeScale(genomeId, ["chr1:1", `chrY:${finalChrSize}`]);
  }
}

const arraySum = (arr) => arr.reduce((a, b) => a + b, 0);

const genomeSizes = {
  hg38: Object.freeze([
    248956422, // chr1
    242193529, // chr2
    198295559, // ...
    190214555,
    181538259,
    170805979,
    159345973,
    145138636,
    138394717,
    135086622,
    133797422,
    133275309,
    114364328,
    107043718,
    101991189,
    90338345,
    83257441,
    80373285,
    58617616,
    64444167, // ...
    46709983, // chr21
    50818468, // chr22
    156040895, // chrX
    57227415, // chrY
  ]),

  hg19: Object.freeze([
    249250621, // chr1
    243199373, // chr2
    198022430, // ...
    191154276,
    180915260,
    171115067,
    159138663,
    146364022,
    141213431,
    135534747,
    135006516,
    133851895,
    115169878,
    107349540,
    102531392,
    90354753,
    81195210,
    78077248,
    59128983,
    63025520, // ...
    48129895, // chr21
    51304566, // chr22
    155270560, // chrX
    59373566, // chrY
  ]),

  mm39: Object.freeze([
    195154279, // chr1
    181755017, // chr2
    159745316, // ...
    156860686,
    151758149,
    149588044,
    144995196,
    130127694,
    124359700,
    130530862,
    121973369,
    120092757,
    120883175,
    125139656,
    104073951,
    98008968,
    95294699, // ...
    90720763, // chr18
    61420004, // chr19
    169476592, // chrX
    91455967, // chrY
  ]),
};

export { genomeSizes, GenomeScale };
