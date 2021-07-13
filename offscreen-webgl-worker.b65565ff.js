(function () {
  var $parcel$global = typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : {};
  function $parcel$export(e, n, v) {
    Object.defineProperty(e, n, {
      get: v,
      enumerable: true
    });
  }
  var parcelRequire = $parcel$global.parcelRequire3582;
  var parcelRequireName = "parcelRequire3582";
  var $parcel$modules = {};
  var $parcel$bundles = {};
  if (parcelRequire == null) {
    parcelRequire = function (name) {
      // Execute the bundle wrapper function if there is one registered.
      if ((name in $parcel$bundles)) {
        let wrapper = $parcel$bundles[name];
        delete $parcel$bundles[name];
        wrapper();
      }
      if ((name in $parcel$modules)) {
        return $parcel$modules[name];
      }
      /*Try the node require function if it exists.*/
      /*Do not use `require` to prevent Webpack from trying to bundle this call*/
      if (typeof module !== 'undefined' && typeof module.require === 'function') {
        return module.require(name);
      }
      var err = new Error("Cannot find module '" + name + "'");
      err.code = 'MODULE_NOT_FOUND';
      throw err;
    };
    parcelRequire.register = function register(id, exports) {
      $parcel$modules[id] = exports;
    };
    parcelRequire.registerBundle = function registerBundle(id, fn) {
      $parcel$bundles[id] = fn;
      $parcel$modules[id] = {};
    };
    $parcel$global[parcelRequireName] = parcelRequire;
  }
  // ASSET: src/epiviz.gl/schema-processor.js
  var $647b390bbe26a1e6bbc6a8c9e19f41d2$exports = {};
  // ASSET: src/epiviz.gl/utilities.js
  var $794bbb298c1fc0cc3157526701549b8c$exports = {};
  // ASSET: src/epiviz.gl/genome-sizes.js
  var $2e9e6b6c3378724b336406626f99a6bc$exports = {};
  var $4d9f046a4b550b4140c040e477bb012c$export$default = function (x) {
    return Math.abs(x = Math.round(x)) >= 1e21 ? x.toLocaleString("en").replace(/,/g, "") : x.toString(10);
  };
  // Computes the decimal coefficient and exponent of the specified number x with
  // significant digits p, where x is positive and p is in [1, 21] or undefined.
  // For example, formatDecimalParts(1.23) returns ["123", 0].
  function $4d9f046a4b550b4140c040e477bb012c$export$formatDecimalParts(x, p) {
    if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null;
    // NaN, ±Infinity
    var i, coefficient = x.slice(0, i);
    // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
    // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).
    return [coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient, +x.slice(i + 1)];
  }
  var $cb7dec64aa301d089468cdbaade2d4dc$export$default = function (x) {
    return (x = $4d9f046a4b550b4140c040e477bb012c$export$formatDecimalParts(Math.abs(x)), x ? x[1] : NaN);
  };
  var $9c3157138be7d4238945bad8940fa5f0$export$default = function (grouping, thousands) {
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
  var $2089b68933f94ce986715353aae4a3fa$export$default = function (numerals) {
    return function (value) {
      return value.replace(/[0-9]/g, function (i) {
        return numerals[+i];
      });
    };
  };
  // [[fill]align][sign][symbol][0][width][,][.precision][~][type]
  var $a8405862f1d5b262cdb2954a0f30f9f1$var$re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
  function $a8405862f1d5b262cdb2954a0f30f9f1$export$default(specifier) {
    if (!(match = $a8405862f1d5b262cdb2954a0f30f9f1$var$re.exec(specifier))) throw new Error("invalid format: " + specifier);
    var match;
    return new $a8405862f1d5b262cdb2954a0f30f9f1$export$FormatSpecifier({
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
  $a8405862f1d5b262cdb2954a0f30f9f1$export$default.prototype = $a8405862f1d5b262cdb2954a0f30f9f1$export$FormatSpecifier.prototype;
  // instanceof
  function $a8405862f1d5b262cdb2954a0f30f9f1$export$FormatSpecifier(specifier) {
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
  $a8405862f1d5b262cdb2954a0f30f9f1$export$FormatSpecifier.prototype.toString = function () {
    return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === undefined ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === undefined ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
  };
  // Trims insignificant zeros, e.g., replaces 1.2000k with 1.2k.
  var $43b5e03d42c019c4ecae054226470b7a$export$default = function (s) {
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
  var $4f54a6fcbd12acee736587c0a0c51098$export$prefixExponent;
  var $4f54a6fcbd12acee736587c0a0c51098$export$default = function (x, p) {
    var d = $4d9f046a4b550b4140c040e477bb012c$export$formatDecimalParts(x, p);
    if (!d) return x + "";
    var coefficient = d[0], exponent = d[1], i = exponent - ($4f54a6fcbd12acee736587c0a0c51098$export$prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1, n = coefficient.length;
    return i === n ? coefficient : i > n ? coefficient + new Array(i - n + 1).join("0") : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i) : "0." + new Array(1 - i).join("0") + $4d9f046a4b550b4140c040e477bb012c$export$formatDecimalParts(x, Math.max(0, p + i - 1))[0];
  };
  var $db37bf71996eec9b1e508e4772d6a00a$export$default = function (x, p) {
    var d = $4d9f046a4b550b4140c040e477bb012c$export$formatDecimalParts(x, p);
    if (!d) return x + "";
    var coefficient = d[0], exponent = d[1];
    return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1) : coefficient + new Array(exponent - coefficient.length + 2).join("0");
  };
  var $f088c751a18ef3f8dc71e733c140fa86$export$default = {
    "%": (x, p) => (x * 100).toFixed(p),
    "b": x => Math.round(x).toString(2),
    "c": x => x + "",
    "d": $4d9f046a4b550b4140c040e477bb012c$export$default,
    "e": (x, p) => x.toExponential(p),
    "f": (x, p) => x.toFixed(p),
    "g": (x, p) => x.toPrecision(p),
    "o": x => Math.round(x).toString(8),
    "p": (x, p) => $db37bf71996eec9b1e508e4772d6a00a$export$default(x * 100, p),
    "r": $db37bf71996eec9b1e508e4772d6a00a$export$default,
    "s": $4f54a6fcbd12acee736587c0a0c51098$export$default,
    "X": x => Math.round(x).toString(16).toUpperCase(),
    "x": x => Math.round(x).toString(16)
  };
  var $01583f1cf82af58ba99b28900d330719$export$default = function (x) {
    return x;
  };
  var $b3ada3f96306fbdafba4b22584a4e750$var$map = Array.prototype.map, $b3ada3f96306fbdafba4b22584a4e750$var$prefixes = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
  var $b3ada3f96306fbdafba4b22584a4e750$export$default = function (locale) {
    var group = locale.grouping === undefined || locale.thousands === undefined ? $01583f1cf82af58ba99b28900d330719$export$default : $9c3157138be7d4238945bad8940fa5f0$export$default($b3ada3f96306fbdafba4b22584a4e750$var$map.call(locale.grouping, Number), locale.thousands + ""), currencyPrefix = locale.currency === undefined ? "" : locale.currency[0] + "", currencySuffix = locale.currency === undefined ? "" : locale.currency[1] + "", decimal = locale.decimal === undefined ? "." : locale.decimal + "", numerals = locale.numerals === undefined ? $01583f1cf82af58ba99b28900d330719$export$default : $2089b68933f94ce986715353aae4a3fa$export$default($b3ada3f96306fbdafba4b22584a4e750$var$map.call(locale.numerals, String)), percent = locale.percent === undefined ? "%" : locale.percent + "", minus = locale.minus === undefined ? "−" : locale.minus + "", nan = locale.nan === undefined ? "NaN" : locale.nan + "";
    function newFormat(specifier) {
      specifier = $a8405862f1d5b262cdb2954a0f30f9f1$export$default(specifier);
      var fill = specifier.fill, align = specifier.align, sign = specifier.sign, symbol = specifier.symbol, zero = specifier.zero, width = specifier.width, comma = specifier.comma, precision = specifier.precision, trim = specifier.trim, type = specifier.type;
      // The "n" type is an alias for ",g".
      if (type === "n") (comma = true, type = "g"); else // The "" type, and any invalid type, is an alias for ".12~g".
      if (!$f088c751a18ef3f8dc71e733c140fa86$export$default[type]) (precision === undefined && (precision = 12), trim = true, type = "g");
      // If zero fill is specified, padding goes after sign and before digits.
      if (zero || fill === "0" && align === "=") (zero = true, fill = "0", align = "=");
      // Compute the prefix and suffix.
      // For SI-prefix, the suffix is lazily computed.
      var prefix = symbol === "$" ? currencyPrefix : symbol === "#" && (/[boxX]/).test(type) ? "0" + type.toLowerCase() : "", suffix = symbol === "$" ? currencySuffix : (/[%p]/).test(type) ? percent : "";
      // What format function should we use?
      // Is this an integer type?
      // Can this type generate exponential notation?
      var formatType = $f088c751a18ef3f8dc71e733c140fa86$export$default[type], maybeSuffix = (/[defgprs%]/).test(type);
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
          if (trim) value = $43b5e03d42c019c4ecae054226470b7a$export$default(value);
          // If a negative value rounds to zero after formatting, and no explicit positive sign is requested, hide the sign.
          if (valueNegative && +value === 0 && sign !== "+") valueNegative = false;
          // Compute the prefix and suffix.
          valuePrefix = (valueNegative ? sign === "(" ? sign : minus : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
          valueSuffix = (type === "s" ? $b3ada3f96306fbdafba4b22584a4e750$var$prefixes[8 + $4f54a6fcbd12acee736587c0a0c51098$export$prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : "");
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
      var f = newFormat((specifier = $a8405862f1d5b262cdb2954a0f30f9f1$export$default(specifier), specifier.type = "f", specifier)), e = Math.max(-8, Math.min(8, Math.floor($cb7dec64aa301d089468cdbaade2d4dc$export$default(value) / 3))) * 3, k = Math.pow(10, -e), prefix = $b3ada3f96306fbdafba4b22584a4e750$var$prefixes[8 + e / 3];
      return function (value) {
        return f(k * value) + prefix;
      };
    }
    return {
      format: newFormat,
      formatPrefix: formatPrefix
    };
  };
  var $c8cf865515e7e5d7357b07df1e313b78$var$locale;
  var $c8cf865515e7e5d7357b07df1e313b78$export$format;
  var $c8cf865515e7e5d7357b07df1e313b78$export$formatPrefix;
  $c8cf865515e7e5d7357b07df1e313b78$export$default({
    thousands: ",",
    grouping: [3],
    currency: ["$", ""]
  });
  function $c8cf865515e7e5d7357b07df1e313b78$export$default(definition) {
    $c8cf865515e7e5d7357b07df1e313b78$var$locale = $b3ada3f96306fbdafba4b22584a4e750$export$default(definition);
    $c8cf865515e7e5d7357b07df1e313b78$export$format = $c8cf865515e7e5d7357b07df1e313b78$var$locale.format;
    $c8cf865515e7e5d7357b07df1e313b78$export$formatPrefix = $c8cf865515e7e5d7357b07df1e313b78$var$locale.formatPrefix;
    return $c8cf865515e7e5d7357b07df1e313b78$var$locale;
  }
  var $2b421b5a834cad866fae02fb48790107$export$default = function (step, max) {
    (step = Math.abs(step), max = Math.abs(max) - step);
    return Math.max(0, $cb7dec64aa301d089468cdbaade2d4dc$export$default(max) - $cb7dec64aa301d089468cdbaade2d4dc$export$default(step)) + 1;
  };
  /**
  * Create a function which maps a genome pair to a location in the entire genome
  *
  * @param {String} genomeId key from genomeSizes object
  * @returns a function which maps a (chrId, pairNum) => to
  *  a number between 1 and total number of genes in the genome
  */
  const $2e9e6b6c3378724b336406626f99a6bc$var$createPairMapperToGenome = genomeId => {
    let chrSizes = $2e9e6b6c3378724b336406626f99a6bc$export$genomeSizes[genomeId];
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
  class $2e9e6b6c3378724b336406626f99a6bc$export$GenomeScale {
    /**
    * A scale used to map a genome pair to a location between -1 and 1 for data visualization.
    * Also contains inverse and utility functions for getting labels for axis.
    *
    * @param {String} genomeId key from genomeSizes object
    * @param {Array} domain array of length 2 containing the start and end of the genome
    *   for the scale. ex: ["chr2:1000", "chr3:2000"]
    */
    constructor(genomeId, domain) {
      if ($2e9e6b6c3378724b336406626f99a6bc$export$genomeSizes[genomeId] === undefined) {
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
      this.mapPairToGenomeIndex = $2e9e6b6c3378724b336406626f99a6bc$var$createPairMapperToGenome(genomeId);
      const firstPairInDomain = this.mapPairToGenomeIndex(startChr, startPair);
      const lastPairInDomain = this.mapPairToGenomeIndex(endChr, endPair);
      this.mapGenomeIndexToClipSpace = $794bbb298c1fc0cc3157526701549b8c$export$scale([firstPairInDomain, lastPairInDomain], [-1, 1]);
      this.mapGenomeIndexToClipSpaceInverse = $794bbb298c1fc0cc3157526701549b8c$export$scale([-1, 1], [firstPairInDomain, lastPairInDomain]);
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
      for (const [chrKey, pairCount] of $2e9e6b6c3378724b336406626f99a6bc$export$genomeSizes[this.genomeId].entries()) {
        if (cumulativeTotal + pairCount >= genomeSpot) {
          chrLoc = genomeSpot - cumulativeTotal;
          chrId = chrKey;
          break;
        }
        cumulativeTotal += pairCount;
      }
      return formatting ? `chr${chrId}:${$c8cf865515e7e5d7357b07df1e313b78$export$format(formatting)(chrLoc)}` : `chr${chrId}:${chrLoc}`;
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
        suggestedFormat = $2b421b5a834cad866fae02fb48790107$export$default(10 ** magnitude, startingValue);
        for (let currValue = startingValue; currValue < endPair; currValue += 10 ** magnitude) {
          toReturn.push(this.toClipSpaceFromParts(startChr, currValue));
        }
      } else {
        suggestedFormat = "1";
        for (const chrId of $2e9e6b6c3378724b336406626f99a6bc$export$genomeSizes[this.genomeId].keys()) {
          toReturn.push(this.toClipSpaceFromParts(chrId, 1));
        }
      }
      return {
        tickCoords: toReturn,
        tickLabels: toReturn.map(coord => this.inverse(coord, $c8cf865515e7e5d7357b07df1e313b78$export$format(`.${suggestedFormat}s`)))
      };
    }
    /**
    * Utility method for getting a GenomeScale across an entire genome.
    *
    * @param {String} genomeId from genomeSizes
    * @returns a GenomeScale across an entire genome
    */
    static completeScale(genomeId) {
      const chrSizes = $2e9e6b6c3378724b336406626f99a6bc$export$genomeSizes[genomeId];
      const finalEntry = [...chrSizes.entries()][chrSizes.size - 1];
      return new $2e9e6b6c3378724b336406626f99a6bc$export$GenomeScale(genomeId, ["chr1:1", `chr${finalEntry[0]}:${finalEntry[1]}`]);
    }
  }
  /**
  * Available genomes to visualize. Each genome is a map from chromosome id to number of genes in chromosome.
  * Order matters as maps remember insertion order.
  */
  const $2e9e6b6c3378724b336406626f99a6bc$export$genomeSizes = {
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
    mm39: new Map([["1", 195154279], // chr1
    ["2", 181755017], // chr2
    ["3", 159745316], // ...
    ["4", 156860686], ["5", 151758149], ["6", 149588044], ["7", 144995196], ["8", 130127694], ["9", 124359700], ["10", 130530862], ["11", 121973369], ["12", 120092757], ["13", 120883175], ["14", 125139656], ["15", 104073951], ["16", 98008968], ["17", 95294699], // ...
    ["18", 90720763], // chr18
    ["19", 61420004], // chr19
    ["X", 169476592], // chrX
    ["Y", 91455967]])
  };
  $parcel$export($2e9e6b6c3378724b336406626f99a6bc$exports, "GenomeScale", function () {
    return $2e9e6b6c3378724b336406626f99a6bc$export$GenomeScale;
  });
  var $d62aa320cc500c815d2fd0c000e80e4d$export$default = function (constructor, factory, prototype) {
    constructor.prototype = factory.prototype = prototype;
    prototype.constructor = constructor;
  };
  function $d62aa320cc500c815d2fd0c000e80e4d$export$extend(parent, definition) {
    var prototype = Object.create(parent.prototype);
    for (var key in definition) prototype[key] = definition[key];
    return prototype;
  }
  function $af4ad10b60118211d1082e6b107c9493$export$Color() {}
  var $af4ad10b60118211d1082e6b107c9493$export$darker = 0.7;
  var $af4ad10b60118211d1082e6b107c9493$export$brighter = 1 / $af4ad10b60118211d1082e6b107c9493$export$darker;
  var $af4ad10b60118211d1082e6b107c9493$var$reI = "\\s*([+-]?\\d+)\\s*", $af4ad10b60118211d1082e6b107c9493$var$reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*", $af4ad10b60118211d1082e6b107c9493$var$reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*", $af4ad10b60118211d1082e6b107c9493$var$reHex = /^#([0-9a-f]{3,8})$/, $af4ad10b60118211d1082e6b107c9493$var$reRgbInteger = new RegExp("^rgb\\(" + [$af4ad10b60118211d1082e6b107c9493$var$reI, $af4ad10b60118211d1082e6b107c9493$var$reI, $af4ad10b60118211d1082e6b107c9493$var$reI] + "\\)$"), $af4ad10b60118211d1082e6b107c9493$var$reRgbPercent = new RegExp("^rgb\\(" + [$af4ad10b60118211d1082e6b107c9493$var$reP, $af4ad10b60118211d1082e6b107c9493$var$reP, $af4ad10b60118211d1082e6b107c9493$var$reP] + "\\)$"), $af4ad10b60118211d1082e6b107c9493$var$reRgbaInteger = new RegExp("^rgba\\(" + [$af4ad10b60118211d1082e6b107c9493$var$reI, $af4ad10b60118211d1082e6b107c9493$var$reI, $af4ad10b60118211d1082e6b107c9493$var$reI, $af4ad10b60118211d1082e6b107c9493$var$reN] + "\\)$"), $af4ad10b60118211d1082e6b107c9493$var$reRgbaPercent = new RegExp("^rgba\\(" + [$af4ad10b60118211d1082e6b107c9493$var$reP, $af4ad10b60118211d1082e6b107c9493$var$reP, $af4ad10b60118211d1082e6b107c9493$var$reP, $af4ad10b60118211d1082e6b107c9493$var$reN] + "\\)$"), $af4ad10b60118211d1082e6b107c9493$var$reHslPercent = new RegExp("^hsl\\(" + [$af4ad10b60118211d1082e6b107c9493$var$reN, $af4ad10b60118211d1082e6b107c9493$var$reP, $af4ad10b60118211d1082e6b107c9493$var$reP] + "\\)$"), $af4ad10b60118211d1082e6b107c9493$var$reHslaPercent = new RegExp("^hsla\\(" + [$af4ad10b60118211d1082e6b107c9493$var$reN, $af4ad10b60118211d1082e6b107c9493$var$reP, $af4ad10b60118211d1082e6b107c9493$var$reP, $af4ad10b60118211d1082e6b107c9493$var$reN] + "\\)$");
  var $af4ad10b60118211d1082e6b107c9493$var$named = {
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
  $d62aa320cc500c815d2fd0c000e80e4d$export$default($af4ad10b60118211d1082e6b107c9493$export$Color, $af4ad10b60118211d1082e6b107c9493$export$default, {
    copy: function (channels) {
      return Object.assign(new this.constructor(), this, channels);
    },
    displayable: function () {
      return this.rgb().displayable();
    },
    hex: $af4ad10b60118211d1082e6b107c9493$var$color_formatHex,
    // Deprecated! Use color.formatHex.
    formatHex: $af4ad10b60118211d1082e6b107c9493$var$color_formatHex,
    formatHsl: $af4ad10b60118211d1082e6b107c9493$var$color_formatHsl,
    formatRgb: $af4ad10b60118211d1082e6b107c9493$var$color_formatRgb,
    toString: $af4ad10b60118211d1082e6b107c9493$var$color_formatRgb
  });
  function $af4ad10b60118211d1082e6b107c9493$var$color_formatHex() {
    return this.rgb().formatHex();
  }
  function $af4ad10b60118211d1082e6b107c9493$var$color_formatHsl() {
    return $af4ad10b60118211d1082e6b107c9493$export$hslConvert(this).formatHsl();
  }
  function $af4ad10b60118211d1082e6b107c9493$var$color_formatRgb() {
    return this.rgb().formatRgb();
  }
  function $af4ad10b60118211d1082e6b107c9493$export$default(format) {
    var m, l;
    format = (format + "").trim().toLowerCase();
    return (m = $af4ad10b60118211d1082e6b107c9493$var$reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? $af4ad10b60118211d1082e6b107c9493$var$rgbn(m) : // #ff0000
    l === 3 ? new $af4ad10b60118211d1082e6b107c9493$export$Rgb(m >> 8 & 0xf | m >> 4 & 0xf0, m >> 4 & 0xf | m & 0xf0, (m & 0xf) << 4 | m & 0xf, 1) : // #f00
    l === 8 ? $af4ad10b60118211d1082e6b107c9493$var$rgba(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) : // #ff000000
    l === 4 ? $af4ad10b60118211d1082e6b107c9493$var$rgba(m >> 12 & 0xf | m >> 8 & 0xf0, m >> 8 & 0xf | m >> 4 & 0xf0, m >> 4 & 0xf | m & 0xf0, ((m & 0xf) << 4 | m & 0xf) / 0xff) : // #f000
    null) : // invalid hex
    (m = $af4ad10b60118211d1082e6b107c9493$var$reRgbInteger.exec(format)) ? new $af4ad10b60118211d1082e6b107c9493$export$Rgb(m[1], m[2], m[3], 1) : // rgb(255, 0, 0)
    (m = $af4ad10b60118211d1082e6b107c9493$var$reRgbPercent.exec(format)) ? new $af4ad10b60118211d1082e6b107c9493$export$Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) : // rgb(100%, 0%, 0%)
    (m = $af4ad10b60118211d1082e6b107c9493$var$reRgbaInteger.exec(format)) ? $af4ad10b60118211d1082e6b107c9493$var$rgba(m[1], m[2], m[3], m[4]) : // rgba(255, 0, 0, 1)
    (m = $af4ad10b60118211d1082e6b107c9493$var$reRgbaPercent.exec(format)) ? $af4ad10b60118211d1082e6b107c9493$var$rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) : // rgb(100%, 0%, 0%, 1)
    (m = $af4ad10b60118211d1082e6b107c9493$var$reHslPercent.exec(format)) ? $af4ad10b60118211d1082e6b107c9493$var$hsla(m[1], m[2] / 100, m[3] / 100, 1) : // hsl(120, 50%, 50%)
    (m = $af4ad10b60118211d1082e6b107c9493$var$reHslaPercent.exec(format)) ? $af4ad10b60118211d1082e6b107c9493$var$hsla(m[1], m[2] / 100, m[3] / 100, m[4]) : // hsla(120, 50%, 50%, 1)
    $af4ad10b60118211d1082e6b107c9493$var$named.hasOwnProperty(format) ? $af4ad10b60118211d1082e6b107c9493$var$rgbn($af4ad10b60118211d1082e6b107c9493$var$named[format]) : // eslint-disable-line no-prototype-builtins
    format === "transparent" ? new $af4ad10b60118211d1082e6b107c9493$export$Rgb(NaN, NaN, NaN, 0) : null;
  }
  function $af4ad10b60118211d1082e6b107c9493$var$rgbn(n) {
    return new $af4ad10b60118211d1082e6b107c9493$export$Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
  }
  function $af4ad10b60118211d1082e6b107c9493$var$rgba(r, g, b, a) {
    if (a <= 0) r = g = b = NaN;
    return new $af4ad10b60118211d1082e6b107c9493$export$Rgb(r, g, b, a);
  }
  function $af4ad10b60118211d1082e6b107c9493$export$rgbConvert(o) {
    if (!(o instanceof $af4ad10b60118211d1082e6b107c9493$export$Color)) o = $af4ad10b60118211d1082e6b107c9493$export$default(o);
    if (!o) return new $af4ad10b60118211d1082e6b107c9493$export$Rgb();
    o = o.rgb();
    return new $af4ad10b60118211d1082e6b107c9493$export$Rgb(o.r, o.g, o.b, o.opacity);
  }
  function $af4ad10b60118211d1082e6b107c9493$export$rgb(r, g, b, opacity) {
    return arguments.length === 1 ? $af4ad10b60118211d1082e6b107c9493$export$rgbConvert(r) : new $af4ad10b60118211d1082e6b107c9493$export$Rgb(r, g, b, opacity == null ? 1 : opacity);
  }
  function $af4ad10b60118211d1082e6b107c9493$export$Rgb(r, g, b, opacity) {
    this.r = +r;
    this.g = +g;
    this.b = +b;
    this.opacity = +opacity;
  }
  $d62aa320cc500c815d2fd0c000e80e4d$export$default($af4ad10b60118211d1082e6b107c9493$export$Rgb, $af4ad10b60118211d1082e6b107c9493$export$rgb, $d62aa320cc500c815d2fd0c000e80e4d$export$extend($af4ad10b60118211d1082e6b107c9493$export$Color, {
    brighter: function (k) {
      k = k == null ? $af4ad10b60118211d1082e6b107c9493$export$brighter : Math.pow($af4ad10b60118211d1082e6b107c9493$export$brighter, k);
      return new $af4ad10b60118211d1082e6b107c9493$export$Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    darker: function (k) {
      k = k == null ? $af4ad10b60118211d1082e6b107c9493$export$darker : Math.pow($af4ad10b60118211d1082e6b107c9493$export$darker, k);
      return new $af4ad10b60118211d1082e6b107c9493$export$Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    rgb: function () {
      return this;
    },
    displayable: function () {
      return -0.5 <= this.r && this.r < 255.5 && (-0.5 <= this.g && this.g < 255.5) && (-0.5 <= this.b && this.b < 255.5) && (0 <= this.opacity && this.opacity <= 1);
    },
    hex: $af4ad10b60118211d1082e6b107c9493$var$rgb_formatHex,
    // Deprecated! Use color.formatHex.
    formatHex: $af4ad10b60118211d1082e6b107c9493$var$rgb_formatHex,
    formatRgb: $af4ad10b60118211d1082e6b107c9493$var$rgb_formatRgb,
    toString: $af4ad10b60118211d1082e6b107c9493$var$rgb_formatRgb
  }));
  function $af4ad10b60118211d1082e6b107c9493$var$rgb_formatHex() {
    return "#" + $af4ad10b60118211d1082e6b107c9493$var$hex(this.r) + $af4ad10b60118211d1082e6b107c9493$var$hex(this.g) + $af4ad10b60118211d1082e6b107c9493$var$hex(this.b);
  }
  function $af4ad10b60118211d1082e6b107c9493$var$rgb_formatRgb() {
    var a = this.opacity;
    a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
    return (a === 1 ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (a === 1 ? ")" : ", " + a + ")");
  }
  function $af4ad10b60118211d1082e6b107c9493$var$hex(value) {
    value = Math.max(0, Math.min(255, Math.round(value) || 0));
    return (value < 16 ? "0" : "") + value.toString(16);
  }
  function $af4ad10b60118211d1082e6b107c9493$var$hsla(h, s, l, a) {
    if (a <= 0) h = s = l = NaN; else if (l <= 0 || l >= 1) h = s = NaN; else if (s <= 0) h = NaN;
    return new $af4ad10b60118211d1082e6b107c9493$var$Hsl(h, s, l, a);
  }
  function $af4ad10b60118211d1082e6b107c9493$export$hslConvert(o) {
    if (o instanceof $af4ad10b60118211d1082e6b107c9493$var$Hsl) return new $af4ad10b60118211d1082e6b107c9493$var$Hsl(o.h, o.s, o.l, o.opacity);
    if (!(o instanceof $af4ad10b60118211d1082e6b107c9493$export$Color)) o = $af4ad10b60118211d1082e6b107c9493$export$default(o);
    if (!o) return new $af4ad10b60118211d1082e6b107c9493$var$Hsl();
    if (o instanceof $af4ad10b60118211d1082e6b107c9493$var$Hsl) return o;
    o = o.rgb();
    var r = o.r / 255, g = o.g / 255, b = o.b / 255, min = Math.min(r, g, b), max = Math.max(r, g, b), h = NaN, s = max - min, l = (max + min) / 2;
    if (s) {
      if (r === max) h = (g - b) / s + (g < b) * 6; else if (g === max) h = (b - r) / s + 2; else h = (r - g) / s + 4;
      s /= l < 0.5 ? max + min : 2 - max - min;
      h *= 60;
    } else {
      s = l > 0 && l < 1 ? 0 : h;
    }
    return new $af4ad10b60118211d1082e6b107c9493$var$Hsl(h, s, l, o.opacity);
  }
  function $af4ad10b60118211d1082e6b107c9493$export$hsl(h, s, l, opacity) {
    return arguments.length === 1 ? $af4ad10b60118211d1082e6b107c9493$export$hslConvert(h) : new $af4ad10b60118211d1082e6b107c9493$var$Hsl(h, s, l, opacity == null ? 1 : opacity);
  }
  function $af4ad10b60118211d1082e6b107c9493$var$Hsl(h, s, l, opacity) {
    this.h = +h;
    this.s = +s;
    this.l = +l;
    this.opacity = +opacity;
  }
  $d62aa320cc500c815d2fd0c000e80e4d$export$default($af4ad10b60118211d1082e6b107c9493$var$Hsl, $af4ad10b60118211d1082e6b107c9493$export$hsl, $d62aa320cc500c815d2fd0c000e80e4d$export$extend($af4ad10b60118211d1082e6b107c9493$export$Color, {
    brighter: function (k) {
      k = k == null ? $af4ad10b60118211d1082e6b107c9493$export$brighter : Math.pow($af4ad10b60118211d1082e6b107c9493$export$brighter, k);
      return new $af4ad10b60118211d1082e6b107c9493$var$Hsl(this.h, this.s, this.l * k, this.opacity);
    },
    darker: function (k) {
      k = k == null ? $af4ad10b60118211d1082e6b107c9493$export$darker : Math.pow($af4ad10b60118211d1082e6b107c9493$export$darker, k);
      return new $af4ad10b60118211d1082e6b107c9493$var$Hsl(this.h, this.s, this.l * k, this.opacity);
    },
    rgb: function () {
      var h = this.h % 360 + (this.h < 0) * 360, s = isNaN(h) || isNaN(this.s) ? 0 : this.s, l = this.l, m2 = l + (l < 0.5 ? l : 1 - l) * s, m1 = 2 * l - m2;
      return new $af4ad10b60118211d1082e6b107c9493$export$Rgb($af4ad10b60118211d1082e6b107c9493$var$hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2), $af4ad10b60118211d1082e6b107c9493$var$hsl2rgb(h, m1, m2), $af4ad10b60118211d1082e6b107c9493$var$hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2), this.opacity);
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
  function $af4ad10b60118211d1082e6b107c9493$var$hsl2rgb(h, m1, m2) {
    return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
  }
  const $c178fae7767ea8147bbb573141e780e5$export$radians = Math.PI / 180;
  const $c178fae7767ea8147bbb573141e780e5$export$degrees = 180 / Math.PI;
  var $79f190ed402495135fad2dd69bf11529$var$A = -0.14861, $79f190ed402495135fad2dd69bf11529$var$B = +1.78277, $79f190ed402495135fad2dd69bf11529$var$C = -0.29227, $79f190ed402495135fad2dd69bf11529$var$D = -0.90649, $79f190ed402495135fad2dd69bf11529$var$E = +1.97294, $79f190ed402495135fad2dd69bf11529$var$ED = $79f190ed402495135fad2dd69bf11529$var$E * $79f190ed402495135fad2dd69bf11529$var$D, $79f190ed402495135fad2dd69bf11529$var$EB = $79f190ed402495135fad2dd69bf11529$var$E * $79f190ed402495135fad2dd69bf11529$var$B, $79f190ed402495135fad2dd69bf11529$var$BC_DA = $79f190ed402495135fad2dd69bf11529$var$B * $79f190ed402495135fad2dd69bf11529$var$C - $79f190ed402495135fad2dd69bf11529$var$D * $79f190ed402495135fad2dd69bf11529$var$A;
  function $79f190ed402495135fad2dd69bf11529$var$cubehelixConvert(o) {
    if (o instanceof $79f190ed402495135fad2dd69bf11529$export$Cubehelix) return new $79f190ed402495135fad2dd69bf11529$export$Cubehelix(o.h, o.s, o.l, o.opacity);
    if (!(o instanceof $af4ad10b60118211d1082e6b107c9493$export$Rgb)) o = $af4ad10b60118211d1082e6b107c9493$export$rgbConvert(o);
    var r = o.r / 255, g = o.g / 255, b = o.b / 255, l = ($79f190ed402495135fad2dd69bf11529$var$BC_DA * b + $79f190ed402495135fad2dd69bf11529$var$ED * r - $79f190ed402495135fad2dd69bf11529$var$EB * g) / ($79f190ed402495135fad2dd69bf11529$var$BC_DA + $79f190ed402495135fad2dd69bf11529$var$ED - $79f190ed402495135fad2dd69bf11529$var$EB), bl = b - l, k = ($79f190ed402495135fad2dd69bf11529$var$E * (g - l) - $79f190ed402495135fad2dd69bf11529$var$C * bl) / $79f190ed402495135fad2dd69bf11529$var$D, s = Math.sqrt(k * k + bl * bl) / ($79f190ed402495135fad2dd69bf11529$var$E * l * (1 - l)), // NaN if l=0 or l=1
    h = s ? Math.atan2(k, bl) * $c178fae7767ea8147bbb573141e780e5$export$degrees - 120 : NaN;
    return new $79f190ed402495135fad2dd69bf11529$export$Cubehelix(h < 0 ? h + 360 : h, s, l, o.opacity);
  }
  function $79f190ed402495135fad2dd69bf11529$export$default(h, s, l, opacity) {
    return arguments.length === 1 ? $79f190ed402495135fad2dd69bf11529$var$cubehelixConvert(h) : new $79f190ed402495135fad2dd69bf11529$export$Cubehelix(h, s, l, opacity == null ? 1 : opacity);
  }
  function $79f190ed402495135fad2dd69bf11529$export$Cubehelix(h, s, l, opacity) {
    this.h = +h;
    this.s = +s;
    this.l = +l;
    this.opacity = +opacity;
  }
  $d62aa320cc500c815d2fd0c000e80e4d$export$default($79f190ed402495135fad2dd69bf11529$export$Cubehelix, $79f190ed402495135fad2dd69bf11529$export$default, $d62aa320cc500c815d2fd0c000e80e4d$export$extend($af4ad10b60118211d1082e6b107c9493$export$Color, {
    brighter: function (k) {
      k = k == null ? $af4ad10b60118211d1082e6b107c9493$export$brighter : Math.pow($af4ad10b60118211d1082e6b107c9493$export$brighter, k);
      return new $79f190ed402495135fad2dd69bf11529$export$Cubehelix(this.h, this.s, this.l * k, this.opacity);
    },
    darker: function (k) {
      k = k == null ? $af4ad10b60118211d1082e6b107c9493$export$darker : Math.pow($af4ad10b60118211d1082e6b107c9493$export$darker, k);
      return new $79f190ed402495135fad2dd69bf11529$export$Cubehelix(this.h, this.s, this.l * k, this.opacity);
    },
    rgb: function () {
      var h = isNaN(this.h) ? 0 : (this.h + 120) * $c178fae7767ea8147bbb573141e780e5$export$radians, l = +this.l, a = isNaN(this.s) ? 0 : this.s * l * (1 - l), cosh = Math.cos(h), sinh = Math.sin(h);
      return new $af4ad10b60118211d1082e6b107c9493$export$Rgb(255 * (l + a * ($79f190ed402495135fad2dd69bf11529$var$A * cosh + $79f190ed402495135fad2dd69bf11529$var$B * sinh)), 255 * (l + a * ($79f190ed402495135fad2dd69bf11529$var$C * cosh + $79f190ed402495135fad2dd69bf11529$var$D * sinh)), 255 * (l + a * ($79f190ed402495135fad2dd69bf11529$var$E * cosh)), this.opacity);
    }
  }));
  /**
  * Returns a linear scale to map elements in domain to elements in range.
  * @param {Array} domain array of length two containing minimum and maximum values
  * @param {Array} range array of length two containing minimum and maximum values
  * @returns linear scale mapping domain to range
  */
  function $794bbb298c1fc0cc3157526701549b8c$export$scale(domain, range) {
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
  function $794bbb298c1fc0cc3157526701549b8c$export$rgbToHex(red, green, blue) {
    return red << 16 | green << 8 | blue << 0;
  }
  function $794bbb298c1fc0cc3157526701549b8c$export$rgbStringToHex(rgb) {
    const colorVals = rgb.substring(4, rgb.length - 1).split(",");
    return $794bbb298c1fc0cc3157526701549b8c$export$rgbToHex(...colorVals.map(asStr => parseInt(asStr)));
  }
  function $794bbb298c1fc0cc3157526701549b8c$export$colorSpecifierToHex(specifier) {
    if (!isNaN(specifier)) {
      // Specifier is already a hex value
      return Math.floor(specifier);
    }
    const asColor = $af4ad10b60118211d1082e6b107c9493$export$default(specifier);
    return $794bbb298c1fc0cc3157526701549b8c$export$rgbToHex(asColor.r, asColor.g, asColor.b);
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
  function $794bbb298c1fc0cc3157526701549b8c$export$getViewportForSchema(schema) {
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
      if (!yDomain && track.y.value !== undefined && track.height.domain !== undefined) {
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
  const $794bbb298c1fc0cc3157526701549b8c$export$getScaleForSchema = (dimension, schema) => {
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
      const viewport = $794bbb298c1fc0cc3157526701549b8c$export$getViewportForSchema(schema);
      if (dimension === "x") {
        return $794bbb298c1fc0cc3157526701549b8c$export$scale([viewport[0], viewport[1]], [-1, 1]);
      }
      return $794bbb298c1fc0cc3157526701549b8c$export$scale([viewport[2], viewport[3]], [-1, 1]);
    }
    const geneScale = $2e9e6b6c3378724b336406626f99a6bc$export$GenomeScale.completeScale(genome);
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
    return new $2e9e6b6c3378724b336406626f99a6bc$export$GenomeScale(genome, [smallestGene, largestGene]);
  };
  const $794bbb298c1fc0cc3157526701549b8c$var$DEFAULT_MARGIN = "2em";
  const $794bbb298c1fc0cc3157526701549b8c$export$getDimAndMarginStyleForSchema = schema => {
    if (schema.margins === undefined) {
      return {
        width: `calc(100% - ${$794bbb298c1fc0cc3157526701549b8c$var$DEFAULT_MARGIN} - ${$794bbb298c1fc0cc3157526701549b8c$var$DEFAULT_MARGIN}`,
        height: `calc(100% - ${$794bbb298c1fc0cc3157526701549b8c$var$DEFAULT_MARGIN} - ${$794bbb298c1fc0cc3157526701549b8c$var$DEFAULT_MARGIN}`,
        margin: $794bbb298c1fc0cc3157526701549b8c$var$DEFAULT_MARGIN
      };
    }
    let toReturn = {};
    toReturn.width = `calc(100% - ${schema.margins.left || $794bbb298c1fc0cc3157526701549b8c$var$DEFAULT_MARGIN} - ${schema.margins.right || $794bbb298c1fc0cc3157526701549b8c$var$DEFAULT_MARGIN})`;
    toReturn.height = `calc(100% - ${schema.margins.top || $794bbb298c1fc0cc3157526701549b8c$var$DEFAULT_MARGIN} - ${schema.margins.bottom || $794bbb298c1fc0cc3157526701549b8c$var$DEFAULT_MARGIN})`;
    // Shorthand for top right bottom left
    toReturn.margin = `${schema.margins.top || $794bbb298c1fc0cc3157526701549b8c$var$DEFAULT_MARGIN}
                     ${schema.margins.right || $794bbb298c1fc0cc3157526701549b8c$var$DEFAULT_MARGIN}
                     ${schema.margins.bottom || $794bbb298c1fc0cc3157526701549b8c$var$DEFAULT_MARGIN}
                     ${schema.margins.left || $794bbb298c1fc0cc3157526701549b8c$var$DEFAULT_MARGIN}`;
    return toReturn;
  };
  $parcel$export($794bbb298c1fc0cc3157526701549b8c$exports, "getDimAndMarginStyleForSchema", function () {
    return $794bbb298c1fc0cc3157526701549b8c$export$getDimAndMarginStyleForSchema;
  });
  $parcel$export($794bbb298c1fc0cc3157526701549b8c$exports, "getScaleForSchema", function () {
    return $794bbb298c1fc0cc3157526701549b8c$export$getScaleForSchema;
  });
  $parcel$export($794bbb298c1fc0cc3157526701549b8c$exports, "colorSpecifierToHex", function () {
    return $794bbb298c1fc0cc3157526701549b8c$export$colorSpecifierToHex;
  });
  $parcel$export($794bbb298c1fc0cc3157526701549b8c$exports, "getViewportForSchema", function () {
    return $794bbb298c1fc0cc3157526701549b8c$export$getViewportForSchema;
  });
  $parcel$export($794bbb298c1fc0cc3157526701549b8c$exports, "rgbStringToHex", function () {
    return $794bbb298c1fc0cc3157526701549b8c$export$rgbStringToHex;
  });
  $parcel$export($794bbb298c1fc0cc3157526701549b8c$exports, "scale", function () {
    return $794bbb298c1fc0cc3157526701549b8c$export$scale;
  });
  // ASSET: src/epiviz.gl/vertex-calculator.js
  var $6d3e717fed031fdb2ee2c357e03764b6$exports = {};
  // Each size unit refers to 1/200 of the clip space
  // e.g. if the canvas is 1000x1000 pixels, and the size value for a mark
  // is 10, then that mark takes up 10/200 = 1/20 of the clip space which
  // is equal to 50 pixels
  const $6d3e717fed031fdb2ee2c357e03764b6$export$SIZE_UNITS = 1 / 100;
  class $6d3e717fed031fdb2ee2c357e03764b6$export$default {
    /**
    * A class used to construct the vertices of marks that are given to the drawer to draw.
    *
    * @param {Function or GenomeScale} xScale maps the x values of the data to clip space [-1, 1]
    * @param {Function or GenomeScale} yScale maps the y values of the data to clip space [-1, 1]
    * @param {Object} track from schema
    */
    constructor(xScale, yScale, track) {
      if (xScale instanceof $2e9e6b6c3378724b336406626f99a6bc$export$GenomeScale) {
        this.xScale = args => xScale.toClipSpaceFromParts(args[0], args[1]);
      } else {
        this.xScale = xScale;
      }
      if (yScale instanceof $2e9e6b6c3378724b336406626f99a6bc$export$GenomeScale) {
        this.yScale = args => yScale.toClipSpaceFromParts(args[0], args[1]);
      } else {
        this.yScale = yScale;
      }
      this.track = track;
      this.drawMode = $647b390bbe26a1e6bbc6a8c9e19f41d2$export$getDrawModeForTrack(track);
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
        width = (this.xScale([mark.x[2], mark.x[3]]) - x1) / $6d3e717fed031fdb2ee2c357e03764b6$export$SIZE_UNITS;
      } else {
        x = mark.x;
        width = mark.width;
      }
      if (Array.isArray(mark.y)) {
        y = this.yScale([mark.y[0], mark.y[1]]);
        height = (this.yScale([mark.y[2], mark.y[3]]) - y) / $6d3e717fed031fdb2ee2c357e03764b6$export$SIZE_UNITS;
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
        vertices.push(center[0], center[1], center[0] + mark.size / 2 * Math.cos(theta) * $6d3e717fed031fdb2ee2c357e03764b6$export$SIZE_UNITS, center[1] + mark.size / 2 * Math.sin(theta) * $6d3e717fed031fdb2ee2c357e03764b6$export$SIZE_UNITS, center[0] + mark.size / 2 * Math.cos(theta + 2 * Math.PI / sides) * $6d3e717fed031fdb2ee2c357e03764b6$export$SIZE_UNITS, center[1] + mark.size / 2 * Math.sin(theta + 2 * Math.PI / sides) * $6d3e717fed031fdb2ee2c357e03764b6$export$SIZE_UNITS);
      }
      return vertices;
    }
    _getVerticesForTriangle(mark) {
      // 1
      // / \
      // 2---3
      const center = this._mapToGPUSpace([mark.x, mark.y]);
      return [center[0], center[1] + mark.size / 2 * $6d3e717fed031fdb2ee2c357e03764b6$export$SIZE_UNITS, center[0] - mark.size / 2 * $6d3e717fed031fdb2ee2c357e03764b6$export$SIZE_UNITS, center[1] - mark.size / 2 * $6d3e717fed031fdb2ee2c357e03764b6$export$SIZE_UNITS, center[0] + mark.size / 2 * $6d3e717fed031fdb2ee2c357e03764b6$export$SIZE_UNITS, center[1] - mark.size / 2 * $6d3e717fed031fdb2ee2c357e03764b6$export$SIZE_UNITS];
    }
    _getVertexForDot = mark => this._mapToGPUSpace([mark.x, mark.y]);
    _getVerticesForSquare(mark) {
      const center = this._mapToGPUSpace([mark.x, mark.y]);
      return [center[0] + mark.size / 2 * $6d3e717fed031fdb2ee2c357e03764b6$export$SIZE_UNITS, // 2------1,4
      center[1] + mark.size / 2 * $6d3e717fed031fdb2ee2c357e03764b6$export$SIZE_UNITS, // |    /  |
      center[0] - mark.size / 2 * $6d3e717fed031fdb2ee2c357e03764b6$export$SIZE_UNITS, // |  /    |
      center[1] + mark.size / 2 * $6d3e717fed031fdb2ee2c357e03764b6$export$SIZE_UNITS, // 3,5------6
      center[0] - mark.size / 2 * $6d3e717fed031fdb2ee2c357e03764b6$export$SIZE_UNITS, center[1] - mark.size / 2 * $6d3e717fed031fdb2ee2c357e03764b6$export$SIZE_UNITS, center[0] + mark.size / 2 * $6d3e717fed031fdb2ee2c357e03764b6$export$SIZE_UNITS, center[1] + mark.size / 2 * $6d3e717fed031fdb2ee2c357e03764b6$export$SIZE_UNITS, center[0] - mark.size / 2 * $6d3e717fed031fdb2ee2c357e03764b6$export$SIZE_UNITS, center[1] - mark.size / 2 * $6d3e717fed031fdb2ee2c357e03764b6$export$SIZE_UNITS, center[0] + mark.size / 2 * $6d3e717fed031fdb2ee2c357e03764b6$export$SIZE_UNITS, center[1] - mark.size / 2 * $6d3e717fed031fdb2ee2c357e03764b6$export$SIZE_UNITS];
    }
    _getVerticesForRect(mark) {
      // 2------------1,4
      // |        /    |
      // |    /        |
      // 3,5------------6
      const center = this._mapToGPUSpace([mark.x, mark.y]);
      return [center[0] + mark.width * $6d3e717fed031fdb2ee2c357e03764b6$export$SIZE_UNITS, center[1] + mark.height * $6d3e717fed031fdb2ee2c357e03764b6$export$SIZE_UNITS, center[0], center[1] + mark.height * $6d3e717fed031fdb2ee2c357e03764b6$export$SIZE_UNITS, center[0], center[1], center[0] + mark.width * $6d3e717fed031fdb2ee2c357e03764b6$export$SIZE_UNITS, center[1] + mark.height * $6d3e717fed031fdb2ee2c357e03764b6$export$SIZE_UNITS, center[0] + mark.width * $6d3e717fed031fdb2ee2c357e03764b6$export$SIZE_UNITS, center[1], center[0], center[1]];
    }
    _getVerticesForTick(mark) {
      const center = this._mapToGPUSpace([mark.x, mark.y]);
      // 1----2
      if (this.track.width) {
        return [center[0] + mark.width / 2 * $6d3e717fed031fdb2ee2c357e03764b6$export$SIZE_UNITS, center[1], center[0] - mark.width / 2 * $6d3e717fed031fdb2ee2c357e03764b6$export$SIZE_UNITS, center[1]];
      }
      // 1
      // |
      // 2
      if (mark.height) {
        // default to mark value which has default if height never specified in track
        return [center[0], center[1] + mark.height / 2 * $6d3e717fed031fdb2ee2c357e03764b6$export$SIZE_UNITS, center[0], center[1] - mark.height / 2 * $6d3e717fed031fdb2ee2c357e03764b6$export$SIZE_UNITS];
      }
    }
  }
  $parcel$export($6d3e717fed031fdb2ee2c357e03764b6$exports, "default", function () {
    return $6d3e717fed031fdb2ee2c357e03764b6$export$default;
  });
  $parcel$export($6d3e717fed031fdb2ee2c357e03764b6$exports, "SIZE_UNITS", function () {
    return $6d3e717fed031fdb2ee2c357e03764b6$export$SIZE_UNITS;
  });
  // ASSET: node_modules/d3-scale-chromatic/src/index.js
  var $c5987a6c12d3d7b5522038cb2a81673f$exports = {};
  var $30f13a352ff7e84978f989ae69eac0ba$export$default = function (specifier) {
    var n = specifier.length / 6 | 0, colors = new Array(n), i = 0;
    while (i < n) colors[i] = "#" + specifier.slice(i * 6, ++i * 6);
    return colors;
  };
  var $aa3f7b765c421e65cbd872af93568294$export$default = $30f13a352ff7e84978f989ae69eac0ba$export$default("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf");
  var $9cbc2a09144c6ef16fcb5449f3fcacf7$export$default = $30f13a352ff7e84978f989ae69eac0ba$export$default("7fc97fbeaed4fdc086ffff99386cb0f0027fbf5b17666666");
  var $57295374aa3b12e3d17bbf7d8b684f91$export$default = $30f13a352ff7e84978f989ae69eac0ba$export$default("1b9e77d95f027570b3e7298a66a61ee6ab02a6761d666666");
  var $db2bb71abb87256b2e9aa431de456efe$export$default = $30f13a352ff7e84978f989ae69eac0ba$export$default("a6cee31f78b4b2df8a33a02cfb9a99e31a1cfdbf6fff7f00cab2d66a3d9affff99b15928");
  var $77054ceb26eee8e7bf5fc90642092632$export$default = $30f13a352ff7e84978f989ae69eac0ba$export$default("fbb4aeb3cde3ccebc5decbe4fed9a6ffffcce5d8bdfddaecf2f2f2");
  var $b96e98c610ec667c1ba2b1128f8a57a7$export$default = $30f13a352ff7e84978f989ae69eac0ba$export$default("b3e2cdfdcdaccbd5e8f4cae4e6f5c9fff2aef1e2cccccccc");
  var $4ceaefeb271b644ec972c8cea9be5710$export$default = $30f13a352ff7e84978f989ae69eac0ba$export$default("e41a1c377eb84daf4a984ea3ff7f00ffff33a65628f781bf999999");
  var $4a64f92e212dfbeee2a3fead9d574b56$export$default = $30f13a352ff7e84978f989ae69eac0ba$export$default("66c2a5fc8d628da0cbe78ac3a6d854ffd92fe5c494b3b3b3");
  var $b62cf354320d57f52ab15f87ff6e1be0$export$default = $30f13a352ff7e84978f989ae69eac0ba$export$default("8dd3c7ffffb3bebadafb807280b1d3fdb462b3de69fccde5d9d9d9bc80bdccebc5ffed6f");
  var $e02e2a97ffd142d1a8b1378df139a249$export$default = $30f13a352ff7e84978f989ae69eac0ba$export$default("4e79a7f28e2ce1575976b7b259a14fedc949af7aa1ff9da79c755fbab0ab");
  function $f9591b106da887661cc44cc0a5ae2a1a$export$basis(t1, v0, v1, v2, v3) {
    var t2 = t1 * t1, t3 = t2 * t1;
    return ((1 - 3 * t1 + 3 * t2 - t3) * v0 + (4 - 6 * t2 + 3 * t3) * v1 + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2 + t3 * v3) / 6;
  }
  var $f9591b106da887661cc44cc0a5ae2a1a$export$default = function (values) {
    var n = values.length - 1;
    return function (t) {
      var i = t <= 0 ? t = 0 : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n), v1 = values[i], v2 = values[i + 1], v0 = i > 0 ? values[i - 1] : 2 * v1 - v2, v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
      return $f9591b106da887661cc44cc0a5ae2a1a$export$basis((t - i / n) * n, v0, v1, v2, v3);
    };
  };
  var $48e61e0a2a99e227efd007aca25428c4$export$default = function (values) {
    var n = values.length;
    return function (t) {
      var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n), v0 = values[(i + n - 1) % n], v1 = values[i % n], v2 = values[(i + 1) % n], v3 = values[(i + 2) % n];
      return $f9591b106da887661cc44cc0a5ae2a1a$export$basis((t - i / n) * n, v0, v1, v2, v3);
    };
  };
  var $822350c66aa52351ed6d23d455194cda$export$default = x => () => x;
  function $690f07296691540b7407e39c387448a2$var$linear(a, d) {
    return function (t) {
      return a + t * d;
    };
  }
  function $690f07296691540b7407e39c387448a2$var$exponential(a, b, y) {
    return (a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function (t) {
      return Math.pow(a + t * b, y);
    });
  }
  function $690f07296691540b7407e39c387448a2$export$hue(a, b) {
    var d = b - a;
    return d ? $690f07296691540b7407e39c387448a2$var$linear(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : $822350c66aa52351ed6d23d455194cda$export$default(isNaN(a) ? b : a);
  }
  function $690f07296691540b7407e39c387448a2$export$gamma(y) {
    return (y = +y) === 1 ? $690f07296691540b7407e39c387448a2$export$default : function (a, b) {
      return b - a ? $690f07296691540b7407e39c387448a2$var$exponential(a, b, y) : $822350c66aa52351ed6d23d455194cda$export$default(isNaN(a) ? b : a);
    };
  }
  function $690f07296691540b7407e39c387448a2$export$default(a, b) {
    var d = b - a;
    return d ? $690f07296691540b7407e39c387448a2$var$linear(a, d) : $822350c66aa52351ed6d23d455194cda$export$default(isNaN(a) ? b : a);
  }
  var $cf864b88de64295889b88aa5915dc775$export$default = (function rgbGamma(y) {
    var color = $690f07296691540b7407e39c387448a2$export$gamma(y);
    function rgb(start, end) {
      var r = color((start = $af4ad10b60118211d1082e6b107c9493$export$rgb(start)).r, (end = $af4ad10b60118211d1082e6b107c9493$export$rgb(end)).r), g = color(start.g, end.g), b = color(start.b, end.b), opacity = $690f07296691540b7407e39c387448a2$export$default(start.opacity, end.opacity);
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
  function $cf864b88de64295889b88aa5915dc775$var$rgbSpline(spline) {
    return function (colors) {
      var n = colors.length, r = new Array(n), g = new Array(n), b = new Array(n), i, color;
      for (i = 0; i < n; ++i) {
        color = $af4ad10b60118211d1082e6b107c9493$export$rgb(colors[i]);
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
  var $cf864b88de64295889b88aa5915dc775$export$rgbBasis = $cf864b88de64295889b88aa5915dc775$var$rgbSpline($f9591b106da887661cc44cc0a5ae2a1a$export$default);
  var $cf864b88de64295889b88aa5915dc775$export$rgbBasisClosed = $cf864b88de64295889b88aa5915dc775$var$rgbSpline($48e61e0a2a99e227efd007aca25428c4$export$default);
  function $06b2e865abde473f08f928d765f38ff7$var$cubehelix(hue) {
    return (function cubehelixGamma(y) {
      y = +y;
      function cubehelix(start, end) {
        var h = hue((start = $79f190ed402495135fad2dd69bf11529$export$default(start)).h, (end = $79f190ed402495135fad2dd69bf11529$export$default(end)).h), s = $690f07296691540b7407e39c387448a2$export$default(start.s, end.s), l = $690f07296691540b7407e39c387448a2$export$default(start.l, end.l), opacity = $690f07296691540b7407e39c387448a2$export$default(start.opacity, end.opacity);
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
  var $06b2e865abde473f08f928d765f38ff7$export$default = $06b2e865abde473f08f928d765f38ff7$var$cubehelix($690f07296691540b7407e39c387448a2$export$hue);
  var $06b2e865abde473f08f928d765f38ff7$export$cubehelixLong = $06b2e865abde473f08f928d765f38ff7$var$cubehelix($690f07296691540b7407e39c387448a2$export$default);
  var $dd53cfb75bb27e5a5ef41ddbba7aa59b$export$default = scheme => $cf864b88de64295889b88aa5915dc775$export$rgbBasis(scheme[scheme.length - 1]);
  var $1b6ee8bc9088cab8e996040c991edf5f$export$scheme = new Array(3).concat("d8b365f5f5f55ab4ac", "a6611adfc27d80cdc1018571", "a6611adfc27df5f5f580cdc1018571", "8c510ad8b365f6e8c3c7eae55ab4ac01665e", "8c510ad8b365f6e8c3f5f5f5c7eae55ab4ac01665e", "8c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e", "8c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e", "5430058c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e003c30", "5430058c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e003c30").map($30f13a352ff7e84978f989ae69eac0ba$export$default);
  var $1b6ee8bc9088cab8e996040c991edf5f$export$default = $dd53cfb75bb27e5a5ef41ddbba7aa59b$export$default($1b6ee8bc9088cab8e996040c991edf5f$export$scheme);
  var $9ba59ac0fd35dda696aa47fb8def4973$export$scheme = new Array(3).concat("af8dc3f7f7f77fbf7b", "7b3294c2a5cfa6dba0008837", "7b3294c2a5cff7f7f7a6dba0008837", "762a83af8dc3e7d4e8d9f0d37fbf7b1b7837", "762a83af8dc3e7d4e8f7f7f7d9f0d37fbf7b1b7837", "762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b7837", "762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b7837", "40004b762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b783700441b", "40004b762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b783700441b").map($30f13a352ff7e84978f989ae69eac0ba$export$default);
  var $9ba59ac0fd35dda696aa47fb8def4973$export$default = $dd53cfb75bb27e5a5ef41ddbba7aa59b$export$default($9ba59ac0fd35dda696aa47fb8def4973$export$scheme);
  var $bb99b731182d047bf1f2189fb5debd68$export$scheme = new Array(3).concat("e9a3c9f7f7f7a1d76a", "d01c8bf1b6dab8e1864dac26", "d01c8bf1b6daf7f7f7b8e1864dac26", "c51b7de9a3c9fde0efe6f5d0a1d76a4d9221", "c51b7de9a3c9fde0eff7f7f7e6f5d0a1d76a4d9221", "c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221", "c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221", "8e0152c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221276419", "8e0152c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221276419").map($30f13a352ff7e84978f989ae69eac0ba$export$default);
  var $bb99b731182d047bf1f2189fb5debd68$export$default = $dd53cfb75bb27e5a5ef41ddbba7aa59b$export$default($bb99b731182d047bf1f2189fb5debd68$export$scheme);
  var $30b3e94cd5223d881aca06d679f8e59f$export$scheme = new Array(3).concat("998ec3f7f7f7f1a340", "5e3c99b2abd2fdb863e66101", "5e3c99b2abd2f7f7f7fdb863e66101", "542788998ec3d8daebfee0b6f1a340b35806", "542788998ec3d8daebf7f7f7fee0b6f1a340b35806", "5427888073acb2abd2d8daebfee0b6fdb863e08214b35806", "5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b35806", "2d004b5427888073acb2abd2d8daebfee0b6fdb863e08214b358067f3b08", "2d004b5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b358067f3b08").map($30f13a352ff7e84978f989ae69eac0ba$export$default);
  var $30b3e94cd5223d881aca06d679f8e59f$export$default = $dd53cfb75bb27e5a5ef41ddbba7aa59b$export$default($30b3e94cd5223d881aca06d679f8e59f$export$scheme);
  var $1a67a570fbfa99edd4504707f4f9ccb9$export$scheme = new Array(3).concat("ef8a62f7f7f767a9cf", "ca0020f4a58292c5de0571b0", "ca0020f4a582f7f7f792c5de0571b0", "b2182bef8a62fddbc7d1e5f067a9cf2166ac", "b2182bef8a62fddbc7f7f7f7d1e5f067a9cf2166ac", "b2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac", "b2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac", "67001fb2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac053061", "67001fb2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac053061").map($30f13a352ff7e84978f989ae69eac0ba$export$default);
  var $1a67a570fbfa99edd4504707f4f9ccb9$export$default = $dd53cfb75bb27e5a5ef41ddbba7aa59b$export$default($1a67a570fbfa99edd4504707f4f9ccb9$export$scheme);
  var $7b16c7e4ac08377e3360ded547003be0$export$scheme = new Array(3).concat("ef8a62ffffff999999", "ca0020f4a582bababa404040", "ca0020f4a582ffffffbababa404040", "b2182bef8a62fddbc7e0e0e09999994d4d4d", "b2182bef8a62fddbc7ffffffe0e0e09999994d4d4d", "b2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d", "b2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d", "67001fb2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d1a1a1a", "67001fb2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d1a1a1a").map($30f13a352ff7e84978f989ae69eac0ba$export$default);
  var $7b16c7e4ac08377e3360ded547003be0$export$default = $dd53cfb75bb27e5a5ef41ddbba7aa59b$export$default($7b16c7e4ac08377e3360ded547003be0$export$scheme);
  var $1b8ae59d7f057211bb677b1f84de8c3a$export$scheme = new Array(3).concat("fc8d59ffffbf91bfdb", "d7191cfdae61abd9e92c7bb6", "d7191cfdae61ffffbfabd9e92c7bb6", "d73027fc8d59fee090e0f3f891bfdb4575b4", "d73027fc8d59fee090ffffbfe0f3f891bfdb4575b4", "d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4", "d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4", "a50026d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4313695", "a50026d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4313695").map($30f13a352ff7e84978f989ae69eac0ba$export$default);
  var $1b8ae59d7f057211bb677b1f84de8c3a$export$default = $dd53cfb75bb27e5a5ef41ddbba7aa59b$export$default($1b8ae59d7f057211bb677b1f84de8c3a$export$scheme);
  var $6e1937103d88293fcfe16af515eacf88$export$scheme = new Array(3).concat("fc8d59ffffbf91cf60", "d7191cfdae61a6d96a1a9641", "d7191cfdae61ffffbfa6d96a1a9641", "d73027fc8d59fee08bd9ef8b91cf601a9850", "d73027fc8d59fee08bffffbfd9ef8b91cf601a9850", "d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850", "d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850", "a50026d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850006837", "a50026d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850006837").map($30f13a352ff7e84978f989ae69eac0ba$export$default);
  var $6e1937103d88293fcfe16af515eacf88$export$default = $dd53cfb75bb27e5a5ef41ddbba7aa59b$export$default($6e1937103d88293fcfe16af515eacf88$export$scheme);
  var $72822d5bbf82ea6e06f1ffa4aba9036b$export$scheme = new Array(3).concat("fc8d59ffffbf99d594", "d7191cfdae61abdda42b83ba", "d7191cfdae61ffffbfabdda42b83ba", "d53e4ffc8d59fee08be6f59899d5943288bd", "d53e4ffc8d59fee08bffffbfe6f59899d5943288bd", "d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd", "d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd", "9e0142d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd5e4fa2", "9e0142d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd5e4fa2").map($30f13a352ff7e84978f989ae69eac0ba$export$default);
  var $72822d5bbf82ea6e06f1ffa4aba9036b$export$default = $dd53cfb75bb27e5a5ef41ddbba7aa59b$export$default($72822d5bbf82ea6e06f1ffa4aba9036b$export$scheme);
  var $d6b7e81f27d14435b597366d36023e7a$export$scheme = new Array(3).concat("e5f5f999d8c92ca25f", "edf8fbb2e2e266c2a4238b45", "edf8fbb2e2e266c2a42ca25f006d2c", "edf8fbccece699d8c966c2a42ca25f006d2c", "edf8fbccece699d8c966c2a441ae76238b45005824", "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45005824", "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45006d2c00441b").map($30f13a352ff7e84978f989ae69eac0ba$export$default);
  var $d6b7e81f27d14435b597366d36023e7a$export$default = $dd53cfb75bb27e5a5ef41ddbba7aa59b$export$default($d6b7e81f27d14435b597366d36023e7a$export$scheme);
  var $2b53113c987540e7a0dbf52cbea0a25e$export$scheme = new Array(3).concat("e0ecf49ebcda8856a7", "edf8fbb3cde38c96c688419d", "edf8fbb3cde38c96c68856a7810f7c", "edf8fbbfd3e69ebcda8c96c68856a7810f7c", "edf8fbbfd3e69ebcda8c96c68c6bb188419d6e016b", "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d6e016b", "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d810f7c4d004b").map($30f13a352ff7e84978f989ae69eac0ba$export$default);
  var $2b53113c987540e7a0dbf52cbea0a25e$export$default = $dd53cfb75bb27e5a5ef41ddbba7aa59b$export$default($2b53113c987540e7a0dbf52cbea0a25e$export$scheme);
  var $1ad0c74b663c202fe4c1672a67c724c7$export$scheme = new Array(3).concat("e0f3dba8ddb543a2ca", "f0f9e8bae4bc7bccc42b8cbe", "f0f9e8bae4bc7bccc443a2ca0868ac", "f0f9e8ccebc5a8ddb57bccc443a2ca0868ac", "f0f9e8ccebc5a8ddb57bccc44eb3d32b8cbe08589e", "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe08589e", "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe0868ac084081").map($30f13a352ff7e84978f989ae69eac0ba$export$default);
  var $1ad0c74b663c202fe4c1672a67c724c7$export$default = $dd53cfb75bb27e5a5ef41ddbba7aa59b$export$default($1ad0c74b663c202fe4c1672a67c724c7$export$scheme);
  var $f5428f69f798fe4ce68960e09a17cfa4$export$scheme = new Array(3).concat("fee8c8fdbb84e34a33", "fef0d9fdcc8afc8d59d7301f", "fef0d9fdcc8afc8d59e34a33b30000", "fef0d9fdd49efdbb84fc8d59e34a33b30000", "fef0d9fdd49efdbb84fc8d59ef6548d7301f990000", "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301f990000", "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301fb300007f0000").map($30f13a352ff7e84978f989ae69eac0ba$export$default);
  var $f5428f69f798fe4ce68960e09a17cfa4$export$default = $dd53cfb75bb27e5a5ef41ddbba7aa59b$export$default($f5428f69f798fe4ce68960e09a17cfa4$export$scheme);
  var $506923d913232f32c176ba6436b9aea9$export$scheme = new Array(3).concat("ece2f0a6bddb1c9099", "f6eff7bdc9e167a9cf02818a", "f6eff7bdc9e167a9cf1c9099016c59", "f6eff7d0d1e6a6bddb67a9cf1c9099016c59", "f6eff7d0d1e6a6bddb67a9cf3690c002818a016450", "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016450", "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016c59014636").map($30f13a352ff7e84978f989ae69eac0ba$export$default);
  var $506923d913232f32c176ba6436b9aea9$export$default = $dd53cfb75bb27e5a5ef41ddbba7aa59b$export$default($506923d913232f32c176ba6436b9aea9$export$scheme);
  var $306ac7416e9a3513d56b2c48fac9fe22$export$scheme = new Array(3).concat("ece7f2a6bddb2b8cbe", "f1eef6bdc9e174a9cf0570b0", "f1eef6bdc9e174a9cf2b8cbe045a8d", "f1eef6d0d1e6a6bddb74a9cf2b8cbe045a8d", "f1eef6d0d1e6a6bddb74a9cf3690c00570b0034e7b", "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0034e7b", "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0045a8d023858").map($30f13a352ff7e84978f989ae69eac0ba$export$default);
  var $306ac7416e9a3513d56b2c48fac9fe22$export$default = $dd53cfb75bb27e5a5ef41ddbba7aa59b$export$default($306ac7416e9a3513d56b2c48fac9fe22$export$scheme);
  var $645077da1a134e3d7c1d786dd3f90185$export$scheme = new Array(3).concat("e7e1efc994c7dd1c77", "f1eef6d7b5d8df65b0ce1256", "f1eef6d7b5d8df65b0dd1c77980043", "f1eef6d4b9dac994c7df65b0dd1c77980043", "f1eef6d4b9dac994c7df65b0e7298ace125691003f", "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125691003f", "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125698004367001f").map($30f13a352ff7e84978f989ae69eac0ba$export$default);
  var $645077da1a134e3d7c1d786dd3f90185$export$default = $dd53cfb75bb27e5a5ef41ddbba7aa59b$export$default($645077da1a134e3d7c1d786dd3f90185$export$scheme);
  var $6835478ad74eddd68d99714a15153615$export$scheme = new Array(3).concat("fde0ddfa9fb5c51b8a", "feebe2fbb4b9f768a1ae017e", "feebe2fbb4b9f768a1c51b8a7a0177", "feebe2fcc5c0fa9fb5f768a1c51b8a7a0177", "feebe2fcc5c0fa9fb5f768a1dd3497ae017e7a0177", "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a0177", "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a017749006a").map($30f13a352ff7e84978f989ae69eac0ba$export$default);
  var $6835478ad74eddd68d99714a15153615$export$default = $dd53cfb75bb27e5a5ef41ddbba7aa59b$export$default($6835478ad74eddd68d99714a15153615$export$scheme);
  var $01bbb23dc97705082d1d8d0d3051da94$export$scheme = new Array(3).concat("edf8b17fcdbb2c7fb8", "ffffcca1dab441b6c4225ea8", "ffffcca1dab441b6c42c7fb8253494", "ffffccc7e9b47fcdbb41b6c42c7fb8253494", "ffffccc7e9b47fcdbb41b6c41d91c0225ea80c2c84", "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea80c2c84", "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea8253494081d58").map($30f13a352ff7e84978f989ae69eac0ba$export$default);
  var $01bbb23dc97705082d1d8d0d3051da94$export$default = $dd53cfb75bb27e5a5ef41ddbba7aa59b$export$default($01bbb23dc97705082d1d8d0d3051da94$export$scheme);
  var $1b14dd723f4e9dc1fbb1b6114fbf7eb6$export$scheme = new Array(3).concat("f7fcb9addd8e31a354", "ffffccc2e69978c679238443", "ffffccc2e69978c67931a354006837", "ffffccd9f0a3addd8e78c67931a354006837", "ffffccd9f0a3addd8e78c67941ab5d238443005a32", "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443005a32", "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443006837004529").map($30f13a352ff7e84978f989ae69eac0ba$export$default);
  var $1b14dd723f4e9dc1fbb1b6114fbf7eb6$export$default = $dd53cfb75bb27e5a5ef41ddbba7aa59b$export$default($1b14dd723f4e9dc1fbb1b6114fbf7eb6$export$scheme);
  var $9f44c6506fe0e909e94a7ff8bd25556f$export$scheme = new Array(3).concat("fff7bcfec44fd95f0e", "ffffd4fed98efe9929cc4c02", "ffffd4fed98efe9929d95f0e993404", "ffffd4fee391fec44ffe9929d95f0e993404", "ffffd4fee391fec44ffe9929ec7014cc4c028c2d04", "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c028c2d04", "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c02993404662506").map($30f13a352ff7e84978f989ae69eac0ba$export$default);
  var $9f44c6506fe0e909e94a7ff8bd25556f$export$default = $dd53cfb75bb27e5a5ef41ddbba7aa59b$export$default($9f44c6506fe0e909e94a7ff8bd25556f$export$scheme);
  var $b26848c7d8192d0997f420acbfd5ef37$export$scheme = new Array(3).concat("ffeda0feb24cf03b20", "ffffb2fecc5cfd8d3ce31a1c", "ffffb2fecc5cfd8d3cf03b20bd0026", "ffffb2fed976feb24cfd8d3cf03b20bd0026", "ffffb2fed976feb24cfd8d3cfc4e2ae31a1cb10026", "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cb10026", "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cbd0026800026").map($30f13a352ff7e84978f989ae69eac0ba$export$default);
  var $b26848c7d8192d0997f420acbfd5ef37$export$default = $dd53cfb75bb27e5a5ef41ddbba7aa59b$export$default($b26848c7d8192d0997f420acbfd5ef37$export$scheme);
  var $46225ed11a6a774a08475e2723d825b6$export$scheme = new Array(3).concat("deebf79ecae13182bd", "eff3ffbdd7e76baed62171b5", "eff3ffbdd7e76baed63182bd08519c", "eff3ffc6dbef9ecae16baed63182bd08519c", "eff3ffc6dbef9ecae16baed64292c62171b5084594", "f7fbffdeebf7c6dbef9ecae16baed64292c62171b5084594", "f7fbffdeebf7c6dbef9ecae16baed64292c62171b508519c08306b").map($30f13a352ff7e84978f989ae69eac0ba$export$default);
  var $46225ed11a6a774a08475e2723d825b6$export$default = $dd53cfb75bb27e5a5ef41ddbba7aa59b$export$default($46225ed11a6a774a08475e2723d825b6$export$scheme);
  var $8b11a3478bfb00aa85ee5ca061fca7e5$export$scheme = new Array(3).concat("e5f5e0a1d99b31a354", "edf8e9bae4b374c476238b45", "edf8e9bae4b374c47631a354006d2c", "edf8e9c7e9c0a1d99b74c47631a354006d2c", "edf8e9c7e9c0a1d99b74c47641ab5d238b45005a32", "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45005a32", "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45006d2c00441b").map($30f13a352ff7e84978f989ae69eac0ba$export$default);
  var $8b11a3478bfb00aa85ee5ca061fca7e5$export$default = $dd53cfb75bb27e5a5ef41ddbba7aa59b$export$default($8b11a3478bfb00aa85ee5ca061fca7e5$export$scheme);
  var $d930882c02e448bb327f2352700809d0$export$scheme = new Array(3).concat("f0f0f0bdbdbd636363", "f7f7f7cccccc969696525252", "f7f7f7cccccc969696636363252525", "f7f7f7d9d9d9bdbdbd969696636363252525", "f7f7f7d9d9d9bdbdbd969696737373525252252525", "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525", "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525000000").map($30f13a352ff7e84978f989ae69eac0ba$export$default);
  var $d930882c02e448bb327f2352700809d0$export$default = $dd53cfb75bb27e5a5ef41ddbba7aa59b$export$default($d930882c02e448bb327f2352700809d0$export$scheme);
  var $d2fcd8e55e7260e28f89a0a130b2a8f4$export$scheme = new Array(3).concat("efedf5bcbddc756bb1", "f2f0f7cbc9e29e9ac86a51a3", "f2f0f7cbc9e29e9ac8756bb154278f", "f2f0f7dadaebbcbddc9e9ac8756bb154278f", "f2f0f7dadaebbcbddc9e9ac8807dba6a51a34a1486", "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a34a1486", "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a354278f3f007d").map($30f13a352ff7e84978f989ae69eac0ba$export$default);
  var $d2fcd8e55e7260e28f89a0a130b2a8f4$export$default = $dd53cfb75bb27e5a5ef41ddbba7aa59b$export$default($d2fcd8e55e7260e28f89a0a130b2a8f4$export$scheme);
  var $05313a9eb4e0e2f5b771b8f2e6f464ad$export$scheme = new Array(3).concat("fee0d2fc9272de2d26", "fee5d9fcae91fb6a4acb181d", "fee5d9fcae91fb6a4ade2d26a50f15", "fee5d9fcbba1fc9272fb6a4ade2d26a50f15", "fee5d9fcbba1fc9272fb6a4aef3b2ccb181d99000d", "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181d99000d", "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181da50f1567000d").map($30f13a352ff7e84978f989ae69eac0ba$export$default);
  var $05313a9eb4e0e2f5b771b8f2e6f464ad$export$default = $dd53cfb75bb27e5a5ef41ddbba7aa59b$export$default($05313a9eb4e0e2f5b771b8f2e6f464ad$export$scheme);
  var $27617258632878429e81ddfe67006b04$export$scheme = new Array(3).concat("fee6cefdae6be6550d", "feeddefdbe85fd8d3cd94701", "feeddefdbe85fd8d3ce6550da63603", "feeddefdd0a2fdae6bfd8d3ce6550da63603", "feeddefdd0a2fdae6bfd8d3cf16913d948018c2d04", "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d948018c2d04", "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d94801a636037f2704").map($30f13a352ff7e84978f989ae69eac0ba$export$default);
  var $27617258632878429e81ddfe67006b04$export$default = $dd53cfb75bb27e5a5ef41ddbba7aa59b$export$default($27617258632878429e81ddfe67006b04$export$scheme);
  var $e71c422d09c18fe65e65d6e06eaa5fab$export$default = function (t) {
    t = Math.max(0, Math.min(1, t));
    return "rgb(" + Math.max(0, Math.min(255, Math.round(-4.54 - t * (35.34 - t * (2381.73 - t * (6402.7 - t * (7024.72 - t * 2710.57))))))) + ", " + Math.max(0, Math.min(255, Math.round(32.49 + t * (170.73 + t * (52.82 - t * (131.46 - t * (176.58 - t * 67.37))))))) + ", " + Math.max(0, Math.min(255, Math.round(81.24 + t * (442.36 - t * (2482.43 - t * (6167.24 - t * (6614.94 - t * 2475.67))))))) + ")";
  };
  var $4a09e440dde3879ca8e8112d8419f3f0$export$default = $06b2e865abde473f08f928d765f38ff7$export$cubehelixLong($79f190ed402495135fad2dd69bf11529$export$default(300, 0.5, 0.0), $79f190ed402495135fad2dd69bf11529$export$default(-240, 0.5, 1.0));
  var $f3e500bbb58844e62ef003f83b9f1eb3$export$warm = $06b2e865abde473f08f928d765f38ff7$export$cubehelixLong($79f190ed402495135fad2dd69bf11529$export$default(-100, 0.75, 0.35), $79f190ed402495135fad2dd69bf11529$export$default(80, 1.50, 0.8));
  var $f3e500bbb58844e62ef003f83b9f1eb3$export$cool = $06b2e865abde473f08f928d765f38ff7$export$cubehelixLong($79f190ed402495135fad2dd69bf11529$export$default(260, 0.75, 0.35), $79f190ed402495135fad2dd69bf11529$export$default(80, 1.50, 0.8));
  var $f3e500bbb58844e62ef003f83b9f1eb3$var$c = $79f190ed402495135fad2dd69bf11529$export$default();
  var $f3e500bbb58844e62ef003f83b9f1eb3$export$default = function (t) {
    if (t < 0 || t > 1) t -= Math.floor(t);
    var ts = Math.abs(t - 0.5);
    $f3e500bbb58844e62ef003f83b9f1eb3$var$c.h = 360 * t - 100;
    $f3e500bbb58844e62ef003f83b9f1eb3$var$c.s = 1.5 - 1.5 * ts;
    $f3e500bbb58844e62ef003f83b9f1eb3$var$c.l = 0.8 - 0.9 * ts;
    return $f3e500bbb58844e62ef003f83b9f1eb3$var$c + "";
  };
  var $b84d3438a559d599f8de8e93b376e763$var$c = $af4ad10b60118211d1082e6b107c9493$export$rgb(), $b84d3438a559d599f8de8e93b376e763$var$pi_1_3 = Math.PI / 3, $b84d3438a559d599f8de8e93b376e763$var$pi_2_3 = Math.PI * 2 / 3;
  var $b84d3438a559d599f8de8e93b376e763$export$default = function (t) {
    var x;
    t = (0.5 - t) * Math.PI;
    $b84d3438a559d599f8de8e93b376e763$var$c.r = 255 * (x = Math.sin(t)) * x;
    $b84d3438a559d599f8de8e93b376e763$var$c.g = 255 * (x = Math.sin(t + $b84d3438a559d599f8de8e93b376e763$var$pi_1_3)) * x;
    $b84d3438a559d599f8de8e93b376e763$var$c.b = 255 * (x = Math.sin(t + $b84d3438a559d599f8de8e93b376e763$var$pi_2_3)) * x;
    return $b84d3438a559d599f8de8e93b376e763$var$c + "";
  };
  var $20233cc453bb81b83f0d18e552d7583b$export$default = function (t) {
    t = Math.max(0, Math.min(1, t));
    return "rgb(" + Math.max(0, Math.min(255, Math.round(34.61 + t * (1172.33 - t * (10793.56 - t * (33300.12 - t * (38394.49 - t * 14825.05))))))) + ", " + Math.max(0, Math.min(255, Math.round(23.31 + t * (557.33 + t * (1225.33 - t * (3574.96 - t * (1073.77 + t * 707.56))))))) + ", " + Math.max(0, Math.min(255, Math.round(27.2 + t * (3211.1 - t * (15327.97 - t * (27814 - t * (22569.18 - t * 6838.66))))))) + ")";
  };
  function $1f00eb975f725d678d6cd4a75976fc88$var$ramp(range) {
    var n = range.length;
    return function (t) {
      return range[Math.max(0, Math.min(n - 1, Math.floor(t * n)))];
    };
  }
  var $1f00eb975f725d678d6cd4a75976fc88$export$default = $1f00eb975f725d678d6cd4a75976fc88$var$ramp($30f13a352ff7e84978f989ae69eac0ba$export$default("44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725"));
  var $1f00eb975f725d678d6cd4a75976fc88$export$magma = $1f00eb975f725d678d6cd4a75976fc88$var$ramp($30f13a352ff7e84978f989ae69eac0ba$export$default("00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf"));
  var $1f00eb975f725d678d6cd4a75976fc88$export$inferno = $1f00eb975f725d678d6cd4a75976fc88$var$ramp($30f13a352ff7e84978f989ae69eac0ba$export$default("00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4"));
  var $1f00eb975f725d678d6cd4a75976fc88$export$plasma = $1f00eb975f725d678d6cd4a75976fc88$var$ramp($30f13a352ff7e84978f989ae69eac0ba$export$default("0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921"));
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "schemeCategory10", function () {
    return $aa3f7b765c421e65cbd872af93568294$export$default;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "schemeAccent", function () {
    return $9cbc2a09144c6ef16fcb5449f3fcacf7$export$default;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "schemeDark2", function () {
    return $57295374aa3b12e3d17bbf7d8b684f91$export$default;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "schemePaired", function () {
    return $db2bb71abb87256b2e9aa431de456efe$export$default;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "schemePastel1", function () {
    return $77054ceb26eee8e7bf5fc90642092632$export$default;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "schemePastel2", function () {
    return $b96e98c610ec667c1ba2b1128f8a57a7$export$default;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "schemeSet1", function () {
    return $4ceaefeb271b644ec972c8cea9be5710$export$default;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "schemeSet2", function () {
    return $4a64f92e212dfbeee2a3fead9d574b56$export$default;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "schemeSet3", function () {
    return $b62cf354320d57f52ab15f87ff6e1be0$export$default;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "schemeTableau10", function () {
    return $e02e2a97ffd142d1a8b1378df139a249$export$default;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "schemeBrBG", function () {
    return $1b6ee8bc9088cab8e996040c991edf5f$export$scheme;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "interpolateBrBG", function () {
    return $1b6ee8bc9088cab8e996040c991edf5f$export$default;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "schemePRGn", function () {
    return $9ba59ac0fd35dda696aa47fb8def4973$export$scheme;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "interpolatePRGn", function () {
    return $9ba59ac0fd35dda696aa47fb8def4973$export$default;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "schemePiYG", function () {
    return $bb99b731182d047bf1f2189fb5debd68$export$scheme;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "interpolatePiYG", function () {
    return $bb99b731182d047bf1f2189fb5debd68$export$default;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "schemePuOr", function () {
    return $30b3e94cd5223d881aca06d679f8e59f$export$scheme;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "interpolatePuOr", function () {
    return $30b3e94cd5223d881aca06d679f8e59f$export$default;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "schemeRdBu", function () {
    return $1a67a570fbfa99edd4504707f4f9ccb9$export$scheme;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "interpolateRdBu", function () {
    return $1a67a570fbfa99edd4504707f4f9ccb9$export$default;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "schemeRdGy", function () {
    return $7b16c7e4ac08377e3360ded547003be0$export$scheme;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "interpolateRdGy", function () {
    return $7b16c7e4ac08377e3360ded547003be0$export$default;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "schemeRdYlBu", function () {
    return $1b8ae59d7f057211bb677b1f84de8c3a$export$scheme;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "interpolateRdYlBu", function () {
    return $1b8ae59d7f057211bb677b1f84de8c3a$export$default;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "schemeRdYlGn", function () {
    return $6e1937103d88293fcfe16af515eacf88$export$scheme;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "interpolateRdYlGn", function () {
    return $6e1937103d88293fcfe16af515eacf88$export$default;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "schemeSpectral", function () {
    return $72822d5bbf82ea6e06f1ffa4aba9036b$export$scheme;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "interpolateSpectral", function () {
    return $72822d5bbf82ea6e06f1ffa4aba9036b$export$default;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "schemeBuGn", function () {
    return $d6b7e81f27d14435b597366d36023e7a$export$scheme;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "interpolateBuGn", function () {
    return $d6b7e81f27d14435b597366d36023e7a$export$default;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "schemeBuPu", function () {
    return $2b53113c987540e7a0dbf52cbea0a25e$export$scheme;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "interpolateBuPu", function () {
    return $2b53113c987540e7a0dbf52cbea0a25e$export$default;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "schemeGnBu", function () {
    return $1ad0c74b663c202fe4c1672a67c724c7$export$scheme;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "interpolateGnBu", function () {
    return $1ad0c74b663c202fe4c1672a67c724c7$export$default;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "schemeOrRd", function () {
    return $f5428f69f798fe4ce68960e09a17cfa4$export$scheme;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "interpolateOrRd", function () {
    return $f5428f69f798fe4ce68960e09a17cfa4$export$default;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "schemePuBuGn", function () {
    return $506923d913232f32c176ba6436b9aea9$export$scheme;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "interpolatePuBuGn", function () {
    return $506923d913232f32c176ba6436b9aea9$export$default;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "schemePuBu", function () {
    return $306ac7416e9a3513d56b2c48fac9fe22$export$scheme;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "interpolatePuBu", function () {
    return $306ac7416e9a3513d56b2c48fac9fe22$export$default;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "schemePuRd", function () {
    return $645077da1a134e3d7c1d786dd3f90185$export$scheme;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "interpolatePuRd", function () {
    return $645077da1a134e3d7c1d786dd3f90185$export$default;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "schemeRdPu", function () {
    return $6835478ad74eddd68d99714a15153615$export$scheme;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "interpolateRdPu", function () {
    return $6835478ad74eddd68d99714a15153615$export$default;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "schemeYlGnBu", function () {
    return $01bbb23dc97705082d1d8d0d3051da94$export$scheme;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "interpolateYlGnBu", function () {
    return $01bbb23dc97705082d1d8d0d3051da94$export$default;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "schemeYlGn", function () {
    return $1b14dd723f4e9dc1fbb1b6114fbf7eb6$export$scheme;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "interpolateYlGn", function () {
    return $1b14dd723f4e9dc1fbb1b6114fbf7eb6$export$default;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "schemeYlOrBr", function () {
    return $9f44c6506fe0e909e94a7ff8bd25556f$export$scheme;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "interpolateYlOrBr", function () {
    return $9f44c6506fe0e909e94a7ff8bd25556f$export$default;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "schemeYlOrRd", function () {
    return $b26848c7d8192d0997f420acbfd5ef37$export$scheme;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "interpolateYlOrRd", function () {
    return $b26848c7d8192d0997f420acbfd5ef37$export$default;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "schemeBlues", function () {
    return $46225ed11a6a774a08475e2723d825b6$export$scheme;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "interpolateBlues", function () {
    return $46225ed11a6a774a08475e2723d825b6$export$default;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "schemeGreens", function () {
    return $8b11a3478bfb00aa85ee5ca061fca7e5$export$scheme;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "interpolateGreens", function () {
    return $8b11a3478bfb00aa85ee5ca061fca7e5$export$default;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "schemeGreys", function () {
    return $d930882c02e448bb327f2352700809d0$export$scheme;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "interpolateGreys", function () {
    return $d930882c02e448bb327f2352700809d0$export$default;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "schemePurples", function () {
    return $d2fcd8e55e7260e28f89a0a130b2a8f4$export$scheme;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "interpolatePurples", function () {
    return $d2fcd8e55e7260e28f89a0a130b2a8f4$export$default;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "schemeReds", function () {
    return $05313a9eb4e0e2f5b771b8f2e6f464ad$export$scheme;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "interpolateReds", function () {
    return $05313a9eb4e0e2f5b771b8f2e6f464ad$export$default;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "schemeOranges", function () {
    return $27617258632878429e81ddfe67006b04$export$scheme;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "interpolateOranges", function () {
    return $27617258632878429e81ddfe67006b04$export$default;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "interpolateCividis", function () {
    return $e71c422d09c18fe65e65d6e06eaa5fab$export$default;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "interpolateCubehelixDefault", function () {
    return $4a09e440dde3879ca8e8112d8419f3f0$export$default;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "interpolateCool", function () {
    return $f3e500bbb58844e62ef003f83b9f1eb3$export$cool;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "interpolateWarm", function () {
    return $f3e500bbb58844e62ef003f83b9f1eb3$export$warm;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "interpolateRainbow", function () {
    return $f3e500bbb58844e62ef003f83b9f1eb3$export$default;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "interpolateSinebow", function () {
    return $b84d3438a559d599f8de8e93b376e763$export$default;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "interpolateTurbo", function () {
    return $20233cc453bb81b83f0d18e552d7583b$export$default;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "interpolatePlasma", function () {
    return $1f00eb975f725d678d6cd4a75976fc88$export$plasma;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "interpolateInferno", function () {
    return $1f00eb975f725d678d6cd4a75976fc88$export$inferno;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "interpolateMagma", function () {
    return $1f00eb975f725d678d6cd4a75976fc88$export$magma;
  });
  $parcel$export($c5987a6c12d3d7b5522038cb2a81673f$exports, "interpolateViridis", function () {
    return $1f00eb975f725d678d6cd4a75976fc88$export$default;
  });
  const $647b390bbe26a1e6bbc6a8c9e19f41d2$var$d3 = $c5987a6c12d3d7b5522038cb2a81673f$exports;
  // ASSET: node_modules/axios/index.js
  var $9a6acbaf99b7f614537e1f05bbe68696$exports = {};
  // ASSET: node_modules/axios/lib/axios.js
  var $ea182a60f6c3729931fdb5051f0fed05$exports = {};
  // ASSET: node_modules/axios/lib/helpers/bind.js
  var $3e3d8149c2c739982502e879383cf4c1$exports = {};
  $3e3d8149c2c739982502e879383cf4c1$exports = function bind(fn, thisArg) {
    return function wrap() {
      var args = new Array(arguments.length);
      for (var i = 0; i < args.length; i++) {
        args[i] = arguments[i];
      }
      return fn.apply(thisArg, args);
    };
  };
  // ASSET: node_modules/axios/lib/utils.js
  var $e19048c42855c3b88d29747cbb9ddb25$exports, $e19048c42855c3b88d29747cbb9ddb25$var$bind, $e19048c42855c3b88d29747cbb9ddb25$var$toString, $e19048c42855c3b88d29747cbb9ddb25$executed = false;
  /**
  * Determine if a value is an Array
  *
  * @param {Object} val The value to test
  * @returns {boolean} True if value is an Array, otherwise false
  */
  function $e19048c42855c3b88d29747cbb9ddb25$var$isArray(val) {
    return $e19048c42855c3b88d29747cbb9ddb25$var$toString.call(val) === '[object Array]';
  }
  /**
  * Determine if a value is undefined
  *
  * @param {Object} val The value to test
  * @returns {boolean} True if the value is undefined, otherwise false
  */
  function $e19048c42855c3b88d29747cbb9ddb25$var$isUndefined(val) {
    return typeof val === 'undefined';
  }
  /**
  * Determine if a value is a Buffer
  *
  * @param {Object} val The value to test
  * @returns {boolean} True if value is a Buffer, otherwise false
  */
  function $e19048c42855c3b88d29747cbb9ddb25$var$isBuffer(val) {
    return val !== null && !$e19048c42855c3b88d29747cbb9ddb25$var$isUndefined(val) && val.constructor !== null && !$e19048c42855c3b88d29747cbb9ddb25$var$isUndefined(val.constructor) && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
  }
  /**
  * Determine if a value is an ArrayBuffer
  *
  * @param {Object} val The value to test
  * @returns {boolean} True if value is an ArrayBuffer, otherwise false
  */
  function $e19048c42855c3b88d29747cbb9ddb25$var$isArrayBuffer(val) {
    return $e19048c42855c3b88d29747cbb9ddb25$var$toString.call(val) === '[object ArrayBuffer]';
  }
  /**
  * Determine if a value is a FormData
  *
  * @param {Object} val The value to test
  * @returns {boolean} True if value is an FormData, otherwise false
  */
  function $e19048c42855c3b88d29747cbb9ddb25$var$isFormData(val) {
    return typeof FormData !== 'undefined' && val instanceof FormData;
  }
  /**
  * Determine if a value is a view on an ArrayBuffer
  *
  * @param {Object} val The value to test
  * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
  */
  function $e19048c42855c3b88d29747cbb9ddb25$var$isArrayBufferView(val) {
    var result;
    if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
      result = ArrayBuffer.isView(val);
    } else {
      result = val && val.buffer && val.buffer instanceof ArrayBuffer;
    }
    return result;
  }
  /**
  * Determine if a value is a String
  *
  * @param {Object} val The value to test
  * @returns {boolean} True if value is a String, otherwise false
  */
  function $e19048c42855c3b88d29747cbb9ddb25$var$isString(val) {
    return typeof val === 'string';
  }
  /**
  * Determine if a value is a Number
  *
  * @param {Object} val The value to test
  * @returns {boolean} True if value is a Number, otherwise false
  */
  function $e19048c42855c3b88d29747cbb9ddb25$var$isNumber(val) {
    return typeof val === 'number';
  }
  /**
  * Determine if a value is an Object
  *
  * @param {Object} val The value to test
  * @returns {boolean} True if value is an Object, otherwise false
  */
  function $e19048c42855c3b88d29747cbb9ddb25$var$isObject(val) {
    return val !== null && typeof val === 'object';
  }
  /**
  * Determine if a value is a plain Object
  *
  * @param {Object} val The value to test
  * @return {boolean} True if value is a plain Object, otherwise false
  */
  function $e19048c42855c3b88d29747cbb9ddb25$var$isPlainObject(val) {
    if ($e19048c42855c3b88d29747cbb9ddb25$var$toString.call(val) !== '[object Object]') {
      return false;
    }
    var prototype = Object.getPrototypeOf(val);
    return prototype === null || prototype === Object.prototype;
  }
  /**
  * Determine if a value is a Date
  *
  * @param {Object} val The value to test
  * @returns {boolean} True if value is a Date, otherwise false
  */
  function $e19048c42855c3b88d29747cbb9ddb25$var$isDate(val) {
    return $e19048c42855c3b88d29747cbb9ddb25$var$toString.call(val) === '[object Date]';
  }
  /**
  * Determine if a value is a File
  *
  * @param {Object} val The value to test
  * @returns {boolean} True if value is a File, otherwise false
  */
  function $e19048c42855c3b88d29747cbb9ddb25$var$isFile(val) {
    return $e19048c42855c3b88d29747cbb9ddb25$var$toString.call(val) === '[object File]';
  }
  /**
  * Determine if a value is a Blob
  *
  * @param {Object} val The value to test
  * @returns {boolean} True if value is a Blob, otherwise false
  */
  function $e19048c42855c3b88d29747cbb9ddb25$var$isBlob(val) {
    return $e19048c42855c3b88d29747cbb9ddb25$var$toString.call(val) === '[object Blob]';
  }
  /**
  * Determine if a value is a Function
  *
  * @param {Object} val The value to test
  * @returns {boolean} True if value is a Function, otherwise false
  */
  function $e19048c42855c3b88d29747cbb9ddb25$var$isFunction(val) {
    return $e19048c42855c3b88d29747cbb9ddb25$var$toString.call(val) === '[object Function]';
  }
  /**
  * Determine if a value is a Stream
  *
  * @param {Object} val The value to test
  * @returns {boolean} True if value is a Stream, otherwise false
  */
  function $e19048c42855c3b88d29747cbb9ddb25$var$isStream(val) {
    return $e19048c42855c3b88d29747cbb9ddb25$var$isObject(val) && $e19048c42855c3b88d29747cbb9ddb25$var$isFunction(val.pipe);
  }
  /**
  * Determine if a value is a URLSearchParams object
  *
  * @param {Object} val The value to test
  * @returns {boolean} True if value is a URLSearchParams object, otherwise false
  */
  function $e19048c42855c3b88d29747cbb9ddb25$var$isURLSearchParams(val) {
    return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
  }
  /**
  * Trim excess whitespace off the beginning and end of a string
  *
  * @param {String} str The String to trim
  * @returns {String} The String freed of excess whitespace
  */
  function $e19048c42855c3b88d29747cbb9ddb25$var$trim(str) {
    return str.replace(/^\s*/, '').replace(/\s*$/, '');
  }
  /**
  * Determine if we're running in a standard browser environment
  *
  * This allows axios to run in a web worker, and react-native.
  * Both environments support XMLHttpRequest, but not fully standard globals.
  *
  * web workers:
  *  typeof window -> undefined
  *  typeof document -> undefined
  *
  * react-native:
  *  navigator.product -> 'ReactNative'
  * nativescript
  *  navigator.product -> 'NativeScript' or 'NS'
  */
  function $e19048c42855c3b88d29747cbb9ddb25$var$isStandardBrowserEnv() {
    if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' || navigator.product === 'NativeScript' || navigator.product === 'NS')) {
      return false;
    }
    return typeof window !== 'undefined' && typeof document !== 'undefined';
  }
  /**
  * Iterate over an Array or an Object invoking a function for each item.
  *
  * If `obj` is an Array callback will be called passing
  * the value, index, and complete array for each item.
  *
  * If 'obj' is an Object callback will be called passing
  * the value, key, and complete object for each property.
  *
  * @param {Object|Array} obj The object to iterate
  * @param {Function} fn The callback to invoke for each item
  */
  function $e19048c42855c3b88d29747cbb9ddb25$var$forEach(obj, fn) {
    // Don't bother if no value provided
    if (obj === null || typeof obj === 'undefined') {
      return;
    }
    // Force an array if not already something iterable
    if (typeof obj !== 'object') {
      /*eslint no-param-reassign:0*/
      obj = [obj];
    }
    if ($e19048c42855c3b88d29747cbb9ddb25$var$isArray(obj)) {
      // Iterate over array values
      for (var i = 0, l = obj.length; i < l; i++) {
        fn.call(null, obj[i], i, obj);
      }
    } else {
      // Iterate over object keys
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          fn.call(null, obj[key], key, obj);
        }
      }
    }
  }
  /**
  * Accepts varargs expecting each argument to be an object, then
  * immutably merges the properties of each object and returns result.
  *
  * When multiple objects contain the same key the later object in
  * the arguments list will take precedence.
  *
  * Example:
  *
  * ```js
  * var result = merge({foo: 123}, {foo: 456});
  * console.log(result.foo); // outputs 456
  * ```
  *
  * @param {Object} obj1 Object to merge
  * @returns {Object} Result of all merge properties
  */
  function $e19048c42855c3b88d29747cbb9ddb25$var$merge() /*obj1, obj2, obj3, ...*/
  {
    var result = {};
    function assignValue(val, key) {
      if ($e19048c42855c3b88d29747cbb9ddb25$var$isPlainObject(result[key]) && $e19048c42855c3b88d29747cbb9ddb25$var$isPlainObject(val)) {
        result[key] = $e19048c42855c3b88d29747cbb9ddb25$var$merge(result[key], val);
      } else if ($e19048c42855c3b88d29747cbb9ddb25$var$isPlainObject(val)) {
        result[key] = $e19048c42855c3b88d29747cbb9ddb25$var$merge({}, val);
      } else if ($e19048c42855c3b88d29747cbb9ddb25$var$isArray(val)) {
        result[key] = val.slice();
      } else {
        result[key] = val;
      }
    }
    for (var i = 0, l = arguments.length; i < l; i++) {
      $e19048c42855c3b88d29747cbb9ddb25$var$forEach(arguments[i], assignValue);
    }
    return result;
  }
  /**
  * Extends object a by mutably adding to it the properties of object b.
  *
  * @param {Object} a The object to be extended
  * @param {Object} b The object to copy properties from
  * @param {Object} thisArg The object to bind function to
  * @return {Object} The resulting value of object a
  */
  function $e19048c42855c3b88d29747cbb9ddb25$var$extend(a, b, thisArg) {
    $e19048c42855c3b88d29747cbb9ddb25$var$forEach(b, function assignValue(val, key) {
      if (thisArg && typeof val === 'function') {
        a[key] = $e19048c42855c3b88d29747cbb9ddb25$var$bind(val, thisArg);
      } else {
        a[key] = val;
      }
    });
    return a;
  }
  /**
  * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
  *
  * @param {string} content with BOM
  * @return {string} content value without BOM
  */
  function $e19048c42855c3b88d29747cbb9ddb25$var$stripBOM(content) {
    if (content.charCodeAt(0) === 0xFEFF) {
      content = content.slice(1);
    }
    return content;
  }
  function $e19048c42855c3b88d29747cbb9ddb25$exec() {
    $e19048c42855c3b88d29747cbb9ddb25$exports = {};
    $e19048c42855c3b88d29747cbb9ddb25$var$bind = $3e3d8149c2c739982502e879383cf4c1$exports;
    $e19048c42855c3b88d29747cbb9ddb25$var$toString = Object.prototype.toString;
    $e19048c42855c3b88d29747cbb9ddb25$exports = {
      isArray: $e19048c42855c3b88d29747cbb9ddb25$var$isArray,
      isArrayBuffer: $e19048c42855c3b88d29747cbb9ddb25$var$isArrayBuffer,
      isBuffer: $e19048c42855c3b88d29747cbb9ddb25$var$isBuffer,
      isFormData: $e19048c42855c3b88d29747cbb9ddb25$var$isFormData,
      isArrayBufferView: $e19048c42855c3b88d29747cbb9ddb25$var$isArrayBufferView,
      isString: $e19048c42855c3b88d29747cbb9ddb25$var$isString,
      isNumber: $e19048c42855c3b88d29747cbb9ddb25$var$isNumber,
      isObject: $e19048c42855c3b88d29747cbb9ddb25$var$isObject,
      isPlainObject: $e19048c42855c3b88d29747cbb9ddb25$var$isPlainObject,
      isUndefined: $e19048c42855c3b88d29747cbb9ddb25$var$isUndefined,
      isDate: $e19048c42855c3b88d29747cbb9ddb25$var$isDate,
      isFile: $e19048c42855c3b88d29747cbb9ddb25$var$isFile,
      isBlob: $e19048c42855c3b88d29747cbb9ddb25$var$isBlob,
      isFunction: $e19048c42855c3b88d29747cbb9ddb25$var$isFunction,
      isStream: $e19048c42855c3b88d29747cbb9ddb25$var$isStream,
      isURLSearchParams: $e19048c42855c3b88d29747cbb9ddb25$var$isURLSearchParams,
      isStandardBrowserEnv: $e19048c42855c3b88d29747cbb9ddb25$var$isStandardBrowserEnv,
      forEach: $e19048c42855c3b88d29747cbb9ddb25$var$forEach,
      merge: $e19048c42855c3b88d29747cbb9ddb25$var$merge,
      extend: $e19048c42855c3b88d29747cbb9ddb25$var$extend,
      trim: $e19048c42855c3b88d29747cbb9ddb25$var$trim,
      stripBOM: $e19048c42855c3b88d29747cbb9ddb25$var$stripBOM
    };
  }
  function $e19048c42855c3b88d29747cbb9ddb25$init() {
    if (!$e19048c42855c3b88d29747cbb9ddb25$executed) {
      $e19048c42855c3b88d29747cbb9ddb25$executed = true;
      $e19048c42855c3b88d29747cbb9ddb25$exec();
    }
    return $e19048c42855c3b88d29747cbb9ddb25$exports;
  }
  $e19048c42855c3b88d29747cbb9ddb25$init();
  var $ea182a60f6c3729931fdb5051f0fed05$var$bind = $3e3d8149c2c739982502e879383cf4c1$exports;
  // ASSET: node_modules/axios/lib/core/Axios.js
  var $b71eeaf2bd46fd7541ee91d3808b050e$exports = {};
  $e19048c42855c3b88d29747cbb9ddb25$init();
  // ASSET: node_modules/axios/lib/helpers/buildURL.js
  var $545653a5d6ab37c83b20d94a8a5a7293$exports, $545653a5d6ab37c83b20d94a8a5a7293$executed = false;
  function $545653a5d6ab37c83b20d94a8a5a7293$var$encode(val) {
    return encodeURIComponent(val).replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
  }
  function $545653a5d6ab37c83b20d94a8a5a7293$exec() {
    $545653a5d6ab37c83b20d94a8a5a7293$exports = {};
    $e19048c42855c3b88d29747cbb9ddb25$init();
    /**
    * Build a URL by appending params to the end
    *
    * @param {string} url The base of the url (e.g., http://www.google.com)
    * @param {object} [params] The params to be appended
    * @returns {string} The formatted url
    */
    $545653a5d6ab37c83b20d94a8a5a7293$exports = function buildURL(url, params, paramsSerializer) {
      /*eslint no-param-reassign:0*/
      if (!params) {
        return url;
      }
      var serializedParams;
      if (paramsSerializer) {
        serializedParams = paramsSerializer(params);
      } else if ($e19048c42855c3b88d29747cbb9ddb25$init().isURLSearchParams(params)) {
        serializedParams = params.toString();
      } else {
        var parts = [];
        $e19048c42855c3b88d29747cbb9ddb25$init().forEach(params, function serialize(val, key) {
          if (val === null || typeof val === 'undefined') {
            return;
          }
          if ($e19048c42855c3b88d29747cbb9ddb25$init().isArray(val)) {
            key = key + '[]';
          } else {
            val = [val];
          }
          $e19048c42855c3b88d29747cbb9ddb25$init().forEach(val, function parseValue(v) {
            if ($e19048c42855c3b88d29747cbb9ddb25$init().isDate(v)) {
              v = v.toISOString();
            } else if ($e19048c42855c3b88d29747cbb9ddb25$init().isObject(v)) {
              v = JSON.stringify(v);
            }
            parts.push($545653a5d6ab37c83b20d94a8a5a7293$var$encode(key) + '=' + $545653a5d6ab37c83b20d94a8a5a7293$var$encode(v));
          });
        });
        serializedParams = parts.join('&');
      }
      if (serializedParams) {
        var hashmarkIndex = url.indexOf('#');
        if (hashmarkIndex !== -1) {
          url = url.slice(0, hashmarkIndex);
        }
        url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
      }
      return url;
    };
  }
  function $545653a5d6ab37c83b20d94a8a5a7293$init() {
    if (!$545653a5d6ab37c83b20d94a8a5a7293$executed) {
      $545653a5d6ab37c83b20d94a8a5a7293$executed = true;
      $545653a5d6ab37c83b20d94a8a5a7293$exec();
    }
    return $545653a5d6ab37c83b20d94a8a5a7293$exports;
  }
  var $b71eeaf2bd46fd7541ee91d3808b050e$var$buildURL = $545653a5d6ab37c83b20d94a8a5a7293$init();
  // ASSET: node_modules/axios/lib/core/InterceptorManager.js
  var $946c2b7365b187a5a0a6cfa355d67fcb$exports = {};
  $e19048c42855c3b88d29747cbb9ddb25$init();
  function $946c2b7365b187a5a0a6cfa355d67fcb$var$InterceptorManager() {
    this.handlers = [];
  }
  /**
  * Add a new interceptor to the stack
  *
  * @param {Function} fulfilled The function to handle `then` for a `Promise`
  * @param {Function} rejected The function to handle `reject` for a `Promise`
  *
  * @return {Number} An ID used to remove interceptor later
  */
  $946c2b7365b187a5a0a6cfa355d67fcb$var$InterceptorManager.prototype.use = function use(fulfilled, rejected) {
    this.handlers.push({
      fulfilled: fulfilled,
      rejected: rejected
    });
    return this.handlers.length - 1;
  };
  /**
  * Remove an interceptor from the stack
  *
  * @param {Number} id The ID that was returned by `use`
  */
  $946c2b7365b187a5a0a6cfa355d67fcb$var$InterceptorManager.prototype.eject = function eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  };
  /**
  * Iterate over all the registered interceptors
  *
  * This method is particularly useful for skipping over any
  * interceptors that may have become `null` calling `eject`.
  *
  * @param {Function} fn The function to call for each interceptor
  */
  $946c2b7365b187a5a0a6cfa355d67fcb$var$InterceptorManager.prototype.forEach = function forEach(fn) {
    $e19048c42855c3b88d29747cbb9ddb25$init().forEach(this.handlers, function forEachHandler(h) {
      if (h !== null) {
        fn(h);
      }
    });
  };
  $946c2b7365b187a5a0a6cfa355d67fcb$exports = $946c2b7365b187a5a0a6cfa355d67fcb$var$InterceptorManager;
  var $b71eeaf2bd46fd7541ee91d3808b050e$var$InterceptorManager = $946c2b7365b187a5a0a6cfa355d67fcb$exports;
  // ASSET: node_modules/axios/lib/core/dispatchRequest.js
  var $5541138bac2e3d21afd0249ec7822d13$exports = {};
  $e19048c42855c3b88d29747cbb9ddb25$init();
  // ASSET: node_modules/axios/lib/core/transformData.js
  var $051d56407cf4ff53f0d785226e0888ed$exports = {};
  $e19048c42855c3b88d29747cbb9ddb25$init();
  /**
  * Transform the data for a request or a response
  *
  * @param {Object|String} data The data to be transformed
  * @param {Array} headers The headers for the request or response
  * @param {Array|Function} fns A single function or Array of functions
  * @returns {*} The resulting transformed data
  */
  $051d56407cf4ff53f0d785226e0888ed$exports = function transformData(data, headers, fns) {
    /*eslint no-param-reassign:0*/
    $e19048c42855c3b88d29747cbb9ddb25$init().forEach(fns, function transform(fn) {
      data = fn(data, headers);
    });
    return data;
  };
  var $5541138bac2e3d21afd0249ec7822d13$var$transformData = $051d56407cf4ff53f0d785226e0888ed$exports;
  // ASSET: node_modules/axios/lib/cancel/isCancel.js
  var $034df188f14d1f02466330b5556474aa$exports = {};
  $034df188f14d1f02466330b5556474aa$exports = function isCancel(value) {
    return !!(value && value.__CANCEL__);
  };
  var $5541138bac2e3d21afd0249ec7822d13$var$isCancel = $034df188f14d1f02466330b5556474aa$exports;
  // ASSET: node_modules/axios/lib/core/enhanceError.js
  var $9964a8f1ff2f7c8e407cc4d6345e885f$exports, $9964a8f1ff2f7c8e407cc4d6345e885f$executed = false;
  function $9964a8f1ff2f7c8e407cc4d6345e885f$exec() {
    $9964a8f1ff2f7c8e407cc4d6345e885f$exports = {};
    /**
    * Update an Error with the specified config, error code, and response.
    *
    * @param {Error} error The error to update.
    * @param {Object} config The config.
    * @param {string} [code] The error code (for example, 'ECONNABORTED').
    * @param {Object} [request] The request.
    * @param {Object} [response] The response.
    * @returns {Error} The error.
    */
    $9964a8f1ff2f7c8e407cc4d6345e885f$exports = function enhanceError(error, config, code, request, response) {
      error.config = config;
      if (code) {
        error.code = code;
      }
      error.request = request;
      error.response = response;
      error.isAxiosError = true;
      error.toJSON = function toJSON() {
        return {
          // Standard
          message: this.message,
          name: this.name,
          // Microsoft
          description: this.description,
          number: this.number,
          // Mozilla
          fileName: this.fileName,
          lineNumber: this.lineNumber,
          columnNumber: this.columnNumber,
          stack: this.stack,
          // Axios
          config: this.config,
          code: this.code
        };
      };
      return error;
    };
  }
  function $9964a8f1ff2f7c8e407cc4d6345e885f$init() {
    if (!$9964a8f1ff2f7c8e407cc4d6345e885f$executed) {
      $9964a8f1ff2f7c8e407cc4d6345e885f$executed = true;
      $9964a8f1ff2f7c8e407cc4d6345e885f$exec();
    }
    return $9964a8f1ff2f7c8e407cc4d6345e885f$exports;
  }
  // ASSET: node_modules/axios/lib/core/createError.js
  var $d3ede8ab3ce52ab09010e344a2c223a9$exports, $d3ede8ab3ce52ab09010e344a2c223a9$var$enhanceError, $d3ede8ab3ce52ab09010e344a2c223a9$executed = false;
  function $d3ede8ab3ce52ab09010e344a2c223a9$exec() {
    $d3ede8ab3ce52ab09010e344a2c223a9$exports = {};
    $d3ede8ab3ce52ab09010e344a2c223a9$var$enhanceError = $9964a8f1ff2f7c8e407cc4d6345e885f$init();
    /**
    * Create an Error with the specified message, config, error code, request and response.
    *
    * @param {string} message The error message.
    * @param {Object} config The config.
    * @param {string} [code] The error code (for example, 'ECONNABORTED').
    * @param {Object} [request] The request.
    * @param {Object} [response] The response.
    * @returns {Error} The created error.
    */
    $d3ede8ab3ce52ab09010e344a2c223a9$exports = function createError(message, config, code, request, response) {
      var error = new Error(message);
      return $d3ede8ab3ce52ab09010e344a2c223a9$var$enhanceError(error, config, code, request, response);
    };
  }
  function $d3ede8ab3ce52ab09010e344a2c223a9$init() {
    if (!$d3ede8ab3ce52ab09010e344a2c223a9$executed) {
      $d3ede8ab3ce52ab09010e344a2c223a9$executed = true;
      $d3ede8ab3ce52ab09010e344a2c223a9$exec();
    }
    return $d3ede8ab3ce52ab09010e344a2c223a9$exports;
  }
  // ASSET: node_modules/axios/lib/core/settle.js
  var $22373b028759d617ee6b20f2601553f7$exports, $22373b028759d617ee6b20f2601553f7$var$createError, $22373b028759d617ee6b20f2601553f7$executed = false;
  function $22373b028759d617ee6b20f2601553f7$exec() {
    $22373b028759d617ee6b20f2601553f7$exports = {};
    $22373b028759d617ee6b20f2601553f7$var$createError = $d3ede8ab3ce52ab09010e344a2c223a9$init();
    /**
    * Resolve or reject a Promise based on response status.
    *
    * @param {Function} resolve A function that resolves the promise.
    * @param {Function} reject A function that rejects the promise.
    * @param {object} response The response.
    */
    $22373b028759d617ee6b20f2601553f7$exports = function settle(resolve, reject, response) {
      var validateStatus = response.config.validateStatus;
      if (!response.status || !validateStatus || validateStatus(response.status)) {
        resolve(response);
      } else {
        reject($22373b028759d617ee6b20f2601553f7$var$createError('Request failed with status code ' + response.status, response.config, null, response.request, response));
      }
    };
  }
  function $22373b028759d617ee6b20f2601553f7$init() {
    if (!$22373b028759d617ee6b20f2601553f7$executed) {
      $22373b028759d617ee6b20f2601553f7$executed = true;
      $22373b028759d617ee6b20f2601553f7$exec();
    }
    return $22373b028759d617ee6b20f2601553f7$exports;
  }
  // ASSET: node_modules/axios/lib/helpers/cookies.js
  var $f72d0b836c32af7428fd769409e99755$exports, $f72d0b836c32af7428fd769409e99755$executed = false;
  function $f72d0b836c32af7428fd769409e99755$exec() {
    $f72d0b836c32af7428fd769409e99755$exports = {};
    $e19048c42855c3b88d29747cbb9ddb25$init();
    $f72d0b836c32af7428fd769409e99755$exports = $e19048c42855c3b88d29747cbb9ddb25$init().isStandardBrowserEnv() ? // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));
          if ($e19048c42855c3b88d29747cbb9ddb25$init().isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }
          if ($e19048c42855c3b88d29747cbb9ddb25$init().isString(path)) {
            cookie.push('path=' + path);
          }
          if ($e19048c42855c3b88d29747cbb9ddb25$init().isString(domain)) {
            cookie.push('domain=' + domain);
          }
          if (secure === true) {
            cookie.push('secure');
          }
          document.cookie = cookie.join('; ');
        },
        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return match ? decodeURIComponent(match[3]) : null;
        },
        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() : // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() {
          return null;
        },
        remove: function remove() {}
      };
    })();
  }
  function $f72d0b836c32af7428fd769409e99755$init() {
    if (!$f72d0b836c32af7428fd769409e99755$executed) {
      $f72d0b836c32af7428fd769409e99755$executed = true;
      $f72d0b836c32af7428fd769409e99755$exec();
    }
    return $f72d0b836c32af7428fd769409e99755$exports;
  }
  // ASSET: node_modules/axios/lib/helpers/isAbsoluteURL.js
  var $29b5d4a92dd41209a81ca5c1c6f1b82e$exports, $29b5d4a92dd41209a81ca5c1c6f1b82e$executed = false;
  function $29b5d4a92dd41209a81ca5c1c6f1b82e$exec() {
    $29b5d4a92dd41209a81ca5c1c6f1b82e$exports = {};
    /**
    * Determines whether the specified URL is absolute
    *
    * @param {string} url The URL to test
    * @returns {boolean} True if the specified URL is absolute, otherwise false
    */
    $29b5d4a92dd41209a81ca5c1c6f1b82e$exports = function isAbsoluteURL(url) {
      // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
      // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
      // by any combination of letters, digits, plus, period, or hyphen.
      return (/^([a-z][a-z\d\+\-\.]*:)?\/\//i).test(url);
    };
  }
  function $29b5d4a92dd41209a81ca5c1c6f1b82e$init() {
    if (!$29b5d4a92dd41209a81ca5c1c6f1b82e$executed) {
      $29b5d4a92dd41209a81ca5c1c6f1b82e$executed = true;
      $29b5d4a92dd41209a81ca5c1c6f1b82e$exec();
    }
    return $29b5d4a92dd41209a81ca5c1c6f1b82e$exports;
  }
  // ASSET: node_modules/axios/lib/helpers/combineURLs.js
  var $e22936a8f0a59578a796648a71463cd1$exports, $e22936a8f0a59578a796648a71463cd1$executed = false;
  function $e22936a8f0a59578a796648a71463cd1$exec() {
    $e22936a8f0a59578a796648a71463cd1$exports = {};
    /**
    * Creates a new URL by combining the specified URLs
    *
    * @param {string} baseURL The base URL
    * @param {string} relativeURL The relative URL
    * @returns {string} The combined URL
    */
    $e22936a8f0a59578a796648a71463cd1$exports = function combineURLs(baseURL, relativeURL) {
      return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL;
    };
  }
  function $e22936a8f0a59578a796648a71463cd1$init() {
    if (!$e22936a8f0a59578a796648a71463cd1$executed) {
      $e22936a8f0a59578a796648a71463cd1$executed = true;
      $e22936a8f0a59578a796648a71463cd1$exec();
    }
    return $e22936a8f0a59578a796648a71463cd1$exports;
  }
  // ASSET: node_modules/axios/lib/core/buildFullPath.js
  var $f3164ab7b4947e0021c4ef04f295c7e7$exports, $f3164ab7b4947e0021c4ef04f295c7e7$var$isAbsoluteURL, $f3164ab7b4947e0021c4ef04f295c7e7$var$combineURLs, $f3164ab7b4947e0021c4ef04f295c7e7$executed = false;
  function $f3164ab7b4947e0021c4ef04f295c7e7$exec() {
    $f3164ab7b4947e0021c4ef04f295c7e7$exports = {};
    $f3164ab7b4947e0021c4ef04f295c7e7$var$isAbsoluteURL = $29b5d4a92dd41209a81ca5c1c6f1b82e$init();
    $f3164ab7b4947e0021c4ef04f295c7e7$var$combineURLs = $e22936a8f0a59578a796648a71463cd1$init();
    /**
    * Creates a new URL by combining the baseURL with the requestedURL,
    * only when the requestedURL is not already an absolute URL.
    * If the requestURL is absolute, this function returns the requestedURL untouched.
    *
    * @param {string} baseURL The base URL
    * @param {string} requestedURL Absolute or relative URL to combine
    * @returns {string} The combined full path
    */
    $f3164ab7b4947e0021c4ef04f295c7e7$exports = function buildFullPath(baseURL, requestedURL) {
      if (baseURL && !$f3164ab7b4947e0021c4ef04f295c7e7$var$isAbsoluteURL(requestedURL)) {
        return $f3164ab7b4947e0021c4ef04f295c7e7$var$combineURLs(baseURL, requestedURL);
      }
      return requestedURL;
    };
  }
  function $f3164ab7b4947e0021c4ef04f295c7e7$init() {
    if (!$f3164ab7b4947e0021c4ef04f295c7e7$executed) {
      $f3164ab7b4947e0021c4ef04f295c7e7$executed = true;
      $f3164ab7b4947e0021c4ef04f295c7e7$exec();
    }
    return $f3164ab7b4947e0021c4ef04f295c7e7$exports;
  }
  // ASSET: node_modules/axios/lib/helpers/parseHeaders.js
  var $1c42b662d2905eb6994033a338c2d6dc$exports, $1c42b662d2905eb6994033a338c2d6dc$var$ignoreDuplicateOf, $1c42b662d2905eb6994033a338c2d6dc$executed = false;
  function $1c42b662d2905eb6994033a338c2d6dc$exec() {
    $1c42b662d2905eb6994033a338c2d6dc$exports = {};
    $e19048c42855c3b88d29747cbb9ddb25$init();
    $1c42b662d2905eb6994033a338c2d6dc$var$ignoreDuplicateOf = ['age', 'authorization', 'content-length', 'content-type', 'etag', 'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since', 'last-modified', 'location', 'max-forwards', 'proxy-authorization', 'referer', 'retry-after', 'user-agent'];
    /**
    * Parse headers into an object
    *
    * ```
    * Date: Wed, 27 Aug 2014 08:58:49 GMT
    * Content-Type: application/json
    * Connection: keep-alive
    * Transfer-Encoding: chunked
    * ```
    *
    * @param {String} headers Headers needing to be parsed
    * @returns {Object} Headers parsed into an object
    */
    $1c42b662d2905eb6994033a338c2d6dc$exports = function parseHeaders(headers) {
      var parsed = {};
      var key;
      var val;
      var i;
      if (!headers) {
        return parsed;
      }
      $e19048c42855c3b88d29747cbb9ddb25$init().forEach(headers.split('\n'), function parser(line) {
        i = line.indexOf(':');
        key = $e19048c42855c3b88d29747cbb9ddb25$init().trim(line.substr(0, i)).toLowerCase();
        val = $e19048c42855c3b88d29747cbb9ddb25$init().trim(line.substr(i + 1));
        if (key) {
          if (parsed[key] && $1c42b662d2905eb6994033a338c2d6dc$var$ignoreDuplicateOf.indexOf(key) >= 0) {
            return;
          }
          if (key === 'set-cookie') {
            parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
          } else {
            parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
          }
        }
      });
      return parsed;
    };
  }
  function $1c42b662d2905eb6994033a338c2d6dc$init() {
    if (!$1c42b662d2905eb6994033a338c2d6dc$executed) {
      $1c42b662d2905eb6994033a338c2d6dc$executed = true;
      $1c42b662d2905eb6994033a338c2d6dc$exec();
    }
    return $1c42b662d2905eb6994033a338c2d6dc$exports;
  }
  // ASSET: node_modules/axios/lib/helpers/isURLSameOrigin.js
  var $52766c48ae18d01a04d0ef83b21eab6e$exports, $52766c48ae18d01a04d0ef83b21eab6e$executed = false;
  function $52766c48ae18d01a04d0ef83b21eab6e$exec() {
    $52766c48ae18d01a04d0ef83b21eab6e$exports = {};
    $e19048c42855c3b88d29747cbb9ddb25$init();
    $52766c48ae18d01a04d0ef83b21eab6e$exports = $e19048c42855c3b88d29747cbb9ddb25$init().isStandardBrowserEnv() ? // Standard browser envs have full support of the APIs needed to test
    // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = (/(msie|trident)/i).test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;
      /**
      * Parse a URL to discover it's components
      *
      * @param {String} url The URL to be parsed
      * @returns {Object}
      */
      function resolveURL(url) {
        var href = url;
        if (msie) {
          // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }
        urlParsingNode.setAttribute('href', href);
        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: urlParsingNode.pathname.charAt(0) === '/' ? urlParsingNode.pathname : '/' + urlParsingNode.pathname
        };
      }
      originURL = resolveURL(window.location.href);
      /**
      * Determine if a URL shares the same origin as the current location
      *
      * @param {String} requestURL The URL to test
      * @returns {boolean} True if URL shares the same origin, otherwise false
      */
      return function isURLSameOrigin(requestURL) {
        var parsed = $e19048c42855c3b88d29747cbb9ddb25$init().isString(requestURL) ? resolveURL(requestURL) : requestURL;
        return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
      };
    })() : // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })();
  }
  function $52766c48ae18d01a04d0ef83b21eab6e$init() {
    if (!$52766c48ae18d01a04d0ef83b21eab6e$executed) {
      $52766c48ae18d01a04d0ef83b21eab6e$executed = true;
      $52766c48ae18d01a04d0ef83b21eab6e$exec();
    }
    return $52766c48ae18d01a04d0ef83b21eab6e$exports;
  }
  // ASSET: node_modules/axios/lib/adapters/xhr.js
  var $f46b8f489827acde7782a34fea2ab58a$exports, $f46b8f489827acde7782a34fea2ab58a$var$settle, $f46b8f489827acde7782a34fea2ab58a$var$buildURL, $f46b8f489827acde7782a34fea2ab58a$var$buildFullPath, $f46b8f489827acde7782a34fea2ab58a$var$parseHeaders, $f46b8f489827acde7782a34fea2ab58a$var$isURLSameOrigin, $f46b8f489827acde7782a34fea2ab58a$var$createError, $f46b8f489827acde7782a34fea2ab58a$executed = false;
  function $f46b8f489827acde7782a34fea2ab58a$exec() {
    $f46b8f489827acde7782a34fea2ab58a$exports = {};
    $e19048c42855c3b88d29747cbb9ddb25$init();
    $f46b8f489827acde7782a34fea2ab58a$var$settle = $22373b028759d617ee6b20f2601553f7$init();
    $f72d0b836c32af7428fd769409e99755$init();
    $f46b8f489827acde7782a34fea2ab58a$var$buildURL = $545653a5d6ab37c83b20d94a8a5a7293$init();
    $f46b8f489827acde7782a34fea2ab58a$var$buildFullPath = $f3164ab7b4947e0021c4ef04f295c7e7$init();
    $f46b8f489827acde7782a34fea2ab58a$var$parseHeaders = $1c42b662d2905eb6994033a338c2d6dc$init();
    $f46b8f489827acde7782a34fea2ab58a$var$isURLSameOrigin = $52766c48ae18d01a04d0ef83b21eab6e$init();
    $f46b8f489827acde7782a34fea2ab58a$var$createError = $d3ede8ab3ce52ab09010e344a2c223a9$init();
    $f46b8f489827acde7782a34fea2ab58a$exports = function xhrAdapter(config) {
      return new Promise(function dispatchXhrRequest(resolve, reject) {
        var requestData = config.data;
        var requestHeaders = config.headers;
        if ($e19048c42855c3b88d29747cbb9ddb25$init().isFormData(requestData)) {
          delete requestHeaders['Content-Type'];
        }
        var request = new XMLHttpRequest();
        // HTTP basic authentication
        if (config.auth) {
          var username = config.auth.username || '';
          var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
          requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
        }
        var fullPath = $f46b8f489827acde7782a34fea2ab58a$var$buildFullPath(config.baseURL, config.url);
        request.open(config.method.toUpperCase(), $f46b8f489827acde7782a34fea2ab58a$var$buildURL(fullPath, config.params, config.paramsSerializer), true);
        // Set the request timeout in MS
        request.timeout = config.timeout;
        // Listen for ready state
        request.onreadystatechange = function handleLoad() {
          if (!request || request.readyState !== 4) {
            return;
          }
          // The request errored out and we didn't get a response, this will be
          // handled by onerror instead
          // With one exception: request that using file: protocol, most browsers
          // will return status as 0 even though it's a successful request
          if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
            return;
          }
          // Prepare the response
          var responseHeaders = ('getAllResponseHeaders' in request) ? $f46b8f489827acde7782a34fea2ab58a$var$parseHeaders(request.getAllResponseHeaders()) : null;
          var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
          var response = {
            data: responseData,
            status: request.status,
            statusText: request.statusText,
            headers: responseHeaders,
            config: config,
            request: request
          };
          $f46b8f489827acde7782a34fea2ab58a$var$settle(resolve, reject, response);
          // Clean up request
          request = null;
        };
        // Handle browser request cancellation (as opposed to a manual cancellation)
        request.onabort = function handleAbort() {
          if (!request) {
            return;
          }
          reject($f46b8f489827acde7782a34fea2ab58a$var$createError('Request aborted', config, 'ECONNABORTED', request));
          // Clean up request
          request = null;
        };
        // Handle low level network errors
        request.onerror = function handleError() {
          // Real errors are hidden from us by the browser
          // onerror should only fire if it's a network error
          reject($f46b8f489827acde7782a34fea2ab58a$var$createError('Network Error', config, null, request));
          // Clean up request
          request = null;
        };
        // Handle timeout
        request.ontimeout = function handleTimeout() {
          var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
          if (config.timeoutErrorMessage) {
            timeoutErrorMessage = config.timeoutErrorMessage;
          }
          reject($f46b8f489827acde7782a34fea2ab58a$var$createError(timeoutErrorMessage, config, 'ECONNABORTED', request));
          // Clean up request
          request = null;
        };
        // Add xsrf header
        // This is only done if running in a standard browser environment.
        // Specifically not if we're in a web worker, or react-native.
        if ($e19048c42855c3b88d29747cbb9ddb25$init().isStandardBrowserEnv()) {
          // Add xsrf header
          var xsrfValue = (config.withCredentials || $f46b8f489827acde7782a34fea2ab58a$var$isURLSameOrigin(fullPath)) && config.xsrfCookieName ? $f72d0b836c32af7428fd769409e99755$init().read(config.xsrfCookieName) : undefined;
          if (xsrfValue) {
            requestHeaders[config.xsrfHeaderName] = xsrfValue;
          }
        }
        // Add headers to the request
        if (('setRequestHeader' in request)) {
          $e19048c42855c3b88d29747cbb9ddb25$init().forEach(requestHeaders, function setRequestHeader(val, key) {
            if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
              // Remove Content-Type if data is undefined
              delete requestHeaders[key];
            } else {
              // Otherwise add header to the request
              request.setRequestHeader(key, val);
            }
          });
        }
        // Add withCredentials to request if needed
        if (!$e19048c42855c3b88d29747cbb9ddb25$init().isUndefined(config.withCredentials)) {
          request.withCredentials = !!config.withCredentials;
        }
        // Add responseType to request if needed
        if (config.responseType) {
          try {
            request.responseType = config.responseType;
          } catch (e) {
            // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
            // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
            if (config.responseType !== 'json') {
              throw e;
            }
          }
        }
        // Handle progress if needed
        if (typeof config.onDownloadProgress === 'function') {
          request.addEventListener('progress', config.onDownloadProgress);
        }
        // Not all browsers support upload events
        if (typeof config.onUploadProgress === 'function' && request.upload) {
          request.upload.addEventListener('progress', config.onUploadProgress);
        }
        if (config.cancelToken) {
          // Handle cancellation
          config.cancelToken.promise.then(function onCanceled(cancel) {
            if (!request) {
              return;
            }
            request.abort();
            reject(cancel);
            // Clean up request
            request = null;
          });
        }
        if (!requestData) {
          requestData = null;
        }
        // Send the request
        request.send(requestData);
      });
    };
  }
  function $f46b8f489827acde7782a34fea2ab58a$init() {
    if (!$f46b8f489827acde7782a34fea2ab58a$executed) {
      $f46b8f489827acde7782a34fea2ab58a$executed = true;
      $f46b8f489827acde7782a34fea2ab58a$exec();
    }
    return $f46b8f489827acde7782a34fea2ab58a$exports;
  }
  // ASSET: node_modules/axios/lib/defaults.js
  var $0cadccb41e85f2d51adaeca3bc4c5382$exports = {};
  // ASSET: node_modules/process/browser.js
  var $f13917a90d4db9b497c005419c2c20b9$exports = {};
  // shim for using process in browser
  var $f13917a90d4db9b497c005419c2c20b9$var$process = $f13917a90d4db9b497c005419c2c20b9$exports = {};
  // cached from whatever global is present so that test runners that stub it
  // don't break things.  But we need to wrap it in a try catch in case it is
  // wrapped in strict mode code which doesn't define any globals.  It's inside a
  // function because try/catches deoptimize in certain engines.
  var $f13917a90d4db9b497c005419c2c20b9$var$cachedSetTimeout;
  var $f13917a90d4db9b497c005419c2c20b9$var$cachedClearTimeout;
  function $f13917a90d4db9b497c005419c2c20b9$var$defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
  }
  function $f13917a90d4db9b497c005419c2c20b9$var$defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
  }
  (function () {
    try {
      if (typeof setTimeout === 'function') {
        $f13917a90d4db9b497c005419c2c20b9$var$cachedSetTimeout = setTimeout;
      } else {
        $f13917a90d4db9b497c005419c2c20b9$var$cachedSetTimeout = $f13917a90d4db9b497c005419c2c20b9$var$defaultSetTimout;
      }
    } catch (e) {
      $f13917a90d4db9b497c005419c2c20b9$var$cachedSetTimeout = $f13917a90d4db9b497c005419c2c20b9$var$defaultSetTimout;
    }
    try {
      if (typeof clearTimeout === 'function') {
        $f13917a90d4db9b497c005419c2c20b9$var$cachedClearTimeout = clearTimeout;
      } else {
        $f13917a90d4db9b497c005419c2c20b9$var$cachedClearTimeout = $f13917a90d4db9b497c005419c2c20b9$var$defaultClearTimeout;
      }
    } catch (e) {
      $f13917a90d4db9b497c005419c2c20b9$var$cachedClearTimeout = $f13917a90d4db9b497c005419c2c20b9$var$defaultClearTimeout;
    }
  })();
  function $f13917a90d4db9b497c005419c2c20b9$var$runTimeout(fun) {
    if ($f13917a90d4db9b497c005419c2c20b9$var$cachedSetTimeout === setTimeout) {
      // normal enviroments in sane situations
      return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if (($f13917a90d4db9b497c005419c2c20b9$var$cachedSetTimeout === $f13917a90d4db9b497c005419c2c20b9$var$defaultSetTimout || !$f13917a90d4db9b497c005419c2c20b9$var$cachedSetTimeout) && setTimeout) {
      $f13917a90d4db9b497c005419c2c20b9$var$cachedSetTimeout = setTimeout;
      return setTimeout(fun, 0);
    }
    try {
      // when when somebody has screwed with setTimeout but no I.E. maddness
      return $f13917a90d4db9b497c005419c2c20b9$var$cachedSetTimeout(fun, 0);
    } catch (e) {
      try {
        // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
        return $f13917a90d4db9b497c005419c2c20b9$var$cachedSetTimeout.call(null, fun, 0);
      } catch (e) {
        // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
        return $f13917a90d4db9b497c005419c2c20b9$var$cachedSetTimeout.call(this, fun, 0);
      }
    }
  }
  function $f13917a90d4db9b497c005419c2c20b9$var$runClearTimeout(marker) {
    if ($f13917a90d4db9b497c005419c2c20b9$var$cachedClearTimeout === clearTimeout) {
      // normal enviroments in sane situations
      return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if (($f13917a90d4db9b497c005419c2c20b9$var$cachedClearTimeout === $f13917a90d4db9b497c005419c2c20b9$var$defaultClearTimeout || !$f13917a90d4db9b497c005419c2c20b9$var$cachedClearTimeout) && clearTimeout) {
      $f13917a90d4db9b497c005419c2c20b9$var$cachedClearTimeout = clearTimeout;
      return clearTimeout(marker);
    }
    try {
      // when when somebody has screwed with setTimeout but no I.E. maddness
      return $f13917a90d4db9b497c005419c2c20b9$var$cachedClearTimeout(marker);
    } catch (e) {
      try {
        // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
        return $f13917a90d4db9b497c005419c2c20b9$var$cachedClearTimeout.call(null, marker);
      } catch (e) {
        // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
        // Some versions of I.E. have different rules for clearTimeout vs setTimeout
        return $f13917a90d4db9b497c005419c2c20b9$var$cachedClearTimeout.call(this, marker);
      }
    }
  }
  var $f13917a90d4db9b497c005419c2c20b9$var$queue = [];
  var $f13917a90d4db9b497c005419c2c20b9$var$draining = false;
  var $f13917a90d4db9b497c005419c2c20b9$var$currentQueue;
  var $f13917a90d4db9b497c005419c2c20b9$var$queueIndex = -1;
  function $f13917a90d4db9b497c005419c2c20b9$var$cleanUpNextTick() {
    if (!$f13917a90d4db9b497c005419c2c20b9$var$draining || !$f13917a90d4db9b497c005419c2c20b9$var$currentQueue) {
      return;
    }
    $f13917a90d4db9b497c005419c2c20b9$var$draining = false;
    if ($f13917a90d4db9b497c005419c2c20b9$var$currentQueue.length) {
      $f13917a90d4db9b497c005419c2c20b9$var$queue = $f13917a90d4db9b497c005419c2c20b9$var$currentQueue.concat($f13917a90d4db9b497c005419c2c20b9$var$queue);
    } else {
      $f13917a90d4db9b497c005419c2c20b9$var$queueIndex = -1;
    }
    if ($f13917a90d4db9b497c005419c2c20b9$var$queue.length) {
      $f13917a90d4db9b497c005419c2c20b9$var$drainQueue();
    }
  }
  function $f13917a90d4db9b497c005419c2c20b9$var$drainQueue() {
    if ($f13917a90d4db9b497c005419c2c20b9$var$draining) {
      return;
    }
    var timeout = $f13917a90d4db9b497c005419c2c20b9$var$runTimeout($f13917a90d4db9b497c005419c2c20b9$var$cleanUpNextTick);
    $f13917a90d4db9b497c005419c2c20b9$var$draining = true;
    var len = $f13917a90d4db9b497c005419c2c20b9$var$queue.length;
    while (len) {
      $f13917a90d4db9b497c005419c2c20b9$var$currentQueue = $f13917a90d4db9b497c005419c2c20b9$var$queue;
      $f13917a90d4db9b497c005419c2c20b9$var$queue = [];
      while (++$f13917a90d4db9b497c005419c2c20b9$var$queueIndex < len) {
        if ($f13917a90d4db9b497c005419c2c20b9$var$currentQueue) {
          $f13917a90d4db9b497c005419c2c20b9$var$currentQueue[$f13917a90d4db9b497c005419c2c20b9$var$queueIndex].run();
        }
      }
      $f13917a90d4db9b497c005419c2c20b9$var$queueIndex = -1;
      len = $f13917a90d4db9b497c005419c2c20b9$var$queue.length;
    }
    $f13917a90d4db9b497c005419c2c20b9$var$currentQueue = null;
    $f13917a90d4db9b497c005419c2c20b9$var$draining = false;
    $f13917a90d4db9b497c005419c2c20b9$var$runClearTimeout(timeout);
  }
  $f13917a90d4db9b497c005419c2c20b9$var$process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
      for (var i = 1; i < arguments.length; i++) {
        args[i - 1] = arguments[i];
      }
    }
    $f13917a90d4db9b497c005419c2c20b9$var$queue.push(new $f13917a90d4db9b497c005419c2c20b9$var$Item(fun, args));
    if ($f13917a90d4db9b497c005419c2c20b9$var$queue.length === 1 && !$f13917a90d4db9b497c005419c2c20b9$var$draining) {
      $f13917a90d4db9b497c005419c2c20b9$var$runTimeout($f13917a90d4db9b497c005419c2c20b9$var$drainQueue);
    }
  };
  // v8 likes predictible objects
  function $f13917a90d4db9b497c005419c2c20b9$var$Item(fun, array) {
    this.fun = fun;
    this.array = array;
  }
  $f13917a90d4db9b497c005419c2c20b9$var$Item.prototype.run = function () {
    this.fun.apply(null, this.array);
  };
  $f13917a90d4db9b497c005419c2c20b9$var$process.title = 'browser';
  $f13917a90d4db9b497c005419c2c20b9$var$process.browser = true;
  $f13917a90d4db9b497c005419c2c20b9$var$process.env = {};
  $f13917a90d4db9b497c005419c2c20b9$var$process.argv = [];
  $f13917a90d4db9b497c005419c2c20b9$var$process.version = '';
  // empty string to avoid regexp issues
  $f13917a90d4db9b497c005419c2c20b9$var$process.versions = {};
  function $f13917a90d4db9b497c005419c2c20b9$var$noop() {}
  $f13917a90d4db9b497c005419c2c20b9$var$process.on = $f13917a90d4db9b497c005419c2c20b9$var$noop;
  $f13917a90d4db9b497c005419c2c20b9$var$process.addListener = $f13917a90d4db9b497c005419c2c20b9$var$noop;
  $f13917a90d4db9b497c005419c2c20b9$var$process.once = $f13917a90d4db9b497c005419c2c20b9$var$noop;
  $f13917a90d4db9b497c005419c2c20b9$var$process.off = $f13917a90d4db9b497c005419c2c20b9$var$noop;
  $f13917a90d4db9b497c005419c2c20b9$var$process.removeListener = $f13917a90d4db9b497c005419c2c20b9$var$noop;
  $f13917a90d4db9b497c005419c2c20b9$var$process.removeAllListeners = $f13917a90d4db9b497c005419c2c20b9$var$noop;
  $f13917a90d4db9b497c005419c2c20b9$var$process.emit = $f13917a90d4db9b497c005419c2c20b9$var$noop;
  $f13917a90d4db9b497c005419c2c20b9$var$process.prependListener = $f13917a90d4db9b497c005419c2c20b9$var$noop;
  $f13917a90d4db9b497c005419c2c20b9$var$process.prependOnceListener = $f13917a90d4db9b497c005419c2c20b9$var$noop;
  $f13917a90d4db9b497c005419c2c20b9$var$process.listeners = function (name) {
    return [];
  };
  $f13917a90d4db9b497c005419c2c20b9$var$process.binding = function (name) {
    throw new Error('process.binding is not supported');
  };
  $f13917a90d4db9b497c005419c2c20b9$var$process.cwd = function () {
    return '/';
  };
  $f13917a90d4db9b497c005419c2c20b9$var$process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
  };
  $f13917a90d4db9b497c005419c2c20b9$var$process.umask = function () {
    return 0;
  };
  var $0cadccb41e85f2d51adaeca3bc4c5382$var$process = $f13917a90d4db9b497c005419c2c20b9$exports;
  $e19048c42855c3b88d29747cbb9ddb25$init();
  // ASSET: node_modules/axios/lib/helpers/normalizeHeaderName.js
  var $d2e6af9a6345b7260ce62be22aa0c0fc$exports = {};
  $e19048c42855c3b88d29747cbb9ddb25$init();
  $d2e6af9a6345b7260ce62be22aa0c0fc$exports = function normalizeHeaderName(headers, normalizedName) {
    $e19048c42855c3b88d29747cbb9ddb25$init().forEach(headers, function processHeader(value, name) {
      if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
        headers[normalizedName] = value;
        delete headers[name];
      }
    });
  };
  var $0cadccb41e85f2d51adaeca3bc4c5382$var$normalizeHeaderName = $d2e6af9a6345b7260ce62be22aa0c0fc$exports;
  var $0cadccb41e85f2d51adaeca3bc4c5382$var$DEFAULT_CONTENT_TYPE = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };
  function $0cadccb41e85f2d51adaeca3bc4c5382$var$setContentTypeIfUnset(headers, value) {
    if (!$e19048c42855c3b88d29747cbb9ddb25$init().isUndefined(headers) && $e19048c42855c3b88d29747cbb9ddb25$init().isUndefined(headers['Content-Type'])) {
      headers['Content-Type'] = value;
    }
  }
  function $0cadccb41e85f2d51adaeca3bc4c5382$var$getDefaultAdapter() {
    var adapter;
    if (typeof XMLHttpRequest !== 'undefined') {
      // For browsers use XHR adapter
      adapter = $f46b8f489827acde7782a34fea2ab58a$init();
    } else if (typeof $0cadccb41e85f2d51adaeca3bc4c5382$var$process !== 'undefined' && Object.prototype.toString.call($0cadccb41e85f2d51adaeca3bc4c5382$var$process) === '[object process]') {
      // For node use HTTP adapter
      adapter = $f46b8f489827acde7782a34fea2ab58a$init();
    }
    return adapter;
  }
  var $0cadccb41e85f2d51adaeca3bc4c5382$var$defaults = {
    adapter: $0cadccb41e85f2d51adaeca3bc4c5382$var$getDefaultAdapter(),
    transformRequest: [function transformRequest(data, headers) {
      $0cadccb41e85f2d51adaeca3bc4c5382$var$normalizeHeaderName(headers, 'Accept');
      $0cadccb41e85f2d51adaeca3bc4c5382$var$normalizeHeaderName(headers, 'Content-Type');
      if ($e19048c42855c3b88d29747cbb9ddb25$init().isFormData(data) || $e19048c42855c3b88d29747cbb9ddb25$init().isArrayBuffer(data) || $e19048c42855c3b88d29747cbb9ddb25$init().isBuffer(data) || $e19048c42855c3b88d29747cbb9ddb25$init().isStream(data) || $e19048c42855c3b88d29747cbb9ddb25$init().isFile(data) || $e19048c42855c3b88d29747cbb9ddb25$init().isBlob(data)) {
        return data;
      }
      if ($e19048c42855c3b88d29747cbb9ddb25$init().isArrayBufferView(data)) {
        return data.buffer;
      }
      if ($e19048c42855c3b88d29747cbb9ddb25$init().isURLSearchParams(data)) {
        $0cadccb41e85f2d51adaeca3bc4c5382$var$setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
        return data.toString();
      }
      if ($e19048c42855c3b88d29747cbb9ddb25$init().isObject(data)) {
        $0cadccb41e85f2d51adaeca3bc4c5382$var$setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
        return JSON.stringify(data);
      }
      return data;
    }],
    transformResponse: [function transformResponse(data) {
      /*eslint no-param-reassign:0*/
      if (typeof data === 'string') {
        try {
          data = JSON.parse(data);
        } catch (e) {}
      }
      return data;
    }],
    /**
    * A timeout in milliseconds to abort a request. If set to 0 (default) a
    * timeout is not created.
    */
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    maxBodyLength: -1,
    validateStatus: function validateStatus(status) {
      return status >= 200 && status < 300;
    }
  };
  $0cadccb41e85f2d51adaeca3bc4c5382$var$defaults.headers = {
    common: {
      'Accept': 'application/json, text/plain, */*'
    }
  };
  $e19048c42855c3b88d29747cbb9ddb25$init().forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
    $0cadccb41e85f2d51adaeca3bc4c5382$var$defaults.headers[method] = {};
  });
  $e19048c42855c3b88d29747cbb9ddb25$init().forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
    $0cadccb41e85f2d51adaeca3bc4c5382$var$defaults.headers[method] = $e19048c42855c3b88d29747cbb9ddb25$init().merge($0cadccb41e85f2d51adaeca3bc4c5382$var$DEFAULT_CONTENT_TYPE);
  });
  $0cadccb41e85f2d51adaeca3bc4c5382$exports = $0cadccb41e85f2d51adaeca3bc4c5382$var$defaults;
  /**
  * Throws a `Cancel` if cancellation has been requested.
  */
  function $5541138bac2e3d21afd0249ec7822d13$var$throwIfCancellationRequested(config) {
    if (config.cancelToken) {
      config.cancelToken.throwIfRequested();
    }
  }
  /**
  * Dispatch a request to the server using the configured adapter.
  *
  * @param {object} config The config that is to be used for the request
  * @returns {Promise} The Promise to be fulfilled
  */
  $5541138bac2e3d21afd0249ec7822d13$exports = function dispatchRequest(config) {
    $5541138bac2e3d21afd0249ec7822d13$var$throwIfCancellationRequested(config);
    // Ensure headers exist
    config.headers = config.headers || ({});
    // Transform request data
    config.data = $5541138bac2e3d21afd0249ec7822d13$var$transformData(config.data, config.headers, config.transformRequest);
    // Flatten headers
    config.headers = $e19048c42855c3b88d29747cbb9ddb25$init().merge(config.headers.common || ({}), config.headers[config.method] || ({}), config.headers);
    $e19048c42855c3b88d29747cbb9ddb25$init().forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], function cleanHeaderConfig(method) {
      delete config.headers[method];
    });
    var adapter = config.adapter || $0cadccb41e85f2d51adaeca3bc4c5382$exports.adapter;
    return adapter(config).then(function onAdapterResolution(response) {
      $5541138bac2e3d21afd0249ec7822d13$var$throwIfCancellationRequested(config);
      // Transform response data
      response.data = $5541138bac2e3d21afd0249ec7822d13$var$transformData(response.data, response.headers, config.transformResponse);
      return response;
    }, function onAdapterRejection(reason) {
      if (!$5541138bac2e3d21afd0249ec7822d13$var$isCancel(reason)) {
        $5541138bac2e3d21afd0249ec7822d13$var$throwIfCancellationRequested(config);
        // Transform response data
        if (reason && reason.response) {
          reason.response.data = $5541138bac2e3d21afd0249ec7822d13$var$transformData(reason.response.data, reason.response.headers, config.transformResponse);
        }
      }
      return Promise.reject(reason);
    });
  };
  var $b71eeaf2bd46fd7541ee91d3808b050e$var$dispatchRequest = $5541138bac2e3d21afd0249ec7822d13$exports;
  // ASSET: node_modules/axios/lib/core/mergeConfig.js
  var $ceaab18c3b06f015e4b5a3b8b691dcb3$exports = {};
  $e19048c42855c3b88d29747cbb9ddb25$init();
  /**
  * Config-specific merge-function which creates a new config-object
  * by merging two configuration objects together.
  *
  * @param {Object} config1
  * @param {Object} config2
  * @returns {Object} New object resulting from merging config2 to config1
  */
  $ceaab18c3b06f015e4b5a3b8b691dcb3$exports = function mergeConfig(config1, config2) {
    // eslint-disable-next-line no-param-reassign
    config2 = config2 || ({});
    var config = {};
    var valueFromConfig2Keys = ['url', 'method', 'data'];
    var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
    var defaultToConfig2Keys = ['baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer', 'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName', 'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress', 'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent', 'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'];
    var directMergeKeys = ['validateStatus'];
    function getMergedValue(target, source) {
      if ($e19048c42855c3b88d29747cbb9ddb25$init().isPlainObject(target) && $e19048c42855c3b88d29747cbb9ddb25$init().isPlainObject(source)) {
        return $e19048c42855c3b88d29747cbb9ddb25$init().merge(target, source);
      } else if ($e19048c42855c3b88d29747cbb9ddb25$init().isPlainObject(source)) {
        return $e19048c42855c3b88d29747cbb9ddb25$init().merge({}, source);
      } else if ($e19048c42855c3b88d29747cbb9ddb25$init().isArray(source)) {
        return source.slice();
      }
      return source;
    }
    function mergeDeepProperties(prop) {
      if (!$e19048c42855c3b88d29747cbb9ddb25$init().isUndefined(config2[prop])) {
        config[prop] = getMergedValue(config1[prop], config2[prop]);
      } else if (!$e19048c42855c3b88d29747cbb9ddb25$init().isUndefined(config1[prop])) {
        config[prop] = getMergedValue(undefined, config1[prop]);
      }
    }
    $e19048c42855c3b88d29747cbb9ddb25$init().forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
      if (!$e19048c42855c3b88d29747cbb9ddb25$init().isUndefined(config2[prop])) {
        config[prop] = getMergedValue(undefined, config2[prop]);
      }
    });
    $e19048c42855c3b88d29747cbb9ddb25$init().forEach(mergeDeepPropertiesKeys, mergeDeepProperties);
    $e19048c42855c3b88d29747cbb9ddb25$init().forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
      if (!$e19048c42855c3b88d29747cbb9ddb25$init().isUndefined(config2[prop])) {
        config[prop] = getMergedValue(undefined, config2[prop]);
      } else if (!$e19048c42855c3b88d29747cbb9ddb25$init().isUndefined(config1[prop])) {
        config[prop] = getMergedValue(undefined, config1[prop]);
      }
    });
    $e19048c42855c3b88d29747cbb9ddb25$init().forEach(directMergeKeys, function merge(prop) {
      if ((prop in config2)) {
        config[prop] = getMergedValue(config1[prop], config2[prop]);
      } else if ((prop in config1)) {
        config[prop] = getMergedValue(undefined, config1[prop]);
      }
    });
    var axiosKeys = valueFromConfig2Keys.concat(mergeDeepPropertiesKeys).concat(defaultToConfig2Keys).concat(directMergeKeys);
    var otherKeys = Object.keys(config1).concat(Object.keys(config2)).filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });
    $e19048c42855c3b88d29747cbb9ddb25$init().forEach(otherKeys, mergeDeepProperties);
    return config;
  };
  var $b71eeaf2bd46fd7541ee91d3808b050e$var$mergeConfig = $ceaab18c3b06f015e4b5a3b8b691dcb3$exports;
  /**
  * Create a new instance of Axios
  *
  * @param {Object} instanceConfig The default config for the instance
  */
  function $b71eeaf2bd46fd7541ee91d3808b050e$var$Axios(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
      request: new $b71eeaf2bd46fd7541ee91d3808b050e$var$InterceptorManager(),
      response: new $b71eeaf2bd46fd7541ee91d3808b050e$var$InterceptorManager()
    };
  }
  /**
  * Dispatch a request
  *
  * @param {Object} config The config specific for this request (merged with this.defaults)
  */
  $b71eeaf2bd46fd7541ee91d3808b050e$var$Axios.prototype.request = function request(config) {
    /*eslint no-param-reassign:0*/
    // Allow for axios('example/url'[, config]) a la fetch API
    if (typeof config === 'string') {
      config = arguments[1] || ({});
      config.url = arguments[0];
    } else {
      config = config || ({});
    }
    config = $b71eeaf2bd46fd7541ee91d3808b050e$var$mergeConfig(this.defaults, config);
    // Set config.method
    if (config.method) {
      config.method = config.method.toLowerCase();
    } else if (this.defaults.method) {
      config.method = this.defaults.method.toLowerCase();
    } else {
      config.method = 'get';
    }
    // Hook up interceptors middleware
    var chain = [$b71eeaf2bd46fd7541ee91d3808b050e$var$dispatchRequest, undefined];
    var promise = Promise.resolve(config);
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      chain.unshift(interceptor.fulfilled, interceptor.rejected);
    });
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      chain.push(interceptor.fulfilled, interceptor.rejected);
    });
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }
    return promise;
  };
  $b71eeaf2bd46fd7541ee91d3808b050e$var$Axios.prototype.getUri = function getUri(config) {
    config = $b71eeaf2bd46fd7541ee91d3808b050e$var$mergeConfig(this.defaults, config);
    return $b71eeaf2bd46fd7541ee91d3808b050e$var$buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
  };
  // Provide aliases for supported request methods
  $e19048c42855c3b88d29747cbb9ddb25$init().forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
    /*eslint func-names:0*/
    $b71eeaf2bd46fd7541ee91d3808b050e$var$Axios.prototype[method] = function (url, config) {
      return this.request($b71eeaf2bd46fd7541ee91d3808b050e$var$mergeConfig(config || ({}), {
        method: method,
        url: url,
        data: (config || ({})).data
      }));
    };
  });
  $e19048c42855c3b88d29747cbb9ddb25$init().forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
    /*eslint func-names:0*/
    $b71eeaf2bd46fd7541ee91d3808b050e$var$Axios.prototype[method] = function (url, data, config) {
      return this.request($b71eeaf2bd46fd7541ee91d3808b050e$var$mergeConfig(config || ({}), {
        method: method,
        url: url,
        data: data
      }));
    };
  });
  $b71eeaf2bd46fd7541ee91d3808b050e$exports = $b71eeaf2bd46fd7541ee91d3808b050e$var$Axios;
  var $ea182a60f6c3729931fdb5051f0fed05$var$Axios = $b71eeaf2bd46fd7541ee91d3808b050e$exports;
  var $ea182a60f6c3729931fdb5051f0fed05$var$mergeConfig = $ceaab18c3b06f015e4b5a3b8b691dcb3$exports;
  var $ea182a60f6c3729931fdb5051f0fed05$var$defaults = $0cadccb41e85f2d51adaeca3bc4c5382$exports;
  /**
  * Create an instance of Axios
  *
  * @param {Object} defaultConfig The default config for the instance
  * @return {Axios} A new instance of Axios
  */
  function $ea182a60f6c3729931fdb5051f0fed05$var$createInstance(defaultConfig) {
    var context = new $ea182a60f6c3729931fdb5051f0fed05$var$Axios(defaultConfig);
    var instance = $ea182a60f6c3729931fdb5051f0fed05$var$bind($ea182a60f6c3729931fdb5051f0fed05$var$Axios.prototype.request, context);
    // Copy axios.prototype to instance
    $e19048c42855c3b88d29747cbb9ddb25$init().extend(instance, $ea182a60f6c3729931fdb5051f0fed05$var$Axios.prototype, context);
    // Copy context to instance
    $e19048c42855c3b88d29747cbb9ddb25$init().extend(instance, context);
    return instance;
  }
  // Create the default instance to be exported
  var $ea182a60f6c3729931fdb5051f0fed05$var$axios = $ea182a60f6c3729931fdb5051f0fed05$var$createInstance($ea182a60f6c3729931fdb5051f0fed05$var$defaults);
  // Expose Axios class to allow class inheritance
  $ea182a60f6c3729931fdb5051f0fed05$var$axios.Axios = $ea182a60f6c3729931fdb5051f0fed05$var$Axios;
  // Factory for creating new instances
  $ea182a60f6c3729931fdb5051f0fed05$var$axios.create = function create(instanceConfig) {
    return $ea182a60f6c3729931fdb5051f0fed05$var$createInstance($ea182a60f6c3729931fdb5051f0fed05$var$mergeConfig($ea182a60f6c3729931fdb5051f0fed05$var$axios.defaults, instanceConfig));
  };
  // ASSET: node_modules/axios/lib/cancel/Cancel.js
  var $dac60d7e0eb8706d689967d692c2fff6$exports = {};
  /**
  * A `Cancel` is an object that is thrown when an operation is canceled.
  *
  * @class
  * @param {string=} message The message.
  */
  function $dac60d7e0eb8706d689967d692c2fff6$var$Cancel(message) {
    this.message = message;
  }
  $dac60d7e0eb8706d689967d692c2fff6$var$Cancel.prototype.toString = function toString() {
    return 'Cancel' + (this.message ? ': ' + this.message : '');
  };
  $dac60d7e0eb8706d689967d692c2fff6$var$Cancel.prototype.__CANCEL__ = true;
  $dac60d7e0eb8706d689967d692c2fff6$exports = $dac60d7e0eb8706d689967d692c2fff6$var$Cancel;
  // Expose Cancel & CancelToken
  $ea182a60f6c3729931fdb5051f0fed05$var$axios.Cancel = $dac60d7e0eb8706d689967d692c2fff6$exports;
  // ASSET: node_modules/axios/lib/cancel/CancelToken.js
  var $cac9565c4902e3ae791e933da23b8c2f$exports = {};
  var $cac9565c4902e3ae791e933da23b8c2f$var$Cancel = $dac60d7e0eb8706d689967d692c2fff6$exports;
  /**
  * A `CancelToken` is an object that can be used to request cancellation of an operation.
  *
  * @class
  * @param {Function} executor The executor function.
  */
  function $cac9565c4902e3ae791e933da23b8c2f$var$CancelToken(executor) {
    if (typeof executor !== 'function') {
      throw new TypeError('executor must be a function.');
    }
    var resolvePromise;
    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });
    var token = this;
    executor(function cancel(message) {
      if (token.reason) {
        // Cancellation has already been requested
        return;
      }
      token.reason = new $cac9565c4902e3ae791e933da23b8c2f$var$Cancel(message);
      resolvePromise(token.reason);
    });
  }
  /**
  * Throws a `Cancel` if cancellation has been requested.
  */
  $cac9565c4902e3ae791e933da23b8c2f$var$CancelToken.prototype.throwIfRequested = function throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  };
  /**
  * Returns an object that contains a new `CancelToken` and a function that, when called,
  * cancels the `CancelToken`.
  */
  $cac9565c4902e3ae791e933da23b8c2f$var$CancelToken.source = function source() {
    var cancel;
    var token = new $cac9565c4902e3ae791e933da23b8c2f$var$CancelToken(function executor(c) {
      cancel = c;
    });
    return {
      token: token,
      cancel: cancel
    };
  };
  $cac9565c4902e3ae791e933da23b8c2f$exports = $cac9565c4902e3ae791e933da23b8c2f$var$CancelToken;
  $ea182a60f6c3729931fdb5051f0fed05$var$axios.CancelToken = $cac9565c4902e3ae791e933da23b8c2f$exports;
  $ea182a60f6c3729931fdb5051f0fed05$var$axios.isCancel = $034df188f14d1f02466330b5556474aa$exports;
  // Expose all/spread
  $ea182a60f6c3729931fdb5051f0fed05$var$axios.all = function all(promises) {
    return Promise.all(promises);
  };
  // ASSET: node_modules/axios/lib/helpers/spread.js
  var $fefa27386ba9bc3a1ac2fc122c99873d$exports = {};
  /**
  * Syntactic sugar for invoking a function and expanding an array for arguments.
  *
  * Common use case would be to use `Function.prototype.apply`.
  *
  *  ```js
  *  function f(x, y, z) {}
  *  var args = [1, 2, 3];
  *  f.apply(null, args);
  *  ```
  *
  * With `spread` this example can be re-written.
  *
  *  ```js
  *  spread(function(x, y, z) {})([1, 2, 3]);
  *  ```
  *
  * @param {Function} callback
  * @returns {Function}
  */
  $fefa27386ba9bc3a1ac2fc122c99873d$exports = function spread(callback) {
    return function wrap(arr) {
      return callback.apply(null, arr);
    };
  };
  $ea182a60f6c3729931fdb5051f0fed05$var$axios.spread = $fefa27386ba9bc3a1ac2fc122c99873d$exports;
  // ASSET: node_modules/axios/lib/helpers/isAxiosError.js
  var $8099498101606e07b2857a477771921c$exports = {};
  /**
  * Determines whether the payload is an error thrown by Axios
  *
  * @param {*} payload The value to test
  * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
  */
  $8099498101606e07b2857a477771921c$exports = function isAxiosError(payload) {
    return typeof payload === 'object' && payload.isAxiosError === true;
  };
  // Expose isAxiosError
  $ea182a60f6c3729931fdb5051f0fed05$var$axios.isAxiosError = $8099498101606e07b2857a477771921c$exports;
  $ea182a60f6c3729931fdb5051f0fed05$exports = $ea182a60f6c3729931fdb5051f0fed05$var$axios;
  var $ea182a60f6c3729931fdb5051f0fed05$export$default = $ea182a60f6c3729931fdb5051f0fed05$var$axios;
  // Allow use of default import syntax in TypeScript
  $ea182a60f6c3729931fdb5051f0fed05$exports.default = $ea182a60f6c3729931fdb5051f0fed05$export$default;
  $9a6acbaf99b7f614537e1f05bbe68696$exports = $ea182a60f6c3729931fdb5051f0fed05$exports;
  // Default channel values of schema which is passed to webgl drawer
  const $647b390bbe26a1e6bbc6a8c9e19f41d2$export$DEFAULT_CHANNELS = Object.freeze({
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
  const $647b390bbe26a1e6bbc6a8c9e19f41d2$var$DEFAULT_MAX_SIZE = 100;
  const $647b390bbe26a1e6bbc6a8c9e19f41d2$var$DEFAULT_MIN_SIZE = 0;
  const $647b390bbe26a1e6bbc6a8c9e19f41d2$var$DEFAULT_MIN_OPACITY = 0;
  const $647b390bbe26a1e6bbc6a8c9e19f41d2$var$DEFAULT_MIN_WIDTH = 0;
  const $647b390bbe26a1e6bbc6a8c9e19f41d2$var$DEFAULT_MIN_HEIGHT = 0;
  const $647b390bbe26a1e6bbc6a8c9e19f41d2$var$DEFAULT_MAX_WIDTH = 1 / $6d3e717fed031fdb2ee2c357e03764b6$export$SIZE_UNITS;
  const $647b390bbe26a1e6bbc6a8c9e19f41d2$var$DEFAULT_MAX_HEIGHT = 1 / $6d3e717fed031fdb2ee2c357e03764b6$export$SIZE_UNITS;
  const $647b390bbe26a1e6bbc6a8c9e19f41d2$var$DEFAULT_COLOR_SCHEME = "interpolateBrBG";
  const $647b390bbe26a1e6bbc6a8c9e19f41d2$var$SHAPES = ["dot", "triangle", "circle", "diamond"];
  /**
  * Given a track, determine the WebGL draw mode for it
  *
  * @param {Object} track from schema
  * @returns WebGLDrawMode as a string
  */
  const $647b390bbe26a1e6bbc6a8c9e19f41d2$export$getDrawModeForTrack = track => {
    switch (track.mark) {
      case "line":
        return "LINE_STRIP";
      case "tick":
        return "LINES";
      case "point":
        if (track.shape && track.shape.value !== "dot") {
          return "TRIANGLES";
        } else {
          return "POINTS";
        }
      case "bar":
      case "rect":
      case "area":
        return "TRIANGLES";
    }
  };
  class $647b390bbe26a1e6bbc6a8c9e19f41d2$export$default {
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
      if (Array.isArray(schema.defaultData)) {
        this.data = schema.defaultData;
      } else if (typeof schema.defaultData === "string") {
        this.dataPromise = $9a6acbaf99b7f614537e1f05bbe68696$exports.get(schema.defaultData).then(response => {
          this.data = response.data.split("\n");
        });
      }
      this.tracks = schema.tracks.map(track => new $647b390bbe26a1e6bbc6a8c9e19f41d2$var$Track(this, track));
      const allPromises = this.tracks.map(track => track.dataPromise).filter(p => p);
      if (this.dataPromise) {
        allPromises.push(this.dataPromise);
      }
      this.xScale = $794bbb298c1fc0cc3157526701549b8c$export$getScaleForSchema("x", schema);
      this.yScale = $794bbb298c1fc0cc3157526701549b8c$export$getScaleForSchema("y", schema);
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
  class $647b390bbe26a1e6bbc6a8c9e19f41d2$var$Track {
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
      if (Array.isArray(track.data)) {
        // Track has its own inline data
        this.data = track.data;
        this.processHeadersAndMappers();
        this.hasOwnData = true;
      } else if (typeof track.data === "string") {
        // Track has its own data to GET
        this.dataPromise = $9a6acbaf99b7f614537e1f05bbe68696$exports.get(track.data).then(response => {
          this.data = response.data.split(/[\n\r]+/);
          this.processHeadersAndMappers();
          this.hasOwnData = true;
        });
      } else if (schema.data) {
        // Track does not have its own data, but the schema has default data
        this.data = schema.data;
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
      this.headers = this.data[0].split(",");
      // Creating channel mappers
      this.channelMaps = new Map();
      Object.keys($647b390bbe26a1e6bbc6a8c9e19f41d2$export$DEFAULT_CHANNELS).forEach(channel => {
        this.channelMaps.set(channel, this.buildMapperForChannel(channel));
      });
    }
    /**
    * Get the next data point from the track. Returns null when all points have been returned.
    * @returns A data point with the x and y coordinates and other attributes from the header
    */
    getNextDataPoint() {
      if (this.index >= this.data.length) {
        // TODO potentially erase this.data for garbage collection
        return null;
      }
      const toReturn = {
        geometry: {
          coordinates: []
        }
      };
      const currRow = this.data[this.index++];
      const splitted = currRow.split(",");
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
      if (this.index >= this.data.length) {
        return null;
      }
      const toReturn = {};
      const currRow = this.data[this.index++];
      const splitted = currRow.split(",");
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
            channelInfo.value = $794bbb298c1fc0cc3157526701549b8c$export$colorSpecifierToHex(channelInfo.value);
          }
          return () => channelInfo.value;
        } else {
          const attributeIndex = this.headers.indexOf(channelInfo.attribute);
          let attrMapper;
          switch (channelInfo.type) {
            case "quantitative":
              attrMapper = $647b390bbe26a1e6bbc6a8c9e19f41d2$var$buildMapperForQuantitiveChannel(channel, channelInfo);
              break;
            case "categorical":
              attrMapper = $647b390bbe26a1e6bbc6a8c9e19f41d2$var$buildMapperForCategoricalChannel(channel, channelInfo);
              break;
            case "genomic":
              const chrAttributeIndex = this.headers.indexOf(channelInfo.chrAttribute);
              const geneAttributeIndex = this.headers.indexOf(channelInfo.geneAttribute);
              attrMapper = $647b390bbe26a1e6bbc6a8c9e19f41d2$var$buildMapperForGenomicChannel(channel, channelInfo);
              return row => attrMapper(row[chrAttributeIndex], row[geneAttributeIndex]);
            case "genomicRange":
              const genomicAttributeIndices = [this.headers.indexOf(channelInfo.chrAttribute), this.headers.indexOf(channelInfo.startAttribute), this.headers.indexOf(channelInfo.endAttribute)];
              attrMapper = $647b390bbe26a1e6bbc6a8c9e19f41d2$var$buildMapperForGenomicRangeChannel(channel, channelInfo);
              return row => // Pass in values for the genomic attributes to mapper
              attrMapper(...genomicAttributeIndices.map(index => row[index]));
          }
          return row => attrMapper(row[attributeIndex]);
        }
      } else {
        return () => $647b390bbe26a1e6bbc6a8c9e19f41d2$export$DEFAULT_CHANNELS[channel].value;
      }
    };
  }
  /**
  * Build a function which maps a numerical value for an attribute to a property of a mark
  * @param {*} channel the name of the quantitative channel to map
  * @param {*} channelInfo the object containing info for this channel from the schema
  * @returns a function that maps a data attribute value to a channel value
  */
  const $647b390bbe26a1e6bbc6a8c9e19f41d2$var$buildMapperForQuantitiveChannel = (channel, channelInfo) => {
    switch (channel) {
      case "x":
      case "y":
        // Map x and y to itself, but we need a function to do it
        return coord => parseFloat(coord);
      case "opacity":
        return $794bbb298c1fc0cc3157526701549b8c$export$scale(channelInfo.domain, [channelInfo.minOpacity || $647b390bbe26a1e6bbc6a8c9e19f41d2$var$DEFAULT_MIN_OPACITY, 1]);
      case "size":
        return $794bbb298c1fc0cc3157526701549b8c$export$scale(channelInfo.domain, [channelInfo.minSize || $647b390bbe26a1e6bbc6a8c9e19f41d2$var$DEFAULT_MIN_SIZE, channelInfo.maxSize || $647b390bbe26a1e6bbc6a8c9e19f41d2$var$DEFAULT_MAX_SIZE]);
      case "color":
        const d3colorScale = !channelInfo.colorScheme || !((channelInfo.colorScheme in $647b390bbe26a1e6bbc6a8c9e19f41d2$var$d3)) ? $647b390bbe26a1e6bbc6a8c9e19f41d2$var$d3[$647b390bbe26a1e6bbc6a8c9e19f41d2$var$DEFAULT_COLOR_SCHEME] : $647b390bbe26a1e6bbc6a8c9e19f41d2$var$d3[channelInfo.colorScheme];
        const zeroToOneScale = $794bbb298c1fc0cc3157526701549b8c$export$scale(channelInfo.domain, [0, 1]);
        return attrValue => $794bbb298c1fc0cc3157526701549b8c$export$rgbStringToHex(d3colorScale(zeroToOneScale(attrValue)));
      case "width":
        return $794bbb298c1fc0cc3157526701549b8c$export$scale(channelInfo.domain, [channelInfo.minWidth || $647b390bbe26a1e6bbc6a8c9e19f41d2$var$DEFAULT_MIN_WIDTH, channelInfo.maxWidth || $647b390bbe26a1e6bbc6a8c9e19f41d2$var$DEFAULT_MAX_WIDTH]);
      case "height":
        return $794bbb298c1fc0cc3157526701549b8c$export$scale(channelInfo.domain, [channelInfo.minHeight || $647b390bbe26a1e6bbc6a8c9e19f41d2$var$DEFAULT_MIN_HEIGHT, channelInfo.maxHeight || $647b390bbe26a1e6bbc6a8c9e19f41d2$var$DEFAULT_MAX_WIDTH]);
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
  const $647b390bbe26a1e6bbc6a8c9e19f41d2$var$buildMapperForCategoricalChannel = (channel, channelInfo) => {
    const categoryTracker = new Map();
    let channelScale;
    switch (channel) {
      case "x":
      case "y":
        channelScale = $794bbb298c1fc0cc3157526701549b8c$export$scale([0, channelInfo.cardinality], [-1, 1]);
        break;
      case "opacity":
        channelScale = $794bbb298c1fc0cc3157526701549b8c$export$scale([channelInfo.minOpacity || $647b390bbe26a1e6bbc6a8c9e19f41d2$var$DEFAULT_MIN_OPACITY, channelInfo.cardinality], [0, 1]);
        break;
      case "size":
        channelScale = $794bbb298c1fc0cc3157526701549b8c$export$scale([0, channelInfo.cardinality], [channelInfo.minSize || $647b390bbe26a1e6bbc6a8c9e19f41d2$var$DEFAULT_MIN_SIZE, channelInfo.maxSize || $647b390bbe26a1e6bbc6a8c9e19f41d2$var$DEFAULT_MAX_SIZE]);
        break;
      case "shape":
        channelScale = categoryId => $647b390bbe26a1e6bbc6a8c9e19f41d2$var$SHAPES[categoryId % $647b390bbe26a1e6bbc6a8c9e19f41d2$var$SHAPES.length];
        break;
      case "color":
        let d3colorScale = !channelInfo.colorScheme || !((channelInfo.colorScheme in $647b390bbe26a1e6bbc6a8c9e19f41d2$var$d3)) ? $647b390bbe26a1e6bbc6a8c9e19f41d2$var$d3[$647b390bbe26a1e6bbc6a8c9e19f41d2$var$DEFAULT_COLOR_SCHEME] : $647b390bbe26a1e6bbc6a8c9e19f41d2$var$d3[channelInfo.colorScheme];
        if (Array.isArray(d3colorScale)) {
          console.error("Currenty only interpolating color schemes are supported, using default");
          d3colorScale = $647b390bbe26a1e6bbc6a8c9e19f41d2$var$d3[$647b390bbe26a1e6bbc6a8c9e19f41d2$var$DEFAULT_COLOR_SCHEME];
        }
        const zeroToOneScale = $794bbb298c1fc0cc3157526701549b8c$export$scale([0, channelInfo.cardinality], [0, 1]);
        channelScale = categoryId => $794bbb298c1fc0cc3157526701549b8c$export$rgbStringToHex(d3colorScale(zeroToOneScale(categoryId)));
        break;
      case "width":
        channelScale = $794bbb298c1fc0cc3157526701549b8c$export$scale([0, channelInfo.cardinality], [channelInfo.minWidth || $647b390bbe26a1e6bbc6a8c9e19f41d2$var$DEFAULT_MIN_WIDTH, channelInfo.maxWidth || $647b390bbe26a1e6bbc6a8c9e19f41d2$var$DEFAULT_MAX_WIDTH]);
        break;
      case "height":
        channelScale = $794bbb298c1fc0cc3157526701549b8c$export$scale([0, channelInfo.cardinality], [channelInfo.minHeight || $647b390bbe26a1e6bbc6a8c9e19f41d2$var$DEFAULT_MIN_HEIGHT, channelInfo.maxHeight || $647b390bbe26a1e6bbc6a8c9e19f41d2$var$DEFAULT_MAX_HEIGHT]);
        break;
      default:
        console.error(`${channel} is not a supported channel for categorical attributes!`);
    }
    return attrValue => {
      if (!categoryTracker.has(attrValue)) {
        categoryTracker.set(attrValue, categoryTracker.size);
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
  const $647b390bbe26a1e6bbc6a8c9e19f41d2$var$buildMapperForGenomicChannel = (channel, channelInfo) => {
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
  * @param {*} channel either x or y
  * @param {*} channelInfo the object containing info for this channel from the schema
  * @returns a function that maps (genomeChr, genomeStart, genomeEnd) -> an object containing mark metadata for position
  *  format: [chrId, geneLocation, chrId2, geneLocation2]
  *  ex: ["1", 1000, "X", 2000]
  */
  const $647b390bbe26a1e6bbc6a8c9e19f41d2$var$buildMapperForGenomicRangeChannel = (channel, channelInfo) => {
    switch (channel) {
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
  $parcel$export($647b390bbe26a1e6bbc6a8c9e19f41d2$exports, "default", function () {
    return $647b390bbe26a1e6bbc6a8c9e19f41d2$export$default;
  });
  $parcel$export($647b390bbe26a1e6bbc6a8c9e19f41d2$exports, "getDrawModeForTrack", function () {
    return $647b390bbe26a1e6bbc6a8c9e19f41d2$export$getDrawModeForTrack;
  });
  $parcel$export($647b390bbe26a1e6bbc6a8c9e19f41d2$exports, "DEFAULT_CHANNELS", function () {
    return $647b390bbe26a1e6bbc6a8c9e19f41d2$export$DEFAULT_CHANNELS;
  });
  function $647b390bbe26a1e6bbc6a8c9e19f41d2$init() {
    return $647b390bbe26a1e6bbc6a8c9e19f41d2$exports;
  }
  function $794bbb298c1fc0cc3157526701549b8c$init() {
    return $794bbb298c1fc0cc3157526701549b8c$exports;
  }
  function $2e9e6b6c3378724b336406626f99a6bc$init() {
    return $2e9e6b6c3378724b336406626f99a6bc$exports;
  }
  function $6d3e717fed031fdb2ee2c357e03764b6$init() {
    return $6d3e717fed031fdb2ee2c357e03764b6$exports;
  }
  parcelRequire.register("33BxP", $647b390bbe26a1e6bbc6a8c9e19f41d2$init);
  parcelRequire.register("3GSGc", $794bbb298c1fc0cc3157526701549b8c$init);
  parcelRequire.register("1pY2N", $2e9e6b6c3378724b336406626f99a6bc$init);
  parcelRequire.register("3k8Hq", $6d3e717fed031fdb2ee2c357e03764b6$init);
})();

//# sourceMappingURL=offscreen-webgl-worker.b65565ff.js.map
