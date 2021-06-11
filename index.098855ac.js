(function () {
  var $parcel$global = typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : {};
  var parcelRequire = $parcel$global.parcelRequire3582;
  var $467f05d4fa8d08894f84e9cd2c03a15c$init = parcelRequire("291vL");
  // ASSET: node_modules/@parcel/runtime-js/lib/JSRuntime.js
  var $130090a131e2a6023ad2885012dee0e5$exports = {};
  // ASSET: node_modules/@parcel/runtime-js/lib/bundle-manifest.js
  var $7d806a7a603c235ec027b73d847f4d95$exports, $7d806a7a603c235ec027b73d847f4d95$var$mapping, $7d806a7a603c235ec027b73d847f4d95$export$register, $7d806a7a603c235ec027b73d847f4d95$export$resolve, $7d806a7a603c235ec027b73d847f4d95$executed = false;
  function $7d806a7a603c235ec027b73d847f4d95$var$register(pairs) {
    var keys = Object.keys(pairs);
    for (var i = 0; i < keys.length; i++) {
      $7d806a7a603c235ec027b73d847f4d95$var$mapping[keys[i]] = pairs[keys[i]];
    }
  }
  function $7d806a7a603c235ec027b73d847f4d95$var$resolve(id) {
    var resolved = $7d806a7a603c235ec027b73d847f4d95$var$mapping[id];
    if (resolved == null) {
      throw new Error('Could not resolve bundle with id ' + id);
    }
    return resolved;
  }
  function $7d806a7a603c235ec027b73d847f4d95$exec() {
    $7d806a7a603c235ec027b73d847f4d95$exports = {};
    $7d806a7a603c235ec027b73d847f4d95$var$mapping = {};
    $7d806a7a603c235ec027b73d847f4d95$export$register = $7d806a7a603c235ec027b73d847f4d95$var$register;
    $7d806a7a603c235ec027b73d847f4d95$exports.register = $7d806a7a603c235ec027b73d847f4d95$export$register;
    $7d806a7a603c235ec027b73d847f4d95$export$resolve = $7d806a7a603c235ec027b73d847f4d95$var$resolve;
    $7d806a7a603c235ec027b73d847f4d95$exports.resolve = $7d806a7a603c235ec027b73d847f4d95$export$resolve;
  }
  function $7d806a7a603c235ec027b73d847f4d95$init() {
    if (!$7d806a7a603c235ec027b73d847f4d95$executed) {
      $7d806a7a603c235ec027b73d847f4d95$executed = true;
      $7d806a7a603c235ec027b73d847f4d95$exec();
    }
    return $7d806a7a603c235ec027b73d847f4d95$exports;
  }
  $7d806a7a603c235ec027b73d847f4d95$init().register(JSON.parse("{\"2G4ko\":\"index.098855ac.js\",\"7qO9F\":\"offscreen-webgl-worker.de52ed19.js\",\"4zqLQ\":\"data-processor-worker.4682cc01.js\",\"1NeRs\":\"index.dc12603f.js\"}"));
  /*!
  * FPSMeter 0.3.1 - 9th May 2013
  * https://github.com/Darsain/fpsmeter
  *
  * Licensed under the MIT license.
  * http://opensource.org/licenses/MIT
  */
  ;
  (function (w, undefined) {
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
      return args.length > 2 ? extend.apply(null, [args[0]].concat(Array.prototype.slice.call(args, 2))) : args[0];
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
    })();
    // Local WindowAnimationTiming interface polyfill
    var cAF = w.cancelAnimationFrame || w.cancelRequestAnimationFrame;
    var rAF = w.requestAnimationFrame;
    (function () {
      var vendors = ['moz', 'webkit', 'o'];
      var lastTime = 0;
      // For a more accurate WindowAnimationTiming interface implementation, ditch the native
      // requestAnimationFrame when cancelAnimationFrame is not present (older versions of Firefox)
      for (var i = 0, l = vendors.length; i < l && !cAF; ++i) {
        cAF = w[vendors[i] + 'CancelAnimationFrame'] || w[vendors[i] + 'CancelRequestAnimationFrame'];
        rAF = cAF && w[vendors[i] + 'RequestAnimationFrame'];
      }
      if (!cAF) {
        rAF = function (callback) {
          var currTime = getTime();
          var timeToCall = Math.max(0, 16 - (currTime - lastTime));
          lastTime = currTime + timeToCall;
          return w.setTimeout(function () {
            callback(currTime + timeToCall);
          }, timeToCall);
        };
        cAF = function (id) {
          clearTimeout(id);
        };
      }
    })();
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
      if (type(anchor) === 'object' && anchor.nodeType === undefined) {
        options = anchor;
        anchor = document.body;
      }
      if (!anchor) {
        anchor = document.body;
      }
      // Private properties
      var self = this;
      var o = extend({}, FPSMeter.defaults, options || ({}));
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
        for (i = o.history; i--; ) {
          fpsHistory[i] = i === 0 ? self.fps : fpsHistory[i - 1];
          durationHistory[i] = i === 0 ? self.duration : durationHistory[i - 1];
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
        return heatmaps[0 | heatmap][Math.round(Math.min((value - min) / (max - min) * heatDepth, heatDepth))];
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
            for (i = heating.length; i--; ) {
              heating[i].el.style[theme[heating[i].name].heatOn] = showFps ? getHeat(theme[heating[i].name].heatmap, self.fps, 0, o.maxFps) : getHeat(theme[heating[i].name].heatmap, self.duration, o.threshold, 0);
            }
          }
          if (el.graph && theme.column.heatOn) {
            for (i = cols.length; i--; ) {
              cols[i].style[theme.column.heatOn] = showFps ? getHeat(theme.column.heatmap, fpsHistory[i], 0, o.maxFps) : getHeat(theme.column.heatmap, durationHistory[i], o.threshold, 0);
            }
          }
        }
        // Update graph columns height
        if (el.graph) {
          for (j = 0; j < o.history; j++) {
            cols[j].style.height = (showFps ? fpsHistory[j] ? Math.round(graphHeight / o.maxFps * Math.min(fpsHistory[j], o.maxFps)) : 0 : durationHistory[j] ? Math.round(graphHeight / o.threshold * Math.min(durationHistory[j], o.threshold)) : 0) + 'px';
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
          el.graph.style.width = o.history * theme.column.width + (o.history - 1) * theme.column.spacing + 'px';
          // Add columns
          for (i = 0; i < o.history; i++) {
            cols[i] = el.graph.appendChild(applyTheme(newEl('div'), theme.column));
            cols[i].style.position = 'absolute';
            cols[i].style.bottom = 0;
            cols[i].style.right = i * theme.column.width + i * theme.column.spacing + 'px';
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
      })();
    }
    // Expose the extend function
    FPSMeter.extend = extend;
    // Expose the FPSMeter class
    window.FPSMeter = FPSMeter;
    // Default options
    FPSMeter.defaults = {
      interval: 100,
      // Update interval in milliseconds.
      smoothing: 10,
      // Spike smoothing strength. 1 means no smoothing.
      show: 'fps',
      // Whether to show 'fps', or 'ms' = frame duration in milliseconds.
      toggleOn: 'click',
      // Toggle between show 'fps' and 'ms' on this event.
      decimals: 1,
      // Number of decimals in FPS number. 1 = 59.9, 2 = 59.94, ...
      maxFps: 60,
      // Max expected FPS value.
      threshold: 100,
      // Minimal tick reporting interval in milliseconds.
      // Meter position
      position: 'absolute',
      // Meter position.
      zIndex: 10,
      // Meter Z index.
      left: '5px',
      // Meter left offset.
      top: '5px',
      // Meter top offset.
      right: 'auto',
      // Meter right offset.
      bottom: 'auto',
      // Meter bottom offset.
      margin: '0 0 0 0',
      // Meter margin. Helps with centering the counter when left: 50%;
      // Theme
      theme: 'dark',
      // Meter theme. Build in: 'dark', 'light', 'transparent', 'colorful'.
      heat: 0,
      // Allow themes to use coloring by FPS heat. 0 FPS = red, maxFps = green.
      // Graph
      graph: 0,
      // Whether to show history graph.
      history: 20
    };
    // Option names that trigger FPSMeter rebuild or reposition when modified
    var rebuilders = ['toggleOn', 'theme', 'heat', 'graph', 'history'];
    var repositioners = ['position', 'zIndex', 'left', 'top', 'right', 'bottom', 'margin'];
  })(window);
  ;
  (function (w, FPSMeter, undefined) {
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
  })(window, FPSMeter);
  $467f05d4fa8d08894f84e9cd2c03a15c$init();
  function $aa6955df6e83d0bfaadb4927ac8c0161$export$scale(domain, range) {
    const domainLength = domain[1] - domain[0];
    const rangeLength = range[1] - range[0];
    const slope = rangeLength / domainLength;
    const intercept = range[1] - slope * domain[1];
    return x => slope * x + intercept;
  }
  function $aa6955df6e83d0bfaadb4927ac8c0161$export$loadShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(`Could not compile shader: ${gl.getShaderInfoLog(shader)}`);
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }
  function $aa6955df6e83d0bfaadb4927ac8c0161$export$initShaderProgram(gl, vertexSource, fragmentSource) {
    const vertexShader = $aa6955df6e83d0bfaadb4927ac8c0161$export$loadShader(gl, gl.VERTEX_SHADER, vertexSource);
    const fragmentShader = $aa6955df6e83d0bfaadb4927ac8c0161$export$loadShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      console.error(`Unable to initialize the shader program: ${gl.getProgramInfoLog(shaderProgram)}`);
      return null;
    }
    return shaderProgram;
  }
  function $aa6955df6e83d0bfaadb4927ac8c0161$var$componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  function $aa6955df6e83d0bfaadb4927ac8c0161$export$rgbToHex(r, g, b) {
    return parseInt(Number("0x" + $aa6955df6e83d0bfaadb4927ac8c0161$var$componentToHex(r) + $aa6955df6e83d0bfaadb4927ac8c0161$var$componentToHex(g) + $aa6955df6e83d0bfaadb4927ac8c0161$var$componentToHex(b)), 10);
  }
  class $c847e5d8c8a0e5cb080c1cacabba3749$export$default {
    constructor(element, toolbar, messenger) {
      this.element = element;
      this.toolbar = toolbar;
      this.messenger = messenger;
      this.minX = -10;
      this.maxX = 10;
      this.minY = -10;
      this.maxY = 10;
      this.currentXRange = [-10, 10];
      this.currentYRange = [-10, 10];
      this._boxSelectMarker = document.getElementById("box-select");
      this._lassoSelectMarker = document.getElementById("lasso-select");
      this._lassoSelectContainer = document.getElementById("lasso-select-container");
      this._currentSelectionPoints = [];
    }
    init() {
      this.width = this.element.getBoundingClientRect().width;
      this.height = this.element.getBoundingClientRect().height;
      this._lassoSelectContainer.setAttribute("width", this.width);
      this._lassoSelectContainer.setAttribute("height", this.height);
      this.element.addEventListener("wheel", this._onWheel.bind(this), false);
      let mouseDown = false;
      this.element.addEventListener("mousedown", event => {
        mouseDown = true;
        switch (this.toolbar.mouseAction) {
          case "pan":
            break;
          case "box":
          case "lasso":
            this._currentSelectionPoints = this._calculateViewportSpot(event.layerX, event.layerY);
            break;
        }
      }, false);
      this.element.addEventListener("mousemove", event => {
        if (!mouseDown) {
          return;
        }
        switch (this.toolbar.mouseAction) {
          case "pan":
            this._onPan(event);
            this._updateBoxSelectView();
            this._updateLassoSelectView();
            break;
          case "box":
            this._currentSelectionPoints = this._currentSelectionPoints.slice(0, 2).concat(this._calculateViewportSpot(event.layerX, event.layerY));
            this._updateBoxSelectView();
            break;
          case "lasso":
            this._currentSelectionPoints.push(...this._calculateViewportSpot(event.layerX, event.layerY));
            this._updateLassoSelectView();
            break;
        }
      }, false);
      this.element.addEventListener("mouseup", event => {
        mouseDown = false;
        switch (this.toolbar.mouseAction) {
          case "pan":
            break;
          case "box":
            if (this._currentSelectionPoints.length !== 4) {
              this._currentSelectionPoints = [];
              this._updateBoxSelectView();
              return;
            }
            this._onBoxSelect();
            break;
          case "lasso":
            if (this._currentSelectionPoints.length < 6) {
              this._currentSelectionPoints = [];
              this._updateLassoSelectView();
              return;
            }
            this._onLassoSelect();
            break;
        }
      });
      this.element.addEventListener("mouseleave", () => {
        switch (this.toolbar.mouseAction) {
          case "pan":
            this._isPanning = false;
            break;
          case "box":
            break;
          case "lasso":
            break;
        }
      });
    }
    _onWheel(event) {
      event.preventDefault();
      if (!this.toolbar.lockedX) {
        const previousX = [...this.currentXRange];
        // ... to avoid aliasing
        this.currentXRange[0] -= event.wheelDelta / 500;
        this.currentXRange[1] += event.wheelDelta / 500;
        this.currentXRange[0] = Math.max(this.currentXRange[0], this.minX);
        this.currentXRange[1] = Math.min(this.currentXRange[1], this.maxX);
        if (this.currentXRange[1] < this.currentXRange[0]) {
          // Zoom in limit
          this.currentXRange = previousX;
        }
      }
      if (!this.toolbar.lockedY) {
        const previousY = [...this.currentYRange];
        this.currentYRange[0] -= event.wheelDelta / 500;
        this.currentYRange[1] += event.wheelDelta / 500;
        this.currentYRange[0] = Math.max(this.currentYRange[0], this.minY);
        this.currentYRange[1] = Math.min(this.currentYRange[1], this.maxY);
        if (this.currentYRange[1] < this.currentYRange[0]) {
          // Zoom in limit
          this.currentYRange = previousY;
        }
      }
      this.toolbar.updateSelectionWindowDisplay(this.currentXRange, this.currentYRange);
      this.messenger({
        type: "viewport",
        viewport: this.getViewport()
      });
      this._updateBoxSelectView();
      this._updateLassoSelectView();
      return false;
    }
    _onPan(event) {
      if (!this.toolbar.lockedX) {
        const previousX = [...this.currentXRange];
        // ... to avoid aliasing
        this.currentXRange[0] -= event.movementX / 50;
        this.currentXRange[1] -= event.movementX / 50;
        this.currentXRange[0] = Math.max(this.currentXRange[0], this.minX);
        this.currentXRange[1] = Math.min(this.currentXRange[1], this.maxX);
        if (this.currentXRange[1] < this.currentXRange[0]) {
          this.currentXRange = previousX;
        }
      }
      if (!this.toolbar.lockedY) {
        const previousY = [...this.currentYRange];
        this.currentYRange[0] += event.movementY / 50;
        this.currentYRange[1] += event.movementY / 50;
        this.currentYRange[0] = Math.max(this.currentYRange[0], this.minY);
        this.currentYRange[1] = Math.min(this.currentYRange[1], this.maxY);
        if (this.currentYRange[1] < this.currentYRange[0]) {
          this.currentYRange = previousY;
        }
      }
      this.messenger({
        type: "viewport",
        viewport: this.getViewport()
      });
      this.toolbar.updateSelectionWindowDisplay(this.currentXRange, this.currentYRange);
    }
    _updateBoxSelectView() {
      if (this._currentSelectionPoints.length !== 4) {
        // Clicked away selection box
        this._boxSelectMarker.style.left = "-100px";
        this._boxSelectMarker.style.top = "-100px";
        this._boxSelectMarker.style.width = "0";
        this._boxSelectMarker.style.height = "0";
        return;
      }
      const boundingRect = this.element.getBoundingClientRect();
      const canvasTopLeft = this._calculateViewportSpotInverse(this._currentSelectionPoints[0], this._currentSelectionPoints[1]);
      const canvasBottomRight = this._calculateViewportSpotInverse(this._currentSelectionPoints[2], this._currentSelectionPoints[3]);
      const width = canvasBottomRight[0] - canvasTopLeft[0];
      const height = canvasBottomRight[1] - canvasTopLeft[1];
      // Check if user drags from bottom right to top left
      if (width < 0) {
        this._boxSelectMarker.style.left = `${boundingRect.left + canvasTopLeft[0] + width}px`;
      } else {
        this._boxSelectMarker.style.left = `${boundingRect.left + canvasTopLeft[0]}px`;
      }
      if (height < 0) {
        this._boxSelectMarker.style.top = `${boundingRect.top + canvasTopLeft[1] + height}px`;
      } else {
        this._boxSelectMarker.style.top = `${boundingRect.top + canvasTopLeft[1]}px`;
      }
      this._boxSelectMarker.style.width = `${Math.abs(width)}px`;
      this._boxSelectMarker.style.height = `${Math.abs(height)}px`;
    }
    _updateLassoSelectView() {
      if (this._currentSelectionPoints.length < 6) {
        // Clicked away selection box
        this._lassoSelectMarker.style.left = "-100px";
        this._lassoSelectMarker.style.top = "-100px";
        this._lassoSelectMarker.style.width = "0";
        this._lassoSelectMarker.style.height = "0";
        return;
      }
      const boundingRect = this.element.getBoundingClientRect();
      this._lassoSelectContainer.style.top = boundingRect.top;
      this._lassoSelectContainer.style.left = boundingRect.left;
      let pointAttr = "";
      for (let i = 0; i < this._currentSelectionPoints.length; i += 2) {
        const asCanvasPoint = this._calculateViewportSpotInverse(this._currentSelectionPoints[i], this._currentSelectionPoints[i + 1]);
        pointAttr += `${asCanvasPoint[0]}, ${asCanvasPoint[1]} `;
      }
      this._lassoSelectMarker.setAttribute("points", pointAttr);
    }
    _onBoxSelect() {
      this.messenger({
        type: "selectBox",
        points: this._currentSelectionPoints
      });
    }
    _onLassoSelect() {
      this.messenger({
        type: "selectLasso",
        points: this._currentSelectionPoints
      });
    }
    _calculateViewportSpot(canvasX, canvasY) {
      const scaleX = $aa6955df6e83d0bfaadb4927ac8c0161$export$scale([0, this.width], this.currentXRange);
      // Flipped for Y since canvas using typical graphics coordinates but GPU clipspace is typical cartesian coordinates
      const scaleY = $aa6955df6e83d0bfaadb4927ac8c0161$export$scale([this.height, 0], this.currentYRange);
      return [scaleX(canvasX), scaleY(canvasY)];
    }
    _calculateViewportSpotInverse(viewportX, viewportY) {
      const inverseScaleX = $aa6955df6e83d0bfaadb4927ac8c0161$export$scale(this.currentXRange, [0, this.width]);
      // Flipped for Y since canvas using typical graphics coordinates but GPU clipspace is typical cartesian coordinates
      const inverseScaleY = $aa6955df6e83d0bfaadb4927ac8c0161$export$scale(this.currentYRange, [this.height, 0]);
      return [inverseScaleX(viewportX), inverseScaleY(viewportY)];
    }
    getViewport() {
      return {
        minX: this.minX,
        maxX: this.maxX,
        minY: this.minY,
        maxY: this.maxY,
        currentXRange: this.currentXRange,
        currentYRange: this.currentYRange
      };
    }
  }
  class $6dc79c72ef61eb6c561660779a5c5001$export$default {
    constructor(messenger) {
      this.messenger = messenger;
      this.lockedX = false;
      this.lockedY = false;
      this.mouseAction = "pan";
      this.dataset = "tsne-10";
    }
    init() {
      document.getElementById("lock-x").addEventListener("change", event => {
        this.lockedX = event.target.checked;
      });
      document.getElementById("lock-y").addEventListener("change", event => {
        this.lockedY = event.target.checked;
      });
      document.getElementById("dataset").value = this.dataset;
      this.messenger({
        type: "load",
        path: this.determineDatasetPath(this.dataset)
      });
      document.getElementById("dataset").addEventListener("change", event => {
        this.dataset = event.target.value;
        this.messenger({
          type: "load",
          path: this.determineDatasetPath(this.dataset)
        });
      });
      this.prevIcon = null;
      // force only 1 icon to have selected class
      document.querySelectorAll(".controls img").forEach(icon => {
        icon.addEventListener("click", () => {
          // useless hack to save lines of code
          if (this.prevIcon) {
            this.prevIcon.classList.remove("selected");
          }
          this.mouseAction = icon.alt.substring(0, icon.alt.indexOf(" "));
          icon.classList.add("selected");
          this.prevIcon = icon;
        });
      });
    }
    updateSelectionWindowDisplay(currentXRange, currentYRange) {
      // This may slow down the rendering since it needs to call the DOM before animating, may need to remove for true benchmark
      document.querySelector(".selection-window").textContent = `[${currentXRange[0].toFixed(2)}, ${currentXRange[1].toFixed(2)}] x [${currentYRange[0].toFixed(2)}, ${currentYRange[1].toFixed(2)}]`;
    }
    determineDatasetPath(dataset) {
      switch (dataset) {
        case "tsne":
          return "data/tsne.csv";
        case "tsne-10":
          return "data/tsne_tenth.csv";
        case "tsne-100":
          return "data/tsne_hundreth.csv";
        default:
          console.error(`Did not recognize dataset: ${dataset}`);
      }
    }
  }
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
  class $5124541c529047bb644d4801a8d7036d$export$default {
    constructor() {
      this.content = document.querySelector(".rendering-container");
      this.canvas = document.createElement("canvas");
      this.width = Math.min(this.content.clientWidth, 1000);
      this.height = this.content.clientHeight * 0.9;
      // needs to match CSS canvas height
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      // Very poor state management here, best to use redux or flux
      this.toolbar = new $6dc79c72ef61eb6c561660779a5c5001$export$default(this.handleMessage.bind(this));
      this.mouseReader = new $c847e5d8c8a0e5cb080c1cacabba3749$export$default(this.canvas, this.toolbar, this.handleMessage.bind(this));
      this.initFpsmeter();
      this.toolbar.init();
    }
    addToDOM(Drawer, extraArgs) {
      this.drawer = new Drawer({
        canvas: this.canvas,
        ...this.mouseReader.getViewport()
      }, extraArgs);
      // Set tick for fps meter, allows drawer to have no knowledge of handler
      this.drawer.tick = () => this.meter.tick();
      this.content.appendChild(this.canvas);
      this.mouseReader.init();
    }
    initFpsmeter() {
      this.meter = new window.FPSMeter(document.querySelector("footer"), {
        graph: 1,
        heat: 1,
        theme: "light",
        history: 25,
        top: "-20px",
        left: `${this.width}px`,
        transform: "translateX(-100%)"
      });
    }
    loadCsv(path) {
      $9a6acbaf99b7f614537e1f05bbe68696$exports.get(path).then(response => {
        this.buildDataProcessor(response.data);
        this.clearDrawerBuffers();
        this.sendToDrawerBuffer(response.data);
        this.forceDrawerRender();
      });
    }
    handleMessage(message) {
      switch (message.type) {
        case "load":
          this.loadCsv(message.path);
          break;
        case "viewport":
          this.sendDrawerState(message.viewport);
          break;
        case "selectBox":
          this.selectPoints(message.points);
          break;
        case "selectLasso":
          this.selectPoints(message.points);
          break;
      }
    }
    sendDrawerState(viewport) {
      this.drawer.receiveState({
        ...viewport
      });
    }
    forceDrawerRender() {
      this.drawer.render({
        ...this.mouseReader.getViewport()
      });
    }
    sendToDrawerBuffer(responseData) {
      this.drawer.populateBuffers(responseData);
    }
    clearDrawerBuffers() {
      this.drawer.clearBuffers();
    }
    buildDataProcessor(data) {
      this.dataProcessor = new ($467f05d4fa8d08894f84e9cd2c03a15c$init().default)(data);
    }
    selectPoints(points) {
      if (points.length === 4) {
        this.dataProcessor.selectBox(points);
      } else if (points.length >= 6) {
        this.dataProcessor.selectLasso(points);
      }
    }
  }
  class $2f702dda7315dfb6504d1f8040bf1571$export$default extends $5124541c529047bb644d4801a8d7036d$export$default {
    constructor() {
      super();
      // Create a div for reading mouse events
      this.mouseReader = new $c847e5d8c8a0e5cb080c1cacabba3749$export$default(document.createElement("div"), this.toolbar, this.handleMessage.bind(this));
      // Ensure div is directly on top of canvas
      this.canvas.style.position = "absolute";
      this.mouseReader.element.id = "mouse-reader";
    }
    addToDOM(worker, dataWorker) {
      this.content.appendChild(this.canvas);
      this.content.appendChild(this.mouseReader.element);
      // Reinit controls with new mouse reader
      this.mouseReader.init();
      this.offscreenCanvas = this.canvas.transferControlToOffscreen();
      this.worker = worker;
      this.worker.postMessage({
        type: "init",
        canvas: this.offscreenCanvas,
        ...this.mouseReader.getViewport()
      }, [this.offscreenCanvas]);
      this.worker.onmessage = e => {
        if (e.data.type === "tick") {
          this.meter.tick();
        }
      };
      this.dataWorker = dataWorker;
    }
    sendDrawerState(viewport) {
      this.worker.postMessage({
        type: "state",
        ...viewport
      });
    }
    forceDrawerRender() {
      this.worker.postMessage({
        type: "render",
        ...this.mouseReader.getViewport()
      });
    }
    sendToDrawerBuffer(responseData) {
      this.worker.postMessage({
        type: "buffer",
        responseData
      });
    }
    clearDrawerBuffers() {
      this.worker.postMessage({
        type: "clearBuffers"
      });
    }
    buildDataProcessor(data) {
      this.dataWorker.postMessage({
        type: "init",
        data
      });
    }
    selectPoints(points) {
      if (points.length === 4) {
        this.dataWorker.postMessage({
          type: "selectBox",
          points
        });
      } else if (points.length >= 6) {
        this.dataWorker.postMessage({
          type: "selectLasso",
          points
        });
      }
    }
  }
  // ASSET: node_modules/@parcel/runtime-js/lib/bundle-url.js
  var $634f916bc30b7d6650877f3f4b6a8b3a$exports, $634f916bc30b7d6650877f3f4b6a8b3a$var$bundleURL, $634f916bc30b7d6650877f3f4b6a8b3a$export$getBundleURL, $634f916bc30b7d6650877f3f4b6a8b3a$export$getOrigin, $634f916bc30b7d6650877f3f4b6a8b3a$executed = false;
  function $634f916bc30b7d6650877f3f4b6a8b3a$var$getBundleURLCached() {
    if (!$634f916bc30b7d6650877f3f4b6a8b3a$var$bundleURL) {
      $634f916bc30b7d6650877f3f4b6a8b3a$var$bundleURL = $634f916bc30b7d6650877f3f4b6a8b3a$var$getBundleURL();
    }
    return $634f916bc30b7d6650877f3f4b6a8b3a$var$bundleURL;
  }
  function $634f916bc30b7d6650877f3f4b6a8b3a$var$getBundleURL() {
    try {
      throw new Error();
    } catch (err) {
      var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);
      if (matches) {
        return $634f916bc30b7d6650877f3f4b6a8b3a$var$getBaseURL(matches[0]);
      }
    }
    return '/';
  }
  function $634f916bc30b7d6650877f3f4b6a8b3a$var$getBaseURL(url) {
    return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
  }
  // TODO: Replace uses with `new URL(url).origin` when ie11 is no longer supported.
  function $634f916bc30b7d6650877f3f4b6a8b3a$var$getOrigin(url) {
    let matches = ('' + url).match(/(https?|file|ftp):\/\/[^/]+/);
    if (!matches) {
      throw new Error('Origin not found');
    }
    return matches[0];
  }
  function $634f916bc30b7d6650877f3f4b6a8b3a$exec() {
    $634f916bc30b7d6650877f3f4b6a8b3a$exports = {};
    $634f916bc30b7d6650877f3f4b6a8b3a$var$bundleURL = null;
    $634f916bc30b7d6650877f3f4b6a8b3a$export$getBundleURL = $634f916bc30b7d6650877f3f4b6a8b3a$var$getBundleURLCached;
    $634f916bc30b7d6650877f3f4b6a8b3a$exports.getBundleURL = $634f916bc30b7d6650877f3f4b6a8b3a$export$getBundleURL;
    $634f916bc30b7d6650877f3f4b6a8b3a$export$getOrigin = $634f916bc30b7d6650877f3f4b6a8b3a$var$getOrigin;
    $634f916bc30b7d6650877f3f4b6a8b3a$exports.getOrigin = $634f916bc30b7d6650877f3f4b6a8b3a$export$getOrigin;
  }
  function $634f916bc30b7d6650877f3f4b6a8b3a$init() {
    if (!$634f916bc30b7d6650877f3f4b6a8b3a$executed) {
      $634f916bc30b7d6650877f3f4b6a8b3a$executed = true;
      $634f916bc30b7d6650877f3f4b6a8b3a$exec();
    }
    return $634f916bc30b7d6650877f3f4b6a8b3a$exports;
  }
  // ASSET: node_modules/@parcel/runtime-js/lib/get-worker-url.js
  var $1066a859165bb0eb99d326939ca5e6fc$exports, $1066a859165bb0eb99d326939ca5e6fc$executed = false;
  function $1066a859165bb0eb99d326939ca5e6fc$exec() {
    $1066a859165bb0eb99d326939ca5e6fc$exports = {};
    /*global self, Blob*/
    $634f916bc30b7d6650877f3f4b6a8b3a$init();
    $1066a859165bb0eb99d326939ca5e6fc$exports = function (relativePath) {
      var workerUrl = $634f916bc30b7d6650877f3f4b6a8b3a$init().getBundleURL() + relativePath;
      if ($634f916bc30b7d6650877f3f4b6a8b3a$init().getOrigin(workerUrl) === self.location.origin) {
        // If the worker bundle's url is on the same origin as the document,
        // use the worker bundle's own url.
        return workerUrl;
      } else {
        // Otherwise, create a blob URL which loads the worker bundle with `importScripts`.
        return URL.createObjectURL(new Blob(['importScripts(' + JSON.stringify(workerUrl) + ');']));
      }
    };
  }
  function $1066a859165bb0eb99d326939ca5e6fc$init() {
    if (!$1066a859165bb0eb99d326939ca5e6fc$executed) {
      $1066a859165bb0eb99d326939ca5e6fc$executed = true;
      $1066a859165bb0eb99d326939ca5e6fc$exec();
    }
    return $1066a859165bb0eb99d326939ca5e6fc$exports;
  }
  // ASSET: node_modules/@parcel/runtime-js/lib/relative-path.js
  var $824bc590bf0a3702ac7bd27152cb0639$exports, $824bc590bf0a3702ac7bd27152cb0639$var$resolve, $824bc590bf0a3702ac7bd27152cb0639$export$_dirname, $824bc590bf0a3702ac7bd27152cb0639$export$_relative, $824bc590bf0a3702ac7bd27152cb0639$executed = false;
  function $824bc590bf0a3702ac7bd27152cb0639$var$dirname(_filePath) {
    if (_filePath === '') {
      return '.';
    }
    var filePath = _filePath[_filePath.length - 1] === '/' ? _filePath.slice(0, _filePath.length - 1) : _filePath;
    var slashIndex = filePath.lastIndexOf('/');
    return slashIndex === -1 ? '.' : filePath.slice(0, slashIndex);
  }
  function $824bc590bf0a3702ac7bd27152cb0639$var$relative(from, to) {
    if (from === to) {
      return '';
    }
    var fromParts = from.split('/');
    if (fromParts[0] === '.') {
      fromParts.shift();
    }
    var toParts = to.split('/');
    if (toParts[0] === '.') {
      toParts.shift();
    }
    // Find where path segments diverge.
    var i;
    var divergeIndex;
    for (i = 0; (i < toParts.length || i < fromParts.length) && divergeIndex == null; i++) {
      if (fromParts[i] !== toParts[i]) {
        divergeIndex = i;
      }
    }
    // If there are segments from "from" beyond the point of divergence,
    // return back up the path to that point using "..".
    var parts = [];
    for (i = 0; i < fromParts.length - divergeIndex; i++) {
      parts.push('..');
    }
    // If there are segments from "to" beyond the point of divergence,
    // continue using the remaining segments.
    if (toParts.length > divergeIndex) {
      parts.push.apply(parts, toParts.slice(divergeIndex));
    }
    return parts.join('/');
  }
  function $824bc590bf0a3702ac7bd27152cb0639$exec() {
    $824bc590bf0a3702ac7bd27152cb0639$exports = {};
    $824bc590bf0a3702ac7bd27152cb0639$var$resolve = $7d806a7a603c235ec027b73d847f4d95$init().resolve;
    $824bc590bf0a3702ac7bd27152cb0639$exports = function (fromId, toId) {
      return $824bc590bf0a3702ac7bd27152cb0639$var$relative($824bc590bf0a3702ac7bd27152cb0639$var$dirname($824bc590bf0a3702ac7bd27152cb0639$var$resolve(fromId)), $824bc590bf0a3702ac7bd27152cb0639$var$resolve(toId));
    };
    $824bc590bf0a3702ac7bd27152cb0639$export$_dirname = $824bc590bf0a3702ac7bd27152cb0639$var$dirname;
    $824bc590bf0a3702ac7bd27152cb0639$exports._dirname = $824bc590bf0a3702ac7bd27152cb0639$export$_dirname;
    $824bc590bf0a3702ac7bd27152cb0639$export$_relative = $824bc590bf0a3702ac7bd27152cb0639$var$relative;
    $824bc590bf0a3702ac7bd27152cb0639$exports._relative = $824bc590bf0a3702ac7bd27152cb0639$export$_relative;
  }
  function $824bc590bf0a3702ac7bd27152cb0639$init() {
    if (!$824bc590bf0a3702ac7bd27152cb0639$executed) {
      $824bc590bf0a3702ac7bd27152cb0639$executed = true;
      $824bc590bf0a3702ac7bd27152cb0639$exec();
    }
    return $824bc590bf0a3702ac7bd27152cb0639$exports;
  }
  // ASSET: node_modules/@parcel/runtime-js/lib/JSRuntime.js
  var $3b7897fecc6430bec128c40122817af9$exports, $3b7897fecc6430bec128c40122817af9$executed = false;
  function $3b7897fecc6430bec128c40122817af9$exec() {
    $3b7897fecc6430bec128c40122817af9$exports = {};
    $3b7897fecc6430bec128c40122817af9$exports = $1066a859165bb0eb99d326939ca5e6fc$init()($824bc590bf0a3702ac7bd27152cb0639$init()("2G4ko", "7qO9F"));
  }
  function $3b7897fecc6430bec128c40122817af9$init() {
    if (!$3b7897fecc6430bec128c40122817af9$executed) {
      $3b7897fecc6430bec128c40122817af9$executed = true;
      $3b7897fecc6430bec128c40122817af9$exec();
    }
    return $3b7897fecc6430bec128c40122817af9$exports;
  }
  // ASSET: node_modules/@parcel/runtime-js/lib/JSRuntime.js
  var $279abd16ccc3a83da72942b1661fee6f$exports, $279abd16ccc3a83da72942b1661fee6f$executed = false;
  function $279abd16ccc3a83da72942b1661fee6f$exec() {
    $279abd16ccc3a83da72942b1661fee6f$exports = {};
    $279abd16ccc3a83da72942b1661fee6f$exports = $1066a859165bb0eb99d326939ca5e6fc$init()($824bc590bf0a3702ac7bd27152cb0639$init()("2G4ko", "4zqLQ"));
  }
  function $279abd16ccc3a83da72942b1661fee6f$init() {
    if (!$279abd16ccc3a83da72942b1661fee6f$executed) {
      $279abd16ccc3a83da72942b1661fee6f$executed = true;
      $279abd16ccc3a83da72942b1661fee6f$exec();
    }
    return $279abd16ccc3a83da72942b1661fee6f$exports;
  }
  document.addEventListener("DOMContentLoaded", () => {
    const handler = new $2f702dda7315dfb6504d1f8040bf1571$export$default();
    handler.addToDOM(new Worker($3b7897fecc6430bec128c40122817af9$init()), new Worker($279abd16ccc3a83da72942b1661fee6f$init()));
    handler.forceDrawerRender();
  });
})();

//# sourceMappingURL=index.098855ac.js.map
