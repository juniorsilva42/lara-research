/*!
 * modernizr v3.3.1
 * Build https://modernizr.com/download?-ambientlight-animation-apng-appearance-applicationcache-atobbtoa-audio-audiopreload-backgroundblendmode-backgroundcliptext-backgroundsize-batteryapi-bdi-beacon-bgpositionshorthand-bgpositionxy-bgrepeatspace_bgrepeatround-blobconstructor-bloburls-blobworkers-canvas-canvasblending-canvastext-canvaswinding-capture-contains-contenteditable-contextmenu-cookies-cors-createelementattrs_createelement_attrs-cryptography-cssanimations-customevent-customprotocolhandler-datachannel-datauri-dataworkers-details-directory-es5-es5date-es5function-es5object-es5string-es5syntax-es5undefined-es6array-es6collections-es6math-es6number-es6object-es6string-eventlistener-eventsource-exiforientation-fetch-fileinput-filesystem-flash-forcetouch-formattribute-formvalidation-framed-fullscreen-gamepads-generators-geolocation-getusermedia-hashchange-hiddenscroll-htmlimports-ie8compat-imgcrossorigin-indexeddb-indexeddbblob-inlinesvg-input-inputformaction-inputformenctype-inputformmethod-inputformtarget-inputtypes-intl-jpeg2000-jpegxr-json-localizednumber-localstorage-lowbandwidth-matchmedia-microdata-mutationobserver-outputelem-peerconnection-picture-placeholder-progressbar_meter-promises-queryselector-requestautocomplete-sandbox-scriptasync-scriptdefer-seamless-search-sessionstorage-sharedworkers-sizes-smil-speechrecognition-speechsynthesis-srcdoc-srcset-strictmode-stylescoped-svg-svgasimg-svgclippaths-svgfilters-svgforeignobject-templatestrings-textareamaxlength-touchevents-typedarrays-urlparser-userdata-vibrate-video-videoautoplay-videoloop-videopreload-vml-webaudio-webgl-webglextensions-webintents-webp-webpalpha-webpanimation-webplossless_webp_lossless-websockets-websocketsbinary-websqldatabase-webworkers-xdomainrequest-xhr2-xhrresponsetype-xhrresponsetypearraybuffer-xhrresponsetypeblob-xhrresponsetypedocument-xhrresponsetypejson-xhrresponsetypetext-setclasses-shiv-teststyles-dontmin
 *
 * Copyright (c)
 *  Faruk Ates
 *  Paul Irish
 *  Alex Sexton
 *  Ryan Seddon
 *  Patrick Kettner
 *  Stu Cox
 *  Richard Herrera

 * MIT License
 */

/*
 * Modernizr tests which native CSS3 and HTML5 features are available in the
 * current UA and makes the results available to you in two ways: as properties on
 * a global `Modernizr` object, and as classes on the `<html>` element. This
 * information allows you to progressively enhance your pages with a granular level
 * of control over the experience.
*/

