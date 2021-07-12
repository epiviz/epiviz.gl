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
      // Try the node require function if it exists.
      // Do not use `require` to prevent Webpack from trying to bundle this call
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
  function $parcel$bundleWrapper() {
    if ($parcel$bundleWrapper._executed) return;
    $parcel$bundleWrapper._executed = true;
    // ASSET: src/epiviz.gl/utilities.js
    var $794bbb298c1fc0cc3157526701549b8c$exports = {};
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
    * will default to [-1, 1] for that dimension for the mouseReader.
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
        let yDomain = track.y.domain;
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
    * @returns
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
    function $794bbb298c1fc0cc3157526701549b8c$init() {
      return $794bbb298c1fc0cc3157526701549b8c$exports;
    }
    parcelRequire.register("3GSGc", $794bbb298c1fc0cc3157526701549b8c$init);
  }
  var $parcel$referencedAssets = ["3GSGc"];
  for (var $parcel$i = 0; $parcel$i < $parcel$referencedAssets.length; $parcel$i++) {
    parcelRequire3582.registerBundle($parcel$referencedAssets[$parcel$i], $parcel$bundleWrapper);
  }
})();

//# sourceMappingURL=index.10f1aa48.js.map
