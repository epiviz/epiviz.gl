import "./offscreen-webgl-worker.e8c441ad.js";
import {setBuffersAndAttributes as $b6l8i$setBuffersAndAttributes, drawBufferInfo as $b6l8i$drawBufferInfo, createProgramInfo as $b6l8i$createProgramInfo, setUniforms as $b6l8i$setUniforms, createBufferInfoFromArrays as $b6l8i$createBufferInfoFromArrays, createVertexArrayInfo as $b6l8i$createVertexArrayInfo} from "twgl.js";

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
import "./offscreen-webgl-worker.e8c441ad.js";
parcelRequire.register("9mcTF", function(module, exports) {

var $9eul6 = parcelRequire("9eul6");
class $6d002c2786cf783d$var$OffscreenWebGLDrawer extends $9eul6.default {
    tick() {
        postMessage({
            type: "tick"
        });
    }
}
self.onmessage = (message)=>{
    switch(message.data.type){
        case "init":
            self.drawer = message.data.displayFPSMeter ? new $6d002c2786cf783d$var$OffscreenWebGLDrawer(message.data) : new $9eul6.default(message.data);
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

});
parcelRequire.register("9eul6", function(module, exports) {

$parcel$export(module.exports, "default", () => $6b8cf4a35b367f0c$export$9099ad97b570f7c);

var $KnCUT = parcelRequire("KnCUT");

var $6Izoz = parcelRequire("6Izoz");

var $cwgQF = parcelRequire("cwgQF");

var $lHxH2 = parcelRequire("lHxH2");

var $dr2jh = parcelRequire("dr2jh");

var $7dzVX = parcelRequire("7dzVX");

const $6b8cf4a35b367f0c$var$ALL_POTENTIAL_ATTRIBUTES = $7dzVX.VertexShader.SUPPORTED_CHANNEL_ATTRIBUTES.map((attr)=>`a_${attr}`
).concat("a_VertexPosition");
class $6b8cf4a35b367f0c$var$WebGLCanvasDrawer extends $KnCUT.default {
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
        const scaleXWindowSpace = $cwgQF.scale([
            this.minX,
            this.maxX
        ], [
            -1,
            1
        ]);
        const scaleYWindowSpace = $cwgQF.scale([
            this.minY,
            this.maxY
        ], [
            -1,
            1
        ]);
        // Multiply point size by the ratio of max dimension and current width
        const pointSize = Math.max(1, Math.min(1 / (scaleXWindowSpace(this.currentXRange[1]) - scaleXWindowSpace(this.currentXRange[0])), 1 / (scaleYWindowSpace(this.currentYRange[1]) - scaleYWindowSpace(this.currentYRange[0]))));
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
        this.trackShaders = $7dzVX.VertexShader.fromSpecification(specification);
        new $6Izoz.default(specification, this.populateBuffers.bind(this));
    }
    /**
   * Populate the buffers that are fed to webgl for drawing.
   *
   * @param {SpecificationProcessor} specificationHelper created in the setSpecification method
   */ populateBuffers(specificationHelper) {
        let currentTrack = specificationHelper.getNextTrack();
        let currentTrackShaderIndex = 0;
        this.semanticZoomer = new $dr2jh.default(specificationHelper);
        while(currentTrack){
            // Construct calculator in track loop as calculator keeps internal state for each track
            let vertexCalculator = new $lHxH2.default(specificationHelper.xScale, specificationHelper.yScale, currentTrack.track // Access actual track specification
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
            $b6l8i$setUniforms(this.programInfos[index], {
                ...this.globalUniforms,
                ...trackShader.uniforms
            });
            $b6l8i$setBuffersAndAttributes(this.gl, this.programInfos[index], this.vertexArrayInfos[index]);
            $b6l8i$drawBufferInfo(this.gl, this.vertexArrayInfos[index], this.gl[this.semanticZoomer.getRecommendedDrawingMode(trackShader, this.currentXRange, this.currentYRange)], trackShader.attributes.a_VertexPosition.data.length / 2);
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
        this.programInfos = this.trackShaders.map((trackShader)=>$b6l8i$createProgramInfo(this.gl, [
                trackShader.buildShader(),
                $7dzVX.varyingColorsFragmentShader
            ], $6b8cf4a35b367f0c$var$ALL_POTENTIAL_ATTRIBUTES)
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
        this.vertexArrayInfos = this.trackShaders.map((trackShader)=>$b6l8i$createVertexArrayInfo(this.gl, this.programInfos, $b6l8i$createBufferInfoFromArrays(this.gl, trackShader.attributes))
        );
        this.needsAnimation = true;
        this.animate();
    }
}
var $6b8cf4a35b367f0c$export$9099ad97b570f7c = $6b8cf4a35b367f0c$var$WebGLCanvasDrawer;

});
parcelRequire.register("KnCUT", function(module, exports) {

$parcel$export(module.exports, "default", () => $08b69fc2c5884983$export$9099ad97b570f7c);
class $08b69fc2c5884983$var$Drawer {
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
}
var $08b69fc2c5884983$export$9099ad97b570f7c = $08b69fc2c5884983$var$Drawer;

});

parcelRequire.register("dr2jh", function(module, exports) {

$parcel$export(module.exports, "default", () => $02862fd98af54a2b$export$9099ad97b570f7c);
const $02862fd98af54a2b$var$sizeOfGeneRangeForTriangles = 1000000;
class $02862fd98af54a2b$var$SemanticZoomer {
    /**
   * Gives guidance or takes control over canvas when semantic zooming
   * is necessary. Developers should extend this class to create semantic zooming
   * behavior.
   * @param {SpecificationProcessor} specificationHelper
   */ constructor(specificationHelper){
        this.specificationHelper = specificationHelper;
    }
    getRecommendedDrawingMode(trackShader, currentXRange, currentYRange) {
        if (trackShader.drawMode !== "TRIANGLES") return trackShader.drawMode;
        if (!this.specificationHelper.xScale.isGenomeScale && !this.specificationHelper.yScale.isGenomeScale) // Currently only used for genome tracks
        return "TRIANGLES";
        if (this.specificationHelper.xScale.isGenomeScale) {
            const numberOfGenes = this.specificationHelper.xScale.mapGenomeIndexToClipSpaceInverse(currentXRange[1]) - this.specificationHelper.xScale.mapGenomeIndexToClipSpaceInverse(currentXRange[0]);
            if (numberOfGenes < $02862fd98af54a2b$var$sizeOfGeneRangeForTriangles) return "TRIANGLES";
        }
        if (this.specificationHelper.yScale.isGenomeScale) {
            const numberOfGenes = this.specificationHelper.yScale.mapGenomeIndexToClipSpaceInverse(currentYRange[1]) - this.specificationHelper.yScale.mapGenomeIndexToClipSpaceInverse(currentYRange[0]);
            if (numberOfGenes < $02862fd98af54a2b$var$sizeOfGeneRangeForTriangles) return "TRIANGLES";
        }
        return "LINES";
    }
}
var $02862fd98af54a2b$export$9099ad97b570f7c = $02862fd98af54a2b$var$SemanticZoomer;

});

parcelRequire.register("7dzVX", function(module, exports) {

$parcel$export(module.exports, "VertexShader", () => $54159f057f9f73f7$export$9680dfa9ce0cbfdf);
$parcel$export(module.exports, "varyingColorsFragmentShader", () => $54159f057f9f73f7$export$9b32b0c567282b40);

var $6Izoz = parcelRequire("6Izoz");

var $cwgQF = parcelRequire("cwgQF");
/**
 * A vertex shader meant to take in positions, colors, and contain uniforms for zooming and panning.
 */ const $54159f057f9f73f7$var$baseVertexShader = `#version 300 es\n  precision highp float;\n\n  in vec2 a_VertexPosition;\n\n  uniform float pointSizeModifier;\n  // [x1, y1,x2, y2] of viewing window\n  uniform vec4 viewport;\n\n  out vec4 vColor;\n`;
/**
 * Appended to end of vertex shader. Includes math for zooming and panning,
 * ability to unpack colors and send to fragment shader.
 */ const $54159f057f9f73f7$var$vertexShaderSuffix = (opacityName, colorName, sizeName)=>`\n  vec3 unpackColor(float f) {\n    vec3 colorVec;\n    colorVec.r = floor(f / 65536.0);\n    colorVec.g = floor((f - colorVec.r * 65536.0) / 256.0);\n    colorVec.b = floor(f - colorVec.r * 65536.0 - colorVec.g * 256.0);\n    return colorVec / 256.0;\n  }\n\n  void main(void) {\n    // Subtract each vertex by midpoint of the viewport \n    // window to center points. Then scale by ratio of max window size to window size\n    gl_Position = vec4(\n       (a_VertexPosition.x - (viewport.z + viewport.x)/2.0) * 2.0/(viewport.z - viewport.x),\n       (a_VertexPosition.y - (viewport.w + viewport.y)/2.0) * 2.0/(viewport.w - viewport.y),\n        0,\n        1\n    );\n    vec3 unpackedValues = unpackColor(${colorName});\n\n    vColor = vec4(\n      unpackedValues.rgb,\n      ${opacityName}\n    );\n    gl_PointSize = ${sizeName} * pointSizeModifier;\n  }\n`
;
/**
 * A fragment shader which chooses color simply passed to by vertex shader.
 */ const $54159f057f9f73f7$export$9b32b0c567282b40 = `#version 300 es\n  precision highp float;\n\n  in vec4 vColor;\n\n  out vec4 outColor;\n  void main(void) {\n    outColor = vColor;\n  }\n`;
class $54159f057f9f73f7$export$9680dfa9ce0cbfdf {
    static SUPPORTED_CHANNEL_ATTRIBUTES = Object.freeze([
        "color",
        "size",
        "opacity", 
    ]);
    /**
   * A class meant to contain all the relevant information for a shader program, such as uniforms
   * attributes, and ultimately the vertices. Do not use the constructor. Use VertexShader.fromSpecification
   * or fromTrack instead.
   */ constructor(){
        this.shader = $54159f057f9f73f7$var$baseVertexShader;
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
        this.shader += $54159f057f9f73f7$var$vertexShaderSuffix(opacityName, colorName, sizeName);
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
        return specification.tracks.map($54159f057f9f73f7$export$9680dfa9ce0cbfdf.fromTrack);
    }
    /**
   * Construct the vertex shader a track including setting attributes, uniforms, drawMode.
   *
   * @param {Object} track from specification
   * @returns a {@link VertexShaders}
   */ static fromTrack(track) {
        // Given a track produce attributes and uniforms that describe a webgl drawing
        const vsBuilder = new $54159f057f9f73f7$export$9680dfa9ce0cbfdf();
        vsBuilder.setDrawMode($6Izoz.getDrawModeForTrack(track));
        for (let channel of Object.keys($6Izoz.DEFAULT_CHANNELS)){
            if (channel === "shape") continue;
            if (channel in track) {
                // Specification specifies channel
                if (track[channel].value) {
                    // Channel has default value
                    if (channel === "color") track[channel].value = $cwgQF.colorSpecifierToHex(track[channel].value);
                    vsBuilder.setChannelUniform(channel, track[channel].value);
                } else {
                    // Set Channel as attribute, x and y will always reach here
                    if (channel === "y" || channel === "x") continue;
                    // These are currently the only supported channels for shader usage
                    if ($54159f057f9f73f7$export$9680dfa9ce0cbfdf.SUPPORTED_CHANNEL_ATTRIBUTES.includes(channel)) vsBuilder.addChannelBuffer(channel, $6Izoz.DEFAULT_CHANNELS[channel].numComponents);
                }
            } else // Channel not listed, set default
            if ($54159f057f9f73f7$export$9680dfa9ce0cbfdf.SUPPORTED_CHANNEL_ATTRIBUTES.includes(channel)) vsBuilder.setChannelUniform(channel, $6Izoz.DEFAULT_CHANNELS[channel].value);
        }
        return vsBuilder;
    }
}

});




parcelRequire("9mcTF");

//# sourceMappingURL=offscreen-webgl-worker.ccb65adf.js.map
