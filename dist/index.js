/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['module', 'require', 'exports', './utilities-bf9f0c79'], function (module, require, exports, utilities) { 'use strict';

	/*!
	 * FPSMeter 0.3.1 - 9th May 2013
	 * https://github.com/Darsain/fpsmeter
	 *
	 * Licensed under the MIT license.
	 * http://opensource.org/licenses/MIT
	 */
	(function (w, undefined$1) {

		/**
		 * Create a new element.
		 *
		 * @param  {String} name Element type name.
		 *
		 * @return {Element}
		 */
		function newEl(name) {
			return document.createElement(name);
		}

		/**
		 * Apply theme CSS properties to element.
		 *
		 * @param  {Element} element DOM element.
		 * @param  {Object}  theme   Theme object.
		 *
		 * @return {Element}
		 */
		function applyTheme(element, theme) {
			for (var name in theme) {
				try {
					element.style[name] = theme[name];
				} catch (e) {}
			}
			return element;
		}

		/**
		 * Return type of the value.
		 *
		 * @param  {Mixed} value
		 *
		 * @return {String}
		 */
		function type(value) {
			if (value == null) {
				return String(value);
			}

			if (typeof value === 'object' || typeof value === 'function') {
				return Object.prototype.toString.call(value).match(/\s([a-z]+)/i)[1].toLowerCase() || 'object';
			}

			return typeof value;
		}

		/**
		 * Check whether the value is in an array.
		 *
		 * @param  {Mixed} value
		 * @param  {Array} array
		 *
		 * @return {Integer} Array index or -1 when not found.
		 */
		function inArray(value, array) {
			if (type(array) !== 'array') {
				return -1;
			}
			if (array.indexOf) {
				return array.indexOf(value);
			}
			for (var i = 0, l = array.length; i < l; i++) {
				if (array[i] === value) {
					return i;
				}
			}
			return -1;
		}

		/**
		 * Poor man's deep object extend.
		 *
		 * Example:
		 *   extend({}, defaults, options);
		 *
		 * @return {Void}
		 */
		function extend() {
			var args = arguments;
			for (var key in args[1]) {
				if (args[1].hasOwnProperty(key)) {
					switch (type(args[1][key])) {
						case 'object':
							args[0][key] = extend({}, args[0][key], args[1][key]);
							break;

						case 'array':
							args[0][key] = args[1][key].slice(0);
							break;

						default:
							args[0][key] = args[1][key];
					}
				}
			}
			return args.length > 2 ?
				extend.apply(null, [args[0]].concat(Array.prototype.slice.call(args, 2))) :
				args[0];
		}

		/**
		 * Convert HSL color to HEX string.
		 *
		 * @param  {Array} hsl Array with [hue, saturation, lightness].
		 *
		 * @return {Array} Array with [red, green, blue].
		 */
		function hslToHex(h, s, l) {
			var r, g, b;
			var v, min, sv, sextant, fract, vsf;

			if (l <= 0.5) {
				v = l * (1 + s);
			} else {
				v = l + s - l * s;
			}

			if (v === 0) {
				return '#000';
			} else {
				min = 2 * l - v;
				sv = (v - min) / v;
				h = 6 * h;
				sextant = Math.floor(h);
				fract = h - sextant;
				vsf = v * sv * fract;
				if (sextant === 0 || sextant === 6) {
					r = v;
					g = min + vsf;
					b = min;
				} else if (sextant === 1) {
					r = v - vsf;
					g = v;
					b = min;
				} else if (sextant === 2) {
					r = min;
					g = v;
					b = min + vsf;
				} else if (sextant === 3) {
					r = min;
					g = v - vsf;
					b = v;
				} else if (sextant === 4) {
					r = min + vsf;
					g = min;
					b = v;
				} else {
					r = v;
					g = min;
					b = v - vsf;
				}
				return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
			}
		}

		/**
		 * Helper function for hslToHex.
		 */
		function componentToHex(c) {
			c = Math.round(c * 255).toString(16);
			return c.length === 1 ? '0' + c : c;
		}

		/**
		 * Manage element event listeners.
		 *
		 * @param  {Node}     element
		 * @param  {Event}    eventName
		 * @param  {Function} handler
		 * @param  {Bool}     remove
		 *
		 * @return {Void}
		 */
		function listener(element, eventName, handler, remove) {
			if (element.addEventListener) {
				element[remove ? 'removeEventListener' : 'addEventListener'](eventName, handler, false);
			} else if (element.attachEvent) {
				element[remove ? 'detachEvent' : 'attachEvent']('on' + eventName, handler);
			}
		}

		// Preferred timing funtion
		var getTime;
		(function () {
			var perf = w.performance;
			if (perf && (perf.now || perf.webkitNow)) {
				var perfNow = perf.now ? 'now' : 'webkitNow';
				getTime = perf[perfNow].bind(perf);
			} else {
				getTime = function () {
					return +new Date();
				};
			}
		}());

		// Local WindowAnimationTiming interface polyfill
		var cAF = w.cancelAnimationFrame || w.cancelRequestAnimationFrame;
		var rAF = w.requestAnimationFrame;
		(function () {
			var vendors = ['moz', 'webkit', 'o'];
			var lastTime = 0;

			// For a more accurate WindowAnimationTiming interface implementation, ditch the native
			// requestAnimationFrame when cancelAnimationFrame is not present (older versions of Firefox)
			for (var i = 0, l = vendors.length; i < l && !cAF; ++i) {
				cAF = w[vendors[i]+'CancelAnimationFrame'] || w[vendors[i]+'CancelRequestAnimationFrame'];
				rAF = cAF && w[vendors[i]+'RequestAnimationFrame'];
			}

			if (!cAF) {
				rAF = function (callback) {
					var currTime = getTime();
					var timeToCall = Math.max(0, 16 - (currTime - lastTime));
					lastTime = currTime + timeToCall;
					return w.setTimeout(function () { callback(currTime + timeToCall); }, timeToCall);
				};

				cAF = function (id) {
					clearTimeout(id);
				};
			}
		}());

		// Property name for assigning element text content
		var textProp = type(document.createElement('div').textContent) === 'string' ? 'textContent' : 'innerText';

		/**
		 * FPSMeter class.
		 *
		 * @param {Element} anchor  Element to append the meter to. Default is document.body.
		 * @param {Object}  options Object with options.
		 */
		function FPSMeter(anchor, options) {
			// Optional arguments
			if (type(anchor) === 'object' && anchor.nodeType === undefined$1) {
				options = anchor;
				anchor = document.body;
			}
			if (!anchor) {
				anchor = document.body;
			}

			// Private properties
			var self = this;
			var o = extend({}, FPSMeter.defaults, options || {});

			var el = {};
			var cols = [];
			var theme, heatmaps;
			var heatDepth = 100;
			var heating = [];

			var thisFrameTime = 0;
			var frameTime = o.threshold;
			var frameStart = 0;
			var lastLoop = getTime() - frameTime;
			var time;

			var fpsHistory = [];
			var durationHistory = [];

			var frameID, renderID;
			var showFps = o.show === 'fps';
			var graphHeight, count, i, j;

			// Exposed properties
			self.options = o;
			self.fps = 0;
			self.duration = 0;
			self.isPaused = 0;

			/**
			 * Tick start for measuring the actual rendering duration.
			 *
			 * @return {Void}
			 */
			self.tickStart = function () {
				frameStart = getTime();
			};

			/**
			 * FPS tick.
			 *
			 * @return {Void}
			 */
			self.tick = function () {
				time = getTime();
				thisFrameTime = time - lastLoop;
				frameTime += (thisFrameTime - frameTime) / o.smoothing;
				self.fps = 1000 / frameTime;
				self.duration = frameStart < lastLoop ? frameTime : time - frameStart;
				lastLoop = time;
			};

			/**
			 * Pause display rendering.
			 *
			 * @return {Object} FPSMeter instance.
			 */
			self.pause = function () {
				if (frameID) {
					self.isPaused = 1;
					clearTimeout(frameID);
					cAF(frameID);
					cAF(renderID);
					frameID = renderID = 0;
				}
				return self;
			};

			/**
			 * Resume display rendering.
			 *
			 * @return {Object} FPSMeter instance.
			 */
			self.resume = function () {
				if (!frameID) {
					self.isPaused = 0;
					requestRender();
				}
				return self;
			};

			/**
			 * Update options.
			 *
			 * @param {String} name  Option name.
			 * @param {Mixed}  value New value.
			 *
			 * @return {Object} FPSMeter instance.
			 */
			self.set = function (name, value) {
				o[name] = value;
				showFps = o.show === 'fps';

				// Rebuild or reposition elements when specific option has been updated
				if (inArray(name, rebuilders) !== -1) {
					createMeter();
				}
				if (inArray(name, repositioners) !== -1) {
					positionMeter();
				}
				return self;
			};

			/**
			 * Change meter into rendering duration mode.
			 *
			 * @return {Object} FPSMeter instance.
			 */
			self.showDuration = function () {
				self.set('show', 'ms');
				return self;
			};

			/**
			 * Change meter into FPS mode.
			 *
			 * @return {Object} FPSMeter instance.
			 */
			self.showFps = function () {
				self.set('show', 'fps');
				return self;
			};

			/**
			 * Toggles between show: 'fps' and show: 'duration'.
			 *
			 * @return {Object} FPSMeter instance.
			 */
			self.toggle = function () {
				self.set('show', showFps ? 'ms' : 'fps');
				return self;
			};

			/**
			 * Hide the FPSMeter. Also pauses the rendering.
			 *
			 * @return {Object} FPSMeter instance.
			 */
			self.hide = function () {
				self.pause();
				el.container.style.display = 'none';
				return self;
			};

			/**
			 * Show the FPSMeter. Also resumes the rendering.
			 *
			 * @return {Object} FPSMeter instance.
			 */
			self.show = function () {
				self.resume();
				el.container.style.display = 'block';
				return self;
			};

			/**
			 * Check the current FPS and save it in history.
			 *
			 * @return {Void}
			 */
			function historyTick() {
				for (i = o.history; i--;) {
					fpsHistory[i] = i === 0 ? self.fps : fpsHistory[i-1];
					durationHistory[i] = i === 0 ? self.duration : durationHistory[i-1];
				}
			}

			/**
			 * Returns heat hex color based on values passed.
			 *
			 * @param  {Integer} heatmap
			 * @param  {Integer} value
			 * @param  {Integer} min
			 * @param  {Integer} max
			 *
			 * @return {Integer}
			 */
			function getHeat(heatmap, value, min, max) {
				return heatmaps[0|heatmap][Math.round(Math.min((value - min) / (max - min) * heatDepth, heatDepth))];
			}

			/**
			 * Update counter number and legend.
			 *
			 * @return {Void}
			 */
			function updateCounter() {
				// Update legend only when changed
				if (el.legend.fps !== showFps) {
					el.legend.fps = showFps;
					el.legend[textProp] = showFps ? 'FPS' : 'ms';
				}
				// Update counter with a nicely formated & readable number
				count = showFps ? self.fps : self.duration;
				el.count[textProp] = count > 999 ? '999+' : count.toFixed(count > 99 ? 0 : o.decimals);
			}

			/**
			 * Render current FPS state.
			 *
			 * @return {Void}
			 */
			function render() {
				time = getTime();
				// If renderer stopped reporting, do a simulated drop to 0 fps
				if (lastLoop < time - o.threshold) {
					self.fps -= self.fps / Math.max(1, o.smoothing * 60 / o.interval);
					self.duration = 1000 / self.fps;
				}

				historyTick();
				updateCounter();

				// Apply heat to elements
				if (o.heat) {
					if (heating.length) {
						for (i = heating.length; i--;) {
							heating[i].el.style[theme[heating[i].name].heatOn] = showFps ?
								getHeat(theme[heating[i].name].heatmap, self.fps, 0, o.maxFps) :
								getHeat(theme[heating[i].name].heatmap, self.duration, o.threshold, 0);
						}
					}

					if (el.graph && theme.column.heatOn) {
						for (i = cols.length; i--;) {
							cols[i].style[theme.column.heatOn] = showFps ?
								getHeat(theme.column.heatmap, fpsHistory[i], 0, o.maxFps) :
								getHeat(theme.column.heatmap, durationHistory[i], o.threshold, 0);
						}
					}
				}

				// Update graph columns height
				if (el.graph) {
					for (j = 0; j < o.history; j++) {
						cols[j].style.height = (showFps ?
							(fpsHistory[j] ? Math.round(graphHeight / o.maxFps * Math.min(fpsHistory[j], o.maxFps)) : 0) :
							(durationHistory[j] ? Math.round(graphHeight / o.threshold * Math.min(durationHistory[j], o.threshold)) : 0)
						) + 'px';
					}
				}
			}

			/**
			 * Request rendering loop.
			 *
			 * @return {Int} Animation frame index.
			 */
			function requestRender() {
				if (o.interval < 20) {
					frameID = rAF(requestRender);
					render();
				} else {
					frameID = setTimeout(requestRender, o.interval);
					renderID = rAF(render);
				}
			}

			/**
			 * Meter events handler.
			 *
			 * @return {Void}
			 */
			function eventHandler(event) {
				event = event || window.event;
				if (event.preventDefault) {
					event.preventDefault();
					event.stopPropagation();
				} else {
					event.returnValue = false;
					event.cancelBubble = true;
				}
				self.toggle();
			}

			/**
			 * Destroys the current FPSMeter instance.
			 *
			 * @return {Void}
			 */
			self.destroy = function () {
				// Stop rendering
				self.pause();
				// Remove elements
				removeMeter();
				// Stop listening
				self.tick = self.tickStart = function () {};
			};

			/**
			 * Remove meter element.
			 *
			 * @return {Void}
			 */
			function removeMeter() {
				// Unbind listeners
				if (o.toggleOn) {
					listener(el.container, o.toggleOn, eventHandler, 1);
				}
				// Detach element
				anchor.removeChild(el.container);
			}

			/**
			 * Sets the theme, and generates heatmaps when needed.
			 */
			function setTheme() {
				theme = FPSMeter.theme[o.theme];

				// Generate heatmaps
				heatmaps = theme.compiledHeatmaps || [];
				if (!heatmaps.length && theme.heatmaps.length) {
					for (j = 0; j < theme.heatmaps.length; j++) {
						heatmaps[j] = [];
						for (i = 0; i <= heatDepth; i++) {
							heatmaps[j][i] = hslToHex(0.33 / heatDepth * i, theme.heatmaps[j].saturation, theme.heatmaps[j].lightness);
						}
					}
					theme.compiledHeatmaps = heatmaps;
				}
			}

			/**
			 * Creates and attaches the meter element.
			 *
			 * @return {Void}
			 */
			function createMeter() {
				// Remove old meter if present
				if (el.container) {
					removeMeter();
				}

				// Set theme
				setTheme();

				// Create elements
				el.container = applyTheme(newEl('div'), theme.container);
				el.count = el.container.appendChild(applyTheme(newEl('div'), theme.count));
				el.legend = el.container.appendChild(applyTheme(newEl('div'), theme.legend));
				el.graph = o.graph ? el.container.appendChild(applyTheme(newEl('div'), theme.graph)) : 0;

				// Add elements to heating array
				heating.length = 0;
				for (var key in el) {
					if (el[key] && theme[key].heatOn) {
						heating.push({
							name: key,
							el: el[key]
						});
					}
				}

				// Graph
				cols.length = 0;
				if (el.graph) {
					// Create graph
					el.graph.style.width = (o.history * theme.column.width + (o.history - 1) * theme.column.spacing) + 'px';

					// Add columns
					for (i = 0; i < o.history; i++) {
						cols[i] = el.graph.appendChild(applyTheme(newEl('div'), theme.column));
						cols[i].style.position = 'absolute';
						cols[i].style.bottom = 0;
						cols[i].style.right = (i * theme.column.width + i * theme.column.spacing) + 'px';
						cols[i].style.width = theme.column.width + 'px';
						cols[i].style.height = '0px';
					}
				}

				// Set the initial state
				positionMeter();
				updateCounter();

				// Append container to anchor
				anchor.appendChild(el.container);

				// Retrieve graph height after it was appended to DOM
				if (el.graph) {
					graphHeight = el.graph.clientHeight;
				}

				// Add event listeners
				if (o.toggleOn) {
					if (o.toggleOn === 'click') {
						el.container.style.cursor = 'pointer';
					}
					listener(el.container, o.toggleOn, eventHandler);
				}
			}

			/**
			 * Positions the meter based on options.
			 *
			 * @return {Void}
			 */
			function positionMeter() {
				applyTheme(el.container, o);
			}

			/**
			 * Construct.
			 */
			(function () {
				// Create meter element
				createMeter();
				// Start rendering
				requestRender();
			}());
		}

		// Expose the extend function
		FPSMeter.extend = extend;

		// Expose the FPSMeter class
		window.FPSMeter = FPSMeter;

		// Default options
		FPSMeter.defaults = {
			interval:  100,     // Update interval in milliseconds.
			smoothing: 10,      // Spike smoothing strength. 1 means no smoothing.
			show:      'fps',   // Whether to show 'fps', or 'ms' = frame duration in milliseconds.
			toggleOn:  'click', // Toggle between show 'fps' and 'ms' on this event.
			decimals:  1,       // Number of decimals in FPS number. 1 = 59.9, 2 = 59.94, ...
			maxFps:    60,      // Max expected FPS value.
			threshold: 100,     // Minimal tick reporting interval in milliseconds.

			// Meter position
			position: 'absolute', // Meter position.
			zIndex:   10,         // Meter Z index.
			left:     '5px',      // Meter left offset.
			top:      '5px',      // Meter top offset.
			right:    'auto',     // Meter right offset.
			bottom:   'auto',     // Meter bottom offset.
			margin:   '0 0 0 0',  // Meter margin. Helps with centering the counter when left: 50%;

			// Theme
			theme: 'dark', // Meter theme. Build in: 'dark', 'light', 'transparent', 'colorful'.
			heat:  0,      // Allow themes to use coloring by FPS heat. 0 FPS = red, maxFps = green.

			// Graph
			graph:   0, // Whether to show history graph.
			history: 20 // How many history states to show in a graph.
		};

		// Option names that trigger FPSMeter rebuild or reposition when modified
		var rebuilders = [
			'toggleOn',
			'theme',
			'heat',
			'graph',
			'history'
		];
		var repositioners = [
			'position',
			'zIndex',
			'left',
			'top',
			'right',
			'bottom',
			'margin'
		];
	}(window));
	(function (w, FPSMeter, undefined$1) {

		// Themes object
		FPSMeter.theme = {};

		// Base theme with layout, no colors
		var base = FPSMeter.theme.base = {
			heatmaps: [],
			container: {
				// Settings
				heatOn: null,
				heatmap: null,

				// Styles
				padding: '5px',
				minWidth: '95px',
				height: '30px',
				lineHeight: '30px',
				textAlign: 'right',
				textShadow: 'none'
			},
			count: {
				// Settings
				heatOn: null,
				heatmap: null,

				// Styles
				position: 'absolute',
				top: 0,
				right: 0,
				padding: '5px 10px',
				height: '30px',
				fontSize: '24px',
				fontFamily: 'Consolas, Andale Mono, monospace',
				zIndex: 2
			},
			legend: {
				// Settings
				heatOn: null,
				heatmap: null,

				// Styles
				position: 'absolute',
				top: 0,
				left: 0,
				padding: '5px 10px',
				height: '30px',
				fontSize: '12px',
				lineHeight: '32px',
				fontFamily: 'sans-serif',
				textAlign: 'left',
				zIndex: 2
			},
			graph: {
				// Settings
				heatOn: null,
				heatmap: null,

				// Styles
				position: 'relative',
				boxSizing: 'padding-box',
				MozBoxSizing: 'padding-box',
				height: '100%',
				zIndex: 1
			},
			column: {
				// Settings
				width: 4,
				spacing: 1,
				heatOn: null,
				heatmap: null
			}
		};

		// Dark theme
		FPSMeter.theme.dark = FPSMeter.extend({}, base, {
			heatmaps: [{
				saturation: 0.8,
				lightness: 0.8
			}],
			container: {
				background: '#222',
				color: '#fff',
				border: '1px solid #1a1a1a',
				textShadow: '1px 1px 0 #222'
			},
			count: {
				heatOn: 'color'
			},
			column: {
				background: '#3f3f3f'
			}
		});

		// Light theme
		FPSMeter.theme.light = FPSMeter.extend({}, base, {
			heatmaps: [{
				saturation: 0.5,
				lightness: 0.5
			}],
			container: {
				color: '#666',
				background: '#fff',
				textShadow: '1px 1px 0 rgba(255,255,255,.5), -1px -1px 0 rgba(255,255,255,.5)',
				boxShadow: '0 0 0 1px rgba(0,0,0,.1)'
			},
			count: {
				heatOn: 'color'
			},
			column: {
				background: '#eaeaea'
			}
		});

		// Colorful theme
		FPSMeter.theme.colorful = FPSMeter.extend({}, base, {
			heatmaps: [{
				saturation: 0.5,
				lightness: 0.6
			}],
			container: {
				heatOn: 'backgroundColor',
				background: '#888',
				color: '#fff',
				textShadow: '1px 1px 0 rgba(0,0,0,.2)',
				boxShadow: '0 0 0 1px rgba(0,0,0,.1)'
			},
			column: {
				background: '#777',
				backgroundColor: 'rgba(0,0,0,.2)'
			}
		});

		// Transparent theme
		FPSMeter.theme.transparent = FPSMeter.extend({}, base, {
			heatmaps: [{
				saturation: 0.8,
				lightness: 0.5
			}],
			container: {
				padding: 0,
				color: '#fff',
				textShadow: '1px 1px 0 rgba(0,0,0,.5)'
			},
			count: {
				padding: '0 5px',
				height: '40px',
				lineHeight: '40px'
			},
			legend: {
				padding: '0 5px',
				height: '40px',
				lineHeight: '42px'
			},
			graph: {
				height: '40px'
			},
			column: {
				width: 5,
				background: '#999',
				heatOn: 'backgroundColor',
				opacity: 0.5
			}
		});
	}(window, FPSMeter));

	function identity$2(x) {
	  return x;
	}

	var top = 1,
	    right = 2,
	    bottom = 3,
	    left = 4,
	    epsilon = 1e-6;

	function translateX(x) {
	  return "translate(" + x + ",0)";
	}

	function translateY(y) {
	  return "translate(0," + y + ")";
	}

	function number$2(scale) {
	  return d => +scale(d);
	}

	function center(scale, offset) {
	  offset = Math.max(0, scale.bandwidth() - offset * 2) / 2;
	  if (scale.round()) offset = Math.round(offset);
	  return d => +scale(d) + offset;
	}

	function entering() {
	  return !this.__axis;
	}

	function axis(orient, scale) {
	  var tickArguments = [],
	      tickValues = null,
	      tickFormat = null,
	      tickSizeInner = 6,
	      tickSizeOuter = 6,
	      tickPadding = 3,
	      offset = typeof window !== "undefined" && window.devicePixelRatio > 1 ? 0 : 0.5,
	      k = orient === top || orient === left ? -1 : 1,
	      x = orient === left || orient === right ? "x" : "y",
	      transform = orient === top || orient === bottom ? translateX : translateY;

	  function axis(context) {
	    var values = tickValues == null ? (scale.ticks ? scale.ticks.apply(scale, tickArguments) : scale.domain()) : tickValues,
	        format = tickFormat == null ? (scale.tickFormat ? scale.tickFormat.apply(scale, tickArguments) : identity$2) : tickFormat,
	        spacing = Math.max(tickSizeInner, 0) + tickPadding,
	        range = scale.range(),
	        range0 = +range[0] + offset,
	        range1 = +range[range.length - 1] + offset,
	        position = (scale.bandwidth ? center : number$2)(scale.copy(), offset),
	        selection = context.selection ? context.selection() : context,
	        path = selection.selectAll(".domain").data([null]),
	        tick = selection.selectAll(".tick").data(values, scale).order(),
	        tickExit = tick.exit(),
	        tickEnter = tick.enter().append("g").attr("class", "tick"),
	        line = tick.select("line"),
	        text = tick.select("text");

	    path = path.merge(path.enter().insert("path", ".tick")
	        .attr("class", "domain")
	        .attr("stroke", "currentColor"));

	    tick = tick.merge(tickEnter);

	    line = line.merge(tickEnter.append("line")
	        .attr("stroke", "currentColor")
	        .attr(x + "2", k * tickSizeInner));

	    text = text.merge(tickEnter.append("text")
	        .attr("fill", "currentColor")
	        .attr(x, k * spacing)
	        .attr("dy", orient === top ? "0em" : orient === bottom ? "0.71em" : "0.32em"));

	    if (context !== selection) {
	      path = path.transition(context);
	      tick = tick.transition(context);
	      line = line.transition(context);
	      text = text.transition(context);

	      tickExit = tickExit.transition(context)
	          .attr("opacity", epsilon)
	          .attr("transform", function(d) { return isFinite(d = position(d)) ? transform(d + offset) : this.getAttribute("transform"); });

	      tickEnter
	          .attr("opacity", epsilon)
	          .attr("transform", function(d) { var p = this.parentNode.__axis; return transform((p && isFinite(p = p(d)) ? p : position(d)) + offset); });
	    }

	    tickExit.remove();

	    path
	        .attr("d", orient === left || orient === right
	            ? (tickSizeOuter ? "M" + k * tickSizeOuter + "," + range0 + "H" + offset + "V" + range1 + "H" + k * tickSizeOuter : "M" + offset + "," + range0 + "V" + range1)
	            : (tickSizeOuter ? "M" + range0 + "," + k * tickSizeOuter + "V" + offset + "H" + range1 + "V" + k * tickSizeOuter : "M" + range0 + "," + offset + "H" + range1));

	    tick
	        .attr("opacity", 1)
	        .attr("transform", function(d) { return transform(position(d) + offset); });

	    line
	        .attr(x + "2", k * tickSizeInner);

	    text
	        .attr(x, k * spacing)
	        .text(format);

	    selection.filter(entering)
	        .attr("fill", "none")
	        .attr("font-size", 10)
	        .attr("font-family", "sans-serif")
	        .attr("text-anchor", orient === right ? "start" : orient === left ? "end" : "middle");

	    selection
	        .each(function() { this.__axis = position; });
	  }

	  axis.scale = function(_) {
	    return arguments.length ? (scale = _, axis) : scale;
	  };

	  axis.ticks = function() {
	    return tickArguments = Array.from(arguments), axis;
	  };

	  axis.tickArguments = function(_) {
	    return arguments.length ? (tickArguments = _ == null ? [] : Array.from(_), axis) : tickArguments.slice();
	  };

	  axis.tickValues = function(_) {
	    return arguments.length ? (tickValues = _ == null ? null : Array.from(_), axis) : tickValues && tickValues.slice();
	  };

	  axis.tickFormat = function(_) {
	    return arguments.length ? (tickFormat = _, axis) : tickFormat;
	  };

	  axis.tickSize = function(_) {
	    return arguments.length ? (tickSizeInner = tickSizeOuter = +_, axis) : tickSizeInner;
	  };

	  axis.tickSizeInner = function(_) {
	    return arguments.length ? (tickSizeInner = +_, axis) : tickSizeInner;
	  };

	  axis.tickSizeOuter = function(_) {
	    return arguments.length ? (tickSizeOuter = +_, axis) : tickSizeOuter;
	  };

	  axis.tickPadding = function(_) {
	    return arguments.length ? (tickPadding = +_, axis) : tickPadding;
	  };

	  axis.offset = function(_) {
	    return arguments.length ? (offset = +_, axis) : offset;
	  };

	  return axis;
	}

	function axisTop(scale) {
	  return axis(top, scale);
	}

	function axisRight(scale) {
	  return axis(right, scale);
	}

	function axisBottom(scale) {
	  return axis(bottom, scale);
	}

	function axisLeft(scale) {
	  return axis(left, scale);
	}

	function ascending$1(a, b) {
	  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
	}

	function bisector(f) {
	  let delta = f;
	  let compare = f;

	  if (f.length === 1) {
	    delta = (d, x) => f(d) - x;
	    compare = ascendingComparator(f);
	  }

	  function left(a, x, lo, hi) {
	    if (lo == null) lo = 0;
	    if (hi == null) hi = a.length;
	    while (lo < hi) {
	      const mid = (lo + hi) >>> 1;
	      if (compare(a[mid], x) < 0) lo = mid + 1;
	      else hi = mid;
	    }
	    return lo;
	  }

	  function right(a, x, lo, hi) {
	    if (lo == null) lo = 0;
	    if (hi == null) hi = a.length;
	    while (lo < hi) {
	      const mid = (lo + hi) >>> 1;
	      if (compare(a[mid], x) > 0) hi = mid;
	      else lo = mid + 1;
	    }
	    return lo;
	  }

	  function center(a, x, lo, hi) {
	    if (lo == null) lo = 0;
	    if (hi == null) hi = a.length;
	    const i = left(a, x, lo, hi - 1);
	    return i > lo && delta(a[i - 1], x) > -delta(a[i], x) ? i - 1 : i;
	  }

	  return {left, center, right};
	}

	function ascendingComparator(f) {
	  return (d, x) => ascending$1(f(d), x);
	}

	function number$1(x) {
	  return x === null ? NaN : +x;
	}

	const ascendingBisect = bisector(ascending$1);
	const bisectRight = ascendingBisect.right;
	bisector(number$1).center;

	var e10 = Math.sqrt(50),
	    e5 = Math.sqrt(10),
	    e2 = Math.sqrt(2);

	function ticks(start, stop, count) {
	  var reverse,
	      i = -1,
	      n,
	      ticks,
	      step;

	  stop = +stop, start = +start, count = +count;
	  if (start === stop && count > 0) return [start];
	  if (reverse = stop < start) n = start, start = stop, stop = n;
	  if ((step = tickIncrement(start, stop, count)) === 0 || !isFinite(step)) return [];

	  if (step > 0) {
	    let r0 = Math.round(start / step), r1 = Math.round(stop / step);
	    if (r0 * step < start) ++r0;
	    if (r1 * step > stop) --r1;
	    ticks = new Array(n = r1 - r0 + 1);
	    while (++i < n) ticks[i] = (r0 + i) * step;
	  } else {
	    step = -step;
	    let r0 = Math.round(start * step), r1 = Math.round(stop * step);
	    if (r0 / step < start) ++r0;
	    if (r1 / step > stop) --r1;
	    ticks = new Array(n = r1 - r0 + 1);
	    while (++i < n) ticks[i] = (r0 + i) / step;
	  }

	  if (reverse) ticks.reverse();

	  return ticks;
	}

	function tickIncrement(start, stop, count) {
	  var step = (stop - start) / Math.max(0, count),
	      power = Math.floor(Math.log(step) / Math.LN10),
	      error = step / Math.pow(10, power);
	  return power >= 0
	      ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) * Math.pow(10, power)
	      : -Math.pow(10, -power) / (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1);
	}

	function tickStep(start, stop, count) {
	  var step0 = Math.abs(stop - start) / Math.max(0, count),
	      step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)),
	      error = step0 / step1;
	  if (error >= e10) step1 *= 10;
	  else if (error >= e5) step1 *= 5;
	  else if (error >= e2) step1 *= 2;
	  return stop < start ? -step1 : step1;
	}

	function initRange(domain, range) {
	  switch (arguments.length) {
	    case 0: break;
	    case 1: this.range(domain); break;
	    default: this.range(range).domain(domain); break;
	  }
	  return this;
	}

	function define(constructor, factory, prototype) {
	  constructor.prototype = factory.prototype = prototype;
	  prototype.constructor = constructor;
	}

	function extend(parent, definition) {
	  var prototype = Object.create(parent.prototype);
	  for (var key in definition) prototype[key] = definition[key];
	  return prototype;
	}

	function Color() {}

	var darker = 0.7;
	var brighter = 1 / darker;

	var reI = "\\s*([+-]?\\d+)\\s*",
	    reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
	    reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
	    reHex = /^#([0-9a-f]{3,8})$/,
	    reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$"),
	    reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$"),
	    reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$"),
	    reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$"),
	    reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$"),
	    reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");

	var named = {
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

	define(Color, color, {
	  copy: function(channels) {
	    return Object.assign(new this.constructor, this, channels);
	  },
	  displayable: function() {
	    return this.rgb().displayable();
	  },
	  hex: color_formatHex, // Deprecated! Use color.formatHex.
	  formatHex: color_formatHex,
	  formatHsl: color_formatHsl,
	  formatRgb: color_formatRgb,
	  toString: color_formatRgb
	});

	function color_formatHex() {
	  return this.rgb().formatHex();
	}

	function color_formatHsl() {
	  return hslConvert(this).formatHsl();
	}

	function color_formatRgb() {
	  return this.rgb().formatRgb();
	}

	function color(format) {
	  var m, l;
	  format = (format + "").trim().toLowerCase();
	  return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) // #ff0000
	      : l === 3 ? new Rgb((m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1) // #f00
	      : l === 8 ? rgba(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) // #ff000000
	      : l === 4 ? rgba((m >> 12 & 0xf) | (m >> 8 & 0xf0), (m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), (((m & 0xf) << 4) | (m & 0xf)) / 0xff) // #f000
	      : null) // invalid hex
	      : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
	      : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
	      : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
	      : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
	      : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
	      : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
	      : named.hasOwnProperty(format) ? rgbn(named[format]) // eslint-disable-line no-prototype-builtins
	      : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0)
	      : null;
	}

	function rgbn(n) {
	  return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
	}

	function rgba(r, g, b, a) {
	  if (a <= 0) r = g = b = NaN;
	  return new Rgb(r, g, b, a);
	}

	function rgbConvert(o) {
	  if (!(o instanceof Color)) o = color(o);
	  if (!o) return new Rgb;
	  o = o.rgb();
	  return new Rgb(o.r, o.g, o.b, o.opacity);
	}

	function rgb$1(r, g, b, opacity) {
	  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
	}

	function Rgb(r, g, b, opacity) {
	  this.r = +r;
	  this.g = +g;
	  this.b = +b;
	  this.opacity = +opacity;
	}

	define(Rgb, rgb$1, extend(Color, {
	  brighter: function(k) {
	    k = k == null ? brighter : Math.pow(brighter, k);
	    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
	  },
	  darker: function(k) {
	    k = k == null ? darker : Math.pow(darker, k);
	    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
	  },
	  rgb: function() {
	    return this;
	  },
	  displayable: function() {
	    return (-0.5 <= this.r && this.r < 255.5)
	        && (-0.5 <= this.g && this.g < 255.5)
	        && (-0.5 <= this.b && this.b < 255.5)
	        && (0 <= this.opacity && this.opacity <= 1);
	  },
	  hex: rgb_formatHex, // Deprecated! Use color.formatHex.
	  formatHex: rgb_formatHex,
	  formatRgb: rgb_formatRgb,
	  toString: rgb_formatRgb
	}));

	function rgb_formatHex() {
	  return "#" + hex(this.r) + hex(this.g) + hex(this.b);
	}

	function rgb_formatRgb() {
	  var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
	  return (a === 1 ? "rgb(" : "rgba(")
	      + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", "
	      + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", "
	      + Math.max(0, Math.min(255, Math.round(this.b) || 0))
	      + (a === 1 ? ")" : ", " + a + ")");
	}

	function hex(value) {
	  value = Math.max(0, Math.min(255, Math.round(value) || 0));
	  return (value < 16 ? "0" : "") + value.toString(16);
	}

	function hsla(h, s, l, a) {
	  if (a <= 0) h = s = l = NaN;
	  else if (l <= 0 || l >= 1) h = s = NaN;
	  else if (s <= 0) h = NaN;
	  return new Hsl(h, s, l, a);
	}

	function hslConvert(o) {
	  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
	  if (!(o instanceof Color)) o = color(o);
	  if (!o) return new Hsl;
	  if (o instanceof Hsl) return o;
	  o = o.rgb();
	  var r = o.r / 255,
	      g = o.g / 255,
	      b = o.b / 255,
	      min = Math.min(r, g, b),
	      max = Math.max(r, g, b),
	      h = NaN,
	      s = max - min,
	      l = (max + min) / 2;
	  if (s) {
	    if (r === max) h = (g - b) / s + (g < b) * 6;
	    else if (g === max) h = (b - r) / s + 2;
	    else h = (r - g) / s + 4;
	    s /= l < 0.5 ? max + min : 2 - max - min;
	    h *= 60;
	  } else {
	    s = l > 0 && l < 1 ? 0 : h;
	  }
	  return new Hsl(h, s, l, o.opacity);
	}

	function hsl(h, s, l, opacity) {
	  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
	}

	function Hsl(h, s, l, opacity) {
	  this.h = +h;
	  this.s = +s;
	  this.l = +l;
	  this.opacity = +opacity;
	}

	define(Hsl, hsl, extend(Color, {
	  brighter: function(k) {
	    k = k == null ? brighter : Math.pow(brighter, k);
	    return new Hsl(this.h, this.s, this.l * k, this.opacity);
	  },
	  darker: function(k) {
	    k = k == null ? darker : Math.pow(darker, k);
	    return new Hsl(this.h, this.s, this.l * k, this.opacity);
	  },
	  rgb: function() {
	    var h = this.h % 360 + (this.h < 0) * 360,
	        s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
	        l = this.l,
	        m2 = l + (l < 0.5 ? l : 1 - l) * s,
	        m1 = 2 * l - m2;
	    return new Rgb(
	      hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
	      hsl2rgb(h, m1, m2),
	      hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
	      this.opacity
	    );
	  },
	  displayable: function() {
	    return (0 <= this.s && this.s <= 1 || isNaN(this.s))
	        && (0 <= this.l && this.l <= 1)
	        && (0 <= this.opacity && this.opacity <= 1);
	  },
	  formatHsl: function() {
	    var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
	    return (a === 1 ? "hsl(" : "hsla(")
	        + (this.h || 0) + ", "
	        + (this.s || 0) * 100 + "%, "
	        + (this.l || 0) * 100 + "%"
	        + (a === 1 ? ")" : ", " + a + ")");
	  }
	}));

	/* From FvD 13.37, CSS Color Module Level 3 */
	function hsl2rgb(h, m1, m2) {
	  return (h < 60 ? m1 + (m2 - m1) * h / 60
	      : h < 180 ? m2
	      : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
	      : m1) * 255;
	}

	var constant$1 = x => () => x;

	function linear$1(a, d) {
	  return function(t) {
	    return a + t * d;
	  };
	}

	function exponential(a, b, y) {
	  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
	    return Math.pow(a + t * b, y);
	  };
	}

	function gamma(y) {
	  return (y = +y) === 1 ? nogamma : function(a, b) {
	    return b - a ? exponential(a, b, y) : constant$1(isNaN(a) ? b : a);
	  };
	}

	function nogamma(a, b) {
	  var d = b - a;
	  return d ? linear$1(a, d) : constant$1(isNaN(a) ? b : a);
	}

	var rgb = (function rgbGamma(y) {
	  var color = gamma(y);

	  function rgb(start, end) {
	    var r = color((start = rgb$1(start)).r, (end = rgb$1(end)).r),
	        g = color(start.g, end.g),
	        b = color(start.b, end.b),
	        opacity = nogamma(start.opacity, end.opacity);
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
	})(1);

	function numberArray(a, b) {
	  if (!b) b = [];
	  var n = a ? Math.min(b.length, a.length) : 0,
	      c = b.slice(),
	      i;
	  return function(t) {
	    for (i = 0; i < n; ++i) c[i] = a[i] * (1 - t) + b[i] * t;
	    return c;
	  };
	}

	function isNumberArray(x) {
	  return ArrayBuffer.isView(x) && !(x instanceof DataView);
	}

	function genericArray(a, b) {
	  var nb = b ? b.length : 0,
	      na = a ? Math.min(nb, a.length) : 0,
	      x = new Array(na),
	      c = new Array(nb),
	      i;

	  for (i = 0; i < na; ++i) x[i] = interpolate(a[i], b[i]);
	  for (; i < nb; ++i) c[i] = b[i];

	  return function(t) {
	    for (i = 0; i < na; ++i) c[i] = x[i](t);
	    return c;
	  };
	}

	function date(a, b) {
	  var d = new Date;
	  return a = +a, b = +b, function(t) {
	    return d.setTime(a * (1 - t) + b * t), d;
	  };
	}

	function interpolateNumber(a, b) {
	  return a = +a, b = +b, function(t) {
	    return a * (1 - t) + b * t;
	  };
	}

	function object(a, b) {
	  var i = {},
	      c = {},
	      k;

	  if (a === null || typeof a !== "object") a = {};
	  if (b === null || typeof b !== "object") b = {};

	  for (k in b) {
	    if (k in a) {
	      i[k] = interpolate(a[k], b[k]);
	    } else {
	      c[k] = b[k];
	    }
	  }

	  return function(t) {
	    for (k in i) c[k] = i[k](t);
	    return c;
	  };
	}

	var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
	    reB = new RegExp(reA.source, "g");

	function zero(b) {
	  return function() {
	    return b;
	  };
	}

	function one(b) {
	  return function(t) {
	    return b(t) + "";
	  };
	}

	function string(a, b) {
	  var bi = reA.lastIndex = reB.lastIndex = 0, // scan index for next number in b
	      am, // current match in a
	      bm, // current match in b
	      bs, // string preceding current number in b, if any
	      i = -1, // index in s
	      s = [], // string constants and placeholders
	      q = []; // number interpolators

	  // Coerce inputs to strings.
	  a = a + "", b = b + "";

	  // Interpolate pairs of numbers in a & b.
	  while ((am = reA.exec(a))
	      && (bm = reB.exec(b))) {
	    if ((bs = bm.index) > bi) { // a string precedes the next number in b
	      bs = b.slice(bi, bs);
	      if (s[i]) s[i] += bs; // coalesce with previous string
	      else s[++i] = bs;
	    }
	    if ((am = am[0]) === (bm = bm[0])) { // numbers in a & b match
	      if (s[i]) s[i] += bm; // coalesce with previous string
	      else s[++i] = bm;
	    } else { // interpolate non-matching numbers
	      s[++i] = null;
	      q.push({i: i, x: interpolateNumber(am, bm)});
	    }
	    bi = reB.lastIndex;
	  }

	  // Add remains of b.
	  if (bi < b.length) {
	    bs = b.slice(bi);
	    if (s[i]) s[i] += bs; // coalesce with previous string
	    else s[++i] = bs;
	  }

	  // Special optimization for only a single match.
	  // Otherwise, interpolate each of the numbers and rejoin the string.
	  return s.length < 2 ? (q[0]
	      ? one(q[0].x)
	      : zero(b))
	      : (b = q.length, function(t) {
	          for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
	          return s.join("");
	        });
	}

	function interpolate(a, b) {
	  var t = typeof b, c;
	  return b == null || t === "boolean" ? constant$1(b)
	      : (t === "number" ? interpolateNumber
	      : t === "string" ? ((c = color(b)) ? (b = c, rgb) : string)
	      : b instanceof color ? rgb
	      : b instanceof Date ? date
	      : isNumberArray(b) ? numberArray
	      : Array.isArray(b) ? genericArray
	      : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object
	      : interpolateNumber)(a, b);
	}

	function interpolateRound(a, b) {
	  return a = +a, b = +b, function(t) {
	    return Math.round(a * (1 - t) + b * t);
	  };
	}

	function constants(x) {
	  return function() {
	    return x;
	  };
	}

	function number(x) {
	  return +x;
	}

	var unit = [0, 1];

	function identity$1(x) {
	  return x;
	}

	function normalize(a, b) {
	  return (b -= (a = +a))
	      ? function(x) { return (x - a) / b; }
	      : constants(isNaN(b) ? NaN : 0.5);
	}

	function clamper(a, b) {
	  var t;
	  if (a > b) t = a, a = b, b = t;
	  return function(x) { return Math.max(a, Math.min(b, x)); };
	}

	// normalize(a, b)(x) takes a domain value x in [a,b] and returns the corresponding parameter t in [0,1].
	// interpolate(a, b)(t) takes a parameter t in [0,1] and returns the corresponding range value x in [a,b].
	function bimap(domain, range, interpolate) {
	  var d0 = domain[0], d1 = domain[1], r0 = range[0], r1 = range[1];
	  if (d1 < d0) d0 = normalize(d1, d0), r0 = interpolate(r1, r0);
	  else d0 = normalize(d0, d1), r0 = interpolate(r0, r1);
	  return function(x) { return r0(d0(x)); };
	}

	function polymap(domain, range, interpolate) {
	  var j = Math.min(domain.length, range.length) - 1,
	      d = new Array(j),
	      r = new Array(j),
	      i = -1;

	  // Reverse descending domains.
	  if (domain[j] < domain[0]) {
	    domain = domain.slice().reverse();
	    range = range.slice().reverse();
	  }

	  while (++i < j) {
	    d[i] = normalize(domain[i], domain[i + 1]);
	    r[i] = interpolate(range[i], range[i + 1]);
	  }

	  return function(x) {
	    var i = bisectRight(domain, x, 1, j) - 1;
	    return r[i](d[i](x));
	  };
	}

	function copy(source, target) {
	  return target
	      .domain(source.domain())
	      .range(source.range())
	      .interpolate(source.interpolate())
	      .clamp(source.clamp())
	      .unknown(source.unknown());
	}

	function transformer() {
	  var domain = unit,
	      range = unit,
	      interpolate$1 = interpolate,
	      transform,
	      untransform,
	      unknown,
	      clamp = identity$1,
	      piecewise,
	      output,
	      input;

	  function rescale() {
	    var n = Math.min(domain.length, range.length);
	    if (clamp !== identity$1) clamp = clamper(domain[0], domain[n - 1]);
	    piecewise = n > 2 ? polymap : bimap;
	    output = input = null;
	    return scale;
	  }

	  function scale(x) {
	    return x == null || isNaN(x = +x) ? unknown : (output || (output = piecewise(domain.map(transform), range, interpolate$1)))(transform(clamp(x)));
	  }

	  scale.invert = function(y) {
	    return clamp(untransform((input || (input = piecewise(range, domain.map(transform), interpolateNumber)))(y)));
	  };

	  scale.domain = function(_) {
	    return arguments.length ? (domain = Array.from(_, number), rescale()) : domain.slice();
	  };

	  scale.range = function(_) {
	    return arguments.length ? (range = Array.from(_), rescale()) : range.slice();
	  };

	  scale.rangeRound = function(_) {
	    return range = Array.from(_), interpolate$1 = interpolateRound, rescale();
	  };

	  scale.clamp = function(_) {
	    return arguments.length ? (clamp = _ ? true : identity$1, rescale()) : clamp !== identity$1;
	  };

	  scale.interpolate = function(_) {
	    return arguments.length ? (interpolate$1 = _, rescale()) : interpolate$1;
	  };

	  scale.unknown = function(_) {
	    return arguments.length ? (unknown = _, scale) : unknown;
	  };

	  return function(t, u) {
	    transform = t, untransform = u;
	    return rescale();
	  };
	}

	function continuous() {
	  return transformer()(identity$1, identity$1);
	}

	function formatDecimal(x) {
	  return Math.abs(x = Math.round(x)) >= 1e21
	      ? x.toLocaleString("en").replace(/,/g, "")
	      : x.toString(10);
	}

	// Computes the decimal coefficient and exponent of the specified number x with
	// significant digits p, where x is positive and p is in [1, 21] or undefined.
	// For example, formatDecimalParts(1.23) returns ["123", 0].
	function formatDecimalParts(x, p) {
	  if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null; // NaN, ±Infinity
	  var i, coefficient = x.slice(0, i);

	  // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
	  // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).
	  return [
	    coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
	    +x.slice(i + 1)
	  ];
	}

	function exponent(x) {
	  return x = formatDecimalParts(Math.abs(x)), x ? x[1] : NaN;
	}

	function formatGroup(grouping, thousands) {
	  return function(value, width) {
	    var i = value.length,
	        t = [],
	        j = 0,
	        g = grouping[0],
	        length = 0;

	    while (i > 0 && g > 0) {
	      if (length + g + 1 > width) g = Math.max(1, width - length);
	      t.push(value.substring(i -= g, i + g));
	      if ((length += g + 1) > width) break;
	      g = grouping[j = (j + 1) % grouping.length];
	    }

	    return t.reverse().join(thousands);
	  };
	}

	function formatNumerals(numerals) {
	  return function(value) {
	    return value.replace(/[0-9]/g, function(i) {
	      return numerals[+i];
	    });
	  };
	}

	// [[fill]align][sign][symbol][0][width][,][.precision][~][type]
	var re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;

	function formatSpecifier(specifier) {
	  if (!(match = re.exec(specifier))) throw new Error("invalid format: " + specifier);
	  var match;
	  return new FormatSpecifier({
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

	formatSpecifier.prototype = FormatSpecifier.prototype; // instanceof

	function FormatSpecifier(specifier) {
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

	FormatSpecifier.prototype.toString = function() {
	  return this.fill
	      + this.align
	      + this.sign
	      + this.symbol
	      + (this.zero ? "0" : "")
	      + (this.width === undefined ? "" : Math.max(1, this.width | 0))
	      + (this.comma ? "," : "")
	      + (this.precision === undefined ? "" : "." + Math.max(0, this.precision | 0))
	      + (this.trim ? "~" : "")
	      + this.type;
	};

	// Trims insignificant zeros, e.g., replaces 1.2000k with 1.2k.
	function formatTrim(s) {
	  out: for (var n = s.length, i = 1, i0 = -1, i1; i < n; ++i) {
	    switch (s[i]) {
	      case ".": i0 = i1 = i; break;
	      case "0": if (i0 === 0) i0 = i; i1 = i; break;
	      default: if (!+s[i]) break out; if (i0 > 0) i0 = 0; break;
	    }
	  }
	  return i0 > 0 ? s.slice(0, i0) + s.slice(i1 + 1) : s;
	}

	var prefixExponent;

	function formatPrefixAuto(x, p) {
	  var d = formatDecimalParts(x, p);
	  if (!d) return x + "";
	  var coefficient = d[0],
	      exponent = d[1],
	      i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1,
	      n = coefficient.length;
	  return i === n ? coefficient
	      : i > n ? coefficient + new Array(i - n + 1).join("0")
	      : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i)
	      : "0." + new Array(1 - i).join("0") + formatDecimalParts(x, Math.max(0, p + i - 1))[0]; // less than 1y!
	}

	function formatRounded(x, p) {
	  var d = formatDecimalParts(x, p);
	  if (!d) return x + "";
	  var coefficient = d[0],
	      exponent = d[1];
	  return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient
	      : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1)
	      : coefficient + new Array(exponent - coefficient.length + 2).join("0");
	}

	var formatTypes = {
	  "%": (x, p) => (x * 100).toFixed(p),
	  "b": (x) => Math.round(x).toString(2),
	  "c": (x) => x + "",
	  "d": formatDecimal,
	  "e": (x, p) => x.toExponential(p),
	  "f": (x, p) => x.toFixed(p),
	  "g": (x, p) => x.toPrecision(p),
	  "o": (x) => Math.round(x).toString(8),
	  "p": (x, p) => formatRounded(x * 100, p),
	  "r": formatRounded,
	  "s": formatPrefixAuto,
	  "X": (x) => Math.round(x).toString(16).toUpperCase(),
	  "x": (x) => Math.round(x).toString(16)
	};

	function identity(x) {
	  return x;
	}

	var map = Array.prototype.map,
	    prefixes = ["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];

	function formatLocale(locale) {
	  var group = locale.grouping === undefined || locale.thousands === undefined ? identity : formatGroup(map.call(locale.grouping, Number), locale.thousands + ""),
	      currencyPrefix = locale.currency === undefined ? "" : locale.currency[0] + "",
	      currencySuffix = locale.currency === undefined ? "" : locale.currency[1] + "",
	      decimal = locale.decimal === undefined ? "." : locale.decimal + "",
	      numerals = locale.numerals === undefined ? identity : formatNumerals(map.call(locale.numerals, String)),
	      percent = locale.percent === undefined ? "%" : locale.percent + "",
	      minus = locale.minus === undefined ? "−" : locale.minus + "",
	      nan = locale.nan === undefined ? "NaN" : locale.nan + "";

	  function newFormat(specifier) {
	    specifier = formatSpecifier(specifier);

	    var fill = specifier.fill,
	        align = specifier.align,
	        sign = specifier.sign,
	        symbol = specifier.symbol,
	        zero = specifier.zero,
	        width = specifier.width,
	        comma = specifier.comma,
	        precision = specifier.precision,
	        trim = specifier.trim,
	        type = specifier.type;

	    // The "n" type is an alias for ",g".
	    if (type === "n") comma = true, type = "g";

	    // The "" type, and any invalid type, is an alias for ".12~g".
	    else if (!formatTypes[type]) precision === undefined && (precision = 12), trim = true, type = "g";

	    // If zero fill is specified, padding goes after sign and before digits.
	    if (zero || (fill === "0" && align === "=")) zero = true, fill = "0", align = "=";

	    // Compute the prefix and suffix.
	    // For SI-prefix, the suffix is lazily computed.
	    var prefix = symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "",
	        suffix = symbol === "$" ? currencySuffix : /[%p]/.test(type) ? percent : "";

	    // What format function should we use?
	    // Is this an integer type?
	    // Can this type generate exponential notation?
	    var formatType = formatTypes[type],
	        maybeSuffix = /[defgprs%]/.test(type);

	    // Set the default precision if not specified,
	    // or clamp the specified precision to the supported range.
	    // For significant precision, it must be in [1, 21].
	    // For fixed precision, it must be in [0, 20].
	    precision = precision === undefined ? 6
	        : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision))
	        : Math.max(0, Math.min(20, precision));

	    function format(value) {
	      var valuePrefix = prefix,
	          valueSuffix = suffix,
	          i, n, c;

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
	        if (trim) value = formatTrim(value);

	        // If a negative value rounds to zero after formatting, and no explicit positive sign is requested, hide the sign.
	        if (valueNegative && +value === 0 && sign !== "+") valueNegative = false;

	        // Compute the prefix and suffix.
	        valuePrefix = (valueNegative ? (sign === "(" ? sign : minus) : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
	        valueSuffix = (type === "s" ? prefixes[8 + prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : "");

	        // Break the formatted value into the integer “value” part that can be
	        // grouped, and fractional or exponential “suffix” part that is not.
	        if (maybeSuffix) {
	          i = -1, n = value.length;
	          while (++i < n) {
	            if (c = value.charCodeAt(i), 48 > c || c > 57) {
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
	      var length = valuePrefix.length + value.length + valueSuffix.length,
	          padding = length < width ? new Array(width - length + 1).join(fill) : "";

	      // If the fill character is "0", grouping is applied after padding.
	      if (comma && zero) value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";

	      // Reconstruct the final output based on the desired alignment.
	      switch (align) {
	        case "<": value = valuePrefix + value + valueSuffix + padding; break;
	        case "=": value = valuePrefix + padding + value + valueSuffix; break;
	        case "^": value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length); break;
	        default: value = padding + valuePrefix + value + valueSuffix; break;
	      }

	      return numerals(value);
	    }

	    format.toString = function() {
	      return specifier + "";
	    };

	    return format;
	  }

	  function formatPrefix(specifier, value) {
	    var f = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)),
	        e = Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3,
	        k = Math.pow(10, -e),
	        prefix = prefixes[8 + e / 3];
	    return function(value) {
	      return f(k * value) + prefix;
	    };
	  }

	  return {
	    format: newFormat,
	    formatPrefix: formatPrefix
	  };
	}

	var locale;
	var format;
	var formatPrefix;

	defaultLocale({
	  thousands: ",",
	  grouping: [3],
	  currency: ["$", ""]
	});

	function defaultLocale(definition) {
	  locale = formatLocale(definition);
	  format = locale.format;
	  formatPrefix = locale.formatPrefix;
	  return locale;
	}

	function precisionFixed(step) {
	  return Math.max(0, -exponent(Math.abs(step)));
	}

	function precisionPrefix(step, value) {
	  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3 - exponent(Math.abs(step)));
	}

	function precisionRound(step, max) {
	  step = Math.abs(step), max = Math.abs(max) - step;
	  return Math.max(0, exponent(max) - exponent(step)) + 1;
	}

	function tickFormat(start, stop, count, specifier) {
	  var step = tickStep(start, stop, count),
	      precision;
	  specifier = formatSpecifier(specifier == null ? ",f" : specifier);
	  switch (specifier.type) {
	    case "s": {
	      var value = Math.max(Math.abs(start), Math.abs(stop));
	      if (specifier.precision == null && !isNaN(precision = precisionPrefix(step, value))) specifier.precision = precision;
	      return formatPrefix(specifier, value);
	    }
	    case "":
	    case "e":
	    case "g":
	    case "p":
	    case "r": {
	      if (specifier.precision == null && !isNaN(precision = precisionRound(step, Math.max(Math.abs(start), Math.abs(stop))))) specifier.precision = precision - (specifier.type === "e");
	      break;
	    }
	    case "f":
	    case "%": {
	      if (specifier.precision == null && !isNaN(precision = precisionFixed(step))) specifier.precision = precision - (specifier.type === "%") * 2;
	      break;
	    }
	  }
	  return format(specifier);
	}

	function linearish(scale) {
	  var domain = scale.domain;

	  scale.ticks = function(count) {
	    var d = domain();
	    return ticks(d[0], d[d.length - 1], count == null ? 10 : count);
	  };

	  scale.tickFormat = function(count, specifier) {
	    var d = domain();
	    return tickFormat(d[0], d[d.length - 1], count == null ? 10 : count, specifier);
	  };

	  scale.nice = function(count) {
	    if (count == null) count = 10;

	    var d = domain();
	    var i0 = 0;
	    var i1 = d.length - 1;
	    var start = d[i0];
	    var stop = d[i1];
	    var prestep;
	    var step;
	    var maxIter = 10;

	    if (stop < start) {
	      step = start, start = stop, stop = step;
	      step = i0, i0 = i1, i1 = step;
	    }
	    
	    while (maxIter-- > 0) {
	      step = tickIncrement(start, stop, count);
	      if (step === prestep) {
	        d[i0] = start;
	        d[i1] = stop;
	        return domain(d);
	      } else if (step > 0) {
	        start = Math.floor(start / step) * step;
	        stop = Math.ceil(stop / step) * step;
	      } else if (step < 0) {
	        start = Math.ceil(start * step) / step;
	        stop = Math.floor(stop * step) / step;
	      } else {
	        break;
	      }
	      prestep = step;
	    }

	    return scale;
	  };

	  return scale;
	}

	function linear() {
	  var scale = continuous();

	  scale.copy = function() {
	    return copy(scale, linear());
	  };

	  initRange.apply(scale, arguments);

	  return linearish(scale);
	}

	var xhtml = "http://www.w3.org/1999/xhtml";

	var namespaces = {
	  svg: "http://www.w3.org/2000/svg",
	  xhtml: xhtml,
	  xlink: "http://www.w3.org/1999/xlink",
	  xml: "http://www.w3.org/XML/1998/namespace",
	  xmlns: "http://www.w3.org/2000/xmlns/"
	};

	function namespace(name) {
	  var prefix = name += "", i = prefix.indexOf(":");
	  if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
	  return namespaces.hasOwnProperty(prefix) ? {space: namespaces[prefix], local: name} : name; // eslint-disable-line no-prototype-builtins
	}

	function creatorInherit(name) {
	  return function() {
	    var document = this.ownerDocument,
	        uri = this.namespaceURI;
	    return uri === xhtml && document.documentElement.namespaceURI === xhtml
	        ? document.createElement(name)
	        : document.createElementNS(uri, name);
	  };
	}

	function creatorFixed(fullname) {
	  return function() {
	    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
	  };
	}

	function creator(name) {
	  var fullname = namespace(name);
	  return (fullname.local
	      ? creatorFixed
	      : creatorInherit)(fullname);
	}

	function none() {}

	function selector(selector) {
	  return selector == null ? none : function() {
	    return this.querySelector(selector);
	  };
	}

	function selection_select(select) {
	  if (typeof select !== "function") select = selector(select);

	  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
	      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
	        if ("__data__" in node) subnode.__data__ = node.__data__;
	        subgroup[i] = subnode;
	      }
	    }
	  }

	  return new Selection(subgroups, this._parents);
	}

	// Given something array like (or null), returns something that is strictly an
	// array. This is used to ensure that array-like objects passed to d3.selectAll
	// or selection.selectAll are converted into proper arrays when creating a
	// selection; we don’t ever want to create a selection backed by a live
	// HTMLCollection or NodeList. However, note that selection.selectAll will use a
	// static NodeList as a group, since it safely derived from querySelectorAll.
	function array(x) {
	  return x == null ? [] : Array.isArray(x) ? x : Array.from(x);
	}

	function empty() {
	  return [];
	}

	function selectorAll(selector) {
	  return selector == null ? empty : function() {
	    return this.querySelectorAll(selector);
	  };
	}

	function arrayAll(select) {
	  return function() {
	    return array(select.apply(this, arguments));
	  };
	}

	function selection_selectAll(select) {
	  if (typeof select === "function") select = arrayAll(select);
	  else select = selectorAll(select);

	  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
	      if (node = group[i]) {
	        subgroups.push(select.call(node, node.__data__, i, group));
	        parents.push(node);
	      }
	    }
	  }

	  return new Selection(subgroups, parents);
	}

	function matcher(selector) {
	  return function() {
	    return this.matches(selector);
	  };
	}

	function childMatcher(selector) {
	  return function(node) {
	    return node.matches(selector);
	  };
	}

	var find = Array.prototype.find;

	function childFind(match) {
	  return function() {
	    return find.call(this.children, match);
	  };
	}

	function childFirst() {
	  return this.firstElementChild;
	}

	function selection_selectChild(match) {
	  return this.select(match == null ? childFirst
	      : childFind(typeof match === "function" ? match : childMatcher(match)));
	}

	var filter = Array.prototype.filter;

	function children() {
	  return Array.from(this.children);
	}

	function childrenFilter(match) {
	  return function() {
	    return filter.call(this.children, match);
	  };
	}

	function selection_selectChildren(match) {
	  return this.selectAll(match == null ? children
	      : childrenFilter(typeof match === "function" ? match : childMatcher(match)));
	}

	function selection_filter(match) {
	  if (typeof match !== "function") match = matcher(match);

	  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
	      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
	        subgroup.push(node);
	      }
	    }
	  }

	  return new Selection(subgroups, this._parents);
	}

	function sparse(update) {
	  return new Array(update.length);
	}

	function selection_enter() {
	  return new Selection(this._enter || this._groups.map(sparse), this._parents);
	}

	function EnterNode(parent, datum) {
	  this.ownerDocument = parent.ownerDocument;
	  this.namespaceURI = parent.namespaceURI;
	  this._next = null;
	  this._parent = parent;
	  this.__data__ = datum;
	}

	EnterNode.prototype = {
	  constructor: EnterNode,
	  appendChild: function(child) { return this._parent.insertBefore(child, this._next); },
	  insertBefore: function(child, next) { return this._parent.insertBefore(child, next); },
	  querySelector: function(selector) { return this._parent.querySelector(selector); },
	  querySelectorAll: function(selector) { return this._parent.querySelectorAll(selector); }
	};

	function constant(x) {
	  return function() {
	    return x;
	  };
	}

	function bindIndex(parent, group, enter, update, exit, data) {
	  var i = 0,
	      node,
	      groupLength = group.length,
	      dataLength = data.length;

	  // Put any non-null nodes that fit into update.
	  // Put any null nodes into enter.
	  // Put any remaining data into enter.
	  for (; i < dataLength; ++i) {
	    if (node = group[i]) {
	      node.__data__ = data[i];
	      update[i] = node;
	    } else {
	      enter[i] = new EnterNode(parent, data[i]);
	    }
	  }

	  // Put any non-null nodes that don’t fit into exit.
	  for (; i < groupLength; ++i) {
	    if (node = group[i]) {
	      exit[i] = node;
	    }
	  }
	}

	function bindKey(parent, group, enter, update, exit, data, key) {
	  var i,
	      node,
	      nodeByKeyValue = new Map,
	      groupLength = group.length,
	      dataLength = data.length,
	      keyValues = new Array(groupLength),
	      keyValue;

	  // Compute the key for each node.
	  // If multiple nodes have the same key, the duplicates are added to exit.
	  for (i = 0; i < groupLength; ++i) {
	    if (node = group[i]) {
	      keyValues[i] = keyValue = key.call(node, node.__data__, i, group) + "";
	      if (nodeByKeyValue.has(keyValue)) {
	        exit[i] = node;
	      } else {
	        nodeByKeyValue.set(keyValue, node);
	      }
	    }
	  }

	  // Compute the key for each datum.
	  // If there a node associated with this key, join and add it to update.
	  // If there is not (or the key is a duplicate), add it to enter.
	  for (i = 0; i < dataLength; ++i) {
	    keyValue = key.call(parent, data[i], i, data) + "";
	    if (node = nodeByKeyValue.get(keyValue)) {
	      update[i] = node;
	      node.__data__ = data[i];
	      nodeByKeyValue.delete(keyValue);
	    } else {
	      enter[i] = new EnterNode(parent, data[i]);
	    }
	  }

	  // Add any remaining nodes that were not bound to data to exit.
	  for (i = 0; i < groupLength; ++i) {
	    if ((node = group[i]) && (nodeByKeyValue.get(keyValues[i]) === node)) {
	      exit[i] = node;
	    }
	  }
	}

	function datum(node) {
	  return node.__data__;
	}

	function selection_data(value, key) {
	  if (!arguments.length) return Array.from(this, datum);

	  var bind = key ? bindKey : bindIndex,
	      parents = this._parents,
	      groups = this._groups;

	  if (typeof value !== "function") value = constant(value);

	  for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
	    var parent = parents[j],
	        group = groups[j],
	        groupLength = group.length,
	        data = arraylike(value.call(parent, parent && parent.__data__, j, parents)),
	        dataLength = data.length,
	        enterGroup = enter[j] = new Array(dataLength),
	        updateGroup = update[j] = new Array(dataLength),
	        exitGroup = exit[j] = new Array(groupLength);

	    bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);

	    // Now connect the enter nodes to their following update node, such that
	    // appendChild can insert the materialized enter node before this node,
	    // rather than at the end of the parent node.
	    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
	      if (previous = enterGroup[i0]) {
	        if (i0 >= i1) i1 = i0 + 1;
	        while (!(next = updateGroup[i1]) && ++i1 < dataLength);
	        previous._next = next || null;
	      }
	    }
	  }

	  update = new Selection(update, parents);
	  update._enter = enter;
	  update._exit = exit;
	  return update;
	}

	// Given some data, this returns an array-like view of it: an object that
	// exposes a length property and allows numeric indexing. Note that unlike
	// selectAll, this isn’t worried about “live” collections because the resulting
	// array will only be used briefly while data is being bound. (It is possible to
	// cause the data to change while iterating by using a key function, but please
	// don’t; we’d rather avoid a gratuitous copy.)
	function arraylike(data) {
	  return typeof data === "object" && "length" in data
	    ? data // Array, TypedArray, NodeList, array-like
	    : Array.from(data); // Map, Set, iterable, string, or anything else
	}

	function selection_exit() {
	  return new Selection(this._exit || this._groups.map(sparse), this._parents);
	}

	function selection_join(onenter, onupdate, onexit) {
	  var enter = this.enter(), update = this, exit = this.exit();
	  if (typeof onenter === "function") {
	    enter = onenter(enter);
	    if (enter) enter = enter.selection();
	  } else {
	    enter = enter.append(onenter + "");
	  }
	  if (onupdate != null) {
	    update = onupdate(update);
	    if (update) update = update.selection();
	  }
	  if (onexit == null) exit.remove(); else onexit(exit);
	  return enter && update ? enter.merge(update).order() : update;
	}

	function selection_merge(context) {
	  var selection = context.selection ? context.selection() : context;

	  for (var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
	    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
	      if (node = group0[i] || group1[i]) {
	        merge[i] = node;
	      }
	    }
	  }

	  for (; j < m0; ++j) {
	    merges[j] = groups0[j];
	  }

	  return new Selection(merges, this._parents);
	}

	function selection_order() {

	  for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) {
	    for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
	      if (node = group[i]) {
	        if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
	        next = node;
	      }
	    }
	  }

	  return this;
	}

	function selection_sort(compare) {
	  if (!compare) compare = ascending;

	  function compareNode(a, b) {
	    return a && b ? compare(a.__data__, b.__data__) : !a - !b;
	  }

	  for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
	      if (node = group[i]) {
	        sortgroup[i] = node;
	      }
	    }
	    sortgroup.sort(compareNode);
	  }

	  return new Selection(sortgroups, this._parents).order();
	}

	function ascending(a, b) {
	  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
	}

	function selection_call() {
	  var callback = arguments[0];
	  arguments[0] = this;
	  callback.apply(null, arguments);
	  return this;
	}

	function selection_nodes() {
	  return Array.from(this);
	}

	function selection_node() {

	  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
	    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
	      var node = group[i];
	      if (node) return node;
	    }
	  }

	  return null;
	}

	function selection_size() {
	  let size = 0;
	  for (const node of this) ++size; // eslint-disable-line no-unused-vars
	  return size;
	}

	function selection_empty() {
	  return !this.node();
	}

	function selection_each(callback) {

	  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
	    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
	      if (node = group[i]) callback.call(node, node.__data__, i, group);
	    }
	  }

	  return this;
	}

	function attrRemove(name) {
	  return function() {
	    this.removeAttribute(name);
	  };
	}

	function attrRemoveNS(fullname) {
	  return function() {
	    this.removeAttributeNS(fullname.space, fullname.local);
	  };
	}

	function attrConstant(name, value) {
	  return function() {
	    this.setAttribute(name, value);
	  };
	}

	function attrConstantNS(fullname, value) {
	  return function() {
	    this.setAttributeNS(fullname.space, fullname.local, value);
	  };
	}

	function attrFunction(name, value) {
	  return function() {
	    var v = value.apply(this, arguments);
	    if (v == null) this.removeAttribute(name);
	    else this.setAttribute(name, v);
	  };
	}

	function attrFunctionNS(fullname, value) {
	  return function() {
	    var v = value.apply(this, arguments);
	    if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
	    else this.setAttributeNS(fullname.space, fullname.local, v);
	  };
	}

	function selection_attr(name, value) {
	  var fullname = namespace(name);

	  if (arguments.length < 2) {
	    var node = this.node();
	    return fullname.local
	        ? node.getAttributeNS(fullname.space, fullname.local)
	        : node.getAttribute(fullname);
	  }

	  return this.each((value == null
	      ? (fullname.local ? attrRemoveNS : attrRemove) : (typeof value === "function"
	      ? (fullname.local ? attrFunctionNS : attrFunction)
	      : (fullname.local ? attrConstantNS : attrConstant)))(fullname, value));
	}

	function defaultView(node) {
	  return (node.ownerDocument && node.ownerDocument.defaultView) // node is a Node
	      || (node.document && node) // node is a Window
	      || node.defaultView; // node is a Document
	}

	function styleRemove(name) {
	  return function() {
	    this.style.removeProperty(name);
	  };
	}

	function styleConstant(name, value, priority) {
	  return function() {
	    this.style.setProperty(name, value, priority);
	  };
	}

	function styleFunction(name, value, priority) {
	  return function() {
	    var v = value.apply(this, arguments);
	    if (v == null) this.style.removeProperty(name);
	    else this.style.setProperty(name, v, priority);
	  };
	}

	function selection_style(name, value, priority) {
	  return arguments.length > 1
	      ? this.each((value == null
	            ? styleRemove : typeof value === "function"
	            ? styleFunction
	            : styleConstant)(name, value, priority == null ? "" : priority))
	      : styleValue(this.node(), name);
	}

	function styleValue(node, name) {
	  return node.style.getPropertyValue(name)
	      || defaultView(node).getComputedStyle(node, null).getPropertyValue(name);
	}

	function propertyRemove(name) {
	  return function() {
	    delete this[name];
	  };
	}

	function propertyConstant(name, value) {
	  return function() {
	    this[name] = value;
	  };
	}

	function propertyFunction(name, value) {
	  return function() {
	    var v = value.apply(this, arguments);
	    if (v == null) delete this[name];
	    else this[name] = v;
	  };
	}

	function selection_property(name, value) {
	  return arguments.length > 1
	      ? this.each((value == null
	          ? propertyRemove : typeof value === "function"
	          ? propertyFunction
	          : propertyConstant)(name, value))
	      : this.node()[name];
	}

	function classArray(string) {
	  return string.trim().split(/^|\s+/);
	}

	function classList(node) {
	  return node.classList || new ClassList(node);
	}

	function ClassList(node) {
	  this._node = node;
	  this._names = classArray(node.getAttribute("class") || "");
	}

	ClassList.prototype = {
	  add: function(name) {
	    var i = this._names.indexOf(name);
	    if (i < 0) {
	      this._names.push(name);
	      this._node.setAttribute("class", this._names.join(" "));
	    }
	  },
	  remove: function(name) {
	    var i = this._names.indexOf(name);
	    if (i >= 0) {
	      this._names.splice(i, 1);
	      this._node.setAttribute("class", this._names.join(" "));
	    }
	  },
	  contains: function(name) {
	    return this._names.indexOf(name) >= 0;
	  }
	};

	function classedAdd(node, names) {
	  var list = classList(node), i = -1, n = names.length;
	  while (++i < n) list.add(names[i]);
	}

	function classedRemove(node, names) {
	  var list = classList(node), i = -1, n = names.length;
	  while (++i < n) list.remove(names[i]);
	}

	function classedTrue(names) {
	  return function() {
	    classedAdd(this, names);
	  };
	}

	function classedFalse(names) {
	  return function() {
	    classedRemove(this, names);
	  };
	}

	function classedFunction(names, value) {
	  return function() {
	    (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
	  };
	}

	function selection_classed(name, value) {
	  var names = classArray(name + "");

	  if (arguments.length < 2) {
	    var list = classList(this.node()), i = -1, n = names.length;
	    while (++i < n) if (!list.contains(names[i])) return false;
	    return true;
	  }

	  return this.each((typeof value === "function"
	      ? classedFunction : value
	      ? classedTrue
	      : classedFalse)(names, value));
	}

	function textRemove() {
	  this.textContent = "";
	}

	function textConstant(value) {
	  return function() {
	    this.textContent = value;
	  };
	}

	function textFunction(value) {
	  return function() {
	    var v = value.apply(this, arguments);
	    this.textContent = v == null ? "" : v;
	  };
	}

	function selection_text(value) {
	  return arguments.length
	      ? this.each(value == null
	          ? textRemove : (typeof value === "function"
	          ? textFunction
	          : textConstant)(value))
	      : this.node().textContent;
	}

	function htmlRemove() {
	  this.innerHTML = "";
	}

	function htmlConstant(value) {
	  return function() {
	    this.innerHTML = value;
	  };
	}

	function htmlFunction(value) {
	  return function() {
	    var v = value.apply(this, arguments);
	    this.innerHTML = v == null ? "" : v;
	  };
	}

	function selection_html(value) {
	  return arguments.length
	      ? this.each(value == null
	          ? htmlRemove : (typeof value === "function"
	          ? htmlFunction
	          : htmlConstant)(value))
	      : this.node().innerHTML;
	}

	function raise() {
	  if (this.nextSibling) this.parentNode.appendChild(this);
	}

	function selection_raise() {
	  return this.each(raise);
	}

	function lower() {
	  if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
	}

	function selection_lower() {
	  return this.each(lower);
	}

	function selection_append(name) {
	  var create = typeof name === "function" ? name : creator(name);
	  return this.select(function() {
	    return this.appendChild(create.apply(this, arguments));
	  });
	}

	function constantNull() {
	  return null;
	}

	function selection_insert(name, before) {
	  var create = typeof name === "function" ? name : creator(name),
	      select = before == null ? constantNull : typeof before === "function" ? before : selector(before);
	  return this.select(function() {
	    return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
	  });
	}

	function remove() {
	  var parent = this.parentNode;
	  if (parent) parent.removeChild(this);
	}

	function selection_remove() {
	  return this.each(remove);
	}

	function selection_cloneShallow() {
	  var clone = this.cloneNode(false), parent = this.parentNode;
	  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
	}

	function selection_cloneDeep() {
	  var clone = this.cloneNode(true), parent = this.parentNode;
	  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
	}

	function selection_clone(deep) {
	  return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
	}

	function selection_datum(value) {
	  return arguments.length
	      ? this.property("__data__", value)
	      : this.node().__data__;
	}

	function contextListener(listener) {
	  return function(event) {
	    listener.call(this, event, this.__data__);
	  };
	}

	function parseTypenames(typenames) {
	  return typenames.trim().split(/^|\s+/).map(function(t) {
	    var name = "", i = t.indexOf(".");
	    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
	    return {type: t, name: name};
	  });
	}

	function onRemove(typename) {
	  return function() {
	    var on = this.__on;
	    if (!on) return;
	    for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
	      if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
	        this.removeEventListener(o.type, o.listener, o.options);
	      } else {
	        on[++i] = o;
	      }
	    }
	    if (++i) on.length = i;
	    else delete this.__on;
	  };
	}

	function onAdd(typename, value, options) {
	  return function() {
	    var on = this.__on, o, listener = contextListener(value);
	    if (on) for (var j = 0, m = on.length; j < m; ++j) {
	      if ((o = on[j]).type === typename.type && o.name === typename.name) {
	        this.removeEventListener(o.type, o.listener, o.options);
	        this.addEventListener(o.type, o.listener = listener, o.options = options);
	        o.value = value;
	        return;
	      }
	    }
	    this.addEventListener(typename.type, listener, options);
	    o = {type: typename.type, name: typename.name, value: value, listener: listener, options: options};
	    if (!on) this.__on = [o];
	    else on.push(o);
	  };
	}

	function selection_on(typename, value, options) {
	  var typenames = parseTypenames(typename + ""), i, n = typenames.length, t;

	  if (arguments.length < 2) {
	    var on = this.node().__on;
	    if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
	      for (i = 0, o = on[j]; i < n; ++i) {
	        if ((t = typenames[i]).type === o.type && t.name === o.name) {
	          return o.value;
	        }
	      }
	    }
	    return;
	  }

	  on = value ? onAdd : onRemove;
	  for (i = 0; i < n; ++i) this.each(on(typenames[i], value, options));
	  return this;
	}

	function dispatchEvent(node, type, params) {
	  var window = defaultView(node),
	      event = window.CustomEvent;

	  if (typeof event === "function") {
	    event = new event(type, params);
	  } else {
	    event = window.document.createEvent("Event");
	    if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;
	    else event.initEvent(type, false, false);
	  }

	  node.dispatchEvent(event);
	}

	function dispatchConstant(type, params) {
	  return function() {
	    return dispatchEvent(this, type, params);
	  };
	}

	function dispatchFunction(type, params) {
	  return function() {
	    return dispatchEvent(this, type, params.apply(this, arguments));
	  };
	}

	function selection_dispatch(type, params) {
	  return this.each((typeof params === "function"
	      ? dispatchFunction
	      : dispatchConstant)(type, params));
	}

	function* selection_iterator() {
	  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
	    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
	      if (node = group[i]) yield node;
	    }
	  }
	}

	var root = [null];

	function Selection(groups, parents) {
	  this._groups = groups;
	  this._parents = parents;
	}

	function selection_selection() {
	  return this;
	}

	Selection.prototype = {
	  constructor: Selection,
	  select: selection_select,
	  selectAll: selection_selectAll,
	  selectChild: selection_selectChild,
	  selectChildren: selection_selectChildren,
	  filter: selection_filter,
	  data: selection_data,
	  enter: selection_enter,
	  exit: selection_exit,
	  join: selection_join,
	  merge: selection_merge,
	  selection: selection_selection,
	  order: selection_order,
	  sort: selection_sort,
	  call: selection_call,
	  nodes: selection_nodes,
	  node: selection_node,
	  size: selection_size,
	  empty: selection_empty,
	  each: selection_each,
	  attr: selection_attr,
	  style: selection_style,
	  property: selection_property,
	  classed: selection_classed,
	  text: selection_text,
	  html: selection_html,
	  raise: selection_raise,
	  lower: selection_lower,
	  append: selection_append,
	  insert: selection_insert,
	  remove: selection_remove,
	  clone: selection_clone,
	  datum: selection_datum,
	  on: selection_on,
	  dispatch: selection_dispatch,
	  [Symbol.iterator]: selection_iterator
	};

	function select(selector) {
	  return typeof selector === "string"
	      ? new Selection([[document.querySelector(selector)]], [document.documentElement])
	      : new Selection([[selector]], root);
	}

	class SVGInteractor {
	  /**
	   * A class used to illustrate state of the visualization on the main thread such as
	   * selection or axis.
	   *
	   * @param {SVGElement} svg container for all svg elements
	   */
	  constructor(svg) {
	    this.svg = svg;
	    this.d3SVG = select(this.svg);
	    this.svg.style.width = "100%";
	    this.svg.style.height = "100%";
	    this.svg.style.position = "absolute";
	    this.svg.style.zIndex = "1000";
	    this.svg.style.pointerEvents = "none";
	    this.svg.style.overflow = "visible";

	    this._selectMarker = document.createElementNS(
	      "http://www.w3.org/2000/svg",
	      "polygon"
	    );
	    this._selectMarker.setAttribute("fill", "rgba(124, 124, 247, 0.3)");
	    this._selectMarker.setAttribute("stroke", "rgb(136, 128, 247)");
	    this._selectMarker.setAttribute("stroke-width", 1);
	    this._selectMarker.setAttribute("stroke-dasharray", "5,5");

	    this._labelMarker = document.createElementNS(
	      "http://www.w3.org/2000/svg",
	      "g"
	    );
	  }

	  /**
	   * Set the schema for this class to refer to.
	   *
	   * @param {Object} schema
	   */
	  setSchema(schema) {
	    this.schema = schema;

	    const styles = utilities.getDimAndMarginStyleForSchema(schema);
	    this.svg.style.width = styles.width;
	    this.svg.style.height = styles.height;
	    this.svg.style.margin = styles.margin;

	    this.initialX = undefined; // used for updating labels
	    this.initialY = undefined;
	    select(this._labelMarker).selectAll("*").remove();
	    for (const _ of this.schema.labels || []) {
	      select(this._labelMarker).append("text");
	    }
	  }

	  /**
	   * Add svg elements to the DOM
	   */
	  init() {
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
	   */
	  updateView(currentXRange, currentYRange, width, height) {
	    this.currentXRange = currentXRange;
	    this.currentYRange = currentYRange;
	    this.width = width;
	    this.height = height;

	    if (this.currentXRange) {
	      this.xAxis = this._calculateAxis(
	        "x",
	        this.schema.xAxis,
	        this.schema,
	        utilities.getScaleForSchema("x", this.schema),
	        this.xAxisAnchor
	      );

	      if (this.schema.labels) {
	        this.updateLabels();
	      }
	    }

	    if (this.xAxis) {
	      this.xAxisAnchor.call(this.xAxis);
	    }

	    if (this.currentYRange) {
	      this.yAxis = this._calculateAxis(
	        "y",
	        this.schema.yAxis,
	        this.schema,
	        utilities.getScaleForSchema("y", this.schema),
	        this.yAxisAnchor
	      );
	    }

	    if (this.yAxis) {
	      this.yAxisAnchor.call(this.yAxis);
	    }
	  }

	  updateLabels() {
	    if (!this.initialX && this.schema.labels) {
	      this.initialX = this.schema.labels.map(
	        (label) => this._calculateViewportSpotInverse(label.x, label.y)[0]
	      );
	    }
	    if (!this.initialY && this.schema.labels) {
	      this.initialY = this.schema.labels.map(
	        (label) => this._calculateViewportSpotInverse(label.x, label.y)[1]
	      );
	    }

	    select(this._labelMarker)
	      .selectAll("text")
	      .data(this.schema.labels)
	      .text((d) => d.text)
	      .attr("x", (d, i) => {
	        if (d.fixedX) {
	          return this.initialX[i];
	        }
	        return this._calculateViewportSpotInverse(d.x, d.y)[0];
	      })
	      .attr("y", (d, i) => {
	        if (d.fixedY) {
	          return this.initialY[i];
	        }
	        return this._calculateViewportSpotInverse(d.x, d.y)[1];
	      })
	      .each(function (d) {
	        // Set any possible svg properties specified in label
	        for (const property in d) {
	          if (["x", "y", "text"].includes(property)) {
	            continue;
	          }
	          select(this).attr(property, d[property]);
	        }
	      });
	  }

	  _calculateAxis(dimension, orientation, schema, genomeScale, anchor) {
	    let axis, domain, range;
	    if (dimension === "x") {
	      domain = this.currentXRange;
	      range = [0, this.width];
	      switch (orientation) {
	        case "none":
	          anchor.attr("transform", `translate(-1000000, -1000000)`);
	          return null;
	        case "top":
	          axis = axisTop();
	          anchor.attr("transform", `translate(0, 0)`);
	          break;
	        case "center":
	          axis = axisBottom();
	          anchor.attr("transform", `translate(0, ${this.height / 2})`);
	          break;
	        case "zero":
	          const yScale = linear()
	            .domain(this.currentYRange)
	            .range([this.height, 0]);

	          axis = axisBottom();
	          anchor.attr("transform", `translate(0, ${yScale(0)})`);
	          break;
	        case "bottom":
	        default:
	          axis = axisBottom();
	          anchor.attr("transform", `translate(0, ${this.height})`);
	          break;
	      }
	    }

	    if (dimension === "y") {
	      domain = this.currentYRange;
	      range = [this.height, 0];
	      switch (orientation) {
	        case "none":
	          anchor.attr("transform", `translate(-1000000, -1000000)`);
	          return null;
	        case "center":
	          axis = axisRight();
	          anchor.attr("transform", `translate(${this.width / 2}, 0)`);
	          break;
	        case "right":
	          axis = axisRight();
	          anchor.attr("transform", `translate(${this.width}, 0)`);
	          break;
	        case "zero":
	          const xScale = linear()
	            .domain(this.currentXRange)
	            .range([0, this.width]);

	          axis = axisLeft();
	          anchor.attr("transform", `translate(${xScale(0)}, 0)`);
	          break;
	        case "left": // left is default behavior
	        default:
	          axis = axisLeft();
	          anchor.attr("transform", `translate(0, 0)`);
	          break;
	      }
	    }

	    let genomic = false;
	    for (const track of schema.tracks) {
	      if (track[dimension].type && track[dimension].type.includes("genomic")) {
	        genomic = true;
	      }
	    }

	    if (!genomic) {
	      return axis.scale(linear().domain(domain).range(range));
	    }

	    let tickInfo;
	    if (dimension === "x") {
	      tickInfo = genomeScale.getTickCoordsAndLabels(domain[0], domain[1]);
	    } else {
	      tickInfo = genomeScale.getTickCoordsAndLabels(range[0], range[1]);
	    }

	    return axis
	      .scale(linear().domain(domain).range(range))
	      .tickValues(tickInfo.tickCoords)
	      .tickFormat((_, index) => tickInfo.tickLabels[index]);
	  }

	  /**
	   * Updates user selection view if they have selected a box
	   */
	  _updateBoxSelectView(points) {
	    if (points.length !== 4) {
	      return;
	    }

	    const topLeftCorner = this._calculateViewportSpotInverse(
	      points[0],
	      points[1]
	    );

	    const bottomRightCorner = this._calculateViewportSpotInverse(
	      points[2],
	      points[3]
	    );

	    let pointAttr = `${topLeftCorner[0]},${topLeftCorner[1]} 
                     ${topLeftCorner[0]},${bottomRightCorner[1]}, 
                     ${bottomRightCorner[0]},${bottomRightCorner[1]}
                     ${bottomRightCorner[0]},${topLeftCorner[1]}
                     `;

	    this._selectMarker.setAttribute("points", pointAttr);
	  }

	  /**
	   * Update the selection box/lasso with the points as bounds
	   *
	   * @param {Array} points 1D array of coordinates that are used for selection ex. [x1,y1,x2,y2,...]
	   */
	  updateSelectView(points) {
	    if (points.length === 4) {
	      this._updateBoxSelectView(points);
	      return;
	    }
	    if (points.length < 6) {
	      this._selectMarker.setAttribute("points", "");
	      return;
	    }

	    let pointAttr = "";
	    for (let i = 0; i < points.length; i += 2) {
	      const asCanvasPoint = this._calculateViewportSpotInverse(
	        points[i],
	        points[i + 1]
	      );
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
	   */
	  _calculateViewportSpotInverse(viewportX, viewportY) {
	    const inverseScaleX = utilities.scale(this.currentXRange, [0, this.width]);
	    // Flipped for Y since canvas using typical graphics coordinates but GPU clipspace is typical cartesian coordinates
	    const inverseScaleY = utilities.scale(this.currentYRange, [this.height, 0]);

	    return [inverseScaleX(viewportX), inverseScaleY(viewportY)];
	  }
	}

	/**
	 * event.layerX and event.layerY are deprecated. We will use them if they are on the event, but
	 * if not we will use a manual calculation.
	 *
	 * @param {Event} event
	 * @returns layerX and layerY, coordinates of event with origin at top right corner of bounding box
	 */
	const getLayerXandYFromEvent = (event) => {
	  if (event.layerX !== undefined && event.layerY !== undefined) {
	    return [event.layerX, event.layerY];
	  }
	  const bbox = event.target.getBoundingClientRect();
	  const x = event.clientX - bbox.left;
	  const y = event.clientY - bbox.top;
	  return [x, y];
	};

	class MouseReader {
	  /**
	   *
	   * @param {HTMLElement} element meant to read mouse events, necessary since OffscreenCanvas cannot read DOM events
	   * @param {WebGLVis} handler WebGLVis that is using this mousereader
	   */
	  constructor(element, handler) {
	    this.element = element;
	    this.element.style.position = "absolute";
	    this.element.style.width = "100%";
	    this.element.style.height = "100%";

	    this.handler = handler;

	    this._currentSelectionPoints = [];

	    this.tool = "box";

	    // Initializing elements to show user their current selection
	    this.SVGInteractor = new SVGInteractor(
	      document.createElementNS("http://www.w3.org/2000/svg", "svg")
	    );
	  }

	  /**
	   * Set the schema of the mouse reader and the svg interaction
	   * @param {Object} schema
	   */
	  setSchema(schema) {
	    const styles = utilities.getDimAndMarginStyleForSchema(schema);
	    this.element.style.width = styles.width;
	    this.element.style.height = styles.height;
	    this.element.style.margin = styles.margin;

	    this.viewport = utilities.getViewportForSchema(schema);
	    this.SVGInteractor.setSchema(schema);
	    this._updateSVG();
	  }

	  /**
	   * Set the viewport in the format mouseReader.viewport = [minX, maxX, minY, maxY].
	   * Mostly used to make Scatterplot.setOptions simpler.
	   */
	  set viewport(toSet) {
	    this.minX = toSet[0];
	    this.maxX = toSet[1];
	    this.minY = toSet[2];
	    this.maxY = toSet[3];

	    this.currentXRange = [this.minX, this.maxX];
	    this.currentYRange = [this.minY, this.maxY];
	  }

	  /**
	   * Init the mouse reader by adding its elements to DOM and adding event handlers
	   */
	  init() {
	    this.width = this.element.clientWidth;
	    this.height = this.element.clientHeight;

	    this.element.parentElement.appendChild(this.SVGInteractor.svg);
	    this.SVGInteractor.init();
	    this._updateSVG();

	    this.element.addEventListener("wheel", this._onWheel.bind(this), false);

	    let mouseDown = false;
	    this.element.addEventListener(
	      "mousedown",
	      (event) => {
	        mouseDown = true;
	        switch (this.tool) {
	          case "pan":
	            break;
	          case "box":
	          case "lasso":
	            this._currentSelectionPoints = [
	              ...this._calculateViewportSpot(...getLayerXandYFromEvent(event)),
	            ];
	            break;
	        }
	      },
	      false
	    );

	    this.element.addEventListener(
	      "mousemove",
	      (event) => {
	        if (!mouseDown) {
	          return;
	        }
	        switch (this.tool) {
	          case "pan":
	            this._onPan(event);
	            break;
	          case "box":
	            this._currentSelectionPoints = this._currentSelectionPoints
	              .slice(0, 2)
	              .concat(
	                this._calculateViewportSpot(...getLayerXandYFromEvent(event))
	              );
	            break;
	          case "lasso":
	            this._currentSelectionPoints.push(
	              ...this._calculateViewportSpot(...getLayerXandYFromEvent(event))
	            );
	            break;
	        }
	        this._updateSVG();
	      },
	      false
	    );

	    this.element.addEventListener("mouseup", (event) => {
	      mouseDown = false;
	      switch (this.tool) {
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

	    this.element.addEventListener("mouseleave", () => {
	      switch (this.tool) {
	        case "pan": // Ensures panning does not continue if user leaves canvas
	          mouseDown = false;
	          break;
	      }
	    });
	  }

	  /**
	   * Get current viewport info such as min/max bounds and current ranges
	   *
	   * @returns Current viewport information the mouse reader has calculated
	   */
	  getViewport() {
	    return {
	      minX: this.minX,
	      maxX: this.maxX,
	      minY: this.minY,
	      maxY: this.maxY,
	      xRange: this.currentXRange,
	      yRange: this.currentYRange,
	    };
	  }

	  /**
	   * Method to handle wheel events for zooming in and out of canvas
	   *
	   * @param {WheelEvent} event
	   */
	  _onWheel(event) {
	    event.preventDefault();
	    if (!this.lockedX) {
	      const previousX = [...this.currentXRange]; // ... to avoid aliasing
	      const t = -event.wheelDelta / 1000;
	      const inDataSpace = this._calculateViewportSpot(
	        ...getLayerXandYFromEvent(event)
	      );
	      this.currentXRange[0] =
	        t * inDataSpace[0] + (1 - t) * this.currentXRange[0];

	      this.currentXRange[1] =
	        t * inDataSpace[0] + (1 - t) * this.currentXRange[1];

	      this.currentXRange[0] = Math.max(this.currentXRange[0], this.minX);
	      this.currentXRange[1] = Math.min(this.currentXRange[1], this.maxX);

	      if (!this._validateXRange()) {
	        // Zoom in limit
	        this.currentXRange = previousX;
	      }
	    }

	    if (!this.lockedY) {
	      const previousY = [...this.currentYRange];
	      const t = -event.wheelDelta / 1000;
	      const inDataSpace = this._calculateViewportSpot(
	        ...getLayerXandYFromEvent(event)
	      );

	      this.currentYRange[0] =
	        t * inDataSpace[1] + (1 - t) * this.currentYRange[0];
	      this.currentYRange[1] =
	        t * inDataSpace[1] + (1 - t) * this.currentYRange[1];
	      this.currentYRange[0] = Math.max(this.currentYRange[0], this.minY);
	      this.currentYRange[1] = Math.min(this.currentYRange[1], this.maxY);

	      if (!this._validateYRange()) {
	        // Zoom in limit
	        this.currentYRange = previousY;
	      }
	    }

	    this.handler.sendDrawerState(this.getViewport());
	    this._updateSVG();
	  }

	  /**
	   * Method to handle a clicked mouse moving around canvas to pan around canvas.
	   *
	   * @param {MouseEvent} event from "mousemove" event
	   */
	  _onPan(event) {
	    if (!this.lockedX) {
	      const previousX = [...this.currentXRange]; // ... to avoid aliasing
	      const xDampen = (this.currentXRange[1] - this.currentXRange[0]) / 1000;
	      this.currentXRange[0] -= event.movementX * xDampen;
	      this.currentXRange[1] -= event.movementX * xDampen;
	      this.currentXRange[0] = Math.max(this.currentXRange[0], this.minX);
	      this.currentXRange[1] = Math.min(this.currentXRange[1], this.maxX);

	      if (!this._validateXRange()) {
	        this.currentXRange = previousX;
	      }
	    }

	    if (!this.lockedY) {
	      const previousY = [...this.currentYRange];
	      const yDampen = (this.currentYRange[1] - this.currentYRange[0]) / 1000;
	      this.currentYRange[0] += event.movementY * yDampen;
	      this.currentYRange[1] += event.movementY * yDampen;
	      this.currentYRange[0] = Math.max(this.currentYRange[0], this.minY);
	      this.currentYRange[1] = Math.min(this.currentYRange[1], this.maxY);

	      if (!this._validateYRange()) {
	        this.currentYRange = previousY;
	      }
	    }

	    this.handler.sendDrawerState(this.getViewport());
	    this._updateSVG();
	  }

	  /**
	   * Checks if this.currentXRange is valid with first element less than second
	   * and if viewport zoom is not above webgl max zoom.
	   *
	   * @return true if range is valid, false otherwise
	   */
	  _validateXRange() {
	    return this.currentXRange[1] >= this.currentXRange[0];
	  }

	  /**
	   * Checks if this.currentYRange is valid with first element less than second
	   * and if viewport zoom is not above webgl max zoom.
	   *
	   * @return true if range is valid, false otherwise
	   */
	  _validateYRange() {
	    return this.currentYRange[1] >= this.currentYRange[0];
	  }

	  /**
	   * Updates the DOM component used to show user selection or axis.
	   * Calls methods from SVGInteractor.
	   */
	  _updateSVG() {
	    this.SVGInteractor.updateView(
	      this.currentXRange,
	      this.currentYRange,
	      this.width,
	      this.height
	    );
	    this.SVGInteractor.updateSelectView(this._currentSelectionPoints);
	  }

	  /**
	   * Executes when user has confirmed selection points (typically by releasing mouse)
	   */
	  _onSelect() {
	    this.handler.selectPoints(this._currentSelectionPoints);
	  }

	  /**
	   * Calculate the location on the real coordinate space a point on the canvas corresponds to.
	   *
	   * @param {Float} canvasX likely from event.layerX or getLayerXandYFromEvent
	   * @param {Float} canvasY likely from event.layerY or getLayerXandYFromEvent
	   * @returns viewport coordinate as array
	   */
	  _calculateViewportSpot(canvasX, canvasY) {
	    const scaleX = utilities.scale([0, this.width], this.currentXRange);
	    // Flipped for Y since canvas using typical graphics coordinates but GPU clipspace is typical cartesian coordinates
	    const scaleY = utilities.scale([this.height, 0], this.currentYRange);
	    return [scaleX(canvasX), scaleY(canvasY)];
	  }
	}

	class WebGLVis {
	  POSSIBLE_MOUSE_READER_OPTIONS = Object.freeze([
	    "lockedX",
	    "lockedY",
	    "tool",
	    "viewport",
	    "currentXRange",
	    "currentYRange",
	  ]);

	  /**
	   * A class meant to display a visualization based off a given schema using webgl.
	   *
	   * @param {HTMLElement} container <div> or other container element meant to contain the visualization and its mousereader
	   */
	  constructor(container) {
	    this.container = container;
	    this.mouseReader = new MouseReader(document.createElement("div"), this);

	    this.parent = document.createElement("div");
	    this.parent.style.position = "relative";
	    this.parent.style.width = "100%";
	    this.parent.style.height = "100%";
	    this.parent.style.overflow = "hidden";

	    this.canvas = document.createElement("canvas");
	    this.canvas.style.width = "100%";
	    this.canvas.style.height = "100%";
	  }

	  /**
	   * Resize the canvas to a particular size and rerender the data
	   *
	   * @param {Number} width in pixels to resize the canvas to
	   * @param {Number} height in pixels to resize the canvas to
	   */
	  setCanvasSize(width, height) {
	    this.webglWorker.postMessage({
	      type: "resize",
	      width,
	      height,
	    });

	    this.canvas.style.width = width;
	    this.canvas.style.height = height;
	    this.mouseReader.width = width;
	    this.mouseReader.height = height;
	    this.sendDrawerState(this.mouseReader.getViewport());
	  }

	  /**
	   * This method does three things, and should only be called once. If changing the schema
	   * use setSchema.
	   *  1. Add the canvas and mousereader to the DOM for use.
	   *  2. Creates the WebWorkers that render and process the data.
	   *  3. Exposes the messages the webworkers send back to the main thread under this.dataWorkerStream
	   */
	  addToDom() {
	    this.container.appendChild(this.parent);
	    this.parent.appendChild(this.canvas);
	    this.parent.appendChild(this.mouseReader.element);

	    const canvasBox = this.canvas.getBoundingClientRect();
	    this.width = this.parent.clientWidth;
	    this.height = this.parent.clientHeight;
	    this.canvas.width = canvasBox.width;
	    this.canvas.height = canvasBox.height;

	    this.canvas.style.position = "absolute";

	    this.initFpsmeter();

	    const offscreenCanvas = this.canvas.transferControlToOffscreen();

	    this.webglWorker = new Worker(new URL("offscreen-webgl-worker-6914cca9.js", module.uri));
	    this.webglWorker.postMessage(
	      {
	        type: "init",
	        canvas: offscreenCanvas,
	      },
	      [offscreenCanvas]
	    );

	    // Allow OffScreenWebGLDrawer to tick FPS meter
	    this.webglWorker.onmessage = (e) => {
	      if (e.data.type === "tick") {
	        this.meter.tick();
	      }
	    };

	    this.dataWorkerStream = [];
	    this.dataWorker = new Worker(new URL("data-processor-worker-8a315c5a.js", module.uri));
	    this.dataWorker.onmessage = (message) => {
	      this.dataWorkerStream.push(message);
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
	   */
	  setViewOptions(options) {
	    for (const option of this.POSSIBLE_MOUSE_READER_OPTIONS) {
	      if (option in options) {
	        this.mouseReader[option] = options[option];
	      }
	    }
	    this.sendDrawerState(this.mouseReader.getViewport());
	  }

	  _setMargins(schema) {
	    const styles = utilities.getDimAndMarginStyleForSchema(schema);
	    this.canvas.style.width = styles.width;
	    this.canvas.style.height = styles.height;
	    this.canvas.style.margin = styles.margin;

	    const canvasBox = this.canvas.getBoundingClientRect();
	    this.setCanvasSize(canvasBox.width, canvasBox.height);
	  }

	  /**
	   * Set the schema of the visualization, and then render it.
	   *
	   * @param {Object} schema describing visualization
	   * @returns boolean on whether the schema was accepted
	   */
	  setSchema(schema) {
	    // if (!isJSONValid(schema)) {
	    //   return false;
	    // }

	    this._setMargins(schema);
	    this.mouseReader.setSchema(schema);
	    this.sendDrawerState(this.mouseReader.getViewport());
	    this.webglWorker.postMessage({ type: "schema", schema });
	    this.dataWorker.postMessage({ type: "init", schema });
	    return true;
	  }

	  /**
	   * Send the viewport to the drawer. Use setViewOptions to change the viewport.
	   *
	   * @param {Object} viewport likely from this.mouseReader.getViewport()
	   */
	  sendDrawerState(viewport) {
	    this.webglWorker.postMessage({ type: "viewport", ...viewport });
	  }

	  /**
	   * Calls render in the drawer.
	   */
	  forceDrawerRender() {
	    this.webglWorker.postMessage({
	      type: "render",
	      ...this.mouseReader.getViewport(),
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
	   */
	  selectPoints(points) {
	    if (points.length === 4) {
	      this.dataWorker.postMessage({ type: "selectBox", points });
	    } else if (points.length >= 6) {
	      this.dataWorker.postMessage({ type: "selectLasso", points });
	    }
	  }

	  /**
	   * Utility method to have data worker call {@link DataProcessor#getClosestPoint}.
	   * Does not return, posts result to this.dataWorkerStream.
	   *
	   * @param {Array} point to get closest point to
	   */
	  getClosestPoint(point) {
	    this.dataWorker.postMessage({ type: "getClosestPoint", point });
	  }

	  /**
	   * Initializes the FPS meter.
	   */
	  initFpsmeter() {
	    this.meter = new window.FPSMeter(document.querySelector("footer"), {
	      graph: 1,
	      heat: 1,
	      theme: "light",
	      history: 25,
	      top: "-20px",
	      left: `${this.width / 2}px`,
	      transform: "translateX(-100%)",
	    });
	  }
	}

	exports.WebGLVis = WebGLVis;

	Object.defineProperty(exports, '__esModule', { value: true });

});
