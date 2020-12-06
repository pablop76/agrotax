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
})({"../node_modules/cookie-notice/dist/cookie.notice.min.js":[function(require,module,exports) {
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function (obj) { return typeof obj; }; } else { _typeof = function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*! cookie-notice v1.3.4 by Alessandro Benoit, Bernhard Behrendt 2020-11-24 */
!function () {
  "use strict";

  var l,
      d,
      p = {
    messageLocales: {
      it: "Utilizziamo i cookie per essere sicuri che tu possa avere la migliore esperienza sul nostro sito. Se continui ad utilizzare questo sito assumiamo che tu ne sia felice.",
      en: "We use cookies to ensure that you have the best experience on our website. If you continue to use this site we assume that you accept this.",
      fr: "Nous utilisons des cookies afin d'être sûr que vous pouvez avoir la meilleure expérience sur notre site. Si vous continuez à utiliser ce site, nous supposons que vous acceptez.",
      pt: "Utilizamos cookies para garantir que você tenha a melhor experiência em nosso site. Se você continuar a usar este site, assumimos que você aceita isso.",
      es: "Utilizamos cookies para asegurarnos de que usted tenga la mejor experiencia en nuestro sitio web. Si continúa usando este sitio, asumimos que lo acepta.",
      nl: "We gebruiken cookies om ervoor te zorgen dat u de beste ervaring heeft op onze website. Als u deze site blijft gebruiken, gaan we ervan uit dat u dit accepteert.",
      pl: "Używamy plików cookie w celu zapewnienia najlepszych doświadczeń na naszej stronie internetowej. Jeśli będziesz nadal korzystać z tej strony, zakładamy, że to akceptujesz.",
      de: "Wir verwenden Cookies, um sicherzustellen, dass Sie die beste Erfahrung auf unserer Website machen können. Wenn Sie diese Website weiterhin nutzen, gehen wir davon aus, dass Sie dies akzeptieren."
    },
    cookieNoticePosition: "bottom",
    learnMoreLinkEnabled: !1,
    learnMoreLinkHref: "/cookie-banner-information.html",
    learnMoreLinkText: {
      it: "Saperne di più",
      en: "Learn more",
      fr: "En savoir plus",
      pt: "Saber mais",
      es: "Aprende más.",
      nl: "Meer informatie",
      pl: "Dowiedz się więcej",
      de: "Mehr erfahren"
    },
    buttonLocales: {
      en: "OK"
    },
    expiresIn: 30,
    fontFamily: "inherit",
    fontSize: "12px",
    buttonBgColor: "#ca5000",
    buttonTextColor: "#fff",
    noticeBgColor: "#000",
    noticeTextColor: "#fff",
    linkColor: "#009fdd",
    linkBgColor: "#000",
    linkTarget: "_blank",
    debug: !1
  };

  function m(e) {
    var t = (navigator.userLanguage || navigator.language).substr(0, 2);
    return e[t] || e.en;
  }

  document.addEventListener("DOMContentLoaded", function () {
    l || new cookieNoticeJS();
  }), window.cookieNoticeJS = function () {
    if (void 0 === l && (l = this, -1 == document.cookie.indexOf("cookie_notice"))) {
      var t,
          o = document.querySelector("script[ data-cookie-notice ]");

      try {
        t = o ? JSON.parse(o.getAttribute("data-cookie-notice")) : {};
      } catch (e) {
        console.error("data-cookie-notice JSON error:", o, e), t = {};
      }

      var n = function e(t, o) {
        for (var i in o) {
          o.hasOwnProperty(i) && ("object" == _typeof(t[i]) ? t[i] = e(t[i], o[i]) : t[i] = o[i]);
        }

        return t;
      }(p, arguments[0] || t || {});

      n.debug && console.warn("cookie-notice:", n);

      var e,
          i,
          r,
          a,
          s = function (e, t, o, i, n, r) {
        var a = document.createElement("div"),
            s = a.style,
            c = "28px",
            u = parseInt(c, 10) + 20;
        n = void 0 !== n ? n : "12px", a.innerHTML = e + "&nbsp;", a.setAttribute("id", "cookieNotice"), a.setAttribute("data-test-section", "cookie-notice"), a.setAttribute("data-test-transitioning", "false"), s.position = "fixed", "top" === r ? (r = document.querySelector("body"), d = r.style.paddingTop, s.top = "0", r.style.paddingTop = u + "px") : s.bottom = "0";
        s.left = "0", s.right = "0", s.background = t, s.color = o, s["z-index"] = "999", s.padding = "10px 5px", s["text-align"] = "center", s["font-size"] = n, s["line-height"] = c, i && (s.fontFamily = i);
        return a;
      }(m(n.messageLocales), n.noticeBgColor, n.noticeTextColor, n.fontFamily, n.fontSize, n.cookieNoticePosition);

      n.learnMoreLinkEnabled && (c = m(n.learnMoreLinkText), e = c, i = n.learnMoreLinkHref, r = n.linkTarget, a = n.linkColor, n.linkBgColor, u = document.createElement("a"), c = u.style, u.href = i, u.textContent = e, u.title = e, u.target = r, u.className = "learn-more", u.setAttribute("data-test-action", "learn-more-link"), c.color = a, c.backgroundColor = "transparent", c["text-decoration"] = "underline", c.display = "inline", a = u);

      var c = function (e, t, o, i) {
        var n = document.createElement("span"),
            r = n.style;
        n.href = "#", n.innerHTML = e, n.setAttribute("role", "button"), n.className = "confirm", n.setAttribute("data-test-action", "dismiss-cookie-notice"), r.background = t, r.color = o, r["text-decoration"] = "none", r.cursor = "pointer", r.display = "inline-block", r.padding = "0 15px", r.margin = "0 0 0 10px", i && (r.fontFamily = i);
        return n;
      }(m(n.buttonLocales), n.buttonBgColor, n.buttonTextColor, n.fontFamily);

      c.addEventListener("click", function (e) {
        var t, o, i;
        e.preventDefault(), t = 60 * parseInt(n.expiresIn + "", 10) * 1e3 * 60 * 24, o = new Date(), (e = new Date()).setTime(o.getTime() + t), document.cookie = "cookie_notice=1; expires=" + e.toUTCString() + "; path=/;", (i = s).style.opacity = 1, i.setAttribute("data-test-transitioning", "true"), function e() {
          (i.style.opacity -= .1) < .01 ? (void 0 !== d && (document.querySelector("body").style.paddingTop = d), document.body.removeChild(i)) : setTimeout(e, 40);
        }();
      });
      var u = document.body.appendChild(s);
      a && u.appendChild(a), u.appendChild(c);
    }
  };
}();
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58267" + '/');

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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","../node_modules/cookie-notice/dist/cookie.notice.min.js"], null)
//# sourceMappingURL=/cookie.notice.min.2cf25af0.js.map