import {resolve, parse} from "url";
// ASSET: node_modules/@parcel/runtime-js/lib/bundle-url.js
var $6e8abb63634a367ad9906a8b92ef56bb$exports, $6e8abb63634a367ad9906a8b92ef56bb$var$bundleURL, $6e8abb63634a367ad9906a8b92ef56bb$export$getBundleURL, $6e8abb63634a367ad9906a8b92ef56bb$export$getOrigin, $6e8abb63634a367ad9906a8b92ef56bb$executed = false;
function $6e8abb63634a367ad9906a8b92ef56bb$var$getBundleURLCached() {
  if (!$6e8abb63634a367ad9906a8b92ef56bb$var$bundleURL) {
    $6e8abb63634a367ad9906a8b92ef56bb$var$bundleURL = $6e8abb63634a367ad9906a8b92ef56bb$var$getBundleURL();
  }
  return $6e8abb63634a367ad9906a8b92ef56bb$var$bundleURL;
}
function $6e8abb63634a367ad9906a8b92ef56bb$var$getBundleURL() {
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);
    if (matches) {
      return $6e8abb63634a367ad9906a8b92ef56bb$var$getBaseURL(matches[0]);
    }
  }
  return '/';
}
function $6e8abb63634a367ad9906a8b92ef56bb$var$getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
}
// TODO: Replace uses with `new URL(url).origin` when ie11 is no longer supported.
function $6e8abb63634a367ad9906a8b92ef56bb$var$getOrigin(url) {
  let matches = ('' + url).match(/(https?|file|ftp):\/\/[^/]+/);
  if (!matches) {
    throw new Error('Origin not found');
  }
  return matches[0];
}
function $6e8abb63634a367ad9906a8b92ef56bb$exec() {
  $6e8abb63634a367ad9906a8b92ef56bb$exports = {};
  $6e8abb63634a367ad9906a8b92ef56bb$var$bundleURL = null;
  $6e8abb63634a367ad9906a8b92ef56bb$export$getBundleURL = $6e8abb63634a367ad9906a8b92ef56bb$var$getBundleURLCached;
  $6e8abb63634a367ad9906a8b92ef56bb$exports.getBundleURL = $6e8abb63634a367ad9906a8b92ef56bb$export$getBundleURL;
  $6e8abb63634a367ad9906a8b92ef56bb$export$getOrigin = $6e8abb63634a367ad9906a8b92ef56bb$var$getOrigin;
  $6e8abb63634a367ad9906a8b92ef56bb$exports.getOrigin = $6e8abb63634a367ad9906a8b92ef56bb$export$getOrigin;
}
function $6e8abb63634a367ad9906a8b92ef56bb$init() {
  if (!$6e8abb63634a367ad9906a8b92ef56bb$executed) {
    $6e8abb63634a367ad9906a8b92ef56bb$executed = true;
    $6e8abb63634a367ad9906a8b92ef56bb$exec();
  }
  return $6e8abb63634a367ad9906a8b92ef56bb$exports;
}
// ASSET: node_modules/@parcel/runtime-js/lib/get-worker-url.js
var $fa09e2136bee8673975ec04d24c1a302$exports, $fa09e2136bee8673975ec04d24c1a302$executed = false;
function $fa09e2136bee8673975ec04d24c1a302$exec() {
  $fa09e2136bee8673975ec04d24c1a302$exports = {};
  /*global self, Blob*/
  $6e8abb63634a367ad9906a8b92ef56bb$init();
  $fa09e2136bee8673975ec04d24c1a302$exports = function (relativePath) {
    var workerUrl = $6e8abb63634a367ad9906a8b92ef56bb$init().getBundleURL() + relativePath;
    if ($6e8abb63634a367ad9906a8b92ef56bb$init().getOrigin(workerUrl) === self.location.origin) {
      // If the worker bundle's url is on the same origin as the document,
      // use the worker bundle's own url.
      return workerUrl;
    } else {
      // Otherwise, create a blob URL which loads the worker bundle with `importScripts`.
      return URL.createObjectURL(new Blob(['importScripts(' + JSON.stringify(workerUrl) + ');']));
    }
  };
}
function $fa09e2136bee8673975ec04d24c1a302$init() {
  if (!$fa09e2136bee8673975ec04d24c1a302$executed) {
    $fa09e2136bee8673975ec04d24c1a302$executed = true;
    $fa09e2136bee8673975ec04d24c1a302$exec();
  }
  return $fa09e2136bee8673975ec04d24c1a302$exports;
}
// ASSET: node_modules/@parcel/runtime-js/lib/JSRuntime.js
var $6e786b6e954dceba16cb78f965f62f52$exports, $6e786b6e954dceba16cb78f965f62f52$executed = false;
function $6e786b6e954dceba16cb78f965f62f52$exec() {
  $6e786b6e954dceba16cb78f965f62f52$exports = {};
  $6e786b6e954dceba16cb78f965f62f52$exports = $fa09e2136bee8673975ec04d24c1a302$init()("offscreen-webgl-worker.906a2413.js");
}
function $6e786b6e954dceba16cb78f965f62f52$init() {
  if (!$6e786b6e954dceba16cb78f965f62f52$executed) {
    $6e786b6e954dceba16cb78f965f62f52$executed = true;
    $6e786b6e954dceba16cb78f965f62f52$exec();
  }
  return $6e786b6e954dceba16cb78f965f62f52$exports;
}
// ASSET: node_modules/@parcel/runtime-js/lib/JSRuntime.js
var $fde9bc85888899c66f94ab57a224ede3$exports, $fde9bc85888899c66f94ab57a224ede3$executed = false;
function $fde9bc85888899c66f94ab57a224ede3$exec() {
  $fde9bc85888899c66f94ab57a224ede3$exports = {};
  $fde9bc85888899c66f94ab57a224ede3$exports = $fa09e2136bee8673975ec04d24c1a302$init()("data-processor-worker.d8f0e311.js");
}
function $fde9bc85888899c66f94ab57a224ede3$init() {
  if (!$fde9bc85888899c66f94ab57a224ede3$executed) {
    $fde9bc85888899c66f94ab57a224ede3$executed = true;
    $fde9bc85888899c66f94ab57a224ede3$exec();
  }
  return $fde9bc85888899c66f94ab57a224ede3$exports;
}
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
var $622ba0df0660ba45e1724363021493cd$export$default = function (x) {
  return Math.abs(x = Math.round(x)) >= 1e21 ? x.toLocaleString("en").replace(/,/g, "") : x.toString(10);
};
// Computes the decimal coefficient and exponent of the specified number x with
// significant digits p, where x is positive and p is in [1, 21] or undefined.
// For example, formatDecimalParts(1.23) returns ["123", 0].
function $622ba0df0660ba45e1724363021493cd$export$formatDecimalParts(x, p) {
  if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null;
  // NaN, ±Infinity
  var i, coefficient = x.slice(0, i);
  // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
  // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).
  return [coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient, +x.slice(i + 1)];
}
var $11164453a13a6df3748c4c78394e4b58$export$default = function (x) {
  return (x = $622ba0df0660ba45e1724363021493cd$export$formatDecimalParts(Math.abs(x)), x ? x[1] : NaN);
};
var $c75e77c498a364c536d6293d72622f5e$export$default = function (grouping, thousands) {
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
var $4e257e74aecf5a9dbcd0180fad69fdaa$export$default = function (numerals) {
  return function (value) {
    return value.replace(/[0-9]/g, function (i) {
      return numerals[+i];
    });
  };
};
// [[fill]align][sign][symbol][0][width][,][.precision][~][type]
var $a703d92f48168d3e47700005243d54fc$var$re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function $a703d92f48168d3e47700005243d54fc$export$default(specifier) {
  if (!(match = $a703d92f48168d3e47700005243d54fc$var$re.exec(specifier))) throw new Error("invalid format: " + specifier);
  var match;
  return new $a703d92f48168d3e47700005243d54fc$export$FormatSpecifier({
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
$a703d92f48168d3e47700005243d54fc$export$default.prototype = $a703d92f48168d3e47700005243d54fc$export$FormatSpecifier.prototype;
// instanceof
function $a703d92f48168d3e47700005243d54fc$export$FormatSpecifier(specifier) {
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
$a703d92f48168d3e47700005243d54fc$export$FormatSpecifier.prototype.toString = function () {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === undefined ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === undefined ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
// Trims insignificant zeros, e.g., replaces 1.2000k with 1.2k.
var $c865b4861a99731a56ebf45f15758714$export$default = function (s) {
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
var $be9bb1d85940d64754c1b794170e9e24$export$prefixExponent;
var $be9bb1d85940d64754c1b794170e9e24$export$default = function (x, p) {
  var d = $622ba0df0660ba45e1724363021493cd$export$formatDecimalParts(x, p);
  if (!d) return x + "";
  var coefficient = d[0], exponent = d[1], i = exponent - ($be9bb1d85940d64754c1b794170e9e24$export$prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1, n = coefficient.length;
  return i === n ? coefficient : i > n ? coefficient + new Array(i - n + 1).join("0") : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i) : "0." + new Array(1 - i).join("0") + $622ba0df0660ba45e1724363021493cd$export$formatDecimalParts(x, Math.max(0, p + i - 1))[0];
};
var $eb10e3f66a955ccebc429d457ce3906c$export$default = function (x, p) {
  var d = $622ba0df0660ba45e1724363021493cd$export$formatDecimalParts(x, p);
  if (!d) return x + "";
  var coefficient = d[0], exponent = d[1];
  return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1) : coefficient + new Array(exponent - coefficient.length + 2).join("0");
};
var $8c8418ec597cc72c38534b38058ed3e7$export$default = {
  "%": (x, p) => (x * 100).toFixed(p),
  "b": x => Math.round(x).toString(2),
  "c": x => x + "",
  "d": $622ba0df0660ba45e1724363021493cd$export$default,
  "e": (x, p) => x.toExponential(p),
  "f": (x, p) => x.toFixed(p),
  "g": (x, p) => x.toPrecision(p),
  "o": x => Math.round(x).toString(8),
  "p": (x, p) => $eb10e3f66a955ccebc429d457ce3906c$export$default(x * 100, p),
  "r": $eb10e3f66a955ccebc429d457ce3906c$export$default,
  "s": $be9bb1d85940d64754c1b794170e9e24$export$default,
  "X": x => Math.round(x).toString(16).toUpperCase(),
  "x": x => Math.round(x).toString(16)
};
var $01a6dfe11d58870267656efe3000361f$export$default = function (x) {
  return x;
};
var $fbdbf4fd2ce0b21f2a75d99b7d506f21$var$map = Array.prototype.map, $fbdbf4fd2ce0b21f2a75d99b7d506f21$var$prefixes = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
var $fbdbf4fd2ce0b21f2a75d99b7d506f21$export$default = function (locale) {
  var group = locale.grouping === undefined || locale.thousands === undefined ? $01a6dfe11d58870267656efe3000361f$export$default : $c75e77c498a364c536d6293d72622f5e$export$default($fbdbf4fd2ce0b21f2a75d99b7d506f21$var$map.call(locale.grouping, Number), locale.thousands + ""), currencyPrefix = locale.currency === undefined ? "" : locale.currency[0] + "", currencySuffix = locale.currency === undefined ? "" : locale.currency[1] + "", decimal = locale.decimal === undefined ? "." : locale.decimal + "", numerals = locale.numerals === undefined ? $01a6dfe11d58870267656efe3000361f$export$default : $4e257e74aecf5a9dbcd0180fad69fdaa$export$default($fbdbf4fd2ce0b21f2a75d99b7d506f21$var$map.call(locale.numerals, String)), percent = locale.percent === undefined ? "%" : locale.percent + "", minus = locale.minus === undefined ? "−" : locale.minus + "", nan = locale.nan === undefined ? "NaN" : locale.nan + "";
  function newFormat(specifier) {
    specifier = $a703d92f48168d3e47700005243d54fc$export$default(specifier);
    var fill = specifier.fill, align = specifier.align, sign = specifier.sign, symbol = specifier.symbol, zero = specifier.zero, width = specifier.width, comma = specifier.comma, precision = specifier.precision, trim = specifier.trim, type = specifier.type;
    // The "n" type is an alias for ",g".
    if (type === "n") (comma = true, type = "g"); else // The "" type, and any invalid type, is an alias for ".12~g".
    if (!$8c8418ec597cc72c38534b38058ed3e7$export$default[type]) (precision === undefined && (precision = 12), trim = true, type = "g");
    // If zero fill is specified, padding goes after sign and before digits.
    if (zero || fill === "0" && align === "=") (zero = true, fill = "0", align = "=");
    // Compute the prefix and suffix.
    // For SI-prefix, the suffix is lazily computed.
    var prefix = symbol === "$" ? currencyPrefix : symbol === "#" && (/[boxX]/).test(type) ? "0" + type.toLowerCase() : "", suffix = symbol === "$" ? currencySuffix : (/[%p]/).test(type) ? percent : "";
    // What format function should we use?
    // Is this an integer type?
    // Can this type generate exponential notation?
    var formatType = $8c8418ec597cc72c38534b38058ed3e7$export$default[type], maybeSuffix = (/[defgprs%]/).test(type);
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
        if (trim) value = $c865b4861a99731a56ebf45f15758714$export$default(value);
        // If a negative value rounds to zero after formatting, and no explicit positive sign is requested, hide the sign.
        if (valueNegative && +value === 0 && sign !== "+") valueNegative = false;
        // Compute the prefix and suffix.
        valuePrefix = (valueNegative ? sign === "(" ? sign : minus : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
        valueSuffix = (type === "s" ? $fbdbf4fd2ce0b21f2a75d99b7d506f21$var$prefixes[8 + $be9bb1d85940d64754c1b794170e9e24$export$prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : "");
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
    var f = newFormat((specifier = $a703d92f48168d3e47700005243d54fc$export$default(specifier), specifier.type = "f", specifier)), e = Math.max(-8, Math.min(8, Math.floor($11164453a13a6df3748c4c78394e4b58$export$default(value) / 3))) * 3, k = Math.pow(10, -e), prefix = $fbdbf4fd2ce0b21f2a75d99b7d506f21$var$prefixes[8 + e / 3];
    return function (value) {
      return f(k * value) + prefix;
    };
  }
  return {
    format: newFormat,
    formatPrefix: formatPrefix
  };
};
var $0b0a348b318a7da9384b2a022af7a318$var$locale;
var $0b0a348b318a7da9384b2a022af7a318$export$format;
var $0b0a348b318a7da9384b2a022af7a318$export$formatPrefix;
$0b0a348b318a7da9384b2a022af7a318$export$default({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function $0b0a348b318a7da9384b2a022af7a318$export$default(definition) {
  $0b0a348b318a7da9384b2a022af7a318$var$locale = $fbdbf4fd2ce0b21f2a75d99b7d506f21$export$default(definition);
  $0b0a348b318a7da9384b2a022af7a318$export$format = $0b0a348b318a7da9384b2a022af7a318$var$locale.format;
  $0b0a348b318a7da9384b2a022af7a318$export$formatPrefix = $0b0a348b318a7da9384b2a022af7a318$var$locale.formatPrefix;
  return $0b0a348b318a7da9384b2a022af7a318$var$locale;
}
var $11a06c0b467cb84bde746b544e7ef53a$export$default = function (step, max) {
  (step = Math.abs(step), max = Math.abs(max) - step);
  return Math.max(0, $11164453a13a6df3748c4c78394e4b58$export$default(max) - $11164453a13a6df3748c4c78394e4b58$export$default(step)) + 1;
};
/**
* Create a function which maps a genome pair to a location in the entire genome
*
* @param {String} genomeId key from genomeSizes object
* @returns a function which maps a (chrId, pairNum) => to
*  a number between 1 and total number of genes in the genome
*/
const $0777aa6dedc50b2dd7ff3727f3d283be$var$createPairMapperToGenome = genomeId => {
  let chrSizes = $0777aa6dedc50b2dd7ff3727f3d283be$export$genomeSizes[genomeId];
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
class $0777aa6dedc50b2dd7ff3727f3d283be$export$GenomeScale {
  /**
  * A scale used to map a genome pair to a location between -1 and 1 for data visualization.
  * Also contains inverse and utility functions for getting labels for axis.
  *
  * @param {String} genomeId key from genomeSizes object
  * @param {Array} domain array of length 2 containing the start and end of the genome
  *   for the scale. ex: ["chr2:1000", "chr3:2000"]
  */
  constructor(genomeId, domain) {
    if ($0777aa6dedc50b2dd7ff3727f3d283be$export$genomeSizes[genomeId] === undefined) {
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
    this.mapPairToGenomeIndex = $0777aa6dedc50b2dd7ff3727f3d283be$var$createPairMapperToGenome(genomeId);
    const firstPairInDomain = this.mapPairToGenomeIndex(startChr, startPair);
    const lastPairInDomain = this.mapPairToGenomeIndex(endChr, endPair);
    this.mapGenomeIndexToClipSpace = $ca7145bbe9fc7f50a5dcc86190258597$export$scale([firstPairInDomain, lastPairInDomain], [-1, 1]);
    this.mapGenomeIndexToClipSpaceInverse = $ca7145bbe9fc7f50a5dcc86190258597$export$scale([-1, 1], [firstPairInDomain, lastPairInDomain]);
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
    for (const [chrKey, pairCount] of $0777aa6dedc50b2dd7ff3727f3d283be$export$genomeSizes[this.genomeId].entries()) {
      if (cumulativeTotal + pairCount >= genomeSpot) {
        chrLoc = genomeSpot - cumulativeTotal;
        chrId = chrKey;
        break;
      }
      cumulativeTotal += pairCount;
    }
    return formatting ? `chr${chrId}:${$0b0a348b318a7da9384b2a022af7a318$export$format(formatting)(chrLoc)}` : `chr${chrId}:${chrLoc}`;
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
      suggestedFormat = $11a06c0b467cb84bde746b544e7ef53a$export$default(10 ** magnitude, startingValue);
      for (let currValue = startingValue; currValue < endPair; currValue += 10 ** magnitude) {
        toReturn.push(this.toClipSpaceFromParts(startChr, currValue));
      }
    } else {
      suggestedFormat = "1";
      for (const chrId of $0777aa6dedc50b2dd7ff3727f3d283be$export$genomeSizes[this.genomeId].keys()) {
        toReturn.push(this.toClipSpaceFromParts(chrId, 1));
      }
    }
    return {
      tickCoords: toReturn,
      tickLabels: toReturn.map(coord => this.inverse(coord, $0b0a348b318a7da9384b2a022af7a318$export$format(`.${suggestedFormat}s`)))
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
    const chrSizes = $0777aa6dedc50b2dd7ff3727f3d283be$export$genomeSizes[genomeId];
    const finalEntry = [...chrSizes.entries()][chrSizes.size - 1];
    return new $0777aa6dedc50b2dd7ff3727f3d283be$export$GenomeScale(genomeId, ["chr1:1", `chr${finalEntry[0]}:${finalEntry[1]}`]);
  }
}
/**
* Available genomes to visualize. Each genome is a map from chromosome id to number of genes in chromosome.
* Order matters as maps remember insertion order.
*/
const $0777aa6dedc50b2dd7ff3727f3d283be$export$genomeSizes = {
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
var $8903206d248dd24fc44c3d320ddd69ee$export$default = function (constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
};
function $8903206d248dd24fc44c3d320ddd69ee$export$extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition) prototype[key] = definition[key];
  return prototype;
}
function $70e1f50bc03aeddd84a3440291f7fcc1$export$Color() {}
var $70e1f50bc03aeddd84a3440291f7fcc1$export$darker = 0.7;
var $70e1f50bc03aeddd84a3440291f7fcc1$export$brighter = 1 / $70e1f50bc03aeddd84a3440291f7fcc1$export$darker;
var $70e1f50bc03aeddd84a3440291f7fcc1$var$reI = "\\s*([+-]?\\d+)\\s*", $70e1f50bc03aeddd84a3440291f7fcc1$var$reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*", $70e1f50bc03aeddd84a3440291f7fcc1$var$reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*", $70e1f50bc03aeddd84a3440291f7fcc1$var$reHex = /^#([0-9a-f]{3,8})$/, $70e1f50bc03aeddd84a3440291f7fcc1$var$reRgbInteger = new RegExp("^rgb\\(" + [$70e1f50bc03aeddd84a3440291f7fcc1$var$reI, $70e1f50bc03aeddd84a3440291f7fcc1$var$reI, $70e1f50bc03aeddd84a3440291f7fcc1$var$reI] + "\\)$"), $70e1f50bc03aeddd84a3440291f7fcc1$var$reRgbPercent = new RegExp("^rgb\\(" + [$70e1f50bc03aeddd84a3440291f7fcc1$var$reP, $70e1f50bc03aeddd84a3440291f7fcc1$var$reP, $70e1f50bc03aeddd84a3440291f7fcc1$var$reP] + "\\)$"), $70e1f50bc03aeddd84a3440291f7fcc1$var$reRgbaInteger = new RegExp("^rgba\\(" + [$70e1f50bc03aeddd84a3440291f7fcc1$var$reI, $70e1f50bc03aeddd84a3440291f7fcc1$var$reI, $70e1f50bc03aeddd84a3440291f7fcc1$var$reI, $70e1f50bc03aeddd84a3440291f7fcc1$var$reN] + "\\)$"), $70e1f50bc03aeddd84a3440291f7fcc1$var$reRgbaPercent = new RegExp("^rgba\\(" + [$70e1f50bc03aeddd84a3440291f7fcc1$var$reP, $70e1f50bc03aeddd84a3440291f7fcc1$var$reP, $70e1f50bc03aeddd84a3440291f7fcc1$var$reP, $70e1f50bc03aeddd84a3440291f7fcc1$var$reN] + "\\)$"), $70e1f50bc03aeddd84a3440291f7fcc1$var$reHslPercent = new RegExp("^hsl\\(" + [$70e1f50bc03aeddd84a3440291f7fcc1$var$reN, $70e1f50bc03aeddd84a3440291f7fcc1$var$reP, $70e1f50bc03aeddd84a3440291f7fcc1$var$reP] + "\\)$"), $70e1f50bc03aeddd84a3440291f7fcc1$var$reHslaPercent = new RegExp("^hsla\\(" + [$70e1f50bc03aeddd84a3440291f7fcc1$var$reN, $70e1f50bc03aeddd84a3440291f7fcc1$var$reP, $70e1f50bc03aeddd84a3440291f7fcc1$var$reP, $70e1f50bc03aeddd84a3440291f7fcc1$var$reN] + "\\)$");
var $70e1f50bc03aeddd84a3440291f7fcc1$var$named = {
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
$8903206d248dd24fc44c3d320ddd69ee$export$default($70e1f50bc03aeddd84a3440291f7fcc1$export$Color, $70e1f50bc03aeddd84a3440291f7fcc1$export$default, {
  copy: function (channels) {
    return Object.assign(new this.constructor(), this, channels);
  },
  displayable: function () {
    return this.rgb().displayable();
  },
  hex: $70e1f50bc03aeddd84a3440291f7fcc1$var$color_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: $70e1f50bc03aeddd84a3440291f7fcc1$var$color_formatHex,
  formatHsl: $70e1f50bc03aeddd84a3440291f7fcc1$var$color_formatHsl,
  formatRgb: $70e1f50bc03aeddd84a3440291f7fcc1$var$color_formatRgb,
  toString: $70e1f50bc03aeddd84a3440291f7fcc1$var$color_formatRgb
});
function $70e1f50bc03aeddd84a3440291f7fcc1$var$color_formatHex() {
  return this.rgb().formatHex();
}
function $70e1f50bc03aeddd84a3440291f7fcc1$var$color_formatHsl() {
  return $70e1f50bc03aeddd84a3440291f7fcc1$export$hslConvert(this).formatHsl();
}
function $70e1f50bc03aeddd84a3440291f7fcc1$var$color_formatRgb() {
  return this.rgb().formatRgb();
}
function $70e1f50bc03aeddd84a3440291f7fcc1$export$default(format) {
  var m, l;
  format = (format + "").trim().toLowerCase();
  return (m = $70e1f50bc03aeddd84a3440291f7fcc1$var$reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? $70e1f50bc03aeddd84a3440291f7fcc1$var$rgbn(m) : // #ff0000
  l === 3 ? new $70e1f50bc03aeddd84a3440291f7fcc1$export$Rgb(m >> 8 & 0xf | m >> 4 & 0xf0, m >> 4 & 0xf | m & 0xf0, (m & 0xf) << 4 | m & 0xf, 1) : // #f00
  l === 8 ? $70e1f50bc03aeddd84a3440291f7fcc1$var$rgba(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) : // #ff000000
  l === 4 ? $70e1f50bc03aeddd84a3440291f7fcc1$var$rgba(m >> 12 & 0xf | m >> 8 & 0xf0, m >> 8 & 0xf | m >> 4 & 0xf0, m >> 4 & 0xf | m & 0xf0, ((m & 0xf) << 4 | m & 0xf) / 0xff) : // #f000
  null) : // invalid hex
  (m = $70e1f50bc03aeddd84a3440291f7fcc1$var$reRgbInteger.exec(format)) ? new $70e1f50bc03aeddd84a3440291f7fcc1$export$Rgb(m[1], m[2], m[3], 1) : // rgb(255, 0, 0)
  (m = $70e1f50bc03aeddd84a3440291f7fcc1$var$reRgbPercent.exec(format)) ? new $70e1f50bc03aeddd84a3440291f7fcc1$export$Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) : // rgb(100%, 0%, 0%)
  (m = $70e1f50bc03aeddd84a3440291f7fcc1$var$reRgbaInteger.exec(format)) ? $70e1f50bc03aeddd84a3440291f7fcc1$var$rgba(m[1], m[2], m[3], m[4]) : // rgba(255, 0, 0, 1)
  (m = $70e1f50bc03aeddd84a3440291f7fcc1$var$reRgbaPercent.exec(format)) ? $70e1f50bc03aeddd84a3440291f7fcc1$var$rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) : // rgb(100%, 0%, 0%, 1)
  (m = $70e1f50bc03aeddd84a3440291f7fcc1$var$reHslPercent.exec(format)) ? $70e1f50bc03aeddd84a3440291f7fcc1$var$hsla(m[1], m[2] / 100, m[3] / 100, 1) : // hsl(120, 50%, 50%)
  (m = $70e1f50bc03aeddd84a3440291f7fcc1$var$reHslaPercent.exec(format)) ? $70e1f50bc03aeddd84a3440291f7fcc1$var$hsla(m[1], m[2] / 100, m[3] / 100, m[4]) : // hsla(120, 50%, 50%, 1)
  $70e1f50bc03aeddd84a3440291f7fcc1$var$named.hasOwnProperty(format) ? $70e1f50bc03aeddd84a3440291f7fcc1$var$rgbn($70e1f50bc03aeddd84a3440291f7fcc1$var$named[format]) : // eslint-disable-line no-prototype-builtins
  format === "transparent" ? new $70e1f50bc03aeddd84a3440291f7fcc1$export$Rgb(NaN, NaN, NaN, 0) : null;
}
function $70e1f50bc03aeddd84a3440291f7fcc1$var$rgbn(n) {
  return new $70e1f50bc03aeddd84a3440291f7fcc1$export$Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
}
function $70e1f50bc03aeddd84a3440291f7fcc1$var$rgba(r, g, b, a) {
  if (a <= 0) r = g = b = NaN;
  return new $70e1f50bc03aeddd84a3440291f7fcc1$export$Rgb(r, g, b, a);
}
function $70e1f50bc03aeddd84a3440291f7fcc1$export$rgbConvert(o) {
  if (!(o instanceof $70e1f50bc03aeddd84a3440291f7fcc1$export$Color)) o = $70e1f50bc03aeddd84a3440291f7fcc1$export$default(o);
  if (!o) return new $70e1f50bc03aeddd84a3440291f7fcc1$export$Rgb();
  o = o.rgb();
  return new $70e1f50bc03aeddd84a3440291f7fcc1$export$Rgb(o.r, o.g, o.b, o.opacity);
}
function $70e1f50bc03aeddd84a3440291f7fcc1$export$rgb(r, g, b, opacity) {
  return arguments.length === 1 ? $70e1f50bc03aeddd84a3440291f7fcc1$export$rgbConvert(r) : new $70e1f50bc03aeddd84a3440291f7fcc1$export$Rgb(r, g, b, opacity == null ? 1 : opacity);
}
function $70e1f50bc03aeddd84a3440291f7fcc1$export$Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}
$8903206d248dd24fc44c3d320ddd69ee$export$default($70e1f50bc03aeddd84a3440291f7fcc1$export$Rgb, $70e1f50bc03aeddd84a3440291f7fcc1$export$rgb, $8903206d248dd24fc44c3d320ddd69ee$export$extend($70e1f50bc03aeddd84a3440291f7fcc1$export$Color, {
  brighter: function (k) {
    k = k == null ? $70e1f50bc03aeddd84a3440291f7fcc1$export$brighter : Math.pow($70e1f50bc03aeddd84a3440291f7fcc1$export$brighter, k);
    return new $70e1f50bc03aeddd84a3440291f7fcc1$export$Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker: function (k) {
    k = k == null ? $70e1f50bc03aeddd84a3440291f7fcc1$export$darker : Math.pow($70e1f50bc03aeddd84a3440291f7fcc1$export$darker, k);
    return new $70e1f50bc03aeddd84a3440291f7fcc1$export$Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb: function () {
    return this;
  },
  displayable: function () {
    return -0.5 <= this.r && this.r < 255.5 && (-0.5 <= this.g && this.g < 255.5) && (-0.5 <= this.b && this.b < 255.5) && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: $70e1f50bc03aeddd84a3440291f7fcc1$var$rgb_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: $70e1f50bc03aeddd84a3440291f7fcc1$var$rgb_formatHex,
  formatRgb: $70e1f50bc03aeddd84a3440291f7fcc1$var$rgb_formatRgb,
  toString: $70e1f50bc03aeddd84a3440291f7fcc1$var$rgb_formatRgb
}));
function $70e1f50bc03aeddd84a3440291f7fcc1$var$rgb_formatHex() {
  return "#" + $70e1f50bc03aeddd84a3440291f7fcc1$var$hex(this.r) + $70e1f50bc03aeddd84a3440291f7fcc1$var$hex(this.g) + $70e1f50bc03aeddd84a3440291f7fcc1$var$hex(this.b);
}
function $70e1f50bc03aeddd84a3440291f7fcc1$var$rgb_formatRgb() {
  var a = this.opacity;
  a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
  return (a === 1 ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (a === 1 ? ")" : ", " + a + ")");
}
function $70e1f50bc03aeddd84a3440291f7fcc1$var$hex(value) {
  value = Math.max(0, Math.min(255, Math.round(value) || 0));
  return (value < 16 ? "0" : "") + value.toString(16);
}
function $70e1f50bc03aeddd84a3440291f7fcc1$var$hsla(h, s, l, a) {
  if (a <= 0) h = s = l = NaN; else if (l <= 0 || l >= 1) h = s = NaN; else if (s <= 0) h = NaN;
  return new $70e1f50bc03aeddd84a3440291f7fcc1$var$Hsl(h, s, l, a);
}
function $70e1f50bc03aeddd84a3440291f7fcc1$export$hslConvert(o) {
  if (o instanceof $70e1f50bc03aeddd84a3440291f7fcc1$var$Hsl) return new $70e1f50bc03aeddd84a3440291f7fcc1$var$Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof $70e1f50bc03aeddd84a3440291f7fcc1$export$Color)) o = $70e1f50bc03aeddd84a3440291f7fcc1$export$default(o);
  if (!o) return new $70e1f50bc03aeddd84a3440291f7fcc1$var$Hsl();
  if (o instanceof $70e1f50bc03aeddd84a3440291f7fcc1$var$Hsl) return o;
  o = o.rgb();
  var r = o.r / 255, g = o.g / 255, b = o.b / 255, min = Math.min(r, g, b), max = Math.max(r, g, b), h = NaN, s = max - min, l = (max + min) / 2;
  if (s) {
    if (r === max) h = (g - b) / s + (g < b) * 6; else if (g === max) h = (b - r) / s + 2; else h = (r - g) / s + 4;
    s /= l < 0.5 ? max + min : 2 - max - min;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }
  return new $70e1f50bc03aeddd84a3440291f7fcc1$var$Hsl(h, s, l, o.opacity);
}
function $70e1f50bc03aeddd84a3440291f7fcc1$export$hsl(h, s, l, opacity) {
  return arguments.length === 1 ? $70e1f50bc03aeddd84a3440291f7fcc1$export$hslConvert(h) : new $70e1f50bc03aeddd84a3440291f7fcc1$var$Hsl(h, s, l, opacity == null ? 1 : opacity);
}
function $70e1f50bc03aeddd84a3440291f7fcc1$var$Hsl(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}
$8903206d248dd24fc44c3d320ddd69ee$export$default($70e1f50bc03aeddd84a3440291f7fcc1$var$Hsl, $70e1f50bc03aeddd84a3440291f7fcc1$export$hsl, $8903206d248dd24fc44c3d320ddd69ee$export$extend($70e1f50bc03aeddd84a3440291f7fcc1$export$Color, {
  brighter: function (k) {
    k = k == null ? $70e1f50bc03aeddd84a3440291f7fcc1$export$brighter : Math.pow($70e1f50bc03aeddd84a3440291f7fcc1$export$brighter, k);
    return new $70e1f50bc03aeddd84a3440291f7fcc1$var$Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function (k) {
    k = k == null ? $70e1f50bc03aeddd84a3440291f7fcc1$export$darker : Math.pow($70e1f50bc03aeddd84a3440291f7fcc1$export$darker, k);
    return new $70e1f50bc03aeddd84a3440291f7fcc1$var$Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function () {
    var h = this.h % 360 + (this.h < 0) * 360, s = isNaN(h) || isNaN(this.s) ? 0 : this.s, l = this.l, m2 = l + (l < 0.5 ? l : 1 - l) * s, m1 = 2 * l - m2;
    return new $70e1f50bc03aeddd84a3440291f7fcc1$export$Rgb($70e1f50bc03aeddd84a3440291f7fcc1$var$hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2), $70e1f50bc03aeddd84a3440291f7fcc1$var$hsl2rgb(h, m1, m2), $70e1f50bc03aeddd84a3440291f7fcc1$var$hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2), this.opacity);
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
function $70e1f50bc03aeddd84a3440291f7fcc1$var$hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
}
/**
* Returns a linear scale to map elements in domain to elements in range.
* @param {Array} domain array of length two containing minimum and maximum values
* @param {Array} range array of length two containing minimum and maximum values
* @returns linear scale mapping domain to range
*/
function $ca7145bbe9fc7f50a5dcc86190258597$export$scale(domain, range) {
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
function $ca7145bbe9fc7f50a5dcc86190258597$export$rgbToHex(red, green, blue) {
  return red << 16 | green << 8 | blue << 0;
}
function $ca7145bbe9fc7f50a5dcc86190258597$export$rgbStringToHex(rgb) {
  const colorVals = rgb.substring(4, rgb.length - 1).split(",");
  return $ca7145bbe9fc7f50a5dcc86190258597$export$rgbToHex(...colorVals.map(asStr => parseInt(asStr)));
}
function $ca7145bbe9fc7f50a5dcc86190258597$export$colorSpecifierToHex(specifier) {
  if (!isNaN(specifier)) {
    // Specifier is already a hex value
    return Math.floor(specifier);
  }
  const asColor = $70e1f50bc03aeddd84a3440291f7fcc1$export$default(specifier);
  return $ca7145bbe9fc7f50a5dcc86190258597$export$rgbToHex(asColor.r, asColor.g, asColor.b);
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
function $ca7145bbe9fc7f50a5dcc86190258597$export$getViewportForSchema(schema) {
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
const $ca7145bbe9fc7f50a5dcc86190258597$export$getScaleForSchema = (dimension, schema) => {
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
    const viewport = $ca7145bbe9fc7f50a5dcc86190258597$export$getViewportForSchema(schema);
    if (dimension === "x") {
      return $ca7145bbe9fc7f50a5dcc86190258597$export$scale([viewport[0], viewport[1]], [-1, 1]);
    }
    return $ca7145bbe9fc7f50a5dcc86190258597$export$scale([viewport[2], viewport[3]], [-1, 1]);
  }
  const geneScale = $0777aa6dedc50b2dd7ff3727f3d283be$export$GenomeScale.completeScale(genome);
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
  return new $0777aa6dedc50b2dd7ff3727f3d283be$export$GenomeScale(genome, [smallestGene, largestGene]);
};
const $ca7145bbe9fc7f50a5dcc86190258597$var$DEFAULT_MARGIN = "2em";
const $ca7145bbe9fc7f50a5dcc86190258597$export$getDimAndMarginStyleForSchema = schema => {
  if (schema.margins === undefined) {
    return {
      width: `calc(100% - ${$ca7145bbe9fc7f50a5dcc86190258597$var$DEFAULT_MARGIN} - ${$ca7145bbe9fc7f50a5dcc86190258597$var$DEFAULT_MARGIN}`,
      height: `calc(100% - ${$ca7145bbe9fc7f50a5dcc86190258597$var$DEFAULT_MARGIN} - ${$ca7145bbe9fc7f50a5dcc86190258597$var$DEFAULT_MARGIN}`,
      margin: $ca7145bbe9fc7f50a5dcc86190258597$var$DEFAULT_MARGIN
    };
  }
  let toReturn = {};
  toReturn.width = `calc(100% - ${schema.margins.left || $ca7145bbe9fc7f50a5dcc86190258597$var$DEFAULT_MARGIN} - ${schema.margins.right || $ca7145bbe9fc7f50a5dcc86190258597$var$DEFAULT_MARGIN})`;
  toReturn.height = `calc(100% - ${schema.margins.top || $ca7145bbe9fc7f50a5dcc86190258597$var$DEFAULT_MARGIN} - ${schema.margins.bottom || $ca7145bbe9fc7f50a5dcc86190258597$var$DEFAULT_MARGIN})`;
  // Shorthand for top right bottom left
  toReturn.margin = `${schema.margins.top || $ca7145bbe9fc7f50a5dcc86190258597$var$DEFAULT_MARGIN}
                     ${schema.margins.right || $ca7145bbe9fc7f50a5dcc86190258597$var$DEFAULT_MARGIN}
                     ${schema.margins.bottom || $ca7145bbe9fc7f50a5dcc86190258597$var$DEFAULT_MARGIN}
                     ${schema.margins.left || $ca7145bbe9fc7f50a5dcc86190258597$var$DEFAULT_MARGIN}`;
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
const $ca7145bbe9fc7f50a5dcc86190258597$export$getQuadraticBezierCurveForPoints = (P0, P1, P2) => {
  const x = t => (1 - t) ** 2 * P0[0] + 2 * t * (1 - t) * P1[0] + t ** 2 * P2[0];
  const y = t => (1 - t) ** 2 * P0[1] + 2 * t * (1 - t) * P1[1] + t ** 2 * P2[1];
  return t => [x(t), y(t)];
};
var $332ea7b1f4507a979e377791aaa07849$export$default = function (x) {
  return x;
};
var $fc92a4fc87273d9f03f319de673f1ae5$var$top = 1, $fc92a4fc87273d9f03f319de673f1ae5$var$right = 2, $fc92a4fc87273d9f03f319de673f1ae5$var$bottom = 3, $fc92a4fc87273d9f03f319de673f1ae5$var$left = 4, $fc92a4fc87273d9f03f319de673f1ae5$var$epsilon = 1e-6;
function $fc92a4fc87273d9f03f319de673f1ae5$var$translateX(x) {
  return "translate(" + x + ",0)";
}
function $fc92a4fc87273d9f03f319de673f1ae5$var$translateY(y) {
  return "translate(0," + y + ")";
}
function $fc92a4fc87273d9f03f319de673f1ae5$var$number(scale) {
  return d => +scale(d);
}
function $fc92a4fc87273d9f03f319de673f1ae5$var$center(scale, offset) {
  offset = Math.max(0, scale.bandwidth() - offset * 2) / 2;
  if (scale.round()) offset = Math.round(offset);
  return d => +scale(d) + offset;
}
function $fc92a4fc87273d9f03f319de673f1ae5$var$entering() {
  return !this.__axis;
}
function $fc92a4fc87273d9f03f319de673f1ae5$var$axis(orient, scale) {
  var tickArguments = [], tickValues = null, tickFormat = null, tickSizeInner = 6, tickSizeOuter = 6, tickPadding = 3, offset = typeof window !== "undefined" && window.devicePixelRatio > 1 ? 0 : 0.5, k = orient === $fc92a4fc87273d9f03f319de673f1ae5$var$top || orient === $fc92a4fc87273d9f03f319de673f1ae5$var$left ? -1 : 1, x = orient === $fc92a4fc87273d9f03f319de673f1ae5$var$left || orient === $fc92a4fc87273d9f03f319de673f1ae5$var$right ? "x" : "y", transform = orient === $fc92a4fc87273d9f03f319de673f1ae5$var$top || orient === $fc92a4fc87273d9f03f319de673f1ae5$var$bottom ? $fc92a4fc87273d9f03f319de673f1ae5$var$translateX : $fc92a4fc87273d9f03f319de673f1ae5$var$translateY;
  function axis(context) {
    var values = tickValues == null ? scale.ticks ? scale.ticks.apply(scale, tickArguments) : scale.domain() : tickValues, format = tickFormat == null ? scale.tickFormat ? scale.tickFormat.apply(scale, tickArguments) : $332ea7b1f4507a979e377791aaa07849$export$default : tickFormat, spacing = Math.max(tickSizeInner, 0) + tickPadding, range = scale.range(), range0 = +range[0] + offset, range1 = +range[range.length - 1] + offset, position = (scale.bandwidth ? $fc92a4fc87273d9f03f319de673f1ae5$var$center : $fc92a4fc87273d9f03f319de673f1ae5$var$number)(scale.copy(), offset), selection = context.selection ? context.selection() : context, path = selection.selectAll(".domain").data([null]), tick = selection.selectAll(".tick").data(values, scale).order(), tickExit = tick.exit(), tickEnter = tick.enter().append("g").attr("class", "tick"), line = tick.select("line"), text = tick.select("text");
    path = path.merge(path.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "currentColor"));
    tick = tick.merge(tickEnter);
    line = line.merge(tickEnter.append("line").attr("stroke", "currentColor").attr(x + "2", k * tickSizeInner));
    text = text.merge(tickEnter.append("text").attr("fill", "currentColor").attr(x, k * spacing).attr("dy", orient === $fc92a4fc87273d9f03f319de673f1ae5$var$top ? "0em" : orient === $fc92a4fc87273d9f03f319de673f1ae5$var$bottom ? "0.71em" : "0.32em"));
    if (context !== selection) {
      path = path.transition(context);
      tick = tick.transition(context);
      line = line.transition(context);
      text = text.transition(context);
      tickExit = tickExit.transition(context).attr("opacity", $fc92a4fc87273d9f03f319de673f1ae5$var$epsilon).attr("transform", function (d) {
        return isFinite(d = position(d)) ? transform(d + offset) : this.getAttribute("transform");
      });
      tickEnter.attr("opacity", $fc92a4fc87273d9f03f319de673f1ae5$var$epsilon).attr("transform", function (d) {
        var p = this.parentNode.__axis;
        return transform((p && isFinite(p = p(d)) ? p : position(d)) + offset);
      });
    }
    tickExit.remove();
    path.attr("d", orient === $fc92a4fc87273d9f03f319de673f1ae5$var$left || orient === $fc92a4fc87273d9f03f319de673f1ae5$var$right ? tickSizeOuter ? "M" + k * tickSizeOuter + "," + range0 + "H" + offset + "V" + range1 + "H" + k * tickSizeOuter : "M" + offset + "," + range0 + "V" + range1 : tickSizeOuter ? "M" + range0 + "," + k * tickSizeOuter + "V" + offset + "H" + range1 + "V" + k * tickSizeOuter : "M" + range0 + "," + offset + "H" + range1);
    tick.attr("opacity", 1).attr("transform", function (d) {
      return transform(position(d) + offset);
    });
    line.attr(x + "2", k * tickSizeInner);
    text.attr(x, k * spacing).text(format);
    selection.filter($fc92a4fc87273d9f03f319de673f1ae5$var$entering).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", orient === $fc92a4fc87273d9f03f319de673f1ae5$var$right ? "start" : orient === $fc92a4fc87273d9f03f319de673f1ae5$var$left ? "end" : "middle");
    selection.each(function () {
      this.__axis = position;
    });
  }
  axis.scale = function (_) {
    return arguments.length ? (scale = _, axis) : scale;
  };
  axis.ticks = function () {
    return (tickArguments = Array.from(arguments), axis);
  };
  axis.tickArguments = function (_) {
    return arguments.length ? (tickArguments = _ == null ? [] : Array.from(_), axis) : tickArguments.slice();
  };
  axis.tickValues = function (_) {
    return arguments.length ? (tickValues = _ == null ? null : Array.from(_), axis) : tickValues && tickValues.slice();
  };
  axis.tickFormat = function (_) {
    return arguments.length ? (tickFormat = _, axis) : tickFormat;
  };
  axis.tickSize = function (_) {
    return arguments.length ? (tickSizeInner = tickSizeOuter = +_, axis) : tickSizeInner;
  };
  axis.tickSizeInner = function (_) {
    return arguments.length ? (tickSizeInner = +_, axis) : tickSizeInner;
  };
  axis.tickSizeOuter = function (_) {
    return arguments.length ? (tickSizeOuter = +_, axis) : tickSizeOuter;
  };
  axis.tickPadding = function (_) {
    return arguments.length ? (tickPadding = +_, axis) : tickPadding;
  };
  axis.offset = function (_) {
    return arguments.length ? (offset = +_, axis) : offset;
  };
  return axis;
}
function $fc92a4fc87273d9f03f319de673f1ae5$export$axisTop(scale) {
  return $fc92a4fc87273d9f03f319de673f1ae5$var$axis($fc92a4fc87273d9f03f319de673f1ae5$var$top, scale);
}
function $fc92a4fc87273d9f03f319de673f1ae5$export$axisRight(scale) {
  return $fc92a4fc87273d9f03f319de673f1ae5$var$axis($fc92a4fc87273d9f03f319de673f1ae5$var$right, scale);
}
function $fc92a4fc87273d9f03f319de673f1ae5$export$axisBottom(scale) {
  return $fc92a4fc87273d9f03f319de673f1ae5$var$axis($fc92a4fc87273d9f03f319de673f1ae5$var$bottom, scale);
}
function $fc92a4fc87273d9f03f319de673f1ae5$export$axisLeft(scale) {
  return $fc92a4fc87273d9f03f319de673f1ae5$var$axis($fc92a4fc87273d9f03f319de673f1ae5$var$left, scale);
}
var $16441b7d508a4c53dcebf12fd3dda336$export$default = function (a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
};
var $4ec8e83e3f0cf0d30af13f2c014c01a3$export$default = function (f) {
  let delta = f;
  let compare = f;
  if (f.length === 1) {
    delta = (d, x) => f(d) - x;
    compare = $4ec8e83e3f0cf0d30af13f2c014c01a3$var$ascendingComparator(f);
  }
  function left(a, x, lo, hi) {
    if (lo == null) lo = 0;
    if (hi == null) hi = a.length;
    while (lo < hi) {
      const mid = lo + hi >>> 1;
      if (compare(a[mid], x) < 0) lo = mid + 1; else hi = mid;
    }
    return lo;
  }
  function right(a, x, lo, hi) {
    if (lo == null) lo = 0;
    if (hi == null) hi = a.length;
    while (lo < hi) {
      const mid = lo + hi >>> 1;
      if (compare(a[mid], x) > 0) hi = mid; else lo = mid + 1;
    }
    return lo;
  }
  function center(a, x, lo, hi) {
    if (lo == null) lo = 0;
    if (hi == null) hi = a.length;
    const i = left(a, x, lo, hi - 1);
    return i > lo && delta(a[i - 1], x) > -delta(a[i], x) ? i - 1 : i;
  }
  return {
    left,
    center,
    right
  };
};
function $4ec8e83e3f0cf0d30af13f2c014c01a3$var$ascendingComparator(f) {
  return (d, x) => $16441b7d508a4c53dcebf12fd3dda336$export$default(f(d), x);
}
var $53021b258affdde05a2309d10f3687b0$export$default = function (x) {
  return x === null ? NaN : +x;
};
const $b168ff69f455e8dc0a3c312794658df3$var$ascendingBisect = $4ec8e83e3f0cf0d30af13f2c014c01a3$export$default($16441b7d508a4c53dcebf12fd3dda336$export$default);
const $b168ff69f455e8dc0a3c312794658df3$export$bisectRight = $b168ff69f455e8dc0a3c312794658df3$var$ascendingBisect.right;
const $b168ff69f455e8dc0a3c312794658df3$export$bisectLeft = $b168ff69f455e8dc0a3c312794658df3$var$ascendingBisect.left;
const $b168ff69f455e8dc0a3c312794658df3$export$bisectCenter = $4ec8e83e3f0cf0d30af13f2c014c01a3$export$default($53021b258affdde05a2309d10f3687b0$export$default).center;
var $f19fa815062ff95ee37cbf6a990ae6c6$var$e10 = Math.sqrt(50), $f19fa815062ff95ee37cbf6a990ae6c6$var$e5 = Math.sqrt(10), $f19fa815062ff95ee37cbf6a990ae6c6$var$e2 = Math.sqrt(2);
var $f19fa815062ff95ee37cbf6a990ae6c6$export$default = function (start, stop, count) {
  var reverse, i = -1, n, ticks, step;
  (stop = +stop, start = +start, count = +count);
  if (start === stop && count > 0) return [start];
  if (reverse = stop < start) (n = start, start = stop, stop = n);
  if ((step = $f19fa815062ff95ee37cbf6a990ae6c6$export$tickIncrement(start, stop, count)) === 0 || !isFinite(step)) return [];
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
};
function $f19fa815062ff95ee37cbf6a990ae6c6$export$tickIncrement(start, stop, count) {
  var step = (stop - start) / Math.max(0, count), power = Math.floor(Math.log(step) / Math.LN10), error = step / Math.pow(10, power);
  return power >= 0 ? (error >= $f19fa815062ff95ee37cbf6a990ae6c6$var$e10 ? 10 : error >= $f19fa815062ff95ee37cbf6a990ae6c6$var$e5 ? 5 : error >= $f19fa815062ff95ee37cbf6a990ae6c6$var$e2 ? 2 : 1) * Math.pow(10, power) : -Math.pow(10, -power) / (error >= $f19fa815062ff95ee37cbf6a990ae6c6$var$e10 ? 10 : error >= $f19fa815062ff95ee37cbf6a990ae6c6$var$e5 ? 5 : error >= $f19fa815062ff95ee37cbf6a990ae6c6$var$e2 ? 2 : 1);
}
function $f19fa815062ff95ee37cbf6a990ae6c6$export$tickStep(start, stop, count) {
  var step0 = Math.abs(stop - start) / Math.max(0, count), step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)), error = step0 / step1;
  if (error >= $f19fa815062ff95ee37cbf6a990ae6c6$var$e10) step1 *= 10; else if (error >= $f19fa815062ff95ee37cbf6a990ae6c6$var$e5) step1 *= 5; else if (error >= $f19fa815062ff95ee37cbf6a990ae6c6$var$e2) step1 *= 2;
  return stop < start ? -step1 : step1;
}
var $f1456d10ee1aef1996ac6bec61cdf86a$export$default = function (constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
};
function $f1456d10ee1aef1996ac6bec61cdf86a$export$extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition) prototype[key] = definition[key];
  return prototype;
}
function $fc15a99a7e786d87cfae4547127af48b$export$Color() {}
var $fc15a99a7e786d87cfae4547127af48b$export$darker = 0.7;
var $fc15a99a7e786d87cfae4547127af48b$export$brighter = 1 / $fc15a99a7e786d87cfae4547127af48b$export$darker;
var $fc15a99a7e786d87cfae4547127af48b$var$reI = "\\s*([+-]?\\d+)\\s*", $fc15a99a7e786d87cfae4547127af48b$var$reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*", $fc15a99a7e786d87cfae4547127af48b$var$reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*", $fc15a99a7e786d87cfae4547127af48b$var$reHex = /^#([0-9a-f]{3,8})$/, $fc15a99a7e786d87cfae4547127af48b$var$reRgbInteger = new RegExp("^rgb\\(" + [$fc15a99a7e786d87cfae4547127af48b$var$reI, $fc15a99a7e786d87cfae4547127af48b$var$reI, $fc15a99a7e786d87cfae4547127af48b$var$reI] + "\\)$"), $fc15a99a7e786d87cfae4547127af48b$var$reRgbPercent = new RegExp("^rgb\\(" + [$fc15a99a7e786d87cfae4547127af48b$var$reP, $fc15a99a7e786d87cfae4547127af48b$var$reP, $fc15a99a7e786d87cfae4547127af48b$var$reP] + "\\)$"), $fc15a99a7e786d87cfae4547127af48b$var$reRgbaInteger = new RegExp("^rgba\\(" + [$fc15a99a7e786d87cfae4547127af48b$var$reI, $fc15a99a7e786d87cfae4547127af48b$var$reI, $fc15a99a7e786d87cfae4547127af48b$var$reI, $fc15a99a7e786d87cfae4547127af48b$var$reN] + "\\)$"), $fc15a99a7e786d87cfae4547127af48b$var$reRgbaPercent = new RegExp("^rgba\\(" + [$fc15a99a7e786d87cfae4547127af48b$var$reP, $fc15a99a7e786d87cfae4547127af48b$var$reP, $fc15a99a7e786d87cfae4547127af48b$var$reP, $fc15a99a7e786d87cfae4547127af48b$var$reN] + "\\)$"), $fc15a99a7e786d87cfae4547127af48b$var$reHslPercent = new RegExp("^hsl\\(" + [$fc15a99a7e786d87cfae4547127af48b$var$reN, $fc15a99a7e786d87cfae4547127af48b$var$reP, $fc15a99a7e786d87cfae4547127af48b$var$reP] + "\\)$"), $fc15a99a7e786d87cfae4547127af48b$var$reHslaPercent = new RegExp("^hsla\\(" + [$fc15a99a7e786d87cfae4547127af48b$var$reN, $fc15a99a7e786d87cfae4547127af48b$var$reP, $fc15a99a7e786d87cfae4547127af48b$var$reP, $fc15a99a7e786d87cfae4547127af48b$var$reN] + "\\)$");
var $fc15a99a7e786d87cfae4547127af48b$var$named = {
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
$f1456d10ee1aef1996ac6bec61cdf86a$export$default($fc15a99a7e786d87cfae4547127af48b$export$Color, $fc15a99a7e786d87cfae4547127af48b$export$default, {
  copy: function (channels) {
    return Object.assign(new this.constructor(), this, channels);
  },
  displayable: function () {
    return this.rgb().displayable();
  },
  hex: $fc15a99a7e786d87cfae4547127af48b$var$color_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: $fc15a99a7e786d87cfae4547127af48b$var$color_formatHex,
  formatHsl: $fc15a99a7e786d87cfae4547127af48b$var$color_formatHsl,
  formatRgb: $fc15a99a7e786d87cfae4547127af48b$var$color_formatRgb,
  toString: $fc15a99a7e786d87cfae4547127af48b$var$color_formatRgb
});
function $fc15a99a7e786d87cfae4547127af48b$var$color_formatHex() {
  return this.rgb().formatHex();
}
function $fc15a99a7e786d87cfae4547127af48b$var$color_formatHsl() {
  return $fc15a99a7e786d87cfae4547127af48b$export$hslConvert(this).formatHsl();
}
function $fc15a99a7e786d87cfae4547127af48b$var$color_formatRgb() {
  return this.rgb().formatRgb();
}
function $fc15a99a7e786d87cfae4547127af48b$export$default(format) {
  var m, l;
  format = (format + "").trim().toLowerCase();
  return (m = $fc15a99a7e786d87cfae4547127af48b$var$reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? $fc15a99a7e786d87cfae4547127af48b$var$rgbn(m) : // #ff0000
  l === 3 ? new $fc15a99a7e786d87cfae4547127af48b$export$Rgb(m >> 8 & 0xf | m >> 4 & 0xf0, m >> 4 & 0xf | m & 0xf0, (m & 0xf) << 4 | m & 0xf, 1) : // #f00
  l === 8 ? $fc15a99a7e786d87cfae4547127af48b$var$rgba(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) : // #ff000000
  l === 4 ? $fc15a99a7e786d87cfae4547127af48b$var$rgba(m >> 12 & 0xf | m >> 8 & 0xf0, m >> 8 & 0xf | m >> 4 & 0xf0, m >> 4 & 0xf | m & 0xf0, ((m & 0xf) << 4 | m & 0xf) / 0xff) : // #f000
  null) : // invalid hex
  (m = $fc15a99a7e786d87cfae4547127af48b$var$reRgbInteger.exec(format)) ? new $fc15a99a7e786d87cfae4547127af48b$export$Rgb(m[1], m[2], m[3], 1) : // rgb(255, 0, 0)
  (m = $fc15a99a7e786d87cfae4547127af48b$var$reRgbPercent.exec(format)) ? new $fc15a99a7e786d87cfae4547127af48b$export$Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) : // rgb(100%, 0%, 0%)
  (m = $fc15a99a7e786d87cfae4547127af48b$var$reRgbaInteger.exec(format)) ? $fc15a99a7e786d87cfae4547127af48b$var$rgba(m[1], m[2], m[3], m[4]) : // rgba(255, 0, 0, 1)
  (m = $fc15a99a7e786d87cfae4547127af48b$var$reRgbaPercent.exec(format)) ? $fc15a99a7e786d87cfae4547127af48b$var$rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) : // rgb(100%, 0%, 0%, 1)
  (m = $fc15a99a7e786d87cfae4547127af48b$var$reHslPercent.exec(format)) ? $fc15a99a7e786d87cfae4547127af48b$var$hsla(m[1], m[2] / 100, m[3] / 100, 1) : // hsl(120, 50%, 50%)
  (m = $fc15a99a7e786d87cfae4547127af48b$var$reHslaPercent.exec(format)) ? $fc15a99a7e786d87cfae4547127af48b$var$hsla(m[1], m[2] / 100, m[3] / 100, m[4]) : // hsla(120, 50%, 50%, 1)
  $fc15a99a7e786d87cfae4547127af48b$var$named.hasOwnProperty(format) ? $fc15a99a7e786d87cfae4547127af48b$var$rgbn($fc15a99a7e786d87cfae4547127af48b$var$named[format]) : // eslint-disable-line no-prototype-builtins
  format === "transparent" ? new $fc15a99a7e786d87cfae4547127af48b$export$Rgb(NaN, NaN, NaN, 0) : null;
}
function $fc15a99a7e786d87cfae4547127af48b$var$rgbn(n) {
  return new $fc15a99a7e786d87cfae4547127af48b$export$Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
}
function $fc15a99a7e786d87cfae4547127af48b$var$rgba(r, g, b, a) {
  if (a <= 0) r = g = b = NaN;
  return new $fc15a99a7e786d87cfae4547127af48b$export$Rgb(r, g, b, a);
}
function $fc15a99a7e786d87cfae4547127af48b$export$rgbConvert(o) {
  if (!(o instanceof $fc15a99a7e786d87cfae4547127af48b$export$Color)) o = $fc15a99a7e786d87cfae4547127af48b$export$default(o);
  if (!o) return new $fc15a99a7e786d87cfae4547127af48b$export$Rgb();
  o = o.rgb();
  return new $fc15a99a7e786d87cfae4547127af48b$export$Rgb(o.r, o.g, o.b, o.opacity);
}
function $fc15a99a7e786d87cfae4547127af48b$export$rgb(r, g, b, opacity) {
  return arguments.length === 1 ? $fc15a99a7e786d87cfae4547127af48b$export$rgbConvert(r) : new $fc15a99a7e786d87cfae4547127af48b$export$Rgb(r, g, b, opacity == null ? 1 : opacity);
}
function $fc15a99a7e786d87cfae4547127af48b$export$Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}
$f1456d10ee1aef1996ac6bec61cdf86a$export$default($fc15a99a7e786d87cfae4547127af48b$export$Rgb, $fc15a99a7e786d87cfae4547127af48b$export$rgb, $f1456d10ee1aef1996ac6bec61cdf86a$export$extend($fc15a99a7e786d87cfae4547127af48b$export$Color, {
  brighter: function (k) {
    k = k == null ? $fc15a99a7e786d87cfae4547127af48b$export$brighter : Math.pow($fc15a99a7e786d87cfae4547127af48b$export$brighter, k);
    return new $fc15a99a7e786d87cfae4547127af48b$export$Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker: function (k) {
    k = k == null ? $fc15a99a7e786d87cfae4547127af48b$export$darker : Math.pow($fc15a99a7e786d87cfae4547127af48b$export$darker, k);
    return new $fc15a99a7e786d87cfae4547127af48b$export$Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb: function () {
    return this;
  },
  displayable: function () {
    return -0.5 <= this.r && this.r < 255.5 && (-0.5 <= this.g && this.g < 255.5) && (-0.5 <= this.b && this.b < 255.5) && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: $fc15a99a7e786d87cfae4547127af48b$var$rgb_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: $fc15a99a7e786d87cfae4547127af48b$var$rgb_formatHex,
  formatRgb: $fc15a99a7e786d87cfae4547127af48b$var$rgb_formatRgb,
  toString: $fc15a99a7e786d87cfae4547127af48b$var$rgb_formatRgb
}));
function $fc15a99a7e786d87cfae4547127af48b$var$rgb_formatHex() {
  return "#" + $fc15a99a7e786d87cfae4547127af48b$var$hex(this.r) + $fc15a99a7e786d87cfae4547127af48b$var$hex(this.g) + $fc15a99a7e786d87cfae4547127af48b$var$hex(this.b);
}
function $fc15a99a7e786d87cfae4547127af48b$var$rgb_formatRgb() {
  var a = this.opacity;
  a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
  return (a === 1 ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (a === 1 ? ")" : ", " + a + ")");
}
function $fc15a99a7e786d87cfae4547127af48b$var$hex(value) {
  value = Math.max(0, Math.min(255, Math.round(value) || 0));
  return (value < 16 ? "0" : "") + value.toString(16);
}
function $fc15a99a7e786d87cfae4547127af48b$var$hsla(h, s, l, a) {
  if (a <= 0) h = s = l = NaN; else if (l <= 0 || l >= 1) h = s = NaN; else if (s <= 0) h = NaN;
  return new $fc15a99a7e786d87cfae4547127af48b$var$Hsl(h, s, l, a);
}
function $fc15a99a7e786d87cfae4547127af48b$export$hslConvert(o) {
  if (o instanceof $fc15a99a7e786d87cfae4547127af48b$var$Hsl) return new $fc15a99a7e786d87cfae4547127af48b$var$Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof $fc15a99a7e786d87cfae4547127af48b$export$Color)) o = $fc15a99a7e786d87cfae4547127af48b$export$default(o);
  if (!o) return new $fc15a99a7e786d87cfae4547127af48b$var$Hsl();
  if (o instanceof $fc15a99a7e786d87cfae4547127af48b$var$Hsl) return o;
  o = o.rgb();
  var r = o.r / 255, g = o.g / 255, b = o.b / 255, min = Math.min(r, g, b), max = Math.max(r, g, b), h = NaN, s = max - min, l = (max + min) / 2;
  if (s) {
    if (r === max) h = (g - b) / s + (g < b) * 6; else if (g === max) h = (b - r) / s + 2; else h = (r - g) / s + 4;
    s /= l < 0.5 ? max + min : 2 - max - min;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }
  return new $fc15a99a7e786d87cfae4547127af48b$var$Hsl(h, s, l, o.opacity);
}
function $fc15a99a7e786d87cfae4547127af48b$export$hsl(h, s, l, opacity) {
  return arguments.length === 1 ? $fc15a99a7e786d87cfae4547127af48b$export$hslConvert(h) : new $fc15a99a7e786d87cfae4547127af48b$var$Hsl(h, s, l, opacity == null ? 1 : opacity);
}
function $fc15a99a7e786d87cfae4547127af48b$var$Hsl(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}
$f1456d10ee1aef1996ac6bec61cdf86a$export$default($fc15a99a7e786d87cfae4547127af48b$var$Hsl, $fc15a99a7e786d87cfae4547127af48b$export$hsl, $f1456d10ee1aef1996ac6bec61cdf86a$export$extend($fc15a99a7e786d87cfae4547127af48b$export$Color, {
  brighter: function (k) {
    k = k == null ? $fc15a99a7e786d87cfae4547127af48b$export$brighter : Math.pow($fc15a99a7e786d87cfae4547127af48b$export$brighter, k);
    return new $fc15a99a7e786d87cfae4547127af48b$var$Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function (k) {
    k = k == null ? $fc15a99a7e786d87cfae4547127af48b$export$darker : Math.pow($fc15a99a7e786d87cfae4547127af48b$export$darker, k);
    return new $fc15a99a7e786d87cfae4547127af48b$var$Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function () {
    var h = this.h % 360 + (this.h < 0) * 360, s = isNaN(h) || isNaN(this.s) ? 0 : this.s, l = this.l, m2 = l + (l < 0.5 ? l : 1 - l) * s, m1 = 2 * l - m2;
    return new $fc15a99a7e786d87cfae4547127af48b$export$Rgb($fc15a99a7e786d87cfae4547127af48b$var$hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2), $fc15a99a7e786d87cfae4547127af48b$var$hsl2rgb(h, m1, m2), $fc15a99a7e786d87cfae4547127af48b$var$hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2), this.opacity);
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
function $fc15a99a7e786d87cfae4547127af48b$var$hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
}
function $a05f6ec8f2df00d1530d329c18552e6d$export$basis(t1, v0, v1, v2, v3) {
  var t2 = t1 * t1, t3 = t2 * t1;
  return ((1 - 3 * t1 + 3 * t2 - t3) * v0 + (4 - 6 * t2 + 3 * t3) * v1 + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2 + t3 * v3) / 6;
}
var $a05f6ec8f2df00d1530d329c18552e6d$export$default = function (values) {
  var n = values.length - 1;
  return function (t) {
    var i = t <= 0 ? t = 0 : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n), v1 = values[i], v2 = values[i + 1], v0 = i > 0 ? values[i - 1] : 2 * v1 - v2, v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
    return $a05f6ec8f2df00d1530d329c18552e6d$export$basis((t - i / n) * n, v0, v1, v2, v3);
  };
};
var $11aa7ff35dff1e357d94a5d42be52156$export$default = function (values) {
  var n = values.length;
  return function (t) {
    var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n), v0 = values[(i + n - 1) % n], v1 = values[i % n], v2 = values[(i + 1) % n], v3 = values[(i + 2) % n];
    return $a05f6ec8f2df00d1530d329c18552e6d$export$basis((t - i / n) * n, v0, v1, v2, v3);
  };
};
var $878940e4c8a4e0e56cd554d4fc7fd10e$export$default = x => () => x;
function $49c9d4b1d6b8b7790401960a8e014a5e$var$linear(a, d) {
  return function (t) {
    return a + t * d;
  };
}
function $49c9d4b1d6b8b7790401960a8e014a5e$var$exponential(a, b, y) {
  return (a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function (t) {
    return Math.pow(a + t * b, y);
  });
}
function $49c9d4b1d6b8b7790401960a8e014a5e$export$gamma(y) {
  return (y = +y) === 1 ? $49c9d4b1d6b8b7790401960a8e014a5e$export$default : function (a, b) {
    return b - a ? $49c9d4b1d6b8b7790401960a8e014a5e$var$exponential(a, b, y) : $878940e4c8a4e0e56cd554d4fc7fd10e$export$default(isNaN(a) ? b : a);
  };
}
function $49c9d4b1d6b8b7790401960a8e014a5e$export$default(a, b) {
  var d = b - a;
  return d ? $49c9d4b1d6b8b7790401960a8e014a5e$var$linear(a, d) : $878940e4c8a4e0e56cd554d4fc7fd10e$export$default(isNaN(a) ? b : a);
}
var $66e2e7cd955d87b0ffa7a80e30103808$export$default = (function rgbGamma(y) {
  var color = $49c9d4b1d6b8b7790401960a8e014a5e$export$gamma(y);
  function rgb(start, end) {
    var r = color((start = $fc15a99a7e786d87cfae4547127af48b$export$rgb(start)).r, (end = $fc15a99a7e786d87cfae4547127af48b$export$rgb(end)).r), g = color(start.g, end.g), b = color(start.b, end.b), opacity = $49c9d4b1d6b8b7790401960a8e014a5e$export$default(start.opacity, end.opacity);
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
function $66e2e7cd955d87b0ffa7a80e30103808$var$rgbSpline(spline) {
  return function (colors) {
    var n = colors.length, r = new Array(n), g = new Array(n), b = new Array(n), i, color;
    for (i = 0; i < n; ++i) {
      color = $fc15a99a7e786d87cfae4547127af48b$export$rgb(colors[i]);
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
var $66e2e7cd955d87b0ffa7a80e30103808$export$rgbBasis = $66e2e7cd955d87b0ffa7a80e30103808$var$rgbSpline($a05f6ec8f2df00d1530d329c18552e6d$export$default);
var $66e2e7cd955d87b0ffa7a80e30103808$export$rgbBasisClosed = $66e2e7cd955d87b0ffa7a80e30103808$var$rgbSpline($11aa7ff35dff1e357d94a5d42be52156$export$default);
var $f323896452e8c0c6d00d45445d5e76d0$export$default = function (a, b) {
  if (!b) b = [];
  var n = a ? Math.min(b.length, a.length) : 0, c = b.slice(), i;
  return function (t) {
    for (i = 0; i < n; ++i) c[i] = a[i] * (1 - t) + b[i] * t;
    return c;
  };
};
function $f323896452e8c0c6d00d45445d5e76d0$export$isNumberArray(x) {
  return ArrayBuffer.isView(x) && !(x instanceof DataView);
}
function $17f612bb8789f95679d46389acbccbfb$export$genericArray(a, b) {
  var nb = b ? b.length : 0, na = a ? Math.min(nb, a.length) : 0, x = new Array(na), c = new Array(nb), i;
  for (i = 0; i < na; ++i) x[i] = $3a8dc8af32cf3f5e1a6eb52164961f0f$export$default(a[i], b[i]);
  for (; i < nb; ++i) c[i] = b[i];
  return function (t) {
    for (i = 0; i < na; ++i) c[i] = x[i](t);
    return c;
  };
}
var $f9440d22250630d8a594756e37491251$export$default = function (a, b) {
  var d = new Date();
  return (a = +a, b = +b, function (t) {
    return (d.setTime(a * (1 - t) + b * t), d);
  });
};
var $bab2c126e1b0025ab4a322e05eb981eb$export$default = function (a, b) {
  return (a = +a, b = +b, function (t) {
    return a * (1 - t) + b * t;
  });
};
var $0568a92ccc48e6234bf76e015f0836fd$export$default = function (a, b) {
  var i = {}, c = {}, k;
  if (a === null || typeof a !== "object") a = {};
  if (b === null || typeof b !== "object") b = {};
  for (k in b) {
    if ((k in a)) {
      i[k] = $3a8dc8af32cf3f5e1a6eb52164961f0f$export$default(a[k], b[k]);
    } else {
      c[k] = b[k];
    }
  }
  return function (t) {
    for (k in i) c[k] = i[k](t);
    return c;
  };
};
var $4ee8d00e86b754624e3dd9db3fada142$var$reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, $4ee8d00e86b754624e3dd9db3fada142$var$reB = new RegExp($4ee8d00e86b754624e3dd9db3fada142$var$reA.source, "g");
function $4ee8d00e86b754624e3dd9db3fada142$var$zero(b) {
  return function () {
    return b;
  };
}
function $4ee8d00e86b754624e3dd9db3fada142$var$one(b) {
  return function (t) {
    return b(t) + "";
  };
}
var $4ee8d00e86b754624e3dd9db3fada142$export$default = function (a, b) {
  var bi = $4ee8d00e86b754624e3dd9db3fada142$var$reA.lastIndex = $4ee8d00e86b754624e3dd9db3fada142$var$reB.lastIndex = 0, // scan index for next number in b
  am, // current match in a
  bm, // current match in b
  bs, // string preceding current number in b, if any
  i = -1, // index in s
  s = [], // string constants and placeholders
  q = [];
  // number interpolators
  // Coerce inputs to strings.
  (a = a + "", b = b + "");
  // Interpolate pairs of numbers in a & b.
  while ((am = $4ee8d00e86b754624e3dd9db3fada142$var$reA.exec(a)) && (bm = $4ee8d00e86b754624e3dd9db3fada142$var$reB.exec(b))) {
    if ((bs = bm.index) > bi) {
      // a string precedes the next number in b
      bs = b.slice(bi, bs);
      if (s[i]) s[i] += bs; else // coalesce with previous string
      s[++i] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) {
      // numbers in a & b match
      if (s[i]) s[i] += bm; else // coalesce with previous string
      s[++i] = bm;
    } else {
      // interpolate non-matching numbers
      s[++i] = null;
      q.push({
        i: i,
        x: $bab2c126e1b0025ab4a322e05eb981eb$export$default(am, bm)
      });
    }
    bi = $4ee8d00e86b754624e3dd9db3fada142$var$reB.lastIndex;
  }
  // Add remains of b.
  if (bi < b.length) {
    bs = b.slice(bi);
    if (s[i]) s[i] += bs; else // coalesce with previous string
    s[++i] = bs;
  }
  // Special optimization for only a single match.
  // Otherwise, interpolate each of the numbers and rejoin the string.
  return s.length < 2 ? q[0] ? $4ee8d00e86b754624e3dd9db3fada142$var$one(q[0].x) : $4ee8d00e86b754624e3dd9db3fada142$var$zero(b) : (b = q.length, function (t) {
    for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
    return s.join("");
  });
};
var $3a8dc8af32cf3f5e1a6eb52164961f0f$export$default = function (a, b) {
  var t = typeof b, c;
  return b == null || t === "boolean" ? $878940e4c8a4e0e56cd554d4fc7fd10e$export$default(b) : (t === "number" ? $bab2c126e1b0025ab4a322e05eb981eb$export$default : t === "string" ? (c = $fc15a99a7e786d87cfae4547127af48b$export$default(b)) ? (b = c, $66e2e7cd955d87b0ffa7a80e30103808$export$default) : $4ee8d00e86b754624e3dd9db3fada142$export$default : b instanceof $fc15a99a7e786d87cfae4547127af48b$export$default ? $66e2e7cd955d87b0ffa7a80e30103808$export$default : b instanceof Date ? $f9440d22250630d8a594756e37491251$export$default : $f323896452e8c0c6d00d45445d5e76d0$export$isNumberArray(b) ? $f323896452e8c0c6d00d45445d5e76d0$export$default : Array.isArray(b) ? $17f612bb8789f95679d46389acbccbfb$export$genericArray : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? $0568a92ccc48e6234bf76e015f0836fd$export$default : $bab2c126e1b0025ab4a322e05eb981eb$export$default)(a, b);
};
var $cdaaf936673d9fd3ceeef8e1979af02a$export$default = function (a, b) {
  return (a = +a, b = +b, function (t) {
    return Math.round(a * (1 - t) + b * t);
  });
};
function $32f5540306ed89bc10a00a3d4c1db5af$export$default(x) {
  return function () {
    return x;
  };
}
function $ec51800b7254a5088f6265a2b6884956$export$default(x) {
  return +x;
}
var $607b6fefcff90b54f9ab63271741f743$var$unit = [0, 1];
function $607b6fefcff90b54f9ab63271741f743$export$identity(x) {
  return x;
}
function $607b6fefcff90b54f9ab63271741f743$var$normalize(a, b) {
  return (b -= a = +a) ? function (x) {
    return (x - a) / b;
  } : $32f5540306ed89bc10a00a3d4c1db5af$export$default(isNaN(b) ? NaN : 0.5);
}
function $607b6fefcff90b54f9ab63271741f743$var$clamper(a, b) {
  var t;
  if (a > b) (t = a, a = b, b = t);
  return function (x) {
    return Math.max(a, Math.min(b, x));
  };
}
// normalize(a, b)(x) takes a domain value x in [a,b] and returns the corresponding parameter t in [0,1].
// interpolate(a, b)(t) takes a parameter t in [0,1] and returns the corresponding range value x in [a,b].
function $607b6fefcff90b54f9ab63271741f743$var$bimap(domain, range, interpolate) {
  var d0 = domain[0], d1 = domain[1], r0 = range[0], r1 = range[1];
  if (d1 < d0) (d0 = $607b6fefcff90b54f9ab63271741f743$var$normalize(d1, d0), r0 = interpolate(r1, r0)); else (d0 = $607b6fefcff90b54f9ab63271741f743$var$normalize(d0, d1), r0 = interpolate(r0, r1));
  return function (x) {
    return r0(d0(x));
  };
}
function $607b6fefcff90b54f9ab63271741f743$var$polymap(domain, range, interpolate) {
  var j = Math.min(domain.length, range.length) - 1, d = new Array(j), r = new Array(j), i = -1;
  // Reverse descending domains.
  if (domain[j] < domain[0]) {
    domain = domain.slice().reverse();
    range = range.slice().reverse();
  }
  while (++i < j) {
    d[i] = $607b6fefcff90b54f9ab63271741f743$var$normalize(domain[i], domain[i + 1]);
    r[i] = interpolate(range[i], range[i + 1]);
  }
  return function (x) {
    var i = $b168ff69f455e8dc0a3c312794658df3$export$bisectRight(domain, x, 1, j) - 1;
    return r[i](d[i](x));
  };
}
function $607b6fefcff90b54f9ab63271741f743$export$copy(source, target) {
  return target.domain(source.domain()).range(source.range()).interpolate(source.interpolate()).clamp(source.clamp()).unknown(source.unknown());
}
function $607b6fefcff90b54f9ab63271741f743$export$transformer() {
  var domain = $607b6fefcff90b54f9ab63271741f743$var$unit, range = $607b6fefcff90b54f9ab63271741f743$var$unit, interpolate = $3a8dc8af32cf3f5e1a6eb52164961f0f$export$default, transform, untransform, unknown, clamp = $607b6fefcff90b54f9ab63271741f743$export$identity, piecewise, output, input;
  function rescale() {
    var n = Math.min(domain.length, range.length);
    if (clamp !== $607b6fefcff90b54f9ab63271741f743$export$identity) clamp = $607b6fefcff90b54f9ab63271741f743$var$clamper(domain[0], domain[n - 1]);
    piecewise = n > 2 ? $607b6fefcff90b54f9ab63271741f743$var$polymap : $607b6fefcff90b54f9ab63271741f743$var$bimap;
    output = input = null;
    return scale;
  }
  function scale(x) {
    return x == null || isNaN(x = +x) ? unknown : (output || (output = piecewise(domain.map(transform), range, interpolate)))(transform(clamp(x)));
  }
  scale.invert = function (y) {
    return clamp(untransform((input || (input = piecewise(range, domain.map(transform), $bab2c126e1b0025ab4a322e05eb981eb$export$default)))(y)));
  };
  scale.domain = function (_) {
    return arguments.length ? (domain = Array.from(_, $ec51800b7254a5088f6265a2b6884956$export$default), rescale()) : domain.slice();
  };
  scale.range = function (_) {
    return arguments.length ? (range = Array.from(_), rescale()) : range.slice();
  };
  scale.rangeRound = function (_) {
    return (range = Array.from(_), interpolate = $cdaaf936673d9fd3ceeef8e1979af02a$export$default, rescale());
  };
  scale.clamp = function (_) {
    return arguments.length ? (clamp = _ ? true : $607b6fefcff90b54f9ab63271741f743$export$identity, rescale()) : clamp !== $607b6fefcff90b54f9ab63271741f743$export$identity;
  };
  scale.interpolate = function (_) {
    return arguments.length ? (interpolate = _, rescale()) : interpolate;
  };
  scale.unknown = function (_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };
  return function (t, u) {
    (transform = t, untransform = u);
    return rescale();
  };
}
function $607b6fefcff90b54f9ab63271741f743$export$default() {
  return $607b6fefcff90b54f9ab63271741f743$export$transformer()($607b6fefcff90b54f9ab63271741f743$export$identity, $607b6fefcff90b54f9ab63271741f743$export$identity);
}
function $cdad4d8754af9ae4ed84cc82f65cd959$export$initRange(domain, range) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(domain);
      break;
    default:
      this.range(range).domain(domain);
      break;
  }
  return this;
}
var $18b31ba9a753b6a9297ffa45fbe9383b$export$default = function (x) {
  return Math.abs(x = Math.round(x)) >= 1e21 ? x.toLocaleString("en").replace(/,/g, "") : x.toString(10);
};
// Computes the decimal coefficient and exponent of the specified number x with
// significant digits p, where x is positive and p is in [1, 21] or undefined.
// For example, formatDecimalParts(1.23) returns ["123", 0].
function $18b31ba9a753b6a9297ffa45fbe9383b$export$formatDecimalParts(x, p) {
  if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null;
  // NaN, ±Infinity
  var i, coefficient = x.slice(0, i);
  // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
  // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).
  return [coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient, +x.slice(i + 1)];
}
var $5da80fa4dc66d811f779d3b7db35acac$export$default = function (x) {
  return (x = $18b31ba9a753b6a9297ffa45fbe9383b$export$formatDecimalParts(Math.abs(x)), x ? x[1] : NaN);
};
var $a2beca6bd9eada2f5396ab0ac5bb390e$export$default = function (grouping, thousands) {
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
var $471ef9e062b15db6ee89ee8a6449c999$export$default = function (numerals) {
  return function (value) {
    return value.replace(/[0-9]/g, function (i) {
      return numerals[+i];
    });
  };
};
// [[fill]align][sign][symbol][0][width][,][.precision][~][type]
var $8f635242091ca5e24c841194aabf7e41$var$re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function $8f635242091ca5e24c841194aabf7e41$export$default(specifier) {
  if (!(match = $8f635242091ca5e24c841194aabf7e41$var$re.exec(specifier))) throw new Error("invalid format: " + specifier);
  var match;
  return new $8f635242091ca5e24c841194aabf7e41$export$FormatSpecifier({
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
$8f635242091ca5e24c841194aabf7e41$export$default.prototype = $8f635242091ca5e24c841194aabf7e41$export$FormatSpecifier.prototype;
// instanceof
function $8f635242091ca5e24c841194aabf7e41$export$FormatSpecifier(specifier) {
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
$8f635242091ca5e24c841194aabf7e41$export$FormatSpecifier.prototype.toString = function () {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === undefined ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === undefined ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
// Trims insignificant zeros, e.g., replaces 1.2000k with 1.2k.
var $81431e481bcc0595e2d8b7a2d070532c$export$default = function (s) {
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
var $cee3acdc01633320f1eba8e1cdd6d21e$export$prefixExponent;
var $cee3acdc01633320f1eba8e1cdd6d21e$export$default = function (x, p) {
  var d = $18b31ba9a753b6a9297ffa45fbe9383b$export$formatDecimalParts(x, p);
  if (!d) return x + "";
  var coefficient = d[0], exponent = d[1], i = exponent - ($cee3acdc01633320f1eba8e1cdd6d21e$export$prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1, n = coefficient.length;
  return i === n ? coefficient : i > n ? coefficient + new Array(i - n + 1).join("0") : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i) : "0." + new Array(1 - i).join("0") + $18b31ba9a753b6a9297ffa45fbe9383b$export$formatDecimalParts(x, Math.max(0, p + i - 1))[0];
};
var $13996174eec3d482232522ebbc3b45f9$export$default = function (x, p) {
  var d = $18b31ba9a753b6a9297ffa45fbe9383b$export$formatDecimalParts(x, p);
  if (!d) return x + "";
  var coefficient = d[0], exponent = d[1];
  return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1) : coefficient + new Array(exponent - coefficient.length + 2).join("0");
};
var $014afb84018666c5c4c8a1a34871b75f$export$default = {
  "%": (x, p) => (x * 100).toFixed(p),
  "b": x => Math.round(x).toString(2),
  "c": x => x + "",
  "d": $18b31ba9a753b6a9297ffa45fbe9383b$export$default,
  "e": (x, p) => x.toExponential(p),
  "f": (x, p) => x.toFixed(p),
  "g": (x, p) => x.toPrecision(p),
  "o": x => Math.round(x).toString(8),
  "p": (x, p) => $13996174eec3d482232522ebbc3b45f9$export$default(x * 100, p),
  "r": $13996174eec3d482232522ebbc3b45f9$export$default,
  "s": $cee3acdc01633320f1eba8e1cdd6d21e$export$default,
  "X": x => Math.round(x).toString(16).toUpperCase(),
  "x": x => Math.round(x).toString(16)
};
var $28a391b14d04b012807fe3c0219d59aa$export$default = function (x) {
  return x;
};
var $1c742b1e1b67bd3b4bffc5ed426393a7$var$map = Array.prototype.map, $1c742b1e1b67bd3b4bffc5ed426393a7$var$prefixes = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
var $1c742b1e1b67bd3b4bffc5ed426393a7$export$default = function (locale) {
  var group = locale.grouping === undefined || locale.thousands === undefined ? $28a391b14d04b012807fe3c0219d59aa$export$default : $a2beca6bd9eada2f5396ab0ac5bb390e$export$default($1c742b1e1b67bd3b4bffc5ed426393a7$var$map.call(locale.grouping, Number), locale.thousands + ""), currencyPrefix = locale.currency === undefined ? "" : locale.currency[0] + "", currencySuffix = locale.currency === undefined ? "" : locale.currency[1] + "", decimal = locale.decimal === undefined ? "." : locale.decimal + "", numerals = locale.numerals === undefined ? $28a391b14d04b012807fe3c0219d59aa$export$default : $471ef9e062b15db6ee89ee8a6449c999$export$default($1c742b1e1b67bd3b4bffc5ed426393a7$var$map.call(locale.numerals, String)), percent = locale.percent === undefined ? "%" : locale.percent + "", minus = locale.minus === undefined ? "−" : locale.minus + "", nan = locale.nan === undefined ? "NaN" : locale.nan + "";
  function newFormat(specifier) {
    specifier = $8f635242091ca5e24c841194aabf7e41$export$default(specifier);
    var fill = specifier.fill, align = specifier.align, sign = specifier.sign, symbol = specifier.symbol, zero = specifier.zero, width = specifier.width, comma = specifier.comma, precision = specifier.precision, trim = specifier.trim, type = specifier.type;
    // The "n" type is an alias for ",g".
    if (type === "n") (comma = true, type = "g"); else // The "" type, and any invalid type, is an alias for ".12~g".
    if (!$014afb84018666c5c4c8a1a34871b75f$export$default[type]) (precision === undefined && (precision = 12), trim = true, type = "g");
    // If zero fill is specified, padding goes after sign and before digits.
    if (zero || fill === "0" && align === "=") (zero = true, fill = "0", align = "=");
    // Compute the prefix and suffix.
    // For SI-prefix, the suffix is lazily computed.
    var prefix = symbol === "$" ? currencyPrefix : symbol === "#" && (/[boxX]/).test(type) ? "0" + type.toLowerCase() : "", suffix = symbol === "$" ? currencySuffix : (/[%p]/).test(type) ? percent : "";
    // What format function should we use?
    // Is this an integer type?
    // Can this type generate exponential notation?
    var formatType = $014afb84018666c5c4c8a1a34871b75f$export$default[type], maybeSuffix = (/[defgprs%]/).test(type);
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
        if (trim) value = $81431e481bcc0595e2d8b7a2d070532c$export$default(value);
        // If a negative value rounds to zero after formatting, and no explicit positive sign is requested, hide the sign.
        if (valueNegative && +value === 0 && sign !== "+") valueNegative = false;
        // Compute the prefix and suffix.
        valuePrefix = (valueNegative ? sign === "(" ? sign : minus : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
        valueSuffix = (type === "s" ? $1c742b1e1b67bd3b4bffc5ed426393a7$var$prefixes[8 + $cee3acdc01633320f1eba8e1cdd6d21e$export$prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : "");
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
    var f = newFormat((specifier = $8f635242091ca5e24c841194aabf7e41$export$default(specifier), specifier.type = "f", specifier)), e = Math.max(-8, Math.min(8, Math.floor($5da80fa4dc66d811f779d3b7db35acac$export$default(value) / 3))) * 3, k = Math.pow(10, -e), prefix = $1c742b1e1b67bd3b4bffc5ed426393a7$var$prefixes[8 + e / 3];
    return function (value) {
      return f(k * value) + prefix;
    };
  }
  return {
    format: newFormat,
    formatPrefix: formatPrefix
  };
};
var $1132d934f31c1676b629db86ab75dad0$var$locale;
var $1132d934f31c1676b629db86ab75dad0$export$format;
var $1132d934f31c1676b629db86ab75dad0$export$formatPrefix;
$1132d934f31c1676b629db86ab75dad0$export$default({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function $1132d934f31c1676b629db86ab75dad0$export$default(definition) {
  $1132d934f31c1676b629db86ab75dad0$var$locale = $1c742b1e1b67bd3b4bffc5ed426393a7$export$default(definition);
  $1132d934f31c1676b629db86ab75dad0$export$format = $1132d934f31c1676b629db86ab75dad0$var$locale.format;
  $1132d934f31c1676b629db86ab75dad0$export$formatPrefix = $1132d934f31c1676b629db86ab75dad0$var$locale.formatPrefix;
  return $1132d934f31c1676b629db86ab75dad0$var$locale;
}
var $611e322ccb784292e1242d80080f0380$export$default = function (step) {
  return Math.max(0, -$5da80fa4dc66d811f779d3b7db35acac$export$default(Math.abs(step)));
};
var $bdbb713ae3db915a443c143fedf63548$export$default = function (step, value) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor($5da80fa4dc66d811f779d3b7db35acac$export$default(value) / 3))) * 3 - $5da80fa4dc66d811f779d3b7db35acac$export$default(Math.abs(step)));
};
var $1992c48ce9a40b253ed3d698a24776c9$export$default = function (step, max) {
  (step = Math.abs(step), max = Math.abs(max) - step);
  return Math.max(0, $5da80fa4dc66d811f779d3b7db35acac$export$default(max) - $5da80fa4dc66d811f779d3b7db35acac$export$default(step)) + 1;
};
function $3098481ac800f4d2ba984feaef23be64$export$default(start, stop, count, specifier) {
  var step = $f19fa815062ff95ee37cbf6a990ae6c6$export$tickStep(start, stop, count), precision;
  specifier = $8f635242091ca5e24c841194aabf7e41$export$default(specifier == null ? ",f" : specifier);
  switch (specifier.type) {
    case "s":
      {
        var value = Math.max(Math.abs(start), Math.abs(stop));
        if (specifier.precision == null && !isNaN(precision = $bdbb713ae3db915a443c143fedf63548$export$default(step, value))) specifier.precision = precision;
        return $1132d934f31c1676b629db86ab75dad0$export$formatPrefix(specifier, value);
      }
    case "":
    case "e":
    case "g":
    case "p":
    case "r":
      {
        if (specifier.precision == null && !isNaN(precision = $1992c48ce9a40b253ed3d698a24776c9$export$default(step, Math.max(Math.abs(start), Math.abs(stop))))) specifier.precision = precision - (specifier.type === "e");
        break;
      }
    case "f":
    case "%":
      {
        if (specifier.precision == null && !isNaN(precision = $611e322ccb784292e1242d80080f0380$export$default(step))) specifier.precision = precision - (specifier.type === "%") * 2;
        break;
      }
  }
  return $1132d934f31c1676b629db86ab75dad0$export$format(specifier);
}
function $080d1809bd453cd3f75caefaec4bfc71$export$linearish(scale) {
  var domain = scale.domain;
  scale.ticks = function (count) {
    var d = domain();
    return $f19fa815062ff95ee37cbf6a990ae6c6$export$default(d[0], d[d.length - 1], count == null ? 10 : count);
  };
  scale.tickFormat = function (count, specifier) {
    var d = domain();
    return $3098481ac800f4d2ba984feaef23be64$export$default(d[0], d[d.length - 1], count == null ? 10 : count, specifier);
  };
  scale.nice = function (count) {
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
      (step = start, start = stop, stop = step);
      (step = i0, i0 = i1, i1 = step);
    }
    while (maxIter-- > 0) {
      step = $f19fa815062ff95ee37cbf6a990ae6c6$export$tickIncrement(start, stop, count);
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
function $080d1809bd453cd3f75caefaec4bfc71$export$default() {
  var scale = $607b6fefcff90b54f9ab63271741f743$export$default();
  scale.copy = function () {
    return $607b6fefcff90b54f9ab63271741f743$export$copy(scale, $080d1809bd453cd3f75caefaec4bfc71$export$default());
  };
  $cdad4d8754af9ae4ed84cc82f65cd959$export$initRange.apply(scale, arguments);
  return $080d1809bd453cd3f75caefaec4bfc71$export$linearish(scale);
}
function $d0d289477a6ca33255833c4bb77742d4$var$none() {}
var $d0d289477a6ca33255833c4bb77742d4$export$default = function (selector) {
  return selector == null ? $d0d289477a6ca33255833c4bb77742d4$var$none : function () {
    return this.querySelector(selector);
  };
};
var $a9b3a2149b9cb80fb4bb747a1fb465fa$export$default = function (select) {
  if (typeof select !== "function") select = $d0d289477a6ca33255833c4bb77742d4$export$default(select);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if (("__data__" in node)) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
      }
    }
  }
  return new $e11f820b9e7b0b1f88e9082d7abccd0c$export$Selection(subgroups, this._parents);
};
// Given something array like (or null), returns something that is strictly an
// array. This is used to ensure that array-like objects passed to d3.selectAll
// or selection.selectAll are converted into proper arrays when creating a
// selection; we don’t ever want to create a selection backed by a live
// HTMLCollection or NodeList. However, note that selection.selectAll will use a
// static NodeList as a group, since it safely derived from querySelectorAll.
function $96806ee6a13a6f65545e2900b8c3da58$export$default(x) {
  return x == null ? [] : Array.isArray(x) ? x : Array.from(x);
}
function $d100232af3faad45849f096412144903$var$empty() {
  return [];
}
var $d100232af3faad45849f096412144903$export$default = function (selector) {
  return selector == null ? $d100232af3faad45849f096412144903$var$empty : function () {
    return this.querySelectorAll(selector);
  };
};
function $5f0d296a8c659aea796bb27d19f431a6$var$arrayAll(select) {
  return function () {
    return $96806ee6a13a6f65545e2900b8c3da58$export$default(select.apply(this, arguments));
  };
}
var $5f0d296a8c659aea796bb27d19f431a6$export$default = function (select) {
  if (typeof select === "function") select = $5f0d296a8c659aea796bb27d19f431a6$var$arrayAll(select); else select = $d100232af3faad45849f096412144903$export$default(select);
  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        subgroups.push(select.call(node, node.__data__, i, group));
        parents.push(node);
      }
    }
  }
  return new $e11f820b9e7b0b1f88e9082d7abccd0c$export$Selection(subgroups, parents);
};
var $952c0e669ed94d18944e0afa0dc24d3b$export$default = function (selector) {
  return function () {
    return this.matches(selector);
  };
};
function $952c0e669ed94d18944e0afa0dc24d3b$export$childMatcher(selector) {
  return function (node) {
    return node.matches(selector);
  };
}
var $8a48def30c0dbe4ba9d6db2c85d905b5$var$find = Array.prototype.find;
function $8a48def30c0dbe4ba9d6db2c85d905b5$var$childFind(match) {
  return function () {
    return $8a48def30c0dbe4ba9d6db2c85d905b5$var$find.call(this.children, match);
  };
}
function $8a48def30c0dbe4ba9d6db2c85d905b5$var$childFirst() {
  return this.firstElementChild;
}
var $8a48def30c0dbe4ba9d6db2c85d905b5$export$default = function (match) {
  return this.select(match == null ? $8a48def30c0dbe4ba9d6db2c85d905b5$var$childFirst : $8a48def30c0dbe4ba9d6db2c85d905b5$var$childFind(typeof match === "function" ? match : $952c0e669ed94d18944e0afa0dc24d3b$export$childMatcher(match)));
};
var $1e67d73931bc529fc88ae43c0c653000$var$filter = Array.prototype.filter;
function $1e67d73931bc529fc88ae43c0c653000$var$children() {
  return Array.from(this.children);
}
function $1e67d73931bc529fc88ae43c0c653000$var$childrenFilter(match) {
  return function () {
    return $1e67d73931bc529fc88ae43c0c653000$var$filter.call(this.children, match);
  };
}
var $1e67d73931bc529fc88ae43c0c653000$export$default = function (match) {
  return this.selectAll(match == null ? $1e67d73931bc529fc88ae43c0c653000$var$children : $1e67d73931bc529fc88ae43c0c653000$var$childrenFilter(typeof match === "function" ? match : $952c0e669ed94d18944e0afa0dc24d3b$export$childMatcher(match)));
};
var $585b2823efea6e10557e031a054f7b30$export$default = function (match) {
  if (typeof match !== "function") match = $952c0e669ed94d18944e0afa0dc24d3b$export$default(match);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }
  return new $e11f820b9e7b0b1f88e9082d7abccd0c$export$Selection(subgroups, this._parents);
};
var $3dbc67c89963d9d62f97e2bc7878493a$export$default = function (update) {
  return new Array(update.length);
};
var $7064382c6a83398e67e538547dd6556b$export$default = function () {
  return new $e11f820b9e7b0b1f88e9082d7abccd0c$export$Selection(this._enter || this._groups.map($3dbc67c89963d9d62f97e2bc7878493a$export$default), this._parents);
};
function $7064382c6a83398e67e538547dd6556b$export$EnterNode(parent, datum) {
  this.ownerDocument = parent.ownerDocument;
  this.namespaceURI = parent.namespaceURI;
  this._next = null;
  this._parent = parent;
  this.__data__ = datum;
}
$7064382c6a83398e67e538547dd6556b$export$EnterNode.prototype = {
  constructor: $7064382c6a83398e67e538547dd6556b$export$EnterNode,
  appendChild: function (child) {
    return this._parent.insertBefore(child, this._next);
  },
  insertBefore: function (child, next) {
    return this._parent.insertBefore(child, next);
  },
  querySelector: function (selector) {
    return this._parent.querySelector(selector);
  },
  querySelectorAll: function (selector) {
    return this._parent.querySelectorAll(selector);
  }
};
var $c82a749c5283881175fd3adcc0fe9ccc$export$default = function (x) {
  return function () {
    return x;
  };
};
function $09d081c2fa385082a3db5df4e2b06447$var$bindIndex(parent, group, enter, update, exit, data) {
  var i = 0, node, groupLength = group.length, dataLength = data.length;
  // Put any non-null nodes that fit into update.
  // Put any null nodes into enter.
  // Put any remaining data into enter.
  for (; i < dataLength; ++i) {
    if (node = group[i]) {
      node.__data__ = data[i];
      update[i] = node;
    } else {
      enter[i] = new $7064382c6a83398e67e538547dd6556b$export$EnterNode(parent, data[i]);
    }
  }
  // Put any non-null nodes that don’t fit into exit.
  for (; i < groupLength; ++i) {
    if (node = group[i]) {
      exit[i] = node;
    }
  }
}
function $09d081c2fa385082a3db5df4e2b06447$var$bindKey(parent, group, enter, update, exit, data, key) {
  var i, node, nodeByKeyValue = new Map(), groupLength = group.length, dataLength = data.length, keyValues = new Array(groupLength), keyValue;
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
      enter[i] = new $7064382c6a83398e67e538547dd6556b$export$EnterNode(parent, data[i]);
    }
  }
  // Add any remaining nodes that were not bound to data to exit.
  for (i = 0; i < groupLength; ++i) {
    if ((node = group[i]) && nodeByKeyValue.get(keyValues[i]) === node) {
      exit[i] = node;
    }
  }
}
function $09d081c2fa385082a3db5df4e2b06447$var$datum(node) {
  return node.__data__;
}
var $09d081c2fa385082a3db5df4e2b06447$export$default = function (value, key) {
  if (!arguments.length) return Array.from(this, $09d081c2fa385082a3db5df4e2b06447$var$datum);
  var bind = key ? $09d081c2fa385082a3db5df4e2b06447$var$bindKey : $09d081c2fa385082a3db5df4e2b06447$var$bindIndex, parents = this._parents, groups = this._groups;
  if (typeof value !== "function") value = $c82a749c5283881175fd3adcc0fe9ccc$export$default(value);
  for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
    var parent = parents[j], group = groups[j], groupLength = group.length, data = $09d081c2fa385082a3db5df4e2b06447$var$arraylike(value.call(parent, parent && parent.__data__, j, parents)), dataLength = data.length, enterGroup = enter[j] = new Array(dataLength), updateGroup = update[j] = new Array(dataLength), exitGroup = exit[j] = new Array(groupLength);
    bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);
    // Now connect the enter nodes to their following update node, such that
    // appendChild can insert the materialized enter node before this node,
    // rather than at the end of the parent node.
    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
      if (previous = enterGroup[i0]) {
        if (i0 >= i1) i1 = i0 + 1;
        while (!(next = updateGroup[i1]) && ++i1 < dataLength) ;
        previous._next = next || null;
      }
    }
  }
  update = new $e11f820b9e7b0b1f88e9082d7abccd0c$export$Selection(update, parents);
  update._enter = enter;
  update._exit = exit;
  return update;
};
// Given some data, this returns an array-like view of it: an object that
// exposes a length property and allows numeric indexing. Note that unlike
// selectAll, this isn’t worried about “live” collections because the resulting
// array will only be used briefly while data is being bound. (It is possible to
// cause the data to change while iterating by using a key function, but please
// don’t; we’d rather avoid a gratuitous copy.)
function $09d081c2fa385082a3db5df4e2b06447$var$arraylike(data) {
  return typeof data === "object" && ("length" in data) ? data : // Array, TypedArray, NodeList, array-like
  Array.from(data);
}
var $3d8e2ae766154b5f10ecb801b3c34a51$export$default = function () {
  return new $e11f820b9e7b0b1f88e9082d7abccd0c$export$Selection(this._exit || this._groups.map($3dbc67c89963d9d62f97e2bc7878493a$export$default), this._parents);
};
var $f1dc2e7094c7cfe5c606b4575afdcff1$export$default = function (onenter, onupdate, onexit) {
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
};
var $d7a162e2eca00d16a350ab1789d0fa58$export$default = function (context) {
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
  return new $e11f820b9e7b0b1f88e9082d7abccd0c$export$Selection(merges, this._parents);
};
var $3bff1d2d8514f96ca7f273c08264c88d$export$default = function () {
  for (var groups = this._groups, j = -1, m = groups.length; ++j < m; ) {
    for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0; ) {
      if (node = group[i]) {
        if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
        next = node;
      }
    }
  }
  return this;
};
var $573b99907a674b6c43b1785dba6c69a7$export$default = function (compare) {
  if (!compare) compare = $573b99907a674b6c43b1785dba6c69a7$var$ascending;
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
  return new $e11f820b9e7b0b1f88e9082d7abccd0c$export$Selection(sortgroups, this._parents).order();
};
function $573b99907a674b6c43b1785dba6c69a7$var$ascending(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}
var $537dbf506b3438942a40caedd47ad043$export$default = function () {
  var callback = arguments[0];
  arguments[0] = this;
  callback.apply(null, arguments);
  return this;
};
var $5a13212c5d52770c64fdb2f3f307f793$export$default = function () {
  return Array.from(this);
};
var $d45a5cf061f0dce38192b765b2811ec5$export$default = function () {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
      var node = group[i];
      if (node) return node;
    }
  }
  return null;
};
var $2402d60903f58ab9443d12d4644f3736$export$default = function () {
  let size = 0;
  for (const node of this) ++size;
  // eslint-disable-line no-unused-vars
  return size;
};
var $b8a638aa143bb94899a4bb0472ab7841$export$default = function () {
  return !this.node();
};
var $285078aab38a932a8ff81bb838839699$export$default = function (callback) {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) callback.call(node, node.__data__, i, group);
    }
  }
  return this;
};
var $9615d4f3aa984d775fea6ac8a0e492c3$export$xhtml = "http://www.w3.org/1999/xhtml";
var $9615d4f3aa984d775fea6ac8a0e492c3$export$default = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: $9615d4f3aa984d775fea6ac8a0e492c3$export$xhtml,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
var $024657ee97ff749038152ccbdcdd2509$export$default = function (name) {
  var prefix = name += "", i = prefix.indexOf(":");
  if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
  return $9615d4f3aa984d775fea6ac8a0e492c3$export$default.hasOwnProperty(prefix) ? {
    space: $9615d4f3aa984d775fea6ac8a0e492c3$export$default[prefix],
    local: name
  } : name;
};
function $8fafa8d040b66035b35295485b943cd8$var$attrRemove(name) {
  return function () {
    this.removeAttribute(name);
  };
}
function $8fafa8d040b66035b35295485b943cd8$var$attrRemoveNS(fullname) {
  return function () {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}
function $8fafa8d040b66035b35295485b943cd8$var$attrConstant(name, value) {
  return function () {
    this.setAttribute(name, value);
  };
}
function $8fafa8d040b66035b35295485b943cd8$var$attrConstantNS(fullname, value) {
  return function () {
    this.setAttributeNS(fullname.space, fullname.local, value);
  };
}
function $8fafa8d040b66035b35295485b943cd8$var$attrFunction(name, value) {
  return function () {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttribute(name); else this.setAttribute(name, v);
  };
}
function $8fafa8d040b66035b35295485b943cd8$var$attrFunctionNS(fullname, value) {
  return function () {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttributeNS(fullname.space, fullname.local); else this.setAttributeNS(fullname.space, fullname.local, v);
  };
}
var $8fafa8d040b66035b35295485b943cd8$export$default = function (name, value) {
  var fullname = $024657ee97ff749038152ccbdcdd2509$export$default(name);
  if (arguments.length < 2) {
    var node = this.node();
    return fullname.local ? node.getAttributeNS(fullname.space, fullname.local) : node.getAttribute(fullname);
  }
  return this.each((value == null ? fullname.local ? $8fafa8d040b66035b35295485b943cd8$var$attrRemoveNS : $8fafa8d040b66035b35295485b943cd8$var$attrRemove : typeof value === "function" ? fullname.local ? $8fafa8d040b66035b35295485b943cd8$var$attrFunctionNS : $8fafa8d040b66035b35295485b943cd8$var$attrFunction : fullname.local ? $8fafa8d040b66035b35295485b943cd8$var$attrConstantNS : $8fafa8d040b66035b35295485b943cd8$var$attrConstant)(fullname, value));
};
var $eb7703534223f84a5ea63b807bf5d52f$export$default = function (node) {
  return node.ownerDocument && node.ownerDocument.defaultView || // node is a Node
  node.document && node || // node is a Window
  node.defaultView;
};
function $1656200d7e1ed7d3d5a7293c9abc09e8$var$styleRemove(name) {
  return function () {
    this.style.removeProperty(name);
  };
}
function $1656200d7e1ed7d3d5a7293c9abc09e8$var$styleConstant(name, value, priority) {
  return function () {
    this.style.setProperty(name, value, priority);
  };
}
function $1656200d7e1ed7d3d5a7293c9abc09e8$var$styleFunction(name, value, priority) {
  return function () {
    var v = value.apply(this, arguments);
    if (v == null) this.style.removeProperty(name); else this.style.setProperty(name, v, priority);
  };
}
var $1656200d7e1ed7d3d5a7293c9abc09e8$export$default = function (name, value, priority) {
  return arguments.length > 1 ? this.each((value == null ? $1656200d7e1ed7d3d5a7293c9abc09e8$var$styleRemove : typeof value === "function" ? $1656200d7e1ed7d3d5a7293c9abc09e8$var$styleFunction : $1656200d7e1ed7d3d5a7293c9abc09e8$var$styleConstant)(name, value, priority == null ? "" : priority)) : $1656200d7e1ed7d3d5a7293c9abc09e8$export$styleValue(this.node(), name);
};
function $1656200d7e1ed7d3d5a7293c9abc09e8$export$styleValue(node, name) {
  return node.style.getPropertyValue(name) || $eb7703534223f84a5ea63b807bf5d52f$export$default(node).getComputedStyle(node, null).getPropertyValue(name);
}
function $1be1f53d51ef853f9d9bfde3d493a762$var$propertyRemove(name) {
  return function () {
    delete this[name];
  };
}
function $1be1f53d51ef853f9d9bfde3d493a762$var$propertyConstant(name, value) {
  return function () {
    this[name] = value;
  };
}
function $1be1f53d51ef853f9d9bfde3d493a762$var$propertyFunction(name, value) {
  return function () {
    var v = value.apply(this, arguments);
    if (v == null) delete this[name]; else this[name] = v;
  };
}
var $1be1f53d51ef853f9d9bfde3d493a762$export$default = function (name, value) {
  return arguments.length > 1 ? this.each((value == null ? $1be1f53d51ef853f9d9bfde3d493a762$var$propertyRemove : typeof value === "function" ? $1be1f53d51ef853f9d9bfde3d493a762$var$propertyFunction : $1be1f53d51ef853f9d9bfde3d493a762$var$propertyConstant)(name, value)) : this.node()[name];
};
function $0f3babba69b3cea65b36fe77ebf0c39e$var$classArray(string) {
  return string.trim().split(/^|\s+/);
}
function $0f3babba69b3cea65b36fe77ebf0c39e$var$classList(node) {
  return node.classList || new $0f3babba69b3cea65b36fe77ebf0c39e$var$ClassList(node);
}
function $0f3babba69b3cea65b36fe77ebf0c39e$var$ClassList(node) {
  this._node = node;
  this._names = $0f3babba69b3cea65b36fe77ebf0c39e$var$classArray(node.getAttribute("class") || "");
}
$0f3babba69b3cea65b36fe77ebf0c39e$var$ClassList.prototype = {
  add: function (name) {
    var i = this._names.indexOf(name);
    if (i < 0) {
      this._names.push(name);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  remove: function (name) {
    var i = this._names.indexOf(name);
    if (i >= 0) {
      this._names.splice(i, 1);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  contains: function (name) {
    return this._names.indexOf(name) >= 0;
  }
};
function $0f3babba69b3cea65b36fe77ebf0c39e$var$classedAdd(node, names) {
  var list = $0f3babba69b3cea65b36fe77ebf0c39e$var$classList(node), i = -1, n = names.length;
  while (++i < n) list.add(names[i]);
}
function $0f3babba69b3cea65b36fe77ebf0c39e$var$classedRemove(node, names) {
  var list = $0f3babba69b3cea65b36fe77ebf0c39e$var$classList(node), i = -1, n = names.length;
  while (++i < n) list.remove(names[i]);
}
function $0f3babba69b3cea65b36fe77ebf0c39e$var$classedTrue(names) {
  return function () {
    $0f3babba69b3cea65b36fe77ebf0c39e$var$classedAdd(this, names);
  };
}
function $0f3babba69b3cea65b36fe77ebf0c39e$var$classedFalse(names) {
  return function () {
    $0f3babba69b3cea65b36fe77ebf0c39e$var$classedRemove(this, names);
  };
}
function $0f3babba69b3cea65b36fe77ebf0c39e$var$classedFunction(names, value) {
  return function () {
    (value.apply(this, arguments) ? $0f3babba69b3cea65b36fe77ebf0c39e$var$classedAdd : $0f3babba69b3cea65b36fe77ebf0c39e$var$classedRemove)(this, names);
  };
}
var $0f3babba69b3cea65b36fe77ebf0c39e$export$default = function (name, value) {
  var names = $0f3babba69b3cea65b36fe77ebf0c39e$var$classArray(name + "");
  if (arguments.length < 2) {
    var list = $0f3babba69b3cea65b36fe77ebf0c39e$var$classList(this.node()), i = -1, n = names.length;
    while (++i < n) if (!list.contains(names[i])) return false;
    return true;
  }
  return this.each((typeof value === "function" ? $0f3babba69b3cea65b36fe77ebf0c39e$var$classedFunction : value ? $0f3babba69b3cea65b36fe77ebf0c39e$var$classedTrue : $0f3babba69b3cea65b36fe77ebf0c39e$var$classedFalse)(names, value));
};
function $f07b9587375c510ba5fad71250060f93$var$textRemove() {
  this.textContent = "";
}
function $f07b9587375c510ba5fad71250060f93$var$textConstant(value) {
  return function () {
    this.textContent = value;
  };
}
function $f07b9587375c510ba5fad71250060f93$var$textFunction(value) {
  return function () {
    var v = value.apply(this, arguments);
    this.textContent = v == null ? "" : v;
  };
}
var $f07b9587375c510ba5fad71250060f93$export$default = function (value) {
  return arguments.length ? this.each(value == null ? $f07b9587375c510ba5fad71250060f93$var$textRemove : (typeof value === "function" ? $f07b9587375c510ba5fad71250060f93$var$textFunction : $f07b9587375c510ba5fad71250060f93$var$textConstant)(value)) : this.node().textContent;
};
function $ec5c25d98241f8925946642ddb0cefeb$var$htmlRemove() {
  this.innerHTML = "";
}
function $ec5c25d98241f8925946642ddb0cefeb$var$htmlConstant(value) {
  return function () {
    this.innerHTML = value;
  };
}
function $ec5c25d98241f8925946642ddb0cefeb$var$htmlFunction(value) {
  return function () {
    var v = value.apply(this, arguments);
    this.innerHTML = v == null ? "" : v;
  };
}
var $ec5c25d98241f8925946642ddb0cefeb$export$default = function (value) {
  return arguments.length ? this.each(value == null ? $ec5c25d98241f8925946642ddb0cefeb$var$htmlRemove : (typeof value === "function" ? $ec5c25d98241f8925946642ddb0cefeb$var$htmlFunction : $ec5c25d98241f8925946642ddb0cefeb$var$htmlConstant)(value)) : this.node().innerHTML;
};
function $946bfc61f47fa599019be2561e1e9941$var$raise() {
  if (this.nextSibling) this.parentNode.appendChild(this);
}
var $946bfc61f47fa599019be2561e1e9941$export$default = function () {
  return this.each($946bfc61f47fa599019be2561e1e9941$var$raise);
};
function $48b60e1b3171059f9b7b7d989d10b7ee$var$lower() {
  if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
var $48b60e1b3171059f9b7b7d989d10b7ee$export$default = function () {
  return this.each($48b60e1b3171059f9b7b7d989d10b7ee$var$lower);
};
function $217e6012c300a43607c66945c266a345$var$creatorInherit(name) {
  return function () {
    var document = this.ownerDocument, uri = this.namespaceURI;
    return uri === $9615d4f3aa984d775fea6ac8a0e492c3$export$xhtml && document.documentElement.namespaceURI === $9615d4f3aa984d775fea6ac8a0e492c3$export$xhtml ? document.createElement(name) : document.createElementNS(uri, name);
  };
}
function $217e6012c300a43607c66945c266a345$var$creatorFixed(fullname) {
  return function () {
    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
  };
}
var $217e6012c300a43607c66945c266a345$export$default = function (name) {
  var fullname = $024657ee97ff749038152ccbdcdd2509$export$default(name);
  return (fullname.local ? $217e6012c300a43607c66945c266a345$var$creatorFixed : $217e6012c300a43607c66945c266a345$var$creatorInherit)(fullname);
};
var $a370450fe23fa6ec45da9aedc3530ef4$export$default = function (name) {
  var create = typeof name === "function" ? name : $217e6012c300a43607c66945c266a345$export$default(name);
  return this.select(function () {
    return this.appendChild(create.apply(this, arguments));
  });
};
function $816b7fef690340b6b11fd6cb60f9e68b$var$constantNull() {
  return null;
}
var $816b7fef690340b6b11fd6cb60f9e68b$export$default = function (name, before) {
  var create = typeof name === "function" ? name : $217e6012c300a43607c66945c266a345$export$default(name), select = before == null ? $816b7fef690340b6b11fd6cb60f9e68b$var$constantNull : typeof before === "function" ? before : $d0d289477a6ca33255833c4bb77742d4$export$default(before);
  return this.select(function () {
    return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
  });
};
function $f05ff9d55025043d24a1fabe018f344c$var$remove() {
  var parent = this.parentNode;
  if (parent) parent.removeChild(this);
}
var $f05ff9d55025043d24a1fabe018f344c$export$default = function () {
  return this.each($f05ff9d55025043d24a1fabe018f344c$var$remove);
};
function $d83fb9072a1e66635c2e0e5c7bc91d4d$var$selection_cloneShallow() {
  var clone = this.cloneNode(false), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}
function $d83fb9072a1e66635c2e0e5c7bc91d4d$var$selection_cloneDeep() {
  var clone = this.cloneNode(true), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}
var $d83fb9072a1e66635c2e0e5c7bc91d4d$export$default = function (deep) {
  return this.select(deep ? $d83fb9072a1e66635c2e0e5c7bc91d4d$var$selection_cloneDeep : $d83fb9072a1e66635c2e0e5c7bc91d4d$var$selection_cloneShallow);
};
var $7b97117bec7751e3fa2e12befd57e4cc$export$default = function (value) {
  return arguments.length ? this.property("__data__", value) : this.node().__data__;
};
function $413eafba843ffee92dfd89dcd7729785$var$contextListener(listener) {
  return function (event) {
    listener.call(this, event, this.__data__);
  };
}
function $413eafba843ffee92dfd89dcd7729785$var$parseTypenames(typenames) {
  return typenames.trim().split(/^|\s+/).map(function (t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0) (name = t.slice(i + 1), t = t.slice(0, i));
    return {
      type: t,
      name: name
    };
  });
}
function $413eafba843ffee92dfd89dcd7729785$var$onRemove(typename) {
  return function () {
    var on = this.__on;
    if (!on) return;
    for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
      if ((o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name)) {
        this.removeEventListener(o.type, o.listener, o.options);
      } else {
        on[++i] = o;
      }
    }
    if (++i) on.length = i; else delete this.__on;
  };
}
function $413eafba843ffee92dfd89dcd7729785$var$onAdd(typename, value, options) {
  return function () {
    var on = this.__on, o, listener = $413eafba843ffee92dfd89dcd7729785$var$contextListener(value);
    if (on) for (var j = 0, m = on.length; j < m; ++j) {
      if ((o = on[j]).type === typename.type && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.options);
        this.addEventListener(o.type, o.listener = listener, o.options = options);
        o.value = value;
        return;
      }
    }
    this.addEventListener(typename.type, listener, options);
    o = {
      type: typename.type,
      name: typename.name,
      value: value,
      listener: listener,
      options: options
    };
    if (!on) this.__on = [o]; else on.push(o);
  };
}
var $413eafba843ffee92dfd89dcd7729785$export$default = function (typename, value, options) {
  var typenames = $413eafba843ffee92dfd89dcd7729785$var$parseTypenames(typename + ""), i, n = typenames.length, t;
  if (arguments.length < 2) {
    var on = this.node().__on;
    if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
      for ((i = 0, o = on[j]); i < n; ++i) {
        if ((t = typenames[i]).type === o.type && t.name === o.name) {
          return o.value;
        }
      }
    }
    return;
  }
  on = value ? $413eafba843ffee92dfd89dcd7729785$var$onAdd : $413eafba843ffee92dfd89dcd7729785$var$onRemove;
  for (i = 0; i < n; ++i) this.each(on(typenames[i], value, options));
  return this;
};
function $ab0bd493b502a26449d295e6eb8715e0$var$dispatchEvent(node, type, params) {
  var window = $eb7703534223f84a5ea63b807bf5d52f$export$default(node), event = window.CustomEvent;
  if (typeof event === "function") {
    event = new event(type, params);
  } else {
    event = window.document.createEvent("Event");
    if (params) (event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail); else event.initEvent(type, false, false);
  }
  node.dispatchEvent(event);
}
function $ab0bd493b502a26449d295e6eb8715e0$var$dispatchConstant(type, params) {
  return function () {
    return $ab0bd493b502a26449d295e6eb8715e0$var$dispatchEvent(this, type, params);
  };
}
function $ab0bd493b502a26449d295e6eb8715e0$var$dispatchFunction(type, params) {
  return function () {
    return $ab0bd493b502a26449d295e6eb8715e0$var$dispatchEvent(this, type, params.apply(this, arguments));
  };
}
var $ab0bd493b502a26449d295e6eb8715e0$export$default = function (type, params) {
  return this.each((typeof params === "function" ? $ab0bd493b502a26449d295e6eb8715e0$var$dispatchFunction : $ab0bd493b502a26449d295e6eb8715e0$var$dispatchConstant)(type, params));
};
var $d0326986e2b09b9f7cdd65ad49a5fb1a$export$default = function* () {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) yield node;
    }
  }
};
var $e11f820b9e7b0b1f88e9082d7abccd0c$export$root = [null];
function $e11f820b9e7b0b1f88e9082d7abccd0c$export$Selection(groups, parents) {
  this._groups = groups;
  this._parents = parents;
}
function $e11f820b9e7b0b1f88e9082d7abccd0c$export$default() {
  return new $e11f820b9e7b0b1f88e9082d7abccd0c$export$Selection([[document.documentElement]], $e11f820b9e7b0b1f88e9082d7abccd0c$export$root);
}
function $e11f820b9e7b0b1f88e9082d7abccd0c$var$selection_selection() {
  return this;
}
$e11f820b9e7b0b1f88e9082d7abccd0c$export$Selection.prototype = $e11f820b9e7b0b1f88e9082d7abccd0c$export$default.prototype = {
  constructor: $e11f820b9e7b0b1f88e9082d7abccd0c$export$Selection,
  select: $a9b3a2149b9cb80fb4bb747a1fb465fa$export$default,
  selectAll: $5f0d296a8c659aea796bb27d19f431a6$export$default,
  selectChild: $8a48def30c0dbe4ba9d6db2c85d905b5$export$default,
  selectChildren: $1e67d73931bc529fc88ae43c0c653000$export$default,
  filter: $585b2823efea6e10557e031a054f7b30$export$default,
  data: $09d081c2fa385082a3db5df4e2b06447$export$default,
  enter: $7064382c6a83398e67e538547dd6556b$export$default,
  exit: $3d8e2ae766154b5f10ecb801b3c34a51$export$default,
  join: $f1dc2e7094c7cfe5c606b4575afdcff1$export$default,
  merge: $d7a162e2eca00d16a350ab1789d0fa58$export$default,
  selection: $e11f820b9e7b0b1f88e9082d7abccd0c$var$selection_selection,
  order: $3bff1d2d8514f96ca7f273c08264c88d$export$default,
  sort: $573b99907a674b6c43b1785dba6c69a7$export$default,
  call: $537dbf506b3438942a40caedd47ad043$export$default,
  nodes: $5a13212c5d52770c64fdb2f3f307f793$export$default,
  node: $d45a5cf061f0dce38192b765b2811ec5$export$default,
  size: $2402d60903f58ab9443d12d4644f3736$export$default,
  empty: $b8a638aa143bb94899a4bb0472ab7841$export$default,
  each: $285078aab38a932a8ff81bb838839699$export$default,
  attr: $8fafa8d040b66035b35295485b943cd8$export$default,
  style: $1656200d7e1ed7d3d5a7293c9abc09e8$export$default,
  property: $1be1f53d51ef853f9d9bfde3d493a762$export$default,
  classed: $0f3babba69b3cea65b36fe77ebf0c39e$export$default,
  text: $f07b9587375c510ba5fad71250060f93$export$default,
  html: $ec5c25d98241f8925946642ddb0cefeb$export$default,
  raise: $946bfc61f47fa599019be2561e1e9941$export$default,
  lower: $48b60e1b3171059f9b7b7d989d10b7ee$export$default,
  append: $a370450fe23fa6ec45da9aedc3530ef4$export$default,
  insert: $816b7fef690340b6b11fd6cb60f9e68b$export$default,
  remove: $f05ff9d55025043d24a1fabe018f344c$export$default,
  clone: $d83fb9072a1e66635c2e0e5c7bc91d4d$export$default,
  datum: $7b97117bec7751e3fa2e12befd57e4cc$export$default,
  on: $413eafba843ffee92dfd89dcd7729785$export$default,
  dispatch: $ab0bd493b502a26449d295e6eb8715e0$export$default,
  [Symbol.iterator]: $d0326986e2b09b9f7cdd65ad49a5fb1a$export$default
};
var $1a2a4451cdbd695989c39ad92da9ce17$export$default = function (selector) {
  return typeof selector === "string" ? new $e11f820b9e7b0b1f88e9082d7abccd0c$export$Selection([[document.querySelector(selector)]], [document.documentElement]) : new $e11f820b9e7b0b1f88e9082d7abccd0c$export$Selection([[selector]], $e11f820b9e7b0b1f88e9082d7abccd0c$export$root);
};
class $f9d80b0f899cf279fdf099324a114304$export$default {
  /**
  * A class used to illustrate state of the visualization on the main thread such as
  * selection or axis.
  *
  * @param {SVGElement} svg container for all svg elements
  */
  constructor(svg) {
    this.svg = svg;
    this.d3SVG = $1a2a4451cdbd695989c39ad92da9ce17$export$default(this.svg);
    this.svg.style.width = "100%";
    this.svg.style.height = "100%";
    this.svg.style.position = "absolute";
    this.svg.style.zIndex = "1000";
    this.svg.style.pointerEvents = "none";
    this.svg.style.overflow = "visible";
    this._selectMarker = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    this._selectMarker.setAttribute("fill", "rgba(124, 124, 247, 0.3)");
    this._selectMarker.setAttribute("stroke", "rgb(136, 128, 247)");
    this._selectMarker.setAttribute("stroke-width", 1);
    this._selectMarker.setAttribute("stroke-dasharray", "5,5");
    this._labelMarker = document.createElementNS("http://www.w3.org/2000/svg", "g");
  }
  /**
  * Set the schema for this class to refer to.
  *
  * @param {Object} schema
  */
  setSchema(schema) {
    this.schema = schema;
    const styles = $ca7145bbe9fc7f50a5dcc86190258597$export$getDimAndMarginStyleForSchema(schema);
    this.svg.style.width = styles.width;
    this.svg.style.height = styles.height;
    this.svg.style.margin = styles.margin;
    this.initialX = undefined;
    // used for updating labels
    this.initialY = undefined;
    $1a2a4451cdbd695989c39ad92da9ce17$export$default(this._labelMarker).selectAll("*").remove();
    for (const _ of this.schema.labels || []) {
      $1a2a4451cdbd695989c39ad92da9ce17$export$default(this._labelMarker).append("text");
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
      this.xAxis = this._calculateAxis("x", this.schema.xAxis, this.schema, $ca7145bbe9fc7f50a5dcc86190258597$export$getScaleForSchema("x", this.schema), this.xAxisAnchor);
      if (this.schema.labels) {
        this.updateLabels();
      }
    }
    if (this.xAxis) {
      this.xAxisAnchor.call(this.xAxis);
    }
    if (this.currentYRange) {
      this.yAxis = this._calculateAxis("y", this.schema.yAxis, this.schema, $ca7145bbe9fc7f50a5dcc86190258597$export$getScaleForSchema("y", this.schema), this.yAxisAnchor);
    }
    if (this.yAxis) {
      this.yAxisAnchor.call(this.yAxis);
    }
  }
  updateLabels() {
    if (!this.initialX && this.schema.labels) {
      this.initialX = this.schema.labels.map(label => this._calculateViewportSpotInverse(label.x, label.y)[0]);
    }
    if (!this.initialY && this.schema.labels) {
      this.initialY = this.schema.labels.map(label => this._calculateViewportSpotInverse(label.x, label.y)[1]);
    }
    $1a2a4451cdbd695989c39ad92da9ce17$export$default(this._labelMarker).selectAll("text").data(this.schema.labels).text(d => d.text).attr("x", (d, i) => {
      if (d.fixedX) {
        return this.initialX[i];
      }
      return this._calculateViewportSpotInverse(d.x, d.y)[0];
    }).attr("y", (d, i) => {
      if (d.fixedY) {
        return this.initialY[i];
      }
      return this._calculateViewportSpotInverse(d.x, d.y)[1];
    }).each(function (d) {
      // Set any possible svg properties specified in label
      for (const property in d) {
        if (["x", "y", "text"].includes(property)) {
          continue;
        }
        $1a2a4451cdbd695989c39ad92da9ce17$export$default(this).attr(property, d[property]);
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
          axis = $fc92a4fc87273d9f03f319de673f1ae5$export$axisTop();
          anchor.attr("transform", `translate(0, 0)`);
          break;
        case "center":
          axis = $fc92a4fc87273d9f03f319de673f1ae5$export$axisBottom();
          anchor.attr("transform", `translate(0, ${this.height / 2})`);
          break;
        case "zero":
          const yScale = $080d1809bd453cd3f75caefaec4bfc71$export$default().domain(this.currentYRange).range([this.height, 0]);
          axis = $fc92a4fc87273d9f03f319de673f1ae5$export$axisBottom();
          anchor.attr("transform", `translate(0, ${yScale(0)})`);
          break;
        case "bottom":
        default:
          axis = $fc92a4fc87273d9f03f319de673f1ae5$export$axisBottom();
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
          axis = $fc92a4fc87273d9f03f319de673f1ae5$export$axisRight();
          anchor.attr("transform", `translate(${this.width / 2}, 0)`);
          break;
        case "right":
          axis = $fc92a4fc87273d9f03f319de673f1ae5$export$axisRight();
          anchor.attr("transform", `translate(${this.width}, 0)`);
          break;
        case "zero":
          const xScale = $080d1809bd453cd3f75caefaec4bfc71$export$default().domain(this.currentXRange).range([0, this.width]);
          axis = $fc92a4fc87273d9f03f319de673f1ae5$export$axisLeft();
          anchor.attr("transform", `translate(${xScale(0)}, 0)`);
          break;
        case "left":
        default:
          axis = $fc92a4fc87273d9f03f319de673f1ae5$export$axisLeft();
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
      return axis.scale($080d1809bd453cd3f75caefaec4bfc71$export$default().domain(domain).range(range));
    }
    let tickInfo;
    if (dimension === "x") {
      tickInfo = genomeScale.getTickCoordsAndLabels(domain[0], domain[1]);
    } else {
      tickInfo = genomeScale.getTickCoordsAndLabels(range[0], range[1]);
    }
    return axis.scale($080d1809bd453cd3f75caefaec4bfc71$export$default().domain(domain).range(range)).tickValues(tickInfo.tickCoords).tickFormat((_, index) => tickInfo.tickLabels[index]);
  }
  /**
  * Updates user selection view if they have selected a box
  */
  _updateBoxSelectView(points) {
    if (points.length !== 4) {
      return;
    }
    const topLeftCorner = this._calculateViewportSpotInverse(points[0], points[1]);
    const bottomRightCorner = this._calculateViewportSpotInverse(points[2], points[3]);
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
      const asCanvasPoint = this._calculateViewportSpotInverse(points[i], points[i + 1]);
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
    const inverseScaleX = $ca7145bbe9fc7f50a5dcc86190258597$export$scale(this.currentXRange, [0, this.width]);
    // Flipped for Y since canvas using typical graphics coordinates but GPU clipspace is typical cartesian coordinates
    const inverseScaleY = $ca7145bbe9fc7f50a5dcc86190258597$export$scale(this.currentYRange, [this.height, 0]);
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
const $62df34446789a87d83e9f7f92aefcd53$var$getLayerXandYFromEvent = event => {
  if (event.layerX !== undefined && event.layerY !== undefined) {
    return [event.layerX, event.layerY];
  }
  const bbox = event.target.getBoundingClientRect();
  const x = event.clientX - bbox.left;
  const y = event.clientY - bbox.top;
  return [x, y];
};
class $62df34446789a87d83e9f7f92aefcd53$export$default {
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
    this.SVGInteractor = new $f9d80b0f899cf279fdf099324a114304$export$default(document.createElementNS("http://www.w3.org/2000/svg", "svg"));
  }
  /**
  * Set the schema of the mouse reader and the svg interaction
  * @param {Object} schema
  */
  setSchema(schema) {
    const styles = $ca7145bbe9fc7f50a5dcc86190258597$export$getDimAndMarginStyleForSchema(schema);
    this.element.style.width = styles.width;
    this.element.style.height = styles.height;
    this.element.style.margin = styles.margin;
    this.viewport = $ca7145bbe9fc7f50a5dcc86190258597$export$getViewportForSchema(schema);
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
    this.element.addEventListener("mousedown", event => {
      mouseDown = true;
      switch (this.tool) {
        case "pan":
          break;
        case "box":
        case "lasso":
          this._currentSelectionPoints = [...this._calculateViewportSpot(...$62df34446789a87d83e9f7f92aefcd53$var$getLayerXandYFromEvent(event))];
          break;
      }
    }, false);
    this.element.addEventListener("mousemove", event => {
      if (!mouseDown) {
        return;
      }
      switch (this.tool) {
        case "pan":
          this._onPan(event);
          break;
        case "box":
          this._currentSelectionPoints = this._currentSelectionPoints.slice(0, 2).concat(this._calculateViewportSpot(...$62df34446789a87d83e9f7f92aefcd53$var$getLayerXandYFromEvent(event)));
          break;
        case "lasso":
          this._currentSelectionPoints.push(...this._calculateViewportSpot(...$62df34446789a87d83e9f7f92aefcd53$var$getLayerXandYFromEvent(event)));
          break;
        case "tooltip":
          break;
      }
      this._updateSVG();
    }, false);
    this.element.addEventListener("mouseup", event => {
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
        case "pan":
          // Ensures panning does not continue if user leaves canvas
          mouseDown = false;
          break;
        case "box":
          break;
        case "lasso":
          break;
        case "tooltip":
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
      yRange: this.currentYRange
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
      const previousX = [...this.currentXRange];
      // ... to avoid aliasing
      const t = -event.wheelDelta / 1000;
      const inDataSpace = this._calculateViewportSpot(...$62df34446789a87d83e9f7f92aefcd53$var$getLayerXandYFromEvent(event));
      this.currentXRange[0] = t * inDataSpace[0] + (1 - t) * this.currentXRange[0];
      this.currentXRange[1] = t * inDataSpace[0] + (1 - t) * this.currentXRange[1];
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
      const inDataSpace = this._calculateViewportSpot(...$62df34446789a87d83e9f7f92aefcd53$var$getLayerXandYFromEvent(event));
      this.currentYRange[0] = t * inDataSpace[1] + (1 - t) * this.currentYRange[0];
      this.currentYRange[1] = t * inDataSpace[1] + (1 - t) * this.currentYRange[1];
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
      const previousX = [...this.currentXRange];
      // ... to avoid aliasing
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
    this.SVGInteractor.updateView(this.currentXRange, this.currentYRange, this.width, this.height);
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
    const scaleX = $ca7145bbe9fc7f50a5dcc86190258597$export$scale([0, this.width], this.currentXRange);
    // Flipped for Y since canvas using typical graphics coordinates but GPU clipspace is typical cartesian coordinates
    const scaleY = $ca7145bbe9fc7f50a5dcc86190258597$export$scale([this.height, 0], this.currentYRange);
    return [scaleX(canvasX), scaleY(canvasY)];
  }
}
// ASSET: node_modules/jsonschema/lib/index.js
var $6294c5f2cce48cadd90e15a5148b428f$export$Validator;
// ASSET: node_modules/jsonschema/lib/validator.js
var $fe14a020443a2941a202c9a46db2f56a$exports = {};
// ASSET: node_modules/jsonschema/lib/attribute.js
var $eaddba78edc0a539a6e1ffe5f8f0bf4b$exports = {};
// ASSET: node_modules/jsonschema/lib/helpers.js
var $a7d1c719292674b299f6cb3f06994930$export$ValidationError, $a7d1c719292674b299f6cb3f06994930$export$ValidatorResult, $a7d1c719292674b299f6cb3f06994930$export$SchemaError, $a7d1c719292674b299f6cb3f06994930$export$SchemaContext, $a7d1c719292674b299f6cb3f06994930$export$FORMAT_REGEXPS, $a7d1c719292674b299f6cb3f06994930$export$makeSuffix;
var $a7d1c719292674b299f6cb3f06994930$var$ValidationError = $a7d1c719292674b299f6cb3f06994930$export$ValidationError = function ValidationError(message, instance, schema, path, name, argument) {
  if (Array.isArray(path)) {
    this.path = path;
    this.property = path.reduce(function (sum, item) {
      return sum + $a7d1c719292674b299f6cb3f06994930$var$makeSuffix(item);
    }, 'instance');
  } else if (path !== undefined) {
    this.property = path;
  }
  if (message) {
    this.message = message;
  }
  if (schema) {
    var id = schema.$id || schema.id;
    this.schema = id || schema;
  }
  if (instance !== undefined) {
    this.instance = instance;
  }
  this.name = name;
  this.argument = argument;
  this.stack = this.toString();
};
$a7d1c719292674b299f6cb3f06994930$var$ValidationError.prototype.toString = function toString() {
  return this.property + ' ' + this.message;
};
var $a7d1c719292674b299f6cb3f06994930$var$ValidatorResult = $a7d1c719292674b299f6cb3f06994930$export$ValidatorResult = function ValidatorResult(instance, schema, options, ctx) {
  this.instance = instance;
  this.schema = schema;
  this.options = options;
  this.path = ctx.path;
  this.propertyPath = ctx.propertyPath;
  this.errors = [];
  this.throwError = options && options.throwError;
  this.throwFirst = options && options.throwFirst;
  this.throwAll = options && options.throwAll;
  this.disableFormat = options && options.disableFormat === true;
};
$a7d1c719292674b299f6cb3f06994930$var$ValidatorResult.prototype.addError = function addError(detail) {
  var err;
  if (typeof detail == 'string') {
    err = new $a7d1c719292674b299f6cb3f06994930$var$ValidationError(detail, this.instance, this.schema, this.path);
  } else {
    if (!detail) throw new Error('Missing error detail');
    if (!detail.message) throw new Error('Missing error message');
    if (!detail.name) throw new Error('Missing validator type');
    err = new $a7d1c719292674b299f6cb3f06994930$var$ValidationError(detail.message, this.instance, this.schema, this.path, detail.name, detail.argument);
  }
  this.errors.push(err);
  if (this.throwFirst) {
    throw new $a7d1c719292674b299f6cb3f06994930$var$ValidatorResultError(this);
  } else if (this.throwError) {
    throw err;
  }
  return err;
};
$a7d1c719292674b299f6cb3f06994930$var$ValidatorResult.prototype.importErrors = function importErrors(res) {
  if (typeof res == 'string' || res && res.validatorType) {
    this.addError(res);
  } else if (res && res.errors) {
    Array.prototype.push.apply(this.errors, res.errors);
  }
};
function $a7d1c719292674b299f6cb3f06994930$var$stringizer(v, i) {
  return i + ': ' + v.toString() + '\n';
}
$a7d1c719292674b299f6cb3f06994930$var$ValidatorResult.prototype.toString = function toString(res) {
  return this.errors.map($a7d1c719292674b299f6cb3f06994930$var$stringizer).join('');
};
Object.defineProperty($a7d1c719292674b299f6cb3f06994930$var$ValidatorResult.prototype, "valid", {
  get: function () {
    return !this.errors.length;
  }
});
var $a7d1c719292674b299f6cb3f06994930$export$ValidatorResultError = $a7d1c719292674b299f6cb3f06994930$var$ValidatorResultError;
function $a7d1c719292674b299f6cb3f06994930$var$ValidatorResultError(result) {
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, $a7d1c719292674b299f6cb3f06994930$var$ValidatorResultError);
  }
  this.instance = result.instance;
  this.schema = result.schema;
  this.options = result.options;
  this.errors = result.errors;
}
$a7d1c719292674b299f6cb3f06994930$var$ValidatorResultError.prototype = new Error();
$a7d1c719292674b299f6cb3f06994930$var$ValidatorResultError.prototype.constructor = $a7d1c719292674b299f6cb3f06994930$var$ValidatorResultError;
$a7d1c719292674b299f6cb3f06994930$var$ValidatorResultError.prototype.name = "Validation Error";
/**
* Describes a problem with a Schema which prevents validation of an instance
* @name SchemaError
* @constructor
*/
var $a7d1c719292674b299f6cb3f06994930$var$SchemaError = $a7d1c719292674b299f6cb3f06994930$export$SchemaError = function SchemaError(msg, schema) {
  this.message = msg;
  this.schema = schema;
  Error.call(this, msg);
  Error.captureStackTrace(this, SchemaError);
};
$a7d1c719292674b299f6cb3f06994930$var$SchemaError.prototype = Object.create(Error.prototype, {
  constructor: {
    value: $a7d1c719292674b299f6cb3f06994930$var$SchemaError,
    enumerable: false
  },
  name: {
    value: 'SchemaError',
    enumerable: false
  }
});
var $a7d1c719292674b299f6cb3f06994930$var$SchemaContext = $a7d1c719292674b299f6cb3f06994930$export$SchemaContext = function SchemaContext(schema, options, path, base, schemas) {
  this.schema = schema;
  this.options = options;
  if (Array.isArray(path)) {
    this.path = path;
    this.propertyPath = path.reduce(function (sum, item) {
      return sum + $a7d1c719292674b299f6cb3f06994930$var$makeSuffix(item);
    }, 'instance');
  } else {
    this.propertyPath = path;
  }
  this.base = base;
  this.schemas = schemas;
};
$a7d1c719292674b299f6cb3f06994930$var$SchemaContext.prototype.resolve = function resolve(target) {
  return resolve(this.base, target);
};
$a7d1c719292674b299f6cb3f06994930$var$SchemaContext.prototype.makeChild = function makeChild(schema, propertyName) {
  var path = propertyName === undefined ? this.path : this.path.concat([propertyName]);
  var id = schema.$id || schema.id;
  var base = resolve(this.base, id || '');
  var ctx = new $a7d1c719292674b299f6cb3f06994930$var$SchemaContext(schema, this.options, path, base, Object.create(this.schemas));
  if (id && !ctx.schemas[base]) {
    ctx.schemas[base] = schema;
  }
  return ctx;
};
var $a7d1c719292674b299f6cb3f06994930$var$FORMAT_REGEXPS = $a7d1c719292674b299f6cb3f06994930$export$FORMAT_REGEXPS = {
  'date-time': /^\d{4}-(?:0[0-9]{1}|1[0-2]{1})-(3[01]|0[1-9]|[12][0-9])[tT ](2[0-4]|[01][0-9]):([0-5][0-9]):(60|[0-5][0-9])(\.\d+)?([zZ]|[+-]([0-5][0-9]):(60|[0-5][0-9]))$/,
  'date': /^\d{4}-(?:0[0-9]{1}|1[0-2]{1})-(3[01]|0[1-9]|[12][0-9])$/,
  'time': /^(2[0-4]|[01][0-9]):([0-5][0-9]):(60|[0-5][0-9])$/,
  'email': /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/,
  'ip-address': /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
  'ipv6': /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/,
  // TODO: A more accurate regular expression for "uri" goes:
  // [A-Za-z][+\-.0-9A-Za-z]*:((/(/((%[0-9A-Fa-f]{2}|[!$&-.0-9;=A-Z_a-z~])+|(\[(([Vv][0-9A-Fa-f]+\.[!$&-.0-;=A-Z_a-z~]+)?|[.0-:A-Fa-f]+)\])?)(:\d*)?)?)?#(%[0-9A-Fa-f]{2}|[!$&-;=?-Z_a-z~])*|(/(/((%[0-9A-Fa-f]{2}|[!$&-.0-9;=A-Z_a-z~])+|(\[(([Vv][0-9A-Fa-f]+\.[!$&-.0-;=A-Z_a-z~]+)?|[.0-:A-Fa-f]+)\])?)(:\d*)?[/?]|[!$&-.0-;=?-Z_a-z~])|/?%[0-9A-Fa-f]{2}|[!$&-.0-;=?-Z_a-z~])(%[0-9A-Fa-f]{2}|[!$&-;=?-Z_a-z~])*(#(%[0-9A-Fa-f]{2}|[!$&-;=?-Z_a-z~])*)?|/(/((%[0-9A-Fa-f]{2}|[!$&-.0-9;=A-Z_a-z~])+(:\d*)?|(\[(([Vv][0-9A-Fa-f]+\.[!$&-.0-;=A-Z_a-z~]+)?|[.0-:A-Fa-f]+)\])?:\d*|\[(([Vv][0-9A-Fa-f]+\.[!$&-.0-;=A-Z_a-z~]+)?|[.0-:A-Fa-f]+)\])?)?)?
  'uri': /^[a-zA-Z][a-zA-Z0-9+-.]*:[^\s]*$/,
  'uri-reference': /^(((([A-Za-z][+\-.0-9A-Za-z]*(:%[0-9A-Fa-f]{2}|:[!$&-.0-;=?-Z_a-z~]|[/?])|\?)(%[0-9A-Fa-f]{2}|[!$&-;=?-Z_a-z~])*|([A-Za-z][+\-.0-9A-Za-z]*:?)?)|([A-Za-z][+\-.0-9A-Za-z]*:)?\/((%[0-9A-Fa-f]{2}|\/((%[0-9A-Fa-f]{2}|[!$&-.0-9;=A-Z_a-z~])+|(\[(([Vv][0-9A-Fa-f]+\.[!$&-.0-;=A-Z_a-z~]+)?|[.0-:A-Fa-f]+)\])?)(:\d*)?[/?]|[!$&-.0-;=?-Z_a-z~])(%[0-9A-Fa-f]{2}|[!$&-;=?-Z_a-z~])*|(\/((%[0-9A-Fa-f]{2}|[!$&-.0-9;=A-Z_a-z~])+|(\[(([Vv][0-9A-Fa-f]+\.[!$&-.0-;=A-Z_a-z~]+)?|[.0-:A-Fa-f]+)\])?)(:\d*)?)?))#(%[0-9A-Fa-f]{2}|[!$&-;=?-Z_a-z~])*|(([A-Za-z][+\-.0-9A-Za-z]*)?%[0-9A-Fa-f]{2}|[!$&-.0-9;=@_~]|[A-Za-z][+\-.0-9A-Za-z]*[!$&-*,;=@_~])(%[0-9A-Fa-f]{2}|[!$&-.0-9;=@-Z_a-z~])*((([/?](%[0-9A-Fa-f]{2}|[!$&-;=?-Z_a-z~])*)?#|[/?])(%[0-9A-Fa-f]{2}|[!$&-;=?-Z_a-z~])*)?|([A-Za-z][+\-.0-9A-Za-z]*(:%[0-9A-Fa-f]{2}|:[!$&-.0-;=?-Z_a-z~]|[/?])|\?)(%[0-9A-Fa-f]{2}|[!$&-;=?-Z_a-z~])*|([A-Za-z][+\-.0-9A-Za-z]*:)?\/((%[0-9A-Fa-f]{2}|\/((%[0-9A-Fa-f]{2}|[!$&-.0-9;=A-Z_a-z~])+|(\[(([Vv][0-9A-Fa-f]+\.[!$&-.0-;=A-Z_a-z~]+)?|[.0-:A-Fa-f]+)\])?)(:\d*)?[/?]|[!$&-.0-;=?-Z_a-z~])(%[0-9A-Fa-f]{2}|[!$&-;=?-Z_a-z~])*|\/((%[0-9A-Fa-f]{2}|[!$&-.0-9;=A-Z_a-z~])+(:\d*)?|(\[(([Vv][0-9A-Fa-f]+\.[!$&-.0-;=A-Z_a-z~]+)?|[.0-:A-Fa-f]+)\])?:\d*|\[(([Vv][0-9A-Fa-f]+\.[!$&-.0-;=A-Z_a-z~]+)?|[.0-:A-Fa-f]+)\])?)?|[A-Za-z][+\-.0-9A-Za-z]*:?)?$/,
  'color': /^(#?([0-9A-Fa-f]{3}){1,2}\b|aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow|(rgb\(\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*,\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*,\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*\))|(rgb\(\s*(\d?\d%|100%)+\s*,\s*(\d?\d%|100%)+\s*,\s*(\d?\d%|100%)+\s*\)))$/,
  // hostname regex from: http://stackoverflow.com/a/1420225/5628
  'hostname': /^(?=.{1,255}$)[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?)*\.?$/,
  'host-name': /^(?=.{1,255}$)[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?)*\.?$/,
  'alpha': /^[a-zA-Z]+$/,
  'alphanumeric': /^[a-zA-Z0-9]+$/,
  'utc-millisec': function (input) {
    return typeof input === 'string' && parseFloat(input) === parseInt(input, 10) && !isNaN(input);
  },
  'regex': function (input) {
    var result = true;
    try {
      new RegExp(input);
    } catch (e) {
      result = false;
    }
    return result;
  },
  'style': /\s*(.+?):\s*([^;]+);?/,
  'phone': /^\+(?:[0-9] ?){6,14}[0-9]$/
};
$a7d1c719292674b299f6cb3f06994930$var$FORMAT_REGEXPS.regexp = $a7d1c719292674b299f6cb3f06994930$var$FORMAT_REGEXPS.regex;
$a7d1c719292674b299f6cb3f06994930$var$FORMAT_REGEXPS.pattern = $a7d1c719292674b299f6cb3f06994930$var$FORMAT_REGEXPS.regex;
$a7d1c719292674b299f6cb3f06994930$var$FORMAT_REGEXPS.ipv4 = $a7d1c719292674b299f6cb3f06994930$var$FORMAT_REGEXPS['ip-address'];
var $a7d1c719292674b299f6cb3f06994930$export$isFormat = function isFormat(input, format, validator) {
  if (typeof input === 'string' && $a7d1c719292674b299f6cb3f06994930$var$FORMAT_REGEXPS[format] !== undefined) {
    if ($a7d1c719292674b299f6cb3f06994930$var$FORMAT_REGEXPS[format] instanceof RegExp) {
      return $a7d1c719292674b299f6cb3f06994930$var$FORMAT_REGEXPS[format].test(input);
    }
    if (typeof $a7d1c719292674b299f6cb3f06994930$var$FORMAT_REGEXPS[format] === 'function') {
      return $a7d1c719292674b299f6cb3f06994930$var$FORMAT_REGEXPS[format](input);
    }
  } else if (validator && validator.customFormats && typeof validator.customFormats[format] === 'function') {
    return validator.customFormats[format](input);
  }
  return true;
};
var $a7d1c719292674b299f6cb3f06994930$var$makeSuffix = $a7d1c719292674b299f6cb3f06994930$export$makeSuffix = function makeSuffix(key) {
  key = key.toString();
  // This function could be capable of outputting valid a ECMAScript string, but the
  // resulting code for testing which form to use would be tens of thousands of characters long
  // That means this will use the name form for some illegal forms
  if (!key.match(/[.\s\[\]]/) && !key.match(/^[\d]/)) {
    return '.' + key;
  }
  if (key.match(/^\d+$/)) {
    return '[' + key + ']';
  }
  return '[' + JSON.stringify(key) + ']';
};
var $a7d1c719292674b299f6cb3f06994930$export$deepCompareStrict = function deepCompareStrict(a, b) {
  if (typeof a !== typeof b) {
    return false;
  }
  if (Array.isArray(a)) {
    if (!Array.isArray(b)) {
      return false;
    }
    if (a.length !== b.length) {
      return false;
    }
    return a.every(function (v, i) {
      return deepCompareStrict(a[i], b[i]);
    });
  }
  if (typeof a === 'object') {
    if (!a || !b) {
      return a === b;
    }
    var aKeys = Object.keys(a);
    var bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) {
      return false;
    }
    return aKeys.every(function (v) {
      return deepCompareStrict(a[v], b[v]);
    });
  }
  return a === b;
};
function $a7d1c719292674b299f6cb3f06994930$var$deepMerger(target, dst, e, i) {
  if (typeof e === 'object') {
    dst[i] = $a7d1c719292674b299f6cb3f06994930$var$deepMerge(target[i], e);
  } else {
    if (target.indexOf(e) === -1) {
      dst.push(e);
    }
  }
}
function $a7d1c719292674b299f6cb3f06994930$var$copyist(src, dst, key) {
  dst[key] = src[key];
}
function $a7d1c719292674b299f6cb3f06994930$var$copyistWithDeepMerge(target, src, dst, key) {
  if (typeof src[key] !== 'object' || !src[key]) {
    dst[key] = src[key];
  } else {
    if (!target[key]) {
      dst[key] = src[key];
    } else {
      dst[key] = $a7d1c719292674b299f6cb3f06994930$var$deepMerge(target[key], src[key]);
    }
  }
}
function $a7d1c719292674b299f6cb3f06994930$var$deepMerge(target, src) {
  var array = Array.isArray(src);
  var dst = array && [] || ({});
  if (array) {
    target = target || [];
    dst = dst.concat(target);
    src.forEach($a7d1c719292674b299f6cb3f06994930$var$deepMerger.bind(null, target, dst));
  } else {
    if (target && typeof target === 'object') {
      Object.keys(target).forEach($a7d1c719292674b299f6cb3f06994930$var$copyist.bind(null, target, dst));
    }
    Object.keys(src).forEach($a7d1c719292674b299f6cb3f06994930$var$copyistWithDeepMerge.bind(null, target, src, dst));
  }
  return dst;
}
var $a7d1c719292674b299f6cb3f06994930$export$deepMerge = $a7d1c719292674b299f6cb3f06994930$var$deepMerge;
var $a7d1c719292674b299f6cb3f06994930$export$objectGetPath = function objectGetPath(o, s) {
  var parts = s.split('/').slice(1);
  var k;
  while (typeof (k = parts.shift()) == 'string') {
    var n = decodeURIComponent(k.replace(/~0/, '~').replace(/~1/g, '/'));
    if (!((n in o))) return;
    o = o[n];
  }
  return o;
};
function $a7d1c719292674b299f6cb3f06994930$var$pathEncoder(v) {
  return '/' + encodeURIComponent(v).replace(/~/g, '%7E');
}
var $a7d1c719292674b299f6cb3f06994930$export$getDecimalPlaces = function getDecimalPlaces(number) {
  var decimalPlaces = 0;
  if (isNaN(number)) return decimalPlaces;
  if (typeof number !== 'number') {
    number = Number(number);
  }
  var parts = number.toString().split('e');
  if (parts.length === 2) {
    if (parts[1][0] !== '-') {
      return decimalPlaces;
    } else {
      decimalPlaces = Number(parts[1].slice(1));
    }
  }
  var decimalParts = parts[0].split('.');
  if (decimalParts.length === 2) {
    decimalPlaces += decimalParts[1].length;
  }
  return decimalPlaces;
};
var $a7d1c719292674b299f6cb3f06994930$export$isSchema = function isSchema(val) {
  return typeof val === 'object' && val || typeof val === 'boolean';
};
/** @type ValidatorResult*/
var $eaddba78edc0a539a6e1ffe5f8f0bf4b$var$ValidatorResult = $a7d1c719292674b299f6cb3f06994930$export$ValidatorResult;
/** @type SchemaError*/
var $eaddba78edc0a539a6e1ffe5f8f0bf4b$var$SchemaError = $a7d1c719292674b299f6cb3f06994930$export$SchemaError;
var $eaddba78edc0a539a6e1ffe5f8f0bf4b$var$attribute = {};
$eaddba78edc0a539a6e1ffe5f8f0bf4b$var$attribute.ignoreProperties = {
  // informative properties
  'id': true,
  'default': true,
  'description': true,
  'title': true,
  // arguments to other properties
  'additionalItems': true,
  'then': true,
  'else': true,
  // special-handled properties
  '$schema': true,
  '$ref': true,
  'extends': true
};
/**
* @name validators
*/
var $eaddba78edc0a539a6e1ffe5f8f0bf4b$var$validators = $eaddba78edc0a539a6e1ffe5f8f0bf4b$var$attribute.validators = {};
/**
* Validates whether the instance if of a certain type
* @param instance
* @param schema
* @param options
* @param ctx
* @return {ValidatorResult|null}
*/
$eaddba78edc0a539a6e1ffe5f8f0bf4b$var$validators.type = function validateType(instance, schema, options, ctx) {
  // Ignore undefined instances
  if (instance === undefined) {
    return null;
  }
  var result = new $eaddba78edc0a539a6e1ffe5f8f0bf4b$var$ValidatorResult(instance, schema, options, ctx);
  var types = Array.isArray(schema.type) ? schema.type : [schema.type];
  if (!types.some(this.testType.bind(this, instance, schema, options, ctx))) {
    var list = types.map(function (v) {
      if (!v) return;
      var id = v.$id || v.id;
      return id ? '<' + id + '>' : v + '';
    });
    result.addError({
      name: 'type',
      argument: list,
      message: "is not of a type(s) " + list
    });
  }
  return result;
};
function $eaddba78edc0a539a6e1ffe5f8f0bf4b$var$testSchemaNoThrow(instance, options, ctx, callback, schema) {
  var throwError = options.throwError;
  var throwAll = options.throwAll;
  options.throwError = false;
  options.throwAll = false;
  var res = this.validateSchema(instance, schema, options, ctx);
  options.throwError = throwError;
  options.throwAll = throwAll;
  if (!res.valid && callback instanceof Function) {
    callback(res);
  }
  return res.valid;
}
/**
* Validates whether the instance matches some of the given schemas
* @param instance
* @param schema
* @param options
* @param ctx
* @return {ValidatorResult|null}
*/
$eaddba78edc0a539a6e1ffe5f8f0bf4b$var$validators.anyOf = function validateAnyOf(instance, schema, options, ctx) {
  // Ignore undefined instances
  if (instance === undefined) {
    return null;
  }
  var result = new $eaddba78edc0a539a6e1ffe5f8f0bf4b$var$ValidatorResult(instance, schema, options, ctx);
  var inner = new $eaddba78edc0a539a6e1ffe5f8f0bf4b$var$ValidatorResult(instance, schema, options, ctx);
  if (!Array.isArray(schema.anyOf)) {
    throw new $eaddba78edc0a539a6e1ffe5f8f0bf4b$var$SchemaError("anyOf must be an array");
  }
  if (!schema.anyOf.some($eaddba78edc0a539a6e1ffe5f8f0bf4b$var$testSchemaNoThrow.bind(this, instance, options, ctx, function (res) {
    inner.importErrors(res);
  }))) {
    var list = schema.anyOf.map(function (v, i) {
      var id = v.$id || v.id;
      if (id) return '<' + id + '>';
      return v.title && JSON.stringify(v.title) || v['$ref'] && '<' + v['$ref'] + '>' || '[subschema ' + i + ']';
    });
    if (options.nestedErrors) {
      result.importErrors(inner);
    }
    result.addError({
      name: 'anyOf',
      argument: list,
      message: "is not any of " + list.join(',')
    });
  }
  return result;
};
/**
* Validates whether the instance matches every given schema
* @param instance
* @param schema
* @param options
* @param ctx
* @return {String|null}
*/
$eaddba78edc0a539a6e1ffe5f8f0bf4b$var$validators.allOf = function validateAllOf(instance, schema, options, ctx) {
  // Ignore undefined instances
  if (instance === undefined) {
    return null;
  }
  if (!Array.isArray(schema.allOf)) {
    throw new $eaddba78edc0a539a6e1ffe5f8f0bf4b$var$SchemaError("allOf must be an array");
  }
  var result = new $eaddba78edc0a539a6e1ffe5f8f0bf4b$var$ValidatorResult(instance, schema, options, ctx);
  var self = this;
  schema.allOf.forEach(function (v, i) {
    var valid = self.validateSchema(instance, v, options, ctx);
    if (!valid.valid) {
      var id = v.$id || v.id;
      var msg = id || v.title && JSON.stringify(v.title) || v['$ref'] && '<' + v['$ref'] + '>' || '[subschema ' + i + ']';
      result.addError({
        name: 'allOf',
        argument: {
          id: msg,
          length: valid.errors.length,
          valid: valid
        },
        message: 'does not match allOf schema ' + msg + ' with ' + valid.errors.length + ' error[s]:'
      });
      result.importErrors(valid);
    }
  });
  return result;
};
/**
* Validates whether the instance matches exactly one of the given schemas
* @param instance
* @param schema
* @param options
* @param ctx
* @return {String|null}
*/
$eaddba78edc0a539a6e1ffe5f8f0bf4b$var$validators.oneOf = function validateOneOf(instance, schema, options, ctx) {
  // Ignore undefined instances
  if (instance === undefined) {
    return null;
  }
  if (!Array.isArray(schema.oneOf)) {
    throw new $eaddba78edc0a539a6e1ffe5f8f0bf4b$var$SchemaError("oneOf must be an array");
  }
  var result = new $eaddba78edc0a539a6e1ffe5f8f0bf4b$var$ValidatorResult(instance, schema, options, ctx);
  var inner = new $eaddba78edc0a539a6e1ffe5f8f0bf4b$var$ValidatorResult(instance, schema, options, ctx);
  var count = schema.oneOf.filter($eaddba78edc0a539a6e1ffe5f8f0bf4b$var$testSchemaNoThrow.bind(this, instance, options, ctx, function (res) {
    inner.importErrors(res);
  })).length;
  var list = schema.oneOf.map(function (v, i) {
    var id = v.$id || v.id;
    return id || v.title && JSON.stringify(v.title) || v['$ref'] && '<' + v['$ref'] + '>' || '[subschema ' + i + ']';
  });
  if (count !== 1) {
    if (options.nestedErrors) {
      result.importErrors(inner);
    }
    result.addError({
      name: 'oneOf',
      argument: list,
      message: "is not exactly one from " + list.join(',')
    });
  }
  return result;
};
/**
* Validates "then" or "else" depending on the result of validating "if"
* @param instance
* @param schema
* @param options
* @param ctx
* @return {String|null}
*/
$eaddba78edc0a539a6e1ffe5f8f0bf4b$var$validators.if = function validateIf(instance, schema, options, ctx) {
  // Ignore undefined instances
  if (instance === undefined) return null;
  if (!$a7d1c719292674b299f6cb3f06994930$export$isSchema(schema.if)) throw new Error('Expected "if" keyword to be a schema');
  var ifValid = $eaddba78edc0a539a6e1ffe5f8f0bf4b$var$testSchemaNoThrow.call(this, instance, options, ctx, null, schema.if);
  var result = new $eaddba78edc0a539a6e1ffe5f8f0bf4b$var$ValidatorResult(instance, schema, options, ctx);
  var res;
  if (ifValid) {
    if (schema.then === undefined) return;
    if (!$a7d1c719292674b299f6cb3f06994930$export$isSchema(schema.then)) throw new Error('Expected "then" keyword to be a schema');
    res = this.validateSchema(instance, schema.then, options, ctx.makeChild(schema.then));
    result.importErrors(res);
  } else {
    if (schema.else === undefined) return;
    if (!$a7d1c719292674b299f6cb3f06994930$export$isSchema(schema.else)) throw new Error('Expected "else" keyword to be a schema');
    res = this.validateSchema(instance, schema.else, options, ctx.makeChild(schema.else));
    result.importErrors(res);
  }
  return result;
};
function $eaddba78edc0a539a6e1ffe5f8f0bf4b$var$getEnumerableProperty(object, key) {
  // Determine if `key` shows up in `for(var key in object)`
  // First test Object.hasOwnProperty.call as an optimization: that guarantees it does
  if (Object.hasOwnProperty.call(object, key)) return object[key];
  // Test `key in object` as an optimization; false means it won't
  if (!((key in object))) return;
  while (object = Object.getPrototypeOf(object)) {
    if (Object.propertyIsEnumerable.call(object, key)) return object[key];
  }
}
/**
* Validates propertyNames
* @param instance
* @param schema
* @param options
* @param ctx
* @return {String|null|ValidatorResult}
*/
$eaddba78edc0a539a6e1ffe5f8f0bf4b$var$validators.propertyNames = function validatePropertyNames(instance, schema, options, ctx) {
  if (!this.types.object(instance)) return;
  var result = new $eaddba78edc0a539a6e1ffe5f8f0bf4b$var$ValidatorResult(instance, schema, options, ctx);
  var subschema = schema.propertyNames !== undefined ? schema.propertyNames : {};
  if (!$a7d1c719292674b299f6cb3f06994930$export$isSchema(subschema)) throw new $eaddba78edc0a539a6e1ffe5f8f0bf4b$var$SchemaError('Expected "propertyNames" to be a schema (object or boolean)');
  for (var property in instance) {
    if ($eaddba78edc0a539a6e1ffe5f8f0bf4b$var$getEnumerableProperty(instance, property) !== undefined) {
      var res = this.validateSchema(property, subschema, options, ctx.makeChild(subschema));
      result.importErrors(res);
    }
  }
  return result;
};
/**
* Validates properties
* @param instance
* @param schema
* @param options
* @param ctx
* @return {String|null|ValidatorResult}
*/
$eaddba78edc0a539a6e1ffe5f8f0bf4b$var$validators.properties = function validateProperties(instance, schema, options, ctx) {
  if (!this.types.object(instance)) return;
  var result = new $eaddba78edc0a539a6e1ffe5f8f0bf4b$var$ValidatorResult(instance, schema, options, ctx);
  var properties = schema.properties || ({});
  for (var property in properties) {
    var subschema = properties[property];
    if (subschema === undefined) {
      continue;
    } else if (subschema === null) {
      throw new $eaddba78edc0a539a6e1ffe5f8f0bf4b$var$SchemaError('Unexpected null, expected schema in "properties"');
    }
    if (typeof options.preValidateProperty == 'function') {
      options.preValidateProperty(instance, property, subschema, options, ctx);
    }
    var prop = $eaddba78edc0a539a6e1ffe5f8f0bf4b$var$getEnumerableProperty(instance, property);
    var res = this.validateSchema(prop, subschema, options, ctx.makeChild(subschema, property));
    if (res.instance !== result.instance[property]) result.instance[property] = res.instance;
    result.importErrors(res);
  }
  return result;
};
/**
* Test a specific property within in instance against the additionalProperties schema attribute
* This ignores properties with definitions in the properties schema attribute, but no other attributes.
* If too many more types of property-existence tests pop up they may need their own class of tests (like `type` has)
* @private
* @return {boolean}
*/
function $eaddba78edc0a539a6e1ffe5f8f0bf4b$var$testAdditionalProperty(instance, schema, options, ctx, property, result) {
  if (!this.types.object(instance)) return;
  if (schema.properties && schema.properties[property] !== undefined) {
    return;
  }
  if (schema.additionalProperties === false) {
    result.addError({
      name: 'additionalProperties',
      argument: property,
      message: "is not allowed to have the additional property " + JSON.stringify(property)
    });
  } else {
    var additionalProperties = schema.additionalProperties || ({});
    if (typeof options.preValidateProperty == 'function') {
      options.preValidateProperty(instance, property, additionalProperties, options, ctx);
    }
    var res = this.validateSchema(instance[property], additionalProperties, options, ctx.makeChild(additionalProperties, property));
    if (res.instance !== result.instance[property]) result.instance[property] = res.instance;
    result.importErrors(res);
  }
}
/**
* Validates patternProperties
* @param instance
* @param schema
* @param options
* @param ctx
* @return {String|null|ValidatorResult}
*/
$eaddba78edc0a539a6e1ffe5f8f0bf4b$var$validators.patternProperties = function validatePatternProperties(instance, schema, options, ctx) {
  if (!this.types.object(instance)) return;
  var result = new $eaddba78edc0a539a6e1ffe5f8f0bf4b$var$ValidatorResult(instance, schema, options, ctx);
  var patternProperties = schema.patternProperties || ({});
  for (var property in instance) {
    var test = true;
    for (var pattern in patternProperties) {
      var subschema = patternProperties[pattern];
      if (subschema === undefined) {
        continue;
      } else if (subschema === null) {
        throw new $eaddba78edc0a539a6e1ffe5f8f0bf4b$var$SchemaError('Unexpected null, expected schema in "patternProperties"');
      }
      try {
        var regexp = new RegExp(pattern, 'u');
      } catch (_e) {
        // In the event the stricter handling causes an error, fall back on the forgiving handling
        // DEPRECATED
        regexp = new RegExp(pattern);
      }
      if (!regexp.test(property)) {
        continue;
      }
      test = false;
      if (typeof options.preValidateProperty == 'function') {
        options.preValidateProperty(instance, property, subschema, options, ctx);
      }
      var res = this.validateSchema(instance[property], subschema, options, ctx.makeChild(subschema, property));
      if (res.instance !== result.instance[property]) result.instance[property] = res.instance;
      result.importErrors(res);
    }
    if (test) {
      $eaddba78edc0a539a6e1ffe5f8f0bf4b$var$testAdditionalProperty.call(this, instance, schema, options, ctx, property, result);
    }
  }
  return result;
};
/**
* Validates additionalProperties
* @param instance
* @param schema
* @param options
* @param ctx
* @return {String|null|ValidatorResult}
*/
$eaddba78edc0a539a6e1ffe5f8f0bf4b$var$validators.additionalProperties = function validateAdditionalProperties(instance, schema, options, ctx) {
  if (!this.types.object(instance)) return;
  // if patternProperties is defined then we'll test when that one is called instead
  if (schema.patternProperties) {
    return null;
  }
  var result = new $eaddba78edc0a539a6e1ffe5f8f0bf4b$var$ValidatorResult(instance, schema, options, ctx);
  for (var property in instance) {
    $eaddba78edc0a539a6e1ffe5f8f0bf4b$var$testAdditionalProperty.call(this, instance, schema, options, ctx, property, result);
  }
  return result;
};
/**
* Validates whether the instance value is at least of a certain length, when the instance value is a string.
* @param instance
* @param schema
* @return {String|null}
*/
$eaddba78edc0a539a6e1ffe5f8f0bf4b$var$validators.minProperties = function validateMinProperties(instance, schema, options, ctx) {
  if (!this.types.object(instance)) return;
  var result = new $eaddba78edc0a539a6e1ffe5f8f0bf4b$var$ValidatorResult(instance, schema, options, ctx);
  var keys = Object.keys(instance);
  if (!(keys.length >= schema.minProperties)) {
    result.addError({
      name: 'minProperties',
      argument: schema.minProperties,
      message: "does not meet minimum property length of " + schema.minProperties
    });
  }
  return result;
};
/**
* Validates whether the instance value is at most of a certain length, when the instance value is a string.
* @param instance
* @param schema
* @return {String|null}
*/
$eaddba78edc0a539a6e1ffe5f8f0bf4b$var$validators.maxProperties = function validateMaxProperties(instance, schema, options, ctx) {
  if (!this.types.object(instance)) return;
  var result = new $eaddba78edc0a539a6e1ffe5f8f0bf4b$var$ValidatorResult(instance, schema, options, ctx);
  var keys = Object.keys(instance);
  if (!(keys.length <= schema.maxProperties)) {
    result.addError({
      name: 'maxProperties',
      argument: schema.maxProperties,
      message: "does not meet maximum property length of " + schema.maxProperties
    });
  }
  return result;
};
/**
* Validates items when instance is an array
* @param instance
* @param schema
* @param options
* @param ctx
* @return {String|null|ValidatorResult}
*/
$eaddba78edc0a539a6e1ffe5f8f0bf4b$var$validators.items = function validateItems(instance, schema, options, ctx) {
  var self = this;
  if (!this.types.array(instance)) return;
  if (!schema.items) return;
  var result = new $eaddba78edc0a539a6e1ffe5f8f0bf4b$var$ValidatorResult(instance, schema, options, ctx);
  instance.every(function (value, i) {
    var items = Array.isArray(schema.items) ? schema.items[i] || schema.additionalItems : schema.items;
    if (items === undefined) {
      return true;
    }
    if (items === false) {
      result.addError({
        name: 'items',
        message: "additionalItems not permitted"
      });
      return false;
    }
    var res = self.validateSchema(value, items, options, ctx.makeChild(items, i));
    if (res.instance !== result.instance[i]) result.instance[i] = res.instance;
    result.importErrors(res);
    return true;
  });
  return result;
};
/**
* Validates minimum and exclusiveMinimum when the type of the instance value is a number.
* @param instance
* @param schema
* @return {String|null}
*/
$eaddba78edc0a539a6e1ffe5f8f0bf4b$var$validators.minimum = function validateMinimum(instance, schema, options, ctx) {
  if (!this.types.number(instance)) return;
  var result = new $eaddba78edc0a539a6e1ffe5f8f0bf4b$var$ValidatorResult(instance, schema, options, ctx);
  if (schema.exclusiveMinimum && schema.exclusiveMinimum === true) {
    if (!(instance > schema.minimum)) {
      result.addError({
        name: 'minimum',
        argument: schema.minimum,
        message: "must be greater than " + schema.minimum
      });
    }
  } else {
    if (!(instance >= schema.minimum)) {
      result.addError({
        name: 'minimum',
        argument: schema.minimum,
        message: "must be greater than or equal to " + schema.minimum
      });
    }
  }
  return result;
};
/**
* Validates maximum and exclusiveMaximum when the type of the instance value is a number.
* @param instance
* @param schema
* @return {String|null}
*/
$eaddba78edc0a539a6e1ffe5f8f0bf4b$var$validators.maximum = function validateMaximum(instance, schema, options, ctx) {
  if (!this.types.number(instance)) return;
  var result = new $eaddba78edc0a539a6e1ffe5f8f0bf4b$var$ValidatorResult(instance, schema, options, ctx);
  if (schema.exclusiveMaximum && schema.exclusiveMaximum === true) {
    if (!(instance < schema.maximum)) {
      result.addError({
        name: 'maximum',
        argument: schema.maximum,
        message: "must be less than " + schema.maximum
      });
    }
  } else {
    if (!(instance <= schema.maximum)) {
      result.addError({
        name: 'maximum',
        argument: schema.maximum,
        message: "must be less than or equal to " + schema.maximum
      });
    }
  }
  return result;
};
/**
* Validates the number form of exclusiveMinimum when the type of the instance value is a number.
* @param instance
* @param schema
* @return {String|null}
*/
$eaddba78edc0a539a6e1ffe5f8f0bf4b$var$validators.exclusiveMinimum = function validateExclusiveMinimum(instance, schema, options, ctx) {
  // Support the boolean form of exclusiveMinimum, which is handled by the "minimum" keyword.
  if (typeof schema.exclusiveMaximum === 'boolean') return;
  if (!this.types.number(instance)) return;
  var result = new $eaddba78edc0a539a6e1ffe5f8f0bf4b$var$ValidatorResult(instance, schema, options, ctx);
  var valid = instance > schema.exclusiveMinimum;
  if (!valid) {
    result.addError({
      name: 'exclusiveMinimum',
      argument: schema.exclusiveMinimum,
      message: "must be strictly greater than " + schema.exclusiveMinimum
    });
  }
  return result;
};
/**
* Validates the number form of exclusiveMaximum when the type of the instance value is a number.
* @param instance
* @param schema
* @return {String|null}
*/
$eaddba78edc0a539a6e1ffe5f8f0bf4b$var$validators.exclusiveMaximum = function validateExclusiveMaximum(instance, schema, options, ctx) {
  // Support the boolean form of exclusiveMaximum, which is handled by the "maximum" keyword.
  if (typeof schema.exclusiveMaximum === 'boolean') return;
  if (!this.types.number(instance)) return;
  var result = new $eaddba78edc0a539a6e1ffe5f8f0bf4b$var$ValidatorResult(instance, schema, options, ctx);
  var valid = instance < schema.exclusiveMaximum;
  if (!valid) {
    result.addError({
      name: 'exclusiveMaximum',
      argument: schema.exclusiveMaximum,
      message: "must be strictly less than " + schema.exclusiveMaximum
    });
  }
  return result;
};
/**
* Perform validation for multipleOf and divisibleBy, which are essentially the same.
* @param instance
* @param schema
* @param validationType
* @param errorMessage
* @returns {String|null}
*/
var $eaddba78edc0a539a6e1ffe5f8f0bf4b$var$validateMultipleOfOrDivisbleBy = function validateMultipleOfOrDivisbleBy(instance, schema, options, ctx, validationType, errorMessage) {
  if (!this.types.number(instance)) return;
  var validationArgument = schema[validationType];
  if (validationArgument == 0) {
    throw new $eaddba78edc0a539a6e1ffe5f8f0bf4b$var$SchemaError(validationType + " cannot be zero");
  }
  var result = new $eaddba78edc0a539a6e1ffe5f8f0bf4b$var$ValidatorResult(instance, schema, options, ctx);
  var instanceDecimals = $a7d1c719292674b299f6cb3f06994930$export$getDecimalPlaces(instance);
  var divisorDecimals = $a7d1c719292674b299f6cb3f06994930$export$getDecimalPlaces(validationArgument);
  var maxDecimals = Math.max(instanceDecimals, divisorDecimals);
  var multiplier = Math.pow(10, maxDecimals);
  if (Math.round(instance * multiplier) % Math.round(validationArgument * multiplier) !== 0) {
    result.addError({
      name: validationType,
      argument: validationArgument,
      message: errorMessage + JSON.stringify(validationArgument)
    });
  }
  return result;
};
/**
* Validates divisibleBy when the type of the instance value is a number.
* @param instance
* @param schema
* @return {String|null}
*/
$eaddba78edc0a539a6e1ffe5f8f0bf4b$var$validators.multipleOf = function validateMultipleOf(instance, schema, options, ctx) {
  return $eaddba78edc0a539a6e1ffe5f8f0bf4b$var$validateMultipleOfOrDivisbleBy.call(this, instance, schema, options, ctx, "multipleOf", "is not a multiple of (divisible by) ");
};
/**
* Validates multipleOf when the type of the instance value is a number.
* @param instance
* @param schema
* @return {String|null}
*/
$eaddba78edc0a539a6e1ffe5f8f0bf4b$var$validators.divisibleBy = function validateDivisibleBy(instance, schema, options, ctx) {
  return $eaddba78edc0a539a6e1ffe5f8f0bf4b$var$validateMultipleOfOrDivisbleBy.call(this, instance, schema, options, ctx, "divisibleBy", "is not divisible by (multiple of) ");
};
/**
* Validates whether the instance value is present.
* @param instance
* @param schema
* @return {String|null}
*/
$eaddba78edc0a539a6e1ffe5f8f0bf4b$var$validators.required = function validateRequired(instance, schema, options, ctx) {
  var result = new $eaddba78edc0a539a6e1ffe5f8f0bf4b$var$ValidatorResult(instance, schema, options, ctx);
  if (instance === undefined && schema.required === true) {
    // A boolean form is implemented for reverse-compatibility with schemas written against older drafts
    result.addError({
      name: 'required',
      message: "is required"
    });
  } else if (this.types.object(instance) && Array.isArray(schema.required)) {
    schema.required.forEach(function (n) {
      if ($eaddba78edc0a539a6e1ffe5f8f0bf4b$var$getEnumerableProperty(instance, n) === undefined) {
        result.addError({
          name: 'required',
          argument: n,
          message: "requires property " + JSON.stringify(n)
        });
      }
    });
  }
  return result;
};
/**
* Validates whether the instance value matches the regular expression, when the instance value is a string.
* @param instance
* @param schema
* @return {String|null}
*/
$eaddba78edc0a539a6e1ffe5f8f0bf4b$var$validators.pattern = function validatePattern(instance, schema, options, ctx) {
  if (!this.types.string(instance)) return;
  var result = new $eaddba78edc0a539a6e1ffe5f8f0bf4b$var$ValidatorResult(instance, schema, options, ctx);
  var pattern = schema.pattern;
  try {
    var regexp = new RegExp(pattern, 'u');
  } catch (_e) {
    // In the event the stricter handling causes an error, fall back on the forgiving handling
    // DEPRECATED
    regexp = new RegExp(pattern);
  }
  if (!instance.match(regexp)) {
    result.addError({
      name: 'pattern',
      argument: schema.pattern,
      message: "does not match pattern " + JSON.stringify(schema.pattern.toString())
    });
  }
  return result;
};
/**
* Validates whether the instance value is of a certain defined format or a custom
* format.
* The following formats are supported for string types:
*   - date-time
*   - date
*   - time
*   - ip-address
*   - ipv6
*   - uri
*   - color
*   - host-name
*   - alpha
*   - alpha-numeric
*   - utc-millisec
* @param instance
* @param schema
* @param [options]
* @param [ctx]
* @return {String|null}
*/
$eaddba78edc0a539a6e1ffe5f8f0bf4b$var$validators.format = function validateFormat(instance, schema, options, ctx) {
  if (instance === undefined) return;
  var result = new $eaddba78edc0a539a6e1ffe5f8f0bf4b$var$ValidatorResult(instance, schema, options, ctx);
  if (!result.disableFormat && !$a7d1c719292674b299f6cb3f06994930$export$isFormat(instance, schema.format, this)) {
    result.addError({
      name: 'format',
      argument: schema.format,
      message: "does not conform to the " + JSON.stringify(schema.format) + " format"
    });
  }
  return result;
};
/**
* Validates whether the instance value is at least of a certain length, when the instance value is a string.
* @param instance
* @param schema
* @return {String|null}
*/
$eaddba78edc0a539a6e1ffe5f8f0bf4b$var$validators.minLength = function validateMinLength(instance, schema, options, ctx) {
  if (!this.types.string(instance)) return;
  var result = new $eaddba78edc0a539a6e1ffe5f8f0bf4b$var$ValidatorResult(instance, schema, options, ctx);
  var hsp = instance.match(/[\uDC00-\uDFFF]/g);
  var length = instance.length - (hsp ? hsp.length : 0);
  if (!(length >= schema.minLength)) {
    result.addError({
      name: 'minLength',
      argument: schema.minLength,
      message: "does not meet minimum length of " + schema.minLength
    });
  }
  return result;
};
/**
* Validates whether the instance value is at most of a certain length, when the instance value is a string.
* @param instance
* @param schema
* @return {String|null}
*/
$eaddba78edc0a539a6e1ffe5f8f0bf4b$var$validators.maxLength = function validateMaxLength(instance, schema, options, ctx) {
  if (!this.types.string(instance)) return;
  var result = new $eaddba78edc0a539a6e1ffe5f8f0bf4b$var$ValidatorResult(instance, schema, options, ctx);
  // TODO if this was already computed in "minLength", use that value instead of re-computing
  var hsp = instance.match(/[\uDC00-\uDFFF]/g);
  var length = instance.length - (hsp ? hsp.length : 0);
  if (!(length <= schema.maxLength)) {
    result.addError({
      name: 'maxLength',
      argument: schema.maxLength,
      message: "does not meet maximum length of " + schema.maxLength
    });
  }
  return result;
};
/**
* Validates whether instance contains at least a minimum number of items, when the instance is an Array.
* @param instance
* @param schema
* @return {String|null}
*/
$eaddba78edc0a539a6e1ffe5f8f0bf4b$var$validators.minItems = function validateMinItems(instance, schema, options, ctx) {
  if (!this.types.array(instance)) return;
  var result = new $eaddba78edc0a539a6e1ffe5f8f0bf4b$var$ValidatorResult(instance, schema, options, ctx);
  if (!(instance.length >= schema.minItems)) {
    result.addError({
      name: 'minItems',
      argument: schema.minItems,
      message: "does not meet minimum length of " + schema.minItems
    });
  }
  return result;
};
/**
* Validates whether instance contains no more than a maximum number of items, when the instance is an Array.
* @param instance
* @param schema
* @return {String|null}
*/
$eaddba78edc0a539a6e1ffe5f8f0bf4b$var$validators.maxItems = function validateMaxItems(instance, schema, options, ctx) {
  if (!this.types.array(instance)) return;
  var result = new $eaddba78edc0a539a6e1ffe5f8f0bf4b$var$ValidatorResult(instance, schema, options, ctx);
  if (!(instance.length <= schema.maxItems)) {
    result.addError({
      name: 'maxItems',
      argument: schema.maxItems,
      message: "does not meet maximum length of " + schema.maxItems
    });
  }
  return result;
};
/**
* Deep compares arrays for duplicates
* @param v
* @param i
* @param a
* @private
* @return {boolean}
*/
function $eaddba78edc0a539a6e1ffe5f8f0bf4b$var$testArrays(v, i, a) {
  var j, len = a.length;
  for ((j = i + 1, len); j < len; j++) {
    if ($a7d1c719292674b299f6cb3f06994930$export$deepCompareStrict(v, a[j])) {
      return false;
    }
  }
  return true;
}
/**
* Validates whether there are no duplicates, when the instance is an Array.
* @param instance
* @return {String|null}
*/
$eaddba78edc0a539a6e1ffe5f8f0bf4b$var$validators.uniqueItems = function validateUniqueItems(instance, schema, options, ctx) {
  if (schema.uniqueItems !== true) return;
  if (!this.types.array(instance)) return;
  var result = new $eaddba78edc0a539a6e1ffe5f8f0bf4b$var$ValidatorResult(instance, schema, options, ctx);
  if (!instance.every($eaddba78edc0a539a6e1ffe5f8f0bf4b$var$testArrays)) {
    result.addError({
      name: 'uniqueItems',
      message: "contains duplicate item"
    });
  }
  return result;
};
/**
* Validate for the presence of dependency properties, if the instance is an object.
* @param instance
* @param schema
* @param options
* @param ctx
* @return {null|ValidatorResult}
*/
$eaddba78edc0a539a6e1ffe5f8f0bf4b$var$validators.dependencies = function validateDependencies(instance, schema, options, ctx) {
  if (!this.types.object(instance)) return;
  var result = new $eaddba78edc0a539a6e1ffe5f8f0bf4b$var$ValidatorResult(instance, schema, options, ctx);
  for (var property in schema.dependencies) {
    if (instance[property] === undefined) {
      continue;
    }
    var dep = schema.dependencies[property];
    var childContext = ctx.makeChild(dep, property);
    if (typeof dep == 'string') {
      dep = [dep];
    }
    if (Array.isArray(dep)) {
      dep.forEach(function (prop) {
        if (instance[prop] === undefined) {
          result.addError({
            // FIXME there's two different "dependencies" errors here with slightly different outputs
            // Can we make these the same? Or should we create different error types?
            name: 'dependencies',
            argument: childContext.propertyPath,
            message: "property " + prop + " not found, required by " + childContext.propertyPath
          });
        }
      });
    } else {
      var res = this.validateSchema(instance, dep, options, childContext);
      if (result.instance !== res.instance) result.instance = res.instance;
      if (res && res.errors.length) {
        result.addError({
          name: 'dependencies',
          argument: childContext.propertyPath,
          message: "does not meet dependency required by " + childContext.propertyPath
        });
        result.importErrors(res);
      }
    }
  }
  return result;
};
/**
* Validates whether the instance value is one of the enumerated values.
*
* @param instance
* @param schema
* @return {ValidatorResult|null}
*/
$eaddba78edc0a539a6e1ffe5f8f0bf4b$var$validators['enum'] = function validateEnum(instance, schema, options, ctx) {
  if (instance === undefined) {
    return null;
  }
  if (!Array.isArray(schema['enum'])) {
    throw new $eaddba78edc0a539a6e1ffe5f8f0bf4b$var$SchemaError("enum expects an array", schema);
  }
  var result = new $eaddba78edc0a539a6e1ffe5f8f0bf4b$var$ValidatorResult(instance, schema, options, ctx);
  if (!schema['enum'].some($a7d1c719292674b299f6cb3f06994930$export$deepCompareStrict.bind(null, instance))) {
    result.addError({
      name: 'enum',
      argument: schema['enum'],
      message: "is not one of enum values: " + schema['enum'].map(String).join(',')
    });
  }
  return result;
};
/**
* Validates whether the instance exactly matches a given value
*
* @param instance
* @param schema
* @return {ValidatorResult|null}
*/
$eaddba78edc0a539a6e1ffe5f8f0bf4b$var$validators['const'] = function validateEnum(instance, schema, options, ctx) {
  if (instance === undefined) {
    return null;
  }
  var result = new $eaddba78edc0a539a6e1ffe5f8f0bf4b$var$ValidatorResult(instance, schema, options, ctx);
  if (!$a7d1c719292674b299f6cb3f06994930$export$deepCompareStrict(schema['const'], instance)) {
    result.addError({
      name: 'const',
      argument: schema['const'],
      message: "does not exactly match expected constant: " + schema['const']
    });
  }
  return result;
};
/**
* Validates whether the instance if of a prohibited type.
* @param instance
* @param schema
* @param options
* @param ctx
* @return {null|ValidatorResult}
*/
$eaddba78edc0a539a6e1ffe5f8f0bf4b$var$validators.not = $eaddba78edc0a539a6e1ffe5f8f0bf4b$var$validators.disallow = function validateNot(instance, schema, options, ctx) {
  var self = this;
  if (instance === undefined) return null;
  var result = new $eaddba78edc0a539a6e1ffe5f8f0bf4b$var$ValidatorResult(instance, schema, options, ctx);
  var notTypes = schema.not || schema.disallow;
  if (!notTypes) return null;
  if (!Array.isArray(notTypes)) notTypes = [notTypes];
  notTypes.forEach(function (type) {
    if (self.testType(instance, schema, options, ctx, type)) {
      var id = type && (type.$id || type.id);
      var schemaId = id || type;
      result.addError({
        name: 'not',
        argument: schemaId,
        message: "is of prohibited type " + schemaId
      });
    }
  });
  return result;
};
$eaddba78edc0a539a6e1ffe5f8f0bf4b$exports = $eaddba78edc0a539a6e1ffe5f8f0bf4b$var$attribute;
var $45480b8a0602de72d96bb9173efef493$export$SchemaScanResult = $45480b8a0602de72d96bb9173efef493$var$SchemaScanResult;
function $45480b8a0602de72d96bb9173efef493$var$SchemaScanResult(found, ref) {
  this.id = found;
  this.ref = ref;
}
var $45480b8a0602de72d96bb9173efef493$export$scan = function scan(base, schema) {
  function scanSchema(baseuri, schema) {
    if (!schema || typeof schema != 'object') return;
    // Mark all referenced schemas so we can tell later which schemas are referred to, but never defined
    if (schema.$ref) {
      var resolvedUri = resolve(baseuri, schema.$ref);
      ref[resolvedUri] = ref[resolvedUri] ? ref[resolvedUri] + 1 : 0;
      return;
    }
    var id = schema.$id || schema.id;
    var ourBase = id ? resolve(baseuri, id) : baseuri;
    if (ourBase) {
      // If there's no fragment, append an empty one
      if (ourBase.indexOf('#') < 0) ourBase += '#';
      if (found[ourBase]) {
        if (!$a7d1c719292674b299f6cb3f06994930$export$deepCompareStrict(found[ourBase], schema)) {
          throw new Error('Schema <' + ourBase + '> already exists with different definition');
        }
        return found[ourBase];
      }
      found[ourBase] = schema;
      // strip trailing fragment
      if (ourBase[ourBase.length - 1] == '#') {
        found[ourBase.substring(0, ourBase.length - 1)] = schema;
      }
    }
    scanArray(ourBase + '/items', Array.isArray(schema.items) ? schema.items : [schema.items]);
    scanArray(ourBase + '/extends', Array.isArray(schema.extends) ? schema.extends : [schema.extends]);
    scanSchema(ourBase + '/additionalItems', schema.additionalItems);
    scanObject(ourBase + '/properties', schema.properties);
    scanSchema(ourBase + '/additionalProperties', schema.additionalProperties);
    scanObject(ourBase + '/definitions', schema.definitions);
    scanObject(ourBase + '/patternProperties', schema.patternProperties);
    scanObject(ourBase + '/dependencies', schema.dependencies);
    scanArray(ourBase + '/disallow', schema.disallow);
    scanArray(ourBase + '/allOf', schema.allOf);
    scanArray(ourBase + '/anyOf', schema.anyOf);
    scanArray(ourBase + '/oneOf', schema.oneOf);
    scanSchema(ourBase + '/not', schema.not);
  }
  function scanArray(baseuri, schemas) {
    if (!Array.isArray(schemas)) return;
    for (var i = 0; i < schemas.length; i++) {
      scanSchema(baseuri + '/' + i, schemas[i]);
    }
  }
  function scanObject(baseuri, schemas) {
    if (!schemas || typeof schemas != 'object') return;
    for (var p in schemas) {
      scanSchema(baseuri + '/' + p, schemas[p]);
    }
  }
  var found = {};
  var ref = {};
  scanSchema(base, schema);
  return new $45480b8a0602de72d96bb9173efef493$var$SchemaScanResult(found, ref);
};
var $fe14a020443a2941a202c9a46db2f56a$var$scanSchema = $45480b8a0602de72d96bb9173efef493$export$scan;
var $fe14a020443a2941a202c9a46db2f56a$var$ValidatorResult = $a7d1c719292674b299f6cb3f06994930$export$ValidatorResult;
var $fe14a020443a2941a202c9a46db2f56a$var$ValidatorResultError = $a7d1c719292674b299f6cb3f06994930$export$ValidatorResultError;
var $fe14a020443a2941a202c9a46db2f56a$var$SchemaError = $a7d1c719292674b299f6cb3f06994930$export$SchemaError;
var $fe14a020443a2941a202c9a46db2f56a$var$SchemaContext = $a7d1c719292674b299f6cb3f06994930$export$SchemaContext;
// var anonymousBase = 'vnd.jsonschema:///';
var $fe14a020443a2941a202c9a46db2f56a$var$anonymousBase = '/';
/**
* Creates a new Validator object
* @name Validator
* @constructor
*/
var $fe14a020443a2941a202c9a46db2f56a$var$Validator = function Validator() {
  // Allow a validator instance to override global custom formats or to have their
  // own custom formats.
  this.customFormats = Object.create(Validator.prototype.customFormats);
  this.schemas = {};
  this.unresolvedRefs = [];
  // Use Object.create to make this extensible without Validator instances stepping on each other's toes.
  this.types = Object.create($fe14a020443a2941a202c9a46db2f56a$var$types);
  this.attributes = Object.create($eaddba78edc0a539a6e1ffe5f8f0bf4b$exports.validators);
};
// Allow formats to be registered globally.
$fe14a020443a2941a202c9a46db2f56a$var$Validator.prototype.customFormats = {};
// Hint at the presence of a property
$fe14a020443a2941a202c9a46db2f56a$var$Validator.prototype.schemas = null;
$fe14a020443a2941a202c9a46db2f56a$var$Validator.prototype.types = null;
$fe14a020443a2941a202c9a46db2f56a$var$Validator.prototype.attributes = null;
$fe14a020443a2941a202c9a46db2f56a$var$Validator.prototype.unresolvedRefs = null;
/**
* Adds a schema with a certain urn to the Validator instance.
* @param schema
* @param urn
* @return {Object}
*/
$fe14a020443a2941a202c9a46db2f56a$var$Validator.prototype.addSchema = function addSchema(schema, base) {
  var self = this;
  if (!schema) {
    return null;
  }
  var scan = $fe14a020443a2941a202c9a46db2f56a$var$scanSchema(base || $fe14a020443a2941a202c9a46db2f56a$var$anonymousBase, schema);
  var ourUri = base || schema.$id || schema.id;
  for (var uri in scan.id) {
    this.schemas[uri] = scan.id[uri];
  }
  for (var uri in scan.ref) {
    // If this schema is already defined, it will be filtered out by the next step
    this.unresolvedRefs.push(uri);
  }
  // Remove newly defined schemas from unresolvedRefs
  this.unresolvedRefs = this.unresolvedRefs.filter(function (uri) {
    return typeof self.schemas[uri] === 'undefined';
  });
  return this.schemas[ourUri];
};
$fe14a020443a2941a202c9a46db2f56a$var$Validator.prototype.addSubSchemaArray = function addSubSchemaArray(baseuri, schemas) {
  if (!Array.isArray(schemas)) return;
  for (var i = 0; i < schemas.length; i++) {
    this.addSubSchema(baseuri, schemas[i]);
  }
};
$fe14a020443a2941a202c9a46db2f56a$var$Validator.prototype.addSubSchemaObject = function addSubSchemaArray(baseuri, schemas) {
  if (!schemas || typeof schemas != 'object') return;
  for (var p in schemas) {
    this.addSubSchema(baseuri, schemas[p]);
  }
};
/**
* Sets all the schemas of the Validator instance.
* @param schemas
*/
$fe14a020443a2941a202c9a46db2f56a$var$Validator.prototype.setSchemas = function setSchemas(schemas) {
  this.schemas = schemas;
};
/**
* Returns the schema of a certain urn
* @param urn
*/
$fe14a020443a2941a202c9a46db2f56a$var$Validator.prototype.getSchema = function getSchema(urn) {
  return this.schemas[urn];
};
/**
* Validates instance against the provided schema
* @param instance
* @param schema
* @param [options]
* @param [ctx]
* @return {Array}
*/
$fe14a020443a2941a202c9a46db2f56a$var$Validator.prototype.validate = function validate(instance, schema, options, ctx) {
  if (typeof schema !== 'boolean' && typeof schema !== 'object' || schema === null) {
    throw new $fe14a020443a2941a202c9a46db2f56a$var$SchemaError('Expected `schema` to be an object or boolean');
  }
  if (!options) {
    options = {};
  }
  // This section indexes subschemas in the provided schema, so they don't need to be added with Validator#addSchema
  // This will work so long as the function at uri.resolve() will resolve a relative URI to a relative URI
  var id = schema.$id || schema.id;
  var base = resolve(options.base || $fe14a020443a2941a202c9a46db2f56a$var$anonymousBase, id || '');
  if (!ctx) {
    ctx = new $fe14a020443a2941a202c9a46db2f56a$var$SchemaContext(schema, options, [], base, Object.create(this.schemas));
    if (!ctx.schemas[base]) {
      ctx.schemas[base] = schema;
    }
    var found = $fe14a020443a2941a202c9a46db2f56a$var$scanSchema(base, schema);
    for (var n in found.id) {
      var sch = found.id[n];
      ctx.schemas[n] = sch;
    }
  }
  if (options.required && instance === undefined) {
    var result = new $fe14a020443a2941a202c9a46db2f56a$var$ValidatorResult(instance, schema, options, ctx);
    result.addError('is required, but is undefined');
    return result;
  }
  var result = this.validateSchema(instance, schema, options, ctx);
  if (!result) {
    throw new Error('Result undefined');
  } else if (options.throwAll && result.errors.length) {
    throw new $fe14a020443a2941a202c9a46db2f56a$var$ValidatorResultError(result);
  }
  return result;
};
/**
* @param Object schema
* @return mixed schema uri or false
*/
function $fe14a020443a2941a202c9a46db2f56a$var$shouldResolve(schema) {
  var ref = typeof schema === 'string' ? schema : schema.$ref;
  if (typeof ref == 'string') return ref;
  return false;
}
/**
* Validates an instance against the schema (the actual work horse)
* @param instance
* @param schema
* @param options
* @param ctx
* @private
* @return {ValidatorResult}
*/
$fe14a020443a2941a202c9a46db2f56a$var$Validator.prototype.validateSchema = function validateSchema(instance, schema, options, ctx) {
  var result = new $fe14a020443a2941a202c9a46db2f56a$var$ValidatorResult(instance, schema, options, ctx);
  // Support for the true/false schemas
  if (typeof schema === 'boolean') {
    if (schema === true) {
      // `true` is always valid
      schema = {};
    } else if (schema === false) {
      // `false` is always invalid
      schema = {
        type: []
      };
    }
  } else if (!schema) {
    // This might be a string
    throw new Error("schema is undefined");
  }
  if (schema['extends']) {
    if (Array.isArray(schema['extends'])) {
      var schemaobj = {
        schema: schema,
        ctx: ctx
      };
      schema['extends'].forEach(this.schemaTraverser.bind(this, schemaobj));
      schema = schemaobj.schema;
      schemaobj.schema = null;
      schemaobj.ctx = null;
      schemaobj = null;
    } else {
      schema = $a7d1c719292674b299f6cb3f06994930$export$deepMerge(schema, this.superResolve(schema['extends'], ctx));
    }
  }
  // If passed a string argument, load that schema URI
  var switchSchema = $fe14a020443a2941a202c9a46db2f56a$var$shouldResolve(schema);
  if (switchSchema) {
    var resolved = this.resolve(schema, switchSchema, ctx);
    var subctx = new $fe14a020443a2941a202c9a46db2f56a$var$SchemaContext(resolved.subschema, options, ctx.path, resolved.switchSchema, ctx.schemas);
    return this.validateSchema(instance, resolved.subschema, options, subctx);
  }
  var skipAttributes = options && options.skipAttributes || [];
  // Validate each schema attribute against the instance
  for (var key in schema) {
    if (!$eaddba78edc0a539a6e1ffe5f8f0bf4b$exports.ignoreProperties[key] && skipAttributes.indexOf(key) < 0) {
      var validatorErr = null;
      var validator = this.attributes[key];
      if (validator) {
        validatorErr = validator.call(this, instance, schema, options, ctx);
      } else if (options.allowUnknownAttributes === false) {
        // This represents an error with the schema itself, not an invalid instance
        throw new $fe14a020443a2941a202c9a46db2f56a$var$SchemaError("Unsupported attribute: " + key, schema);
      }
      if (validatorErr) {
        result.importErrors(validatorErr);
      }
    }
  }
  if (typeof options.rewrite == 'function') {
    var value = options.rewrite.call(this, instance, schema, options, ctx);
    result.instance = value;
  }
  return result;
};
/**
* @private
* @param Object schema
* @param SchemaContext ctx
* @returns Object schema or resolved schema
*/
$fe14a020443a2941a202c9a46db2f56a$var$Validator.prototype.schemaTraverser = function schemaTraverser(schemaobj, s) {
  schemaobj.schema = $a7d1c719292674b299f6cb3f06994930$export$deepMerge(schemaobj.schema, this.superResolve(s, schemaobj.ctx));
};
/**
* @private
* @param Object schema
* @param SchemaContext ctx
* @returns Object schema or resolved schema
*/
$fe14a020443a2941a202c9a46db2f56a$var$Validator.prototype.superResolve = function superResolve(schema, ctx) {
  var ref = $fe14a020443a2941a202c9a46db2f56a$var$shouldResolve(schema);
  if (ref) {
    return this.resolve(schema, ref, ctx).subschema;
  }
  return schema;
};
/**
* @private
* @param Object schema
* @param Object switchSchema
* @param SchemaContext ctx
* @return Object resolved schemas {subschema:String, switchSchema: String}
* @throws SchemaError
*/
$fe14a020443a2941a202c9a46db2f56a$var$Validator.prototype.resolve = function resolve(schema, switchSchema, ctx) {
  switchSchema = ctx.resolve(switchSchema);
  // First see if the schema exists under the provided URI
  if (ctx.schemas[switchSchema]) {
    return {
      subschema: ctx.schemas[switchSchema],
      switchSchema: switchSchema
    };
  }
  // Else try walking the property pointer
  var parsed = parse(switchSchema);
  var fragment = parsed && parsed.hash;
  var document = fragment && fragment.length && switchSchema.substr(0, switchSchema.length - fragment.length);
  if (!document || !ctx.schemas[document]) {
    throw new $fe14a020443a2941a202c9a46db2f56a$var$SchemaError("no such schema <" + switchSchema + ">", schema);
  }
  var subschema = $a7d1c719292674b299f6cb3f06994930$export$objectGetPath(ctx.schemas[document], fragment.substr(1));
  if (subschema === undefined) {
    throw new $fe14a020443a2941a202c9a46db2f56a$var$SchemaError("no such schema " + fragment + " located in <" + document + ">", schema);
  }
  return {
    subschema: subschema,
    switchSchema: switchSchema
  };
};
/**
* Tests whether the instance if of a certain type.
* @private
* @param instance
* @param schema
* @param options
* @param ctx
* @param type
* @return {boolean}
*/
$fe14a020443a2941a202c9a46db2f56a$var$Validator.prototype.testType = function validateType(instance, schema, options, ctx, type) {
  if (type === undefined) {
    return;
  } else if (type === null) {
    throw new $fe14a020443a2941a202c9a46db2f56a$var$SchemaError('Unexpected null in "type" keyword');
  }
  if (typeof this.types[type] == 'function') {
    return this.types[type].call(this, instance);
  }
  if (type && typeof type == 'object') {
    var res = this.validateSchema(instance, type, options, ctx);
    return res === undefined || !(res && res.errors.length);
  }
  // Undefined or properties not on the list are acceptable, same as not being defined
  return true;
};
var $fe14a020443a2941a202c9a46db2f56a$var$types = $fe14a020443a2941a202c9a46db2f56a$var$Validator.prototype.types = {};
$fe14a020443a2941a202c9a46db2f56a$var$types.string = function testString(instance) {
  return typeof instance == 'string';
};
$fe14a020443a2941a202c9a46db2f56a$var$types.number = function testNumber(instance) {
  // isFinite returns false for NaN, Infinity, and -Infinity
  return typeof instance == 'number' && isFinite(instance);
};
$fe14a020443a2941a202c9a46db2f56a$var$types.integer = function testInteger(instance) {
  return typeof instance == 'number' && instance % 1 === 0;
};
$fe14a020443a2941a202c9a46db2f56a$var$types.boolean = function testBoolean(instance) {
  return typeof instance == 'boolean';
};
$fe14a020443a2941a202c9a46db2f56a$var$types.array = function testArray(instance) {
  return Array.isArray(instance);
};
$fe14a020443a2941a202c9a46db2f56a$var$types['null'] = function testNull(instance) {
  return instance === null;
};
$fe14a020443a2941a202c9a46db2f56a$var$types.date = function testDate(instance) {
  return instance instanceof Date;
};
$fe14a020443a2941a202c9a46db2f56a$var$types.any = function testAny(instance) {
  return true;
};
$fe14a020443a2941a202c9a46db2f56a$var$types.object = function testObject(instance) {
  // TODO: fix this - see #15
  return instance && typeof instance === 'object' && !Array.isArray(instance) && !(instance instanceof Date);
};
$fe14a020443a2941a202c9a46db2f56a$exports = $fe14a020443a2941a202c9a46db2f56a$var$Validator;
var $6294c5f2cce48cadd90e15a5148b428f$var$Validator = $6294c5f2cce48cadd90e15a5148b428f$export$Validator = $fe14a020443a2941a202c9a46db2f56a$exports;
var $6294c5f2cce48cadd90e15a5148b428f$export$ValidatorResult = $a7d1c719292674b299f6cb3f06994930$export$ValidatorResult;
var $6294c5f2cce48cadd90e15a5148b428f$export$ValidatorResultError = $a7d1c719292674b299f6cb3f06994930$export$ValidatorResultError;
var $6294c5f2cce48cadd90e15a5148b428f$export$ValidationError = $a7d1c719292674b299f6cb3f06994930$export$ValidationError;
var $6294c5f2cce48cadd90e15a5148b428f$export$SchemaError = $a7d1c719292674b299f6cb3f06994930$export$SchemaError;
var $6294c5f2cce48cadd90e15a5148b428f$export$SchemaScanResult = $45480b8a0602de72d96bb9173efef493$export$SchemaScanResult;
var $6294c5f2cce48cadd90e15a5148b428f$export$scan = $45480b8a0602de72d96bb9173efef493$export$scan;
var $9c959f3696148ccf1fdee87dcb292437$export$default = {
  "schema": "https://json-schema.org/draft/2020-12/schema",
  "id": "/visualization",
  "title": "Visualization",
  "description": "A webgl visualization made of a sequence of tracks",
  "type": "object",
  "required": ["tracks"],
  "properties": {
    "labels": {
      "description": "set of labels to display on visualization, properties of labels can be any valid attribute for an svg text element",
      "examples": [{
        "x": 100,
        "y": 200,
        "text": "my favorite data point",
        "rotate": -90
      }, {
        "x": -1.1,
        "y": 0,
        "text": "Track 1",
        "color": "red",
        "fixedX": true
      }],
      "type": "array",
      "items": {
        "properties": {
          "x": {
            "description": "x coordinate of label with respect to data coordinates, should be on scale with [-1, 1] if x dimension is categorical or genomic",
            "type": "number"
          },
          "y": {
            "description": "y coordinate of label with respect to data coordinates, should be on scale with [-1, 1] if y dimension is categorical or genomic",
            "type": "number"
          },
          "fixedX": {
            "description": "fix the x coordinate of the label, so it does not move when panning/zooming left or right",
            "type": "boolean"
          },
          "fixedY": {
            "description": "fix the y coordinate of the label, so it does not move when panning/zooming up or down",
            "type": "boolean"
          },
          "required": ["x", "y"]
        }
      }
    },
    "xAxis": {
      "description": "location of x-axis",
      "enum": ["bottom", "top", "center", "none", "zero"]
    },
    "yAxis": {
      "description": "location of y-axis",
      "enum": ["left", "right", "center", "none", "zero"]
    },
    "tracks": {
      "description": "A track is a map from the data to a sequence of marks",
      "type": "array",
      "items": {
        "$ref": "/track"
      }
    },
    "defaultData": {
      "description": "A string of a csv href containing data or an array of inline data where each row is a string with comma seperated values",
      "examples": ["http://example.com/data.csv", ["day,price", "1,10", "2,20"]],
      "type": ["string", "array"],
      "items": {
        "type": "string",
        "pattern": ","
      }
    }
  },
  "allOf": [{
    "description": "if there is no default data for the visualization require each track to have data property",
    "if": {
      "not": {
        "required": ["defaultData"]
      }
    },
    "then": {
      "properties": {
        "tracks": {
          "items": {
            "required": ["data"]
          }
        }
      }
    },
    "else": {}
  }]
};
var $7d6e0786d0fdb14fe4dbb3a3ac391b2f$export$default = {
  "schema": "https://json-schema.org/draft/2020-12/schema",
  "id": "/track",
  "title": "Track",
  "description": "A track to visualize",
  "type": "object",
  "required": ["mark", "x", "y"],
  "properties": {
    "data": {
      "description": "A string of a csv href containing data or an array of inline data where each row is a string with comma seperated values",
      "type": ["string", "array"],
      "items": {
        "type": "string",
        "pattern": ","
      }
    },
    "mark": {
      "description": "type of mark to visualize",
      "enum": ["point", "line", "area", "rect", "tick", "arc"]
    },
    "tooltips": {
      "description": "a number between 0 and 1 where 0 is no tooltips, 1 is always show, and, for example, 0.1 would be show tooltips when zoomed in to 10% of the domain",
      "type": "number",
      "minimum": 0,
      "maximum": 1
    },
    "x": {
      "description": "define the x coordinates of the marks",
      "type": "object",
      "allOf": [{
        "$ref": "/channel"
      }],
      "examples": [{
        "type": "genomic",
        "chrAttribute": "chr",
        "geneAttribute": "gene",
        "domain": ["chr2:100", "chr2:300"]
      }]
    },
    "y": {
      "description": "define the y coordinates of the marks",
      "type": "object",
      "allOf": [{
        "$ref": "/channel"
      }],
      "examples": [{
        "type": "quantitative",
        "attribute": "time",
        "domain": [0, 10]
      }, {
        "attribute": "sample",
        "type": "categorical",
        "cardinality": 10
      }]
    },
    "color": {
      "description": "define the color of the marks, for fixed values can be any css3 color descriptor or a number that translates to a color in hex",
      "type": "object",
      "properties": {
        "colorScheme": {
          "description": "d3 continuous color scheme to use, see d3-scale-chromatic for options",
          "examples": ["interpolateBlues", "interpolateReds", "interpolateRainbow"],
          "type": "string"
        }
      },
      "examples": [{
        "value": "red"
      }, {
        "value": 16581375
      }, {
        "attribute": "sample",
        "type": "categorical",
        "cardinality": 10,
        "colorScheme": "interpolateBuGn"
      }],
      "allOf": [{
        "$ref": "/channel"
      }]
    },
    "size": {
      "description": "size of the mark, used only when mark type is point, use width or height for other mark types. The units of this channel correspond to 1/200th of the canvas e.g. a size of 100 is half the canvas.",
      "type": "object",
      "properties": {
        "maxSize": {
          "type": "number"
        },
        "minSize": {
          "type": "number"
        },
        "value": {
          "type": "number"
        }
      },
      "examples": [{
        "attribute": "population",
        "type": "quantitative",
        "domain": [0, 1000],
        "maxSize": 10,
        "minSize": 1
      }],
      "allOf": [{
        "$ref": "/channel"
      }]
    },
    "width": {
      "description": "width of the mark, used for rect, arc, and tick marks only. The units of this channel correspond to 1/200th of the width of the canvas. This channel may be a genomic range type for arc tracks. If both height and width are specified for a tick mark, only width is used.",
      "type": "object",
      "properties": {
        "maxWidth": {
          "type": "number"
        },
        "minWidth": {
          "type": "number"
        },
        "value": {
          "type": "number"
        }
      },
      "allOf": [{
        "$ref": "/channel"
      }]
    },
    "height": {
      "description": "height of the mark, used for rect, arc, and tick marks only. The units of this channel correspond to 1/200th of the height of the canvas. This channel may be a genomic range type for arc tracks.",
      "type": "object",
      "properties": {
        "maxHeight": {
          "type": "number"
        },
        "minHeight": {
          "type": "number"
        },
        "value": {
          "type": "number"
        }
      },
      "allOf": [{
        "$ref": "/channel"
      }]
    },
    "opacity": {
      "description": "opacity of the mark, compatible with all mark types",
      "type": "object",
      "properties": {
        "minOpacity": {
          "type": "number",
          "minimum": 0,
          "exclusiveMaximum": 1
        },
        "value": {
          "type": "number"
        }
      },
      "allOf": [{
        "$ref": "/channel"
      }]
    },
    "shape": {
      "description": "shape of the mark, used only for point marks",
      "type": "object",
      "properties": {
        "value": {
          "enum": ["dot", "circle", "diamond", "triangle"]
        }
      },
      "allOf": [{
        "$ref": "/channel"
      }]
    }
  }
};
var $c7d7654594098eb72a3fa16a4486cc0d$export$default = {
  "schema": "https://json-schema.org/draft/2020-12/schema",
  "id": "/channel",
  "title": "Channel",
  "description": "A channel of a visualization",
  "type": "object",
  "properties": {
    "type": {
      "description": "type of attribute, genomic range only compatible with x, y, width and height",
      "enum": ["quantitative", "categorical", "genomic", "genomicRange"]
    },
    "attribute": {
      "description": "column of data frame to use for mapping channel",
      "type": "string"
    },
    "value": {
      "description": "if fixing a channel, specify with value",
      "type": ["string", "number", "boolean"]
    },
    "domain": {
      "description": "domain of attribute to use for mapping, required if type is quantitative",
      "type": "array"
    },
    "cardinality": {
      "description": "number of attribute values to use for mapping, required if type is categorical",
      "type": "integer"
    },
    "chrAttribute": {
      "description": "if type is genomic or genomicRange, the attribute that contains the chromosome id",
      "type": "string"
    },
    "startAttribute": {
      "description": "if type is genomicRange, the attribute that contains the start of the range",
      "type": "string"
    },
    "endAttribute": {
      "description": "if type is genomicRange, the attribute that contains the end of the range",
      "type": "string"
    },
    "genome": {
      "description": "genome being mapped",
      "enum": ["hg38", "hg19", "mm39"]
    }
  },
  "allOf": [{
    "description": "If type is genomic, require genomic attributes and forbid regular attributes",
    "anyOf": [{
      "not": {
        "properties": {
          "type": {
            "const": "genomic"
          }
        },
        "required": ["type"]
      }
    }, {
      "required": ["chrAttribute", "geneAttribute", "genome"],
      "not": {
        "required": ["attribute", "startAttribute", "endAttribute"]
      },
      "properties": {
        "domain": {
          "items": [{
            "type": "string",
            "pattern": "chr(\\d{1,2}|[XY]):\\d+"
          }, {
            "type": "string",
            "pattern": "chr(\\d{1,2}|[XY]):\\d+"
          }]
        }
      }
    }]
  }, {
    "description": "If type is genomicRange, require genomicRange attributes and forbid regular attribute",
    "anyOf": [{
      "not": {
        "properties": {
          "type": {
            "const": "genomicRange"
          }
        },
        "required": ["type"]
      }
    }, {
      "required": ["chrAttribute", "startAttribute", "endAttribute", "genome"],
      "not": {
        "required": ["attribute", "geneAttribute"]
      },
      "properties": {
        "domain": {
          "items": [{
            "type": "string",
            "pattern": "chr(\\d{1,2}|[XY]):\\d+"
          }, {
            "type": "string",
            "pattern": "chr(\\d{1,2}|[XY]):\\d+"
          }]
        }
      }
    }]
  }, {
    "description": "If type is quantitative, require domain and forbid cardinality",
    "anyOf": [{
      "not": {
        "properties": {
          "type": {
            "const": "quantitative"
          }
        },
        "required": ["type"]
      }
    }, {
      "required": ["domain"],
      "properties": {
        "domain": {
          "items": [{
            "type": "number"
          }, {
            "type": "number"
          }]
        }
      },
      "not": {
        "required": ["cardinality"]
      }
    }]
  }, {
    "description": "If type is categorical, require cardinality and forbid domain",
    "anyOf": [{
      "not": {
        "properties": {
          "type": {
            "const": "categorical"
          }
        },
        "required": ["type"]
      }
    }, {
      "required": ["cardinality"],
      "not": {
        "required": ["domain"]
      }
    }]
  }, {
    "description": "If value is defined, disallow other attributes",
    "anyOf": [{
      "not": {
        "properties": {
          "value": {
            "not": {
              "type": "null"
            }
          }
        },
        "required": ["value"]
      }
    }, {
      "allOf": [{
        "not": {
          "required": ["attribute"]
        }
      }, {
        "not": {
          "required": ["type"]
        }
      }, {
        "not": {
          "required": ["domain"]
        }
      }, {
        "not": {
          "required": ["cardinality"]
        }
      }]
    }]
  }, {
    "description": "If value is not defined, require attribute or genomic attributes",
    "anyOf": [{
      "not": {
        "properties": {
          "value": {
            "type": "null"
          }
        }
      }
    }, {
      "oneOf": [{
        "required": ["attribute"]
      }, {
        "required": ["chrAttribute", "genome"]
      }]
    }]
  }]
};
const $c8272255117e3d388375dbcc630523fb$var$v = new $6294c5f2cce48cadd90e15a5148b428f$export$Validator();
$c8272255117e3d388375dbcc630523fb$var$v.addSchema($c7d7654594098eb72a3fa16a4486cc0d$export$default, "/channel");
$c8272255117e3d388375dbcc630523fb$var$v.addSchema($7d6e0786d0fdb14fe4dbb3a3ac391b2f$export$default, "/track");
/**
* Utility method that returns a boolean on whether the json is a valid schema.
* console.errors the reason if it is not.
* @param {Object} json schema
* @returns boolean
*/
const $c8272255117e3d388375dbcc630523fb$export$default = json => {
  const validation = $c8272255117e3d388375dbcc630523fb$var$v.validate(json, $9c959f3696148ccf1fdee87dcb292437$export$default);
  if (!validation.valid) {
    console.error(validation.errors);
  }
  return validation.valid;
};
class $443f1617441f1fe95a07a18d1d3fd3db$export$default {
  POSSIBLE_MOUSE_READER_OPTIONS = Object.freeze(["lockedX", "lockedY", "tool", "viewport", "currentXRange", "currentYRange"]);
  /**
  * A class meant to display a visualization based off a given schema using webgl.
  *
  * @param {HTMLElement} container <div> or other container element meant to contain the visualization and its mousereader
  */
  constructor(container) {
    this.container = container;
    this.mouseReader = new $62df34446789a87d83e9f7f92aefcd53$export$default(document.createElement("div"), this);
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
      height
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
    this.webglWorker = new Worker($6e786b6e954dceba16cb78f965f62f52$init());
    this.webglWorker.postMessage({
      type: "init",
      canvas: offscreenCanvas
    }, [offscreenCanvas]);
    // Allow OffScreenWebGLDrawer to tick FPS meter
    this.webglWorker.onmessage = e => {
      if (e.data.type === "tick") {
        this.meter.tick();
      }
    };
    this.dataWorkerStream = [];
    this.dataWorker = new Worker($fde9bc85888899c66f94ab57a224ede3$init());
    this.dataWorker.onmessage = message => {
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
      if ((option in options)) {
        this.mouseReader[option] = options[option];
      }
    }
    this.sendDrawerState(this.mouseReader.getViewport());
  }
  _setMargins(schema) {
    const styles = $ca7145bbe9fc7f50a5dcc86190258597$export$getDimAndMarginStyleForSchema(schema);
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
    if (!$c8272255117e3d388375dbcc630523fb$export$default(schema)) {
      return false;
    }
    this._setMargins(schema);
    this.mouseReader.setSchema(schema);
    this.sendDrawerState(this.mouseReader.getViewport());
    this.webglWorker.postMessage({
      type: "schema",
      schema
    });
    this.dataWorker.postMessage({
      type: "init",
      schema
    });
    return true;
  }
  /**
  * Send the viewport to the drawer. Use setViewOptions to change the viewport.
  *
  * @param {Object} viewport likely from this.mouseReader.getViewport()
  */
  sendDrawerState(viewport) {
    this.webglWorker.postMessage({
      type: "viewport",
      ...viewport
    });
  }
  /**
  * Calls render in the drawer.
  */
  forceDrawerRender() {
    this.webglWorker.postMessage({
      type: "render",
      ...this.mouseReader.getViewport()
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
  /**
  * Utility method to have data worker call {@link DataProcessor#getClosestPoint}.
  * Does not return, posts result to this.dataWorkerStream.
  *
  * @param {Array} point to get closest point to
  */
  getClosestPoint(point) {
    this.dataWorker.postMessage({
      type: "getClosestPoint",
      point
    });
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
      transform: "translateX(-100%)"
    });
  }
}
var _default = $443f1617441f1fe95a07a18d1d3fd3db$export$default;
export default _default;

//# sourceMappingURL=index.js.map
