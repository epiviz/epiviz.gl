import "fpsmeter";
import {color as $gp9G4$color} from "d3-color";
import {format as $gp9G4$format, precisionRound as $gp9G4$precisionRound} from "d3-format";
import {axisTop as $gp9G4$axisTop, axisLeft as $gp9G4$axisLeft, axisBottom as $gp9G4$axisBottom, axisRight as $gp9G4$axisRight} from "d3-axis";
import {scaleLinear as $gp9G4$scaleLinear} from "d3-scale";
import {select as $gp9G4$select} from "d3-selection";
import {Validator as $gp9G4$Validator} from "jsonschema";

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}



/**
 * Create a function which maps a genome pair to a location in the entire genome
 *
 * @param {String} genomeId key from genomeSizes object
 * @returns a function which maps a (chrId, pairNum) => to
 *  a number between 1 and total number of genes in the genome
 */ const $929885f8c24edae8$var$createPairMapperToGenome = (genomeId)=>{
    let chrSizes = $929885f8c24edae8$export$20b4bea6c5703d74[genomeId];
    let chrStarts = new Map();
    let cumulativeTotal = 0;
    chrSizes.forEach((value, key)=>{
        chrStarts.set(key, cumulativeTotal);
        cumulativeTotal += value;
    });
    return (chr, pairNum)=>{
        return chrStarts.get(chr) + pairNum;
    };
};
class $929885f8c24edae8$export$6b472c3672dd1154 {
    /**
   * A scale used to map a genome pair to a location between -1 and 1 for data visualization.
   * Also contains inverse and utility functions for getting labels for axis.
   *
   * @param {String} genomeId key from genomeSizes object
   * @param {Array} domain array of length 2 containing the start and end of the genome
   *   for the scale. ex: ["chr2:1000", "chr3:2000"]
   */ constructor(genomeId1, domain){
        if ($929885f8c24edae8$export$20b4bea6c5703d74[genomeId1] === undefined) console.error(`${genomeId1} is not a recognized genome!`);
        this.genomeId = genomeId1;
        this.domain = domain;
        let [startChr, startPair] = domain[0].substring(3) // Remove chr
        .split(":"); // split chromesome and pair number
        startPair = parseInt(startPair);
        let [endChr, endPair] = domain[1].substring(3).split(":");
        endPair = parseInt(endPair);
        this.mapPairToGenomeIndex = $929885f8c24edae8$var$createPairMapperToGenome(genomeId1);
        const firstPairInDomain = this.mapPairToGenomeIndex(startChr, startPair);
        const lastPairInDomain = this.mapPairToGenomeIndex(endChr, endPair);
        this.mapGenomeIndexToClipSpace = $98134174e03f20c3$export$8f869025bba9609b([
            firstPairInDomain,
            lastPairInDomain
        ], [
            -1,
            1
        ]);
        this.mapGenomeIndexToClipSpaceInverse = $98134174e03f20c3$export$8f869025bba9609b([
            -1,
            1
        ], [
            firstPairInDomain,
            lastPairInDomain
        ]);
    }
    /**
   * Map a genome pair to [-1, 1] with the parts.
   *
   * @param {String} chr id of chromosome in genome
   * @param {Number} pair location in chromosome
   * @returns value in [-1, 1] corresponding to genome range location
   */ toClipSpaceFromParts(chr, pair) {
        return this.mapGenomeIndexToClipSpace(this.mapPairToGenomeIndex(chr, pair));
    }
    /**
   * Utility method for calling this.toClipSpaceFromParts.
   *
   * @param {String} pairStr in form "chrID:geneNumber" ex: "chr1:1000"
   * @returns value in [-1, 1] corresponding to genome range location
   */ toClipSpaceFromString(pairStr) {
        let [chr, pair] = pairStr.substring(3).split(":");
        pair = parseInt(pair);
        return this.toClipSpaceFromParts(chr, pair);
    }
    /**
   * Get the gene id from a value between [-1, 1]
   *
   * @param {Number} num number between [-1, 1]
   * @param {String} formatting used for formatting gene number with d3-format
   * @returns `chr${chrId}:${chrLoc}`
   */ inverse(num, formatting = false) {
        let genomeSpot = Math.floor(this.mapGenomeIndexToClipSpaceInverse(num));
        let chrId;
        let chrLoc;
        let cumulativeTotal = 0;
        for (const [chrKey, pairCount] of $929885f8c24edae8$export$20b4bea6c5703d74[this.genomeId].entries()){
            if (cumulativeTotal + pairCount >= genomeSpot) {
                chrLoc = genomeSpot - cumulativeTotal;
                chrId = chrKey;
                break;
            }
            cumulativeTotal += pairCount;
        }
        return formatting ? `chr${chrId}:${$gp9G4$format(formatting)(chrLoc)}` : `chr${chrId}:${chrLoc}`;
    }
    getMidpoint(chr1, gene1, chr2, gene2) {
        const x1 = this.toClipSpaceFromParts(chr1, gene1);
        const x2 = this.toClipSpaceFromParts(chr2, gene2);
        const middleGene = this.inverse((x1 + x2) / 2);
        const [chrId, gene] = middleGene.substring(3).split(":");
        return [
            chrId,
            parseInt(gene)
        ];
    }
    /**
   * Get a sequence of ticks for a range in the genome.
   *
   * @param {Number} start number between [-1, 1]
   * @param {Number} end number between [-1, 1] > start
   * @returns object with tickCoords and corresponding tickLabels property
   */ getTickCoordsAndLabels(start, end) {
        let [startChr1, startPair1] = this.inverse(start).substring(3).split(":");
        let [endChr1, endPair1] = this.inverse(end).substring(3).split(":");
        const toReturn = [];
        let suggestedFormat;
        if (startChr1 === endChr1) {
            let difference = endPair1 - startPair1;
            let magnitude = Math.floor(Math.log10(difference));
            let startingValue = startPair1 - startPair1 % 10 ** magnitude;
            suggestedFormat = $gp9G4$precisionRound(10 ** magnitude, startingValue);
            for(let currValue = startingValue; currValue < endPair1; currValue += 10 ** magnitude)toReturn.push(this.toClipSpaceFromParts(startChr1, currValue));
        } else {
            suggestedFormat = "1";
            for (const chrId of $929885f8c24edae8$export$20b4bea6c5703d74[this.genomeId].keys())toReturn.push(this.toClipSpaceFromParts(chrId, 1));
        }
        return {
            tickCoords: toReturn,
            tickLabels: toReturn.map((coord)=>this.inverse(coord, $gp9G4$format(`.${suggestedFormat}s`))
            )
        };
    }
    toCallable() {
        // TODO investigate if using this method in the vertex calculator leads to slow downs
        const func = (args)=>{
            return this.toClipSpaceFromParts(args[0], args[1]);
        };
        func.isGenomeScale = true;
        func.mapGenomeIndexToClipSpaceInverse = this.mapGenomeIndexToClipSpaceInverse.bind(this);
        func.getMidpoint = this.getMidpoint.bind(this);
        func.getTickCoordsAndLabels = this.getTickCoordsAndLabels.bind(this);
        return func;
    }
    /**
   * Utility method for getting a GenomeScale across an entire genome.
   *
   * @param {String} genomeId from genomeSizes
   * @returns a GenomeScale across an entire genome
   */ static completeScale(genomeId) {
        const chrSizes = $929885f8c24edae8$export$20b4bea6c5703d74[genomeId];
        const finalEntry = [
            ...chrSizes.entries()
        ][chrSizes.size - 1];
        return new $929885f8c24edae8$export$6b472c3672dd1154(genomeId, [
            "chr1:1",
            `chr${finalEntry[0]}:${finalEntry[1]}`, 
        ]);
    }
}
/**
 * Available genomes to visualize. Each genome is a map from chromosome id to number of genes in chromosome.
 * Order matters as maps remember insertion order.
 */ const $929885f8c24edae8$export$20b4bea6c5703d74 = {
    hg38: new Map([
        [
            "1",
            248956422
        ],
        [
            "2",
            242193529
        ],
        [
            "3",
            198295559
        ],
        [
            "4",
            190214555
        ],
        [
            "5",
            181538259
        ],
        [
            "6",
            170805979
        ],
        [
            "7",
            159345973
        ],
        [
            "8",
            145138636
        ],
        [
            "9",
            138394717
        ],
        [
            "10",
            135086622
        ],
        [
            "11",
            133797422
        ],
        [
            "12",
            133275309
        ],
        [
            "13",
            114364328
        ],
        [
            "14",
            107043718
        ],
        [
            "15",
            101991189
        ],
        [
            "16",
            90338345
        ],
        [
            "17",
            83257441
        ],
        [
            "18",
            80373285
        ],
        [
            "19",
            58617616
        ],
        [
            "20",
            64444167
        ],
        [
            "21",
            46709983
        ],
        [
            "22",
            50818468
        ],
        [
            "X",
            156040895
        ],
        [
            "Y",
            57227415
        ]
    ]),
    hg19: new Map([
        [
            "1",
            249250621
        ],
        [
            "2",
            243199373
        ],
        [
            "3",
            198022430
        ],
        [
            "4",
            191154276
        ],
        [
            "5",
            180915260
        ],
        [
            "6",
            171115067
        ],
        [
            "7",
            159138663
        ],
        [
            "8",
            146364022
        ],
        [
            "9",
            141213431
        ],
        [
            "10",
            135534747
        ],
        [
            "11",
            135006516
        ],
        [
            "12",
            133851895
        ],
        [
            "13",
            115169878
        ],
        [
            "14",
            107349540
        ],
        [
            "15",
            102531392
        ],
        [
            "16",
            90354753
        ],
        [
            "17",
            81195210
        ],
        [
            "18",
            78077248
        ],
        [
            "19",
            59128983
        ],
        [
            "20",
            63025520
        ],
        [
            "21",
            48129895
        ],
        [
            "22",
            51304566
        ],
        [
            "X",
            155270560
        ],
        [
            "Y",
            59373566
        ]
    ]),
    mm9: new Map([
        [
            "1",
            197195432
        ],
        [
            "2",
            181748087
        ],
        [
            "3",
            159599783
        ],
        [
            "4",
            155630120
        ],
        [
            "5",
            152537259
        ],
        [
            "6",
            149517037
        ],
        [
            "7",
            152524553
        ],
        [
            "8",
            131738871
        ],
        [
            "9",
            124076172
        ],
        [
            "10",
            129993255
        ],
        [
            "11",
            121843856
        ],
        [
            "12",
            121257530
        ],
        [
            "13",
            120284312
        ],
        [
            "14",
            125194864
        ],
        [
            "15",
            103494974
        ],
        [
            "16",
            98319150
        ],
        [
            "17",
            95272651
        ],
        [
            "18",
            90772031
        ],
        [
            "19",
            61342430
        ],
        [
            "X",
            166650296
        ],
        [
            "Y",
            15902555
        ], 
    ]),
    mm10: new Map([
        [
            "1",
            195471971
        ],
        [
            "2",
            182113224
        ],
        [
            "3",
            160039680
        ],
        [
            "4",
            156508116
        ],
        [
            "5",
            151834684
        ],
        [
            "6",
            149736546
        ],
        [
            "7",
            145441459
        ],
        [
            "8",
            129401213
        ],
        [
            "9",
            124595110
        ],
        [
            "10",
            130694993
        ],
        [
            "11",
            122082543
        ],
        [
            "12",
            120129022
        ],
        [
            "13",
            120421639
        ],
        [
            "14",
            124902244
        ],
        [
            "15",
            104043685
        ],
        [
            "16",
            98207768
        ],
        [
            "17",
            94987271
        ],
        [
            "18",
            90702639
        ],
        [
            "19",
            61431566
        ],
        [
            "X",
            171031299
        ],
        [
            "Y",
            91744698
        ], 
    ]),
    mm39: new Map([
        [
            "1",
            195154279
        ],
        [
            "2",
            181755017
        ],
        [
            "3",
            159745316
        ],
        [
            "4",
            156860686
        ],
        [
            "5",
            151758149
        ],
        [
            "6",
            149588044
        ],
        [
            "7",
            144995196
        ],
        [
            "8",
            130127694
        ],
        [
            "9",
            124359700
        ],
        [
            "10",
            130530862
        ],
        [
            "11",
            121973369
        ],
        [
            "12",
            120092757
        ],
        [
            "13",
            120883175
        ],
        [
            "14",
            125139656
        ],
        [
            "15",
            104073951
        ],
        [
            "16",
            98008968
        ],
        [
            "17",
            95294699
        ],
        [
            "18",
            90720763
        ],
        [
            "19",
            61420004
        ],
        [
            "X",
            169476592
        ],
        [
            "Y",
            91455967
        ]
    ])
};



