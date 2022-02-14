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
function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
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
parcelRequire.register("aKzDW", function(module, exports) {

$parcel$export(module.exports, "register", () => $7d39d93f9098a310$export$6503ec6e8aabbaf, (v) => $7d39d93f9098a310$export$6503ec6e8aabbaf = v);
$parcel$export(module.exports, "resolve", () => $7d39d93f9098a310$export$f7ad0328861e2f03, (v) => $7d39d93f9098a310$export$f7ad0328861e2f03 = v);
var $7d39d93f9098a310$export$6503ec6e8aabbaf;
var $7d39d93f9098a310$export$f7ad0328861e2f03;
"use strict";
var $7d39d93f9098a310$var$mapping = {
};
function $7d39d93f9098a310$var$register(pairs) {
    var keys = Object.keys(pairs);
    for(var i = 0; i < keys.length; i++)$7d39d93f9098a310$var$mapping[keys[i]] = pairs[keys[i]];
}
function $7d39d93f9098a310$var$resolve(id) {
    var resolved = $7d39d93f9098a310$var$mapping[id];
    if (resolved == null) throw new Error('Could not resolve bundle with id ' + id);
    return resolved;
}
$7d39d93f9098a310$export$6503ec6e8aabbaf = $7d39d93f9098a310$var$register;
$7d39d93f9098a310$export$f7ad0328861e2f03 = $7d39d93f9098a310$var$resolve;

});

parcelRequire.register("kAoUr", function(module, exports) {
'use strict';

var $ab19r = parcelRequire("ab19r");

var $dnhA8 = parcelRequire("dnhA8");

var $hpI3p = parcelRequire("hpI3p");

var $74FPd = parcelRequire("74FPd");
var $efca7de47c02cd9a$require$scanSchema = $74FPd.scan;
var $efca7de47c02cd9a$var$ValidatorResult = $hpI3p.ValidatorResult;
var $efca7de47c02cd9a$var$ValidatorResultError = $hpI3p.ValidatorResultError;
var $efca7de47c02cd9a$var$SchemaError = $hpI3p.SchemaError;
var $efca7de47c02cd9a$var$SchemaContext = $hpI3p.SchemaContext;
//var anonymousBase = 'vnd.jsonschema:///';
var $efca7de47c02cd9a$var$anonymousBase = '/';
/**
 * Creates a new Validator object
 * @name Validator
 * @constructor
 */ var $efca7de47c02cd9a$var$Validator = function Validator() {
    // Allow a validator instance to override global custom formats or to have their
    // own custom formats.
    this.customFormats = Object.create(Validator.prototype.customFormats);
    this.schemas = {
    };
    this.unresolvedRefs = [];
    // Use Object.create to make this extensible without Validator instances stepping on each other's toes.
    this.types = Object.create($efca7de47c02cd9a$var$types);
    this.attributes = Object.create($dnhA8.validators);
};
// Allow formats to be registered globally.
$efca7de47c02cd9a$var$Validator.prototype.customFormats = {
};
// Hint at the presence of a property
$efca7de47c02cd9a$var$Validator.prototype.schemas = null;
$efca7de47c02cd9a$var$Validator.prototype.types = null;
$efca7de47c02cd9a$var$Validator.prototype.attributes = null;
$efca7de47c02cd9a$var$Validator.prototype.unresolvedRefs = null;
/**
 * Adds a schema with a certain urn to the Validator instance.
 * @param schema
 * @param urn
 * @return {Object}
 */ $efca7de47c02cd9a$var$Validator.prototype.addSchema = function addSchema(schema, base) {
    var self = this;
    if (!schema) return null;
    var scan = $efca7de47c02cd9a$require$scanSchema(base || $efca7de47c02cd9a$var$anonymousBase, schema);
    var ourUri = base || schema.$id || schema.id;
    for(var uri in scan.id)this.schemas[uri] = scan.id[uri];
    for(var uri in scan.ref)// If this schema is already defined, it will be filtered out by the next step
    this.unresolvedRefs.push(uri);
    // Remove newly defined schemas from unresolvedRefs
    this.unresolvedRefs = this.unresolvedRefs.filter(function(uri) {
        return typeof self.schemas[uri] === 'undefined';
    });
    return this.schemas[ourUri];
};
$efca7de47c02cd9a$var$Validator.prototype.addSubSchemaArray = function addSubSchemaArray(baseuri, schemas) {
    if (!Array.isArray(schemas)) return;
    for(var i = 0; i < schemas.length; i++)this.addSubSchema(baseuri, schemas[i]);
};
$efca7de47c02cd9a$var$Validator.prototype.addSubSchemaObject = function addSubSchemaArray(baseuri, schemas) {
    if (!schemas || typeof schemas != 'object') return;
    for(var p in schemas)this.addSubSchema(baseuri, schemas[p]);
};
/**
 * Sets all the schemas of the Validator instance.
 * @param schemas
 */ $efca7de47c02cd9a$var$Validator.prototype.setSchemas = function setSchemas(schemas) {
    this.schemas = schemas;
};
/**
 * Returns the schema of a certain urn
 * @param urn
 */ $efca7de47c02cd9a$var$Validator.prototype.getSchema = function getSchema(urn) {
    return this.schemas[urn];
};
/**
 * Validates instance against the provided schema
 * @param instance
 * @param schema
 * @param [options]
 * @param [ctx]
 * @return {Array}
 */ $efca7de47c02cd9a$var$Validator.prototype.validate = function validate(instance, schema, options, ctx) {
    if (typeof schema !== 'boolean' && typeof schema !== 'object' || schema === null) throw new $efca7de47c02cd9a$var$SchemaError('Expected `schema` to be an object or boolean');
    if (!options) options = {
    };
    // This section indexes subschemas in the provided schema, so they don't need to be added with Validator#addSchema
    // This will work so long as the function at uri.resolve() will resolve a relative URI to a relative URI
    var id = schema.$id || schema.id;
    var base = $ab19r.resolve(options.base || $efca7de47c02cd9a$var$anonymousBase, id || '');
    if (!ctx) {
        ctx = new $efca7de47c02cd9a$var$SchemaContext(schema, options, [], base, Object.create(this.schemas));
        if (!ctx.schemas[base]) ctx.schemas[base] = schema;
        var found = $efca7de47c02cd9a$require$scanSchema(base, schema);
        for(var n in found.id){
            var sch = found.id[n];
            ctx.schemas[n] = sch;
        }
    }
    if (options.required && instance === undefined) {
        var result = new $efca7de47c02cd9a$var$ValidatorResult(instance, schema, options, ctx);
        result.addError('is required, but is undefined');
        return result;
    }
    var result = this.validateSchema(instance, schema, options, ctx);
    if (!result) throw new Error('Result undefined');
    else if (options.throwAll && result.errors.length) throw new $efca7de47c02cd9a$var$ValidatorResultError(result);
    return result;
};
/**
* @param Object schema
* @return mixed schema uri or false
*/ function $efca7de47c02cd9a$var$shouldResolve(schema) {
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
 */ $efca7de47c02cd9a$var$Validator.prototype.validateSchema = function validateSchema(instance, schema, options, ctx) {
    var result = new $efca7de47c02cd9a$var$ValidatorResult(instance, schema, options, ctx);
    // Support for the true/false schemas
    if (typeof schema === 'boolean') {
        if (schema === true) // `true` is always valid
        schema = {
        };
        else if (schema === false) // `false` is always invalid
        schema = {
            type: []
        };
    } else if (!schema) // This might be a string
    throw new Error("schema is undefined");
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
        } else schema = $hpI3p.deepMerge(schema, this.superResolve(schema['extends'], ctx));
    }
    // If passed a string argument, load that schema URI
    var switchSchema = $efca7de47c02cd9a$var$shouldResolve(schema);
    if (switchSchema) {
        var resolved = this.resolve(schema, switchSchema, ctx);
        var subctx = new $efca7de47c02cd9a$var$SchemaContext(resolved.subschema, options, ctx.path, resolved.switchSchema, ctx.schemas);
        return this.validateSchema(instance, resolved.subschema, options, subctx);
    }
    var skipAttributes = options && options.skipAttributes || [];
    // Validate each schema attribute against the instance
    for(var key in schema)if (!$dnhA8.ignoreProperties[key] && skipAttributes.indexOf(key) < 0) {
        var validatorErr = null;
        var validator = this.attributes[key];
        if (validator) validatorErr = validator.call(this, instance, schema, options, ctx);
        else if (options.allowUnknownAttributes === false) // This represents an error with the schema itself, not an invalid instance
        throw new $efca7de47c02cd9a$var$SchemaError("Unsupported attribute: " + key, schema);
        if (validatorErr) result.importErrors(validatorErr);
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
*/ $efca7de47c02cd9a$var$Validator.prototype.schemaTraverser = function schemaTraverser(schemaobj, s) {
    schemaobj.schema = $hpI3p.deepMerge(schemaobj.schema, this.superResolve(s, schemaobj.ctx));
};
/**
* @private
* @param Object schema
* @param SchemaContext ctx
* @returns Object schema or resolved schema
*/ $efca7de47c02cd9a$var$Validator.prototype.superResolve = function superResolve(schema, ctx) {
    var ref = $efca7de47c02cd9a$var$shouldResolve(schema);
    if (ref) return this.resolve(schema, ref, ctx).subschema;
    return schema;
};
/**
* @private
* @param Object schema
* @param Object switchSchema
* @param SchemaContext ctx
* @return Object resolved schemas {subschema:String, switchSchema: String}
* @throws SchemaError
*/ $efca7de47c02cd9a$var$Validator.prototype.resolve = function resolve(schema, switchSchema, ctx) {
    switchSchema = ctx.resolve(switchSchema);
    // First see if the schema exists under the provided URI
    if (ctx.schemas[switchSchema]) return {
        subschema: ctx.schemas[switchSchema],
        switchSchema: switchSchema
    };
    // Else try walking the property pointer
    var parsed = $ab19r.parse(switchSchema);
    var fragment = parsed && parsed.hash;
    var document = fragment && fragment.length && switchSchema.substr(0, switchSchema.length - fragment.length);
    if (!document || !ctx.schemas[document]) throw new $efca7de47c02cd9a$var$SchemaError("no such schema <" + switchSchema + ">", schema);
    var subschema = $hpI3p.objectGetPath(ctx.schemas[document], fragment.substr(1));
    if (subschema === undefined) throw new $efca7de47c02cd9a$var$SchemaError("no such schema " + fragment + " located in <" + document + ">", schema);
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
 */ $efca7de47c02cd9a$var$Validator.prototype.testType = function validateType(instance, schema, options, ctx, type) {
    if (type === undefined) return;
    else if (type === null) throw new $efca7de47c02cd9a$var$SchemaError('Unexpected null in "type" keyword');
    if (typeof this.types[type] == 'function') return this.types[type].call(this, instance);
    if (type && typeof type == 'object') {
        var res = this.validateSchema(instance, type, options, ctx);
        return res === undefined || !(res && res.errors.length);
    }
    // Undefined or properties not on the list are acceptable, same as not being defined
    return true;
};
var $efca7de47c02cd9a$var$types = $efca7de47c02cd9a$var$Validator.prototype.types = {
};
$efca7de47c02cd9a$var$types.string = function testString(instance) {
    return typeof instance == 'string';
};
$efca7de47c02cd9a$var$types.number = function testNumber(instance) {
    // isFinite returns false for NaN, Infinity, and -Infinity
    return typeof instance == 'number' && isFinite(instance);
};
$efca7de47c02cd9a$var$types.integer = function testInteger(instance) {
    return typeof instance == 'number' && instance % 1 === 0;
};
$efca7de47c02cd9a$var$types.boolean = function testBoolean(instance) {
    return typeof instance == 'boolean';
};
$efca7de47c02cd9a$var$types.array = function testArray(instance) {
    return Array.isArray(instance);
};
$efca7de47c02cd9a$var$types['null'] = function testNull(instance) {
    return instance === null;
};
$efca7de47c02cd9a$var$types.date = function testDate(instance) {
    return instance instanceof Date;
};
$efca7de47c02cd9a$var$types.any = function testAny(instance) {
    return true;
};
$efca7de47c02cd9a$var$types.object = function testObject(instance) {
    // TODO: fix this - see #15
    return instance && typeof instance === 'object' && !Array.isArray(instance) && !(instance instanceof Date);
};
module.exports = $efca7de47c02cd9a$var$Validator;

});
parcelRequire.register("ab19r", function(module, exports) {

$parcel$export(module.exports, "parse", () => $768bd311451846bd$export$98e6a39c04603d36, (v) => $768bd311451846bd$export$98e6a39c04603d36 = v);
$parcel$export(module.exports, "resolve", () => $768bd311451846bd$export$f7ad0328861e2f03, (v) => $768bd311451846bd$export$f7ad0328861e2f03 = v);
var $768bd311451846bd$export$98e6a39c04603d36;
var $768bd311451846bd$export$f7ad0328861e2f03;
var $768bd311451846bd$export$7daf1a5d2f4dd018;
var $768bd311451846bd$export$d9468344d3651243;
var $768bd311451846bd$export$59d795186a5d3f58;
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
'use strict';

var $b4pWW = parcelRequire("b4pWW");

var $5c3LC = parcelRequire("5c3LC");
$768bd311451846bd$export$98e6a39c04603d36 = $768bd311451846bd$var$urlParse;
$768bd311451846bd$export$f7ad0328861e2f03 = $768bd311451846bd$var$urlResolve;
$768bd311451846bd$export$7daf1a5d2f4dd018 = $768bd311451846bd$var$urlResolveObject;
$768bd311451846bd$export$d9468344d3651243 = $768bd311451846bd$var$urlFormat;
$768bd311451846bd$export$59d795186a5d3f58 = $768bd311451846bd$var$Url;
function $768bd311451846bd$var$Url() {
    this.protocol = null;
    this.slashes = null;
    this.auth = null;
    this.host = null;
    this.port = null;
    this.hostname = null;
    this.hash = null;
    this.search = null;
    this.query = null;
    this.pathname = null;
    this.path = null;
    this.href = null;
}
// Reference: RFC 3986, RFC 1808, RFC 2396
// define these here so at least they only have to be
// compiled once on the first module load.
var $768bd311451846bd$var$protocolPattern = /^([a-z0-9.+-]+:)/i, $768bd311451846bd$var$portPattern = /:[0-9]*$/, // Special case for a simple path URL
$768bd311451846bd$var$simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/, // RFC 2396: characters reserved for delimiting URLs.
// We actually just auto-escape these.
$768bd311451846bd$var$delims = [
    '<',
    '>',
    '"',
    '`',
    ' ',
    '\r',
    '\n',
    '\t'
], // RFC 2396: characters not allowed for various reasons.
$768bd311451846bd$var$unwise = [
    '{',
    '}',
    '|',
    '\\',
    '^',
    '`'
].concat($768bd311451846bd$var$delims), // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
$768bd311451846bd$var$autoEscape = [
    '\''
].concat($768bd311451846bd$var$unwise), // Characters that are never ever allowed in a hostname.
// Note that any invalid chars are also handled, but these
// are the ones that are *expected* to be seen, so we fast-path
// them.
$768bd311451846bd$var$nonHostChars = [
    '%',
    '/',
    '?',
    ';',
    '#'
].concat($768bd311451846bd$var$autoEscape), $768bd311451846bd$var$hostEndingChars = [
    '/',
    '?',
    '#'
], $768bd311451846bd$var$hostnameMaxLen = 255, $768bd311451846bd$var$hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/, $768bd311451846bd$var$hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, // protocols that can allow "unsafe" and "unwise" chars.
$768bd311451846bd$var$unsafeProtocol = {
    'javascript': true,
    'javascript:': true
}, // protocols that never have a hostname.
$768bd311451846bd$var$hostlessProtocol = {
    'javascript': true,
    'javascript:': true
}, // protocols that always contain a // bit.
$768bd311451846bd$var$slashedProtocol = {
    'http': true,
    'https': true,
    'ftp': true,
    'gopher': true,
    'file': true,
    'http:': true,
    'https:': true,
    'ftp:': true,
    'gopher:': true,
    'file:': true
};

var $8AB0a = parcelRequire("8AB0a");
function $768bd311451846bd$var$urlParse(url, parseQueryString, slashesDenoteHost) {
    if (url && $5c3LC.isObject(url) && url instanceof $768bd311451846bd$var$Url) return url;
    var u = new $768bd311451846bd$var$Url;
    u.parse(url, parseQueryString, slashesDenoteHost);
    return u;
}
$768bd311451846bd$var$Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
    if (!$5c3LC.isString(url)) throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
    // Copy chrome, IE, opera backslash-handling behavior.
    // Back slashes before the query string get converted to forward slashes
    // See: https://code.google.com/p/chromium/issues/detail?id=25916
    var queryIndex = url.indexOf('?'), splitter = queryIndex !== -1 && queryIndex < url.indexOf('#') ? '?' : '#', uSplit = url.split(splitter), slashRegex = /\\/g;
    uSplit[0] = uSplit[0].replace(slashRegex, '/');
    url = uSplit.join(splitter);
    var rest = url;
    // trim before proceeding.
    // This is to support parse stuff like "  http://foo.com  \n"
    rest = rest.trim();
    if (!slashesDenoteHost && url.split('#').length === 1) {
        // Try fast path regexp
        var simplePath = $768bd311451846bd$var$simplePathPattern.exec(rest);
        if (simplePath) {
            this.path = rest;
            this.href = rest;
            this.pathname = simplePath[1];
            if (simplePath[2]) {
                this.search = simplePath[2];
                if (parseQueryString) this.query = $8AB0a.parse(this.search.substr(1));
                else this.query = this.search.substr(1);
            } else if (parseQueryString) {
                this.search = '';
                this.query = {
                };
            }
            return this;
        }
    }
    var proto = $768bd311451846bd$var$protocolPattern.exec(rest);
    if (proto) {
        proto = proto[0];
        var lowerProto = proto.toLowerCase();
        this.protocol = lowerProto;
        rest = rest.substr(proto.length);
    }
    // figure out if it's got a host
    // user@server is *always* interpreted as a hostname, and url
    // resolution will treat //foo/bar as host=foo,path=bar because that's
    // how the browser resolves relative URLs.
    if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
        var slashes = rest.substr(0, 2) === '//';
        if (slashes && !(proto && $768bd311451846bd$var$hostlessProtocol[proto])) {
            rest = rest.substr(2);
            this.slashes = true;
        }
    }
    if (!$768bd311451846bd$var$hostlessProtocol[proto] && (slashes || proto && !$768bd311451846bd$var$slashedProtocol[proto])) {
        // there's a hostname.
        // the first instance of /, ?, ;, or # ends the host.
        //
        // If there is an @ in the hostname, then non-host chars *are* allowed
        // to the left of the last @ sign, unless some host-ending character
        // comes *before* the @-sign.
        // URLs are obnoxious.
        //
        // ex:
        // http://a@b@c/ => user:a@b host:c
        // http://a@b?@c => user:a host:c path:/?@c
        // v0.12 TODO(isaacs): This is not quite how Chrome does things.
        // Review our test case against browsers more comprehensively.
        // find the first instance of any hostEndingChars
        var hostEnd = -1;
        for(var i = 0; i < $768bd311451846bd$var$hostEndingChars.length; i++){
            var hec = rest.indexOf($768bd311451846bd$var$hostEndingChars[i]);
            if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) hostEnd = hec;
        }
        // at this point, either we have an explicit point where the
        // auth portion cannot go past, or the last @ char is the decider.
        var auth, atSign;
        if (hostEnd === -1) // atSign can be anywhere.
        atSign = rest.lastIndexOf('@');
        else // atSign must be in auth portion.
        // http://a@b/c@d => host:b auth:a path:/c@d
        atSign = rest.lastIndexOf('@', hostEnd);
        // Now we have a portion which is definitely the auth.
        // Pull that off.
        if (atSign !== -1) {
            auth = rest.slice(0, atSign);
            rest = rest.slice(atSign + 1);
            this.auth = decodeURIComponent(auth);
        }
        // the host is the remaining to the left of the first non-host char
        hostEnd = -1;
        for(var i = 0; i < $768bd311451846bd$var$nonHostChars.length; i++){
            var hec = rest.indexOf($768bd311451846bd$var$nonHostChars[i]);
            if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) hostEnd = hec;
        }
        // if we still have not hit it, then the entire thing is a host.
        if (hostEnd === -1) hostEnd = rest.length;
        this.host = rest.slice(0, hostEnd);
        rest = rest.slice(hostEnd);
        // pull out port.
        this.parseHost();
        // we've indicated that there is a hostname,
        // so even if it's empty, it has to be present.
        this.hostname = this.hostname || '';
        // if hostname begins with [ and ends with ]
        // assume that it's an IPv6 address.
        var ipv6Hostname = this.hostname[0] === '[' && this.hostname[this.hostname.length - 1] === ']';
        // validate a little.
        if (!ipv6Hostname) {
            var hostparts = this.hostname.split(/\./);
            for(var i = 0, l = hostparts.length; i < l; i++){
                var part = hostparts[i];
                if (!part) continue;
                if (!part.match($768bd311451846bd$var$hostnamePartPattern)) {
                    var newpart = '';
                    for(var j = 0, k = part.length; j < k; j++)if (part.charCodeAt(j) > 127) // we replace non-ASCII char with a temporary placeholder
                    // we need this to make sure size of hostname is not
                    // broken by replacing non-ASCII by nothing
                    newpart += 'x';
                    else newpart += part[j];
                    // we test again with ASCII char only
                    if (!newpart.match($768bd311451846bd$var$hostnamePartPattern)) {
                        var validParts = hostparts.slice(0, i);
                        var notHost = hostparts.slice(i + 1);
                        var bit = part.match($768bd311451846bd$var$hostnamePartStart);
                        if (bit) {
                            validParts.push(bit[1]);
                            notHost.unshift(bit[2]);
                        }
                        if (notHost.length) rest = '/' + notHost.join('.') + rest;
                        this.hostname = validParts.join('.');
                        break;
                    }
                }
            }
        }
        if (this.hostname.length > $768bd311451846bd$var$hostnameMaxLen) this.hostname = '';
        else // hostnames are always lower case.
        this.hostname = this.hostname.toLowerCase();
        if (!ipv6Hostname) // IDNA Support: Returns a punycoded representation of "domain".
        // It only converts parts of the domain name that
        // have non-ASCII characters, i.e. it doesn't matter if
        // you call it with a domain that already is ASCII-only.
        this.hostname = $b4pWW.toASCII(this.hostname);
        var p = this.port ? ':' + this.port : '';
        var h = this.hostname || '';
        this.host = h + p;
        this.href += this.host;
        // strip [ and ] from the hostname
        // the host field still retains them, though
        if (ipv6Hostname) {
            this.hostname = this.hostname.substr(1, this.hostname.length - 2);
            if (rest[0] !== '/') rest = '/' + rest;
        }
    }
    // now rest is set to the post-host stuff.
    // chop off any delim chars.
    if (!$768bd311451846bd$var$unsafeProtocol[lowerProto]) // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for(var i = 0, l = $768bd311451846bd$var$autoEscape.length; i < l; i++){
        var ae = $768bd311451846bd$var$autoEscape[i];
        if (rest.indexOf(ae) === -1) continue;
        var esc = encodeURIComponent(ae);
        if (esc === ae) esc = escape(ae);
        rest = rest.split(ae).join(esc);
    }
    // chop off from the tail first.
    var hash = rest.indexOf('#');
    if (hash !== -1) {
        // got a fragment string.
        this.hash = rest.substr(hash);
        rest = rest.slice(0, hash);
    }
    var qm = rest.indexOf('?');
    if (qm !== -1) {
        this.search = rest.substr(qm);
        this.query = rest.substr(qm + 1);
        if (parseQueryString) this.query = $8AB0a.parse(this.query);
        rest = rest.slice(0, qm);
    } else if (parseQueryString) {
        // no query string, but parseQueryString still requested
        this.search = '';
        this.query = {
        };
    }
    if (rest) this.pathname = rest;
    if ($768bd311451846bd$var$slashedProtocol[lowerProto] && this.hostname && !this.pathname) this.pathname = '/';
    //to support http.request
    if (this.pathname || this.search) {
        var p = this.pathname || '';
        var s = this.search || '';
        this.path = p + s;
    }
    // finally, reconstruct the href based on what has been validated.
    this.href = this.format();
    return this;
};
// format a parsed object into a url string
function $768bd311451846bd$var$urlFormat(obj) {
    // ensure it's an object, and not a string url.
    // If it's an obj, this is a no-op.
    // this way, you can call url_format() on strings
    // to clean up potentially wonky urls.
    if ($5c3LC.isString(obj)) obj = $768bd311451846bd$var$urlParse(obj);
    if (!(obj instanceof $768bd311451846bd$var$Url)) return $768bd311451846bd$var$Url.prototype.format.call(obj);
    return obj.format();
}
$768bd311451846bd$var$Url.prototype.format = function() {
    var auth = this.auth || '';
    if (auth) {
        auth = encodeURIComponent(auth);
        auth = auth.replace(/%3A/i, ':');
        auth += '@';
    }
    var protocol = this.protocol || '', pathname = this.pathname || '', hash = this.hash || '', host = false, query = '';
    if (this.host) host = auth + this.host;
    else if (this.hostname) {
        host = auth + (this.hostname.indexOf(':') === -1 ? this.hostname : '[' + this.hostname + ']');
        if (this.port) host += ':' + this.port;
    }
    if (this.query && $5c3LC.isObject(this.query) && Object.keys(this.query).length) query = $8AB0a.stringify(this.query);
    var search = this.search || query && '?' + query || '';
    if (protocol && protocol.substr(-1) !== ':') protocol += ':';
    // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
    // unless they had them to begin with.
    if (this.slashes || (!protocol || $768bd311451846bd$var$slashedProtocol[protocol]) && host !== false) {
        host = '//' + (host || '');
        if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
    } else if (!host) host = '';
    if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
    if (search && search.charAt(0) !== '?') search = '?' + search;
    pathname = pathname.replace(/[?#]/g, function(match) {
        return encodeURIComponent(match);
    });
    search = search.replace('#', '%23');
    return protocol + host + pathname + search + hash;
};
function $768bd311451846bd$var$urlResolve(source, relative) {
    return $768bd311451846bd$var$urlParse(source, false, true).resolve(relative);
}
$768bd311451846bd$var$Url.prototype.resolve = function(relative) {
    return this.resolveObject($768bd311451846bd$var$urlParse(relative, false, true)).format();
};
function $768bd311451846bd$var$urlResolveObject(source, relative) {
    if (!source) return relative;
    return $768bd311451846bd$var$urlParse(source, false, true).resolveObject(relative);
}
$768bd311451846bd$var$Url.prototype.resolveObject = function(relative) {
    if ($5c3LC.isString(relative)) {
        var rel = new $768bd311451846bd$var$Url();
        rel.parse(relative, false, true);
        relative = rel;
    }
    var result = new $768bd311451846bd$var$Url();
    var tkeys = Object.keys(this);
    for(var tk = 0; tk < tkeys.length; tk++){
        var tkey = tkeys[tk];
        result[tkey] = this[tkey];
    }
    // hash is always overridden, no matter what.
    // even href="" will remove it.
    result.hash = relative.hash;
    // if the relative url is empty, then there's nothing left to do here.
    if (relative.href === '') {
        result.href = result.format();
        return result;
    }
    // hrefs like //foo/bar always cut to the protocol.
    if (relative.slashes && !relative.protocol) {
        // take everything except the protocol from relative
        var rkeys = Object.keys(relative);
        for(var rk = 0; rk < rkeys.length; rk++){
            var rkey = rkeys[rk];
            if (rkey !== 'protocol') result[rkey] = relative[rkey];
        }
        //urlParse appends trailing / to urls like http://www.example.com
        if ($768bd311451846bd$var$slashedProtocol[result.protocol] && result.hostname && !result.pathname) result.path = result.pathname = '/';
        result.href = result.format();
        return result;
    }
    if (relative.protocol && relative.protocol !== result.protocol) {
        // if it's a known url protocol, then changing
        // the protocol does weird things
        // first, if it's not file:, then we MUST have a host,
        // and if there was a path
        // to begin with, then we MUST have a path.
        // if it is file:, then the host is dropped,
        // because that's known to be hostless.
        // anything else is assumed to be absolute.
        if (!$768bd311451846bd$var$slashedProtocol[relative.protocol]) {
            var keys = Object.keys(relative);
            for(var v = 0; v < keys.length; v++){
                var k = keys[v];
                result[k] = relative[k];
            }
            result.href = result.format();
            return result;
        }
        result.protocol = relative.protocol;
        if (!relative.host && !$768bd311451846bd$var$hostlessProtocol[relative.protocol]) {
            var relPath = (relative.pathname || '').split('/');
            while(relPath.length && !(relative.host = relPath.shift()));
            if (!relative.host) relative.host = '';
            if (!relative.hostname) relative.hostname = '';
            if (relPath[0] !== '') relPath.unshift('');
            if (relPath.length < 2) relPath.unshift('');
            result.pathname = relPath.join('/');
        } else result.pathname = relative.pathname;
        result.search = relative.search;
        result.query = relative.query;
        result.host = relative.host || '';
        result.auth = relative.auth;
        result.hostname = relative.hostname || relative.host;
        result.port = relative.port;
        // to support http.request
        if (result.pathname || result.search) {
            var p = result.pathname || '';
            var s = result.search || '';
            result.path = p + s;
        }
        result.slashes = result.slashes || relative.slashes;
        result.href = result.format();
        return result;
    }
    var isSourceAbs = result.pathname && result.pathname.charAt(0) === '/', isRelAbs = relative.host || relative.pathname && relative.pathname.charAt(0) === '/', mustEndAbs = isRelAbs || isSourceAbs || result.host && relative.pathname, removeAllDots = mustEndAbs, srcPath = result.pathname && result.pathname.split('/') || [], relPath = relative.pathname && relative.pathname.split('/') || [], psychotic = result.protocol && !$768bd311451846bd$var$slashedProtocol[result.protocol];
    // if the url is a non-slashed url, then relative
    // links like ../.. should be able
    // to crawl up to the hostname, as well.  This is strange.
    // result.protocol has already been set by now.
    // Later on, put the first path part into the host field.
    if (psychotic) {
        result.hostname = '';
        result.port = null;
        if (result.host) {
            if (srcPath[0] === '') srcPath[0] = result.host;
            else srcPath.unshift(result.host);
        }
        result.host = '';
        if (relative.protocol) {
            relative.hostname = null;
            relative.port = null;
            if (relative.host) {
                if (relPath[0] === '') relPath[0] = relative.host;
                else relPath.unshift(relative.host);
            }
            relative.host = null;
        }
        mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
    }
    if (isRelAbs) {
        // it's absolute.
        result.host = relative.host || relative.host === '' ? relative.host : result.host;
        result.hostname = relative.hostname || relative.hostname === '' ? relative.hostname : result.hostname;
        result.search = relative.search;
        result.query = relative.query;
        srcPath = relPath;
    // fall through to the dot-handling below.
    } else if (relPath.length) {
        // it's relative
        // throw away the existing file, and take the new path instead.
        if (!srcPath) srcPath = [];
        srcPath.pop();
        srcPath = srcPath.concat(relPath);
        result.search = relative.search;
        result.query = relative.query;
    } else if (!$5c3LC.isNullOrUndefined(relative.search)) {
        // just pull out the search.
        // like href='?foo'.
        // Put this after the other two cases because it simplifies the booleans
        if (psychotic) {
            result.hostname = result.host = srcPath.shift();
            //occationaly the auth can get stuck only in host
            //this especially happens in cases like
            //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
            var authInHost = result.host && result.host.indexOf('@') > 0 ? result.host.split('@') : false;
            if (authInHost) {
                result.auth = authInHost.shift();
                result.host = result.hostname = authInHost.shift();
            }
        }
        result.search = relative.search;
        result.query = relative.query;
        //to support http.request
        if (!$5c3LC.isNull(result.pathname) || !$5c3LC.isNull(result.search)) result.path = (result.pathname ? result.pathname : '') + (result.search ? result.search : '');
        result.href = result.format();
        return result;
    }
    if (!srcPath.length) {
        // no path at all.  easy.
        // we've already handled the other stuff above.
        result.pathname = null;
        //to support http.request
        if (result.search) result.path = '/' + result.search;
        else result.path = null;
        result.href = result.format();
        return result;
    }
    // if a url ENDs in . or .., then it must get a trailing slash.
    // however, if it ends in anything else non-slashy,
    // then it must NOT get a trailing slash.
    var last = srcPath.slice(-1)[0];
    var hasTrailingSlash = (result.host || relative.host || srcPath.length > 1) && (last === '.' || last === '..') || last === '';
    // strip single dots, resolve double dots to parent dir
    // if the path tries to go above the root, `up` ends up > 0
    var up = 0;
    for(var i = srcPath.length; i >= 0; i--){
        last = srcPath[i];
        if (last === '.') srcPath.splice(i, 1);
        else if (last === '..') {
            srcPath.splice(i, 1);
            up++;
        } else if (up) {
            srcPath.splice(i, 1);
            up--;
        }
    }
    // if the path is allowed to go above the root, restore leading ..s
    if (!mustEndAbs && !removeAllDots) for(; up--;)srcPath.unshift('..');
    if (mustEndAbs && srcPath[0] !== '' && (!srcPath[0] || srcPath[0].charAt(0) !== '/')) srcPath.unshift('');
    if (hasTrailingSlash && srcPath.join('/').substr(-1) !== '/') srcPath.push('');
    var isAbsolute = srcPath[0] === '' || srcPath[0] && srcPath[0].charAt(0) === '/';
    // put the host back
    if (psychotic) {
        result.hostname = result.host = isAbsolute ? '' : srcPath.length ? srcPath.shift() : '';
        //occationaly the auth can get stuck only in host
        //this especially happens in cases like
        //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
        var authInHost = result.host && result.host.indexOf('@') > 0 ? result.host.split('@') : false;
        if (authInHost) {
            result.auth = authInHost.shift();
            result.host = result.hostname = authInHost.shift();
        }
    }
    mustEndAbs = mustEndAbs || result.host && srcPath.length;
    if (mustEndAbs && !isAbsolute) srcPath.unshift('');
    if (!srcPath.length) {
        result.pathname = null;
        result.path = null;
    } else result.pathname = srcPath.join('/');
    //to support request.http
    if (!$5c3LC.isNull(result.pathname) || !$5c3LC.isNull(result.search)) result.path = (result.pathname ? result.pathname : '') + (result.search ? result.search : '');
    result.auth = relative.auth || result.auth;
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
};
$768bd311451846bd$var$Url.prototype.parseHost = function() {
    var host = this.host;
    var port = $768bd311451846bd$var$portPattern.exec(host);
    if (port) {
        port = port[0];
        if (port !== ':') this.port = port.substr(1);
        host = host.substr(0, host.length - port.length);
    }
    if (host) this.hostname = host;
};

});
parcelRequire.register("b4pWW", function(module, exports) {
(function(root) {
    /** Detect free variables */ var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;
    var freeModule = "object" == 'object' && module && !module.nodeType && module;
    var freeGlobal = typeof $parcel$global == 'object' && $parcel$global;
    if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal) root = freeGlobal;
    /**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */ var punycode, /** Highest positive signed 32-bit float value */ maxInt = 2147483647, /** Bootstring parameters */ base = 36, tMin = 1, tMax = 26, skew = 38, damp = 700, initialBias = 72, initialN = 128, delimiter = '-', /** Regular expressions */ regexPunycode = /^xn--/, regexNonASCII = /[^\x20-\x7E]/, regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, /** Error messages */ errors = {
        'overflow': 'Overflow: input needs wider integers to process',
        'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
        'invalid-input': 'Invalid input'
    }, /** Convenience shortcuts */ baseMinusTMin = base - tMin, floor = Math.floor, stringFromCharCode = String.fromCharCode, /** Temporary variable */ key;
    /*--------------------------------------------------------------------------*/ /**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */ function error(type) {
        throw RangeError(errors[type]);
    }
    /**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */ function map(array, fn) {
        var length = array.length;
        var result = [];
        while(length--)result[length] = fn(array[length]);
        return result;
    }
    /**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */ function mapDomain(string, fn) {
        var parts = string.split('@');
        var result = '';
        if (parts.length > 1) {
            // In email addresses, only the domain name should be punycoded. Leave
            // the local part (i.e. everything up to `@`) intact.
            result = parts[0] + '@';
            string = parts[1];
        }
        // Avoid `split(regex)` for IE8 compatibility. See #17.
        string = string.replace(regexSeparators, '\x2E');
        var labels = string.split('.');
        var encoded = map(labels, fn).join('.');
        return result + encoded;
    }
    /**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */ function ucs2decode(string) {
        var output = [], counter = 0, length = string.length, value, extra;
        while(counter < length){
            value = string.charCodeAt(counter++);
            if (value >= 55296 && value <= 56319 && counter < length) {
                // high surrogate, and there is a next character
                extra = string.charCodeAt(counter++);
                if ((extra & 64512) == 56320) output.push(((value & 1023) << 10) + (extra & 1023) + 65536);
                else {
                    // unmatched surrogate; only append this code unit, in case the next
                    // code unit is the high surrogate of a surrogate pair
                    output.push(value);
                    counter--;
                }
            } else output.push(value);
        }
        return output;
    }
    /**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */ function ucs2encode(array) {
        return map(array, function(value) {
            var output = '';
            if (value > 65535) {
                value -= 65536;
                output += stringFromCharCode(value >>> 10 & 1023 | 55296);
                value = 56320 | value & 1023;
            }
            output += stringFromCharCode(value);
            return output;
        }).join('');
    }
    /**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */ function basicToDigit(codePoint) {
        if (codePoint - 48 < 10) return codePoint - 22;
        if (codePoint - 65 < 26) return codePoint - 65;
        if (codePoint - 97 < 26) return codePoint - 97;
        return base;
    }
    /**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */ function digitToBasic(digit, flag) {
        //  0..25 map to ASCII a..z or A..Z
        // 26..35 map to ASCII 0..9
        return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
    }
    /**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * http://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */ function adapt(delta, numPoints, firstTime) {
        var k = 0;
        delta = firstTime ? floor(delta / damp) : delta >> 1;
        delta += floor(delta / numPoints);
        for(; delta > baseMinusTMin * tMax >> 1; k += base)delta = floor(delta / baseMinusTMin);
        return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
    }
    /**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */ function decode(input) {
        // Don't use UCS-2
        var output = [], inputLength = input.length, out, i = 0, n = initialN, bias = initialBias, basic, j, index, oldi, w, k, digit, t, /** Cached calculation results */ baseMinusT;
        // Handle the basic code points: let `basic` be the number of input code
        // points before the last delimiter, or `0` if there is none, then copy
        // the first basic code points to the output.
        basic = input.lastIndexOf(delimiter);
        if (basic < 0) basic = 0;
        for(j = 0; j < basic; ++j){
            // if it's not a basic code point
            if (input.charCodeAt(j) >= 128) error('not-basic');
            output.push(input.charCodeAt(j));
        }
        // Main decoding loop: start just after the last delimiter if any basic code
        // points were copied; start at the beginning otherwise.
        for(index = basic > 0 ? basic + 1 : 0; index < inputLength;){
            // `index` is the index of the next character to be consumed.
            // Decode a generalized variable-length integer into `delta`,
            // which gets added to `i`. The overflow checking is easier
            // if we increase `i` as we go, then subtract off its starting
            // value at the end to obtain `delta`.
            for(oldi = i, w = 1, k = base;; k += base){
                if (index >= inputLength) error('invalid-input');
                digit = basicToDigit(input.charCodeAt(index++));
                if (digit >= base || digit > floor((maxInt - i) / w)) error('overflow');
                i += digit * w;
                t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
                if (digit < t) break;
                baseMinusT = base - t;
                if (w > floor(maxInt / baseMinusT)) error('overflow');
                w *= baseMinusT;
            }
            out = output.length + 1;
            bias = adapt(i - oldi, out, oldi == 0);
            // `i` was supposed to wrap around from `out` to `0`,
            // incrementing `n` each time, so we'll fix that now:
            if (floor(i / out) > maxInt - n) error('overflow');
            n += floor(i / out);
            i %= out;
            // Insert `n` at position `i` of the output
            output.splice(i++, 0, n);
        }
        return ucs2encode(output);
    }
    /**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */ function encode(input) {
        var n, delta, handledCPCount, basicLength, bias, j, m, q, k, t, currentValue, output = [], /** `inputLength` will hold the number of code points in `input`. */ inputLength, /** Cached calculation results */ handledCPCountPlusOne, baseMinusT, qMinusT;
        // Convert the input in UCS-2 to Unicode
        input = ucs2decode(input);
        // Cache the length
        inputLength = input.length;
        // Initialize the state
        n = initialN;
        delta = 0;
        bias = initialBias;
        // Handle the basic code points
        for(j = 0; j < inputLength; ++j){
            currentValue = input[j];
            if (currentValue < 128) output.push(stringFromCharCode(currentValue));
        }
        handledCPCount = basicLength = output.length;
        // `handledCPCount` is the number of code points that have been handled;
        // `basicLength` is the number of basic code points.
        // Finish the basic string - if it is not empty - with a delimiter
        if (basicLength) output.push(delimiter);
        // Main encoding loop:
        while(handledCPCount < inputLength){
            // All non-basic code points < n have been handled already. Find the next
            // larger one:
            for(m = maxInt, j = 0; j < inputLength; ++j){
                currentValue = input[j];
                if (currentValue >= n && currentValue < m) m = currentValue;
            }
            // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
            // but guard against overflow
            handledCPCountPlusOne = handledCPCount + 1;
            if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) error('overflow');
            delta += (m - n) * handledCPCountPlusOne;
            n = m;
            for(j = 0; j < inputLength; ++j){
                currentValue = input[j];
                if (currentValue < n && ++delta > maxInt) error('overflow');
                if (currentValue == n) {
                    // Represent delta as a generalized variable-length integer
                    for(q = delta, k = base;; k += base){
                        t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
                        if (q < t) break;
                        qMinusT = q - t;
                        baseMinusT = base - t;
                        output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0)));
                        q = floor(qMinusT / baseMinusT);
                    }
                    output.push(stringFromCharCode(digitToBasic(q, 0)));
                    bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
                    delta = 0;
                    ++handledCPCount;
                }
            }
            ++delta;
            ++n;
        }
        return output.join('');
    }
    /**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */ function toUnicode(input) {
        return mapDomain(input, function(string) {
            return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
        });
    }
    /**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */ function toASCII(input) {
        return mapDomain(input, function(string) {
            return regexNonASCII.test(string) ? 'xn--' + encode(string) : string;
        });
    }
    /*--------------------------------------------------------------------------*/ /** Define the public API */ punycode = {
        /**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */ 'version': '1.3.2',
        /**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */ 'ucs2': {
            'decode': ucs2decode,
            'encode': ucs2encode
        },
        'decode': decode,
        'encode': encode,
        'toASCII': toASCII,
        'toUnicode': toUnicode
    };
    /** Expose `punycode` */ // Some AMD build optimizers, like r.js, check for specific condition patterns
    // like the following:
    if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) define('punycode', function() {
        return punycode;
    });
    else if (freeExports && freeModule) {
        if (module.exports == freeExports) freeModule.exports = punycode;
        else for(key in punycode)punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
    } else root.punycode = punycode;
})(this);

});

parcelRequire.register("5c3LC", function(module, exports) {
'use strict';
module.exports = {
    isString: function(arg) {
        return typeof arg === 'string';
    },
    isObject: function(arg) {
        return typeof arg === 'object' && arg !== null;
    },
    isNull: function(arg) {
        return arg === null;
    },
    isNullOrUndefined: function(arg) {
        return arg == null;
    }
};

});

parcelRequire.register("8AB0a", function(module, exports) {

$parcel$export(module.exports, "parse", () => $640e634b46f615de$export$98e6a39c04603d36, (v) => $640e634b46f615de$export$98e6a39c04603d36 = v);
$parcel$export(module.exports, "stringify", () => $640e634b46f615de$export$fac44ee5b035f737, (v) => $640e634b46f615de$export$fac44ee5b035f737 = v);
var $640e634b46f615de$export$2f872c0f2117be69;
var $640e634b46f615de$export$98e6a39c04603d36;
var $640e634b46f615de$export$c564cdbbe6da493;
var $640e634b46f615de$export$fac44ee5b035f737;
'use strict';

$640e634b46f615de$export$2f872c0f2117be69 = $640e634b46f615de$export$98e6a39c04603d36 = (parcelRequire("juy0a"));

$640e634b46f615de$export$c564cdbbe6da493 = $640e634b46f615de$export$fac44ee5b035f737 = (parcelRequire("a5cSK"));

});
parcelRequire.register("juy0a", function(module, exports) {
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
'use strict';
// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function $e30b31ae836fa720$var$hasOwnProperty(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
}
module.exports = function(qs, sep, eq, options) {
    sep = sep || '&';
    eq = eq || '=';
    var obj = {
    };
    if (typeof qs !== 'string' || qs.length === 0) return obj;
    var regexp = /\+/g;
    qs = qs.split(sep);
    var maxKeys = 1000;
    if (options && typeof options.maxKeys === 'number') maxKeys = options.maxKeys;
    var len = qs.length;
    // maxKeys <= 0 means that we should not limit keys count
    if (maxKeys > 0 && len > maxKeys) len = maxKeys;
    for(var i = 0; i < len; ++i){
        var x = qs[i].replace(regexp, '%20'), idx = x.indexOf(eq), kstr, vstr, k, v;
        if (idx >= 0) {
            kstr = x.substr(0, idx);
            vstr = x.substr(idx + 1);
        } else {
            kstr = x;
            vstr = '';
        }
        k = decodeURIComponent(kstr);
        v = decodeURIComponent(vstr);
        if (!$e30b31ae836fa720$var$hasOwnProperty(obj, k)) obj[k] = v;
        else if ($e30b31ae836fa720$var$isArray(obj[k])) obj[k].push(v);
        else obj[k] = [
            obj[k],
            v
        ];
    }
    return obj;
};
var $e30b31ae836fa720$var$isArray = Array.isArray || function(xs) {
    return Object.prototype.toString.call(xs) === '[object Array]';
};

});

parcelRequire.register("a5cSK", function(module, exports) {
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
'use strict';
var $75745d18ca7f2e43$var$stringifyPrimitive = function(v) {
    switch(typeof v){
        case 'string':
            return v;
        case 'boolean':
            return v ? 'true' : 'false';
        case 'number':
            return isFinite(v) ? v : '';
        default:
            return '';
    }
};
module.exports = function(obj, sep, eq, name) {
    sep = sep || '&';
    eq = eq || '=';
    if (obj === null) obj = undefined;
    if (typeof obj === 'object') return $75745d18ca7f2e43$var$map($75745d18ca7f2e43$var$objectKeys(obj), function(k) {
        var ks = encodeURIComponent($75745d18ca7f2e43$var$stringifyPrimitive(k)) + eq;
        if ($75745d18ca7f2e43$var$isArray(obj[k])) return $75745d18ca7f2e43$var$map(obj[k], function(v) {
            return ks + encodeURIComponent($75745d18ca7f2e43$var$stringifyPrimitive(v));
        }).join(sep);
        else return ks + encodeURIComponent($75745d18ca7f2e43$var$stringifyPrimitive(obj[k]));
    }).join(sep);
    if (!name) return '';
    return encodeURIComponent($75745d18ca7f2e43$var$stringifyPrimitive(name)) + eq + encodeURIComponent($75745d18ca7f2e43$var$stringifyPrimitive(obj));
};
var $75745d18ca7f2e43$var$isArray = Array.isArray || function(xs) {
    return Object.prototype.toString.call(xs) === '[object Array]';
};
function $75745d18ca7f2e43$var$map(xs, f) {
    if (xs.map) return xs.map(f);
    var res = [];
    for(var i = 0; i < xs.length; i++)res.push(f(xs[i], i));
    return res;
}
var $75745d18ca7f2e43$var$objectKeys = Object.keys || function(obj) {
    var res = [];
    for(var key in obj)if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
    return res;
};

});



parcelRequire.register("dnhA8", function(module, exports) {
'use strict';

var $hpI3p = parcelRequire("hpI3p");
/** @type ValidatorResult */ var $9bcb0fb92937757d$var$ValidatorResult = $hpI3p.ValidatorResult;
/** @type SchemaError */ var $9bcb0fb92937757d$var$SchemaError = $hpI3p.SchemaError;
var $9bcb0fb92937757d$var$attribute = {
};
$9bcb0fb92937757d$var$attribute.ignoreProperties = {
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
 */ var $9bcb0fb92937757d$var$validators = $9bcb0fb92937757d$var$attribute.validators = {
};
/**
 * Validates whether the instance if of a certain type
 * @param instance
 * @param schema
 * @param options
 * @param ctx
 * @return {ValidatorResult|null}
 */ $9bcb0fb92937757d$var$validators.type = function validateType(instance, schema, options, ctx) {
    // Ignore undefined instances
    if (instance === undefined) return null;
    var result = new $9bcb0fb92937757d$var$ValidatorResult(instance, schema, options, ctx);
    var types = Array.isArray(schema.type) ? schema.type : [
        schema.type
    ];
    if (!types.some(this.testType.bind(this, instance, schema, options, ctx))) {
        var list = types.map(function(v) {
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
function $9bcb0fb92937757d$var$testSchemaNoThrow(instance, options, ctx, callback, schema) {
    var throwError = options.throwError;
    var throwAll = options.throwAll;
    options.throwError = false;
    options.throwAll = false;
    var res = this.validateSchema(instance, schema, options, ctx);
    options.throwError = throwError;
    options.throwAll = throwAll;
    if (!res.valid && callback instanceof Function) callback(res);
    return res.valid;
}
/**
 * Validates whether the instance matches some of the given schemas
 * @param instance
 * @param schema
 * @param options
 * @param ctx
 * @return {ValidatorResult|null}
 */ $9bcb0fb92937757d$var$validators.anyOf = function validateAnyOf(instance, schema, options, ctx) {
    // Ignore undefined instances
    if (instance === undefined) return null;
    var result = new $9bcb0fb92937757d$var$ValidatorResult(instance, schema, options, ctx);
    var inner = new $9bcb0fb92937757d$var$ValidatorResult(instance, schema, options, ctx);
    if (!Array.isArray(schema.anyOf)) throw new $9bcb0fb92937757d$var$SchemaError("anyOf must be an array");
    if (!schema.anyOf.some($9bcb0fb92937757d$var$testSchemaNoThrow.bind(this, instance, options, ctx, function(res) {
        inner.importErrors(res);
    }))) {
        var list = schema.anyOf.map(function(v, i) {
            var id = v.$id || v.id;
            if (id) return '<' + id + '>';
            return v.title && JSON.stringify(v.title) || v['$ref'] && '<' + v['$ref'] + '>' || '[subschema ' + i + ']';
        });
        if (options.nestedErrors) result.importErrors(inner);
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
 */ $9bcb0fb92937757d$var$validators.allOf = function validateAllOf(instance, schema, options, ctx) {
    // Ignore undefined instances
    if (instance === undefined) return null;
    if (!Array.isArray(schema.allOf)) throw new $9bcb0fb92937757d$var$SchemaError("allOf must be an array");
    var result = new $9bcb0fb92937757d$var$ValidatorResult(instance, schema, options, ctx);
    var self = this;
    schema.allOf.forEach(function(v, i) {
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
 */ $9bcb0fb92937757d$var$validators.oneOf = function validateOneOf(instance, schema, options, ctx) {
    // Ignore undefined instances
    if (instance === undefined) return null;
    if (!Array.isArray(schema.oneOf)) throw new $9bcb0fb92937757d$var$SchemaError("oneOf must be an array");
    var result = new $9bcb0fb92937757d$var$ValidatorResult(instance, schema, options, ctx);
    var inner = new $9bcb0fb92937757d$var$ValidatorResult(instance, schema, options, ctx);
    var count = schema.oneOf.filter($9bcb0fb92937757d$var$testSchemaNoThrow.bind(this, instance, options, ctx, function(res) {
        inner.importErrors(res);
    })).length;
    var list = schema.oneOf.map(function(v, i) {
        var id = v.$id || v.id;
        return id || v.title && JSON.stringify(v.title) || v['$ref'] && '<' + v['$ref'] + '>' || '[subschema ' + i + ']';
    });
    if (count !== 1) {
        if (options.nestedErrors) result.importErrors(inner);
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
 */ $9bcb0fb92937757d$var$validators.if = function validateIf(instance, schema, options, ctx) {
    // Ignore undefined instances
    if (instance === undefined) return null;
    if (!$hpI3p.isSchema(schema.if)) throw new Error('Expected "if" keyword to be a schema');
    var ifValid = $9bcb0fb92937757d$var$testSchemaNoThrow.call(this, instance, options, ctx, null, schema.if);
    var result = new $9bcb0fb92937757d$var$ValidatorResult(instance, schema, options, ctx);
    var res;
    if (ifValid) {
        if (schema.then === undefined) return;
        if (!$hpI3p.isSchema(schema.then)) throw new Error('Expected "then" keyword to be a schema');
        res = this.validateSchema(instance, schema.then, options, ctx.makeChild(schema.then));
        result.importErrors(res);
    } else {
        if (schema.else === undefined) return;
        if (!$hpI3p.isSchema(schema.else)) throw new Error('Expected "else" keyword to be a schema');
        res = this.validateSchema(instance, schema.else, options, ctx.makeChild(schema.else));
        result.importErrors(res);
    }
    return result;
};
function $9bcb0fb92937757d$var$getEnumerableProperty(object, key) {
    // Determine if `key` shows up in `for(var key in object)`
    // First test Object.hasOwnProperty.call as an optimization: that guarantees it does
    if (Object.hasOwnProperty.call(object, key)) return object[key];
    // Test `key in object` as an optimization; false means it won't
    if (!(key in object)) return;
    while(object = Object.getPrototypeOf(object)){
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
 */ $9bcb0fb92937757d$var$validators.propertyNames = function validatePropertyNames(instance, schema, options, ctx) {
    if (!this.types.object(instance)) return;
    var result = new $9bcb0fb92937757d$var$ValidatorResult(instance, schema, options, ctx);
    var subschema = schema.propertyNames !== undefined ? schema.propertyNames : {
    };
    if (!$hpI3p.isSchema(subschema)) throw new $9bcb0fb92937757d$var$SchemaError('Expected "propertyNames" to be a schema (object or boolean)');
    for(var property in instance)if ($9bcb0fb92937757d$var$getEnumerableProperty(instance, property) !== undefined) {
        var res = this.validateSchema(property, subschema, options, ctx.makeChild(subschema));
        result.importErrors(res);
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
 */ $9bcb0fb92937757d$var$validators.properties = function validateProperties(instance, schema, options, ctx) {
    if (!this.types.object(instance)) return;
    var result = new $9bcb0fb92937757d$var$ValidatorResult(instance, schema, options, ctx);
    var properties = schema.properties || {
    };
    for(var property in properties){
        var subschema = properties[property];
        if (subschema === undefined) continue;
        else if (subschema === null) throw new $9bcb0fb92937757d$var$SchemaError('Unexpected null, expected schema in "properties"');
        if (typeof options.preValidateProperty == 'function') options.preValidateProperty(instance, property, subschema, options, ctx);
        var prop = $9bcb0fb92937757d$var$getEnumerableProperty(instance, property);
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
 */ function $9bcb0fb92937757d$var$testAdditionalProperty(instance, schema, options, ctx, property, result) {
    if (!this.types.object(instance)) return;
    if (schema.properties && schema.properties[property] !== undefined) return;
    if (schema.additionalProperties === false) result.addError({
        name: 'additionalProperties',
        argument: property,
        message: "is not allowed to have the additional property " + JSON.stringify(property)
    });
    else {
        var additionalProperties = schema.additionalProperties || {
        };
        if (typeof options.preValidateProperty == 'function') options.preValidateProperty(instance, property, additionalProperties, options, ctx);
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
 */ $9bcb0fb92937757d$var$validators.patternProperties = function validatePatternProperties(instance, schema, options, ctx) {
    if (!this.types.object(instance)) return;
    var result = new $9bcb0fb92937757d$var$ValidatorResult(instance, schema, options, ctx);
    var patternProperties = schema.patternProperties || {
    };
    for(var property in instance){
        var test = true;
        for(var pattern in patternProperties){
            var subschema = patternProperties[pattern];
            if (subschema === undefined) continue;
            else if (subschema === null) throw new $9bcb0fb92937757d$var$SchemaError('Unexpected null, expected schema in "patternProperties"');
            try {
                var regexp = new RegExp(pattern, 'u');
            } catch (_e) {
                // In the event the stricter handling causes an error, fall back on the forgiving handling
                // DEPRECATED
                regexp = new RegExp(pattern);
            }
            if (!regexp.test(property)) continue;
            test = false;
            if (typeof options.preValidateProperty == 'function') options.preValidateProperty(instance, property, subschema, options, ctx);
            var res = this.validateSchema(instance[property], subschema, options, ctx.makeChild(subschema, property));
            if (res.instance !== result.instance[property]) result.instance[property] = res.instance;
            result.importErrors(res);
        }
        if (test) $9bcb0fb92937757d$var$testAdditionalProperty.call(this, instance, schema, options, ctx, property, result);
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
 */ $9bcb0fb92937757d$var$validators.additionalProperties = function validateAdditionalProperties(instance, schema, options, ctx) {
    if (!this.types.object(instance)) return;
    // if patternProperties is defined then we'll test when that one is called instead
    if (schema.patternProperties) return null;
    var result = new $9bcb0fb92937757d$var$ValidatorResult(instance, schema, options, ctx);
    for(var property in instance)$9bcb0fb92937757d$var$testAdditionalProperty.call(this, instance, schema, options, ctx, property, result);
    return result;
};
/**
 * Validates whether the instance value is at least of a certain length, when the instance value is a string.
 * @param instance
 * @param schema
 * @return {String|null}
 */ $9bcb0fb92937757d$var$validators.minProperties = function validateMinProperties(instance, schema, options, ctx) {
    if (!this.types.object(instance)) return;
    var result = new $9bcb0fb92937757d$var$ValidatorResult(instance, schema, options, ctx);
    var keys = Object.keys(instance);
    if (!(keys.length >= schema.minProperties)) result.addError({
        name: 'minProperties',
        argument: schema.minProperties,
        message: "does not meet minimum property length of " + schema.minProperties
    });
    return result;
};
/**
 * Validates whether the instance value is at most of a certain length, when the instance value is a string.
 * @param instance
 * @param schema
 * @return {String|null}
 */ $9bcb0fb92937757d$var$validators.maxProperties = function validateMaxProperties(instance, schema, options, ctx) {
    if (!this.types.object(instance)) return;
    var result = new $9bcb0fb92937757d$var$ValidatorResult(instance, schema, options, ctx);
    var keys = Object.keys(instance);
    if (!(keys.length <= schema.maxProperties)) result.addError({
        name: 'maxProperties',
        argument: schema.maxProperties,
        message: "does not meet maximum property length of " + schema.maxProperties
    });
    return result;
};
/**
 * Validates items when instance is an array
 * @param instance
 * @param schema
 * @param options
 * @param ctx
 * @return {String|null|ValidatorResult}
 */ $9bcb0fb92937757d$var$validators.items = function validateItems(instance, schema, options, ctx) {
    var self = this;
    if (!this.types.array(instance)) return;
    if (!schema.items) return;
    var result = new $9bcb0fb92937757d$var$ValidatorResult(instance, schema, options, ctx);
    instance.every(function(value, i) {
        var items = Array.isArray(schema.items) ? schema.items[i] || schema.additionalItems : schema.items;
        if (items === undefined) return true;
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
 */ $9bcb0fb92937757d$var$validators.minimum = function validateMinimum(instance, schema, options, ctx) {
    if (!this.types.number(instance)) return;
    var result = new $9bcb0fb92937757d$var$ValidatorResult(instance, schema, options, ctx);
    if (schema.exclusiveMinimum && schema.exclusiveMinimum === true) {
        if (!(instance > schema.minimum)) result.addError({
            name: 'minimum',
            argument: schema.minimum,
            message: "must be greater than " + schema.minimum
        });
    } else if (!(instance >= schema.minimum)) result.addError({
        name: 'minimum',
        argument: schema.minimum,
        message: "must be greater than or equal to " + schema.minimum
    });
    return result;
};
/**
 * Validates maximum and exclusiveMaximum when the type of the instance value is a number.
 * @param instance
 * @param schema
 * @return {String|null}
 */ $9bcb0fb92937757d$var$validators.maximum = function validateMaximum(instance, schema, options, ctx) {
    if (!this.types.number(instance)) return;
    var result = new $9bcb0fb92937757d$var$ValidatorResult(instance, schema, options, ctx);
    if (schema.exclusiveMaximum && schema.exclusiveMaximum === true) {
        if (!(instance < schema.maximum)) result.addError({
            name: 'maximum',
            argument: schema.maximum,
            message: "must be less than " + schema.maximum
        });
    } else if (!(instance <= schema.maximum)) result.addError({
        name: 'maximum',
        argument: schema.maximum,
        message: "must be less than or equal to " + schema.maximum
    });
    return result;
};
/**
 * Validates the number form of exclusiveMinimum when the type of the instance value is a number.
 * @param instance
 * @param schema
 * @return {String|null}
 */ $9bcb0fb92937757d$var$validators.exclusiveMinimum = function validateExclusiveMinimum(instance, schema, options, ctx) {
    // Support the boolean form of exclusiveMinimum, which is handled by the "minimum" keyword.
    if (typeof schema.exclusiveMaximum === 'boolean') return;
    if (!this.types.number(instance)) return;
    var result = new $9bcb0fb92937757d$var$ValidatorResult(instance, schema, options, ctx);
    var valid = instance > schema.exclusiveMinimum;
    if (!valid) result.addError({
        name: 'exclusiveMinimum',
        argument: schema.exclusiveMinimum,
        message: "must be strictly greater than " + schema.exclusiveMinimum
    });
    return result;
};
/**
 * Validates the number form of exclusiveMaximum when the type of the instance value is a number.
 * @param instance
 * @param schema
 * @return {String|null}
 */ $9bcb0fb92937757d$var$validators.exclusiveMaximum = function validateExclusiveMaximum(instance, schema, options, ctx) {
    // Support the boolean form of exclusiveMaximum, which is handled by the "maximum" keyword.
    if (typeof schema.exclusiveMaximum === 'boolean') return;
    if (!this.types.number(instance)) return;
    var result = new $9bcb0fb92937757d$var$ValidatorResult(instance, schema, options, ctx);
    var valid = instance < schema.exclusiveMaximum;
    if (!valid) result.addError({
        name: 'exclusiveMaximum',
        argument: schema.exclusiveMaximum,
        message: "must be strictly less than " + schema.exclusiveMaximum
    });
    return result;
};
/**
 * Perform validation for multipleOf and divisibleBy, which are essentially the same.
 * @param instance
 * @param schema
 * @param validationType
 * @param errorMessage
 * @returns {String|null}
 */ var $9bcb0fb92937757d$var$validateMultipleOfOrDivisbleBy = function validateMultipleOfOrDivisbleBy(instance, schema, options, ctx, validationType, errorMessage) {
    if (!this.types.number(instance)) return;
    var validationArgument = schema[validationType];
    if (validationArgument == 0) throw new $9bcb0fb92937757d$var$SchemaError(validationType + " cannot be zero");
    var result = new $9bcb0fb92937757d$var$ValidatorResult(instance, schema, options, ctx);
    var instanceDecimals = $hpI3p.getDecimalPlaces(instance);
    var divisorDecimals = $hpI3p.getDecimalPlaces(validationArgument);
    var maxDecimals = Math.max(instanceDecimals, divisorDecimals);
    var multiplier = Math.pow(10, maxDecimals);
    if (Math.round(instance * multiplier) % Math.round(validationArgument * multiplier) !== 0) result.addError({
        name: validationType,
        argument: validationArgument,
        message: errorMessage + JSON.stringify(validationArgument)
    });
    return result;
};
/**
 * Validates divisibleBy when the type of the instance value is a number.
 * @param instance
 * @param schema
 * @return {String|null}
 */ $9bcb0fb92937757d$var$validators.multipleOf = function validateMultipleOf(instance, schema, options, ctx) {
    return $9bcb0fb92937757d$var$validateMultipleOfOrDivisbleBy.call(this, instance, schema, options, ctx, "multipleOf", "is not a multiple of (divisible by) ");
};
/**
 * Validates multipleOf when the type of the instance value is a number.
 * @param instance
 * @param schema
 * @return {String|null}
 */ $9bcb0fb92937757d$var$validators.divisibleBy = function validateDivisibleBy(instance, schema, options, ctx) {
    return $9bcb0fb92937757d$var$validateMultipleOfOrDivisbleBy.call(this, instance, schema, options, ctx, "divisibleBy", "is not divisible by (multiple of) ");
};
/**
 * Validates whether the instance value is present.
 * @param instance
 * @param schema
 * @return {String|null}
 */ $9bcb0fb92937757d$var$validators.required = function validateRequired(instance, schema, options, ctx) {
    var result = new $9bcb0fb92937757d$var$ValidatorResult(instance, schema, options, ctx);
    if (instance === undefined && schema.required === true) // A boolean form is implemented for reverse-compatibility with schemas written against older drafts
    result.addError({
        name: 'required',
        message: "is required"
    });
    else if (this.types.object(instance) && Array.isArray(schema.required)) schema.required.forEach(function(n) {
        if ($9bcb0fb92937757d$var$getEnumerableProperty(instance, n) === undefined) result.addError({
            name: 'required',
            argument: n,
            message: "requires property " + JSON.stringify(n)
        });
    });
    return result;
};
/**
 * Validates whether the instance value matches the regular expression, when the instance value is a string.
 * @param instance
 * @param schema
 * @return {String|null}
 */ $9bcb0fb92937757d$var$validators.pattern = function validatePattern(instance, schema, options, ctx) {
    if (!this.types.string(instance)) return;
    var result = new $9bcb0fb92937757d$var$ValidatorResult(instance, schema, options, ctx);
    var pattern = schema.pattern;
    try {
        var regexp = new RegExp(pattern, 'u');
    } catch (_e) {
        // In the event the stricter handling causes an error, fall back on the forgiving handling
        // DEPRECATED
        regexp = new RegExp(pattern);
    }
    if (!instance.match(regexp)) result.addError({
        name: 'pattern',
        argument: schema.pattern,
        message: "does not match pattern " + JSON.stringify(schema.pattern.toString())
    });
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
 */ $9bcb0fb92937757d$var$validators.format = function validateFormat(instance, schema, options, ctx) {
    if (instance === undefined) return;
    var result = new $9bcb0fb92937757d$var$ValidatorResult(instance, schema, options, ctx);
    if (!result.disableFormat && !$hpI3p.isFormat(instance, schema.format, this)) result.addError({
        name: 'format',
        argument: schema.format,
        message: "does not conform to the " + JSON.stringify(schema.format) + " format"
    });
    return result;
};
/**
 * Validates whether the instance value is at least of a certain length, when the instance value is a string.
 * @param instance
 * @param schema
 * @return {String|null}
 */ $9bcb0fb92937757d$var$validators.minLength = function validateMinLength(instance, schema, options, ctx) {
    if (!this.types.string(instance)) return;
    var result = new $9bcb0fb92937757d$var$ValidatorResult(instance, schema, options, ctx);
    var hsp = instance.match(/[\uDC00-\uDFFF]/g);
    var length = instance.length - (hsp ? hsp.length : 0);
    if (!(length >= schema.minLength)) result.addError({
        name: 'minLength',
        argument: schema.minLength,
        message: "does not meet minimum length of " + schema.minLength
    });
    return result;
};
/**
 * Validates whether the instance value is at most of a certain length, when the instance value is a string.
 * @param instance
 * @param schema
 * @return {String|null}
 */ $9bcb0fb92937757d$var$validators.maxLength = function validateMaxLength(instance, schema, options, ctx) {
    if (!this.types.string(instance)) return;
    var result = new $9bcb0fb92937757d$var$ValidatorResult(instance, schema, options, ctx);
    // TODO if this was already computed in "minLength", use that value instead of re-computing
    var hsp = instance.match(/[\uDC00-\uDFFF]/g);
    var length = instance.length - (hsp ? hsp.length : 0);
    if (!(length <= schema.maxLength)) result.addError({
        name: 'maxLength',
        argument: schema.maxLength,
        message: "does not meet maximum length of " + schema.maxLength
    });
    return result;
};
/**
 * Validates whether instance contains at least a minimum number of items, when the instance is an Array.
 * @param instance
 * @param schema
 * @return {String|null}
 */ $9bcb0fb92937757d$var$validators.minItems = function validateMinItems(instance, schema, options, ctx) {
    if (!this.types.array(instance)) return;
    var result = new $9bcb0fb92937757d$var$ValidatorResult(instance, schema, options, ctx);
    if (!(instance.length >= schema.minItems)) result.addError({
        name: 'minItems',
        argument: schema.minItems,
        message: "does not meet minimum length of " + schema.minItems
    });
    return result;
};
/**
 * Validates whether instance contains no more than a maximum number of items, when the instance is an Array.
 * @param instance
 * @param schema
 * @return {String|null}
 */ $9bcb0fb92937757d$var$validators.maxItems = function validateMaxItems(instance, schema, options, ctx) {
    if (!this.types.array(instance)) return;
    var result = new $9bcb0fb92937757d$var$ValidatorResult(instance, schema, options, ctx);
    if (!(instance.length <= schema.maxItems)) result.addError({
        name: 'maxItems',
        argument: schema.maxItems,
        message: "does not meet maximum length of " + schema.maxItems
    });
    return result;
};
/**
 * Deep compares arrays for duplicates
 * @param v
 * @param i
 * @param a
 * @private
 * @return {boolean}
 */ function $9bcb0fb92937757d$var$testArrays(v, i, a) {
    var j, len = a.length;
    for(j = i + 1; j < len; j++){
        if ($hpI3p.deepCompareStrict(v, a[j])) return false;
    }
    return true;
}
/**
 * Validates whether there are no duplicates, when the instance is an Array.
 * @param instance
 * @return {String|null}
 */ $9bcb0fb92937757d$var$validators.uniqueItems = function validateUniqueItems(instance, schema, options, ctx) {
    if (schema.uniqueItems !== true) return;
    if (!this.types.array(instance)) return;
    var result = new $9bcb0fb92937757d$var$ValidatorResult(instance, schema, options, ctx);
    if (!instance.every($9bcb0fb92937757d$var$testArrays)) result.addError({
        name: 'uniqueItems',
        message: "contains duplicate item"
    });
    return result;
};
/**
 * Validate for the presence of dependency properties, if the instance is an object.
 * @param instance
 * @param schema
 * @param options
 * @param ctx
 * @return {null|ValidatorResult}
 */ $9bcb0fb92937757d$var$validators.dependencies = function validateDependencies(instance, schema, options, ctx) {
    if (!this.types.object(instance)) return;
    var result = new $9bcb0fb92937757d$var$ValidatorResult(instance, schema, options, ctx);
    for(var property in schema.dependencies){
        if (instance[property] === undefined) continue;
        var dep = schema.dependencies[property];
        var childContext = ctx.makeChild(dep, property);
        if (typeof dep == 'string') dep = [
            dep
        ];
        if (Array.isArray(dep)) dep.forEach(function(prop) {
            if (instance[prop] === undefined) result.addError({
                // FIXME there's two different "dependencies" errors here with slightly different outputs
                // Can we make these the same? Or should we create different error types?
                name: 'dependencies',
                argument: childContext.propertyPath,
                message: "property " + prop + " not found, required by " + childContext.propertyPath
            });
        });
        else {
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
 */ $9bcb0fb92937757d$var$validators['enum'] = function validateEnum(instance, schema, options, ctx) {
    if (instance === undefined) return null;
    if (!Array.isArray(schema['enum'])) throw new $9bcb0fb92937757d$var$SchemaError("enum expects an array", schema);
    var result = new $9bcb0fb92937757d$var$ValidatorResult(instance, schema, options, ctx);
    if (!schema['enum'].some($hpI3p.deepCompareStrict.bind(null, instance))) result.addError({
        name: 'enum',
        argument: schema['enum'],
        message: "is not one of enum values: " + schema['enum'].map(String).join(',')
    });
    return result;
};
/**
 * Validates whether the instance exactly matches a given value
 *
 * @param instance
 * @param schema
 * @return {ValidatorResult|null}
 */ $9bcb0fb92937757d$var$validators['const'] = function validateEnum(instance, schema, options, ctx) {
    if (instance === undefined) return null;
    var result = new $9bcb0fb92937757d$var$ValidatorResult(instance, schema, options, ctx);
    if (!$hpI3p.deepCompareStrict(schema['const'], instance)) result.addError({
        name: 'const',
        argument: schema['const'],
        message: "does not exactly match expected constant: " + schema['const']
    });
    return result;
};
/**
 * Validates whether the instance if of a prohibited type.
 * @param instance
 * @param schema
 * @param options
 * @param ctx
 * @return {null|ValidatorResult}
 */ $9bcb0fb92937757d$var$validators.not = $9bcb0fb92937757d$var$validators.disallow = function validateNot(instance, schema, options, ctx) {
    var self = this;
    if (instance === undefined) return null;
    var result = new $9bcb0fb92937757d$var$ValidatorResult(instance, schema, options, ctx);
    var notTypes = schema.not || schema.disallow;
    if (!notTypes) return null;
    if (!Array.isArray(notTypes)) notTypes = [
        notTypes
    ];
    notTypes.forEach(function(type) {
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
module.exports = $9bcb0fb92937757d$var$attribute;

});
parcelRequire.register("hpI3p", function(module, exports) {

$parcel$export(module.exports, "ValidationError", () => $cad6f1a814752b45$export$2191b9da168c6cf0, (v) => $cad6f1a814752b45$export$2191b9da168c6cf0 = v);
$parcel$export(module.exports, "ValidatorResult", () => $cad6f1a814752b45$export$b0184c04dbb75cbd, (v) => $cad6f1a814752b45$export$b0184c04dbb75cbd = v);
$parcel$export(module.exports, "ValidatorResultError", () => $cad6f1a814752b45$export$93b9911b232b246c, (v) => $cad6f1a814752b45$export$93b9911b232b246c = v);
$parcel$export(module.exports, "SchemaError", () => $cad6f1a814752b45$export$44dde8d2b17fc96a, (v) => $cad6f1a814752b45$export$44dde8d2b17fc96a = v);
$parcel$export(module.exports, "SchemaContext", () => $cad6f1a814752b45$export$77f26f02a668a7e2, (v) => $cad6f1a814752b45$export$77f26f02a668a7e2 = v);
$parcel$export(module.exports, "isFormat", () => $cad6f1a814752b45$export$674374997fba8879, (v) => $cad6f1a814752b45$export$674374997fba8879 = v);
$parcel$export(module.exports, "deepCompareStrict", () => $cad6f1a814752b45$export$f99d9bd271f9a30e, (v) => $cad6f1a814752b45$export$f99d9bd271f9a30e = v);
$parcel$export(module.exports, "deepMerge", () => $cad6f1a814752b45$export$6969335ea1e4e77c, (v) => $cad6f1a814752b45$export$6969335ea1e4e77c = v);
$parcel$export(module.exports, "objectGetPath", () => $cad6f1a814752b45$export$d03ab7c46c3a0e16, (v) => $cad6f1a814752b45$export$d03ab7c46c3a0e16 = v);
$parcel$export(module.exports, "getDecimalPlaces", () => $cad6f1a814752b45$export$4c5662d18be49e92, (v) => $cad6f1a814752b45$export$4c5662d18be49e92 = v);
$parcel$export(module.exports, "isSchema", () => $cad6f1a814752b45$export$213e2a3e7c4f326e, (v) => $cad6f1a814752b45$export$213e2a3e7c4f326e = v);
var $cad6f1a814752b45$export$2191b9da168c6cf0;
var $cad6f1a814752b45$export$b0184c04dbb75cbd;
var $cad6f1a814752b45$export$93b9911b232b246c;
var $cad6f1a814752b45$export$44dde8d2b17fc96a;
var $cad6f1a814752b45$export$77f26f02a668a7e2;
var $cad6f1a814752b45$export$1d8c0144df69cb55;
var $cad6f1a814752b45$export$674374997fba8879;
var $cad6f1a814752b45$export$61f60bce4af13a93;
var $cad6f1a814752b45$export$f99d9bd271f9a30e;
var $cad6f1a814752b45$export$6969335ea1e4e77c;
/**
 * Validates instance against the provided schema
 * Implements URI+JSON Pointer encoding, e.g. "%7e"="~0"=>"~", "~1"="%2f"=>"/"
 * @param o
 * @param s The path to walk o along
 * @return any
 */ var $cad6f1a814752b45$export$d03ab7c46c3a0e16;
/**
 * Accept an Array of property names and return a JSON Pointer URI fragment
 * @param Array a
 * @return {String}
 */ var $cad6f1a814752b45$export$20c03ce31e68a433;
/**
 * Calculate the number of decimal places a number uses
 * We need this to get correct results out of multipleOf and divisibleBy
 * when either figure is has decimal places, due to IEEE-754 float issues.
 * @param number
 * @returns {number}
 */ var $cad6f1a814752b45$export$4c5662d18be49e92;
var $cad6f1a814752b45$export$213e2a3e7c4f326e;
'use strict';

var $ab19r = parcelRequire("ab19r");
var $cad6f1a814752b45$var$ValidationError = $cad6f1a814752b45$export$2191b9da168c6cf0 = function ValidationError(message, instance, schema, path, name, argument) {
    if (Array.isArray(path)) {
        this.path = path;
        this.property = path.reduce(function(sum, item) {
            return sum + $cad6f1a814752b45$var$makeSuffix(item);
        }, 'instance');
    } else if (path !== undefined) this.property = path;
    if (message) this.message = message;
    if (schema) {
        var id = schema.$id || schema.id;
        this.schema = id || schema;
    }
    if (instance !== undefined) this.instance = instance;
    this.name = name;
    this.argument = argument;
    this.stack = this.toString();
};
$cad6f1a814752b45$var$ValidationError.prototype.toString = function toString() {
    return this.property + ' ' + this.message;
};
var $cad6f1a814752b45$var$ValidatorResult = $cad6f1a814752b45$export$b0184c04dbb75cbd = function ValidatorResult(instance, schema, options, ctx) {
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
$cad6f1a814752b45$var$ValidatorResult.prototype.addError = function addError(detail) {
    var err;
    if (typeof detail == 'string') err = new $cad6f1a814752b45$var$ValidationError(detail, this.instance, this.schema, this.path);
    else {
        if (!detail) throw new Error('Missing error detail');
        if (!detail.message) throw new Error('Missing error message');
        if (!detail.name) throw new Error('Missing validator type');
        err = new $cad6f1a814752b45$var$ValidationError(detail.message, this.instance, this.schema, this.path, detail.name, detail.argument);
    }
    this.errors.push(err);
    if (this.throwFirst) throw new $cad6f1a814752b45$var$ValidatorResultError(this);
    else if (this.throwError) throw err;
    return err;
};
$cad6f1a814752b45$var$ValidatorResult.prototype.importErrors = function importErrors(res) {
    if (typeof res == 'string' || res && res.validatorType) this.addError(res);
    else if (res && res.errors) Array.prototype.push.apply(this.errors, res.errors);
};
function $cad6f1a814752b45$var$stringizer(v, i) {
    return i + ': ' + v.toString() + '\n';
}
$cad6f1a814752b45$var$ValidatorResult.prototype.toString = function toString(res) {
    return this.errors.map($cad6f1a814752b45$var$stringizer).join('');
};
Object.defineProperty($cad6f1a814752b45$var$ValidatorResult.prototype, "valid", {
    get: function() {
        return !this.errors.length;
    }
});
$cad6f1a814752b45$export$93b9911b232b246c = $cad6f1a814752b45$var$ValidatorResultError;
function $cad6f1a814752b45$var$ValidatorResultError(result) {
    if (Error.captureStackTrace) Error.captureStackTrace(this, $cad6f1a814752b45$var$ValidatorResultError);
    this.instance = result.instance;
    this.schema = result.schema;
    this.options = result.options;
    this.errors = result.errors;
}
$cad6f1a814752b45$var$ValidatorResultError.prototype = new Error();
$cad6f1a814752b45$var$ValidatorResultError.prototype.constructor = $cad6f1a814752b45$var$ValidatorResultError;
$cad6f1a814752b45$var$ValidatorResultError.prototype.name = "Validation Error";
/**
 * Describes a problem with a Schema which prevents validation of an instance
 * @name SchemaError
 * @constructor
 */ var $cad6f1a814752b45$var$SchemaError = $cad6f1a814752b45$export$44dde8d2b17fc96a = function SchemaError(msg, schema) {
    this.message = msg;
    this.schema = schema;
    Error.call(this, msg);
    Error.captureStackTrace(this, SchemaError);
};
$cad6f1a814752b45$var$SchemaError.prototype = Object.create(Error.prototype, {
    constructor: {
        value: $cad6f1a814752b45$var$SchemaError,
        enumerable: false
    },
    name: {
        value: 'SchemaError',
        enumerable: false
    }
});
var $cad6f1a814752b45$var$SchemaContext = $cad6f1a814752b45$export$77f26f02a668a7e2 = function SchemaContext(schema, options, path, base, schemas) {
    this.schema = schema;
    this.options = options;
    if (Array.isArray(path)) {
        this.path = path;
        this.propertyPath = path.reduce(function(sum, item) {
            return sum + $cad6f1a814752b45$var$makeSuffix(item);
        }, 'instance');
    } else this.propertyPath = path;
    this.base = base;
    this.schemas = schemas;
};
$cad6f1a814752b45$var$SchemaContext.prototype.resolve = function resolve(target) {
    return $ab19r.resolve(this.base, target);
};
$cad6f1a814752b45$var$SchemaContext.prototype.makeChild = function makeChild(schema, propertyName) {
    var path = propertyName === undefined ? this.path : this.path.concat([
        propertyName
    ]);
    var id = schema.$id || schema.id;
    var base = $ab19r.resolve(this.base, id || '');
    var ctx = new $cad6f1a814752b45$var$SchemaContext(schema, this.options, path, base, Object.create(this.schemas));
    if (id && !ctx.schemas[base]) ctx.schemas[base] = schema;
    return ctx;
};
var $cad6f1a814752b45$var$FORMAT_REGEXPS = $cad6f1a814752b45$export$1d8c0144df69cb55 = {
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
    'utc-millisec': function(input) {
        return typeof input === 'string' && parseFloat(input) === parseInt(input, 10) && !isNaN(input);
    },
    'regex': function(input) {
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
$cad6f1a814752b45$var$FORMAT_REGEXPS.regexp = $cad6f1a814752b45$var$FORMAT_REGEXPS.regex;
$cad6f1a814752b45$var$FORMAT_REGEXPS.pattern = $cad6f1a814752b45$var$FORMAT_REGEXPS.regex;
$cad6f1a814752b45$var$FORMAT_REGEXPS.ipv4 = $cad6f1a814752b45$var$FORMAT_REGEXPS['ip-address'];
$cad6f1a814752b45$export$674374997fba8879 = function isFormat(input, format, validator) {
    if (typeof input === 'string' && $cad6f1a814752b45$var$FORMAT_REGEXPS[format] !== undefined) {
        if ($cad6f1a814752b45$var$FORMAT_REGEXPS[format] instanceof RegExp) return $cad6f1a814752b45$var$FORMAT_REGEXPS[format].test(input);
        if (typeof $cad6f1a814752b45$var$FORMAT_REGEXPS[format] === 'function') return $cad6f1a814752b45$var$FORMAT_REGEXPS[format](input);
    } else if (validator && validator.customFormats && typeof validator.customFormats[format] === 'function') return validator.customFormats[format](input);
    return true;
};
var $cad6f1a814752b45$var$makeSuffix = $cad6f1a814752b45$export$61f60bce4af13a93 = function makeSuffix(key) {
    key = key.toString();
    // This function could be capable of outputting valid a ECMAScript string, but the
    // resulting code for testing which form to use would be tens of thousands of characters long
    // That means this will use the name form for some illegal forms
    if (!key.match(/[.\s\[\]]/) && !key.match(/^[\d]/)) return '.' + key;
    if (key.match(/^\d+$/)) return '[' + key + ']';
    return '[' + JSON.stringify(key) + ']';
};
$cad6f1a814752b45$export$f99d9bd271f9a30e = function deepCompareStrict(a, b) {
    if (typeof a !== typeof b) return false;
    if (Array.isArray(a)) {
        if (!Array.isArray(b)) return false;
        if (a.length !== b.length) return false;
        return a.every(function(v, i) {
            return deepCompareStrict(a[i], b[i]);
        });
    }
    if (typeof a === 'object') {
        if (!a || !b) return a === b;
        var aKeys = Object.keys(a);
        var bKeys = Object.keys(b);
        if (aKeys.length !== bKeys.length) return false;
        return aKeys.every(function(v) {
            return deepCompareStrict(a[v], b[v]);
        });
    }
    return a === b;
};
function $cad6f1a814752b45$var$deepMerger(target, dst, e, i) {
    if (typeof e === 'object') dst[i] = $cad6f1a814752b45$var$deepMerge(target[i], e);
    else if (target.indexOf(e) === -1) dst.push(e);
}
function $cad6f1a814752b45$var$copyist(src, dst, key) {
    dst[key] = src[key];
}
function $cad6f1a814752b45$var$copyistWithDeepMerge(target, src, dst, key) {
    if (typeof src[key] !== 'object' || !src[key]) dst[key] = src[key];
    else if (!target[key]) dst[key] = src[key];
    else dst[key] = $cad6f1a814752b45$var$deepMerge(target[key], src[key]);
}
function $cad6f1a814752b45$var$deepMerge(target, src) {
    var array = Array.isArray(src);
    var dst = array && [] || {
    };
    if (array) {
        target = target || [];
        dst = dst.concat(target);
        src.forEach($cad6f1a814752b45$var$deepMerger.bind(null, target, dst));
    } else {
        if (target && typeof target === 'object') Object.keys(target).forEach($cad6f1a814752b45$var$copyist.bind(null, target, dst));
        Object.keys(src).forEach($cad6f1a814752b45$var$copyistWithDeepMerge.bind(null, target, src, dst));
    }
    return dst;
}
$cad6f1a814752b45$export$6969335ea1e4e77c = $cad6f1a814752b45$var$deepMerge;
$cad6f1a814752b45$export$d03ab7c46c3a0e16 = function objectGetPath(o, s) {
    var parts = s.split('/').slice(1);
    var k;
    while(typeof (k = parts.shift()) == 'string'){
        var n = decodeURIComponent(k.replace(/~0/, '~').replace(/~1/g, '/'));
        if (!(n in o)) return;
        o = o[n];
    }
    return o;
};
function $cad6f1a814752b45$var$pathEncoder(v) {
    return '/' + encodeURIComponent(v).replace(/~/g, '%7E');
}
$cad6f1a814752b45$export$20c03ce31e68a433 = function encodePointer(a) {
    // ~ must be encoded explicitly because hacks
    // the slash is encoded by encodeURIComponent
    return a.map($cad6f1a814752b45$var$pathEncoder).join('');
};
$cad6f1a814752b45$export$4c5662d18be49e92 = function getDecimalPlaces(number) {
    var decimalPlaces = 0;
    if (isNaN(number)) return decimalPlaces;
    if (typeof number !== 'number') number = Number(number);
    var parts = number.toString().split('e');
    if (parts.length === 2) {
        if (parts[1][0] !== '-') return decimalPlaces;
        else decimalPlaces = Number(parts[1].slice(1));
    }
    var decimalParts = parts[0].split('.');
    if (decimalParts.length === 2) decimalPlaces += decimalParts[1].length;
    return decimalPlaces;
};
$cad6f1a814752b45$export$213e2a3e7c4f326e = function isSchema(val) {
    return typeof val === 'object' && val || typeof val === 'boolean';
};

});


parcelRequire.register("74FPd", function(module, exports) {

$parcel$export(module.exports, "SchemaScanResult", () => $526959b7b5f0d315$export$fa2f6d6458e494ac, (v) => $526959b7b5f0d315$export$fa2f6d6458e494ac = v);
$parcel$export(module.exports, "scan", () => $526959b7b5f0d315$export$c87d910e63d22ed6, (v) => $526959b7b5f0d315$export$c87d910e63d22ed6 = v);
var $526959b7b5f0d315$export$fa2f6d6458e494ac;
/**
 * Adds a schema with a certain urn to the Validator instance.
 * @param string uri
 * @param object schema
 * @return {Object}
 */ var $526959b7b5f0d315$export$c87d910e63d22ed6;
"use strict";

var $ab19r = parcelRequire("ab19r");

var $hpI3p = parcelRequire("hpI3p");
$526959b7b5f0d315$export$fa2f6d6458e494ac = $526959b7b5f0d315$var$SchemaScanResult;
function $526959b7b5f0d315$var$SchemaScanResult(found, ref) {
    this.id = found;
    this.ref = ref;
}
$526959b7b5f0d315$export$c87d910e63d22ed6 = function scan(base, schema1) {
    function scanSchema(baseuri, schema) {
        if (!schema || typeof schema != 'object') return;
        // Mark all referenced schemas so we can tell later which schemas are referred to, but never defined
        if (schema.$ref) {
            var resolvedUri = $ab19r.resolve(baseuri, schema.$ref);
            ref[resolvedUri] = ref[resolvedUri] ? ref[resolvedUri] + 1 : 0;
            return;
        }
        var id = schema.$id || schema.id;
        var ourBase = id ? $ab19r.resolve(baseuri, id) : baseuri;
        if (ourBase) {
            // If there's no fragment, append an empty one
            if (ourBase.indexOf('#') < 0) ourBase += '#';
            if (found[ourBase]) {
                if (!$hpI3p.deepCompareStrict(found[ourBase], schema)) throw new Error('Schema <' + ourBase + '> already exists with different definition');
                return found[ourBase];
            }
            found[ourBase] = schema;
            // strip trailing fragment
            if (ourBase[ourBase.length - 1] == '#') found[ourBase.substring(0, ourBase.length - 1)] = schema;
        }
        scanArray(ourBase + '/items', Array.isArray(schema.items) ? schema.items : [
            schema.items
        ]);
        scanArray(ourBase + '/extends', Array.isArray(schema.extends) ? schema.extends : [
            schema.extends
        ]);
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
        for(var i = 0; i < schemas.length; i++)scanSchema(baseuri + '/' + i, schemas[i]);
    }
    function scanObject(baseuri, schemas) {
        if (!schemas || typeof schemas != 'object') return;
        for(var p in schemas)scanSchema(baseuri + '/' + p, schemas[p]);
    }
    var found = {
    };
    var ref = {
    };
    scanSchema(base, schema1);
    return new $526959b7b5f0d315$var$SchemaScanResult(found, ref);
};

});


var $5c3b7721089f9c3a$exports = {};

(parcelRequire("aKzDW")).register(JSON.parse("{\"e6rka\":\"index.b99282c8.js\",\"fJkW7\":\"tsne_tenth.8f62d14c.csv\",\"Rluhf\":\"strawberries.7528ce1d.csv\",\"bI3lL\":\"broccoli.6da3f9ff.csv\",\"64aWn\":\"signals.2124fb3f.csv\",\"9Wqb0\":\"tsne.31fddaac.csv\",\"kZowV\":\"tsne_hundreth.50afa01a.csv\",\"jS4iq\":\"heatmap.9bfbfc44.csv\",\"ck9j8\":\"arcs.c9c4da3f.csv\",\"aeo5u\":\"box-track.8d3e3261.csv\",\"ffOBN\":\"matrix.a04be54b.csv\",\"13j1z\":\"offscreen-webgl-worker.f6f4ca27.js\",\"9xgYG\":\"data-processor-worker.9f55376f.js\"}"));

var $b95c15551dfb42e4$exports = {};

$parcel$export($b95c15551dfb42e4$exports, "configureStore", () => $b95c15551dfb42e4$export$7d8a5b498da695ac, (v) => $b95c15551dfb42e4$export$7d8a5b498da695ac = v);
$parcel$export($b95c15551dfb42e4$exports, "createSlice", () => $b95c15551dfb42e4$export$4d8d9bd83c24ae8b, (v) => $b95c15551dfb42e4$export$4d8d9bd83c24ae8b = v);
$parcel$export($b95c15551dfb42e4$exports, "compose", () => $51663c2ce4b9f72c$export$f672e0b6f7222cd7, (v) => $51663c2ce4b9f72c$export$f672e0b6f7222cd7 = v);
$parcel$export($b95c15551dfb42e4$exports, "combineReducers", () => $51663c2ce4b9f72c$export$66e4520cdb265d18, (v) => $51663c2ce4b9f72c$export$66e4520cdb265d18 = v);
$parcel$export($b95c15551dfb42e4$exports, "applyMiddleware", () => $51663c2ce4b9f72c$export$9ff26e0402cc7b7, (v) => $51663c2ce4b9f72c$export$9ff26e0402cc7b7 = v);
$parcel$export($b95c15551dfb42e4$exports, "createStore", () => $51663c2ce4b9f72c$export$f51a9068ac82ea43, (v) => $51663c2ce4b9f72c$export$f51a9068ac82ea43 = v);
function $02510cd65f6cac4f$var$n(n1) {
    for(var $02510cd65f6cac4f$export$541ac630993a4c84 = arguments.length, $02510cd65f6cac4f$export$16e3aed3edb85946 = Array($02510cd65f6cac4f$export$541ac630993a4c84 > 1 ? $02510cd65f6cac4f$export$541ac630993a4c84 - 1 : 0), $02510cd65f6cac4f$export$22e8af3f75a010e3 = 1; $02510cd65f6cac4f$export$22e8af3f75a010e3 < $02510cd65f6cac4f$export$541ac630993a4c84; $02510cd65f6cac4f$export$22e8af3f75a010e3++)$02510cd65f6cac4f$export$16e3aed3edb85946[$02510cd65f6cac4f$export$22e8af3f75a010e3 - 1] = arguments[$02510cd65f6cac4f$export$22e8af3f75a010e3];
    var i, o;
    throw Error("[Immer] minified error nr: " + n1 + ($02510cd65f6cac4f$export$16e3aed3edb85946.length ? " " + $02510cd65f6cac4f$export$16e3aed3edb85946.map(function(n) {
        return "'" + n + "'";
    }).join(",") : "") + ". Find the full error at: https://bit.ly/3cXEKWf");
}
function $02510cd65f6cac4f$export$541ac630993a4c84(n) {
    return !!n && !!n[$02510cd65f6cac4f$var$Q];
}
function $02510cd65f6cac4f$export$16e3aed3edb85946(n2) {
    return !!n2 && ((function(n) {
        if (!n || "object" != typeof n) return !1;
        var $02510cd65f6cac4f$export$541ac630993a4c84 = Object.getPrototypeOf(n);
        if (null === $02510cd65f6cac4f$export$541ac630993a4c84) return !0;
        var $02510cd65f6cac4f$export$16e3aed3edb85946 = Object.hasOwnProperty.call($02510cd65f6cac4f$export$541ac630993a4c84, "constructor") && $02510cd65f6cac4f$export$541ac630993a4c84.constructor;
        return $02510cd65f6cac4f$export$16e3aed3edb85946 === Object || "function" == typeof $02510cd65f6cac4f$export$16e3aed3edb85946 && Function.toString.call($02510cd65f6cac4f$export$16e3aed3edb85946) === $02510cd65f6cac4f$var$Z;
    })(n2) || Array.isArray(n2) || !!n2[$02510cd65f6cac4f$export$6ee2082928bcb0ee] || !!n2.constructor[$02510cd65f6cac4f$export$6ee2082928bcb0ee] || $02510cd65f6cac4f$var$s(n2) || $02510cd65f6cac4f$var$v(n2));
}
function $02510cd65f6cac4f$export$22e8af3f75a010e3($02510cd65f6cac4f$export$16e3aed3edb85946) {
    return $02510cd65f6cac4f$export$541ac630993a4c84($02510cd65f6cac4f$export$16e3aed3edb85946) || $02510cd65f6cac4f$var$n(23, $02510cd65f6cac4f$export$16e3aed3edb85946), $02510cd65f6cac4f$export$16e3aed3edb85946[$02510cd65f6cac4f$var$Q].t;
}
function $02510cd65f6cac4f$var$i(n, $02510cd65f6cac4f$export$541ac630993a4c84, $02510cd65f6cac4f$export$16e3aed3edb85946) {
    void 0 === $02510cd65f6cac4f$export$16e3aed3edb85946 && ($02510cd65f6cac4f$export$16e3aed3edb85946 = !1), 0 === $02510cd65f6cac4f$var$o(n) ? ($02510cd65f6cac4f$export$16e3aed3edb85946 ? Object.keys : $02510cd65f6cac4f$var$nn)(n).forEach(function($02510cd65f6cac4f$export$22e8af3f75a010e3) {
        $02510cd65f6cac4f$export$16e3aed3edb85946 && "symbol" == typeof $02510cd65f6cac4f$export$22e8af3f75a010e3 || $02510cd65f6cac4f$export$541ac630993a4c84($02510cd65f6cac4f$export$22e8af3f75a010e3, n[$02510cd65f6cac4f$export$22e8af3f75a010e3], n);
    }) : n.forEach(function($02510cd65f6cac4f$export$16e3aed3edb85946, $02510cd65f6cac4f$export$22e8af3f75a010e3) {
        return $02510cd65f6cac4f$export$541ac630993a4c84($02510cd65f6cac4f$export$22e8af3f75a010e3, $02510cd65f6cac4f$export$16e3aed3edb85946, n);
    });
}
function $02510cd65f6cac4f$var$o(n) {
    var $02510cd65f6cac4f$export$541ac630993a4c84 = n[$02510cd65f6cac4f$var$Q];
    return $02510cd65f6cac4f$export$541ac630993a4c84 ? $02510cd65f6cac4f$export$541ac630993a4c84.i > 3 ? $02510cd65f6cac4f$export$541ac630993a4c84.i - 4 : $02510cd65f6cac4f$export$541ac630993a4c84.i : Array.isArray(n) ? 1 : $02510cd65f6cac4f$var$s(n) ? 2 : $02510cd65f6cac4f$var$v(n) ? 3 : 0;
}
function $02510cd65f6cac4f$var$u(n, $02510cd65f6cac4f$export$541ac630993a4c84) {
    return 2 === $02510cd65f6cac4f$var$o(n) ? n.has($02510cd65f6cac4f$export$541ac630993a4c84) : Object.prototype.hasOwnProperty.call(n, $02510cd65f6cac4f$export$541ac630993a4c84);
}
function $02510cd65f6cac4f$var$a(n, $02510cd65f6cac4f$export$541ac630993a4c84) {
    return 2 === $02510cd65f6cac4f$var$o(n) ? n.get($02510cd65f6cac4f$export$541ac630993a4c84) : n[$02510cd65f6cac4f$export$541ac630993a4c84];
}
function $02510cd65f6cac4f$var$f(n, $02510cd65f6cac4f$export$541ac630993a4c84, $02510cd65f6cac4f$export$16e3aed3edb85946) {
    var $02510cd65f6cac4f$export$22e8af3f75a010e3 = $02510cd65f6cac4f$var$o(n);
    2 === $02510cd65f6cac4f$export$22e8af3f75a010e3 ? n.set($02510cd65f6cac4f$export$541ac630993a4c84, $02510cd65f6cac4f$export$16e3aed3edb85946) : 3 === $02510cd65f6cac4f$export$22e8af3f75a010e3 ? (n.delete($02510cd65f6cac4f$export$541ac630993a4c84), n.add($02510cd65f6cac4f$export$16e3aed3edb85946)) : n[$02510cd65f6cac4f$export$541ac630993a4c84] = $02510cd65f6cac4f$export$16e3aed3edb85946;
}
function $02510cd65f6cac4f$var$c(n, $02510cd65f6cac4f$export$541ac630993a4c84) {
    return n === $02510cd65f6cac4f$export$541ac630993a4c84 ? 0 !== n || 1 / n == 1 / $02510cd65f6cac4f$export$541ac630993a4c84 : n != n && $02510cd65f6cac4f$export$541ac630993a4c84 != $02510cd65f6cac4f$export$541ac630993a4c84;
}
function $02510cd65f6cac4f$var$s(n) {
    return $02510cd65f6cac4f$var$X && n instanceof Map;
}
function $02510cd65f6cac4f$var$v(n) {
    return $02510cd65f6cac4f$var$q && n instanceof Set;
}
function $02510cd65f6cac4f$var$p(n) {
    return n.o || n.t;
}
function $02510cd65f6cac4f$var$l(n) {
    if (Array.isArray(n)) return Array.prototype.slice.call(n);
    var $02510cd65f6cac4f$export$541ac630993a4c84 = $02510cd65f6cac4f$var$tn(n);
    delete $02510cd65f6cac4f$export$541ac630993a4c84[$02510cd65f6cac4f$var$Q];
    for(var $02510cd65f6cac4f$export$16e3aed3edb85946 = $02510cd65f6cac4f$var$nn($02510cd65f6cac4f$export$541ac630993a4c84), $02510cd65f6cac4f$export$22e8af3f75a010e3 = 0; $02510cd65f6cac4f$export$22e8af3f75a010e3 < $02510cd65f6cac4f$export$16e3aed3edb85946.length; $02510cd65f6cac4f$export$22e8af3f75a010e3++){
        var i = $02510cd65f6cac4f$export$16e3aed3edb85946[$02510cd65f6cac4f$export$22e8af3f75a010e3], o = $02510cd65f6cac4f$export$541ac630993a4c84[i];
        !1 === o.writable && (o.writable = !0, o.configurable = !0), (o.get || o.set) && ($02510cd65f6cac4f$export$541ac630993a4c84[i] = {
            configurable: !0,
            writable: !0,
            enumerable: o.enumerable,
            value: n[i]
        });
    }
    return Object.create(Object.getPrototypeOf(n), $02510cd65f6cac4f$export$541ac630993a4c84);
}
function $02510cd65f6cac4f$export$792f3d81ea979f55(n, $02510cd65f6cac4f$export$22e8af3f75a010e3) {
    return void 0 === $02510cd65f6cac4f$export$22e8af3f75a010e3 && ($02510cd65f6cac4f$export$22e8af3f75a010e3 = !1), $02510cd65f6cac4f$var$y(n) || $02510cd65f6cac4f$export$541ac630993a4c84(n) || !$02510cd65f6cac4f$export$16e3aed3edb85946(n) ? n : ($02510cd65f6cac4f$var$o(n) > 1 && (n.set = n.add = n.clear = n.delete = $02510cd65f6cac4f$var$h), Object.freeze(n), $02510cd65f6cac4f$export$22e8af3f75a010e3 && $02510cd65f6cac4f$var$i(n, function(n, $02510cd65f6cac4f$export$541ac630993a4c84) {
        return $02510cd65f6cac4f$export$792f3d81ea979f55($02510cd65f6cac4f$export$541ac630993a4c84, !0);
    }, !0), n);
}
function $02510cd65f6cac4f$var$h() {
    $02510cd65f6cac4f$var$n(2);
}
function $02510cd65f6cac4f$var$y(n) {
    return null == n || "object" != typeof n || Object.isFrozen(n);
}
function $02510cd65f6cac4f$var$b($02510cd65f6cac4f$export$541ac630993a4c84) {
    var $02510cd65f6cac4f$export$16e3aed3edb85946 = $02510cd65f6cac4f$var$rn[$02510cd65f6cac4f$export$541ac630993a4c84];
    return $02510cd65f6cac4f$export$16e3aed3edb85946 || $02510cd65f6cac4f$var$n(18, $02510cd65f6cac4f$export$541ac630993a4c84), $02510cd65f6cac4f$export$16e3aed3edb85946;
}
function $02510cd65f6cac4f$var$m(n, $02510cd65f6cac4f$export$541ac630993a4c84) {
    $02510cd65f6cac4f$var$rn[n] || ($02510cd65f6cac4f$var$rn[n] = $02510cd65f6cac4f$export$541ac630993a4c84);
}
function $02510cd65f6cac4f$var$_() {
    return $02510cd65f6cac4f$var$U;
}
function $02510cd65f6cac4f$var$j(n, $02510cd65f6cac4f$export$541ac630993a4c84) {
    $02510cd65f6cac4f$export$541ac630993a4c84 && ($02510cd65f6cac4f$var$b("Patches"), n.u = [], n.s = [], n.v = $02510cd65f6cac4f$export$541ac630993a4c84);
}
function $02510cd65f6cac4f$var$O(n) {
    $02510cd65f6cac4f$var$g(n), n.p.forEach($02510cd65f6cac4f$var$S), n.p = null;
}
function $02510cd65f6cac4f$var$g(n) {
    n === $02510cd65f6cac4f$var$U && ($02510cd65f6cac4f$var$U = n.l);
}
function $02510cd65f6cac4f$var$w(n) {
    return $02510cd65f6cac4f$var$U = {
        p: [],
        l: $02510cd65f6cac4f$var$U,
        h: n,
        m: !0,
        _: 0
    };
}
function $02510cd65f6cac4f$var$S(n) {
    var $02510cd65f6cac4f$export$541ac630993a4c84 = n[$02510cd65f6cac4f$var$Q];
    0 === $02510cd65f6cac4f$export$541ac630993a4c84.i || 1 === $02510cd65f6cac4f$export$541ac630993a4c84.i ? $02510cd65f6cac4f$export$541ac630993a4c84.j() : $02510cd65f6cac4f$export$541ac630993a4c84.O = !0;
}
function $02510cd65f6cac4f$var$P($02510cd65f6cac4f$export$541ac630993a4c84, $02510cd65f6cac4f$export$22e8af3f75a010e3) {
    $02510cd65f6cac4f$export$22e8af3f75a010e3._ = $02510cd65f6cac4f$export$22e8af3f75a010e3.p.length;
    var i = $02510cd65f6cac4f$export$22e8af3f75a010e3.p[0], o = void 0 !== $02510cd65f6cac4f$export$541ac630993a4c84 && $02510cd65f6cac4f$export$541ac630993a4c84 !== i;
    return $02510cd65f6cac4f$export$22e8af3f75a010e3.h.g || $02510cd65f6cac4f$var$b("ES5").S($02510cd65f6cac4f$export$22e8af3f75a010e3, $02510cd65f6cac4f$export$541ac630993a4c84, o), o ? (i[$02510cd65f6cac4f$var$Q].P && ($02510cd65f6cac4f$var$O($02510cd65f6cac4f$export$22e8af3f75a010e3), $02510cd65f6cac4f$var$n(4)), $02510cd65f6cac4f$export$16e3aed3edb85946($02510cd65f6cac4f$export$541ac630993a4c84) && ($02510cd65f6cac4f$export$541ac630993a4c84 = $02510cd65f6cac4f$var$M($02510cd65f6cac4f$export$22e8af3f75a010e3, $02510cd65f6cac4f$export$541ac630993a4c84), $02510cd65f6cac4f$export$22e8af3f75a010e3.l || $02510cd65f6cac4f$var$x($02510cd65f6cac4f$export$22e8af3f75a010e3, $02510cd65f6cac4f$export$541ac630993a4c84)), $02510cd65f6cac4f$export$22e8af3f75a010e3.u && $02510cd65f6cac4f$var$b("Patches").M(i[$02510cd65f6cac4f$var$Q], $02510cd65f6cac4f$export$541ac630993a4c84, $02510cd65f6cac4f$export$22e8af3f75a010e3.u, $02510cd65f6cac4f$export$22e8af3f75a010e3.s)) : $02510cd65f6cac4f$export$541ac630993a4c84 = $02510cd65f6cac4f$var$M($02510cd65f6cac4f$export$22e8af3f75a010e3, i, []), $02510cd65f6cac4f$var$O($02510cd65f6cac4f$export$22e8af3f75a010e3), $02510cd65f6cac4f$export$22e8af3f75a010e3.u && $02510cd65f6cac4f$export$22e8af3f75a010e3.v($02510cd65f6cac4f$export$22e8af3f75a010e3.u, $02510cd65f6cac4f$export$22e8af3f75a010e3.s), $02510cd65f6cac4f$export$541ac630993a4c84 !== $02510cd65f6cac4f$export$45b790e32b2810ee ? $02510cd65f6cac4f$export$541ac630993a4c84 : void 0;
}
function $02510cd65f6cac4f$var$M(n, $02510cd65f6cac4f$export$541ac630993a4c84, $02510cd65f6cac4f$export$16e3aed3edb85946) {
    if ($02510cd65f6cac4f$var$y($02510cd65f6cac4f$export$541ac630993a4c84)) return $02510cd65f6cac4f$export$541ac630993a4c84;
    var $02510cd65f6cac4f$export$22e8af3f75a010e3 = $02510cd65f6cac4f$export$541ac630993a4c84[$02510cd65f6cac4f$var$Q];
    if (!$02510cd65f6cac4f$export$22e8af3f75a010e3) return $02510cd65f6cac4f$var$i($02510cd65f6cac4f$export$541ac630993a4c84, function(i, o) {
        return $02510cd65f6cac4f$var$A(n, $02510cd65f6cac4f$export$22e8af3f75a010e3, $02510cd65f6cac4f$export$541ac630993a4c84, i, o, $02510cd65f6cac4f$export$16e3aed3edb85946);
    }, !0), $02510cd65f6cac4f$export$541ac630993a4c84;
    if ($02510cd65f6cac4f$export$22e8af3f75a010e3.A !== n) return $02510cd65f6cac4f$export$541ac630993a4c84;
    if (!$02510cd65f6cac4f$export$22e8af3f75a010e3.P) return $02510cd65f6cac4f$var$x(n, $02510cd65f6cac4f$export$22e8af3f75a010e3.t, !0), $02510cd65f6cac4f$export$22e8af3f75a010e3.t;
    if (!$02510cd65f6cac4f$export$22e8af3f75a010e3.I) {
        $02510cd65f6cac4f$export$22e8af3f75a010e3.I = !0, $02510cd65f6cac4f$export$22e8af3f75a010e3.A._--;
        var o1 = 4 === $02510cd65f6cac4f$export$22e8af3f75a010e3.i || 5 === $02510cd65f6cac4f$export$22e8af3f75a010e3.i ? $02510cd65f6cac4f$export$22e8af3f75a010e3.o = $02510cd65f6cac4f$var$l($02510cd65f6cac4f$export$22e8af3f75a010e3.k) : $02510cd65f6cac4f$export$22e8af3f75a010e3.o;
        $02510cd65f6cac4f$var$i(3 === $02510cd65f6cac4f$export$22e8af3f75a010e3.i ? new Set(o1) : o1, function($02510cd65f6cac4f$export$541ac630993a4c84, i) {
            return $02510cd65f6cac4f$var$A(n, $02510cd65f6cac4f$export$22e8af3f75a010e3, o1, $02510cd65f6cac4f$export$541ac630993a4c84, i, $02510cd65f6cac4f$export$16e3aed3edb85946);
        }), $02510cd65f6cac4f$var$x(n, o1, !1), $02510cd65f6cac4f$export$16e3aed3edb85946 && n.u && $02510cd65f6cac4f$var$b("Patches").R($02510cd65f6cac4f$export$22e8af3f75a010e3, $02510cd65f6cac4f$export$16e3aed3edb85946, n.u, n.s);
    }
    return $02510cd65f6cac4f$export$22e8af3f75a010e3.o;
}
function $02510cd65f6cac4f$var$A($02510cd65f6cac4f$export$22e8af3f75a010e3, i, o, a, c, s) {
    if ($02510cd65f6cac4f$export$541ac630993a4c84(c)) {
        var v = $02510cd65f6cac4f$var$M($02510cd65f6cac4f$export$22e8af3f75a010e3, c, s && i && 3 !== i.i && !$02510cd65f6cac4f$var$u(i.D, a) ? s.concat(a) : void 0);
        if ($02510cd65f6cac4f$var$f(o, a, v), !$02510cd65f6cac4f$export$541ac630993a4c84(v)) return;
        $02510cd65f6cac4f$export$22e8af3f75a010e3.m = !1;
    }
    if ($02510cd65f6cac4f$export$16e3aed3edb85946(c) && !$02510cd65f6cac4f$var$y(c)) {
        if (!$02510cd65f6cac4f$export$22e8af3f75a010e3.h.F && $02510cd65f6cac4f$export$22e8af3f75a010e3._ < 1) return;
        $02510cd65f6cac4f$var$M($02510cd65f6cac4f$export$22e8af3f75a010e3, c), i && i.A.l || $02510cd65f6cac4f$var$x($02510cd65f6cac4f$export$22e8af3f75a010e3, c);
    }
}
function $02510cd65f6cac4f$var$x(n, $02510cd65f6cac4f$export$541ac630993a4c84, $02510cd65f6cac4f$export$16e3aed3edb85946) {
    void 0 === $02510cd65f6cac4f$export$16e3aed3edb85946 && ($02510cd65f6cac4f$export$16e3aed3edb85946 = !1), n.h.F && n.m && $02510cd65f6cac4f$export$792f3d81ea979f55($02510cd65f6cac4f$export$541ac630993a4c84, $02510cd65f6cac4f$export$16e3aed3edb85946);
}
function $02510cd65f6cac4f$var$z(n, $02510cd65f6cac4f$export$541ac630993a4c84) {
    var $02510cd65f6cac4f$export$16e3aed3edb85946 = n[$02510cd65f6cac4f$var$Q];
    return ($02510cd65f6cac4f$export$16e3aed3edb85946 ? $02510cd65f6cac4f$var$p($02510cd65f6cac4f$export$16e3aed3edb85946) : n)[$02510cd65f6cac4f$export$541ac630993a4c84];
}
function $02510cd65f6cac4f$var$I(n, $02510cd65f6cac4f$export$541ac630993a4c84) {
    if ($02510cd65f6cac4f$export$541ac630993a4c84 in n) for(var $02510cd65f6cac4f$export$16e3aed3edb85946 = Object.getPrototypeOf(n); $02510cd65f6cac4f$export$16e3aed3edb85946;){
        var $02510cd65f6cac4f$export$22e8af3f75a010e3 = Object.getOwnPropertyDescriptor($02510cd65f6cac4f$export$16e3aed3edb85946, $02510cd65f6cac4f$export$541ac630993a4c84);
        if ($02510cd65f6cac4f$export$22e8af3f75a010e3) return $02510cd65f6cac4f$export$22e8af3f75a010e3;
        $02510cd65f6cac4f$export$16e3aed3edb85946 = Object.getPrototypeOf($02510cd65f6cac4f$export$16e3aed3edb85946);
    }
}
function $02510cd65f6cac4f$var$k(n) {
    n.P || (n.P = !0, n.l && $02510cd65f6cac4f$var$k(n.l));
}
function $02510cd65f6cac4f$var$E(n) {
    n.o || (n.o = $02510cd65f6cac4f$var$l(n.t));
}
function $02510cd65f6cac4f$var$R(n3, $02510cd65f6cac4f$export$541ac630993a4c84, $02510cd65f6cac4f$export$16e3aed3edb85946) {
    var $02510cd65f6cac4f$export$22e8af3f75a010e3 = $02510cd65f6cac4f$var$s($02510cd65f6cac4f$export$541ac630993a4c84) ? $02510cd65f6cac4f$var$b("MapSet").N($02510cd65f6cac4f$export$541ac630993a4c84, $02510cd65f6cac4f$export$16e3aed3edb85946) : $02510cd65f6cac4f$var$v($02510cd65f6cac4f$export$541ac630993a4c84) ? $02510cd65f6cac4f$var$b("MapSet").T($02510cd65f6cac4f$export$541ac630993a4c84, $02510cd65f6cac4f$export$16e3aed3edb85946) : n3.g ? function(n, $02510cd65f6cac4f$export$541ac630993a4c84) {
        var $02510cd65f6cac4f$export$16e3aed3edb85946 = Array.isArray(n), $02510cd65f6cac4f$export$22e8af3f75a010e3 = {
            i: $02510cd65f6cac4f$export$16e3aed3edb85946 ? 1 : 0,
            A: $02510cd65f6cac4f$export$541ac630993a4c84 ? $02510cd65f6cac4f$export$541ac630993a4c84.A : $02510cd65f6cac4f$var$_(),
            P: !1,
            I: !1,
            D: {
            },
            l: $02510cd65f6cac4f$export$541ac630993a4c84,
            t: n,
            k: null,
            o: null,
            j: null,
            C: !1
        }, i = $02510cd65f6cac4f$export$22e8af3f75a010e3, o = $02510cd65f6cac4f$var$en;
        $02510cd65f6cac4f$export$16e3aed3edb85946 && (i = [
            $02510cd65f6cac4f$export$22e8af3f75a010e3
        ], o = $02510cd65f6cac4f$var$on);
        var u = Proxy.revocable(i, o), a = u.revoke, f = u.proxy;
        return $02510cd65f6cac4f$export$22e8af3f75a010e3.k = f, $02510cd65f6cac4f$export$22e8af3f75a010e3.j = a, f;
    }($02510cd65f6cac4f$export$541ac630993a4c84, $02510cd65f6cac4f$export$16e3aed3edb85946) : $02510cd65f6cac4f$var$b("ES5").J($02510cd65f6cac4f$export$541ac630993a4c84, $02510cd65f6cac4f$export$16e3aed3edb85946);
    return ($02510cd65f6cac4f$export$16e3aed3edb85946 ? $02510cd65f6cac4f$export$16e3aed3edb85946.A : $02510cd65f6cac4f$var$_()).p.push($02510cd65f6cac4f$export$22e8af3f75a010e3), $02510cd65f6cac4f$export$22e8af3f75a010e3;
}
function $02510cd65f6cac4f$export$97aac956da55dae9($02510cd65f6cac4f$export$22e8af3f75a010e3) {
    return $02510cd65f6cac4f$export$541ac630993a4c84($02510cd65f6cac4f$export$22e8af3f75a010e3) || $02510cd65f6cac4f$var$n(22, $02510cd65f6cac4f$export$22e8af3f75a010e3), (function n($02510cd65f6cac4f$export$541ac630993a4c84) {
        if (!$02510cd65f6cac4f$export$16e3aed3edb85946($02510cd65f6cac4f$export$541ac630993a4c84)) return $02510cd65f6cac4f$export$541ac630993a4c84;
        var $02510cd65f6cac4f$export$22e8af3f75a010e3, u = $02510cd65f6cac4f$export$541ac630993a4c84[$02510cd65f6cac4f$var$Q], c = $02510cd65f6cac4f$var$o($02510cd65f6cac4f$export$541ac630993a4c84);
        if (u) {
            if (!u.P && (u.i < 4 || !$02510cd65f6cac4f$var$b("ES5").K(u))) return u.t;
            u.I = !0, $02510cd65f6cac4f$export$22e8af3f75a010e3 = $02510cd65f6cac4f$var$F($02510cd65f6cac4f$export$541ac630993a4c84, c), u.I = !1;
        } else $02510cd65f6cac4f$export$22e8af3f75a010e3 = $02510cd65f6cac4f$var$F($02510cd65f6cac4f$export$541ac630993a4c84, c);
        return $02510cd65f6cac4f$var$i($02510cd65f6cac4f$export$22e8af3f75a010e3, function($02510cd65f6cac4f$export$541ac630993a4c84, $02510cd65f6cac4f$export$16e3aed3edb85946) {
            u && $02510cd65f6cac4f$var$a(u.t, $02510cd65f6cac4f$export$541ac630993a4c84) === $02510cd65f6cac4f$export$16e3aed3edb85946 || $02510cd65f6cac4f$var$f($02510cd65f6cac4f$export$22e8af3f75a010e3, $02510cd65f6cac4f$export$541ac630993a4c84, n($02510cd65f6cac4f$export$16e3aed3edb85946));
        }), 3 === c ? new Set($02510cd65f6cac4f$export$22e8af3f75a010e3) : $02510cd65f6cac4f$export$22e8af3f75a010e3;
    })($02510cd65f6cac4f$export$22e8af3f75a010e3);
}
function $02510cd65f6cac4f$var$F(n, $02510cd65f6cac4f$export$541ac630993a4c84) {
    switch($02510cd65f6cac4f$export$541ac630993a4c84){
        case 2:
            return new Map(n);
        case 3:
            return Array.from(n);
    }
    return $02510cd65f6cac4f$var$l(n);
}
function $02510cd65f6cac4f$export$56771cf63ee491f5() {
    function $02510cd65f6cac4f$export$16e3aed3edb85946(n, $02510cd65f6cac4f$export$541ac630993a4c84) {
        var $02510cd65f6cac4f$export$16e3aed3edb85946 = s1[n];
        return $02510cd65f6cac4f$export$16e3aed3edb85946 ? $02510cd65f6cac4f$export$16e3aed3edb85946.enumerable = $02510cd65f6cac4f$export$541ac630993a4c84 : s1[n] = $02510cd65f6cac4f$export$16e3aed3edb85946 = {
            configurable: !0,
            enumerable: $02510cd65f6cac4f$export$541ac630993a4c84,
            get: function() {
                var $02510cd65f6cac4f$export$541ac630993a4c84 = this[$02510cd65f6cac4f$var$Q];
                return $02510cd65f6cac4f$var$en.get($02510cd65f6cac4f$export$541ac630993a4c84, n);
            },
            set: function($02510cd65f6cac4f$export$541ac630993a4c84) {
                var $02510cd65f6cac4f$export$16e3aed3edb85946 = this[$02510cd65f6cac4f$var$Q];
                $02510cd65f6cac4f$var$en.set($02510cd65f6cac4f$export$16e3aed3edb85946, n, $02510cd65f6cac4f$export$541ac630993a4c84);
            }
        }, $02510cd65f6cac4f$export$16e3aed3edb85946;
    }
    function $02510cd65f6cac4f$export$22e8af3f75a010e3(n) {
        for(var $02510cd65f6cac4f$export$541ac630993a4c84 = n.length - 1; $02510cd65f6cac4f$export$541ac630993a4c84 >= 0; $02510cd65f6cac4f$export$541ac630993a4c84--){
            var $02510cd65f6cac4f$export$16e3aed3edb85946 = n[$02510cd65f6cac4f$export$541ac630993a4c84][$02510cd65f6cac4f$var$Q];
            if (!$02510cd65f6cac4f$export$16e3aed3edb85946.P) switch($02510cd65f6cac4f$export$16e3aed3edb85946.i){
                case 5:
                    a1($02510cd65f6cac4f$export$16e3aed3edb85946) && $02510cd65f6cac4f$var$k($02510cd65f6cac4f$export$16e3aed3edb85946);
                    break;
                case 4:
                    o2($02510cd65f6cac4f$export$16e3aed3edb85946) && $02510cd65f6cac4f$var$k($02510cd65f6cac4f$export$16e3aed3edb85946);
            }
        }
    }
    function o2(n) {
        for(var $02510cd65f6cac4f$export$541ac630993a4c84 = n.t, $02510cd65f6cac4f$export$16e3aed3edb85946 = n.k, $02510cd65f6cac4f$export$22e8af3f75a010e3 = $02510cd65f6cac4f$var$nn($02510cd65f6cac4f$export$16e3aed3edb85946), i = $02510cd65f6cac4f$export$22e8af3f75a010e3.length - 1; i >= 0; i--){
            var o = $02510cd65f6cac4f$export$22e8af3f75a010e3[i];
            if (o !== $02510cd65f6cac4f$var$Q) {
                var a = $02510cd65f6cac4f$export$541ac630993a4c84[o];
                if (void 0 === a && !$02510cd65f6cac4f$var$u($02510cd65f6cac4f$export$541ac630993a4c84, o)) return !0;
                var f = $02510cd65f6cac4f$export$16e3aed3edb85946[o], s = f && f[$02510cd65f6cac4f$var$Q];
                if (s ? s.t !== a : !$02510cd65f6cac4f$var$c(f, a)) return !0;
            }
        }
        var v = !!$02510cd65f6cac4f$export$541ac630993a4c84[$02510cd65f6cac4f$var$Q];
        return $02510cd65f6cac4f$export$22e8af3f75a010e3.length !== $02510cd65f6cac4f$var$nn($02510cd65f6cac4f$export$541ac630993a4c84).length + (v ? 0 : 1);
    }
    function a1(n) {
        var $02510cd65f6cac4f$export$541ac630993a4c84 = n.k;
        if ($02510cd65f6cac4f$export$541ac630993a4c84.length !== n.t.length) return !0;
        var $02510cd65f6cac4f$export$16e3aed3edb85946 = Object.getOwnPropertyDescriptor($02510cd65f6cac4f$export$541ac630993a4c84, $02510cd65f6cac4f$export$541ac630993a4c84.length - 1);
        return !(!$02510cd65f6cac4f$export$16e3aed3edb85946 || $02510cd65f6cac4f$export$16e3aed3edb85946.get);
    }
    function f1($02510cd65f6cac4f$export$541ac630993a4c84) {
        $02510cd65f6cac4f$export$541ac630993a4c84.O && $02510cd65f6cac4f$var$n(3, JSON.stringify($02510cd65f6cac4f$var$p($02510cd65f6cac4f$export$541ac630993a4c84)));
    }
    var s1 = {
    };
    $02510cd65f6cac4f$var$m("ES5", {
        J: function(n4, $02510cd65f6cac4f$export$541ac630993a4c84) {
            var $02510cd65f6cac4f$export$22e8af3f75a010e3 = Array.isArray(n4), i1 = function(n, $02510cd65f6cac4f$export$541ac630993a4c84) {
                if (n) {
                    for(var $02510cd65f6cac4f$export$22e8af3f75a010e3 = Array($02510cd65f6cac4f$export$541ac630993a4c84.length), i = 0; i < $02510cd65f6cac4f$export$541ac630993a4c84.length; i++)Object.defineProperty($02510cd65f6cac4f$export$22e8af3f75a010e3, "" + i, $02510cd65f6cac4f$export$16e3aed3edb85946(i, !0));
                    return $02510cd65f6cac4f$export$22e8af3f75a010e3;
                }
                var o = $02510cd65f6cac4f$var$tn($02510cd65f6cac4f$export$541ac630993a4c84);
                delete o[$02510cd65f6cac4f$var$Q];
                for(var u = $02510cd65f6cac4f$var$nn(o), a = 0; a < u.length; a++){
                    var f = u[a];
                    o[f] = $02510cd65f6cac4f$export$16e3aed3edb85946(f, n || !!o[f].enumerable);
                }
                return Object.create(Object.getPrototypeOf($02510cd65f6cac4f$export$541ac630993a4c84), o);
            }($02510cd65f6cac4f$export$22e8af3f75a010e3, n4), o3 = {
                i: $02510cd65f6cac4f$export$22e8af3f75a010e3 ? 5 : 4,
                A: $02510cd65f6cac4f$export$541ac630993a4c84 ? $02510cd65f6cac4f$export$541ac630993a4c84.A : $02510cd65f6cac4f$var$_(),
                P: !1,
                I: !1,
                D: {
                },
                l: $02510cd65f6cac4f$export$541ac630993a4c84,
                t: n4,
                k: i1,
                o: null,
                O: !1,
                C: !1
            };
            return Object.defineProperty(i1, $02510cd65f6cac4f$var$Q, {
                value: o3,
                writable: !0
            }), i1;
        },
        S: function(n5, $02510cd65f6cac4f$export$16e3aed3edb85946, o4) {
            o4 ? $02510cd65f6cac4f$export$541ac630993a4c84($02510cd65f6cac4f$export$16e3aed3edb85946) && $02510cd65f6cac4f$export$16e3aed3edb85946[$02510cd65f6cac4f$var$Q].A === n5 && $02510cd65f6cac4f$export$22e8af3f75a010e3(n5.p) : (n5.u && (function n6($02510cd65f6cac4f$export$541ac630993a4c84) {
                if ($02510cd65f6cac4f$export$541ac630993a4c84 && "object" == typeof $02510cd65f6cac4f$export$541ac630993a4c84) {
                    var $02510cd65f6cac4f$export$16e3aed3edb85946 = $02510cd65f6cac4f$export$541ac630993a4c84[$02510cd65f6cac4f$var$Q];
                    if ($02510cd65f6cac4f$export$16e3aed3edb85946) {
                        var $02510cd65f6cac4f$export$22e8af3f75a010e3 = $02510cd65f6cac4f$export$16e3aed3edb85946.t, o = $02510cd65f6cac4f$export$16e3aed3edb85946.k, f = $02510cd65f6cac4f$export$16e3aed3edb85946.D, c = $02510cd65f6cac4f$export$16e3aed3edb85946.i;
                        if (4 === c) $02510cd65f6cac4f$var$i(o, function($02510cd65f6cac4f$export$541ac630993a4c84) {
                            $02510cd65f6cac4f$export$541ac630993a4c84 !== $02510cd65f6cac4f$var$Q && (void 0 !== $02510cd65f6cac4f$export$22e8af3f75a010e3[$02510cd65f6cac4f$export$541ac630993a4c84] || $02510cd65f6cac4f$var$u($02510cd65f6cac4f$export$22e8af3f75a010e3, $02510cd65f6cac4f$export$541ac630993a4c84) ? f[$02510cd65f6cac4f$export$541ac630993a4c84] || n6(o[$02510cd65f6cac4f$export$541ac630993a4c84]) : (f[$02510cd65f6cac4f$export$541ac630993a4c84] = !0, $02510cd65f6cac4f$var$k($02510cd65f6cac4f$export$16e3aed3edb85946)));
                        }), $02510cd65f6cac4f$var$i($02510cd65f6cac4f$export$22e8af3f75a010e3, function(n) {
                            void 0 !== o[n] || $02510cd65f6cac4f$var$u(o, n) || (f[n] = !1, $02510cd65f6cac4f$var$k($02510cd65f6cac4f$export$16e3aed3edb85946));
                        });
                        else if (5 === c) {
                            if (a1($02510cd65f6cac4f$export$16e3aed3edb85946) && ($02510cd65f6cac4f$var$k($02510cd65f6cac4f$export$16e3aed3edb85946), f.length = !0), o.length < $02510cd65f6cac4f$export$22e8af3f75a010e3.length) for(var s = o.length; s < $02510cd65f6cac4f$export$22e8af3f75a010e3.length; s++)f[s] = !1;
                            else for(var v = $02510cd65f6cac4f$export$22e8af3f75a010e3.length; v < o.length; v++)f[v] = !0;
                            for(var p = Math.min(o.length, $02510cd65f6cac4f$export$22e8af3f75a010e3.length), l = 0; l < p; l++)void 0 === f[l] && n6(o[l]);
                        }
                    }
                }
            })(n5.p[0]), $02510cd65f6cac4f$export$22e8af3f75a010e3(n5.p));
        },
        K: function(n) {
            return 4 === n.i ? o2(n) : a1(n);
        }
    });
}
function $02510cd65f6cac4f$export$d3a6659991a0696c() {
    function $02510cd65f6cac4f$export$22e8af3f75a010e3(n7) {
        if (!$02510cd65f6cac4f$export$16e3aed3edb85946(n7)) return n7;
        if (Array.isArray(n7)) return n7.map($02510cd65f6cac4f$export$22e8af3f75a010e3);
        if ($02510cd65f6cac4f$var$s(n7)) return new Map(Array.from(n7.entries()).map(function(n) {
            return [
                n[0],
                $02510cd65f6cac4f$export$22e8af3f75a010e3(n[1])
            ];
        }));
        if ($02510cd65f6cac4f$var$v(n7)) return new Set(Array.from(n7).map($02510cd65f6cac4f$export$22e8af3f75a010e3));
        var $02510cd65f6cac4f$export$541ac630993a4c84 = Object.create(Object.getPrototypeOf(n7));
        for(var i in n7)$02510cd65f6cac4f$export$541ac630993a4c84[i] = $02510cd65f6cac4f$export$22e8af3f75a010e3(n7[i]);
        return $02510cd65f6cac4f$var$u(n7, $02510cd65f6cac4f$export$6ee2082928bcb0ee) && ($02510cd65f6cac4f$export$541ac630993a4c84[$02510cd65f6cac4f$export$6ee2082928bcb0ee] = n7[$02510cd65f6cac4f$export$6ee2082928bcb0ee]), $02510cd65f6cac4f$export$541ac630993a4c84;
    }
    function f2(n) {
        return $02510cd65f6cac4f$export$541ac630993a4c84(n) ? $02510cd65f6cac4f$export$22e8af3f75a010e3(n) : n;
    }
    var c = "add";
    $02510cd65f6cac4f$var$m("Patches", {
        $: function($02510cd65f6cac4f$export$541ac630993a4c84, $02510cd65f6cac4f$export$16e3aed3edb85946) {
            return $02510cd65f6cac4f$export$16e3aed3edb85946.forEach(function($02510cd65f6cac4f$export$16e3aed3edb85946) {
                for(var i = $02510cd65f6cac4f$export$16e3aed3edb85946.path, u = $02510cd65f6cac4f$export$16e3aed3edb85946.op, f = $02510cd65f6cac4f$export$541ac630993a4c84, s = 0; s < i.length - 1; s++){
                    var v = $02510cd65f6cac4f$var$o(f), p = "" + i[s];
                    0 !== v && 1 !== v || "__proto__" !== p && "constructor" !== p || $02510cd65f6cac4f$var$n(24), "function" == typeof f && "prototype" === p && $02510cd65f6cac4f$var$n(24), "object" != typeof (f = $02510cd65f6cac4f$var$a(f, p)) && $02510cd65f6cac4f$var$n(15, i.join("/"));
                }
                var l = $02510cd65f6cac4f$var$o(f), $02510cd65f6cac4f$export$792f3d81ea979f55 = $02510cd65f6cac4f$export$22e8af3f75a010e3($02510cd65f6cac4f$export$16e3aed3edb85946.value), h = i[i.length - 1];
                switch(u){
                    case "replace":
                        switch(l){
                            case 2:
                                return f.set(h, $02510cd65f6cac4f$export$792f3d81ea979f55);
                            case 3:
                                $02510cd65f6cac4f$var$n(16);
                            default:
                                return f[h] = $02510cd65f6cac4f$export$792f3d81ea979f55;
                        }
                    case c:
                        switch(l){
                            case 1:
                                return f.splice(h, 0, $02510cd65f6cac4f$export$792f3d81ea979f55);
                            case 2:
                                return f.set(h, $02510cd65f6cac4f$export$792f3d81ea979f55);
                            case 3:
                                return f.add($02510cd65f6cac4f$export$792f3d81ea979f55);
                            default:
                                return f[h] = $02510cd65f6cac4f$export$792f3d81ea979f55;
                        }
                    case "remove":
                        switch(l){
                            case 1:
                                return f.splice(h, 1);
                            case 2:
                                return f.delete(h);
                            case 3:
                                return f.delete($02510cd65f6cac4f$export$16e3aed3edb85946.value);
                            default:
                                return delete f[h];
                        }
                    default:
                        $02510cd65f6cac4f$var$n(17, u);
                }
            }), $02510cd65f6cac4f$export$541ac630993a4c84;
        },
        R: function(n8, $02510cd65f6cac4f$export$541ac630993a4c84, $02510cd65f6cac4f$export$16e3aed3edb85946, $02510cd65f6cac4f$export$22e8af3f75a010e3) {
            switch(n8.i){
                case 0:
                case 4:
                case 2:
                    return (function(n9, $02510cd65f6cac4f$export$541ac630993a4c84, $02510cd65f6cac4f$export$16e3aed3edb85946, $02510cd65f6cac4f$export$22e8af3f75a010e3) {
                        var o = n9.t, s = n9.o;
                        $02510cd65f6cac4f$var$i(n9.D, function(n, i) {
                            var v = $02510cd65f6cac4f$var$a(o, n), p = $02510cd65f6cac4f$var$a(s, n), l = i ? $02510cd65f6cac4f$var$u(o, n) ? "replace" : c : "remove";
                            if (v !== p || "replace" !== l) {
                                var $02510cd65f6cac4f$export$792f3d81ea979f55 = $02510cd65f6cac4f$export$541ac630993a4c84.concat(n);
                                $02510cd65f6cac4f$export$16e3aed3edb85946.push("remove" === l ? {
                                    op: l,
                                    path: $02510cd65f6cac4f$export$792f3d81ea979f55
                                } : {
                                    op: l,
                                    path: $02510cd65f6cac4f$export$792f3d81ea979f55,
                                    value: p
                                }), $02510cd65f6cac4f$export$22e8af3f75a010e3.push(l === c ? {
                                    op: "remove",
                                    path: $02510cd65f6cac4f$export$792f3d81ea979f55
                                } : "remove" === l ? {
                                    op: c,
                                    path: $02510cd65f6cac4f$export$792f3d81ea979f55,
                                    value: f2(v)
                                } : {
                                    op: "replace",
                                    path: $02510cd65f6cac4f$export$792f3d81ea979f55,
                                    value: f2(v)
                                });
                            }
                        });
                    })(n8, $02510cd65f6cac4f$export$541ac630993a4c84, $02510cd65f6cac4f$export$16e3aed3edb85946, $02510cd65f6cac4f$export$22e8af3f75a010e3);
                case 5:
                case 1:
                    return (function(n, $02510cd65f6cac4f$export$541ac630993a4c84, $02510cd65f6cac4f$export$16e3aed3edb85946, $02510cd65f6cac4f$export$22e8af3f75a010e3) {
                        var i = n.t, o = n.D, u = n.o;
                        if (u.length < i.length) {
                            var a = [
                                u,
                                i
                            ];
                            i = a[0], u = a[1];
                            var s = [
                                $02510cd65f6cac4f$export$22e8af3f75a010e3,
                                $02510cd65f6cac4f$export$16e3aed3edb85946
                            ];
                            $02510cd65f6cac4f$export$16e3aed3edb85946 = s[0], $02510cd65f6cac4f$export$22e8af3f75a010e3 = s[1];
                        }
                        for(var v = 0; v < i.length; v++)if (o[v] && u[v] !== i[v]) {
                            var p = $02510cd65f6cac4f$export$541ac630993a4c84.concat([
                                v
                            ]);
                            $02510cd65f6cac4f$export$16e3aed3edb85946.push({
                                op: "replace",
                                path: p,
                                value: f2(u[v])
                            }), $02510cd65f6cac4f$export$22e8af3f75a010e3.push({
                                op: "replace",
                                path: p,
                                value: f2(i[v])
                            });
                        }
                        for(var l = i.length; l < u.length; l++){
                            var $02510cd65f6cac4f$export$792f3d81ea979f55 = $02510cd65f6cac4f$export$541ac630993a4c84.concat([
                                l
                            ]);
                            $02510cd65f6cac4f$export$16e3aed3edb85946.push({
                                op: c,
                                path: $02510cd65f6cac4f$export$792f3d81ea979f55,
                                value: f2(u[l])
                            });
                        }
                        i.length < u.length && $02510cd65f6cac4f$export$22e8af3f75a010e3.push({
                            op: "replace",
                            path: $02510cd65f6cac4f$export$541ac630993a4c84.concat([
                                "length"
                            ]),
                            value: i.length
                        });
                    })(n8, $02510cd65f6cac4f$export$541ac630993a4c84, $02510cd65f6cac4f$export$16e3aed3edb85946, $02510cd65f6cac4f$export$22e8af3f75a010e3);
                case 3:
                    return (function(n10, $02510cd65f6cac4f$export$541ac630993a4c84, $02510cd65f6cac4f$export$16e3aed3edb85946, $02510cd65f6cac4f$export$22e8af3f75a010e3) {
                        var i2 = n10.t, o5 = n10.o, u = 0;
                        i2.forEach(function(n) {
                            if (!o5.has(n)) {
                                var i = $02510cd65f6cac4f$export$541ac630993a4c84.concat([
                                    u
                                ]);
                                $02510cd65f6cac4f$export$16e3aed3edb85946.push({
                                    op: "remove",
                                    path: i,
                                    value: n
                                }), $02510cd65f6cac4f$export$22e8af3f75a010e3.unshift({
                                    op: c,
                                    path: i,
                                    value: n
                                });
                            }
                            u++;
                        }), u = 0, o5.forEach(function(n) {
                            if (!i2.has(n)) {
                                var o = $02510cd65f6cac4f$export$541ac630993a4c84.concat([
                                    u
                                ]);
                                $02510cd65f6cac4f$export$16e3aed3edb85946.push({
                                    op: c,
                                    path: o,
                                    value: n
                                }), $02510cd65f6cac4f$export$22e8af3f75a010e3.unshift({
                                    op: "remove",
                                    path: o,
                                    value: n
                                });
                            }
                            u++;
                        });
                    })(n8, $02510cd65f6cac4f$export$541ac630993a4c84, $02510cd65f6cac4f$export$16e3aed3edb85946, $02510cd65f6cac4f$export$22e8af3f75a010e3);
            }
        },
        M: function(n, $02510cd65f6cac4f$export$541ac630993a4c84, $02510cd65f6cac4f$export$16e3aed3edb85946, $02510cd65f6cac4f$export$22e8af3f75a010e3) {
            $02510cd65f6cac4f$export$16e3aed3edb85946.push({
                op: "replace",
                path: [],
                value: $02510cd65f6cac4f$export$541ac630993a4c84 === $02510cd65f6cac4f$export$45b790e32b2810ee ? void 0 : $02510cd65f6cac4f$export$541ac630993a4c84
            }), $02510cd65f6cac4f$export$22e8af3f75a010e3.push({
                op: "replace",
                path: [],
                value: n.t
            });
        }
    });
}
function $02510cd65f6cac4f$export$7d9f65390203b435() {
    function $02510cd65f6cac4f$export$541ac630993a4c84(n, $02510cd65f6cac4f$export$541ac630993a4c84) {
        function $02510cd65f6cac4f$export$16e3aed3edb85946() {
            this.constructor = n;
        }
        a(n, $02510cd65f6cac4f$export$541ac630993a4c84), n.prototype = ($02510cd65f6cac4f$export$16e3aed3edb85946.prototype = $02510cd65f6cac4f$export$541ac630993a4c84.prototype, new $02510cd65f6cac4f$export$16e3aed3edb85946);
    }
    function $02510cd65f6cac4f$export$22e8af3f75a010e3(n) {
        n.o || (n.D = new Map, n.o = new Map(n.t));
    }
    function o6(n) {
        n.o || (n.o = new Set, n.t.forEach(function($02510cd65f6cac4f$export$541ac630993a4c84) {
            if ($02510cd65f6cac4f$export$16e3aed3edb85946($02510cd65f6cac4f$export$541ac630993a4c84)) {
                var $02510cd65f6cac4f$export$22e8af3f75a010e3 = $02510cd65f6cac4f$var$R(n.A.h, $02510cd65f6cac4f$export$541ac630993a4c84, n);
                n.p.set($02510cd65f6cac4f$export$541ac630993a4c84, $02510cd65f6cac4f$export$22e8af3f75a010e3), n.o.add($02510cd65f6cac4f$export$22e8af3f75a010e3);
            } else n.o.add($02510cd65f6cac4f$export$541ac630993a4c84);
        }));
    }
    function u($02510cd65f6cac4f$export$541ac630993a4c84) {
        $02510cd65f6cac4f$export$541ac630993a4c84.O && $02510cd65f6cac4f$var$n(3, JSON.stringify($02510cd65f6cac4f$var$p($02510cd65f6cac4f$export$541ac630993a4c84)));
    }
    var a = function(n11, $02510cd65f6cac4f$export$541ac630993a4c84) {
        return (a = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(n, $02510cd65f6cac4f$export$541ac630993a4c84) {
            n.__proto__ = $02510cd65f6cac4f$export$541ac630993a4c84;
        } || function(n, $02510cd65f6cac4f$export$541ac630993a4c84) {
            for(var $02510cd65f6cac4f$export$16e3aed3edb85946 in $02510cd65f6cac4f$export$541ac630993a4c84)$02510cd65f6cac4f$export$541ac630993a4c84.hasOwnProperty($02510cd65f6cac4f$export$16e3aed3edb85946) && (n[$02510cd65f6cac4f$export$16e3aed3edb85946] = $02510cd65f6cac4f$export$541ac630993a4c84[$02510cd65f6cac4f$export$16e3aed3edb85946]);
        })(n11, $02510cd65f6cac4f$export$541ac630993a4c84);
    }, f = function() {
        function n12(n, $02510cd65f6cac4f$export$541ac630993a4c84) {
            return this[$02510cd65f6cac4f$var$Q] = {
                i: 2,
                l: $02510cd65f6cac4f$export$541ac630993a4c84,
                A: $02510cd65f6cac4f$export$541ac630993a4c84 ? $02510cd65f6cac4f$export$541ac630993a4c84.A : $02510cd65f6cac4f$var$_(),
                P: !1,
                I: !1,
                o: void 0,
                D: void 0,
                t: n,
                k: this,
                C: !1,
                O: !1
            }, this;
        }
        $02510cd65f6cac4f$export$541ac630993a4c84(n12, Map);
        var o7 = n12.prototype;
        return Object.defineProperty(o7, "size", {
            get: function() {
                return $02510cd65f6cac4f$var$p(this[$02510cd65f6cac4f$var$Q]).size;
            }
        }), o7.has = function(n) {
            return $02510cd65f6cac4f$var$p(this[$02510cd65f6cac4f$var$Q]).has(n);
        }, o7.set = function(n, $02510cd65f6cac4f$export$541ac630993a4c84) {
            var $02510cd65f6cac4f$export$16e3aed3edb85946 = this[$02510cd65f6cac4f$var$Q];
            return u($02510cd65f6cac4f$export$16e3aed3edb85946), $02510cd65f6cac4f$var$p($02510cd65f6cac4f$export$16e3aed3edb85946).has(n) && $02510cd65f6cac4f$var$p($02510cd65f6cac4f$export$16e3aed3edb85946).get(n) === $02510cd65f6cac4f$export$541ac630993a4c84 || ($02510cd65f6cac4f$export$22e8af3f75a010e3($02510cd65f6cac4f$export$16e3aed3edb85946), $02510cd65f6cac4f$var$k($02510cd65f6cac4f$export$16e3aed3edb85946), $02510cd65f6cac4f$export$16e3aed3edb85946.D.set(n, !0), $02510cd65f6cac4f$export$16e3aed3edb85946.o.set(n, $02510cd65f6cac4f$export$541ac630993a4c84), $02510cd65f6cac4f$export$16e3aed3edb85946.D.set(n, !0)), this;
        }, o7.delete = function(n) {
            if (!this.has(n)) return !1;
            var $02510cd65f6cac4f$export$541ac630993a4c84 = this[$02510cd65f6cac4f$var$Q];
            return u($02510cd65f6cac4f$export$541ac630993a4c84), $02510cd65f6cac4f$export$22e8af3f75a010e3($02510cd65f6cac4f$export$541ac630993a4c84), $02510cd65f6cac4f$var$k($02510cd65f6cac4f$export$541ac630993a4c84), $02510cd65f6cac4f$export$541ac630993a4c84.D.set(n, !1), $02510cd65f6cac4f$export$541ac630993a4c84.o.delete(n), !0;
        }, o7.clear = function() {
            var n = this[$02510cd65f6cac4f$var$Q];
            u(n), $02510cd65f6cac4f$var$p(n).size && ($02510cd65f6cac4f$export$22e8af3f75a010e3(n), $02510cd65f6cac4f$var$k(n), n.D = new Map, $02510cd65f6cac4f$var$i(n.t, function($02510cd65f6cac4f$export$541ac630993a4c84) {
                n.D.set($02510cd65f6cac4f$export$541ac630993a4c84, !1);
            }), n.o.clear());
        }, o7.forEach = function(n, $02510cd65f6cac4f$export$541ac630993a4c84) {
            var $02510cd65f6cac4f$export$16e3aed3edb85946 = this;
            $02510cd65f6cac4f$var$p(this[$02510cd65f6cac4f$var$Q]).forEach(function($02510cd65f6cac4f$export$22e8af3f75a010e3, i) {
                n.call($02510cd65f6cac4f$export$541ac630993a4c84, $02510cd65f6cac4f$export$16e3aed3edb85946.get(i), i, $02510cd65f6cac4f$export$16e3aed3edb85946);
            });
        }, o7.get = function(n) {
            var $02510cd65f6cac4f$export$541ac630993a4c84 = this[$02510cd65f6cac4f$var$Q];
            u($02510cd65f6cac4f$export$541ac630993a4c84);
            var i = $02510cd65f6cac4f$var$p($02510cd65f6cac4f$export$541ac630993a4c84).get(n);
            if ($02510cd65f6cac4f$export$541ac630993a4c84.I || !$02510cd65f6cac4f$export$16e3aed3edb85946(i)) return i;
            if (i !== $02510cd65f6cac4f$export$541ac630993a4c84.t.get(n)) return i;
            var o = $02510cd65f6cac4f$var$R($02510cd65f6cac4f$export$541ac630993a4c84.A.h, i, $02510cd65f6cac4f$export$541ac630993a4c84);
            return $02510cd65f6cac4f$export$22e8af3f75a010e3($02510cd65f6cac4f$export$541ac630993a4c84), $02510cd65f6cac4f$export$541ac630993a4c84.o.set(n, o), o;
        }, o7.keys = function() {
            return $02510cd65f6cac4f$var$p(this[$02510cd65f6cac4f$var$Q]).keys();
        }, o7.values = function() {
            var n13, $02510cd65f6cac4f$export$541ac630993a4c84 = this, $02510cd65f6cac4f$export$16e3aed3edb85946 = this.keys();
            return (n13 = {
            })[$02510cd65f6cac4f$var$V] = function() {
                return $02510cd65f6cac4f$export$541ac630993a4c84.values();
            }, n13.next = function() {
                var n = $02510cd65f6cac4f$export$16e3aed3edb85946.next();
                return n.done ? n : {
                    done: !1,
                    value: $02510cd65f6cac4f$export$541ac630993a4c84.get(n.value)
                };
            }, n13;
        }, o7.entries = function() {
            var n14, $02510cd65f6cac4f$export$541ac630993a4c84 = this, $02510cd65f6cac4f$export$16e3aed3edb85946 = this.keys();
            return (n14 = {
            })[$02510cd65f6cac4f$var$V] = function() {
                return $02510cd65f6cac4f$export$541ac630993a4c84.entries();
            }, n14.next = function() {
                var n = $02510cd65f6cac4f$export$16e3aed3edb85946.next();
                if (n.done) return n;
                var $02510cd65f6cac4f$export$22e8af3f75a010e3 = $02510cd65f6cac4f$export$541ac630993a4c84.get(n.value);
                return {
                    done: !1,
                    value: [
                        n.value,
                        $02510cd65f6cac4f$export$22e8af3f75a010e3
                    ]
                };
            }, n14;
        }, o7[$02510cd65f6cac4f$var$V] = function() {
            return this.entries();
        }, n12;
    }(), c = function() {
        function n15(n, $02510cd65f6cac4f$export$541ac630993a4c84) {
            return this[$02510cd65f6cac4f$var$Q] = {
                i: 3,
                l: $02510cd65f6cac4f$export$541ac630993a4c84,
                A: $02510cd65f6cac4f$export$541ac630993a4c84 ? $02510cd65f6cac4f$export$541ac630993a4c84.A : $02510cd65f6cac4f$var$_(),
                P: !1,
                I: !1,
                o: void 0,
                t: n,
                k: this,
                p: new Map,
                O: !1,
                C: !1
            }, this;
        }
        $02510cd65f6cac4f$export$541ac630993a4c84(n15, Set);
        var $02510cd65f6cac4f$export$16e3aed3edb85946 = n15.prototype;
        return Object.defineProperty($02510cd65f6cac4f$export$16e3aed3edb85946, "size", {
            get: function() {
                return $02510cd65f6cac4f$var$p(this[$02510cd65f6cac4f$var$Q]).size;
            }
        }), $02510cd65f6cac4f$export$16e3aed3edb85946.has = function(n) {
            var $02510cd65f6cac4f$export$541ac630993a4c84 = this[$02510cd65f6cac4f$var$Q];
            return u($02510cd65f6cac4f$export$541ac630993a4c84), $02510cd65f6cac4f$export$541ac630993a4c84.o ? !!$02510cd65f6cac4f$export$541ac630993a4c84.o.has(n) || !(!$02510cd65f6cac4f$export$541ac630993a4c84.p.has(n) || !$02510cd65f6cac4f$export$541ac630993a4c84.o.has($02510cd65f6cac4f$export$541ac630993a4c84.p.get(n))) : $02510cd65f6cac4f$export$541ac630993a4c84.t.has(n);
        }, $02510cd65f6cac4f$export$16e3aed3edb85946.add = function(n) {
            var $02510cd65f6cac4f$export$541ac630993a4c84 = this[$02510cd65f6cac4f$var$Q];
            return u($02510cd65f6cac4f$export$541ac630993a4c84), this.has(n) || (o6($02510cd65f6cac4f$export$541ac630993a4c84), $02510cd65f6cac4f$var$k($02510cd65f6cac4f$export$541ac630993a4c84), $02510cd65f6cac4f$export$541ac630993a4c84.o.add(n)), this;
        }, $02510cd65f6cac4f$export$16e3aed3edb85946.delete = function(n) {
            if (!this.has(n)) return !1;
            var $02510cd65f6cac4f$export$541ac630993a4c84 = this[$02510cd65f6cac4f$var$Q];
            return u($02510cd65f6cac4f$export$541ac630993a4c84), o6($02510cd65f6cac4f$export$541ac630993a4c84), $02510cd65f6cac4f$var$k($02510cd65f6cac4f$export$541ac630993a4c84), $02510cd65f6cac4f$export$541ac630993a4c84.o.delete(n) || !!$02510cd65f6cac4f$export$541ac630993a4c84.p.has(n) && $02510cd65f6cac4f$export$541ac630993a4c84.o.delete($02510cd65f6cac4f$export$541ac630993a4c84.p.get(n));
        }, $02510cd65f6cac4f$export$16e3aed3edb85946.clear = function() {
            var n = this[$02510cd65f6cac4f$var$Q];
            u(n), $02510cd65f6cac4f$var$p(n).size && (o6(n), $02510cd65f6cac4f$var$k(n), n.o.clear());
        }, $02510cd65f6cac4f$export$16e3aed3edb85946.values = function() {
            var n = this[$02510cd65f6cac4f$var$Q];
            return u(n), o6(n), n.o.values();
        }, $02510cd65f6cac4f$export$16e3aed3edb85946.entries = function() {
            var n = this[$02510cd65f6cac4f$var$Q];
            return u(n), o6(n), n.o.entries();
        }, $02510cd65f6cac4f$export$16e3aed3edb85946.keys = function() {
            return this.values();
        }, $02510cd65f6cac4f$export$16e3aed3edb85946[$02510cd65f6cac4f$var$V] = function() {
            return this.values();
        }, $02510cd65f6cac4f$export$16e3aed3edb85946.forEach = function(n, $02510cd65f6cac4f$export$541ac630993a4c84) {
            for(var $02510cd65f6cac4f$export$16e3aed3edb85946 = this.values(), $02510cd65f6cac4f$export$22e8af3f75a010e3 = $02510cd65f6cac4f$export$16e3aed3edb85946.next(); !$02510cd65f6cac4f$export$22e8af3f75a010e3.done;)n.call($02510cd65f6cac4f$export$541ac630993a4c84, $02510cd65f6cac4f$export$22e8af3f75a010e3.value, $02510cd65f6cac4f$export$22e8af3f75a010e3.value, this), $02510cd65f6cac4f$export$22e8af3f75a010e3 = $02510cd65f6cac4f$export$16e3aed3edb85946.next();
        }, n15;
    }();
    $02510cd65f6cac4f$var$m("MapSet", {
        N: function(n, $02510cd65f6cac4f$export$541ac630993a4c84) {
            return new f(n, $02510cd65f6cac4f$export$541ac630993a4c84);
        },
        T: function(n, $02510cd65f6cac4f$export$541ac630993a4c84) {
            return new c(n, $02510cd65f6cac4f$export$541ac630993a4c84);
        }
    });
}
function $02510cd65f6cac4f$export$cae049b67c7d1bc9() {
    $02510cd65f6cac4f$export$56771cf63ee491f5(), $02510cd65f6cac4f$export$7d9f65390203b435(), $02510cd65f6cac4f$export$d3a6659991a0696c();
}
function $02510cd65f6cac4f$export$c05b21e3257751e5(n) {
    return n;
}
function $02510cd65f6cac4f$export$20f911b3f8cf0b74(n) {
    return n;
}
var $02510cd65f6cac4f$var$G, $02510cd65f6cac4f$var$U, $02510cd65f6cac4f$var$W = "undefined" != typeof Symbol && "symbol" == typeof Symbol("x"), $02510cd65f6cac4f$var$X = "undefined" != typeof Map, $02510cd65f6cac4f$var$q = "undefined" != typeof Set, $02510cd65f6cac4f$var$B = "undefined" != typeof Proxy && void 0 !== Proxy.revocable && "undefined" != typeof Reflect, $02510cd65f6cac4f$export$45b790e32b2810ee = $02510cd65f6cac4f$var$W ? Symbol.for("immer-nothing") : (($02510cd65f6cac4f$var$G = {
})["immer-nothing"] = !0, $02510cd65f6cac4f$var$G), $02510cd65f6cac4f$export$6ee2082928bcb0ee = $02510cd65f6cac4f$var$W ? Symbol.for("immer-draftable") : "__$immer_draftable", $02510cd65f6cac4f$var$Q = $02510cd65f6cac4f$var$W ? Symbol.for("immer-state") : "__$immer_state", $02510cd65f6cac4f$var$V = "undefined" != typeof Symbol && Symbol.iterator || "@@iterator", $02510cd65f6cac4f$var$Y = {
    0: "Illegal state",
    1: "Immer drafts cannot have computed properties",
    2: "This object has been frozen and should not be mutated",
    3: function(n) {
        return "Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? " + n;
    },
    4: "An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.",
    5: "Immer forbids circular references",
    6: "The first or second argument to `produce` must be a function",
    7: "The third argument to `produce` must be a function or undefined",
    8: "First argument to `createDraft` must be a plain object, an array, or an immerable object",
    9: "First argument to `finishDraft` must be a draft returned by `createDraft`",
    10: "The given draft is already finalized",
    11: "Object.defineProperty() cannot be used on an Immer draft",
    12: "Object.setPrototypeOf() cannot be used on an Immer draft",
    13: "Immer only supports deleting array indices",
    14: "Immer only supports setting array indices and the 'length' property",
    15: function(n) {
        return "Cannot apply patch, path doesn't resolve: " + n;
    },
    16: 'Sets cannot have "replace" patches.',
    17: function(n) {
        return "Unsupported patch operation: " + n;
    },
    18: function(n) {
        return "The plugin for '" + n + "' has not been loaded into Immer. To enable the plugin, import and call `enable" + n + "()` when initializing your application.";
    },
    20: "Cannot use proxies if Proxy, Proxy.revocable or Reflect are not available",
    21: function(n) {
        return "produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '" + n + "'";
    },
    22: function(n) {
        return "'current' expects a draft, got: " + n;
    },
    23: function(n) {
        return "'original' expects a draft, got: " + n;
    },
    24: "Patching reserved attributes like __proto__, prototype and constructor is not allowed"
}, $02510cd65f6cac4f$var$Z = "" + Object.prototype.constructor, $02510cd65f6cac4f$var$nn = "undefined" != typeof Reflect && Reflect.ownKeys ? Reflect.ownKeys : void 0 !== Object.getOwnPropertySymbols ? function(n) {
    return Object.getOwnPropertyNames(n).concat(Object.getOwnPropertySymbols(n));
} : Object.getOwnPropertyNames, $02510cd65f6cac4f$var$tn = Object.getOwnPropertyDescriptors || function(n) {
    var $02510cd65f6cac4f$export$541ac630993a4c84 = {
    };
    return $02510cd65f6cac4f$var$nn(n).forEach(function($02510cd65f6cac4f$export$16e3aed3edb85946) {
        $02510cd65f6cac4f$export$541ac630993a4c84[$02510cd65f6cac4f$export$16e3aed3edb85946] = Object.getOwnPropertyDescriptor(n, $02510cd65f6cac4f$export$16e3aed3edb85946);
    }), $02510cd65f6cac4f$export$541ac630993a4c84;
}, $02510cd65f6cac4f$var$rn = {
}, $02510cd65f6cac4f$var$en = {
    get: function(n16, $02510cd65f6cac4f$export$541ac630993a4c84) {
        if ($02510cd65f6cac4f$export$541ac630993a4c84 === $02510cd65f6cac4f$var$Q) return n16;
        var $02510cd65f6cac4f$export$22e8af3f75a010e3 = $02510cd65f6cac4f$var$p(n16);
        if (!$02510cd65f6cac4f$var$u($02510cd65f6cac4f$export$22e8af3f75a010e3, $02510cd65f6cac4f$export$541ac630993a4c84)) return (function(n, $02510cd65f6cac4f$export$541ac630993a4c84, $02510cd65f6cac4f$export$16e3aed3edb85946) {
            var $02510cd65f6cac4f$export$22e8af3f75a010e3, i = $02510cd65f6cac4f$var$I($02510cd65f6cac4f$export$541ac630993a4c84, $02510cd65f6cac4f$export$16e3aed3edb85946);
            return i ? "value" in i ? i.value : null === ($02510cd65f6cac4f$export$22e8af3f75a010e3 = i.get) || void 0 === $02510cd65f6cac4f$export$22e8af3f75a010e3 ? void 0 : $02510cd65f6cac4f$export$22e8af3f75a010e3.call(n.k) : void 0;
        })(n16, $02510cd65f6cac4f$export$22e8af3f75a010e3, $02510cd65f6cac4f$export$541ac630993a4c84);
        var i3 = $02510cd65f6cac4f$export$22e8af3f75a010e3[$02510cd65f6cac4f$export$541ac630993a4c84];
        return n16.I || !$02510cd65f6cac4f$export$16e3aed3edb85946(i3) ? i3 : i3 === $02510cd65f6cac4f$var$z(n16.t, $02510cd65f6cac4f$export$541ac630993a4c84) ? ($02510cd65f6cac4f$var$E(n16), n16.o[$02510cd65f6cac4f$export$541ac630993a4c84] = $02510cd65f6cac4f$var$R(n16.A.h, i3, n16)) : i3;
    },
    has: function(n, $02510cd65f6cac4f$export$541ac630993a4c84) {
        return $02510cd65f6cac4f$export$541ac630993a4c84 in $02510cd65f6cac4f$var$p(n);
    },
    ownKeys: function(n) {
        return Reflect.ownKeys($02510cd65f6cac4f$var$p(n));
    },
    set: function(n, $02510cd65f6cac4f$export$541ac630993a4c84, $02510cd65f6cac4f$export$16e3aed3edb85946) {
        var $02510cd65f6cac4f$export$22e8af3f75a010e3 = $02510cd65f6cac4f$var$I($02510cd65f6cac4f$var$p(n), $02510cd65f6cac4f$export$541ac630993a4c84);
        if (null == $02510cd65f6cac4f$export$22e8af3f75a010e3 ? void 0 : $02510cd65f6cac4f$export$22e8af3f75a010e3.set) return $02510cd65f6cac4f$export$22e8af3f75a010e3.set.call(n.k, $02510cd65f6cac4f$export$16e3aed3edb85946), !0;
        if (!n.P) {
            var i = $02510cd65f6cac4f$var$z($02510cd65f6cac4f$var$p(n), $02510cd65f6cac4f$export$541ac630993a4c84), o = null == i ? void 0 : i[$02510cd65f6cac4f$var$Q];
            if (o && o.t === $02510cd65f6cac4f$export$16e3aed3edb85946) return n.o[$02510cd65f6cac4f$export$541ac630993a4c84] = $02510cd65f6cac4f$export$16e3aed3edb85946, n.D[$02510cd65f6cac4f$export$541ac630993a4c84] = !1, !0;
            if ($02510cd65f6cac4f$var$c($02510cd65f6cac4f$export$16e3aed3edb85946, i) && (void 0 !== $02510cd65f6cac4f$export$16e3aed3edb85946 || $02510cd65f6cac4f$var$u(n.t, $02510cd65f6cac4f$export$541ac630993a4c84))) return !0;
            $02510cd65f6cac4f$var$E(n), $02510cd65f6cac4f$var$k(n);
        }
        return n.o[$02510cd65f6cac4f$export$541ac630993a4c84] === $02510cd65f6cac4f$export$16e3aed3edb85946 && "number" != typeof $02510cd65f6cac4f$export$16e3aed3edb85946 && (void 0 !== $02510cd65f6cac4f$export$16e3aed3edb85946 || $02510cd65f6cac4f$export$541ac630993a4c84 in n.o) || (n.o[$02510cd65f6cac4f$export$541ac630993a4c84] = $02510cd65f6cac4f$export$16e3aed3edb85946, n.D[$02510cd65f6cac4f$export$541ac630993a4c84] = !0, !0);
    },
    deleteProperty: function(n, $02510cd65f6cac4f$export$541ac630993a4c84) {
        return void 0 !== $02510cd65f6cac4f$var$z(n.t, $02510cd65f6cac4f$export$541ac630993a4c84) || $02510cd65f6cac4f$export$541ac630993a4c84 in n.t ? (n.D[$02510cd65f6cac4f$export$541ac630993a4c84] = !1, $02510cd65f6cac4f$var$E(n), $02510cd65f6cac4f$var$k(n)) : delete n.D[$02510cd65f6cac4f$export$541ac630993a4c84], n.o && delete n.o[$02510cd65f6cac4f$export$541ac630993a4c84], !0;
    },
    getOwnPropertyDescriptor: function(n, $02510cd65f6cac4f$export$541ac630993a4c84) {
        var $02510cd65f6cac4f$export$16e3aed3edb85946 = $02510cd65f6cac4f$var$p(n), $02510cd65f6cac4f$export$22e8af3f75a010e3 = Reflect.getOwnPropertyDescriptor($02510cd65f6cac4f$export$16e3aed3edb85946, $02510cd65f6cac4f$export$541ac630993a4c84);
        return $02510cd65f6cac4f$export$22e8af3f75a010e3 ? {
            writable: !0,
            configurable: 1 !== n.i || "length" !== $02510cd65f6cac4f$export$541ac630993a4c84,
            enumerable: $02510cd65f6cac4f$export$22e8af3f75a010e3.enumerable,
            value: $02510cd65f6cac4f$export$16e3aed3edb85946[$02510cd65f6cac4f$export$541ac630993a4c84]
        } : $02510cd65f6cac4f$export$22e8af3f75a010e3;
    },
    defineProperty: function() {
        $02510cd65f6cac4f$var$n(11);
    },
    getPrototypeOf: function(n) {
        return Object.getPrototypeOf(n.t);
    },
    setPrototypeOf: function() {
        $02510cd65f6cac4f$var$n(12);
    }
}, $02510cd65f6cac4f$var$on = {
};
$02510cd65f6cac4f$var$i($02510cd65f6cac4f$var$en, function(n, $02510cd65f6cac4f$export$541ac630993a4c84) {
    $02510cd65f6cac4f$var$on[n] = function() {
        return arguments[0] = arguments[0][0], $02510cd65f6cac4f$export$541ac630993a4c84.apply(this, arguments);
    };
}), $02510cd65f6cac4f$var$on.deleteProperty = function($02510cd65f6cac4f$export$541ac630993a4c84, $02510cd65f6cac4f$export$16e3aed3edb85946) {
    return $02510cd65f6cac4f$var$en.deleteProperty.call(this, $02510cd65f6cac4f$export$541ac630993a4c84[0], $02510cd65f6cac4f$export$16e3aed3edb85946);
}, $02510cd65f6cac4f$var$on.set = function($02510cd65f6cac4f$export$541ac630993a4c84, $02510cd65f6cac4f$export$16e3aed3edb85946, $02510cd65f6cac4f$export$22e8af3f75a010e3) {
    return $02510cd65f6cac4f$var$en.set.call(this, $02510cd65f6cac4f$export$541ac630993a4c84[0], $02510cd65f6cac4f$export$16e3aed3edb85946, $02510cd65f6cac4f$export$22e8af3f75a010e3, $02510cd65f6cac4f$export$541ac630993a4c84[0]);
};
var $02510cd65f6cac4f$export$aaadc6ff0f822719 = function() {
    function $02510cd65f6cac4f$export$22e8af3f75a010e3($02510cd65f6cac4f$export$541ac630993a4c84) {
        var $02510cd65f6cac4f$export$22e8af3f75a010e3 = this;
        this.g = $02510cd65f6cac4f$var$B, this.F = !0, this.produce = function($02510cd65f6cac4f$export$541ac630993a4c84, i, o8) {
            if ("function" == typeof $02510cd65f6cac4f$export$541ac630993a4c84 && "function" != typeof i) {
                var u = i;
                i = $02510cd65f6cac4f$export$541ac630993a4c84;
                var a = $02510cd65f6cac4f$export$22e8af3f75a010e3;
                return function(n17) {
                    var $02510cd65f6cac4f$export$541ac630993a4c84 = this;
                    void 0 === n17 && (n17 = u);
                    for(var $02510cd65f6cac4f$export$16e3aed3edb85946 = arguments.length, $02510cd65f6cac4f$export$22e8af3f75a010e3 = Array($02510cd65f6cac4f$export$16e3aed3edb85946 > 1 ? $02510cd65f6cac4f$export$16e3aed3edb85946 - 1 : 0), o = 1; o < $02510cd65f6cac4f$export$16e3aed3edb85946; o++)$02510cd65f6cac4f$export$22e8af3f75a010e3[o - 1] = arguments[o];
                    return a.produce(n17, function(n) {
                        var $02510cd65f6cac4f$export$16e3aed3edb85946;
                        return ($02510cd65f6cac4f$export$16e3aed3edb85946 = i).call.apply($02510cd65f6cac4f$export$16e3aed3edb85946, [
                            $02510cd65f6cac4f$export$541ac630993a4c84,
                            n
                        ].concat($02510cd65f6cac4f$export$22e8af3f75a010e3));
                    });
                };
            }
            var f;
            if ("function" != typeof i && $02510cd65f6cac4f$var$n(6), void 0 !== o8 && "function" != typeof o8 && $02510cd65f6cac4f$var$n(7), $02510cd65f6cac4f$export$16e3aed3edb85946($02510cd65f6cac4f$export$541ac630993a4c84)) {
                var c = $02510cd65f6cac4f$var$w($02510cd65f6cac4f$export$22e8af3f75a010e3), s = $02510cd65f6cac4f$var$R($02510cd65f6cac4f$export$22e8af3f75a010e3, $02510cd65f6cac4f$export$541ac630993a4c84, void 0), v = !0;
                try {
                    f = i(s), v = !1;
                } finally{
                    v ? $02510cd65f6cac4f$var$O(c) : $02510cd65f6cac4f$var$g(c);
                }
                return "undefined" != typeof Promise && f instanceof Promise ? f.then(function(n) {
                    return $02510cd65f6cac4f$var$j(c, o8), $02510cd65f6cac4f$var$P(n, c);
                }, function(n) {
                    throw $02510cd65f6cac4f$var$O(c), n;
                }) : ($02510cd65f6cac4f$var$j(c, o8), $02510cd65f6cac4f$var$P(f, c));
            }
            if (!$02510cd65f6cac4f$export$541ac630993a4c84 || "object" != typeof $02510cd65f6cac4f$export$541ac630993a4c84) {
                if ((f = i($02510cd65f6cac4f$export$541ac630993a4c84)) === $02510cd65f6cac4f$export$45b790e32b2810ee) return;
                return void 0 === f && (f = $02510cd65f6cac4f$export$541ac630993a4c84), $02510cd65f6cac4f$export$22e8af3f75a010e3.F && $02510cd65f6cac4f$export$792f3d81ea979f55(f, !0), f;
            }
            $02510cd65f6cac4f$var$n(21, $02510cd65f6cac4f$export$541ac630993a4c84);
        }, this.produceWithPatches = function(n18, $02510cd65f6cac4f$export$541ac630993a4c84) {
            var $02510cd65f6cac4f$export$16e3aed3edb85946, i5;
            return "function" == typeof n18 ? function($02510cd65f6cac4f$export$541ac630993a4c84) {
                for(var $02510cd65f6cac4f$export$16e3aed3edb85946 = arguments.length, i = Array($02510cd65f6cac4f$export$16e3aed3edb85946 > 1 ? $02510cd65f6cac4f$export$16e3aed3edb85946 - 1 : 0), o = 1; o < $02510cd65f6cac4f$export$16e3aed3edb85946; o++)i[o - 1] = arguments[o];
                return $02510cd65f6cac4f$export$22e8af3f75a010e3.produceWithPatches($02510cd65f6cac4f$export$541ac630993a4c84, function($02510cd65f6cac4f$export$541ac630993a4c84) {
                    return n18.apply(void 0, [
                        $02510cd65f6cac4f$export$541ac630993a4c84
                    ].concat(i));
                });
            } : [
                $02510cd65f6cac4f$export$22e8af3f75a010e3.produce(n18, $02510cd65f6cac4f$export$541ac630993a4c84, function(n, $02510cd65f6cac4f$export$541ac630993a4c84) {
                    $02510cd65f6cac4f$export$16e3aed3edb85946 = n, i5 = $02510cd65f6cac4f$export$541ac630993a4c84;
                }),
                $02510cd65f6cac4f$export$16e3aed3edb85946,
                i5
            ];
        }, "boolean" == typeof (null == $02510cd65f6cac4f$export$541ac630993a4c84 ? void 0 : $02510cd65f6cac4f$export$541ac630993a4c84.useProxies) && this.setUseProxies($02510cd65f6cac4f$export$541ac630993a4c84.useProxies), "boolean" == typeof (null == $02510cd65f6cac4f$export$541ac630993a4c84 ? void 0 : $02510cd65f6cac4f$export$541ac630993a4c84.autoFreeze) && this.setAutoFreeze($02510cd65f6cac4f$export$541ac630993a4c84.autoFreeze);
    }
    var i4 = $02510cd65f6cac4f$export$22e8af3f75a010e3.prototype;
    return i4.createDraft = function($02510cd65f6cac4f$export$22e8af3f75a010e3) {
        $02510cd65f6cac4f$export$16e3aed3edb85946($02510cd65f6cac4f$export$22e8af3f75a010e3) || $02510cd65f6cac4f$var$n(8), $02510cd65f6cac4f$export$541ac630993a4c84($02510cd65f6cac4f$export$22e8af3f75a010e3) && ($02510cd65f6cac4f$export$22e8af3f75a010e3 = $02510cd65f6cac4f$export$97aac956da55dae9($02510cd65f6cac4f$export$22e8af3f75a010e3));
        var i = $02510cd65f6cac4f$var$w(this), o = $02510cd65f6cac4f$var$R(this, $02510cd65f6cac4f$export$22e8af3f75a010e3, void 0);
        return o[$02510cd65f6cac4f$var$Q].C = !0, $02510cd65f6cac4f$var$g(i), o;
    }, i4.finishDraft = function($02510cd65f6cac4f$export$541ac630993a4c84, $02510cd65f6cac4f$export$16e3aed3edb85946) {
        var $02510cd65f6cac4f$export$22e8af3f75a010e3 = $02510cd65f6cac4f$export$541ac630993a4c84 && $02510cd65f6cac4f$export$541ac630993a4c84[$02510cd65f6cac4f$var$Q];
        var i = $02510cd65f6cac4f$export$22e8af3f75a010e3.A;
        return $02510cd65f6cac4f$var$j(i, $02510cd65f6cac4f$export$16e3aed3edb85946), $02510cd65f6cac4f$var$P(void 0, i);
    }, i4.setAutoFreeze = function(n) {
        this.F = n;
    }, i4.setUseProxies = function($02510cd65f6cac4f$export$541ac630993a4c84) {
        $02510cd65f6cac4f$export$541ac630993a4c84 && !$02510cd65f6cac4f$var$B && $02510cd65f6cac4f$var$n(20), this.g = $02510cd65f6cac4f$export$541ac630993a4c84;
    }, i4.applyPatches = function(n19, $02510cd65f6cac4f$export$16e3aed3edb85946) {
        var $02510cd65f6cac4f$export$22e8af3f75a010e3;
        for($02510cd65f6cac4f$export$22e8af3f75a010e3 = $02510cd65f6cac4f$export$16e3aed3edb85946.length - 1; $02510cd65f6cac4f$export$22e8af3f75a010e3 >= 0; $02510cd65f6cac4f$export$22e8af3f75a010e3--){
            var i = $02510cd65f6cac4f$export$16e3aed3edb85946[$02510cd65f6cac4f$export$22e8af3f75a010e3];
            if (0 === i.path.length && "replace" === i.op) {
                n19 = i.value;
                break;
            }
        }
        var o = $02510cd65f6cac4f$var$b("Patches").$;
        return $02510cd65f6cac4f$export$541ac630993a4c84(n19) ? o(n19, $02510cd65f6cac4f$export$16e3aed3edb85946) : this.produce(n19, function(n) {
            return o(n, $02510cd65f6cac4f$export$16e3aed3edb85946.slice($02510cd65f6cac4f$export$22e8af3f75a010e3 + 1));
        });
    }, $02510cd65f6cac4f$export$22e8af3f75a010e3;
}(), $02510cd65f6cac4f$var$an = new $02510cd65f6cac4f$export$aaadc6ff0f822719, $02510cd65f6cac4f$export$b46cabe22e78bc00 = $02510cd65f6cac4f$var$an.produce, $02510cd65f6cac4f$export$4da66d41c9492c78 = $02510cd65f6cac4f$var$an.produceWithPatches.bind($02510cd65f6cac4f$var$an), $02510cd65f6cac4f$export$573f26f60825c493 = $02510cd65f6cac4f$var$an.setAutoFreeze.bind($02510cd65f6cac4f$var$an), $02510cd65f6cac4f$export$36ccd207ae29b74e = $02510cd65f6cac4f$var$an.setUseProxies.bind($02510cd65f6cac4f$var$an), $02510cd65f6cac4f$export$a8b8e03e6bbe5473 = $02510cd65f6cac4f$var$an.applyPatches.bind($02510cd65f6cac4f$var$an), $02510cd65f6cac4f$export$3c3214997190395f = $02510cd65f6cac4f$var$an.createDraft.bind($02510cd65f6cac4f$var$an), $02510cd65f6cac4f$export$c60f5e69c521b528 = $02510cd65f6cac4f$var$an.finishDraft.bind($02510cd65f6cac4f$var$an);
var $02510cd65f6cac4f$export$2e2bcd8739ae039 = $02510cd65f6cac4f$export$b46cabe22e78bc00;



function $d9d85cbb7277f1b9$var$defaultEqualityCheck(a, b) {
    return a === b;
}
function $d9d85cbb7277f1b9$var$areArgumentsShallowlyEqual(equalityCheck, prev, next) {
    if (prev === null || next === null || prev.length !== next.length) return false;
    // Do this in a for loop (and not a `forEach` or an `every`) so we can determine equality as fast as possible.
    var length = prev.length;
    for(var i = 0; i < length; i++){
        if (!equalityCheck(prev[i], next[i])) return false;
    }
    return true;
}
function $d9d85cbb7277f1b9$export$281bff7f05488aa2(func) {
    var equalityCheck = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : $d9d85cbb7277f1b9$var$defaultEqualityCheck;
    var lastArgs = null;
    var lastResult = null;
    // we reference arguments instead of spreading them for performance reasons
    return function() {
        if (!$d9d85cbb7277f1b9$var$areArgumentsShallowlyEqual(equalityCheck, lastArgs, arguments)) // apply arguments instead of spreading for performance.
        lastResult = func.apply(null, arguments);
        lastArgs = arguments;
        return lastResult;
    };
}
function $d9d85cbb7277f1b9$var$getDependencies(funcs) {
    var dependencies = Array.isArray(funcs[0]) ? funcs[0] : funcs;
    if (!dependencies.every(function(dep) {
        return typeof dep === 'function';
    })) {
        var dependencyTypes = dependencies.map(function(dep) {
            return typeof dep;
        }).join(', ');
        throw new Error('Selector creators expect all input-selectors to be functions, ' + ('instead received the following types: [' + dependencyTypes + ']'));
    }
    return dependencies;
}
function $d9d85cbb7277f1b9$export$5943f4447f6ef248(memoize) {
    for(var _len = arguments.length, memoizeOptions = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++)memoizeOptions[_key - 1] = arguments[_key];
    return function() {
        for(var _len2 = arguments.length, funcs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++)funcs[_key2] = arguments[_key2];
        var recomputations = 0;
        var resultFunc = funcs.pop();
        var dependencies = $d9d85cbb7277f1b9$var$getDependencies(funcs);
        var memoizedResultFunc = memoize.apply(undefined, [
            function() {
                recomputations++;
                // apply arguments instead of spreading for performance.
                return resultFunc.apply(null, arguments);
            }
        ].concat(memoizeOptions));
        // If a selector is called with the exact same arguments we don't need to traverse our dependencies again.
        var selector = memoize(function() {
            var params = [];
            var length = dependencies.length;
            for(var i = 0; i < length; i++)// apply arguments instead of spreading and mutate a local list of params for performance.
            params.push(dependencies[i].apply(null, arguments));
            // apply arguments instead of spreading for performance.
            return memoizedResultFunc.apply(null, params);
        });
        selector.resultFunc = resultFunc;
        selector.dependencies = dependencies;
        selector.recomputations = function() {
            return recomputations;
        };
        selector.resetRecomputations = function() {
            return recomputations = 0;
        };
        return selector;
    };
}
var $d9d85cbb7277f1b9$export$595d22ed68ca2841 = $d9d85cbb7277f1b9$export$5943f4447f6ef248($d9d85cbb7277f1b9$export$281bff7f05488aa2);
function $d9d85cbb7277f1b9$export$75979cfcd91bf38f(selectors) {
    var selectorCreator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : $d9d85cbb7277f1b9$export$595d22ed68ca2841;
    if (typeof selectors !== 'object') throw new Error('createStructuredSelector expects first argument to be an object ' + ('where each property is a selector, instead received a ' + typeof selectors));
    var objectKeys = Object.keys(selectors);
    return selectorCreator(objectKeys.map(function(key) {
        return selectors[key];
    }), function() {
        for(var _len3 = arguments.length, values = Array(_len3), _key3 = 0; _key3 < _len3; _key3++)values[_key3] = arguments[_key3];
        return values.reduce(function(composition, value, index) {
            composition[objectKeys[index]] = value;
            return composition;
        }, {
        });
    });
}




function $c110d76aa929de29$export$2e2bcd8739ae039(obj, key, value) {
    if (key in obj) Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
    });
    else obj[key] = value;
    return obj;
}


function $53ca501f9a753be3$var$ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function $53ca501f9a753be3$export$2e2bcd8739ae039(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {
        };
        if (i % 2) $53ca501f9a753be3$var$ownKeys(Object(source), true).forEach(function(key) {
            $c110d76aa929de29$export$2e2bcd8739ae039(target, key, source[key]);
        });
        else if (Object.getOwnPropertyDescriptors) Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        else $53ca501f9a753be3$var$ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}


/**
 * Adapted from React: https://github.com/facebook/react/blob/master/packages/shared/formatProdErrorMessage.js
 *
 * Do not require this module directly! Use normal throw error calls. These messages will be replaced with error codes
 * during build.
 * @param {number} code
 */ function $51663c2ce4b9f72c$var$formatProdErrorMessage(code) {
    return "Minified Redux error #" + code + "; visit https://redux.js.org/Errors?code=" + code + " for the full message or " + 'use the non-minified dev environment for full errors. ';
}
// Inlined version of the `symbol-observable` polyfill
var $51663c2ce4b9f72c$var$$$observable = function() {
    return typeof Symbol === 'function' && Symbol.observable || '@@observable';
}();
/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */ var $51663c2ce4b9f72c$var$randomString = function randomString() {
    return Math.random().toString(36).substring(7).split('').join('.');
};
var $51663c2ce4b9f72c$export$4219e499db7ca678 = {
    INIT: "@@redux/INIT" + $51663c2ce4b9f72c$var$randomString(),
    REPLACE: "@@redux/REPLACE" + $51663c2ce4b9f72c$var$randomString(),
    PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {
        return "@@redux/PROBE_UNKNOWN_ACTION" + $51663c2ce4b9f72c$var$randomString();
    }
};
/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */ function $51663c2ce4b9f72c$var$isPlainObject(obj) {
    if (typeof obj !== 'object' || obj === null) return false;
    var proto = obj;
    while(Object.getPrototypeOf(proto) !== null)proto = Object.getPrototypeOf(proto);
    return Object.getPrototypeOf(obj) === proto;
}
function $51663c2ce4b9f72c$var$kindOf(val) {
    var typeOfVal = typeof val;
    var val1, type, constructorName, val2, val3, val4;
    return typeOfVal;
}
/**
 * Creates a Redux store that holds the state tree.
 * The only way to change the data in the store is to call `dispatch()` on it.
 *
 * There should only be a single store in your app. To specify how different
 * parts of the state tree respond to actions, you may combine several reducers
 * into a single reducer function by using `combineReducers`.
 *
 * @param {Function} reducer A function that returns the next state tree, given
 * the current state tree and the action to handle.
 *
 * @param {any} [preloadedState] The initial state. You may optionally specify it
 * to hydrate the state from the server in universal apps, or to restore a
 * previously serialized user session.
 * If you use `combineReducers` to produce the root reducer function, this must be
 * an object with the same shape as `combineReducers` keys.
 *
 * @param {Function} [enhancer] The store enhancer. You may optionally specify it
 * to enhance the store with third-party capabilities such as middleware,
 * time travel, persistence, etc. The only store enhancer that ships with Redux
 * is `applyMiddleware()`.
 *
 * @returns {Store} A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes.
 */ function $51663c2ce4b9f72c$export$f51a9068ac82ea43(reducer, preloadedState, enhancer) {
    var _ref2;
    if (typeof preloadedState === 'function' && typeof enhancer === 'function' || typeof enhancer === 'function' && typeof arguments[3] === 'function') throw new Error($51663c2ce4b9f72c$var$formatProdErrorMessage(0));
    if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
        enhancer = preloadedState;
        preloadedState = undefined;
    }
    if (typeof enhancer !== 'undefined') {
        if (typeof enhancer !== 'function') throw new Error($51663c2ce4b9f72c$var$formatProdErrorMessage(1));
        return enhancer($51663c2ce4b9f72c$export$f51a9068ac82ea43)(reducer, preloadedState);
    }
    if (typeof reducer !== 'function') throw new Error($51663c2ce4b9f72c$var$formatProdErrorMessage(2));
    var currentReducer = reducer;
    var currentState = preloadedState;
    var currentListeners = [];
    var nextListeners = currentListeners;
    var isDispatching = false;
    /**
   * This makes a shallow copy of currentListeners so we can use
   * nextListeners as a temporary list while dispatching.
   *
   * This prevents any bugs around consumers calling
   * subscribe/unsubscribe in the middle of a dispatch.
   */ function ensureCanMutateNextListeners() {
        if (nextListeners === currentListeners) nextListeners = currentListeners.slice();
    }
    /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */ function getState() {
        if (isDispatching) throw new Error($51663c2ce4b9f72c$var$formatProdErrorMessage(3));
        return currentState;
    }
    /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */ function subscribe(listener) {
        if (typeof listener !== 'function') throw new Error($51663c2ce4b9f72c$var$formatProdErrorMessage(4));
        if (isDispatching) throw new Error($51663c2ce4b9f72c$var$formatProdErrorMessage(5));
        var isSubscribed = true;
        ensureCanMutateNextListeners();
        nextListeners.push(listener);
        return function unsubscribe() {
            if (!isSubscribed) return;
            if (isDispatching) throw new Error($51663c2ce4b9f72c$var$formatProdErrorMessage(6));
            isSubscribed = false;
            ensureCanMutateNextListeners();
            var index = nextListeners.indexOf(listener);
            nextListeners.splice(index, 1);
            currentListeners = null;
        };
    }
    /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */ function dispatch(action) {
        if (!$51663c2ce4b9f72c$var$isPlainObject(action)) throw new Error($51663c2ce4b9f72c$var$formatProdErrorMessage(7));
        if (typeof action.type === 'undefined') throw new Error($51663c2ce4b9f72c$var$formatProdErrorMessage(8));
        if (isDispatching) throw new Error($51663c2ce4b9f72c$var$formatProdErrorMessage(9));
        try {
            isDispatching = true;
            currentState = currentReducer(currentState, action);
        } finally{
            isDispatching = false;
        }
        var listeners = currentListeners = nextListeners;
        for(var i = 0; i < listeners.length; i++){
            var listener = listeners[i];
            listener();
        }
        return action;
    }
    /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */ function replaceReducer(nextReducer) {
        if (typeof nextReducer !== 'function') throw new Error($51663c2ce4b9f72c$var$formatProdErrorMessage(10));
        currentReducer = nextReducer; // This action has a similiar effect to ActionTypes.INIT.
        // Any reducers that existed in both the new and old rootReducer
        // will receive the previous state. This effectively populates
        // the new state tree with any relevant data from the old one.
        dispatch({
            type: $51663c2ce4b9f72c$export$4219e499db7ca678.REPLACE
        });
    }
    /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */ function observable() {
        var _ref;
        var outerSubscribe = subscribe;
        return _ref = {
            /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */ subscribe: function subscribe(observer) {
                if (typeof observer !== 'object' || observer === null) throw new Error($51663c2ce4b9f72c$var$formatProdErrorMessage(11));
                function observeState() {
                    if (observer.next) observer.next(getState());
                }
                observeState();
                var unsubscribe = outerSubscribe(observeState);
                return {
                    unsubscribe: unsubscribe
                };
            }
        }, _ref[$51663c2ce4b9f72c$var$$$observable] = function() {
            return this;
        }, _ref;
    } // When a store is created, an "INIT" action is dispatched so that every
    // reducer returns their initial state. This effectively populates
    // the initial state tree.
    dispatch({
        type: $51663c2ce4b9f72c$export$4219e499db7ca678.INIT
    });
    return _ref2 = {
        dispatch: dispatch,
        subscribe: subscribe,
        getState: getState,
        replaceReducer: replaceReducer
    }, _ref2[$51663c2ce4b9f72c$var$$$observable] = observable, _ref2;
}
/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */ function $51663c2ce4b9f72c$var$warning(message) {
    /* eslint-disable no-console */ if (typeof console !== 'undefined' && typeof console.error === 'function') console.error(message);
    /* eslint-enable no-console */ try {
        // This error was thrown as a convenience so that if you enable
        // "break on all exceptions" in your console,
        // it would pause the execution at this line.
        throw new Error(message);
    } catch (e) {
    } // eslint-disable-line no-empty
}
function $51663c2ce4b9f72c$var$getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
    var reducerKeys = Object.keys(reducers);
    var argumentName = action && action.type === $51663c2ce4b9f72c$export$4219e499db7ca678.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';
    if (reducerKeys.length === 0) return "Store does not have a valid reducer. Make sure the argument passed to combineReducers is an object whose values are reducers.";
    if (!$51663c2ce4b9f72c$var$isPlainObject(inputState)) return "The " + argumentName + " has unexpected type of \"" + $51663c2ce4b9f72c$var$kindOf(inputState) + "\". Expected argument to be an object with the following " + ("keys: \"" + reducerKeys.join('", "') + "\"");
    var unexpectedKeys = Object.keys(inputState).filter(function(key) {
        return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
    });
    unexpectedKeys.forEach(function(key) {
        unexpectedKeyCache[key] = true;
    });
    if (action && action.type === $51663c2ce4b9f72c$export$4219e499db7ca678.REPLACE) return;
    if (unexpectedKeys.length > 0) return "Unexpected " + (unexpectedKeys.length > 1 ? 'keys' : 'key') + " " + ("\"" + unexpectedKeys.join('", "') + "\" found in " + argumentName + ". ") + "Expected to find one of the known reducer keys instead: " + ("\"" + reducerKeys.join('", "') + "\". Unexpected keys will be ignored.");
}
function $51663c2ce4b9f72c$var$assertReducerShape(reducers) {
    Object.keys(reducers).forEach(function(key) {
        var reducer = reducers[key];
        var initialState = reducer(undefined, {
            type: $51663c2ce4b9f72c$export$4219e499db7ca678.INIT
        });
        if (typeof initialState === 'undefined') throw new Error($51663c2ce4b9f72c$var$formatProdErrorMessage(12));
        if (typeof reducer(undefined, {
            type: $51663c2ce4b9f72c$export$4219e499db7ca678.PROBE_UNKNOWN_ACTION()
        }) === 'undefined') throw new Error($51663c2ce4b9f72c$var$formatProdErrorMessage(13));
    });
}
/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */ function $51663c2ce4b9f72c$export$66e4520cdb265d18(reducers) {
    var reducerKeys = Object.keys(reducers);
    var finalReducers = {
    };
    for(var i = 0; i < reducerKeys.length; i++){
        var key = reducerKeys[i];
        if (typeof reducers[key] === 'function') finalReducers[key] = reducers[key];
    }
    var finalReducerKeys = Object.keys(finalReducers); // This is used to make sure we don't warn about the same
    // keys multiple times.
    var unexpectedKeyCache;
    var shapeAssertionError;
    try {
        $51663c2ce4b9f72c$var$assertReducerShape(finalReducers);
    } catch (e) {
        shapeAssertionError = e;
    }
    return function combination(state, action) {
        if (state === void 0) state = {
        };
        if (shapeAssertionError) throw shapeAssertionError;
        var warningMessage;
        var hasChanged = false;
        var nextState = {
        };
        for(var _i = 0; _i < finalReducerKeys.length; _i++){
            var _key = finalReducerKeys[_i];
            var reducer = finalReducers[_key];
            var previousStateForKey = state[_key];
            var nextStateForKey = reducer(previousStateForKey, action);
            if (typeof nextStateForKey === 'undefined') {
                var actionType = action && action.type;
                throw new Error($51663c2ce4b9f72c$var$formatProdErrorMessage(14));
            }
            nextState[_key] = nextStateForKey;
            hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
        }
        hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;
        return hasChanged ? nextState : state;
    };
}
function $51663c2ce4b9f72c$var$bindActionCreator(actionCreator, dispatch) {
    return function() {
        return dispatch(actionCreator.apply(this, arguments));
    };
}
/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass an action creator as the first argument,
 * and get a dispatch wrapped function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */ function $51663c2ce4b9f72c$export$aea084d96e84da92(actionCreators, dispatch) {
    if (typeof actionCreators === 'function') return $51663c2ce4b9f72c$var$bindActionCreator(actionCreators, dispatch);
    if (typeof actionCreators !== 'object' || actionCreators === null) throw new Error($51663c2ce4b9f72c$var$formatProdErrorMessage(16));
    var boundActionCreators = {
    };
    for(var key in actionCreators){
        var actionCreator = actionCreators[key];
        if (typeof actionCreator === 'function') boundActionCreators[key] = $51663c2ce4b9f72c$var$bindActionCreator(actionCreator, dispatch);
    }
    return boundActionCreators;
}
/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */ function $51663c2ce4b9f72c$export$f672e0b6f7222cd7() {
    for(var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++)funcs[_key] = arguments[_key];
    if (funcs.length === 0) return function(arg) {
        return arg;
    };
    if (funcs.length === 1) return funcs[0];
    return funcs.reduce(function(a, b) {
        return function() {
            return a(b.apply(void 0, arguments));
        };
    });
}
/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */ function $51663c2ce4b9f72c$export$9ff26e0402cc7b7() {
    for(var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++)middlewares[_key] = arguments[_key];
    return function($51663c2ce4b9f72c$export$f51a9068ac82ea43) {
        return function() {
            var store = $51663c2ce4b9f72c$export$f51a9068ac82ea43.apply(void 0, arguments);
            var _dispatch = function dispatch() {
                throw new Error($51663c2ce4b9f72c$var$formatProdErrorMessage(15));
            };
            var middlewareAPI = {
                getState: store.getState,
                dispatch: function dispatch() {
                    return _dispatch.apply(void 0, arguments);
                }
            };
            var chain = middlewares.map(function(middleware) {
                return middleware(middlewareAPI);
            });
            _dispatch = $51663c2ce4b9f72c$export$f672e0b6f7222cd7.apply(void 0, chain)(store.dispatch);
            return $53ca501f9a753be3$export$2e2bcd8739ae039($53ca501f9a753be3$export$2e2bcd8739ae039({
            }, store), {
            }, {
                dispatch: _dispatch
            });
        };
    };
}
/*
 * This is a dummy function to check if the function name has been altered by minification.
 * If the function has been minified and NODE_ENV !== 'production', warn the user.
 */ function $51663c2ce4b9f72c$var$isCrushed() {
}



function $8df18e944aca637b$var$createThunkMiddleware(extraArgument) {
    return function(_ref) {
        var dispatch = _ref.dispatch, getState = _ref.getState;
        return function(next) {
            return function(action) {
                if (typeof action === 'function') return action(dispatch, getState, extraArgument);
                return next(action);
            };
        };
    };
}
var $8df18e944aca637b$var$thunk = $8df18e944aca637b$var$createThunkMiddleware();
$8df18e944aca637b$var$thunk.withExtraArgument = $8df18e944aca637b$var$createThunkMiddleware;
var $8df18e944aca637b$export$2e2bcd8739ae039 = $8df18e944aca637b$var$thunk;





var $b95c15551dfb42e4$var$__extends = undefined && undefined.__extends || function() {
    var extendStatics = function(d1, b1) {
        extendStatics = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
        return extendStatics(d1, b1);
    };
    return function(d, b) {
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var $b95c15551dfb42e4$var$__generator = undefined && undefined.__generator || function(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, f, y, t, g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
};
var $b95c15551dfb42e4$var$__spreadArray = undefined && undefined.__spreadArray || function(to, from) {
    for(var i = 0, il = from.length, j = to.length; i < il; i++, j++)to[j] = from[i];
    return to;
};
var $b95c15551dfb42e4$var$__defProp = Object.defineProperty;
var $b95c15551dfb42e4$var$__defProps = Object.defineProperties;
var $b95c15551dfb42e4$var$__getOwnPropDescs = Object.getOwnPropertyDescriptors;
var $b95c15551dfb42e4$var$__getOwnPropSymbols = Object.getOwnPropertySymbols;
var $b95c15551dfb42e4$var$__hasOwnProp = Object.prototype.hasOwnProperty;
var $b95c15551dfb42e4$var$__propIsEnum = Object.prototype.propertyIsEnumerable;
var $b95c15551dfb42e4$var$__defNormalProp = function(obj, key, value) {
    return key in obj ? $b95c15551dfb42e4$var$__defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: value
    }) : obj[key] = value;
};
var $b95c15551dfb42e4$var$__spreadValues = function(a, b) {
    for(var prop in b || (b = {
    }))if ($b95c15551dfb42e4$var$__hasOwnProp.call(b, prop)) $b95c15551dfb42e4$var$__defNormalProp(a, prop, b[prop]);
    if ($b95c15551dfb42e4$var$__getOwnPropSymbols) for(var _i = 0, _b = $b95c15551dfb42e4$var$__getOwnPropSymbols(b); _i < _b.length; _i++){
        var prop = _b[_i];
        if ($b95c15551dfb42e4$var$__propIsEnum.call(b, prop)) $b95c15551dfb42e4$var$__defNormalProp(a, prop, b[prop]);
    }
    return a;
};
var $b95c15551dfb42e4$var$__spreadProps = function(a, b) {
    return $b95c15551dfb42e4$var$__defProps(a, $b95c15551dfb42e4$var$__getOwnPropDescs(b));
};
var $b95c15551dfb42e4$var$__async = function(__this, __arguments, generator) {
    return new Promise(function(resolve, reject) {
        var fulfilled = function(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        };
        var rejected = function(value) {
            try {
                step(generator.throw(value));
            } catch (e) {
                reject(e);
            }
        };
        var step = function(x) {
            return x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
        };
        step((generator = generator.apply(__this, __arguments)).next());
    });
};
var $b95c15551dfb42e4$export$a5d3c27355e35910 = function() {
    var args = [];
    for(var _i1 = 0; _i1 < arguments.length; _i1++)args[_i1] = arguments[_i1];
    var selector = $d9d85cbb7277f1b9$export$595d22ed68ca2841.apply(void 0, args);
    var wrappedSelector = function(value) {
        var rest = [];
        for(var _i = 1; _i < arguments.length; _i++)rest[_i - 1] = arguments[_i];
        return selector.apply(void 0, $b95c15551dfb42e4$var$__spreadArray([
            $02510cd65f6cac4f$export$541ac630993a4c84(value) ? $02510cd65f6cac4f$export$97aac956da55dae9(value) : value
        ], rest));
    };
    return wrappedSelector;
};
var $b95c15551dfb42e4$var$composeWithDevTools = typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : function() {
    if (arguments.length === 0) return void 0;
    if (typeof arguments[0] === "object") return $51663c2ce4b9f72c$export$f672e0b6f7222cd7;
    return $51663c2ce4b9f72c$export$f672e0b6f7222cd7.apply(null, arguments);
};
var $b95c15551dfb42e4$var$devToolsEnhancer = typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__ : function() {
    return function(noop) {
        return noop;
    };
};
// src/isPlainObject.ts
function $b95c15551dfb42e4$export$53b83ca8eaab0383(value) {
    if (typeof value !== "object" || value === null) return false;
    var proto = value;
    while(Object.getPrototypeOf(proto) !== null)proto = Object.getPrototypeOf(proto);
    return Object.getPrototypeOf(value) === proto;
}
// src/utils.ts
function $b95c15551dfb42e4$var$getTimeMeasureUtils(maxDelay, fnName) {
    var elapsed = 0;
    return {
        measureTime: function(fn) {
            var started = Date.now();
            try {
                return fn();
            } finally{
                var finished = Date.now();
                elapsed += finished - started;
            }
        },
        warnIfExceeded: function() {
            if (elapsed > maxDelay) console.warn(fnName + " took " + elapsed + "ms, which is more than the warning threshold of " + maxDelay + "ms. \nIf your state or actions are very large, you may want to disable the middleware as it might cause too much of a slowdown in development mode. See https://redux-toolkit.js.org/api/getDefaultMiddleware for instructions.\nIt is disabled in production builds, so you don't need to worry about that.");
        }
    };
}
var $b95c15551dfb42e4$export$20df1e9bd1a54f25 = function(_super) {
    $b95c15551dfb42e4$var$__extends($b95c15551dfb42e4$export$20df1e9bd1a54f25, _super);
    function $b95c15551dfb42e4$export$20df1e9bd1a54f25() {
        var args = [];
        for(var _i = 0; _i < arguments.length; _i++)args[_i] = arguments[_i];
        var _this = _super.apply(this, args) || this;
        Object.setPrototypeOf(_this, $b95c15551dfb42e4$export$20df1e9bd1a54f25.prototype);
        return _this;
    }
    Object.defineProperty($b95c15551dfb42e4$export$20df1e9bd1a54f25, Symbol.species, {
        get: function() {
            return $b95c15551dfb42e4$export$20df1e9bd1a54f25;
        },
        enumerable: false,
        configurable: true
    });
    $b95c15551dfb42e4$export$20df1e9bd1a54f25.prototype.concat = function() {
        var arr = [];
        for(var _i = 0; _i < arguments.length; _i++)arr[_i] = arguments[_i];
        return _super.prototype.concat.apply(this, arr);
    };
    $b95c15551dfb42e4$export$20df1e9bd1a54f25.prototype.prepend = function() {
        var arr = [];
        for(var _i = 0; _i < arguments.length; _i++)arr[_i] = arguments[_i];
        if (arr.length === 1 && Array.isArray(arr[0])) return new ($b95c15551dfb42e4$export$20df1e9bd1a54f25.bind.apply($b95c15551dfb42e4$export$20df1e9bd1a54f25, $b95c15551dfb42e4$var$__spreadArray([
            void 0
        ], arr[0].concat(this))))();
        return new ($b95c15551dfb42e4$export$20df1e9bd1a54f25.bind.apply($b95c15551dfb42e4$export$20df1e9bd1a54f25, $b95c15551dfb42e4$var$__spreadArray([
            void 0
        ], arr.concat(this))))();
    };
    return $b95c15551dfb42e4$export$20df1e9bd1a54f25;
}(Array);
// src/immutableStateInvariantMiddleware.ts
var $b95c15551dfb42e4$var$isProduction = true;
var $b95c15551dfb42e4$var$prefix = "Invariant failed";
function $b95c15551dfb42e4$var$invariant(condition, message) {
    if (condition) return;
    if ($b95c15551dfb42e4$var$isProduction) throw new Error($b95c15551dfb42e4$var$prefix);
    throw new Error($b95c15551dfb42e4$var$prefix + ": " + (message || ""));
}
function $b95c15551dfb42e4$var$stringify(obj, serializer, indent, decycler) {
    return JSON.stringify(obj, $b95c15551dfb42e4$var$getSerialize(serializer, decycler), indent);
}
function $b95c15551dfb42e4$var$getSerialize(serializer, decycler) {
    var stack = [], keys = [];
    if (!decycler) decycler = function(_, value) {
        if (stack[0] === value) return "[Circular ~]";
        return "[Circular ~." + keys.slice(0, stack.indexOf(value)).join(".") + "]";
    };
    return function(key, value) {
        if (stack.length > 0) {
            var thisPos = stack.indexOf(this);
            ~thisPos ? stack.splice(thisPos + 1) : stack.push(this);
            ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key);
            if (~stack.indexOf(value)) value = decycler.call(this, key, value);
        } else stack.push(value);
        return serializer == null ? value : serializer.call(this, key, value);
    };
}
function $b95c15551dfb42e4$export$9021b2733a0028a3(value) {
    return typeof value !== "object" || value === null || typeof value === "undefined" || Object.isFrozen(value);
}
function $b95c15551dfb42e4$var$trackForMutations(isImmutable, ignorePaths, obj) {
    var trackedProperties = $b95c15551dfb42e4$var$trackProperties(isImmutable, ignorePaths, obj);
    return {
        detectMutations: function() {
            return $b95c15551dfb42e4$var$detectMutations(isImmutable, ignorePaths, trackedProperties, obj);
        }
    };
}
function $b95c15551dfb42e4$var$trackProperties(isImmutable, ignorePaths, obj, path) {
    if (ignorePaths === void 0) ignorePaths = [];
    if (path === void 0) path = "";
    var tracked = {
        value: obj
    };
    if (!isImmutable(obj)) {
        tracked.children = {
        };
        for(var key in obj){
            var childPath = path ? path + "." + key : key;
            if (ignorePaths.length && ignorePaths.indexOf(childPath) !== -1) continue;
            tracked.children[key] = $b95c15551dfb42e4$var$trackProperties(isImmutable, ignorePaths, obj[key], childPath);
        }
    }
    return tracked;
}
function $b95c15551dfb42e4$var$detectMutations(isImmutable, ignorePaths, trackedProperty, obj, sameParentRef, path) {
    if (ignorePaths === void 0) ignorePaths = [];
    if (sameParentRef === void 0) sameParentRef = false;
    if (path === void 0) path = "";
    var prevObj = trackedProperty ? trackedProperty.value : void 0;
    var sameRef = prevObj === obj;
    if (sameParentRef && !sameRef && !Number.isNaN(obj)) return {
        wasMutated: true,
        path: path
    };
    if (isImmutable(prevObj) || isImmutable(obj)) return {
        wasMutated: false
    };
    var keysToDetect = {
    };
    for(var key in trackedProperty.children)keysToDetect[key] = true;
    for(var key in obj)keysToDetect[key] = true;
    for(var key in keysToDetect){
        var childPath = path ? path + "." + key : key;
        if (ignorePaths.length && ignorePaths.indexOf(childPath) !== -1) continue;
        var result = $b95c15551dfb42e4$var$detectMutations(isImmutable, ignorePaths, trackedProperty.children[key], obj[key], sameRef, childPath);
        if (result.wasMutated) return result;
    }
    return {
        wasMutated: false
    };
}
function $b95c15551dfb42e4$export$9181bb1a5474289(options) {
    if (options === void 0) options = {
    };
    var _b, isImmutable, ignoredPaths, _c, warnAfter, ignore, track, _b1, getState, state, tracker, result, next1, action1, measureUtils, dispatchedAction;
    return function() {
        return function(next) {
            return function(action) {
                return next(action);
            };
        };
    };
}
// src/serializableStateInvariantMiddleware.ts
function $b95c15551dfb42e4$export$77670485918dab4e(val) {
    var type = typeof val;
    return type === "undefined" || val === null || type === "string" || type === "boolean" || type === "number" || Array.isArray(val) || $b95c15551dfb42e4$export$53b83ca8eaab0383(val);
}
function $b95c15551dfb42e4$export$ada5dca0b571bc7(value, path, isSerializable, getEntries, ignoredPaths) {
    if (path === void 0) path = "";
    if (isSerializable === void 0) isSerializable = $b95c15551dfb42e4$export$77670485918dab4e;
    if (ignoredPaths === void 0) ignoredPaths = [];
    var foundNestedSerializable;
    if (!isSerializable(value)) return {
        keyPath: path || "<root>",
        value: value
    };
    if (typeof value !== "object" || value === null) return false;
    var entries = getEntries != null ? getEntries(value) : Object.entries(value);
    var hasIgnoredPaths = ignoredPaths.length > 0;
    for(var _i = 0, entries_1 = entries; _i < entries_1.length; _i++){
        var _b = entries_1[_i], key = _b[0], nestedValue = _b[1];
        var nestedPath = path ? path + "." + key : key;
        if (hasIgnoredPaths && ignoredPaths.indexOf(nestedPath) >= 0) continue;
        if (!isSerializable(nestedValue)) return {
            keyPath: nestedPath,
            value: nestedValue
        };
        if (typeof nestedValue === "object") {
            foundNestedSerializable = $b95c15551dfb42e4$export$ada5dca0b571bc7(nestedValue, nestedPath, isSerializable, getEntries, ignoredPaths);
            if (foundNestedSerializable) return foundNestedSerializable;
        }
    }
    return false;
}
function $b95c15551dfb42e4$export$6dea1aad6dac5ac2(options) {
    if (options === void 0) options = {
    };
    var _b, isSerializable, getEntries, _c, ignoredActions, _d, ignoredActionPaths, _e, ignoredPaths, _f, warnAfter, _g, ignoreState, storeAPI, next2, action2, measureUtils, foundActionNonSerializableValue, keyPath, value, result, state, foundStateNonSerializableValue, keyPath1, value1;
    return function() {
        return function(next) {
            return function(action) {
                return next(action);
            };
        };
    };
}
// src/getDefaultMiddleware.ts
function $b95c15551dfb42e4$var$isBoolean(x) {
    return typeof x === "boolean";
}
function $b95c15551dfb42e4$var$curryGetDefaultMiddleware() {
    return function curriedGetDefaultMiddleware(options) {
        return $b95c15551dfb42e4$export$36c1185aeee5b0a6(options);
    };
}
function $b95c15551dfb42e4$export$36c1185aeee5b0a6(options) {
    if (options === void 0) options = {
    };
    var _b = options.thunk, thunk = _b === void 0 ? true : _b, _c = options.immutableCheck, immutableCheck = _c === void 0 ? true : _c, _d = options.serializableCheck, serializableCheck = _d === void 0 ? true : _d;
    var middlewareArray = new $b95c15551dfb42e4$export$20df1e9bd1a54f25();
    if (thunk) {
        if ($b95c15551dfb42e4$var$isBoolean(thunk)) middlewareArray.push($8df18e944aca637b$export$2e2bcd8739ae039);
        else middlewareArray.push($8df18e944aca637b$export$2e2bcd8739ae039.withExtraArgument(thunk.extraArgument));
    }
    var immutableOptions, serializableOptions;
    return middlewareArray;
}
// src/configureStore.ts
var $b95c15551dfb42e4$var$IS_PRODUCTION = true;
function $b95c15551dfb42e4$export$7d8a5b498da695ac(options) {
    var curriedGetDefaultMiddleware = $b95c15551dfb42e4$var$curryGetDefaultMiddleware();
    var _b = options || {
    }, _c = _b.reducer, reducer = _c === void 0 ? void 0 : _c, _d = _b.middleware, middleware = _d === void 0 ? curriedGetDefaultMiddleware() : _d, _e = _b.devTools, devTools = _e === void 0 ? true : _e, _f = _b.preloadedState, preloadedState = _f === void 0 ? void 0 : _f, _g = _b.enhancers, enhancers = _g === void 0 ? void 0 : _g;
    var rootReducer;
    if (typeof reducer === "function") rootReducer = reducer;
    else if ($b95c15551dfb42e4$export$53b83ca8eaab0383(reducer)) rootReducer = $51663c2ce4b9f72c$export$66e4520cdb265d18(reducer);
    else throw new Error('"reducer" is a required argument, and must be a function or an object of functions that can be passed to combineReducers');
    var finalMiddleware = middleware;
    if (typeof finalMiddleware === "function") {
        finalMiddleware = finalMiddleware(curriedGetDefaultMiddleware);
        if (!$b95c15551dfb42e4$var$IS_PRODUCTION && !Array.isArray(finalMiddleware)) throw new Error("when using a middleware builder function, an array of middleware must be returned");
    }
    if (!$b95c15551dfb42e4$var$IS_PRODUCTION && finalMiddleware.some(function(item) {
        return typeof item !== "function";
    })) throw new Error("each middleware provided to configureStore must be a function");
    var middlewareEnhancer = $51663c2ce4b9f72c$export$9ff26e0402cc7b7.apply(void 0, finalMiddleware);
    var finalCompose = $51663c2ce4b9f72c$export$f672e0b6f7222cd7;
    if (devTools) finalCompose = $b95c15551dfb42e4$var$composeWithDevTools($b95c15551dfb42e4$var$__spreadValues({
        trace: !$b95c15551dfb42e4$var$IS_PRODUCTION
    }, typeof devTools === "object" && devTools));
    var storeEnhancers = [
        middlewareEnhancer
    ];
    if (Array.isArray(enhancers)) storeEnhancers = $b95c15551dfb42e4$var$__spreadArray([
        middlewareEnhancer
    ], enhancers);
    else if (typeof enhancers === "function") storeEnhancers = enhancers(storeEnhancers);
    var composedEnhancer = finalCompose.apply(void 0, storeEnhancers);
    return $51663c2ce4b9f72c$export$f51a9068ac82ea43(rootReducer, preloadedState, composedEnhancer);
}
// src/createAction.ts
function $b95c15551dfb42e4$export$309c7a02b0b0bc62(type, prepareAction) {
    function actionCreator() {
        var args = [];
        for(var _i = 0; _i < arguments.length; _i++)args[_i] = arguments[_i];
        if (prepareAction) {
            var prepared = prepareAction.apply(void 0, args);
            if (!prepared) throw new Error("prepareAction did not return an object");
            return $b95c15551dfb42e4$var$__spreadValues($b95c15551dfb42e4$var$__spreadValues({
                type: type,
                payload: prepared.payload
            }, "meta" in prepared && {
                meta: prepared.meta
            }), "error" in prepared && {
                error: prepared.error
            });
        }
        return {
            type: type,
            payload: args[0]
        };
    }
    actionCreator.toString = function() {
        return "" + type;
    };
    actionCreator.type = type;
    actionCreator.match = function(action) {
        return action.type === type;
    };
    return actionCreator;
}
function $b95c15551dfb42e4$var$isFSA(action) {
    return $b95c15551dfb42e4$export$53b83ca8eaab0383(action) && typeof action.type === "string" && Object.keys(action).every($b95c15551dfb42e4$var$isValidKey);
}
function $b95c15551dfb42e4$var$isValidKey(key) {
    return [
        "type",
        "payload",
        "error",
        "meta"
    ].indexOf(key) > -1;
}
function $b95c15551dfb42e4$export$e2b5c5db9e2009fd(actionCreator) {
    return "" + actionCreator;
}
// src/mapBuilders.ts
function $b95c15551dfb42e4$var$executeReducerBuilderCallback(builderCallback) {
    var actionsMap = {
    };
    var actionMatchers = [];
    var defaultCaseReducer;
    var builder = {
        addCase: function(typeOrActionCreator, reducer) {
            var type = typeof typeOrActionCreator === "string" ? typeOrActionCreator : typeOrActionCreator.type;
            if (type in actionsMap) throw new Error("addCase cannot be called with two reducers for the same action type");
            actionsMap[type] = reducer;
            return builder;
        },
        addMatcher: function(matcher, reducer) {
            actionMatchers.push({
                matcher: matcher,
                reducer: reducer
            });
            return builder;
        },
        addDefaultCase: function(reducer) {
            defaultCaseReducer = reducer;
            return builder;
        }
    };
    builderCallback(builder);
    return [
        actionsMap,
        actionMatchers,
        defaultCaseReducer
    ];
}
// src/createReducer.ts
function $b95c15551dfb42e4$export$473eb76d322d0290(initialState, mapOrBuilderCallback, actionMatchers, defaultCaseReducer) {
    if (actionMatchers === void 0) actionMatchers = [];
    var _b2 = typeof mapOrBuilderCallback === "function" ? $b95c15551dfb42e4$var$executeReducerBuilderCallback(mapOrBuilderCallback) : [
        mapOrBuilderCallback,
        actionMatchers,
        defaultCaseReducer
    ], actionsMap = _b2[0], finalActionMatchers = _b2[1], finalDefaultCaseReducer = _b2[2];
    var frozenInitialState = $02510cd65f6cac4f$export$2e2bcd8739ae039(initialState, function() {
    });
    return function(state, action) {
        if (state === void 0) state = frozenInitialState;
        var caseReducers = $b95c15551dfb42e4$var$__spreadArray([
            actionsMap[action.type]
        ], finalActionMatchers.filter(function(_b) {
            var matcher = _b.matcher;
            return matcher(action);
        }).map(function(_b) {
            var reducer = _b.reducer;
            return reducer;
        }));
        if (caseReducers.filter(function(cr) {
            return !!cr;
        }).length === 0) caseReducers = [
            finalDefaultCaseReducer
        ];
        return caseReducers.reduce(function(previousState, caseReducer) {
            if (caseReducer) {
                if ($02510cd65f6cac4f$export$541ac630993a4c84(previousState)) {
                    var draft = previousState;
                    var result = caseReducer(draft, action);
                    if (typeof result === "undefined") return previousState;
                    return result;
                } else if (!$02510cd65f6cac4f$export$16e3aed3edb85946(previousState)) {
                    var result = caseReducer(previousState, action);
                    if (typeof result === "undefined") {
                        if (previousState === null) return previousState;
                        throw Error("A case reducer on a non-draftable value must not return undefined");
                    }
                    return result;
                } else return $02510cd65f6cac4f$export$2e2bcd8739ae039(previousState, function(draft) {
                    return caseReducer(draft, action);
                });
            }
            return previousState;
        }, state);
    };
}
// src/createSlice.ts
function $b95c15551dfb42e4$var$getType2(slice, actionKey) {
    return slice + "/" + actionKey;
}
function $b95c15551dfb42e4$export$4d8d9bd83c24ae8b(options) {
    var name = options.name, initialState = options.initialState;
    if (!name) throw new Error("`name` is a required option for createSlice");
    var reducers = options.reducers || {
    };
    var _b = typeof options.extraReducers === "function" ? $b95c15551dfb42e4$var$executeReducerBuilderCallback(options.extraReducers) : [
        options.extraReducers
    ], _c = _b[0], extraReducers = _c === void 0 ? {
    } : _c, _d = _b[1], actionMatchers = _d === void 0 ? [] : _d, _e = _b[2], defaultCaseReducer = _e === void 0 ? void 0 : _e;
    var reducerNames = Object.keys(reducers);
    var sliceCaseReducersByName = {
    };
    var sliceCaseReducersByType = {
    };
    var actionCreators = {
    };
    reducerNames.forEach(function(reducerName) {
        var maybeReducerWithPrepare = reducers[reducerName];
        var type = $b95c15551dfb42e4$var$getType2(name, reducerName);
        var caseReducer;
        var prepareCallback;
        if ("reducer" in maybeReducerWithPrepare) {
            caseReducer = maybeReducerWithPrepare.reducer;
            prepareCallback = maybeReducerWithPrepare.prepare;
        } else caseReducer = maybeReducerWithPrepare;
        sliceCaseReducersByName[reducerName] = caseReducer;
        sliceCaseReducersByType[type] = caseReducer;
        actionCreators[reducerName] = prepareCallback ? $b95c15551dfb42e4$export$309c7a02b0b0bc62(type, prepareCallback) : $b95c15551dfb42e4$export$309c7a02b0b0bc62(type);
    });
    var finalCaseReducers = $b95c15551dfb42e4$var$__spreadValues($b95c15551dfb42e4$var$__spreadValues({
    }, extraReducers), sliceCaseReducersByType);
    var reducer = $b95c15551dfb42e4$export$473eb76d322d0290(initialState, finalCaseReducers, actionMatchers, defaultCaseReducer);
    return {
        name: name,
        reducer: reducer,
        actions: actionCreators,
        caseReducers: sliceCaseReducersByName
    };
}
// src/entities/entity_state.ts
function $b95c15551dfb42e4$var$getInitialEntityState() {
    return {
        ids: [],
        entities: {
        }
    };
}
function $b95c15551dfb42e4$var$createInitialStateFactory() {
    function getInitialState(additionalState) {
        if (additionalState === void 0) additionalState = {
        };
        return Object.assign($b95c15551dfb42e4$var$getInitialEntityState(), additionalState);
    }
    return {
        getInitialState: getInitialState
    };
}
// src/entities/state_selectors.ts
function $b95c15551dfb42e4$var$createSelectorsFactory() {
    function getSelectors(selectState) {
        var selectIds = function(state) {
            return state.ids;
        };
        var selectEntities = function(state) {
            return state.entities;
        };
        var selectAll = $b95c15551dfb42e4$export$a5d3c27355e35910(selectIds, selectEntities, function(ids, entities) {
            return ids.map(function(id) {
                return entities[id];
            });
        });
        var selectId = function(_, id) {
            return id;
        };
        var selectById = function(entities, id) {
            return entities[id];
        };
        var selectTotal = $b95c15551dfb42e4$export$a5d3c27355e35910(selectIds, function(ids) {
            return ids.length;
        });
        if (!selectState) return {
            selectIds: selectIds,
            selectEntities: selectEntities,
            selectAll: selectAll,
            selectTotal: selectTotal,
            selectById: $b95c15551dfb42e4$export$a5d3c27355e35910(selectEntities, selectId, selectById)
        };
        var selectGlobalizedEntities = $b95c15551dfb42e4$export$a5d3c27355e35910(selectState, selectEntities);
        return {
            selectIds: $b95c15551dfb42e4$export$a5d3c27355e35910(selectState, selectIds),
            selectEntities: selectGlobalizedEntities,
            selectAll: $b95c15551dfb42e4$export$a5d3c27355e35910(selectState, selectAll),
            selectTotal: $b95c15551dfb42e4$export$a5d3c27355e35910(selectState, selectTotal),
            selectById: $b95c15551dfb42e4$export$a5d3c27355e35910(selectGlobalizedEntities, selectId, selectById)
        };
    }
    return {
        getSelectors: getSelectors
    };
}
function $b95c15551dfb42e4$var$createSingleArgumentStateOperator(mutator) {
    var operator = $b95c15551dfb42e4$var$createStateOperator(function(_, state) {
        return mutator(state);
    });
    return function operation(state) {
        return operator(state, void 0);
    };
}
function $b95c15551dfb42e4$var$createStateOperator(mutator) {
    return function operation(state, arg) {
        function isPayloadActionArgument(arg2) {
            return $b95c15551dfb42e4$var$isFSA(arg2);
        }
        var runMutator = function(draft) {
            if (isPayloadActionArgument(arg)) mutator(arg.payload, draft);
            else mutator(arg, draft);
        };
        if ($02510cd65f6cac4f$export$541ac630993a4c84(state)) {
            runMutator(state);
            return state;
        } else return $02510cd65f6cac4f$export$2e2bcd8739ae039(state, runMutator);
    };
}
// src/entities/utils.ts
function $b95c15551dfb42e4$var$selectIdValue(entity, selectId) {
    var key = selectId(entity);
    return key;
}
function $b95c15551dfb42e4$var$ensureEntitiesArray(entities) {
    if (!Array.isArray(entities)) entities = Object.values(entities);
    return entities;
}
function $b95c15551dfb42e4$var$splitAddedUpdatedEntities(newEntities, selectId, state) {
    newEntities = $b95c15551dfb42e4$var$ensureEntitiesArray(newEntities);
    var added = [];
    var updated = [];
    for(var _i = 0, newEntities_1 = newEntities; _i < newEntities_1.length; _i++){
        var entity = newEntities_1[_i];
        var id = $b95c15551dfb42e4$var$selectIdValue(entity, selectId);
        if (id in state.entities) updated.push({
            id: id,
            changes: entity
        });
        else added.push(entity);
    }
    return [
        added,
        updated
    ];
}
// src/entities/unsorted_state_adapter.ts
function $b95c15551dfb42e4$var$createUnsortedStateAdapter(selectId) {
    function addOneMutably(entity, state) {
        var key = $b95c15551dfb42e4$var$selectIdValue(entity, selectId);
        if (key in state.entities) return;
        state.ids.push(key);
        state.entities[key] = entity;
    }
    function addManyMutably(newEntities, state) {
        newEntities = $b95c15551dfb42e4$var$ensureEntitiesArray(newEntities);
        for(var _i = 0, newEntities_2 = newEntities; _i < newEntities_2.length; _i++){
            var entity = newEntities_2[_i];
            addOneMutably(entity, state);
        }
    }
    function setOneMutably(entity, state) {
        var key = $b95c15551dfb42e4$var$selectIdValue(entity, selectId);
        if (!(key in state.entities)) state.ids.push(key);
        state.entities[key] = entity;
    }
    function setManyMutably(newEntities, state) {
        newEntities = $b95c15551dfb42e4$var$ensureEntitiesArray(newEntities);
        for(var _i = 0, newEntities_3 = newEntities; _i < newEntities_3.length; _i++){
            var entity = newEntities_3[_i];
            setOneMutably(entity, state);
        }
    }
    function setAllMutably(newEntities, state) {
        newEntities = $b95c15551dfb42e4$var$ensureEntitiesArray(newEntities);
        state.ids = [];
        state.entities = {
        };
        addManyMutably(newEntities, state);
    }
    function removeOneMutably(key, state) {
        return removeManyMutably([
            key
        ], state);
    }
    function removeManyMutably(keys, state) {
        var didMutate = false;
        keys.forEach(function(key) {
            if (key in state.entities) {
                delete state.entities[key];
                didMutate = true;
            }
        });
        if (didMutate) state.ids = state.ids.filter(function(id) {
            return id in state.entities;
        });
    }
    function removeAllMutably(state) {
        Object.assign(state, {
            ids: [],
            entities: {
            }
        });
    }
    function takeNewKey(keys, update, state) {
        var original2 = state.entities[update.id];
        var updated = Object.assign({
        }, original2, update.changes);
        var newKey = $b95c15551dfb42e4$var$selectIdValue(updated, selectId);
        var hasNewKey = newKey !== update.id;
        if (hasNewKey) {
            keys[update.id] = newKey;
            delete state.entities[update.id];
        }
        state.entities[newKey] = updated;
        return hasNewKey;
    }
    function updateOneMutably(update, state) {
        return updateManyMutably([
            update
        ], state);
    }
    function updateManyMutably(updates, state) {
        var newKeys = {
        };
        var updatesPerEntity = {
        };
        updates.forEach(function(update) {
            if (update.id in state.entities) updatesPerEntity[update.id] = {
                id: update.id,
                changes: $b95c15551dfb42e4$var$__spreadValues($b95c15551dfb42e4$var$__spreadValues({
                }, updatesPerEntity[update.id] ? updatesPerEntity[update.id].changes : null), update.changes)
            };
        });
        updates = Object.values(updatesPerEntity);
        var didMutateEntities = updates.length > 0;
        if (didMutateEntities) {
            var didMutateIds = updates.filter(function(update) {
                return takeNewKey(newKeys, update, state);
            }).length > 0;
            if (didMutateIds) state.ids = state.ids.map(function(id) {
                return newKeys[id] || id;
            });
        }
    }
    function upsertOneMutably(entity, state) {
        return upsertManyMutably([
            entity
        ], state);
    }
    function upsertManyMutably(newEntities, state) {
        var _b = $b95c15551dfb42e4$var$splitAddedUpdatedEntities(newEntities, selectId, state), added = _b[0], updated = _b[1];
        updateManyMutably(updated, state);
        addManyMutably(added, state);
    }
    return {
        removeAll: $b95c15551dfb42e4$var$createSingleArgumentStateOperator(removeAllMutably),
        addOne: $b95c15551dfb42e4$var$createStateOperator(addOneMutably),
        addMany: $b95c15551dfb42e4$var$createStateOperator(addManyMutably),
        setOne: $b95c15551dfb42e4$var$createStateOperator(setOneMutably),
        setMany: $b95c15551dfb42e4$var$createStateOperator(setManyMutably),
        setAll: $b95c15551dfb42e4$var$createStateOperator(setAllMutably),
        updateOne: $b95c15551dfb42e4$var$createStateOperator(updateOneMutably),
        updateMany: $b95c15551dfb42e4$var$createStateOperator(updateManyMutably),
        upsertOne: $b95c15551dfb42e4$var$createStateOperator(upsertOneMutably),
        upsertMany: $b95c15551dfb42e4$var$createStateOperator(upsertManyMutably),
        removeOne: $b95c15551dfb42e4$var$createStateOperator(removeOneMutably),
        removeMany: $b95c15551dfb42e4$var$createStateOperator(removeManyMutably)
    };
}
// src/entities/sorted_state_adapter.ts
function $b95c15551dfb42e4$var$createSortedStateAdapter(selectId, sort) {
    var _b3 = $b95c15551dfb42e4$var$createUnsortedStateAdapter(selectId), removeOne = _b3.removeOne, removeMany = _b3.removeMany, removeAll = _b3.removeAll;
    function addOneMutably(entity, state) {
        return addManyMutably([
            entity
        ], state);
    }
    function addManyMutably(newEntities, state) {
        newEntities = $b95c15551dfb42e4$var$ensureEntitiesArray(newEntities);
        var models = newEntities.filter(function(model) {
            return !($b95c15551dfb42e4$var$selectIdValue(model, selectId) in state.entities);
        });
        if (models.length !== 0) merge(models, state);
    }
    function setOneMutably(entity, state) {
        return setManyMutably([
            entity
        ], state);
    }
    function setManyMutably(newEntities, state) {
        newEntities = $b95c15551dfb42e4$var$ensureEntitiesArray(newEntities);
        if (newEntities.length !== 0) merge(newEntities, state);
    }
    function setAllMutably(newEntities, state) {
        newEntities = $b95c15551dfb42e4$var$ensureEntitiesArray(newEntities);
        state.entities = {
        };
        state.ids = [];
        addManyMutably(newEntities, state);
    }
    function updateOneMutably(update, state) {
        return updateManyMutably([
            update
        ], state);
    }
    function takeUpdatedModel(models, update, state) {
        if (!(update.id in state.entities)) return false;
        var original2 = state.entities[update.id];
        var updated = Object.assign({
        }, original2, update.changes);
        var newKey = $b95c15551dfb42e4$var$selectIdValue(updated, selectId);
        delete state.entities[update.id];
        models.push(updated);
        return newKey !== update.id;
    }
    function updateManyMutably(updates, state) {
        var models = [];
        updates.forEach(function(update) {
            return takeUpdatedModel(models, update, state);
        });
        if (models.length !== 0) merge(models, state);
    }
    function upsertOneMutably(entity, state) {
        return upsertManyMutably([
            entity
        ], state);
    }
    function upsertManyMutably(newEntities, state) {
        var _b = $b95c15551dfb42e4$var$splitAddedUpdatedEntities(newEntities, selectId, state), added = _b[0], updated = _b[1];
        updateManyMutably(updated, state);
        addManyMutably(added, state);
    }
    function areArraysEqual(a, b) {
        if (a.length !== b.length) return false;
        for(var i = 0; i < a.length && i < b.length; i++){
            if (a[i] === b[i]) continue;
            return false;
        }
        return true;
    }
    function merge(models, state) {
        models.forEach(function(model) {
            state.entities[selectId(model)] = model;
        });
        var allEntities = Object.values(state.entities);
        allEntities.sort(sort);
        var newSortedIds = allEntities.map(selectId);
        var ids = state.ids;
        if (!areArraysEqual(ids, newSortedIds)) state.ids = newSortedIds;
    }
    return {
        removeOne: removeOne,
        removeMany: removeMany,
        removeAll: removeAll,
        addOne: $b95c15551dfb42e4$var$createStateOperator(addOneMutably),
        updateOne: $b95c15551dfb42e4$var$createStateOperator(updateOneMutably),
        upsertOne: $b95c15551dfb42e4$var$createStateOperator(upsertOneMutably),
        setOne: $b95c15551dfb42e4$var$createStateOperator(setOneMutably),
        setMany: $b95c15551dfb42e4$var$createStateOperator(setManyMutably),
        setAll: $b95c15551dfb42e4$var$createStateOperator(setAllMutably),
        addMany: $b95c15551dfb42e4$var$createStateOperator(addManyMutably),
        updateMany: $b95c15551dfb42e4$var$createStateOperator(updateManyMutably),
        upsertMany: $b95c15551dfb42e4$var$createStateOperator(upsertManyMutably)
    };
}
// src/entities/create_adapter.ts
function $b95c15551dfb42e4$export$abcf4037b41e0df(options) {
    if (options === void 0) options = {
    };
    var _b = $b95c15551dfb42e4$var$__spreadValues({
        sortComparer: false,
        selectId: function(instance) {
            return instance.id;
        }
    }, options), selectId = _b.selectId, sortComparer = _b.sortComparer;
    var stateFactory = $b95c15551dfb42e4$var$createInitialStateFactory();
    var selectorsFactory = $b95c15551dfb42e4$var$createSelectorsFactory();
    var stateAdapter = sortComparer ? $b95c15551dfb42e4$var$createSortedStateAdapter(selectId, sortComparer) : $b95c15551dfb42e4$var$createUnsortedStateAdapter(selectId);
    return $b95c15551dfb42e4$var$__spreadValues($b95c15551dfb42e4$var$__spreadValues($b95c15551dfb42e4$var$__spreadValues({
        selectId: selectId,
        sortComparer: sortComparer
    }, stateFactory), selectorsFactory), stateAdapter);
}
// src/nanoid.ts
var $b95c15551dfb42e4$var$urlAlphabet = "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW";
var $b95c15551dfb42e4$export$ac4959f4f1338dfc = function(size) {
    if (size === void 0) size = 21;
    var id = "";
    var i = size;
    while(i--)id += $b95c15551dfb42e4$var$urlAlphabet[Math.random() * 64 | 0];
    return id;
};
// src/createAsyncThunk.ts
var $b95c15551dfb42e4$var$commonProperties = [
    "name",
    "message",
    "stack",
    "code"
];
var $b95c15551dfb42e4$var$RejectWithValue = function() {
    function RejectWithValue(payload, meta) {
        this.payload = payload;
        this.meta = meta;
    }
    return RejectWithValue;
}();
var $b95c15551dfb42e4$var$FulfillWithMeta = function() {
    function FulfillWithMeta(payload, meta) {
        this.payload = payload;
        this.meta = meta;
    }
    return FulfillWithMeta;
}();
var $b95c15551dfb42e4$export$c97c53d0b2d5d81e = function(value) {
    if (typeof value === "object" && value !== null) {
        var simpleError = {
        };
        for(var _i = 0, commonProperties_1 = $b95c15551dfb42e4$var$commonProperties; _i < commonProperties_1.length; _i++){
            var property = commonProperties_1[_i];
            if (typeof value[property] === "string") simpleError[property] = value[property];
        }
        return simpleError;
    }
    return {
        message: String(value)
    };
};
function $b95c15551dfb42e4$export$6abd22dc03e5063f(typePrefix, payloadCreator, options) {
    var fulfilled = $b95c15551dfb42e4$export$309c7a02b0b0bc62(typePrefix + "/fulfilled", function(payload, requestId, arg, meta) {
        return {
            payload: payload,
            meta: $b95c15551dfb42e4$var$__spreadProps($b95c15551dfb42e4$var$__spreadValues({
            }, meta || {
            }), {
                arg: arg,
                requestId: requestId,
                requestStatus: "fulfilled"
            })
        };
    });
    var pending = $b95c15551dfb42e4$export$309c7a02b0b0bc62(typePrefix + "/pending", function(requestId, arg, meta) {
        return {
            payload: void 0,
            meta: $b95c15551dfb42e4$var$__spreadProps($b95c15551dfb42e4$var$__spreadValues({
            }, meta || {
            }), {
                arg: arg,
                requestId: requestId,
                requestStatus: "pending"
            })
        };
    });
    var rejected = $b95c15551dfb42e4$export$309c7a02b0b0bc62(typePrefix + "/rejected", function(error, requestId, arg, payload, meta) {
        return {
            payload: payload,
            error: (options && options.serializeError || $b95c15551dfb42e4$export$c97c53d0b2d5d81e)(error || "Rejected"),
            meta: $b95c15551dfb42e4$var$__spreadProps($b95c15551dfb42e4$var$__spreadValues({
            }, meta || {
            }), {
                arg: arg,
                requestId: requestId,
                rejectedWithValue: !!payload,
                requestStatus: "rejected",
                aborted: (error == null ? void 0 : error.name) === "AbortError",
                condition: (error == null ? void 0 : error.name) === "ConditionError"
            })
        };
    });
    var displayedWarning = false;
    var AC = typeof AbortController !== "undefined" ? AbortController : function() {
        function class_1() {
            this.signal = {
                aborted: false,
                addEventListener: function() {
                },
                dispatchEvent: function() {
                    return false;
                },
                onabort: function() {
                },
                removeEventListener: function() {
                }
            };
        }
        class_1.prototype.abort = function() {
        };
        return class_1;
    }();
    function actionCreator(arg) {
        return function(dispatch, getState, extra) {
            var _a;
            var requestId = ((_a = options == null ? void 0 : options.idGenerator) != null ? _a : $b95c15551dfb42e4$export$ac4959f4f1338dfc)();
            var abortController = new AC();
            var abortReason;
            var abortedPromise = new Promise(function(_, reject) {
                return abortController.signal.addEventListener("abort", function() {
                    return reject({
                        name: "AbortError",
                        message: abortReason || "Aborted"
                    });
                });
            });
            var started = false;
            function abort(reason) {
                if (started) {
                    abortReason = reason;
                    abortController.abort();
                }
            }
            var promise = function() {
                return $b95c15551dfb42e4$var$__async(this, null, function() {
                    var _a2, finalAction, err_1, skipDispatch;
                    return $b95c15551dfb42e4$var$__generator(this, function(_b) {
                        switch(_b.label){
                            case 0:
                                _b.trys.push([
                                    0,
                                    2,
                                    ,
                                    3
                                ]);
                                if (options && options.condition && options.condition(arg, {
                                    getState: getState,
                                    extra: extra
                                }) === false) throw {
                                    name: "ConditionError",
                                    message: "Aborted due to condition callback returning false."
                                };
                                started = true;
                                dispatch(pending(requestId, arg, (_a2 = options == null ? void 0 : options.getPendingMeta) == null ? void 0 : _a2.call(options, {
                                    requestId: requestId,
                                    arg: arg
                                }, {
                                    getState: getState,
                                    extra: extra
                                })));
                                return [
                                    4 /*yield*/ ,
                                    Promise.race([
                                        abortedPromise,
                                        Promise.resolve(payloadCreator(arg, {
                                            dispatch: dispatch,
                                            getState: getState,
                                            extra: extra,
                                            requestId: requestId,
                                            signal: abortController.signal,
                                            rejectWithValue: function(value, meta) {
                                                return new $b95c15551dfb42e4$var$RejectWithValue(value, meta);
                                            },
                                            fulfillWithValue: function(value, meta) {
                                                return new $b95c15551dfb42e4$var$FulfillWithMeta(value, meta);
                                            }
                                        })).then(function(result) {
                                            if (result instanceof $b95c15551dfb42e4$var$RejectWithValue) throw result;
                                            if (result instanceof $b95c15551dfb42e4$var$FulfillWithMeta) return fulfilled(result.payload, requestId, arg, result.meta);
                                            return fulfilled(result, requestId, arg);
                                        })
                                    ])
                                ];
                            case 1:
                                finalAction = _b.sent();
                                return [
                                    3 /*break*/ ,
                                    3
                                ];
                            case 2:
                                err_1 = _b.sent();
                                finalAction = err_1 instanceof $b95c15551dfb42e4$var$RejectWithValue ? rejected(null, requestId, arg, err_1.payload, err_1.meta) : rejected(err_1, requestId, arg);
                                return [
                                    3 /*break*/ ,
                                    3
                                ];
                            case 3:
                                skipDispatch = options && !options.dispatchConditionRejection && rejected.match(finalAction) && finalAction.meta.condition;
                                if (!skipDispatch) dispatch(finalAction);
                                return [
                                    2 /*return*/ ,
                                    finalAction
                                ];
                        }
                    });
                });
            }();
            return Object.assign(promise, {
                abort: abort,
                requestId: requestId,
                arg: arg,
                unwrap: function() {
                    return promise.then($b95c15551dfb42e4$export$5b28227b4c5dc983);
                }
            });
        };
    }
    return Object.assign(actionCreator, {
        pending: pending,
        rejected: rejected,
        fulfilled: fulfilled,
        typePrefix: typePrefix
    });
}
function $b95c15551dfb42e4$export$5b28227b4c5dc983(action) {
    if (action.meta && action.meta.rejectedWithValue) throw action.payload;
    if (action.error) throw action.error;
    return action.payload;
}
// src/tsHelpers.ts
var $b95c15551dfb42e4$var$hasMatchFunction = function(v) {
    return v && typeof v.match === "function";
};
// src/matchers.ts
var $b95c15551dfb42e4$var$matches = function(matcher, action) {
    if ($b95c15551dfb42e4$var$hasMatchFunction(matcher)) return matcher.match(action);
    else return matcher(action);
};
function $b95c15551dfb42e4$export$2c3435c7647f7b0d() {
    var matchers = [];
    for(var _i = 0; _i < arguments.length; _i++)matchers[_i] = arguments[_i];
    return function(action) {
        return matchers.some(function(matcher) {
            return $b95c15551dfb42e4$var$matches(matcher, action);
        });
    };
}
function $b95c15551dfb42e4$export$9dd1fb32974da385() {
    var matchers = [];
    for(var _i = 0; _i < arguments.length; _i++)matchers[_i] = arguments[_i];
    return function(action) {
        return matchers.every(function(matcher) {
            return $b95c15551dfb42e4$var$matches(matcher, action);
        });
    };
}
function $b95c15551dfb42e4$var$hasExpectedRequestMetadata(action, validStatus) {
    if (!action || !action.meta) return false;
    var hasValidRequestId = typeof action.meta.requestId === "string";
    var hasValidRequestStatus = validStatus.indexOf(action.meta.requestStatus) > -1;
    return hasValidRequestId && hasValidRequestStatus;
}
function $b95c15551dfb42e4$var$isAsyncThunkArray(a) {
    return typeof a[0] === "function" && "pending" in a[0] && "fulfilled" in a[0] && "rejected" in a[0];
}
function $b95c15551dfb42e4$export$872dec21e9a69476() {
    var asyncThunks = [];
    for(var _i = 0; _i < arguments.length; _i++)asyncThunks[_i] = arguments[_i];
    if (asyncThunks.length === 0) return function(action) {
        return $b95c15551dfb42e4$var$hasExpectedRequestMetadata(action, [
            "pending"
        ]);
    };
    if (!$b95c15551dfb42e4$var$isAsyncThunkArray(asyncThunks)) return $b95c15551dfb42e4$export$872dec21e9a69476()(asyncThunks[0]);
    return function(action) {
        var matchers = asyncThunks.map(function(asyncThunk) {
            return asyncThunk.pending;
        });
        var combinedMatcher = $b95c15551dfb42e4$export$2c3435c7647f7b0d.apply(void 0, matchers);
        return combinedMatcher(action);
    };
}
function $b95c15551dfb42e4$export$a5c5d27e3994c5be() {
    var asyncThunks = [];
    for(var _i = 0; _i < arguments.length; _i++)asyncThunks[_i] = arguments[_i];
    if (asyncThunks.length === 0) return function(action) {
        return $b95c15551dfb42e4$var$hasExpectedRequestMetadata(action, [
            "rejected"
        ]);
    };
    if (!$b95c15551dfb42e4$var$isAsyncThunkArray(asyncThunks)) return $b95c15551dfb42e4$export$a5c5d27e3994c5be()(asyncThunks[0]);
    return function(action) {
        var matchers = asyncThunks.map(function(asyncThunk) {
            return asyncThunk.rejected;
        });
        var combinedMatcher = $b95c15551dfb42e4$export$2c3435c7647f7b0d.apply(void 0, matchers);
        return combinedMatcher(action);
    };
}
function $b95c15551dfb42e4$export$fcc3388fb56de601() {
    var asyncThunks = [];
    for(var _i = 0; _i < arguments.length; _i++)asyncThunks[_i] = arguments[_i];
    var hasFlag = function(action) {
        return action && action.meta && action.meta.rejectedWithValue;
    };
    if (asyncThunks.length === 0) return function(action) {
        var combinedMatcher = $b95c15551dfb42e4$export$9dd1fb32974da385($b95c15551dfb42e4$export$a5c5d27e3994c5be.apply(void 0, asyncThunks), hasFlag);
        return combinedMatcher(action);
    };
    if (!$b95c15551dfb42e4$var$isAsyncThunkArray(asyncThunks)) return $b95c15551dfb42e4$export$fcc3388fb56de601()(asyncThunks[0]);
    return function(action) {
        var combinedMatcher = $b95c15551dfb42e4$export$9dd1fb32974da385($b95c15551dfb42e4$export$a5c5d27e3994c5be.apply(void 0, asyncThunks), hasFlag);
        return combinedMatcher(action);
    };
}
function $b95c15551dfb42e4$export$1da80a6ef1307441() {
    var asyncThunks = [];
    for(var _i = 0; _i < arguments.length; _i++)asyncThunks[_i] = arguments[_i];
    if (asyncThunks.length === 0) return function(action) {
        return $b95c15551dfb42e4$var$hasExpectedRequestMetadata(action, [
            "fulfilled"
        ]);
    };
    if (!$b95c15551dfb42e4$var$isAsyncThunkArray(asyncThunks)) return $b95c15551dfb42e4$export$1da80a6ef1307441()(asyncThunks[0]);
    return function(action) {
        var matchers = asyncThunks.map(function(asyncThunk) {
            return asyncThunk.fulfilled;
        });
        var combinedMatcher = $b95c15551dfb42e4$export$2c3435c7647f7b0d.apply(void 0, matchers);
        return combinedMatcher(action);
    };
}
function $b95c15551dfb42e4$export$6aa4142d99c1abce() {
    var asyncThunks = [];
    for(var _i2 = 0; _i2 < arguments.length; _i2++)asyncThunks[_i2] = arguments[_i2];
    if (asyncThunks.length === 0) return function(action) {
        return $b95c15551dfb42e4$var$hasExpectedRequestMetadata(action, [
            "pending",
            "fulfilled",
            "rejected"
        ]);
    };
    if (!$b95c15551dfb42e4$var$isAsyncThunkArray(asyncThunks)) return $b95c15551dfb42e4$export$6aa4142d99c1abce()(asyncThunks[0]);
    return function(action) {
        var matchers = [];
        for(var _i = 0, asyncThunks_1 = asyncThunks; _i < asyncThunks_1.length; _i++){
            var asyncThunk = asyncThunks_1[_i];
            matchers.push(asyncThunk.pending, asyncThunk.rejected, asyncThunk.fulfilled);
        }
        var combinedMatcher = $b95c15551dfb42e4$export$2c3435c7647f7b0d.apply(void 0, matchers);
        return combinedMatcher(action);
    };
}
// src/index.ts
$02510cd65f6cac4f$export$56771cf63ee491f5();


var $48d3a5e6e248d77f$exports = {};

$48d3a5e6e248d77f$exports = new URL((parcelRequire("aKzDW")).resolve("fJkW7"), import.meta.url).toString();


var $a7ee5aa4303df317$export$2e2bcd8739ae039 = JSON.stringify({
    defaultData: (/*@__PURE__*/$parcel$interopDefault($48d3a5e6e248d77f$exports)),
    xAxis: "none",
    yAxis: "none",
    tracks: [
        {
            tooltips: 0.01,
            mark: "point",
            layout: "linear",
            x: {
                attribute: "x",
                type: "quantitative",
                domain: [
                    -10,
                    10
                ],
                scale: "linear"
            },
            y: {
                attribute: "y",
                type: "quantitative",
                domain: [
                    -10,
                    10
                ],
                scale: "linear"
            },
            color: {
                attribute: "sample",
                type: "categorical",
                cardinality: 32,
                colorScheme: "interpolateRainbow"
            },
            opacity: {
                value: 1
            }
        }, 
    ]
}, null, 2);


const $8204634c8797ef28$var$controlsSlice = $b95c15551dfb42e4$exports.createSlice({
    name: "webglControls",
    initialState: {
        tool: "pan",
        specification: $a7ee5aa4303df317$export$2e2bcd8739ae039,
        lockedX: false,
        lockedY: false
    },
    reducers: {
        setSpecification (state, action) {
            state.specification = action.payload;
        },
        setTool (state, action) {
            state.tool = action.payload;
        },
        setScroll (state, action) {
            if (action.payload.axis === "x") state.lockedX = action.payload.checked;
            else if (action.payload.axis === "y") state.lockedY = action.payload.checked;
        }
    }
});
const { setSpecification: $8204634c8797ef28$export$5596f5fed439d2e9 , setTool: $8204634c8797ef28$export$6264a106199ec2f9 , setScroll: $8204634c8797ef28$export$6bbf62f168c1dddc  } = $8204634c8797ef28$var$controlsSlice.actions;
var $8204634c8797ef28$export$2e2bcd8739ae039 = $8204634c8797ef28$var$controlsSlice.reducer;


var $77c3ecbbeda6ed16$exports = {};

$77c3ecbbeda6ed16$exports = new URL((parcelRequire("aKzDW")).resolve("Rluhf"), import.meta.url).toString();


var $5e7561410bb694fa$export$2e2bcd8739ae039 = JSON.stringify({
    defaultData: (/*@__PURE__*/$parcel$interopDefault($77c3ecbbeda6ed16$exports)),
    xAxis: "bottom",
    yAxis: "left",
    tracks: [
        {
            tooltips: 1,
            mark: "area",
            layout: "linear",
            x: {
                attribute: "day",
                type: "quantitative",
                domain: [
                    1,
                    10
                ]
            },
            y: {
                attribute: "price",
                type: "quantitative",
                domain: [
                    0,
                    40
                ],
                scale: "linear"
            },
            color: {
                value: "red"
            },
            shape: {
                value: "circle"
            }
        }, 
    ]
}, null, 2);



var $ea027b6a21e56809$exports = {};

$ea027b6a21e56809$exports = new URL((parcelRequire("aKzDW")).resolve("bI3lL"), import.meta.url).toString();


var $0f23b077633a8512$export$2e2bcd8739ae039 = JSON.stringify({
    tracks: [
        {
            data: (/*@__PURE__*/$parcel$interopDefault($77c3ecbbeda6ed16$exports)),
            tooltips: 1,
            mark: "line",
            layout: "linear",
            x: {
                attribute: "day",
                type: "quantitative",
                domain: [
                    1,
                    10
                ]
            },
            y: {
                attribute: "price",
                type: "quantitative",
                domain: [
                    0,
                    40
                ],
                scale: "linear"
            },
            color: {
                value: "red"
            },
            shape: {
                value: "circle"
            }
        },
        {
            data: (/*@__PURE__*/$parcel$interopDefault($ea027b6a21e56809$exports)),
            tooltips: 1,
            mark: "line",
            layout: "linear",
            x: {
                attribute: "day",
                type: "quantitative",
                domain: [
                    1,
                    10
                ]
            },
            y: {
                attribute: "price",
                type: "quantitative",
                domain: [
                    0,
                    40
                ],
                scale: "linear"
            },
            color: {
                value: "green"
            },
            shape: {
                value: "diamond"
            }
        }, 
    ]
}, null, 2);



var $74810949fb097128$export$2e2bcd8739ae039 = JSON.stringify({
    defaultData: (/*@__PURE__*/$parcel$interopDefault($77c3ecbbeda6ed16$exports)),
    tracks: [
        {
            tooltips: 1,
            mark: "line",
            layout: "linear",
            x: {
                attribute: "day",
                type: "quantitative",
                domain: [
                    1,
                    10
                ]
            },
            y: {
                attribute: "price",
                type: "quantitative",
                domain: [
                    0,
                    40
                ],
                scale: "linear"
            },
            color: {
                value: "red"
            },
            shape: {
                value: "circle"
            }
        }, 
    ]
}, null, 2);




var $ec912ab5c38fe357$export$2e2bcd8739ae039 = JSON.stringify({
    xAxis: "zero",
    yAxis: "left",
    tracks: [
        {
            order: 1,
            data: (/*@__PURE__*/$parcel$interopDefault($77c3ecbbeda6ed16$exports)),
            tooltips: 1,
            mark: "area",
            layout: "linear",
            x: {
                attribute: "day",
                type: "quantitative",
                domain: [
                    1,
                    10
                ]
            },
            y: {
                attribute: "price",
                type: "quantitative",
                domain: [
                    0,
                    40
                ],
                scale: "linear"
            },
            color: {
                value: "red"
            },
            shape: {
                value: "circle"
            }
        },
        {
            order: 2,
            data: (/*@__PURE__*/$parcel$interopDefault($ea027b6a21e56809$exports)),
            tooltips: 1,
            mark: "area",
            layout: "linear",
            x: {
                attribute: "day",
                type: "quantitative",
                domain: [
                    1,
                    10
                ]
            },
            y: {
                attribute: "price",
                type: "quantitative",
                domain: [
                    0,
                    40
                ],
                scale: "linear"
            },
            color: {
                value: "green"
            },
            shape: {
                value: "diamond"
            }
        }, 
    ]
}, null, 2);


var $0a5b6d87982b1e9e$exports = {};

$0a5b6d87982b1e9e$exports = new URL((parcelRequire("aKzDW")).resolve("64aWn"), import.meta.url).toString();


var $5106656cb012397c$export$2e2bcd8739ae039 = JSON.stringify({
    defaultData: (/*@__PURE__*/$parcel$interopDefault($0a5b6d87982b1e9e$exports)),
    xAxis: "top",
    yAxis: "left",
    tracks: [
        {
            tooltips: 1,
            mark: "tick",
            layout: "linear",
            x: {
                attribute: "time",
                type: "quantitative",
                domain: [
                    0,
                    10
                ]
            },
            y: {
                attribute: "sample",
                type: "categorical",
                cardinality: 3
            },
            color: {
                attribute: "strength",
                type: "quantitative",
                domain: [
                    0,
                    1
                ],
                colorScheme: "interpolateCool"
            },
            height: {
                value: 10
            }
        }, 
    ]
}, null, 2);


var $f03ddd25736a11dd$exports = {};

$f03ddd25736a11dd$exports = new URL((parcelRequire("aKzDW")).resolve("9Wqb0"), import.meta.url).toString();


var $e90d21a94beb32d9$export$2e2bcd8739ae039 = JSON.stringify({
    xAxis: "none",
    yAxis: "none",
    defaultData: (/*@__PURE__*/$parcel$interopDefault($f03ddd25736a11dd$exports)),
    tracks: [
        {
            tooltips: 0.01,
            mark: "point",
            layout: "linear",
            x: {
                attribute: "x",
                type: "quantitative",
                domain: [
                    -10,
                    10
                ],
                scale: "linear"
            },
            y: {
                attribute: "y",
                type: "quantitative",
                domain: [
                    -10,
                    10
                ],
                scale: "linear"
            },
            color: {
                attribute: "sample",
                type: "categorical",
                cardinality: 32,
                colorScheme: "interpolateRainbow"
            },
            opacity: {
                value: 0.7
            }
        }, 
    ]
}, null, 2);



var $ada5884ca21863c8$exports = {};

$ada5884ca21863c8$exports = new URL((parcelRequire("aKzDW")).resolve("kZowV"), import.meta.url).toString();


var $bfd656e9f12541b7$export$2e2bcd8739ae039 = JSON.stringify({
    defaultData: (/*@__PURE__*/$parcel$interopDefault($ada5884ca21863c8$exports)),
    xAxis: "none",
    yAxis: "none",
    tracks: [
        {
            tooltips: 0.01,
            mark: "point",
            layout: "linear",
            x: {
                attribute: "x",
                type: "quantitative",
                domain: [
                    -10,
                    10
                ],
                scale: "linear"
            },
            y: {
                attribute: "y",
                type: "quantitative",
                domain: [
                    -10,
                    10
                ],
                scale: "linear"
            },
            color: {
                attribute: "sample",
                type: "categorical",
                cardinality: 32,
                colorScheme: "interpolateRainbow"
            },
            opacity: {
                value: 0.95
            }
        }, 
    ]
}, null, 2);


var $bf89cc2991084474$export$2e2bcd8739ae039 = JSON.stringify({
    defaultData: {
        day: [
            1,
            2,
            3
        ],
        price: [
            10,
            22,
            35
        ]
    },
    tracks: [
        {
            tooltips: 1,
            mark: "line",
            layout: "linear",
            x: {
                attribute: "day",
                type: "quantitative",
                domain: [
                    1,
                    10
                ]
            },
            y: {
                attribute: "price",
                type: "quantitative",
                domain: [
                    0,
                    40
                ],
                scale: "linear"
            },
            color: {
                value: "red"
            },
            shape: {
                value: "circle"
            }
        }, 
    ]
}, null, 2);


var $1183b1b8617acc25$export$2e2bcd8739ae039 = JSON.stringify({
    xAxis: "top",
    yAxis: "right",
    tracks: [
        {
            order: 1,
            data: {
                day: [
                    1,
                    2,
                    3
                ],
                price: [
                    5,
                    15,
                    30
                ]
            },
            tooltips: 1,
            mark: "area",
            layout: "linear",
            x: {
                attribute: "day",
                type: "quantitative",
                domain: [
                    1,
                    10
                ]
            },
            y: {
                attribute: "price",
                type: "quantitative",
                domain: [
                    0,
                    40
                ],
                scale: "linear"
            },
            color: {
                value: "red"
            },
            shape: {
                value: "circle"
            }
        },
        {
            order: 2,
            data: {
                day: [
                    1,
                    2,
                    3
                ],
                price: [
                    15,
                    25,
                    40
                ]
            },
            tooltips: 1,
            mark: "area",
            layout: "linear",
            x: {
                attribute: "day",
                type: "quantitative",
                domain: [
                    1,
                    10
                ]
            },
            y: {
                attribute: "price",
                type: "quantitative",
                domain: [
                    0,
                    40
                ],
                scale: "linear"
            },
            color: {
                value: "green"
            },
            shape: {
                value: "diamond"
            }
        }, 
    ]
}, null, 2);


var $874136d3a0f599e7$export$2e2bcd8739ae039 = JSON.stringify({
    defaultData: {
        day: [
            1,
            2,
            3,
            4
        ],
        price: [
            10,
            22,
            35,
            20
        ]
    },
    tracks: [
        {
            tooltips: 1,
            mark: "point",
            layout: "linear",
            x: {
                attribute: "day",
                type: "quantitative",
                domain: [
                    0,
                    5
                ]
            },
            y: {
                attribute: "price",
                type: "quantitative",
                domain: [
                    0,
                    40
                ],
                scale: "linear"
            },
            color: {
                value: "red"
            },
            shape: {
                value: "circle"
            }
        }, 
    ]
}, null, 2);


const $2d514c24d2bbb384$var$buildGrid = (cellsPerRow)=>{
    const toReturn = {
        x: [],
        y: []
    };
    for(let i = 0; i < cellsPerRow; i++)for(let j = 0; j < cellsPerRow; j++){
        toReturn.x.push(i / cellsPerRow);
        toReturn.y.push(j / cellsPerRow);
    }
    return toReturn;
};
var $2d514c24d2bbb384$export$2e2bcd8739ae039 = JSON.stringify({
    defaultData: $2d514c24d2bbb384$var$buildGrid(5),
    tracks: [
        {
            tooltips: 1,
            mark: "point",
            x: {
                attribute: "x",
                type: "quantitative",
                domain: [
                    0,
                    1
                ]
            },
            y: {
                attribute: "y",
                type: "quantitative",
                domain: [
                    0,
                    1
                ]
            },
            size: {
                value: 5
            }
        }, 
    ]
}, null, 2);


const $1e15bb3e06803773$var$buildGrid = (cellsPerRow)=>{
    const toReturn = {
        x: [],
        y: []
    };
    for(let i = 0; i < cellsPerRow; i++)for(let j = 0; j < cellsPerRow; j++){
        toReturn.x.push(i / cellsPerRow);
        toReturn.y.push(j / cellsPerRow);
    }
    return toReturn;
};
var $1e15bb3e06803773$export$2e2bcd8739ae039 = JSON.stringify({
    margins: {
        top: "2em",
        bottom: "100px",
        left: "5%",
        right: "1em"
    },
    defaultData: $1e15bb3e06803773$var$buildGrid(5),
    tracks: [
        {
            tooltips: 1,
            mark: "point",
            x: {
                attribute: "x",
                type: "quantitative",
                domain: [
                    0,
                    1
                ]
            },
            y: {
                attribute: "y",
                type: "quantitative",
                domain: [
                    0,
                    1
                ]
            },
            size: {
                value: 5
            }
        }, 
    ]
}, null, 2);


var $e810f40382d80df2$exports = {};

$e810f40382d80df2$exports = new URL((parcelRequire("aKzDW")).resolve("jS4iq"), import.meta.url).toString();


var $6afdfbccc720ed54$export$2e2bcd8739ae039 = JSON.stringify({
    margins: {
        top: "4em",
        left: "3em",
        bottom: "0",
        right: "0"
    },
    labels: [
        {
            x: -0.5,
            y: 1.1,
            text: "SUBJECT VS SAMPLE MAP",
            fixedX: true,
            fixedY: true
        },
        {
            x: -0.8,
            y: 1.05,
            text: "a",
            fixedY: true
        },
        {
            x: -0.3,
            y: 1.05,
            text: "b",
            fixedY: true
        },
        {
            x: 0.2,
            y: 1.05,
            text: "c",
            fixedY: true
        },
        {
            x: 0.7,
            y: 1.05,
            text: "d",
            fixedY: true
        },
        {
            x: -1.1,
            y: 0.8,
            text: "a",
            fixedX: true
        },
        {
            x: -1.1,
            y: 0.3,
            text: "b",
            fixedX: true
        },
        {
            x: -1.1,
            y: -0.3,
            text: "c",
            fixedX: true
        },
        {
            x: -1.1,
            y: -0.8,
            text: "d",
            fixedX: true
        }, 
    ],
    xAxis: "none",
    yAxis: "none",
    defaultData: (/*@__PURE__*/$parcel$interopDefault($e810f40382d80df2$exports)),
    tracks: [
        {
            tooltips: 1,
            mark: "rect",
            x: {
                attribute: "sample",
                type: "categorical",
                cardinality: 4,
                scale: "linear"
            },
            y: {
                attribute: "subject",
                type: "categorical",
                cardinality: 4,
                scale: "linear"
            },
            color: {
                attribute: "strength",
                type: "quantitative",
                domain: [
                    0,
                    1
                ],
                colorScheme: "interpolateReds"
            },
            width: {
                value: 50
            },
            height: {
                value: 50
            }
        }, 
    ]
}, null, 2);


var $e09bd0d1e9c4e937$export$2e2bcd8739ae039 = JSON.stringify({
    defaultData: {
        x: [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8
        ],
        y: [
            10,
            -10,
            5,
            15,
            -15,
            -1,
            1,
            15
        ],
        type: [
            "a",
            "b",
            "c",
            "b",
            "a",
            "c",
            "b",
            "c"
        ]
    },
    xAxis: "zero",
    yAxis: "right",
    tracks: [
        {
            tooltips: 1,
            mark: "rect",
            layout: "linear",
            x: {
                attribute: "x",
                type: "quantitative",
                domain: [
                    0,
                    10
                ]
            },
            y: {
                value: 0,
                scale: "linear"
            },
            color: {
                attribute: "type",
                type: "categorical",
                cardinality: 3
            },
            width: {
                value: 10
            },
            height: {
                attribute: "y",
                type: "quantitative",
                domain: [
                    -20,
                    20
                ],
                minHeight: -100,
                maxHeight: 100
            }
        }, 
    ]
}, null, 2);


var $89d1fc62371b7f43$export$2e2bcd8739ae039 = JSON.stringify({
    defaultData: {
        x: [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8
        ],
        y: [
            10,
            -10,
            5,
            15,
            -15,
            -1,
            1,
            15
        ],
        type: [
            "a",
            "b",
            "c",
            "b",
            "a",
            "c",
            "b",
            "c"
        ]
    },
    xAxis: "bottom",
    yAxis: "zero",
    tracks: [
        {
            tooltips: 1,
            mark: "rect",
            layout: "linear",
            x: {
                value: 0
            },
            y: {
                attribute: "x",
                type: "quantitative",
                domain: [
                    0,
                    10
                ]
            },
            color: {
                attribute: "type",
                type: "categorical",
                cardinality: 3
            },
            height: {
                value: 10
            },
            width: {
                attribute: "y",
                type: "quantitative",
                domain: [
                    -20,
                    20
                ],
                minWidth: -100,
                maxWidth: 100
            }
        }, 
    ]
}, null, 2);


var $12a306c48076f487$exports = {};

$12a306c48076f487$exports = new URL((parcelRequire("aKzDW")).resolve("ck9j8"), import.meta.url).toString();


var $7bcff89700a1dec2$export$2e2bcd8739ae039 = JSON.stringify({
    xAxis: "zero",
    yAxis: "none",
    defaultData: (/*@__PURE__*/$parcel$interopDefault($12a306c48076f487$exports)),
    tracks: [
        {
            tooltips: 1,
            mark: "rect",
            x: {
                type: "genomicRange",
                chrAttribute: "region1Chrom",
                startAttribute: "region1Start",
                endAttribute: "regionEnd",
                domain: [
                    "chr2:46000",
                    "chr2:243149000"
                ],
                genome: "hg19"
            },
            y: {
                value: 0
            },
            height: {
                value: 10
            },
            color: {
                type: "quantitative",
                attribute: "value",
                domain: [
                    0,
                    60
                ],
                colorScheme: "interpolateBlues"
            },
            opacity: {
                value: 0.25
            }
        },
        {
            tooltips: 1,
            mark: "rect",
            x: {
                type: "genomicRange",
                chrAttribute: "region2Chrom",
                startAttribute: "region2Start",
                endAttribute: "region2End",
                domain: [
                    "chr2:38000",
                    "chr2:243149000"
                ],
                genome: "hg19"
            },
            y: {
                value: 0
            },
            height: {
                value: 10
            },
            color: {
                type: "quantitative",
                attribute: "value",
                domain: [
                    0,
                    60
                ],
                colorScheme: "interpolateReds"
            },
            opacity: {
                value: 0.25
            }
        },
        {
            tooltips: 1,
            mark: "arc",
            x: {
                type: "genomicRange",
                chrAttribute: "region1Chrom",
                startAttribute: "region1Start",
                endAttribute: "regionEnd",
                domain: [
                    "chr2:38000",
                    "chr2:243149000"
                ],
                genome: "hg19"
            },
            width: {
                type: "genomicRange",
                chrAttribute: "region2Chrom",
                startAttribute: "region2Start",
                endAttribute: "region2End",
                domain: [
                    "chr2:38000",
                    "chr2:243149000"
                ],
                genome: "hg19"
            },
            y: {
                value: 0.1
            },
            height: {
                value: 0
            },
            color: {
                type: "quantitative",
                attribute: "value",
                domain: [
                    0,
                    60
                ],
                colorScheme: "interpolateBuGn"
            }
        }, 
    ]
}, null, 2);


var $4a3d123b675459ac$exports = {};

$4a3d123b675459ac$exports = new URL((parcelRequire("aKzDW")).resolve("aeo5u"), import.meta.url).toString();


var $a996e0900956ac39$export$2e2bcd8739ae039 = JSON.stringify({
    margins: {
        left: "4em"
    },
    labels: [
        {
            y: 0.05,
            x: -1.3,
            text: "Box 1",
            fixedX: true
        }, 
    ],
    xAxis: "zero",
    yAxis: "none",
    defaultData: (/*@__PURE__*/$parcel$interopDefault($4a3d123b675459ac$exports)),
    tracks: [
        {
            tooltips: 1,
            mark: "rect",
            layout: "linear",
            x: {
                type: "genomicRange",
                chrAttribute: "chr",
                startAttribute: "start",
                endAttribute: "end",
                domain: [
                    "chr2:3049800",
                    "chr2:9001000"
                ],
                genome: "hg38"
            },
            y: {
                value: 0
            },
            height: {
                value: 10
            },
            color: {
                type: "quantitative",
                attribute: "score",
                domain: [
                    0,
                    8
                ],
                colorScheme: "interpolateBlues"
            }
        }, 
    ]
}, null, 2);



var $661a073153bbe32d$export$2e2bcd8739ae039 = JSON.stringify({
    defaultData: (/*@__PURE__*/$parcel$interopDefault($4a3d123b675459ac$exports)),
    tracks: [
        {
            tooltips: 1,
            mark: "line",
            layout: "linear",
            x: {
                type: "genomic",
                chrAttribute: "chr",
                geneAttribute: "start",
                domain: [
                    "chr2:3049800",
                    "chr2:9001000"
                ],
                genome: "hg38"
            },
            y: {
                type: "quantitative",
                attribute: "score",
                domain: [
                    0,
                    10
                ],
                colorScheme: "interpolateBlues"
            },
            color: {
                type: "quantitative",
                attribute: "score",
                domain: [
                    0,
                    8
                ],
                colorScheme: "interpolateBlues"
            }
        }, 
    ]
}, null, 2);



var $c17e1e958f3b6634$export$2e2bcd8739ae039 = JSON.stringify({
    xAxis: "zero",
    yAxis: "none",
    defaultData: (/*@__PURE__*/$parcel$interopDefault($12a306c48076f487$exports)),
    tracks: [
        {
            tooltips: 1,
            mark: "rect",
            x: {
                type: "genomicRange",
                chrAttribute: "region1Chrom",
                startAttribute: "region1Start",
                endAttribute: "regionEnd",
                domain: [
                    "chr2:46000",
                    "chr2:243149000"
                ],
                genome: "hg19"
            },
            y: {
                value: 100
            },
            height: {
                value: 10
            },
            color: {
                type: "quantitative",
                attribute: "value",
                domain: [
                    0,
                    60
                ],
                colorScheme: "interpolateBlues"
            },
            opacity: {
                value: 0.25
            }
        },
        {
            tooltips: 1,
            mark: "rect",
            x: {
                type: "genomicRange",
                chrAttribute: "region2Chrom",
                startAttribute: "region2Start",
                endAttribute: "region2End",
                domain: [
                    "chr2:38000",
                    "chr2:243149000"
                ],
                genome: "hg19"
            },
            y: {
                value: 100
            },
            height: {
                value: 10
            },
            color: {
                type: "quantitative",
                attribute: "value",
                domain: [
                    0,
                    60
                ],
                colorScheme: "interpolateReds"
            },
            opacity: {
                value: 0.25
            }
        },
        {
            tooltips: 1,
            mark: "arc",
            x: {
                type: "genomicRange",
                chrAttribute: "region1Chrom",
                startAttribute: "region1Start",
                endAttribute: "regionEnd",
                domain: [
                    "chr2:38000",
                    "chr2:243149000"
                ],
                genome: "hg19"
            },
            width: {
                type: "genomicRange",
                chrAttribute: "region2Chrom",
                startAttribute: "region2Start",
                endAttribute: "region2End",
                domain: [
                    "chr2:38000",
                    "chr2:243149000"
                ],
                genome: "hg19"
            },
            y: {
                value: 108
            },
            height: {
                value: 0
            },
            color: {
                type: "quantitative",
                attribute: "value",
                domain: [
                    0,
                    60
                ],
                colorScheme: "interpolateBuGn"
            }
        },
        {
            tooltips: 1,
            mark: "line",
            x: {
                type: "genomicRange",
                chrAttribute: "region2Chrom",
                startAttribute: "region2Start",
                endAttribute: "region2End",
                domain: [
                    "chr2:38000",
                    "chr2:243149000"
                ],
                genome: "hg19"
            },
            y: {
                type: "quantitative",
                attribute: "value",
                domain: [
                    0,
                    160
                ]
            },
            height: {
                value: 10
            },
            color: {
                type: "quantitative",
                attribute: "value",
                domain: [
                    0,
                    60
                ],
                colorScheme: "interpolateReds"
            },
            opacity: {
                value: 0.25
            }
        },
        {
            tooltips: 1,
            mark: "line",
            x: {
                type: "genomicRange",
                chrAttribute: "region1Chrom",
                startAttribute: "region1Start",
                endAttribute: "regionEnd",
                domain: [
                    "chr2:46000",
                    "chr2:243149000"
                ],
                genome: "hg19"
            },
            y: {
                type: "quantitative",
                attribute: "value",
                domain: [
                    0,
                    160
                ]
            },
            height: {
                value: 10
            },
            color: {
                type: "quantitative",
                attribute: "value",
                domain: [
                    0,
                    60
                ],
                colorScheme: "interpolateBlues"
            },
            opacity: {
                value: 0.25
            }
        }, 
    ]
}, null, 2);


var $5d3b9484972a39e8$exports = {};

$5d3b9484972a39e8$exports = new URL((parcelRequire("aKzDW")).resolve("ffOBN"), import.meta.url).toString();


var $d472c137635fa20c$export$2e2bcd8739ae039 = JSON.stringify({
    margins: {
        left: "10%"
    },
    xAxis: "top",
    yAxis: "left",
    defaultData: (/*@__PURE__*/$parcel$interopDefault($5d3b9484972a39e8$exports)),
    tracks: [
        {
            mark: "tick",
            x: {
                attribute: "x",
                type: "quantitative",
                domain: [
                    0,
                    32738
                ]
            },
            y: {
                attribute: "y",
                type: "quantitative",
                domain: [
                    0,
                    2700
                ]
            },
            color: {
                attribute: "value",
                type: "quantitative",
                domain: [
                    0,
                    100
                ],
                colorScheme: "interpolateReds"
            },
            opacity: {
                attribute: "value",
                type: "quantitative",
                minOpacity: 0.1,
                domain: [
                    0,
                    100
                ]
            },
            height: {
                value: 200 / 2700
            },
            size: {
                value: 200 / 2700
            }
        }, 
    ]
}, null, 2);


var $af37843e141d7d39$export$2e2bcd8739ae039 = JSON.stringify({
    defaultData: {
        x: [
            1,
            2,
            3,
            4
        ],
        y: [
            1,
            2,
            3,
            4
        ],
        width: [
            20,
            12,
            5,
            10
        ],
        height: [
            10,
            5,
            12,
            30
        ],
        size: [
            10,
            20,
            30,
            40
        ],
        color: [
            "red",
            "#00FF00",
            16581375,
            "rgb(0,0,200)"
        ]
    },
    tracks: [
        {
            mark: "rect",
            x: {
                attribute: "x",
                type: "quantitative",
                domain: [
                    0,
                    5
                ]
            },
            y: {
                attribute: "y",
                type: "quantitative",
                domain: [
                    0,
                    5
                ]
            },
            color: {
                attribute: "color",
                type: "inline"
            },
            width: {
                type: "inline",
                attribute: "width"
            },
            height: {
                type: "inline",
                attribute: "height"
            },
            opacity: {
                value: 0.4
            }
        },
        {
            mark: "point",
            x: {
                attribute: "x",
                type: "quantitative",
                domain: [
                    0,
                    5
                ]
            },
            y: {
                attribute: "y",
                type: "quantitative",
                domain: [
                    0,
                    5
                ]
            },
            color: {
                attribute: "color",
                type: "inline"
            },
            size: {
                type: "inline",
                attribute: "size"
            },
            opacity: {
                value: 0.4
            },
            shape: {
                value: "diamond"
            }
        }, 
    ]
}, null, 2);


const $58fdc11254e9346a$var$exampleMap = new Map([
    [
        "area-chart",
        $5e7561410bb694fa$export$2e2bcd8739ae039
    ],
    [
        "double-line-plot",
        $0f23b077633a8512$export$2e2bcd8739ae039
    ],
    [
        "line-plot",
        $74810949fb097128$export$2e2bcd8739ae039
    ],
    [
        "stacked-area-chart",
        $ec912ab5c38fe357$export$2e2bcd8739ae039
    ],
    [
        "tick-chart",
        $5106656cb012397c$export$2e2bcd8739ae039
    ],
    [
        "tsne",
        $e90d21a94beb32d9$export$2e2bcd8739ae039
    ],
    [
        "tsne-10th",
        $a7ee5aa4303df317$export$2e2bcd8739ae039
    ],
    [
        "tsne-100th",
        $bfd656e9f12541b7$export$2e2bcd8739ae039
    ],
    [
        "inline-data",
        $bf89cc2991084474$export$2e2bcd8739ae039
    ],
    [
        "double-inline-data",
        $1183b1b8617acc25$export$2e2bcd8739ae039
    ],
    [
        "tiny-scatter",
        $874136d3a0f599e7$export$2e2bcd8739ae039
    ],
    [
        "scatter-grid",
        $2d514c24d2bbb384$export$2e2bcd8739ae039
    ],
    [
        "heatmap",
        $6afdfbccc720ed54$export$2e2bcd8739ae039
    ],
    [
        "signed-bar-chart",
        $e09bd0d1e9c4e937$export$2e2bcd8739ae039
    ],
    [
        "vertical-signed-bar-chart",
        $89d1fc62371b7f43$export$2e2bcd8739ae039
    ],
    [
        "arc-track",
        $7bcff89700a1dec2$export$2e2bcd8739ae039
    ],
    [
        "box-track",
        $a996e0900956ac39$export$2e2bcd8739ae039
    ],
    [
        "line-track",
        $661a073153bbe32d$export$2e2bcd8739ae039
    ],
    [
        "all-tracks",
        $c17e1e958f3b6634$export$2e2bcd8739ae039
    ],
    [
        "scatter-grid-margins",
        $1e15bb3e06803773$export$2e2bcd8739ae039
    ],
    [
        "matrix",
        $d472c137635fa20c$export$2e2bcd8739ae039
    ],
    [
        "data-defined-channels",
        $af37843e141d7d39$export$2e2bcd8739ae039
    ], 
]);
class $58fdc11254e9346a$var$Toolbar {
    /**
   * Initializes the tool bar by adding event listeners
   */ init() {
        document.getElementById("lock-x").addEventListener("change", (event)=>{
            this.dispatch($8204634c8797ef28$export$6bbf62f168c1dddc({
                axis: "x",
                checked: event.target.checked
            }));
        });
        document.getElementById("lock-y").addEventListener("change", (event)=>{
            this.dispatch($8204634c8797ef28$export$6bbf62f168c1dddc({
                axis: "y",
                checked: event.target.checked
            }));
        });
        document.getElementById("specification-select").value = this.specification;
        this.dispatch($8204634c8797ef28$export$5596f5fed439d2e9($58fdc11254e9346a$var$exampleMap.get(this.specification)));
        document.getElementById("specification-select").addEventListener("change", (event)=>{
            this.specification = event.target.value;
            this.dispatch($8204634c8797ef28$export$5596f5fed439d2e9($58fdc11254e9346a$var$exampleMap.get(this.specification)));
        });
        this.prevIcon = null; // force only 1 icon to have selected class
        document.querySelectorAll(".controls img").forEach((icon)=>{
            icon.addEventListener("click", ()=>{
                // useless hack to save lines of code
                if (this.prevIcon) this.prevIcon.classList.remove("selected");
                this.mouseAction = icon.alt.substring(0, icon.alt.indexOf(" "));
                this.dispatch($8204634c8797ef28$export$6264a106199ec2f9(this.mouseAction));
                icon.classList.add("selected");
                this.prevIcon = icon;
            });
        });
    }
    /**
   * Sets the display for the current selection window in the toolbar
   *
   * @param {Array} currentXRange array of length 2 with current X range
   * @param {Array} currentYRange array of length 2 with current Y range
   */ updateSelectionWindowDisplay(currentXRange, currentYRange) {
        // This may slow down the rendering since it needs to call the DOM before animating, may need to remove for true benchmark
        document.querySelector(".selection-window").textContent = `[${currentXRange[0].toFixed(4)}, ${currentXRange[1].toFixed(4)}] x [${currentYRange[0].toFixed(4)}, ${currentYRange[1].toFixed(4)}]`;
    }
    /**
   * A class meant to handle changing options on the scatter plot
   * @param {Function} dispatch method from store to dispatch redux actions
   */ constructor(dispatch){
        this.dispatch = dispatch;
        this.mouseAction = "pan";
        this.specification = "csv10";
    }
}
var $58fdc11254e9346a$export$2e2bcd8739ae039 = $58fdc11254e9346a$var$Toolbar;


function $6d55fde0aecbceb0$export$2e2bcd8739ae039(obj, key, value) {
    if (key in obj) Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
    });
    else obj[key] = value;
    return obj;
}



(function(w, undefined) {
    /**
	 * Create a new element.
	 *
	 * @param  {String} name Element type name.
	 *
	 * @return {Element}
	 */ function newEl(name) {
        return document.createElement(name);
    }
    /**
	 * Apply theme CSS properties to element.
	 *
	 * @param  {Element} element DOM element.
	 * @param  {Object}  theme   Theme object.
	 *
	 * @return {Element}
	 */ function applyTheme(element, theme) {
        for(var name in theme)try {
            element.style[name] = theme[name];
        } catch (e) {
        }
        return element;
    }
    /**
	 * Return type of the value.
	 *
	 * @param  {Mixed} value
	 *
	 * @return {String}
	 */ function type(value) {
        if (value == null) return String(value);
        if (typeof value === 'object' || typeof value === 'function') return Object.prototype.toString.call(value).match(/\s([a-z]+)/i)[1].toLowerCase() || 'object';
        return typeof value;
    }
    /**
	 * Check whether the value is in an array.
	 *
	 * @param  {Mixed} value
	 * @param  {Array} array
	 *
	 * @return {Integer} Array index or -1 when not found.
	 */ function inArray(value, array) {
        if (type(array) !== 'array') return -1;
        if (array.indexOf) return array.indexOf(value);
        for(var i = 0, l = array.length; i < l; i++){
            if (array[i] === value) return i;
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
	 */ function extend() {
        var args = arguments;
        for(var key in args[1])if (args[1].hasOwnProperty(key)) switch(type(args[1][key])){
            case 'object':
                args[0][key] = extend({
                }, args[0][key], args[1][key]);
                break;
            case 'array':
                args[0][key] = args[1][key].slice(0);
                break;
            default:
                args[0][key] = args[1][key];
        }
        return args.length > 2 ? extend.apply(null, [
            args[0]
        ].concat(Array.prototype.slice.call(args, 2))) : args[0];
    }
    /**
	 * Convert HSL color to HEX string.
	 *
	 * @param  {Array} hsl Array with [hue, saturation, lightness].
	 *
	 * @return {Array} Array with [red, green, blue].
	 */ function hslToHex(h, s, l) {
        var r, g, b;
        var v, min, sv, sextant, fract, vsf;
        if (l <= 0.5) v = l * (1 + s);
        else v = l + s - l * s;
        if (v === 0) return '#000';
        else {
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
	 */ function componentToHex(c) {
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
	 */ function listener(element, eventName, handler, remove) {
        if (element.addEventListener) element[remove ? 'removeEventListener' : 'addEventListener'](eventName, handler, false);
        else if (element.attachEvent) element[remove ? 'detachEvent' : 'attachEvent']('on' + eventName, handler);
    }
    // Preferred timing funtion
    var getTime;
    (function() {
        var perf = w.performance;
        if (perf && (perf.now || perf.webkitNow)) {
            var perfNow = perf.now ? 'now' : 'webkitNow';
            getTime = perf[perfNow].bind(perf);
        } else getTime = function() {
            return +new Date();
        };
    })();
    // Local WindowAnimationTiming interface polyfill
    var cAF = w.cancelAnimationFrame || w.cancelRequestAnimationFrame;
    var rAF = w.requestAnimationFrame;
    (function() {
        var vendors = [
            'moz',
            'webkit',
            'o'
        ];
        var lastTime = 0;
        // For a more accurate WindowAnimationTiming interface implementation, ditch the native
        // requestAnimationFrame when cancelAnimationFrame is not present (older versions of Firefox)
        for(var i = 0, l = vendors.length; i < l && !cAF; ++i){
            cAF = w[vendors[i] + 'CancelAnimationFrame'] || w[vendors[i] + 'CancelRequestAnimationFrame'];
            rAF = cAF && w[vendors[i] + 'RequestAnimationFrame'];
        }
        if (!cAF) {
            rAF = function(callback) {
                var currTime = getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                lastTime = currTime + timeToCall;
                return w.setTimeout(function() {
                    callback(currTime + timeToCall);
                }, timeToCall);
            };
            cAF = function(id) {
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
	 */ function FPSMeter(anchor, options) {
        // Optional arguments
        if (type(anchor) === 'object' && anchor.nodeType === undefined) {
            options = anchor;
            anchor = document.body;
        }
        if (!anchor) anchor = document.body;
        // Private properties
        var self = this;
        var o = extend({
        }, FPSMeter.defaults, options || {
        });
        var el = {
        };
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
		 */ self.tickStart = function() {
            frameStart = getTime();
        };
        /**
		 * FPS tick.
		 *
		 * @return {Void}
		 */ self.tick = function() {
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
		 */ self.pause = function() {
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
		 */ self.resume = function() {
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
		 */ self.set = function(name, value) {
            o[name] = value;
            showFps = o.show === 'fps';
            // Rebuild or reposition elements when specific option has been updated
            if (inArray(name, rebuilders) !== -1) createMeter();
            if (inArray(name, repositioners) !== -1) positionMeter();
            return self;
        };
        /**
		 * Change meter into rendering duration mode.
		 *
		 * @return {Object} FPSMeter instance.
		 */ self.showDuration = function() {
            self.set('show', 'ms');
            return self;
        };
        /**
		 * Change meter into FPS mode.
		 *
		 * @return {Object} FPSMeter instance.
		 */ self.showFps = function() {
            self.set('show', 'fps');
            return self;
        };
        /**
		 * Toggles between show: 'fps' and show: 'duration'.
		 *
		 * @return {Object} FPSMeter instance.
		 */ self.toggle = function() {
            self.set('show', showFps ? 'ms' : 'fps');
            return self;
        };
        /**
		 * Hide the FPSMeter. Also pauses the rendering.
		 *
		 * @return {Object} FPSMeter instance.
		 */ self.hide = function() {
            self.pause();
            el.container.style.display = 'none';
            return self;
        };
        /**
		 * Show the FPSMeter. Also resumes the rendering.
		 *
		 * @return {Object} FPSMeter instance.
		 */ self.show = function() {
            self.resume();
            el.container.style.display = 'block';
            return self;
        };
        /**
		 * Check the current FPS and save it in history.
		 *
		 * @return {Void}
		 */ function historyTick() {
            for(i = o.history; i--;){
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
		 */ function getHeat(heatmap, value, min, max) {
            return heatmaps[0 | heatmap][Math.round(Math.min((value - min) / (max - min) * heatDepth, heatDepth))];
        }
        /**
		 * Update counter number and legend.
		 *
		 * @return {Void}
		 */ function updateCounter() {
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
		 */ function render() {
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
                if (heating.length) for(i = heating.length; i--;)heating[i].el.style[theme[heating[i].name].heatOn] = showFps ? getHeat(theme[heating[i].name].heatmap, self.fps, 0, o.maxFps) : getHeat(theme[heating[i].name].heatmap, self.duration, o.threshold, 0);
                if (el.graph && theme.column.heatOn) for(i = cols.length; i--;)cols[i].style[theme.column.heatOn] = showFps ? getHeat(theme.column.heatmap, fpsHistory[i], 0, o.maxFps) : getHeat(theme.column.heatmap, durationHistory[i], o.threshold, 0);
            }
            // Update graph columns height
            if (el.graph) for(j = 0; j < o.history; j++)cols[j].style.height = (showFps ? fpsHistory[j] ? Math.round(graphHeight / o.maxFps * Math.min(fpsHistory[j], o.maxFps)) : 0 : durationHistory[j] ? Math.round(graphHeight / o.threshold * Math.min(durationHistory[j], o.threshold)) : 0) + 'px';
        }
        /**
		 * Request rendering loop.
		 *
		 * @return {Int} Animation frame index.
		 */ function requestRender() {
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
		 */ function eventHandler(event) {
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
		 */ self.destroy = function() {
            // Stop rendering
            self.pause();
            // Remove elements
            removeMeter();
            // Stop listening
            self.tick = self.tickStart = function() {
            };
        };
        /**
		 * Remove meter element.
		 *
		 * @return {Void}
		 */ function removeMeter() {
            // Unbind listeners
            if (o.toggleOn) listener(el.container, o.toggleOn, eventHandler, 1);
            // Detach element
            anchor.removeChild(el.container);
        }
        /**
		 * Sets the theme, and generates heatmaps when needed.
		 */ function setTheme() {
            theme = FPSMeter.theme[o.theme];
            // Generate heatmaps
            heatmaps = theme.compiledHeatmaps || [];
            if (!heatmaps.length && theme.heatmaps.length) {
                for(j = 0; j < theme.heatmaps.length; j++){
                    heatmaps[j] = [];
                    for(i = 0; i <= heatDepth; i++)heatmaps[j][i] = hslToHex(0.33 / heatDepth * i, theme.heatmaps[j].saturation, theme.heatmaps[j].lightness);
                }
                theme.compiledHeatmaps = heatmaps;
            }
        }
        /**
		 * Creates and attaches the meter element.
		 *
		 * @return {Void}
		 */ function createMeter() {
            // Remove old meter if present
            if (el.container) removeMeter();
            // Set theme
            setTheme();
            // Create elements
            el.container = applyTheme(newEl('div'), theme.container);
            el.count = el.container.appendChild(applyTheme(newEl('div'), theme.count));
            el.legend = el.container.appendChild(applyTheme(newEl('div'), theme.legend));
            el.graph = o.graph ? el.container.appendChild(applyTheme(newEl('div'), theme.graph)) : 0;
            // Add elements to heating array
            heating.length = 0;
            for(var key in el)if (el[key] && theme[key].heatOn) heating.push({
                name: key,
                el: el[key]
            });
            // Graph
            cols.length = 0;
            if (el.graph) {
                // Create graph
                el.graph.style.width = o.history * theme.column.width + (o.history - 1) * theme.column.spacing + 'px';
                // Add columns
                for(i = 0; i < o.history; i++){
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
            if (el.graph) graphHeight = el.graph.clientHeight;
            // Add event listeners
            if (o.toggleOn) {
                if (o.toggleOn === 'click') el.container.style.cursor = 'pointer';
                listener(el.container, o.toggleOn, eventHandler);
            }
        }
        /**
		 * Positions the meter based on options.
		 *
		 * @return {Void}
		 */ function positionMeter() {
            applyTheme(el.container, o);
        }
        (function() {
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
        smoothing: 10,
        show: 'fps',
        toggleOn: 'click',
        decimals: 1,
        maxFps: 60,
        threshold: 100,
        // Meter position
        position: 'absolute',
        zIndex: 10,
        left: '5px',
        top: '5px',
        right: 'auto',
        bottom: 'auto',
        margin: '0 0 0 0',
        // Theme
        theme: 'dark',
        heat: 0,
        // Graph
        graph: 0,
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
})(window);
(function(w, FPSMeter, undefined) {
    // Themes object
    FPSMeter.theme = {
    };
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
    FPSMeter.theme.dark = FPSMeter.extend({
    }, base, {
        heatmaps: [
            {
                saturation: 0.8,
                lightness: 0.8
            }
        ],
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
    FPSMeter.theme.light = FPSMeter.extend({
    }, base, {
        heatmaps: [
            {
                saturation: 0.5,
                lightness: 0.5
            }
        ],
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
    FPSMeter.theme.colorful = FPSMeter.extend({
    }, base, {
        heatmaps: [
            {
                saturation: 0.5,
                lightness: 0.6
            }
        ],
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
    FPSMeter.theme.transparent = FPSMeter.extend({
    }, base, {
        heatmaps: [
            {
                saturation: 0.8,
                lightness: 0.5
            }
        ],
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



function $8759ab15297a2b56$export$2e2bcd8739ae039(x) {
    return Math.abs(x = Math.round(x)) >= 1000000000000000000000 ? x.toLocaleString("en").replace(/,/g, "") : x.toString(10);
}
function $8759ab15297a2b56$export$8f8e23dd27dc19f5(x, p) {
    if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null; // NaN, ±Infinity
    var i, coefficient = x.slice(0, i);
    // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
    // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).
    return [
        coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
        +x.slice(i + 1)
    ];
}


function $6dd8f871b985337d$export$2e2bcd8739ae039(x) {
    return x = $8759ab15297a2b56$export$8f8e23dd27dc19f5(Math.abs(x)), x ? x[1] : NaN;
}


function $f7ff9787fda96f8f$export$2e2bcd8739ae039(grouping, thousands) {
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


function $338e6057aae25f4e$export$2e2bcd8739ae039(numerals) {
    return function(value) {
        return value.replace(/[0-9]/g, function(i) {
            return numerals[+i];
        });
    };
}


// [[fill]align][sign][symbol][0][width][,][.precision][~][type]
var $babd3c0ee933dbfb$var$re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function $babd3c0ee933dbfb$export$2e2bcd8739ae039(specifier) {
    if (!(match = $babd3c0ee933dbfb$var$re.exec(specifier))) throw new Error("invalid format: " + specifier);
    var match;
    return new $babd3c0ee933dbfb$export$963aac351db36ed4({
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
$babd3c0ee933dbfb$export$2e2bcd8739ae039.prototype = $babd3c0ee933dbfb$export$963aac351db36ed4.prototype; // instanceof
function $babd3c0ee933dbfb$export$963aac351db36ed4(specifier) {
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
$babd3c0ee933dbfb$export$963aac351db36ed4.prototype.toString = function() {
    return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === undefined ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === undefined ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};


function $014a99823dff2a6c$export$2e2bcd8739ae039(s) {
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




var $dba29f01eef201fc$export$6863724d9a42263;
function $dba29f01eef201fc$export$2e2bcd8739ae039(x, p) {
    var d = $8759ab15297a2b56$export$8f8e23dd27dc19f5(x, p);
    if (!d) return x + "";
    var coefficient = d[0], exponent = d[1], i = exponent - ($dba29f01eef201fc$export$6863724d9a42263 = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1, n = coefficient.length;
    return i === n ? coefficient : i > n ? coefficient + new Array(i - n + 1).join("0") : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i) : "0." + new Array(1 - i).join("0") + $8759ab15297a2b56$export$8f8e23dd27dc19f5(x, Math.max(0, p + i - 1))[0]; // less than 1y!
}



function $96057359aae7caa5$export$2e2bcd8739ae039(x, p) {
    var d = $8759ab15297a2b56$export$8f8e23dd27dc19f5(x, p);
    if (!d) return x + "";
    var coefficient = d[0], exponent = d[1];
    return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1) : coefficient + new Array(exponent - coefficient.length + 2).join("0");
}


var $a7a5368c26bb49b2$export$2e2bcd8739ae039 = {
    "%": (x, p)=>(x * 100).toFixed(p)
    ,
    "b": (x)=>Math.round(x).toString(2)
    ,
    "c": (x)=>x + ""
    ,
    "d": $8759ab15297a2b56$export$2e2bcd8739ae039,
    "e": (x, p)=>x.toExponential(p)
    ,
    "f": (x, p)=>x.toFixed(p)
    ,
    "g": (x, p)=>x.toPrecision(p)
    ,
    "o": (x)=>Math.round(x).toString(8)
    ,
    "p": (x, p)=>$96057359aae7caa5$export$2e2bcd8739ae039(x * 100, p)
    ,
    "r": $96057359aae7caa5$export$2e2bcd8739ae039,
    "s": $dba29f01eef201fc$export$2e2bcd8739ae039,
    "X": (x)=>Math.round(x).toString(16).toUpperCase()
    ,
    "x": (x)=>Math.round(x).toString(16)
};



function $3719f021b54a9028$export$2e2bcd8739ae039(x) {
    return x;
}


var $a0c09c68c1f49473$var$map = Array.prototype.map, $a0c09c68c1f49473$var$prefixes = [
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
function $a0c09c68c1f49473$export$2e2bcd8739ae039(locale) {
    var group = locale.grouping === undefined || locale.thousands === undefined ? $3719f021b54a9028$export$2e2bcd8739ae039 : $f7ff9787fda96f8f$export$2e2bcd8739ae039($a0c09c68c1f49473$var$map.call(locale.grouping, Number), locale.thousands + ""), currencyPrefix = locale.currency === undefined ? "" : locale.currency[0] + "", currencySuffix = locale.currency === undefined ? "" : locale.currency[1] + "", decimal = locale.decimal === undefined ? "." : locale.decimal + "", numerals = locale.numerals === undefined ? $3719f021b54a9028$export$2e2bcd8739ae039 : $338e6057aae25f4e$export$2e2bcd8739ae039($a0c09c68c1f49473$var$map.call(locale.numerals, String)), percent = locale.percent === undefined ? "%" : locale.percent + "", minus = locale.minus === undefined ? "−" : locale.minus + "", nan = locale.nan === undefined ? "NaN" : locale.nan + "";
    function newFormat(specifier) {
        specifier = $babd3c0ee933dbfb$export$2e2bcd8739ae039(specifier);
        var fill = specifier.fill, align = specifier.align, sign = specifier.sign, symbol = specifier.symbol, zero = specifier.zero, width = specifier.width, comma = specifier.comma, precision = specifier.precision, trim = specifier.trim, type = specifier.type;
        // The "n" type is an alias for ",g".
        if (type === "n") comma = true, type = "g";
        else if (!$a7a5368c26bb49b2$export$2e2bcd8739ae039[type]) precision === undefined && (precision = 12), trim = true, type = "g";
        // If zero fill is specified, padding goes after sign and before digits.
        if (zero || fill === "0" && align === "=") zero = true, fill = "0", align = "=";
        // Compute the prefix and suffix.
        // For SI-prefix, the suffix is lazily computed.
        var prefix = symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "", suffix = symbol === "$" ? currencySuffix : /[%p]/.test(type) ? percent : "";
        // What format function should we use?
        // Is this an integer type?
        // Can this type generate exponential notation?
        var formatType = $a7a5368c26bb49b2$export$2e2bcd8739ae039[type], maybeSuffix = /[defgprs%]/.test(type);
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
                if (trim) value = $014a99823dff2a6c$export$2e2bcd8739ae039(value);
                // If a negative value rounds to zero after formatting, and no explicit positive sign is requested, hide the sign.
                if (valueNegative && +value === 0 && sign !== "+") valueNegative = false;
                // Compute the prefix and suffix.
                valuePrefix = (valueNegative ? sign === "(" ? sign : minus : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
                valueSuffix = (type === "s" ? $a0c09c68c1f49473$var$prefixes[8 + $dba29f01eef201fc$export$6863724d9a42263 / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : "");
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
        var f = newFormat((specifier = $babd3c0ee933dbfb$export$2e2bcd8739ae039(specifier), specifier.type = "f", specifier)), e = Math.max(-8, Math.min(8, Math.floor($6dd8f871b985337d$export$2e2bcd8739ae039(value1) / 3))) * 3, k = Math.pow(10, -e), prefix = $a0c09c68c1f49473$var$prefixes[8 + e / 3];
        return function(value) {
            return f(k * value) + prefix;
        };
    }
    return {
        format: newFormat,
        formatPrefix: formatPrefix
    };
}


var $23de77130e6fabd5$var$locale;
var $23de77130e6fabd5$export$d9468344d3651243;
var $23de77130e6fabd5$export$8d85692a469dde6f;
$23de77130e6fabd5$export$2e2bcd8739ae039({
    thousands: ",",
    grouping: [
        3
    ],
    currency: [
        "$",
        ""
    ]
});
function $23de77130e6fabd5$export$2e2bcd8739ae039(definition) {
    $23de77130e6fabd5$var$locale = $a0c09c68c1f49473$export$2e2bcd8739ae039(definition);
    $23de77130e6fabd5$export$d9468344d3651243 = $23de77130e6fabd5$var$locale.format;
    $23de77130e6fabd5$export$8d85692a469dde6f = $23de77130e6fabd5$var$locale.formatPrefix;
    return $23de77130e6fabd5$var$locale;
}


function $e542643fa01a3586$export$2e2bcd8739ae039(step) {
    return Math.max(0, -$6dd8f871b985337d$export$2e2bcd8739ae039(Math.abs(step)));
}


function $70c7673fef1d9274$export$2e2bcd8739ae039(step, value) {
    return Math.max(0, Math.max(-8, Math.min(8, Math.floor($6dd8f871b985337d$export$2e2bcd8739ae039(value) / 3))) * 3 - $6dd8f871b985337d$export$2e2bcd8739ae039(Math.abs(step)));
}


function $36636254076a5075$export$2e2bcd8739ae039(step, max) {
    step = Math.abs(step), max = Math.abs(max) - step;
    return Math.max(0, $6dd8f871b985337d$export$2e2bcd8739ae039(max) - $6dd8f871b985337d$export$2e2bcd8739ae039(step)) + 1;
}



/**
 * Create a function which maps a genome pair to a location in the entire genome
 *
 * @param {String} genomeId key from genomeSizes object
 * @returns a function which maps a (chrId, pairNum) => to
 *  a number between 1 and total number of genes in the genome
 */ const $bb7e3865eac9866d$var$createPairMapperToGenome = (genomeId)=>{
    let chrSizes = $bb7e3865eac9866d$export$980dd6874c34d524[genomeId];
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
class $bb7e3865eac9866d$export$5af770a1c066da73 {
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
        for (const [chrKey, pairCount] of $bb7e3865eac9866d$export$980dd6874c34d524[this.genomeId].entries()){
            if (cumulativeTotal + pairCount >= genomeSpot) {
                chrLoc = genomeSpot - cumulativeTotal;
                chrId = chrKey;
                break;
            }
            cumulativeTotal += pairCount;
        }
        return formatting ? `chr${chrId}:${$23de77130e6fabd5$export$d9468344d3651243(formatting)(chrLoc)}` : `chr${chrId}:${chrLoc}`;
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
            suggestedFormat = $36636254076a5075$export$2e2bcd8739ae039(10 ** magnitude, startingValue);
            for(let currValue = startingValue; currValue < endPair; currValue += 10 ** magnitude)toReturn.push(this.toClipSpaceFromParts(startChr, currValue));
        } else {
            suggestedFormat = "1";
            for (const chrId of $bb7e3865eac9866d$export$980dd6874c34d524[this.genomeId].keys())toReturn.push(this.toClipSpaceFromParts(chrId, 1));
        }
        return {
            tickCoords: toReturn,
            tickLabels: toReturn.map((coord)=>this.inverse(coord, $23de77130e6fabd5$export$d9468344d3651243(`.${suggestedFormat}s`))
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
        const chrSizes = $bb7e3865eac9866d$export$980dd6874c34d524[genomeId];
        const finalEntry = [
            ...chrSizes.entries()
        ][chrSizes.size - 1];
        return new $bb7e3865eac9866d$export$5af770a1c066da73(genomeId, [
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
        if ($bb7e3865eac9866d$export$980dd6874c34d524[genomeId] === undefined) console.error(`${genomeId} is not a recognized genome!`);
        this.genomeId = genomeId;
        this.domain = domain;
        let [startChr, startPair] = domain[0].substring(3) // Remove chr
        .split(":"); // split chromesome and pair number
        startPair = parseInt(startPair);
        let [endChr, endPair] = domain[1].substring(3).split(":");
        endPair = parseInt(endPair);
        this.mapPairToGenomeIndex = $bb7e3865eac9866d$var$createPairMapperToGenome(genomeId);
        const firstPairInDomain = this.mapPairToGenomeIndex(startChr, startPair);
        const lastPairInDomain = this.mapPairToGenomeIndex(endChr, endPair);
        this.mapGenomeIndexToClipSpace = $7f56df25e3cef9e2$export$dcdf75081b88279d([
            firstPairInDomain,
            lastPairInDomain
        ], [
            -1,
            1
        ]);
        this.mapGenomeIndexToClipSpaceInverse = $7f56df25e3cef9e2$export$dcdf75081b88279d([
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
 */ const $bb7e3865eac9866d$export$980dd6874c34d524 = {
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


function $901f80c70ca6856e$export$2e2bcd8739ae039(constructor, factory, prototype) {
    constructor.prototype = factory.prototype = prototype;
    prototype.constructor = constructor;
}
function $901f80c70ca6856e$export$8b58be045bf06082(parent, definition) {
    var prototype = Object.create(parent.prototype);
    for(var key in definition)prototype[key] = definition[key];
    return prototype;
}


function $cf694006e2c2e1e2$export$892596cec99bc70e() {
}
var $cf694006e2c2e1e2$export$4adafc6ed0600c10 = 0.7;
var $cf694006e2c2e1e2$export$9eace2cc0d12c98d = 1 / $cf694006e2c2e1e2$export$4adafc6ed0600c10;
var $cf694006e2c2e1e2$var$reI = "\\s*([+-]?\\d+)\\s*", $cf694006e2c2e1e2$var$reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*", $cf694006e2c2e1e2$var$reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*", $cf694006e2c2e1e2$var$reHex = /^#([0-9a-f]{3,8})$/, $cf694006e2c2e1e2$var$reRgbInteger = new RegExp("^rgb\\(" + [
    $cf694006e2c2e1e2$var$reI,
    $cf694006e2c2e1e2$var$reI,
    $cf694006e2c2e1e2$var$reI
] + "\\)$"), $cf694006e2c2e1e2$var$reRgbPercent = new RegExp("^rgb\\(" + [
    $cf694006e2c2e1e2$var$reP,
    $cf694006e2c2e1e2$var$reP,
    $cf694006e2c2e1e2$var$reP
] + "\\)$"), $cf694006e2c2e1e2$var$reRgbaInteger = new RegExp("^rgba\\(" + [
    $cf694006e2c2e1e2$var$reI,
    $cf694006e2c2e1e2$var$reI,
    $cf694006e2c2e1e2$var$reI,
    $cf694006e2c2e1e2$var$reN
] + "\\)$"), $cf694006e2c2e1e2$var$reRgbaPercent = new RegExp("^rgba\\(" + [
    $cf694006e2c2e1e2$var$reP,
    $cf694006e2c2e1e2$var$reP,
    $cf694006e2c2e1e2$var$reP,
    $cf694006e2c2e1e2$var$reN
] + "\\)$"), $cf694006e2c2e1e2$var$reHslPercent = new RegExp("^hsl\\(" + [
    $cf694006e2c2e1e2$var$reN,
    $cf694006e2c2e1e2$var$reP,
    $cf694006e2c2e1e2$var$reP
] + "\\)$"), $cf694006e2c2e1e2$var$reHslaPercent = new RegExp("^hsla\\(" + [
    $cf694006e2c2e1e2$var$reN,
    $cf694006e2c2e1e2$var$reP,
    $cf694006e2c2e1e2$var$reP,
    $cf694006e2c2e1e2$var$reN
] + "\\)$");
var $cf694006e2c2e1e2$var$named = {
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
$901f80c70ca6856e$export$2e2bcd8739ae039($cf694006e2c2e1e2$export$892596cec99bc70e, $cf694006e2c2e1e2$export$2e2bcd8739ae039, {
    copy: function(channels) {
        return Object.assign(new this.constructor, this, channels);
    },
    displayable: function() {
        return this.rgb().displayable();
    },
    hex: $cf694006e2c2e1e2$var$color_formatHex,
    formatHex: $cf694006e2c2e1e2$var$color_formatHex,
    formatHsl: $cf694006e2c2e1e2$var$color_formatHsl,
    formatRgb: $cf694006e2c2e1e2$var$color_formatRgb,
    toString: $cf694006e2c2e1e2$var$color_formatRgb
});
function $cf694006e2c2e1e2$var$color_formatHex() {
    return this.rgb().formatHex();
}
function $cf694006e2c2e1e2$var$color_formatHsl() {
    return $cf694006e2c2e1e2$export$8133dc3fa904d6d1(this).formatHsl();
}
function $cf694006e2c2e1e2$var$color_formatRgb() {
    return this.rgb().formatRgb();
}
function $cf694006e2c2e1e2$export$2e2bcd8739ae039(format) {
    var m, l;
    format = (format + "").trim().toLowerCase();
    return (m = $cf694006e2c2e1e2$var$reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? $cf694006e2c2e1e2$var$rgbn(m) // #ff0000
     : l === 3 ? new $cf694006e2c2e1e2$export$5e05a94393ac29e3(m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, (m & 15) << 4 | m & 15, 1) // #f00
     : l === 8 ? $cf694006e2c2e1e2$var$rgba(m >> 24 & 255, m >> 16 & 255, m >> 8 & 255, (m & 255) / 255) // #ff000000
     : l === 4 ? $cf694006e2c2e1e2$var$rgba(m >> 12 & 15 | m >> 8 & 240, m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, ((m & 15) << 4 | m & 15) / 255) // #f000
     : null) : (m = $cf694006e2c2e1e2$var$reRgbInteger.exec(format)) ? new $cf694006e2c2e1e2$export$5e05a94393ac29e3(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
     : (m = $cf694006e2c2e1e2$var$reRgbPercent.exec(format)) ? new $cf694006e2c2e1e2$export$5e05a94393ac29e3(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
     : (m = $cf694006e2c2e1e2$var$reRgbaInteger.exec(format)) ? $cf694006e2c2e1e2$var$rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
     : (m = $cf694006e2c2e1e2$var$reRgbaPercent.exec(format)) ? $cf694006e2c2e1e2$var$rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
     : (m = $cf694006e2c2e1e2$var$reHslPercent.exec(format)) ? $cf694006e2c2e1e2$var$hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
     : (m = $cf694006e2c2e1e2$var$reHslaPercent.exec(format)) ? $cf694006e2c2e1e2$var$hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
     : $cf694006e2c2e1e2$var$named.hasOwnProperty(format) ? $cf694006e2c2e1e2$var$rgbn($cf694006e2c2e1e2$var$named[format]) // eslint-disable-line no-prototype-builtins
     : format === "transparent" ? new $cf694006e2c2e1e2$export$5e05a94393ac29e3(NaN, NaN, NaN, 0) : null;
}
function $cf694006e2c2e1e2$var$rgbn(n) {
    return new $cf694006e2c2e1e2$export$5e05a94393ac29e3(n >> 16 & 255, n >> 8 & 255, n & 255, 1);
}
function $cf694006e2c2e1e2$var$rgba(r, g, b, a) {
    if (a <= 0) r = g = b = NaN;
    return new $cf694006e2c2e1e2$export$5e05a94393ac29e3(r, g, b, a);
}
function $cf694006e2c2e1e2$export$42da0a331c2802f5(o) {
    if (!(o instanceof $cf694006e2c2e1e2$export$892596cec99bc70e)) o = $cf694006e2c2e1e2$export$2e2bcd8739ae039(o);
    if (!o) return new $cf694006e2c2e1e2$export$5e05a94393ac29e3;
    o = o.rgb();
    return new $cf694006e2c2e1e2$export$5e05a94393ac29e3(o.r, o.g, o.b, o.opacity);
}
function $cf694006e2c2e1e2$export$8972dc0e6ad9238f(r, g, b, opacity) {
    return arguments.length === 1 ? $cf694006e2c2e1e2$export$42da0a331c2802f5(r) : new $cf694006e2c2e1e2$export$5e05a94393ac29e3(r, g, b, opacity == null ? 1 : opacity);
}
function $cf694006e2c2e1e2$export$5e05a94393ac29e3(r, g, b, opacity) {
    this.r = +r;
    this.g = +g;
    this.b = +b;
    this.opacity = +opacity;
}
$901f80c70ca6856e$export$2e2bcd8739ae039($cf694006e2c2e1e2$export$5e05a94393ac29e3, $cf694006e2c2e1e2$export$8972dc0e6ad9238f, $901f80c70ca6856e$export$8b58be045bf06082($cf694006e2c2e1e2$export$892596cec99bc70e, {
    brighter: function(k) {
        k = k == null ? $cf694006e2c2e1e2$export$9eace2cc0d12c98d : Math.pow($cf694006e2c2e1e2$export$9eace2cc0d12c98d, k);
        return new $cf694006e2c2e1e2$export$5e05a94393ac29e3(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    darker: function(k) {
        k = k == null ? $cf694006e2c2e1e2$export$4adafc6ed0600c10 : Math.pow($cf694006e2c2e1e2$export$4adafc6ed0600c10, k);
        return new $cf694006e2c2e1e2$export$5e05a94393ac29e3(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    rgb: function() {
        return this;
    },
    displayable: function() {
        return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
    },
    hex: $cf694006e2c2e1e2$var$rgb_formatHex,
    formatHex: $cf694006e2c2e1e2$var$rgb_formatHex,
    formatRgb: $cf694006e2c2e1e2$var$rgb_formatRgb,
    toString: $cf694006e2c2e1e2$var$rgb_formatRgb
}));
function $cf694006e2c2e1e2$var$rgb_formatHex() {
    return "#" + $cf694006e2c2e1e2$var$hex(this.r) + $cf694006e2c2e1e2$var$hex(this.g) + $cf694006e2c2e1e2$var$hex(this.b);
}
function $cf694006e2c2e1e2$var$rgb_formatRgb() {
    var a = this.opacity;
    a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
    return (a === 1 ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (a === 1 ? ")" : ", " + a + ")");
}
function $cf694006e2c2e1e2$var$hex(value) {
    value = Math.max(0, Math.min(255, Math.round(value) || 0));
    return (value < 16 ? "0" : "") + value.toString(16);
}
function $cf694006e2c2e1e2$var$hsla(h, s, l, a) {
    if (a <= 0) h = s = l = NaN;
    else if (l <= 0 || l >= 1) h = s = NaN;
    else if (s <= 0) h = NaN;
    return new $cf694006e2c2e1e2$var$Hsl(h, s, l, a);
}
function $cf694006e2c2e1e2$export$8133dc3fa904d6d1(o) {
    if (o instanceof $cf694006e2c2e1e2$var$Hsl) return new $cf694006e2c2e1e2$var$Hsl(o.h, o.s, o.l, o.opacity);
    if (!(o instanceof $cf694006e2c2e1e2$export$892596cec99bc70e)) o = $cf694006e2c2e1e2$export$2e2bcd8739ae039(o);
    if (!o) return new $cf694006e2c2e1e2$var$Hsl;
    if (o instanceof $cf694006e2c2e1e2$var$Hsl) return o;
    o = o.rgb();
    var r = o.r / 255, g = o.g / 255, b = o.b / 255, min = Math.min(r, g, b), max = Math.max(r, g, b), h = NaN, s = max - min, l = (max + min) / 2;
    if (s) {
        if (r === max) h = (g - b) / s + (g < b) * 6;
        else if (g === max) h = (b - r) / s + 2;
        else h = (r - g) / s + 4;
        s /= l < 0.5 ? max + min : 2 - max - min;
        h *= 60;
    } else s = l > 0 && l < 1 ? 0 : h;
    return new $cf694006e2c2e1e2$var$Hsl(h, s, l, o.opacity);
}
function $cf694006e2c2e1e2$export$8f4a7c0bb78e6ea8(h, s, l, opacity) {
    return arguments.length === 1 ? $cf694006e2c2e1e2$export$8133dc3fa904d6d1(h) : new $cf694006e2c2e1e2$var$Hsl(h, s, l, opacity == null ? 1 : opacity);
}
function $cf694006e2c2e1e2$var$Hsl(h, s, l, opacity) {
    this.h = +h;
    this.s = +s;
    this.l = +l;
    this.opacity = +opacity;
}
$901f80c70ca6856e$export$2e2bcd8739ae039($cf694006e2c2e1e2$var$Hsl, $cf694006e2c2e1e2$export$8f4a7c0bb78e6ea8, $901f80c70ca6856e$export$8b58be045bf06082($cf694006e2c2e1e2$export$892596cec99bc70e, {
    brighter: function(k) {
        k = k == null ? $cf694006e2c2e1e2$export$9eace2cc0d12c98d : Math.pow($cf694006e2c2e1e2$export$9eace2cc0d12c98d, k);
        return new $cf694006e2c2e1e2$var$Hsl(this.h, this.s, this.l * k, this.opacity);
    },
    darker: function(k) {
        k = k == null ? $cf694006e2c2e1e2$export$4adafc6ed0600c10 : Math.pow($cf694006e2c2e1e2$export$4adafc6ed0600c10, k);
        return new $cf694006e2c2e1e2$var$Hsl(this.h, this.s, this.l * k, this.opacity);
    },
    rgb: function() {
        var h = this.h % 360 + (this.h < 0) * 360, s = isNaN(h) || isNaN(this.s) ? 0 : this.s, l = this.l, m2 = l + (l < 0.5 ? l : 1 - l) * s, m1 = 2 * l - m2;
        return new $cf694006e2c2e1e2$export$5e05a94393ac29e3($cf694006e2c2e1e2$var$hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2), $cf694006e2c2e1e2$var$hsl2rgb(h, m1, m2), $cf694006e2c2e1e2$var$hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2), this.opacity);
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
/* From FvD 13.37, CSS Color Module Level 3 */ function $cf694006e2c2e1e2$var$hsl2rgb(h, m1, m2) {
    return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
}



/**
 * Returns a linear scale to map elements in domain to elements in range.
 * @param {Array} domain array of length two containing minimum and maximum values
 * @param {Array} range array of length two containing minimum and maximum values
 * @returns linear scale mapping domain to range
 */ function $7f56df25e3cef9e2$export$dcdf75081b88279d(domain, range) {
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
 */ function $7f56df25e3cef9e2$export$34d09c4a771c46ef(red, green, blue) {
    return red << 16 | green << 8 | blue << 0;
}
function $7f56df25e3cef9e2$export$45a9a8711a00aca8(rgb) {
    const colorVals = rgb.substring(4, rgb.length - 1).split(",");
    return $7f56df25e3cef9e2$export$34d09c4a771c46ef(...colorVals.map((asStr)=>parseInt(asStr)
    ));
}
function $7f56df25e3cef9e2$export$90fc4f3dd3e4be0b(specifier) {
    if (!isNaN(specifier)) // Specifier is already a hex value
    return Math.floor(specifier);
    const asColor = $cf694006e2c2e1e2$export$2e2bcd8739ae039(specifier);
    return $7f56df25e3cef9e2$export$34d09c4a771c46ef(asColor.r, asColor.g, asColor.b);
}
/**
 * Get the VIEWPORT of the specification to be used by the mouseReader.
 * If all types for a dimension across tracks are categorical or genomic,
 * will default to [-1, 1] for that dimension for the mouseReader. If X or Y
 * has a fixed value, it will consider the width or height channel domains.
 *
 * @param {Object} specification of visualization
 * @returns [smallestX, largestX, smallestY, largestY] of viewport
 */ function $7f56df25e3cef9e2$export$9e48347377e521b0(specification) {
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
 */ const $7f56df25e3cef9e2$export$503bd171b936d0c1 = (dimension, specification)=>{
    if (dimension !== "x" && dimension !== "y") console.error(`${dimension} is not x or y!`);
    let genomic = false;
    let genome;
    for (const track of specification.tracks)if (track[dimension].type && track[dimension].type.includes("genomic")) {
        genome = track[dimension].genome;
        genomic = true;
        break;
    }
    if (!genomic) {
        const viewport = $7f56df25e3cef9e2$export$9e48347377e521b0(specification);
        if (dimension === "x") return $7f56df25e3cef9e2$export$dcdf75081b88279d([
            viewport[0],
            viewport[1]
        ], [
            -1,
            1
        ]);
        return $7f56df25e3cef9e2$export$dcdf75081b88279d([
            viewport[2],
            viewport[3]
        ], [
            -1,
            1
        ]);
    }
    const geneScale = $bb7e3865eac9866d$export$5af770a1c066da73.completeScale(genome);
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
    const asScale = new $bb7e3865eac9866d$export$5af770a1c066da73(genome, [
        smallestGene,
        largestGene
    ]);
    return asScale.toCallable();
};
const $7f56df25e3cef9e2$var$RELATIVE_LENGTH_UNITS = [
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
const $7f56df25e3cef9e2$var$getPixelMeasurement = (cssMeasurement)=>{
    if ($7f56df25e3cef9e2$var$RELATIVE_LENGTH_UNITS.some((unit)=>cssMeasurement.includes(unit)
    )) return false;
    const asFloat = parseFloat(cssMeasurement);
    return isNaN(asFloat) ? false : asFloat;
};
const $7f56df25e3cef9e2$var$DEFAULT_MARGIN = "50px";
const $7f56df25e3cef9e2$export$aa4eace044cdfdbf = "100%";
const $7f56df25e3cef9e2$export$611c894df53833b0 = $7f56df25e3cef9e2$export$aa4eace044cdfdbf;
const $7f56df25e3cef9e2$export$9c7342f1c4b9b83 = (specification)=>{
    let toReturn = {
    };
    const calculatedMargins = {
    };
    if (specification.margins === undefined) {
        toReturn.margin = $7f56df25e3cef9e2$var$DEFAULT_MARGIN;
        calculatedMargins.top = $7f56df25e3cef9e2$var$DEFAULT_MARGIN;
        calculatedMargins.right = $7f56df25e3cef9e2$var$DEFAULT_MARGIN;
        calculatedMargins.bottom = $7f56df25e3cef9e2$var$DEFAULT_MARGIN;
        calculatedMargins.left = $7f56df25e3cef9e2$var$DEFAULT_MARGIN;
    } else {
        calculatedMargins.top = specification.margins.top === undefined ? $7f56df25e3cef9e2$var$DEFAULT_MARGIN : specification.margins.top;
        calculatedMargins.right = specification.margins.right === undefined ? $7f56df25e3cef9e2$var$DEFAULT_MARGIN : specification.margins.right;
        calculatedMargins.bottom = specification.margins.bottom === undefined ? $7f56df25e3cef9e2$var$DEFAULT_MARGIN : specification.margins.bottom;
        calculatedMargins.left = specification.margins.left === undefined ? $7f56df25e3cef9e2$var$DEFAULT_MARGIN : specification.margins.left;
        // Shorthand for top right bottom left
        toReturn.margin = `${calculatedMargins.top}
                       ${calculatedMargins.right}
                       ${calculatedMargins.bottom}
                       ${calculatedMargins.left}`;
    }
    const calculatedWidth = specification.width || $7f56df25e3cef9e2$export$aa4eace044cdfdbf;
    const calculatedHeight = specification.height || $7f56df25e3cef9e2$export$611c894df53833b0;
    const allMeasurements = [
        calculatedMargins.top,
        calculatedMargins.right,
        calculatedMargins.bottom,
        calculatedMargins.left,
        calculatedWidth,
        calculatedHeight, 
    ];
    if (allMeasurements.every($7f56df25e3cef9e2$var$getPixelMeasurement)) {
        // Let's encode as a number to allow users using typescript or doing weird DOM things able to define
        // the width and height explicitly
        toReturn.width = $7f56df25e3cef9e2$var$getPixelMeasurement(calculatedWidth) - $7f56df25e3cef9e2$var$getPixelMeasurement(calculatedMargins.left) - $7f56df25e3cef9e2$var$getPixelMeasurement(calculatedMargins.right);
        toReturn.height = $7f56df25e3cef9e2$var$getPixelMeasurement(calculatedHeight) - $7f56df25e3cef9e2$var$getPixelMeasurement(calculatedMargins.bottom) - $7f56df25e3cef9e2$var$getPixelMeasurement(calculatedMargins.top);
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
 */ const $7f56df25e3cef9e2$export$aadc4f8a9a598f38 = (P0, P1, P2)=>{
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



function $52d402a25857ac97$export$2e2bcd8739ae039(x) {
    return x;
}


var $f289c843701a4cef$var$top = 1, $f289c843701a4cef$var$right = 2, $f289c843701a4cef$var$bottom = 3, $f289c843701a4cef$var$left = 4, $f289c843701a4cef$var$epsilon = 0.000001;
function $f289c843701a4cef$var$translateX(x) {
    return "translate(" + x + ",0)";
}
function $f289c843701a4cef$var$translateY(y) {
    return "translate(0," + y + ")";
}
function $f289c843701a4cef$var$number(scale) {
    return (d)=>+scale(d)
    ;
}
function $f289c843701a4cef$var$center(scale, offset) {
    offset = Math.max(0, scale.bandwidth() - offset * 2) / 2;
    if (scale.round()) offset = Math.round(offset);
    return (d)=>+scale(d) + offset
    ;
}
function $f289c843701a4cef$var$entering() {
    return !this.__axis;
}
function $f289c843701a4cef$var$axis(orient, scale) {
    var tickArguments = [], tickValues = null, tickFormat = null, tickSizeInner = 6, tickSizeOuter = 6, tickPadding = 3, offset = typeof window !== "undefined" && window.devicePixelRatio > 1 ? 0 : 0.5, k = orient === $f289c843701a4cef$var$top || orient === $f289c843701a4cef$var$left ? -1 : 1, x = orient === $f289c843701a4cef$var$left || orient === $f289c843701a4cef$var$right ? "x" : "y", transform = orient === $f289c843701a4cef$var$top || orient === $f289c843701a4cef$var$bottom ? $f289c843701a4cef$var$translateX : $f289c843701a4cef$var$translateY;
    function axis(context) {
        var values = tickValues == null ? scale.ticks ? scale.ticks.apply(scale, tickArguments) : scale.domain() : tickValues, format = tickFormat == null ? scale.tickFormat ? scale.tickFormat.apply(scale, tickArguments) : $52d402a25857ac97$export$2e2bcd8739ae039 : tickFormat, spacing = Math.max(tickSizeInner, 0) + tickPadding, range = scale.range(), range0 = +range[0] + offset, range1 = +range[range.length - 1] + offset, position = (scale.bandwidth ? $f289c843701a4cef$var$center : $f289c843701a4cef$var$number)(scale.copy(), offset), selection = context.selection ? context.selection() : context, path = selection.selectAll(".domain").data([
            null
        ]), tick = selection.selectAll(".tick").data(values, scale).order(), tickExit = tick.exit(), tickEnter = tick.enter().append("g").attr("class", "tick"), line = tick.select("line"), text = tick.select("text");
        path = path.merge(path.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "currentColor"));
        tick = tick.merge(tickEnter);
        line = line.merge(tickEnter.append("line").attr("stroke", "currentColor").attr(x + "2", k * tickSizeInner));
        text = text.merge(tickEnter.append("text").attr("fill", "currentColor").attr(x, k * spacing).attr("dy", orient === $f289c843701a4cef$var$top ? "0em" : orient === $f289c843701a4cef$var$bottom ? "0.71em" : "0.32em"));
        if (context !== selection) {
            path = path.transition(context);
            tick = tick.transition(context);
            line = line.transition(context);
            text = text.transition(context);
            tickExit = tickExit.transition(context).attr("opacity", $f289c843701a4cef$var$epsilon).attr("transform", function(d) {
                return isFinite(d = position(d)) ? transform(d + offset) : this.getAttribute("transform");
            });
            tickEnter.attr("opacity", $f289c843701a4cef$var$epsilon).attr("transform", function(d) {
                var p = this.parentNode.__axis;
                return transform((p && isFinite(p = p(d)) ? p : position(d)) + offset);
            });
        }
        tickExit.remove();
        path.attr("d", orient === $f289c843701a4cef$var$left || orient === $f289c843701a4cef$var$right ? tickSizeOuter ? "M" + k * tickSizeOuter + "," + range0 + "H" + offset + "V" + range1 + "H" + k * tickSizeOuter : "M" + offset + "," + range0 + "V" + range1 : tickSizeOuter ? "M" + range0 + "," + k * tickSizeOuter + "V" + offset + "H" + range1 + "V" + k * tickSizeOuter : "M" + range0 + "," + offset + "H" + range1);
        tick.attr("opacity", 1).attr("transform", function(d) {
            return transform(position(d) + offset);
        });
        line.attr(x + "2", k * tickSizeInner);
        text.attr(x, k * spacing).text(format);
        selection.filter($f289c843701a4cef$var$entering).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", orient === $f289c843701a4cef$var$right ? "start" : orient === $f289c843701a4cef$var$left ? "end" : "middle");
        selection.each(function() {
            this.__axis = position;
        });
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
function $f289c843701a4cef$export$59b8cfab074bdeb1(scale) {
    return $f289c843701a4cef$var$axis($f289c843701a4cef$var$top, scale);
}
function $f289c843701a4cef$export$b0d2e24dc4f898f0(scale) {
    return $f289c843701a4cef$var$axis($f289c843701a4cef$var$right, scale);
}
function $f289c843701a4cef$export$e5cb22533a15e72e(scale) {
    return $f289c843701a4cef$var$axis($f289c843701a4cef$var$bottom, scale);
}
function $f289c843701a4cef$export$2749afb169a520d2(scale) {
    return $f289c843701a4cef$var$axis($f289c843701a4cef$var$left, scale);
}



function $8afa7834ebc28caa$export$2e2bcd8739ae039(a, b) {
    return a == null || b == null ? NaN : a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}



function $049294e5ba29a0f0$export$2e2bcd8739ae039(f) {
    let delta = f;
    let compare1 = f;
    let compare2 = f;
    if (f.length !== 2) {
        delta = (d, x)=>f(d) - x
        ;
        compare1 = $8afa7834ebc28caa$export$2e2bcd8739ae039;
        compare2 = (d, x)=>$8afa7834ebc28caa$export$2e2bcd8739ae039(f(d), x)
        ;
    }
    function left(a, x, lo = 0, hi = a.length) {
        if (lo < hi) {
            if (compare1(x, x) !== 0) return hi;
            do {
                const mid = lo + hi >>> 1;
                if (compare2(a[mid], x) < 0) lo = mid + 1;
                else hi = mid;
            }while (lo < hi)
        }
        return lo;
    }
    function right(a, x, lo = 0, hi = a.length) {
        if (lo < hi) {
            if (compare1(x, x) !== 0) return hi;
            do {
                const mid = lo + hi >>> 1;
                if (compare2(a[mid], x) <= 0) lo = mid + 1;
                else hi = mid;
            }while (lo < hi)
        }
        return lo;
    }
    function center(a, x, lo = 0, hi = a.length) {
        const i = left(a, x, lo, hi - 1);
        return i > lo && delta(a[i - 1], x) > -delta(a[i], x) ? i - 1 : i;
    }
    return {
        left: left,
        center: center,
        right: right
    };
}


function $fabf5a01287a32b6$export$2e2bcd8739ae039(x) {
    return x === null ? NaN : +x;
}
function* $fabf5a01287a32b6$export$1f6c9cc012ebacae(values, valueof) {
    if (valueof === undefined) {
        for (let value of values)if (value != null && (value = +value) >= value) yield value;
    } else {
        let index = -1;
        for (let value of values)if ((value = valueof(value, ++index, values)) != null && (value = +value) >= value) yield value;
    }
}


const $96bc67fdfc1bb15b$var$ascendingBisect = $049294e5ba29a0f0$export$2e2bcd8739ae039($8afa7834ebc28caa$export$2e2bcd8739ae039);
const $96bc67fdfc1bb15b$export$4d945ad3ad5751b0 = $96bc67fdfc1bb15b$var$ascendingBisect.right;
const $96bc67fdfc1bb15b$export$df7d25c84ebd12a5 = $96bc67fdfc1bb15b$var$ascendingBisect.left;
const $96bc67fdfc1bb15b$export$c1cb828b1117c77b = $049294e5ba29a0f0$export$2e2bcd8739ae039($fabf5a01287a32b6$export$2e2bcd8739ae039).center;
var $96bc67fdfc1bb15b$export$2e2bcd8739ae039 = $96bc67fdfc1bb15b$export$4d945ad3ad5751b0;

var $35bc5adaf50b7e77$var$e10 = Math.sqrt(50), $35bc5adaf50b7e77$var$e5 = Math.sqrt(10), $35bc5adaf50b7e77$var$e2 = Math.sqrt(2);
function $35bc5adaf50b7e77$export$2e2bcd8739ae039(start, stop, count) {
    var reverse, i = -1, n, $35bc5adaf50b7e77$export$2e2bcd8739ae039, step;
    stop = +stop, start = +start, count = +count;
    if (start === stop && count > 0) return [
        start
    ];
    if (reverse = stop < start) n = start, start = stop, stop = n;
    if ((step = $35bc5adaf50b7e77$export$bc64d00cc98e7e95(start, stop, count)) === 0 || !isFinite(step)) return [];
    if (step > 0) {
        let r0 = Math.round(start / step), r1 = Math.round(stop / step);
        if (r0 * step < start) ++r0;
        if (r1 * step > stop) --r1;
        $35bc5adaf50b7e77$export$2e2bcd8739ae039 = new Array(n = r1 - r0 + 1);
        while(++i < n)$35bc5adaf50b7e77$export$2e2bcd8739ae039[i] = (r0 + i) * step;
    } else {
        step = -step;
        let r0 = Math.round(start * step), r1 = Math.round(stop * step);
        if (r0 / step < start) ++r0;
        if (r1 / step > stop) --r1;
        $35bc5adaf50b7e77$export$2e2bcd8739ae039 = new Array(n = r1 - r0 + 1);
        while(++i < n)$35bc5adaf50b7e77$export$2e2bcd8739ae039[i] = (r0 + i) / step;
    }
    if (reverse) $35bc5adaf50b7e77$export$2e2bcd8739ae039.reverse();
    return $35bc5adaf50b7e77$export$2e2bcd8739ae039;
}
function $35bc5adaf50b7e77$export$bc64d00cc98e7e95(start, stop, count) {
    var step = (stop - start) / Math.max(0, count), power = Math.floor(Math.log(step) / Math.LN10), error = step / Math.pow(10, power);
    return power >= 0 ? (error >= $35bc5adaf50b7e77$var$e10 ? 10 : error >= $35bc5adaf50b7e77$var$e5 ? 5 : error >= $35bc5adaf50b7e77$var$e2 ? 2 : 1) * Math.pow(10, power) : -Math.pow(10, -power) / (error >= $35bc5adaf50b7e77$var$e10 ? 10 : error >= $35bc5adaf50b7e77$var$e5 ? 5 : error >= $35bc5adaf50b7e77$var$e2 ? 2 : 1);
}
function $35bc5adaf50b7e77$export$81087d9b915d4ede(start, stop, count) {
    var step0 = Math.abs(stop - start) / Math.max(0, count), step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)), error = step0 / step1;
    if (error >= $35bc5adaf50b7e77$var$e10) step1 *= 10;
    else if (error >= $35bc5adaf50b7e77$var$e5) step1 *= 5;
    else if (error >= $35bc5adaf50b7e77$var$e2) step1 *= 2;
    return stop < start ? -step1 : step1;
}






function $aa6dd7d72504a24e$export$4e41033bfeec1a4c(t1, v0, v1, v2, v3) {
    var t2 = t1 * t1, t3 = t2 * t1;
    return ((1 - 3 * t1 + 3 * t2 - t3) * v0 + (4 - 6 * t2 + 3 * t3) * v1 + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2 + t3 * v3) / 6;
}
function $aa6dd7d72504a24e$export$2e2bcd8739ae039(values) {
    var n = values.length - 1;
    return function(t) {
        var i = t <= 0 ? t = 0 : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n), v1 = values[i], v2 = values[i + 1], v0 = i > 0 ? values[i - 1] : 2 * v1 - v2, v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
        return $aa6dd7d72504a24e$export$4e41033bfeec1a4c((t - i / n) * n, v0, v1, v2, v3);
    };
}



function $fa6b9ba791d053a6$export$2e2bcd8739ae039(values) {
    var n = values.length;
    return function(t) {
        var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n), v0 = values[(i + n - 1) % n], v1 = values[i % n], v2 = values[(i + 1) % n], v3 = values[(i + 2) % n];
        return $aa6dd7d72504a24e$export$4e41033bfeec1a4c((t - i / n) * n, v0, v1, v2, v3);
    };
}


var $663e255a175cfb78$export$2e2bcd8739ae039 = (x)=>()=>x
;


function $129eda5b6d4cb725$var$linear(a, d) {
    return function(t) {
        return a + t * d;
    };
}
function $129eda5b6d4cb725$var$exponential(a, b, y) {
    return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
        return Math.pow(a + t * b, y);
    };
}
function $129eda5b6d4cb725$export$97d7b0c7ddb78dcf(a, b) {
    var d = b - a;
    return d ? $129eda5b6d4cb725$var$linear(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : $663e255a175cfb78$export$2e2bcd8739ae039(isNaN(a) ? b : a);
}
function $129eda5b6d4cb725$export$a7ebe8cc6aaf8d37(y) {
    return (y = +y) === 1 ? $129eda5b6d4cb725$export$2e2bcd8739ae039 : function(a, b) {
        return b - a ? $129eda5b6d4cb725$var$exponential(a, b, y) : $663e255a175cfb78$export$2e2bcd8739ae039(isNaN(a) ? b : a);
    };
}
function $129eda5b6d4cb725$export$2e2bcd8739ae039(a, b) {
    var d = b - a;
    return d ? $129eda5b6d4cb725$var$linear(a, d) : $663e255a175cfb78$export$2e2bcd8739ae039(isNaN(a) ? b : a);
}


var $dee4c3745eb459e0$export$2e2bcd8739ae039 = function rgbGamma(y) {
    var color = $129eda5b6d4cb725$export$a7ebe8cc6aaf8d37(y);
    function rgb(start, end) {
        var r = color((start = $cf694006e2c2e1e2$export$8972dc0e6ad9238f(start)).r, (end = $cf694006e2c2e1e2$export$8972dc0e6ad9238f(end)).r), g = color(start.g, end.g), b = color(start.b, end.b), opacity = $129eda5b6d4cb725$export$2e2bcd8739ae039(start.opacity, end.opacity);
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
function $dee4c3745eb459e0$var$rgbSpline(spline) {
    return function(colors) {
        var n = colors.length, r = new Array(n), g = new Array(n), b = new Array(n), i, color;
        for(i = 0; i < n; ++i){
            color = $cf694006e2c2e1e2$export$8972dc0e6ad9238f(colors[i]);
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
var $dee4c3745eb459e0$export$2c0e28f2e2852d3f = $dee4c3745eb459e0$var$rgbSpline($aa6dd7d72504a24e$export$2e2bcd8739ae039);
var $dee4c3745eb459e0$export$53d5214f625ccd4c = $dee4c3745eb459e0$var$rgbSpline($fa6b9ba791d053a6$export$2e2bcd8739ae039);



function $d9fa745bef89a63f$export$2e2bcd8739ae039(a, b) {
    if (!b) b = [];
    var n = a ? Math.min(b.length, a.length) : 0, c = b.slice(), i;
    return function(t) {
        for(i = 0; i < n; ++i)c[i] = a[i] * (1 - t) + b[i] * t;
        return c;
    };
}
function $d9fa745bef89a63f$export$5cd576d1827d40c8(x) {
    return ArrayBuffer.isView(x) && !(x instanceof DataView);
}


function $94122849d0a1bd4f$export$2e2bcd8739ae039(a, b) {
    return ($d9fa745bef89a63f$export$5cd576d1827d40c8(b) ? $d9fa745bef89a63f$export$2e2bcd8739ae039 : $94122849d0a1bd4f$export$15d09067c6a5ee49)(a, b);
}
function $94122849d0a1bd4f$export$15d09067c6a5ee49(a, b) {
    var nb = b ? b.length : 0, na = a ? Math.min(nb, a.length) : 0, x = new Array(na), c = new Array(nb), i;
    for(i = 0; i < na; ++i)x[i] = $d6f598373d8c7921$export$2e2bcd8739ae039(a[i], b[i]);
    for(; i < nb; ++i)c[i] = b[i];
    return function(t) {
        for(i = 0; i < na; ++i)c[i] = x[i](t);
        return c;
    };
}


function $fa99a6cf855593c6$export$2e2bcd8739ae039(a, b) {
    var d = new Date;
    return a = +a, b = +b, function(t) {
        return d.setTime(a * (1 - t) + b * t), d;
    };
}


function $c81b71dd671221b9$export$2e2bcd8739ae039(a, b) {
    return a = +a, b = +b, function(t) {
        return a * (1 - t) + b * t;
    };
}



function $4351e7982219ccb5$export$2e2bcd8739ae039(a, b) {
    var i = {
    }, c = {
    }, k;
    if (a === null || typeof a !== "object") a = {
    };
    if (b === null || typeof b !== "object") b = {
    };
    for(k in b)if (k in a) i[k] = $d6f598373d8c7921$export$2e2bcd8739ae039(a[k], b[k]);
    else c[k] = b[k];
    return function(t) {
        for(k in i)c[k] = i[k](t);
        return c;
    };
}



var $2857a0a753f53698$var$reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, $2857a0a753f53698$var$reB = new RegExp($2857a0a753f53698$var$reA.source, "g");
function $2857a0a753f53698$var$zero(b) {
    return function() {
        return b;
    };
}
function $2857a0a753f53698$var$one(b) {
    return function(t) {
        return b(t) + "";
    };
}
function $2857a0a753f53698$export$2e2bcd8739ae039(a, b) {
    var bi = $2857a0a753f53698$var$reA.lastIndex = $2857a0a753f53698$var$reB.lastIndex = 0, am, bm, bs, i1 = -1, s = [], q = []; // number interpolators
    // Coerce inputs to strings.
    a = a + "", b = b + "";
    // Interpolate pairs of numbers in a & b.
    while((am = $2857a0a753f53698$var$reA.exec(a)) && (bm = $2857a0a753f53698$var$reB.exec(b))){
        if ((bs = bm.index) > bi) {
            bs = b.slice(bi, bs);
            if (s[i1]) s[i1] += bs; // coalesce with previous string
            else s[++i1] = bs;
        }
        if ((am = am[0]) === (bm = bm[0])) {
            if (s[i1]) s[i1] += bm; // coalesce with previous string
            else s[++i1] = bm;
        } else {
            s[++i1] = null;
            q.push({
                i: i1,
                x: $c81b71dd671221b9$export$2e2bcd8739ae039(am, bm)
            });
        }
        bi = $2857a0a753f53698$var$reB.lastIndex;
    }
    // Add remains of b.
    if (bi < b.length) {
        bs = b.slice(bi);
        if (s[i1]) s[i1] += bs; // coalesce with previous string
        else s[++i1] = bs;
    }
    // Special optimization for only a single match.
    // Otherwise, interpolate each of the numbers and rejoin the string.
    return s.length < 2 ? q[0] ? $2857a0a753f53698$var$one(q[0].x) : $2857a0a753f53698$var$zero(b) : (b = q.length, function(t) {
        for(var i = 0, o; i < b; ++i)s[(o = q[i]).i] = o.x(t);
        return s.join("");
    });
}




function $d6f598373d8c7921$export$2e2bcd8739ae039(a, b) {
    var t = typeof b, c;
    return b == null || t === "boolean" ? $663e255a175cfb78$export$2e2bcd8739ae039(b) : (t === "number" ? $c81b71dd671221b9$export$2e2bcd8739ae039 : t === "string" ? (c = $cf694006e2c2e1e2$export$2e2bcd8739ae039(b)) ? (b = c, $dee4c3745eb459e0$export$2e2bcd8739ae039) : $2857a0a753f53698$export$2e2bcd8739ae039 : b instanceof $cf694006e2c2e1e2$export$2e2bcd8739ae039 ? $dee4c3745eb459e0$export$2e2bcd8739ae039 : b instanceof Date ? $fa99a6cf855593c6$export$2e2bcd8739ae039 : $d9fa745bef89a63f$export$5cd576d1827d40c8(b) ? $d9fa745bef89a63f$export$2e2bcd8739ae039 : Array.isArray(b) ? $94122849d0a1bd4f$export$15d09067c6a5ee49 : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? $4351e7982219ccb5$export$2e2bcd8739ae039 : $c81b71dd671221b9$export$2e2bcd8739ae039)(a, b);
}

function $17ba21bccb8f8ee4$export$2e2bcd8739ae039(a, b) {
    return a = +a, b = +b, function(t) {
        return Math.round(a * (1 - t) + b * t);
    };
}



function $934e9e7f5b67cfca$export$2e2bcd8739ae039(x) {
    return function() {
        return x;
    };
}


function $28eff86d82a0d9a8$export$2e2bcd8739ae039(x) {
    return +x;
}


var $d1720577d8838e88$var$unit = [
    0,
    1
];
function $d1720577d8838e88$export$f0954fd7d5368655(x) {
    return x;
}
function $d1720577d8838e88$var$normalize(a, b) {
    return (b -= a = +a) ? function(x) {
        return (x - a) / b;
    } : $934e9e7f5b67cfca$export$2e2bcd8739ae039(isNaN(b) ? NaN : 0.5);
}
function $d1720577d8838e88$var$clamper(a, b) {
    var t;
    if (a > b) t = a, a = b, b = t;
    return function(x) {
        return Math.max(a, Math.min(b, x));
    };
}
// normalize(a, b)(x) takes a domain value x in [a,b] and returns the corresponding parameter t in [0,1].
// interpolate(a, b)(t) takes a parameter t in [0,1] and returns the corresponding range value x in [a,b].
function $d1720577d8838e88$var$bimap(domain, range, interpolate) {
    var d0 = domain[0], d1 = domain[1], r0 = range[0], r1 = range[1];
    if (d1 < d0) d0 = $d1720577d8838e88$var$normalize(d1, d0), r0 = interpolate(r1, r0);
    else d0 = $d1720577d8838e88$var$normalize(d0, d1), r0 = interpolate(r0, r1);
    return function(x) {
        return r0(d0(x));
    };
}
function $d1720577d8838e88$var$polymap(domain, range, interpolate) {
    var j = Math.min(domain.length, range.length) - 1, d = new Array(j), r = new Array(j), i = -1;
    // Reverse descending domains.
    if (domain[j] < domain[0]) {
        domain = domain.slice().reverse();
        range = range.slice().reverse();
    }
    while(++i < j){
        d[i] = $d1720577d8838e88$var$normalize(domain[i], domain[i + 1]);
        r[i] = interpolate(range[i], range[i + 1]);
    }
    return function(x) {
        var i = $96bc67fdfc1bb15b$export$2e2bcd8739ae039(domain, x, 1, j) - 1;
        return r[i](d[i](x));
    };
}
function $d1720577d8838e88$export$784d13d8ee351f07(source, target) {
    return target.domain(source.domain()).range(source.range()).interpolate(source.interpolate()).clamp(source.clamp()).unknown(source.unknown());
}
function $d1720577d8838e88$export$6b468dcfb64c653c() {
    var domain = $d1720577d8838e88$var$unit, range = $d1720577d8838e88$var$unit, interpolate = $d6f598373d8c7921$export$2e2bcd8739ae039, transform, untransform, unknown, clamp = $d1720577d8838e88$export$f0954fd7d5368655, piecewise, output, input;
    function rescale() {
        var n = Math.min(domain.length, range.length);
        if (clamp !== $d1720577d8838e88$export$f0954fd7d5368655) clamp = $d1720577d8838e88$var$clamper(domain[0], domain[n - 1]);
        piecewise = n > 2 ? $d1720577d8838e88$var$polymap : $d1720577d8838e88$var$bimap;
        output = input = null;
        return scale;
    }
    function scale(x) {
        return x == null || isNaN(x = +x) ? unknown : (output || (output = piecewise(domain.map(transform), range, interpolate)))(transform(clamp(x)));
    }
    scale.invert = function(y) {
        return clamp(untransform((input || (input = piecewise(range, domain.map(transform), $c81b71dd671221b9$export$2e2bcd8739ae039)))(y)));
    };
    scale.domain = function(_) {
        return arguments.length ? (domain = Array.from(_, $28eff86d82a0d9a8$export$2e2bcd8739ae039), rescale()) : domain.slice();
    };
    scale.range = function(_) {
        return arguments.length ? (range = Array.from(_), rescale()) : range.slice();
    };
    scale.rangeRound = function(_) {
        return range = Array.from(_), interpolate = $17ba21bccb8f8ee4$export$2e2bcd8739ae039, rescale();
    };
    scale.clamp = function(_) {
        return arguments.length ? (clamp = _ ? true : $d1720577d8838e88$export$f0954fd7d5368655, rescale()) : clamp !== $d1720577d8838e88$export$f0954fd7d5368655;
    };
    scale.interpolate = function(_) {
        return arguments.length ? (interpolate = _, rescale()) : interpolate;
    };
    scale.unknown = function(_) {
        return arguments.length ? (unknown = _, scale) : unknown;
    };
    return function(t, u) {
        transform = t, untransform = u;
        return rescale();
    };
}
function $d1720577d8838e88$export$2e2bcd8739ae039() {
    return $d1720577d8838e88$export$6b468dcfb64c653c()($d1720577d8838e88$export$f0954fd7d5368655, $d1720577d8838e88$export$f0954fd7d5368655);
}


function $a672075a618c81db$export$23c7bb9e6558da2a(domain, range) {
    switch(arguments.length){
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
function $a672075a618c81db$export$7d6b419e59e83f3d(domain, interpolator) {
    switch(arguments.length){
        case 0:
            break;
        case 1:
            if (typeof domain === "function") this.interpolator(domain);
            else this.range(domain);
            break;
        default:
            this.domain(domain);
            if (typeof interpolator === "function") this.interpolator(interpolator);
            else this.range(interpolator);
            break;
    }
    return this;
}




function $9de36082a50c02ba$export$2e2bcd8739ae039(start, stop, count, specifier) {
    var step = $35bc5adaf50b7e77$export$81087d9b915d4ede(start, stop, count), precision;
    specifier = $babd3c0ee933dbfb$export$2e2bcd8739ae039(specifier == null ? ",f" : specifier);
    switch(specifier.type){
        case "s":
            var value = Math.max(Math.abs(start), Math.abs(stop));
            if (specifier.precision == null && !isNaN(precision = $70c7673fef1d9274$export$2e2bcd8739ae039(step, value))) specifier.precision = precision;
            return $23de77130e6fabd5$export$8d85692a469dde6f(specifier, value);
        case "":
        case "e":
        case "g":
        case "p":
        case "r":
            if (specifier.precision == null && !isNaN(precision = $36636254076a5075$export$2e2bcd8739ae039(step, Math.max(Math.abs(start), Math.abs(stop))))) specifier.precision = precision - (specifier.type === "e");
            break;
        case "f":
        case "%":
            if (specifier.precision == null && !isNaN(precision = $e542643fa01a3586$export$2e2bcd8739ae039(step))) specifier.precision = precision - (specifier.type === "%") * 2;
            break;
    }
    return $23de77130e6fabd5$export$d9468344d3651243(specifier);
}


function $46dd7dd0ac807af9$export$16a5d4b4a61a274d(scale) {
    var domain = scale.domain;
    scale.ticks = function(count) {
        var d = domain();
        return $35bc5adaf50b7e77$export$2e2bcd8739ae039(d[0], d[d.length - 1], count == null ? 10 : count);
    };
    scale.tickFormat = function(count, specifier) {
        var d = domain();
        return $9de36082a50c02ba$export$2e2bcd8739ae039(d[0], d[d.length - 1], count == null ? 10 : count, specifier);
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
        while(maxIter-- > 0){
            step = $35bc5adaf50b7e77$export$bc64d00cc98e7e95(start, stop, count);
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
            } else break;
            prestep = step;
        }
        return scale;
    };
    return scale;
}
function $46dd7dd0ac807af9$export$2e2bcd8739ae039() {
    var scale = $d1720577d8838e88$export$2e2bcd8739ae039();
    scale.copy = function() {
        return $d1720577d8838e88$export$784d13d8ee351f07(scale, $46dd7dd0ac807af9$export$2e2bcd8739ae039());
    };
    $a672075a618c81db$export$23c7bb9e6558da2a.apply(scale, arguments);
    return $46dd7dd0ac807af9$export$16a5d4b4a61a274d(scale);
}




function $4f590ea611a05bef$var$none() {
}
function $4f590ea611a05bef$export$2e2bcd8739ae039(selector) {
    return selector == null ? $4f590ea611a05bef$var$none : function() {
        return this.querySelector(selector);
    };
}


function $dab03710c0a0451f$export$2e2bcd8739ae039(select) {
    if (typeof select !== "function") select = $4f590ea611a05bef$export$2e2bcd8739ae039(select);
    for(var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j){
        for(var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i)if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
            if ("__data__" in node) subnode.__data__ = node.__data__;
            subgroup[i] = subnode;
        }
    }
    return new $47f0ff7527d817e6$export$52baac22726c72bf(subgroups, this._parents);
}



function $04ccf61e03b66bae$export$2e2bcd8739ae039(x) {
    return x == null ? [] : Array.isArray(x) ? x : Array.from(x);
}


function $88500f8ff512f685$var$empty() {
    return [];
}
function $88500f8ff512f685$export$2e2bcd8739ae039(selector) {
    return selector == null ? $88500f8ff512f685$var$empty : function() {
        return this.querySelectorAll(selector);
    };
}


function $f30f5dd19c67a4c1$var$arrayAll(select) {
    return function() {
        return $04ccf61e03b66bae$export$2e2bcd8739ae039(select.apply(this, arguments));
    };
}
function $f30f5dd19c67a4c1$export$2e2bcd8739ae039(select) {
    if (typeof select === "function") select = $f30f5dd19c67a4c1$var$arrayAll(select);
    else select = $88500f8ff512f685$export$2e2bcd8739ae039(select);
    for(var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j){
        for(var group = groups[j], n = group.length, node, i = 0; i < n; ++i)if (node = group[i]) {
            subgroups.push(select.call(node, node.__data__, i, group));
            parents.push(node);
        }
    }
    return new $47f0ff7527d817e6$export$52baac22726c72bf(subgroups, parents);
}


function $bbe47e0dca9aec73$export$2e2bcd8739ae039(selector) {
    return function() {
        return this.matches(selector);
    };
}
function $bbe47e0dca9aec73$export$90c2759c036528(selector) {
    return function(node) {
        return node.matches(selector);
    };
}


var $9a8954662f3b55da$var$find = Array.prototype.find;
function $9a8954662f3b55da$var$childFind(match) {
    return function() {
        return $9a8954662f3b55da$var$find.call(this.children, match);
    };
}
function $9a8954662f3b55da$var$childFirst() {
    return this.firstElementChild;
}
function $9a8954662f3b55da$export$2e2bcd8739ae039(match) {
    return this.select(match == null ? $9a8954662f3b55da$var$childFirst : $9a8954662f3b55da$var$childFind(typeof match === "function" ? match : $bbe47e0dca9aec73$export$90c2759c036528(match)));
}



var $2306b1a2fd66549a$var$filter = Array.prototype.filter;
function $2306b1a2fd66549a$var$children() {
    return Array.from(this.children);
}
function $2306b1a2fd66549a$var$childrenFilter(match) {
    return function() {
        return $2306b1a2fd66549a$var$filter.call(this.children, match);
    };
}
function $2306b1a2fd66549a$export$2e2bcd8739ae039(match) {
    return this.selectAll(match == null ? $2306b1a2fd66549a$var$children : $2306b1a2fd66549a$var$childrenFilter(typeof match === "function" ? match : $bbe47e0dca9aec73$export$90c2759c036528(match)));
}




function $81f52857269808bb$export$2e2bcd8739ae039(match) {
    if (typeof match !== "function") match = $bbe47e0dca9aec73$export$2e2bcd8739ae039(match);
    for(var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j){
        for(var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i)if ((node = group[i]) && match.call(node, node.__data__, i, group)) subgroup.push(node);
    }
    return new $47f0ff7527d817e6$export$52baac22726c72bf(subgroups, this._parents);
}



function $282dce788bc12e7b$export$2e2bcd8739ae039(update) {
    return new Array(update.length);
}



function $05992484860795d1$export$2e2bcd8739ae039() {
    return new $47f0ff7527d817e6$export$52baac22726c72bf(this._enter || this._groups.map($282dce788bc12e7b$export$2e2bcd8739ae039), this._parents);
}
function $05992484860795d1$export$67b01759a14cf6a4(parent, datum) {
    this.ownerDocument = parent.ownerDocument;
    this.namespaceURI = parent.namespaceURI;
    this._next = null;
    this._parent = parent;
    this.__data__ = datum;
}
$05992484860795d1$export$67b01759a14cf6a4.prototype = {
    constructor: $05992484860795d1$export$67b01759a14cf6a4,
    appendChild: function(child) {
        return this._parent.insertBefore(child, this._next);
    },
    insertBefore: function(child, next) {
        return this._parent.insertBefore(child, next);
    },
    querySelector: function(selector) {
        return this._parent.querySelector(selector);
    },
    querySelectorAll: function(selector) {
        return this._parent.querySelectorAll(selector);
    }
};


function $4cc7db969d2df2eb$export$2e2bcd8739ae039(x) {
    return function() {
        return x;
    };
}


function $b1f902012fae0c37$var$bindIndex(parent, group, enter, update, exit, data) {
    var i = 0, node, groupLength = group.length, dataLength = data.length;
    // Put any non-null nodes that fit into update.
    // Put any null nodes into enter.
    // Put any remaining data into enter.
    for(; i < dataLength; ++i)if (node = group[i]) {
        node.__data__ = data[i];
        update[i] = node;
    } else enter[i] = new $05992484860795d1$export$67b01759a14cf6a4(parent, data[i]);
    // Put any non-null nodes that don’t fit into exit.
    for(; i < groupLength; ++i)if (node = group[i]) exit[i] = node;
}
function $b1f902012fae0c37$var$bindKey(parent, group, enter, update, exit, data, key) {
    var i, node, nodeByKeyValue = new Map, groupLength = group.length, dataLength = data.length, keyValues = new Array(groupLength), keyValue;
    // Compute the key for each node.
    // If multiple nodes have the same key, the duplicates are added to exit.
    for(i = 0; i < groupLength; ++i)if (node = group[i]) {
        keyValues[i] = keyValue = key.call(node, node.__data__, i, group) + "";
        if (nodeByKeyValue.has(keyValue)) exit[i] = node;
        else nodeByKeyValue.set(keyValue, node);
    }
    // Compute the key for each datum.
    // If there a node associated with this key, join and add it to update.
    // If there is not (or the key is a duplicate), add it to enter.
    for(i = 0; i < dataLength; ++i){
        keyValue = key.call(parent, data[i], i, data) + "";
        if (node = nodeByKeyValue.get(keyValue)) {
            update[i] = node;
            node.__data__ = data[i];
            nodeByKeyValue.delete(keyValue);
        } else enter[i] = new $05992484860795d1$export$67b01759a14cf6a4(parent, data[i]);
    }
    // Add any remaining nodes that were not bound to data to exit.
    for(i = 0; i < groupLength; ++i)if ((node = group[i]) && nodeByKeyValue.get(keyValues[i]) === node) exit[i] = node;
}
function $b1f902012fae0c37$var$datum(node) {
    return node.__data__;
}
function $b1f902012fae0c37$export$2e2bcd8739ae039(value, key) {
    if (!arguments.length) return Array.from(this, $b1f902012fae0c37$var$datum);
    var bind = key ? $b1f902012fae0c37$var$bindKey : $b1f902012fae0c37$var$bindIndex, parents = this._parents, groups = this._groups;
    if (typeof value !== "function") value = $4cc7db969d2df2eb$export$2e2bcd8739ae039(value);
    for(var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j){
        var parent = parents[j], group = groups[j], groupLength = group.length, data = $b1f902012fae0c37$var$arraylike(value.call(parent, parent && parent.__data__, j, parents)), dataLength = data.length, enterGroup = enter[j] = new Array(dataLength), updateGroup = update[j] = new Array(dataLength), exitGroup = exit[j] = new Array(groupLength);
        bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);
        // Now connect the enter nodes to their following update node, such that
        // appendChild can insert the materialized enter node before this node,
        // rather than at the end of the parent node.
        for(var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0)if (previous = enterGroup[i0]) {
            if (i0 >= i1) i1 = i0 + 1;
            while(!(next = updateGroup[i1]) && ++i1 < dataLength);
            previous._next = next || null;
        }
    }
    update = new $47f0ff7527d817e6$export$52baac22726c72bf(update, parents);
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
function $b1f902012fae0c37$var$arraylike(data) {
    return typeof data === "object" && "length" in data ? data // Array, TypedArray, NodeList, array-like
     : Array.from(data); // Map, Set, iterable, string, or anything else
}





function $89bc1abb0fb02bc8$export$2e2bcd8739ae039() {
    return new $47f0ff7527d817e6$export$52baac22726c72bf(this._exit || this._groups.map($282dce788bc12e7b$export$2e2bcd8739ae039), this._parents);
}


function $3cd2d8246dadad45$export$2e2bcd8739ae039(onenter, onupdate, onexit) {
    var enter = this.enter(), update = this, exit = this.exit();
    if (typeof onenter === "function") {
        enter = onenter(enter);
        if (enter) enter = enter.selection();
    } else enter = enter.append(onenter + "");
    if (onupdate != null) {
        update = onupdate(update);
        if (update) update = update.selection();
    }
    if (onexit == null) exit.remove();
    else onexit(exit);
    return enter && update ? enter.merge(update).order() : update;
}



function $14fd56101d35ce5c$export$2e2bcd8739ae039(context) {
    var selection = context.selection ? context.selection() : context;
    for(var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j){
        for(var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i)if (node = group0[i] || group1[i]) merge[i] = node;
    }
    for(; j < m0; ++j)merges[j] = groups0[j];
    return new $47f0ff7527d817e6$export$52baac22726c72bf(merges, this._parents);
}


function $bea68a5a8e60349e$export$2e2bcd8739ae039() {
    for(var groups = this._groups, j = -1, m = groups.length; ++j < m;){
        for(var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;)if (node = group[i]) {
            if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
            next = node;
        }
    }
    return this;
}



function $a68c5ea1f0ea990f$export$2e2bcd8739ae039(compare) {
    if (!compare) compare = $a68c5ea1f0ea990f$var$ascending;
    function compareNode(a, b) {
        return a && b ? compare(a.__data__, b.__data__) : !a - !b;
    }
    for(var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j){
        for(var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i)if (node = group[i]) sortgroup[i] = node;
        sortgroup.sort(compareNode);
    }
    return new $47f0ff7527d817e6$export$52baac22726c72bf(sortgroups, this._parents).order();
}
function $a68c5ea1f0ea990f$var$ascending(a, b) {
    return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}


function $0bd409e62410acd0$export$2e2bcd8739ae039() {
    var callback = arguments[0];
    arguments[0] = this;
    callback.apply(null, arguments);
    return this;
}


function $75ef816dfb407940$export$2e2bcd8739ae039() {
    return Array.from(this);
}


function $32beb5e8d7d9e650$export$2e2bcd8739ae039() {
    for(var groups = this._groups, j = 0, m = groups.length; j < m; ++j)for(var group = groups[j], i = 0, n = group.length; i < n; ++i){
        var node = group[i];
        if (node) return node;
    }
    return null;
}


function $443db4f3d9afd0a6$export$2e2bcd8739ae039() {
    let size = 0;
    for (const node of this)++size; // eslint-disable-line no-unused-vars
    return size;
}


function $fe407d70e508eb9b$export$2e2bcd8739ae039() {
    return !this.node();
}


function $2f8eba843281fe2a$export$2e2bcd8739ae039(callback) {
    for(var groups = this._groups, j = 0, m = groups.length; j < m; ++j){
        for(var group = groups[j], i = 0, n = group.length, node; i < n; ++i)if (node = group[i]) callback.call(node, node.__data__, i, group);
    }
    return this;
}


var $15c1b0df3e13ed9a$export$201a3f7520ccc326 = "http://www.w3.org/1999/xhtml";
var $15c1b0df3e13ed9a$export$2e2bcd8739ae039 = {
    svg: "http://www.w3.org/2000/svg",
    xhtml: $15c1b0df3e13ed9a$export$201a3f7520ccc326,
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/"
};


function $edfd550093082bc6$export$2e2bcd8739ae039(name) {
    var prefix = name += "", i = prefix.indexOf(":");
    if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
    return $15c1b0df3e13ed9a$export$2e2bcd8739ae039.hasOwnProperty(prefix) ? {
        space: $15c1b0df3e13ed9a$export$2e2bcd8739ae039[prefix],
        local: name
    } : name; // eslint-disable-line no-prototype-builtins
}


function $fda437b40b08c6ad$var$attrRemove(name) {
    return function() {
        this.removeAttribute(name);
    };
}
function $fda437b40b08c6ad$var$attrRemoveNS(fullname) {
    return function() {
        this.removeAttributeNS(fullname.space, fullname.local);
    };
}
function $fda437b40b08c6ad$var$attrConstant(name, value) {
    return function() {
        this.setAttribute(name, value);
    };
}
function $fda437b40b08c6ad$var$attrConstantNS(fullname, value) {
    return function() {
        this.setAttributeNS(fullname.space, fullname.local, value);
    };
}
function $fda437b40b08c6ad$var$attrFunction(name, value) {
    return function() {
        var v = value.apply(this, arguments);
        if (v == null) this.removeAttribute(name);
        else this.setAttribute(name, v);
    };
}
function $fda437b40b08c6ad$var$attrFunctionNS(fullname, value) {
    return function() {
        var v = value.apply(this, arguments);
        if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
        else this.setAttributeNS(fullname.space, fullname.local, v);
    };
}
function $fda437b40b08c6ad$export$2e2bcd8739ae039(name, value) {
    var fullname = $edfd550093082bc6$export$2e2bcd8739ae039(name);
    if (arguments.length < 2) {
        var node = this.node();
        return fullname.local ? node.getAttributeNS(fullname.space, fullname.local) : node.getAttribute(fullname);
    }
    return this.each((value == null ? fullname.local ? $fda437b40b08c6ad$var$attrRemoveNS : $fda437b40b08c6ad$var$attrRemove : typeof value === "function" ? fullname.local ? $fda437b40b08c6ad$var$attrFunctionNS : $fda437b40b08c6ad$var$attrFunction : fullname.local ? $fda437b40b08c6ad$var$attrConstantNS : $fda437b40b08c6ad$var$attrConstant)(fullname, value));
}


function $eab7317b4bab2edf$export$2e2bcd8739ae039(node) {
    return node.ownerDocument && node.ownerDocument.defaultView || node.document && node || node.defaultView; // node is a Document
}


function $d94089f91c15df8b$var$styleRemove(name) {
    return function() {
        this.style.removeProperty(name);
    };
}
function $d94089f91c15df8b$var$styleConstant(name, value, priority) {
    return function() {
        this.style.setProperty(name, value, priority);
    };
}
function $d94089f91c15df8b$var$styleFunction(name, value, priority) {
    return function() {
        var v = value.apply(this, arguments);
        if (v == null) this.style.removeProperty(name);
        else this.style.setProperty(name, v, priority);
    };
}
function $d94089f91c15df8b$export$2e2bcd8739ae039(name, value, priority) {
    return arguments.length > 1 ? this.each((value == null ? $d94089f91c15df8b$var$styleRemove : typeof value === "function" ? $d94089f91c15df8b$var$styleFunction : $d94089f91c15df8b$var$styleConstant)(name, value, priority == null ? "" : priority)) : $d94089f91c15df8b$export$5e3cec964f0b5efd(this.node(), name);
}
function $d94089f91c15df8b$export$5e3cec964f0b5efd(node, name) {
    return node.style.getPropertyValue(name) || $eab7317b4bab2edf$export$2e2bcd8739ae039(node).getComputedStyle(node, null).getPropertyValue(name);
}


function $09c129a968eeefc2$var$propertyRemove(name) {
    return function() {
        delete this[name];
    };
}
function $09c129a968eeefc2$var$propertyConstant(name, value) {
    return function() {
        this[name] = value;
    };
}
function $09c129a968eeefc2$var$propertyFunction(name, value) {
    return function() {
        var v = value.apply(this, arguments);
        if (v == null) delete this[name];
        else this[name] = v;
    };
}
function $09c129a968eeefc2$export$2e2bcd8739ae039(name, value) {
    return arguments.length > 1 ? this.each((value == null ? $09c129a968eeefc2$var$propertyRemove : typeof value === "function" ? $09c129a968eeefc2$var$propertyFunction : $09c129a968eeefc2$var$propertyConstant)(name, value)) : this.node()[name];
}


function $c0383476dc52626a$var$classArray(string) {
    return string.trim().split(/^|\s+/);
}
function $c0383476dc52626a$var$classList(node) {
    return node.classList || new $c0383476dc52626a$var$ClassList(node);
}
function $c0383476dc52626a$var$ClassList(node) {
    this._node = node;
    this._names = $c0383476dc52626a$var$classArray(node.getAttribute("class") || "");
}
$c0383476dc52626a$var$ClassList.prototype = {
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
function $c0383476dc52626a$var$classedAdd(node, names) {
    var list = $c0383476dc52626a$var$classList(node), i = -1, n = names.length;
    while(++i < n)list.add(names[i]);
}
function $c0383476dc52626a$var$classedRemove(node, names) {
    var list = $c0383476dc52626a$var$classList(node), i = -1, n = names.length;
    while(++i < n)list.remove(names[i]);
}
function $c0383476dc52626a$var$classedTrue(names) {
    return function() {
        $c0383476dc52626a$var$classedAdd(this, names);
    };
}
function $c0383476dc52626a$var$classedFalse(names) {
    return function() {
        $c0383476dc52626a$var$classedRemove(this, names);
    };
}
function $c0383476dc52626a$var$classedFunction(names, value) {
    return function() {
        (value.apply(this, arguments) ? $c0383476dc52626a$var$classedAdd : $c0383476dc52626a$var$classedRemove)(this, names);
    };
}
function $c0383476dc52626a$export$2e2bcd8739ae039(name, value) {
    var names = $c0383476dc52626a$var$classArray(name + "");
    if (arguments.length < 2) {
        var list = $c0383476dc52626a$var$classList(this.node()), i = -1, n = names.length;
        while(++i < n)if (!list.contains(names[i])) return false;
        return true;
    }
    return this.each((typeof value === "function" ? $c0383476dc52626a$var$classedFunction : value ? $c0383476dc52626a$var$classedTrue : $c0383476dc52626a$var$classedFalse)(names, value));
}


function $254b8a45c270ca3d$var$textRemove() {
    this.textContent = "";
}
function $254b8a45c270ca3d$var$textConstant(value) {
    return function() {
        this.textContent = value;
    };
}
function $254b8a45c270ca3d$var$textFunction(value) {
    return function() {
        var v = value.apply(this, arguments);
        this.textContent = v == null ? "" : v;
    };
}
function $254b8a45c270ca3d$export$2e2bcd8739ae039(value) {
    return arguments.length ? this.each(value == null ? $254b8a45c270ca3d$var$textRemove : (typeof value === "function" ? $254b8a45c270ca3d$var$textFunction : $254b8a45c270ca3d$var$textConstant)(value)) : this.node().textContent;
}


function $b6a03aaf18b82cb7$var$htmlRemove() {
    this.innerHTML = "";
}
function $b6a03aaf18b82cb7$var$htmlConstant(value) {
    return function() {
        this.innerHTML = value;
    };
}
function $b6a03aaf18b82cb7$var$htmlFunction(value) {
    return function() {
        var v = value.apply(this, arguments);
        this.innerHTML = v == null ? "" : v;
    };
}
function $b6a03aaf18b82cb7$export$2e2bcd8739ae039(value) {
    return arguments.length ? this.each(value == null ? $b6a03aaf18b82cb7$var$htmlRemove : (typeof value === "function" ? $b6a03aaf18b82cb7$var$htmlFunction : $b6a03aaf18b82cb7$var$htmlConstant)(value)) : this.node().innerHTML;
}


function $f826d3768bd640e1$var$raise() {
    if (this.nextSibling) this.parentNode.appendChild(this);
}
function $f826d3768bd640e1$export$2e2bcd8739ae039() {
    return this.each($f826d3768bd640e1$var$raise);
}


function $580c034a94e47c45$var$lower() {
    if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function $580c034a94e47c45$export$2e2bcd8739ae039() {
    return this.each($580c034a94e47c45$var$lower);
}




function $fda9367c6a588803$var$creatorInherit(name) {
    return function() {
        var document = this.ownerDocument, uri = this.namespaceURI;
        return uri === $15c1b0df3e13ed9a$export$201a3f7520ccc326 && document.documentElement.namespaceURI === $15c1b0df3e13ed9a$export$201a3f7520ccc326 ? document.createElement(name) : document.createElementNS(uri, name);
    };
}
function $fda9367c6a588803$var$creatorFixed(fullname) {
    return function() {
        return this.ownerDocument.createElementNS(fullname.space, fullname.local);
    };
}
function $fda9367c6a588803$export$2e2bcd8739ae039(name) {
    var fullname = $edfd550093082bc6$export$2e2bcd8739ae039(name);
    return (fullname.local ? $fda9367c6a588803$var$creatorFixed : $fda9367c6a588803$var$creatorInherit)(fullname);
}


function $1d0c0b7756bbc053$export$2e2bcd8739ae039(name) {
    var create = typeof name === "function" ? name : $fda9367c6a588803$export$2e2bcd8739ae039(name);
    return this.select(function() {
        return this.appendChild(create.apply(this, arguments));
    });
}




function $22fcc9c1cabe0784$var$constantNull() {
    return null;
}
function $22fcc9c1cabe0784$export$2e2bcd8739ae039(name, before) {
    var create = typeof name === "function" ? name : $fda9367c6a588803$export$2e2bcd8739ae039(name), select = before == null ? $22fcc9c1cabe0784$var$constantNull : typeof before === "function" ? before : $4f590ea611a05bef$export$2e2bcd8739ae039(before);
    return this.select(function() {
        return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
    });
}


function $ea0c50a7edb145ef$var$remove() {
    var parent = this.parentNode;
    if (parent) parent.removeChild(this);
}
function $ea0c50a7edb145ef$export$2e2bcd8739ae039() {
    return this.each($ea0c50a7edb145ef$var$remove);
}


function $4ed2c00d2b5a3648$var$selection_cloneShallow() {
    var clone = this.cloneNode(false), parent = this.parentNode;
    return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}
function $4ed2c00d2b5a3648$var$selection_cloneDeep() {
    var clone = this.cloneNode(true), parent = this.parentNode;
    return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}
function $4ed2c00d2b5a3648$export$2e2bcd8739ae039(deep) {
    return this.select(deep ? $4ed2c00d2b5a3648$var$selection_cloneDeep : $4ed2c00d2b5a3648$var$selection_cloneShallow);
}


function $213cb822c2fd339d$export$2e2bcd8739ae039(value) {
    return arguments.length ? this.property("__data__", value) : this.node().__data__;
}


function $51221d920397815f$var$contextListener(listener) {
    return function(event) {
        listener.call(this, event, this.__data__);
    };
}
function $51221d920397815f$var$parseTypenames(typenames) {
    return typenames.trim().split(/^|\s+/).map(function(t) {
        var name = "", i = t.indexOf(".");
        if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
        return {
            type: t,
            name: name
        };
    });
}
function $51221d920397815f$var$onRemove(typename) {
    return function() {
        var on = this.__on;
        if (!on) return;
        for(var j = 0, i = -1, m = on.length, o; j < m; ++j)if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) this.removeEventListener(o.type, o.listener, o.options);
        else on[++i] = o;
        if (++i) on.length = i;
        else delete this.__on;
    };
}
function $51221d920397815f$var$onAdd(typename, value, options) {
    return function() {
        var on = this.__on, o, listener = $51221d920397815f$var$contextListener(value);
        if (on) {
            for(var j = 0, m = on.length; j < m; ++j)if ((o = on[j]).type === typename.type && o.name === typename.name) {
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
        if (!on) this.__on = [
            o
        ];
        else on.push(o);
    };
}
function $51221d920397815f$export$2e2bcd8739ae039(typename, value, options) {
    var typenames = $51221d920397815f$var$parseTypenames(typename + ""), i, n = typenames.length, t;
    if (arguments.length < 2) {
        var on = this.node().__on;
        if (on) for(var j = 0, m = on.length, o; j < m; ++j)for(i = 0, o = on[j]; i < n; ++i){
            if ((t = typenames[i]).type === o.type && t.name === o.name) return o.value;
        }
        return;
    }
    on = value ? $51221d920397815f$var$onAdd : $51221d920397815f$var$onRemove;
    for(i = 0; i < n; ++i)this.each(on(typenames[i], value, options));
    return this;
}



function $b78a95ba28249439$var$dispatchEvent(node, type, params) {
    var window = $eab7317b4bab2edf$export$2e2bcd8739ae039(node), event = window.CustomEvent;
    if (typeof event === "function") event = new event(type, params);
    else {
        event = window.document.createEvent("Event");
        if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;
        else event.initEvent(type, false, false);
    }
    node.dispatchEvent(event);
}
function $b78a95ba28249439$var$dispatchConstant(type, params) {
    return function() {
        return $b78a95ba28249439$var$dispatchEvent(this, type, params);
    };
}
function $b78a95ba28249439$var$dispatchFunction(type, params) {
    return function() {
        return $b78a95ba28249439$var$dispatchEvent(this, type, params.apply(this, arguments));
    };
}
function $b78a95ba28249439$export$2e2bcd8739ae039(type, params) {
    return this.each((typeof params === "function" ? $b78a95ba28249439$var$dispatchFunction : $b78a95ba28249439$var$dispatchConstant)(type, params));
}


function* $6d68d7a5dfaebc09$export$2e2bcd8739ae039() {
    for(var groups = this._groups, j = 0, m = groups.length; j < m; ++j){
        for(var group = groups[j], i = 0, n = group.length, node; i < n; ++i)if (node = group[i]) yield node;
    }
}


var $47f0ff7527d817e6$export$e8e78c978b129247 = [
    null
];
function $47f0ff7527d817e6$export$52baac22726c72bf(groups, parents) {
    this._groups = groups;
    this._parents = parents;
}
function $47f0ff7527d817e6$var$selection() {
    return new $47f0ff7527d817e6$export$52baac22726c72bf([
        [
            document.documentElement
        ]
    ], $47f0ff7527d817e6$export$e8e78c978b129247);
}
function $47f0ff7527d817e6$var$selection_selection() {
    return this;
}
$47f0ff7527d817e6$export$52baac22726c72bf.prototype = $47f0ff7527d817e6$var$selection.prototype = {
    constructor: $47f0ff7527d817e6$export$52baac22726c72bf,
    select: $dab03710c0a0451f$export$2e2bcd8739ae039,
    selectAll: $f30f5dd19c67a4c1$export$2e2bcd8739ae039,
    selectChild: $9a8954662f3b55da$export$2e2bcd8739ae039,
    selectChildren: $2306b1a2fd66549a$export$2e2bcd8739ae039,
    filter: $81f52857269808bb$export$2e2bcd8739ae039,
    data: $b1f902012fae0c37$export$2e2bcd8739ae039,
    enter: $05992484860795d1$export$2e2bcd8739ae039,
    exit: $89bc1abb0fb02bc8$export$2e2bcd8739ae039,
    join: $3cd2d8246dadad45$export$2e2bcd8739ae039,
    merge: $14fd56101d35ce5c$export$2e2bcd8739ae039,
    selection: $47f0ff7527d817e6$var$selection_selection,
    order: $bea68a5a8e60349e$export$2e2bcd8739ae039,
    sort: $a68c5ea1f0ea990f$export$2e2bcd8739ae039,
    call: $0bd409e62410acd0$export$2e2bcd8739ae039,
    nodes: $75ef816dfb407940$export$2e2bcd8739ae039,
    node: $32beb5e8d7d9e650$export$2e2bcd8739ae039,
    size: $443db4f3d9afd0a6$export$2e2bcd8739ae039,
    empty: $fe407d70e508eb9b$export$2e2bcd8739ae039,
    each: $2f8eba843281fe2a$export$2e2bcd8739ae039,
    attr: $fda437b40b08c6ad$export$2e2bcd8739ae039,
    style: $d94089f91c15df8b$export$2e2bcd8739ae039,
    property: $09c129a968eeefc2$export$2e2bcd8739ae039,
    classed: $c0383476dc52626a$export$2e2bcd8739ae039,
    text: $254b8a45c270ca3d$export$2e2bcd8739ae039,
    html: $b6a03aaf18b82cb7$export$2e2bcd8739ae039,
    raise: $f826d3768bd640e1$export$2e2bcd8739ae039,
    lower: $580c034a94e47c45$export$2e2bcd8739ae039,
    append: $1d0c0b7756bbc053$export$2e2bcd8739ae039,
    insert: $22fcc9c1cabe0784$export$2e2bcd8739ae039,
    remove: $ea0c50a7edb145ef$export$2e2bcd8739ae039,
    clone: $4ed2c00d2b5a3648$export$2e2bcd8739ae039,
    datum: $213cb822c2fd339d$export$2e2bcd8739ae039,
    on: $51221d920397815f$export$2e2bcd8739ae039,
    dispatch: $b78a95ba28249439$export$2e2bcd8739ae039,
    [Symbol.iterator]: $6d68d7a5dfaebc09$export$2e2bcd8739ae039
};
var $47f0ff7527d817e6$export$2e2bcd8739ae039 = $47f0ff7527d817e6$var$selection;


function $16996812f6dbb2fd$export$2e2bcd8739ae039(selector) {
    return typeof selector === "string" ? new $47f0ff7527d817e6$export$52baac22726c72bf([
        [
            document.querySelector(selector)
        ]
    ], [
        document.documentElement
    ]) : new $47f0ff7527d817e6$export$52baac22726c72bf([
        [
            selector
        ]
    ], $47f0ff7527d817e6$export$e8e78c978b129247);
}



class $a0b961a8b8295e95$var$SVGInteractor {
    /**
   * Set the specification for this class to refer to.
   *
   * @param {Object} specification
   */ setSpecification(specification) {
        this.specification = specification;
        const styles = $7f56df25e3cef9e2$export$9c7342f1c4b9b83(specification);
        this.svg.style.width = styles.width;
        this.svg.style.height = styles.height;
        this.svg.style.margin = styles.margin;
        this.initialX = undefined; // used for updating labels
        this.initialY = undefined;
        $16996812f6dbb2fd$export$2e2bcd8739ae039(this._labelMarker).selectAll("*").remove();
        for (const _ of this.specification.labels || [])$16996812f6dbb2fd$export$2e2bcd8739ae039(this._labelMarker).append("text");
    }
    /**
   * Add svg elements to the DOM
   */ init() {
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
   */ updateView(currentXRange, currentYRange, width, height) {
        this.currentXRange = currentXRange;
        this.currentYRange = currentYRange;
        this.width = width;
        this.height = height;
        if (this.currentXRange) {
            this.xAxis = this._calculateAxis("x", this.specification.xAxis, this.specification, $7f56df25e3cef9e2$export$503bd171b936d0c1("x", this.specification), this.xAxisAnchor);
            if (this.specification.labels) this.updateLabels();
        }
        if (this.xAxis) this.xAxisAnchor.call(this.xAxis);
        if (this.currentYRange) this.yAxis = this._calculateAxis("y", this.specification.yAxis, this.specification, $7f56df25e3cef9e2$export$503bd171b936d0c1("y", this.specification), this.yAxisAnchor);
        if (this.yAxis) this.yAxisAnchor.call(this.yAxis);
    }
    updateLabels() {
        if (!this.initialX && this.specification.labels) this.initialX = this.specification.labels.map((label)=>this._calculateViewportSpotInverse(label.x, label.y)[0]
        );
        if (!this.initialY && this.specification.labels) this.initialY = this.specification.labels.map((label)=>this._calculateViewportSpotInverse(label.x, label.y)[1]
        );
        $16996812f6dbb2fd$export$2e2bcd8739ae039(this._labelMarker).selectAll("text").data(this.specification.labels).text((d)=>d.text
        ).attr("x", (d, i)=>{
            if (d.fixedX) return this.initialX[i];
            return this._calculateViewportSpotInverse(d.x, d.y)[0];
        }).attr("y", (d, i)=>{
            if (d.fixedY) return this.initialY[i];
            return this._calculateViewportSpotInverse(d.x, d.y)[1];
        }).each(function(d) {
            // Set any possible svg properties specified in label
            for(const property in d){
                if ([
                    "x",
                    "y",
                    "text"
                ].includes(property)) continue;
                $16996812f6dbb2fd$export$2e2bcd8739ae039(this).attr(property, d[property]);
            }
        });
    }
    _calculateAxis(dimension, orientation, specification, genomeScale, anchor) {
        let axis, domain, range;
        if (dimension === "x") {
            domain = this.currentXRange;
            range = [
                0,
                this.width
            ];
            switch(orientation){
                case "none":
                    anchor.attr("transform", `translate(-1000000, -1000000)`);
                    return null;
                case "top":
                    axis = $f289c843701a4cef$export$59b8cfab074bdeb1();
                    anchor.attr("transform", `translate(0, 0)`);
                    break;
                case "center":
                    axis = $f289c843701a4cef$export$e5cb22533a15e72e();
                    anchor.attr("transform", `translate(0, ${this.height / 2})`);
                    break;
                case "zero":
                    const yScale = $46dd7dd0ac807af9$export$2e2bcd8739ae039().domain(this.currentYRange).range([
                        this.height,
                        0
                    ]);
                    axis = $f289c843701a4cef$export$e5cb22533a15e72e();
                    anchor.attr("transform", `translate(0, ${yScale(0)})`);
                    break;
                case "bottom":
                default:
                    axis = $f289c843701a4cef$export$e5cb22533a15e72e();
                    anchor.attr("transform", `translate(0, ${this.height})`);
                    break;
            }
        }
        if (dimension === "y") {
            domain = this.currentYRange;
            range = [
                this.height,
                0
            ];
            switch(orientation){
                case "none":
                    anchor.attr("transform", `translate(-1000000, -1000000)`);
                    return null;
                case "center":
                    axis = $f289c843701a4cef$export$b0d2e24dc4f898f0();
                    anchor.attr("transform", `translate(${this.width / 2}, 0)`);
                    break;
                case "right":
                    axis = $f289c843701a4cef$export$b0d2e24dc4f898f0();
                    anchor.attr("transform", `translate(${this.width}, 0)`);
                    break;
                case "zero":
                    const xScale = $46dd7dd0ac807af9$export$2e2bcd8739ae039().domain(this.currentXRange).range([
                        0,
                        this.width
                    ]);
                    axis = $f289c843701a4cef$export$2749afb169a520d2();
                    anchor.attr("transform", `translate(${xScale(0)}, 0)`);
                    break;
                case "left":
                default:
                    axis = $f289c843701a4cef$export$2749afb169a520d2();
                    anchor.attr("transform", `translate(0, 0)`);
                    break;
            }
        }
        let genomic = false;
        for (const track of specification.tracks)if (track[dimension].type && track[dimension].type.includes("genomic")) genomic = true;
        if (!genomic) return axis.scale($46dd7dd0ac807af9$export$2e2bcd8739ae039().domain(domain).range(range));
        let tickInfo;
        if (dimension === "x") tickInfo = genomeScale.getTickCoordsAndLabels(domain[0], domain[1]);
        else tickInfo = genomeScale.getTickCoordsAndLabels(range[0], range[1]);
        return axis.scale($46dd7dd0ac807af9$export$2e2bcd8739ae039().domain(domain).range(range)).tickValues(tickInfo.tickCoords).tickFormat((_, index)=>tickInfo.tickLabels[index]
        );
    }
    /**
   * Updates user selection view if they have selected a box
   */ _updateBoxSelectView(points) {
        if (points.length !== 4) return;
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
   */ updateSelectView(points) {
        if (points.length === 4) {
            this._updateBoxSelectView(points);
            return;
        }
        if (points.length < 6) {
            this._selectMarker.setAttribute("points", "");
            return;
        }
        let pointAttr = "";
        for(let i = 0; i < points.length; i += 2){
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
   */ _calculateViewportSpotInverse(viewportX, viewportY) {
        const inverseScaleX = $7f56df25e3cef9e2$export$dcdf75081b88279d(this.currentXRange, [
            0,
            this.width
        ]);
        // Flipped for Y since canvas using typical graphics coordinates but GPU clipspace is typical cartesian coordinates
        const inverseScaleY = $7f56df25e3cef9e2$export$dcdf75081b88279d(this.currentYRange, [
            this.height,
            0
        ]);
        return [
            inverseScaleX(viewportX),
            inverseScaleY(viewportY)
        ];
    }
    /**
   * A class used to illustrate state of the visualization on the main thread such as
   * selection or axis.
   *
   * @param {SVGElement} svg container for all svg elements
   */ constructor(svg){
        this.svg = svg;
        this.d3SVG = $16996812f6dbb2fd$export$2e2bcd8739ae039(this.svg);
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
}
var $a0b961a8b8295e95$export$2e2bcd8739ae039 = $a0b961a8b8295e95$var$SVGInteractor;


/**
 * event.layerX and event.layerY are deprecated. We will use them if they are on the event, but
 * if not we will use a manual calculation.
 *
 * @param {Event} event
 * @returns layerX and layerY, coordinates of event with origin at top right corner of bounding box
 */ const $517b0de0b59a1455$var$getLayerXandYFromEvent = (event)=>{
    if (event.layerX !== undefined && event.layerY !== undefined) return [
        event.layerX,
        event.layerY
    ];
    const bbox = event.target.getBoundingClientRect();
    const x = event.clientX - bbox.left;
    const y = event.clientY - bbox.top;
    return [
        x,
        y
    ];
};
class $517b0de0b59a1455$var$MouseReader {
    /**
   * Set the specification of the mouse reader and the svg interaction
   * @param {Object} specification
   */ setSpecification(specification) {
        const styles = $7f56df25e3cef9e2$export$9c7342f1c4b9b83(specification);
        this.element.style.width = styles.width;
        this.element.style.height = styles.height;
        this.element.style.margin = styles.margin;
        this.viewport = $7f56df25e3cef9e2$export$9e48347377e521b0(specification);
        this.SVGInteractor.setSpecification(specification);
        this._updateSVG();
    }
    /**
   * Set the viewport in the format mouseReader.viewport = [minX, maxX, minY, maxY].
   * Mostly used to make WebGLVis.setViewOptions simpler.
   */ set viewport(toSet) {
        this.minX = toSet[0];
        this.maxX = toSet[1];
        this.minY = toSet[2];
        this.maxY = toSet[3];
        this.currentXRange = [
            this.minX,
            this.maxX
        ];
        this.currentYRange = [
            this.minY,
            this.maxY
        ];
    }
    /**
   * Init the mouse reader by adding its elements to DOM and adding event handlers
   */ init() {
        this.width = this.element.clientWidth;
        this.height = this.element.clientHeight;
        this.element.parentElement.appendChild(this.SVGInteractor.svg);
        this.SVGInteractor.init();
        this._updateSVG();
        this.element.addEventListener("wheel", this._onWheel.bind(this), false);
        let mouseDown = false;
        this.element.addEventListener("mousedown", (event)=>{
            mouseDown = true;
            switch(this.tool){
                case "pan":
                    break;
                case "box":
                case "lasso":
                    this._currentSelectionPoints = [
                        ...this._calculateViewportSpot(...$517b0de0b59a1455$var$getLayerXandYFromEvent(event)), 
                    ];
                    break;
            }
        }, false);
        this.element.addEventListener("mousemove", (event)=>{
            if (!mouseDown) return;
            switch(this.tool){
                case "pan":
                    this._onPan(event);
                    break;
                case "box":
                    this._currentSelectionPoints = this._currentSelectionPoints.slice(0, 2).concat(this._calculateViewportSpot(...$517b0de0b59a1455$var$getLayerXandYFromEvent(event)));
                    this.element.parentElement.dispatchEvent(new CustomEvent("onSelection", {
                        detail: {
                            bounds: this._currentSelectionPoints,
                            type: this.tool
                        }
                    }));
                    break;
                case "lasso":
                    this._currentSelectionPoints.push(...this._calculateViewportSpot(...$517b0de0b59a1455$var$getLayerXandYFromEvent(event)));
                    this.element.parentElement.dispatchEvent(new CustomEvent("onSelection", {
                        detail: {
                            bounds: this._currentSelectionPoints,
                            type: this.tool
                        }
                    }));
                    break;
                case "tooltip":
                    break;
            }
            this._updateSVG();
        }, false);
        this.element.addEventListener("mouseup", (event)=>{
            mouseDown = false;
            switch(this.tool){
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
        this.element.addEventListener("mouseleave", ()=>{
            switch(this.tool){
                case "pan":
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
   */ getViewport() {
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
   */ _onWheel(event) {
        event.preventDefault();
        if (!this.lockedX) {
            const previousX = [
                ...this.currentXRange
            ]; // ... to avoid aliasing
            const t = -event.wheelDelta / 1000;
            const inDataSpace = this._calculateViewportSpot(...$517b0de0b59a1455$var$getLayerXandYFromEvent(event));
            this.currentXRange[0] = t * inDataSpace[0] + (1 - t) * this.currentXRange[0];
            this.currentXRange[1] = t * inDataSpace[0] + (1 - t) * this.currentXRange[1];
            this.currentXRange[0] = Math.max(this.currentXRange[0], this.minX);
            this.currentXRange[1] = Math.min(this.currentXRange[1], this.maxX);
            if (!this._validateXRange()) // Zoom in limit
            this.currentXRange = previousX;
        }
        if (!this.lockedY) {
            const previousY = [
                ...this.currentYRange
            ];
            const t = -event.wheelDelta / 1000;
            const inDataSpace = this._calculateViewportSpot(...$517b0de0b59a1455$var$getLayerXandYFromEvent(event));
            this.currentYRange[0] = t * inDataSpace[1] + (1 - t) * this.currentYRange[0];
            this.currentYRange[1] = t * inDataSpace[1] + (1 - t) * this.currentYRange[1];
            this.currentYRange[0] = Math.max(this.currentYRange[0], this.minY);
            this.currentYRange[1] = Math.min(this.currentYRange[1], this.maxY);
            if (!this._validateYRange()) // Zoom in limit
            this.currentYRange = previousY;
        }
        this.element.parentElement.dispatchEvent(new CustomEvent(event.wheelDelta < 0 ? "zoomIn" : "zoomOut", {
            detail: {
                viewport: this.getViewport(),
                type: this.tool
            }
        }));
        this.handler.sendDrawerState(this.getViewport());
        this._updateSVG();
    }
    /**
   * Method to handle a clicked mouse moving around canvas to pan around canvas.
   *
   * @param {MouseEvent} event from "mousemove" event
   */ _onPan(event) {
        if (!this.lockedX) {
            const previousX = [
                ...this.currentXRange
            ]; // ... to avoid aliasing
            const xDampen = (this.currentXRange[1] - this.currentXRange[0]) / 1000;
            this.currentXRange[0] -= event.movementX * xDampen;
            this.currentXRange[1] -= event.movementX * xDampen;
            this.currentXRange[0] = Math.max(this.currentXRange[0], this.minX);
            this.currentXRange[1] = Math.min(this.currentXRange[1], this.maxX);
            if (!this._validateXRange()) this.currentXRange = previousX;
        }
        if (!this.lockedY) {
            const previousY = [
                ...this.currentYRange
            ];
            const yDampen = (this.currentYRange[1] - this.currentYRange[0]) / 1000;
            this.currentYRange[0] += event.movementY * yDampen;
            this.currentYRange[1] += event.movementY * yDampen;
            this.currentYRange[0] = Math.max(this.currentYRange[0], this.minY);
            this.currentYRange[1] = Math.min(this.currentYRange[1], this.maxY);
            if (!this._validateYRange()) this.currentYRange = previousY;
        }
        this.element.parentElement.dispatchEvent(new CustomEvent("pan", {
            detail: {
                viewport: this.getViewport(),
                type: this.tool
            }
        }));
        this.handler.sendDrawerState(this.getViewport());
        this._updateSVG();
    }
    /**
   * Checks if this.currentXRange is valid with first element less than second
   * and if viewport zoom is not above webgl max zoom.
   *
   * @return true if range is valid, false otherwise
   */ _validateXRange() {
        return this.currentXRange[1] >= this.currentXRange[0];
    }
    /**
   * Checks if this.currentYRange is valid with first element less than second
   * and if viewport zoom is not above webgl max zoom.
   *
   * @return true if range is valid, false otherwise
   */ _validateYRange() {
        return this.currentYRange[1] >= this.currentYRange[0];
    }
    /**
   * Updates the DOM component used to show user selection or axis.
   * Calls methods from SVGInteractor.
   */ _updateSVG() {
        this.SVGInteractor.updateView(this.currentXRange, this.currentYRange, this.width, this.height);
        this.SVGInteractor.updateSelectView(this._currentSelectionPoints);
    }
    /**
   * Executes when user has confirmed selection points (typically by releasing mouse)
   */ _onSelect() {
        this.handler.selectPoints(this._currentSelectionPoints);
    }
    /**
   * Calculate the location on the real coordinate space a point on the canvas corresponds to.
   *
   * @param {Float} canvasX likely from event.layerX or getLayerXandYFromEvent
   * @param {Float} canvasY likely from event.layerY or getLayerXandYFromEvent
   * @returns viewport coordinate as array
   */ _calculateViewportSpot(canvasX, canvasY) {
        const scaleX = $7f56df25e3cef9e2$export$dcdf75081b88279d([
            0,
            this.width
        ], this.currentXRange);
        // Flipped for Y since canvas using typical graphics coordinates but GPU clipspace is typical cartesian coordinates
        const scaleY = $7f56df25e3cef9e2$export$dcdf75081b88279d([
            this.height,
            0
        ], this.currentYRange);
        return [
            scaleX(canvasX),
            scaleY(canvasY)
        ];
    }
    /**
   *
   * @param {HTMLElement} element meant to read mouse events, necessary since OffscreenCanvas cannot read DOM events
   * @param {WebGLVis} handler WebGLVis that is using this mousereader
   */ constructor(element, handler){
        this.element = element;
        this.element.style.position = "absolute";
        this.element.style.width = "100%";
        this.element.style.height = "100%";
        this.handler = handler;
        this._currentSelectionPoints = [];
        this.tool = "pan";
        // Initializing elements to show user their current selection
        this.SVGInteractor = new $a0b961a8b8295e95$export$2e2bcd8739ae039(document.createElementNS("http://www.w3.org/2000/svg", "svg"));
    }
}
var $517b0de0b59a1455$export$2e2bcd8739ae039 = $517b0de0b59a1455$var$MouseReader;


var $b9093140ea6d98ca$export$9eeb22c0bba4ed5e;
var $b9093140ea6d98ca$export$b0184c04dbb75cbd;
var $b9093140ea6d98ca$export$93b9911b232b246c;
var $b9093140ea6d98ca$export$2191b9da168c6cf0;
var $b9093140ea6d98ca$export$44dde8d2b17fc96a;
var $b9093140ea6d98ca$export$fa2f6d6458e494ac;
var $b9093140ea6d98ca$export$c87d910e63d22ed6;
var $b9093140ea6d98ca$export$a22775fa5e2eebd9;
'use strict';

var $b9093140ea6d98ca$var$Validator = $b9093140ea6d98ca$export$9eeb22c0bba4ed5e = (parcelRequire("kAoUr"));

$b9093140ea6d98ca$export$b0184c04dbb75cbd = (parcelRequire("hpI3p")).ValidatorResult;

$b9093140ea6d98ca$export$93b9911b232b246c = (parcelRequire("hpI3p")).ValidatorResultError;

$b9093140ea6d98ca$export$2191b9da168c6cf0 = (parcelRequire("hpI3p")).ValidationError;

$b9093140ea6d98ca$export$44dde8d2b17fc96a = (parcelRequire("hpI3p")).SchemaError;

$b9093140ea6d98ca$export$fa2f6d6458e494ac = (parcelRequire("74FPd")).SchemaScanResult;

$b9093140ea6d98ca$export$c87d910e63d22ed6 = (parcelRequire("74FPd")).scan;
$b9093140ea6d98ca$export$a22775fa5e2eebd9 = function(instance, schema, options) {
    var v = new $b9093140ea6d98ca$var$Validator();
    return v.validate(instance, schema, options);
};


var $f87685d8ddd4ce42$exports = {};
$f87685d8ddd4ce42$exports = JSON.parse("{\"schema\":\"https://json-schema.org/draft/2020-12/schema\",\"id\":\"/visualization\",\"title\":\"Visualization\",\"description\":\"A webgl visualization made of a sequence of tracks\",\"type\":\"object\",\"required\":[\"tracks\"],\"properties\":{\"labels\":{\"description\":\"set of labels to display on visualization, properties of labels can be any valid attribute for an svg text element\",\"examples\":[{\"x\":100,\"y\":200,\"text\":\"my favorite data point\",\"rotate\":-90},{\"x\":-1.1,\"y\":0,\"text\":\"Track 1\",\"color\":\"red\",\"fixedX\":true}],\"type\":\"array\",\"items\":{\"properties\":{\"x\":{\"description\":\"x coordinate of label with respect to data coordinates, should be on scale with [-1, 1] if x dimension is categorical or genomic\",\"type\":\"number\"},\"y\":{\"description\":\"y coordinate of label with respect to data coordinates, should be on scale with [-1, 1] if y dimension is categorical or genomic\",\"type\":\"number\"},\"fixedX\":{\"description\":\"fix the x coordinate of the label, so it does not move when panning/zooming left or right\",\"type\":\"boolean\"},\"fixedY\":{\"description\":\"fix the y coordinate of the label, so it does not move when panning/zooming up or down\",\"type\":\"boolean\"},\"required\":[\"x\",\"y\"]}}},\"xAxis\":{\"description\":\"location of x-axis\",\"enum\":[\"bottom\",\"top\",\"center\",\"none\",\"zero\"]},\"yAxis\":{\"description\":\"location of y-axis\",\"enum\":[\"left\",\"right\",\"center\",\"none\",\"zero\"]},\"tracks\":{\"description\":\"A track is a map from the data to a sequence of marks\",\"type\":\"array\",\"items\":{\"$ref\":\"/track\"}},\"defaultData\":{\"description\":\"A string of a csv href containing data or an object of inline data where each key is a column of values\",\"examples\":[\"http://example.com/data.csv\",{\"day\":[1,2],\"price\":[10,20]}],\"type\":[\"string\",\"object\"],\"additionalProperties\":{\"type\":\"array\"},\"minProperties\":1},\"width\":{\"description\":\"Width of the visualization in css units\",\"examples\":[\"400px\",\"100%\",\"10em\",\"600\"],\"type\":\"string\"},\"height\":{\"description\":\"Height of the visualization in css units\",\"examples\":[\"400px\",\"100%\",\"10em\",\"600\"],\"type\":\"string\"},\"margins\":{\"description\":\"Margins for the visualization; gives more space for labels and axis to render\",\"properties\":{\"top\":{\"description\":\"Top margin of the visualization in css units\",\"type\":\"string\",\"examples\":[\"100px\",\"5%\",\"5em\"]},\"bottom\":{\"description\":\"Bottom margin of the visualization in css units\",\"type\":\"string\",\"examples\":[\"100px\",\"5%\",\"5em\"]},\"left\":{\"description\":\"Left margin of the visualization in css units\",\"type\":\"string\",\"examples\":[\"100px\",\"5%\",\"5em\"]},\"right\":{\"description\":\"Right margin of the visualization in css units\",\"type\":\"string\",\"examples\":[\"100px\",\"5%\",\"5em\"]}}}},\"allOf\":[{\"description\":\"if there is no default data for the visualization require each track to have data property\",\"if\":{\"not\":{\"required\":[\"defaultData\"]}},\"then\":{\"properties\":{\"tracks\":{\"items\":{\"required\":[\"data\"]}}}},\"else\":{}}]}");


var $9101dbb38feb7b6a$exports = {};
$9101dbb38feb7b6a$exports = JSON.parse("{\"schema\":\"https://json-schema.org/draft/2020-12/schema\",\"id\":\"/track\",\"title\":\"Track\",\"description\":\"A track to visualize\",\"type\":\"object\",\"required\":[\"mark\",\"x\",\"y\"],\"properties\":{\"data\":{\"description\":\"A string of a csv href containing data or an object of inline data where each key is an array of a data column\",\"type\":[\"string\",\"object\"],\"additionalProperties\":{\"type\":\"array\"},\"minProperties\":1},\"mark\":{\"description\":\"type of mark to visualize\",\"enum\":[\"point\",\"line\",\"area\",\"rect\",\"tick\",\"arc\"]},\"tooltips\":{\"description\":\"a number between 0 and 1 where 0 is no tooltips, 1 is always show, and, for example, 0.1 would be show tooltips when zoomed in to 10% of the domain\",\"type\":\"number\",\"minimum\":0,\"maximum\":1},\"x\":{\"description\":\"define the x coordinates of the marks\",\"type\":\"object\",\"allOf\":[{\"$ref\":\"/channel\"}],\"examples\":[{\"type\":\"genomic\",\"chrAttribute\":\"chr\",\"geneAttribute\":\"gene\",\"domain\":[\"chr2:100\",\"chr2:300\"]}]},\"y\":{\"description\":\"define the y coordinates of the marks\",\"type\":\"object\",\"allOf\":[{\"$ref\":\"/channel\"}],\"examples\":[{\"type\":\"quantitative\",\"attribute\":\"time\",\"domain\":[0,10]},{\"attribute\":\"sample\",\"type\":\"categorical\",\"cardinality\":10}]},\"color\":{\"description\":\"define the color of the marks, for fixed values can be any css3 color descriptor or a number that translates to a color in hex\",\"type\":\"object\",\"properties\":{\"colorScheme\":{\"description\":\"d3 continuous color scheme to use, see d3-scale-chromatic for options\",\"examples\":[\"interpolateBlues\",\"interpolateReds\",\"interpolateRainbow\"],\"type\":\"string\"}},\"examples\":[{\"value\":\"red\"},{\"value\":16581375},{\"attribute\":\"sample\",\"type\":\"categorical\",\"cardinality\":10,\"colorScheme\":\"interpolateBuGn\"}],\"allOf\":[{\"$ref\":\"/channel\"}]},\"size\":{\"description\":\"size of the mark, used only when mark type is point, use width or height for other mark types. The units of this channel correspond to 1/200th of the canvas e.g. a size of 100 is half the canvas.\",\"type\":\"object\",\"properties\":{\"maxSize\":{\"type\":\"number\"},\"minSize\":{\"type\":\"number\"},\"value\":{\"type\":\"number\"}},\"examples\":[{\"attribute\":\"population\",\"type\":\"quantitative\",\"domain\":[0,1000],\"maxSize\":10,\"minSize\":1}],\"allOf\":[{\"$ref\":\"/channel\"}]},\"width\":{\"description\":\"width of the mark, used for rect, arc, and tick marks only. The units of this channel correspond to 1/200th of the width of the canvas. This channel may be a genomic range type for arc tracks. If both height and width are specified for a tick mark, only width is used.\",\"type\":\"object\",\"properties\":{\"maxWidth\":{\"type\":\"number\"},\"minWidth\":{\"type\":\"number\"},\"value\":{\"type\":\"number\"}},\"allOf\":[{\"$ref\":\"/channel\"}]},\"height\":{\"description\":\"height of the mark, used for rect, arc, and tick marks only. The units of this channel correspond to 1/200th of the height of the canvas. This channel may be a genomic range type for arc tracks.\",\"type\":\"object\",\"properties\":{\"maxHeight\":{\"type\":\"number\"},\"minHeight\":{\"type\":\"number\"},\"value\":{\"type\":\"number\"}},\"allOf\":[{\"$ref\":\"/channel\"}]},\"opacity\":{\"description\":\"opacity of the mark, compatible with all mark types\",\"type\":\"object\",\"properties\":{\"minOpacity\":{\"type\":\"number\",\"minimum\":0,\"exclusiveMaximum\":1},\"value\":{\"type\":\"number\"}},\"allOf\":[{\"$ref\":\"/channel\"}]},\"shape\":{\"description\":\"shape of the mark, used only for point marks\",\"type\":\"object\",\"properties\":{\"value\":{\"enum\":[\"dot\",\"circle\",\"diamond\",\"triangle\"]}},\"allOf\":[{\"$ref\":\"/channel\"}]}}}");


var $66cd18a17a420676$exports = {};
$66cd18a17a420676$exports = JSON.parse("{\"schema\":\"https://json-schema.org/draft/2020-12/schema\",\"id\":\"/channel\",\"title\":\"Channel\",\"description\":\"A channel of a visualization\",\"type\":\"object\",\"properties\":{\"type\":{\"description\":\"type of attribute, genomic range only compatible with x, y, width and height\",\"enum\":[\"quantitative\",\"categorical\",\"genomic\",\"genomicRange\",\"inline\"]},\"attribute\":{\"description\":\"column of data frame to use for mapping channel\",\"type\":\"string\"},\"value\":{\"description\":\"if fixing a channel, specify with value\",\"type\":[\"string\",\"number\",\"boolean\"]},\"domain\":{\"description\":\"domain of attribute to use for mapping, required if type is quantitative\",\"type\":\"array\"},\"cardinality\":{\"description\":\"number of attribute values to use for mapping, required if type is categorical\",\"type\":\"integer\"},\"chrAttribute\":{\"description\":\"if type is genomic or genomicRange, the attribute that contains the chromosome id\",\"type\":\"string\"},\"startAttribute\":{\"description\":\"if type is genomicRange, the attribute that contains the start of the range\",\"type\":\"string\"},\"endAttribute\":{\"description\":\"if type is genomicRange, the attribute that contains the end of the range\",\"type\":\"string\"},\"genome\":{\"description\":\"genome being mapped\",\"enum\":[\"hg38\",\"hg19\",\"mm39\"]}},\"allOf\":[{\"description\":\"If type is genomic, require genomic attributes and forbid regular attributes\",\"anyOf\":[{\"not\":{\"properties\":{\"type\":{\"const\":\"genomic\"}},\"required\":[\"type\"]}},{\"required\":[\"chrAttribute\",\"geneAttribute\",\"genome\"],\"not\":{\"required\":[\"attribute\",\"startAttribute\",\"endAttribute\"]},\"properties\":{\"domain\":{\"items\":[{\"type\":\"string\",\"pattern\":\"chr(\\\\d{1,2}|[XY]):\\\\d+\"},{\"type\":\"string\",\"pattern\":\"chr(\\\\d{1,2}|[XY]):\\\\d+\"}]}}}]},{\"description\":\"If type is genomicRange, require genomicRange attributes and forbid regular attribute\",\"anyOf\":[{\"not\":{\"properties\":{\"type\":{\"const\":\"genomicRange\"}},\"required\":[\"type\"]}},{\"required\":[\"chrAttribute\",\"startAttribute\",\"endAttribute\",\"genome\"],\"not\":{\"required\":[\"attribute\",\"geneAttribute\"]},\"properties\":{\"domain\":{\"items\":[{\"type\":\"string\",\"pattern\":\"chr(\\\\d{1,2}|[XY]):\\\\d+\"},{\"type\":\"string\",\"pattern\":\"chr(\\\\d{1,2}|[XY]):\\\\d+\"}]}}}]},{\"description\":\"If type is quantitative, require domain and forbid cardinality\",\"anyOf\":[{\"not\":{\"properties\":{\"type\":{\"const\":\"quantitative\"}},\"required\":[\"type\"]}},{\"required\":[\"domain\"],\"properties\":{\"domain\":{\"items\":[{\"type\":\"number\"},{\"type\":\"number\"}]}},\"not\":{\"required\":[\"cardinality\"]}}]},{\"description\":\"If type is categorical, require cardinality and forbid domain\",\"anyOf\":[{\"not\":{\"properties\":{\"type\":{\"const\":\"categorical\"}},\"required\":[\"type\"]}},{\"required\":[\"cardinality\"],\"not\":{\"required\":[\"domain\"]}}]},{\"description\":\"If value is defined, disallow other attributes\",\"anyOf\":[{\"not\":{\"properties\":{\"value\":{\"not\":{\"type\":\"null\"}}},\"required\":[\"value\"]}},{\"allOf\":[{\"not\":{\"required\":[\"attribute\"]}},{\"not\":{\"required\":[\"type\"]}},{\"not\":{\"required\":[\"domain\"]}},{\"not\":{\"required\":[\"cardinality\"]}}]}]},{\"description\":\"If value is not defined, require attribute or genomic attributes\",\"anyOf\":[{\"not\":{\"properties\":{\"value\":{\"type\":\"null\"}}}},{\"oneOf\":[{\"required\":[\"attribute\"]},{\"required\":[\"chrAttribute\",\"genome\"]}]}]}]}");


const $629a5a981bde8539$var$v = new $b9093140ea6d98ca$export$9eeb22c0bba4ed5e();
$629a5a981bde8539$var$v.addSchema((/*@__PURE__*/$parcel$interopDefault($66cd18a17a420676$exports)), "/channel");
$629a5a981bde8539$var$v.addSchema((/*@__PURE__*/$parcel$interopDefault($9101dbb38feb7b6a$exports)), "/track");
/**
 * Utility method that returns a boolean on whether the json is a valid specification.
 * console.errors the reason if it is not.
 * @param {Object} json specification
 * @returns boolean
 */ const $629a5a981bde8539$var$isJSONValid = (json)=>{
    const validation = $629a5a981bde8539$var$v.validate(json, (/*@__PURE__*/$parcel$interopDefault($f87685d8ddd4ce42$exports)));
    if (!validation.valid) console.error(validation.errors);
    return validation.valid;
};
var $629a5a981bde8539$export$2e2bcd8739ae039 = $629a5a981bde8539$var$isJSONValid;



var $23e8f04fd7c24075$exports = {};
var $6a8cd0e49a8296c2$exports = {};
"use strict";
$6a8cd0e49a8296c2$exports = function(workerUrl, origin, isESM) {
    if (origin === self.location.origin) // If the worker bundle's url is on the same origin as the document,
    // use the worker bundle's own url.
    return workerUrl;
    else {
        // Otherwise, create a blob URL which loads the worker bundle with `importScripts`.
        var source = isESM ? 'import ' + JSON.stringify(workerUrl) + ';' : 'importScripts(' + JSON.stringify(workerUrl) + ');';
        return URL.createObjectURL(new Blob([
            source
        ], {
            type: 'application/javascript'
        }));
    }
};



let $23e8f04fd7c24075$var$url = new URL((parcelRequire("aKzDW")).resolve("13j1z"), import.meta.url);
$23e8f04fd7c24075$exports = $6a8cd0e49a8296c2$exports($23e8f04fd7c24075$var$url.toString(), $23e8f04fd7c24075$var$url.origin, true);


var $f678f7be381520ef$exports = {};


let $f678f7be381520ef$var$url = new URL((parcelRequire("aKzDW")).resolve("9xgYG"), import.meta.url);
$f678f7be381520ef$exports = $6a8cd0e49a8296c2$exports($f678f7be381520ef$var$url.toString(), $f678f7be381520ef$var$url.origin, true);


class $423bc162a0c830e9$var$WebGLVis {
    /**
   * Resize the canvas to a particular size and rerender the data
   *
   * @param {Number} width in pixels to resize the canvas to
   * @param {Number} height in pixels to resize the canvas to
   */ setCanvasSize(width, height) {
        this.webglWorker.postMessage({
            type: "resize",
            width: width,
            height: height
        });
        this.canvas.style.width = width;
        this.canvas.style.height = height;
        this.mouseReader.width = width;
        this.mouseReader.height = height;
        this.sendDrawerState(this.mouseReader.getViewport());
    }
    /**
   * This method does three things, and should only be called once. If changing the specification
   * use setSpecification.
   *  1. Add the canvas and mousereader to the DOM for use.
   *  2. Creates the WebWorkers that render and process the data.
   *  3. Exposes the messages the webworkers send back to the main thread under this.dataWorkerStream
   *
   * @param {Boolean} displayFPSMeter whether or not to display an fps meter
   */ addToDom(displayFPSMeter) {
        this.container.appendChild(this.parent);
        this.parent.appendChild(this.canvas);
        this.parent.appendChild(this.mouseReader.element);
        if (displayFPSMeter) this.initFpsmeter();
        const offscreenCanvas = this.canvas.transferControlToOffscreen();
        this.webglWorker = new Worker($23e8f04fd7c24075$exports);
        this.webglWorker.postMessage({
            type: "init",
            canvas: offscreenCanvas,
            displayFPSMeter: displayFPSMeter
        }, [
            offscreenCanvas
        ]);
        // Allow OffScreenWebGLDrawer to tick FPS meter
        this.webglWorker.onmessage = (e)=>{
            if (e.data.type === "tick") this.meter.tick();
        };
        this.dataWorkerStream = [];
        this.dataWorker = new Worker($f678f7be381520ef$exports);
        this.dataWorker.onmessage = (message)=>{
            this.dataWorkerStream.push(message);
            this.parent.dispatchEvent(new CustomEvent("onSelectionEnd", {
                detail: message
            }));
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
   */ setViewOptions(options) {
        for (const option of this.POSSIBLE_MOUSE_READER_OPTIONS)if (option in options) this.mouseReader[option] = options[option];
        this.sendDrawerState(this.mouseReader.getViewport());
    }
    _setMargins(specification) {
        const styles = $7f56df25e3cef9e2$export$9c7342f1c4b9b83(specification);
        this.parent.style.width = specification.width || $7f56df25e3cef9e2$export$aa4eace044cdfdbf;
        this.parent.style.height = specification.height || $7f56df25e3cef9e2$export$611c894df53833b0;
        this.canvas.style.width = styles.width;
        this.canvas.style.height = styles.height;
        this.canvas.style.margin = styles.margin;
        if (isNaN(styles.width) || isNaN(styles.height)) {
            // Using css calc
            const canvasBox = this.canvas.getBoundingClientRect();
            this.setCanvasSize(canvasBox.width, canvasBox.height);
        } else this.setCanvasSize(styles.width, styles.height);
    }
    /**
   * Set the specification of the visualization, and then render it.
   *
   * @param {Object} specification describing visualization
   * @returns boolean on whether the specification was accepted
   */ setSpecification(specification) {
        if (!$629a5a981bde8539$export$2e2bcd8739ae039(specification)) return false;
        this._setMargins(specification);
        this.mouseReader.setSpecification(specification);
        this.sendDrawerState(this.mouseReader.getViewport());
        this.webglWorker.postMessage({
            type: "specification",
            specification: specification
        });
        this.dataWorker.postMessage({
            type: "init",
            specification: specification
        });
        return true;
    }
    /**
   * Send the viewport to the drawer. Use setViewOptions to change the viewport.
   *
   * @param {Object} viewport likely from this.mouseReader.getViewport()
   */ sendDrawerState(viewport) {
        this.webglWorker.postMessage({
            type: "viewport",
            ...viewport
        });
    }
    /**
   * Calls render in the drawer.
   */ forceDrawerRender() {
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
   */ selectPoints(points) {
        if (points.length === 4) this.dataWorker.postMessage({
            type: "selectBox",
            points: points
        });
        else if (points.length >= 6) this.dataWorker.postMessage({
            type: "selectLasso",
            points: points
        });
    }
    /**
   * Utility method to have data worker call {@link DataProcessor#getClosestPoint}.
   * Does not return, posts result to this.dataWorkerStream.
   *
   * @param {Array} point to get closest point to
   */ getClosestPoint(point) {
        this.dataWorker.postMessage({
            type: "getClosestPoint",
            point: point
        });
    }
    /**
   * Initializes the FPS meter.
   */ initFpsmeter() {
        this.meter = new window.FPSMeter(document.querySelector("footer"), {
            graph: 1,
            heat: 1,
            theme: "light",
            history: 25,
            top: "-20px",
            left: `100px`,
            transform: "translateX(-100%)"
        });
    }
    /**
   * Adds an event listener to visualization on the appropriate component.
   * Current event types that are supported are
   * "zoomIn": fires when user zooms in
   * "zoomOut": fires when user zooms out
   * "pan": fires when user pans
   * "onSelection": fires while user is changing the selection box/lasso
   * "onSelectionEnd": fires when a selection has been completed and the results are in the dataWorkerStream
   *
   * For information on the parameters and functionality see:
   *   https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
   *
   * @param {String} type
   * @param {Function} listener
   * @param {Object} options
   */ addEventListener(type, listener, options) {
        this.parent.addEventListener(type, listener, options);
    }
    /**
   * A class meant to display a visualization based off a given specification using webgl.
   *
   * @param {HTMLElement} container <div> or other container element meant to contain the visualization and its mousereader
   */ constructor(container){
        $6d55fde0aecbceb0$export$2e2bcd8739ae039(this, "POSSIBLE_MOUSE_READER_OPTIONS", Object.freeze([
            "lockedX",
            "lockedY",
            "tool",
            "viewport",
            "currentXRange",
            "currentYRange", 
        ]));
        this.container = container;
        this.mouseReader = new $517b0de0b59a1455$export$2e2bcd8739ae039(document.createElement("div"), this);
        this.parent = document.createElement("div");
        this.parent.style.position = "relative";
        this.parent.style.overflow = "hidden";
        this.canvas = document.createElement("canvas");
        this.canvas.style.position = "absolute";
    }
}
var $423bc162a0c830e9$export$2e2bcd8739ae039 = $423bc162a0c830e9$var$WebGLVis;


var $3da87ddc4a220fcd$export$2e2bcd8739ae039 = $423bc162a0c830e9$export$2e2bcd8739ae039;




const $feb6396ea849ac47$var$store = $b95c15551dfb42e4$exports.configureStore({
    reducer: $8204634c8797ef28$export$2e2bcd8739ae039
});
let $feb6396ea849ac47$var$previousValues = {
};
/**
 * This utility method is meant to check if a part of the state in the global
 * store has changed since it was last called. It is useful in a store subscription
 * for updating components. Typically this would be done automatically by
 * react-redux or something else, but we do it ourselves. The main purpose is to
 * keep the redux pattern of only calling dispatch throughout the application,
 * and calling getState inside subscriptions only.
 *
 * @param {String} key of the state from the store
 * @returns null if value at key has not changed, the new value otherwise
 */ const $feb6396ea849ac47$export$b8fb2053d98d9ce8 = (key)=>{
    const currValue = $feb6396ea849ac47$var$store.getState()[key];
    if (key in $feb6396ea849ac47$var$previousValues) {
        if ($feb6396ea849ac47$var$previousValues[key] === currValue) return null;
        else $feb6396ea849ac47$var$previousValues[key] = currValue;
        return $feb6396ea849ac47$var$store.getState()[key];
    } else $feb6396ea849ac47$var$previousValues[key] = currValue;
};
var $feb6396ea849ac47$export$2e2bcd8739ae039 = $feb6396ea849ac47$var$store;


class $2cf3a45f179f67c8$var$App {
    /**
   * The webgl visualization components are meant to leave application
   * state up to the developers, and this subscription is an example of
   * using redux to update the plot.
   */ subscription() {
        const currState = this.store.getState();
        const specification = $feb6396ea849ac47$export$b8fb2053d98d9ce8("specification");
        if (specification) document.getElementById("specification-editor").value = specification;
        this.visualization.setViewOptions({
            ...currState
        });
    }
    onSpecificationSubmit() {
        const specificationAsString = document.getElementById("specification-editor").value;
        const specification = JSON.parse(specificationAsString);
        this.visualization.setSpecification(specification);
    }
    onWindowResize() {
        this.visualization.setCanvasSize(this.visualization.parent.clientWidth, this.visualization.parent.clientHeight);
    }
    /*
      The App class is meant to emulate an app that may use the webgl visualization as a component
  */ constructor(){
        const container = document.querySelector(".content");
        this.visualization = new $3da87ddc4a220fcd$export$2e2bcd8739ae039(container);
        this.visualization.addToDom(true);
        // Demonstration of adding mouse events
        this.visualization.addEventListener("zoomIn", (event)=>console.log("zoomIn", event)
        );
        this.visualization.addEventListener("zoomOut", (event)=>console.log("zoomOut", event)
        );
        this.visualization.addEventListener("onSelection", (event)=>console.log("onSelection", event)
        );
        this.visualization.addEventListener("onSelectionEnd", (event)=>console.log("onSelectionEnd", event)
        );
        this.visualization.addEventListener("pan", (event)=>console.log("pan", event)
        );
        this.store = $feb6396ea849ac47$export$2e2bcd8739ae039;
        this.store.subscribe(this.subscription.bind(this));
        const toolbar = new $58fdc11254e9346a$export$2e2bcd8739ae039(this.store.dispatch);
        toolbar.init();
        document.getElementById("refresh-specification").onclick = this.onSpecificationSubmit.bind(this);
        window.addEventListener("resize", this.onWindowResize.bind(this));
        // choose the tsne as the default visualization
        let selem = document.getElementById("specification-select");
        selem.value = "tsne-10th";
        selem.dispatchEvent(new Event('change'));
        document.getElementById("refresh-specification").click();
    }
}
document.addEventListener("DOMContentLoaded", ()=>{
    window.app = new $2cf3a45f179f67c8$var$App(); // Add to window for testing purposes
});


//# sourceMappingURL=index.b99282c8.js.map