;(function(window, document, undefined){
  var classes = [];
  

  var tests = [];
  

  /**
   *
   * ModernizrProto is the constructor for Modernizr
   *
   * @class
   * @access public
   */

  var ModernizrProto = {
    // The current version, dummy
    _version: '3.3.1',

    // Any settings that don't work as separate modules
    // can go in here as configuration.
    _config: {
      'classPrefix': '',
      'enableClasses': true,
      'enableJSClass': true,
      'usePrefixes': true
    },

    // Queue of tests
    _q: [],

    // Stub these for people who are listening
    on: function(test, cb) {
      // I don't really think people should do this, but we can
      // safe guard it a bit.
      // -- NOTE:: this gets WAY overridden in src/addTest for actual async tests.
      // This is in case people listen to synchronous tests. I would leave it out,
      // but the code to *disallow* sync tests in the real version of this
      // function is actually larger than this.
      var self = this;
      setTimeout(function() {
        cb(self[test]);
      }, 0);
    },

    addTest: function(name, fn, options) {
      tests.push({name: name, fn: fn, options: options});
    },

    addAsyncTest: function(fn) {
      tests.push({name: null, fn: fn});
    }
  };

  

  // Fake some of Object.create so we can force non test results to be non "own" properties.
  var Modernizr = function() {};
  Modernizr.prototype = ModernizrProto;

  // Leak modernizr globally when you `require` it rather than force it here.
  // Overwrite name so constructor name is nicer :D
  Modernizr = new Modernizr();

  
/*!
{
  "name": "Application Cache",
  "property": "applicationcache",
  "caniuse": "offline-apps",
  "tags": ["storage", "offline"],
  "notes": [{
    "name": "MDN documentation",
    "href": "https://developer.mozilla.org/en/docs/HTML/Using_the_application_cache"
  }],
  "polyfills": ["html5gears"]
}
!*/
/* DOC
Detects support for the Application Cache, for storing data to enable web-based applications run offline.

The API has been [heavily criticized](http://alistapart.com/article/application-cache-is-a-douchebag) and discussions are underway to address this.
*/

  Modernizr.addTest('applicationcache', 'applicationCache' in window);

/*!
{
  "name": "Blob constructor",
  "property": "blobconstructor",
  "aliases": ["blob-constructor"],
  "builderAliases": ["blob_constructor"],
  "caniuse": "blobbuilder",
  "notes": [{
    "name": "W3C spec",
    "href": "https://w3c.github.io/FileAPI/#constructorBlob"
  }],
  "polyfills": ["blobjs"]
}
!*/
/* DOC
Detects support for the Blob constructor, for creating file-like objects of immutable, raw data.
*/

  Modernizr.addTest('blobconstructor', function() {
    try {
      return !!new Blob();
    } catch (e) {
      return false;
    }
  }, {
    aliases: ['blob-constructor']
  });

/*!
{
  "name": "Cookies",
  "property": "cookies",
  "tags": ["storage"],
  "authors": ["tauren"]
}
!*/
/* DOC
Detects whether cookie support is enabled.
*/

  // https://github.com/Modernizr/Modernizr/issues/191

  Modernizr.addTest('cookies', function() {
    // navigator.cookieEnabled cannot detect custom or nuanced cookie blocking
    // configurations. For example, when blocking cookies via the Advanced
    // Privacy Settings in IE9, it always returns true. And there have been
    // issues in the past with site-specific exceptions.
    // Don't rely on it.

    // try..catch because some in situations `document.cookie` is exposed but throws a
    // SecurityError if you try to access it; e.g. documents created from data URIs
    // or in sandboxed iframes (depending on flags/context)
    try {
      // Create cookie
      document.cookie = 'cookietest=1';
      var ret = document.cookie.indexOf('cookietest=') != -1;
      // Delete cookie
      document.cookie = 'cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT';
      return ret;
    }
    catch (e) {
      return false;
    }
  });

/*!
{
  "name": "Cross-Origin Resource Sharing",
  "property": "cors",
  "caniuse": "cors",
  "authors": ["Theodoor van Donge"],
  "notes": [{
    "name": "MDN documentation",
    "href": "https://developer.mozilla.org/en-US/docs/HTTP/Access_control_CORS"
  }],
  "polyfills": ["pmxdr", "ppx", "flxhr"]
}
!*/
/* DOC
Detects support for Cross-Origin Resource Sharing: method of performing XMLHttpRequests across domains.
*/

  Modernizr.addTest('cors', 'XMLHttpRequest' in window && 'withCredentials' in new XMLHttpRequest());

/*!
{
  "name": "Custom protocol handler",
  "property": "customprotocolhandler",
  "authors": ["Ben Schwarz"],
  "builderAliases": ["custom_protocol_handler"],
  "notes": [{
    "name": "WHATWG overview",
    "href": "https://developers.whatwg.org/timers.html#custom-handlers"
  },{
    "name": "MDN documentation",
    "href": "https://developer.mozilla.org/en-US/docs/Web/API/navigator.registerProtocolHandler"
  }],
  "warnings": [],
  "polyfills": []
}
!*/
/* DOC
Detects support for the `window.registerProtocolHandler()` API to allow websites to register themselves as possible handlers for particular protocols.
*/

  Modernizr.addTest('customprotocolhandler', function() {
    // early bailout where it doesn't exist at all
    if (!navigator.registerProtocolHandler) {
      return false;
    }

    // registerProtocolHandler was stubbed in webkit for a while, and didn't
    // actually do anything. We intentionally set it improperly to test for
    // the proper sort of failure
    try {
      navigator.registerProtocolHandler('thisShouldFail');
    }
    catch (e) {
      return e instanceof TypeError;
    }

    return false;
  });

/*!
{
  "name": "CustomEvent",
  "property": "customevent",
  "tags": ["customevent"],
  "authors": ["Alberto Elias"],
  "notes": [{
    "name": "W3C DOM reference",
    "href": "https://www.w3.org/TR/DOM-Level-3-Events/#interface-CustomEvent"
  }, {
    "name": "MDN documentation",
    "href": "https://developer.mozilla.org/en/docs/Web/API/CustomEvent"
  }],
  "polyfills": ["eventlistener"]
}
!*/
/* DOC

Detects support for CustomEvent.

*/

  Modernizr.addTest('customevent', 'CustomEvent' in window && typeof window.CustomEvent === 'function');

/*!
{
  "name": "Event Listener",
  "property": "eventlistener",
  "authors": ["Andrew Betts (@triblondon)"],
  "notes": [{
    "name": "W3C Spec",
    "href": "https://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-Registration-interfaces"
  }],
  "polyfills": ["eventlistener"]
}
!*/
/* DOC
Detects native support for addEventListener
*/

  Modernizr.addTest('eventlistener', 'addEventListener' in window);

/*!
{
  "name": "Geolocation API",
  "property": "geolocation",
  "caniuse": "geolocation",
  "tags": ["media"],
  "notes": [{
    "name": "MDN documentation",
    "href": "https://developer.mozilla.org/en-US/docs/WebAPI/Using_geolocation"
  }],
  "polyfills": [
    "joshuabell-polyfill",
    "webshims",
    "geo-location-javascript",
    "geolocation-api-polyfill"
  ]
}
!*/
/* DOC
Detects support for the Geolocation API for users to provide their location to web applications.
*/

  // geolocation is often considered a trivial feature detect...
  // Turns out, it's quite tricky to get right:
  //
  // Using !!navigator.geolocation does two things we don't want. It:
  //   1. Leaks memory in IE9: github.com/Modernizr/Modernizr/issues/513
  //   2. Disables page caching in WebKit: webk.it/43956
  //
  // Meanwhile, in Firefox < 8, an about:config setting could expose
  // a false positive that would throw an exception: bugzil.la/688158

  Modernizr.addTest('geolocation', 'geolocation' in navigator);

/*!
{
  "name": "IE8 compat mode",
  "property": "ie8compat",
  "authors": ["Erich Ocean"]
}
!*/
/* DOC
Detects whether or not the current browser is IE8 in compatibility mode (i.e. acting as IE7).
*/

  // In this case, IE8 will be acting as IE7. You may choose to remove features in this case.

  // related:
  // james.padolsey.com/javascript/detect-ie-in-js-using-conditional-comments/

  Modernizr.addTest('ie8compat', (!window.addEventListener && !!document.documentMode && document.documentMode === 7));

/*!
{
  "name": "JSON",
  "property": "json",
  "caniuse": "json",
  "notes": [{
    "name": "MDN documentation",
    "href": "https://developer.mozilla.org/en-US/docs/Glossary/JSON"
  }],
  "polyfills": ["json2"]
}
!*/
/* DOC
Detects native support for JSON handling functions.
*/

  // this will also succeed if you've loaded the JSON2.js polyfill ahead of time
  //   ... but that should be obvious. :)

  Modernizr.addTest('json', 'JSON' in window && 'parse' in JSON && 'stringify' in JSON);

/*!
{
  "name": "QuerySelector",
  "property": "queryselector",
  "caniuse": "queryselector",
  "tags": ["queryselector"],
  "authors": ["Andrew Betts (@triblondon)"],
  "notes": [{
    "name" : "W3C Selectors reference",
    "href": "https://www.w3.org/TR/selectors-api/#queryselectorall"
  }],
  "polyfills": ["css-selector-engine"]
}
!*/
/* DOC
Detects support for querySelector.
*/

  Modernizr.addTest('queryselector', 'querySelector' in document && 'querySelectorAll' in document);

/*!
{
  "name": "SVG",
  "property": "svg",
  "caniuse": "svg",
  "tags": ["svg"],
  "authors": ["Erik Dahlstrom"],
  "polyfills": [
    "svgweb",
    "raphael",
    "amplesdk",
    "canvg",
    "svg-boilerplate",
    "sie",
    "dojogfx",
    "fabricjs"
  ]
}
!*/
/* DOC
Detects support for SVG in `<embed>` or `<object>` elements.
*/

  Modernizr.addTest('svg', !!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect);

/*!
{
  "name": "Template strings",
  "property": "templatestrings",
  "notes": [{
    "name": "MDN Reference",
    "href": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings#Browser_compatibility"
  }]
}
!*/
/* DOC
Template strings are string literals allowing embedded expressions.
*/

  Modernizr.addTest('templatestrings', function() {
    var supports;
    try {
      // A number of tools, including uglifyjs and require, break on a raw "`", so
      // use an eval to get around that.
      eval('``');
      supports = true;
    } catch (e) {}
    return !!supports;
  });

/*!
{
  "name": "Typed arrays",
  "property": "typedarrays",
  "caniuse": "typedarrays",
  "tags": ["js"],
  "authors": ["Stanley Stuart (@fivetanley)"],
  "notes": [{
    "name": "MDN documentation",
    "href": "https://developer.mozilla.org/en-US/docs/JavaScript_typed_arrays"
  },{
    "name": "Kronos spec",
    "href": "https://www.khronos.org/registry/typedarray/specs/latest/"
  }],
  "polyfills": ["joshuabell-polyfill"]
}
!*/
/* DOC
Detects support for native binary data manipulation via Typed Arrays in JavaScript.

Does not check for DataView support; use `Modernizr.dataview` for that.
*/

  // Should fail in:
  // Internet Explorer <= 9
  // Firefox <= 3.6
  // Chrome <= 6.0
  // iOS Safari < 4.2
  // Safari < 5.1
  // Opera < 11.6
  // Opera Mini, <= 7.0
  // Android Browser < 4.0
  // Blackberry Browser < 10.0

  Modernizr.addTest('typedarrays', 'ArrayBuffer' in window);

/*!
{
  "name": "WebSockets Support",
  "property": "websockets",
  "authors": ["Phread [fearphage]", "Mike Sherov [mikesherov]", "Burak Yigit Kaya [BYK]"],
  "caniuse": "websockets",
  "tags": ["html5"],
  "warnings": [
    "This test will reject any old version of WebSockets even if it is not prefixed such as in Safari 5.1"
  ],
  "notes": [{
    "name": "CLOSING State and Spec",
    "href": "https://www.w3.org/TR/websockets/#the-websocket-interface"
  }],
  "polyfills": [
    "sockjs",
    "socketio",
    "kaazing-websocket-gateway",
    "websocketjs",
    "atmosphere",
    "graceful-websocket",
    "portal",
    "datachannel"
  ]
}
!*/

  var supports = false;
  try {
    supports = 'WebSocket' in window && window.WebSocket.CLOSING === 2;
  } catch (e) {}
  Modernizr.addTest('websockets', supports);

/*!
{
  "name": "XDomainRequest",
  "property": "xdomainrequest",
  "tags": ["cors", "xdomainrequest", "ie9", "ie8"],
  "authors": ["Ivan Pan (@hypotenuse)"],
  "notes": [
  {
    "name": "MDN documentation",
    "href": "https://developer.mozilla.org/en-US/docs/Web/API/XDomainRequest"
  },
  {
    "name": "MSDN documentation",
    "href": "https://msdn.microsoft.com/library/ie/cc288060.aspx/"
  }]
}
!*/
/* DOC
Detects support for XDomainRequest in IE9 & IE8
*/

  Modernizr.addTest('xdomainrequest', 'XDomainRequest' in window);

/*!
{
  "name": "Web Audio API",
  "property": "webaudio",
  "caniuse": "audio-api",
  "polyfills": ["xaudiojs", "dynamicaudiojs", "audiolibjs"],
  "tags": ["audio", "media"],
  "builderAliases": ["audio_webaudio_api"],
  "authors": ["Addy Osmani"],
  "notes": [{
    "name": "W3 Specification",
    "href": "https://dvcs.w3.org/hg/audio/raw-file/tip/webaudio/specification.html"
  }]
}
!*/
/* DOC
Detects the older non standard webaudio API, (as opposed to the standards based AudioContext API)
*/

  Modernizr.addTest('webaudio', function() {
    var prefixed = 'webkitAudioContext' in window;
    var unprefixed = 'AudioContext' in window;

    if (Modernizr._config.usePrefixes) {
      return prefixed || unprefixed;
    }
    return unprefixed;
  });

/*!
{
  "name": "microdata",
  "property": "microdata",
  "tags": ["dom"],
  "builderAliases": ["dom_microdata"],
  "notes": [{
    "name": "W3 Spec",
    "href": "https://www.w3.org/TR/microdata/"
  }]
}
!*/

  Modernizr.addTest('microdata', 'getItems' in document);

/*!
{
  "name": "DOM4 MutationObserver",
  "property": "mutationobserver",
  "caniuse": "mutationobserver",
  "tags": ["dom"],
  "authors": ["Karel Sedláček (@ksdlck)"],
  "polyfills": ["mutationobservers"],
  "notes": [{
    "name": "MDN documentation",
    "href": "https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver"
  }]
}
!*/
/* DOC

Determines if DOM4 MutationObserver support is available.

*/

  Modernizr.addTest('mutationobserver',
    !!window.MutationObserver || !!window.WebKitMutationObserver);

/*!
{
  "name": "picture Element",
  "property": "picture",
  "tags": ["elem"],
  "authors": ["Scott Jehl", "Mat Marquis"],
  "notes": [{
    "name": "Specification",
    "href": "http://picture.responsiveimages.org"
  },{
    "name": "Relevant spec issue",
    "href": "https://github.com/ResponsiveImagesCG/picture-element/issues/87"
  }]
}
!*/

  Modernizr.addTest('picture', 'HTMLPictureElement' in window);

/*!
{
  "name": "ES5 Date",
  "property": "es5date",
  "notes": [{
    "name": "ECMAScript 5.1 Language Specification",
    "href": "http://www.ecma-international.org/ecma-262/5.1/"
  }],
  "polyfills": ["es5shim"],
  "authors": ["Ron Waldon (@jokeyrhyme)"],
  "tags": ["es5"]
}
!*/
/* DOC
Check if browser implements ECMAScript 5 Date per specification.
*/

  Modernizr.addTest('es5date', function() {
    var isoDate = '2013-04-12T06:06:37.307Z',
      canParseISODate = false;
    try {
      canParseISODate = !!Date.parse(isoDate);
    } catch (e) {
      // no ISO date parsing yet
    }
    return !!(Date.now &&
      Date.prototype &&
      Date.prototype.toISOString &&
      Date.prototype.toJSON &&
      canParseISODate);
  });

/*!
{
  "name": "ES5 Function",
  "property": "es5function",
  "notes": [{
    "name": "ECMAScript 5.1 Language Specification",
    "href": "http://www.ecma-international.org/ecma-262/5.1/"
  }],
  "polyfills": ["es5shim"],
  "authors": ["Ron Waldon (@jokeyrhyme)"],
  "tags": ["es5"]
}
!*/
/* DOC
Check if browser implements ECMAScript 5 Function per specification.
*/

  Modernizr.addTest('es5function', function() {
    return !!(Function.prototype && Function.prototype.bind);
  });

/*!
{
  "name": "ES5 Object",
  "property": "es5object",
  "notes": [{
    "name": "ECMAScript 5.1 Language Specification",
    "href": "http://www.ecma-international.org/ecma-262/5.1/"
  }],
  "polyfills": ["es5shim", "es5sham"],
  "authors": ["Ron Waldon (@jokeyrhyme)"],
  "tags": ["es5"]
}
!*/
/* DOC
Check if browser implements ECMAScript 5 Object per specification.
*/

  Modernizr.addTest('es5object', function() {
    return !!(Object.keys &&
      Object.create &&
      Object.getPrototypeOf &&
      Object.getOwnPropertyNames &&
      Object.isSealed &&
      Object.isFrozen &&
      Object.isExtensible &&
      Object.getOwnPropertyDescriptor &&
      Object.defineProperty &&
      Object.defineProperties &&
      Object.seal &&
      Object.freeze &&
      Object.preventExtensions);
  });

/*!
{
  "name": "ES5 Strict Mode",
  "property": "strictmode",
  "caniuse": "sctrict-mode",
  "notes": [{
    "name": "ECMAScript 5.1 Language Specification",
    "href": "http://www.ecma-international.org/ecma-262/5.1/"
  }],
  "authors": ["@kangax"],
  "tags": ["es5"],
  "builderAliases": ["es5_strictmode"]
}
!*/
/* DOC
Check if browser implements ECMAScript 5 Object strict mode.
*/

  Modernizr.addTest('strictmode', (function() {'use strict'; return !this; })());

/*!
{
  "name": "ES5 String",
  "property": "es5string",
  "notes": [{
    "name": "ECMAScript 5.1 Language Specification",
    "href": "http://www.ecma-international.org/ecma-262/5.1/"
  }],
  "polyfills": ["es5shim"],
  "authors": ["Ron Waldon (@jokeyrhyme)"],
  "tags": ["es5"]
}
!*/
/* DOC
Check if browser implements ECMAScript 5 String per specification.
*/

  Modernizr.addTest('es5string', function() {
    return !!(String.prototype && String.prototype.trim);
  });

/*!
{
  "name": "ES5 Syntax",
  "property": "es5syntax",
  "notes": [{
    "name": "ECMAScript 5.1 Language Specification",
    "href": "http://www.ecma-international.org/ecma-262/5.1/"
  }, {
    "name": "original implementation of detect code",
    "href": "http://kangax.github.io/es5-compat-table/"
  }],
  "authors": ["Ron Waldon (@jokeyrhyme)"],
  "warnings": ["This detect uses `eval()`, so CSP may be a problem."],
  "tags": ["es5"]
}
!*/
/* DOC
Check if browser accepts ECMAScript 5 syntax.
*/

  Modernizr.addTest('es5syntax', function() {
    var value, obj, stringAccess, getter, setter, reservedWords, zeroWidthChars;
    try {
      // Property access on strings
      stringAccess = eval('"foobar"[3] === "b"');
      // Getter in property initializer
      getter = eval('({ get x(){ return 1 } }).x === 1');
      eval('({ set x(v){ value = v; } }).x = 1');
      // Setter in property initializer
      setter = value === 1;
      // Reserved words as property names
      eval('obj = ({ if: 1 })');
      reservedWords = obj['if'] === 1;
      // Zero-width characters in identifiers
      zeroWidthChars = eval('_\u200c\u200d = true');

      return stringAccess && getter && setter && reservedWords && zeroWidthChars;
    } catch (ignore) {
      return false;
    }
  });

/*!
{
  "name": "ES5 Immutable Undefined",
  "property": "es5undefined",
  "notes": [{
    "name": "ECMAScript 5.1 Language Specification",
    "href": "http://www.ecma-international.org/ecma-262/5.1/"
  }, {
    "name": "original implementation of detect code",
    "href": "http://kangax.github.io/es5-compat-table/"
  }],
  "authors": ["Ron Waldon (@jokeyrhyme)"],
  "tags": ["es5"]
}
!*/
/* DOC
Check if browser prevents assignment to global `undefined` per ECMAScript 5.
*/

  Modernizr.addTest('es5undefined', function() {
    var result, originalUndefined;
    try {
      originalUndefined = window.undefined;
      window.undefined = 12345;
      result = typeof window.undefined === 'undefined';
      window.undefined = originalUndefined;
    } catch (e) {
      return false;
    }
    return result;
  });

/*!
{
  "name": "ES6 Array",
  "property": "es6array",
  "notes": [{
    "name": "unofficial ECMAScript 6 draft specification",
    "href": "https://people.mozilla.org/~jorendorff/es6-draft.html"
  }],
  "polyfills": ["es6shim"],
  "authors": ["Ron Waldon (@jokeyrhyme)"],
  "warnings": ["ECMAScript 6 is still a only a draft, so this detect may not match the final specification or implementations."],
  "tags": ["es6"]
}
!*/
/* DOC
Check if browser implements ECMAScript 6 Array per specification.
*/

  Modernizr.addTest('es6array', !!(Array.prototype &&
    Array.prototype.copyWithin &&
    Array.prototype.fill &&
    Array.prototype.find &&
    Array.prototype.findIndex &&
    Array.prototype.keys &&
    Array.prototype.entries &&
    Array.prototype.values &&
    Array.from &&
    Array.of));

/*!
{
  "name": "ES6 Collections",
  "property": "es6collections",
  "notes": [{
    "name": "unofficial ECMAScript 6 draft specification",
    "href": "https://people.mozilla.org/~jorendorff/es6-draft.html"
  }],
  "polyfills": ["es6shim", "weakmap"],
  "authors": ["Ron Waldon (@jokeyrhyme)"],
  "warnings": ["ECMAScript 6 is still a only a draft, so this detect may not match the final specification or implementations."],
  "tags": ["es6"]
}
!*/
/* DOC
Check if browser implements ECMAScript 6 Map, Set, WeakMap and WeakSet
*/

  Modernizr.addTest('es6collections', !!(
    window.Map && window.Set && window.WeakMap && window.WeakSet
  ));

/*!
{
  "name": "ES6 Generators",
  "property": "generators",
  "authors": ["Michael Kachanovskyi"],
  "tags": ["es6"]
}
!*/
/* DOC
Check if browser implements ECMAScript 6 Generators per specification.
*/

  Modernizr.addTest('generators', function() {
    try {
      /* jshint evil: true */
      new Function('function* test() {}')();
    } catch (e) {
      return false;
    }
    return true;
  });

/*!
{
  "name": "ES6 Math",
  "property": "es6math",
  "notes": [{
    "name": "unofficial ECMAScript 6 draft specification",
    "href": "https://people.mozilla.org/~jorendorff/es6-draft.html"
  }],
  "polyfills": ["es6shim"],
  "authors": ["Ron Waldon (@jokeyrhyme)"],
  "warnings": ["ECMAScript 6 is still a only a draft, so this detect may not match the final specification or implementations."],
  "tags": ["es6"]
}
!*/
/* DOC
Check if browser implements ECMAScript 6 Math per specification.
*/

  Modernizr.addTest('es6math', !!(Math &&
    Math.clz32 &&
    Math.cbrt &&
    Math.imul &&
    Math.sign &&
    Math.log10 &&
    Math.log2 &&
    Math.log1p &&
    Math.expm1 &&
    Math.cosh &&
    Math.sinh &&
    Math.tanh &&
    Math.acosh &&
    Math.asinh &&
    Math.atanh &&
    Math.hypot &&
    Math.trunc &&
    Math.fround));

/*!
{
  "name": "ES6 Number",
  "property": "es6number",
  "notes": [{
    "name": "unofficial ECMAScript 6 draft specification",
    "href": "https://people.mozilla.org/~jorendorff/es6-draft.html"
  }],
  "polyfills": ["es6shim"],
  "authors": ["Ron Waldon (@jokeyrhyme)"],
  "warnings": ["ECMAScript 6 is still a only a draft, so this detect may not match the final specification or implementations."],
  "tags": ["es6"]
}
!*/
/* DOC
Check if browser implements ECMAScript 6 Number per specification.
*/

  Modernizr.addTest('es6number', !!(Number.isFinite &&
    Number.isInteger &&
    Number.isSafeInteger &&
    Number.isNaN &&
    Number.parseInt &&
    Number.parseFloat &&
    Number.isInteger(Number.MAX_SAFE_INTEGER) &&
    Number.isInteger(Number.MIN_SAFE_INTEGER) &&
    Number.isFinite(Number.EPSILON)));

/*!
{
  "name": "ES6 Object",
  "property": "es6object",
  "notes": [{
    "name": "unofficial ECMAScript 6 draft specification",
    "href": "https://people.mozilla.org/~jorendorff/es6-draft.html"
  }],
  "polyfills": ["es6shim"],
  "authors": ["Ron Waldon (@jokeyrhyme)"],
  "warnings": ["ECMAScript 6 is still a only a draft, so this detect may not match the final specification or implementations."],
  "tags": ["es6"]
}
!*/
/* DOC
Check if browser implements ECMAScript 6 Object per specification.
*/

  Modernizr.addTest('es6object', !!(Object.assign &&
    Object.is &&
    Object.setPrototypeOf));

/*!
{
  "name": "ES6 Promises",
  "property": "promises",
  "caniuse": "promises",
  "polyfills": ["es6promises"],
  "authors": ["Krister Kari", "Jake Archibald"],
  "tags": ["es6"],
  "notes": [{
    "name": "The ES6 promises spec",
    "href": "https://github.com/domenic/promises-unwrapping"
  },{
    "name": "Chromium dashboard - ES6 Promises",
    "href": "https://www.chromestatus.com/features/5681726336532480"
  },{
    "name": "JavaScript Promises: There and back again - HTML5 Rocks",
    "href": "http://www.html5rocks.com/en/tutorials/es6/promises/"
  }]
}
!*/
/* DOC
Check if browser implements ECMAScript 6 Promises per specification.
*/

  Modernizr.addTest('promises', function() {
    return 'Promise' in window &&
    // Some of these methods are missing from
    // Firefox/Chrome experimental implementations
    'resolve' in window.Promise &&
    'reject' in window.Promise &&
    'all' in window.Promise &&
    'race' in window.Promise &&
    // Older version of the spec had a resolver object
    // as the arg rather than a function
    (function() {
      var resolve;
      new window.Promise(function(r) { resolve = r; });
      return typeof resolve === 'function';
    }());
  });

/*!
{
  "name": "ES6 String",
  "property": "es6string",
  "notes": [{
    "name": "unofficial ECMAScript 6 draft specification",
    "href": "https://people.mozilla.org/~jorendorff/es6-draft.html"
  }],
  "polyfills": ["es6shim"],
  "authors": ["Ron Waldon (@jokeyrhyme)"],
  "warnings": ["ECMAScript 6 is still a only a draft, so this detect may not match the final specification or implementations."],
  "tags": ["es6"]
}
!*/
/* DOC
Check if browser implements ECMAScript 6 String per specification.
*/

  Modernizr.addTest('es6string', !!(String.fromCodePoint &&
    String.raw &&
    String.prototype.codePointAt &&
    String.prototype.repeat &&
    String.prototype.startsWith &&
    String.prototype.endsWith &&
    String.prototype.contains));

/*!
{
  "name": "Beacon API",
  "notes": [{
    "name": "MDN documentation",
    "href": "https://developer.mozilla.org/en-US/docs/Web/API/navigator.sendBeacon"
  },{
    "name": "W3C specification",
    "href": "https://dvcs.w3.org/hg/webperf/raw-file/tip/specs/Beacon/Overview.html"
  }],
  "property": "beacon",
  "tags": ["beacon", "network"],
  "authors": ["Cătălin Mariș"]
}
!*/
/* DOC
Detects support for an API that allows for asynchronous transfer of small HTTP data from the client to a server.
*/

  Modernizr.addTest('beacon', 'sendBeacon' in navigator);

/*!
{
  "name": "Low Bandwidth Connection",
  "property": "lowbandwidth",
  "tags": ["network"],
  "builderAliases": ["network_connection"]
}
!*/
/* DOC
Tests for determining low-bandwidth via `navigator.connection`

There are two iterations of the `navigator.connection` interface.

The first is present in Android 2.2+ and only in the Browser (not WebView)

- http://docs.phonegap.com/en/1.2.0/phonegap_connection_connection.md.html#connection.type
- http://davidbcalhoun.com/2010/using-navigator-connection-android

The second is specced at http://dev.w3.org/2009/dap/netinfo/ and perhaps landing in WebKit

- https://bugs.webkit.org/show_bug.cgi?id=73528

Unknown devices are assumed as fast

For more rigorous network testing, consider boomerang.js: https://github.com/bluesmoon/boomerang/
*/

  Modernizr.addTest('lowbandwidth', function() {
    // polyfill
    var connection = navigator.connection || {type: 0};

    return connection.type == 3 || // connection.CELL_2G
      connection.type == 4 || // connection.CELL_3G
      /^[23]g$/.test(connection.type); // string value in new spec
  });

/*!
{
  "name": "Server Sent Events",
  "property": "eventsource",
  "tags": ["network"],
  "builderAliases": ["network_eventsource"],
  "notes": [{
    "name": "WHATWG Spec",
    "href": "https://html.spec.whatwg.org/multipage/comms.html#server-sent-events"
  }]
}
!*/
/* DOC
Tests for server sent events aka eventsource.
*/

  Modernizr.addTest('eventsource', 'EventSource' in window);

/*!
{
  "name": "Fetch API",
  "property": "fetch",
  "tags": ["network"],
  "caniuse": "fetch",
  "notes": [{
    "name": "Fetch Living Standard",
    "href": "https://fetch.spec.whatwg.org/"
  }],
  "polyfills": ["fetch"]
}
!*/
/* DOC
Detects support for the fetch API, a modern replacement for XMLHttpRequest.
*/

  Modernizr.addTest('fetch', 'fetch' in window);

/*!
{
  "name": "XHR responseType",
  "property": "xhrresponsetype",
  "tags": ["network"],
  "notes": [{
    "name": "XMLHttpRequest Living Standard",
    "href": "https://xhr.spec.whatwg.org/#the-responsetype-attribute"
  }]
}
!*/
/* DOC
Tests for XMLHttpRequest xhr.responseType.
*/

  Modernizr.addTest('xhrresponsetype', (function() {
    if (typeof XMLHttpRequest == 'undefined') {
      return false;
    }
    var xhr = new XMLHttpRequest();
    xhr.open('get', '/', true);
    return 'response' in xhr;
  }()));

/*!
{
  "name": "XML HTTP Request Level 2 XHR2",
  "property": "xhr2",
  "tags": ["network"],
  "builderAliases": ["network_xhr2"],
  "notes": [{
    "name": "W3 Spec",
    "href": "https://www.w3.org/TR/XMLHttpRequest2/"
  },{
    "name": "Details on Related Github Issue",
    "href": "https://github.com/Modernizr/Modernizr/issues/385"
  }]
}
!*/
/* DOC
Tests for XHR2.
*/

  // all three of these details report consistently across all target browsers:
  //   !!(window.ProgressEvent);
  //   'XMLHttpRequest' in window && 'withCredentials' in new XMLHttpRequest
  Modernizr.addTest('xhr2', 'XMLHttpRequest' in window && 'withCredentials' in new XMLHttpRequest());

/*!
{
  "authors": ["Cătălin Mariș"],
  "name": "Speech Synthesis API",
  "notes": [
    {
      "name": "W3C Web Speech API Specification - The SpeechSynthesis Interface",
      "href": "https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html#tts-section"
    }
  ],
  "property": "speechsynthesis",
  "tags": ["input", "speech"]
}
!*/


  Modernizr.addTest('speechsynthesis', 'SpeechSynthesisUtterance' in window);

/*!
{
  "name": "Local Storage",
  "property": "localstorage",
  "caniuse": "namevalue-storage",
  "tags": ["storage"],
  "knownBugs": [],
  "notes": [],
  "warnings": [],
  "polyfills": [
    "joshuabell-polyfill",
    "cupcake",
    "storagepolyfill",
    "amplifyjs",
    "yui-cacheoffline"
  ]
}
!*/

  // In FF4, if disabled, window.localStorage should === null.

  // Normally, we could not test that directly and need to do a
  //   `('localStorage' in window) && ` test first because otherwise Firefox will
  //   throw bugzil.la/365772 if cookies are disabled

  // Also in iOS5 Private Browsing mode, attempting to use localStorage.setItem
  // will throw the exception:
  //   QUOTA_EXCEEDED_ERROR DOM Exception 22.
  // Peculiarly, getItem and removeItem calls do not throw.

  // Because we are forced to try/catch this, we'll go aggressive.

  // Just FWIW: IE8 Compat mode supports these features completely:
  //   www.quirksmode.org/dom/html5.html
  // But IE8 doesn't support either with local files

  Modernizr.addTest('localstorage', function() {
    var mod = 'modernizr';
    try {
      localStorage.setItem(mod, mod);
      localStorage.removeItem(mod);
      return true;
    } catch (e) {
      return false;
    }
  });

/*!
{
  "name": "Session Storage",
  "property": "sessionstorage",
  "tags": ["storage"],
  "polyfills": ["joshuabell-polyfill", "cupcake", "sessionstorage"]
}
!*/

  // Because we are forced to try/catch this, we'll go aggressive.

  // Just FWIW: IE8 Compat mode supports these features completely:
  //   www.quirksmode.org/dom/html5.html
  // But IE8 doesn't support either with local files
  Modernizr.addTest('sessionstorage', function() {
    var mod = 'modernizr';
    try {
      sessionStorage.setItem(mod, mod);
      sessionStorage.removeItem(mod);
      return true;
    } catch (e) {
      return false;
    }
  });

/*!
{
  "name": "Web SQL Database",
  "property": "websqldatabase",
  "caniuse": "sql-storage",
  "tags": ["storage"]
}
!*/

  // Chrome incognito mode used to throw an exception when using openDatabase
  // It doesn't anymore.
  Modernizr.addTest('websqldatabase', 'openDatabase' in window);

/*!
{
  "name": "SVG filters",
  "property": "svgfilters",
  "caniuse": "svg-filters",
  "tags": ["svg"],
  "builderAliases": ["svg_filters"],
  "authors": ["Erik Dahlstrom"],
  "notes": [{
    "name": "W3C Spec",
    "href": "https://www.w3.org/TR/SVG11/filters.html"
  }]
}
!*/

  // Should fail in Safari: https://stackoverflow.com/questions/9739955/feature-detecting-support-for-svg-filters.
  Modernizr.addTest('svgfilters', function() {
    var result = false;
    try {
      result = 'SVGFEColorMatrixElement' in window &&
        SVGFEColorMatrixElement.SVG_FECOLORMATRIX_TYPE_SATURATE == 2;
    }
    catch (e) {}
    return result;
  });

/*!
{
  "name": "URL parser",
  "property": "urlparser",
  "notes": [{
    "name": "URL",
    "href": "https://dvcs.w3.org/hg/url/raw-file/tip/Overview.html"
  }],
  "polyfills": ["urlparser"],
  "authors": ["Ron Waldon (@jokeyrhyme)"],
  "tags": ["url"]
}
!*/
/* DOC
Check if browser implements the URL constructor for parsing URLs.
*/

  Modernizr.addTest('urlparser', function() {
    var url;
    try {
      // have to actually try use it, because Safari defines a dud constructor
      url = new URL('http://modernizr.com/');
      return url.href === 'http://modernizr.com/';
    } catch (e) {
      return false;
    }
  });

/*!
{
  "name": "Binary WebSockets",
  "property": "websocketsbinary",
  "tags": ["websockets"],
  "builderAliases": ["websockets_binary"]
}
!*/

  // binaryType is truthy if there is support.. returns "blob" in new-ish chrome.
  // plus.google.com/115535723976198353696/posts/ERN6zYozENV
  // github.com/Modernizr/Modernizr/issues/370

  Modernizr.addTest('websocketsbinary', function() {
    var protocol = 'https:' == location.protocol ? 'wss' : 'ws',
    protoBin;

    if ('WebSocket' in window) {
      if (protoBin = 'binaryType' in WebSocket.prototype) {
        return protoBin;
      }
      try {
        return !!(new WebSocket(protocol + '://.').binaryType);
      } catch (e) {}
    }

    return false;
  });

/*!
{
  "name": "Base 64 encoding/decoding",
  "property": ["atobbtoa"],
  "builderAliases": ["atob-btoa"],
  "caniuse" : "atob-btoa",
  "tags": ["atob", "base64", "WindowBase64", "btoa"],
  "authors": ["Christian Ulbrich"],
  "notes": [{
    "name": "WindowBase64",
    "href": "https://www.w3.org/TR/html5/webappapis.html#windowbase64"
  }, {
    "name": "MDN documentation",
    "href": "https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/atob"
  }],
  "polyfills": ["base64js"]
}
!*/
/* DOC

Detects support for WindowBase64 API (window.atob && window.btoa).

*/

  Modernizr.addTest('atobbtoa', 'atob' in window && 'btoa' in window, {aliases: ['atob-btoa']});

/*!
{
  "name": "Framed window",
  "property": "framed",
  "tags": ["window"],
  "builderAliases": ["window_framed"]
}
!*/
/* DOC
Tests if page is iframed.
*/

  // github.com/Modernizr/Modernizr/issues/242

  Modernizr.addTest('framed', window.location != top.location);

/*!
{
  "name": "Shared Workers",
  "property": "sharedworkers",
  "caniuse" : "sharedworkers",
  "tags": ["performance", "workers"],
  "builderAliases": ["workers_sharedworkers"],
  "notes": [{
    "name": "W3C Reference",
    "href": "https://www.w3.org/TR/workers/"
  }]
}
!*/
/* DOC
Detects support for the `SharedWorker` API from the Web Workers spec.
*/

  Modernizr.addTest('sharedworkers', 'SharedWorker' in window);

/*!
{
  "name": "Web Workers",
  "property": "webworkers",
  "caniuse" : "webworkers",
  "tags": ["performance", "workers"],
  "notes": [{
    "name": "W3C Reference",
    "href": "https://www.w3.org/TR/workers/"
  }, {
    "name": "HTML5 Rocks article",
    "href": "http://www.html5rocks.com/en/tutorials/workers/basics/"
  }, {
    "name": "MDN documentation",
    "href": "https://developer.mozilla.org/en-US/docs/Web/Guide/Performance/Using_web_workers"
  }],
  "polyfills": ["fakeworker", "html5shims"]
}
!*/
/* DOC
Detects support for the basic `Worker` API from the Web Workers spec. Web Workers provide a simple means for web content to run scripts in background threads.
*/

  Modernizr.addTest('webworkers', 'Worker' in window);


  /**
   * is returns a boolean if the typeof an obj is exactly type.
   *
   * @access private
   * @function is
   * @param {*} obj - A thing we want to check the type of
   * @param {string} type - A string to compare the typeof against
   * @returns {boolean}
   */

  function is(obj, type) {
    return typeof obj === type;
  }
  ;

  /**
   * Run through all tests and detect their support in the current UA.
   *
   * @access private
   */

  function testRunner() {
    var featureNames;
    var feature;
    var aliasIdx;
    var result;
    var nameIdx;
    var featureName;
    var featureNameSplit;

    for (var featureIdx in tests) {
      if (tests.hasOwnProperty(featureIdx)) {
        featureNames = [];
        feature = tests[featureIdx];
        // run the test, throw the return value into the Modernizr,
        // then based on that boolean, define an appropriate className
        // and push it into an array of classes we'll join later.
        //
        // If there is no name, it's an 'async' test that is run,
        // but not directly added to the object. That should
        // be done with a post-run addTest call.
        if (feature.name) {
          featureNames.push(feature.name.toLowerCase());

          if (feature.options && feature.options.aliases && feature.options.aliases.length) {
            // Add all the aliases into the names list
            for (aliasIdx = 0; aliasIdx < feature.options.aliases.length; aliasIdx++) {
              featureNames.push(feature.options.aliases[aliasIdx].toLowerCase());
            }
          }
        }

        // Run the test, or use the raw value if it's not a function
        result = is(feature.fn, 'function') ? feature.fn() : feature.fn;


        // Set each of the names on the Modernizr object
        for (nameIdx = 0; nameIdx < featureNames.length; nameIdx++) {
          featureName = featureNames[nameIdx];
          // Support dot properties as sub tests. We don't do checking to make sure
          // that the implied parent tests have been added. You must call them in
          // order (either in the test, or make the parent test a dependency).
          //
          // Cap it to TWO to make the logic simple and because who needs that kind of subtesting
          // hashtag famous last words
          featureNameSplit = featureName.split('.');

          if (featureNameSplit.length === 1) {
            Modernizr[featureNameSplit[0]] = result;
          } else {
            // cast to a Boolean, if not one already
            /* jshint -W053 */
            if (Modernizr[featureNameSplit[0]] && !(Modernizr[featureNameSplit[0]] instanceof Boolean)) {
              Modernizr[featureNameSplit[0]] = new Boolean(Modernizr[featureNameSplit[0]]);
            }

            Modernizr[featureNameSplit[0]][featureNameSplit[1]] = result;
          }

          classes.push((result ? '' : 'no-') + featureNameSplit.join('-'));
        }
      }
    }
  }
  ;
/*!
{
  "name": "ES5 String.prototype.contains",
  "property": "contains",
  "authors": ["Robert Kowalski"],
  "tags": ["es6"]
}
!*/
/* DOC
Check if browser implements ECMAScript 6 `String.prototype.contains` per specification.
*/

  Modernizr.addTest('contains', is(String.prototype.contains, 'function'));


  /**
   * docElement is a convenience wrapper to grab the root element of the document
   *
   * @access private
   * @returns {HTMLElement|SVGElement} The root element of the document
   */

  var docElement = document.documentElement;
  
/*!
{
  "name": "Context menus",
  "property": "contextmenu",
  "caniuse": "menu",
  "notes": [{
    "name": "W3C spec",
    "href": "http://www.w3.org/TR/html5/interactive-elements.html#context-menus"
  },{
    "name": "thewebrocks.com Demo",
    "href": "http://thewebrocks.com/demos/context-menu/"
  }],
  "polyfills": ["jquery-contextmenu"]
}
!*/
/* DOC
Detects support for custom context menus.
*/

  Modernizr.addTest(
    'contextmenu',
    ('contextMenu' in docElement && 'HTMLMenuItemElement' in window)
  );


  /**
   * A convenience helper to check if the document we are running in is an SVG document
   *
   * @access private
   * @returns {boolean}
   */

  var isSVG = docElement.nodeName.toLowerCase() === 'svg';
  

  /**
   * setClasses takes an array of class names and adds them to the root element
   *
   * @access private
   * @function setClasses
   * @param {string[]} classes - Array of class names
   */

  // Pass in an and array of class names, e.g.:
  //  ['no-webp', 'borderradius', ...]
  function setClasses(classes) {
    var className = docElement.className;
    var classPrefix = Modernizr._config.classPrefix || '';

    if (isSVG) {
      className = className.baseVal;
    }

    // Change `no-js` to `js` (independently of the `enableClasses` option)
    // Handle classPrefix on this too
    if (Modernizr._config.enableJSClass) {
      var reJS = new RegExp('(^|\\s)' + classPrefix + 'no-js(\\s|$)');
      className = className.replace(reJS, '$1' + classPrefix + 'js$2');
    }

    if (Modernizr._config.enableClasses) {
      // Add the new classes
      className += ' ' + classPrefix + classes.join(' ' + classPrefix);
      isSVG ? docElement.className.baseVal = className : docElement.className = className;
    }

  }

  ;

/**
  * @optionName html5shiv
  * @optionProp html5shiv
  */

  // Take the html5 variable out of the html5shiv scope so we can return it.
  var html5;
  if (!isSVG) {
    /**
     * @preserve HTML5 Shiv 3.7.3 | @afarkas @jdalton @jon_neal @rem | MIT/GPL2 Licensed
     */
    ;(function(window, document) {
      /*jshint evil:true */
      /** version */
      var version = '3.7.3';

      /** Preset options */
      var options = window.html5 || {};

      /** Used to skip problem elements */
      var reSkip = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i;

      /** Not all elements can be cloned in IE **/
      var saveClones = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i;

      /** Detect whether the browser supports default html5 styles */
      var supportsHtml5Styles;

      /** Name of the expando, to work with multiple documents or to re-shiv one document */
      var expando = '_html5shiv';

      /** The id for the the documents expando */
      var expanID = 0;

      /** Cached data for each document */
      var expandoData = {};

      /** Detect whether the browser supports unknown elements */
      var supportsUnknownElements;

      (function() {
        try {
          var a = document.createElement('a');
          a.innerHTML = '<xyz></xyz>';
          //if the hidden property is implemented we can assume, that the browser supports basic HTML5 Styles
          supportsHtml5Styles = ('hidden' in a);

          supportsUnknownElements = a.childNodes.length == 1 || (function() {
            // assign a false positive if unable to shiv
            (document.createElement)('a');
            var frag = document.createDocumentFragment();
            return (
              typeof frag.cloneNode == 'undefined' ||
                typeof frag.createDocumentFragment == 'undefined' ||
                typeof frag.createElement == 'undefined'
            );
          }());
        } catch(e) {
          // assign a false positive if detection fails => unable to shiv
          supportsHtml5Styles = true;
          supportsUnknownElements = true;
        }

      }());

      /*--------------------------------------------------------------------------*/

      /**
       * Creates a style sheet with the given CSS text and adds it to the document.
       * @private
       * @param {Document} ownerDocument The document.
       * @param {String} cssText The CSS text.
       * @returns {StyleSheet} The style element.
       */
      function addStyleSheet(ownerDocument, cssText) {
        var p = ownerDocument.createElement('p'),
          parent = ownerDocument.getElementsByTagName('head')[0] || ownerDocument.documentElement;

        p.innerHTML = 'x<style>' + cssText + '</style>';
        return parent.insertBefore(p.lastChild, parent.firstChild);
      }

      /**
       * Returns the value of `html5.elements` as an array.
       * @private
       * @returns {Array} An array of shived element node names.
       */
      function getElements() {
        var elements = html5.elements;
        return typeof elements == 'string' ? elements.split(' ') : elements;
      }

      /**
       * Extends the built-in list of html5 elements
       * @memberOf html5
       * @param {String|Array} newElements whitespace separated list or array of new element names to shiv
       * @param {Document} ownerDocument The context document.
       */
      function addElements(newElements, ownerDocument) {
        var elements = html5.elements;
        if(typeof elements != 'string'){
          elements = elements.join(' ');
        }
        if(typeof newElements != 'string'){
          newElements = newElements.join(' ');
        }
        html5.elements = elements +' '+ newElements;
        shivDocument(ownerDocument);
      }

      /**
       * Returns the data associated to the given document
       * @private
       * @param {Document} ownerDocument The document.
       * @returns {Object} An object of data.
       */
      function getExpandoData(ownerDocument) {
        var data = expandoData[ownerDocument[expando]];
        if (!data) {
          data = {};
          expanID++;
          ownerDocument[expando] = expanID;
          expandoData[expanID] = data;
        }
        return data;
      }

      /**
       * returns a shived element for the given nodeName and document
       * @memberOf html5
       * @param {String} nodeName name of the element
       * @param {Document|DocumentFragment} ownerDocument The context document.
       * @returns {Object} The shived element.
       */
      function createElement(nodeName, ownerDocument, data){
        if (!ownerDocument) {
          ownerDocument = document;
        }
        if(supportsUnknownElements){
          return ownerDocument.createElement(nodeName);
        }
        if (!data) {
          data = getExpandoData(ownerDocument);
        }
        var node;

        if (data.cache[nodeName]) {
          node = data.cache[nodeName].cloneNode();
        } else if (saveClones.test(nodeName)) {
          node = (data.cache[nodeName] = data.createElem(nodeName)).cloneNode();
        } else {
          node = data.createElem(nodeName);
        }

        // Avoid adding some elements to fragments in IE < 9 because
        // * Attributes like `name` or `type` cannot be set/changed once an element
        //   is inserted into a document/fragment
        // * Link elements with `src` attributes that are inaccessible, as with
        //   a 403 response, will cause the tab/window to crash
        // * Script elements appended to fragments will execute when their `src`
        //   or `text` property is set
        return node.canHaveChildren && !reSkip.test(nodeName) && !node.tagUrn ? data.frag.appendChild(node) : node;
      }

      /**
       * returns a shived DocumentFragment for the given document
       * @memberOf html5
       * @param {Document} ownerDocument The context document.
       * @returns {Object} The shived DocumentFragment.
       */
      function createDocumentFragment(ownerDocument, data){
        if (!ownerDocument) {
          ownerDocument = document;
        }
        if(supportsUnknownElements){
          return ownerDocument.createDocumentFragment();
        }
        data = data || getExpandoData(ownerDocument);
        var clone = data.frag.cloneNode(),
          i = 0,
          elems = getElements(),
          l = elems.length;
        for(;i<l;i++){
          clone.createElement(elems[i]);
        }
        return clone;
      }

      /**
       * Shivs the `createElement` and `createDocumentFragment` methods of the document.
       * @private
       * @param {Document|DocumentFragment} ownerDocument The document.
       * @param {Object} data of the document.
       */
      function shivMethods(ownerDocument, data) {
        if (!data.cache) {
          data.cache = {};
          data.createElem = ownerDocument.createElement;
          data.createFrag = ownerDocument.createDocumentFragment;
          data.frag = data.createFrag();
        }


        ownerDocument.createElement = function(nodeName) {
          //abort shiv
          if (!html5.shivMethods) {
            return data.createElem(nodeName);
          }
          return createElement(nodeName, ownerDocument, data);
        };

        ownerDocument.createDocumentFragment = Function('h,f', 'return function(){' +
                                                        'var n=f.cloneNode(),c=n.createElement;' +
                                                        'h.shivMethods&&(' +
                                                        // unroll the `createElement` calls
                                                        getElements().join().replace(/[\w\-:]+/g, function(nodeName) {
          data.createElem(nodeName);
          data.frag.createElement(nodeName);
          return 'c("' + nodeName + '")';
        }) +
          ');return n}'
                                                       )(html5, data.frag);
      }

      /*--------------------------------------------------------------------------*/

      /**
       * Shivs the given document.
       * @memberOf html5
       * @param {Document} ownerDocument The document to shiv.
       * @returns {Document} The shived document.
       */
      function shivDocument(ownerDocument) {
        if (!ownerDocument) {
          ownerDocument = document;
        }
        var data = getExpandoData(ownerDocument);

        if (html5.shivCSS && !supportsHtml5Styles && !data.hasCSS) {
          data.hasCSS = !!addStyleSheet(ownerDocument,
                                        // corrects block display not defined in IE6/7/8/9
                                        'article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}' +
                                        // adds styling not present in IE6/7/8/9
                                        'mark{background:#FF0;color:#000}' +
                                        // hides non-rendered elements
                                        'template{display:none}'
                                       );
        }
        if (!supportsUnknownElements) {
          shivMethods(ownerDocument, data);
        }
        return ownerDocument;
      }

      /*--------------------------------------------------------------------------*/

      /**
       * The `html5` object is exposed so that more elements can be shived and
       * existing shiving can be detected on iframes.
       * @type Object
       * @example
       *
       * // options can be changed before the script is included
       * html5 = { 'elements': 'mark section', 'shivCSS': false, 'shivMethods': false };
       */
      var html5 = {

        /**
         * An array or space separated string of node names of the elements to shiv.
         * @memberOf html5
         * @type Array|String
         */
        'elements': options.elements || 'abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video',

        /**
         * current version of html5shiv
         */
        'version': version,

        /**
         * A flag to indicate that the HTML5 style sheet should be inserted.
         * @memberOf html5
         * @type Boolean
         */
        'shivCSS': (options.shivCSS !== false),

        /**
         * Is equal to true if a browser supports creating unknown/HTML5 elements
         * @memberOf html5
         * @type boolean
         */
        'supportsUnknownElements': supportsUnknownElements,

        /**
         * A flag to indicate that the document's `createElement` and `createDocumentFragment`
         * methods should be overwritten.
         * @memberOf html5
         * @type Boolean
         */
        'shivMethods': (options.shivMethods !== false),

        /**
         * A string to describe the type of `html5` object ("default" or "default print").
         * @memberOf html5
         * @type String
         */
        'type': 'default',

        // shivs the document according to the specified `html5` object options
        'shivDocument': shivDocument,

        //creates a shived element
        createElement: createElement,

        //creates a shived documentFragment
        createDocumentFragment: createDocumentFragment,

        //extends list of elements
        addElements: addElements
      };

      /*--------------------------------------------------------------------------*/

      // expose html5
      window.html5 = html5;

      // shiv the document
      shivDocument(document);

      if(typeof module == 'object' && module.exports){
        module.exports = html5;
      }

    }(typeof window !== "undefined" ? window : this, document));
  }
;

  /**
   * createElement is a convenience wrapper around document.createElement. Since we
   * use createElement all over the place, this allows for (slightly) smaller code
   * as well as abstracting away issues with creating elements in contexts other than
   * HTML documents (e.g. SVG documents).
   *
   * @access private
   * @function createElement
   * @returns {HTMLElement|SVGElement} An HTML or SVG element
   */

  function createElement() {
    if (typeof document.createElement !== 'function') {
      // This is the case in IE7, where the type of createElement is "object".
      // For this reason, we cannot call apply() as Object is not a Function.
      return document.createElement(arguments[0]);
    } else if (isSVG) {
      return document.createElementNS.call(document, 'http://www.w3.org/2000/svg', arguments[0]);
    } else {
      return document.createElement.apply(document, arguments);
    }
  }

  ;
/*!
{
  "name" : "HTML5 Audio Element",
  "property": "audio",
  "tags" : ["html5", "audio", "media"]
}
!*/
/* DOC
Detects the audio element
*/

  // This tests evaluates support of the audio element, as well as
  // testing what types of content it supports.
  //
  // We're using the Boolean constructor here, so that we can extend the value
  // e.g.  Modernizr.audio     // true
  //       Modernizr.audio.ogg // 'probably'
  //
  // Codec values from : github.com/NielsLeenheer/html5test/blob/9106a8/index.html#L845
  //                     thx to NielsLeenheer and zcorpan

  // Note: in some older browsers, "no" was a return value instead of empty string.
  //   It was live in FF3.5.0 and 3.5.1, but fixed in 3.5.2
  //   It was also live in Safari 4.0.0 - 4.0.4, but fixed in 4.0.5
  Modernizr.addTest('audio', function() {
    /* jshint -W053 */
    var elem = createElement('audio');
    var bool = false;

    try {
      if (bool = !!elem.canPlayType) {
        bool      = new Boolean(bool);
        bool.ogg  = elem.canPlayType('audio/ogg; codecs="vorbis"') .replace(/^no$/, '');
        bool.mp3  = elem.canPlayType('audio/mpeg; codecs="mp3"')   .replace(/^no$/, '');
        bool.opus  = elem.canPlayType('audio/ogg; codecs="opus"')  ||
                     elem.canPlayType('audio/webm; codecs="opus"') .replace(/^no$/, '');

        // Mimetypes accepted:
        //   developer.mozilla.org/En/Media_formats_supported_by_the_audio_and_video_elements
        //   bit.ly/iphoneoscodecs
        bool.wav  = elem.canPlayType('audio/wav; codecs="1"')     .replace(/^no$/, '');
        bool.m4a  = (elem.canPlayType('audio/x-m4a;')            ||
                     elem.canPlayType('audio/aac;'))             .replace(/^no$/, '');
      }
    } catch (e) { }

    return bool;
  });

/*!
{
  "name": "Canvas",
  "property": "canvas",
  "caniuse": "canvas",
  "tags": ["canvas", "graphics"],
  "polyfills": ["flashcanvas", "excanvas", "slcanvas", "fxcanvas"]
}
!*/
/* DOC
Detects support for the `<canvas>` element for 2D drawing.
*/

  // On the S60 and BB Storm, getContext exists, but always returns undefined
  // so we actually have to call getContext() to verify
  // github.com/Modernizr/Modernizr/issues/issue/97/
  Modernizr.addTest('canvas', function() {
    var elem = createElement('canvas');
    return !!(elem.getContext && elem.getContext('2d'));
  });

/*!
{
  "name": "Canvas text",
  "property": "canvastext",
  "caniuse": "canvas-text",
  "tags": ["canvas", "graphics"],
  "polyfills": ["canvastext"]
}
!*/
/* DOC
Detects support for the text APIs for `<canvas>` elements.
*/

  Modernizr.addTest('canvastext',  function() {
    if (Modernizr.canvas  === false) {
      return false;
    }
    return typeof createElement('canvas').getContext('2d').fillText == 'function';
  });

/*!
{
  "name": "Content Editable",
  "property": "contenteditable",
  "caniuse": "contenteditable",
  "notes": [{
    "name": "WHATWG spec",
    "href": "https://html.spec.whatwg.org/multipage/interaction.html#contenteditable"
  }]
}
!*/
/* DOC
Detects support for the `contenteditable` attribute of elements, allowing their DOM text contents to be edited directly by the user.
*/

  Modernizr.addTest('contenteditable', function() {
    // early bail out
    if (!('contentEditable' in docElement)) {
      return;
    }

    // some mobile browsers (android < 3.0, iOS < 5) claim to support
    // contentEditable, but but don't really. This test checks to see
    // confirms whether or not it actually supports it.

    var div = createElement('div');
    div.contentEditable = true;
    return div.contentEditable === 'true';
  });

/*!
{
  "name": "IE User Data API",
  "property": "userdata",
  "tags": ["storage"],
  "authors": ["@stereobooster"],
  "notes": [{
    "name": "MSDN Documentation",
    "href": "https://msdn.microsoft.com/en-us/library/ms531424.aspx"
  }]
}
!*/
/* DOC
Detects support for IE userData for persisting data, an API similar to localStorage but supported since IE5.
*/

  Modernizr.addTest('userdata', !!createElement('div').addBehavior);

/*!
{
  "name": "HTML5 Video",
  "property": "video",
  "caniuse": "video",
  "tags": ["html5"],
  "knownBugs": [
    "Without QuickTime, `Modernizr.video.h264` will be `undefined`; https://github.com/Modernizr/Modernizr/issues/546"
  ],
  "polyfills": [
    "html5media",
    "mediaelementjs",
    "sublimevideo",
    "videojs",
    "leanbackplayer",
    "videoforeverybody"
  ]
}
!*/
/* DOC
Detects support for the video element, as well as testing what types of content it supports.

Subproperties are provided to describe support for `ogg`, `h264` and `webm` formats, e.g.:

```javascript
Modernizr.video         // true
Modernizr.video.ogg     // 'probably'
```
*/

  // Codec values from : github.com/NielsLeenheer/html5test/blob/9106a8/index.html#L845
  //                     thx to NielsLeenheer and zcorpan

  // Note: in some older browsers, "no" was a return value instead of empty string.
  //   It was live in FF3.5.0 and 3.5.1, but fixed in 3.5.2
  //   It was also live in Safari 4.0.0 - 4.0.4, but fixed in 4.0.5

  Modernizr.addTest('video', function() {
    /* jshint -W053 */
    var elem = createElement('video');
    var bool = false;

    // IE9 Running on Windows Server SKU can cause an exception to be thrown, bug #224
    try {
      if (bool = !!elem.canPlayType) {
        bool = new Boolean(bool);
        bool.ogg = elem.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, '');

        // Without QuickTime, this value will be `undefined`. github.com/Modernizr/Modernizr/issues/546
        bool.h264 = elem.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, '');

        bool.webm = elem.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, '');

        bool.vp9 = elem.canPlayType('video/webm; codecs="vp9"').replace(/^no$/, '');

        bool.hls = elem.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/, '');
      }
    } catch (e) {}

    return bool;
  });