/**
 * Returns a linear scale to map elements in domain to elements in range.
 * @param {Array} domain array of length two containing minimum and maximum values
 * @param {Array} range array of length two containing minimum and maximum values
 * @returns linear scale mapping domain to range
 */ function $98134174e03f20c3$export$8f869025bba9609b(domain, range) {
    const domainLength = domain[1] - domain[0];
    const rangeLength = range[1] - range[0];
    const slope = rangeLength / domainLength;
    const intercept = range[1] - slope * domain[1];
    return (x)=>slope * x + intercept
    ;
}
/**
 * Maps RGB values to integer for webgl buffer.
 *
 * @param {Integer} red value from 0 to 255
 * @param {Integer} green value from 0 to 255
 * @param {Integer} blue value from 0 to 255
 * @returns RGB hex value as integer
 */ function $98134174e03f20c3$export$630e1ce5ee2d3899(red, green, blue) {
    return red << 16 | green << 8 | blue << 0;
}
function $98134174e03f20c3$export$3986fc70f318d3fa(rgb) {
    const colorVals = rgb.substring(4, rgb.length - 1).split(",");
    return $98134174e03f20c3$export$630e1ce5ee2d3899(...colorVals.map((asStr)=>parseInt(asStr)
    ));
}
function $98134174e03f20c3$export$67158240fb661780(specifier) {
    if (!isNaN(specifier)) // Specifier is already a hex value
    return Math.floor(specifier);
    const asColor = $gp9G4$color(specifier);
    return $98134174e03f20c3$export$630e1ce5ee2d3899(asColor.r, asColor.g, asColor.b);
}
/**
 * Get the VIEWPORT of the specification to be used by the mouseReader.
 * If all types for a dimension across tracks are categorical or genomic,
 * will default to [-1, 1] for that dimension for the mouseReader. If X or Y
 * has a fixed value, it will consider the width or height channel domains.
 *
 * @param {Object} specification of visualization
 * @returns [smallestX, largestX, smallestY, largestY] of viewport
 */ function $98134174e03f20c3$export$46e9b996131c895a(specification) {
    let smallestX = Number.POSITIVE_INFINITY;
    let largestX = Number.NEGATIVE_INFINITY;
    let smallestY = Number.POSITIVE_INFINITY;
    let largestY = Number.NEGATIVE_INFINITY;
    specification.tracks.forEach((track)=>{
        let xDomain = track.x.domain;
        if (!xDomain && track.x.value !== undefined && track.width.domain !== undefined) xDomain = track.width.domain;
        let yDomain = track.y.domain;
        if (!yDomain && track.y.value !== undefined && track.height && track.height.domain !== undefined) yDomain = track.height.domain;
        if (xDomain) {
            smallestX = xDomain[0] < smallestX ? xDomain[0] : smallestX;
            largestX = xDomain[1] > largestX ? xDomain[1] : largestX;
        }
        if (yDomain) {
            smallestY = yDomain[0] < smallestY ? yDomain[0] : smallestY;
            largestY = yDomain[1] > largestY ? yDomain[1] : largestY;
        }
    });
    smallestX = smallestX === Number.POSITIVE_INFINITY ? -1 : smallestX;
    largestX = largestX === Number.NEGATIVE_INFINITY ? 1 : largestX;
    smallestY = smallestY === Number.POSITIVE_INFINITY ? -1 : smallestY;
    largestY = largestY === Number.NEGATIVE_INFINITY ? 1 : largestY;
    return [
        smallestX,
        largestX,
        smallestY,
        largestY
    ];
}
/**
 * Given a specification, return a SCALE to be used for mapping data points to clip space
 * for the drawer.
 *
 * @param {String} dimension either x or y
 * @param {Object} specification for the visualization
 * @returns function which can be used to map to an "x" or "y" value
 */ const $98134174e03f20c3$export$188aed5abdcaff2f = (dimension, specification)=>{
    if (dimension !== "x" && dimension !== "y") console.error(`${dimension} is not x or y!`);
    let genomic = false;
    let genome;
    for (const track of specification.tracks)if (track[dimension].type && track[dimension].type.includes("genomic")) {
        genome = track[dimension].genome;
        genomic = true;
        break;
    }
    if (!genomic) {
        const viewport = $98134174e03f20c3$export$46e9b996131c895a(specification);
        if (dimension === "x") return $98134174e03f20c3$export$8f869025bba9609b([
            viewport[0],
            viewport[1]
        ], [
            -1,
            1
        ]);
        return $98134174e03f20c3$export$8f869025bba9609b([
            viewport[2],
            viewport[3]
        ], [
            -1,
            1
        ]);
    }
    const geneScale = $929885f8c24edae8$export$6b472c3672dd1154.completeScale(genome);
    let smallestGene = undefined;
    let smallestGeneValue = Number.POSITIVE_INFINITY;
    let largestGene = undefined;
    let largestGeneValue = Number.NEGATIVE_INFINITY;
    for (const track1 of specification.tracks){
        let xDomain = track1[dimension].domain;
        if (xDomain) {
            if (geneScale.toClipSpaceFromString(xDomain[0]) < smallestGeneValue) {
                smallestGeneValue = geneScale.toClipSpaceFromString(xDomain[0]);
                smallestGene = xDomain[0];
            }
            if (geneScale.toClipSpaceFromString(xDomain[1]) > largestGeneValue) {
                largestGeneValue = geneScale.toClipSpaceFromString(xDomain[1]);
                largestGene = xDomain[1];
            }
        }
    }
    const asScale = new $929885f8c24edae8$export$6b472c3672dd1154(genome, [
        smallestGene,
        largestGene
    ]);
    return asScale.toCallable();
};
const $98134174e03f20c3$var$RELATIVE_LENGTH_UNITS = [
    "em",
    "ex",
    "ch",
    "rem",
    "lh",
    "vw",
    "vh",
    "vmin",
    "vmax",
    "%", 
];
const $98134174e03f20c3$var$getPixelMeasurement = (cssMeasurement)=>{
    if ($98134174e03f20c3$var$RELATIVE_LENGTH_UNITS.some((unit)=>cssMeasurement.includes(unit)
    )) return false;
    const asFloat = parseFloat(cssMeasurement);
    return isNaN(asFloat) ? false : asFloat;
};
const $98134174e03f20c3$var$DEFAULT_MARGIN = "50px";
const $98134174e03f20c3$export$e188b592847fff45 = "100%";
const $98134174e03f20c3$export$f5975cfa63fb81e3 = $98134174e03f20c3$export$e188b592847fff45;
const $98134174e03f20c3$export$53e363f12e080be2 = (specification)=>{
    let toReturn = {
    };
    const calculatedMargins = {
    };
    if (specification.margins === undefined) {
        toReturn.margin = $98134174e03f20c3$var$DEFAULT_MARGIN;
        calculatedMargins.top = $98134174e03f20c3$var$DEFAULT_MARGIN;
        calculatedMargins.right = $98134174e03f20c3$var$DEFAULT_MARGIN;
        calculatedMargins.bottom = $98134174e03f20c3$var$DEFAULT_MARGIN;
        calculatedMargins.left = $98134174e03f20c3$var$DEFAULT_MARGIN;
    } else {
        calculatedMargins.top = specification.margins.top === undefined ? $98134174e03f20c3$var$DEFAULT_MARGIN : specification.margins.top;
        calculatedMargins.right = specification.margins.right === undefined ? $98134174e03f20c3$var$DEFAULT_MARGIN : specification.margins.right;
        calculatedMargins.bottom = specification.margins.bottom === undefined ? $98134174e03f20c3$var$DEFAULT_MARGIN : specification.margins.bottom;
        calculatedMargins.left = specification.margins.left === undefined ? $98134174e03f20c3$var$DEFAULT_MARGIN : specification.margins.left;
        // Shorthand for top right bottom left
        toReturn.margin = `${calculatedMargins.top}\n                       ${calculatedMargins.right}\n                       ${calculatedMargins.bottom}\n                       ${calculatedMargins.left}`;
    }
    const calculatedWidth = specification.width || $98134174e03f20c3$export$e188b592847fff45;
    const calculatedHeight = specification.height || $98134174e03f20c3$export$f5975cfa63fb81e3;
    const allMeasurements = [
        calculatedMargins.top,
        calculatedMargins.right,
        calculatedMargins.bottom,
        calculatedMargins.left,
        calculatedWidth,
        calculatedHeight, 
    ];
    if (allMeasurements.every($98134174e03f20c3$var$getPixelMeasurement)) {
        // Let's encode as a number to allow users using typescript or doing weird DOM things able to define
        // the width and height explicitly
        toReturn.width = $98134174e03f20c3$var$getPixelMeasurement(calculatedWidth) - $98134174e03f20c3$var$getPixelMeasurement(calculatedMargins.left) - $98134174e03f20c3$var$getPixelMeasurement(calculatedMargins.right);
        toReturn.height = $98134174e03f20c3$var$getPixelMeasurement(calculatedHeight) - $98134174e03f20c3$var$getPixelMeasurement(calculatedMargins.bottom) - $98134174e03f20c3$var$getPixelMeasurement(calculatedMargins.top);
    } else {
        // If user is using css units in their margins and dimensions, then use css calc
        toReturn.width = `calc(\n      ${calculatedWidth} - \n      ${calculatedMargins.left} - \n      ${calculatedMargins.right}\n    )`;
        toReturn.height = `calc(\n      ${calculatedHeight} - \n      ${calculatedMargins.top} - \n      ${calculatedMargins.bottom}\n    )`;
    }
    return toReturn;
};
/**
 * We need to calculate points on the arc for that mark type, but it needs to be quick.
 * In addition, it shouldn't be a perfect circle, and also should look somewhat arc like.
 * This utility funciton returns function that takes a value between 0 and 1 where 0 maps
 * to the first control point, and 1 maps to the third control point.
 *
 * https://math.stackexchange.com/a/1361717
 *
 * @param {Array} P0 first control point
 * @param {Array} P1 second control point
 * @param {Array} P2 third control point
 * @returns a function [0, 1] -> point on curve
 */ const $98134174e03f20c3$export$efe3e363f63f96f8 = (P0, P1, P2)=>{
    const x = (t)=>(1 - t) ** 2 * P0[0] + 2 * t * (1 - t) * P1[0] + t ** 2 * P2[0]
    ;
    const y = (t)=>(1 - t) ** 2 * P0[1] + 2 * t * (1 - t) * P1[1] + t ** 2 * P2[1]
    ;
    return (t)=>[
            x(t),
            y(t)
        ]
    ;
};






