(() => {
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
var $parcel$global =
typeof globalThis !== 'undefined'
  ? globalThis
  : typeof self !== 'undefined'
  ? self
  : typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
  ? global
  : {};
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequire9975"];
if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequire9975"] = parcelRequire;
}
parcelRequire.register("js2wE", function(module, exports) {

$parcel$export(module.exports, "DEFAULT_CHANNELS", () => $e292975eb916f4bb$export$4c1e9b40560b342d);
$parcel$export(module.exports, "getDrawModeForTrack", () => $e292975eb916f4bb$export$cec99640ca10fb96);
$parcel$export(module.exports, "default", () => $e292975eb916f4bb$export$2e2bcd8739ae039);
parcelRequire("8Xkng");
var $c4W55 = parcelRequire("c4W55");

var $bCvgp = parcelRequire("bCvgp");

var $jk5q7 = parcelRequire("jk5q7");

var $976OM = parcelRequire("976OM");
// Default channel values of specification which is passed to webgl drawer
const $e292975eb916f4bb$export$4c1e9b40560b342d = Object.freeze({
    size: {
        value: 1,
        numComponents: 1,
        type: "float"
    },
    color: {
        value: 16581375,
        numComponents: 1,
        type: "float"
    },
    x: {
        value: 0,
        numComponents: null,
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
        // Default values for width and height add complications
        // to mapping geometry and creating tick vertices
        value: undefined,
        numComponents: 1,
        type: "float"
    },
    height: {
        value: undefined,
        numComponents: 1,
        type: "float"
    }
});
const $e292975eb916f4bb$var$DEFAULT_MAX_SIZE = 100;
const $e292975eb916f4bb$var$DEFAULT_MIN_SIZE = 0;
const $e292975eb916f4bb$var$DEFAULT_MIN_OPACITY = 0;
const $e292975eb916f4bb$var$DEFAULT_MIN_WIDTH = 0;
const $e292975eb916f4bb$var$DEFAULT_MIN_HEIGHT = 0;
const $e292975eb916f4bb$var$DEFAULT_MAX_WIDTH = 1 / $jk5q7.SIZE_UNITS;
const $e292975eb916f4bb$var$DEFAULT_MAX_HEIGHT = 1 / $jk5q7.SIZE_UNITS;
const $e292975eb916f4bb$var$DEFAULT_COLOR_SCHEME = "interpolateBrBG";
// first value is undefined as categories are 1-indexed
const $e292975eb916f4bb$var$SHAPES = [
    undefined,
    "dot",
    "triangle",
    "circle",
    "diamond"
];
/**
 * Given a track, determine the WebGL draw mode for it
 *
 * @param {Object} track from specification
 * @returns WebGLDrawMode as a string
 */ const $e292975eb916f4bb$export$cec99640ca10fb96 = (track)=>{
    switch(track.mark){
        case "line":
            return "LINE_STRIP";
        case "tick":
        case "arc":
            return "LINES";
        case "point":
            if (track.shape && track.shape.value !== "dot") return "TRIANGLES";
            else return "POINTS";
        case "rect":
        case "area":
            return "TRIANGLES";
    }
};
class $e292975eb916f4bb$var$SpecificationProcessor {
    /**
   * Get the next track to process
   * @returns {@link Track}
   */ getNextTrack() {
        if (this.index >= this.tracks.length) return null;
        return this.tracks[this.index++];
    }
    /**
   * Process a specification by reading in the data, the channel information, and producing an
   * iterator like interface with getNextTrack to feed to a drawer.
   *
   * @param {Object} specification user defined specification
   * @param {Function} callback function to call after all the data has been loaded
   */ constructor(specification, callback){
        this.index = 0;
        this.specification = specification;
        if (typeof specification.defaultData === "string") // data is a url to get
        this.dataPromise = fetch(specification.defaultData).then((response)=>response.text()
        ).then((text)=>this.data = text.split("\n")
        );
        else if (specification.defaultData) {
            // default data is defined, assumed to be an object
            this.data = specification.defaultData;
            this.isInlineData = true;
        }
        this.tracks = specification.tracks.map((track)=>new $e292975eb916f4bb$var$Track(this, track)
        );
        const allPromises = this.tracks.map((track)=>track.dataPromise
        ).filter((p)=>p
        ); // Removes undefined
        if (this.dataPromise) allPromises.push(this.dataPromise);
        this.xScale = $bCvgp.getScaleForSpecification("x", specification);
        this.yScale = $bCvgp.getScaleForSpecification("y", specification);
        // When all tracks have acquired their data, call the callback
        // TODO: Allow tracks to be processed while waiting for others, need to keep in mind order
        Promise.all(allPromises).then(()=>callback(this)
        );
    }
}
class $e292975eb916f4bb$var$Track {
    /**
   * Read the headers from the first row of data and then build functions to map a data row
   * to a channel value for drawing. Ultimately a method due to clunky constructor.
   */ processHeadersAndMappers() {
        // Processing headers
        if (this.isInlineData) {
            this.headers = Object.keys(this.data);
            this.data.length = this.data[this.headers[0]].length; // assign length to data object for iteration
            this.index = 0;
        } else {
            this.headers = this.data[0].split(",");
            this.index = 1; // 1 to skip header
        }
        // Creating channel mappers
        this.channelMaps = new Map();
        Object.keys($e292975eb916f4bb$export$4c1e9b40560b342d).forEach((channel)=>{
            this.channelMaps.set(channel, this.buildMapperForChannel(channel));
        });
    }
    /**
   * Get the next data point from the track. Returns null when all points have been returned.
   * @returns A data point with the x and y coordinates and other attributes from the header
   */ getNextDataPoint() {
        if (this.index >= this.data.length) return null;
        const toReturn = {
            geometry: {
                coordinates: [],
                dimensions: []
            }
        };
        let splitted;
        if (this.isInlineData) splitted = this.headers.map((header)=>this.data[header][this.index]
        );
        else {
            const currRow = this.data[this.index];
            splitted = currRow.split(",");
        }
        this.index++;
        this.headers.forEach((header, index)=>{
            toReturn[header] = splitted[index];
        });
        const rawHeight = this.channelMaps.get("height")(splitted);
        const rawWidth = this.channelMaps.get("width")(splitted);
        const x = this.channelMaps.get("x")(splitted);
        const y = this.channelMaps.get("y")(splitted);
        toReturn.geometry.coordinates.push(x, y);
        toReturn.geometry.dimensions.push(rawWidth, rawHeight);
        return toReturn;
    }
    /**
   * Get the next mark from the track for the drawer to process. Returns null when all
   * marks have been returned.
   * @returns An object containing information used to draw a mark for a row of data.
   */ getNextMark() {
        // Getting the next mark cannot modify the data objects as other tracks may refer to
        // the same data
        if (this.index >= this.data.length) return null;
        const toReturn = {
        };
        let splitted;
        if (this.isInlineData) splitted = this.headers.map((header)=>this.data[header][this.index]
        );
        else {
            const currRow = this.data[this.index];
            splitted = currRow.split(",");
        }
        this.index++;
        this.channelMaps.forEach((mapper, channel)=>{
            toReturn[channel] = mapper(splitted);
        });
        return toReturn;
    }
    /**
   * Process a track from a specification by loading data and producing an iterator
   * like interface with getNextDataPoint or getNextMark.
   *
   * @param {Object} specification user defined visualization
   * @param {Object} track user defined track
   */ constructor(specification, track){
        $c4W55.default(this, /**
   * Builds a function which maps an attribute value to a channel value for use by the drawer.
   * The function will return a default if not present in the track, or a constant if
   * value is defined.
   *
   * @param {String} channel one of the channels listed in default channels
   * @returns the function
   */ "buildMapperForChannel", (channel)=>{
            if (channel in this.track) {
                const channelInfo = this.track[channel];
                if ("value" in channelInfo) {
                    if (channel === "color") channelInfo.value = $bCvgp.colorSpecifierToHex(channelInfo.value);
                    return ()=>channelInfo.value
                    ;
                } else {
                    const attributeIndex = this.headers.indexOf(channelInfo.attribute);
                    let attrMapper;
                    switch(channelInfo.type){
                        case "inline":
                            attrMapper = $e292975eb916f4bb$var$buildMapperForInlineChannel(channel, channelInfo);
                            break;
                        case "quantitative":
                            attrMapper = $e292975eb916f4bb$var$buildMapperForQuantitiveChannel(channel, channelInfo);
                            break;
                        case "categorical":
                            attrMapper = $e292975eb916f4bb$var$buildMapperForCategoricalChannel(channel, channelInfo);
                            break;
                        case "genomic":
                            const chrAttributeIndex = this.headers.indexOf(channelInfo.chrAttribute);
                            const geneAttributeIndex = this.headers.indexOf(channelInfo.geneAttribute);
                            attrMapper = $e292975eb916f4bb$var$buildMapperForGenomicChannel(channel, channelInfo);
                            return (row)=>attrMapper(row[chrAttributeIndex], row[geneAttributeIndex])
                            ;
                        case "genomicRange":
                            const genomicAttributeIndices = [
                                this.headers.indexOf(channelInfo.chrAttribute),
                                this.headers.indexOf(channelInfo.startAttribute),
                                this.headers.indexOf(channelInfo.endAttribute), 
                            ];
                            attrMapper = $e292975eb916f4bb$var$buildMapperForGenomicRangeChannel(channel, channelInfo);
                            return (row // Pass in values for the genomic attributes to mapper
                            )=>attrMapper(...genomicAttributeIndices.map((index)=>row[index]
                                ))
                            ;
                    }
                    return (row)=>attrMapper(row[attributeIndex])
                    ;
                }
            } else return ()=>$e292975eb916f4bb$export$4c1e9b40560b342d[channel].value
            ;
        });
        this.track = track;
        if (typeof track.data === "string") // Track has its own data to GET
        this.dataPromise = fetch(track.data).then((response)=>response.text()
        ).then((text)=>{
            this.data = text.split(/[\n\r]+/);
            this.processHeadersAndMappers();
            this.hasOwnData = true;
        });
        else if (track.data) {
            // Track has its own inline data
            this.data = track.data;
            this.isInlineData = true;
            this.processHeadersAndMappers();
            this.hasOwnData = true;
        } else if (specification.data) {
            // Track does not have its own data, but the specification has default data
            this.data = specification.data;
            this.isInlineData = specification.isInlineData;
            this.processHeadersAndMappers();
        } else if (specification.dataPromise) // Track does not have its own data, but the specification is GETting default data
        specification.dataPromise.then(()=>{
            this.data = specification.data;
            this.processHeadersAndMappers();
        });
        else console.error(`Could not find data (no defaultData in specification and no data specified for this track) for track ${track}.`);
    }
}
/**
 * Build a function which maps an attribute that is a channel value to a compatible value.
 *
 * @param {String} channel the name of the channel to build an inline mapper for
 * @param {Object} channelInfo the info of the channel from a track
 * @returns a function that maps attribute values to appropriate channel values.
 */ const $e292975eb916f4bb$var$buildMapperForInlineChannel = (channel, channelInfo)=>{
    switch(channel){
        case "width":
        case "height":
        case "size":
            return (dimension)=>parseFloat(dimension)
            ;
        case "color":
            return (color)=>$bCvgp.colorSpecifierToHex(color)
            ;
        default:
            console.info(`No special behavior for ${channel} as an inline attribute.`);
            return (inlineValue)=>inlineValue
            ;
    }
};
/**
 * Build a function which maps a numerical value for an attribute to a property of a mark
 * @param {*} channel the name of the quantitative channel to map
 * @param {*} channelInfo the object containing info for this channel from the specification
 * @returns a function that maps a data attribute value to a channel value
 */ const $e292975eb916f4bb$var$buildMapperForQuantitiveChannel = (channel, channelInfo)=>{
    switch(channel){
        case "x":
        case "y":
            // Map x and y to itself, but we need a function to do it
            return (coord)=>parseFloat(coord)
            ;
        case "opacity":
            return $bCvgp.scale(channelInfo.domain, [
                channelInfo.minOpacity || $e292975eb916f4bb$var$DEFAULT_MIN_OPACITY,
                1, 
            ]);
        case "size":
            return $bCvgp.scale(channelInfo.domain, [
                channelInfo.minSize || $e292975eb916f4bb$var$DEFAULT_MIN_SIZE,
                channelInfo.maxSize || $e292975eb916f4bb$var$DEFAULT_MAX_SIZE, 
            ]);
        case "color":
            const d3colorScale = !channelInfo.colorScheme || !(channelInfo.colorScheme in $976OM) ? $976OM[$e292975eb916f4bb$var$DEFAULT_COLOR_SCHEME] : $976OM[channelInfo.colorScheme];
            const zeroToOneScale = $bCvgp.scale(channelInfo.domain, [
                0,
                1
            ]);
            return (attrValue)=>$bCvgp.rgbStringToHex(d3colorScale(zeroToOneScale(attrValue)))
            ;
        case "width":
            return $bCvgp.scale(channelInfo.domain, [
                channelInfo.minWidth || $e292975eb916f4bb$var$DEFAULT_MIN_WIDTH,
                channelInfo.maxWidth || $e292975eb916f4bb$var$DEFAULT_MAX_WIDTH, 
            ]);
        case "height":
            return $bCvgp.scale(channelInfo.domain, [
                channelInfo.minHeight || $e292975eb916f4bb$var$DEFAULT_MIN_HEIGHT,
                channelInfo.maxHeight || $e292975eb916f4bb$var$DEFAULT_MAX_WIDTH, 
            ]);
        default:
            console.error(`${channel} is not a supported channel for quantitative attributes!`);
    }
};
/**
 * Build a function which maps a discrete (integers are possible) value for an attribute
 * to a property of a mark
 * @param {*} channel the name of the categorical channel to map
 * @param {*} channelInfo the object containing info for this channel from the specification
 * @returns a function that maps a data attribute value to a channel value
 */ const $e292975eb916f4bb$var$buildMapperForCategoricalChannel = (channel, channelInfo)=>{
    const categoryTracker = new Map();
    let channelScale;
    switch(channel){
        case "x":
        case "y":
            // +1 here to avoid setting x or y at a boundary that makes it not visible
            channelScale = $bCvgp.scale([
                1,
                channelInfo.cardinality + 1
            ], [
                -1,
                1
            ]);
            break;
        case "opacity":
            channelScale = $bCvgp.scale([
                1,
                channelInfo.cardinality
            ], [
                channelInfo.minOpacity || $e292975eb916f4bb$var$DEFAULT_MIN_OPACITY,
                1
            ]);
            break;
        case "size":
            channelScale = $bCvgp.scale([
                1,
                channelInfo.cardinality
            ], [
                channelInfo.minSize || $e292975eb916f4bb$var$DEFAULT_MIN_SIZE,
                channelInfo.maxSize || $e292975eb916f4bb$var$DEFAULT_MAX_SIZE, 
            ]);
            break;
        case "shape":
            channelScale = (categoryId)=>$e292975eb916f4bb$var$SHAPES[categoryId % $e292975eb916f4bb$var$SHAPES.length]
            ;
            break;
        case "color":
            let d3colorScale = !channelInfo.colorScheme || !(channelInfo.colorScheme in $976OM) ? $976OM[$e292975eb916f4bb$var$DEFAULT_COLOR_SCHEME] : $976OM[channelInfo.colorScheme];
            if (Array.isArray(d3colorScale)) {
                console.error("Currenty only interpolating color schemes are supported, using default");
                d3colorScale = $976OM[$e292975eb916f4bb$var$DEFAULT_COLOR_SCHEME];
            }
            const zeroToOneScale = $bCvgp.scale([
                1,
                channelInfo.cardinality
            ], [
                0,
                1
            ]);
            channelScale = (categoryId)=>$bCvgp.rgbStringToHex(d3colorScale(zeroToOneScale(categoryId)))
            ;
            break;
        case "width":
            channelScale = $bCvgp.scale([
                1,
                channelInfo.cardinality
            ], [
                channelInfo.minWidth || $e292975eb916f4bb$var$DEFAULT_MIN_WIDTH,
                channelInfo.maxWidth || $e292975eb916f4bb$var$DEFAULT_MAX_WIDTH, 
            ]);
            break;
        case "height":
            channelScale = $bCvgp.scale([
                1,
                channelInfo.cardinality
            ], [
                channelInfo.minHeight || $e292975eb916f4bb$var$DEFAULT_MIN_HEIGHT,
                channelInfo.maxHeight || $e292975eb916f4bb$var$DEFAULT_MAX_HEIGHT, 
            ]);
            break;
        default:
            console.error(`${channel} is not a supported channel for categorical attributes!`);
    }
    return (attrValue)=>{
        if (!categoryTracker.has(attrValue)) categoryTracker.set(attrValue, categoryTracker.size + 1);
        return channelScale(categoryTracker.get(attrValue));
    };
};
/**
 * Build a function which maps a genome chr, gene, to an object consumable by a GenomeScale
 * @param {*} channel either x or y
 * @param {*} channelInfo the object containing info for this channel from the specification
 * @returns a function that maps (genomeChr, geneLoc) -> [chrId, geneLocation]
 *  ex: ["X", 200]
 */ const $e292975eb916f4bb$var$buildMapperForGenomicChannel = (channel, channelInfo)=>{
    switch(channel){
        case "x":
        case "y":
            return (chr, gene)=>{
                let chrId = chr.startsWith("chr") ? chr.substring(3) : chr.toString();
                return [
                    chrId,
                    parseInt(gene)
                ];
            };
        default:
            console.error(`${channel} is not a supported channel for genomic attributes!`);
    }
};
/**
 * Build a function which maps a genome chr, start, and end to an object consumable by a scale
 * @param {*} channel either x or y, width or height may be included if doing arc marks
 * @param {*} channelInfo the object containing info for this channel from the specification
 * @returns a function that maps (genomeChr, genomeStart, genomeEnd) -> an object containing mark metadata for position
 *  format: [chrId, geneLocation, chrId2, geneLocation2]
 *  ex: ["1", 1000, "X", 2000]
 */ const $e292975eb916f4bb$var$buildMapperForGenomicRangeChannel = (channel, channelInfo)=>{
    switch(channel){
        case "width":
        case "height":
        case "x":
        case "y":
            return (chr, genomeStart, genomeEnd)=>{
                let chrId = chr.startsWith("chr") ? chr.substring(3) : chr.toString();
                return [
                    [
                        chrId,
                        parseInt(genomeStart)
                    ],
                    [
                        chrId,
                        parseInt(genomeEnd)
                    ], 
                ];
            };
        default:
            console.error(`${channel} is not a supported channel for genomic attributes!`);
    }
};
var $e292975eb916f4bb$export$2e2bcd8739ae039 = $e292975eb916f4bb$var$SpecificationProcessor;

});
parcelRequire.register("8Xkng", function(module, exports) {

$parcel$export(module.exports, "defineProperty", () => (parcelRequire("c4W55")).default);

























var $c4W55 = parcelRequire("c4W55");










































});
parcelRequire.register("c4W55", function(module, exports) {

$parcel$export(module.exports, "default", () => $8cb2e973f793d6d4$export$2e2bcd8739ae039);
function $8cb2e973f793d6d4$export$2e2bcd8739ae039(obj, key, value) {
    if (key in obj) Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
    });
    else obj[key] = value;
    return obj;
}

});