/*!
{
  "name": "VML",
  "property": "vml",
  "caniuse": "vml",
  "tags": ["vml"],
  "authors": ["Craig Andrews (@candrews)"],
  "notes": [{
    "name" : "W3C VML reference",
    "href": "https://www.w3.org/TR/NOTE-VML"
  },{
    "name" : "Microsoft VML reference",
    "href": "https://msdn.microsoft.com/en-us/library/bb263898.aspx"
  }]
}
!*/
/* DOC
Detects support for VML.
*/

  Modernizr.addTest('vml', function() {
    var containerDiv = createElement('div');
    var supports = false;
    var shape;

     if (!isSVG) {
      containerDiv.innerHTML = '<v:shape id="vml_flag1" adj="1" />';
      shape = containerDiv.firstChild;
      if ('style' in shape) {
        shape.style.behavior = 'url(#default#VML)';
      }
      supports = shape ? typeof shape.adj == 'object' : true;
    }

    return supports;
  });

/*!
{
  "name": "Web Animation API",
  "property": "animation",
  "tags": ["webanimations"],
  "polyfills": ["webanimationsjs"],
  "notes": [{
    "name": "Introducing Web Animations",
    "href": "http://brian.sol1.net/svg/2013/06/26/introducing-web-animations/"
  }]
}
!*/
/* DOC
Detects support for the Web Animation API, a way to create css animations in js
*/

  Modernizr.addTest('webanimations', 'animate' in createElement('div'));

/*!
{
  "name": "WebGL",
  "property": "webgl",
  "caniuse": "webgl",
  "tags": ["webgl", "graphics"],
  "polyfills": ["jebgl", "cwebgl", "iewebgl"]
}
!*/

  Modernizr.addTest('webgl', function() {
    var canvas = createElement('canvas');
    var supports = 'probablySupportsContext' in canvas ? 'probablySupportsContext' :  'supportsContext';
    if (supports in canvas) {
      return canvas[supports]('webgl') || canvas[supports]('experimental-webgl');
    }
    return 'WebGLRenderingContext' in window;
  });

/*!
{
  "name": "canvas blending support",
  "property": "canvasblending",
  "tags": ["canvas"],
  "async" : false,
  "notes": [{
      "name": "HTML5 Spec",
      "href": "https://dvcs.w3.org/hg/FXTF/rawfile/tip/compositing/index.html#blending"
    },
    {
      "name": "Article",
      "href": "https://blogs.adobe.com/webplatform/2013/01/28/blending-features-in-canvas"
    }]
}
!*/
/* DOC
Detects if Photoshop style blending modes are available in canvas.
*/


  Modernizr.addTest('canvasblending', function() {
    if (Modernizr.canvas === false) {
      return false;
    }
    var ctx = createElement('canvas').getContext('2d');
    // firefox 3 throws an error when setting an invalid `globalCompositeOperation`
    try {
      ctx.globalCompositeOperation = 'screen';
    } catch (e) {}

    return ctx.globalCompositeOperation === 'screen';
  });


/*!
{
  "name": "canvas winding support",
  "property": ["canvaswinding"],
  "tags": ["canvas"],
  "async" : false,
  "notes": [{
    "name": "Article",
    "href": "https://blogs.adobe.com/webplatform/2013/01/30/winding-rules-in-canvas/"
  }]
}
!*/
/* DOC
Determines if winding rules, which controls if a path can go clockwise or counterclockwise
*/


  Modernizr.addTest('canvaswinding', function() {
    if (Modernizr.canvas === false) {
      return false;
    }
    var ctx = createElement('canvas').getContext('2d');

    ctx.rect(0, 0, 10, 10);
    ctx.rect(2, 2, 6, 6);
    return ctx.isPointInPath(5, 5, 'evenodd') === false;
  });


/*!
{
  "name": "Background Position Shorthand",
  "property": "bgpositionshorthand",
  "tags": ["css"],
  "builderAliases": ["css_backgroundposition_shorthand"],
  "notes": [{
    "name": "MDN Docs",
    "href": "https://developer.mozilla.org/en/CSS/background-position"
  }, {
    "name": "W3 Spec",
    "href": "https://www.w3.org/TR/css3-background/#background-position"
  }, {
    "name": "Demo",
    "href": "https://jsfiddle.net/Blink/bBXvt/"
  }]
}
!*/
/* DOC
Detects if you can use the shorthand method to define multiple parts of an
element's background-position simultaniously.

eg `background-position: right 10px bottom 10px`
*/

  Modernizr.addTest('bgpositionshorthand', function() {
    var elem = createElement('a');
    var eStyle = elem.style;
    var val = 'right 10px bottom 10px';
    eStyle.cssText = 'background-position: ' + val + ';';
    return (eStyle.backgroundPosition === val);
  });

/*!
{
  "name": "createElement with Attributes",
  "property": ["createelementattrs", "createelement-attrs"],
  "tags": ["dom"],
  "builderAliases": ["dom_createElement_attrs"],
  "authors": ["James A. Rosen"],
  "notes": [{
    "name": "Related Github Issue",
    "href": "https://github.com/Modernizr/Modernizr/issues/258"
  }]
}
!*/

  Modernizr.addTest('createelementattrs', function() {
    try {
      return createElement('<input name="test" />').getAttribute('name') == 'test';
    } catch (e) {
      return false;
    }
  }, {
    aliases: ['createelement-attrs']
  });

/*!
{
  "name": "bdi Element",
  "property": "bdi",
  "notes": [{
    "name": "MDN Overview",
    "href": "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/bdi"
  }]
}
!*/
/* DOC
Detect support for the bdi element, a way to have text that is isolated from its possibly bidirectional surroundings
*/

  Modernizr.addTest('bdi', function() {
    var div = createElement('div');
    var bdi = createElement('bdi');

    bdi.innerHTML = '&#1573;';
    div.appendChild(bdi);

    docElement.appendChild(div);

    var supports = ((window.getComputedStyle ?
          getComputedStyle(bdi, null) :
          bdi.currentStyle).direction === 'rtl');

    docElement.removeChild(div);

    return supports;
  });

/*!
{
  "name": "output Element",
  "property": "outputelem",
  "tags": ["elem"],
  "builderAliases": ["elem_output"],
  "notes": [{
    "name": "WhatWG Spec",
    "href": "https://html.spec.whatwg.org/multipage/forms.html#the-output-element"
  }]
}
!*/

  Modernizr.addTest('outputelem', 'value' in createElement('output'));

/*!
{
  "name": "progress Element",
  "caniuse": "progress",
  "property": ["progressbar", "meter"],
  "tags": ["elem"],
  "builderAliases": ["elem_progress_meter"],
  "authors": ["Stefan Wallin"]
}
!*/

  // Tests for progressbar-support. All browsers that don't support progressbar returns undefined =)
  Modernizr.addTest('progressbar', createElement('progress').max !== undefined);

  // Tests for meter-support. All browsers that don't support meters returns undefined =)
  Modernizr.addTest('meter', createElement('meter').max !== undefined);

/*!
{
  "name": "input[capture] Attribute",
  "property": "capture",
  "tags": ["video", "image", "audio", "media", "attribute"],
  "notes": [{
    "name": "W3C draft: HTML Media Capture",
    "href": "https://www.w3.org/TR/html-media-capture/"
  }]
}
!*/
/* DOC
When used on an `<input>`, this attribute signifies that the resource it takes should be generated via device's camera, camcorder, sound recorder.
*/

  // testing for capture attribute in inputs
  Modernizr.addTest('capture', ('capture' in createElement('input')));

/*!
{
  "name": "input[file] Attribute",
  "property": "fileinput",
  "caniuse" : "forms",
  "tags": ["file", "forms", "input"],
  "builderAliases": ["forms_fileinput"]
}
!*/
/* DOC
Detects whether input type="file" is available on the platform

E.g. iOS < 6 and some android version don't support this
*/

  Modernizr.addTest('fileinput', function() {
    if (navigator.userAgent.match(/(Android (1.0|1.1|1.5|1.6|2.0|2.1))|(Windows Phone (OS 7|8.0))|(XBLWP)|(ZuneWP)|(w(eb)?OSBrowser)|(webOS)|(Kindle\/(1.0|2.0|2.5|3.0))/)) {
      return false;
    }
    var elem = createElement('input');
    elem.type = 'file';
    return !elem.disabled;
  });

/*!
{
  "name": "input[form] Attribute",
  "property": "formattribute",
  "tags": ["attribute", "forms", "input"],
  "builderAliases": ["forms_formattribute"]
}
!*/
/* DOC
Detects whether input form="form_id" is available on the platform
E.g. IE 10 (and below), don't support this
*/


  Modernizr.addTest('formattribute', function() {
    var form = createElement('form');
    var input = createElement('input');
    var div = createElement('div');
    var id = 'formtest' + (new Date()).getTime();
    var attr;
    var bool = false;

    form.id = id;

    //IE6/7 confuses the form idl attribute and the form content attribute, so we use document.createAttribute
    try {
      input.setAttribute('form', id);
    }
    catch (e) {
      if (document.createAttribute) {
        attr = document.createAttribute('form');
        attr.nodeValue = id;
        input.setAttributeNode(attr);
      }
    }

    div.appendChild(form);
    div.appendChild(input);

    docElement.appendChild(div);

    bool = form.elements && form.elements.length === 1 && input.form == form;

    div.parentNode.removeChild(div);
    return bool;
  });

/*!
{
  "name": "placeholder attribute",
  "property": "placeholder",
  "tags": ["forms", "attribute"],
  "builderAliases": ["forms_placeholder"]
}
!*/
/* DOC
Tests for placeholder attribute in inputs and textareas
*/

  Modernizr.addTest('placeholder', ('placeholder' in createElement('input') && 'placeholder' in createElement('textarea')));

/*!
{
  "name": "iframe[sandbox] Attribute",
  "property": "sandbox",
  "tags": ["iframe"],
  "builderAliases": ["iframe_sandbox"],
  "notes": [
  {
    "name": "WhatWG Spec",
    "href": "https://html.spec.whatwg.org/multipage/embedded-content.html#attr-iframe-sandbox"
  }],
  "knownBugs": [ "False-positive on Firefox < 29" ]
}
!*/
/* DOC
Test for `sandbox` attribute in iframes.
*/

  Modernizr.addTest('sandbox', 'sandbox' in createElement('iframe'));

/*!
{
  "name": "iframe[seamless] Attribute",
  "property": "seamless",
  "tags": ["iframe"],
  "builderAliases": ["iframe_seamless"],
  "notes": [{
    "name": "WhatWG Spec",
    "href": "https://html.spec.whatwg.org/multipage/embedded-content.html#attr-iframe-seamless"
  }]
}
!*/
/* DOC
Test for `seamless` attribute in iframes.
*/

  Modernizr.addTest('seamless', 'seamless' in createElement('iframe'));

/*!
{
  "name": "iframe[srcdoc] Attribute",
  "property": "srcdoc",
  "tags": ["iframe"],
  "builderAliases": ["iframe_srcdoc"],
  "notes": [{
    "name": "WhatWG Spec",
    "href": "https://html.spec.whatwg.org/multipage/embedded-content.html#attr-iframe-srcdoc"
  }]
}
!*/
/* DOC
Test for `srcdoc` attribute in iframes.
*/

  Modernizr.addTest('srcdoc', 'srcdoc' in createElement('iframe'));

/*!
{
  "name": "Image crossOrigin",
  "property": "imgcrossorigin",
  "notes": [{
    "name": "Cross Domain Images and the Tainted Canvas",
    "href": "https://blog.codepen.io/2013/10/08/cross-domain-images-tainted-canvas/"
  }]
}
!*/
/* DOC
Detects support for the crossOrigin attribute on images, which allow for cross domain images inside of a canvas without tainting it
*/

    Modernizr.addTest('imgcrossorigin', 'crossOrigin' in createElement('img'));

/*!
{
  "name": "srcset attribute",
  "property": "srcset",
  "tags": ["image"],
  "notes": [{
    "name": "Smashing Magazine Article",
    "href": "https://en.wikipedia.org/wiki/APNG"
    },{
    "name": "Generate multi-resolution images for srcset with Grunt",
    "href": "https://addyosmani.com/blog/generate-multi-resolution-images-for-srcset-with-grunt/"
    }]
}
!*/
/* DOC
Test for the srcset attribute of images
*/

  Modernizr.addTest('srcset', 'srcset' in createElement('img'));

/*!
{
  "name": "input formaction",
  "property": "inputformaction",
  "aliases": ["input-formaction"],
  "notes": [{
    "name": "WHATWG Spec",
    "href": "https://html.spec.whatwg.org/multipage/forms.html#attr-fs-formaction"
  }, {
    "name": "Wufoo demo",
    "href": "https://www.wufoo.com/html5/attributes/13-formaction.html"
  }],
  "polyfills": [
    "webshims"
  ]
}
!*/
/* DOC
Detect support for the formaction attribute on form inputs
*/

  Modernizr.addTest('inputformaction', !!('formAction' in createElement('input')), {aliases: ['input-formaction']});

/*!
{
  "name": "input formenctype",
  "property": "inputformenctype",
  "aliases": ["input-formenctype"],
  "notes": [{
    "name": "WHATWG Spec",
    "href": "https://html.spec.whatwg.org/multipage/forms.html#attr-fs-formenctype"
  }, {
    "name": "Wufoo demo",
    "href": "https://www.wufoo.com/html5/attributes/16-formenctype.html"
  }],
  "polyfills": [
    "html5formshim"
  ]
}
!*/
/* DOC
Detect support for the formenctype attribute on form inputs, which overrides the form enctype attribute
*/

  Modernizr.addTest('inputformenctype', !!('formEnctype' in createElement('input')), {aliases: ['input-formenctype']});

/*!
{
  "name": "input formmethod",
  "property": "inputformmethod",
  "notes": [{
    "name": "WHATWG Spec",
    "href": "https://html.spec.whatwg.org/multipage/forms.html#attr-fs-formmethod"
  }, {
    "name": "Wufoo demo",
    "href": "https://www.wufoo.com/html5/attributes/14-formmethod.html"
  }],
  "polyfills": [
    "webshims"
  ]
}
!*/
/* DOC
Detect support for the formmethod attribute on form inputs
*/

  Modernizr.addTest('inputformmethod', !!('formMethod' in createElement('input')));

/*!
{
  "name": "input formtarget",
  "property": "inputformtarget",
  "aliases": ["input-formtarget"],
  "notes": [{
    "name": "WHATWG Spec",
    "href": "https://html.spec.whatwg.org/multipage/forms.html#attr-fs-formtarget"
  }, {
    "name": "Wufoo demo",
    "href": "https://www.wufoo.com/html5/attributes/15-formtarget.html"
  }],
  "polyfills": [
    "html5formshim"
  ]
}
!*/
/* DOC
Detect support for the formtarget attribute on form inputs, which overrides the form target attribute
*/

  Modernizr.addTest('inputformtarget', !!('formtarget' in createElement('input')), {aliases: ['input-formtarget']});

/*!
{
  "name": "script[async]",
  "property": "scriptasync",
  "caniuse": "script-async",
  "tags": ["script"],
  "builderAliases": ["script_async"],
  "authors": ["Theodoor van Donge"]
}
!*/
/* DOC
Detects support for the `async` attribute on the `<script>` element.
*/

  Modernizr.addTest('scriptasync', 'async' in createElement('script'));

/*!
{
  "name": "script[defer]",
  "property": "scriptdefer",
  "caniuse": "script-defer",
  "tags": ["script"],
  "builderAliases": ["script_defer"],
  "authors": ["Theodoor van Donge"],
  "warnings": ["Browser implementation of the `defer` attribute vary: https://stackoverflow.com/questions/3952009/defer-attribute-chrome#answer-3982619"],
  "knownBugs": ["False positive in Opera 12"]
}
!*/
/* DOC
Detects support for the `defer` attribute on the `<script>` element.
*/

  Modernizr.addTest('scriptdefer', 'defer' in createElement('script'));

/*!
{
  "name": "style[scoped]",
  "property": "stylescoped",
  "caniuse": "style-scoped",
  "tags": ["dom"],
  "builderAliases": ["style_scoped"],
  "authors": ["Cătălin Mariș"],
  "notes": [{
    "name": "WHATWG Specification",
    "href": "https://html.spec.whatwg.org/multipage/semantics.html#attr-style-scoped"
  }],
  "polyfills": ["scoped-styles"]
}
!*/
/* DOC
Support for the `scoped` attribute of the `<style>` element.
*/

  Modernizr.addTest('stylescoped', 'scoped' in createElement('style'));

/*!
{
  "name": "Inline SVG",
  "property": "inlinesvg",
  "caniuse": "svg-html5",
  "tags": ["svg"],
  "notes": [{
    "name": "Test page",
    "href": "https://paulirish.com/demo/inline-svg"
  }, {
    "name": "Test page and results",
    "href": "https://codepen.io/eltonmesquita/full/GgXbvo/"
  }],
  "polyfills": ["inline-svg-polyfill"],
  "knownBugs": ["False negative on some Chromia browsers."]
}
!*/
/* DOC
Detects support for inline SVG in HTML (not within XHTML).
*/

  Modernizr.addTest('inlinesvg', function() {
    var div = createElement('div');
    div.innerHTML = '<svg/>';
    return (typeof SVGRect != 'undefined' && div.firstChild && div.firstChild.namespaceURI) == 'http://www.w3.org/2000/svg';
  });

/*!
{
  "name": "textarea maxlength",
  "property": "textareamaxlength",
  "aliases": ["textarea-maxlength"],
  "notes": [{
    "name": "MDN documentation",
    "href": "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea"
  }],
  "polyfills": [
    "maxlength"
  ]
}
!*/
/* DOC
Detect support for the maxlength attribute of a textarea element
*/

  Modernizr.addTest('textareamaxlength', !!('maxLength' in createElement('textarea')));

/*!
{
  "name": "Video Loop Attribute",
  "property": "videoloop",
  "tags": ["video", "media"]
}
!*/

  Modernizr.addTest('videoloop', 'loop' in createElement('video'));

/*!
{
  "name": "Video Preload Attribute",
  "property": "videopreload",
  "tags": ["video", "media"]
}
!*/

  Modernizr.addTest('videopreload', 'preload' in createElement('video'));

/*!
{
  "name": "WebGL Extensions",
  "property": "webglextensions",
  "tags": ["webgl", "graphics"],
  "builderAliases": ["webgl_extensions"],
  "async" : true,
  "authors": ["Ilmari Heikkinen"],
  "knownBugs": [],
  "notes": [{
    "name": "Kronos extensions registry",
    "href": "http://www.khronos.org/registry/webgl/extensions/"
  }]
}
!*/
/* DOC
Detects support for OpenGL extensions in WebGL. It's `true` if the [WebGL extensions API](https://developer.mozilla.org/en-US/docs/Web/WebGL/Using_Extensions) is supported, then exposes the supported extensions as subproperties, e.g.:

```javascript
if (Modernizr.webglextensions) {
  // WebGL extensions API supported
}
if ('OES_vertex_array_object' in Modernizr.webglextensions) {
  // Vertex Array Objects extension supported
}
```
*/

  // based on code from ilmari heikkinen
  // code.google.com/p/graphics-detect/source/browse/js/detect.js

  // Not Async but handles it's own self
  Modernizr.addAsyncTest(function() {
    /* jshint -W053 */

    // Not a good candidate for css classes, so we avoid addTest stuff
    Modernizr.webglextensions = new Boolean(false);

    if (!Modernizr.webgl) {
      return;
    }

    var canvas;
    var ctx;
    var exts;

    try {
      canvas = createElement('canvas');
      ctx = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      exts = ctx.getSupportedExtensions();
    }
    catch (e) {
      return;
    }

    if (ctx !== undefined) {
      Modernizr.webglextensions = new Boolean(true);
    }

    for (var i = -1, len = exts.length; ++i < len;) {
      Modernizr.webglextensions[exts[i]] = true;
    }

    canvas = undefined;
  });


  /**
   * Modernizr.hasEvent() detects support for a given event
   *
   * @memberof Modernizr
   * @name Modernizr.hasEvent
   * @optionName Modernizr.hasEvent()
   * @optionProp hasEvent
   * @access public
   * @function hasEvent
   * @param  {string|*} eventName - the name of an event to test for (e.g. "resize")
   * @param  {Element|string} [element=HTMLDivElement] - is the element|document|window|tagName to test on
   * @returns {boolean}
   * @example
   *  `Modernizr.hasEvent` lets you determine if the browser supports a supplied event.
   *  By default, it does this detection on a div element
   *
   * ```js
   *  hasEvent('blur') // true;
   * ```
   *
   * However, you are able to give an object as a second argument to hasEvent to
   * detect an event on something other than a div.
   *
   * ```js
   *  hasEvent('devicelight', window) // true;
   * ```
   *
   */

  var hasEvent = (function() {

    // Detect whether event support can be detected via `in`. Test on a DOM element
    // using the "blur" event b/c it should always exist. bit.ly/event-detection
    var needsFallback = !('onblur' in document.documentElement);

    function inner(eventName, element) {

      var isSupported;
      if (!eventName) { return false; }
      if (!element || typeof element === 'string') {
        element = createElement(element || 'div');
      }

      // Testing via the `in` operator is sufficient for modern browsers and IE.
      // When using `setAttribute`, IE skips "unload", WebKit skips "unload" and
      // "resize", whereas `in` "catches" those.
      eventName = 'on' + eventName;
      isSupported = eventName in element;

      // Fallback technique for old Firefox - bit.ly/event-detection
      if (!isSupported && needsFallback) {
        if (!element.setAttribute) {
          // Switch to generic element if it lacks `setAttribute`.
          // It could be the `document`, `window`, or something else.
          element = createElement('div');
        }

        element.setAttribute(eventName, '');
        isSupported = typeof element[eventName] === 'function';

        if (element[eventName] !== undefined) {
          // If property was created, "remove it" by setting value to `undefined`.
          element[eventName] = undefined;
        }
        element.removeAttribute(eventName);
      }

      return isSupported;
    }
    return inner;
  })();


  ModernizrProto.hasEvent = hasEvent;
  