class $65b241879b1f2927$var$SVGInteractor {
    /**
   * A class used to illustrate state of the visualization on the main thread such as
   * selection or axis.
   *
   * @param {SVGElement} svg container for all svg elements
   */ constructor(svg){
        this.svg = svg;
        this.d3SVG = $gp9G4$select(this.svg);
        this.svg.style.width = "100%";
        this.svg.style.height = "100%";
        this.svg.style.position = "absolute";
        this.svg.style.zIndex = "1000";
        this.svg.style.pointerEvents = "none";
        this.svg.style.overflow = "visible";
        this._selectMarker = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        this._selectMarker.setAttribute("fill", "rgba(124, 124, 247, 0.3)");
        this._selectMarker.setAttribute("stroke", "rgb(136, 128, 247)");
        this._selectMarker.setAttribute("stroke-width", 1);
        this._selectMarker.setAttribute("stroke-dasharray", "5,5");
        this._labelMarker = document.createElementNS("http://www.w3.org/2000/svg", "g");
    }
    /**
   * Set the specification for this class to refer to.
   *
   * @param {Object} specification
   */ setSpecification(specification) {
        this.specification = specification;
        const styles = $98134174e03f20c3$export$53e363f12e080be2(specification);
        this.svg.style.width = styles.width;
        this.svg.style.height = styles.height;
        this.svg.style.margin = styles.margin;
        this.initialX = undefined; // used for updating labels
        this.initialY = undefined;
        $gp9G4$select(this._labelMarker).selectAll("*").remove();
        for (const _ of this.specification.labels || [])$gp9G4$select(this._labelMarker).append("text");
    }
    /**
   * Add svg elements to the DOM
   */ init() {
        this.svg.appendChild(this._selectMarker);
        this.svg.appendChild(this._labelMarker);
        this.xAxisAnchor = this.d3SVG.append("g");
        this.yAxisAnchor = this.d3SVG.append("g");
    }
    /**
   * Update the svg using the new viewport information
   * @param {Array} currentXRange of mousereader
   * @param {Array} currentYRange of mousereader
   * @param {Number} width of mousereader
   * @param {Number} height of mousereader
   */ updateView(currentXRange, currentYRange, width, height) {
        this.currentXRange = currentXRange;
        this.currentYRange = currentYRange;
        this.width = width;
        this.height = height;
        if (this.currentXRange) {
            this.xAxis = this._calculateAxis("x", this.specification.xAxis, this.specification, $98134174e03f20c3$export$188aed5abdcaff2f("x", this.specification), this.xAxisAnchor);
            if (this.specification.labels) this.updateLabels();
        }
        if (this.xAxis) this.xAxisAnchor.call(this.xAxis);
        if (this.currentYRange) this.yAxis = this._calculateAxis("y", this.specification.yAxis, this.specification, $98134174e03f20c3$export$188aed5abdcaff2f("y", this.specification), this.yAxisAnchor);
        if (this.yAxis) this.yAxisAnchor.call(this.yAxis);
    }
    updateLabels() {
        if (!this.initialX && this.specification.labels) this.initialX = this.specification.labels.map((label)=>this._calculateViewportSpotInverse(label.x, label.y)[0]
        );
        if (!this.initialY && this.specification.labels) this.initialY = this.specification.labels.map((label)=>this._calculateViewportSpotInverse(label.x, label.y)[1]
        );
        $gp9G4$select(this._labelMarker).selectAll("text").data(this.specification.labels).text((d)=>d.text
        ).attr("x", (d, i)=>{
            if (d.fixedX) return this.initialX[i];
            return this._calculateViewportSpotInverse(d.x, d.y)[0];
        }).attr("y", (d, i)=>{
            if (d.fixedY) return this.initialY[i];
            return this._calculateViewportSpotInverse(d.x, d.y)[1];
        }).each(function(d) {
            // Set any possible svg properties specified in label
            for(const property in d){
                if ([
                    "x",
                    "y",
                    "text"
                ].includes(property)) continue;
                $gp9G4$select(this).attr(property, d[property]);
            }
        });
    }
    _calculateAxis(dimension, orientation, specification, genomeScale, anchor) {
        let axis, domain, range;
        if (dimension === "x") {
            domain = this.currentXRange;
            range = [
                0,
                this.width
            ];
            switch(orientation){
                case "none":
                    anchor.attr("transform", `translate(-1000000, -1000000)`);
                    return null;
                case "top":
                    axis = $gp9G4$axisTop();
                    anchor.attr("transform", `translate(0, 0)`);
                    break;
                case "center":
                    axis = $gp9G4$axisBottom();
                    anchor.attr("transform", `translate(0, ${this.height / 2})`);
                    break;
                case "zero":
                    const yScale = $gp9G4$scaleLinear().domain(this.currentYRange).range([
                        this.height,
                        0
                    ]);
                    axis = $gp9G4$axisBottom();
                    anchor.attr("transform", `translate(0, ${yScale(0)})`);
                    break;
                case "bottom":
                default:
                    axis = $gp9G4$axisBottom();
                    anchor.attr("transform", `translate(0, ${this.height})`);
                    break;
            }
        }
        if (dimension === "y") {
            domain = this.currentYRange;
            range = [
                this.height,
                0
            ];
            switch(orientation){
                case "none":
                    anchor.attr("transform", `translate(-1000000, -1000000)`);
                    return null;
                case "center":
                    axis = $gp9G4$axisRight();
                    anchor.attr("transform", `translate(${this.width / 2}, 0)`);
                    break;
                case "right":
                    axis = $gp9G4$axisRight();
                    anchor.attr("transform", `translate(${this.width}, 0)`);
                    break;
                case "zero":
                    const xScale = $gp9G4$scaleLinear().domain(this.currentXRange).range([
                        0,
                        this.width
                    ]);
                    axis = $gp9G4$axisLeft();
                    anchor.attr("transform", `translate(${xScale(0)}, 0)`);
                    break;
                case "left":
                default:
                    axis = $gp9G4$axisLeft();
                    anchor.attr("transform", `translate(0, 0)`);
                    break;
            }
        }
        let genomic = false;
        for (const track of specification.tracks)if (track[dimension].type && track[dimension].type.includes("genomic")) genomic = true;
        if (!genomic) return axis.scale($gp9G4$scaleLinear().domain(domain).range(range));
        let tickInfo;
        if (dimension === "x") tickInfo = genomeScale.getTickCoordsAndLabels(domain[0], domain[1]);
        else tickInfo = genomeScale.getTickCoordsAndLabels(range[0], range[1]);
        return axis.scale($gp9G4$scaleLinear().domain(domain).range(range)).tickValues(tickInfo.tickCoords).tickFormat((_, index)=>tickInfo.tickLabels[index]
        );
    }
    /**
   * Updates user selection view if they have selected a box
   */ _updateBoxSelectView(points) {
        if (points.length !== 4) return;
        const topLeftCorner = this._calculateViewportSpotInverse(points[0], points[1]);
        const bottomRightCorner = this._calculateViewportSpotInverse(points[2], points[3]);
        let pointAttr = `${topLeftCorner[0]},${topLeftCorner[1]} \n                     ${topLeftCorner[0]},${bottomRightCorner[1]}, \n                     ${bottomRightCorner[0]},${bottomRightCorner[1]}\n                     ${bottomRightCorner[0]},${topLeftCorner[1]}\n                     `;
        this._selectMarker.setAttribute("points", pointAttr);
    }
    /**
   * Update the selection box/lasso with the points as bounds
   *
   * @param {Array} points 1D array of coordinates that are used for selection ex. [x1,y1,x2,y2,...]
   */ updateSelectView(points) {
        if (points.length === 4) {
            this._updateBoxSelectView(points);
            return;
        }
        if (points.length < 6) {
            this._selectMarker.setAttribute("points", "");
            return;
        }
        let pointAttr = "";
        for(let i = 0; i < points.length; i += 2){
            const asCanvasPoint = this._calculateViewportSpotInverse(points[i], points[i + 1]);
            pointAttr += `${asCanvasPoint[0]}, ${asCanvasPoint[1]} `;
        }
        this._selectMarker.setAttribute("points", pointAttr);
    }
    /**
   * Calculate the location on the canvas a real coordniate corresponds to.
   *
   * @param {Float} viewportX x coordinate of data space
   * @param {Float} viewportY y coordniate of data space
   * @returns canvas coordindate as array
   */ _calculateViewportSpotInverse(viewportX, viewportY) {
        const inverseScaleX = $98134174e03f20c3$export$8f869025bba9609b(this.currentXRange, [
            0,
            this.width
        ]);
        // Flipped for Y since canvas using typical graphics coordinates but GPU clipspace is typical cartesian coordinates
        const inverseScaleY = $98134174e03f20c3$export$8f869025bba9609b(this.currentYRange, [
            this.height,
            0
        ]);
        return [
            inverseScaleX(viewportX),
            inverseScaleY(viewportY)
        ];
    }
}
var $65b241879b1f2927$export$9099ad97b570f7c = $65b241879b1f2927$var$SVGInteractor;


