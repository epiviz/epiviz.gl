import * as $1dKPz$d3scalechromatic from "d3-scale-chromatic";
import {color as $1dKPz$color} from "d3-color";
import {format as $1dKPz$format, precisionRound as $1dKPz$precisionRound} from "d3-format";

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
parcelRequire.register("6Izoz", function(module, exports) {

$parcel$export(module.exports, "getDrawModeForTrack", () => $4e424ee5dcd6d325$export$b4454ba0c982fa69);
$parcel$export(module.exports, "default", () => $4e424ee5dcd6d325$export$9099ad97b570f7c);
$parcel$export(module.exports, "DEFAULT_CHANNELS", () => $4e424ee5dcd6d325$export$5042da89bb9e922c);

var $cwgQF = parcelRequire("cwgQF");

var $lHxH2 = parcelRequire("lHxH2");

// Default channel values of specification which is passed to webgl drawer
const $4e424ee5dcd6d325$export$5042da89bb9e922c = Object.freeze({
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
const $4e424ee5dcd6d325$var$DEFAULT_MAX_SIZE = 100;
const $4e424ee5dcd6d325$var$DEFAULT_MIN_SIZE = 0;
const $4e424ee5dcd6d325$var$DEFAULT_MIN_OPACITY = 0;
const $4e424ee5dcd6d325$var$DEFAULT_MIN_WIDTH = 0;
const $4e424ee5dcd6d325$var$DEFAULT_MIN_HEIGHT = 0;
const $4e424ee5dcd6d325$var$DEFAULT_MAX_WIDTH = 1 / $lHxH2.SIZE_UNITS;
const $4e424ee5dcd6d325$var$DEFAULT_MAX_HEIGHT = 1 / $lHxH2.SIZE_UNITS;
const $4e424ee5dcd6d325$var$DEFAULT_COLOR_SCHEME = "interpolateBrBG";
// first value is undefined as categories are 1-indexed
const $4e424ee5dcd6d325$var$SHAPES = [
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
 */ const $4e424ee5dcd6d325$export$b4454ba0c982fa69 = (track)=>{
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
class $4e424ee5dcd6d325$var$SpecificationProcessor {
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
        this.tracks = specification.tracks.map((track)=>new $4e424ee5dcd6d325$var$Track(this, track)
        );
        const allPromises = this.tracks.map((track)=>track.dataPromise
        ).filter((p)=>p
        ); // Removes undefined
        if (this.dataPromise) allPromises.push(this.dataPromise);
        this.xScale = $cwgQF.getScaleForSpecification("x", specification);
        this.yScale = $cwgQF.getScaleForSpecification("y", specification);
        // When all tracks have acquired their data, call the callback
        // TODO: Allow tracks to be processed while waiting for others, need to keep in mind order
        Promise.all(allPromises).then(()=>callback(this)
        );
    }
    /**
   * Get the next track to process
   * @returns {@link Track}
   */ getNextTrack() {
        if (this.index >= this.tracks.length) return null;
        return this.tracks[this.index++];
    }
}
class $4e424ee5dcd6d325$var$Track {
    /**
   * Process a track from a specification by loading data and producing an iterator
   * like interface with getNextDataPoint or getNextMark.
   *
   * @param {Object} specification user defined visualization
   * @param {Object} track user defined track
   */ constructor(specification1, track){
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
        } else if (specification1.data) {
            // Track does not have its own data, but the specification has default data
            this.data = specification1.data;
            this.isInlineData = specification1.isInlineData;
            this.processHeadersAndMappers();
        } else if (specification1.dataPromise) // Track does not have its own data, but the specification is GETting default data
        specification1.dataPromise.then(()=>{
            this.data = specification1.data;
            this.processHeadersAndMappers();
        });
        else console.error(`Could not find data (no defaultData in specification and no data specified for this track) for track ${track}.`);
    }
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
        Object.keys($4e424ee5dcd6d325$export$5042da89bb9e922c).forEach((channel)=>{
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
   * Builds a function which maps an attribute value to a channel value for use by the drawer.
   * The function will return a default if not present in the track, or a constant if
   * value is defined.
   *
   * @param {String} channel one of the channels listed in default channels
   * @returns the function
   */ buildMapperForChannel = (channel)=>{
        if (channel in this.track) {
            const channelInfo = this.track[channel];
            if ("value" in channelInfo) {
                if (channel === "color") channelInfo.value = $cwgQF.colorSpecifierToHex(channelInfo.value);
                return ()=>channelInfo.value
                ;
            } else {
                const attributeIndex = this.headers.indexOf(channelInfo.attribute);
                let attrMapper;
                switch(channelInfo.type){
                    case "inline":
                        attrMapper = $4e424ee5dcd6d325$var$buildMapperForInlineChannel(channel, channelInfo);
                        break;
                    case "quantitative":
                        attrMapper = $4e424ee5dcd6d325$var$buildMapperForQuantitiveChannel(channel, channelInfo);
                        break;
                    case "categorical":
                        attrMapper = $4e424ee5dcd6d325$var$buildMapperForCategoricalChannel(channel, channelInfo);
                        break;
                    case "genomic":
                        const chrAttributeIndex = this.headers.indexOf(channelInfo.chrAttribute);
                        const geneAttributeIndex = this.headers.indexOf(channelInfo.geneAttribute);
                        attrMapper = $4e424ee5dcd6d325$var$buildMapperForGenomicChannel(channel, channelInfo);
                        return (row)=>attrMapper(row[chrAttributeIndex], row[geneAttributeIndex])
                        ;
                    case "genomicRange":
                        const genomicAttributeIndices = [
                            this.headers.indexOf(channelInfo.chrAttribute),
                            this.headers.indexOf(channelInfo.startAttribute),
                            this.headers.indexOf(channelInfo.endAttribute), 
                        ];
                        attrMapper = $4e424ee5dcd6d325$var$buildMapperForGenomicRangeChannel(channel, channelInfo);
                        return (row // Pass in values for the genomic attributes to mapper
                        )=>attrMapper(...genomicAttributeIndices.map((index)=>row[index]
                            ))
                        ;
                }
                return (row)=>attrMapper(row[attributeIndex])
                ;
            }
        } else return ()=>$4e424ee5dcd6d325$export$5042da89bb9e922c[channel].value
        ;
    };
}
/**
 * Build a function which maps an attribute that is a channel value to a compatible value.
 *
 * @param {String} channel the name of the channel to build an inline mapper for
 * @param {Object} channelInfo the info of the channel from a track
 * @returns a function that maps attribute values to appropriate channel values.
 */ const $4e424ee5dcd6d325$var$buildMapperForInlineChannel = (channel, channelInfo)=>{
    switch(channel){
        case "width":
        case "height":
        case "size":
            return (dimension)=>parseFloat(dimension)
            ;
        case "color":
            return (color)=>$cwgQF.colorSpecifierToHex(color)
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
 */ const $4e424ee5dcd6d325$var$buildMapperForQuantitiveChannel = (channel, channelInfo)=>{
    switch(channel){
        case "x":
        case "y":
            // Map x and y to itself, but we need a function to do it
            return (coord)=>parseFloat(coord)
            ;
        case "opacity":
            return $cwgQF.scale(channelInfo.domain, [
                channelInfo.minOpacity || $4e424ee5dcd6d325$var$DEFAULT_MIN_OPACITY,
                1, 
            ]);
        case "size":
            return $cwgQF.scale(channelInfo.domain, [
                channelInfo.minSize || $4e424ee5dcd6d325$var$DEFAULT_MIN_SIZE,
                channelInfo.maxSize || $4e424ee5dcd6d325$var$DEFAULT_MAX_SIZE, 
            ]);
        case "color":
            const d3colorScale = !channelInfo.colorScheme || !(channelInfo.colorScheme in $1dKPz$d3scalechromatic) ? $1dKPz$d3scalechromatic[$4e424ee5dcd6d325$var$DEFAULT_COLOR_SCHEME] : $1dKPz$d3scalechromatic[channelInfo.colorScheme];
            const zeroToOneScale = $cwgQF.scale(channelInfo.domain, [
                0,
                1
            ]);
            return (attrValue)=>$cwgQF.rgbStringToHex(d3colorScale(zeroToOneScale(attrValue)))
            ;
        case "width":
            return $cwgQF.scale(channelInfo.domain, [
                channelInfo.minWidth || $4e424ee5dcd6d325$var$DEFAULT_MIN_WIDTH,
                channelInfo.maxWidth || $4e424ee5dcd6d325$var$DEFAULT_MAX_WIDTH, 
            ]);
        case "height":
            return $cwgQF.scale(channelInfo.domain, [
                channelInfo.minHeight || $4e424ee5dcd6d325$var$DEFAULT_MIN_HEIGHT,
                channelInfo.maxHeight || $4e424ee5dcd6d325$var$DEFAULT_MAX_WIDTH, 
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
 */ const $4e424ee5dcd6d325$var$buildMapperForCategoricalChannel = (channel, channelInfo)=>{
    const categoryTracker = new Map();
    let channelScale;
    switch(channel){
        case "x":
        case "y":
            // +1 here to avoid setting x or y at a boundary that makes it not visible
            channelScale = $cwgQF.scale([
                1,
                channelInfo.cardinality + 1
            ], [
                -1,
                1
            ]);
            break;
        case "opacity":
            channelScale = $cwgQF.scale([
                1,
                channelInfo.cardinality
            ], [
                channelInfo.minOpacity || $4e424ee5dcd6d325$var$DEFAULT_MIN_OPACITY,
                1
            ]);
            break;
        case "size":
            channelScale = $cwgQF.scale([
                1,
                channelInfo.cardinality
            ], [
                channelInfo.minSize || $4e424ee5dcd6d325$var$DEFAULT_MIN_SIZE,
                channelInfo.maxSize || $4e424ee5dcd6d325$var$DEFAULT_MAX_SIZE, 
            ]);
            break;
        case "shape":
            channelScale = (categoryId)=>$4e424ee5dcd6d325$var$SHAPES[categoryId % $4e424ee5dcd6d325$var$SHAPES.length]
            ;
            break;
        case "color":
            let d3colorScale = !channelInfo.colorScheme || !(channelInfo.colorScheme in $1dKPz$d3scalechromatic) ? $1dKPz$d3scalechromatic[$4e424ee5dcd6d325$var$DEFAULT_COLOR_SCHEME] : $1dKPz$d3scalechromatic[channelInfo.colorScheme];
            if (Array.isArray(d3colorScale)) {
                console.error("Currenty only interpolating color schemes are supported, using default");
                d3colorScale = $1dKPz$d3scalechromatic[$4e424ee5dcd6d325$var$DEFAULT_COLOR_SCHEME];
            }
            const zeroToOneScale = $cwgQF.scale([
                1,
                channelInfo.cardinality
            ], [
                0,
                1
            ]);
            channelScale = (categoryId)=>$cwgQF.rgbStringToHex(d3colorScale(zeroToOneScale(categoryId)))
            ;
            break;
        case "width":
            channelScale = $cwgQF.scale([
                1,
                channelInfo.cardinality
            ], [
                channelInfo.minWidth || $4e424ee5dcd6d325$var$DEFAULT_MIN_WIDTH,
                channelInfo.maxWidth || $4e424ee5dcd6d325$var$DEFAULT_MAX_WIDTH, 
            ]);
            break;
        case "height":
            channelScale = $cwgQF.scale([
                1,
                channelInfo.cardinality
            ], [
                channelInfo.minHeight || $4e424ee5dcd6d325$var$DEFAULT_MIN_HEIGHT,
                channelInfo.maxHeight || $4e424ee5dcd6d325$var$DEFAULT_MAX_HEIGHT, 
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
 */ const $4e424ee5dcd6d325$var$buildMapperForGenomicChannel = (channel, channelInfo)=>{
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
 */ const $4e424ee5dcd6d325$var$buildMapperForGenomicRangeChannel = (channel, channelInfo)=>{
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
var $4e424ee5dcd6d325$export$9099ad97b570f7c = $4e424ee5dcd6d325$var$SpecificationProcessor;

});
parcelRequire.register("cwgQF", function(module, exports) {

$parcel$export(module.exports, "getQuadraticBezierCurveForPoints", () => $91d58af41110b8f4$export$efe3e363f63f96f8);
$parcel$export(module.exports, "rgbStringToHex", () => $91d58af41110b8f4$export$3986fc70f318d3fa);
$parcel$export(module.exports, "scale", () => $91d58af41110b8f4$export$8f869025bba9609b);
$parcel$export(module.exports, "colorSpecifierToHex", () => $91d58af41110b8f4$export$67158240fb661780);
$parcel$export(module.exports, "getScaleForSpecification", () => $91d58af41110b8f4$export$188aed5abdcaff2f);
$parcel$export(module.exports, "getViewportForSpecification", () => $91d58af41110b8f4$export$46e9b996131c895a);

var $eU3me = parcelRequire("eU3me");

/**
 * Returns a linear scale to map elements in domain to elements in range.
 * @param {Array} domain array of length two containing minimum and maximum values
 * @param {Array} range array of length two containing minimum and maximum values
 * @returns linear scale mapping domain to range
 */ function $91d58af41110b8f4$export$8f869025bba9609b(domain, range) {
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
 */ function $91d58af41110b8f4$export$630e1ce5ee2d3899(red, green, blue) {
    return red << 16 | green << 8 | blue << 0;
}
function $91d58af41110b8f4$export$3986fc70f318d3fa(rgb) {
    const colorVals = rgb.substring(4, rgb.length - 1).split(",");
    return $91d58af41110b8f4$export$630e1ce5ee2d3899(...colorVals.map((asStr)=>parseInt(asStr)
    ));
}
function $91d58af41110b8f4$export$67158240fb661780(specifier) {
    if (!isNaN(specifier)) // Specifier is already a hex value
    return Math.floor(specifier);
    const asColor = $1dKPz$color(specifier);
    return $91d58af41110b8f4$export$630e1ce5ee2d3899(asColor.r, asColor.g, asColor.b);
}
/**
 * Get the VIEWPORT of the specification to be used by the mouseReader.
 * If all types for a dimension across tracks are categorical or genomic,
 * will default to [-1, 1] for that dimension for the mouseReader. If X or Y
 * has a fixed value, it will consider the width or height channel domains.
 *
 * @param {Object} specification of visualization
 * @returns [smallestX, largestX, smallestY, largestY] of viewport
 */ function $91d58af41110b8f4$export$46e9b996131c895a(specification) {
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
 */ const $91d58af41110b8f4$export$188aed5abdcaff2f = (dimension, specification)=>{
    if (dimension !== "x" && dimension !== "y") console.error(`${dimension} is not x or y!`);
    let genomic = false;
    let genome;
    for (const track of specification.tracks)if (track[dimension].type && track[dimension].type.includes("genomic")) {
        genome = track[dimension].genome;
        genomic = true;
        break;
    }
    if (!genomic) {
        const viewport = $91d58af41110b8f4$export$46e9b996131c895a(specification);
        if (dimension === "x") return $91d58af41110b8f4$export$8f869025bba9609b([
            viewport[0],
            viewport[1]
        ], [
            -1,
            1
        ]);
        return $91d58af41110b8f4$export$8f869025bba9609b([
            viewport[2],
            viewport[3]
        ], [
            -1,
            1
        ]);
    }
    const geneScale = $eU3me.GenomeScale.completeScale(genome);
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
    const asScale = new $eU3me.GenomeScale(genome, [
        smallestGene,
        largestGene
    ]);
    return asScale.toCallable();
};
const $91d58af41110b8f4$var$RELATIVE_LENGTH_UNITS = [
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
const $91d58af41110b8f4$var$getPixelMeasurement = (cssMeasurement)=>{
    if ($91d58af41110b8f4$var$RELATIVE_LENGTH_UNITS.some((unit)=>cssMeasurement.includes(unit)
    )) return false;
    const asFloat = parseFloat(cssMeasurement);
    return isNaN(asFloat) ? false : asFloat;
};
const $91d58af41110b8f4$var$DEFAULT_MARGIN = "50px";
const $91d58af41110b8f4$export$e188b592847fff45 = "100%";
const $91d58af41110b8f4$export$f5975cfa63fb81e3 = $91d58af41110b8f4$export$e188b592847fff45;
const $91d58af41110b8f4$export$53e363f12e080be2 = (specification)=>{
    let toReturn = {
    };
    const calculatedMargins = {
    };
    if (specification.margins === undefined) {
        toReturn.margin = $91d58af41110b8f4$var$DEFAULT_MARGIN;
        calculatedMargins.top = $91d58af41110b8f4$var$DEFAULT_MARGIN;
        calculatedMargins.right = $91d58af41110b8f4$var$DEFAULT_MARGIN;
        calculatedMargins.bottom = $91d58af41110b8f4$var$DEFAULT_MARGIN;
        calculatedMargins.left = $91d58af41110b8f4$var$DEFAULT_MARGIN;
    } else {
        calculatedMargins.top = specification.margins.top === undefined ? $91d58af41110b8f4$var$DEFAULT_MARGIN : specification.margins.top;
        calculatedMargins.right = specification.margins.right === undefined ? $91d58af41110b8f4$var$DEFAULT_MARGIN : specification.margins.right;
        calculatedMargins.bottom = specification.margins.bottom === undefined ? $91d58af41110b8f4$var$DEFAULT_MARGIN : specification.margins.bottom;
        calculatedMargins.left = specification.margins.left === undefined ? $91d58af41110b8f4$var$DEFAULT_MARGIN : specification.margins.left;
        // Shorthand for top right bottom left
        toReturn.margin = `${calculatedMargins.top}\n                       ${calculatedMargins.right}\n                       ${calculatedMargins.bottom}\n                       ${calculatedMargins.left}`;
    }
    const calculatedWidth = specification.width || $91d58af41110b8f4$export$e188b592847fff45;
    const calculatedHeight = specification.height || $91d58af41110b8f4$export$f5975cfa63fb81e3;
    const allMeasurements = [
        calculatedMargins.top,
        calculatedMargins.right,
        calculatedMargins.bottom,
        calculatedMargins.left,
        calculatedWidth,
        calculatedHeight, 
    ];
    if (allMeasurements.every($91d58af41110b8f4$var$getPixelMeasurement)) {
        // Let's encode as a number to allow users using typescript or doing weird DOM things able to define
        // the width and height explicitly
        toReturn.width = $91d58af41110b8f4$var$getPixelMeasurement(calculatedWidth) - $91d58af41110b8f4$var$getPixelMeasurement(calculatedMargins.left) - $91d58af41110b8f4$var$getPixelMeasurement(calculatedMargins.right);
        toReturn.height = $91d58af41110b8f4$var$getPixelMeasurement(calculatedHeight) - $91d58af41110b8f4$var$getPixelMeasurement(calculatedMargins.bottom) - $91d58af41110b8f4$var$getPixelMeasurement(calculatedMargins.top);
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
 */ const $91d58af41110b8f4$export$efe3e363f63f96f8 = (P0, P1, P2)=>{
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
parcelRequire.register("eU3me", function(module, exports) {

$parcel$export(module.exports, "GenomeScale", () => $ad98e66717095c47$export$6b472c3672dd1154);

var $cwgQF = parcelRequire("cwgQF");

/**
 * Create a function which maps a genome pair to a location in the entire genome
 *
 * @param {String} genomeId key from genomeSizes object
 * @returns a function which maps a (chrId, pairNum) => to
 *  a number between 1 and total number of genes in the genome
 */ const $ad98e66717095c47$var$createPairMapperToGenome = (genomeId)=>{
    let chrSizes = $ad98e66717095c47$export$20b4bea6c5703d74[genomeId];
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
class $ad98e66717095c47$export$6b472c3672dd1154 {
    /**
   * A scale used to map a genome pair to a location between -1 and 1 for data visualization.
   * Also contains inverse and utility functions for getting labels for axis.
   *
   * @param {String} genomeId key from genomeSizes object
   * @param {Array} domain array of length 2 containing the start and end of the genome
   *   for the scale. ex: ["chr2:1000", "chr3:2000"]
   */ constructor(genomeId1, domain){
        if ($ad98e66717095c47$export$20b4bea6c5703d74[genomeId1] === undefined) console.error(`${genomeId1} is not a recognized genome!`);
        this.genomeId = genomeId1;
        this.domain = domain;
        let [startChr, startPair] = domain[0].substring(3) // Remove chr
        .split(":"); // split chromesome and pair number
        startPair = parseInt(startPair);
        let [endChr, endPair] = domain[1].substring(3).split(":");
        endPair = parseInt(endPair);
        this.mapPairToGenomeIndex = $ad98e66717095c47$var$createPairMapperToGenome(genomeId1);
        const firstPairInDomain = this.mapPairToGenomeIndex(startChr, startPair);
        const lastPairInDomain = this.mapPairToGenomeIndex(endChr, endPair);
        this.mapGenomeIndexToClipSpace = $cwgQF.scale([
            firstPairInDomain,
            lastPairInDomain
        ], [
            -1,
            1
        ]);
        this.mapGenomeIndexToClipSpaceInverse = $cwgQF.scale([
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
        for (const [chrKey, pairCount] of $ad98e66717095c47$export$20b4bea6c5703d74[this.genomeId].entries()){
            if (cumulativeTotal + pairCount >= genomeSpot) {
                chrLoc = genomeSpot - cumulativeTotal;
                chrId = chrKey;
                break;
            }
            cumulativeTotal += pairCount;
        }
        return formatting ? `chr${chrId}:${$1dKPz$format(formatting)(chrLoc)}` : `chr${chrId}:${chrLoc}`;
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
            suggestedFormat = $1dKPz$precisionRound(10 ** magnitude, startingValue);
            for(let currValue = startingValue; currValue < endPair1; currValue += 10 ** magnitude)toReturn.push(this.toClipSpaceFromParts(startChr1, currValue));
        } else {
            suggestedFormat = "1";
            for (const chrId of $ad98e66717095c47$export$20b4bea6c5703d74[this.genomeId].keys())toReturn.push(this.toClipSpaceFromParts(chrId, 1));
        }
        return {
            tickCoords: toReturn,
            tickLabels: toReturn.map((coord)=>this.inverse(coord, $1dKPz$format(`.${suggestedFormat}s`))
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
        const chrSizes = $ad98e66717095c47$export$20b4bea6c5703d74[genomeId];
        const finalEntry = [
            ...chrSizes.entries()
        ][chrSizes.size - 1];
        return new $ad98e66717095c47$export$6b472c3672dd1154(genomeId, [
            "chr1:1",
            `chr${finalEntry[0]}:${finalEntry[1]}`, 
        ]);
    }
}
/**
 * Available genomes to visualize. Each genome is a map from chromosome id to number of genes in chromosome.
 * Order matters as maps remember insertion order.
 */ const $ad98e66717095c47$export$20b4bea6c5703d74 = {
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


parcelRequire.register("lHxH2", function(module, exports) {

$parcel$export(module.exports, "transformGenomicRangeToStandard", () => $fcc7bfe13e494784$export$deffddcd0648cf24);
$parcel$export(module.exports, "SIZE_UNITS", () => $fcc7bfe13e494784$export$9bd3ccadedfeb53b);
$parcel$export(module.exports, "default", () => $fcc7bfe13e494784$export$9099ad97b570f7c);
$parcel$export(module.exports, "transformGenomicRangeArcToStandard", () => $fcc7bfe13e494784$export$b42830896852e422);

var $6Izoz = parcelRequire("6Izoz");

var $cwgQF = parcelRequire("cwgQF");
// Each size unit refers to 1/200 of the clip space
// e.g. if the canvas is 1000x1000 pixels, and the size value for a mark
// is 10, then that mark takes up 10/200 = 1/20 of the clip space which
// is equal to 50 pixels
const $fcc7bfe13e494784$export$9bd3ccadedfeb53b = 0.01;
const $fcc7bfe13e494784$var$NUMBER_OF_VERTICES_PER_ARC = 20;
const $fcc7bfe13e494784$var$ARC_HEIGHT_MODIFIER = 10;
/**
 * Get a curve representing the arc with given start and end points
 *
 * https://math.stackexchange.com/a/1484684
 *
 * @param {Array} P0 start of arc
 * @param {Array} P2 end of arc
 * @returns function mapping 0 to beginning of arc, and 1 to end of arc
 */ const $fcc7bfe13e494784$var$getCurveForArc = (P0, P2)=>{
    const midpoint = [
        P0[0] / 2 + P2[0] / 2,
        P0[1] / 2 + P2[1] / 2
    ];
    const slope = (P2[1] - P0[1]) / (P2[0] - P0[0]);
    const distance = Math.sqrt((P2[1] - P0[1]) ** 2 + (P2[0] - P0[0]) ** 2);
    if (!isFinite(slope)) // vertical slope
    return $cwgQF.getQuadraticBezierCurveForPoints(P0, [
        P0[0] - distance,
        midpoint[1]
    ], P2);
    const parameterized = (t)=>[
            midpoint[0] + t / distance * (P0[1] - P2[1]),
            midpoint[1] + t / distance * (P2[0] - P0[0]), 
        ]
    ;
    return $cwgQF.getQuadraticBezierCurveForPoints(P0, parameterized(distance * $fcc7bfe13e494784$var$ARC_HEIGHT_MODIFIER), P2);
};
/**
 * Transform a mark with a range for coordinates into a simpler mark to draw.
 *
 * @param {Object} mark that contains ranges for x or y
 * @returns mark with fixed x and y but with appropriate width and height for drawing
 */ const $fcc7bfe13e494784$export$deffddcd0648cf24 = (mark, xScale, yScale)=>{
    let x, y, width, height;
    if (Array.isArray(mark.x)) {
        let x1 = xScale(mark.x[0]);
        x = mark.x[0];
        width = (xScale(mark.x[1]) - x1) / $fcc7bfe13e494784$export$9bd3ccadedfeb53b;
    } else {
        x = mark.x;
        width = mark.width;
    }
    if (Array.isArray(mark.y)) {
        let y1 = yScale(mark.y[0]);
        y = mark.y[0];
        height = (yScale(mark.y[1]) - y1) / $fcc7bfe13e494784$export$9bd3ccadedfeb53b;
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
 */ const $fcc7bfe13e494784$export$b42830896852e422 = (mark, xScale, yScale)=>{
    let x, y, width, height;
    if (Array.isArray(mark.x)) {
        x = xScale.getMidpoint(mark.x[0][0], mark.x[0][1], mark.x[1][0], mark.x[1][1]);
        let x2 = xScale.getMidpoint(mark.width[0][0], mark.width[0][1], mark.width[1][0], mark.width[1][1]);
        let x1ClipSpace = xScale(x);
        let x2ClipSpace = xScale(x2);
        x = x1ClipSpace < x2ClipSpace ? x : x2;
        width = Math.abs(xScale(x2) - x1ClipSpace) / $fcc7bfe13e494784$export$9bd3ccadedfeb53b;
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
        height = Math.abs(yScale(y2) - y1ClipSpace) / $fcc7bfe13e494784$export$9bd3ccadedfeb53b;
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
class $fcc7bfe13e494784$var$VertexCalculator {
    /**
   * A class used to construct the vertices of marks that are given to the drawer to draw.
   *
   * @param {Function or GenomeScale} xScale maps the x values of the data to clip space [-1, 1]
   * @param {Function or GenomeScale} yScale maps the y values of the data to clip space [-1, 1]
   * @param {Object} track from specification
   */ constructor(xScale, yScale, track){
        this.xScale = xScale;
        this.yScale = yScale;
        this.track = track;
        this.drawMode = $6Izoz.getDrawModeForTrack(track);
    }
    /**
   * Construct the vertices of a mark.
   *
   * @param {Object} mark to draw
   * @returns vertices of mark
   */ calculateForMark(mark) {
        if (this.track.x.type === "genomicRange" || this.track.y.type === "genomicRange") {
            if (this.track.mark === "arc") return this._calculateForMark($fcc7bfe13e494784$export$b42830896852e422(mark, this.xScale, this.yScale));
            return this._calculateForMark($fcc7bfe13e494784$export$deffddcd0648cf24(mark, this.xScale, this.yScale));
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
        const quadraticCurve = $fcc7bfe13e494784$var$getCurveForArc(startPoint, [
            startPoint[0] + mark.width * $fcc7bfe13e494784$export$9bd3ccadedfeb53b,
            startPoint[1] + mark.height * $fcc7bfe13e494784$export$9bd3ccadedfeb53b, 
        ]);
        const vertices = [
            ...quadraticCurve(0),
            ...quadraticCurve(1 / $fcc7bfe13e494784$var$NUMBER_OF_VERTICES_PER_ARC), 
        ];
        for(let i = 2; i < $fcc7bfe13e494784$var$NUMBER_OF_VERTICES_PER_ARC + 1; i++){
            const nextPoint = quadraticCurve(i / $fcc7bfe13e494784$var$NUMBER_OF_VERTICES_PER_ARC);
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
        for(let theta = 0; theta < 2 * Math.PI; theta += 2 * Math.PI / sides)vertices.push(center[0], center[1], center[0] + mark.size / 2 * Math.cos(theta) * $fcc7bfe13e494784$export$9bd3ccadedfeb53b, center[1] + mark.size / 2 * Math.sin(theta) * $fcc7bfe13e494784$export$9bd3ccadedfeb53b, center[0] + mark.size / 2 * Math.cos(theta + 2 * Math.PI / sides) * $fcc7bfe13e494784$export$9bd3ccadedfeb53b, center[1] + mark.size / 2 * Math.sin(theta + 2 * Math.PI / sides) * $fcc7bfe13e494784$export$9bd3ccadedfeb53b);
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
            center[1] + mark.size / 2 * $fcc7bfe13e494784$export$9bd3ccadedfeb53b,
            center[0] - mark.size / 2 * $fcc7bfe13e494784$export$9bd3ccadedfeb53b,
            center[1] - mark.size / 2 * $fcc7bfe13e494784$export$9bd3ccadedfeb53b,
            center[0] + mark.size / 2 * $fcc7bfe13e494784$export$9bd3ccadedfeb53b,
            center[1] - mark.size / 2 * $fcc7bfe13e494784$export$9bd3ccadedfeb53b, 
        ];
    }
    _getVertexForDot = (mark)=>this._mapToGPUSpace([
            mark.x,
            mark.y
        ])
    ;
    _getVerticesForSquare(mark) {
        const center = this._mapToGPUSpace([
            mark.x,
            mark.y
        ]);
        return [
            center[0] + mark.size / 2 * $fcc7bfe13e494784$export$9bd3ccadedfeb53b,
            center[1] + mark.size / 2 * $fcc7bfe13e494784$export$9bd3ccadedfeb53b,
            center[0] - mark.size / 2 * $fcc7bfe13e494784$export$9bd3ccadedfeb53b,
            center[1] + mark.size / 2 * $fcc7bfe13e494784$export$9bd3ccadedfeb53b,
            center[0] - mark.size / 2 * $fcc7bfe13e494784$export$9bd3ccadedfeb53b,
            center[1] - mark.size / 2 * $fcc7bfe13e494784$export$9bd3ccadedfeb53b,
            center[0] + mark.size / 2 * $fcc7bfe13e494784$export$9bd3ccadedfeb53b,
            center[1] + mark.size / 2 * $fcc7bfe13e494784$export$9bd3ccadedfeb53b,
            center[0] - mark.size / 2 * $fcc7bfe13e494784$export$9bd3ccadedfeb53b,
            center[1] - mark.size / 2 * $fcc7bfe13e494784$export$9bd3ccadedfeb53b,
            center[0] + mark.size / 2 * $fcc7bfe13e494784$export$9bd3ccadedfeb53b,
            center[1] - mark.size / 2 * $fcc7bfe13e494784$export$9bd3ccadedfeb53b, 
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
            center[1] + mark.height * $fcc7bfe13e494784$export$9bd3ccadedfeb53b,
            center[0],
            center[1],
            center[0] + mark.width * $fcc7bfe13e494784$export$9bd3ccadedfeb53b,
            center[1] + mark.height * $fcc7bfe13e494784$export$9bd3ccadedfeb53b,
            center[0] + mark.width * $fcc7bfe13e494784$export$9bd3ccadedfeb53b,
            center[1],
            center[0],
            center[1],
            center[0] + mark.width * $fcc7bfe13e494784$export$9bd3ccadedfeb53b,
            center[1] + mark.height * $fcc7bfe13e494784$export$9bd3ccadedfeb53b, 
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
            center[0] + mark.width * $fcc7bfe13e494784$export$9bd3ccadedfeb53b,
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
            center[1] + mark.height * $fcc7bfe13e494784$export$9bd3ccadedfeb53b, 
        ];
    }
}
var $fcc7bfe13e494784$export$9099ad97b570f7c = $fcc7bfe13e494784$var$VertexCalculator;

});



//# sourceMappingURL=offscreen-webgl-worker.e8c441ad.js.map
