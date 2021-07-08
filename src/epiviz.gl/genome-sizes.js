import { scale } from "./utilities";

const arraySum = (arr) => arr.reduce((a, b) => a + b, 0);

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
  // Assumes X and Y have been translated to appropriate index
  return (chr, pairNum) => {
    return chrStarts.get(chr) + pairNum;
  };
};

const getGenomeScale = (genomeId, domain) => {
  let chrSizes = genomeSizes[genomeId];
  if (chrSizes === undefined) {
    console.error(`${genomeId} is not a recognized genome!`);
  }

  const mapPairToNumber = createPairMapperToGenome(genomeId);

  let [startChr, startPair] = domain[0]
    .substring(3) // Remove chr
    .split(":"); // split chromesome and pair number
  startPair = parseInt(startPair);

  let [endChr, endPair] = domain[1].substring(3).split(":");
  endPair = parseInt(endPair);

  const firstPairInDomain = mapPairToNumber(startChr, startPair);
  const lastPairInDomain = mapPairToNumber(endChr, endPair);

  const genomeScale = scale([firstPairInDomain, lastPairInDomain], [-1, 1]);

  return (chr, gene) => genomeScale(mapPairToNumber(chr, gene));
};

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

export { genomeSizes, getGenomeScale };