/**
 * event.layerX and event.layerY are deprecated. We will use them if they are on the event, but
 * if not we will use a manual calculation.
 *
 * @param {Event} event
 * @returns layerX and layerY, coordinates of event with origin at top right corner of bounding box
 */ const $48f1af01a0b6da37$var$getLayerXandYFromEvent = (event)=>{
    if (event.layerX !== undefined && event.layerY !== undefined) return [
        event.layerX,
        event.layerY
    ];
    const bbox = event.target.getBoundingClientRect();
    const x = event.clientX - bbox.left;
    const y = event.clientY - bbox.top;
    return [
        x,
        y
    ];
};
class $48f1af01a0b6da37$var$MouseReader {
    /**
   *
   * @param {HTMLElement} element meant to read mouse events, necessary since OffscreenCanvas cannot read DOM events
   * @param {WebGLVis} handler WebGLVis that is using this mousereader
   */ constructor(element, handler){
        this.element = element;
        this.element.style.position = "absolute";
        this.element.style.width = "100%";
        this.element.style.height = "100%";
        this.handler = handler;
        this._currentSelectionPoints = [];
        this.tool = "pan";
        // Initializing elements to show user their current selection
        this.SVGInteractor = new $65b241879b1f2927$export$9099ad97b570f7c(document.createElementNS("http://www.w3.org/2000/svg", "svg"));
    }
    /**
   * Set the specification of the mouse reader and the svg interaction
   * @param {Object} specification
   */ setSpecification(specification) {
        const styles = $98134174e03f20c3$export$53e363f12e080be2(specification);
        this.element.style.width = styles.width;
        this.element.style.height = styles.height;
        this.element.style.margin = styles.margin;
        this.viewport = $98134174e03f20c3$export$46e9b996131c895a(specification);
        this.SVGInteractor.setSpecification(specification);
        this._updateSVG();
    }
    /**
   * Set the viewport in the format mouseReader.viewport = [minX, maxX, minY, maxY].
   * Mostly used to make WebGLVis.setViewOptions simpler.
   */ set viewport(toSet) {
        this.minX = toSet[0];
        this.maxX = toSet[1];
        this.minY = toSet[2];
        this.maxY = toSet[3];
        this.currentXRange = [
            this.minX,
            this.maxX
        ];
        this.currentYRange = [
            this.minY,
            this.maxY
        ];
    }
    /**
   * Init the mouse reader by adding its elements to DOM and adding event handlers
   */ init() {
        this.width = this.element.clientWidth;
        this.height = this.element.clientHeight;
        this.element.parentElement.appendChild(this.SVGInteractor.svg);
        this.SVGInteractor.init();
        this._updateSVG();
        this.element.addEventListener("wheel", this._onWheel.bind(this), false);
        let mouseDown = false;
        this.element.addEventListener("mousedown", (event)=>{
            mouseDown = true;
            switch(this.tool){
                case "pan":
                    break;
                case "box":
                case "lasso":
                    this._currentSelectionPoints = [
                        ...this._calculateViewportSpot(...$48f1af01a0b6da37$var$getLayerXandYFromEvent(event)), 
                    ];
                    break;
            }
        }, false);
        this.element.addEventListener("mousemove", (event)=>{
            if (!mouseDown) return;
            switch(this.tool){
                case "pan":
                    this._onPan(event);
                    break;
                case "box":
                    this._currentSelectionPoints = this._currentSelectionPoints.slice(0, 2).concat(this._calculateViewportSpot(...$48f1af01a0b6da37$var$getLayerXandYFromEvent(event)));
                    this.element.parentElement.dispatchEvent(new CustomEvent("onSelection", {
                        detail: {
                            bounds: this._currentSelectionPoints,
                            type: this.tool
                        }
                    }));
                    break;
                case "lasso":
                    this._currentSelectionPoints.push(...this._calculateViewportSpot(...$48f1af01a0b6da37$var$getLayerXandYFromEvent(event)));
                    this.element.parentElement.dispatchEvent(new CustomEvent("onSelection", {
                        detail: {
                            bounds: this._currentSelectionPoints,
                            type: this.tool
                        }
                    }));
                    break;
                case "tooltip":
                    break;
            }
            this._updateSVG();
        }, false);
        this.element.addEventListener("mouseup", (event)=>{
            mouseDown = false;
            switch(this.tool){
                case "pan":
                    break;
                case "box":
                    if (this._currentSelectionPoints.length !== 4) {
                        this._currentSelectionPoints = [];
                        return;
                    }
                    this._onSelect();
                    break;
                case "lasso":
                    if (this._currentSelectionPoints.length < 6) {
                        this._currentSelectionPoints = [];
                        this._updateSVG();
                        return;
                    }
                    this._onSelect();
                    break;
            }
        });
        this.element.addEventListener("mouseleave", ()=>{
            switch(this.tool){
                case "pan":
                    mouseDown = false;
                    break;
                case "box":
                    break;
                case "lasso":
                    break;
                case "tooltip":
                    break;
            }
        });
    }
    /**
   * Get current viewport info such as min/max bounds and current ranges
   *
   * @returns Current viewport information the mouse reader has calculated
   */ getViewport() {
        return {
            minX: this.minX,
            maxX: this.maxX,
            minY: this.minY,
            maxY: this.maxY,
            xRange: this.currentXRange,
            yRange: this.currentYRange
        };
    }
    /**
   * Method to handle wheel events for zooming in and out of canvas
   *
   * @param {WheelEvent} event
   */ _onWheel(event) {
        event.preventDefault();
        if (!this.lockedX) {
            const previousX = [
                ...this.currentXRange
            ]; // ... to avoid aliasing
            const t = -event.wheelDelta / 1000;
            const inDataSpace = this._calculateViewportSpot(...$48f1af01a0b6da37$var$getLayerXandYFromEvent(event));
            this.currentXRange[0] = t * inDataSpace[0] + (1 - t) * this.currentXRange[0];
            this.currentXRange[1] = t * inDataSpace[0] + (1 - t) * this.currentXRange[1];
            this.currentXRange[0] = Math.max(this.currentXRange[0], this.minX);
            this.currentXRange[1] = Math.min(this.currentXRange[1], this.maxX);
            if (!this._validateXRange()) // Zoom in limit
            this.currentXRange = previousX;
        }
        if (!this.lockedY) {
            const previousY = [
                ...this.currentYRange
            ];
            const t = -event.wheelDelta / 1000;
            const inDataSpace = this._calculateViewportSpot(...$48f1af01a0b6da37$var$getLayerXandYFromEvent(event));
            this.currentYRange[0] = t * inDataSpace[1] + (1 - t) * this.currentYRange[0];
            this.currentYRange[1] = t * inDataSpace[1] + (1 - t) * this.currentYRange[1];
            this.currentYRange[0] = Math.max(this.currentYRange[0], this.minY);
            this.currentYRange[1] = Math.min(this.currentYRange[1], this.maxY);
            if (!this._validateYRange()) // Zoom in limit
            this.currentYRange = previousY;
        }
        this.element.parentElement.dispatchEvent(new CustomEvent(event.wheelDelta < 0 ? "zoomIn" : "zoomOut", {
            detail: {
                viewport: this.getViewport(),
                type: this.tool
            }
        }));
        this.handler.sendDrawerState(this.getViewport());
        this._updateSVG();
    }
    /**
   * Method to handle a clicked mouse moving around canvas to pan around canvas.
   *
   * @param {MouseEvent} event from "mousemove" event
   */ _onPan(event) {
        if (!this.lockedX) {
            const previousX = [
                ...this.currentXRange
            ]; // ... to avoid aliasing
            const xDampen = (this.currentXRange[1] - this.currentXRange[0]) / 1000;
            this.currentXRange[0] -= event.movementX * xDampen;
            this.currentXRange[1] -= event.movementX * xDampen;
            this.currentXRange[0] = Math.max(this.currentXRange[0], this.minX);
            this.currentXRange[1] = Math.min(this.currentXRange[1], this.maxX);
            if (!this._validateXRange()) this.currentXRange = previousX;
        }
        if (!this.lockedY) {
            const previousY = [
                ...this.currentYRange
            ];
            const yDampen = (this.currentYRange[1] - this.currentYRange[0]) / 1000;
            this.currentYRange[0] += event.movementY * yDampen;
            this.currentYRange[1] += event.movementY * yDampen;
            this.currentYRange[0] = Math.max(this.currentYRange[0], this.minY);
            this.currentYRange[1] = Math.min(this.currentYRange[1], this.maxY);
            if (!this._validateYRange()) this.currentYRange = previousY;
        }
        this.element.parentElement.dispatchEvent(new CustomEvent("pan", {
            detail: {
                viewport: this.getViewport(),
                type: this.tool
            }
        }));
        this.handler.sendDrawerState(this.getViewport());
        this._updateSVG();
    }
    /**
   * Checks if this.currentXRange is valid with first element less than second
   * and if viewport zoom is not above webgl max zoom.
   *
   * @return true if range is valid, false otherwise
   */ _validateXRange() {
        return this.currentXRange[1] >= this.currentXRange[0];
    }
    /**
   * Checks if this.currentYRange is valid with first element less than second
   * and if viewport zoom is not above webgl max zoom.
   *
   * @return true if range is valid, false otherwise
   */ _validateYRange() {
        return this.currentYRange[1] >= this.currentYRange[0];
    }
    /**
   * Updates the DOM component used to show user selection or axis.
   * Calls methods from SVGInteractor.
   */ _updateSVG() {
        this.SVGInteractor.updateView(this.currentXRange, this.currentYRange, this.width, this.height);
        this.SVGInteractor.updateSelectView(this._currentSelectionPoints);
    }
    /**
   * Executes when user has confirmed selection points (typically by releasing mouse)
   */ _onSelect() {
        this.handler.selectPoints(this._currentSelectionPoints);
    }
    /**
   * Calculate the location on the real coordinate space a point on the canvas corresponds to.
   *
   * @param {Float} canvasX likely from event.layerX or getLayerXandYFromEvent
   * @param {Float} canvasY likely from event.layerY or getLayerXandYFromEvent
   * @returns viewport coordinate as array
   */ _calculateViewportSpot(canvasX, canvasY) {
        const scaleX = $98134174e03f20c3$export$8f869025bba9609b([
            0,
            this.width
        ], this.currentXRange);
        // Flipped for Y since canvas using typical graphics coordinates but GPU clipspace is typical cartesian coordinates
        const scaleY = $98134174e03f20c3$export$8f869025bba9609b([
            this.height,
            0
        ], this.currentYRange);
        return [
            scaleX(canvasX),
            scaleY(canvasY)
        ];
    }
}
var $48f1af01a0b6da37$export$9099ad97b570f7c = $48f1af01a0b6da37$var$MouseReader;



