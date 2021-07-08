(function () {
  importScripts("./offscreen-webgl-worker.756994ba.js");
  var $parcel$global = typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : {};
  var parcelRequire = $parcel$global.parcelRequire3582;
  var $647b390bbe26a1e6bbc6a8c9e19f41d2$init = parcelRequire("33BxP");
  var $794bbb298c1fc0cc3157526701549b8c$init = parcelRequire("3GSGc");
  var $6d3e717fed031fdb2ee2c357e03764b6$init = parcelRequire("3k8Hq");
  class $d125d48a203687d140152f108c7101d5$export$default {
    /**
    * An interface for drawing on a canvas.
    *
    * @param {Object} drawingData object containing keys for {@link Drawer#receiveViewport}
    *  and canvas key used for drawing.
    */
    constructor(drawingData) {
      this.canvas = drawingData.canvas;
      this.width = this.canvas.width;
      this.height = this.canvas.height;
      this.receiveViewport(drawingData);
    }
    /**
    * Method to set the viewport for the drawer.
    *
    * @param {Object} viewportData object containing minX,maxX,minY,maxY,xRange,yRange viewport data for drawer
    */
    receiveViewport(viewportData) {
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
    */
    tick() {}
    /**
    * Method to implement animating a frame.
    */
    animate() {}
    /**
    * Method to implement preprocessing for rendering frames.
    */
    render() {
      if (this.lastFrame) {
        // Avoid overlapping animation requests
        cancelAnimationFrame(this.lastFrame);
      }
    }
  }
  $647b390bbe26a1e6bbc6a8c9e19f41d2$init();
  $794bbb298c1fc0cc3157526701549b8c$init();
  $6d3e717fed031fdb2ee2c357e03764b6$init();
  $647b390bbe26a1e6bbc6a8c9e19f41d2$init();
  $794bbb298c1fc0cc3157526701549b8c$init();
  /**
  * A vertex shader meant to take in positions and colors.
  */
  const $5aa01963e4773c466fc995fbb6f57ffb$var$baseVertexShader = `
  precision highp float;

  attribute vec2 aVertexPosition;

  uniform float pointSizeModifier;
  // [x1, y1,x2, y2] of viewing window
  uniform vec4 viewport;

  varying vec4 vColor;
`;
  const $5aa01963e4773c466fc995fbb6f57ffb$var$vertexShaderSuffix = `
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
       (aVertexPosition.x - (viewport.z + viewport.x)/2.0) * 2.0/(viewport.z - viewport.x),
       (aVertexPosition.y - (viewport.w + viewport.y)/2.0) * 2.0/(viewport.w - viewport.y),
        0,
        1
    );
    vec3 unpackedValues = unpackColor(color);

    vColor = vec4(
      unpackedValues.rgb,
      opacity
    );
    gl_PointSize = size * pointSizeModifier;
  }
`;
  /**
  * A fragment shader which chooses color simply passed to by vertex shader.
  */
  const $5aa01963e4773c466fc995fbb6f57ffb$export$varyingColorsFragmentShader = `
  varying mediump vec4 vColor;

  void main(void) {
    gl_FragColor = vColor;
  }
`;
  class $5aa01963e4773c466fc995fbb6f57ffb$export$VertexShader {
    constructor() {
      this.shader = $5aa01963e4773c466fc995fbb6f57ffb$var$baseVertexShader;
      this.uniforms = {};
      // Add position buffers here since x and y channels don't map nicely to shader code
      this.attributes = {
        aVertexPosition: {
          numComponents: 2,
          data: []
        }
      };
    }
    addMarkToBuffers(mark, vertexCalculator) {
      const vertices = vertexCalculator.calculateForMark(mark);
      this.attributes.aVertexPosition.data.push(...vertices);
      for (const channel of Object.keys(this.attributes)) {
        if (channel === "aVertexPosition") {
          continue;
        }
        for (let i = 0; i < vertices.length / 2; i++) {
          this.attributes[channel].data.push(mark[channel]);
        }
      }
      this.lastMark = mark;
    }
    setDrawMode(drawMode) {
      this.drawMode = drawMode;
    }
    addChannelBuffer(channel, numComponents = 1) {
      this.attributes[channel] = {
        numComponents,
        data: []
      };
      this.shader += `attribute float ${channel};\n`;
    }
    setChannelUniform(channel, uniform) {
      this.uniforms[channel] = uniform;
      this.shader += `uniform float ${channel};\n`;
      return this;
    }
    buildShader() {
      // Assumes color, opacity, size channels have been used in
      // addChannelBuffer or addChannelUniform
      if (this.built) {
        return this.shader;
      }
      this.shader += $5aa01963e4773c466fc995fbb6f57ffb$var$vertexShaderSuffix;
      this.built = true;
      return this.shader;
    }
    static fromSchema(schema) {
      // Returns one per track
      return schema.tracks.map($5aa01963e4773c466fc995fbb6f57ffb$export$VertexShader.fromTrack);
    }
    static fromTrack(track) {
      // Given a track produce attributes and uniforms that describe a webgl drawing
      const vsBuilder = new $5aa01963e4773c466fc995fbb6f57ffb$export$VertexShader();
      vsBuilder.setDrawMode($647b390bbe26a1e6bbc6a8c9e19f41d2$init().getDrawModeForTrack(track));
      for (let channel of Object.keys($647b390bbe26a1e6bbc6a8c9e19f41d2$init().DEFAULT_CHANNELS)) {
        if (channel === "shape") {
          // Changes vertex positions and draw mode, does not change shader code
          continue;
        }
        if ((channel in track)) {
          // Schema specifies channel
          if (track[channel].value) {
            // Channel has default value
            if (channel === "color") {
              track[channel].value = $794bbb298c1fc0cc3157526701549b8c$init().colorSpecifierToHex(track[channel].value);
            }
            vsBuilder.setChannelUniform(channel, track[channel].value);
          } else {
            // Set Channel as attribute, x and y will always reach here
            if (channel === "y" || channel === "x") {
              // Skip for x and y as handled in constructor
              continue;
            }
            vsBuilder.addChannelBuffer(channel, $647b390bbe26a1e6bbc6a8c9e19f41d2$init().DEFAULT_CHANNELS[channel].numComponents);
          }
        } else {
          // Channel not listed, set default
          vsBuilder.setChannelUniform(channel, $647b390bbe26a1e6bbc6a8c9e19f41d2$init().DEFAULT_CHANNELS[channel].value);
        }
      }
      return vsBuilder;
    }
  }
  /*@license twgl.js 4.19.1 Copyright (c) 2015, Gregg Tavares All Rights Reserved.
  Available via the MIT license.
  see: http://github.com/greggman/twgl.js for details*/
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
  */
  /**
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
  */
  let $52d13d33bd60c65a724bfd448491637f$var$VecType = Float32Array;
  /**
  * A JavaScript array with 3 values or a Float32Array with 3 values.
  * When created by the library will create the default type which is `Float32Array`
  * but can be set by calling {@link module:twgl/v3.setDefaultType}.
  * @typedef {(number[]|Float32Array)} Vec3
  * @memberOf module:twgl/v3
  */
  /**
  * Sets the type this library creates for a Vec3
  * @param {constructor} ctor the constructor for the type. Either `Float32Array` or `Array`
  * @return {constructor} previous constructor for Vec3
  * @memberOf module:twgl/v3
  */
  function $52d13d33bd60c65a724bfd448491637f$var$setDefaultType(ctor) {
    const oldType = $52d13d33bd60c65a724bfd448491637f$var$VecType;
    $52d13d33bd60c65a724bfd448491637f$var$VecType = ctor;
    return oldType;
  }
  /**
  * Creates a vec3; may be called with x, y, z to set initial values.
  * @param {number} [x] Initial x value.
  * @param {number} [y] Initial y value.
  * @param {number} [z] Initial z value.
  * @return {module:twgl/v3.Vec3} the created vector
  * @memberOf module:twgl/v3
  */
  function $52d13d33bd60c65a724bfd448491637f$var$create(x, y, z) {
    const dst = new $52d13d33bd60c65a724bfd448491637f$var$VecType(3);
    if (x) {
      dst[0] = x;
    }
    if (y) {
      dst[1] = y;
    }
    if (z) {
      dst[2] = z;
    }
    return dst;
  }
  /**
  * Adds two vectors; assumes a and b have the same dimension.
  * @param {module:twgl/v3.Vec3} a Operand vector.
  * @param {module:twgl/v3.Vec3} b Operand vector.
  * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
  * @return {module:twgl/v3.Vec3} A vector tha tis the sum of a and b.
  * @memberOf module:twgl/v3
  */
  function $52d13d33bd60c65a724bfd448491637f$var$add(a, b, dst) {
    dst = dst || new $52d13d33bd60c65a724bfd448491637f$var$VecType(3);
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
  */
  function $52d13d33bd60c65a724bfd448491637f$var$subtract(a, b, dst) {
    dst = dst || new $52d13d33bd60c65a724bfd448491637f$var$VecType(3);
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
  */
  function $52d13d33bd60c65a724bfd448491637f$var$lerp(a, b, t, dst) {
    dst = dst || new $52d13d33bd60c65a724bfd448491637f$var$VecType(3);
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
  */
  function $52d13d33bd60c65a724bfd448491637f$var$lerpV(a, b, t, dst) {
    dst = dst || new $52d13d33bd60c65a724bfd448491637f$var$VecType(3);
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
  */
  function $52d13d33bd60c65a724bfd448491637f$var$max(a, b, dst) {
    dst = dst || new $52d13d33bd60c65a724bfd448491637f$var$VecType(3);
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
  */
  function $52d13d33bd60c65a724bfd448491637f$var$min(a, b, dst) {
    dst = dst || new $52d13d33bd60c65a724bfd448491637f$var$VecType(3);
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
  */
  function $52d13d33bd60c65a724bfd448491637f$var$mulScalar(v, k, dst) {
    dst = dst || new $52d13d33bd60c65a724bfd448491637f$var$VecType(3);
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
  */
  function $52d13d33bd60c65a724bfd448491637f$var$divScalar(v, k, dst) {
    dst = dst || new $52d13d33bd60c65a724bfd448491637f$var$VecType(3);
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
  */
  function $52d13d33bd60c65a724bfd448491637f$var$cross(a, b, dst) {
    dst = dst || new $52d13d33bd60c65a724bfd448491637f$var$VecType(3);
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
  */
  function $52d13d33bd60c65a724bfd448491637f$var$dot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  }
  /**
  * Computes the length of vector
  * @param {module:twgl/v3.Vec3} v vector.
  * @return {number} length of vector.
  * @memberOf module:twgl/v3
  */
  function $52d13d33bd60c65a724bfd448491637f$var$length$1(v) {
    return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
  }
  /**
  * Computes the square of the length of vector
  * @param {module:twgl/v3.Vec3} v vector.
  * @return {number} square of the length of vector.
  * @memberOf module:twgl/v3
  */
  function $52d13d33bd60c65a724bfd448491637f$var$lengthSq(v) {
    return v[0] * v[0] + v[1] * v[1] + v[2] * v[2];
  }
  /**
  * Computes the distance between 2 points
  * @param {module:twgl/v3.Vec3} a vector.
  * @param {module:twgl/v3.Vec3} b vector.
  * @return {number} distance between a and b
  * @memberOf module:twgl/v3
  */
  function $52d13d33bd60c65a724bfd448491637f$var$distance(a, b) {
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
  */
  function $52d13d33bd60c65a724bfd448491637f$var$distanceSq(a, b) {
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
  */
  function $52d13d33bd60c65a724bfd448491637f$var$normalize(a, dst) {
    dst = dst || new $52d13d33bd60c65a724bfd448491637f$var$VecType(3);
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
  */
  function $52d13d33bd60c65a724bfd448491637f$var$negate(v, dst) {
    dst = dst || new $52d13d33bd60c65a724bfd448491637f$var$VecType(3);
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
  */
  function $52d13d33bd60c65a724bfd448491637f$var$copy(v, dst) {
    dst = dst || new $52d13d33bd60c65a724bfd448491637f$var$VecType(3);
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
  */
  function $52d13d33bd60c65a724bfd448491637f$var$multiply(a, b, dst) {
    dst = dst || new $52d13d33bd60c65a724bfd448491637f$var$VecType(3);
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
  */
  function $52d13d33bd60c65a724bfd448491637f$var$divide(a, b, dst) {
    dst = dst || new $52d13d33bd60c65a724bfd448491637f$var$VecType(3);
    dst[0] = a[0] / b[0];
    dst[1] = a[1] / b[1];
    dst[2] = a[2] / b[2];
    return dst;
  }
  var $52d13d33bd60c65a724bfd448491637f$export$v3 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    add: $52d13d33bd60c65a724bfd448491637f$var$add,
    copy: $52d13d33bd60c65a724bfd448491637f$var$copy,
    create: $52d13d33bd60c65a724bfd448491637f$var$create,
    cross: $52d13d33bd60c65a724bfd448491637f$var$cross,
    distance: $52d13d33bd60c65a724bfd448491637f$var$distance,
    distanceSq: $52d13d33bd60c65a724bfd448491637f$var$distanceSq,
    divide: $52d13d33bd60c65a724bfd448491637f$var$divide,
    divScalar: $52d13d33bd60c65a724bfd448491637f$var$divScalar,
    dot: $52d13d33bd60c65a724bfd448491637f$var$dot,
    lerp: $52d13d33bd60c65a724bfd448491637f$var$lerp,
    lerpV: $52d13d33bd60c65a724bfd448491637f$var$lerpV,
    length: $52d13d33bd60c65a724bfd448491637f$var$length$1,
    lengthSq: $52d13d33bd60c65a724bfd448491637f$var$lengthSq,
    max: $52d13d33bd60c65a724bfd448491637f$var$max,
    min: $52d13d33bd60c65a724bfd448491637f$var$min,
    mulScalar: $52d13d33bd60c65a724bfd448491637f$var$mulScalar,
    multiply: $52d13d33bd60c65a724bfd448491637f$var$multiply,
    negate: $52d13d33bd60c65a724bfd448491637f$var$negate,
    normalize: $52d13d33bd60c65a724bfd448491637f$var$normalize,
    setDefaultType: $52d13d33bd60c65a724bfd448491637f$var$setDefaultType,
    subtract: $52d13d33bd60c65a724bfd448491637f$var$subtract
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
  */
  /**
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
  */
  let $52d13d33bd60c65a724bfd448491637f$var$MatType = Float32Array;
  /**
  * A JavaScript array with 16 values or a Float32Array with 16 values.
  * When created by the library will create the default type which is `Float32Array`
  * but can be set by calling {@link module:twgl/m4.setDefaultType}.
  * @typedef {(number[]|Float32Array)} Mat4
  * @memberOf module:twgl/m4
  */
  /**
  * Sets the type this library creates for a Mat4
  * @param {constructor} ctor the constructor for the type. Either `Float32Array` or `Array`
  * @return {constructor} previous constructor for Mat4
  * @memberOf module:twgl/m4
  */
  function $52d13d33bd60c65a724bfd448491637f$var$setDefaultType$1(ctor) {
    const oldType = $52d13d33bd60c65a724bfd448491637f$var$MatType;
    $52d13d33bd60c65a724bfd448491637f$var$MatType = ctor;
    return oldType;
  }
  /**
  * Negates a matrix.
  * @param {module:twgl/m4.Mat4} m The matrix.
  * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
  * @return {module:twgl/m4.Mat4} -m.
  * @memberOf module:twgl/m4
  */
  function $52d13d33bd60c65a724bfd448491637f$var$negate$1(m, dst) {
    dst = dst || new $52d13d33bd60c65a724bfd448491637f$var$MatType(16);
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
  */
  function $52d13d33bd60c65a724bfd448491637f$var$copy$1(m, dst) {
    dst = dst || new $52d13d33bd60c65a724bfd448491637f$var$MatType(16);
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
  */
  function $52d13d33bd60c65a724bfd448491637f$var$identity(dst) {
    dst = dst || new $52d13d33bd60c65a724bfd448491637f$var$MatType(16);
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
  */
  function $52d13d33bd60c65a724bfd448491637f$var$transpose(m, dst) {
    dst = dst || new $52d13d33bd60c65a724bfd448491637f$var$MatType(16);
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
    const m00 = m[0 * 4 + 0];
    const m01 = m[0 * 4 + 1];
    const m02 = m[0 * 4 + 2];
    const m03 = m[0 * 4 + 3];
    const m10 = m[1 * 4 + 0];
    const m11 = m[1 * 4 + 1];
    const m12 = m[1 * 4 + 2];
    const m13 = m[1 * 4 + 3];
    const m20 = m[2 * 4 + 0];
    const m21 = m[2 * 4 + 1];
    const m22 = m[2 * 4 + 2];
    const m23 = m[2 * 4 + 3];
    const m30 = m[3 * 4 + 0];
    const m31 = m[3 * 4 + 1];
    const m32 = m[3 * 4 + 2];
    const m33 = m[3 * 4 + 3];
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
  */
  function $52d13d33bd60c65a724bfd448491637f$var$inverse(m, dst) {
    dst = dst || new $52d13d33bd60c65a724bfd448491637f$var$MatType(16);
    const m00 = m[0 * 4 + 0];
    const m01 = m[0 * 4 + 1];
    const m02 = m[0 * 4 + 2];
    const m03 = m[0 * 4 + 3];
    const m10 = m[1 * 4 + 0];
    const m11 = m[1 * 4 + 1];
    const m12 = m[1 * 4 + 2];
    const m13 = m[1 * 4 + 3];
    const m20 = m[2 * 4 + 0];
    const m21 = m[2 * 4 + 1];
    const m22 = m[2 * 4 + 2];
    const m23 = m[2 * 4 + 3];
    const m30 = m[3 * 4 + 0];
    const m31 = m[3 * 4 + 1];
    const m32 = m[3 * 4 + 2];
    const m33 = m[3 * 4 + 3];
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
    const d = 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);
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
  */
  function $52d13d33bd60c65a724bfd448491637f$var$multiply$1(a, b, dst) {
    dst = dst || new $52d13d33bd60c65a724bfd448491637f$var$MatType(16);
    const a00 = a[0];
    const a01 = a[1];
    const a02 = a[2];
    const a03 = a[3];
    const a10 = a[4 + 0];
    const a11 = a[4 + 1];
    const a12 = a[4 + 2];
    const a13 = a[4 + 3];
    const a20 = a[8 + 0];
    const a21 = a[8 + 1];
    const a22 = a[8 + 2];
    const a23 = a[8 + 3];
    const a30 = a[12 + 0];
    const a31 = a[12 + 1];
    const a32 = a[12 + 2];
    const a33 = a[12 + 3];
    const b00 = b[0];
    const b01 = b[1];
    const b02 = b[2];
    const b03 = b[3];
    const b10 = b[4 + 0];
    const b11 = b[4 + 1];
    const b12 = b[4 + 2];
    const b13 = b[4 + 3];
    const b20 = b[8 + 0];
    const b21 = b[8 + 1];
    const b22 = b[8 + 2];
    const b23 = b[8 + 3];
    const b30 = b[12 + 0];
    const b31 = b[12 + 1];
    const b32 = b[12 + 2];
    const b33 = b[12 + 3];
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
  */
  function $52d13d33bd60c65a724bfd448491637f$var$setTranslation(a, v, dst) {
    dst = dst || $52d13d33bd60c65a724bfd448491637f$var$identity();
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
  */
  function $52d13d33bd60c65a724bfd448491637f$var$getTranslation(m, dst) {
    dst = dst || $52d13d33bd60c65a724bfd448491637f$var$create();
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
  */
  function $52d13d33bd60c65a724bfd448491637f$var$getAxis(m, axis, dst) {
    dst = dst || $52d13d33bd60c65a724bfd448491637f$var$create();
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
  */
  function $52d13d33bd60c65a724bfd448491637f$var$setAxis(a, v, axis, dst) {
    if (dst !== a) {
      dst = $52d13d33bd60c65a724bfd448491637f$var$copy$1(a, dst);
    }
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
  */
  function $52d13d33bd60c65a724bfd448491637f$var$perspective(fieldOfViewYInRadians, aspect, zNear, zFar, dst) {
    dst = dst || new $52d13d33bd60c65a724bfd448491637f$var$MatType(16);
    const f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewYInRadians);
    const rangeInv = 1.0 / (zNear - zFar);
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
  */
  function $52d13d33bd60c65a724bfd448491637f$var$ortho(left, right, bottom, top, near, far, dst) {
    dst = dst || new $52d13d33bd60c65a724bfd448491637f$var$MatType(16);
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
  */
  function $52d13d33bd60c65a724bfd448491637f$var$frustum(left, right, bottom, top, near, far, dst) {
    dst = dst || new $52d13d33bd60c65a724bfd448491637f$var$MatType(16);
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
  let $52d13d33bd60c65a724bfd448491637f$var$xAxis;
  let $52d13d33bd60c65a724bfd448491637f$var$yAxis;
  let $52d13d33bd60c65a724bfd448491637f$var$zAxis;
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
  */
  function $52d13d33bd60c65a724bfd448491637f$var$lookAt(eye, target, up, dst) {
    dst = dst || new $52d13d33bd60c65a724bfd448491637f$var$MatType(16);
    $52d13d33bd60c65a724bfd448491637f$var$xAxis = $52d13d33bd60c65a724bfd448491637f$var$xAxis || $52d13d33bd60c65a724bfd448491637f$var$create();
    $52d13d33bd60c65a724bfd448491637f$var$yAxis = $52d13d33bd60c65a724bfd448491637f$var$yAxis || $52d13d33bd60c65a724bfd448491637f$var$create();
    $52d13d33bd60c65a724bfd448491637f$var$zAxis = $52d13d33bd60c65a724bfd448491637f$var$zAxis || $52d13d33bd60c65a724bfd448491637f$var$create();
    $52d13d33bd60c65a724bfd448491637f$var$normalize($52d13d33bd60c65a724bfd448491637f$var$subtract(eye, target, $52d13d33bd60c65a724bfd448491637f$var$zAxis), $52d13d33bd60c65a724bfd448491637f$var$zAxis);
    $52d13d33bd60c65a724bfd448491637f$var$normalize($52d13d33bd60c65a724bfd448491637f$var$cross(up, $52d13d33bd60c65a724bfd448491637f$var$zAxis, $52d13d33bd60c65a724bfd448491637f$var$xAxis), $52d13d33bd60c65a724bfd448491637f$var$xAxis);
    $52d13d33bd60c65a724bfd448491637f$var$normalize($52d13d33bd60c65a724bfd448491637f$var$cross($52d13d33bd60c65a724bfd448491637f$var$zAxis, $52d13d33bd60c65a724bfd448491637f$var$xAxis, $52d13d33bd60c65a724bfd448491637f$var$yAxis), $52d13d33bd60c65a724bfd448491637f$var$yAxis);
    dst[0] = $52d13d33bd60c65a724bfd448491637f$var$xAxis[0];
    dst[1] = $52d13d33bd60c65a724bfd448491637f$var$xAxis[1];
    dst[2] = $52d13d33bd60c65a724bfd448491637f$var$xAxis[2];
    dst[3] = 0;
    dst[4] = $52d13d33bd60c65a724bfd448491637f$var$yAxis[0];
    dst[5] = $52d13d33bd60c65a724bfd448491637f$var$yAxis[1];
    dst[6] = $52d13d33bd60c65a724bfd448491637f$var$yAxis[2];
    dst[7] = 0;
    dst[8] = $52d13d33bd60c65a724bfd448491637f$var$zAxis[0];
    dst[9] = $52d13d33bd60c65a724bfd448491637f$var$zAxis[1];
    dst[10] = $52d13d33bd60c65a724bfd448491637f$var$zAxis[2];
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
  */
  function $52d13d33bd60c65a724bfd448491637f$var$translation(v, dst) {
    dst = dst || new $52d13d33bd60c65a724bfd448491637f$var$MatType(16);
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
  */
  function $52d13d33bd60c65a724bfd448491637f$var$translate(m, v, dst) {
    dst = dst || new $52d13d33bd60c65a724bfd448491637f$var$MatType(16);
    const v0 = v[0];
    const v1 = v[1];
    const v2 = v[2];
    const m00 = m[0];
    const m01 = m[1];
    const m02 = m[2];
    const m03 = m[3];
    const m10 = m[1 * 4 + 0];
    const m11 = m[1 * 4 + 1];
    const m12 = m[1 * 4 + 2];
    const m13 = m[1 * 4 + 3];
    const m20 = m[2 * 4 + 0];
    const m21 = m[2 * 4 + 1];
    const m22 = m[2 * 4 + 2];
    const m23 = m[2 * 4 + 3];
    const m30 = m[3 * 4 + 0];
    const m31 = m[3 * 4 + 1];
    const m32 = m[3 * 4 + 2];
    const m33 = m[3 * 4 + 3];
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
  */
  function $52d13d33bd60c65a724bfd448491637f$var$rotationX(angleInRadians, dst) {
    dst = dst || new $52d13d33bd60c65a724bfd448491637f$var$MatType(16);
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
  */
  function $52d13d33bd60c65a724bfd448491637f$var$rotateX(m, angleInRadians, dst) {
    dst = dst || new $52d13d33bd60c65a724bfd448491637f$var$MatType(16);
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
  */
  function $52d13d33bd60c65a724bfd448491637f$var$rotationY(angleInRadians, dst) {
    dst = dst || new $52d13d33bd60c65a724bfd448491637f$var$MatType(16);
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
  */
  function $52d13d33bd60c65a724bfd448491637f$var$rotateY(m, angleInRadians, dst) {
    dst = dst || new $52d13d33bd60c65a724bfd448491637f$var$MatType(16);
    const m00 = m[0 * 4 + 0];
    const m01 = m[0 * 4 + 1];
    const m02 = m[0 * 4 + 2];
    const m03 = m[0 * 4 + 3];
    const m20 = m[2 * 4 + 0];
    const m21 = m[2 * 4 + 1];
    const m22 = m[2 * 4 + 2];
    const m23 = m[2 * 4 + 3];
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
  */
  function $52d13d33bd60c65a724bfd448491637f$var$rotationZ(angleInRadians, dst) {
    dst = dst || new $52d13d33bd60c65a724bfd448491637f$var$MatType(16);
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
  */
  function $52d13d33bd60c65a724bfd448491637f$var$rotateZ(m, angleInRadians, dst) {
    dst = dst || new $52d13d33bd60c65a724bfd448491637f$var$MatType(16);
    const m00 = m[0 * 4 + 0];
    const m01 = m[0 * 4 + 1];
    const m02 = m[0 * 4 + 2];
    const m03 = m[0 * 4 + 3];
    const m10 = m[1 * 4 + 0];
    const m11 = m[1 * 4 + 1];
    const m12 = m[1 * 4 + 2];
    const m13 = m[1 * 4 + 3];
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
  */
  function $52d13d33bd60c65a724bfd448491637f$var$axisRotation(axis, angleInRadians, dst) {
    dst = dst || new $52d13d33bd60c65a724bfd448491637f$var$MatType(16);
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
  */
  function $52d13d33bd60c65a724bfd448491637f$var$axisRotate(m, axis, angleInRadians, dst) {
    dst = dst || new $52d13d33bd60c65a724bfd448491637f$var$MatType(16);
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
  */
  function $52d13d33bd60c65a724bfd448491637f$var$scaling(v, dst) {
    dst = dst || new $52d13d33bd60c65a724bfd448491637f$var$MatType(16);
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
  */
  function $52d13d33bd60c65a724bfd448491637f$var$scale(m, v, dst) {
    dst = dst || new $52d13d33bd60c65a724bfd448491637f$var$MatType(16);
    const v0 = v[0];
    const v1 = v[1];
    const v2 = v[2];
    dst[0] = v0 * m[0 * 4 + 0];
    dst[1] = v0 * m[0 * 4 + 1];
    dst[2] = v0 * m[0 * 4 + 2];
    dst[3] = v0 * m[0 * 4 + 3];
    dst[4] = v1 * m[1 * 4 + 0];
    dst[5] = v1 * m[1 * 4 + 1];
    dst[6] = v1 * m[1 * 4 + 2];
    dst[7] = v1 * m[1 * 4 + 3];
    dst[8] = v2 * m[2 * 4 + 0];
    dst[9] = v2 * m[2 * 4 + 1];
    dst[10] = v2 * m[2 * 4 + 2];
    dst[11] = v2 * m[2 * 4 + 3];
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
  */
  function $52d13d33bd60c65a724bfd448491637f$var$transformPoint(m, v, dst) {
    dst = dst || $52d13d33bd60c65a724bfd448491637f$var$create();
    const v0 = v[0];
    const v1 = v[1];
    const v2 = v[2];
    const d = v0 * m[0 * 4 + 3] + v1 * m[1 * 4 + 3] + v2 * m[2 * 4 + 3] + m[3 * 4 + 3];
    dst[0] = (v0 * m[0 * 4 + 0] + v1 * m[1 * 4 + 0] + v2 * m[2 * 4 + 0] + m[3 * 4 + 0]) / d;
    dst[1] = (v0 * m[0 * 4 + 1] + v1 * m[1 * 4 + 1] + v2 * m[2 * 4 + 1] + m[3 * 4 + 1]) / d;
    dst[2] = (v0 * m[0 * 4 + 2] + v1 * m[1 * 4 + 2] + v2 * m[2 * 4 + 2] + m[3 * 4 + 2]) / d;
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
  */
  function $52d13d33bd60c65a724bfd448491637f$var$transformDirection(m, v, dst) {
    dst = dst || $52d13d33bd60c65a724bfd448491637f$var$create();
    const v0 = v[0];
    const v1 = v[1];
    const v2 = v[2];
    dst[0] = v0 * m[0 * 4 + 0] + v1 * m[1 * 4 + 0] + v2 * m[2 * 4 + 0];
    dst[1] = v0 * m[0 * 4 + 1] + v1 * m[1 * 4 + 1] + v2 * m[2 * 4 + 1];
    dst[2] = v0 * m[0 * 4 + 2] + v1 * m[1 * 4 + 2] + v2 * m[2 * 4 + 2];
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
  */
  function $52d13d33bd60c65a724bfd448491637f$var$transformNormal(m, v, dst) {
    dst = dst || $52d13d33bd60c65a724bfd448491637f$var$create();
    const mi = $52d13d33bd60c65a724bfd448491637f$var$inverse(m);
    const v0 = v[0];
    const v1 = v[1];
    const v2 = v[2];
    dst[0] = v0 * mi[0 * 4 + 0] + v1 * mi[0 * 4 + 1] + v2 * mi[0 * 4 + 2];
    dst[1] = v0 * mi[1 * 4 + 0] + v1 * mi[1 * 4 + 1] + v2 * mi[1 * 4 + 2];
    dst[2] = v0 * mi[2 * 4 + 0] + v1 * mi[2 * 4 + 1] + v2 * mi[2 * 4 + 2];
    return dst;
  }
  var $52d13d33bd60c65a724bfd448491637f$export$m4 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    axisRotate: $52d13d33bd60c65a724bfd448491637f$var$axisRotate,
    axisRotation: $52d13d33bd60c65a724bfd448491637f$var$axisRotation,
    copy: $52d13d33bd60c65a724bfd448491637f$var$copy$1,
    frustum: $52d13d33bd60c65a724bfd448491637f$var$frustum,
    getAxis: $52d13d33bd60c65a724bfd448491637f$var$getAxis,
    getTranslation: $52d13d33bd60c65a724bfd448491637f$var$getTranslation,
    identity: $52d13d33bd60c65a724bfd448491637f$var$identity,
    inverse: $52d13d33bd60c65a724bfd448491637f$var$inverse,
    lookAt: $52d13d33bd60c65a724bfd448491637f$var$lookAt,
    multiply: $52d13d33bd60c65a724bfd448491637f$var$multiply$1,
    negate: $52d13d33bd60c65a724bfd448491637f$var$negate$1,
    ortho: $52d13d33bd60c65a724bfd448491637f$var$ortho,
    perspective: $52d13d33bd60c65a724bfd448491637f$var$perspective,
    rotateX: $52d13d33bd60c65a724bfd448491637f$var$rotateX,
    rotateY: $52d13d33bd60c65a724bfd448491637f$var$rotateY,
    rotateZ: $52d13d33bd60c65a724bfd448491637f$var$rotateZ,
    rotationX: $52d13d33bd60c65a724bfd448491637f$var$rotationX,
    rotationY: $52d13d33bd60c65a724bfd448491637f$var$rotationY,
    rotationZ: $52d13d33bd60c65a724bfd448491637f$var$rotationZ,
    scale: $52d13d33bd60c65a724bfd448491637f$var$scale,
    scaling: $52d13d33bd60c65a724bfd448491637f$var$scaling,
    setAxis: $52d13d33bd60c65a724bfd448491637f$var$setAxis,
    setDefaultType: $52d13d33bd60c65a724bfd448491637f$var$setDefaultType$1,
    setTranslation: $52d13d33bd60c65a724bfd448491637f$var$setTranslation,
    transformDirection: $52d13d33bd60c65a724bfd448491637f$var$transformDirection,
    transformNormal: $52d13d33bd60c65a724bfd448491637f$var$transformNormal,
    transformPoint: $52d13d33bd60c65a724bfd448491637f$var$transformPoint,
    translate: $52d13d33bd60c65a724bfd448491637f$var$translate,
    translation: $52d13d33bd60c65a724bfd448491637f$var$translation,
    transpose: $52d13d33bd60c65a724bfd448491637f$var$transpose
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
  */
  /*DataType*/
  const $52d13d33bd60c65a724bfd448491637f$var$BYTE = 0x1400;
  const $52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_BYTE = 0x1401;
  const $52d13d33bd60c65a724bfd448491637f$var$SHORT = 0x1402;
  const $52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_SHORT = 0x1403;
  const $52d13d33bd60c65a724bfd448491637f$var$INT = 0x1404;
  const $52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_INT = 0x1405;
  const $52d13d33bd60c65a724bfd448491637f$var$FLOAT = 0x1406;
  const $52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_SHORT_4_4_4_4 = 0x8033;
  const $52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_SHORT_5_5_5_1 = 0x8034;
  const $52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_SHORT_5_6_5 = 0x8363;
  const $52d13d33bd60c65a724bfd448491637f$var$HALF_FLOAT = 0x140B;
  const $52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_INT_2_10_10_10_REV = 0x8368;
  const $52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_INT_10F_11F_11F_REV = 0x8C3B;
  const $52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_INT_5_9_9_9_REV = 0x8C3E;
  const $52d13d33bd60c65a724bfd448491637f$var$FLOAT_32_UNSIGNED_INT_24_8_REV = 0x8DAD;
  const $52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_INT_24_8 = 0x84FA;
  const $52d13d33bd60c65a724bfd448491637f$var$glTypeToTypedArray = {};
  {
    const tt = $52d13d33bd60c65a724bfd448491637f$var$glTypeToTypedArray;
    tt[$52d13d33bd60c65a724bfd448491637f$var$BYTE] = Int8Array;
    tt[$52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_BYTE] = Uint8Array;
    tt[$52d13d33bd60c65a724bfd448491637f$var$SHORT] = Int16Array;
    tt[$52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_SHORT] = Uint16Array;
    tt[$52d13d33bd60c65a724bfd448491637f$var$INT] = Int32Array;
    tt[$52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_INT] = Uint32Array;
    tt[$52d13d33bd60c65a724bfd448491637f$var$FLOAT] = Float32Array;
    tt[$52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_SHORT_4_4_4_4] = Uint16Array;
    tt[$52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_SHORT_5_5_5_1] = Uint16Array;
    tt[$52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_SHORT_5_6_5] = Uint16Array;
    tt[$52d13d33bd60c65a724bfd448491637f$var$HALF_FLOAT] = Uint16Array;
    tt[$52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_INT_2_10_10_10_REV] = Uint32Array;
    tt[$52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_INT_10F_11F_11F_REV] = Uint32Array;
    tt[$52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_INT_5_9_9_9_REV] = Uint32Array;
    tt[$52d13d33bd60c65a724bfd448491637f$var$FLOAT_32_UNSIGNED_INT_24_8_REV] = Uint32Array;
    tt[$52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_INT_24_8] = Uint32Array;
      /**
    * Get the GL type for a typedArray
    * @param {ArrayBufferView} typedArray a typedArray
    * @return {number} the GL type for array. For example pass in an `Int8Array` and `gl.BYTE` will
    *   be returned. Pass in a `Uint32Array` and `gl.UNSIGNED_INT` will be returned
    * @memberOf module:twgl/typedArray
    */
}
  /**
  * Get the GL type for a typedArray
  * @param {ArrayBufferView} typedArray a typedArray
  * @return {number} the GL type for array. For example pass in an `Int8Array` and `gl.BYTE` will
  *   be returned. Pass in a `Uint32Array` and `gl.UNSIGNED_INT` will be returned
  * @memberOf module:twgl/typedArray
  */
  function $52d13d33bd60c65a724bfd448491637f$export$getGLTypeForTypedArray(typedArray) {
    if (typedArray instanceof Int8Array) {
      return $52d13d33bd60c65a724bfd448491637f$var$BYTE;
    }
    // eslint-disable-line
    if (typedArray instanceof Uint8Array) {
      return $52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_BYTE;
    }
    // eslint-disable-line
    if (typedArray instanceof Uint8ClampedArray) {
      return $52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_BYTE;
    }
    // eslint-disable-line
    if (typedArray instanceof Int16Array) {
      return $52d13d33bd60c65a724bfd448491637f$var$SHORT;
    }
    // eslint-disable-line
    if (typedArray instanceof Uint16Array) {
      return $52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_SHORT;
    }
    // eslint-disable-line
    if (typedArray instanceof Int32Array) {
      return $52d13d33bd60c65a724bfd448491637f$var$INT;
    }
    // eslint-disable-line
    if (typedArray instanceof Uint32Array) {
      return $52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_INT;
    }
    // eslint-disable-line
    if (typedArray instanceof Float32Array) {
      return $52d13d33bd60c65a724bfd448491637f$var$FLOAT;
    }
    // eslint-disable-line
    throw new Error('unsupported typed array type');
  }
  /**
  * Get the GL type for a typedArray type
  * @param {ArrayBufferView} typedArrayType a typedArray constructor
  * @return {number} the GL type for type. For example pass in `Int8Array` and `gl.BYTE` will
  *   be returned. Pass in `Uint32Array` and `gl.UNSIGNED_INT` will be returned
  * @memberOf module:twgl/typedArray
  */
  function $52d13d33bd60c65a724bfd448491637f$export$getGLTypeForTypedArrayType(typedArrayType) {
    if (typedArrayType === Int8Array) {
      return $52d13d33bd60c65a724bfd448491637f$var$BYTE;
    }
    // eslint-disable-line
    if (typedArrayType === Uint8Array) {
      return $52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_BYTE;
    }
    // eslint-disable-line
    if (typedArrayType === Uint8ClampedArray) {
      return $52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_BYTE;
    }
    // eslint-disable-line
    if (typedArrayType === Int16Array) {
      return $52d13d33bd60c65a724bfd448491637f$var$SHORT;
    }
    // eslint-disable-line
    if (typedArrayType === Uint16Array) {
      return $52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_SHORT;
    }
    // eslint-disable-line
    if (typedArrayType === Int32Array) {
      return $52d13d33bd60c65a724bfd448491637f$var$INT;
    }
    // eslint-disable-line
    if (typedArrayType === Uint32Array) {
      return $52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_INT;
    }
    // eslint-disable-line
    if (typedArrayType === Float32Array) {
      return $52d13d33bd60c65a724bfd448491637f$var$FLOAT;
    }
    // eslint-disable-line
    throw new Error('unsupported typed array type');
  }
  /**
  * Get the typed array constructor for a given GL type
  * @param {number} type the GL type. (eg: `gl.UNSIGNED_INT`)
  * @return {function} the constructor for a the corresponding typed array. (eg. `Uint32Array`).
  * @memberOf module:twgl/typedArray
  */
  function $52d13d33bd60c65a724bfd448491637f$export$getTypedArrayTypeForGLType(type) {
    const CTOR = $52d13d33bd60c65a724bfd448491637f$var$glTypeToTypedArray[type];
    if (!CTOR) {
      throw new Error('unknown gl type');
    }
    return CTOR;
  }
  const $52d13d33bd60c65a724bfd448491637f$export$isArrayBuffer = typeof SharedArrayBuffer !== 'undefined' ? function isArrayBufferOrSharedArrayBuffer(a) {
    return a && a.buffer && (a.buffer instanceof ArrayBuffer || a.buffer instanceof SharedArrayBuffer);
  } : function isArrayBuffer(a) {
    return a && a.buffer && a.buffer instanceof ArrayBuffer;
  };
  var $52d13d33bd60c65a724bfd448491637f$export$typedarrays = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getGLTypeForTypedArray: $52d13d33bd60c65a724bfd448491637f$export$getGLTypeForTypedArray,
    getGLTypeForTypedArrayType: $52d13d33bd60c65a724bfd448491637f$export$getGLTypeForTypedArrayType,
    getTypedArrayTypeForGLType: $52d13d33bd60c65a724bfd448491637f$export$getTypedArrayTypeForGLType,
    isArrayBuffer: $52d13d33bd60c65a724bfd448491637f$export$isArrayBuffer
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
  */
  /*eslint no-console: "off"*/
  /**
  * Copy named properties
  *
  * @param {string[]} names names of properties to copy
  * @param {object} src object to copy properties from
  * @param {object} dst object to copy properties to
  * @private
  */
  function $52d13d33bd60c65a724bfd448491637f$var$copyNamedProperties(names, src, dst) {
    names.forEach(function (name) {
      const value = src[name];
      if (value !== undefined) {
        dst[name] = value;
      }
    });
  }
  /**
  * Copies properties from source to dest only if a matching key is in dest
  *
  * @param {Object.<string, ?>} src the source
  * @param {Object.<string, ?>} dst the dest
  * @private
  */
  function $52d13d33bd60c65a724bfd448491637f$var$copyExistingProperties(src, dst) {
    Object.keys(dst).forEach(function (key) {
      if (dst.hasOwnProperty(key) && src.hasOwnProperty(key)) {
        /*eslint no-prototype-builtins: 0*/
        dst[key] = src[key];
      }
    });
  }
  function $52d13d33bd60c65a724bfd448491637f$var$error(...args) {
    console.error(...args);
  }
  function $52d13d33bd60c65a724bfd448491637f$var$warn(...args) {
    console.warn(...args);
  }
  function $52d13d33bd60c65a724bfd448491637f$var$isBuffer(gl, t) {
    return typeof WebGLBuffer !== 'undefined' && t instanceof WebGLBuffer;
  }
  function $52d13d33bd60c65a724bfd448491637f$var$isRenderbuffer(gl, t) {
    return typeof WebGLRenderbuffer !== 'undefined' && t instanceof WebGLRenderbuffer;
  }
  function $52d13d33bd60c65a724bfd448491637f$var$isShader(gl, t) {
    return typeof WebGLShader !== 'undefined' && t instanceof WebGLShader;
  }
  function $52d13d33bd60c65a724bfd448491637f$var$isTexture(gl, t) {
    return typeof WebGLTexture !== 'undefined' && t instanceof WebGLTexture;
  }
  function $52d13d33bd60c65a724bfd448491637f$var$isSampler(gl, t) {
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
  */
  const $52d13d33bd60c65a724bfd448491637f$var$STATIC_DRAW = 0x88e4;
  const $52d13d33bd60c65a724bfd448491637f$var$ARRAY_BUFFER = 0x8892;
  const $52d13d33bd60c65a724bfd448491637f$var$ELEMENT_ARRAY_BUFFER = 0x8893;
  const $52d13d33bd60c65a724bfd448491637f$var$BUFFER_SIZE = 0x8764;
  const $52d13d33bd60c65a724bfd448491637f$var$BYTE$1 = 0x1400;
  const $52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_BYTE$1 = 0x1401;
  const $52d13d33bd60c65a724bfd448491637f$var$SHORT$1 = 0x1402;
  const $52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_SHORT$1 = 0x1403;
  const $52d13d33bd60c65a724bfd448491637f$var$INT$1 = 0x1404;
  const $52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_INT$1 = 0x1405;
  const $52d13d33bd60c65a724bfd448491637f$var$FLOAT$1 = 0x1406;
  const $52d13d33bd60c65a724bfd448491637f$var$defaults = {
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
  */
  function $52d13d33bd60c65a724bfd448491637f$export$setAttributePrefix(prefix) {
    $52d13d33bd60c65a724bfd448491637f$var$defaults.attribPrefix = prefix;
  }
  function $52d13d33bd60c65a724bfd448491637f$export$setAttributeDefaults_(newDefaults) {
    $52d13d33bd60c65a724bfd448491637f$var$copyExistingProperties(newDefaults, $52d13d33bd60c65a724bfd448491637f$var$defaults);
  }
  function $52d13d33bd60c65a724bfd448491637f$var$setBufferFromTypedArray(gl, type, buffer, array, drawType) {
    gl.bindBuffer(type, buffer);
    gl.bufferData(type, array, drawType || $52d13d33bd60c65a724bfd448491637f$var$STATIC_DRAW);
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
  */
  function $52d13d33bd60c65a724bfd448491637f$export$createBufferFromTypedArray(gl, typedArray, type, drawType) {
    if ($52d13d33bd60c65a724bfd448491637f$var$isBuffer(gl, typedArray)) {
      return typedArray;
    }
    type = type || $52d13d33bd60c65a724bfd448491637f$var$ARRAY_BUFFER;
    const buffer = gl.createBuffer();
    $52d13d33bd60c65a724bfd448491637f$var$setBufferFromTypedArray(gl, type, buffer, typedArray, drawType);
    return buffer;
  }
  function $52d13d33bd60c65a724bfd448491637f$var$isIndices(name) {
    return name === "indices";
  }
  // This is really just a guess. Though I can't really imagine using
  // anything else? Maybe for some compression?
  function $52d13d33bd60c65a724bfd448491637f$var$getNormalizationForTypedArray(typedArray) {
    if (typedArray instanceof Int8Array) {
      return true;
    }
    // eslint-disable-line
    if (typedArray instanceof Uint8Array) {
      return true;
    }
    // eslint-disable-line
    return false;
  }
  // This is really just a guess. Though I can't really imagine using
  // anything else? Maybe for some compression?
  function $52d13d33bd60c65a724bfd448491637f$var$getNormalizationForTypedArrayType(typedArrayType) {
    if (typedArrayType === Int8Array) {
      return true;
    }
    // eslint-disable-line
    if (typedArrayType === Uint8Array) {
      return true;
    }
    // eslint-disable-line
    return false;
  }
  function $52d13d33bd60c65a724bfd448491637f$export$getArray_(array) {
    return array.length ? array : array.data;
  }
  const $52d13d33bd60c65a724bfd448491637f$var$texcoordRE = /coord|texture/i;
  const $52d13d33bd60c65a724bfd448491637f$var$colorRE = /color|colour/i;
  function $52d13d33bd60c65a724bfd448491637f$var$guessNumComponentsFromName(name, length) {
    let numComponents;
    if ($52d13d33bd60c65a724bfd448491637f$var$texcoordRE.test(name)) {
      numComponents = 2;
    } else if ($52d13d33bd60c65a724bfd448491637f$var$colorRE.test(name)) {
      numComponents = 4;
    } else {
      numComponents = 3;
    }
    if (length % numComponents > 0) {
      throw new Error(`Can not guess numComponents for attribute '${name}'. Tried ${numComponents} but ${length} values is not evenly divisible by ${numComponents}. You should specify it.`);
    }
    return numComponents;
  }
  function $52d13d33bd60c65a724bfd448491637f$export$getNumComponents_(array, arrayName) {
    return array.numComponents || array.size || $52d13d33bd60c65a724bfd448491637f$var$guessNumComponentsFromName(arrayName, $52d13d33bd60c65a724bfd448491637f$export$getArray_(array).length);
  }
  function $52d13d33bd60c65a724bfd448491637f$var$makeTypedArray(array, name) {
    if ($52d13d33bd60c65a724bfd448491637f$export$isArrayBuffer(array)) {
      return array;
    }
    if ($52d13d33bd60c65a724bfd448491637f$export$isArrayBuffer(array.data)) {
      return array.data;
    }
    if (Array.isArray(array)) {
      array = {
        data: array
      };
    }
    let Type = array.type;
    if (!Type) {
      if ($52d13d33bd60c65a724bfd448491637f$var$isIndices(name)) {
        Type = Uint16Array;
      } else {
        Type = Float32Array;
      }
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
  */
  /**
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
  */
  /**
  * An individual array in {@link module:twgl.Arrays}
  *
  * When passed to {@link module:twgl.createBufferInfoFromArrays} if an ArraySpec is `number[]` or `ArrayBufferView`
  * the types will be guessed based on the name. `indices` will be `Uint16Array`, everything else will
  * be `Float32Array`. If an ArraySpec is a number it's the number of floats for an empty (zeroed) buffer.
  *
  * @typedef {(number|number[]|ArrayBufferView|module:twgl.FullArraySpec)} ArraySpec
  * @memberOf module:twgl
  */
  /**
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
  */
  /**
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
  */
  function $52d13d33bd60c65a724bfd448491637f$export$createAttribsFromArrays(gl, arrays) {
    const attribs = {};
    Object.keys(arrays).forEach(function (arrayName) {
      if (!$52d13d33bd60c65a724bfd448491637f$var$isIndices(arrayName)) {
        const array = arrays[arrayName];
        const attribName = array.attrib || array.name || array.attribName || $52d13d33bd60c65a724bfd448491637f$var$defaults.attribPrefix + arrayName;
        if (array.value) {
          if (!Array.isArray(array.value) && !$52d13d33bd60c65a724bfd448491637f$export$isArrayBuffer(array.value)) {
            throw new Error('array.value is not array or typedarray');
          }
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
            type = $52d13d33bd60c65a724bfd448491637f$export$getGLTypeForTypedArrayType(arrayType);
            normalization = array.normalize !== undefined ? array.normalize : $52d13d33bd60c65a724bfd448491637f$var$getNormalizationForTypedArrayType(arrayType);
            numComponents = array.numComponents || array.size || $52d13d33bd60c65a724bfd448491637f$var$guessNumComponentsFromName(arrayName, numValues);
            buffer = gl.createBuffer();
            gl.bindBuffer($52d13d33bd60c65a724bfd448491637f$var$ARRAY_BUFFER, buffer);
            gl.bufferData($52d13d33bd60c65a724bfd448491637f$var$ARRAY_BUFFER, numBytes, array.drawType || $52d13d33bd60c65a724bfd448491637f$var$STATIC_DRAW);
          } else {
            const typedArray = $52d13d33bd60c65a724bfd448491637f$var$makeTypedArray(array, arrayName);
            buffer = $52d13d33bd60c65a724bfd448491637f$export$createBufferFromTypedArray(gl, typedArray, undefined, array.drawType);
            type = $52d13d33bd60c65a724bfd448491637f$export$getGLTypeForTypedArray(typedArray);
            normalization = array.normalize !== undefined ? array.normalize : $52d13d33bd60c65a724bfd448491637f$var$getNormalizationForTypedArray(typedArray);
            numComponents = $52d13d33bd60c65a724bfd448491637f$export$getNumComponents_(array, arrayName);
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
    gl.bindBuffer($52d13d33bd60c65a724bfd448491637f$var$ARRAY_BUFFER, null);
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
  */
  function $52d13d33bd60c65a724bfd448491637f$export$setAttribInfoBufferFromArray(gl, attribInfo, array, offset) {
    array = $52d13d33bd60c65a724bfd448491637f$var$makeTypedArray(array);
    if (offset !== undefined) {
      gl.bindBuffer($52d13d33bd60c65a724bfd448491637f$var$ARRAY_BUFFER, attribInfo.buffer);
      gl.bufferSubData($52d13d33bd60c65a724bfd448491637f$var$ARRAY_BUFFER, offset, array);
    } else {
      $52d13d33bd60c65a724bfd448491637f$var$setBufferFromTypedArray(gl, $52d13d33bd60c65a724bfd448491637f$var$ARRAY_BUFFER, attribInfo.buffer, array, attribInfo.drawType);
    }
  }
  function $52d13d33bd60c65a724bfd448491637f$var$getBytesPerValueForGLType(gl, type) {
    if (type === $52d13d33bd60c65a724bfd448491637f$var$BYTE$1) return 1;
    // eslint-disable-line
    if (type === $52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_BYTE$1) return 1;
    // eslint-disable-line
    if (type === $52d13d33bd60c65a724bfd448491637f$var$SHORT$1) return 2;
    // eslint-disable-line
    if (type === $52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_SHORT$1) return 2;
    // eslint-disable-line
    if (type === $52d13d33bd60c65a724bfd448491637f$var$INT$1) return 4;
    // eslint-disable-line
    if (type === $52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_INT$1) return 4;
    // eslint-disable-line
    if (type === $52d13d33bd60c65a724bfd448491637f$var$FLOAT$1) return 4;
    // eslint-disable-line
    return 0;
  }
  // Tries to get the number of elements from a set of arrays.
  const $52d13d33bd60c65a724bfd448491637f$var$positionKeys = ['position', 'positions', 'a_position'];
  function $52d13d33bd60c65a724bfd448491637f$var$getNumElementsFromNonIndexedArrays(arrays) {
    let key;
    let ii;
    for (ii = 0; ii < $52d13d33bd60c65a724bfd448491637f$var$positionKeys.length; ++ii) {
      key = $52d13d33bd60c65a724bfd448491637f$var$positionKeys[ii];
      if ((key in arrays)) {
        break;
      }
    }
    if (ii === $52d13d33bd60c65a724bfd448491637f$var$positionKeys.length) {
      key = Object.keys(arrays)[0];
    }
    const array = arrays[key];
    const length = $52d13d33bd60c65a724bfd448491637f$export$getArray_(array).length;
    const numComponents = $52d13d33bd60c65a724bfd448491637f$export$getNumComponents_(array, key);
    const numElements = length / numComponents;
    if (length % numComponents > 0) {
      throw new Error(`numComponents ${numComponents} not correct for length ${length}`);
    }
    return numElements;
  }
  function $52d13d33bd60c65a724bfd448491637f$var$getNumElementsFromAttributes(gl, attribs) {
    let key;
    let ii;
    for (ii = 0; ii < $52d13d33bd60c65a724bfd448491637f$var$positionKeys.length; ++ii) {
      key = $52d13d33bd60c65a724bfd448491637f$var$positionKeys[ii];
      if ((key in attribs)) {
        break;
      }
      key = $52d13d33bd60c65a724bfd448491637f$var$defaults.attribPrefix + key;
      if ((key in attribs)) {
        break;
      }
    }
    if (ii === $52d13d33bd60c65a724bfd448491637f$var$positionKeys.length) {
      key = Object.keys(attribs)[0];
    }
    const attrib = attribs[key];
    gl.bindBuffer($52d13d33bd60c65a724bfd448491637f$var$ARRAY_BUFFER, attrib.buffer);
    const numBytes = gl.getBufferParameter($52d13d33bd60c65a724bfd448491637f$var$ARRAY_BUFFER, $52d13d33bd60c65a724bfd448491637f$var$BUFFER_SIZE);
    gl.bindBuffer($52d13d33bd60c65a724bfd448491637f$var$ARRAY_BUFFER, null);
    const bytesPerValue = $52d13d33bd60c65a724bfd448491637f$var$getBytesPerValueForGLType(gl, attrib.type);
    const totalElements = numBytes / bytesPerValue;
    const numComponents = attrib.numComponents || attrib.size;
    // TODO: check stride
    const numElements = totalElements / numComponents;
    if (numElements % 1 !== 0) {
      throw new Error(`numComponents ${numComponents} not correct for length ${length}`);
    }
    return numElements;
  }
  /**
  * @typedef {Object} BufferInfo
  * @property {number} numElements The number of elements to pass to `gl.drawArrays` or `gl.drawElements`.
  * @property {number} [elementType] The type of indices `UNSIGNED_BYTE`, `UNSIGNED_SHORT` etc..
  * @property {WebGLBuffer} [indices] The indices `ELEMENT_ARRAY_BUFFER` if any indices exist.
  * @property {Object.<string, module:twgl.AttribInfo>} [attribs] The attribs appropriate to call `setAttributes`
  * @memberOf module:twgl
  */
  /**
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
  */
  function $52d13d33bd60c65a724bfd448491637f$export$createBufferInfoFromArrays(gl, arrays, srcBufferInfo) {
    const newAttribs = $52d13d33bd60c65a724bfd448491637f$export$createAttribsFromArrays(gl, arrays);
    const bufferInfo = Object.assign({}, srcBufferInfo ? srcBufferInfo : {});
    bufferInfo.attribs = Object.assign({}, srcBufferInfo ? srcBufferInfo.attribs : {}, newAttribs);
    const indices = arrays.indices;
    if (indices) {
      const newIndices = $52d13d33bd60c65a724bfd448491637f$var$makeTypedArray(indices, "indices");
      bufferInfo.indices = $52d13d33bd60c65a724bfd448491637f$export$createBufferFromTypedArray(gl, newIndices, $52d13d33bd60c65a724bfd448491637f$var$ELEMENT_ARRAY_BUFFER);
      bufferInfo.numElements = newIndices.length;
      bufferInfo.elementType = $52d13d33bd60c65a724bfd448491637f$export$getGLTypeForTypedArray(newIndices);
    } else if (!bufferInfo.numElements) {
      bufferInfo.numElements = $52d13d33bd60c65a724bfd448491637f$var$getNumElementsFromAttributes(gl, bufferInfo.attribs);
    }
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
  */
  function $52d13d33bd60c65a724bfd448491637f$export$createBufferFromArray(gl, array, arrayName) {
    const type = arrayName === "indices" ? $52d13d33bd60c65a724bfd448491637f$var$ELEMENT_ARRAY_BUFFER : $52d13d33bd60c65a724bfd448491637f$var$ARRAY_BUFFER;
    const typedArray = $52d13d33bd60c65a724bfd448491637f$var$makeTypedArray(array, arrayName);
    return $52d13d33bd60c65a724bfd448491637f$export$createBufferFromTypedArray(gl, typedArray, type);
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
  */
  function $52d13d33bd60c65a724bfd448491637f$export$createBuffersFromArrays(gl, arrays) {
    const buffers = {};
    Object.keys(arrays).forEach(function (key) {
      buffers[key] = $52d13d33bd60c65a724bfd448491637f$export$createBufferFromArray(gl, arrays[key], key);
    });
    // Ugh!
    if (arrays.indices) {
      buffers.numElements = arrays.indices.length;
      buffers.elementType = $52d13d33bd60c65a724bfd448491637f$export$getGLTypeForTypedArray($52d13d33bd60c65a724bfd448491637f$var$makeTypedArray(arrays.indices));
    } else {
      buffers.numElements = $52d13d33bd60c65a724bfd448491637f$var$getNumElementsFromNonIndexedArrays(arrays);
    }
    return buffers;
  }
  var $52d13d33bd60c65a724bfd448491637f$export$attributes = /*#__PURE__*/Object.freeze({
    __proto__: null,
    createAttribsFromArrays: $52d13d33bd60c65a724bfd448491637f$export$createAttribsFromArrays,
    createBuffersFromArrays: $52d13d33bd60c65a724bfd448491637f$export$createBuffersFromArrays,
    createBufferFromArray: $52d13d33bd60c65a724bfd448491637f$export$createBufferFromArray,
    createBufferFromTypedArray: $52d13d33bd60c65a724bfd448491637f$export$createBufferFromTypedArray,
    createBufferInfoFromArrays: $52d13d33bd60c65a724bfd448491637f$export$createBufferInfoFromArrays,
    setAttribInfoBufferFromArray: $52d13d33bd60c65a724bfd448491637f$export$setAttribInfoBufferFromArray,
    setAttributePrefix: $52d13d33bd60c65a724bfd448491637f$export$setAttributePrefix,
    setAttributeDefaults_: $52d13d33bd60c65a724bfd448491637f$export$setAttributeDefaults_,
    getNumComponents_: $52d13d33bd60c65a724bfd448491637f$export$getNumComponents_,
    getArray_: $52d13d33bd60c65a724bfd448491637f$export$getArray_
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
  */
  const $52d13d33bd60c65a724bfd448491637f$var$getArray$1 = $52d13d33bd60c65a724bfd448491637f$export$getArray_;
  // eslint-disable-line
  const $52d13d33bd60c65a724bfd448491637f$var$getNumComponents$1 = $52d13d33bd60c65a724bfd448491637f$export$getNumComponents_;
  // eslint-disable-line
  /**
  * @typedef {(Int8Array|Uint8Array|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array)} TypedArray
  */
  /**
  * Add `push` to a typed array. It just keeps a 'cursor'
  * and allows use to `push` values into the array so we
  * don't have to manually compute offsets
  * @param {TypedArray} typedArray TypedArray to augment
  * @param {number} numComponents number of components.
  * @private
  */
  function $52d13d33bd60c65a724bfd448491637f$var$augmentTypedArray(typedArray, numComponents) {
    let cursor = 0;
    typedArray.push = function () {
      for (let ii = 0; ii < arguments.length; ++ii) {
        const value = arguments[ii];
        if (value instanceof Array || $52d13d33bd60c65a724bfd448491637f$export$isArrayBuffer(value)) {
          for (let jj = 0; jj < value.length; ++jj) {
            typedArray[cursor++] = value[jj];
          }
        } else {
          typedArray[cursor++] = value;
        }
      }
    };
    typedArray.reset = function (opt_index) {
      cursor = opt_index || 0;
    };
    typedArray.numComponents = numComponents;
    Object.defineProperty(typedArray, 'numElements', {
      get: function () {
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
  */
  function $52d13d33bd60c65a724bfd448491637f$var$createAugmentedTypedArray(numComponents, numElements, opt_type) {
    const Type = opt_type || Float32Array;
    return $52d13d33bd60c65a724bfd448491637f$var$augmentTypedArray(new Type(numComponents * numElements), numComponents);
  }
  function $52d13d33bd60c65a724bfd448491637f$var$allButIndices(name) {
    return name !== "indices";
  }
  /**
  * Given indexed vertices creates a new set of vertices un-indexed by expanding the indexed vertices.
  * @param {Object.<string, TypedArray>} vertices The indexed vertices to deindex
  * @return {Object.<string, TypedArray>} The deindexed vertices
  * @memberOf module:twgl/primitives
  */
  function $52d13d33bd60c65a724bfd448491637f$var$deindexVertices(vertices) {
    const indices = vertices.indices;
    const newVertices = {};
    const numElements = indices.length;
    function expandToUnindexed(channel) {
      const srcBuffer = vertices[channel];
      const numComponents = srcBuffer.numComponents;
      const dstBuffer = $52d13d33bd60c65a724bfd448491637f$var$createAugmentedTypedArray(numComponents, numElements, srcBuffer.constructor);
      for (let ii = 0; ii < numElements; ++ii) {
        const ndx = indices[ii];
        const offset = ndx * numComponents;
        for (let jj = 0; jj < numComponents; ++jj) {
          dstBuffer.push(srcBuffer[offset + jj]);
        }
      }
      newVertices[channel] = dstBuffer;
    }
    Object.keys(vertices).filter($52d13d33bd60c65a724bfd448491637f$var$allButIndices).forEach(expandToUnindexed);
    return newVertices;
  }
  /**
  * flattens the normals of deindexed vertices in place.
  * @param {Object.<string, TypedArray>} vertices The deindexed vertices who's normals to flatten
  * @return {Object.<string, TypedArray>} The flattened vertices (same as was passed in)
  * @memberOf module:twgl/primitives
  */
  function $52d13d33bd60c65a724bfd448491637f$var$flattenNormals(vertices) {
    if (vertices.indices) {
      throw new Error('can not flatten normals of indexed vertices. deindex them first');
    }
    const normals = vertices.normal;
    const numNormals = normals.length;
    for (let ii = 0; ii < numNormals; ii += 9) {
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
  function $52d13d33bd60c65a724bfd448491637f$var$applyFuncToV3Array(array, matrix, fn) {
    const len = array.length;
    const tmp = new Float32Array(3);
    for (let ii = 0; ii < len; ii += 3) {
      fn(matrix, [array[ii], array[ii + 1], array[ii + 2]], tmp);
      array[ii] = tmp[0];
      array[ii + 1] = tmp[1];
      array[ii + 2] = tmp[2];
    }
  }
  function $52d13d33bd60c65a724bfd448491637f$var$transformNormal$1(mi, v, dst) {
    dst = dst || $52d13d33bd60c65a724bfd448491637f$var$create();
    const v0 = v[0];
    const v1 = v[1];
    const v2 = v[2];
    dst[0] = v0 * mi[0 * 4 + 0] + v1 * mi[0 * 4 + 1] + v2 * mi[0 * 4 + 2];
    dst[1] = v0 * mi[1 * 4 + 0] + v1 * mi[1 * 4 + 1] + v2 * mi[1 * 4 + 2];
    dst[2] = v0 * mi[2 * 4 + 0] + v1 * mi[2 * 4 + 1] + v2 * mi[2 * 4 + 2];
    return dst;
  }
  /**
  * Reorients directions by the given matrix..
  * @param {(number[]|TypedArray)} array The array. Assumes value floats per element.
  * @param {module:twgl/m4.Mat4} matrix A matrix to multiply by.
  * @return {(number[]|TypedArray)} the same array that was passed in
  * @memberOf module:twgl/primitives
  */
  function $52d13d33bd60c65a724bfd448491637f$var$reorientDirections(array, matrix) {
    $52d13d33bd60c65a724bfd448491637f$var$applyFuncToV3Array(array, matrix, $52d13d33bd60c65a724bfd448491637f$var$transformDirection);
    return array;
  }
  /**
  * Reorients normals by the inverse-transpose of the given
  * matrix..
  * @param {(number[]|TypedArray)} array The array. Assumes value floats per element.
  * @param {module:twgl/m4.Mat4} matrix A matrix to multiply by.
  * @return {(number[]|TypedArray)} the same array that was passed in
  * @memberOf module:twgl/primitives
  */
  function $52d13d33bd60c65a724bfd448491637f$var$reorientNormals(array, matrix) {
    $52d13d33bd60c65a724bfd448491637f$var$applyFuncToV3Array(array, $52d13d33bd60c65a724bfd448491637f$var$inverse(matrix), $52d13d33bd60c65a724bfd448491637f$var$transformNormal$1);
    return array;
  }
  /**
  * Reorients positions by the given matrix. In other words, it
  * multiplies each vertex by the given matrix.
  * @param {(number[]|TypedArray)} array The array. Assumes value floats per element.
  * @param {module:twgl/m4.Mat4} matrix A matrix to multiply by.
  * @return {(number[]|TypedArray)} the same array that was passed in
  * @memberOf module:twgl/primitives
  */
  function $52d13d33bd60c65a724bfd448491637f$var$reorientPositions(array, matrix) {
    $52d13d33bd60c65a724bfd448491637f$var$applyFuncToV3Array(array, matrix, $52d13d33bd60c65a724bfd448491637f$var$transformPoint);
    return array;
  }
  /**
  * @typedef {(number[]|TypedArray)} NativeArrayOrTypedArray
  */
  /**
  * Reorients arrays by the given matrix. Assumes arrays have
  * names that contains 'pos' could be reoriented as positions,
  * 'binorm' or 'tan' as directions, and 'norm' as normals.
  *
  * @param {Object.<string, NativeArrayOrTypedArray>} arrays The vertices to reorient
  * @param {module:twgl/m4.Mat4} matrix matrix to reorient by.
  * @return {Object.<string, NativeArrayOrTypedArray>} same arrays that were passed in.
  * @memberOf module:twgl/primitives
  */
  function $52d13d33bd60c65a724bfd448491637f$var$reorientVertices(arrays, matrix) {
    Object.keys(arrays).forEach(function (name) {
      const array = arrays[name];
      if (name.indexOf("pos") >= 0) {
        $52d13d33bd60c65a724bfd448491637f$var$reorientPositions(array, matrix);
      } else if (name.indexOf("tan") >= 0 || name.indexOf("binorm") >= 0) {
        $52d13d33bd60c65a724bfd448491637f$var$reorientDirections(array, matrix);
      } else if (name.indexOf("norm") >= 0) {
        $52d13d33bd60c65a724bfd448491637f$var$reorientNormals(array, matrix);
      }
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
  */
  /**
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
  */
  /**
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
  */
  function $52d13d33bd60c65a724bfd448491637f$var$createXYQuadVertices(size, xOffset, yOffset) {
    size = size || 2;
    xOffset = xOffset || 0;
    yOffset = yOffset || 0;
    size *= 0.5;
    return {
      position: {
        numComponents: 2,
        data: [xOffset + -1 * size, yOffset + -1 * size, xOffset + 1 * size, yOffset + -1 * size, xOffset + -1 * size, yOffset + 1 * size, xOffset + 1 * size, yOffset + 1 * size]
      },
      normal: [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
      texcoord: [0, 0, 1, 0, 0, 1, 1, 1],
      indices: [0, 1, 2, 2, 1, 3]
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
  */
  /**
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
  */
  /**
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
  */
  function $52d13d33bd60c65a724bfd448491637f$var$createPlaneVertices(width, depth, subdivisionsWidth, subdivisionsDepth, matrix) {
    width = width || 1;
    depth = depth || 1;
    subdivisionsWidth = subdivisionsWidth || 1;
    subdivisionsDepth = subdivisionsDepth || 1;
    matrix = matrix || $52d13d33bd60c65a724bfd448491637f$var$identity();
    const numVertices = (subdivisionsWidth + 1) * (subdivisionsDepth + 1);
    const positions = $52d13d33bd60c65a724bfd448491637f$var$createAugmentedTypedArray(3, numVertices);
    const normals = $52d13d33bd60c65a724bfd448491637f$var$createAugmentedTypedArray(3, numVertices);
    const texcoords = $52d13d33bd60c65a724bfd448491637f$var$createAugmentedTypedArray(2, numVertices);
    for (let z = 0; z <= subdivisionsDepth; z++) {
      for (let x = 0; x <= subdivisionsWidth; x++) {
        const u = x / subdivisionsWidth;
        const v = z / subdivisionsDepth;
        positions.push(width * u - width * 0.5, 0, depth * v - depth * 0.5);
        normals.push(0, 1, 0);
        texcoords.push(u, v);
      }
    }
    const numVertsAcross = subdivisionsWidth + 1;
    const indices = $52d13d33bd60c65a724bfd448491637f$var$createAugmentedTypedArray(3, subdivisionsWidth * subdivisionsDepth * 2, Uint16Array);
    for (let z = 0; z < subdivisionsDepth; z++) {
      // eslint-disable-line
      for (let x = 0; x < subdivisionsWidth; x++) {
        // eslint-disable-line
        // Make triangle 1 of quad.
        indices.push((z + 0) * numVertsAcross + x, (z + 1) * numVertsAcross + x, (z + 0) * numVertsAcross + x + 1);
        // Make triangle 2 of quad.
        indices.push((z + 1) * numVertsAcross + x, (z + 1) * numVertsAcross + x + 1, (z + 0) * numVertsAcross + x + 1);
      }
    }
    const arrays = $52d13d33bd60c65a724bfd448491637f$var$reorientVertices({
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
  */
  /**
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
  */
  /**
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
  */
  function $52d13d33bd60c65a724bfd448491637f$var$createSphereVertices(radius, subdivisionsAxis, subdivisionsHeight, opt_startLatitudeInRadians, opt_endLatitudeInRadians, opt_startLongitudeInRadians, opt_endLongitudeInRadians) {
    if (subdivisionsAxis <= 0 || subdivisionsHeight <= 0) {
      throw new Error('subdivisionAxis and subdivisionHeight must be > 0');
    }
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
    const positions = $52d13d33bd60c65a724bfd448491637f$var$createAugmentedTypedArray(3, numVertices);
    const normals = $52d13d33bd60c65a724bfd448491637f$var$createAugmentedTypedArray(3, numVertices);
    const texcoords = $52d13d33bd60c65a724bfd448491637f$var$createAugmentedTypedArray(2, numVertices);
    // Generate the individual vertices in our vertex buffer.
    for (let y = 0; y <= subdivisionsHeight; y++) {
      for (let x = 0; x <= subdivisionsAxis; x++) {
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
    }
    const numVertsAround = subdivisionsAxis + 1;
    const indices = $52d13d33bd60c65a724bfd448491637f$var$createAugmentedTypedArray(3, subdivisionsAxis * subdivisionsHeight * 2, Uint16Array);
    for (let x = 0; x < subdivisionsAxis; x++) {
      // eslint-disable-line
      for (let y = 0; y < subdivisionsHeight; y++) {
        // eslint-disable-line
        // Make triangle 1 of quad.
        indices.push((y + 0) * numVertsAround + x, (y + 0) * numVertsAround + x + 1, (y + 1) * numVertsAround + x);
        // Make triangle 2 of quad.
        indices.push((y + 1) * numVertsAround + x, (y + 0) * numVertsAround + x + 1, (y + 1) * numVertsAround + x + 1);
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
  * Array of the indices of corners of each face of a cube.
  * @type {Array.<number[]>}
  * @private
  */
  const $52d13d33bd60c65a724bfd448491637f$var$CUBE_FACE_INDICES = [[3, 7, 5, 1], // right
  [6, 2, 0, 4], // left
  [6, 7, 3, 2], // ??
  [0, 1, 5, 4], // ??
  [7, 6, 4, 5], // front
  [2, 3, 1, 0]];
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
  */
  /**
  * Creates the buffers and indices for a cube.
  *
  * The cube is created around the origin. (-size / 2, size / 2).
  *
  * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
  * @param {number} [size] width, height and depth of the cube.
  * @return {Object.<string, WebGLBuffer>} The created buffers.
  * @memberOf module:twgl/primitives
  * @function createCubeBuffers
  */
  /**
  * Creates the vertices and indices for a cube.
  *
  * The cube is created around the origin. (-size / 2, size / 2).
  *
  * @param {number} [size] width, height and depth of the cube.
  * @return {Object.<string, TypedArray>} The created vertices.
  * @memberOf module:twgl/primitives
  */
  function $52d13d33bd60c65a724bfd448491637f$var$createCubeVertices(size) {
    size = size || 1;
    const k = size / 2;
    const cornerVertices = [[-k, -k, -k], [+k, -k, -k], [-k, +k, -k], [+k, +k, -k], [-k, -k, +k], [+k, -k, +k], [-k, +k, +k], [+k, +k, +k]];
    const faceNormals = [[+1, +0, +0], [-1, +0, +0], [+0, +1, +0], [+0, -1, +0], [+0, +0, +1], [+0, +0, -1]];
    const uvCoords = [[1, 0], [0, 0], [0, 1], [1, 1]];
    const numVertices = 6 * 4;
    const positions = $52d13d33bd60c65a724bfd448491637f$var$createAugmentedTypedArray(3, numVertices);
    const normals = $52d13d33bd60c65a724bfd448491637f$var$createAugmentedTypedArray(3, numVertices);
    const texcoords = $52d13d33bd60c65a724bfd448491637f$var$createAugmentedTypedArray(2, numVertices);
    const indices = $52d13d33bd60c65a724bfd448491637f$var$createAugmentedTypedArray(3, 6 * 2, Uint16Array);
    for (let f = 0; f < 6; ++f) {
      const faceIndices = $52d13d33bd60c65a724bfd448491637f$var$CUBE_FACE_INDICES[f];
      for (let v = 0; v < 4; ++v) {
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
  */
  /**
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
  */
  /**
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
  */
  function $52d13d33bd60c65a724bfd448491637f$var$createTruncatedConeVertices(bottomRadius, topRadius, height, radialSubdivisions, verticalSubdivisions, opt_topCap, opt_bottomCap) {
    if (radialSubdivisions < 3) {
      throw new Error('radialSubdivisions must be 3 or greater');
    }
    if (verticalSubdivisions < 1) {
      throw new Error('verticalSubdivisions must be 1 or greater');
    }
    const topCap = opt_topCap === undefined ? true : opt_topCap;
    const bottomCap = opt_bottomCap === undefined ? true : opt_bottomCap;
    const extra = (topCap ? 2 : 0) + (bottomCap ? 2 : 0);
    const numVertices = (radialSubdivisions + 1) * (verticalSubdivisions + 1 + extra);
    const positions = $52d13d33bd60c65a724bfd448491637f$var$createAugmentedTypedArray(3, numVertices);
    const normals = $52d13d33bd60c65a724bfd448491637f$var$createAugmentedTypedArray(3, numVertices);
    const texcoords = $52d13d33bd60c65a724bfd448491637f$var$createAugmentedTypedArray(2, numVertices);
    const indices = $52d13d33bd60c65a724bfd448491637f$var$createAugmentedTypedArray(3, radialSubdivisions * (verticalSubdivisions + extra / 2) * 2, Uint16Array);
    const vertsAroundEdge = radialSubdivisions + 1;
    // The slant of the cone is constant across its surface
    const slant = Math.atan2(bottomRadius - topRadius, height);
    const cosSlant = Math.cos(slant);
    const sinSlant = Math.sin(slant);
    const start = topCap ? -2 : 0;
    const end = verticalSubdivisions + (bottomCap ? 2 : 0);
    for (let yy = start; yy <= end; ++yy) {
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
      } else {
        ringRadius = bottomRadius + (topRadius - bottomRadius) * (yy / verticalSubdivisions);
      }
      if (yy === -2 || yy === verticalSubdivisions + 2) {
        ringRadius = 0;
        v = 0;
      }
      y -= height / 2;
      for (let ii = 0; ii < vertsAroundEdge; ++ii) {
        const sin = Math.sin(ii * Math.PI * 2 / radialSubdivisions);
        const cos = Math.cos(ii * Math.PI * 2 / radialSubdivisions);
        positions.push(sin * ringRadius, y, cos * ringRadius);
        if (yy < 0) {
          normals.push(0, -1, 0);
        } else if (yy > verticalSubdivisions) {
          normals.push(0, 1, 0);
        } else if (ringRadius === 0.0) {
          normals.push(0, 0, 0);
        } else {
          normals.push(sin * cosSlant, sinSlant, cos * cosSlant);
        }
        texcoords.push(ii / radialSubdivisions, 1 - v);
      }
    }
    for (let yy = 0; yy < verticalSubdivisions + extra; ++yy) {
      // eslint-disable-line
      if (yy === 1 && topCap || yy === verticalSubdivisions + extra - 2 && bottomCap) {
        continue;
      }
      for (let ii = 0; ii < radialSubdivisions; ++ii) {
        // eslint-disable-line
        indices.push(vertsAroundEdge * (yy + 0) + 0 + ii, vertsAroundEdge * (yy + 0) + 1 + ii, vertsAroundEdge * (yy + 1) + 1 + ii);
        indices.push(vertsAroundEdge * (yy + 0) + 0 + ii, vertsAroundEdge * (yy + 1) + 1 + ii, vertsAroundEdge * (yy + 1) + 0 + ii);
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
  */
  function $52d13d33bd60c65a724bfd448491637f$var$expandRLEData(rleData, padding) {
    padding = padding || [];
    const data = [];
    for (let ii = 0; ii < rleData.length; ii += 4) {
      const runLength = rleData[ii];
      const element = rleData.slice(ii + 1, ii + 4);
      element.push.apply(element, padding);
      for (let jj = 0; jj < runLength; ++jj) {
        data.push.apply(data, element);
      }
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
  */
  /**
  * Creates 3D 'F' buffers.
  * An 'F' is useful because you can easily tell which way it is oriented.
  * The created 'F' has position, normal, texcoord, and color buffers.
  *
  * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
  * @return {Object.<string, WebGLBuffer>} The created buffers.
  * @memberOf module:twgl/primitives
  * @function create3DFBuffers
  */
  /**
  * Creates 3D 'F' vertices.
  * An 'F' is useful because you can easily tell which way it is oriented.
  * The created 'F' has position, normal, texcoord, and color arrays.
  *
  * @return {Object.<string, TypedArray>} The created vertices.
  * @memberOf module:twgl/primitives
  */
  function $52d13d33bd60c65a724bfd448491637f$var$create3DFVertices() {
    const positions = [// left column front
    0, 0, 0, 0, 150, 0, 30, 0, 0, 0, 150, 0, 30, 150, 0, 30, 0, 0, // top rung front
    30, 0, 0, 30, 30, 0, 100, 0, 0, 30, 30, 0, 100, 30, 0, 100, 0, 0, // middle rung front
    30, 60, 0, 30, 90, 0, 67, 60, 0, 30, 90, 0, 67, 90, 0, 67, 60, 0, // left column back
    0, 0, 30, 30, 0, 30, 0, 150, 30, 0, 150, 30, 30, 0, 30, 30, 150, 30, // top rung back
    30, 0, 30, 100, 0, 30, 30, 30, 30, 30, 30, 30, 100, 0, 30, 100, 30, 30, // middle rung back
    30, 60, 30, 67, 60, 30, 30, 90, 30, 30, 90, 30, 67, 60, 30, 67, 90, 30, // top
    0, 0, 0, 100, 0, 0, 100, 0, 30, 0, 0, 0, 100, 0, 30, 0, 0, 30, // top rung front
    100, 0, 0, 100, 30, 0, 100, 30, 30, 100, 0, 0, 100, 30, 30, 100, 0, 30, // under top rung
    30, 30, 0, 30, 30, 30, 100, 30, 30, 30, 30, 0, 100, 30, 30, 100, 30, 0, // between top rung and middle
    30, 30, 0, 30, 60, 30, 30, 30, 30, 30, 30, 0, 30, 60, 0, 30, 60, 30, // top of middle rung
    30, 60, 0, 67, 60, 30, 30, 60, 30, 30, 60, 0, 67, 60, 0, 67, 60, 30, // front of middle rung
    67, 60, 0, 67, 90, 30, 67, 60, 30, 67, 60, 0, 67, 90, 0, 67, 90, 30, // bottom of middle rung.
    30, 90, 0, 30, 90, 30, 67, 90, 30, 30, 90, 0, 67, 90, 30, 67, 90, 0, // front of bottom
    30, 90, 0, 30, 150, 30, 30, 90, 30, 30, 90, 0, 30, 150, 0, 30, 150, 30, // bottom
    0, 150, 0, 0, 150, 30, 30, 150, 30, 0, 150, 0, 30, 150, 30, 30, 150, 0, // left side
    0, 0, 0, 0, 0, 30, 0, 150, 30, 0, 0, 0, 0, 150, 30, 0, 150, 0];
    const texcoords = [// left column front
    0.22, 0.19, 0.22, 0.79, 0.34, 0.19, 0.22, 0.79, 0.34, 0.79, 0.34, 0.19, // top rung front
    0.34, 0.19, 0.34, 0.31, 0.62, 0.19, 0.34, 0.31, 0.62, 0.31, 0.62, 0.19, // middle rung front
    0.34, 0.43, 0.34, 0.55, 0.49, 0.43, 0.34, 0.55, 0.49, 0.55, 0.49, 0.43, // left column back
    0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, // top rung back
    0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, // middle rung back
    0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, // top
    0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, // top rung front
    0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, // under top rung
    0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, // between top rung and middle
    0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, // top of middle rung
    0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, // front of middle rung
    0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, // bottom of middle rung.
    0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, // front of bottom
    0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, // bottom
    0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, // left side
    0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0];
    const normals = $52d13d33bd60c65a724bfd448491637f$var$expandRLEData([// left column front
    // top rung front
    // middle rung front
    18, 0, 0, 1, // left column back
    // top rung back
    // middle rung back
    18, 0, 0, -1, // top
    6, 0, 1, 0, // top rung front
    6, 1, 0, 0, // under top rung
    6, 0, -1, 0, // between top rung and middle
    6, 1, 0, 0, // top of middle rung
    6, 0, 1, 0, // front of middle rung
    6, 1, 0, 0, // bottom of middle rung.
    6, 0, -1, 0, // front of bottom
    6, 1, 0, 0, // bottom
    6, 0, -1, 0, // left side
    6, -1, 0, 0]);
    const colors = $52d13d33bd60c65a724bfd448491637f$var$expandRLEData([// left column front
    // top rung front
    // middle rung front
    18, 200, 70, 120, // left column back
    // top rung back
    // middle rung back
    18, 80, 70, 200, // top
    6, 70, 200, 210, // top rung front
    6, 200, 200, 70, // under top rung
    6, 210, 100, 70, // between top rung and middle
    6, 210, 160, 70, // top of middle rung
    6, 70, 180, 210, // front of middle rung
    6, 100, 70, 210, // bottom of middle rung.
    6, 76, 210, 100, // front of bottom
    6, 140, 210, 80, // bottom
    6, 90, 130, 110, // left side
    6, 160, 160, 220], [255]);
    const numVerts = positions.length / 3;
    const arrays = {
      position: $52d13d33bd60c65a724bfd448491637f$var$createAugmentedTypedArray(3, numVerts),
      texcoord: $52d13d33bd60c65a724bfd448491637f$var$createAugmentedTypedArray(2, numVerts),
      normal: $52d13d33bd60c65a724bfd448491637f$var$createAugmentedTypedArray(3, numVerts),
      color: $52d13d33bd60c65a724bfd448491637f$var$createAugmentedTypedArray(4, numVerts, Uint8Array),
      indices: $52d13d33bd60c65a724bfd448491637f$var$createAugmentedTypedArray(3, numVerts / 3, Uint16Array)
    };
    arrays.position.push(positions);
    arrays.texcoord.push(texcoords);
    arrays.normal.push(normals);
    arrays.color.push(colors);
    for (let ii = 0; ii < numVerts; ++ii) {
      arrays.indices.push(ii);
    }
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
  */
  /**
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
  */
  /**
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
  */
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
  * @function createCrescentBufferInfo
  */
  /**
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
  */
  /**
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
  */
  function $52d13d33bd60c65a724bfd448491637f$var$createCrescentVertices(verticalRadius, outerRadius, innerRadius, thickness, subdivisionsDown, startOffset, endOffset) {
    if (subdivisionsDown <= 0) {
      throw new Error('subdivisionDown must be > 0');
    }
    startOffset = startOffset || 0;
    endOffset = endOffset || 1;
    const subdivisionsThick = 2;
    const offsetRange = endOffset - startOffset;
    const numVertices = (subdivisionsDown + 1) * 2 * (2 + subdivisionsThick);
    const positions = $52d13d33bd60c65a724bfd448491637f$var$createAugmentedTypedArray(3, numVertices);
    const normals = $52d13d33bd60c65a724bfd448491637f$var$createAugmentedTypedArray(3, numVertices);
    const texcoords = $52d13d33bd60c65a724bfd448491637f$var$createAugmentedTypedArray(2, numVertices);
    function lerp(a, b, s) {
      return a + (b - a) * s;
    }
    function createArc(arcRadius, x, normalMult, normalAdd, uMult, uAdd) {
      for (let z = 0; z <= subdivisionsDown; z++) {
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
        const n = $52d13d33bd60c65a724bfd448491637f$var$add($52d13d33bd60c65a724bfd448491637f$var$multiply([0, s, c], normalMult), normalAdd);
        normals.push(n);
        texcoords.push(uBack * uMult + uAdd, v);
      }
    }
    // Generate the individual vertices in our vertex buffer.
    for (let x = 0; x < subdivisionsThick; x++) {
      const uBack = (x / (subdivisionsThick - 1) - 0.5) * 2;
      createArc(outerRadius, x, [1, 1, 1], [0, 0, 0], 1, 0);
      createArc(outerRadius, x, [0, 0, 0], [uBack, 0, 0], 0, 0);
      createArc(innerRadius, x, [1, 1, 1], [0, 0, 0], 1, 0);
      createArc(innerRadius, x, [0, 0, 0], [uBack, 0, 0], 0, 1);
    }
    // Do outer surface.
    const indices = $52d13d33bd60c65a724bfd448491637f$var$createAugmentedTypedArray(3, subdivisionsDown * 2 * (2 + subdivisionsThick), Uint16Array);
    function createSurface(leftArcOffset, rightArcOffset) {
      for (let z = 0; z < subdivisionsDown; ++z) {
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
  */
  /**
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
  */
  /**
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
  */
  function $52d13d33bd60c65a724bfd448491637f$var$createCylinderVertices(radius, height, radialSubdivisions, verticalSubdivisions, topCap, bottomCap) {
    return $52d13d33bd60c65a724bfd448491637f$var$createTruncatedConeVertices(radius, radius, height, radialSubdivisions, verticalSubdivisions, topCap, bottomCap);
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
  */
  /**
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
  */
  /**
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
  */
  function $52d13d33bd60c65a724bfd448491637f$var$createTorusVertices(radius, thickness, radialSubdivisions, bodySubdivisions, startAngle, endAngle) {
    if (radialSubdivisions < 3) {
      throw new Error('radialSubdivisions must be 3 or greater');
    }
    if (bodySubdivisions < 3) {
      throw new Error('verticalSubdivisions must be 3 or greater');
    }
    startAngle = startAngle || 0;
    endAngle = endAngle || Math.PI * 2;
    const range = endAngle - startAngle;
    const radialParts = radialSubdivisions + 1;
    const bodyParts = bodySubdivisions + 1;
    const numVertices = radialParts * bodyParts;
    const positions = $52d13d33bd60c65a724bfd448491637f$var$createAugmentedTypedArray(3, numVertices);
    const normals = $52d13d33bd60c65a724bfd448491637f$var$createAugmentedTypedArray(3, numVertices);
    const texcoords = $52d13d33bd60c65a724bfd448491637f$var$createAugmentedTypedArray(2, numVertices);
    const indices = $52d13d33bd60c65a724bfd448491637f$var$createAugmentedTypedArray(3, radialSubdivisions * bodySubdivisions * 2, Uint16Array);
    for (let slice = 0; slice < bodyParts; ++slice) {
      const v = slice / bodySubdivisions;
      const sliceAngle = v * Math.PI * 2;
      const sliceSin = Math.sin(sliceAngle);
      const ringRadius = radius + sliceSin * thickness;
      const ny = Math.cos(sliceAngle);
      const y = ny * thickness;
      for (let ring = 0; ring < radialParts; ++ring) {
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
    for (let slice = 0; slice < bodySubdivisions; ++slice) {
      // eslint-disable-line
      for (let ring = 0; ring < radialSubdivisions; ++ring) {
        // eslint-disable-line
        const nextRingIndex = 1 + ring;
        const nextSliceIndex = 1 + slice;
        indices.push(radialParts * slice + ring, radialParts * nextSliceIndex + ring, radialParts * slice + nextRingIndex);
        indices.push(radialParts * nextSliceIndex + ring, radialParts * nextSliceIndex + nextRingIndex, radialParts * slice + nextRingIndex);
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
  */
  /**
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
  */
  /**
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
  */
  function $52d13d33bd60c65a724bfd448491637f$var$createDiscVertices(radius, divisions, stacks, innerRadius, stackPower) {
    if (divisions < 3) {
      throw new Error('divisions must be at least 3');
    }
    stacks = stacks ? stacks : 1;
    stackPower = stackPower ? stackPower : 1;
    innerRadius = innerRadius ? innerRadius : 0;
    // Note: We don't share the center vertex because that would
    // mess up texture coordinates.
    const numVertices = (divisions + 1) * (stacks + 1);
    const positions = $52d13d33bd60c65a724bfd448491637f$var$createAugmentedTypedArray(3, numVertices);
    const normals = $52d13d33bd60c65a724bfd448491637f$var$createAugmentedTypedArray(3, numVertices);
    const texcoords = $52d13d33bd60c65a724bfd448491637f$var$createAugmentedTypedArray(2, numVertices);
    const indices = $52d13d33bd60c65a724bfd448491637f$var$createAugmentedTypedArray(3, stacks * divisions * 2, Uint16Array);
    let firstIndex = 0;
    const radiusSpan = radius - innerRadius;
    const pointsPerStack = divisions + 1;
    // Build the disk one stack at a time.
    for (let stack = 0; stack <= stacks; ++stack) {
      const stackRadius = innerRadius + radiusSpan * Math.pow(stack / stacks, stackPower);
      for (let i = 0; i <= divisions; ++i) {
        const theta = 2.0 * Math.PI * i / divisions;
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
  */
  function $52d13d33bd60c65a724bfd448491637f$var$randInt(range) {
    return Math.random() * range | 0;
  }
  /**
  * Used to supply random colors
  * @callback RandomColorFunc
  * @param {number} ndx index of triangle/quad if unindexed or index of vertex if indexed
  * @param {number} channel 0 = red, 1 = green, 2 = blue, 3 = alpha
  * @return {number} a number from 0 to 255
  * @memberOf module:twgl/primitives
  */
  /**
  * @typedef {Object} RandomVerticesOptions
  * @property {number} [vertsPerColor] Defaults to 3 for non-indexed vertices
  * @property {module:twgl/primitives.RandomColorFunc} [rand] A function to generate random numbers
  * @memberOf module:twgl/primitives
  */
  /**
  * Creates an augmentedTypedArray of random vertex colors.
  * If the vertices are indexed (have an indices array) then will
  * just make random colors. Otherwise assumes they are triangles
  * and makes one random color for every 3 vertices.
  * @param {Object.<string, AugmentedTypedArray>} vertices Vertices as returned from one of the createXXXVertices functions.
  * @param {module:twgl/primitives.RandomVerticesOptions} [options] options.
  * @return {Object.<string, AugmentedTypedArray>} same vertices as passed in with `color` added.
  * @memberOf module:twgl/primitives
  */
  function $52d13d33bd60c65a724bfd448491637f$var$makeRandomVertexColors(vertices, options) {
    options = options || ({});
    const numElements = vertices.position.numElements;
    const vColors = $52d13d33bd60c65a724bfd448491637f$var$createAugmentedTypedArray(4, numElements, Uint8Array);
    const rand = options.rand || (function (ndx, channel) {
      return channel < 3 ? $52d13d33bd60c65a724bfd448491637f$var$randInt(256) : 255;
    });
    vertices.color = vColors;
    if (vertices.indices) {
      // just make random colors if index
      for (let ii = 0; ii < numElements; ++ii) {
        vColors.push(rand(ii, 0), rand(ii, 1), rand(ii, 2), rand(ii, 3));
      }
    } else {
      // make random colors per triangle
      const numVertsPerColor = options.vertsPerColor || 3;
      const numSets = numElements / numVertsPerColor;
      for (let ii = 0; ii < numSets; ++ii) {
        // eslint-disable-line
        const color = [rand(ii, 0), rand(ii, 1), rand(ii, 2), rand(ii, 3)];
        for (let jj = 0; jj < numVertsPerColor; ++jj) {
          vColors.push(color);
        }
      }
    }
    return vertices;
  }
  /**
  * creates a function that calls fn to create vertices and then
  * creates a buffers for them
  * @private
  */
  function $52d13d33bd60c65a724bfd448491637f$var$createBufferFunc(fn) {
    return function (gl) {
      const arrays = fn.apply(this, Array.prototype.slice.call(arguments, 1));
      return $52d13d33bd60c65a724bfd448491637f$export$createBuffersFromArrays(gl, arrays);
    };
  }
  /**
  * creates a function that calls fn to create vertices and then
  * creates a bufferInfo object for them
  * @private
  */
  function $52d13d33bd60c65a724bfd448491637f$var$createBufferInfoFunc(fn) {
    return function (gl) {
      const arrays = fn.apply(null, Array.prototype.slice.call(arguments, 1));
      return $52d13d33bd60c65a724bfd448491637f$export$createBufferInfoFromArrays(gl, arrays);
    };
  }
  const $52d13d33bd60c65a724bfd448491637f$var$arraySpecPropertyNames = ["numComponents", "size", "type", "normalize", "stride", "offset", "attrib", "name", "attribName"];
  /**
  * Copy elements from one array to another
  *
  * @param {Array|TypedArray} src source array
  * @param {Array|TypedArray} dst dest array
  * @param {number} dstNdx index in dest to copy src
  * @param {number} [offset] offset to add to copied values
  * @private
  */
  function $52d13d33bd60c65a724bfd448491637f$var$copyElements(src, dst, dstNdx, offset) {
    offset = offset || 0;
    const length = src.length;
    for (let ii = 0; ii < length; ++ii) {
      dst[dstNdx + ii] = src[ii] + offset;
    }
  }
  /**
  * Creates an array of the same time
  *
  * @param {(number[]|ArrayBufferView|module:twgl.FullArraySpec)} srcArray array who's type to copy
  * @param {number} length size of new array
  * @return {(number[]|ArrayBufferView|module:twgl.FullArraySpec)} array with same type as srcArray
  * @private
  */
  function $52d13d33bd60c65a724bfd448491637f$var$createArrayOfSameType(srcArray, length) {
    const arraySrc = $52d13d33bd60c65a724bfd448491637f$var$getArray$1(srcArray);
    const newArray = new arraySrc.constructor(length);
    let newArraySpec = newArray;
    // If it appears to have been augmented make new one augmented
    if (arraySrc.numComponents && arraySrc.numElements) {
      $52d13d33bd60c65a724bfd448491637f$var$augmentTypedArray(newArray, arraySrc.numComponents);
    }
    // If it was a full spec make new one a full spec
    if (srcArray.data) {
      newArraySpec = {
        data: newArray
      };
      $52d13d33bd60c65a724bfd448491637f$var$copyNamedProperties($52d13d33bd60c65a724bfd448491637f$var$arraySpecPropertyNames, srcArray, newArraySpec);
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
  */
  function $52d13d33bd60c65a724bfd448491637f$var$concatVertices(arrayOfArrays) {
    const names = {};
    let baseName;
    // get names of all arrays.
    // and numElements for each set of vertices
    for (let ii = 0; ii < arrayOfArrays.length; ++ii) {
      const arrays = arrayOfArrays[ii];
      Object.keys(arrays).forEach(function (name) {
        // eslint-disable-line
        if (!names[name]) {
          names[name] = [];
        }
        if (!baseName && name !== 'indices') {
          baseName = name;
        }
        const arrayInfo = arrays[name];
        const numComponents = $52d13d33bd60c65a724bfd448491637f$var$getNumComponents$1(arrayInfo, name);
        const array = $52d13d33bd60c65a724bfd448491637f$var$getArray$1(arrayInfo);
        const numElements = array.length / numComponents;
        names[name].push(numElements);
      });
    }
    // compute length of combined array
    // and return one for reference
    function getLengthOfCombinedArrays(name) {
      let length = 0;
      let arraySpec;
      for (let ii = 0; ii < arrayOfArrays.length; ++ii) {
        const arrays = arrayOfArrays[ii];
        const arrayInfo = arrays[name];
        const array = $52d13d33bd60c65a724bfd448491637f$var$getArray$1(arrayInfo);
        length += array.length;
        if (!arraySpec || arrayInfo.data) {
          arraySpec = arrayInfo;
        }
      }
      return {
        length: length,
        spec: arraySpec
      };
    }
    function copyArraysToNewArray(name, base, newArray) {
      let baseIndex = 0;
      let offset = 0;
      for (let ii = 0; ii < arrayOfArrays.length; ++ii) {
        const arrays = arrayOfArrays[ii];
        const arrayInfo = arrays[name];
        const array = $52d13d33bd60c65a724bfd448491637f$var$getArray$1(arrayInfo);
        if (name === 'indices') {
          $52d13d33bd60c65a724bfd448491637f$var$copyElements(array, newArray, offset, baseIndex);
          baseIndex += base[ii];
        } else {
          $52d13d33bd60c65a724bfd448491637f$var$copyElements(array, newArray, offset);
        }
        offset += array.length;
      }
    }
    const base = names[baseName];
    const newArrays = {};
    Object.keys(names).forEach(function (name) {
      const info = getLengthOfCombinedArrays(name);
      const newArraySpec = $52d13d33bd60c65a724bfd448491637f$var$createArrayOfSameType(info.spec, info.length);
      copyArraysToNewArray(name, base, $52d13d33bd60c65a724bfd448491637f$var$getArray$1(newArraySpec));
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
  */
  function $52d13d33bd60c65a724bfd448491637f$var$duplicateVertices(arrays) {
    const newArrays = {};
    Object.keys(arrays).forEach(function (name) {
      const arraySpec = arrays[name];
      const srcArray = $52d13d33bd60c65a724bfd448491637f$var$getArray$1(arraySpec);
      const newArraySpec = $52d13d33bd60c65a724bfd448491637f$var$createArrayOfSameType(arraySpec, srcArray.length);
      $52d13d33bd60c65a724bfd448491637f$var$copyElements(srcArray, $52d13d33bd60c65a724bfd448491637f$var$getArray$1(newArraySpec), 0);
      newArrays[name] = newArraySpec;
    });
    return newArrays;
  }
  const $52d13d33bd60c65a724bfd448491637f$var$create3DFBufferInfo = $52d13d33bd60c65a724bfd448491637f$var$createBufferInfoFunc($52d13d33bd60c65a724bfd448491637f$var$create3DFVertices);
  const $52d13d33bd60c65a724bfd448491637f$var$create3DFBuffers = $52d13d33bd60c65a724bfd448491637f$var$createBufferFunc($52d13d33bd60c65a724bfd448491637f$var$create3DFVertices);
  const $52d13d33bd60c65a724bfd448491637f$var$createCubeBufferInfo = $52d13d33bd60c65a724bfd448491637f$var$createBufferInfoFunc($52d13d33bd60c65a724bfd448491637f$var$createCubeVertices);
  const $52d13d33bd60c65a724bfd448491637f$var$createCubeBuffers = $52d13d33bd60c65a724bfd448491637f$var$createBufferFunc($52d13d33bd60c65a724bfd448491637f$var$createCubeVertices);
  const $52d13d33bd60c65a724bfd448491637f$var$createPlaneBufferInfo = $52d13d33bd60c65a724bfd448491637f$var$createBufferInfoFunc($52d13d33bd60c65a724bfd448491637f$var$createPlaneVertices);
  const $52d13d33bd60c65a724bfd448491637f$var$createPlaneBuffers = $52d13d33bd60c65a724bfd448491637f$var$createBufferFunc($52d13d33bd60c65a724bfd448491637f$var$createPlaneVertices);
  const $52d13d33bd60c65a724bfd448491637f$var$createSphereBufferInfo = $52d13d33bd60c65a724bfd448491637f$var$createBufferInfoFunc($52d13d33bd60c65a724bfd448491637f$var$createSphereVertices);
  const $52d13d33bd60c65a724bfd448491637f$var$createSphereBuffers = $52d13d33bd60c65a724bfd448491637f$var$createBufferFunc($52d13d33bd60c65a724bfd448491637f$var$createSphereVertices);
  const $52d13d33bd60c65a724bfd448491637f$var$createTruncatedConeBufferInfo = $52d13d33bd60c65a724bfd448491637f$var$createBufferInfoFunc($52d13d33bd60c65a724bfd448491637f$var$createTruncatedConeVertices);
  const $52d13d33bd60c65a724bfd448491637f$var$createTruncatedConeBuffers = $52d13d33bd60c65a724bfd448491637f$var$createBufferFunc($52d13d33bd60c65a724bfd448491637f$var$createTruncatedConeVertices);
  const $52d13d33bd60c65a724bfd448491637f$var$createXYQuadBufferInfo = $52d13d33bd60c65a724bfd448491637f$var$createBufferInfoFunc($52d13d33bd60c65a724bfd448491637f$var$createXYQuadVertices);
  const $52d13d33bd60c65a724bfd448491637f$var$createXYQuadBuffers = $52d13d33bd60c65a724bfd448491637f$var$createBufferFunc($52d13d33bd60c65a724bfd448491637f$var$createXYQuadVertices);
  const $52d13d33bd60c65a724bfd448491637f$var$createCrescentBufferInfo = $52d13d33bd60c65a724bfd448491637f$var$createBufferInfoFunc($52d13d33bd60c65a724bfd448491637f$var$createCrescentVertices);
  const $52d13d33bd60c65a724bfd448491637f$var$createCrescentBuffers = $52d13d33bd60c65a724bfd448491637f$var$createBufferFunc($52d13d33bd60c65a724bfd448491637f$var$createCrescentVertices);
  const $52d13d33bd60c65a724bfd448491637f$var$createCylinderBufferInfo = $52d13d33bd60c65a724bfd448491637f$var$createBufferInfoFunc($52d13d33bd60c65a724bfd448491637f$var$createCylinderVertices);
  const $52d13d33bd60c65a724bfd448491637f$var$createCylinderBuffers = $52d13d33bd60c65a724bfd448491637f$var$createBufferFunc($52d13d33bd60c65a724bfd448491637f$var$createCylinderVertices);
  const $52d13d33bd60c65a724bfd448491637f$var$createTorusBufferInfo = $52d13d33bd60c65a724bfd448491637f$var$createBufferInfoFunc($52d13d33bd60c65a724bfd448491637f$var$createTorusVertices);
  const $52d13d33bd60c65a724bfd448491637f$var$createTorusBuffers = $52d13d33bd60c65a724bfd448491637f$var$createBufferFunc($52d13d33bd60c65a724bfd448491637f$var$createTorusVertices);
  const $52d13d33bd60c65a724bfd448491637f$var$createDiscBufferInfo = $52d13d33bd60c65a724bfd448491637f$var$createBufferInfoFunc($52d13d33bd60c65a724bfd448491637f$var$createDiscVertices);
  const $52d13d33bd60c65a724bfd448491637f$var$createDiscBuffers = $52d13d33bd60c65a724bfd448491637f$var$createBufferFunc($52d13d33bd60c65a724bfd448491637f$var$createDiscVertices);
  // these were mis-spelled until 4.12
  const $52d13d33bd60c65a724bfd448491637f$var$createCresentBufferInfo = $52d13d33bd60c65a724bfd448491637f$var$createCrescentBufferInfo;
  const $52d13d33bd60c65a724bfd448491637f$var$createCresentBuffers = $52d13d33bd60c65a724bfd448491637f$var$createCrescentBuffers;
  const $52d13d33bd60c65a724bfd448491637f$var$createCresentVertices = $52d13d33bd60c65a724bfd448491637f$var$createCrescentVertices;
  var $52d13d33bd60c65a724bfd448491637f$export$primitives = /*#__PURE__*/Object.freeze({
    __proto__: null,
    create3DFBufferInfo: $52d13d33bd60c65a724bfd448491637f$var$create3DFBufferInfo,
    create3DFBuffers: $52d13d33bd60c65a724bfd448491637f$var$create3DFBuffers,
    create3DFVertices: $52d13d33bd60c65a724bfd448491637f$var$create3DFVertices,
    createAugmentedTypedArray: $52d13d33bd60c65a724bfd448491637f$var$createAugmentedTypedArray,
    createCubeBufferInfo: $52d13d33bd60c65a724bfd448491637f$var$createCubeBufferInfo,
    createCubeBuffers: $52d13d33bd60c65a724bfd448491637f$var$createCubeBuffers,
    createCubeVertices: $52d13d33bd60c65a724bfd448491637f$var$createCubeVertices,
    createPlaneBufferInfo: $52d13d33bd60c65a724bfd448491637f$var$createPlaneBufferInfo,
    createPlaneBuffers: $52d13d33bd60c65a724bfd448491637f$var$createPlaneBuffers,
    createPlaneVertices: $52d13d33bd60c65a724bfd448491637f$var$createPlaneVertices,
    createSphereBufferInfo: $52d13d33bd60c65a724bfd448491637f$var$createSphereBufferInfo,
    createSphereBuffers: $52d13d33bd60c65a724bfd448491637f$var$createSphereBuffers,
    createSphereVertices: $52d13d33bd60c65a724bfd448491637f$var$createSphereVertices,
    createTruncatedConeBufferInfo: $52d13d33bd60c65a724bfd448491637f$var$createTruncatedConeBufferInfo,
    createTruncatedConeBuffers: $52d13d33bd60c65a724bfd448491637f$var$createTruncatedConeBuffers,
    createTruncatedConeVertices: $52d13d33bd60c65a724bfd448491637f$var$createTruncatedConeVertices,
    createXYQuadBufferInfo: $52d13d33bd60c65a724bfd448491637f$var$createXYQuadBufferInfo,
    createXYQuadBuffers: $52d13d33bd60c65a724bfd448491637f$var$createXYQuadBuffers,
    createXYQuadVertices: $52d13d33bd60c65a724bfd448491637f$var$createXYQuadVertices,
    createCresentBufferInfo: $52d13d33bd60c65a724bfd448491637f$var$createCresentBufferInfo,
    createCresentBuffers: $52d13d33bd60c65a724bfd448491637f$var$createCresentBuffers,
    createCresentVertices: $52d13d33bd60c65a724bfd448491637f$var$createCresentVertices,
    createCrescentBufferInfo: $52d13d33bd60c65a724bfd448491637f$var$createCrescentBufferInfo,
    createCrescentBuffers: $52d13d33bd60c65a724bfd448491637f$var$createCrescentBuffers,
    createCrescentVertices: $52d13d33bd60c65a724bfd448491637f$var$createCrescentVertices,
    createCylinderBufferInfo: $52d13d33bd60c65a724bfd448491637f$var$createCylinderBufferInfo,
    createCylinderBuffers: $52d13d33bd60c65a724bfd448491637f$var$createCylinderBuffers,
    createCylinderVertices: $52d13d33bd60c65a724bfd448491637f$var$createCylinderVertices,
    createTorusBufferInfo: $52d13d33bd60c65a724bfd448491637f$var$createTorusBufferInfo,
    createTorusBuffers: $52d13d33bd60c65a724bfd448491637f$var$createTorusBuffers,
    createTorusVertices: $52d13d33bd60c65a724bfd448491637f$var$createTorusVertices,
    createDiscBufferInfo: $52d13d33bd60c65a724bfd448491637f$var$createDiscBufferInfo,
    createDiscBuffers: $52d13d33bd60c65a724bfd448491637f$var$createDiscBuffers,
    createDiscVertices: $52d13d33bd60c65a724bfd448491637f$var$createDiscVertices,
    deindexVertices: $52d13d33bd60c65a724bfd448491637f$var$deindexVertices,
    flattenNormals: $52d13d33bd60c65a724bfd448491637f$var$flattenNormals,
    makeRandomVertexColors: $52d13d33bd60c65a724bfd448491637f$var$makeRandomVertexColors,
    reorientDirections: $52d13d33bd60c65a724bfd448491637f$var$reorientDirections,
    reorientNormals: $52d13d33bd60c65a724bfd448491637f$var$reorientNormals,
    reorientPositions: $52d13d33bd60c65a724bfd448491637f$var$reorientPositions,
    reorientVertices: $52d13d33bd60c65a724bfd448491637f$var$reorientVertices,
    concatVertices: $52d13d33bd60c65a724bfd448491637f$var$concatVertices,
    duplicateVertices: $52d13d33bd60c65a724bfd448491637f$var$duplicateVertices
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
  */
  /**
  * Gets the gl version as a number
  * @param {WebGLRenderingContext} gl A WebGLRenderingContext
  * @return {number} version of gl
  * @private
  */
  // function getVersionAsNumber(gl) {
  // return parseFloat(gl.getParameter(gl.VERSION).substr(6));
  // }
  /**
  * Check if context is WebGL 2.0
  * @param {WebGLRenderingContext} gl A WebGLRenderingContext
  * @return {bool} true if it's WebGL 2.0
  * @memberOf module:twgl
  */
  function $52d13d33bd60c65a724bfd448491637f$export$isWebGL2(gl) {
    // This is the correct check but it's slow
    // return gl.getParameter(gl.VERSION).indexOf("WebGL 2.0") === 0;
    // This might also be the correct check but I'm assuming it's slow-ish
    // return gl instanceof WebGL2RenderingContext;
    return !!gl.texStorage2D;
  }
  /**
  * Check if context is WebGL 1.0
  * @param {WebGLRenderingContext} gl A WebGLRenderingContext
  * @return {bool} true if it's WebGL 1.0
  * @memberOf module:twgl
  */
  function $52d13d33bd60c65a724bfd448491637f$export$isWebGL1(gl) {
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
  */
  const $52d13d33bd60c65a724bfd448491637f$export$glEnumToString = (function () {
    const haveEnumsForType = {};
    const enums = {};
    function addEnums(gl) {
      const type = gl.constructor.name;
      if (!haveEnumsForType[type]) {
        for (const key in gl) {
          if (typeof gl[key] === 'number') {
            const existing = enums[gl[key]];
            enums[gl[key]] = existing ? `${existing} | ${key}` : key;
          }
        }
        haveEnumsForType[type] = true;
      }
    }
    return function glEnumToString(gl, value) {
      addEnums(gl);
      return enums[value] || (typeof value === 'number' ? `0x${value.toString(16)}` : value);
    };
  })();
  var $52d13d33bd60c65a724bfd448491637f$export$utils = /*#__PURE__*/Object.freeze({
    __proto__: null,
    glEnumToString: $52d13d33bd60c65a724bfd448491637f$export$glEnumToString,
    isWebGL1: $52d13d33bd60c65a724bfd448491637f$export$isWebGL1,
    isWebGL2: $52d13d33bd60c65a724bfd448491637f$export$isWebGL2
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
  */
  const $52d13d33bd60c65a724bfd448491637f$var$defaults$1 = {
    textureColor: new Uint8Array([128, 192, 255, 255]),
    textureOptions: {},
    crossOrigin: undefined
  };
  const $52d13d33bd60c65a724bfd448491637f$var$isArrayBuffer$1 = $52d13d33bd60c65a724bfd448491637f$export$isArrayBuffer;
  // Should we make this on demand?
  const $52d13d33bd60c65a724bfd448491637f$var$getShared2DContext = (function () {
    let s_ctx;
    return function getShared2DContext() {
      s_ctx = s_ctx || (typeof document !== 'undefined' && document.createElement ? document.createElement("canvas").getContext("2d") : null);
      return s_ctx;
    };
  })();
  // NOTE: Chrome supports 2D canvas in a Worker (behind flag as of v64 but
  // not only does Firefox NOT support it but Firefox freezes immediately
  // if you try to create one instead of just returning null and continuing.
  // : (global.OffscreenCanvas && (new global.OffscreenCanvas(1, 1)).getContext("2d"));  // OffscreenCanvas may not support 2d
  // NOTE: We can maybe remove some of the need for the 2d canvas. In WebGL2
  // we can use the various unpack settings. Otherwise we could try using
  // the ability of an ImageBitmap to be cut. Unfortunately cutting an ImageBitmap
  // is async and the current TWGL code expects a non-Async result though that
  // might not be a problem. ImageBitmap though is not available in Edge or Safari
  // as of 2018-01-02
  /*PixelFormat*/
  const $52d13d33bd60c65a724bfd448491637f$var$ALPHA = 0x1906;
  const $52d13d33bd60c65a724bfd448491637f$var$RGB = 0x1907;
  const $52d13d33bd60c65a724bfd448491637f$var$RGBA = 0x1908;
  const $52d13d33bd60c65a724bfd448491637f$var$LUMINANCE = 0x1909;
  const $52d13d33bd60c65a724bfd448491637f$var$LUMINANCE_ALPHA = 0x190A;
  const $52d13d33bd60c65a724bfd448491637f$var$DEPTH_COMPONENT = 0x1902;
  const $52d13d33bd60c65a724bfd448491637f$var$DEPTH_STENCIL = 0x84F9;
  /*TextureWrapMode*/
  // const REPEAT                         = 0x2901;
  // const MIRRORED_REPEAT                = 0x8370;
  const $52d13d33bd60c65a724bfd448491637f$var$CLAMP_TO_EDGE = 0x812f;
  /*TextureMagFilter*/
  const $52d13d33bd60c65a724bfd448491637f$var$NEAREST = 0x2600;
  const $52d13d33bd60c65a724bfd448491637f$var$LINEAR = 0x2601;
  /*TextureMinFilter*/
  // const NEAREST_MIPMAP_NEAREST         = 0x2700;
  // const LINEAR_MIPMAP_NEAREST          = 0x2701;
  // const NEAREST_MIPMAP_LINEAR          = 0x2702;
  // const LINEAR_MIPMAP_LINEAR           = 0x2703;
  /*Texture Target*/
  const $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_2D = 0x0de1;
  const $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_CUBE_MAP = 0x8513;
  const $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_3D = 0x806f;
  const $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_2D_ARRAY = 0x8c1a;
  /*Cubemap Targets*/
  const $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_CUBE_MAP_POSITIVE_X = 0x8515;
  const $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_CUBE_MAP_NEGATIVE_X = 0x8516;
  const $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_CUBE_MAP_POSITIVE_Y = 0x8517;
  const $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_CUBE_MAP_NEGATIVE_Y = 0x8518;
  const $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_CUBE_MAP_POSITIVE_Z = 0x8519;
  const $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_CUBE_MAP_NEGATIVE_Z = 0x851a;
  /*Texture Parameters*/
  const $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_MIN_FILTER = 0x2801;
  const $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_MAG_FILTER = 0x2800;
  const $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_WRAP_S = 0x2802;
  const $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_WRAP_T = 0x2803;
  const $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_WRAP_R = 0x8072;
  const $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_MIN_LOD = 0x813a;
  const $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_MAX_LOD = 0x813b;
  const $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_BASE_LEVEL = 0x813c;
  const $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_MAX_LEVEL = 0x813d;
  /*Pixel store*/
  const $52d13d33bd60c65a724bfd448491637f$var$UNPACK_ALIGNMENT = 0x0cf5;
  const $52d13d33bd60c65a724bfd448491637f$var$UNPACK_ROW_LENGTH = 0x0cf2;
  const $52d13d33bd60c65a724bfd448491637f$var$UNPACK_IMAGE_HEIGHT = 0x806e;
  const $52d13d33bd60c65a724bfd448491637f$var$UNPACK_SKIP_PIXELS = 0x0cf4;
  const $52d13d33bd60c65a724bfd448491637f$var$UNPACK_SKIP_ROWS = 0x0cf3;
  const $52d13d33bd60c65a724bfd448491637f$var$UNPACK_SKIP_IMAGES = 0x806d;
  const $52d13d33bd60c65a724bfd448491637f$var$UNPACK_COLORSPACE_CONVERSION_WEBGL = 0x9243;
  const $52d13d33bd60c65a724bfd448491637f$var$UNPACK_PREMULTIPLY_ALPHA_WEBGL = 0x9241;
  const $52d13d33bd60c65a724bfd448491637f$var$UNPACK_FLIP_Y_WEBGL = 0x9240;
  const $52d13d33bd60c65a724bfd448491637f$var$R8 = 0x8229;
  const $52d13d33bd60c65a724bfd448491637f$var$R8_SNORM = 0x8F94;
  const $52d13d33bd60c65a724bfd448491637f$var$R16F = 0x822D;
  const $52d13d33bd60c65a724bfd448491637f$var$R32F = 0x822E;
  const $52d13d33bd60c65a724bfd448491637f$var$R8UI = 0x8232;
  const $52d13d33bd60c65a724bfd448491637f$var$R8I = 0x8231;
  const $52d13d33bd60c65a724bfd448491637f$var$RG16UI = 0x823A;
  const $52d13d33bd60c65a724bfd448491637f$var$RG16I = 0x8239;
  const $52d13d33bd60c65a724bfd448491637f$var$RG32UI = 0x823C;
  const $52d13d33bd60c65a724bfd448491637f$var$RG32I = 0x823B;
  const $52d13d33bd60c65a724bfd448491637f$var$RG8 = 0x822B;
  const $52d13d33bd60c65a724bfd448491637f$var$RG8_SNORM = 0x8F95;
  const $52d13d33bd60c65a724bfd448491637f$var$RG16F = 0x822F;
  const $52d13d33bd60c65a724bfd448491637f$var$RG32F = 0x8230;
  const $52d13d33bd60c65a724bfd448491637f$var$RG8UI = 0x8238;
  const $52d13d33bd60c65a724bfd448491637f$var$RG8I = 0x8237;
  const $52d13d33bd60c65a724bfd448491637f$var$R16UI = 0x8234;
  const $52d13d33bd60c65a724bfd448491637f$var$R16I = 0x8233;
  const $52d13d33bd60c65a724bfd448491637f$var$R32UI = 0x8236;
  const $52d13d33bd60c65a724bfd448491637f$var$R32I = 0x8235;
  const $52d13d33bd60c65a724bfd448491637f$var$RGB8 = 0x8051;
  const $52d13d33bd60c65a724bfd448491637f$var$SRGB8 = 0x8C41;
  const $52d13d33bd60c65a724bfd448491637f$var$RGB565 = 0x8D62;
  const $52d13d33bd60c65a724bfd448491637f$var$RGB8_SNORM = 0x8F96;
  const $52d13d33bd60c65a724bfd448491637f$var$R11F_G11F_B10F = 0x8C3A;
  const $52d13d33bd60c65a724bfd448491637f$var$RGB9_E5 = 0x8C3D;
  const $52d13d33bd60c65a724bfd448491637f$var$RGB16F = 0x881B;
  const $52d13d33bd60c65a724bfd448491637f$var$RGB32F = 0x8815;
  const $52d13d33bd60c65a724bfd448491637f$var$RGB8UI = 0x8D7D;
  const $52d13d33bd60c65a724bfd448491637f$var$RGB8I = 0x8D8F;
  const $52d13d33bd60c65a724bfd448491637f$var$RGB16UI = 0x8D77;
  const $52d13d33bd60c65a724bfd448491637f$var$RGB16I = 0x8D89;
  const $52d13d33bd60c65a724bfd448491637f$var$RGB32UI = 0x8D71;
  const $52d13d33bd60c65a724bfd448491637f$var$RGB32I = 0x8D83;
  const $52d13d33bd60c65a724bfd448491637f$var$RGBA8 = 0x8058;
  const $52d13d33bd60c65a724bfd448491637f$var$SRGB8_ALPHA8 = 0x8C43;
  const $52d13d33bd60c65a724bfd448491637f$var$RGBA8_SNORM = 0x8F97;
  const $52d13d33bd60c65a724bfd448491637f$var$RGB5_A1 = 0x8057;
  const $52d13d33bd60c65a724bfd448491637f$var$RGBA4 = 0x8056;
  const $52d13d33bd60c65a724bfd448491637f$var$RGB10_A2 = 0x8059;
  const $52d13d33bd60c65a724bfd448491637f$var$RGBA16F = 0x881A;
  const $52d13d33bd60c65a724bfd448491637f$var$RGBA32F = 0x8814;
  const $52d13d33bd60c65a724bfd448491637f$var$RGBA8UI = 0x8D7C;
  const $52d13d33bd60c65a724bfd448491637f$var$RGBA8I = 0x8D8E;
  const $52d13d33bd60c65a724bfd448491637f$var$RGB10_A2UI = 0x906F;
  const $52d13d33bd60c65a724bfd448491637f$var$RGBA16UI = 0x8D76;
  const $52d13d33bd60c65a724bfd448491637f$var$RGBA16I = 0x8D88;
  const $52d13d33bd60c65a724bfd448491637f$var$RGBA32I = 0x8D82;
  const $52d13d33bd60c65a724bfd448491637f$var$RGBA32UI = 0x8D70;
  const $52d13d33bd60c65a724bfd448491637f$var$DEPTH_COMPONENT16 = 0x81A5;
  const $52d13d33bd60c65a724bfd448491637f$var$DEPTH_COMPONENT24 = 0x81A6;
  const $52d13d33bd60c65a724bfd448491637f$var$DEPTH_COMPONENT32F = 0x8CAC;
  const $52d13d33bd60c65a724bfd448491637f$var$DEPTH32F_STENCIL8 = 0x8CAD;
  const $52d13d33bd60c65a724bfd448491637f$var$DEPTH24_STENCIL8 = 0x88F0;
  /*DataType*/
  const $52d13d33bd60c65a724bfd448491637f$var$BYTE$2 = 0x1400;
  const $52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_BYTE$2 = 0x1401;
  const $52d13d33bd60c65a724bfd448491637f$var$SHORT$2 = 0x1402;
  const $52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_SHORT$2 = 0x1403;
  const $52d13d33bd60c65a724bfd448491637f$var$INT$2 = 0x1404;
  const $52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_INT$2 = 0x1405;
  const $52d13d33bd60c65a724bfd448491637f$var$FLOAT$2 = 0x1406;
  const $52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_SHORT_4_4_4_4$1 = 0x8033;
  const $52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_SHORT_5_5_5_1$1 = 0x8034;
  const $52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_SHORT_5_6_5$1 = 0x8363;
  const $52d13d33bd60c65a724bfd448491637f$var$HALF_FLOAT$1 = 0x140B;
  const $52d13d33bd60c65a724bfd448491637f$var$HALF_FLOAT_OES = 0x8D61;
  // Thanks Khronos for making this different >:(
  const $52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_INT_2_10_10_10_REV$1 = 0x8368;
  const $52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_INT_10F_11F_11F_REV$1 = 0x8C3B;
  const $52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_INT_5_9_9_9_REV$1 = 0x8C3E;
  const $52d13d33bd60c65a724bfd448491637f$var$FLOAT_32_UNSIGNED_INT_24_8_REV$1 = 0x8DAD;
  const $52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_INT_24_8$1 = 0x84FA;
  const $52d13d33bd60c65a724bfd448491637f$var$RG = 0x8227;
  const $52d13d33bd60c65a724bfd448491637f$var$RG_INTEGER = 0x8228;
  const $52d13d33bd60c65a724bfd448491637f$var$RED = 0x1903;
  const $52d13d33bd60c65a724bfd448491637f$var$RED_INTEGER = 0x8D94;
  const $52d13d33bd60c65a724bfd448491637f$var$RGB_INTEGER = 0x8D98;
  const $52d13d33bd60c65a724bfd448491637f$var$RGBA_INTEGER = 0x8D99;
  const $52d13d33bd60c65a724bfd448491637f$var$formatInfo = {};
  {
    // NOTE: this is named `numColorComponents` vs `numComponents` so we can let Uglify mangle
    // the name.
    const f = $52d13d33bd60c65a724bfd448491637f$var$formatInfo;
    f[$52d13d33bd60c65a724bfd448491637f$var$ALPHA] = {
      numColorComponents: 1
    };
    f[$52d13d33bd60c65a724bfd448491637f$var$LUMINANCE] = {
      numColorComponents: 1
    };
    f[$52d13d33bd60c65a724bfd448491637f$var$LUMINANCE_ALPHA] = {
      numColorComponents: 2
    };
    f[$52d13d33bd60c65a724bfd448491637f$var$RGB] = {
      numColorComponents: 3
    };
    f[$52d13d33bd60c65a724bfd448491637f$var$RGBA] = {
      numColorComponents: 4
    };
    f[$52d13d33bd60c65a724bfd448491637f$var$RED] = {
      numColorComponents: 1
    };
    f[$52d13d33bd60c65a724bfd448491637f$var$RED_INTEGER] = {
      numColorComponents: 1
    };
    f[$52d13d33bd60c65a724bfd448491637f$var$RG] = {
      numColorComponents: 2
    };
    f[$52d13d33bd60c65a724bfd448491637f$var$RG_INTEGER] = {
      numColorComponents: 2
    };
    f[$52d13d33bd60c65a724bfd448491637f$var$RGB] = {
      numColorComponents: 3
    };
    f[$52d13d33bd60c65a724bfd448491637f$var$RGB_INTEGER] = {
      numColorComponents: 3
    };
    f[$52d13d33bd60c65a724bfd448491637f$var$RGBA] = {
      numColorComponents: 4
    };
    f[$52d13d33bd60c65a724bfd448491637f$var$RGBA_INTEGER] = {
      numColorComponents: 4
    };
    f[$52d13d33bd60c65a724bfd448491637f$var$DEPTH_COMPONENT] = {
      numColorComponents: 1
    };
    f[$52d13d33bd60c65a724bfd448491637f$var$DEPTH_STENCIL] = {
      numColorComponents: 2
    };
      /**
    * @typedef {Object} TextureFormatDetails
    * @property {number} textureFormat format to pass texImage2D and similar functions.
    * @property {boolean} colorRenderable true if you can render to this format of texture.
    * @property {boolean} textureFilterable true if you can filter the texture, false if you can ony use `NEAREST`.
    * @property {number[]} type Array of possible types you can pass to texImage2D and similar function
    * @property {Object.<number,number>} bytesPerElementMap A map of types to bytes per element
    * @private
    */
}
  /**
  * @typedef {Object} TextureFormatDetails
  * @property {number} textureFormat format to pass texImage2D and similar functions.
  * @property {boolean} colorRenderable true if you can render to this format of texture.
  * @property {boolean} textureFilterable true if you can filter the texture, false if you can ony use `NEAREST`.
  * @property {number[]} type Array of possible types you can pass to texImage2D and similar function
  * @property {Object.<number,number>} bytesPerElementMap A map of types to bytes per element
  * @private
  */
  let $52d13d33bd60c65a724bfd448491637f$var$s_textureInternalFormatInfo;
  function $52d13d33bd60c65a724bfd448491637f$var$getTextureInternalFormatInfo(internalFormat) {
    if (!$52d13d33bd60c65a724bfd448491637f$var$s_textureInternalFormatInfo) {
      // NOTE: these properties need unique names so we can let Uglify mangle the name.
      const t = {};
      // unsized formats
      t[$52d13d33bd60c65a724bfd448491637f$var$ALPHA] = {
        textureFormat: $52d13d33bd60c65a724bfd448491637f$var$ALPHA,
        colorRenderable: true,
        textureFilterable: true,
        bytesPerElement: [1, 2, 2, 4],
        type: [$52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_BYTE$2, $52d13d33bd60c65a724bfd448491637f$var$HALF_FLOAT$1, $52d13d33bd60c65a724bfd448491637f$var$HALF_FLOAT_OES, $52d13d33bd60c65a724bfd448491637f$var$FLOAT$2]
      };
      t[$52d13d33bd60c65a724bfd448491637f$var$LUMINANCE] = {
        textureFormat: $52d13d33bd60c65a724bfd448491637f$var$LUMINANCE,
        colorRenderable: true,
        textureFilterable: true,
        bytesPerElement: [1, 2, 2, 4],
        type: [$52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_BYTE$2, $52d13d33bd60c65a724bfd448491637f$var$HALF_FLOAT$1, $52d13d33bd60c65a724bfd448491637f$var$HALF_FLOAT_OES, $52d13d33bd60c65a724bfd448491637f$var$FLOAT$2]
      };
      t[$52d13d33bd60c65a724bfd448491637f$var$LUMINANCE_ALPHA] = {
        textureFormat: $52d13d33bd60c65a724bfd448491637f$var$LUMINANCE_ALPHA,
        colorRenderable: true,
        textureFilterable: true,
        bytesPerElement: [2, 4, 4, 8],
        type: [$52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_BYTE$2, $52d13d33bd60c65a724bfd448491637f$var$HALF_FLOAT$1, $52d13d33bd60c65a724bfd448491637f$var$HALF_FLOAT_OES, $52d13d33bd60c65a724bfd448491637f$var$FLOAT$2]
      };
      t[$52d13d33bd60c65a724bfd448491637f$var$RGB] = {
        textureFormat: $52d13d33bd60c65a724bfd448491637f$var$RGB,
        colorRenderable: true,
        textureFilterable: true,
        bytesPerElement: [3, 6, 6, 12, 2],
        type: [$52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_BYTE$2, $52d13d33bd60c65a724bfd448491637f$var$HALF_FLOAT$1, $52d13d33bd60c65a724bfd448491637f$var$HALF_FLOAT_OES, $52d13d33bd60c65a724bfd448491637f$var$FLOAT$2, $52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_SHORT_5_6_5$1]
      };
      t[$52d13d33bd60c65a724bfd448491637f$var$RGBA] = {
        textureFormat: $52d13d33bd60c65a724bfd448491637f$var$RGBA,
        colorRenderable: true,
        textureFilterable: true,
        bytesPerElement: [4, 8, 8, 16, 2, 2],
        type: [$52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_BYTE$2, $52d13d33bd60c65a724bfd448491637f$var$HALF_FLOAT$1, $52d13d33bd60c65a724bfd448491637f$var$HALF_FLOAT_OES, $52d13d33bd60c65a724bfd448491637f$var$FLOAT$2, $52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_SHORT_4_4_4_4$1, $52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_SHORT_5_5_5_1$1]
      };
      t[$52d13d33bd60c65a724bfd448491637f$var$DEPTH_COMPONENT] = {
        textureFormat: $52d13d33bd60c65a724bfd448491637f$var$DEPTH_COMPONENT,
        colorRenderable: true,
        textureFilterable: false,
        bytesPerElement: [2, 4],
        type: [$52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_INT$2, $52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_SHORT$2]
      };
      // sized formats
      t[$52d13d33bd60c65a724bfd448491637f$var$R8] = {
        textureFormat: $52d13d33bd60c65a724bfd448491637f$var$RED,
        colorRenderable: true,
        textureFilterable: true,
        bytesPerElement: [1],
        type: [$52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_BYTE$2]
      };
      t[$52d13d33bd60c65a724bfd448491637f$var$R8_SNORM] = {
        textureFormat: $52d13d33bd60c65a724bfd448491637f$var$RED,
        colorRenderable: false,
        textureFilterable: true,
        bytesPerElement: [1],
        type: [$52d13d33bd60c65a724bfd448491637f$var$BYTE$2]
      };
      t[$52d13d33bd60c65a724bfd448491637f$var$R16F] = {
        textureFormat: $52d13d33bd60c65a724bfd448491637f$var$RED,
        colorRenderable: false,
        textureFilterable: true,
        bytesPerElement: [4, 2],
        type: [$52d13d33bd60c65a724bfd448491637f$var$FLOAT$2, $52d13d33bd60c65a724bfd448491637f$var$HALF_FLOAT$1]
      };
      t[$52d13d33bd60c65a724bfd448491637f$var$R32F] = {
        textureFormat: $52d13d33bd60c65a724bfd448491637f$var$RED,
        colorRenderable: false,
        textureFilterable: false,
        bytesPerElement: [4],
        type: [$52d13d33bd60c65a724bfd448491637f$var$FLOAT$2]
      };
      t[$52d13d33bd60c65a724bfd448491637f$var$R8UI] = {
        textureFormat: $52d13d33bd60c65a724bfd448491637f$var$RED_INTEGER,
        colorRenderable: true,
        textureFilterable: false,
        bytesPerElement: [1],
        type: [$52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_BYTE$2]
      };
      t[$52d13d33bd60c65a724bfd448491637f$var$R8I] = {
        textureFormat: $52d13d33bd60c65a724bfd448491637f$var$RED_INTEGER,
        colorRenderable: true,
        textureFilterable: false,
        bytesPerElement: [1],
        type: [$52d13d33bd60c65a724bfd448491637f$var$BYTE$2]
      };
      t[$52d13d33bd60c65a724bfd448491637f$var$R16UI] = {
        textureFormat: $52d13d33bd60c65a724bfd448491637f$var$RED_INTEGER,
        colorRenderable: true,
        textureFilterable: false,
        bytesPerElement: [2],
        type: [$52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_SHORT$2]
      };
      t[$52d13d33bd60c65a724bfd448491637f$var$R16I] = {
        textureFormat: $52d13d33bd60c65a724bfd448491637f$var$RED_INTEGER,
        colorRenderable: true,
        textureFilterable: false,
        bytesPerElement: [2],
        type: [$52d13d33bd60c65a724bfd448491637f$var$SHORT$2]
      };
      t[$52d13d33bd60c65a724bfd448491637f$var$R32UI] = {
        textureFormat: $52d13d33bd60c65a724bfd448491637f$var$RED_INTEGER,
        colorRenderable: true,
        textureFilterable: false,
        bytesPerElement: [4],
        type: [$52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_INT$2]
      };
      t[$52d13d33bd60c65a724bfd448491637f$var$R32I] = {
        textureFormat: $52d13d33bd60c65a724bfd448491637f$var$RED_INTEGER,
        colorRenderable: true,
        textureFilterable: false,
        bytesPerElement: [4],
        type: [$52d13d33bd60c65a724bfd448491637f$var$INT$2]
      };
      t[$52d13d33bd60c65a724bfd448491637f$var$RG8] = {
        textureFormat: $52d13d33bd60c65a724bfd448491637f$var$RG,
        colorRenderable: true,
        textureFilterable: true,
        bytesPerElement: [2],
        type: [$52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_BYTE$2]
      };
      t[$52d13d33bd60c65a724bfd448491637f$var$RG8_SNORM] = {
        textureFormat: $52d13d33bd60c65a724bfd448491637f$var$RG,
        colorRenderable: false,
        textureFilterable: true,
        bytesPerElement: [2],
        type: [$52d13d33bd60c65a724bfd448491637f$var$BYTE$2]
      };
      t[$52d13d33bd60c65a724bfd448491637f$var$RG16F] = {
        textureFormat: $52d13d33bd60c65a724bfd448491637f$var$RG,
        colorRenderable: false,
        textureFilterable: true,
        bytesPerElement: [8, 4],
        type: [$52d13d33bd60c65a724bfd448491637f$var$FLOAT$2, $52d13d33bd60c65a724bfd448491637f$var$HALF_FLOAT$1]
      };
      t[$52d13d33bd60c65a724bfd448491637f$var$RG32F] = {
        textureFormat: $52d13d33bd60c65a724bfd448491637f$var$RG,
        colorRenderable: false,
        textureFilterable: false,
        bytesPerElement: [8],
        type: [$52d13d33bd60c65a724bfd448491637f$var$FLOAT$2]
      };
      t[$52d13d33bd60c65a724bfd448491637f$var$RG8UI] = {
        textureFormat: $52d13d33bd60c65a724bfd448491637f$var$RG_INTEGER,
        colorRenderable: true,
        textureFilterable: false,
        bytesPerElement: [2],
        type: [$52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_BYTE$2]
      };
      t[$52d13d33bd60c65a724bfd448491637f$var$RG8I] = {
        textureFormat: $52d13d33bd60c65a724bfd448491637f$var$RG_INTEGER,
        colorRenderable: true,
        textureFilterable: false,
        bytesPerElement: [2],
        type: [$52d13d33bd60c65a724bfd448491637f$var$BYTE$2]
      };
      t[$52d13d33bd60c65a724bfd448491637f$var$RG16UI] = {
        textureFormat: $52d13d33bd60c65a724bfd448491637f$var$RG_INTEGER,
        colorRenderable: true,
        textureFilterable: false,
        bytesPerElement: [4],
        type: [$52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_SHORT$2]
      };
      t[$52d13d33bd60c65a724bfd448491637f$var$RG16I] = {
        textureFormat: $52d13d33bd60c65a724bfd448491637f$var$RG_INTEGER,
        colorRenderable: true,
        textureFilterable: false,
        bytesPerElement: [4],
        type: [$52d13d33bd60c65a724bfd448491637f$var$SHORT$2]
      };
      t[$52d13d33bd60c65a724bfd448491637f$var$RG32UI] = {
        textureFormat: $52d13d33bd60c65a724bfd448491637f$var$RG_INTEGER,
        colorRenderable: true,
        textureFilterable: false,
        bytesPerElement: [8],
        type: [$52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_INT$2]
      };
      t[$52d13d33bd60c65a724bfd448491637f$var$RG32I] = {
        textureFormat: $52d13d33bd60c65a724bfd448491637f$var$RG_INTEGER,
        colorRenderable: true,
        textureFilterable: false,
        bytesPerElement: [8],
        type: [$52d13d33bd60c65a724bfd448491637f$var$INT$2]
      };
      t[$52d13d33bd60c65a724bfd448491637f$var$RGB8] = {
        textureFormat: $52d13d33bd60c65a724bfd448491637f$var$RGB,
        colorRenderable: true,
        textureFilterable: true,
        bytesPerElement: [3],
        type: [$52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_BYTE$2]
      };
      t[$52d13d33bd60c65a724bfd448491637f$var$SRGB8] = {
        textureFormat: $52d13d33bd60c65a724bfd448491637f$var$RGB,
        colorRenderable: false,
        textureFilterable: true,
        bytesPerElement: [3],
        type: [$52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_BYTE$2]
      };
      t[$52d13d33bd60c65a724bfd448491637f$var$RGB565] = {
        textureFormat: $52d13d33bd60c65a724bfd448491637f$var$RGB,
        colorRenderable: true,
        textureFilterable: true,
        bytesPerElement: [3, 2],
        type: [$52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_BYTE$2, $52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_SHORT_5_6_5$1]
      };
      t[$52d13d33bd60c65a724bfd448491637f$var$RGB8_SNORM] = {
        textureFormat: $52d13d33bd60c65a724bfd448491637f$var$RGB,
        colorRenderable: false,
        textureFilterable: true,
        bytesPerElement: [3],
        type: [$52d13d33bd60c65a724bfd448491637f$var$BYTE$2]
      };
      t[$52d13d33bd60c65a724bfd448491637f$var$R11F_G11F_B10F] = {
        textureFormat: $52d13d33bd60c65a724bfd448491637f$var$RGB,
        colorRenderable: false,
        textureFilterable: true,
        bytesPerElement: [12, 6, 4],
        type: [$52d13d33bd60c65a724bfd448491637f$var$FLOAT$2, $52d13d33bd60c65a724bfd448491637f$var$HALF_FLOAT$1, $52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_INT_10F_11F_11F_REV$1]
      };
      t[$52d13d33bd60c65a724bfd448491637f$var$RGB9_E5] = {
        textureFormat: $52d13d33bd60c65a724bfd448491637f$var$RGB,
        colorRenderable: false,
        textureFilterable: true,
        bytesPerElement: [12, 6, 4],
        type: [$52d13d33bd60c65a724bfd448491637f$var$FLOAT$2, $52d13d33bd60c65a724bfd448491637f$var$HALF_FLOAT$1, $52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_INT_5_9_9_9_REV$1]
      };
      t[$52d13d33bd60c65a724bfd448491637f$var$RGB16F] = {
        textureFormat: $52d13d33bd60c65a724bfd448491637f$var$RGB,
        colorRenderable: false,
        textureFilterable: true,
        bytesPerElement: [12, 6],
        type: [$52d13d33bd60c65a724bfd448491637f$var$FLOAT$2, $52d13d33bd60c65a724bfd448491637f$var$HALF_FLOAT$1]
      };
      t[$52d13d33bd60c65a724bfd448491637f$var$RGB32F] = {
        textureFormat: $52d13d33bd60c65a724bfd448491637f$var$RGB,
        colorRenderable: false,
        textureFilterable: false,
        bytesPerElement: [12],
        type: [$52d13d33bd60c65a724bfd448491637f$var$FLOAT$2]
      };
      t[$52d13d33bd60c65a724bfd448491637f$var$RGB8UI] = {
        textureFormat: $52d13d33bd60c65a724bfd448491637f$var$RGB_INTEGER,
        colorRenderable: false,
        textureFilterable: false,
        bytesPerElement: [3],
        type: [$52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_BYTE$2]
      };
      t[$52d13d33bd60c65a724bfd448491637f$var$RGB8I] = {
        textureFormat: $52d13d33bd60c65a724bfd448491637f$var$RGB_INTEGER,
        colorRenderable: false,
        textureFilterable: false,
        bytesPerElement: [3],
        type: [$52d13d33bd60c65a724bfd448491637f$var$BYTE$2]
      };
      t[$52d13d33bd60c65a724bfd448491637f$var$RGB16UI] = {
        textureFormat: $52d13d33bd60c65a724bfd448491637f$var$RGB_INTEGER,
        colorRenderable: false,
        textureFilterable: false,
        bytesPerElement: [6],
        type: [$52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_SHORT$2]
      };
      t[$52d13d33bd60c65a724bfd448491637f$var$RGB16I] = {
        textureFormat: $52d13d33bd60c65a724bfd448491637f$var$RGB_INTEGER,
        colorRenderable: false,
        textureFilterable: false,
        bytesPerElement: [6],
        type: [$52d13d33bd60c65a724bfd448491637f$var$SHORT$2]
      };
      t[$52d13d33bd60c65a724bfd448491637f$var$RGB32UI] = {
        textureFormat: $52d13d33bd60c65a724bfd448491637f$var$RGB_INTEGER,
        colorRenderable: false,
        textureFilterable: false,
        bytesPerElement: [12],
        type: [$52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_INT$2]
      };
      t[$52d13d33bd60c65a724bfd448491637f$var$RGB32I] = {
        textureFormat: $52d13d33bd60c65a724bfd448491637f$var$RGB_INTEGER,
        colorRenderable: false,
        textureFilterable: false,
        bytesPerElement: [12],
        type: [$52d13d33bd60c65a724bfd448491637f$var$INT$2]
      };
      t[$52d13d33bd60c65a724bfd448491637f$var$RGBA8] = {
        textureFormat: $52d13d33bd60c65a724bfd448491637f$var$RGBA,
        colorRenderable: true,
        textureFilterable: true,
        bytesPerElement: [4],
        type: [$52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_BYTE$2]
      };
      t[$52d13d33bd60c65a724bfd448491637f$var$SRGB8_ALPHA8] = {
        textureFormat: $52d13d33bd60c65a724bfd448491637f$var$RGBA,
        colorRenderable: true,
        textureFilterable: true,
        bytesPerElement: [4],
        type: [$52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_BYTE$2]
      };
      t[$52d13d33bd60c65a724bfd448491637f$var$RGBA8_SNORM] = {
        textureFormat: $52d13d33bd60c65a724bfd448491637f$var$RGBA,
        colorRenderable: false,
        textureFilterable: true,
        bytesPerElement: [4],
        type: [$52d13d33bd60c65a724bfd448491637f$var$BYTE$2]
      };
      t[$52d13d33bd60c65a724bfd448491637f$var$RGB5_A1] = {
        textureFormat: $52d13d33bd60c65a724bfd448491637f$var$RGBA,
        colorRenderable: true,
        textureFilterable: true,
        bytesPerElement: [4, 2, 4],
        type: [$52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_BYTE$2, $52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_SHORT_5_5_5_1$1, $52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_INT_2_10_10_10_REV$1]
      };
      t[$52d13d33bd60c65a724bfd448491637f$var$RGBA4] = {
        textureFormat: $52d13d33bd60c65a724bfd448491637f$var$RGBA,
        colorRenderable: true,
        textureFilterable: true,
        bytesPerElement: [4, 2],
        type: [$52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_BYTE$2, $52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_SHORT_4_4_4_4$1]
      };
      t[$52d13d33bd60c65a724bfd448491637f$var$RGB10_A2] = {
        textureFormat: $52d13d33bd60c65a724bfd448491637f$var$RGBA,
        colorRenderable: true,
        textureFilterable: true,
        bytesPerElement: [4],
        type: [$52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_INT_2_10_10_10_REV$1]
      };
      t[$52d13d33bd60c65a724bfd448491637f$var$RGBA16F] = {
        textureFormat: $52d13d33bd60c65a724bfd448491637f$var$RGBA,
        colorRenderable: false,
        textureFilterable: true,
        bytesPerElement: [16, 8],
        type: [$52d13d33bd60c65a724bfd448491637f$var$FLOAT$2, $52d13d33bd60c65a724bfd448491637f$var$HALF_FLOAT$1]
      };
      t[$52d13d33bd60c65a724bfd448491637f$var$RGBA32F] = {
        textureFormat: $52d13d33bd60c65a724bfd448491637f$var$RGBA,
        colorRenderable: false,
        textureFilterable: false,
        bytesPerElement: [16],
        type: [$52d13d33bd60c65a724bfd448491637f$var$FLOAT$2]
      };
      t[$52d13d33bd60c65a724bfd448491637f$var$RGBA8UI] = {
        textureFormat: $52d13d33bd60c65a724bfd448491637f$var$RGBA_INTEGER,
        colorRenderable: true,
        textureFilterable: false,
        bytesPerElement: [4],
        type: [$52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_BYTE$2]
      };
      t[$52d13d33bd60c65a724bfd448491637f$var$RGBA8I] = {
        textureFormat: $52d13d33bd60c65a724bfd448491637f$var$RGBA_INTEGER,
        colorRenderable: true,
        textureFilterable: false,
        bytesPerElement: [4],
        type: [$52d13d33bd60c65a724bfd448491637f$var$BYTE$2]
      };
      t[$52d13d33bd60c65a724bfd448491637f$var$RGB10_A2UI] = {
        textureFormat: $52d13d33bd60c65a724bfd448491637f$var$RGBA_INTEGER,
        colorRenderable: true,
        textureFilterable: false,
        bytesPerElement: [4],
        type: [$52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_INT_2_10_10_10_REV$1]
      };
      t[$52d13d33bd60c65a724bfd448491637f$var$RGBA16UI] = {
        textureFormat: $52d13d33bd60c65a724bfd448491637f$var$RGBA_INTEGER,
        colorRenderable: true,
        textureFilterable: false,
        bytesPerElement: [8],
        type: [$52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_SHORT$2]
      };
      t[$52d13d33bd60c65a724bfd448491637f$var$RGBA16I] = {
        textureFormat: $52d13d33bd60c65a724bfd448491637f$var$RGBA_INTEGER,
        colorRenderable: true,
        textureFilterable: false,
        bytesPerElement: [8],
        type: [$52d13d33bd60c65a724bfd448491637f$var$SHORT$2]
      };
      t[$52d13d33bd60c65a724bfd448491637f$var$RGBA32I] = {
        textureFormat: $52d13d33bd60c65a724bfd448491637f$var$RGBA_INTEGER,
        colorRenderable: true,
        textureFilterable: false,
        bytesPerElement: [16],
        type: [$52d13d33bd60c65a724bfd448491637f$var$INT$2]
      };
      t[$52d13d33bd60c65a724bfd448491637f$var$RGBA32UI] = {
        textureFormat: $52d13d33bd60c65a724bfd448491637f$var$RGBA_INTEGER,
        colorRenderable: true,
        textureFilterable: false,
        bytesPerElement: [16],
        type: [$52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_INT$2]
      };
      // Sized Internal
      t[$52d13d33bd60c65a724bfd448491637f$var$DEPTH_COMPONENT16] = {
        textureFormat: $52d13d33bd60c65a724bfd448491637f$var$DEPTH_COMPONENT,
        colorRenderable: true,
        textureFilterable: false,
        bytesPerElement: [2, 4],
        type: [$52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_SHORT$2, $52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_INT$2]
      };
      t[$52d13d33bd60c65a724bfd448491637f$var$DEPTH_COMPONENT24] = {
        textureFormat: $52d13d33bd60c65a724bfd448491637f$var$DEPTH_COMPONENT,
        colorRenderable: true,
        textureFilterable: false,
        bytesPerElement: [4],
        type: [$52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_INT$2]
      };
      t[$52d13d33bd60c65a724bfd448491637f$var$DEPTH_COMPONENT32F] = {
        textureFormat: $52d13d33bd60c65a724bfd448491637f$var$DEPTH_COMPONENT,
        colorRenderable: true,
        textureFilterable: false,
        bytesPerElement: [4],
        type: [$52d13d33bd60c65a724bfd448491637f$var$FLOAT$2]
      };
      t[$52d13d33bd60c65a724bfd448491637f$var$DEPTH24_STENCIL8] = {
        textureFormat: $52d13d33bd60c65a724bfd448491637f$var$DEPTH_STENCIL,
        colorRenderable: true,
        textureFilterable: false,
        bytesPerElement: [4],
        type: [$52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_INT_24_8$1]
      };
      t[$52d13d33bd60c65a724bfd448491637f$var$DEPTH32F_STENCIL8] = {
        textureFormat: $52d13d33bd60c65a724bfd448491637f$var$DEPTH_STENCIL,
        colorRenderable: true,
        textureFilterable: false,
        bytesPerElement: [4],
        type: [$52d13d33bd60c65a724bfd448491637f$var$FLOAT_32_UNSIGNED_INT_24_8_REV$1]
      };
      Object.keys(t).forEach(function (internalFormat) {
        const info = t[internalFormat];
        info.bytesPerElementMap = {};
        info.bytesPerElement.forEach(function (bytesPerElement, ndx) {
          const type = info.type[ndx];
          info.bytesPerElementMap[type] = bytesPerElement;
        });
      });
      $52d13d33bd60c65a724bfd448491637f$var$s_textureInternalFormatInfo = t;
    }
    return $52d13d33bd60c65a724bfd448491637f$var$s_textureInternalFormatInfo[internalFormat];
  }
  /**
  * Gets the number of bytes per element for a given internalFormat / type
  * @param {number} internalFormat The internalFormat parameter from texImage2D etc..
  * @param {number} type The type parameter for texImage2D etc..
  * @return {number} the number of bytes per element for the given internalFormat, type combo
  * @memberOf module:twgl/textures
  */
  function $52d13d33bd60c65a724bfd448491637f$export$getBytesPerElementForInternalFormat(internalFormat, type) {
    const info = $52d13d33bd60c65a724bfd448491637f$var$getTextureInternalFormatInfo(internalFormat);
    if (!info) {
      throw "unknown internal format";
    }
    const bytesPerElement = info.bytesPerElementMap[type];
    if (bytesPerElement === undefined) {
      throw "unknown internal format";
    }
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
  */
  /**
  * Gets the format and type for a given internalFormat
  *
  * @param {number} internalFormat The internal format
  * @return {module:twgl/textures.TextureFormatInfo} the corresponding format and type,
  * @memberOf module:twgl/textures
  */
  function $52d13d33bd60c65a724bfd448491637f$export$getFormatAndTypeForInternalFormat(internalFormat) {
    const info = $52d13d33bd60c65a724bfd448491637f$var$getTextureInternalFormatInfo(internalFormat);
    if (!info) {
      throw "unknown internal format";
    }
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
  */
  function $52d13d33bd60c65a724bfd448491637f$var$isPowerOf2(value) {
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
  */
  function $52d13d33bd60c65a724bfd448491637f$export$canGenerateMipmap(gl, width, height, internalFormat) {
    if (!$52d13d33bd60c65a724bfd448491637f$export$isWebGL2(gl)) {
      return $52d13d33bd60c65a724bfd448491637f$var$isPowerOf2(width) && $52d13d33bd60c65a724bfd448491637f$var$isPowerOf2(height);
    }
    const info = $52d13d33bd60c65a724bfd448491637f$var$getTextureInternalFormatInfo(internalFormat);
    if (!info) {
      throw "unknown internal format";
    }
    return info.colorRenderable && info.textureFilterable;
  }
  /**
  * Gets whether or not we can generate mips for the given format
  * @param {number} internalFormat The internalFormat parameter from texImage2D etc..
  * @return {boolean} true if we can generate mips
  * @memberOf module:twgl/textures
  */
  function $52d13d33bd60c65a724bfd448491637f$export$canFilter(internalFormat) {
    const info = $52d13d33bd60c65a724bfd448491637f$var$getTextureInternalFormatInfo(internalFormat);
    if (!info) {
      throw "unknown internal format";
    }
    return info.textureFilterable;
  }
  /**
  * Gets the number of components for a given image format.
  * @param {number} format the format.
  * @return {number} the number of components for the format.
  * @memberOf module:twgl/textures
  */
  function $52d13d33bd60c65a724bfd448491637f$export$getNumComponentsForFormat(format) {
    const info = $52d13d33bd60c65a724bfd448491637f$var$formatInfo[format];
    if (!info) {
      throw "unknown format: " + format;
    }
    return info.numColorComponents;
  }
  /**
  * Gets the texture type for a given array type.
  * @param {WebGLRenderingContext} gl the WebGLRenderingContext
  * @return {number} the gl texture type
  * @private
  */
  function $52d13d33bd60c65a724bfd448491637f$var$getTextureTypeForArrayType(gl, src, defaultType) {
    if ($52d13d33bd60c65a724bfd448491637f$var$isArrayBuffer$1(src)) {
      return $52d13d33bd60c65a724bfd448491637f$export$getGLTypeForTypedArray(src);
    }
    return defaultType || $52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_BYTE$2;
  }
  function $52d13d33bd60c65a724bfd448491637f$var$guessDimensions(gl, target, width, height, numElements) {
    if (numElements % 1 !== 0) {
      throw "can't guess dimensions";
    }
    if (!width && !height) {
      const size = Math.sqrt(numElements / (target === $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_CUBE_MAP ? 6 : 1));
      if (size % 1 === 0) {
        width = size;
        height = size;
      } else {
        width = numElements;
        height = 1;
      }
    } else if (!height) {
      height = numElements / width;
      if (height % 1) {
        throw "can't guess dimensions";
      }
    } else if (!width) {
      width = numElements / height;
      if (width % 1) {
        throw "can't guess dimensions";
      }
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
  */
  function $52d13d33bd60c65a724bfd448491637f$export$setDefaultTextureColor(color) {
    $52d13d33bd60c65a724bfd448491637f$var$defaults$1.textureColor = new Uint8Array([color[0] * 255, color[1] * 255, color[2] * 255, color[3] * 255]);
  }
  function $52d13d33bd60c65a724bfd448491637f$export$setTextureDefaults_(newDefaults) {
    $52d13d33bd60c65a724bfd448491637f$var$copyExistingProperties(newDefaults, $52d13d33bd60c65a724bfd448491637f$var$defaults$1);
    if (newDefaults.textureColor) {
      $52d13d33bd60c65a724bfd448491637f$export$setDefaultTextureColor(newDefaults.textureColor);
    }
  }
  /**
  * A function to generate the source for a texture.
  * @callback TextureFunc
  * @param {WebGLRenderingContext} gl A WebGLRenderingContext
  * @param {module:twgl.TextureOptions} options the texture options
  * @return {*} Returns any of the things documented for `src` for {@link module:twgl.TextureOptions}.
  * @memberOf module:twgl
  */
  /**
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
  */
  /**
  * Sets any packing state that will be set based on the options.
  * @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
  * @param {WebGLRenderingContext} gl the WebGLRenderingContext
  * @private
  */
  function $52d13d33bd60c65a724bfd448491637f$var$setPackState(gl, options) {
    if (options.colorspaceConversion !== undefined) {
      gl.pixelStorei($52d13d33bd60c65a724bfd448491637f$var$UNPACK_COLORSPACE_CONVERSION_WEBGL, options.colorspaceConversion);
    }
    if (options.premultiplyAlpha !== undefined) {
      gl.pixelStorei($52d13d33bd60c65a724bfd448491637f$var$UNPACK_PREMULTIPLY_ALPHA_WEBGL, options.premultiplyAlpha);
    }
    if (options.flipY !== undefined) {
      gl.pixelStorei($52d13d33bd60c65a724bfd448491637f$var$UNPACK_FLIP_Y_WEBGL, options.flipY);
    }
  }
  /**
  * Set skip state to defaults
  * @param {WebGLRenderingContext} gl the WebGLRenderingContext
  * @private
  */
  function $52d13d33bd60c65a724bfd448491637f$var$setSkipStateToDefault(gl) {
    gl.pixelStorei($52d13d33bd60c65a724bfd448491637f$var$UNPACK_ALIGNMENT, 4);
    if ($52d13d33bd60c65a724bfd448491637f$export$isWebGL2(gl)) {
      gl.pixelStorei($52d13d33bd60c65a724bfd448491637f$var$UNPACK_ROW_LENGTH, 0);
      gl.pixelStorei($52d13d33bd60c65a724bfd448491637f$var$UNPACK_IMAGE_HEIGHT, 0);
      gl.pixelStorei($52d13d33bd60c65a724bfd448491637f$var$UNPACK_SKIP_PIXELS, 0);
      gl.pixelStorei($52d13d33bd60c65a724bfd448491637f$var$UNPACK_SKIP_ROWS, 0);
      gl.pixelStorei($52d13d33bd60c65a724bfd448491637f$var$UNPACK_SKIP_IMAGES, 0);
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
  */
  function $52d13d33bd60c65a724bfd448491637f$var$setTextureSamplerParameters(gl, target, parameteriFn, options) {
    if (options.minMag) {
      parameteriFn.call(gl, target, $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_MIN_FILTER, options.minMag);
      parameteriFn.call(gl, target, $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_MAG_FILTER, options.minMag);
    }
    if (options.min) {
      parameteriFn.call(gl, target, $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_MIN_FILTER, options.min);
    }
    if (options.mag) {
      parameteriFn.call(gl, target, $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_MAG_FILTER, options.mag);
    }
    if (options.wrap) {
      parameteriFn.call(gl, target, $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_WRAP_S, options.wrap);
      parameteriFn.call(gl, target, $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_WRAP_T, options.wrap);
      if (target === $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_3D || $52d13d33bd60c65a724bfd448491637f$var$isSampler(gl, target)) {
        parameteriFn.call(gl, target, $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_WRAP_R, options.wrap);
      }
    }
    if (options.wrapR) {
      parameteriFn.call(gl, target, $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_WRAP_R, options.wrapR);
    }
    if (options.wrapS) {
      parameteriFn.call(gl, target, $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_WRAP_S, options.wrapS);
    }
    if (options.wrapT) {
      parameteriFn.call(gl, target, $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_WRAP_T, options.wrapT);
    }
    if (options.minLod) {
      parameteriFn.call(gl, target, $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_MIN_LOD, options.minLod);
    }
    if (options.maxLod) {
      parameteriFn.call(gl, target, $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_MAX_LOD, options.maxLod);
    }
    if (options.baseLevel) {
      parameteriFn.call(gl, target, $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_BASE_LEVEL, options.baseLevel);
    }
    if (options.maxLevel) {
      parameteriFn.call(gl, target, $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_MAX_LEVEL, options.maxLevel);
    }
  }
  /**
  * Sets the texture parameters of a texture.
  * @param {WebGLRenderingContext} gl the WebGLRenderingContext
  * @param {WebGLTexture} tex the WebGLTexture to set parameters for
  * @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
  *   This is often the same options you passed in when you created the texture.
  * @memberOf module:twgl/textures
  */
  function $52d13d33bd60c65a724bfd448491637f$export$setTextureParameters(gl, tex, options) {
    const target = options.target || $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_2D;
    gl.bindTexture(target, tex);
    $52d13d33bd60c65a724bfd448491637f$var$setTextureSamplerParameters(gl, target, gl.texParameteri, options);
  }
  /**
  * Sets the sampler parameters of a sampler.
  * @param {WebGLRenderingContext} gl the WebGLRenderingContext
  * @param {WebGLSampler} sampler the WebGLSampler to set parameters for
  * @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
  * @memberOf module:twgl/textures
  */
  function $52d13d33bd60c65a724bfd448491637f$export$setSamplerParameters(gl, sampler, options) {
    $52d13d33bd60c65a724bfd448491637f$var$setTextureSamplerParameters(gl, sampler, gl.samplerParameteri, options);
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
  */
  function $52d13d33bd60c65a724bfd448491637f$export$createSampler(gl, options) {
    const sampler = gl.createSampler();
    $52d13d33bd60c65a724bfd448491637f$export$setSamplerParameters(gl, sampler, options);
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
  */
  function $52d13d33bd60c65a724bfd448491637f$export$createSamplers(gl, samplerOptions) {
    const samplers = {};
    Object.keys(samplerOptions).forEach(function (name) {
      samplers[name] = $52d13d33bd60c65a724bfd448491637f$export$createSampler(gl, samplerOptions[name]);
    });
    return samplers;
  }
  /**
  * Makes a 1x1 pixel
  * If no color is passed in uses the default color which can be set by calling `setDefaultTextureColor`.
  * @param {(number[]|ArrayBufferView)} [color] The color using 0-1 values
  * @return {Uint8Array} Unit8Array with color.
  * @private
  */
  function $52d13d33bd60c65a724bfd448491637f$var$make1Pixel(color) {
    color = color || $52d13d33bd60c65a724bfd448491637f$var$defaults$1.textureColor;
    if ($52d13d33bd60c65a724bfd448491637f$var$isArrayBuffer$1(color)) {
      return color;
    }
    return new Uint8Array([color[0] * 255, color[1] * 255, color[2] * 255, color[3] * 255]);
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
  */
  function $52d13d33bd60c65a724bfd448491637f$export$setTextureFilteringForSize(gl, tex, options, width, height, internalFormat) {
    options = options || $52d13d33bd60c65a724bfd448491637f$var$defaults$1.textureOptions;
    internalFormat = internalFormat || $52d13d33bd60c65a724bfd448491637f$var$RGBA;
    const target = options.target || $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_2D;
    width = width || options.width;
    height = height || options.height;
    gl.bindTexture(target, tex);
    if ($52d13d33bd60c65a724bfd448491637f$export$canGenerateMipmap(gl, width, height, internalFormat)) {
      gl.generateMipmap(target);
    } else {
      const filtering = $52d13d33bd60c65a724bfd448491637f$export$canFilter(internalFormat) ? $52d13d33bd60c65a724bfd448491637f$var$LINEAR : $52d13d33bd60c65a724bfd448491637f$var$NEAREST;
      gl.texParameteri(target, $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_MIN_FILTER, filtering);
      gl.texParameteri(target, $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_MAG_FILTER, filtering);
      gl.texParameteri(target, $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_WRAP_S, $52d13d33bd60c65a724bfd448491637f$var$CLAMP_TO_EDGE);
      gl.texParameteri(target, $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_WRAP_T, $52d13d33bd60c65a724bfd448491637f$var$CLAMP_TO_EDGE);
    }
  }
  function $52d13d33bd60c65a724bfd448491637f$var$shouldAutomaticallySetTextureFilteringForSize(options) {
    return options.auto === true || options.auto === undefined && options.level === undefined;
  }
  /**
  * Gets an array of cubemap face enums
  * @param {WebGLRenderingContext} gl the WebGLRenderingContext
  * @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
  *   This is often the same options you passed in when you created the texture.
  * @return {number[]} cubemap face enums
  * @private
  */
  function $52d13d33bd60c65a724bfd448491637f$var$getCubeFaceOrder(gl, options) {
    options = options || ({});
    return options.cubeFaceOrder || [$52d13d33bd60c65a724bfd448491637f$var$TEXTURE_CUBE_MAP_POSITIVE_X, $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_CUBE_MAP_NEGATIVE_X, $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_CUBE_MAP_POSITIVE_Y, $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_CUBE_MAP_NEGATIVE_Y, $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_CUBE_MAP_POSITIVE_Z, $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_CUBE_MAP_NEGATIVE_Z];
  }
  /**
  * @typedef {Object} FaceInfo
  * @property {number} face gl enum for texImage2D
  * @property {number} ndx face index (0 - 5) into source data
  * @ignore
  */
  /**
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
  */
  function $52d13d33bd60c65a724bfd448491637f$var$getCubeFacesWithNdx(gl, options) {
    const faces = $52d13d33bd60c65a724bfd448491637f$var$getCubeFaceOrder(gl, options);
    // work around bug in NVidia drivers. We have to upload the first face first else the driver crashes :(
    const facesWithNdx = faces.map(function (face, ndx) {
      return {
        face: face,
        ndx: ndx
      };
    });
    facesWithNdx.sort(function (a, b) {
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
  */
  function $52d13d33bd60c65a724bfd448491637f$export$setTextureFromElement(gl, tex, element, options) {
    options = options || $52d13d33bd60c65a724bfd448491637f$var$defaults$1.textureOptions;
    const target = options.target || $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_2D;
    const level = options.level || 0;
    let width = element.width;
    let height = element.height;
    const internalFormat = options.internalFormat || options.format || $52d13d33bd60c65a724bfd448491637f$var$RGBA;
    const formatType = $52d13d33bd60c65a724bfd448491637f$export$getFormatAndTypeForInternalFormat(internalFormat);
    const format = options.format || formatType.format;
    const type = options.type || formatType.type;
    $52d13d33bd60c65a724bfd448491637f$var$setPackState(gl, options);
    gl.bindTexture(target, tex);
    if (target === $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_CUBE_MAP) {
      // guess the parts
      const imgWidth = element.width;
      const imgHeight = element.height;
      let size;
      let slices;
      if (imgWidth / 6 === imgHeight) {
        // It's 6x1
        size = imgHeight;
        slices = [0, 0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0];
      } else if (imgHeight / 6 === imgWidth) {
        // It's 1x6
        size = imgWidth;
        slices = [0, 0, 0, 1, 0, 2, 0, 3, 0, 4, 0, 5];
      } else if (imgWidth / 3 === imgHeight / 2) {
        // It's 3x2
        size = imgWidth / 3;
        slices = [0, 0, 1, 0, 2, 0, 0, 1, 1, 1, 2, 1];
      } else if (imgWidth / 2 === imgHeight / 3) {
        // It's 2x3
        size = imgWidth / 2;
        slices = [0, 0, 1, 0, 0, 1, 1, 1, 0, 2, 1, 2];
      } else {
        throw "can't figure out cube map from element: " + (element.src ? element.src : element.nodeName);
      }
      const ctx = $52d13d33bd60c65a724bfd448491637f$var$getShared2DContext();
      if (ctx) {
        ctx.canvas.width = size;
        ctx.canvas.height = size;
        width = size;
        height = size;
        $52d13d33bd60c65a724bfd448491637f$var$getCubeFacesWithNdx(gl, options).forEach(function (f) {
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
        $52d13d33bd60c65a724bfd448491637f$var$getCubeFacesWithNdx(gl, options).forEach(function (f) {
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
          }).then(function (imageBitmap) {
            $52d13d33bd60c65a724bfd448491637f$var$setPackState(gl, options);
            gl.bindTexture(target, tex);
            gl.texImage2D(f.face, level, internalFormat, format, type, imageBitmap);
            if ($52d13d33bd60c65a724bfd448491637f$var$shouldAutomaticallySetTextureFilteringForSize(options)) {
              $52d13d33bd60c65a724bfd448491637f$export$setTextureFilteringForSize(gl, tex, options, width, height, internalFormat);
            }
          });
        });
      }
    } else if (target === $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_3D || target === $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_2D_ARRAY) {
      const smallest = Math.min(element.width, element.height);
      const largest = Math.max(element.width, element.height);
      const depth = largest / smallest;
      if (depth % 1 !== 0) {
        throw "can not compute 3D dimensions of element";
      }
      const xMult = element.width === largest ? 1 : 0;
      const yMult = element.height === largest ? 1 : 0;
      gl.pixelStorei($52d13d33bd60c65a724bfd448491637f$var$UNPACK_ALIGNMENT, 1);
      gl.pixelStorei($52d13d33bd60c65a724bfd448491637f$var$UNPACK_ROW_LENGTH, element.width);
      gl.pixelStorei($52d13d33bd60c65a724bfd448491637f$var$UNPACK_IMAGE_HEIGHT, 0);
      gl.pixelStorei($52d13d33bd60c65a724bfd448491637f$var$UNPACK_SKIP_IMAGES, 0);
      gl.texImage3D(target, level, internalFormat, smallest, smallest, smallest, 0, format, type, null);
      for (let d = 0; d < depth; ++d) {
        const srcX = d * smallest * xMult;
        const srcY = d * smallest * yMult;
        gl.pixelStorei($52d13d33bd60c65a724bfd448491637f$var$UNPACK_SKIP_PIXELS, srcX);
        gl.pixelStorei($52d13d33bd60c65a724bfd448491637f$var$UNPACK_SKIP_ROWS, srcY);
        gl.texSubImage3D(target, level, 0, 0, d, smallest, smallest, 1, format, type, element);
      }
      $52d13d33bd60c65a724bfd448491637f$var$setSkipStateToDefault(gl);
    } else {
      gl.texImage2D(target, level, internalFormat, format, type, element);
    }
    if ($52d13d33bd60c65a724bfd448491637f$var$shouldAutomaticallySetTextureFilteringForSize(options)) {
      $52d13d33bd60c65a724bfd448491637f$export$setTextureFilteringForSize(gl, tex, options, width, height, internalFormat);
    }
    $52d13d33bd60c65a724bfd448491637f$export$setTextureParameters(gl, tex, options);
  }
  function $52d13d33bd60c65a724bfd448491637f$var$noop() {}
  /**
  * Checks whether the url's origin is the same so that we can set the `crossOrigin`
  * @param {string} url url to image
  * @returns {boolean} true if the window's origin is the same as image's url
  * @private
  */
  function $52d13d33bd60c65a724bfd448491637f$var$urlIsSameOrigin(url) {
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
  function $52d13d33bd60c65a724bfd448491637f$var$setToAnonymousIfUndefinedAndURLIsNotSameOrigin(url, crossOrigin) {
    return crossOrigin === undefined && !$52d13d33bd60c65a724bfd448491637f$var$urlIsSameOrigin(url) ? 'anonymous' : crossOrigin;
  }
  /**
  * Loads an image
  * @param {string} url url to image
  * @param {string} crossOrigin
  * @param {function(err, img)} [callback] a callback that's passed an error and the image. The error will be non-null
  *     if there was an error
  * @return {HTMLImageElement} the image being loaded.
  * @private
  */
  function $52d13d33bd60c65a724bfd448491637f$var$loadImage(url, crossOrigin, callback) {
    callback = callback || $52d13d33bd60c65a724bfd448491637f$var$noop;
    let img;
    crossOrigin = crossOrigin !== undefined ? crossOrigin : $52d13d33bd60c65a724bfd448491637f$var$defaults$1.crossOrigin;
    crossOrigin = $52d13d33bd60c65a724bfd448491637f$var$setToAnonymousIfUndefinedAndURLIsNotSameOrigin(url, crossOrigin);
    if (typeof Image !== 'undefined') {
      img = new Image();
      if (crossOrigin !== undefined) {
        img.crossOrigin = crossOrigin;
      }
      const clearEventHandlers = function clearEventHandlers() {
        img.removeEventListener('error', onError);
        // eslint-disable-line
        img.removeEventListener('load', onLoad);
        // eslint-disable-line
        img = null;
      };
      const onError = function onError() {
        const msg = "couldn't load image: " + url;
        $52d13d33bd60c65a724bfd448491637f$var$error(msg);
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
      const options = {};
      if (crossOrigin) {
        options.mode = 'cors';
      }
      fetch(url, options).then(function (response) {
        if (!response.ok) {
          throw response;
        }
        return response.blob();
      }).then(function (blob) {
        return createImageBitmap(blob, {
          premultiplyAlpha: 'none',
          colorSpaceConversion: 'none'
        });
      }).then(function (bitmap) {
        // not sure if this works. We don't want
        // to catch the user's error. So, call
        // the callback in a timeout so we're
        // not in this scope inside the promise.
        bm = bitmap;
        setTimeout(cb);
      }).catch(function (e) {
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
  */
  function $52d13d33bd60c65a724bfd448491637f$var$isTexImageSource(obj) {
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
  */
  function $52d13d33bd60c65a724bfd448491637f$var$loadAndUseImage(obj, crossOrigin, callback) {
    if ($52d13d33bd60c65a724bfd448491637f$var$isTexImageSource(obj)) {
      setTimeout(function () {
        callback(null, obj);
      });
      return obj;
    }
    return $52d13d33bd60c65a724bfd448491637f$var$loadImage(obj, crossOrigin, callback);
  }
  /**
  * Sets a texture to a 1x1 pixel color. If `options.color === false` is nothing happens. If it's not set
  * the default texture color is used which can be set by calling `setDefaultTextureColor`.
  * @param {WebGLRenderingContext} gl the WebGLRenderingContext
  * @param {WebGLTexture} tex the WebGLTexture to set parameters for
  * @param {module:twgl.TextureOptions} [options] A TextureOptions object with whatever parameters you want set.
  *   This is often the same options you passed in when you created the texture.
  * @memberOf module:twgl/textures
  */
  function $52d13d33bd60c65a724bfd448491637f$var$setTextureTo1PixelColor(gl, tex, options) {
    options = options || $52d13d33bd60c65a724bfd448491637f$var$defaults$1.textureOptions;
    const target = options.target || $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_2D;
    gl.bindTexture(target, tex);
    if (options.color === false) {
      return;
    }
    // Assume it's a URL
    // Put 1x1 pixels in texture. That makes it renderable immediately regardless of filtering.
    const color = $52d13d33bd60c65a724bfd448491637f$var$make1Pixel(options.color);
    if (target === $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_CUBE_MAP) {
      for (let ii = 0; ii < 6; ++ii) {
        gl.texImage2D($52d13d33bd60c65a724bfd448491637f$var$TEXTURE_CUBE_MAP_POSITIVE_X + ii, 0, $52d13d33bd60c65a724bfd448491637f$var$RGBA, 1, 1, 0, $52d13d33bd60c65a724bfd448491637f$var$RGBA, $52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_BYTE$2, color);
      }
    } else if (target === $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_3D || target === $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_2D_ARRAY) {
      gl.texImage3D(target, 0, $52d13d33bd60c65a724bfd448491637f$var$RGBA, 1, 1, 1, 0, $52d13d33bd60c65a724bfd448491637f$var$RGBA, $52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_BYTE$2, color);
    } else {
      gl.texImage2D(target, 0, $52d13d33bd60c65a724bfd448491637f$var$RGBA, 1, 1, 0, $52d13d33bd60c65a724bfd448491637f$var$RGBA, $52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_BYTE$2, color);
    }
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
  */
  /**
  * A callback for when an image finished downloading and been uploaded into a texture
  * @callback TextureReadyCallback
  * @param {*} err If truthy there was an error.
  * @param {WebGLTexture} texture the texture.
  * @param {module:twgl.TextureSrc} source image(s) used to as the src for the texture
  * @memberOf module:twgl
  */
  /**
  * A callback for when all images have finished downloading and been uploaded into their respective textures
  * @callback TexturesReadyCallback
  * @param {*} err If truthy there was an error.
  * @param {Object.<string, WebGLTexture>} textures the created textures by name. Same as returned by {@link module:twgl.createTextures}.
  * @param {Object.<string, module:twgl.TextureSrc>} sources the image(s) used for the texture by name.
  * @memberOf module:twgl
  */
  /**
  * A callback for when an image finished downloading and been uploaded into a texture
  * @callback CubemapReadyCallback
  * @param {*} err If truthy there was an error.
  * @param {WebGLTexture} tex the texture.
  * @param {HTMLImageElement[]} imgs the images for each face.
  * @memberOf module:twgl
  */
  /**
  * A callback for when an image finished downloading and been uploaded into a texture
  * @callback ThreeDReadyCallback
  * @param {*} err If truthy there was an error.
  * @param {WebGLTexture} tex the texture.
  * @param {HTMLImageElement[]} imgs the images for each slice.
  * @memberOf module:twgl
  */
  /**
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
  */
  function $52d13d33bd60c65a724bfd448491637f$export$loadTextureFromUrl(gl, tex, options, callback) {
    callback = callback || $52d13d33bd60c65a724bfd448491637f$var$noop;
    options = options || $52d13d33bd60c65a724bfd448491637f$var$defaults$1.textureOptions;
    $52d13d33bd60c65a724bfd448491637f$var$setTextureTo1PixelColor(gl, tex, options);
    // Because it's async we need to copy the options.
    options = Object.assign({}, options);
    const img = $52d13d33bd60c65a724bfd448491637f$var$loadAndUseImage(options.src, options.crossOrigin, function (err, img) {
      if (err) {
        callback(err, tex, img);
      } else {
        $52d13d33bd60c65a724bfd448491637f$export$setTextureFromElement(gl, tex, img, options);
        callback(null, tex, img);
      }
    });
    return img;
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
  */
  function $52d13d33bd60c65a724bfd448491637f$var$loadCubemapFromUrls(gl, tex, options, callback) {
    callback = callback || $52d13d33bd60c65a724bfd448491637f$var$noop;
    const urls = options.src;
    if (urls.length !== 6) {
      throw "there must be 6 urls for a cubemap";
    }
    const level = options.level || 0;
    const internalFormat = options.internalFormat || options.format || $52d13d33bd60c65a724bfd448491637f$var$RGBA;
    const formatType = $52d13d33bd60c65a724bfd448491637f$export$getFormatAndTypeForInternalFormat(internalFormat);
    const format = options.format || formatType.format;
    const type = options.type || $52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_BYTE$2;
    const target = options.target || $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_2D;
    if (target !== $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_CUBE_MAP) {
      throw "target must be TEXTURE_CUBE_MAP";
    }
    $52d13d33bd60c65a724bfd448491637f$var$setTextureTo1PixelColor(gl, tex, options);
    // Because it's async we need to copy the options.
    options = Object.assign({}, options);
    let numToLoad = 6;
    const errors = [];
    const faces = $52d13d33bd60c65a724bfd448491637f$var$getCubeFaceOrder(gl, options);
    let imgs;
    // eslint-disable-line
    function uploadImg(faceTarget) {
      return function (err, img) {
        --numToLoad;
        if (err) {
          errors.push(err);
        } else {
          if (img.width !== img.height) {
            errors.push("cubemap face img is not a square: " + img.src);
          } else {
            $52d13d33bd60c65a724bfd448491637f$var$setPackState(gl, options);
            gl.bindTexture(target, tex);
            // So assuming this is the first image we now have one face that's img sized
            // and 5 faces that are 1x1 pixel so size the other faces
            if (numToLoad === 5) {
              // use the default order
              $52d13d33bd60c65a724bfd448491637f$var$getCubeFaceOrder().forEach(function (otherTarget) {
                // Should we re-use the same face or a color?
                gl.texImage2D(otherTarget, level, internalFormat, format, type, img);
              });
            } else {
              gl.texImage2D(faceTarget, level, internalFormat, format, type, img);
            }
            if ($52d13d33bd60c65a724bfd448491637f$var$shouldAutomaticallySetTextureFilteringForSize(options)) {
              gl.generateMipmap(target);
            }
          }
        }
        if (numToLoad === 0) {
          callback(errors.length ? errors : undefined, tex, imgs);
        }
      };
    }
    imgs = urls.map(function (url, ndx) {
      return $52d13d33bd60c65a724bfd448491637f$var$loadAndUseImage(url, options.crossOrigin, uploadImg(faces[ndx]));
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
  */
  function $52d13d33bd60c65a724bfd448491637f$var$loadSlicesFromUrls(gl, tex, options, callback) {
    callback = callback || $52d13d33bd60c65a724bfd448491637f$var$noop;
    const urls = options.src;
    const internalFormat = options.internalFormat || options.format || $52d13d33bd60c65a724bfd448491637f$var$RGBA;
    const formatType = $52d13d33bd60c65a724bfd448491637f$export$getFormatAndTypeForInternalFormat(internalFormat);
    const format = options.format || formatType.format;
    const type = options.type || $52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_BYTE$2;
    const target = options.target || $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_2D_ARRAY;
    if (target !== $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_3D && target !== $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_2D_ARRAY) {
      throw "target must be TEXTURE_3D or TEXTURE_2D_ARRAY";
    }
    $52d13d33bd60c65a724bfd448491637f$var$setTextureTo1PixelColor(gl, tex, options);
    // Because it's async we need to copy the options.
    options = Object.assign({}, options);
    let numToLoad = urls.length;
    const errors = [];
    let imgs;
    // eslint-disable-line
    const level = options.level || 0;
    let width = options.width;
    let height = options.height;
    const depth = urls.length;
    let firstImage = true;
    function uploadImg(slice) {
      return function (err, img) {
        --numToLoad;
        if (err) {
          errors.push(err);
        } else {
          $52d13d33bd60c65a724bfd448491637f$var$setPackState(gl, options);
          gl.bindTexture(target, tex);
          if (firstImage) {
            firstImage = false;
            width = options.width || img.width;
            height = options.height || img.height;
            gl.texImage3D(target, level, internalFormat, width, height, depth, 0, format, type, null);
            // put it in every slice otherwise some slices will be 0,0,0,0
            for (let s = 0; s < depth; ++s) {
              gl.texSubImage3D(target, level, 0, 0, s, width, height, 1, format, type, img);
            }
          } else {
            let src = img;
            let ctx;
            if (img.width !== width || img.height !== height) {
              // Size the image to fix
              ctx = $52d13d33bd60c65a724bfd448491637f$var$getShared2DContext();
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
          if ($52d13d33bd60c65a724bfd448491637f$var$shouldAutomaticallySetTextureFilteringForSize(options)) {
            gl.generateMipmap(target);
          }
        }
        if (numToLoad === 0) {
          callback(errors.length ? errors : undefined, tex, imgs);
        }
      };
    }
    imgs = urls.map(function (url, ndx) {
      return $52d13d33bd60c65a724bfd448491637f$var$loadAndUseImage(url, options.crossOrigin, uploadImg(ndx));
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
  */
  function $52d13d33bd60c65a724bfd448491637f$export$setTextureFromArray(gl, tex, src, options) {
    options = options || $52d13d33bd60c65a724bfd448491637f$var$defaults$1.textureOptions;
    const target = options.target || $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_2D;
    gl.bindTexture(target, tex);
    let width = options.width;
    let height = options.height;
    let depth = options.depth;
    const level = options.level || 0;
    const internalFormat = options.internalFormat || options.format || $52d13d33bd60c65a724bfd448491637f$var$RGBA;
    const formatType = $52d13d33bd60c65a724bfd448491637f$export$getFormatAndTypeForInternalFormat(internalFormat);
    const format = options.format || formatType.format;
    const type = options.type || $52d13d33bd60c65a724bfd448491637f$var$getTextureTypeForArrayType(gl, src, formatType.type);
    if (!$52d13d33bd60c65a724bfd448491637f$var$isArrayBuffer$1(src)) {
      const Type = $52d13d33bd60c65a724bfd448491637f$export$getTypedArrayTypeForGLType(type);
      src = new Type(src);
    } else if (src instanceof Uint8ClampedArray) {
      src = new Uint8Array(src.buffer);
    }
    const bytesPerElement = $52d13d33bd60c65a724bfd448491637f$export$getBytesPerElementForInternalFormat(internalFormat, type);
    const numElements = src.byteLength / bytesPerElement;
    // TODO: check UNPACK_ALIGNMENT?
    if (numElements % 1) {
      throw "length wrong size for format: " + $52d13d33bd60c65a724bfd448491637f$export$glEnumToString(gl, format);
    }
    let dimensions;
    if (target === $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_3D || target === $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_2D_ARRAY) {
      if (!width && !height && !depth) {
        const size = Math.cbrt(numElements);
        if (size % 1 !== 0) {
          throw "can't guess cube size of array of numElements: " + numElements;
        }
        width = size;
        height = size;
        depth = size;
      } else if (width && (!height || !depth)) {
        dimensions = $52d13d33bd60c65a724bfd448491637f$var$guessDimensions(gl, target, height, depth, numElements / width);
        height = dimensions.width;
        depth = dimensions.height;
      } else if (height && (!width || !depth)) {
        dimensions = $52d13d33bd60c65a724bfd448491637f$var$guessDimensions(gl, target, width, depth, numElements / height);
        width = dimensions.width;
        depth = dimensions.height;
      } else {
        dimensions = $52d13d33bd60c65a724bfd448491637f$var$guessDimensions(gl, target, width, height, numElements / depth);
        width = dimensions.width;
        height = dimensions.height;
      }
    } else {
      dimensions = $52d13d33bd60c65a724bfd448491637f$var$guessDimensions(gl, target, width, height, numElements);
      width = dimensions.width;
      height = dimensions.height;
    }
    $52d13d33bd60c65a724bfd448491637f$var$setSkipStateToDefault(gl);
    gl.pixelStorei($52d13d33bd60c65a724bfd448491637f$var$UNPACK_ALIGNMENT, options.unpackAlignment || 1);
    $52d13d33bd60c65a724bfd448491637f$var$setPackState(gl, options);
    if (target === $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_CUBE_MAP) {
      const elementsPerElement = bytesPerElement / src.BYTES_PER_ELEMENT;
      const faceSize = numElements / 6 * elementsPerElement;
      $52d13d33bd60c65a724bfd448491637f$var$getCubeFacesWithNdx(gl, options).forEach(f => {
        const offset = faceSize * f.ndx;
        const data = src.subarray(offset, offset + faceSize);
        gl.texImage2D(f.face, level, internalFormat, width, height, 0, format, type, data);
      });
    } else if (target === $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_3D || target === $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_2D_ARRAY) {
      gl.texImage3D(target, level, internalFormat, width, height, depth, 0, format, type, src);
    } else {
      gl.texImage2D(target, level, internalFormat, width, height, 0, format, type, src);
    }
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
  */
  function $52d13d33bd60c65a724bfd448491637f$export$setEmptyTexture(gl, tex, options) {
    const target = options.target || $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_2D;
    gl.bindTexture(target, tex);
    const level = options.level || 0;
    const internalFormat = options.internalFormat || options.format || $52d13d33bd60c65a724bfd448491637f$var$RGBA;
    const formatType = $52d13d33bd60c65a724bfd448491637f$export$getFormatAndTypeForInternalFormat(internalFormat);
    const format = options.format || formatType.format;
    const type = options.type || formatType.type;
    $52d13d33bd60c65a724bfd448491637f$var$setPackState(gl, options);
    if (target === $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_CUBE_MAP) {
      for (let ii = 0; ii < 6; ++ii) {
        gl.texImage2D($52d13d33bd60c65a724bfd448491637f$var$TEXTURE_CUBE_MAP_POSITIVE_X + ii, level, internalFormat, options.width, options.height, 0, format, type, null);
      }
    } else if (target === $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_3D || target === $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_2D_ARRAY) {
      gl.texImage3D(target, level, internalFormat, options.width, options.height, options.depth, 0, format, type, null);
    } else {
      gl.texImage2D(target, level, internalFormat, options.width, options.height, 0, format, type, null);
    }
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
  */
  function $52d13d33bd60c65a724bfd448491637f$export$createTexture(gl, options, callback) {
    callback = callback || $52d13d33bd60c65a724bfd448491637f$var$noop;
    options = options || $52d13d33bd60c65a724bfd448491637f$var$defaults$1.textureOptions;
    const tex = gl.createTexture();
    const target = options.target || $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_2D;
    let width = options.width || 1;
    let height = options.height || 1;
    const internalFormat = options.internalFormat || $52d13d33bd60c65a724bfd448491637f$var$RGBA;
    gl.bindTexture(target, tex);
    if (target === $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_CUBE_MAP) {
      // this should have been the default for cubemaps :(
      gl.texParameteri(target, $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_WRAP_S, $52d13d33bd60c65a724bfd448491637f$var$CLAMP_TO_EDGE);
      gl.texParameteri(target, $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_WRAP_T, $52d13d33bd60c65a724bfd448491637f$var$CLAMP_TO_EDGE);
    }
    let src = options.src;
    if (src) {
      if (typeof src === "function") {
        src = src(gl, options);
      }
      if (typeof src === "string") {
        $52d13d33bd60c65a724bfd448491637f$export$loadTextureFromUrl(gl, tex, options, callback);
      } else if ($52d13d33bd60c65a724bfd448491637f$var$isArrayBuffer$1(src) || Array.isArray(src) && (typeof src[0] === 'number' || Array.isArray(src[0]) || $52d13d33bd60c65a724bfd448491637f$var$isArrayBuffer$1(src[0]))) {
        const dimensions = $52d13d33bd60c65a724bfd448491637f$export$setTextureFromArray(gl, tex, src, options);
        width = dimensions.width;
        height = dimensions.height;
      } else if (Array.isArray(src) && (typeof src[0] === 'string' || $52d13d33bd60c65a724bfd448491637f$var$isTexImageSource(src[0]))) {
        if (target === $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_CUBE_MAP) {
          $52d13d33bd60c65a724bfd448491637f$var$loadCubemapFromUrls(gl, tex, options, callback);
        } else {
          $52d13d33bd60c65a724bfd448491637f$var$loadSlicesFromUrls(gl, tex, options, callback);
        }
      } else {
        // if (isTexImageSource(src))
        $52d13d33bd60c65a724bfd448491637f$export$setTextureFromElement(gl, tex, src, options);
        width = src.width;
        height = src.height;
      }
    } else {
      $52d13d33bd60c65a724bfd448491637f$export$setEmptyTexture(gl, tex, options);
    }
    if ($52d13d33bd60c65a724bfd448491637f$var$shouldAutomaticallySetTextureFilteringForSize(options)) {
      $52d13d33bd60c65a724bfd448491637f$export$setTextureFilteringForSize(gl, tex, options, width, height, internalFormat);
    }
    $52d13d33bd60c65a724bfd448491637f$export$setTextureParameters(gl, tex, options);
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
  */
  function $52d13d33bd60c65a724bfd448491637f$export$resizeTexture(gl, tex, options, width, height, depth) {
    width = width || options.width;
    height = height || options.height;
    depth = depth || options.depth;
    const target = options.target || $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_2D;
    gl.bindTexture(target, tex);
    const level = options.level || 0;
    const internalFormat = options.internalFormat || options.format || $52d13d33bd60c65a724bfd448491637f$var$RGBA;
    const formatType = $52d13d33bd60c65a724bfd448491637f$export$getFormatAndTypeForInternalFormat(internalFormat);
    const format = options.format || formatType.format;
    let type;
    const src = options.src;
    if (!src) {
      type = options.type || formatType.type;
    } else if ($52d13d33bd60c65a724bfd448491637f$var$isArrayBuffer$1(src) || Array.isArray(src) && typeof src[0] === 'number') {
      type = options.type || $52d13d33bd60c65a724bfd448491637f$var$getTextureTypeForArrayType(gl, src, formatType.type);
    } else {
      type = options.type || formatType.type;
    }
    if (target === $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_CUBE_MAP) {
      for (let ii = 0; ii < 6; ++ii) {
        gl.texImage2D($52d13d33bd60c65a724bfd448491637f$var$TEXTURE_CUBE_MAP_POSITIVE_X + ii, level, internalFormat, width, height, 0, format, type, null);
      }
    } else if (target === $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_3D || target === $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_2D_ARRAY) {
      gl.texImage3D(target, level, internalFormat, width, height, depth, 0, format, type, null);
    } else {
      gl.texImage2D(target, level, internalFormat, width, height, 0, format, type, null);
    }
  }
  /**
  * Check if a src is an async request.
  * if src is a string we're going to download an image
  * if src is an array of strings we're going to download cubemap images
  * @param {*} src The src from a TextureOptions
  * @returns {bool} true if src is async.
  * @private
  */
  function $52d13d33bd60c65a724bfd448491637f$var$isAsyncSrc(src) {
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
  */
  function $52d13d33bd60c65a724bfd448491637f$export$createTextures(gl, textureOptions, callback) {
    callback = callback || $52d13d33bd60c65a724bfd448491637f$var$noop;
    let numDownloading = 0;
    const errors = [];
    const textures = {};
    const images = {};
    function callCallbackIfReady() {
      if (numDownloading === 0) {
        setTimeout(function () {
          callback(errors.length ? errors : undefined, textures, images);
        }, 0);
      }
    }
    Object.keys(textureOptions).forEach(function (name) {
      const options = textureOptions[name];
      let onLoadFn;
      if ($52d13d33bd60c65a724bfd448491637f$var$isAsyncSrc(options.src)) {
        onLoadFn = function (err, tex, img) {
          images[name] = img;
          --numDownloading;
          if (err) {
            errors.push(err);
          }
          callCallbackIfReady();
        };
        ++numDownloading;
      }
      textures[name] = $52d13d33bd60c65a724bfd448491637f$export$createTexture(gl, options, onLoadFn);
    });
    // queue the callback if there are no images to download.
    // We do this because if your code is structured to wait for
    // images to download but then you comment out all the async
    // images your code would break.
    callCallbackIfReady();
    return textures;
  }
  var $52d13d33bd60c65a724bfd448491637f$export$textures = /*#__PURE__*/Object.freeze({
    __proto__: null,
    setTextureDefaults_: $52d13d33bd60c65a724bfd448491637f$export$setTextureDefaults_,
    createSampler: $52d13d33bd60c65a724bfd448491637f$export$createSampler,
    createSamplers: $52d13d33bd60c65a724bfd448491637f$export$createSamplers,
    setSamplerParameters: $52d13d33bd60c65a724bfd448491637f$export$setSamplerParameters,
    createTexture: $52d13d33bd60c65a724bfd448491637f$export$createTexture,
    setEmptyTexture: $52d13d33bd60c65a724bfd448491637f$export$setEmptyTexture,
    setTextureFromArray: $52d13d33bd60c65a724bfd448491637f$export$setTextureFromArray,
    loadTextureFromUrl: $52d13d33bd60c65a724bfd448491637f$export$loadTextureFromUrl,
    setTextureFromElement: $52d13d33bd60c65a724bfd448491637f$export$setTextureFromElement,
    setTextureFilteringForSize: $52d13d33bd60c65a724bfd448491637f$export$setTextureFilteringForSize,
    setTextureParameters: $52d13d33bd60c65a724bfd448491637f$export$setTextureParameters,
    setDefaultTextureColor: $52d13d33bd60c65a724bfd448491637f$export$setDefaultTextureColor,
    createTextures: $52d13d33bd60c65a724bfd448491637f$export$createTextures,
    resizeTexture: $52d13d33bd60c65a724bfd448491637f$export$resizeTexture,
    canGenerateMipmap: $52d13d33bd60c65a724bfd448491637f$export$canGenerateMipmap,
    canFilter: $52d13d33bd60c65a724bfd448491637f$export$canFilter,
    getNumComponentsForFormat: $52d13d33bd60c65a724bfd448491637f$export$getNumComponentsForFormat,
    getBytesPerElementForInternalFormat: $52d13d33bd60c65a724bfd448491637f$export$getBytesPerElementForInternalFormat,
    getFormatAndTypeForInternalFormat: $52d13d33bd60c65a724bfd448491637f$export$getFormatAndTypeForInternalFormat
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
  */
  /**
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
  */
  const $52d13d33bd60c65a724bfd448491637f$var$error$1 = $52d13d33bd60c65a724bfd448491637f$var$error;
  const $52d13d33bd60c65a724bfd448491637f$var$warn$1 = $52d13d33bd60c65a724bfd448491637f$var$warn;
  function $52d13d33bd60c65a724bfd448491637f$var$getElementById(id) {
    return typeof document !== 'undefined' && document.getElementById ? document.getElementById(id) : null;
  }
  const $52d13d33bd60c65a724bfd448491637f$var$TEXTURE0 = 0x84c0;
  const $52d13d33bd60c65a724bfd448491637f$var$DYNAMIC_DRAW = 0x88e8;
  const $52d13d33bd60c65a724bfd448491637f$var$ARRAY_BUFFER$1 = 0x8892;
  const $52d13d33bd60c65a724bfd448491637f$var$ELEMENT_ARRAY_BUFFER$1 = 0x8893;
  const $52d13d33bd60c65a724bfd448491637f$var$UNIFORM_BUFFER = 0x8a11;
  const $52d13d33bd60c65a724bfd448491637f$var$TRANSFORM_FEEDBACK_BUFFER = 0x8c8e;
  const $52d13d33bd60c65a724bfd448491637f$var$TRANSFORM_FEEDBACK = 0x8e22;
  const $52d13d33bd60c65a724bfd448491637f$var$COMPILE_STATUS = 0x8b81;
  const $52d13d33bd60c65a724bfd448491637f$var$LINK_STATUS = 0x8b82;
  const $52d13d33bd60c65a724bfd448491637f$var$FRAGMENT_SHADER = 0x8b30;
  const $52d13d33bd60c65a724bfd448491637f$var$VERTEX_SHADER = 0x8b31;
  const $52d13d33bd60c65a724bfd448491637f$var$SEPARATE_ATTRIBS = 0x8c8d;
  const $52d13d33bd60c65a724bfd448491637f$var$ACTIVE_UNIFORMS = 0x8b86;
  const $52d13d33bd60c65a724bfd448491637f$var$ACTIVE_ATTRIBUTES = 0x8b89;
  const $52d13d33bd60c65a724bfd448491637f$var$TRANSFORM_FEEDBACK_VARYINGS = 0x8c83;
  const $52d13d33bd60c65a724bfd448491637f$var$ACTIVE_UNIFORM_BLOCKS = 0x8a36;
  const $52d13d33bd60c65a724bfd448491637f$var$UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER = 0x8a44;
  const $52d13d33bd60c65a724bfd448491637f$var$UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER = 0x8a46;
  const $52d13d33bd60c65a724bfd448491637f$var$UNIFORM_BLOCK_DATA_SIZE = 0x8a40;
  const $52d13d33bd60c65a724bfd448491637f$var$UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES = 0x8a43;
  const $52d13d33bd60c65a724bfd448491637f$var$FLOAT$3 = 0x1406;
  const $52d13d33bd60c65a724bfd448491637f$var$FLOAT_VEC2 = 0x8B50;
  const $52d13d33bd60c65a724bfd448491637f$var$FLOAT_VEC3 = 0x8B51;
  const $52d13d33bd60c65a724bfd448491637f$var$FLOAT_VEC4 = 0x8B52;
  const $52d13d33bd60c65a724bfd448491637f$var$INT$3 = 0x1404;
  const $52d13d33bd60c65a724bfd448491637f$var$INT_VEC2 = 0x8B53;
  const $52d13d33bd60c65a724bfd448491637f$var$INT_VEC3 = 0x8B54;
  const $52d13d33bd60c65a724bfd448491637f$var$INT_VEC4 = 0x8B55;
  const $52d13d33bd60c65a724bfd448491637f$var$BOOL = 0x8B56;
  const $52d13d33bd60c65a724bfd448491637f$var$BOOL_VEC2 = 0x8B57;
  const $52d13d33bd60c65a724bfd448491637f$var$BOOL_VEC3 = 0x8B58;
  const $52d13d33bd60c65a724bfd448491637f$var$BOOL_VEC4 = 0x8B59;
  const $52d13d33bd60c65a724bfd448491637f$var$FLOAT_MAT2 = 0x8B5A;
  const $52d13d33bd60c65a724bfd448491637f$var$FLOAT_MAT3 = 0x8B5B;
  const $52d13d33bd60c65a724bfd448491637f$var$FLOAT_MAT4 = 0x8B5C;
  const $52d13d33bd60c65a724bfd448491637f$var$SAMPLER_2D = 0x8B5E;
  const $52d13d33bd60c65a724bfd448491637f$var$SAMPLER_CUBE = 0x8B60;
  const $52d13d33bd60c65a724bfd448491637f$var$SAMPLER_3D = 0x8B5F;
  const $52d13d33bd60c65a724bfd448491637f$var$SAMPLER_2D_SHADOW = 0x8B62;
  const $52d13d33bd60c65a724bfd448491637f$var$FLOAT_MAT2x3 = 0x8B65;
  const $52d13d33bd60c65a724bfd448491637f$var$FLOAT_MAT2x4 = 0x8B66;
  const $52d13d33bd60c65a724bfd448491637f$var$FLOAT_MAT3x2 = 0x8B67;
  const $52d13d33bd60c65a724bfd448491637f$var$FLOAT_MAT3x4 = 0x8B68;
  const $52d13d33bd60c65a724bfd448491637f$var$FLOAT_MAT4x2 = 0x8B69;
  const $52d13d33bd60c65a724bfd448491637f$var$FLOAT_MAT4x3 = 0x8B6A;
  const $52d13d33bd60c65a724bfd448491637f$var$SAMPLER_2D_ARRAY = 0x8DC1;
  const $52d13d33bd60c65a724bfd448491637f$var$SAMPLER_2D_ARRAY_SHADOW = 0x8DC4;
  const $52d13d33bd60c65a724bfd448491637f$var$SAMPLER_CUBE_SHADOW = 0x8DC5;
  const $52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_INT$3 = 0x1405;
  const $52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_INT_VEC2 = 0x8DC6;
  const $52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_INT_VEC3 = 0x8DC7;
  const $52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_INT_VEC4 = 0x8DC8;
  const $52d13d33bd60c65a724bfd448491637f$var$INT_SAMPLER_2D = 0x8DCA;
  const $52d13d33bd60c65a724bfd448491637f$var$INT_SAMPLER_3D = 0x8DCB;
  const $52d13d33bd60c65a724bfd448491637f$var$INT_SAMPLER_CUBE = 0x8DCC;
  const $52d13d33bd60c65a724bfd448491637f$var$INT_SAMPLER_2D_ARRAY = 0x8DCF;
  const $52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_INT_SAMPLER_2D = 0x8DD2;
  const $52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_INT_SAMPLER_3D = 0x8DD3;
  const $52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_INT_SAMPLER_CUBE = 0x8DD4;
  const $52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_INT_SAMPLER_2D_ARRAY = 0x8DD7;
  const $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_2D$1 = 0x0DE1;
  const $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_CUBE_MAP$1 = 0x8513;
  const $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_3D$1 = 0x806F;
  const $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_2D_ARRAY$1 = 0x8C1A;
  const $52d13d33bd60c65a724bfd448491637f$var$typeMap = {};
  /**
  * Returns the corresponding bind point for a given sampler type
  */
  function $52d13d33bd60c65a724bfd448491637f$var$getBindPointForSamplerType(gl, type) {
    return $52d13d33bd60c65a724bfd448491637f$var$typeMap[type].bindPoint;
  }
  // This kind of sucks! If you could compose functions as in `var fn = gl[name];`
  // this code could be a lot smaller but that is sadly really slow (T_T)
  function $52d13d33bd60c65a724bfd448491637f$var$floatSetter(gl, location) {
    return function (v) {
      gl.uniform1f(location, v);
    };
  }
  function $52d13d33bd60c65a724bfd448491637f$var$floatArraySetter(gl, location) {
    return function (v) {
      gl.uniform1fv(location, v);
    };
  }
  function $52d13d33bd60c65a724bfd448491637f$var$floatVec2Setter(gl, location) {
    return function (v) {
      gl.uniform2fv(location, v);
    };
  }
  function $52d13d33bd60c65a724bfd448491637f$var$floatVec3Setter(gl, location) {
    return function (v) {
      gl.uniform3fv(location, v);
    };
  }
  function $52d13d33bd60c65a724bfd448491637f$var$floatVec4Setter(gl, location) {
    return function (v) {
      gl.uniform4fv(location, v);
    };
  }
  function $52d13d33bd60c65a724bfd448491637f$var$intSetter(gl, location) {
    return function (v) {
      gl.uniform1i(location, v);
    };
  }
  function $52d13d33bd60c65a724bfd448491637f$var$intArraySetter(gl, location) {
    return function (v) {
      gl.uniform1iv(location, v);
    };
  }
  function $52d13d33bd60c65a724bfd448491637f$var$intVec2Setter(gl, location) {
    return function (v) {
      gl.uniform2iv(location, v);
    };
  }
  function $52d13d33bd60c65a724bfd448491637f$var$intVec3Setter(gl, location) {
    return function (v) {
      gl.uniform3iv(location, v);
    };
  }
  function $52d13d33bd60c65a724bfd448491637f$var$intVec4Setter(gl, location) {
    return function (v) {
      gl.uniform4iv(location, v);
    };
  }
  function $52d13d33bd60c65a724bfd448491637f$var$uintSetter(gl, location) {
    return function (v) {
      gl.uniform1ui(location, v);
    };
  }
  function $52d13d33bd60c65a724bfd448491637f$var$uintArraySetter(gl, location) {
    return function (v) {
      gl.uniform1uiv(location, v);
    };
  }
  function $52d13d33bd60c65a724bfd448491637f$var$uintVec2Setter(gl, location) {
    return function (v) {
      gl.uniform2uiv(location, v);
    };
  }
  function $52d13d33bd60c65a724bfd448491637f$var$uintVec3Setter(gl, location) {
    return function (v) {
      gl.uniform3uiv(location, v);
    };
  }
  function $52d13d33bd60c65a724bfd448491637f$var$uintVec4Setter(gl, location) {
    return function (v) {
      gl.uniform4uiv(location, v);
    };
  }
  function $52d13d33bd60c65a724bfd448491637f$var$floatMat2Setter(gl, location) {
    return function (v) {
      gl.uniformMatrix2fv(location, false, v);
    };
  }
  function $52d13d33bd60c65a724bfd448491637f$var$floatMat3Setter(gl, location) {
    return function (v) {
      gl.uniformMatrix3fv(location, false, v);
    };
  }
  function $52d13d33bd60c65a724bfd448491637f$var$floatMat4Setter(gl, location) {
    return function (v) {
      gl.uniformMatrix4fv(location, false, v);
    };
  }
  function $52d13d33bd60c65a724bfd448491637f$var$floatMat23Setter(gl, location) {
    return function (v) {
      gl.uniformMatrix2x3fv(location, false, v);
    };
  }
  function $52d13d33bd60c65a724bfd448491637f$var$floatMat32Setter(gl, location) {
    return function (v) {
      gl.uniformMatrix3x2fv(location, false, v);
    };
  }
  function $52d13d33bd60c65a724bfd448491637f$var$floatMat24Setter(gl, location) {
    return function (v) {
      gl.uniformMatrix2x4fv(location, false, v);
    };
  }
  function $52d13d33bd60c65a724bfd448491637f$var$floatMat42Setter(gl, location) {
    return function (v) {
      gl.uniformMatrix4x2fv(location, false, v);
    };
  }
  function $52d13d33bd60c65a724bfd448491637f$var$floatMat34Setter(gl, location) {
    return function (v) {
      gl.uniformMatrix3x4fv(location, false, v);
    };
  }
  function $52d13d33bd60c65a724bfd448491637f$var$floatMat43Setter(gl, location) {
    return function (v) {
      gl.uniformMatrix4x3fv(location, false, v);
    };
  }
  function $52d13d33bd60c65a724bfd448491637f$var$samplerSetter(gl, type, unit, location) {
    const bindPoint = $52d13d33bd60c65a724bfd448491637f$var$getBindPointForSamplerType(gl, type);
    return $52d13d33bd60c65a724bfd448491637f$export$isWebGL2(gl) ? function (textureOrPair) {
      let texture;
      let sampler;
      if ($52d13d33bd60c65a724bfd448491637f$var$isTexture(gl, textureOrPair)) {
        texture = textureOrPair;
        sampler = null;
      } else {
        texture = textureOrPair.texture;
        sampler = textureOrPair.sampler;
      }
      gl.uniform1i(location, unit);
      gl.activeTexture($52d13d33bd60c65a724bfd448491637f$var$TEXTURE0 + unit);
      gl.bindTexture(bindPoint, texture);
      gl.bindSampler(unit, sampler);
    } : function (texture) {
      gl.uniform1i(location, unit);
      gl.activeTexture($52d13d33bd60c65a724bfd448491637f$var$TEXTURE0 + unit);
      gl.bindTexture(bindPoint, texture);
    };
  }
  function $52d13d33bd60c65a724bfd448491637f$var$samplerArraySetter(gl, type, unit, location, size) {
    const bindPoint = $52d13d33bd60c65a724bfd448491637f$var$getBindPointForSamplerType(gl, type);
    const units = new Int32Array(size);
    for (let ii = 0; ii < size; ++ii) {
      units[ii] = unit + ii;
    }
    return $52d13d33bd60c65a724bfd448491637f$export$isWebGL2(gl) ? function (textures) {
      gl.uniform1iv(location, units);
      textures.forEach(function (textureOrPair, index) {
        gl.activeTexture($52d13d33bd60c65a724bfd448491637f$var$TEXTURE0 + units[index]);
        let texture;
        let sampler;
        if ($52d13d33bd60c65a724bfd448491637f$var$isTexture(gl, textureOrPair)) {
          texture = textureOrPair;
          sampler = null;
        } else {
          texture = textureOrPair.texture;
          sampler = textureOrPair.sampler;
        }
        gl.bindSampler(unit, sampler);
        gl.bindTexture(bindPoint, texture);
      });
    } : function (textures) {
      gl.uniform1iv(location, units);
      textures.forEach(function (texture, index) {
        gl.activeTexture($52d13d33bd60c65a724bfd448491637f$var$TEXTURE0 + units[index]);
        gl.bindTexture(bindPoint, texture);
      });
    };
  }
  $52d13d33bd60c65a724bfd448491637f$var$typeMap[$52d13d33bd60c65a724bfd448491637f$var$FLOAT$3] = {
    Type: Float32Array,
    size: 4,
    setter: $52d13d33bd60c65a724bfd448491637f$var$floatSetter,
    arraySetter: $52d13d33bd60c65a724bfd448491637f$var$floatArraySetter
  };
  $52d13d33bd60c65a724bfd448491637f$var$typeMap[$52d13d33bd60c65a724bfd448491637f$var$FLOAT_VEC2] = {
    Type: Float32Array,
    size: 8,
    setter: $52d13d33bd60c65a724bfd448491637f$var$floatVec2Setter
  };
  $52d13d33bd60c65a724bfd448491637f$var$typeMap[$52d13d33bd60c65a724bfd448491637f$var$FLOAT_VEC3] = {
    Type: Float32Array,
    size: 12,
    setter: $52d13d33bd60c65a724bfd448491637f$var$floatVec3Setter
  };
  $52d13d33bd60c65a724bfd448491637f$var$typeMap[$52d13d33bd60c65a724bfd448491637f$var$FLOAT_VEC4] = {
    Type: Float32Array,
    size: 16,
    setter: $52d13d33bd60c65a724bfd448491637f$var$floatVec4Setter
  };
  $52d13d33bd60c65a724bfd448491637f$var$typeMap[$52d13d33bd60c65a724bfd448491637f$var$INT$3] = {
    Type: Int32Array,
    size: 4,
    setter: $52d13d33bd60c65a724bfd448491637f$var$intSetter,
    arraySetter: $52d13d33bd60c65a724bfd448491637f$var$intArraySetter
  };
  $52d13d33bd60c65a724bfd448491637f$var$typeMap[$52d13d33bd60c65a724bfd448491637f$var$INT_VEC2] = {
    Type: Int32Array,
    size: 8,
    setter: $52d13d33bd60c65a724bfd448491637f$var$intVec2Setter
  };
  $52d13d33bd60c65a724bfd448491637f$var$typeMap[$52d13d33bd60c65a724bfd448491637f$var$INT_VEC3] = {
    Type: Int32Array,
    size: 12,
    setter: $52d13d33bd60c65a724bfd448491637f$var$intVec3Setter
  };
  $52d13d33bd60c65a724bfd448491637f$var$typeMap[$52d13d33bd60c65a724bfd448491637f$var$INT_VEC4] = {
    Type: Int32Array,
    size: 16,
    setter: $52d13d33bd60c65a724bfd448491637f$var$intVec4Setter
  };
  $52d13d33bd60c65a724bfd448491637f$var$typeMap[$52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_INT$3] = {
    Type: Uint32Array,
    size: 4,
    setter: $52d13d33bd60c65a724bfd448491637f$var$uintSetter,
    arraySetter: $52d13d33bd60c65a724bfd448491637f$var$uintArraySetter
  };
  $52d13d33bd60c65a724bfd448491637f$var$typeMap[$52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_INT_VEC2] = {
    Type: Uint32Array,
    size: 8,
    setter: $52d13d33bd60c65a724bfd448491637f$var$uintVec2Setter
  };
  $52d13d33bd60c65a724bfd448491637f$var$typeMap[$52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_INT_VEC3] = {
    Type: Uint32Array,
    size: 12,
    setter: $52d13d33bd60c65a724bfd448491637f$var$uintVec3Setter
  };
  $52d13d33bd60c65a724bfd448491637f$var$typeMap[$52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_INT_VEC4] = {
    Type: Uint32Array,
    size: 16,
    setter: $52d13d33bd60c65a724bfd448491637f$var$uintVec4Setter
  };
  $52d13d33bd60c65a724bfd448491637f$var$typeMap[$52d13d33bd60c65a724bfd448491637f$var$BOOL] = {
    Type: Uint32Array,
    size: 4,
    setter: $52d13d33bd60c65a724bfd448491637f$var$intSetter,
    arraySetter: $52d13d33bd60c65a724bfd448491637f$var$intArraySetter
  };
  $52d13d33bd60c65a724bfd448491637f$var$typeMap[$52d13d33bd60c65a724bfd448491637f$var$BOOL_VEC2] = {
    Type: Uint32Array,
    size: 8,
    setter: $52d13d33bd60c65a724bfd448491637f$var$intVec2Setter
  };
  $52d13d33bd60c65a724bfd448491637f$var$typeMap[$52d13d33bd60c65a724bfd448491637f$var$BOOL_VEC3] = {
    Type: Uint32Array,
    size: 12,
    setter: $52d13d33bd60c65a724bfd448491637f$var$intVec3Setter
  };
  $52d13d33bd60c65a724bfd448491637f$var$typeMap[$52d13d33bd60c65a724bfd448491637f$var$BOOL_VEC4] = {
    Type: Uint32Array,
    size: 16,
    setter: $52d13d33bd60c65a724bfd448491637f$var$intVec4Setter
  };
  $52d13d33bd60c65a724bfd448491637f$var$typeMap[$52d13d33bd60c65a724bfd448491637f$var$FLOAT_MAT2] = {
    Type: Float32Array,
    size: 16,
    setter: $52d13d33bd60c65a724bfd448491637f$var$floatMat2Setter
  };
  $52d13d33bd60c65a724bfd448491637f$var$typeMap[$52d13d33bd60c65a724bfd448491637f$var$FLOAT_MAT3] = {
    Type: Float32Array,
    size: 36,
    setter: $52d13d33bd60c65a724bfd448491637f$var$floatMat3Setter
  };
  $52d13d33bd60c65a724bfd448491637f$var$typeMap[$52d13d33bd60c65a724bfd448491637f$var$FLOAT_MAT4] = {
    Type: Float32Array,
    size: 64,
    setter: $52d13d33bd60c65a724bfd448491637f$var$floatMat4Setter
  };
  $52d13d33bd60c65a724bfd448491637f$var$typeMap[$52d13d33bd60c65a724bfd448491637f$var$FLOAT_MAT2x3] = {
    Type: Float32Array,
    size: 24,
    setter: $52d13d33bd60c65a724bfd448491637f$var$floatMat23Setter
  };
  $52d13d33bd60c65a724bfd448491637f$var$typeMap[$52d13d33bd60c65a724bfd448491637f$var$FLOAT_MAT2x4] = {
    Type: Float32Array,
    size: 32,
    setter: $52d13d33bd60c65a724bfd448491637f$var$floatMat24Setter
  };
  $52d13d33bd60c65a724bfd448491637f$var$typeMap[$52d13d33bd60c65a724bfd448491637f$var$FLOAT_MAT3x2] = {
    Type: Float32Array,
    size: 24,
    setter: $52d13d33bd60c65a724bfd448491637f$var$floatMat32Setter
  };
  $52d13d33bd60c65a724bfd448491637f$var$typeMap[$52d13d33bd60c65a724bfd448491637f$var$FLOAT_MAT3x4] = {
    Type: Float32Array,
    size: 48,
    setter: $52d13d33bd60c65a724bfd448491637f$var$floatMat34Setter
  };
  $52d13d33bd60c65a724bfd448491637f$var$typeMap[$52d13d33bd60c65a724bfd448491637f$var$FLOAT_MAT4x2] = {
    Type: Float32Array,
    size: 32,
    setter: $52d13d33bd60c65a724bfd448491637f$var$floatMat42Setter
  };
  $52d13d33bd60c65a724bfd448491637f$var$typeMap[$52d13d33bd60c65a724bfd448491637f$var$FLOAT_MAT4x3] = {
    Type: Float32Array,
    size: 48,
    setter: $52d13d33bd60c65a724bfd448491637f$var$floatMat43Setter
  };
  $52d13d33bd60c65a724bfd448491637f$var$typeMap[$52d13d33bd60c65a724bfd448491637f$var$SAMPLER_2D] = {
    Type: null,
    size: 0,
    setter: $52d13d33bd60c65a724bfd448491637f$var$samplerSetter,
    arraySetter: $52d13d33bd60c65a724bfd448491637f$var$samplerArraySetter,
    bindPoint: $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_2D$1
  };
  $52d13d33bd60c65a724bfd448491637f$var$typeMap[$52d13d33bd60c65a724bfd448491637f$var$SAMPLER_CUBE] = {
    Type: null,
    size: 0,
    setter: $52d13d33bd60c65a724bfd448491637f$var$samplerSetter,
    arraySetter: $52d13d33bd60c65a724bfd448491637f$var$samplerArraySetter,
    bindPoint: $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_CUBE_MAP$1
  };
  $52d13d33bd60c65a724bfd448491637f$var$typeMap[$52d13d33bd60c65a724bfd448491637f$var$SAMPLER_3D] = {
    Type: null,
    size: 0,
    setter: $52d13d33bd60c65a724bfd448491637f$var$samplerSetter,
    arraySetter: $52d13d33bd60c65a724bfd448491637f$var$samplerArraySetter,
    bindPoint: $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_3D$1
  };
  $52d13d33bd60c65a724bfd448491637f$var$typeMap[$52d13d33bd60c65a724bfd448491637f$var$SAMPLER_2D_SHADOW] = {
    Type: null,
    size: 0,
    setter: $52d13d33bd60c65a724bfd448491637f$var$samplerSetter,
    arraySetter: $52d13d33bd60c65a724bfd448491637f$var$samplerArraySetter,
    bindPoint: $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_2D$1
  };
  $52d13d33bd60c65a724bfd448491637f$var$typeMap[$52d13d33bd60c65a724bfd448491637f$var$SAMPLER_2D_ARRAY] = {
    Type: null,
    size: 0,
    setter: $52d13d33bd60c65a724bfd448491637f$var$samplerSetter,
    arraySetter: $52d13d33bd60c65a724bfd448491637f$var$samplerArraySetter,
    bindPoint: $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_2D_ARRAY$1
  };
  $52d13d33bd60c65a724bfd448491637f$var$typeMap[$52d13d33bd60c65a724bfd448491637f$var$SAMPLER_2D_ARRAY_SHADOW] = {
    Type: null,
    size: 0,
    setter: $52d13d33bd60c65a724bfd448491637f$var$samplerSetter,
    arraySetter: $52d13d33bd60c65a724bfd448491637f$var$samplerArraySetter,
    bindPoint: $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_2D_ARRAY$1
  };
  $52d13d33bd60c65a724bfd448491637f$var$typeMap[$52d13d33bd60c65a724bfd448491637f$var$SAMPLER_CUBE_SHADOW] = {
    Type: null,
    size: 0,
    setter: $52d13d33bd60c65a724bfd448491637f$var$samplerSetter,
    arraySetter: $52d13d33bd60c65a724bfd448491637f$var$samplerArraySetter,
    bindPoint: $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_CUBE_MAP$1
  };
  $52d13d33bd60c65a724bfd448491637f$var$typeMap[$52d13d33bd60c65a724bfd448491637f$var$INT_SAMPLER_2D] = {
    Type: null,
    size: 0,
    setter: $52d13d33bd60c65a724bfd448491637f$var$samplerSetter,
    arraySetter: $52d13d33bd60c65a724bfd448491637f$var$samplerArraySetter,
    bindPoint: $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_2D$1
  };
  $52d13d33bd60c65a724bfd448491637f$var$typeMap[$52d13d33bd60c65a724bfd448491637f$var$INT_SAMPLER_3D] = {
    Type: null,
    size: 0,
    setter: $52d13d33bd60c65a724bfd448491637f$var$samplerSetter,
    arraySetter: $52d13d33bd60c65a724bfd448491637f$var$samplerArraySetter,
    bindPoint: $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_3D$1
  };
  $52d13d33bd60c65a724bfd448491637f$var$typeMap[$52d13d33bd60c65a724bfd448491637f$var$INT_SAMPLER_CUBE] = {
    Type: null,
    size: 0,
    setter: $52d13d33bd60c65a724bfd448491637f$var$samplerSetter,
    arraySetter: $52d13d33bd60c65a724bfd448491637f$var$samplerArraySetter,
    bindPoint: $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_CUBE_MAP$1
  };
  $52d13d33bd60c65a724bfd448491637f$var$typeMap[$52d13d33bd60c65a724bfd448491637f$var$INT_SAMPLER_2D_ARRAY] = {
    Type: null,
    size: 0,
    setter: $52d13d33bd60c65a724bfd448491637f$var$samplerSetter,
    arraySetter: $52d13d33bd60c65a724bfd448491637f$var$samplerArraySetter,
    bindPoint: $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_2D_ARRAY$1
  };
  $52d13d33bd60c65a724bfd448491637f$var$typeMap[$52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_INT_SAMPLER_2D] = {
    Type: null,
    size: 0,
    setter: $52d13d33bd60c65a724bfd448491637f$var$samplerSetter,
    arraySetter: $52d13d33bd60c65a724bfd448491637f$var$samplerArraySetter,
    bindPoint: $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_2D$1
  };
  $52d13d33bd60c65a724bfd448491637f$var$typeMap[$52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_INT_SAMPLER_3D] = {
    Type: null,
    size: 0,
    setter: $52d13d33bd60c65a724bfd448491637f$var$samplerSetter,
    arraySetter: $52d13d33bd60c65a724bfd448491637f$var$samplerArraySetter,
    bindPoint: $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_3D$1
  };
  $52d13d33bd60c65a724bfd448491637f$var$typeMap[$52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_INT_SAMPLER_CUBE] = {
    Type: null,
    size: 0,
    setter: $52d13d33bd60c65a724bfd448491637f$var$samplerSetter,
    arraySetter: $52d13d33bd60c65a724bfd448491637f$var$samplerArraySetter,
    bindPoint: $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_CUBE_MAP$1
  };
  $52d13d33bd60c65a724bfd448491637f$var$typeMap[$52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_INT_SAMPLER_2D_ARRAY] = {
    Type: null,
    size: 0,
    setter: $52d13d33bd60c65a724bfd448491637f$var$samplerSetter,
    arraySetter: $52d13d33bd60c65a724bfd448491637f$var$samplerArraySetter,
    bindPoint: $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_2D_ARRAY$1
  };
  function $52d13d33bd60c65a724bfd448491637f$var$floatAttribSetter(gl, index) {
    return function (b) {
      if (b.value) {
        gl.disableVertexAttribArray(index);
        switch (b.value.length) {
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
        gl.bindBuffer($52d13d33bd60c65a724bfd448491637f$var$ARRAY_BUFFER$1, b.buffer);
        gl.enableVertexAttribArray(index);
        gl.vertexAttribPointer(index, b.numComponents || b.size, b.type || $52d13d33bd60c65a724bfd448491637f$var$FLOAT$3, b.normalize || false, b.stride || 0, b.offset || 0);
        if (b.divisor !== undefined) {
          gl.vertexAttribDivisor(index, b.divisor);
        }
      }
    };
  }
  function $52d13d33bd60c65a724bfd448491637f$var$intAttribSetter(gl, index) {
    return function (b) {
      if (b.value) {
        gl.disableVertexAttribArray(index);
        if (b.value.length === 4) {
          gl.vertexAttrib4iv(index, b.value);
        } else {
          throw new Error('The length of an integer constant value must be 4!');
        }
      } else {
        gl.bindBuffer($52d13d33bd60c65a724bfd448491637f$var$ARRAY_BUFFER$1, b.buffer);
        gl.enableVertexAttribArray(index);
        gl.vertexAttribIPointer(index, b.numComponents || b.size, b.type || $52d13d33bd60c65a724bfd448491637f$var$INT$3, b.stride || 0, b.offset || 0);
        if (b.divisor !== undefined) {
          gl.vertexAttribDivisor(index, b.divisor);
        }
      }
    };
  }
  function $52d13d33bd60c65a724bfd448491637f$var$uintAttribSetter(gl, index) {
    return function (b) {
      if (b.value) {
        gl.disableVertexAttribArray(index);
        if (b.value.length === 4) {
          gl.vertexAttrib4uiv(index, b.value);
        } else {
          throw new Error('The length of an unsigned integer constant value must be 4!');
        }
      } else {
        gl.bindBuffer($52d13d33bd60c65a724bfd448491637f$var$ARRAY_BUFFER$1, b.buffer);
        gl.enableVertexAttribArray(index);
        gl.vertexAttribIPointer(index, b.numComponents || b.size, b.type || $52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_INT$3, b.stride || 0, b.offset || 0);
        if (b.divisor !== undefined) {
          gl.vertexAttribDivisor(index, b.divisor);
        }
      }
    };
  }
  function $52d13d33bd60c65a724bfd448491637f$var$matAttribSetter(gl, index, typeInfo) {
    const defaultSize = typeInfo.size;
    const count = typeInfo.count;
    return function (b) {
      gl.bindBuffer($52d13d33bd60c65a724bfd448491637f$var$ARRAY_BUFFER$1, b.buffer);
      const numComponents = b.size || b.numComponents || defaultSize;
      const size = numComponents / count;
      const type = b.type || $52d13d33bd60c65a724bfd448491637f$var$FLOAT$3;
      const typeInfo = $52d13d33bd60c65a724bfd448491637f$var$typeMap[type];
      const stride = typeInfo.size * numComponents;
      const normalize = b.normalize || false;
      const offset = b.offset || 0;
      const rowOffset = stride / count;
      for (let i = 0; i < count; ++i) {
        gl.enableVertexAttribArray(index + i);
        gl.vertexAttribPointer(index + i, size, type, normalize, stride, offset + rowOffset * i);
        if (b.divisor !== undefined) {
          gl.vertexAttribDivisor(index + i, b.divisor);
        }
      }
    };
  }
  const $52d13d33bd60c65a724bfd448491637f$var$attrTypeMap = {};
  $52d13d33bd60c65a724bfd448491637f$var$attrTypeMap[$52d13d33bd60c65a724bfd448491637f$var$FLOAT$3] = {
    size: 4,
    setter: $52d13d33bd60c65a724bfd448491637f$var$floatAttribSetter
  };
  $52d13d33bd60c65a724bfd448491637f$var$attrTypeMap[$52d13d33bd60c65a724bfd448491637f$var$FLOAT_VEC2] = {
    size: 8,
    setter: $52d13d33bd60c65a724bfd448491637f$var$floatAttribSetter
  };
  $52d13d33bd60c65a724bfd448491637f$var$attrTypeMap[$52d13d33bd60c65a724bfd448491637f$var$FLOAT_VEC3] = {
    size: 12,
    setter: $52d13d33bd60c65a724bfd448491637f$var$floatAttribSetter
  };
  $52d13d33bd60c65a724bfd448491637f$var$attrTypeMap[$52d13d33bd60c65a724bfd448491637f$var$FLOAT_VEC4] = {
    size: 16,
    setter: $52d13d33bd60c65a724bfd448491637f$var$floatAttribSetter
  };
  $52d13d33bd60c65a724bfd448491637f$var$attrTypeMap[$52d13d33bd60c65a724bfd448491637f$var$INT$3] = {
    size: 4,
    setter: $52d13d33bd60c65a724bfd448491637f$var$intAttribSetter
  };
  $52d13d33bd60c65a724bfd448491637f$var$attrTypeMap[$52d13d33bd60c65a724bfd448491637f$var$INT_VEC2] = {
    size: 8,
    setter: $52d13d33bd60c65a724bfd448491637f$var$intAttribSetter
  };
  $52d13d33bd60c65a724bfd448491637f$var$attrTypeMap[$52d13d33bd60c65a724bfd448491637f$var$INT_VEC3] = {
    size: 12,
    setter: $52d13d33bd60c65a724bfd448491637f$var$intAttribSetter
  };
  $52d13d33bd60c65a724bfd448491637f$var$attrTypeMap[$52d13d33bd60c65a724bfd448491637f$var$INT_VEC4] = {
    size: 16,
    setter: $52d13d33bd60c65a724bfd448491637f$var$intAttribSetter
  };
  $52d13d33bd60c65a724bfd448491637f$var$attrTypeMap[$52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_INT$3] = {
    size: 4,
    setter: $52d13d33bd60c65a724bfd448491637f$var$uintAttribSetter
  };
  $52d13d33bd60c65a724bfd448491637f$var$attrTypeMap[$52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_INT_VEC2] = {
    size: 8,
    setter: $52d13d33bd60c65a724bfd448491637f$var$uintAttribSetter
  };
  $52d13d33bd60c65a724bfd448491637f$var$attrTypeMap[$52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_INT_VEC3] = {
    size: 12,
    setter: $52d13d33bd60c65a724bfd448491637f$var$uintAttribSetter
  };
  $52d13d33bd60c65a724bfd448491637f$var$attrTypeMap[$52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_INT_VEC4] = {
    size: 16,
    setter: $52d13d33bd60c65a724bfd448491637f$var$uintAttribSetter
  };
  $52d13d33bd60c65a724bfd448491637f$var$attrTypeMap[$52d13d33bd60c65a724bfd448491637f$var$BOOL] = {
    size: 4,
    setter: $52d13d33bd60c65a724bfd448491637f$var$intAttribSetter
  };
  $52d13d33bd60c65a724bfd448491637f$var$attrTypeMap[$52d13d33bd60c65a724bfd448491637f$var$BOOL_VEC2] = {
    size: 8,
    setter: $52d13d33bd60c65a724bfd448491637f$var$intAttribSetter
  };
  $52d13d33bd60c65a724bfd448491637f$var$attrTypeMap[$52d13d33bd60c65a724bfd448491637f$var$BOOL_VEC3] = {
    size: 12,
    setter: $52d13d33bd60c65a724bfd448491637f$var$intAttribSetter
  };
  $52d13d33bd60c65a724bfd448491637f$var$attrTypeMap[$52d13d33bd60c65a724bfd448491637f$var$BOOL_VEC4] = {
    size: 16,
    setter: $52d13d33bd60c65a724bfd448491637f$var$intAttribSetter
  };
  $52d13d33bd60c65a724bfd448491637f$var$attrTypeMap[$52d13d33bd60c65a724bfd448491637f$var$FLOAT_MAT2] = {
    size: 4,
    setter: $52d13d33bd60c65a724bfd448491637f$var$matAttribSetter,
    count: 2
  };
  $52d13d33bd60c65a724bfd448491637f$var$attrTypeMap[$52d13d33bd60c65a724bfd448491637f$var$FLOAT_MAT3] = {
    size: 9,
    setter: $52d13d33bd60c65a724bfd448491637f$var$matAttribSetter,
    count: 3
  };
  $52d13d33bd60c65a724bfd448491637f$var$attrTypeMap[$52d13d33bd60c65a724bfd448491637f$var$FLOAT_MAT4] = {
    size: 16,
    setter: $52d13d33bd60c65a724bfd448491637f$var$matAttribSetter,
    count: 4
  };
  const $52d13d33bd60c65a724bfd448491637f$var$errorRE = /ERROR:\s*\d+:(\d+)/gi;
  function $52d13d33bd60c65a724bfd448491637f$var$addLineNumbersWithError(src, log = '', lineOffset = 0) {
    // Note: Error message formats are not defined by any spec so this may or may not work.
    const matches = [...log.matchAll($52d13d33bd60c65a724bfd448491637f$var$errorRE)];
    const lineNoToErrorMap = new Map(matches.map((m, ndx) => {
      const lineNo = parseInt(m[1]);
      const next = matches[ndx + 1];
      const end = next ? next.index : log.length;
      const msg = log.substring(m.index, end);
      return [lineNo - 1, msg];
    }));
    return src.split('\n').map((line, lineNo) => {
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
  */
  const $52d13d33bd60c65a724bfd448491637f$var$spaceRE = /^[ \t]*\n/;
  /**
  * Loads a shader.
  * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
  * @param {string} shaderSource The shader source.
  * @param {number} shaderType The type of shader.
  * @param {module:twgl.ErrorCallback} opt_errorCallback callback for errors.
  * @return {WebGLShader} The created shader.
  * @private
  */
  function $52d13d33bd60c65a724bfd448491637f$var$loadShader(gl, shaderSource, shaderType, opt_errorCallback) {
    const errFn = opt_errorCallback || $52d13d33bd60c65a724bfd448491637f$var$error$1;
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
    if ($52d13d33bd60c65a724bfd448491637f$var$spaceRE.test(shaderSource)) {
      lineOffset = 1;
      shaderSource = shaderSource.replace($52d13d33bd60c65a724bfd448491637f$var$spaceRE, '');
    }
    // Load the shader source
    gl.shaderSource(shader, shaderSource);
    // Compile the shader
    gl.compileShader(shader);
    // Check the compile status
    const compiled = gl.getShaderParameter(shader, $52d13d33bd60c65a724bfd448491637f$var$COMPILE_STATUS);
    if (!compiled) {
      // Something went wrong during compilation; get the error
      const lastError = gl.getShaderInfoLog(shader);
      errFn(`${$52d13d33bd60c65a724bfd448491637f$var$addLineNumbersWithError(shaderSource, lastError, lineOffset)}\nError compiling ${$52d13d33bd60c65a724bfd448491637f$export$glEnumToString(gl, shaderType)}: ${lastError}`);
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
  */
  /**
  * Gets the program options based on all these optional arguments
  * @param {module:twgl.ProgramOptions|string[]} [opt_attribs] Options for the program or an array of attribs names. Locations will be assigned by index if not passed in
  * @param {number[]} [opt_locations] The locations for the. A parallel array to opt_attribs letting you assign locations.
  * @param {module:twgl.ErrorCallback} [opt_errorCallback] callback for errors. By default it just prints an error to the console
  *        on error. If you want something else pass an callback. It's passed an error message.
  * @return {module:twgl.ProgramOptions} an instance of ProgramOptions based on the arguments passed in
  * @private
  */
  function $52d13d33bd60c65a724bfd448491637f$var$getProgramOptions(opt_attribs, opt_locations, opt_errorCallback) {
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
      if (opt_attribs.errorCallback) {
        return opt_attribs;
      }
      const opt = opt_attribs;
      opt_errorCallback = opt.errorCallback;
      opt_attribs = opt.attribLocations;
      transformFeedbackVaryings = opt.transformFeedbackVaryings;
      transformFeedbackMode = opt.transformFeedbackMode;
    }
    const options = {
      errorCallback: opt_errorCallback || $52d13d33bd60c65a724bfd448491637f$var$error$1,
      transformFeedbackVaryings: transformFeedbackVaryings,
      transformFeedbackMode: transformFeedbackMode
    };
    if (opt_attribs) {
      let attribLocations = {};
      if (Array.isArray(opt_attribs)) {
        opt_attribs.forEach(function (attrib, ndx) {
          attribLocations[attrib] = opt_locations ? opt_locations[ndx] : ndx;
        });
      } else {
        attribLocations = opt_attribs;
      }
      options.attribLocations = attribLocations;
    }
    return options;
  }
  const $52d13d33bd60c65a724bfd448491637f$var$defaultShaderType = ["VERTEX_SHADER", "FRAGMENT_SHADER"];
  function $52d13d33bd60c65a724bfd448491637f$var$getShaderTypeFromScriptType(gl, scriptType) {
    if (scriptType.indexOf("frag") >= 0) {
      return $52d13d33bd60c65a724bfd448491637f$var$FRAGMENT_SHADER;
    } else if (scriptType.indexOf("vert") >= 0) {
      return $52d13d33bd60c65a724bfd448491637f$var$VERTEX_SHADER;
    }
    return undefined;
  }
  function $52d13d33bd60c65a724bfd448491637f$var$deleteShaders(gl, shaders) {
    shaders.forEach(function (shader) {
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
  */
  function $52d13d33bd60c65a724bfd448491637f$export$createProgram(gl, shaders, opt_attribs, opt_locations, opt_errorCallback) {
    const progOptions = $52d13d33bd60c65a724bfd448491637f$var$getProgramOptions(opt_attribs, opt_locations, opt_errorCallback);
    const realShaders = [];
    const newShaders = [];
    for (let ndx = 0; ndx < shaders.length; ++ndx) {
      let shader = shaders[ndx];
      if (typeof shader === 'string') {
        const elem = $52d13d33bd60c65a724bfd448491637f$var$getElementById(shader);
        const src = elem ? elem.text : shader;
        let type = gl[$52d13d33bd60c65a724bfd448491637f$var$defaultShaderType[ndx]];
        if (elem && elem.type) {
          type = $52d13d33bd60c65a724bfd448491637f$var$getShaderTypeFromScriptType(gl, elem.type) || type;
        }
        shader = $52d13d33bd60c65a724bfd448491637f$var$loadShader(gl, src, type, progOptions.errorCallback);
        newShaders.push(shader);
      }
      if ($52d13d33bd60c65a724bfd448491637f$var$isShader(gl, shader)) {
        realShaders.push(shader);
      }
    }
    if (realShaders.length !== shaders.length) {
      progOptions.errorCallback("not enough shaders for program");
      $52d13d33bd60c65a724bfd448491637f$var$deleteShaders(gl, newShaders);
      return null;
    }
    const program = gl.createProgram();
    realShaders.forEach(function (shader) {
      gl.attachShader(program, shader);
    });
    if (progOptions.attribLocations) {
      Object.keys(progOptions.attribLocations).forEach(function (attrib) {
        gl.bindAttribLocation(program, progOptions.attribLocations[attrib], attrib);
      });
    }
    let varyings = progOptions.transformFeedbackVaryings;
    if (varyings) {
      if (varyings.attribs) {
        varyings = varyings.attribs;
      }
      if (!Array.isArray(varyings)) {
        varyings = Object.keys(varyings);
      }
      gl.transformFeedbackVaryings(program, varyings, progOptions.transformFeedbackMode || $52d13d33bd60c65a724bfd448491637f$var$SEPARATE_ATTRIBS);
    }
    gl.linkProgram(program);
    // Check the link status
    const linked = gl.getProgramParameter(program, $52d13d33bd60c65a724bfd448491637f$var$LINK_STATUS);
    if (!linked) {
      // something went wrong with the link
      const lastError = gl.getProgramInfoLog(program);
      progOptions.errorCallback(`${realShaders.map(shader => {
        const src = $52d13d33bd60c65a724bfd448491637f$var$addLineNumbersWithError(gl.getShaderSource(shader), '', 0);
        const type = gl.getShaderParameter(shader, gl.SHADER_TYPE);
        return `${$52d13d33bd60c65a724bfd448491637f$export$glEnumToString(gl, type)}\n${src}}`;
      }).join('\n')}\nError in program linking: ${lastError}`);
      gl.deleteProgram(program);
      $52d13d33bd60c65a724bfd448491637f$var$deleteShaders(gl, newShaders);
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
  */
  function $52d13d33bd60c65a724bfd448491637f$var$createShaderFromScript(gl, scriptId, opt_shaderType, opt_errorCallback) {
    let shaderSource = "";
    const shaderScript = $52d13d33bd60c65a724bfd448491637f$var$getElementById(scriptId);
    if (!shaderScript) {
      throw new Error(`unknown script element: ${scriptId}`);
    }
    shaderSource = shaderScript.text;
    const shaderType = opt_shaderType || $52d13d33bd60c65a724bfd448491637f$var$getShaderTypeFromScriptType(gl, shaderScript.type);
    if (!shaderType) {
      throw new Error('unknown shader type');
    }
    return $52d13d33bd60c65a724bfd448491637f$var$loadShader(gl, shaderSource, shaderType, opt_errorCallback);
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
  */
  function $52d13d33bd60c65a724bfd448491637f$export$createProgramFromScripts(gl, shaderScriptIds, opt_attribs, opt_locations, opt_errorCallback) {
    const progOptions = $52d13d33bd60c65a724bfd448491637f$var$getProgramOptions(opt_attribs, opt_locations, opt_errorCallback);
    const shaders = [];
    for (let ii = 0; ii < shaderScriptIds.length; ++ii) {
      const shader = $52d13d33bd60c65a724bfd448491637f$var$createShaderFromScript(gl, shaderScriptIds[ii], gl[$52d13d33bd60c65a724bfd448491637f$var$defaultShaderType[ii]], progOptions.errorCallback);
      if (!shader) {
        return null;
      }
      shaders.push(shader);
    }
    return $52d13d33bd60c65a724bfd448491637f$export$createProgram(gl, shaders, progOptions);
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
  */
  function $52d13d33bd60c65a724bfd448491637f$export$createProgramFromSources(gl, shaderSources, opt_attribs, opt_locations, opt_errorCallback) {
    const progOptions = $52d13d33bd60c65a724bfd448491637f$var$getProgramOptions(opt_attribs, opt_locations, opt_errorCallback);
    const shaders = [];
    for (let ii = 0; ii < shaderSources.length; ++ii) {
      const shader = $52d13d33bd60c65a724bfd448491637f$var$loadShader(gl, shaderSources[ii], gl[$52d13d33bd60c65a724bfd448491637f$var$defaultShaderType[ii]], progOptions.errorCallback);
      if (!shader) {
        return null;
      }
      shaders.push(shader);
    }
    return $52d13d33bd60c65a724bfd448491637f$export$createProgram(gl, shaders, progOptions);
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
  */
  function $52d13d33bd60c65a724bfd448491637f$var$isBuiltIn(info) {
    const name = info.name;
    return name.startsWith("gl_") || name.startsWith("webgl_");
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
  */
  function $52d13d33bd60c65a724bfd448491637f$export$createUniformSetters(gl, program) {
    let textureUnit = 0;
    /**
    * Creates a setter for a uniform of the given program with it's
    * location embedded in the setter.
    * @param {WebGLProgram} program
    * @param {WebGLUniformInfo} uniformInfo
    * @returns {function} the created setter.
    */
    function createUniformSetter(program, uniformInfo, location) {
      const isArray = uniformInfo.name.endsWith("[0]");
      const type = uniformInfo.type;
      const typeInfo = $52d13d33bd60c65a724bfd448491637f$var$typeMap[type];
      if (!typeInfo) {
        throw new Error(`unknown type: 0x${type.toString(16)}`);
      }
      let setter;
      if (typeInfo.bindPoint) {
        // it's a sampler
        const unit = textureUnit;
        textureUnit += uniformInfo.size;
        if (isArray) {
          setter = typeInfo.arraySetter(gl, type, unit, location, uniformInfo.size);
        } else {
          setter = typeInfo.setter(gl, type, unit, location, uniformInfo.size);
        }
      } else {
        if (typeInfo.arraySetter && isArray) {
          setter = typeInfo.arraySetter(gl, location);
        } else {
          setter = typeInfo.setter(gl, location);
        }
      }
      setter.location = location;
      return setter;
    }
    const uniformSetters = {};
    const numUniforms = gl.getProgramParameter(program, $52d13d33bd60c65a724bfd448491637f$var$ACTIVE_UNIFORMS);
    for (let ii = 0; ii < numUniforms; ++ii) {
      const uniformInfo = gl.getActiveUniform(program, ii);
      if ($52d13d33bd60c65a724bfd448491637f$var$isBuiltIn(uniformInfo)) {
        continue;
      }
      let name = uniformInfo.name;
      // remove the array suffix.
      if (name.endsWith("[0]")) {
        name = name.substr(0, name.length - 3);
      }
      const location = gl.getUniformLocation(program, uniformInfo.name);
      // the uniform will have no location if it's in a uniform block
      if (location) {
        uniformSetters[name] = createUniformSetter(program, uniformInfo, location);
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
  */
  /**
  * Create TransformFeedbackInfo for passing to bindTransformFeedbackInfo.
  * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
  * @param {WebGLProgram} program an existing WebGLProgram.
  * @return {Object<string, module:twgl.TransformFeedbackInfo>}
  * @memberOf module:twgl
  */
  function $52d13d33bd60c65a724bfd448491637f$export$createTransformFeedbackInfo(gl, program) {
    const info = {};
    const numVaryings = gl.getProgramParameter(program, $52d13d33bd60c65a724bfd448491637f$var$TRANSFORM_FEEDBACK_VARYINGS);
    for (let ii = 0; ii < numVaryings; ++ii) {
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
  */
  function $52d13d33bd60c65a724bfd448491637f$export$bindTransformFeedbackInfo(gl, transformFeedbackInfo, bufferInfo) {
    if (transformFeedbackInfo.transformFeedbackInfo) {
      transformFeedbackInfo = transformFeedbackInfo.transformFeedbackInfo;
    }
    if (bufferInfo.attribs) {
      bufferInfo = bufferInfo.attribs;
    }
    for (const name in bufferInfo) {
      const varying = transformFeedbackInfo[name];
      if (varying) {
        const buf = bufferInfo[name];
        if (buf.offset) {
          gl.bindBufferRange($52d13d33bd60c65a724bfd448491637f$var$TRANSFORM_FEEDBACK_BUFFER, varying.index, buf.buffer, buf.offset, buf.size);
        } else {
          gl.bindBufferBase($52d13d33bd60c65a724bfd448491637f$var$TRANSFORM_FEEDBACK_BUFFER, varying.index, buf.buffer);
        }
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
  */
  function $52d13d33bd60c65a724bfd448491637f$export$createTransformFeedback(gl, programInfo, bufferInfo) {
    const tf = gl.createTransformFeedback();
    gl.bindTransformFeedback($52d13d33bd60c65a724bfd448491637f$var$TRANSFORM_FEEDBACK, tf);
    gl.useProgram(programInfo.program);
    $52d13d33bd60c65a724bfd448491637f$export$bindTransformFeedbackInfo(gl, programInfo, bufferInfo);
    gl.bindTransformFeedback($52d13d33bd60c65a724bfd448491637f$var$TRANSFORM_FEEDBACK, null);
    return tf;
  }
  /**
  * @typedef {Object} UniformData
  * @property {number} type The WebGL type enum for this uniform
  * @property {number} size The number of elements for this uniform
  * @property {number} blockNdx The block index this uniform appears in
  * @property {number} offset The byte offset in the block for this uniform's value
  * @memberOf module:twgl
  */
  /**
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
  */
  /**
  * A `UniformBlockSpec` represents the data needed to create and bind
  * UniformBlockObjects for a given program
  *
  * @typedef {Object} UniformBlockSpec
  * @property {Object.<string, module:twgl.BlockSpec> blockSpecs The BlockSpec for each block by block name
  * @property {UniformData[]} uniformData An array of data for each uniform by uniform index.
  * @memberOf module:twgl
  */
  /**
  * Creates a UniformBlockSpec for the given program.
  *
  * A UniformBlockSpec represents the data needed to create and bind
  * UniformBlockObjects
  *
  * @param {WebGL2RenderingContext} gl A WebGL2 Rendering Context
  * @param {WebGLProgram} program A WebGLProgram for a successfully linked program
  * @return {module:twgl.UniformBlockSpec} The created UniformBlockSpec
  * @memberOf module:twgl/programs
  */
  function $52d13d33bd60c65a724bfd448491637f$export$createUniformBlockSpecFromProgram(gl, program) {
    const numUniforms = gl.getProgramParameter(program, $52d13d33bd60c65a724bfd448491637f$var$ACTIVE_UNIFORMS);
    const uniformData = [];
    const uniformIndices = [];
    for (let ii = 0; ii < numUniforms; ++ii) {
      uniformIndices.push(ii);
      uniformData.push({});
      const uniformInfo = gl.getActiveUniform(program, ii);
      if ($52d13d33bd60c65a724bfd448491637f$var$isBuiltIn(uniformInfo)) {
        break;
      }
      uniformData[ii].name = uniformInfo.name;
    }
    [["UNIFORM_TYPE", "type"], ["UNIFORM_SIZE", "size"], // num elements
    ["UNIFORM_BLOCK_INDEX", "blockNdx"], ["UNIFORM_OFFSET", "offset"]].forEach(function (pair) {
      const pname = pair[0];
      const key = pair[1];
      gl.getActiveUniforms(program, uniformIndices, gl[pname]).forEach(function (value, ndx) {
        uniformData[ndx][key] = value;
      });
    });
    const blockSpecs = {};
    const numUniformBlocks = gl.getProgramParameter(program, $52d13d33bd60c65a724bfd448491637f$var$ACTIVE_UNIFORM_BLOCKS);
    for (let ii = 0; ii < numUniformBlocks; ++ii) {
      const name = gl.getActiveUniformBlockName(program, ii);
      const blockSpec = {
        index: gl.getUniformBlockIndex(program, name),
        usedByVertexShader: gl.getActiveUniformBlockParameter(program, ii, $52d13d33bd60c65a724bfd448491637f$var$UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER),
        usedByFragmentShader: gl.getActiveUniformBlockParameter(program, ii, $52d13d33bd60c65a724bfd448491637f$var$UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER),
        size: gl.getActiveUniformBlockParameter(program, ii, $52d13d33bd60c65a724bfd448491637f$var$UNIFORM_BLOCK_DATA_SIZE),
        uniformIndices: gl.getActiveUniformBlockParameter(program, ii, $52d13d33bd60c65a724bfd448491637f$var$UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES)
      };
      blockSpec.used = blockSpec.usedByVertexShader || blockSpec.usedByFragmentShader;
      blockSpecs[name] = blockSpec;
    }
    return {
      blockSpecs: blockSpecs,
      uniformData: uniformData
    };
  }
  const $52d13d33bd60c65a724bfd448491637f$var$arraySuffixRE = /\[\d+\]\.$/;
  // better way to check?
  const $52d13d33bd60c65a724bfd448491637f$var$pad = (v, padding) => ((v + (padding - 1)) / padding | 0) * padding;
  function $52d13d33bd60c65a724bfd448491637f$var$createUniformBlockUniformSetter(view, Type, typeSize, paddedSize, isArray) {
    if (isArray) {
      const numElements = typeSize / Type.BYTES_PER_ELEMENT;
      const numPaddedElements = paddedSize / Type.BYTES_PER_ELEMENT;
      return function (value) {
        let dst = 0;
        for (let src = 0; src < value.length; src += numElements) {
          for (let i = 0; i < numElements; ++i) {
            view[dst + i] = value[src + i];
          }
          dst += numPaddedElements;
        }
      };
    } else {
      return function (value) {
        if (value.length) {
          view.set(value);
        } else {
          view[0] = value;
        }
      };
    }
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
  */
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
  * @param {WebGLProgram} program A WebGLProgram
  * @param {module:twgl.UniformBlockSpec} uniformBlockSpec. A UniformBlockSpec as returned
  *     from {@link module:twgl.createUniformBlockSpecFromProgram}.
  * @param {string} blockName The name of the block.
  * @return {module:twgl.UniformBlockInfo} The created UniformBlockInfo
  * @memberOf module:twgl/programs
  */
  function $52d13d33bd60c65a724bfd448491637f$export$createUniformBlockInfoFromProgram(gl, program, uniformBlockSpec, blockName) {
    const blockSpecs = uniformBlockSpec.blockSpecs;
    const uniformData = uniformBlockSpec.uniformData;
    const blockSpec = blockSpecs[blockName];
    if (!blockSpec) {
      $52d13d33bd60c65a724bfd448491637f$var$warn$1("no uniform block object named:", blockName);
      return {
        name: blockName,
        uniforms: {}
      };
    }
    const array = new ArrayBuffer(blockSpec.size);
    const buffer = gl.createBuffer();
    const uniformBufferIndex = blockSpec.index;
    gl.bindBuffer($52d13d33bd60c65a724bfd448491637f$var$UNIFORM_BUFFER, buffer);
    gl.uniformBlockBinding(program, blockSpec.index, uniformBufferIndex);
    let prefix = blockName + ".";
    if ($52d13d33bd60c65a724bfd448491637f$var$arraySuffixRE.test(prefix)) {
      prefix = prefix.replace($52d13d33bd60c65a724bfd448491637f$var$arraySuffixRE, ".");
    }
    const uniforms = {};
    const setters = {};
    blockSpec.uniformIndices.forEach(function (uniformNdx) {
      const data = uniformData[uniformNdx];
      const typeInfo = $52d13d33bd60c65a724bfd448491637f$var$typeMap[data.type];
      const Type = typeInfo.Type;
      const paddedSize = $52d13d33bd60c65a724bfd448491637f$var$pad(typeInfo.size, 16);
      const length = typeInfo.size + (data.size - 1) * paddedSize;
      let name = data.name;
      if (name.startsWith(prefix)) {
        name = name.substr(prefix.length);
      }
      const isArray = name.endsWith('[0]');
      if (isArray) {
        name = name.substr(0, name.length - 3);
      }
      const uniformView = new Type(array, data.offset, length / Type.BYTES_PER_ELEMENT);
      uniforms[name] = uniformView;
      setters[name] = $52d13d33bd60c65a724bfd448491637f$var$createUniformBlockUniformSetter(uniformView, Type, typeInfo.size, paddedSize, isArray);
    });
    return {
      name: blockName,
      array,
      asFloat: new Float32Array(array),
      // for debugging
      buffer,
      uniforms,
      setters
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
  */
  function $52d13d33bd60c65a724bfd448491637f$export$createUniformBlockInfo(gl, programInfo, blockName) {
    return $52d13d33bd60c65a724bfd448491637f$export$createUniformBlockInfoFromProgram(gl, programInfo.program, programInfo.uniformBlockSpec, blockName);
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
  */
  function $52d13d33bd60c65a724bfd448491637f$export$bindUniformBlock(gl, programInfo, uniformBlockInfo) {
    const uniformBlockSpec = programInfo.uniformBlockSpec || programInfo;
    const blockSpec = uniformBlockSpec.blockSpecs[uniformBlockInfo.name];
    if (blockSpec) {
      const bufferBindIndex = blockSpec.index;
      gl.bindBufferRange($52d13d33bd60c65a724bfd448491637f$var$UNIFORM_BUFFER, bufferBindIndex, uniformBlockInfo.buffer, uniformBlockInfo.offset || 0, uniformBlockInfo.array.byteLength);
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
  */
  function $52d13d33bd60c65a724bfd448491637f$export$setUniformBlock(gl, programInfo, uniformBlockInfo) {
    if ($52d13d33bd60c65a724bfd448491637f$export$bindUniformBlock(gl, programInfo, uniformBlockInfo)) {
      gl.bufferData($52d13d33bd60c65a724bfd448491637f$var$UNIFORM_BUFFER, uniformBlockInfo.array, $52d13d33bd60c65a724bfd448491637f$var$DYNAMIC_DRAW);
    }
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
  *  Any name that doesn't match will be ignored
  * @memberOf module:twgl/programs
  */
  function $52d13d33bd60c65a724bfd448491637f$export$setBlockUniforms(uniformBlockInfo, values) {
    const setters = uniformBlockInfo.setters;
    for (const name in values) {
      const setter = setters[name];
      if (setter) {
        const value = values[name];
        setter(value);
      }
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
  * @memberOf module:twgl/programs
  */
  function $52d13d33bd60c65a724bfd448491637f$export$setUniforms(setters, values) {
    // eslint-disable-line
    const actualSetters = setters.uniformSetters || setters;
    const numArgs = arguments.length;
    for (let aNdx = 1; aNdx < numArgs; ++aNdx) {
      const values = arguments[aNdx];
      if (Array.isArray(values)) {
        const numValues = values.length;
        for (let ii = 0; ii < numValues; ++ii) {
          $52d13d33bd60c65a724bfd448491637f$export$setUniforms(actualSetters, values[ii]);
        }
      } else {
        for (const name in values) {
          const setter = actualSetters[name];
          if (setter) {
            setter(values[name]);
          }
        }
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
  */
  const $52d13d33bd60c65a724bfd448491637f$export$setUniformsAndBindTextures = $52d13d33bd60c65a724bfd448491637f$export$setUniforms;
  /**
  * Creates setter functions for all attributes of a shader
  * program. You can pass this to {@link module:twgl.setBuffersAndAttributes} to set all your buffers and attributes.
  *
  * @see {@link module:twgl.setAttributes} for example
  * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
  * @param {WebGLProgram} program the program to create setters for.
  * @return {Object.<string, function>} an object with a setter for each attribute by name.
  * @memberOf module:twgl/programs
  */
  function $52d13d33bd60c65a724bfd448491637f$export$createAttributeSetters(gl, program) {
    const attribSetters = {};
    const numAttribs = gl.getProgramParameter(program, $52d13d33bd60c65a724bfd448491637f$var$ACTIVE_ATTRIBUTES);
    for (let ii = 0; ii < numAttribs; ++ii) {
      const attribInfo = gl.getActiveAttrib(program, ii);
      if ($52d13d33bd60c65a724bfd448491637f$var$isBuiltIn(attribInfo)) {
        continue;
      }
      const index = gl.getAttribLocation(program, attribInfo.name);
      const typeInfo = $52d13d33bd60c65a724bfd448491637f$var$attrTypeMap[attribInfo.type];
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
  */
  function $52d13d33bd60c65a724bfd448491637f$export$setAttributes(setters, buffers) {
    for (const name in buffers) {
      const setter = setters[name];
      if (setter) {
        setter(buffers[name]);
      }
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
  */
  function $52d13d33bd60c65a724bfd448491637f$export$setBuffersAndAttributes(gl, programInfo, buffers) {
    if (buffers.vertexArrayObject) {
      gl.bindVertexArray(buffers.vertexArrayObject);
    } else {
      $52d13d33bd60c65a724bfd448491637f$export$setAttributes(programInfo.attribSetters || programInfo, buffers.attribs);
      if (buffers.indices) {
        gl.bindBuffer($52d13d33bd60c65a724bfd448491637f$var$ELEMENT_ARRAY_BUFFER$1, buffers.indices);
      }
    }
  }
  /**
  * @typedef {Object} ProgramInfo
  * @property {WebGLProgram} program A shader program
  * @property {Object<string, function>} uniformSetters object of setters as returned from createUniformSetters,
  * @property {Object<string, function>} attribSetters object of setters as returned from createAttribSetters,
  * @property {module:twgl.UniformBlockSpec} [uniformBlockSpace] a uniform block spec for making UniformBlockInfos with createUniformBlockInfo etc..
  * @property {Object<string, module:twgl.TransformFeedbackInfo>} [transformFeedbackInfo] info for transform feedbacks
  * @memberOf module:twgl
  */
  /**
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
  */
  function $52d13d33bd60c65a724bfd448491637f$export$createProgramInfoFromProgram(gl, program) {
    const uniformSetters = $52d13d33bd60c65a724bfd448491637f$export$createUniformSetters(gl, program);
    const attribSetters = $52d13d33bd60c65a724bfd448491637f$export$createAttributeSetters(gl, program);
    const programInfo = {
      program: program,
      uniformSetters: uniformSetters,
      attribSetters: attribSetters
    };
    if ($52d13d33bd60c65a724bfd448491637f$export$isWebGL2(gl)) {
      programInfo.uniformBlockSpec = $52d13d33bd60c65a724bfd448491637f$export$createUniformBlockSpecFromProgram(gl, program);
      programInfo.transformFeedbackInfo = $52d13d33bd60c65a724bfd448491637f$export$createTransformFeedbackInfo(gl, program);
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
  */
  function $52d13d33bd60c65a724bfd448491637f$export$createProgramInfo(gl, shaderSources, opt_attribs, opt_locations, opt_errorCallback) {
    const progOptions = $52d13d33bd60c65a724bfd448491637f$var$getProgramOptions(opt_attribs, opt_locations, opt_errorCallback);
    let good = true;
    shaderSources = shaderSources.map(function (source) {
      // Lets assume if there is no \n it's an id
      if (source.indexOf("\n") < 0) {
        const script = $52d13d33bd60c65a724bfd448491637f$var$getElementById(source);
        if (!script) {
          progOptions.errorCallback("no element with id: " + source);
          good = false;
        } else {
          source = script.text;
        }
      }
      return source;
    });
    if (!good) {
      return null;
    }
    const program = $52d13d33bd60c65a724bfd448491637f$export$createProgramFromSources(gl, shaderSources, progOptions);
    if (!program) {
      return null;
    }
    return $52d13d33bd60c65a724bfd448491637f$export$createProgramInfoFromProgram(gl, program);
  }
  var $52d13d33bd60c65a724bfd448491637f$export$programs = /*#__PURE__*/Object.freeze({
    __proto__: null,
    createAttributeSetters: $52d13d33bd60c65a724bfd448491637f$export$createAttributeSetters,
    createProgram: $52d13d33bd60c65a724bfd448491637f$export$createProgram,
    createProgramFromScripts: $52d13d33bd60c65a724bfd448491637f$export$createProgramFromScripts,
    createProgramFromSources: $52d13d33bd60c65a724bfd448491637f$export$createProgramFromSources,
    createProgramInfo: $52d13d33bd60c65a724bfd448491637f$export$createProgramInfo,
    createProgramInfoFromProgram: $52d13d33bd60c65a724bfd448491637f$export$createProgramInfoFromProgram,
    createUniformSetters: $52d13d33bd60c65a724bfd448491637f$export$createUniformSetters,
    createUniformBlockSpecFromProgram: $52d13d33bd60c65a724bfd448491637f$export$createUniformBlockSpecFromProgram,
    createUniformBlockInfoFromProgram: $52d13d33bd60c65a724bfd448491637f$export$createUniformBlockInfoFromProgram,
    createUniformBlockInfo: $52d13d33bd60c65a724bfd448491637f$export$createUniformBlockInfo,
    createTransformFeedback: $52d13d33bd60c65a724bfd448491637f$export$createTransformFeedback,
    createTransformFeedbackInfo: $52d13d33bd60c65a724bfd448491637f$export$createTransformFeedbackInfo,
    bindTransformFeedbackInfo: $52d13d33bd60c65a724bfd448491637f$export$bindTransformFeedbackInfo,
    setAttributes: $52d13d33bd60c65a724bfd448491637f$export$setAttributes,
    setBuffersAndAttributes: $52d13d33bd60c65a724bfd448491637f$export$setBuffersAndAttributes,
    setUniforms: $52d13d33bd60c65a724bfd448491637f$export$setUniforms,
    setUniformsAndBindTextures: $52d13d33bd60c65a724bfd448491637f$export$setUniformsAndBindTextures,
    setUniformBlock: $52d13d33bd60c65a724bfd448491637f$export$setUniformBlock,
    setBlockUniforms: $52d13d33bd60c65a724bfd448491637f$export$setBlockUniforms,
    bindUniformBlock: $52d13d33bd60c65a724bfd448491637f$export$bindUniformBlock
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
  */
  const $52d13d33bd60c65a724bfd448491637f$var$TRIANGLES = 0x0004;
  const $52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_SHORT$3 = 0x1403;
  /**
  * Drawing related functions
  *
  * For backward compatibility they are available at both `twgl.draw` and `twgl`
  * itself
  *
  * See {@link module:twgl} for core functions
  *
  * @module twgl/draw
  */
  /**
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
  */
  function $52d13d33bd60c65a724bfd448491637f$export$drawBufferInfo(gl, bufferInfo, type, count, offset, instanceCount) {
    type = type === undefined ? $52d13d33bd60c65a724bfd448491637f$var$TRIANGLES : type;
    const indices = bufferInfo.indices;
    const elementType = bufferInfo.elementType;
    const numElements = count === undefined ? bufferInfo.numElements : count;
    offset = offset === undefined ? 0 : offset;
    if (elementType || indices) {
      if (instanceCount !== undefined) {
        gl.drawElementsInstanced(type, numElements, elementType === undefined ? $52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_SHORT$3 : bufferInfo.elementType, offset, instanceCount);
      } else {
        gl.drawElements(type, numElements, elementType === undefined ? $52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_SHORT$3 : bufferInfo.elementType, offset);
      }
    } else {
      if (instanceCount !== undefined) {
        gl.drawArraysInstanced(type, offset, numElements, instanceCount);
      } else {
        gl.drawArrays(type, offset, numElements);
      }
    }
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
  */
  /**
  * Draws a list of objects
  * @param {WebGLRenderingContext} gl A WebGLRenderingContext
  * @param {DrawObject[]} objectsToDraw an array of objects to draw.
  * @memberOf module:twgl/draw
  */
  function $52d13d33bd60c65a724bfd448491637f$export$drawObjectList(gl, objectsToDraw) {
    let lastUsedProgramInfo = null;
    let lastUsedBufferInfo = null;
    objectsToDraw.forEach(function (object) {
      if (object.active === false) {
        return;
      }
      const programInfo = object.programInfo;
      const bufferInfo = object.vertexArrayInfo || object.bufferInfo;
      let bindBuffers = false;
      const type = object.type === undefined ? $52d13d33bd60c65a724bfd448491637f$var$TRIANGLES : object.type;
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
        if (lastUsedBufferInfo && lastUsedBufferInfo.vertexArrayObject && !bufferInfo.vertexArrayObject) {
          gl.bindVertexArray(null);
        }
        lastUsedBufferInfo = bufferInfo;
        $52d13d33bd60c65a724bfd448491637f$export$setBuffersAndAttributes(gl, programInfo, bufferInfo);
      }
      // Set the uniforms.
      $52d13d33bd60c65a724bfd448491637f$export$setUniforms(programInfo, object.uniforms);
      // Draw
      $52d13d33bd60c65a724bfd448491637f$export$drawBufferInfo(gl, bufferInfo, type, object.count, object.offset, object.instanceCount);
    });
    if (lastUsedBufferInfo && lastUsedBufferInfo.vertexArrayObject) {
      gl.bindVertexArray(null);
    }
  }
  var $52d13d33bd60c65a724bfd448491637f$export$draw = /*#__PURE__*/Object.freeze({
    __proto__: null,
    drawBufferInfo: $52d13d33bd60c65a724bfd448491637f$export$drawBufferInfo,
    drawObjectList: $52d13d33bd60c65a724bfd448491637f$export$drawObjectList
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
  */
  const $52d13d33bd60c65a724bfd448491637f$var$FRAMEBUFFER = 0x8d40;
  const $52d13d33bd60c65a724bfd448491637f$var$RENDERBUFFER = 0x8d41;
  const $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_2D$2 = 0x0de1;
  const $52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_BYTE$3 = 0x1401;
  /*PixelFormat*/
  const $52d13d33bd60c65a724bfd448491637f$var$DEPTH_COMPONENT$1 = 0x1902;
  const $52d13d33bd60c65a724bfd448491637f$var$RGBA$1 = 0x1908;
  const $52d13d33bd60c65a724bfd448491637f$var$DEPTH_COMPONENT24$1 = 0x81a6;
  const $52d13d33bd60c65a724bfd448491637f$var$DEPTH_COMPONENT32F$1 = 0x8cac;
  const $52d13d33bd60c65a724bfd448491637f$var$DEPTH24_STENCIL8$1 = 0x88f0;
  const $52d13d33bd60c65a724bfd448491637f$var$DEPTH32F_STENCIL8$1 = 0x8cad;
  /*Framebuffer Object.*/
  const $52d13d33bd60c65a724bfd448491637f$var$RGBA4$1 = 0x8056;
  const $52d13d33bd60c65a724bfd448491637f$var$RGB5_A1$1 = 0x8057;
  const $52d13d33bd60c65a724bfd448491637f$var$RGB565$1 = 0x8D62;
  const $52d13d33bd60c65a724bfd448491637f$var$DEPTH_COMPONENT16$1 = 0x81A5;
  const $52d13d33bd60c65a724bfd448491637f$var$STENCIL_INDEX = 0x1901;
  const $52d13d33bd60c65a724bfd448491637f$var$STENCIL_INDEX8 = 0x8D48;
  const $52d13d33bd60c65a724bfd448491637f$var$DEPTH_STENCIL$1 = 0x84F9;
  const $52d13d33bd60c65a724bfd448491637f$var$COLOR_ATTACHMENT0 = 0x8CE0;
  const $52d13d33bd60c65a724bfd448491637f$var$DEPTH_ATTACHMENT = 0x8D00;
  const $52d13d33bd60c65a724bfd448491637f$var$STENCIL_ATTACHMENT = 0x8D20;
  const $52d13d33bd60c65a724bfd448491637f$var$DEPTH_STENCIL_ATTACHMENT = 0x821A;
  /*TextureWrapMode*/
  const $52d13d33bd60c65a724bfd448491637f$var$CLAMP_TO_EDGE$1 = 0x812F;
  /*TextureMagFilter*/
  const $52d13d33bd60c65a724bfd448491637f$var$LINEAR$1 = 0x2601;
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
  * @property {WebGLObject} [attachment] An existing renderbuffer or texture.
  *    If provided will attach this Object. This allows you to share
  *    attachments across framebuffers.
  * @memberOf module:twgl
  * @mixes module:twgl.TextureOptions
  */
  const $52d13d33bd60c65a724bfd448491637f$var$defaultAttachments = [{
    format: $52d13d33bd60c65a724bfd448491637f$var$RGBA$1,
    type: $52d13d33bd60c65a724bfd448491637f$var$UNSIGNED_BYTE$3,
    min: $52d13d33bd60c65a724bfd448491637f$var$LINEAR$1,
    wrap: $52d13d33bd60c65a724bfd448491637f$var$CLAMP_TO_EDGE$1
  }, {
    format: $52d13d33bd60c65a724bfd448491637f$var$DEPTH_STENCIL$1
  }];
  const $52d13d33bd60c65a724bfd448491637f$var$attachmentsByFormat = {};
  $52d13d33bd60c65a724bfd448491637f$var$attachmentsByFormat[$52d13d33bd60c65a724bfd448491637f$var$DEPTH_STENCIL$1] = $52d13d33bd60c65a724bfd448491637f$var$DEPTH_STENCIL_ATTACHMENT;
  $52d13d33bd60c65a724bfd448491637f$var$attachmentsByFormat[$52d13d33bd60c65a724bfd448491637f$var$STENCIL_INDEX] = $52d13d33bd60c65a724bfd448491637f$var$STENCIL_ATTACHMENT;
  $52d13d33bd60c65a724bfd448491637f$var$attachmentsByFormat[$52d13d33bd60c65a724bfd448491637f$var$STENCIL_INDEX8] = $52d13d33bd60c65a724bfd448491637f$var$STENCIL_ATTACHMENT;
  $52d13d33bd60c65a724bfd448491637f$var$attachmentsByFormat[$52d13d33bd60c65a724bfd448491637f$var$DEPTH_COMPONENT$1] = $52d13d33bd60c65a724bfd448491637f$var$DEPTH_ATTACHMENT;
  $52d13d33bd60c65a724bfd448491637f$var$attachmentsByFormat[$52d13d33bd60c65a724bfd448491637f$var$DEPTH_COMPONENT16$1] = $52d13d33bd60c65a724bfd448491637f$var$DEPTH_ATTACHMENT;
  $52d13d33bd60c65a724bfd448491637f$var$attachmentsByFormat[$52d13d33bd60c65a724bfd448491637f$var$DEPTH_COMPONENT24$1] = $52d13d33bd60c65a724bfd448491637f$var$DEPTH_ATTACHMENT;
  $52d13d33bd60c65a724bfd448491637f$var$attachmentsByFormat[$52d13d33bd60c65a724bfd448491637f$var$DEPTH_COMPONENT32F$1] = $52d13d33bd60c65a724bfd448491637f$var$DEPTH_ATTACHMENT;
  $52d13d33bd60c65a724bfd448491637f$var$attachmentsByFormat[$52d13d33bd60c65a724bfd448491637f$var$DEPTH24_STENCIL8$1] = $52d13d33bd60c65a724bfd448491637f$var$DEPTH_STENCIL_ATTACHMENT;
  $52d13d33bd60c65a724bfd448491637f$var$attachmentsByFormat[$52d13d33bd60c65a724bfd448491637f$var$DEPTH32F_STENCIL8$1] = $52d13d33bd60c65a724bfd448491637f$var$DEPTH_STENCIL_ATTACHMENT;
  function $52d13d33bd60c65a724bfd448491637f$var$getAttachmentPointForFormat(format, internalFormat) {
    return $52d13d33bd60c65a724bfd448491637f$var$attachmentsByFormat[format] || $52d13d33bd60c65a724bfd448491637f$var$attachmentsByFormat[internalFormat];
  }
  const $52d13d33bd60c65a724bfd448491637f$var$renderbufferFormats = {};
  $52d13d33bd60c65a724bfd448491637f$var$renderbufferFormats[$52d13d33bd60c65a724bfd448491637f$var$RGBA4$1] = true;
  $52d13d33bd60c65a724bfd448491637f$var$renderbufferFormats[$52d13d33bd60c65a724bfd448491637f$var$RGB5_A1$1] = true;
  $52d13d33bd60c65a724bfd448491637f$var$renderbufferFormats[$52d13d33bd60c65a724bfd448491637f$var$RGB565$1] = true;
  $52d13d33bd60c65a724bfd448491637f$var$renderbufferFormats[$52d13d33bd60c65a724bfd448491637f$var$DEPTH_STENCIL$1] = true;
  $52d13d33bd60c65a724bfd448491637f$var$renderbufferFormats[$52d13d33bd60c65a724bfd448491637f$var$DEPTH_COMPONENT16$1] = true;
  $52d13d33bd60c65a724bfd448491637f$var$renderbufferFormats[$52d13d33bd60c65a724bfd448491637f$var$STENCIL_INDEX] = true;
  $52d13d33bd60c65a724bfd448491637f$var$renderbufferFormats[$52d13d33bd60c65a724bfd448491637f$var$STENCIL_INDEX8] = true;
  function $52d13d33bd60c65a724bfd448491637f$var$isRenderbufferFormat(format) {
    return $52d13d33bd60c65a724bfd448491637f$var$renderbufferFormats[format];
  }
  /**
  * @typedef {Object} FramebufferInfo
  * @property {WebGLFramebuffer} framebuffer The WebGLFramebuffer for this framebufferInfo
  * @property {WebGLObject[]} attachments The created attachments in the same order as passed in to {@link module:twgl.createFramebufferInfo}.
  * @property {number} width The width of the framebuffer and its attachments
  * @property {number} height The width of the framebuffer and its attachments
  * @memberOf module:twgl
  */
  /**
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
  */
  function $52d13d33bd60c65a724bfd448491637f$export$createFramebufferInfo(gl, attachments, width, height) {
    const target = $52d13d33bd60c65a724bfd448491637f$var$FRAMEBUFFER;
    const fb = gl.createFramebuffer();
    gl.bindFramebuffer(target, fb);
    width = width || gl.drawingBufferWidth;
    height = height || gl.drawingBufferHeight;
    attachments = attachments || $52d13d33bd60c65a724bfd448491637f$var$defaultAttachments;
    let colorAttachmentCount = 0;
    const framebufferInfo = {
      framebuffer: fb,
      attachments: [],
      width: width,
      height: height
    };
    attachments.forEach(function (attachmentOptions) {
      let attachment = attachmentOptions.attachment;
      const format = attachmentOptions.format;
      let attachmentPoint = attachmentOptions.attachmentPoint || $52d13d33bd60c65a724bfd448491637f$var$getAttachmentPointForFormat(format, attachmentOptions.internalFormat);
      if (!attachmentPoint) {
        attachmentPoint = $52d13d33bd60c65a724bfd448491637f$var$COLOR_ATTACHMENT0 + colorAttachmentCount++;
      }
      if (!attachment) {
        if ($52d13d33bd60c65a724bfd448491637f$var$isRenderbufferFormat(format)) {
          attachment = gl.createRenderbuffer();
          gl.bindRenderbuffer($52d13d33bd60c65a724bfd448491637f$var$RENDERBUFFER, attachment);
          gl.renderbufferStorage($52d13d33bd60c65a724bfd448491637f$var$RENDERBUFFER, format, width, height);
        } else {
          const textureOptions = Object.assign({}, attachmentOptions);
          textureOptions.width = width;
          textureOptions.height = height;
          if (textureOptions.auto === undefined) {
            textureOptions.auto = false;
            textureOptions.min = textureOptions.min || textureOptions.minMag || $52d13d33bd60c65a724bfd448491637f$var$LINEAR$1;
            textureOptions.mag = textureOptions.mag || textureOptions.minMag || $52d13d33bd60c65a724bfd448491637f$var$LINEAR$1;
            textureOptions.wrapS = textureOptions.wrapS || textureOptions.wrap || $52d13d33bd60c65a724bfd448491637f$var$CLAMP_TO_EDGE$1;
            textureOptions.wrapT = textureOptions.wrapT || textureOptions.wrap || $52d13d33bd60c65a724bfd448491637f$var$CLAMP_TO_EDGE$1;
          }
          attachment = $52d13d33bd60c65a724bfd448491637f$export$createTexture(gl, textureOptions);
        }
      }
      if ($52d13d33bd60c65a724bfd448491637f$var$isRenderbuffer(gl, attachment)) {
        gl.framebufferRenderbuffer(target, attachmentPoint, $52d13d33bd60c65a724bfd448491637f$var$RENDERBUFFER, attachment);
      } else if ($52d13d33bd60c65a724bfd448491637f$var$isTexture(gl, attachment)) {
        if (attachmentOptions.layer !== undefined) {
          gl.framebufferTextureLayer(target, attachmentPoint, attachment, attachmentOptions.level || 0, attachmentOptions.layer);
        } else {
          gl.framebufferTexture2D(target, attachmentPoint, attachmentOptions.target || $52d13d33bd60c65a724bfd448491637f$var$TEXTURE_2D$2, attachment, attachmentOptions.level || 0);
        }
      } else {
        throw new Error('unknown attachment type');
      }
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
  */
  function $52d13d33bd60c65a724bfd448491637f$export$resizeFramebufferInfo(gl, framebufferInfo, attachments, width, height) {
    width = width || gl.drawingBufferWidth;
    height = height || gl.drawingBufferHeight;
    framebufferInfo.width = width;
    framebufferInfo.height = height;
    attachments = attachments || $52d13d33bd60c65a724bfd448491637f$var$defaultAttachments;
    attachments.forEach(function (attachmentOptions, ndx) {
      const attachment = framebufferInfo.attachments[ndx];
      const format = attachmentOptions.format;
      if ($52d13d33bd60c65a724bfd448491637f$var$isRenderbuffer(gl, attachment)) {
        gl.bindRenderbuffer($52d13d33bd60c65a724bfd448491637f$var$RENDERBUFFER, attachment);
        gl.renderbufferStorage($52d13d33bd60c65a724bfd448491637f$var$RENDERBUFFER, format, width, height);
      } else if ($52d13d33bd60c65a724bfd448491637f$var$isTexture(gl, attachment)) {
        $52d13d33bd60c65a724bfd448491637f$export$resizeTexture(gl, attachment, attachmentOptions, width, height);
      } else {
        throw new Error('unknown attachment type');
      }
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
  */
  function $52d13d33bd60c65a724bfd448491637f$export$bindFramebufferInfo(gl, framebufferInfo, target) {
    target = target || $52d13d33bd60c65a724bfd448491637f$var$FRAMEBUFFER;
    if (framebufferInfo) {
      gl.bindFramebuffer(target, framebufferInfo.framebuffer);
      gl.viewport(0, 0, framebufferInfo.width, framebufferInfo.height);
    } else {
      gl.bindFramebuffer(target, null);
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    }
  }
  var $52d13d33bd60c65a724bfd448491637f$export$framebuffers = /*#__PURE__*/Object.freeze({
    __proto__: null,
    bindFramebufferInfo: $52d13d33bd60c65a724bfd448491637f$export$bindFramebufferInfo,
    createFramebufferInfo: $52d13d33bd60c65a724bfd448491637f$export$createFramebufferInfo,
    resizeFramebufferInfo: $52d13d33bd60c65a724bfd448491637f$export$resizeFramebufferInfo
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
  */
  /**
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
  */
  const $52d13d33bd60c65a724bfd448491637f$var$ELEMENT_ARRAY_BUFFER$2 = 0x8893;
  /**
  * @typedef {Object} VertexArrayInfo
  * @property {number} numElements The number of elements to pass to `gl.drawArrays` or `gl.drawElements`.
  * @property {number} [elementType] The type of indices `UNSIGNED_BYTE`, `UNSIGNED_SHORT` etc..
  * @property {WebGLVertexArrayObject} [vertexArrayObject] a vertex array object
  * @memberOf module:twgl
  */
  /**
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
  */
  function $52d13d33bd60c65a724bfd448491637f$export$createVertexArrayInfo(gl, programInfos, bufferInfo) {
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    if (!programInfos.length) {
      programInfos = [programInfos];
    }
    programInfos.forEach(function (programInfo) {
      $52d13d33bd60c65a724bfd448491637f$export$setBuffersAndAttributes(gl, programInfo, bufferInfo);
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
  */
  function $52d13d33bd60c65a724bfd448491637f$export$createVAOAndSetAttributes(gl, setters, attribs, indices) {
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    $52d13d33bd60c65a724bfd448491637f$export$setAttributes(setters, attribs);
    if (indices) {
      gl.bindBuffer($52d13d33bd60c65a724bfd448491637f$var$ELEMENT_ARRAY_BUFFER$2, indices);
    }
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
  */
  function $52d13d33bd60c65a724bfd448491637f$export$createVAOFromBufferInfo(gl, programInfo, bufferInfo) {
    return $52d13d33bd60c65a724bfd448491637f$export$createVAOAndSetAttributes(gl, programInfo.attribSetters || programInfo, bufferInfo.attribs, bufferInfo.indices);
  }
  var $52d13d33bd60c65a724bfd448491637f$export$vertexArrays = /*#__PURE__*/Object.freeze({
    __proto__: null,
    createVertexArrayInfo: $52d13d33bd60c65a724bfd448491637f$export$createVertexArrayInfo,
    createVAOAndSetAttributes: $52d13d33bd60c65a724bfd448491637f$export$createVAOAndSetAttributes,
    createVAOFromBufferInfo: $52d13d33bd60c65a724bfd448491637f$export$createVAOFromBufferInfo
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
  */
  const $52d13d33bd60c65a724bfd448491637f$var$defaults$2 = {
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
  */
  /**
  * Sets various defaults for twgl.
  *
  * In the interest of terseness which is kind of the point
  * of twgl I've integrated a few of the older functions here
  *
  * @param {module:twgl.Defaults} newDefaults The default settings.
  * @memberOf module:twgl
  */
  function $52d13d33bd60c65a724bfd448491637f$export$setDefaults(newDefaults) {
    $52d13d33bd60c65a724bfd448491637f$var$copyExistingProperties(newDefaults, $52d13d33bd60c65a724bfd448491637f$var$defaults$2);
    $52d13d33bd60c65a724bfd448491637f$export$setAttributeDefaults_(newDefaults);
    // eslint-disable-line
    $52d13d33bd60c65a724bfd448491637f$export$setTextureDefaults_(newDefaults);
  }
  const $52d13d33bd60c65a724bfd448491637f$var$prefixRE = /^(.*?)_/;
  function $52d13d33bd60c65a724bfd448491637f$var$addExtensionToContext(gl, extensionName) {
    $52d13d33bd60c65a724bfd448491637f$export$glEnumToString(gl, 0);
    const ext = gl.getExtension(extensionName);
    if (ext) {
      const enums = {};
      const fnSuffix = $52d13d33bd60c65a724bfd448491637f$var$prefixRE.exec(extensionName)[1];
      const enumSuffix = '_' + fnSuffix;
      for (const key in ext) {
        const value = ext[key];
        const isFunc = typeof value === 'function';
        const suffix = isFunc ? fnSuffix : enumSuffix;
        let name = key;
        // examples of where this is not true are WEBGL_compressed_texture_s3tc
        // and WEBGL_compressed_texture_pvrtc
        if (key.endsWith(suffix)) {
          name = key.substring(0, key.length - suffix.length);
        }
        if (gl[name] !== undefined) {
          if (!isFunc && gl[name] !== value) {
            $52d13d33bd60c65a724bfd448491637f$var$warn(name, gl[name], value, key);
          }
        } else {
          if (isFunc) {
            gl[name] = (function (origFn) {
              return function () {
                return origFn.apply(ext, arguments);
              };
            })(value);
          } else {
            gl[name] = value;
            enums[name] = value;
          }
        }
      }
      // pass the modified enums to glEnumToString
      enums.constructor = {
        name: ext.constructor.name
      };
      $52d13d33bd60c65a724bfd448491637f$export$glEnumToString(enums, 0);
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
  */
  const $52d13d33bd60c65a724bfd448491637f$var$supportedExtensions = ['ANGLE_instanced_arrays', 'EXT_blend_minmax', 'EXT_color_buffer_float', 'EXT_color_buffer_half_float', 'EXT_disjoint_timer_query', 'EXT_disjoint_timer_query_webgl2', 'EXT_frag_depth', 'EXT_sRGB', 'EXT_shader_texture_lod', 'EXT_texture_filter_anisotropic', 'OES_element_index_uint', 'OES_standard_derivatives', 'OES_texture_float', 'OES_texture_float_linear', 'OES_texture_half_float', 'OES_texture_half_float_linear', 'OES_vertex_array_object', 'WEBGL_color_buffer_float', 'WEBGL_compressed_texture_atc', 'WEBGL_compressed_texture_etc1', 'WEBGL_compressed_texture_pvrtc', 'WEBGL_compressed_texture_s3tc', 'WEBGL_compressed_texture_s3tc_srgb', 'WEBGL_depth_texture', 'WEBGL_draw_buffers'];
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
  */
  function $52d13d33bd60c65a724bfd448491637f$export$addExtensionsToContext(gl) {
    for (let ii = 0; ii < $52d13d33bd60c65a724bfd448491637f$var$supportedExtensions.length; ++ii) {
      $52d13d33bd60c65a724bfd448491637f$var$addExtensionToContext(gl, $52d13d33bd60c65a724bfd448491637f$var$supportedExtensions[ii]);
    }
  }
  /**
  * Creates a webgl context.
  * @param {HTMLCanvasElement} canvas The canvas tag to get
  *     context from. If one is not passed in one will be
  *     created.
  * @return {WebGLRenderingContext} The created context.
  * @private
  */
  function $52d13d33bd60c65a724bfd448491637f$var$create3DContext(canvas, opt_attribs) {
    const names = ["webgl", "experimental-webgl"];
    let context = null;
    for (let ii = 0; ii < names.length; ++ii) {
      context = canvas.getContext(names[ii], opt_attribs);
      if (context) {
        if ($52d13d33bd60c65a724bfd448491637f$var$defaults$2.addExtensionsToContext) {
          $52d13d33bd60c65a724bfd448491637f$export$addExtensionsToContext(context);
        }
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
  */
  function $52d13d33bd60c65a724bfd448491637f$export$getWebGLContext(canvas, opt_attribs) {
    const gl = $52d13d33bd60c65a724bfd448491637f$var$create3DContext(canvas, opt_attribs);
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
  */
  function $52d13d33bd60c65a724bfd448491637f$var$createContext(canvas, opt_attribs) {
    const names = ["webgl2", "webgl", "experimental-webgl"];
    let context = null;
    for (let ii = 0; ii < names.length; ++ii) {
      context = canvas.getContext(names[ii], opt_attribs);
      if (context) {
        if ($52d13d33bd60c65a724bfd448491637f$var$defaults$2.addExtensionsToContext) {
          $52d13d33bd60c65a724bfd448491637f$export$addExtensionsToContext(context);
        }
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
  */
  function $52d13d33bd60c65a724bfd448491637f$export$getContext(canvas, opt_attribs) {
    const gl = $52d13d33bd60c65a724bfd448491637f$var$createContext(canvas, opt_attribs);
    return gl;
  }
  /**
  * Resize a canvas to match the size it's displayed.
  * @param {HTMLCanvasElement} canvas The canvas to resize.
  * @param {number} [multiplier] So you can pass in `window.devicePixelRatio` or other scale value if you want to.
  * @return {boolean} true if the canvas was resized.
  * @memberOf module:twgl
  */
  function $52d13d33bd60c65a724bfd448491637f$export$resizeCanvasToDisplaySize(canvas, multiplier) {
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
  // Largely taken from
  // https://github.com/mdn/webgl-examples/blob/gh-pages/tutorial/sample2/webgl-demo.js
  class $2b3199d0d5be952e84d95e8de105dfa8$export$default extends $d125d48a203687d140152f108c7101d5$export$default {
    constructor(viewportData) {
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
    /**
    * Calculates the viewport for this.gl.viewport to control zooming. Also calculates point size.
    * @returns Array of 5 elements, first 4 are viewport parameters, last is pointSizeMultiplier:
    *   [xOffset, yOffset, displayAsIfThisWide, displayAsIfThisHigh, pointSizeMultiplier]
    */
    getWebGLViewport() {
      // Calculate appropriate webgl viewport given current selection window
      // Transform current data coordinates to GPU cordinates
      const scaleXWindowSpace = $794bbb298c1fc0cc3157526701549b8c$init().scale([this.minX, this.maxX], [-1, 1]);
      const scaleYWindowSpace = $794bbb298c1fc0cc3157526701549b8c$init().scale([this.minY, this.maxY], [-1, 1]);
      // Multiply point size by the ratio of max dimension and current width
      const pointSize = Math.max(1, Math.min(1 / (scaleXWindowSpace(this.currentXRange[1]) - scaleXWindowSpace(this.currentXRange[0])), 1 / (scaleYWindowSpace(this.currentYRange[1]) - scaleYWindowSpace(this.currentYRange[0]))));
      // Return [x1, y1, x2, y2] and pointsize, camera corners coordinates in GPU space
      // Which becomes uniform in vertex shader
      return [scaleXWindowSpace(this.currentXRange[0]), scaleYWindowSpace(this.currentYRange[0]), scaleXWindowSpace(this.currentXRange[1]), scaleYWindowSpace(this.currentYRange[1]), pointSize];
    }
    setSchema(schema) {
      super.render();
      // Cancels current animation frame
      // Populate buffers needs a trackShader built to know what buffers to fill
      this.trackShaders = $5aa01963e4773c466fc995fbb6f57ffb$export$VertexShader.fromSchema(schema);
      new ($647b390bbe26a1e6bbc6a8c9e19f41d2$init().default)(schema, this.populateBuffers.bind(this));
    }
    populateBuffers(schemaHelper) {
      let currentTrack = schemaHelper.getNextTrack();
      let currentTrackShaderIndex = 0;
      while (currentTrack) {
        // Construct calculator in track loop as calculator keeps internal state for each track
        let vertexCalculator = new ($6d3e717fed031fdb2ee2c357e03764b6$init().default)([this.minX, this.maxX], [this.minY, this.maxY], currentTrack.track);
        let currentMark = currentTrack.getNextMark();
        while (currentMark) {
          this.trackShaders[currentTrackShaderIndex].addMarkToBuffers(currentMark, vertexCalculator);
          currentMark = currentTrack.getNextMark();
        }
        currentTrack = schemaHelper.getNextTrack();
        currentTrackShaderIndex++;
      }
      this.render();
    }
    /**
    * Animates the frames by setting viewport, blending, clearing, and calling webgl draw.
    */
    animate() {
      if (!this.needsAnimation) {
        this.lastFrame = requestAnimationFrame(this.animate.bind(this));
        this.tick();
        return;
      }
      const viewport = this.getWebGLViewport();
      this.globalUniforms.viewport = new Float32Array(viewport.slice(0, 4));
      this.globalUniforms.pointSizeModifier = viewport[4];
      this.trackShaders.forEach((trackShader, index) => {
        this.gl.useProgram(this.programInfos[index].program);
        $52d13d33bd60c65a724bfd448491637f$export$setUniforms(this.programInfos[index], {
          ...this.globalUniforms,
          ...trackShader.uniforms
        });
      });
      // Clear the canvas before we start drawing on it.
      this.gl.clearColor(1, 1, 1, 1);
      // Set the blending function
      // Blend functions are weird, play with them:
      // https://mrdoob.github.io/webgl-blendfunctions/blendfunc.html
      // http://www.andersriggelsen.dk/glblendfunc.php
      this.gl.enable(this.gl.BLEND);
      this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
      this.gl.clear(this.gl.COLOR_BUFFER_BIT);
      this.trackShaders.forEach((trackShader, index) => {
        this.gl.useProgram(this.programInfos[index].program);
        $52d13d33bd60c65a724bfd448491637f$export$setBuffersAndAttributes(this.gl, this.programInfos[index], this.bufferInfos[index]);
        $52d13d33bd60c65a724bfd448491637f$export$drawBufferInfo(this.gl, this.bufferInfos[index], this.gl[trackShader.drawMode], trackShader.attributes.aVertexPosition.data.length / 2);
      });
      this.needsAnimation = false;
      this.lastFrame = requestAnimationFrame(this.animate.bind(this));
      this.tick();
    }
    /**
    * Prepares animation by compiling shaders, setting uniforms, constructing buffers,
    * and handling additional boilerplate.
    */
    render() {
      super.render();
      this.programInfos = this.trackShaders.map(trackShader => $52d13d33bd60c65a724bfd448491637f$export$createProgramInfo(this.gl, [trackShader.buildShader(), $5aa01963e4773c466fc995fbb6f57ffb$export$varyingColorsFragmentShader]));
      this.globalUniforms = {
        viewport: new Float32Array([-1, -1, 1, 1]),
        pointSizeModifier: 1
      };
      this.bufferInfos = this.trackShaders.map(trackShader => $52d13d33bd60c65a724bfd448491637f$export$createBufferInfoFromArrays(this.gl, trackShader.attributes));
      this.needsAnimation = true;
      this.animate();
    }
  }
  class $6021bf8496a435d417583f6626e5a56a$var$OffscreenWebGLDrawer extends $2b3199d0d5be952e84d95e8de105dfa8$export$default {
    tick() {
      postMessage({
        type: "tick"
      });
    }
  }
  self.onmessage = message => {
    switch (message.data.type) {
      case "init":
        self.drawer = new $6021bf8496a435d417583f6626e5a56a$var$OffscreenWebGLDrawer(message.data);
        break;
      case "viewport":
        self.drawer.receiveViewport(message.data);
        break;
      case "render":
        self.drawer.receiveViewport(message.data);
        self.drawer.render();
        break;
      case "schema":
        self.drawer.setSchema(message.data.schema);
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

//# sourceMappingURL=offscreen-webgl-worker.4755d593.js.map
