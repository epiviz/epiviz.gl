function $parcel$export(e, n, v) {
  Object.defineProperty(e, n, {
    get: v,
    enumerable: true
  });
}
// ASSET: src/epiviz.gl/schema-processor.js
var $a482b49601c034373694faa8888ffe15$exports = {};
// ASSET: src/epiviz.gl/utilities.js
var $ab472fc72a52ba79515db0c00f4f687a$exports = {};
// ASSET: src/epiviz.gl/genome-sizes.js
var $3ebbd6da2f6dbbd2ea0ba22bdc176caf$exports = {};
var $44fb33f33a3822970af32be817e1e34b$export$default = function (x) {
  return Math.abs(x = Math.round(x)) >= 1e21 ? x.toLocaleString("en").replace(/,/g, "") : x.toString(10);
};
// Computes the decimal coefficient and exponent of the specified number x with
// significant digits p, where x is positive and p is in [1, 21] or undefined.
// For example, formatDecimalParts(1.23) returns ["123", 0].
function $44fb33f33a3822970af32be817e1e34b$export$formatDecimalParts(x, p) {
  if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null;
  // NaN, ±Infinity
  var i, coefficient = x.slice(0, i);
  // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
  // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).
  return [coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient, +x.slice(i + 1)];
}
var $d159a7b9a776467b18878ed783a88b88$export$default = function (x) {
  return (x = $44fb33f33a3822970af32be817e1e34b$export$formatDecimalParts(Math.abs(x)), x ? x[1] : NaN);
};
var $f3f66ea3169a67a314e7615a3c7ba4f9$export$default = function (grouping, thousands) {
  return function (value, width) {
    var i = value.length, t = [], j = 0, g = grouping[0], length = 0;
    while (i > 0 && g > 0) {
      if (length + g + 1 > width) g = Math.max(1, width - length);
      t.push(value.substring(i -= g, i + g));
      if ((length += g + 1) > width) break;
      g = grouping[j = (j + 1) % grouping.length];
    }
    return t.reverse().join(thousands);
  };
};
var $431050eb6fc50bdc0a7d6493bf0961bb$export$default = function (numerals) {
  return function (value) {
    return value.replace(/[0-9]/g, function (i) {
      return numerals[+i];
    });
  };
};
// [[fill]align][sign][symbol][0][width][,][.precision][~][type]
var $2aca6c10a80e10ddf7739ea17aff17d1$var$re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function $2aca6c10a80e10ddf7739ea17aff17d1$export$default(specifier) {
  if (!(match = $2aca6c10a80e10ddf7739ea17aff17d1$var$re.exec(specifier))) throw new Error("invalid format: " + specifier);
  var match;
  return new $2aca6c10a80e10ddf7739ea17aff17d1$export$FormatSpecifier({
    fill: match[1],
    align: match[2],
    sign: match[3],
    symbol: match[4],
    zero: match[5],
    width: match[6],
    comma: match[7],
    precision: match[8] && match[8].slice(1),
    trim: match[9],
    type: match[10]
  });
}
$2aca6c10a80e10ddf7739ea17aff17d1$export$default.prototype = $2aca6c10a80e10ddf7739ea17aff17d1$export$FormatSpecifier.prototype;
// instanceof
function $2aca6c10a80e10ddf7739ea17aff17d1$export$FormatSpecifier(specifier) {
  this.fill = specifier.fill === undefined ? " " : specifier.fill + "";
  this.align = specifier.align === undefined ? ">" : specifier.align + "";
  this.sign = specifier.sign === undefined ? "-" : specifier.sign + "";
  this.symbol = specifier.symbol === undefined ? "" : specifier.symbol + "";
  this.zero = !!specifier.zero;
  this.width = specifier.width === undefined ? undefined : +specifier.width;
  this.comma = !!specifier.comma;
  this.precision = specifier.precision === undefined ? undefined : +specifier.precision;
  this.trim = !!specifier.trim;
  this.type = specifier.type === undefined ? "" : specifier.type + "";
}
$2aca6c10a80e10ddf7739ea17aff17d1$export$FormatSpecifier.prototype.toString = function () {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === undefined ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === undefined ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
// Trims insignificant zeros, e.g., replaces 1.2000k with 1.2k.
var $832d87ad54b2bf9e70592bd6e2fee4e1$export$default = function (s) {
  out: for (var n = s.length, i = 1, i0 = -1, i1; i < n; ++i) {
    switch (s[i]) {
      case ".":
        i0 = i1 = i;
        break;
      case "0":
        if (i0 === 0) i0 = i;
        i1 = i;
        break;
      default:
        if (!+s[i]) break out;
        if (i0 > 0) i0 = 0;
        break;
    }
  }
  return i0 > 0 ? s.slice(0, i0) + s.slice(i1 + 1) : s;
};
var $10a2fa95dfd2220f3e1faf779eab4b83$export$prefixExponent;
var $10a2fa95dfd2220f3e1faf779eab4b83$export$default = function (x, p) {
  var d = $44fb33f33a3822970af32be817e1e34b$export$formatDecimalParts(x, p);
  if (!d) return x + "";
  var coefficient = d[0], exponent = d[1], i = exponent - ($10a2fa95dfd2220f3e1faf779eab4b83$export$prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1, n = coefficient.length;
  return i === n ? coefficient : i > n ? coefficient + new Array(i - n + 1).join("0") : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i) : "0." + new Array(1 - i).join("0") + $44fb33f33a3822970af32be817e1e34b$export$formatDecimalParts(x, Math.max(0, p + i - 1))[0];
};
var $399c3e360bafaa3b6992684786703dee$export$default = function (x, p) {
  var d = $44fb33f33a3822970af32be817e1e34b$export$formatDecimalParts(x, p);
  if (!d) return x + "";
  var coefficient = d[0], exponent = d[1];
  return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1) : coefficient + new Array(exponent - coefficient.length + 2).join("0");
};
var $bbbc3872bcf6740e99cca2d0da584f0a$export$default = {
  "%": (x, p) => (x * 100).toFixed(p),
  "b": x => Math.round(x).toString(2),
  "c": x => x + "",
  "d": $44fb33f33a3822970af32be817e1e34b$export$default,
  "e": (x, p) => x.toExponential(p),
  "f": (x, p) => x.toFixed(p),
  "g": (x, p) => x.toPrecision(p),
  "o": x => Math.round(x).toString(8),
  "p": (x, p) => $399c3e360bafaa3b6992684786703dee$export$default(x * 100, p),
  "r": $399c3e360bafaa3b6992684786703dee$export$default,
  "s": $10a2fa95dfd2220f3e1faf779eab4b83$export$default,
  "X": x => Math.round(x).toString(16).toUpperCase(),
  "x": x => Math.round(x).toString(16)
};
var $854f6c249cb0e97b21f976368ff13e34$export$default = function (x) {
  return x;
};
var $2fb9fa8b78e4ad6bfcee6357bf6a9629$var$map = Array.prototype.map, $2fb9fa8b78e4ad6bfcee6357bf6a9629$var$prefixes = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
var $2fb9fa8b78e4ad6bfcee6357bf6a9629$export$default = function (locale) {
  var group = locale.grouping === undefined || locale.thousands === undefined ? $854f6c249cb0e97b21f976368ff13e34$export$default : $f3f66ea3169a67a314e7615a3c7ba4f9$export$default($2fb9fa8b78e4ad6bfcee6357bf6a9629$var$map.call(locale.grouping, Number), locale.thousands + ""), currencyPrefix = locale.currency === undefined ? "" : locale.currency[0] + "", currencySuffix = locale.currency === undefined ? "" : locale.currency[1] + "", decimal = locale.decimal === undefined ? "." : locale.decimal + "", numerals = locale.numerals === undefined ? $854f6c249cb0e97b21f976368ff13e34$export$default : $431050eb6fc50bdc0a7d6493bf0961bb$export$default($2fb9fa8b78e4ad6bfcee6357bf6a9629$var$map.call(locale.numerals, String)), percent = locale.percent === undefined ? "%" : locale.percent + "", minus = locale.minus === undefined ? "−" : locale.minus + "", nan = locale.nan === undefined ? "NaN" : locale.nan + "";
  function newFormat(specifier) {
    specifier = $2aca6c10a80e10ddf7739ea17aff17d1$export$default(specifier);
    var fill = specifier.fill, align = specifier.align, sign = specifier.sign, symbol = specifier.symbol, zero = specifier.zero, width = specifier.width, comma = specifier.comma, precision = specifier.precision, trim = specifier.trim, type = specifier.type;
    // The "n" type is an alias for ",g".
    if (type === "n") (comma = true, type = "g"); else // The "" type, and any invalid type, is an alias for ".12~g".
    if (!$bbbc3872bcf6740e99cca2d0da584f0a$export$default[type]) (precision === undefined && (precision = 12), trim = true, type = "g");
    // If zero fill is specified, padding goes after sign and before digits.
    if (zero || fill === "0" && align === "=") (zero = true, fill = "0", align = "=");
    // Compute the prefix and suffix.
    // For SI-prefix, the suffix is lazily computed.
    var prefix = symbol === "$" ? currencyPrefix : symbol === "#" && (/[boxX]/).test(type) ? "0" + type.toLowerCase() : "", suffix = symbol === "$" ? currencySuffix : (/[%p]/).test(type) ? percent : "";
    // What format function should we use?
    // Is this an integer type?
    // Can this type generate exponential notation?
    var formatType = $bbbc3872bcf6740e99cca2d0da584f0a$export$default[type], maybeSuffix = (/[defgprs%]/).test(type);
    // Set the default precision if not specified,
    // or clamp the specified precision to the supported range.
    // For significant precision, it must be in [1, 21].
    // For fixed precision, it must be in [0, 20].
    precision = precision === undefined ? 6 : (/[gprs]/).test(type) ? Math.max(1, Math.min(21, precision)) : Math.max(0, Math.min(20, precision));
    function format(value) {
      var valuePrefix = prefix, valueSuffix = suffix, i, n, c;
      if (type === "c") {
        valueSuffix = formatType(value) + valueSuffix;
        value = "";
      } else {
        value = +value;
        // Determine the sign. -0 is not less than 0, but 1 / -0 is!
        var valueNegative = value < 0 || 1 / value < 0;
        // Perform the initial formatting.
        value = isNaN(value) ? nan : formatType(Math.abs(value), precision);
        // Trim insignificant zeros.
        if (trim) value = $832d87ad54b2bf9e70592bd6e2fee4e1$export$default(value);
        // If a negative value rounds to zero after formatting, and no explicit positive sign is requested, hide the sign.
        if (valueNegative && +value === 0 && sign !== "+") valueNegative = false;
        // Compute the prefix and suffix.
        valuePrefix = (valueNegative ? sign === "(" ? sign : minus : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
        valueSuffix = (type === "s" ? $2fb9fa8b78e4ad6bfcee6357bf6a9629$var$prefixes[8 + $10a2fa95dfd2220f3e1faf779eab4b83$export$prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : "");
        // Break the formatted value into the integer “value” part that can be
        // grouped, and fractional or exponential “suffix” part that is not.
        if (maybeSuffix) {
          (i = -1, n = value.length);
          while (++i < n) {
            if ((c = value.charCodeAt(i), 48 > c || c > 57)) {
              valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
              value = value.slice(0, i);
              break;
            }
          }
        }
      }
      // If the fill character is not "0", grouping is applied before padding.
      if (comma && !zero) value = group(value, Infinity);
      // Compute the padding.
      var length = valuePrefix.length + value.length + valueSuffix.length, padding = length < width ? new Array(width - length + 1).join(fill) : "";
      // If the fill character is "0", grouping is applied after padding.
      if (comma && zero) (value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "");
      // Reconstruct the final output based on the desired alignment.
      switch (align) {
        case "<":
          value = valuePrefix + value + valueSuffix + padding;
          break;
        case "=":
          value = valuePrefix + padding + value + valueSuffix;
          break;
        case "^":
          value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length);
          break;
        default:
          value = padding + valuePrefix + value + valueSuffix;
          break;
      }
      return numerals(value);
    }
    format.toString = function () {
      return specifier + "";
    };
    return format;
  }
  function formatPrefix(specifier, value) {
    var f = newFormat((specifier = $2aca6c10a80e10ddf7739ea17aff17d1$export$default(specifier), specifier.type = "f", specifier)), e = Math.max(-8, Math.min(8, Math.floor($d159a7b9a776467b18878ed783a88b88$export$default(value) / 3))) * 3, k = Math.pow(10, -e), prefix = $2fb9fa8b78e4ad6bfcee6357bf6a9629$var$prefixes[8 + e / 3];
    return function (value) {
      return f(k * value) + prefix;
    };
  }
  return {
    format: newFormat,
    formatPrefix: formatPrefix
  };
};
var $e54f3e6231f10566a1e741bb96437789$var$locale;
var $e54f3e6231f10566a1e741bb96437789$export$format;
var $e54f3e6231f10566a1e741bb96437789$export$formatPrefix;
$e54f3e6231f10566a1e741bb96437789$export$default({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function $e54f3e6231f10566a1e741bb96437789$export$default(definition) {
  $e54f3e6231f10566a1e741bb96437789$var$locale = $2fb9fa8b78e4ad6bfcee6357bf6a9629$export$default(definition);
  $e54f3e6231f10566a1e741bb96437789$export$format = $e54f3e6231f10566a1e741bb96437789$var$locale.format;
  $e54f3e6231f10566a1e741bb96437789$export$formatPrefix = $e54f3e6231f10566a1e741bb96437789$var$locale.formatPrefix;
  return $e54f3e6231f10566a1e741bb96437789$var$locale;
}
var $1e4828413c6362e3ee58ac1aeada6549$export$default = function (step, max) {
  (step = Math.abs(step), max = Math.abs(max) - step);
  return Math.max(0, $d159a7b9a776467b18878ed783a88b88$export$default(max) - $d159a7b9a776467b18878ed783a88b88$export$default(step)) + 1;
};
/**
* Create a function which maps a genome pair to a location in the entire genome
*
* @param {String} genomeId key from genomeSizes object
* @returns a function which maps a (chrId, pairNum) => to
*  a number between 1 and total number of genes in the genome
*/
const $3ebbd6da2f6dbbd2ea0ba22bdc176caf$var$createPairMapperToGenome = genomeId => {
  let chrSizes = $3ebbd6da2f6dbbd2ea0ba22bdc176caf$export$genomeSizes[genomeId];
  let chrStarts = new Map();
  let cumulativeTotal = 0;
  chrSizes.forEach((value, key) => {
    chrStarts.set(key, cumulativeTotal);
    cumulativeTotal += value;
  });
  return (chr, pairNum) => {
    return chrStarts.get(chr) + pairNum;
  };
};
class $3ebbd6da2f6dbbd2ea0ba22bdc176caf$export$GenomeScale {
  /**
  * A scale used to map a genome pair to a location between -1 and 1 for data visualization.
  * Also contains inverse and utility functions for getting labels for axis.
  *
  * @param {String} genomeId key from genomeSizes object
  * @param {Array} domain array of length 2 containing the start and end of the genome
  *   for the scale. ex: ["chr2:1000", "chr3:2000"]
  */
  constructor(genomeId, domain) {
    if ($3ebbd6da2f6dbbd2ea0ba22bdc176caf$export$genomeSizes[genomeId] === undefined) {
      console.error(`${genomeId} is not a recognized genome!`);
    }
    this.genomeId = genomeId;
    this.domain = domain;
    let [startChr, startPair] = domain[0].substring(3).// Remove chr
    split(":");
    // split chromesome and pair number
    startPair = parseInt(startPair);
    let [endChr, endPair] = domain[1].substring(3).split(":");
    endPair = parseInt(endPair);
    this.mapPairToGenomeIndex = $3ebbd6da2f6dbbd2ea0ba22bdc176caf$var$createPairMapperToGenome(genomeId);
    const firstPairInDomain = this.mapPairToGenomeIndex(startChr, startPair);
    const lastPairInDomain = this.mapPairToGenomeIndex(endChr, endPair);
    this.mapGenomeIndexToClipSpace = $ab472fc72a52ba79515db0c00f4f687a$export$scale([firstPairInDomain, lastPairInDomain], [-1, 1]);
    this.mapGenomeIndexToClipSpaceInverse = $ab472fc72a52ba79515db0c00f4f687a$export$scale([-1, 1], [firstPairInDomain, lastPairInDomain]);
  }
  /**
  * Map a genome pair to [-1, 1] with the parts.
  *
  * @param {String} chr id of chromosome in genome
  * @param {Number} pair location in chromosome
  * @returns value in [-1, 1] corresponding to genome range location
  */
  toClipSpaceFromParts(chr, pair) {
    return this.mapGenomeIndexToClipSpace(this.mapPairToGenomeIndex(chr, pair));
  }
  /**
  * Utility method for calling this.toClipSpaceFromParts.
  *
  * @param {String} pairStr in form "chrID:geneNumber" ex: "chr1:1000"
  * @returns value in [-1, 1] corresponding to genome range location
  */
  toClipSpaceFromString(pairStr) {
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
  */
  inverse(num, formatting = false) {
    let genomeSpot = Math.floor(this.mapGenomeIndexToClipSpaceInverse(num));
    let chrId;
    let chrLoc;
    let cumulativeTotal = 0;
    for (const [chrKey, pairCount] of $3ebbd6da2f6dbbd2ea0ba22bdc176caf$export$genomeSizes[this.genomeId].entries()) {
      if (cumulativeTotal + pairCount >= genomeSpot) {
        chrLoc = genomeSpot - cumulativeTotal;
        chrId = chrKey;
        break;
      }
      cumulativeTotal += pairCount;
    }
    return formatting ? `chr${chrId}:${$e54f3e6231f10566a1e741bb96437789$export$format(formatting)(chrLoc)}` : `chr${chrId}:${chrLoc}`;
  }
  getMidpoint(chr1, gene1, chr2, gene2) {
    const x1 = this.toClipSpaceFromParts(chr1, gene1);
    const x2 = this.toClipSpaceFromParts(chr2, gene2);
    const middleGene = this.inverse((x1 + x2) / 2);
    const [chrId, gene] = middleGene.substring(3).split(":");
    return [chrId, parseInt(gene)];
  }
  /**
  * Get a sequence of ticks for a range in the genome.
  *
  * @param {Number} start number between [-1, 1]
  * @param {Number} end number between [-1, 1] > start
  * @returns object with tickCoords and corresponding tickLabels property
  */
  getTickCoordsAndLabels(start, end) {
    let [startChr, startPair] = this.inverse(start).substring(3).split(":");
    let [endChr, endPair] = this.inverse(end).substring(3).split(":");
    const toReturn = [];
    let suggestedFormat;
    if (startChr === endChr) {
      let difference = endPair - startPair;
      let magnitude = Math.floor(Math.log10(difference));
      let startingValue = startPair - startPair % 10 ** magnitude;
      suggestedFormat = $1e4828413c6362e3ee58ac1aeada6549$export$default(10 ** magnitude, startingValue);
      for (let currValue = startingValue; currValue < endPair; currValue += 10 ** magnitude) {
        toReturn.push(this.toClipSpaceFromParts(startChr, currValue));
      }
    } else {
      suggestedFormat = "1";
      for (const chrId of $3ebbd6da2f6dbbd2ea0ba22bdc176caf$export$genomeSizes[this.genomeId].keys()) {
        toReturn.push(this.toClipSpaceFromParts(chrId, 1));
      }
    }
    return {
      tickCoords: toReturn,
      tickLabels: toReturn.map(coord => this.inverse(coord, $e54f3e6231f10566a1e741bb96437789$export$format(`.${suggestedFormat}s`)))
    };
  }
  toCallable() {
    // TODO investigate if using this method in the vertex calculator leads to slow downs
    const func = args => {
      return this.toClipSpaceFromParts(args[0], args[1]);
    };
    func.getMidpoint = this.getMidpoint.bind(this);
    return func;
  }
  /**
  * Utility method for getting a GenomeScale across an entire genome.
  *
  * @param {String} genomeId from genomeSizes
  * @returns a GenomeScale across an entire genome
  */
  static completeScale(genomeId) {
    const chrSizes = $3ebbd6da2f6dbbd2ea0ba22bdc176caf$export$genomeSizes[genomeId];
    const finalEntry = [...chrSizes.entries()][chrSizes.size - 1];
    return new $3ebbd6da2f6dbbd2ea0ba22bdc176caf$export$GenomeScale(genomeId, ["chr1:1", `chr${finalEntry[0]}:${finalEntry[1]}`]);
  }
}
/**
* Available genomes to visualize. Each genome is a map from chromosome id to number of genes in chromosome.
* Order matters as maps remember insertion order.
*/
const $3ebbd6da2f6dbbd2ea0ba22bdc176caf$export$genomeSizes = {
  hg38: new Map([["1", 248956422], // chr1
  ["2", 242193529], // chr2
  ["3", 198295559], // ...
  ["4", 190214555], ["5", 181538259], ["6", 170805979], ["7", 159345973], ["8", 145138636], ["9", 138394717], ["10", 135086622], ["11", 133797422], ["12", 133275309], ["13", 114364328], ["14", 107043718], ["15", 101991189], ["16", 90338345], ["17", 83257441], ["18", 80373285], ["19", 58617616], ["20", 64444167], // ...
  ["21", 46709983], // chr21
  ["22", 50818468], // chr22
  ["X", 156040895], // chrX
  ["Y", 57227415]]),
  hg19: new Map([["1", 249250621], // chr1
  ["2", 243199373], // chr2
  ["3", 198022430], // ...
  ["4", 191154276], ["5", 180915260], ["6", 171115067], ["7", 159138663], ["8", 146364022], ["9", 141213431], ["10", 135534747], ["11", 135006516], ["12", 133851895], ["13", 115169878], ["14", 107349540], ["15", 102531392], ["16", 90354753], ["17", 81195210], ["18", 78077248], ["19", 59128983], ["20", 63025520], // ...
  ["21", 48129895], // chr21
  ["22", 51304566], // chr22
  ["X", 155270560], // chrX
  ["Y", 59373566]]),
  mm9: new Map([["1", 197195432], ["2", 181748087], ["3", 159599783], ["4", 155630120], ["5", 152537259], ["6", 149517037], ["7", 152524553], ["8", 131738871], ["9", 124076172], ["10", 129993255], ["11", 121843856], ["12", 121257530], ["13", 120284312], ["14", 125194864], ["15", 103494974], ["16", 98319150], ["17", 95272651], ["18", 90772031], ["19", 61342430], ["X", 166650296], ["Y", 15902555]]),
  mm10: new Map([["1", 195471971], ["2", 182113224], ["3", 160039680], ["4", 156508116], ["5", 151834684], ["6", 149736546], ["7", 145441459], ["8", 129401213], ["9", 124595110], ["10", 130694993], ["11", 122082543], ["12", 120129022], ["13", 120421639], ["14", 124902244], ["15", 104043685], ["16", 98207768], ["17", 94987271], ["18", 90702639], ["19", 61431566], ["X", 171031299], ["Y", 91744698]]),
  mm39: new Map([["1", 195154279], // chr1
  ["2", 181755017], // chr2
  ["3", 159745316], // ...
  ["4", 156860686], ["5", 151758149], ["6", 149588044], ["7", 144995196], ["8", 130127694], ["9", 124359700], ["10", 130530862], ["11", 121973369], ["12", 120092757], ["13", 120883175], ["14", 125139656], ["15", 104073951], ["16", 98008968], ["17", 95294699], // ...
  ["18", 90720763], // chr18
  ["19", 61420004], // chr19
  ["X", 169476592], // chrX
  ["Y", 91455967]])
};
$parcel$export($3ebbd6da2f6dbbd2ea0ba22bdc176caf$exports, "GenomeScale", function () {
  return $3ebbd6da2f6dbbd2ea0ba22bdc176caf$export$GenomeScale;
});
var $0e7c17f0babd87a45f0bc6b14a243a95$export$default = function (constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
};
function $0e7c17f0babd87a45f0bc6b14a243a95$export$extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition) prototype[key] = definition[key];
  return prototype;
}
function $7adb004cb218a5bbfe4f066d028c083f$export$Color() {}
var $7adb004cb218a5bbfe4f066d028c083f$export$darker = 0.7;
var $7adb004cb218a5bbfe4f066d028c083f$export$brighter = 1 / $7adb004cb218a5bbfe4f066d028c083f$export$darker;
var $7adb004cb218a5bbfe4f066d028c083f$var$reI = "\\s*([+-]?\\d+)\\s*", $7adb004cb218a5bbfe4f066d028c083f$var$reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*", $7adb004cb218a5bbfe4f066d028c083f$var$reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*", $7adb004cb218a5bbfe4f066d028c083f$var$reHex = /^#([0-9a-f]{3,8})$/, $7adb004cb218a5bbfe4f066d028c083f$var$reRgbInteger = new RegExp("^rgb\\(" + [$7adb004cb218a5bbfe4f066d028c083f$var$reI, $7adb004cb218a5bbfe4f066d028c083f$var$reI, $7adb004cb218a5bbfe4f066d028c083f$var$reI] + "\\)$"), $7adb004cb218a5bbfe4f066d028c083f$var$reRgbPercent = new RegExp("^rgb\\(" + [$7adb004cb218a5bbfe4f066d028c083f$var$reP, $7adb004cb218a5bbfe4f066d028c083f$var$reP, $7adb004cb218a5bbfe4f066d028c083f$var$reP] + "\\)$"), $7adb004cb218a5bbfe4f066d028c083f$var$reRgbaInteger = new RegExp("^rgba\\(" + [$7adb004cb218a5bbfe4f066d028c083f$var$reI, $7adb004cb218a5bbfe4f066d028c083f$var$reI, $7adb004cb218a5bbfe4f066d028c083f$var$reI, $7adb004cb218a5bbfe4f066d028c083f$var$reN] + "\\)$"), $7adb004cb218a5bbfe4f066d028c083f$var$reRgbaPercent = new RegExp("^rgba\\(" + [$7adb004cb218a5bbfe4f066d028c083f$var$reP, $7adb004cb218a5bbfe4f066d028c083f$var$reP, $7adb004cb218a5bbfe4f066d028c083f$var$reP, $7adb004cb218a5bbfe4f066d028c083f$var$reN] + "\\)$"), $7adb004cb218a5bbfe4f066d028c083f$var$reHslPercent = new RegExp("^hsl\\(" + [$7adb004cb218a5bbfe4f066d028c083f$var$reN, $7adb004cb218a5bbfe4f066d028c083f$var$reP, $7adb004cb218a5bbfe4f066d028c083f$var$reP] + "\\)$"), $7adb004cb218a5bbfe4f066d028c083f$var$reHslaPercent = new RegExp("^hsla\\(" + [$7adb004cb218a5bbfe4f066d028c083f$var$reN, $7adb004cb218a5bbfe4f066d028c083f$var$reP, $7adb004cb218a5bbfe4f066d028c083f$var$reP, $7adb004cb218a5bbfe4f066d028c083f$var$reN] + "\\)$");
var $7adb004cb218a5bbfe4f066d028c083f$var$named = {
  aliceblue: 0xf0f8ff,
  antiquewhite: 0xfaebd7,
  aqua: 0x00ffff,
  aquamarine: 0x7fffd4,
  azure: 0xf0ffff,
  beige: 0xf5f5dc,
  bisque: 0xffe4c4,
  black: 0x000000,
  blanchedalmond: 0xffebcd,
  blue: 0x0000ff,
  blueviolet: 0x8a2be2,
  brown: 0xa52a2a,
  burlywood: 0xdeb887,
  cadetblue: 0x5f9ea0,
  chartreuse: 0x7fff00,
  chocolate: 0xd2691e,
  coral: 0xff7f50,
  cornflowerblue: 0x6495ed,
  cornsilk: 0xfff8dc,
  crimson: 0xdc143c,
  cyan: 0x00ffff,
  darkblue: 0x00008b,
  darkcyan: 0x008b8b,
  darkgoldenrod: 0xb8860b,
  darkgray: 0xa9a9a9,
  darkgreen: 0x006400,
  darkgrey: 0xa9a9a9,
  darkkhaki: 0xbdb76b,
  darkmagenta: 0x8b008b,
  darkolivegreen: 0x556b2f,
  darkorange: 0xff8c00,
  darkorchid: 0x9932cc,
  darkred: 0x8b0000,
  darksalmon: 0xe9967a,
  darkseagreen: 0x8fbc8f,
  darkslateblue: 0x483d8b,
  darkslategray: 0x2f4f4f,
  darkslategrey: 0x2f4f4f,
  darkturquoise: 0x00ced1,
  darkviolet: 0x9400d3,
  deeppink: 0xff1493,
  deepskyblue: 0x00bfff,
  dimgray: 0x696969,
  dimgrey: 0x696969,
  dodgerblue: 0x1e90ff,
  firebrick: 0xb22222,
  floralwhite: 0xfffaf0,
  forestgreen: 0x228b22,
  fuchsia: 0xff00ff,
  gainsboro: 0xdcdcdc,
  ghostwhite: 0xf8f8ff,
  gold: 0xffd700,
  goldenrod: 0xdaa520,
  gray: 0x808080,
  green: 0x008000,
  greenyellow: 0xadff2f,
  grey: 0x808080,
  honeydew: 0xf0fff0,
  hotpink: 0xff69b4,
  indianred: 0xcd5c5c,
  indigo: 0x4b0082,
  ivory: 0xfffff0,
  khaki: 0xf0e68c,
  lavender: 0xe6e6fa,
  lavenderblush: 0xfff0f5,
  lawngreen: 0x7cfc00,
  lemonchiffon: 0xfffacd,
  lightblue: 0xadd8e6,
  lightcoral: 0xf08080,
  lightcyan: 0xe0ffff,
  lightgoldenrodyellow: 0xfafad2,
  lightgray: 0xd3d3d3,
  lightgreen: 0x90ee90,
  lightgrey: 0xd3d3d3,
  lightpink: 0xffb6c1,
  lightsalmon: 0xffa07a,
  lightseagreen: 0x20b2aa,
  lightskyblue: 0x87cefa,
  lightslategray: 0x778899,
  lightslategrey: 0x778899,
  lightsteelblue: 0xb0c4de,
  lightyellow: 0xffffe0,
  lime: 0x00ff00,
  limegreen: 0x32cd32,
  linen: 0xfaf0e6,
  magenta: 0xff00ff,
  maroon: 0x800000,
  mediumaquamarine: 0x66cdaa,
  mediumblue: 0x0000cd,
  mediumorchid: 0xba55d3,
  mediumpurple: 0x9370db,
  mediumseagreen: 0x3cb371,
  mediumslateblue: 0x7b68ee,
  mediumspringgreen: 0x00fa9a,
  mediumturquoise: 0x48d1cc,
  mediumvioletred: 0xc71585,
  midnightblue: 0x191970,
  mintcream: 0xf5fffa,
  mistyrose: 0xffe4e1,
  moccasin: 0xffe4b5,
  navajowhite: 0xffdead,
  navy: 0x000080,
  oldlace: 0xfdf5e6,
  olive: 0x808000,
  olivedrab: 0x6b8e23,
  orange: 0xffa500,
  orangered: 0xff4500,
  orchid: 0xda70d6,
  palegoldenrod: 0xeee8aa,
  palegreen: 0x98fb98,
  paleturquoise: 0xafeeee,
  palevioletred: 0xdb7093,
  papayawhip: 0xffefd5,
  peachpuff: 0xffdab9,
  peru: 0xcd853f,
  pink: 0xffc0cb,
  plum: 0xdda0dd,
  powderblue: 0xb0e0e6,
  purple: 0x800080,
  rebeccapurple: 0x663399,
  red: 0xff0000,
  rosybrown: 0xbc8f8f,
  royalblue: 0x4169e1,
  saddlebrown: 0x8b4513,
  salmon: 0xfa8072,
  sandybrown: 0xf4a460,
  seagreen: 0x2e8b57,
  seashell: 0xfff5ee,
  sienna: 0xa0522d,
  silver: 0xc0c0c0,
  skyblue: 0x87ceeb,
  slateblue: 0x6a5acd,
  slategray: 0x708090,
  slategrey: 0x708090,
  snow: 0xfffafa,
  springgreen: 0x00ff7f,
  steelblue: 0x4682b4,
  tan: 0xd2b48c,
  teal: 0x008080,
  thistle: 0xd8bfd8,
  tomato: 0xff6347,
  turquoise: 0x40e0d0,
  violet: 0xee82ee,
  wheat: 0xf5deb3,
  white: 0xffffff,
  whitesmoke: 0xf5f5f5,
  yellow: 0xffff00,
  yellowgreen: 0x9acd32
};
$0e7c17f0babd87a45f0bc6b14a243a95$export$default($7adb004cb218a5bbfe4f066d028c083f$export$Color, $7adb004cb218a5bbfe4f066d028c083f$export$default, {
  copy: function (channels) {
    return Object.assign(new this.constructor(), this, channels);
  },
  displayable: function () {
    return this.rgb().displayable();
  },
  hex: $7adb004cb218a5bbfe4f066d028c083f$var$color_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: $7adb004cb218a5bbfe4f066d028c083f$var$color_formatHex,
  formatHsl: $7adb004cb218a5bbfe4f066d028c083f$var$color_formatHsl,
  formatRgb: $7adb004cb218a5bbfe4f066d028c083f$var$color_formatRgb,
  toString: $7adb004cb218a5bbfe4f066d028c083f$var$color_formatRgb
});
function $7adb004cb218a5bbfe4f066d028c083f$var$color_formatHex() {
  return this.rgb().formatHex();
}
function $7adb004cb218a5bbfe4f066d028c083f$var$color_formatHsl() {
  return $7adb004cb218a5bbfe4f066d028c083f$export$hslConvert(this).formatHsl();
}
function $7adb004cb218a5bbfe4f066d028c083f$var$color_formatRgb() {
  return this.rgb().formatRgb();
}
function $7adb004cb218a5bbfe4f066d028c083f$export$default(format) {
  var m, l;
  format = (format + "").trim().toLowerCase();
  return (m = $7adb004cb218a5bbfe4f066d028c083f$var$reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? $7adb004cb218a5bbfe4f066d028c083f$var$rgbn(m) : // #ff0000
  l === 3 ? new $7adb004cb218a5bbfe4f066d028c083f$export$Rgb(m >> 8 & 0xf | m >> 4 & 0xf0, m >> 4 & 0xf | m & 0xf0, (m & 0xf) << 4 | m & 0xf, 1) : // #f00
  l === 8 ? $7adb004cb218a5bbfe4f066d028c083f$var$rgba(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) : // #ff000000
  l === 4 ? $7adb004cb218a5bbfe4f066d028c083f$var$rgba(m >> 12 & 0xf | m >> 8 & 0xf0, m >> 8 & 0xf | m >> 4 & 0xf0, m >> 4 & 0xf | m & 0xf0, ((m & 0xf) << 4 | m & 0xf) / 0xff) : // #f000
  null) : // invalid hex
  (m = $7adb004cb218a5bbfe4f066d028c083f$var$reRgbInteger.exec(format)) ? new $7adb004cb218a5bbfe4f066d028c083f$export$Rgb(m[1], m[2], m[3], 1) : // rgb(255, 0, 0)
  (m = $7adb004cb218a5bbfe4f066d028c083f$var$reRgbPercent.exec(format)) ? new $7adb004cb218a5bbfe4f066d028c083f$export$Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) : // rgb(100%, 0%, 0%)
  (m = $7adb004cb218a5bbfe4f066d028c083f$var$reRgbaInteger.exec(format)) ? $7adb004cb218a5bbfe4f066d028c083f$var$rgba(m[1], m[2], m[3], m[4]) : // rgba(255, 0, 0, 1)
  (m = $7adb004cb218a5bbfe4f066d028c083f$var$reRgbaPercent.exec(format)) ? $7adb004cb218a5bbfe4f066d028c083f$var$rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) : // rgb(100%, 0%, 0%, 1)
  (m = $7adb004cb218a5bbfe4f066d028c083f$var$reHslPercent.exec(format)) ? $7adb004cb218a5bbfe4f066d028c083f$var$hsla(m[1], m[2] / 100, m[3] / 100, 1) : // hsl(120, 50%, 50%)
  (m = $7adb004cb218a5bbfe4f066d028c083f$var$reHslaPercent.exec(format)) ? $7adb004cb218a5bbfe4f066d028c083f$var$hsla(m[1], m[2] / 100, m[3] / 100, m[4]) : // hsla(120, 50%, 50%, 1)
  $7adb004cb218a5bbfe4f066d028c083f$var$named.hasOwnProperty(format) ? $7adb004cb218a5bbfe4f066d028c083f$var$rgbn($7adb004cb218a5bbfe4f066d028c083f$var$named[format]) : // eslint-disable-line no-prototype-builtins
  format === "transparent" ? new $7adb004cb218a5bbfe4f066d028c083f$export$Rgb(NaN, NaN, NaN, 0) : null;
}
function $7adb004cb218a5bbfe4f066d028c083f$var$rgbn(n) {
  return new $7adb004cb218a5bbfe4f066d028c083f$export$Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
}
function $7adb004cb218a5bbfe4f066d028c083f$var$rgba(r, g, b, a) {
  if (a <= 0) r = g = b = NaN;
  return new $7adb004cb218a5bbfe4f066d028c083f$export$Rgb(r, g, b, a);
}
function $7adb004cb218a5bbfe4f066d028c083f$export$rgbConvert(o) {
  if (!(o instanceof $7adb004cb218a5bbfe4f066d028c083f$export$Color)) o = $7adb004cb218a5bbfe4f066d028c083f$export$default(o);
  if (!o) return new $7adb004cb218a5bbfe4f066d028c083f$export$Rgb();
  o = o.rgb();
  return new $7adb004cb218a5bbfe4f066d028c083f$export$Rgb(o.r, o.g, o.b, o.opacity);
}
function $7adb004cb218a5bbfe4f066d028c083f$export$rgb(r, g, b, opacity) {
  return arguments.length === 1 ? $7adb004cb218a5bbfe4f066d028c083f$export$rgbConvert(r) : new $7adb004cb218a5bbfe4f066d028c083f$export$Rgb(r, g, b, opacity == null ? 1 : opacity);
}
function $7adb004cb218a5bbfe4f066d028c083f$export$Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}
$0e7c17f0babd87a45f0bc6b14a243a95$export$default($7adb004cb218a5bbfe4f066d028c083f$export$Rgb, $7adb004cb218a5bbfe4f066d028c083f$export$rgb, $0e7c17f0babd87a45f0bc6b14a243a95$export$extend($7adb004cb218a5bbfe4f066d028c083f$export$Color, {
  brighter: function (k) {
    k = k == null ? $7adb004cb218a5bbfe4f066d028c083f$export$brighter : Math.pow($7adb004cb218a5bbfe4f066d028c083f$export$brighter, k);
    return new $7adb004cb218a5bbfe4f066d028c083f$export$Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker: function (k) {
    k = k == null ? $7adb004cb218a5bbfe4f066d028c083f$export$darker : Math.pow($7adb004cb218a5bbfe4f066d028c083f$export$darker, k);
    return new $7adb004cb218a5bbfe4f066d028c083f$export$Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb: function () {
    return this;
  },
  displayable: function () {
    return -0.5 <= this.r && this.r < 255.5 && (-0.5 <= this.g && this.g < 255.5) && (-0.5 <= this.b && this.b < 255.5) && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: $7adb004cb218a5bbfe4f066d028c083f$var$rgb_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: $7adb004cb218a5bbfe4f066d028c083f$var$rgb_formatHex,
  formatRgb: $7adb004cb218a5bbfe4f066d028c083f$var$rgb_formatRgb,
  toString: $7adb004cb218a5bbfe4f066d028c083f$var$rgb_formatRgb
}));
function $7adb004cb218a5bbfe4f066d028c083f$var$rgb_formatHex() {
  return "#" + $7adb004cb218a5bbfe4f066d028c083f$var$hex(this.r) + $7adb004cb218a5bbfe4f066d028c083f$var$hex(this.g) + $7adb004cb218a5bbfe4f066d028c083f$var$hex(this.b);
}
function $7adb004cb218a5bbfe4f066d028c083f$var$rgb_formatRgb() {
  var a = this.opacity;
  a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
  return (a === 1 ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (a === 1 ? ")" : ", " + a + ")");
}
function $7adb004cb218a5bbfe4f066d028c083f$var$hex(value) {
  value = Math.max(0, Math.min(255, Math.round(value) || 0));
  return (value < 16 ? "0" : "") + value.toString(16);
}
function $7adb004cb218a5bbfe4f066d028c083f$var$hsla(h, s, l, a) {
  if (a <= 0) h = s = l = NaN; else if (l <= 0 || l >= 1) h = s = NaN; else if (s <= 0) h = NaN;
  return new $7adb004cb218a5bbfe4f066d028c083f$var$Hsl(h, s, l, a);
}
function $7adb004cb218a5bbfe4f066d028c083f$export$hslConvert(o) {
  if (o instanceof $7adb004cb218a5bbfe4f066d028c083f$var$Hsl) return new $7adb004cb218a5bbfe4f066d028c083f$var$Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof $7adb004cb218a5bbfe4f066d028c083f$export$Color)) o = $7adb004cb218a5bbfe4f066d028c083f$export$default(o);
  if (!o) return new $7adb004cb218a5bbfe4f066d028c083f$var$Hsl();
  if (o instanceof $7adb004cb218a5bbfe4f066d028c083f$var$Hsl) return o;
  o = o.rgb();
  var r = o.r / 255, g = o.g / 255, b = o.b / 255, min = Math.min(r, g, b), max = Math.max(r, g, b), h = NaN, s = max - min, l = (max + min) / 2;
  if (s) {
    if (r === max) h = (g - b) / s + (g < b) * 6; else if (g === max) h = (b - r) / s + 2; else h = (r - g) / s + 4;
    s /= l < 0.5 ? max + min : 2 - max - min;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }
  return new $7adb004cb218a5bbfe4f066d028c083f$var$Hsl(h, s, l, o.opacity);
}
function $7adb004cb218a5bbfe4f066d028c083f$export$hsl(h, s, l, opacity) {
  return arguments.length === 1 ? $7adb004cb218a5bbfe4f066d028c083f$export$hslConvert(h) : new $7adb004cb218a5bbfe4f066d028c083f$var$Hsl(h, s, l, opacity == null ? 1 : opacity);
}
function $7adb004cb218a5bbfe4f066d028c083f$var$Hsl(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}
$0e7c17f0babd87a45f0bc6b14a243a95$export$default($7adb004cb218a5bbfe4f066d028c083f$var$Hsl, $7adb004cb218a5bbfe4f066d028c083f$export$hsl, $0e7c17f0babd87a45f0bc6b14a243a95$export$extend($7adb004cb218a5bbfe4f066d028c083f$export$Color, {
  brighter: function (k) {
    k = k == null ? $7adb004cb218a5bbfe4f066d028c083f$export$brighter : Math.pow($7adb004cb218a5bbfe4f066d028c083f$export$brighter, k);
    return new $7adb004cb218a5bbfe4f066d028c083f$var$Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function (k) {
    k = k == null ? $7adb004cb218a5bbfe4f066d028c083f$export$darker : Math.pow($7adb004cb218a5bbfe4f066d028c083f$export$darker, k);
    return new $7adb004cb218a5bbfe4f066d028c083f$var$Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function () {
    var h = this.h % 360 + (this.h < 0) * 360, s = isNaN(h) || isNaN(this.s) ? 0 : this.s, l = this.l, m2 = l + (l < 0.5 ? l : 1 - l) * s, m1 = 2 * l - m2;
    return new $7adb004cb218a5bbfe4f066d028c083f$export$Rgb($7adb004cb218a5bbfe4f066d028c083f$var$hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2), $7adb004cb218a5bbfe4f066d028c083f$var$hsl2rgb(h, m1, m2), $7adb004cb218a5bbfe4f066d028c083f$var$hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2), this.opacity);
  },
  displayable: function () {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && (0 <= this.l && this.l <= 1) && (0 <= this.opacity && this.opacity <= 1);
  },
  formatHsl: function () {
    var a = this.opacity;
    a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
    return (a === 1 ? "hsl(" : "hsla(") + (this.h || 0) + ", " + (this.s || 0) * 100 + "%, " + (this.l || 0) * 100 + "%" + (a === 1 ? ")" : ", " + a + ")");
  }
}));
/*From FvD 13.37, CSS Color Module Level 3*/
function $7adb004cb218a5bbfe4f066d028c083f$var$hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
}
const $e0b2f6d7a64dda597e5ddf8546d7549d$export$radians = Math.PI / 180;
const $e0b2f6d7a64dda597e5ddf8546d7549d$export$degrees = 180 / Math.PI;
var $907db14e0037ee8c4008af6b27d5d5b9$var$A = -0.14861, $907db14e0037ee8c4008af6b27d5d5b9$var$B = +1.78277, $907db14e0037ee8c4008af6b27d5d5b9$var$C = -0.29227, $907db14e0037ee8c4008af6b27d5d5b9$var$D = -0.90649, $907db14e0037ee8c4008af6b27d5d5b9$var$E = +1.97294, $907db14e0037ee8c4008af6b27d5d5b9$var$ED = $907db14e0037ee8c4008af6b27d5d5b9$var$E * $907db14e0037ee8c4008af6b27d5d5b9$var$D, $907db14e0037ee8c4008af6b27d5d5b9$var$EB = $907db14e0037ee8c4008af6b27d5d5b9$var$E * $907db14e0037ee8c4008af6b27d5d5b9$var$B, $907db14e0037ee8c4008af6b27d5d5b9$var$BC_DA = $907db14e0037ee8c4008af6b27d5d5b9$var$B * $907db14e0037ee8c4008af6b27d5d5b9$var$C - $907db14e0037ee8c4008af6b27d5d5b9$var$D * $907db14e0037ee8c4008af6b27d5d5b9$var$A;
function $907db14e0037ee8c4008af6b27d5d5b9$var$cubehelixConvert(o) {
  if (o instanceof $907db14e0037ee8c4008af6b27d5d5b9$export$Cubehelix) return new $907db14e0037ee8c4008af6b27d5d5b9$export$Cubehelix(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof $7adb004cb218a5bbfe4f066d028c083f$export$Rgb)) o = $7adb004cb218a5bbfe4f066d028c083f$export$rgbConvert(o);
  var r = o.r / 255, g = o.g / 255, b = o.b / 255, l = ($907db14e0037ee8c4008af6b27d5d5b9$var$BC_DA * b + $907db14e0037ee8c4008af6b27d5d5b9$var$ED * r - $907db14e0037ee8c4008af6b27d5d5b9$var$EB * g) / ($907db14e0037ee8c4008af6b27d5d5b9$var$BC_DA + $907db14e0037ee8c4008af6b27d5d5b9$var$ED - $907db14e0037ee8c4008af6b27d5d5b9$var$EB), bl = b - l, k = ($907db14e0037ee8c4008af6b27d5d5b9$var$E * (g - l) - $907db14e0037ee8c4008af6b27d5d5b9$var$C * bl) / $907db14e0037ee8c4008af6b27d5d5b9$var$D, s = Math.sqrt(k * k + bl * bl) / ($907db14e0037ee8c4008af6b27d5d5b9$var$E * l * (1 - l)), // NaN if l=0 or l=1
  h = s ? Math.atan2(k, bl) * $e0b2f6d7a64dda597e5ddf8546d7549d$export$degrees - 120 : NaN;
  return new $907db14e0037ee8c4008af6b27d5d5b9$export$Cubehelix(h < 0 ? h + 360 : h, s, l, o.opacity);
}
function $907db14e0037ee8c4008af6b27d5d5b9$export$default(h, s, l, opacity) {
  return arguments.length === 1 ? $907db14e0037ee8c4008af6b27d5d5b9$var$cubehelixConvert(h) : new $907db14e0037ee8c4008af6b27d5d5b9$export$Cubehelix(h, s, l, opacity == null ? 1 : opacity);
}
function $907db14e0037ee8c4008af6b27d5d5b9$export$Cubehelix(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}
$0e7c17f0babd87a45f0bc6b14a243a95$export$default($907db14e0037ee8c4008af6b27d5d5b9$export$Cubehelix, $907db14e0037ee8c4008af6b27d5d5b9$export$default, $0e7c17f0babd87a45f0bc6b14a243a95$export$extend($7adb004cb218a5bbfe4f066d028c083f$export$Color, {
  brighter: function (k) {
    k = k == null ? $7adb004cb218a5bbfe4f066d028c083f$export$brighter : Math.pow($7adb004cb218a5bbfe4f066d028c083f$export$brighter, k);
    return new $907db14e0037ee8c4008af6b27d5d5b9$export$Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function (k) {
    k = k == null ? $7adb004cb218a5bbfe4f066d028c083f$export$darker : Math.pow($7adb004cb218a5bbfe4f066d028c083f$export$darker, k);
    return new $907db14e0037ee8c4008af6b27d5d5b9$export$Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function () {
    var h = isNaN(this.h) ? 0 : (this.h + 120) * $e0b2f6d7a64dda597e5ddf8546d7549d$export$radians, l = +this.l, a = isNaN(this.s) ? 0 : this.s * l * (1 - l), cosh = Math.cos(h), sinh = Math.sin(h);
    return new $7adb004cb218a5bbfe4f066d028c083f$export$Rgb(255 * (l + a * ($907db14e0037ee8c4008af6b27d5d5b9$var$A * cosh + $907db14e0037ee8c4008af6b27d5d5b9$var$B * sinh)), 255 * (l + a * ($907db14e0037ee8c4008af6b27d5d5b9$var$C * cosh + $907db14e0037ee8c4008af6b27d5d5b9$var$D * sinh)), 255 * (l + a * ($907db14e0037ee8c4008af6b27d5d5b9$var$E * cosh)), this.opacity);
  }
}));
/**
* Returns a linear scale to map elements in domain to elements in range.
* @param {Array} domain array of length two containing minimum and maximum values
* @param {Array} range array of length two containing minimum and maximum values
* @returns linear scale mapping domain to range
*/
function $ab472fc72a52ba79515db0c00f4f687a$export$scale(domain, range) {
  const domainLength = domain[1] - domain[0];
  const rangeLength = range[1] - range[0];
  const slope = rangeLength / domainLength;
  const intercept = range[1] - slope * domain[1];
  return x => slope * x + intercept;
}
/**
* Maps RGB values to integer for webgl buffer.
*
* @param {Integer} red value from 0 to 255
* @param {Integer} green value from 0 to 255
* @param {Integer} blue value from 0 to 255
* @returns RGB hex value as integer
*/
function $ab472fc72a52ba79515db0c00f4f687a$export$rgbToHex(red, green, blue) {
  return red << 16 | green << 8 | blue << 0;
}
function $ab472fc72a52ba79515db0c00f4f687a$export$rgbStringToHex(rgb) {
  const colorVals = rgb.substring(4, rgb.length - 1).split(",");
  return $ab472fc72a52ba79515db0c00f4f687a$export$rgbToHex(...colorVals.map(asStr => parseInt(asStr)));
}
function $ab472fc72a52ba79515db0c00f4f687a$export$colorSpecifierToHex(specifier) {
  if (!isNaN(specifier)) {
    // Specifier is already a hex value
    return Math.floor(specifier);
  }
  const asColor = $7adb004cb218a5bbfe4f066d028c083f$export$default(specifier);
  return $ab472fc72a52ba79515db0c00f4f687a$export$rgbToHex(asColor.r, asColor.g, asColor.b);
}
/**
* Get the VIEWPORT of the schema to be used by the mouseReader.
* If all types for a dimension across tracks are categorical or genomic,
* will default to [-1, 1] for that dimension for the mouseReader. If X or Y
* has a fixed value, it will consider the width or height channel domains.
*
* @param {Object} schema of visualization
* @returns [smallestX, largestX, smallestY, largestY] of viewport
*/
function $ab472fc72a52ba79515db0c00f4f687a$export$getViewportForSchema(schema) {
  let smallestX = Number.POSITIVE_INFINITY;
  let largestX = Number.NEGATIVE_INFINITY;
  let smallestY = Number.POSITIVE_INFINITY;
  let largestY = Number.NEGATIVE_INFINITY;
  schema.tracks.forEach(track => {
    let xDomain = track.x.domain;
    if (!xDomain && track.x.value !== undefined && track.width.domain !== undefined) {
      xDomain = track.width.domain;
    }
    let yDomain = track.y.domain;
    if (!yDomain && track.y.value !== undefined && track.height && track.height.domain !== undefined) {
      yDomain = track.height.domain;
    }
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
  return [smallestX, largestX, smallestY, largestY];
}
/**
* Given a schema, return a SCALE to be used for mapping data points to clip space
* for the drawer.
*
* @param {String} dimension either x or y
* @param {Object} schema for the visualization
* @returns function which can be used to map to an "x" or "y" value
*/
const $ab472fc72a52ba79515db0c00f4f687a$export$getScaleForSchema = (dimension, schema) => {
  if (dimension !== "x" && dimension !== "y") {
    console.error(`${dimension} is not x or y!`);
  }
  let genomic = false;
  let genome;
  for (const track of schema.tracks) {
    if (track[dimension].type && track[dimension].type.includes("genomic")) {
      genome = track[dimension].genome;
      genomic = true;
      break;
    }
  }
  if (!genomic) {
    const viewport = $ab472fc72a52ba79515db0c00f4f687a$export$getViewportForSchema(schema);
    if (dimension === "x") {
      return $ab472fc72a52ba79515db0c00f4f687a$export$scale([viewport[0], viewport[1]], [-1, 1]);
    }
    return $ab472fc72a52ba79515db0c00f4f687a$export$scale([viewport[2], viewport[3]], [-1, 1]);
  }
  const geneScale = $3ebbd6da2f6dbbd2ea0ba22bdc176caf$export$GenomeScale.completeScale(genome);
  let smallestGene = undefined;
  let smallestGeneValue = Number.POSITIVE_INFINITY;
  let largestGene = undefined;
  let largestGeneValue = Number.NEGATIVE_INFINITY;
  for (const track of schema.tracks) {
    let xDomain = track[dimension].domain;
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
  return new $3ebbd6da2f6dbbd2ea0ba22bdc176caf$export$GenomeScale(genome, [smallestGene, largestGene]);
};
const $ab472fc72a52ba79515db0c00f4f687a$var$DEFAULT_MARGIN = "2em";
const $ab472fc72a52ba79515db0c00f4f687a$export$getDimAndMarginStyleForSchema = schema => {
  if (schema.margins === undefined) {
    return {
      width: `calc(100% - ${$ab472fc72a52ba79515db0c00f4f687a$var$DEFAULT_MARGIN} - ${$ab472fc72a52ba79515db0c00f4f687a$var$DEFAULT_MARGIN}`,
      height: `calc(100% - ${$ab472fc72a52ba79515db0c00f4f687a$var$DEFAULT_MARGIN} - ${$ab472fc72a52ba79515db0c00f4f687a$var$DEFAULT_MARGIN}`,
      margin: $ab472fc72a52ba79515db0c00f4f687a$var$DEFAULT_MARGIN
    };
  }
  let toReturn = {};
  toReturn.width = `calc(100% - ${schema.margins.left || $ab472fc72a52ba79515db0c00f4f687a$var$DEFAULT_MARGIN} - ${schema.margins.right || $ab472fc72a52ba79515db0c00f4f687a$var$DEFAULT_MARGIN})`;
  toReturn.height = `calc(100% - ${schema.margins.top || $ab472fc72a52ba79515db0c00f4f687a$var$DEFAULT_MARGIN} - ${schema.margins.bottom || $ab472fc72a52ba79515db0c00f4f687a$var$DEFAULT_MARGIN})`;
  // Shorthand for top right bottom left
  toReturn.margin = `${schema.margins.top || $ab472fc72a52ba79515db0c00f4f687a$var$DEFAULT_MARGIN}
                     ${schema.margins.right || $ab472fc72a52ba79515db0c00f4f687a$var$DEFAULT_MARGIN}
                     ${schema.margins.bottom || $ab472fc72a52ba79515db0c00f4f687a$var$DEFAULT_MARGIN}
                     ${schema.margins.left || $ab472fc72a52ba79515db0c00f4f687a$var$DEFAULT_MARGIN}`;
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
*/
const $ab472fc72a52ba79515db0c00f4f687a$export$getQuadraticBezierCurveForPoints = (P0, P1, P2) => {
  const x = t => (1 - t) ** 2 * P0[0] + 2 * t * (1 - t) * P1[0] + t ** 2 * P2[0];
  const y = t => (1 - t) ** 2 * P0[1] + 2 * t * (1 - t) * P1[1] + t ** 2 * P2[1];
  return t => [x(t), y(t)];
};
$parcel$export($ab472fc72a52ba79515db0c00f4f687a$exports, "getQuadraticBezierCurveForPoints", function () {
  return $ab472fc72a52ba79515db0c00f4f687a$export$getQuadraticBezierCurveForPoints;
});
$parcel$export($ab472fc72a52ba79515db0c00f4f687a$exports, "getScaleForSchema", function () {
  return $ab472fc72a52ba79515db0c00f4f687a$export$getScaleForSchema;
});
$parcel$export($ab472fc72a52ba79515db0c00f4f687a$exports, "colorSpecifierToHex", function () {
  return $ab472fc72a52ba79515db0c00f4f687a$export$colorSpecifierToHex;
});
$parcel$export($ab472fc72a52ba79515db0c00f4f687a$exports, "rgbStringToHex", function () {
  return $ab472fc72a52ba79515db0c00f4f687a$export$rgbStringToHex;
});
$parcel$export($ab472fc72a52ba79515db0c00f4f687a$exports, "scale", function () {
  return $ab472fc72a52ba79515db0c00f4f687a$export$scale;
});
// ASSET: src/epiviz.gl/vertex-calculator.js
var $2a4f8c7882dfdea78821148c89bf8779$exports = {};
// Each size unit refers to 1/200 of the clip space
// e.g. if the canvas is 1000x1000 pixels, and the size value for a mark
// is 10, then that mark takes up 10/200 = 1/20 of the clip space which
// is equal to 50 pixels
const $2a4f8c7882dfdea78821148c89bf8779$export$SIZE_UNITS = 1 / 100;
const $2a4f8c7882dfdea78821148c89bf8779$var$NUMBER_OF_VERTICES_PER_ARC = 20;
const $2a4f8c7882dfdea78821148c89bf8779$var$ARC_HEIGHT_MODIFIER = 10;
/**
* Get a curve representing the arc with given start and end points
*
* https://math.stackexchange.com/a/1484684
*
* @param {Array} P0 start of arc
* @param {Array} P2 end of arc
* @returns function mapping 0 to beginning of arc, and 1 to end of arc
*/
const $2a4f8c7882dfdea78821148c89bf8779$var$getCurveForArc = (P0, P2) => {
  const midpoint = [P0[0] / 2 + P2[0] / 2, P0[1] / 2 + P2[1] / 2];
  const slope = (P2[1] - P0[1]) / (P2[0] - P0[0]);
  const distance = Math.sqrt((P2[1] - P0[1]) ** 2 + (P2[0] - P0[0]) ** 2);
  if (!isFinite(slope)) {
    // vertical slope
    return $ab472fc72a52ba79515db0c00f4f687a$export$getQuadraticBezierCurveForPoints(P0, [P0[0] - distance, midpoint[1]], P2);
  }
  const parameterized = t => [midpoint[0] + t / distance * (P0[1] - P2[1]), midpoint[1] + t / distance * (P2[0] - P0[0])];
  return $ab472fc72a52ba79515db0c00f4f687a$export$getQuadraticBezierCurveForPoints(P0, parameterized(distance * $2a4f8c7882dfdea78821148c89bf8779$var$ARC_HEIGHT_MODIFIER), P2);
};
class $2a4f8c7882dfdea78821148c89bf8779$export$default {
  /**
  * A class used to construct the vertices of marks that are given to the drawer to draw.
  *
  * @param {Function or GenomeScale} xScale maps the x values of the data to clip space [-1, 1]
  * @param {Function or GenomeScale} yScale maps the y values of the data to clip space [-1, 1]
  * @param {Object} track from schema
  */
  constructor(xScale, yScale, track) {
    if (xScale instanceof $3ebbd6da2f6dbbd2ea0ba22bdc176caf$export$GenomeScale) {
      this.xScale = xScale.toCallable();
    } else {
      this.xScale = xScale;
    }
    if (yScale instanceof $3ebbd6da2f6dbbd2ea0ba22bdc176caf$export$GenomeScale) {
      this.yScale = yScale.toCallable();
    } else {
      this.yScale = yScale;
    }
    this.track = track;
    this.drawMode = $a482b49601c034373694faa8888ffe15$export$getDrawModeForTrack(track);
  }
  /**
  * Transform a mark with a range for coordinates into a simpler mark to draw.
  *
  * @param {Object} mark that contains ranges for x or y
  * @returns mark with fixed x and y but with appropriate width and height for drawing
  */
  transformGenomicRangeToStandard(mark) {
    let x, y, width, height;
    if (Array.isArray(mark.x)) {
      let x1 = this.xScale([mark.x[0], mark.x[1]]);
      x = [mark.x[0], mark.x[1]];
      width = (this.xScale([mark.x[2], mark.x[3]]) - x1) / $2a4f8c7882dfdea78821148c89bf8779$export$SIZE_UNITS;
    } else {
      x = mark.x;
      width = mark.width;
    }
    if (Array.isArray(mark.y)) {
      y = this.yScale([mark.y[0], mark.y[1]]);
      height = (this.yScale([mark.y[2], mark.y[3]]) - y) / $2a4f8c7882dfdea78821148c89bf8779$export$SIZE_UNITS;
    } else {
      y = mark.y;
      height = mark.height;
    }
    return {
      x,
      y,
      width,
      height
    };
  }
  /**
  * Transform a mark with a range for coordinates and a range for width or height into a simpler mark to draw.
  *
  * @param {Object} mark that contains ranges for x and y, and potentially ranges for width and height
  * @returns mark with fixed x, y, width, and height for drawing
  */
  transformGenomicRangeArcToStandard(mark) {
    let x, y, width, height;
    if (Array.isArray(mark.x)) {
      x = this.xScale.getMidpoint(...mark.x);
      let x2 = this.xScale.getMidpoint(...mark.width);
      let x1ClipSpace = this.xScale(x);
      let x2ClipSpace = this.xScale(x2);
      x = x1ClipSpace < x2ClipSpace ? x : x2;
      width = Math.abs(this.xScale(x2) - x1ClipSpace) / $2a4f8c7882dfdea78821148c89bf8779$export$SIZE_UNITS;
    } else {
      x = mark.x;
      width = mark.width;
    }
    if (Array.isArray(mark.y)) {
      y = this.yScale.getMidpoint(...mark.y);
      let y2 = this.yScale.getMidpoint(...mark.height);
      let y1ClipSpace = this.xScale(y);
      let y2ClipSpace = this.xScale(y2);
      y = y1ClipSpace < y2ClipSpace ? y : y2;
      height = Math.abs(this.yScale(y2) - y1ClipSpace) / $2a4f8c7882dfdea78821148c89bf8779$export$SIZE_UNITS;
    } else {
      y = mark.y;
      height = mark.height;
    }
    return {
      x,
      y,
      width,
      height
    };
  }
  /**
  * Construct the vertices of a mark.
  *
  * @param {Object} mark to draw
  * @returns vertices of mark
  */
  calculateForMark(mark) {
    if (this.track.x.type === "genomicRange" || this.track.y.type === "genomicRange") {
      if (this.track.mark === "arc") {
        return this._calculateForMark(this.transformGenomicRangeArcToStandard(mark));
      }
      return this._calculateForMark(this.transformGenomicRangeToStandard(mark));
    }
    return this._calculateForMark(mark);
  }
  _calculateForMark(mark) {
    if (this.track.mark === "area") {
      const toReturn = this._getVerticesForAreaSection(mark);
      this.lastMark = mark;
      return toReturn;
    }
    if (this.track.mark === "tick") {
      return this._getVerticesForTick(mark);
    }
    if (this.track.mark === "line") {
      return this._getVertexForDot(mark);
    }
    if (this.track.mark === "rect") {
      return this._getVerticesForRect(mark);
    }
    if (this.track.mark === "arc") {
      return this._getVerticesForArc(mark);
    }
    switch (mark.shape) {
      case "dot":
        if (this.drawMode === "POINTS") {
          return this._getVertexForDot(mark);
        } else {
          return this._getVerticesForSquare(mark);
        }
      case "triangle":
        return this._getVerticesForTriangle(mark);
      case "diamond":
        return this._getVerticesForPolygon(mark, 4);
      case "pentagon":
        return this._getVerticesForPolygon(mark, 5);
      case "hexagon":
        return this._getVerticesForPolygon(mark, 6);
      case "circle":
        return this._getVerticesForPolygon(mark, 16);
      case "cross":
        return this._getVerticesForCross(mark);
    }
  }
  _mapToGPUSpace(vertices) {
    let isX = false;
    return vertices.map(coord => {
      isX = !isX;
      return isX ? this.xScale(coord) : this.yScale(coord);
    });
  }
  _getVerticesForArc(mark) {
    const startPoint = this._mapToGPUSpace([mark.x, mark.y]);
    const quadraticCurve = $2a4f8c7882dfdea78821148c89bf8779$var$getCurveForArc(startPoint, [startPoint[0] + mark.width * $2a4f8c7882dfdea78821148c89bf8779$export$SIZE_UNITS, startPoint[1] + mark.height * $2a4f8c7882dfdea78821148c89bf8779$export$SIZE_UNITS]);
    const vertices = [...quadraticCurve(0), ...quadraticCurve(1 / $2a4f8c7882dfdea78821148c89bf8779$var$NUMBER_OF_VERTICES_PER_ARC)];
    for (let i = 2; i < $2a4f8c7882dfdea78821148c89bf8779$var$NUMBER_OF_VERTICES_PER_ARC + 1; i++) {
      const nextPoint = quadraticCurve(i / $2a4f8c7882dfdea78821148c89bf8779$var$NUMBER_OF_VERTICES_PER_ARC);
      vertices.push(vertices[vertices.length - 2], vertices[vertices.length - 1], nextPoint[0], nextPoint[1]);
    }
    return vertices;
  }
  _getVerticesForAreaSection(mark) {
    if (!this.lastMark) {
      return [];
    }
    return this._mapToGPUSpace([mark.x, mark.y, this.lastMark.x, this.lastMark.y, mark.x, 0, // TODO: Replace 0 to let area charts center around some other number
    this.lastMark.x, this.lastMark.y, this.lastMark.x, 0, mark.x, 0]);
  }
  _getVerticesForPolygon(mark, sides) {
    const center = this._mapToGPUSpace([mark.x, mark.y]);
    const vertices = [];
    for (let theta = 0; theta < 2 * Math.PI; theta += 2 * Math.PI / sides) {
      vertices.push(center[0], center[1], center[0] + mark.size / 2 * Math.cos(theta) * $2a4f8c7882dfdea78821148c89bf8779$export$SIZE_UNITS, center[1] + mark.size / 2 * Math.sin(theta) * $2a4f8c7882dfdea78821148c89bf8779$export$SIZE_UNITS, center[0] + mark.size / 2 * Math.cos(theta + 2 * Math.PI / sides) * $2a4f8c7882dfdea78821148c89bf8779$export$SIZE_UNITS, center[1] + mark.size / 2 * Math.sin(theta + 2 * Math.PI / sides) * $2a4f8c7882dfdea78821148c89bf8779$export$SIZE_UNITS);
    }
    return vertices;
  }
  _getVerticesForTriangle(mark) {
    // 1
    // / \
    // 2---3
    const center = this._mapToGPUSpace([mark.x, mark.y]);
    return [center[0], center[1] + mark.size / 2 * $2a4f8c7882dfdea78821148c89bf8779$export$SIZE_UNITS, center[0] - mark.size / 2 * $2a4f8c7882dfdea78821148c89bf8779$export$SIZE_UNITS, center[1] - mark.size / 2 * $2a4f8c7882dfdea78821148c89bf8779$export$SIZE_UNITS, center[0] + mark.size / 2 * $2a4f8c7882dfdea78821148c89bf8779$export$SIZE_UNITS, center[1] - mark.size / 2 * $2a4f8c7882dfdea78821148c89bf8779$export$SIZE_UNITS];
  }
  _getVertexForDot = mark => this._mapToGPUSpace([mark.x, mark.y]);
  _getVerticesForSquare(mark) {
    const center = this._mapToGPUSpace([mark.x, mark.y]);
    return [center[0] + mark.size / 2 * $2a4f8c7882dfdea78821148c89bf8779$export$SIZE_UNITS, // 2------1,4
    center[1] + mark.size / 2 * $2a4f8c7882dfdea78821148c89bf8779$export$SIZE_UNITS, // |    /  |
    center[0] - mark.size / 2 * $2a4f8c7882dfdea78821148c89bf8779$export$SIZE_UNITS, // |  /    |
    center[1] + mark.size / 2 * $2a4f8c7882dfdea78821148c89bf8779$export$SIZE_UNITS, // 3,5------6
    center[0] - mark.size / 2 * $2a4f8c7882dfdea78821148c89bf8779$export$SIZE_UNITS, center[1] - mark.size / 2 * $2a4f8c7882dfdea78821148c89bf8779$export$SIZE_UNITS, center[0] + mark.size / 2 * $2a4f8c7882dfdea78821148c89bf8779$export$SIZE_UNITS, center[1] + mark.size / 2 * $2a4f8c7882dfdea78821148c89bf8779$export$SIZE_UNITS, center[0] - mark.size / 2 * $2a4f8c7882dfdea78821148c89bf8779$export$SIZE_UNITS, center[1] - mark.size / 2 * $2a4f8c7882dfdea78821148c89bf8779$export$SIZE_UNITS, center[0] + mark.size / 2 * $2a4f8c7882dfdea78821148c89bf8779$export$SIZE_UNITS, center[1] - mark.size / 2 * $2a4f8c7882dfdea78821148c89bf8779$export$SIZE_UNITS];
  }
  _getVerticesForRect(mark) {
    // 1-----------3,6
    // |       /    |
    // |     /      |
    // 2,5-----------4
    const center = this._mapToGPUSpace([mark.x, mark.y]);
    return [center[0], center[1] + mark.height * $2a4f8c7882dfdea78821148c89bf8779$export$SIZE_UNITS, center[0], center[1], center[0] + mark.width * $2a4f8c7882dfdea78821148c89bf8779$export$SIZE_UNITS, center[1] + mark.height * $2a4f8c7882dfdea78821148c89bf8779$export$SIZE_UNITS, center[0] + mark.width * $2a4f8c7882dfdea78821148c89bf8779$export$SIZE_UNITS, center[1], center[0], center[1], center[0] + mark.width * $2a4f8c7882dfdea78821148c89bf8779$export$SIZE_UNITS, center[1] + mark.height * $2a4f8c7882dfdea78821148c89bf8779$export$SIZE_UNITS];
  }
  _getVerticesForTick(mark) {
    const center = this._mapToGPUSpace([mark.x, mark.y]);
    // 1----2
    if (this.track.width) {
      return [center[0] + mark.width / 2 * $2a4f8c7882dfdea78821148c89bf8779$export$SIZE_UNITS, center[1], center[0] - mark.width / 2 * $2a4f8c7882dfdea78821148c89bf8779$export$SIZE_UNITS, center[1]];
    }
    // 1
    // |
    // 2
    if (mark.height) {
      // default to mark value which has default if height never specified in track
      return [center[0], center[1] + mark.height / 2 * $2a4f8c7882dfdea78821148c89bf8779$export$SIZE_UNITS, center[0], center[1] - mark.height / 2 * $2a4f8c7882dfdea78821148c89bf8779$export$SIZE_UNITS];
    }
  }
}
$parcel$export($2a4f8c7882dfdea78821148c89bf8779$exports, "default", function () {
  return $2a4f8c7882dfdea78821148c89bf8779$export$default;
});
$parcel$export($2a4f8c7882dfdea78821148c89bf8779$exports, "SIZE_UNITS", function () {
  return $2a4f8c7882dfdea78821148c89bf8779$export$SIZE_UNITS;
});
// ASSET: node_modules/d3-scale-chromatic/src/index.js
var $a6585f17c7dfd9074a79b848521aadca$exports = {};
var $b993ccc2bef98b0a048e4ae6af424d10$export$default = function (specifier) {
  var n = specifier.length / 6 | 0, colors = new Array(n), i = 0;
  while (i < n) colors[i] = "#" + specifier.slice(i * 6, ++i * 6);
  return colors;
};
var $1c2388b24a08a8c5c4b4a5cd823ef2a2$export$default = $b993ccc2bef98b0a048e4ae6af424d10$export$default("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf");
var $daaf170336f85600a561ca2a79331623$export$default = $b993ccc2bef98b0a048e4ae6af424d10$export$default("7fc97fbeaed4fdc086ffff99386cb0f0027fbf5b17666666");
var $a1586d0676b0cf4b54ff13d3f98554aa$export$default = $b993ccc2bef98b0a048e4ae6af424d10$export$default("1b9e77d95f027570b3e7298a66a61ee6ab02a6761d666666");
var $f4e33cd59b2243d36ba7cbda5842b16e$export$default = $b993ccc2bef98b0a048e4ae6af424d10$export$default("a6cee31f78b4b2df8a33a02cfb9a99e31a1cfdbf6fff7f00cab2d66a3d9affff99b15928");
var $302a5165d6996c31debd95f4507688a9$export$default = $b993ccc2bef98b0a048e4ae6af424d10$export$default("fbb4aeb3cde3ccebc5decbe4fed9a6ffffcce5d8bdfddaecf2f2f2");
var $703c45afabbacacc45ba45d0f8a6d4e8$export$default = $b993ccc2bef98b0a048e4ae6af424d10$export$default("b3e2cdfdcdaccbd5e8f4cae4e6f5c9fff2aef1e2cccccccc");
var $bbbfb6f1004a989556ca216b40233366$export$default = $b993ccc2bef98b0a048e4ae6af424d10$export$default("e41a1c377eb84daf4a984ea3ff7f00ffff33a65628f781bf999999");
var $13a75532345e28058fe3274a13b3aed7$export$default = $b993ccc2bef98b0a048e4ae6af424d10$export$default("66c2a5fc8d628da0cbe78ac3a6d854ffd92fe5c494b3b3b3");
var $bce65b44d26736da6e5d3cdddedcf3a3$export$default = $b993ccc2bef98b0a048e4ae6af424d10$export$default("8dd3c7ffffb3bebadafb807280b1d3fdb462b3de69fccde5d9d9d9bc80bdccebc5ffed6f");
var $2e8be7d1a21851853658d2dd3e3e4e26$export$default = $b993ccc2bef98b0a048e4ae6af424d10$export$default("4e79a7f28e2ce1575976b7b259a14fedc949af7aa1ff9da79c755fbab0ab");
function $375599a4da1b65d5cb14727ae1c76440$export$basis(t1, v0, v1, v2, v3) {
  var t2 = t1 * t1, t3 = t2 * t1;
  return ((1 - 3 * t1 + 3 * t2 - t3) * v0 + (4 - 6 * t2 + 3 * t3) * v1 + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2 + t3 * v3) / 6;
}
var $375599a4da1b65d5cb14727ae1c76440$export$default = function (values) {
  var n = values.length - 1;
  return function (t) {
    var i = t <= 0 ? t = 0 : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n), v1 = values[i], v2 = values[i + 1], v0 = i > 0 ? values[i - 1] : 2 * v1 - v2, v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
    return $375599a4da1b65d5cb14727ae1c76440$export$basis((t - i / n) * n, v0, v1, v2, v3);
  };
};
var $9338a87a16bc424e68aa2b9c0bef27c2$export$default = function (values) {
  var n = values.length;
  return function (t) {
    var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n), v0 = values[(i + n - 1) % n], v1 = values[i % n], v2 = values[(i + 1) % n], v3 = values[(i + 2) % n];
    return $375599a4da1b65d5cb14727ae1c76440$export$basis((t - i / n) * n, v0, v1, v2, v3);
  };
};
var $953c1c08710525f1329d0d2076e9a2f5$export$default = x => () => x;
function $f05c0f1df18cdcbb8c89bd834a74fba3$var$linear(a, d) {
  return function (t) {
    return a + t * d;
  };
}
function $f05c0f1df18cdcbb8c89bd834a74fba3$var$exponential(a, b, y) {
  return (a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function (t) {
    return Math.pow(a + t * b, y);
  });
}
function $f05c0f1df18cdcbb8c89bd834a74fba3$export$hue(a, b) {
  var d = b - a;
  return d ? $f05c0f1df18cdcbb8c89bd834a74fba3$var$linear(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : $953c1c08710525f1329d0d2076e9a2f5$export$default(isNaN(a) ? b : a);
}
function $f05c0f1df18cdcbb8c89bd834a74fba3$export$gamma(y) {
  return (y = +y) === 1 ? $f05c0f1df18cdcbb8c89bd834a74fba3$export$default : function (a, b) {
    return b - a ? $f05c0f1df18cdcbb8c89bd834a74fba3$var$exponential(a, b, y) : $953c1c08710525f1329d0d2076e9a2f5$export$default(isNaN(a) ? b : a);
  };
}
function $f05c0f1df18cdcbb8c89bd834a74fba3$export$default(a, b) {
  var d = b - a;
  return d ? $f05c0f1df18cdcbb8c89bd834a74fba3$var$linear(a, d) : $953c1c08710525f1329d0d2076e9a2f5$export$default(isNaN(a) ? b : a);
}
var $8867071bf24ff06c98ed0266655b2aed$export$default = (function rgbGamma(y) {
  var color = $f05c0f1df18cdcbb8c89bd834a74fba3$export$gamma(y);
  function rgb(start, end) {
    var r = color((start = $7adb004cb218a5bbfe4f066d028c083f$export$rgb(start)).r, (end = $7adb004cb218a5bbfe4f066d028c083f$export$rgb(end)).r), g = color(start.g, end.g), b = color(start.b, end.b), opacity = $f05c0f1df18cdcbb8c89bd834a74fba3$export$default(start.opacity, end.opacity);
    return function (t) {
      start.r = r(t);
      start.g = g(t);
      start.b = b(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }
  rgb.gamma = rgbGamma;
  return rgb;
})(1);
function $8867071bf24ff06c98ed0266655b2aed$var$rgbSpline(spline) {
  return function (colors) {
    var n = colors.length, r = new Array(n), g = new Array(n), b = new Array(n), i, color;
    for (i = 0; i < n; ++i) {
      color = $7adb004cb218a5bbfe4f066d028c083f$export$rgb(colors[i]);
      r[i] = color.r || 0;
      g[i] = color.g || 0;
      b[i] = color.b || 0;
    }
    r = spline(r);
    g = spline(g);
    b = spline(b);
    color.opacity = 1;
    return function (t) {
      color.r = r(t);
      color.g = g(t);
      color.b = b(t);
      return color + "";
    };
  };
}
var $8867071bf24ff06c98ed0266655b2aed$export$rgbBasis = $8867071bf24ff06c98ed0266655b2aed$var$rgbSpline($375599a4da1b65d5cb14727ae1c76440$export$default);
var $8867071bf24ff06c98ed0266655b2aed$export$rgbBasisClosed = $8867071bf24ff06c98ed0266655b2aed$var$rgbSpline($9338a87a16bc424e68aa2b9c0bef27c2$export$default);
function $16dfd74275b7f3f919ed1886368053ad$var$cubehelix(hue) {
  return (function cubehelixGamma(y) {
    y = +y;
    function cubehelix(start, end) {
      var h = hue((start = $907db14e0037ee8c4008af6b27d5d5b9$export$default(start)).h, (end = $907db14e0037ee8c4008af6b27d5d5b9$export$default(end)).h), s = $f05c0f1df18cdcbb8c89bd834a74fba3$export$default(start.s, end.s), l = $f05c0f1df18cdcbb8c89bd834a74fba3$export$default(start.l, end.l), opacity = $f05c0f1df18cdcbb8c89bd834a74fba3$export$default(start.opacity, end.opacity);
      return function (t) {
        start.h = h(t);
        start.s = s(t);
        start.l = l(Math.pow(t, y));
        start.opacity = opacity(t);
        return start + "";
      };
    }
    cubehelix.gamma = cubehelixGamma;
    return cubehelix;
  })(1);
}
var $16dfd74275b7f3f919ed1886368053ad$export$default = $16dfd74275b7f3f919ed1886368053ad$var$cubehelix($f05c0f1df18cdcbb8c89bd834a74fba3$export$hue);
var $16dfd74275b7f3f919ed1886368053ad$export$cubehelixLong = $16dfd74275b7f3f919ed1886368053ad$var$cubehelix($f05c0f1df18cdcbb8c89bd834a74fba3$export$default);
var $73cad1193ccab38ba0d3432bf2f218b9$export$default = scheme => $8867071bf24ff06c98ed0266655b2aed$export$rgbBasis(scheme[scheme.length - 1]);
var $3c4a87764ee6fb16aeb2474e35fdab1b$export$scheme = new Array(3).concat("d8b365f5f5f55ab4ac", "a6611adfc27d80cdc1018571", "a6611adfc27df5f5f580cdc1018571", "8c510ad8b365f6e8c3c7eae55ab4ac01665e", "8c510ad8b365f6e8c3f5f5f5c7eae55ab4ac01665e", "8c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e", "8c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e", "5430058c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e003c30", "5430058c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e003c30").map($b993ccc2bef98b0a048e4ae6af424d10$export$default);
var $3c4a87764ee6fb16aeb2474e35fdab1b$export$default = $73cad1193ccab38ba0d3432bf2f218b9$export$default($3c4a87764ee6fb16aeb2474e35fdab1b$export$scheme);
var $24ddf36673e9e28e0941341dc3c785f2$export$scheme = new Array(3).concat("af8dc3f7f7f77fbf7b", "7b3294c2a5cfa6dba0008837", "7b3294c2a5cff7f7f7a6dba0008837", "762a83af8dc3e7d4e8d9f0d37fbf7b1b7837", "762a83af8dc3e7d4e8f7f7f7d9f0d37fbf7b1b7837", "762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b7837", "762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b7837", "40004b762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b783700441b", "40004b762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b783700441b").map($b993ccc2bef98b0a048e4ae6af424d10$export$default);
var $24ddf36673e9e28e0941341dc3c785f2$export$default = $73cad1193ccab38ba0d3432bf2f218b9$export$default($24ddf36673e9e28e0941341dc3c785f2$export$scheme);
var $179a8b8b8db67d5ad439d6ac3c7182eb$export$scheme = new Array(3).concat("e9a3c9f7f7f7a1d76a", "d01c8bf1b6dab8e1864dac26", "d01c8bf1b6daf7f7f7b8e1864dac26", "c51b7de9a3c9fde0efe6f5d0a1d76a4d9221", "c51b7de9a3c9fde0eff7f7f7e6f5d0a1d76a4d9221", "c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221", "c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221", "8e0152c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221276419", "8e0152c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221276419").map($b993ccc2bef98b0a048e4ae6af424d10$export$default);
var $179a8b8b8db67d5ad439d6ac3c7182eb$export$default = $73cad1193ccab38ba0d3432bf2f218b9$export$default($179a8b8b8db67d5ad439d6ac3c7182eb$export$scheme);
var $524816fcdb13536f80495f736d65917f$export$scheme = new Array(3).concat("998ec3f7f7f7f1a340", "5e3c99b2abd2fdb863e66101", "5e3c99b2abd2f7f7f7fdb863e66101", "542788998ec3d8daebfee0b6f1a340b35806", "542788998ec3d8daebf7f7f7fee0b6f1a340b35806", "5427888073acb2abd2d8daebfee0b6fdb863e08214b35806", "5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b35806", "2d004b5427888073acb2abd2d8daebfee0b6fdb863e08214b358067f3b08", "2d004b5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b358067f3b08").map($b993ccc2bef98b0a048e4ae6af424d10$export$default);
var $524816fcdb13536f80495f736d65917f$export$default = $73cad1193ccab38ba0d3432bf2f218b9$export$default($524816fcdb13536f80495f736d65917f$export$scheme);
var $251124b56c5394ac8628405b3de84fa9$export$scheme = new Array(3).concat("ef8a62f7f7f767a9cf", "ca0020f4a58292c5de0571b0", "ca0020f4a582f7f7f792c5de0571b0", "b2182bef8a62fddbc7d1e5f067a9cf2166ac", "b2182bef8a62fddbc7f7f7f7d1e5f067a9cf2166ac", "b2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac", "b2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac", "67001fb2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac053061", "67001fb2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac053061").map($b993ccc2bef98b0a048e4ae6af424d10$export$default);
var $251124b56c5394ac8628405b3de84fa9$export$default = $73cad1193ccab38ba0d3432bf2f218b9$export$default($251124b56c5394ac8628405b3de84fa9$export$scheme);
var $32431bf18441a7fb330db070edfc883c$export$scheme = new Array(3).concat("ef8a62ffffff999999", "ca0020f4a582bababa404040", "ca0020f4a582ffffffbababa404040", "b2182bef8a62fddbc7e0e0e09999994d4d4d", "b2182bef8a62fddbc7ffffffe0e0e09999994d4d4d", "b2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d", "b2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d", "67001fb2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d1a1a1a", "67001fb2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d1a1a1a").map($b993ccc2bef98b0a048e4ae6af424d10$export$default);
var $32431bf18441a7fb330db070edfc883c$export$default = $73cad1193ccab38ba0d3432bf2f218b9$export$default($32431bf18441a7fb330db070edfc883c$export$scheme);
var $c7f5f49b22ec5b34595f49a2fd2aaee1$export$scheme = new Array(3).concat("fc8d59ffffbf91bfdb", "d7191cfdae61abd9e92c7bb6", "d7191cfdae61ffffbfabd9e92c7bb6", "d73027fc8d59fee090e0f3f891bfdb4575b4", "d73027fc8d59fee090ffffbfe0f3f891bfdb4575b4", "d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4", "d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4", "a50026d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4313695", "a50026d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4313695").map($b993ccc2bef98b0a048e4ae6af424d10$export$default);
var $c7f5f49b22ec5b34595f49a2fd2aaee1$export$default = $73cad1193ccab38ba0d3432bf2f218b9$export$default($c7f5f49b22ec5b34595f49a2fd2aaee1$export$scheme);
var $ba7b47a993698c5e9e0a2e9254961594$export$scheme = new Array(3).concat("fc8d59ffffbf91cf60", "d7191cfdae61a6d96a1a9641", "d7191cfdae61ffffbfa6d96a1a9641", "d73027fc8d59fee08bd9ef8b91cf601a9850", "d73027fc8d59fee08bffffbfd9ef8b91cf601a9850", "d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850", "d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850", "a50026d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850006837", "a50026d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850006837").map($b993ccc2bef98b0a048e4ae6af424d10$export$default);
var $ba7b47a993698c5e9e0a2e9254961594$export$default = $73cad1193ccab38ba0d3432bf2f218b9$export$default($ba7b47a993698c5e9e0a2e9254961594$export$scheme);
var $ef633573a4755592e04a764629b71759$export$scheme = new Array(3).concat("fc8d59ffffbf99d594", "d7191cfdae61abdda42b83ba", "d7191cfdae61ffffbfabdda42b83ba", "d53e4ffc8d59fee08be6f59899d5943288bd", "d53e4ffc8d59fee08bffffbfe6f59899d5943288bd", "d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd", "d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd", "9e0142d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd5e4fa2", "9e0142d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd5e4fa2").map($b993ccc2bef98b0a048e4ae6af424d10$export$default);
var $ef633573a4755592e04a764629b71759$export$default = $73cad1193ccab38ba0d3432bf2f218b9$export$default($ef633573a4755592e04a764629b71759$export$scheme);
var $ae28bb9ab23f5f71e8524ba5eccd92b9$export$scheme = new Array(3).concat("e5f5f999d8c92ca25f", "edf8fbb2e2e266c2a4238b45", "edf8fbb2e2e266c2a42ca25f006d2c", "edf8fbccece699d8c966c2a42ca25f006d2c", "edf8fbccece699d8c966c2a441ae76238b45005824", "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45005824", "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45006d2c00441b").map($b993ccc2bef98b0a048e4ae6af424d10$export$default);
var $ae28bb9ab23f5f71e8524ba5eccd92b9$export$default = $73cad1193ccab38ba0d3432bf2f218b9$export$default($ae28bb9ab23f5f71e8524ba5eccd92b9$export$scheme);
var $5f8c2f587a94f823c8a1f6d04f550a7e$export$scheme = new Array(3).concat("e0ecf49ebcda8856a7", "edf8fbb3cde38c96c688419d", "edf8fbb3cde38c96c68856a7810f7c", "edf8fbbfd3e69ebcda8c96c68856a7810f7c", "edf8fbbfd3e69ebcda8c96c68c6bb188419d6e016b", "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d6e016b", "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d810f7c4d004b").map($b993ccc2bef98b0a048e4ae6af424d10$export$default);
var $5f8c2f587a94f823c8a1f6d04f550a7e$export$default = $73cad1193ccab38ba0d3432bf2f218b9$export$default($5f8c2f587a94f823c8a1f6d04f550a7e$export$scheme);
var $c0f014e903576e81ccb408b364b01a28$export$scheme = new Array(3).concat("e0f3dba8ddb543a2ca", "f0f9e8bae4bc7bccc42b8cbe", "f0f9e8bae4bc7bccc443a2ca0868ac", "f0f9e8ccebc5a8ddb57bccc443a2ca0868ac", "f0f9e8ccebc5a8ddb57bccc44eb3d32b8cbe08589e", "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe08589e", "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe0868ac084081").map($b993ccc2bef98b0a048e4ae6af424d10$export$default);
var $c0f014e903576e81ccb408b364b01a28$export$default = $73cad1193ccab38ba0d3432bf2f218b9$export$default($c0f014e903576e81ccb408b364b01a28$export$scheme);
var $a24c32d9b190bf1f53fcdba09c8f3cdb$export$scheme = new Array(3).concat("fee8c8fdbb84e34a33", "fef0d9fdcc8afc8d59d7301f", "fef0d9fdcc8afc8d59e34a33b30000", "fef0d9fdd49efdbb84fc8d59e34a33b30000", "fef0d9fdd49efdbb84fc8d59ef6548d7301f990000", "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301f990000", "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301fb300007f0000").map($b993ccc2bef98b0a048e4ae6af424d10$export$default);
var $a24c32d9b190bf1f53fcdba09c8f3cdb$export$default = $73cad1193ccab38ba0d3432bf2f218b9$export$default($a24c32d9b190bf1f53fcdba09c8f3cdb$export$scheme);
var $b34a4a6860e6e162cac5f376a7c2bce7$export$scheme = new Array(3).concat("ece2f0a6bddb1c9099", "f6eff7bdc9e167a9cf02818a", "f6eff7bdc9e167a9cf1c9099016c59", "f6eff7d0d1e6a6bddb67a9cf1c9099016c59", "f6eff7d0d1e6a6bddb67a9cf3690c002818a016450", "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016450", "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016c59014636").map($b993ccc2bef98b0a048e4ae6af424d10$export$default);
var $b34a4a6860e6e162cac5f376a7c2bce7$export$default = $73cad1193ccab38ba0d3432bf2f218b9$export$default($b34a4a6860e6e162cac5f376a7c2bce7$export$scheme);
var $f48132aac8a2014065ca5df06491084d$export$scheme = new Array(3).concat("ece7f2a6bddb2b8cbe", "f1eef6bdc9e174a9cf0570b0", "f1eef6bdc9e174a9cf2b8cbe045a8d", "f1eef6d0d1e6a6bddb74a9cf2b8cbe045a8d", "f1eef6d0d1e6a6bddb74a9cf3690c00570b0034e7b", "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0034e7b", "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0045a8d023858").map($b993ccc2bef98b0a048e4ae6af424d10$export$default);
var $f48132aac8a2014065ca5df06491084d$export$default = $73cad1193ccab38ba0d3432bf2f218b9$export$default($f48132aac8a2014065ca5df06491084d$export$scheme);
var $d98461135c1642b9760794d23f50da25$export$scheme = new Array(3).concat("e7e1efc994c7dd1c77", "f1eef6d7b5d8df65b0ce1256", "f1eef6d7b5d8df65b0dd1c77980043", "f1eef6d4b9dac994c7df65b0dd1c77980043", "f1eef6d4b9dac994c7df65b0e7298ace125691003f", "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125691003f", "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125698004367001f").map($b993ccc2bef98b0a048e4ae6af424d10$export$default);
var $d98461135c1642b9760794d23f50da25$export$default = $73cad1193ccab38ba0d3432bf2f218b9$export$default($d98461135c1642b9760794d23f50da25$export$scheme);
var $b87c5c3c52d2bf6473e3343ea2737700$export$scheme = new Array(3).concat("fde0ddfa9fb5c51b8a", "feebe2fbb4b9f768a1ae017e", "feebe2fbb4b9f768a1c51b8a7a0177", "feebe2fcc5c0fa9fb5f768a1c51b8a7a0177", "feebe2fcc5c0fa9fb5f768a1dd3497ae017e7a0177", "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a0177", "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a017749006a").map($b993ccc2bef98b0a048e4ae6af424d10$export$default);
var $b87c5c3c52d2bf6473e3343ea2737700$export$default = $73cad1193ccab38ba0d3432bf2f218b9$export$default($b87c5c3c52d2bf6473e3343ea2737700$export$scheme);
var $5780b8837bc8cec17a7d31fc75365e51$export$scheme = new Array(3).concat("edf8b17fcdbb2c7fb8", "ffffcca1dab441b6c4225ea8", "ffffcca1dab441b6c42c7fb8253494", "ffffccc7e9b47fcdbb41b6c42c7fb8253494", "ffffccc7e9b47fcdbb41b6c41d91c0225ea80c2c84", "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea80c2c84", "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea8253494081d58").map($b993ccc2bef98b0a048e4ae6af424d10$export$default);
var $5780b8837bc8cec17a7d31fc75365e51$export$default = $73cad1193ccab38ba0d3432bf2f218b9$export$default($5780b8837bc8cec17a7d31fc75365e51$export$scheme);
var $1ba71507917afa7627f099c514538fcc$export$scheme = new Array(3).concat("f7fcb9addd8e31a354", "ffffccc2e69978c679238443", "ffffccc2e69978c67931a354006837", "ffffccd9f0a3addd8e78c67931a354006837", "ffffccd9f0a3addd8e78c67941ab5d238443005a32", "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443005a32", "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443006837004529").map($b993ccc2bef98b0a048e4ae6af424d10$export$default);
var $1ba71507917afa7627f099c514538fcc$export$default = $73cad1193ccab38ba0d3432bf2f218b9$export$default($1ba71507917afa7627f099c514538fcc$export$scheme);
var $5d39bed682b650a173d710c343b34484$export$scheme = new Array(3).concat("fff7bcfec44fd95f0e", "ffffd4fed98efe9929cc4c02", "ffffd4fed98efe9929d95f0e993404", "ffffd4fee391fec44ffe9929d95f0e993404", "ffffd4fee391fec44ffe9929ec7014cc4c028c2d04", "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c028c2d04", "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c02993404662506").map($b993ccc2bef98b0a048e4ae6af424d10$export$default);
var $5d39bed682b650a173d710c343b34484$export$default = $73cad1193ccab38ba0d3432bf2f218b9$export$default($5d39bed682b650a173d710c343b34484$export$scheme);
var $d814eccc816046871a05c6cfec31f5b4$export$scheme = new Array(3).concat("ffeda0feb24cf03b20", "ffffb2fecc5cfd8d3ce31a1c", "ffffb2fecc5cfd8d3cf03b20bd0026", "ffffb2fed976feb24cfd8d3cf03b20bd0026", "ffffb2fed976feb24cfd8d3cfc4e2ae31a1cb10026", "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cb10026", "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cbd0026800026").map($b993ccc2bef98b0a048e4ae6af424d10$export$default);
var $d814eccc816046871a05c6cfec31f5b4$export$default = $73cad1193ccab38ba0d3432bf2f218b9$export$default($d814eccc816046871a05c6cfec31f5b4$export$scheme);
var $97dd71fb905151f911edf5e609f501e8$export$scheme = new Array(3).concat("deebf79ecae13182bd", "eff3ffbdd7e76baed62171b5", "eff3ffbdd7e76baed63182bd08519c", "eff3ffc6dbef9ecae16baed63182bd08519c", "eff3ffc6dbef9ecae16baed64292c62171b5084594", "f7fbffdeebf7c6dbef9ecae16baed64292c62171b5084594", "f7fbffdeebf7c6dbef9ecae16baed64292c62171b508519c08306b").map($b993ccc2bef98b0a048e4ae6af424d10$export$default);
var $97dd71fb905151f911edf5e609f501e8$export$default = $73cad1193ccab38ba0d3432bf2f218b9$export$default($97dd71fb905151f911edf5e609f501e8$export$scheme);
var $346b353850ccabea6a3c428edafbc98f$export$scheme = new Array(3).concat("e5f5e0a1d99b31a354", "edf8e9bae4b374c476238b45", "edf8e9bae4b374c47631a354006d2c", "edf8e9c7e9c0a1d99b74c47631a354006d2c", "edf8e9c7e9c0a1d99b74c47641ab5d238b45005a32", "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45005a32", "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45006d2c00441b").map($b993ccc2bef98b0a048e4ae6af424d10$export$default);
var $346b353850ccabea6a3c428edafbc98f$export$default = $73cad1193ccab38ba0d3432bf2f218b9$export$default($346b353850ccabea6a3c428edafbc98f$export$scheme);
var $03620b39ff16d6b0348f5cfee8b291ce$export$scheme = new Array(3).concat("f0f0f0bdbdbd636363", "f7f7f7cccccc969696525252", "f7f7f7cccccc969696636363252525", "f7f7f7d9d9d9bdbdbd969696636363252525", "f7f7f7d9d9d9bdbdbd969696737373525252252525", "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525", "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525000000").map($b993ccc2bef98b0a048e4ae6af424d10$export$default);
var $03620b39ff16d6b0348f5cfee8b291ce$export$default = $73cad1193ccab38ba0d3432bf2f218b9$export$default($03620b39ff16d6b0348f5cfee8b291ce$export$scheme);
var $1ca1a429a7152769d9863a5d101a5e51$export$scheme = new Array(3).concat("efedf5bcbddc756bb1", "f2f0f7cbc9e29e9ac86a51a3", "f2f0f7cbc9e29e9ac8756bb154278f", "f2f0f7dadaebbcbddc9e9ac8756bb154278f", "f2f0f7dadaebbcbddc9e9ac8807dba6a51a34a1486", "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a34a1486", "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a354278f3f007d").map($b993ccc2bef98b0a048e4ae6af424d10$export$default);
var $1ca1a429a7152769d9863a5d101a5e51$export$default = $73cad1193ccab38ba0d3432bf2f218b9$export$default($1ca1a429a7152769d9863a5d101a5e51$export$scheme);
var $9e43db3698c8620a3b609bab74afad03$export$scheme = new Array(3).concat("fee0d2fc9272de2d26", "fee5d9fcae91fb6a4acb181d", "fee5d9fcae91fb6a4ade2d26a50f15", "fee5d9fcbba1fc9272fb6a4ade2d26a50f15", "fee5d9fcbba1fc9272fb6a4aef3b2ccb181d99000d", "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181d99000d", "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181da50f1567000d").map($b993ccc2bef98b0a048e4ae6af424d10$export$default);
var $9e43db3698c8620a3b609bab74afad03$export$default = $73cad1193ccab38ba0d3432bf2f218b9$export$default($9e43db3698c8620a3b609bab74afad03$export$scheme);
var $49446dcc6e5fd4b55152276e7d474151$export$scheme = new Array(3).concat("fee6cefdae6be6550d", "feeddefdbe85fd8d3cd94701", "feeddefdbe85fd8d3ce6550da63603", "feeddefdd0a2fdae6bfd8d3ce6550da63603", "feeddefdd0a2fdae6bfd8d3cf16913d948018c2d04", "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d948018c2d04", "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d94801a636037f2704").map($b993ccc2bef98b0a048e4ae6af424d10$export$default);
var $49446dcc6e5fd4b55152276e7d474151$export$default = $73cad1193ccab38ba0d3432bf2f218b9$export$default($49446dcc6e5fd4b55152276e7d474151$export$scheme);
var $8d92371ae5fbe77e41b3f074c428c882$export$default = function (t) {
  t = Math.max(0, Math.min(1, t));
  return "rgb(" + Math.max(0, Math.min(255, Math.round(-4.54 - t * (35.34 - t * (2381.73 - t * (6402.7 - t * (7024.72 - t * 2710.57))))))) + ", " + Math.max(0, Math.min(255, Math.round(32.49 + t * (170.73 + t * (52.82 - t * (131.46 - t * (176.58 - t * 67.37))))))) + ", " + Math.max(0, Math.min(255, Math.round(81.24 + t * (442.36 - t * (2482.43 - t * (6167.24 - t * (6614.94 - t * 2475.67))))))) + ")";
};
var $97e74b465a86fc287e9d66812824ca65$export$default = $16dfd74275b7f3f919ed1886368053ad$export$cubehelixLong($907db14e0037ee8c4008af6b27d5d5b9$export$default(300, 0.5, 0.0), $907db14e0037ee8c4008af6b27d5d5b9$export$default(-240, 0.5, 1.0));
var $e19b68df7f70d4c3877821e5604f5d2f$export$warm = $16dfd74275b7f3f919ed1886368053ad$export$cubehelixLong($907db14e0037ee8c4008af6b27d5d5b9$export$default(-100, 0.75, 0.35), $907db14e0037ee8c4008af6b27d5d5b9$export$default(80, 1.50, 0.8));
var $e19b68df7f70d4c3877821e5604f5d2f$export$cool = $16dfd74275b7f3f919ed1886368053ad$export$cubehelixLong($907db14e0037ee8c4008af6b27d5d5b9$export$default(260, 0.75, 0.35), $907db14e0037ee8c4008af6b27d5d5b9$export$default(80, 1.50, 0.8));
var $e19b68df7f70d4c3877821e5604f5d2f$var$c = $907db14e0037ee8c4008af6b27d5d5b9$export$default();
var $e19b68df7f70d4c3877821e5604f5d2f$export$default = function (t) {
  if (t < 0 || t > 1) t -= Math.floor(t);
  var ts = Math.abs(t - 0.5);
  $e19b68df7f70d4c3877821e5604f5d2f$var$c.h = 360 * t - 100;
  $e19b68df7f70d4c3877821e5604f5d2f$var$c.s = 1.5 - 1.5 * ts;
  $e19b68df7f70d4c3877821e5604f5d2f$var$c.l = 0.8 - 0.9 * ts;
  return $e19b68df7f70d4c3877821e5604f5d2f$var$c + "";
};
var $6545bdfe19c48194fa13cbfc7044d7c8$var$c = $7adb004cb218a5bbfe4f066d028c083f$export$rgb(), $6545bdfe19c48194fa13cbfc7044d7c8$var$pi_1_3 = Math.PI / 3, $6545bdfe19c48194fa13cbfc7044d7c8$var$pi_2_3 = Math.PI * 2 / 3;
var $6545bdfe19c48194fa13cbfc7044d7c8$export$default = function (t) {
  var x;
  t = (0.5 - t) * Math.PI;
  $6545bdfe19c48194fa13cbfc7044d7c8$var$c.r = 255 * (x = Math.sin(t)) * x;
  $6545bdfe19c48194fa13cbfc7044d7c8$var$c.g = 255 * (x = Math.sin(t + $6545bdfe19c48194fa13cbfc7044d7c8$var$pi_1_3)) * x;
  $6545bdfe19c48194fa13cbfc7044d7c8$var$c.b = 255 * (x = Math.sin(t + $6545bdfe19c48194fa13cbfc7044d7c8$var$pi_2_3)) * x;
  return $6545bdfe19c48194fa13cbfc7044d7c8$var$c + "";
};
var $9c44bbc1cba58fcbb85dc2cd73ffffa2$export$default = function (t) {
  t = Math.max(0, Math.min(1, t));
  return "rgb(" + Math.max(0, Math.min(255, Math.round(34.61 + t * (1172.33 - t * (10793.56 - t * (33300.12 - t * (38394.49 - t * 14825.05))))))) + ", " + Math.max(0, Math.min(255, Math.round(23.31 + t * (557.33 + t * (1225.33 - t * (3574.96 - t * (1073.77 + t * 707.56))))))) + ", " + Math.max(0, Math.min(255, Math.round(27.2 + t * (3211.1 - t * (15327.97 - t * (27814 - t * (22569.18 - t * 6838.66))))))) + ")";
};
function $d93ff3e8625ab11206964e3bd0e6b61c$var$ramp(range) {
  var n = range.length;
  return function (t) {
    return range[Math.max(0, Math.min(n - 1, Math.floor(t * n)))];
  };
}
var $d93ff3e8625ab11206964e3bd0e6b61c$export$default = $d93ff3e8625ab11206964e3bd0e6b61c$var$ramp($b993ccc2bef98b0a048e4ae6af424d10$export$default("44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725"));
var $d93ff3e8625ab11206964e3bd0e6b61c$export$magma = $d93ff3e8625ab11206964e3bd0e6b61c$var$ramp($b993ccc2bef98b0a048e4ae6af424d10$export$default("00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf"));
var $d93ff3e8625ab11206964e3bd0e6b61c$export$inferno = $d93ff3e8625ab11206964e3bd0e6b61c$var$ramp($b993ccc2bef98b0a048e4ae6af424d10$export$default("00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4"));
var $d93ff3e8625ab11206964e3bd0e6b61c$export$plasma = $d93ff3e8625ab11206964e3bd0e6b61c$var$ramp($b993ccc2bef98b0a048e4ae6af424d10$export$default("0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921"));
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "schemeCategory10", function () {
  return $1c2388b24a08a8c5c4b4a5cd823ef2a2$export$default;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "schemeAccent", function () {
  return $daaf170336f85600a561ca2a79331623$export$default;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "schemeDark2", function () {
  return $a1586d0676b0cf4b54ff13d3f98554aa$export$default;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "schemePaired", function () {
  return $f4e33cd59b2243d36ba7cbda5842b16e$export$default;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "schemePastel1", function () {
  return $302a5165d6996c31debd95f4507688a9$export$default;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "schemePastel2", function () {
  return $703c45afabbacacc45ba45d0f8a6d4e8$export$default;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "schemeSet1", function () {
  return $bbbfb6f1004a989556ca216b40233366$export$default;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "schemeSet2", function () {
  return $13a75532345e28058fe3274a13b3aed7$export$default;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "schemeSet3", function () {
  return $bce65b44d26736da6e5d3cdddedcf3a3$export$default;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "schemeTableau10", function () {
  return $2e8be7d1a21851853658d2dd3e3e4e26$export$default;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "schemeBrBG", function () {
  return $3c4a87764ee6fb16aeb2474e35fdab1b$export$scheme;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "interpolateBrBG", function () {
  return $3c4a87764ee6fb16aeb2474e35fdab1b$export$default;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "schemePRGn", function () {
  return $24ddf36673e9e28e0941341dc3c785f2$export$scheme;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "interpolatePRGn", function () {
  return $24ddf36673e9e28e0941341dc3c785f2$export$default;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "schemePiYG", function () {
  return $179a8b8b8db67d5ad439d6ac3c7182eb$export$scheme;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "interpolatePiYG", function () {
  return $179a8b8b8db67d5ad439d6ac3c7182eb$export$default;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "schemePuOr", function () {
  return $524816fcdb13536f80495f736d65917f$export$scheme;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "interpolatePuOr", function () {
  return $524816fcdb13536f80495f736d65917f$export$default;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "schemeRdBu", function () {
  return $251124b56c5394ac8628405b3de84fa9$export$scheme;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "interpolateRdBu", function () {
  return $251124b56c5394ac8628405b3de84fa9$export$default;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "schemeRdGy", function () {
  return $32431bf18441a7fb330db070edfc883c$export$scheme;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "interpolateRdGy", function () {
  return $32431bf18441a7fb330db070edfc883c$export$default;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "schemeRdYlBu", function () {
  return $c7f5f49b22ec5b34595f49a2fd2aaee1$export$scheme;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "interpolateRdYlBu", function () {
  return $c7f5f49b22ec5b34595f49a2fd2aaee1$export$default;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "schemeRdYlGn", function () {
  return $ba7b47a993698c5e9e0a2e9254961594$export$scheme;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "interpolateRdYlGn", function () {
  return $ba7b47a993698c5e9e0a2e9254961594$export$default;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "schemeSpectral", function () {
  return $ef633573a4755592e04a764629b71759$export$scheme;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "interpolateSpectral", function () {
  return $ef633573a4755592e04a764629b71759$export$default;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "schemeBuGn", function () {
  return $ae28bb9ab23f5f71e8524ba5eccd92b9$export$scheme;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "interpolateBuGn", function () {
  return $ae28bb9ab23f5f71e8524ba5eccd92b9$export$default;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "schemeBuPu", function () {
  return $5f8c2f587a94f823c8a1f6d04f550a7e$export$scheme;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "interpolateBuPu", function () {
  return $5f8c2f587a94f823c8a1f6d04f550a7e$export$default;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "schemeGnBu", function () {
  return $c0f014e903576e81ccb408b364b01a28$export$scheme;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "interpolateGnBu", function () {
  return $c0f014e903576e81ccb408b364b01a28$export$default;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "schemeOrRd", function () {
  return $a24c32d9b190bf1f53fcdba09c8f3cdb$export$scheme;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "interpolateOrRd", function () {
  return $a24c32d9b190bf1f53fcdba09c8f3cdb$export$default;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "schemePuBuGn", function () {
  return $b34a4a6860e6e162cac5f376a7c2bce7$export$scheme;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "interpolatePuBuGn", function () {
  return $b34a4a6860e6e162cac5f376a7c2bce7$export$default;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "schemePuBu", function () {
  return $f48132aac8a2014065ca5df06491084d$export$scheme;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "interpolatePuBu", function () {
  return $f48132aac8a2014065ca5df06491084d$export$default;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "schemePuRd", function () {
  return $d98461135c1642b9760794d23f50da25$export$scheme;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "interpolatePuRd", function () {
  return $d98461135c1642b9760794d23f50da25$export$default;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "schemeRdPu", function () {
  return $b87c5c3c52d2bf6473e3343ea2737700$export$scheme;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "interpolateRdPu", function () {
  return $b87c5c3c52d2bf6473e3343ea2737700$export$default;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "schemeYlGnBu", function () {
  return $5780b8837bc8cec17a7d31fc75365e51$export$scheme;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "interpolateYlGnBu", function () {
  return $5780b8837bc8cec17a7d31fc75365e51$export$default;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "schemeYlGn", function () {
  return $1ba71507917afa7627f099c514538fcc$export$scheme;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "interpolateYlGn", function () {
  return $1ba71507917afa7627f099c514538fcc$export$default;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "schemeYlOrBr", function () {
  return $5d39bed682b650a173d710c343b34484$export$scheme;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "interpolateYlOrBr", function () {
  return $5d39bed682b650a173d710c343b34484$export$default;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "schemeYlOrRd", function () {
  return $d814eccc816046871a05c6cfec31f5b4$export$scheme;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "interpolateYlOrRd", function () {
  return $d814eccc816046871a05c6cfec31f5b4$export$default;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "schemeBlues", function () {
  return $97dd71fb905151f911edf5e609f501e8$export$scheme;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "interpolateBlues", function () {
  return $97dd71fb905151f911edf5e609f501e8$export$default;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "schemeGreens", function () {
  return $346b353850ccabea6a3c428edafbc98f$export$scheme;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "interpolateGreens", function () {
  return $346b353850ccabea6a3c428edafbc98f$export$default;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "schemeGreys", function () {
  return $03620b39ff16d6b0348f5cfee8b291ce$export$scheme;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "interpolateGreys", function () {
  return $03620b39ff16d6b0348f5cfee8b291ce$export$default;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "schemePurples", function () {
  return $1ca1a429a7152769d9863a5d101a5e51$export$scheme;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "interpolatePurples", function () {
  return $1ca1a429a7152769d9863a5d101a5e51$export$default;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "schemeReds", function () {
  return $9e43db3698c8620a3b609bab74afad03$export$scheme;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "interpolateReds", function () {
  return $9e43db3698c8620a3b609bab74afad03$export$default;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "schemeOranges", function () {
  return $49446dcc6e5fd4b55152276e7d474151$export$scheme;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "interpolateOranges", function () {
  return $49446dcc6e5fd4b55152276e7d474151$export$default;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "interpolateCividis", function () {
  return $8d92371ae5fbe77e41b3f074c428c882$export$default;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "interpolateCubehelixDefault", function () {
  return $97e74b465a86fc287e9d66812824ca65$export$default;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "interpolateCool", function () {
  return $e19b68df7f70d4c3877821e5604f5d2f$export$cool;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "interpolateWarm", function () {
  return $e19b68df7f70d4c3877821e5604f5d2f$export$warm;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "interpolateRainbow", function () {
  return $e19b68df7f70d4c3877821e5604f5d2f$export$default;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "interpolateSinebow", function () {
  return $6545bdfe19c48194fa13cbfc7044d7c8$export$default;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "interpolateTurbo", function () {
  return $9c44bbc1cba58fcbb85dc2cd73ffffa2$export$default;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "interpolatePlasma", function () {
  return $d93ff3e8625ab11206964e3bd0e6b61c$export$plasma;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "interpolateInferno", function () {
  return $d93ff3e8625ab11206964e3bd0e6b61c$export$inferno;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "interpolateMagma", function () {
  return $d93ff3e8625ab11206964e3bd0e6b61c$export$magma;
});
$parcel$export($a6585f17c7dfd9074a79b848521aadca$exports, "interpolateViridis", function () {
  return $d93ff3e8625ab11206964e3bd0e6b61c$export$default;
});
// Default channel values of schema which is passed to webgl drawer
const $a482b49601c034373694faa8888ffe15$export$DEFAULT_CHANNELS = Object.freeze({
  size: {
    value: 1,
    numComponents: 1,
    type: "float"
  },
  color: {
    value: 255 ** 3,
    numComponents: 1,
    type: "float"
  },
  x: {
    value: 0,
    numComponents: null,
    // x and y are placed in an attribute vector in the shader that is already handled
    type: null
  },
  y: {
    value: 0,
    numComponents: null,
    type: null
  },
  opacity: {
    value: 1,
    numComponents: 1,
    type: "float"
  },
  shape: {
    value: "dot",
    numComponents: null,
    type: null
  },
  width: {
    value: 1,
    numComponents: 1,
    type: "float"
  },
  height: {
    value: 1,
    numComponents: 1,
    type: "float"
  }
});
const $a482b49601c034373694faa8888ffe15$var$DEFAULT_MAX_SIZE = 100;
const $a482b49601c034373694faa8888ffe15$var$DEFAULT_MIN_SIZE = 0;
const $a482b49601c034373694faa8888ffe15$var$DEFAULT_MIN_OPACITY = 0;
const $a482b49601c034373694faa8888ffe15$var$DEFAULT_MIN_WIDTH = 0;
const $a482b49601c034373694faa8888ffe15$var$DEFAULT_MIN_HEIGHT = 0;
const $a482b49601c034373694faa8888ffe15$var$DEFAULT_MAX_WIDTH = 1 / $2a4f8c7882dfdea78821148c89bf8779$export$SIZE_UNITS;
const $a482b49601c034373694faa8888ffe15$var$DEFAULT_MAX_HEIGHT = 1 / $2a4f8c7882dfdea78821148c89bf8779$export$SIZE_UNITS;
const $a482b49601c034373694faa8888ffe15$var$DEFAULT_COLOR_SCHEME = "interpolateBrBG";
// first value is undefined as categories are 1-indexed
const $a482b49601c034373694faa8888ffe15$var$SHAPES = [undefined, "dot", "triangle", "circle", "diamond"];
/**
* Given a track, determine the WebGL draw mode for it
*
* @param {Object} track from schema
* @returns WebGLDrawMode as a string
*/
const $a482b49601c034373694faa8888ffe15$export$getDrawModeForTrack = track => {
  switch (track.mark) {
    case "line":
      return "LINE_STRIP";
    case "tick":
    case "arc":
      return "LINES";
    case "point":
      if (track.shape && track.shape.value !== "dot") {
        return "TRIANGLES";
      } else {
        return "POINTS";
      }
    case "rect":
    case "area":
      return "TRIANGLES";
  }
};
class $a482b49601c034373694faa8888ffe15$export$default {
  /**
  * Process a schema by reading in the data, the channel information, and producing an
  * iterator like interface with getNextTrack to feed to a drawer.
  *
  * @param {Object} schema user defined schema
  * @param {Function} callback function to call after all the data has been loaded
  */
  constructor(schema, callback) {
    this.index = 0;
    this.schema = schema;
    if (typeof schema.defaultData === "string") {
      // data is a url to get
      this.dataPromise = fetch(schema.defaultData).then(response => response.text()).then(text => this.data = text.split("\n"));
    } else if (schema.defaultData) {
      // default data is defined, assumed to be an object
      this.data = schema.defaultData;
      this.isInlineData = true;
    }
    this.tracks = schema.tracks.map(track => new $a482b49601c034373694faa8888ffe15$var$Track(this, track));
    const allPromises = this.tracks.map(track => track.dataPromise).filter(p => p);
    // Removes undefined
    if (this.dataPromise) {
      allPromises.push(this.dataPromise);
    }
    this.xScale = $ab472fc72a52ba79515db0c00f4f687a$export$getScaleForSchema("x", schema);
    this.yScale = $ab472fc72a52ba79515db0c00f4f687a$export$getScaleForSchema("y", schema);
    // When all tracks have acquired their data, call the callback
    // TODO: Allow tracks to be processed while waiting for others, need to keep in mind order
    Promise.all(allPromises).then(() => callback(this));
  }
  /**
  * Get the next track to process
  * @returns {@link Track}
  */
  getNextTrack() {
    if (this.index >= this.tracks.length) {
      return null;
    }
    return this.tracks[this.index++];
  }
}
class $a482b49601c034373694faa8888ffe15$var$Track {
  /**
  * Process a track from a schema by loading data and producing an iterator
  * like interface with getNextDataPoint or getNextMark.
  *
  * @param {Object} schema user defined visualization
  * @param {Object} track user defined track
  */
  constructor(schema, track) {
    this.track = track;
    this.index = 1;
    // Start at 1 to skip headers
    if (typeof track.data === "string") {
      // Track has its own data to GET
      this.dataPromise = fetch(track.data).then(response => response.text()).then(text => {
        this.data = text.split(/[\n\r]+/);
        this.processHeadersAndMappers();
        this.hasOwnData = true;
      });
    } else if (track.data) {
      // Track has its own inline data
      this.data = track.data;
      this.isInlineData = true;
      this.processHeadersAndMappers();
      this.hasOwnData = true;
    } else if (schema.data) {
      // Track does not have its own data, but the schema has default data
      this.data = schema.data;
      this.isInlineData = schema.isInlineData;
      this.processHeadersAndMappers();
    } else if (schema.dataPromise) {
      // Track does not have its own data, but the schema is GETting default data
      schema.dataPromise.then(() => {
        this.data = schema.data;
        this.processHeadersAndMappers();
      });
    } else {
      console.error(`Could not find data (no defaultData in schema and no data specified for this track) for track ${track}.`);
    }
  }
  /**
  * Read the headers from the first row of data and then build functions to map a data row
  * to a channel value for drawing. Ultimately a method due to clunky constructor.
  */
  processHeadersAndMappers() {
    // Processing headers
    if (this.isInlineData) {
      this.headers = Object.keys(this.data);
      this.dataLength = this.data[this.headers[0]].length;
      this.index = 0;
    } else {
      this.headers = this.data[0].split(",");
      this.dataLength = this.data.length;
    }
    // Creating channel mappers
    this.channelMaps = new Map();
    Object.keys($a482b49601c034373694faa8888ffe15$export$DEFAULT_CHANNELS).forEach(channel => {
      this.channelMaps.set(channel, this.buildMapperForChannel(channel));
    });
  }
  /**
  * Get the next data point from the track. Returns null when all points have been returned.
  * @returns A data point with the x and y coordinates and other attributes from the header
  */
  getNextDataPoint() {
    if (this.index >= this.dataLength) {
      // TODO potentially erase this.data for garbage collection
      return null;
    }
    const toReturn = {
      geometry: {
        coordinates: []
      }
    };
    let splitted;
    if (this.isInlineData) {
      splitted = this.headers.map(header => this.data[header][this.index]);
      this.index++;
    } else {
      const currRow = this.data[this.index++];
      splitted = currRow.split(",");
    }
    this.headers.forEach((header, index) => {
      toReturn[header] = splitted[index];
    });
    const x = this.channelMaps.get("x")(splitted);
    const y = this.channelMaps.get("y")(splitted);
    toReturn.geometry.coordinates.push(x, y);
    return toReturn;
  }
  /**
  * Get the next mark from the track for the drawer to process. Returns null when all
  * marks have been returned.
  * @returns An object containing information used to draw a mark for a row of data.
  */
  getNextMark() {
    if (this.index >= this.dataLength) {
      return null;
    }
    const toReturn = {};
    let splitted;
    if (this.isInlineData) {
      splitted = this.headers.map(header => this.data[header][this.index]);
      this.index++;
    } else {
      const currRow = this.data[this.index++];
      splitted = currRow.split(",");
    }
    this.channelMaps.forEach((mapper, channel) => {
      toReturn[channel] = mapper(splitted);
    });
    return toReturn;
  }
  /**
  * Builds a function which maps an attribute value to a channel value for use by the drawer.
  * The function will return a default if not present in the track, or a constant if
  * value is defined.
  *
  * @param {String} channel one of the channels listed in default channels
  * @returns the function
  */
  buildMapperForChannel = channel => {
    if ((channel in this.track)) {
      const channelInfo = this.track[channel];
      if (("value" in channelInfo)) {
        if (channel === "color") {
          channelInfo.value = $ab472fc72a52ba79515db0c00f4f687a$export$colorSpecifierToHex(channelInfo.value);
        }
        return () => channelInfo.value;
      } else {
        const attributeIndex = this.headers.indexOf(channelInfo.attribute);
        let attrMapper;
        switch (channelInfo.type) {
          case "quantitative":
            attrMapper = $a482b49601c034373694faa8888ffe15$var$buildMapperForQuantitiveChannel(channel, channelInfo);
            break;
          case "categorical":
            attrMapper = $a482b49601c034373694faa8888ffe15$var$buildMapperForCategoricalChannel(channel, channelInfo);
            break;
          case "genomic":
            const chrAttributeIndex = this.headers.indexOf(channelInfo.chrAttribute);
            const geneAttributeIndex = this.headers.indexOf(channelInfo.geneAttribute);
            attrMapper = $a482b49601c034373694faa8888ffe15$var$buildMapperForGenomicChannel(channel, channelInfo);
            return row => attrMapper(row[chrAttributeIndex], row[geneAttributeIndex]);
          case "genomicRange":
            const genomicAttributeIndices = [this.headers.indexOf(channelInfo.chrAttribute), this.headers.indexOf(channelInfo.startAttribute), this.headers.indexOf(channelInfo.endAttribute)];
            attrMapper = $a482b49601c034373694faa8888ffe15$var$buildMapperForGenomicRangeChannel(channel, channelInfo);
            return row => // Pass in values for the genomic attributes to mapper
            attrMapper(...genomicAttributeIndices.map(index => row[index]));
        }
        return row => attrMapper(row[attributeIndex]);
      }
    } else {
      return () => $a482b49601c034373694faa8888ffe15$export$DEFAULT_CHANNELS[channel].value;
    }
  };
}
/**
* Build a function which maps a numerical value for an attribute to a property of a mark
* @param {*} channel the name of the quantitative channel to map
* @param {*} channelInfo the object containing info for this channel from the schema
* @returns a function that maps a data attribute value to a channel value
*/
const $a482b49601c034373694faa8888ffe15$var$buildMapperForQuantitiveChannel = (channel, channelInfo) => {
  switch (channel) {
    case "x":
    case "y":
      // Map x and y to itself, but we need a function to do it
      return coord => parseFloat(coord);
    case "opacity":
      return $ab472fc72a52ba79515db0c00f4f687a$export$scale(channelInfo.domain, [channelInfo.minOpacity || $a482b49601c034373694faa8888ffe15$var$DEFAULT_MIN_OPACITY, 1]);
    case "size":
      return $ab472fc72a52ba79515db0c00f4f687a$export$scale(channelInfo.domain, [channelInfo.minSize || $a482b49601c034373694faa8888ffe15$var$DEFAULT_MIN_SIZE, channelInfo.maxSize || $a482b49601c034373694faa8888ffe15$var$DEFAULT_MAX_SIZE]);
    case "color":
      const d3colorScale = !channelInfo.colorScheme || !((channelInfo.colorScheme in $a6585f17c7dfd9074a79b848521aadca$exports)) ? $a6585f17c7dfd9074a79b848521aadca$exports[$a482b49601c034373694faa8888ffe15$var$DEFAULT_COLOR_SCHEME] : $a6585f17c7dfd9074a79b848521aadca$exports[channelInfo.colorScheme];
      const zeroToOneScale = $ab472fc72a52ba79515db0c00f4f687a$export$scale(channelInfo.domain, [0, 1]);
      return attrValue => $ab472fc72a52ba79515db0c00f4f687a$export$rgbStringToHex(d3colorScale(zeroToOneScale(attrValue)));
    case "width":
      return $ab472fc72a52ba79515db0c00f4f687a$export$scale(channelInfo.domain, [channelInfo.minWidth || $a482b49601c034373694faa8888ffe15$var$DEFAULT_MIN_WIDTH, channelInfo.maxWidth || $a482b49601c034373694faa8888ffe15$var$DEFAULT_MAX_WIDTH]);
    case "height":
      return $ab472fc72a52ba79515db0c00f4f687a$export$scale(channelInfo.domain, [channelInfo.minHeight || $a482b49601c034373694faa8888ffe15$var$DEFAULT_MIN_HEIGHT, channelInfo.maxHeight || $a482b49601c034373694faa8888ffe15$var$DEFAULT_MAX_WIDTH]);
    default:
      console.error(`${channel} is not a supported channel for quantitative attributes!`);
  }
};
/**
* Build a function which maps a discrete (integers are possible) value for an attribute
* to a property of a mark
* @param {*} channel the name of the categorical channel to map
* @param {*} channelInfo the object containing info for this channel from the schema
* @returns a function that maps a data attribute value to a channel value
*/
const $a482b49601c034373694faa8888ffe15$var$buildMapperForCategoricalChannel = (channel, channelInfo) => {
  const categoryTracker = new Map();
  let channelScale;
  switch (channel) {
    case "x":
    case "y":
      // +1 here to avoid setting x or y at a boundary that makes it not visible
      channelScale = $ab472fc72a52ba79515db0c00f4f687a$export$scale([1, channelInfo.cardinality + 1], [-1, 1]);
      break;
    case "opacity":
      channelScale = $ab472fc72a52ba79515db0c00f4f687a$export$scale([1, channelInfo.cardinality], [channelInfo.minOpacity || $a482b49601c034373694faa8888ffe15$var$DEFAULT_MIN_OPACITY, 1]);
      break;
    case "size":
      channelScale = $ab472fc72a52ba79515db0c00f4f687a$export$scale([1, channelInfo.cardinality], [channelInfo.minSize || $a482b49601c034373694faa8888ffe15$var$DEFAULT_MIN_SIZE, channelInfo.maxSize || $a482b49601c034373694faa8888ffe15$var$DEFAULT_MAX_SIZE]);
      break;
    case "shape":
      channelScale = categoryId => $a482b49601c034373694faa8888ffe15$var$SHAPES[categoryId % $a482b49601c034373694faa8888ffe15$var$SHAPES.length];
      break;
    case "color":
      let d3colorScale = !channelInfo.colorScheme || !((channelInfo.colorScheme in $a6585f17c7dfd9074a79b848521aadca$exports)) ? $a6585f17c7dfd9074a79b848521aadca$exports[$a482b49601c034373694faa8888ffe15$var$DEFAULT_COLOR_SCHEME] : $a6585f17c7dfd9074a79b848521aadca$exports[channelInfo.colorScheme];
      if (Array.isArray(d3colorScale)) {
        console.error("Currenty only interpolating color schemes are supported, using default");
        d3colorScale = $a6585f17c7dfd9074a79b848521aadca$exports[$a482b49601c034373694faa8888ffe15$var$DEFAULT_COLOR_SCHEME];
      }
      const zeroToOneScale = $ab472fc72a52ba79515db0c00f4f687a$export$scale([1, channelInfo.cardinality], [0, 1]);
      channelScale = categoryId => $ab472fc72a52ba79515db0c00f4f687a$export$rgbStringToHex(d3colorScale(zeroToOneScale(categoryId)));
      break;
    case "width":
      channelScale = $ab472fc72a52ba79515db0c00f4f687a$export$scale([1, channelInfo.cardinality], [channelInfo.minWidth || $a482b49601c034373694faa8888ffe15$var$DEFAULT_MIN_WIDTH, channelInfo.maxWidth || $a482b49601c034373694faa8888ffe15$var$DEFAULT_MAX_WIDTH]);
      break;
    case "height":
      channelScale = $ab472fc72a52ba79515db0c00f4f687a$export$scale([1, channelInfo.cardinality], [channelInfo.minHeight || $a482b49601c034373694faa8888ffe15$var$DEFAULT_MIN_HEIGHT, channelInfo.maxHeight || $a482b49601c034373694faa8888ffe15$var$DEFAULT_MAX_HEIGHT]);
      break;
    default:
      console.error(`${channel} is not a supported channel for categorical attributes!`);
  }
  return attrValue => {
    if (!categoryTracker.has(attrValue)) {
      categoryTracker.set(attrValue, categoryTracker.size + 1);
    }
    return channelScale(categoryTracker.get(attrValue));
  };
};
/**
* Build a function which maps a genome chr, gene, to an object consumable by a GenomeScale
* @param {*} channel either x or y
* @param {*} channelInfo the object containing info for this channel from the schema
* @returns a function that maps (genomeChr, geneLoc) -> [chrId, geneLocation]
*  ex: ["X", 200]
*/
const $a482b49601c034373694faa8888ffe15$var$buildMapperForGenomicChannel = (channel, channelInfo) => {
  switch (channel) {
    case "x":
    case "y":
      return (chr, gene) => {
        let chrId = chr.startsWith("chr") ? chr.substring(3) : chr.toString();
        return [chrId, parseInt(gene)];
      };
    default:
      console.error(`${channel} is not a supported channel for genomic attributes!`);
  }
};
/**
* Build a function which maps a genome chr, start, and end to an object consumable by a scale
* @param {*} channel either x or y, width or height may be included if doing arc marks
* @param {*} channelInfo the object containing info for this channel from the schema
* @returns a function that maps (genomeChr, genomeStart, genomeEnd) -> an object containing mark metadata for position
*  format: [chrId, geneLocation, chrId2, geneLocation2]
*  ex: ["1", 1000, "X", 2000]
*/
const $a482b49601c034373694faa8888ffe15$var$buildMapperForGenomicRangeChannel = (channel, channelInfo) => {
  switch (channel) {
    case "width":
    case "height":
    case "x":
    case "y":
      return (chr, genomeStart, genomeEnd) => {
        let chrId = chr.startsWith("chr") ? chr.substring(3) : chr.toString();
        return [chrId, parseInt(genomeStart), chrId, parseInt(genomeEnd)];
      };
    default:
      console.error(`${channel} is not a supported channel for genomic attributes!`);
  }
};
$parcel$export($a482b49601c034373694faa8888ffe15$exports, "default", function () {
  return $a482b49601c034373694faa8888ffe15$export$default;
});
$parcel$export($a482b49601c034373694faa8888ffe15$exports, "getDrawModeForTrack", function () {
  return $a482b49601c034373694faa8888ffe15$export$getDrawModeForTrack;
});
$parcel$export($a482b49601c034373694faa8888ffe15$exports, "DEFAULT_CHANNELS", function () {
  return $a482b49601c034373694faa8888ffe15$export$DEFAULT_CHANNELS;
});
function $a482b49601c034373694faa8888ffe15$init() {
  return $a482b49601c034373694faa8888ffe15$exports;
}
function $ab472fc72a52ba79515db0c00f4f687a$init() {
  return $ab472fc72a52ba79515db0c00f4f687a$exports;
}
function $3ebbd6da2f6dbbd2ea0ba22bdc176caf$init() {
  return $3ebbd6da2f6dbbd2ea0ba22bdc176caf$exports;
}
function $2a4f8c7882dfdea78821148c89bf8779$init() {
  return $2a4f8c7882dfdea78821148c89bf8779$exports;
}
export {$a482b49601c034373694faa8888ffe15$init, $ab472fc72a52ba79515db0c00f4f687a$init, $3ebbd6da2f6dbbd2ea0ba22bdc176caf$init, $2a4f8c7882dfdea78821148c89bf8779$init};

//# sourceMappingURL=offscreen-webgl-worker.dec4d95d.js.map