var $5f252a94eea5dbd0$exports = {};
$5f252a94eea5dbd0$exports = JSON.parse("{\"schema\":\"https://json-schema.org/draft/2020-12/schema\",\"id\":\"/visualization\",\"title\":\"Visualization\",\"description\":\"A webgl visualization made of a sequence of tracks\",\"type\":\"object\",\"required\":[\"tracks\"],\"properties\":{\"labels\":{\"description\":\"set of labels to display on visualization, properties of labels can be any valid attribute for an svg text element\",\"examples\":[{\"x\":100,\"y\":200,\"text\":\"my favorite data point\",\"rotate\":-90},{\"x\":-1.1,\"y\":0,\"text\":\"Track 1\",\"color\":\"red\",\"fixedX\":true}],\"type\":\"array\",\"items\":{\"properties\":{\"x\":{\"description\":\"x coordinate of label with respect to data coordinates, should be on scale with [-1, 1] if x dimension is categorical or genomic\",\"type\":\"number\"},\"y\":{\"description\":\"y coordinate of label with respect to data coordinates, should be on scale with [-1, 1] if y dimension is categorical or genomic\",\"type\":\"number\"},\"fixedX\":{\"description\":\"fix the x coordinate of the label, so it does not move when panning/zooming left or right\",\"type\":\"boolean\"},\"fixedY\":{\"description\":\"fix the y coordinate of the label, so it does not move when panning/zooming up or down\",\"type\":\"boolean\"},\"required\":[\"x\",\"y\"]}}},\"xAxis\":{\"description\":\"location of x-axis\",\"enum\":[\"bottom\",\"top\",\"center\",\"none\",\"zero\"]},\"yAxis\":{\"description\":\"location of y-axis\",\"enum\":[\"left\",\"right\",\"center\",\"none\",\"zero\"]},\"tracks\":{\"description\":\"A track is a map from the data to a sequence of marks\",\"type\":\"array\",\"items\":{\"$ref\":\"/track\"}},\"defaultData\":{\"description\":\"A string of a csv href containing data or an object of inline data where each key is a column of values\",\"examples\":[\"http://example.com/data.csv\",{\"day\":[1,2],\"price\":[10,20]}],\"type\":[\"string\",\"object\"],\"additionalProperties\":{\"type\":\"array\"},\"minProperties\":1},\"width\":{\"description\":\"Width of the visualization in css units\",\"examples\":[\"400px\",\"100%\",\"10em\",\"600\"],\"type\":\"string\"},\"height\":{\"description\":\"Height of the visualization in css units\",\"examples\":[\"400px\",\"100%\",\"10em\",\"600\"],\"type\":\"string\"},\"margins\":{\"description\":\"Margins for the visualization; gives more space for labels and axis to render\",\"properties\":{\"top\":{\"description\":\"Top margin of the visualization in css units\",\"type\":\"string\",\"examples\":[\"100px\",\"5%\",\"5em\"]},\"bottom\":{\"description\":\"Bottom margin of the visualization in css units\",\"type\":\"string\",\"examples\":[\"100px\",\"5%\",\"5em\"]},\"left\":{\"description\":\"Left margin of the visualization in css units\",\"type\":\"string\",\"examples\":[\"100px\",\"5%\",\"5em\"]},\"right\":{\"description\":\"Right margin of the visualization in css units\",\"type\":\"string\",\"examples\":[\"100px\",\"5%\",\"5em\"]}}}},\"allOf\":[{\"description\":\"if there is no default data for the visualization require each track to have data property\",\"if\":{\"not\":{\"required\":[\"defaultData\"]}},\"then\":{\"properties\":{\"tracks\":{\"items\":{\"required\":[\"data\"]}}}},\"else\":{}}]}");