parcelRequire.register("bCvgp", function(module, exports) {

$parcel$export(module.exports, "scale", () => $875b7ea5698b7c47$export$dcdf75081b88279d);
$parcel$export(module.exports, "rgbStringToHex", () => $875b7ea5698b7c47$export$45a9a8711a00aca8);
$parcel$export(module.exports, "colorSpecifierToHex", () => $875b7ea5698b7c47$export$90fc4f3dd3e4be0b);
$parcel$export(module.exports, "getViewportForSpecification", () => $875b7ea5698b7c47$export$9e48347377e521b0);
$parcel$export(module.exports, "getScaleForSpecification", () => $875b7ea5698b7c47$export$503bd171b936d0c1);
$parcel$export(module.exports, "getQuadraticBezierCurveForPoints", () => $875b7ea5698b7c47$export$aadc4f8a9a598f38);

var $8MuD8 = parcelRequire("8MuD8");

var $bYF7U = parcelRequire("bYF7U");
/**
 * Returns a linear scale to map elements in domain to elements in range.
 * @param {Array} domain array of length two containing minimum and maximum values
 * @param {Array} range array of length two containing minimum and maximum values
 * @returns linear scale mapping domain to range
 */ function $875b7ea5698b7c47$export$dcdf75081b88279d(domain, range) {
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
 */ function $875b7ea5698b7c47$export$34d09c4a771c46ef(red, green, blue) {
    return red << 16 | green << 8 | blue << 0;
}
function $875b7ea5698b7c47$export$45a9a8711a00aca8(rgb) {
    const colorVals = rgb.substring(4, rgb.length - 1).split(",");
    return $875b7ea5698b7c47$export$34d09c4a771c46ef(...colorVals.map((asStr)=>parseInt(asStr)
    ));
}
function $875b7ea5698b7c47$export$90fc4f3dd3e4be0b(specifier) {
    if (!isNaN(specifier)) // Specifier is already a hex value
    return Math.floor(specifier);
    const asColor = $bYF7U.default(specifier);
    return $875b7ea5698b7c47$export$34d09c4a771c46ef(asColor.r, asColor.g, asColor.b);
}
/**
 * Get the VIEWPORT of the specification to be used by the mouseReader.
 * If all types for a dimension across tracks are categorical or genomic,
 * will default to [-1, 1] for that dimension for the mouseReader. If X or Y
 * has a fixed value, it will consider the width or height channel domains.
 *
 * @param {Object} specification of visualization
 * @returns [smallestX, largestX, smallestY, largestY] of viewport
 */ function $875b7ea5698b7c47$export$9e48347377e521b0(specification) {
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
 */ const $875b7ea5698b7c47$export$503bd171b936d0c1 = (dimension, specification)=>{
    if (dimension !== "x" && dimension !== "y") console.error(`${dimension} is not x or y!`);
    let genomic = false;
    let genome;
    for (const track of specification.tracks)if (track[dimension].type && track[dimension].type.includes("genomic")) {
        genome = track[dimension].genome;
        genomic = true;
        break;
    }
    if (!genomic) {
        const viewport = $875b7ea5698b7c47$export$9e48347377e521b0(specification);
        if (dimension === "x") return $875b7ea5698b7c47$export$dcdf75081b88279d([
            viewport[0],
            viewport[1]
        ], [
            -1,
            1
        ]);
        return $875b7ea5698b7c47$export$dcdf75081b88279d([
            viewport[2],
            viewport[3]
        ], [
            -1,
            1
        ]);
    }
    const geneScale = $8MuD8.GenomeScale.completeScale(genome);
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
    const asScale = new $8MuD8.GenomeScale(genome, [
        smallestGene,
        largestGene
    ]);
    return asScale.toCallable();
};
const $875b7ea5698b7c47$var$RELATIVE_LENGTH_UNITS = [
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
const $875b7ea5698b7c47$var$getPixelMeasurement = (cssMeasurement)=>{
    if ($875b7ea5698b7c47$var$RELATIVE_LENGTH_UNITS.some((unit)=>cssMeasurement.includes(unit)
    )) return false;
    const asFloat = parseFloat(cssMeasurement);
    return isNaN(asFloat) ? false : asFloat;
};
const $875b7ea5698b7c47$var$DEFAULT_MARGIN = "50px";
const $875b7ea5698b7c47$export$aa4eace044cdfdbf = "100%";
const $875b7ea5698b7c47$export$611c894df53833b0 = $875b7ea5698b7c47$export$aa4eace044cdfdbf;
const $875b7ea5698b7c47$export$9c7342f1c4b9b83 = (specification)=>{
    let toReturn = {
    };
    const calculatedMargins = {
    };
    if (specification.margins === undefined) {
        toReturn.margin = $875b7ea5698b7c47$var$DEFAULT_MARGIN;
        calculatedMargins.top = $875b7ea5698b7c47$var$DEFAULT_MARGIN;
        calculatedMargins.right = $875b7ea5698b7c47$var$DEFAULT_MARGIN;
        calculatedMargins.bottom = $875b7ea5698b7c47$var$DEFAULT_MARGIN;
        calculatedMargins.left = $875b7ea5698b7c47$var$DEFAULT_MARGIN;
    } else {
        calculatedMargins.top = specification.margins.top === undefined ? $875b7ea5698b7c47$var$DEFAULT_MARGIN : specification.margins.top;
        calculatedMargins.right = specification.margins.right === undefined ? $875b7ea5698b7c47$var$DEFAULT_MARGIN : specification.margins.right;
        calculatedMargins.bottom = specification.margins.bottom === undefined ? $875b7ea5698b7c47$var$DEFAULT_MARGIN : specification.margins.bottom;
        calculatedMargins.left = specification.margins.left === undefined ? $875b7ea5698b7c47$var$DEFAULT_MARGIN : specification.margins.left;
        // Shorthand for top right bottom left
        toReturn.margin = `${calculatedMargins.top}
                       ${calculatedMargins.right}
                       ${calculatedMargins.bottom}
                       ${calculatedMargins.left}`;
    }
    const calculatedWidth = specification.width || $875b7ea5698b7c47$export$aa4eace044cdfdbf;
    const calculatedHeight = specification.height || $875b7ea5698b7c47$export$611c894df53833b0;
    const allMeasurements = [
        calculatedMargins.top,
        calculatedMargins.right,
        calculatedMargins.bottom,
        calculatedMargins.left,
        calculatedWidth,
        calculatedHeight, 
    ];
    if (allMeasurements.every($875b7ea5698b7c47$var$getPixelMeasurement)) {
        // Let's encode as a number to allow users using typescript or doing weird DOM things able to define
        // the width and height explicitly
        toReturn.width = $875b7ea5698b7c47$var$getPixelMeasurement(calculatedWidth) - $875b7ea5698b7c47$var$getPixelMeasurement(calculatedMargins.left) - $875b7ea5698b7c47$var$getPixelMeasurement(calculatedMargins.right);
        toReturn.height = $875b7ea5698b7c47$var$getPixelMeasurement(calculatedHeight) - $875b7ea5698b7c47$var$getPixelMeasurement(calculatedMargins.bottom) - $875b7ea5698b7c47$var$getPixelMeasurement(calculatedMargins.top);
    } else {
        // If user is using css units in their margins and dimensions, then use css calc
        toReturn.width = `calc(
      ${calculatedWidth} - 
      ${calculatedMargins.left} - 
      ${calculatedMargins.right}
    )`;
        toReturn.height = `calc(
      ${calculatedHeight} - 
      ${calculatedMargins.top} - 
      ${calculatedMargins.bottom}
    )`;
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
 */ const $875b7ea5698b7c47$export$aadc4f8a9a598f38 = (P0, P1, P2)=>{
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

});
parcelRequire.register("8MuD8", function(module, exports) {

$parcel$export(module.exports, "GenomeScale", () => $664a90f639f7297c$export$5af770a1c066da73);

var $bCvgp = parcelRequire("bCvgp");

var $1zT1k = parcelRequire("1zT1k");
var $kdp3u = parcelRequire("kdp3u");
/**
 * Create a function which maps a genome pair to a location in the entire genome
 *
 * @param {String} genomeId key from genomeSizes object
 * @returns a function which maps a (chrId, pairNum) => to
 *  a number between 1 and total number of genes in the genome
 */ const $664a90f639f7297c$var$createPairMapperToGenome = (genomeId)=>{
    let chrSizes = $664a90f639f7297c$export$980dd6874c34d524[genomeId];
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
class $664a90f639f7297c$export$5af770a1c066da73 {
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
        for (const [chrKey, pairCount] of $664a90f639f7297c$export$980dd6874c34d524[this.genomeId].entries()){
            if (cumulativeTotal + pairCount >= genomeSpot) {
                chrLoc = genomeSpot - cumulativeTotal;
                chrId = chrKey;
                break;
            }
            cumulativeTotal += pairCount;
        }
        return formatting ? `chr${chrId}:${$1zT1k.format(formatting)(chrLoc)}` : `chr${chrId}:${chrLoc}`;
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
        let [startChr, startPair] = this.inverse(start).substring(3).split(":");
        let [endChr, endPair] = this.inverse(end).substring(3).split(":");
        const toReturn = [];
        let suggestedFormat;
        if (startChr === endChr) {
            let difference = endPair - startPair;
            let magnitude = Math.floor(Math.log10(difference));
            let startingValue = startPair - startPair % 10 ** magnitude;
            suggestedFormat = $kdp3u.default(10 ** magnitude, startingValue);
            for(let currValue = startingValue; currValue < endPair; currValue += 10 ** magnitude)toReturn.push(this.toClipSpaceFromParts(startChr, currValue));
        } else {
            suggestedFormat = "1";
            for (const chrId of $664a90f639f7297c$export$980dd6874c34d524[this.genomeId].keys())toReturn.push(this.toClipSpaceFromParts(chrId, 1));
        }
        return {
            tickCoords: toReturn,
            tickLabels: toReturn.map((coord)=>this.inverse(coord, $1zT1k.format(`.${suggestedFormat}s`))
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
        const chrSizes = $664a90f639f7297c$export$980dd6874c34d524[genomeId];
        const finalEntry = [
            ...chrSizes.entries()
        ][chrSizes.size - 1];
        return new $664a90f639f7297c$export$5af770a1c066da73(genomeId, [
            "chr1:1",
            `chr${finalEntry[0]}:${finalEntry[1]}`, 
        ]);
    }
    /**
   * A scale used to map a genome pair to a location between -1 and 1 for data visualization.
   * Also contains inverse and utility functions for getting labels for axis.
   *
   * @param {String} genomeId key from genomeSizes object
   * @param {Array} domain array of length 2 containing the start and end of the genome
   *   for the scale. ex: ["chr2:1000", "chr3:2000"]
   */ constructor(genomeId, domain){
        if ($664a90f639f7297c$export$980dd6874c34d524[genomeId] === undefined) console.error(`${genomeId} is not a recognized genome!`);
        this.genomeId = genomeId;
        this.domain = domain;
        let [startChr, startPair] = domain[0].substring(3) // Remove chr
        .split(":"); // split chromesome and pair number
        startPair = parseInt(startPair);
        let [endChr, endPair] = domain[1].substring(3).split(":");
        endPair = parseInt(endPair);
        this.mapPairToGenomeIndex = $664a90f639f7297c$var$createPairMapperToGenome(genomeId);
        const firstPairInDomain = this.mapPairToGenomeIndex(startChr, startPair);
        const lastPairInDomain = this.mapPairToGenomeIndex(endChr, endPair);
        this.mapGenomeIndexToClipSpace = $bCvgp.scale([
            firstPairInDomain,
            lastPairInDomain
        ], [
            -1,
            1
        ]);
        this.mapGenomeIndexToClipSpaceInverse = $bCvgp.scale([
            -1,
            1
        ], [
            firstPairInDomain,
            lastPairInDomain
        ]);
    }
}
/**
 * Available genomes to visualize. Each genome is a map from chromosome id to number of genes in chromosome.
 * Order matters as maps remember insertion order.
 */ const $664a90f639f7297c$export$980dd6874c34d524 = {
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

});
parcelRequire.register("1zT1k", function(module, exports) {

$parcel$export(module.exports, "format", () => $1263bd3f21439e0c$export$d9468344d3651243);

var $kEXQq = parcelRequire("kEXQq");
var $1263bd3f21439e0c$var$locale;
var $1263bd3f21439e0c$export$d9468344d3651243;
var $1263bd3f21439e0c$export$8d85692a469dde6f;
$1263bd3f21439e0c$export$2e2bcd8739ae039({
    thousands: ",",
    grouping: [
        3
    ],
    currency: [
        "$",
        ""
    ]
});
function $1263bd3f21439e0c$export$2e2bcd8739ae039(definition) {
    $1263bd3f21439e0c$var$locale = $kEXQq.default(definition);
    $1263bd3f21439e0c$export$d9468344d3651243 = $1263bd3f21439e0c$var$locale.format;
    $1263bd3f21439e0c$export$8d85692a469dde6f = $1263bd3f21439e0c$var$locale.formatPrefix;
    return $1263bd3f21439e0c$var$locale;
}

});
parcelRequire.register("kEXQq", function(module, exports) {

$parcel$export(module.exports, "default", () => $f0a5f6f06680b384$export$2e2bcd8739ae039);

var $i7K0n = parcelRequire("i7K0n");

var $5VOmc = parcelRequire("5VOmc");

var $fQoQO = parcelRequire("fQoQO");

var $eZy5w = parcelRequire("eZy5w");

var $g49Iv = parcelRequire("g49Iv");

var $9bGyI = parcelRequire("9bGyI");

var $4dRmq = parcelRequire("4dRmq");

var $hX2Bh = parcelRequire("hX2Bh");
var $f0a5f6f06680b384$var$map = Array.prototype.map, $f0a5f6f06680b384$var$prefixes = [
    "y",
    "z",
    "a",
    "f",
    "p",
    "n",
    "µ",
    "m",
    "",
    "k",
    "M",
    "G",
    "T",
    "P",
    "E",
    "Z",
    "Y"
];
function $f0a5f6f06680b384$export$2e2bcd8739ae039(locale) {
    var group = locale.grouping === undefined || locale.thousands === undefined ? $hX2Bh.default : $5VOmc.default($f0a5f6f06680b384$var$map.call(locale.grouping, Number), locale.thousands + ""), currencyPrefix = locale.currency === undefined ? "" : locale.currency[0] + "", currencySuffix = locale.currency === undefined ? "" : locale.currency[1] + "", decimal = locale.decimal === undefined ? "." : locale.decimal + "", numerals = locale.numerals === undefined ? $hX2Bh.default : $fQoQO.default($f0a5f6f06680b384$var$map.call(locale.numerals, String)), percent = locale.percent === undefined ? "%" : locale.percent + "", minus = locale.minus === undefined ? "−" : locale.minus + "", nan = locale.nan === undefined ? "NaN" : locale.nan + "";
    function newFormat(specifier) {
        specifier = $eZy5w.default(specifier);
        var fill = specifier.fill, align = specifier.align, sign = specifier.sign, symbol = specifier.symbol, zero = specifier.zero, width = specifier.width, comma = specifier.comma, precision = specifier.precision, trim = specifier.trim, type = specifier.type;
        // The "n" type is an alias for ",g".
        if (type === "n") comma = true, type = "g";
        else if (!$9bGyI.default[type]) precision === undefined && (precision = 12), trim = true, type = "g";
        // If zero fill is specified, padding goes after sign and before digits.
        if (zero || fill === "0" && align === "=") zero = true, fill = "0", align = "=";
        // Compute the prefix and suffix.
        // For SI-prefix, the suffix is lazily computed.
        var prefix = symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "", suffix = symbol === "$" ? currencySuffix : /[%p]/.test(type) ? percent : "";
        // What format function should we use?
        // Is this an integer type?
        // Can this type generate exponential notation?
        var formatType = $9bGyI.default[type], maybeSuffix = /[defgprs%]/.test(type);
        // Set the default precision if not specified,
        // or clamp the specified precision to the supported range.
        // For significant precision, it must be in [1, 21].
        // For fixed precision, it must be in [0, 20].
        precision = precision === undefined ? 6 : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision)) : Math.max(0, Math.min(20, precision));
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
                if (trim) value = $g49Iv.default(value);
                // If a negative value rounds to zero after formatting, and no explicit positive sign is requested, hide the sign.
                if (valueNegative && +value === 0 && sign !== "+") valueNegative = false;
                // Compute the prefix and suffix.
                valuePrefix = (valueNegative ? sign === "(" ? sign : minus : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
                valueSuffix = (type === "s" ? $f0a5f6f06680b384$var$prefixes[8 + $4dRmq.prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : "");
                // Break the formatted value into the integer “value” part that can be
                // grouped, and fractional or exponential “suffix” part that is not.
                if (maybeSuffix) {
                    i = -1, n = value.length;
                    while(++i < n)if (c = value.charCodeAt(i), 48 > c || c > 57) {
                        valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
                        value = value.slice(0, i);
                        break;
                    }
                }
            }
            // If the fill character is not "0", grouping is applied before padding.
            if (comma && !zero) value = group(value, Infinity);
            // Compute the padding.
            var length = valuePrefix.length + value.length + valueSuffix.length, padding = length < width ? new Array(width - length + 1).join(fill) : "";
            // If the fill character is "0", grouping is applied after padding.
            if (comma && zero) value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";
            // Reconstruct the final output based on the desired alignment.
            switch(align){
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
        format.toString = function() {
            return specifier + "";
        };
        return format;
    }
    function formatPrefix(specifier, value1) {
        var f = newFormat((specifier = $eZy5w.default(specifier), specifier.type = "f", specifier)), e = Math.max(-8, Math.min(8, Math.floor($i7K0n.default(value1) / 3))) * 3, k = Math.pow(10, -e), prefix = $f0a5f6f06680b384$var$prefixes[8 + e / 3];
        return function(value) {
            return f(k * value) + prefix;
        };
    }
    return {
        format: newFormat,
        formatPrefix: formatPrefix
    };
}

});
parcelRequire.register("i7K0n", function(module, exports) {

$parcel$export(module.exports, "default", () => $d31c91121e89b709$export$2e2bcd8739ae039);

var $iyMfh = parcelRequire("iyMfh");
function $d31c91121e89b709$export$2e2bcd8739ae039(x) {
    return x = $iyMfh.formatDecimalParts(Math.abs(x)), x ? x[1] : NaN;
}

});
parcelRequire.register("iyMfh", function(module, exports) {

$parcel$export(module.exports, "default", () => $d830d380998c680e$export$2e2bcd8739ae039);
$parcel$export(module.exports, "formatDecimalParts", () => $d830d380998c680e$export$8f8e23dd27dc19f5);
function $d830d380998c680e$export$2e2bcd8739ae039(x) {
    return Math.abs(x = Math.round(x)) >= 1000000000000000000000 ? x.toLocaleString("en").replace(/,/g, "") : x.toString(10);
}
function $d830d380998c680e$export$8f8e23dd27dc19f5(x, p) {
    if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null; // NaN, ±Infinity
    var i, coefficient = x.slice(0, i);
    // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
    // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).
    return [
        coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
        +x.slice(i + 1)
    ];
}

});


parcelRequire.register("5VOmc", function(module, exports) {

$parcel$export(module.exports, "default", () => $451956771329bdd4$export$2e2bcd8739ae039);
function $451956771329bdd4$export$2e2bcd8739ae039(grouping, thousands) {
    return function(value, width) {
        var i = value.length, t = [], j = 0, g = grouping[0], length = 0;
        while(i > 0 && g > 0){
            if (length + g + 1 > width) g = Math.max(1, width - length);
            t.push(value.substring(i -= g, i + g));
            if ((length += g + 1) > width) break;
            g = grouping[j = (j + 1) % grouping.length];
        }
        return t.reverse().join(thousands);
    };
}

});

parcelRequire.register("fQoQO", function(module, exports) {

$parcel$export(module.exports, "default", () => $b88efd32b33611aa$export$2e2bcd8739ae039);
function $b88efd32b33611aa$export$2e2bcd8739ae039(numerals) {
    return function(value) {
        return value.replace(/[0-9]/g, function(i) {
            return numerals[+i];
        });
    };
}

});

parcelRequire.register("eZy5w", function(module, exports) {

$parcel$export(module.exports, "default", () => $02d10d3b44bd6041$export$2e2bcd8739ae039);
// [[fill]align][sign][symbol][0][width][,][.precision][~][type]
var $02d10d3b44bd6041$var$re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function $02d10d3b44bd6041$export$2e2bcd8739ae039(specifier) {
    if (!(match = $02d10d3b44bd6041$var$re.exec(specifier))) throw new Error("invalid format: " + specifier);
    var match;
    return new $02d10d3b44bd6041$export$963aac351db36ed4({
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
$02d10d3b44bd6041$export$2e2bcd8739ae039.prototype = $02d10d3b44bd6041$export$963aac351db36ed4.prototype; // instanceof
function $02d10d3b44bd6041$export$963aac351db36ed4(specifier) {
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
$02d10d3b44bd6041$export$963aac351db36ed4.prototype.toString = function() {
    return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === undefined ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === undefined ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};

});

parcelRequire.register("g49Iv", function(module, exports) {

$parcel$export(module.exports, "default", () => $bb248e9d18555551$export$2e2bcd8739ae039);
function $bb248e9d18555551$export$2e2bcd8739ae039(s) {
    out: for(var n = s.length, i = 1, i0 = -1, i1; i < n; ++i)switch(s[i]){
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
    return i0 > 0 ? s.slice(0, i0) + s.slice(i1 + 1) : s;
}

});

parcelRequire.register("9bGyI", function(module, exports) {

$parcel$export(module.exports, "default", () => $6b062778483cc0dd$export$2e2bcd8739ae039);

var $iyMfh = parcelRequire("iyMfh");

var $4dRmq = parcelRequire("4dRmq");

var $1afpo = parcelRequire("1afpo");
var $6b062778483cc0dd$export$2e2bcd8739ae039 = {
    "%": (x, p)=>(x * 100).toFixed(p)
    ,
    "b": (x)=>Math.round(x).toString(2)
    ,
    "c": (x)=>x + ""
    ,
    "d": $iyMfh.default,
    "e": (x, p)=>x.toExponential(p)
    ,
    "f": (x, p)=>x.toFixed(p)
    ,
    "g": (x, p)=>x.toPrecision(p)
    ,
    "o": (x)=>Math.round(x).toString(8)
    ,
    "p": (x, p)=>$1afpo.default(x * 100, p)
    ,
    "r": $1afpo.default,
    "s": $4dRmq.default,
    "X": (x)=>Math.round(x).toString(16).toUpperCase()
    ,
    "x": (x)=>Math.round(x).toString(16)
};

});
parcelRequire.register("4dRmq", function(module, exports) {

$parcel$export(module.exports, "prefixExponent", () => $3131c4a051372c9c$export$6863724d9a42263);
$parcel$export(module.exports, "default", () => $3131c4a051372c9c$export$2e2bcd8739ae039);

var $iyMfh = parcelRequire("iyMfh");
var $3131c4a051372c9c$export$6863724d9a42263;
function $3131c4a051372c9c$export$2e2bcd8739ae039(x, p) {
    var d = $iyMfh.formatDecimalParts(x, p);
    if (!d) return x + "";
    var coefficient = d[0], exponent = d[1], i = exponent - ($3131c4a051372c9c$export$6863724d9a42263 = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1, n = coefficient.length;
    return i === n ? coefficient : i > n ? coefficient + new Array(i - n + 1).join("0") : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i) : "0." + new Array(1 - i).join("0") + $iyMfh.formatDecimalParts(x, Math.max(0, p + i - 1))[0]; // less than 1y!
}

});

parcelRequire.register("1afpo", function(module, exports) {

$parcel$export(module.exports, "default", () => $0d92ad6be2f2d27e$export$2e2bcd8739ae039);

var $iyMfh = parcelRequire("iyMfh");
function $0d92ad6be2f2d27e$export$2e2bcd8739ae039(x, p) {
    var d = $iyMfh.formatDecimalParts(x, p);
    if (!d) return x + "";
    var coefficient = d[0], exponent = d[1];
    return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1) : coefficient + new Array(exponent - coefficient.length + 2).join("0");
}

});


parcelRequire.register("hX2Bh", function(module, exports) {

$parcel$export(module.exports, "default", () => $d119f6b25d5f33a4$export$2e2bcd8739ae039);
function $d119f6b25d5f33a4$export$2e2bcd8739ae039(x) {
    return x;
}

});



parcelRequire.register("kdp3u", function(module, exports) {

$parcel$export(module.exports, "default", () => $eb787505ef32f799$export$2e2bcd8739ae039);

var $i7K0n = parcelRequire("i7K0n");
function $eb787505ef32f799$export$2e2bcd8739ae039(step, max) {
    step = Math.abs(step), max = Math.abs(max) - step;
    return Math.max(0, $i7K0n.default(max) - $i7K0n.default(step)) + 1;
}

});



parcelRequire.register("bYF7U", function(module, exports) {

$parcel$export(module.exports, "Color", () => $8b85332d441ab502$export$892596cec99bc70e);
$parcel$export(module.exports, "darker", () => $8b85332d441ab502$export$4adafc6ed0600c10);
$parcel$export(module.exports, "brighter", () => $8b85332d441ab502$export$9eace2cc0d12c98d);
$parcel$export(module.exports, "default", () => $8b85332d441ab502$export$2e2bcd8739ae039);
$parcel$export(module.exports, "Rgb", () => $8b85332d441ab502$export$5e05a94393ac29e3);
$parcel$export(module.exports, "rgbConvert", () => $8b85332d441ab502$export$42da0a331c2802f5);
$parcel$export(module.exports, "rgb", () => $8b85332d441ab502$export$8972dc0e6ad9238f);

var $gSQLt = parcelRequire("gSQLt");
function $8b85332d441ab502$export$892596cec99bc70e() {
}
var $8b85332d441ab502$export$4adafc6ed0600c10 = 0.7;
var $8b85332d441ab502$export$9eace2cc0d12c98d = 1 / $8b85332d441ab502$export$4adafc6ed0600c10;
var $8b85332d441ab502$var$reI = "\\s*([+-]?\\d+)\\s*", $8b85332d441ab502$var$reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*", $8b85332d441ab502$var$reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*", $8b85332d441ab502$var$reHex = /^#([0-9a-f]{3,8})$/, $8b85332d441ab502$var$reRgbInteger = new RegExp("^rgb\\(" + [
    $8b85332d441ab502$var$reI,
    $8b85332d441ab502$var$reI,
    $8b85332d441ab502$var$reI
] + "\\)$"), $8b85332d441ab502$var$reRgbPercent = new RegExp("^rgb\\(" + [
    $8b85332d441ab502$var$reP,
    $8b85332d441ab502$var$reP,
    $8b85332d441ab502$var$reP
] + "\\)$"), $8b85332d441ab502$var$reRgbaInteger = new RegExp("^rgba\\(" + [
    $8b85332d441ab502$var$reI,
    $8b85332d441ab502$var$reI,
    $8b85332d441ab502$var$reI,
    $8b85332d441ab502$var$reN
] + "\\)$"), $8b85332d441ab502$var$reRgbaPercent = new RegExp("^rgba\\(" + [
    $8b85332d441ab502$var$reP,
    $8b85332d441ab502$var$reP,
    $8b85332d441ab502$var$reP,
    $8b85332d441ab502$var$reN
] + "\\)$"), $8b85332d441ab502$var$reHslPercent = new RegExp("^hsl\\(" + [
    $8b85332d441ab502$var$reN,
    $8b85332d441ab502$var$reP,
    $8b85332d441ab502$var$reP
] + "\\)$"), $8b85332d441ab502$var$reHslaPercent = new RegExp("^hsla\\(" + [
    $8b85332d441ab502$var$reN,
    $8b85332d441ab502$var$reP,
    $8b85332d441ab502$var$reP,
    $8b85332d441ab502$var$reN
] + "\\)$");
var $8b85332d441ab502$var$named = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074
};
$gSQLt.default($8b85332d441ab502$export$892596cec99bc70e, $8b85332d441ab502$export$2e2bcd8739ae039, {
    copy: function(channels) {
        return Object.assign(new this.constructor, this, channels);
    },
    displayable: function() {
        return this.rgb().displayable();
    },
    hex: $8b85332d441ab502$var$color_formatHex,
    formatHex: $8b85332d441ab502$var$color_formatHex,
    formatHsl: $8b85332d441ab502$var$color_formatHsl,
    formatRgb: $8b85332d441ab502$var$color_formatRgb,
    toString: $8b85332d441ab502$var$color_formatRgb
});
function $8b85332d441ab502$var$color_formatHex() {
    return this.rgb().formatHex();
}
function $8b85332d441ab502$var$color_formatHsl() {
    return $8b85332d441ab502$export$8133dc3fa904d6d1(this).formatHsl();
}
function $8b85332d441ab502$var$color_formatRgb() {
    return this.rgb().formatRgb();
}
function $8b85332d441ab502$export$2e2bcd8739ae039(format) {
    var m, l;
    format = (format + "").trim().toLowerCase();
    return (m = $8b85332d441ab502$var$reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? $8b85332d441ab502$var$rgbn(m) // #ff0000
     : l === 3 ? new $8b85332d441ab502$export$5e05a94393ac29e3(m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, (m & 15) << 4 | m & 15, 1) // #f00
     : l === 8 ? $8b85332d441ab502$var$rgba(m >> 24 & 255, m >> 16 & 255, m >> 8 & 255, (m & 255) / 255) // #ff000000
     : l === 4 ? $8b85332d441ab502$var$rgba(m >> 12 & 15 | m >> 8 & 240, m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, ((m & 15) << 4 | m & 15) / 255) // #f000
     : null) : (m = $8b85332d441ab502$var$reRgbInteger.exec(format)) ? new $8b85332d441ab502$export$5e05a94393ac29e3(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
     : (m = $8b85332d441ab502$var$reRgbPercent.exec(format)) ? new $8b85332d441ab502$export$5e05a94393ac29e3(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
     : (m = $8b85332d441ab502$var$reRgbaInteger.exec(format)) ? $8b85332d441ab502$var$rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
     : (m = $8b85332d441ab502$var$reRgbaPercent.exec(format)) ? $8b85332d441ab502$var$rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
     : (m = $8b85332d441ab502$var$reHslPercent.exec(format)) ? $8b85332d441ab502$var$hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
     : (m = $8b85332d441ab502$var$reHslaPercent.exec(format)) ? $8b85332d441ab502$var$hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
     : $8b85332d441ab502$var$named.hasOwnProperty(format) ? $8b85332d441ab502$var$rgbn($8b85332d441ab502$var$named[format]) // eslint-disable-line no-prototype-builtins
     : format === "transparent" ? new $8b85332d441ab502$export$5e05a94393ac29e3(NaN, NaN, NaN, 0) : null;
}
function $8b85332d441ab502$var$rgbn(n) {
    return new $8b85332d441ab502$export$5e05a94393ac29e3(n >> 16 & 255, n >> 8 & 255, n & 255, 1);
}
function $8b85332d441ab502$var$rgba(r, g, b, a) {
    if (a <= 0) r = g = b = NaN;
    return new $8b85332d441ab502$export$5e05a94393ac29e3(r, g, b, a);
}
function $8b85332d441ab502$export$42da0a331c2802f5(o) {
    if (!(o instanceof $8b85332d441ab502$export$892596cec99bc70e)) o = $8b85332d441ab502$export$2e2bcd8739ae039(o);
    if (!o) return new $8b85332d441ab502$export$5e05a94393ac29e3;
    o = o.rgb();
    return new $8b85332d441ab502$export$5e05a94393ac29e3(o.r, o.g, o.b, o.opacity);
}
function $8b85332d441ab502$export$8972dc0e6ad9238f(r, g, b, opacity) {
    return arguments.length === 1 ? $8b85332d441ab502$export$42da0a331c2802f5(r) : new $8b85332d441ab502$export$5e05a94393ac29e3(r, g, b, opacity == null ? 1 : opacity);
}
function $8b85332d441ab502$export$5e05a94393ac29e3(r, g, b, opacity) {
    this.r = +r;
    this.g = +g;
    this.b = +b;
    this.opacity = +opacity;
}
$gSQLt.default($8b85332d441ab502$export$5e05a94393ac29e3, $8b85332d441ab502$export$8972dc0e6ad9238f, $gSQLt.extend($8b85332d441ab502$export$892596cec99bc70e, {
    brighter: function(k) {
        k = k == null ? $8b85332d441ab502$export$9eace2cc0d12c98d : Math.pow($8b85332d441ab502$export$9eace2cc0d12c98d, k);
        return new $8b85332d441ab502$export$5e05a94393ac29e3(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    darker: function(k) {
        k = k == null ? $8b85332d441ab502$export$4adafc6ed0600c10 : Math.pow($8b85332d441ab502$export$4adafc6ed0600c10, k);
        return new $8b85332d441ab502$export$5e05a94393ac29e3(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    rgb: function() {
        return this;
    },
    displayable: function() {
        return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
    },
    hex: $8b85332d441ab502$var$rgb_formatHex,
    formatHex: $8b85332d441ab502$var$rgb_formatHex,
    formatRgb: $8b85332d441ab502$var$rgb_formatRgb,
    toString: $8b85332d441ab502$var$rgb_formatRgb
}));
function $8b85332d441ab502$var$rgb_formatHex() {
    return "#" + $8b85332d441ab502$var$hex(this.r) + $8b85332d441ab502$var$hex(this.g) + $8b85332d441ab502$var$hex(this.b);
}
function $8b85332d441ab502$var$rgb_formatRgb() {
    var a = this.opacity;
    a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
    return (a === 1 ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (a === 1 ? ")" : ", " + a + ")");
}
function $8b85332d441ab502$var$hex(value) {
    value = Math.max(0, Math.min(255, Math.round(value) || 0));
    return (value < 16 ? "0" : "") + value.toString(16);
}
function $8b85332d441ab502$var$hsla(h, s, l, a) {
    if (a <= 0) h = s = l = NaN;
    else if (l <= 0 || l >= 1) h = s = NaN;
    else if (s <= 0) h = NaN;
    return new $8b85332d441ab502$var$Hsl(h, s, l, a);
}
function $8b85332d441ab502$export$8133dc3fa904d6d1(o) {
    if (o instanceof $8b85332d441ab502$var$Hsl) return new $8b85332d441ab502$var$Hsl(o.h, o.s, o.l, o.opacity);
    if (!(o instanceof $8b85332d441ab502$export$892596cec99bc70e)) o = $8b85332d441ab502$export$2e2bcd8739ae039(o);
    if (!o) return new $8b85332d441ab502$var$Hsl;
    if (o instanceof $8b85332d441ab502$var$Hsl) return o;
    o = o.rgb();
    var r = o.r / 255, g = o.g / 255, b = o.b / 255, min = Math.min(r, g, b), max = Math.max(r, g, b), h = NaN, s = max - min, l = (max + min) / 2;
    if (s) {
        if (r === max) h = (g - b) / s + (g < b) * 6;
        else if (g === max) h = (b - r) / s + 2;
        else h = (r - g) / s + 4;
        s /= l < 0.5 ? max + min : 2 - max - min;
        h *= 60;
    } else s = l > 0 && l < 1 ? 0 : h;
    return new $8b85332d441ab502$var$Hsl(h, s, l, o.opacity);
}
function $8b85332d441ab502$export$8f4a7c0bb78e6ea8(h, s, l, opacity) {
    return arguments.length === 1 ? $8b85332d441ab502$export$8133dc3fa904d6d1(h) : new $8b85332d441ab502$var$Hsl(h, s, l, opacity == null ? 1 : opacity);
}
function $8b85332d441ab502$var$Hsl(h, s, l, opacity) {
    this.h = +h;
    this.s = +s;
    this.l = +l;
    this.opacity = +opacity;
}
$gSQLt.default($8b85332d441ab502$var$Hsl, $8b85332d441ab502$export$8f4a7c0bb78e6ea8, $gSQLt.extend($8b85332d441ab502$export$892596cec99bc70e, {
    brighter: function(k) {
        k = k == null ? $8b85332d441ab502$export$9eace2cc0d12c98d : Math.pow($8b85332d441ab502$export$9eace2cc0d12c98d, k);
        return new $8b85332d441ab502$var$Hsl(this.h, this.s, this.l * k, this.opacity);
    },
    darker: function(k) {
        k = k == null ? $8b85332d441ab502$export$4adafc6ed0600c10 : Math.pow($8b85332d441ab502$export$4adafc6ed0600c10, k);
        return new $8b85332d441ab502$var$Hsl(this.h, this.s, this.l * k, this.opacity);
    },
    rgb: function() {
        var h = this.h % 360 + (this.h < 0) * 360, s = isNaN(h) || isNaN(this.s) ? 0 : this.s, l = this.l, m2 = l + (l < 0.5 ? l : 1 - l) * s, m1 = 2 * l - m2;
        return new $8b85332d441ab502$export$5e05a94393ac29e3($8b85332d441ab502$var$hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2), $8b85332d441ab502$var$hsl2rgb(h, m1, m2), $8b85332d441ab502$var$hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2), this.opacity);
    },
    displayable: function() {
        return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
    },
    formatHsl: function() {
        var a = this.opacity;
        a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
        return (a === 1 ? "hsl(" : "hsla(") + (this.h || 0) + ", " + (this.s || 0) * 100 + "%, " + (this.l || 0) * 100 + "%" + (a === 1 ? ")" : ", " + a + ")");
    }
}));
/* From FvD 13.37, CSS Color Module Level 3 */ function $8b85332d441ab502$var$hsl2rgb(h, m1, m2) {
    return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
}

});
parcelRequire.register("gSQLt", function(module, exports) {

$parcel$export(module.exports, "default", () => $c4aa9e76dcab196a$export$2e2bcd8739ae039);
$parcel$export(module.exports, "extend", () => $c4aa9e76dcab196a$export$8b58be045bf06082);
function $c4aa9e76dcab196a$export$2e2bcd8739ae039(constructor, factory, prototype) {
    constructor.prototype = factory.prototype = prototype;
    prototype.constructor = constructor;
}
function $c4aa9e76dcab196a$export$8b58be045bf06082(parent, definition) {
    var prototype = Object.create(parent.prototype);
    for(var key in definition)prototype[key] = definition[key];
    return prototype;
}

});


parcelRequire.register("22vTA", function(module, exports) {

$parcel$export(module.exports, "default", () => $17c48279b51c14fa$export$2e2bcd8739ae039);

var $gSQLt = parcelRequire("gSQLt");

var $bYF7U = parcelRequire("bYF7U");

var $jD7Hj = parcelRequire("jD7Hj");
var $17c48279b51c14fa$var$A = -0.14861, $17c48279b51c14fa$var$B = 1.78277, $17c48279b51c14fa$var$C = -0.29227, $17c48279b51c14fa$var$D = -0.90649, $17c48279b51c14fa$var$E = 1.97294, $17c48279b51c14fa$var$ED = $17c48279b51c14fa$var$E * $17c48279b51c14fa$var$D, $17c48279b51c14fa$var$EB = $17c48279b51c14fa$var$E * $17c48279b51c14fa$var$B, $17c48279b51c14fa$var$BC_DA = $17c48279b51c14fa$var$B * $17c48279b51c14fa$var$C - $17c48279b51c14fa$var$D * $17c48279b51c14fa$var$A;
function $17c48279b51c14fa$var$cubehelixConvert(o) {
    if (o instanceof $17c48279b51c14fa$export$57ed4bde61a1e2f2) return new $17c48279b51c14fa$export$57ed4bde61a1e2f2(o.h, o.s, o.l, o.opacity);
    if (!(o instanceof $bYF7U.Rgb)) o = $bYF7U.rgbConvert(o);
    var r = o.r / 255, g = o.g / 255, b = o.b / 255, l = ($17c48279b51c14fa$var$BC_DA * b + $17c48279b51c14fa$var$ED * r - $17c48279b51c14fa$var$EB * g) / ($17c48279b51c14fa$var$BC_DA + $17c48279b51c14fa$var$ED - $17c48279b51c14fa$var$EB), bl = b - l, k = ($17c48279b51c14fa$var$E * (g - l) - $17c48279b51c14fa$var$C * bl) / $17c48279b51c14fa$var$D, s = Math.sqrt(k * k + bl * bl) / ($17c48279b51c14fa$var$E * l * (1 - l)), h = s ? Math.atan2(k, bl) * $jD7Hj.degrees - 120 : NaN;
    return new $17c48279b51c14fa$export$57ed4bde61a1e2f2(h < 0 ? h + 360 : h, s, l, o.opacity);
}
function $17c48279b51c14fa$export$2e2bcd8739ae039(h, s, l, opacity) {
    return arguments.length === 1 ? $17c48279b51c14fa$var$cubehelixConvert(h) : new $17c48279b51c14fa$export$57ed4bde61a1e2f2(h, s, l, opacity == null ? 1 : opacity);
}
function $17c48279b51c14fa$export$57ed4bde61a1e2f2(h, s, l, opacity) {
    this.h = +h;
    this.s = +s;
    this.l = +l;
    this.opacity = +opacity;
}
$gSQLt.default($17c48279b51c14fa$export$57ed4bde61a1e2f2, $17c48279b51c14fa$export$2e2bcd8739ae039, $gSQLt.extend($bYF7U.Color, {
    brighter: function(k) {
        k = k == null ? $bYF7U.brighter : Math.pow($bYF7U.brighter, k);
        return new $17c48279b51c14fa$export$57ed4bde61a1e2f2(this.h, this.s, this.l * k, this.opacity);
    },
    darker: function(k) {
        k = k == null ? $bYF7U.darker : Math.pow($bYF7U.darker, k);
        return new $17c48279b51c14fa$export$57ed4bde61a1e2f2(this.h, this.s, this.l * k, this.opacity);
    },
    rgb: function() {
        var h = isNaN(this.h) ? 0 : (this.h + 120) * $jD7Hj.radians, l = +this.l, a = isNaN(this.s) ? 0 : this.s * l * (1 - l), cosh = Math.cos(h), sinh = Math.sin(h);
        return new $bYF7U.Rgb(255 * (l + a * ($17c48279b51c14fa$var$A * cosh + $17c48279b51c14fa$var$B * sinh)), 255 * (l + a * ($17c48279b51c14fa$var$C * cosh + $17c48279b51c14fa$var$D * sinh)), 255 * (l + a * ($17c48279b51c14fa$var$E * cosh)), this.opacity);
    }
}));

});
parcelRequire.register("jD7Hj", function(module, exports) {

$parcel$export(module.exports, "radians", () => $e4a7a16fa21b5597$export$8449e153fbd325fc);
$parcel$export(module.exports, "degrees", () => $e4a7a16fa21b5597$export$41fc368e1a942b97);
const $e4a7a16fa21b5597$export$8449e153fbd325fc = Math.PI / 180;
const $e4a7a16fa21b5597$export$41fc368e1a942b97 = 180 / Math.PI;

});




parcelRequire.register("jk5q7", function(module, exports) {

$parcel$export(module.exports, "SIZE_UNITS", () => $e11416eb2325ceb6$export$e41674f5c7739370);
$parcel$export(module.exports, "transformGenomicRangeToStandard", () => $e11416eb2325ceb6$export$ecd02037cfa7b597);
$parcel$export(module.exports, "transformGenomicRangeArcToStandard", () => $e11416eb2325ceb6$export$7c2fa887c0e33271);
$parcel$export(module.exports, "default", () => $e11416eb2325ceb6$export$2e2bcd8739ae039);
parcelRequire("8Xkng");
var $c4W55 = parcelRequire("c4W55");

var $js2wE = parcelRequire("js2wE");

var $bCvgp = parcelRequire("bCvgp");
// Each size unit refers to 1/200 of the clip space
// e.g. if the canvas is 1000x1000 pixels, and the size value for a mark
// is 10, then that mark takes up 10/200 = 1/20 of the clip space which
// is equal to 50 pixels
const $e11416eb2325ceb6$export$e41674f5c7739370 = 0.01;
const $e11416eb2325ceb6$var$NUMBER_OF_VERTICES_PER_ARC = 20;
const $e11416eb2325ceb6$var$ARC_HEIGHT_MODIFIER = 10;
/**
 * Get a curve representing the arc with given start and end points
 *
 * https://math.stackexchange.com/a/1484684
 *
 * @param {Array} P0 start of arc
 * @param {Array} P2 end of arc
 * @returns function mapping 0 to beginning of arc, and 1 to end of arc
 */ const $e11416eb2325ceb6$var$getCurveForArc = (P0, P2)=>{
    const midpoint = [
        P0[0] / 2 + P2[0] / 2,
        P0[1] / 2 + P2[1] / 2
    ];
    const slope = (P2[1] - P0[1]) / (P2[0] - P0[0]);
    const distance = Math.sqrt((P2[1] - P0[1]) ** 2 + (P2[0] - P0[0]) ** 2);
    if (!isFinite(slope)) // vertical slope
    return $bCvgp.getQuadraticBezierCurveForPoints(P0, [
        P0[0] - distance,
        midpoint[1]
    ], P2);
    const parameterized = (t)=>[
            midpoint[0] + t / distance * (P0[1] - P2[1]),
            midpoint[1] + t / distance * (P2[0] - P0[0]), 
        ]
    ;
    return $bCvgp.getQuadraticBezierCurveForPoints(P0, parameterized(distance * $e11416eb2325ceb6$var$ARC_HEIGHT_MODIFIER), P2);
};
/**
 * Transform a mark with a range for coordinates into a simpler mark to draw.
 *
 * @param {Object} mark that contains ranges for x or y
 * @returns mark with fixed x and y but with appropriate width and height for drawing
 */ const $e11416eb2325ceb6$export$ecd02037cfa7b597 = (mark, xScale, yScale)=>{
    let x, y, width, height;
    if (Array.isArray(mark.x)) {
        let x1 = xScale(mark.x[0]);
        x = mark.x[0];
        width = (xScale(mark.x[1]) - x1) / $e11416eb2325ceb6$export$e41674f5c7739370;
    } else {
        x = mark.x;
        width = mark.width;
    }
    if (Array.isArray(mark.y)) {
        let y1 = yScale(mark.y[0]);
        y = mark.y[0];
        height = (yScale(mark.y[1]) - y1) / $e11416eb2325ceb6$export$e41674f5c7739370;
    } else {
        y = mark.y;
        height = mark.height;
    }
    return {
        x: x,
        y: y,
        width: width,
        height: height
    };
};
/**
 * Transform a mark with a range for coordinates and a range for width or height into a simpler mark to draw.
 *
 * @param {Object} mark that contains ranges for x and y, and potentially ranges for width and height
 * @returns mark with fixed x, y, width, and height for drawing
 */ const $e11416eb2325ceb6$export$7c2fa887c0e33271 = (mark, xScale, yScale)=>{
    let x, y, width, height;
    if (Array.isArray(mark.x)) {
        x = xScale.getMidpoint(mark.x[0][0], mark.x[0][1], mark.x[1][0], mark.x[1][1]);
        let x2 = xScale.getMidpoint(mark.width[0][0], mark.width[0][1], mark.width[1][0], mark.width[1][1]);
        let x1ClipSpace = xScale(x);
        let x2ClipSpace = xScale(x2);
        x = x1ClipSpace < x2ClipSpace ? x : x2;
        width = Math.abs(xScale(x2) - x1ClipSpace) / $e11416eb2325ceb6$export$e41674f5c7739370;
    } else {
        x = mark.x;
        width = mark.width;
    }
    if (Array.isArray(mark.y)) {
        y = yScale.getMidpoint(mark.y[0][0], mark.y[0][1], mark.y[1][0], mark.y[1][1]);
        let y2 = yScale.getMidpoint(mark.height[0][0], mark.height[0][1], mark.height[1][0], mark.height[1][1]);
        let y1ClipSpace = xScale(y);
        let y2ClipSpace = xScale(y2);
        y = y1ClipSpace < y2ClipSpace ? y : y2;
        height = Math.abs(yScale(y2) - y1ClipSpace) / $e11416eb2325ceb6$export$e41674f5c7739370;
    } else {
        y = mark.y;
        height = mark.height;
    }
    return {
        x: x,
        y: y,
        width: width,
        height: height
    };
};
class $e11416eb2325ceb6$var$VertexCalculator {
    /**
   * Construct the vertices of a mark.
   *
   * @param {Object} mark to draw
   * @returns vertices of mark
   */ calculateForMark(mark) {
        if (this.track.x.type === "genomicRange" || this.track.y.type === "genomicRange") {
            if (this.track.mark === "arc") return this._calculateForMark($e11416eb2325ceb6$export$7c2fa887c0e33271(mark, this.xScale, this.yScale));
            return this._calculateForMark($e11416eb2325ceb6$export$ecd02037cfa7b597(mark, this.xScale, this.yScale));
        }
        return this._calculateForMark(mark);
    }
    _calculateForMark(mark) {
        if (this.track.mark === "area") {
            const toReturn = this._getVerticesForAreaSection(mark);
            this.lastMark = mark;
            return toReturn;
        }
        if (this.track.mark === "tick") return this._getVerticesForTick(mark);
        if (this.track.mark === "line") return this._getVertexForDot(mark);
        if (this.track.mark === "rect") return this._getVerticesForRect(mark);
        if (this.track.mark === "arc") return this._getVerticesForArc(mark);
        switch(mark.shape){
            case "dot":
                if (this.drawMode === "POINTS") return this._getVertexForDot(mark);
                else return this._getVerticesForSquare(mark);
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
            default:
                console.error(`${mark.shape} is not a valid shape!`);
        }
    }
    _mapToGPUSpace(vertices) {
        let isX = false;
        return vertices.map((coord)=>{
            isX = !isX;
            return isX ? this.xScale(coord) : this.yScale(coord);
        });
    }
    _getVerticesForArc(mark) {
        const startPoint = this._mapToGPUSpace([
            mark.x,
            mark.y
        ]);
        const quadraticCurve = $e11416eb2325ceb6$var$getCurveForArc(startPoint, [
            startPoint[0] + mark.width * $e11416eb2325ceb6$export$e41674f5c7739370,
            startPoint[1] + mark.height * $e11416eb2325ceb6$export$e41674f5c7739370, 
        ]);
        const vertices = [
            ...quadraticCurve(0),
            ...quadraticCurve(1 / $e11416eb2325ceb6$var$NUMBER_OF_VERTICES_PER_ARC), 
        ];
        for(let i = 2; i < $e11416eb2325ceb6$var$NUMBER_OF_VERTICES_PER_ARC + 1; i++){
            const nextPoint = quadraticCurve(i / $e11416eb2325ceb6$var$NUMBER_OF_VERTICES_PER_ARC);
            vertices.push(vertices[vertices.length - 2], vertices[vertices.length - 1], nextPoint[0], nextPoint[1]);
        }
        return vertices;
    }
    _getVerticesForAreaSection(mark) {
        if (!this.lastMark) return [];
        return this._mapToGPUSpace([
            mark.x,
            mark.y,
            this.lastMark.x,
            this.lastMark.y,
            mark.x,
            0,
            this.lastMark.x,
            this.lastMark.y,
            this.lastMark.x,
            0,
            mark.x,
            0, 
        ]);
    }
    _getVerticesForPolygon(mark, sides) {
        const center = this._mapToGPUSpace([
            mark.x,
            mark.y
        ]);
        const vertices = [];
        for(let theta = 0; theta < 2 * Math.PI; theta += 2 * Math.PI / sides)vertices.push(center[0], center[1], center[0] + mark.size / 2 * Math.cos(theta) * $e11416eb2325ceb6$export$e41674f5c7739370, center[1] + mark.size / 2 * Math.sin(theta) * $e11416eb2325ceb6$export$e41674f5c7739370, center[0] + mark.size / 2 * Math.cos(theta + 2 * Math.PI / sides) * $e11416eb2325ceb6$export$e41674f5c7739370, center[1] + mark.size / 2 * Math.sin(theta + 2 * Math.PI / sides) * $e11416eb2325ceb6$export$e41674f5c7739370);
        return vertices;
    }
    _getVerticesForTriangle(mark) {
        //     1
        //    / \
        //   2---3
        const center = this._mapToGPUSpace([
            mark.x,
            mark.y
        ]);
        return [
            center[0],
            center[1] + mark.size / 2 * $e11416eb2325ceb6$export$e41674f5c7739370,
            center[0] - mark.size / 2 * $e11416eb2325ceb6$export$e41674f5c7739370,
            center[1] - mark.size / 2 * $e11416eb2325ceb6$export$e41674f5c7739370,
            center[0] + mark.size / 2 * $e11416eb2325ceb6$export$e41674f5c7739370,
            center[1] - mark.size / 2 * $e11416eb2325ceb6$export$e41674f5c7739370, 
        ];
    }
    _getVerticesForSquare(mark) {
        const center = this._mapToGPUSpace([
            mark.x,
            mark.y
        ]);
        return [
            center[0] + mark.size / 2 * $e11416eb2325ceb6$export$e41674f5c7739370,
            center[1] + mark.size / 2 * $e11416eb2325ceb6$export$e41674f5c7739370,
            center[0] - mark.size / 2 * $e11416eb2325ceb6$export$e41674f5c7739370,
            center[1] + mark.size / 2 * $e11416eb2325ceb6$export$e41674f5c7739370,
            center[0] - mark.size / 2 * $e11416eb2325ceb6$export$e41674f5c7739370,
            center[1] - mark.size / 2 * $e11416eb2325ceb6$export$e41674f5c7739370,
            center[0] + mark.size / 2 * $e11416eb2325ceb6$export$e41674f5c7739370,
            center[1] + mark.size / 2 * $e11416eb2325ceb6$export$e41674f5c7739370,
            center[0] - mark.size / 2 * $e11416eb2325ceb6$export$e41674f5c7739370,
            center[1] - mark.size / 2 * $e11416eb2325ceb6$export$e41674f5c7739370,
            center[0] + mark.size / 2 * $e11416eb2325ceb6$export$e41674f5c7739370,
            center[1] - mark.size / 2 * $e11416eb2325ceb6$export$e41674f5c7739370, 
        ];
    }
    _getVerticesForRect(mark) {
        //  1-----------3,6
        //  |       /    |
        //  |     /      |
        // 2,5-----------4
        const center = this._mapToGPUSpace([
            mark.x,
            mark.y
        ]);
        return [
            center[0],
            center[1] + mark.height * $e11416eb2325ceb6$export$e41674f5c7739370,
            center[0],
            center[1],
            center[0] + mark.width * $e11416eb2325ceb6$export$e41674f5c7739370,
            center[1] + mark.height * $e11416eb2325ceb6$export$e41674f5c7739370,
            center[0] + mark.width * $e11416eb2325ceb6$export$e41674f5c7739370,
            center[1],
            center[0],
            center[1],
            center[0] + mark.width * $e11416eb2325ceb6$export$e41674f5c7739370,
            center[1] + mark.height * $e11416eb2325ceb6$export$e41674f5c7739370, 
        ];
    }
    _getVerticesForTick(mark) {
        const center = this._mapToGPUSpace([
            mark.x,
            mark.y
        ]);
        // 1----2
        if (this.track.width) return [
            center[0],
            center[1],
            center[0] + mark.width * $e11416eb2325ceb6$export$e41674f5c7739370,
            center[1], 
        ];
        // 1
        // |
        // 2
        if (mark.height) // default to mark value which has default if height never specified in track
        return [
            center[0],
            center[1],
            center[0],
            center[1] + mark.height * $e11416eb2325ceb6$export$e41674f5c7739370, 
        ];
    }
    /**
   * A class used to construct the vertices of marks that are given to the drawer to draw.
   *
   * @param {Function or GenomeScale} xScale maps the x values of the data to clip space [-1, 1]
   * @param {Function or GenomeScale} yScale maps the y values of the data to clip space [-1, 1]
   * @param {Object} track from specification
   */ constructor(xScale, yScale, track){
        $c4W55.default(this, "_getVertexForDot", (mark)=>this._mapToGPUSpace([
                mark.x,
                mark.y
            ])
        );
        this.xScale = xScale;
        this.yScale = yScale;
        this.track = track;
        this.drawMode = $js2wE.getDrawModeForTrack(track);
    }
}
var $e11416eb2325ceb6$export$2e2bcd8739ae039 = $e11416eb2325ceb6$var$VertexCalculator;

});

parcelRequire.register("976OM", function(module, exports) {

$parcel$export(module.exports, "schemeCategory10", () => (parcelRequire("hdL34")).default);
$parcel$export(module.exports, "schemeAccent", () => (parcelRequire("9ja2g")).default);
$parcel$export(module.exports, "schemeDark2", () => (parcelRequire("4NgtQ")).default);
$parcel$export(module.exports, "schemePaired", () => (parcelRequire("i3kfv")).default);
$parcel$export(module.exports, "schemePastel1", () => (parcelRequire("cLsMd")).default);
$parcel$export(module.exports, "schemePastel2", () => (parcelRequire("gtmHT")).default);
$parcel$export(module.exports, "schemeSet1", () => (parcelRequire("872Jl")).default);
$parcel$export(module.exports, "schemeSet2", () => (parcelRequire("e6bn0")).default);
$parcel$export(module.exports, "schemeSet3", () => (parcelRequire("4vxz2")).default);
$parcel$export(module.exports, "schemeTableau10", () => (parcelRequire("a442w")).default);
$parcel$export(module.exports, "interpolateBrBG", () => (parcelRequire("dG8Oq")).default);
$parcel$export(module.exports, "schemeBrBG", () => (parcelRequire("dG8Oq")).scheme);
$parcel$export(module.exports, "interpolatePRGn", () => (parcelRequire("d0gId")).default);
$parcel$export(module.exports, "schemePRGn", () => (parcelRequire("d0gId")).scheme);
$parcel$export(module.exports, "interpolatePiYG", () => (parcelRequire("c8zls")).default);
$parcel$export(module.exports, "schemePiYG", () => (parcelRequire("c8zls")).scheme);
$parcel$export(module.exports, "interpolatePuOr", () => (parcelRequire("jMliC")).default);
$parcel$export(module.exports, "schemePuOr", () => (parcelRequire("jMliC")).scheme);
$parcel$export(module.exports, "interpolateRdBu", () => (parcelRequire("b16F8")).default);
$parcel$export(module.exports, "schemeRdBu", () => (parcelRequire("b16F8")).scheme);
$parcel$export(module.exports, "interpolateRdGy", () => (parcelRequire("7xRtK")).default);
$parcel$export(module.exports, "schemeRdGy", () => (parcelRequire("7xRtK")).scheme);
$parcel$export(module.exports, "interpolateRdYlBu", () => (parcelRequire("c31WA")).default);
$parcel$export(module.exports, "schemeRdYlBu", () => (parcelRequire("c31WA")).scheme);
$parcel$export(module.exports, "interpolateRdYlGn", () => (parcelRequire("fGWCF")).default);
$parcel$export(module.exports, "schemeRdYlGn", () => (parcelRequire("fGWCF")).scheme);
$parcel$export(module.exports, "interpolateSpectral", () => (parcelRequire("87tci")).default);
$parcel$export(module.exports, "schemeSpectral", () => (parcelRequire("87tci")).scheme);
$parcel$export(module.exports, "interpolateBuGn", () => (parcelRequire("9pZ4Q")).default);
$parcel$export(module.exports, "schemeBuGn", () => (parcelRequire("9pZ4Q")).scheme);
$parcel$export(module.exports, "interpolateBuPu", () => (parcelRequire("7vUnZ")).default);
$parcel$export(module.exports, "schemeBuPu", () => (parcelRequire("7vUnZ")).scheme);
$parcel$export(module.exports, "interpolateGnBu", () => (parcelRequire("bS6Gd")).default);
$parcel$export(module.exports, "schemeGnBu", () => (parcelRequire("bS6Gd")).scheme);
$parcel$export(module.exports, "interpolateOrRd", () => (parcelRequire("8oLi1")).default);
$parcel$export(module.exports, "schemeOrRd", () => (parcelRequire("8oLi1")).scheme);
$parcel$export(module.exports, "interpolatePuBuGn", () => (parcelRequire("3Jfw5")).default);
$parcel$export(module.exports, "schemePuBuGn", () => (parcelRequire("3Jfw5")).scheme);
$parcel$export(module.exports, "interpolatePuBu", () => (parcelRequire("8NKuZ")).default);
$parcel$export(module.exports, "schemePuBu", () => (parcelRequire("8NKuZ")).scheme);
$parcel$export(module.exports, "interpolatePuRd", () => (parcelRequire("l3PPe")).default);
$parcel$export(module.exports, "schemePuRd", () => (parcelRequire("l3PPe")).scheme);
$parcel$export(module.exports, "interpolateRdPu", () => (parcelRequire("fuOhx")).default);
$parcel$export(module.exports, "schemeRdPu", () => (parcelRequire("fuOhx")).scheme);
$parcel$export(module.exports, "interpolateYlGnBu", () => (parcelRequire("35zM1")).default);
$parcel$export(module.exports, "schemeYlGnBu", () => (parcelRequire("35zM1")).scheme);
$parcel$export(module.exports, "interpolateYlGn", () => (parcelRequire("47nQG")).default);
$parcel$export(module.exports, "schemeYlGn", () => (parcelRequire("47nQG")).scheme);
$parcel$export(module.exports, "interpolateYlOrBr", () => (parcelRequire("3clBE")).default);
$parcel$export(module.exports, "schemeYlOrBr", () => (parcelRequire("3clBE")).scheme);
$parcel$export(module.exports, "interpolateYlOrRd", () => (parcelRequire("8j06Z")).default);
$parcel$export(module.exports, "schemeYlOrRd", () => (parcelRequire("8j06Z")).scheme);
$parcel$export(module.exports, "interpolateBlues", () => (parcelRequire("hCeBF")).default);
$parcel$export(module.exports, "schemeBlues", () => (parcelRequire("hCeBF")).scheme);
$parcel$export(module.exports, "interpolateGreens", () => (parcelRequire("5JQZI")).default);
$parcel$export(module.exports, "schemeGreens", () => (parcelRequire("5JQZI")).scheme);
$parcel$export(module.exports, "interpolateGreys", () => (parcelRequire("flAAD")).default);
$parcel$export(module.exports, "schemeGreys", () => (parcelRequire("flAAD")).scheme);
$parcel$export(module.exports, "interpolatePurples", () => (parcelRequire("l9rik")).default);
$parcel$export(module.exports, "schemePurples", () => (parcelRequire("l9rik")).scheme);
$parcel$export(module.exports, "interpolateReds", () => (parcelRequire("eWz1p")).default);
$parcel$export(module.exports, "schemeReds", () => (parcelRequire("eWz1p")).scheme);
$parcel$export(module.exports, "interpolateOranges", () => (parcelRequire("l0kQn")).default);
$parcel$export(module.exports, "schemeOranges", () => (parcelRequire("l0kQn")).scheme);
$parcel$export(module.exports, "interpolateCividis", () => (parcelRequire("73hRo")).default);
$parcel$export(module.exports, "interpolateCubehelixDefault", () => (parcelRequire("4Rd8k")).default);
$parcel$export(module.exports, "interpolateRainbow", () => (parcelRequire("9gRbV")).default);
$parcel$export(module.exports, "interpolateWarm", () => (parcelRequire("9gRbV")).warm);
$parcel$export(module.exports, "interpolateCool", () => (parcelRequire("9gRbV")).cool);
$parcel$export(module.exports, "interpolateSinebow", () => (parcelRequire("8JU5D")).default);
$parcel$export(module.exports, "interpolateTurbo", () => (parcelRequire("5dpY2")).default);
$parcel$export(module.exports, "interpolateViridis", () => (parcelRequire("5srBO")).default);
$parcel$export(module.exports, "interpolateMagma", () => (parcelRequire("5srBO")).magma);
$parcel$export(module.exports, "interpolateInferno", () => (parcelRequire("5srBO")).inferno);
$parcel$export(module.exports, "interpolatePlasma", () => (parcelRequire("5srBO")).plasma);

var $hdL34 = parcelRequire("hdL34");

var $9ja2g = parcelRequire("9ja2g");

var $4NgtQ = parcelRequire("4NgtQ");

var $i3kfv = parcelRequire("i3kfv");

var $cLsMd = parcelRequire("cLsMd");

var $gtmHT = parcelRequire("gtmHT");

var $872Jl = parcelRequire("872Jl");

var $e6bn0 = parcelRequire("e6bn0");

var $4vxz2 = parcelRequire("4vxz2");

var $a442w = parcelRequire("a442w");

var $dG8Oq = parcelRequire("dG8Oq");

var $d0gId = parcelRequire("d0gId");

var $c8zls = parcelRequire("c8zls");

var $jMliC = parcelRequire("jMliC");

var $b16F8 = parcelRequire("b16F8");

var $7xRtK = parcelRequire("7xRtK");

var $c31WA = parcelRequire("c31WA");

var $fGWCF = parcelRequire("fGWCF");

var $87tci = parcelRequire("87tci");

var $9pZ4Q = parcelRequire("9pZ4Q");

var $7vUnZ = parcelRequire("7vUnZ");

var $bS6Gd = parcelRequire("bS6Gd");

var $8oLi1 = parcelRequire("8oLi1");

var $3Jfw5 = parcelRequire("3Jfw5");

var $8NKuZ = parcelRequire("8NKuZ");

var $l3PPe = parcelRequire("l3PPe");

var $fuOhx = parcelRequire("fuOhx");

var $35zM1 = parcelRequire("35zM1");

var $47nQG = parcelRequire("47nQG");

var $3clBE = parcelRequire("3clBE");

var $8j06Z = parcelRequire("8j06Z");

var $hCeBF = parcelRequire("hCeBF");

var $5JQZI = parcelRequire("5JQZI");

var $flAAD = parcelRequire("flAAD");

var $l9rik = parcelRequire("l9rik");

var $eWz1p = parcelRequire("eWz1p");

var $l0kQn = parcelRequire("l0kQn");

var $73hRo = parcelRequire("73hRo");

var $4Rd8k = parcelRequire("4Rd8k");

var $9gRbV = parcelRequire("9gRbV");

var $8JU5D = parcelRequire("8JU5D");

var $5dpY2 = parcelRequire("5dpY2");

var $5srBO = parcelRequire("5srBO");

});
parcelRequire.register("hdL34", function(module, exports) {

$parcel$export(module.exports, "default", () => $c8982567288273da$export$2e2bcd8739ae039);

var $8kXCB = parcelRequire("8kXCB");
var $c8982567288273da$export$2e2bcd8739ae039 = $8kXCB.default("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf");

});
parcelRequire.register("8kXCB", function(module, exports) {

$parcel$export(module.exports, "default", () => $611e709d59ef3f66$export$2e2bcd8739ae039);
function $611e709d59ef3f66$export$2e2bcd8739ae039(specifier) {
    var n = specifier.length / 6 | 0, colors = new Array(n), i = 0;
    while(i < n)colors[i] = "#" + specifier.slice(i * 6, ++i * 6);
    return colors;
}

});


parcelRequire.register("9ja2g", function(module, exports) {

$parcel$export(module.exports, "default", () => $6c6dac3f5b6bcc93$export$2e2bcd8739ae039);

var $8kXCB = parcelRequire("8kXCB");
var $6c6dac3f5b6bcc93$export$2e2bcd8739ae039 = $8kXCB.default("7fc97fbeaed4fdc086ffff99386cb0f0027fbf5b17666666");

});

parcelRequire.register("4NgtQ", function(module, exports) {

$parcel$export(module.exports, "default", () => $37d885b00ec7a60a$export$2e2bcd8739ae039);

var $8kXCB = parcelRequire("8kXCB");
var $37d885b00ec7a60a$export$2e2bcd8739ae039 = $8kXCB.default("1b9e77d95f027570b3e7298a66a61ee6ab02a6761d666666");

});

parcelRequire.register("i3kfv", function(module, exports) {

$parcel$export(module.exports, "default", () => $d24836e0f35e3ba1$export$2e2bcd8739ae039);

var $8kXCB = parcelRequire("8kXCB");
var $d24836e0f35e3ba1$export$2e2bcd8739ae039 = $8kXCB.default("a6cee31f78b4b2df8a33a02cfb9a99e31a1cfdbf6fff7f00cab2d66a3d9affff99b15928");

});

parcelRequire.register("cLsMd", function(module, exports) {

$parcel$export(module.exports, "default", () => $94b0323f8da35626$export$2e2bcd8739ae039);

var $8kXCB = parcelRequire("8kXCB");
var $94b0323f8da35626$export$2e2bcd8739ae039 = $8kXCB.default("fbb4aeb3cde3ccebc5decbe4fed9a6ffffcce5d8bdfddaecf2f2f2");

});

parcelRequire.register("gtmHT", function(module, exports) {

$parcel$export(module.exports, "default", () => $bfe0f7e40263d14c$export$2e2bcd8739ae039);

var $8kXCB = parcelRequire("8kXCB");
var $bfe0f7e40263d14c$export$2e2bcd8739ae039 = $8kXCB.default("b3e2cdfdcdaccbd5e8f4cae4e6f5c9fff2aef1e2cccccccc");

});

parcelRequire.register("872Jl", function(module, exports) {

$parcel$export(module.exports, "default", () => $5e811859de4b797b$export$2e2bcd8739ae039);

var $8kXCB = parcelRequire("8kXCB");
var $5e811859de4b797b$export$2e2bcd8739ae039 = $8kXCB.default("e41a1c377eb84daf4a984ea3ff7f00ffff33a65628f781bf999999");

});

parcelRequire.register("e6bn0", function(module, exports) {

$parcel$export(module.exports, "default", () => $a43a7213749ec333$export$2e2bcd8739ae039);

var $8kXCB = parcelRequire("8kXCB");
var $a43a7213749ec333$export$2e2bcd8739ae039 = $8kXCB.default("66c2a5fc8d628da0cbe78ac3a6d854ffd92fe5c494b3b3b3");

});

parcelRequire.register("4vxz2", function(module, exports) {

$parcel$export(module.exports, "default", () => $348417cea4e386c9$export$2e2bcd8739ae039);

var $8kXCB = parcelRequire("8kXCB");
var $348417cea4e386c9$export$2e2bcd8739ae039 = $8kXCB.default("8dd3c7ffffb3bebadafb807280b1d3fdb462b3de69fccde5d9d9d9bc80bdccebc5ffed6f");

});

parcelRequire.register("a442w", function(module, exports) {

$parcel$export(module.exports, "default", () => $753d6952d44fc36f$export$2e2bcd8739ae039);

var $8kXCB = parcelRequire("8kXCB");
var $753d6952d44fc36f$export$2e2bcd8739ae039 = $8kXCB.default("4e79a7f28e2ce1575976b7b259a14fedc949af7aa1ff9da79c755fbab0ab");

});

parcelRequire.register("dG8Oq", function(module, exports) {

$parcel$export(module.exports, "scheme", () => $9f5608859d15f9f1$export$3005042704f95a69);
$parcel$export(module.exports, "default", () => $9f5608859d15f9f1$export$2e2bcd8739ae039);

var $8kXCB = parcelRequire("8kXCB");

var $f5mvl = parcelRequire("f5mvl");
var $9f5608859d15f9f1$export$3005042704f95a69 = new Array(3).concat("d8b365f5f5f55ab4ac", "a6611adfc27d80cdc1018571", "a6611adfc27df5f5f580cdc1018571", "8c510ad8b365f6e8c3c7eae55ab4ac01665e", "8c510ad8b365f6e8c3f5f5f5c7eae55ab4ac01665e", "8c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e", "8c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e", "5430058c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e003c30", "5430058c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e003c30").map($8kXCB.default);
var $9f5608859d15f9f1$export$2e2bcd8739ae039 = $f5mvl.default($9f5608859d15f9f1$export$3005042704f95a69);

});
parcelRequire.register("f5mvl", function(module, exports) {

$parcel$export(module.exports, "default", () => $afb8c791602f4607$export$2e2bcd8739ae039);

var $iTQDl = parcelRequire("iTQDl");
var $afb8c791602f4607$export$2e2bcd8739ae039 = (scheme)=>$iTQDl.rgbBasis(scheme[scheme.length - 1])
;

});
parcelRequire.register("iTQDl", function(module, exports) {

$parcel$export(module.exports, "rgbBasis", () => $dc2630fcbc12d0f5$export$2c0e28f2e2852d3f);

var $bYF7U = parcelRequire("bYF7U");

var $7guUz = parcelRequire("7guUz");

var $cQ3TD = parcelRequire("cQ3TD");

var $bZ9xS = parcelRequire("bZ9xS");
var $dc2630fcbc12d0f5$export$2e2bcd8739ae039 = function rgbGamma(y) {
    var color = $bZ9xS.gamma(y);
    function rgb(start, end) {
        var r = color((start = $bYF7U.rgb(start)).r, (end = $bYF7U.rgb(end)).r), g = color(start.g, end.g), b = color(start.b, end.b), opacity = $bZ9xS.default(start.opacity, end.opacity);
        return function(t) {
            start.r = r(t);
            start.g = g(t);
            start.b = b(t);
            start.opacity = opacity(t);
            return start + "";
        };
    }
    rgb.gamma = rgbGamma;
    return rgb;
}(1);
function $dc2630fcbc12d0f5$var$rgbSpline(spline) {
    return function(colors) {
        var n = colors.length, r = new Array(n), g = new Array(n), b = new Array(n), i, color;
        for(i = 0; i < n; ++i){
            color = $bYF7U.rgb(colors[i]);
            r[i] = color.r || 0;
            g[i] = color.g || 0;
            b[i] = color.b || 0;
        }
        r = spline(r);
        g = spline(g);
        b = spline(b);
        color.opacity = 1;
        return function(t) {
            color.r = r(t);
            color.g = g(t);
            color.b = b(t);
            return color + "";
        };
    };
}
var $dc2630fcbc12d0f5$export$2c0e28f2e2852d3f = $dc2630fcbc12d0f5$var$rgbSpline($7guUz.default);
var $dc2630fcbc12d0f5$export$53d5214f625ccd4c = $dc2630fcbc12d0f5$var$rgbSpline($cQ3TD.default);

});
parcelRequire.register("7guUz", function(module, exports) {

$parcel$export(module.exports, "basis", () => $54a20165285e744d$export$4e41033bfeec1a4c);
$parcel$export(module.exports, "default", () => $54a20165285e744d$export$2e2bcd8739ae039);
function $54a20165285e744d$export$4e41033bfeec1a4c(t1, v0, v1, v2, v3) {
    var t2 = t1 * t1, t3 = t2 * t1;
    return ((1 - 3 * t1 + 3 * t2 - t3) * v0 + (4 - 6 * t2 + 3 * t3) * v1 + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2 + t3 * v3) / 6;
}
function $54a20165285e744d$export$2e2bcd8739ae039(values) {
    var n = values.length - 1;
    return function(t) {
        var i = t <= 0 ? t = 0 : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n), v1 = values[i], v2 = values[i + 1], v0 = i > 0 ? values[i - 1] : 2 * v1 - v2, v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
        return $54a20165285e744d$export$4e41033bfeec1a4c((t - i / n) * n, v0, v1, v2, v3);
    };
}

});

parcelRequire.register("cQ3TD", function(module, exports) {

$parcel$export(module.exports, "default", () => $958d5d1873ab3969$export$2e2bcd8739ae039);

var $7guUz = parcelRequire("7guUz");
function $958d5d1873ab3969$export$2e2bcd8739ae039(values) {
    var n = values.length;
    return function(t) {
        var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n), v0 = values[(i + n - 1) % n], v1 = values[i % n], v2 = values[(i + 1) % n], v3 = values[(i + 2) % n];
        return $7guUz.basis((t - i / n) * n, v0, v1, v2, v3);
    };
}

});

parcelRequire.register("bZ9xS", function(module, exports) {

$parcel$export(module.exports, "hue", () => $8b9ccbc13b75f6c1$export$97d7b0c7ddb78dcf);
$parcel$export(module.exports, "gamma", () => $8b9ccbc13b75f6c1$export$a7ebe8cc6aaf8d37);
$parcel$export(module.exports, "default", () => $8b9ccbc13b75f6c1$export$2e2bcd8739ae039);

var $arcbt = parcelRequire("arcbt");
function $8b9ccbc13b75f6c1$var$linear(a, d) {
    return function(t) {
        return a + t * d;
    };
}
function $8b9ccbc13b75f6c1$var$exponential(a, b, y) {
    return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
        return Math.pow(a + t * b, y);
    };
}
function $8b9ccbc13b75f6c1$export$97d7b0c7ddb78dcf(a, b) {
    var d = b - a;
    return d ? $8b9ccbc13b75f6c1$var$linear(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : $arcbt.default(isNaN(a) ? b : a);
}
function $8b9ccbc13b75f6c1$export$a7ebe8cc6aaf8d37(y) {
    return (y = +y) === 1 ? $8b9ccbc13b75f6c1$export$2e2bcd8739ae039 : function(a, b) {
        return b - a ? $8b9ccbc13b75f6c1$var$exponential(a, b, y) : $arcbt.default(isNaN(a) ? b : a);
    };
}
function $8b9ccbc13b75f6c1$export$2e2bcd8739ae039(a, b) {
    var d = b - a;
    return d ? $8b9ccbc13b75f6c1$var$linear(a, d) : $arcbt.default(isNaN(a) ? b : a);
}

});
parcelRequire.register("arcbt", function(module, exports) {

$parcel$export(module.exports, "default", () => $7995e0798190af6e$export$2e2bcd8739ae039);
var $7995e0798190af6e$export$2e2bcd8739ae039 = (x)=>()=>x
;

});



parcelRequire.register("7TWTy", function(module, exports) {

$parcel$export(module.exports, "cubehelixLong", () => $5c0b5ac660d49ba7$export$934fa09ad474a1b4);

var $22vTA = parcelRequire("22vTA");

var $bZ9xS = parcelRequire("bZ9xS");
function $5c0b5ac660d49ba7$var$cubehelix(hue) {
    return (function cubehelixGamma(y) {
        y = +y;
        function cubehelix(start, end) {
            var h = hue((start = $22vTA.default(start)).h, (end = $22vTA.default(end)).h), s = $bZ9xS.default(start.s, end.s), l = $bZ9xS.default(start.l, end.l), opacity = $bZ9xS.default(start.opacity, end.opacity);
            return function(t) {
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
var $5c0b5ac660d49ba7$export$2e2bcd8739ae039 = $5c0b5ac660d49ba7$var$cubehelix($bZ9xS.hue);
var $5c0b5ac660d49ba7$export$934fa09ad474a1b4 = $5c0b5ac660d49ba7$var$cubehelix($bZ9xS.default);

});




parcelRequire.register("d0gId", function(module, exports) {

$parcel$export(module.exports, "scheme", () => $97783d1ce1853915$export$3005042704f95a69);
$parcel$export(module.exports, "default", () => $97783d1ce1853915$export$2e2bcd8739ae039);

var $8kXCB = parcelRequire("8kXCB");

var $f5mvl = parcelRequire("f5mvl");
var $97783d1ce1853915$export$3005042704f95a69 = new Array(3).concat("af8dc3f7f7f77fbf7b", "7b3294c2a5cfa6dba0008837", "7b3294c2a5cff7f7f7a6dba0008837", "762a83af8dc3e7d4e8d9f0d37fbf7b1b7837", "762a83af8dc3e7d4e8f7f7f7d9f0d37fbf7b1b7837", "762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b7837", "762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b7837", "40004b762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b783700441b", "40004b762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b783700441b").map($8kXCB.default);
var $97783d1ce1853915$export$2e2bcd8739ae039 = $f5mvl.default($97783d1ce1853915$export$3005042704f95a69);

});

parcelRequire.register("c8zls", function(module, exports) {

$parcel$export(module.exports, "scheme", () => $8d61a62a2cd1c4e7$export$3005042704f95a69);
$parcel$export(module.exports, "default", () => $8d61a62a2cd1c4e7$export$2e2bcd8739ae039);

var $8kXCB = parcelRequire("8kXCB");

var $f5mvl = parcelRequire("f5mvl");
var $8d61a62a2cd1c4e7$export$3005042704f95a69 = new Array(3).concat("e9a3c9f7f7f7a1d76a", "d01c8bf1b6dab8e1864dac26", "d01c8bf1b6daf7f7f7b8e1864dac26", "c51b7de9a3c9fde0efe6f5d0a1d76a4d9221", "c51b7de9a3c9fde0eff7f7f7e6f5d0a1d76a4d9221", "c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221", "c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221", "8e0152c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221276419", "8e0152c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221276419").map($8kXCB.default);
var $8d61a62a2cd1c4e7$export$2e2bcd8739ae039 = $f5mvl.default($8d61a62a2cd1c4e7$export$3005042704f95a69);

});

parcelRequire.register("jMliC", function(module, exports) {

$parcel$export(module.exports, "scheme", () => $e6630596e021c8cd$export$3005042704f95a69);
$parcel$export(module.exports, "default", () => $e6630596e021c8cd$export$2e2bcd8739ae039);

var $8kXCB = parcelRequire("8kXCB");

var $f5mvl = parcelRequire("f5mvl");
var $e6630596e021c8cd$export$3005042704f95a69 = new Array(3).concat("998ec3f7f7f7f1a340", "5e3c99b2abd2fdb863e66101", "5e3c99b2abd2f7f7f7fdb863e66101", "542788998ec3d8daebfee0b6f1a340b35806", "542788998ec3d8daebf7f7f7fee0b6f1a340b35806", "5427888073acb2abd2d8daebfee0b6fdb863e08214b35806", "5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b35806", "2d004b5427888073acb2abd2d8daebfee0b6fdb863e08214b358067f3b08", "2d004b5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b358067f3b08").map($8kXCB.default);
var $e6630596e021c8cd$export$2e2bcd8739ae039 = $f5mvl.default($e6630596e021c8cd$export$3005042704f95a69);

});

parcelRequire.register("b16F8", function(module, exports) {

$parcel$export(module.exports, "scheme", () => $8054f4c116a68609$export$3005042704f95a69);
$parcel$export(module.exports, "default", () => $8054f4c116a68609$export$2e2bcd8739ae039);

var $8kXCB = parcelRequire("8kXCB");

var $f5mvl = parcelRequire("f5mvl");
var $8054f4c116a68609$export$3005042704f95a69 = new Array(3).concat("ef8a62f7f7f767a9cf", "ca0020f4a58292c5de0571b0", "ca0020f4a582f7f7f792c5de0571b0", "b2182bef8a62fddbc7d1e5f067a9cf2166ac", "b2182bef8a62fddbc7f7f7f7d1e5f067a9cf2166ac", "b2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac", "b2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac", "67001fb2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac053061", "67001fb2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac053061").map($8kXCB.default);
var $8054f4c116a68609$export$2e2bcd8739ae039 = $f5mvl.default($8054f4c116a68609$export$3005042704f95a69);

});

parcelRequire.register("7xRtK", function(module, exports) {

$parcel$export(module.exports, "scheme", () => $57e5193ca2d0e91f$export$3005042704f95a69);
$parcel$export(module.exports, "default", () => $57e5193ca2d0e91f$export$2e2bcd8739ae039);

var $8kXCB = parcelRequire("8kXCB");

var $f5mvl = parcelRequire("f5mvl");
var $57e5193ca2d0e91f$export$3005042704f95a69 = new Array(3).concat("ef8a62ffffff999999", "ca0020f4a582bababa404040", "ca0020f4a582ffffffbababa404040", "b2182bef8a62fddbc7e0e0e09999994d4d4d", "b2182bef8a62fddbc7ffffffe0e0e09999994d4d4d", "b2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d", "b2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d", "67001fb2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d1a1a1a", "67001fb2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d1a1a1a").map($8kXCB.default);
var $57e5193ca2d0e91f$export$2e2bcd8739ae039 = $f5mvl.default($57e5193ca2d0e91f$export$3005042704f95a69);

});

parcelRequire.register("c31WA", function(module, exports) {

$parcel$export(module.exports, "scheme", () => $8c5745da57a77efd$export$3005042704f95a69);
$parcel$export(module.exports, "default", () => $8c5745da57a77efd$export$2e2bcd8739ae039);

var $8kXCB = parcelRequire("8kXCB");

var $f5mvl = parcelRequire("f5mvl");
var $8c5745da57a77efd$export$3005042704f95a69 = new Array(3).concat("fc8d59ffffbf91bfdb", "d7191cfdae61abd9e92c7bb6", "d7191cfdae61ffffbfabd9e92c7bb6", "d73027fc8d59fee090e0f3f891bfdb4575b4", "d73027fc8d59fee090ffffbfe0f3f891bfdb4575b4", "d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4", "d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4", "a50026d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4313695", "a50026d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4313695").map($8kXCB.default);
var $8c5745da57a77efd$export$2e2bcd8739ae039 = $f5mvl.default($8c5745da57a77efd$export$3005042704f95a69);

});

parcelRequire.register("fGWCF", function(module, exports) {

$parcel$export(module.exports, "scheme", () => $b6c8407df7fa7a60$export$3005042704f95a69);
$parcel$export(module.exports, "default", () => $b6c8407df7fa7a60$export$2e2bcd8739ae039);

var $8kXCB = parcelRequire("8kXCB");

var $f5mvl = parcelRequire("f5mvl");
var $b6c8407df7fa7a60$export$3005042704f95a69 = new Array(3).concat("fc8d59ffffbf91cf60", "d7191cfdae61a6d96a1a9641", "d7191cfdae61ffffbfa6d96a1a9641", "d73027fc8d59fee08bd9ef8b91cf601a9850", "d73027fc8d59fee08bffffbfd9ef8b91cf601a9850", "d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850", "d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850", "a50026d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850006837", "a50026d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850006837").map($8kXCB.default);
var $b6c8407df7fa7a60$export$2e2bcd8739ae039 = $f5mvl.default($b6c8407df7fa7a60$export$3005042704f95a69);

});

parcelRequire.register("87tci", function(module, exports) {

$parcel$export(module.exports, "scheme", () => $5e95a027cbe2122f$export$3005042704f95a69);
$parcel$export(module.exports, "default", () => $5e95a027cbe2122f$export$2e2bcd8739ae039);

var $8kXCB = parcelRequire("8kXCB");

var $f5mvl = parcelRequire("f5mvl");
var $5e95a027cbe2122f$export$3005042704f95a69 = new Array(3).concat("fc8d59ffffbf99d594", "d7191cfdae61abdda42b83ba", "d7191cfdae61ffffbfabdda42b83ba", "d53e4ffc8d59fee08be6f59899d5943288bd", "d53e4ffc8d59fee08bffffbfe6f59899d5943288bd", "d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd", "d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd", "9e0142d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd5e4fa2", "9e0142d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd5e4fa2").map($8kXCB.default);
var $5e95a027cbe2122f$export$2e2bcd8739ae039 = $f5mvl.default($5e95a027cbe2122f$export$3005042704f95a69);

});

parcelRequire.register("9pZ4Q", function(module, exports) {

$parcel$export(module.exports, "scheme", () => $6db5d385fd3f51fc$export$3005042704f95a69);
$parcel$export(module.exports, "default", () => $6db5d385fd3f51fc$export$2e2bcd8739ae039);

var $8kXCB = parcelRequire("8kXCB");

var $f5mvl = parcelRequire("f5mvl");
var $6db5d385fd3f51fc$export$3005042704f95a69 = new Array(3).concat("e5f5f999d8c92ca25f", "edf8fbb2e2e266c2a4238b45", "edf8fbb2e2e266c2a42ca25f006d2c", "edf8fbccece699d8c966c2a42ca25f006d2c", "edf8fbccece699d8c966c2a441ae76238b45005824", "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45005824", "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45006d2c00441b").map($8kXCB.default);
var $6db5d385fd3f51fc$export$2e2bcd8739ae039 = $f5mvl.default($6db5d385fd3f51fc$export$3005042704f95a69);

});

parcelRequire.register("7vUnZ", function(module, exports) {

$parcel$export(module.exports, "scheme", () => $57872ab39c4b4b9c$export$3005042704f95a69);
$parcel$export(module.exports, "default", () => $57872ab39c4b4b9c$export$2e2bcd8739ae039);

var $8kXCB = parcelRequire("8kXCB");

var $f5mvl = parcelRequire("f5mvl");
var $57872ab39c4b4b9c$export$3005042704f95a69 = new Array(3).concat("e0ecf49ebcda8856a7", "edf8fbb3cde38c96c688419d", "edf8fbb3cde38c96c68856a7810f7c", "edf8fbbfd3e69ebcda8c96c68856a7810f7c", "edf8fbbfd3e69ebcda8c96c68c6bb188419d6e016b", "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d6e016b", "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d810f7c4d004b").map($8kXCB.default);
var $57872ab39c4b4b9c$export$2e2bcd8739ae039 = $f5mvl.default($57872ab39c4b4b9c$export$3005042704f95a69);

});

parcelRequire.register("bS6Gd", function(module, exports) {

$parcel$export(module.exports, "scheme", () => $8a49eb5d9f4b7d5b$export$3005042704f95a69);
$parcel$export(module.exports, "default", () => $8a49eb5d9f4b7d5b$export$2e2bcd8739ae039);

var $8kXCB = parcelRequire("8kXCB");

var $f5mvl = parcelRequire("f5mvl");
var $8a49eb5d9f4b7d5b$export$3005042704f95a69 = new Array(3).concat("e0f3dba8ddb543a2ca", "f0f9e8bae4bc7bccc42b8cbe", "f0f9e8bae4bc7bccc443a2ca0868ac", "f0f9e8ccebc5a8ddb57bccc443a2ca0868ac", "f0f9e8ccebc5a8ddb57bccc44eb3d32b8cbe08589e", "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe08589e", "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe0868ac084081").map($8kXCB.default);
var $8a49eb5d9f4b7d5b$export$2e2bcd8739ae039 = $f5mvl.default($8a49eb5d9f4b7d5b$export$3005042704f95a69);

});

parcelRequire.register("8oLi1", function(module, exports) {

$parcel$export(module.exports, "scheme", () => $61d53f5d16b56a9a$export$3005042704f95a69);
$parcel$export(module.exports, "default", () => $61d53f5d16b56a9a$export$2e2bcd8739ae039);

var $8kXCB = parcelRequire("8kXCB");

var $f5mvl = parcelRequire("f5mvl");
var $61d53f5d16b56a9a$export$3005042704f95a69 = new Array(3).concat("fee8c8fdbb84e34a33", "fef0d9fdcc8afc8d59d7301f", "fef0d9fdcc8afc8d59e34a33b30000", "fef0d9fdd49efdbb84fc8d59e34a33b30000", "fef0d9fdd49efdbb84fc8d59ef6548d7301f990000", "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301f990000", "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301fb300007f0000").map($8kXCB.default);
var $61d53f5d16b56a9a$export$2e2bcd8739ae039 = $f5mvl.default($61d53f5d16b56a9a$export$3005042704f95a69);

});

parcelRequire.register("3Jfw5", function(module, exports) {

$parcel$export(module.exports, "scheme", () => $2b719c51a7e61eaf$export$3005042704f95a69);
$parcel$export(module.exports, "default", () => $2b719c51a7e61eaf$export$2e2bcd8739ae039);

var $8kXCB = parcelRequire("8kXCB");

var $f5mvl = parcelRequire("f5mvl");
var $2b719c51a7e61eaf$export$3005042704f95a69 = new Array(3).concat("ece2f0a6bddb1c9099", "f6eff7bdc9e167a9cf02818a", "f6eff7bdc9e167a9cf1c9099016c59", "f6eff7d0d1e6a6bddb67a9cf1c9099016c59", "f6eff7d0d1e6a6bddb67a9cf3690c002818a016450", "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016450", "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016c59014636").map($8kXCB.default);
var $2b719c51a7e61eaf$export$2e2bcd8739ae039 = $f5mvl.default($2b719c51a7e61eaf$export$3005042704f95a69);

});

parcelRequire.register("8NKuZ", function(module, exports) {

$parcel$export(module.exports, "scheme", () => $6686f806a738efb0$export$3005042704f95a69);
$parcel$export(module.exports, "default", () => $6686f806a738efb0$export$2e2bcd8739ae039);

var $8kXCB = parcelRequire("8kXCB");

var $f5mvl = parcelRequire("f5mvl");
var $6686f806a738efb0$export$3005042704f95a69 = new Array(3).concat("ece7f2a6bddb2b8cbe", "f1eef6bdc9e174a9cf0570b0", "f1eef6bdc9e174a9cf2b8cbe045a8d", "f1eef6d0d1e6a6bddb74a9cf2b8cbe045a8d", "f1eef6d0d1e6a6bddb74a9cf3690c00570b0034e7b", "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0034e7b", "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0045a8d023858").map($8kXCB.default);
var $6686f806a738efb0$export$2e2bcd8739ae039 = $f5mvl.default($6686f806a738efb0$export$3005042704f95a69);

});

parcelRequire.register("l3PPe", function(module, exports) {

$parcel$export(module.exports, "scheme", () => $f55214335b902976$export$3005042704f95a69);
$parcel$export(module.exports, "default", () => $f55214335b902976$export$2e2bcd8739ae039);

var $8kXCB = parcelRequire("8kXCB");

var $f5mvl = parcelRequire("f5mvl");
var $f55214335b902976$export$3005042704f95a69 = new Array(3).concat("e7e1efc994c7dd1c77", "f1eef6d7b5d8df65b0ce1256", "f1eef6d7b5d8df65b0dd1c77980043", "f1eef6d4b9dac994c7df65b0dd1c77980043", "f1eef6d4b9dac994c7df65b0e7298ace125691003f", "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125691003f", "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125698004367001f").map($8kXCB.default);
var $f55214335b902976$export$2e2bcd8739ae039 = $f5mvl.default($f55214335b902976$export$3005042704f95a69);

});

parcelRequire.register("fuOhx", function(module, exports) {

$parcel$export(module.exports, "scheme", () => $b480a9491a1a3708$export$3005042704f95a69);
$parcel$export(module.exports, "default", () => $b480a9491a1a3708$export$2e2bcd8739ae039);

var $8kXCB = parcelRequire("8kXCB");

var $f5mvl = parcelRequire("f5mvl");
var $b480a9491a1a3708$export$3005042704f95a69 = new Array(3).concat("fde0ddfa9fb5c51b8a", "feebe2fbb4b9f768a1ae017e", "feebe2fbb4b9f768a1c51b8a7a0177", "feebe2fcc5c0fa9fb5f768a1c51b8a7a0177", "feebe2fcc5c0fa9fb5f768a1dd3497ae017e7a0177", "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a0177", "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a017749006a").map($8kXCB.default);
var $b480a9491a1a3708$export$2e2bcd8739ae039 = $f5mvl.default($b480a9491a1a3708$export$3005042704f95a69);

});

parcelRequire.register("35zM1", function(module, exports) {

$parcel$export(module.exports, "scheme", () => $23fd969ec061ad16$export$3005042704f95a69);
$parcel$export(module.exports, "default", () => $23fd969ec061ad16$export$2e2bcd8739ae039);

var $8kXCB = parcelRequire("8kXCB");

var $f5mvl = parcelRequire("f5mvl");
var $23fd969ec061ad16$export$3005042704f95a69 = new Array(3).concat("edf8b17fcdbb2c7fb8", "ffffcca1dab441b6c4225ea8", "ffffcca1dab441b6c42c7fb8253494", "ffffccc7e9b47fcdbb41b6c42c7fb8253494", "ffffccc7e9b47fcdbb41b6c41d91c0225ea80c2c84", "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea80c2c84", "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea8253494081d58").map($8kXCB.default);
var $23fd969ec061ad16$export$2e2bcd8739ae039 = $f5mvl.default($23fd969ec061ad16$export$3005042704f95a69);

});

parcelRequire.register("47nQG", function(module, exports) {

$parcel$export(module.exports, "scheme", () => $2ffa50b9a8c80ac4$export$3005042704f95a69);
$parcel$export(module.exports, "default", () => $2ffa50b9a8c80ac4$export$2e2bcd8739ae039);

var $8kXCB = parcelRequire("8kXCB");

var $f5mvl = parcelRequire("f5mvl");
var $2ffa50b9a8c80ac4$export$3005042704f95a69 = new Array(3).concat("f7fcb9addd8e31a354", "ffffccc2e69978c679238443", "ffffccc2e69978c67931a354006837", "ffffccd9f0a3addd8e78c67931a354006837", "ffffccd9f0a3addd8e78c67941ab5d238443005a32", "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443005a32", "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443006837004529").map($8kXCB.default);
var $2ffa50b9a8c80ac4$export$2e2bcd8739ae039 = $f5mvl.default($2ffa50b9a8c80ac4$export$3005042704f95a69);

});

parcelRequire.register("3clBE", function(module, exports) {

$parcel$export(module.exports, "scheme", () => $254340a83d0b9afa$export$3005042704f95a69);
$parcel$export(module.exports, "default", () => $254340a83d0b9afa$export$2e2bcd8739ae039);

var $8kXCB = parcelRequire("8kXCB");

var $f5mvl = parcelRequire("f5mvl");
var $254340a83d0b9afa$export$3005042704f95a69 = new Array(3).concat("fff7bcfec44fd95f0e", "ffffd4fed98efe9929cc4c02", "ffffd4fed98efe9929d95f0e993404", "ffffd4fee391fec44ffe9929d95f0e993404", "ffffd4fee391fec44ffe9929ec7014cc4c028c2d04", "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c028c2d04", "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c02993404662506").map($8kXCB.default);
var $254340a83d0b9afa$export$2e2bcd8739ae039 = $f5mvl.default($254340a83d0b9afa$export$3005042704f95a69);

});

parcelRequire.register("8j06Z", function(module, exports) {

$parcel$export(module.exports, "scheme", () => $60c02f45b40ffc6d$export$3005042704f95a69);
$parcel$export(module.exports, "default", () => $60c02f45b40ffc6d$export$2e2bcd8739ae039);

var $8kXCB = parcelRequire("8kXCB");

var $f5mvl = parcelRequire("f5mvl");
var $60c02f45b40ffc6d$export$3005042704f95a69 = new Array(3).concat("ffeda0feb24cf03b20", "ffffb2fecc5cfd8d3ce31a1c", "ffffb2fecc5cfd8d3cf03b20bd0026", "ffffb2fed976feb24cfd8d3cf03b20bd0026", "ffffb2fed976feb24cfd8d3cfc4e2ae31a1cb10026", "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cb10026", "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cbd0026800026").map($8kXCB.default);
var $60c02f45b40ffc6d$export$2e2bcd8739ae039 = $f5mvl.default($60c02f45b40ffc6d$export$3005042704f95a69);

});

parcelRequire.register("hCeBF", function(module, exports) {

$parcel$export(module.exports, "scheme", () => $cd3150d2bdb79188$export$3005042704f95a69);
$parcel$export(module.exports, "default", () => $cd3150d2bdb79188$export$2e2bcd8739ae039);

var $8kXCB = parcelRequire("8kXCB");

var $f5mvl = parcelRequire("f5mvl");
var $cd3150d2bdb79188$export$3005042704f95a69 = new Array(3).concat("deebf79ecae13182bd", "eff3ffbdd7e76baed62171b5", "eff3ffbdd7e76baed63182bd08519c", "eff3ffc6dbef9ecae16baed63182bd08519c", "eff3ffc6dbef9ecae16baed64292c62171b5084594", "f7fbffdeebf7c6dbef9ecae16baed64292c62171b5084594", "f7fbffdeebf7c6dbef9ecae16baed64292c62171b508519c08306b").map($8kXCB.default);
var $cd3150d2bdb79188$export$2e2bcd8739ae039 = $f5mvl.default($cd3150d2bdb79188$export$3005042704f95a69);

});

parcelRequire.register("5JQZI", function(module, exports) {

$parcel$export(module.exports, "scheme", () => $42da4352c79567d9$export$3005042704f95a69);
$parcel$export(module.exports, "default", () => $42da4352c79567d9$export$2e2bcd8739ae039);

var $8kXCB = parcelRequire("8kXCB");

var $f5mvl = parcelRequire("f5mvl");
var $42da4352c79567d9$export$3005042704f95a69 = new Array(3).concat("e5f5e0a1d99b31a354", "edf8e9bae4b374c476238b45", "edf8e9bae4b374c47631a354006d2c", "edf8e9c7e9c0a1d99b74c47631a354006d2c", "edf8e9c7e9c0a1d99b74c47641ab5d238b45005a32", "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45005a32", "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45006d2c00441b").map($8kXCB.default);
var $42da4352c79567d9$export$2e2bcd8739ae039 = $f5mvl.default($42da4352c79567d9$export$3005042704f95a69);

});

parcelRequire.register("flAAD", function(module, exports) {

$parcel$export(module.exports, "scheme", () => $b2c533258fcbee12$export$3005042704f95a69);
$parcel$export(module.exports, "default", () => $b2c533258fcbee12$export$2e2bcd8739ae039);

var $8kXCB = parcelRequire("8kXCB");

var $f5mvl = parcelRequire("f5mvl");
var $b2c533258fcbee12$export$3005042704f95a69 = new Array(3).concat("f0f0f0bdbdbd636363", "f7f7f7cccccc969696525252", "f7f7f7cccccc969696636363252525", "f7f7f7d9d9d9bdbdbd969696636363252525", "f7f7f7d9d9d9bdbdbd969696737373525252252525", "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525", "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525000000").map($8kXCB.default);
var $b2c533258fcbee12$export$2e2bcd8739ae039 = $f5mvl.default($b2c533258fcbee12$export$3005042704f95a69);

});

parcelRequire.register("l9rik", function(module, exports) {

$parcel$export(module.exports, "scheme", () => $f65f9c659ecda3f5$export$3005042704f95a69);
$parcel$export(module.exports, "default", () => $f65f9c659ecda3f5$export$2e2bcd8739ae039);

var $8kXCB = parcelRequire("8kXCB");

var $f5mvl = parcelRequire("f5mvl");
var $f65f9c659ecda3f5$export$3005042704f95a69 = new Array(3).concat("efedf5bcbddc756bb1", "f2f0f7cbc9e29e9ac86a51a3", "f2f0f7cbc9e29e9ac8756bb154278f", "f2f0f7dadaebbcbddc9e9ac8756bb154278f", "f2f0f7dadaebbcbddc9e9ac8807dba6a51a34a1486", "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a34a1486", "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a354278f3f007d").map($8kXCB.default);
var $f65f9c659ecda3f5$export$2e2bcd8739ae039 = $f5mvl.default($f65f9c659ecda3f5$export$3005042704f95a69);

});

parcelRequire.register("eWz1p", function(module, exports) {

$parcel$export(module.exports, "scheme", () => $ae11a6088f6d21e0$export$3005042704f95a69);
$parcel$export(module.exports, "default", () => $ae11a6088f6d21e0$export$2e2bcd8739ae039);

var $8kXCB = parcelRequire("8kXCB");

var $f5mvl = parcelRequire("f5mvl");
var $ae11a6088f6d21e0$export$3005042704f95a69 = new Array(3).concat("fee0d2fc9272de2d26", "fee5d9fcae91fb6a4acb181d", "fee5d9fcae91fb6a4ade2d26a50f15", "fee5d9fcbba1fc9272fb6a4ade2d26a50f15", "fee5d9fcbba1fc9272fb6a4aef3b2ccb181d99000d", "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181d99000d", "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181da50f1567000d").map($8kXCB.default);
var $ae11a6088f6d21e0$export$2e2bcd8739ae039 = $f5mvl.default($ae11a6088f6d21e0$export$3005042704f95a69);

});

parcelRequire.register("l0kQn", function(module, exports) {

$parcel$export(module.exports, "scheme", () => $f4a9c42fe0561dc6$export$3005042704f95a69);
$parcel$export(module.exports, "default", () => $f4a9c42fe0561dc6$export$2e2bcd8739ae039);

var $8kXCB = parcelRequire("8kXCB");

var $f5mvl = parcelRequire("f5mvl");
var $f4a9c42fe0561dc6$export$3005042704f95a69 = new Array(3).concat("fee6cefdae6be6550d", "feeddefdbe85fd8d3cd94701", "feeddefdbe85fd8d3ce6550da63603", "feeddefdd0a2fdae6bfd8d3ce6550da63603", "feeddefdd0a2fdae6bfd8d3cf16913d948018c2d04", "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d948018c2d04", "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d94801a636037f2704").map($8kXCB.default);
var $f4a9c42fe0561dc6$export$2e2bcd8739ae039 = $f5mvl.default($f4a9c42fe0561dc6$export$3005042704f95a69);

});

parcelRequire.register("73hRo", function(module, exports) {

$parcel$export(module.exports, "default", () => $5226aadd46fd347a$export$2e2bcd8739ae039);
function $5226aadd46fd347a$export$2e2bcd8739ae039(t) {
    t = Math.max(0, Math.min(1, t));
    return "rgb(" + Math.max(0, Math.min(255, Math.round(-4.54 - t * (35.34 - t * (2381.73 - t * (6402.7 - t * (7024.72 - t * 2710.57))))))) + ", " + Math.max(0, Math.min(255, Math.round(32.49 + t * (170.73 + t * (52.82 - t * (131.46 - t * (176.58 - t * 67.37))))))) + ", " + Math.max(0, Math.min(255, Math.round(81.24 + t * (442.36 - t * (2482.43 - t * (6167.24 - t * (6614.94 - t * 2475.67))))))) + ")";
}

});

parcelRequire.register("4Rd8k", function(module, exports) {

$parcel$export(module.exports, "default", () => $38964ca673bbeeea$export$2e2bcd8739ae039);

var $22vTA = parcelRequire("22vTA");

var $7TWTy = parcelRequire("7TWTy");
var $38964ca673bbeeea$export$2e2bcd8739ae039 = $7TWTy.cubehelixLong($22vTA.default(300, 0.5, 0), $22vTA.default(-240, 0.5, 1));

});

parcelRequire.register("9gRbV", function(module, exports) {

$parcel$export(module.exports, "warm", () => $6bfede63efe5e9fe$export$fc70efcec537be98);
$parcel$export(module.exports, "cool", () => $6bfede63efe5e9fe$export$c5cedbc1ab3be2c3);
$parcel$export(module.exports, "default", () => $6bfede63efe5e9fe$export$2e2bcd8739ae039);

var $22vTA = parcelRequire("22vTA");

var $7TWTy = parcelRequire("7TWTy");
var $6bfede63efe5e9fe$export$fc70efcec537be98 = $7TWTy.cubehelixLong($22vTA.default(-100, 0.75, 0.35), $22vTA.default(80, 1.5, 0.8));
var $6bfede63efe5e9fe$export$c5cedbc1ab3be2c3 = $7TWTy.cubehelixLong($22vTA.default(260, 0.75, 0.35), $22vTA.default(80, 1.5, 0.8));
var $6bfede63efe5e9fe$var$c = $22vTA.default();
function $6bfede63efe5e9fe$export$2e2bcd8739ae039(t) {
    if (t < 0 || t > 1) t -= Math.floor(t);
    var ts = Math.abs(t - 0.5);
    $6bfede63efe5e9fe$var$c.h = 360 * t - 100;
    $6bfede63efe5e9fe$var$c.s = 1.5 - 1.5 * ts;
    $6bfede63efe5e9fe$var$c.l = 0.8 - 0.9 * ts;
    return $6bfede63efe5e9fe$var$c + "";
}

});

parcelRequire.register("8JU5D", function(module, exports) {

$parcel$export(module.exports, "default", () => $65ce08fb2687abd3$export$2e2bcd8739ae039);

var $bYF7U = parcelRequire("bYF7U");
var $65ce08fb2687abd3$var$c = $bYF7U.rgb(), $65ce08fb2687abd3$var$pi_1_3 = Math.PI / 3, $65ce08fb2687abd3$var$pi_2_3 = Math.PI * 2 / 3;
function $65ce08fb2687abd3$export$2e2bcd8739ae039(t) {
    var x;
    t = (0.5 - t) * Math.PI;
    $65ce08fb2687abd3$var$c.r = 255 * (x = Math.sin(t)) * x;
    $65ce08fb2687abd3$var$c.g = 255 * (x = Math.sin(t + $65ce08fb2687abd3$var$pi_1_3)) * x;
    $65ce08fb2687abd3$var$c.b = 255 * (x = Math.sin(t + $65ce08fb2687abd3$var$pi_2_3)) * x;
    return $65ce08fb2687abd3$var$c + "";
}

});

parcelRequire.register("5dpY2", function(module, exports) {

$parcel$export(module.exports, "default", () => $3cc24f353526d0d2$export$2e2bcd8739ae039);
function $3cc24f353526d0d2$export$2e2bcd8739ae039(t) {
    t = Math.max(0, Math.min(1, t));
    return "rgb(" + Math.max(0, Math.min(255, Math.round(34.61 + t * (1172.33 - t * (10793.56 - t * (33300.12 - t * (38394.49 - t * 14825.05))))))) + ", " + Math.max(0, Math.min(255, Math.round(23.31 + t * (557.33 + t * (1225.33 - t * (3574.96 - t * (1073.77 + t * 707.56))))))) + ", " + Math.max(0, Math.min(255, Math.round(27.2 + t * (3211.1 - t * (15327.97 - t * (27814 - t * (22569.18 - t * 6838.66))))))) + ")";
}

});

parcelRequire.register("5srBO", function(module, exports) {

$parcel$export(module.exports, "default", () => $3f94fbd2903375d3$export$2e2bcd8739ae039);
$parcel$export(module.exports, "magma", () => $3f94fbd2903375d3$export$c41e69203f572e8d);
$parcel$export(module.exports, "inferno", () => $3f94fbd2903375d3$export$ad0c8285c8ea6dbd);
$parcel$export(module.exports, "plasma", () => $3f94fbd2903375d3$export$6664860a633d9daf);

var $8kXCB = parcelRequire("8kXCB");
function $3f94fbd2903375d3$var$ramp(range) {
    var n = range.length;
    return function(t) {
        return range[Math.max(0, Math.min(n - 1, Math.floor(t * n)))];
    };
}
var $3f94fbd2903375d3$export$2e2bcd8739ae039 = $3f94fbd2903375d3$var$ramp($8kXCB.default("44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725"));
var $3f94fbd2903375d3$export$c41e69203f572e8d = $3f94fbd2903375d3$var$ramp($8kXCB.default("00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf"));
var $3f94fbd2903375d3$export$ad0c8285c8ea6dbd = $3f94fbd2903375d3$var$ramp($8kXCB.default("00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4"));
var $3f94fbd2903375d3$export$6664860a633d9daf = $3f94fbd2903375d3$var$ramp($8kXCB.default("0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921"));

});



})();
//# sourceMappingURL=offscreen-webgl-worker.49ed4b95.js.map