/*!
{
  "name": "Ambient Light Events",
  "property": "ambientlight",
  "notes": [{
    "name": "W3C Ambient Light Events",
    "href": "https://www.w3.org/TR/ambient-light/"
  }]
}
!*/
/* DOC
Detects support for the API that provides information about the ambient light levels, as detected by the device's light detector, in terms of lux units.
*/

  Modernizr.addTest('ambientlight', hasEvent('devicelight', window));

/*!
{
  "name": "Hashchange event",
  "property": "hashchange",
  "caniuse": "hashchange",
  "tags": ["history"],
  "notes": [{
    "name": "MDN documentation",
    "href": "https://developer.mozilla.org/en-US/docs/Web/API/window.onhashchange"
  }],
  "polyfills": [
    "jquery-hashchange",
    "moo-historymanager",
    "jquery-ajaxy",
    "hasher",
    "shistory"
  ]
}
!*/
/* DOC
Detects support for the `hashchange` event, fired when the current location fragment changes.
*/

  Modernizr.addTest('hashchange', function() {
    if (hasEvent('hashchange', window) === false) {
      return false;
    }

    // documentMode logic from YUI to filter out IE8 Compat Mode
    //   which false positives.
    return (document.documentMode === undefined || document.documentMode > 7);
  });

/*!
{
  "name": "input[search] search event",
  "property": "search",
  "tags": ["input","search"],
  "authors": ["Calvin Webster"],
  "notes": [{
    "name": "Wufoo demo",
    "href": "https://www.wufoo.com/html5/types/5-search.html?"
  }, {
    "name": "CSS Tricks",
    "href": "https://css-tricks.com/webkit-html5-search-inputs/"
  }]
}
!*/
/* DOC
There is a custom `search` event implemented in webkit browsers when using an `input[search]` element.
*/

  Modernizr.addTest('inputsearchevent',  hasEvent('search'));


  /**
   * getBody returns the body of a document, or an element that can stand in for
   * the body if a real body does not exist
   *
   * @access private
   * @function getBody
   * @returns {HTMLElement|SVGElement} Returns the real body of a document, or an
   * artificially created element that stands in for the body
   */

  function getBody() {
    // After page load injecting a fake body doesn't work so check if body exists
    var body = document.body;

    if (!body) {
      // Can't use the real body create a fake one.
      body = createElement(isSVG ? 'svg' : 'body');
      body.fake = true;
    }

    return body;
  }

  ;

  /**
   * injectElementWithStyles injects an element with style element and some CSS rules
   *
   * @access private
   * @function injectElementWithStyles
   * @param {string} rule - String representing a css rule
   * @param {function} callback - A function that is used to test the injected element
   * @param {number} [nodes] - An integer representing the number of additional nodes you want injected
   * @param {string[]} [testnames] - An array of strings that are used as ids for the additional nodes
   * @returns {boolean}
   */

  function injectElementWithStyles(rule, callback, nodes, testnames) {
    var mod = 'modernizr';
    var style;
    var ret;
    var node;
    var docOverflow;
    var div = createElement('div');
    var body = getBody();

    if (parseInt(nodes, 10)) {
      // In order not to give false positives we create a node for each test
      // This also allows the method to scale for unspecified uses
      while (nodes--) {
        node = createElement('div');
        node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
        div.appendChild(node);
      }
    }

    style = createElement('style');
    style.type = 'text/css';
    style.id = 's' + mod;

    // IE6 will false positive on some tests due to the style element inside the test div somehow interfering offsetHeight, so insert it into body or fakebody.
    // Opera will act all quirky when injecting elements in documentElement when page is served as xml, needs fakebody too. #270
    (!body.fake ? div : body).appendChild(style);
    body.appendChild(div);

    if (style.styleSheet) {
      style.styleSheet.cssText = rule;
    } else {
      style.appendChild(document.createTextNode(rule));
    }
    div.id = mod;

    if (body.fake) {
      //avoid crashing IE8, if background image is used
      body.style.background = '';
      //Safari 5.13/5.1.4 OSX stops loading if ::-webkit-scrollbar is used and scrollbars are visible
      body.style.overflow = 'hidden';
      docOverflow = docElement.style.overflow;
      docElement.style.overflow = 'hidden';
      docElement.appendChild(body);
    }

    ret = callback(div, rule);
    // If this is done after page load we don't want to remove the body so check if body exists
    if (body.fake) {
      body.parentNode.removeChild(body);
      docElement.style.overflow = docOverflow;
      // Trigger layout so kinetic scrolling isn't disabled in iOS6+
      docElement.offsetHeight;
    } else {
      div.parentNode.removeChild(div);
    }

    return !!ret;

  }

  ;

  /**
   * testStyles injects an element with style element and some CSS rules
   *
   * @memberof Modernizr
   * @name Modernizr.testStyles
   * @optionName Modernizr.testStyles()
   * @optionProp testStyles
   * @access public
   * @function testStyles
   * @param {string} rule - String representing a css rule
   * @param {function} callback - A function that is used to test the injected element
   * @param {number} [nodes] - An integer representing the number of additional nodes you want injected
   * @param {string[]} [testnames] - An array of strings that are used as ids for the additional nodes
   * @returns {boolean}
   * @example
   *
   * `Modernizr.testStyles` takes a CSS rule and injects it onto the current page
   * along with (possibly multiple) DOM elements. This lets you check for features
   * that can not be detected by simply checking the [IDL](https://developer.mozilla.org/en-US/docs/Mozilla/Developer_guide/Interface_development_guide/IDL_interface_rules).
   *
   * ```js
   * Modernizr.testStyles('#modernizr { width: 9px; color: papayawhip; }', function(elem, rule) {
   *   // elem is the first DOM node in the page (by default #modernizr)
   *   // rule is the first argument you supplied - the CSS rule in string form
   *
   *   addTest('widthworks', elem.style.width === '9px')
   * });
   * ```
   *
   * If your test requires multiple nodes, you can include a third argument
   * indicating how many additional div elements to include on the page. The
   * additional nodes are injected as children of the `elem` that is returned as
   * the first argument to the callback.
   *
   * ```js
   * Modernizr.testStyles('#modernizr {width: 1px}; #modernizr2 {width: 2px}', function(elem) {
   *   document.getElementById('modernizr').style.width === '1px'; // true
   *   document.getElementById('modernizr2').style.width === '2px'; // true
   *   elem.firstChild === document.getElementById('modernizr2'); // true
   * }, 1);
   * ```
   *
   * By default, all of the additional elements have an ID of `modernizr[n]`, where
   * `n` is its index (e.g. the first additional, second overall is `#modernizr2`,
   * the second additional is `#modernizr3`, etc.).
   * If you want to have more meaningful IDs for your function, you can provide
   * them as the fourth argument, as an array of strings
   *
   * ```js
   * Modernizr.testStyles('#foo {width: 10px}; #bar {height: 20px}', function(elem) {
   *   elem.firstChild === document.getElementById('foo'); // true
   *   elem.lastChild === document.getElementById('bar'); // true
   * }, 2, ['foo', 'bar']);
   * ```
   *
   */

  var testStyles = ModernizrProto.testStyles = injectElementWithStyles;
  
/*!
{
  "name": "Hidden Scrollbar",
  "property": "hiddenscroll",
  "authors": ["Oleg Korsunsky"],
  "tags": ["overlay"],
  "notes": [{
    "name": "Overlay Scrollbar description",
    "href": "https://developer.apple.com/library/mac/releasenotes/MacOSX/WhatsNewInOSX/Articles/MacOSX10_7.html#//apple_ref/doc/uid/TP40010355-SW39"
  },{
    "name": "Video example of overlay scrollbars",
    "href": "https://gfycat.com/FoolishMeaslyAtlanticsharpnosepuffer"
  }]
}
!*/
/* DOC
Detects overlay scrollbars (when scrollbars on overflowed blocks are visible). This is found most commonly on mobile and OS X.
*/

  Modernizr.addTest('hiddenscroll', function() {
    return testStyles('#modernizr {width:100px;height:100px;overflow:scroll}', function(elem) {
      return elem.offsetWidth === elem.clientWidth;
    });
  });

/*!
{
  "name": "details Element",
  "caniuse": "details",
  "property": "details",
  "tags": ["elem"],
  "builderAliases": ["elem_details"],
  "authors": ["@mathias"],
  "notes": [{
    "name": "Mathias' Original",
    "href": "https://mathiasbynens.be/notes/html5-details-jquery#comment-35"
  }]
}
!*/

  Modernizr.addTest('details', function() {
    var el = createElement('details');
    var diff;

    // return early if possible; thanks @aFarkas!
    if (!('open' in el)) {
      return false;
    }

    testStyles('#modernizr details{display:block}', function(node) {
      node.appendChild(el);
      el.innerHTML = '<summary>a</summary>b';
      diff = el.offsetHeight;
      el.open = true;
      diff = diff != el.offsetHeight;
    });


    return diff;
  });

/*!
{
  "name": "Form Validation",
  "property": "formvalidation",
  "tags": ["forms", "validation", "attribute"],
  "builderAliases": ["forms_validation"]
}
!*/
/* DOC
This implementation only tests support for interactive form validation.
To check validation for a specific type or a specific other constraint,
the test can be combined:

- `Modernizr.inputtypes.number && Modernizr.formvalidation` (browser supports rangeOverflow, typeMismatch etc. for type=number)
- `Modernizr.input.required && Modernizr.formvalidation` (browser supports valueMissing)
*/

  Modernizr.addTest('formvalidation', function() {
    var form = createElement('form');
    if (!('checkValidity' in form) || !('addEventListener' in form)) {
      return false;
    }
    if ('reportValidity' in form) {
      return true;
    }
    var invalidFired = false;
    var input;

    Modernizr.formvalidationapi =  true;

    // Prevent form from being submitted
    form.addEventListener('submit', function(e) {
      // Old Presto based Opera does not validate form, if submit is prevented
      // although Opera Mini servers use newer Presto.
      if (!window.opera || window.operamini) {
        e.preventDefault();
      }
      e.stopPropagation();
    }, false);

    // Calling form.submit() doesn't trigger interactive validation,
    // use a submit button instead
    //older opera browsers need a name attribute
    form.innerHTML = '<input name="modTest" required="required" /><button></button>';

    testStyles('#modernizr form{position:absolute;top:-99999em}', function(node) {
      node.appendChild(form);

      input = form.getElementsByTagName('input')[0];

      // Record whether "invalid" event is fired
      input.addEventListener('invalid', function(e) {
        invalidFired = true;
        e.preventDefault();
        e.stopPropagation();
      }, false);

      //Opera does not fully support the validationMessage property
      Modernizr.formvalidationmessage = !!input.validationMessage;

      // Submit form by clicking submit button
      form.getElementsByTagName('button')[0].click();
    });

    return invalidFired;
  });


  /**
   * since we have a fairly large number of input tests that don't mutate the input
   * we create a single element that can be shared with all of those tests for a
   * minor perf boost
   *
   * @access private
   * @returns {HTMLInputElement}
   */
  var inputElem = createElement('input');
  
/*!
{
  "name": "Input attributes",
  "property": "input",
  "tags": ["forms"],
  "authors": ["Mike Taylor"],
  "notes": [{
    "name": "WHATWG spec",
    "href": "https://html.spec.whatwg.org/multipage/forms.html#input-type-attr-summary"
  }],
  "knownBugs": ["Some blackberry devices report false positive for input.multiple"]
}
!*/
/* DOC
Detects support for HTML5 `<input>` element attributes and exposes Boolean subproperties with the results:

```javascript
Modernizr.input.autocomplete
Modernizr.input.autofocus
Modernizr.input.list
Modernizr.input.max
Modernizr.input.min
Modernizr.input.multiple
Modernizr.input.pattern
Modernizr.input.placeholder
Modernizr.input.required
Modernizr.input.step
```
*/

  // Run through HTML5's new input attributes to see if the UA understands any.
  // Mike Taylr has created a comprehensive resource for testing these attributes
  //   when applied to all input types:
  //   miketaylr.com/code/input-type-attr.html

  // Only input placeholder is tested while textarea's placeholder is not.
  // Currently Safari 4 and Opera 11 have support only for the input placeholder
  // Both tests are available in feature-detects/forms-placeholder.js

  var inputattrs = 'autocomplete autofocus list placeholder max min multiple pattern required step'.split(' ');
  var attrs = {};

  Modernizr.input = (function(props) {
    for (var i = 0, len = props.length; i < len; i++) {
      attrs[ props[i] ] = !!(props[i] in inputElem);
    }
    if (attrs.list) {
      // safari false positive's on datalist: webk.it/74252
      // see also github.com/Modernizr/Modernizr/issues/146
      attrs.list = !!(createElement('datalist') && window.HTMLDataListElement);
    }
    return attrs;
  })(inputattrs);

/*!
{
  "name": "Form input types",
  "property": "inputtypes",
  "caniuse": "forms",
  "tags": ["forms"],
  "authors": ["Mike Taylor"],
  "polyfills": [
    "jquerytools",
    "webshims",
    "h5f",
    "webforms2",
    "nwxforms",
    "fdslider",
    "html5slider",
    "galleryhtml5forms",
    "jscolor",
    "html5formshim",
    "selectedoptionsjs",
    "formvalidationjs"
  ]
}
!*/
/* DOC
Detects support for HTML5 form input types and exposes Boolean subproperties with the results:

```javascript
Modernizr.inputtypes.color
Modernizr.inputtypes.date
Modernizr.inputtypes.datetime
Modernizr.inputtypes['datetime-local']
Modernizr.inputtypes.email
Modernizr.inputtypes.month
Modernizr.inputtypes.number
Modernizr.inputtypes.range
Modernizr.inputtypes.search
Modernizr.inputtypes.tel
Modernizr.inputtypes.time
Modernizr.inputtypes.url
Modernizr.inputtypes.week
```
*/

  // Run through HTML5's new input types to see if the UA understands any.
  //   This is put behind the tests runloop because it doesn't return a
  //   true/false like all the other tests; instead, it returns an object
  //   containing each input type with its corresponding true/false value

  // Big thanks to @miketaylr for the html5 forms expertise. miketaylr.com/
  var inputtypes = 'search tel url email datetime date month week time datetime-local number range color'.split(' ');
  var inputs = {};

  Modernizr.inputtypes = (function(props) {
    var len = props.length;
    var smile = '1)';
    var inputElemType;
    var defaultView;
    var bool;

    for (var i = 0; i < len; i++) {

      inputElem.setAttribute('type', inputElemType = props[i]);
      bool = inputElem.type !== 'text' && 'style' in inputElem;

      // We first check to see if the type we give it sticks..
      // If the type does, we feed it a textual value, which shouldn't be valid.
      // If the value doesn't stick, we know there's input sanitization which infers a custom UI
      if (bool) {

        inputElem.value         = smile;
        inputElem.style.cssText = 'position:absolute;visibility:hidden;';

        if (/^range$/.test(inputElemType) && inputElem.style.WebkitAppearance !== undefined) {

          docElement.appendChild(inputElem);
          defaultView = document.defaultView;

          // Safari 2-4 allows the smiley as a value, despite making a slider
          bool =  defaultView.getComputedStyle &&
            defaultView.getComputedStyle(inputElem, null).WebkitAppearance !== 'textfield' &&
            // Mobile android web browser has false positive, so must
            // check the height to see if the widget is actually there.
            (inputElem.offsetHeight !== 0);

          docElement.removeChild(inputElem);

        } else if (/^(search|tel)$/.test(inputElemType)) {
          // Spec doesn't define any special parsing or detectable UI
          //   behaviors so we pass these through as true

          // Interestingly, opera fails the earlier test, so it doesn't
          //  even make it here.

        } else if (/^(url|email)$/.test(inputElemType)) {
          // Real url and email support comes with prebaked validation.
          bool = inputElem.checkValidity && inputElem.checkValidity() === false;

        } else {
          // If the upgraded input compontent rejects the :) text, we got a winner
          bool = inputElem.value != smile;
        }
      }

      inputs[ props[i] ] = !!bool;
    }
    return inputs;
  })(inputtypes);

/*!
{
  "name": "input[type=\"number\"] Localization",
  "property": "localizednumber",
  "tags": ["forms", "localization", "attribute"],
  "authors": ["Peter Janes"],
  "notes": [{
    "name": "Webkit Bug Tracker Listing",
    "href": "https://bugs.webkit.org/show_bug.cgi?id=42484"
  },{
    "name": "Based on This",
    "href": "https://trac.webkit.org/browser/trunk/LayoutTests/fast/forms/script-tests/input-number-keyoperation.js?rev=80096#L9"
  }],
  "knownBugs": ["Only ever returns true if the browser/OS is configured to use comma as a decimal separator. This is probably fine for most use cases."]
}
!*/
/* DOC
Detects whether input type="number" is capable of receiving and displaying localized numbers, e.g. with comma separator.
*/

  Modernizr.addTest('localizednumber', function() {
    // this extends our testing of input[type=number], so bomb out if that's missing
    if (!Modernizr.inputtypes.number) { return false; }
    // we rely on checkValidity later, so bomb out early if we don't have it
    if (!Modernizr.formvalidation) { return false; }

    var el = createElement('div');
    var diff;
    var body = getBody();

    var root = (function() {
      return docElement.insertBefore(body, docElement.firstElementChild || docElement.firstChild);
    }());
    el.innerHTML = '<input type="number" value="1.0" step="0.1"/>';
    var input = el.childNodes[0];
    root.appendChild(el);
    input.focus();
    try {
      document.execCommand('InsertText', false, '1,1');
    } catch (e) { // prevent warnings in IE
    }
    diff = input.type === 'number' && input.valueAsNumber === 1.1 && input.checkValidity();
    root.removeChild(el);
    body.fake && root.parentNode.removeChild(root);
    return diff;
  });



  /**
   * List of property values to set for css tests. See ticket #21
   * http://git.io/vUGl4
   *
   * @memberof Modernizr
   * @name Modernizr._prefixes
   * @optionName Modernizr._prefixes
   * @optionProp prefixes
   * @access public
   * @example
   *
   * Modernizr._prefixes is the internal list of prefixes that we test against
   * inside of things like [prefixed](#modernizr-prefixed) and [prefixedCSS](#-code-modernizr-prefixedcss). It is simply
   * an array of kebab-case vendor prefixes you can use within your code.
   *
   * Some common use cases include
   *
   * Generating all possible prefixed version of a CSS property
   * ```js
   * var rule = Modernizr._prefixes.join('transform: rotate(20deg); ');
   *
   * rule === 'transform: rotate(20deg); webkit-transform: rotate(20deg); moz-transform: rotate(20deg); o-transform: rotate(20deg); ms-transform: rotate(20deg);'
   * ```
   *
   * Generating all possible prefixed version of a CSS value
   * ```js
   * rule = 'display:' +  Modernizr._prefixes.join('flex; display:') + 'flex';
   *
   * rule === 'display:flex; display:-webkit-flex; display:-moz-flex; display:-o-flex; display:-ms-flex; display:flex'
   * ```
   */

  // we use ['',''] rather than an empty array in order to allow a pattern of .`join()`ing prefixes to test
  // values in feature detects to continue to work
  var prefixes = (ModernizrProto._config.usePrefixes ? ' -webkit- -moz- -o- -ms- '.split(' ') : ['','']);

  // expose these for the plugin API. Look in the source for how to join() them against your input
  ModernizrProto._prefixes = prefixes;

  
/*!
{
  "name": "Touch Events",
  "property": "touchevents",
  "caniuse" : "touch",
  "tags": ["media", "attribute"],
  "notes": [{
    "name": "Touch Events spec",
    "href": "https://www.w3.org/TR/2013/WD-touch-events-20130124/"
  }],
  "warnings": [
    "Indicates if the browser supports the Touch Events spec, and does not necessarily reflect a touchscreen device"
  ],
  "knownBugs": [
    "False-positive on some configurations of Nokia N900",
    "False-positive on some BlackBerry 6.0 builds – https://github.com/Modernizr/Modernizr/issues/372#issuecomment-3112695"
  ]
}
!*/
/* DOC
Indicates if the browser supports the W3C Touch Events API.

This *does not* necessarily reflect a touchscreen device:

* Older touchscreen devices only emulate mouse events
* Modern IE touch devices implement the Pointer Events API instead: use `Modernizr.pointerevents` to detect support for that
* Some browsers & OS setups may enable touch APIs when no touchscreen is connected
* Future browsers may implement other event models for touch interactions

See this article: [You Can't Detect A Touchscreen](http://www.stucox.com/blog/you-cant-detect-a-touchscreen/).

It's recommended to bind both mouse and touch/pointer events simultaneously – see [this HTML5 Rocks tutorial](http://www.html5rocks.com/en/mobile/touchandmouse/).

This test will also return `true` for Firefox 4 Multitouch support.
*/

  // Chrome (desktop) used to lie about its support on this, but that has since been rectified: http://crbug.com/36415
  Modernizr.addTest('touchevents', function() {
    var bool;
    if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
      bool = true;
    } else {
      // include the 'heartz' as a way to have a non matching MQ to help terminate the join
      // https://git.io/vznFH
      var query = ['@media (', prefixes.join('touch-enabled),('), 'heartz', ')', '{#modernizr{top:9px;position:absolute}}'].join('');
      testStyles(query, function(node) {
        bool = node.offsetTop === 9;
      });
    }
    return bool;
  });

/*!
{
  "name": "ES5 Array",
  "property": "es5array",
  "notes": [{
    "name": "ECMAScript 5.1 Language Specification",
    "href": "http://www.ecma-international.org/ecma-262/5.1/"
  }],
  "polyfills": ["es5shim"],
  "authors": ["Ron Waldon (@jokeyrhyme)"],
  "tags": ["es5"]
}
!*/
/* DOC
Check if browser implements ECMAScript 5 Array per specification.
*/

  Modernizr.addTest('es5array', function() {
    return !!(Array.prototype &&
      Array.prototype.every &&
      Array.prototype.filter &&
      Array.prototype.forEach &&
      Array.prototype.indexOf &&
      Array.prototype.lastIndexOf &&
      Array.prototype.map &&
      Array.prototype.some &&
      Array.prototype.reduce &&
      Array.prototype.reduceRight &&
      Array.isArray);
  });

/*!
{
  "name": "ES5",
  "property": "es5",
  "notes": [{
    "name": "ECMAScript 5.1 Language Specification",
    "href": "http://www.ecma-international.org/ecma-262/5.1/"
  }],
  "polyfills": ["es5shim", "es5sham"],
  "authors": ["Ron Waldon (@jokeyrhyme)"],
  "tags": ["es5"]
}
!*/
/* DOC
Check if browser implements everything as specified in ECMAScript 5.
*/

  Modernizr.addTest('es5', function() {
    return !!(
      Modernizr.es5array &&
      Modernizr.es5date &&
      Modernizr.es5function &&
      Modernizr.es5object &&
      Modernizr.strictmode &&
      Modernizr.es5string &&
      Modernizr.json &&
      Modernizr.es5syntax &&
      Modernizr.es5undefined
    );
  });


  /**
   * http://mathiasbynens.be/notes/xhr-responsetype-json#comment-4
   *
   * @access private
   * @function testXhrType
   * @param {string} type - String name of the XHR type you want to detect
   * @returns {boolean}
   * @author Mathias Bynens
   */

  /* istanbul ignore next */
  var testXhrType = function(type) {
    if (typeof XMLHttpRequest == 'undefined') {
      return false;
    }
    var xhr = new XMLHttpRequest();
    xhr.open('get', '/', true);
    try {
      xhr.responseType = type;
    } catch (error) {
      return false;
    }
    return 'response' in xhr && xhr.responseType == type;
  };

  
/*!
{
  "name": "XHR responseType='arraybuffer'",
  "property": "xhrresponsetypearraybuffer",
  "tags": ["network"],
  "notes": [{
    "name": "XMLHttpRequest Living Standard",
    "href": "https://xhr.spec.whatwg.org/#the-responsetype-attribute"
  }]
}
!*/
/* DOC
Tests for XMLHttpRequest xhr.responseType='arraybuffer'.
*/

  Modernizr.addTest('xhrresponsetypearraybuffer', testXhrType('arraybuffer'));

/*!
{
  "name": "XHR responseType='blob'",
  "property": "xhrresponsetypeblob",
  "tags": ["network"],
  "notes": [{
    "name": "XMLHttpRequest Living Standard",
    "href": "https://xhr.spec.whatwg.org/#the-responsetype-attribute"
  }]
}
!*/
/* DOC
Tests for XMLHttpRequest xhr.responseType='blob'.
*/

  Modernizr.addTest('xhrresponsetypeblob', testXhrType('blob'));

/*!
{
  "name": "XHR responseType='document'",
  "property": "xhrresponsetypedocument",
  "tags": ["network"],
  "notes": [{
    "name": "XMLHttpRequest Living Standard",
    "href": "https://xhr.spec.whatwg.org/#the-responsetype-attribute"
  }]
}
!*/
/* DOC
Tests for XMLHttpRequest xhr.responseType='document'.
*/

  Modernizr.addTest('xhrresponsetypedocument', testXhrType('document'));

/*!
{
  "name": "XHR responseType='json'",
  "property": "xhrresponsetypejson",
  "tags": ["network"],
  "notes": [{
    "name": "XMLHttpRequest Living Standard",
    "href": "https://xhr.spec.whatwg.org/#the-responsetype-attribute"
  },{
    "name": "Explanation of xhr.responseType='json'",
    "href": "https://mathiasbynens.be/notes/xhr-responsetype-json"
  }]
}
!*/
/* DOC
Tests for XMLHttpRequest xhr.responseType='json'.
*/

  Modernizr.addTest('xhrresponsetypejson', testXhrType('json'));

/*!
{
  "name": "XHR responseType='text'",
  "property": "xhrresponsetypetext",
  "tags": ["network"],
  "notes": [{
    "name": "XMLHttpRequest Living Standard",
    "href": "https://xhr.spec.whatwg.org/#the-responsetype-attribute"
  }]
}
!*/
/* DOC
Tests for XMLHttpRequest xhr.responseType='text'.
*/

  Modernizr.addTest('xhrresponsetypetext', testXhrType('text'));


  /**
   * Object.prototype.toString can be used with every object and allows you to
   * get its class easily. Abstracting it off of an object prevents situations
   * where the toString property has been overridden
   *
   * @access private
   * @function toStringFn
   * @returns {function} An abstracted toString function
   */

  var toStringFn = ({}).toString;
  
/*!
{
  "name": "SVG clip paths",
  "property": "svgclippaths",
  "tags": ["svg"],
  "notes": [{
    "name": "Demo",
    "href": "http://srufaculty.sru.edu/david.dailey/svg/newstuff/clipPath4.svg"
  }]
}
!*/
/* DOC
Detects support for clip paths in SVG (only, not on HTML content).

See [this discussion](https://github.com/Modernizr/Modernizr/issues/213) regarding applying SVG clip paths to HTML content.
*/

  Modernizr.addTest('svgclippaths', function() {
    return !!document.createElementNS &&
      /SVGClipPath/.test(toStringFn.call(document.createElementNS('http://www.w3.org/2000/svg', 'clipPath')));
  });