var $fe889fef5aa89d36$exports = {};
$fe889fef5aa89d36$exports = JSON.parse("{\"schema\":\"https://json-schema.org/draft/2020-12/schema\",\"id\":\"/track\",\"title\":\"Track\",\"description\":\"A track to visualize\",\"type\":\"object\",\"required\":[\"mark\",\"x\",\"y\"],\"properties\":{\"data\":{\"description\":\"A string of a csv href containing data or an object of inline data where each key is an array of a data column\",\"type\":[\"string\",\"object\"],\"additionalProperties\":{\"type\":\"array\"},\"minProperties\":1},\"mark\":{\"description\":\"type of mark to visualize\",\"enum\":[\"point\",\"line\",\"area\",\"rect\",\"tick\",\"arc\"]},\"tooltips\":{\"description\":\"a number between 0 and 1 where 0 is no tooltips, 1 is always show, and, for example, 0.1 would be show tooltips when zoomed in to 10% of the domain\",\"type\":\"number\",\"minimum\":0,\"maximum\":1},\"x\":{\"description\":\"define the x coordinates of the marks\",\"type\":\"object\",\"allOf\":[{\"$ref\":\"/channel\"}],\"examples\":[{\"type\":\"genomic\",\"chrAttribute\":\"chr\",\"geneAttribute\":\"gene\",\"domain\":[\"chr2:100\",\"chr2:300\"]}]},\"y\":{\"description\":\"define the y coordinates of the marks\",\"type\":\"object\",\"allOf\":[{\"$ref\":\"/channel\"}],\"examples\":[{\"type\":\"quantitative\",\"attribute\":\"time\",\"domain\":[0,10]},{\"attribute\":\"sample\",\"type\":\"categorical\",\"cardinality\":10}]},\"color\":{\"description\":\"define the color of the marks, for fixed values can be any css3 color descriptor or a number that translates to a color in hex\",\"type\":\"object\",\"properties\":{\"colorScheme\":{\"description\":\"d3 continuous color scheme to use, see d3-scale-chromatic for options\",\"examples\":[\"interpolateBlues\",\"interpolateReds\",\"interpolateRainbow\"],\"type\":\"string\"}},\"examples\":[{\"value\":\"red\"},{\"value\":16581375},{\"attribute\":\"sample\",\"type\":\"categorical\",\"cardinality\":10,\"colorScheme\":\"interpolateBuGn\"}],\"allOf\":[{\"$ref\":\"/channel\"}]},\"size\":{\"description\":\"size of the mark, used only when mark type is point, use width or height for other mark types. The units of this channel correspond to 1/200th of the canvas e.g. a size of 100 is half the canvas.\",\"type\":\"object\",\"properties\":{\"maxSize\":{\"type\":\"number\"},\"minSize\":{\"type\":\"number\"},\"value\":{\"type\":\"number\"}},\"examples\":[{\"attribute\":\"population\",\"type\":\"quantitative\",\"domain\":[0,1000],\"maxSize\":10,\"minSize\":1}],\"allOf\":[{\"$ref\":\"/channel\"}]},\"width\":{\"description\":\"width of the mark, used for rect, arc, and tick marks only. The units of this channel correspond to 1/200th of the width of the canvas. This channel may be a genomic range type for arc tracks. If both height and width are specified for a tick mark, only width is used.\",\"type\":\"object\",\"properties\":{\"maxWidth\":{\"type\":\"number\"},\"minWidth\":{\"type\":\"number\"},\"value\":{\"type\":\"number\"}},\"allOf\":[{\"$ref\":\"/channel\"}]},\"height\":{\"description\":\"height of the mark, used for rect, arc, and tick marks only. The units of this channel correspond to 1/200th of the height of the canvas. This channel may be a genomic range type for arc tracks.\",\"type\":\"object\",\"properties\":{\"maxHeight\":{\"type\":\"number\"},\"minHeight\":{\"type\":\"number\"},\"value\":{\"type\":\"number\"}},\"allOf\":[{\"$ref\":\"/channel\"}]},\"opacity\":{\"description\":\"opacity of the mark, compatible with all mark types\",\"type\":\"object\",\"properties\":{\"minOpacity\":{\"type\":\"number\",\"minimum\":0,\"exclusiveMaximum\":1},\"value\":{\"type\":\"number\"}},\"allOf\":[{\"$ref\":\"/channel\"}]},\"shape\":{\"description\":\"shape of the mark, used only for point marks\",\"type\":\"object\",\"properties\":{\"value\":{\"enum\":[\"dot\",\"circle\",\"diamond\",\"triangle\"]}},\"allOf\":[{\"$ref\":\"/channel\"}]}}}");


