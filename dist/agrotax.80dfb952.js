// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/base64-js/index.js":[function(require,module,exports) {
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}

},{}],"../node_modules/ieee754/index.js":[function(require,module,exports) {
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],"../node_modules/isarray/index.js":[function(require,module,exports) {
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],"../node_modules/buffer/index.js":[function(require,module,exports) {

var global = arguments[3];
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')
var isArray = require('isarray')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

},{"base64-js":"../node_modules/base64-js/index.js","ieee754":"../node_modules/ieee754/index.js","isarray":"../node_modules/isarray/index.js","buffer":"../node_modules/buffer/index.js"}],"../cookieconsent.js":[function(require,module,exports) {
var define;
var global = arguments[3];
var Buffer = require("buffer").Buffer;
function _typeof2(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
// eslint-disable-next-line no-global-assign
parcelRequire = function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;

        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        } // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.


        if (previousRequire) {
          return previousRequire(name, true);
        } // Try the node require function if it exists.


        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};
      var module = cache[name] = new newRequire.Module(name);
      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]); // CommonJS

    if ((typeof exports === "undefined" ? "undefined" : _typeof2(exports)) === "object" && typeof module !== "undefined") {
      module.exports = mainExports; // RequireJS
    } else if (typeof define === "function" && define.amd) {
      define(function () {
        return mainExports;
      }); // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  } // Override the current require with this new one


  return newRequire;
}({
  "5qf4": [function (require, module, exports) {
    // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
    var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self // eslint-disable-next-line no-new-func
    : Function('return this')();
    if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
  }, {}],
  "2uHg": [function (require, module, exports) {
    var hasOwnProperty = {}.hasOwnProperty;

    module.exports = function (it, key) {
      return hasOwnProperty.call(it, key);
    };
  }, {}],
  "5BXi": [function (require, module, exports) {
    module.exports = function (exec) {
      try {
        return !!exec();
      } catch (e) {
        return true;
      }
    };
  }, {}],
  "P9Ib": [function (require, module, exports) {
    // Thank's IE8 for his funny defineProperty
    module.exports = !require('./_fails')(function () {
      return Object.defineProperty({}, 'a', {
        get: function get() {
          return 7;
        }
      }).a != 7;
    });
  }, {
    "./_fails": "5BXi"
  }],
  "ss9A": [function (require, module, exports) {
    var core = module.exports = {
      version: '2.6.5'
    };
    if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
  }, {}],
  "M7z6": [function (require, module, exports) {
    module.exports = function (it) {
      return _typeof2(it) === 'object' ? it !== null : typeof it === 'function';
    };
  }, {}],
  "eT53": [function (require, module, exports) {
    var isObject = require('./_is-object');

    module.exports = function (it) {
      if (!isObject(it)) throw TypeError(it + ' is not an object!');
      return it;
    };
  }, {
    "./_is-object": "M7z6"
  }],
  "/vZ6": [function (require, module, exports) {
    var isObject = require('./_is-object');

    var document = require('./_global').document; // typeof document.createElement is 'object' in old IE


    var is = isObject(document) && isObject(document.createElement);

    module.exports = function (it) {
      return is ? document.createElement(it) : {};
    };
  }, {
    "./_is-object": "M7z6",
    "./_global": "5qf4"
  }],
  "/o6G": [function (require, module, exports) {
    module.exports = !require('./_descriptors') && !require('./_fails')(function () {
      return Object.defineProperty(require('./_dom-create')('div'), 'a', {
        get: function get() {
          return 7;
        }
      }).a != 7;
    });
  }, {
    "./_descriptors": "P9Ib",
    "./_fails": "5BXi",
    "./_dom-create": "/vZ6"
  }],
  "9y37": [function (require, module, exports) {
    // 7.1.1 ToPrimitive(input [, PreferredType])
    var isObject = require('./_is-object'); // instead of the ES6 spec version, we didn't implement @@toPrimitive case
    // and the second argument - flag - preferred type is a string


    module.exports = function (it, S) {
      if (!isObject(it)) return it;
      var fn, val;
      if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
      if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
      if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
      throw TypeError("Can't convert object to primitive value");
    };
  }, {
    "./_is-object": "M7z6"
  }],
  "nw8e": [function (require, module, exports) {
    var anObject = require('./_an-object');

    var IE8_DOM_DEFINE = require('./_ie8-dom-define');

    var toPrimitive = require('./_to-primitive');

    var dP = Object.defineProperty;
    exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes) {
      anObject(O);
      P = toPrimitive(P, true);
      anObject(Attributes);
      if (IE8_DOM_DEFINE) try {
        return dP(O, P, Attributes);
      } catch (e) {
        /* empty */
      }
      if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
      if ('value' in Attributes) O[P] = Attributes.value;
      return O;
    };
  }, {
    "./_an-object": "eT53",
    "./_ie8-dom-define": "/o6G",
    "./_to-primitive": "9y37",
    "./_descriptors": "P9Ib"
  }],
  "uJ6d": [function (require, module, exports) {
    module.exports = function (bitmap, value) {
      return {
        enumerable: !(bitmap & 1),
        configurable: !(bitmap & 2),
        writable: !(bitmap & 4),
        value: value
      };
    };
  }, {}],
  "0NXb": [function (require, module, exports) {
    var dP = require('./_object-dp');

    var createDesc = require('./_property-desc');

    module.exports = require('./_descriptors') ? function (object, key, value) {
      return dP.f(object, key, createDesc(1, value));
    } : function (object, key, value) {
      object[key] = value;
      return object;
    };
  }, {
    "./_object-dp": "nw8e",
    "./_property-desc": "uJ6d",
    "./_descriptors": "P9Ib"
  }],
  "U49f": [function (require, module, exports) {
    var id = 0;
    var px = Math.random();

    module.exports = function (key) {
      return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
    };
  }, {}],
  "H21C": [function (require, module, exports) {
    module.exports = false;
  }, {}],
  "6zGc": [function (require, module, exports) {
    var core = require('./_core');

    var global = require('./_global');

    var SHARED = '__core-js_shared__';
    var store = global[SHARED] || (global[SHARED] = {});
    (module.exports = function (key, value) {
      return store[key] || (store[key] = value !== undefined ? value : {});
    })('versions', []).push({
      version: core.version,
      mode: require('./_library') ? 'pure' : 'global',
      copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
    });
  }, {
    "./_core": "ss9A",
    "./_global": "5qf4",
    "./_library": "H21C"
  }],
  "d5RU": [function (require, module, exports) {
    module.exports = require('./_shared')('native-function-to-string', Function.toString);
  }, {
    "./_shared": "6zGc"
  }],
  "PHot": [function (require, module, exports) {
    var global = require('./_global');

    var hide = require('./_hide');

    var has = require('./_has');

    var SRC = require('./_uid')('src');

    var $toString = require('./_function-to-string');

    var TO_STRING = 'toString';
    var TPL = ('' + $toString).split(TO_STRING);

    require('./_core').inspectSource = function (it) {
      return $toString.call(it);
    };

    (module.exports = function (O, key, val, safe) {
      var isFunction = typeof val == 'function';
      if (isFunction) has(val, 'name') || hide(val, 'name', key);
      if (O[key] === val) return;
      if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));

      if (O === global) {
        O[key] = val;
      } else if (!safe) {
        delete O[key];
        hide(O, key, val);
      } else if (O[key]) {
        O[key] = val;
      } else {
        hide(O, key, val);
      } // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative

    })(Function.prototype, TO_STRING, function toString() {
      return typeof this == 'function' && this[SRC] || $toString.call(this);
    });
  }, {
    "./_global": "5qf4",
    "./_hide": "0NXb",
    "./_has": "2uHg",
    "./_uid": "U49f",
    "./_function-to-string": "d5RU",
    "./_core": "ss9A"
  }],
  "6kYj": [function (require, module, exports) {
    module.exports = function (it) {
      if (typeof it != 'function') throw TypeError(it + ' is not a function!');
      return it;
    };
  }, {}],
  "E3Kh": [function (require, module, exports) {
    // optional / simple context binding
    var aFunction = require('./_a-function');

    module.exports = function (fn, that, length) {
      aFunction(fn);
      if (that === undefined) return fn;

      switch (length) {
        case 1:
          return function (a) {
            return fn.call(that, a);
          };

        case 2:
          return function (a, b) {
            return fn.call(that, a, b);
          };

        case 3:
          return function (a, b, c) {
            return fn.call(that, a, b, c);
          };
      }

      return function ()
      /* ...args */
      {
        return fn.apply(that, arguments);
      };
    };
  }, {
    "./_a-function": "6kYj"
  }],
  "izCb": [function (require, module, exports) {
    var global = require('./_global');

    var core = require('./_core');

    var hide = require('./_hide');

    var redefine = require('./_redefine');

    var ctx = require('./_ctx');

    var PROTOTYPE = 'prototype';

    var $export = function $export(type, name, source) {
      var IS_FORCED = type & $export.F;
      var IS_GLOBAL = type & $export.G;
      var IS_STATIC = type & $export.S;
      var IS_PROTO = type & $export.P;
      var IS_BIND = type & $export.B;
      var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
      var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
      var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
      var key, own, out, exp;
      if (IS_GLOBAL) source = name;

      for (key in source) {
        // contains in native
        own = !IS_FORCED && target && target[key] !== undefined; // export native or passed

        out = (own ? target : source)[key]; // bind timers to global for call from export context

        exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out; // extend global

        if (target) redefine(target, key, out, type & $export.U); // export

        if (exports[key] != out) hide(exports, key, exp);
        if (IS_PROTO && expProto[key] != out) expProto[key] = out;
      }
    };

    global.core = core; // type bitmap

    $export.F = 1; // forced

    $export.G = 2; // global

    $export.S = 4; // static

    $export.P = 8; // proto

    $export.B = 16; // bind

    $export.W = 32; // wrap

    $export.U = 64; // safe

    $export.R = 128; // real proto method for `library`

    module.exports = $export;
  }, {
    "./_global": "5qf4",
    "./_core": "ss9A",
    "./_hide": "0NXb",
    "./_redefine": "PHot",
    "./_ctx": "E3Kh"
  }],
  "AoVy": [function (require, module, exports) {
    var META = require('./_uid')('meta');

    var isObject = require('./_is-object');

    var has = require('./_has');

    var setDesc = require('./_object-dp').f;

    var id = 0;

    var isExtensible = Object.isExtensible || function () {
      return true;
    };

    var FREEZE = !require('./_fails')(function () {
      return isExtensible(Object.preventExtensions({}));
    });

    var setMeta = function setMeta(it) {
      setDesc(it, META, {
        value: {
          i: 'O' + ++id,
          // object ID
          w: {} // weak collections IDs

        }
      });
    };

    var fastKey = function fastKey(it, create) {
      // return primitive with prefix
      if (!isObject(it)) return _typeof2(it) == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;

      if (!has(it, META)) {
        // can't set metadata to uncaught frozen object
        if (!isExtensible(it)) return 'F'; // not necessary to add metadata

        if (!create) return 'E'; // add missing metadata

        setMeta(it); // return object ID
      }

      return it[META].i;
    };

    var getWeak = function getWeak(it, create) {
      if (!has(it, META)) {
        // can't set metadata to uncaught frozen object
        if (!isExtensible(it)) return true; // not necessary to add metadata

        if (!create) return false; // add missing metadata

        setMeta(it); // return hash weak collections IDs
      }

      return it[META].w;
    }; // add metadata on freeze-family methods calling


    var onFreeze = function onFreeze(it) {
      if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
      return it;
    };

    var meta = module.exports = {
      KEY: META,
      NEED: false,
      fastKey: fastKey,
      getWeak: getWeak,
      onFreeze: onFreeze
    };
  }, {
    "./_uid": "U49f",
    "./_is-object": "M7z6",
    "./_has": "2uHg",
    "./_object-dp": "nw8e",
    "./_fails": "5BXi"
  }],
  "44AI": [function (require, module, exports) {
    var store = require('./_shared')('wks');

    var uid = require('./_uid');

    var _Symbol = require('./_global').Symbol;

    var USE_SYMBOL = typeof _Symbol == 'function';

    var $exports = module.exports = function (name) {
      return store[name] || (store[name] = USE_SYMBOL && _Symbol[name] || (USE_SYMBOL ? _Symbol : uid)('Symbol.' + name));
    };

    $exports.store = store;
  }, {
    "./_shared": "6zGc",
    "./_uid": "U49f",
    "./_global": "5qf4"
  }],
  "rq3q": [function (require, module, exports) {
    var def = require('./_object-dp').f;

    var has = require('./_has');

    var TAG = require('./_wks')('toStringTag');

    module.exports = function (it, tag, stat) {
      if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, {
        configurable: true,
        value: tag
      });
    };
  }, {
    "./_object-dp": "nw8e",
    "./_has": "2uHg",
    "./_wks": "44AI"
  }],
  "AuE7": [function (require, module, exports) {
    exports.f = require('./_wks');
  }, {
    "./_wks": "44AI"
  }],
  "r4vV": [function (require, module, exports) {
    var global = require('./_global');

    var core = require('./_core');

    var LIBRARY = require('./_library');

    var wksExt = require('./_wks-ext');

    var defineProperty = require('./_object-dp').f;

    module.exports = function (name) {
      var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
      if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, {
        value: wksExt.f(name)
      });
    };
  }, {
    "./_global": "5qf4",
    "./_core": "ss9A",
    "./_library": "H21C",
    "./_wks-ext": "AuE7",
    "./_object-dp": "nw8e"
  }],
  "Z5df": [function (require, module, exports) {
    var toString = {}.toString;

    module.exports = function (it) {
      return toString.call(it).slice(8, -1);
    };
  }, {}],
  "nGau": [function (require, module, exports) {
    // fallback for non-array-like ES3 and non-enumerable old V8 strings
    var cof = require('./_cof'); // eslint-disable-next-line no-prototype-builtins


    module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
      return cof(it) == 'String' ? it.split('') : Object(it);
    };
  }, {
    "./_cof": "Z5df"
  }],
  "+Bjj": [function (require, module, exports) {
    // 7.2.1 RequireObjectCoercible(argument)
    module.exports = function (it) {
      if (it == undefined) throw TypeError("Can't call method on  " + it);
      return it;
    };
  }, {}],
  "g6sb": [function (require, module, exports) {
    // to indexed object, toObject with fallback for non-array-like ES3 strings
    var IObject = require('./_iobject');

    var defined = require('./_defined');

    module.exports = function (it) {
      return IObject(defined(it));
    };
  }, {
    "./_iobject": "nGau",
    "./_defined": "+Bjj"
  }],
  "yjVO": [function (require, module, exports) {
    // 7.1.4 ToInteger
    var ceil = Math.ceil;
    var floor = Math.floor;

    module.exports = function (it) {
      return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
    };
  }, {}],
  "dJBs": [function (require, module, exports) {
    // 7.1.15 ToLength
    var toInteger = require('./_to-integer');

    var min = Math.min;

    module.exports = function (it) {
      return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
    };
  }, {
    "./_to-integer": "yjVO"
  }],
  "vfEH": [function (require, module, exports) {
    var toInteger = require('./_to-integer');

    var max = Math.max;
    var min = Math.min;

    module.exports = function (index, length) {
      index = toInteger(index);
      return index < 0 ? max(index + length, 0) : min(index, length);
    };
  }, {
    "./_to-integer": "yjVO"
  }],
  "4Ca7": [function (require, module, exports) {
    // false -> Array#indexOf
    // true  -> Array#includes
    var toIObject = require('./_to-iobject');

    var toLength = require('./_to-length');

    var toAbsoluteIndex = require('./_to-absolute-index');

    module.exports = function (IS_INCLUDES) {
      return function ($this, el, fromIndex) {
        var O = toIObject($this);
        var length = toLength(O.length);
        var index = toAbsoluteIndex(fromIndex, length);
        var value; // Array#includes uses SameValueZero equality algorithm
        // eslint-disable-next-line no-self-compare

        if (IS_INCLUDES && el != el) while (length > index) {
          value = O[index++]; // eslint-disable-next-line no-self-compare

          if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
        } else for (; length > index; index++) {
          if (IS_INCLUDES || index in O) {
            if (O[index] === el) return IS_INCLUDES || index || 0;
          }
        }
        return !IS_INCLUDES && -1;
      };
    };
  }, {
    "./_to-iobject": "g6sb",
    "./_to-length": "dJBs",
    "./_to-absolute-index": "vfEH"
  }],
  "NaGB": [function (require, module, exports) {
    var shared = require('./_shared')('keys');

    var uid = require('./_uid');

    module.exports = function (key) {
      return shared[key] || (shared[key] = uid(key));
    };
  }, {
    "./_shared": "6zGc",
    "./_uid": "U49f"
  }],
  "vL0Z": [function (require, module, exports) {
    var has = require('./_has');

    var toIObject = require('./_to-iobject');

    var arrayIndexOf = require('./_array-includes')(false);

    var IE_PROTO = require('./_shared-key')('IE_PROTO');

    module.exports = function (object, names) {
      var O = toIObject(object);
      var i = 0;
      var result = [];
      var key;

      for (key in O) {
        if (key != IE_PROTO) has(O, key) && result.push(key);
      } // Don't enum bug & hidden keys


      while (names.length > i) {
        if (has(O, key = names[i++])) {
          ~arrayIndexOf(result, key) || result.push(key);
        }
      }

      return result;
    };
  }, {
    "./_has": "2uHg",
    "./_to-iobject": "g6sb",
    "./_array-includes": "4Ca7",
    "./_shared-key": "NaGB"
  }],
  "9bbv": [function (require, module, exports) {
    // IE 8- don't enum bug keys
    module.exports = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(',');
  }, {}],
  "U9a7": [function (require, module, exports) {
    // 19.1.2.14 / 15.2.3.14 Object.keys(O)
    var $keys = require('./_object-keys-internal');

    var enumBugKeys = require('./_enum-bug-keys');

    module.exports = Object.keys || function keys(O) {
      return $keys(O, enumBugKeys);
    };
  }, {
    "./_object-keys-internal": "vL0Z",
    "./_enum-bug-keys": "9bbv"
  }],
  "EWMd": [function (require, module, exports) {
    exports.f = Object.getOwnPropertySymbols;
  }, {}],
  "vjRp": [function (require, module, exports) {
    exports.f = {}.propertyIsEnumerable;
  }, {}],
  "0jjw": [function (require, module, exports) {
    // all enumerable object keys, includes symbols
    var getKeys = require('./_object-keys');

    var gOPS = require('./_object-gops');

    var pIE = require('./_object-pie');

    module.exports = function (it) {
      var result = getKeys(it);
      var getSymbols = gOPS.f;

      if (getSymbols) {
        var symbols = getSymbols(it);
        var isEnum = pIE.f;
        var i = 0;
        var key;

        while (symbols.length > i) {
          if (isEnum.call(it, key = symbols[i++])) result.push(key);
        }
      }

      return result;
    };
  }, {
    "./_object-keys": "U9a7",
    "./_object-gops": "EWMd",
    "./_object-pie": "vjRp"
  }],
  "JTrm": [function (require, module, exports) {
    // 7.2.2 IsArray(argument)
    var cof = require('./_cof');

    module.exports = Array.isArray || function isArray(arg) {
      return cof(arg) == 'Array';
    };
  }, {
    "./_cof": "Z5df"
  }],
  "MiMz": [function (require, module, exports) {
    var dP = require('./_object-dp');

    var anObject = require('./_an-object');

    var getKeys = require('./_object-keys');

    module.exports = require('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties) {
      anObject(O);
      var keys = getKeys(Properties);
      var length = keys.length;
      var i = 0;
      var P;

      while (length > i) {
        dP.f(O, P = keys[i++], Properties[P]);
      }

      return O;
    };
  }, {
    "./_object-dp": "nw8e",
    "./_an-object": "eT53",
    "./_object-keys": "U9a7",
    "./_descriptors": "P9Ib"
  }],
  "xj/b": [function (require, module, exports) {
    var document = require('./_global').document;

    module.exports = document && document.documentElement;
  }, {
    "./_global": "5qf4"
  }],
  "sYaK": [function (require, module, exports) {
    // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
    var anObject = require('./_an-object');

    var dPs = require('./_object-dps');

    var enumBugKeys = require('./_enum-bug-keys');

    var IE_PROTO = require('./_shared-key')('IE_PROTO');

    var Empty = function Empty() {
      /* empty */
    };

    var PROTOTYPE = 'prototype'; // Create object with fake `null` prototype: use iframe Object with cleared prototype

    var _createDict = function createDict() {
      // Thrash, waste and sodomy: IE GC bug
      var iframe = require('./_dom-create')('iframe');

      var i = enumBugKeys.length;
      var lt = '<';
      var gt = '>';
      var iframeDocument;
      iframe.style.display = 'none';

      require('./_html').appendChild(iframe);

      iframe.src = 'javascript:'; // eslint-disable-line no-script-url
      // createDict = iframe.contentWindow.Object;
      // html.removeChild(iframe);

      iframeDocument = iframe.contentWindow.document;
      iframeDocument.open();
      iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
      iframeDocument.close();
      _createDict = iframeDocument.F;

      while (i--) {
        delete _createDict[PROTOTYPE][enumBugKeys[i]];
      }

      return _createDict();
    };

    module.exports = Object.create || function create(O, Properties) {
      var result;

      if (O !== null) {
        Empty[PROTOTYPE] = anObject(O);
        result = new Empty();
        Empty[PROTOTYPE] = null; // add "__proto__" for Object.getPrototypeOf polyfill

        result[IE_PROTO] = O;
      } else result = _createDict();

      return Properties === undefined ? result : dPs(result, Properties);
    };
  }, {
    "./_an-object": "eT53",
    "./_object-dps": "MiMz",
    "./_enum-bug-keys": "9bbv",
    "./_shared-key": "NaGB",
    "./_dom-create": "/vZ6",
    "./_html": "xj/b"
  }],
  "Vzm0": [function (require, module, exports) {
    // 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
    var $keys = require('./_object-keys-internal');

    var hiddenKeys = require('./_enum-bug-keys').concat('length', 'prototype');

    exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
      return $keys(O, hiddenKeys);
    };
  }, {
    "./_object-keys-internal": "vL0Z",
    "./_enum-bug-keys": "9bbv"
  }],
  "dvol": [function (require, module, exports) {
    // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
    var toIObject = require('./_to-iobject');

    var gOPN = require('./_object-gopn').f;

    var toString = {}.toString;
    var windowNames = (typeof window === "undefined" ? "undefined" : _typeof2(window)) == 'object' && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];

    var getWindowNames = function getWindowNames(it) {
      try {
        return gOPN(it);
      } catch (e) {
        return windowNames.slice();
      }
    };

    module.exports.f = function getOwnPropertyNames(it) {
      return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
    };
  }, {
    "./_to-iobject": "g6sb",
    "./_object-gopn": "Vzm0"
  }],
  "uIjZ": [function (require, module, exports) {
    var pIE = require('./_object-pie');

    var createDesc = require('./_property-desc');

    var toIObject = require('./_to-iobject');

    var toPrimitive = require('./_to-primitive');

    var has = require('./_has');

    var IE8_DOM_DEFINE = require('./_ie8-dom-define');

    var gOPD = Object.getOwnPropertyDescriptor;
    exports.f = require('./_descriptors') ? gOPD : function getOwnPropertyDescriptor(O, P) {
      O = toIObject(O);
      P = toPrimitive(P, true);
      if (IE8_DOM_DEFINE) try {
        return gOPD(O, P);
      } catch (e) {
        /* empty */
      }
      if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
    };
  }, {
    "./_object-pie": "vjRp",
    "./_property-desc": "uJ6d",
    "./_to-iobject": "g6sb",
    "./_to-primitive": "9y37",
    "./_has": "2uHg",
    "./_ie8-dom-define": "/o6G",
    "./_descriptors": "P9Ib"
  }],
  "uVn9": [function (require, module, exports) {
    'use strict'; // ECMAScript 6 symbols shim

    var global = require('./_global');

    var has = require('./_has');

    var DESCRIPTORS = require('./_descriptors');

    var $export = require('./_export');

    var redefine = require('./_redefine');

    var META = require('./_meta').KEY;

    var $fails = require('./_fails');

    var shared = require('./_shared');

    var setToStringTag = require('./_set-to-string-tag');

    var uid = require('./_uid');

    var wks = require('./_wks');

    var wksExt = require('./_wks-ext');

    var wksDefine = require('./_wks-define');

    var enumKeys = require('./_enum-keys');

    var isArray = require('./_is-array');

    var anObject = require('./_an-object');

    var isObject = require('./_is-object');

    var toIObject = require('./_to-iobject');

    var toPrimitive = require('./_to-primitive');

    var createDesc = require('./_property-desc');

    var _create = require('./_object-create');

    var gOPNExt = require('./_object-gopn-ext');

    var $GOPD = require('./_object-gopd');

    var $DP = require('./_object-dp');

    var $keys = require('./_object-keys');

    var gOPD = $GOPD.f;
    var dP = $DP.f;
    var gOPN = gOPNExt.f;
    var $Symbol = global.Symbol;
    var $JSON = global.JSON;

    var _stringify = $JSON && $JSON.stringify;

    var PROTOTYPE = 'prototype';
    var HIDDEN = wks('_hidden');
    var TO_PRIMITIVE = wks('toPrimitive');
    var isEnum = {}.propertyIsEnumerable;
    var SymbolRegistry = shared('symbol-registry');
    var AllSymbols = shared('symbols');
    var OPSymbols = shared('op-symbols');
    var ObjectProto = Object[PROTOTYPE];
    var USE_NATIVE = typeof $Symbol == 'function';
    var QObject = global.QObject; // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173

    var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild; // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687

    var setSymbolDesc = DESCRIPTORS && $fails(function () {
      return _create(dP({}, 'a', {
        get: function get() {
          return dP(this, 'a', {
            value: 7
          }).a;
        }
      })).a != 7;
    }) ? function (it, key, D) {
      var protoDesc = gOPD(ObjectProto, key);
      if (protoDesc) delete ObjectProto[key];
      dP(it, key, D);
      if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
    } : dP;

    var wrap = function wrap(tag) {
      var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);

      sym._k = tag;
      return sym;
    };

    var isSymbol = USE_NATIVE && _typeof2($Symbol.iterator) == 'symbol' ? function (it) {
      return _typeof2(it) == 'symbol';
    } : function (it) {
      return it instanceof $Symbol;
    };

    var $defineProperty = function defineProperty(it, key, D) {
      if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
      anObject(it);
      key = toPrimitive(key, true);
      anObject(D);

      if (has(AllSymbols, key)) {
        if (!D.enumerable) {
          if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
          it[HIDDEN][key] = true;
        } else {
          if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
          D = _create(D, {
            enumerable: createDesc(0, false)
          });
        }

        return setSymbolDesc(it, key, D);
      }

      return dP(it, key, D);
    };

    var $defineProperties = function defineProperties(it, P) {
      anObject(it);
      var keys = enumKeys(P = toIObject(P));
      var i = 0;
      var l = keys.length;
      var key;

      while (l > i) {
        $defineProperty(it, key = keys[i++], P[key]);
      }

      return it;
    };

    var $create = function create(it, P) {
      return P === undefined ? _create(it) : $defineProperties(_create(it), P);
    };

    var $propertyIsEnumerable = function propertyIsEnumerable(key) {
      var E = isEnum.call(this, key = toPrimitive(key, true));
      if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
      return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
    };

    var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
      it = toIObject(it);
      key = toPrimitive(key, true);
      if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
      var D = gOPD(it, key);
      if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
      return D;
    };

    var $getOwnPropertyNames = function getOwnPropertyNames(it) {
      var names = gOPN(toIObject(it));
      var result = [];
      var i = 0;
      var key;

      while (names.length > i) {
        if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
      }

      return result;
    };

    var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
      var IS_OP = it === ObjectProto;
      var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
      var result = [];
      var i = 0;
      var key;

      while (names.length > i) {
        if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
      }

      return result;
    }; // 19.4.1.1 Symbol([description])


    if (!USE_NATIVE) {
      $Symbol = function _Symbol2() {
        if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
        var tag = uid(arguments.length > 0 ? arguments[0] : undefined);

        var $set = function $set(value) {
          if (this === ObjectProto) $set.call(OPSymbols, value);
          if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
          setSymbolDesc(this, tag, createDesc(1, value));
        };

        if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, {
          configurable: true,
          set: $set
        });
        return wrap(tag);
      };

      redefine($Symbol[PROTOTYPE], 'toString', function toString() {
        return this._k;
      });
      $GOPD.f = $getOwnPropertyDescriptor;
      $DP.f = $defineProperty;
      require('./_object-gopn').f = gOPNExt.f = $getOwnPropertyNames;
      require('./_object-pie').f = $propertyIsEnumerable;
      require('./_object-gops').f = $getOwnPropertySymbols;

      if (DESCRIPTORS && !require('./_library')) {
        redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
      }

      wksExt.f = function (name) {
        return wrap(wks(name));
      };
    }

    $export($export.G + $export.W + $export.F * !USE_NATIVE, {
      Symbol: $Symbol
    });

    for (var es6Symbols = // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
    'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'.split(','), j = 0; es6Symbols.length > j;) {
      wks(es6Symbols[j++]);
    }

    for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) {
      wksDefine(wellKnownSymbols[k++]);
    }

    $export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
      // 19.4.2.1 Symbol.for(key)
      'for': function _for(key) {
        return has(SymbolRegistry, key += '') ? SymbolRegistry[key] : SymbolRegistry[key] = $Symbol(key);
      },
      // 19.4.2.5 Symbol.keyFor(sym)
      keyFor: function keyFor(sym) {
        if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');

        for (var key in SymbolRegistry) {
          if (SymbolRegistry[key] === sym) return key;
        }
      },
      useSetter: function useSetter() {
        setter = true;
      },
      useSimple: function useSimple() {
        setter = false;
      }
    });
    $export($export.S + $export.F * !USE_NATIVE, 'Object', {
      // 19.1.2.2 Object.create(O [, Properties])
      create: $create,
      // 19.1.2.4 Object.defineProperty(O, P, Attributes)
      defineProperty: $defineProperty,
      // 19.1.2.3 Object.defineProperties(O, Properties)
      defineProperties: $defineProperties,
      // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
      getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
      // 19.1.2.7 Object.getOwnPropertyNames(O)
      getOwnPropertyNames: $getOwnPropertyNames,
      // 19.1.2.8 Object.getOwnPropertySymbols(O)
      getOwnPropertySymbols: $getOwnPropertySymbols
    }); // 24.3.2 JSON.stringify(value [, replacer [, space]])

    $JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
      var S = $Symbol(); // MS Edge converts symbol values to JSON as {}
      // WebKit converts symbol values to JSON as null
      // V8 throws on boxed symbols

      return _stringify([S]) != '[null]' || _stringify({
        a: S
      }) != '{}' || _stringify(Object(S)) != '{}';
    })), 'JSON', {
      stringify: function stringify(it) {
        var args = [it];
        var i = 1;
        var replacer, $replacer;

        while (arguments.length > i) {
          args.push(arguments[i++]);
        }

        $replacer = replacer = args[1];
        if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined

        if (!isArray(replacer)) replacer = function replacer(key, value) {
          if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
          if (!isSymbol(value)) return value;
        };
        args[1] = replacer;
        return _stringify.apply($JSON, args);
      }
    }); // 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)

    $Symbol[PROTOTYPE][TO_PRIMITIVE] || require('./_hide')($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf); // 19.4.3.5 Symbol.prototype[@@toStringTag]

    setToStringTag($Symbol, 'Symbol'); // 20.2.1.9 Math[@@toStringTag]

    setToStringTag(Math, 'Math', true); // 24.3.3 JSON[@@toStringTag]

    setToStringTag(global.JSON, 'JSON', true);
  }, {
    "./_global": "5qf4",
    "./_has": "2uHg",
    "./_descriptors": "P9Ib",
    "./_export": "izCb",
    "./_redefine": "PHot",
    "./_meta": "AoVy",
    "./_fails": "5BXi",
    "./_shared": "6zGc",
    "./_set-to-string-tag": "rq3q",
    "./_uid": "U49f",
    "./_wks": "44AI",
    "./_wks-ext": "AuE7",
    "./_wks-define": "r4vV",
    "./_enum-keys": "0jjw",
    "./_is-array": "JTrm",
    "./_an-object": "eT53",
    "./_is-object": "M7z6",
    "./_to-iobject": "g6sb",
    "./_to-primitive": "9y37",
    "./_property-desc": "uJ6d",
    "./_object-create": "sYaK",
    "./_object-gopn-ext": "dvol",
    "./_object-gopd": "uIjZ",
    "./_object-dp": "nw8e",
    "./_object-keys": "U9a7",
    "./_object-gopn": "Vzm0",
    "./_object-pie": "vjRp",
    "./_object-gops": "EWMd",
    "./_library": "H21C",
    "./_hide": "0NXb"
  }],
  "GM7B": [function (require, module, exports) {
    // getting tag from 19.1.3.6 Object.prototype.toString()
    var cof = require('./_cof');

    var TAG = require('./_wks')('toStringTag'); // ES3 wrong here


    var ARG = cof(function () {
      return arguments;
    }()) == 'Arguments'; // fallback for IE11 Script Access Denied error

    var tryGet = function tryGet(it, key) {
      try {
        return it[key];
      } catch (e) {
        /* empty */
      }
    };

    module.exports = function (it) {
      var O, T, B;
      return it === undefined ? 'Undefined' : it === null ? 'Null' // @@toStringTag case
      : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T // builtinTag case
      : ARG ? cof(O) // ES3 arguments fallback
      : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
    };
  }, {
    "./_cof": "Z5df",
    "./_wks": "44AI"
  }],
  "4zTK": [function (require, module, exports) {
    'use strict'; // 19.1.3.6 Object.prototype.toString()

    var classof = require('./_classof');

    var test = {};
    test[require('./_wks')('toStringTag')] = 'z';

    if (test + '' != '[object z]') {
      require('./_redefine')(Object.prototype, 'toString', function toString() {
        return '[object ' + classof(this) + ']';
      }, true);
    }
  }, {
    "./_classof": "GM7B",
    "./_wks": "44AI",
    "./_redefine": "PHot"
  }],
  "CtPZ": [function (require, module, exports) {
    require('../modules/es6.symbol');

    require('../modules/es6.object.to-string');

    module.exports = require('../modules/_core').Symbol;
  }, {
    "../modules/es6.symbol": "uVn9",
    "../modules/es6.object.to-string": "4zTK",
    "../modules/_core": "ss9A"
  }],
  "x5yM": [function (require, module, exports) {
    var toInteger = require('./_to-integer');

    var defined = require('./_defined'); // true  -> String#at
    // false -> String#codePointAt


    module.exports = function (TO_STRING) {
      return function (that, pos) {
        var s = String(defined(that));
        var i = toInteger(pos);
        var l = s.length;
        var a, b;
        if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
        a = s.charCodeAt(i);
        return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
      };
    };
  }, {
    "./_to-integer": "yjVO",
    "./_defined": "+Bjj"
  }],
  "JO4d": [function (require, module, exports) {
    module.exports = {};
  }, {}],
  "ebgP": [function (require, module, exports) {
    'use strict';

    var create = require('./_object-create');

    var descriptor = require('./_property-desc');

    var setToStringTag = require('./_set-to-string-tag');

    var IteratorPrototype = {}; // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()

    require('./_hide')(IteratorPrototype, require('./_wks')('iterator'), function () {
      return this;
    });

    module.exports = function (Constructor, NAME, next) {
      Constructor.prototype = create(IteratorPrototype, {
        next: descriptor(1, next)
      });
      setToStringTag(Constructor, NAME + ' Iterator');
    };
  }, {
    "./_object-create": "sYaK",
    "./_property-desc": "uJ6d",
    "./_set-to-string-tag": "rq3q",
    "./_hide": "0NXb",
    "./_wks": "44AI"
  }],
  "rfVX": [function (require, module, exports) {
    // 7.1.13 ToObject(argument)
    var defined = require('./_defined');

    module.exports = function (it) {
      return Object(defined(it));
    };
  }, {
    "./_defined": "+Bjj"
  }],
  "8q6y": [function (require, module, exports) {
    // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
    var has = require('./_has');

    var toObject = require('./_to-object');

    var IE_PROTO = require('./_shared-key')('IE_PROTO');

    var ObjectProto = Object.prototype;

    module.exports = Object.getPrototypeOf || function (O) {
      O = toObject(O);
      if (has(O, IE_PROTO)) return O[IE_PROTO];

      if (typeof O.constructor == 'function' && O instanceof O.constructor) {
        return O.constructor.prototype;
      }

      return O instanceof Object ? ObjectProto : null;
    };
  }, {
    "./_has": "2uHg",
    "./_to-object": "rfVX",
    "./_shared-key": "NaGB"
  }],
  "mH0U": [function (require, module, exports) {
    'use strict';

    var LIBRARY = require('./_library');

    var $export = require('./_export');

    var redefine = require('./_redefine');

    var hide = require('./_hide');

    var Iterators = require('./_iterators');

    var $iterCreate = require('./_iter-create');

    var setToStringTag = require('./_set-to-string-tag');

    var getPrototypeOf = require('./_object-gpo');

    var ITERATOR = require('./_wks')('iterator');

    var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`

    var FF_ITERATOR = '@@iterator';
    var KEYS = 'keys';
    var VALUES = 'values';

    var returnThis = function returnThis() {
      return this;
    };

    module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
      $iterCreate(Constructor, NAME, next);

      var getMethod = function getMethod(kind) {
        if (!BUGGY && kind in proto) return proto[kind];

        switch (kind) {
          case KEYS:
            return function keys() {
              return new Constructor(this, kind);
            };

          case VALUES:
            return function values() {
              return new Constructor(this, kind);
            };
        }

        return function entries() {
          return new Constructor(this, kind);
        };
      };

      var TAG = NAME + ' Iterator';
      var DEF_VALUES = DEFAULT == VALUES;
      var VALUES_BUG = false;
      var proto = Base.prototype;
      var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
      var $default = $native || getMethod(DEFAULT);
      var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
      var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
      var methods, key, IteratorPrototype; // Fix native

      if ($anyNative) {
        IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));

        if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
          // Set @@toStringTag to native iterators
          setToStringTag(IteratorPrototype, TAG, true); // fix for some old engines

          if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
        }
      } // fix Array#{values, @@iterator}.name in V8 / FF


      if (DEF_VALUES && $native && $native.name !== VALUES) {
        VALUES_BUG = true;

        $default = function values() {
          return $native.call(this);
        };
      } // Define iterator


      if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
        hide(proto, ITERATOR, $default);
      } // Plug for library


      Iterators[NAME] = $default;
      Iterators[TAG] = returnThis;

      if (DEFAULT) {
        methods = {
          values: DEF_VALUES ? $default : getMethod(VALUES),
          keys: IS_SET ? $default : getMethod(KEYS),
          entries: $entries
        };
        if (FORCED) for (key in methods) {
          if (!(key in proto)) redefine(proto, key, methods[key]);
        } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
      }

      return methods;
    };
  }, {
    "./_library": "H21C",
    "./_export": "izCb",
    "./_redefine": "PHot",
    "./_hide": "0NXb",
    "./_iterators": "JO4d",
    "./_iter-create": "ebgP",
    "./_set-to-string-tag": "rq3q",
    "./_object-gpo": "8q6y",
    "./_wks": "44AI"
  }],
  "tbKg": [function (require, module, exports) {
    'use strict';

    var $at = require('./_string-at')(true); // 21.1.3.27 String.prototype[@@iterator]()


    require('./_iter-define')(String, 'String', function (iterated) {
      this._t = String(iterated); // target

      this._i = 0; // next index
      // 21.1.5.2.1 %StringIteratorPrototype%.next()
    }, function () {
      var O = this._t;
      var index = this._i;
      var point;
      if (index >= O.length) return {
        value: undefined,
        done: true
      };
      point = $at(O, index);
      this._i += point.length;
      return {
        value: point,
        done: false
      };
    });
  }, {
    "./_string-at": "x5yM",
    "./_iter-define": "mH0U"
  }],
  "Z7e/": [function (require, module, exports) {
    // 22.1.3.31 Array.prototype[@@unscopables]
    var UNSCOPABLES = require('./_wks')('unscopables');

    var ArrayProto = Array.prototype;
    if (ArrayProto[UNSCOPABLES] == undefined) require('./_hide')(ArrayProto, UNSCOPABLES, {});

    module.exports = function (key) {
      ArrayProto[UNSCOPABLES][key] = true;
    };
  }, {
    "./_wks": "44AI",
    "./_hide": "0NXb"
  }],
  "x8b3": [function (require, module, exports) {
    module.exports = function (done, value) {
      return {
        value: value,
        done: !!done
      };
    };
  }, {}],
  "6w+v": [function (require, module, exports) {
    'use strict';

    var addToUnscopables = require('./_add-to-unscopables');

    var step = require('./_iter-step');

    var Iterators = require('./_iterators');

    var toIObject = require('./_to-iobject'); // 22.1.3.4 Array.prototype.entries()
    // 22.1.3.13 Array.prototype.keys()
    // 22.1.3.29 Array.prototype.values()
    // 22.1.3.30 Array.prototype[@@iterator]()


    module.exports = require('./_iter-define')(Array, 'Array', function (iterated, kind) {
      this._t = toIObject(iterated); // target

      this._i = 0; // next index

      this._k = kind; // kind
      // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
    }, function () {
      var O = this._t;
      var kind = this._k;
      var index = this._i++;

      if (!O || index >= O.length) {
        this._t = undefined;
        return step(1);
      }

      if (kind == 'keys') return step(0, index);
      if (kind == 'values') return step(0, O[index]);
      return step(0, [index, O[index]]);
    }, 'values'); // argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)

    Iterators.Arguments = Iterators.Array;
    addToUnscopables('keys');
    addToUnscopables('values');
    addToUnscopables('entries');
  }, {
    "./_add-to-unscopables": "Z7e/",
    "./_iter-step": "x8b3",
    "./_iterators": "JO4d",
    "./_to-iobject": "g6sb",
    "./_iter-define": "mH0U"
  }],
  "v6Aj": [function (require, module, exports) {
    var $iterators = require('./es6.array.iterator');

    var getKeys = require('./_object-keys');

    var redefine = require('./_redefine');

    var global = require('./_global');

    var hide = require('./_hide');

    var Iterators = require('./_iterators');

    var wks = require('./_wks');

    var ITERATOR = wks('iterator');
    var TO_STRING_TAG = wks('toStringTag');
    var ArrayValues = Iterators.Array;
    var DOMIterables = {
      CSSRuleList: true,
      // TODO: Not spec compliant, should be false.
      CSSStyleDeclaration: false,
      CSSValueList: false,
      ClientRectList: false,
      DOMRectList: false,
      DOMStringList: false,
      DOMTokenList: true,
      DataTransferItemList: false,
      FileList: false,
      HTMLAllCollection: false,
      HTMLCollection: false,
      HTMLFormElement: false,
      HTMLSelectElement: false,
      MediaList: true,
      // TODO: Not spec compliant, should be false.
      MimeTypeArray: false,
      NamedNodeMap: false,
      NodeList: true,
      PaintRequestList: false,
      Plugin: false,
      PluginArray: false,
      SVGLengthList: false,
      SVGNumberList: false,
      SVGPathSegList: false,
      SVGPointList: false,
      SVGStringList: false,
      SVGTransformList: false,
      SourceBufferList: false,
      StyleSheetList: true,
      // TODO: Not spec compliant, should be false.
      TextTrackCueList: false,
      TextTrackList: false,
      TouchList: false
    };

    for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
      var NAME = collections[i];
      var explicit = DOMIterables[NAME];
      var Collection = global[NAME];
      var proto = Collection && Collection.prototype;
      var key;

      if (proto) {
        if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
        if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
        Iterators[NAME] = ArrayValues;
        if (explicit) for (key in $iterators) {
          if (!proto[key]) redefine(proto, key, $iterators[key], true);
        }
      }
    }
  }, {
    "./es6.array.iterator": "6w+v",
    "./_object-keys": "U9a7",
    "./_redefine": "PHot",
    "./_global": "5qf4",
    "./_hide": "0NXb",
    "./_iterators": "JO4d",
    "./_wks": "44AI"
  }],
  "KQqW": [function (require, module, exports) {
    require('../../modules/es6.string.iterator');

    require('../../modules/web.dom.iterable');

    module.exports = require('../../modules/_wks-ext').f('iterator');
  }, {
    "../../modules/es6.string.iterator": "tbKg",
    "../../modules/web.dom.iterable": "v6Aj",
    "../../modules/_wks-ext": "AuE7"
  }],
  "/6wJ": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      return Constructor;
    }

    var Utilities = /*#__PURE__*/function () {
      function Utilities() {
        _classCallCheck(this, Utilities);
      }

      _createClass(Utilities, null, [{
        key: "ready",
        value: function ready(fn) {
          if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
            fn();
          } else {
            document.addEventListener('DOMContentLoaded', fn);
          }
        }
      }, {
        key: "objectType",
        value: function objectType(obj) {
          return Object.prototype.toString.call(obj).slice(8, -1);
        }
      }, {
        key: "lightenDarkenColor",
        value: function lightenDarkenColor(col, amt) {
          var usePound = false;

          if (col[0] == "#") {
            col = col.slice(1);
            usePound = true;
          }

          var num = parseInt(col, 16);
          var r = (num >> 16) + amt;

          if (r > 255) {
            r = 255;
          } else if (r < 0) {
            r = 0;
          }

          var b = (num >> 8 & 0x00FF) + amt;

          if (b > 255) {
            b = 255;
          } else if (b < 0) {
            b = 0;
          }

          var g = (num & 0x0000FF) + amt;

          if (g > 255) {
            g = 255;
          } else if (g < 0) {
            g = 0;
          }

          return (usePound ? "#" : "") + (g | b << 8 | r << 16).toString(16);
        }
      }, {
        key: "removeCookie",
        value: function removeCookie() {
          document.cookie = "cconsent=; expires=Thu, 01 Jan 1980 00:00:00 UTC; path=/;";
        } // Create an array of services from Cookieconsent global object
        // Filter based on category or leave empty is all is wanted

      }, {
        key: "listGlobalServices",
        value: function listGlobalServices(category) {
          var categories = []; // Global config objectnot set

          if (typeof window.CookieConsent === 'undefined') return categories; // Category is not specified or opposite

          if (typeof category === 'undefined') {
            for (var key in window.CookieConsent.config.services) {
              categories.push(key);
            }
          } else {
            for (var _key in window.CookieConsent.config.services) {
              if (window.CookieConsent.config.services[_key].category === category) categories.push(_key);
            }
          }

          return categories;
        }
      }, {
        key: "dispatchEvent",
        value: function dispatchEvent(elem, event) {
          var event;

          if (typeof Event === 'function') {
            event = new Event(event);
          } else {
            event = document.createEvent('Event');
            event.initEvent(event, true, true);
          }

          elem.dispatchEvent(event);
        }
      }]);

      return Utilities;
    }();

    exports.default = Utilities;
  }, {}],
  "aJ5U": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;

    var _Utilities = _interopRequireDefault(require("./Utilities"));

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      return Constructor;
    }

    var Filter = /*#__PURE__*/function () {
      function Filter() {
        _classCallCheck(this, Filter);
      }

      _createClass(Filter, [{
        key: "createBlacklist",
        value: function createBlacklist(type) {
          var services = {};

          for (var service in window.CookieConsent.config.services) {
            if (window.CookieConsent.config.services[service].type === type) {
              if (window.CookieConsent.config.categories[window.CookieConsent.config.services[service].category].needed === false) {
                if (window.CookieConsent.config.categories[window.CookieConsent.config.services[service].category].wanted === false) {
                  services[service] = window.CookieConsent.config.services[service];
                }
              }
            }
          }

          var blacklist = [];

          for (var service in services) {
            var type = _Utilities.default.objectType(services[service].search);

            if (type === 'String') {
              blacklist.push(services[service].search);
            } else if (type === 'Array') {
              for (var i = 0; i < services[service].search.length; i++) {
                blacklist.push(services[service].search[i]);
              }
            }
          }

          return blacklist;
        }
      }]);

      return Filter;
    }();

    exports.default = Filter;
  }, {
    "./Utilities": "/6wJ"
  }],
  "UWvR": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;

    var _Filter2 = _interopRequireDefault(require("./Filter"));

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    function _typeof(obj) {
      if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
        _typeof = function _typeof(obj) {
          return _typeof2(obj);
        };
      } else {
        _typeof = function _typeof(obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
        };
      }

      return _typeof(obj);
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      return Constructor;
    }

    function _possibleConstructorReturn(self, call) {
      if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
      }

      return _assertThisInitialized(self);
    }

    function _assertThisInitialized(self) {
      if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }

      return self;
    }

    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
      return _getPrototypeOf(o);
    }

    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }

      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          writable: true,
          configurable: true
        }
      });
      if (superClass) _setPrototypeOf(subClass, superClass);
    }

    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
      };

      return _setPrototypeOf(o, p);
    }

    var InsertScriptFilter = /*#__PURE__*/function (_Filter) {
      _inherits(InsertScriptFilter, _Filter);

      function InsertScriptFilter() {
        _classCallCheck(this, InsertScriptFilter);

        return _possibleConstructorReturn(this, _getPrototypeOf(InsertScriptFilter).call(this));
      }

      _createClass(InsertScriptFilter, [{
        key: "init",
        value: function init() {
          this.overrideAppendChild();
          this.overrideInsertBefore();
        }
      }, {
        key: "overrideAppendChild",
        value: function overrideAppendChild() {
          Element.prototype.appendChild = function (elem) {
            if (arguments[0].tagName === 'SCRIPT') {
              //console.log('Appending:', arguments);
              for (var key in window.CookieConsent.config.services) {
                // Did user opt-in?
                if (window.CookieConsent.config.services[key].type === 'dynamic-script') {
                  if (arguments[0].outerHTML.indexOf(window.CookieConsent.config.services[key].search) >= 0) {
                    if (window.CookieConsent.config.categories[window.CookieConsent.config.services[key].category].wanted === false) {
                      window.CookieConsent.buffer.appendChild.push({
                        'this': this,
                        'category': window.CookieConsent.config.services[key].category,
                        arguments: arguments
                      });
                      return undefined;
                    }
                  }
                }
              }
            }

            return Node.prototype.appendChild.apply(this, arguments);
          };
        }
      }, {
        key: "overrideInsertBefore",
        value: function overrideInsertBefore() {
          Element.prototype.insertBefore = function (elem) {
            if (arguments[0].tagName === 'SCRIPT') {
              //console.log('Inserting:', arguments);
              for (var key in window.CookieConsent.config.services) {
                // Did user opt-in?
                if (window.CookieConsent.config.services[key].type === 'dynamic-script') {
                  if (arguments[0].outerHTML.indexOf(window.CookieConsent.config.services[key].search) >= 0) {
                    if (window.CookieConsent.config.categories[window.CookieConsent.config.services[key].category].wanted === false) {
                      window.CookieConsent.buffer.insertBefore.push({
                        'this': this,
                        'category': window.CookieConsent.config.services[key].category,
                        arguments: arguments
                      });
                      return undefined;
                    }
                  }
                }
              }
            }

            return Node.prototype.insertBefore.apply(this, arguments);
          };
        }
      }]);

      return InsertScriptFilter;
    }(_Filter2.default);

    exports.default = InsertScriptFilter;
  }, {
    "./Filter": "aJ5U"
  }],
  "ob2e": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;

    var _Utilities = _interopRequireDefault(require("./Utilities"));

    var _Filter2 = _interopRequireDefault(require("./Filter"));

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    function _typeof(obj) {
      if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
        _typeof = function _typeof(obj) {
          return _typeof2(obj);
        };
      } else {
        _typeof = function _typeof(obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
        };
      }

      return _typeof(obj);
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      return Constructor;
    }

    function _possibleConstructorReturn(self, call) {
      if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
      }

      return _assertThisInitialized(self);
    }

    function _assertThisInitialized(self) {
      if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }

      return self;
    }

    function _get(target, property, receiver) {
      if (typeof Reflect !== "undefined" && Reflect.get) {
        _get = Reflect.get;
      } else {
        _get = function _get(target, property, receiver) {
          var base = _superPropBase(target, property);

          if (!base) return;
          var desc = Object.getOwnPropertyDescriptor(base, property);

          if (desc.get) {
            return desc.get.call(receiver);
          }

          return desc.value;
        };
      }

      return _get(target, property, receiver || target);
    }

    function _superPropBase(object, property) {
      while (!Object.prototype.hasOwnProperty.call(object, property)) {
        object = _getPrototypeOf(object);
        if (object === null) break;
      }

      return object;
    }

    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
      return _getPrototypeOf(o);
    }

    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }

      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          writable: true,
          configurable: true
        }
      });
      if (superClass) _setPrototypeOf(subClass, superClass);
    }

    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
      };

      return _setPrototypeOf(o, p);
    }

    var ScriptTagFilter = /*#__PURE__*/function (_Filter) {
      _inherits(ScriptTagFilter, _Filter);

      function ScriptTagFilter() {
        _classCallCheck(this, ScriptTagFilter);

        return _possibleConstructorReturn(this, _getPrototypeOf(ScriptTagFilter).call(this));
      }

      _createClass(ScriptTagFilter, [{
        key: "init",
        value: function init() {
          this.filterTags();
        }
      }, {
        key: "filterTags",
        value: function filterTags() {
          var _this = this;

          _Utilities.default.ready(function () {
            var blacklist = _get(_getPrototypeOf(ScriptTagFilter.prototype), "createBlacklist", _this).call(_this, 'script-tag');

            var scriptTags = document.querySelectorAll('script[type="text/plain"]');
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = scriptTags[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var scriptTag = _step.value;

                if (blacklist.indexOf(scriptTag.dataset.consent) < 0) {
                  var newtag = document.createElement('script');
                  var parentNode = scriptTag.parentNode;
                  scriptTag.type = 'text/javascript';
                  var _iteratorNormalCompletion2 = true;
                  var _didIteratorError2 = false;
                  var _iteratorError2 = undefined;

                  try {
                    for (var _iterator2 = scriptTag.attributes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                      var attribute = _step2.value;
                      newtag.setAttribute(attribute.nodeName, attribute.nodeValue);
                    }
                  } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                  } finally {
                    try {
                      if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                        _iterator2.return();
                      }
                    } finally {
                      if (_didIteratorError2) {
                        throw _iteratorError2;
                      }
                    }
                  }

                  newtag.innerHTML = scriptTag.innerHTML;
                  parentNode.insertBefore(newtag, scriptTag);
                  parentNode.removeChild(scriptTag);
                }
              }
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                  _iterator.return();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }
          });
        }
      }]);

      return ScriptTagFilter;
    }(_Filter2.default);

    exports.default = ScriptTagFilter;
  }, {
    "./Utilities": "/6wJ",
    "./Filter": "aJ5U"
  }],
  "935K": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;

    var _Filter2 = _interopRequireDefault(require("./Filter"));

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    function _typeof(obj) {
      if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
        _typeof = function _typeof(obj) {
          return _typeof2(obj);
        };
      } else {
        _typeof = function _typeof(obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
        };
      }

      return _typeof(obj);
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      return Constructor;
    }

    function _possibleConstructorReturn(self, call) {
      if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
      }

      return _assertThisInitialized(self);
    }

    function _assertThisInitialized(self) {
      if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }

      return self;
    }

    function _get(target, property, receiver) {
      if (typeof Reflect !== "undefined" && Reflect.get) {
        _get = Reflect.get;
      } else {
        _get = function _get(target, property, receiver) {
          var base = _superPropBase(target, property);

          if (!base) return;
          var desc = Object.getOwnPropertyDescriptor(base, property);

          if (desc.get) {
            return desc.get.call(receiver);
          }

          return desc.value;
        };
      }

      return _get(target, property, receiver || target);
    }

    function _superPropBase(object, property) {
      while (!Object.prototype.hasOwnProperty.call(object, property)) {
        object = _getPrototypeOf(object);
        if (object === null) break;
      }

      return object;
    }

    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
      return _getPrototypeOf(o);
    }

    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }

      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          writable: true,
          configurable: true
        }
      });
      if (superClass) _setPrototypeOf(subClass, superClass);
    }

    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
      };

      return _setPrototypeOf(o, p);
    }

    var WrapperFilter = /*#__PURE__*/function (_Filter) {
      _inherits(WrapperFilter, _Filter);

      function WrapperFilter() {
        _classCallCheck(this, WrapperFilter);

        return _possibleConstructorReturn(this, _getPrototypeOf(WrapperFilter).call(this));
      }

      _createClass(WrapperFilter, [{
        key: "init",
        value: function init() {
          this.filterWrappers();
        }
      }, {
        key: "filterWrappers",
        value: function filterWrappers() {
          var blacklist = _get(_getPrototypeOf(WrapperFilter.prototype), "createBlacklist", this).call(this, 'wrapped');

          function wrapper() {
            var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
            var callback = arguments.length > 1 ? arguments[1] : undefined;

            if (blacklist.indexOf(name) < 0) {
              callback();
            }
          }

          window.CookieConsent.wrapper = wrapper;
        }
      }]);

      return WrapperFilter;
    }(_Filter2.default);

    exports.default = WrapperFilter;
  }, {
    "./Filter": "aJ5U"
  }],
  "2E//": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;

    var _Filter2 = _interopRequireDefault(require("./Filter"));

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    function _typeof(obj) {
      if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
        _typeof = function _typeof(obj) {
          return _typeof2(obj);
        };
      } else {
        _typeof = function _typeof(obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
        };
      }

      return _typeof(obj);
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      return Constructor;
    }

    function _possibleConstructorReturn(self, call) {
      if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
      }

      return _assertThisInitialized(self);
    }

    function _assertThisInitialized(self) {
      if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }

      return self;
    }

    function _get(target, property, receiver) {
      if (typeof Reflect !== "undefined" && Reflect.get) {
        _get = Reflect.get;
      } else {
        _get = function _get(target, property, receiver) {
          var base = _superPropBase(target, property);

          if (!base) return;
          var desc = Object.getOwnPropertyDescriptor(base, property);

          if (desc.get) {
            return desc.get.call(receiver);
          }

          return desc.value;
        };
      }

      return _get(target, property, receiver || target);
    }

    function _superPropBase(object, property) {
      while (!Object.prototype.hasOwnProperty.call(object, property)) {
        object = _getPrototypeOf(object);
        if (object === null) break;
      }

      return object;
    }

    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
      return _getPrototypeOf(o);
    }

    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }

      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          writable: true,
          configurable: true
        }
      });
      if (superClass) _setPrototypeOf(subClass, superClass);
    }

    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
      };

      return _setPrototypeOf(o, p);
    }

    var LocalCookieFilter = /*#__PURE__*/function (_Filter) {
      _inherits(LocalCookieFilter, _Filter);

      function LocalCookieFilter() {
        _classCallCheck(this, LocalCookieFilter);

        return _possibleConstructorReturn(this, _getPrototypeOf(LocalCookieFilter).call(this));
      }

      _createClass(LocalCookieFilter, [{
        key: "init",
        value: function init() {
          this.filterlocalCookies();
        }
      }, {
        key: "getCookieDescriptor",
        value: function getCookieDescriptor() {
          var cookieDescriptor;
          cookieDescriptor = Object.getOwnPropertyDescriptor(document, 'cookie') || Object.getOwnPropertyDescriptor(HTMLDocument.prototype, 'cookie');

          if (!cookieDescriptor) {
            cookieDescriptor = {};
            cookieDescriptor.get = HTMLDocument.prototype.__lookupGetter__("cookie");
            cookieDescriptor.set = HTMLDocument.prototype.__lookupSetter__("cookie");
          }

          return cookieDescriptor;
        }
      }, {
        key: "filterlocalCookies",
        value: function filterlocalCookies() {
          // TODO - implement buffer
          var blacklist = _get(_getPrototypeOf(LocalCookieFilter.prototype), "createBlacklist", this).call(this, 'localcookie');

          var cookieDescriptor = this.getCookieDescriptor();
          Object.defineProperty(document, "cookie", {
            configurable: true,
            get: function get() {
              return cookieDescriptor.get.apply(document);
            },
            set: function set() {
              var cookieArguments = arguments;

              if (blacklist.length) {
                var cookieName = arguments[0].split('=')[0];
                Array.prototype.forEach.call(blacklist, function (blacklistItem) {
                  if (cookieName.indexOf(blacklistItem) < 0) cookieDescriptor.set.apply(document, cookieArguments);
                });
              } else {
                cookieDescriptor.set.apply(document, cookieArguments);
              }
            }
          });
        }
      }]);

      return LocalCookieFilter;
    }(_Filter2.default);

    exports.default = LocalCookieFilter;
  }, {
    "./Filter": "aJ5U"
  }],
  "GuEK": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.text = exports.svg = exports.s = exports.setChildren = exports.setStyle = exports.setAttr = exports.Router = exports.router = exports.Place = exports.place = exports.unmount = exports.mount = exports.ListPool = exports.listPool = exports.List = exports.list = exports.html = exports.h = exports.el = void 0;
    var HASH = '#'.charCodeAt(0);
    var DOT = '.'.charCodeAt(0);
    var TAG_NAME = 0;
    var ID = 1;
    var CLASS_NAME = 2;

    var parseQuery = function parseQuery(query) {
      var tag = null;
      var id = null;
      var className = null;
      var mode = TAG_NAME;
      var offset = 0;

      for (var i = 0; i <= query.length; i++) {
        var char = query.charCodeAt(i);
        var isHash = char === HASH;
        var isDot = char === DOT;
        var isEnd = !char;

        if (isHash || isDot || isEnd) {
          if (mode === TAG_NAME) {
            if (i === 0) {
              tag = 'div';
            } else {
              tag = query.substring(offset, i);
            }
          } else if (mode === ID) {
            id = query.substring(offset, i);
          } else {
            if (className) {
              className += ' ' + query.substring(offset, i);
            } else {
              className = query.substring(offset, i);
            }
          }

          if (isHash) {
            mode = ID;
          } else if (isDot) {
            mode = CLASS_NAME;
          }

          offset = i + 1;
        }
      }

      return {
        tag: tag,
        id: id,
        className: className
      };
    };

    var createElement = function createElement(query, ns) {
      var ref = parseQuery(query);
      var tag = ref.tag;
      var id = ref.id;
      var className = ref.className;
      var element = ns ? document.createElementNS(ns, tag) : document.createElement(tag);

      if (id) {
        element.id = id;
      }

      if (className) {
        if (ns) {
          element.setAttribute('class', className);
        } else {
          element.className = className;
        }
      }

      return element;
    };

    var unmount = function unmount(parent, child) {
      var parentEl = getEl(parent);
      var childEl = getEl(child);

      if (child === childEl && childEl.__redom_view) {
        // try to look up the view if not provided
        child = childEl.__redom_view;
      }

      if (childEl.parentNode) {
        doUnmount(child, childEl, parentEl);
        parentEl.removeChild(childEl);
      }

      return child;
    };

    exports.unmount = unmount;

    var doUnmount = function doUnmount(child, childEl, parentEl) {
      var hooks = childEl.__redom_lifecycle;

      if (hooksAreEmpty(hooks)) {
        childEl.__redom_mounted = false;
        return;
      }

      var traverse = parentEl;

      if (childEl.__redom_mounted) {
        trigger(childEl, 'onunmount');
      }

      while (traverse) {
        var parentHooks = traverse.__redom_lifecycle || {};

        for (var hook in hooks) {
          if (parentHooks[hook]) {
            parentHooks[hook] -= hooks[hook];
          }
        }

        if (hooksAreEmpty(parentHooks)) {
          traverse.__redom_lifecycle = null;
        }

        traverse = traverse.parentNode;
      }
    };

    var hooksAreEmpty = function hooksAreEmpty(hooks) {
      if (hooks == null) {
        return true;
      }

      for (var key in hooks) {
        if (hooks[key]) {
          return false;
        }
      }

      return true;
    };

    var hookNames = ['onmount', 'onremount', 'onunmount'];
    var shadowRootAvailable = typeof window !== 'undefined' && 'ShadowRoot' in window;

    var mount = function mount(parent, child, before, replace) {
      var parentEl = getEl(parent);
      var childEl = getEl(child);

      if (child === childEl && childEl.__redom_view) {
        // try to look up the view if not provided
        child = childEl.__redom_view;
      }

      if (child !== childEl) {
        childEl.__redom_view = child;
      }

      var wasMounted = childEl.__redom_mounted;
      var oldParent = childEl.parentNode;

      if (wasMounted && oldParent !== parentEl) {
        doUnmount(child, childEl, oldParent);
      }

      if (before != null) {
        if (replace) {
          parentEl.replaceChild(childEl, getEl(before));
        } else {
          parentEl.insertBefore(childEl, getEl(before));
        }
      } else {
        parentEl.appendChild(childEl);
      }

      doMount(child, childEl, parentEl, oldParent);
      return child;
    };

    exports.mount = mount;

    var doMount = function doMount(child, childEl, parentEl, oldParent) {
      var hooks = childEl.__redom_lifecycle || (childEl.__redom_lifecycle = {});
      var remount = parentEl === oldParent;
      var hooksFound = false;

      for (var i = 0, list = hookNames; i < list.length; i += 1) {
        var hookName = list[i];

        if (!remount) {
          // if already mounted, skip this phase
          if (child !== childEl) {
            // only Views can have lifecycle events
            if (hookName in child) {
              hooks[hookName] = (hooks[hookName] || 0) + 1;
            }
          }
        }

        if (hooks[hookName]) {
          hooksFound = true;
        }
      }

      if (!hooksFound) {
        childEl.__redom_mounted = true;
        return;
      }

      var traverse = parentEl;
      var triggered = false;

      if (remount || traverse && traverse.__redom_mounted) {
        trigger(childEl, remount ? 'onremount' : 'onmount');
        triggered = true;
      }

      while (traverse) {
        var parent = traverse.parentNode;
        var parentHooks = traverse.__redom_lifecycle || (traverse.__redom_lifecycle = {});

        for (var hook in hooks) {
          parentHooks[hook] = (parentHooks[hook] || 0) + hooks[hook];
        }

        if (triggered) {
          break;
        } else {
          if (traverse === document || shadowRootAvailable && traverse instanceof window.ShadowRoot || parent && parent.__redom_mounted) {
            trigger(traverse, remount ? 'onremount' : 'onmount');
            triggered = true;
          }

          traverse = parent;
        }
      }
    };

    var trigger = function trigger(el, eventName) {
      if (eventName === 'onmount' || eventName === 'onremount') {
        el.__redom_mounted = true;
      } else if (eventName === 'onunmount') {
        el.__redom_mounted = false;
      }

      var hooks = el.__redom_lifecycle;

      if (!hooks) {
        return;
      }

      var view = el.__redom_view;
      var hookCount = 0;
      view && view[eventName] && view[eventName]();

      for (var hook in hooks) {
        if (hook) {
          hookCount++;
        }
      }

      if (hookCount) {
        var traverse = el.firstChild;

        while (traverse) {
          var next = traverse.nextSibling;
          trigger(traverse, eventName);
          traverse = next;
        }
      }
    };

    var setStyle = function setStyle(view, arg1, arg2) {
      var el = getEl(view);

      if (arg2 !== undefined) {
        el.style[arg1] = arg2;
      } else if (typeof arg1 === 'string') {
        el.setAttribute('style', arg1);
      } else {
        for (var key in arg1) {
          setStyle(el, key, arg1[key]);
        }
      }
    };
    /* global SVGElement */


    exports.setStyle = setStyle;
    var xlinkns = 'http://www.w3.org/1999/xlink';

    var setAttr = function setAttr(view, arg1, arg2) {
      var el = getEl(view);
      var isSVG = el instanceof SVGElement;
      var isFunc = typeof arg2 === 'function';

      if (arg2 !== undefined) {
        if (arg1 === 'style') {
          setStyle(el, arg2);
        } else if (isSVG && isFunc) {
          el[arg1] = arg2;
        } else if (arg1 === 'dataset') {
          setData(el, arg2);
        } else if (!isSVG && (arg1 in el || isFunc)) {
          el[arg1] = arg2;
        } else {
          if (isSVG && arg1 === 'xlink') {
            setXlink(el, arg2);
            return;
          }

          el.setAttribute(arg1, arg2);
        }
      } else {
        for (var key in arg1) {
          setAttr(el, key, arg1[key]);
        }
      }
    };

    exports.setAttr = setAttr;

    function setXlink(el, obj) {
      for (var key in obj) {
        el.setAttributeNS(xlinkns, key, obj[key]);
      }
    }

    function setData(el, obj) {
      for (var key in obj) {
        el.dataset[key] = obj[key];
      }
    }

    var text = function text(str) {
      return document.createTextNode(str != null ? str : '');
    };

    exports.text = text;

    var parseArguments = function parseArguments(element, args) {
      for (var i = 0, list = args; i < list.length; i += 1) {
        var arg = list[i];

        if (arg !== 0 && !arg) {
          continue;
        }

        var type = _typeof2(arg); // support middleware


        if (type === 'function') {
          arg(element);
        } else if (type === 'string' || type === 'number') {
          element.appendChild(text(arg));
        } else if (isNode(getEl(arg))) {
          mount(element, arg);
        } else if (arg.length) {
          parseArguments(element, arg);
        } else if (type === 'object') {
          setAttr(element, arg);
        }
      }
    };

    var ensureEl = function ensureEl(parent) {
      return typeof parent === 'string' ? html(parent) : getEl(parent);
    };

    var getEl = function getEl(parent) {
      return parent.nodeType && parent || !parent.el && parent || getEl(parent.el);
    };

    var isNode = function isNode(a) {
      return a && a.nodeType;
    };

    var htmlCache = {};

    var memoizeHTML = function memoizeHTML(query) {
      return htmlCache[query] || (htmlCache[query] = createElement(query));
    };

    var html = function html(query) {
      var args = [],
          len = arguments.length - 1;

      while (len-- > 0) {
        args[len] = arguments[len + 1];
      }

      var element;

      var type = _typeof2(query);

      if (type === 'string') {
        element = memoizeHTML(query).cloneNode(false);
      } else if (isNode(query)) {
        element = query.cloneNode(false);
      } else if (type === 'function') {
        var Query = query;
        element = new (Function.prototype.bind.apply(Query, [null].concat(args)))();
      } else {
        throw new Error('At least one argument required');
      }

      parseArguments(getEl(element), args);
      return element;
    };

    exports.html = html;

    html.extend = function (query) {
      var args = [],
          len = arguments.length - 1;

      while (len-- > 0) {
        args[len] = arguments[len + 1];
      }

      var clone = memoizeHTML(query);
      return html.bind.apply(html, [this, clone].concat(args));
    };

    var el = html;
    exports.el = el;
    var h = html;
    exports.h = h;

    var setChildren = function setChildren(parent) {
      var children = [],
          len = arguments.length - 1;

      while (len-- > 0) {
        children[len] = arguments[len + 1];
      }

      var parentEl = getEl(parent);
      var current = traverse(parent, children, parentEl.firstChild);

      while (current) {
        var next = current.nextSibling;
        unmount(parent, current);
        current = next;
      }
    };

    exports.setChildren = setChildren;

    function traverse(parent, children, _current) {
      var current = _current;
      var childEls = new Array(children.length);

      for (var i = 0; i < children.length; i++) {
        childEls[i] = children[i] && getEl(children[i]);
      }

      for (var i$1 = 0; i$1 < children.length; i$1++) {
        var child = children[i$1];

        if (!child) {
          continue;
        }

        var childEl = childEls[i$1];

        if (childEl === current) {
          current = current.nextSibling;
          continue;
        }

        if (isNode(childEl)) {
          var next = current && current.nextSibling;
          var exists = child.__redom_index != null;
          var replace = exists && next === childEls[i$1 + 1];
          mount(parent, child, current, replace);

          if (replace) {
            current = next;
          }

          continue;
        }

        if (child.length != null) {
          current = traverse(parent, child, current);
        }
      }

      return current;
    }

    var propKey = function propKey(key) {
      return function (item) {
        return item[key];
      };
    };

    var listPool = function listPool(View, key, initData) {
      return new ListPool(View, key, initData);
    };

    exports.listPool = listPool;

    var ListPool = function ListPool(View, key, initData) {
      this.View = View;
      this.initData = initData;
      this.oldLookup = {};
      this.lookup = {};
      this.oldViews = [];
      this.views = [];

      if (key != null) {
        this.key = typeof key === 'function' ? key : propKey(key);
      }
    };

    exports.ListPool = ListPool;

    ListPool.prototype.update = function update(data, context) {
      var ref = this;
      var View = ref.View;
      var key = ref.key;
      var initData = ref.initData;
      var keySet = key != null;
      var oldLookup = this.lookup;
      var newLookup = {};
      var newViews = new Array(data.length);
      var oldViews = this.views;

      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        var view = void 0;

        if (keySet) {
          var id = key(item);
          view = oldLookup[id] || new View(initData, item, i, data);
          newLookup[id] = view;
          view.__redom_id = id;
        } else {
          view = oldViews[i] || new View(initData, item, i, data);
        }

        view.update && view.update(item, i, data, context);
        var el = getEl(view.el);
        el.__redom_view = view;
        newViews[i] = view;
      }

      this.oldViews = oldViews;
      this.views = newViews;
      this.oldLookup = oldLookup;
      this.lookup = newLookup;
    };

    var list = function list(parent, View, key, initData) {
      return new List(parent, View, key, initData);
    };

    exports.list = list;

    var List = function List(parent, View, key, initData) {
      this.__redom_list = true;
      this.View = View;
      this.initData = initData;
      this.views = [];
      this.pool = new ListPool(View, key, initData);
      this.el = ensureEl(parent);
      this.keySet = key != null;
    };

    exports.List = List;

    List.prototype.update = function update(data, context) {
      if (data === void 0) data = [];
      var ref = this;
      var keySet = ref.keySet;
      var oldViews = this.views;
      this.pool.update(data, context);
      var ref$1 = this.pool;
      var views = ref$1.views;
      var lookup = ref$1.lookup;

      if (keySet) {
        for (var i = 0; i < oldViews.length; i++) {
          var oldView = oldViews[i];
          var id = oldView.__redom_id;

          if (lookup[id] == null) {
            oldView.__redom_index = null;
            unmount(this, oldView);
          }
        }
      }

      for (var i$1 = 0; i$1 < views.length; i$1++) {
        var view = views[i$1];
        view.__redom_index = i$1;
      }

      setChildren(this, views);

      if (keySet) {
        this.lookup = lookup;
      }

      this.views = views;
    };

    List.extend = function (parent, View, key, initData) {
      return List.bind(List, parent, View, key, initData);
    };

    list.extend = List.extend;
    /* global Node */

    var place = function place(View, initData) {
      return new Place(View, initData);
    };

    exports.place = place;

    var Place = function Place(View, initData) {
      this.el = text('');
      this.visible = false;
      this.view = null;
      this._placeholder = this.el;

      if (View instanceof Node) {
        this._el = View;
      } else {
        this._View = View;
      }

      this._initData = initData;
    };

    exports.Place = Place;

    Place.prototype.update = function update(visible, data) {
      var placeholder = this._placeholder;
      var parentNode = this.el.parentNode;

      if (visible) {
        if (!this.visible) {
          if (this._el) {
            mount(parentNode, this._el, placeholder);
            unmount(parentNode, placeholder);
            this.el = this._el;
            this.visible = visible;
            return;
          }

          var View = this._View;
          var view = new View(this._initData);
          this.el = getEl(view);
          this.view = view;
          mount(parentNode, view, placeholder);
          unmount(parentNode, placeholder);
        }

        this.view && this.view.update && this.view.update(data);
      } else {
        if (this.visible) {
          if (this._el) {
            mount(parentNode, placeholder, this._el);
            unmount(parentNode, this._el);
            this.el = placeholder;
            this.visible = visible;
            return;
          }

          mount(parentNode, placeholder, this.view);
          unmount(parentNode, this.view);
          this.el = placeholder;
          this.view = null;
        }
      }

      this.visible = visible;
    };

    var router = function router(parent, Views, initData) {
      return new Router(parent, Views, initData);
    };

    exports.router = router;

    var Router = function Router(parent, Views, initData) {
      this.el = ensureEl(parent);
      this.Views = Views;
      this.initData = initData;
    };

    exports.Router = Router;

    Router.prototype.update = function update(route, data) {
      if (route !== this.route) {
        var Views = this.Views;
        var View = Views[route];
        this.route = route;
        this.view = View && new View(this.initData, data);
        setChildren(this.el, [this.view]);
      }

      this.view && this.view.update && this.view.update(data, route);
    };

    var ns = 'http://www.w3.org/2000/svg';
    var svgCache = {};

    var memoizeSVG = function memoizeSVG(query) {
      return svgCache[query] || (svgCache[query] = createElement(query, ns));
    };

    var svg = function svg(query) {
      var args = [],
          len = arguments.length - 1;

      while (len-- > 0) {
        args[len] = arguments[len + 1];
      }

      var element;

      var type = _typeof2(query);

      if (type === 'string') {
        element = memoizeSVG(query).cloneNode(false);
      } else if (isNode(query)) {
        element = query.cloneNode(false);
      } else if (type === 'function') {
        var Query = query;
        element = new (Function.prototype.bind.apply(Query, [null].concat(args)))();
      } else {
        throw new Error('At least one argument required');
      }

      parseArguments(getEl(element), args);
      return element;
    };

    exports.svg = svg;

    svg.extend = function (query) {
      var clone = memoizeSVG(query);
      return svg.bind(this, clone);
    };

    svg.ns = ns;
    var s = svg;
    exports.s = s;
  }, {}],
  "4LWe": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      return Constructor;
    }

    var Language = /*#__PURE__*/function () {
      function Language() {
        _classCallCheck(this, Language);
      }

      _createClass(Language, [{
        key: "setLocale",
        value: function setLocale(locale) {
          window.CookieConsent.config.language.current = locale;
        }
      }], [{
        key: "getTranslation",
        value: function getTranslation(object, locale, key) {
          var currentLocale;
          if (!object.hasOwnProperty('language')) return '[Missing language object]';
          if (!object.language.hasOwnProperty('locale')) return '[Missing locale object]';
          currentLocale = object.language.locale.hasOwnProperty(locale) ? locale : 'en';
          return object.language.locale[currentLocale].hasOwnProperty(key) ? object.language.locale[currentLocale][key] : '[Missing translation]';
        }
      }]);

      return Language;
    }();

    exports.default = Language;
  }, {}],
  "/Qw2": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;

    var _redom = require("redom");

    var _Language = _interopRequireDefault(require("./Language"));

    var _Utilities = _interopRequireDefault(require("./Utilities"));

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      return Constructor;
    }

    var Interface = /*#__PURE__*/function () {
      function Interface() {
        _classCallCheck(this, Interface);

        this.elements = {};
      }

      _createClass(Interface, [{
        key: "buildStyle",
        value: function buildStyle() {
          return (0, _redom.el)('style', '#cconsent-bar, #cconsent-bar * { box-sizing:border-box }', '#cconsent-bar { background-color:' + window.CookieConsent.config.theme.barColor + '; color:' + window.CookieConsent.config.theme.barTextColor + '; padding:15px; text-align:right; font-family:sans-serif; font-size:14px; line-height:18px; position:fixed; bottom:0; left:0; width:100%; z-index:9998; transform: translateY(0); transition: transform .6s ease-in-out; transition-delay: .3s;}', '#cconsent-bar.ccb--hidden {transform: translateY(100%); display:block;}', '#cconsent-bar .ccb__wrapper { display:flex; flex-wrap:wrap; justify-content:space-between; max-width:1800px; margin:0 auto;}', '#cconsent-bar .ccb__left { align-self:center; text-align:left; margin: 15px 0;}', '#cconsent-bar .ccb__right { align-self:center; white-space: nowrap;}', '#cconsent-bar .ccb__right > div {display:inline-block; color:#FFF;}', '#cconsent-bar a { text-decoration:underline; color:' + window.CookieConsent.config.theme.barTextColor + '; }', '#cconsent-bar button { line-height:normal; font-size:14px; border:none; padding:10px 10px; color:' + window.CookieConsent.config.theme.barMainButtonTextColor + '; background-color:' + window.CookieConsent.config.theme.barMainButtonColor + ';}', '#cconsent-bar a.ccb__edit { margin-right:15px }', '#cconsent-bar a:hover, #cconsent-bar button:hover { cursor:pointer; }', '#cconsent-modal { display:none; font-size:14px; line-height:18px; color:#666; width: 100vw; height: 100vh; position:fixed; left:0; top:0; right:0; bottom:0; font-family:sans-serif; font-size:14px; background-color:rgba(0,0,0,0.6); z-index:9999; align-items:center; justify-content:center;}', '@media (max-width: 600px) { #cconsent-modal { height: 100% } }', '#cconsent-modal h2, #cconsent-modal h3 {color:#333}', '#cconsent-modal.ccm--visible {display:flex}', '#cconsent-modal .ccm__content { max-width:600px; min-height:500px; max-height:600px; overflow-Y:auto; background-color:#EFEFEF; }', '@media (max-width: 600px) { #cconsent-modal .ccm__content { max-width:100vw; height:100%; max-height:initial; }}', '#cconsent-modal .ccm__content > .ccm__content__heading { border-bottom:1px solid #D8D8D8; padding:35px 35px 20px; background-color:#EFEFEF; position:relative;}', '#cconsent-modal .ccm__content > .ccm__content__heading h2 { font-size:21px; font-weight:600; color:#333; margin:0 }', '#cconsent-modal .ccm__content > .ccm__content__heading .ccm__cheading__close {font-weight:600; color:#888; cursor:pointer; font-size:26px; position: absolute; right:15px; top: 15px;}', '#cconsent-modal h2, #cconsent-modal h3 {margin-top:0}', '#cconsent-modal .ccm__content > .ccm__content__body { background-color:#FFF;}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tabgroup {margin:0; border-bottom: 1px solid #D8D8D8; }', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tabgroup .ccm__tab-head::before { position:absolute; left:35px; font-size:1.4em; font-weight: 600; color:#E56385; content:"×"; display:inline-block; margin-right: 20px;}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tabgroup.checked-5jhk .ccm__tab-head::before {font-size:1em; content:"✔"; color:#28A834}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tabgroup .ccm__tab-head .ccm__tab-head__icon-wedge { transition: transform .3s ease-out; transform-origin: 16px 6px 0; position:absolute;right:25px; top:50%; transform:rotate(0deg); transform:translateY(-50%)}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tabgroup .ccm__tab-head .ccm__tab-head__icon-wedge > svg { pointer-events: none; }', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tabgroup.ccm__tabgroup--open .ccm__tab-head .ccm__tab-head__icon-wedge {transform:rotate(-180deg)}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-head {color:#333; padding:17px 35px 17px 56px; margin:0}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content {padding:25px 35px; margin:0}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-head { transition: background-color .5s ease-out }', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-head:hover { background-color:#F9F9F9 }', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-head {font-weight:600; cursor:pointer; position:relative;}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tabgroup .ccm__tab-content {display:none;}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tabgroup.ccm__tabgroup--open .ccm__tab-head { background-color:#F9F9F9 }', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tabgroup.ccm__tabgroup--open .ccm__tab-content {display:flex;}', '@media (max-width: 600px) { #cconsent-modal .ccm__content > .ccm__content__body .ccm__tabgroup.ccm__tabgroup--open .ccm__tab-content {flex-direction:column} }', '@media (max-width: 600px) { #cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__left { margin-bottom:20px; } }', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__left .ccm__switch-component {display:flex; margin-right:35px; align-items:center;}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__left .ccm__switch-component > div {font-weight:600;}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__left .ccm__switch-group {width:40px; height:20px; margin:0 10px; position:relative;}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__left .ccm__switch {position: absolute; top:0; right:0; display: inline-block; width: 40px; height: 20px;}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__left .ccm__switch input {display:none;}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__left .ccm__switch .ccm__switch__slider  {position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; border-radius:10px; -webkit-transition: .4s; transition: .4s;}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__left .ccm__switch .ccm__switch__slider:before  {position: absolute; content: ""; height: 12px; width: 12px; left: 4px; bottom: 4px; background-color: white; border-radius:50%; -webkit-transition: .4s; transition: .4s;}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__left .ccm__switch input:checked + .ccm__switch__slider  {background-color: #28A834;}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__left .ccm__switch input:focus + .ccm__switch__slider  {box-shadow: 0 0 1px #28A834;}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__left .ccm__switch input:checked + .ccm__switch__slider:before  {-webkit-transform: translateX(20px); -ms-transform: translateX(20px); transform: translateX(20px);}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content h3 {font-size:18px; margin-bottom:10px; line-height:1;}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content p {color:#444; margin-bottom:0}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__list:not(:empty) {margin-top:30px;}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__list .ccm__list__title {color:#333; font-weight:600;}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__list ul { margin:15px 0; padding-left:15px }', '#cconsent-modal .ccm__footer { padding:35px; background-color:#EFEFEF; text-align:center; display: flex; align-items:center; justify-content:flex-end; }', '#cconsent-modal .ccm__footer button { line-height:normal; font-size:14px; transition: background-color .5s ease-out; background-color:' + window.CookieConsent.config.theme.modalMainButtonColor + '; color:' + window.CookieConsent.config.theme.modalMainButtonTextColor + '; border:none; padding:13px; min-width:110px; border-radius: 2px; cursor:pointer; }', '#cconsent-modal .ccm__footer button:hover { background-color:' + _Utilities.default.lightenDarkenColor(window.CookieConsent.config.theme.modalMainButtonColor, -20) + '; }', '#cconsent-modal .ccm__footer button#ccm__footer__consent-modal-submit {  margin-right:10px; }');
        }
      }, {
        key: "buildBar",
        value: function buildBar() {
          return (0, _redom.el)('div#cconsent-bar.ccb--hidden', (0, _redom.el)("div.ccb__wrapper", (0, _redom.el)('div.ccb__left', (0, _redom.el)('div.cc-text', _Language.default.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'barMainText'))), (0, _redom.el)('div.ccb__right', (0, _redom.el)('div.ccb__button', (0, _redom.el)('a.ccb__edit', _Language.default.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'barLinkSetting')), (0, _redom.el)('button.consent-give', _Language.default.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'barBtnAcceptAll'))))));
        }
      }, {
        key: "buildModal",
        value: function buildModal() {
          // Cookie names list middleware
          var listCookies = function listCookies(category) {
            var list = [];

            for (var service in window.CookieConsent.config.services) {
              window.CookieConsent.config.services[service].category === category && list.push(window.CookieConsent.config.services[service]);
            }

            if (list.length) {
              var listItems = [];

              for (var item in list) {
                listItems.push((0, _redom.el)('li', _Language.default.getTranslation(list[item], window.CookieConsent.config.language.current, 'name')));
              }

              return [(0, _redom.el)('div.ccm__list', (0, _redom.el)('span.ccm__list__title', _Language.default.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'modalAffectedSolutions')), (0, _redom.el)('ul', listItems))];
            }
          };

          function modalTabGroups() {
            var contentItems = [];
            var i = 0;

            for (var key in window.CookieConsent.config.categories) {
              contentItems.push((0, _redom.el)('dl.ccm__tabgroup' + '.' + key + (window.CookieConsent.config.categories[key].checked ? '.checked-5jhk' : ''), {
                'data-category': key
              }, (0, _redom.el)('dt.ccm__tab-head', _Language.default.getTranslation(window.CookieConsent.config.categories[key], window.CookieConsent.config.language.current, 'name'), (0, _redom.el)('a.ccm__tab-head__icon-wedge', (0, _redom.el)(document.createElementNS("http://www.w3.org/2000/svg", "svg"), {
                version: "1.2",
                preserveAspectRatio: "none",
                viewBox: "0 0 24 24",
                class: "icon-wedge-svg",
                "data-id": "e9b3c566e8c14cfea38af128759b91a3",
                style: "opacity: 1; mix-blend-mode: normal; fill: rgb(51, 51, 51); width: 32px; height: 32px;"
              }, (0, _redom.el)(document.createElementNS("http://www.w3.org/2000/svg", "path"), {
                'xmlns:default': "http://www.w3.org/2000/svg",
                id: "angle-down",
                d: "M17.2,9.84c0-0.09-0.04-0.18-0.1-0.24l-0.52-0.52c-0.13-0.13-0.33-0.14-0.47-0.01c0,0-0.01,0.01-0.01,0.01  l-4.1,4.1l-4.09-4.1C7.78,8.94,7.57,8.94,7.44,9.06c0,0-0.01,0.01-0.01,0.01L6.91,9.6c-0.13,0.13-0.14,0.33-0.01,0.47  c0,0,0.01,0.01,0.01,0.01l4.85,4.85c0.13,0.13,0.33,0.14,0.47,0.01c0,0,0.01-0.01,0.01-0.01l4.85-4.85c0.06-0.06,0.1-0.15,0.1-0.24  l0,0H17.2z",
                style: "fill: rgb(51, 51, 51);"
              })))), (0, _redom.el)('dd.ccm__tab-content', (0, _redom.el)('div.ccm__tab-content__left', !window.CookieConsent.config.categories[key].needed && (0, _redom.el)('div.ccm__switch-component', (0, _redom.el)('div.status-off', _Language.default.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'off')), (0, _redom.el)('div.ccm__switch-group', (0, _redom.el)('label.ccm__switch', (0, _redom.el)('input.category-onoff', {
                type: 'checkbox',
                'data-category': key,
                'checked': window.CookieConsent.config.categories[key].checked
              }), (0, _redom.el)('span.ccm__switch__slider'))), (0, _redom.el)('div.status-on', _Language.default.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'on')))), (0, _redom.el)('div.right', (0, _redom.el)('h3', _Language.default.getTranslation(window.CookieConsent.config.categories[key], window.CookieConsent.config.language.current, 'name')), (0, _redom.el)('p', _Language.default.getTranslation(window.CookieConsent.config.categories[key], window.CookieConsent.config.language.current, 'description')), (0, _redom.el)('div.ccm__list', listCookies(key))))));
              i++;
            }

            return contentItems;
          }

          return (0, _redom.el)('div#cconsent-modal', (0, _redom.el)('div.ccm__content', (0, _redom.el)('div.ccm__content__heading', (0, _redom.el)('h2', _Language.default.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'modalMainTitle')), (0, _redom.el)('p', _Language.default.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'modalMainText'), window.CookieConsent.config.modalMainTextMoreLink ? (0, _redom.el)('a', {
            href: window.CookieConsent.config.modalMainTextMoreLink,
            target: '_blank',
            rel: 'noopener noreferrer'
          }, _Language.default.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'modalMainTitle')) : null), (0, _redom.el)('div.ccm__cheading__close', '×')), (0, _redom.el)('div.ccm__content__body', (0, _redom.el)('div.ccm__tabs', modalTabGroups())), (0, _redom.el)('div.ccm__footer', (0, _redom.el)('button#ccm__footer__consent-modal-submit', _Language.default.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'modalBtnSave')), (0, _redom.el)('button.consent-give', _Language.default.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'modalBtnAcceptAll')))));
        }
      }, {
        key: "modalRedrawIcons",
        value: function modalRedrawIcons() {
          var tabGroups = this.elements['modal'].querySelectorAll('.ccm__tabgroup');
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = tabGroups[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var tabGroup = _step.value;

              if (window.CookieConsent.config.categories[tabGroup.dataset.category].checked) {
                if (!tabGroup.classList.contains('checked-5jhk')) {
                  tabGroup.classList.add('checked-5jhk');
                  tabGroup.querySelector('input.category-onoff').checked = true;
                }

                ;
              } else {
                if (tabGroup.classList.contains('checked-5jhk')) tabGroup.classList.remove('checked-5jhk');
                tabGroup.querySelector('input.category-onoff').checked = false;
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        }
      }, {
        key: "render",
        value: function render(name, elem, callback) {
          if (typeof callback === 'undefined') callback = function callback() {};

          if (typeof this.elements[name] !== 'undefined') {
            this.elements[name].parentNode.replaceChild(elem, this.elements[name]);
            this.elements[name] = elem;
            callback(elem);
            return elem;
          } else {
            var insertedElem = (0, _redom.mount)(document.body, elem);

            if (insertedElem) {
              this.elements[name] = insertedElem;
            }

            callback(insertedElem);
            return insertedElem;
          }
        }
      }, {
        key: "buildInterface",
        value: function buildInterface(callback) {
          if (typeof callback === 'undefined') callback = function callback() {};
          var that = this;

          _Utilities.default.ready(function () {
            that.render('style', that.buildStyle());
            that.render('bar', that.buildBar(), function (bar) {
              // Show the bar after a while
              if (!window.CookieConsent.config.cookieExists) {
                setTimeout(function () {
                  bar.classList.remove('ccb--hidden');
                }, window.CookieConsent.config.barTimeout);
              }
            });
            that.render('modal', that.buildModal());
            callback();
          });
        }
      }, {
        key: "addEventListeners",
        value: function addEventListeners(elements) {
          var _this = this; // If you click Accept all cookies


          var buttonConsentGive = document.querySelectorAll('.consent-give');
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = buttonConsentGive[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var button = _step2.value;
              button.addEventListener('click', function () {
                // We set config to full consent
                for (var key in window.CookieConsent.config.categories) {
                  window.CookieConsent.config.categories[key].wanted = window.CookieConsent.config.categories[key].checked = true;
                }

                _this.writeBufferToDOM();

                _this.buildCookie(function (cookie) {
                  _this.setCookie(cookie);
                });

                _this.elements['bar'].classList.add('ccb--hidden');

                _this.elements['modal'].classList.remove('ccm--visible');

                _this.modalRedrawIcons();
              });
            } // If you click Cookie settings and open modal

          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }

          Array.prototype.forEach.call(document.getElementsByClassName('ccb__edit'), function (edit) {
            edit.addEventListener('click', function () {
              _this.elements['modal'].classList.add('ccm--visible');
            });
          }); // If you click trough the tabs on Cookie settings
          // If you click on/off switch

          this.elements['modal'].querySelector('.ccm__tabs').addEventListener('click', function (event) {
            // If you click trough the tabs on Cookie settings
            if (event.target.classList.contains('ccm__tab-head') || event.target.classList.contains('ccm__tab-head__icon-wedge')) {
              var getDlParent = function getDlParent(eventTarget) {
                var parent = eventTarget.parentNode;

                if (parent.nodeName !== 'DL') {
                  return getDlParent(parent);
                } else {
                  return parent;
                }
              };

              var parentDl = getDlParent(event.target);

              if (parentDl.classList.contains('ccm__tabgroup--open')) {
                parentDl.classList.remove('ccm__tabgroup--open');
              } else {
                parentDl.classList.add('ccm__tabgroup--open');
              }
            } // If you click on/off switch


            if (event.target.classList.contains('category-onoff')) {
              window.CookieConsent.config.categories[event.target.dataset.category].wanted = window.CookieConsent.config.categories[event.target.dataset.category].checked = event.target.checked === true ? true : false;
              var dt = document.querySelector('.ccm__tabgroup.' + event.target.dataset.category);

              if (event.target.checked === false && dt.classList.contains('checked-5jhk')) {
                dt.classList.remove('checked-5jhk');
              } else {
                dt.classList.add('checked-5jhk');
              }
            }
          }); // If you click close on open modal

          this.elements['modal'].querySelector('.ccm__cheading__close').addEventListener('click', function (event) {
            _this.elements['modal'].classList.remove('ccm--visible');
          }); // If you click submit on cookie settings

          document.getElementById('ccm__footer__consent-modal-submit').addEventListener('click', function () {
            var switchElements = _this.elements['modal'].querySelectorAll('.ccm__switch input');

            Array.prototype.forEach.call(switchElements, function (switchElement) {
              window.CookieConsent.config.categories[switchElement.dataset.category].wanted = switchElement.checked;
            });

            _this.buildCookie(function (cookie) {
              _this.setCookie(cookie, function () {
                _this.elements['modal'].classList.remove('ccm--visible');

                _this.elements['bar'].classList.add('ccb--hidden');
              });
            });

            _this.writeBufferToDOM();
          });
        }
      }, {
        key: "writeBufferToDOM",
        value: function writeBufferToDOM() {
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = window.CookieConsent.buffer.appendChild[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var action = _step3.value;

              if (window.CookieConsent.config.categories[action.category].wanted === true) {
                Node.prototype.appendChild.apply(action.this, action.arguments);
              }
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                _iterator3.return();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }

          var _iteratorNormalCompletion4 = true;
          var _didIteratorError4 = false;
          var _iteratorError4 = undefined;

          try {
            for (var _iterator4 = window.CookieConsent.buffer.insertBefore[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
              var _action = _step4.value;

              if (window.CookieConsent.config.categories[_action.category].wanted === true) {
                _action.arguments[1] = _action.arguments[0].parentNode === null ? _action.this.lastChild : _action.arguments[1];
                Node.prototype.insertBefore.apply(_action.this, _action.arguments);
              }
            }
          } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
                _iterator4.return();
              }
            } finally {
              if (_didIteratorError4) {
                throw _iteratorError4;
              }
            }
          }
        }
      }, {
        key: "buildCookie",
        value: function buildCookie(callback) {
          var cookie = {
            version: window.CookieConsent.config.cookieVersion,
            categories: {},
            services: []
          };

          for (var key in window.CookieConsent.config.categories) {
            cookie.categories[key] = {
              wanted: window.CookieConsent.config.categories[key].wanted
            };
          }

          cookie.services = _Utilities.default.listGlobalServices();
          if (callback) callback(cookie);
          return cookie;
        }
      }, {
        key: "setCookie",
        value: function setCookie(cookie, callback) {
          document.cookie = "cconsent=".concat(JSON.stringify(cookie), "; expires=Thu, 01 Jan 2099 00:00:00 UTC; path=/;");
          if (callback) callback();
        }
      }]);

      return Interface;
    }();

    exports.default = Interface;
  }, {
    "redom": "GuEK",
    "./Language": "4LWe",
    "./Utilities": "/6wJ"
  }],
  "s9iF": [function (require, module, exports) {
    /**
     * Removes all key-value entries from the list cache.
     *
     * @private
     * @name clear
     * @memberOf ListCache
     */
    function listCacheClear() {
      this.__data__ = [];
      this.size = 0;
    }

    module.exports = listCacheClear;
  }, {}],
  "LIpy": [function (require, module, exports) {
    /**
     * Performs a
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * comparison between two values to determine if they are equivalent.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     * @example
     *
     * var object = { 'a': 1 };
     * var other = { 'a': 1 };
     *
     * _.eq(object, object);
     * // => true
     *
     * _.eq(object, other);
     * // => false
     *
     * _.eq('a', 'a');
     * // => true
     *
     * _.eq('a', Object('a'));
     * // => false
     *
     * _.eq(NaN, NaN);
     * // => true
     */
    function eq(value, other) {
      return value === other || value !== value && other !== other;
    }

    module.exports = eq;
  }, {}],
  "yEjJ": [function (require, module, exports) {
    var eq = require('./eq');
    /**
     * Gets the index at which the `key` is found in `array` of key-value pairs.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {*} key The key to search for.
     * @returns {number} Returns the index of the matched value, else `-1`.
     */


    function assocIndexOf(array, key) {
      var length = array.length;

      while (length--) {
        if (eq(array[length][0], key)) {
          return length;
        }
      }

      return -1;
    }

    module.exports = assocIndexOf;
  }, {
    "./eq": "LIpy"
  }],
  "+bWy": [function (require, module, exports) {
    var assocIndexOf = require('./_assocIndexOf');
    /** Used for built-in method references. */


    var arrayProto = Array.prototype;
    /** Built-in value references. */

    var splice = arrayProto.splice;
    /**
     * Removes `key` and its value from the list cache.
     *
     * @private
     * @name delete
     * @memberOf ListCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */

    function listCacheDelete(key) {
      var data = this.__data__,
          index = assocIndexOf(data, key);

      if (index < 0) {
        return false;
      }

      var lastIndex = data.length - 1;

      if (index == lastIndex) {
        data.pop();
      } else {
        splice.call(data, index, 1);
      }

      --this.size;
      return true;
    }

    module.exports = listCacheDelete;
  }, {
    "./_assocIndexOf": "yEjJ"
  }],
  "Ewuv": [function (require, module, exports) {
    var assocIndexOf = require('./_assocIndexOf');
    /**
     * Gets the list cache value for `key`.
     *
     * @private
     * @name get
     * @memberOf ListCache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */


    function listCacheGet(key) {
      var data = this.__data__,
          index = assocIndexOf(data, key);
      return index < 0 ? undefined : data[index][1];
    }

    module.exports = listCacheGet;
  }, {
    "./_assocIndexOf": "yEjJ"
  }],
  "xDQX": [function (require, module, exports) {
    var assocIndexOf = require('./_assocIndexOf');
    /**
     * Checks if a list cache value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf ListCache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */


    function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1;
    }

    module.exports = listCacheHas;
  }, {
    "./_assocIndexOf": "yEjJ"
  }],
  "h0zV": [function (require, module, exports) {
    var assocIndexOf = require('./_assocIndexOf');
    /**
     * Sets the list cache `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf ListCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the list cache instance.
     */


    function listCacheSet(key, value) {
      var data = this.__data__,
          index = assocIndexOf(data, key);

      if (index < 0) {
        ++this.size;
        data.push([key, value]);
      } else {
        data[index][1] = value;
      }

      return this;
    }

    module.exports = listCacheSet;
  }, {
    "./_assocIndexOf": "yEjJ"
  }],
  "Xk23": [function (require, module, exports) {
    var listCacheClear = require('./_listCacheClear'),
        listCacheDelete = require('./_listCacheDelete'),
        listCacheGet = require('./_listCacheGet'),
        listCacheHas = require('./_listCacheHas'),
        listCacheSet = require('./_listCacheSet');
    /**
     * Creates an list cache object.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */


    function ListCache(entries) {
      var index = -1,
          length = entries == null ? 0 : entries.length;
      this.clear();

      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    } // Add methods to `ListCache`.


    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype['delete'] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;
    module.exports = ListCache;
  }, {
    "./_listCacheClear": "s9iF",
    "./_listCacheDelete": "+bWy",
    "./_listCacheGet": "Ewuv",
    "./_listCacheHas": "xDQX",
    "./_listCacheSet": "h0zV"
  }],
  "4y4D": [function (require, module, exports) {
    var ListCache = require('./_ListCache');
    /**
     * Removes all key-value entries from the stack.
     *
     * @private
     * @name clear
     * @memberOf Stack
     */


    function stackClear() {
      this.__data__ = new ListCache();
      this.size = 0;
    }

    module.exports = stackClear;
  }, {
    "./_ListCache": "Xk23"
  }],
  "TpjK": [function (require, module, exports) {
    /**
     * Removes `key` and its value from the stack.
     *
     * @private
     * @name delete
     * @memberOf Stack
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function stackDelete(key) {
      var data = this.__data__,
          result = data['delete'](key);
      this.size = data.size;
      return result;
    }

    module.exports = stackDelete;
  }, {}],
  "skbs": [function (require, module, exports) {
    /**
     * Gets the stack value for `key`.
     *
     * @private
     * @name get
     * @memberOf Stack
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function stackGet(key) {
      return this.__data__.get(key);
    }

    module.exports = stackGet;
  }, {}],
  "9ocJ": [function (require, module, exports) {
    /**
     * Checks if a stack value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf Stack
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function stackHas(key) {
      return this.__data__.has(key);
    }

    module.exports = stackHas;
  }, {}],
  "j3D9": [function (require, module, exports) {
    var global = arguments[3];
    /** Detect free variable `global` from Node.js. */

    var freeGlobal = _typeof2(global) == 'object' && global && global.Object === Object && global;
    module.exports = freeGlobal;
  }, {}],
  "MIhM": [function (require, module, exports) {
    var freeGlobal = require('./_freeGlobal');
    /** Detect free variable `self`. */


    var freeSelf = (typeof self === "undefined" ? "undefined" : _typeof2(self)) == 'object' && self && self.Object === Object && self;
    /** Used as a reference to the global object. */

    var root = freeGlobal || freeSelf || Function('return this')();
    module.exports = root;
  }, {
    "./_freeGlobal": "j3D9"
  }],
  "wppe": [function (require, module, exports) {
    var root = require('./_root');
    /** Built-in value references. */


    var _Symbol3 = root.Symbol;
    module.exports = _Symbol3;
  }, {
    "./_root": "MIhM"
  }],
  "uiOY": [function (require, module, exports) {
    var _Symbol4 = require('./_Symbol');
    /** Used for built-in method references. */


    var objectProto = Object.prototype;
    /** Used to check objects for own properties. */

    var hasOwnProperty = objectProto.hasOwnProperty;
    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
     * of values.
     */

    var nativeObjectToString = objectProto.toString;
    /** Built-in value references. */

    var symToStringTag = _Symbol4 ? _Symbol4.toStringTag : undefined;
    /**
     * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the raw `toStringTag`.
     */

    function getRawTag(value) {
      var isOwn = hasOwnProperty.call(value, symToStringTag),
          tag = value[symToStringTag];

      try {
        value[symToStringTag] = undefined;
        var unmasked = true;
      } catch (e) {}

      var result = nativeObjectToString.call(value);

      if (unmasked) {
        if (isOwn) {
          value[symToStringTag] = tag;
        } else {
          delete value[symToStringTag];
        }
      }

      return result;
    }

    module.exports = getRawTag;
  }, {
    "./_Symbol": "wppe"
  }],
  "lPmd": [function (require, module, exports) {
    /** Used for built-in method references. */
    var objectProto = Object.prototype;
    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
     * of values.
     */

    var nativeObjectToString = objectProto.toString;
    /**
     * Converts `value` to a string using `Object.prototype.toString`.
     *
     * @private
     * @param {*} value The value to convert.
     * @returns {string} Returns the converted string.
     */

    function objectToString(value) {
      return nativeObjectToString.call(value);
    }

    module.exports = objectToString;
  }, {}],
  "e5TX": [function (require, module, exports) {
    var _Symbol5 = require('./_Symbol'),
        getRawTag = require('./_getRawTag'),
        objectToString = require('./_objectToString');
    /** `Object#toString` result references. */


    var nullTag = '[object Null]',
        undefinedTag = '[object Undefined]';
    /** Built-in value references. */

    var symToStringTag = _Symbol5 ? _Symbol5.toStringTag : undefined;
    /**
     * The base implementation of `getTag` without fallbacks for buggy environments.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the `toStringTag`.
     */

    function baseGetTag(value) {
      if (value == null) {
        return value === undefined ? undefinedTag : nullTag;
      }

      return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
    }

    module.exports = baseGetTag;
  }, {
    "./_Symbol": "wppe",
    "./_getRawTag": "uiOY",
    "./_objectToString": "lPmd"
  }],
  "u9vI": [function (require, module, exports) {
    /**
     * Checks if `value` is the
     * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
     * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an object, else `false`.
     * @example
     *
     * _.isObject({});
     * // => true
     *
     * _.isObject([1, 2, 3]);
     * // => true
     *
     * _.isObject(_.noop);
     * // => true
     *
     * _.isObject(null);
     * // => false
     */
    function isObject(value) {
      var type = _typeof2(value);

      return value != null && (type == 'object' || type == 'function');
    }

    module.exports = isObject;
  }, {}],
  "dRuq": [function (require, module, exports) {
    var baseGetTag = require('./_baseGetTag'),
        isObject = require('./isObject');
    /** `Object#toString` result references. */


    var asyncTag = '[object AsyncFunction]',
        funcTag = '[object Function]',
        genTag = '[object GeneratorFunction]',
        proxyTag = '[object Proxy]';
    /**
     * Checks if `value` is classified as a `Function` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a function, else `false`.
     * @example
     *
     * _.isFunction(_);
     * // => true
     *
     * _.isFunction(/abc/);
     * // => false
     */

    function isFunction(value) {
      if (!isObject(value)) {
        return false;
      } // The use of `Object#toString` avoids issues with the `typeof` operator
      // in Safari 9 which returns 'object' for typed arrays and other constructors.


      var tag = baseGetTag(value);
      return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
    }

    module.exports = isFunction;
  }, {
    "./_baseGetTag": "e5TX",
    "./isObject": "u9vI"
  }],
  "q3B8": [function (require, module, exports) {
    var root = require('./_root');
    /** Used to detect overreaching core-js shims. */


    var coreJsData = root['__core-js_shared__'];
    module.exports = coreJsData;
  }, {
    "./_root": "MIhM"
  }],
  "1qpN": [function (require, module, exports) {
    var coreJsData = require('./_coreJsData');
    /** Used to detect methods masquerading as native. */


    var maskSrcKey = function () {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
      return uid ? 'Symbol(src)_1.' + uid : '';
    }();
    /**
     * Checks if `func` has its source masked.
     *
     * @private
     * @param {Function} func The function to check.
     * @returns {boolean} Returns `true` if `func` is masked, else `false`.
     */


    function isMasked(func) {
      return !!maskSrcKey && maskSrcKey in func;
    }

    module.exports = isMasked;
  }, {
    "./_coreJsData": "q3B8"
  }],
  "g55O": [function (require, module, exports) {
    /** Used for built-in method references. */
    var funcProto = Function.prototype;
    /** Used to resolve the decompiled source of functions. */

    var funcToString = funcProto.toString;
    /**
     * Converts `func` to its source code.
     *
     * @private
     * @param {Function} func The function to convert.
     * @returns {string} Returns the source code.
     */

    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e) {}

        try {
          return func + '';
        } catch (e) {}
      }

      return '';
    }

    module.exports = toSource;
  }, {}],
  "iEGD": [function (require, module, exports) {
    var isFunction = require('./isFunction'),
        isMasked = require('./_isMasked'),
        isObject = require('./isObject'),
        toSource = require('./_toSource');
    /**
     * Used to match `RegExp`
     * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
     */


    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
    /** Used to detect host constructors (Safari). */

    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    /** Used for built-in method references. */

    var funcProto = Function.prototype,
        objectProto = Object.prototype;
    /** Used to resolve the decompiled source of functions. */

    var funcToString = funcProto.toString;
    /** Used to check objects for own properties. */

    var hasOwnProperty = objectProto.hasOwnProperty;
    /** Used to detect if a method is native. */

    var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
    /**
     * The base implementation of `_.isNative` without bad shim checks.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a native function,
     *  else `false`.
     */

    function baseIsNative(value) {
      if (!isObject(value) || isMasked(value)) {
        return false;
      }

      var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }

    module.exports = baseIsNative;
  }, {
    "./isFunction": "dRuq",
    "./_isMasked": "1qpN",
    "./isObject": "u9vI",
    "./_toSource": "g55O"
  }],
  "Nk5W": [function (require, module, exports) {
    /**
     * Gets the value at `key` of `object`.
     *
     * @private
     * @param {Object} [object] The object to query.
     * @param {string} key The key of the property to get.
     * @returns {*} Returns the property value.
     */
    function getValue(object, key) {
      return object == null ? undefined : object[key];
    }

    module.exports = getValue;
  }, {}],
  "bViC": [function (require, module, exports) {
    var baseIsNative = require('./_baseIsNative'),
        getValue = require('./_getValue');
    /**
     * Gets the native function at `key` of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {string} key The key of the method to get.
     * @returns {*} Returns the function if it's native, else `undefined`.
     */


    function getNative(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : undefined;
    }

    module.exports = getNative;
  }, {
    "./_baseIsNative": "iEGD",
    "./_getValue": "Nk5W"
  }],
  "K9uV": [function (require, module, exports) {
    var getNative = require('./_getNative'),
        root = require('./_root');
    /* Built-in method references that are verified to be native. */


    var Map = getNative(root, 'Map');
    module.exports = Map;
  }, {
    "./_getNative": "bViC",
    "./_root": "MIhM"
  }],
  "FTXF": [function (require, module, exports) {
    var getNative = require('./_getNative');
    /* Built-in method references that are verified to be native. */


    var nativeCreate = getNative(Object, 'create');
    module.exports = nativeCreate;
  }, {
    "./_getNative": "bViC"
  }],
  "1RxS": [function (require, module, exports) {
    var nativeCreate = require('./_nativeCreate');
    /**
     * Removes all key-value entries from the hash.
     *
     * @private
     * @name clear
     * @memberOf Hash
     */


    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {};
      this.size = 0;
    }

    module.exports = hashClear;
  }, {
    "./_nativeCreate": "FTXF"
  }],
  "qBl2": [function (require, module, exports) {
    /**
     * Removes `key` and its value from the hash.
     *
     * @private
     * @name delete
     * @memberOf Hash
     * @param {Object} hash The hash to modify.
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function hashDelete(key) {
      var result = this.has(key) && delete this.__data__[key];
      this.size -= result ? 1 : 0;
      return result;
    }

    module.exports = hashDelete;
  }, {}],
  "hClK": [function (require, module, exports) {
    var nativeCreate = require('./_nativeCreate');
    /** Used to stand-in for `undefined` hash values. */


    var HASH_UNDEFINED = '__lodash_hash_undefined__';
    /** Used for built-in method references. */

    var objectProto = Object.prototype;
    /** Used to check objects for own properties. */

    var hasOwnProperty = objectProto.hasOwnProperty;
    /**
     * Gets the hash value for `key`.
     *
     * @private
     * @name get
     * @memberOf Hash
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */

    function hashGet(key) {
      var data = this.__data__;

      if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? undefined : result;
      }

      return hasOwnProperty.call(data, key) ? data[key] : undefined;
    }

    module.exports = hashGet;
  }, {
    "./_nativeCreate": "FTXF"
  }],
  "YIaf": [function (require, module, exports) {
    var nativeCreate = require('./_nativeCreate');
    /** Used for built-in method references. */


    var objectProto = Object.prototype;
    /** Used to check objects for own properties. */

    var hasOwnProperty = objectProto.hasOwnProperty;
    /**
     * Checks if a hash value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf Hash
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */

    function hashHas(key) {
      var data = this.__data__;
      return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
    }

    module.exports = hashHas;
  }, {
    "./_nativeCreate": "FTXF"
  }],
  "Ag0p": [function (require, module, exports) {
    var nativeCreate = require('./_nativeCreate');
    /** Used to stand-in for `undefined` hash values. */


    var HASH_UNDEFINED = '__lodash_hash_undefined__';
    /**
     * Sets the hash `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf Hash
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the hash instance.
     */

    function hashSet(key, value) {
      var data = this.__data__;
      this.size += this.has(key) ? 0 : 1;
      data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
      return this;
    }

    module.exports = hashSet;
  }, {
    "./_nativeCreate": "FTXF"
  }],
  "C8N4": [function (require, module, exports) {
    var hashClear = require('./_hashClear'),
        hashDelete = require('./_hashDelete'),
        hashGet = require('./_hashGet'),
        hashHas = require('./_hashHas'),
        hashSet = require('./_hashSet');
    /**
     * Creates a hash object.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */


    function Hash(entries) {
      var index = -1,
          length = entries == null ? 0 : entries.length;
      this.clear();

      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    } // Add methods to `Hash`.


    Hash.prototype.clear = hashClear;
    Hash.prototype['delete'] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;
    module.exports = Hash;
  }, {
    "./_hashClear": "1RxS",
    "./_hashDelete": "qBl2",
    "./_hashGet": "hClK",
    "./_hashHas": "YIaf",
    "./_hashSet": "Ag0p"
  }],
  "lBq7": [function (require, module, exports) {
    var Hash = require('./_Hash'),
        ListCache = require('./_ListCache'),
        Map = require('./_Map');
    /**
     * Removes all key-value entries from the map.
     *
     * @private
     * @name clear
     * @memberOf MapCache
     */


    function mapCacheClear() {
      this.size = 0;
      this.__data__ = {
        'hash': new Hash(),
        'map': new (Map || ListCache)(),
        'string': new Hash()
      };
    }

    module.exports = mapCacheClear;
  }, {
    "./_Hash": "C8N4",
    "./_ListCache": "Xk23",
    "./_Map": "K9uV"
  }],
  "XJYD": [function (require, module, exports) {
    /**
     * Checks if `value` is suitable for use as unique object key.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
     */
    function isKeyable(value) {
      var type = _typeof2(value);

      return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
    }

    module.exports = isKeyable;
  }, {}],
  "ZC1a": [function (require, module, exports) {
    var isKeyable = require('./_isKeyable');
    /**
     * Gets the data for `map`.
     *
     * @private
     * @param {Object} map The map to query.
     * @param {string} key The reference key.
     * @returns {*} Returns the map data.
     */


    function getMapData(map, key) {
      var data = map.__data__;
      return isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
    }

    module.exports = getMapData;
  }, {
    "./_isKeyable": "XJYD"
  }],
  "cDyG": [function (require, module, exports) {
    var getMapData = require('./_getMapData');
    /**
     * Removes `key` and its value from the map.
     *
     * @private
     * @name delete
     * @memberOf MapCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */


    function mapCacheDelete(key) {
      var result = getMapData(this, key)['delete'](key);
      this.size -= result ? 1 : 0;
      return result;
    }

    module.exports = mapCacheDelete;
  }, {
    "./_getMapData": "ZC1a"
  }],
  "G3gK": [function (require, module, exports) {
    var getMapData = require('./_getMapData');
    /**
     * Gets the map value for `key`.
     *
     * @private
     * @name get
     * @memberOf MapCache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */


    function mapCacheGet(key) {
      return getMapData(this, key).get(key);
    }

    module.exports = mapCacheGet;
  }, {
    "./_getMapData": "ZC1a"
  }],
  "85ue": [function (require, module, exports) {
    var getMapData = require('./_getMapData');
    /**
     * Checks if a map value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf MapCache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */


    function mapCacheHas(key) {
      return getMapData(this, key).has(key);
    }

    module.exports = mapCacheHas;
  }, {
    "./_getMapData": "ZC1a"
  }],
  "UY82": [function (require, module, exports) {
    var getMapData = require('./_getMapData');
    /**
     * Sets the map `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf MapCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the map cache instance.
     */


    function mapCacheSet(key, value) {
      var data = getMapData(this, key),
          size = data.size;
      data.set(key, value);
      this.size += data.size == size ? 0 : 1;
      return this;
    }

    module.exports = mapCacheSet;
  }, {
    "./_getMapData": "ZC1a"
  }],
  "wtMJ": [function (require, module, exports) {
    var mapCacheClear = require('./_mapCacheClear'),
        mapCacheDelete = require('./_mapCacheDelete'),
        mapCacheGet = require('./_mapCacheGet'),
        mapCacheHas = require('./_mapCacheHas'),
        mapCacheSet = require('./_mapCacheSet');
    /**
     * Creates a map cache object to store key-value pairs.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */


    function MapCache(entries) {
      var index = -1,
          length = entries == null ? 0 : entries.length;
      this.clear();

      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    } // Add methods to `MapCache`.


    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype['delete'] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;
    module.exports = MapCache;
  }, {
    "./_mapCacheClear": "lBq7",
    "./_mapCacheDelete": "cDyG",
    "./_mapCacheGet": "G3gK",
    "./_mapCacheHas": "85ue",
    "./_mapCacheSet": "UY82"
  }],
  "fwYF": [function (require, module, exports) {
    var ListCache = require('./_ListCache'),
        Map = require('./_Map'),
        MapCache = require('./_MapCache');
    /** Used as the size to enable large array optimizations. */


    var LARGE_ARRAY_SIZE = 200;
    /**
     * Sets the stack `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf Stack
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the stack cache instance.
     */

    function stackSet(key, value) {
      var data = this.__data__;

      if (data instanceof ListCache) {
        var pairs = data.__data__;

        if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
          pairs.push([key, value]);
          this.size = ++data.size;
          return this;
        }

        data = this.__data__ = new MapCache(pairs);
      }

      data.set(key, value);
      this.size = data.size;
      return this;
    }

    module.exports = stackSet;
  }, {
    "./_ListCache": "Xk23",
    "./_Map": "K9uV",
    "./_MapCache": "wtMJ"
  }],
  "49I8": [function (require, module, exports) {
    var ListCache = require('./_ListCache'),
        stackClear = require('./_stackClear'),
        stackDelete = require('./_stackDelete'),
        stackGet = require('./_stackGet'),
        stackHas = require('./_stackHas'),
        stackSet = require('./_stackSet');
    /**
     * Creates a stack cache object to store key-value pairs.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */


    function Stack(entries) {
      var data = this.__data__ = new ListCache(entries);
      this.size = data.size;
    } // Add methods to `Stack`.


    Stack.prototype.clear = stackClear;
    Stack.prototype['delete'] = stackDelete;
    Stack.prototype.get = stackGet;
    Stack.prototype.has = stackHas;
    Stack.prototype.set = stackSet;
    module.exports = Stack;
  }, {
    "./_ListCache": "Xk23",
    "./_stackClear": "4y4D",
    "./_stackDelete": "TpjK",
    "./_stackGet": "skbs",
    "./_stackHas": "9ocJ",
    "./_stackSet": "fwYF"
  }],
  "kAdy": [function (require, module, exports) {
    var getNative = require('./_getNative');

    var defineProperty = function () {
      try {
        var func = getNative(Object, 'defineProperty');
        func({}, '', {});
        return func;
      } catch (e) {}
    }();

    module.exports = defineProperty;
  }, {
    "./_getNative": "bViC"
  }],
  "d05+": [function (require, module, exports) {
    var defineProperty = require('./_defineProperty');
    /**
     * The base implementation of `assignValue` and `assignMergeValue` without
     * value checks.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {string} key The key of the property to assign.
     * @param {*} value The value to assign.
     */


    function baseAssignValue(object, key, value) {
      if (key == '__proto__' && defineProperty) {
        defineProperty(object, key, {
          'configurable': true,
          'enumerable': true,
          'value': value,
          'writable': true
        });
      } else {
        object[key] = value;
      }
    }

    module.exports = baseAssignValue;
  }, {
    "./_defineProperty": "kAdy"
  }],
  "2Tdb": [function (require, module, exports) {
    var baseAssignValue = require('./_baseAssignValue'),
        eq = require('./eq');
    /**
     * This function is like `assignValue` except that it doesn't assign
     * `undefined` values.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {string} key The key of the property to assign.
     * @param {*} value The value to assign.
     */


    function assignMergeValue(object, key, value) {
      if (value !== undefined && !eq(object[key], value) || value === undefined && !(key in object)) {
        baseAssignValue(object, key, value);
      }
    }

    module.exports = assignMergeValue;
  }, {
    "./_baseAssignValue": "d05+",
    "./eq": "LIpy"
  }],
  "oVe7": [function (require, module, exports) {
    /**
     * Creates a base function for methods like `_.forIn` and `_.forOwn`.
     *
     * @private
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new base function.
     */
    function createBaseFor(fromRight) {
      return function (object, iteratee, keysFunc) {
        var index = -1,
            iterable = Object(object),
            props = keysFunc(object),
            length = props.length;

        while (length--) {
          var key = props[fromRight ? length : ++index];

          if (iteratee(iterable[key], key, iterable) === false) {
            break;
          }
        }

        return object;
      };
    }

    module.exports = createBaseFor;
  }, {}],
  "mduf": [function (require, module, exports) {
    var createBaseFor = require('./_createBaseFor');
    /**
     * The base implementation of `baseForOwn` which iterates over `object`
     * properties returned by `keysFunc` and invokes `iteratee` for each property.
     * Iteratee functions may exit iteration early by explicitly returning `false`.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {Function} keysFunc The function to get the keys of `object`.
     * @returns {Object} Returns `object`.
     */


    var baseFor = createBaseFor();
    module.exports = baseFor;
  }, {
    "./_createBaseFor": "oVe7"
  }],
  "s4SJ": [function (require, module, exports) {
    var root = require('./_root');
    /** Detect free variable `exports`. */


    var freeExports = _typeof2(exports) == 'object' && exports && !exports.nodeType && exports;
    /** Detect free variable `module`. */

    var freeModule = freeExports && _typeof2(module) == 'object' && module && !module.nodeType && module;
    /** Detect the popular CommonJS extension `module.exports`. */

    var moduleExports = freeModule && freeModule.exports === freeExports;
    /** Built-in value references. */

    var Buffer = moduleExports ? root.Buffer : undefined,
        allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;
    /**
     * Creates a clone of  `buffer`.
     *
     * @private
     * @param {Buffer} buffer The buffer to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Buffer} Returns the cloned buffer.
     */

    function cloneBuffer(buffer, isDeep) {
      if (isDeep) {
        return buffer.slice();
      }

      var length = buffer.length,
          result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
      buffer.copy(result);
      return result;
    }

    module.exports = cloneBuffer;
  }, {
    "./_root": "MIhM"
  }],
  "yfX1": [function (require, module, exports) {
    var root = require('./_root');
    /** Built-in value references. */


    var Uint8Array = root.Uint8Array;
    module.exports = Uint8Array;
  }, {
    "./_root": "MIhM"
  }],
  "zb3a": [function (require, module, exports) {
    var Uint8Array = require('./_Uint8Array');
    /**
     * Creates a clone of `arrayBuffer`.
     *
     * @private
     * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
     * @returns {ArrayBuffer} Returns the cloned array buffer.
     */


    function cloneArrayBuffer(arrayBuffer) {
      var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
      new Uint8Array(result).set(new Uint8Array(arrayBuffer));
      return result;
    }

    module.exports = cloneArrayBuffer;
  }, {
    "./_Uint8Array": "yfX1"
  }],
  "jXAN": [function (require, module, exports) {
    var cloneArrayBuffer = require('./_cloneArrayBuffer');
    /**
     * Creates a clone of `typedArray`.
     *
     * @private
     * @param {Object} typedArray The typed array to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the cloned typed array.
     */


    function cloneTypedArray(typedArray, isDeep) {
      var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
      return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
    }

    module.exports = cloneTypedArray;
  }, {
    "./_cloneArrayBuffer": "zb3a"
  }],
  "Mkgn": [function (require, module, exports) {
    /**
     * Copies the values of `source` to `array`.
     *
     * @private
     * @param {Array} source The array to copy values from.
     * @param {Array} [array=[]] The array to copy values to.
     * @returns {Array} Returns `array`.
     */
    function copyArray(source, array) {
      var index = -1,
          length = source.length;
      array || (array = Array(length));

      while (++index < length) {
        array[index] = source[index];
      }

      return array;
    }

    module.exports = copyArray;
  }, {}],
  "ga8q": [function (require, module, exports) {
    var isObject = require('./isObject');
    /** Built-in value references. */


    var objectCreate = Object.create;
    /**
     * The base implementation of `_.create` without support for assigning
     * properties to the created object.
     *
     * @private
     * @param {Object} proto The object to inherit from.
     * @returns {Object} Returns the new object.
     */

    var baseCreate = function () {
      function object() {}

      return function (proto) {
        if (!isObject(proto)) {
          return {};
        }

        if (objectCreate) {
          return objectCreate(proto);
        }

        object.prototype = proto;
        var result = new object();
        object.prototype = undefined;
        return result;
      };
    }();

    module.exports = baseCreate;
  }, {
    "./isObject": "u9vI"
  }],
  "4/4o": [function (require, module, exports) {
    /**
     * Creates a unary function that invokes `func` with its argument transformed.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {Function} transform The argument transform.
     * @returns {Function} Returns the new function.
     */
    function overArg(func, transform) {
      return function (arg) {
        return func(transform(arg));
      };
    }

    module.exports = overArg;
  }, {}],
  "CXf5": [function (require, module, exports) {
    var overArg = require('./_overArg');
    /** Built-in value references. */


    var getPrototype = overArg(Object.getPrototypeOf, Object);
    module.exports = getPrototype;
  }, {
    "./_overArg": "4/4o"
  }],
  "nhsl": [function (require, module, exports) {
    /** Used for built-in method references. */
    var objectProto = Object.prototype;
    /**
     * Checks if `value` is likely a prototype object.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
     */

    function isPrototype(value) {
      var Ctor = value && value.constructor,
          proto = typeof Ctor == 'function' && Ctor.prototype || objectProto;
      return value === proto;
    }

    module.exports = isPrototype;
  }, {}],
  "qE2F": [function (require, module, exports) {
    var baseCreate = require('./_baseCreate'),
        getPrototype = require('./_getPrototype'),
        isPrototype = require('./_isPrototype');
    /**
     * Initializes an object clone.
     *
     * @private
     * @param {Object} object The object to clone.
     * @returns {Object} Returns the initialized clone.
     */


    function initCloneObject(object) {
      return typeof object.constructor == 'function' && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
    }

    module.exports = initCloneObject;
  }, {
    "./_baseCreate": "ga8q",
    "./_getPrototype": "CXf5",
    "./_isPrototype": "nhsl"
  }],
  "OuyB": [function (require, module, exports) {
    /**
     * Checks if `value` is object-like. A value is object-like if it's not `null`
     * and has a `typeof` result of "object".
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
     * @example
     *
     * _.isObjectLike({});
     * // => true
     *
     * _.isObjectLike([1, 2, 3]);
     * // => true
     *
     * _.isObjectLike(_.noop);
     * // => false
     *
     * _.isObjectLike(null);
     * // => false
     */
    function isObjectLike(value) {
      return value != null && _typeof2(value) == 'object';
    }

    module.exports = isObjectLike;
  }, {}],
  "pK4Y": [function (require, module, exports) {
    var baseGetTag = require('./_baseGetTag'),
        isObjectLike = require('./isObjectLike');
    /** `Object#toString` result references. */


    var argsTag = '[object Arguments]';
    /**
     * The base implementation of `_.isArguments`.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an `arguments` object,
     */

    function baseIsArguments(value) {
      return isObjectLike(value) && baseGetTag(value) == argsTag;
    }

    module.exports = baseIsArguments;
  }, {
    "./_baseGetTag": "e5TX",
    "./isObjectLike": "OuyB"
  }],
  "3til": [function (require, module, exports) {
    var baseIsArguments = require('./_baseIsArguments'),
        isObjectLike = require('./isObjectLike');
    /** Used for built-in method references. */


    var objectProto = Object.prototype;
    /** Used to check objects for own properties. */

    var hasOwnProperty = objectProto.hasOwnProperty;
    /** Built-in value references. */

    var propertyIsEnumerable = objectProto.propertyIsEnumerable;
    /**
     * Checks if `value` is likely an `arguments` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an `arguments` object,
     *  else `false`.
     * @example
     *
     * _.isArguments(function() { return arguments; }());
     * // => true
     *
     * _.isArguments([1, 2, 3]);
     * // => false
     */

    var isArguments = baseIsArguments(function () {
      return arguments;
    }()) ? baseIsArguments : function (value) {
      return isObjectLike(value) && hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
    };
    module.exports = isArguments;
  }, {
    "./_baseIsArguments": "pK4Y",
    "./isObjectLike": "OuyB"
  }],
  "p/0c": [function (require, module, exports) {
    /**
     * Checks if `value` is classified as an `Array` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array, else `false`.
     * @example
     *
     * _.isArray([1, 2, 3]);
     * // => true
     *
     * _.isArray(document.body.children);
     * // => false
     *
     * _.isArray('abc');
     * // => false
     *
     * _.isArray(_.noop);
     * // => false
     */
    var isArray = Array.isArray;
    module.exports = isArray;
  }, {}],
  "GmNU": [function (require, module, exports) {
    /** Used as references for various `Number` constants. */
    var MAX_SAFE_INTEGER = 9007199254740991;
    /**
     * Checks if `value` is a valid array-like length.
     *
     * **Note:** This method is loosely based on
     * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
     * @example
     *
     * _.isLength(3);
     * // => true
     *
     * _.isLength(Number.MIN_VALUE);
     * // => false
     *
     * _.isLength(Infinity);
     * // => false
     *
     * _.isLength('3');
     * // => false
     */

    function isLength(value) {
      return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }

    module.exports = isLength;
  }, {}],
  "LN6c": [function (require, module, exports) {
    var isFunction = require('./isFunction'),
        isLength = require('./isLength');
    /**
     * Checks if `value` is array-like. A value is considered array-like if it's
     * not a function and has a `value.length` that's an integer greater than or
     * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
     * @example
     *
     * _.isArrayLike([1, 2, 3]);
     * // => true
     *
     * _.isArrayLike(document.body.children);
     * // => true
     *
     * _.isArrayLike('abc');
     * // => true
     *
     * _.isArrayLike(_.noop);
     * // => false
     */


    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value);
    }

    module.exports = isArrayLike;
  }, {
    "./isFunction": "dRuq",
    "./isLength": "GmNU"
  }],
  "FwQQ": [function (require, module, exports) {
    var isArrayLike = require('./isArrayLike'),
        isObjectLike = require('./isObjectLike');
    /**
     * This method is like `_.isArrayLike` except that it also checks if `value`
     * is an object.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array-like object,
     *  else `false`.
     * @example
     *
     * _.isArrayLikeObject([1, 2, 3]);
     * // => true
     *
     * _.isArrayLikeObject(document.body.children);
     * // => true
     *
     * _.isArrayLikeObject('abc');
     * // => false
     *
     * _.isArrayLikeObject(_.noop);
     * // => false
     */


    function isArrayLikeObject(value) {
      return isObjectLike(value) && isArrayLike(value);
    }

    module.exports = isArrayLikeObject;
  }, {
    "./isArrayLike": "LN6c",
    "./isObjectLike": "OuyB"
  }],
  "PYZb": [function (require, module, exports) {
    /**
     * This method returns `false`.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {boolean} Returns `false`.
     * @example
     *
     * _.times(2, _.stubFalse);
     * // => [false, false]
     */
    function stubFalse() {
      return false;
    }

    module.exports = stubFalse;
  }, {}],
  "iyC2": [function (require, module, exports) {
    var root = require('./_root'),
        stubFalse = require('./stubFalse');
    /** Detect free variable `exports`. */


    var freeExports = _typeof2(exports) == 'object' && exports && !exports.nodeType && exports;
    /** Detect free variable `module`. */

    var freeModule = freeExports && _typeof2(module) == 'object' && module && !module.nodeType && module;
    /** Detect the popular CommonJS extension `module.exports`. */

    var moduleExports = freeModule && freeModule.exports === freeExports;
    /** Built-in value references. */

    var Buffer = moduleExports ? root.Buffer : undefined;
    /* Built-in method references for those with the same name as other `lodash` methods. */

    var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;
    /**
     * Checks if `value` is a buffer.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
     * @example
     *
     * _.isBuffer(new Buffer(2));
     * // => true
     *
     * _.isBuffer(new Uint8Array(2));
     * // => false
     */

    var isBuffer = nativeIsBuffer || stubFalse;
    module.exports = isBuffer;
  }, {
    "./_root": "MIhM",
    "./stubFalse": "PYZb"
  }],
  "ES04": [function (require, module, exports) {
    var baseGetTag = require('./_baseGetTag'),
        getPrototype = require('./_getPrototype'),
        isObjectLike = require('./isObjectLike');
    /** `Object#toString` result references. */


    var objectTag = '[object Object]';
    /** Used for built-in method references. */

    var funcProto = Function.prototype,
        objectProto = Object.prototype;
    /** Used to resolve the decompiled source of functions. */

    var funcToString = funcProto.toString;
    /** Used to check objects for own properties. */

    var hasOwnProperty = objectProto.hasOwnProperty;
    /** Used to infer the `Object` constructor. */

    var objectCtorString = funcToString.call(Object);
    /**
     * Checks if `value` is a plain object, that is, an object created by the
     * `Object` constructor or one with a `[[Prototype]]` of `null`.
     *
     * @static
     * @memberOf _
     * @since 0.8.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     * }
     *
     * _.isPlainObject(new Foo);
     * // => false
     *
     * _.isPlainObject([1, 2, 3]);
     * // => false
     *
     * _.isPlainObject({ 'x': 0, 'y': 0 });
     * // => true
     *
     * _.isPlainObject(Object.create(null));
     * // => true
     */

    function isPlainObject(value) {
      if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
        return false;
      }

      var proto = getPrototype(value);

      if (proto === null) {
        return true;
      }

      var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
      return typeof Ctor == 'function' && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
    }

    module.exports = isPlainObject;
  }, {
    "./_baseGetTag": "e5TX",
    "./_getPrototype": "CXf5",
    "./isObjectLike": "OuyB"
  }],
  "2L2L": [function (require, module, exports) {
    var baseGetTag = require('./_baseGetTag'),
        isLength = require('./isLength'),
        isObjectLike = require('./isObjectLike');
    /** `Object#toString` result references. */


    var argsTag = '[object Arguments]',
        arrayTag = '[object Array]',
        boolTag = '[object Boolean]',
        dateTag = '[object Date]',
        errorTag = '[object Error]',
        funcTag = '[object Function]',
        mapTag = '[object Map]',
        numberTag = '[object Number]',
        objectTag = '[object Object]',
        regexpTag = '[object RegExp]',
        setTag = '[object Set]',
        stringTag = '[object String]',
        weakMapTag = '[object WeakMap]';
    var arrayBufferTag = '[object ArrayBuffer]',
        dataViewTag = '[object DataView]',
        float32Tag = '[object Float32Array]',
        float64Tag = '[object Float64Array]',
        int8Tag = '[object Int8Array]',
        int16Tag = '[object Int16Array]',
        int32Tag = '[object Int32Array]',
        uint8Tag = '[object Uint8Array]',
        uint8ClampedTag = '[object Uint8ClampedArray]',
        uint16Tag = '[object Uint16Array]',
        uint32Tag = '[object Uint32Array]';
    /** Used to identify `toStringTag` values of typed arrays. */

    var typedArrayTags = {};
    typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
    typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
    /**
     * The base implementation of `_.isTypedArray` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
     */

    function baseIsTypedArray(value) {
      return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
    }

    module.exports = baseIsTypedArray;
  }, {
    "./_baseGetTag": "e5TX",
    "./isLength": "GmNU",
    "./isObjectLike": "OuyB"
  }],
  "PnXa": [function (require, module, exports) {
    /**
     * The base implementation of `_.unary` without support for storing metadata.
     *
     * @private
     * @param {Function} func The function to cap arguments for.
     * @returns {Function} Returns the new capped function.
     */
    function baseUnary(func) {
      return function (value) {
        return func(value);
      };
    }

    module.exports = baseUnary;
  }, {}],
  "PBPf": [function (require, module, exports) {
    var freeGlobal = require('./_freeGlobal');
    /** Detect free variable `exports`. */


    var freeExports = _typeof2(exports) == 'object' && exports && !exports.nodeType && exports;
    /** Detect free variable `module`. */

    var freeModule = freeExports && _typeof2(module) == 'object' && module && !module.nodeType && module;
    /** Detect the popular CommonJS extension `module.exports`. */

    var moduleExports = freeModule && freeModule.exports === freeExports;
    /** Detect free variable `process` from Node.js. */

    var freeProcess = moduleExports && freeGlobal.process;
    /** Used to access faster Node.js helpers. */

    var nodeUtil = function () {
      try {
        // Use `util.types` for Node.js 10+.
        var types = freeModule && freeModule.require && freeModule.require('util').types;

        if (types) {
          return types;
        } // Legacy `process.binding('util')` for Node.js < 10.


        return freeProcess && freeProcess.binding && freeProcess.binding('util');
      } catch (e) {}
    }();

    module.exports = nodeUtil;
  }, {
    "./_freeGlobal": "j3D9"
  }],
  "kwIb": [function (require, module, exports) {
    var baseIsTypedArray = require('./_baseIsTypedArray'),
        baseUnary = require('./_baseUnary'),
        nodeUtil = require('./_nodeUtil');
    /* Node.js helper references. */


    var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
    /**
     * Checks if `value` is classified as a typed array.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
     * @example
     *
     * _.isTypedArray(new Uint8Array);
     * // => true
     *
     * _.isTypedArray([]);
     * // => false
     */

    var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
    module.exports = isTypedArray;
  }, {
    "./_baseIsTypedArray": "2L2L",
    "./_baseUnary": "PnXa",
    "./_nodeUtil": "PBPf"
  }],
  "vW3g": [function (require, module, exports) {
    /**
     * Gets the value at `key`, unless `key` is "__proto__".
     *
     * @private
     * @param {Object} object The object to query.
     * @param {string} key The key of the property to get.
     * @returns {*} Returns the property value.
     */
    function safeGet(object, key) {
      if (key == '__proto__') {
        return;
      }

      return object[key];
    }

    module.exports = safeGet;
  }, {}],
  "p/s9": [function (require, module, exports) {
    var baseAssignValue = require('./_baseAssignValue'),
        eq = require('./eq');
    /** Used for built-in method references. */


    var objectProto = Object.prototype;
    /** Used to check objects for own properties. */

    var hasOwnProperty = objectProto.hasOwnProperty;
    /**
     * Assigns `value` to `key` of `object` if the existing value is not equivalent
     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {string} key The key of the property to assign.
     * @param {*} value The value to assign.
     */

    function assignValue(object, key, value) {
      var objValue = object[key];

      if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === undefined && !(key in object)) {
        baseAssignValue(object, key, value);
      }
    }

    module.exports = assignValue;
  }, {
    "./_baseAssignValue": "d05+",
    "./eq": "LIpy"
  }],
  "dtkN": [function (require, module, exports) {
    var assignValue = require('./_assignValue'),
        baseAssignValue = require('./_baseAssignValue');
    /**
     * Copies properties of `source` to `object`.
     *
     * @private
     * @param {Object} source The object to copy properties from.
     * @param {Array} props The property identifiers to copy.
     * @param {Object} [object={}] The object to copy properties to.
     * @param {Function} [customizer] The function to customize copied values.
     * @returns {Object} Returns `object`.
     */


    function copyObject(source, props, object, customizer) {
      var isNew = !object;
      object || (object = {});
      var index = -1,
          length = props.length;

      while (++index < length) {
        var key = props[index];
        var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined;

        if (newValue === undefined) {
          newValue = source[key];
        }

        if (isNew) {
          baseAssignValue(object, key, newValue);
        } else {
          assignValue(object, key, newValue);
        }
      }

      return object;
    }

    module.exports = copyObject;
  }, {
    "./_assignValue": "p/s9",
    "./_baseAssignValue": "d05+"
  }],
  "r8MY": [function (require, module, exports) {
    /**
     * The base implementation of `_.times` without support for iteratee shorthands
     * or max array length checks.
     *
     * @private
     * @param {number} n The number of times to invoke `iteratee`.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns the array of results.
     */
    function baseTimes(n, iteratee) {
      var index = -1,
          result = Array(n);

      while (++index < n) {
        result[index] = iteratee(index);
      }

      return result;
    }

    module.exports = baseTimes;
  }, {}],
  "A+gr": [function (require, module, exports) {
    /** Used as references for various `Number` constants. */
    var MAX_SAFE_INTEGER = 9007199254740991;
    /** Used to detect unsigned integer values. */

    var reIsUint = /^(?:0|[1-9]\d*)$/;
    /**
     * Checks if `value` is a valid array-like index.
     *
     * @private
     * @param {*} value The value to check.
     * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
     * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
     */

    function isIndex(value, length) {
      var type = _typeof2(value);

      length = length == null ? MAX_SAFE_INTEGER : length;
      return !!length && (type == 'number' || type != 'symbol' && reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
    }

    module.exports = isIndex;
  }, {}],
  "VcL+": [function (require, module, exports) {
    var baseTimes = require('./_baseTimes'),
        isArguments = require('./isArguments'),
        isArray = require('./isArray'),
        isBuffer = require('./isBuffer'),
        isIndex = require('./_isIndex'),
        isTypedArray = require('./isTypedArray');
    /** Used for built-in method references. */


    var objectProto = Object.prototype;
    /** Used to check objects for own properties. */

    var hasOwnProperty = objectProto.hasOwnProperty;
    /**
     * Creates an array of the enumerable property names of the array-like `value`.
     *
     * @private
     * @param {*} value The value to query.
     * @param {boolean} inherited Specify returning inherited property names.
     * @returns {Array} Returns the array of property names.
     */

    function arrayLikeKeys(value, inherited) {
      var isArr = isArray(value),
          isArg = !isArr && isArguments(value),
          isBuff = !isArr && !isArg && isBuffer(value),
          isType = !isArr && !isArg && !isBuff && isTypedArray(value),
          skipIndexes = isArr || isArg || isBuff || isType,
          result = skipIndexes ? baseTimes(value.length, String) : [],
          length = result.length;

      for (var key in value) {
        if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && ( // Safari 9 has enumerable `arguments.length` in strict mode.
        key == 'length' || // Node.js 0.10 has enumerable non-index properties on buffers.
        isBuff && (key == 'offset' || key == 'parent') || // PhantomJS 2 has enumerable non-index properties on typed arrays.
        isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset') || // Skip index properties.
        isIndex(key, length)))) {
          result.push(key);
        }
      }

      return result;
    }

    module.exports = arrayLikeKeys;
  }, {
    "./_baseTimes": "r8MY",
    "./isArguments": "3til",
    "./isArray": "p/0c",
    "./isBuffer": "iyC2",
    "./_isIndex": "A+gr",
    "./isTypedArray": "kwIb"
  }],
  "uy4o": [function (require, module, exports) {
    /**
     * This function is like
     * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
     * except that it includes inherited enumerable properties.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */
    function nativeKeysIn(object) {
      var result = [];

      if (object != null) {
        for (var key in Object(object)) {
          result.push(key);
        }
      }

      return result;
    }

    module.exports = nativeKeysIn;
  }, {}],
  "9FAS": [function (require, module, exports) {
    var isObject = require('./isObject'),
        isPrototype = require('./_isPrototype'),
        nativeKeysIn = require('./_nativeKeysIn');
    /** Used for built-in method references. */


    var objectProto = Object.prototype;
    /** Used to check objects for own properties. */

    var hasOwnProperty = objectProto.hasOwnProperty;
    /**
     * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */

    function baseKeysIn(object) {
      if (!isObject(object)) {
        return nativeKeysIn(object);
      }

      var isProto = isPrototype(object),
          result = [];

      for (var key in object) {
        if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
          result.push(key);
        }
      }

      return result;
    }

    module.exports = baseKeysIn;
  }, {
    "./isObject": "u9vI",
    "./_isPrototype": "nhsl",
    "./_nativeKeysIn": "uy4o"
  }],
  "+UAC": [function (require, module, exports) {
    var arrayLikeKeys = require('./_arrayLikeKeys'),
        baseKeysIn = require('./_baseKeysIn'),
        isArrayLike = require('./isArrayLike');
    /**
     * Creates an array of the own and inherited enumerable property names of `object`.
     *
     * **Note:** Non-object values are coerced to objects.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.keysIn(new Foo);
     * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
     */


    function keysIn(object) {
      return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
    }

    module.exports = keysIn;
  }, {
    "./_arrayLikeKeys": "VcL+",
    "./_baseKeysIn": "9FAS",
    "./isArrayLike": "LN6c"
  }],
  "92s5": [function (require, module, exports) {
    var copyObject = require('./_copyObject'),
        keysIn = require('./keysIn');
    /**
     * Converts `value` to a plain object flattening inherited enumerable string
     * keyed properties of `value` to own properties of the plain object.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {Object} Returns the converted plain object.
     * @example
     *
     * function Foo() {
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.assign({ 'a': 1 }, new Foo);
     * // => { 'a': 1, 'b': 2 }
     *
     * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
     * // => { 'a': 1, 'b': 2, 'c': 3 }
     */


    function toPlainObject(value) {
      return copyObject(value, keysIn(value));
    }

    module.exports = toPlainObject;
  }, {
    "./_copyObject": "dtkN",
    "./keysIn": "+UAC"
  }],
  "XsjK": [function (require, module, exports) {
    var assignMergeValue = require('./_assignMergeValue'),
        cloneBuffer = require('./_cloneBuffer'),
        cloneTypedArray = require('./_cloneTypedArray'),
        copyArray = require('./_copyArray'),
        initCloneObject = require('./_initCloneObject'),
        isArguments = require('./isArguments'),
        isArray = require('./isArray'),
        isArrayLikeObject = require('./isArrayLikeObject'),
        isBuffer = require('./isBuffer'),
        isFunction = require('./isFunction'),
        isObject = require('./isObject'),
        isPlainObject = require('./isPlainObject'),
        isTypedArray = require('./isTypedArray'),
        safeGet = require('./_safeGet'),
        toPlainObject = require('./toPlainObject');
    /**
     * A specialized version of `baseMerge` for arrays and objects which performs
     * deep merges and tracks traversed objects enabling objects with circular
     * references to be merged.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @param {string} key The key of the value to merge.
     * @param {number} srcIndex The index of `source`.
     * @param {Function} mergeFunc The function to merge values.
     * @param {Function} [customizer] The function to customize assigned values.
     * @param {Object} [stack] Tracks traversed source values and their merged
     *  counterparts.
     */


    function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
      var objValue = safeGet(object, key),
          srcValue = safeGet(source, key),
          stacked = stack.get(srcValue);

      if (stacked) {
        assignMergeValue(object, key, stacked);
        return;
      }

      var newValue = customizer ? customizer(objValue, srcValue, key + '', object, source, stack) : undefined;
      var isCommon = newValue === undefined;

      if (isCommon) {
        var isArr = isArray(srcValue),
            isBuff = !isArr && isBuffer(srcValue),
            isTyped = !isArr && !isBuff && isTypedArray(srcValue);
        newValue = srcValue;

        if (isArr || isBuff || isTyped) {
          if (isArray(objValue)) {
            newValue = objValue;
          } else if (isArrayLikeObject(objValue)) {
            newValue = copyArray(objValue);
          } else if (isBuff) {
            isCommon = false;
            newValue = cloneBuffer(srcValue, true);
          } else if (isTyped) {
            isCommon = false;
            newValue = cloneTypedArray(srcValue, true);
          } else {
            newValue = [];
          }
        } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
          newValue = objValue;

          if (isArguments(objValue)) {
            newValue = toPlainObject(objValue);
          } else if (!isObject(objValue) || isFunction(objValue)) {
            newValue = initCloneObject(srcValue);
          }
        } else {
          isCommon = false;
        }
      }

      if (isCommon) {
        // Recursively merge objects and arrays (susceptible to call stack limits).
        stack.set(srcValue, newValue);
        mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
        stack['delete'](srcValue);
      }

      assignMergeValue(object, key, newValue);
    }

    module.exports = baseMergeDeep;
  }, {
    "./_assignMergeValue": "2Tdb",
    "./_cloneBuffer": "s4SJ",
    "./_cloneTypedArray": "jXAN",
    "./_copyArray": "Mkgn",
    "./_initCloneObject": "qE2F",
    "./isArguments": "3til",
    "./isArray": "p/0c",
    "./isArrayLikeObject": "FwQQ",
    "./isBuffer": "iyC2",
    "./isFunction": "dRuq",
    "./isObject": "u9vI",
    "./isPlainObject": "ES04",
    "./isTypedArray": "kwIb",
    "./_safeGet": "vW3g",
    "./toPlainObject": "92s5"
  }],
  "WqwZ": [function (require, module, exports) {
    var Stack = require('./_Stack'),
        assignMergeValue = require('./_assignMergeValue'),
        baseFor = require('./_baseFor'),
        baseMergeDeep = require('./_baseMergeDeep'),
        isObject = require('./isObject'),
        keysIn = require('./keysIn'),
        safeGet = require('./_safeGet');
    /**
     * The base implementation of `_.merge` without support for multiple sources.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @param {number} srcIndex The index of `source`.
     * @param {Function} [customizer] The function to customize merged values.
     * @param {Object} [stack] Tracks traversed source values and their merged
     *  counterparts.
     */


    function baseMerge(object, source, srcIndex, customizer, stack) {
      if (object === source) {
        return;
      }

      baseFor(source, function (srcValue, key) {
        if (isObject(srcValue)) {
          stack || (stack = new Stack());
          baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
        } else {
          var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + '', object, source, stack) : undefined;

          if (newValue === undefined) {
            newValue = srcValue;
          }

          assignMergeValue(object, key, newValue);
        }
      }, keysIn);
    }

    module.exports = baseMerge;
  }, {
    "./_Stack": "49I8",
    "./_assignMergeValue": "2Tdb",
    "./_baseFor": "mduf",
    "./_baseMergeDeep": "XsjK",
    "./isObject": "u9vI",
    "./keysIn": "+UAC",
    "./_safeGet": "vW3g"
  }],
  "Jpv1": [function (require, module, exports) {
    /**
     * This method returns the first argument it receives.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {*} value Any value.
     * @returns {*} Returns `value`.
     * @example
     *
     * var object = { 'a': 1 };
     *
     * console.log(_.identity(object) === object);
     * // => true
     */
    function identity(value) {
      return value;
    }

    module.exports = identity;
  }, {}],
  "a+zQ": [function (require, module, exports) {
    /**
     * A faster alternative to `Function#apply`, this function invokes `func`
     * with the `this` binding of `thisArg` and the arguments of `args`.
     *
     * @private
     * @param {Function} func The function to invoke.
     * @param {*} thisArg The `this` binding of `func`.
     * @param {Array} args The arguments to invoke `func` with.
     * @returns {*} Returns the result of `func`.
     */
    function apply(func, thisArg, args) {
      switch (args.length) {
        case 0:
          return func.call(thisArg);

        case 1:
          return func.call(thisArg, args[0]);

        case 2:
          return func.call(thisArg, args[0], args[1]);

        case 3:
          return func.call(thisArg, args[0], args[1], args[2]);
      }

      return func.apply(thisArg, args);
    }

    module.exports = apply;
  }, {}],
  "qXFa": [function (require, module, exports) {
    var apply = require('./_apply');
    /* Built-in method references for those with the same name as other `lodash` methods. */


    var nativeMax = Math.max;
    /**
     * A specialized version of `baseRest` which transforms the rest array.
     *
     * @private
     * @param {Function} func The function to apply a rest parameter to.
     * @param {number} [start=func.length-1] The start position of the rest parameter.
     * @param {Function} transform The rest array transform.
     * @returns {Function} Returns the new function.
     */

    function overRest(func, start, transform) {
      start = nativeMax(start === undefined ? func.length - 1 : start, 0);
      return function () {
        var args = arguments,
            index = -1,
            length = nativeMax(args.length - start, 0),
            array = Array(length);

        while (++index < length) {
          array[index] = args[start + index];
        }

        index = -1;
        var otherArgs = Array(start + 1);

        while (++index < start) {
          otherArgs[index] = args[index];
        }

        otherArgs[start] = transform(array);
        return apply(func, this, otherArgs);
      };
    }

    module.exports = overRest;
  }, {
    "./_apply": "a+zQ"
  }],
  "WMV8": [function (require, module, exports) {
    /**
     * Creates a function that returns `value`.
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Util
     * @param {*} value The value to return from the new function.
     * @returns {Function} Returns the new constant function.
     * @example
     *
     * var objects = _.times(2, _.constant({ 'a': 1 }));
     *
     * console.log(objects);
     * // => [{ 'a': 1 }, { 'a': 1 }]
     *
     * console.log(objects[0] === objects[1]);
     * // => true
     */
    function constant(value) {
      return function () {
        return value;
      };
    }

    module.exports = constant;
  }, {}],
  "UJWv": [function (require, module, exports) {
    var constant = require('./constant'),
        defineProperty = require('./_defineProperty'),
        identity = require('./identity');
    /**
     * The base implementation of `setToString` without support for hot loop shorting.
     *
     * @private
     * @param {Function} func The function to modify.
     * @param {Function} string The `toString` result.
     * @returns {Function} Returns `func`.
     */


    var baseSetToString = !defineProperty ? identity : function (func, string) {
      return defineProperty(func, 'toString', {
        'configurable': true,
        'enumerable': false,
        'value': constant(string),
        'writable': true
      });
    };
    module.exports = baseSetToString;
  }, {
    "./constant": "WMV8",
    "./_defineProperty": "kAdy",
    "./identity": "Jpv1"
  }],
  "2NNl": [function (require, module, exports) {
    /** Used to detect hot functions by number of calls within a span of milliseconds. */
    var HOT_COUNT = 800,
        HOT_SPAN = 16;
    /* Built-in method references for those with the same name as other `lodash` methods. */

    var nativeNow = Date.now;
    /**
     * Creates a function that'll short out and invoke `identity` instead
     * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
     * milliseconds.
     *
     * @private
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new shortable function.
     */

    function shortOut(func) {
      var count = 0,
          lastCalled = 0;
      return function () {
        var stamp = nativeNow(),
            remaining = HOT_SPAN - (stamp - lastCalled);
        lastCalled = stamp;

        if (remaining > 0) {
          if (++count >= HOT_COUNT) {
            return arguments[0];
          }
        } else {
          count = 0;
        }

        return func.apply(undefined, arguments);
      };
    }

    module.exports = shortOut;
  }, {}],
  "KRxT": [function (require, module, exports) {
    var baseSetToString = require('./_baseSetToString'),
        shortOut = require('./_shortOut');
    /**
     * Sets the `toString` method of `func` to return `string`.
     *
     * @private
     * @param {Function} func The function to modify.
     * @param {Function} string The `toString` result.
     * @returns {Function} Returns `func`.
     */


    var setToString = shortOut(baseSetToString);
    module.exports = setToString;
  }, {
    "./_baseSetToString": "UJWv",
    "./_shortOut": "2NNl"
  }],
  "f4Fl": [function (require, module, exports) {
    var identity = require('./identity'),
        overRest = require('./_overRest'),
        setToString = require('./_setToString');
    /**
     * The base implementation of `_.rest` which doesn't validate or coerce arguments.
     *
     * @private
     * @param {Function} func The function to apply a rest parameter to.
     * @param {number} [start=func.length-1] The start position of the rest parameter.
     * @returns {Function} Returns the new function.
     */


    function baseRest(func, start) {
      return setToString(overRest(func, start, identity), func + '');
    }

    module.exports = baseRest;
  }, {
    "./identity": "Jpv1",
    "./_overRest": "qXFa",
    "./_setToString": "KRxT"
  }],
  "R62e": [function (require, module, exports) {
    var eq = require('./eq'),
        isArrayLike = require('./isArrayLike'),
        isIndex = require('./_isIndex'),
        isObject = require('./isObject');
    /**
     * Checks if the given arguments are from an iteratee call.
     *
     * @private
     * @param {*} value The potential iteratee value argument.
     * @param {*} index The potential iteratee index or key argument.
     * @param {*} object The potential iteratee object argument.
     * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
     *  else `false`.
     */


    function isIterateeCall(value, index, object) {
      if (!isObject(object)) {
        return false;
      }

      var type = _typeof2(index);

      if (type == 'number' ? isArrayLike(object) && isIndex(index, object.length) : type == 'string' && index in object) {
        return eq(object[index], value);
      }

      return false;
    }

    module.exports = isIterateeCall;
  }, {
    "./eq": "LIpy",
    "./isArrayLike": "LN6c",
    "./_isIndex": "A+gr",
    "./isObject": "u9vI"
  }],
  "gmQJ": [function (require, module, exports) {
    var baseRest = require('./_baseRest'),
        isIterateeCall = require('./_isIterateeCall');
    /**
     * Creates a function like `_.assign`.
     *
     * @private
     * @param {Function} assigner The function to assign values.
     * @returns {Function} Returns the new assigner function.
     */


    function createAssigner(assigner) {
      return baseRest(function (object, sources) {
        var index = -1,
            length = sources.length,
            customizer = length > 1 ? sources[length - 1] : undefined,
            guard = length > 2 ? sources[2] : undefined;
        customizer = assigner.length > 3 && typeof customizer == 'function' ? (length--, customizer) : undefined;

        if (guard && isIterateeCall(sources[0], sources[1], guard)) {
          customizer = length < 3 ? undefined : customizer;
          length = 1;
        }

        object = Object(object);

        while (++index < length) {
          var source = sources[index];

          if (source) {
            assigner(object, source, index, customizer);
          }
        }

        return object;
      });
    }

    module.exports = createAssigner;
  }, {
    "./_baseRest": "f4Fl",
    "./_isIterateeCall": "R62e"
  }],
  "yubd": [function (require, module, exports) {
    var baseMerge = require('./_baseMerge'),
        createAssigner = require('./_createAssigner');
    /**
     * This method is like `_.assign` except that it recursively merges own and
     * inherited enumerable string keyed properties of source objects into the
     * destination object. Source properties that resolve to `undefined` are
     * skipped if a destination value exists. Array and plain object properties
     * are merged recursively. Other objects and value types are overridden by
     * assignment. Source objects are applied from left to right. Subsequent
     * sources overwrite property assignments of previous sources.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 0.5.0
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var object = {
     *   'a': [{ 'b': 2 }, { 'd': 4 }]
     * };
     *
     * var other = {
     *   'a': [{ 'c': 3 }, { 'e': 5 }]
     * };
     *
     * _.merge(object, other);
     * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
     */


    var merge = createAssigner(function (object, source, srcIndex) {
      baseMerge(object, source, srcIndex);
    });
    module.exports = merge;
  }, {
    "./_baseMerge": "WqwZ",
    "./_createAssigner": "gmQJ"
  }],
  "duLQ": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;

    var _Utilities = _interopRequireDefault(require("./Utilities"));

    var _merge = _interopRequireDefault(require("lodash/merge"));

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      return Constructor;
    }

    var Configuration = /*#__PURE__*/function () {
      function Configuration(configObject) {
        _classCallCheck(this, Configuration);

        window.CookieConsent.buffer = {
          appendChild: [],
          insertBefore: [] // Wrapper filter function

        };

        window.CookieConsent.wrapper = function () {}; // Settings injector for users


        window.CookieConsent.setConfiguration = this.setConfiguration.bind(this);
        window.CookieConsent.config = {
          active: true,
          cookieExists: false,
          cookieVersion: 1,
          modalMainTextMoreLink: null,
          barTimeout: 1000,
          theme: {
            barColor: '#2C7CBF',
            barTextColor: '#FFF',
            barMainButtonColor: '#FFF',
            barMainButtonTextColor: '#2C7CBF',
            modalMainButtonColor: '#4285F4',
            modalMainButtonTextColor: '#FFF'
          },
          language: {
            current: 'en',
            locale: {
              en: {
                barMainText: 'This website uses cookies to ensure you get the best experience on our website.',
                barLinkSetting: 'Cookie Settings',
                barBtnAcceptAll: 'Accept all cookies',
                modalMainTitle: 'Cookie settings',
                modalMainText: 'Cookies are small piece of data sent from a website and stored on the user\'s computer by the user\'s web browser while the user is browsing. Your browser stores each message in a small file, called cookie. When you request another page from the server, your browser sends the cookie back to the server. Cookies were designed to be a reliable mechanism for websites to remember information or to record the user\'s browsing activity.',
                modalBtnSave: 'Save current settings',
                modalBtnAcceptAll: 'Accept all cookies and close',
                modalAffectedSolutions: 'Affected solutions:',
                learnMore: 'Learn More',
                on: 'On',
                off: 'Off'
              },
              hu: {
                barMainText: 'Ez a weboldal Sütiket használ a jobb felhasználói élmény érdekében.',
                barLinkSetting: 'Süti beállítások',
                barBtnAcceptAll: 'Minden süti elfogadása',
                modalMainTitle: 'Süti beállítások',
                modalMainText: 'A HTTP-süti (általában egyszerűen süti, illetve angolul cookie) egy információcsomag, amelyet a szerver küld a webböngészőnek, majd a böngésző visszaküld a szervernek minden, a szerver felé irányított kérés alkalmával. Amikor egy weboldalt kérünk le a szervertől, akkor a böngésző elküldi a számára elérhető sütiket. A süti-ket úgy tervezték, hogy megbízható mechanizmust biztosítsanak a webhelyek számára az információk megőrzésére vagy a felhasználók böngészési tevékenységének rögzítésére.',
                modalBtnSave: 'Beállítások mentése',
                modalBtnAcceptAll: 'Minden Süti elfogadása',
                modalAffectedSolutions: 'Mire lesz ez hatással:',
                learnMore: 'Tudj meg többet',
                on: 'Be',
                off: 'Ki'
              }
            }
          },
          categories: {},
          services: {}
        };
        this.setConfiguration(configObject);
      }

      _createClass(Configuration, [{
        key: "setConfiguration",
        value: function setConfiguration(configObject) {
          // The user overrides the default config
          (0, _merge.default)(window.CookieConsent.config, configObject); // The cookie overrides the default and user config

          this.cookieToConfig(); // We tell the world we did this

          _Utilities.default.dispatchEvent(document, 'CCConfigSet');
        }
      }, {
        key: "cookieToConfig",
        value: function cookieToConfig() {
          function removeReload() {
            _Utilities.default.removeCookie();

            location.reload();
            return false;
          }

          document.cookie.split(';').filter(function (item) {
            if (item.indexOf('cconsent') >= 0) {
              var cookieData = JSON.parse(item.split('=')[1]); // We check cookie version. If older we need to renew cookie.

              if (typeof cookieData.version === 'undefined') {
                return removeReload();
              } else {
                if (cookieData.version !== window.CookieConsent.config.cookieVersion) {
                  return removeReload();
                }
              } // We check if cookie data categories also exist in user config


              for (var key in cookieData.categories) {
                // The cookie contains category not present in user config so we invalidate cookie
                if (typeof window.CookieConsent.config.categories[key] === 'undefined') {
                  return removeReload();
                }
              } // We check if cookie data services also exist in user config


              cookieData.services.forEach(function (service) {
                // The cookie contains service not present in user config so we invalidate cookie
                if (typeof window.CookieConsent.config.services[service] === 'undefined') {
                  return removeReload();
                }
              }); // We we integrate cookie data into the global config object

              for (var _key in cookieData.categories) {
                window.CookieConsent.config.categories[_key].checked = window.CookieConsent.config.categories[_key].wanted = cookieData.categories[_key].wanted === true ? true : false;
              }

              window.CookieConsent.config.cookieExists = true;
              return true;
            }
          });
          return false;
        }
      }]);

      return Configuration;
    }();

    exports.default = Configuration;
  }, {
    "./Utilities": "/6wJ",
    "lodash/merge": "yubd"
  }],
  "ylk/": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;

    var _InsertScriptFilter = _interopRequireDefault(require("./InsertScriptFilter"));

    var _ScriptTagFilter = _interopRequireDefault(require("./ScriptTagFilter"));

    var _WrapperFilter = _interopRequireDefault(require("./WrapperFilter"));

    var _LocalCookieFilter = _interopRequireDefault(require("./LocalCookieFilter"));

    var _Interface = _interopRequireDefault(require("./Interface"));

    var _Configuration = _interopRequireDefault(require("./Configuration"));

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      return Constructor;
    }

    var CookieConsent = /*#__PURE__*/function () {
      function CookieConsent() {
        _classCallCheck(this, CookieConsent);
      }

      _createClass(CookieConsent, [{
        key: "init",
        value: function init(configObject) {
          new _Configuration.default(configObject);
          var insertScriptFilter = new _InsertScriptFilter.default();
          var scriptTagFilter = new _ScriptTagFilter.default();
          var wrapperFilter = new _WrapperFilter.default();
          var localCookieFilter = new _LocalCookieFilter.default();
          insertScriptFilter.init();
          scriptTagFilter.init();
          wrapperFilter.init();
          localCookieFilter.init();
          var UI = new _Interface.default();
          UI.buildInterface(function () {
            UI.addEventListeners();
          });
        }
      }]);

      return CookieConsent;
    }();

    exports.default = CookieConsent;
  }, {
    "./InsertScriptFilter": "UWvR",
    "./ScriptTagFilter": "ob2e",
    "./WrapperFilter": "935K",
    "./LocalCookieFilter": "2E//",
    "./Interface": "/Qw2",
    "./Configuration": "duLQ"
  }],
  "Focm": [function (require, module, exports) {
    "use strict";

    require("core-js/es6/symbol");

    require("core-js/fn/symbol/iterator");

    var _CookieConsent = _interopRequireDefault(require("./lib/CookieConsent"));

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    var cookieConsent = new _CookieConsent.default();
    window.CookieConsent = window.CookieConsent || {};
    window.CookieConsent.init = cookieConsent.init;
  }, {
    "core-js/es6/symbol": "CtPZ",
    "core-js/fn/symbol/iterator": "KQqW",
    "./lib/CookieConsent": "ylk/"
  }]
}, {}, ["Focm"], null);
},{"buffer":"../node_modules/buffer/index.js"}],"../node_modules/uikit/dist/js/uikit.min.js":[function(require,module,exports) {
var define;
/*! UIkit 3.5.10 | https://www.getuikit.com | (c) 2014 - 2020 YOOtheme | MIT License */

!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define("uikit",e):(t="undefined"!=typeof globalThis?globalThis:t||self).UIkit=e()}(this,function(){"use strict";var t=Object.prototype,n=t.hasOwnProperty;function h(t,e){return n.call(t,e)}var e={},i=/([a-z\d])([A-Z])/g;function d(t){return t in e||(e[t]=t.replace(i,"$1-$2").toLowerCase()),e[t]}var r=/-(\w)/g;function f(t){return t.replace(r,o)}function o(t,e){return e?e.toUpperCase():""}function p(t){return t.length?o(0,t.charAt(0))+t.slice(1):""}var s=String.prototype,a=s.startsWith||function(t){return 0===this.lastIndexOf(t,0)};function g(t,e){return a.call(t,e)}var c=s.endsWith||function(t){return this.substr(-t.length)===t};function u(t,e){return c.call(t,e)}var l=Array.prototype,m=function(t,e){return!!~this.indexOf(t,e)},v=s.includes||m,w=l.includes||m;function b(t,e){return t&&(D(t)?v:w).call(t,e)}var x=l.findIndex||function(t){for(var e=arguments,n=0;n<this.length;n++)if(t.call(e[1],this[n],n,this))return n;return-1};function y(t,e){return x.call(t,e)}var k=Array.isArray;function $(t){return"function"==typeof t}function I(t){return null!==t&&"object"==typeof t}var S=t.toString;function T(t){return"[object Object]"===S.call(t)}function E(t){return I(t)&&t===t.window}function _(t){return I(t)&&9===t.nodeType}function C(t){return I(t)&&!!t.jquery}function A(t){return I(t)&&1<=t.nodeType}function N(t){return I(t)&&1===t.nodeType}function M(t){return S.call(t).match(/^\[object (NodeList|HTMLCollection)\]$/)}function z(t){return"boolean"==typeof t}function D(t){return"string"==typeof t}function B(t){return"number"==typeof t}function P(t){return B(t)||D(t)&&!isNaN(t-parseFloat(t))}function O(t){return!(k(t)?t.length:I(t)&&Object.keys(t).length)}function H(t){return void 0===t}function L(t){return z(t)?t:"true"===t||"1"===t||""===t||"false"!==t&&"0"!==t&&t}function j(t){t=Number(t);return!isNaN(t)&&t}function F(t){return parseFloat(t)||0}function W(t){return A(t)?t:M(t)||C(t)?t[0]:k(t)?W(t[0]):null}function V(t){return A(t)?[t]:M(t)?l.slice.call(t):k(t)?t.map(W).filter(Boolean):C(t)?t.toArray():[]}function R(t){return E(t)?t:(t=W(t))?(_(t)?t:t.ownerDocument).defaultView:window}function q(t){return k(t)?t:D(t)?t.split(/,(?![^(]*\))/).map(function(t){return P(t)?j(t):L(t.trim())}):[t]}function U(t){return t?u(t,"ms")?F(t):1e3*F(t):0}function Y(t,n){return t===n||I(t)&&I(n)&&Object.keys(t).length===Object.keys(n).length&&K(t,function(t,e){return t===n[e]})}function X(t,e,n){return t.replace(new RegExp(e+"|"+n,"g"),function(t){return t===e?n:e})}var G=Object.assign||function(t){for(var e=[],n=arguments.length-1;0<n--;)e[n]=arguments[n+1];t=Object(t);for(var i=0;i<e.length;i++){var r=e[i];if(null!==r)for(var o in r)h(r,o)&&(t[o]=r[o])}return t};function J(t){return t[t.length-1]}function K(t,e){for(var n in t)if(!1===e(t[n],n))return!1;return!0}function Z(t,n){return t.sort(function(t,e){t=t[n];void 0===t&&(t=0);e=e[n];return void 0===e&&(e=0),e<t?1:t<e?-1:0})}function Q(t,e){var n=new Set;return t.filter(function(t){t=t[e];return!n.has(t)&&(n.add(t)||!0)})}function tt(t,e,n){return void 0===e&&(e=0),void 0===n&&(n=1),Math.min(Math.max(j(t)||0,e),n)}function et(){}function nt(t,e){return t.left<e.right&&t.right>e.left&&t.top<e.bottom&&t.bottom>e.top}function it(t,e){return t.x<=e.right&&t.x>=e.left&&t.y<=e.bottom&&t.y>=e.top}var rt={ratio:function(t,e,n){var i="width"===e?"height":"width",r={};return r[i]=t[e]?Math.round(n*t[i]/t[e]):t[i],r[e]=n,r},contain:function(n,i){var r=this;return K(n=G({},n),function(t,e){return n=n[e]>i[e]?r.ratio(n,e,i[e]):n}),n},cover:function(n,i){var r=this;return K(n=this.contain(n,i),function(t,e){return n=n[e]<i[e]?r.ratio(n,e,i[e]):n}),n}};function ot(t,e,n){if(I(e))for(var i in e)ot(t,i,e[i]);else{if(H(n))return(t=W(t))&&t.getAttribute(e);V(t).forEach(function(t){$(n)&&(n=n.call(t,ot(t,e))),null===n?at(t,e):t.setAttribute(e,n)})}}function st(t,e){return V(t).some(function(t){return t.hasAttribute(e)})}function at(t,e){t=V(t),e.split(" ").forEach(function(e){return t.forEach(function(t){return t.hasAttribute(e)&&t.removeAttribute(e)})})}function ct(t,e){for(var n=0,i=[e,"data-"+e];n<i.length;n++)if(st(t,i[n]))return ot(t,i[n])}var ut="undefined"!=typeof window,ht=ut&&/msie|trident/i.test(window.navigator.userAgent),lt=ut&&"rtl"===ot(document.documentElement,"dir"),dt=ut&&"ontouchstart"in window,ft=ut&&window.PointerEvent,pt=ut&&(dt||window.DocumentTouch&&document instanceof DocumentTouch||navigator.maxTouchPoints),mt=ft?"pointerdown":dt?"touchstart":"mousedown",gt=ft?"pointermove":dt?"touchmove":"mousemove",vt=ft?"pointerup":dt?"touchend":"mouseup",wt=ft?"pointerenter":dt?"":"mouseenter",bt=ft?"pointerleave":dt?"":"mouseleave",xt=ft?"pointercancel":"touchcancel";function yt(t,e){return W(t)||It(t,$t(t,e))}function kt(t,e){var n=V(t);return n.length&&n||St(t,$t(t,e))}function $t(t,e){return void 0===e&&(e=document),Ct(t)||_(e)?e:e.ownerDocument}function It(t,e){return W(Tt(t,e,"querySelector"))}function St(t,e){return V(Tt(t,e,"querySelectorAll"))}function Tt(t,o,e){if(void 0===o&&(o=document),!t||!D(t))return null;var s;Ct(t=t.replace(_t,"$1 *"))&&(s=[],t=t.match(At).map(function(t){return t.replace(/,$/,"").trim()}).map(function(t,e){var n,i,r=o;return"!"===t[0]&&(i=t.substr(1).trim().split(" "),r=Bt(Pt(o),i[0]),t=i.slice(1).join(" ").trim()),"-"===t[0]&&(n=t.substr(1).trim().split(" "),i=(r||o).previousElementSibling,r=zt(i,t.substr(1))?i:null,t=n.slice(1).join(" ")),r?(r.id||(r.id="uk-"+Date.now()+e,s.push(function(){return at(r,"id")})),"#"+Ht(r.id)+" "+t):null}).filter(Boolean).join(","),o=document);try{return o[e](t)}catch(t){return null}finally{s&&s.forEach(function(t){return t()})}}var Et=/(^|[^\\],)\s*[!>+~-]/,_t=/([!>+~-])(?=\s+[!>+~-]|\s*$)/g;function Ct(t){return D(t)&&t.match(Et)}var At=/.*?[^\\](?:,|$)/g;var Nt=ut?Element.prototype:{},Mt=Nt.matches||Nt.webkitMatchesSelector||Nt.msMatchesSelector||et;function zt(t,e){return V(t).some(function(t){return Mt.call(t,e)})}var Dt=Nt.closest||function(t){var e=this;do{if(zt(e,t))return e}while(e=Pt(e))};function Bt(t,e){return g(e,">")&&(e=e.slice(1)),N(t)?Dt.call(t,e):V(t).map(function(t){return Bt(t,e)}).filter(Boolean)}function Pt(t){return(t=W(t))&&N(t.parentNode)&&t.parentNode}var Ot=ut&&window.CSS&&CSS.escape||function(t){return t.replace(/([^\x7f-\uFFFF\w-])/g,function(t){return"\\"+t})};function Ht(t){return D(t)?Ot.call(null,t):""}var Lt={area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,menuitem:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0};function jt(t){return V(t).some(function(t){return Lt[t.tagName.toLowerCase()]})}function Ft(t){return V(t).some(function(t){return t.offsetWidth||t.offsetHeight||t.getClientRects().length})}var Wt="input,select,textarea,button";function Vt(t){return V(t).some(function(t){return zt(t,Wt)})}function Rt(t,e){return V(t).filter(function(t){return zt(t,e)})}function qt(t,e){return D(e)?zt(t,e)||!!Bt(t,e):t===e||(_(e)?e.documentElement:W(e)).contains(W(t))}function Ut(t,e){for(var n=[];t=Pt(t);)e&&!zt(t,e)||n.push(t);return n}function Yt(t,e){t=(t=W(t))?V(t.children):[];return e?Rt(t,e):t}function Xt(){for(var t=[],e=arguments.length;e--;)t[e]=arguments[e];var n,i,r=Qt(t),o=r[0],s=r[1],a=r[2],c=r[3],u=r[4],o=ie(o);return 1<c.length&&(n=c,c=function(t){return k(t.detail)?n.apply(void 0,[t].concat(t.detail)):n(t)}),u&&u.self&&(i=c,c=function(t){if(t.target===t.currentTarget||t.target===t.current)return i.call(null,t)}),a&&(c=function(t,i,r){var o=this;return function(n){t.forEach(function(t){var e=">"===i[0]?St(i,t).reverse().filter(function(t){return qt(n.target,t)})[0]:Bt(n.target,i);e&&(n.delegate=t,n.current=e,r.call(o,n))})}}(o,a,c)),u=te(u),s.split(" ").forEach(function(e){return o.forEach(function(t){return t.addEventListener(e,c,u)})}),function(){return Gt(o,s,c,u)}}function Gt(t,e,n,i){void 0===i&&(i=!1),i=te(i),t=ie(t),e.split(" ").forEach(function(e){return t.forEach(function(t){return t.removeEventListener(e,n,i)})})}function Jt(){for(var t=[],e=arguments.length;e--;)t[e]=arguments[e];var n=Qt(t),i=n[0],r=n[1],o=n[2],s=n[3],a=n[4],c=n[5],u=Xt(i,r,o,function(t){var e=!c||c(t);e&&(u(),s(t,e))},a);return u}function Kt(t,n,i){return ie(t).reduce(function(t,e){return t&&e.dispatchEvent(Zt(n,!0,!0,i))},!0)}function Zt(t,e,n,i){var r;return void 0===e&&(e=!0),void 0===n&&(n=!1),D(t)&&((r=document.createEvent("CustomEvent")).initCustomEvent(t,e,n,i),t=r),t}function Qt(t){return $(t[2])&&t.splice(2,0,!1),t}function te(t){return t&&ht&&!z(t)?!!t.capture:t}function ee(t){return t&&"addEventListener"in t}function ne(t){return ee(t)?t:W(t)}function ie(t){return k(t)?t.map(ne).filter(Boolean):D(t)?St(t):ee(t)?[t]:V(t)}function re(t){return"touch"===t.pointerType||!!t.touches}function oe(t){var e=t.touches,n=t.changedTouches,t=e&&e[0]||n&&n[0]||t;return{x:t.clientX,y:t.clientY}}function se(){var n=this;this.promise=new ae(function(t,e){n.reject=e,n.resolve=t})}var ae=ut&&window.Promise||he,ce=2,ue=ut&&window.setImmediate||setTimeout;function he(t){this.state=ce,this.value=void 0,this.deferred=[];var e=this;try{t(function(t){e.resolve(t)},function(t){e.reject(t)})}catch(t){e.reject(t)}}he.reject=function(n){return new he(function(t,e){e(n)})},he.resolve=function(n){return new he(function(t,e){t(n)})},he.all=function(o){return new he(function(n,t){var i=[],r=0;0===o.length&&n(i);for(var e=0;e<o.length;e+=1)he.resolve(o[e]).then(function(e){return function(t){i[e]=t,(r+=1)===o.length&&n(i)}}(e),t)})},he.race=function(i){return new he(function(t,e){for(var n=0;n<i.length;n+=1)he.resolve(i[n]).then(t,e)})};var le=he.prototype;function de(s,a){return new ae(function(t,e){var n=G({data:null,method:"GET",headers:{},xhr:new XMLHttpRequest,beforeSend:et,responseType:""},a);n.beforeSend(n);var i,r,o=n.xhr;for(i in n)if(i in o)try{o[i]=n[i]}catch(t){}for(r in o.open(n.method.toUpperCase(),s),n.headers)o.setRequestHeader(r,n.headers[r]);Xt(o,"load",function(){0===o.status||200<=o.status&&o.status<300||304===o.status?("json"===n.responseType&&D(o.response)&&(o=G(function(t){var e,n={};for(e in t)n[e]=t[e];return n}(o),{response:JSON.parse(o.response)})),t(o)):e(G(Error(o.statusText),{xhr:o,status:o.status}))}),Xt(o,"error",function(){return e(G(Error("Network Error"),{xhr:o}))}),Xt(o,"timeout",function(){return e(G(Error("Network Timeout"),{xhr:o}))}),o.send(n.data)})}function fe(i,r,o){return new ae(function(t,e){var n=new Image;n.onerror=function(t){return e(t)},n.onload=function(){return t(n)},o&&(n.sizes=o),r&&(n.srcset=r),n.src=i})}function pe(t){var e;"loading"===document.readyState?e=Xt(document,"DOMContentLoaded",function(){e(),t()}):t()}function me(t,e){return e?V(t).indexOf(W(e)):Yt(Pt(t)).indexOf(t)}function ge(t,e,n,i){void 0===n&&(n=0),void 0===i&&(i=!1);var r=(e=V(e)).length;return t=P(t)?j(t):"next"===t?n+1:"previous"===t?n-1:me(e,t),i?tt(t,0,r-1):(t%=r)<0?t+r:t}function ve(t){return(t=Ne(t)).innerHTML="",t}function we(t,e){return t=Ne(t),H(e)?t.innerHTML:be(t.hasChildNodes()?ve(t):t,e)}function be(e,t){return e=Ne(e),ke(t,function(t){return e.appendChild(t)})}function xe(e,t){return e=Ne(e),ke(t,function(t){return e.parentNode.insertBefore(t,e)})}function ye(e,t){return e=Ne(e),ke(t,function(t){return e.nextSibling?xe(e.nextSibling,t):be(e.parentNode,t)})}function ke(t,e){return(t=D(t)?Ce(t):t)?"length"in t?V(t).map(e):e(t):null}function $e(t){V(t).map(function(t){return t.parentNode&&t.parentNode.removeChild(t)})}function Ie(t,e){for(e=W(xe(t,e));e.firstChild;)e=e.firstChild;return be(e,t),e}function Se(t,e){return V(V(t).map(function(t){return t.hasChildNodes?Ie(V(t.childNodes),e):be(t,e)}))}function Te(t){V(t).map(Pt).filter(function(t,e,n){return n.indexOf(t)===e}).forEach(function(t){xe(t,t.childNodes),$e(t)})}le.resolve=function(t){var e=this;if(e.state===ce){if(t===e)throw new TypeError("Promise settled with itself.");var n=!1;try{var i=t&&t.then;if(null!==t&&I(t)&&$(i))return void i.call(t,function(t){n||e.resolve(t),n=!0},function(t){n||e.reject(t),n=!0})}catch(t){return void(n||e.reject(t))}e.state=0,e.value=t,e.notify()}},le.reject=function(t){var e=this;if(e.state===ce){if(t===e)throw new TypeError("Promise settled with itself.");e.state=1,e.value=t,e.notify()}},le.notify=function(){var o=this;ue(function(){if(o.state!==ce)for(;o.deferred.length;){var t=o.deferred.shift(),e=t[0],n=t[1],i=t[2],r=t[3];try{0===o.state?$(e)?i(e.call(void 0,o.value)):i(o.value):1===o.state&&($(n)?i(n.call(void 0,o.value)):r(o.value))}catch(t){r(t)}}})},le.then=function(n,i){var r=this;return new he(function(t,e){r.deferred.push([n,i,t,e]),r.notify()})},le.catch=function(t){return this.then(void 0,t)};var Ee=/^\s*<(\w+|!)[^>]*>/,_e=/^<(\w+)\s*\/?>(?:<\/\1>)?$/;function Ce(t){var e=_e.exec(t);if(e)return document.createElement(e[1]);e=document.createElement("div");return Ee.test(t)?e.insertAdjacentHTML("beforeend",t.trim()):e.textContent=t,1<e.childNodes.length?V(e.childNodes):e.firstChild}function Ae(t,e){if(N(t))for(e(t),t=t.firstElementChild;t;){var n=t.nextElementSibling;Ae(t,e),t=n}}function Ne(t,e){return D(t)?ze(t)?W(Ce(t)):It(t,e):W(t)}function Me(t,e){return D(t)?ze(t)?V(Ce(t)):St(t,e):V(t)}function ze(t){return"<"===t[0]||t.match(/^\s*</)}function De(t){for(var e=[],n=arguments.length-1;0<n--;)e[n]=arguments[n+1];je(t,e,"add")}function Be(t){for(var e=[],n=arguments.length-1;0<n--;)e[n]=arguments[n+1];je(t,e,"remove")}function Pe(t,e){ot(t,"class",function(t){return(t||"").replace(new RegExp("\\b"+e+"\\b","g"),"")})}function Oe(t){for(var e=[],n=arguments.length-1;0<n--;)e[n]=arguments[n+1];e[0]&&Be(t,e[0]),e[1]&&De(t,e[1])}function He(t,e){return e&&V(t).some(function(t){return t.classList.contains(e.split(" ")[0])})}function Le(t){for(var i,r=[],e=arguments.length-1;0<e--;)r[e]=arguments[e+1];r.length&&(i=D(J(r=Fe(r)))?[]:r.pop(),r=r.filter(Boolean),V(t).forEach(function(t){for(var e=t.classList,n=0;n<r.length;n++)We.Force?e.toggle.apply(e,[r[n]].concat(i)):e[(H(i)?!e.contains(r[n]):i)?"add":"remove"](r[n])}))}function je(t,n,i){(n=Fe(n).filter(Boolean)).length&&V(t).forEach(function(t){var e=t.classList;We.Multiple?e[i].apply(e,n):n.forEach(function(t){return e[i](t)})})}function Fe(t){return t.reduce(function(t,e){return t.concat.call(t,D(e)&&b(e," ")?e.trim().split(" "):e)},[])}var We={get Multiple(){return this.get("_multiple")},get Force(){return this.get("_force")},get:function(t){var e;return h(this,t)||((e=document.createElement("_").classList).add("a","b"),e.toggle("c",!1),this._multiple=e.contains("b"),this._force=!e.contains("c")),this[t]}},Ve={"animation-iteration-count":!0,"column-count":!0,"fill-opacity":!0,"flex-grow":!0,"flex-shrink":!0,"font-weight":!0,"line-height":!0,opacity:!0,order:!0,orphans:!0,"stroke-dasharray":!0,"stroke-dashoffset":!0,widows:!0,"z-index":!0,zoom:!0};function Re(t,e,r){return V(t).map(function(n){if(D(e)){if(e=Je(e),H(r))return Ue(n,e);r||B(r)?n.style[e]=P(r)&&!Ve[e]?r+"px":r:n.style.removeProperty(e)}else{if(k(e)){var i=qe(n);return e.reduce(function(t,e){return t[e]=i[Je(e)],t},{})}I(e)&&K(e,function(t,e){return Re(n,e,t)})}return n})[0]}function qe(t,e){return(t=W(t)).ownerDocument.defaultView.getComputedStyle(t,e)}function Ue(t,e,n){return qe(t,n)[e]}var Ye={};function Xe(t){var e,n=document.documentElement;return ht?(t in Ye||(De(e=be(n,document.createElement("div")),"uk-"+t),Ye[t]=Ue(e,"content",":before").replace(/^["'](.*)["']$/,"$1"),$e(e)),Ye[t]):qe(n).getPropertyValue("--uk-"+t)}var Ge={};function Je(t){return Ge[t]||(Ge[t]=function(t){t=d(t);var e=document.documentElement.style;if(t in e)return t;var n,i=Ke.length;for(;i--;)if((n="-"+Ke[i]+"-"+t)in e)return n}(t)||t)}var Ke=["webkit","moz","ms"];function Ze(t,s,a,c){return void 0===a&&(a=400),void 0===c&&(c="linear"),ae.all(V(t).map(function(o){return new ae(function(e,n){for(var t in s){var i=Re(o,t);""===i&&Re(o,t,i)}var r=setTimeout(function(){return Kt(o,"transitionend")},a);Jt(o,"transitionend transitioncanceled",function(t){t=t.type;clearTimeout(r),Be(o,"uk-transition"),Re(o,{transitionProperty:"",transitionDuration:"",transitionTimingFunction:""}),("transitioncanceled"===t?n:e)()},{self:!0}),De(o,"uk-transition"),Re(o,G({transitionProperty:Object.keys(s).map(Je).join(","),transitionDuration:a+"ms",transitionTimingFunction:c},s))})}))}var Qe={start:Ze,stop:function(t){return Kt(t,"transitionend"),ae.resolve()},cancel:function(t){Kt(t,"transitioncanceled")},inProgress:function(t){return He(t,"uk-transition")}},tn="uk-animation-";function en(t,o,s,a,c){return void 0===s&&(s=200),ae.all(V(t).map(function(r){return new ae(function(e,n){Kt(r,"animationcanceled");var i=setTimeout(function(){return Kt(r,"animationend")},s);Jt(r,"animationend animationcanceled",function(t){t=t.type;clearTimeout(i),("animationcanceled"===t?n:e)(),Re(r,"animationDuration",""),Pe(r,tn+"\\S*")},{self:!0}),Re(r,"animationDuration",s+"ms"),De(r,o,tn+(c?"leave":"enter")),g(o,tn)&&De(r,a&&"uk-transform-origin-"+a,c&&tn+"reverse")})}))}var nn=new RegExp(tn+"(enter|leave)"),rn={in:en,out:function(t,e,n,i){return en(t,e,n,i,!0)},inProgress:function(t){return nn.test(ot(t,"class"))},cancel:function(t){Kt(t,"animationcanceled")}},on={width:["x","left","right"],height:["y","top","bottom"]};function sn(t,e,h,l,d,n,i,r){h=gn(h),l=gn(l);var f={element:h,target:l};if(!t||!e)return f;var o,p=cn(t),m=cn(e),g=m;return mn(g,h,p,-1),mn(g,l,m,1),d=vn(d,p.width,p.height),n=vn(n,m.width,m.height),d.x+=n.x,d.y+=n.y,g.left+=d.x,g.top+=d.y,i&&(o=[cn(R(t))],r&&o.unshift(cn(r)),K(on,function(t,s){var a=t[0],c=t[1],u=t[2];!0!==i&&!b(i,a)||o.some(function(n){var t=h[a]===c?-p[s]:h[a]===u?p[s]:0,e=l[a]===c?m[s]:l[a]===u?-m[s]:0;if(g[c]<n[c]||g[c]+p[s]>n[u]){var i=p[s]/2,r="center"===l[a]?-m[s]/2:0;return"center"===h[a]&&(o(i,r)||o(-i,-r))||o(t,e)}function o(e,t){t=F((g[c]+e+t-2*d[a]).toFixed(4));if(t>=n[c]&&t+p[s]<=n[u])return g[c]=t,["element","target"].forEach(function(t){f[t][a]=e?f[t][a]===on[s][1]?on[s][2]:on[s][1]:f[t][a]}),!0}})})),an(t,g),f}function an(n,i){if(!i)return cn(n);var r=cn(n),o=Re(n,"position");["left","top"].forEach(function(t){var e;t in i&&(e=Re(n,t),Re(n,t,i[t]-r[t]+F("absolute"===o&&"auto"===e?un(n)[t]:e)))})}function cn(t){var e=R(t),n=e.pageYOffset,e=e.pageXOffset,t=E(t)?{height:ln(t),width:dn(t),top:0,left:0}:function(t){if(!t)return{};var e;Ft(t)||(e=ot(t,"style"),t.style.setProperty("display","block","important"));var n=t.getBoundingClientRect();return ot(t,"style",e),n}(W(t));return{height:t.height,width:t.width,top:t.top+n,left:t.left+e,bottom:t.top+t.height+n,right:t.left+t.width+e}}function un(t,e){e=e||(W(t)||{}).offsetParent||R(t).document.documentElement;var n=an(t),t=an(e);return{top:n.top-t.top-F(Re(e,"borderTopWidth")),left:n.left-t.left-F(Re(e,"borderLeftWidth"))}}function hn(t){var e=[0,0];t=W(t);do{if(e[0]+=t.offsetTop,e[1]+=t.offsetLeft,"fixed"===Re(t,"position")){var n=R(t);return e[0]+=n.pageYOffset,e[1]+=n.pageXOffset,e}}while(t=t.offsetParent);return e}var ln=fn("height"),dn=fn("width");function fn(i){var r=p(i);return function(t,e){if(H(e)){if(E(t))return t["inner"+r];if(_(t)){var n=t.documentElement;return Math.max(n["offset"+r],n["scroll"+r])}return(e="auto"===(e=Re(t=W(t),i))?t["offset"+r]:F(e)||0)-pn(t,i)}Re(t,i,e||0===e?+e+pn(t,i)+"px":"")}}function pn(n,t,e){return void 0===e&&(e="border-box"),Re(n,"boxSizing")===e?on[t].slice(1).map(p).reduce(function(t,e){return t+F(Re(n,"padding"+e))+F(Re(n,"border"+e+"Width"))},0):0}function mn(r,o,s,a){K(on,function(t,e){var n=t[0],i=t[1],t=t[2];o[n]===t?r[i]+=s[e]*a:"center"===o[n]&&(r[i]+=s[e]*a/2)})}function gn(t){var e=/left|center|right/,n=/top|center|bottom/;return 1===(t=(t||"").split(" ")).length&&(t=e.test(t[0])?t.concat("center"):n.test(t[0])?["center"].concat(t):["center","center"]),{x:e.test(t[0])?t[0]:"center",y:n.test(t[1])?t[1]:"center"}}function vn(t,e,n){var i=(t||"").split(" "),t=i[0],i=i[1];return{x:t?F(t)*(u(t,"%")?e/100:1):0,y:i?F(i)*(u(i,"%")?n/100:1):0}}function wn(t){switch(t){case"left":return"right";case"right":return"left";case"top":return"bottom";case"bottom":return"top";default:return t}}function bn(t,e,n){return void 0===e&&(e="width"),void 0===n&&(n=window),P(t)?+t:u(t,"vh")?xn(ln(R(n)),t):u(t,"vw")?xn(dn(R(n)),t):u(t,"%")?xn(cn(n)[e],t):F(t)}function xn(t,e){return t*F(e)/100}var yn={reads:[],writes:[],read:function(t){return this.reads.push(t),In(),t},write:function(t){return this.writes.push(t),In(),t},clear:function(t){return Tn(this.reads,t)||Tn(this.writes,t)},flush:kn};function kn(t){void 0===t&&(t=1),Sn(yn.reads),Sn(yn.writes.splice(0,yn.writes.length)),yn.scheduled=!1,(yn.reads.length||yn.writes.length)&&In(t+1)}var $n=4;function In(t){yn.scheduled||(yn.scheduled=!0,t&&t<$n?ae.resolve().then(function(){return kn(t)}):requestAnimationFrame(function(){return kn()}))}function Sn(t){for(var e;e=t.shift();)e()}function Tn(t,e){e=t.indexOf(e);return!!~e&&!!t.splice(e,1)}function En(){}En.prototype={positions:[],init:function(){var e,t=this;this.positions=[],this.unbind=Xt(document,"mousemove",function(t){return e=oe(t)}),this.interval=setInterval(function(){e&&(t.positions.push(e),5<t.positions.length&&t.positions.shift())},50)},cancel:function(){this.unbind&&this.unbind(),this.interval&&clearInterval(this.interval)},movesTo:function(t){if(this.positions.length<2)return!1;var e=t.getBoundingClientRect(),n=e.left,i=e.right,r=e.top,o=e.bottom,s=this.positions[0],t=J(this.positions),a=[s,t];return!it(t,e)&&[[{x:n,y:r},{x:i,y:o}],[{x:n,y:o},{x:i,y:r}]].some(function(t){t=function(t,e){var n=t[0],i=n.x,r=n.y,o=t[1],s=o.x,a=o.y,c=e[0],n=c.x,t=c.y,o=e[1],c=o.x,e=o.y,o=(e-t)*(s-i)-(c-n)*(a-r);if(0==o)return!1;o=((c-n)*(r-t)-(e-t)*(i-n))/o;if(o<0)return!1;return{x:i+o*(s-i),y:r+o*(a-r)}}(a,t);return t&&it(t,e)})}};var _n={};function Cn(t,e,n){return _n.computed($(t)?t.call(n,n):t,$(e)?e.call(n,n):e)}function An(t,e){return t=t&&!k(t)?[t]:t,e?t?t.concat(e):k(e)?e:[e]:t}function Nn(e,n,i){var t,r,o={};if($(n)&&(n=n.options),n.extends&&(e=Nn(e,n.extends,i)),n.mixins)for(var s=0,a=n.mixins.length;s<a;s++)e=Nn(e,n.mixins[s],i);for(t in e)c(t);for(r in n)h(e,r)||c(r);function c(t){o[t]=(_n[t]||function(t,e){return H(e)?t:e})(e[t],n[t],i)}return o}function Mn(t,e){var n;void 0===e&&(e=[]);try{return t?g(t,"{")?JSON.parse(t):e.length&&!b(t,":")?((n={})[e[0]]=t,n):t.split(";").reduce(function(t,e){var n=e.split(/:(.*)/),e=n[0],n=n[1];return e&&!H(n)&&(t[e.trim()]=n.trim()),t},{}):{}}catch(t){return{}}}function zn(t){if(On(t)&&jn(t,{func:"playVideo",method:"play"}),Pn(t))try{t.play().catch(et)}catch(t){}}function Dn(t){On(t)&&jn(t,{func:"pauseVideo",method:"pause"}),Pn(t)&&t.pause()}function Bn(t){On(t)&&jn(t,{func:"mute",method:"setVolume",value:0}),Pn(t)&&(t.muted=!0)}function Pn(t){return t&&"VIDEO"===t.tagName}function On(t){return t&&"IFRAME"===t.tagName&&(Hn(t)||Ln(t))}function Hn(t){return!!t.src.match(/\/\/.*?youtube(-nocookie)?\.[a-z]+\/(watch\?v=[^&\s]+|embed)|youtu\.be\/.*/)}function Ln(t){return!!t.src.match(/vimeo\.com\/video\/.*/)}function jn(t,e){(function(e){if(e[Wn])return e[Wn];var n,i=Hn(e),r=Ln(e),o=++Vn;return e[Wn]=new ae(function(t){i&&Jt(e,"load",function(){function t(){return Fn(e,{event:"listening",id:o})}n=setInterval(t,100),t()}),Jt(window,"message",t,!1,function(t){var e=t.data;try{return(e=JSON.parse(e))&&(i&&e.id===o&&"onReady"===e.event||r&&Number(e.player_id)===o)}catch(t){}}),e.src=e.src+(b(e.src,"?")?"&":"?")+(i?"enablejsapi=1":"api=1&player_id="+o)}).then(function(){return clearInterval(n)})})(t).then(function(){return Fn(t,e)})}function Fn(t,e){try{t.contentWindow.postMessage(JSON.stringify(G({event:"command"},e)),"*")}catch(t){}}_n.events=_n.created=_n.beforeConnect=_n.connected=_n.beforeDisconnect=_n.disconnected=_n.destroy=An,_n.args=function(t,e){return!1!==e&&An(e||t)},_n.update=function(t,e){return Z(An(t,$(e)?{read:e}:e),"order")},_n.props=function(t,e){return k(e)&&(e=e.reduce(function(t,e){return t[e]=String,t},{})),_n.methods(t,e)},_n.computed=_n.methods=function(t,e){return e?t?G({},t,e):e:t},_n.data=function(e,n,t){return t?Cn(e,n,t):n?e?function(t){return Cn(e,n,t)}:n:e};var Wn="_ukPlayer",Vn=0;function Rn(o,s,a){if(void 0===s&&(s=0),void 0===a&&(a=0),!Ft(o))return!1;var c=Jn(o);return c.every(function(t,e){var n=an(c[e+1]||o),i=an(Gn(t)),r=i.top,e=i.left,t=i.bottom,i=i.right;return nt(n,{top:r-s,left:e-a,bottom:t+s,right:i+a})})}function qn(t,e){(t=(E(t)||_(t)?Kn:W)(t)).scrollTop=e}function Un(s,t){void 0===t&&(t={});var a=t.offset;if(void 0===a&&(a=0),Ft(s)){var c=Jn(s).reverse(),u=0;return c.reduce(function(t,e,n){var i=e.scrollTop,r=e.scrollHeight-e.clientHeight,o=Math.ceil(un(c[n-1]||s,Gn(e)).top-a)+u+i;return r<o?(u=o-r,o=r):u=0,function(){return s=e,a=o-i,new ae(function(n){var t,i=s.scrollTop,r=(t=Math.abs(a),40*Math.pow(t,.375)),o=Date.now();!function t(){var e,e=(e=tt((Date.now()-o)/r),.5*(1-Math.cos(Math.PI*e)));qn(s,i+a*e),1!=e?requestAnimationFrame(t):n()}()}).then(t);var s,a}},function(){return ae.resolve()})()}}function Yn(t,e){if(void 0===e&&(e=0),!Ft(t))return 0;var n=J(Xn(t)),i=n.scrollHeight,r=n.scrollTop,o=an(Gn(n)).height,s=hn(t)[0]-r-hn(n)[0],n=Math.min(o,s+r);return tt(-1*(s-n)/Math.min(an(t).height+e+n,i-(s+r),i-o))}function Xn(t,e){void 0===e&&(e=/auto|scroll/);var n=Kn(t),t=Ut(t).filter(function(t){return t===n||e.test(Re(t,"overflow"))&&t.scrollHeight>Math.round(an(t).height)}).reverse();return t.length?t:[n]}function Gn(t){return t===Kn(t)?window:t}function Jn(t){return Xn(t,/auto|scroll|hidden/)}function Kn(t){t=R(t).document;return t.scrollingElement||t.documentElement}var Zn=ut&&window.IntersectionObserver||function(){function t(e,t){var n=this;void 0===t&&(t={});var i=t.rootMargin;void 0===i&&(i="0 0"),this.targets=[];var r,t=(i||"0 0").split(" ").map(F),i=t[0],t=t[1];this.offsetTop=i,this.offsetLeft=t,this.apply=function(){r=r||requestAnimationFrame(function(){return setTimeout(function(){var t=n.takeRecords();t.length&&e(t,n),r=!1})})},this.off=Xt(window,"scroll resize load",this.apply,{passive:!0,capture:!0})}return t.prototype.takeRecords=function(){var n=this;return this.targets.filter(function(t){var e=Rn(t.target,n.offsetTop,n.offsetLeft);if(null===t.isIntersecting||e^t.isIntersecting)return t.isIntersecting=e,!0})},t.prototype.observe=function(t){this.targets.push({target:t,isIntersecting:null}),this.apply()},t.prototype.disconnect=function(){this.targets=[],this.off()},t}();function Qn(t){return!(!g(t,"uk-")&&!g(t,"data-uk-"))&&f(t.replace("data-uk-","").replace("uk-",""))}function ti(t){this._init(t)}var ei,ni,ii,ri,oi,si,ai,ci,ui;function hi(t,e){if(t)for(var n in t)t[n]._connected&&t[n]._callUpdate(e)}function li(t,e){var n={},i=t.args;void 0===i&&(i=[]);var r=t.props;void 0===r&&(r={});var o,s=t.el;if(!r)return n;for(o in r){var a=d(o),c=ct(s,a);H(c)||(c=r[o]===Boolean&&""===c||fi(r[o],c),("target"!==a||c&&!g(c,"_"))&&(n[o]=c))}var u,h=Mn(ct(s,e),i);for(u in h){var l=f(u);void 0!==r[l]&&(n[l]=fi(r[l],h[u]))}return n}function di(e,n,i){T(n)||(n={name:i,handler:n});var t=n.name,r=n.el,o=n.handler,s=n.capture,a=n.passive,c=n.delegate,u=n.filter,h=n.self,r=$(r)?r.call(e):r||e.$el;k(r)?r.forEach(function(t){return di(e,G({},n,{el:t}),i)}):!r||u&&!u.call(e)||e._events.push(Xt(r,t,c?D(c)?c:c.call(e):null,D(o)?e[o]:o.bind(e),{passive:a,capture:s,self:h}))}function fi(t,e){return t===Boolean?L(e):t===Number?j(e):"list"===t?q(e):t?t(e):e}ti.util=Object.freeze({__proto__:null,ajax:de,getImage:fe,transition:Ze,Transition:Qe,animate:en,Animation:rn,attr:ot,hasAttr:st,removeAttr:at,data:ct,addClass:De,removeClass:Be,removeClasses:Pe,replaceClass:Oe,hasClass:He,toggleClass:Le,positionAt:sn,offset:an,position:un,offsetPosition:hn,height:ln,width:dn,boxModelAdjust:pn,flipPosition:wn,toPx:bn,ready:pe,index:me,getIndex:ge,empty:ve,html:we,prepend:function(e,t){return(e=Ne(e)).hasChildNodes()?ke(t,function(t){return e.insertBefore(t,e.firstChild)}):be(e,t)},append:be,before:xe,after:ye,remove:$e,wrapAll:Ie,wrapInner:Se,unwrap:Te,fragment:Ce,apply:Ae,$:Ne,$$:Me,inBrowser:ut,isIE:ht,isRtl:lt,hasTouch:pt,pointerDown:mt,pointerMove:gt,pointerUp:vt,pointerEnter:wt,pointerLeave:bt,pointerCancel:xt,on:Xt,off:Gt,once:Jt,trigger:Kt,createEvent:Zt,toEventTargets:ie,isTouch:re,getEventPos:oe,fastdom:yn,isVoidElement:jt,isVisible:Ft,selInput:Wt,isInput:Vt,filter:Rt,within:qt,parents:Ut,children:Yt,hasOwn:h,hyphenate:d,camelize:f,ucfirst:p,startsWith:g,endsWith:u,includes:b,findIndex:y,isArray:k,isFunction:$,isObject:I,isPlainObject:T,isWindow:E,isDocument:_,isJQuery:C,isNode:A,isElement:N,isNodeCollection:M,isBoolean:z,isString:D,isNumber:B,isNumeric:P,isEmpty:O,isUndefined:H,toBoolean:L,toNumber:j,toFloat:F,toNode:W,toNodes:V,toWindow:R,toList:q,toMs:U,isEqual:Y,swap:X,assign:G,last:J,each:K,sortBy:Z,uniqueBy:Q,clamp:tt,noop:et,intersectRect:nt,pointInRect:it,Dimensions:rt,MouseTracker:En,mergeOptions:Nn,parseOptions:Mn,play:zn,pause:Dn,mute:Bn,Promise:ae,Deferred:se,IntersectionObserver:Zn,query:yt,queryAll:kt,find:It,findAll:St,matches:zt,closest:Bt,parent:Pt,escape:Ht,css:Re,getStyles:qe,getStyle:Ue,getCssVar:Xe,propName:Je,isInView:Rn,scrollTop:qn,scrollIntoView:Un,scrolledOver:Yn,scrollParents:Xn,getViewport:Gn}),ti.data="__uikit__",ti.prefix="uk-",ti.options={},ti.version="3.5.10",ii=(ei=ti).data,ei.use=function(t){if(!t.installed)return t.call(null,this),t.installed=!0,this},ei.mixin=function(t,e){(e=(D(e)?ei.component(e):e)||this).options=Nn(e.options,t)},ei.extend=function(t){t=t||{};function e(t){this._init(t)}return((e.prototype=Object.create(this.prototype)).constructor=e).options=Nn(this.options,t),e.super=this,e.extend=this.extend,e},ei.update=function(t,e){Ut(t=t?W(t):document.body).reverse().forEach(function(t){return hi(t[ii],e)}),Ae(t,function(t){return hi(t[ii],e)})},Object.defineProperty(ei,"container",{get:function(){return ni||document.body},set:function(t){ni=Ne(t)}}),(ri=ti).prototype._callHook=function(t){var e=this,t=this.$options[t];t&&t.forEach(function(t){return t.call(e)})},ri.prototype._callConnected=function(){this._connected||(this._data={},this._computeds={},this._frames={reads:{},writes:{}},this._initProps(),this._callHook("beforeConnect"),this._connected=!0,this._initEvents(),this._initObserver(),this._callHook("connected"),this._callUpdate())},ri.prototype._callDisconnected=function(){this._connected&&(this._callHook("beforeDisconnect"),this._observer&&(this._observer.disconnect(),this._observer=null),this._unbindEvents(),this._callHook("disconnected"),this._connected=!1)},ri.prototype._callUpdate=function(t){var r=this;void 0===t&&(t="update");var o=t.type||t;b(["update","resize"],o)&&this._callWatches();var e=this.$options.update,t=this._frames,s=t.reads,a=t.writes;e&&e.forEach(function(t,e){var n=t.read,i=t.write,t=t.events;"update"!==o&&!b(t,o)||(n&&!b(yn.reads,s[e])&&(s[e]=yn.read(function(){var t=r._connected&&n.call(r,r._data,o);!1===t&&i?yn.clear(a[e]):T(t)&&G(r._data,t)})),i&&!b(yn.writes,a[e])&&(a[e]=yn.write(function(){return r._connected&&i.call(r,r._data,o)})))})},ri.prototype._callWatches=function(){var a,c=this,u=this._frames;u._watch||(a=!h(u,"_watch"),u._watch=yn.read(function(){if(c._connected){var t,e=c.$options.computed,n=c._computeds;for(t in e){var i=h(n,t),r=n[t];delete n[t];var o=e[t],s=o.watch,o=o.immediate;s&&(a&&o||i&&!Y(r,c[t]))&&s.call(c,c[t],r)}u._watch=null}}))},si=0,(oi=ti).prototype._init=function(t){(t=t||{}).data=function(t,e){var n=t.data,i=(t.el,e.args),r=e.props;void 0===r&&(r={});if(n=k(n)?O(i)?void 0:n.slice(0,i.length).reduce(function(t,e,n){return T(e)?G(t,e):t[i[n]]=e,t},{}):n)for(var o in n)H(n[o])?delete n[o]:n[o]=r[o]?fi(r[o],n[o]):n[o];return n}(t,this.constructor.options),this.$options=Nn(this.constructor.options,t,this),this.$el=null,this.$props={},this._uid=si++,this._initData(),this._initMethods(),this._initComputeds(),this._callHook("created"),t.el&&this.$mount(t.el)},oi.prototype._initData=function(){var t,e=this.$options.data;for(t in void 0===e&&(e={}),e)this.$props[t]=this[t]=e[t]},oi.prototype._initMethods=function(){var t=this.$options.methods;if(t)for(var e in t)this[e]=t[e].bind(this)},oi.prototype._initComputeds=function(){var t=this.$options.computed;if(this._computeds={},t)for(var e in t)!function(i,r,o){Object.defineProperty(i,r,{enumerable:!0,get:function(){var t=i._computeds,e=i.$props,n=i.$el;return h(t,r)||(t[r]=(o.get||o).call(i,e,n)),t[r]},set:function(t){var e=i._computeds;e[r]=o.set?o.set.call(i,t):t,H(e[r])&&delete e[r]}})}(this,e,t[e])},oi.prototype._initProps=function(t){for(var e in t=t||li(this.$options,this.$name))H(t[e])||(this.$props[e]=t[e]);var n=[this.$options.computed,this.$options.methods];for(e in this.$props)e in t&&function(t,e){return t.every(function(t){return!t||!h(t,e)})}(n,e)&&(this[e]=this.$props[e])},oi.prototype._initEvents=function(){var n=this;this._events=[];var t=this.$options.events;t&&t.forEach(function(t){if(h(t,"handler"))di(n,t);else for(var e in t)di(n,t[e],e)})},oi.prototype._unbindEvents=function(){this._events.forEach(function(t){return t()}),delete this._events},oi.prototype._initObserver=function(){var i=this,t=this.$options,r=t.attrs,e=t.props,t=t.el;!this._observer&&e&&!1!==r&&(r=k(r)?r:Object.keys(e),this._observer=new MutationObserver(function(t){var n=li(i.$options,i.$name);t.some(function(t){var e=t.attributeName,t=e.replace("data-","");return(t===i.$name?r:[f(t),f(e)]).some(function(t){return!H(n[t])&&n[t]!==i.$props[t]})})&&i.$reset()}),e=r.map(d).concat(this.$name),this._observer.observe(t,{attributes:!0,attributeFilter:e.concat(e.map(function(t){return"data-"+t}))}))},ci=(ai=ti).data,ui={},ai.component=function(s,t){var e=d(s);if(s=f(e),!t)return T(ui[s])&&(ui[s]=ai.extend(ui[s])),ui[s];ai[s]=function(t,n){for(var e=arguments.length,i=Array(e);e--;)i[e]=arguments[e];var r=ai.component(s);return r.options.functional?new r({data:T(t)?t:[].concat(i)}):t?Me(t).map(o)[0]:o(t);function o(t){var e=ai.getComponent(t,s);if(e){if(!n)return e;e.$destroy()}return new r({el:t,data:n})}};var n=T(t)?G({},t):t.options;return n.name=s,n.install&&n.install(ai,n,s),ai._initialized&&!n.functional&&yn.read(function(){return ai[s]("[uk-"+e+"],[data-uk-"+e+"]")}),ui[s]=T(t)?n:t},ai.getComponents=function(t){return t&&t[ci]||{}},ai.getComponent=function(t,e){return ai.getComponents(t)[e]},ai.connect=function(t){if(t[ci])for(var e in t[ci])t[ci][e]._callConnected();for(var n=0;n<t.attributes.length;n++){var i=Qn(t.attributes[n].name);i&&i in ui&&ai[i](t)}},ai.disconnect=function(t){for(var e in t[ci])t[ci][e]._callDisconnected()},function(i){var r=i.data;i.prototype.$create=function(t,e,n){return i[t](e,n)},i.prototype.$mount=function(t){var e=this.$options.name;t[r]||(t[r]={}),t[r][e]||((t[r][e]=this).$el=this.$options.el=this.$options.el||t,qt(t,document)&&this._callConnected())},i.prototype.$reset=function(){this._callDisconnected(),this._callConnected()},i.prototype.$destroy=function(t){void 0===t&&(t=!1);var e=this.$options,n=e.el,e=e.name;n&&this._callDisconnected(),this._callHook("destroy"),n&&n[r]&&(delete n[r][e],O(n[r])||delete n[r],t&&$e(this.$el))},i.prototype.$emit=function(t){this._callUpdate(t)},i.prototype.$update=function(t,e){void 0===t&&(t=this.$el),i.update(t,e)},i.prototype.$getComponent=i.getComponent;var e={};Object.defineProperties(i.prototype,{$container:Object.getOwnPropertyDescriptor(i,"container"),$name:{get:function(){var t=this.$options.name;return e[t]||(e[t]=i.prefix+d(t)),e[t]}}})}(ti);var pi={connected:function(){He(this.$el,this.$name)||De(this.$el,this.$name)}},mi={props:{cls:Boolean,animation:"list",duration:Number,origin:String,transition:String},data:{cls:!1,animation:[!1],duration:200,origin:!1,transition:"linear",initProps:{overflow:"",height:"",paddingTop:"",paddingBottom:"",marginTop:"",marginBottom:""},hideProps:{overflow:"hidden",height:0,paddingTop:0,paddingBottom:0,marginTop:0,marginBottom:0}},computed:{hasAnimation:function(t){return!!t.animation[0]},hasTransition:function(t){t=t.animation;return this.hasAnimation&&!0===t[0]}},methods:{toggleElement:function(t,n,i){var r=this;return ae.all(V(t).map(function(e){return new ae(function(t){return r._toggleElement(e,n,i).then(t,et)})}))},isToggled:function(t){t=V(t||this.$el);return this.cls?He(t,this.cls.split(" ")[0]):!st(t,"hidden")},updateAria:function(t){!1===this.cls&&ot(t,"aria-hidden",!this.isToggled(t))},_toggleElement:function(t,e,n){var i=this;if(e=z(e)?e:rn.inProgress(t)?He(t,"uk-animation-leave"):Qe.inProgress(t)?"0px"===t.style.height:!this.isToggled(t),!Kt(t,"before"+(e?"show":"hide"),[this]))return ae.reject();var o,n=($(n)?n:!1!==n&&this.hasAnimation?this.hasTransition?gi(this):(o=this,function(t,e){rn.cancel(t);var n=o.animation,i=o.duration,r=o._toggle;return e?(r(t,!0),rn.in(t,n[0],i,o.origin)):rn.out(t,n[1]||n[0],i,o.origin).then(function(){return r(t,!1)})}):this._toggle)(t,e);Kt(t,e?"show":"hide",[this]);return(n||ae.resolve()).then(function(){Kt(t,e?"shown":"hidden",[i]),i.$update(t)})},_toggle:function(t,e){var n;t&&(e=Boolean(e),this.cls?(n=b(this.cls," ")||e!==He(t,this.cls))&&Le(t,this.cls,b(this.cls," ")?void 0:e):(n=e===t.hidden)&&(t.hidden=!e),Me("[autofocus]",t).some(function(t){return Ft(t)?t.focus()||!0:t.blur()}),this.updateAria(t),n&&(Kt(t,"toggled",[this]),this.$update(t)))}}};function gi(t){var o=t.isToggled,s=t.duration,a=t.initProps,c=t.hideProps,u=t.transition,h=t._toggle;return function(t,e){var n=Qe.inProgress(t),i=t.hasChildNodes?F(Re(t.firstElementChild,"marginTop"))+F(Re(t.lastElementChild,"marginBottom")):0,r=Ft(t)?ln(t)+(n?0:i):0;Qe.cancel(t),o(t)||h(t,!0),ln(t,""),yn.flush();i=ln(t)+(n?0:i);return ln(t,r),(e?Qe.start(t,G({},a,{overflow:"hidden",height:i}),Math.round(s*(1-r/i)),u):Qe.start(t,c,Math.round(s*(r/i)),u).then(function(){return h(t,!1)})).then(function(){return Re(t,a)})}}var vi={mixins:[pi,mi],props:{targets:String,active:null,collapsible:Boolean,multiple:Boolean,toggle:String,content:String,transition:String,offset:Number},data:{targets:"> *",active:!1,animation:[!0],collapsible:!0,multiple:!1,clsOpen:"uk-open",toggle:"> .uk-accordion-title",content:"> .uk-accordion-content",transition:"ease",offset:0},computed:{items:{get:function(t,e){return Me(t.targets,e)},watch:function(t,e){var n=this;t.forEach(function(t){return wi(Ne(n.content,t),!He(t,n.clsOpen))}),e||He(t,this.clsOpen)||(t=!1!==this.active&&t[Number(this.active)]||!this.collapsible&&t[0])&&this.toggle(t,!1)},immediate:!0}},events:[{name:"click",delegate:function(){return this.targets+" "+this.$props.toggle},handler:function(t){t.preventDefault(),this.toggle(me(Me(this.targets+" "+this.$props.toggle,this.$el),t.current))}}],methods:{toggle:function(t,r){var o=this,e=[this.items[ge(t,this.items)]],t=Rt(this.items,"."+this.clsOpen);this.multiple||b(t,e[0])||(e=e.concat(t)),!this.collapsible&&t.length<2&&!Rt(e,":not(."+this.clsOpen+")").length||e.forEach(function(t){return o.toggleElement(t,!He(t,o.clsOpen),function(e,n){Le(e,o.clsOpen,n);var i=Ne((e._wrapper?"> * ":"")+o.content,e);if(!1!==r&&o.hasTransition)return e._wrapper||(e._wrapper=Ie(i,"<div"+(n?" hidden":"")+">")),wi(i,!1),gi(o)(e._wrapper,n).then(function(){var t;wi(i,!n),delete e._wrapper,Te(i),n&&(Rn(t=Ne(o.$props.toggle,e))||Un(t,{offset:o.offset}))});wi(i,!n)})})}}};function wi(t,e){t&&(t.hidden=e)}var bi={mixins:[pi,mi],args:"animation",props:{close:String},data:{animation:[!0],selClose:".uk-alert-close",duration:150,hideProps:G({opacity:0},mi.data.hideProps)},events:[{name:"click",delegate:function(){return this.selClose},handler:function(t){t.preventDefault(),this.close()}}],methods:{close:function(){var t=this;this.toggleElement(this.$el).then(function(){return t.$destroy(!0)})}}},xi={args:"autoplay",props:{automute:Boolean,autoplay:Boolean},data:{automute:!1,autoplay:!0},computed:{inView:function(t){return"inview"===t.autoplay}},connected:function(){this.inView&&!st(this.$el,"preload")&&(this.$el.preload="none"),this.automute&&Bn(this.$el)},update:{read:function(){return{visible:Ft(this.$el)&&"hidden"!==Re(this.$el,"visibility"),inView:this.inView&&Rn(this.$el)}},write:function(t){var e=t.visible,t=t.inView;!e||this.inView&&!t?Dn(this.$el):(!0===this.autoplay||this.inView&&t)&&zn(this.$el)},events:["resize","scroll"]}},yi={mixins:[pi,xi],props:{width:Number,height:Number},data:{automute:!0},update:{read:function(){var t=this.$el,e=function(t){for(;t=Pt(t);)if("static"!==Re(t,"position"))return t}(t)||t.parentNode,n=e.offsetHeight,e=e.offsetWidth,n=rt.cover({width:this.width||t.naturalWidth||t.videoWidth||t.clientWidth,height:this.height||t.naturalHeight||t.videoHeight||t.clientHeight},{width:e+(e%2?1:0),height:n+(n%2?1:0)});return!(!n.width||!n.height)&&n},write:function(t){var e=t.height,t=t.width;Re(this.$el,{height:e,width:t})},events:["resize"]}};var ki,$i={props:{pos:String,offset:null,flip:Boolean,clsPos:String},data:{pos:"bottom-"+(lt?"right":"left"),flip:!0,offset:!1,clsPos:""},computed:{pos:function(t){t=t.pos;return(t+(b(t,"-")?"":"-center")).split("-")},dir:function(){return this.pos[0]},align:function(){return this.pos[1]}},methods:{positionAt:function(t,e,n){var i;Pe(t,this.clsPos+"-(top|bottom|left|right)(-[a-z]+)?");var r=this.offset,o=this.getAxis();P(r)||(r=(i=Ne(r))?an(i)["x"===o?"left":"top"]-an(e)["x"===o?"right":"bottom"]:0);r=sn(t,e,"x"===o?wn(this.dir)+" "+this.align:this.align+" "+wn(this.dir),"x"===o?this.dir+" "+this.align:this.align+" "+this.dir,"x"===o?""+("left"===this.dir?-r:r):" "+("top"===this.dir?-r:r),null,this.flip,n).target,n=r.x,r=r.y;this.dir="x"===o?n:r,this.align="x"===o?r:n,Le(t,this.clsPos+"-"+this.dir+"-"+this.align,!1===this.offset)},getAxis:function(){return"top"===this.dir||"bottom"===this.dir?"y":"x"}}},Ii={mixins:[$i,mi],args:"pos",props:{mode:"list",toggle:Boolean,boundary:Boolean,boundaryAlign:Boolean,delayShow:Number,delayHide:Number,clsDrop:String},data:{mode:["click","hover"],toggle:"- *",boundary:ut&&window,boundaryAlign:!1,delayShow:0,delayHide:800,clsDrop:!1,animation:["uk-animation-fade"],cls:"uk-open"},computed:{boundary:function(t,e){return yt(t.boundary,e)},clsDrop:function(t){return t.clsDrop||"uk-"+this.$options.name},clsPos:function(){return this.clsDrop}},created:function(){this.tracker=new En},connected:function(){De(this.$el,this.clsDrop);var t=this.$props.toggle;this.toggle=t&&this.$create("toggle",yt(t,this.$el),{target:this.$el,mode:this.mode}),this.toggle||Kt(this.$el,"updatearia")},disconnected:function(){this.isActive()&&(ki=null)},events:[{name:"click",delegate:function(){return"."+this.clsDrop+"-close"},handler:function(t){t.preventDefault(),this.hide(!1)}},{name:"click",delegate:function(){return'a[href^="#"]'},handler:function(t){var e=t.defaultPrevented,t=t.current.hash;e||!t||qt(t,this.$el)||this.hide(!1)}},{name:"beforescroll",handler:function(){this.hide(!1)}},{name:"toggle",self:!0,handler:function(t,e){t.preventDefault(),this.isToggled()?this.hide(!1):this.show(e,!1)}},{name:"toggleshow",self:!0,handler:function(t,e){t.preventDefault(),this.show(e)}},{name:"togglehide",self:!0,handler:function(t){t.preventDefault(),this.hide()}},{name:wt,filter:function(){return b(this.mode,"hover")},handler:function(t){re(t)||this.clearTimers()}},{name:bt,filter:function(){return b(this.mode,"hover")},handler:function(t){!re(t)&&t.relatedTarget&&this.hide()}},{name:"toggled",self:!0,handler:function(){this.isToggled()&&(this.clearTimers(),this.position())}},{name:"show",self:!0,handler:function(){var r=this;(ki=this).tracker.init(),Kt(this.$el,"updatearia"),Jt(this.$el,"hide",Xt(document,mt,function(t){var i=t.target;return!qt(i,r.$el)&&Jt(document,vt+" "+xt+" scroll",function(t){var e=t.defaultPrevented,n=t.type,t=t.target;e||n!==vt||i!==t||r.toggle&&qt(i,r.toggle.$el)||r.hide(!1)},!0)}),{self:!0}),Jt(this.$el,"hide",Xt(document,"keydown",function(t){27===t.keyCode&&(t.preventDefault(),r.hide(!1))}),{self:!0})}},{name:"beforehide",self:!0,handler:function(){this.clearTimers()}},{name:"hide",handler:function(t){t=t.target;this.$el===t?(ki=this.isActive()?null:ki,Kt(this.$el,"updatearia"),this.tracker.cancel()):ki=null===ki&&qt(t,this.$el)&&this.isToggled()?this:ki}},{name:"updatearia",self:!0,handler:function(t,e){t.preventDefault(),this.updateAria(this.$el),(e||this.toggle)&&(ot((e||this.toggle).$el,"aria-expanded",this.isToggled()),Le(this.toggle.$el,this.cls,this.isToggled()))}}],update:{write:function(){this.isToggled()&&!rn.inProgress(this.$el)&&this.position()},events:["resize"]},methods:{show:function(t,e){var n,i=this;if(void 0===t&&(t=this.toggle),void 0===e&&(e=!0),this.isToggled()&&t&&this.toggle&&t.$el!==this.toggle.$el&&this.hide(!1),this.toggle=t,this.clearTimers(),!this.isActive()){if(ki){if(e&&ki.isDelaying)return void(this.showTimer=setTimeout(this.show,10));for(;ki&&n!==ki&&!qt(this.$el,ki.$el);)(n=ki).hide(!1)}this.showTimer=setTimeout(function(){return!i.isToggled()&&i.toggleElement(i.$el,!0)},e&&this.delayShow||0)}},hide:function(t){var e=this;void 0===t&&(t=!0);function n(){return e.toggleElement(e.$el,!1,!1)}var i,r;this.clearTimers(),this.isDelaying=(i=this.$el,r=[],Ae(i,function(t){return"static"!==Re(t,"position")&&r.push(t)}),r.some(function(t){return e.tracker.movesTo(t)})),t&&this.isDelaying?this.hideTimer=setTimeout(this.hide,50):t&&this.delayHide?this.hideTimer=setTimeout(n,this.delayHide):n()},clearTimers:function(){clearTimeout(this.showTimer),clearTimeout(this.hideTimer),this.showTimer=null,this.hideTimer=null,this.isDelaying=!1},isActive:function(){return ki===this},position:function(){Be(this.$el,this.clsDrop+"-stack"),Le(this.$el,this.clsDrop+"-boundary",this.boundaryAlign);var t,e=an(this.boundary),n=this.boundaryAlign?e:an(this.toggle.$el);"justify"===this.align?(t="y"===this.getAxis()?"width":"height",Re(this.$el,t,n[t])):this.$el.offsetWidth>Math.max(e.right-n.left,n.right-e.left)&&De(this.$el,this.clsDrop+"-stack"),this.positionAt(this.$el,this.boundaryAlign?this.boundary:this.toggle.$el,this.boundary)}}};var Si={mixins:[pi],args:"target",props:{target:Boolean},data:{target:!1},computed:{input:function(t,e){return Ne(Wt,e)},state:function(){return this.input.nextElementSibling},target:function(t,e){t=t.target;return t&&(!0===t&&this.input.parentNode===e&&this.input.nextElementSibling||yt(t,e))}},update:function(){var t,e,n=this.target,i=this.input;!n||n[e=Vt(n)?"value":"textContent"]!==(i=i.files&&i.files[0]?i.files[0].name:zt(i,"select")&&(t=Me("option",i).filter(function(t){return t.selected})[0])?t.textContent:i.value)&&(n[e]=i)},events:[{name:"change",handler:function(){this.$update()}},{name:"reset",el:function(){return Bt(this.$el,"form")},handler:function(){this.$update()}}]},Ti={update:{read:function(t){var e=Rn(this.$el);if(!e||t.isInView===e)return!1;t.isInView=e},write:function(){this.$el.src=""+this.$el.src},events:["scroll","resize"]}},Ei={props:{margin:String,firstColumn:Boolean},data:{margin:"uk-margin-small-top",firstColumn:"uk-first-column"},update:{read:function(){var n,t=_i(this.$el.children);return{rows:t,columns:(n=[[]],t.forEach(function(t){return Ci(t,"left","right").forEach(function(t,e){return n[e]=n[e]?n[e].concat(t):t})}),lt?n.reverse():n)}},write:function(t){var n=this,i=t.columns;t.rows.forEach(function(t,e){return t.forEach(function(t){Le(t,n.margin,0!==e),Le(t,n.firstColumn,b(i[0],t))})})},events:["resize"]}};function _i(t){return Ci(t,"top","bottom")}function Ci(t,e,n){for(var i=[[]],r=0;r<t.length;r++){var o=t[r];if(Ft(o))for(var s=Ai(o),a=i.length-1;0<=a;a--){var c=i[a];if(!c[0]){c.push(o);break}var u=void 0,u=c[0].offsetParent===o.offsetParent?Ai(c[0]):(s=Ai(o,!0),Ai(c[0],!0));if(s[e]>=u[n]-1&&s[e]!==u[e]){i.push([o]);break}if(s[n]-1>u[e]||s[e]===u[e]){c.push(o);break}if(0===a){i.unshift([o]);break}}}return i}function Ai(t,e){void 0===e&&(e=!1);var n=t.offsetTop,i=t.offsetLeft,r=t.offsetHeight,o=t.offsetWidth;return e&&(n=(t=hn(t))[0],i=t[1]),{top:n,left:i,bottom:n+r,right:i+o}}var Ni={extends:Ei,mixins:[pi],name:"grid",props:{masonry:Boolean,parallax:Number},data:{margin:"uk-grid-margin",clsStack:"uk-grid-stack",masonry:!1,parallax:0},connected:function(){this.masonry&&De(this.$el,"uk-flex-top uk-flex-wrap-top")},update:[{write:function(t){t=t.columns;Le(this.$el,this.clsStack,t.length<2)},events:["resize"]},{read:function(t){var e=t.columns,n=t.rows,i=Yt(this.$el);if(!i.length||!this.masonry&&!this.parallax)return!1;var r,o,s=i.some(Qe.inProgress),a=!1,c=e.map(function(t){return t.reduce(function(t,e){return t+e.offsetHeight},0)}),u=(t=i,r=this.margin,F((i=t.filter(function(t){return He(t,r)})[0])?Re(i,"marginTop"):Re(t[0],"paddingLeft"))*(n.length-1)),h=Math.max.apply(Math,c)+u;this.masonry&&(e=e.map(function(t){return Z(t,"offsetTop")}),t=e,o=n.map(function(t){return Math.max.apply(Math,t.map(function(t){return t.offsetHeight}))}),a=t.map(function(n){var i=0;return n.map(function(t,e){return i+=e?o[e-1]-n[e-1].offsetHeight:0})}));var l=Math.abs(this.parallax);return{padding:l=l&&c.reduce(function(t,e,n){return Math.max(t,e+u+(n%2?l:l/8)-h)},0),columns:e,translates:a,height:!s&&(this.masonry?h:"")}},write:function(t){var e=t.height,t=t.padding;Re(this.$el,"paddingBottom",t||""),!1!==e&&Re(this.$el,"height",e)},events:["resize"]},{read:function(t){t=t.height;return{scrolled:!!this.parallax&&Yn(this.$el,t?t-ln(this.$el):0)*Math.abs(this.parallax)}},write:function(t){var e=t.columns,i=t.scrolled,r=t.translates;!1===i&&!r||e.forEach(function(t,n){return t.forEach(function(t,e){return Re(t,"transform",i||r?"translateY("+((r&&-r[n][e])+(i?n%2?i:i/8:0))+"px)":"")})})},events:["scroll","resize"]}]};var Mi=ht?{props:{selMinHeight:String},data:{selMinHeight:!1,forceHeight:!1},computed:{elements:function(t,e){t=t.selMinHeight;return t?Me(t,e):[e]}},update:[{read:function(){Re(this.elements,"height","")},order:-5,events:["resize"]},{write:function(){var n=this;this.elements.forEach(function(t){var e=F(Re(t,"minHeight"));e&&(n.forceHeight||Math.round(e+pn(t,"height","content-box"))>=t.offsetHeight)&&Re(t,"height",e)})},order:5,events:["resize"]}]}:{},zi={mixins:[Mi],args:"target",props:{target:String,row:Boolean},data:{target:"> *",row:!0,forceHeight:!0},computed:{elements:function(t,e){return Me(t.target,e)}},update:{read:function(){return{rows:(this.row?_i(this.elements):[this.elements]).map(Di)}},write:function(t){t.rows.forEach(function(t){var n=t.heights;return t.elements.forEach(function(t,e){return Re(t,"minHeight",n[e])})})},events:["resize"]}};function Di(t){if(t.length<2)return{heights:[""],elements:t};var e=Bi(t),n=e.heights,i=e.max,r=t.some(function(t){return t.style.minHeight}),e=t.some(function(t,e){return!t.style.minHeight&&n[e]<i});return r&&e&&(Re(t,"minHeight",""),e=Bi(t),n=e.heights,i=e.max),{heights:n=t.map(function(t,e){return n[e]===i&&F(t.style.minHeight).toFixed(2)!==i.toFixed(2)?"":i}),elements:t}}function Bi(t){t=t.map(function(t){return an(t).height-pn(t,"height","content-box")});return{heights:t,max:Math.max.apply(null,t)}}var Pi={mixins:[Mi],props:{expand:Boolean,offsetTop:Boolean,offsetBottom:Boolean,minHeight:Number},data:{expand:!1,offsetTop:!1,offsetBottom:!1,minHeight:0},update:{read:function(t){var e=t.minHeight;if(!Ft(this.$el))return!1;var n="",i=pn(this.$el,"height","content-box");if(this.expand){if(this.$el.dataset.heightExpand="",Ne("[data-height-expand]")!==this.$el)return!1;n=ln(window)-(Oi(document.documentElement)-Oi(this.$el))-i||""}else{n="calc(100vh";this.offsetTop&&(n+=0<(t=an(this.$el).top)&&t<ln(window)/2?" - "+t+"px":""),!0===this.offsetBottom?n+=" - "+Oi(this.$el.nextElementSibling)+"px":P(this.offsetBottom)?n+=" - "+this.offsetBottom+"vh":this.offsetBottom&&u(this.offsetBottom,"px")?n+=" - "+F(this.offsetBottom)+"px":D(this.offsetBottom)&&(n+=" - "+Oi(yt(this.offsetBottom,this.$el))+"px"),n+=(i?" - "+i+"px":"")+")"}return{minHeight:n,prev:e}},write:function(t){var e=t.minHeight,t=t.prev;Re(this.$el,{minHeight:e}),e!==t&&this.$update(this.$el,"resize"),this.minHeight&&F(Re(this.$el,"minHeight"))<this.minHeight&&Re(this.$el,"minHeight",this.minHeight)},events:["resize"]}};function Oi(t){return t&&an(t).height||0}var Hi={args:"src",props:{id:Boolean,icon:String,src:String,style:String,width:Number,height:Number,ratio:Number,class:String,strokeAnimation:Boolean,focusable:Boolean,attributes:"list"},data:{ratio:1,include:["style","class","focusable"],class:"",strokeAnimation:!1},beforeConnect:function(){this.class+=" uk-svg"},connected:function(){var t,e=this;!this.icon&&b(this.src,"#")&&(t=this.src.split("#"),this.src=t[0],this.icon=t[1]),this.svg=this.getSvg().then(function(t){return e.applyAttributes(t),e.svgEl=function(t,e){if(jt(e)||"CANVAS"===e.tagName){e.hidden=!0;var n=e.nextElementSibling;return Vi(t,n)?n:ye(e,t)}n=e.lastElementChild;return Vi(t,n)?n:be(e,t)}(t,e.$el)},et)},disconnected:function(){var e=this;jt(this.$el)&&(this.$el.hidden=!1),this.svg&&this.svg.then(function(t){return(!e._connected||t!==e.svgEl)&&$e(t)},et),this.svg=this.svgEl=null},update:{read:function(){return!!(this.strokeAnimation&&this.svgEl&&Ft(this.svgEl))},write:function(){var t,e;t=this.svgEl,(e=Wi(t))&&t.style.setProperty("--uk-animation-stroke",e)},type:["resize"]},methods:{getSvg:function(){var e=this;return function(n){if(Li[n])return Li[n];return Li[n]=new ae(function(e,t){n?g(n,"data:")?e(decodeURIComponent(n.split(",")[1])):de(n).then(function(t){return e(t.response)},function(){return t("SVG not found.")}):t()})}(this.src).then(function(t){return function(t,e){e&&b(t,"<symbol")&&(t=function(t,e){if(!Fi[t]){var n;for(Fi[t]={},ji.lastIndex=0;n=ji.exec(t);)Fi[t][n[3]]='<svg xmlns="http://www.w3.org/2000/svg"'+n[1]+"svg>"}return Fi[t][e]}(t,e)||t);return(t=Ne(t.substr(t.indexOf("<svg"))))&&t.hasChildNodes()&&t}(t,e.icon)||ae.reject("SVG not found.")})},applyAttributes:function(n){var t,e,i=this;for(t in this.$options.props)this[t]&&b(this.include,t)&&ot(n,t,this[t]);for(e in this.attributes){var r=this.attributes[e].split(":",2),o=r[0],r=r[1];ot(n,o,r)}this.id||at(n,"id");var s=["width","height"],a=[this.width,this.height];a.some(function(t){return t})||(a=s.map(function(t){return ot(n,t)}));var c=ot(n,"viewBox");c&&!a.some(function(t){return t})&&(a=c.split(" ").slice(2)),a.forEach(function(t,e){(t=(0|t)*i.ratio)&&ot(n,s[e],t),t&&!a[1^e]&&at(n,s[1^e])}),ot(n,"data-svg",this.icon||this.src)}}},Li={};var ji=/<symbol([^]*?id=(['"])(.+?)\2[^]*?<\/)symbol>/g,Fi={};function Wi(t){return Math.ceil(Math.max.apply(Math,[0].concat(Me("[stroke]",t).map(function(t){try{return t.getTotalLength()}catch(t){return 0}}))))}function Vi(t,e){return ot(t,"data-svg")===ot(e,"data-svg")}var Ri={spinner:'<svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" cx="15" cy="15" r="14"/></svg>',totop:'<svg width="18" height="10" viewBox="0 0 18 10" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.2" points="1 9 9 1 17 9 "/></svg>',marker:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="9" y="4" width="1" height="11"/><rect x="4" y="9" width="11" height="1"/></svg>',"close-icon":'<svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg"><line fill="none" stroke="#000" stroke-width="1.1" x1="1" y1="1" x2="13" y2="13"/><line fill="none" stroke="#000" stroke-width="1.1" x1="13" y1="1" x2="1" y2="13"/></svg>',"close-large":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><line fill="none" stroke="#000" stroke-width="1.4" x1="1" y1="1" x2="19" y2="19"/><line fill="none" stroke="#000" stroke-width="1.4" x1="19" y1="1" x2="1" y2="19"/></svg>',"navbar-toggle-icon":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect y="9" width="20" height="2"/><rect y="3" width="20" height="2"/><rect y="15" width="20" height="2"/></svg>',"overlay-icon":'<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><rect x="19" y="0" width="1" height="40"/><rect x="0" y="19" width="40" height="1"/></svg>',"pagination-next":'<svg width="7" height="12" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.2" points="1 1 6 6 1 11"/></svg>',"pagination-previous":'<svg width="7" height="12" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.2" points="6 1 1 6 6 11"/></svg>',"search-icon":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.1" cx="9" cy="9" r="7"/><path fill="none" stroke="#000" stroke-width="1.1" d="M14,14 L18,18 L14,14 Z"/></svg>',"search-large":'<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.8" cx="17.5" cy="17.5" r="16.5"/><line fill="none" stroke="#000" stroke-width="1.8" x1="38" y1="39" x2="29" y2="30"/></svg>',"search-navbar":'<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.1" cx="10.5" cy="10.5" r="9.5"/><line fill="none" stroke="#000" stroke-width="1.1" x1="23" y1="23" x2="17" y2="17"/></svg>',"slidenav-next":'<svg width="14px" height="24px" viewBox="0 0 14 24" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.4" points="1.225,23 12.775,12 1.225,1 "/></svg>',"slidenav-next-large":'<svg width="25px" height="40px" viewBox="0 0 25 40" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="2" points="4.002,38.547 22.527,20.024 4,1.5 "/></svg>',"slidenav-previous":'<svg width="14px" height="24px" viewBox="0 0 14 24" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.4" points="12.775,1 1.225,12 12.775,23 "/></svg>',"slidenav-previous-large":'<svg width="25px" height="40px" viewBox="0 0 25 40" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="2" points="20.527,1.5 2,20.024 20.525,38.547 "/></svg>'},qi={install:function(r){r.icon.add=function(t,e){var n,i=D(t)?((n={})[t]=e,n):t;K(i,function(t,e){Ri[e]=t,delete Ki[e]}),r._initialized&&Ae(document.body,function(t){return K(r.getComponents(t),function(t){t.$options.isIcon&&t.icon in i&&t.$reset()})})}},extends:Hi,args:"icon",props:["icon"],data:{include:["focusable"]},isIcon:!0,beforeConnect:function(){De(this.$el,"uk-icon")},methods:{getSvg:function(){var t=function(t){if(!Ri[t])return null;Ki[t]||(Ki[t]=Ne((Ri[function(t){return lt?X(X(t,"left","right"),"previous","next"):t}(t)]||Ri[t]).trim()));return Ki[t].cloneNode(!0)}(this.icon);return t?ae.resolve(t):ae.reject("Icon not found.")}}},Ui={args:!1,extends:qi,data:function(t){return{icon:d(t.constructor.options.name)}},beforeConnect:function(){De(this.$el,this.$name)}},Yi={extends:Ui,beforeConnect:function(){De(this.$el,"uk-slidenav")},computed:{icon:function(t,e){t=t.icon;return He(e,"uk-slidenav-large")?t+"-large":t}}},Xi={extends:Ui,computed:{icon:function(t,e){t=t.icon;return He(e,"uk-search-icon")&&Ut(e,".uk-search-large").length?"search-large":Ut(e,".uk-search-navbar").length?"search-navbar":t}}},Gi={extends:Ui,computed:{icon:function(){return"close-"+(He(this.$el,"uk-close-large")?"large":"icon")}}},Ji={extends:Ui,connected:function(){var e=this;this.svg.then(function(t){return 1!==e.ratio&&Re(Ne("circle",t),"strokeWidth",1/e.ratio)},et)}},Ki={};var Zi={args:"dataSrc",props:{dataSrc:String,dataSrcset:Boolean,sizes:String,width:Number,height:Number,offsetTop:String,offsetLeft:String,target:String},data:{dataSrc:"",dataSrcset:!1,sizes:!1,width:!1,height:!1,offsetTop:"50vh",offsetLeft:"50vw",target:!1},computed:{cacheKey:function(t){t=t.dataSrc;return this.$name+"."+t},width:function(t){var e=t.width,t=t.dataWidth;return e||t},height:function(t){var e=t.height,t=t.dataHeight;return e||t},sizes:function(t){var e=t.sizes,t=t.dataSizes;return e||t},isImg:function(t,e){return or(e)},target:{get:function(t){t=t.target;return[this.$el].concat(kt(t,this.$el))},watch:function(){this.observe()}},offsetTop:function(t){return bn(t.offsetTop,"height")},offsetLeft:function(t){return bn(t.offsetLeft,"width")}},connected:function(){ar[this.cacheKey]?Qi(this.$el,ar[this.cacheKey],this.dataSrcset,this.sizes):this.isImg&&this.width&&this.height&&Qi(this.$el,function(t,e,n){n&&(n=rt.ratio({width:t,height:e},"width",bn(er(n))),t=n.width,e=n.height);return'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="'+t+'" height="'+e+'"></svg>'}(this.width,this.height,this.sizes)),this.observer=new Zn(this.load,{rootMargin:this.offsetTop+"px "+this.offsetLeft+"px"}),requestAnimationFrame(this.observe)},disconnected:function(){this.observer.disconnect()},update:{read:function(t){var e=this,t=t.image;if(t||"complete"!==document.readyState||this.load(this.observer.takeRecords()),this.isImg)return!1;t&&t.then(function(t){return t&&""!==t.currentSrc&&Qi(e.$el,sr(t))})},write:function(t){var e,n,i;this.dataSrcset&&1!==window.devicePixelRatio&&(!(n=Re(this.$el,"backgroundSize")).match(/^(auto\s?)+$/)&&F(n)!==t.bgSize||(t.bgSize=(e=this.dataSrcset,n=this.sizes,i=bn(er(n)),(e=(e.match(rr)||[]).map(F).sort(function(t,e){return t-e})).filter(function(t){return i<=t})[0]||e.pop()||""),Re(this.$el,"backgroundSize",t.bgSize+"px")))},events:["resize"]},methods:{load:function(t){var e=this;t.some(function(t){return H(t.isIntersecting)||t.isIntersecting})&&(this._data.image=fe(this.dataSrc,this.dataSrcset,this.sizes).then(function(t){return Qi(e.$el,sr(t),t.srcset,t.sizes),ar[e.cacheKey]=sr(t),t},function(t){return Kt(e.$el,new t.constructor(t.type,t))}),this.observer.disconnect())},observe:function(){var e=this;this._connected&&!this._data.image&&this.target.forEach(function(t){return e.observer.observe(t)})}}};function Qi(t,e,n,i){or(t)?(i&&(t.sizes=i),n&&(t.srcset=n),e&&(t.src=e)):e&&!b(t.style.backgroundImage,e)&&(Re(t,"backgroundImage","url("+Ht(e)+")"),Kt(t,Zt("load",!1)))}var tr=/\s*(.*?)\s*(\w+|calc\(.*?\))\s*(?:,|$)/g;function er(t){var e,n;for(tr.lastIndex=0;e=tr.exec(t);)if(!e[1]||window.matchMedia(e[1]).matches){e=g(n=e[2],"calc")?n.slice(5,-1).replace(nr,function(t){return bn(t)}).replace(/ /g,"").match(ir).reduce(function(t,e){return t+ +e},0):n;break}return e||"100vw"}var nr=/\d+(?:\w+|%)/g,ir=/[+-]?(\d+)/g;var rr=/\s+\d+w\s*(?:,|$)/g;function or(t){return"IMG"===t.tagName}function sr(t){return t.currentSrc||t.src}var ar,cr="__test__";try{(ar=window.sessionStorage||{})[cr]=1,delete ar[cr]}catch(t){ar={}}var ur={props:{media:Boolean},data:{media:!1},computed:{matchMedia:function(){var t=function(t){if(D(t))if("@"===t[0])t=F(Xe("breakpoint-"+t.substr(1)));else if(isNaN(t))return t;return!(!t||isNaN(t))&&"(min-width: "+t+"px)"}(this.media);return!t||window.matchMedia(t).matches}}};var hr={mixins:[pi,ur],props:{fill:String},data:{fill:"",clsWrapper:"uk-leader-fill",clsHide:"uk-leader-hide",attrFill:"data-fill"},computed:{fill:function(t){return t.fill||Xe("leader-fill-content")}},connected:function(){var t=Se(this.$el,'<span class="'+this.clsWrapper+'">');this.wrapper=t[0]},disconnected:function(){Te(this.wrapper.childNodes)},update:{read:function(t){var e=t.changed,n=t.width,t=n;return{width:n=Math.floor(this.$el.offsetWidth/2),fill:this.fill,changed:e||t!==n,hide:!this.matchMedia}},write:function(t){Le(this.wrapper,this.clsHide,t.hide),t.changed&&(t.changed=!1,ot(this.wrapper,this.attrFill,new Array(t.width).join(t.fill)))},events:["resize"]}},lr={props:{container:Boolean},data:{container:!0},computed:{container:function(t){t=t.container;return!0===t&&this.$container||t&&Ne(t)}}},dr=[],fr={mixins:[pi,lr,mi],props:{selPanel:String,selClose:String,escClose:Boolean,bgClose:Boolean,stack:Boolean},data:{cls:"uk-open",escClose:!0,bgClose:!0,overlay:!0,stack:!1},computed:{panel:function(t,e){return Ne(t.selPanel,e)},transitionElement:function(){return this.panel},bgClose:function(t){return t.bgClose&&this.panel}},beforeDisconnect:function(){this.isToggled()&&this.toggleElement(this.$el,!1,!1)},events:[{name:"click",delegate:function(){return this.selClose},handler:function(t){t.preventDefault(),this.hide()}},{name:"toggle",self:!0,handler:function(t){t.defaultPrevented||(t.preventDefault(),this.isToggled()===b(dr,this)&&this.toggle())}},{name:"beforeshow",self:!0,handler:function(t){if(b(dr,this))return!1;!this.stack&&dr.length?(ae.all(dr.map(function(t){return t.hide()})).then(this.show),t.preventDefault()):dr.push(this)}},{name:"show",self:!0,handler:function(){var r=this;dn(window)-dn(document)&&this.overlay&&Re(document.body,"overflowY","scroll"),this.stack&&Re(this.$el,"zIndex",F(Re(this.$el,"zIndex"))+dr.length),De(document.documentElement,this.clsPage),this.bgClose&&Jt(this.$el,"hide",Xt(document,mt,function(t){var i=t.target;J(dr)!==r||r.overlay&&!qt(i,r.$el)||qt(i,r.panel)||Jt(document,vt+" "+xt+" scroll",function(t){var e=t.defaultPrevented,n=t.type,t=t.target;e||n!==vt||i!==t||r.hide()},!0)}),{self:!0}),this.escClose&&Jt(this.$el,"hide",Xt(document,"keydown",function(t){27===t.keyCode&&J(dr)===r&&(t.preventDefault(),r.hide())}),{self:!0})}},{name:"hidden",self:!0,handler:function(){var e=this;dr.splice(dr.indexOf(this),1),dr.length||Re(document.body,"overflowY",""),Re(this.$el,"zIndex",""),dr.some(function(t){return t.clsPage===e.clsPage})||Be(document.documentElement,this.clsPage)}}],methods:{toggle:function(){return this.isToggled()?this.hide():this.show()},show:function(){var e=this;return this.container&&this.$el.parentNode!==this.container?(be(this.container,this.$el),new ae(function(t){return requestAnimationFrame(function(){return e.show().then(t)})})):this.toggleElement(this.$el,!0,pr(this))},hide:function(){return this.toggleElement(this.$el,!1,pr(this))}}};function pr(t){var s=t.transitionElement,a=t._toggle;return function(r,o){return new ae(function(n,i){return Jt(r,"show hide",function(){r._reject&&r._reject(),r._reject=i,a(r,o);var t=Jt(s,"transitionstart",function(){Jt(s,"transitionend transitioncancel",n,{self:!0}),clearTimeout(e)},{self:!0}),e=setTimeout(function(){t(),n()},U(Re(s,"transitionDuration")))})})}}var mr={install:function(t){var a=t.modal;function i(t,e,n,i){e=G({bgClose:!1,escClose:!0,labels:a.labels},e);var r=a.dialog(t(e),e),o=new se,s=!1;return Xt(r.$el,"submit","form",function(t){t.preventDefault(),o.resolve(i&&i(r)),s=!0,r.hide()}),Xt(r.$el,"hide",function(){return!s&&n(o)}),o.promise.dialog=r,o.promise}a.dialog=function(t,e){var n=a('<div class="uk-modal"> <div class="uk-modal-dialog">'+t+"</div> </div>",e);return n.show(),Xt(n.$el,"hidden",function(){return ae.resolve().then(function(){return n.$destroy(!0)})},{self:!0}),n},a.alert=function(e,t){return i(function(t){t=t.labels;return'<div class="uk-modal-body">'+(D(e)?e:we(e))+'</div> <div class="uk-modal-footer uk-text-right"> <button class="uk-button uk-button-primary uk-modal-close" autofocus>'+t.ok+"</button> </div>"},t,function(t){return t.resolve()})},a.confirm=function(e,t){return i(function(t){t=t.labels;return'<form> <div class="uk-modal-body">'+(D(e)?e:we(e))+'</div> <div class="uk-modal-footer uk-text-right"> <button class="uk-button uk-button-default uk-modal-close" type="button">'+t.cancel+'</button> <button class="uk-button uk-button-primary" autofocus>'+t.ok+"</button> </div> </form>"},t,function(t){return t.reject()})},a.prompt=function(e,n,t){return i(function(t){t=t.labels;return'<form class="uk-form-stacked"> <div class="uk-modal-body"> <label>'+(D(e)?e:we(e))+'</label> <input class="uk-input" value="'+(n||"")+'" autofocus> </div> <div class="uk-modal-footer uk-text-right"> <button class="uk-button uk-button-default uk-modal-close" type="button">'+t.cancel+'</button> <button class="uk-button uk-button-primary">'+t.ok+"</button> </div> </form>"},t,function(t){return t.resolve(null)},function(t){return Ne("input",t.$el).value})},a.labels={ok:"Ok",cancel:"Cancel"}},mixins:[fr],data:{clsPage:"uk-modal-page",selPanel:".uk-modal-dialog",selClose:".uk-modal-close, .uk-modal-close-default, .uk-modal-close-outside, .uk-modal-close-full"},events:[{name:"show",self:!0,handler:function(){He(this.panel,"uk-margin-auto-vertical")?De(this.$el,"uk-flex"):Re(this.$el,"display","block"),ln(this.$el)}},{name:"hidden",self:!0,handler:function(){Re(this.$el,"display",""),Be(this.$el,"uk-flex")}}]};var gr={extends:vi,data:{targets:"> .uk-parent",toggle:"> a",content:"> ul"}},vr={mixins:[pi,Mi],props:{dropdown:String,mode:"list",align:String,offset:Number,boundary:Boolean,boundaryAlign:Boolean,clsDrop:String,delayShow:Number,delayHide:Number,dropbar:Boolean,dropbarMode:String,dropbarAnchor:Boolean,duration:Number},data:{dropdown:".uk-navbar-nav > li",align:lt?"right":"left",clsDrop:"uk-navbar-dropdown",mode:void 0,offset:void 0,delayShow:void 0,delayHide:void 0,boundaryAlign:void 0,flip:"x",boundary:!0,dropbar:!1,dropbarMode:"slide",dropbarAnchor:!1,duration:200,forceHeight:!0,selMinHeight:".uk-navbar-nav > li > a, .uk-navbar-item, .uk-navbar-toggle"},computed:{boundary:function(t,e){var n=t.boundary,t=t.boundaryAlign;return!0===n||t?e:n},dropbarAnchor:function(t,e){return yt(t.dropbarAnchor,e)},pos:function(t){return"bottom-"+t.align},dropbar:{get:function(t){t=t.dropbar;return t?(t=this._dropbar||yt(t,this.$el)||Ne("+ .uk-navbar-dropbar",this.$el))||(this._dropbar=Ne("<div></div>")):null},watch:function(t){De(t,"uk-navbar-dropbar")},immediate:!0},dropdowns:{get:function(t,e){return Me(t.dropdown+" ."+t.clsDrop,e)},watch:function(t){var e=this;this.$create("drop",t.filter(function(t){return!e.getDropdown(t)}),G({},this.$props,{boundary:this.boundary,pos:this.pos,offset:this.dropbar||this.offset}))},immediate:!0}},disconnected:function(){this.dropbar&&$e(this.dropbar),delete this._dropbar},events:[{name:"mouseover",delegate:function(){return this.dropdown},handler:function(t){var e=t.current,t=this.getActive();t&&t.toggle&&!qt(t.toggle.$el,e)&&!t.tracker.movesTo(t.$el)&&t.hide(!1)}},{name:"mouseleave",el:function(){return this.dropbar},handler:function(){var t=this.getActive();t&&!this.dropdowns.some(function(t){return zt(t,":hover")})&&t.hide()}},{name:"beforeshow",capture:!0,filter:function(){return this.dropbar},handler:function(){this.dropbar.parentNode||ye(this.dropbarAnchor||this.$el,this.dropbar)}},{name:"show",filter:function(){return this.dropbar},handler:function(t,e){var n=e.$el,e=e.dir;He(n,this.clsDrop)&&("slide"===this.dropbarMode&&De(this.dropbar,"uk-navbar-dropbar-slide"),this.clsDrop&&De(n,this.clsDrop+"-dropbar"),"bottom"===e&&this.transitionTo(n.offsetHeight+F(Re(n,"marginTop"))+F(Re(n,"marginBottom")),n))}},{name:"beforehide",filter:function(){return this.dropbar},handler:function(t,e){var n=e.$el,e=this.getActive();zt(this.dropbar,":hover")&&e&&e.$el===n&&t.preventDefault()}},{name:"hide",filter:function(){return this.dropbar},handler:function(t,e){var n=e.$el;!He(n,this.clsDrop)||(!(e=this.getActive())||e&&e.$el===n)&&this.transitionTo(0)}}],methods:{getActive:function(){var t=this.dropdowns.map(this.getDropdown).filter(function(t){return t&&t.isActive()})[0];return t&&b(t.mode,"hover")&&qt(t.toggle.$el,this.$el)&&t},transitionTo:function(t,e){var n=this,i=this.dropbar,r=Ft(i)?ln(i):0;return Re(e=r<t&&e,"clip","rect(0,"+e.offsetWidth+"px,"+r+"px,0)"),ln(i,r),Qe.cancel([e,i]),ae.all([Qe.start(i,{height:t},this.duration),Qe.start(e,{clip:"rect(0,"+e.offsetWidth+"px,"+t+"px,0)"},this.duration)]).catch(et).then(function(){Re(e,{clip:""}),n.$update(i)})},getDropdown:function(t){return this.$getComponent(t,"drop")||this.$getComponent(t,"dropdown")}}},wr={mixins:[fr],args:"mode",props:{mode:String,flip:Boolean,overlay:Boolean},data:{mode:"slide",flip:!1,overlay:!1,clsPage:"uk-offcanvas-page",clsContainer:"uk-offcanvas-container",selPanel:".uk-offcanvas-bar",clsFlip:"uk-offcanvas-flip",clsContainerAnimation:"uk-offcanvas-container-animation",clsSidebarAnimation:"uk-offcanvas-bar-animation",clsMode:"uk-offcanvas",clsOverlay:"uk-offcanvas-overlay",selClose:".uk-offcanvas-close",container:!1},computed:{clsFlip:function(t){var e=t.flip,t=t.clsFlip;return e?t:""},clsOverlay:function(t){var e=t.overlay,t=t.clsOverlay;return e?t:""},clsMode:function(t){var e=t.mode;return t.clsMode+"-"+e},clsSidebarAnimation:function(t){var e=t.mode,t=t.clsSidebarAnimation;return"none"===e||"reveal"===e?"":t},clsContainerAnimation:function(t){var e=t.mode,t=t.clsContainerAnimation;return"push"!==e&&"reveal"!==e?"":t},transitionElement:function(t){return"reveal"===t.mode?this.panel.parentNode:this.panel}},events:[{name:"click",delegate:function(){return'a[href^="#"]'},handler:function(t){var e=t.current.hash;!t.defaultPrevented&&e&&Ne(e,document.body)&&this.hide()}},{name:"touchstart",passive:!0,el:function(){return this.panel},handler:function(t){t=t.targetTouches;1===t.length&&(this.clientY=t[0].clientY)}},{name:"touchmove",self:!0,passive:!1,filter:function(){return this.overlay},handler:function(t){t.cancelable&&t.preventDefault()}},{name:"touchmove",passive:!1,el:function(){return this.panel},handler:function(t){var e,n,i,r;1===t.targetTouches.length&&(e=event.targetTouches[0].clientY-this.clientY,n=(r=this.panel).scrollTop,((i=r.scrollHeight)<=(r=r.clientHeight)||0===n&&0<e||i-n<=r&&e<0)&&t.cancelable&&t.preventDefault())}},{name:"show",self:!0,handler:function(){"reveal"!==this.mode||He(this.panel.parentNode,this.clsMode)||(Ie(this.panel,"<div>"),De(this.panel.parentNode,this.clsMode)),Re(document.documentElement,"overflowY",this.overlay?"hidden":""),De(document.body,this.clsContainer,this.clsFlip),Re(document.body,"touch-action","pan-y pinch-zoom"),Re(this.$el,"display","block"),De(this.$el,this.clsOverlay),De(this.panel,this.clsSidebarAnimation,"reveal"!==this.mode?this.clsMode:""),ln(document.body),De(document.body,this.clsContainerAnimation),this.clsContainerAnimation&&(br().content+=",user-scalable=0")}},{name:"hide",self:!0,handler:function(){Be(document.body,this.clsContainerAnimation),Re(document.body,"touch-action","")}},{name:"hidden",self:!0,handler:function(){var t;this.clsContainerAnimation&&((t=br()).content=t.content.replace(/,user-scalable=0$/,"")),"reveal"===this.mode&&Te(this.panel),Be(this.panel,this.clsSidebarAnimation,this.clsMode),Be(this.$el,this.clsOverlay),Re(this.$el,"display",""),Be(document.body,this.clsContainer,this.clsFlip),Re(document.documentElement,"overflowY","")}},{name:"swipeLeft swipeRight",handler:function(t){this.isToggled()&&u(t.type,"Left")^this.flip&&this.hide()}}]};function br(){return Ne('meta[name="viewport"]',document.head)||be(document.head,'<meta name="viewport">')}var xr={mixins:[pi],props:{selContainer:String,selContent:String},data:{selContainer:".uk-modal",selContent:".uk-modal-dialog"},computed:{container:function(t,e){return Bt(e,t.selContainer)},content:function(t,e){return Bt(e,t.selContent)}},connected:function(){Re(this.$el,"minHeight",150)},update:{read:function(){return!(!this.content||!this.container)&&{current:F(Re(this.$el,"maxHeight")),max:Math.max(150,ln(this.container)-(an(this.content).height-ln(this.$el)))}},write:function(t){var e=t.current,t=t.max;Re(this.$el,"maxHeight",t),Math.round(e)!==Math.round(t)&&Kt(this.$el,"resize")},events:["resize"]}},s={props:["width","height"],connected:function(){De(this.$el,"uk-responsive-width")},update:{read:function(){return!!(Ft(this.$el)&&this.width&&this.height)&&{width:dn(this.$el.parentNode),height:this.height}},write:function(t){ln(this.$el,rt.contain({height:this.height,width:this.width},t).height)},events:["resize"]}},m={props:{offset:Number},data:{offset:0},methods:{scrollTo:function(t){var e=this;t=t&&Ne(t)||document.body,Kt(this.$el,"beforescroll",[this,t])&&Un(t,{offset:this.offset}).then(function(){return Kt(e.$el,"scrolled",[e,t])})}},events:{click:function(t){t.defaultPrevented||(t.preventDefault(),this.scrollTo(Ht(decodeURIComponent(this.$el.hash)).substr(1)))}}},yr="_ukScrollspy",t={args:"cls",props:{cls:String,target:String,hidden:Boolean,offsetTop:Number,offsetLeft:Number,repeat:Boolean,delay:Number},data:function(){return{cls:!1,target:!1,hidden:!0,offsetTop:0,offsetLeft:0,repeat:!1,delay:0,inViewClass:"uk-scrollspy-inview"}},computed:{elements:{get:function(t,e){t=t.target;return t?Me(t,e):[e]},watch:function(t){this.hidden&&Re(Rt(t,":not(."+this.inViewClass+")"),"visibility","hidden")},immediate:!0}},update:[{read:function(t){var e=this;t.update&&this.elements.forEach(function(t){t[yr]||(t[yr]={cls:ct(t,"uk-scrollspy-class")||e.cls}),t[yr].show=Rn(t,e.offsetTop,e.offsetLeft)})},write:function(i){var r=this;if(!i.update)return this.$emit(),i.update=!0;this.elements.forEach(function(e){function t(t){Re(e,"visibility",!t&&r.hidden?"hidden":""),Le(e,r.inViewClass,t),Le(e,n.cls),Kt(e,t?"inview":"outview"),n.inview=t,r.$update(e)}var n=e[yr];!n.show||n.inview||n.queued?!n.show&&n.inview&&!n.queued&&r.repeat&&t(!1):(n.queued=!0,i.promise=(i.promise||ae.resolve()).then(function(){return new ae(function(t){return setTimeout(t,r.delay)})}).then(function(){t(!0),setTimeout(function(){n.queued=!1,r.$emit()},300)}))})},events:["scroll","resize"]}]},dt={props:{cls:String,closest:String,scroll:Boolean,overflow:Boolean,offset:Number},data:{cls:"uk-active",closest:!1,scroll:!1,overflow:!0,offset:0},computed:{links:{get:function(t,e){return Me('a[href^="#"]',e).filter(function(t){return t.hash})},watch:function(t){this.scroll&&this.$create("scroll",t,{offset:this.offset||0})},immediate:!0},targets:function(){return Me(this.links.map(function(t){return Ht(t.hash).substr(1)}).join(","))},elements:function(t){t=t.closest;return Bt(this.links,t||"*")}},update:[{read:function(){var n=this,t=this.targets.length;if(!t||!Ft(this.$el))return!1;var e=J(Xn(this.targets[0])),i=e.scrollTop,r=e.scrollHeight,o=Gn(e),r=r-an(o).height,s=!1;return i===r?s=t-1:(this.targets.every(function(t,e){if(un(t,o).top-n.offset<=0)return s=e,!0}),!1===s&&this.overflow&&(s=0)),{active:s}},write:function(t){t=t.active;this.links.forEach(function(t){return t.blur()}),Be(this.elements,this.cls),!1!==t&&Kt(this.$el,"active",[t,De(this.elements[t],this.cls)])},events:["scroll","resize"]}]},ft={mixins:[pi,ur],props:{top:null,bottom:Boolean,offset:String,animation:String,clsActive:String,clsInactive:String,clsFixed:String,clsBelow:String,selTarget:String,widthElement:Boolean,showOnUp:Boolean,targetOffset:Number},data:{top:0,bottom:!1,offset:0,animation:"",clsActive:"uk-active",clsInactive:"",clsFixed:"uk-sticky-fixed",clsBelow:"uk-sticky-below",selTarget:"",widthElement:!1,showOnUp:!1,targetOffset:!1},computed:{offset:function(t){return bn(t.offset)},selTarget:function(t,e){t=t.selTarget;return t&&Ne(t,e)||e},widthElement:function(t,e){return yt(t.widthElement,e)||this.placeholder},isActive:{get:function(){return He(this.selTarget,this.clsActive)},set:function(t){t&&!this.isActive?(Oe(this.selTarget,this.clsInactive,this.clsActive),Kt(this.$el,"active")):t||He(this.selTarget,this.clsInactive)||(Oe(this.selTarget,this.clsActive,this.clsInactive),Kt(this.$el,"inactive"))}}},connected:function(){this.placeholder=Ne("+ .uk-sticky-placeholder",this.$el)||Ne('<div class="uk-sticky-placeholder"></div>'),this.isFixed=!1,this.isActive=!1},disconnected:function(){this.isFixed&&(this.hide(),Be(this.selTarget,this.clsInactive)),$e(this.placeholder),this.placeholder=null,this.widthElement=null},events:[{name:"load hashchange popstate",el:ut&&window,handler:function(){var i,r=this;!1!==this.targetOffset&&location.hash&&0<window.pageYOffset&&((i=Ne(location.hash))&&yn.read(function(){var t=an(i).top,e=an(r.$el).top,n=r.$el.offsetHeight;r.isFixed&&t<=e+n&&e<=t+i.offsetHeight&&qn(window,t-n-(P(r.targetOffset)?r.targetOffset:0)-r.offset)}))}}],update:[{read:function(t,e){t=t.height;if(this.inactive=!this.matchMedia||!Ft(this.$el),this.inactive)return!1;this.isActive&&"update"!==e&&(this.hide(),t=this.$el.offsetHeight,this.show()),t=this.isActive?t:this.$el.offsetHeight,this.topOffset=an(this.isFixed?this.placeholder:this.$el).top,this.bottomOffset=this.topOffset+t;e=kr("bottom",this);return this.top=Math.max(F(kr("top",this)),this.topOffset)-this.offset,this.bottom=e&&e-this.$el.offsetHeight,this.width=an(Ft(this.widthElement)?this.widthElement:this.$el).width,{height:t,top:hn(this.placeholder)[0],margins:Re(this.$el,["marginTop","marginBottom","marginLeft","marginRight"])}},write:function(t){var e=t.height,n=t.margins,t=this.placeholder;Re(t,G({height:e},n)),qt(t,document)||(ye(this.$el,t),t.hidden=!0),this.isActive=!!this.isActive},events:["resize"]},{read:function(t){t=t.scroll;return void 0===t&&(t=0),this.scroll=window.pageYOffset,{dir:t<=this.scroll?"down":"up",scroll:this.scroll}},write:function(t,e){var n=this,i=Date.now(),r=t.initTimestamp;void 0===r&&(r=0);var o=t.dir,s=t.lastDir,a=t.lastScroll,c=t.scroll,u=t.top;(t.lastScroll=c)<0||c===a&&"scroll"===e||this.showOnUp&&"scroll"!==e&&!this.isFixed||((300<i-r||o!==s)&&(t.initScroll=c,t.initTimestamp=i),t.lastDir=o,this.showOnUp&&!this.isFixed&&Math.abs(t.initScroll-c)<=30&&Math.abs(a-c)<=10||(this.inactive||c<this.top||this.showOnUp&&(c<=this.top||"down"===o&&"scroll"===e||"up"===o&&!this.isFixed&&c<=this.bottomOffset)?this.isFixed?(this.isFixed=!1,this.animation&&c>this.topOffset?(rn.cancel(this.$el),rn.out(this.$el,this.animation).then(function(){return n.hide()},et)):this.hide()):rn.inProgress(this.$el)&&c<u&&(rn.cancel(this.$el),this.hide()):this.isFixed?this.update():this.animation?(rn.cancel(this.$el),this.show(),rn.in(this.$el,this.animation).catch(et)):this.show()))},events:["resize","scroll"]}],methods:{show:function(){this.isFixed=!0,this.update(),this.placeholder.hidden=!1},hide:function(){this.isActive=!1,Be(this.$el,this.clsFixed,this.clsBelow),Re(this.$el,{position:"",top:"",width:""}),this.placeholder.hidden=!0},update:function(){var t=0!==this.top||this.scroll>this.top,e=Math.max(0,this.offset);P(this.bottom)&&this.scroll>this.bottom-this.offset&&(e=this.bottom-this.scroll),Re(this.$el,{position:"fixed",top:e+"px",width:this.width}),this.isActive=t,Le(this.$el,this.clsBelow,this.scroll>this.bottomOffset),De(this.$el,this.clsFixed)}}};function kr(t,e){var n=e.$props,i=e.$el,e=e[t+"Offset"],t=n[t];if(t)return D(t)&&t.match(/^-?\d/)?e+bn(t):an(!0===t?i.parentNode:yt(t,i)).bottom}var $r,Ir,Sr,Nt={mixins:[mi],args:"connect",props:{connect:String,toggle:String,active:Number,swiping:Boolean},data:{connect:"~.uk-switcher",toggle:"> * > :first-child",active:0,swiping:!0,cls:"uk-active",clsContainer:"uk-switcher",attrItem:"uk-switcher-item"},computed:{connects:{get:function(t,e){return kt(t.connect,e)},watch:function(t){var e=this;t.forEach(function(t){return e.updateAria(t.children)}),this.swiping&&Re(t,"touch-action","pan-y pinch-zoom")},immediate:!0},toggles:{get:function(t,e){return Me(t.toggle,e).filter(function(t){return!zt(t,".uk-disabled *, .uk-disabled, [disabled]")})},watch:function(t){var e=this.index();this.show(~e&&e||t[this.active]||t[0])},immediate:!0},children:function(){var t=this;return Yt(this.$el).filter(function(e){return t.toggles.some(function(t){return qt(t,e)})})}},events:[{name:"click",delegate:function(){return this.toggle},handler:function(t){b(this.toggles,t.current)&&(t.preventDefault(),this.show(t.current))}},{name:"click",el:function(){return this.connects},delegate:function(){return"["+this.attrItem+"],[data-"+this.attrItem+"]"},handler:function(t){t.preventDefault(),this.show(ct(t.current,this.attrItem))}},{name:"swipeRight swipeLeft",filter:function(){return this.swiping},el:function(){return this.connects},handler:function(t){t=t.type;this.show(u(t,"Left")?"next":"previous")}}],methods:{index:function(){var e=this;return y(this.children,function(t){return He(t,e.cls)})},show:function(t){var n=this,i=this.index(),r=ge(t,this.toggles,i);i!==r&&(this.children.forEach(function(t,e){Le(t,n.cls,r===e),ot(n.toggles[e],"aria-expanded",r===e)}),this.connects.forEach(function(t){var e=t.children;return n.toggleElement(V(e).filter(function(t,e){return e!==r&&n.isToggled(t)}),!1,0<=i).then(function(){return n.toggleElement(e[r],!0,0<=i)})}))}}},le={mixins:[pi],extends:Nt,props:{media:Boolean},data:{media:960,attrItem:"uk-tab-item"},connected:function(){var t=He(this.$el,"uk-tab-left")?"uk-tab-left":!!He(this.$el,"uk-tab-right")&&"uk-tab-right";t&&this.$create("toggle",this.$el,{cls:t,mode:"media",media:this.media})}},Mi={mixins:[ur,mi],args:"target",props:{href:String,target:null,mode:"list",queued:Boolean},data:{href:!1,target:!1,mode:"click",queued:!0},computed:{target:{get:function(t,e){var n=t.href,t=t.target;return(t=kt(t||n,e)).length&&t||[e]},watch:function(){Kt(this.target,"updatearia",[this])},immediate:!0}},events:[{name:wt+" "+bt,filter:function(){return b(this.mode,"hover")},handler:function(t){re(t)||this.toggle("toggle"+(t.type===wt?"show":"hide"))}},{name:"click",filter:function(){return b(this.mode,"click")||pt&&b(this.mode,"hover")},handler:function(t){var e;(Bt(t.target,'a[href="#"], a[href=""]')||(e=Bt(t.target,"a[href]"))&&(this.cls&&!He(this.target,this.cls.split(" ")[0])||!Ft(this.target)||e.hash&&zt(this.target,e.hash)))&&t.preventDefault(),this.toggle()}}],update:{read:function(){return!(!b(this.mode,"media")||!this.media)&&{match:this.matchMedia}},write:function(t){var e=t.match,t=this.isToggled(this.target);(e?!t:t)&&this.toggle()},events:["resize"]},methods:{toggle:function(t){var e,n=this;Kt(this.target,t||"toggle",[this])&&(this.queued?(e=this.target.filter(this.isToggled),this.toggleElement(e,!1).then(function(){return n.toggleElement(n.target.filter(function(t){return!b(e,t)}),!0)})):this.toggleElement(this.target))}}};K(Object.freeze({__proto__:null,Accordion:vi,Alert:bi,Cover:yi,Drop:Ii,Dropdown:Ii,FormCustom:Si,Gif:Ti,Grid:Ni,HeightMatch:zi,HeightViewport:Pi,Icon:qi,Img:Zi,Leader:hr,Margin:Ei,Modal:mr,Nav:gr,Navbar:vr,Offcanvas:wr,OverflowAuto:xr,Responsive:s,Scroll:m,Scrollspy:t,ScrollspyNav:dt,Sticky:ft,Svg:Hi,Switcher:Nt,Tab:le,Toggle:Mi,Video:xi,Close:Gi,Spinner:Ji,SlidenavNext:Yi,SlidenavPrevious:Yi,SearchIcon:Xi,Marker:Ui,NavbarToggleIcon:Ui,OverlayIcon:Ui,PaginationNext:Ui,PaginationPrevious:Ui,Totop:Ui}),function(t,e){return ti.component(e,t)}),ti.use(function(o){ut&&pe(function(){var t;o.update();function e(){t||(t=!0,yn.write(function(){return t=!1}),o.update(null,"resize"))}var n;Xt(window,"load resize",e),Xt(document,"loadedmetadata load",e,!0),"ResizeObserver"in window&&new ResizeObserver(e).observe(document.documentElement),Xt(window,"scroll",function(t){n||(n=!0,yn.write(function(){return n=!1}),o.update(null,t.type))},{passive:!0,capture:!0});var i,r=0;Xt(document,"animationstart",function(t){t=t.target;(Re(t,"animationName")||"").match(/^uk-.*(left|right)/)&&(r++,Re(document.body,"overflowX","hidden"),setTimeout(function(){--r||Re(document.body,"overflowX","")},U(Re(t,"animationDuration"))+100))},!0),Xt(document,mt,function(t){var s,a;i&&i(),re(t)&&(s=oe(t),a="tagName"in t.target?t.target:t.target.parentNode,i=Jt(document,vt+" "+xt,function(t){var t=oe(t),r=t.x,o=t.y;(a&&r&&100<Math.abs(s.x-r)||o&&100<Math.abs(s.y-o))&&setTimeout(function(){var t,e,n,i;Kt(a,"swipe"),Kt(a,"swipe"+(t=s.x,e=s.y,n=r,i=o,Math.abs(t-n)>=Math.abs(e-i)?0<t-n?"Left":"Right":0<e-i?"Up":"Down"))})}))},{passive:!0})})}),Ir=($r=ti).connect,Sr=$r.disconnect,ut&&window.MutationObserver&&yn.read(function(){document.body&&Ae(document.body,Ir);new MutationObserver(function(t){var i=[];t.forEach(function(t){return e=i,n=(t=t).target,void(("attributes"!==t.type?function(t){for(var e=t.addedNodes,n=t.removedNodes,i=0;i<e.length;i++)Ae(e[i],Ir);for(var r=0;r<n.length;r++)Ae(n[r],Sr);return 1}:function(t){var e=t.target,n=t.attributeName;if("href"===n)return 1;t=Qn(n);if(!(t&&t in $r))return;if(st(e,n))return $r[t](e),1;t=$r.getComponent(e,t);if(t)return t.$destroy(),1})(t)&&!e.some(function(t){return t.contains(n)})&&e.push(n.contains?n:n.parentNode));var e,n}),i.forEach(function(t){return $r.update(t)})}).observe(document,{childList:!0,subtree:!0,characterData:!0,attributes:!0}),$r._initialized=!0});Nt={mixins:[pi],props:{date:String,clsWrapper:String},data:{date:"",clsWrapper:".uk-countdown-%unit%"},computed:{date:function(t){t=t.date;return Date.parse(t)},days:function(t,e){return Ne(t.clsWrapper.replace("%unit%","days"),e)},hours:function(t,e){return Ne(t.clsWrapper.replace("%unit%","hours"),e)},minutes:function(t,e){return Ne(t.clsWrapper.replace("%unit%","minutes"),e)},seconds:function(t,e){return Ne(t.clsWrapper.replace("%unit%","seconds"),e)},units:function(){var e=this;return["days","hours","minutes","seconds"].filter(function(t){return e[t]})}},connected:function(){this.start()},disconnected:function(){var e=this;this.stop(),this.units.forEach(function(t){return ve(e[t])})},events:[{name:"visibilitychange",el:ut&&document,handler:function(){document.hidden?this.stop():this.start()}}],update:{write:function(){var i=this,r=function(t){t-=Date.now();return{total:t,seconds:t/1e3%60,minutes:t/1e3/60%60,hours:t/1e3/60/60%24,days:t/1e3/60/60/24}}(this.date);r.total<=0&&(this.stop(),r.days=r.hours=r.minutes=r.seconds=0),this.units.forEach(function(t){var e=(e=String(Math.floor(r[t]))).length<2?"0"+e:e,n=i[t];n.textContent!==e&&((e=e.split("")).length!==n.children.length&&we(n,e.map(function(){return"<span></span>"}).join("")),e.forEach(function(t,e){return n.children[e].textContent=t}))})}},methods:{start:function(){this.stop(),this.date&&this.units.length&&(this.$update(),this.timer=setInterval(this.$update,1e3))},stop:function(){this.timer&&(clearInterval(this.timer),this.timer=null)}}};var Tr,Er="uk-animation-target",le={props:{animation:Number},data:{animation:150},methods:{animate:function(t,n){var i=this;void 0===n&&(n=this.$el),function(){if(Tr)return;(Tr=be(document.head,"<style>").sheet).insertRule("."+Er+" > * {\n            margin-top: 0 !important;\n            transform: none !important;\n        }",0)}();var r=Yt(n),o=r.map(function(t){return _r(t,!0)}),e=ln(n),s=window.pageYOffset;t(),Qe.cancel(n),r.forEach(Qe.cancel),Cr(n),this.$update(n,"resize"),yn.flush();var t=ln(n),a=(r=r.concat(Yt(n).filter(function(t){return!b(r,t)}))).map(function(t,e){return!!(t.parentNode&&e in o)&&(o[e]?Ft(t)?Ar(t):{opacity:0}:{opacity:Ft(t)?1:0})}),o=a.map(function(t,e){e=r[e].parentNode===n&&(o[e]||_r(r[e]));return e&&(t?"opacity"in t||(e.opacity%1?t.opacity=1:delete e.opacity):delete e.opacity),e});return De(n,Er),r.forEach(function(t,e){return o[e]&&Re(t,o[e])}),Re(n,{height:e,display:"block"}),qn(window,s),ae.all(r.map(function(t,e){return["top","left","height","width"].some(function(t){return o[e][t]!==a[e][t]})&&Qe.start(t,a[e],i.animation,"ease")}).concat(e!==t&&Qe.start(n,{height:t},this.animation,"ease"))).then(function(){r.forEach(function(t,e){return Re(t,{display:0===a[e].opacity?"none":"",zIndex:""})}),Cr(n),i.$update(n,"resize"),yn.flush()},et)}}};function _r(t,e){var n=Re(t,"zIndex");return!!Ft(t)&&G({display:"",opacity:e?Re(t,"opacity"):"0",pointerEvents:"none",position:"absolute",zIndex:"auto"===n?me(t):n},Ar(t))}function Cr(t){Re(t.children,{height:"",left:"",opacity:"",pointerEvents:"",position:"",top:"",width:""}),Be(t,Er),Re(t,{height:"",display:""})}function Ar(t){var e=an(t),n=e.height,e=e.width,t=un(t);return{top:t.top,left:t.left,height:n,width:e}}Mi={mixins:[le],args:"target",props:{target:Boolean,selActive:Boolean},data:{target:null,selActive:!1,attrItem:"uk-filter-control",cls:"uk-active",animation:250},computed:{toggles:{get:function(t,e){t.attrItem;return Me("["+this.attrItem+"],[data-"+this.attrItem+"]",e)},watch:function(){var e,n=this;this.updateState(),!1!==this.selActive&&(e=Me(this.selActive,this.$el),this.toggles.forEach(function(t){return Le(t,n.cls,b(e,t))}))},immediate:!0},children:{get:function(t,e){return Me(t.target+" > *",e)},watch:function(t,e){var n;n=e,(t=t).length===n.length&&t.every(function(t){return~n.indexOf(t)})||this.updateState()}}},events:[{name:"click",delegate:function(){return"["+this.attrItem+"],[data-"+this.attrItem+"]"},handler:function(t){t.preventDefault(),this.apply(t.current)}}],methods:{apply:function(t){this.setState(zr(t,this.attrItem,this.getState()))},getState:function(){var n=this;return this.toggles.filter(function(t){return He(t,n.cls)}).reduce(function(t,e){return zr(e,n.attrItem,t)},{filter:{"":""},sort:[]})},setState:function(n,i){var r=this;void 0===i&&(i=!0),n=G({filter:{"":""},sort:[]},n),Kt(this.$el,"beforeFilter",[this,n]),this.toggles.forEach(function(t){return Le(t,r.cls,!!function(t,e,n){var i=n.filter;void 0===i&&(i={"":""});var r=n.sort,o=r[0],s=r[1],n=Nr(t,e),r=n.filter;void 0===r&&(r="");t=n.group;void 0===t&&(t="");e=n.sort,n=n.order;void 0===n&&(n="asc");return H(e)?t in i&&r===i[t]||!r&&t&&!(t in i)&&!i[""]:o===e&&s===n}(t,r.attrItem,n))}),ae.all(Me(this.target,this.$el).map(function(t){var e=Yt(t);return i?r.animate(function(){return Mr(n,t,e)},t):Mr(n,t,e)})).then(function(){return Kt(r.$el,"afterFilter",[r])})},updateState:function(){var t=this;yn.write(function(){return t.setState(t.getState(),!1)})}}};function Nr(t,e){return Mn(ct(t,e),["filter"])}function Mr(t,e,n){var i,r=(a=(a=t).filter,i="",K(a,function(t){return i+=t||""}),i);n.forEach(function(t){return Re(t,"display",r&&!zt(t,r)?"none":"")});var o,s,a=t.sort,t=a[0],a=a[1];t&&(o=t,s=a,Y(a=G([],n).sort(function(t,e){return ct(t,o).localeCompare(ct(e,o),void 0,{numeric:!0})*("asc"===s||-1)}),n)||be(e,a))}function zr(t,e,n){var i=Nr(t,e),r=i.filter,t=i.group,e=i.sort,i=i.order;return void 0===i&&(i="asc"),(r||H(e))&&(t?r?(delete n.filter[""],n.filter[t]=r):(delete n.filter[t],(O(n.filter)||""in n.filter)&&(n.filter={"":r||""})):n.filter={"":r||""}),H(e)||(n.sort=[e,i]),n}xi={slide:{show:function(t){return[{transform:Br(-100*t)},{transform:Br()}]},percent:Dr,translate:function(t,e){return[{transform:Br(-100*e*t)},{transform:Br(100*e*(1-t))}]}}};function Dr(t){return Math.abs(Re(t,"transform").split(",")[4]/t.offsetWidth)||0}function Br(t,e){return void 0===t&&(t=0),void 0===e&&(e="%"),t+=t?e:"",ht?"translateX("+t+")":"translate3d("+t+", 0, 0)"}function Pr(t){return"scale3d("+t+", "+t+", 1)"}var Or=G({},xi,{fade:{show:function(){return[{opacity:0},{opacity:1}]},percent:function(t){return 1-Re(t,"opacity")},translate:function(t){return[{opacity:1-t},{opacity:t}]}},scale:{show:function(){return[{opacity:0,transform:Pr(.8)},{opacity:1,transform:Pr(1)}]},percent:function(t){return 1-Re(t,"opacity")},translate:function(t){return[{opacity:1-t,transform:Pr(1-.2*t)},{opacity:t,transform:Pr(.8+.2*t)}]}}});function Hr(t,e,n){Kt(t,Zt(e,!1,!1,n))}Gi={mixins:[{props:{autoplay:Boolean,autoplayInterval:Number,pauseOnHover:Boolean},data:{autoplay:!1,autoplayInterval:7e3,pauseOnHover:!0},connected:function(){this.autoplay&&this.startAutoplay()},disconnected:function(){this.stopAutoplay()},update:function(){ot(this.slides,"tabindex","-1")},events:[{name:"visibilitychange",el:ut&&document,filter:function(){return this.autoplay},handler:function(){document.hidden?this.stopAutoplay():this.startAutoplay()}}],methods:{startAutoplay:function(){var t=this;this.stopAutoplay(),this.interval=setInterval(function(){return(!t.draggable||!Ne(":focus",t.$el))&&(!t.pauseOnHover||!zt(t.$el,":hover"))&&!t.stack.length&&t.show("next")},this.autoplayInterval)},stopAutoplay:function(){this.interval&&clearInterval(this.interval)}}},{props:{draggable:Boolean},data:{draggable:!0,threshold:10},created:function(){var i=this;["start","move","end"].forEach(function(t){var n=i[t];i[t]=function(t){var e=oe(t).x*(lt?-1:1);i.prevPos=e!==i.pos?i.pos:i.prevPos,i.pos=e,n(t)}})},events:[{name:mt,delegate:function(){return this.selSlides},handler:function(t){var e;!this.draggable||!re(t)&&(!(e=t.target).children.length&&e.childNodes.length)||Bt(t.target,Wt)||0<t.button||this.length<2||this.start(t)}},{name:"dragstart",handler:function(t){t.preventDefault()}}],methods:{start:function(){this.drag=this.pos,this._transitioner?(this.percent=this._transitioner.percent(),this.drag+=this._transitioner.getDistance()*this.percent*this.dir,this._transitioner.cancel(),this._transitioner.translate(this.percent),this.dragging=!0,this.stack=[]):this.prevIndex=this.index,Xt(document,gt,this.move,{passive:!1}),Xt(document,vt+" "+xt,this.end,!0),Re(this.list,"userSelect","none")},move:function(t){var e=this,n=this.pos-this.drag;if(!(0==n||this.prevPos===this.pos||!this.dragging&&Math.abs(n)<this.threshold)){Re(this.list,"pointerEvents","none"),t.cancelable&&t.preventDefault(),this.dragging=!0,this.dir=n<0?1:-1;for(var i=this.slides,r=this.prevIndex,o=Math.abs(n),s=this.getIndex(r+this.dir,r),a=this._getDistance(r,s)||i[r].offsetWidth;s!==r&&a<o;)this.drag-=a*this.dir,r=s,o-=a,s=this.getIndex(r+this.dir,r),a=this._getDistance(r,s)||i[r].offsetWidth;this.percent=o/a;var c,u=i[r],t=i[s],n=this.index!==s,h=r===s;[this.index,this.prevIndex].filter(function(t){return!b([s,r],t)}).forEach(function(t){Kt(i[t],"itemhidden",[e]),h&&(c=!0,e.prevIndex=r)}),(this.index===r&&this.prevIndex!==r||c)&&Kt(i[this.index],"itemshown",[this]),n&&(this.prevIndex=r,this.index=s,h||Kt(u,"beforeitemhide",[this]),Kt(t,"beforeitemshow",[this])),this._transitioner=this._translate(Math.abs(this.percent),u,!h&&t),n&&(h||Kt(u,"itemhide",[this]),Kt(t,"itemshow",[this]))}},end:function(){var t;Gt(document,gt,this.move,{passive:!1}),Gt(document,vt+" "+xt,this.end,!0),this.dragging&&(this.dragging=null,this.index===this.prevIndex?(this.percent=1-this.percent,this.dir*=-1,this._show(!1,this.index,!0),this._transitioner=null):(t=(lt?this.dir*(lt?1:-1):this.dir)<0==this.prevPos>this.pos,this.index=t?this.index:this.prevIndex,t&&(this.percent=1-this.percent),this.show(0<this.dir&&!t||this.dir<0&&t?"next":"previous",!0))),Re(this.list,{userSelect:"",pointerEvents:""}),this.drag=this.percent=null}}},{data:{selNav:!1},computed:{nav:function(t,e){return Ne(t.selNav,e)},selNavItem:function(t){t=t.attrItem;return"["+t+"],[data-"+t+"]"},navItems:function(t,e){return Me(this.selNavItem,e)}},update:{write:function(){var n=this;this.nav&&this.length!==this.nav.children.length&&we(this.nav,this.slides.map(function(t,e){return"<li "+n.attrItem+'="'+e+'"><a href></a></li>'}).join("")),Le(Me(this.selNavItem,this.$el).concat(this.nav),"uk-hidden",!this.maxIndex),this.updateNav()},events:["resize"]},events:[{name:"click",delegate:function(){return this.selNavItem},handler:function(t){t.preventDefault(),this.show(ct(t.current,this.attrItem))}},{name:"itemshow",handler:"updateNav"}],methods:{updateNav:function(){var n=this,i=this.getValidIndex();this.navItems.forEach(function(t){var e=ct(t,n.attrItem);Le(t,n.clsActive,j(e)===i),Le(t,"uk-invisible",n.finite&&("previous"===e&&0===i||"next"===e&&i>=n.maxIndex))})}}}],props:{clsActivated:Boolean,easing:String,index:Number,finite:Boolean,velocity:Number,selSlides:String},data:function(){return{easing:"ease",finite:!1,velocity:1,index:0,prevIndex:-1,stack:[],percent:0,clsActive:"uk-active",clsActivated:!1,Transitioner:!1,transitionOptions:{}}},connected:function(){this.prevIndex=-1,this.index=this.getValidIndex(this.index),this.stack=[]},disconnected:function(){Be(this.slides,this.clsActive)},computed:{duration:function(t,e){t=t.velocity;return Lr(e.offsetWidth/t)},list:function(t,e){return Ne(t.selList,e)},maxIndex:function(){return this.length-1},selSlides:function(t){return t.selList+" "+(t.selSlides||"> *")},slides:{get:function(){return Me(this.selSlides,this.$el)},watch:function(){this.$reset()}},length:function(){return this.slides.length}},events:{itemshown:function(){this.$update(this.list)}},methods:{show:function(t,e){var n=this;if(void 0===e&&(e=!1),!this.dragging&&this.length){var i=this.stack,r=e?0:i.length,o=function(){i.splice(r,1),i.length&&n.show(i.shift(),!0)};if(i[e?"unshift":"push"](t),!e&&1<i.length)2===i.length&&this._transitioner.forward(Math.min(this.duration,200));else{var s,a=this.getIndex(this.index),c=He(this.slides,this.clsActive)&&this.slides[a],u=this.getIndex(t,this.index),h=this.slides[u];if(c!==h){if(this.dir=(s=a,"next"!==(t=t)&&("previous"===t||t<s)?-1:1),this.prevIndex=a,this.index=u,c&&!Kt(c,"beforeitemhide",[this])||!Kt(h,"beforeitemshow",[this,c]))return this.index=this.prevIndex,void o();e=this._show(c,h,e).then(function(){return c&&Kt(c,"itemhidden",[n]),Kt(h,"itemshown",[n]),new ae(function(t){yn.write(function(){i.shift(),i.length?n.show(i.shift(),!0):n._transitioner=null,t()})})});return c&&Kt(c,"itemhide",[this]),Kt(h,"itemshow",[this]),e}o()}}},getIndex:function(t,e){return void 0===t&&(t=this.index),void 0===e&&(e=this.index),tt(ge(t,this.slides,e,this.finite),0,this.maxIndex)},getValidIndex:function(t,e){return void 0===t&&(t=this.index),void 0===e&&(e=this.prevIndex),this.getIndex(t,e)},_show:function(t,e,n){if(this._transitioner=this._getTransitioner(t,e,this.dir,G({easing:n?e.offsetWidth<600?"cubic-bezier(0.25, 0.46, 0.45, 0.94)":"cubic-bezier(0.165, 0.84, 0.44, 1)":this.easing},this.transitionOptions)),!n&&!t)return this._translate(1),ae.resolve();t=this.stack.length;return this._transitioner[1<t?"forward":"show"](1<t?Math.min(this.duration,75+75/(t-1)):this.duration,this.percent)},_getDistance:function(t,e){return this._getTransitioner(t,t!==e&&e).getDistance()},_translate:function(t,e,n){void 0===e&&(e=this.prevIndex),void 0===n&&(n=this.index);n=this._getTransitioner(e!==n&&e,n);return n.translate(t),n},_getTransitioner:function(t,e,n,i){return void 0===t&&(t=this.prevIndex),void 0===e&&(e=this.index),void 0===n&&(n=this.dir||1),void 0===i&&(i=this.transitionOptions),new this.Transitioner(B(t)?this.slides[t]:t,B(e)?this.slides[e]:e,n*(lt?-1:1),i)}}};function Lr(t){return.5*t+300}var Ji={mixins:[Gi],props:{animation:String},data:{animation:"slide",clsActivated:"uk-transition-active",Animations:xi,Transitioner:function(r,o,s,t){var e=t.animation,a=t.easing,n=e.percent,i=e.translate;void 0===(e=e.show)&&(e=et);var c=e(s),u=new se;return{dir:s,show:function(t,e,n){var i=this;void 0===e&&(e=0);n=n?"linear":a;return t-=Math.round(t*tt(e,-1,1)),this.translate(e),Hr(o,"itemin",{percent:e,duration:t,timing:n,dir:s}),Hr(r,"itemout",{percent:1-e,duration:t,timing:n,dir:s}),ae.all([Qe.start(o,c[1],t,n),Qe.start(r,c[0],t,n)]).then(function(){i.reset(),u.resolve()},et),u.promise},stop:function(){return Qe.stop([o,r])},cancel:function(){Qe.cancel([o,r])},reset:function(){for(var t in c[0])Re([o,r],t,"")},forward:function(t,e){return void 0===e&&(e=this.percent()),Qe.cancel([o,r]),this.show(t,e,!0)},translate:function(t){this.reset();var e=i(t,s);Re(o,e[1]),Re(r,e[0]),Hr(o,"itemtranslatein",{percent:t,dir:s}),Hr(r,"itemtranslateout",{percent:1-t,dir:s})},percent:function(){return n(r||o,o,s)},getDistance:function(){return r&&r.offsetWidth}}}},computed:{animation:function(t){var e=t.animation,t=t.Animations;return G(t[e]||t.slide,{name:e})},transitionOptions:function(){return{animation:this.animation}}},events:{"itemshow itemhide itemshown itemhidden":function(t){t=t.target;this.$update(t)},beforeitemshow:function(t){De(t.target,this.clsActive)},itemshown:function(t){De(t.target,this.clsActivated)},itemhidden:function(t){Be(t.target,this.clsActive,this.clsActivated)}}},jr={mixins:[lr,fr,mi,Ji],functional:!0,props:{delayControls:Number,preload:Number,videoAutoplay:Boolean,template:String},data:function(){return{preload:1,videoAutoplay:!1,delayControls:3e3,items:[],cls:"uk-open",clsPage:"uk-lightbox-page",selList:".uk-lightbox-items",attrItem:"uk-lightbox-item",selClose:".uk-close-large",selCaption:".uk-lightbox-caption",pauseOnHover:!1,velocity:2,Animations:Or,template:'<div class="uk-lightbox uk-overflow-hidden"> <ul class="uk-lightbox-items"></ul> <div class="uk-lightbox-toolbar uk-position-top uk-text-right uk-transition-slide-top uk-transition-opaque"> <button class="uk-lightbox-toolbar-icon uk-close-large" type="button" uk-close></button> </div> <a class="uk-lightbox-button uk-position-center-left uk-position-medium uk-transition-fade" href uk-slidenav-previous uk-lightbox-item="previous"></a> <a class="uk-lightbox-button uk-position-center-right uk-position-medium uk-transition-fade" href uk-slidenav-next uk-lightbox-item="next"></a> <div class="uk-lightbox-toolbar uk-lightbox-caption uk-position-bottom uk-text-center uk-transition-slide-bottom uk-transition-opaque"></div> </div>'}},created:function(){var t=Ne(this.template),e=Ne(this.selList,t);this.items.forEach(function(){return be(e,"<li>")}),this.$mount(be(this.container,t))},computed:{caption:function(t,e){t.selCaption;return Ne(".uk-lightbox-caption",e)}},events:[{name:gt+" "+mt+" keydown",handler:"showControls"},{name:"click",self:!0,delegate:function(){return this.selSlides},handler:function(t){t.defaultPrevented||this.hide()}},{name:"shown",self:!0,handler:function(){this.showControls()}},{name:"hide",self:!0,handler:function(){this.hideControls(),Be(this.slides,this.clsActive),Qe.stop(this.slides)}},{name:"hidden",self:!0,handler:function(){this.$destroy(!0)}},{name:"keyup",el:ut&&document,handler:function(t){if(this.isToggled(this.$el)&&this.draggable)switch(t.keyCode){case 37:this.show("previous");break;case 39:this.show("next")}}},{name:"beforeitemshow",handler:function(t){this.isToggled()||(this.draggable=!1,t.preventDefault(),this.toggleElement(this.$el,!0,!1),this.animation=Or.scale,Be(t.target,this.clsActive),this.stack.splice(1,0,this.index))}},{name:"itemshow",handler:function(){we(this.caption,this.getItem().caption||"");for(var t=-this.preload;t<=this.preload;t++)this.loadItem(this.index+t)}},{name:"itemshown",handler:function(){this.draggable=this.$props.draggable}},{name:"itemload",handler:function(t,n){var i=this,r=n.source,e=n.type,o=n.alt;void 0===o&&(o="");var s,a,c,u=n.poster,h=n.attrs;void 0===h&&(h={}),this.setItem(n,"<span uk-spinner></span>"),r&&(a={frameborder:"0",allow:"autoplay",allowfullscreen:"",style:"max-width: 100%; box-sizing: border-box;","uk-responsive":"","uk-video":""+this.videoAutoplay},"image"===e||r.match(/\.(jpe?g|png|gif|svg|webp)($|\?)/i)?fe(r,h.srcset,h.size).then(function(t){var e=t.width,t=t.height;return i.setItem(n,Fr("img",G({src:r,width:e,height:t,alt:o},h)))},function(){return i.setError(n)}):"video"===e||r.match(/\.(mp4|webm|ogv)($|\?)/i)?(Xt(c=Fr("video",G({src:r,poster:u,controls:"",playsinline:"","uk-video":""+this.videoAutoplay},h)),"loadedmetadata",function(){ot(c,{width:c.videoWidth,height:c.videoHeight}),i.setItem(n,c)}),Xt(c,"error",function(){return i.setError(n)})):"iframe"===e||r.match(/\.(html|php)($|\?)/i)?this.setItem(n,Fr("iframe",G({src:r,frameborder:"0",allowfullscreen:"",class:"uk-lightbox-iframe"},h))):(s=r.match(/\/\/(?:.*?youtube(-nocookie)?\..*?[?&]v=|youtu\.be\/)([\w-]{11})[&?]?(.*)?/))?this.setItem(n,Fr("iframe",G({src:"https://www.youtube"+(s[1]||"")+".com/embed/"+s[2]+(s[3]?"?"+s[3]:""),width:1920,height:1080},a,h))):(s=r.match(/\/\/.*?vimeo\.[a-z]+\/(\d+)[&?]?(.*)?/))&&de("https://vimeo.com/api/oembed.json?maxwidth=1920&url="+encodeURI(r),{responseType:"json",withCredentials:!1}).then(function(t){var e=t.response,t=e.height,e=e.width;return i.setItem(n,Fr("iframe",G({src:"https://player.vimeo.com/video/"+s[1]+(s[2]?"?"+s[2]:""),width:e,height:t},a,h)))},function(){return i.setError(n)}))}}],methods:{loadItem:function(t){void 0===t&&(t=this.index);t=this.getItem(t);this.getSlide(t).childElementCount||Kt(this.$el,"itemload",[t])},getItem:function(t){return void 0===t&&(t=this.index),this.items[ge(t,this.slides)]},setItem:function(t,e){Kt(this.$el,"itemloaded",[this,we(this.getSlide(t),e)])},getSlide:function(t){return this.slides[this.items.indexOf(t)]},setError:function(t){this.setItem(t,'<span uk-icon="icon: bolt; ratio: 2"></span>')},showControls:function(){clearTimeout(this.controlsTimer),this.controlsTimer=setTimeout(this.hideControls,this.delayControls),De(this.$el,"uk-active","uk-transition-active")},hideControls:function(){Be(this.$el,"uk-active","uk-transition-active")}}};function Fr(t,e){t=Ce("<"+t+">");return ot(t,e),t}Yi={install:function(t,e){t.lightboxPanel||t.component("lightboxPanel",jr);G(e.props,t.component("lightboxPanel").options.props)},props:{toggle:String},data:{toggle:"a"},computed:{toggles:{get:function(t,e){return Me(t.toggle,e)},watch:function(){this.hide()}}},disconnected:function(){this.hide()},events:[{name:"click",delegate:function(){return this.toggle+":not(.uk-disabled)"},handler:function(t){t.preventDefault(),this.show(t.current)}}],methods:{show:function(t){var e,n=this,i=Q(this.toggles.map(Wr),"source");return N(t)&&(e=Wr(t).source,t=y(i,function(t){t=t.source;return e===t})),this.panel=this.panel||this.$create("lightboxPanel",G({},this.$props,{items:i})),Xt(this.panel.$el,"hidden",function(){return n.panel=!1}),this.panel.show(t)},hide:function(){return this.panel&&this.panel.hide()}}};function Wr(e){var n={};return["href","caption","type","poster","alt","attrs"].forEach(function(t){n["href"===t?"source":t]=ct(e,t)}),n.attrs=Mn(n.attrs),n}Ui={functional:!0,args:["message","status"],data:{message:"",status:"",timeout:5e3,group:null,pos:"top-center",clsContainer:"uk-notification",clsClose:"uk-notification-close",clsMsg:"uk-notification-message"},install:function(i){i.notification.closeAll=function(e,n){Ae(document.body,function(t){t=i.getComponent(t,"notification");!t||e&&e!==t.group||t.close(n)})}},computed:{marginProp:function(t){return"margin"+(g(t.pos,"top")?"Top":"Bottom")},startProps:function(){var t={opacity:0};return t[this.marginProp]=-this.$el.offsetHeight,t}},created:function(){var t=Ne("."+this.clsContainer+"-"+this.pos,this.$container)||be(this.$container,'<div class="'+this.clsContainer+" "+this.clsContainer+"-"+this.pos+'" style="display: block"></div>');this.$mount(be(t,'<div class="'+this.clsMsg+(this.status?" "+this.clsMsg+"-"+this.status:"")+'"> <a href class="'+this.clsClose+'" data-uk-close></a> <div>'+this.message+"</div> </div>"))},connected:function(){var t,e=this,n=F(Re(this.$el,this.marginProp));Qe.start(Re(this.$el,this.startProps),((t={opacity:1})[this.marginProp]=n,t)).then(function(){e.timeout&&(e.timer=setTimeout(e.close,e.timeout))})},events:((Xi={click:function(t){Bt(t.target,'a[href="#"],a[href=""]')&&t.preventDefault(),this.close()}})[wt]=function(){this.timer&&clearTimeout(this.timer)},Xi[bt]=function(){this.timeout&&(this.timer=setTimeout(this.close,this.timeout))},Xi),methods:{close:function(t){function e(){var t=n.$el.parentNode;Kt(n.$el,"close",[n]),$e(n.$el),t&&!t.hasChildNodes()&&$e(t)}var n=this;this.timer&&clearTimeout(this.timer),t?e():Qe.start(this.$el,this.startProps).then(e)}}};var Vr=["x","y","bgx","bgy","rotate","scale","color","backgroundColor","borderColor","opacity","blur","hue","grayscale","invert","saturate","sepia","fopacity","stroke"],fr={mixins:[ur],props:Vr.reduce(function(t,e){return t[e]="list",t},{}),data:Vr.reduce(function(t,e){return t[e]=void 0,t},{}),computed:{props:function(f,p){var m=this;return Vr.reduce(function(t,e){if(H(f[e]))return t;var n,i,r=e.match(/color/i),o=r||"opacity"===e,s=f[e].slice(0);o&&Re(p,e,""),s.length<2&&s.unshift(("scale"===e?1:o?Re(p,e):0)||0);var a,c,u,h,l,o=s.reduce(function(t,e){return D(e)&&e.replace(/-|\d/g,"").trim()||t},"");if(r?(r=p.style.color,s=s.map(function(t){return Re(Re(p,"color",t),"color").split(/[(),]/g).slice(1,-1).concat(1).slice(0,4).map(F)}),p.style.color=r):g(e,"bg")?(a="bgy"===e?"height":"width",s=s.map(function(t){return bn(t,a,m.$el)}),Re(p,"background-position-"+e[2],""),i=Re(p,"backgroundPosition").split(" ")["x"===e[2]?0:1],n=m.covers?(c=Math.min.apply(Math,s),u=Math.max.apply(Math,s),h=s.indexOf(c)<s.indexOf(u),l=u-c,s=s.map(function(t){return t-(h?c:u)}),(h?-l:0)+"px"):i):s=s.map(F),"stroke"===e){if(!s.some(function(t){return t}))return t;var d=Wi(m.$el);Re(p,"strokeDasharray",d),"%"===o&&(s=s.map(function(t){return t*d/100})),s=s.reverse(),e="strokeDashoffset"}return t[e]={steps:s,unit:o,pos:n,bgPos:i,diff:l},t},{})},bgProps:function(){var e=this;return["bgx","bgy"].filter(function(t){return t in e.props})},covers:function(t,e){return i=(n=e).style.backgroundSize,e="cover"===Re(Re(n,"backgroundSize",""),"backgroundSize"),n.style.backgroundSize=i,e;var n,i}},disconnected:function(){delete this._image},update:{read:function(t){var e,n,a,c,u,h=this;t.active=this.matchMedia,t.active&&(t.image||!this.covers||!this.bgProps.length||(e=Re(this.$el,"backgroundImage").replace(/^none|url\(["']?(.+?)["']?\)$/,"$1"))&&((n=new Image).src=e,(t.image=n).naturalWidth||(n.onload=function(){return h.$update()})),(n=t.image)&&n.naturalWidth&&(a={width:this.$el.offsetWidth,height:this.$el.offsetHeight},c={width:n.naturalWidth,height:n.naturalHeight},u=rt.cover(c,a),this.bgProps.forEach(function(t){var e,n=h.props[t],i=n.diff,r=n.bgPos,o=n.steps,n="bgy"===t?"height":"width",s=u[n]-a[n];s<i?a[n]=u[n]+i-s:i<s&&((e=a[n]/bn(r,n,h.$el))&&(h.props[t].steps=o.map(function(t){return t-(s-i)/e}))),u=rt.cover(c,a)}),t.dim=u))},write:function(t){var e=t.dim;t.active?e&&Re(this.$el,{backgroundSize:e.width+"px "+e.height+"px",backgroundRepeat:"no-repeat"}):Re(this.$el,{backgroundSize:"",backgroundRepeat:""})},events:["resize"]},methods:{reset:function(){var n=this;K(this.getCss(0),function(t,e){return Re(n.$el,e,"")})},getCss:function(l){var d=this.props;return Object.keys(d).reduce(function(t,e){var n=d[e],i=n.steps,r=n.unit,o=n.pos,s=function(t,e,n){void 0===n&&(n=2);var i=Rr(t,e),t=i[0],e=i[1],i=i[2];return(B(t)?t+Math.abs(t-e)*i*(t<e?1:-1):+e).toFixed(n)}(i,l);switch(e){case"x":case"y":r=r||"px",t.transform+=" translate"+p(e)+"("+F(s).toFixed("px"===r?0:2)+r+")";break;case"rotate":r=r||"deg",t.transform+=" rotate("+(s+r)+")";break;case"scale":t.transform+=" scale("+s+")";break;case"bgy":case"bgx":t["background-position-"+e[2]]="calc("+o+" + "+s+"px)";break;case"color":case"backgroundColor":case"borderColor":var a=Rr(i,l),c=a[0],u=a[1],h=a[2];t[e]="rgba("+c.map(function(t,e){return t+=h*(u[e]-t),3===e?F(t):parseInt(t,10)}).join(",")+")";break;case"blur":r=r||"px",t.filter+=" blur("+(s+r)+")";break;case"hue":r=r||"deg",t.filter+=" hue-rotate("+(s+r)+")";break;case"fopacity":r=r||"%",t.filter+=" opacity("+(s+r)+")";break;case"grayscale":case"invert":case"saturate":case"sepia":r=r||"%",t.filter+=" "+e+"("+(s+r)+")";break;default:t[e]=s}return t},{transform:"",filter:""})}}};function Rr(t,e){var n=t.length-1,i=Math.min(Math.floor(n*e),n-1),i=t.slice(i,i+2);return i.push(1===e?1:e%(1/n)*n),i}Xi={mixins:[fr],props:{target:String,viewport:Number,easing:Number},data:{target:!1,viewport:1,easing:1},computed:{target:function(t,e){t=t.target;return function t(e){return e?"offsetTop"in e?e:t(e.parentNode):document.body}(t&&yt(t,e)||e)}},update:{read:function(t,e){var n=t.percent;if("scroll"!==e&&(n=!1),t.active){var i=n;return e=Yn(this.target)/(this.viewport||1),t=this.easing,{percent:n=tt(e*(1-(t-t*e))),style:i!==n&&this.getCss(n)}}},write:function(t){var e=t.style;t.active?e&&Re(this.$el,e):this.reset()},events:["scroll","resize"]}};ur={update:{write:function(){var t;this.stack.length||this.dragging||(t=this.getValidIndex(this.index),~this.prevIndex&&this.index===t||this.show(t))},events:["resize"]}};function qr(t,e,n){var i=Xr(t,e);return n?i-(t=t,an(e).width/2-an(t).width/2):Math.min(i,Ur(e))}function Ur(t){return Math.max(0,Yr(t)-an(t).width)}function Yr(t){return Jr(t).reduce(function(t,e){return an(e).width+t},0)}function Xr(t,e){return(un(t).left+(lt?an(t).width-an(e).width:0))*(lt?-1:1)}function Gr(t,e,n){Kt(t,Zt(e,!1,!1,n))}function Jr(t){return Yt(t)}Gi={mixins:[pi,Gi,ur],props:{center:Boolean,sets:Boolean},data:{center:!1,sets:!1,attrItem:"uk-slider-item",selList:".uk-slider-items",selNav:".uk-slider-nav",clsContainer:"uk-slider-container",Transitioner:function(i,r,o,t){var e=t.center,s=t.easing,a=t.list,c=new se,n=i?qr(i,a,e):qr(r,a,e)+an(r).width*o,u=r?qr(r,a,e):n+an(i).width*o*(lt?-1:1);return{dir:o,show:function(t,e,n){void 0===e&&(e=0);n=n?"linear":s;return t-=Math.round(t*tt(e,-1,1)),this.translate(e),i&&this.updateTranslates(),e=i?e:tt(e,0,1),Gr(this.getItemIn(),"itemin",{percent:e,duration:t,timing:n,dir:o}),i&&Gr(this.getItemIn(!0),"itemout",{percent:1-e,duration:t,timing:n,dir:o}),Qe.start(a,{transform:Br(-u*(lt?-1:1),"px")},t,n).then(c.resolve,et),c.promise},stop:function(){return Qe.stop(a)},cancel:function(){Qe.cancel(a)},reset:function(){Re(a,"transform","")},forward:function(t,e){return void 0===e&&(e=this.percent()),Qe.cancel(a),this.show(t,e,!0)},translate:function(t){var e=this.getDistance()*o*(lt?-1:1);Re(a,"transform",Br(tt(e-e*t-u,-Yr(a),an(a).width)*(lt?-1:1),"px")),this.updateTranslates(),i&&(t=tt(t,-1,1),Gr(this.getItemIn(),"itemtranslatein",{percent:t,dir:o}),Gr(this.getItemIn(!0),"itemtranslateout",{percent:1-t,dir:o}))},percent:function(){return Math.abs((Re(a,"transform").split(",")[4]*(lt?-1:1)+n)/(u-n))},getDistance:function(){return Math.abs(u-n)},getItemIn:function(t){void 0===t&&(t=!1);var e=this.getActives(),n=Z(Jr(a),"offsetLeft"),e=me(n,e[0<o*(t?-1:1)?e.length-1:0]);return~e&&n[e+(i&&!t?o:0)]},getActives:function(){var n=qr(i||r,a,e);return Z(Jr(a).filter(function(t){var e=Xr(t,a);return n<=e&&e+an(t).width<=an(a).width+n}),"offsetLeft")},updateTranslates:function(){var n=this.getActives();Jr(a).forEach(function(t){var e=b(n,t);Gr(t,"itemtranslate"+(e?"in":"out"),{percent:e?1:0,dir:t.offsetLeft<=r.offsetLeft?1:-1})})}}}},computed:{avgWidth:function(){return Yr(this.list)/this.length},finite:function(t){return t.finite||Math.ceil(Yr(this.list))<an(this.list).width+Jr(this.list).reduce(function(t,e){return Math.max(t,an(e).width)},0)+this.center},maxIndex:function(){if(!this.finite||this.center&&!this.sets)return this.length-1;if(this.center)return J(this.sets);Re(this.slides,"order","");for(var t=Ur(this.list),e=this.length;e--;)if(Xr(this.list.children[e],this.list)<t)return Math.min(e+1,this.length-1);return 0},sets:function(t){var r=this,t=t.sets,o=an(this.list).width/(this.center?2:1),s=0,a=o,c=0;return!O(t=t&&this.slides.reduce(function(t,e,n){var i=an(e).width;return s<c+i&&(!r.center&&n>r.maxIndex&&(n=r.maxIndex),b(t,n)||(e=r.slides[n+1],r.center&&e&&i<a-an(e).width/2?a-=i:(a=o,t.push(n),s=c+o+(r.center?i/2:0)))),c+=i,t},[]))&&t},transitionOptions:function(){return{center:this.center,list:this.list}}},connected:function(){Le(this.$el,this.clsContainer,!Ne("."+this.clsContainer,this.$el))},update:{write:function(){var n=this;Me("["+this.attrItem+"],[data-"+this.attrItem+"]",this.$el).forEach(function(t){var e=ct(t,n.attrItem);n.maxIndex&&Le(t,"uk-hidden",P(e)&&(n.sets&&!b(n.sets,F(e))||e>n.maxIndex))}),!this.length||this.dragging||this.stack.length||(this.reorder(),this._translate(1));var e=this._getTransitioner(this.index).getActives();this.slides.forEach(function(t){return Le(t,n.clsActive,b(e,t))}),this.sets&&!b(this.sets,F(this.index))||this.slides.forEach(function(t){return Le(t,n.clsActivated,b(e,t))})},events:["resize"]},events:{beforeitemshow:function(t){!this.dragging&&this.sets&&this.stack.length<2&&!b(this.sets,this.index)&&(this.index=this.getValidIndex());var e=Math.abs(this.index-this.prevIndex+(0<this.dir&&this.index<this.prevIndex||this.dir<0&&this.index>this.prevIndex?(this.maxIndex+1)*this.dir:0));if(!this.dragging&&1<e){for(var n=0;n<e;n++)this.stack.splice(1,0,0<this.dir?"next":"previous");t.preventDefault()}else this.duration=Lr(this.avgWidth/this.velocity)*(an(this.dir<0||!this.slides[this.prevIndex]?this.slides[this.index]:this.slides[this.prevIndex]).width/this.avgWidth),this.reorder()},itemshow:function(){~this.prevIndex&&De(this._getTransitioner().getItemIn(),this.clsActive)}},methods:{reorder:function(){var n=this;if(this.finite)Re(this.slides,"order","");else{var i=0<this.dir&&this.slides[this.prevIndex]?this.prevIndex:this.index;if(this.slides.forEach(function(t,e){return Re(t,"order",0<n.dir&&e<i?1:n.dir<0&&e>=n.index?-1:"")}),this.center)for(var t=this.slides[i],e=an(this.list).width/2-an(t).width/2,r=0;0<e;){var o=this.getIndex(--r+i,i),s=this.slides[o];Re(s,"order",i<o?-2:-1),e-=an(s).width}}},getValidIndex:function(t,e){if(void 0===t&&(t=this.index),void 0===e&&(e=this.prevIndex),t=this.getIndex(t,e),!this.sets)return t;var n;do{if(b(this.sets,t))return t}while(n=t,(t=this.getIndex(t+this.dir,e))!==n);return t}}},fr={mixins:[fr],data:{selItem:"!li"},computed:{item:function(t,e){return yt(t.selItem,e)}},events:[{name:"itemshown",self:!0,el:function(){return this.item},handler:function(){Re(this.$el,this.getCss(.5))}},{name:"itemin itemout",self:!0,el:function(){return this.item},handler:function(t){var e=t.type,n=t.detail,i=n.percent,r=n.duration,t=n.timing,n=n.dir;Qe.cancel(this.$el),Re(this.$el,this.getCss(Zr(e,n,i))),Qe.start(this.$el,this.getCss(Kr(e)?.5:0<n?1:0),r,t).catch(et)}},{name:"transitioncanceled transitionend",self:!0,el:function(){return this.item},handler:function(){Qe.cancel(this.$el)}},{name:"itemtranslatein itemtranslateout",self:!0,el:function(){return this.item},handler:function(t){var e=t.type,n=t.detail,t=n.percent,n=n.dir;Qe.cancel(this.$el),Re(this.$el,this.getCss(Zr(e,n,t)))}}]};function Kr(t){return u(t,"in")}function Zr(t,e,n){return n/=2,Kr(t)?e<0?1-n:n:e<0?n:1-n}var Qr,xi=G({},xi,{fade:{show:function(){return[{opacity:0,zIndex:0},{zIndex:-1}]},percent:function(t){return 1-Re(t,"opacity")},translate:function(t){return[{opacity:1-t,zIndex:0},{zIndex:-1}]}},scale:{show:function(){return[{opacity:0,transform:Pr(1.5),zIndex:0},{zIndex:-1}]},percent:function(t){return 1-Re(t,"opacity")},translate:function(t){return[{opacity:1-t,transform:Pr(1+.5*t),zIndex:0},{zIndex:-1}]}},pull:{show:function(t){return t<0?[{transform:Br(30),zIndex:-1},{transform:Br(),zIndex:0}]:[{transform:Br(-100),zIndex:0},{transform:Br(),zIndex:-1}]},percent:function(t,e,n){return n<0?1-Dr(e):Dr(t)},translate:function(t,e){return e<0?[{transform:Br(30*t),zIndex:-1},{transform:Br(-100*(1-t)),zIndex:0}]:[{transform:Br(100*-t),zIndex:0},{transform:Br(30*(1-t)),zIndex:-1}]}},push:{show:function(t){return t<0?[{transform:Br(100),zIndex:0},{transform:Br(),zIndex:-1}]:[{transform:Br(-30),zIndex:-1},{transform:Br(),zIndex:0}]},percent:function(t,e,n){return 0<n?1-Dr(e):Dr(t)},translate:function(t,e){return e<0?[{transform:Br(100*t),zIndex:0},{transform:Br(-30*(1-t)),zIndex:-1}]:[{transform:Br(-30*t),zIndex:-1},{transform:Br(100*(1-t)),zIndex:0}]}}}),xi={mixins:[pi,Ji,ur],props:{ratio:String,minHeight:Number,maxHeight:Number},data:{ratio:"16:9",minHeight:!1,maxHeight:!1,selList:".uk-slideshow-items",attrItem:"uk-slideshow-item",selNav:".uk-slideshow-nav",Animations:xi},update:{read:function(){var t=this.ratio.split(":").map(Number),e=t[0],t=(t=t[1])*this.list.offsetWidth/e||0;return this.minHeight&&(t=Math.max(this.minHeight,t)),this.maxHeight&&(t=Math.min(this.maxHeight,t)),{height:t-pn(this.list,"height","content-box")}},write:function(t){t=t.height;0<t&&Re(this.list,"minHeight",t)},events:["resize"]}},le={mixins:[pi,le],props:{group:String,threshold:Number,clsItem:String,clsPlaceholder:String,clsDrag:String,clsDragState:String,clsBase:String,clsNoDrag:String,clsEmpty:String,clsCustom:String,handle:String},data:{group:!1,threshold:5,clsItem:"uk-sortable-item",clsPlaceholder:"uk-sortable-placeholder",clsDrag:"uk-sortable-drag",clsDragState:"uk-drag",clsBase:"uk-sortable",clsNoDrag:"uk-sortable-nodrag",clsEmpty:"uk-sortable-empty",clsCustom:"",handle:!1,pos:{}},created:function(){var n=this;["init","start","move","end"].forEach(function(t){var e=n[t];n[t]=function(t){G(n.pos,oe(t)),e(t)}})},events:{name:mt,passive:!1,handler:"init"},computed:{target:function(){return(this.$el.tBodies||[this.$el])[0]},items:function(){return Yt(this.target)},isEmpty:{get:function(){return O(this.items)},watch:function(t){Le(this.target,this.clsEmpty,t)},immediate:!0},handles:{get:function(t,e){t=t.handle;return t?Me(t,e):this.items},watch:function(t,e){Re(e,{touchAction:"",userSelect:""}),Re(t,{touchAction:pt?"none":"",userSelect:"none"})},immediate:!0}},update:{write:function(){if(this.drag&&Pt(this.placeholder)){var t=this.pos,e=t.x,n=t.y,i=this.origin,t=i.offsetTop,i=i.offsetLeft,r=document.elementFromPoint(e,n);Re(this.drag,{top:n-t,left:e-i});t=this.getSortable(r),e=this.getSortable(this.placeholder),i=t!==e;if(t&&!qt(r,this.placeholder)&&(!i||t.group&&t.group===e.group)){if(r=t.target===r.parentNode&&r||t.items.filter(function(t){return qt(r,t)})[0],i)e.remove(this.placeholder);else if(!r)return;t.insert(this.placeholder,r),b(this.touched,t)||this.touched.push(t)}}},events:["move"]},methods:{init:function(t){var e=t.target,n=t.button,i=t.defaultPrevented,r=this.items.filter(function(t){return qt(e,t)})[0];!r||i||0<n||Vt(e)||qt(e,"."+this.clsNoDrag)||this.handle&&!qt(e,this.handle)||(t.preventDefault(),this.touched=[this],this.placeholder=r,this.origin=G({target:e,index:me(r)},this.pos),Xt(document,gt,this.move),Xt(document,vt,this.end),this.threshold||this.start(t))},start:function(t){this.drag=function(t,e){t=be(t,e.outerHTML.replace(/(^<)(?:li|tr)|(?:li|tr)(\/>$)/g,"$1div$2"));return t.style.setProperty("margin","0","important"),Re(t,G({boxSizing:"border-box",width:e.offsetWidth,height:e.offsetHeight,overflow:"hidden"},Re(e,["paddingLeft","paddingRight","paddingTop","paddingBottom"]))),ln(t.firstElementChild,ln(e.firstElementChild)),t}(this.$container,this.placeholder);var e,n,i=this.placeholder.getBoundingClientRect(),r=i.left,i=i.top;G(this.origin,{offsetLeft:this.pos.x-r,offsetTop:this.pos.y-i}),De(this.drag,this.clsDrag,this.clsCustom),De(this.placeholder,this.clsPlaceholder),De(this.items,this.clsItem),De(document.documentElement,this.clsDragState),Kt(this.$el,"start",[this,this.placeholder]),e=this.pos,n=Date.now(),Qr=setInterval(function(){var t=e.x,s=e.y;s+=window.pageYOffset;var a=.3*(Date.now()-n);n=Date.now(),Xn(document.elementFromPoint(t,e.y)).some(function(t){var e=t.scrollTop,n=t.scrollHeight,i=an(Gn(t)),r=i.top,o=i.bottom,i=i.height;if(r<s&&s<r+35)e-=a;else{if(!(s<o&&o-35<s))return;e+=a}if(0<e&&e<n-i)return qn(t,e),!0})},15),this.move(t)},move:function(t){this.drag?this.$emit("move"):(Math.abs(this.pos.x-this.origin.x)>this.threshold||Math.abs(this.pos.y-this.origin.y)>this.threshold)&&this.start(t)},end:function(){var t,e;Gt(document,gt,this.move),Gt(document,vt,this.end),Gt(window,"scroll",this.scroll),this.drag&&(clearInterval(Qr),t=this.getSortable(this.placeholder),this===t?this.origin.index!==me(this.placeholder)&&Kt(this.$el,"moved",[this,this.placeholder]):(Kt(t.$el,"added",[t,this.placeholder]),Kt(this.$el,"removed",[this,this.placeholder])),Kt(this.$el,"stop",[this,this.placeholder]),$e(this.drag),this.drag=null,e=this.touched.map(function(t){return t.clsPlaceholder+" "+t.clsItem}).join(" "),this.touched.forEach(function(t){return Be(t.items,e)}),Be(document.documentElement,this.clsDragState))},insert:function(n,i){var r=this;De(this.items,this.clsItem);function t(){var t,e;i?(!qt(n,r.target)||(e=i,(t=n).parentNode===e.parentNode&&me(t)>me(e))?xe:ye)(i,n):be(r.target,n)}this.animation?this.animate(t):t()},remove:function(t){qt(t,this.target)&&(this.animation?this.animate(function(){return $e(t)}):$e(t))},getSortable:function(t){return t&&(this.$getComponent(t,"sortable")||this.getSortable(t.parentNode))}}};var to=[],bt={mixins:[lr,mi,$i],args:"title",props:{delay:Number,title:String},data:{pos:"top",title:"",delay:0,animation:["uk-animation-scale-up"],duration:100,cls:"uk-active",clsPos:"uk-tooltip"},beforeConnect:function(){this._hasTitle=st(this.$el,"title"),ot(this.$el,{title:"","aria-expanded":!1})},disconnected:function(){this.hide(),ot(this.$el,{title:this._hasTitle?this.title:null,"aria-expanded":null})},methods:{show:function(){var e=this;!this.isActive()&&this.title&&(to.forEach(function(t){return t.hide()}),to.push(this),this._unbind=Xt(document,vt,function(t){return!qt(t.target,e.$el)&&e.hide()}),clearTimeout(this.showTimer),this.showTimer=setTimeout(this._show,this.delay))},hide:function(){var t=this;this.isActive()&&!zt(this.$el,"input:focus")&&this.toggleElement(this.tooltip,!1,!1).then(function(){to.splice(to.indexOf(t),1),clearTimeout(t.showTimer),t.tooltip=$e(t.tooltip),t._unbind()})},_show:function(){var e=this;this.tooltip=be(this.container,'<div class="'+this.clsPos+'"> <div class="'+this.clsPos+'-inner">'+this.title+"</div> </div>"),Xt(this.tooltip,"toggled",function(){var t=e.isToggled(e.tooltip);ot(e.$el,"aria-expanded",t),t&&(e.positionAt(e.tooltip,e.$el),e.origin="y"===e.getAxis()?wn(e.dir)+"-"+e.align:e.align+"-"+wn(e.dir))}),this.toggleElement(this.tooltip,!0)},isActive:function(){return b(to,this)}},events:(($i={focus:"show",blur:"hide"})[wt+" "+bt]=function(t){re(t)||(t.type===wt?this.show():this.hide())},$i[mt]=function(t){re(t)&&(this.isActive()?this.hide():this.show())},$i)},$i={props:{allow:String,clsDragover:String,concurrent:Number,maxSize:Number,method:String,mime:String,msgInvalidMime:String,msgInvalidName:String,msgInvalidSize:String,multiple:Boolean,name:String,params:Object,type:String,url:String},data:{allow:!1,clsDragover:"uk-dragover",concurrent:1,maxSize:0,method:"POST",mime:!1,msgInvalidMime:"Invalid File Type: %s",msgInvalidName:"Invalid File Name: %s",msgInvalidSize:"Invalid File Size: %s Kilobytes Max",multiple:!1,name:"files[]",params:{},type:"",url:"",abort:et,beforeAll:et,beforeSend:et,complete:et,completeAll:et,error:et,fail:et,load:et,loadEnd:et,loadStart:et,progress:et},events:{change:function(t){zt(t.target,'input[type="file"]')&&(t.preventDefault(),t.target.files&&this.upload(t.target.files),t.target.value="")},drop:function(t){no(t);t=t.dataTransfer;t&&t.files&&(Be(this.$el,this.clsDragover),this.upload(t.files))},dragenter:function(t){no(t)},dragover:function(t){no(t),De(this.$el,this.clsDragover)},dragleave:function(t){no(t),Be(this.$el,this.clsDragover)}},methods:{upload:function(t){var i=this;if(t.length){Kt(this.$el,"upload",[t]);for(var e=0;e<t.length;e++){if(this.maxSize&&1e3*this.maxSize<t[e].size)return void this.fail(this.msgInvalidSize.replace("%s",this.maxSize));if(this.allow&&!eo(this.allow,t[e].name))return void this.fail(this.msgInvalidName.replace("%s",this.allow));if(this.mime&&!eo(this.mime,t[e].type))return void this.fail(this.msgInvalidMime.replace("%s",this.mime))}this.multiple||(t=[t[0]]),this.beforeAll(this,t);var r=function(t,e){for(var n=[],i=0;i<t.length;i+=e){for(var r=[],o=0;o<e;o++)r.push(t[i+o]);n.push(r)}return n}(t,this.concurrent),o=function(t){var e,n=new FormData;for(e in t.forEach(function(t){return n.append(i.name,t)}),i.params)n.append(e,i.params[e]);de(i.url,{data:n,method:i.method,responseType:i.type,beforeSend:function(t){var e=t.xhr;e.upload&&Xt(e.upload,"progress",i.progress),["loadStart","load","loadEnd","abort"].forEach(function(t){return Xt(e,t.toLowerCase(),i[t])}),i.beforeSend(t)}}).then(function(t){i.complete(t),r.length?o(r.shift()):i.completeAll(t)},function(t){return i.error(t)})};o(r.shift())}}}};function eo(t,e){return e.match(new RegExp("^"+t.replace(/\//g,"\\/").replace(/\*\*/g,"(\\/[^\\/]+)*").replace(/\*/g,"[^\\/]+").replace(/((?!\\))\?/g,"$1.")+"$","i"))}function no(t){t.preventDefault(),t.stopPropagation()}return K(Object.freeze({__proto__:null,Countdown:Nt,Filter:Mi,Lightbox:Yi,LightboxPanel:jr,Notification:Ui,Parallax:Xi,Slider:Gi,SliderParallax:fr,Slideshow:xi,SlideshowParallax:fr,Sortable:le,Tooltip:bt,Upload:$i}),function(t,e){return ti.component(e,t)}),ti});
},{}],"../node_modules/uikit/dist/js/uikit-icons.min.js":[function(require,module,exports) {
var define;
/*! UIkit 3.5.10 | https://www.getuikit.com | (c) 2014 - 2020 YOOtheme | MIT License */

!function(t,i){"object"==typeof exports&&"undefined"!=typeof module?module.exports=i():"function"==typeof define&&define.amd?define("uikiticons",i):(t="undefined"!=typeof globalThis?globalThis:t||self).UIkitIcons=i()}(this,function(){"use strict";function i(t){i.installed||t.icon.add({"500px":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.624,11.866c-0.141,0.132,0.479,0.658,0.662,0.418c0.051-0.046,0.607-0.61,0.662-0.664c0,0,0.738,0.719,0.814,0.719 c0.1,0,0.207-0.055,0.322-0.17c0.27-0.269,0.135-0.416,0.066-0.495l-0.631-0.616l0.658-0.668c0.146-0.156,0.021-0.314-0.1-0.449 c-0.182-0.18-0.359-0.226-0.471-0.125l-0.656,0.654l-0.654-0.654c-0.033-0.034-0.08-0.045-0.124-0.045 c-0.079,0-0.191,0.068-0.307,0.181c-0.202,0.202-0.247,0.351-0.133,0.462l0.665,0.665L9.624,11.866z"/><path d="M11.066,2.884c-1.061,0-2.185,0.248-3.011,0.604c-0.087,0.034-0.141,0.106-0.15,0.205C7.893,3.784,7.919,3.909,7.982,4.066 c0.05,0.136,0.187,0.474,0.452,0.372c0.844-0.326,1.779-0.507,2.633-0.507c0.963,0,1.9,0.191,2.781,0.564 c0.695,0.292,1.357,0.719,2.078,1.34c0.051,0.044,0.105,0.068,0.164,0.068c0.143,0,0.273-0.137,0.389-0.271 c0.191-0.214,0.324-0.395,0.135-0.575c-0.686-0.654-1.436-1.138-2.363-1.533C13.24,3.097,12.168,2.884,11.066,2.884z"/><path d="M16.43,15.747c-0.092-0.028-0.242,0.05-0.309,0.119l0,0c-0.652,0.652-1.42,1.169-2.268,1.521 c-0.877,0.371-1.814,0.551-2.779,0.551c-0.961,0-1.896-0.189-2.775-0.564c-0.848-0.36-1.612-0.879-2.268-1.53 c-0.682-0.688-1.196-1.455-1.529-2.268c-0.325-0.799-0.471-1.643-0.471-1.643c-0.045-0.24-0.258-0.249-0.567-0.203 c-0.128,0.021-0.519,0.079-0.483,0.36v0.01c0.105,0.644,0.289,1.284,0.545,1.895c0.417,0.969,1.002,1.849,1.756,2.604 c0.757,0.754,1.636,1.34,2.604,1.757C8.901,18.785,9.97,19,11.088,19c1.104,0,2.186-0.215,3.188-0.645 c1.838-0.896,2.604-1.757,2.604-1.757c0.182-0.204,0.227-0.317-0.1-0.643C16.779,15.956,16.525,15.774,16.43,15.747z"/><path d="M5.633,13.287c0.293,0.71,0.723,1.341,1.262,1.882c0.54,0.54,1.172,0.971,1.882,1.264c0.731,0.303,1.509,0.461,2.298,0.461 c0.801,0,1.578-0.158,2.297-0.461c0.711-0.293,1.344-0.724,1.883-1.264c0.543-0.541,0.971-1.172,1.264-1.882 c0.314-0.721,0.463-1.5,0.463-2.298c0-0.79-0.148-1.569-0.463-2.289c-0.293-0.699-0.721-1.329-1.264-1.881 c-0.539-0.541-1.172-0.959-1.867-1.263c-0.721-0.303-1.5-0.461-2.299-0.461c-0.802,0-1.613,0.159-2.322,0.461 c-0.577,0.25-1.544,0.867-2.119,1.454v0.012V2.108h8.16C15.1,2.104,15.1,1.69,15.1,1.552C15.1,1.417,15.1,1,14.809,1H5.915 C5.676,1,5.527,1.192,5.527,1.384v6.84c0,0.214,0.273,0.372,0.529,0.428c0.5,0.105,0.614-0.056,0.737-0.224l0,0 c0.18-0.273,0.776-0.884,0.787-0.894c0.901-0.905,2.117-1.408,3.416-1.408c1.285,0,2.5,0.501,3.412,1.408 c0.914,0.914,1.408,2.122,1.408,3.405c0,1.288-0.508,2.496-1.408,3.405c-0.9,0.896-2.152,1.406-3.438,1.406 c-0.877,0-1.711-0.229-2.433-0.671v-4.158c0-0.553,0.237-1.151,0.643-1.614c0.462-0.519,1.094-0.799,1.782-0.799 c0.664,0,1.293,0.253,1.758,0.715c0.459,0.459,0.709,1.071,0.709,1.723c0,1.385-1.094,2.468-2.488,2.468 c-0.273,0-0.769-0.121-0.781-0.125c-0.281-0.087-0.405,0.306-0.438,0.436c-0.159,0.496,0.079,0.585,0.123,0.607 c0.452,0.137,0.743,0.157,1.129,0.157c1.973,0,3.572-1.6,3.572-3.57c0-1.964-1.6-3.552-3.572-3.552c-0.97,0-1.872,0.36-2.546,1.038 c-0.656,0.631-1.027,1.487-1.027,2.322v3.438v-0.011c-0.372-0.42-0.732-1.041-0.981-1.682c-0.102-0.248-0.315-0.202-0.607-0.113 c-0.135,0.035-0.519,0.157-0.44,0.439C5.372,12.799,5.577,13.164,5.633,13.287z"/></svg>',album:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="2" width="10" height="1"/><rect x="3" y="4" width="14" height="1"/><rect fill="none" stroke="#000" x="1.5" y="6.5" width="17" height="11"/></svg>',"arrow-down":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="10.5,16.08 5.63,10.66 6.37,10 10.5,14.58 14.63,10 15.37,10.66"/><line fill="none" stroke="#000" x1="10.5" y1="4" x2="10.5" y2="15"/></svg>',"arrow-left":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" points="10 14 5 9.5 10 5"/><line fill="none" stroke="#000" x1="16" y1="9.5" x2="5" y2="9.52"/></svg>',"arrow-right":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" points="10 5 15 9.5 10 14"/><line fill="none" stroke="#000" x1="4" y1="9.5" x2="15" y2="9.5"/></svg>',"arrow-up":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="10.5,4 15.37,9.4 14.63,10.08 10.5,5.49 6.37,10.08 5.63,9.4"/><line fill="none" stroke="#000" x1="10.5" y1="16" x2="10.5" y2="5"/></svg>',ban:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.1" cx="10" cy="10" r="9"/><line fill="none" stroke="#000" stroke-width="1.1" x1="4" y1="3.5" x2="16" y2="16.5"/></svg>',behance:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.5,10.6c-0.4-0.5-0.9-0.9-1.6-1.1c1.7-1,2.2-3.2,0.7-4.7C7.8,4,6.3,4,5.2,4C3.5,4,1.7,4,0,4v12c1.7,0,3.4,0,5.2,0 c1,0,2.1,0,3.1-0.5C10.2,14.6,10.5,12.3,9.5,10.6L9.5,10.6z M5.6,6.1c1.8,0,1.8,2.7-0.1,2.7c-1,0-2,0-2.9,0V6.1H5.6z M2.6,13.8v-3.1 c1.1,0,2.1,0,3.2,0c2.1,0,2.1,3.2,0.1,3.2L2.6,13.8z"/><path d="M19.9,10.9C19.7,9.2,18.7,7.6,17,7c-4.2-1.3-7.3,3.4-5.3,7.1c0.9,1.7,2.8,2.3,4.7,2.1c1.7-0.2,2.9-1.3,3.4-2.9h-2.2 c-0.4,1.3-2.4,1.5-3.5,0.6c-0.4-0.4-0.6-1.1-0.6-1.7H20C20,11.7,19.9,10.9,19.9,10.9z M13.5,10.6c0-1.6,2.3-2.7,3.5-1.4 c0.4,0.4,0.5,0.9,0.6,1.4H13.5L13.5,10.6z"/><rect x="13" y="4" width="5" height="1.4"/></svg>',bell:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="1.1" d="M17,15.5 L3,15.5 C2.99,14.61 3.79,13.34 4.1,12.51 C4.58,11.3 4.72,10.35 5.19,7.01 C5.54,4.53 5.89,3.2 7.28,2.16 C8.13,1.56 9.37,1.5 9.81,1.5 L9.96,1.5 C9.96,1.5 11.62,1.41 12.67,2.17 C14.08,3.2 14.42,4.54 14.77,7.02 C15.26,10.35 15.4,11.31 15.87,12.52 C16.2,13.34 17.01,14.61 17,15.5 L17,15.5 Z"/><path fill="none" stroke="#000" d="M12.39,16 C12.39,17.37 11.35,18.43 9.91,18.43 C8.48,18.43 7.42,17.37 7.42,16"/></svg>',bold:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5,15.3 C5.66,15.3 5.9,15 5.9,14.53 L5.9,5.5 C5.9,4.92 5.56,4.7 5,4.7 L5,4 L8.95,4 C12.6,4 13.7,5.37 13.7,6.9 C13.7,7.87 13.14,9.17 10.86,9.59 L10.86,9.7 C13.25,9.86 14.29,11.28 14.3,12.54 C14.3,14.47 12.94,16 9,16 L5,16 L5,15.3 Z M9,9.3 C11.19,9.3 11.8,8.5 11.85,7 C11.85,5.65 11.3,4.8 9,4.8 L7.67,4.8 L7.67,9.3 L9,9.3 Z M9.185,15.22 C11.97,15 12.39,14 12.4,12.58 C12.4,11.15 11.39,10 9,10 L7.67,10 L7.67,15 L9.18,15 Z"/></svg>',bolt:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M4.74,20 L7.73,12 L3,12 L15.43,1 L12.32,9 L17.02,9 L4.74,20 L4.74,20 L4.74,20 Z M9.18,11 L7.1,16.39 L14.47,10 L10.86,10 L12.99,4.67 L5.61,11 L9.18,11 L9.18,11 L9.18,11 Z"/></svg>',bookmark:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon fill="none" stroke="#000" points="5.5 1.5 15.5 1.5 15.5 17.5 10.5 12.5 5.5 17.5"/></svg>',calendar:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M 2,3 2,17 18,17 18,3 2,3 Z M 17,16 3,16 3,8 17,8 17,16 Z M 17,7 3,7 3,4 17,4 17,7 Z"/><rect width="1" height="3" x="6" y="2"/><rect width="1" height="3" x="13" y="2"/></svg>',camera:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.1" cx="10" cy="10.8" r="3.8"/><path fill="none" stroke="#000" d="M1,4.5 C0.7,4.5 0.5,4.7 0.5,5 L0.5,17 C0.5,17.3 0.7,17.5 1,17.5 L19,17.5 C19.3,17.5 19.5,17.3 19.5,17 L19.5,5 C19.5,4.7 19.3,4.5 19,4.5 L13.5,4.5 L13.5,2.9 C13.5,2.6 13.3,2.5 13,2.5 L7,2.5 C6.7,2.5 6.5,2.6 6.5,2.9 L6.5,4.5 L1,4.5 L1,4.5 Z"/></svg>',cart:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle cx="7.3" cy="17.3" r="1.4"/><circle cx="13.3" cy="17.3" r="1.4"/><polyline fill="none" stroke="#000" points="0 2 3.2 4 5.3 12.5 16 12.5 18 6.5 8 6.5"/></svg>',check:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.1" points="4,10 8,15 17,4"/></svg>',"chevron-double-left":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.03" points="10 14 6 10 10 6"/><polyline fill="none" stroke="#000" stroke-width="1.03" points="14 14 10 10 14 6"/></svg>',"chevron-double-right":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.03" points="10 6 14 10 10 14"/><polyline fill="none" stroke="#000" stroke-width="1.03" points="6 6 10 10 6 14"/></svg>',"chevron-down":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.03" points="16 7 10 13 4 7"/></svg>',"chevron-left":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.03" points="13 16 7 10 13 4"/></svg>',"chevron-right":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.03" points="7 4 13 10 7 16"/></svg>',"chevron-up":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.03" points="4 13 10 7 16 13"/></svg>',clock:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.1" cx="10" cy="10" r="9"/><rect x="9" y="4" width="1" height="7"/><path fill="none" stroke="#000" stroke-width="1.1" d="M13.018,14.197 L9.445,10.625"/></svg>',close:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="1.06" d="M16,16 L4,4"/><path fill="none" stroke="#000" stroke-width="1.06" d="M16,4 L4,16"/></svg>',"cloud-download":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="1.1" d="M6.5,14.61 L3.75,14.61 C1.96,14.61 0.5,13.17 0.5,11.39 C0.5,9.76 1.72,8.41 3.3,8.2 C3.38,5.31 5.75,3 8.68,3 C11.19,3 13.31,4.71 13.89,7.02 C14.39,6.8 14.93,6.68 15.5,6.68 C17.71,6.68 19.5,8.45 19.5,10.64 C19.5,12.83 17.71,14.6 15.5,14.6 L12.5,14.6"/><polyline fill="none" stroke="#000" points="11.75 16 9.5 18.25 7.25 16"/><path fill="none" stroke="#000" d="M9.5,18 L9.5,9.5"/></svg>',"cloud-upload":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="1.1" d="M6.5,14.61 L3.75,14.61 C1.96,14.61 0.5,13.17 0.5,11.39 C0.5,9.76 1.72,8.41 3.31,8.2 C3.38,5.31 5.75,3 8.68,3 C11.19,3 13.31,4.71 13.89,7.02 C14.39,6.8 14.93,6.68 15.5,6.68 C17.71,6.68 19.5,8.45 19.5,10.64 C19.5,12.83 17.71,14.6 15.5,14.6 L12.5,14.6"/><polyline fill="none" stroke="#000" points="7.25 11.75 9.5 9.5 11.75 11.75"/><path fill="none" stroke="#000" d="M9.5,18 L9.5,9.5"/></svg>',code:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.01" points="13,4 19,10 13,16"/><polyline fill="none" stroke="#000" stroke-width="1.01" points="7,4 1,10 7,16"/></svg>',cog:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" cx="9.997" cy="10" r="3.31"/><path fill="none" stroke="#000" d="M18.488,12.285 L16.205,16.237 C15.322,15.496 14.185,15.281 13.303,15.791 C12.428,16.289 12.047,17.373 12.246,18.5 L7.735,18.5 C7.938,17.374 7.553,16.299 6.684,15.791 C5.801,15.27 4.655,15.492 3.773,16.237 L1.5,12.285 C2.573,11.871 3.317,10.999 3.317,9.991 C3.305,8.98 2.573,8.121 1.5,7.716 L3.765,3.784 C4.645,4.516 5.794,4.738 6.687,4.232 C7.555,3.722 7.939,2.637 7.735,1.5 L12.263,1.5 C12.072,2.637 12.441,3.71 13.314,4.22 C14.206,4.73 15.343,4.516 16.225,3.794 L18.487,7.714 C17.404,8.117 16.661,8.988 16.67,10.009 C16.672,11.018 17.415,11.88 18.488,12.285 L18.488,12.285 Z"/></svg>',comment:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6,18.71 L6,14 L1,14 L1,1 L19,1 L19,14 L10.71,14 L6,18.71 L6,18.71 Z M2,13 L7,13 L7,16.29 L10.29,13 L18,13 L18,2 L2,2 L2,13 L2,13 Z"/></svg>',commenting:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon fill="none" stroke="#000" points="1.5,1.5 18.5,1.5 18.5,13.5 10.5,13.5 6.5,17.5 6.5,13.5 1.5,13.5"/><circle cx="10" cy="8" r="1"/><circle cx="6" cy="8" r="1"/><circle cx="14" cy="8" r="1"/></svg>',comments:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" points="2 0.5 19.5 0.5 19.5 13"/><path d="M5,19.71 L5,15 L0,15 L0,2 L18,2 L18,15 L9.71,15 L5,19.71 L5,19.71 L5,19.71 Z M1,14 L6,14 L6,17.29 L9.29,14 L17,14 L17,3 L1,3 L1,14 L1,14 L1,14 Z"/></svg>',copy:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect fill="none" stroke="#000" x="3.5" y="2.5" width="12" height="16"/><polyline fill="none" stroke="#000" points="5 0.5 17.5 0.5 17.5 17"/></svg>',"credit-card":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect fill="none" stroke="#000" x="1.5" y="4.5" width="17" height="12"/><rect x="1" y="7" width="18" height="3"/></svg>',database:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><ellipse fill="none" stroke="#000" cx="10" cy="4.64" rx="7.5" ry="3.14"/><path fill="none" stroke="#000" d="M17.5,8.11 C17.5,9.85 14.14,11.25 10,11.25 C5.86,11.25 2.5,9.84 2.5,8.11"/><path fill="none" stroke="#000" d="M17.5,11.25 C17.5,12.99 14.14,14.39 10,14.39 C5.86,14.39 2.5,12.98 2.5,11.25"/><path fill="none" stroke="#000" d="M17.49,4.64 L17.5,14.36 C17.5,16.1 14.14,17.5 10,17.5 C5.86,17.5 2.5,16.09 2.5,14.36 L2.5,4.64"/></svg>',desktop:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="15" width="1" height="2"/><rect x="11" y="15" width="1" height="2"/><rect x="5" y="16" width="10" height="1"/><rect fill="none" stroke="#000" x="1.5" y="3.5" width="17" height="11"/></svg>',download:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" points="14,10 9.5,14.5 5,10"/><rect x="3" y="17" width="13" height="1"/><line fill="none" stroke="#000" x1="9.5" y1="13.91" x2="9.5" y2="3"/></svg>',dribbble:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="1.4" d="M1.3,8.9c0,0,5,0.1,8.6-1c1.4-0.4,2.6-0.9,4-1.9 c1.4-1.1,2.5-2.5,2.5-2.5"/><path fill="none" stroke="#000" stroke-width="1.4" d="M3.9,16.6c0,0,1.7-2.8,3.5-4.2 c1.8-1.3,4-2,5.7-2.2C16,10,19,10.6,19,10.6"/><path fill="none" stroke="#000" stroke-width="1.4" d="M6.9,1.6c0,0,3.3,4.6,4.2,6.8 c0.4,0.9,1.3,3.1,1.9,5.2c0.6,2,0.9,4.4,0.9,4.4"/><circle fill="none" stroke="#000" stroke-width="1.4" cx="10" cy="10" r="9"/></svg>',etsy:'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path d="M8,4.26C8,4.07,8,4,8.31,4h4.46c.79,0,1.22.67,1.53,1.91l.25,1h.76c.14-2.82.26-4,.26-4S13.65,3,12.52,3H6.81L3.75,2.92v.84l1,.2c.73.11.9.27,1,1,0,0,.06,2,.06,5.17s-.06,5.14-.06,5.14c0,.59-.23.81-1,.94l-1,.2v.84l3.06-.1h5.11c1.15,0,3.82.1,3.82.1,0-.7.45-3.88.51-4.22h-.73l-.76,1.69a2.25,2.25,0,0,1-2.45,1.47H9.4c-1,0-1.44-.4-1.44-1.24V10.44s2.16,0,2.86.06c.55,0,.85.19,1.06,1l.23,1H13L12.9,9.94,13,7.41h-.85l-.28,1.13c-.16.74-.28.84-1,1-1,.1-2.89.09-2.89.09Z"/></svg>',expand:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="13 2 18 2 18 7 17 7 17 3 13 3"/><polygon points="2 13 3 13 3 17 7 17 7 18 2 18"/><path fill="none" stroke="#000" stroke-width="1.1" d="M11,9 L17,3"/><path fill="none" stroke="#000" stroke-width="1.1" d="M3,17 L9,11"/></svg>',facebook:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11,10h2.6l0.4-3H11V5.3c0-0.9,0.2-1.5,1.5-1.5H14V1.1c-0.3,0-1-0.1-2.1-0.1C9.6,1,8,2.4,8,5v2H5.5v3H8v8h3V10z"/></svg>',"file-edit":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" d="M18.65,1.68 C18.41,1.45 18.109,1.33 17.81,1.33 C17.499,1.33 17.209,1.45 16.98,1.68 L8.92,9.76 L8,12.33 L10.55,11.41 L18.651,3.34 C19.12,2.87 19.12,2.15 18.65,1.68 L18.65,1.68 L18.65,1.68 Z"/><polyline fill="none" stroke="#000" points="16.5 8.482 16.5 18.5 3.5 18.5 3.5 1.5 14.211 1.5"/></svg>',"file-pdf":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect fill="none" stroke="#000" width="13" height="17" x="3.5" y="1.5"/><path d="M14.65 11.67c-.48.3-1.37-.19-1.79-.37a4.65 4.65 0 0 1 1.49.06c.35.1.36.28.3.31zm-6.3.06l.43-.79a14.7 14.7 0 0 0 .75-1.64 5.48 5.48 0 0 0 1.25 1.55l.2.15a16.36 16.36 0 0 0-2.63.73zM9.5 5.32c.2 0 .32.5.32.97a1.99 1.99 0 0 1-.23 1.04 5.05 5.05 0 0 1-.17-1.3s0-.71.08-.71zm-3.9 9a4.35 4.35 0 0 1 1.21-1.46l.24-.22a4.35 4.35 0 0 1-1.46 1.68zm9.23-3.3a2.05 2.05 0 0 0-1.32-.3 11.07 11.07 0 0 0-1.58.11 4.09 4.09 0 0 1-.74-.5 5.39 5.39 0 0 1-1.32-2.06 10.37 10.37 0 0 0 .28-2.62 1.83 1.83 0 0 0-.07-.25.57.57 0 0 0-.52-.4H9.4a.59.59 0 0 0-.6.38 6.95 6.95 0 0 0 .37 3.14c-.26.63-1 2.12-1 2.12-.3.58-.57 1.08-.82 1.5l-.8.44A3.11 3.11 0 0 0 5 14.16a.39.39 0 0 0 .15.42l.24.13c1.15.56 2.28-1.74 2.66-2.42a23.1 23.1 0 0 1 3.59-.85 4.56 4.56 0 0 0 2.91.8.5.5 0 0 0 .3-.21 1.1 1.1 0 0 0 .12-.75.84.84 0 0 0-.14-.25z"/></svg>',"file-text":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect fill="none" stroke="#000" width="13" height="17" x="3.5" y="1.5"/><line fill="none" stroke="#000" x1="6" x2="12" y1="12.5" y2="12.5"/><line fill="none" stroke="#000" x1="6" x2="14" y1="8.5" y2="8.5"/><line fill="none" stroke="#000" x1="6" x2="14" y1="6.5" y2="6.5"/><line fill="none" stroke="#000" x1="6" x2="14" y1="10.5" y2="10.5"/></svg>',file:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect fill="none" stroke="#000" x="3.5" y="1.5" width="13" height="17"/></svg>',flickr:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle cx="5.5" cy="9.5" r="3.5"/><circle cx="14.5" cy="9.5" r="3.5"/></svg>',folder:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon fill="none" stroke="#000" points="9.5 5.5 8.5 3.5 1.5 3.5 1.5 16.5 18.5 16.5 18.5 5.5"/></svg>',forward:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.47,13.11 C4.02,10.02 6.27,7.85 9.04,6.61 C9.48,6.41 10.27,6.13 11,5.91 L11,2 L18.89,9 L11,16 L11,12.13 C9.25,12.47 7.58,13.19 6.02,14.25 C3.03,16.28 1.63,18.54 1.63,18.54 C1.63,18.54 1.38,15.28 2.47,13.11 L2.47,13.11 Z M5.3,13.53 C6.92,12.4 9.04,11.4 12,10.92 L12,13.63 L17.36,9 L12,4.25 L12,6.8 C11.71,6.86 10.86,7.02 9.67,7.49 C6.79,8.65 4.58,10.96 3.49,13.08 C3.18,13.7 2.68,14.87 2.49,16 C3.28,15.05 4.4,14.15 5.3,13.53 L5.3,13.53 Z"/></svg>',foursquare:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.23,2 C15.96,2 16.4,2.41 16.5,2.86 C16.57,3.15 16.56,3.44 16.51,3.73 C16.46,4.04 14.86,11.72 14.75,12.03 C14.56,12.56 14.16,12.82 13.61,12.83 C13.03,12.84 11.09,12.51 10.69,13 C10.38,13.38 7.79,16.39 6.81,17.53 C6.61,17.76 6.4,17.96 6.08,17.99 C5.68,18.04 5.29,17.87 5.17,17.45 C5.12,17.28 5.1,17.09 5.1,16.91 C5.1,12.4 4.86,7.81 5.11,3.31 C5.17,2.5 5.81,2.12 6.53,2 L15.23,2 L15.23,2 Z M9.76,11.42 C9.94,11.19 10.17,11.1 10.45,11.1 L12.86,11.1 C13.12,11.1 13.31,10.94 13.36,10.69 C13.37,10.64 13.62,9.41 13.74,8.83 C13.81,8.52 13.53,8.28 13.27,8.28 C12.35,8.29 11.42,8.28 10.5,8.28 C9.84,8.28 9.83,7.69 9.82,7.21 C9.8,6.85 10.13,6.55 10.5,6.55 C11.59,6.56 12.67,6.55 13.76,6.55 C14.03,6.55 14.23,6.4 14.28,6.14 C14.34,5.87 14.67,4.29 14.67,4.29 C14.67,4.29 14.82,3.74 14.19,3.74 L7.34,3.74 C7,3.75 6.84,4.02 6.84,4.33 C6.84,7.58 6.85,14.95 6.85,14.99 C6.87,15 8.89,12.51 9.76,11.42 L9.76,11.42 Z"/></svg>',future:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline points="19 2 18 2 18 6 14 6 14 7 19 7 19 2"/><path fill="none" stroke="#000" stroke-width="1.1" d="M18,6.548 C16.709,3.29 13.354,1 9.6,1 C4.6,1 0.6,5 0.6,10 C0.6,15 4.6,19 9.6,19 C14.6,19 18.6,15 18.6,10"/><rect x="9" y="4" width="1" height="7"/><path d="M13.018,14.197 L9.445,10.625" fill="none" stroke="#000" stroke-width="1.1"/></svg>',"git-branch":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.2" cx="7" cy="3" r="2"/><circle fill="none" stroke="#000" stroke-width="1.2" cx="14" cy="6" r="2"/><circle fill="none" stroke="#000" stroke-width="1.2" cx="7" cy="17" r="2"/><path fill="none" stroke="#000" stroke-width="2" d="M14,8 C14,10.41 12.43,10.87 10.56,11.25 C9.09,11.54 7,12.06 7,15 L7,5"/></svg>',"git-fork":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.2" cx="5.79" cy="2.79" r="1.79"/><circle fill="none" stroke="#000" stroke-width="1.2" cx="14.19" cy="2.79" r="1.79"/><circle fill="none" stroke="#000" stroke-width="1.2" cx="10.03" cy="16.79" r="1.79"/><path fill="none" stroke="#000" stroke-width="2" d="M5.79,4.57 L5.79,6.56 C5.79,9.19 10.03,10.22 10.03,13.31 C10.03,14.86 10.04,14.55 10.04,14.55 C10.04,14.37 10.04,14.86 10.04,13.31 C10.04,10.22 14.2,9.19 14.2,6.56 L14.2,4.57"/></svg>',"github-alt":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10,0.5 C4.75,0.5 0.5,4.76 0.5,10.01 C0.5,15.26 4.75,19.51 10,19.51 C15.24,19.51 19.5,15.26 19.5,10.01 C19.5,4.76 15.25,0.5 10,0.5 L10,0.5 Z M12.81,17.69 C12.81,17.69 12.81,17.7 12.79,17.69 C12.47,17.75 12.35,17.59 12.35,17.36 L12.35,16.17 C12.35,15.45 12.09,14.92 11.58,14.56 C12.2,14.51 12.77,14.39 13.26,14.21 C13.87,13.98 14.36,13.69 14.74,13.29 C15.42,12.59 15.76,11.55 15.76,10.17 C15.76,9.25 15.45,8.46 14.83,7.8 C15.1,7.08 15.07,6.29 14.75,5.44 L14.51,5.42 C14.34,5.4 14.06,5.46 13.67,5.61 C13.25,5.78 12.79,6.03 12.31,6.35 C11.55,6.16 10.81,6.05 10.09,6.05 C9.36,6.05 8.61,6.15 7.88,6.35 C7.28,5.96 6.75,5.68 6.26,5.54 C6.07,5.47 5.9,5.44 5.78,5.44 L5.42,5.44 C5.06,6.29 5.04,7.08 5.32,7.8 C4.7,8.46 4.4,9.25 4.4,10.17 C4.4,11.94 4.96,13.16 6.08,13.84 C6.53,14.13 7.05,14.32 7.69,14.43 C8.03,14.5 8.32,14.54 8.55,14.55 C8.07,14.89 7.82,15.42 7.82,16.16 L7.82,17.51 C7.8,17.69 7.7,17.8 7.51,17.8 C4.21,16.74 1.82,13.65 1.82,10.01 C1.82,5.5 5.49,1.83 10,1.83 C14.5,1.83 18.17,5.5 18.17,10.01 C18.18,13.53 15.94,16.54 12.81,17.69 L12.81,17.69 Z"/></svg>',github:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10,1 C5.03,1 1,5.03 1,10 C1,13.98 3.58,17.35 7.16,18.54 C7.61,18.62 7.77,18.34 7.77,18.11 C7.77,17.9 7.76,17.33 7.76,16.58 C5.26,17.12 4.73,15.37 4.73,15.37 C4.32,14.33 3.73,14.05 3.73,14.05 C2.91,13.5 3.79,13.5 3.79,13.5 C4.69,13.56 5.17,14.43 5.17,14.43 C5.97,15.8 7.28,15.41 7.79,15.18 C7.87,14.6 8.1,14.2 8.36,13.98 C6.36,13.75 4.26,12.98 4.26,9.53 C4.26,8.55 4.61,7.74 5.19,7.11 C5.1,6.88 4.79,5.97 5.28,4.73 C5.28,4.73 6.04,4.49 7.75,5.65 C8.47,5.45 9.24,5.35 10,5.35 C10.76,5.35 11.53,5.45 12.25,5.65 C13.97,4.48 14.72,4.73 14.72,4.73 C15.21,5.97 14.9,6.88 14.81,7.11 C15.39,7.74 15.73,8.54 15.73,9.53 C15.73,12.99 13.63,13.75 11.62,13.97 C11.94,14.25 12.23,14.8 12.23,15.64 C12.23,16.84 12.22,17.81 12.22,18.11 C12.22,18.35 12.38,18.63 12.84,18.54 C16.42,17.35 19,13.98 19,10 C19,5.03 14.97,1 10,1 L10,1 Z"/></svg>',gitter:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="3.5" y="1" width="1.531" height="11.471"/><rect x="7.324" y="4.059" width="1.529" height="15.294"/><rect x="11.148" y="4.059" width="1.527" height="15.294"/><rect x="14.971" y="4.059" width="1.529" height="8.412"/></svg>',"google-plus":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M12.9,9c0,2.7-0.6,5-3.2,6.3c-3.7,1.8-8.1,0.2-9.4-3.6C-1.1,7.6,1.9,3.3,6.1,3c1.7-0.1,3.2,0.3,4.6,1.3 c0.1,0.1,0.3,0.2,0.4,0.4c-0.5,0.5-1.2,1-1.7,1.6c-1-0.8-2.1-1.1-3.5-0.9C5,5.6,4.2,6,3.6,6.7c-1.3,1.3-1.5,3.4-0.5,5 c1,1.7,2.6,2.3,4.6,1.9c1.4-0.3,2.4-1.2,2.6-2.6H6.9V9H12.9z"/><polygon points="20,9 20,11 18,11 18,13 16,13 16,11 14,11 14,9 16,9 16,7 18,7 18,9"/></svg>',google:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.86,9.09 C18.46,12.12 17.14,16.05 13.81,17.56 C9.45,19.53 4.13,17.68 2.47,12.87 C0.68,7.68 4.22,2.42 9.5,2.03 C11.57,1.88 13.42,2.37 15.05,3.65 C15.22,3.78 15.37,3.93 15.61,4.14 C14.9,4.81 14.23,5.45 13.5,6.14 C12.27,5.08 10.84,4.72 9.28,4.98 C8.12,5.17 7.16,5.76 6.37,6.63 C4.88,8.27 4.62,10.86 5.76,12.82 C6.95,14.87 9.17,15.8 11.57,15.25 C13.27,14.87 14.76,13.33 14.89,11.75 L10.51,11.75 L10.51,9.09 L17.86,9.09 L17.86,9.09 Z"/></svg>',grid:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="3" height="3"/><rect x="8" y="2" width="3" height="3"/><rect x="14" y="2" width="3" height="3"/><rect x="2" y="8" width="3" height="3"/><rect x="8" y="8" width="3" height="3"/><rect x="14" y="8" width="3" height="3"/><rect x="2" y="14" width="3" height="3"/><rect x="8" y="14" width="3" height="3"/><rect x="14" y="14" width="3" height="3"/></svg>',happy:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle cx="13" cy="7" r="1"/><circle cx="7" cy="7" r="1"/><circle fill="none" stroke="#000" cx="10" cy="10" r="8.5"/><path fill="none" stroke="#000" d="M14.6,11.4 C13.9,13.3 12.1,14.5 10,14.5 C7.9,14.5 6.1,13.3 5.4,11.4"/></svg>',hashtag:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.431,8 L15.661,7 L12.911,7 L13.831,3 L12.901,3 L11.98,7 L9.29,7 L10.21,3 L9.281,3 L8.361,7 L5.23,7 L5,8 L8.13,8 L7.21,12 L4.23,12 L4,13 L6.98,13 L6.061,17 L6.991,17 L7.911,13 L10.601,13 L9.681,17 L10.611,17 L11.531,13 L14.431,13 L14.661,12 L11.76,12 L12.681,8 L15.431,8 Z M10.831,12 L8.141,12 L9.061,8 L11.75,8 L10.831,12 Z"/></svg>',heart:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="1.03" d="M10,4 C10,4 8.1,2 5.74,2 C3.38,2 1,3.55 1,6.73 C1,8.84 2.67,10.44 2.67,10.44 L10,18 L17.33,10.44 C17.33,10.44 19,8.84 19,6.73 C19,3.55 16.62,2 14.26,2 C11.9,2 10,4 10,4 L10,4 Z"/></svg>',history:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="#000" points="1 2 2 2 2 6 6 6 6 7 1 7 1 2"/><path fill="none" stroke="#000" stroke-width="1.1" d="M2.1,6.548 C3.391,3.29 6.746,1 10.5,1 C15.5,1 19.5,5 19.5,10 C19.5,15 15.5,19 10.5,19 C5.5,19 1.5,15 1.5,10"/><rect x="9" y="4" width="1" height="7"/><path fill="none" stroke="#000" stroke-width="1.1" d="M13.018,14.197 L9.445,10.625"/></svg>',home:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="18.65 11.35 10 2.71 1.35 11.35 0.65 10.65 10 1.29 19.35 10.65"/><polygon points="15 4 18 4 18 7 17 7 17 5 15 5"/><polygon points="3 11 4 11 4 18 7 18 7 12 12 12 12 18 16 18 16 11 17 11 17 19 11 19 11 13 8 13 8 19 3 19"/></svg>',image:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle cx="16.1" cy="6.1" r="1.1"/><rect fill="none" stroke="#000" x=".5" y="2.5" width="19" height="15"/><polyline fill="none" stroke="#000" stroke-width="1.01" points="4,13 8,9 13,14"/><polyline fill="none" stroke="#000" stroke-width="1.01" points="11,12 12.5,10.5 16,14"/></svg>',info:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M12.13,11.59 C11.97,12.84 10.35,14.12 9.1,14.16 C6.17,14.2 9.89,9.46 8.74,8.37 C9.3,8.16 10.62,7.83 10.62,8.81 C10.62,9.63 10.12,10.55 9.88,11.32 C8.66,15.16 12.13,11.15 12.14,11.18 C12.16,11.21 12.16,11.35 12.13,11.59 C12.08,11.95 12.16,11.35 12.13,11.59 L12.13,11.59 Z M11.56,5.67 C11.56,6.67 9.36,7.15 9.36,6.03 C9.36,5 11.56,4.54 11.56,5.67 L11.56,5.67 Z"/><circle fill="none" stroke="#000" stroke-width="1.1" cx="10" cy="10" r="9"/></svg>',instagram:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M13.55,1H6.46C3.45,1,1,3.44,1,6.44v7.12c0,3,2.45,5.44,5.46,5.44h7.08c3.02,0,5.46-2.44,5.46-5.44V6.44 C19.01,3.44,16.56,1,13.55,1z M17.5,14c0,1.93-1.57,3.5-3.5,3.5H6c-1.93,0-3.5-1.57-3.5-3.5V6c0-1.93,1.57-3.5,3.5-3.5h8 c1.93,0,3.5,1.57,3.5,3.5V14z"/><circle cx="14.87" cy="5.26" r="1.09"/><path d="M10.03,5.45c-2.55,0-4.63,2.06-4.63,4.6c0,2.55,2.07,4.61,4.63,4.61c2.56,0,4.63-2.061,4.63-4.61 C14.65,7.51,12.58,5.45,10.03,5.45L10.03,5.45L10.03,5.45z M10.08,13c-1.66,0-3-1.34-3-2.99c0-1.65,1.34-2.99,3-2.99s3,1.34,3,2.99 C13.08,11.66,11.74,13,10.08,13L10.08,13L10.08,13z"/></svg>',italic:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M12.63,5.48 L10.15,14.52 C10,15.08 10.37,15.25 11.92,15.3 L11.72,16 L6,16 L6.2,15.31 C7.78,15.26 8.19,15.09 8.34,14.53 L10.82,5.49 C10.97,4.92 10.63,4.76 9.09,4.71 L9.28,4 L15,4 L14.81,4.69 C13.23,4.75 12.78,4.91 12.63,5.48 L12.63,5.48 Z"/></svg>',joomla:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7.8,13.4l1.7-1.7L5.9,8c-0.6-0.5-0.6-1.5,0-2c0.6-0.6,1.4-0.6,2,0l1.7-1.7c-1-1-2.3-1.3-3.6-1C5.8,2.2,4.8,1.4,3.7,1.4 c-1.3,0-2.3,1-2.3,2.3c0,1.1,0.8,2,1.8,2.3c-0.4,1.3-0.1,2.8,1,3.8L7.8,13.4L7.8,13.4z"/><path d="M10.2,4.3c1-1,2.5-1.4,3.8-1c0.2-1.1,1.1-2,2.3-2c1.3,0,2.3,1,2.3,2.3c0,1.2-0.9,2.2-2,2.3c0.4,1.3,0,2.8-1,3.8L13.9,8 c0.6-0.5,0.6-1.5,0-2c-0.5-0.6-1.5-0.6-2,0L8.2,9.7L6.5,8"/><path d="M14.1,16.8c-1.3,0.4-2.8,0.1-3.8-1l1.7-1.7c0.6,0.6,1.5,0.6,2,0c0.5-0.6,0.6-1.5,0-2l-3.7-3.7L12,6.7l3.7,3.7 c1,1,1.3,2.4,1,3.6c1.1,0.2,2,1.1,2,2.3c0,1.3-1,2.3-2.3,2.3C15.2,18.6,14.3,17.8,14.1,16.8"/><path d="M13.2,12.2l-3.7,3.7c-1,1-2.4,1.3-3.6,1c-0.2,1-1.2,1.8-2.2,1.8c-1.3,0-2.3-1-2.3-2.3c0-1.1,0.8-2,1.8-2.3 c-0.3-1.3,0-2.7,1-3.7l1.7,1.7c-0.6,0.6-0.6,1.5,0,2c0.6,0.6,1.4,0.6,2,0l3.7-3.7"/></svg>',laptop:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect y="16" width="20" height="1"/><rect fill="none" stroke="#000" x="2.5" y="4.5" width="15" height="10"/></svg>',lifesaver:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10,0.5 C4.76,0.5 0.5,4.76 0.5,10 C0.5,15.24 4.76,19.5 10,19.5 C15.24,19.5 19.5,15.24 19.5,10 C19.5,4.76 15.24,0.5 10,0.5 L10,0.5 Z M10,1.5 C11.49,1.5 12.89,1.88 14.11,2.56 L11.85,4.82 C11.27,4.61 10.65,4.5 10,4.5 C9.21,4.5 8.47,4.67 7.79,4.96 L5.58,2.75 C6.87,1.95 8.38,1.5 10,1.5 L10,1.5 Z M4.96,7.8 C4.67,8.48 4.5,9.21 4.5,10 C4.5,10.65 4.61,11.27 4.83,11.85 L2.56,14.11 C1.88,12.89 1.5,11.49 1.5,10 C1.5,8.38 1.95,6.87 2.75,5.58 L4.96,7.79 L4.96,7.8 L4.96,7.8 Z M10,18.5 C8.25,18.5 6.62,17.97 5.27,17.06 L7.46,14.87 C8.22,15.27 9.08,15.5 10,15.5 C10.79,15.5 11.53,15.33 12.21,15.04 L14.42,17.25 C13.13,18.05 11.62,18.5 10,18.5 L10,18.5 Z M10,14.5 C7.52,14.5 5.5,12.48 5.5,10 C5.5,7.52 7.52,5.5 10,5.5 C12.48,5.5 14.5,7.52 14.5,10 C14.5,12.48 12.48,14.5 10,14.5 L10,14.5 Z M15.04,12.21 C15.33,11.53 15.5,10.79 15.5,10 C15.5,9.08 15.27,8.22 14.87,7.46 L17.06,5.27 C17.97,6.62 18.5,8.25 18.5,10 C18.5,11.62 18.05,13.13 17.25,14.42 L15.04,12.21 L15.04,12.21 Z"/></svg>',link:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="1.1" d="M10.625,12.375 L7.525,15.475 C6.825,16.175 5.925,16.175 5.225,15.475 L4.525,14.775 C3.825,14.074 3.825,13.175 4.525,12.475 L7.625,9.375"/><path fill="none" stroke="#000" stroke-width="1.1" d="M9.325,7.375 L12.425,4.275 C13.125,3.575 14.025,3.575 14.724,4.275 L15.425,4.975 C16.125,5.675 16.125,6.575 15.425,7.275 L12.325,10.375"/><path fill="none" stroke="#000" stroke-width="1.1" d="M7.925,11.875 L11.925,7.975"/></svg>',linkedin:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5.77,17.89 L5.77,7.17 L2.21,7.17 L2.21,17.89 L5.77,17.89 L5.77,17.89 Z M3.99,5.71 C5.23,5.71 6.01,4.89 6.01,3.86 C5.99,2.8 5.24,2 4.02,2 C2.8,2 2,2.8 2,3.85 C2,4.88 2.77,5.7 3.97,5.7 L3.99,5.7 L3.99,5.71 L3.99,5.71 Z"/><path d="M7.75,17.89 L11.31,17.89 L11.31,11.9 C11.31,11.58 11.33,11.26 11.43,11.03 C11.69,10.39 12.27,9.73 13.26,9.73 C14.55,9.73 15.06,10.71 15.06,12.15 L15.06,17.89 L18.62,17.89 L18.62,11.74 C18.62,8.45 16.86,6.92 14.52,6.92 C12.6,6.92 11.75,7.99 11.28,8.73 L11.3,8.73 L11.3,7.17 L7.75,7.17 C7.79,8.17 7.75,17.89 7.75,17.89 L7.75,17.89 L7.75,17.89 Z"/></svg>',list:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="4" width="12" height="1"/><rect x="6" y="9" width="12" height="1"/><rect x="6" y="14" width="12" height="1"/><rect x="2" y="4" width="2" height="1"/><rect x="2" y="9" width="2" height="1"/><rect x="2" y="14" width="2" height="1"/></svg>',location:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="1.01" d="M10,0.5 C6.41,0.5 3.5,3.39 3.5,6.98 C3.5,11.83 10,19 10,19 C10,19 16.5,11.83 16.5,6.98 C16.5,3.39 13.59,0.5 10,0.5 L10,0.5 Z"/><circle fill="none" stroke="#000" cx="10" cy="6.8" r="2.3"/></svg>',lock:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect fill="none" stroke="#000" height="10" width="13" y="8.5" x="3.5"/><path fill="none" stroke="#000" d="M6.5,8 L6.5,4.88 C6.5,3.01 8.07,1.5 10,1.5 C11.93,1.5 13.5,3.01 13.5,4.88 L13.5,8"/></svg>',mail:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" points="1.4,6.5 10,11 18.6,6.5"/><path d="M 1,4 1,16 19,16 19,4 1,4 Z M 18,15 2,15 2,5 18,5 18,15 Z"/></svg>',menu:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="4" width="16" height="1"/><rect x="2" y="9" width="16" height="1"/><rect x="2" y="14" width="16" height="1"/></svg>',microphone:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><line fill="none" stroke="#000" x1="10" x2="10" y1="16.44" y2="18.5"/><line fill="none" stroke="#000" x1="7" x2="13" y1="18.5" y2="18.5"/><path fill="none" stroke="#000" stroke-width="1.1" d="M13.5 4.89v5.87a3.5 3.5 0 0 1-7 0V4.89a3.5 3.5 0 0 1 7 0z"/><path fill="none" stroke="#000" stroke-width="1.1" d="M15.5 10.36V11a5.5 5.5 0 0 1-11 0v-.6"/></svg>',"minus-circle":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.1" cx="9.5" cy="9.5" r="9"/><line fill="none" stroke="#000" x1="5" y1="9.5" x2="14" y2="9.5"/></svg>',minus:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect height="1" width="18" y="9" x="1"/></svg>',"more-vertical":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="3" r="2"/><circle cx="10" cy="10" r="2"/><circle cx="10" cy="17" r="2"/></svg>',more:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle cx="3" cy="10" r="2"/><circle cx="10" cy="10" r="2"/><circle cx="17" cy="10" r="2"/></svg>',move:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="4,5 1,5 1,9 2,9 2,6 4,6"/><polygon points="1,16 2,16 2,18 4,18 4,19 1,19"/><polygon points="14,16 14,19 11,19 11,18 13,18 13,16"/><rect fill="none" stroke="#000" x="5.5" y="1.5" width="13" height="13"/><rect x="1" y="11" width="1" height="3"/><rect x="6" y="18" width="3" height="1"/></svg>',nut:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon fill="none" stroke="#000" points="2.5,5.7 10,1.3 17.5,5.7 17.5,14.3 10,18.7 2.5,14.3"/><circle fill="none" stroke="#000" cx="10" cy="10" r="3.5"/></svg>',pagekit:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="3,1 17,1 17,16 10,16 10,13 14,13 14,4 6,4 6,16 10,16 10,19 3,19"/></svg>',"paint-bucket":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.21,1 L0,11.21 L8.1,19.31 L18.31,9.1 L10.21,1 L10.21,1 Z M16.89,9.1 L15,11 L1.7,11 L10.21,2.42 L16.89,9.1 Z"/><path fill="none" stroke="#000" stroke-width="1.1" d="M6.42,2.33 L11.7,7.61"/><path d="M18.49,12 C18.49,12 20,14.06 20,15.36 C20,16.28 19.24,17 18.49,17 L18.49,17 C17.74,17 17,16.28 17,15.36 C17,14.06 18.49,12 18.49,12 L18.49,12 Z"/></svg>',pencil:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" d="M17.25,6.01 L7.12,16.1 L3.82,17.2 L5.02,13.9 L15.12,3.88 C15.71,3.29 16.66,3.29 17.25,3.88 C17.83,4.47 17.83,5.42 17.25,6.01 L17.25,6.01 Z"/><path fill="none" stroke="#000" d="M15.98,7.268 L13.851,5.148"/></svg>',"phone-landscape":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" d="M17,5.5 C17.8,5.5 18.5,6.2 18.5,7 L18.5,14 C18.5,14.8 17.8,15.5 17,15.5 L3,15.5 C2.2,15.5 1.5,14.8 1.5,14 L1.5,7 C1.5,6.2 2.2,5.5 3,5.5 L17,5.5 L17,5.5 L17,5.5 Z"/><circle cx="3.8" cy="10.5" r=".8"/></svg>',phone:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" d="M15.5,17 C15.5,17.8 14.8,18.5 14,18.5 L7,18.5 C6.2,18.5 5.5,17.8 5.5,17 L5.5,3 C5.5,2.2 6.2,1.5 7,1.5 L14,1.5 C14.8,1.5 15.5,2.2 15.5,3 L15.5,17 L15.5,17 L15.5,17 Z"/><circle cx="10.5" cy="16.5" r=".8"/></svg>',pinterest:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.21,1 C5.5,1 3,4.16 3,7.61 C3,9.21 3.85,11.2 5.22,11.84 C5.43,11.94 5.54,11.89 5.58,11.69 C5.62,11.54 5.8,10.8 5.88,10.45 C5.91,10.34 5.89,10.24 5.8,10.14 C5.36,9.59 5,8.58 5,7.65 C5,5.24 6.82,2.91 9.93,2.91 C12.61,2.91 14.49,4.74 14.49,7.35 C14.49,10.3 13,12.35 11.06,12.35 C9.99,12.35 9.19,11.47 9.44,10.38 C9.75,9.08 10.35,7.68 10.35,6.75 C10.35,5.91 9.9,5.21 8.97,5.21 C7.87,5.21 6.99,6.34 6.99,7.86 C6.99,8.83 7.32,9.48 7.32,9.48 C7.32,9.48 6.24,14.06 6.04,14.91 C5.7,16.35 6.08,18.7 6.12,18.9 C6.14,19.01 6.26,19.05 6.33,18.95 C6.44,18.81 7.74,16.85 8.11,15.44 C8.24,14.93 8.79,12.84 8.79,12.84 C9.15,13.52 10.19,14.09 11.29,14.09 C14.58,14.09 16.96,11.06 16.96,7.3 C16.94,3.7 14,1 10.21,1"/></svg>',"play-circle":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon fill="none" stroke="#000" stroke-width="1.1" points="8.5 7 13.5 10 8.5 13"/><circle fill="none" stroke="#000" stroke-width="1.1" cx="10" cy="10" r="9"/></svg>',play:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon fill="none" stroke="#000" points="6.5,5 14.5,10 6.5,15"/></svg>',"plus-circle":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.1" cx="9.5" cy="9.5" r="9"/><line fill="none" stroke="#000" x1="9.5" y1="5" x2="9.5" y2="14"/><line fill="none" stroke="#000" x1="5" y1="9.5" x2="14" y2="9.5"/></svg>',plus:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="9" y="1" width="1" height="17"/><rect x="1" y="9" width="17" height="1"/></svg>',print:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" points="4.5 13.5 1.5 13.5 1.5 6.5 18.5 6.5 18.5 13.5 15.5 13.5"/><polyline fill="none" stroke="#000" points="15.5 6.5 15.5 2.5 4.5 2.5 4.5 6.5"/><rect fill="none" stroke="#000" width="11" height="6" x="4.5" y="11.5"/><rect width="8" height="1" x="6" y="13"/><rect width="8" height="1" x="6" y="15"/></svg>',pull:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="6.85,8 9.5,10.6 12.15,8 12.85,8.7 9.5,12 6.15,8.7"/><line fill="none" stroke="#000" x1="9.5" y1="11" x2="9.5" y2="2"/><polyline fill="none" stroke="#000" points="6,5.5 3.5,5.5 3.5,18.5 15.5,18.5 15.5,5.5 13,5.5"/></svg>',push:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="12.15,4 9.5,1.4 6.85,4 6.15,3.3 9.5,0 12.85,3.3"/><line fill="none" stroke="#000" x1="9.5" y1="10" x2="9.5" y2="1"/><polyline fill="none" stroke="#000" points="6 5.5 3.5 5.5 3.5 18.5 15.5 18.5 15.5 5.5 13 5.5"/></svg>',question:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.1" cx="10" cy="10" r="9"/><circle cx="10.44" cy="14.42" r="1.05"/><path fill="none" stroke="#000" stroke-width="1.2" d="M8.17,7.79 C8.17,4.75 12.72,4.73 12.72,7.72 C12.72,8.67 11.81,9.15 11.23,9.75 C10.75,10.24 10.51,10.73 10.45,11.4 C10.44,11.53 10.43,11.64 10.43,11.75"/></svg>',"quote-right":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.27,7.79 C17.27,9.45 16.97,10.43 15.99,12.02 C14.98,13.64 13,15.23 11.56,15.97 L11.1,15.08 C12.34,14.2 13.14,13.51 14.02,11.82 C14.27,11.34 14.41,10.92 14.49,10.54 C14.3,10.58 14.09,10.6 13.88,10.6 C12.06,10.6 10.59,9.12 10.59,7.3 C10.59,5.48 12.06,4 13.88,4 C15.39,4 16.67,5.02 17.05,6.42 C17.19,6.82 17.27,7.27 17.27,7.79 L17.27,7.79 Z"/><path d="M8.68,7.79 C8.68,9.45 8.38,10.43 7.4,12.02 C6.39,13.64 4.41,15.23 2.97,15.97 L2.51,15.08 C3.75,14.2 4.55,13.51 5.43,11.82 C5.68,11.34 5.82,10.92 5.9,10.54 C5.71,10.58 5.5,10.6 5.29,10.6 C3.47,10.6 2,9.12 2,7.3 C2,5.48 3.47,4 5.29,4 C6.8,4 8.08,5.02 8.46,6.42 C8.6,6.82 8.68,7.27 8.68,7.79 L8.68,7.79 Z"/></svg>',receiver:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="1.01" d="M6.189,13.611C8.134,15.525 11.097,18.239 13.867,18.257C16.47,18.275 18.2,16.241 18.2,16.241L14.509,12.551L11.539,13.639L6.189,8.29L7.313,5.355L3.76,1.8C3.76,1.8 1.732,3.537 1.7,6.092C1.667,8.809 4.347,11.738 6.189,13.611"/></svg>',reddit:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M19 9.05a2.56 2.56 0 0 0-2.56-2.56 2.59 2.59 0 0 0-1.88.82 10.63 10.63 0 0 0-4.14-1v-.08c.58-1.62 1.58-3.89 2.7-4.1.38-.08.77.12 1.19.57a1.15 1.15 0 0 0-.06.37 1.48 1.48 0 1 0 1.51-1.45 1.43 1.43 0 0 0-.76.19A2.29 2.29 0 0 0 12.91 1c-2.11.43-3.39 4.38-3.63 5.19 0 0 0 .11-.06.11a10.65 10.65 0 0 0-3.75 1A2.56 2.56 0 0 0 1 9.05a2.42 2.42 0 0 0 .72 1.76A5.18 5.18 0 0 0 1.24 13c0 3.66 3.92 6.64 8.73 6.64s8.74-3 8.74-6.64a5.23 5.23 0 0 0-.46-2.13A2.58 2.58 0 0 0 19 9.05zm-16.88 0a1.44 1.44 0 0 1 2.27-1.19 7.68 7.68 0 0 0-2.07 1.91 1.33 1.33 0 0 1-.2-.72zM10 18.4c-4.17 0-7.55-2.4-7.55-5.4S5.83 7.53 10 7.53 17.5 10 17.5 13s-3.38 5.4-7.5 5.4zm7.69-8.61a7.62 7.62 0 0 0-2.09-1.91 1.41 1.41 0 0 1 .84-.28 1.47 1.47 0 0 1 1.44 1.45 1.34 1.34 0 0 1-.21.72z"/><path d="M6.69 12.58a1.39 1.39 0 1 1 1.39-1.39 1.38 1.38 0 0 1-1.38 1.39z"/><path d="M14.26 11.2a1.39 1.39 0 1 1-1.39-1.39 1.39 1.39 0 0 1 1.39 1.39z"/><path d="M13.09 14.88a.54.54 0 0 1-.09.77 5.3 5.3 0 0 1-3.26 1.19 5.61 5.61 0 0 1-3.4-1.22.55.55 0 1 1 .73-.83 4.09 4.09 0 0 0 5.25 0 .56.56 0 0 1 .77.09z"/></svg>',refresh:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="1.1" d="M17.08,11.15 C17.09,11.31 17.1,11.47 17.1,11.64 C17.1,15.53 13.94,18.69 10.05,18.69 C6.16,18.68 3,15.53 3,11.63 C3,7.74 6.16,4.58 10.05,4.58 C10.9,4.58 11.71,4.73 12.46,5"/><polyline fill="none" stroke="#000" points="9.9 2 12.79 4.89 9.79 7.9"/></svg>',reply:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.7,13.11 C16.12,10.02 13.84,7.85 11.02,6.61 C10.57,6.41 9.75,6.13 9,5.91 L9,2 L1,9 L9,16 L9,12.13 C10.78,12.47 12.5,13.19 14.09,14.25 C17.13,16.28 18.56,18.54 18.56,18.54 C18.56,18.54 18.81,15.28 17.7,13.11 L17.7,13.11 Z M14.82,13.53 C13.17,12.4 11.01,11.4 8,10.92 L8,13.63 L2.55,9 L8,4.25 L8,6.8 C8.3,6.86 9.16,7.02 10.37,7.49 C13.3,8.65 15.54,10.96 16.65,13.08 C16.97,13.7 17.48,14.86 17.68,16 C16.87,15.05 15.73,14.15 14.82,13.53 L14.82,13.53 Z"/></svg>',rss:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle cx="3.12" cy="16.8" r="1.85"/><path fill="none" stroke="#000" stroke-width="1.1" d="M1.5,8.2 C1.78,8.18 2.06,8.16 2.35,8.16 C7.57,8.16 11.81,12.37 11.81,17.57 C11.81,17.89 11.79,18.19 11.76,18.5"/><path fill="none" stroke="#000" stroke-width="1.1" d="M1.5,2.52 C1.78,2.51 2.06,2.5 2.35,2.5 C10.72,2.5 17.5,9.24 17.5,17.57 C17.5,17.89 17.49,18.19 17.47,18.5"/></svg>',search:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.1" cx="9" cy="9" r="7"/><path fill="none" stroke="#000" stroke-width="1.1" d="M14,14 L18,18 L14,14 Z"/></svg>',server:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="1" height="2"/><rect x="5" y="3" width="1" height="2"/><rect x="7" y="3" width="1" height="2"/><rect x="16" y="3" width="1" height="1"/><rect x="16" y="10" width="1" height="1"/><circle fill="none" stroke="#000" cx="9.9" cy="17.4" r="1.4"/><rect x="3" y="10" width="1" height="2"/><rect x="5" y="10" width="1" height="2"/><rect x="9.5" y="14" width="1" height="2"/><rect x="3" y="17" width="6" height="1"/><rect x="11" y="17" width="6" height="1"/><rect fill="none" stroke="#000" x="1.5" y="1.5" width="17" height="5"/><rect fill="none" stroke="#000" x="1.5" y="8.5" width="17" height="5"/></svg>',settings:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><ellipse fill="none" stroke="#000" cx="6.11" cy="3.55" rx="2.11" ry="2.15"/><ellipse fill="none" stroke="#000" cx="6.11" cy="15.55" rx="2.11" ry="2.15"/><circle fill="none" stroke="#000" cx="13.15" cy="9.55" r="2.15"/><rect x="1" y="3" width="3" height="1"/><rect x="10" y="3" width="8" height="1"/><rect x="1" y="9" width="8" height="1"/><rect x="15" y="9" width="3" height="1"/><rect x="1" y="15" width="3" height="1"/><rect x="10" y="15" width="8" height="1"/></svg>',shrink:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="11 4 12 4 12 8 16 8 16 9 11 9"/><polygon points="4 11 9 11 9 16 8 16 8 12 4 12"/><path fill="none" stroke="#000" stroke-width="1.1" d="M12,8 L18,2"/><path fill="none" stroke="#000" stroke-width="1.1" d="M2,18 L8,12"/></svg>',"sign-in":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="7 2 17 2 17 17 7 17 7 16 16 16 16 3 7 3"/><polygon points="9.1 13.4 8.5 12.8 11.28 10 4 10 4 9 11.28 9 8.5 6.2 9.1 5.62 13 9.5"/></svg>',"sign-out":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="13.1 13.4 12.5 12.8 15.28 10 8 10 8 9 15.28 9 12.5 6.2 13.1 5.62 17 9.5"/><polygon points="13 2 3 2 3 17 13 17 13 16 4 16 4 3 13 3"/></svg>',social:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><line fill="none" stroke="#000" stroke-width="1.1" x1="13.4" y1="14" x2="6.3" y2="10.7"/><line fill="none" stroke="#000" stroke-width="1.1" x1="13.5" y1="5.5" x2="6.5" y2="8.8"/><circle fill="none" stroke="#000" stroke-width="1.1" cx="15.5" cy="4.6" r="2.3"/><circle fill="none" stroke="#000" stroke-width="1.1" cx="15.5" cy="14.8" r="2.3"/><circle fill="none" stroke="#000" stroke-width="1.1" cx="4.5" cy="9.8" r="2.3"/></svg>',soundcloud:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.2,9.4c-0.4,0-0.8,0.1-1.101,0.2c-0.199-2.5-2.399-4.5-5-4.5c-0.6,0-1.2,0.1-1.7,0.3C9.2,5.5,9.1,5.6,9.1,5.6V15h8 c1.601,0,2.801-1.2,2.801-2.8C20,10.7,18.7,9.4,17.2,9.4L17.2,9.4z"/><rect x="6" y="6.5" width="1.5" height="8.5"/><rect x="3" y="8" width="1.5" height="7"/><rect y="10" width="1.5" height="5"/></svg>',star:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon fill="none" stroke="#000" stroke-width="1.01" points="10 2 12.63 7.27 18.5 8.12 14.25 12.22 15.25 18 10 15.27 4.75 18 5.75 12.22 1.5 8.12 7.37 7.27"/></svg>',strikethrough:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6,13.02 L6.65,13.02 C7.64,15.16 8.86,16.12 10.41,16.12 C12.22,16.12 12.92,14.93 12.92,13.89 C12.92,12.55 11.99,12.03 9.74,11.23 C8.05,10.64 6.23,10.11 6.23,7.83 C6.23,5.5 8.09,4.09 10.4,4.09 C11.44,4.09 12.13,4.31 12.72,4.54 L13.33,4 L13.81,4 L13.81,7.59 L13.16,7.59 C12.55,5.88 11.52,4.89 10.07,4.89 C8.84,4.89 7.89,5.69 7.89,7.03 C7.89,8.29 8.89,8.78 10.88,9.45 C12.57,10.03 14.38,10.6 14.38,12.91 C14.38,14.75 13.27,16.93 10.18,16.93 C9.18,16.93 8.17,16.69 7.46,16.39 L6.52,17 L6,17 L6,13.02 L6,13.02 Z"/><rect x="3" y="10" width="15" height="1"/></svg>',table:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="3" width="18" height="1"/><rect x="1" y="7" width="18" height="1"/><rect x="1" y="11" width="18" height="1"/><rect x="1" y="15" width="18" height="1"/></svg>',"tablet-landscape":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" d="M1.5,5 C1.5,4.2 2.2,3.5 3,3.5 L17,3.5 C17.8,3.5 18.5,4.2 18.5,5 L18.5,16 C18.5,16.8 17.8,17.5 17,17.5 L3,17.5 C2.2,17.5 1.5,16.8 1.5,16 L1.5,5 L1.5,5 L1.5,5 Z"/><circle cx="3.7" cy="10.5" r=".8"/></svg>',tablet:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" d="M5,18.5 C4.2,18.5 3.5,17.8 3.5,17 L3.5,3 C3.5,2.2 4.2,1.5 5,1.5 L16,1.5 C16.8,1.5 17.5,2.2 17.5,3 L17.5,17 C17.5,17.8 16.8,18.5 16,18.5 L5,18.5 L5,18.5 L5,18.5 Z"/><circle cx="10.5" cy="16.3" r=".8"/></svg>',tag:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="1.1" d="M17.5,3.71 L17.5,7.72 C17.5,7.96 17.4,8.2 17.21,8.39 L8.39,17.2 C7.99,17.6 7.33,17.6 6.93,17.2 L2.8,13.07 C2.4,12.67 2.4,12.01 2.8,11.61 L11.61,2.8 C11.81,2.6 12.08,2.5 12.34,2.5 L16.19,2.5 C16.52,2.5 16.86,2.63 17.11,2.88 C17.35,3.11 17.48,3.4 17.5,3.71 L17.5,3.71 Z"/><circle cx="14" cy="6" r="1"/></svg>',thumbnails:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect fill="none" stroke="#000" x="3.5" y="3.5" width="5" height="5"/><rect fill="none" stroke="#000" x="11.5" y="3.5" width="5" height="5"/><rect fill="none" stroke="#000" x="11.5" y="11.5" width="5" height="5"/><rect fill="none" stroke="#000" x="3.5" y="11.5" width="5" height="5"/></svg>',trash:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" points="6.5 3 6.5 1.5 13.5 1.5 13.5 3"/><polyline fill="none" stroke="#000" points="4.5 4 4.5 18.5 15.5 18.5 15.5 4"/><rect x="8" y="7" width="1" height="9"/><rect x="11" y="7" width="1" height="9"/><rect x="2" y="3" width="16" height="1"/></svg>',"triangle-down":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="5 7 15 7 10 12"/></svg>',"triangle-left":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="12 5 7 10 12 15"/></svg>',"triangle-right":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="8 5 13 10 8 15"/></svg>',"triangle-up":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="5 13 10 8 15 13"/></svg>',tripadvisor:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M19.021,7.866C19.256,6.862,20,5.854,20,5.854h-3.346C14.781,4.641,12.504,4,9.98,4C7.363,4,4.999,4.651,3.135,5.876H0\tc0,0,0.738,0.987,0.976,1.988c-0.611,0.837-0.973,1.852-0.973,2.964c0,2.763,2.249,5.009,5.011,5.009\tc1.576,0,2.976-0.737,3.901-1.879l1.063,1.599l1.075-1.615c0.475,0.611,1.1,1.111,1.838,1.451c1.213,0.547,2.574,0.612,3.825,0.15\tc2.589-0.963,3.913-3.852,2.964-6.439c-0.175-0.463-0.4-0.876-0.675-1.238H19.021z M16.38,14.594\tc-1.002,0.371-2.088,0.328-3.06-0.119c-0.688-0.317-1.252-0.817-1.657-1.438c-0.164-0.25-0.313-0.52-0.417-0.811\tc-0.124-0.328-0.186-0.668-0.217-1.014c-0.063-0.689,0.037-1.396,0.339-2.043c0.448-0.971,1.251-1.71,2.25-2.079\tc2.075-0.765,4.375,0.3,5.14,2.366c0.762,2.066-0.301,4.37-2.363,5.134L16.38,14.594L16.38,14.594z M8.322,13.066\tc-0.72,1.059-1.935,1.76-3.309,1.76c-2.207,0-4.001-1.797-4.001-3.996c0-2.203,1.795-4.002,4.001-4.002\tc2.204,0,3.999,1.8,3.999,4.002c0,0.137-0.024,0.261-0.04,0.396c-0.067,0.678-0.284,1.313-0.648,1.853v-0.013H8.322z M2.472,10.775\tc0,1.367,1.112,2.479,2.476,2.479c1.363,0,2.472-1.11,2.472-2.479c0-1.359-1.11-2.468-2.472-2.468\tC3.584,8.306,2.473,9.416,2.472,10.775L2.472,10.775z M12.514,10.775c0,1.367,1.104,2.479,2.471,2.479\tc1.363,0,2.474-1.108,2.474-2.479c0-1.359-1.11-2.468-2.474-2.468c-1.364,0-2.477,1.109-2.477,2.468H12.514z M3.324,10.775\tc0-0.893,0.726-1.618,1.614-1.618c0.889,0,1.625,0.727,1.625,1.618c0,0.898-0.725,1.627-1.625,1.627\tc-0.901,0-1.625-0.729-1.625-1.627H3.324z M13.354,10.775c0-0.893,0.726-1.618,1.627-1.618c0.886,0,1.61,0.727,1.61,1.618\tc0,0.898-0.726,1.627-1.626,1.627s-1.625-0.729-1.625-1.627H13.354z M9.977,4.875c1.798,0,3.425,0.324,4.849,0.968\tc-0.535,0.015-1.061,0.108-1.586,0.3c-1.264,0.463-2.264,1.388-2.815,2.604c-0.262,0.551-0.398,1.133-0.448,1.72\tC9.79,7.905,7.677,5.873,5.076,5.82C6.501,5.208,8.153,4.875,9.94,4.875H9.977z"/></svg>',tumblr:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6.885,8.598c0,0,0,3.393,0,4.996c0,0.282,0,0.66,0.094,0.942c0.377,1.509,1.131,2.545,2.545,3.11 c1.319,0.472,2.356,0.472,3.676,0c0.565-0.188,1.132-0.659,1.132-0.659l-0.849-2.263c0,0-1.036,0.378-1.603,0.283 c-0.565-0.094-1.226-0.66-1.226-1.508c0-1.603,0-4.902,0-4.902h2.828V5.771h-2.828V2H8.205c0,0-0.094,0.66-0.188,0.942 C7.828,3.791,7.262,4.733,6.603,5.394C5.848,6.147,5,6.43,5,6.43v2.168H6.885z"/></svg>',tv:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="7" y="16" width="6" height="1"/><rect fill="none" stroke="#000" x=".5" y="3.5" width="19" height="11"/></svg>',twitter:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M19,4.74 C18.339,5.029 17.626,5.229 16.881,5.32 C17.644,4.86 18.227,4.139 18.503,3.28 C17.79,3.7 17.001,4.009 16.159,4.17 C15.485,3.45 14.526,3 13.464,3 C11.423,3 9.771,4.66 9.771,6.7 C9.771,6.99 9.804,7.269 9.868,7.539 C6.795,7.38 4.076,5.919 2.254,3.679 C1.936,4.219 1.754,4.86 1.754,5.539 C1.754,6.82 2.405,7.95 3.397,8.61 C2.79,8.589 2.22,8.429 1.723,8.149 L1.723,8.189 C1.723,9.978 2.997,11.478 4.686,11.82 C4.376,11.899 4.049,11.939 3.713,11.939 C3.475,11.939 3.245,11.919 3.018,11.88 C3.49,13.349 4.852,14.419 6.469,14.449 C5.205,15.429 3.612,16.019 1.882,16.019 C1.583,16.019 1.29,16.009 1,15.969 C2.635,17.019 4.576,17.629 6.662,17.629 C13.454,17.629 17.17,12 17.17,7.129 C17.17,6.969 17.166,6.809 17.157,6.649 C17.879,6.129 18.504,5.478 19,4.74"/></svg>',uikit:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="14.4,3.1 11.3,5.1 15,7.3 15,12.9 10,15.7 5,12.9 5,8.5 2,6.8 2,14.8 9.9,19.5 18,14.8 18,5.3"/><polygon points="9.8,4.2 6.7,2.4 9.8,0.4 12.9,2.3"/></svg>',unlock:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect fill="none" stroke="#000" x="3.5" y="8.5" width="13" height="10"/><path fill="none" stroke="#000" d="M6.5,8.5 L6.5,4.9 C6.5,3 8.1,1.5 10,1.5 C11.9,1.5 13.5,3 13.5,4.9"/></svg>',upload:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" points="5 8 9.5 3.5 14 8"/><rect x="3" y="17" width="13" height="1"/><line fill="none" stroke="#000" x1="9.5" y1="15" x2="9.5" y2="4"/></svg>',user:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.1" cx="9.9" cy="6.4" r="4.4"/><path fill="none" stroke="#000" stroke-width="1.1" d="M1.5,19 C2.3,14.5 5.8,11.2 10,11.2 C14.2,11.2 17.7,14.6 18.5,19.2"/></svg>',users:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.1" cx="7.7" cy="8.6" r="3.5"/><path fill="none" stroke="#000" stroke-width="1.1" d="M1,18.1 C1.7,14.6 4.4,12.1 7.6,12.1 C10.9,12.1 13.7,14.8 14.3,18.3"/><path fill="none" stroke="#000" stroke-width="1.1" d="M11.4,4 C12.8,2.4 15.4,2.8 16.3,4.7 C17.2,6.6 15.7,8.9 13.6,8.9 C16.5,8.9 18.8,11.3 19.2,14.1"/></svg>',"video-camera":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon fill="none" stroke="#000" points="17.5 6.9 17.5 13.1 13.5 10.4 13.5 14.5 2.5 14.5 2.5 5.5 13.5 5.5 13.5 9.6 17.5 6.9"/></svg>',vimeo:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.065,7.59C1.84,7.367,1.654,7.082,1.468,6.838c-0.332-0.42-0.137-0.411,0.274-0.772c1.026-0.91,2.004-1.896,3.127-2.688 c1.017-0.713,2.365-1.173,3.286-0.039c0.849,1.045,0.869,2.629,1.084,3.891c0.215,1.309,0.421,2.648,0.88,3.901 c0.127,0.352,0.37,1.018,0.81,1.074c0.567,0.078,1.145-0.917,1.408-1.289c0.684-0.987,1.611-2.317,1.494-3.587 c-0.115-1.349-1.572-1.095-2.482-0.773c0.146-1.514,1.555-3.216,2.912-3.792c1.439-0.597,3.579-0.587,4.302,1.036 c0.772,1.759,0.078,3.802-0.763,5.396c-0.918,1.731-2.1,3.333-3.363,4.829c-1.114,1.329-2.432,2.787-4.093,3.422 c-1.897,0.723-3.021-0.686-3.667-2.318c-0.705-1.777-1.056-3.771-1.565-5.621C4.898,8.726,4.644,7.836,4.136,7.191 C3.473,6.358,2.72,7.141,2.065,7.59C1.977,7.502,2.115,7.551,2.065,7.59L2.065,7.59z"/></svg>',warning:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="14" r="1"/><circle fill="none" stroke="#000" stroke-width="1.1" cx="10" cy="10" r="9"/><path d="M10.97,7.72 C10.85,9.54 10.56,11.29 10.56,11.29 C10.51,11.87 10.27,12 9.99,12 C9.69,12 9.49,11.87 9.43,11.29 C9.43,11.29 9.16,9.54 9.03,7.72 C8.96,6.54 9.03,6 9.03,6 C9.03,5.45 9.46,5.02 9.99,5 C10.53,5.01 10.97,5.44 10.97,6 C10.97,6 11.04,6.54 10.97,7.72 L10.97,7.72 Z"/></svg>',whatsapp:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M16.7,3.3c-1.8-1.8-4.1-2.8-6.7-2.8c-5.2,0-9.4,4.2-9.4,9.4c0,1.7,0.4,3.3,1.3,4.7l-1.3,4.9l5-1.3c1.4,0.8,2.9,1.2,4.5,1.2 l0,0l0,0c5.2,0,9.4-4.2,9.4-9.4C19.5,7.4,18.5,5,16.7,3.3 M10.1,17.7L10.1,17.7c-1.4,0-2.8-0.4-4-1.1l-0.3-0.2l-3,0.8l0.8-2.9 l-0.2-0.3c-0.8-1.2-1.2-2.7-1.2-4.2c0-4.3,3.5-7.8,7.8-7.8c2.1,0,4.1,0.8,5.5,2.3c1.5,1.5,2.3,3.4,2.3,5.5 C17.9,14.2,14.4,17.7,10.1,17.7 M14.4,11.9c-0.2-0.1-1.4-0.7-1.6-0.8c-0.2-0.1-0.4-0.1-0.5,0.1c-0.2,0.2-0.6,0.8-0.8,0.9 c-0.1,0.2-0.3,0.2-0.5,0.1c-0.2-0.1-1-0.4-1.9-1.2c-0.7-0.6-1.2-1.4-1.3-1.6c-0.1-0.2,0-0.4,0.1-0.5C8,8.8,8.1,8.7,8.2,8.5 c0.1-0.1,0.2-0.2,0.2-0.4c0.1-0.2,0-0.3,0-0.4C8.4,7.6,7.9,6.5,7.7,6C7.5,5.5,7.3,5.6,7.2,5.6c-0.1,0-0.3,0-0.4,0 c-0.2,0-0.4,0.1-0.6,0.3c-0.2,0.2-0.8,0.8-0.8,2c0,1.2,0.8,2.3,1,2.4c0.1,0.2,1.7,2.5,4,3.5c0.6,0.2,1,0.4,1.3,0.5 c0.6,0.2,1.1,0.2,1.5,0.1c0.5-0.1,1.4-0.6,1.6-1.1c0.2-0.5,0.2-1,0.1-1.1C14.8,12.1,14.6,12,14.4,11.9"/></svg>',wordpress:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10,0.5c-5.2,0-9.5,4.3-9.5,9.5s4.3,9.5,9.5,9.5c5.2,0,9.5-4.3,9.5-9.5S15.2,0.5,10,0.5L10,0.5L10,0.5z M15.6,3.9h-0.1 c-0.8,0-1.4,0.7-1.4,1.5c0,0.7,0.4,1.3,0.8,1.9c0.3,0.6,0.7,1.3,0.7,2.3c0,0.7-0.3,1.5-0.6,2.7L14.1,15l-3-8.9 c0.5,0,0.9-0.1,0.9-0.1C12.5,6,12.5,5.3,12,5.4c0,0-1.3,0.1-2.2,0.1C9,5.5,7.7,5.4,7.7,5.4C7.2,5.3,7.2,6,7.6,6c0,0,0.4,0.1,0.9,0.1 l1.3,3.5L8,15L5,6.1C5.5,6.1,5.9,6,5.9,6C6.4,6,6.3,5.3,5.9,5.4c0,0-1.3,0.1-2.2,0.1c-0.2,0-0.3,0-0.5,0c1.5-2.2,4-3.7,6.9-3.7 C12.2,1.7,14.1,2.6,15.6,3.9L15.6,3.9L15.6,3.9z M2.5,6.6l3.9,10.8c-2.7-1.3-4.6-4.2-4.6-7.4C1.8,8.8,2,7.6,2.5,6.6L2.5,6.6L2.5,6.6 z M10.2,10.7l2.5,6.9c0,0,0,0.1,0.1,0.1C11.9,18,11,18.2,10,18.2c-0.8,0-1.6-0.1-2.3-0.3L10.2,10.7L10.2,10.7L10.2,10.7z M14.2,17.1 l2.5-7.3c0.5-1.2,0.6-2.1,0.6-2.9c0-0.3,0-0.6-0.1-0.8c0.6,1.2,1,2.5,1,4C18.3,13,16.6,15.7,14.2,17.1L14.2,17.1L14.2,17.1z"/></svg>',world:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" d="M1,10.5 L19,10.5"/><path fill="none" stroke="#000" d="M2.35,15.5 L17.65,15.5"/><path fill="none" stroke="#000" d="M2.35,5.5 L17.523,5.5"/><path fill="none" stroke="#000" d="M10,19.46 L9.98,19.46 C7.31,17.33 5.61,14.141 5.61,10.58 C5.61,7.02 7.33,3.83 10,1.7 C10.01,1.7 9.99,1.7 10,1.7 L10,1.7 C12.67,3.83 14.4,7.02 14.4,10.58 C14.4,14.141 12.67,17.33 10,19.46 L10,19.46 L10,19.46 L10,19.46 Z"/><circle fill="none" stroke="#000" cx="10" cy="10.5" r="9"/></svg>',xing:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M4.4,4.56 C4.24,4.56 4.11,4.61 4.05,4.72 C3.98,4.83 3.99,4.97 4.07,5.12 L5.82,8.16 L5.82,8.17 L3.06,13.04 C2.99,13.18 2.99,13.33 3.06,13.44 C3.12,13.55 3.24,13.62 3.4,13.62 L6,13.62 C6.39,13.62 6.57,13.36 6.71,13.12 C6.71,13.12 9.41,8.35 9.51,8.16 C9.49,8.14 7.72,5.04 7.72,5.04 C7.58,4.81 7.39,4.56 6.99,4.56 L4.4,4.56 L4.4,4.56 Z"/><path d="M15.3,1 C14.91,1 14.74,1.25 14.6,1.5 C14.6,1.5 9.01,11.42 8.82,11.74 C8.83,11.76 12.51,18.51 12.51,18.51 C12.64,18.74 12.84,19 13.23,19 L15.82,19 C15.98,19 16.1,18.94 16.16,18.83 C16.23,18.72 16.23,18.57 16.16,18.43 L12.5,11.74 L12.5,11.72 L18.25,1.56 C18.32,1.42 18.32,1.27 18.25,1.16 C18.21,1.06 18.08,1 17.93,1 L15.3,1 L15.3,1 Z"/></svg>',yelp:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.175,14.971c-0.112,0.77-1.686,2.767-2.406,3.054c-0.246,0.1-0.487,0.076-0.675-0.069\tc-0.122-0.096-2.446-3.859-2.446-3.859c-0.194-0.293-0.157-0.682,0.083-0.978c0.234-0.284,0.581-0.393,0.881-0.276\tc0.016,0.01,4.21,1.394,4.332,1.482c0.178,0.148,0.263,0.379,0.225,0.646L17.175,14.971L17.175,14.971z M11.464,10.789\tc-0.203-0.307-0.199-0.666,0.009-0.916c0,0,2.625-3.574,2.745-3.657c0.203-0.135,0.452-0.141,0.69-0.025\tc0.691,0.335,2.085,2.405,2.167,3.199v0.027c0.024,0.271-0.082,0.491-0.273,0.623c-0.132,0.083-4.43,1.155-4.43,1.155\tc-0.322,0.096-0.68-0.06-0.882-0.381L11.464,10.789z M9.475,9.563C9.32,9.609,8.848,9.757,8.269,8.817c0,0-3.916-6.16-4.007-6.351\tc-0.057-0.212,0.011-0.455,0.202-0.65C5.047,1.211,8.21,0.327,9.037,0.529c0.27,0.069,0.457,0.238,0.522,0.479\tc0.047,0.266,0.433,5.982,0.488,7.264C10.098,9.368,9.629,9.517,9.475,9.563z M9.927,19.066c-0.083,0.225-0.273,0.373-0.54,0.421\tc-0.762,0.13-3.15-0.751-3.647-1.342c-0.096-0.131-0.155-0.262-0.167-0.394c-0.011-0.095,0-0.189,0.036-0.272\tc0.061-0.155,2.917-3.538,2.917-3.538c0.214-0.272,0.595-0.355,0.952-0.213c0.345,0.13,0.56,0.428,0.536,0.749\tC10.014,14.479,9.977,18.923,9.927,19.066z M3.495,13.912c-0.235-0.009-0.444-0.148-0.568-0.382c-0.089-0.17-0.151-0.453-0.19-0.794\tC2.63,11.701,2.761,10.144,3.07,9.648c0.145-0.226,0.357-0.345,0.592-0.336c0.154,0,4.255,1.667,4.255,1.667\tc0.321,0.118,0.521,0.453,0.5,0.833c-0.023,0.37-0.236,0.655-0.551,0.738L3.495,13.912z"/></svg>',youtube:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15,4.1c1,0.1,2.3,0,3,0.8c0.8,0.8,0.9,2.1,0.9,3.1C19,9.2,19,10.9,19,12c-0.1,1.1,0,2.4-0.5,3.4c-0.5,1.1-1.4,1.5-2.5,1.6 c-1.2,0.1-8.6,0.1-11,0c-1.1-0.1-2.4-0.1-3.2-1c-0.7-0.8-0.7-2-0.8-3C1,11.8,1,10.1,1,8.9c0-1.1,0-2.4,0.5-3.4C2,4.5,3,4.3,4.1,4.2 C5.3,4.1,12.6,4,15,4.1z M8,7.5v6l5.5-3L8,7.5z"/></svg>'})}return"undefined"!=typeof window&&window.UIkit&&window.UIkit.use(i),i});
},{}],"../spine.js":[function(require,module,exports) {
"use strict";

require("./cookieconsent");

var _uikit = _interopRequireDefault(require("uikit/dist/js/uikit.min"));

var _uikitIcons = _interopRequireDefault(require("uikit/dist/js/uikit-icons.min"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// loads the Icon plugin
_uikit.default.use(_uikitIcons.default);

window.CookieConsent.init({
  // More link URL on bar
  modalMainTextMoreLink: null,
  // How lond to wait until bar comes up
  barTimeout: 1000,
  // Look and feel
  theme: {
    barColor: "#a8ccdf",
    barTextColor: "#000",
    barMainButtonColor: "#FFF",
    barMainButtonTextColor: "#678C34",
    modalMainButtonColor: "#a8ccdf",
    modalMainButtonTextColor: "#000"
  },
  language: {
    // Current language
    current: "pl",
    locale: {
      pl: {
        barMainText: "Ta strona korzysta z plików cookie, aby zapewnić najlepszą jakość korzystania z naszej witryny.",
        barLinkSetting: "Ustawienia plików cookie",
        barBtnAcceptAll: "Akceptuj wszystkie pliki cookie",
        modalMainTitle: "Ustawienia plików cookies",
        modalMainText: "Pliki cookie to niewielkie dane wysyłane ze strony internetowej i przechowywane na komputerze użytkownika przez przeglądarkę internetową użytkownika podczas przeglądania. Twoja przeglądarka przechowuje każdą wiadomość w małym pliku zwanym cookie. Gdy zażądasz innej strony z serwera, Twoja przeglądarka odeśle plik cookie z powrotem na serwer. Pliki cookie mają być niezawodnym mechanizmem zapamiętywania informacji lub rejestrowania aktywności przeglądania przez strony internetowe.",
        modalBtnSave: "Zapisz aktualne ustawienia",
        modalBtnAcceptAll: "Zaakceptuj wszystkie pliki cookie i zamknij",
        modalAffectedSolutions: "Wykorzystywane rozwiązania:",
        learnMore: "Ucz się więcej",
        on: "Włącz",
        off: "Wyłącz"
      },
      en: {
        barMainText: "This website uses cookies to ensure you get the best experience on our website.",
        barLinkSetting: "Cookie Settings",
        barBtnAcceptAll: "Accept all cookies",
        modalMainTitle: "Cookie settings",
        modalMainText: "Cookies are small piece of data sent from a website and stored on the user's computer by the user's web browser while the user is browsing. Your browser stores each message in a small file, called cookie. When you request another page from the server, your browser sends the cookie back to the server. Cookies were designed to be a reliable mechanism for websites to remember information or to record the user's browsing activity.",
        modalBtnSave: "Save current settings",
        modalBtnAcceptAll: "Accept all cookies and close",
        modalAffectedSolutions: "Affected solutions:",
        learnMore: "Learn More",
        on: "On",
        off: "Off"
      }
    }
  },
  // List all the categories you want to display
  categories: {
    // Unique name
    // This probably will be the default category
    necessary: {
      // The cookies here are necessary and category cant be turned off.
      // Wanted config value  will be ignored.
      needed: true,
      // The cookies in this category will be let trough.
      // This probably should be false if not necessary category
      wanted: true,
      // If the checkbox is on or off at first run.
      checked: true,
      // Language settings for categories
      language: {
        locale: {
          en: {
            name: "Strictly Necessary Cookies",
            description: "If you do not accept the cookies identified below as 'Strictly Required', your visit to this site will not be possible"
          },
          hu: {
            name: "Szükséges sütik",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eu commodo est, nec gravida odio. Suspendisse scelerisque a ex nec semper."
          },
          pl: {
            name: "Ściśle wymagane pliki cookie",
            description: "Jeżeli nie zaakceptujesz plików cookie określonych poniżej jako 'Ściśle wymagane', Twoje odwiedziny w tej witrynie nie będą możliwe"
          }
        }
      }
    }
  },
  // List actual services here
  services: {
    // Unique name
    analytics: {
      // Existing category Unique name
      // This example shows how to block Google Analytics
      category: "necessary",
      // Type of blocking to apply here.
      // This depends on the type of script we are trying to block
      // Can be: dynamic-script, script-tag, wrapped, localcookie
      type: "dynamic-script",
      // Only needed if "type: dynamic-script"
      // The filter will look for this keyword in inserted scipt tags
      // and block if match found
      search: "analytics",
      // List of known cookie names or Regular expressions matching
      // cookie names placed by this service.
      // These willbe removed from current domain and .domain.
      cookies: [{
        // Known cookie name.
        name: "_gid",
        // Expected cookie domain.
        domain: ".".concat(window.location.hostname)
      }, {
        // Regex matching cookie name.
        name: /^_ga/,
        domain: ".".concat(window.location.hostname)
      }],
      language: {
        locale: {
          en: {
            name: "Google Analytics"
          },
          hu: {
            name: "Google Analytics"
          },
          pl: {
            name: "Google Analytics"
          }
        }
      }
    }
  }
});
},{"./cookieconsent":"../cookieconsent.js","uikit/dist/js/uikit.min":"../node_modules/uikit/dist/js/uikit.min.js","uikit/dist/js/uikit-icons.min":"../node_modules/uikit/dist/js/uikit-icons.min.js"}],"../index.js":[function(require,module,exports) {
"use strict";

require("./spine");
},{"./spine":"../spine.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63671" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","../index.js"], null)
//# sourceMappingURL=/agrotax.80dfb952.js.map