/*!
{
  "name": "SVG foreignObject",
  "property": "svgforeignobject",
  "tags": ["svg"],
  "notes": [{
    "name": "W3C Spec",
    "href": "https://www.w3.org/TR/SVG11/extend.html"
  }]
}
!*/
/* DOC
Detects support for foreignObject tag in SVG.
*/

  Modernizr.addTest('svgforeignobject', function() {
    return !!document.createElementNS &&
      /SVGForeignObject/.test(toStringFn.call(document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject')));
  });

/*!
{
  "name": "SVG SMIL animation",
  "property": "smil",
  "caniuse": "svg-smil",
  "tags": ["svg"],
  "notes": [{
  "name": "W3C Synchronised Multimedia spec",
  "href": "https://www.w3.org/AudioVideo/"
  }]
}
!*/

  // SVG SMIL animation
  Modernizr.addTest('smil', function() {
    return !!document.createElementNS &&
      /SVGAnimate/.test(toStringFn.call(document.createElementNS('http://www.w3.org/2000/svg', 'animate')));
  });


  /**
   * cssToDOM takes a kebab-case string and converts it to camelCase
   * e.g. box-sizing -> boxSizing
   *
   * @access private
   * @function cssToDOM
   * @param {string} name - String name of kebab-case prop we want to convert
   * @returns {string} The camelCase version of the supplied name
   */

  function cssToDOM(name) {
    return name.replace(/([a-z])-([a-z])/g, function(str, m1, m2) {
      return m1 + m2.toUpperCase();
    }).replace(/^-/, '');
  }
  ;

  /**
   * hasOwnProp is a shim for hasOwnProperty that is needed for Safari 2.0 support
   *
   * @author kangax
   * @access private
   * @function hasOwnProp
   * @param {object} object - The object to check for a property
   * @param {string} property - The property to check for
   * @returns {boolean}
   */

  // hasOwnProperty shim by kangax needed for Safari 2.0 support
  var hasOwnProp;

  (function() {
    var _hasOwnProperty = ({}).hasOwnProperty;
    /* istanbul ignore else */
    /* we have no way of testing IE 5.5 or safari 2,
     * so just assume the else gets hit */
    if (!is(_hasOwnProperty, 'undefined') && !is(_hasOwnProperty.call, 'undefined')) {
      hasOwnProp = function(object, property) {
        return _hasOwnProperty.call(object, property);
      };
    }
    else {
      hasOwnProp = function(object, property) { /* yes, this can give false positives/negatives, but most of the time we don't care about those */
        return ((property in object) && is(object.constructor.prototype[property], 'undefined'));
      };
    }
  })();

  


   // _l tracks listeners for async tests, as well as tests that execute after the initial run
  ModernizrProto._l = {};

  /**
   * Modernizr.on is a way to listen for the completion of async tests. Being
   * asynchronous, they may not finish before your scripts run. As a result you
   * will get a possibly false negative `undefined` value.
   *
   * @memberof Modernizr
   * @name Modernizr.on
   * @access public
   * @function on
   * @param {string} feature - String name of the feature detect
   * @param {function} cb - Callback function returning a Boolean - true if feature is supported, false if not
   * @example
   *
   * ```js
   * Modernizr.on('flash', function( result ) {
   *   if (result) {
   *    // the browser has flash
   *   } else {
   *     // the browser does not have flash
   *   }
   * });
   * ```
   */

  ModernizrProto.on = function(feature, cb) {
    // Create the list of listeners if it doesn't exist
    if (!this._l[feature]) {
      this._l[feature] = [];
    }

    // Push this test on to the listener list
    this._l[feature].push(cb);

    // If it's already been resolved, trigger it on next tick
    if (Modernizr.hasOwnProperty(feature)) {
      // Next Tick
      setTimeout(function() {
        Modernizr._trigger(feature, Modernizr[feature]);
      }, 0);
    }
  };

  /**
   * _trigger is the private function used to signal test completion and run any
   * callbacks registered through [Modernizr.on](#modernizr-on)
   *
   * @memberof Modernizr
   * @name Modernizr._trigger
   * @access private
   * @function _trigger
   * @param {string} feature - string name of the feature detect
   * @param {function|boolean} [res] - A feature detection function, or the boolean =
   * result of a feature detection function
   */

  ModernizrProto._trigger = function(feature, res) {
    if (!this._l[feature]) {
      return;
    }

    var cbs = this._l[feature];

    // Force async
    setTimeout(function() {
      var i, cb;
      for (i = 0; i < cbs.length; i++) {
        cb = cbs[i];
        cb(res);
      }
    }, 0);

    // Don't trigger these again
    delete this._l[feature];
  };

  /**
   * addTest allows you to define your own feature detects that are not currently
   * included in Modernizr (under the covers it's the exact same code Modernizr
   * uses for its own [feature detections](https://github.com/Modernizr/Modernizr/tree/master/feature-detects)). Just like the offical detects, the result
   * will be added onto the Modernizr object, as well as an appropriate className set on
   * the html element when configured to do so
   *
   * @memberof Modernizr
   * @name Modernizr.addTest
   * @optionName Modernizr.addTest()
   * @optionProp addTest
   * @access public
   * @function addTest
   * @param {string|object} feature - The string name of the feature detect, or an
   * object of feature detect names and test
   * @param {function|boolean} test - Function returning true if feature is supported,
   * false if not. Otherwise a boolean representing the results of a feature detection
   * @example
   *
   * The most common way of creating your own feature detects is by calling
   * `Modernizr.addTest` with a string (preferably just lowercase, without any
   * punctuation), and a function you want executed that will return a boolean result
   *
   * ```js
   * Modernizr.addTest('itsTuesday', function() {
   *  var d = new Date();
   *  return d.getDay() === 2;
   * });
   * ```
   *
   * When the above is run, it will set Modernizr.itstuesday to `true` when it is tuesday,
   * and to `false` every other day of the week. One thing to notice is that the names of
   * feature detect functions are always lowercased when added to the Modernizr object. That
   * means that `Modernizr.itsTuesday` will not exist, but `Modernizr.itstuesday` will.
   *
   *
   *  Since we only look at the returned value from any feature detection function,
   *  you do not need to actually use a function. For simple detections, just passing
   *  in a statement that will return a boolean value works just fine.
   *
   * ```js
   * Modernizr.addTest('hasJquery', 'jQuery' in window);
   * ```
   *
   * Just like before, when the above runs `Modernizr.hasjquery` will be true if
   * jQuery has been included on the page. Not using a function saves a small amount
   * of overhead for the browser, as well as making your code much more readable.
   *
   * Finally, you also have the ability to pass in an object of feature names and
   * their tests. This is handy if you want to add multiple detections in one go.
   * The keys should always be a string, and the value can be either a boolean or
   * function that returns a boolean.
   *
   * ```js
   * var detects = {
   *  'hasjquery': 'jQuery' in window,
   *  'itstuesday': function() {
   *    var d = new Date();
   *    return d.getDay() === 2;
   *  }
   * }
   *
   * Modernizr.addTest(detects);
   * ```
   *
   * There is really no difference between the first methods and this one, it is
   * just a convenience to let you write more readable code.
   */

  function addTest(feature, test) {

    if (typeof feature == 'object') {
      for (var key in feature) {
        if (hasOwnProp(feature, key)) {
          addTest(key, feature[ key ]);
        }
      }
    } else {

      feature = feature.toLowerCase();
      var featureNameSplit = feature.split('.');
      var last = Modernizr[featureNameSplit[0]];

      // Again, we don't check for parent test existence. Get that right, though.
      if (featureNameSplit.length == 2) {
        last = last[featureNameSplit[1]];
      }

      if (typeof last != 'undefined') {
        // we're going to quit if you're trying to overwrite an existing test
        // if we were to allow it, we'd do this:
        //   var re = new RegExp("\\b(no-)?" + feature + "\\b");
        //   docElement.className = docElement.className.replace( re, '' );
        // but, no rly, stuff 'em.
        return Modernizr;
      }

      test = typeof test == 'function' ? test() : test;

      // Set the value (this is the magic, right here).
      if (featureNameSplit.length == 1) {
        Modernizr[featureNameSplit[0]] = test;
      } else {
        // cast to a Boolean, if not one already
        /* jshint -W053 */
        if (Modernizr[featureNameSplit[0]] && !(Modernizr[featureNameSplit[0]] instanceof Boolean)) {
          Modernizr[featureNameSplit[0]] = new Boolean(Modernizr[featureNameSplit[0]]);
        }

        Modernizr[featureNameSplit[0]][featureNameSplit[1]] = test;
      }

      // Set a single class (either `feature` or `no-feature`)
      /* jshint -W041 */
      setClasses([(!!test && test != false ? '' : 'no-') + featureNameSplit.join('-')]);
      /* jshint +W041 */

      // Trigger the event
      Modernizr._trigger(feature, test);
    }

    return Modernizr; // allow chaining.
  }

  // After all the tests are run, add self to the Modernizr prototype
  Modernizr._q.push(function() {
    ModernizrProto.addTest = addTest;
  });

  

/*!
{
  "name": "EXIF Orientation",
  "property": "exiforientation",
  "tags": ["image"],
  "builderAliases": ["exif_orientation"],
  "async": true,
  "authors": ["Paul Sayre"],
  "notes": [{
    "name": "Article by Dave Perrett",
    "href": "http://recursive-design.com/blog/2012/07/28/exif-orientation-handling-is-a-ghetto/"
  },{
    "name": "Article by Calvin Hass",
    "href": "http://www.impulseadventure.com/photo/exif-orientation.html"
  }]
}
!*/
/* DOC
Detects support for EXIF Orientation in JPEG images.

iOS looks at the EXIF Orientation flag in JPEGs and rotates the image accordingly. Most desktop browsers just ignore this data.
*/

  // Bug trackers:
  //    bugzil.la/298619 (unimplemented)
  //    crbug.com/56845 (looks incomplete)
  //    webk.it/19688 (available upstream but its up all ports to turn on individually)
  Modernizr.addAsyncTest(function() {
    var img = new Image();

    img.onerror = function() {
      addTest('exiforientation', false, {aliases: ['exif-orientation']});
    };

    img.onload = function() {
      addTest('exiforientation', img.width !== 2, {aliases: ['exif-orientation']});
    };

    // There may be a way to shrink this more, it's a 1x2 white jpg with the orientation flag set to 6
    img.src = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QAiRXhpZgAASUkqAAgAAAABABIBAwABAAAABgASAAAAAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAIDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD+/iiiigD/2Q==';
  });

/*!
  {
  "name": "Flash",
  "property": "flash",
  "tags": ["flash"],
  "polyfills": ["shumway"]
  }
  !*/
/* DOC
Detects Flash support as well as Flash-blocking plugins
*/

  Modernizr.addAsyncTest(function() {
    /* jshint -W053 */

    var attachBody = function(body) {
      if (!docElement.contains(body)) {
        docElement.appendChild(body);
      }
    };
    var removeFakeBody = function(body) {
      // If we’re rockin’ an attached fake body, clean it up
      if (body.fake && body.parentNode) {
        body.parentNode.removeChild(body);
      }
    };
    var runTest = function(result, embed) {
      var bool = !!result;
      if (bool) {
        bool = new Boolean(bool);
        bool.blocked = (result === 'blocked');
      }
      addTest('flash', function() { return bool; });

      if (embed && body.contains(embed)) {

        // in case embed has been wrapped, as with ClickToPlugin
        while (embed.parentNode !== body) {
          embed = embed.parentNode;
        }

        body.removeChild(embed);
      }

    };
    var easy_detect;
    var activex;
    // we wrap activex in a try/catch because when Flash is disabled through
    // ActiveX controls, it throws an error.
    try {
      // Pan is an API that exists for Flash objects.
      activex = 'ActiveXObject' in window && 'Pan' in new window.ActiveXObject('ShockwaveFlash.ShockwaveFlash');
    } catch (e) {}

    easy_detect = !(('plugins' in navigator && 'Shockwave Flash' in navigator.plugins) || activex);

    if (easy_detect || isSVG) {
      runTest(false);
    }
    else {
      // Flash seems to be installed, but it might be blocked. We have to
      // actually create an element to see what happens to it.
      var embed = createElement('embed');
      var body = getBody();
      var blockedDetect;
      var inline_style;

      embed.type = 'application/x-shockwave-flash';

      // Need to do this in the body (fake or otherwise) otherwise IE8 complains
      body.appendChild(embed);

      // Pan doesn't exist in the embed if its IE (its on the ActiveXObjeect)
      // so this check is for all other browsers.
      if (!('Pan' in embed) && !activex) {
        attachBody(body);
        runTest('blocked', embed);
        removeFakeBody(body);
        return;
      }

      blockedDetect = function() {
        // if we used a fake body originally, we need to restart this test, since
        // we haven't been attached to the DOM, and therefore none of the blockers
        // have had time to work.
        attachBody(body);
        if (!docElement.contains(body)) {
          body = document.body || body;
          embed = createElement('embed');
          embed.type = 'application/x-shockwave-flash';
          body.appendChild(embed);
          return setTimeout(blockedDetect, 1000);
        }
        if (!docElement.contains(embed)) {
          runTest('blocked');
        }
        else {
          inline_style = embed.style.cssText;
          if (inline_style !== '') {
            // the style of the element has changed automatically. This is a
            // really poor heuristic, but for lower end Flash blocks, it the
            // only change they can make.
            runTest('blocked', embed);
          }
          else {
            runTest(true, embed);
          }
        }
        removeFakeBody(body);
      };

      // If we have got this far, there is still a chance a userland plugin
      // is blocking us (either changing the styles, or automatically removing
      // the element). Both of these require us to take a step back for a moment
      // to allow for them to get time of the thread, hence a setTimeout.
      //
      setTimeout(blockedDetect, 10);
    }
  });

/*!
{
  "name": "HTML Imports",
  "notes": [
    {
      "name": "W3C HTML Imports Specification",
      "href": "https://w3c.github.io/webcomponents/spec/imports/"
    },
    {
      "name": "HTML Imports - #include for the web",
      "href": "http://www.html5rocks.com/en/tutorials/webcomponents/imports/"
    }
  ],
  "polyfills": ["polymer-htmlimports"],
  "property": "htmlimports",
  "tags": ["html", "import"]
}
!*/
/* DOC
Detects support for HTML import, a feature that is used for loading in Web Components.
 */


  addTest('htmlimports', 'import' in createElement('link'));

/*!
{
  "name": "Audio Preload",
  "property": "audiopreload",
  "tags": ["audio", "media"],
  "async" : true,
  "warnings": ["This test is very large – only include it if you absolutely need it"]
}
!*/
/* DOC
Detects if audio can be downloaded in the background before it starts playing in the `<audio>` element
*/


  Modernizr.addAsyncTest(function() {
    var timeout;
    var waitTime = 300;
    var elem = createElement('audio');
    var elemStyle = elem.style;

    function testpreload(event) {
      clearTimeout(timeout);
      var result = event !== undefined && event.type === 'loadeddata' ? true : false; //need to check if event is not undefined here in case function is evoked from timeout (no parameters)
      elem.removeEventListener('loadeddata', testpreload, false);
      addTest('audiopreload', result);
      elem.parentNode.removeChild(elem);
    }

    //skip the test if audio itself, or the preload
    //element on it isn't supported
    if (!Modernizr.audio || !('preload' in elem)) {
      addTest('audiopreload', false);
      return;
    }

    elemStyle.position = 'absolute';
    elemStyle.height = 0;
    elemStyle.width = 0;

    try {
      if (Modernizr.audio.mp3) {
        //75ms of silence (minumum Mp3 duration loaded by Safari, not tested other formats thoroughly: may be possible to shrink base64 URI)
        elem.src = 'data:audio/mpeg;base64,//MUxAAB6AXgAAAAAPP+c6nf//yi/6f3//MUxAMAAAIAAAjEcH//0fTX6C9Lf//0//MUxA4BeAIAAAAAAKX2/6zv//+IlR4f//MUxBMCMAH8AAAAABYWalVMQU1FMy45//MUxBUB0AH0AAAAADkuM1VVVVVVVVVV//MUxBgBUATowAAAAFVVVVVVVVVVVVVV';
      }
      else if (Modernizr.audio.m4a) {
        elem.src = 'data:audio/x-m4a;base64,AAAAGGZ0eXBNNEEgAAACAGlzb21pc28yAAAACGZyZWUAAAAfbWRhdN4EAABsaWJmYWFjIDEuMjgAAAFoAQBHAAACiG1vb3YAAABsbXZoZAAAAAB8JbCAfCWwgAAAA+gAAAAYAAEAAAEAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAG0dHJhawAAAFx0a2hkAAAAD3wlsIB8JbCAAAAAAQAAAAAAAAAYAAAAAAAAAAAAAAAAAQAAAAABAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAABUG1kaWEAAAAgbWRoZAAAAAB8JbCAfCWwgAAArEQAAAQAVcQAAAAAAC1oZGxyAAAAAAAAAABzb3VuAAAAAAAAAAAAAAAAU291bmRIYW5kbGVyAAAAAPttaW5mAAAAEHNtaGQAAAAAAAAAAAAAACRkaW5mAAAAHGRyZWYAAAAAAAAAAQAAAAx1cmwgAAAAAQAAAL9zdGJsAAAAW3N0c2QAAAAAAAAAAQAAAEttcDRhAAAAAAAAAAEAAAAAAAAAAAACABAAAAAArEQAAAAAACdlc2RzAAAAAAMZAAEABBFAFQAAAAABftAAAAAABQISCAYBAgAAABhzdHRzAAAAAAAAAAEAAAABAAAEAAAAABxzdHNjAAAAAAAAAAEAAAABAAAAAQAAAAEAAAAUc3RzegAAAAAAAAAXAAAAAQAAABRzdGNvAAAAAAAAAAEAAAAoAAAAYHVkdGEAAABYbWV0YQAAAAAAAAAhaGRscgAAAAAAAAAAbWRpcmFwcGwAAAAAAAAAAAAAAAAraWxzdAAAACOpdG9vAAAAG2RhdGEAAAABAAAAAExhdmY1Mi42NC4y';
      }
      else if (Modernizr.audio.ogg) {
        elem.src = 'data:audio/ogg;base64,T2dnUwACAAAAAAAAAAD/QwAAAAAAAM2LVKsBHgF2b3JiaXMAAAAAAUSsAAAAAAAAgLsAAAAAAAC4AU9nZ1MAAAAAAAAAAAAA/0MAAAEAAADmvOe6Dy3/////////////////MgN2b3JiaXMdAAAAWGlwaC5PcmcgbGliVm9yYmlzIEkgMjAwNzA2MjIAAAAAAQV2b3JiaXMfQkNWAQAAAQAYY1QpRplS0kqJGXOUMUaZYpJKiaWEFkJInXMUU6k515xrrLm1IIQQGlNQKQWZUo5SaRljkCkFmVIQS0kldBI6J51jEFtJwdaYa4tBthyEDZpSTCnElFKKQggZU4wpxZRSSkIHJXQOOuYcU45KKEG4nHOrtZaWY4updJJK5yRkTEJIKYWSSgelU05CSDWW1lIpHXNSUmpB6CCEEEK2IIQNgtCQVQAAAQDAQBAasgoAUAAAEIqhGIoChIasAgAyAAAEoCiO4iiOIzmSY0kWEBqyCgAAAgAQAADAcBRJkRTJsSRL0ixL00RRVX3VNlVV9nVd13Vd13UgNGQVAAABAEBIp5mlGiDCDGQYCA1ZBQAgAAAARijCEANCQ1YBAAABAABiKDmIJrTmfHOOg2Y5aCrF5nRwItXmSW4q5uacc845J5tzxjjnnHOKcmYxaCa05pxzEoNmKWgmtOacc57E5kFrqrTmnHPGOaeDcUYY55xzmrTmQWo21uaccxa0pjlqLsXmnHMi5eZJbS7V5pxzzjnnnHPOOeecc6oXp3NwTjjnnHOi9uZabkIX55xzPhmne3NCOOecc84555xzzjnnnHOC0JBVAAAQAABBGDaGcacgSJ+jgRhFiGnIpAfdo8MkaAxyCqlHo6ORUuoglFTGSSmdIDRkFQAACAAAIYQUUkghhRRSSCGFFFKIIYYYYsgpp5yCCiqppKKKMsoss8wyyyyzzDLrsLPOOuwwxBBDDK20EktNtdVYY62555xrDtJaaa211koppZRSSikIDVkFAIAAABAIGWSQQUYhhRRSiCGmnHLKKaigAkJDVgEAgAAAAgAAADzJc0RHdERHdERHdERHdETHczxHlERJlERJtEzL1ExPFVXVlV1b1mXd9m1hF3bd93Xf93Xj14VhWZZlWZZlWZZlWZZlWZZlWYLQkFUAAAgAAIAQQgghhRRSSCGlGGPMMeegk1BCIDRkFQAACAAgAAAAwFEcxXEkR3IkyZIsSZM0S7M8zdM8TfREURRN01RFV3RF3bRF2ZRN13RN2XRVWbVdWbZt2dZtX5Zt3/d93/d93/d93/d93/d1HQgNWQUASAAA6EiOpEiKpEiO4ziSJAGhIasAABkAAAEAKIqjOI7jSJIkSZakSZ7lWaJmaqZneqqoAqEhqwAAQAAAAQAAAAAAKJriKabiKaLiOaIjSqJlWqKmaq4om7Lruq7ruq7ruq7ruq7ruq7ruq7ruq7ruq7ruq7ruq7ruq7rui4QGrIKAJAAANCRHMmRHEmRFEmRHMkBQkNWAQAyAAACAHAMx5AUybEsS9M8zdM8TfRET/RMTxVd0QVCQ1YBAIAAAAIAAAAAADAkw1IsR3M0SZRUS7VUTbVUSxVVT1VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVTVN0zRNIDRkJQAABADAYo3B5SAhJSXl3hDCEJOeMSYhtV4hBJGS3jEGFYOeMqIMct5C4xCDHggNWREARAEAAMYgxxBzyDlHqZMSOeeodJQa5xyljlJnKcWYYs0oldhSrI1zjlJHraOUYiwtdpRSjanGAgAAAhwAAAIshEJDVgQAUQAAhDFIKaQUYow5p5xDjCnnmHOGMeYcc44556B0UirnnHROSsQYc445p5xzUjonlXNOSiehAACAAAcAgAALodCQFQFAnACAQZI8T/I0UZQ0TxRFU3RdUTRd1/I81fRMU1U90VRVU1Vt2VRVWZY8zzQ901RVzzRV1VRVWTZVVZZFVdVt03V123RV3ZZt2/ddWxZ2UVVt3VRd2zdV1/Zd2fZ9WdZ1Y/I8VfVM03U903Rl1XVtW3VdXfdMU5ZN15Vl03Vt25VlXXdl2fc103Rd01Vl2XRd2XZlV7ddWfZ903WF35VlX1dlWRh2XfeFW9eV5XRd3VdlVzdWWfZ9W9eF4dZ1YZk8T1U903RdzzRdV3VdX1dd19Y105Rl03Vt2VRdWXZl2fddV9Z1zzRl2XRd2zZdV5ZdWfZ9V5Z13XRdX1dlWfhVV/Z1WdeV4dZt4Tdd1/dVWfaFV5Z14dZ1Ybl1XRg+VfV9U3aF4XRl39eF31luXTiW0XV9YZVt4VhlWTl+4ViW3feVZXRdX1ht2RhWWRaGX/id5fZ943h1XRlu3efMuu8Mx++k+8rT1W1jmX3dWWZfd47hGDq/8OOpqq+brisMpywLv+3rxrP7vrKMruv7qiwLvyrbwrHrvvP8vrAso+z6wmrLwrDatjHcvm4sv3Acy2vryjHrvlG2dXxfeArD83R1XXlmXcf2dXTjRzh+ygAAgAEHAIAAE8pAoSErAoA4AQCPJImiZFmiKFmWKIqm6LqiaLqupGmmqWmeaVqaZ5qmaaqyKZquLGmaaVqeZpqap5mmaJqua5qmrIqmKcumasqyaZqy7LqybbuubNuiacqyaZqybJqmLLuyq9uu7Oq6pFmmqXmeaWqeZ5qmasqyaZquq3meanqeaKqeKKqqaqqqraqqLFueZ5qa6KmmJ4qqaqqmrZqqKsumqtqyaaq2bKqqbbuq7Pqybeu6aaqybaqmLZuqatuu7OqyLNu6L2maaWqeZ5qa55mmaZqybJqqK1uep5qeKKqq5ommaqqqLJumqsqW55mqJ4qq6omea5qqKsumatqqaZq2bKqqLZumKsuubfu+68qybqqqbJuqauumasqybMu+78qq7oqmKcumqtqyaaqyLduy78uyrPuiacqyaaqybaqqLsuybRuzbPu6aJqybaqmLZuqKtuyLfu6LNu678qub6uqrOuyLfu67vqucOu6MLyybPuqrPq6K9u6b+sy2/Z9RNOUZVM1bdtUVVl2Zdn2Zdv2fdE0bVtVVVs2TdW2ZVn2fVm2bWE0Tdk2VVXWTdW0bVmWbWG2ZeF2Zdm3ZVv2ddeVdV/XfePXZd3murLty7Kt+6qr+rbu+8Jw667wCgAAGHAAAAgwoQwUGrISAIgCAACMYYwxCI1SzjkHoVHKOecgZM5BCCGVzDkIIZSSOQehlJQy5yCUklIIoZSUWgshlJRSawUAABQ4AAAE2KApsThAoSErAYBUAACD41iW55miatqyY0meJ4qqqaq27UiW54miaaqqbVueJ4qmqaqu6+ua54miaaqq6+q6aJqmqaqu67q6Lpqiqaqq67qyrpumqqquK7uy7Oumqqqq68quLPvCqrquK8uybevCsKqu68qybNu2b9y6ruu+7/vCka3rui78wjEMRwEA4AkOAEAFNqyOcFI0FlhoyEoAIAMAgDAGIYMQQgYhhJBSSiGllBIAADDgAAAQYEIZKDRkRQAQJwAAGEMppJRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkgppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkqppJRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoplVJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSCgCQinAAkHowoQwUGrISAEgFAACMUUopxpyDEDHmGGPQSSgpYsw5xhyUklLlHIQQUmktt8o5CCGk1FJtmXNSWosx5hgz56SkFFvNOYdSUoux5ppr7qS0VmuuNedaWqs115xzzbm0FmuuOdecc8sx15xzzjnnGHPOOeecc84FAOA0OACAHtiwOsJJ0VhgoSErAYBUAAACGaUYc8456BBSjDnnHIQQIoUYc845CCFUjDnnHHQQQqgYc8w5CCGEkDnnHIQQQgghcw466CCEEEIHHYQQQgihlM5BCCGEEEooIYQQQgghhBA6CCGEEEIIIYQQQgghhFJKCCGEEEIJoZRQAABggQMAQIANqyOcFI0FFhqyEgAAAgCAHJagUs6EQY5Bjw1BylEzDUJMOdGZYk5qMxVTkDkQnXQSGWpB2V4yCwAAgCAAIMAEEBggKPhCCIgxAABBiMwQCYVVsMCgDBoc5gHAA0SERACQmKBIu7iALgNc0MVdB0IIQhCCWBxAAQk4OOGGJ97whBucoFNU6iAAAAAAAAwA4AEA4KAAIiKaq7C4wMjQ2ODo8AgAAAAAABYA+AAAOD6AiIjmKiwuMDI0Njg6PAIAAAAAAAAAAICAgAAAAAAAQAAAAICAT2dnUwAE7AwAAAAAAAD/QwAAAgAAADuydfsFAQEBAQEACg4ODg==';
      }
      else if (Modernizr.audio.wav) {
        elem.src = 'data:audio/wav;base64,UklGRvwZAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YdgZAAAAAAEA/v8CAP//AAABAP////8DAPz/BAD9/wEAAAAAAAAAAAABAP7/AgD//wAAAQD//wAAAQD//wAAAQD+/wIA//8AAAAAAAD//wIA/v8BAAAA//8BAAAA//8BAP//AQAAAP//AQD//wEAAAD//wEA//8BAP//AQD//wEA//8BAP//AQD+/wMA/f8DAP3/AgD+/wIA/////wMA/f8CAP7/AgD+/wMA/f8CAP7/AgD//wAAAAAAAAAAAQD+/wIA/v8CAP7/AwD9/wIA/v8BAAEA/v8CAP7/AQAAAAAAAAD//wEAAAD//wIA/f8DAP7/AQD//wEAAAD//wEA//8CAP7/AQD//wIA/v8CAP7/AQAAAAAAAAD//wEAAAAAAAAA//8BAP//AgD9/wQA+/8FAPz/AgAAAP//AgD+/wEAAAD//wIA/v8CAP3/BAD8/wQA/P8DAP7/AwD8/wQA/P8DAP7/AQAAAAAA//8BAP//AgD+/wEAAAD//wIA/v8BAP//AQD//wEAAAD//wEA//8BAAAAAAAAAP//AgD+/wEAAAAAAAAAAAD//wEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//AgD+/wIA/v8BAP//AQABAP7/AQD//wIA/v8CAP3/AwD/////AgD9/wMA/v8BAP//AQAAAP//AQD//wEA//8BAP//AAABAP//AAABAP//AQD//wAAAAACAP3/AwD9/wIA//8BAP//AQD//wEA//8BAP//AgD9/wMA/v8AAAIA/f8CAAAA/v8EAPv/BAD9/wIAAAD+/wQA+v8HAPr/BAD+/wEAAAD//wIA/f8EAPz/BAD7/wUA/P8EAPz/AwD+/wEAAAD//wEAAAAAAP//AgD8/wUA+/8FAPz/AwD9/wIA//8AAAEA/v8CAP//AQD//wAAAAABAP//AgD9/wMA/f8EAPz/AwD+/wAAAwD7/wUA/P8DAP7/AQAAAP//AgD+/wEAAQD+/wIA/v8BAAEA/v8CAP7/AQAAAP//AgD9/wMA/f8DAP7/AgD+/wEAAAAAAAEA//8AAAEA/v8DAP3/AgD//wEA//8BAP7/AwD9/wMA/v8BAP//AQAAAP//AgD9/wMA/v8BAP//AQAAAP//AgD+/wEAAQD+/wIA/////wIA//8AAAEA/f8DAP//AAABAP////8DAP3/AwD+/wEA//8BAP//AQAAAAAA//8BAP//AQD//wEA//8BAP//AAAAAAEA//8BAP7/AgD//wEA//8AAAAAAAAAAAAAAAD//wIA/v8BAAAA//8BAAEA/v8BAAAA//8DAPz/AwD+/wIA/v8CAP3/AwD+/wEAAAD//wEA//8BAAAA//8BAAAA/v8EAPv/BAD+/wAAAAABAP7/AgD//wAAAAABAP7/AgD//wAAAAAAAAAAAAABAP3/BAD8/wQA/f8BAAAAAAABAP7/AgD+/wIA/v8CAP7/AgD+/wIA/v8BAAAAAAD//wIA/f8DAP7/AAABAP//AAACAPz/BAD9/wIA//8AAP//AwD9/wMA/P8EAP3/AwD9/wIA//8BAP//AQD+/wMA/f8DAP7/AAABAP//AQAAAP//AQD//wIA/f8DAP7/AQAAAP//AQAAAAAA//8CAP7/AQABAP7/AgD+/wEAAQD+/wIA/v8CAP////8CAP7/AgD//wAAAAABAP7/AwD9/wIAAAD+/wMA/f8CAP//AQD+/wMA/f8CAP//AAACAPz/BQD6/wUA/v///wIA/v8CAP3/BAD7/wYA+v8FAPz/AwD/////AgD+/wEAAAD//wEAAAD//wIA/f8DAP7/AQAAAP//AgD//wAA//8BAAAAAAAAAP//AQD//wEA//8AAAIA/f8DAP3/AgAAAP//AQD//wEA//8AAAEA//8BAP////8CAP//AAABAP3/BAD9/wIA/v8BAAEA//8BAP7/AgD//wEA//8AAAEA//8BAP//AAAAAAEA//8BAP7/AgD//wEA//8AAAAAAQD+/wIA/v8BAAAAAAD//wIA/v8BAAAAAAAAAAAAAQD+/wMA/f8CAP//AQD//wIA/f8DAP7/AQD//wEA//8CAP7/AAABAP7/AwD9/wMA/v8AAAEA//8BAAAAAAD//wIA/v8BAAAA//8CAP7/AgD+/wEA//8CAP7/AgD//wAAAAAAAAAAAQD//wEA/v8DAPz/BQD8/wIA//8AAAEAAAD//wEA//8BAP//AQAAAAAA//8BAP//AgD+/wEAAAAAAP//AQD+/wMA/////wEA/v8CAP//AQD//wEA//8AAAEA//8BAAAA/v8EAPz/AwD+/wEAAAAAAAAA//8CAP7/AQD//wEA//8BAP//AAABAP7/AwD9/wIA//8BAP//AQD//wEA//8AAAEA/v8EAPv/BAD9/wIA//8BAP7/AwD9/wIA//8AAAEA//8BAP//AQD//wAAAQD//wEAAAD+/wMA/v8AAAIA/f8DAP7/AQD//wAAAQD+/wMA/f8CAP//AAABAP7/AgD+/wMA/f8CAP7/AQABAP7/AgD+/wIA/v8CAP7/AwD8/wMA//8AAAEA//8AAAAAAAABAP//AQD//wAAAQD//wIA/f8DAP3/AwD+/wAAAgD9/wIA//8AAAEAAAD+/wMA/P8FAPv/BAD9/wIA//8AAP//AgD+/wIA/v8BAAAAAAD//wEAAAAAAP//AQD//wEA//8BAP//AAABAP7/AwD9/wIA//8BAP//AAABAP//AQD//wAAAQD//wEA//8BAP//AAABAAAA//8BAP7/AwD9/wMA/f8DAP3/AgD//wEA//8BAP7/AgD//wAAAgD8/wQA/f8CAP//AQD+/wMA/f8CAP7/AgD//wAAAAAAAAAAAAABAP7/AwD9/wIA/v8DAP3/AwD9/wIA/v8DAPz/BQD7/wQA/f8CAP7/AwD9/wMA/f8CAP//AQAAAP7/AwD+/wEA//8AAAEAAAAAAP//AAABAP//AQAAAP7/AwD9/wMA/f8CAP//AQD//wEA//8AAAIA/f8CAAAA//8BAAAA//8BAAAA/v8EAPv/BAD9/wIA//8AAAEA/v8CAP//AAABAP//AAABAP//AAABAP7/AwD8/wQA/f8CAAAA/v8DAP3/AwD9/wMA/v8BAAAA//8BAAAA//8CAP7/AQAAAAAAAAAAAAAA//8CAP7/AgD+/wIA/v8CAP7/AgD//wAAAQD//wAAAQD//wAAAQD//wAAAQD+/wIA//8AAAAAAQD+/wMA/f8CAP//AQD//wEA//8AAAEA/v8DAP3/AgD//wAAAAABAP7/AwD9/wIA//8AAAEA/v8DAP3/AgD//wAAAAABAP7/AwD8/wMA/v8CAP//AAD//wIA/v8CAP7/AQABAP7/AQAAAP//AgD/////AQD//wEAAAD//wEA/v8EAPv/BAD9/wMA/v8BAAAA//8BAAEA/P8GAPr/BQD8/wMA/v8BAAAA//8CAP7/AQABAP3/BAD7/wYA+/8EAPz/AwD//wEA//8BAP7/BAD8/wMA/v8AAAIA/v8BAAAA//8BAAAA//8BAAAA//8CAP3/AwD+/wAAAgD8/wUA/P8DAP7/AAABAAAAAAD//wEAAAD//wIA/f8DAP7/AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAEA/f8EAPz/AwD/////AgD+/wIA/f8DAP7/AgD+/wEA//8CAP7/AQD//wEAAAAAAP//AQAAAP//AgD9/wMA/v8BAAAA//8BAP//AQAAAP//AAACAP3/BAD7/wQA/v8BAAAA//8BAP//AQAAAP//AQAAAP7/BAD7/wUA+/8EAP3/AgD//wAAAQD+/wIA//8AAAEA/v8CAP//AQD+/wEAAAAAAAAAAAD//wEA//8CAP3/AwD9/wIA//8AAAAAAAAAAAAA//8BAP//AgD+/wEA//8CAP7/AQAAAP//AgD/////AgD/////AgD+/wIA//8AAP//AQABAP7/AgD9/wMA/v8CAP////8BAAAAAAAAAAAA//8CAP////8DAPz/AwD+/wEAAAAAAP//AQD//wEAAAD//wEAAAD+/wQA+/8FAPz/AgAAAP//AgD9/wMA/v8BAAAAAAD//wEAAAD//wIA/v8BAAAAAAD//wIA/v8BAAAA//8BAAAA//8CAP7/AQD//wEA//8BAAAA//8BAP//AAABAP//AQAAAP7/AgD//wEA//8AAAAAAQD+/wMA/P8EAP7///8DAPz/BQD8/wEAAQD+/wMA/v8AAAEA//8BAP//AQD//wEA/v8CAP//AQD//wAAAAABAAAA//8BAP//AQAAAAAA//8BAP//AgD+/wAAAQD//wIA/f8CAP//AQAAAP7/AwD9/wMA/v8BAP//AAABAP//AgD9/wIA//8BAAAA//8BAAAA//8CAP3/AwD+/wEAAAD+/wQA/P8DAP7/AAACAP7/AQAAAP//AQAAAP//AQAAAP//AgD9/wIAAAD//wIA/f8DAP7/AQD//wEA//8CAP7/AQD//wAAAQD//wEA//8AAAAAAQD//wEAAAD9/wUA+/8FAPz/AgD//wAAAQD//wAAAQD+/wMA/f8BAAEA/v8CAP7/AgD+/wIA/v8BAAAAAAAAAAAAAAD//wIA/v8CAP////8CAP7/AgD+/wIA/v8CAP7/AQAAAP//AQAAAP//AQD//wAAAQD//wAAAQD+/wMA/f8CAAAA/v8DAP3/AgAAAP//AQAAAP7/AwD9/wMA/v8BAP//AQD//wEAAAD+/wMA/f8CAAAA/v8CAP//AAAAAAEA//8AAAEA/v8DAP3/AwD9/wIA//8BAP//AgD8/wQA/v8BAAAA/v8CAP//AQD//wAAAAAAAAEA/f8EAPz/BAD9/wIA//8AAAAAAAABAP//AAAAAAAAAAABAP3/BAD9/wIA/v8BAAEA//8AAAAA//8CAP7/AgD9/wQA+/8FAPv/BQD8/wMA/f8DAP3/AwD+/wAAAgD9/wMA/f8CAAAA/v8EAPv/BQD7/wUA/P8DAP///v8DAP3/BAD8/wMA/f8DAP7/AQD//wEAAAD//wEA/v8CAAAA/v8CAP7/AgD//wAAAAAAAAAAAQD+/wIA//8AAAEA/v8DAPz/BAD9/wIA//8AAP//AgD//wEA/v8BAAAAAQD//wAAAAAAAAEA//8AAAEA//8BAP//AAABAP//AQD+/wIA/v8DAPz/BAD8/wQA/f8BAAAAAQD+/wMA/P8DAP//AAAAAAAAAAD//wMA+/8FAP3/AQABAP3/BAD8/wMA/v8BAAAA//8CAP3/AwD+/wEAAQD9/wMA/f8EAPz/BAD7/wQA/v8BAAEA/f8DAP7/AQAAAP//AgD+/wEAAAD//wIA/v8CAP7/AgD+/wEAAQD//wEA/v8CAP7/BAD7/wQA/f8CAAAA//8AAAAAAAABAP//AQD+/wEAAQD+/wMA/f8BAAEA/v8DAPz/AwD/////AwD8/wQA/P8DAP7/AgD//wAA//8BAAAAAAAAAP//AgD+/wEAAAD//wIA/v8BAAAA//8CAP3/AgD//wAAAQD+/wIA/v8BAAAA//8CAP7/AgD+/wEA//8CAP3/BAD7/wQA/v8BAAAA//8AAAEAAAD//wIA/f8DAP7/AgD+/wIA/v8CAP7/AgD+/wEAAAAAAP//AgD9/wMA/v8BAP//AgD9/wMA/v8AAAEA//8BAP//AQD//wEA//8AAAEA/v8EAPz/AgD//wAAAQAAAP//AAABAP//AQD//wEAAAD//wEA//8BAAEA/f8DAP7/AQABAP3/AwD+/wIA/////wEAAAAAAAAAAAD//wIA/v8CAP////8CAP7/AgD//wAA//8CAP3/BAD9/wAAAgD9/wMA/v8BAP//AQAAAP//AQAAAP//AgD9/wMA/f8EAPz/AwD+/wEAAAAAAAAAAAD//wIA/f8EAP3/AAABAAAA//8CAP7/AQAAAP//AQAAAAAA//8BAP//AQAAAP//AQAAAP//AQAAAP//AgD9/wMA/v8BAP//AQAAAP//AQD//wIA/v8CAP3/BAD9/wEAAAD//wEAAQD9/wMA/f8CAAAA/v8DAP3/AgD//wAAAQD+/wIA/v8CAP7/AQAAAP//AgD+/wEAAAAAAP//AwD7/wUA/f8BAAEA/v8BAAEA/v8DAP3/AgD//wEA//8BAP//AQD//wEA//8CAP3/BAD7/wQA/////wIA/v8AAAIA/v8CAP3/BAD7/wUA/P8DAP3/AwD9/wMA/v8AAAIA/v8CAP7/AgD+/wIA//8AAAEA/v8CAP7/AgD//wAAAAD//wEAAAAAAAAA//8BAP7/BAD7/wUA/P8CAAAA//8BAP//AQAAAP//AgD9/wMA/v8BAAAA//8BAAAA//8CAP3/AwD+/wEA//8CAP3/AwD+/wAAAwD8/wIAAAD//wIA/////wIA/v8CAP7/AgD+/wEAAAAAAAAAAAAAAP//AgD+/wIA//8AAAAA//8CAP7/AgD+/wEA//8CAP3/AwD9/wMA/v8BAP7/AwD9/wMA/f8CAP//AQD+/wIA//8BAP//AQD+/wMA/v8BAAAA//8BAAAA//8CAP7/AQAAAP//AgD+/wIA/v8CAP//AAAAAAEA//8BAP//AAABAAAA//8BAP//AQD//wEA//8BAP//AQAAAP//AQD//wEAAAD//wIA/f8CAAAA//8BAAAA//8BAP//AAABAP//AQD//wAAAAAAAAEA/v8CAP//AQD//wAAAAABAP7/AwD9/wIAAAD+/wIA//8BAP//AgD9/wMA/f8DAP7/AgD+/wEAAAAAAAEA/v8CAP7/AgD//wAAAAAAAAAAAAAAAP//AgD/////AgD9/wQA/f8BAAAAAAAAAAEA/f8DAP////8DAP3/AQABAP7/AgD//wAAAQD+/wMA/f8CAP7/AQABAP7/AwD7/wYA+v8FAP3/AQABAP7/AgD+/wMA/f8CAP7/AwD+/wEA//8BAP//AQAAAP7/BQD5/wcA+v8FAPz/AwD+/wIA/v8BAAAA//8DAPv/BQD8/wMA/////wEAAAAAAAAAAAD//wIA/f8DAP7/AQAAAP//AQAAAP//AgD+/wIA/v8BAAEA/f8EAPz/AwD+/wEA//8CAP7/AQD//wEA//8CAP7/AQAAAP//AgD+/wEAAAAAAAAAAAAAAAAAAAD//wIA/f8EAPz/AwD+/wEA//8CAP7/AgD+/wEAAQD+/wEAAQD+/wIA/////wIA//8AAAAAAAAAAAAAAAD//wEAAAAAAP//AgD9/wMA/v8BAP//AQAAAP//AQD//wEA//8BAP//AQD//wEA//8BAP//AQAAAP7/AwD9/wMA/v8BAP7/AwD9/wMA/v8BAP//AAABAP//AQD//wAAAAABAP//AAAAAAAAAQD//wEA/v8CAAAA/v8EAPv/BAD9/wIAAAD+/wMA/P8DAP//AAAAAP//AQD//wIA/f8DAP3/AwD9/wMA/v8BAAAA//8BAAAA//8CAP3/AwD9/wQA+/8FAPv/BQD8/wMA/v8BAAAA//8BAP//AgD+/wEAAAD//wIA/v8BAAEA/f8DAP3/AgAAAP//AQD//wAAAQD//wEA//8BAP//AQD//wEA/v8DAP3/AgAAAP7/AwD9/wIAAAD//wEAAAD//wIA/f8DAP7/AgD9/wQA+/8FAPz/AgAAAP//AgD9/wIA//8BAP//AQD//wEA//8BAP//AQD//wIA/f8DAP3/AgD//wAAAQD+/wIA/v8BAAEA/v8CAP7/AgD+/wMA/P8DAP//AAABAP7/AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEA/v8CAP3/BAD8/wMA/v8BAAAAAAD//wEAAAAAAAAAAAD//wEAAAAAAAAA//8BAP//AgD+/wEA//8CAP3/AwD9/wMA/f8EAPv/BAD+/wAAAQD//wEA//8BAP//AAABAP//AQD//wEAAAD//wEA//8BAP//AgD9/wMA/v8AAAIA/f8DAP7/AAACAP3/AwD+/wEA//8BAP//AQAAAP//AQAAAP7/AwD9/wMA/v8AAAEA//8BAP//AAAAAAEA//8AAAEA/v8CAP//AAAAAAEA/v8DAPz/BAD9/wEAAQD+/wEAAQD9/wQA/P8DAP7/AQAAAAAAAAAAAAAAAAAAAAAAAQD+/wIA/////wIA/v8BAAAA//8BAP//AQD//wEA//8BAAAA/v8EAPz/AwD///7/BAD8/wMA/////wIA/v8CAP////8CAP7/AgD+/wIA/v8CAP////8CAP7/AwD9/wIA/v8CAP//AAABAP7/AwD9/wEAAQD+/wMA/f8CAP//AAAAAAEA/v8DAPz/BAD9/wIA/v8CAP7/AgD//wAAAAD//wIA/v8CAP7/AQAAAAAA//8CAP7/AgD+/wIA/v8CAP7/AwD8/wUA+v8GAPv/AwD//wAAAAAAAAAA//8DAPv/BQD9/wAAAgD9/wMA/v8BAP//AQAAAP//AgD9/wMA/v8BAAAA//8BAAAAAAAAAP//AQAAAAAAAAD//wEA//8CAP3/AwD+/wAAAgD+/wEAAAD//wIA/v8CAP7/AgD/////AwD8/wUA/P8CAP//AQD//wIA/f8DAP3/AwD+/wAAAQD+/wMA/f8DAP3/AgD//wAAAQD//wEA//8BAP7/AwD+/wEA//8AAAEA//8CAPz/BAD9/wIA//8AAAEA/v8DAPz/BAD9/wIA//8AAAEA/v8CAP7/AgD//wEA/f8EAPz/BAD+////AgD//wAAAQD//wAAAQD//wEA//8BAP7/AwD+/wEA';
      }
      else {
        addTest('audiopreload', false);
        return;
      }
    }

    catch (e) {
      addTest('audiopreload', false);
      return;
    }

    elem.setAttribute('preload', 'auto');
    elem.style.cssText = 'display:none';
    docElement.appendChild(elem);
    // wait for the next tick to add the listener, otherwise the element may
    // not have time to play in high load situations (e.g. the test suite)
    setTimeout(function() {
      elem.addEventListener('loadeddata', testpreload, false);
      timeout = setTimeout(testpreload, waitTime);
    }, 0);
  });

/*!
{
  "name": "Animated PNG",
  "async": true,
  "property": "apng",
  "tags": ["image"],
  "builderAliases": ["img_apng"],
  "notes": [{
    "name": "Wikipedia Article",
    "href": "https://en.wikipedia.org/wiki/APNG"
  }]
}
!*/
/* DOC
Test for animated png support.
*/

  Modernizr.addAsyncTest(function() {
    if (!Modernizr.canvas) {
      return false;
    }

    var image = new Image();
    var canvas = createElement('canvas');
    var ctx = canvas.getContext('2d');

    image.onload = function() {
      addTest('apng', function() {
        if (typeof canvas.getContext == 'undefined') {
          return false;
        }
        else {
          ctx.drawImage(image, 0, 0);
          return ctx.getImageData(0, 0, 1, 1).data[3] === 0;
        }
      });
    };

    image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACGFjVEwAAAABAAAAAcMq2TYAAAANSURBVAiZY2BgYPgPAAEEAQB9ssjfAAAAGmZjVEwAAAAAAAAAAQAAAAEAAAAAAAAAAAD6A+gBAbNU+2sAAAARZmRBVAAAAAEImWNgYGBgAAAABQAB6MzFdgAAAABJRU5ErkJggg==';
  });

/*!
{
  "name": "JPEG 2000",
  "async": true,
  "aliases": ["jpeg-2000", "jpg2"],
  "property": "jpeg2000",
  "tags": ["image"],
  "authors": ["@eric_wvgg"],
  "notes": [{
    "name": "Wikipedia Article",
    "href": "https://en.wikipedia.org/wiki/JPEG_2000"
  }]
}
!*/
/* DOC
Test for JPEG 2000 support
*/


  Modernizr.addAsyncTest(function() {
    var image = new Image();

    image.onload = image.onerror = function() {
      addTest('jpeg2000', image.width == 1);
    };

    image.src = 'data:image/jp2;base64,/0//UQAyAAAAAAABAAAAAgAAAAAAAAAAAAAABAAAAAQAAAAAAAAAAAAEBwEBBwEBBwEBBwEB/1IADAAAAAEAAAQEAAH/XAAEQED/ZAAlAAFDcmVhdGVkIGJ5IE9wZW5KUEVHIHZlcnNpb24gMi4wLjD/kAAKAAAAAABYAAH/UwAJAQAABAQAAf9dAAUBQED/UwAJAgAABAQAAf9dAAUCQED/UwAJAwAABAQAAf9dAAUDQED/k8+kEAGvz6QQAa/PpBABr994EAk//9k=';
  });

/*!
{
  "name": "JPEG XR (extended range)",
  "async": true,
  "aliases": ["jpeg-xr"],
  "property": "jpegxr",
  "tags": ["image"],
  "notes": [{
    "name": "Wikipedia Article",
    "href": "https://en.wikipedia.org/wiki/JPEG_XR"
  }]
}
!*/
/* DOC
Test for JPEG XR support
*/


  Modernizr.addAsyncTest(function() {
    var image = new Image();

    image.onload = image.onerror = function() {
      addTest('jpegxr', image.width == 1, {aliases: ['jpeg-xr']});
    };

    image.src = 'data:image/vnd.ms-photo;base64,SUm8AQgAAAAFAAG8AQAQAAAASgAAAIC8BAABAAAAAQAAAIG8BAABAAAAAQAAAMC8BAABAAAAWgAAAMG8BAABAAAAHwAAAAAAAAAkw91vA07+S7GFPXd2jckNV01QSE9UTwAZAYBxAAAAABP/gAAEb/8AAQAAAQAAAA==';
  });

/*!
{
  "name": "sizes attribute",
  "async": true,
  "property": "sizes",
  "tags": ["image"],
  "authors": ["Mat Marquis"],
  "notes": [{
    "name": "Spec",
    "href": "http://picture.responsiveimages.org/#parse-sizes-attr"
    },{
    "name": "Usage Details",
    "href": "http://ericportis.com/posts/2014/srcset-sizes/"
    }]
}
!*/
/* DOC
Test for the `sizes` attribute on images
*/

  Modernizr.addAsyncTest(function() {
    var width1, width2, test;
    var image = createElement('img');
    // in a perfect world this would be the test...
    var isSizes = 'sizes' in image;

    // ... but we need to deal with Safari 9...
    if (!isSizes && ('srcset' in  image)) {
      width2 = 'data:image/gif;base64,R0lGODlhAgABAPAAAP///wAAACH5BAAAAAAALAAAAAACAAEAAAICBAoAOw==';
      width1 = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

      test = function() {
        addTest('sizes', image.width == 2);
      };

      image.onload = test;
      image.onerror = test;
      image.setAttribute('sizes', '9px');

      image.srcset = width1 + ' 1w,' + width2 + ' 8w';
      image.src = width1;
    } else {
      addTest('sizes', isSizes);
    }
  });

/*!
{
  "name": "Webp Alpha",
  "async": true,
  "property": "webpalpha",
  "aliases": ["webp-alpha"],
  "tags": ["image"],
  "authors": ["Krister Kari", "Rich Bradshaw", "Ryan Seddon", "Paul Irish"],
  "notes": [{
    "name": "WebP Info",
    "href": "https://developers.google.com/speed/webp/"
  },{
    "name": "Article about WebP support on Android browsers",
    "href": "http://www.wope-framework.com/en/2013/06/24/webp-support-on-android-browsers/"
  },{
    "name": "Chromium WebP announcement",
    "href": "https://blog.chromium.org/2011/11/lossless-and-transparency-encoding-in.html?m=1"
  }]
}
!*/
/* DOC
Tests for transparent webp support.
*/

  Modernizr.addAsyncTest(function() {
    var image = new Image();

    image.onerror = function() {
      addTest('webpalpha', false, {aliases: ['webp-alpha']});
    };

    image.onload = function() {
      addTest('webpalpha', image.width == 1, {aliases: ['webp-alpha']});
    };

    image.src = 'data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA==';
  });

/*!
{
  "name": "Webp Animation",
  "async": true,
  "property": "webpanimation",
  "aliases": ["webp-animation"],
  "tags": ["image"],
  "authors": ["Krister Kari", "Rich Bradshaw", "Ryan Seddon", "Paul Irish"],
  "notes": [{
    "name": "WebP Info",
    "href": "https://developers.google.com/speed/webp/"
  },{
    "name": "Chromium blog - Chrome 32 Beta: Animated WebP images and faster Chrome for Android touch input",
    "href": "https://blog.chromium.org/2013/11/chrome-32-beta-animated-webp-images-and.html"
  }]
}
!*/
/* DOC
Tests for animated webp support.
*/

  Modernizr.addAsyncTest(function() {
    var image = new Image();

    image.onerror = function() {
      addTest('webpanimation', false, {aliases: ['webp-animation']});
    };

    image.onload = function() {
      addTest('webpanimation', image.width == 1, {aliases: ['webp-animation']});
    };

    image.src = 'data:image/webp;base64,UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA';
  });

/*!
{
  "name": "Webp Lossless",
  "async": true,
  "property": ["webplossless", "webp-lossless"],
  "tags": ["image"],
  "authors": ["@amandeep", "Rich Bradshaw", "Ryan Seddon", "Paul Irish"],
  "notes": [{
    "name": "Webp Info",
    "href": "https://developers.google.com/speed/webp/"
  },{
    "name": "Webp Lossless Spec",
    "href": "https://developers.google.com/speed/webp/docs/webp_lossless_bitstream_specification"
  }]
}
!*/
/* DOC
Tests for non-alpha lossless webp support.
*/

  Modernizr.addAsyncTest(function() {
    var image = new Image();

    image.onerror = function() {
      addTest('webplossless', false, {aliases: ['webp-lossless']});
    };

    image.onload = function() {
      addTest('webplossless', image.width == 1, {aliases: ['webp-lossless']});
    };

    image.src = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
  });

/*!
{
  "name": "Webp",
  "async": true,
  "property": "webp",
  "tags": ["image"],
  "builderAliases": ["img_webp"],
  "authors": ["Krister Kari", "@amandeep", "Rich Bradshaw", "Ryan Seddon", "Paul Irish"],
  "notes": [{
    "name": "Webp Info",
    "href": "https://developers.google.com/speed/webp/"
  }, {
    "name": "Chormium blog - Chrome 32 Beta: Animated WebP images and faster Chrome for Android touch input",
    "href": "https://blog.chromium.org/2013/11/chrome-32-beta-animated-webp-images-and.html"
  }, {
    "name": "Webp Lossless Spec",
    "href": "https://developers.google.com/speed/webp/docs/webp_lossless_bitstream_specification"
  }, {
    "name": "Article about WebP support on Android browsers",
    "href": "http://www.wope-framework.com/en/2013/06/24/webp-support-on-android-browsers/"
  }, {
    "name": "Chormium WebP announcement",
    "href": "https://blog.chromium.org/2011/11/lossless-and-transparency-encoding-in.html?m=1"
  }]
}
!*/
/* DOC
Tests for lossy, non-alpha webp support.

Tests for all forms of webp support (lossless, lossy, alpha, and animated)..

  Modernizr.webp              // Basic support (lossy)
  Modernizr.webp.lossless     // Lossless
  Modernizr.webp.alpha        // Alpha (both lossy and lossless)
  Modernizr.webp.animation    // Animated WebP

*/


  Modernizr.addAsyncTest(function() {

    var webpTests = [{
      'uri': 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=',
      'name': 'webp'
    }, {
      'uri': 'data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA==',
      'name': 'webp.alpha'
    }, {
      'uri': 'data:image/webp;base64,UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA',
      'name': 'webp.animation'
    }, {
      'uri': 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=',
      'name': 'webp.lossless'
    }];

    var webp = webpTests.shift();
    function test(name, uri, cb) {

      var image = new Image();

      function addResult(event) {
        // if the event is from 'onload', check the see if the image's width is
        // 1 pixel (which indiciates support). otherwise, it fails

        var result = event && event.type === 'load' ? image.width == 1 : false;
        var baseTest = name === 'webp';

        /* jshint -W053 */
        addTest(name, baseTest ? new Boolean(result) : result);

        if (cb) {
          cb(event);
        }
      }

      image.onerror = addResult;
      image.onload = addResult;

      image.src = uri;
    }

    // test for webp support in general
    test(webp.name, webp.uri, function(e) {
      // if the webp test loaded, test everything else.
      if (e && e.type === 'load') {
        for (var i = 0; i < webpTests.length; i++) {
          test(webpTests[i].name, webpTests[i].uri);
        }
      }
    });

  });


/*!
{
  "name": "SVG as an <img> tag source",
  "property": "svgasimg",
  "caniuse" : "svg-img",
  "tags": ["svg"],
  "authors": ["Chris Coyier"],
  "notes": [{
    "name": "HTML5 Spec",
    "href": "http://www.w3.org/TR/html5/embedded-content-0.html#the-img-element"
  }]
}
!*/


  // Original Async test by Stu Cox
  // https://gist.github.com/chriscoyier/8774501

  // Now a Sync test based on good results here
  // http://codepen.io/chriscoyier/pen/bADFx

  // Note http://www.w3.org/TR/SVG11/feature#Image is *supposed* to represent
  // support for the `<image>` tag in SVG, not an SVG file linked from an `<img>`
  // tag in HTML – but it’s a heuristic which works
  Modernizr.addTest('svgasimg', document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#Image', '1.1'));

/*!
{
  "name": "Data URI",
  "property": "datauri",
  "caniuse": "datauri",
  "tags": ["url"],
  "builderAliases": ["url_data_uri"],
  "async": true,
  "notes": [{
    "name": "Wikipedia article",
    "href": "https://en.wikipedia.org/wiki/Data_URI_scheme"
  }],
  "warnings": ["Support in Internet Explorer 8 is limited to images and linked resources like CSS files, not HTML files"]
}
!*/
/* DOC
Detects support for data URIs. Provides a subproperty to report support for data URIs over 32kb in size:

```javascript
Modernizr.datauri           // true
Modernizr.datauri.over32kb  // false in IE8
```
*/

  // https://github.com/Modernizr/Modernizr/issues/14
  Modernizr.addAsyncTest(function() {
    /* jshint -W053 */

    // IE7 throw a mixed content warning on HTTPS for this test, so we'll
    // just blacklist it (we know it doesn't support data URIs anyway)
    // https://github.com/Modernizr/Modernizr/issues/362
    if (navigator.userAgent.indexOf('MSIE 7.') !== -1) {
      // Keep the test async
      setTimeout(function() {
        addTest('datauri', false);
      }, 10);
    }

    var datauri = new Image();

    datauri.onerror = function() {
      addTest('datauri', false);
    };
    datauri.onload = function() {
      if (datauri.width == 1 && datauri.height == 1) {
        testOver32kb();
      }
      else {
        addTest('datauri', false);
      }
    };

    datauri.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

    // Once we have datauri, let's check to see if we can use data URIs over
    // 32kb (IE8 can't). https://github.com/Modernizr/Modernizr/issues/321
    function testOver32kb() {

      var datauriBig = new Image();

      datauriBig.onerror = function() {
        addTest('datauri', true);
        Modernizr.datauri = new Boolean(true);
        Modernizr.datauri.over32kb = false;
      };
      datauriBig.onload = function() {
        addTest('datauri', true);
        Modernizr.datauri = new Boolean(true);
        Modernizr.datauri.over32kb = (datauriBig.width == 1 && datauriBig.height == 1);
      };

      var base64str = 'R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
      while (base64str.length < 33000) {
        base64str = '\r\n' + base64str;
      }
      datauriBig.src = 'data:image/gif;base64,' + base64str;
    }

  });

/*!
{
  "name": "Video Autoplay",
  "property": "videoautoplay",
  "tags": ["video"],
  "async" : true,
  "warnings": ["This test is very large – only include it if you absolutely need it"],
  "knownBugs": ["crashes with an alert on iOS7 when added to homescreen"]
}
!*/
/* DOC
Checks for support of the autoplay attribute of the video element.
*/


  Modernizr.addAsyncTest(function() {
    var timeout;
    var waitTime = 200;
    var retries = 5;
    var currentTry = 0;
    var elem = createElement('video');
    var elemStyle = elem.style;

    function testAutoplay(arg) {
      currentTry++;
      clearTimeout(timeout);

      var result = arg && arg.type === 'playing' || elem.currentTime !== 0;

      if (!result && currentTry < retries) {
        //Detection can be flaky if the browser is slow, so lets retry in a little bit
        timeout = setTimeout(testAutoplay, waitTime);
        return;
      }

      elem.removeEventListener('playing', testAutoplay, false);
      addTest('videoautoplay', result);
      elem.parentNode.removeChild(elem);
    }

    //skip the test if video itself, or the autoplay
    //element on it isn't supported
    if (!Modernizr.video || !('autoplay' in elem)) {
      addTest('videoautoplay', false);
      return;
    }

    elemStyle.position = 'absolute';
    elemStyle.height = 0;
    elemStyle.width = 0;

    try {
      if (Modernizr.video.ogg) {
        elem.src = 'data:video/ogg;base64,T2dnUwACAAAAAAAAAABmnCATAAAAAHDEixYBKoB0aGVvcmEDAgEAAQABAAAQAAAQAAAAAAAFAAAAAQAAAAAAAAAAAGIAYE9nZ1MAAAAAAAAAAAAAZpwgEwEAAAACrA7TDlj///////////////+QgXRoZW9yYSsAAABYaXBoLk9yZyBsaWJ0aGVvcmEgMS4xIDIwMDkwODIyIChUaHVzbmVsZGEpAQAAABoAAABFTkNPREVSPWZmbXBlZzJ0aGVvcmEtMC4yOYJ0aGVvcmG+zSj3uc1rGLWpSUoQc5zmMYxSlKQhCDGMYhCEIQhAAAAAAAAAAAAAEW2uU2eSyPxWEvx4OVts5ir1aKtUKBMpJFoQ/nk5m41mUwl4slUpk4kkghkIfDwdjgajQYC8VioUCQRiIQh8PBwMhgLBQIg4FRba5TZ5LI/FYS/Hg5W2zmKvVoq1QoEykkWhD+eTmbjWZTCXiyVSmTiSSCGQh8PB2OBqNBgLxWKhQJBGIhCHw8HAyGAsFAiDgUCw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDAwPEhQUFQ0NDhESFRUUDg4PEhQVFRUOEBETFBUVFRARFBUVFRUVEhMUFRUVFRUUFRUVFRUVFRUVFRUVFRUVEAwLEBQZGxwNDQ4SFRwcGw4NEBQZHBwcDhATFhsdHRwRExkcHB4eHRQYGxwdHh4dGxwdHR4eHh4dHR0dHh4eHRALChAYKDM9DAwOExo6PDcODRAYKDlFOA4RFh0zV1A+EhYlOkRtZ00YIzdAUWhxXDFATldneXhlSFxfYnBkZ2MTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTEhIVGRoaGhoSFBYaGhoaGhUWGRoaGhoaGRoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhESFh8kJCQkEhQYIiQkJCQWGCEkJCQkJB8iJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQREhgvY2NjYxIVGkJjY2NjGBo4Y2NjY2MvQmNjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRISEhUXGBkbEhIVFxgZGxwSFRcYGRscHRUXGBkbHB0dFxgZGxwdHR0YGRscHR0dHhkbHB0dHR4eGxwdHR0eHh4REREUFxocIBERFBcaHCAiERQXGhwgIiUUFxocICIlJRcaHCAiJSUlGhwgIiUlJSkcICIlJSUpKiAiJSUlKSoqEBAQFBgcICgQEBQYHCAoMBAUGBwgKDBAFBgcICgwQEAYHCAoMEBAQBwgKDBAQEBgICgwQEBAYIAoMEBAQGCAgAfF5cdH1e3Ow/L66wGmYnfIUbwdUTe3LMRbqON8B+5RJEvcGxkvrVUjTMrsXYhAnIwe0dTJfOYbWrDYyqUrz7dw/JO4hpmV2LsQQvkUeGq1BsZLx+cu5iV0e0eScJ91VIQYrmqfdVSK7GgjOU0oPaPOu5IcDK1mNvnD+K8LwS87f8Jx2mHtHnUkTGAurWZlNQa74ZLSFH9oF6FPGxzLsjQO5Qe0edcpttd7BXBSqMCL4k/4tFrHIPuEQ7m1/uIWkbDMWVoDdOSuRQ9286kvVUlQjzOE6VrNguN4oRXYGkgcnih7t13/9kxvLYKQezwLTrO44sVmMPgMqORo1E0sm1/9SludkcWHwfJwTSybR4LeAz6ugWVgRaY8mV/9SluQmtHrzsBtRF/wPY+X0JuYTs+ltgrXAmlk10xQHmTu9VSIAk1+vcvU4ml2oNzrNhEtQ3CysNP8UeR35wqpKUBdGdZMSjX4WVi8nJpdpHnbhzEIdx7mwf6W1FKAiucMXrWUWVjyRf23chNtR9mIzDoT/6ZLYailAjhFlZuvPtSeZ+2oREubDoWmT3TguY+JHPdRVSLKxfKH3vgNqJ/9emeEYikGXDFNzaLjvTeGAL61mogOoeG3y6oU4rW55ydoj0lUTSR/mmRhPmF86uwIfzp3FtiufQCmppaHDlGE0r2iTzXIw3zBq5hvaTldjG4CPb9wdxAme0SyedVKczJ9AtYbgPOzYKJvZZImsN7ecrxWZg5dR6ZLj/j4qpWsIA+vYwE+Tca9ounMIsrXMB4Stiib2SPQtZv+FVIpfEbzv8ncZoLBXc3YBqTG1HsskTTotZOYTG+oVUjLk6zhP8bg4RhMUNtfZdO7FdpBuXzhJ5Fh8IKlJG7wtD9ik8rWOJxy6iQ3NwzBpQ219mlyv+FLicYs2iJGSE0u2txzed++D61ZWCiHD/cZdQVCqkO2gJpdpNaObhnDfAPrT89RxdWFZ5hO3MseBSIlANppdZNIV/Rwe5eLTDvkfWKzFnH+QJ7m9QWV1KdwnuIwTNtZdJMoXBf74OhRnh2t+OTGL+AVUnIkyYY+QG7g9itHXyF3OIygG2s2kud679ZWKqSFa9n3IHD6MeLv1lZ0XyduRhiDRtrNnKoyiFVLcBm0ba5Yy3fQkDh4XsFE34isVpOzpa9nR8iCpS4HoxG2rJpnRhf3YboVa1PcRouh5LIJv/uQcPNd095ickTaiGBnWLKVWRc0OnYTSyex/n2FofEPnDG8y3PztHrzOLK1xo6RAml2k9owKajOC0Wr4D5x+3nA0UEhK2m198wuBHF3zlWWVKWLN1CHzLClUfuoYBcx4b1llpeBKmbayaR58njtE9onD66lUcsg0Spm2snsb+8HaJRn4dYcLbCuBuYwziB8/5U1C1DOOz2gZjSZtrLJk6vrLF3hwY4Io9xuT/ruUFRSBkNtUzTOWhjh26irLEPx4jPZL3Fo3QrReoGTTM21xYTT9oFdhTUIvjqTkfkvt0bzgVUjq/hOYY8j60IaO/0AzRBtqkTS6R5ellZd5uKdzzhb8BFlDdAcrwkE0rbXTOPB+7Y0FlZO96qFL4Ykg21StJs8qIW7h16H5hGiv8V2Cflau7QVDepTAHa6Lgt6feiEvJDM21StJsmOH/hynURrKxvUpQ8BH0JF7BiyG2qZpnL/7AOU66gt+reLEXY8pVOCQvSsBtqZTNM8bk9ohRcwD18o/WVkbvrceVKRb9I59IEKysjBeTMmmbA21xu/6iHadLRxuIzkLpi8wZYmmbbWi32RVAUjruxWlJ//iFxE38FI9hNKOoCdhwf5fDe4xZ81lgREhK2m1j78vW1CqkuMu/AjBNK210kzRUX/B+69cMMUG5bYrIeZxVSEZISmkzbXOi9yxwIfPgdsov7R71xuJ7rFcACjG/9PzApqFq7wEgzNJm2suWESPuwrQvejj7cbnQxMkxpm21lUYJL0fKmogPPqywn7e3FvB/FCNxPJ85iVUkCE9/tLKx31G4CgNtWTTPFhMvlu8G4/TrgaZttTChljfNJGgOT2X6EqpETy2tYd9cCBI4lIXJ1/3uVUllZEJz4baqGF64yxaZ+zPLYwde8Uqn1oKANtUrSaTOPHkhvuQP3bBlEJ/LFe4pqQOHUI8T8q7AXx3fLVBgSCVpMba55YxN3rv8U1Dv51bAPSOLlZWebkL8vSMGI21lJmmeVxPRwFlZF1CpqCN8uLwymaZyjbXHCRytogPN3o/n74CNykfT+qqRv5AQlHcRxYrC5KvGmbbUwmZY/29BvF6C1/93x4WVglXDLFpmbapmF89HKTogRwqqSlGbu+oiAkcWFbklC6Zhf+NtTLFpn8oWz+HsNRVSgIxZWON+yVyJlE5tq/+GWLTMutYX9ekTySEQPLVNQQ3OfycwJBM0zNtZcse7CvcKI0V/zh16Dr9OSA21MpmmcrHC+6pTAPHPwoit3LHHqs7jhFNRD6W8+EBGoSEoaZttTCZljfduH/fFisn+dRBGAZYtMzbVMwvul/T/crK1NQh8gN0SRRa9cOux6clC0/mDLFpmbarmF8/e6CopeOLCNW6S/IUUg3jJIYiAcDoMcGeRbOvuTPjXR/tyo79LK3kqqkbxkkMRAOB0GODPItnX3Jnxro/25Ud+llbyVVSN4ySGIgHA6DHBnkWzr7kz410f7cqO/Syt5KqpFVJwn6gBEvBM0zNtZcpGOEPiysW8vvRd2R0f7gtjhqUvXL+gWVwHm4XJDBiMpmmZtrLfPwd/IugP5+fKVSysH1EXreFAcEhelGmbbUmZY4Xdo1vQWVnK19P4RuEnbf0gQnR+lDCZlivNM22t1ESmopPIgfT0duOfQrsjgG4tPxli0zJmF5trdL1JDUIUT1ZXSqQDeR4B8mX3TrRro/2McGeUvLtwo6jIEKMkCUXWsLyZROd9P/rFYNtXPBli0z398iVUlVKAjFlY437JXImUTm2r/4ZYtMy61hf16RPJIU9nZ1MABAwAAAAAAAAAZpwgEwIAAABhp658BScAAAAAAADnUFBQXIDGXLhwtttNHDhw5OcpQRMETBEwRPduylKVB0HRdF0A';
      }
      else if (Modernizr.video.h264) {
        elem.src = 'data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAAs1tZGF0AAACrgYF//+q3EXpvebZSLeWLNgg2SPu73gyNjQgLSBjb3JlIDE0OCByMjYwMSBhMGNkN2QzIC0gSC4yNjQvTVBFRy00IEFWQyBjb2RlYyAtIENvcHlsZWZ0IDIwMDMtMjAxNSAtIGh0dHA6Ly93d3cudmlkZW9sYW4ub3JnL3gyNjQuaHRtbCAtIG9wdGlvbnM6IGNhYmFjPTEgcmVmPTMgZGVibG9jaz0xOjA6MCBhbmFseXNlPTB4MzoweDExMyBtZT1oZXggc3VibWU9NyBwc3k9MSBwc3lfcmQ9MS4wMDowLjAwIG1peGVkX3JlZj0xIG1lX3JhbmdlPTE2IGNocm9tYV9tZT0xIHRyZWxsaXM9MSA4eDhkY3Q9MSBjcW09MCBkZWFkem9uZT0yMSwxMSBmYXN0X3Bza2lwPTEgY2hyb21hX3FwX29mZnNldD0tMiB0aHJlYWRzPTEgbG9va2FoZWFkX3RocmVhZHM9MSBzbGljZWRfdGhyZWFkcz0wIG5yPTAgZGVjaW1hdGU9MSBpbnRlcmxhY2VkPTAgYmx1cmF5X2NvbXBhdD0wIGNvbnN0cmFpbmVkX2ludHJhPTAgYmZyYW1lcz0zIGJfcHlyYW1pZD0yIGJfYWRhcHQ9MSBiX2JpYXM9MCBkaXJlY3Q9MSB3ZWlnaHRiPTEgb3Blbl9nb3A9MCB3ZWlnaHRwPTIga2V5aW50PTI1MCBrZXlpbnRfbWluPTEwIHNjZW5lY3V0PTQwIGludHJhX3JlZnJlc2g9MCByY19sb29rYWhlYWQ9NDAgcmM9Y3JmIG1idHJlZT0xIGNyZj0yMy4wIHFjb21wPTAuNjAgcXBtaW49MCBxcG1heD02OSBxcHN0ZXA9NCBpcF9yYXRpbz0xLjQwIGFxPTE6MS4wMACAAAAAD2WIhAA3//728P4FNjuZQQAAAu5tb292AAAAbG12aGQAAAAAAAAAAAAAAAAAAAPoAAAAZAABAAABAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAACGHRyYWsAAABcdGtoZAAAAAMAAAAAAAAAAAAAAAEAAAAAAAAAZAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAgAAAAIAAAAAACRlZHRzAAAAHGVsc3QAAAAAAAAAAQAAAGQAAAAAAAEAAAAAAZBtZGlhAAAAIG1kaGQAAAAAAAAAAAAAAAAAACgAAAAEAFXEAAAAAAAtaGRscgAAAAAAAAAAdmlkZQAAAAAAAAAAAAAAAFZpZGVvSGFuZGxlcgAAAAE7bWluZgAAABR2bWhkAAAAAQAAAAAAAAAAAAAAJGRpbmYAAAAcZHJlZgAAAAAAAAABAAAADHVybCAAAAABAAAA+3N0YmwAAACXc3RzZAAAAAAAAAABAAAAh2F2YzEAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAgACAEgAAABIAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY//8AAAAxYXZjQwFkAAr/4QAYZ2QACqzZX4iIhAAAAwAEAAADAFA8SJZYAQAGaOvjyyLAAAAAGHN0dHMAAAAAAAAAAQAAAAEAAAQAAAAAHHN0c2MAAAAAAAAAAQAAAAEAAAABAAAAAQAAABRzdHN6AAAAAAAAAsUAAAABAAAAFHN0Y28AAAAAAAAAAQAAADAAAABidWR0YQAAAFptZXRhAAAAAAAAACFoZGxyAAAAAAAAAABtZGlyYXBwbAAAAAAAAAAAAAAAAC1pbHN0AAAAJal0b28AAAAdZGF0YQAAAAEAAAAATGF2ZjU2LjQwLjEwMQ==';
      }
      else {
        addTest('videoautoplay', false);
        return;
      }
    }

    catch (e) {
      addTest('videoautoplay', false);
      return;
    }

    elem.setAttribute('autoplay', '');
    elem.style.cssText = 'display:none';
    docElement.appendChild(elem);
    // wait for the next tick to add the listener, otherwise the element may
    // not have time to play in high load situations (e.g. the test suite)
    setTimeout(function() {
      elem.addEventListener('playing', testAutoplay, false);
      timeout = setTimeout(testAutoplay, waitTime);
    }, 0);
  });

/*!
{
  "name": "Workers from Blob URIs",
  "property": "blobworkers",
  "tags": ["performance", "workers"],
  "builderAliases": ["workers_blobworkers"],
  "notes": [{
    "name": "W3C Reference",
    "href": "https://www.w3.org/TR/workers/"
  }],
  "knownBugs": ["This test may output garbage to console."],
  "authors": ["Jussi Kalliokoski"],
  "async": true
}
!*/
/* DOC
Detects support for creating Web Workers from Blob URIs.
*/

  Modernizr.addAsyncTest(function() {
    try {
      // we're avoiding using Modernizr._domPrefixes as the prefix capitalization on
      // these guys are notoriously peculiar.
      var BlobBuilder = window.BlobBuilder;
      var URL         = window.URL;
      if (Modernizr._config.usePrefix) {
        BlobBuilder = BlobBuilder || window.MozBlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder || window.OBlobBuilder;
        URL         = URL || window.MozURL || window.webkitURL || window.MSURL || window.OURL;
      }
      var data    = 'Modernizr',
          blob,
          bb,
          worker,
          url,
          timeout,
          scriptText = 'this.onmessage=function(e){postMessage(e.data)}';

      try {
        blob = new Blob([scriptText], {type: 'text/javascript'});
      } catch (e) {
        // we'll fall back to the deprecated BlobBuilder
      }
      if (!blob) {
        bb = new BlobBuilder();
        bb.append(scriptText);
        blob = bb.getBlob();
      }

      url = URL.createObjectURL(blob);
      worker = new Worker(url);

      worker.onmessage = function(e) {
        addTest('blobworkers', data === e.data);
        cleanup();
      };

      // Just in case...
      worker.onerror = fail;
      timeout = setTimeout(fail, 200);

      worker.postMessage(data);
    } catch (e) {
      fail();
    }

    function fail() {
      addTest('blobworkers', false);
      cleanup();
    }

    function cleanup() {
      if (url) {
        URL.revokeObjectURL(url);
      }
      if (worker) {
        worker.terminate();
      }
      if (timeout) {
        clearTimeout(timeout);
      }
    }
  });

/*!
{
  "name": "Workers from Data URIs",
  "property": "dataworkers",
  "tags": ["performance", "workers"],
  "builderAliases": ["workers_dataworkers"],
  "notes": [{
    "name": "W3C Reference",
    "href": "https://www.w3.org/TR/workers/"
  }],
  "knownBugs": ["This test may output garbage to console."],
  "authors": ["Jussi Kalliokoski"],
  "async": true
}
!*/
/* DOC
Detects support for creating Web Workers from Data URIs.
*/

  Modernizr.addAsyncTest(function() {
    try {
      var data    = 'Modernizr',
      worker  = new Worker('data:text/javascript;base64,dGhpcy5vbm1lc3NhZ2U9ZnVuY3Rpb24oZSl7cG9zdE1lc3NhZ2UoZS5kYXRhKX0=');

      worker.onmessage = function(e) {
        worker.terminate();
        addTest('dataworkers', data === e.data);
        worker = null;
      };

      // Just in case...
      worker.onerror = function() {
        addTest('dataworkers', false);
        worker = null;
      };

      setTimeout(function() {
        addTest('dataworkers', false);
      }, 200);

      worker.postMessage(data);
    } catch (e) {
      setTimeout(function() {
        addTest('dataworkers', false);
      }, 0);
    }
  });


  /**
   * If the browsers follow the spec, then they would expose vendor-specific style as:
   *   elem.style.WebkitBorderRadius
   * instead of something like the following, which would be technically incorrect:
   *   elem.style.webkitBorderRadius

   * Webkit ghosts their properties in lowercase but Opera & Moz do not.
   * Microsoft uses a lowercase `ms` instead of the correct `Ms` in IE8+
   *   erik.eae.net/archives/2008/03/10/21.48.10/

   * More here: github.com/Modernizr/Modernizr/issues/issue/21
   *
   * @access private
   * @returns {string} The string representing the vendor-specific style properties
   */

  var omPrefixes = 'Moz O ms Webkit';
  

  /**
   * List of JavaScript DOM values used for tests
   *
   * @memberof Modernizr
   * @name Modernizr._domPrefixes
   * @optionName Modernizr._domPrefixes
   * @optionProp domPrefixes
   * @access public
   * @example
   *
   * Modernizr._domPrefixes is exactly the same as [_prefixes](#modernizr-_prefixes), but rather
   * than kebab-case properties, all properties are their Capitalized variant
   *
   * ```js
   * Modernizr._domPrefixes === [ "Moz", "O", "ms", "Webkit" ];
   * ```
   */

  var domPrefixes = (ModernizrProto._config.usePrefixes ? omPrefixes.toLowerCase().split(' ') : []);
  ModernizrProto._domPrefixes = domPrefixes;
  
/*!
{
  "name": "input[directory] Attribute",
  "property": "directory",
  "authors": ["silverwind"],
  "tags": ["file", "input", "attribute"]
}
!*/
/* DOC
When used on an `<input type="file">`, the `directory` attribute instructs
the user agent to present a directory selection dialog instead of the usual
file selection dialog.
*/

  Modernizr.addTest('fileinputdirectory', function() {
    var elem = createElement('input'), dir = 'directory';
    elem.type = 'file';
    if (dir in elem) {
      return true;
    } else {
      for (var i = 0, len = domPrefixes.length; i < len; i++) {
        if (domPrefixes[i] + dir in elem) {
          return true;
        }
      }
    }
    return false;
  });


  var cssomPrefixes = (ModernizrProto._config.usePrefixes ? omPrefixes.split(' ') : []);
  ModernizrProto._cssomPrefixes = cssomPrefixes;
  

  /**
   * atRule returns a given CSS property at-rule (eg @keyframes), possibly in
   * some prefixed form, or false, in the case of an unsupported rule
   *
   * @memberof Modernizr
   * @name Modernizr.atRule
   * @optionName Modernizr.atRule()
   * @optionProp atRule
   * @access public
   * @function atRule
   * @param {string} prop - String name of the @-rule to test for
   * @returns {string|boolean} The string representing the (possibly prefixed)
   * valid version of the @-rule, or `false` when it is unsupported.
   * @example
   * ```js
   *  var keyframes = Modernizr.atRule('@keyframes');
   *
   *  if (keyframes) {
   *    // keyframes are supported
   *    // could be `@-webkit-keyframes` or `@keyframes`
   *  } else {
   *    // keyframes === `false`
   *  }
   * ```
   *
   */

  var atRule = function(prop) {
    var length = prefixes.length;
    var cssrule = window.CSSRule;
    var rule;

    if (typeof cssrule === 'undefined') {
      return undefined;
    }

    if (!prop) {
      return false;
    }

    // remove literal @ from beginning of provided property
    prop = prop.replace(/^@/, '');

    // CSSRules use underscores instead of dashes
    rule = prop.replace(/-/g, '_').toUpperCase() + '_RULE';

    if (rule in cssrule) {
      return '@' + prop;
    }

    for (var i = 0; i < length; i++) {
      // prefixes gives us something like -o-, and we want O_
      var prefix = prefixes[i];
      var thisRule = prefix.toUpperCase() + '_' + rule;

      if (thisRule in cssrule) {
        return '@-' + prefix.toLowerCase() + '-' + prop;
      }
    }

    return false;
  };

  ModernizrProto.atRule = atRule;

  


  /**
   * contains checks to see if a string contains another string
   *
   * @access private
   * @function contains
   * @param {string} str - The string we want to check for substrings
   * @param {string} substr - The substring we want to search the first string for
   * @returns {boolean}
   */

  function contains(str, substr) {
    return !!~('' + str).indexOf(substr);
  }

  ;

  /**
   * fnBind is a super small [bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) polyfill.
   *
   * @access private
   * @function fnBind
   * @param {function} fn - a function you want to change `this` reference to
   * @param {object} that - the `this` you want to call the function with
   * @returns {function} The wrapped version of the supplied function
   */

  function fnBind(fn, that) {
    return function() {
      return fn.apply(that, arguments);
    };
  }

  ;

  /**
   * testDOMProps is a generic DOM property test; if a browser supports
   *   a certain property, it won't return undefined for it.
   *
   * @access private
   * @function testDOMProps
   * @param {array.<string>} props - An array of properties to test for
   * @param {object} obj - An object or Element you want to use to test the parameters again
   * @param {boolean|object} elem - An Element to bind the property lookup again. Use `false` to prevent the check
   */
  function testDOMProps(props, obj, elem) {
    var item;

    for (var i in props) {
      if (props[i] in obj) {

        // return the property name as a string
        if (elem === false) {
          return props[i];
        }

        item = obj[props[i]];

        // let's bind a function
        if (is(item, 'function')) {
          // bind to obj unless overriden
          return fnBind(item, elem || obj);
        }

        // return the unbound function or obj or value
        return item;
      }
    }
    return false;
  }

  ;

  /**
   * Create our "modernizr" element that we do most feature tests on.
   *
   * @access private
   */

  var modElem = {
    elem: createElement('modernizr')
  };

  // Clean up this element
  Modernizr._q.push(function() {
    delete modElem.elem;
  });

  

  var mStyle = {
    style: modElem.elem.style
  };

  // kill ref for gc, must happen before mod.elem is removed, so we unshift on to
  // the front of the queue.
  Modernizr._q.unshift(function() {
    delete mStyle.style;
  });

  

  /**
   * domToCSS takes a camelCase string and converts it to kebab-case
   * e.g. boxSizing -> box-sizing
   *
   * @access private
   * @function domToCSS
   * @param {string} name - String name of camelCase prop we want to convert
   * @returns {string} The kebab-case version of the supplied name
   */

  function domToCSS(name) {
    return name.replace(/([A-Z])/g, function(str, m1) {
      return '-' + m1.toLowerCase();
    }).replace(/^ms-/, '-ms-');
  }
  ;

  /**
   * nativeTestProps allows for us to use native feature detection functionality if available.
   * some prefixed form, or false, in the case of an unsupported rule
   *
   * @access private
   * @function nativeTestProps
   * @param {array} props - An array of property names
   * @param {string} value - A string representing the value we want to check via @supports
   * @returns {boolean|undefined} A boolean when @supports exists, undefined otherwise
   */

  // Accepts a list of property names and a single value
  // Returns `undefined` if native detection not available
  function nativeTestProps(props, value) {
    var i = props.length;
    // Start with the JS API: http://www.w3.org/TR/css3-conditional/#the-css-interface
    if ('CSS' in window && 'supports' in window.CSS) {
      // Try every prefixed variant of the property
      while (i--) {
        if (window.CSS.supports(domToCSS(props[i]), value)) {
          return true;
        }
      }
      return false;
    }
    // Otherwise fall back to at-rule (for Opera 12.x)
    else if ('CSSSupportsRule' in window) {
      // Build a condition string for every prefixed variant
      var conditionText = [];
      while (i--) {
        conditionText.push('(' + domToCSS(props[i]) + ':' + value + ')');
      }
      conditionText = conditionText.join(' or ');
      return injectElementWithStyles('@supports (' + conditionText + ') { #modernizr { position: absolute; } }', function(node) {
        return getComputedStyle(node, null).position == 'absolute';
      });
    }
    return undefined;
  }
  ;

  // testProps is a generic CSS / DOM property test.

  // In testing support for a given CSS property, it's legit to test:
  //    `elem.style[styleName] !== undefined`
  // If the property is supported it will return an empty string,
  // if unsupported it will return undefined.

  // We'll take advantage of this quick test and skip setting a style
  // on our modernizr element, but instead just testing undefined vs
  // empty string.

  // Property names can be provided in either camelCase or kebab-case.

  function testProps(props, prefixed, value, skipValueTest) {
    skipValueTest = is(skipValueTest, 'undefined') ? false : skipValueTest;

    // Try native detect first
    if (!is(value, 'undefined')) {
      var result = nativeTestProps(props, value);
      if (!is(result, 'undefined')) {
        return result;
      }
    }

    // Otherwise do it properly
    var afterInit, i, propsLength, prop, before;

    // If we don't have a style element, that means we're running async or after
    // the core tests, so we'll need to create our own elements to use

    // inside of an SVG element, in certain browsers, the `style` element is only
    // defined for valid tags. Therefore, if `modernizr` does not have one, we
    // fall back to a less used element and hope for the best.
    // for strict XHTML browsers the hardly used samp element is used
    var elems = ['modernizr', 'tspan', 'samp'];
    while (!mStyle.style && elems.length) {
      afterInit = true;
      mStyle.modElem = createElement(elems.shift());
      mStyle.style = mStyle.modElem.style;
    }

    // Delete the objects if we created them.
    function cleanElems() {
      if (afterInit) {
        delete mStyle.style;
        delete mStyle.modElem;
      }
    }

    propsLength = props.length;
    for (i = 0; i < propsLength; i++) {
      prop = props[i];
      before = mStyle.style[prop];

      if (contains(prop, '-')) {
        prop = cssToDOM(prop);
      }

      if (mStyle.style[prop] !== undefined) {

        // If value to test has been passed in, do a set-and-check test.
        // 0 (integer) is a valid property value, so check that `value` isn't
        // undefined, rather than just checking it's truthy.
        if (!skipValueTest && !is(value, 'undefined')) {

          // Needs a try catch block because of old IE. This is slow, but will
          // be avoided in most cases because `skipValueTest` will be used.
          try {
            mStyle.style[prop] = value;
          } catch (e) {}

          // If the property value has changed, we assume the value used is
          // supported. If `value` is empty string, it'll fail here (because
          // it hasn't changed), which matches how browsers have implemented
          // CSS.supports()
          if (mStyle.style[prop] != before) {
            cleanElems();
            return prefixed == 'pfx' ? prop : true;
          }
        }
        // Otherwise just return true, or the property name if this is a
        // `prefixed()` call
        else {
          cleanElems();
          return prefixed == 'pfx' ? prop : true;
        }
      }
    }
    cleanElems();
    return false;
  }

  ;

  /**
   * testPropsAll tests a list of DOM properties we want to check against.
   * We specify literally ALL possible (known and/or likely) properties on
   * the element including the non-vendor prefixed one, for forward-
   * compatibility.
   *
   * @access private
   * @function testPropsAll
   * @param {string} prop - A string of the property to test for
   * @param {string|object} [prefixed] - An object to check the prefixed properties on. Use a string to skip
   * @param {HTMLElement|SVGElement} [elem] - An element used to test the property and value against
   * @param {string} [value] - A string of a css value
   * @param {boolean} [skipValueTest] - An boolean representing if you want to test if value sticks when set
   */
  function testPropsAll(prop, prefixed, elem, value, skipValueTest) {

    var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1),
    props = (prop + ' ' + cssomPrefixes.join(ucProp + ' ') + ucProp).split(' ');

    // did they call .prefixed('boxSizing') or are we just testing a prop?
    if (is(prefixed, 'string') || is(prefixed, 'undefined')) {
      return testProps(props, prefixed, value, skipValueTest);

      // otherwise, they called .prefixed('requestAnimationFrame', window[, elem])
    } else {
      props = (prop + ' ' + (domPrefixes).join(ucProp + ' ') + ucProp).split(' ');
      return testDOMProps(props, prefixed, elem);
    }
  }

  // Modernizr.testAllProps() investigates whether a given style property,
  // or any of its vendor-prefixed variants, is recognized
  //
  // Note that the property names must be provided in the camelCase variant.
  // Modernizr.testAllProps('boxSizing')
  ModernizrProto.testAllProps = testPropsAll;

  

  /**
   * prefixed returns the prefixed or nonprefixed property name variant of your input
   *
   * @memberof Modernizr
   * @name Modernizr.prefixed
   * @optionName Modernizr.prefixed()
   * @optionProp prefixed
   * @access public
   * @function prefixed
   * @param {string} prop - String name of the property to test for
   * @param {object} [obj] - An object to test for the prefixed properties on
   * @param {HTMLElement} [elem] - An element used to test specific properties against
   * @returns {string|false} The string representing the (possibly prefixed) valid
   * version of the property, or `false` when it is unsupported.
   * @example
   *
   * Modernizr.prefixed takes a string css value in the DOM style camelCase (as
   * opposed to the css style kebab-case) form and returns the (possibly prefixed)
   * version of that property that the browser actually supports.
   *
   * For example, in older Firefox...
   * ```js
   * prefixed('boxSizing')
   * ```
   * returns 'MozBoxSizing'
   *
   * In newer Firefox, as well as any other browser that support the unprefixed
   * version would simply return `boxSizing`. Any browser that does not support
   * the property at all, it will return `false`.
   *
   * By default, prefixed is checked against a DOM element. If you want to check
   * for a property on another object, just pass it as a second argument
   *
   * ```js
   * var rAF = prefixed('requestAnimationFrame', window);
   *
   * raf(function() {
   *  renderFunction();
   * })
   * ```
   *
   * Note that this will return _the actual function_ - not the name of the function.
   * If you need the actual name of the property, pass in `false` as a third argument
   *
   * ```js
   * var rAFProp = prefixed('requestAnimationFrame', window, false);
   *
   * rafProp === 'WebkitRequestAnimationFrame' // in older webkit
   * ```
   *
   * One common use case for prefixed is if you're trying to determine which transition
   * end event to bind to, you might do something like...
   * ```js
   * var transEndEventNames = {
   *     'WebkitTransition' : 'webkitTransitionEnd', * Saf 6, Android Browser
   *     'MozTransition'    : 'transitionend',       * only for FF < 15
   *     'transition'       : 'transitionend'        * IE10, Opera, Chrome, FF 15+, Saf 7+
   * };
   *
   * var transEndEventName = transEndEventNames[ Modernizr.prefixed('transition') ];
   * ```
   *
   * If you want a similar lookup, but in kebab-case, you can use [prefixedCSS](#modernizr-prefixedcss).
   */

  var prefixed = ModernizrProto.prefixed = function(prop, obj, elem) {
    if (prop.indexOf('@') === 0) {
      return atRule(prop);
    }

    if (prop.indexOf('-') != -1) {
      // Convert kebab-case to camelCase
      prop = cssToDOM(prop);
    }
    if (!obj) {
      return testPropsAll(prop, 'pfx');
    } else {
      // Testing DOM property e.g. Modernizr.prefixed('requestAnimationFrame', window) // 'mozRequestAnimationFrame'
      return testPropsAll(prop, obj, elem);
    }
  };

  
/*!
{
  "name": "Battery API",
  "property": "batteryapi",
  "aliases": ["battery-api"],
  "builderAliases": ["battery_api"],
  "tags": ["device", "media"],
  "authors": ["Paul Sayre"],
  "notes": [{
    "name": "MDN documentation",
    "href": "https://developer.mozilla.org/en/DOM/window.navigator.mozBattery"
  }]
}
!*/
/* DOC
Detect support for the Battery API, for accessing information about the system's battery charge level.
*/

  Modernizr.addTest('batteryapi', !!prefixed('battery', navigator), {aliases: ['battery-api']});

/*!
{
  "name": "Web Cryptography",
  "property": "cryptography",
  "caniuse": "cryptography",
  "tags": ["crypto"],
  "authors": ["roblarsen"],
  "notes": [{
    "name": "W3C Editor's Draft",
    "href": "https://www.w3.org/TR/WebCryptoAPI/"
  }],
  "polyfills": [
    "polycrypt"
  ]
}
!*/
/* DOC
Detects support for the cryptographic functionality available under window.crypto.subtle
*/

  var crypto = prefixed('crypto', window);
  Modernizr.addTest('crypto', !!prefixed('subtle', crypto));

/*!
{
  "name": "Force Touch Events",
  "property": "forcetouch",
  "authors": ["Kraig Walker"],
  "notes": [{
    "name": "Responding to Force Touch Events from JavaScript",
    "href": "https://developer.apple.com/library/prerelease/mac/documentation/AppleApplications/Conceptual/SafariJSProgTopics/Articles/RespondingtoForceTouchEventsfromJavaScript.html"
  }]
}
!*/
/* DOC
Tests whether the browser supports the detection of Force Touch Events.
Force Touch Events allow custom behaviours and interactions to take place based on the given pressure or change in pressure from a compatible trackpad.

Force Touch events are available in OS X 10.11 and later on devices equipped with Force Touch trackpads.
*/

  Modernizr.addTest('forcetouch', function() {
		// github.com/Modernizr/Modernizr/issues/1613
    // Test if the browser supports the force touch event progression (see notes link)
    if (!hasEvent(prefixed('mouseforcewillbegin', window, false), window)) {
          return false;
    }

    // Test if the browser provides thresholds defining a "force touch" from a normal touch/click event
    return MouseEvent.WEBKIT_FORCE_AT_MOUSE_DOWN && MouseEvent.WEBKIT_FORCE_AT_FORCE_MOUSE_DOWN;
  });

/*!
{
  "name": "Fullscreen API",
  "property": "fullscreen",
  "caniuse": "fullscreen",
  "notes": [{
    "name": "MDN documentation",
    "href": "https://developer.mozilla.org/en/API/Fullscreen"
  }],
  "polyfills": ["screenfulljs"],
  "builderAliases": ["fullscreen_api"]
}
!*/
/* DOC
Detects support for the ability to make the current website take over the user's entire screen
*/

  // github.com/Modernizr/Modernizr/issues/739
  Modernizr.addTest('fullscreen', !!(prefixed('exitFullscreen', document, false) || prefixed('cancelFullScreen', document, false)));

/*!
{
  "name": "GamePad API",
  "property": "gamepads",
  "authors": ["Eric Bidelman"],
  "tags": ["media"],
  "notes": [{
    "name": "W3C spec",
    "href": "https://www.w3.org/TR/gamepad/"
  },{
    "name": "HTML5 Rocks tutorial",
    "href": "http://www.html5rocks.com/en/tutorials/doodles/gamepad/#toc-featuredetect"
  }],
  "warnings": [],
  "polyfills": []
}
!*/
/* DOC
Detects support for the Gamepad API, for access to gamepads and controllers.
*/


  Modernizr.addTest('gamepads', !!prefixed('getGamepads', navigator));

/*!
{
  "name": "IndexedDB",
  "property": "indexeddb",
  "caniuse": "indexeddb",
  "tags": ["storage"],
  "polyfills": ["indexeddb"]
}
!*/
/* DOC
Detects support for the IndexedDB client-side storage API (final spec).
*/

  // Vendors had inconsistent prefixing with the experimental Indexed DB:
  // - Webkit's implementation is accessible through webkitIndexedDB
  // - Firefox shipped moz_indexedDB before FF4b9, but since then has been mozIndexedDB
  // For speed, we don't test the legacy (and beta-only) indexedDB

  var indexeddb;
  try {
    indexeddb = prefixed('indexedDB', window);
  } catch (e) {
  }

  Modernizr.addTest('indexeddb', !!indexeddb);

  if (!!indexeddb) {
    Modernizr.addTest('indexeddb.deletedatabase', 'deleteDatabase' in indexeddb);
  }
;
/*!
{
  "name": "IndexedDB Blob",
  "property": "indexeddbblob"
}
!*/
/* DOC
Detects if the browser can save File/Blob objects to IndexedDB
*/

  // Vendors had inconsistent prefixing with the experimental Indexed DB:
  // - Webkit's implementation is accessible through webkitIndexedDB
  // - Firefox shipped moz_indexedDB before FF4b9, but since then has been mozIndexedDB
  // For speed, we don't test the legacy (and beta-only) indexedDB

  Modernizr.addAsyncTest(function() {
    /* jshint -W053 */
    var indexeddb;
    var dbname = 'detect-blob-support';
    var supportsBlob = false;
    var request;
    var db;

    try {
      indexeddb = prefixed('indexedDB', window);
    } catch (e) {
    }

    if (!(Modernizr.indexeddb && Modernizr.indexeddb.deletedatabase)) {
      return false;
    }

    // Calling `deleteDatabase` in a try…catch because some contexts (e.g. data URIs)
    // will throw a `SecurityError`
    try {
      indexeddb.deleteDatabase(dbname).onsuccess = function() {
        request = indexeddb.open(dbname, 1);
        request.onupgradeneeded = function() {
          request.result.createObjectStore('store');
        };
        request.onsuccess = function() {
          db = request.result;
          try {
            db.transaction('store', 'readwrite').objectStore('store').put(new Blob(), 'key');
            supportsBlob = true;
          }
          catch (e) {
            supportsBlob = false;
          }
          finally {
            addTest('indexeddbblob', supportsBlob);
            db.close();
            indexeddb.deleteDatabase(dbname);
          }
        };
      };
    }
    catch (e) {
      addTest('indexeddbblob', false);
    }
  });

/*!
 {
 "name": "Internationalization API",
 "property": "intl",
 "notes": [{
 "name": "MDN documentation",
 "href": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl"
 },{
 "name": "ECMAScript spec",
 "href": "http://www.ecma-international.org/ecma-402/1.0/"
 }]
 }
 !*/
/* DOC
Detects support for the Internationalization API which allow easy formatting of number and dates and sorting string
based on a locale
*/

  Modernizr.addTest('intl', !!prefixed('Intl', window));

/*!
{
  "name": "Vibration API",
  "property": "vibrate",
  "notes": [{
    "name": "MDN documentation",
    "href": "https://developer.mozilla.org/en/DOM/window.navigator.mozVibrate"
  },{
    "name": "W3C spec",
    "href": "https://www.w3.org/TR/vibration/"
  }]
}
!*/
/* DOC
Detects support for the API that provides access to the vibration mechanism of the hosting device, to provide tactile feedback.
*/

  Modernizr.addTest('vibrate', !!prefixed('vibrate', navigator));

/*!
{
  "name": "Web Intents",
  "property": "webintents",
  "authors": ["Eric Bidelman"],
  "notes": [{
    "name": "Web Intents project site",
    "href": "http://webintents.org/"
  }],
  "polyfills": ["webintents"],
  "builderAliases": ["web_intents"]
}
!*/
/* DOC
Detects native support for the Web Intents APIs for service discovery and inter-application communication.

Chrome added support for this in v19, but [removed it again in v24](https://lists.w3.org/Archives/Public/public-web-intents/2012Nov/0000.html) because of "a number of areas for
development in both the API and specific user experience in Chrome". No other browsers currently support it, however a [JavaScript shim](http://webintents.org/#javascriptshim) is available.
*/

  Modernizr.addTest('webintents', !!prefixed('startActivity', navigator));

/*!
{
  "name": "CSS Background Blend Mode",
  "property": "backgroundblendmode",
  "caniuse": "css-backgroundblendmode",
  "tags": ["css"],
  "notes": [
    {
      "name": "CSS Blend Modes could be the next big thing in Web Design",
      "href": " https://medium.com/@bennettfeely/css-blend-modes-could-be-the-next-big-thing-in-web-design-6b51bf53743a"
    }, {
      "name": "Demo",
      "href": "http://bennettfeely.com/gradients/"
    }
  ]
}
!*/
/* DOC
Detects the ability for the browser to composite backgrounds using blending modes similar to ones found in Photoshop or Illustrator.
*/

  Modernizr.addTest('backgroundblendmode', prefixed('backgroundBlendMode', 'text'));

/*!
{
  "name": "Filesystem API",
  "property": "filesystem",
  "caniuse": "filesystem",
  "notes": [{
    "name": "W3 Draft",
    "href": "http://dev.w3.org/2009/dap/file-system/file-dir-sys.html"
  }],
  "authors": ["Eric Bidelman (@ebidel)"],
  "tags": ["file"],
  "builderAliases": ["file_filesystem"],
  "knownBugs": ["The API will be present in Chrome incognito, but will throw an exception. See crbug.com/93417"]
}
!*/

  Modernizr.addTest('filesystem', !!prefixed('requestFileSystem', window));

/*!
{
  "name": "form#requestAutocomplete()",
  "property": "requestautocomplete",
  "tags": ["form", "forms", "requestAutocomplete", "payments"],
  "notes": [{
    "name": "WHATWG proposed spec",
    "href": "https://wiki.whatwg.org/wiki/RequestAutocomplete"
  }]
}
!*/
/* DOC
When used with input[autocomplete] to annotate a form, form.requestAutocomplete() shows a dialog in Chrome that speeds up
checkout flows (payments specific for now).
*/

  Modernizr.addTest('requestautocomplete', !!prefixed('requestAutocomplete', createElement('form')));

/*!
{
  "authors": ["Cătălin Mariș"],
  "name": "Speech Recognition API",
  "notes": [
    {
      "name": "W3C Web Speech API Specification - The SpeechRecognition Interface",
      "href": "https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html#speechreco-section"
    },
    {
      "name": "Introduction to the Web Speech API",
      "href": "http://updates.html5rocks.com/2013/01/Voice-Driven-Web-Apps-Introduction-to-the-Web-Speech-API"
    }
  ],
  "property": "speechrecognition",
  "tags": ["input", "speech"]
}
!*/


  Modernizr.addTest('speechrecognition', !!prefixed('SpeechRecognition', window));

/*!
{
  "name": "Blob URLs",
  "property": "bloburls",
  "caniuse": "bloburls",
  "notes": [{
    "name": "W3C Working Draft",
    "href": "https://www.w3.org/TR/FileAPI/#creating-revoking"
  }],
  "tags": ["file", "url"],
  "authors": ["Ron Waldon (@jokeyrhyme)"]
}
!*/
/* DOC
Detects support for creating Blob URLs
*/

  var url = prefixed('URL', window, false);
  url = url && window[url];
  Modernizr.addTest('bloburls', url && 'revokeObjectURL' in url && 'createObjectURL' in url);

/*!
{
  "name": "getUserMedia",
  "property": "getusermedia",
  "caniuse": "stream",
  "tags": ["webrtc"],
  "authors": ["Eric Bidelman"],
  "notes": [{
    "name": "W3C Media Capture and Streams spec",
    "href": "https://www.w3.org/TR/mediacapture-streams/"
  }],
  "polyfills": ["getusermedia"]
}
!*/

  Modernizr.addTest('getusermedia', !!prefixed('getUserMedia', navigator));

/*!
{
  "name": "RTC Peer Connection",
  "property": "peerconnection",
  "tags": ["webrtc"],
  "authors": ["Ankur Oberoi"],
  "notes": [{
    "name": "W3C Web RTC spec",
    "href": "https://www.w3.org/TR/webrtc/"
  }]
}
!*/

  Modernizr.addTest('peerconnection', !!prefixed('RTCPeerConnection', window));

/*!
{
  "name": "RTC Data Channel",
  "property": "datachannel",
  "notes": [{
    "name": "HTML5 Rocks! Article",
    "href": "http://www.html5rocks.com/en/tutorials/webrtc/datachannels/"
  }]
}
!*/
/* DOC
Detect for the RTCDataChannel API that allows for transfer data directly from one peer to another
*/


  Modernizr.addTest('datachannel', function() {
    if (!Modernizr.peerconnection) {
      return false;
    }
    for (var i = 0, l = domPrefixes.length; i < l; i++) {
      var PeerConnectionConstructor = window[domPrefixes[i] + 'RTCPeerConnection'];

      if (PeerConnectionConstructor) {
        var peerConnection = new PeerConnectionConstructor({
          'iceServers': [{'url': 'stun:0'}]
        });

        return 'createDataChannel' in peerConnection;
      }

    }
    return false;
  });

/*!
{
  "name": "matchMedia",
  "property": "matchmedia",
  "caniuse" : "matchmedia",
  "tags": ["matchmedia"],
  "authors": ["Alberto Elias"],
  "notes": [{
    "name": "W3C CSSOM View Module",
    "href": "https://drafts.csswg.org/cssom-view/#the-mediaquerylist-interface"
  }, {
    "name": "MDN documentation",
    "href": "https://developer.mozilla.org/en-US/docs/Web/API/Window.matchMedia"
  }],
  "polyfills": ["matchmediajs"]
}
!*/
/* DOC

Detects support for matchMedia.

*/

  Modernizr.addTest('matchmedia', !!prefixed('matchMedia', window));


  /**
   * testAllProps determines whether a given CSS property is supported in the browser
   *
   * @memberof Modernizr
   * @name Modernizr.testAllProps
   * @optionName Modernizr.testAllProps()
   * @optionProp testAllProps
   * @access public
   * @function testAllProps
   * @param {string} prop - String naming the property to test (either camelCase or kebab-case)
   * @param {string} [value] - String of the value to test
   * @param {boolean} [skipValueTest=false] - Whether to skip testing that the value is supported when using non-native detection
   * @example
   *
   * testAllProps determines whether a given CSS property, in some prefixed form,
   * is supported by the browser.
   *
   * ```js
   * testAllProps('boxSizing')  // true
   * ```
   *
   * It can optionally be given a CSS value in string form to test if a property
   * value is valid
   *
   * ```js
   * testAllProps('display', 'block') // true
   * testAllProps('display', 'penguin') // false
   * ```
   *
   * A boolean can be passed as a third parameter to skip the value check when
   * native detection (@supports) isn't available.
   *
   * ```js
   * testAllProps('shapeOutside', 'content-box', true);
   * ```
   */

  function testAllProps(prop, value, skipValueTest) {
    return testPropsAll(prop, undefined, undefined, value, skipValueTest);
  }
  ModernizrProto.testAllProps = testAllProps;
  
/*!
{
  "name": "CSS Animations",
  "property": "cssanimations",
  "caniuse": "css-animation",
  "polyfills": ["transformie", "csssandpaper"],
  "tags": ["css"],
  "warnings": ["Android < 4 will pass this test, but can only animate a single property at a time"],
  "notes": [{
    "name" : "Article: 'Dispelling the Android CSS animation myths'",
    "href": "https://goo.gl/OGw5Gm"
  }]
}
!*/
/* DOC
Detects whether or not elements can be animated using CSS
*/

  Modernizr.addTest('cssanimations', testAllProps('animationName', 'a', true));

/*!
{
  "name": "Appearance",
  "property": "appearance",
  "caniuse": "css-appearance",
  "tags": ["css"],
  "notes": [{
    "name": "MDN documentation",
    "href": "https://developer.mozilla.org/en-US/docs/Web/CSS/-moz-appearance"
  },{
    "name": "CSS-Tricks CSS Almanac: appearance",
    "href": "https://css-tricks.com/almanac/properties/a/appearance/"
  }]
}
!*/
/* DOC
Detects support for the `appearance` css property, which is used to make an
element inherit the style of a standard user interface element. It can also be
used to remove the default styles of an element, such as input and buttons.
*/

  Modernizr.addTest('appearance', testAllProps('appearance'));

/*!
{
  "name": "CSS Background Clip Text",
  "property": "backgroundcliptext",
  "authors": ["ausi"],
  "tags": ["css"],
  "notes": [
    {
      "name": "CSS Tricks Article",
      "href": "https://css-tricks.com/image-under-text/"
    },
    {
      "name": "MDN Docs",
      "href": "https://developer.mozilla.org/en-US/docs/Web/CSS/background-clip"
    },
    {
      "name": "Related Github Issue",
      "href": "https://github.com/Modernizr/Modernizr/issues/199"
    }
  ]
}
!*/
/* DOC
Detects the ability to control specifies whether or not an element's background
extends beyond its border in CSS
*/

  Modernizr.addTest('backgroundcliptext', function() {
    return testAllProps('backgroundClip', 'text');
  });

/*!
{
  "name": "Background Position XY",
  "property": "bgpositionxy",
  "tags": ["css"],
  "builderAliases": ["css_backgroundposition_xy"],
  "authors": ["Allan Lei", "Brandom Aaron"],
  "notes": [{
    "name": "Demo",
    "href": "https://jsfiddle.net/allanlei/R8AYS/"
  }, {
    "name": "Adapted From",
    "href": "https://github.com/brandonaaron/jquery-cssHooks/blob/master/bgpos.js"
  }]
}
!*/
/* DOC
Detects the ability to control an element's background position using css
*/

  Modernizr.addTest('bgpositionxy', function() {
    return testAllProps('backgroundPositionX', '3px', true) && testAllProps('backgroundPositionY', '5px', true);
  });

/*!
{
  "name": "Background Repeat",
  "property": ["bgrepeatspace", "bgrepeatround"],
  "tags": ["css"],
  "builderAliases": ["css_backgroundrepeat"],
  "authors": ["Ryan Seddon"],
  "notes": [{
    "name": "MDN Docs",
    "href": "https://developer.mozilla.org/en-US/docs/Web/CSS/background-repeat"
  }, {
    "name": "Test Page",
    "href": "https://jsbin.com/uzesun/"
  }, {
    "name": "Demo",
    "href": "https://jsfiddle.net/ryanseddon/yMLTQ/6/"
  }]
}
!*/
/* DOC
Detects the ability to use round and space as properties for background-repeat
*/

  // Must value-test these
  Modernizr.addTest('bgrepeatround', testAllProps('backgroundRepeat', 'round'));
  Modernizr.addTest('bgrepeatspace', testAllProps('backgroundRepeat', 'space'));

/*!
{
  "name": "Background Size",
  "property": "backgroundsize",
  "tags": ["css"],
  "knownBugs": ["This will false positive in Opera Mini - https://github.com/Modernizr/Modernizr/issues/396"],
  "notes": [{
    "name": "Related Issue",
    "href": "https://github.com/Modernizr/Modernizr/issues/396"
  }]
}
!*/

  Modernizr.addTest('backgroundsize', testAllProps('backgroundSize', '100%', true));


  // Run each test
  testRunner();

  // Remove the "no-js" class if it exists
  setClasses(classes);

  delete ModernizrProto.addTest;
  delete ModernizrProto.addAsyncTest;

  // Run the things that are supposed to run after the tests
  for (var i = 0; i < Modernizr._q.length; i++) {
    Modernizr._q[i]();
  }

  // Leak Modernizr namespace
  window.Modernizr = Modernizr;


;

})(window, document);