var $8e12f4252e34460f$exports = {};
$8e12f4252e34460f$exports = JSON.parse("{\"schema\":\"https://json-schema.org/draft/2020-12/schema\",\"id\":\"/channel\",\"title\":\"Channel\",\"description\":\"A channel of a visualization\",\"type\":\"object\",\"properties\":{\"type\":{\"description\":\"type of attribute, genomic range only compatible with x, y, width and height\",\"enum\":[\"quantitative\",\"categorical\",\"genomic\",\"genomicRange\",\"inline\"]},\"attribute\":{\"description\":\"column of data frame to use for mapping channel\",\"type\":\"string\"},\"value\":{\"description\":\"if fixing a channel, specify with value\",\"type\":[\"string\",\"number\",\"boolean\"]},\"domain\":{\"description\":\"domain of attribute to use for mapping, required if type is quantitative\",\"type\":\"array\"},\"cardinality\":{\"description\":\"number of attribute values to use for mapping, required if type is categorical\",\"type\":\"integer\"},\"chrAttribute\":{\"description\":\"if type is genomic or genomicRange, the attribute that contains the chromosome id\",\"type\":\"string\"},\"startAttribute\":{\"description\":\"if type is genomicRange, the attribute that contains the start of the range\",\"type\":\"string\"},\"endAttribute\":{\"description\":\"if type is genomicRange, the attribute that contains the end of the range\",\"type\":\"string\"},\"genome\":{\"description\":\"genome being mapped\",\"enum\":[\"hg38\",\"hg19\",\"mm39\"]}},\"allOf\":[{\"description\":\"If type is genomic, require genomic attributes and forbid regular attributes\",\"anyOf\":[{\"not\":{\"properties\":{\"type\":{\"const\":\"genomic\"}},\"required\":[\"type\"]}},{\"required\":[\"chrAttribute\",\"geneAttribute\",\"genome\"],\"not\":{\"required\":[\"attribute\",\"startAttribute\",\"endAttribute\"]},\"properties\":{\"domain\":{\"items\":[{\"type\":\"string\",\"pattern\":\"chr(\\\\d{1,2}|[XY]):\\\\d+\"},{\"type\":\"string\",\"pattern\":\"chr(\\\\d{1,2}|[XY]):\\\\d+\"}]}}}]},{\"description\":\"If type is genomicRange, require genomicRange attributes and forbid regular attribute\",\"anyOf\":[{\"not\":{\"properties\":{\"type\":{\"const\":\"genomicRange\"}},\"required\":[\"type\"]}},{\"required\":[\"chrAttribute\",\"startAttribute\",\"endAttribute\",\"genome\"],\"not\":{\"required\":[\"attribute\",\"geneAttribute\"]},\"properties\":{\"domain\":{\"items\":[{\"type\":\"string\",\"pattern\":\"chr(\\\\d{1,2}|[XY]):\\\\d+\"},{\"type\":\"string\",\"pattern\":\"chr(\\\\d{1,2}|[XY]):\\\\d+\"}]}}}]},{\"description\":\"If type is quantitative, require domain and forbid cardinality\",\"anyOf\":[{\"not\":{\"properties\":{\"type\":{\"const\":\"quantitative\"}},\"required\":[\"type\"]}},{\"required\":[\"domain\"],\"properties\":{\"domain\":{\"items\":[{\"type\":\"number\"},{\"type\":\"number\"}]}},\"not\":{\"required\":[\"cardinality\"]}}]},{\"description\":\"If type is categorical, require cardinality and forbid domain\",\"anyOf\":[{\"not\":{\"properties\":{\"type\":{\"const\":\"categorical\"}},\"required\":[\"type\"]}},{\"required\":[\"cardinality\"],\"not\":{\"required\":[\"domain\"]}}]},{\"description\":\"If value is defined, disallow other attributes\",\"anyOf\":[{\"not\":{\"properties\":{\"value\":{\"not\":{\"type\":\"null\"}}},\"required\":[\"value\"]}},{\"allOf\":[{\"not\":{\"required\":[\"attribute\"]}},{\"not\":{\"required\":[\"type\"]}},{\"not\":{\"required\":[\"domain\"]}},{\"not\":{\"required\":[\"cardinality\"]}}]}]},{\"description\":\"If value is not defined, require attribute or genomic attributes\",\"anyOf\":[{\"not\":{\"properties\":{\"value\":{\"type\":\"null\"}}}},{\"oneOf\":[{\"required\":[\"attribute\"]},{\"required\":[\"chrAttribute\",\"genome\"]}]}]}]}");


const $b2dd1252a54684ac$var$v = new $gp9G4$Validator();
$b2dd1252a54684ac$var$v.addSchema((/*@__PURE__*/$parcel$interopDefault($8e12f4252e34460f$exports)), "/channel");
$b2dd1252a54684ac$var$v.addSchema((/*@__PURE__*/$parcel$interopDefault($fe889fef5aa89d36$exports)), "/track");
/**
 * Utility method that returns a boolean on whether the json is a valid specification.
 * console.errors the reason if it is not.
 * @param {Object} json specification
 * @returns boolean
 */ const $b2dd1252a54684ac$var$isJSONValid = (json)=>{
    const validation = $b2dd1252a54684ac$var$v.validate(json, (/*@__PURE__*/$parcel$interopDefault($5f252a94eea5dbd0$exports)));
    if (!validation.valid) console.error(validation.errors);
    return validation.valid;
};
var $b2dd1252a54684ac$export$9099ad97b570f7c = $b2dd1252a54684ac$var$isJSONValid;



