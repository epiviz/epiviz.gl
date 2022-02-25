(() => {
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
importScripts("./offscreen-webgl-worker.b84f847f.js");
var $4b38ca3075b6652b$exports = {};
class $b3ee822286cbd4a9$var$Drawer {
    /**
   * Method to set the viewport for the drawer.
   *
   * @param {Object} viewportData object containing minX,maxX,minY,maxY,xRange,yRange viewport data for drawer
   */ receiveViewport(viewportData) {
        this.minX = viewportData.minX;
        this.maxX = viewportData.maxX;
        this.minY = viewportData.minY;
        this.maxY = viewportData.maxY;
        this.currentXRange = viewportData.xRange;
        this.currentYRange = viewportData.yRange;
        this.needsAnimation = true;
    }
    /**
   * Method to implement which signifies a frame has been processed. Used to
   * display FPS meter.
   */ tick() {
    }
    /**
   * Method to implement animating a frame.
   */ animate() {
    }
    /**
   * Method to implement preprocessing for rendering frames.
   */ render() {
        if (this.lastFrame) // Avoid overlapping animation requests
        cancelAnimationFrame(this.lastFrame);
    }
    /**
   * An interface for drawing on a canvas.
   *
   * @param {Object} drawingData object containing keys for {@link Drawer#receiveViewport}
   *  and canvas key used for drawing.
   */ constructor(drawingData){
        this.canvas = drawingData.canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.receiveViewport(drawingData);
    }
}
var $b3ee822286cbd4a9$export$2e2bcd8739ae039 = $b3ee822286cbd4a9$var$Drawer;



var $js2wE = parcelRequire("js2wE");

var $bCvgp = parcelRequire("bCvgp");

var $jk5q7 = parcelRequire("jk5q7");
const $84ac2ef2a1b629f5$var$sizeOfGeneRangeForTriangles = 1000000;
class $84ac2ef2a1b629f5$var$SemanticZoomer {
    getRecommendedDrawingMode(trackShader, currentXRange, currentYRange) {
        if (trackShader.drawMode !== "TRIANGLES") return trackShader.drawMode;
        if (!this.specificationHelper.xScale.isGenomeScale && !this.specificationHelper.yScale.isGenomeScale) // Currently only used for genome tracks
        return "TRIANGLES";
        if (this.specificationHelper.xScale.isGenomeScale) {
            const numberOfGenes = this.specificationHelper.xScale.mapGenomeIndexToClipSpaceInverse(currentXRange[1]) - this.specificationHelper.xScale.mapGenomeIndexToClipSpaceInverse(currentXRange[0]);
            if (numberOfGenes < $84ac2ef2a1b629f5$var$sizeOfGeneRangeForTriangles) return "TRIANGLES";
        }
        if (this.specificationHelper.yScale.isGenomeScale) {
            const numberOfGenes = this.specificationHelper.yScale.mapGenomeIndexToClipSpaceInverse(currentYRange[1]) - this.specificationHelper.yScale.mapGenomeIndexToClipSpaceInverse(currentYRange[0]);
            if (numberOfGenes < $84ac2ef2a1b629f5$var$sizeOfGeneRangeForTriangles) return "TRIANGLES";
        }
        return "LINES";
    }
    /**
   * Gives guidance or takes control over canvas when semantic zooming
   * is necessary. Developers should extend this class to create semantic zooming
   * behavior.
   * @param {SpecificationProcessor} specificationHelper
   */ constructor(specificationHelper){
        this.specificationHelper = specificationHelper;
    }
}
var $84ac2ef2a1b629f5$export$2e2bcd8739ae039 = $84ac2ef2a1b629f5$var$SemanticZoomer;



var $62PgM = parcelRequire("62PgM");

var $js2wE = parcelRequire("js2wE");

var $bCvgp = parcelRequire("bCvgp");
/**
 * A vertex shader meant to take in positions, colors, and contain uniforms for zooming and panning.
 */ const $da57cf3d530b431d$var$baseVertexShader = `#version 300 es
  precision highp float;

  in vec2 a_VertexPosition;

  uniform float pointSizeModifier;
  // [x1, y1,x2, y2] of viewing window
  uniform vec4 viewport;

  out vec4 vColor;
`;
/**
 * Appended to end of vertex shader. Includes math for zooming and panning,
 * ability to unpack colors and send to fragment shader.
 */ const $da57cf3d530b431d$var$vertexShaderSuffix = (opacityName, colorName, sizeName)=>`
  vec3 unpackColor(float f) {
    vec3 colorVec;
    colorVec.r = floor(f / 65536.0);
    colorVec.g = floor((f - colorVec.r * 65536.0) / 256.0);
    colorVec.b = floor(f - colorVec.r * 65536.0 - colorVec.g * 256.0);
    return colorVec / 256.0;
  }

  void main(void) {
    // Subtract each vertex by midpoint of the viewport 
    // window to center points. Then scale by ratio of max window size to window size
    gl_Position = vec4(
       (a_VertexPosition.x - (viewport.z + viewport.x)/2.0) * 2.0/(viewport.z - viewport.x),
       (a_VertexPosition.y - (viewport.w + viewport.y)/2.0) * 2.0/(viewport.w - viewport.y),
        0,
        1
    );
    vec3 unpackedValues = unpackColor(${colorName});

    vColor = vec4(
      unpackedValues.rgb,
      ${opacityName}
    );
    gl_PointSize = ${sizeName} * pointSizeModifier;
  }
`
;
/**
 * A fragment shader which chooses color simply passed to by vertex shader.
 */ const $da57cf3d530b431d$export$87739b796d5a055c = `#version 300 es
  precision highp float;

  in vec4 vColor;

  out vec4 outColor;

  void main(void) {
    // outColor = vColor;
    float d = distance(gl_PointCoord, vec2(0.5, 0.5));
    
    if(d < .5) { 
        outColor = vColor;
    }
    else { discard; }
  }
`;
class $da57cf3d530b431d$export$cb28509c217600d2 {
    /**
   * Add a mark to the buffers by calculating its vertices, then adding its
   * attributes such as size, color, or opacity to the buffers.
   *
   * @param {Object} mark passed in from SpecificationHelper in webgl-drawer.js
   * @param {VertexCalculator} vertexCalculator used to calculate vertices for a track
   */ addMarkToBuffers(mark, vertexCalculator) {
        const vertices = vertexCalculator.calculateForMark(mark);
        this.attributes.a_VertexPosition.data.push(...vertices);
        for (const channel of Object.keys(this.attributes)){
            if (channel === "a_VertexPosition") continue;
            for(let i = 0; i < vertices.length / 2; i++)this.attributes[channel].data.push(mark[channel.substring(2)]); // Remove "a_" prefix
        }
        this.lastMark = mark;
    }
    /**
   * Set the webgl draw mode to use
   * @param {String} drawMode
   */ setDrawMode(drawMode) {
        this.drawMode = drawMode;
    }
    /**
   * Signify this channel varies from mark to mark, so build buffers to carry this info
   * for the program. Also add desclaration to shader code.
   *
   * @param {String} channel such as opacity, color, size
   * @param {Number} numComponents number of components of this attribute to pull in, usually 1
   * @returns this
   */ addChannelBuffer(channel, numComponents = 1) {
        this.attributes[`a_${channel}`] = {
            numComponents: numComponents,
            data: []
        };
        this.shader += `in float a_${channel};\n`;
        return this;
    }
    /**
   * Signify this channel is the same for every mark, so set a uniform to refer to.
   *
   * @param {String} channel such as opacity, color, size
   * @param {Number} uniform value to set uniform to, must be a float
   * @returns this
   */ setChannelUniform(channel, uniform) {
        this.uniforms[`u_${channel}`] = uniform;
        this.shader += `uniform float u_${channel};\n`;
        return this;
    }
    /**
   * Build the shader code after uniforms and attributes have been finalized.
   *
   * @returns shader code to compile
   */ buildShader() {
        // Assumes color, opacity, size channels have been used in
        // addChannelBuffer or addChannelUniform
        if (this.built) return this.shader;
        const colorName = "a_color" in this.attributes ? "a_color" : "u_color";
        const opacityName = "a_opacity" in this.attributes ? "a_opacity" : "u_opacity";
        const sizeName = "a_size" in this.attributes ? "a_size" : "u_size";
        this.shader += $da57cf3d530b431d$var$vertexShaderSuffix(opacityName, colorName, sizeName);
        this.built = true;
        return this.shader;
    }
    /**
   * Construct the vertex shaders for each track in the specification.
   *
   * @param {Object} specification of visualization
   * @returns an array of {@link VertexShaders}s
   */ static fromSpecification(specification) {
        // Returns one per track
        return specification.tracks.map($da57cf3d530b431d$export$cb28509c217600d2.fromTrack);
    }
    /**
   * Construct the vertex shader a track including setting attributes, uniforms, drawMode.
   *
   * @param {Object} track from specification
   * @returns a {@link VertexShaders}
   */ static fromTrack(track) {
        // Given a track produce attributes and uniforms that describe a webgl drawing
        const vsBuilder = new $da57cf3d530b431d$export$cb28509c217600d2();
        vsBuilder.setDrawMode($js2wE.getDrawModeForTrack(track));
        for (let channel of Object.keys($js2wE.DEFAULT_CHANNELS)){
            if (channel === "shape") continue;
            if (channel in track) {
                // Specification specifies channel
                if (track[channel].value) {
                    // Channel has default value
                    if (channel === "color") track[channel].value = $bCvgp.colorSpecifierToHex(track[channel].value);
                    vsBuilder.setChannelUniform(channel, track[channel].value);
                } else {
                    // Set Channel as attribute, x and y will always reach here
                    if (channel === "y" || channel === "x") continue;
                    // These are currently the only supported channels for shader usage
                    if ($da57cf3d530b431d$export$cb28509c217600d2.SUPPORTED_CHANNEL_ATTRIBUTES.includes(channel)) vsBuilder.addChannelBuffer(channel, $js2wE.DEFAULT_CHANNELS[channel].numComponents);
                }
            } else // Channel not listed, set default
            if ($da57cf3d530b431d$export$cb28509c217600d2.SUPPORTED_CHANNEL_ATTRIBUTES.includes(channel)) vsBuilder.setChannelUniform(channel, $js2wE.DEFAULT_CHANNELS[channel].value);
        }
        return vsBuilder;
    }
    /**
   * A class meant to contain all the relevant information for a shader program, such as uniforms
   * attributes, and ultimately the vertices. Do not use the constructor. Use VertexShader.fromSpecification
   * or fromTrack instead.
   */ constructor(){
        this.shader = $da57cf3d530b431d$var$baseVertexShader;
        this.uniforms = {
        };
        // Add position buffers here since x and y channels don't map nicely to shader code
        this.attributes = {
            a_VertexPosition: {
                numComponents: 2,
                data: []
            }
        };
    }
}
$62PgM.defineProperty($da57cf3d530b431d$export$cb28509c217600d2, "SUPPORTED_CHANNEL_ATTRIBUTES", Object.freeze([
    "color",
    "size",
    "opacity", 
]));


/* @license twgl.js 4.21.2 Copyright (c) 2015, Gregg Tavares All Rights Reserved.
Available via the MIT license.
see: http://github.com/greggman/twgl.js for details */ /*
 * Copyright 2019 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */ /**
 *
 * Vec3 math math functions.
 *
 * Almost all functions take an optional `dst` argument. If it is not passed in the
 * functions will create a new Vec3. In other words you can do this
 *
 *     var v = v3.cross(v1, v2);  // Creates a new Vec3 with the cross product of v1 x v2.
 *
 * or
 *
 *     var v = v3.create();
 *     v3.cross(v1, v2, v);  // Puts the cross product of v1 x v2 in v
 *
 * The first style is often easier but depending on where it's used it generates garbage where
 * as there is almost never allocation with the second style.
 *
 * It is always save to pass any vector as the destination. So for example
 *
 *     v3.cross(v1, v2, v1);  // Puts the cross product of v1 x v2 in v1
 *
 * @module twgl/v3
 */ let $df29a836a27602ed$var$VecType = Float32Array;
/**
 * A JavaScript array with 3 values or a Float32Array with 3 values.
 * When created by the library will create the default type which is `Float32Array`
 * but can be set by calling {@link module:twgl/v3.setDefaultType}.
 * @typedef {(number[]|Float32Array)} Vec3
 * @memberOf module:twgl/v3
 */ /**
 * Sets the type this library creates for a Vec3
 * @param {constructor} ctor the constructor for the type. Either `Float32Array` or `Array`
 * @return {constructor} previous constructor for Vec3
 * @memberOf module:twgl/v3
 */ function $df29a836a27602ed$var$setDefaultType(ctor) {
    const oldType = $df29a836a27602ed$var$VecType;
    $df29a836a27602ed$var$VecType = ctor;
    return oldType;
}
/**
 * Creates a vec3; may be called with x, y, z to set initial values.
 * @param {number} [x] Initial x value.
 * @param {number} [y] Initial y value.
 * @param {number} [z] Initial z value.
 * @return {module:twgl/v3.Vec3} the created vector
 * @memberOf module:twgl/v3
 */ function $df29a836a27602ed$var$create(x, y, z) {
    const dst = new $df29a836a27602ed$var$VecType(3);
    if (x) dst[0] = x;
    if (y) dst[1] = y;
    if (z) dst[2] = z;
    return dst;
}
/**
 * Adds two vectors; assumes a and b have the same dimension.
 * @param {module:twgl/v3.Vec3} a Operand vector.
 * @param {module:twgl/v3.Vec3} b Operand vector.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} A vector tha tis the sum of a and b.
 * @memberOf module:twgl/v3
 */ function $df29a836a27602ed$var$add(a, b, dst) {
    dst = dst || new $df29a836a27602ed$var$VecType(3);
    dst[0] = a[0] + b[0];
    dst[1] = a[1] + b[1];
    dst[2] = a[2] + b[2];
    return dst;
}
/**
 * Subtracts two vectors.
 * @param {module:twgl/v3.Vec3} a Operand vector.
 * @param {module:twgl/v3.Vec3} b Operand vector.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} A vector that is the difference of a and b.
 * @memberOf module:twgl/v3
 */ function $df29a836a27602ed$var$subtract(a, b, dst) {
    dst = dst || new $df29a836a27602ed$var$VecType(3);
    dst[0] = a[0] - b[0];
    dst[1] = a[1] - b[1];
    dst[2] = a[2] - b[2];
    return dst;
}
/**
 * Performs linear interpolation on two vectors.
 * Given vectors a and b and interpolation coefficient t, returns
 * a + t * (b - a).
 * @param {module:twgl/v3.Vec3} a Operand vector.
 * @param {module:twgl/v3.Vec3} b Operand vector.
 * @param {number} t Interpolation coefficient.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} The linear interpolated result.
 * @memberOf module:twgl/v3
 */ function $df29a836a27602ed$var$lerp(a, b, t, dst) {
    dst = dst || new $df29a836a27602ed$var$VecType(3);
    dst[0] = a[0] + t * (b[0] - a[0]);
    dst[1] = a[1] + t * (b[1] - a[1]);
    dst[2] = a[2] + t * (b[2] - a[2]);
    return dst;
}
/**
 * Performs linear interpolation on two vectors.
 * Given vectors a and b and interpolation coefficient vector t, returns
 * a + t * (b - a).
 * @param {module:twgl/v3.Vec3} a Operand vector.
 * @param {module:twgl/v3.Vec3} b Operand vector.
 * @param {module:twgl/v3.Vec3} t Interpolation coefficients vector.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} the linear interpolated result.
 * @memberOf module:twgl/v3
 */ function $df29a836a27602ed$var$lerpV(a, b, t, dst) {
    dst = dst || new $df29a836a27602ed$var$VecType(3);
    dst[0] = a[0] + t[0] * (b[0] - a[0]);
    dst[1] = a[1] + t[1] * (b[1] - a[1]);
    dst[2] = a[2] + t[2] * (b[2] - a[2]);
    return dst;
}
/**
 * Return max values of two vectors.
 * Given vectors a and b returns
 * [max(a[0], b[0]), max(a[1], b[1]), max(a[2], b[2])].
 * @param {module:twgl/v3.Vec3} a Operand vector.
 * @param {module:twgl/v3.Vec3} b Operand vector.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} The max components vector.
 * @memberOf module:twgl/v3
 */ function $df29a836a27602ed$var$max(a, b, dst) {
    dst = dst || new $df29a836a27602ed$var$VecType(3);
    dst[0] = Math.max(a[0], b[0]);
    dst[1] = Math.max(a[1], b[1]);
    dst[2] = Math.max(a[2], b[2]);
    return dst;
}
/**
 * Return min values of two vectors.
 * Given vectors a and b returns
 * [min(a[0], b[0]), min(a[1], b[1]), min(a[2], b[2])].
 * @param {module:twgl/v3.Vec3} a Operand vector.
 * @param {module:twgl/v3.Vec3} b Operand vector.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} The min components vector.
 * @memberOf module:twgl/v3
 */ function $df29a836a27602ed$var$min(a, b, dst) {
    dst = dst || new $df29a836a27602ed$var$VecType(3);
    dst[0] = Math.min(a[0], b[0]);
    dst[1] = Math.min(a[1], b[1]);
    dst[2] = Math.min(a[2], b[2]);
    return dst;
}
/**
 * Multiplies a vector by a scalar.
 * @param {module:twgl/v3.Vec3} v The vector.
 * @param {number} k The scalar.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} The scaled vector.
 * @memberOf module:twgl/v3
 */ function $df29a836a27602ed$var$mulScalar(v, k, dst) {
    dst = dst || new $df29a836a27602ed$var$VecType(3);
    dst[0] = v[0] * k;
    dst[1] = v[1] * k;
    dst[2] = v[2] * k;
    return dst;
}
/**
 * Divides a vector by a scalar.
 * @param {module:twgl/v3.Vec3} v The vector.
 * @param {number} k The scalar.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} The scaled vector.
 * @memberOf module:twgl/v3
 */ function $df29a836a27602ed$var$divScalar(v, k, dst) {
    dst = dst || new $df29a836a27602ed$var$VecType(3);
    dst[0] = v[0] / k;
    dst[1] = v[1] / k;
    dst[2] = v[2] / k;
    return dst;
}
/**
 * Computes the cross product of two vectors; assumes both vectors have
 * three entries.
 * @param {module:twgl/v3.Vec3} a Operand vector.
 * @param {module:twgl/v3.Vec3} b Operand vector.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} The vector of a cross b.
 * @memberOf module:twgl/v3
 */ function $df29a836a27602ed$var$cross(a, b, dst) {
    dst = dst || new $df29a836a27602ed$var$VecType(3);
    const t1 = a[2] * b[0] - a[0] * b[2];
    const t2 = a[0] * b[1] - a[1] * b[0];
    dst[0] = a[1] * b[2] - a[2] * b[1];
    dst[1] = t1;
    dst[2] = t2;
    return dst;
}
/**
 * Computes the dot product of two vectors; assumes both vectors have
 * three entries.
 * @param {module:twgl/v3.Vec3} a Operand vector.
 * @param {module:twgl/v3.Vec3} b Operand vector.
 * @return {number} dot product
 * @memberOf module:twgl/v3
 */ function $df29a836a27602ed$var$dot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}
/**
 * Computes the length of vector
 * @param {module:twgl/v3.Vec3} v vector.
 * @return {number} length of vector.
 * @memberOf module:twgl/v3
 */ function $df29a836a27602ed$var$length$1(v) {
    return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
}
/**
 * Computes the square of the length of vector
 * @param {module:twgl/v3.Vec3} v vector.
 * @return {number} square of the length of vector.
 * @memberOf module:twgl/v3
 */ function $df29a836a27602ed$var$lengthSq(v) {
    return v[0] * v[0] + v[1] * v[1] + v[2] * v[2];
}
/**
 * Computes the distance between 2 points
 * @param {module:twgl/v3.Vec3} a vector.
 * @param {module:twgl/v3.Vec3} b vector.
 * @return {number} distance between a and b
 * @memberOf module:twgl/v3
 */ function $df29a836a27602ed$var$distance(a, b) {
    const dx = a[0] - b[0];
    const dy = a[1] - b[1];
    const dz = a[2] - b[2];
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
}
/**
 * Computes the square of the distance between 2 points
 * @param {module:twgl/v3.Vec3} a vector.
 * @param {module:twgl/v3.Vec3} b vector.
 * @return {number} square of the distance between a and b
 * @memberOf module:twgl/v3
 */ function $df29a836a27602ed$var$distanceSq(a, b) {
    const dx = a[0] - b[0];
    const dy = a[1] - b[1];
    const dz = a[2] - b[2];
    return dx * dx + dy * dy + dz * dz;
}
/**
 * Divides a vector by its Euclidean length and returns the quotient.
 * @param {module:twgl/v3.Vec3} a The vector.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} The normalized vector.
 * @memberOf module:twgl/v3
 */ function $df29a836a27602ed$var$normalize(a, dst) {
    dst = dst || new $df29a836a27602ed$var$VecType(3);
    const lenSq = a[0] * a[0] + a[1] * a[1] + a[2] * a[2];
    const len = Math.sqrt(lenSq);
    if (len > 0.00001) {
        dst[0] = a[0] / len;
        dst[1] = a[1] / len;
        dst[2] = a[2] / len;
    } else {
        dst[0] = 0;
        dst[1] = 0;
        dst[2] = 0;
    }
    return dst;
}
/**
 * Negates a vector.
 * @param {module:twgl/v3.Vec3} v The vector.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} -v.
 * @memberOf module:twgl/v3
 */ function $df29a836a27602ed$var$negate(v, dst) {
    dst = dst || new $df29a836a27602ed$var$VecType(3);
    dst[0] = -v[0];
    dst[1] = -v[1];
    dst[2] = -v[2];
    return dst;
}
/**
 * Copies a vector.
 * @param {module:twgl/v3.Vec3} v The vector.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} A copy of v.
 * @memberOf module:twgl/v3
 */ function $df29a836a27602ed$var$copy(v, dst) {
    dst = dst || new $df29a836a27602ed$var$VecType(3);
    dst[0] = v[0];
    dst[1] = v[1];
    dst[2] = v[2];
    return dst;
}
/**
 * Multiplies a vector by another vector (component-wise); assumes a and
 * b have the same length.
 * @param {module:twgl/v3.Vec3} a Operand vector.
 * @param {module:twgl/v3.Vec3} b Operand vector.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} The vector of products of entries of a and
 *     b.
 * @memberOf module:twgl/v3
 */ function $df29a836a27602ed$var$multiply(a, b, dst) {
    dst = dst || new $df29a836a27602ed$var$VecType(3);
    dst[0] = a[0] * b[0];
    dst[1] = a[1] * b[1];
    dst[2] = a[2] * b[2];
    return dst;
}
/**
 * Divides a vector by another vector (component-wise); assumes a and
 * b have the same length.
 * @param {module:twgl/v3.Vec3} a Operand vector.
 * @param {module:twgl/v3.Vec3} b Operand vector.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} The vector of quotients of entries of a and
 *     b.
 * @memberOf module:twgl/v3
 */ function $df29a836a27602ed$var$divide(a, b, dst) {
    dst = dst || new $df29a836a27602ed$var$VecType(3);
    dst[0] = a[0] / b[0];
    dst[1] = a[1] / b[1];
    dst[2] = a[2] / b[2];
    return dst;
}
var $df29a836a27602ed$export$815b03eba529a08e = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    add: $df29a836a27602ed$var$add,
    copy: $df29a836a27602ed$var$copy,
    create: $df29a836a27602ed$var$create,
    cross: $df29a836a27602ed$var$cross,
    distance: $df29a836a27602ed$var$distance,
    distanceSq: $df29a836a27602ed$var$distanceSq,
    divide: $df29a836a27602ed$var$divide,
    divScalar: $df29a836a27602ed$var$divScalar,
    dot: $df29a836a27602ed$var$dot,
    lerp: $df29a836a27602ed$var$lerp,
    lerpV: $df29a836a27602ed$var$lerpV,
    length: $df29a836a27602ed$var$length$1,
    lengthSq: $df29a836a27602ed$var$lengthSq,
    max: $df29a836a27602ed$var$max,
    min: $df29a836a27602ed$var$min,
    mulScalar: $df29a836a27602ed$var$mulScalar,
    multiply: $df29a836a27602ed$var$multiply,
    negate: $df29a836a27602ed$var$negate,
    normalize: $df29a836a27602ed$var$normalize,
    setDefaultType: $df29a836a27602ed$var$setDefaultType,
    subtract: $df29a836a27602ed$var$subtract
});
/*
 * Copyright 2019 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */ /**
 * 4x4 Matrix math math functions.
 *
 * Almost all functions take an optional `dst` argument. If it is not passed in the
 * functions will create a new matrix. In other words you can do this
 *
 *     const mat = m4.translation([1, 2, 3]);  // Creates a new translation matrix
 *
 * or
 *
 *     const mat = m4.create();
 *     m4.translation([1, 2, 3], mat);  // Puts translation matrix in mat.
 *
 * The first style is often easier but depending on where it's used it generates garbage where
 * as there is almost never allocation with the second style.
 *
 * It is always save to pass any matrix as the destination. So for example
 *
 *     const mat = m4.identity();
 *     const trans = m4.translation([1, 2, 3]);
 *     m4.multiply(mat, trans, mat);  // Multiplies mat * trans and puts result in mat.
 *
 * @module twgl/m4
 */ let $df29a836a27602ed$var$MatType = Float32Array;
/**
 * A JavaScript array with 16 values or a Float32Array with 16 values.
 * When created by the library will create the default type which is `Float32Array`
 * but can be set by calling {@link module:twgl/m4.setDefaultType}.
 * @typedef {(number[]|Float32Array)} Mat4
 * @memberOf module:twgl/m4
 */ /**
 * Sets the type this library creates for a Mat4
 * @param {constructor} ctor the constructor for the type. Either `Float32Array` or `Array`
 * @return {constructor} previous constructor for Mat4
 * @memberOf module:twgl/m4
 */ function $df29a836a27602ed$var$setDefaultType$1(ctor) {
    const oldType = $df29a836a27602ed$var$MatType;
    $df29a836a27602ed$var$MatType = ctor;
    return oldType;
}
/**
 * Negates a matrix.
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} -m.
 * @memberOf module:twgl/m4
 */ function $df29a836a27602ed$var$negate$1(m, dst) {
    dst = dst || new $df29a836a27602ed$var$MatType(16);
    dst[0] = -m[0];
    dst[1] = -m[1];
    dst[2] = -m[2];
    dst[3] = -m[3];
    dst[4] = -m[4];
    dst[5] = -m[5];
    dst[6] = -m[6];
    dst[7] = -m[7];
    dst[8] = -m[8];
    dst[9] = -m[9];
    dst[10] = -m[10];
    dst[11] = -m[11];
    dst[12] = -m[12];
    dst[13] = -m[13];
    dst[14] = -m[14];
    dst[15] = -m[15];
    return dst;
}
/**
 * Copies a matrix.
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {module:twgl/m4.Mat4} [dst] The matrix. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} A copy of m.
 * @memberOf module:twgl/m4
 */ function $df29a836a27602ed$var$copy$1(m, dst) {
    dst = dst || new $df29a836a27602ed$var$MatType(16);
    dst[0] = m[0];
    dst[1] = m[1];
    dst[2] = m[2];
    dst[3] = m[3];
    dst[4] = m[4];
    dst[5] = m[5];
    dst[6] = m[6];
    dst[7] = m[7];
    dst[8] = m[8];
    dst[9] = m[9];
    dst[10] = m[10];
    dst[11] = m[11];
    dst[12] = m[12];
    dst[13] = m[13];
    dst[14] = m[14];
    dst[15] = m[15];
    return dst;
}
/**
 * Creates an n-by-n identity matrix.
 *
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} An n-by-n identity matrix.
 * @memberOf module:twgl/m4
 */ function $df29a836a27602ed$var$identity(dst) {
    dst = dst || new $df29a836a27602ed$var$MatType(16);
    dst[0] = 1;
    dst[1] = 0;
    dst[2] = 0;
    dst[3] = 0;
    dst[4] = 0;
    dst[5] = 1;
    dst[6] = 0;
    dst[7] = 0;
    dst[8] = 0;
    dst[9] = 0;
    dst[10] = 1;
    dst[11] = 0;
    dst[12] = 0;
    dst[13] = 0;
    dst[14] = 0;
    dst[15] = 1;
    return dst;
}
/**
 * Takes the transpose of a matrix.
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The transpose of m.
 * @memberOf module:twgl/m4
 */ function $df29a836a27602ed$var$transpose(m, dst) {
    dst = dst || new $df29a836a27602ed$var$MatType(16);
    if (dst === m) {
        let t;
        t = m[1];
        m[1] = m[4];
        m[4] = t;
        t = m[2];
        m[2] = m[8];
        m[8] = t;
        t = m[3];
        m[3] = m[12];
        m[12] = t;
        t = m[6];
        m[6] = m[9];
        m[9] = t;
        t = m[7];
        m[7] = m[13];
        m[13] = t;
        t = m[11];
        m[11] = m[14];
        m[14] = t;
        return dst;
    }
    const m00 = m[0];
    const m01 = m[1];
    const m02 = m[2];
    const m03 = m[3];
    const m10 = m[4];
    const m11 = m[5];
    const m12 = m[6];
    const m13 = m[7];
    const m20 = m[8];
    const m21 = m[9];
    const m22 = m[10];
    const m23 = m[11];
    const m30 = m[12];
    const m31 = m[13];
    const m32 = m[14];
    const m33 = m[15];
    dst[0] = m00;
    dst[1] = m10;
    dst[2] = m20;
    dst[3] = m30;
    dst[4] = m01;
    dst[5] = m11;
    dst[6] = m21;
    dst[7] = m31;
    dst[8] = m02;
    dst[9] = m12;
    dst[10] = m22;
    dst[11] = m32;
    dst[12] = m03;
    dst[13] = m13;
    dst[14] = m23;
    dst[15] = m33;
    return dst;
}
/**
 * Computes the inverse of a 4-by-4 matrix.
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The inverse of m.
 * @memberOf module:twgl/m4
 */ function $df29a836a27602ed$var$inverse(m, dst) {
    dst = dst || new $df29a836a27602ed$var$MatType(16);
    const m00 = m[0];
    const m01 = m[1];
    const m02 = m[2];
    const m03 = m[3];
    const m10 = m[4];
    const m11 = m[5];
    const m12 = m[6];
    const m13 = m[7];
    const m20 = m[8];
    const m21 = m[9];
    const m22 = m[10];
    const m23 = m[11];
    const m30 = m[12];
    const m31 = m[13];
    const m32 = m[14];
    const m33 = m[15];
    const tmp_0 = m22 * m33;
    const tmp_1 = m32 * m23;
    const tmp_2 = m12 * m33;
    const tmp_3 = m32 * m13;
    const tmp_4 = m12 * m23;
    const tmp_5 = m22 * m13;
    const tmp_6 = m02 * m33;
    const tmp_7 = m32 * m03;
    const tmp_8 = m02 * m23;
    const tmp_9 = m22 * m03;
    const tmp_10 = m02 * m13;
    const tmp_11 = m12 * m03;
    const tmp_12 = m20 * m31;
    const tmp_13 = m30 * m21;
    const tmp_14 = m10 * m31;
    const tmp_15 = m30 * m11;
    const tmp_16 = m10 * m21;
    const tmp_17 = m20 * m11;
    const tmp_18 = m00 * m31;
    const tmp_19 = m30 * m01;
    const tmp_20 = m00 * m21;
    const tmp_21 = m20 * m01;
    const tmp_22 = m00 * m11;
    const tmp_23 = m10 * m01;
    const t0 = tmp_0 * m11 + tmp_3 * m21 + tmp_4 * m31 - (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
    const t1 = tmp_1 * m01 + tmp_6 * m21 + tmp_9 * m31 - (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
    const t2 = tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31 - (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
    const t3 = tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21 - (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);
    const d = 1 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);
    dst[0] = d * t0;
    dst[1] = d * t1;
    dst[2] = d * t2;
    dst[3] = d * t3;
    dst[4] = d * (tmp_1 * m10 + tmp_2 * m20 + tmp_5 * m30 - (tmp_0 * m10 + tmp_3 * m20 + tmp_4 * m30));
    dst[5] = d * (tmp_0 * m00 + tmp_7 * m20 + tmp_8 * m30 - (tmp_1 * m00 + tmp_6 * m20 + tmp_9 * m30));
    dst[6] = d * (tmp_3 * m00 + tmp_6 * m10 + tmp_11 * m30 - (tmp_2 * m00 + tmp_7 * m10 + tmp_10 * m30));
    dst[7] = d * (tmp_4 * m00 + tmp_9 * m10 + tmp_10 * m20 - (tmp_5 * m00 + tmp_8 * m10 + tmp_11 * m20));
    dst[8] = d * (tmp_12 * m13 + tmp_15 * m23 + tmp_16 * m33 - (tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33));
    dst[9] = d * (tmp_13 * m03 + tmp_18 * m23 + tmp_21 * m33 - (tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33));
    dst[10] = d * (tmp_14 * m03 + tmp_19 * m13 + tmp_22 * m33 - (tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33));
    dst[11] = d * (tmp_17 * m03 + tmp_20 * m13 + tmp_23 * m23 - (tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23));
    dst[12] = d * (tmp_14 * m22 + tmp_17 * m32 + tmp_13 * m12 - (tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22));
    dst[13] = d * (tmp_20 * m32 + tmp_12 * m02 + tmp_19 * m22 - (tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02));
    dst[14] = d * (tmp_18 * m12 + tmp_23 * m32 + tmp_15 * m02 - (tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12));
    dst[15] = d * (tmp_22 * m22 + tmp_16 * m02 + tmp_21 * m12 - (tmp_20 * m12 + tmp_23 * m22 + tmp_17 * m02));
    return dst;
}
/**
 * Multiplies two 4-by-4 matrices with a on the left and b on the right
 * @param {module:twgl/m4.Mat4} a The matrix on the left.
 * @param {module:twgl/m4.Mat4} b The matrix on the right.
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The matrix product of a and b.
 * @memberOf module:twgl/m4
 */ function $df29a836a27602ed$var$multiply$1(a, b, dst) {
    dst = dst || new $df29a836a27602ed$var$MatType(16);
    const a00 = a[0];
    const a01 = a[1];
    const a02 = a[2];
    const a03 = a[3];
    const a10 = a[4];
    const a11 = a[5];
    const a12 = a[6];
    const a13 = a[7];
    const a20 = a[8];
    const a21 = a[9];
    const a22 = a[10];
    const a23 = a[11];
    const a30 = a[12];
    const a31 = a[13];
    const a32 = a[14];
    const a33 = a[15];
    const b00 = b[0];
    const b01 = b[1];
    const b02 = b[2];
    const b03 = b[3];
    const b10 = b[4];
    const b11 = b[5];
    const b12 = b[6];
    const b13 = b[7];
    const b20 = b[8];
    const b21 = b[9];
    const b22 = b[10];
    const b23 = b[11];
    const b30 = b[12];
    const b31 = b[13];
    const b32 = b[14];
    const b33 = b[15];
    dst[0] = a00 * b00 + a10 * b01 + a20 * b02 + a30 * b03;
    dst[1] = a01 * b00 + a11 * b01 + a21 * b02 + a31 * b03;
    dst[2] = a02 * b00 + a12 * b01 + a22 * b02 + a32 * b03;
    dst[3] = a03 * b00 + a13 * b01 + a23 * b02 + a33 * b03;
    dst[4] = a00 * b10 + a10 * b11 + a20 * b12 + a30 * b13;
    dst[5] = a01 * b10 + a11 * b11 + a21 * b12 + a31 * b13;
    dst[6] = a02 * b10 + a12 * b11 + a22 * b12 + a32 * b13;
    dst[7] = a03 * b10 + a13 * b11 + a23 * b12 + a33 * b13;
    dst[8] = a00 * b20 + a10 * b21 + a20 * b22 + a30 * b23;
    dst[9] = a01 * b20 + a11 * b21 + a21 * b22 + a31 * b23;
    dst[10] = a02 * b20 + a12 * b21 + a22 * b22 + a32 * b23;
    dst[11] = a03 * b20 + a13 * b21 + a23 * b22 + a33 * b23;
    dst[12] = a00 * b30 + a10 * b31 + a20 * b32 + a30 * b33;
    dst[13] = a01 * b30 + a11 * b31 + a21 * b32 + a31 * b33;
    dst[14] = a02 * b30 + a12 * b31 + a22 * b32 + a32 * b33;
    dst[15] = a03 * b30 + a13 * b31 + a23 * b32 + a33 * b33;
    return dst;
}
/**
 * Sets the translation component of a 4-by-4 matrix to the given
 * vector.
 * @param {module:twgl/m4.Mat4} a The matrix.
 * @param {module:twgl/v3.Vec3} v The vector.
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The matrix with translation set.
 * @memberOf module:twgl/m4
 */ function $df29a836a27602ed$var$setTranslation(a, v, dst) {
    dst = dst || $df29a836a27602ed$var$identity();
    if (a !== dst) {
        dst[0] = a[0];
        dst[1] = a[1];
        dst[2] = a[2];
        dst[3] = a[3];
        dst[4] = a[4];
        dst[5] = a[5];
        dst[6] = a[6];
        dst[7] = a[7];
        dst[8] = a[8];
        dst[9] = a[9];
        dst[10] = a[10];
        dst[11] = a[11];
    }
    dst[12] = v[0];
    dst[13] = v[1];
    dst[14] = v[2];
    dst[15] = 1;
    return dst;
}
/**
 * Returns the translation component of a 4-by-4 matrix as a vector with 3
 * entries.
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not passed a new one is created.
 * @return {module:twgl/v3.Vec3} The translation component of m.
 * @memberOf module:twgl/m4
 */ function $df29a836a27602ed$var$getTranslation(m, dst) {
    dst = dst || $df29a836a27602ed$var$create();
    dst[0] = m[12];
    dst[1] = m[13];
    dst[2] = m[14];
    return dst;
}
/**
 * Returns an axis of a 4x4 matrix as a vector with 3 entries
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {number} axis The axis 0 = x, 1 = y, 2 = z;
 * @return {module:twgl/v3.Vec3} [dst] vector.
 * @return {module:twgl/v3.Vec3} The axis component of m.
 * @memberOf module:twgl/m4
 */ function $df29a836a27602ed$var$getAxis(m, axis, dst) {
    dst = dst || $df29a836a27602ed$var$create();
    const off = axis * 4;
    dst[0] = m[off + 0];
    dst[1] = m[off + 1];
    dst[2] = m[off + 2];
    return dst;
}
/**
 * Sets an axis of a 4x4 matrix as a vector with 3 entries
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {module:twgl/v3.Vec3} v the axis vector
 * @param {number} axis The axis  0 = x, 1 = y, 2 = z;
 * @param {module:twgl/m4.Mat4} [dst] The matrix to set. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The matrix with axis set.
 * @memberOf module:twgl/m4
 */ function $df29a836a27602ed$var$setAxis(a, v, axis, dst) {
    if (dst !== a) dst = $df29a836a27602ed$var$copy$1(a, dst);
    const off = axis * 4;
    dst[off + 0] = v[0];
    dst[off + 1] = v[1];
    dst[off + 2] = v[2];
    return dst;
}
/**
 * Computes a 4-by-4 perspective transformation matrix given the angular height
 * of the frustum, the aspect ratio, and the near and far clipping planes.  The
 * arguments define a frustum extending in the negative z direction.  The given
 * angle is the vertical angle of the frustum, and the horizontal angle is
 * determined to produce the given aspect ratio.  The arguments near and far are
 * the distances to the near and far clipping planes.  Note that near and far
 * are not z coordinates, but rather they are distances along the negative
 * z-axis.  The matrix generated sends the viewing frustum to the unit box.
 * We assume a unit box extending from -1 to 1 in the x and y dimensions and
 * from 0 to 1 in the z dimension.
 * @param {number} fieldOfViewYInRadians The camera angle from top to bottom (in radians).
 * @param {number} aspect The aspect ratio width / height.
 * @param {number} zNear The depth (negative z coordinate)
 *     of the near clipping plane.
 * @param {number} zFar The depth (negative z coordinate)
 *     of the far clipping plane.
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The perspective matrix.
 * @memberOf module:twgl/m4
 */ function $df29a836a27602ed$var$perspective(fieldOfViewYInRadians, aspect, zNear, zFar, dst) {
    dst = dst || new $df29a836a27602ed$var$MatType(16);
    const f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewYInRadians);
    const rangeInv = 1 / (zNear - zFar);
    dst[0] = f / aspect;
    dst[1] = 0;
    dst[2] = 0;
    dst[3] = 0;
    dst[4] = 0;
    dst[5] = f;
    dst[6] = 0;
    dst[7] = 0;
    dst[8] = 0;
    dst[9] = 0;
    dst[10] = (zNear + zFar) * rangeInv;
    dst[11] = -1;
    dst[12] = 0;
    dst[13] = 0;
    dst[14] = zNear * zFar * rangeInv * 2;
    dst[15] = 0;
    return dst;
}
/**
 * Computes a 4-by-4 orthogonal transformation matrix given the left, right,
 * bottom, and top dimensions of the near clipping plane as well as the
 * near and far clipping plane distances.
 * @param {number} left Left side of the near clipping plane viewport.
 * @param {number} right Right side of the near clipping plane viewport.
 * @param {number} bottom Bottom of the near clipping plane viewport.
 * @param {number} top Top of the near clipping plane viewport.
 * @param {number} near The depth (negative z coordinate)
 *     of the near clipping plane.
 * @param {number} far The depth (negative z coordinate)
 *     of the far clipping plane.
 * @param {module:twgl/m4.Mat4} [dst] Output matrix. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The perspective matrix.
 * @memberOf module:twgl/m4
 */ function $df29a836a27602ed$var$ortho(left, right, bottom, top, near, far, dst) {
    dst = dst || new $df29a836a27602ed$var$MatType(16);
    dst[0] = 2 / (right - left);
    dst[1] = 0;
    dst[2] = 0;
    dst[3] = 0;
    dst[4] = 0;
    dst[5] = 2 / (top - bottom);
    dst[6] = 0;
    dst[7] = 0;
    dst[8] = 0;
    dst[9] = 0;
    dst[10] = 2 / (near - far);
    dst[11] = 0;
    dst[12] = (right + left) / (left - right);
    dst[13] = (top + bottom) / (bottom - top);
    dst[14] = (far + near) / (near - far);
    dst[15] = 1;
    return dst;
}
/**
 * Computes a 4-by-4 perspective transformation matrix given the left, right,
 * top, bottom, near and far clipping planes. The arguments define a frustum
 * extending in the negative z direction. The arguments near and far are the
 * distances to the near and far clipping planes. Note that near and far are not
 * z coordinates, but rather they are distances along the negative z-axis. The
 * matrix generated sends the viewing frustum to the unit box. We assume a unit
 * box extending from -1 to 1 in the x and y dimensions and from 0 to 1 in the z
 * dimension.
 * @param {number} left The x coordinate of the left plane of the box.
 * @param {number} right The x coordinate of the right plane of the box.
 * @param {number} bottom The y coordinate of the bottom plane of the box.
 * @param {number} top The y coordinate of the right plane of the box.
 * @param {number} near The negative z coordinate of the near plane of the box.
 * @param {number} far The negative z coordinate of the far plane of the box.
 * @param {module:twgl/m4.Mat4} [dst] Output matrix. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The perspective projection matrix.
 * @memberOf module:twgl/m4
 */ function $df29a836a27602ed$var$frustum(left, right, bottom, top, near, far, dst) {
    dst = dst || new $df29a836a27602ed$var$MatType(16);
    const dx = right - left;
    const dy = top - bottom;
    const dz = near - far;
    dst[0] = 2 * near / dx;
    dst[1] = 0;
    dst[2] = 0;
    dst[3] = 0;
    dst[4] = 0;
    dst[5] = 2 * near / dy;
    dst[6] = 0;
    dst[7] = 0;
    dst[8] = (left + right) / dx;
    dst[9] = (top + bottom) / dy;
    dst[10] = far / dz;
    dst[11] = -1;
    dst[12] = 0;
    dst[13] = 0;
    dst[14] = near * far / dz;
    dst[15] = 0;
    return dst;
}
let $df29a836a27602ed$var$xAxis;
let $df29a836a27602ed$var$yAxis;
let $df29a836a27602ed$var$zAxis;
/**
 * Computes a 4-by-4 look-at transformation.
 *
 * This is a matrix which positions the camera itself. If you want
 * a view matrix (a matrix which moves things in front of the camera)
 * take the inverse of this.
 *
 * @param {module:twgl/v3.Vec3} eye The position of the eye.
 * @param {module:twgl/v3.Vec3} target The position meant to be viewed.
 * @param {module:twgl/v3.Vec3} up A vector pointing up.
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The look-at matrix.
 * @memberOf module:twgl/m4
 */ function $df29a836a27602ed$var$lookAt(eye, target, up, dst) {
    dst = dst || new $df29a836a27602ed$var$MatType(16);
    $df29a836a27602ed$var$xAxis = $df29a836a27602ed$var$xAxis || $df29a836a27602ed$var$create();
    $df29a836a27602ed$var$yAxis = $df29a836a27602ed$var$yAxis || $df29a836a27602ed$var$create();
    $df29a836a27602ed$var$zAxis = $df29a836a27602ed$var$zAxis || $df29a836a27602ed$var$create();
    $df29a836a27602ed$var$normalize($df29a836a27602ed$var$subtract(eye, target, $df29a836a27602ed$var$zAxis), $df29a836a27602ed$var$zAxis);
    $df29a836a27602ed$var$normalize($df29a836a27602ed$var$cross(up, $df29a836a27602ed$var$zAxis, $df29a836a27602ed$var$xAxis), $df29a836a27602ed$var$xAxis);
    $df29a836a27602ed$var$normalize($df29a836a27602ed$var$cross($df29a836a27602ed$var$zAxis, $df29a836a27602ed$var$xAxis, $df29a836a27602ed$var$yAxis), $df29a836a27602ed$var$yAxis);
    dst[0] = $df29a836a27602ed$var$xAxis[0];
    dst[1] = $df29a836a27602ed$var$xAxis[1];
    dst[2] = $df29a836a27602ed$var$xAxis[2];
    dst[3] = 0;
    dst[4] = $df29a836a27602ed$var$yAxis[0];
    dst[5] = $df29a836a27602ed$var$yAxis[1];
    dst[6] = $df29a836a27602ed$var$yAxis[2];
    dst[7] = 0;
    dst[8] = $df29a836a27602ed$var$zAxis[0];
    dst[9] = $df29a836a27602ed$var$zAxis[1];
    dst[10] = $df29a836a27602ed$var$zAxis[2];
    dst[11] = 0;
    dst[12] = eye[0];
    dst[13] = eye[1];
    dst[14] = eye[2];
    dst[15] = 1;
    return dst;
}
/**
 * Creates a 4-by-4 matrix which translates by the given vector v.
 * @param {module:twgl/v3.Vec3} v The vector by
 *     which to translate.
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The translation matrix.
 * @memberOf module:twgl/m4
 */ function $df29a836a27602ed$var$translation(v, dst) {
    dst = dst || new $df29a836a27602ed$var$MatType(16);
    dst[0] = 1;
    dst[1] = 0;
    dst[2] = 0;
    dst[3] = 0;
    dst[4] = 0;
    dst[5] = 1;
    dst[6] = 0;
    dst[7] = 0;
    dst[8] = 0;
    dst[9] = 0;
    dst[10] = 1;
    dst[11] = 0;
    dst[12] = v[0];
    dst[13] = v[1];
    dst[14] = v[2];
    dst[15] = 1;
    return dst;
}
/**
 * Translates the given 4-by-4 matrix by the given vector v.
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {module:twgl/v3.Vec3} v The vector by
 *     which to translate.
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The translated matrix.
 * @memberOf module:twgl/m4
 */ function $df29a836a27602ed$var$translate(m, v, dst) {
    dst = dst || new $df29a836a27602ed$var$MatType(16);
    const v0 = v[0];
    const v1 = v[1];
    const v2 = v[2];
    const m00 = m[0];
    const m01 = m[1];
    const m02 = m[2];
    const m03 = m[3];
    const m10 = m[4];
    const m11 = m[5];
    const m12 = m[6];
    const m13 = m[7];
    const m20 = m[8];
    const m21 = m[9];
    const m22 = m[10];
    const m23 = m[11];
    const m30 = m[12];
    const m31 = m[13];
    const m32 = m[14];
    const m33 = m[15];
    if (m !== dst) {
        dst[0] = m00;
        dst[1] = m01;
        dst[2] = m02;
        dst[3] = m03;
        dst[4] = m10;
        dst[5] = m11;
        dst[6] = m12;
        dst[7] = m13;
        dst[8] = m20;
        dst[9] = m21;
        dst[10] = m22;
        dst[11] = m23;
    }
    dst[12] = m00 * v0 + m10 * v1 + m20 * v2 + m30;
    dst[13] = m01 * v0 + m11 * v1 + m21 * v2 + m31;
    dst[14] = m02 * v0 + m12 * v1 + m22 * v2 + m32;
    dst[15] = m03 * v0 + m13 * v1 + m23 * v2 + m33;
    return dst;
}
/**
 * Creates a 4-by-4 matrix which rotates around the x-axis by the given angle.
 * @param {number} angleInRadians The angle by which to rotate (in radians).
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The rotation matrix.
 * @memberOf module:twgl/m4
 */ function $df29a836a27602ed$var$rotationX(angleInRadians, dst) {
    dst = dst || new $df29a836a27602ed$var$MatType(16);
    const c = Math.cos(angleInRadians);
    const s = Math.sin(angleInRadians);
    dst[0] = 1;
    dst[1] = 0;
    dst[2] = 0;
    dst[3] = 0;
    dst[4] = 0;
    dst[5] = c;
    dst[6] = s;
    dst[7] = 0;
    dst[8] = 0;
    dst[9] = -s;
    dst[10] = c;
    dst[11] = 0;
    dst[12] = 0;
    dst[13] = 0;
    dst[14] = 0;
    dst[15] = 1;
    return dst;
}
/**
 * Rotates the given 4-by-4 matrix around the x-axis by the given
 * angle.
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {number} angleInRadians The angle by which to rotate (in radians).
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The rotated matrix.
 * @memberOf module:twgl/m4
 */ function $df29a836a27602ed$var$rotateX(m, angleInRadians, dst) {
    dst = dst || new $df29a836a27602ed$var$MatType(16);
    const m10 = m[4];
    const m11 = m[5];
    const m12 = m[6];
    const m13 = m[7];
    const m20 = m[8];
    const m21 = m[9];
    const m22 = m[10];
    const m23 = m[11];
    const c = Math.cos(angleInRadians);
    const s = Math.sin(angleInRadians);
    dst[4] = c * m10 + s * m20;
    dst[5] = c * m11 + s * m21;
    dst[6] = c * m12 + s * m22;
    dst[7] = c * m13 + s * m23;
    dst[8] = c * m20 - s * m10;
    dst[9] = c * m21 - s * m11;
    dst[10] = c * m22 - s * m12;
    dst[11] = c * m23 - s * m13;
    if (m !== dst) {
        dst[0] = m[0];
        dst[1] = m[1];
        dst[2] = m[2];
        dst[3] = m[3];
        dst[12] = m[12];
        dst[13] = m[13];
        dst[14] = m[14];
        dst[15] = m[15];
    }
    return dst;
}
/**
 * Creates a 4-by-4 matrix which rotates around the y-axis by the given angle.
 * @param {number} angleInRadians The angle by which to rotate (in radians).
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The rotation matrix.
 * @memberOf module:twgl/m4
 */ function $df29a836a27602ed$var$rotationY(angleInRadians, dst) {
    dst = dst || new $df29a836a27602ed$var$MatType(16);
    const c = Math.cos(angleInRadians);
    const s = Math.sin(angleInRadians);
    dst[0] = c;
    dst[1] = 0;
    dst[2] = -s;
    dst[3] = 0;
    dst[4] = 0;
    dst[5] = 1;
    dst[6] = 0;
    dst[7] = 0;
    dst[8] = s;
    dst[9] = 0;
    dst[10] = c;
    dst[11] = 0;
    dst[12] = 0;
    dst[13] = 0;
    dst[14] = 0;
    dst[15] = 1;
    return dst;
}
/**
 * Rotates the given 4-by-4 matrix around the y-axis by the given
 * angle.
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {number} angleInRadians The angle by which to rotate (in radians).
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The rotated matrix.
 * @memberOf module:twgl/m4
 */ function $df29a836a27602ed$var$rotateY(m, angleInRadians, dst) {
    dst = dst || new $df29a836a27602ed$var$MatType(16);
    const m00 = m[0];
    const m01 = m[1];
    const m02 = m[2];
    const m03 = m[3];
    const m20 = m[8];
    const m21 = m[9];
    const m22 = m[10];
    const m23 = m[11];
    const c = Math.cos(angleInRadians);
    const s = Math.sin(angleInRadians);
    dst[0] = c * m00 - s * m20;
    dst[1] = c * m01 - s * m21;
    dst[2] = c * m02 - s * m22;
    dst[3] = c * m03 - s * m23;
    dst[8] = c * m20 + s * m00;
    dst[9] = c * m21 + s * m01;
    dst[10] = c * m22 + s * m02;
    dst[11] = c * m23 + s * m03;
    if (m !== dst) {
        dst[4] = m[4];
        dst[5] = m[5];
        dst[6] = m[6];
        dst[7] = m[7];
        dst[12] = m[12];
        dst[13] = m[13];
        dst[14] = m[14];
        dst[15] = m[15];
    }
    return dst;
}
/**
 * Creates a 4-by-4 matrix which rotates around the z-axis by the given angle.
 * @param {number} angleInRadians The angle by which to rotate (in radians).
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The rotation matrix.
 * @memberOf module:twgl/m4
 */ function $df29a836a27602ed$var$rotationZ(angleInRadians, dst) {
    dst = dst || new $df29a836a27602ed$var$MatType(16);
    const c = Math.cos(angleInRadians);
    const s = Math.sin(angleInRadians);
    dst[0] = c;
    dst[1] = s;
    dst[2] = 0;
    dst[3] = 0;
    dst[4] = -s;
    dst[5] = c;
    dst[6] = 0;
    dst[7] = 0;
    dst[8] = 0;
    dst[9] = 0;
    dst[10] = 1;
    dst[11] = 0;
    dst[12] = 0;
    dst[13] = 0;
    dst[14] = 0;
    dst[15] = 1;
    return dst;
}
/**
 * Rotates the given 4-by-4 matrix around the z-axis by the given
 * angle.
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {number} angleInRadians The angle by which to rotate (in radians).
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The rotated matrix.
 * @memberOf module:twgl/m4
 */ function $df29a836a27602ed$var$rotateZ(m, angleInRadians, dst) {
    dst = dst || new $df29a836a27602ed$var$MatType(16);
    const m00 = m[0];
    const m01 = m[1];
    const m02 = m[2];
    const m03 = m[3];
    const m10 = m[4];
    const m11 = m[5];
    const m12 = m[6];
    const m13 = m[7];
    const c = Math.cos(angleInRadians);
    const s = Math.sin(angleInRadians);
    dst[0] = c * m00 + s * m10;
    dst[1] = c * m01 + s * m11;
    dst[2] = c * m02 + s * m12;
    dst[3] = c * m03 + s * m13;
    dst[4] = c * m10 - s * m00;
    dst[5] = c * m11 - s * m01;
    dst[6] = c * m12 - s * m02;
    dst[7] = c * m13 - s * m03;
    if (m !== dst) {
        dst[8] = m[8];
        dst[9] = m[9];
        dst[10] = m[10];
        dst[11] = m[11];
        dst[12] = m[12];
        dst[13] = m[13];
        dst[14] = m[14];
        dst[15] = m[15];
    }
    return dst;
}
/**
 * Creates a 4-by-4 matrix which rotates around the given axis by the given
 * angle.
 * @param {module:twgl/v3.Vec3} axis The axis
 *     about which to rotate.
 * @param {number} angleInRadians The angle by which to rotate (in radians).
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} A matrix which rotates angle radians
 *     around the axis.
 * @memberOf module:twgl/m4
 */ function $df29a836a27602ed$var$axisRotation(axis, angleInRadians, dst) {
    dst = dst || new $df29a836a27602ed$var$MatType(16);
    let x = axis[0];
    let y = axis[1];
    let z = axis[2];
    const n = Math.sqrt(x * x + y * y + z * z);
    x /= n;
    y /= n;
    z /= n;
    const xx = x * x;
    const yy = y * y;
    const zz = z * z;
    const c = Math.cos(angleInRadians);
    const s = Math.sin(angleInRadians);
    const oneMinusCosine = 1 - c;
    dst[0] = xx + (1 - xx) * c;
    dst[1] = x * y * oneMinusCosine + z * s;
    dst[2] = x * z * oneMinusCosine - y * s;
    dst[3] = 0;
    dst[4] = x * y * oneMinusCosine - z * s;
    dst[5] = yy + (1 - yy) * c;
    dst[6] = y * z * oneMinusCosine + x * s;
    dst[7] = 0;
    dst[8] = x * z * oneMinusCosine + y * s;
    dst[9] = y * z * oneMinusCosine - x * s;
    dst[10] = zz + (1 - zz) * c;
    dst[11] = 0;
    dst[12] = 0;
    dst[13] = 0;
    dst[14] = 0;
    dst[15] = 1;
    return dst;
}
/**
 * Rotates the given 4-by-4 matrix around the given axis by the
 * given angle.
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {module:twgl/v3.Vec3} axis The axis
 *     about which to rotate.
 * @param {number} angleInRadians The angle by which to rotate (in radians).
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The rotated matrix.
 * @memberOf module:twgl/m4
 */ function $df29a836a27602ed$var$axisRotate(m, axis, angleInRadians, dst) {
    dst = dst || new $df29a836a27602ed$var$MatType(16);
    let x = axis[0];
    let y = axis[1];
    let z = axis[2];
    const n = Math.sqrt(x * x + y * y + z * z);
    x /= n;
    y /= n;
    z /= n;
    const xx = x * x;
    const yy = y * y;
    const zz = z * z;
    const c = Math.cos(angleInRadians);
    const s = Math.sin(angleInRadians);
    const oneMinusCosine = 1 - c;
    const r00 = xx + (1 - xx) * c;
    const r01 = x * y * oneMinusCosine + z * s;
    const r02 = x * z * oneMinusCosine - y * s;
    const r10 = x * y * oneMinusCosine - z * s;
    const r11 = yy + (1 - yy) * c;
    const r12 = y * z * oneMinusCosine + x * s;
    const r20 = x * z * oneMinusCosine + y * s;
    const r21 = y * z * oneMinusCosine - x * s;
    const r22 = zz + (1 - zz) * c;
    const m00 = m[0];
    const m01 = m[1];
    const m02 = m[2];
    const m03 = m[3];
    const m10 = m[4];
    const m11 = m[5];
    const m12 = m[6];
    const m13 = m[7];
    const m20 = m[8];
    const m21 = m[9];
    const m22 = m[10];
    const m23 = m[11];
    dst[0] = r00 * m00 + r01 * m10 + r02 * m20;
    dst[1] = r00 * m01 + r01 * m11 + r02 * m21;
    dst[2] = r00 * m02 + r01 * m12 + r02 * m22;
    dst[3] = r00 * m03 + r01 * m13 + r02 * m23;
    dst[4] = r10 * m00 + r11 * m10 + r12 * m20;
    dst[5] = r10 * m01 + r11 * m11 + r12 * m21;
    dst[6] = r10 * m02 + r11 * m12 + r12 * m22;
    dst[7] = r10 * m03 + r11 * m13 + r12 * m23;
    dst[8] = r20 * m00 + r21 * m10 + r22 * m20;
    dst[9] = r20 * m01 + r21 * m11 + r22 * m21;
    dst[10] = r20 * m02 + r21 * m12 + r22 * m22;
    dst[11] = r20 * m03 + r21 * m13 + r22 * m23;
    if (m !== dst) {
        dst[12] = m[12];
        dst[13] = m[13];
        dst[14] = m[14];
        dst[15] = m[15];
    }
    return dst;
}
/**
 * Creates a 4-by-4 matrix which scales in each dimension by an amount given by
 * the corresponding entry in the given vector; assumes the vector has three
 * entries.
 * @param {module:twgl/v3.Vec3} v A vector of
 *     three entries specifying the factor by which to scale in each dimension.
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The scaling matrix.
 * @memberOf module:twgl/m4
 */ function $df29a836a27602ed$var$scaling(v, dst) {
    dst = dst || new $df29a836a27602ed$var$MatType(16);
    dst[0] = v[0];
    dst[1] = 0;
    dst[2] = 0;
    dst[3] = 0;
    dst[4] = 0;
    dst[5] = v[1];
    dst[6] = 0;
    dst[7] = 0;
    dst[8] = 0;
    dst[9] = 0;
    dst[10] = v[2];
    dst[11] = 0;
    dst[12] = 0;
    dst[13] = 0;
    dst[14] = 0;
    dst[15] = 1;
    return dst;
}
/**
 * Scales the given 4-by-4 matrix in each dimension by an amount
 * given by the corresponding entry in the given vector; assumes the vector has
 * three entries.
 * @param {module:twgl/m4.Mat4} m The matrix to be modified.
 * @param {module:twgl/v3.Vec3} v A vector of three entries specifying the
 *     factor by which to scale in each dimension.
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The scaled matrix.
 * @memberOf module:twgl/m4
 */ function $df29a836a27602ed$var$scale(m, v, dst) {
    dst = dst || new $df29a836a27602ed$var$MatType(16);
    const v0 = v[0];
    const v1 = v[1];
    const v2 = v[2];
    dst[0] = v0 * m[0];
    dst[1] = v0 * m[1];
    dst[2] = v0 * m[2];
    dst[3] = v0 * m[3];
    dst[4] = v1 * m[4];
    dst[5] = v1 * m[5];
    dst[6] = v1 * m[6];
    dst[7] = v1 * m[7];
    dst[8] = v2 * m[8];
    dst[9] = v2 * m[9];
    dst[10] = v2 * m[10];
    dst[11] = v2 * m[11];
    if (m !== dst) {
        dst[12] = m[12];
        dst[13] = m[13];
        dst[14] = m[14];
        dst[15] = m[15];
    }
    return dst;
}
/**
 * Takes a 4-by-4 matrix and a vector with 3 entries,
 * interprets the vector as a point, transforms that point by the matrix, and
 * returns the result as a vector with 3 entries.
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {module:twgl/v3.Vec3} v The point.
 * @param {module:twgl/v3.Vec3} [dst] optional vec3 to store result. If not passed a new one is created.
 * @return {module:twgl/v3.Vec3} The transformed point.
 * @memberOf module:twgl/m4
 */ function $df29a836a27602ed$var$transformPoint(m, v, dst) {
    dst = dst || $df29a836a27602ed$var$create();
    const v0 = v[0];
    const v1 = v[1];
    const v2 = v[2];
    const d = v0 * m[3] + v1 * m[7] + v2 * m[11] + m[15];
    dst[0] = (v0 * m[0] + v1 * m[4] + v2 * m[8] + m[12]) / d;
    dst[1] = (v0 * m[1] + v1 * m[5] + v2 * m[9] + m[13]) / d;
    dst[2] = (v0 * m[2] + v1 * m[6] + v2 * m[10] + m[14]) / d;
    return dst;
}
/**
 * Takes a 4-by-4 matrix and a vector with 3 entries, interprets the vector as a
 * direction, transforms that direction by the matrix, and returns the result;
 * assumes the transformation of 3-dimensional space represented by the matrix
 * is parallel-preserving, i.e. any combination of rotation, scaling and
 * translation, but not a perspective distortion. Returns a vector with 3
 * entries.
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {module:twgl/v3.Vec3} v The direction.
 * @param {module:twgl/v3.Vec3} [dst] optional Vec3 to store result. If not passed a new one is created.
 * @return {module:twgl/v3.Vec3} The transformed direction.
 * @memberOf module:twgl/m4
 */ function $df29a836a27602ed$var$transformDirection(m, v, dst) {
    dst = dst || $df29a836a27602ed$var$create();
    const v0 = v[0];
    const v1 = v[1];
    const v2 = v[2];
    dst[0] = v0 * m[0] + v1 * m[4] + v2 * m[8];
    dst[1] = v0 * m[1] + v1 * m[5] + v2 * m[9];
    dst[2] = v0 * m[2] + v1 * m[6] + v2 * m[10];
    return dst;
}
/**
 * Takes a 4-by-4 matrix m and a vector v with 3 entries, interprets the vector
 * as a normal to a surface, and computes a vector which is normal upon
 * transforming that surface by the matrix. The effect of this function is the
 * same as transforming v (as a direction) by the inverse-transpose of m.  This
 * function assumes the transformation of 3-dimensional space represented by the
 * matrix is parallel-preserving, i.e. any combination of rotation, scaling and
 * translation, but not a perspective distortion.  Returns a vector with 3
 * entries.
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {module:twgl/v3.Vec3} v The normal.
 * @param {module:twgl/v3.Vec3} [dst] The direction. If not passed a new one is created.
 * @return {module:twgl/v3.Vec3} The transformed normal.
 * @memberOf module:twgl/m4
 */ function $df29a836a27602ed$var$transformNormal(m, v, dst) {
    dst = dst || $df29a836a27602ed$var$create();
    const mi = $df29a836a27602ed$var$inverse(m);
    const v0 = v[0];
    const v1 = v[1];
    const v2 = v[2];
    dst[0] = v0 * mi[0] + v1 * mi[1] + v2 * mi[2];
    dst[1] = v0 * mi[4] + v1 * mi[5] + v2 * mi[6];
    dst[2] = v0 * mi[8] + v1 * mi[9] + v2 * mi[10];
    return dst;
}
var $df29a836a27602ed$export$e318184adb044c73 = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    axisRotate: $df29a836a27602ed$var$axisRotate,
    axisRotation: $df29a836a27602ed$var$axisRotation,
    copy: $df29a836a27602ed$var$copy$1,
    frustum: $df29a836a27602ed$var$frustum,
    getAxis: $df29a836a27602ed$var$getAxis,
    getTranslation: $df29a836a27602ed$var$getTranslation,
    identity: $df29a836a27602ed$var$identity,
    inverse: $df29a836a27602ed$var$inverse,
    lookAt: $df29a836a27602ed$var$lookAt,
    multiply: $df29a836a27602ed$var$multiply$1,
    negate: $df29a836a27602ed$var$negate$1,
    ortho: $df29a836a27602ed$var$ortho,
    perspective: $df29a836a27602ed$var$perspective,
    rotateX: $df29a836a27602ed$var$rotateX,
    rotateY: $df29a836a27602ed$var$rotateY,
    rotateZ: $df29a836a27602ed$var$rotateZ,
    rotationX: $df29a836a27602ed$var$rotationX,
    rotationY: $df29a836a27602ed$var$rotationY,
    rotationZ: $df29a836a27602ed$var$rotationZ,
    scale: $df29a836a27602ed$var$scale,
    scaling: $df29a836a27602ed$var$scaling,
    setAxis: $df29a836a27602ed$var$setAxis,
    setDefaultType: $df29a836a27602ed$var$setDefaultType$1,
    setTranslation: $df29a836a27602ed$var$setTranslation,
    transformDirection: $df29a836a27602ed$var$transformDirection,
    transformNormal: $df29a836a27602ed$var$transformNormal,
    transformPoint: $df29a836a27602ed$var$transformPoint,
    translate: $df29a836a27602ed$var$translate,
    translation: $df29a836a27602ed$var$translation,
    transpose: $df29a836a27602ed$var$transpose
});
/*
 * Copyright 2019 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */ /* DataType */ const $df29a836a27602ed$var$BYTE = 5120;
const $df29a836a27602ed$var$UNSIGNED_BYTE = 5121;
const $df29a836a27602ed$var$SHORT = 5122;
const $df29a836a27602ed$var$UNSIGNED_SHORT = 5123;
const $df29a836a27602ed$var$INT = 5124;
const $df29a836a27602ed$var$UNSIGNED_INT = 5125;
const $df29a836a27602ed$var$FLOAT = 5126;
const $df29a836a27602ed$var$UNSIGNED_SHORT_4_4_4_4 = 32819;
const $df29a836a27602ed$var$UNSIGNED_SHORT_5_5_5_1 = 32820;
const $df29a836a27602ed$var$UNSIGNED_SHORT_5_6_5 = 33635;
const $df29a836a27602ed$var$HALF_FLOAT = 5131;
const $df29a836a27602ed$var$UNSIGNED_INT_2_10_10_10_REV = 33640;
const $df29a836a27602ed$var$UNSIGNED_INT_10F_11F_11F_REV = 35899;
const $df29a836a27602ed$var$UNSIGNED_INT_5_9_9_9_REV = 35902;
const $df29a836a27602ed$var$FLOAT_32_UNSIGNED_INT_24_8_REV = 36269;
const $df29a836a27602ed$var$UNSIGNED_INT_24_8 = 34042;
const $df29a836a27602ed$var$glTypeToTypedArray = {
};
{
    const tt = $df29a836a27602ed$var$glTypeToTypedArray;
    tt[$df29a836a27602ed$var$BYTE] = Int8Array;
    tt[$df29a836a27602ed$var$UNSIGNED_BYTE] = Uint8Array;
    tt[$df29a836a27602ed$var$SHORT] = Int16Array;
    tt[$df29a836a27602ed$var$UNSIGNED_SHORT] = Uint16Array;
    tt[$df29a836a27602ed$var$INT] = Int32Array;
    tt[$df29a836a27602ed$var$UNSIGNED_INT] = Uint32Array;
    tt[$df29a836a27602ed$var$FLOAT] = Float32Array;
    tt[$df29a836a27602ed$var$UNSIGNED_SHORT_4_4_4_4] = Uint16Array;
    tt[$df29a836a27602ed$var$UNSIGNED_SHORT_5_5_5_1] = Uint16Array;
    tt[$df29a836a27602ed$var$UNSIGNED_SHORT_5_6_5] = Uint16Array;
    tt[$df29a836a27602ed$var$HALF_FLOAT] = Uint16Array;
    tt[$df29a836a27602ed$var$UNSIGNED_INT_2_10_10_10_REV] = Uint32Array;
    tt[$df29a836a27602ed$var$UNSIGNED_INT_10F_11F_11F_REV] = Uint32Array;
    tt[$df29a836a27602ed$var$UNSIGNED_INT_5_9_9_9_REV] = Uint32Array;
    tt[$df29a836a27602ed$var$FLOAT_32_UNSIGNED_INT_24_8_REV] = Uint32Array;
    tt[$df29a836a27602ed$var$UNSIGNED_INT_24_8] = Uint32Array;
}/**
 * Get the GL type for a typedArray
 * @param {ArrayBufferView} typedArray a typedArray
 * @return {number} the GL type for array. For example pass in an `Int8Array` and `gl.BYTE` will
 *   be returned. Pass in a `Uint32Array` and `gl.UNSIGNED_INT` will be returned
 * @memberOf module:twgl/typedArray
 */ function $df29a836a27602ed$export$bddf845047a0e959(typedArray) {
    if (typedArray instanceof Int8Array) return $df29a836a27602ed$var$BYTE;
     // eslint-disable-line
    if (typedArray instanceof Uint8Array) return $df29a836a27602ed$var$UNSIGNED_BYTE;
     // eslint-disable-line
    if (typedArray instanceof Uint8ClampedArray) return $df29a836a27602ed$var$UNSIGNED_BYTE;
     // eslint-disable-line
    if (typedArray instanceof Int16Array) return $df29a836a27602ed$var$SHORT;
     // eslint-disable-line
    if (typedArray instanceof Uint16Array) return $df29a836a27602ed$var$UNSIGNED_SHORT;
     // eslint-disable-line
    if (typedArray instanceof Int32Array) return $df29a836a27602ed$var$INT;
     // eslint-disable-line
    if (typedArray instanceof Uint32Array) return $df29a836a27602ed$var$UNSIGNED_INT;
     // eslint-disable-line
    if (typedArray instanceof Float32Array) return $df29a836a27602ed$var$FLOAT;
     // eslint-disable-line
    throw new Error('unsupported typed array type');
}
/**
 * Get the GL type for a typedArray type
 * @param {ArrayBufferView} typedArrayType a typedArray constructor
 * @return {number} the GL type for type. For example pass in `Int8Array` and `gl.BYTE` will
 *   be returned. Pass in `Uint32Array` and `gl.UNSIGNED_INT` will be returned
 * @memberOf module:twgl/typedArray
 */ function $df29a836a27602ed$export$9546290c15d36fce(typedArrayType) {
    if (typedArrayType === Int8Array) return $df29a836a27602ed$var$BYTE;
     // eslint-disable-line
    if (typedArrayType === Uint8Array) return $df29a836a27602ed$var$UNSIGNED_BYTE;
     // eslint-disable-line
    if (typedArrayType === Uint8ClampedArray) return $df29a836a27602ed$var$UNSIGNED_BYTE;
     // eslint-disable-line
    if (typedArrayType === Int16Array) return $df29a836a27602ed$var$SHORT;
     // eslint-disable-line
    if (typedArrayType === Uint16Array) return $df29a836a27602ed$var$UNSIGNED_SHORT;
     // eslint-disable-line
    if (typedArrayType === Int32Array) return $df29a836a27602ed$var$INT;
     // eslint-disable-line
    if (typedArrayType === Uint32Array) return $df29a836a27602ed$var$UNSIGNED_INT;
     // eslint-disable-line
    if (typedArrayType === Float32Array) return $df29a836a27602ed$var$FLOAT;
     // eslint-disable-line
    throw new Error('unsupported typed array type');
}
/**
 * Get the typed array constructor for a given GL type
 * @param {number} type the GL type. (eg: `gl.UNSIGNED_INT`)
 * @return {function} the constructor for a the corresponding typed array. (eg. `Uint32Array`).
 * @memberOf module:twgl/typedArray
 */ function $df29a836a27602ed$export$3dc63662699923fc(type) {
    const CTOR = $df29a836a27602ed$var$glTypeToTypedArray[type];
    if (!CTOR) throw new Error('unknown gl type');
    return CTOR;
}
const $df29a836a27602ed$export$9dd3754ae86f0017 = typeof SharedArrayBuffer !== 'undefined' ? function isArrayBufferOrSharedArrayBuffer(a) {
    return a && a.buffer && (a.buffer instanceof ArrayBuffer || a.buffer instanceof SharedArrayBuffer);
} : function $df29a836a27602ed$export$9dd3754ae86f0017(a) {
    return a && a.buffer && a.buffer instanceof ArrayBuffer;
};
var $df29a836a27602ed$export$f3712bedb282625f = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    getGLTypeForTypedArray: $df29a836a27602ed$export$bddf845047a0e959,
    getGLTypeForTypedArrayType: $df29a836a27602ed$export$9546290c15d36fce,
    getTypedArrayTypeForGLType: $df29a836a27602ed$export$3dc63662699923fc,
    isArrayBuffer: $df29a836a27602ed$export$9dd3754ae86f0017
});
/*
 * Copyright 2019 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */ /* eslint no-console: "off" */ /**
 * Copy named properties
 *
 * @param {string[]} names names of properties to copy
 * @param {object} src object to copy properties from
 * @param {object} dst object to copy properties to
 * @private
 */ function $df29a836a27602ed$var$copyNamedProperties(names, src, dst) {
    names.forEach(function(name) {
        const value = src[name];
        if (value !== undefined) dst[name] = value;
    });
}
/**
 * Copies properties from source to dest only if a matching key is in dest
 *
 * @param {Object.<string, ?>} src the source
 * @param {Object.<string, ?>} dst the dest
 * @private
 */ function $df29a836a27602ed$var$copyExistingProperties(src, dst) {
    Object.keys(dst).forEach(function(key) {
        if (dst.hasOwnProperty(key) && src.hasOwnProperty(key)) dst[key] = src[key];
    });
}
function $df29a836a27602ed$var$error(...args) {
    console.error(...args);
}
function $df29a836a27602ed$var$warn(...args) {
    console.warn(...args);
}
function $df29a836a27602ed$var$isBuffer(gl, t) {
    return typeof WebGLBuffer !== 'undefined' && t instanceof WebGLBuffer;
}
function $df29a836a27602ed$var$isRenderbuffer(gl, t) {
    return typeof WebGLRenderbuffer !== 'undefined' && t instanceof WebGLRenderbuffer;
}
function $df29a836a27602ed$var$isShader(gl, t) {
    return typeof WebGLShader !== 'undefined' && t instanceof WebGLShader;
}
function $df29a836a27602ed$var$isTexture(gl, t) {
    return typeof WebGLTexture !== 'undefined' && t instanceof WebGLTexture;
}
function $df29a836a27602ed$var$isSampler(gl, t) {
    return typeof WebGLSampler !== 'undefined' && t instanceof WebGLSampler;
}
/*
 * Copyright 2019 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */ const $df29a836a27602ed$var$STATIC_DRAW = 35044;
const $df29a836a27602ed$var$ARRAY_BUFFER = 34962;
const $df29a836a27602ed$var$ELEMENT_ARRAY_BUFFER = 34963;
const $df29a836a27602ed$var$BUFFER_SIZE = 34660;
const $df29a836a27602ed$var$BYTE$1 = 5120;
const $df29a836a27602ed$var$UNSIGNED_BYTE$1 = 5121;
const $df29a836a27602ed$var$SHORT$1 = 5122;
const $df29a836a27602ed$var$UNSIGNED_SHORT$1 = 5123;
const $df29a836a27602ed$var$INT$1 = 5124;
const $df29a836a27602ed$var$UNSIGNED_INT$1 = 5125;
const $df29a836a27602ed$var$FLOAT$1 = 5126;
const $df29a836a27602ed$var$defaults = {
    attribPrefix: ""
};
/**
 * Sets the default attrib prefix
 *
 * When writing shaders I prefer to name attributes with `a_`, uniforms with `u_` and varyings with `v_`
 * as it makes it clear where they came from. But, when building geometry I prefer using un-prefixed names.
 *
 * In other words I'll create arrays of geometry like this
 *
 *     var arrays = {
 *       position: ...
 *       normal: ...
 *       texcoord: ...
 *     };
 *
 * But need those mapped to attributes and my attributes start with `a_`.
 *
 * @deprecated see {@link module:twgl.setDefaults}
 * @param {string} prefix prefix for attribs
 * @memberOf module:twgl/attributes
 */ function $df29a836a27602ed$export$8a79157a77253422(prefix) {
    $df29a836a27602ed$var$defaults.attribPrefix = prefix;
}
function $df29a836a27602ed$export$81400a733c5c400b(newDefaults) {
    $df29a836a27602ed$var$copyExistingProperties(newDefaults, $df29a836a27602ed$var$defaults);
}
function $df29a836a27602ed$var$setBufferFromTypedArray(gl, type, buffer, array, drawType) {
    gl.bindBuffer(type, buffer);
    gl.bufferData(type, array, drawType || $df29a836a27602ed$var$STATIC_DRAW);
}
/**
 * Given typed array creates a WebGLBuffer and copies the typed array
 * into it.
 *
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext
 * @param {ArrayBuffer|SharedArrayBuffer|ArrayBufferView|WebGLBuffer} typedArray the typed array. Note: If a WebGLBuffer is passed in it will just be returned. No action will be taken
 * @param {number} [type] the GL bind type for the buffer. Default = `gl.ARRAY_BUFFER`.
 * @param {number} [drawType] the GL draw type for the buffer. Default = 'gl.STATIC_DRAW`.
 * @return {WebGLBuffer} the created WebGLBuffer
 * @memberOf module:twgl/attributes
 */ function $df29a836a27602ed$export$6ea00fe9d038b3f9(gl, typedArray, type, drawType) {
    if ($df29a836a27602ed$var$isBuffer(gl, typedArray)) return typedArray;
    type = type || $df29a836a27602ed$var$ARRAY_BUFFER;
    const buffer = gl.createBuffer();
    $df29a836a27602ed$var$setBufferFromTypedArray(gl, type, buffer, typedArray, drawType);
    return buffer;
}
function $df29a836a27602ed$var$isIndices(name) {
    return name === "indices";
}
// This is really just a guess. Though I can't really imagine using
// anything else? Maybe for some compression?
function $df29a836a27602ed$var$getNormalizationForTypedArray(typedArray) {
    if (typedArray instanceof Int8Array) return true;
     // eslint-disable-line
    if (typedArray instanceof Uint8Array) return true;
     // eslint-disable-line
    return false;
}
// This is really just a guess. Though I can't really imagine using
// anything else? Maybe for some compression?
function $df29a836a27602ed$var$getNormalizationForTypedArrayType(typedArrayType) {
    if (typedArrayType === Int8Array) return true;
     // eslint-disable-line
    if (typedArrayType === Uint8Array) return true;
     // eslint-disable-line
    return false;
}
function $df29a836a27602ed$export$251e3bdee27f62a4(array) {
    return array.length ? array : array.data;
}
const $df29a836a27602ed$var$texcoordRE = /coord|texture/i;
const $df29a836a27602ed$var$colorRE = /color|colour/i;
function $df29a836a27602ed$var$guessNumComponentsFromName(name, length) {
    let numComponents;
    if ($df29a836a27602ed$var$texcoordRE.test(name)) numComponents = 2;
    else if ($df29a836a27602ed$var$colorRE.test(name)) numComponents = 4;
    else numComponents = 3; // position, normals, indices ...
    if (length % numComponents > 0) throw new Error(`Can not guess numComponents for attribute '${name}'. Tried ${numComponents} but ${length} values is not evenly divisible by ${numComponents}. You should specify it.`);
    return numComponents;
}
function $df29a836a27602ed$export$bfceede8dab24cbd(array, arrayName) {
    return array.numComponents || array.size || $df29a836a27602ed$var$guessNumComponentsFromName(arrayName, $df29a836a27602ed$export$251e3bdee27f62a4(array).length);
}
function $df29a836a27602ed$var$makeTypedArray(array, name) {
    if ($df29a836a27602ed$export$9dd3754ae86f0017(array)) return array;
    if ($df29a836a27602ed$export$9dd3754ae86f0017(array.data)) return array.data;
    if (Array.isArray(array)) array = {
        data: array
    };
    let Type = array.type;
    if (!Type) {
        if ($df29a836a27602ed$var$isIndices(name)) Type = Uint16Array;
        else Type = Float32Array;
    }
    return new Type(array.data);
}
/**
 * The info for an attribute. This is effectively just the arguments to `gl.vertexAttribPointer` plus the WebGLBuffer
 * for the attribute.
 *
 * @typedef {Object} AttribInfo
 * @property {number[]|ArrayBufferView} [value] a constant value for the attribute. Note: if this is set the attribute will be
 *    disabled and set to this constant value and all other values will be ignored.
 * @property {number} [numComponents] the number of components for this attribute.
 * @property {number} [size] synonym for `numComponents`.
 * @property {number} [type] the type of the attribute (eg. `gl.FLOAT`, `gl.UNSIGNED_BYTE`, etc...) Default = `gl.FLOAT`
 * @property {boolean} [normalize] whether or not to normalize the data. Default = false
 * @property {number} [offset] offset into buffer in bytes. Default = 0
 * @property {number} [stride] the stride in bytes per element. Default = 0
 * @property {number} [divisor] the divisor in instances. Default = undefined. Note: undefined = don't call gl.vertexAttribDivisor
 *    where as anything else = do call it with this value
 * @property {WebGLBuffer} buffer the buffer that contains the data for this attribute
 * @property {number} [drawType] the draw type passed to gl.bufferData. Default = gl.STATIC_DRAW
 * @memberOf module:twgl
 */ /**
 * Use this type of array spec when TWGL can't guess the type or number of components of an array
 * @typedef {Object} FullArraySpec
 * @property {number[]|ArrayBufferView} [value] a constant value for the attribute. Note: if this is set the attribute will be
 *    disabled and set to this constant value and all other values will be ignored.
 * @property {(number|number[]|ArrayBufferView)} data The data of the array. A number alone becomes the number of elements of type.
 * @property {number} [numComponents] number of components for `vertexAttribPointer`. Default is based on the name of the array.
 *    If `coord` is in the name assumes `numComponents = 2`.
 *    If `color` is in the name assumes `numComponents = 4`.
 *    otherwise assumes `numComponents = 3`
 * @property {constructor} [type] type. This is only used if `data` is a JavaScript array. It is the constructor for the typedarray. (eg. `Uint8Array`).
 * For example if you want colors in a `Uint8Array` you might have a `FullArraySpec` like `{ type: Uint8Array, data: [255,0,255,255, ...], }`.
 * @property {number} [size] synonym for `numComponents`.
 * @property {boolean} [normalize] normalize for `vertexAttribPointer`. Default is true if type is `Int8Array` or `Uint8Array` otherwise false.
 * @property {number} [stride] stride for `vertexAttribPointer`. Default = 0
 * @property {number} [offset] offset for `vertexAttribPointer`. Default = 0
 * @property {number} [divisor] divisor for `vertexAttribDivisor`. Default = undefined. Note: undefined = don't call gl.vertexAttribDivisor
 *    where as anything else = do call it with this value
 * @property {string} [attrib] name of attribute this array maps to. Defaults to same name as array prefixed by the default attribPrefix.
 * @property {string} [name] synonym for `attrib`.
 * @property {string} [attribName] synonym for `attrib`.
 * @property {WebGLBuffer} [buffer] Buffer to use for this attribute. This lets you use your own buffer
 *    but you will need to supply `numComponents` and `type`. You can effectively pass an `AttribInfo`
 *    to provide this. Example:
 *
 *         const bufferInfo1 = twgl.createBufferInfoFromArrays(gl, {
 *           position: [1, 2, 3, ... ],
 *         });
 *         const bufferInfo2 = twgl.createBufferInfoFromArrays(gl, {
 *           position: bufferInfo1.attribs.position,  // use the same buffer from bufferInfo1
 *         });
 *
 * @memberOf module:twgl
 */ /**
 * An individual array in {@link module:twgl.Arrays}
 *
 * When passed to {@link module:twgl.createBufferInfoFromArrays} if an ArraySpec is `number[]` or `ArrayBufferView`
 * the types will be guessed based on the name. `indices` will be `Uint16Array`, everything else will
 * be `Float32Array`. If an ArraySpec is a number it's the number of floats for an empty (zeroed) buffer.
 *
 * @typedef {(number|number[]|ArrayBufferView|module:twgl.FullArraySpec)} ArraySpec
 * @memberOf module:twgl
 */ /**
 * This is a JavaScript object of arrays by name. The names should match your shader's attributes. If your
 * attributes have a common prefix you can specify it by calling {@link module:twgl.setAttributePrefix}.
 *
 *     Bare JavaScript Arrays
 *
 *         var arrays = {
 *            position: [-1, 1, 0],
 *            normal: [0, 1, 0],
 *            ...
 *         }
 *
 *     Bare TypedArrays
 *
 *         var arrays = {
 *            position: new Float32Array([-1, 1, 0]),
 *            color: new Uint8Array([255, 128, 64, 255]),
 *            ...
 *         }
 *
 * *   Will guess at `numComponents` if not specified based on name.
 *
 *     If `coord` is in the name assumes `numComponents = 2`
 *
 *     If `color` is in the name assumes `numComponents = 4`
 *
 *     otherwise assumes `numComponents = 3`
 *
 * Objects with various fields. See {@link module:twgl.FullArraySpec}.
 *
 *     var arrays = {
 *       position: { numComponents: 3, data: [0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0], },
 *       texcoord: { numComponents: 2, data: [0, 0, 0, 1, 1, 0, 1, 1],                 },
 *       normal:   { numComponents: 3, data: [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],     },
 *       indices:  { numComponents: 3, data: [0, 1, 2, 1, 2, 3],                       },
 *     };
 *
 * @typedef {Object.<string, module:twgl.ArraySpec>} Arrays
 * @memberOf module:twgl
 */ /**
 * Creates a set of attribute data and WebGLBuffers from set of arrays
 *
 * Given
 *
 *      var arrays = {
 *        position: { numComponents: 3, data: [0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0], },
 *        texcoord: { numComponents: 2, data: [0, 0, 0, 1, 1, 0, 1, 1],                 },
 *        normal:   { numComponents: 3, data: [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],     },
 *        color:    { numComponents: 4, data: [255, 255, 255, 255, 255, 0, 0, 255, 0, 0, 255, 255], type: Uint8Array, },
 *        indices:  { numComponents: 3, data: [0, 1, 2, 1, 2, 3],                       },
 *      };
 *
 * returns something like
 *
 *      var attribs = {
 *        position: { numComponents: 3, type: gl.FLOAT,         normalize: false, buffer: WebGLBuffer, },
 *        texcoord: { numComponents: 2, type: gl.FLOAT,         normalize: false, buffer: WebGLBuffer, },
 *        normal:   { numComponents: 3, type: gl.FLOAT,         normalize: false, buffer: WebGLBuffer, },
 *        color:    { numComponents: 4, type: gl.UNSIGNED_BYTE, normalize: true,  buffer: WebGLBuffer, },
 *      };
 *
 * notes:
 *
 * *   Arrays can take various forms
 *
 *     Bare JavaScript Arrays
 *
 *         var arrays = {
 *            position: [-1, 1, 0],
 *            normal: [0, 1, 0],
 *            ...
 *         }
 *
 *     Bare TypedArrays
 *
 *         var arrays = {
 *            position: new Float32Array([-1, 1, 0]),
 *            color: new Uint8Array([255, 128, 64, 255]),
 *            ...
 *         }
 *
 * *   Will guess at `numComponents` if not specified based on name.
 *
 *     If `coord` is in the name assumes `numComponents = 2`
 *
 *     If `color` is in the name assumes `numComponents = 4`
 *
 *     otherwise assumes `numComponents = 3`
 *
 * @param {WebGLRenderingContext} gl The webgl rendering context.
 * @param {module:twgl.Arrays} arrays The arrays
 * @param {module:twgl.BufferInfo} [srcBufferInfo] a BufferInfo to copy from
 *   This lets you share buffers. Any arrays you supply will override
 *   the buffers from srcBufferInfo.
 * @return {Object.<string, module:twgl.AttribInfo>} the attribs
 * @memberOf module:twgl/attributes
 */ function $df29a836a27602ed$export$df835e2df67be3fe(gl, arrays) {
    const attribs = {
    };
    Object.keys(arrays).forEach(function(arrayName) {
        if (!$df29a836a27602ed$var$isIndices(arrayName)) {
            const array = arrays[arrayName];
            const attribName = array.attrib || array.name || array.attribName || $df29a836a27602ed$var$defaults.attribPrefix + arrayName;
            if (array.value) {
                if (!Array.isArray(array.value) && !$df29a836a27602ed$export$9dd3754ae86f0017(array.value)) throw new Error('array.value is not array or typedarray');
                attribs[attribName] = {
                    value: array.value
                };
            } else {
                let buffer;
                let type;
                let normalization;
                let numComponents;
                if (array.buffer && array.buffer instanceof WebGLBuffer) {
                    buffer = array.buffer;
                    numComponents = array.numComponents || array.size;
                    type = array.type;
                    normalization = array.normalize;
                } else if (typeof array === "number" || typeof array.data === "number") {
                    const numValues = array.data || array;
                    const arrayType = array.type || Float32Array;
                    const numBytes = numValues * arrayType.BYTES_PER_ELEMENT;
                    type = $df29a836a27602ed$export$9546290c15d36fce(arrayType);
                    normalization = array.normalize !== undefined ? array.normalize : $df29a836a27602ed$var$getNormalizationForTypedArrayType(arrayType);
                    numComponents = array.numComponents || array.size || $df29a836a27602ed$var$guessNumComponentsFromName(arrayName, numValues);
                    buffer = gl.createBuffer();
                    gl.bindBuffer($df29a836a27602ed$var$ARRAY_BUFFER, buffer);
                    gl.bufferData($df29a836a27602ed$var$ARRAY_BUFFER, numBytes, array.drawType || $df29a836a27602ed$var$STATIC_DRAW);
                } else {
                    const typedArray = $df29a836a27602ed$var$makeTypedArray(array, arrayName);
                    buffer = $df29a836a27602ed$export$6ea00fe9d038b3f9(gl, typedArray, undefined, array.drawType);
                    type = $df29a836a27602ed$export$bddf845047a0e959(typedArray);
                    normalization = array.normalize !== undefined ? array.normalize : $df29a836a27602ed$var$getNormalizationForTypedArray(typedArray);
                    numComponents = $df29a836a27602ed$export$bfceede8dab24cbd(array, arrayName);
                }
                attribs[attribName] = {
                    buffer: buffer,
                    numComponents: numComponents,
                    type: type,
                    normalize: normalization,
                    stride: array.stride || 0,
                    offset: array.offset || 0,
                    divisor: array.divisor === undefined ? undefined : array.divisor,
                    drawType: array.drawType
                };
            }
        }
    });
    gl.bindBuffer($df29a836a27602ed$var$ARRAY_BUFFER, null);
    return attribs;
}
/**
 * Sets the contents of a buffer attached to an attribInfo
 *
 * This is helper function to dynamically update a buffer.
 *
 * Let's say you make a bufferInfo
 *
 *     var arrays = {
 *        position: new Float32Array([0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0]),
 *        texcoord: new Float32Array([0, 0, 0, 1, 1, 0, 1, 1]),
 *        normal:   new Float32Array([0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1]),
 *        indices:  new Uint16Array([0, 1, 2, 1, 2, 3]),
 *     };
 *     var bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);
 *
 *  And you want to dynamically update the positions. You could do this
 *
 *     // assuming arrays.position has already been updated with new data.
 *     twgl.setAttribInfoBufferFromArray(gl, bufferInfo.attribs.position, arrays.position);
 *
 * @param {WebGLRenderingContext} gl
 * @param {AttribInfo} attribInfo The attribInfo who's buffer contents to set. NOTE: If you have an attribute prefix
 *   the name of the attribute will include the prefix.
 * @param {ArraySpec} array Note: it is arguably inefficient to pass in anything but a typed array because anything
 *    else will have to be converted to a typed array before it can be used by WebGL. During init time that
 *    inefficiency is usually not important but if you're updating data dynamically best to be efficient.
 * @param {number} [offset] an optional offset into the buffer. This is only an offset into the WebGL buffer
 *    not the array. To pass in an offset into the array itself use a typed array and create an `ArrayBufferView`
 *    for the portion of the array you want to use.
 *
 *        var someArray = new Float32Array(1000); // an array with 1000 floats
 *        var someSubArray = new Float32Array(someArray.buffer, offsetInBytes, sizeInUnits); // a view into someArray
 *
 *    Now you can pass `someSubArray` into setAttribInfoBufferFromArray`
 * @memberOf module:twgl/attributes
 */ function $df29a836a27602ed$export$22dc7d5fce8749be(gl, attribInfo, array, offset) {
    array = $df29a836a27602ed$var$makeTypedArray(array);
    if (offset !== undefined) {
        gl.bindBuffer($df29a836a27602ed$var$ARRAY_BUFFER, attribInfo.buffer);
        gl.bufferSubData($df29a836a27602ed$var$ARRAY_BUFFER, offset, array);
    } else $df29a836a27602ed$var$setBufferFromTypedArray(gl, $df29a836a27602ed$var$ARRAY_BUFFER, attribInfo.buffer, array, attribInfo.drawType);
}
function $df29a836a27602ed$var$getBytesPerValueForGLType(gl, type) {
    if (type === $df29a836a27602ed$var$BYTE$1) return 1; // eslint-disable-line
    if (type === $df29a836a27602ed$var$UNSIGNED_BYTE$1) return 1; // eslint-disable-line
    if (type === $df29a836a27602ed$var$SHORT$1) return 2; // eslint-disable-line
    if (type === $df29a836a27602ed$var$UNSIGNED_SHORT$1) return 2; // eslint-disable-line
    if (type === $df29a836a27602ed$var$INT$1) return 4; // eslint-disable-line
    if (type === $df29a836a27602ed$var$UNSIGNED_INT$1) return 4; // eslint-disable-line
    if (type === $df29a836a27602ed$var$FLOAT$1) return 4; // eslint-disable-line
    return 0;
}
// Tries to get the number of elements from a set of arrays.
const $df29a836a27602ed$var$positionKeys = [
    'position',
    'positions',
    'a_position'
];
function $df29a836a27602ed$var$getNumElementsFromNonIndexedArrays(arrays) {
    let key;
    let ii;
    for(ii = 0; ii < $df29a836a27602ed$var$positionKeys.length; ++ii){
        key = $df29a836a27602ed$var$positionKeys[ii];
        if (key in arrays) break;
    }
    if (ii === $df29a836a27602ed$var$positionKeys.length) key = Object.keys(arrays)[0];
    const array = arrays[key];
    const length = $df29a836a27602ed$export$251e3bdee27f62a4(array).length;
    const numComponents = $df29a836a27602ed$export$bfceede8dab24cbd(array, key);
    const numElements = length / numComponents;
    if (length % numComponents > 0) throw new Error(`numComponents ${numComponents} not correct for length ${length}`);
    return numElements;
}
function $df29a836a27602ed$var$getNumElementsFromAttributes(gl, attribs) {
    let key;
    let ii;
    for(ii = 0; ii < $df29a836a27602ed$var$positionKeys.length; ++ii){
        key = $df29a836a27602ed$var$positionKeys[ii];
        if (key in attribs) break;
        key = $df29a836a27602ed$var$defaults.attribPrefix + key;
        if (key in attribs) break;
    }
    if (ii === $df29a836a27602ed$var$positionKeys.length) key = Object.keys(attribs)[0];
    const attrib = attribs[key];
    gl.bindBuffer($df29a836a27602ed$var$ARRAY_BUFFER, attrib.buffer);
    const numBytes = gl.getBufferParameter($df29a836a27602ed$var$ARRAY_BUFFER, $df29a836a27602ed$var$BUFFER_SIZE);
    gl.bindBuffer($df29a836a27602ed$var$ARRAY_BUFFER, null);
    const bytesPerValue = $df29a836a27602ed$var$getBytesPerValueForGLType(gl, attrib.type);
    const totalElements = numBytes / bytesPerValue;
    const numComponents = attrib.numComponents || attrib.size;
    // TODO: check stride
    const numElements = totalElements / numComponents;
    if (numElements % 1 !== 0) throw new Error(`numComponents ${numComponents} not correct for length ${length}`);
    return numElements;
}
/**
 * @typedef {Object} BufferInfo
 * @property {number} numElements The number of elements to pass to `gl.drawArrays` or `gl.drawElements`.
 * @property {number} [elementType] The type of indices `UNSIGNED_BYTE`, `UNSIGNED_SHORT` etc..
 * @property {WebGLBuffer} [indices] The indices `ELEMENT_ARRAY_BUFFER` if any indices exist.
 * @property {Object.<string, module:twgl.AttribInfo>} [attribs] The attribs appropriate to call `setAttributes`
 * @memberOf module:twgl
 */ /**
 * Creates a BufferInfo from an object of arrays.
 *
 * This can be passed to {@link module:twgl.setBuffersAndAttributes} and to
 * {@link module:twgl:drawBufferInfo}.
 *
 * Given an object like
 *
 *     var arrays = {
 *       position: { numComponents: 3, data: [0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0], },
 *       texcoord: { numComponents: 2, data: [0, 0, 0, 1, 1, 0, 1, 1],                 },
 *       normal:   { numComponents: 3, data: [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],     },
 *       indices:  { numComponents: 3, data: [0, 1, 2, 1, 2, 3],                       },
 *     };
 *
 *  Creates an BufferInfo like this
 *
 *     bufferInfo = {
 *       numElements: 4,        // or whatever the number of elements is
 *       indices: WebGLBuffer,  // this property will not exist if there are no indices
 *       attribs: {
 *         position: { buffer: WebGLBuffer, numComponents: 3, },
 *         normal:   { buffer: WebGLBuffer, numComponents: 3, },
 *         texcoord: { buffer: WebGLBuffer, numComponents: 2, },
 *       },
 *     };
 *
 *  The properties of arrays can be JavaScript arrays in which case the number of components
 *  will be guessed.
 *
 *     var arrays = {
 *        position: [0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0],
 *        texcoord: [0, 0, 0, 1, 1, 0, 1, 1],
 *        normal:   [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
 *        indices:  [0, 1, 2, 1, 2, 3],
 *     };
 *
 *  They can also be TypedArrays
 *
 *     var arrays = {
 *        position: new Float32Array([0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0]),
 *        texcoord: new Float32Array([0, 0, 0, 1, 1, 0, 1, 1]),
 *        normal:   new Float32Array([0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1]),
 *        indices:  new Uint16Array([0, 1, 2, 1, 2, 3]),
 *     };
 *
 *  Or AugmentedTypedArrays
 *
 *     var positions = createAugmentedTypedArray(3, 4);
 *     var texcoords = createAugmentedTypedArray(2, 4);
 *     var normals   = createAugmentedTypedArray(3, 4);
 *     var indices   = createAugmentedTypedArray(3, 2, Uint16Array);
 *
 *     positions.push([0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0]);
 *     texcoords.push([0, 0, 0, 1, 1, 0, 1, 1]);
 *     normals.push([0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1]);
 *     indices.push([0, 1, 2, 1, 2, 3]);
 *
 *     var arrays = {
 *        position: positions,
 *        texcoord: texcoords,
 *        normal:   normals,
 *        indices:  indices,
 *     };
 *
 * For the last example it is equivalent to
 *
 *     var bufferInfo = {
 *       attribs: {
 *         position: { numComponents: 3, buffer: gl.createBuffer(), },
 *         texcoord: { numComponents: 2, buffer: gl.createBuffer(), },
 *         normal: { numComponents: 3, buffer: gl.createBuffer(), },
 *       },
 *       indices: gl.createBuffer(),
 *       numElements: 6,
 *     };
 *
 *     gl.bindBuffer(gl.ARRAY_BUFFER, bufferInfo.attribs.position.buffer);
 *     gl.bufferData(gl.ARRAY_BUFFER, arrays.position, gl.STATIC_DRAW);
 *     gl.bindBuffer(gl.ARRAY_BUFFER, bufferInfo.attribs.texcoord.buffer);
 *     gl.bufferData(gl.ARRAY_BUFFER, arrays.texcoord, gl.STATIC_DRAW);
 *     gl.bindBuffer(gl.ARRAY_BUFFER, bufferInfo.attribs.normal.buffer);
 *     gl.bufferData(gl.ARRAY_BUFFER, arrays.normal, gl.STATIC_DRAW);
 *     gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bufferInfo.indices);
 *     gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, arrays.indices, gl.STATIC_DRAW);
 *
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext
 * @param {module:twgl.Arrays} arrays Your data
 * @param {module:twgl.BufferInfo} [srcBufferInfo] An existing
 *        buffer info to start from. WebGLBuffers etc specified
 *        in the srcBufferInfo will be used in a new BufferInfo
 *        with any arrays specified overriding the ones in
 *        srcBufferInfo.
 * @return {module:twgl.BufferInfo} A BufferInfo
 * @memberOf module:twgl/attributes
 */ function $df29a836a27602ed$export$140f5b0225138840(gl, arrays, srcBufferInfo) {
    const newAttribs = $df29a836a27602ed$export$df835e2df67be3fe(gl, arrays);
    const bufferInfo = Object.assign({
    }, srcBufferInfo ? srcBufferInfo : {
    });
    bufferInfo.attribs = Object.assign({
    }, srcBufferInfo ? srcBufferInfo.attribs : {
    }, newAttribs);
    const indices = arrays.indices;
    if (indices) {
        const newIndices = $df29a836a27602ed$var$makeTypedArray(indices, "indices");
        bufferInfo.indices = $df29a836a27602ed$export$6ea00fe9d038b3f9(gl, newIndices, $df29a836a27602ed$var$ELEMENT_ARRAY_BUFFER);
        bufferInfo.numElements = newIndices.length;
        bufferInfo.elementType = $df29a836a27602ed$export$bddf845047a0e959(newIndices);
    } else if (!bufferInfo.numElements) bufferInfo.numElements = $df29a836a27602ed$var$getNumElementsFromAttributes(gl, bufferInfo.attribs);
    return bufferInfo;
}
/**
 * Creates a buffer from an array, typed array, or array spec
 *
 * Given something like this
 *
 *     [1, 2, 3],
 *
 * or
 *
 *     new Uint16Array([1,2,3]);
 *
 * or
 *
 *     {
 *        data: [1, 2, 3],
 *        type: Uint8Array,
 *     }
 *
 * returns a WebGLBuffer that contains the given data.
 *
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext.
 * @param {module:twgl.ArraySpec} array an array, typed array, or array spec.
 * @param {string} arrayName name of array. Used to guess the type if type can not be derived otherwise.
 * @return {WebGLBuffer} a WebGLBuffer containing the data in array.
 * @memberOf module:twgl/attributes
 */ function $df29a836a27602ed$export$2750db2b7c74f6a0(gl, array, arrayName) {
    const type = arrayName === "indices" ? $df29a836a27602ed$var$ELEMENT_ARRAY_BUFFER : $df29a836a27602ed$var$ARRAY_BUFFER;
    const typedArray = $df29a836a27602ed$var$makeTypedArray(array, arrayName);
    return $df29a836a27602ed$export$6ea00fe9d038b3f9(gl, typedArray, type);
}
/**
 * Creates buffers from arrays or typed arrays
 *
 * Given something like this
 *
 *     var arrays = {
 *        positions: [1, 2, 3],
 *        normals: [0, 0, 1],
 *     }
 *
 * returns something like
 *
 *     buffers = {
 *       positions: WebGLBuffer,
 *       normals: WebGLBuffer,
 *     }
 *
 * If the buffer is named 'indices' it will be made an ELEMENT_ARRAY_BUFFER.
 *
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext.
 * @param {module:twgl.Arrays} arrays
 * @return {Object<string, WebGLBuffer>} returns an object with one WebGLBuffer per array
 * @memberOf module:twgl/attributes
 */ function $df29a836a27602ed$export$69d8acce17089372(gl, arrays) {
    const buffers = {
    };
    Object.keys(arrays).forEach(function(key) {
        buffers[key] = $df29a836a27602ed$export$2750db2b7c74f6a0(gl, arrays[key], key);
    });
    // Ugh!
    if (arrays.indices) {
        buffers.numElements = arrays.indices.length;
        buffers.elementType = $df29a836a27602ed$export$bddf845047a0e959($df29a836a27602ed$var$makeTypedArray(arrays.indices));
    } else buffers.numElements = $df29a836a27602ed$var$getNumElementsFromNonIndexedArrays(arrays);
    return buffers;
}
var $df29a836a27602ed$export$16bd37df0047a29c = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    createAttribsFromArrays: $df29a836a27602ed$export$df835e2df67be3fe,
    createBuffersFromArrays: $df29a836a27602ed$export$69d8acce17089372,
    createBufferFromArray: $df29a836a27602ed$export$2750db2b7c74f6a0,
    createBufferFromTypedArray: $df29a836a27602ed$export$6ea00fe9d038b3f9,
    createBufferInfoFromArrays: $df29a836a27602ed$export$140f5b0225138840,
    setAttribInfoBufferFromArray: $df29a836a27602ed$export$22dc7d5fce8749be,
    setAttributePrefix: $df29a836a27602ed$export$8a79157a77253422,
    setAttributeDefaults_: $df29a836a27602ed$export$81400a733c5c400b,
    getNumComponents_: $df29a836a27602ed$export$bfceede8dab24cbd,
    getArray_: $df29a836a27602ed$export$251e3bdee27f62a4
});
/*
 * Copyright 2019 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */ const $df29a836a27602ed$var$getArray$1 = $df29a836a27602ed$export$251e3bdee27f62a4; // eslint-disable-line
const $df29a836a27602ed$var$getNumComponents$1 = $df29a836a27602ed$export$bfceede8dab24cbd; // eslint-disable-line
/**
 * @typedef {(Int8Array|Uint8Array|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array)} TypedArray
 */ /**
 * Add `push` to a typed array. It just keeps a 'cursor'
 * and allows use to `push` values into the array so we
 * don't have to manually compute offsets
 * @param {TypedArray} typedArray TypedArray to augment
 * @param {number} numComponents number of components.
 * @private
 */ function $df29a836a27602ed$var$augmentTypedArray(typedArray, numComponents) {
    let cursor = 0;
    typedArray.push = function() {
        for(let ii = 0; ii < arguments.length; ++ii){
            const value = arguments[ii];
            if (value instanceof Array || $df29a836a27602ed$export$9dd3754ae86f0017(value)) for(let jj = 0; jj < value.length; ++jj)typedArray[cursor++] = value[jj];
            else typedArray[cursor++] = value;
        }
    };
    typedArray.reset = function(opt_index) {
        cursor = opt_index || 0;
    };
    typedArray.numComponents = numComponents;
    Object.defineProperty(typedArray, 'numElements', {
        get: function() {
            return this.length / this.numComponents | 0;
        }
    });
    return typedArray;
}
/**
 * creates a typed array with a `push` function attached
 * so that you can easily *push* values.
 *
 * `push` can take multiple arguments. If an argument is an array each element
 * of the array will be added to the typed array.
 *
 * Example:
 *
 *     const array = createAugmentedTypedArray(3, 2);  // creates a Float32Array with 6 values
 *     array.push(1, 2, 3);
 *     array.push([4, 5, 6]);
 *     // array now contains [1, 2, 3, 4, 5, 6]
 *
 * Also has `numComponents` and `numElements` properties.
 *
 * @param {number} numComponents number of components
 * @param {number} numElements number of elements. The total size of the array will be `numComponents * numElements`.
 * @param {constructor} opt_type A constructor for the type. Default = `Float32Array`.
 * @return {ArrayBufferView} A typed array.
 * @memberOf module:twgl/primitives
 */ function $df29a836a27602ed$var$createAugmentedTypedArray(numComponents, numElements, opt_type) {
    const Type = opt_type || Float32Array;
    return $df29a836a27602ed$var$augmentTypedArray(new Type(numComponents * numElements), numComponents);
}
function $df29a836a27602ed$var$allButIndices(name) {
    return name !== "indices";
}
/**
 * Given indexed vertices creates a new set of vertices un-indexed by expanding the indexed vertices.
 * @param {Object.<string, TypedArray>} vertices The indexed vertices to deindex
 * @return {Object.<string, TypedArray>} The deindexed vertices
 * @memberOf module:twgl/primitives
 */ function $df29a836a27602ed$var$deindexVertices(vertices) {
    const indices = vertices.indices;
    const newVertices = {
    };
    const numElements = indices.length;
    function expandToUnindexed(channel) {
        const srcBuffer = vertices[channel];
        const numComponents = srcBuffer.numComponents;
        const dstBuffer = $df29a836a27602ed$var$createAugmentedTypedArray(numComponents, numElements, srcBuffer.constructor);
        for(let ii = 0; ii < numElements; ++ii){
            const ndx = indices[ii];
            const offset = ndx * numComponents;
            for(let jj = 0; jj < numComponents; ++jj)dstBuffer.push(srcBuffer[offset + jj]);
        }
        newVertices[channel] = dstBuffer;
    }
    Object.keys(vertices).filter($df29a836a27602ed$var$allButIndices).forEach(expandToUnindexed);
    return newVertices;
}
/**
 * flattens the normals of deindexed vertices in place.
 * @param {Object.<string, TypedArray>} vertices The deindexed vertices who's normals to flatten
 * @return {Object.<string, TypedArray>} The flattened vertices (same as was passed in)
 * @memberOf module:twgl/primitives
 */ function $df29a836a27602ed$var$flattenNormals(vertices) {
    if (vertices.indices) throw new Error('can not flatten normals of indexed vertices. deindex them first');
    const normals = vertices.normal;
    const numNormals = normals.length;
    for(let ii = 0; ii < numNormals; ii += 9){
        // pull out the 3 normals for this triangle
        const nax = normals[ii + 0];
        const nay = normals[ii + 1];
        const naz = normals[ii + 2];
        const nbx = normals[ii + 3];
        const nby = normals[ii + 4];
        const nbz = normals[ii + 5];
        const ncx = normals[ii + 6];
        const ncy = normals[ii + 7];
        const ncz = normals[ii + 8];
        // add them
        let nx = nax + nbx + ncx;
        let ny = nay + nby + ncy;
        let nz = naz + nbz + ncz;
        // normalize them
        const length = Math.sqrt(nx * nx + ny * ny + nz * nz);
        nx /= length;
        ny /= length;
        nz /= length;
        // copy them back in
        normals[ii + 0] = nx;
        normals[ii + 1] = ny;
        normals[ii + 2] = nz;
        normals[ii + 3] = nx;
        normals[ii + 4] = ny;
        normals[ii + 5] = nz;
        normals[ii + 6] = nx;
        normals[ii + 7] = ny;
        normals[ii + 8] = nz;
    }
    return vertices;
}
function $df29a836a27602ed$var$applyFuncToV3Array(array, matrix, fn) {
    const len = array.length;
    const tmp = new Float32Array(3);
    for(let ii = 0; ii < len; ii += 3){
        fn(matrix, [
            array[ii],
            array[ii + 1],
            array[ii + 2]
        ], tmp);
        array[ii] = tmp[0];
        array[ii + 1] = tmp[1];
        array[ii + 2] = tmp[2];
    }
}
function $df29a836a27602ed$var$transformNormal$1(mi, v, dst) {
    dst = dst || $df29a836a27602ed$var$create();
    const v0 = v[0];
    const v1 = v[1];
    const v2 = v[2];
    dst[0] = v0 * mi[0] + v1 * mi[1] + v2 * mi[2];
    dst[1] = v0 * mi[4] + v1 * mi[5] + v2 * mi[6];
    dst[2] = v0 * mi[8] + v1 * mi[9] + v2 * mi[10];
    return dst;
}
/**
 * Reorients directions by the given matrix..
 * @param {(number[]|TypedArray)} array The array. Assumes value floats per element.
 * @param {module:twgl/m4.Mat4} matrix A matrix to multiply by.
 * @return {(number[]|TypedArray)} the same array that was passed in
 * @memberOf module:twgl/primitives
 */ function $df29a836a27602ed$var$reorientDirections(array, matrix) {
    $df29a836a27602ed$var$applyFuncToV3Array(array, matrix, $df29a836a27602ed$var$transformDirection);
    return array;
}
/**
 * Reorients normals by the inverse-transpose of the given
 * matrix..
 * @param {(number[]|TypedArray)} array The array. Assumes value floats per element.
 * @param {module:twgl/m4.Mat4} matrix A matrix to multiply by.
 * @return {(number[]|TypedArray)} the same array that was passed in
 * @memberOf module:twgl/primitives
 */ function $df29a836a27602ed$var$reorientNormals(array, matrix) {
    $df29a836a27602ed$var$applyFuncToV3Array(array, $df29a836a27602ed$var$inverse(matrix), $df29a836a27602ed$var$transformNormal$1);
    return array;
}
/**
 * Reorients positions by the given matrix. In other words, it
 * multiplies each vertex by the given matrix.
 * @param {(number[]|TypedArray)} array The array. Assumes value floats per element.
 * @param {module:twgl/m4.Mat4} matrix A matrix to multiply by.
 * @return {(number[]|TypedArray)} the same array that was passed in
 * @memberOf module:twgl/primitives
 */ function $df29a836a27602ed$var$reorientPositions(array, matrix) {
    $df29a836a27602ed$var$applyFuncToV3Array(array, matrix, $df29a836a27602ed$var$transformPoint);
    return array;
}
/**
 * @typedef {(number[]|TypedArray)} NativeArrayOrTypedArray
 */ /**
 * Reorients arrays by the given matrix. Assumes arrays have
 * names that contains 'pos' could be reoriented as positions,
 * 'binorm' or 'tan' as directions, and 'norm' as normals.
 *
 * @param {Object.<string, NativeArrayOrTypedArray>} arrays The vertices to reorient
 * @param {module:twgl/m4.Mat4} matrix matrix to reorient by.
 * @return {Object.<string, NativeArrayOrTypedArray>} same arrays that were passed in.
 * @memberOf module:twgl/primitives
 */ function $df29a836a27602ed$var$reorientVertices(arrays, matrix) {
    Object.keys(arrays).forEach(function(name) {
        const array = arrays[name];
        if (name.indexOf("pos") >= 0) $df29a836a27602ed$var$reorientPositions(array, matrix);
        else if (name.indexOf("tan") >= 0 || name.indexOf("binorm") >= 0) $df29a836a27602ed$var$reorientDirections(array, matrix);
        else if (name.indexOf("norm") >= 0) $df29a836a27602ed$var$reorientNormals(array, matrix);
    });
    return arrays;
}
/**
 * Creates XY quad BufferInfo
 *
 * The default with no parameters will return a 2x2 quad with values from -1 to +1.
 * If you want a unit quad with that goes from 0 to 1 you'd call it with
 *
 *     twgl.primitives.createXYQuadBufferInfo(gl, 1, 0.5, 0.5);
 *
 * If you want a unit quad centered above 0,0 you'd call it with
 *
 *     twgl.primitives.createXYQuadBufferInfo(gl, 1, 0, 0.5);
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} [size] the size across the quad. Defaults to 2 which means vertices will go from -1 to +1
 * @param {number} [xOffset] the amount to offset the quad in X
 * @param {number} [yOffset] the amount to offset the quad in Y
 * @return {Object.<string, WebGLBuffer>} the created XY Quad BufferInfo
 * @memberOf module:twgl/primitives
 * @function createXYQuadBuffers
 */ /**
 * Creates XY quad Buffers
 *
 * The default with no parameters will return a 2x2 quad with values from -1 to +1.
 * If you want a unit quad with that goes from 0 to 1 you'd call it with
 *
 *     twgl.primitives.createXYQuadBufferInfo(gl, 1, 0.5, 0.5);
 *
 * If you want a unit quad centered above 0,0 you'd call it with
 *
 *     twgl.primitives.createXYQuadBufferInfo(gl, 1, 0, 0.5);
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} [size] the size across the quad. Defaults to 2 which means vertices will go from -1 to +1
 * @param {number} [xOffset] the amount to offset the quad in X
 * @param {number} [yOffset] the amount to offset the quad in Y
 * @return {module:twgl.BufferInfo} the created XY Quad buffers
 * @memberOf module:twgl/primitives
 * @function createXYQuadBufferInfo
 */ /**
 * Creates XY quad vertices
 *
 * The default with no parameters will return a 2x2 quad with values from -1 to +1.
 * If you want a unit quad with that goes from 0 to 1 you'd call it with
 *
 *     twgl.primitives.createXYQuadVertices(1, 0.5, 0.5);
 *
 * If you want a unit quad centered above 0,0 you'd call it with
 *
 *     twgl.primitives.createXYQuadVertices(1, 0, 0.5);
 *
 * @param {number} [size] the size across the quad. Defaults to 2 which means vertices will go from -1 to +1
 * @param {number} [xOffset] the amount to offset the quad in X
 * @param {number} [yOffset] the amount to offset the quad in Y
 * @return {Object.<string, TypedArray>} the created XY Quad vertices
 * @memberOf module:twgl/primitives
 */ function $df29a836a27602ed$var$createXYQuadVertices(size, xOffset, yOffset) {
    size = size || 2;
    xOffset = xOffset || 0;
    yOffset = yOffset || 0;
    size *= 0.5;
    return {
        position: {
            numComponents: 2,
            data: [
                xOffset + -1 * size,
                yOffset + -1 * size,
                xOffset + 1 * size,
                yOffset + -1 * size,
                xOffset + -1 * size,
                yOffset + 1 * size,
                xOffset + 1 * size,
                yOffset + 1 * size, 
            ]
        },
        normal: [
            0,
            0,
            1,
            0,
            0,
            1,
            0,
            0,
            1,
            0,
            0,
            1, 
        ],
        texcoord: [
            0,
            0,
            1,
            0,
            0,
            1,
            1,
            1, 
        ],
        indices: [
            0,
            1,
            2,
            2,
            1,
            3
        ]
    };
}
/**
 * Creates XZ plane BufferInfo.
 *
 * The created plane has position, normal, and texcoord data
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} [width] Width of the plane. Default = 1
 * @param {number} [depth] Depth of the plane. Default = 1
 * @param {number} [subdivisionsWidth] Number of steps across the plane. Default = 1
 * @param {number} [subdivisionsDepth] Number of steps down the plane. Default = 1
 * @param {module:twgl/m4.Mat4} [matrix] A matrix by which to multiply all the vertices.
 * @return {module:twgl.BufferInfo} The created plane BufferInfo.
 * @memberOf module:twgl/primitives
 * @function createPlaneBufferInfo
 */ /**
 * Creates XZ plane buffers.
 *
 * The created plane has position, normal, and texcoord data
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} [width] Width of the plane. Default = 1
 * @param {number} [depth] Depth of the plane. Default = 1
 * @param {number} [subdivisionsWidth] Number of steps across the plane. Default = 1
 * @param {number} [subdivisionsDepth] Number of steps down the plane. Default = 1
 * @param {module:twgl/m4.Mat4} [matrix] A matrix by which to multiply all the vertices.
 * @return {Object.<string, WebGLBuffer>} The created plane buffers.
 * @memberOf module:twgl/primitives
 * @function createPlaneBuffers
 */ /**
 * Creates XZ plane vertices.
 *
 * The created plane has position, normal, and texcoord data
 *
 * @param {number} [width] Width of the plane. Default = 1
 * @param {number} [depth] Depth of the plane. Default = 1
 * @param {number} [subdivisionsWidth] Number of steps across the plane. Default = 1
 * @param {number} [subdivisionsDepth] Number of steps down the plane. Default = 1
 * @param {module:twgl/m4.Mat4} [matrix] A matrix by which to multiply all the vertices.
 * @return {Object.<string, TypedArray>} The created plane vertices.
 * @memberOf module:twgl/primitives
 */ function $df29a836a27602ed$var$createPlaneVertices(width, depth, subdivisionsWidth, subdivisionsDepth, matrix) {
    width = width || 1;
    depth = depth || 1;
    subdivisionsWidth = subdivisionsWidth || 1;
    subdivisionsDepth = subdivisionsDepth || 1;
    matrix = matrix || $df29a836a27602ed$var$identity();
    const numVertices = (subdivisionsWidth + 1) * (subdivisionsDepth + 1);
    const positions = $df29a836a27602ed$var$createAugmentedTypedArray(3, numVertices);
    const normals = $df29a836a27602ed$var$createAugmentedTypedArray(3, numVertices);
    const texcoords = $df29a836a27602ed$var$createAugmentedTypedArray(2, numVertices);
    for(let z = 0; z <= subdivisionsDepth; z++)for(let x = 0; x <= subdivisionsWidth; x++){
        const u = x / subdivisionsWidth;
        const v = z / subdivisionsDepth;
        positions.push(width * u - width * 0.5, 0, depth * v - depth * 0.5);
        normals.push(0, 1, 0);
        texcoords.push(u, v);
    }
    const numVertsAcross = subdivisionsWidth + 1;
    const indices = $df29a836a27602ed$var$createAugmentedTypedArray(3, subdivisionsWidth * subdivisionsDepth * 2, Uint16Array);
    for(let z1 = 0; z1 < subdivisionsDepth; z1++)for(let x1 = 0; x1 < subdivisionsWidth; x1++){
        // Make triangle 1 of quad.
        indices.push((z1 + 0) * numVertsAcross + x1, (z1 + 1) * numVertsAcross + x1, (z1 + 0) * numVertsAcross + x1 + 1);
        // Make triangle 2 of quad.
        indices.push((z1 + 1) * numVertsAcross + x1, (z1 + 1) * numVertsAcross + x1 + 1, (z1 + 0) * numVertsAcross + x1 + 1);
    }
    const arrays = $df29a836a27602ed$var$reorientVertices({
        position: positions,
        normal: normals,
        texcoord: texcoords,
        indices: indices
    }, matrix);
    return arrays;
}
/**
 * Creates sphere BufferInfo.
 *
 * The created sphere has position, normal, and texcoord data
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} radius radius of the sphere.
 * @param {number} subdivisionsAxis number of steps around the sphere.
 * @param {number} subdivisionsHeight number of vertically on the sphere.
 * @param {number} [opt_startLatitudeInRadians] where to start the
 *     top of the sphere. Default = 0.
 * @param {number} [opt_endLatitudeInRadians] Where to end the
 *     bottom of the sphere. Default = Math.PI.
 * @param {number} [opt_startLongitudeInRadians] where to start
 *     wrapping the sphere. Default = 0.
 * @param {number} [opt_endLongitudeInRadians] where to end
 *     wrapping the sphere. Default = 2 * Math.PI.
 * @return {module:twgl.BufferInfo} The created sphere BufferInfo.
 * @memberOf module:twgl/primitives
 * @function createSphereBufferInfo
 */ /**
 * Creates sphere buffers.
 *
 * The created sphere has position, normal, and texcoord data
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} radius radius of the sphere.
 * @param {number} subdivisionsAxis number of steps around the sphere.
 * @param {number} subdivisionsHeight number of vertically on the sphere.
 * @param {number} [opt_startLatitudeInRadians] where to start the
 *     top of the sphere. Default = 0.
 * @param {number} [opt_endLatitudeInRadians] Where to end the
 *     bottom of the sphere. Default = Math.PI.
 * @param {number} [opt_startLongitudeInRadians] where to start
 *     wrapping the sphere. Default = 0.
 * @param {number} [opt_endLongitudeInRadians] where to end
 *     wrapping the sphere. Default = 2 * Math.PI.
 * @return {Object.<string, WebGLBuffer>} The created sphere buffers.
 * @memberOf module:twgl/primitives
 * @function createSphereBuffers
 */ /**
 * Creates sphere vertices.
 *
 * The created sphere has position, normal, and texcoord data
 *
 * @param {number} radius radius of the sphere.
 * @param {number} subdivisionsAxis number of steps around the sphere.
 * @param {number} subdivisionsHeight number of vertically on the sphere.
 * @param {number} [opt_startLatitudeInRadians] where to start the
 *     top of the sphere. Default = 0.
 * @param {number} [opt_endLatitudeInRadians] Where to end the
 *     bottom of the sphere. Default = Math.PI.
 * @param {number} [opt_startLongitudeInRadians] where to start
 *     wrapping the sphere. Default = 0.
 * @param {number} [opt_endLongitudeInRadians] where to end
 *     wrapping the sphere. Default = 2 * Math.PI.
 * @return {Object.<string, TypedArray>} The created sphere vertices.
 * @memberOf module:twgl/primitives
 */ function $df29a836a27602ed$var$createSphereVertices(radius, subdivisionsAxis, subdivisionsHeight, opt_startLatitudeInRadians, opt_endLatitudeInRadians, opt_startLongitudeInRadians, opt_endLongitudeInRadians) {
    if (subdivisionsAxis <= 0 || subdivisionsHeight <= 0) throw new Error('subdivisionAxis and subdivisionHeight must be > 0');
    opt_startLatitudeInRadians = opt_startLatitudeInRadians || 0;
    opt_endLatitudeInRadians = opt_endLatitudeInRadians || Math.PI;
    opt_startLongitudeInRadians = opt_startLongitudeInRadians || 0;
    opt_endLongitudeInRadians = opt_endLongitudeInRadians || Math.PI * 2;
    const latRange = opt_endLatitudeInRadians - opt_startLatitudeInRadians;
    const longRange = opt_endLongitudeInRadians - opt_startLongitudeInRadians;
    // We are going to generate our sphere by iterating through its
    // spherical coordinates and generating 2 triangles for each quad on a
    // ring of the sphere.
    const numVertices = (subdivisionsAxis + 1) * (subdivisionsHeight + 1);
    const positions = $df29a836a27602ed$var$createAugmentedTypedArray(3, numVertices);
    const normals = $df29a836a27602ed$var$createAugmentedTypedArray(3, numVertices);
    const texcoords = $df29a836a27602ed$var$createAugmentedTypedArray(2, numVertices);
    // Generate the individual vertices in our vertex buffer.
    for(let y = 0; y <= subdivisionsHeight; y++)for(let x = 0; x <= subdivisionsAxis; x++){
        // Generate a vertex based on its spherical coordinates
        const u = x / subdivisionsAxis;
        const v = y / subdivisionsHeight;
        const theta = longRange * u + opt_startLongitudeInRadians;
        const phi = latRange * v + opt_startLatitudeInRadians;
        const sinTheta = Math.sin(theta);
        const cosTheta = Math.cos(theta);
        const sinPhi = Math.sin(phi);
        const cosPhi = Math.cos(phi);
        const ux = cosTheta * sinPhi;
        const uy = cosPhi;
        const uz = sinTheta * sinPhi;
        positions.push(radius * ux, radius * uy, radius * uz);
        normals.push(ux, uy, uz);
        texcoords.push(1 - u, v);
    }
    const numVertsAround = subdivisionsAxis + 1;
    const indices = $df29a836a27602ed$var$createAugmentedTypedArray(3, subdivisionsAxis * subdivisionsHeight * 2, Uint16Array);
    for(let x2 = 0; x2 < subdivisionsAxis; x2++)for(let y1 = 0; y1 < subdivisionsHeight; y1++){
        // Make triangle 1 of quad.
        indices.push((y1 + 0) * numVertsAround + x2, (y1 + 0) * numVertsAround + x2 + 1, (y1 + 1) * numVertsAround + x2);
        // Make triangle 2 of quad.
        indices.push((y1 + 1) * numVertsAround + x2, (y1 + 0) * numVertsAround + x2 + 1, (y1 + 1) * numVertsAround + x2 + 1);
    }
    return {
        position: positions,
        normal: normals,
        texcoord: texcoords,
        indices: indices
    };
}
/**
 * Array of the indices of corners of each face of a cube.
 * @type {Array.<number[]>}
 * @private
 */ const $df29a836a27602ed$var$CUBE_FACE_INDICES = [
    [
        3,
        7,
        5,
        1
    ],
    [
        6,
        2,
        0,
        4
    ],
    [
        6,
        7,
        3,
        2
    ],
    [
        0,
        1,
        5,
        4
    ],
    [
        7,
        6,
        4,
        5
    ],
    [
        2,
        3,
        1,
        0
    ]
];
/**
 * Creates a BufferInfo for a cube.
 *
 * The cube is created around the origin. (-size / 2, size / 2).
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} [size] width, height and depth of the cube.
 * @return {module:twgl.BufferInfo} The created BufferInfo.
 * @memberOf module:twgl/primitives
 * @function createCubeBufferInfo
 */ /**
 * Creates the buffers and indices for a cube.
 *
 * The cube is created around the origin. (-size / 2, size / 2).
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} [size] width, height and depth of the cube.
 * @return {Object.<string, WebGLBuffer>} The created buffers.
 * @memberOf module:twgl/primitives
 * @function createCubeBuffers
 */ /**
 * Creates the vertices and indices for a cube.
 *
 * The cube is created around the origin. (-size / 2, size / 2).
 *
 * @param {number} [size] width, height and depth of the cube.
 * @return {Object.<string, TypedArray>} The created vertices.
 * @memberOf module:twgl/primitives
 */ function $df29a836a27602ed$var$createCubeVertices(size) {
    size = size || 1;
    const k = size / 2;
    const cornerVertices = [
        [
            -k,
            -k,
            -k
        ],
        [
            +k,
            -k,
            -k
        ],
        [
            -k,
            +k,
            -k
        ],
        [
            +k,
            +k,
            -k
        ],
        [
            -k,
            -k,
            +k
        ],
        [
            +k,
            -k,
            +k
        ],
        [
            -k,
            +k,
            +k
        ],
        [
            +k,
            +k,
            +k
        ], 
    ];
    const faceNormals = [
        [
            1,
            0,
            0
        ],
        [
            -1,
            0,
            0
        ],
        [
            0,
            1,
            0
        ],
        [
            0,
            -1,
            0
        ],
        [
            0,
            0,
            1
        ],
        [
            0,
            0,
            -1
        ], 
    ];
    const uvCoords = [
        [
            1,
            0
        ],
        [
            0,
            0
        ],
        [
            0,
            1
        ],
        [
            1,
            1
        ], 
    ];
    const numVertices = 24;
    const positions = $df29a836a27602ed$var$createAugmentedTypedArray(3, numVertices);
    const normals = $df29a836a27602ed$var$createAugmentedTypedArray(3, numVertices);
    const texcoords = $df29a836a27602ed$var$createAugmentedTypedArray(2, numVertices);
    const indices = $df29a836a27602ed$var$createAugmentedTypedArray(3, 12, Uint16Array);
    for(let f = 0; f < 6; ++f){
        const faceIndices = $df29a836a27602ed$var$CUBE_FACE_INDICES[f];
        for(let v = 0; v < 4; ++v){
            const position = cornerVertices[faceIndices[v]];
            const normal = faceNormals[f];
            const uv = uvCoords[v];
            // Each face needs all four vertices because the normals and texture
            // coordinates are not all the same.
            positions.push(position);
            normals.push(normal);
            texcoords.push(uv);
        }
        // Two triangles make a square face.
        const offset = 4 * f;
        indices.push(offset + 0, offset + 1, offset + 2);
        indices.push(offset + 0, offset + 2, offset + 3);
    }
    return {
        position: positions,
        normal: normals,
        texcoord: texcoords,
        indices: indices
    };
}
/**
 * Creates a BufferInfo for a truncated cone, which is like a cylinder
 * except that it has different top and bottom radii. A truncated cone
 * can also be used to create cylinders and regular cones. The
 * truncated cone will be created centered about the origin, with the
 * y axis as its vertical axis.
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} bottomRadius Bottom radius of truncated cone.
 * @param {number} topRadius Top radius of truncated cone.
 * @param {number} height Height of truncated cone.
 * @param {number} radialSubdivisions The number of subdivisions around the
 *     truncated cone.
 * @param {number} verticalSubdivisions The number of subdivisions down the
 *     truncated cone.
 * @param {boolean} [opt_topCap] Create top cap. Default = true.
 * @param {boolean} [opt_bottomCap] Create bottom cap. Default = true.
 * @return {module:twgl.BufferInfo} The created cone BufferInfo.
 * @memberOf module:twgl/primitives
 * @function createTruncatedConeBufferInfo
 */ /**
 * Creates buffers for a truncated cone, which is like a cylinder
 * except that it has different top and bottom radii. A truncated cone
 * can also be used to create cylinders and regular cones. The
 * truncated cone will be created centered about the origin, with the
 * y axis as its vertical axis.
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} bottomRadius Bottom radius of truncated cone.
 * @param {number} topRadius Top radius of truncated cone.
 * @param {number} height Height of truncated cone.
 * @param {number} radialSubdivisions The number of subdivisions around the
 *     truncated cone.
 * @param {number} verticalSubdivisions The number of subdivisions down the
 *     truncated cone.
 * @param {boolean} [opt_topCap] Create top cap. Default = true.
 * @param {boolean} [opt_bottomCap] Create bottom cap. Default = true.
 * @return {Object.<string, WebGLBuffer>} The created cone buffers.
 * @memberOf module:twgl/primitives
 * @function createTruncatedConeBuffers
 */ /**
 * Creates vertices for a truncated cone, which is like a cylinder
 * except that it has different top and bottom radii. A truncated cone
 * can also be used to create cylinders and regular cones. The
 * truncated cone will be created centered about the origin, with the
 * y axis as its vertical axis. .
 *
 * @param {number} bottomRadius Bottom radius of truncated cone.
 * @param {number} topRadius Top radius of truncated cone.
 * @param {number} height Height of truncated cone.
 * @param {number} radialSubdivisions The number of subdivisions around the
 *     truncated cone.
 * @param {number} verticalSubdivisions The number of subdivisions down the
 *     truncated cone.
 * @param {boolean} [opt_topCap] Create top cap. Default = true.
 * @param {boolean} [opt_bottomCap] Create bottom cap. Default = true.
 * @return {Object.<string, TypedArray>} The created cone vertices.
 * @memberOf module:twgl/primitives
 */ function $df29a836a27602ed$var$createTruncatedConeVertices(bottomRadius, topRadius, height, radialSubdivisions, verticalSubdivisions, opt_topCap, opt_bottomCap) {
    if (radialSubdivisions < 3) throw new Error('radialSubdivisions must be 3 or greater');
    if (verticalSubdivisions < 1) throw new Error('verticalSubdivisions must be 1 or greater');
    const topCap = opt_topCap === undefined ? true : opt_topCap;
    const bottomCap = opt_bottomCap === undefined ? true : opt_bottomCap;
    const extra = (topCap ? 2 : 0) + (bottomCap ? 2 : 0);
    const numVertices = (radialSubdivisions + 1) * (verticalSubdivisions + 1 + extra);
    const positions = $df29a836a27602ed$var$createAugmentedTypedArray(3, numVertices);
    const normals = $df29a836a27602ed$var$createAugmentedTypedArray(3, numVertices);
    const texcoords = $df29a836a27602ed$var$createAugmentedTypedArray(2, numVertices);
    const indices = $df29a836a27602ed$var$createAugmentedTypedArray(3, radialSubdivisions * (verticalSubdivisions + extra / 2) * 2, Uint16Array);
    const vertsAroundEdge = radialSubdivisions + 1;
    // The slant of the cone is constant across its surface
    const slant = Math.atan2(bottomRadius - topRadius, height);
    const cosSlant = Math.cos(slant);
    const sinSlant = Math.sin(slant);
    const start = topCap ? -2 : 0;
    const end = verticalSubdivisions + (bottomCap ? 2 : 0);
    for(let yy = start; yy <= end; ++yy){
        let v = yy / verticalSubdivisions;
        let y = height * v;
        let ringRadius;
        if (yy < 0) {
            y = 0;
            v = 1;
            ringRadius = bottomRadius;
        } else if (yy > verticalSubdivisions) {
            y = height;
            v = 1;
            ringRadius = topRadius;
        } else ringRadius = bottomRadius + (topRadius - bottomRadius) * (yy / verticalSubdivisions);
        if (yy === -2 || yy === verticalSubdivisions + 2) {
            ringRadius = 0;
            v = 0;
        }
        y -= height / 2;
        for(let ii = 0; ii < vertsAroundEdge; ++ii){
            const sin = Math.sin(ii * Math.PI * 2 / radialSubdivisions);
            const cos = Math.cos(ii * Math.PI * 2 / radialSubdivisions);
            positions.push(sin * ringRadius, y, cos * ringRadius);
            if (yy < 0) normals.push(0, -1, 0);
            else if (yy > verticalSubdivisions) normals.push(0, 1, 0);
            else if (ringRadius === 0) normals.push(0, 0, 0);
            else normals.push(sin * cosSlant, sinSlant, cos * cosSlant);
            texcoords.push(ii / radialSubdivisions, 1 - v);
        }
    }
    for(let yy1 = 0; yy1 < verticalSubdivisions + extra; ++yy1){
        if (yy1 === 1 && topCap || yy1 === verticalSubdivisions + extra - 2 && bottomCap) continue;
        for(let ii = 0; ii < radialSubdivisions; ++ii){
            indices.push(vertsAroundEdge * (yy1 + 0) + 0 + ii, vertsAroundEdge * (yy1 + 0) + 1 + ii, vertsAroundEdge * (yy1 + 1) + 1 + ii);
            indices.push(vertsAroundEdge * (yy1 + 0) + 0 + ii, vertsAroundEdge * (yy1 + 1) + 1 + ii, vertsAroundEdge * (yy1 + 1) + 0 + ii);
        }
    }
    return {
        position: positions,
        normal: normals,
        texcoord: texcoords,
        indices: indices
    };
}
/**
 * Expands RLE data
 * @param {number[]} rleData data in format of run-length, x, y, z, run-length, x, y, z
 * @param {number[]} [padding] value to add each entry with.
 * @return {number[]} the expanded rleData
 * @private
 */ function $df29a836a27602ed$var$expandRLEData(rleData, padding) {
    padding = padding || [];
    const data = [];
    for(let ii = 0; ii < rleData.length; ii += 4){
        const runLength = rleData[ii];
        const element = rleData.slice(ii + 1, ii + 4);
        element.push.apply(element, padding);
        for(let jj = 0; jj < runLength; ++jj)data.push.apply(data, element);
    }
    return data;
}
/**
 * Creates 3D 'F' BufferInfo.
 * An 'F' is useful because you can easily tell which way it is oriented.
 * The created 'F' has position, normal, texcoord, and color buffers.
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @return {module:twgl.BufferInfo} The created BufferInfo.
 * @memberOf module:twgl/primitives
 * @function create3DFBufferInfo
 */ /**
 * Creates 3D 'F' buffers.
 * An 'F' is useful because you can easily tell which way it is oriented.
 * The created 'F' has position, normal, texcoord, and color buffers.
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @return {Object.<string, WebGLBuffer>} The created buffers.
 * @memberOf module:twgl/primitives
 * @function create3DFBuffers
 */ /**
 * Creates 3D 'F' vertices.
 * An 'F' is useful because you can easily tell which way it is oriented.
 * The created 'F' has position, normal, texcoord, and color arrays.
 *
 * @return {Object.<string, TypedArray>} The created vertices.
 * @memberOf module:twgl/primitives
 */ function $df29a836a27602ed$var$create3DFVertices() {
    const positions = [
        // left column front
        0,
        0,
        0,
        0,
        150,
        0,
        30,
        0,
        0,
        0,
        150,
        0,
        30,
        150,
        0,
        30,
        0,
        0,
        // top rung front
        30,
        0,
        0,
        30,
        30,
        0,
        100,
        0,
        0,
        30,
        30,
        0,
        100,
        30,
        0,
        100,
        0,
        0,
        // middle rung front
        30,
        60,
        0,
        30,
        90,
        0,
        67,
        60,
        0,
        30,
        90,
        0,
        67,
        90,
        0,
        67,
        60,
        0,
        // left column back
        0,
        0,
        30,
        30,
        0,
        30,
        0,
        150,
        30,
        0,
        150,
        30,
        30,
        0,
        30,
        30,
        150,
        30,
        // top rung back
        30,
        0,
        30,
        100,
        0,
        30,
        30,
        30,
        30,
        30,
        30,
        30,
        100,
        0,
        30,
        100,
        30,
        30,
        // middle rung back
        30,
        60,
        30,
        67,
        60,
        30,
        30,
        90,
        30,
        30,
        90,
        30,
        67,
        60,
        30,
        67,
        90,
        30,
        // top
        0,
        0,
        0,
        100,
        0,
        0,
        100,
        0,
        30,
        0,
        0,
        0,
        100,
        0,
        30,
        0,
        0,
        30,
        // top rung front
        100,
        0,
        0,
        100,
        30,
        0,
        100,
        30,
        30,
        100,
        0,
        0,
        100,
        30,
        30,
        100,
        0,
        30,
        // under top rung
        30,
        30,
        0,
        30,
        30,
        30,
        100,
        30,
        30,
        30,
        30,
        0,
        100,
        30,
        30,
        100,
        30,
        0,
        // between top rung and middle
        30,
        30,
        0,
        30,
        60,
        30,
        30,
        30,
        30,
        30,
        30,
        0,
        30,
        60,
        0,
        30,
        60,
        30,
        // top of middle rung
        30,
        60,
        0,
        67,
        60,
        30,
        30,
        60,
        30,
        30,
        60,
        0,
        67,
        60,
        0,
        67,
        60,
        30,
        // front of middle rung
        67,
        60,
        0,
        67,
        90,
        30,
        67,
        60,
        30,
        67,
        60,
        0,
        67,
        90,
        0,
        67,
        90,
        30,
        // bottom of middle rung.
        30,
        90,
        0,
        30,
        90,
        30,
        67,
        90,
        30,
        30,
        90,
        0,
        67,
        90,
        30,
        67,
        90,
        0,
        // front of bottom
        30,
        90,
        0,
        30,
        150,
        30,
        30,
        90,
        30,
        30,
        90,
        0,
        30,
        150,
        0,
        30,
        150,
        30,
        // bottom
        0,
        150,
        0,
        0,
        150,
        30,
        30,
        150,
        30,
        0,
        150,
        0,
        30,
        150,
        30,
        30,
        150,
        0,
        // left side
        0,
        0,
        0,
        0,
        0,
        30,
        0,
        150,
        30,
        0,
        0,
        0,
        0,
        150,
        30,
        0,
        150,
        0, 
    ];
    const texcoords = [
        // left column front
        0.22,
        0.19,
        0.22,
        0.79,
        0.34,
        0.19,
        0.22,
        0.79,
        0.34,
        0.79,
        0.34,
        0.19,
        // top rung front
        0.34,
        0.19,
        0.34,
        0.31,
        0.62,
        0.19,
        0.34,
        0.31,
        0.62,
        0.31,
        0.62,
        0.19,
        // middle rung front
        0.34,
        0.43,
        0.34,
        0.55,
        0.49,
        0.43,
        0.34,
        0.55,
        0.49,
        0.55,
        0.49,
        0.43,
        // left column back
        0,
        0,
        1,
        0,
        0,
        1,
        0,
        1,
        1,
        0,
        1,
        1,
        // top rung back
        0,
        0,
        1,
        0,
        0,
        1,
        0,
        1,
        1,
        0,
        1,
        1,
        // middle rung back
        0,
        0,
        1,
        0,
        0,
        1,
        0,
        1,
        1,
        0,
        1,
        1,
        // top
        0,
        0,
        1,
        0,
        1,
        1,
        0,
        0,
        1,
        1,
        0,
        1,
        // top rung front
        0,
        0,
        1,
        0,
        1,
        1,
        0,
        0,
        1,
        1,
        0,
        1,
        // under top rung
        0,
        0,
        0,
        1,
        1,
        1,
        0,
        0,
        1,
        1,
        1,
        0,
        // between top rung and middle
        0,
        0,
        1,
        1,
        0,
        1,
        0,
        0,
        1,
        0,
        1,
        1,
        // top of middle rung
        0,
        0,
        1,
        1,
        0,
        1,
        0,
        0,
        1,
        0,
        1,
        1,
        // front of middle rung
        0,
        0,
        1,
        1,
        0,
        1,
        0,
        0,
        1,
        0,
        1,
        1,
        // bottom of middle rung.
        0,
        0,
        0,
        1,
        1,
        1,
        0,
        0,
        1,
        1,
        1,
        0,
        // front of bottom
        0,
        0,
        1,
        1,
        0,
        1,
        0,
        0,
        1,
        0,
        1,
        1,
        // bottom
        0,
        0,
        0,
        1,
        1,
        1,
        0,
        0,
        1,
        1,
        1,
        0,
        // left side
        0,
        0,
        0,
        1,
        1,
        1,
        0,
        0,
        1,
        1,
        1,
        0, 
    ];
    const normals = $df29a836a27602ed$var$expandRLEData([
        // left column front
        // top rung front
        // middle rung front
        18,
        0,
        0,
        1,
        // left column back
        // top rung back
        // middle rung back
        18,
        0,
        0,
        -1,
        // top
        6,
        0,
        1,
        0,
        // top rung front
        6,
        1,
        0,
        0,
        // under top rung
        6,
        0,
        -1,
        0,
        // between top rung and middle
        6,
        1,
        0,
        0,
        // top of middle rung
        6,
        0,
        1,
        0,
        // front of middle rung
        6,
        1,
        0,
        0,
        // bottom of middle rung.
        6,
        0,
        -1,
        0,
        // front of bottom
        6,
        1,
        0,
        0,
        // bottom
        6,
        0,
        -1,
        0,
        // left side
        6,
        -1,
        0,
        0, 
    ]);
    const colors = $df29a836a27602ed$var$expandRLEData([
        // left column front
        // top rung front
        // middle rung front
        18,
        200,
        70,
        120,
        // left column back
        // top rung back
        // middle rung back
        18,
        80,
        70,
        200,
        // top
        6,
        70,
        200,
        210,
        // top rung front
        6,
        200,
        200,
        70,
        // under top rung
        6,
        210,
        100,
        70,
        // between top rung and middle
        6,
        210,
        160,
        70,
        // top of middle rung
        6,
        70,
        180,
        210,
        // front of middle rung
        6,
        100,
        70,
        210,
        // bottom of middle rung.
        6,
        76,
        210,
        100,
        // front of bottom
        6,
        140,
        210,
        80,
        // bottom
        6,
        90,
        130,
        110,
        // left side
        6,
        160,
        160,
        220, 
    ], [
        255
    ]);
    const numVerts = positions.length / 3;
    const arrays = {
        position: $df29a836a27602ed$var$createAugmentedTypedArray(3, numVerts),
        texcoord: $df29a836a27602ed$var$createAugmentedTypedArray(2, numVerts),
        normal: $df29a836a27602ed$var$createAugmentedTypedArray(3, numVerts),
        color: $df29a836a27602ed$var$createAugmentedTypedArray(4, numVerts, Uint8Array),
        indices: $df29a836a27602ed$var$createAugmentedTypedArray(3, numVerts / 3, Uint16Array)
    };
    arrays.position.push(positions);
    arrays.texcoord.push(texcoords);
    arrays.normal.push(normals);
    arrays.color.push(colors);
    for(let ii = 0; ii < numVerts; ++ii)arrays.indices.push(ii);
    return arrays;
}
/**
 * Creates crescent BufferInfo.
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} verticalRadius The vertical radius of the crescent.
 * @param {number} outerRadius The outer radius of the crescent.
 * @param {number} innerRadius The inner radius of the crescent.
 * @param {number} thickness The thickness of the crescent.
 * @param {number} subdivisionsDown number of steps around the crescent.
 * @param {number} [startOffset] Where to start arc. Default 0.
 * @param {number} [endOffset] Where to end arg. Default 1.
 * @return {module:twgl.BufferInfo} The created BufferInfo.
 * @memberOf module:twgl/primitives
 * @function createCresentBufferInfo
 */ /**
 * Creates crescent buffers.
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} verticalRadius The vertical radius of the crescent.
 * @param {number} outerRadius The outer radius of the crescent.
 * @param {number} innerRadius The inner radius of the crescent.
 * @param {number} thickness The thickness of the crescent.
 * @param {number} subdivisionsDown number of steps around the crescent.
 * @param {number} [startOffset] Where to start arc. Default 0.
 * @param {number} [endOffset] Where to end arg. Default 1.
 * @return {Object.<string, WebGLBuffer>} The created buffers.
 * @memberOf module:twgl/primitives
 * @function createCresentBuffers
 */ /**
 * Creates crescent vertices.
 *
 * @param {number} verticalRadius The vertical radius of the crescent.
 * @param {number} outerRadius The outer radius of the crescent.
 * @param {number} innerRadius The inner radius of the crescent.
 * @param {number} thickness The thickness of the crescent.
 * @param {number} subdivisionsDown number of steps around the crescent.
 * @param {number} [startOffset] Where to start arc. Default 0.
 * @param {number} [endOffset] Where to end arg. Default 1.
 * @return {Object.<string, TypedArray>} The created vertices.
 * @memberOf module:twgl/primitives
 * @function createCresentBuffers
 */ /**
 * Creates crescent BufferInfo.
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} verticalRadius The vertical radius of the crescent.
 * @param {number} outerRadius The outer radius of the crescent.
 * @param {number} innerRadius The inner radius of the crescent.
 * @param {number} thickness The thickness of the crescent.
 * @param {number} subdivisionsDown number of steps around the crescent.
 * @param {number} [startOffset] Where to start arc. Default 0.
 * @param {number} [endOffset] Where to end arg. Default 1.
 * @return {module:twgl.BufferInfo} The created BufferInfo.
 * @memberOf module:twgl/primitives
 * @function createCrescentBufferInfo
 */ /**
 * Creates crescent buffers.
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} verticalRadius The vertical radius of the crescent.
 * @param {number} outerRadius The outer radius of the crescent.
 * @param {number} innerRadius The inner radius of the crescent.
 * @param {number} thickness The thickness of the crescent.
 * @param {number} subdivisionsDown number of steps around the crescent.
 * @param {number} [startOffset] Where to start arc. Default 0.
 * @param {number} [endOffset] Where to end arg. Default 1.
 * @return {Object.<string, WebGLBuffer>} The created buffers.
 * @memberOf module:twgl/primitives
 * @function createCrescentBuffers
 */ /**
 * Creates crescent vertices.
 *
 * @param {number} verticalRadius The vertical radius of the crescent.
 * @param {number} outerRadius The outer radius of the crescent.
 * @param {number} innerRadius The inner radius of the crescent.
 * @param {number} thickness The thickness of the crescent.
 * @param {number} subdivisionsDown number of steps around the crescent.
 * @param {number} [startOffset] Where to start arc. Default 0.
 * @param {number} [endOffset] Where to end arg. Default 1.
 * @return {Object.<string, TypedArray>} The created vertices.
 * @memberOf module:twgl/primitives
 */ function $df29a836a27602ed$var$createCrescentVertices(verticalRadius, outerRadius, innerRadius, thickness, subdivisionsDown, startOffset, endOffset) {
    if (subdivisionsDown <= 0) throw new Error('subdivisionDown must be > 0');
    startOffset = startOffset || 0;
    endOffset = endOffset || 1;
    const subdivisionsThick = 2;
    const offsetRange = endOffset - startOffset;
    const numVertices = (subdivisionsDown + 1) * 2 * (2 + subdivisionsThick);
    const positions = $df29a836a27602ed$var$createAugmentedTypedArray(3, numVertices);
    const normals = $df29a836a27602ed$var$createAugmentedTypedArray(3, numVertices);
    const texcoords = $df29a836a27602ed$var$createAugmentedTypedArray(2, numVertices);
    function lerp(a, b, s) {
        return a + (b - a) * s;
    }
    function createArc(arcRadius, x, normalMult, normalAdd, uMult, uAdd) {
        for(let z = 0; z <= subdivisionsDown; z++){
            const uBack = x / (subdivisionsThick - 1);
            const v = z / subdivisionsDown;
            const xBack = (uBack - 0.5) * 2;
            const angle = (startOffset + v * offsetRange) * Math.PI;
            const s = Math.sin(angle);
            const c = Math.cos(angle);
            const radius = lerp(verticalRadius, arcRadius, s);
            const px = xBack * thickness;
            const py = c * verticalRadius;
            const pz = s * radius;
            positions.push(px, py, pz);
            const n = $df29a836a27602ed$var$add($df29a836a27602ed$var$multiply([
                0,
                s,
                c
            ], normalMult), normalAdd);
            normals.push(n);
            texcoords.push(uBack * uMult + uAdd, v);
        }
    }
    // Generate the individual vertices in our vertex buffer.
    for(let x3 = 0; x3 < subdivisionsThick; x3++){
        const uBack = (x3 / (subdivisionsThick - 1) - 0.5) * 2;
        createArc(outerRadius, x3, [
            1,
            1,
            1
        ], [
            0,
            0,
            0
        ], 1, 0);
        createArc(outerRadius, x3, [
            0,
            0,
            0
        ], [
            uBack,
            0,
            0
        ], 0, 0);
        createArc(innerRadius, x3, [
            1,
            1,
            1
        ], [
            0,
            0,
            0
        ], 1, 0);
        createArc(innerRadius, x3, [
            0,
            0,
            0
        ], [
            uBack,
            0,
            0
        ], 0, 1);
    }
    // Do outer surface.
    const indices = $df29a836a27602ed$var$createAugmentedTypedArray(3, subdivisionsDown * 2 * (2 + subdivisionsThick), Uint16Array);
    function createSurface(leftArcOffset, rightArcOffset) {
        for(let z = 0; z < subdivisionsDown; ++z){
            // Make triangle 1 of quad.
            indices.push(leftArcOffset + z + 0, leftArcOffset + z + 1, rightArcOffset + z + 0);
            // Make triangle 2 of quad.
            indices.push(leftArcOffset + z + 1, rightArcOffset + z + 1, rightArcOffset + z + 0);
        }
    }
    const numVerticesDown = subdivisionsDown + 1;
    // front
    createSurface(numVerticesDown * 0, numVerticesDown * 4);
    // right
    createSurface(numVerticesDown * 5, numVerticesDown * 7);
    // back
    createSurface(numVerticesDown * 6, numVerticesDown * 2);
    // left
    createSurface(numVerticesDown * 3, numVerticesDown * 1);
    return {
        position: positions,
        normal: normals,
        texcoord: texcoords,
        indices: indices
    };
}
/**
 * Creates cylinder BufferInfo. The cylinder will be created around the origin
 * along the y-axis.
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} radius Radius of cylinder.
 * @param {number} height Height of cylinder.
 * @param {number} radialSubdivisions The number of subdivisions around the cylinder.
 * @param {number} verticalSubdivisions The number of subdivisions down the cylinder.
 * @param {boolean} [topCap] Create top cap. Default = true.
 * @param {boolean} [bottomCap] Create bottom cap. Default = true.
 * @return {module:twgl.BufferInfo} The created BufferInfo.
 * @memberOf module:twgl/primitives
 * @function createCylinderBufferInfo
 */ /**
  * Creates cylinder buffers. The cylinder will be created around the origin
  * along the y-axis.
  *
  * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
  * @param {number} radius Radius of cylinder.
  * @param {number} height Height of cylinder.
  * @param {number} radialSubdivisions The number of subdivisions around the cylinder.
  * @param {number} verticalSubdivisions The number of subdivisions down the cylinder.
  * @param {boolean} [topCap] Create top cap. Default = true.
  * @param {boolean} [bottomCap] Create bottom cap. Default = true.
  * @return {Object.<string, WebGLBuffer>} The created buffers.
  * @memberOf module:twgl/primitives
  * @function createCylinderBuffers
  */ /**
  * Creates cylinder vertices. The cylinder will be created around the origin
  * along the y-axis.
  *
  * @param {number} radius Radius of cylinder.
  * @param {number} height Height of cylinder.
  * @param {number} radialSubdivisions The number of subdivisions around the cylinder.
  * @param {number} verticalSubdivisions The number of subdivisions down the cylinder.
  * @param {boolean} [topCap] Create top cap. Default = true.
  * @param {boolean} [bottomCap] Create bottom cap. Default = true.
  * @return {Object.<string, TypedArray>} The created vertices.
  * @memberOf module:twgl/primitives
  */ function $df29a836a27602ed$var$createCylinderVertices(radius, height, radialSubdivisions, verticalSubdivisions, topCap, bottomCap) {
    return $df29a836a27602ed$var$createTruncatedConeVertices(radius, radius, height, radialSubdivisions, verticalSubdivisions, topCap, bottomCap);
}
/**
 * Creates BufferInfo for a torus
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} radius radius of center of torus circle.
 * @param {number} thickness radius of torus ring.
 * @param {number} radialSubdivisions The number of subdivisions around the torus.
 * @param {number} bodySubdivisions The number of subdivisions around the body torus.
 * @param {boolean} [startAngle] start angle in radians. Default = 0.
 * @param {boolean} [endAngle] end angle in radians. Default = Math.PI * 2.
 * @return {module:twgl.BufferInfo} The created BufferInfo.
 * @memberOf module:twgl/primitives
 * @function createTorusBufferInfo
 */ /**
 * Creates buffers for a torus
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} radius radius of center of torus circle.
 * @param {number} thickness radius of torus ring.
 * @param {number} radialSubdivisions The number of subdivisions around the torus.
 * @param {number} bodySubdivisions The number of subdivisions around the body torus.
 * @param {boolean} [startAngle] start angle in radians. Default = 0.
 * @param {boolean} [endAngle] end angle in radians. Default = Math.PI * 2.
 * @return {Object.<string, WebGLBuffer>} The created buffers.
 * @memberOf module:twgl/primitives
 * @function createTorusBuffers
 */ /**
 * Creates vertices for a torus
 *
 * @param {number} radius radius of center of torus circle.
 * @param {number} thickness radius of torus ring.
 * @param {number} radialSubdivisions The number of subdivisions around the torus.
 * @param {number} bodySubdivisions The number of subdivisions around the body torus.
 * @param {boolean} [startAngle] start angle in radians. Default = 0.
 * @param {boolean} [endAngle] end angle in radians. Default = Math.PI * 2.
 * @return {Object.<string, TypedArray>} The created vertices.
 * @memberOf module:twgl/primitives
 */ function $df29a836a27602ed$var$createTorusVertices(radius, thickness, radialSubdivisions, bodySubdivisions, startAngle, endAngle) {
    if (radialSubdivisions < 3) throw new Error('radialSubdivisions must be 3 or greater');
    if (bodySubdivisions < 3) throw new Error('verticalSubdivisions must be 3 or greater');
    startAngle = startAngle || 0;
    endAngle = endAngle || Math.PI * 2;
    const range = endAngle - startAngle;
    const radialParts = radialSubdivisions + 1;
    const bodyParts = bodySubdivisions + 1;
    const numVertices = radialParts * bodyParts;
    const positions = $df29a836a27602ed$var$createAugmentedTypedArray(3, numVertices);
    const normals = $df29a836a27602ed$var$createAugmentedTypedArray(3, numVertices);
    const texcoords = $df29a836a27602ed$var$createAugmentedTypedArray(2, numVertices);
    const indices = $df29a836a27602ed$var$createAugmentedTypedArray(3, radialSubdivisions * bodySubdivisions * 2, Uint16Array);
    for(let slice = 0; slice < bodyParts; ++slice){
        const v = slice / bodySubdivisions;
        const sliceAngle = v * Math.PI * 2;
        const sliceSin = Math.sin(sliceAngle);
        const ringRadius = radius + sliceSin * thickness;
        const ny = Math.cos(sliceAngle);
        const y = ny * thickness;
        for(let ring = 0; ring < radialParts; ++ring){
            const u = ring / radialSubdivisions;
            const ringAngle = startAngle + u * range;
            const xSin = Math.sin(ringAngle);
            const zCos = Math.cos(ringAngle);
            const x = xSin * ringRadius;
            const z = zCos * ringRadius;
            const nx = xSin * sliceSin;
            const nz = zCos * sliceSin;
            positions.push(x, y, z);
            normals.push(nx, ny, nz);
            texcoords.push(u, 1 - v);
        }
    }
    for(let slice1 = 0; slice1 < bodySubdivisions; ++slice1)for(let ring = 0; ring < radialSubdivisions; ++ring){
        const nextRingIndex = 1 + ring;
        const nextSliceIndex = 1 + slice1;
        indices.push(radialParts * slice1 + ring, radialParts * nextSliceIndex + ring, radialParts * slice1 + nextRingIndex);
        indices.push(radialParts * nextSliceIndex + ring, radialParts * nextSliceIndex + nextRingIndex, radialParts * slice1 + nextRingIndex);
    }
    return {
        position: positions,
        normal: normals,
        texcoord: texcoords,
        indices: indices
    };
}
/**
 * Creates a disc BufferInfo. The disc will be in the xz plane, centered at
 * the origin. When creating, at least 3 divisions, or pie
 * pieces, need to be specified, otherwise the triangles making
 * up the disc will be degenerate. You can also specify the
 * number of radial pieces `stacks`. A value of 1 for
 * stacks will give you a simple disc of pie pieces.  If you
 * want to create an annulus you can set `innerRadius` to a
 * value > 0. Finally, `stackPower` allows you to have the widths
 * increase or decrease as you move away from the center. This
 * is particularly useful when using the disc as a ground plane
 * with a fixed camera such that you don't need the resolution
 * of small triangles near the perimeter. For example, a value
 * of 2 will produce stacks whose outside radius increases with
 * the square of the stack index. A value of 1 will give uniform
 * stacks.
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} radius Radius of the ground plane.
 * @param {number} divisions Number of triangles in the ground plane (at least 3).
 * @param {number} [stacks] Number of radial divisions (default=1).
 * @param {number} [innerRadius] Default 0.
 * @param {number} [stackPower] Power to raise stack size to for decreasing width.
 * @return {module:twgl.BufferInfo} The created BufferInfo.
 * @memberOf module:twgl/primitives
 * @function createDiscBufferInfo
 */ /**
 * Creates disc buffers. The disc will be in the xz plane, centered at
 * the origin. When creating, at least 3 divisions, or pie
 * pieces, need to be specified, otherwise the triangles making
 * up the disc will be degenerate. You can also specify the
 * number of radial pieces `stacks`. A value of 1 for
 * stacks will give you a simple disc of pie pieces.  If you
 * want to create an annulus you can set `innerRadius` to a
 * value > 0. Finally, `stackPower` allows you to have the widths
 * increase or decrease as you move away from the center. This
 * is particularly useful when using the disc as a ground plane
 * with a fixed camera such that you don't need the resolution
 * of small triangles near the perimeter. For example, a value
 * of 2 will produce stacks whose outside radius increases with
 * the square of the stack index. A value of 1 will give uniform
 * stacks.
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} radius Radius of the ground plane.
 * @param {number} divisions Number of triangles in the ground plane (at least 3).
 * @param {number} [stacks] Number of radial divisions (default=1).
 * @param {number} [innerRadius] Default 0.
 * @param {number} [stackPower] Power to raise stack size to for decreasing width.
 * @return {Object.<string, WebGLBuffer>} The created buffers.
 * @memberOf module:twgl/primitives
 * @function createDiscBuffers
 */ /**
 * Creates disc vertices. The disc will be in the xz plane, centered at
 * the origin. When creating, at least 3 divisions, or pie
 * pieces, need to be specified, otherwise the triangles making
 * up the disc will be degenerate. You can also specify the
 * number of radial pieces `stacks`. A value of 1 for
 * stacks will give you a simple disc of pie pieces.  If you
 * want to create an annulus you can set `innerRadius` to a
 * value > 0. Finally, `stackPower` allows you to have the widths
 * increase or decrease as you move away from the center. This
 * is particularly useful when using the disc as a ground plane
 * with a fixed camera such that you don't need the resolution
 * of small triangles near the perimeter. For example, a value
 * of 2 will produce stacks whose outside radius increases with
 * the square of the stack index. A value of 1 will give uniform
 * stacks.
 *
 * @param {number} radius Radius of the ground plane.
 * @param {number} divisions Number of triangles in the ground plane (at least 3).
 * @param {number} [stacks] Number of radial divisions (default=1).
 * @param {number} [innerRadius] Default 0.
 * @param {number} [stackPower] Power to raise stack size to for decreasing width.
 * @return {Object.<string, TypedArray>} The created vertices.
 * @memberOf module:twgl/primitives
 */ function $df29a836a27602ed$var$createDiscVertices(radius, divisions, stacks, innerRadius, stackPower) {
    if (divisions < 3) throw new Error('divisions must be at least 3');
    stacks = stacks ? stacks : 1;
    stackPower = stackPower ? stackPower : 1;
    innerRadius = innerRadius ? innerRadius : 0;
    // Note: We don't share the center vertex because that would
    // mess up texture coordinates.
    const numVertices = (divisions + 1) * (stacks + 1);
    const positions = $df29a836a27602ed$var$createAugmentedTypedArray(3, numVertices);
    const normals = $df29a836a27602ed$var$createAugmentedTypedArray(3, numVertices);
    const texcoords = $df29a836a27602ed$var$createAugmentedTypedArray(2, numVertices);
    const indices = $df29a836a27602ed$var$createAugmentedTypedArray(3, stacks * divisions * 2, Uint16Array);
    let firstIndex = 0;
    const radiusSpan = radius - innerRadius;
    const pointsPerStack = divisions + 1;
    // Build the disk one stack at a time.
    for(let stack = 0; stack <= stacks; ++stack){
        const stackRadius = innerRadius + radiusSpan * Math.pow(stack / stacks, stackPower);
        for(let i = 0; i <= divisions; ++i){
            const theta = 2 * Math.PI * i / divisions;
            const x = stackRadius * Math.cos(theta);
            const z = stackRadius * Math.sin(theta);
            positions.push(x, 0, z);
            normals.push(0, 1, 0);
            texcoords.push(1 - i / divisions, stack / stacks);
            if (stack > 0 && i !== divisions) {
                // a, b, c and d are the indices of the vertices of a quad.  unless
                // the current stack is the one closest to the center, in which case
                // the vertices a and b connect to the center vertex.
                const a = firstIndex + (i + 1);
                const b = firstIndex + i;
                const c = firstIndex + i - pointsPerStack;
                const d = firstIndex + (i + 1) - pointsPerStack;
                // Make a quad of the vertices a, b, c, d.
                indices.push(a, b, c);
                indices.push(a, c, d);
            }
        }
        firstIndex += divisions + 1;
    }
    return {
        position: positions,
        normal: normals,
        texcoord: texcoords,
        indices: indices
    };
}
/**
 * creates a random integer between 0 and range - 1 inclusive.
 * @param {number} range
 * @return {number} random value between 0 and range - 1 inclusive.
 * @private
 */ function $df29a836a27602ed$var$randInt(range) {
    return Math.random() * range | 0;
}
/**
 * Used to supply random colors
 * @callback RandomColorFunc
 * @param {number} ndx index of triangle/quad if unindexed or index of vertex if indexed
 * @param {number} channel 0 = red, 1 = green, 2 = blue, 3 = alpha
 * @return {number} a number from 0 to 255
 * @memberOf module:twgl/primitives
 */ /**
 * @typedef {Object} RandomVerticesOptions
 * @property {number} [vertsPerColor] Defaults to 3 for non-indexed vertices
 * @property {module:twgl/primitives.RandomColorFunc} [rand] A function to generate random numbers
 * @memberOf module:twgl/primitives
 */ /**
 * Creates an augmentedTypedArray of random vertex colors.
 * If the vertices are indexed (have an indices array) then will
 * just make random colors. Otherwise assumes they are triangles
 * and makes one random color for every 3 vertices.
 * @param {Object.<string, AugmentedTypedArray>} vertices Vertices as returned from one of the createXXXVertices functions.
 * @param {module:twgl/primitives.RandomVerticesOptions} [options] options.
 * @return {Object.<string, AugmentedTypedArray>} same vertices as passed in with `color` added.
 * @memberOf module:twgl/primitives
 */ function $df29a836a27602ed$var$makeRandomVertexColors(vertices, options) {
    options = options || {
    };
    const numElements = vertices.position.numElements;
    const vColors = $df29a836a27602ed$var$createAugmentedTypedArray(4, numElements, Uint8Array);
    const rand = options.rand || function(ndx, channel) {
        return channel < 3 ? $df29a836a27602ed$var$randInt(256) : 255;
    };
    vertices.color = vColors;
    if (vertices.indices) // just make random colors if index
    for(let ii = 0; ii < numElements; ++ii)vColors.push(rand(ii, 0), rand(ii, 1), rand(ii, 2), rand(ii, 3));
    else {
        // make random colors per triangle
        const numVertsPerColor = options.vertsPerColor || 3;
        const numSets = numElements / numVertsPerColor;
        for(let ii = 0; ii < numSets; ++ii){
            const color = [
                rand(ii, 0),
                rand(ii, 1),
                rand(ii, 2),
                rand(ii, 3)
            ];
            for(let jj = 0; jj < numVertsPerColor; ++jj)vColors.push(color);
        }
    }
    return vertices;
}
/**
 * creates a function that calls fn to create vertices and then
 * creates a buffers for them
 * @private
 */ function $df29a836a27602ed$var$createBufferFunc(fn) {
    return function(gl) {
        const arrays = fn.apply(this, Array.prototype.slice.call(arguments, 1));
        return $df29a836a27602ed$export$69d8acce17089372(gl, arrays);
    };
}
/**
 * creates a function that calls fn to create vertices and then
 * creates a bufferInfo object for them
 * @private
 */ function $df29a836a27602ed$var$createBufferInfoFunc(fn) {
    return function(gl) {
        const arrays = fn.apply(null, Array.prototype.slice.call(arguments, 1));
        return $df29a836a27602ed$export$140f5b0225138840(gl, arrays);
    };
}
const $df29a836a27602ed$var$arraySpecPropertyNames = [
    "numComponents",
    "size",
    "type",
    "normalize",
    "stride",
    "offset",
    "attrib",
    "name",
    "attribName", 
];
/**
 * Copy elements from one array to another
 *
 * @param {Array|TypedArray} src source array
 * @param {Array|TypedArray} dst dest array
 * @param {number} dstNdx index in dest to copy src
 * @param {number} [offset] offset to add to copied values
 * @private
 */ function $df29a836a27602ed$var$copyElements(src, dst, dstNdx, offset) {
    offset = offset || 0;
    const length = src.length;
    for(let ii = 0; ii < length; ++ii)dst[dstNdx + ii] = src[ii] + offset;
}
/**
 * Creates an array of the same time
 *
 * @param {(number[]|ArrayBufferView|module:twgl.FullArraySpec)} srcArray array who's type to copy
 * @param {number} length size of new array
 * @return {(number[]|ArrayBufferView|module:twgl.FullArraySpec)} array with same type as srcArray
 * @private
 */ function $df29a836a27602ed$var$createArrayOfSameType(srcArray, length) {
    const arraySrc = $df29a836a27602ed$var$getArray$1(srcArray);
    const newArray = new arraySrc.constructor(length);
    let newArraySpec = newArray;
    // If it appears to have been augmented make new one augmented
    if (arraySrc.numComponents && arraySrc.numElements) $df29a836a27602ed$var$augmentTypedArray(newArray, arraySrc.numComponents);
    // If it was a full spec make new one a full spec
    if (srcArray.data) {
        newArraySpec = {
            data: newArray
        };
        $df29a836a27602ed$var$copyNamedProperties($df29a836a27602ed$var$arraySpecPropertyNames, srcArray, newArraySpec);
    }
    return newArraySpec;
}
/**
 * Concatenates sets of vertices
 *
 * Assumes the vertices match in composition. For example
 * if one set of vertices has positions, normals, and indices
 * all sets of vertices must have positions, normals, and indices
 * and of the same type.
 *
 * Example:
 *
 *      const cubeVertices = twgl.primitives.createCubeVertices(2);
 *      const sphereVertices = twgl.primitives.createSphereVertices(1, 10, 10);
 *      // move the sphere 2 units up
 *      twgl.primitives.reorientVertices(
 *          sphereVertices, twgl.m4.translation([0, 2, 0]));
 *      // merge the sphere with the cube
 *      const cubeSphereVertices = twgl.primitives.concatVertices(
 *          [cubeVertices, sphereVertices]);
 *      // turn them into WebGL buffers and attrib data
 *      const bufferInfo = twgl.createBufferInfoFromArrays(gl, cubeSphereVertices);
 *
 * @param {module:twgl.Arrays[]} arrays Array of arrays of vertices
 * @return {module:twgl.Arrays} The concatenated vertices.
 * @memberOf module:twgl/primitives
 */ function $df29a836a27602ed$var$concatVertices(arrayOfArrays) {
    const names = {
    };
    let baseName;
    // get names of all arrays.
    // and numElements for each set of vertices
    for(let ii1 = 0; ii1 < arrayOfArrays.length; ++ii1){
        const arrays = arrayOfArrays[ii1];
        Object.keys(arrays).forEach(function(name) {
            if (!names[name]) names[name] = [];
            if (!baseName && name !== 'indices') baseName = name;
            const arrayInfo = arrays[name];
            const numComponents = $df29a836a27602ed$var$getNumComponents$1(arrayInfo, name);
            const array = $df29a836a27602ed$var$getArray$1(arrayInfo);
            const numElements = array.length / numComponents;
            names[name].push(numElements);
        });
    }
    // compute length of combined array
    // and return one for reference
    function getLengthOfCombinedArrays(name) {
        let length = 0;
        let arraySpec;
        for(let ii = 0; ii < arrayOfArrays.length; ++ii){
            const arrays = arrayOfArrays[ii];
            const arrayInfo = arrays[name];
            const array = $df29a836a27602ed$var$getArray$1(arrayInfo);
            length += array.length;
            if (!arraySpec || arrayInfo.data) arraySpec = arrayInfo;
        }
        return {
            length: length,
            spec: arraySpec
        };
    }
    function copyArraysToNewArray(name, base, newArray) {
        let baseIndex = 0;
        let offset = 0;
        for(let ii = 0; ii < arrayOfArrays.length; ++ii){
            const arrays = arrayOfArrays[ii];
            const arrayInfo = arrays[name];
            const array = $df29a836a27602ed$var$getArray$1(arrayInfo);
            if (name === 'indices') {
                $df29a836a27602ed$var$copyElements(array, newArray, offset, baseIndex);
                baseIndex += base[ii];
            } else $df29a836a27602ed$var$copyElements(array, newArray, offset);
            offset += array.length;
        }
    }
    const base1 = names[baseName];
    const newArrays = {
    };
    Object.keys(names).forEach(function(name) {
        const info = getLengthOfCombinedArrays(name);
        const newArraySpec = $df29a836a27602ed$var$createArrayOfSameType(info.spec, info.length);
        copyArraysToNewArray(name, base1, $df29a836a27602ed$var$getArray$1(newArraySpec));
        newArrays[name] = newArraySpec;
    });
    return newArrays;
}
/**
 * Creates a duplicate set of vertices
 *
 * This is useful for calling reorientVertices when you
 * also want to keep the original available
 *
 * @param {module:twgl.Arrays} arrays of vertices
 * @return {module:twgl.Arrays} The duplicated vertices.
 * @memberOf module:twgl/primitives
 */ function $df29a836a27602ed$var$duplicateVertices(arrays) {
    const newArrays = {
    };
    Object.keys(arrays).forEach(function(name) {
        const arraySpec = arrays[name];
        const srcArray = $df29a836a27602ed$var$getArray$1(arraySpec);
        const newArraySpec = $df29a836a27602ed$var$createArrayOfSameType(arraySpec, srcArray.length);
        $df29a836a27602ed$var$copyElements(srcArray, $df29a836a27602ed$var$getArray$1(newArraySpec), 0);
        newArrays[name] = newArraySpec;
    });
    return newArrays;
}
const $df29a836a27602ed$var$create3DFBufferInfo = $df29a836a27602ed$var$createBufferInfoFunc($df29a836a27602ed$var$create3DFVertices);
const $df29a836a27602ed$var$create3DFBuffers = $df29a836a27602ed$var$createBufferFunc($df29a836a27602ed$var$create3DFVertices);
const $df29a836a27602ed$var$createCubeBufferInfo = $df29a836a27602ed$var$createBufferInfoFunc($df29a836a27602ed$var$createCubeVertices);
const $df29a836a27602ed$var$createCubeBuffers = $df29a836a27602ed$var$createBufferFunc($df29a836a27602ed$var$createCubeVertices);
const $df29a836a27602ed$var$createPlaneBufferInfo = $df29a836a27602ed$var$createBufferInfoFunc($df29a836a27602ed$var$createPlaneVertices);
const $df29a836a27602ed$var$createPlaneBuffers = $df29a836a27602ed$var$createBufferFunc($df29a836a27602ed$var$createPlaneVertices);
const $df29a836a27602ed$var$createSphereBufferInfo = $df29a836a27602ed$var$createBufferInfoFunc($df29a836a27602ed$var$createSphereVertices);
const $df29a836a27602ed$var$createSphereBuffers = $df29a836a27602ed$var$createBufferFunc($df29a836a27602ed$var$createSphereVertices);
const $df29a836a27602ed$var$createTruncatedConeBufferInfo = $df29a836a27602ed$var$createBufferInfoFunc($df29a836a27602ed$var$createTruncatedConeVertices);
const $df29a836a27602ed$var$createTruncatedConeBuffers = $df29a836a27602ed$var$createBufferFunc($df29a836a27602ed$var$createTruncatedConeVertices);
const $df29a836a27602ed$var$createXYQuadBufferInfo = $df29a836a27602ed$var$createBufferInfoFunc($df29a836a27602ed$var$createXYQuadVertices);
const $df29a836a27602ed$var$createXYQuadBuffers = $df29a836a27602ed$var$createBufferFunc($df29a836a27602ed$var$createXYQuadVertices);
const $df29a836a27602ed$var$createCrescentBufferInfo = $df29a836a27602ed$var$createBufferInfoFunc($df29a836a27602ed$var$createCrescentVertices);
const $df29a836a27602ed$var$createCrescentBuffers = $df29a836a27602ed$var$createBufferFunc($df29a836a27602ed$var$createCrescentVertices);
const $df29a836a27602ed$var$createCylinderBufferInfo = $df29a836a27602ed$var$createBufferInfoFunc($df29a836a27602ed$var$createCylinderVertices);
const $df29a836a27602ed$var$createCylinderBuffers = $df29a836a27602ed$var$createBufferFunc($df29a836a27602ed$var$createCylinderVertices);
const $df29a836a27602ed$var$createTorusBufferInfo = $df29a836a27602ed$var$createBufferInfoFunc($df29a836a27602ed$var$createTorusVertices);
const $df29a836a27602ed$var$createTorusBuffers = $df29a836a27602ed$var$createBufferFunc($df29a836a27602ed$var$createTorusVertices);
const $df29a836a27602ed$var$createDiscBufferInfo = $df29a836a27602ed$var$createBufferInfoFunc($df29a836a27602ed$var$createDiscVertices);
const $df29a836a27602ed$var$createDiscBuffers = $df29a836a27602ed$var$createBufferFunc($df29a836a27602ed$var$createDiscVertices);
// these were mis-spelled until 4.12
const $df29a836a27602ed$var$createCresentBufferInfo = $df29a836a27602ed$var$createCrescentBufferInfo;
const $df29a836a27602ed$var$createCresentBuffers = $df29a836a27602ed$var$createCrescentBuffers;
const $df29a836a27602ed$var$createCresentVertices = $df29a836a27602ed$var$createCrescentVertices;
var $df29a836a27602ed$export$67635360ab47a385 = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    create3DFBufferInfo: $df29a836a27602ed$var$create3DFBufferInfo,
    create3DFBuffers: $df29a836a27602ed$var$create3DFBuffers,
    create3DFVertices: $df29a836a27602ed$var$create3DFVertices,
    createAugmentedTypedArray: $df29a836a27602ed$var$createAugmentedTypedArray,
    createCubeBufferInfo: $df29a836a27602ed$var$createCubeBufferInfo,
    createCubeBuffers: $df29a836a27602ed$var$createCubeBuffers,
    createCubeVertices: $df29a836a27602ed$var$createCubeVertices,
    createPlaneBufferInfo: $df29a836a27602ed$var$createPlaneBufferInfo,
    createPlaneBuffers: $df29a836a27602ed$var$createPlaneBuffers,
    createPlaneVertices: $df29a836a27602ed$var$createPlaneVertices,
    createSphereBufferInfo: $df29a836a27602ed$var$createSphereBufferInfo,
    createSphereBuffers: $df29a836a27602ed$var$createSphereBuffers,
    createSphereVertices: $df29a836a27602ed$var$createSphereVertices,
    createTruncatedConeBufferInfo: $df29a836a27602ed$var$createTruncatedConeBufferInfo,
    createTruncatedConeBuffers: $df29a836a27602ed$var$createTruncatedConeBuffers,
    createTruncatedConeVertices: $df29a836a27602ed$var$createTruncatedConeVertices,
    createXYQuadBufferInfo: $df29a836a27602ed$var$createXYQuadBufferInfo,
    createXYQuadBuffers: $df29a836a27602ed$var$createXYQuadBuffers,
    createXYQuadVertices: $df29a836a27602ed$var$createXYQuadVertices,
    createCresentBufferInfo: $df29a836a27602ed$var$createCresentBufferInfo,
    createCresentBuffers: $df29a836a27602ed$var$createCresentBuffers,
    createCresentVertices: $df29a836a27602ed$var$createCresentVertices,
    createCrescentBufferInfo: $df29a836a27602ed$var$createCrescentBufferInfo,
    createCrescentBuffers: $df29a836a27602ed$var$createCrescentBuffers,
    createCrescentVertices: $df29a836a27602ed$var$createCrescentVertices,
    createCylinderBufferInfo: $df29a836a27602ed$var$createCylinderBufferInfo,
    createCylinderBuffers: $df29a836a27602ed$var$createCylinderBuffers,
    createCylinderVertices: $df29a836a27602ed$var$createCylinderVertices,
    createTorusBufferInfo: $df29a836a27602ed$var$createTorusBufferInfo,
    createTorusBuffers: $df29a836a27602ed$var$createTorusBuffers,
    createTorusVertices: $df29a836a27602ed$var$createTorusVertices,
    createDiscBufferInfo: $df29a836a27602ed$var$createDiscBufferInfo,
    createDiscBuffers: $df29a836a27602ed$var$createDiscBuffers,
    createDiscVertices: $df29a836a27602ed$var$createDiscVertices,
    deindexVertices: $df29a836a27602ed$var$deindexVertices,
    flattenNormals: $df29a836a27602ed$var$flattenNormals,
    makeRandomVertexColors: $df29a836a27602ed$var$makeRandomVertexColors,
    reorientDirections: $df29a836a27602ed$var$reorientDirections,
    reorientNormals: $df29a836a27602ed$var$reorientNormals,
    reorientPositions: $df29a836a27602ed$var$reorientPositions,
    reorientVertices: $df29a836a27602ed$var$reorientVertices,
    concatVertices: $df29a836a27602ed$var$concatVertices,
    duplicateVertices: $df29a836a27602ed$var$duplicateVertices
});
/*
 * Copyright 2019 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */ /**
 * Gets the gl version as a number
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext
 * @return {number} version of gl
 * @private
 */ //function getVersionAsNumber(gl) {
//  return parseFloat(gl.getParameter(gl.VERSION).substr(6));
//}
/**
 * Check if context is WebGL 2.0
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext
 * @return {bool} true if it's WebGL 2.0
 * @memberOf module:twgl
 */ function $df29a836a27602ed$export$e3518b1ac7891039(gl) {
    // This is the correct check but it's slow
    //  return gl.getParameter(gl.VERSION).indexOf("WebGL 2.0") === 0;
    // This might also be the correct check but I'm assuming it's slow-ish
    // return gl instanceof WebGL2RenderingContext;
    return !!gl.texStorage2D;
}
/**
 * Check if context is WebGL 1.0
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext
 * @return {bool} true if it's WebGL 1.0
 * @memberOf module:twgl
 */ function $df29a836a27602ed$export$6fee3240cb824186(gl) {
    // This is the correct check but it's slow
    // const version = getVersionAsNumber(gl);
    // return version <= 1.0 && version > 0.0;  // because as of 2016/5 Edge returns 0.96
    // This might also be the correct check but I'm assuming it's slow-ish
    // return gl instanceof WebGLRenderingContext;
    return !gl.texStorage2D;
}
/**
 * Gets a string for WebGL enum
 *
 * Note: Several enums are the same. Without more
 * context (which function) it's impossible to always
 * give the correct enum. As it is, for matching values
 * it gives all enums. Checking the WebGL2RenderingContext
 * that means
 *
 *      0     = ZERO | POINT | NONE | NO_ERROR
 *      1     = ONE | LINES | SYNC_FLUSH_COMMANDS_BIT
 *      32777 = BLEND_EQUATION_RGB | BLEND_EQUATION_RGB
 *      36662 = COPY_READ_BUFFER | COPY_READ_BUFFER_BINDING
 *      36663 = COPY_WRITE_BUFFER | COPY_WRITE_BUFFER_BINDING
 *      36006 = FRAMEBUFFER_BINDING | DRAW_FRAMEBUFFER_BINDING
 *
 * It's also not useful for bits really unless you pass in individual bits.
 * In other words
 *
 *     const bits = gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT;
 *     twgl.glEnumToString(gl, bits);  // not going to work
 *
 * Note that some enums only exist on extensions. If you
 * want them to show up you need to pass the extension at least
 * once. For example
 *
 *     const ext = gl.getExtension('WEBGL_compressed_texture_s3tc');
 *     if (ext) {
 *        twgl.glEnumToString(ext, 0);  // just prime the function
 *
 *        ..later..
 *
 *        const internalFormat = ext.COMPRESSED_RGB_S3TC_DXT1_EXT;
 *        console.log(twgl.glEnumToString(gl, internalFormat));
 *
 * Notice I didn't have to pass the extension the second time. This means
 * you can have place that generically gets an enum for texture formats for example.
 * and as long as you primed the function with the extensions
 *
 * If you're using `twgl.addExtensionsToContext` to enable your extensions
 * then twgl will automatically get the extension's enums.
 *
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext or any extension object
 * @param {number} value the value of the enum you want to look up.
 * @return {string} enum string or hex value
 * @memberOf module:twgl
 * @function glEnumToString
 */ const $df29a836a27602ed$export$e97753eae63e4e62 = function() {
    const haveEnumsForType = {
    };
    const enums = {
    };
    function addEnums(gl) {
        const type = gl.constructor.name;
        if (!haveEnumsForType[type]) {
            for(const key in gl)if (typeof gl[key] === 'number') {
                const existing = enums[gl[key]];
                enums[gl[key]] = existing ? `${existing} | ${key}` : key;
            }
            haveEnumsForType[type] = true;
        }
    }
    return function $df29a836a27602ed$export$e97753eae63e4e62(gl, value) {
        addEnums(gl);
        return enums[value] || (typeof value === 'number' ? `0x${value.toString(16)}` : value);
    };
}();
var $df29a836a27602ed$export$eab97d15b1788b8d = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    glEnumToString: $df29a836a27602ed$export$e97753eae63e4e62,
    isWebGL1: $df29a836a27602ed$export$6fee3240cb824186,
    isWebGL2: $df29a836a27602ed$export$e3518b1ac7891039
});
/*
 * Copyright 2019 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */ const $df29a836a27602ed$var$defaults$1 = {
    textureColor: new Uint8Array([
        128,
        192,
        255,
        255
    ]),
    textureOptions: {
    },
    crossOrigin: undefined
};
const $df29a836a27602ed$var$isArrayBuffer$1 = $df29a836a27602ed$export$9dd3754ae86f0017;
// Should we make this on demand?
const $df29a836a27602ed$var$getShared2DContext = function() {
    let s_ctx;
    return function getShared2DContext() {
        s_ctx = s_ctx || (typeof document !== 'undefined' && document.createElement ? document.createElement("canvas").getContext("2d") : null);
        return s_ctx;
    };
}();
// NOTE: Chrome supports 2D canvas in a Worker (behind flag as of v64 but
//       not only does Firefox NOT support it but Firefox freezes immediately
//       if you try to create one instead of just returning null and continuing.
//  : (global.OffscreenCanvas && (new global.OffscreenCanvas(1, 1)).getContext("2d"));  // OffscreenCanvas may not support 2d
// NOTE: We can maybe remove some of the need for the 2d canvas. In WebGL2
// we can use the various unpack settings. Otherwise we could try using
// the ability of an ImageBitmap to be cut. Unfortunately cutting an ImageBitmap
// is async and the current TWGL code expects a non-Async result though that
// might not be a problem. ImageBitmap though is not available in Edge or Safari
// as of 2018-01-02
/* PixelFormat */ const $df29a836a27602ed$var$ALPHA = 6406;
const $df29a836a27602ed$var$RGB = 6407;
const $df29a836a27602ed$var$RGBA = 6408;
const $df29a836a27602ed$var$LUMINANCE = 6409;
const $df29a836a27602ed$var$LUMINANCE_ALPHA = 6410;
const $df29a836a27602ed$var$DEPTH_COMPONENT = 6402;
const $df29a836a27602ed$var$DEPTH_STENCIL = 34041;
/* TextureWrapMode */ // const REPEAT                         = 0x2901;
// const MIRRORED_REPEAT                = 0x8370;
const $df29a836a27602ed$var$CLAMP_TO_EDGE = 33071;
/* TextureMagFilter */ const $df29a836a27602ed$var$NEAREST = 9728;
const $df29a836a27602ed$var$LINEAR = 9729;
/* TextureMinFilter */ // const NEAREST_MIPMAP_NEAREST         = 0x2700;
// const LINEAR_MIPMAP_NEAREST          = 0x2701;
// const NEAREST_MIPMAP_LINEAR          = 0x2702;
// const LINEAR_MIPMAP_LINEAR           = 0x2703;
/* Texture Target */ const $df29a836a27602ed$var$TEXTURE_2D = 3553;
const $df29a836a27602ed$var$TEXTURE_CUBE_MAP = 34067;
const $df29a836a27602ed$var$TEXTURE_3D = 32879;
const $df29a836a27602ed$var$TEXTURE_2D_ARRAY = 35866;
/* Cubemap Targets */ const $df29a836a27602ed$var$TEXTURE_CUBE_MAP_POSITIVE_X = 34069;
const $df29a836a27602ed$var$TEXTURE_CUBE_MAP_NEGATIVE_X = 34070;
const $df29a836a27602ed$var$TEXTURE_CUBE_MAP_POSITIVE_Y = 34071;
const $df29a836a27602ed$var$TEXTURE_CUBE_MAP_NEGATIVE_Y = 34072;
const $df29a836a27602ed$var$TEXTURE_CUBE_MAP_POSITIVE_Z = 34073;
const $df29a836a27602ed$var$TEXTURE_CUBE_MAP_NEGATIVE_Z = 34074;
/* Texture Parameters */ const $df29a836a27602ed$var$TEXTURE_MIN_FILTER = 10241;
const $df29a836a27602ed$var$TEXTURE_MAG_FILTER = 10240;
const $df29a836a27602ed$var$TEXTURE_WRAP_S = 10242;
const $df29a836a27602ed$var$TEXTURE_WRAP_T = 10243;
const $df29a836a27602ed$var$TEXTURE_WRAP_R = 32882;
const $df29a836a27602ed$var$TEXTURE_MIN_LOD = 33082;
const $df29a836a27602ed$var$TEXTURE_MAX_LOD = 33083;
const $df29a836a27602ed$var$TEXTURE_BASE_LEVEL = 33084;
const $df29a836a27602ed$var$TEXTURE_MAX_LEVEL = 33085;
/* Pixel store */ const $df29a836a27602ed$var$UNPACK_ALIGNMENT = 3317;
const $df29a836a27602ed$var$UNPACK_ROW_LENGTH = 3314;
const $df29a836a27602ed$var$UNPACK_IMAGE_HEIGHT = 32878;
const $df29a836a27602ed$var$UNPACK_SKIP_PIXELS = 3316;
const $df29a836a27602ed$var$UNPACK_SKIP_ROWS = 3315;
const $df29a836a27602ed$var$UNPACK_SKIP_IMAGES = 32877;
const $df29a836a27602ed$var$UNPACK_COLORSPACE_CONVERSION_WEBGL = 37443;
const $df29a836a27602ed$var$UNPACK_PREMULTIPLY_ALPHA_WEBGL = 37441;
const $df29a836a27602ed$var$UNPACK_FLIP_Y_WEBGL = 37440;
const $df29a836a27602ed$var$R8 = 33321;
const $df29a836a27602ed$var$R8_SNORM = 36756;
const $df29a836a27602ed$var$R16F = 33325;
const $df29a836a27602ed$var$R32F = 33326;
const $df29a836a27602ed$var$R8UI = 33330;
const $df29a836a27602ed$var$R8I = 33329;
const $df29a836a27602ed$var$RG16UI = 33338;
const $df29a836a27602ed$var$RG16I = 33337;
const $df29a836a27602ed$var$RG32UI = 33340;
const $df29a836a27602ed$var$RG32I = 33339;
const $df29a836a27602ed$var$RG8 = 33323;
const $df29a836a27602ed$var$RG8_SNORM = 36757;
const $df29a836a27602ed$var$RG16F = 33327;
const $df29a836a27602ed$var$RG32F = 33328;
const $df29a836a27602ed$var$RG8UI = 33336;
const $df29a836a27602ed$var$RG8I = 33335;
const $df29a836a27602ed$var$R16UI = 33332;
const $df29a836a27602ed$var$R16I = 33331;
const $df29a836a27602ed$var$R32UI = 33334;
const $df29a836a27602ed$var$R32I = 33333;
const $df29a836a27602ed$var$RGB8 = 32849;
const $df29a836a27602ed$var$SRGB8 = 35905;
const $df29a836a27602ed$var$RGB565 = 36194;
const $df29a836a27602ed$var$RGB8_SNORM = 36758;
const $df29a836a27602ed$var$R11F_G11F_B10F = 35898;
const $df29a836a27602ed$var$RGB9_E5 = 35901;
const $df29a836a27602ed$var$RGB16F = 34843;
const $df29a836a27602ed$var$RGB32F = 34837;
const $df29a836a27602ed$var$RGB8UI = 36221;
const $df29a836a27602ed$var$RGB8I = 36239;
const $df29a836a27602ed$var$RGB16UI = 36215;
const $df29a836a27602ed$var$RGB16I = 36233;
const $df29a836a27602ed$var$RGB32UI = 36209;
const $df29a836a27602ed$var$RGB32I = 36227;
const $df29a836a27602ed$var$RGBA8 = 32856;
const $df29a836a27602ed$var$SRGB8_ALPHA8 = 35907;
const $df29a836a27602ed$var$RGBA8_SNORM = 36759;
const $df29a836a27602ed$var$RGB5_A1 = 32855;
const $df29a836a27602ed$var$RGBA4 = 32854;
const $df29a836a27602ed$var$RGB10_A2 = 32857;
const $df29a836a27602ed$var$RGBA16F = 34842;
const $df29a836a27602ed$var$RGBA32F = 34836;
const $df29a836a27602ed$var$RGBA8UI = 36220;
const $df29a836a27602ed$var$RGBA8I = 36238;
const $df29a836a27602ed$var$RGB10_A2UI = 36975;
const $df29a836a27602ed$var$RGBA16UI = 36214;
const $df29a836a27602ed$var$RGBA16I = 36232;
const $df29a836a27602ed$var$RGBA32I = 36226;
const $df29a836a27602ed$var$RGBA32UI = 36208;
const $df29a836a27602ed$var$DEPTH_COMPONENT16 = 33189;
const $df29a836a27602ed$var$DEPTH_COMPONENT24 = 33190;
const $df29a836a27602ed$var$DEPTH_COMPONENT32F = 36012;
const $df29a836a27602ed$var$DEPTH32F_STENCIL8 = 36013;
const $df29a836a27602ed$var$DEPTH24_STENCIL8 = 35056;
/* DataType */ const $df29a836a27602ed$var$BYTE$2 = 5120;
const $df29a836a27602ed$var$UNSIGNED_BYTE$2 = 5121;
const $df29a836a27602ed$var$SHORT$2 = 5122;
const $df29a836a27602ed$var$UNSIGNED_SHORT$2 = 5123;
const $df29a836a27602ed$var$INT$2 = 5124;
const $df29a836a27602ed$var$UNSIGNED_INT$2 = 5125;
const $df29a836a27602ed$var$FLOAT$2 = 5126;
const $df29a836a27602ed$var$UNSIGNED_SHORT_4_4_4_4$1 = 32819;
const $df29a836a27602ed$var$UNSIGNED_SHORT_5_5_5_1$1 = 32820;
const $df29a836a27602ed$var$UNSIGNED_SHORT_5_6_5$1 = 33635;
const $df29a836a27602ed$var$HALF_FLOAT$1 = 5131;
const $df29a836a27602ed$var$HALF_FLOAT_OES = 36193; // Thanks Khronos for making this different >:(
const $df29a836a27602ed$var$UNSIGNED_INT_2_10_10_10_REV$1 = 33640;
const $df29a836a27602ed$var$UNSIGNED_INT_10F_11F_11F_REV$1 = 35899;
const $df29a836a27602ed$var$UNSIGNED_INT_5_9_9_9_REV$1 = 35902;
const $df29a836a27602ed$var$FLOAT_32_UNSIGNED_INT_24_8_REV$1 = 36269;
const $df29a836a27602ed$var$UNSIGNED_INT_24_8$1 = 34042;
const $df29a836a27602ed$var$RG = 33319;
const $df29a836a27602ed$var$RG_INTEGER = 33320;
const $df29a836a27602ed$var$RED = 6403;
const $df29a836a27602ed$var$RED_INTEGER = 36244;
const $df29a836a27602ed$var$RGB_INTEGER = 36248;
const $df29a836a27602ed$var$RGBA_INTEGER = 36249;
const $df29a836a27602ed$var$formatInfo = {
};
{
    // NOTE: this is named `numColorComponents` vs `numComponents` so we can let Uglify mangle
    // the name.
    const f = $df29a836a27602ed$var$formatInfo;
    f[$df29a836a27602ed$var$ALPHA] = {
        numColorComponents: 1
    };
    f[$df29a836a27602ed$var$LUMINANCE] = {
        numColorComponents: 1
    };
    f[$df29a836a27602ed$var$LUMINANCE_ALPHA] = {
        numColorComponents: 2
    };
    f[$df29a836a27602ed$var$RGB] = {
        numColorComponents: 3
    };
    f[$df29a836a27602ed$var$RGBA] = {
        numColorComponents: 4
    };
    f[$df29a836a27602ed$var$RED] = {
        numColorComponents: 1
    };
    f[$df29a836a27602ed$var$RED_INTEGER] = {
        numColorComponents: 1
    };
    f[$df29a836a27602ed$var$RG] = {
        numColorComponents: 2
    };
    f[$df29a836a27602ed$var$RG_INTEGER] = {
        numColorComponents: 2
    };
    f[$df29a836a27602ed$var$RGB] = {
        numColorComponents: 3
    };
    f[$df29a836a27602ed$var$RGB_INTEGER] = {
        numColorComponents: 3
    };
    f[$df29a836a27602ed$var$RGBA] = {
        numColorComponents: 4
    };
    f[$df29a836a27602ed$var$RGBA_INTEGER] = {
        numColorComponents: 4
    };
    f[$df29a836a27602ed$var$DEPTH_COMPONENT] = {
        numColorComponents: 1
    };
    f[$df29a836a27602ed$var$DEPTH_STENCIL] = {
        numColorComponents: 2
    };
}/**
 * @typedef {Object} TextureFormatDetails
 * @property {number} textureFormat format to pass texImage2D and similar functions.
 * @property {boolean} colorRenderable true if you can render to this format of texture.
 * @property {boolean} textureFilterable true if you can filter the texture, false if you can ony use `NEAREST`.
 * @property {number[]} type Array of possible types you can pass to texImage2D and similar function
 * @property {Object.<number,number>} bytesPerElementMap A map of types to bytes per element
 * @private
 */ let $df29a836a27602ed$var$s_textureInternalFormatInfo;
function $df29a836a27602ed$var$getTextureInternalFormatInfo(internalFormat) {
    if (!$df29a836a27602ed$var$s_textureInternalFormatInfo) {
        // NOTE: these properties need unique names so we can let Uglify mangle the name.
        const t = {
        };
        // unsized formats
        t[$df29a836a27602ed$var$ALPHA] = {
            textureFormat: $df29a836a27602ed$var$ALPHA,
            colorRenderable: true,
            textureFilterable: true,
            bytesPerElement: [
                1,
                2,
                2,
                4
            ],
            type: [
                $df29a836a27602ed$var$UNSIGNED_BYTE$2,
                $df29a836a27602ed$var$HALF_FLOAT$1,
                $df29a836a27602ed$var$HALF_FLOAT_OES,
                $df29a836a27602ed$var$FLOAT$2
            ]
        };
        t[$df29a836a27602ed$var$LUMINANCE] = {
            textureFormat: $df29a836a27602ed$var$LUMINANCE,
            colorRenderable: true,
            textureFilterable: true,
            bytesPerElement: [
                1,
                2,
                2,
                4
            ],
            type: [
                $df29a836a27602ed$var$UNSIGNED_BYTE$2,
                $df29a836a27602ed$var$HALF_FLOAT$1,
                $df29a836a27602ed$var$HALF_FLOAT_OES,
                $df29a836a27602ed$var$FLOAT$2
            ]
        };
        t[$df29a836a27602ed$var$LUMINANCE_ALPHA] = {
            textureFormat: $df29a836a27602ed$var$LUMINANCE_ALPHA,
            colorRenderable: true,
            textureFilterable: true,
            bytesPerElement: [
                2,
                4,
                4,
                8
            ],
            type: [
                $df29a836a27602ed$var$UNSIGNED_BYTE$2,
                $df29a836a27602ed$var$HALF_FLOAT$1,
                $df29a836a27602ed$var$HALF_FLOAT_OES,
                $df29a836a27602ed$var$FLOAT$2
            ]
        };
        t[$df29a836a27602ed$var$RGB] = {
            textureFormat: $df29a836a27602ed$var$RGB,
            colorRenderable: true,
            textureFilterable: true,
            bytesPerElement: [
                3,
                6,
                6,
                12,
                2
            ],
            type: [
                $df29a836a27602ed$var$UNSIGNED_BYTE$2,
                $df29a836a27602ed$var$HALF_FLOAT$1,
                $df29a836a27602ed$var$HALF_FLOAT_OES,
                $df29a836a27602ed$var$FLOAT$2,
                $df29a836a27602ed$var$UNSIGNED_SHORT_5_6_5$1
            ]
        };
        t[$df29a836a27602ed$var$RGBA] = {
            textureFormat: $df29a836a27602ed$var$RGBA,
            colorRenderable: true,
            textureFilterable: true,
            bytesPerElement: [
                4,
                8,
                8,
                16,
                2,
                2
            ],
            type: [
                $df29a836a27602ed$var$UNSIGNED_BYTE$2,
                $df29a836a27602ed$var$HALF_FLOAT$1,
                $df29a836a27602ed$var$HALF_FLOAT_OES,
                $df29a836a27602ed$var$FLOAT$2,
                $df29a836a27602ed$var$UNSIGNED_SHORT_4_4_4_4$1,
                $df29a836a27602ed$var$UNSIGNED_SHORT_5_5_5_1$1
            ]
        };
        t[$df29a836a27602ed$var$DEPTH_COMPONENT] = {
            textureFormat: $df29a836a27602ed$var$DEPTH_COMPONENT,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                2,
                4
            ],
            type: [
                $df29a836a27602ed$var$UNSIGNED_INT$2,
                $df29a836a27602ed$var$UNSIGNED_SHORT$2
            ]
        };
        // sized formats
        t[$df29a836a27602ed$var$R8] = {
            textureFormat: $df29a836a27602ed$var$RED,
            colorRenderable: true,
            textureFilterable: true,
            bytesPerElement: [
                1
            ],
            type: [
                $df29a836a27602ed$var$UNSIGNED_BYTE$2
            ]
        };
        t[$df29a836a27602ed$var$R8_SNORM] = {
            textureFormat: $df29a836a27602ed$var$RED,
            colorRenderable: false,
            textureFilterable: true,
            bytesPerElement: [
                1
            ],
            type: [
                $df29a836a27602ed$var$BYTE$2
            ]
        };
        t[$df29a836a27602ed$var$R16F] = {
            textureFormat: $df29a836a27602ed$var$RED,
            colorRenderable: false,
            textureFilterable: true,
            bytesPerElement: [
                4,
                2
            ],
            type: [
                $df29a836a27602ed$var$FLOAT$2,
                $df29a836a27602ed$var$HALF_FLOAT$1
            ]
        };
        t[$df29a836a27602ed$var$R32F] = {
            textureFormat: $df29a836a27602ed$var$RED,
            colorRenderable: false,
            textureFilterable: false,
            bytesPerElement: [
                4
            ],
            type: [
                $df29a836a27602ed$var$FLOAT$2
            ]
        };
        t[$df29a836a27602ed$var$R8UI] = {
            textureFormat: $df29a836a27602ed$var$RED_INTEGER,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                1
            ],
            type: [
                $df29a836a27602ed$var$UNSIGNED_BYTE$2
            ]
        };
        t[$df29a836a27602ed$var$R8I] = {
            textureFormat: $df29a836a27602ed$var$RED_INTEGER,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                1
            ],
            type: [
                $df29a836a27602ed$var$BYTE$2
            ]
        };
        t[$df29a836a27602ed$var$R16UI] = {
            textureFormat: $df29a836a27602ed$var$RED_INTEGER,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                2
            ],
            type: [
                $df29a836a27602ed$var$UNSIGNED_SHORT$2
            ]
        };
        t[$df29a836a27602ed$var$R16I] = {
            textureFormat: $df29a836a27602ed$var$RED_INTEGER,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                2
            ],
            type: [
                $df29a836a27602ed$var$SHORT$2
            ]
        };
        t[$df29a836a27602ed$var$R32UI] = {
            textureFormat: $df29a836a27602ed$var$RED_INTEGER,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                4
            ],
            type: [
                $df29a836a27602ed$var$UNSIGNED_INT$2
            ]
        };
        t[$df29a836a27602ed$var$R32I] = {
            textureFormat: $df29a836a27602ed$var$RED_INTEGER,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                4
            ],
            type: [
                $df29a836a27602ed$var$INT$2
            ]
        };
        t[$df29a836a27602ed$var$RG8] = {
            textureFormat: $df29a836a27602ed$var$RG,
            colorRenderable: true,
            textureFilterable: true,
            bytesPerElement: [
                2
            ],
            type: [
                $df29a836a27602ed$var$UNSIGNED_BYTE$2
            ]
        };
        t[$df29a836a27602ed$var$RG8_SNORM] = {
            textureFormat: $df29a836a27602ed$var$RG,
            colorRenderable: false,
            textureFilterable: true,
            bytesPerElement: [
                2
            ],
            type: [
                $df29a836a27602ed$var$BYTE$2
            ]
        };
        t[$df29a836a27602ed$var$RG16F] = {
            textureFormat: $df29a836a27602ed$var$RG,
            colorRenderable: false,
            textureFilterable: true,
            bytesPerElement: [
                8,
                4
            ],
            type: [
                $df29a836a27602ed$var$FLOAT$2,
                $df29a836a27602ed$var$HALF_FLOAT$1
            ]
        };
        t[$df29a836a27602ed$var$RG32F] = {
            textureFormat: $df29a836a27602ed$var$RG,
            colorRenderable: false,
            textureFilterable: false,
            bytesPerElement: [
                8
            ],
            type: [
                $df29a836a27602ed$var$FLOAT$2
            ]
        };
        t[$df29a836a27602ed$var$RG8UI] = {
            textureFormat: $df29a836a27602ed$var$RG_INTEGER,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                2
            ],
            type: [
                $df29a836a27602ed$var$UNSIGNED_BYTE$2
            ]
        };
        t[$df29a836a27602ed$var$RG8I] = {
            textureFormat: $df29a836a27602ed$var$RG_INTEGER,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                2
            ],
            type: [
                $df29a836a27602ed$var$BYTE$2
            ]
        };
        t[$df29a836a27602ed$var$RG16UI] = {
            textureFormat: $df29a836a27602ed$var$RG_INTEGER,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                4
            ],
            type: [
                $df29a836a27602ed$var$UNSIGNED_SHORT$2
            ]
        };
        t[$df29a836a27602ed$var$RG16I] = {
            textureFormat: $df29a836a27602ed$var$RG_INTEGER,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                4
            ],
            type: [
                $df29a836a27602ed$var$SHORT$2
            ]
        };
        t[$df29a836a27602ed$var$RG32UI] = {
            textureFormat: $df29a836a27602ed$var$RG_INTEGER,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                8
            ],
            type: [
                $df29a836a27602ed$var$UNSIGNED_INT$2
            ]
        };
        t[$df29a836a27602ed$var$RG32I] = {
            textureFormat: $df29a836a27602ed$var$RG_INTEGER,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                8
            ],
            type: [
                $df29a836a27602ed$var$INT$2
            ]
        };
        t[$df29a836a27602ed$var$RGB8] = {
            textureFormat: $df29a836a27602ed$var$RGB,
            colorRenderable: true,
            textureFilterable: true,
            bytesPerElement: [
                3
            ],
            type: [
                $df29a836a27602ed$var$UNSIGNED_BYTE$2
            ]
        };
        t[$df29a836a27602ed$var$SRGB8] = {
            textureFormat: $df29a836a27602ed$var$RGB,
            colorRenderable: false,
            textureFilterable: true,
            bytesPerElement: [
                3
            ],
            type: [
                $df29a836a27602ed$var$UNSIGNED_BYTE$2
            ]
        };
        t[$df29a836a27602ed$var$RGB565] = {
            textureFormat: $df29a836a27602ed$var$RGB,
            colorRenderable: true,
            textureFilterable: true,
            bytesPerElement: [
                3,
                2
            ],
            type: [
                $df29a836a27602ed$var$UNSIGNED_BYTE$2,
                $df29a836a27602ed$var$UNSIGNED_SHORT_5_6_5$1
            ]
        };
        t[$df29a836a27602ed$var$RGB8_SNORM] = {
            textureFormat: $df29a836a27602ed$var$RGB,
            colorRenderable: false,
            textureFilterable: true,
            bytesPerElement: [
                3
            ],
            type: [
                $df29a836a27602ed$var$BYTE$2
            ]
        };
        t[$df29a836a27602ed$var$R11F_G11F_B10F] = {
            textureFormat: $df29a836a27602ed$var$RGB,
            colorRenderable: false,
            textureFilterable: true,
            bytesPerElement: [
                12,
                6,
                4
            ],
            type: [
                $df29a836a27602ed$var$FLOAT$2,
                $df29a836a27602ed$var$HALF_FLOAT$1,
                $df29a836a27602ed$var$UNSIGNED_INT_10F_11F_11F_REV$1
            ]
        };
        t[$df29a836a27602ed$var$RGB9_E5] = {
            textureFormat: $df29a836a27602ed$var$RGB,
            colorRenderable: false,
            textureFilterable: true,
            bytesPerElement: [
                12,
                6,
                4
            ],
            type: [
                $df29a836a27602ed$var$FLOAT$2,
                $df29a836a27602ed$var$HALF_FLOAT$1,
                $df29a836a27602ed$var$UNSIGNED_INT_5_9_9_9_REV$1
            ]
        };
        t[$df29a836a27602ed$var$RGB16F] = {
            textureFormat: $df29a836a27602ed$var$RGB,
            colorRenderable: false,
            textureFilterable: true,
            bytesPerElement: [
                12,
                6
            ],
            type: [
                $df29a836a27602ed$var$FLOAT$2,
                $df29a836a27602ed$var$HALF_FLOAT$1
            ]
        };
        t[$df29a836a27602ed$var$RGB32F] = {
            textureFormat: $df29a836a27602ed$var$RGB,
            colorRenderable: false,
            textureFilterable: false,
            bytesPerElement: [
                12
            ],
            type: [
                $df29a836a27602ed$var$FLOAT$2
            ]
        };
        t[$df29a836a27602ed$var$RGB8UI] = {
            textureFormat: $df29a836a27602ed$var$RGB_INTEGER,
            colorRenderable: false,
            textureFilterable: false,
            bytesPerElement: [
                3
            ],
            type: [
                $df29a836a27602ed$var$UNSIGNED_BYTE$2
            ]
        };
        t[$df29a836a27602ed$var$RGB8I] = {
            textureFormat: $df29a836a27602ed$var$RGB_INTEGER,
            colorRenderable: false,
            textureFilterable: false,
            bytesPerElement: [
                3
            ],
            type: [
                $df29a836a27602ed$var$BYTE$2
            ]
        };
        t[$df29a836a27602ed$var$RGB16UI] = {
            textureFormat: $df29a836a27602ed$var$RGB_INTEGER,
            colorRenderable: false,
            textureFilterable: false,
            bytesPerElement: [
                6
            ],
            type: [
                $df29a836a27602ed$var$UNSIGNED_SHORT$2
            ]
        };
        t[$df29a836a27602ed$var$RGB16I] = {
            textureFormat: $df29a836a27602ed$var$RGB_INTEGER,
            colorRenderable: false,
            textureFilterable: false,
            bytesPerElement: [
                6
            ],
            type: [
                $df29a836a27602ed$var$SHORT$2
            ]
        };
        t[$df29a836a27602ed$var$RGB32UI] = {
            textureFormat: $df29a836a27602ed$var$RGB_INTEGER,
            colorRenderable: false,
            textureFilterable: false,
            bytesPerElement: [
                12
            ],
            type: [
                $df29a836a27602ed$var$UNSIGNED_INT$2
            ]
        };
        t[$df29a836a27602ed$var$RGB32I] = {
            textureFormat: $df29a836a27602ed$var$RGB_INTEGER,
            colorRenderable: false,
            textureFilterable: false,
            bytesPerElement: [
                12
            ],
            type: [
                $df29a836a27602ed$var$INT$2
            ]
        };
        t[$df29a836a27602ed$var$RGBA8] = {
            textureFormat: $df29a836a27602ed$var$RGBA,
            colorRenderable: true,
            textureFilterable: true,
            bytesPerElement: [
                4
            ],
            type: [
                $df29a836a27602ed$var$UNSIGNED_BYTE$2
            ]
        };
        t[$df29a836a27602ed$var$SRGB8_ALPHA8] = {
            textureFormat: $df29a836a27602ed$var$RGBA,
            colorRenderable: true,
            textureFilterable: true,
            bytesPerElement: [
                4
            ],
            type: [
                $df29a836a27602ed$var$UNSIGNED_BYTE$2
            ]
        };
        t[$df29a836a27602ed$var$RGBA8_SNORM] = {
            textureFormat: $df29a836a27602ed$var$RGBA,
            colorRenderable: false,
            textureFilterable: true,
            bytesPerElement: [
                4
            ],
            type: [
                $df29a836a27602ed$var$BYTE$2
            ]
        };
        t[$df29a836a27602ed$var$RGB5_A1] = {
            textureFormat: $df29a836a27602ed$var$RGBA,
            colorRenderable: true,
            textureFilterable: true,
            bytesPerElement: [
                4,
                2,
                4
            ],
            type: [
                $df29a836a27602ed$var$UNSIGNED_BYTE$2,
                $df29a836a27602ed$var$UNSIGNED_SHORT_5_5_5_1$1,
                $df29a836a27602ed$var$UNSIGNED_INT_2_10_10_10_REV$1
            ]
        };
        t[$df29a836a27602ed$var$RGBA4] = {
            textureFormat: $df29a836a27602ed$var$RGBA,
            colorRenderable: true,
            textureFilterable: true,
            bytesPerElement: [
                4,
                2
            ],
            type: [
                $df29a836a27602ed$var$UNSIGNED_BYTE$2,
                $df29a836a27602ed$var$UNSIGNED_SHORT_4_4_4_4$1
            ]
        };
        t[$df29a836a27602ed$var$RGB10_A2] = {
            textureFormat: $df29a836a27602ed$var$RGBA,
            colorRenderable: true,
            textureFilterable: true,
            bytesPerElement: [
                4
            ],
            type: [
                $df29a836a27602ed$var$UNSIGNED_INT_2_10_10_10_REV$1
            ]
        };
        t[$df29a836a27602ed$var$RGBA16F] = {
            textureFormat: $df29a836a27602ed$var$RGBA,
            colorRenderable: false,
            textureFilterable: true,
            bytesPerElement: [
                16,
                8
            ],
            type: [
                $df29a836a27602ed$var$FLOAT$2,
                $df29a836a27602ed$var$HALF_FLOAT$1
            ]
        };
        t[$df29a836a27602ed$var$RGBA32F] = {
            textureFormat: $df29a836a27602ed$var$RGBA,
            colorRenderable: false,
            textureFilterable: false,
            bytesPerElement: [
                16
            ],
            type: [
                $df29a836a27602ed$var$FLOAT$2
            ]
        };
        t[$df29a836a27602ed$var$RGBA8UI] = {
            textureFormat: $df29a836a27602ed$var$RGBA_INTEGER,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                4
            ],
            type: [
                $df29a836a27602ed$var$UNSIGNED_BYTE$2
            ]
        };
        t[$df29a836a27602ed$var$RGBA8I] = {
            textureFormat: $df29a836a27602ed$var$RGBA_INTEGER,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                4
            ],
            type: [
                $df29a836a27602ed$var$BYTE$2
            ]
        };
        t[$df29a836a27602ed$var$RGB10_A2UI] = {
            textureFormat: $df29a836a27602ed$var$RGBA_INTEGER,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                4
            ],
            type: [
                $df29a836a27602ed$var$UNSIGNED_INT_2_10_10_10_REV$1
            ]
        };
        t[$df29a836a27602ed$var$RGBA16UI] = {
            textureFormat: $df29a836a27602ed$var$RGBA_INTEGER,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                8
            ],
            type: [
                $df29a836a27602ed$var$UNSIGNED_SHORT$2
            ]
        };
        t[$df29a836a27602ed$var$RGBA16I] = {
            textureFormat: $df29a836a27602ed$var$RGBA_INTEGER,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                8
            ],
            type: [
                $df29a836a27602ed$var$SHORT$2
            ]
        };
        t[$df29a836a27602ed$var$RGBA32I] = {
            textureFormat: $df29a836a27602ed$var$RGBA_INTEGER,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                16
            ],
            type: [
                $df29a836a27602ed$var$INT$2
            ]
        };
        t[$df29a836a27602ed$var$RGBA32UI] = {
            textureFormat: $df29a836a27602ed$var$RGBA_INTEGER,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                16
            ],
            type: [
                $df29a836a27602ed$var$UNSIGNED_INT$2
            ]
        };
        // Sized Internal
        t[$df29a836a27602ed$var$DEPTH_COMPONENT16] = {
            textureFormat: $df29a836a27602ed$var$DEPTH_COMPONENT,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                2,
                4
            ],
            type: [
                $df29a836a27602ed$var$UNSIGNED_SHORT$2,
                $df29a836a27602ed$var$UNSIGNED_INT$2
            ]
        };
        t[$df29a836a27602ed$var$DEPTH_COMPONENT24] = {
            textureFormat: $df29a836a27602ed$var$DEPTH_COMPONENT,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                4
            ],
            type: [
                $df29a836a27602ed$var$UNSIGNED_INT$2
            ]
        };
        t[$df29a836a27602ed$var$DEPTH_COMPONENT32F] = {
            textureFormat: $df29a836a27602ed$var$DEPTH_COMPONENT,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                4
            ],
            type: [
                $df29a836a27602ed$var$FLOAT$2
            ]
        };
        t[$df29a836a27602ed$var$DEPTH24_STENCIL8] = {
            textureFormat: $df29a836a27602ed$var$DEPTH_STENCIL,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                4
            ],
            type: [
                $df29a836a27602ed$var$UNSIGNED_INT_24_8$1
            ]
        };
        t[$df29a836a27602ed$var$DEPTH32F_STENCIL8] = {
            textureFormat: $df29a836a27602ed$var$DEPTH_STENCIL,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                4
            ],
            type: [
                $df29a836a27602ed$var$FLOAT_32_UNSIGNED_INT_24_8_REV$1
            ]
        };
        Object.keys(t).forEach(function(internalFormat) {
            const info = t[internalFormat];
            info.bytesPerElementMap = {
            };
            info.bytesPerElement.forEach(function(bytesPerElement, ndx) {
                const type = info.type[ndx];
                info.bytesPerElementMap[type] = bytesPerElement;
            });
        });
        $df29a836a27602ed$var$s_textureInternalFormatInfo = t;
    }
    return $df29a836a27602ed$var$s_textureInternalFormatInfo[internalFormat];
}
/**
 * Gets the number of bytes per element for a given internalFormat / type
 * @param {number} internalFormat The internalFormat parameter from texImage2D etc..
 * @param {number} type The type parameter for texImage2D etc..
 * @return {number} the number of bytes per element for the given internalFormat, type combo
 * @memberOf module:twgl/textures
 */ function $df29a836a27602ed$export$df2d41bf86d3b760(internalFormat, type) {
    const info = $df29a836a27602ed$var$getTextureInternalFormatInfo(internalFormat);
    if (!info) throw "unknown internal format";
    const bytesPerElement = info.bytesPerElementMap[type];
    if (bytesPerElement === undefined) throw "unknown internal format";
    return bytesPerElement;
}
/**
 * Info related to a specific texture internalFormat as returned
 * from {@link module:twgl/textures.getFormatAndTypeForInternalFormat}.
 *
 * @typedef {Object} TextureFormatInfo
 * @property {number} format Format to pass to texImage2D and related functions
 * @property {number} type Type to pass to texImage2D and related functions
 * @memberOf module:twgl/textures
 */ /**
 * Gets the format and type for a given internalFormat
 *
 * @param {number} internalFormat The internal format
 * @return {module:twgl/textures.TextureFormatInfo} the corresponding format and type,
 * @memberOf module:twgl/textures
 */ function $df29a836a27602ed$export$7972c3060d7259fe(internalFormat) {
    const info = $df29a836a27602ed$var$getTextureInternalFormatInfo(internalFormat);
    if (!info) throw "unknown internal format";
    return {
        format: info.textureFormat,
        type: info.type[0]
    };
}
/**
 * Returns true if value is power of 2
 * @param {number} value number to check.
 * @return true if value is power of 2
 * @private
 */ function $df29a836a27602ed$var$isPowerOf2(value) {
    return (value & value - 1) === 0;
}
/**
 * Gets whether or not we can generate mips for the given
 * internal format.
 *
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {number} width The width parameter from texImage2D etc..
 * @param {number} height The height parameter from texImage2D etc..
 * @param {number} internalFormat The internalFormat parameter from texImage2D etc..
 * @return {boolean} true if we can generate mips
 * @memberOf module:twgl/textures
 */ function $df29a836a27602ed$export$2058af87f75a4771(gl, width, height, internalFormat) {
    if (!$df29a836a27602ed$export$e3518b1ac7891039(gl)) return $df29a836a27602ed$var$isPowerOf2(width) && $df29a836a27602ed$var$isPowerOf2(height);
    const info = $df29a836a27602ed$var$getTextureInternalFormatInfo(internalFormat);
    if (!info) throw "unknown internal format";
    return info.colorRenderable && info.textureFilterable;
}
/**
 * Gets whether or not we can generate mips for the given format
 * @param {number} internalFormat The internalFormat parameter from texImage2D etc..
 * @return {boolean} true if we can generate mips
 * @memberOf module:twgl/textures
 */ function $df29a836a27602ed$export$586e511f2aeecefd(internalFormat) {
    const info = $df29a836a27602ed$var$getTextureInternalFormatInfo(internalFormat);
    if (!info) throw "unknown internal format";
    return info.textureFilterable;
}
/**
 * Gets the number of components for a given image format.
 * @param {number} format the format.
 * @return {number} the number of components for the format.
 * @memberOf module:twgl/textures
 */ function $df29a836a27602ed$export$4ef22c3eb774ec7f(format) {
    const info = $df29a836a27602ed$var$formatInfo[format];
    if (!info) throw "unknown format: " + format;
    return info.numColorComponents;
}
/**
 * Gets the texture type for a given array type.
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @return {number} the gl texture type
 * @private
 */ function $df29a836a27602ed$var$getTextureTypeForArrayType(gl, src, defaultType) {
    if ($df29a836a27602ed$var$isArrayBuffer$1(src)) return $df29a836a27602ed$export$bddf845047a0e959(src);
    return defaultType || $df29a836a27602ed$var$UNSIGNED_BYTE$2;
}
function $df29a836a27602ed$var$guessDimensions(gl, target, width, height, numElements) {
    if (numElements % 1 !== 0) throw "can't guess dimensions";
    if (!width && !height) {
        const size = Math.sqrt(numElements / (target === $df29a836a27602ed$var$TEXTURE_CUBE_MAP ? 6 : 1));
        if (size % 1 === 0) {
            width = size;
            height = size;
        } else {
            width = numElements;
            height = 1;
        }
    } else if (!height) {
        height = numElements / width;
        if (height % 1) throw "can't guess dimensions";
    } else if (!width) {
        width = numElements / height;
        if (width % 1) throw "can't guess dimensions";
    }
    return {
        width: width,
        height: height
    };
}
/**
 * Sets the default texture color.
 *
 * The default texture color is used when loading textures from
 * urls. Because the URL will be loaded async we'd like to be
 * able to use the texture immediately. By putting a 1x1 pixel
 * color in the texture we can start using the texture before
 * the URL has loaded.
 *
 * @param {number[]} color Array of 4 values in the range 0 to 1
 * @deprecated see {@link module:twgl.setDefaults}
 * @memberOf module:twgl/textures
 */ function $df29a836a27602ed$export$37b57533fe0ca238(color) {
    $df29a836a27602ed$var$defaults$1.textureColor = new Uint8Array([
        color[0] * 255,
        color[1] * 255,
        color[2] * 255,
        color[3] * 255
    ]);
}
function $df29a836a27602ed$export$13a00e79c3b46a21(newDefaults) {
    $df29a836a27602ed$var$copyExistingProperties(newDefaults, $df29a836a27602ed$var$defaults$1);
    if (newDefaults.textureColor) $df29a836a27602ed$export$37b57533fe0ca238(newDefaults.textureColor);
}
/**
 * A function to generate the source for a texture.
 * @callback TextureFunc
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext
 * @param {module:twgl.TextureOptions} options the texture options
 * @return {*} Returns any of the things documented for `src` for {@link module:twgl.TextureOptions}.
 * @memberOf module:twgl
 */ /**
 * Texture options passed to most texture functions. Each function will use whatever options
 * are appropriate for its needs. This lets you pass the same options to all functions.
 *
 * Note: A `TexImageSource` is defined in the WebGL spec as a `HTMLImageElement`, `HTMLVideoElement`,
 * `HTMLCanvasElement`, `ImageBitmap`, or `ImageData`.
 *
 * @typedef {Object} TextureOptions
 * @property {number} [target] the type of texture `gl.TEXTURE_2D` or `gl.TEXTURE_CUBE_MAP`. Defaults to `gl.TEXTURE_2D`.
 * @property {number} [level] the mip level to affect. Defaults to 0. Note, if set auto will be considered false unless explicitly set to true.
 * @property {number} [width] the width of the texture. Only used if src is an array or typed array or null.
 * @property {number} [height] the height of a texture. Only used if src is an array or typed array or null.
 * @property {number} [depth] the depth of a texture. Only used if src is an array or type array or null and target is `TEXTURE_3D` .
 * @property {number} [min] the min filter setting (eg. `gl.LINEAR`). Defaults to `gl.NEAREST_MIPMAP_LINEAR`
 *     or if texture is not a power of 2 on both dimensions then defaults to `gl.LINEAR`.
 * @property {number} [mag] the mag filter setting (eg. `gl.LINEAR`). Defaults to `gl.LINEAR`
 * @property {number} [minMag] both the min and mag filter settings.
 * @property {number} [internalFormat] internal format for texture. Defaults to `gl.RGBA`
 * @property {number} [format] format for texture. Defaults to `gl.RGBA`.
 * @property {number} [type] type for texture. Defaults to `gl.UNSIGNED_BYTE` unless `src` is ArrayBufferView. If `src`
 *     is ArrayBufferView defaults to type that matches ArrayBufferView type.
 * @property {number} [wrap] Texture wrapping for both S and T (and R if TEXTURE_3D or WebGLSampler). Defaults to `gl.REPEAT` for 2D unless src is WebGL1 and src not npot and `gl.CLAMP_TO_EDGE` for cube
 * @property {number} [wrapS] Texture wrapping for S. Defaults to `gl.REPEAT` and `gl.CLAMP_TO_EDGE` for cube. If set takes precedence over `wrap`.
 * @property {number} [wrapT] Texture wrapping for T. Defaults to `gl.REPEAT` and `gl.CLAMP_TO_EDGE` for cube. If set takes precedence over `wrap`.
 * @property {number} [wrapR] Texture wrapping for R. Defaults to `gl.REPEAT` and `gl.CLAMP_TO_EDGE` for cube. If set takes precedence over `wrap`.
 * @property {number} [minLod] TEXTURE_MIN_LOD setting
 * @property {number} [maxLod] TEXTURE_MAX_LOD setting
 * @property {number} [baseLevel] TEXTURE_BASE_LEVEL setting
 * @property {number} [maxLevel] TEXTURE_MAX_LEVEL setting
 * @property {number} [unpackAlignment] The `gl.UNPACK_ALIGNMENT` used when uploading an array. Defaults to 1.
 * @property {number[]|ArrayBufferView} [color] Color to initialize this texture with if loading an image asynchronously.
 *     The default use a blue 1x1 pixel texture. You can set another default by calling `twgl.setDefaults`
 *     or you can set an individual texture's initial color by setting this property. Example: `[1, .5, .5, 1]` = pink
 * @property {number} [premultiplyAlpha] Whether or not to premultiply alpha. Defaults to whatever the current setting is.
 *     This lets you set it once before calling `twgl.createTexture` or `twgl.createTextures` and only override
 *     the current setting for specific textures.
 * @property {number} [flipY] Whether or not to flip the texture vertically on upload. Defaults to whatever the current setting is.
 *     This lets you set it once before calling `twgl.createTexture` or `twgl.createTextures` and only override
 *     the current setting for specific textures.
 * @property {number} [colorspaceConversion] Whether or not to let the browser do colorspace conversion of the texture on upload. Defaults to whatever the current setting is.
 *     This lets you set it once before calling `twgl.createTexture` or `twgl.createTextures` and only override
 *     the current setting for specific textures.
 * @property {boolean} [auto] If `undefined` or `true`, in WebGL1, texture filtering is set automatically for non-power of 2 images and
 *    mips are generated for power of 2 images. In WebGL2 mips are generated if they can be. Note: if `level` is set above
 *    then then `auto` is assumed to be `false` unless explicity set to `true`.
 * @property {number[]} [cubeFaceOrder] The order that cube faces are pulled out of an img or set of images. The default is
 *
 *     [gl.TEXTURE_CUBE_MAP_POSITIVE_X,
 *      gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
 *      gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
 *      gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
 *      gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
 *      gl.TEXTURE_CUBE_MAP_NEGATIVE_Z]
 *
 * @property {(number[]|ArrayBufferView|TexImageSource|TexImageSource[]|string|string[]|module:twgl.TextureFunc)} [src] source for texture
 *
 *    If `string` then it's assumed to be a URL to an image. The image will be downloaded async. A usable
 *    1x1 pixel texture will be returned immediately. The texture will be updated once the image has downloaded.
 *    If `target` is `gl.TEXTURE_CUBE_MAP` will attempt to divide image into 6 square pieces. 1x6, 6x1, 3x2, 2x3.
 *    The pieces will be uploaded in `cubeFaceOrder`
 *
 *    If `string[]` or `TexImageSource[]` and target is `gl.TEXTURE_CUBE_MAP` then it must have 6 entries, one for each face of a cube map.
 *
 *    If `string[]` or `TexImageSource[]` and target is `gl.TEXTURE_2D_ARRAY` then each entry is a slice of the a 2d array texture
 *    and will be scaled to the specified width and height OR to the size of the first image that loads.
 *
 *    If `TexImageSource` then it wil be used immediately to create the contents of the texture. Examples `HTMLImageElement`,
 *    `HTMLCanvasElement`, `HTMLVideoElement`.
 *
 *    If `number[]` or `ArrayBufferView` it's assumed to be data for a texture. If `width` or `height` is
 *    not specified it is guessed as follows. First the number of elements is computed by `src.length / numComponents`
 *    where `numComponents` is derived from `format`. If `target` is `gl.TEXTURE_CUBE_MAP` then `numElements` is divided
 *    by 6. Then
 *
 *    *   If neither `width` nor `height` are specified and `sqrt(numElements)` is an integer then width and height
 *        are set to `sqrt(numElements)`. Otherwise `width = numElements` and `height = 1`.
 *
 *    *   If only one of `width` or `height` is specified then the other equals `numElements / specifiedDimension`.
 *
 * If `number[]` will be converted to `type`.
 *
 * If `src` is a function it will be called with a `WebGLRenderingContext` and these options.
 * Whatever it returns is subject to these rules. So it can return a string url, an `HTMLElement`
 * an array etc...
 *
 * If `src` is undefined then an empty texture will be created of size `width` by `height`.
 *
 * @property {string} [crossOrigin] What to set the crossOrigin property of images when they are downloaded.
 *    default: undefined. Also see {@link module:twgl.setDefaults}.
 *
 * @memberOf module:twgl
 */ /**
 * Sets any packing state that will be set based on the options.
 * @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @private
 */ function $df29a836a27602ed$var$setPackState(gl, options) {
    if (options.colorspaceConversion !== undefined) gl.pixelStorei($df29a836a27602ed$var$UNPACK_COLORSPACE_CONVERSION_WEBGL, options.colorspaceConversion);
    if (options.premultiplyAlpha !== undefined) gl.pixelStorei($df29a836a27602ed$var$UNPACK_PREMULTIPLY_ALPHA_WEBGL, options.premultiplyAlpha);
    if (options.flipY !== undefined) gl.pixelStorei($df29a836a27602ed$var$UNPACK_FLIP_Y_WEBGL, options.flipY);
}
/**
 * Set skip state to defaults
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @private
 */ function $df29a836a27602ed$var$setSkipStateToDefault(gl) {
    gl.pixelStorei($df29a836a27602ed$var$UNPACK_ALIGNMENT, 4);
    if ($df29a836a27602ed$export$e3518b1ac7891039(gl)) {
        gl.pixelStorei($df29a836a27602ed$var$UNPACK_ROW_LENGTH, 0);
        gl.pixelStorei($df29a836a27602ed$var$UNPACK_IMAGE_HEIGHT, 0);
        gl.pixelStorei($df29a836a27602ed$var$UNPACK_SKIP_PIXELS, 0);
        gl.pixelStorei($df29a836a27602ed$var$UNPACK_SKIP_ROWS, 0);
        gl.pixelStorei($df29a836a27602ed$var$UNPACK_SKIP_IMAGES, 0);
    }
}
/**
 * Sets the parameters of a texture or sampler
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {number|WebGLSampler} target texture target or sampler
 * @param {function()} parameteriFn texParameteri or samplerParameteri fn
 * @param {WebGLTexture} tex the WebGLTexture to set parameters for
 * @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
 *   This is often the same options you passed in when you created the texture.
 * @private
 */ function $df29a836a27602ed$var$setTextureSamplerParameters(gl, target, parameteriFn, options) {
    if (options.minMag) {
        parameteriFn.call(gl, target, $df29a836a27602ed$var$TEXTURE_MIN_FILTER, options.minMag);
        parameteriFn.call(gl, target, $df29a836a27602ed$var$TEXTURE_MAG_FILTER, options.minMag);
    }
    if (options.min) parameteriFn.call(gl, target, $df29a836a27602ed$var$TEXTURE_MIN_FILTER, options.min);
    if (options.mag) parameteriFn.call(gl, target, $df29a836a27602ed$var$TEXTURE_MAG_FILTER, options.mag);
    if (options.wrap) {
        parameteriFn.call(gl, target, $df29a836a27602ed$var$TEXTURE_WRAP_S, options.wrap);
        parameteriFn.call(gl, target, $df29a836a27602ed$var$TEXTURE_WRAP_T, options.wrap);
        if (target === $df29a836a27602ed$var$TEXTURE_3D || $df29a836a27602ed$var$isSampler(gl, target)) parameteriFn.call(gl, target, $df29a836a27602ed$var$TEXTURE_WRAP_R, options.wrap);
    }
    if (options.wrapR) parameteriFn.call(gl, target, $df29a836a27602ed$var$TEXTURE_WRAP_R, options.wrapR);
    if (options.wrapS) parameteriFn.call(gl, target, $df29a836a27602ed$var$TEXTURE_WRAP_S, options.wrapS);
    if (options.wrapT) parameteriFn.call(gl, target, $df29a836a27602ed$var$TEXTURE_WRAP_T, options.wrapT);
    if (options.minLod) parameteriFn.call(gl, target, $df29a836a27602ed$var$TEXTURE_MIN_LOD, options.minLod);
    if (options.maxLod) parameteriFn.call(gl, target, $df29a836a27602ed$var$TEXTURE_MAX_LOD, options.maxLod);
    if (options.baseLevel) parameteriFn.call(gl, target, $df29a836a27602ed$var$TEXTURE_BASE_LEVEL, options.baseLevel);
    if (options.maxLevel) parameteriFn.call(gl, target, $df29a836a27602ed$var$TEXTURE_MAX_LEVEL, options.maxLevel);
}
/**
 * Sets the texture parameters of a texture.
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {WebGLTexture} tex the WebGLTexture to set parameters for
 * @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
 *   This is often the same options you passed in when you created the texture.
 * @memberOf module:twgl/textures
 */ function $df29a836a27602ed$export$145d4976a6287cac(gl, tex, options) {
    const target = options.target || $df29a836a27602ed$var$TEXTURE_2D;
    gl.bindTexture(target, tex);
    $df29a836a27602ed$var$setTextureSamplerParameters(gl, target, gl.texParameteri, options);
}
/**
 * Sets the sampler parameters of a sampler.
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {WebGLSampler} sampler the WebGLSampler to set parameters for
 * @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
 * @memberOf module:twgl/textures
 */ function $df29a836a27602ed$export$9473ec3d6ac9f748(gl, sampler, options) {
    $df29a836a27602ed$var$setTextureSamplerParameters(gl, sampler, gl.samplerParameteri, options);
}
/**
 * Creates a new sampler object and sets parameters.
 *
 * Example:
 *
 *      const sampler = twgl.createSampler(gl, {
 *        minMag: gl.NEAREST,         // sets both TEXTURE_MIN_FILTER and TEXTURE_MAG_FILTER
 *        wrap: gl.CLAMP_TO_NEAREST,  // sets both TEXTURE_WRAP_S and TEXTURE_WRAP_T and TEXTURE_WRAP_R
 *      });
 *
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {Object.<string,module:twgl.TextureOptions>} options A object of TextureOptions one per sampler.
 * @return {Object.<string,WebGLSampler>} the created samplers by name
 * @private
 */ function $df29a836a27602ed$export$9128f6a54e671ebe(gl, options) {
    const sampler = gl.createSampler();
    $df29a836a27602ed$export$9473ec3d6ac9f748(gl, sampler, options);
    return sampler;
}
/**
 * Creates a multiple sampler objects and sets parameters on each.
 *
 * Example:
 *
 *      const samplers = twgl.createSamplers(gl, {
 *        nearest: {
 *          minMag: gl.NEAREST,
 *        },
 *        nearestClampS: {
 *          minMag: gl.NEAREST,
 *          wrapS: gl.CLAMP_TO_NEAREST,
 *        },
 *        linear: {
 *          minMag: gl.LINEAR,
 *        },
 *        nearestClamp: {
 *          minMag: gl.NEAREST,
 *          wrap: gl.CLAMP_TO_EDGE,
 *        },
 *        linearClamp: {
 *          minMag: gl.LINEAR,
 *          wrap: gl.CLAMP_TO_EDGE,
 *        },
 *        linearClampT: {
 *          minMag: gl.LINEAR,
 *          wrapT: gl.CLAMP_TO_EDGE,
 *        },
 *      });
 *
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {module:twgl.TextureOptions} [options] A TextureOptions object with whatever parameters you want set on the sampler
 * @private
 */ function $df29a836a27602ed$export$7f108a4cd20bc0(gl, samplerOptions) {
    const samplers = {
    };
    Object.keys(samplerOptions).forEach(function(name) {
        samplers[name] = $df29a836a27602ed$export$9128f6a54e671ebe(gl, samplerOptions[name]);
    });
    return samplers;
}
/**
 * Makes a 1x1 pixel
 * If no color is passed in uses the default color which can be set by calling `setDefaultTextureColor`.
 * @param {(number[]|ArrayBufferView)} [color] The color using 0-1 values
 * @return {Uint8Array} Unit8Array with color.
 * @private
 */ function $df29a836a27602ed$var$make1Pixel(color) {
    color = color || $df29a836a27602ed$var$defaults$1.textureColor;
    if ($df29a836a27602ed$var$isArrayBuffer$1(color)) return color;
    return new Uint8Array([
        color[0] * 255,
        color[1] * 255,
        color[2] * 255,
        color[3] * 255
    ]);
}
/**
 * Sets filtering or generates mips for texture based on width or height
 * If width or height is not passed in uses `options.width` and//or `options.height`
 *
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {WebGLTexture} tex the WebGLTexture to set parameters for
 * @param {module:twgl.TextureOptions} [options] A TextureOptions object with whatever parameters you want set.
 *   This is often the same options you passed in when you created the texture.
 * @param {number} [width] width of texture
 * @param {number} [height] height of texture
 * @param {number} [internalFormat] The internalFormat parameter from texImage2D etc..
 * @memberOf module:twgl/textures
 */ function $df29a836a27602ed$export$494a924bf2d77d9a(gl, tex, options, width, height, internalFormat) {
    options = options || $df29a836a27602ed$var$defaults$1.textureOptions;
    internalFormat = internalFormat || $df29a836a27602ed$var$RGBA;
    const target = options.target || $df29a836a27602ed$var$TEXTURE_2D;
    width = width || options.width;
    height = height || options.height;
    gl.bindTexture(target, tex);
    if ($df29a836a27602ed$export$2058af87f75a4771(gl, width, height, internalFormat)) gl.generateMipmap(target);
    else {
        const filtering = $df29a836a27602ed$export$586e511f2aeecefd(internalFormat) ? $df29a836a27602ed$var$LINEAR : $df29a836a27602ed$var$NEAREST;
        gl.texParameteri(target, $df29a836a27602ed$var$TEXTURE_MIN_FILTER, filtering);
        gl.texParameteri(target, $df29a836a27602ed$var$TEXTURE_MAG_FILTER, filtering);
        gl.texParameteri(target, $df29a836a27602ed$var$TEXTURE_WRAP_S, $df29a836a27602ed$var$CLAMP_TO_EDGE);
        gl.texParameteri(target, $df29a836a27602ed$var$TEXTURE_WRAP_T, $df29a836a27602ed$var$CLAMP_TO_EDGE);
    }
}
function $df29a836a27602ed$var$shouldAutomaticallySetTextureFilteringForSize(options) {
    return options.auto === true || options.auto === undefined && options.level === undefined;
}
/**
 * Gets an array of cubemap face enums
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
 *   This is often the same options you passed in when you created the texture.
 * @return {number[]} cubemap face enums
 * @private
 */ function $df29a836a27602ed$var$getCubeFaceOrder(gl, options) {
    options = options || {
    };
    return options.cubeFaceOrder || [
        $df29a836a27602ed$var$TEXTURE_CUBE_MAP_POSITIVE_X,
        $df29a836a27602ed$var$TEXTURE_CUBE_MAP_NEGATIVE_X,
        $df29a836a27602ed$var$TEXTURE_CUBE_MAP_POSITIVE_Y,
        $df29a836a27602ed$var$TEXTURE_CUBE_MAP_NEGATIVE_Y,
        $df29a836a27602ed$var$TEXTURE_CUBE_MAP_POSITIVE_Z,
        $df29a836a27602ed$var$TEXTURE_CUBE_MAP_NEGATIVE_Z, 
    ];
}
/**
 * @typedef {Object} FaceInfo
 * @property {number} face gl enum for texImage2D
 * @property {number} ndx face index (0 - 5) into source data
 * @ignore
 */ /**
 * Gets an array of FaceInfos
 * There's a bug in some NVidia drivers that will crash the driver if
 * `gl.TEXTURE_CUBE_MAP_POSITIVE_X` is not uploaded first. So, we take
 * the user's desired order from his faces to WebGL and make sure we
 * do the faces in WebGL order
 *
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
 * @return {FaceInfo[]} cubemap face infos. Arguably the `face` property of each element is redundant but
 *    it's needed internally to sort the array of `ndx` properties by `face`.
 * @private
 */ function $df29a836a27602ed$var$getCubeFacesWithNdx(gl, options) {
    const faces = $df29a836a27602ed$var$getCubeFaceOrder(gl, options);
    // work around bug in NVidia drivers. We have to upload the first face first else the driver crashes :(
    const facesWithNdx = faces.map(function(face, ndx) {
        return {
            face: face,
            ndx: ndx
        };
    });
    facesWithNdx.sort(function(a, b) {
        return a.face - b.face;
    });
    return facesWithNdx;
}
/**
 * Set a texture from the contents of an element. Will also set
 * texture filtering or generate mips based on the dimensions of the element
 * unless `options.auto === false`. If `target === gl.TEXTURE_CUBE_MAP` will
 * attempt to slice image into 1x6, 2x3, 3x2, or 6x1 images, one for each face.
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {WebGLTexture} tex the WebGLTexture to set parameters for
 * @param {HTMLElement} element a canvas, img, or video element.
 * @param {module:twgl.TextureOptions} [options] A TextureOptions object with whatever parameters you want set.
 *   This is often the same options you passed in when you created the texture.
 * @memberOf module:twgl/textures
 * @kind function
 */ function $df29a836a27602ed$export$8119aa4cbf12798b(gl, tex, element, options) {
    options = options || $df29a836a27602ed$var$defaults$1.textureOptions;
    const target = options.target || $df29a836a27602ed$var$TEXTURE_2D;
    const level = options.level || 0;
    let width = element.width;
    let height = element.height;
    const internalFormat = options.internalFormat || options.format || $df29a836a27602ed$var$RGBA;
    const formatType = $df29a836a27602ed$export$7972c3060d7259fe(internalFormat);
    const format = options.format || formatType.format;
    const type = options.type || formatType.type;
    $df29a836a27602ed$var$setPackState(gl, options);
    gl.bindTexture(target, tex);
    if (target === $df29a836a27602ed$var$TEXTURE_CUBE_MAP) {
        // guess the parts
        const imgWidth = element.width;
        const imgHeight = element.height;
        let size;
        let slices;
        if (imgWidth / 6 === imgHeight) {
            // It's 6x1
            size = imgHeight;
            slices = [
                0,
                0,
                1,
                0,
                2,
                0,
                3,
                0,
                4,
                0,
                5,
                0
            ];
        } else if (imgHeight / 6 === imgWidth) {
            // It's 1x6
            size = imgWidth;
            slices = [
                0,
                0,
                0,
                1,
                0,
                2,
                0,
                3,
                0,
                4,
                0,
                5
            ];
        } else if (imgWidth / 3 === imgHeight / 2) {
            // It's 3x2
            size = imgWidth / 3;
            slices = [
                0,
                0,
                1,
                0,
                2,
                0,
                0,
                1,
                1,
                1,
                2,
                1
            ];
        } else if (imgWidth / 2 === imgHeight / 3) {
            // It's 2x3
            size = imgWidth / 2;
            slices = [
                0,
                0,
                1,
                0,
                0,
                1,
                1,
                1,
                0,
                2,
                1,
                2
            ];
        } else throw "can't figure out cube map from element: " + (element.src ? element.src : element.nodeName);
        const ctx = $df29a836a27602ed$var$getShared2DContext();
        if (ctx) {
            ctx.canvas.width = size;
            ctx.canvas.height = size;
            width = size;
            height = size;
            $df29a836a27602ed$var$getCubeFacesWithNdx(gl, options).forEach(function(f) {
                const xOffset = slices[f.ndx * 2 + 0] * size;
                const yOffset = slices[f.ndx * 2 + 1] * size;
                ctx.drawImage(element, xOffset, yOffset, size, size, 0, 0, size, size);
                gl.texImage2D(f.face, level, internalFormat, format, type, ctx.canvas);
            });
            // Free up the canvas memory
            ctx.canvas.width = 1;
            ctx.canvas.height = 1;
        } else if (typeof createImageBitmap !== 'undefined') {
            // NOTE: It seems like we should prefer ImageBitmap because unlike canvas it's
            // note lossy? (alpha is not premultiplied? although I'm not sure what
            width = size;
            height = size;
            $df29a836a27602ed$var$getCubeFacesWithNdx(gl, options).forEach(function(f) {
                const xOffset = slices[f.ndx * 2 + 0] * size;
                const yOffset = slices[f.ndx * 2 + 1] * size;
                // We can't easily use a default texture color here as it would have to match
                // the type across all faces where as with a 2D one there's only one face
                // so we're replacing everything all at once. It also has to be the correct size.
                // On the other hand we need all faces to be the same size so as one face loads
                // the rest match else the texture will be un-renderable.
                gl.texImage2D(f.face, level, internalFormat, size, size, 0, format, type, null);
                createImageBitmap(element, xOffset, yOffset, size, size, {
                    premultiplyAlpha: 'none',
                    colorSpaceConversion: 'none'
                }).then(function(imageBitmap) {
                    $df29a836a27602ed$var$setPackState(gl, options);
                    gl.bindTexture(target, tex);
                    gl.texImage2D(f.face, level, internalFormat, format, type, imageBitmap);
                    if ($df29a836a27602ed$var$shouldAutomaticallySetTextureFilteringForSize(options)) $df29a836a27602ed$export$494a924bf2d77d9a(gl, tex, options, width, height, internalFormat);
                });
            });
        }
    } else if (target === $df29a836a27602ed$var$TEXTURE_3D || target === $df29a836a27602ed$var$TEXTURE_2D_ARRAY) {
        const smallest = Math.min(element.width, element.height);
        const largest = Math.max(element.width, element.height);
        const depth = largest / smallest;
        if (depth % 1 !== 0) throw "can not compute 3D dimensions of element";
        const xMult = element.width === largest ? 1 : 0;
        const yMult = element.height === largest ? 1 : 0;
        gl.pixelStorei($df29a836a27602ed$var$UNPACK_ALIGNMENT, 1);
        gl.pixelStorei($df29a836a27602ed$var$UNPACK_ROW_LENGTH, element.width);
        gl.pixelStorei($df29a836a27602ed$var$UNPACK_IMAGE_HEIGHT, 0);
        gl.pixelStorei($df29a836a27602ed$var$UNPACK_SKIP_IMAGES, 0);
        gl.texImage3D(target, level, internalFormat, smallest, smallest, smallest, 0, format, type, null);
        for(let d = 0; d < depth; ++d){
            const srcX = d * smallest * xMult;
            const srcY = d * smallest * yMult;
            gl.pixelStorei($df29a836a27602ed$var$UNPACK_SKIP_PIXELS, srcX);
            gl.pixelStorei($df29a836a27602ed$var$UNPACK_SKIP_ROWS, srcY);
            gl.texSubImage3D(target, level, 0, 0, d, smallest, smallest, 1, format, type, element);
        }
        $df29a836a27602ed$var$setSkipStateToDefault(gl);
    } else gl.texImage2D(target, level, internalFormat, format, type, element);
    if ($df29a836a27602ed$var$shouldAutomaticallySetTextureFilteringForSize(options)) $df29a836a27602ed$export$494a924bf2d77d9a(gl, tex, options, width, height, internalFormat);
    $df29a836a27602ed$export$145d4976a6287cac(gl, tex, options);
}
function $df29a836a27602ed$var$noop() {
}
/**
 * Checks whether the url's origin is the same so that we can set the `crossOrigin`
 * @param {string} url url to image
 * @returns {boolean} true if the window's origin is the same as image's url
 * @private
 */ function $df29a836a27602ed$var$urlIsSameOrigin(url) {
    if (typeof document !== 'undefined') {
        // for IE really
        const a = document.createElement('a');
        a.href = url;
        return a.hostname === location.hostname && a.port === location.port && a.protocol === location.protocol;
    } else {
        const localOrigin = new URL(location.href).origin;
        const urlOrigin = new URL(url, location.href).origin;
        return urlOrigin === localOrigin;
    }
}
function $df29a836a27602ed$var$setToAnonymousIfUndefinedAndURLIsNotSameOrigin(url, crossOrigin) {
    return crossOrigin === undefined && !$df29a836a27602ed$var$urlIsSameOrigin(url) ? 'anonymous' : crossOrigin;
}
/**
 * Loads an image
 * @param {string} url url to image
 * @param {string} crossOrigin
 * @param {function(err, img)} [callback] a callback that's passed an error and the image. The error will be non-null
 *     if there was an error
 * @return {HTMLImageElement} the image being loaded.
 * @private
 */ function $df29a836a27602ed$var$loadImage(url, crossOrigin, callback) {
    callback = callback || $df29a836a27602ed$var$noop;
    let img;
    crossOrigin = crossOrigin !== undefined ? crossOrigin : $df29a836a27602ed$var$defaults$1.crossOrigin;
    crossOrigin = $df29a836a27602ed$var$setToAnonymousIfUndefinedAndURLIsNotSameOrigin(url, crossOrigin);
    if (typeof Image !== 'undefined') {
        img = new Image();
        if (crossOrigin !== undefined) img.crossOrigin = crossOrigin;
        const clearEventHandlers = function clearEventHandlers() {
            img.removeEventListener('error', onError); // eslint-disable-line
            img.removeEventListener('load', onLoad); // eslint-disable-line
            img = null;
        };
        const onError = function onError() {
            const msg = "couldn't load image: " + url;
            $df29a836a27602ed$var$error(msg);
            callback(msg, img);
            clearEventHandlers();
        };
        const onLoad = function onLoad() {
            callback(null, img);
            clearEventHandlers();
        };
        img.addEventListener('error', onError);
        img.addEventListener('load', onLoad);
        img.src = url;
        return img;
    } else if (typeof ImageBitmap !== 'undefined') {
        let err;
        let bm;
        const cb = function cb() {
            callback(err, bm);
        };
        const options = {
        };
        if (crossOrigin) options.mode = 'cors'; // TODO: not sure how to translate image.crossOrigin
        fetch(url, options).then(function(response) {
            if (!response.ok) throw response;
            return response.blob();
        }).then(function(blob) {
            return createImageBitmap(blob, {
                premultiplyAlpha: 'none',
                colorSpaceConversion: 'none'
            });
        }).then(function(bitmap) {
            // not sure if this works. We don't want
            // to catch the user's error. So, call
            // the callback in a timeout so we're
            // not in this scope inside the promise.
            bm = bitmap;
            setTimeout(cb);
        }).catch(function(e) {
            err = e;
            setTimeout(cb);
        });
        img = null;
    }
    return img;
}
/**
 * check if object is a TexImageSource
 *
 * @param {Object} obj Object to test
 * @return {boolean} true if object is a TexImageSource
 * @private
 */ function $df29a836a27602ed$var$isTexImageSource(obj) {
    return typeof ImageBitmap !== 'undefined' && obj instanceof ImageBitmap || typeof ImageData !== 'undefined' && obj instanceof ImageData || typeof HTMLElement !== 'undefined' && obj instanceof HTMLElement;
}
/**
 * if obj is an TexImageSource then just
 * uses it otherwise if obj is a string
 * then load it first.
 *
 * @param {string|TexImageSource} obj
 * @param {string} crossOrigin
 * @param {function(err, img)} [callback] a callback that's passed an error and the image. The error will be non-null
 *     if there was an error
 * @private
 */ function $df29a836a27602ed$var$loadAndUseImage(obj, crossOrigin, callback) {
    if ($df29a836a27602ed$var$isTexImageSource(obj)) {
        setTimeout(function() {
            callback(null, obj);
        });
        return obj;
    }
    return $df29a836a27602ed$var$loadImage(obj, crossOrigin, callback);
}
/**
 * Sets a texture to a 1x1 pixel color. If `options.color === false` is nothing happens. If it's not set
 * the default texture color is used which can be set by calling `setDefaultTextureColor`.
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {WebGLTexture} tex the WebGLTexture to set parameters for
 * @param {module:twgl.TextureOptions} [options] A TextureOptions object with whatever parameters you want set.
 *   This is often the same options you passed in when you created the texture.
 * @memberOf module:twgl/textures
 */ function $df29a836a27602ed$var$setTextureTo1PixelColor(gl, tex, options) {
    options = options || $df29a836a27602ed$var$defaults$1.textureOptions;
    const target = options.target || $df29a836a27602ed$var$TEXTURE_2D;
    gl.bindTexture(target, tex);
    if (options.color === false) return;
    // Assume it's a URL
    // Put 1x1 pixels in texture. That makes it renderable immediately regardless of filtering.
    const color = $df29a836a27602ed$var$make1Pixel(options.color);
    if (target === $df29a836a27602ed$var$TEXTURE_CUBE_MAP) for(let ii = 0; ii < 6; ++ii)gl.texImage2D($df29a836a27602ed$var$TEXTURE_CUBE_MAP_POSITIVE_X + ii, 0, $df29a836a27602ed$var$RGBA, 1, 1, 0, $df29a836a27602ed$var$RGBA, $df29a836a27602ed$var$UNSIGNED_BYTE$2, color);
    else if (target === $df29a836a27602ed$var$TEXTURE_3D || target === $df29a836a27602ed$var$TEXTURE_2D_ARRAY) gl.texImage3D(target, 0, $df29a836a27602ed$var$RGBA, 1, 1, 1, 0, $df29a836a27602ed$var$RGBA, $df29a836a27602ed$var$UNSIGNED_BYTE$2, color);
    else gl.texImage2D(target, 0, $df29a836a27602ed$var$RGBA, 1, 1, 0, $df29a836a27602ed$var$RGBA, $df29a836a27602ed$var$UNSIGNED_BYTE$2, color);
}
/**
 * The src image(s) used to create a texture.
 *
 * When you call {@link module:twgl.createTexture} or {@link module:twgl.createTextures}
 * you can pass in urls for images to load into the textures. If it's a single url
 * then this will be a single HTMLImageElement. If it's an array of urls used for a cubemap
 * this will be a corresponding array of images for the cubemap.
 *
 * @typedef {HTMLImageElement|HTMLImageElement[]} TextureSrc
 * @memberOf module:twgl
 */ /**
 * A callback for when an image finished downloading and been uploaded into a texture
 * @callback TextureReadyCallback
 * @param {*} err If truthy there was an error.
 * @param {WebGLTexture} texture the texture.
 * @param {module:twgl.TextureSrc} source image(s) used to as the src for the texture
 * @memberOf module:twgl
 */ /**
 * A callback for when all images have finished downloading and been uploaded into their respective textures
 * @callback TexturesReadyCallback
 * @param {*} err If truthy there was an error.
 * @param {Object.<string, WebGLTexture>} textures the created textures by name. Same as returned by {@link module:twgl.createTextures}.
 * @param {Object.<string, module:twgl.TextureSrc>} sources the image(s) used for the texture by name.
 * @memberOf module:twgl
 */ /**
 * A callback for when an image finished downloading and been uploaded into a texture
 * @callback CubemapReadyCallback
 * @param {*} err If truthy there was an error.
 * @param {WebGLTexture} tex the texture.
 * @param {HTMLImageElement[]} imgs the images for each face.
 * @memberOf module:twgl
 */ /**
 * A callback for when an image finished downloading and been uploaded into a texture
 * @callback ThreeDReadyCallback
 * @param {*} err If truthy there was an error.
 * @param {WebGLTexture} tex the texture.
 * @param {HTMLImageElement[]} imgs the images for each slice.
 * @memberOf module:twgl
 */ /**
 * Loads a texture from an image from a Url as specified in `options.src`
 * If `options.color !== false` will set the texture to a 1x1 pixel color so that the texture is
 * immediately useable. It will be updated with the contents of the image once the image has finished
 * downloading. Filtering options will be set as appropriate for image unless `options.auto === false`.
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {WebGLTexture} tex the WebGLTexture to set parameters for
 * @param {module:twgl.TextureOptions} [options] A TextureOptions object with whatever parameters you want set.
 * @param {module:twgl.TextureReadyCallback} [callback] A function to be called when the image has finished loading. err will
 *    be non null if there was an error.
 * @return {HTMLImageElement} the image being downloaded.
 * @memberOf module:twgl/textures
 */ function $df29a836a27602ed$export$a0ce1a7e01ad3b32(gl, tex, options, callback) {
    callback = callback || $df29a836a27602ed$var$noop;
    options = options || $df29a836a27602ed$var$defaults$1.textureOptions;
    $df29a836a27602ed$var$setTextureTo1PixelColor(gl, tex, options);
    // Because it's async we need to copy the options.
    options = Object.assign({
    }, options);
    const img1 = $df29a836a27602ed$var$loadAndUseImage(options.src, options.crossOrigin, function(err, img) {
        if (err) callback(err, tex, img);
        else {
            $df29a836a27602ed$export$8119aa4cbf12798b(gl, tex, img, options);
            callback(null, tex, img);
        }
    });
    return img1;
}
/**
 * Loads a cubemap from 6 urls or TexImageSources as specified in `options.src`. Will set the cubemap to a 1x1 pixel color
 * so that it is usable immediately unless `option.color === false`.
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {WebGLTexture} tex the WebGLTexture to set parameters for
 * @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
 * @param {module:twgl.CubemapReadyCallback} [callback] A function to be called when all the images have finished loading. err will
 *    be non null if there was an error.
 * @memberOf module:twgl/textures
 */ function $df29a836a27602ed$var$loadCubemapFromUrls(gl, tex, options, callback) {
    callback = callback || $df29a836a27602ed$var$noop;
    const urls = options.src;
    if (urls.length !== 6) throw "there must be 6 urls for a cubemap";
    const level = options.level || 0;
    const internalFormat = options.internalFormat || options.format || $df29a836a27602ed$var$RGBA;
    const formatType = $df29a836a27602ed$export$7972c3060d7259fe(internalFormat);
    const format = options.format || formatType.format;
    const type = options.type || $df29a836a27602ed$var$UNSIGNED_BYTE$2;
    const target = options.target || $df29a836a27602ed$var$TEXTURE_2D;
    if (target !== $df29a836a27602ed$var$TEXTURE_CUBE_MAP) throw "target must be TEXTURE_CUBE_MAP";
    $df29a836a27602ed$var$setTextureTo1PixelColor(gl, tex, options);
    // Because it's async we need to copy the options.
    options = Object.assign({
    }, options);
    let numToLoad = 6;
    const errors = [];
    const faces = $df29a836a27602ed$var$getCubeFaceOrder(gl, options);
    let imgs; // eslint-disable-line
    function uploadImg(faceTarget) {
        return function(err, img) {
            --numToLoad;
            if (err) errors.push(err);
            else if (img.width !== img.height) errors.push("cubemap face img is not a square: " + img.src);
            else {
                $df29a836a27602ed$var$setPackState(gl, options);
                gl.bindTexture(target, tex);
                // So assuming this is the first image we now have one face that's img sized
                // and 5 faces that are 1x1 pixel so size the other faces
                if (numToLoad === 5) // use the default order
                $df29a836a27602ed$var$getCubeFaceOrder().forEach(function(otherTarget) {
                    // Should we re-use the same face or a color?
                    gl.texImage2D(otherTarget, level, internalFormat, format, type, img);
                });
                else gl.texImage2D(faceTarget, level, internalFormat, format, type, img);
                if ($df29a836a27602ed$var$shouldAutomaticallySetTextureFilteringForSize(options)) gl.generateMipmap(target);
            }
            if (numToLoad === 0) callback(errors.length ? errors : undefined, tex, imgs);
        };
    }
    imgs = urls.map(function(url, ndx) {
        return $df29a836a27602ed$var$loadAndUseImage(url, options.crossOrigin, uploadImg(faces[ndx]));
    });
}
/**
 * Loads a 2d array or 3d texture from urls OR TexImageSources as specified in `options.src`.
 * Will set the texture to a 1x1 pixel color
 * so that it is usable immediately unless `option.color === false`.
 *
 * If the width and height is not specified the width and height of the first
 * image loaded will be used. Note that since images are loaded async
 * which image downloads first is unknown.
 *
 * If an image is not the same size as the width and height it will be scaled
 * to that width and height.
 *
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {WebGLTexture} tex the WebGLTexture to set parameters for
 * @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
 * @param {module:twgl.ThreeDReadyCallback} [callback] A function to be called when all the images have finished loading. err will
 *    be non null if there was an error.
 * @memberOf module:twgl/textures
 */ function $df29a836a27602ed$var$loadSlicesFromUrls(gl, tex, options, callback) {
    callback = callback || $df29a836a27602ed$var$noop;
    const urls = options.src;
    const internalFormat = options.internalFormat || options.format || $df29a836a27602ed$var$RGBA;
    const formatType = $df29a836a27602ed$export$7972c3060d7259fe(internalFormat);
    const format = options.format || formatType.format;
    const type = options.type || $df29a836a27602ed$var$UNSIGNED_BYTE$2;
    const target = options.target || $df29a836a27602ed$var$TEXTURE_2D_ARRAY;
    if (target !== $df29a836a27602ed$var$TEXTURE_3D && target !== $df29a836a27602ed$var$TEXTURE_2D_ARRAY) throw "target must be TEXTURE_3D or TEXTURE_2D_ARRAY";
    $df29a836a27602ed$var$setTextureTo1PixelColor(gl, tex, options);
    // Because it's async we need to copy the options.
    options = Object.assign({
    }, options);
    let numToLoad = urls.length;
    const errors = [];
    let imgs; // eslint-disable-line
    const level = options.level || 0;
    let width = options.width;
    let height = options.height;
    const depth = urls.length;
    let firstImage = true;
    function uploadImg(slice) {
        return function(err, img) {
            --numToLoad;
            if (err) errors.push(err);
            else {
                $df29a836a27602ed$var$setPackState(gl, options);
                gl.bindTexture(target, tex);
                if (firstImage) {
                    firstImage = false;
                    width = options.width || img.width;
                    height = options.height || img.height;
                    gl.texImage3D(target, level, internalFormat, width, height, depth, 0, format, type, null);
                    // put it in every slice otherwise some slices will be 0,0,0,0
                    for(let s = 0; s < depth; ++s)gl.texSubImage3D(target, level, 0, 0, s, width, height, 1, format, type, img);
                } else {
                    let src = img;
                    let ctx;
                    if (img.width !== width || img.height !== height) {
                        // Size the image to fix
                        ctx = $df29a836a27602ed$var$getShared2DContext();
                        src = ctx.canvas;
                        ctx.canvas.width = width;
                        ctx.canvas.height = height;
                        ctx.drawImage(img, 0, 0, width, height);
                    }
                    gl.texSubImage3D(target, level, 0, 0, slice, width, height, 1, format, type, src);
                    // free the canvas memory
                    if (ctx && src === ctx.canvas) {
                        ctx.canvas.width = 0;
                        ctx.canvas.height = 0;
                    }
                }
                if ($df29a836a27602ed$var$shouldAutomaticallySetTextureFilteringForSize(options)) gl.generateMipmap(target);
            }
            if (numToLoad === 0) callback(errors.length ? errors : undefined, tex, imgs);
        };
    }
    imgs = urls.map(function(url, ndx) {
        return $df29a836a27602ed$var$loadAndUseImage(url, options.crossOrigin, uploadImg(ndx));
    });
}
/**
 * Sets a texture from an array or typed array. If the width or height is not provided will attempt to
 * guess the size. See {@link module:twgl.TextureOptions}.
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {WebGLTexture} tex the WebGLTexture to set parameters for
 * @param {(number[]|ArrayBufferView)} src An array or typed arry with texture data.
 * @param {module:twgl.TextureOptions} [options] A TextureOptions object with whatever parameters you want set.
 *   This is often the same options you passed in when you created the texture.
 * @memberOf module:twgl/textures
 */ function $df29a836a27602ed$export$3d91b74019c3ded9(gl, tex, src, options) {
    options = options || $df29a836a27602ed$var$defaults$1.textureOptions;
    const target = options.target || $df29a836a27602ed$var$TEXTURE_2D;
    gl.bindTexture(target, tex);
    let width = options.width;
    let height = options.height;
    let depth = options.depth;
    const level = options.level || 0;
    const internalFormat = options.internalFormat || options.format || $df29a836a27602ed$var$RGBA;
    const formatType = $df29a836a27602ed$export$7972c3060d7259fe(internalFormat);
    const format = options.format || formatType.format;
    const type = options.type || $df29a836a27602ed$var$getTextureTypeForArrayType(gl, src, formatType.type);
    if (!$df29a836a27602ed$var$isArrayBuffer$1(src)) {
        const Type = $df29a836a27602ed$export$3dc63662699923fc(type);
        src = new Type(src);
    } else if (src instanceof Uint8ClampedArray) src = new Uint8Array(src.buffer);
    const bytesPerElement = $df29a836a27602ed$export$df2d41bf86d3b760(internalFormat, type);
    const numElements = src.byteLength / bytesPerElement; // TODO: check UNPACK_ALIGNMENT?
    if (numElements % 1) throw "length wrong size for format: " + $df29a836a27602ed$export$e97753eae63e4e62(gl, format);
    let dimensions;
    if (target === $df29a836a27602ed$var$TEXTURE_3D || target === $df29a836a27602ed$var$TEXTURE_2D_ARRAY) {
        if (!width && !height && !depth) {
            const size = Math.cbrt(numElements);
            if (size % 1 !== 0) throw "can't guess cube size of array of numElements: " + numElements;
            width = size;
            height = size;
            depth = size;
        } else if (width && (!height || !depth)) {
            dimensions = $df29a836a27602ed$var$guessDimensions(gl, target, height, depth, numElements / width);
            height = dimensions.width;
            depth = dimensions.height;
        } else if (height && (!width || !depth)) {
            dimensions = $df29a836a27602ed$var$guessDimensions(gl, target, width, depth, numElements / height);
            width = dimensions.width;
            depth = dimensions.height;
        } else {
            dimensions = $df29a836a27602ed$var$guessDimensions(gl, target, width, height, numElements / depth);
            width = dimensions.width;
            height = dimensions.height;
        }
    } else {
        dimensions = $df29a836a27602ed$var$guessDimensions(gl, target, width, height, numElements);
        width = dimensions.width;
        height = dimensions.height;
    }
    $df29a836a27602ed$var$setSkipStateToDefault(gl);
    gl.pixelStorei($df29a836a27602ed$var$UNPACK_ALIGNMENT, options.unpackAlignment || 1);
    $df29a836a27602ed$var$setPackState(gl, options);
    if (target === $df29a836a27602ed$var$TEXTURE_CUBE_MAP) {
        const elementsPerElement = bytesPerElement / src.BYTES_PER_ELEMENT;
        const faceSize = numElements / 6 * elementsPerElement;
        $df29a836a27602ed$var$getCubeFacesWithNdx(gl, options).forEach((f)=>{
            const offset = faceSize * f.ndx;
            const data = src.subarray(offset, offset + faceSize);
            gl.texImage2D(f.face, level, internalFormat, width, height, 0, format, type, data);
        });
    } else if (target === $df29a836a27602ed$var$TEXTURE_3D || target === $df29a836a27602ed$var$TEXTURE_2D_ARRAY) gl.texImage3D(target, level, internalFormat, width, height, depth, 0, format, type, src);
    else gl.texImage2D(target, level, internalFormat, width, height, 0, format, type, src);
    return {
        width: width,
        height: height,
        depth: depth,
        type: type
    };
}
/**
 * Sets a texture with no contents of a certain size. In other words calls `gl.texImage2D` with `null`.
 * You must set `options.width` and `options.height`.
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {WebGLTexture} tex the WebGLTexture to set parameters for
 * @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
 * @memberOf module:twgl/textures
 */ function $df29a836a27602ed$export$541fcc5ad0f34e5a(gl, tex, options) {
    const target = options.target || $df29a836a27602ed$var$TEXTURE_2D;
    gl.bindTexture(target, tex);
    const level = options.level || 0;
    const internalFormat = options.internalFormat || options.format || $df29a836a27602ed$var$RGBA;
    const formatType = $df29a836a27602ed$export$7972c3060d7259fe(internalFormat);
    const format = options.format || formatType.format;
    const type = options.type || formatType.type;
    $df29a836a27602ed$var$setPackState(gl, options);
    if (target === $df29a836a27602ed$var$TEXTURE_CUBE_MAP) for(let ii = 0; ii < 6; ++ii)gl.texImage2D($df29a836a27602ed$var$TEXTURE_CUBE_MAP_POSITIVE_X + ii, level, internalFormat, options.width, options.height, 0, format, type, null);
    else if (target === $df29a836a27602ed$var$TEXTURE_3D || target === $df29a836a27602ed$var$TEXTURE_2D_ARRAY) gl.texImage3D(target, level, internalFormat, options.width, options.height, options.depth, 0, format, type, null);
    else gl.texImage2D(target, level, internalFormat, options.width, options.height, 0, format, type, null);
}
/**
 * Creates a texture based on the options passed in.
 *
 * Note: may reset UNPACK_ALIGNMENT, UNPACK_ROW_LENGTH, UNPACK_IMAGE_HEIGHT, UNPACK_SKIP_IMAGES
 * UNPACK_SKIP_PIXELS, and UNPACK_SKIP_ROWS
 *
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {module:twgl.TextureOptions} [options] A TextureOptions object with whatever parameters you want set.
 * @param {module:twgl.TextureReadyCallback} [callback] A callback called when an image has been downloaded and uploaded to the texture.
 * @return {WebGLTexture} the created texture.
 * @memberOf module:twgl/textures
 */ function $df29a836a27602ed$export$37b981a8c575f415(gl, options, callback) {
    callback = callback || $df29a836a27602ed$var$noop;
    options = options || $df29a836a27602ed$var$defaults$1.textureOptions;
    const tex = gl.createTexture();
    const target = options.target || $df29a836a27602ed$var$TEXTURE_2D;
    let width = options.width || 1;
    let height = options.height || 1;
    const internalFormat = options.internalFormat || $df29a836a27602ed$var$RGBA;
    gl.bindTexture(target, tex);
    if (target === $df29a836a27602ed$var$TEXTURE_CUBE_MAP) {
        // this should have been the default for cubemaps :(
        gl.texParameteri(target, $df29a836a27602ed$var$TEXTURE_WRAP_S, $df29a836a27602ed$var$CLAMP_TO_EDGE);
        gl.texParameteri(target, $df29a836a27602ed$var$TEXTURE_WRAP_T, $df29a836a27602ed$var$CLAMP_TO_EDGE);
    }
    let src = options.src;
    if (src) {
        if (typeof src === "function") src = src(gl, options);
        if (typeof src === "string") $df29a836a27602ed$export$a0ce1a7e01ad3b32(gl, tex, options, callback);
        else if ($df29a836a27602ed$var$isArrayBuffer$1(src) || Array.isArray(src) && (typeof src[0] === 'number' || Array.isArray(src[0]) || $df29a836a27602ed$var$isArrayBuffer$1(src[0]))) {
            const dimensions = $df29a836a27602ed$export$3d91b74019c3ded9(gl, tex, src, options);
            width = dimensions.width;
            height = dimensions.height;
        } else if (Array.isArray(src) && (typeof src[0] === 'string' || $df29a836a27602ed$var$isTexImageSource(src[0]))) {
            if (target === $df29a836a27602ed$var$TEXTURE_CUBE_MAP) $df29a836a27602ed$var$loadCubemapFromUrls(gl, tex, options, callback);
            else $df29a836a27602ed$var$loadSlicesFromUrls(gl, tex, options, callback);
        } else {
            $df29a836a27602ed$export$8119aa4cbf12798b(gl, tex, src, options);
            width = src.width;
            height = src.height;
        }
    } else $df29a836a27602ed$export$541fcc5ad0f34e5a(gl, tex, options);
    if ($df29a836a27602ed$var$shouldAutomaticallySetTextureFilteringForSize(options)) $df29a836a27602ed$export$494a924bf2d77d9a(gl, tex, options, width, height, internalFormat);
    $df29a836a27602ed$export$145d4976a6287cac(gl, tex, options);
    return tex;
}
/**
 * Resizes a texture based on the options passed in.
 *
 * Note: This is not a generic resize anything function.
 * It's mostly used by {@link module:twgl.resizeFramebufferInfo}
 * It will use `options.src` if it exists to try to determine a `type`
 * otherwise it will assume `gl.UNSIGNED_BYTE`. No data is provided
 * for the texture. Texture parameters will be set accordingly
 *
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {WebGLTexture} tex the texture to resize
 * @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
 * @param {number} [width] the new width. If not passed in will use `options.width`
 * @param {number} [height] the new height. If not passed in will use `options.height`
 * @param {number} [depth] the new depth. If not passed in will use `options.depth`
 * @memberOf module:twgl/textures
 */ function $df29a836a27602ed$export$1d581f00cfe12937(gl, tex, options, width, height, depth) {
    width = width || options.width;
    height = height || options.height;
    depth = depth || options.depth;
    const target = options.target || $df29a836a27602ed$var$TEXTURE_2D;
    gl.bindTexture(target, tex);
    const level = options.level || 0;
    const internalFormat = options.internalFormat || options.format || $df29a836a27602ed$var$RGBA;
    const formatType = $df29a836a27602ed$export$7972c3060d7259fe(internalFormat);
    const format = options.format || formatType.format;
    let type;
    const src = options.src;
    if (!src) type = options.type || formatType.type;
    else if ($df29a836a27602ed$var$isArrayBuffer$1(src) || Array.isArray(src) && typeof src[0] === 'number') type = options.type || $df29a836a27602ed$var$getTextureTypeForArrayType(gl, src, formatType.type);
    else type = options.type || formatType.type;
    if (target === $df29a836a27602ed$var$TEXTURE_CUBE_MAP) for(let ii = 0; ii < 6; ++ii)gl.texImage2D($df29a836a27602ed$var$TEXTURE_CUBE_MAP_POSITIVE_X + ii, level, internalFormat, width, height, 0, format, type, null);
    else if (target === $df29a836a27602ed$var$TEXTURE_3D || target === $df29a836a27602ed$var$TEXTURE_2D_ARRAY) gl.texImage3D(target, level, internalFormat, width, height, depth, 0, format, type, null);
    else gl.texImage2D(target, level, internalFormat, width, height, 0, format, type, null);
}
/**
 * Check if a src is an async request.
 * if src is a string we're going to download an image
 * if src is an array of strings we're going to download cubemap images
 * @param {*} src The src from a TextureOptions
 * @returns {bool} true if src is async.
 * @private
 */ function $df29a836a27602ed$var$isAsyncSrc(src) {
    return typeof src === 'string' || Array.isArray(src) && typeof src[0] === 'string';
}
/**
 * Creates a bunch of textures based on the passed in options.
 *
 * Example:
 *
 *     const textures = twgl.createTextures(gl, {
 *       // a power of 2 image
 *       hftIcon: { src: "images/hft-icon-16.png", mag: gl.NEAREST },
 *       // a non-power of 2 image
 *       clover: { src: "images/clover.jpg" },
 *       // From a canvas
 *       fromCanvas: { src: ctx.canvas },
 *       // A cubemap from 6 images
 *       yokohama: {
 *         target: gl.TEXTURE_CUBE_MAP,
 *         src: [
 *           'images/yokohama/posx.jpg',
 *           'images/yokohama/negx.jpg',
 *           'images/yokohama/posy.jpg',
 *           'images/yokohama/negy.jpg',
 *           'images/yokohama/posz.jpg',
 *           'images/yokohama/negz.jpg',
 *         ],
 *       },
 *       // A cubemap from 1 image (can be 1x6, 2x3, 3x2, 6x1)
 *       goldengate: {
 *         target: gl.TEXTURE_CUBE_MAP,
 *         src: 'images/goldengate.jpg',
 *       },
 *       // A 2x2 pixel texture from a JavaScript array
 *       checker: {
 *         mag: gl.NEAREST,
 *         min: gl.LINEAR,
 *         src: [
 *           255,255,255,255,
 *           192,192,192,255,
 *           192,192,192,255,
 *           255,255,255,255,
 *         ],
 *       },
 *       // a 1x2 pixel texture from a typed array.
 *       stripe: {
 *         mag: gl.NEAREST,
 *         min: gl.LINEAR,
 *         format: gl.LUMINANCE,
 *         src: new Uint8Array([
 *           255,
 *           128,
 *           255,
 *           128,
 *           255,
 *           128,
 *           255,
 *           128,
 *         ]),
 *         width: 1,
 *       },
 *     });
 *
 * Now
 *
 * *   `textures.hftIcon` will be a 2d texture
 * *   `textures.clover` will be a 2d texture
 * *   `textures.fromCanvas` will be a 2d texture
 * *   `textures.yohohama` will be a cubemap texture
 * *   `textures.goldengate` will be a cubemap texture
 * *   `textures.checker` will be a 2d texture
 * *   `textures.stripe` will be a 2d texture
 *
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {Object.<string,module:twgl.TextureOptions>} options A object of TextureOptions one per texture.
 * @param {module:twgl.TexturesReadyCallback} [callback] A callback called when all textures have been downloaded.
 * @return {Object.<string,WebGLTexture>} the created textures by name
 * @memberOf module:twgl/textures
 */ function $df29a836a27602ed$export$a1d6112a62597a1b(gl, textureOptions, callback) {
    callback = callback || $df29a836a27602ed$var$noop;
    let numDownloading = 0;
    const errors = [];
    const $df29a836a27602ed$export$c3bd26ce2da80660 = {
    };
    const images = {
    };
    function callCallbackIfReady() {
        if (numDownloading === 0) setTimeout(function() {
            callback(errors.length ? errors : undefined, $df29a836a27602ed$export$c3bd26ce2da80660, images);
        }, 0);
    }
    Object.keys(textureOptions).forEach(function(name) {
        const options = textureOptions[name];
        let onLoadFn;
        if ($df29a836a27602ed$var$isAsyncSrc(options.src)) {
            onLoadFn = function(err, tex, img) {
                images[name] = img;
                --numDownloading;
                if (err) errors.push(err);
                callCallbackIfReady();
            };
            ++numDownloading;
        }
        $df29a836a27602ed$export$c3bd26ce2da80660[name] = $df29a836a27602ed$export$37b981a8c575f415(gl, options, onLoadFn);
    });
    // queue the callback if there are no images to download.
    // We do this because if your code is structured to wait for
    // images to download but then you comment out all the async
    // images your code would break.
    callCallbackIfReady();
    return $df29a836a27602ed$export$c3bd26ce2da80660;
}
var $df29a836a27602ed$export$c3bd26ce2da80660 = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    setTextureDefaults_: $df29a836a27602ed$export$13a00e79c3b46a21,
    createSampler: $df29a836a27602ed$export$9128f6a54e671ebe,
    createSamplers: $df29a836a27602ed$export$7f108a4cd20bc0,
    setSamplerParameters: $df29a836a27602ed$export$9473ec3d6ac9f748,
    createTexture: $df29a836a27602ed$export$37b981a8c575f415,
    setEmptyTexture: $df29a836a27602ed$export$541fcc5ad0f34e5a,
    setTextureFromArray: $df29a836a27602ed$export$3d91b74019c3ded9,
    loadTextureFromUrl: $df29a836a27602ed$export$a0ce1a7e01ad3b32,
    setTextureFromElement: $df29a836a27602ed$export$8119aa4cbf12798b,
    setTextureFilteringForSize: $df29a836a27602ed$export$494a924bf2d77d9a,
    setTextureParameters: $df29a836a27602ed$export$145d4976a6287cac,
    setDefaultTextureColor: $df29a836a27602ed$export$37b57533fe0ca238,
    createTextures: $df29a836a27602ed$export$a1d6112a62597a1b,
    resizeTexture: $df29a836a27602ed$export$1d581f00cfe12937,
    canGenerateMipmap: $df29a836a27602ed$export$2058af87f75a4771,
    canFilter: $df29a836a27602ed$export$586e511f2aeecefd,
    getNumComponentsForFormat: $df29a836a27602ed$export$4ef22c3eb774ec7f,
    getBytesPerElementForInternalFormat: $df29a836a27602ed$export$df2d41bf86d3b760,
    getFormatAndTypeForInternalFormat: $df29a836a27602ed$export$7972c3060d7259fe
});
/*
 * Copyright 2019 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */ /**
 * Low level shader program related functions
 *
 * You should generally not need to use these functions. They are provided
 * for those cases where you're doing something out of the ordinary
 * and you need lower level access.
 *
 * For backward compatibility they are available at both `twgl.programs` and `twgl`
 * itself
 *
 * See {@link module:twgl} for core functions
 *
 * @module twgl/programs
 */ const $df29a836a27602ed$var$error$1 = $df29a836a27602ed$var$error;
const $df29a836a27602ed$var$warn$1 = $df29a836a27602ed$var$warn;
function $df29a836a27602ed$var$getElementById(id) {
    return typeof document !== 'undefined' && document.getElementById ? document.getElementById(id) : null;
}
const $df29a836a27602ed$var$TEXTURE0 = 33984;
const $df29a836a27602ed$var$DYNAMIC_DRAW = 35048;
const $df29a836a27602ed$var$ARRAY_BUFFER$1 = 34962;
const $df29a836a27602ed$var$ELEMENT_ARRAY_BUFFER$1 = 34963;
const $df29a836a27602ed$var$UNIFORM_BUFFER = 35345;
const $df29a836a27602ed$var$TRANSFORM_FEEDBACK_BUFFER = 35982;
const $df29a836a27602ed$var$TRANSFORM_FEEDBACK = 36386;
const $df29a836a27602ed$var$COMPILE_STATUS = 35713;
const $df29a836a27602ed$var$LINK_STATUS = 35714;
const $df29a836a27602ed$var$FRAGMENT_SHADER = 35632;
const $df29a836a27602ed$var$VERTEX_SHADER = 35633;
const $df29a836a27602ed$var$SEPARATE_ATTRIBS = 35981;
const $df29a836a27602ed$var$ACTIVE_UNIFORMS = 35718;
const $df29a836a27602ed$var$ACTIVE_ATTRIBUTES = 35721;
const $df29a836a27602ed$var$TRANSFORM_FEEDBACK_VARYINGS = 35971;
const $df29a836a27602ed$var$ACTIVE_UNIFORM_BLOCKS = 35382;
const $df29a836a27602ed$var$UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER = 35396;
const $df29a836a27602ed$var$UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER = 35398;
const $df29a836a27602ed$var$UNIFORM_BLOCK_DATA_SIZE = 35392;
const $df29a836a27602ed$var$UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES = 35395;
const $df29a836a27602ed$var$FLOAT$3 = 5126;
const $df29a836a27602ed$var$FLOAT_VEC2 = 35664;
const $df29a836a27602ed$var$FLOAT_VEC3 = 35665;
const $df29a836a27602ed$var$FLOAT_VEC4 = 35666;
const $df29a836a27602ed$var$INT$3 = 5124;
const $df29a836a27602ed$var$INT_VEC2 = 35667;
const $df29a836a27602ed$var$INT_VEC3 = 35668;
const $df29a836a27602ed$var$INT_VEC4 = 35669;
const $df29a836a27602ed$var$BOOL = 35670;
const $df29a836a27602ed$var$BOOL_VEC2 = 35671;
const $df29a836a27602ed$var$BOOL_VEC3 = 35672;
const $df29a836a27602ed$var$BOOL_VEC4 = 35673;
const $df29a836a27602ed$var$FLOAT_MAT2 = 35674;
const $df29a836a27602ed$var$FLOAT_MAT3 = 35675;
const $df29a836a27602ed$var$FLOAT_MAT4 = 35676;
const $df29a836a27602ed$var$SAMPLER_2D = 35678;
const $df29a836a27602ed$var$SAMPLER_CUBE = 35680;
const $df29a836a27602ed$var$SAMPLER_3D = 35679;
const $df29a836a27602ed$var$SAMPLER_2D_SHADOW = 35682;
const $df29a836a27602ed$var$FLOAT_MAT2x3 = 35685;
const $df29a836a27602ed$var$FLOAT_MAT2x4 = 35686;
const $df29a836a27602ed$var$FLOAT_MAT3x2 = 35687;
const $df29a836a27602ed$var$FLOAT_MAT3x4 = 35688;
const $df29a836a27602ed$var$FLOAT_MAT4x2 = 35689;
const $df29a836a27602ed$var$FLOAT_MAT4x3 = 35690;
const $df29a836a27602ed$var$SAMPLER_2D_ARRAY = 36289;
const $df29a836a27602ed$var$SAMPLER_2D_ARRAY_SHADOW = 36292;
const $df29a836a27602ed$var$SAMPLER_CUBE_SHADOW = 36293;
const $df29a836a27602ed$var$UNSIGNED_INT$3 = 5125;
const $df29a836a27602ed$var$UNSIGNED_INT_VEC2 = 36294;
const $df29a836a27602ed$var$UNSIGNED_INT_VEC3 = 36295;
const $df29a836a27602ed$var$UNSIGNED_INT_VEC4 = 36296;
const $df29a836a27602ed$var$INT_SAMPLER_2D = 36298;
const $df29a836a27602ed$var$INT_SAMPLER_3D = 36299;
const $df29a836a27602ed$var$INT_SAMPLER_CUBE = 36300;
const $df29a836a27602ed$var$INT_SAMPLER_2D_ARRAY = 36303;
const $df29a836a27602ed$var$UNSIGNED_INT_SAMPLER_2D = 36306;
const $df29a836a27602ed$var$UNSIGNED_INT_SAMPLER_3D = 36307;
const $df29a836a27602ed$var$UNSIGNED_INT_SAMPLER_CUBE = 36308;
const $df29a836a27602ed$var$UNSIGNED_INT_SAMPLER_2D_ARRAY = 36311;
const $df29a836a27602ed$var$TEXTURE_2D$1 = 3553;
const $df29a836a27602ed$var$TEXTURE_CUBE_MAP$1 = 34067;
const $df29a836a27602ed$var$TEXTURE_3D$1 = 32879;
const $df29a836a27602ed$var$TEXTURE_2D_ARRAY$1 = 35866;
const $df29a836a27602ed$var$typeMap = {
};
/**
 * Returns the corresponding bind point for a given sampler type
 */ function $df29a836a27602ed$var$getBindPointForSamplerType(gl, type) {
    return $df29a836a27602ed$var$typeMap[type].bindPoint;
}
// This kind of sucks! If you could compose functions as in `var fn = gl[name];`
// this code could be a lot smaller but that is sadly really slow (T_T)
function $df29a836a27602ed$var$floatSetter(gl, location) {
    return function(v) {
        gl.uniform1f(location, v);
    };
}
function $df29a836a27602ed$var$floatArraySetter(gl, location) {
    return function(v) {
        gl.uniform1fv(location, v);
    };
}
function $df29a836a27602ed$var$floatVec2Setter(gl, location) {
    return function(v) {
        gl.uniform2fv(location, v);
    };
}
function $df29a836a27602ed$var$floatVec3Setter(gl, location) {
    return function(v) {
        gl.uniform3fv(location, v);
    };
}
function $df29a836a27602ed$var$floatVec4Setter(gl, location) {
    return function(v) {
        gl.uniform4fv(location, v);
    };
}
function $df29a836a27602ed$var$intSetter(gl, location) {
    return function(v) {
        gl.uniform1i(location, v);
    };
}
function $df29a836a27602ed$var$intArraySetter(gl, location) {
    return function(v) {
        gl.uniform1iv(location, v);
    };
}
function $df29a836a27602ed$var$intVec2Setter(gl, location) {
    return function(v) {
        gl.uniform2iv(location, v);
    };
}
function $df29a836a27602ed$var$intVec3Setter(gl, location) {
    return function(v) {
        gl.uniform3iv(location, v);
    };
}
function $df29a836a27602ed$var$intVec4Setter(gl, location) {
    return function(v) {
        gl.uniform4iv(location, v);
    };
}
function $df29a836a27602ed$var$uintSetter(gl, location) {
    return function(v) {
        gl.uniform1ui(location, v);
    };
}
function $df29a836a27602ed$var$uintArraySetter(gl, location) {
    return function(v) {
        gl.uniform1uiv(location, v);
    };
}
function $df29a836a27602ed$var$uintVec2Setter(gl, location) {
    return function(v) {
        gl.uniform2uiv(location, v);
    };
}
function $df29a836a27602ed$var$uintVec3Setter(gl, location) {
    return function(v) {
        gl.uniform3uiv(location, v);
    };
}
function $df29a836a27602ed$var$uintVec4Setter(gl, location) {
    return function(v) {
        gl.uniform4uiv(location, v);
    };
}
function $df29a836a27602ed$var$floatMat2Setter(gl, location) {
    return function(v) {
        gl.uniformMatrix2fv(location, false, v);
    };
}
function $df29a836a27602ed$var$floatMat3Setter(gl, location) {
    return function(v) {
        gl.uniformMatrix3fv(location, false, v);
    };
}
function $df29a836a27602ed$var$floatMat4Setter(gl, location) {
    return function(v) {
        gl.uniformMatrix4fv(location, false, v);
    };
}
function $df29a836a27602ed$var$floatMat23Setter(gl, location) {
    return function(v) {
        gl.uniformMatrix2x3fv(location, false, v);
    };
}
function $df29a836a27602ed$var$floatMat32Setter(gl, location) {
    return function(v) {
        gl.uniformMatrix3x2fv(location, false, v);
    };
}
function $df29a836a27602ed$var$floatMat24Setter(gl, location) {
    return function(v) {
        gl.uniformMatrix2x4fv(location, false, v);
    };
}
function $df29a836a27602ed$var$floatMat42Setter(gl, location) {
    return function(v) {
        gl.uniformMatrix4x2fv(location, false, v);
    };
}
function $df29a836a27602ed$var$floatMat34Setter(gl, location) {
    return function(v) {
        gl.uniformMatrix3x4fv(location, false, v);
    };
}
function $df29a836a27602ed$var$floatMat43Setter(gl, location) {
    return function(v) {
        gl.uniformMatrix4x3fv(location, false, v);
    };
}
function $df29a836a27602ed$var$samplerSetter(gl, type, unit, location) {
    const bindPoint = $df29a836a27602ed$var$getBindPointForSamplerType(gl, type);
    return $df29a836a27602ed$export$e3518b1ac7891039(gl) ? function(textureOrPair) {
        let texture;
        let sampler;
        if ($df29a836a27602ed$var$isTexture(gl, textureOrPair)) {
            texture = textureOrPair;
            sampler = null;
        } else {
            texture = textureOrPair.texture;
            sampler = textureOrPair.sampler;
        }
        gl.uniform1i(location, unit);
        gl.activeTexture($df29a836a27602ed$var$TEXTURE0 + unit);
        gl.bindTexture(bindPoint, texture);
        gl.bindSampler(unit, sampler);
    } : function(texture) {
        gl.uniform1i(location, unit);
        gl.activeTexture($df29a836a27602ed$var$TEXTURE0 + unit);
        gl.bindTexture(bindPoint, texture);
    };
}
function $df29a836a27602ed$var$samplerArraySetter(gl, type, unit, location, size) {
    const bindPoint = $df29a836a27602ed$var$getBindPointForSamplerType(gl, type);
    const units = new Int32Array(size);
    for(let ii = 0; ii < size; ++ii)units[ii] = unit + ii;
    return $df29a836a27602ed$export$e3518b1ac7891039(gl) ? function($df29a836a27602ed$export$c3bd26ce2da80660) {
        gl.uniform1iv(location, units);
        $df29a836a27602ed$export$c3bd26ce2da80660.forEach(function(textureOrPair, index) {
            gl.activeTexture($df29a836a27602ed$var$TEXTURE0 + units[index]);
            let texture;
            let sampler;
            if ($df29a836a27602ed$var$isTexture(gl, textureOrPair)) {
                texture = textureOrPair;
                sampler = null;
            } else {
                texture = textureOrPair.texture;
                sampler = textureOrPair.sampler;
            }
            gl.bindSampler(unit, sampler);
            gl.bindTexture(bindPoint, texture);
        });
    } : function($df29a836a27602ed$export$c3bd26ce2da80660) {
        gl.uniform1iv(location, units);
        $df29a836a27602ed$export$c3bd26ce2da80660.forEach(function(texture, index) {
            gl.activeTexture($df29a836a27602ed$var$TEXTURE0 + units[index]);
            gl.bindTexture(bindPoint, texture);
        });
    };
}
$df29a836a27602ed$var$typeMap[$df29a836a27602ed$var$FLOAT$3] = {
    Type: Float32Array,
    size: 4,
    setter: $df29a836a27602ed$var$floatSetter,
    arraySetter: $df29a836a27602ed$var$floatArraySetter
};
$df29a836a27602ed$var$typeMap[$df29a836a27602ed$var$FLOAT_VEC2] = {
    Type: Float32Array,
    size: 8,
    setter: $df29a836a27602ed$var$floatVec2Setter,
    cols: 2
};
$df29a836a27602ed$var$typeMap[$df29a836a27602ed$var$FLOAT_VEC3] = {
    Type: Float32Array,
    size: 12,
    setter: $df29a836a27602ed$var$floatVec3Setter,
    cols: 3
};
$df29a836a27602ed$var$typeMap[$df29a836a27602ed$var$FLOAT_VEC4] = {
    Type: Float32Array,
    size: 16,
    setter: $df29a836a27602ed$var$floatVec4Setter,
    cols: 4
};
$df29a836a27602ed$var$typeMap[$df29a836a27602ed$var$INT$3] = {
    Type: Int32Array,
    size: 4,
    setter: $df29a836a27602ed$var$intSetter,
    arraySetter: $df29a836a27602ed$var$intArraySetter
};
$df29a836a27602ed$var$typeMap[$df29a836a27602ed$var$INT_VEC2] = {
    Type: Int32Array,
    size: 8,
    setter: $df29a836a27602ed$var$intVec2Setter,
    cols: 2
};
$df29a836a27602ed$var$typeMap[$df29a836a27602ed$var$INT_VEC3] = {
    Type: Int32Array,
    size: 12,
    setter: $df29a836a27602ed$var$intVec3Setter,
    cols: 3
};
$df29a836a27602ed$var$typeMap[$df29a836a27602ed$var$INT_VEC4] = {
    Type: Int32Array,
    size: 16,
    setter: $df29a836a27602ed$var$intVec4Setter,
    cols: 4
};
$df29a836a27602ed$var$typeMap[$df29a836a27602ed$var$UNSIGNED_INT$3] = {
    Type: Uint32Array,
    size: 4,
    setter: $df29a836a27602ed$var$uintSetter,
    arraySetter: $df29a836a27602ed$var$uintArraySetter
};
$df29a836a27602ed$var$typeMap[$df29a836a27602ed$var$UNSIGNED_INT_VEC2] = {
    Type: Uint32Array,
    size: 8,
    setter: $df29a836a27602ed$var$uintVec2Setter,
    cols: 2
};
$df29a836a27602ed$var$typeMap[$df29a836a27602ed$var$UNSIGNED_INT_VEC3] = {
    Type: Uint32Array,
    size: 12,
    setter: $df29a836a27602ed$var$uintVec3Setter,
    cols: 3
};
$df29a836a27602ed$var$typeMap[$df29a836a27602ed$var$UNSIGNED_INT_VEC4] = {
    Type: Uint32Array,
    size: 16,
    setter: $df29a836a27602ed$var$uintVec4Setter,
    cols: 4
};
$df29a836a27602ed$var$typeMap[$df29a836a27602ed$var$BOOL] = {
    Type: Uint32Array,
    size: 4,
    setter: $df29a836a27602ed$var$intSetter,
    arraySetter: $df29a836a27602ed$var$intArraySetter
};
$df29a836a27602ed$var$typeMap[$df29a836a27602ed$var$BOOL_VEC2] = {
    Type: Uint32Array,
    size: 8,
    setter: $df29a836a27602ed$var$intVec2Setter,
    cols: 2
};
$df29a836a27602ed$var$typeMap[$df29a836a27602ed$var$BOOL_VEC3] = {
    Type: Uint32Array,
    size: 12,
    setter: $df29a836a27602ed$var$intVec3Setter,
    cols: 3
};
$df29a836a27602ed$var$typeMap[$df29a836a27602ed$var$BOOL_VEC4] = {
    Type: Uint32Array,
    size: 16,
    setter: $df29a836a27602ed$var$intVec4Setter,
    cols: 4
};
$df29a836a27602ed$var$typeMap[$df29a836a27602ed$var$FLOAT_MAT2] = {
    Type: Float32Array,
    size: 32,
    setter: $df29a836a27602ed$var$floatMat2Setter,
    rows: 2,
    cols: 2
};
$df29a836a27602ed$var$typeMap[$df29a836a27602ed$var$FLOAT_MAT3] = {
    Type: Float32Array,
    size: 48,
    setter: $df29a836a27602ed$var$floatMat3Setter,
    rows: 3,
    cols: 3
};
$df29a836a27602ed$var$typeMap[$df29a836a27602ed$var$FLOAT_MAT4] = {
    Type: Float32Array,
    size: 64,
    setter: $df29a836a27602ed$var$floatMat4Setter,
    rows: 4,
    cols: 4
};
$df29a836a27602ed$var$typeMap[$df29a836a27602ed$var$FLOAT_MAT2x3] = {
    Type: Float32Array,
    size: 32,
    setter: $df29a836a27602ed$var$floatMat23Setter,
    rows: 2,
    cols: 3
};
$df29a836a27602ed$var$typeMap[$df29a836a27602ed$var$FLOAT_MAT2x4] = {
    Type: Float32Array,
    size: 32,
    setter: $df29a836a27602ed$var$floatMat24Setter,
    rows: 2,
    cols: 4
};
$df29a836a27602ed$var$typeMap[$df29a836a27602ed$var$FLOAT_MAT3x2] = {
    Type: Float32Array,
    size: 48,
    setter: $df29a836a27602ed$var$floatMat32Setter,
    rows: 3,
    cols: 2
};
$df29a836a27602ed$var$typeMap[$df29a836a27602ed$var$FLOAT_MAT3x4] = {
    Type: Float32Array,
    size: 48,
    setter: $df29a836a27602ed$var$floatMat34Setter,
    rows: 3,
    cols: 4
};
$df29a836a27602ed$var$typeMap[$df29a836a27602ed$var$FLOAT_MAT4x2] = {
    Type: Float32Array,
    size: 64,
    setter: $df29a836a27602ed$var$floatMat42Setter,
    rows: 4,
    cols: 2
};
$df29a836a27602ed$var$typeMap[$df29a836a27602ed$var$FLOAT_MAT4x3] = {
    Type: Float32Array,
    size: 64,
    setter: $df29a836a27602ed$var$floatMat43Setter,
    rows: 4,
    cols: 3
};
$df29a836a27602ed$var$typeMap[$df29a836a27602ed$var$SAMPLER_2D] = {
    Type: null,
    size: 0,
    setter: $df29a836a27602ed$var$samplerSetter,
    arraySetter: $df29a836a27602ed$var$samplerArraySetter,
    bindPoint: $df29a836a27602ed$var$TEXTURE_2D$1
};
$df29a836a27602ed$var$typeMap[$df29a836a27602ed$var$SAMPLER_CUBE] = {
    Type: null,
    size: 0,
    setter: $df29a836a27602ed$var$samplerSetter,
    arraySetter: $df29a836a27602ed$var$samplerArraySetter,
    bindPoint: $df29a836a27602ed$var$TEXTURE_CUBE_MAP$1
};
$df29a836a27602ed$var$typeMap[$df29a836a27602ed$var$SAMPLER_3D] = {
    Type: null,
    size: 0,
    setter: $df29a836a27602ed$var$samplerSetter,
    arraySetter: $df29a836a27602ed$var$samplerArraySetter,
    bindPoint: $df29a836a27602ed$var$TEXTURE_3D$1
};
$df29a836a27602ed$var$typeMap[$df29a836a27602ed$var$SAMPLER_2D_SHADOW] = {
    Type: null,
    size: 0,
    setter: $df29a836a27602ed$var$samplerSetter,
    arraySetter: $df29a836a27602ed$var$samplerArraySetter,
    bindPoint: $df29a836a27602ed$var$TEXTURE_2D$1
};
$df29a836a27602ed$var$typeMap[$df29a836a27602ed$var$SAMPLER_2D_ARRAY] = {
    Type: null,
    size: 0,
    setter: $df29a836a27602ed$var$samplerSetter,
    arraySetter: $df29a836a27602ed$var$samplerArraySetter,
    bindPoint: $df29a836a27602ed$var$TEXTURE_2D_ARRAY$1
};
$df29a836a27602ed$var$typeMap[$df29a836a27602ed$var$SAMPLER_2D_ARRAY_SHADOW] = {
    Type: null,
    size: 0,
    setter: $df29a836a27602ed$var$samplerSetter,
    arraySetter: $df29a836a27602ed$var$samplerArraySetter,
    bindPoint: $df29a836a27602ed$var$TEXTURE_2D_ARRAY$1
};
$df29a836a27602ed$var$typeMap[$df29a836a27602ed$var$SAMPLER_CUBE_SHADOW] = {
    Type: null,
    size: 0,
    setter: $df29a836a27602ed$var$samplerSetter,
    arraySetter: $df29a836a27602ed$var$samplerArraySetter,
    bindPoint: $df29a836a27602ed$var$TEXTURE_CUBE_MAP$1
};
$df29a836a27602ed$var$typeMap[$df29a836a27602ed$var$INT_SAMPLER_2D] = {
    Type: null,
    size: 0,
    setter: $df29a836a27602ed$var$samplerSetter,
    arraySetter: $df29a836a27602ed$var$samplerArraySetter,
    bindPoint: $df29a836a27602ed$var$TEXTURE_2D$1
};
$df29a836a27602ed$var$typeMap[$df29a836a27602ed$var$INT_SAMPLER_3D] = {
    Type: null,
    size: 0,
    setter: $df29a836a27602ed$var$samplerSetter,
    arraySetter: $df29a836a27602ed$var$samplerArraySetter,
    bindPoint: $df29a836a27602ed$var$TEXTURE_3D$1
};
$df29a836a27602ed$var$typeMap[$df29a836a27602ed$var$INT_SAMPLER_CUBE] = {
    Type: null,
    size: 0,
    setter: $df29a836a27602ed$var$samplerSetter,
    arraySetter: $df29a836a27602ed$var$samplerArraySetter,
    bindPoint: $df29a836a27602ed$var$TEXTURE_CUBE_MAP$1
};
$df29a836a27602ed$var$typeMap[$df29a836a27602ed$var$INT_SAMPLER_2D_ARRAY] = {
    Type: null,
    size: 0,
    setter: $df29a836a27602ed$var$samplerSetter,
    arraySetter: $df29a836a27602ed$var$samplerArraySetter,
    bindPoint: $df29a836a27602ed$var$TEXTURE_2D_ARRAY$1
};
$df29a836a27602ed$var$typeMap[$df29a836a27602ed$var$UNSIGNED_INT_SAMPLER_2D] = {
    Type: null,
    size: 0,
    setter: $df29a836a27602ed$var$samplerSetter,
    arraySetter: $df29a836a27602ed$var$samplerArraySetter,
    bindPoint: $df29a836a27602ed$var$TEXTURE_2D$1
};
$df29a836a27602ed$var$typeMap[$df29a836a27602ed$var$UNSIGNED_INT_SAMPLER_3D] = {
    Type: null,
    size: 0,
    setter: $df29a836a27602ed$var$samplerSetter,
    arraySetter: $df29a836a27602ed$var$samplerArraySetter,
    bindPoint: $df29a836a27602ed$var$TEXTURE_3D$1
};
$df29a836a27602ed$var$typeMap[$df29a836a27602ed$var$UNSIGNED_INT_SAMPLER_CUBE] = {
    Type: null,
    size: 0,
    setter: $df29a836a27602ed$var$samplerSetter,
    arraySetter: $df29a836a27602ed$var$samplerArraySetter,
    bindPoint: $df29a836a27602ed$var$TEXTURE_CUBE_MAP$1
};
$df29a836a27602ed$var$typeMap[$df29a836a27602ed$var$UNSIGNED_INT_SAMPLER_2D_ARRAY] = {
    Type: null,
    size: 0,
    setter: $df29a836a27602ed$var$samplerSetter,
    arraySetter: $df29a836a27602ed$var$samplerArraySetter,
    bindPoint: $df29a836a27602ed$var$TEXTURE_2D_ARRAY$1
};
function $df29a836a27602ed$var$floatAttribSetter(gl, index) {
    return function(b) {
        if (b.value) {
            gl.disableVertexAttribArray(index);
            switch(b.value.length){
                case 4:
                    gl.vertexAttrib4fv(index, b.value);
                    break;
                case 3:
                    gl.vertexAttrib3fv(index, b.value);
                    break;
                case 2:
                    gl.vertexAttrib2fv(index, b.value);
                    break;
                case 1:
                    gl.vertexAttrib1fv(index, b.value);
                    break;
                default:
                    throw new Error('the length of a float constant value must be between 1 and 4!');
            }
        } else {
            gl.bindBuffer($df29a836a27602ed$var$ARRAY_BUFFER$1, b.buffer);
            gl.enableVertexAttribArray(index);
            gl.vertexAttribPointer(index, b.numComponents || b.size, b.type || $df29a836a27602ed$var$FLOAT$3, b.normalize || false, b.stride || 0, b.offset || 0);
            if (b.divisor !== undefined) gl.vertexAttribDivisor(index, b.divisor);
        }
    };
}
function $df29a836a27602ed$var$intAttribSetter(gl, index) {
    return function(b) {
        if (b.value) {
            gl.disableVertexAttribArray(index);
            if (b.value.length === 4) gl.vertexAttrib4iv(index, b.value);
            else throw new Error('The length of an integer constant value must be 4!');
        } else {
            gl.bindBuffer($df29a836a27602ed$var$ARRAY_BUFFER$1, b.buffer);
            gl.enableVertexAttribArray(index);
            gl.vertexAttribIPointer(index, b.numComponents || b.size, b.type || $df29a836a27602ed$var$INT$3, b.stride || 0, b.offset || 0);
            if (b.divisor !== undefined) gl.vertexAttribDivisor(index, b.divisor);
        }
    };
}
function $df29a836a27602ed$var$uintAttribSetter(gl, index) {
    return function(b) {
        if (b.value) {
            gl.disableVertexAttribArray(index);
            if (b.value.length === 4) gl.vertexAttrib4uiv(index, b.value);
            else throw new Error('The length of an unsigned integer constant value must be 4!');
        } else {
            gl.bindBuffer($df29a836a27602ed$var$ARRAY_BUFFER$1, b.buffer);
            gl.enableVertexAttribArray(index);
            gl.vertexAttribIPointer(index, b.numComponents || b.size, b.type || $df29a836a27602ed$var$UNSIGNED_INT$3, b.stride || 0, b.offset || 0);
            if (b.divisor !== undefined) gl.vertexAttribDivisor(index, b.divisor);
        }
    };
}
function $df29a836a27602ed$var$matAttribSetter(gl, index, typeInfo1) {
    const defaultSize = typeInfo1.size;
    const count = typeInfo1.count;
    return function(b) {
        gl.bindBuffer($df29a836a27602ed$var$ARRAY_BUFFER$1, b.buffer);
        const numComponents = b.size || b.numComponents || defaultSize;
        const size = numComponents / count;
        const type = b.type || $df29a836a27602ed$var$FLOAT$3;
        const typeInfo = $df29a836a27602ed$var$typeMap[type];
        const stride = typeInfo.size * numComponents;
        const normalize = b.normalize || false;
        const offset = b.offset || 0;
        const rowOffset = stride / count;
        for(let i = 0; i < count; ++i){
            gl.enableVertexAttribArray(index + i);
            gl.vertexAttribPointer(index + i, size, type, normalize, stride, offset + rowOffset * i);
            if (b.divisor !== undefined) gl.vertexAttribDivisor(index + i, b.divisor);
        }
    };
}
const $df29a836a27602ed$var$attrTypeMap = {
};
$df29a836a27602ed$var$attrTypeMap[$df29a836a27602ed$var$FLOAT$3] = {
    size: 4,
    setter: $df29a836a27602ed$var$floatAttribSetter
};
$df29a836a27602ed$var$attrTypeMap[$df29a836a27602ed$var$FLOAT_VEC2] = {
    size: 8,
    setter: $df29a836a27602ed$var$floatAttribSetter
};
$df29a836a27602ed$var$attrTypeMap[$df29a836a27602ed$var$FLOAT_VEC3] = {
    size: 12,
    setter: $df29a836a27602ed$var$floatAttribSetter
};
$df29a836a27602ed$var$attrTypeMap[$df29a836a27602ed$var$FLOAT_VEC4] = {
    size: 16,
    setter: $df29a836a27602ed$var$floatAttribSetter
};
$df29a836a27602ed$var$attrTypeMap[$df29a836a27602ed$var$INT$3] = {
    size: 4,
    setter: $df29a836a27602ed$var$intAttribSetter
};
$df29a836a27602ed$var$attrTypeMap[$df29a836a27602ed$var$INT_VEC2] = {
    size: 8,
    setter: $df29a836a27602ed$var$intAttribSetter
};
$df29a836a27602ed$var$attrTypeMap[$df29a836a27602ed$var$INT_VEC3] = {
    size: 12,
    setter: $df29a836a27602ed$var$intAttribSetter
};
$df29a836a27602ed$var$attrTypeMap[$df29a836a27602ed$var$INT_VEC4] = {
    size: 16,
    setter: $df29a836a27602ed$var$intAttribSetter
};
$df29a836a27602ed$var$attrTypeMap[$df29a836a27602ed$var$UNSIGNED_INT$3] = {
    size: 4,
    setter: $df29a836a27602ed$var$uintAttribSetter
};
$df29a836a27602ed$var$attrTypeMap[$df29a836a27602ed$var$UNSIGNED_INT_VEC2] = {
    size: 8,
    setter: $df29a836a27602ed$var$uintAttribSetter
};
$df29a836a27602ed$var$attrTypeMap[$df29a836a27602ed$var$UNSIGNED_INT_VEC3] = {
    size: 12,
    setter: $df29a836a27602ed$var$uintAttribSetter
};
$df29a836a27602ed$var$attrTypeMap[$df29a836a27602ed$var$UNSIGNED_INT_VEC4] = {
    size: 16,
    setter: $df29a836a27602ed$var$uintAttribSetter
};
$df29a836a27602ed$var$attrTypeMap[$df29a836a27602ed$var$BOOL] = {
    size: 4,
    setter: $df29a836a27602ed$var$intAttribSetter
};
$df29a836a27602ed$var$attrTypeMap[$df29a836a27602ed$var$BOOL_VEC2] = {
    size: 8,
    setter: $df29a836a27602ed$var$intAttribSetter
};
$df29a836a27602ed$var$attrTypeMap[$df29a836a27602ed$var$BOOL_VEC3] = {
    size: 12,
    setter: $df29a836a27602ed$var$intAttribSetter
};
$df29a836a27602ed$var$attrTypeMap[$df29a836a27602ed$var$BOOL_VEC4] = {
    size: 16,
    setter: $df29a836a27602ed$var$intAttribSetter
};
$df29a836a27602ed$var$attrTypeMap[$df29a836a27602ed$var$FLOAT_MAT2] = {
    size: 4,
    setter: $df29a836a27602ed$var$matAttribSetter,
    count: 2
};
$df29a836a27602ed$var$attrTypeMap[$df29a836a27602ed$var$FLOAT_MAT3] = {
    size: 9,
    setter: $df29a836a27602ed$var$matAttribSetter,
    count: 3
};
$df29a836a27602ed$var$attrTypeMap[$df29a836a27602ed$var$FLOAT_MAT4] = {
    size: 16,
    setter: $df29a836a27602ed$var$matAttribSetter,
    count: 4
};
const $df29a836a27602ed$var$errorRE = /ERROR:\s*\d+:(\d+)/gi;
function $df29a836a27602ed$var$addLineNumbersWithError(src, log = '', lineOffset = 0) {
    // Note: Error message formats are not defined by any spec so this may or may not work.
    const matches = [
        ...log.matchAll($df29a836a27602ed$var$errorRE)
    ];
    const lineNoToErrorMap = new Map(matches.map((m, ndx)=>{
        const lineNo = parseInt(m[1]);
        const next = matches[ndx + 1];
        const end = next ? next.index : log.length;
        const msg = log.substring(m.index, end);
        return [
            lineNo - 1,
            msg
        ];
    }));
    return src.split('\n').map((line, lineNo)=>{
        const err = lineNoToErrorMap.get(lineNo);
        return `${lineNo + 1 + lineOffset}: ${line}${err ? `\n\n^^^ ${err}` : ''}`;
    }).join('\n');
}
/**
 * Error Callback
 * @callback ErrorCallback
 * @param {string} msg error message.
 * @param {number} [lineOffset] amount to add to line number
 * @memberOf module:twgl
 */ const $df29a836a27602ed$var$spaceRE = /^[ \t]*\n/;
/**
 * Loads a shader.
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
 * @param {string} shaderSource The shader source.
 * @param {number} shaderType The type of shader.
 * @param {module:twgl.ErrorCallback} opt_errorCallback callback for errors.
 * @return {WebGLShader} The created shader.
 * @private
 */ function $df29a836a27602ed$var$loadShader(gl, shaderSource, shaderType, opt_errorCallback) {
    const errFn = opt_errorCallback || $df29a836a27602ed$var$error$1;
    // Create the shader object
    const shader = gl.createShader(shaderType);
    // Remove the first end of line because WebGL 2.0 requires
    // #version 300 es
    // as the first line. No whitespace allowed before that line
    // so
    //
    // <script>
    // #version 300 es
    // </script>
    //
    // Has one line before it which is invalid according to GLSL ES 3.00
    //
    let lineOffset = 0;
    if ($df29a836a27602ed$var$spaceRE.test(shaderSource)) {
        lineOffset = 1;
        shaderSource = shaderSource.replace($df29a836a27602ed$var$spaceRE, '');
    }
    // Load the shader source
    gl.shaderSource(shader, shaderSource);
    // Compile the shader
    gl.compileShader(shader);
    // Check the compile status
    const compiled = gl.getShaderParameter(shader, $df29a836a27602ed$var$COMPILE_STATUS);
    if (!compiled) {
        // Something went wrong during compilation; get the error
        const lastError = gl.getShaderInfoLog(shader);
        errFn(`${$df29a836a27602ed$var$addLineNumbersWithError(shaderSource, lastError, lineOffset)}\nError compiling ${$df29a836a27602ed$export$e97753eae63e4e62(gl, shaderType)}: ${lastError}`);
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}
/**
 * @typedef {Object} ProgramOptions
 * @property {function(string)} [errorCallback] callback for errors
 * @property {Object.<string,number>} [attribLocations] a attribute name to location map
 * @property {(module:twgl.BufferInfo|Object.<string,module:twgl.AttribInfo>|string[])} [transformFeedbackVaryings] If passed
 *   a BufferInfo will use the attribs names inside. If passed an object of AttribInfos will use the names from that object. Otherwise
 *   you can pass an array of names.
 * @property {number} [transformFeedbackMode] the mode to pass `gl.transformFeedbackVaryings`. Defaults to `SEPARATE_ATTRIBS`.
 * @memberOf module:twgl
 */ /**
 * Gets the program options based on all these optional arguments
 * @param {module:twgl.ProgramOptions|string[]} [opt_attribs] Options for the program or an array of attribs names. Locations will be assigned by index if not passed in
 * @param {number[]} [opt_locations] The locations for the. A parallel array to opt_attribs letting you assign locations.
 * @param {module:twgl.ErrorCallback} [opt_errorCallback] callback for errors. By default it just prints an error to the console
 *        on error. If you want something else pass an callback. It's passed an error message.
 * @return {module:twgl.ProgramOptions} an instance of ProgramOptions based on the arguments passed in
 * @private
 */ function $df29a836a27602ed$var$getProgramOptions(opt_attribs, opt_locations, opt_errorCallback) {
    let transformFeedbackVaryings;
    let transformFeedbackMode;
    if (typeof opt_locations === 'function') {
        opt_errorCallback = opt_locations;
        opt_locations = undefined;
    }
    if (typeof opt_attribs === 'function') {
        opt_errorCallback = opt_attribs;
        opt_attribs = undefined;
    } else if (opt_attribs && !Array.isArray(opt_attribs)) {
        // If we have an errorCallback we can just return this object
        // Otherwise we need to construct one with default errorCallback
        if (opt_attribs.errorCallback) return opt_attribs;
        const opt = opt_attribs;
        opt_errorCallback = opt.errorCallback;
        opt_attribs = opt.attribLocations;
        transformFeedbackVaryings = opt.transformFeedbackVaryings;
        transformFeedbackMode = opt.transformFeedbackMode;
    }
    const options = {
        errorCallback: opt_errorCallback || $df29a836a27602ed$var$error$1,
        transformFeedbackVaryings: transformFeedbackVaryings,
        transformFeedbackMode: transformFeedbackMode
    };
    if (opt_attribs) {
        let attribLocations = {
        };
        if (Array.isArray(opt_attribs)) opt_attribs.forEach(function(attrib, ndx) {
            attribLocations[attrib] = opt_locations ? opt_locations[ndx] : ndx;
        });
        else attribLocations = opt_attribs;
        options.attribLocations = attribLocations;
    }
    return options;
}
const $df29a836a27602ed$var$defaultShaderType = [
    "VERTEX_SHADER",
    "FRAGMENT_SHADER", 
];
function $df29a836a27602ed$var$getShaderTypeFromScriptType(gl, scriptType) {
    if (scriptType.indexOf("frag") >= 0) return $df29a836a27602ed$var$FRAGMENT_SHADER;
    else if (scriptType.indexOf("vert") >= 0) return $df29a836a27602ed$var$VERTEX_SHADER;
    return undefined;
}
function $df29a836a27602ed$var$deleteShaders(gl, shaders) {
    shaders.forEach(function(shader) {
        gl.deleteShader(shader);
    });
}
/**
 * Creates a program, attaches (and/or compiles) shaders, binds attrib locations, links the
 * program and calls useProgram.
 *
 * NOTE: There are 4 signatures for this function
 *
 *     twgl.createProgram(gl, [vs, fs], options);
 *     twgl.createProgram(gl, [vs, fs], opt_errFunc);
 *     twgl.createProgram(gl, [vs, fs], opt_attribs, opt_errFunc);
 *     twgl.createProgram(gl, [vs, fs], opt_attribs, opt_locations, opt_errFunc);
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
 * @param {WebGLShader[]|string[]} shaders The shaders to attach, or element ids for their source, or strings that contain their source
 * @param {module:twgl.ProgramOptions|string[]|module:twgl.ErrorCallback} [opt_attribs] Options for the program or an array of attribs names or an error callback. Locations will be assigned by index if not passed in
 * @param {number[]} [opt_locations|module:twgl.ErrorCallback] The locations for the. A parallel array to opt_attribs letting you assign locations or an error callback.
 * @param {module:twgl.ErrorCallback} [opt_errorCallback] callback for errors. By default it just prints an error to the console
 *        on error. If you want something else pass an callback. It's passed an error message.
 * @return {WebGLProgram?} the created program or null if error.
 * @memberOf module:twgl/programs
 */ function $df29a836a27602ed$export$327d24a04cd0dc17(gl, shaders, opt_attribs, opt_locations, opt_errorCallback) {
    const progOptions = $df29a836a27602ed$var$getProgramOptions(opt_attribs, opt_locations, opt_errorCallback);
    const realShaders = [];
    const newShaders = [];
    for(let ndx = 0; ndx < shaders.length; ++ndx){
        let shader = shaders[ndx];
        if (typeof shader === 'string') {
            const elem = $df29a836a27602ed$var$getElementById(shader);
            const src = elem ? elem.text : shader;
            let type = gl[$df29a836a27602ed$var$defaultShaderType[ndx]];
            if (elem && elem.type) type = $df29a836a27602ed$var$getShaderTypeFromScriptType(gl, elem.type) || type;
            shader = $df29a836a27602ed$var$loadShader(gl, src, type, progOptions.errorCallback);
            newShaders.push(shader);
        }
        if ($df29a836a27602ed$var$isShader(gl, shader)) realShaders.push(shader);
    }
    if (realShaders.length !== shaders.length) {
        progOptions.errorCallback("not enough shaders for program");
        $df29a836a27602ed$var$deleteShaders(gl, newShaders);
        return null;
    }
    const program = gl.createProgram();
    realShaders.forEach(function(shader) {
        gl.attachShader(program, shader);
    });
    if (progOptions.attribLocations) Object.keys(progOptions.attribLocations).forEach(function(attrib) {
        gl.bindAttribLocation(program, progOptions.attribLocations[attrib], attrib);
    });
    let varyings = progOptions.transformFeedbackVaryings;
    if (varyings) {
        if (varyings.attribs) varyings = varyings.attribs;
        if (!Array.isArray(varyings)) varyings = Object.keys(varyings);
        gl.transformFeedbackVaryings(program, varyings, progOptions.transformFeedbackMode || $df29a836a27602ed$var$SEPARATE_ATTRIBS);
    }
    gl.linkProgram(program);
    // Check the link status
    const linked = gl.getProgramParameter(program, $df29a836a27602ed$var$LINK_STATUS);
    if (!linked) {
        // something went wrong with the link
        const lastError = gl.getProgramInfoLog(program);
        progOptions.errorCallback(`${realShaders.map((shader)=>{
            const src = $df29a836a27602ed$var$addLineNumbersWithError(gl.getShaderSource(shader), '', 0);
            const type = gl.getShaderParameter(shader, gl.SHADER_TYPE);
            return `${$df29a836a27602ed$export$e97753eae63e4e62(gl, type)}\n${src}}`;
        }).join('\n')}\nError in program linking: ${lastError}`);
        gl.deleteProgram(program);
        $df29a836a27602ed$var$deleteShaders(gl, newShaders);
        return null;
    }
    return program;
}
/**
 * Loads a shader from a script tag.
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
 * @param {string} scriptId The id of the script tag.
 * @param {number} [opt_shaderType] The type of shader. If not passed in it will
 *     be derived from the type of the script tag.
 * @param {module:twgl.ErrorCallback} [opt_errorCallback] callback for errors.
 * @return {WebGLShader?} The created shader or null if error.
 * @private
 */ function $df29a836a27602ed$var$createShaderFromScript(gl, scriptId, opt_shaderType, opt_errorCallback) {
    let shaderSource = "";
    const shaderScript = $df29a836a27602ed$var$getElementById(scriptId);
    if (!shaderScript) throw new Error(`unknown script element: ${scriptId}`);
    shaderSource = shaderScript.text;
    const shaderType = opt_shaderType || $df29a836a27602ed$var$getShaderTypeFromScriptType(gl, shaderScript.type);
    if (!shaderType) throw new Error('unknown shader type');
    return $df29a836a27602ed$var$loadShader(gl, shaderSource, shaderType, opt_errorCallback);
}
/**
 * Creates a program from 2 script tags.
 *
 * NOTE: There are 4 signatures for this function
 *
 *     twgl.createProgramFromScripts(gl, [vs, fs], opt_options);
 *     twgl.createProgramFromScripts(gl, [vs, fs], opt_errFunc);
 *     twgl.createProgramFromScripts(gl, [vs, fs], opt_attribs, opt_errFunc);
 *     twgl.createProgramFromScripts(gl, [vs, fs], opt_attribs, opt_locations, opt_errFunc);
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext
 *        to use.
 * @param {string[]} shaderScriptIds Array of ids of the script
 *        tags for the shaders. The first is assumed to be the
 *        vertex shader, the second the fragment shader.
 * @param {module:twgl.ProgramOptions|string[]|module:twgl.ErrorCallback} [opt_attribs] Options for the program or an array of attribs names or an error callback. Locations will be assigned by index if not passed in
 * @param {number[]} [opt_locations|module:twgl.ErrorCallback] The locations for the. A parallel array to opt_attribs letting you assign locations or an error callback.
 * @param {module:twgl.ErrorCallback} [opt_errorCallback] callback for errors. By default it just prints an error to the console
 *        on error. If you want something else pass an callback. It's passed an error message.
 * @return {WebGLProgram?} the created program or null if error.
 * @memberOf module:twgl/programs
 */ function $df29a836a27602ed$export$3699dca825c3297f(gl, shaderScriptIds, opt_attribs, opt_locations, opt_errorCallback) {
    const progOptions = $df29a836a27602ed$var$getProgramOptions(opt_attribs, opt_locations, opt_errorCallback);
    const shaders = [];
    for(let ii = 0; ii < shaderScriptIds.length; ++ii){
        const shader = $df29a836a27602ed$var$createShaderFromScript(gl, shaderScriptIds[ii], gl[$df29a836a27602ed$var$defaultShaderType[ii]], progOptions.errorCallback);
        if (!shader) return null;
        shaders.push(shader);
    }
    return $df29a836a27602ed$export$327d24a04cd0dc17(gl, shaders, progOptions);
}
/**
 * Creates a program from 2 sources.
 *
 * NOTE: There are 4 signatures for this function
 *
 *     twgl.createProgramFromSource(gl, [vs, fs], opt_options);
 *     twgl.createProgramFromSource(gl, [vs, fs], opt_errFunc);
 *     twgl.createProgramFromSource(gl, [vs, fs], opt_attribs, opt_errFunc);
 *     twgl.createProgramFromSource(gl, [vs, fs], opt_attribs, opt_locations, opt_errFunc);
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext
 *        to use.
 * @param {string[]} shaderSources Array of sources for the
 *        shaders. The first is assumed to be the vertex shader,
 *        the second the fragment shader.
 * @param {module:twgl.ProgramOptions|string[]|module:twgl.ErrorCallback} [opt_attribs] Options for the program or an array of attribs names or an error callback. Locations will be assigned by index if not passed in
 * @param {number[]} [opt_locations|module:twgl.ErrorCallback] The locations for the. A parallel array to opt_attribs letting you assign locations or an error callback.
 * @param {module:twgl.ErrorCallback} [opt_errorCallback] callback for errors. By default it just prints an error to the console
 *        on error. If you want something else pass an callback. It's passed an error message.
 * @return {WebGLProgram?} the created program or null if error.
 * @memberOf module:twgl/programs
 */ function $df29a836a27602ed$export$87c7c742dccfe3af(gl, shaderSources, opt_attribs, opt_locations, opt_errorCallback) {
    const progOptions = $df29a836a27602ed$var$getProgramOptions(opt_attribs, opt_locations, opt_errorCallback);
    const shaders = [];
    for(let ii = 0; ii < shaderSources.length; ++ii){
        const shader = $df29a836a27602ed$var$loadShader(gl, shaderSources[ii], gl[$df29a836a27602ed$var$defaultShaderType[ii]], progOptions.errorCallback);
        if (!shader) return null;
        shaders.push(shader);
    }
    return $df29a836a27602ed$export$327d24a04cd0dc17(gl, shaders, progOptions);
}
/**
 * Returns true if attribute/uniform is a reserved/built in
 *
 * It makes no sense to me why GL returns these because it's
 * illegal to call `gl.getUniformLocation` and `gl.getAttribLocation`
 * with names that start with `gl_` (and `webgl_` in WebGL)
 *
 * I can only assume they are there because they might count
 * when computing the number of uniforms/attributes used when you want to
 * know if you are near the limit. That doesn't really make sense
 * to me but the fact that these get returned are in the spec.
 *
 * @param {WebGLActiveInfo} info As returned from `gl.getActiveUniform` or
 *    `gl.getActiveAttrib`.
 * @return {bool} true if it's reserved
 * @private
 */ function $df29a836a27602ed$var$isBuiltIn(info) {
    const name = info.name;
    return name.startsWith("gl_") || name.startsWith("webgl_");
}
const $df29a836a27602ed$var$tokenRE = /(\.|\[|]|\w+)/g;
const $df29a836a27602ed$var$isDigit = (s)=>s >= '0' && s <= '9'
;
function $df29a836a27602ed$var$addSetterToUniformTree(fullPath, setter, node1, uniformSetters) {
    const tokens = fullPath.split($df29a836a27602ed$var$tokenRE).filter((s)=>s !== ''
    );
    let tokenNdx = 0;
    let path = '';
    for(;;){
        const token = tokens[tokenNdx++]; // has to be name or number
        path += token;
        const isArrayIndex = $df29a836a27602ed$var$isDigit(token[0]);
        const accessor = isArrayIndex ? parseInt(token) : token;
        if (isArrayIndex) path += tokens[tokenNdx++]; // skip ']'
        const isLastToken = tokenNdx === tokens.length;
        if (isLastToken) {
            node1[accessor] = setter;
            break;
        } else {
            const token = tokens[tokenNdx++]; // has to be . or [
            const isArray = token === '[';
            const child = node1[accessor] || (isArray ? [] : {
            });
            node1[accessor] = child;
            node1 = child;
            uniformSetters[path] = uniformSetters[path] || (function(node) {
                return function(value) {
                    $df29a836a27602ed$var$setUniformTree(node, value);
                };
            })(child);
            path += token;
        }
    }
}
/**
 * Creates setter functions for all uniforms of a shader
 * program.
 *
 * @see {@link module:twgl.setUniforms}
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
 * @param {WebGLProgram} program the program to create setters for.
 * @returns {Object.<string, function>} an object with a setter by name for each uniform
 * @memberOf module:twgl/programs
 */ function $df29a836a27602ed$export$fe2460765a628597(gl, program) {
    let textureUnit = 0;
    /**
   * Creates a setter for a uniform of the given program with it's
   * location embedded in the setter.
   * @param {WebGLProgram} program
   * @param {WebGLUniformInfo} uniformInfo
   * @returns {function} the created setter.
   */ function createUniformSetter(program, uniformInfo, location) {
        const isArray = uniformInfo.name.endsWith("[0]");
        const type = uniformInfo.type;
        const typeInfo = $df29a836a27602ed$var$typeMap[type];
        if (!typeInfo) throw new Error(`unknown type: 0x${type.toString(16)}`); // we should never get here.
        let setter;
        if (typeInfo.bindPoint) {
            // it's a sampler
            const unit = textureUnit;
            textureUnit += uniformInfo.size;
            if (isArray) setter = typeInfo.arraySetter(gl, type, unit, location, uniformInfo.size);
            else setter = typeInfo.setter(gl, type, unit, location, uniformInfo.size);
        } else if (typeInfo.arraySetter && isArray) setter = typeInfo.arraySetter(gl, location);
        else setter = typeInfo.setter(gl, location);
        setter.location = location;
        return setter;
    }
    const uniformSetters = {
    };
    const uniformTree = {
    };
    const numUniforms = gl.getProgramParameter(program, $df29a836a27602ed$var$ACTIVE_UNIFORMS);
    for(let ii = 0; ii < numUniforms; ++ii){
        const uniformInfo = gl.getActiveUniform(program, ii);
        if ($df29a836a27602ed$var$isBuiltIn(uniformInfo)) continue;
        let name = uniformInfo.name;
        // remove the array suffix.
        if (name.endsWith("[0]")) name = name.substr(0, name.length - 3);
        const location = gl.getUniformLocation(program, uniformInfo.name);
        // the uniform will have no location if it's in a uniform block
        if (location) {
            const setter = createUniformSetter(program, uniformInfo, location);
            uniformSetters[name] = setter;
            $df29a836a27602ed$var$addSetterToUniformTree(name, setter, uniformTree, uniformSetters);
        }
    }
    return uniformSetters;
}
/**
 * @typedef {Object} TransformFeedbackInfo
 * @property {number} index index of transform feedback
 * @property {number} type GL type
 * @property {number} size 1 - 4
 * @memberOf module:twgl
 */ /**
 * Create TransformFeedbackInfo for passing to bindTransformFeedbackInfo.
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
 * @param {WebGLProgram} program an existing WebGLProgram.
 * @return {Object<string, module:twgl.TransformFeedbackInfo>}
 * @memberOf module:twgl
 */ function $df29a836a27602ed$export$ca1b1131a9f3199c(gl, program) {
    const info = {
    };
    const numVaryings = gl.getProgramParameter(program, $df29a836a27602ed$var$TRANSFORM_FEEDBACK_VARYINGS);
    for(let ii = 0; ii < numVaryings; ++ii){
        const varying = gl.getTransformFeedbackVarying(program, ii);
        info[varying.name] = {
            index: ii,
            type: varying.type,
            size: varying.size
        };
    }
    return info;
}
/**
 * Binds buffers for transform feedback.
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
 * @param {(module:twgl.ProgramInfo|Object<string, module:twgl.TransformFeedbackInfo>)} transformFeedbackInfo A ProgramInfo or TransformFeedbackInfo.
 * @param {(module:twgl.BufferInfo|Object<string, module:twgl.AttribInfo>)} [bufferInfo] A BufferInfo or set of AttribInfos.
 * @memberOf module:twgl
 */ function $df29a836a27602ed$export$faea9f1eeaf6350d(gl, transformFeedbackInfo, bufferInfo) {
    if (transformFeedbackInfo.transformFeedbackInfo) transformFeedbackInfo = transformFeedbackInfo.transformFeedbackInfo;
    if (bufferInfo.attribs) bufferInfo = bufferInfo.attribs;
    for(const name in bufferInfo){
        const varying = transformFeedbackInfo[name];
        if (varying) {
            const buf = bufferInfo[name];
            if (buf.offset) gl.bindBufferRange($df29a836a27602ed$var$TRANSFORM_FEEDBACK_BUFFER, varying.index, buf.buffer, buf.offset, buf.size);
            else gl.bindBufferBase($df29a836a27602ed$var$TRANSFORM_FEEDBACK_BUFFER, varying.index, buf.buffer);
        }
    }
}
/**
 * Creates a transform feedback and sets the buffers
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
 * @param {module:twgl.ProgramInfo} programInfo A ProgramInfo as returned from {@link module:twgl.createProgramInfo}
 * @param {(module:twgl.BufferInfo|Object<string, module:twgl.AttribInfo>)} [bufferInfo] A BufferInfo or set of AttribInfos.
 * @return {WebGLTransformFeedback} the created transform feedback
 * @memberOf module:twgl
 */ function $df29a836a27602ed$export$8ec4a27c67088db2(gl, programInfo, bufferInfo) {
    const tf = gl.createTransformFeedback();
    gl.bindTransformFeedback($df29a836a27602ed$var$TRANSFORM_FEEDBACK, tf);
    gl.useProgram(programInfo.program);
    $df29a836a27602ed$export$faea9f1eeaf6350d(gl, programInfo, bufferInfo);
    gl.bindTransformFeedback($df29a836a27602ed$var$TRANSFORM_FEEDBACK, null);
    return tf;
}
/**
 * @typedef {Object} UniformData
 * @property {string} name The name of the uniform
 * @property {number} type The WebGL type enum for this uniform
 * @property {number} size The number of elements for this uniform
 * @property {number} blockNdx The block index this uniform appears in
 * @property {number} offset The byte offset in the block for this uniform's value
 * @memberOf module:twgl
 */ /**
 * The specification for one UniformBlockObject
 *
 * @typedef {Object} BlockSpec
 * @property {number} index The index of the block.
 * @property {number} size The size in bytes needed for the block
 * @property {number[]} uniformIndices The indices of the uniforms used by the block. These indices
 *    correspond to entries in a UniformData array in the {@link module:twgl.UniformBlockSpec}.
 * @property {bool} usedByVertexShader Self explanatory
 * @property {bool} usedByFragmentShader Self explanatory
 * @property {bool} used Self explanatory
 * @memberOf module:twgl
 */ /**
 * A `UniformBlockSpec` represents the data needed to create and bind
 * UniformBlockObjects for a given program
 *
 * @typedef {Object} UniformBlockSpec
 * @property {Object.<string, module:twgl.BlockSpec>} blockSpecs The BlockSpec for each block by block name
 * @property {UniformData[]} uniformData An array of data for each uniform by uniform index.
 * @memberOf module:twgl
 */ /**
 * Creates a UniformBlockSpec for the given program.
 *
 * A UniformBlockSpec represents the data needed to create and bind
 * UniformBlockObjects
 *
 * @param {WebGL2RenderingContext} gl A WebGL2 Rendering Context
 * @param {WebGLProgram} program A WebGLProgram for a successfully linked program
 * @return {module:twgl.UniformBlockSpec} The created UniformBlockSpec
 * @memberOf module:twgl/programs
 */ function $df29a836a27602ed$export$7b680ab060795ae5(gl, program) {
    const numUniforms = gl.getProgramParameter(program, $df29a836a27602ed$var$ACTIVE_UNIFORMS);
    const uniformData = [];
    const uniformIndices = [];
    for(let ii = 0; ii < numUniforms; ++ii){
        uniformIndices.push(ii);
        uniformData.push({
        });
        const uniformInfo = gl.getActiveUniform(program, ii);
        uniformData[ii].name = uniformInfo.name;
    }
    [
        [
            "UNIFORM_TYPE",
            "type"
        ],
        [
            "UNIFORM_SIZE",
            "size"
        ],
        [
            "UNIFORM_BLOCK_INDEX",
            "blockNdx"
        ],
        [
            "UNIFORM_OFFSET",
            "offset", 
        ], 
    ].forEach(function(pair) {
        const pname = pair[0];
        const key = pair[1];
        gl.getActiveUniforms(program, uniformIndices, gl[pname]).forEach(function(value, ndx) {
            uniformData[ndx][key] = value;
        });
    });
    const blockSpecs = {
    };
    const numUniformBlocks = gl.getProgramParameter(program, $df29a836a27602ed$var$ACTIVE_UNIFORM_BLOCKS);
    for(let ii2 = 0; ii2 < numUniformBlocks; ++ii2){
        const name = gl.getActiveUniformBlockName(program, ii2);
        const blockSpec = {
            index: gl.getUniformBlockIndex(program, name),
            usedByVertexShader: gl.getActiveUniformBlockParameter(program, ii2, $df29a836a27602ed$var$UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER),
            usedByFragmentShader: gl.getActiveUniformBlockParameter(program, ii2, $df29a836a27602ed$var$UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER),
            size: gl.getActiveUniformBlockParameter(program, ii2, $df29a836a27602ed$var$UNIFORM_BLOCK_DATA_SIZE),
            uniformIndices: gl.getActiveUniformBlockParameter(program, ii2, $df29a836a27602ed$var$UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES)
        };
        blockSpec.used = blockSpec.usedByVertexShader || blockSpec.usedByFragmentShader;
        blockSpecs[name] = blockSpec;
    }
    return {
        blockSpecs: blockSpecs,
        uniformData: uniformData
    };
}
const $df29a836a27602ed$var$arraySuffixRE = /\[\d+\]\.$/; // better way to check?
const $df29a836a27602ed$var$pad = (v, padding)=>((v + (padding - 1)) / padding | 0) * padding
;
function $df29a836a27602ed$var$createUniformBlockUniformSetter(view, isArray, rows, cols) {
    if (isArray || rows) {
        cols = cols || 1;
        const numElements = view.length;
        const totalRows = numElements / 4;
        return function(value) {
            let dst = 0;
            let src = 0;
            for(let row = 0; row < totalRows; ++row){
                for(let col = 0; col < cols; ++col)view[dst++] = value[src++];
                dst += 4 - cols;
            }
        };
    } else return function(value) {
        if (value.length) view.set(value);
        else view[0] = value;
    };
}
/**
 * Represents a UniformBlockObject including an ArrayBuffer with all the uniform values
 * and a corresponding WebGLBuffer to hold those values on the GPU
 *
 * @typedef {Object} UniformBlockInfo
 * @property {string} name The name of the block
 * @property {ArrayBuffer} array The array buffer that contains the uniform values
 * @property {Float32Array} asFloat A float view on the array buffer. This is useful
 *    inspecting the contents of the buffer in the debugger.
 * @property {WebGLBuffer} buffer A WebGL buffer that will hold a copy of the uniform values for rendering.
 * @property {number} [offset] offset into buffer
 * @property {Object<string, ArrayBufferView>} uniforms A uniform name to ArrayBufferView map.
 *   each Uniform has a correctly typed `ArrayBufferView` into array at the correct offset
 *   and length of that uniform. So for example a float uniform would have a 1 float `Float32Array`
 *   view. A single mat4 would have a 16 element `Float32Array` view. An ivec2 would have an
 *   `Int32Array` view, etc.
 * @property {Object<string, function>} setters A setter for this uniform.
 *   The reason to use setters is elements of arrays are padded to vec4 sizes which
 *   means if you want to set an array of 4 floats you'd need to set 16 values
 *   (or set elements 0, 4, 8, 12). In other words
 *   `someBlockInfo.uniforms.some4FloatArrayUniform.set([0, , , , 1, , , , 2, , , , 3])`
 *   where as the setter handles just passing in [0, 1, 2, 3] either directly as in
 *   `someBlockInfo.setter.some4FloatArrayUniform.set([0, 1, 2, 3])` (not recommended)
 *   or via {@link module:twgl.setBlockUniforms}
 * @memberOf module:twgl
 */ /**
 * Creates a `UniformBlockInfo` for the specified block
 *
 * Note: **If the blockName matches no existing blocks a warning is printed to the console and a dummy
 * `UniformBlockInfo` is returned**. This is because when debugging GLSL
 * it is common to comment out large portions of a shader or for example set
 * the final output to a constant. When that happens blocks get optimized out.
 * If this function did not create dummy blocks your code would crash when debugging.
 *
 * @param {WebGL2RenderingContext} gl A WebGL2RenderingContext
 * @param {WebGLProgram} program A WebGLProgram
 * @param {module:twgl.UniformBlockSpec} uniformBlockSpec. A UniformBlockSpec as returned
 *     from {@link module:twgl.createUniformBlockSpecFromProgram}.
 * @param {string} blockName The name of the block.
 * @return {module:twgl.UniformBlockInfo} The created UniformBlockInfo
 * @memberOf module:twgl/programs
 */ function $df29a836a27602ed$export$ba1b57ae67e32deb(gl, program, uniformBlockSpec, blockName) {
    const blockSpecs = uniformBlockSpec.blockSpecs;
    const uniformData = uniformBlockSpec.uniformData;
    const blockSpec = blockSpecs[blockName];
    if (!blockSpec) {
        $df29a836a27602ed$var$warn$1("no uniform block object named:", blockName);
        return {
            name: blockName,
            uniforms: {
            }
        };
    }
    const array = new ArrayBuffer(blockSpec.size);
    const buffer = gl.createBuffer();
    const uniformBufferIndex = blockSpec.index;
    gl.bindBuffer($df29a836a27602ed$var$UNIFORM_BUFFER, buffer);
    gl.uniformBlockBinding(program, blockSpec.index, uniformBufferIndex);
    let prefix = blockName + ".";
    if ($df29a836a27602ed$var$arraySuffixRE.test(prefix)) prefix = prefix.replace($df29a836a27602ed$var$arraySuffixRE, ".");
    const uniforms = {
    };
    const setters = {
    };
    const setterTree = {
    };
    blockSpec.uniformIndices.forEach(function(uniformNdx) {
        const data = uniformData[uniformNdx];
        let name = data.name;
        if (name.startsWith(prefix)) name = name.substr(prefix.length);
        const isArray = name.endsWith('[0]');
        if (isArray) name = name.substr(0, name.length - 3);
        const typeInfo = $df29a836a27602ed$var$typeMap[data.type];
        const Type = typeInfo.Type;
        const byteLength = isArray ? $df29a836a27602ed$var$pad(typeInfo.size, 16) * data.size : typeInfo.size * data.size;
        const uniformView = new Type(array, data.offset, byteLength / Type.BYTES_PER_ELEMENT);
        uniforms[name] = uniformView;
        // Note: I'm not sure what to do here. The original
        // idea was to create TypedArray views into each part
        // of the block. This is useful, for example if you have
        // a block with { mat4: model; mat4 view; mat4 projection; }
        // you'll get a Float32Array for each one suitable for
        // passing to most JS math libraries including twgl's and glMatrix.js.
        //
        // But, if you have a an array of structures, especially if that
        // array is large, you get a whole bunch of TypedArray views.
        // Every one of them has overhead and switching between them all
        // is probably a cache miss. In that case it would really be better
        // to just have one view (asFloat) and have all the setters
        // just reference the correct portion. But, then you can't easily
        // treat a matrix, or a vec4, as a standalone thing like you can
        // with all the views.
        //
        // Another problem with the views is they are not shared. With
        // uniforms you have one set of setters. With UniformBlockInfo
        // you have a set of setters *pre block instance*. That's because
        // TypedArray views can't be mapped to different buffers.
        //
        // My gut right now is if you really want the speed and compactness
        // then you should probably roll your own solution. TWGL's goal
        // here is ease of use as AFAICT there is no simple generic efficient
        // solution.
        const setter = $df29a836a27602ed$var$createUniformBlockUniformSetter(uniformView, isArray, typeInfo.rows, typeInfo.cols);
        setters[name] = setter;
        $df29a836a27602ed$var$addSetterToUniformTree(name, setter, setterTree, setters);
    });
    return {
        name: blockName,
        array: array,
        asFloat: new Float32Array(array),
        buffer: buffer,
        uniforms: uniforms,
        setters: setters
    };
}
/**
 * Creates a `UniformBlockInfo` for the specified block
 *
 * Note: **If the blockName matches no existing blocks a warning is printed to the console and a dummy
 * `UniformBlockInfo` is returned**. This is because when debugging GLSL
 * it is common to comment out large portions of a shader or for example set
 * the final output to a constant. When that happens blocks get optimized out.
 * If this function did not create dummy blocks your code would crash when debugging.
 *
 * @param {WebGL2RenderingContext} gl A WebGL2RenderingContext
 * @param {module:twgl.ProgramInfo} programInfo a `ProgramInfo`
 *     as returned from {@link module:twgl.createProgramInfo}
 * @param {string} blockName The name of the block.
 * @return {module:twgl.UniformBlockInfo} The created UniformBlockInfo
 * @memberOf module:twgl/programs
 */ function $df29a836a27602ed$export$721ed4ead8eefe0d(gl, programInfo, blockName) {
    return $df29a836a27602ed$export$ba1b57ae67e32deb(gl, programInfo.program, programInfo.uniformBlockSpec, blockName);
}
/**
 * Binds a uniform block to the matching uniform block point.
 * Matches by blocks by name so blocks must have the same name not just the same
 * structure.
 *
 * If you have changed any values and you upload the values into the corresponding WebGLBuffer
 * call {@link module:twgl.setUniformBlock} instead.
 *
 * @param {WebGL2RenderingContext} gl A WebGL 2 rendering context.
 * @param {(module:twgl.ProgramInfo|module:twgl.UniformBlockSpec)} programInfo a `ProgramInfo`
 *     as returned from {@link module:twgl.createProgramInfo} or or `UniformBlockSpec` as
 *     returned from {@link module:twgl.createUniformBlockSpecFromProgram}.
 * @param {module:twgl.UniformBlockInfo} uniformBlockInfo a `UniformBlockInfo` as returned from
 *     {@link module:twgl.createUniformBlockInfo}.
 * @return {bool} true if buffer was bound. If the programInfo has no block with the same block name
 *     no buffer is bound.
 * @memberOf module:twgl/programs
 */ function $df29a836a27602ed$export$6c9dd56f52711760(gl, programInfo, uniformBlockInfo) {
    const uniformBlockSpec = programInfo.uniformBlockSpec || programInfo;
    const blockSpec = uniformBlockSpec.blockSpecs[uniformBlockInfo.name];
    if (blockSpec) {
        const bufferBindIndex = blockSpec.index;
        gl.bindBufferRange($df29a836a27602ed$var$UNIFORM_BUFFER, bufferBindIndex, uniformBlockInfo.buffer, uniformBlockInfo.offset || 0, uniformBlockInfo.array.byteLength);
        return true;
    }
    return false;
}
/**
 * Uploads the current uniform values to the corresponding WebGLBuffer
 * and binds that buffer to the program's corresponding bind point for the uniform block object.
 *
 * If you haven't changed any values and you only need to bind the uniform block object
 * call {@link module:twgl.bindUniformBlock} instead.
 *
 * @param {WebGL2RenderingContext} gl A WebGL 2 rendering context.
 * @param {(module:twgl.ProgramInfo|module:twgl.UniformBlockSpec)} programInfo a `ProgramInfo`
 *     as returned from {@link module:twgl.createProgramInfo} or or `UniformBlockSpec` as
 *     returned from {@link module:twgl.createUniformBlockSpecFromProgram}.
 * @param {module:twgl.UniformBlockInfo} uniformBlockInfo a `UniformBlockInfo` as returned from
 *     {@link module:twgl.createUniformBlockInfo}.
 * @memberOf module:twgl/programs
 */ function $df29a836a27602ed$export$94b2522be353a874(gl, programInfo, uniformBlockInfo) {
    if ($df29a836a27602ed$export$6c9dd56f52711760(gl, programInfo, uniformBlockInfo)) gl.bufferData($df29a836a27602ed$var$UNIFORM_BUFFER, uniformBlockInfo.array, $df29a836a27602ed$var$DYNAMIC_DRAW);
}
/**
 * Sets values of a uniform block object
 *
 * @param {module:twgl.UniformBlockInfo} uniformBlockInfo A UniformBlockInfo as returned by {@link module:twgl.createUniformBlockInfo}.
 * @param {Object.<string, ?>} values A uniform name to value map where the value is correct for the given
 *    type of uniform. So for example given a block like
 *
 *       uniform SomeBlock {
 *         float someFloat;
 *         vec2 someVec2;
 *         vec3 someVec3Array[2];
 *         int someInt;
 *       }
 *
 *  You can set the values of the uniform block with
 *
 *       twgl.setBlockUniforms(someBlockInfo, {
 *          someFloat: 12.3,
 *          someVec2: [1, 2],
 *          someVec3Array: [1, 2, 3, 4, 5, 6],
 *          someInt: 5,
 *       }
 *
 *  Arrays can be JavaScript arrays or typed arrays
 *
 *  You can also fill out structure and array values either via
 *  shortcut. Example
 *
 *     // -- in shader --
 *     struct Light {
 *       float intensity;
 *       vec4 color;
 *     };
 *     uniform Lights {
 *       Light lights[2];
 *     };
 *
 *     // in JavaScript
 *
 *     twgl.setBlockUniforms(someBlockInfo, {
 *       lights: [
 *         { intensity: 5.0, color: [1, 0, 0, 1] },
 *         { intensity: 2.0, color: [0, 0, 1, 1] },
 *       ],
 *     });
 *
 *     // or the more traditional way
 *
 *     twgl.setBlockUniforms(someBlockInfo, {
 *       "lights[0].intensity": 5.0,
 *       "lights[0].color": [1, 0, 0, 1],
 *       "lights[1].intensity": 2.0,
 *       "lights[1].color": [0, 0, 1, 1],
 *     });
 *
 *   You can also specify partial paths
 *
 *     twgl.setBlockUniforms(someBlockInfo, {
 *       'lights[1]: { intensity: 5.0, color: [1, 0, 0, 1] },
 *     });
 *
 *   But you can not specify leaf array indices.
 *
 *  **IMPORTANT!**, packing in a UniformBlock is unintuitive.
 *  For example the actual layout of `someVec3Array` above in memory
 *  is `1, 2, 3, unused, 4, 5, 6, unused`. twgl takes in 6 values
 *  as shown about and copies them, skipping the padding. This might
 *  be confusing if you're already familiar with Uniform blocks.
 *
 *  If you want to deal with the padding yourself you can access the array
 *  buffer views directly. eg:
 *
 *      someBlockInfo.someVec3Array.set([1, 2, 3, 0, 4, 5, 6, 0]);
 *
 *  Any name that doesn't match will be ignored
 * @memberOf module:twgl/programs
 */ function $df29a836a27602ed$export$1710cbff6680b0a4(uniformBlockInfo, values) {
    const setters = uniformBlockInfo.setters;
    for(const name in values){
        const setter = setters[name];
        if (setter) {
            const value = values[name];
            setter(value);
        }
    }
}
function $df29a836a27602ed$var$setUniformTree(tree, values) {
    for(const name in values){
        const prop = tree[name];
        if (typeof prop === 'function') prop(values[name]);
        else $df29a836a27602ed$var$setUniformTree(tree[name], values[name]);
    }
}
/**
 * Set uniforms and binds related textures.
 *
 * example:
 *
 *     const programInfo = createProgramInfo(
 *         gl, ["some-vs", "some-fs"]);
 *
 *     const tex1 = gl.createTexture();
 *     const tex2 = gl.createTexture();
 *
 *     ... assume we setup the textures with data ...
 *
 *     const uniforms = {
 *       u_someSampler: tex1,
 *       u_someOtherSampler: tex2,
 *       u_someColor: [1,0,0,1],
 *       u_somePosition: [0,1,1],
 *       u_someMatrix: [
 *         1,0,0,0,
 *         0,1,0,0,
 *         0,0,1,0,
 *         0,0,0,0,
 *       ],
 *     };
 *
 *     gl.useProgram(program);
 *
 * This will automatically bind the textures AND set the
 * uniforms.
 *
 *     twgl.setUniforms(programInfo, uniforms);
 *
 * For the example above it is equivalent to
 *
 *     var texUnit = 0;
 *     gl.activeTexture(gl.TEXTURE0 + texUnit);
 *     gl.bindTexture(gl.TEXTURE_2D, tex1);
 *     gl.uniform1i(u_someSamplerLocation, texUnit++);
 *     gl.activeTexture(gl.TEXTURE0 + texUnit);
 *     gl.bindTexture(gl.TEXTURE_2D, tex2);
 *     gl.uniform1i(u_someSamplerLocation, texUnit++);
 *     gl.uniform4fv(u_someColorLocation, [1, 0, 0, 1]);
 *     gl.uniform3fv(u_somePositionLocation, [0, 1, 1]);
 *     gl.uniformMatrix4fv(u_someMatrix, false, [
 *         1,0,0,0,
 *         0,1,0,0,
 *         0,0,1,0,
 *         0,0,0,0,
 *       ]);
 *
 * Note it is perfectly reasonable to call `setUniforms` multiple times. For example
 *
 *     const uniforms = {
 *       u_someSampler: tex1,
 *       u_someOtherSampler: tex2,
 *     };
 *
 *     const moreUniforms {
 *       u_someColor: [1,0,0,1],
 *       u_somePosition: [0,1,1],
 *       u_someMatrix: [
 *         1,0,0,0,
 *         0,1,0,0,
 *         0,0,1,0,
 *         0,0,0,0,
 *       ],
 *     };
 *
 *     twgl.setUniforms(programInfo, uniforms);
 *     twgl.setUniforms(programInfo, moreUniforms);
 *
 * You can also add WebGLSamplers to uniform samplers as in
 *
 *     const uniforms = {
 *       u_someSampler: {
 *         texture: someWebGLTexture,
 *         sampler: someWebGLSampler,
 *       },
 *     };
 *
 * In which case both the sampler and texture will be bound to the
 * same unit.
 *
 * @param {(module:twgl.ProgramInfo|Object.<string, function>)} setters a `ProgramInfo` as returned from `createProgramInfo` or the setters returned from
 *        `createUniformSetters`.
 * @param {Object.<string, ?>} values an object with values for the
 *        uniforms.
 *   You can pass multiple objects by putting them in an array or by calling with more arguments.For example
 *
 *     const sharedUniforms = {
 *       u_fogNear: 10,
 *       u_projection: ...
 *       ...
 *     };
 *
 *     const localUniforms = {
 *       u_world: ...
 *       u_diffuseColor: ...
 *     };
 *
 *     twgl.setUniforms(programInfo, sharedUniforms, localUniforms);
 *
 *     // is the same as
 *
 *     twgl.setUniforms(programInfo, [sharedUniforms, localUniforms]);
 *
 *     // is the same as
 *
 *     twgl.setUniforms(programInfo, sharedUniforms);
 *     twgl.setUniforms(programInfo, localUniforms};
 *
 *   You can also fill out structure and array values either via
 *   shortcut. Example
 *
 *     // -- in shader --
 *     struct Light {
 *       float intensity;
 *       vec4 color;
 *     };
 *     uniform Light lights[2];
 *
 *     // in JavaScript
 *
 *     twgl.setUniforms(programInfo, {
 *       lights: [
 *         { intensity: 5.0, color: [1, 0, 0, 1] },
 *         { intensity: 2.0, color: [0, 0, 1, 1] },
 *       ],
 *     });
 *
 *   or the more traditional way
 *
 *     twgl.setUniforms(programInfo, {
 *       "lights[0].intensity": 5.0,
 *       "lights[0].color": [1, 0, 0, 1],
 *       "lights[1].intensity": 2.0,
 *       "lights[1].color": [0, 0, 1, 1],
 *     });
 *
 *   You can also specify partial paths
 *
 *     twgl.setUniforms(programInfo, {
 *       'lights[1]: { intensity: 5.0, color: [1, 0, 0, 1] },
 *     });
 *
 *   But you can not specify leaf array indices
 *
 * @memberOf module:twgl/programs
 */ function $df29a836a27602ed$export$1fa517b18dd66830(setters, ...args) {
    const actualSetters = setters.uniformSetters || setters;
    const numArgs = args.length;
    for(let aNdx = 0; aNdx < numArgs; ++aNdx){
        const values = args[aNdx];
        if (Array.isArray(values)) {
            const numValues = values.length;
            for(let ii = 0; ii < numValues; ++ii)$df29a836a27602ed$export$1fa517b18dd66830(actualSetters, values[ii]);
        } else for(const name in values){
            const setter = actualSetters[name];
            if (setter) setter(values[name]);
        }
    }
}
/**
 * Alias for `setUniforms`
 * @function
 * @param {(module:twgl.ProgramInfo|Object.<string, function>)} setters a `ProgramInfo` as returned from `createProgramInfo` or the setters returned from
 *        `createUniformSetters`.
 * @param {Object.<string, ?>} values an object with values for the
 * @memberOf module:twgl/programs
 */ const $df29a836a27602ed$export$bdaefe8ae431fe00 = $df29a836a27602ed$export$1fa517b18dd66830;
/**
 * Creates setter functions for all attributes of a shader
 * program. You can pass this to {@link module:twgl.setBuffersAndAttributes} to set all your buffers and attributes.
 *
 * @see {@link module:twgl.setAttributes} for example
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
 * @param {WebGLProgram} program the program to create setters for.
 * @return {Object.<string, function>} an object with a setter for each attribute by name.
 * @memberOf module:twgl/programs
 */ function $df29a836a27602ed$export$ca2da2c8098eca9b(gl, program) {
    const attribSetters = {
    };
    const numAttribs = gl.getProgramParameter(program, $df29a836a27602ed$var$ACTIVE_ATTRIBUTES);
    for(let ii = 0; ii < numAttribs; ++ii){
        const attribInfo = gl.getActiveAttrib(program, ii);
        if ($df29a836a27602ed$var$isBuiltIn(attribInfo)) continue;
        const index = gl.getAttribLocation(program, attribInfo.name);
        const typeInfo = $df29a836a27602ed$var$attrTypeMap[attribInfo.type];
        const setter = typeInfo.setter(gl, index, typeInfo);
        setter.location = index;
        attribSetters[attribInfo.name] = setter;
    }
    return attribSetters;
}
/**
 * Sets attributes and binds buffers (deprecated... use {@link module:twgl.setBuffersAndAttributes})
 *
 * Example:
 *
 *     const program = createProgramFromScripts(
 *         gl, ["some-vs", "some-fs");
 *
 *     const attribSetters = createAttributeSetters(program);
 *
 *     const positionBuffer = gl.createBuffer();
 *     const texcoordBuffer = gl.createBuffer();
 *
 *     const attribs = {
 *       a_position: {buffer: positionBuffer, numComponents: 3},
 *       a_texcoord: {buffer: texcoordBuffer, numComponents: 2},
 *     };
 *
 *     gl.useProgram(program);
 *
 * This will automatically bind the buffers AND set the
 * attributes.
 *
 *     setAttributes(attribSetters, attribs);
 *
 * Properties of attribs. For each attrib you can add
 * properties:
 *
 * *   type: the type of data in the buffer. Default = gl.FLOAT
 * *   normalize: whether or not to normalize the data. Default = false
 * *   stride: the stride. Default = 0
 * *   offset: offset into the buffer. Default = 0
 * *   divisor: the divisor for instances. Default = undefined
 *
 * For example if you had 3 value float positions, 2 value
 * float texcoord and 4 value uint8 colors you'd setup your
 * attribs like this
 *
 *     const attribs = {
 *       a_position: {buffer: positionBuffer, numComponents: 3},
 *       a_texcoord: {buffer: texcoordBuffer, numComponents: 2},
 *       a_color: {
 *         buffer: colorBuffer,
 *         numComponents: 4,
 *         type: gl.UNSIGNED_BYTE,
 *         normalize: true,
 *       },
 *     };
 *
 * @param {Object.<string, function>} setters Attribute setters as returned from createAttributeSetters
 * @param {Object.<string, module:twgl.AttribInfo>} buffers AttribInfos mapped by attribute name.
 * @memberOf module:twgl/programs
 * @deprecated use {@link module:twgl.setBuffersAndAttributes}
 */ function $df29a836a27602ed$export$74da2cba014bdc09(setters, buffers) {
    for(const name in buffers){
        const setter = setters[name];
        if (setter) setter(buffers[name]);
    }
}
/**
 * Sets attributes and buffers including the `ELEMENT_ARRAY_BUFFER` if appropriate
 *
 * Example:
 *
 *     const programInfo = createProgramInfo(
 *         gl, ["some-vs", "some-fs");
 *
 *     const arrays = {
 *       position: { numComponents: 3, data: [0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0], },
 *       texcoord: { numComponents: 2, data: [0, 0, 0, 1, 1, 0, 1, 1],                 },
 *     };
 *
 *     const bufferInfo = createBufferInfoFromArrays(gl, arrays);
 *
 *     gl.useProgram(programInfo.program);
 *
 * This will automatically bind the buffers AND set the
 * attributes.
 *
 *     setBuffersAndAttributes(gl, programInfo, bufferInfo);
 *
 * For the example above it is equivalent to
 *
 *     gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
 *     gl.enableVertexAttribArray(a_positionLocation);
 *     gl.vertexAttribPointer(a_positionLocation, 3, gl.FLOAT, false, 0, 0);
 *     gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
 *     gl.enableVertexAttribArray(a_texcoordLocation);
 *     gl.vertexAttribPointer(a_texcoordLocation, 4, gl.FLOAT, false, 0, 0);
 *
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext.
 * @param {(module:twgl.ProgramInfo|Object.<string, function>)} setters A `ProgramInfo` as returned from {@link module:twgl.createProgramInfo} or Attribute setters as returned from {@link module:twgl.createAttributeSetters}
 * @param {(module:twgl.BufferInfo|module:twgl.VertexArrayInfo)} buffers a `BufferInfo` as returned from {@link module:twgl.createBufferInfoFromArrays}.
 *   or a `VertexArrayInfo` as returned from {@link module:twgl.createVertexArrayInfo}
 * @memberOf module:twgl/programs
 */ function $df29a836a27602ed$export$186607e23079b9e5(gl, programInfo, buffers) {
    if (buffers.vertexArrayObject) gl.bindVertexArray(buffers.vertexArrayObject);
    else {
        $df29a836a27602ed$export$74da2cba014bdc09(programInfo.attribSetters || programInfo, buffers.attribs);
        if (buffers.indices) gl.bindBuffer($df29a836a27602ed$var$ELEMENT_ARRAY_BUFFER$1, buffers.indices);
    }
}
/**
 * @typedef {Object} ProgramInfo
 * @property {WebGLProgram} program A shader program
 * @property {Object<string, function>} uniformSetters object of setters as returned from createUniformSetters,
 * @property {Object<string, function>} attribSetters object of setters as returned from createAttribSetters,
 * @property {module:twgl.UniformBlockSpec} [uniformBlockSpec] a uniform block spec for making UniformBlockInfos with createUniformBlockInfo etc..
 * @property {Object<string, module:twgl.TransformFeedbackInfo>} [transformFeedbackInfo] info for transform feedbacks
 * @memberOf module:twgl
 */ /**
 * Creates a ProgramInfo from an existing program.
 *
 * A ProgramInfo contains
 *
 *     programInfo = {
 *        program: WebGLProgram,
 *        uniformSetters: object of setters as returned from createUniformSetters,
 *        attribSetters: object of setters as returned from createAttribSetters,
 *     }
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext
 *        to use.
 * @param {WebGLProgram} program an existing WebGLProgram.
 * @return {module:twgl.ProgramInfo} The created ProgramInfo.
 * @memberOf module:twgl/programs
 */ function $df29a836a27602ed$export$9d683a1d425bd0b2(gl, program) {
    const uniformSetters = $df29a836a27602ed$export$fe2460765a628597(gl, program);
    const attribSetters = $df29a836a27602ed$export$ca2da2c8098eca9b(gl, program);
    const programInfo = {
        program: program,
        uniformSetters: uniformSetters,
        attribSetters: attribSetters
    };
    if ($df29a836a27602ed$export$e3518b1ac7891039(gl)) {
        programInfo.uniformBlockSpec = $df29a836a27602ed$export$7b680ab060795ae5(gl, program);
        programInfo.transformFeedbackInfo = $df29a836a27602ed$export$ca1b1131a9f3199c(gl, program);
    }
    return programInfo;
}
/**
 * Creates a ProgramInfo from 2 sources.
 *
 * A ProgramInfo contains
 *
 *     programInfo = {
 *        program: WebGLProgram,
 *        uniformSetters: object of setters as returned from createUniformSetters,
 *        attribSetters: object of setters as returned from createAttribSetters,
 *     }
 *
 * NOTE: There are 4 signatures for this function
 *
 *     twgl.createProgramInfo(gl, [vs, fs], options);
 *     twgl.createProgramInfo(gl, [vs, fs], opt_errFunc);
 *     twgl.createProgramInfo(gl, [vs, fs], opt_attribs, opt_errFunc);
 *     twgl.createProgramInfo(gl, [vs, fs], opt_attribs, opt_locations, opt_errFunc);
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext
 *        to use.
 * @param {string[]} shaderSources Array of sources for the
 *        shaders or ids. The first is assumed to be the vertex shader,
 *        the second the fragment shader.
 * @param {module:twgl.ProgramOptions|string[]|module:twgl.ErrorCallback} [opt_attribs] Options for the program or an array of attribs names or an error callback. Locations will be assigned by index if not passed in
 * @param {number[]} [opt_locations|module:twgl.ErrorCallback] The locations for the. A parallel array to opt_attribs letting you assign locations or an error callback.
 * @param {module:twgl.ErrorCallback} [opt_errorCallback] callback for errors. By default it just prints an error to the console
 *        on error. If you want something else pass an callback. It's passed an error message.
 * @return {module:twgl.ProgramInfo?} The created ProgramInfo or null if it failed to link or compile
 * @memberOf module:twgl/programs
 */ function $df29a836a27602ed$export$2965a73560492a94(gl, shaderSources, opt_attribs, opt_locations, opt_errorCallback) {
    const progOptions = $df29a836a27602ed$var$getProgramOptions(opt_attribs, opt_locations, opt_errorCallback);
    let good = true;
    shaderSources = shaderSources.map(function(source) {
        // Lets assume if there is no \n it's an id
        if (source.indexOf("\n") < 0) {
            const script = $df29a836a27602ed$var$getElementById(source);
            if (!script) {
                progOptions.errorCallback("no element with id: " + source);
                good = false;
            } else source = script.text;
        }
        return source;
    });
    if (!good) return null;
    const program = $df29a836a27602ed$export$87c7c742dccfe3af(gl, shaderSources, progOptions);
    if (!program) return null;
    return $df29a836a27602ed$export$9d683a1d425bd0b2(gl, program);
}
var $df29a836a27602ed$export$7f4c6ae6cd2bdde3 = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    createAttributeSetters: $df29a836a27602ed$export$ca2da2c8098eca9b,
    createProgram: $df29a836a27602ed$export$327d24a04cd0dc17,
    createProgramFromScripts: $df29a836a27602ed$export$3699dca825c3297f,
    createProgramFromSources: $df29a836a27602ed$export$87c7c742dccfe3af,
    createProgramInfo: $df29a836a27602ed$export$2965a73560492a94,
    createProgramInfoFromProgram: $df29a836a27602ed$export$9d683a1d425bd0b2,
    createUniformSetters: $df29a836a27602ed$export$fe2460765a628597,
    createUniformBlockSpecFromProgram: $df29a836a27602ed$export$7b680ab060795ae5,
    createUniformBlockInfoFromProgram: $df29a836a27602ed$export$ba1b57ae67e32deb,
    createUniformBlockInfo: $df29a836a27602ed$export$721ed4ead8eefe0d,
    createTransformFeedback: $df29a836a27602ed$export$8ec4a27c67088db2,
    createTransformFeedbackInfo: $df29a836a27602ed$export$ca1b1131a9f3199c,
    bindTransformFeedbackInfo: $df29a836a27602ed$export$faea9f1eeaf6350d,
    setAttributes: $df29a836a27602ed$export$74da2cba014bdc09,
    setBuffersAndAttributes: $df29a836a27602ed$export$186607e23079b9e5,
    setUniforms: $df29a836a27602ed$export$1fa517b18dd66830,
    setUniformsAndBindTextures: $df29a836a27602ed$export$bdaefe8ae431fe00,
    setUniformBlock: $df29a836a27602ed$export$94b2522be353a874,
    setBlockUniforms: $df29a836a27602ed$export$1710cbff6680b0a4,
    bindUniformBlock: $df29a836a27602ed$export$6c9dd56f52711760
});
/*
 * Copyright 2019 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */ const $df29a836a27602ed$var$TRIANGLES = 4;
const $df29a836a27602ed$var$UNSIGNED_SHORT$3 = 5123;
/**
 * Drawing related functions
 *
 * For backward compatibility they are available at both `twgl.draw` and `twgl`
 * itself
 *
 * See {@link module:twgl} for core functions
 *
 * @module twgl/draw
 */ /**
 * Calls `gl.drawElements` or `gl.drawArrays`, whichever is appropriate
 *
 * normally you'd call `gl.drawElements` or `gl.drawArrays` yourself
 * but calling this means if you switch from indexed data to non-indexed
 * data you don't have to remember to update your draw call.
 *
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext
 * @param {(module:twgl.BufferInfo|module:twgl.VertexArrayInfo)} bufferInfo A BufferInfo as returned from {@link module:twgl.createBufferInfoFromArrays} or
 *   a VertexArrayInfo as returned from {@link module:twgl.createVertexArrayInfo}
 * @param {number} [type] eg (gl.TRIANGLES, gl.LINES, gl.POINTS, gl.TRIANGLE_STRIP, ...). Defaults to `gl.TRIANGLES`
 * @param {number} [count] An optional count. Defaults to bufferInfo.numElements
 * @param {number} [offset] An optional offset. Defaults to 0.
 * @param {number} [instanceCount] An optional instanceCount. if set then `drawArraysInstanced` or `drawElementsInstanced` will be called
 * @memberOf module:twgl/draw
 */ function $df29a836a27602ed$export$459017ad3380cbb9(gl, bufferInfo, type, count, offset, instanceCount) {
    type = type === undefined ? $df29a836a27602ed$var$TRIANGLES : type;
    const indices = bufferInfo.indices;
    const elementType = bufferInfo.elementType;
    const numElements = count === undefined ? bufferInfo.numElements : count;
    offset = offset === undefined ? 0 : offset;
    if (elementType || indices) {
        if (instanceCount !== undefined) gl.drawElementsInstanced(type, numElements, elementType === undefined ? $df29a836a27602ed$var$UNSIGNED_SHORT$3 : bufferInfo.elementType, offset, instanceCount);
        else gl.drawElements(type, numElements, elementType === undefined ? $df29a836a27602ed$var$UNSIGNED_SHORT$3 : bufferInfo.elementType, offset);
    } else if (instanceCount !== undefined) gl.drawArraysInstanced(type, offset, numElements, instanceCount);
    else gl.drawArrays(type, offset, numElements);
}
/**
 * A DrawObject is useful for putting objects in to an array and passing them to {@link module:twgl.drawObjectList}.
 *
 * You need either a `BufferInfo` or a `VertexArrayInfo`.
 *
 * @typedef {Object} DrawObject
 * @property {boolean} [active] whether or not to draw. Default = `true` (must be `false` to be not true). In other words `undefined` = `true`
 * @property {number} [type] type to draw eg. `gl.TRIANGLES`, `gl.LINES`, etc...
 * @property {module:twgl.ProgramInfo} programInfo A ProgramInfo as returned from {@link module:twgl.createProgramInfo}
 * @property {module:twgl.BufferInfo} [bufferInfo] A BufferInfo as returned from {@link module:twgl.createBufferInfoFromArrays}
 * @property {module:twgl.VertexArrayInfo} [vertexArrayInfo] A VertexArrayInfo as returned from {@link module:twgl.createVertexArrayInfo}
 * @property {Object<string, ?>} uniforms The values for the uniforms.
 *   You can pass multiple objects by putting them in an array. For example
 *
 *     var sharedUniforms = {
 *       u_fogNear: 10,
 *       u_projection: ...
 *       ...
 *     };
 *
 *     var localUniforms = {
 *       u_world: ...
 *       u_diffuseColor: ...
 *     };
 *
 *     var drawObj = {
 *       ...
 *       uniforms: [sharedUniforms, localUniforms],
 *     };
 *
 * @property {number} [offset] the offset to pass to `gl.drawArrays` or `gl.drawElements`. Defaults to 0.
 * @property {number} [count] the count to pass to `gl.drawArrays` or `gl.drawElements`. Defaults to bufferInfo.numElements.
 * @property {number} [instanceCount] the number of instances. Defaults to undefined.
 * @memberOf module:twgl
 */ /**
 * Draws a list of objects
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext
 * @param {DrawObject[]} objectsToDraw an array of objects to draw.
 * @memberOf module:twgl/draw
 */ function $df29a836a27602ed$export$f8c0340695b955d5(gl, objectsToDraw) {
    let lastUsedProgramInfo = null;
    let lastUsedBufferInfo = null;
    objectsToDraw.forEach(function(object) {
        if (object.active === false) return;
        const programInfo = object.programInfo;
        const bufferInfo = object.vertexArrayInfo || object.bufferInfo;
        let bindBuffers = false;
        const type = object.type === undefined ? $df29a836a27602ed$var$TRIANGLES : object.type;
        if (programInfo !== lastUsedProgramInfo) {
            lastUsedProgramInfo = programInfo;
            gl.useProgram(programInfo.program);
            // We have to rebind buffers when changing programs because we
            // only bind buffers the program uses. So if 2 programs use the same
            // bufferInfo but the 1st one uses only positions the when the
            // we switch to the 2nd one some of the attributes will not be on.
            bindBuffers = true;
        }
        // Setup all the needed attributes.
        if (bindBuffers || bufferInfo !== lastUsedBufferInfo) {
            if (lastUsedBufferInfo && lastUsedBufferInfo.vertexArrayObject && !bufferInfo.vertexArrayObject) gl.bindVertexArray(null);
            lastUsedBufferInfo = bufferInfo;
            $df29a836a27602ed$export$186607e23079b9e5(gl, programInfo, bufferInfo);
        }
        // Set the uniforms.
        $df29a836a27602ed$export$1fa517b18dd66830(programInfo, object.uniforms);
        // Draw
        $df29a836a27602ed$export$459017ad3380cbb9(gl, bufferInfo, type, object.count, object.offset, object.instanceCount);
    });
    if (lastUsedBufferInfo && lastUsedBufferInfo.vertexArrayObject) gl.bindVertexArray(null);
}
var $df29a836a27602ed$export$e529deb2bfd496dc = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    drawBufferInfo: $df29a836a27602ed$export$459017ad3380cbb9,
    drawObjectList: $df29a836a27602ed$export$f8c0340695b955d5
});
/*
 * Copyright 2019 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */ const $df29a836a27602ed$var$FRAMEBUFFER = 36160;
const $df29a836a27602ed$var$RENDERBUFFER = 36161;
const $df29a836a27602ed$var$TEXTURE_2D$2 = 3553;
const $df29a836a27602ed$var$UNSIGNED_BYTE$3 = 5121;
/* PixelFormat */ const $df29a836a27602ed$var$DEPTH_COMPONENT$1 = 6402;
const $df29a836a27602ed$var$RGBA$1 = 6408;
const $df29a836a27602ed$var$DEPTH_COMPONENT24$1 = 33190;
const $df29a836a27602ed$var$DEPTH_COMPONENT32F$1 = 36012;
const $df29a836a27602ed$var$DEPTH24_STENCIL8$1 = 35056;
const $df29a836a27602ed$var$DEPTH32F_STENCIL8$1 = 36013;
/* Framebuffer Object. */ const $df29a836a27602ed$var$RGBA4$1 = 32854;
const $df29a836a27602ed$var$RGB5_A1$1 = 32855;
const $df29a836a27602ed$var$RGB565$1 = 36194;
const $df29a836a27602ed$var$DEPTH_COMPONENT16$1 = 33189;
const $df29a836a27602ed$var$STENCIL_INDEX = 6401;
const $df29a836a27602ed$var$STENCIL_INDEX8 = 36168;
const $df29a836a27602ed$var$DEPTH_STENCIL$1 = 34041;
const $df29a836a27602ed$var$COLOR_ATTACHMENT0 = 36064;
const $df29a836a27602ed$var$DEPTH_ATTACHMENT = 36096;
const $df29a836a27602ed$var$STENCIL_ATTACHMENT = 36128;
const $df29a836a27602ed$var$DEPTH_STENCIL_ATTACHMENT = 33306;
/* TextureWrapMode */ const $df29a836a27602ed$var$CLAMP_TO_EDGE$1 = 33071;
/* TextureMagFilter */ const $df29a836a27602ed$var$LINEAR$1 = 9729;
/**
 * The options for a framebuffer attachment.
 *
 * Note: For a `format` that is a texture include all the texture
 * options from {@link module:twgl.TextureOptions} for example
 * `min`, `mag`, `clamp`, etc... Note that unlike {@link module:twgl.TextureOptions}
 * `auto` defaults to `false` for attachment textures but `min` and `mag` default
 * to `gl.LINEAR` and `wrap` defaults to `CLAMP_TO_EDGE`
 *
 * @typedef {Object} AttachmentOptions
 * @property {number} [attachmentPoint] The attachment point. Defaults
 *   to `gl.COLOR_ATTACHMENT0 + ndx` unless type is a depth or stencil type
 *   then it's gl.DEPTH_ATTACHMENT or `gl.DEPTH_STENCIL_ATTACHMENT` depending
 *   on the format or attachment type.
 * @property {number} [format] The format. If one of `gl.RGBA4`,
 *   `gl.RGB565`, `gl.RGB5_A1`, `gl.DEPTH_COMPONENT16`,
 *   `gl.STENCIL_INDEX8` or `gl.DEPTH_STENCIL` then will create a
 *   renderbuffer. Otherwise will create a texture. Default = `gl.RGBA`
 * @property {number} [type] The type. Used for texture. Default = `gl.UNSIGNED_BYTE`.
 * @property {number} [target] The texture target for `gl.framebufferTexture2D`.
 *   Defaults to `gl.TEXTURE_2D`. Set to appropriate face for cube maps.
 * @property {number} [level] level for `gl.framebufferTexture2D`. Defaults to 0.
 * @property {number} [layer] layer for `gl.framebufferTextureLayer`. Defaults to undefined.
 *   If set then `gl.framebufferTextureLayer` is called, if not then `gl.framebufferTexture2D`
 * @property {(WebGLRenderbuffer | WebGLTexture)} [attachment] An existing renderbuffer or texture.
 *    If provided will attach this Object. This allows you to share
 *    attachments across framebuffers.
 * @memberOf module:twgl
 * @mixes module:twgl.TextureOptions
 */ const $df29a836a27602ed$var$defaultAttachments = [
    {
        format: $df29a836a27602ed$var$RGBA$1,
        type: $df29a836a27602ed$var$UNSIGNED_BYTE$3,
        min: $df29a836a27602ed$var$LINEAR$1,
        wrap: $df29a836a27602ed$var$CLAMP_TO_EDGE$1
    },
    {
        format: $df29a836a27602ed$var$DEPTH_STENCIL$1
    }, 
];
const $df29a836a27602ed$var$attachmentsByFormat = {
};
$df29a836a27602ed$var$attachmentsByFormat[$df29a836a27602ed$var$DEPTH_STENCIL$1] = $df29a836a27602ed$var$DEPTH_STENCIL_ATTACHMENT;
$df29a836a27602ed$var$attachmentsByFormat[$df29a836a27602ed$var$STENCIL_INDEX] = $df29a836a27602ed$var$STENCIL_ATTACHMENT;
$df29a836a27602ed$var$attachmentsByFormat[$df29a836a27602ed$var$STENCIL_INDEX8] = $df29a836a27602ed$var$STENCIL_ATTACHMENT;
$df29a836a27602ed$var$attachmentsByFormat[$df29a836a27602ed$var$DEPTH_COMPONENT$1] = $df29a836a27602ed$var$DEPTH_ATTACHMENT;
$df29a836a27602ed$var$attachmentsByFormat[$df29a836a27602ed$var$DEPTH_COMPONENT16$1] = $df29a836a27602ed$var$DEPTH_ATTACHMENT;
$df29a836a27602ed$var$attachmentsByFormat[$df29a836a27602ed$var$DEPTH_COMPONENT24$1] = $df29a836a27602ed$var$DEPTH_ATTACHMENT;
$df29a836a27602ed$var$attachmentsByFormat[$df29a836a27602ed$var$DEPTH_COMPONENT32F$1] = $df29a836a27602ed$var$DEPTH_ATTACHMENT;
$df29a836a27602ed$var$attachmentsByFormat[$df29a836a27602ed$var$DEPTH24_STENCIL8$1] = $df29a836a27602ed$var$DEPTH_STENCIL_ATTACHMENT;
$df29a836a27602ed$var$attachmentsByFormat[$df29a836a27602ed$var$DEPTH32F_STENCIL8$1] = $df29a836a27602ed$var$DEPTH_STENCIL_ATTACHMENT;
function $df29a836a27602ed$var$getAttachmentPointForFormat(format, internalFormat) {
    return $df29a836a27602ed$var$attachmentsByFormat[format] || $df29a836a27602ed$var$attachmentsByFormat[internalFormat];
}
const $df29a836a27602ed$var$renderbufferFormats = {
};
$df29a836a27602ed$var$renderbufferFormats[$df29a836a27602ed$var$RGBA4$1] = true;
$df29a836a27602ed$var$renderbufferFormats[$df29a836a27602ed$var$RGB5_A1$1] = true;
$df29a836a27602ed$var$renderbufferFormats[$df29a836a27602ed$var$RGB565$1] = true;
$df29a836a27602ed$var$renderbufferFormats[$df29a836a27602ed$var$DEPTH_STENCIL$1] = true;
$df29a836a27602ed$var$renderbufferFormats[$df29a836a27602ed$var$DEPTH_COMPONENT16$1] = true;
$df29a836a27602ed$var$renderbufferFormats[$df29a836a27602ed$var$STENCIL_INDEX] = true;
$df29a836a27602ed$var$renderbufferFormats[$df29a836a27602ed$var$STENCIL_INDEX8] = true;
function $df29a836a27602ed$var$isRenderbufferFormat(format) {
    return $df29a836a27602ed$var$renderbufferFormats[format];
}
/**
 * @typedef {Object} FramebufferInfo
 * @property {WebGLFramebuffer} framebuffer The WebGLFramebuffer for this framebufferInfo
 * @property {Array.<(WebGLRenderbuffer | WebGLTexture)>} attachments The created attachments in the same order as passed in to {@link module:twgl.createFramebufferInfo}.
 * @property {number} width The width of the framebuffer and its attachments
 * @property {number} height The width of the framebuffer and its attachments
 * @memberOf module:twgl
 */ /**
 * Creates a framebuffer and attachments.
 *
 * This returns a {@link module:twgl.FramebufferInfo} because it needs to return the attachments as well as the framebuffer.
 *
 * The simplest usage
 *
 *     // create an RGBA/UNSIGNED_BYTE texture and DEPTH_STENCIL renderbuffer
 *     const fbi = twgl.createFramebufferInfo(gl);
 *
 * More complex usage
 *
 *     // create an RGB565 renderbuffer and a STENCIL_INDEX8 renderbuffer
 *     const attachments = [
 *       { format: RGB565, mag: NEAREST },
 *       { format: STENCIL_INDEX8 },
 *     ]
 *     const fbi = twgl.createFramebufferInfo(gl, attachments);
 *
 * Passing in a specific size
 *
 *     const width = 256;
 *     const height = 256;
 *     const fbi = twgl.createFramebufferInfo(gl, attachments, width, height);
 *
 * **Note!!** It is up to you to check if the framebuffer is renderable by calling `gl.checkFramebufferStatus`.
 * [WebGL1 only guarantees 3 combinations of attachments work](https://www.khronos.org/registry/webgl/specs/latest/1.0/#6.6).
 *
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {module:twgl.AttachmentOptions[]} [attachments] which attachments to create. If not provided the default is a framebuffer with an
 *    `RGBA`, `UNSIGNED_BYTE` texture `COLOR_ATTACHMENT0` and a `DEPTH_STENCIL` renderbuffer `DEPTH_STENCIL_ATTACHMENT`.
 * @param {number} [width] the width for the attachments. Default = size of drawingBuffer
 * @param {number} [height] the height for the attachments. Default = size of drawingBuffer
 * @return {module:twgl.FramebufferInfo} the framebuffer and attachments.
 * @memberOf module:twgl/framebuffers
 */ function $df29a836a27602ed$export$5203e5b1731cd791(gl, attachments, width, height) {
    const target = $df29a836a27602ed$var$FRAMEBUFFER;
    const fb = gl.createFramebuffer();
    gl.bindFramebuffer(target, fb);
    width = width || gl.drawingBufferWidth;
    height = height || gl.drawingBufferHeight;
    attachments = attachments || $df29a836a27602ed$var$defaultAttachments;
    let colorAttachmentCount = 0;
    const framebufferInfo = {
        framebuffer: fb,
        attachments: [],
        width: width,
        height: height
    };
    attachments.forEach(function(attachmentOptions) {
        let attachment = attachmentOptions.attachment;
        const format = attachmentOptions.format;
        let attachmentPoint = attachmentOptions.attachmentPoint || $df29a836a27602ed$var$getAttachmentPointForFormat(format, attachmentOptions.internalFormat);
        if (!attachmentPoint) attachmentPoint = $df29a836a27602ed$var$COLOR_ATTACHMENT0 + colorAttachmentCount++;
        if (!attachment) {
            if ($df29a836a27602ed$var$isRenderbufferFormat(format)) {
                attachment = gl.createRenderbuffer();
                gl.bindRenderbuffer($df29a836a27602ed$var$RENDERBUFFER, attachment);
                gl.renderbufferStorage($df29a836a27602ed$var$RENDERBUFFER, format, width, height);
            } else {
                const textureOptions = Object.assign({
                }, attachmentOptions);
                textureOptions.width = width;
                textureOptions.height = height;
                if (textureOptions.auto === undefined) {
                    textureOptions.auto = false;
                    textureOptions.min = textureOptions.min || textureOptions.minMag || $df29a836a27602ed$var$LINEAR$1;
                    textureOptions.mag = textureOptions.mag || textureOptions.minMag || $df29a836a27602ed$var$LINEAR$1;
                    textureOptions.wrapS = textureOptions.wrapS || textureOptions.wrap || $df29a836a27602ed$var$CLAMP_TO_EDGE$1;
                    textureOptions.wrapT = textureOptions.wrapT || textureOptions.wrap || $df29a836a27602ed$var$CLAMP_TO_EDGE$1;
                }
                attachment = $df29a836a27602ed$export$37b981a8c575f415(gl, textureOptions);
            }
        }
        if ($df29a836a27602ed$var$isRenderbuffer(gl, attachment)) gl.framebufferRenderbuffer(target, attachmentPoint, $df29a836a27602ed$var$RENDERBUFFER, attachment);
        else if ($df29a836a27602ed$var$isTexture(gl, attachment)) {
            if (attachmentOptions.layer !== undefined) gl.framebufferTextureLayer(target, attachmentPoint, attachment, attachmentOptions.level || 0, attachmentOptions.layer);
            else gl.framebufferTexture2D(target, attachmentPoint, attachmentOptions.target || $df29a836a27602ed$var$TEXTURE_2D$2, attachment, attachmentOptions.level || 0);
        } else throw new Error('unknown attachment type');
        framebufferInfo.attachments.push(attachment);
    });
    return framebufferInfo;
}
/**
 * Resizes the attachments of a framebuffer.
 *
 * You need to pass in the same `attachments` as you passed in {@link module:twgl.createFramebufferInfo}
 * because TWGL has no idea the format/type of each attachment.
 *
 * The simplest usage
 *
 *     // create an RGBA/UNSIGNED_BYTE texture and DEPTH_STENCIL renderbuffer
 *     const fbi = twgl.createFramebufferInfo(gl);
 *
 *     ...
 *
 *     function render() {
 *       if (twgl.resizeCanvasToDisplaySize(gl.canvas)) {
 *         // resize the attachments
 *         twgl.resizeFramebufferInfo(gl, fbi);
 *       }
 *
 * More complex usage
 *
 *     // create an RGB565 renderbuffer and a STENCIL_INDEX8 renderbuffer
 *     const attachments = [
 *       { format: RGB565, mag: NEAREST },
 *       { format: STENCIL_INDEX8 },
 *     ]
 *     const fbi = twgl.createFramebufferInfo(gl, attachments);
 *
 *     ...
 *
 *     function render() {
 *       if (twgl.resizeCanvasToDisplaySize(gl.canvas)) {
 *         // resize the attachments to match
 *         twgl.resizeFramebufferInfo(gl, fbi, attachments);
 *       }
 *
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {module:twgl.FramebufferInfo} framebufferInfo a framebufferInfo as returned from {@link module:twgl.createFramebufferInfo}.
 * @param {module:twgl.AttachmentOptions[]} [attachments] the same attachments options as passed to {@link module:twgl.createFramebufferInfo}.
 * @param {number} [width] the width for the attachments. Default = size of drawingBuffer
 * @param {number} [height] the height for the attachments. Default = size of drawingBuffer
 * @memberOf module:twgl/framebuffers
 */ function $df29a836a27602ed$export$b8e6d43e27659aba(gl, framebufferInfo, attachments, width, height) {
    width = width || gl.drawingBufferWidth;
    height = height || gl.drawingBufferHeight;
    framebufferInfo.width = width;
    framebufferInfo.height = height;
    attachments = attachments || $df29a836a27602ed$var$defaultAttachments;
    attachments.forEach(function(attachmentOptions, ndx) {
        const attachment = framebufferInfo.attachments[ndx];
        const format = attachmentOptions.format;
        if ($df29a836a27602ed$var$isRenderbuffer(gl, attachment)) {
            gl.bindRenderbuffer($df29a836a27602ed$var$RENDERBUFFER, attachment);
            gl.renderbufferStorage($df29a836a27602ed$var$RENDERBUFFER, format, width, height);
        } else if ($df29a836a27602ed$var$isTexture(gl, attachment)) $df29a836a27602ed$export$1d581f00cfe12937(gl, attachment, attachmentOptions, width, height);
        else throw new Error('unknown attachment type');
    });
}
/**
 * Binds a framebuffer
 *
 * This function pretty much solely exists because I spent hours
 * trying to figure out why something I wrote wasn't working only
 * to realize I forget to set the viewport dimensions.
 * My hope is this function will fix that.
 *
 * It is effectively the same as
 *
 *     gl.bindFramebuffer(gl.FRAMEBUFFER, someFramebufferInfo.framebuffer);
 *     gl.viewport(0, 0, someFramebufferInfo.width, someFramebufferInfo.height);
 *
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {module:twgl.FramebufferInfo|null} [framebufferInfo] a framebufferInfo as returned from {@link module:twgl.createFramebufferInfo}.
 *   If falsy will bind the canvas.
 * @param {number} [target] The target. If not passed `gl.FRAMEBUFFER` will be used.
 * @memberOf module:twgl/framebuffers
 */ function $df29a836a27602ed$export$3352f23a6b33f086(gl, framebufferInfo, target) {
    target = target || $df29a836a27602ed$var$FRAMEBUFFER;
    if (framebufferInfo) {
        gl.bindFramebuffer(target, framebufferInfo.framebuffer);
        gl.viewport(0, 0, framebufferInfo.width, framebufferInfo.height);
    } else {
        gl.bindFramebuffer(target, null);
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    }
}
var $df29a836a27602ed$export$25544aea78b18f9b = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    bindFramebufferInfo: $df29a836a27602ed$export$3352f23a6b33f086,
    createFramebufferInfo: $df29a836a27602ed$export$5203e5b1731cd791,
    resizeFramebufferInfo: $df29a836a27602ed$export$b8e6d43e27659aba
});
/*
 * Copyright 2019 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */ /**
 * vertex array object related functions
 *
 * You should generally not need to use these functions. They are provided
 * for those cases where you're doing something out of the ordinary
 * and you need lower level access.
 *
 * For backward compatibility they are available at both `twgl.attributes` and `twgl`
 * itself
 *
 * See {@link module:twgl} for core functions
 *
 * @module twgl/vertexArrays
 */ const $df29a836a27602ed$var$ELEMENT_ARRAY_BUFFER$2 = 34963;
/**
 * @typedef {Object} VertexArrayInfo
 * @property {number} numElements The number of elements to pass to `gl.drawArrays` or `gl.drawElements`.
 * @property {number} [elementType] The type of indices `UNSIGNED_BYTE`, `UNSIGNED_SHORT` etc..
 * @property {WebGLVertexArrayObject} [vertexArrayObject] a vertex array object
 * @memberOf module:twgl
 */ /**
 * Creates a VertexArrayInfo from a BufferInfo and one or more ProgramInfos
 *
 * This can be passed to {@link module:twgl.setBuffersAndAttributes} and to
 * {@link module:twgl:drawBufferInfo}.
 *
 * > **IMPORTANT:** Vertex Array Objects are **not** a direct analog for a BufferInfo. Vertex Array Objects
 *   assign buffers to specific attributes at creation time. That means they can only be used with programs
 *   who's attributes use the same attribute locations for the same purposes.
 *
 * > Bind your attribute locations by passing an array of attribute names to {@link module:twgl.createProgramInfo}
 *   or use WebGL 2's GLSL ES 3's `layout(location = <num>)` to make sure locations match.
 *
 * also
 *
 * > **IMPORTANT:** After calling twgl.setBuffersAndAttribute with a BufferInfo that uses a Vertex Array Object
 *   that Vertex Array Object will be bound. That means **ANY MANIPULATION OF ELEMENT_ARRAY_BUFFER or ATTRIBUTES**
 *   will affect the Vertex Array Object state.
 *
 * > Call `gl.bindVertexArray(null)` to get back manipulating the global attributes and ELEMENT_ARRAY_BUFFER.
 *
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext
 * @param {module:twgl.ProgramInfo|module:twgl.ProgramInfo[]} programInfo a programInfo or array of programInfos
 * @param {module:twgl.BufferInfo} bufferInfo BufferInfo as returned from createBufferInfoFromArrays etc...
 *
 *    You need to make sure every attribute that will be used is bound. So for example assume shader 1
 *    uses attributes A, B, C and shader 2 uses attributes A, B, D. If you only pass in the programInfo
 *    for shader 1 then only attributes A, B, and C will have their attributes set because TWGL doesn't
 *    now attribute D's location.
 *
 *    So, you can pass in both shader 1 and shader 2's programInfo
 *
 * @return {module:twgl.VertexArrayInfo} The created VertexArrayInfo
 *
 * @memberOf module:twgl/vertexArrays
 */ function $df29a836a27602ed$export$3a550f69329a008c(gl, programInfos, bufferInfo) {
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    if (!programInfos.length) programInfos = [
        programInfos
    ];
    programInfos.forEach(function(programInfo) {
        $df29a836a27602ed$export$186607e23079b9e5(gl, programInfo, bufferInfo);
    });
    gl.bindVertexArray(null);
    return {
        numElements: bufferInfo.numElements,
        elementType: bufferInfo.elementType,
        vertexArrayObject: vao
    };
}
/**
 * Creates a vertex array object and then sets the attributes on it
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
 * @param {Object.<string, function>} setters Attribute setters as returned from createAttributeSetters
 * @param {Object.<string, module:twgl.AttribInfo>} attribs AttribInfos mapped by attribute name.
 * @param {WebGLBuffer} [indices] an optional ELEMENT_ARRAY_BUFFER of indices
 * @memberOf module:twgl/vertexArrays
 */ function $df29a836a27602ed$export$60495ce92af393ea(gl, setters, attribs, indices) {
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    $df29a836a27602ed$export$74da2cba014bdc09(setters, attribs);
    if (indices) gl.bindBuffer($df29a836a27602ed$var$ELEMENT_ARRAY_BUFFER$2, indices);
    // We unbind this because otherwise any change to ELEMENT_ARRAY_BUFFER
    // like when creating buffers for other stuff will mess up this VAO's binding
    gl.bindVertexArray(null);
    return vao;
}
/**
 * Creates a vertex array object and then sets the attributes
 * on it
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext
 *        to use.
 * @param {Object.<string, function>| module:twgl.ProgramInfo} programInfo as returned from createProgramInfo or Attribute setters as returned from createAttributeSetters
 * @param {module:twgl.BufferInfo} bufferInfo BufferInfo as returned from createBufferInfoFromArrays etc...
 * @param {WebGLBuffer} [indices] an optional ELEMENT_ARRAY_BUFFER of indices
 * @memberOf module:twgl/vertexArrays
 */ function $df29a836a27602ed$export$69584a051cfb6414(gl, programInfo, bufferInfo) {
    return $df29a836a27602ed$export$60495ce92af393ea(gl, programInfo.attribSetters || programInfo, bufferInfo.attribs, bufferInfo.indices);
}
var $df29a836a27602ed$export$a4f7286ae77261a4 = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    createVertexArrayInfo: $df29a836a27602ed$export$3a550f69329a008c,
    createVAOAndSetAttributes: $df29a836a27602ed$export$60495ce92af393ea,
    createVAOFromBufferInfo: $df29a836a27602ed$export$69584a051cfb6414
});
/*
 * Copyright 2019 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */ const $df29a836a27602ed$var$defaults$2 = {
    addExtensionsToContext: true
};
/**
 * Various default settings for twgl.
 *
 * Note: You can call this any number of times. Example:
 *
 *     twgl.setDefaults({ textureColor: [1, 0, 0, 1] });
 *     twgl.setDefaults({ attribPrefix: 'a_' });
 *
 * is equivalent to
 *
 *     twgl.setDefaults({
 *       textureColor: [1, 0, 0, 1],
 *       attribPrefix: 'a_',
 *     });
 *
 * @typedef {Object} Defaults
 * @property {string} [attribPrefix] The prefix to stick on attributes
 *
 *   When writing shaders I prefer to name attributes with `a_`, uniforms with `u_` and varyings with `v_`
 *   as it makes it clear where they came from. But, when building geometry I prefer using un-prefixed names.
 *
 *   In other words I'll create arrays of geometry like this
 *
 *       const arrays = {
 *         position: ...
 *         normal: ...
 *         texcoord: ...
 *       };
 *
 *   But need those mapped to attributes and my attributes start with `a_`.
 *
 *   Default: `""`
 *
 * @property {number[]} [textureColor] Array of 4 values in the range 0 to 1
 *
 *   The default texture color is used when loading textures from
 *   urls. Because the URL will be loaded async we'd like to be
 *   able to use the texture immediately. By putting a 1x1 pixel
 *   color in the texture we can start using the texture before
 *   the URL has loaded.
 *
 *   Default: `[0.5, 0.75, 1, 1]`
 *
 * @property {string} [crossOrigin]
 *
 *   If not undefined sets the crossOrigin attribute on images
 *   that twgl creates when downloading images for textures.
 *
 *   Also see {@link module:twgl.TextureOptions}.
 *
 * @property {bool} [addExtensionsToContext]
 *
 *   If true, then, when twgl will try to add any supported WebGL extensions
 *   directly to the context under their normal GL names. For example
 *   if ANGLE_instances_arrays exists then twgl would enable it,
 *   add the functions `vertexAttribDivisor`, `drawArraysInstanced`,
 *   `drawElementsInstanced`, and the constant `VERTEX_ATTRIB_ARRAY_DIVISOR`
 *   to the `WebGLRenderingContext`.
 *
 * @memberOf module:twgl
 */ /**
 * Sets various defaults for twgl.
 *
 * In the interest of terseness which is kind of the point
 * of twgl I've integrated a few of the older functions here
 *
 * @param {module:twgl.Defaults} newDefaults The default settings.
 * @memberOf module:twgl
 */ function $df29a836a27602ed$export$2e2366488d12e20d(newDefaults) {
    $df29a836a27602ed$var$copyExistingProperties(newDefaults, $df29a836a27602ed$var$defaults$2);
    $df29a836a27602ed$export$81400a733c5c400b(newDefaults); // eslint-disable-line
    $df29a836a27602ed$export$13a00e79c3b46a21(newDefaults); // eslint-disable-line
}
const $df29a836a27602ed$var$prefixRE = /^(.*?)_/;
function $df29a836a27602ed$var$addExtensionToContext(gl, extensionName) {
    $df29a836a27602ed$export$e97753eae63e4e62(gl, 0);
    const ext = gl.getExtension(extensionName);
    if (ext) {
        const enums = {
        };
        const fnSuffix = $df29a836a27602ed$var$prefixRE.exec(extensionName)[1];
        const enumSuffix = '_' + fnSuffix;
        for(const key in ext){
            const value = ext[key];
            const isFunc = typeof value === 'function';
            const suffix = isFunc ? fnSuffix : enumSuffix;
            let name = key;
            // examples of where this is not true are WEBGL_compressed_texture_s3tc
            // and WEBGL_compressed_texture_pvrtc
            if (key.endsWith(suffix)) name = key.substring(0, key.length - suffix.length);
            if (gl[name] !== undefined) {
                if (!isFunc && gl[name] !== value) $df29a836a27602ed$var$warn(name, gl[name], value, key);
            } else if (isFunc) gl[name] = (function(origFn) {
                return function() {
                    return origFn.apply(ext, arguments);
                };
            })(value);
            else {
                gl[name] = value;
                enums[name] = value;
            }
        }
        // pass the modified enums to glEnumToString
        enums.constructor = {
            name: ext.constructor.name
        };
        $df29a836a27602ed$export$e97753eae63e4e62(enums, 0);
    }
    return ext;
}
/*
 * If you're wondering why the code doesn't just iterate
 * over all extensions using `gl.getExtensions` is that it's possible
 * some future extension is incompatible with this code. Rather than
 * have thing suddenly break it seems better to manually add to this
 * list.
 *
 */ const $df29a836a27602ed$var$supportedExtensions = [
    'ANGLE_instanced_arrays',
    'EXT_blend_minmax',
    'EXT_color_buffer_float',
    'EXT_color_buffer_half_float',
    'EXT_disjoint_timer_query',
    'EXT_disjoint_timer_query_webgl2',
    'EXT_frag_depth',
    'EXT_sRGB',
    'EXT_shader_texture_lod',
    'EXT_texture_filter_anisotropic',
    'OES_element_index_uint',
    'OES_standard_derivatives',
    'OES_texture_float',
    'OES_texture_float_linear',
    'OES_texture_half_float',
    'OES_texture_half_float_linear',
    'OES_vertex_array_object',
    'WEBGL_color_buffer_float',
    'WEBGL_compressed_texture_atc',
    'WEBGL_compressed_texture_etc1',
    'WEBGL_compressed_texture_pvrtc',
    'WEBGL_compressed_texture_s3tc',
    'WEBGL_compressed_texture_s3tc_srgb',
    'WEBGL_depth_texture',
    'WEBGL_draw_buffers', 
];
/**
 * Attempts to enable all of the following extensions
 * and add their functions and constants to the
 * `WebGLRenderingContext` using their normal non-extension like names.
 *
 *      ANGLE_instanced_arrays
 *      EXT_blend_minmax
 *      EXT_color_buffer_float
 *      EXT_color_buffer_half_float
 *      EXT_disjoint_timer_query
 *      EXT_disjoint_timer_query_webgl2
 *      EXT_frag_depth
 *      EXT_sRGB
 *      EXT_shader_texture_lod
 *      EXT_texture_filter_anisotropic
 *      OES_element_index_uint
 *      OES_standard_derivatives
 *      OES_texture_float
 *      OES_texture_float_linear
 *      OES_texture_half_float
 *      OES_texture_half_float_linear
 *      OES_vertex_array_object
 *      WEBGL_color_buffer_float
 *      WEBGL_compressed_texture_atc
 *      WEBGL_compressed_texture_etc1
 *      WEBGL_compressed_texture_pvrtc
 *      WEBGL_compressed_texture_s3tc
 *      WEBGL_compressed_texture_s3tc_srgb
 *      WEBGL_depth_texture
 *      WEBGL_draw_buffers
 *
 * For example if `ANGLE_instanced_arrays` exists then the functions
 * `drawArraysInstanced`, `drawElementsInstanced`, `vertexAttribDivisor`
 * and the constant `VERTEX_ATTRIB_ARRAY_DIVISOR` are added to the
 * `WebGLRenderingContext`.
 *
 * Note that if you want to know if the extension exists you should
 * probably call `gl.getExtension` for each extension. Alternatively
 * you can check for the existence of the functions or constants that
 * are expected to be added. For example
 *
 *    if (gl.drawBuffers) {
 *      // Either WEBGL_draw_buffers was enabled OR you're running in WebGL2
 *      ....
 *
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext
 * @memberOf module:twgl
 */ function $df29a836a27602ed$export$ef86202f9bca6ee5(gl) {
    for(let ii = 0; ii < $df29a836a27602ed$var$supportedExtensions.length; ++ii)$df29a836a27602ed$var$addExtensionToContext(gl, $df29a836a27602ed$var$supportedExtensions[ii]);
}
/**
 * Creates a webgl context.
 * @param {HTMLCanvasElement} canvas The canvas tag to get
 *     context from. If one is not passed in one will be
 *     created.
 * @return {WebGLRenderingContext} The created context.
 * @private
 */ function $df29a836a27602ed$var$create3DContext(canvas, opt_attribs) {
    const names = [
        "webgl",
        "experimental-webgl"
    ];
    let context = null;
    for(let ii = 0; ii < names.length; ++ii){
        context = canvas.getContext(names[ii], opt_attribs);
        if (context) {
            if ($df29a836a27602ed$var$defaults$2.addExtensionsToContext) $df29a836a27602ed$export$ef86202f9bca6ee5(context);
            break;
        }
    }
    return context;
}
/**
 * Gets a WebGL1 context.
 *
 * Note: Will attempt to enable Vertex Array Objects
 * and add WebGL2 entry points. (unless you first set defaults with
 * `twgl.setDefaults({enableVertexArrayObjects: false})`;
 *
 * @param {HTMLCanvasElement} canvas a canvas element.
 * @param {WebGLContextAttributes} [opt_attribs] optional webgl context creation attributes
 * @return {WebGLRenderingContext} The created context.
 * @memberOf module:twgl
 */ function $df29a836a27602ed$export$c7a808a518b9a146(canvas, opt_attribs) {
    const gl = $df29a836a27602ed$var$create3DContext(canvas, opt_attribs);
    return gl;
}
/**
 * Creates a webgl context.
 *
 * Will return a WebGL2 context if possible.
 *
 * You can check if it's WebGL2 with
 *
 *     twgl.isWebGL2(gl);
 *
 * @param {HTMLCanvasElement} canvas The canvas tag to get
 *     context from. If one is not passed in one will be
 *     created.
 * @return {WebGLRenderingContext} The created context.
 */ function $df29a836a27602ed$var$createContext(canvas, opt_attribs) {
    const names = [
        "webgl2",
        "webgl",
        "experimental-webgl"
    ];
    let context = null;
    for(let ii = 0; ii < names.length; ++ii){
        context = canvas.getContext(names[ii], opt_attribs);
        if (context) {
            if ($df29a836a27602ed$var$defaults$2.addExtensionsToContext) $df29a836a27602ed$export$ef86202f9bca6ee5(context);
            break;
        }
    }
    return context;
}
/**
 * Gets a WebGL context.  Will create a WebGL2 context if possible.
 *
 * You can check if it's WebGL2 with
 *
 *    function isWebGL2(gl) {
 *      return gl.getParameter(gl.VERSION).indexOf("WebGL 2.0 ") == 0;
 *    }
 *
 * Note: For a WebGL1 context will attempt to enable Vertex Array Objects
 * and add WebGL2 entry points. (unless you first set defaults with
 * `twgl.setDefaults({enableVertexArrayObjects: false})`;
 *
 * @param {HTMLCanvasElement} canvas a canvas element.
 * @param {WebGLContextAttributes} [opt_attribs] optional webgl context creation attributes
 * @return {WebGLRenderingContext} The created context.
 * @memberOf module:twgl
 */ function $df29a836a27602ed$export$31553aaa555c1514(canvas, opt_attribs) {
    const gl = $df29a836a27602ed$var$createContext(canvas, opt_attribs);
    return gl;
}
/**
 * Resize a canvas to match the size it's displayed.
 * @param {HTMLCanvasElement} canvas The canvas to resize.
 * @param {number} [multiplier] So you can pass in `window.devicePixelRatio` or other scale value if you want to.
 * @return {boolean} true if the canvas was resized.
 * @memberOf module:twgl
 */ function $df29a836a27602ed$export$4d986a341d0b1b6c(canvas, multiplier) {
    multiplier = multiplier || 1;
    multiplier = Math.max(0, multiplier);
    const width = canvas.clientWidth * multiplier | 0;
    const height = canvas.clientHeight * multiplier | 0;
    if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        return true;
    }
    return false;
}


const $bf55f486dfce0e5f$var$ALL_POTENTIAL_ATTRIBUTES = $da57cf3d530b431d$export$cb28509c217600d2.SUPPORTED_CHANNEL_ATTRIBUTES.map((attr)=>`a_${attr}`
).concat("a_VertexPosition");
class $bf55f486dfce0e5f$var$WebGLCanvasDrawer extends $b3ee822286cbd4a9$export$2e2bcd8739ae039 {
    /**
   * Called whenever a frame has been successfully animated.
   */ tick() {
    }
    /**
   * Calculates the viewport for this.gl.viewport to control zooming. Also calculates point size.
   * @returns Array of 5 elements, first 4 are viewport parameters, last is pointSizeMultiplier:
   *   [xOffset, yOffset, displayAsIfThisWide, displayAsIfThisHigh, pointSizeMultiplier]
   */ getWebGLViewport() {
        // Calculate appropriate webgl viewport given current selection window
        // Transform current data coordinates to GPU cordinates
        const scaleXWindowSpace = $bCvgp.scale([
            this.minX,
            this.maxX
        ], [
            -1,
            1
        ]);
        const scaleYWindowSpace = $bCvgp.scale([
            this.minY,
            this.maxY
        ], [
            -1,
            1
        ]);
        // Multiply point size by the ratio of max dimension and current width
        const pointSize = Math.max(1.75, Math.min(1 / (scaleXWindowSpace(this.currentXRange[1]) - scaleXWindowSpace(this.currentXRange[0])), 1 / (scaleYWindowSpace(this.currentYRange[1]) - scaleYWindowSpace(this.currentYRange[0]))));
        // Return [x1, y1, x2, y2] and pointsize, camera corners coordinates in GPU space
        // Which becomes uniform in vertex shader
        return [
            scaleXWindowSpace(this.currentXRange[0]),
            scaleYWindowSpace(this.currentYRange[0]),
            scaleXWindowSpace(this.currentXRange[1]),
            scaleYWindowSpace(this.currentYRange[1]),
            pointSize, 
        ];
    }
    /**
   * Sets the specification and begins the process of drawing it.
   *  1. Cancels any current animation
   *  2. Builds shaders for the tracks
   *  3. After data is loaded, calls populateBuffers.
   *
   * @param {Object} specification of visualization
   */ setSpecification(specification) {
        super.render(); // Cancels current animation frame
        // Populate buffers needs a trackShader built to know what buffers to fill
        this.trackShaders = $da57cf3d530b431d$export$cb28509c217600d2.fromSpecification(specification);
        new $js2wE.default(specification, this.populateBuffers.bind(this));
    }
    /**
   * Populate the buffers that are fed to webgl for drawing.
   *
   * @param {SpecificationProcessor} specificationHelper created in the setSpecification method
   */ populateBuffers(specificationHelper) {
        let currentTrack = specificationHelper.getNextTrack();
        let currentTrackShaderIndex = 0;
        this.semanticZoomer = new $84ac2ef2a1b629f5$export$2e2bcd8739ae039(specificationHelper);
        while(currentTrack){
            // Construct calculator in track loop as calculator keeps internal state for each track
            let vertexCalculator = new $jk5q7.default(specificationHelper.xScale, specificationHelper.yScale, currentTrack.track // Access actual track specification
            );
            let currentMark = currentTrack.getNextMark();
            while(currentMark){
                // A lot of the heavy lifting occurs in the track shaders, this class is mostly boilerplate for webgl
                this.trackShaders[currentTrackShaderIndex].addMarkToBuffers(currentMark, vertexCalculator);
                currentMark = currentTrack.getNextMark();
            }
            currentTrack = specificationHelper.getNextTrack();
            currentTrackShaderIndex++;
        }
        this.render();
    }
    /**
   * Animates the frames by setting viewport, uniforms, blending, clearing, and calling webgl draw.
   */ animate() {
        if (!this.needsAnimation) {
            // Prevent pointless animation if canvas does not change
            this.lastFrame = requestAnimationFrame(this.animate.bind(this));
            this.tick();
            return;
        }
        const viewport = this.getWebGLViewport();
        this.globalUniforms.viewport = new Float32Array(viewport.slice(0, 4));
        this.globalUniforms.pointSizeModifier = viewport[4];
        // Clear the canvas before we start drawing on it.
        this.gl.clearColor(1, 1, 1, 1);
        // Set the blending function
        // Blend functions are weird, play with them:
        // https://mrdoob.github.io/webgl-blendfunctions/blendfunc.html
        // http://www.andersriggelsen.dk/glblendfunc.php
        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        // For each track shader, use their shader program then draw it
        this.trackShaders.forEach((trackShader, index)=>{
            this.gl.useProgram(this.programInfos[index].program);
            $df29a836a27602ed$export$1fa517b18dd66830(this.programInfos[index], {
                ...this.globalUniforms,
                ...trackShader.uniforms
            });
            $df29a836a27602ed$export$186607e23079b9e5(this.gl, this.programInfos[index], this.vertexArrayInfos[index]);
            $df29a836a27602ed$export$459017ad3380cbb9(this.gl, this.vertexArrayInfos[index], this.gl[this.semanticZoomer.getRecommendedDrawingMode(trackShader, this.currentXRange, this.currentYRange)], trackShader.attributes.a_VertexPosition.data.length / 2);
        });
        this.needsAnimation = false;
        this.lastFrame = requestAnimationFrame(this.animate.bind(this));
        this.tick();
    }
    /**
   * Prepares animation by compiling shaders, setting uniforms, constructing buffers,
   * and handling additional boilerplate.
   */ render() {
        super.render();
        this.programInfos = this.trackShaders.map((trackShader)=>$df29a836a27602ed$export$2965a73560492a94(this.gl, [
                trackShader.buildShader(),
                $da57cf3d530b431d$export$87739b796d5a055c
            ], $bf55f486dfce0e5f$var$ALL_POTENTIAL_ATTRIBUTES)
        );
        this.globalUniforms = {
            viewport: new Float32Array([
                -1,
                -1,
                1,
                1
            ]),
            pointSizeModifier: 1
        };
        this.vertexArrayInfos = this.trackShaders.map((trackShader)=>$df29a836a27602ed$export$3a550f69329a008c(this.gl, this.programInfos, $df29a836a27602ed$export$140f5b0225138840(this.gl, trackShader.attributes))
        );
        this.needsAnimation = true;
        this.animate();
    }
    constructor(viewportData){
        super(viewportData);
        this.gl = this.canvas.getContext("webgl2", {
            // Setting these to false makes webgl handle more like opengl
            // Source: https://webglfundamentals.org/webgl/lessons/webgl-and-alpha.html
            alpha: false,
            premultipliedAlpha: false
        });
        if (!this.gl) {
            console.error("Unable to initialize WebGL!");
            return;
        }
    }
}
var $bf55f486dfce0e5f$export$2e2bcd8739ae039 = $bf55f486dfce0e5f$var$WebGLCanvasDrawer;


class $4b38ca3075b6652b$var$OffscreenWebGLDrawer extends $bf55f486dfce0e5f$export$2e2bcd8739ae039 {
    tick() {
        postMessage({
            type: "tick"
        });
    }
}
self.onmessage = (message)=>{
    switch(message.data.type){
        case "init":
            self.drawer = message.data.displayFPSMeter ? new $4b38ca3075b6652b$var$OffscreenWebGLDrawer(message.data) : new $bf55f486dfce0e5f$export$2e2bcd8739ae039(message.data);
            break;
        case "viewport":
            self.drawer.receiveViewport(message.data);
            break;
        case "render":
            self.drawer.receiveViewport(message.data);
            self.drawer.render();
            break;
        case "specification":
            self.drawer.setSpecification(message.data.specification);
            break;
        case "clearBuffers":
            self.drawer.clearBuffers();
            break;
        case "resize":
            self.drawer.canvas.width = message.data.width;
            self.drawer.canvas.height = message.data.height;
            self.drawer.gl.viewport(0, 0, message.data.width, message.data.height);
            break;
        default:
            console.error(`Received unknown message type: ${message.type}`);
    }
};

})();
//# sourceMappingURL=offscreen-webgl-worker.70aaa77b.js.map