class $6fdb274436ae1079$var$WebGLVis {
    POSSIBLE_MOUSE_READER_OPTIONS = Object.freeze([
        "lockedX",
        "lockedY",
        "tool",
        "viewport",
        "currentXRange",
        "currentYRange", 
    ]);
    /**
   * A class meant to display a visualization based off a given specification using webgl.
   *
   * @param {HTMLElement} container <div> or other container element meant to contain the visualization and its mousereader
   */ constructor(container){
        this.container = container;
        this.mouseReader = new $48f1af01a0b6da37$export$9099ad97b570f7c(document.createElement("div"), this);
        this.parent = document.createElement("div");
        this.parent.style.position = "relative";
        this.parent.style.overflow = "hidden";
        this.canvas = document.createElement("canvas");
        this.canvas.style.position = "absolute";
    }
    /**
   * Resize the canvas to a particular size and rerender the data
   *
   * @param {Number} width in pixels to resize the canvas to
   * @param {Number} height in pixels to resize the canvas to
   */ setCanvasSize(width, height) {
        this.webglWorker.postMessage({
            type: "resize",
            width: width,
            height: height
        });
        this.canvas.style.width = width;
        this.canvas.style.height = height;
        this.mouseReader.width = width;
        this.mouseReader.height = height;
        this.sendDrawerState(this.mouseReader.getViewport());
    }
    /**
   * This method does three things, and should only be called once. If changing the specification
   * use setSpecification.
   *  1. Add the canvas and mousereader to the DOM for use.
   *  2. Creates the WebWorkers that render and process the data.
   *  3. Exposes the messages the webworkers send back to the main thread under this.dataWorkerStream
   *
   * @param {Boolean} displayFPSMeter whether or not to display an fps meter
   */ addToDom(displayFPSMeter) {
        this.container.appendChild(this.parent);
        this.parent.appendChild(this.canvas);
        this.parent.appendChild(this.mouseReader.element);
        if (displayFPSMeter) this.initFpsmeter();
        const offscreenCanvas = this.canvas.transferControlToOffscreen();
        this.webglWorker = new Worker(new URL("offscreen-webgl-worker.ccb65adf.js", import.meta.url), {
            type: "module"
        });
        this.webglWorker.postMessage({
            type: "init",
            canvas: offscreenCanvas,
            displayFPSMeter: displayFPSMeter
        }, [
            offscreenCanvas
        ]);
        // Allow OffScreenWebGLDrawer to tick FPS meter
        this.webglWorker.onmessage = (e)=>{
            if (e.data.type === "tick") this.meter.tick();
        };
        this.dataWorkerStream = [];
        this.dataWorker = new Worker(new URL("data-processor-worker.f54163b0.js", import.meta.url), {
            type: "module"
        });
        this.dataWorker.onmessage = (message)=>{
            this.dataWorkerStream.push(message);
            this.parent.dispatchEvent(new CustomEvent("onSelectionEnd", {
                detail: message
            }));
            console.log(this.dataWorkerStream);
        };
        // Needs to be called at the end of addToDOM so mouseReader has correct dimensions to work with
        this.mouseReader.init();
    }
    /**
   * The main method for changing the state of the visualization, such as active tool,
   * viewport, locking axis, or changing the zoom.
   *
   * The format of the options:
   *   lockedX: boolean
   *   lockedY: boolean
   *   viewport: [minX, maxX, minY, maxY] (all Numbers)
   *   currentXRange: [x1, x2] (Numbers that should be within the viewport minX and maxX)
   *   currentYRange: [y1, y2] (Numbers that should be within the viewport minY and maxY)
   *   tool: one of ["pan", "box", "lasso"]
   *
   * @param {Object} options with keys under WebGLVis.POSSIBLE_MOUSE_READER_OPTIONS
   */ setViewOptions(options) {
        for (const option of this.POSSIBLE_MOUSE_READER_OPTIONS)if (option in options) this.mouseReader[option] = options[option];
        this.sendDrawerState(this.mouseReader.getViewport());
    }
    _setMargins(specification) {
        const styles = $98134174e03f20c3$export$53e363f12e080be2(specification);
        this.parent.style.width = specification.width || $98134174e03f20c3$export$e188b592847fff45;
        this.parent.style.height = specification.height || $98134174e03f20c3$export$f5975cfa63fb81e3;
        this.canvas.style.width = styles.width;
        this.canvas.style.height = styles.height;
        this.canvas.style.margin = styles.margin;
        if (isNaN(styles.width) || isNaN(styles.height)) {
            // Using css calc
            const canvasBox = this.canvas.getBoundingClientRect();
            this.setCanvasSize(canvasBox.width, canvasBox.height);
        } else this.setCanvasSize(styles.width, styles.height);
    }
    /**
   * Set the specification of the visualization, and then render it.
   *
   * @param {Object} specification describing visualization
   * @returns boolean on whether the specification was accepted
   */ setSpecification(specification) {
        if (!$b2dd1252a54684ac$export$9099ad97b570f7c(specification)) return false;
        this._setMargins(specification);
        this.mouseReader.setSpecification(specification);
        this.sendDrawerState(this.mouseReader.getViewport());
        this.webglWorker.postMessage({
            type: "specification",
            specification: specification
        });
        this.dataWorker.postMessage({
            type: "init",
            specification: specification
        });
        return true;
    }
    /**
   * Send the viewport to the drawer. Use setViewOptions to change the viewport.
   *
   * @param {Object} viewport likely from this.mouseReader.getViewport()
   */ sendDrawerState(viewport) {
        this.webglWorker.postMessage({
            type: "viewport",
            ...viewport
        });
    }
    /**
   * Calls render in the drawer.
   */ forceDrawerRender() {
        this.webglWorker.postMessage({
            type: "render",
            ...this.mouseReader.getViewport()
        });
    }
    /**
   * Utility method to have data worker call {@link DataProcessor#selectBox} or
   * {@link DataProcessor#selectLasso}.
   *
   * Does not return, posts result to this.dataWorkerStream.
   * @param {Array} points array in format [x1,y1,x2,y2,x3,y3,...]
   *  if points.length == 4, does a box select, if points.length >= 6 does a lasso select
   *    using points as a polygon
   */ selectPoints(points) {
        if (points.length === 4) this.dataWorker.postMessage({
            type: "selectBox",
            points: points
        });
        else if (points.length >= 6) this.dataWorker.postMessage({
            type: "selectLasso",
            points: points
        });
    }
    /**
   * Utility method to have data worker call {@link DataProcessor#getClosestPoint}.
   * Does not return, posts result to this.dataWorkerStream.
   *
   * @param {Array} point to get closest point to
   */ getClosestPoint(point) {
        this.dataWorker.postMessage({
            type: "getClosestPoint",
            point: point
        });
    }
    /**
   * Initializes the FPS meter.
   */ initFpsmeter() {
        this.meter = new window.FPSMeter(document.querySelector("footer"), {
            graph: 1,
            heat: 1,
            theme: "light",
            history: 25,
            top: "-20px",
            left: `100px`,
            transform: "translateX(-100%)"
        });
    }
    /**
   * Adds an event listener to visualization on the appropriate component.
   * Current event types that are supported are
   * "zoomIn": fires when user zooms in
   * "zoomOut": fires when user zooms out
   * "pan": fires when user pans
   * "onSelection": fires while user is changing the selection box/lasso
   * "onSelectionEnd": fires when a selection has been completed and the results are in the dataWorkerStream
   *
   * For information on the parameters and functionality see:
   *   https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
   *
   * @param {String} type
   * @param {Function} listener
   * @param {Object} options
   */ addEventListener(type, listener, options) {
        this.parent.addEventListener(type, listener, options);
    }
}
var $6fdb274436ae1079$export$9099ad97b570f7c = $6fdb274436ae1079$var$WebGLVis;


var $fd0e4966f38fc4e4$export$9099ad97b570f7c = $6fdb274436ae1079$export$9099ad97b570f7c;


export {$fd0e4966f38fc4e4$export$9099ad97b570f7c as default};
//# sourceMappingURL=main.js.map
