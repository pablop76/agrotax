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
})({"../node_modules/uikit/dist/js/uikit.min.js":[function(require,module,exports) {
var define;
/*! UIkit 3.5.10 | https://www.getuikit.com | (c) 2014 - 2020 YOOtheme | MIT License */

!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define("uikit",e):(t="undefined"!=typeof globalThis?globalThis:t||self).UIkit=e()}(this,function(){"use strict";var t=Object.prototype,n=t.hasOwnProperty;function h(t,e){return n.call(t,e)}var e={},i=/([a-z\d])([A-Z])/g;function d(t){return t in e||(e[t]=t.replace(i,"$1-$2").toLowerCase()),e[t]}var r=/-(\w)/g;function f(t){return t.replace(r,o)}function o(t,e){return e?e.toUpperCase():""}function p(t){return t.length?o(0,t.charAt(0))+t.slice(1):""}var s=String.prototype,a=s.startsWith||function(t){return 0===this.lastIndexOf(t,0)};function g(t,e){return a.call(t,e)}var c=s.endsWith||function(t){return this.substr(-t.length)===t};function u(t,e){return c.call(t,e)}var l=Array.prototype,m=function(t,e){return!!~this.indexOf(t,e)},v=s.includes||m,w=l.includes||m;function b(t,e){return t&&(D(t)?v:w).call(t,e)}var x=l.findIndex||function(t){for(var e=arguments,n=0;n<this.length;n++)if(t.call(e[1],this[n],n,this))return n;return-1};function y(t,e){return x.call(t,e)}var k=Array.isArray;function $(t){return"function"==typeof t}function I(t){return null!==t&&"object"==typeof t}var S=t.toString;function T(t){return"[object Object]"===S.call(t)}function E(t){return I(t)&&t===t.window}function _(t){return I(t)&&9===t.nodeType}function C(t){return I(t)&&!!t.jquery}function A(t){return I(t)&&1<=t.nodeType}function N(t){return I(t)&&1===t.nodeType}function M(t){return S.call(t).match(/^\[object (NodeList|HTMLCollection)\]$/)}function z(t){return"boolean"==typeof t}function D(t){return"string"==typeof t}function B(t){return"number"==typeof t}function P(t){return B(t)||D(t)&&!isNaN(t-parseFloat(t))}function O(t){return!(k(t)?t.length:I(t)&&Object.keys(t).length)}function H(t){return void 0===t}function L(t){return z(t)?t:"true"===t||"1"===t||""===t||"false"!==t&&"0"!==t&&t}function j(t){t=Number(t);return!isNaN(t)&&t}function F(t){return parseFloat(t)||0}function W(t){return A(t)?t:M(t)||C(t)?t[0]:k(t)?W(t[0]):null}function V(t){return A(t)?[t]:M(t)?l.slice.call(t):k(t)?t.map(W).filter(Boolean):C(t)?t.toArray():[]}function R(t){return E(t)?t:(t=W(t))?(_(t)?t:t.ownerDocument).defaultView:window}function q(t){return k(t)?t:D(t)?t.split(/,(?![^(]*\))/).map(function(t){return P(t)?j(t):L(t.trim())}):[t]}function U(t){return t?u(t,"ms")?F(t):1e3*F(t):0}function Y(t,n){return t===n||I(t)&&I(n)&&Object.keys(t).length===Object.keys(n).length&&K(t,function(t,e){return t===n[e]})}function X(t,e,n){return t.replace(new RegExp(e+"|"+n,"g"),function(t){return t===e?n:e})}var G=Object.assign||function(t){for(var e=[],n=arguments.length-1;0<n--;)e[n]=arguments[n+1];t=Object(t);for(var i=0;i<e.length;i++){var r=e[i];if(null!==r)for(var o in r)h(r,o)&&(t[o]=r[o])}return t};function J(t){return t[t.length-1]}function K(t,e){for(var n in t)if(!1===e(t[n],n))return!1;return!0}function Z(t,n){return t.sort(function(t,e){t=t[n];void 0===t&&(t=0);e=e[n];return void 0===e&&(e=0),e<t?1:t<e?-1:0})}function Q(t,e){var n=new Set;return t.filter(function(t){t=t[e];return!n.has(t)&&(n.add(t)||!0)})}function tt(t,e,n){return void 0===e&&(e=0),void 0===n&&(n=1),Math.min(Math.max(j(t)||0,e),n)}function et(){}function nt(t,e){return t.left<e.right&&t.right>e.left&&t.top<e.bottom&&t.bottom>e.top}function it(t,e){return t.x<=e.right&&t.x>=e.left&&t.y<=e.bottom&&t.y>=e.top}var rt={ratio:function(t,e,n){var i="width"===e?"height":"width",r={};return r[i]=t[e]?Math.round(n*t[i]/t[e]):t[i],r[e]=n,r},contain:function(n,i){var r=this;return K(n=G({},n),function(t,e){return n=n[e]>i[e]?r.ratio(n,e,i[e]):n}),n},cover:function(n,i){var r=this;return K(n=this.contain(n,i),function(t,e){return n=n[e]<i[e]?r.ratio(n,e,i[e]):n}),n}};function ot(t,e,n){if(I(e))for(var i in e)ot(t,i,e[i]);else{if(H(n))return(t=W(t))&&t.getAttribute(e);V(t).forEach(function(t){$(n)&&(n=n.call(t,ot(t,e))),null===n?at(t,e):t.setAttribute(e,n)})}}function st(t,e){return V(t).some(function(t){return t.hasAttribute(e)})}function at(t,e){t=V(t),e.split(" ").forEach(function(e){return t.forEach(function(t){return t.hasAttribute(e)&&t.removeAttribute(e)})})}function ct(t,e){for(var n=0,i=[e,"data-"+e];n<i.length;n++)if(st(t,i[n]))return ot(t,i[n])}var ut="undefined"!=typeof window,ht=ut&&/msie|trident/i.test(window.navigator.userAgent),lt=ut&&"rtl"===ot(document.documentElement,"dir"),dt=ut&&"ontouchstart"in window,ft=ut&&window.PointerEvent,pt=ut&&(dt||window.DocumentTouch&&document instanceof DocumentTouch||navigator.maxTouchPoints),mt=ft?"pointerdown":dt?"touchstart":"mousedown",gt=ft?"pointermove":dt?"touchmove":"mousemove",vt=ft?"pointerup":dt?"touchend":"mouseup",wt=ft?"pointerenter":dt?"":"mouseenter",bt=ft?"pointerleave":dt?"":"mouseleave",xt=ft?"pointercancel":"touchcancel";function yt(t,e){return W(t)||It(t,$t(t,e))}function kt(t,e){var n=V(t);return n.length&&n||St(t,$t(t,e))}function $t(t,e){return void 0===e&&(e=document),Ct(t)||_(e)?e:e.ownerDocument}function It(t,e){return W(Tt(t,e,"querySelector"))}function St(t,e){return V(Tt(t,e,"querySelectorAll"))}function Tt(t,o,e){if(void 0===o&&(o=document),!t||!D(t))return null;var s;Ct(t=t.replace(_t,"$1 *"))&&(s=[],t=t.match(At).map(function(t){return t.replace(/,$/,"").trim()}).map(function(t,e){var n,i,r=o;return"!"===t[0]&&(i=t.substr(1).trim().split(" "),r=Bt(Pt(o),i[0]),t=i.slice(1).join(" ").trim()),"-"===t[0]&&(n=t.substr(1).trim().split(" "),i=(r||o).previousElementSibling,r=zt(i,t.substr(1))?i:null,t=n.slice(1).join(" ")),r?(r.id||(r.id="uk-"+Date.now()+e,s.push(function(){return at(r,"id")})),"#"+Ht(r.id)+" "+t):null}).filter(Boolean).join(","),o=document);try{return o[e](t)}catch(t){return null}finally{s&&s.forEach(function(t){return t()})}}var Et=/(^|[^\\],)\s*[!>+~-]/,_t=/([!>+~-])(?=\s+[!>+~-]|\s*$)/g;function Ct(t){return D(t)&&t.match(Et)}var At=/.*?[^\\](?:,|$)/g;var Nt=ut?Element.prototype:{},Mt=Nt.matches||Nt.webkitMatchesSelector||Nt.msMatchesSelector||et;function zt(t,e){return V(t).some(function(t){return Mt.call(t,e)})}var Dt=Nt.closest||function(t){var e=this;do{if(zt(e,t))return e}while(e=Pt(e))};function Bt(t,e){return g(e,">")&&(e=e.slice(1)),N(t)?Dt.call(t,e):V(t).map(function(t){return Bt(t,e)}).filter(Boolean)}function Pt(t){return(t=W(t))&&N(t.parentNode)&&t.parentNode}var Ot=ut&&window.CSS&&CSS.escape||function(t){return t.replace(/([^\x7f-\uFFFF\w-])/g,function(t){return"\\"+t})};function Ht(t){return D(t)?Ot.call(null,t):""}var Lt={area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,menuitem:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0};function jt(t){return V(t).some(function(t){return Lt[t.tagName.toLowerCase()]})}function Ft(t){return V(t).some(function(t){return t.offsetWidth||t.offsetHeight||t.getClientRects().length})}var Wt="input,select,textarea,button";function Vt(t){return V(t).some(function(t){return zt(t,Wt)})}function Rt(t,e){return V(t).filter(function(t){return zt(t,e)})}function qt(t,e){return D(e)?zt(t,e)||!!Bt(t,e):t===e||(_(e)?e.documentElement:W(e)).contains(W(t))}function Ut(t,e){for(var n=[];t=Pt(t);)e&&!zt(t,e)||n.push(t);return n}function Yt(t,e){t=(t=W(t))?V(t.children):[];return e?Rt(t,e):t}function Xt(){for(var t=[],e=arguments.length;e--;)t[e]=arguments[e];var n,i,r=Qt(t),o=r[0],s=r[1],a=r[2],c=r[3],u=r[4],o=ie(o);return 1<c.length&&(n=c,c=function(t){return k(t.detail)?n.apply(void 0,[t].concat(t.detail)):n(t)}),u&&u.self&&(i=c,c=function(t){if(t.target===t.currentTarget||t.target===t.current)return i.call(null,t)}),a&&(c=function(t,i,r){var o=this;return function(n){t.forEach(function(t){var e=">"===i[0]?St(i,t).reverse().filter(function(t){return qt(n.target,t)})[0]:Bt(n.target,i);e&&(n.delegate=t,n.current=e,r.call(o,n))})}}(o,a,c)),u=te(u),s.split(" ").forEach(function(e){return o.forEach(function(t){return t.addEventListener(e,c,u)})}),function(){return Gt(o,s,c,u)}}function Gt(t,e,n,i){void 0===i&&(i=!1),i=te(i),t=ie(t),e.split(" ").forEach(function(e){return t.forEach(function(t){return t.removeEventListener(e,n,i)})})}function Jt(){for(var t=[],e=arguments.length;e--;)t[e]=arguments[e];var n=Qt(t),i=n[0],r=n[1],o=n[2],s=n[3],a=n[4],c=n[5],u=Xt(i,r,o,function(t){var e=!c||c(t);e&&(u(),s(t,e))},a);return u}function Kt(t,n,i){return ie(t).reduce(function(t,e){return t&&e.dispatchEvent(Zt(n,!0,!0,i))},!0)}function Zt(t,e,n,i){var r;return void 0===e&&(e=!0),void 0===n&&(n=!1),D(t)&&((r=document.createEvent("CustomEvent")).initCustomEvent(t,e,n,i),t=r),t}function Qt(t){return $(t[2])&&t.splice(2,0,!1),t}function te(t){return t&&ht&&!z(t)?!!t.capture:t}function ee(t){return t&&"addEventListener"in t}function ne(t){return ee(t)?t:W(t)}function ie(t){return k(t)?t.map(ne).filter(Boolean):D(t)?St(t):ee(t)?[t]:V(t)}function re(t){return"touch"===t.pointerType||!!t.touches}function oe(t){var e=t.touches,n=t.changedTouches,t=e&&e[0]||n&&n[0]||t;return{x:t.clientX,y:t.clientY}}function se(){var n=this;this.promise=new ae(function(t,e){n.reject=e,n.resolve=t})}var ae=ut&&window.Promise||he,ce=2,ue=ut&&window.setImmediate||setTimeout;function he(t){this.state=ce,this.value=void 0,this.deferred=[];var e=this;try{t(function(t){e.resolve(t)},function(t){e.reject(t)})}catch(t){e.reject(t)}}he.reject=function(n){return new he(function(t,e){e(n)})},he.resolve=function(n){return new he(function(t,e){t(n)})},he.all=function(o){return new he(function(n,t){var i=[],r=0;0===o.length&&n(i);for(var e=0;e<o.length;e+=1)he.resolve(o[e]).then(function(e){return function(t){i[e]=t,(r+=1)===o.length&&n(i)}}(e),t)})},he.race=function(i){return new he(function(t,e){for(var n=0;n<i.length;n+=1)he.resolve(i[n]).then(t,e)})};var le=he.prototype;function de(s,a){return new ae(function(t,e){var n=G({data:null,method:"GET",headers:{},xhr:new XMLHttpRequest,beforeSend:et,responseType:""},a);n.beforeSend(n);var i,r,o=n.xhr;for(i in n)if(i in o)try{o[i]=n[i]}catch(t){}for(r in o.open(n.method.toUpperCase(),s),n.headers)o.setRequestHeader(r,n.headers[r]);Xt(o,"load",function(){0===o.status||200<=o.status&&o.status<300||304===o.status?("json"===n.responseType&&D(o.response)&&(o=G(function(t){var e,n={};for(e in t)n[e]=t[e];return n}(o),{response:JSON.parse(o.response)})),t(o)):e(G(Error(o.statusText),{xhr:o,status:o.status}))}),Xt(o,"error",function(){return e(G(Error("Network Error"),{xhr:o}))}),Xt(o,"timeout",function(){return e(G(Error("Network Timeout"),{xhr:o}))}),o.send(n.data)})}function fe(i,r,o){return new ae(function(t,e){var n=new Image;n.onerror=function(t){return e(t)},n.onload=function(){return t(n)},o&&(n.sizes=o),r&&(n.srcset=r),n.src=i})}function pe(t){var e;"loading"===document.readyState?e=Xt(document,"DOMContentLoaded",function(){e(),t()}):t()}function me(t,e){return e?V(t).indexOf(W(e)):Yt(Pt(t)).indexOf(t)}function ge(t,e,n,i){void 0===n&&(n=0),void 0===i&&(i=!1);var r=(e=V(e)).length;return t=P(t)?j(t):"next"===t?n+1:"previous"===t?n-1:me(e,t),i?tt(t,0,r-1):(t%=r)<0?t+r:t}function ve(t){return(t=Ne(t)).innerHTML="",t}function we(t,e){return t=Ne(t),H(e)?t.innerHTML:be(t.hasChildNodes()?ve(t):t,e)}function be(e,t){return e=Ne(e),ke(t,function(t){return e.appendChild(t)})}function xe(e,t){return e=Ne(e),ke(t,function(t){return e.parentNode.insertBefore(t,e)})}function ye(e,t){return e=Ne(e),ke(t,function(t){return e.nextSibling?xe(e.nextSibling,t):be(e.parentNode,t)})}function ke(t,e){return(t=D(t)?Ce(t):t)?"length"in t?V(t).map(e):e(t):null}function $e(t){V(t).map(function(t){return t.parentNode&&t.parentNode.removeChild(t)})}function Ie(t,e){for(e=W(xe(t,e));e.firstChild;)e=e.firstChild;return be(e,t),e}function Se(t,e){return V(V(t).map(function(t){return t.hasChildNodes?Ie(V(t.childNodes),e):be(t,e)}))}function Te(t){V(t).map(Pt).filter(function(t,e,n){return n.indexOf(t)===e}).forEach(function(t){xe(t,t.childNodes),$e(t)})}le.resolve=function(t){var e=this;if(e.state===ce){if(t===e)throw new TypeError("Promise settled with itself.");var n=!1;try{var i=t&&t.then;if(null!==t&&I(t)&&$(i))return void i.call(t,function(t){n||e.resolve(t),n=!0},function(t){n||e.reject(t),n=!0})}catch(t){return void(n||e.reject(t))}e.state=0,e.value=t,e.notify()}},le.reject=function(t){var e=this;if(e.state===ce){if(t===e)throw new TypeError("Promise settled with itself.");e.state=1,e.value=t,e.notify()}},le.notify=function(){var o=this;ue(function(){if(o.state!==ce)for(;o.deferred.length;){var t=o.deferred.shift(),e=t[0],n=t[1],i=t[2],r=t[3];try{0===o.state?$(e)?i(e.call(void 0,o.value)):i(o.value):1===o.state&&($(n)?i(n.call(void 0,o.value)):r(o.value))}catch(t){r(t)}}})},le.then=function(n,i){var r=this;return new he(function(t,e){r.deferred.push([n,i,t,e]),r.notify()})},le.catch=function(t){return this.then(void 0,t)};var Ee=/^\s*<(\w+|!)[^>]*>/,_e=/^<(\w+)\s*\/?>(?:<\/\1>)?$/;function Ce(t){var e=_e.exec(t);if(e)return document.createElement(e[1]);e=document.createElement("div");return Ee.test(t)?e.insertAdjacentHTML("beforeend",t.trim()):e.textContent=t,1<e.childNodes.length?V(e.childNodes):e.firstChild}function Ae(t,e){if(N(t))for(e(t),t=t.firstElementChild;t;){var n=t.nextElementSibling;Ae(t,e),t=n}}function Ne(t,e){return D(t)?ze(t)?W(Ce(t)):It(t,e):W(t)}function Me(t,e){return D(t)?ze(t)?V(Ce(t)):St(t,e):V(t)}function ze(t){return"<"===t[0]||t.match(/^\s*</)}function De(t){for(var e=[],n=arguments.length-1;0<n--;)e[n]=arguments[n+1];je(t,e,"add")}function Be(t){for(var e=[],n=arguments.length-1;0<n--;)e[n]=arguments[n+1];je(t,e,"remove")}function Pe(t,e){ot(t,"class",function(t){return(t||"").replace(new RegExp("\\b"+e+"\\b","g"),"")})}function Oe(t){for(var e=[],n=arguments.length-1;0<n--;)e[n]=arguments[n+1];e[0]&&Be(t,e[0]),e[1]&&De(t,e[1])}function He(t,e){return e&&V(t).some(function(t){return t.classList.contains(e.split(" ")[0])})}function Le(t){for(var i,r=[],e=arguments.length-1;0<e--;)r[e]=arguments[e+1];r.length&&(i=D(J(r=Fe(r)))?[]:r.pop(),r=r.filter(Boolean),V(t).forEach(function(t){for(var e=t.classList,n=0;n<r.length;n++)We.Force?e.toggle.apply(e,[r[n]].concat(i)):e[(H(i)?!e.contains(r[n]):i)?"add":"remove"](r[n])}))}function je(t,n,i){(n=Fe(n).filter(Boolean)).length&&V(t).forEach(function(t){var e=t.classList;We.Multiple?e[i].apply(e,n):n.forEach(function(t){return e[i](t)})})}function Fe(t){return t.reduce(function(t,e){return t.concat.call(t,D(e)&&b(e," ")?e.trim().split(" "):e)},[])}var We={get Multiple(){return this.get("_multiple")},get Force(){return this.get("_force")},get:function(t){var e;return h(this,t)||((e=document.createElement("_").classList).add("a","b"),e.toggle("c",!1),this._multiple=e.contains("b"),this._force=!e.contains("c")),this[t]}},Ve={"animation-iteration-count":!0,"column-count":!0,"fill-opacity":!0,"flex-grow":!0,"flex-shrink":!0,"font-weight":!0,"line-height":!0,opacity:!0,order:!0,orphans:!0,"stroke-dasharray":!0,"stroke-dashoffset":!0,widows:!0,"z-index":!0,zoom:!0};function Re(t,e,r){return V(t).map(function(n){if(D(e)){if(e=Je(e),H(r))return Ue(n,e);r||B(r)?n.style[e]=P(r)&&!Ve[e]?r+"px":r:n.style.removeProperty(e)}else{if(k(e)){var i=qe(n);return e.reduce(function(t,e){return t[e]=i[Je(e)],t},{})}I(e)&&K(e,function(t,e){return Re(n,e,t)})}return n})[0]}function qe(t,e){return(t=W(t)).ownerDocument.defaultView.getComputedStyle(t,e)}function Ue(t,e,n){return qe(t,n)[e]}var Ye={};function Xe(t){var e,n=document.documentElement;return ht?(t in Ye||(De(e=be(n,document.createElement("div")),"uk-"+t),Ye[t]=Ue(e,"content",":before").replace(/^["'](.*)["']$/,"$1"),$e(e)),Ye[t]):qe(n).getPropertyValue("--uk-"+t)}var Ge={};function Je(t){return Ge[t]||(Ge[t]=function(t){t=d(t);var e=document.documentElement.style;if(t in e)return t;var n,i=Ke.length;for(;i--;)if((n="-"+Ke[i]+"-"+t)in e)return n}(t)||t)}var Ke=["webkit","moz","ms"];function Ze(t,s,a,c){return void 0===a&&(a=400),void 0===c&&(c="linear"),ae.all(V(t).map(function(o){return new ae(function(e,n){for(var t in s){var i=Re(o,t);""===i&&Re(o,t,i)}var r=setTimeout(function(){return Kt(o,"transitionend")},a);Jt(o,"transitionend transitioncanceled",function(t){t=t.type;clearTimeout(r),Be(o,"uk-transition"),Re(o,{transitionProperty:"",transitionDuration:"",transitionTimingFunction:""}),("transitioncanceled"===t?n:e)()},{self:!0}),De(o,"uk-transition"),Re(o,G({transitionProperty:Object.keys(s).map(Je).join(","),transitionDuration:a+"ms",transitionTimingFunction:c},s))})}))}var Qe={start:Ze,stop:function(t){return Kt(t,"transitionend"),ae.resolve()},cancel:function(t){Kt(t,"transitioncanceled")},inProgress:function(t){return He(t,"uk-transition")}},tn="uk-animation-";function en(t,o,s,a,c){return void 0===s&&(s=200),ae.all(V(t).map(function(r){return new ae(function(e,n){Kt(r,"animationcanceled");var i=setTimeout(function(){return Kt(r,"animationend")},s);Jt(r,"animationend animationcanceled",function(t){t=t.type;clearTimeout(i),("animationcanceled"===t?n:e)(),Re(r,"animationDuration",""),Pe(r,tn+"\\S*")},{self:!0}),Re(r,"animationDuration",s+"ms"),De(r,o,tn+(c?"leave":"enter")),g(o,tn)&&De(r,a&&"uk-transform-origin-"+a,c&&tn+"reverse")})}))}var nn=new RegExp(tn+"(enter|leave)"),rn={in:en,out:function(t,e,n,i){return en(t,e,n,i,!0)},inProgress:function(t){return nn.test(ot(t,"class"))},cancel:function(t){Kt(t,"animationcanceled")}},on={width:["x","left","right"],height:["y","top","bottom"]};function sn(t,e,h,l,d,n,i,r){h=gn(h),l=gn(l);var f={element:h,target:l};if(!t||!e)return f;var o,p=cn(t),m=cn(e),g=m;return mn(g,h,p,-1),mn(g,l,m,1),d=vn(d,p.width,p.height),n=vn(n,m.width,m.height),d.x+=n.x,d.y+=n.y,g.left+=d.x,g.top+=d.y,i&&(o=[cn(R(t))],r&&o.unshift(cn(r)),K(on,function(t,s){var a=t[0],c=t[1],u=t[2];!0!==i&&!b(i,a)||o.some(function(n){var t=h[a]===c?-p[s]:h[a]===u?p[s]:0,e=l[a]===c?m[s]:l[a]===u?-m[s]:0;if(g[c]<n[c]||g[c]+p[s]>n[u]){var i=p[s]/2,r="center"===l[a]?-m[s]/2:0;return"center"===h[a]&&(o(i,r)||o(-i,-r))||o(t,e)}function o(e,t){t=F((g[c]+e+t-2*d[a]).toFixed(4));if(t>=n[c]&&t+p[s]<=n[u])return g[c]=t,["element","target"].forEach(function(t){f[t][a]=e?f[t][a]===on[s][1]?on[s][2]:on[s][1]:f[t][a]}),!0}})})),an(t,g),f}function an(n,i){if(!i)return cn(n);var r=cn(n),o=Re(n,"position");["left","top"].forEach(function(t){var e;t in i&&(e=Re(n,t),Re(n,t,i[t]-r[t]+F("absolute"===o&&"auto"===e?un(n)[t]:e)))})}function cn(t){var e=R(t),n=e.pageYOffset,e=e.pageXOffset,t=E(t)?{height:ln(t),width:dn(t),top:0,left:0}:function(t){if(!t)return{};var e;Ft(t)||(e=ot(t,"style"),t.style.setProperty("display","block","important"));var n=t.getBoundingClientRect();return ot(t,"style",e),n}(W(t));return{height:t.height,width:t.width,top:t.top+n,left:t.left+e,bottom:t.top+t.height+n,right:t.left+t.width+e}}function un(t,e){e=e||(W(t)||{}).offsetParent||R(t).document.documentElement;var n=an(t),t=an(e);return{top:n.top-t.top-F(Re(e,"borderTopWidth")),left:n.left-t.left-F(Re(e,"borderLeftWidth"))}}function hn(t){var e=[0,0];t=W(t);do{if(e[0]+=t.offsetTop,e[1]+=t.offsetLeft,"fixed"===Re(t,"position")){var n=R(t);return e[0]+=n.pageYOffset,e[1]+=n.pageXOffset,e}}while(t=t.offsetParent);return e}var ln=fn("height"),dn=fn("width");function fn(i){var r=p(i);return function(t,e){if(H(e)){if(E(t))return t["inner"+r];if(_(t)){var n=t.documentElement;return Math.max(n["offset"+r],n["scroll"+r])}return(e="auto"===(e=Re(t=W(t),i))?t["offset"+r]:F(e)||0)-pn(t,i)}Re(t,i,e||0===e?+e+pn(t,i)+"px":"")}}function pn(n,t,e){return void 0===e&&(e="border-box"),Re(n,"boxSizing")===e?on[t].slice(1).map(p).reduce(function(t,e){return t+F(Re(n,"padding"+e))+F(Re(n,"border"+e+"Width"))},0):0}function mn(r,o,s,a){K(on,function(t,e){var n=t[0],i=t[1],t=t[2];o[n]===t?r[i]+=s[e]*a:"center"===o[n]&&(r[i]+=s[e]*a/2)})}function gn(t){var e=/left|center|right/,n=/top|center|bottom/;return 1===(t=(t||"").split(" ")).length&&(t=e.test(t[0])?t.concat("center"):n.test(t[0])?["center"].concat(t):["center","center"]),{x:e.test(t[0])?t[0]:"center",y:n.test(t[1])?t[1]:"center"}}function vn(t,e,n){var i=(t||"").split(" "),t=i[0],i=i[1];return{x:t?F(t)*(u(t,"%")?e/100:1):0,y:i?F(i)*(u(i,"%")?n/100:1):0}}function wn(t){switch(t){case"left":return"right";case"right":return"left";case"top":return"bottom";case"bottom":return"top";default:return t}}function bn(t,e,n){return void 0===e&&(e="width"),void 0===n&&(n=window),P(t)?+t:u(t,"vh")?xn(ln(R(n)),t):u(t,"vw")?xn(dn(R(n)),t):u(t,"%")?xn(cn(n)[e],t):F(t)}function xn(t,e){return t*F(e)/100}var yn={reads:[],writes:[],read:function(t){return this.reads.push(t),In(),t},write:function(t){return this.writes.push(t),In(),t},clear:function(t){return Tn(this.reads,t)||Tn(this.writes,t)},flush:kn};function kn(t){void 0===t&&(t=1),Sn(yn.reads),Sn(yn.writes.splice(0,yn.writes.length)),yn.scheduled=!1,(yn.reads.length||yn.writes.length)&&In(t+1)}var $n=4;function In(t){yn.scheduled||(yn.scheduled=!0,t&&t<$n?ae.resolve().then(function(){return kn(t)}):requestAnimationFrame(function(){return kn()}))}function Sn(t){for(var e;e=t.shift();)e()}function Tn(t,e){e=t.indexOf(e);return!!~e&&!!t.splice(e,1)}function En(){}En.prototype={positions:[],init:function(){var e,t=this;this.positions=[],this.unbind=Xt(document,"mousemove",function(t){return e=oe(t)}),this.interval=setInterval(function(){e&&(t.positions.push(e),5<t.positions.length&&t.positions.shift())},50)},cancel:function(){this.unbind&&this.unbind(),this.interval&&clearInterval(this.interval)},movesTo:function(t){if(this.positions.length<2)return!1;var e=t.getBoundingClientRect(),n=e.left,i=e.right,r=e.top,o=e.bottom,s=this.positions[0],t=J(this.positions),a=[s,t];return!it(t,e)&&[[{x:n,y:r},{x:i,y:o}],[{x:n,y:o},{x:i,y:r}]].some(function(t){t=function(t,e){var n=t[0],i=n.x,r=n.y,o=t[1],s=o.x,a=o.y,c=e[0],n=c.x,t=c.y,o=e[1],c=o.x,e=o.y,o=(e-t)*(s-i)-(c-n)*(a-r);if(0==o)return!1;o=((c-n)*(r-t)-(e-t)*(i-n))/o;if(o<0)return!1;return{x:i+o*(s-i),y:r+o*(a-r)}}(a,t);return t&&it(t,e)})}};var _n={};function Cn(t,e,n){return _n.computed($(t)?t.call(n,n):t,$(e)?e.call(n,n):e)}function An(t,e){return t=t&&!k(t)?[t]:t,e?t?t.concat(e):k(e)?e:[e]:t}function Nn(e,n,i){var t,r,o={};if($(n)&&(n=n.options),n.extends&&(e=Nn(e,n.extends,i)),n.mixins)for(var s=0,a=n.mixins.length;s<a;s++)e=Nn(e,n.mixins[s],i);for(t in e)c(t);for(r in n)h(e,r)||c(r);function c(t){o[t]=(_n[t]||function(t,e){return H(e)?t:e})(e[t],n[t],i)}return o}function Mn(t,e){var n;void 0===e&&(e=[]);try{return t?g(t,"{")?JSON.parse(t):e.length&&!b(t,":")?((n={})[e[0]]=t,n):t.split(";").reduce(function(t,e){var n=e.split(/:(.*)/),e=n[0],n=n[1];return e&&!H(n)&&(t[e.trim()]=n.trim()),t},{}):{}}catch(t){return{}}}function zn(t){if(On(t)&&jn(t,{func:"playVideo",method:"play"}),Pn(t))try{t.play().catch(et)}catch(t){}}function Dn(t){On(t)&&jn(t,{func:"pauseVideo",method:"pause"}),Pn(t)&&t.pause()}function Bn(t){On(t)&&jn(t,{func:"mute",method:"setVolume",value:0}),Pn(t)&&(t.muted=!0)}function Pn(t){return t&&"VIDEO"===t.tagName}function On(t){return t&&"IFRAME"===t.tagName&&(Hn(t)||Ln(t))}function Hn(t){return!!t.src.match(/\/\/.*?youtube(-nocookie)?\.[a-z]+\/(watch\?v=[^&\s]+|embed)|youtu\.be\/.*/)}function Ln(t){return!!t.src.match(/vimeo\.com\/video\/.*/)}function jn(t,e){(function(e){if(e[Wn])return e[Wn];var n,i=Hn(e),r=Ln(e),o=++Vn;return e[Wn]=new ae(function(t){i&&Jt(e,"load",function(){function t(){return Fn(e,{event:"listening",id:o})}n=setInterval(t,100),t()}),Jt(window,"message",t,!1,function(t){var e=t.data;try{return(e=JSON.parse(e))&&(i&&e.id===o&&"onReady"===e.event||r&&Number(e.player_id)===o)}catch(t){}}),e.src=e.src+(b(e.src,"?")?"&":"?")+(i?"enablejsapi=1":"api=1&player_id="+o)}).then(function(){return clearInterval(n)})})(t).then(function(){return Fn(t,e)})}function Fn(t,e){try{t.contentWindow.postMessage(JSON.stringify(G({event:"command"},e)),"*")}catch(t){}}_n.events=_n.created=_n.beforeConnect=_n.connected=_n.beforeDisconnect=_n.disconnected=_n.destroy=An,_n.args=function(t,e){return!1!==e&&An(e||t)},_n.update=function(t,e){return Z(An(t,$(e)?{read:e}:e),"order")},_n.props=function(t,e){return k(e)&&(e=e.reduce(function(t,e){return t[e]=String,t},{})),_n.methods(t,e)},_n.computed=_n.methods=function(t,e){return e?t?G({},t,e):e:t},_n.data=function(e,n,t){return t?Cn(e,n,t):n?e?function(t){return Cn(e,n,t)}:n:e};var Wn="_ukPlayer",Vn=0;function Rn(o,s,a){if(void 0===s&&(s=0),void 0===a&&(a=0),!Ft(o))return!1;var c=Jn(o);return c.every(function(t,e){var n=an(c[e+1]||o),i=an(Gn(t)),r=i.top,e=i.left,t=i.bottom,i=i.right;return nt(n,{top:r-s,left:e-a,bottom:t+s,right:i+a})})}function qn(t,e){(t=(E(t)||_(t)?Kn:W)(t)).scrollTop=e}function Un(s,t){void 0===t&&(t={});var a=t.offset;if(void 0===a&&(a=0),Ft(s)){var c=Jn(s).reverse(),u=0;return c.reduce(function(t,e,n){var i=e.scrollTop,r=e.scrollHeight-e.clientHeight,o=Math.ceil(un(c[n-1]||s,Gn(e)).top-a)+u+i;return r<o?(u=o-r,o=r):u=0,function(){return s=e,a=o-i,new ae(function(n){var t,i=s.scrollTop,r=(t=Math.abs(a),40*Math.pow(t,.375)),o=Date.now();!function t(){var e,e=(e=tt((Date.now()-o)/r),.5*(1-Math.cos(Math.PI*e)));qn(s,i+a*e),1!=e?requestAnimationFrame(t):n()}()}).then(t);var s,a}},function(){return ae.resolve()})()}}function Yn(t,e){if(void 0===e&&(e=0),!Ft(t))return 0;var n=J(Xn(t)),i=n.scrollHeight,r=n.scrollTop,o=an(Gn(n)).height,s=hn(t)[0]-r-hn(n)[0],n=Math.min(o,s+r);return tt(-1*(s-n)/Math.min(an(t).height+e+n,i-(s+r),i-o))}function Xn(t,e){void 0===e&&(e=/auto|scroll/);var n=Kn(t),t=Ut(t).filter(function(t){return t===n||e.test(Re(t,"overflow"))&&t.scrollHeight>Math.round(an(t).height)}).reverse();return t.length?t:[n]}function Gn(t){return t===Kn(t)?window:t}function Jn(t){return Xn(t,/auto|scroll|hidden/)}function Kn(t){t=R(t).document;return t.scrollingElement||t.documentElement}var Zn=ut&&window.IntersectionObserver||function(){function t(e,t){var n=this;void 0===t&&(t={});var i=t.rootMargin;void 0===i&&(i="0 0"),this.targets=[];var r,t=(i||"0 0").split(" ").map(F),i=t[0],t=t[1];this.offsetTop=i,this.offsetLeft=t,this.apply=function(){r=r||requestAnimationFrame(function(){return setTimeout(function(){var t=n.takeRecords();t.length&&e(t,n),r=!1})})},this.off=Xt(window,"scroll resize load",this.apply,{passive:!0,capture:!0})}return t.prototype.takeRecords=function(){var n=this;return this.targets.filter(function(t){var e=Rn(t.target,n.offsetTop,n.offsetLeft);if(null===t.isIntersecting||e^t.isIntersecting)return t.isIntersecting=e,!0})},t.prototype.observe=function(t){this.targets.push({target:t,isIntersecting:null}),this.apply()},t.prototype.disconnect=function(){this.targets=[],this.off()},t}();function Qn(t){return!(!g(t,"uk-")&&!g(t,"data-uk-"))&&f(t.replace("data-uk-","").replace("uk-",""))}function ti(t){this._init(t)}var ei,ni,ii,ri,oi,si,ai,ci,ui;function hi(t,e){if(t)for(var n in t)t[n]._connected&&t[n]._callUpdate(e)}function li(t,e){var n={},i=t.args;void 0===i&&(i=[]);var r=t.props;void 0===r&&(r={});var o,s=t.el;if(!r)return n;for(o in r){var a=d(o),c=ct(s,a);H(c)||(c=r[o]===Boolean&&""===c||fi(r[o],c),("target"!==a||c&&!g(c,"_"))&&(n[o]=c))}var u,h=Mn(ct(s,e),i);for(u in h){var l=f(u);void 0!==r[l]&&(n[l]=fi(r[l],h[u]))}return n}function di(e,n,i){T(n)||(n={name:i,handler:n});var t=n.name,r=n.el,o=n.handler,s=n.capture,a=n.passive,c=n.delegate,u=n.filter,h=n.self,r=$(r)?r.call(e):r||e.$el;k(r)?r.forEach(function(t){return di(e,G({},n,{el:t}),i)}):!r||u&&!u.call(e)||e._events.push(Xt(r,t,c?D(c)?c:c.call(e):null,D(o)?e[o]:o.bind(e),{passive:a,capture:s,self:h}))}function fi(t,e){return t===Boolean?L(e):t===Number?j(e):"list"===t?q(e):t?t(e):e}ti.util=Object.freeze({__proto__:null,ajax:de,getImage:fe,transition:Ze,Transition:Qe,animate:en,Animation:rn,attr:ot,hasAttr:st,removeAttr:at,data:ct,addClass:De,removeClass:Be,removeClasses:Pe,replaceClass:Oe,hasClass:He,toggleClass:Le,positionAt:sn,offset:an,position:un,offsetPosition:hn,height:ln,width:dn,boxModelAdjust:pn,flipPosition:wn,toPx:bn,ready:pe,index:me,getIndex:ge,empty:ve,html:we,prepend:function(e,t){return(e=Ne(e)).hasChildNodes()?ke(t,function(t){return e.insertBefore(t,e.firstChild)}):be(e,t)},append:be,before:xe,after:ye,remove:$e,wrapAll:Ie,wrapInner:Se,unwrap:Te,fragment:Ce,apply:Ae,$:Ne,$$:Me,inBrowser:ut,isIE:ht,isRtl:lt,hasTouch:pt,pointerDown:mt,pointerMove:gt,pointerUp:vt,pointerEnter:wt,pointerLeave:bt,pointerCancel:xt,on:Xt,off:Gt,once:Jt,trigger:Kt,createEvent:Zt,toEventTargets:ie,isTouch:re,getEventPos:oe,fastdom:yn,isVoidElement:jt,isVisible:Ft,selInput:Wt,isInput:Vt,filter:Rt,within:qt,parents:Ut,children:Yt,hasOwn:h,hyphenate:d,camelize:f,ucfirst:p,startsWith:g,endsWith:u,includes:b,findIndex:y,isArray:k,isFunction:$,isObject:I,isPlainObject:T,isWindow:E,isDocument:_,isJQuery:C,isNode:A,isElement:N,isNodeCollection:M,isBoolean:z,isString:D,isNumber:B,isNumeric:P,isEmpty:O,isUndefined:H,toBoolean:L,toNumber:j,toFloat:F,toNode:W,toNodes:V,toWindow:R,toList:q,toMs:U,isEqual:Y,swap:X,assign:G,last:J,each:K,sortBy:Z,uniqueBy:Q,clamp:tt,noop:et,intersectRect:nt,pointInRect:it,Dimensions:rt,MouseTracker:En,mergeOptions:Nn,parseOptions:Mn,play:zn,pause:Dn,mute:Bn,Promise:ae,Deferred:se,IntersectionObserver:Zn,query:yt,queryAll:kt,find:It,findAll:St,matches:zt,closest:Bt,parent:Pt,escape:Ht,css:Re,getStyles:qe,getStyle:Ue,getCssVar:Xe,propName:Je,isInView:Rn,scrollTop:qn,scrollIntoView:Un,scrolledOver:Yn,scrollParents:Xn,getViewport:Gn}),ti.data="__uikit__",ti.prefix="uk-",ti.options={},ti.version="3.5.10",ii=(ei=ti).data,ei.use=function(t){if(!t.installed)return t.call(null,this),t.installed=!0,this},ei.mixin=function(t,e){(e=(D(e)?ei.component(e):e)||this).options=Nn(e.options,t)},ei.extend=function(t){t=t||{};function e(t){this._init(t)}return((e.prototype=Object.create(this.prototype)).constructor=e).options=Nn(this.options,t),e.super=this,e.extend=this.extend,e},ei.update=function(t,e){Ut(t=t?W(t):document.body).reverse().forEach(function(t){return hi(t[ii],e)}),Ae(t,function(t){return hi(t[ii],e)})},Object.defineProperty(ei,"container",{get:function(){return ni||document.body},set:function(t){ni=Ne(t)}}),(ri=ti).prototype._callHook=function(t){var e=this,t=this.$options[t];t&&t.forEach(function(t){return t.call(e)})},ri.prototype._callConnected=function(){this._connected||(this._data={},this._computeds={},this._frames={reads:{},writes:{}},this._initProps(),this._callHook("beforeConnect"),this._connected=!0,this._initEvents(),this._initObserver(),this._callHook("connected"),this._callUpdate())},ri.prototype._callDisconnected=function(){this._connected&&(this._callHook("beforeDisconnect"),this._observer&&(this._observer.disconnect(),this._observer=null),this._unbindEvents(),this._callHook("disconnected"),this._connected=!1)},ri.prototype._callUpdate=function(t){var r=this;void 0===t&&(t="update");var o=t.type||t;b(["update","resize"],o)&&this._callWatches();var e=this.$options.update,t=this._frames,s=t.reads,a=t.writes;e&&e.forEach(function(t,e){var n=t.read,i=t.write,t=t.events;"update"!==o&&!b(t,o)||(n&&!b(yn.reads,s[e])&&(s[e]=yn.read(function(){var t=r._connected&&n.call(r,r._data,o);!1===t&&i?yn.clear(a[e]):T(t)&&G(r._data,t)})),i&&!b(yn.writes,a[e])&&(a[e]=yn.write(function(){return r._connected&&i.call(r,r._data,o)})))})},ri.prototype._callWatches=function(){var a,c=this,u=this._frames;u._watch||(a=!h(u,"_watch"),u._watch=yn.read(function(){if(c._connected){var t,e=c.$options.computed,n=c._computeds;for(t in e){var i=h(n,t),r=n[t];delete n[t];var o=e[t],s=o.watch,o=o.immediate;s&&(a&&o||i&&!Y(r,c[t]))&&s.call(c,c[t],r)}u._watch=null}}))},si=0,(oi=ti).prototype._init=function(t){(t=t||{}).data=function(t,e){var n=t.data,i=(t.el,e.args),r=e.props;void 0===r&&(r={});if(n=k(n)?O(i)?void 0:n.slice(0,i.length).reduce(function(t,e,n){return T(e)?G(t,e):t[i[n]]=e,t},{}):n)for(var o in n)H(n[o])?delete n[o]:n[o]=r[o]?fi(r[o],n[o]):n[o];return n}(t,this.constructor.options),this.$options=Nn(this.constructor.options,t,this),this.$el=null,this.$props={},this._uid=si++,this._initData(),this._initMethods(),this._initComputeds(),this._callHook("created"),t.el&&this.$mount(t.el)},oi.prototype._initData=function(){var t,e=this.$options.data;for(t in void 0===e&&(e={}),e)this.$props[t]=this[t]=e[t]},oi.prototype._initMethods=function(){var t=this.$options.methods;if(t)for(var e in t)this[e]=t[e].bind(this)},oi.prototype._initComputeds=function(){var t=this.$options.computed;if(this._computeds={},t)for(var e in t)!function(i,r,o){Object.defineProperty(i,r,{enumerable:!0,get:function(){var t=i._computeds,e=i.$props,n=i.$el;return h(t,r)||(t[r]=(o.get||o).call(i,e,n)),t[r]},set:function(t){var e=i._computeds;e[r]=o.set?o.set.call(i,t):t,H(e[r])&&delete e[r]}})}(this,e,t[e])},oi.prototype._initProps=function(t){for(var e in t=t||li(this.$options,this.$name))H(t[e])||(this.$props[e]=t[e]);var n=[this.$options.computed,this.$options.methods];for(e in this.$props)e in t&&function(t,e){return t.every(function(t){return!t||!h(t,e)})}(n,e)&&(this[e]=this.$props[e])},oi.prototype._initEvents=function(){var n=this;this._events=[];var t=this.$options.events;t&&t.forEach(function(t){if(h(t,"handler"))di(n,t);else for(var e in t)di(n,t[e],e)})},oi.prototype._unbindEvents=function(){this._events.forEach(function(t){return t()}),delete this._events},oi.prototype._initObserver=function(){var i=this,t=this.$options,r=t.attrs,e=t.props,t=t.el;!this._observer&&e&&!1!==r&&(r=k(r)?r:Object.keys(e),this._observer=new MutationObserver(function(t){var n=li(i.$options,i.$name);t.some(function(t){var e=t.attributeName,t=e.replace("data-","");return(t===i.$name?r:[f(t),f(e)]).some(function(t){return!H(n[t])&&n[t]!==i.$props[t]})})&&i.$reset()}),e=r.map(d).concat(this.$name),this._observer.observe(t,{attributes:!0,attributeFilter:e.concat(e.map(function(t){return"data-"+t}))}))},ci=(ai=ti).data,ui={},ai.component=function(s,t){var e=d(s);if(s=f(e),!t)return T(ui[s])&&(ui[s]=ai.extend(ui[s])),ui[s];ai[s]=function(t,n){for(var e=arguments.length,i=Array(e);e--;)i[e]=arguments[e];var r=ai.component(s);return r.options.functional?new r({data:T(t)?t:[].concat(i)}):t?Me(t).map(o)[0]:o(t);function o(t){var e=ai.getComponent(t,s);if(e){if(!n)return e;e.$destroy()}return new r({el:t,data:n})}};var n=T(t)?G({},t):t.options;return n.name=s,n.install&&n.install(ai,n,s),ai._initialized&&!n.functional&&yn.read(function(){return ai[s]("[uk-"+e+"],[data-uk-"+e+"]")}),ui[s]=T(t)?n:t},ai.getComponents=function(t){return t&&t[ci]||{}},ai.getComponent=function(t,e){return ai.getComponents(t)[e]},ai.connect=function(t){if(t[ci])for(var e in t[ci])t[ci][e]._callConnected();for(var n=0;n<t.attributes.length;n++){var i=Qn(t.attributes[n].name);i&&i in ui&&ai[i](t)}},ai.disconnect=function(t){for(var e in t[ci])t[ci][e]._callDisconnected()},function(i){var r=i.data;i.prototype.$create=function(t,e,n){return i[t](e,n)},i.prototype.$mount=function(t){var e=this.$options.name;t[r]||(t[r]={}),t[r][e]||((t[r][e]=this).$el=this.$options.el=this.$options.el||t,qt(t,document)&&this._callConnected())},i.prototype.$reset=function(){this._callDisconnected(),this._callConnected()},i.prototype.$destroy=function(t){void 0===t&&(t=!1);var e=this.$options,n=e.el,e=e.name;n&&this._callDisconnected(),this._callHook("destroy"),n&&n[r]&&(delete n[r][e],O(n[r])||delete n[r],t&&$e(this.$el))},i.prototype.$emit=function(t){this._callUpdate(t)},i.prototype.$update=function(t,e){void 0===t&&(t=this.$el),i.update(t,e)},i.prototype.$getComponent=i.getComponent;var e={};Object.defineProperties(i.prototype,{$container:Object.getOwnPropertyDescriptor(i,"container"),$name:{get:function(){var t=this.$options.name;return e[t]||(e[t]=i.prefix+d(t)),e[t]}}})}(ti);var pi={connected:function(){He(this.$el,this.$name)||De(this.$el,this.$name)}},mi={props:{cls:Boolean,animation:"list",duration:Number,origin:String,transition:String},data:{cls:!1,animation:[!1],duration:200,origin:!1,transition:"linear",initProps:{overflow:"",height:"",paddingTop:"",paddingBottom:"",marginTop:"",marginBottom:""},hideProps:{overflow:"hidden",height:0,paddingTop:0,paddingBottom:0,marginTop:0,marginBottom:0}},computed:{hasAnimation:function(t){return!!t.animation[0]},hasTransition:function(t){t=t.animation;return this.hasAnimation&&!0===t[0]}},methods:{toggleElement:function(t,n,i){var r=this;return ae.all(V(t).map(function(e){return new ae(function(t){return r._toggleElement(e,n,i).then(t,et)})}))},isToggled:function(t){t=V(t||this.$el);return this.cls?He(t,this.cls.split(" ")[0]):!st(t,"hidden")},updateAria:function(t){!1===this.cls&&ot(t,"aria-hidden",!this.isToggled(t))},_toggleElement:function(t,e,n){var i=this;if(e=z(e)?e:rn.inProgress(t)?He(t,"uk-animation-leave"):Qe.inProgress(t)?"0px"===t.style.height:!this.isToggled(t),!Kt(t,"before"+(e?"show":"hide"),[this]))return ae.reject();var o,n=($(n)?n:!1!==n&&this.hasAnimation?this.hasTransition?gi(this):(o=this,function(t,e){rn.cancel(t);var n=o.animation,i=o.duration,r=o._toggle;return e?(r(t,!0),rn.in(t,n[0],i,o.origin)):rn.out(t,n[1]||n[0],i,o.origin).then(function(){return r(t,!1)})}):this._toggle)(t,e);Kt(t,e?"show":"hide",[this]);return(n||ae.resolve()).then(function(){Kt(t,e?"shown":"hidden",[i]),i.$update(t)})},_toggle:function(t,e){var n;t&&(e=Boolean(e),this.cls?(n=b(this.cls," ")||e!==He(t,this.cls))&&Le(t,this.cls,b(this.cls," ")?void 0:e):(n=e===t.hidden)&&(t.hidden=!e),Me("[autofocus]",t).some(function(t){return Ft(t)?t.focus()||!0:t.blur()}),this.updateAria(t),n&&(Kt(t,"toggled",[this]),this.$update(t)))}}};function gi(t){var o=t.isToggled,s=t.duration,a=t.initProps,c=t.hideProps,u=t.transition,h=t._toggle;return function(t,e){var n=Qe.inProgress(t),i=t.hasChildNodes?F(Re(t.firstElementChild,"marginTop"))+F(Re(t.lastElementChild,"marginBottom")):0,r=Ft(t)?ln(t)+(n?0:i):0;Qe.cancel(t),o(t)||h(t,!0),ln(t,""),yn.flush();i=ln(t)+(n?0:i);return ln(t,r),(e?Qe.start(t,G({},a,{overflow:"hidden",height:i}),Math.round(s*(1-r/i)),u):Qe.start(t,c,Math.round(s*(r/i)),u).then(function(){return h(t,!1)})).then(function(){return Re(t,a)})}}var vi={mixins:[pi,mi],props:{targets:String,active:null,collapsible:Boolean,multiple:Boolean,toggle:String,content:String,transition:String,offset:Number},data:{targets:"> *",active:!1,animation:[!0],collapsible:!0,multiple:!1,clsOpen:"uk-open",toggle:"> .uk-accordion-title",content:"> .uk-accordion-content",transition:"ease",offset:0},computed:{items:{get:function(t,e){return Me(t.targets,e)},watch:function(t,e){var n=this;t.forEach(function(t){return wi(Ne(n.content,t),!He(t,n.clsOpen))}),e||He(t,this.clsOpen)||(t=!1!==this.active&&t[Number(this.active)]||!this.collapsible&&t[0])&&this.toggle(t,!1)},immediate:!0}},events:[{name:"click",delegate:function(){return this.targets+" "+this.$props.toggle},handler:function(t){t.preventDefault(),this.toggle(me(Me(this.targets+" "+this.$props.toggle,this.$el),t.current))}}],methods:{toggle:function(t,r){var o=this,e=[this.items[ge(t,this.items)]],t=Rt(this.items,"."+this.clsOpen);this.multiple||b(t,e[0])||(e=e.concat(t)),!this.collapsible&&t.length<2&&!Rt(e,":not(."+this.clsOpen+")").length||e.forEach(function(t){return o.toggleElement(t,!He(t,o.clsOpen),function(e,n){Le(e,o.clsOpen,n);var i=Ne((e._wrapper?"> * ":"")+o.content,e);if(!1!==r&&o.hasTransition)return e._wrapper||(e._wrapper=Ie(i,"<div"+(n?" hidden":"")+">")),wi(i,!1),gi(o)(e._wrapper,n).then(function(){var t;wi(i,!n),delete e._wrapper,Te(i),n&&(Rn(t=Ne(o.$props.toggle,e))||Un(t,{offset:o.offset}))});wi(i,!n)})})}}};function wi(t,e){t&&(t.hidden=e)}var bi={mixins:[pi,mi],args:"animation",props:{close:String},data:{animation:[!0],selClose:".uk-alert-close",duration:150,hideProps:G({opacity:0},mi.data.hideProps)},events:[{name:"click",delegate:function(){return this.selClose},handler:function(t){t.preventDefault(),this.close()}}],methods:{close:function(){var t=this;this.toggleElement(this.$el).then(function(){return t.$destroy(!0)})}}},xi={args:"autoplay",props:{automute:Boolean,autoplay:Boolean},data:{automute:!1,autoplay:!0},computed:{inView:function(t){return"inview"===t.autoplay}},connected:function(){this.inView&&!st(this.$el,"preload")&&(this.$el.preload="none"),this.automute&&Bn(this.$el)},update:{read:function(){return{visible:Ft(this.$el)&&"hidden"!==Re(this.$el,"visibility"),inView:this.inView&&Rn(this.$el)}},write:function(t){var e=t.visible,t=t.inView;!e||this.inView&&!t?Dn(this.$el):(!0===this.autoplay||this.inView&&t)&&zn(this.$el)},events:["resize","scroll"]}},yi={mixins:[pi,xi],props:{width:Number,height:Number},data:{automute:!0},update:{read:function(){var t=this.$el,e=function(t){for(;t=Pt(t);)if("static"!==Re(t,"position"))return t}(t)||t.parentNode,n=e.offsetHeight,e=e.offsetWidth,n=rt.cover({width:this.width||t.naturalWidth||t.videoWidth||t.clientWidth,height:this.height||t.naturalHeight||t.videoHeight||t.clientHeight},{width:e+(e%2?1:0),height:n+(n%2?1:0)});return!(!n.width||!n.height)&&n},write:function(t){var e=t.height,t=t.width;Re(this.$el,{height:e,width:t})},events:["resize"]}};var ki,$i={props:{pos:String,offset:null,flip:Boolean,clsPos:String},data:{pos:"bottom-"+(lt?"right":"left"),flip:!0,offset:!1,clsPos:""},computed:{pos:function(t){t=t.pos;return(t+(b(t,"-")?"":"-center")).split("-")},dir:function(){return this.pos[0]},align:function(){return this.pos[1]}},methods:{positionAt:function(t,e,n){var i;Pe(t,this.clsPos+"-(top|bottom|left|right)(-[a-z]+)?");var r=this.offset,o=this.getAxis();P(r)||(r=(i=Ne(r))?an(i)["x"===o?"left":"top"]-an(e)["x"===o?"right":"bottom"]:0);r=sn(t,e,"x"===o?wn(this.dir)+" "+this.align:this.align+" "+wn(this.dir),"x"===o?this.dir+" "+this.align:this.align+" "+this.dir,"x"===o?""+("left"===this.dir?-r:r):" "+("top"===this.dir?-r:r),null,this.flip,n).target,n=r.x,r=r.y;this.dir="x"===o?n:r,this.align="x"===o?r:n,Le(t,this.clsPos+"-"+this.dir+"-"+this.align,!1===this.offset)},getAxis:function(){return"top"===this.dir||"bottom"===this.dir?"y":"x"}}},Ii={mixins:[$i,mi],args:"pos",props:{mode:"list",toggle:Boolean,boundary:Boolean,boundaryAlign:Boolean,delayShow:Number,delayHide:Number,clsDrop:String},data:{mode:["click","hover"],toggle:"- *",boundary:ut&&window,boundaryAlign:!1,delayShow:0,delayHide:800,clsDrop:!1,animation:["uk-animation-fade"],cls:"uk-open"},computed:{boundary:function(t,e){return yt(t.boundary,e)},clsDrop:function(t){return t.clsDrop||"uk-"+this.$options.name},clsPos:function(){return this.clsDrop}},created:function(){this.tracker=new En},connected:function(){De(this.$el,this.clsDrop);var t=this.$props.toggle;this.toggle=t&&this.$create("toggle",yt(t,this.$el),{target:this.$el,mode:this.mode}),this.toggle||Kt(this.$el,"updatearia")},disconnected:function(){this.isActive()&&(ki=null)},events:[{name:"click",delegate:function(){return"."+this.clsDrop+"-close"},handler:function(t){t.preventDefault(),this.hide(!1)}},{name:"click",delegate:function(){return'a[href^="#"]'},handler:function(t){var e=t.defaultPrevented,t=t.current.hash;e||!t||qt(t,this.$el)||this.hide(!1)}},{name:"beforescroll",handler:function(){this.hide(!1)}},{name:"toggle",self:!0,handler:function(t,e){t.preventDefault(),this.isToggled()?this.hide(!1):this.show(e,!1)}},{name:"toggleshow",self:!0,handler:function(t,e){t.preventDefault(),this.show(e)}},{name:"togglehide",self:!0,handler:function(t){t.preventDefault(),this.hide()}},{name:wt,filter:function(){return b(this.mode,"hover")},handler:function(t){re(t)||this.clearTimers()}},{name:bt,filter:function(){return b(this.mode,"hover")},handler:function(t){!re(t)&&t.relatedTarget&&this.hide()}},{name:"toggled",self:!0,handler:function(){this.isToggled()&&(this.clearTimers(),this.position())}},{name:"show",self:!0,handler:function(){var r=this;(ki=this).tracker.init(),Kt(this.$el,"updatearia"),Jt(this.$el,"hide",Xt(document,mt,function(t){var i=t.target;return!qt(i,r.$el)&&Jt(document,vt+" "+xt+" scroll",function(t){var e=t.defaultPrevented,n=t.type,t=t.target;e||n!==vt||i!==t||r.toggle&&qt(i,r.toggle.$el)||r.hide(!1)},!0)}),{self:!0}),Jt(this.$el,"hide",Xt(document,"keydown",function(t){27===t.keyCode&&(t.preventDefault(),r.hide(!1))}),{self:!0})}},{name:"beforehide",self:!0,handler:function(){this.clearTimers()}},{name:"hide",handler:function(t){t=t.target;this.$el===t?(ki=this.isActive()?null:ki,Kt(this.$el,"updatearia"),this.tracker.cancel()):ki=null===ki&&qt(t,this.$el)&&this.isToggled()?this:ki}},{name:"updatearia",self:!0,handler:function(t,e){t.preventDefault(),this.updateAria(this.$el),(e||this.toggle)&&(ot((e||this.toggle).$el,"aria-expanded",this.isToggled()),Le(this.toggle.$el,this.cls,this.isToggled()))}}],update:{write:function(){this.isToggled()&&!rn.inProgress(this.$el)&&this.position()},events:["resize"]},methods:{show:function(t,e){var n,i=this;if(void 0===t&&(t=this.toggle),void 0===e&&(e=!0),this.isToggled()&&t&&this.toggle&&t.$el!==this.toggle.$el&&this.hide(!1),this.toggle=t,this.clearTimers(),!this.isActive()){if(ki){if(e&&ki.isDelaying)return void(this.showTimer=setTimeout(this.show,10));for(;ki&&n!==ki&&!qt(this.$el,ki.$el);)(n=ki).hide(!1)}this.showTimer=setTimeout(function(){return!i.isToggled()&&i.toggleElement(i.$el,!0)},e&&this.delayShow||0)}},hide:function(t){var e=this;void 0===t&&(t=!0);function n(){return e.toggleElement(e.$el,!1,!1)}var i,r;this.clearTimers(),this.isDelaying=(i=this.$el,r=[],Ae(i,function(t){return"static"!==Re(t,"position")&&r.push(t)}),r.some(function(t){return e.tracker.movesTo(t)})),t&&this.isDelaying?this.hideTimer=setTimeout(this.hide,50):t&&this.delayHide?this.hideTimer=setTimeout(n,this.delayHide):n()},clearTimers:function(){clearTimeout(this.showTimer),clearTimeout(this.hideTimer),this.showTimer=null,this.hideTimer=null,this.isDelaying=!1},isActive:function(){return ki===this},position:function(){Be(this.$el,this.clsDrop+"-stack"),Le(this.$el,this.clsDrop+"-boundary",this.boundaryAlign);var t,e=an(this.boundary),n=this.boundaryAlign?e:an(this.toggle.$el);"justify"===this.align?(t="y"===this.getAxis()?"width":"height",Re(this.$el,t,n[t])):this.$el.offsetWidth>Math.max(e.right-n.left,n.right-e.left)&&De(this.$el,this.clsDrop+"-stack"),this.positionAt(this.$el,this.boundaryAlign?this.boundary:this.toggle.$el,this.boundary)}}};var Si={mixins:[pi],args:"target",props:{target:Boolean},data:{target:!1},computed:{input:function(t,e){return Ne(Wt,e)},state:function(){return this.input.nextElementSibling},target:function(t,e){t=t.target;return t&&(!0===t&&this.input.parentNode===e&&this.input.nextElementSibling||yt(t,e))}},update:function(){var t,e,n=this.target,i=this.input;!n||n[e=Vt(n)?"value":"textContent"]!==(i=i.files&&i.files[0]?i.files[0].name:zt(i,"select")&&(t=Me("option",i).filter(function(t){return t.selected})[0])?t.textContent:i.value)&&(n[e]=i)},events:[{name:"change",handler:function(){this.$update()}},{name:"reset",el:function(){return Bt(this.$el,"form")},handler:function(){this.$update()}}]},Ti={update:{read:function(t){var e=Rn(this.$el);if(!e||t.isInView===e)return!1;t.isInView=e},write:function(){this.$el.src=""+this.$el.src},events:["scroll","resize"]}},Ei={props:{margin:String,firstColumn:Boolean},data:{margin:"uk-margin-small-top",firstColumn:"uk-first-column"},update:{read:function(){var n,t=_i(this.$el.children);return{rows:t,columns:(n=[[]],t.forEach(function(t){return Ci(t,"left","right").forEach(function(t,e){return n[e]=n[e]?n[e].concat(t):t})}),lt?n.reverse():n)}},write:function(t){var n=this,i=t.columns;t.rows.forEach(function(t,e){return t.forEach(function(t){Le(t,n.margin,0!==e),Le(t,n.firstColumn,b(i[0],t))})})},events:["resize"]}};function _i(t){return Ci(t,"top","bottom")}function Ci(t,e,n){for(var i=[[]],r=0;r<t.length;r++){var o=t[r];if(Ft(o))for(var s=Ai(o),a=i.length-1;0<=a;a--){var c=i[a];if(!c[0]){c.push(o);break}var u=void 0,u=c[0].offsetParent===o.offsetParent?Ai(c[0]):(s=Ai(o,!0),Ai(c[0],!0));if(s[e]>=u[n]-1&&s[e]!==u[e]){i.push([o]);break}if(s[n]-1>u[e]||s[e]===u[e]){c.push(o);break}if(0===a){i.unshift([o]);break}}}return i}function Ai(t,e){void 0===e&&(e=!1);var n=t.offsetTop,i=t.offsetLeft,r=t.offsetHeight,o=t.offsetWidth;return e&&(n=(t=hn(t))[0],i=t[1]),{top:n,left:i,bottom:n+r,right:i+o}}var Ni={extends:Ei,mixins:[pi],name:"grid",props:{masonry:Boolean,parallax:Number},data:{margin:"uk-grid-margin",clsStack:"uk-grid-stack",masonry:!1,parallax:0},connected:function(){this.masonry&&De(this.$el,"uk-flex-top uk-flex-wrap-top")},update:[{write:function(t){t=t.columns;Le(this.$el,this.clsStack,t.length<2)},events:["resize"]},{read:function(t){var e=t.columns,n=t.rows,i=Yt(this.$el);if(!i.length||!this.masonry&&!this.parallax)return!1;var r,o,s=i.some(Qe.inProgress),a=!1,c=e.map(function(t){return t.reduce(function(t,e){return t+e.offsetHeight},0)}),u=(t=i,r=this.margin,F((i=t.filter(function(t){return He(t,r)})[0])?Re(i,"marginTop"):Re(t[0],"paddingLeft"))*(n.length-1)),h=Math.max.apply(Math,c)+u;this.masonry&&(e=e.map(function(t){return Z(t,"offsetTop")}),t=e,o=n.map(function(t){return Math.max.apply(Math,t.map(function(t){return t.offsetHeight}))}),a=t.map(function(n){var i=0;return n.map(function(t,e){return i+=e?o[e-1]-n[e-1].offsetHeight:0})}));var l=Math.abs(this.parallax);return{padding:l=l&&c.reduce(function(t,e,n){return Math.max(t,e+u+(n%2?l:l/8)-h)},0),columns:e,translates:a,height:!s&&(this.masonry?h:"")}},write:function(t){var e=t.height,t=t.padding;Re(this.$el,"paddingBottom",t||""),!1!==e&&Re(this.$el,"height",e)},events:["resize"]},{read:function(t){t=t.height;return{scrolled:!!this.parallax&&Yn(this.$el,t?t-ln(this.$el):0)*Math.abs(this.parallax)}},write:function(t){var e=t.columns,i=t.scrolled,r=t.translates;!1===i&&!r||e.forEach(function(t,n){return t.forEach(function(t,e){return Re(t,"transform",i||r?"translateY("+((r&&-r[n][e])+(i?n%2?i:i/8:0))+"px)":"")})})},events:["scroll","resize"]}]};var Mi=ht?{props:{selMinHeight:String},data:{selMinHeight:!1,forceHeight:!1},computed:{elements:function(t,e){t=t.selMinHeight;return t?Me(t,e):[e]}},update:[{read:function(){Re(this.elements,"height","")},order:-5,events:["resize"]},{write:function(){var n=this;this.elements.forEach(function(t){var e=F(Re(t,"minHeight"));e&&(n.forceHeight||Math.round(e+pn(t,"height","content-box"))>=t.offsetHeight)&&Re(t,"height",e)})},order:5,events:["resize"]}]}:{},zi={mixins:[Mi],args:"target",props:{target:String,row:Boolean},data:{target:"> *",row:!0,forceHeight:!0},computed:{elements:function(t,e){return Me(t.target,e)}},update:{read:function(){return{rows:(this.row?_i(this.elements):[this.elements]).map(Di)}},write:function(t){t.rows.forEach(function(t){var n=t.heights;return t.elements.forEach(function(t,e){return Re(t,"minHeight",n[e])})})},events:["resize"]}};function Di(t){if(t.length<2)return{heights:[""],elements:t};var e=Bi(t),n=e.heights,i=e.max,r=t.some(function(t){return t.style.minHeight}),e=t.some(function(t,e){return!t.style.minHeight&&n[e]<i});return r&&e&&(Re(t,"minHeight",""),e=Bi(t),n=e.heights,i=e.max),{heights:n=t.map(function(t,e){return n[e]===i&&F(t.style.minHeight).toFixed(2)!==i.toFixed(2)?"":i}),elements:t}}function Bi(t){t=t.map(function(t){return an(t).height-pn(t,"height","content-box")});return{heights:t,max:Math.max.apply(null,t)}}var Pi={mixins:[Mi],props:{expand:Boolean,offsetTop:Boolean,offsetBottom:Boolean,minHeight:Number},data:{expand:!1,offsetTop:!1,offsetBottom:!1,minHeight:0},update:{read:function(t){var e=t.minHeight;if(!Ft(this.$el))return!1;var n="",i=pn(this.$el,"height","content-box");if(this.expand){if(this.$el.dataset.heightExpand="",Ne("[data-height-expand]")!==this.$el)return!1;n=ln(window)-(Oi(document.documentElement)-Oi(this.$el))-i||""}else{n="calc(100vh";this.offsetTop&&(n+=0<(t=an(this.$el).top)&&t<ln(window)/2?" - "+t+"px":""),!0===this.offsetBottom?n+=" - "+Oi(this.$el.nextElementSibling)+"px":P(this.offsetBottom)?n+=" - "+this.offsetBottom+"vh":this.offsetBottom&&u(this.offsetBottom,"px")?n+=" - "+F(this.offsetBottom)+"px":D(this.offsetBottom)&&(n+=" - "+Oi(yt(this.offsetBottom,this.$el))+"px"),n+=(i?" - "+i+"px":"")+")"}return{minHeight:n,prev:e}},write:function(t){var e=t.minHeight,t=t.prev;Re(this.$el,{minHeight:e}),e!==t&&this.$update(this.$el,"resize"),this.minHeight&&F(Re(this.$el,"minHeight"))<this.minHeight&&Re(this.$el,"minHeight",this.minHeight)},events:["resize"]}};function Oi(t){return t&&an(t).height||0}var Hi={args:"src",props:{id:Boolean,icon:String,src:String,style:String,width:Number,height:Number,ratio:Number,class:String,strokeAnimation:Boolean,focusable:Boolean,attributes:"list"},data:{ratio:1,include:["style","class","focusable"],class:"",strokeAnimation:!1},beforeConnect:function(){this.class+=" uk-svg"},connected:function(){var t,e=this;!this.icon&&b(this.src,"#")&&(t=this.src.split("#"),this.src=t[0],this.icon=t[1]),this.svg=this.getSvg().then(function(t){return e.applyAttributes(t),e.svgEl=function(t,e){if(jt(e)||"CANVAS"===e.tagName){e.hidden=!0;var n=e.nextElementSibling;return Vi(t,n)?n:ye(e,t)}n=e.lastElementChild;return Vi(t,n)?n:be(e,t)}(t,e.$el)},et)},disconnected:function(){var e=this;jt(this.$el)&&(this.$el.hidden=!1),this.svg&&this.svg.then(function(t){return(!e._connected||t!==e.svgEl)&&$e(t)},et),this.svg=this.svgEl=null},update:{read:function(){return!!(this.strokeAnimation&&this.svgEl&&Ft(this.svgEl))},write:function(){var t,e;t=this.svgEl,(e=Wi(t))&&t.style.setProperty("--uk-animation-stroke",e)},type:["resize"]},methods:{getSvg:function(){var e=this;return function(n){if(Li[n])return Li[n];return Li[n]=new ae(function(e,t){n?g(n,"data:")?e(decodeURIComponent(n.split(",")[1])):de(n).then(function(t){return e(t.response)},function(){return t("SVG not found.")}):t()})}(this.src).then(function(t){return function(t,e){e&&b(t,"<symbol")&&(t=function(t,e){if(!Fi[t]){var n;for(Fi[t]={},ji.lastIndex=0;n=ji.exec(t);)Fi[t][n[3]]='<svg xmlns="http://www.w3.org/2000/svg"'+n[1]+"svg>"}return Fi[t][e]}(t,e)||t);return(t=Ne(t.substr(t.indexOf("<svg"))))&&t.hasChildNodes()&&t}(t,e.icon)||ae.reject("SVG not found.")})},applyAttributes:function(n){var t,e,i=this;for(t in this.$options.props)this[t]&&b(this.include,t)&&ot(n,t,this[t]);for(e in this.attributes){var r=this.attributes[e].split(":",2),o=r[0],r=r[1];ot(n,o,r)}this.id||at(n,"id");var s=["width","height"],a=[this.width,this.height];a.some(function(t){return t})||(a=s.map(function(t){return ot(n,t)}));var c=ot(n,"viewBox");c&&!a.some(function(t){return t})&&(a=c.split(" ").slice(2)),a.forEach(function(t,e){(t=(0|t)*i.ratio)&&ot(n,s[e],t),t&&!a[1^e]&&at(n,s[1^e])}),ot(n,"data-svg",this.icon||this.src)}}},Li={};var ji=/<symbol([^]*?id=(['"])(.+?)\2[^]*?<\/)symbol>/g,Fi={};function Wi(t){return Math.ceil(Math.max.apply(Math,[0].concat(Me("[stroke]",t).map(function(t){try{return t.getTotalLength()}catch(t){return 0}}))))}function Vi(t,e){return ot(t,"data-svg")===ot(e,"data-svg")}var Ri={spinner:'<svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" cx="15" cy="15" r="14"/></svg>',totop:'<svg width="18" height="10" viewBox="0 0 18 10" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.2" points="1 9 9 1 17 9 "/></svg>',marker:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="9" y="4" width="1" height="11"/><rect x="4" y="9" width="11" height="1"/></svg>',"close-icon":'<svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg"><line fill="none" stroke="#000" stroke-width="1.1" x1="1" y1="1" x2="13" y2="13"/><line fill="none" stroke="#000" stroke-width="1.1" x1="13" y1="1" x2="1" y2="13"/></svg>',"close-large":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><line fill="none" stroke="#000" stroke-width="1.4" x1="1" y1="1" x2="19" y2="19"/><line fill="none" stroke="#000" stroke-width="1.4" x1="19" y1="1" x2="1" y2="19"/></svg>',"navbar-toggle-icon":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect y="9" width="20" height="2"/><rect y="3" width="20" height="2"/><rect y="15" width="20" height="2"/></svg>',"overlay-icon":'<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><rect x="19" y="0" width="1" height="40"/><rect x="0" y="19" width="40" height="1"/></svg>',"pagination-next":'<svg width="7" height="12" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.2" points="1 1 6 6 1 11"/></svg>',"pagination-previous":'<svg width="7" height="12" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.2" points="6 1 1 6 6 11"/></svg>',"search-icon":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.1" cx="9" cy="9" r="7"/><path fill="none" stroke="#000" stroke-width="1.1" d="M14,14 L18,18 L14,14 Z"/></svg>',"search-large":'<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.8" cx="17.5" cy="17.5" r="16.5"/><line fill="none" stroke="#000" stroke-width="1.8" x1="38" y1="39" x2="29" y2="30"/></svg>',"search-navbar":'<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.1" cx="10.5" cy="10.5" r="9.5"/><line fill="none" stroke="#000" stroke-width="1.1" x1="23" y1="23" x2="17" y2="17"/></svg>',"slidenav-next":'<svg width="14px" height="24px" viewBox="0 0 14 24" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.4" points="1.225,23 12.775,12 1.225,1 "/></svg>',"slidenav-next-large":'<svg width="25px" height="40px" viewBox="0 0 25 40" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="2" points="4.002,38.547 22.527,20.024 4,1.5 "/></svg>',"slidenav-previous":'<svg width="14px" height="24px" viewBox="0 0 14 24" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.4" points="12.775,1 1.225,12 12.775,23 "/></svg>',"slidenav-previous-large":'<svg width="25px" height="40px" viewBox="0 0 25 40" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="2" points="20.527,1.5 2,20.024 20.525,38.547 "/></svg>'},qi={install:function(r){r.icon.add=function(t,e){var n,i=D(t)?((n={})[t]=e,n):t;K(i,function(t,e){Ri[e]=t,delete Ki[e]}),r._initialized&&Ae(document.body,function(t){return K(r.getComponents(t),function(t){t.$options.isIcon&&t.icon in i&&t.$reset()})})}},extends:Hi,args:"icon",props:["icon"],data:{include:["focusable"]},isIcon:!0,beforeConnect:function(){De(this.$el,"uk-icon")},methods:{getSvg:function(){var t=function(t){if(!Ri[t])return null;Ki[t]||(Ki[t]=Ne((Ri[function(t){return lt?X(X(t,"left","right"),"previous","next"):t}(t)]||Ri[t]).trim()));return Ki[t].cloneNode(!0)}(this.icon);return t?ae.resolve(t):ae.reject("Icon not found.")}}},Ui={args:!1,extends:qi,data:function(t){return{icon:d(t.constructor.options.name)}},beforeConnect:function(){De(this.$el,this.$name)}},Yi={extends:Ui,beforeConnect:function(){De(this.$el,"uk-slidenav")},computed:{icon:function(t,e){t=t.icon;return He(e,"uk-slidenav-large")?t+"-large":t}}},Xi={extends:Ui,computed:{icon:function(t,e){t=t.icon;return He(e,"uk-search-icon")&&Ut(e,".uk-search-large").length?"search-large":Ut(e,".uk-search-navbar").length?"search-navbar":t}}},Gi={extends:Ui,computed:{icon:function(){return"close-"+(He(this.$el,"uk-close-large")?"large":"icon")}}},Ji={extends:Ui,connected:function(){var e=this;this.svg.then(function(t){return 1!==e.ratio&&Re(Ne("circle",t),"strokeWidth",1/e.ratio)},et)}},Ki={};var Zi={args:"dataSrc",props:{dataSrc:String,dataSrcset:Boolean,sizes:String,width:Number,height:Number,offsetTop:String,offsetLeft:String,target:String},data:{dataSrc:"",dataSrcset:!1,sizes:!1,width:!1,height:!1,offsetTop:"50vh",offsetLeft:"50vw",target:!1},computed:{cacheKey:function(t){t=t.dataSrc;return this.$name+"."+t},width:function(t){var e=t.width,t=t.dataWidth;return e||t},height:function(t){var e=t.height,t=t.dataHeight;return e||t},sizes:function(t){var e=t.sizes,t=t.dataSizes;return e||t},isImg:function(t,e){return or(e)},target:{get:function(t){t=t.target;return[this.$el].concat(kt(t,this.$el))},watch:function(){this.observe()}},offsetTop:function(t){return bn(t.offsetTop,"height")},offsetLeft:function(t){return bn(t.offsetLeft,"width")}},connected:function(){ar[this.cacheKey]?Qi(this.$el,ar[this.cacheKey],this.dataSrcset,this.sizes):this.isImg&&this.width&&this.height&&Qi(this.$el,function(t,e,n){n&&(n=rt.ratio({width:t,height:e},"width",bn(er(n))),t=n.width,e=n.height);return'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="'+t+'" height="'+e+'"></svg>'}(this.width,this.height,this.sizes)),this.observer=new Zn(this.load,{rootMargin:this.offsetTop+"px "+this.offsetLeft+"px"}),requestAnimationFrame(this.observe)},disconnected:function(){this.observer.disconnect()},update:{read:function(t){var e=this,t=t.image;if(t||"complete"!==document.readyState||this.load(this.observer.takeRecords()),this.isImg)return!1;t&&t.then(function(t){return t&&""!==t.currentSrc&&Qi(e.$el,sr(t))})},write:function(t){var e,n,i;this.dataSrcset&&1!==window.devicePixelRatio&&(!(n=Re(this.$el,"backgroundSize")).match(/^(auto\s?)+$/)&&F(n)!==t.bgSize||(t.bgSize=(e=this.dataSrcset,n=this.sizes,i=bn(er(n)),(e=(e.match(rr)||[]).map(F).sort(function(t,e){return t-e})).filter(function(t){return i<=t})[0]||e.pop()||""),Re(this.$el,"backgroundSize",t.bgSize+"px")))},events:["resize"]},methods:{load:function(t){var e=this;t.some(function(t){return H(t.isIntersecting)||t.isIntersecting})&&(this._data.image=fe(this.dataSrc,this.dataSrcset,this.sizes).then(function(t){return Qi(e.$el,sr(t),t.srcset,t.sizes),ar[e.cacheKey]=sr(t),t},function(t){return Kt(e.$el,new t.constructor(t.type,t))}),this.observer.disconnect())},observe:function(){var e=this;this._connected&&!this._data.image&&this.target.forEach(function(t){return e.observer.observe(t)})}}};function Qi(t,e,n,i){or(t)?(i&&(t.sizes=i),n&&(t.srcset=n),e&&(t.src=e)):e&&!b(t.style.backgroundImage,e)&&(Re(t,"backgroundImage","url("+Ht(e)+")"),Kt(t,Zt("load",!1)))}var tr=/\s*(.*?)\s*(\w+|calc\(.*?\))\s*(?:,|$)/g;function er(t){var e,n;for(tr.lastIndex=0;e=tr.exec(t);)if(!e[1]||window.matchMedia(e[1]).matches){e=g(n=e[2],"calc")?n.slice(5,-1).replace(nr,function(t){return bn(t)}).replace(/ /g,"").match(ir).reduce(function(t,e){return t+ +e},0):n;break}return e||"100vw"}var nr=/\d+(?:\w+|%)/g,ir=/[+-]?(\d+)/g;var rr=/\s+\d+w\s*(?:,|$)/g;function or(t){return"IMG"===t.tagName}function sr(t){return t.currentSrc||t.src}var ar,cr="__test__";try{(ar=window.sessionStorage||{})[cr]=1,delete ar[cr]}catch(t){ar={}}var ur={props:{media:Boolean},data:{media:!1},computed:{matchMedia:function(){var t=function(t){if(D(t))if("@"===t[0])t=F(Xe("breakpoint-"+t.substr(1)));else if(isNaN(t))return t;return!(!t||isNaN(t))&&"(min-width: "+t+"px)"}(this.media);return!t||window.matchMedia(t).matches}}};var hr={mixins:[pi,ur],props:{fill:String},data:{fill:"",clsWrapper:"uk-leader-fill",clsHide:"uk-leader-hide",attrFill:"data-fill"},computed:{fill:function(t){return t.fill||Xe("leader-fill-content")}},connected:function(){var t=Se(this.$el,'<span class="'+this.clsWrapper+'">');this.wrapper=t[0]},disconnected:function(){Te(this.wrapper.childNodes)},update:{read:function(t){var e=t.changed,n=t.width,t=n;return{width:n=Math.floor(this.$el.offsetWidth/2),fill:this.fill,changed:e||t!==n,hide:!this.matchMedia}},write:function(t){Le(this.wrapper,this.clsHide,t.hide),t.changed&&(t.changed=!1,ot(this.wrapper,this.attrFill,new Array(t.width).join(t.fill)))},events:["resize"]}},lr={props:{container:Boolean},data:{container:!0},computed:{container:function(t){t=t.container;return!0===t&&this.$container||t&&Ne(t)}}},dr=[],fr={mixins:[pi,lr,mi],props:{selPanel:String,selClose:String,escClose:Boolean,bgClose:Boolean,stack:Boolean},data:{cls:"uk-open",escClose:!0,bgClose:!0,overlay:!0,stack:!1},computed:{panel:function(t,e){return Ne(t.selPanel,e)},transitionElement:function(){return this.panel},bgClose:function(t){return t.bgClose&&this.panel}},beforeDisconnect:function(){this.isToggled()&&this.toggleElement(this.$el,!1,!1)},events:[{name:"click",delegate:function(){return this.selClose},handler:function(t){t.preventDefault(),this.hide()}},{name:"toggle",self:!0,handler:function(t){t.defaultPrevented||(t.preventDefault(),this.isToggled()===b(dr,this)&&this.toggle())}},{name:"beforeshow",self:!0,handler:function(t){if(b(dr,this))return!1;!this.stack&&dr.length?(ae.all(dr.map(function(t){return t.hide()})).then(this.show),t.preventDefault()):dr.push(this)}},{name:"show",self:!0,handler:function(){var r=this;dn(window)-dn(document)&&this.overlay&&Re(document.body,"overflowY","scroll"),this.stack&&Re(this.$el,"zIndex",F(Re(this.$el,"zIndex"))+dr.length),De(document.documentElement,this.clsPage),this.bgClose&&Jt(this.$el,"hide",Xt(document,mt,function(t){var i=t.target;J(dr)!==r||r.overlay&&!qt(i,r.$el)||qt(i,r.panel)||Jt(document,vt+" "+xt+" scroll",function(t){var e=t.defaultPrevented,n=t.type,t=t.target;e||n!==vt||i!==t||r.hide()},!0)}),{self:!0}),this.escClose&&Jt(this.$el,"hide",Xt(document,"keydown",function(t){27===t.keyCode&&J(dr)===r&&(t.preventDefault(),r.hide())}),{self:!0})}},{name:"hidden",self:!0,handler:function(){var e=this;dr.splice(dr.indexOf(this),1),dr.length||Re(document.body,"overflowY",""),Re(this.$el,"zIndex",""),dr.some(function(t){return t.clsPage===e.clsPage})||Be(document.documentElement,this.clsPage)}}],methods:{toggle:function(){return this.isToggled()?this.hide():this.show()},show:function(){var e=this;return this.container&&this.$el.parentNode!==this.container?(be(this.container,this.$el),new ae(function(t){return requestAnimationFrame(function(){return e.show().then(t)})})):this.toggleElement(this.$el,!0,pr(this))},hide:function(){return this.toggleElement(this.$el,!1,pr(this))}}};function pr(t){var s=t.transitionElement,a=t._toggle;return function(r,o){return new ae(function(n,i){return Jt(r,"show hide",function(){r._reject&&r._reject(),r._reject=i,a(r,o);var t=Jt(s,"transitionstart",function(){Jt(s,"transitionend transitioncancel",n,{self:!0}),clearTimeout(e)},{self:!0}),e=setTimeout(function(){t(),n()},U(Re(s,"transitionDuration")))})})}}var mr={install:function(t){var a=t.modal;function i(t,e,n,i){e=G({bgClose:!1,escClose:!0,labels:a.labels},e);var r=a.dialog(t(e),e),o=new se,s=!1;return Xt(r.$el,"submit","form",function(t){t.preventDefault(),o.resolve(i&&i(r)),s=!0,r.hide()}),Xt(r.$el,"hide",function(){return!s&&n(o)}),o.promise.dialog=r,o.promise}a.dialog=function(t,e){var n=a('<div class="uk-modal"> <div class="uk-modal-dialog">'+t+"</div> </div>",e);return n.show(),Xt(n.$el,"hidden",function(){return ae.resolve().then(function(){return n.$destroy(!0)})},{self:!0}),n},a.alert=function(e,t){return i(function(t){t=t.labels;return'<div class="uk-modal-body">'+(D(e)?e:we(e))+'</div> <div class="uk-modal-footer uk-text-right"> <button class="uk-button uk-button-primary uk-modal-close" autofocus>'+t.ok+"</button> </div>"},t,function(t){return t.resolve()})},a.confirm=function(e,t){return i(function(t){t=t.labels;return'<form> <div class="uk-modal-body">'+(D(e)?e:we(e))+'</div> <div class="uk-modal-footer uk-text-right"> <button class="uk-button uk-button-default uk-modal-close" type="button">'+t.cancel+'</button> <button class="uk-button uk-button-primary" autofocus>'+t.ok+"</button> </div> </form>"},t,function(t){return t.reject()})},a.prompt=function(e,n,t){return i(function(t){t=t.labels;return'<form class="uk-form-stacked"> <div class="uk-modal-body"> <label>'+(D(e)?e:we(e))+'</label> <input class="uk-input" value="'+(n||"")+'" autofocus> </div> <div class="uk-modal-footer uk-text-right"> <button class="uk-button uk-button-default uk-modal-close" type="button">'+t.cancel+'</button> <button class="uk-button uk-button-primary">'+t.ok+"</button> </div> </form>"},t,function(t){return t.resolve(null)},function(t){return Ne("input",t.$el).value})},a.labels={ok:"Ok",cancel:"Cancel"}},mixins:[fr],data:{clsPage:"uk-modal-page",selPanel:".uk-modal-dialog",selClose:".uk-modal-close, .uk-modal-close-default, .uk-modal-close-outside, .uk-modal-close-full"},events:[{name:"show",self:!0,handler:function(){He(this.panel,"uk-margin-auto-vertical")?De(this.$el,"uk-flex"):Re(this.$el,"display","block"),ln(this.$el)}},{name:"hidden",self:!0,handler:function(){Re(this.$el,"display",""),Be(this.$el,"uk-flex")}}]};var gr={extends:vi,data:{targets:"> .uk-parent",toggle:"> a",content:"> ul"}},vr={mixins:[pi,Mi],props:{dropdown:String,mode:"list",align:String,offset:Number,boundary:Boolean,boundaryAlign:Boolean,clsDrop:String,delayShow:Number,delayHide:Number,dropbar:Boolean,dropbarMode:String,dropbarAnchor:Boolean,duration:Number},data:{dropdown:".uk-navbar-nav > li",align:lt?"right":"left",clsDrop:"uk-navbar-dropdown",mode:void 0,offset:void 0,delayShow:void 0,delayHide:void 0,boundaryAlign:void 0,flip:"x",boundary:!0,dropbar:!1,dropbarMode:"slide",dropbarAnchor:!1,duration:200,forceHeight:!0,selMinHeight:".uk-navbar-nav > li > a, .uk-navbar-item, .uk-navbar-toggle"},computed:{boundary:function(t,e){var n=t.boundary,t=t.boundaryAlign;return!0===n||t?e:n},dropbarAnchor:function(t,e){return yt(t.dropbarAnchor,e)},pos:function(t){return"bottom-"+t.align},dropbar:{get:function(t){t=t.dropbar;return t?(t=this._dropbar||yt(t,this.$el)||Ne("+ .uk-navbar-dropbar",this.$el))||(this._dropbar=Ne("<div></div>")):null},watch:function(t){De(t,"uk-navbar-dropbar")},immediate:!0},dropdowns:{get:function(t,e){return Me(t.dropdown+" ."+t.clsDrop,e)},watch:function(t){var e=this;this.$create("drop",t.filter(function(t){return!e.getDropdown(t)}),G({},this.$props,{boundary:this.boundary,pos:this.pos,offset:this.dropbar||this.offset}))},immediate:!0}},disconnected:function(){this.dropbar&&$e(this.dropbar),delete this._dropbar},events:[{name:"mouseover",delegate:function(){return this.dropdown},handler:function(t){var e=t.current,t=this.getActive();t&&t.toggle&&!qt(t.toggle.$el,e)&&!t.tracker.movesTo(t.$el)&&t.hide(!1)}},{name:"mouseleave",el:function(){return this.dropbar},handler:function(){var t=this.getActive();t&&!this.dropdowns.some(function(t){return zt(t,":hover")})&&t.hide()}},{name:"beforeshow",capture:!0,filter:function(){return this.dropbar},handler:function(){this.dropbar.parentNode||ye(this.dropbarAnchor||this.$el,this.dropbar)}},{name:"show",filter:function(){return this.dropbar},handler:function(t,e){var n=e.$el,e=e.dir;He(n,this.clsDrop)&&("slide"===this.dropbarMode&&De(this.dropbar,"uk-navbar-dropbar-slide"),this.clsDrop&&De(n,this.clsDrop+"-dropbar"),"bottom"===e&&this.transitionTo(n.offsetHeight+F(Re(n,"marginTop"))+F(Re(n,"marginBottom")),n))}},{name:"beforehide",filter:function(){return this.dropbar},handler:function(t,e){var n=e.$el,e=this.getActive();zt(this.dropbar,":hover")&&e&&e.$el===n&&t.preventDefault()}},{name:"hide",filter:function(){return this.dropbar},handler:function(t,e){var n=e.$el;!He(n,this.clsDrop)||(!(e=this.getActive())||e&&e.$el===n)&&this.transitionTo(0)}}],methods:{getActive:function(){var t=this.dropdowns.map(this.getDropdown).filter(function(t){return t&&t.isActive()})[0];return t&&b(t.mode,"hover")&&qt(t.toggle.$el,this.$el)&&t},transitionTo:function(t,e){var n=this,i=this.dropbar,r=Ft(i)?ln(i):0;return Re(e=r<t&&e,"clip","rect(0,"+e.offsetWidth+"px,"+r+"px,0)"),ln(i,r),Qe.cancel([e,i]),ae.all([Qe.start(i,{height:t},this.duration),Qe.start(e,{clip:"rect(0,"+e.offsetWidth+"px,"+t+"px,0)"},this.duration)]).catch(et).then(function(){Re(e,{clip:""}),n.$update(i)})},getDropdown:function(t){return this.$getComponent(t,"drop")||this.$getComponent(t,"dropdown")}}},wr={mixins:[fr],args:"mode",props:{mode:String,flip:Boolean,overlay:Boolean},data:{mode:"slide",flip:!1,overlay:!1,clsPage:"uk-offcanvas-page",clsContainer:"uk-offcanvas-container",selPanel:".uk-offcanvas-bar",clsFlip:"uk-offcanvas-flip",clsContainerAnimation:"uk-offcanvas-container-animation",clsSidebarAnimation:"uk-offcanvas-bar-animation",clsMode:"uk-offcanvas",clsOverlay:"uk-offcanvas-overlay",selClose:".uk-offcanvas-close",container:!1},computed:{clsFlip:function(t){var e=t.flip,t=t.clsFlip;return e?t:""},clsOverlay:function(t){var e=t.overlay,t=t.clsOverlay;return e?t:""},clsMode:function(t){var e=t.mode;return t.clsMode+"-"+e},clsSidebarAnimation:function(t){var e=t.mode,t=t.clsSidebarAnimation;return"none"===e||"reveal"===e?"":t},clsContainerAnimation:function(t){var e=t.mode,t=t.clsContainerAnimation;return"push"!==e&&"reveal"!==e?"":t},transitionElement:function(t){return"reveal"===t.mode?this.panel.parentNode:this.panel}},events:[{name:"click",delegate:function(){return'a[href^="#"]'},handler:function(t){var e=t.current.hash;!t.defaultPrevented&&e&&Ne(e,document.body)&&this.hide()}},{name:"touchstart",passive:!0,el:function(){return this.panel},handler:function(t){t=t.targetTouches;1===t.length&&(this.clientY=t[0].clientY)}},{name:"touchmove",self:!0,passive:!1,filter:function(){return this.overlay},handler:function(t){t.cancelable&&t.preventDefault()}},{name:"touchmove",passive:!1,el:function(){return this.panel},handler:function(t){var e,n,i,r;1===t.targetTouches.length&&(e=event.targetTouches[0].clientY-this.clientY,n=(r=this.panel).scrollTop,((i=r.scrollHeight)<=(r=r.clientHeight)||0===n&&0<e||i-n<=r&&e<0)&&t.cancelable&&t.preventDefault())}},{name:"show",self:!0,handler:function(){"reveal"!==this.mode||He(this.panel.parentNode,this.clsMode)||(Ie(this.panel,"<div>"),De(this.panel.parentNode,this.clsMode)),Re(document.documentElement,"overflowY",this.overlay?"hidden":""),De(document.body,this.clsContainer,this.clsFlip),Re(document.body,"touch-action","pan-y pinch-zoom"),Re(this.$el,"display","block"),De(this.$el,this.clsOverlay),De(this.panel,this.clsSidebarAnimation,"reveal"!==this.mode?this.clsMode:""),ln(document.body),De(document.body,this.clsContainerAnimation),this.clsContainerAnimation&&(br().content+=",user-scalable=0")}},{name:"hide",self:!0,handler:function(){Be(document.body,this.clsContainerAnimation),Re(document.body,"touch-action","")}},{name:"hidden",self:!0,handler:function(){var t;this.clsContainerAnimation&&((t=br()).content=t.content.replace(/,user-scalable=0$/,"")),"reveal"===this.mode&&Te(this.panel),Be(this.panel,this.clsSidebarAnimation,this.clsMode),Be(this.$el,this.clsOverlay),Re(this.$el,"display",""),Be(document.body,this.clsContainer,this.clsFlip),Re(document.documentElement,"overflowY","")}},{name:"swipeLeft swipeRight",handler:function(t){this.isToggled()&&u(t.type,"Left")^this.flip&&this.hide()}}]};function br(){return Ne('meta[name="viewport"]',document.head)||be(document.head,'<meta name="viewport">')}var xr={mixins:[pi],props:{selContainer:String,selContent:String},data:{selContainer:".uk-modal",selContent:".uk-modal-dialog"},computed:{container:function(t,e){return Bt(e,t.selContainer)},content:function(t,e){return Bt(e,t.selContent)}},connected:function(){Re(this.$el,"minHeight",150)},update:{read:function(){return!(!this.content||!this.container)&&{current:F(Re(this.$el,"maxHeight")),max:Math.max(150,ln(this.container)-(an(this.content).height-ln(this.$el)))}},write:function(t){var e=t.current,t=t.max;Re(this.$el,"maxHeight",t),Math.round(e)!==Math.round(t)&&Kt(this.$el,"resize")},events:["resize"]}},s={props:["width","height"],connected:function(){De(this.$el,"uk-responsive-width")},update:{read:function(){return!!(Ft(this.$el)&&this.width&&this.height)&&{width:dn(this.$el.parentNode),height:this.height}},write:function(t){ln(this.$el,rt.contain({height:this.height,width:this.width},t).height)},events:["resize"]}},m={props:{offset:Number},data:{offset:0},methods:{scrollTo:function(t){var e=this;t=t&&Ne(t)||document.body,Kt(this.$el,"beforescroll",[this,t])&&Un(t,{offset:this.offset}).then(function(){return Kt(e.$el,"scrolled",[e,t])})}},events:{click:function(t){t.defaultPrevented||(t.preventDefault(),this.scrollTo(Ht(decodeURIComponent(this.$el.hash)).substr(1)))}}},yr="_ukScrollspy",t={args:"cls",props:{cls:String,target:String,hidden:Boolean,offsetTop:Number,offsetLeft:Number,repeat:Boolean,delay:Number},data:function(){return{cls:!1,target:!1,hidden:!0,offsetTop:0,offsetLeft:0,repeat:!1,delay:0,inViewClass:"uk-scrollspy-inview"}},computed:{elements:{get:function(t,e){t=t.target;return t?Me(t,e):[e]},watch:function(t){this.hidden&&Re(Rt(t,":not(."+this.inViewClass+")"),"visibility","hidden")},immediate:!0}},update:[{read:function(t){var e=this;t.update&&this.elements.forEach(function(t){t[yr]||(t[yr]={cls:ct(t,"uk-scrollspy-class")||e.cls}),t[yr].show=Rn(t,e.offsetTop,e.offsetLeft)})},write:function(i){var r=this;if(!i.update)return this.$emit(),i.update=!0;this.elements.forEach(function(e){function t(t){Re(e,"visibility",!t&&r.hidden?"hidden":""),Le(e,r.inViewClass,t),Le(e,n.cls),Kt(e,t?"inview":"outview"),n.inview=t,r.$update(e)}var n=e[yr];!n.show||n.inview||n.queued?!n.show&&n.inview&&!n.queued&&r.repeat&&t(!1):(n.queued=!0,i.promise=(i.promise||ae.resolve()).then(function(){return new ae(function(t){return setTimeout(t,r.delay)})}).then(function(){t(!0),setTimeout(function(){n.queued=!1,r.$emit()},300)}))})},events:["scroll","resize"]}]},dt={props:{cls:String,closest:String,scroll:Boolean,overflow:Boolean,offset:Number},data:{cls:"uk-active",closest:!1,scroll:!1,overflow:!0,offset:0},computed:{links:{get:function(t,e){return Me('a[href^="#"]',e).filter(function(t){return t.hash})},watch:function(t){this.scroll&&this.$create("scroll",t,{offset:this.offset||0})},immediate:!0},targets:function(){return Me(this.links.map(function(t){return Ht(t.hash).substr(1)}).join(","))},elements:function(t){t=t.closest;return Bt(this.links,t||"*")}},update:[{read:function(){var n=this,t=this.targets.length;if(!t||!Ft(this.$el))return!1;var e=J(Xn(this.targets[0])),i=e.scrollTop,r=e.scrollHeight,o=Gn(e),r=r-an(o).height,s=!1;return i===r?s=t-1:(this.targets.every(function(t,e){if(un(t,o).top-n.offset<=0)return s=e,!0}),!1===s&&this.overflow&&(s=0)),{active:s}},write:function(t){t=t.active;this.links.forEach(function(t){return t.blur()}),Be(this.elements,this.cls),!1!==t&&Kt(this.$el,"active",[t,De(this.elements[t],this.cls)])},events:["scroll","resize"]}]},ft={mixins:[pi,ur],props:{top:null,bottom:Boolean,offset:String,animation:String,clsActive:String,clsInactive:String,clsFixed:String,clsBelow:String,selTarget:String,widthElement:Boolean,showOnUp:Boolean,targetOffset:Number},data:{top:0,bottom:!1,offset:0,animation:"",clsActive:"uk-active",clsInactive:"",clsFixed:"uk-sticky-fixed",clsBelow:"uk-sticky-below",selTarget:"",widthElement:!1,showOnUp:!1,targetOffset:!1},computed:{offset:function(t){return bn(t.offset)},selTarget:function(t,e){t=t.selTarget;return t&&Ne(t,e)||e},widthElement:function(t,e){return yt(t.widthElement,e)||this.placeholder},isActive:{get:function(){return He(this.selTarget,this.clsActive)},set:function(t){t&&!this.isActive?(Oe(this.selTarget,this.clsInactive,this.clsActive),Kt(this.$el,"active")):t||He(this.selTarget,this.clsInactive)||(Oe(this.selTarget,this.clsActive,this.clsInactive),Kt(this.$el,"inactive"))}}},connected:function(){this.placeholder=Ne("+ .uk-sticky-placeholder",this.$el)||Ne('<div class="uk-sticky-placeholder"></div>'),this.isFixed=!1,this.isActive=!1},disconnected:function(){this.isFixed&&(this.hide(),Be(this.selTarget,this.clsInactive)),$e(this.placeholder),this.placeholder=null,this.widthElement=null},events:[{name:"load hashchange popstate",el:ut&&window,handler:function(){var i,r=this;!1!==this.targetOffset&&location.hash&&0<window.pageYOffset&&((i=Ne(location.hash))&&yn.read(function(){var t=an(i).top,e=an(r.$el).top,n=r.$el.offsetHeight;r.isFixed&&t<=e+n&&e<=t+i.offsetHeight&&qn(window,t-n-(P(r.targetOffset)?r.targetOffset:0)-r.offset)}))}}],update:[{read:function(t,e){t=t.height;if(this.inactive=!this.matchMedia||!Ft(this.$el),this.inactive)return!1;this.isActive&&"update"!==e&&(this.hide(),t=this.$el.offsetHeight,this.show()),t=this.isActive?t:this.$el.offsetHeight,this.topOffset=an(this.isFixed?this.placeholder:this.$el).top,this.bottomOffset=this.topOffset+t;e=kr("bottom",this);return this.top=Math.max(F(kr("top",this)),this.topOffset)-this.offset,this.bottom=e&&e-this.$el.offsetHeight,this.width=an(Ft(this.widthElement)?this.widthElement:this.$el).width,{height:t,top:hn(this.placeholder)[0],margins:Re(this.$el,["marginTop","marginBottom","marginLeft","marginRight"])}},write:function(t){var e=t.height,n=t.margins,t=this.placeholder;Re(t,G({height:e},n)),qt(t,document)||(ye(this.$el,t),t.hidden=!0),this.isActive=!!this.isActive},events:["resize"]},{read:function(t){t=t.scroll;return void 0===t&&(t=0),this.scroll=window.pageYOffset,{dir:t<=this.scroll?"down":"up",scroll:this.scroll}},write:function(t,e){var n=this,i=Date.now(),r=t.initTimestamp;void 0===r&&(r=0);var o=t.dir,s=t.lastDir,a=t.lastScroll,c=t.scroll,u=t.top;(t.lastScroll=c)<0||c===a&&"scroll"===e||this.showOnUp&&"scroll"!==e&&!this.isFixed||((300<i-r||o!==s)&&(t.initScroll=c,t.initTimestamp=i),t.lastDir=o,this.showOnUp&&!this.isFixed&&Math.abs(t.initScroll-c)<=30&&Math.abs(a-c)<=10||(this.inactive||c<this.top||this.showOnUp&&(c<=this.top||"down"===o&&"scroll"===e||"up"===o&&!this.isFixed&&c<=this.bottomOffset)?this.isFixed?(this.isFixed=!1,this.animation&&c>this.topOffset?(rn.cancel(this.$el),rn.out(this.$el,this.animation).then(function(){return n.hide()},et)):this.hide()):rn.inProgress(this.$el)&&c<u&&(rn.cancel(this.$el),this.hide()):this.isFixed?this.update():this.animation?(rn.cancel(this.$el),this.show(),rn.in(this.$el,this.animation).catch(et)):this.show()))},events:["resize","scroll"]}],methods:{show:function(){this.isFixed=!0,this.update(),this.placeholder.hidden=!1},hide:function(){this.isActive=!1,Be(this.$el,this.clsFixed,this.clsBelow),Re(this.$el,{position:"",top:"",width:""}),this.placeholder.hidden=!0},update:function(){var t=0!==this.top||this.scroll>this.top,e=Math.max(0,this.offset);P(this.bottom)&&this.scroll>this.bottom-this.offset&&(e=this.bottom-this.scroll),Re(this.$el,{position:"fixed",top:e+"px",width:this.width}),this.isActive=t,Le(this.$el,this.clsBelow,this.scroll>this.bottomOffset),De(this.$el,this.clsFixed)}}};function kr(t,e){var n=e.$props,i=e.$el,e=e[t+"Offset"],t=n[t];if(t)return D(t)&&t.match(/^-?\d/)?e+bn(t):an(!0===t?i.parentNode:yt(t,i)).bottom}var $r,Ir,Sr,Nt={mixins:[mi],args:"connect",props:{connect:String,toggle:String,active:Number,swiping:Boolean},data:{connect:"~.uk-switcher",toggle:"> * > :first-child",active:0,swiping:!0,cls:"uk-active",clsContainer:"uk-switcher",attrItem:"uk-switcher-item"},computed:{connects:{get:function(t,e){return kt(t.connect,e)},watch:function(t){var e=this;t.forEach(function(t){return e.updateAria(t.children)}),this.swiping&&Re(t,"touch-action","pan-y pinch-zoom")},immediate:!0},toggles:{get:function(t,e){return Me(t.toggle,e).filter(function(t){return!zt(t,".uk-disabled *, .uk-disabled, [disabled]")})},watch:function(t){var e=this.index();this.show(~e&&e||t[this.active]||t[0])},immediate:!0},children:function(){var t=this;return Yt(this.$el).filter(function(e){return t.toggles.some(function(t){return qt(t,e)})})}},events:[{name:"click",delegate:function(){return this.toggle},handler:function(t){b(this.toggles,t.current)&&(t.preventDefault(),this.show(t.current))}},{name:"click",el:function(){return this.connects},delegate:function(){return"["+this.attrItem+"],[data-"+this.attrItem+"]"},handler:function(t){t.preventDefault(),this.show(ct(t.current,this.attrItem))}},{name:"swipeRight swipeLeft",filter:function(){return this.swiping},el:function(){return this.connects},handler:function(t){t=t.type;this.show(u(t,"Left")?"next":"previous")}}],methods:{index:function(){var e=this;return y(this.children,function(t){return He(t,e.cls)})},show:function(t){var n=this,i=this.index(),r=ge(t,this.toggles,i);i!==r&&(this.children.forEach(function(t,e){Le(t,n.cls,r===e),ot(n.toggles[e],"aria-expanded",r===e)}),this.connects.forEach(function(t){var e=t.children;return n.toggleElement(V(e).filter(function(t,e){return e!==r&&n.isToggled(t)}),!1,0<=i).then(function(){return n.toggleElement(e[r],!0,0<=i)})}))}}},le={mixins:[pi],extends:Nt,props:{media:Boolean},data:{media:960,attrItem:"uk-tab-item"},connected:function(){var t=He(this.$el,"uk-tab-left")?"uk-tab-left":!!He(this.$el,"uk-tab-right")&&"uk-tab-right";t&&this.$create("toggle",this.$el,{cls:t,mode:"media",media:this.media})}},Mi={mixins:[ur,mi],args:"target",props:{href:String,target:null,mode:"list",queued:Boolean},data:{href:!1,target:!1,mode:"click",queued:!0},computed:{target:{get:function(t,e){var n=t.href,t=t.target;return(t=kt(t||n,e)).length&&t||[e]},watch:function(){Kt(this.target,"updatearia",[this])},immediate:!0}},events:[{name:wt+" "+bt,filter:function(){return b(this.mode,"hover")},handler:function(t){re(t)||this.toggle("toggle"+(t.type===wt?"show":"hide"))}},{name:"click",filter:function(){return b(this.mode,"click")||pt&&b(this.mode,"hover")},handler:function(t){var e;(Bt(t.target,'a[href="#"], a[href=""]')||(e=Bt(t.target,"a[href]"))&&(this.cls&&!He(this.target,this.cls.split(" ")[0])||!Ft(this.target)||e.hash&&zt(this.target,e.hash)))&&t.preventDefault(),this.toggle()}}],update:{read:function(){return!(!b(this.mode,"media")||!this.media)&&{match:this.matchMedia}},write:function(t){var e=t.match,t=this.isToggled(this.target);(e?!t:t)&&this.toggle()},events:["resize"]},methods:{toggle:function(t){var e,n=this;Kt(this.target,t||"toggle",[this])&&(this.queued?(e=this.target.filter(this.isToggled),this.toggleElement(e,!1).then(function(){return n.toggleElement(n.target.filter(function(t){return!b(e,t)}),!0)})):this.toggleElement(this.target))}}};K(Object.freeze({__proto__:null,Accordion:vi,Alert:bi,Cover:yi,Drop:Ii,Dropdown:Ii,FormCustom:Si,Gif:Ti,Grid:Ni,HeightMatch:zi,HeightViewport:Pi,Icon:qi,Img:Zi,Leader:hr,Margin:Ei,Modal:mr,Nav:gr,Navbar:vr,Offcanvas:wr,OverflowAuto:xr,Responsive:s,Scroll:m,Scrollspy:t,ScrollspyNav:dt,Sticky:ft,Svg:Hi,Switcher:Nt,Tab:le,Toggle:Mi,Video:xi,Close:Gi,Spinner:Ji,SlidenavNext:Yi,SlidenavPrevious:Yi,SearchIcon:Xi,Marker:Ui,NavbarToggleIcon:Ui,OverlayIcon:Ui,PaginationNext:Ui,PaginationPrevious:Ui,Totop:Ui}),function(t,e){return ti.component(e,t)}),ti.use(function(o){ut&&pe(function(){var t;o.update();function e(){t||(t=!0,yn.write(function(){return t=!1}),o.update(null,"resize"))}var n;Xt(window,"load resize",e),Xt(document,"loadedmetadata load",e,!0),"ResizeObserver"in window&&new ResizeObserver(e).observe(document.documentElement),Xt(window,"scroll",function(t){n||(n=!0,yn.write(function(){return n=!1}),o.update(null,t.type))},{passive:!0,capture:!0});var i,r=0;Xt(document,"animationstart",function(t){t=t.target;(Re(t,"animationName")||"").match(/^uk-.*(left|right)/)&&(r++,Re(document.body,"overflowX","hidden"),setTimeout(function(){--r||Re(document.body,"overflowX","")},U(Re(t,"animationDuration"))+100))},!0),Xt(document,mt,function(t){var s,a;i&&i(),re(t)&&(s=oe(t),a="tagName"in t.target?t.target:t.target.parentNode,i=Jt(document,vt+" "+xt,function(t){var t=oe(t),r=t.x,o=t.y;(a&&r&&100<Math.abs(s.x-r)||o&&100<Math.abs(s.y-o))&&setTimeout(function(){var t,e,n,i;Kt(a,"swipe"),Kt(a,"swipe"+(t=s.x,e=s.y,n=r,i=o,Math.abs(t-n)>=Math.abs(e-i)?0<t-n?"Left":"Right":0<e-i?"Up":"Down"))})}))},{passive:!0})})}),Ir=($r=ti).connect,Sr=$r.disconnect,ut&&window.MutationObserver&&yn.read(function(){document.body&&Ae(document.body,Ir);new MutationObserver(function(t){var i=[];t.forEach(function(t){return e=i,n=(t=t).target,void(("attributes"!==t.type?function(t){for(var e=t.addedNodes,n=t.removedNodes,i=0;i<e.length;i++)Ae(e[i],Ir);for(var r=0;r<n.length;r++)Ae(n[r],Sr);return 1}:function(t){var e=t.target,n=t.attributeName;if("href"===n)return 1;t=Qn(n);if(!(t&&t in $r))return;if(st(e,n))return $r[t](e),1;t=$r.getComponent(e,t);if(t)return t.$destroy(),1})(t)&&!e.some(function(t){return t.contains(n)})&&e.push(n.contains?n:n.parentNode));var e,n}),i.forEach(function(t){return $r.update(t)})}).observe(document,{childList:!0,subtree:!0,characterData:!0,attributes:!0}),$r._initialized=!0});Nt={mixins:[pi],props:{date:String,clsWrapper:String},data:{date:"",clsWrapper:".uk-countdown-%unit%"},computed:{date:function(t){t=t.date;return Date.parse(t)},days:function(t,e){return Ne(t.clsWrapper.replace("%unit%","days"),e)},hours:function(t,e){return Ne(t.clsWrapper.replace("%unit%","hours"),e)},minutes:function(t,e){return Ne(t.clsWrapper.replace("%unit%","minutes"),e)},seconds:function(t,e){return Ne(t.clsWrapper.replace("%unit%","seconds"),e)},units:function(){var e=this;return["days","hours","minutes","seconds"].filter(function(t){return e[t]})}},connected:function(){this.start()},disconnected:function(){var e=this;this.stop(),this.units.forEach(function(t){return ve(e[t])})},events:[{name:"visibilitychange",el:ut&&document,handler:function(){document.hidden?this.stop():this.start()}}],update:{write:function(){var i=this,r=function(t){t-=Date.now();return{total:t,seconds:t/1e3%60,minutes:t/1e3/60%60,hours:t/1e3/60/60%24,days:t/1e3/60/60/24}}(this.date);r.total<=0&&(this.stop(),r.days=r.hours=r.minutes=r.seconds=0),this.units.forEach(function(t){var e=(e=String(Math.floor(r[t]))).length<2?"0"+e:e,n=i[t];n.textContent!==e&&((e=e.split("")).length!==n.children.length&&we(n,e.map(function(){return"<span></span>"}).join("")),e.forEach(function(t,e){return n.children[e].textContent=t}))})}},methods:{start:function(){this.stop(),this.date&&this.units.length&&(this.$update(),this.timer=setInterval(this.$update,1e3))},stop:function(){this.timer&&(clearInterval(this.timer),this.timer=null)}}};var Tr,Er="uk-animation-target",le={props:{animation:Number},data:{animation:150},methods:{animate:function(t,n){var i=this;void 0===n&&(n=this.$el),function(){if(Tr)return;(Tr=be(document.head,"<style>").sheet).insertRule("."+Er+" > * {\n            margin-top: 0 !important;\n            transform: none !important;\n        }",0)}();var r=Yt(n),o=r.map(function(t){return _r(t,!0)}),e=ln(n),s=window.pageYOffset;t(),Qe.cancel(n),r.forEach(Qe.cancel),Cr(n),this.$update(n,"resize"),yn.flush();var t=ln(n),a=(r=r.concat(Yt(n).filter(function(t){return!b(r,t)}))).map(function(t,e){return!!(t.parentNode&&e in o)&&(o[e]?Ft(t)?Ar(t):{opacity:0}:{opacity:Ft(t)?1:0})}),o=a.map(function(t,e){e=r[e].parentNode===n&&(o[e]||_r(r[e]));return e&&(t?"opacity"in t||(e.opacity%1?t.opacity=1:delete e.opacity):delete e.opacity),e});return De(n,Er),r.forEach(function(t,e){return o[e]&&Re(t,o[e])}),Re(n,{height:e,display:"block"}),qn(window,s),ae.all(r.map(function(t,e){return["top","left","height","width"].some(function(t){return o[e][t]!==a[e][t]})&&Qe.start(t,a[e],i.animation,"ease")}).concat(e!==t&&Qe.start(n,{height:t},this.animation,"ease"))).then(function(){r.forEach(function(t,e){return Re(t,{display:0===a[e].opacity?"none":"",zIndex:""})}),Cr(n),i.$update(n,"resize"),yn.flush()},et)}}};function _r(t,e){var n=Re(t,"zIndex");return!!Ft(t)&&G({display:"",opacity:e?Re(t,"opacity"):"0",pointerEvents:"none",position:"absolute",zIndex:"auto"===n?me(t):n},Ar(t))}function Cr(t){Re(t.children,{height:"",left:"",opacity:"",pointerEvents:"",position:"",top:"",width:""}),Be(t,Er),Re(t,{height:"",display:""})}function Ar(t){var e=an(t),n=e.height,e=e.width,t=un(t);return{top:t.top,left:t.left,height:n,width:e}}Mi={mixins:[le],args:"target",props:{target:Boolean,selActive:Boolean},data:{target:null,selActive:!1,attrItem:"uk-filter-control",cls:"uk-active",animation:250},computed:{toggles:{get:function(t,e){t.attrItem;return Me("["+this.attrItem+"],[data-"+this.attrItem+"]",e)},watch:function(){var e,n=this;this.updateState(),!1!==this.selActive&&(e=Me(this.selActive,this.$el),this.toggles.forEach(function(t){return Le(t,n.cls,b(e,t))}))},immediate:!0},children:{get:function(t,e){return Me(t.target+" > *",e)},watch:function(t,e){var n;n=e,(t=t).length===n.length&&t.every(function(t){return~n.indexOf(t)})||this.updateState()}}},events:[{name:"click",delegate:function(){return"["+this.attrItem+"],[data-"+this.attrItem+"]"},handler:function(t){t.preventDefault(),this.apply(t.current)}}],methods:{apply:function(t){this.setState(zr(t,this.attrItem,this.getState()))},getState:function(){var n=this;return this.toggles.filter(function(t){return He(t,n.cls)}).reduce(function(t,e){return zr(e,n.attrItem,t)},{filter:{"":""},sort:[]})},setState:function(n,i){var r=this;void 0===i&&(i=!0),n=G({filter:{"":""},sort:[]},n),Kt(this.$el,"beforeFilter",[this,n]),this.toggles.forEach(function(t){return Le(t,r.cls,!!function(t,e,n){var i=n.filter;void 0===i&&(i={"":""});var r=n.sort,o=r[0],s=r[1],n=Nr(t,e),r=n.filter;void 0===r&&(r="");t=n.group;void 0===t&&(t="");e=n.sort,n=n.order;void 0===n&&(n="asc");return H(e)?t in i&&r===i[t]||!r&&t&&!(t in i)&&!i[""]:o===e&&s===n}(t,r.attrItem,n))}),ae.all(Me(this.target,this.$el).map(function(t){var e=Yt(t);return i?r.animate(function(){return Mr(n,t,e)},t):Mr(n,t,e)})).then(function(){return Kt(r.$el,"afterFilter",[r])})},updateState:function(){var t=this;yn.write(function(){return t.setState(t.getState(),!1)})}}};function Nr(t,e){return Mn(ct(t,e),["filter"])}function Mr(t,e,n){var i,r=(a=(a=t).filter,i="",K(a,function(t){return i+=t||""}),i);n.forEach(function(t){return Re(t,"display",r&&!zt(t,r)?"none":"")});var o,s,a=t.sort,t=a[0],a=a[1];t&&(o=t,s=a,Y(a=G([],n).sort(function(t,e){return ct(t,o).localeCompare(ct(e,o),void 0,{numeric:!0})*("asc"===s||-1)}),n)||be(e,a))}function zr(t,e,n){var i=Nr(t,e),r=i.filter,t=i.group,e=i.sort,i=i.order;return void 0===i&&(i="asc"),(r||H(e))&&(t?r?(delete n.filter[""],n.filter[t]=r):(delete n.filter[t],(O(n.filter)||""in n.filter)&&(n.filter={"":r||""})):n.filter={"":r||""}),H(e)||(n.sort=[e,i]),n}xi={slide:{show:function(t){return[{transform:Br(-100*t)},{transform:Br()}]},percent:Dr,translate:function(t,e){return[{transform:Br(-100*e*t)},{transform:Br(100*e*(1-t))}]}}};function Dr(t){return Math.abs(Re(t,"transform").split(",")[4]/t.offsetWidth)||0}function Br(t,e){return void 0===t&&(t=0),void 0===e&&(e="%"),t+=t?e:"",ht?"translateX("+t+")":"translate3d("+t+", 0, 0)"}function Pr(t){return"scale3d("+t+", "+t+", 1)"}var Or=G({},xi,{fade:{show:function(){return[{opacity:0},{opacity:1}]},percent:function(t){return 1-Re(t,"opacity")},translate:function(t){return[{opacity:1-t},{opacity:t}]}},scale:{show:function(){return[{opacity:0,transform:Pr(.8)},{opacity:1,transform:Pr(1)}]},percent:function(t){return 1-Re(t,"opacity")},translate:function(t){return[{opacity:1-t,transform:Pr(1-.2*t)},{opacity:t,transform:Pr(.8+.2*t)}]}}});function Hr(t,e,n){Kt(t,Zt(e,!1,!1,n))}Gi={mixins:[{props:{autoplay:Boolean,autoplayInterval:Number,pauseOnHover:Boolean},data:{autoplay:!1,autoplayInterval:7e3,pauseOnHover:!0},connected:function(){this.autoplay&&this.startAutoplay()},disconnected:function(){this.stopAutoplay()},update:function(){ot(this.slides,"tabindex","-1")},events:[{name:"visibilitychange",el:ut&&document,filter:function(){return this.autoplay},handler:function(){document.hidden?this.stopAutoplay():this.startAutoplay()}}],methods:{startAutoplay:function(){var t=this;this.stopAutoplay(),this.interval=setInterval(function(){return(!t.draggable||!Ne(":focus",t.$el))&&(!t.pauseOnHover||!zt(t.$el,":hover"))&&!t.stack.length&&t.show("next")},this.autoplayInterval)},stopAutoplay:function(){this.interval&&clearInterval(this.interval)}}},{props:{draggable:Boolean},data:{draggable:!0,threshold:10},created:function(){var i=this;["start","move","end"].forEach(function(t){var n=i[t];i[t]=function(t){var e=oe(t).x*(lt?-1:1);i.prevPos=e!==i.pos?i.pos:i.prevPos,i.pos=e,n(t)}})},events:[{name:mt,delegate:function(){return this.selSlides},handler:function(t){var e;!this.draggable||!re(t)&&(!(e=t.target).children.length&&e.childNodes.length)||Bt(t.target,Wt)||0<t.button||this.length<2||this.start(t)}},{name:"dragstart",handler:function(t){t.preventDefault()}}],methods:{start:function(){this.drag=this.pos,this._transitioner?(this.percent=this._transitioner.percent(),this.drag+=this._transitioner.getDistance()*this.percent*this.dir,this._transitioner.cancel(),this._transitioner.translate(this.percent),this.dragging=!0,this.stack=[]):this.prevIndex=this.index,Xt(document,gt,this.move,{passive:!1}),Xt(document,vt+" "+xt,this.end,!0),Re(this.list,"userSelect","none")},move:function(t){var e=this,n=this.pos-this.drag;if(!(0==n||this.prevPos===this.pos||!this.dragging&&Math.abs(n)<this.threshold)){Re(this.list,"pointerEvents","none"),t.cancelable&&t.preventDefault(),this.dragging=!0,this.dir=n<0?1:-1;for(var i=this.slides,r=this.prevIndex,o=Math.abs(n),s=this.getIndex(r+this.dir,r),a=this._getDistance(r,s)||i[r].offsetWidth;s!==r&&a<o;)this.drag-=a*this.dir,r=s,o-=a,s=this.getIndex(r+this.dir,r),a=this._getDistance(r,s)||i[r].offsetWidth;this.percent=o/a;var c,u=i[r],t=i[s],n=this.index!==s,h=r===s;[this.index,this.prevIndex].filter(function(t){return!b([s,r],t)}).forEach(function(t){Kt(i[t],"itemhidden",[e]),h&&(c=!0,e.prevIndex=r)}),(this.index===r&&this.prevIndex!==r||c)&&Kt(i[this.index],"itemshown",[this]),n&&(this.prevIndex=r,this.index=s,h||Kt(u,"beforeitemhide",[this]),Kt(t,"beforeitemshow",[this])),this._transitioner=this._translate(Math.abs(this.percent),u,!h&&t),n&&(h||Kt(u,"itemhide",[this]),Kt(t,"itemshow",[this]))}},end:function(){var t;Gt(document,gt,this.move,{passive:!1}),Gt(document,vt+" "+xt,this.end,!0),this.dragging&&(this.dragging=null,this.index===this.prevIndex?(this.percent=1-this.percent,this.dir*=-1,this._show(!1,this.index,!0),this._transitioner=null):(t=(lt?this.dir*(lt?1:-1):this.dir)<0==this.prevPos>this.pos,this.index=t?this.index:this.prevIndex,t&&(this.percent=1-this.percent),this.show(0<this.dir&&!t||this.dir<0&&t?"next":"previous",!0))),Re(this.list,{userSelect:"",pointerEvents:""}),this.drag=this.percent=null}}},{data:{selNav:!1},computed:{nav:function(t,e){return Ne(t.selNav,e)},selNavItem:function(t){t=t.attrItem;return"["+t+"],[data-"+t+"]"},navItems:function(t,e){return Me(this.selNavItem,e)}},update:{write:function(){var n=this;this.nav&&this.length!==this.nav.children.length&&we(this.nav,this.slides.map(function(t,e){return"<li "+n.attrItem+'="'+e+'"><a href></a></li>'}).join("")),Le(Me(this.selNavItem,this.$el).concat(this.nav),"uk-hidden",!this.maxIndex),this.updateNav()},events:["resize"]},events:[{name:"click",delegate:function(){return this.selNavItem},handler:function(t){t.preventDefault(),this.show(ct(t.current,this.attrItem))}},{name:"itemshow",handler:"updateNav"}],methods:{updateNav:function(){var n=this,i=this.getValidIndex();this.navItems.forEach(function(t){var e=ct(t,n.attrItem);Le(t,n.clsActive,j(e)===i),Le(t,"uk-invisible",n.finite&&("previous"===e&&0===i||"next"===e&&i>=n.maxIndex))})}}}],props:{clsActivated:Boolean,easing:String,index:Number,finite:Boolean,velocity:Number,selSlides:String},data:function(){return{easing:"ease",finite:!1,velocity:1,index:0,prevIndex:-1,stack:[],percent:0,clsActive:"uk-active",clsActivated:!1,Transitioner:!1,transitionOptions:{}}},connected:function(){this.prevIndex=-1,this.index=this.getValidIndex(this.index),this.stack=[]},disconnected:function(){Be(this.slides,this.clsActive)},computed:{duration:function(t,e){t=t.velocity;return Lr(e.offsetWidth/t)},list:function(t,e){return Ne(t.selList,e)},maxIndex:function(){return this.length-1},selSlides:function(t){return t.selList+" "+(t.selSlides||"> *")},slides:{get:function(){return Me(this.selSlides,this.$el)},watch:function(){this.$reset()}},length:function(){return this.slides.length}},events:{itemshown:function(){this.$update(this.list)}},methods:{show:function(t,e){var n=this;if(void 0===e&&(e=!1),!this.dragging&&this.length){var i=this.stack,r=e?0:i.length,o=function(){i.splice(r,1),i.length&&n.show(i.shift(),!0)};if(i[e?"unshift":"push"](t),!e&&1<i.length)2===i.length&&this._transitioner.forward(Math.min(this.duration,200));else{var s,a=this.getIndex(this.index),c=He(this.slides,this.clsActive)&&this.slides[a],u=this.getIndex(t,this.index),h=this.slides[u];if(c!==h){if(this.dir=(s=a,"next"!==(t=t)&&("previous"===t||t<s)?-1:1),this.prevIndex=a,this.index=u,c&&!Kt(c,"beforeitemhide",[this])||!Kt(h,"beforeitemshow",[this,c]))return this.index=this.prevIndex,void o();e=this._show(c,h,e).then(function(){return c&&Kt(c,"itemhidden",[n]),Kt(h,"itemshown",[n]),new ae(function(t){yn.write(function(){i.shift(),i.length?n.show(i.shift(),!0):n._transitioner=null,t()})})});return c&&Kt(c,"itemhide",[this]),Kt(h,"itemshow",[this]),e}o()}}},getIndex:function(t,e){return void 0===t&&(t=this.index),void 0===e&&(e=this.index),tt(ge(t,this.slides,e,this.finite),0,this.maxIndex)},getValidIndex:function(t,e){return void 0===t&&(t=this.index),void 0===e&&(e=this.prevIndex),this.getIndex(t,e)},_show:function(t,e,n){if(this._transitioner=this._getTransitioner(t,e,this.dir,G({easing:n?e.offsetWidth<600?"cubic-bezier(0.25, 0.46, 0.45, 0.94)":"cubic-bezier(0.165, 0.84, 0.44, 1)":this.easing},this.transitionOptions)),!n&&!t)return this._translate(1),ae.resolve();t=this.stack.length;return this._transitioner[1<t?"forward":"show"](1<t?Math.min(this.duration,75+75/(t-1)):this.duration,this.percent)},_getDistance:function(t,e){return this._getTransitioner(t,t!==e&&e).getDistance()},_translate:function(t,e,n){void 0===e&&(e=this.prevIndex),void 0===n&&(n=this.index);n=this._getTransitioner(e!==n&&e,n);return n.translate(t),n},_getTransitioner:function(t,e,n,i){return void 0===t&&(t=this.prevIndex),void 0===e&&(e=this.index),void 0===n&&(n=this.dir||1),void 0===i&&(i=this.transitionOptions),new this.Transitioner(B(t)?this.slides[t]:t,B(e)?this.slides[e]:e,n*(lt?-1:1),i)}}};function Lr(t){return.5*t+300}var Ji={mixins:[Gi],props:{animation:String},data:{animation:"slide",clsActivated:"uk-transition-active",Animations:xi,Transitioner:function(r,o,s,t){var e=t.animation,a=t.easing,n=e.percent,i=e.translate;void 0===(e=e.show)&&(e=et);var c=e(s),u=new se;return{dir:s,show:function(t,e,n){var i=this;void 0===e&&(e=0);n=n?"linear":a;return t-=Math.round(t*tt(e,-1,1)),this.translate(e),Hr(o,"itemin",{percent:e,duration:t,timing:n,dir:s}),Hr(r,"itemout",{percent:1-e,duration:t,timing:n,dir:s}),ae.all([Qe.start(o,c[1],t,n),Qe.start(r,c[0],t,n)]).then(function(){i.reset(),u.resolve()},et),u.promise},stop:function(){return Qe.stop([o,r])},cancel:function(){Qe.cancel([o,r])},reset:function(){for(var t in c[0])Re([o,r],t,"")},forward:function(t,e){return void 0===e&&(e=this.percent()),Qe.cancel([o,r]),this.show(t,e,!0)},translate:function(t){this.reset();var e=i(t,s);Re(o,e[1]),Re(r,e[0]),Hr(o,"itemtranslatein",{percent:t,dir:s}),Hr(r,"itemtranslateout",{percent:1-t,dir:s})},percent:function(){return n(r||o,o,s)},getDistance:function(){return r&&r.offsetWidth}}}},computed:{animation:function(t){var e=t.animation,t=t.Animations;return G(t[e]||t.slide,{name:e})},transitionOptions:function(){return{animation:this.animation}}},events:{"itemshow itemhide itemshown itemhidden":function(t){t=t.target;this.$update(t)},beforeitemshow:function(t){De(t.target,this.clsActive)},itemshown:function(t){De(t.target,this.clsActivated)},itemhidden:function(t){Be(t.target,this.clsActive,this.clsActivated)}}},jr={mixins:[lr,fr,mi,Ji],functional:!0,props:{delayControls:Number,preload:Number,videoAutoplay:Boolean,template:String},data:function(){return{preload:1,videoAutoplay:!1,delayControls:3e3,items:[],cls:"uk-open",clsPage:"uk-lightbox-page",selList:".uk-lightbox-items",attrItem:"uk-lightbox-item",selClose:".uk-close-large",selCaption:".uk-lightbox-caption",pauseOnHover:!1,velocity:2,Animations:Or,template:'<div class="uk-lightbox uk-overflow-hidden"> <ul class="uk-lightbox-items"></ul> <div class="uk-lightbox-toolbar uk-position-top uk-text-right uk-transition-slide-top uk-transition-opaque"> <button class="uk-lightbox-toolbar-icon uk-close-large" type="button" uk-close></button> </div> <a class="uk-lightbox-button uk-position-center-left uk-position-medium uk-transition-fade" href uk-slidenav-previous uk-lightbox-item="previous"></a> <a class="uk-lightbox-button uk-position-center-right uk-position-medium uk-transition-fade" href uk-slidenav-next uk-lightbox-item="next"></a> <div class="uk-lightbox-toolbar uk-lightbox-caption uk-position-bottom uk-text-center uk-transition-slide-bottom uk-transition-opaque"></div> </div>'}},created:function(){var t=Ne(this.template),e=Ne(this.selList,t);this.items.forEach(function(){return be(e,"<li>")}),this.$mount(be(this.container,t))},computed:{caption:function(t,e){t.selCaption;return Ne(".uk-lightbox-caption",e)}},events:[{name:gt+" "+mt+" keydown",handler:"showControls"},{name:"click",self:!0,delegate:function(){return this.selSlides},handler:function(t){t.defaultPrevented||this.hide()}},{name:"shown",self:!0,handler:function(){this.showControls()}},{name:"hide",self:!0,handler:function(){this.hideControls(),Be(this.slides,this.clsActive),Qe.stop(this.slides)}},{name:"hidden",self:!0,handler:function(){this.$destroy(!0)}},{name:"keyup",el:ut&&document,handler:function(t){if(this.isToggled(this.$el)&&this.draggable)switch(t.keyCode){case 37:this.show("previous");break;case 39:this.show("next")}}},{name:"beforeitemshow",handler:function(t){this.isToggled()||(this.draggable=!1,t.preventDefault(),this.toggleElement(this.$el,!0,!1),this.animation=Or.scale,Be(t.target,this.clsActive),this.stack.splice(1,0,this.index))}},{name:"itemshow",handler:function(){we(this.caption,this.getItem().caption||"");for(var t=-this.preload;t<=this.preload;t++)this.loadItem(this.index+t)}},{name:"itemshown",handler:function(){this.draggable=this.$props.draggable}},{name:"itemload",handler:function(t,n){var i=this,r=n.source,e=n.type,o=n.alt;void 0===o&&(o="");var s,a,c,u=n.poster,h=n.attrs;void 0===h&&(h={}),this.setItem(n,"<span uk-spinner></span>"),r&&(a={frameborder:"0",allow:"autoplay",allowfullscreen:"",style:"max-width: 100%; box-sizing: border-box;","uk-responsive":"","uk-video":""+this.videoAutoplay},"image"===e||r.match(/\.(jpe?g|png|gif|svg|webp)($|\?)/i)?fe(r,h.srcset,h.size).then(function(t){var e=t.width,t=t.height;return i.setItem(n,Fr("img",G({src:r,width:e,height:t,alt:o},h)))},function(){return i.setError(n)}):"video"===e||r.match(/\.(mp4|webm|ogv)($|\?)/i)?(Xt(c=Fr("video",G({src:r,poster:u,controls:"",playsinline:"","uk-video":""+this.videoAutoplay},h)),"loadedmetadata",function(){ot(c,{width:c.videoWidth,height:c.videoHeight}),i.setItem(n,c)}),Xt(c,"error",function(){return i.setError(n)})):"iframe"===e||r.match(/\.(html|php)($|\?)/i)?this.setItem(n,Fr("iframe",G({src:r,frameborder:"0",allowfullscreen:"",class:"uk-lightbox-iframe"},h))):(s=r.match(/\/\/(?:.*?youtube(-nocookie)?\..*?[?&]v=|youtu\.be\/)([\w-]{11})[&?]?(.*)?/))?this.setItem(n,Fr("iframe",G({src:"https://www.youtube"+(s[1]||"")+".com/embed/"+s[2]+(s[3]?"?"+s[3]:""),width:1920,height:1080},a,h))):(s=r.match(/\/\/.*?vimeo\.[a-z]+\/(\d+)[&?]?(.*)?/))&&de("https://vimeo.com/api/oembed.json?maxwidth=1920&url="+encodeURI(r),{responseType:"json",withCredentials:!1}).then(function(t){var e=t.response,t=e.height,e=e.width;return i.setItem(n,Fr("iframe",G({src:"https://player.vimeo.com/video/"+s[1]+(s[2]?"?"+s[2]:""),width:e,height:t},a,h)))},function(){return i.setError(n)}))}}],methods:{loadItem:function(t){void 0===t&&(t=this.index);t=this.getItem(t);this.getSlide(t).childElementCount||Kt(this.$el,"itemload",[t])},getItem:function(t){return void 0===t&&(t=this.index),this.items[ge(t,this.slides)]},setItem:function(t,e){Kt(this.$el,"itemloaded",[this,we(this.getSlide(t),e)])},getSlide:function(t){return this.slides[this.items.indexOf(t)]},setError:function(t){this.setItem(t,'<span uk-icon="icon: bolt; ratio: 2"></span>')},showControls:function(){clearTimeout(this.controlsTimer),this.controlsTimer=setTimeout(this.hideControls,this.delayControls),De(this.$el,"uk-active","uk-transition-active")},hideControls:function(){Be(this.$el,"uk-active","uk-transition-active")}}};function Fr(t,e){t=Ce("<"+t+">");return ot(t,e),t}Yi={install:function(t,e){t.lightboxPanel||t.component("lightboxPanel",jr);G(e.props,t.component("lightboxPanel").options.props)},props:{toggle:String},data:{toggle:"a"},computed:{toggles:{get:function(t,e){return Me(t.toggle,e)},watch:function(){this.hide()}}},disconnected:function(){this.hide()},events:[{name:"click",delegate:function(){return this.toggle+":not(.uk-disabled)"},handler:function(t){t.preventDefault(),this.show(t.current)}}],methods:{show:function(t){var e,n=this,i=Q(this.toggles.map(Wr),"source");return N(t)&&(e=Wr(t).source,t=y(i,function(t){t=t.source;return e===t})),this.panel=this.panel||this.$create("lightboxPanel",G({},this.$props,{items:i})),Xt(this.panel.$el,"hidden",function(){return n.panel=!1}),this.panel.show(t)},hide:function(){return this.panel&&this.panel.hide()}}};function Wr(e){var n={};return["href","caption","type","poster","alt","attrs"].forEach(function(t){n["href"===t?"source":t]=ct(e,t)}),n.attrs=Mn(n.attrs),n}Ui={functional:!0,args:["message","status"],data:{message:"",status:"",timeout:5e3,group:null,pos:"top-center",clsContainer:"uk-notification",clsClose:"uk-notification-close",clsMsg:"uk-notification-message"},install:function(i){i.notification.closeAll=function(e,n){Ae(document.body,function(t){t=i.getComponent(t,"notification");!t||e&&e!==t.group||t.close(n)})}},computed:{marginProp:function(t){return"margin"+(g(t.pos,"top")?"Top":"Bottom")},startProps:function(){var t={opacity:0};return t[this.marginProp]=-this.$el.offsetHeight,t}},created:function(){var t=Ne("."+this.clsContainer+"-"+this.pos,this.$container)||be(this.$container,'<div class="'+this.clsContainer+" "+this.clsContainer+"-"+this.pos+'" style="display: block"></div>');this.$mount(be(t,'<div class="'+this.clsMsg+(this.status?" "+this.clsMsg+"-"+this.status:"")+'"> <a href class="'+this.clsClose+'" data-uk-close></a> <div>'+this.message+"</div> </div>"))},connected:function(){var t,e=this,n=F(Re(this.$el,this.marginProp));Qe.start(Re(this.$el,this.startProps),((t={opacity:1})[this.marginProp]=n,t)).then(function(){e.timeout&&(e.timer=setTimeout(e.close,e.timeout))})},events:((Xi={click:function(t){Bt(t.target,'a[href="#"],a[href=""]')&&t.preventDefault(),this.close()}})[wt]=function(){this.timer&&clearTimeout(this.timer)},Xi[bt]=function(){this.timeout&&(this.timer=setTimeout(this.close,this.timeout))},Xi),methods:{close:function(t){function e(){var t=n.$el.parentNode;Kt(n.$el,"close",[n]),$e(n.$el),t&&!t.hasChildNodes()&&$e(t)}var n=this;this.timer&&clearTimeout(this.timer),t?e():Qe.start(this.$el,this.startProps).then(e)}}};var Vr=["x","y","bgx","bgy","rotate","scale","color","backgroundColor","borderColor","opacity","blur","hue","grayscale","invert","saturate","sepia","fopacity","stroke"],fr={mixins:[ur],props:Vr.reduce(function(t,e){return t[e]="list",t},{}),data:Vr.reduce(function(t,e){return t[e]=void 0,t},{}),computed:{props:function(f,p){var m=this;return Vr.reduce(function(t,e){if(H(f[e]))return t;var n,i,r=e.match(/color/i),o=r||"opacity"===e,s=f[e].slice(0);o&&Re(p,e,""),s.length<2&&s.unshift(("scale"===e?1:o?Re(p,e):0)||0);var a,c,u,h,l,o=s.reduce(function(t,e){return D(e)&&e.replace(/-|\d/g,"").trim()||t},"");if(r?(r=p.style.color,s=s.map(function(t){return Re(Re(p,"color",t),"color").split(/[(),]/g).slice(1,-1).concat(1).slice(0,4).map(F)}),p.style.color=r):g(e,"bg")?(a="bgy"===e?"height":"width",s=s.map(function(t){return bn(t,a,m.$el)}),Re(p,"background-position-"+e[2],""),i=Re(p,"backgroundPosition").split(" ")["x"===e[2]?0:1],n=m.covers?(c=Math.min.apply(Math,s),u=Math.max.apply(Math,s),h=s.indexOf(c)<s.indexOf(u),l=u-c,s=s.map(function(t){return t-(h?c:u)}),(h?-l:0)+"px"):i):s=s.map(F),"stroke"===e){if(!s.some(function(t){return t}))return t;var d=Wi(m.$el);Re(p,"strokeDasharray",d),"%"===o&&(s=s.map(function(t){return t*d/100})),s=s.reverse(),e="strokeDashoffset"}return t[e]={steps:s,unit:o,pos:n,bgPos:i,diff:l},t},{})},bgProps:function(){var e=this;return["bgx","bgy"].filter(function(t){return t in e.props})},covers:function(t,e){return i=(n=e).style.backgroundSize,e="cover"===Re(Re(n,"backgroundSize",""),"backgroundSize"),n.style.backgroundSize=i,e;var n,i}},disconnected:function(){delete this._image},update:{read:function(t){var e,n,a,c,u,h=this;t.active=this.matchMedia,t.active&&(t.image||!this.covers||!this.bgProps.length||(e=Re(this.$el,"backgroundImage").replace(/^none|url\(["']?(.+?)["']?\)$/,"$1"))&&((n=new Image).src=e,(t.image=n).naturalWidth||(n.onload=function(){return h.$update()})),(n=t.image)&&n.naturalWidth&&(a={width:this.$el.offsetWidth,height:this.$el.offsetHeight},c={width:n.naturalWidth,height:n.naturalHeight},u=rt.cover(c,a),this.bgProps.forEach(function(t){var e,n=h.props[t],i=n.diff,r=n.bgPos,o=n.steps,n="bgy"===t?"height":"width",s=u[n]-a[n];s<i?a[n]=u[n]+i-s:i<s&&((e=a[n]/bn(r,n,h.$el))&&(h.props[t].steps=o.map(function(t){return t-(s-i)/e}))),u=rt.cover(c,a)}),t.dim=u))},write:function(t){var e=t.dim;t.active?e&&Re(this.$el,{backgroundSize:e.width+"px "+e.height+"px",backgroundRepeat:"no-repeat"}):Re(this.$el,{backgroundSize:"",backgroundRepeat:""})},events:["resize"]},methods:{reset:function(){var n=this;K(this.getCss(0),function(t,e){return Re(n.$el,e,"")})},getCss:function(l){var d=this.props;return Object.keys(d).reduce(function(t,e){var n=d[e],i=n.steps,r=n.unit,o=n.pos,s=function(t,e,n){void 0===n&&(n=2);var i=Rr(t,e),t=i[0],e=i[1],i=i[2];return(B(t)?t+Math.abs(t-e)*i*(t<e?1:-1):+e).toFixed(n)}(i,l);switch(e){case"x":case"y":r=r||"px",t.transform+=" translate"+p(e)+"("+F(s).toFixed("px"===r?0:2)+r+")";break;case"rotate":r=r||"deg",t.transform+=" rotate("+(s+r)+")";break;case"scale":t.transform+=" scale("+s+")";break;case"bgy":case"bgx":t["background-position-"+e[2]]="calc("+o+" + "+s+"px)";break;case"color":case"backgroundColor":case"borderColor":var a=Rr(i,l),c=a[0],u=a[1],h=a[2];t[e]="rgba("+c.map(function(t,e){return t+=h*(u[e]-t),3===e?F(t):parseInt(t,10)}).join(",")+")";break;case"blur":r=r||"px",t.filter+=" blur("+(s+r)+")";break;case"hue":r=r||"deg",t.filter+=" hue-rotate("+(s+r)+")";break;case"fopacity":r=r||"%",t.filter+=" opacity("+(s+r)+")";break;case"grayscale":case"invert":case"saturate":case"sepia":r=r||"%",t.filter+=" "+e+"("+(s+r)+")";break;default:t[e]=s}return t},{transform:"",filter:""})}}};function Rr(t,e){var n=t.length-1,i=Math.min(Math.floor(n*e),n-1),i=t.slice(i,i+2);return i.push(1===e?1:e%(1/n)*n),i}Xi={mixins:[fr],props:{target:String,viewport:Number,easing:Number},data:{target:!1,viewport:1,easing:1},computed:{target:function(t,e){t=t.target;return function t(e){return e?"offsetTop"in e?e:t(e.parentNode):document.body}(t&&yt(t,e)||e)}},update:{read:function(t,e){var n=t.percent;if("scroll"!==e&&(n=!1),t.active){var i=n;return e=Yn(this.target)/(this.viewport||1),t=this.easing,{percent:n=tt(e*(1-(t-t*e))),style:i!==n&&this.getCss(n)}}},write:function(t){var e=t.style;t.active?e&&Re(this.$el,e):this.reset()},events:["scroll","resize"]}};ur={update:{write:function(){var t;this.stack.length||this.dragging||(t=this.getValidIndex(this.index),~this.prevIndex&&this.index===t||this.show(t))},events:["resize"]}};function qr(t,e,n){var i=Xr(t,e);return n?i-(t=t,an(e).width/2-an(t).width/2):Math.min(i,Ur(e))}function Ur(t){return Math.max(0,Yr(t)-an(t).width)}function Yr(t){return Jr(t).reduce(function(t,e){return an(e).width+t},0)}function Xr(t,e){return(un(t).left+(lt?an(t).width-an(e).width:0))*(lt?-1:1)}function Gr(t,e,n){Kt(t,Zt(e,!1,!1,n))}function Jr(t){return Yt(t)}Gi={mixins:[pi,Gi,ur],props:{center:Boolean,sets:Boolean},data:{center:!1,sets:!1,attrItem:"uk-slider-item",selList:".uk-slider-items",selNav:".uk-slider-nav",clsContainer:"uk-slider-container",Transitioner:function(i,r,o,t){var e=t.center,s=t.easing,a=t.list,c=new se,n=i?qr(i,a,e):qr(r,a,e)+an(r).width*o,u=r?qr(r,a,e):n+an(i).width*o*(lt?-1:1);return{dir:o,show:function(t,e,n){void 0===e&&(e=0);n=n?"linear":s;return t-=Math.round(t*tt(e,-1,1)),this.translate(e),i&&this.updateTranslates(),e=i?e:tt(e,0,1),Gr(this.getItemIn(),"itemin",{percent:e,duration:t,timing:n,dir:o}),i&&Gr(this.getItemIn(!0),"itemout",{percent:1-e,duration:t,timing:n,dir:o}),Qe.start(a,{transform:Br(-u*(lt?-1:1),"px")},t,n).then(c.resolve,et),c.promise},stop:function(){return Qe.stop(a)},cancel:function(){Qe.cancel(a)},reset:function(){Re(a,"transform","")},forward:function(t,e){return void 0===e&&(e=this.percent()),Qe.cancel(a),this.show(t,e,!0)},translate:function(t){var e=this.getDistance()*o*(lt?-1:1);Re(a,"transform",Br(tt(e-e*t-u,-Yr(a),an(a).width)*(lt?-1:1),"px")),this.updateTranslates(),i&&(t=tt(t,-1,1),Gr(this.getItemIn(),"itemtranslatein",{percent:t,dir:o}),Gr(this.getItemIn(!0),"itemtranslateout",{percent:1-t,dir:o}))},percent:function(){return Math.abs((Re(a,"transform").split(",")[4]*(lt?-1:1)+n)/(u-n))},getDistance:function(){return Math.abs(u-n)},getItemIn:function(t){void 0===t&&(t=!1);var e=this.getActives(),n=Z(Jr(a),"offsetLeft"),e=me(n,e[0<o*(t?-1:1)?e.length-1:0]);return~e&&n[e+(i&&!t?o:0)]},getActives:function(){var n=qr(i||r,a,e);return Z(Jr(a).filter(function(t){var e=Xr(t,a);return n<=e&&e+an(t).width<=an(a).width+n}),"offsetLeft")},updateTranslates:function(){var n=this.getActives();Jr(a).forEach(function(t){var e=b(n,t);Gr(t,"itemtranslate"+(e?"in":"out"),{percent:e?1:0,dir:t.offsetLeft<=r.offsetLeft?1:-1})})}}}},computed:{avgWidth:function(){return Yr(this.list)/this.length},finite:function(t){return t.finite||Math.ceil(Yr(this.list))<an(this.list).width+Jr(this.list).reduce(function(t,e){return Math.max(t,an(e).width)},0)+this.center},maxIndex:function(){if(!this.finite||this.center&&!this.sets)return this.length-1;if(this.center)return J(this.sets);Re(this.slides,"order","");for(var t=Ur(this.list),e=this.length;e--;)if(Xr(this.list.children[e],this.list)<t)return Math.min(e+1,this.length-1);return 0},sets:function(t){var r=this,t=t.sets,o=an(this.list).width/(this.center?2:1),s=0,a=o,c=0;return!O(t=t&&this.slides.reduce(function(t,e,n){var i=an(e).width;return s<c+i&&(!r.center&&n>r.maxIndex&&(n=r.maxIndex),b(t,n)||(e=r.slides[n+1],r.center&&e&&i<a-an(e).width/2?a-=i:(a=o,t.push(n),s=c+o+(r.center?i/2:0)))),c+=i,t},[]))&&t},transitionOptions:function(){return{center:this.center,list:this.list}}},connected:function(){Le(this.$el,this.clsContainer,!Ne("."+this.clsContainer,this.$el))},update:{write:function(){var n=this;Me("["+this.attrItem+"],[data-"+this.attrItem+"]",this.$el).forEach(function(t){var e=ct(t,n.attrItem);n.maxIndex&&Le(t,"uk-hidden",P(e)&&(n.sets&&!b(n.sets,F(e))||e>n.maxIndex))}),!this.length||this.dragging||this.stack.length||(this.reorder(),this._translate(1));var e=this._getTransitioner(this.index).getActives();this.slides.forEach(function(t){return Le(t,n.clsActive,b(e,t))}),this.sets&&!b(this.sets,F(this.index))||this.slides.forEach(function(t){return Le(t,n.clsActivated,b(e,t))})},events:["resize"]},events:{beforeitemshow:function(t){!this.dragging&&this.sets&&this.stack.length<2&&!b(this.sets,this.index)&&(this.index=this.getValidIndex());var e=Math.abs(this.index-this.prevIndex+(0<this.dir&&this.index<this.prevIndex||this.dir<0&&this.index>this.prevIndex?(this.maxIndex+1)*this.dir:0));if(!this.dragging&&1<e){for(var n=0;n<e;n++)this.stack.splice(1,0,0<this.dir?"next":"previous");t.preventDefault()}else this.duration=Lr(this.avgWidth/this.velocity)*(an(this.dir<0||!this.slides[this.prevIndex]?this.slides[this.index]:this.slides[this.prevIndex]).width/this.avgWidth),this.reorder()},itemshow:function(){~this.prevIndex&&De(this._getTransitioner().getItemIn(),this.clsActive)}},methods:{reorder:function(){var n=this;if(this.finite)Re(this.slides,"order","");else{var i=0<this.dir&&this.slides[this.prevIndex]?this.prevIndex:this.index;if(this.slides.forEach(function(t,e){return Re(t,"order",0<n.dir&&e<i?1:n.dir<0&&e>=n.index?-1:"")}),this.center)for(var t=this.slides[i],e=an(this.list).width/2-an(t).width/2,r=0;0<e;){var o=this.getIndex(--r+i,i),s=this.slides[o];Re(s,"order",i<o?-2:-1),e-=an(s).width}}},getValidIndex:function(t,e){if(void 0===t&&(t=this.index),void 0===e&&(e=this.prevIndex),t=this.getIndex(t,e),!this.sets)return t;var n;do{if(b(this.sets,t))return t}while(n=t,(t=this.getIndex(t+this.dir,e))!==n);return t}}},fr={mixins:[fr],data:{selItem:"!li"},computed:{item:function(t,e){return yt(t.selItem,e)}},events:[{name:"itemshown",self:!0,el:function(){return this.item},handler:function(){Re(this.$el,this.getCss(.5))}},{name:"itemin itemout",self:!0,el:function(){return this.item},handler:function(t){var e=t.type,n=t.detail,i=n.percent,r=n.duration,t=n.timing,n=n.dir;Qe.cancel(this.$el),Re(this.$el,this.getCss(Zr(e,n,i))),Qe.start(this.$el,this.getCss(Kr(e)?.5:0<n?1:0),r,t).catch(et)}},{name:"transitioncanceled transitionend",self:!0,el:function(){return this.item},handler:function(){Qe.cancel(this.$el)}},{name:"itemtranslatein itemtranslateout",self:!0,el:function(){return this.item},handler:function(t){var e=t.type,n=t.detail,t=n.percent,n=n.dir;Qe.cancel(this.$el),Re(this.$el,this.getCss(Zr(e,n,t)))}}]};function Kr(t){return u(t,"in")}function Zr(t,e,n){return n/=2,Kr(t)?e<0?1-n:n:e<0?n:1-n}var Qr,xi=G({},xi,{fade:{show:function(){return[{opacity:0,zIndex:0},{zIndex:-1}]},percent:function(t){return 1-Re(t,"opacity")},translate:function(t){return[{opacity:1-t,zIndex:0},{zIndex:-1}]}},scale:{show:function(){return[{opacity:0,transform:Pr(1.5),zIndex:0},{zIndex:-1}]},percent:function(t){return 1-Re(t,"opacity")},translate:function(t){return[{opacity:1-t,transform:Pr(1+.5*t),zIndex:0},{zIndex:-1}]}},pull:{show:function(t){return t<0?[{transform:Br(30),zIndex:-1},{transform:Br(),zIndex:0}]:[{transform:Br(-100),zIndex:0},{transform:Br(),zIndex:-1}]},percent:function(t,e,n){return n<0?1-Dr(e):Dr(t)},translate:function(t,e){return e<0?[{transform:Br(30*t),zIndex:-1},{transform:Br(-100*(1-t)),zIndex:0}]:[{transform:Br(100*-t),zIndex:0},{transform:Br(30*(1-t)),zIndex:-1}]}},push:{show:function(t){return t<0?[{transform:Br(100),zIndex:0},{transform:Br(),zIndex:-1}]:[{transform:Br(-30),zIndex:-1},{transform:Br(),zIndex:0}]},percent:function(t,e,n){return 0<n?1-Dr(e):Dr(t)},translate:function(t,e){return e<0?[{transform:Br(100*t),zIndex:0},{transform:Br(-30*(1-t)),zIndex:-1}]:[{transform:Br(-30*t),zIndex:-1},{transform:Br(100*(1-t)),zIndex:0}]}}}),xi={mixins:[pi,Ji,ur],props:{ratio:String,minHeight:Number,maxHeight:Number},data:{ratio:"16:9",minHeight:!1,maxHeight:!1,selList:".uk-slideshow-items",attrItem:"uk-slideshow-item",selNav:".uk-slideshow-nav",Animations:xi},update:{read:function(){var t=this.ratio.split(":").map(Number),e=t[0],t=(t=t[1])*this.list.offsetWidth/e||0;return this.minHeight&&(t=Math.max(this.minHeight,t)),this.maxHeight&&(t=Math.min(this.maxHeight,t)),{height:t-pn(this.list,"height","content-box")}},write:function(t){t=t.height;0<t&&Re(this.list,"minHeight",t)},events:["resize"]}},le={mixins:[pi,le],props:{group:String,threshold:Number,clsItem:String,clsPlaceholder:String,clsDrag:String,clsDragState:String,clsBase:String,clsNoDrag:String,clsEmpty:String,clsCustom:String,handle:String},data:{group:!1,threshold:5,clsItem:"uk-sortable-item",clsPlaceholder:"uk-sortable-placeholder",clsDrag:"uk-sortable-drag",clsDragState:"uk-drag",clsBase:"uk-sortable",clsNoDrag:"uk-sortable-nodrag",clsEmpty:"uk-sortable-empty",clsCustom:"",handle:!1,pos:{}},created:function(){var n=this;["init","start","move","end"].forEach(function(t){var e=n[t];n[t]=function(t){G(n.pos,oe(t)),e(t)}})},events:{name:mt,passive:!1,handler:"init"},computed:{target:function(){return(this.$el.tBodies||[this.$el])[0]},items:function(){return Yt(this.target)},isEmpty:{get:function(){return O(this.items)},watch:function(t){Le(this.target,this.clsEmpty,t)},immediate:!0},handles:{get:function(t,e){t=t.handle;return t?Me(t,e):this.items},watch:function(t,e){Re(e,{touchAction:"",userSelect:""}),Re(t,{touchAction:pt?"none":"",userSelect:"none"})},immediate:!0}},update:{write:function(){if(this.drag&&Pt(this.placeholder)){var t=this.pos,e=t.x,n=t.y,i=this.origin,t=i.offsetTop,i=i.offsetLeft,r=document.elementFromPoint(e,n);Re(this.drag,{top:n-t,left:e-i});t=this.getSortable(r),e=this.getSortable(this.placeholder),i=t!==e;if(t&&!qt(r,this.placeholder)&&(!i||t.group&&t.group===e.group)){if(r=t.target===r.parentNode&&r||t.items.filter(function(t){return qt(r,t)})[0],i)e.remove(this.placeholder);else if(!r)return;t.insert(this.placeholder,r),b(this.touched,t)||this.touched.push(t)}}},events:["move"]},methods:{init:function(t){var e=t.target,n=t.button,i=t.defaultPrevented,r=this.items.filter(function(t){return qt(e,t)})[0];!r||i||0<n||Vt(e)||qt(e,"."+this.clsNoDrag)||this.handle&&!qt(e,this.handle)||(t.preventDefault(),this.touched=[this],this.placeholder=r,this.origin=G({target:e,index:me(r)},this.pos),Xt(document,gt,this.move),Xt(document,vt,this.end),this.threshold||this.start(t))},start:function(t){this.drag=function(t,e){t=be(t,e.outerHTML.replace(/(^<)(?:li|tr)|(?:li|tr)(\/>$)/g,"$1div$2"));return t.style.setProperty("margin","0","important"),Re(t,G({boxSizing:"border-box",width:e.offsetWidth,height:e.offsetHeight,overflow:"hidden"},Re(e,["paddingLeft","paddingRight","paddingTop","paddingBottom"]))),ln(t.firstElementChild,ln(e.firstElementChild)),t}(this.$container,this.placeholder);var e,n,i=this.placeholder.getBoundingClientRect(),r=i.left,i=i.top;G(this.origin,{offsetLeft:this.pos.x-r,offsetTop:this.pos.y-i}),De(this.drag,this.clsDrag,this.clsCustom),De(this.placeholder,this.clsPlaceholder),De(this.items,this.clsItem),De(document.documentElement,this.clsDragState),Kt(this.$el,"start",[this,this.placeholder]),e=this.pos,n=Date.now(),Qr=setInterval(function(){var t=e.x,s=e.y;s+=window.pageYOffset;var a=.3*(Date.now()-n);n=Date.now(),Xn(document.elementFromPoint(t,e.y)).some(function(t){var e=t.scrollTop,n=t.scrollHeight,i=an(Gn(t)),r=i.top,o=i.bottom,i=i.height;if(r<s&&s<r+35)e-=a;else{if(!(s<o&&o-35<s))return;e+=a}if(0<e&&e<n-i)return qn(t,e),!0})},15),this.move(t)},move:function(t){this.drag?this.$emit("move"):(Math.abs(this.pos.x-this.origin.x)>this.threshold||Math.abs(this.pos.y-this.origin.y)>this.threshold)&&this.start(t)},end:function(){var t,e;Gt(document,gt,this.move),Gt(document,vt,this.end),Gt(window,"scroll",this.scroll),this.drag&&(clearInterval(Qr),t=this.getSortable(this.placeholder),this===t?this.origin.index!==me(this.placeholder)&&Kt(this.$el,"moved",[this,this.placeholder]):(Kt(t.$el,"added",[t,this.placeholder]),Kt(this.$el,"removed",[this,this.placeholder])),Kt(this.$el,"stop",[this,this.placeholder]),$e(this.drag),this.drag=null,e=this.touched.map(function(t){return t.clsPlaceholder+" "+t.clsItem}).join(" "),this.touched.forEach(function(t){return Be(t.items,e)}),Be(document.documentElement,this.clsDragState))},insert:function(n,i){var r=this;De(this.items,this.clsItem);function t(){var t,e;i?(!qt(n,r.target)||(e=i,(t=n).parentNode===e.parentNode&&me(t)>me(e))?xe:ye)(i,n):be(r.target,n)}this.animation?this.animate(t):t()},remove:function(t){qt(t,this.target)&&(this.animation?this.animate(function(){return $e(t)}):$e(t))},getSortable:function(t){return t&&(this.$getComponent(t,"sortable")||this.getSortable(t.parentNode))}}};var to=[],bt={mixins:[lr,mi,$i],args:"title",props:{delay:Number,title:String},data:{pos:"top",title:"",delay:0,animation:["uk-animation-scale-up"],duration:100,cls:"uk-active",clsPos:"uk-tooltip"},beforeConnect:function(){this._hasTitle=st(this.$el,"title"),ot(this.$el,{title:"","aria-expanded":!1})},disconnected:function(){this.hide(),ot(this.$el,{title:this._hasTitle?this.title:null,"aria-expanded":null})},methods:{show:function(){var e=this;!this.isActive()&&this.title&&(to.forEach(function(t){return t.hide()}),to.push(this),this._unbind=Xt(document,vt,function(t){return!qt(t.target,e.$el)&&e.hide()}),clearTimeout(this.showTimer),this.showTimer=setTimeout(this._show,this.delay))},hide:function(){var t=this;this.isActive()&&!zt(this.$el,"input:focus")&&this.toggleElement(this.tooltip,!1,!1).then(function(){to.splice(to.indexOf(t),1),clearTimeout(t.showTimer),t.tooltip=$e(t.tooltip),t._unbind()})},_show:function(){var e=this;this.tooltip=be(this.container,'<div class="'+this.clsPos+'"> <div class="'+this.clsPos+'-inner">'+this.title+"</div> </div>"),Xt(this.tooltip,"toggled",function(){var t=e.isToggled(e.tooltip);ot(e.$el,"aria-expanded",t),t&&(e.positionAt(e.tooltip,e.$el),e.origin="y"===e.getAxis()?wn(e.dir)+"-"+e.align:e.align+"-"+wn(e.dir))}),this.toggleElement(this.tooltip,!0)},isActive:function(){return b(to,this)}},events:(($i={focus:"show",blur:"hide"})[wt+" "+bt]=function(t){re(t)||(t.type===wt?this.show():this.hide())},$i[mt]=function(t){re(t)&&(this.isActive()?this.hide():this.show())},$i)},$i={props:{allow:String,clsDragover:String,concurrent:Number,maxSize:Number,method:String,mime:String,msgInvalidMime:String,msgInvalidName:String,msgInvalidSize:String,multiple:Boolean,name:String,params:Object,type:String,url:String},data:{allow:!1,clsDragover:"uk-dragover",concurrent:1,maxSize:0,method:"POST",mime:!1,msgInvalidMime:"Invalid File Type: %s",msgInvalidName:"Invalid File Name: %s",msgInvalidSize:"Invalid File Size: %s Kilobytes Max",multiple:!1,name:"files[]",params:{},type:"",url:"",abort:et,beforeAll:et,beforeSend:et,complete:et,completeAll:et,error:et,fail:et,load:et,loadEnd:et,loadStart:et,progress:et},events:{change:function(t){zt(t.target,'input[type="file"]')&&(t.preventDefault(),t.target.files&&this.upload(t.target.files),t.target.value="")},drop:function(t){no(t);t=t.dataTransfer;t&&t.files&&(Be(this.$el,this.clsDragover),this.upload(t.files))},dragenter:function(t){no(t)},dragover:function(t){no(t),De(this.$el,this.clsDragover)},dragleave:function(t){no(t),Be(this.$el,this.clsDragover)}},methods:{upload:function(t){var i=this;if(t.length){Kt(this.$el,"upload",[t]);for(var e=0;e<t.length;e++){if(this.maxSize&&1e3*this.maxSize<t[e].size)return void this.fail(this.msgInvalidSize.replace("%s",this.maxSize));if(this.allow&&!eo(this.allow,t[e].name))return void this.fail(this.msgInvalidName.replace("%s",this.allow));if(this.mime&&!eo(this.mime,t[e].type))return void this.fail(this.msgInvalidMime.replace("%s",this.mime))}this.multiple||(t=[t[0]]),this.beforeAll(this,t);var r=function(t,e){for(var n=[],i=0;i<t.length;i+=e){for(var r=[],o=0;o<e;o++)r.push(t[i+o]);n.push(r)}return n}(t,this.concurrent),o=function(t){var e,n=new FormData;for(e in t.forEach(function(t){return n.append(i.name,t)}),i.params)n.append(e,i.params[e]);de(i.url,{data:n,method:i.method,responseType:i.type,beforeSend:function(t){var e=t.xhr;e.upload&&Xt(e.upload,"progress",i.progress),["loadStart","load","loadEnd","abort"].forEach(function(t){return Xt(e,t.toLowerCase(),i[t])}),i.beforeSend(t)}}).then(function(t){i.complete(t),r.length?o(r.shift()):i.completeAll(t)},function(t){return i.error(t)})};o(r.shift())}}}};function eo(t,e){return e.match(new RegExp("^"+t.replace(/\//g,"\\/").replace(/\*\*/g,"(\\/[^\\/]+)*").replace(/\*/g,"[^\\/]+").replace(/((?!\\))\?/g,"$1.")+"$","i"))}function no(t){t.preventDefault(),t.stopPropagation()}return K(Object.freeze({__proto__:null,Countdown:Nt,Filter:Mi,Lightbox:Yi,LightboxPanel:jr,Notification:Ui,Parallax:Xi,Slider:Gi,SliderParallax:fr,Slideshow:xi,SlideshowParallax:fr,Sortable:le,Tooltip:bt,Upload:$i}),function(t,e){return ti.component(e,t)}),ti});
},{}],"../node_modules/uikit/dist/js/uikit-icons.min.js":[function(require,module,exports) {
var define;
/*! UIkit 3.5.10 | https://www.getuikit.com | (c) 2014 - 2020 YOOtheme | MIT License */

!function(t,i){"object"==typeof exports&&"undefined"!=typeof module?module.exports=i():"function"==typeof define&&define.amd?define("uikiticons",i):(t="undefined"!=typeof globalThis?globalThis:t||self).UIkitIcons=i()}(this,function(){"use strict";function i(t){i.installed||t.icon.add({"500px":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.624,11.866c-0.141,0.132,0.479,0.658,0.662,0.418c0.051-0.046,0.607-0.61,0.662-0.664c0,0,0.738,0.719,0.814,0.719 c0.1,0,0.207-0.055,0.322-0.17c0.27-0.269,0.135-0.416,0.066-0.495l-0.631-0.616l0.658-0.668c0.146-0.156,0.021-0.314-0.1-0.449 c-0.182-0.18-0.359-0.226-0.471-0.125l-0.656,0.654l-0.654-0.654c-0.033-0.034-0.08-0.045-0.124-0.045 c-0.079,0-0.191,0.068-0.307,0.181c-0.202,0.202-0.247,0.351-0.133,0.462l0.665,0.665L9.624,11.866z"/><path d="M11.066,2.884c-1.061,0-2.185,0.248-3.011,0.604c-0.087,0.034-0.141,0.106-0.15,0.205C7.893,3.784,7.919,3.909,7.982,4.066 c0.05,0.136,0.187,0.474,0.452,0.372c0.844-0.326,1.779-0.507,2.633-0.507c0.963,0,1.9,0.191,2.781,0.564 c0.695,0.292,1.357,0.719,2.078,1.34c0.051,0.044,0.105,0.068,0.164,0.068c0.143,0,0.273-0.137,0.389-0.271 c0.191-0.214,0.324-0.395,0.135-0.575c-0.686-0.654-1.436-1.138-2.363-1.533C13.24,3.097,12.168,2.884,11.066,2.884z"/><path d="M16.43,15.747c-0.092-0.028-0.242,0.05-0.309,0.119l0,0c-0.652,0.652-1.42,1.169-2.268,1.521 c-0.877,0.371-1.814,0.551-2.779,0.551c-0.961,0-1.896-0.189-2.775-0.564c-0.848-0.36-1.612-0.879-2.268-1.53 c-0.682-0.688-1.196-1.455-1.529-2.268c-0.325-0.799-0.471-1.643-0.471-1.643c-0.045-0.24-0.258-0.249-0.567-0.203 c-0.128,0.021-0.519,0.079-0.483,0.36v0.01c0.105,0.644,0.289,1.284,0.545,1.895c0.417,0.969,1.002,1.849,1.756,2.604 c0.757,0.754,1.636,1.34,2.604,1.757C8.901,18.785,9.97,19,11.088,19c1.104,0,2.186-0.215,3.188-0.645 c1.838-0.896,2.604-1.757,2.604-1.757c0.182-0.204,0.227-0.317-0.1-0.643C16.779,15.956,16.525,15.774,16.43,15.747z"/><path d="M5.633,13.287c0.293,0.71,0.723,1.341,1.262,1.882c0.54,0.54,1.172,0.971,1.882,1.264c0.731,0.303,1.509,0.461,2.298,0.461 c0.801,0,1.578-0.158,2.297-0.461c0.711-0.293,1.344-0.724,1.883-1.264c0.543-0.541,0.971-1.172,1.264-1.882 c0.314-0.721,0.463-1.5,0.463-2.298c0-0.79-0.148-1.569-0.463-2.289c-0.293-0.699-0.721-1.329-1.264-1.881 c-0.539-0.541-1.172-0.959-1.867-1.263c-0.721-0.303-1.5-0.461-2.299-0.461c-0.802,0-1.613,0.159-2.322,0.461 c-0.577,0.25-1.544,0.867-2.119,1.454v0.012V2.108h8.16C15.1,2.104,15.1,1.69,15.1,1.552C15.1,1.417,15.1,1,14.809,1H5.915 C5.676,1,5.527,1.192,5.527,1.384v6.84c0,0.214,0.273,0.372,0.529,0.428c0.5,0.105,0.614-0.056,0.737-0.224l0,0 c0.18-0.273,0.776-0.884,0.787-0.894c0.901-0.905,2.117-1.408,3.416-1.408c1.285,0,2.5,0.501,3.412,1.408 c0.914,0.914,1.408,2.122,1.408,3.405c0,1.288-0.508,2.496-1.408,3.405c-0.9,0.896-2.152,1.406-3.438,1.406 c-0.877,0-1.711-0.229-2.433-0.671v-4.158c0-0.553,0.237-1.151,0.643-1.614c0.462-0.519,1.094-0.799,1.782-0.799 c0.664,0,1.293,0.253,1.758,0.715c0.459,0.459,0.709,1.071,0.709,1.723c0,1.385-1.094,2.468-2.488,2.468 c-0.273,0-0.769-0.121-0.781-0.125c-0.281-0.087-0.405,0.306-0.438,0.436c-0.159,0.496,0.079,0.585,0.123,0.607 c0.452,0.137,0.743,0.157,1.129,0.157c1.973,0,3.572-1.6,3.572-3.57c0-1.964-1.6-3.552-3.572-3.552c-0.97,0-1.872,0.36-2.546,1.038 c-0.656,0.631-1.027,1.487-1.027,2.322v3.438v-0.011c-0.372-0.42-0.732-1.041-0.981-1.682c-0.102-0.248-0.315-0.202-0.607-0.113 c-0.135,0.035-0.519,0.157-0.44,0.439C5.372,12.799,5.577,13.164,5.633,13.287z"/></svg>',album:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="2" width="10" height="1"/><rect x="3" y="4" width="14" height="1"/><rect fill="none" stroke="#000" x="1.5" y="6.5" width="17" height="11"/></svg>',"arrow-down":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="10.5,16.08 5.63,10.66 6.37,10 10.5,14.58 14.63,10 15.37,10.66"/><line fill="none" stroke="#000" x1="10.5" y1="4" x2="10.5" y2="15"/></svg>',"arrow-left":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" points="10 14 5 9.5 10 5"/><line fill="none" stroke="#000" x1="16" y1="9.5" x2="5" y2="9.52"/></svg>',"arrow-right":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" points="10 5 15 9.5 10 14"/><line fill="none" stroke="#000" x1="4" y1="9.5" x2="15" y2="9.5"/></svg>',"arrow-up":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="10.5,4 15.37,9.4 14.63,10.08 10.5,5.49 6.37,10.08 5.63,9.4"/><line fill="none" stroke="#000" x1="10.5" y1="16" x2="10.5" y2="5"/></svg>',ban:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.1" cx="10" cy="10" r="9"/><line fill="none" stroke="#000" stroke-width="1.1" x1="4" y1="3.5" x2="16" y2="16.5"/></svg>',behance:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.5,10.6c-0.4-0.5-0.9-0.9-1.6-1.1c1.7-1,2.2-3.2,0.7-4.7C7.8,4,6.3,4,5.2,4C3.5,4,1.7,4,0,4v12c1.7,0,3.4,0,5.2,0 c1,0,2.1,0,3.1-0.5C10.2,14.6,10.5,12.3,9.5,10.6L9.5,10.6z M5.6,6.1c1.8,0,1.8,2.7-0.1,2.7c-1,0-2,0-2.9,0V6.1H5.6z M2.6,13.8v-3.1 c1.1,0,2.1,0,3.2,0c2.1,0,2.1,3.2,0.1,3.2L2.6,13.8z"/><path d="M19.9,10.9C19.7,9.2,18.7,7.6,17,7c-4.2-1.3-7.3,3.4-5.3,7.1c0.9,1.7,2.8,2.3,4.7,2.1c1.7-0.2,2.9-1.3,3.4-2.9h-2.2 c-0.4,1.3-2.4,1.5-3.5,0.6c-0.4-0.4-0.6-1.1-0.6-1.7H20C20,11.7,19.9,10.9,19.9,10.9z M13.5,10.6c0-1.6,2.3-2.7,3.5-1.4 c0.4,0.4,0.5,0.9,0.6,1.4H13.5L13.5,10.6z"/><rect x="13" y="4" width="5" height="1.4"/></svg>',bell:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="1.1" d="M17,15.5 L3,15.5 C2.99,14.61 3.79,13.34 4.1,12.51 C4.58,11.3 4.72,10.35 5.19,7.01 C5.54,4.53 5.89,3.2 7.28,2.16 C8.13,1.56 9.37,1.5 9.81,1.5 L9.96,1.5 C9.96,1.5 11.62,1.41 12.67,2.17 C14.08,3.2 14.42,4.54 14.77,7.02 C15.26,10.35 15.4,11.31 15.87,12.52 C16.2,13.34 17.01,14.61 17,15.5 L17,15.5 Z"/><path fill="none" stroke="#000" d="M12.39,16 C12.39,17.37 11.35,18.43 9.91,18.43 C8.48,18.43 7.42,17.37 7.42,16"/></svg>',bold:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5,15.3 C5.66,15.3 5.9,15 5.9,14.53 L5.9,5.5 C5.9,4.92 5.56,4.7 5,4.7 L5,4 L8.95,4 C12.6,4 13.7,5.37 13.7,6.9 C13.7,7.87 13.14,9.17 10.86,9.59 L10.86,9.7 C13.25,9.86 14.29,11.28 14.3,12.54 C14.3,14.47 12.94,16 9,16 L5,16 L5,15.3 Z M9,9.3 C11.19,9.3 11.8,8.5 11.85,7 C11.85,5.65 11.3,4.8 9,4.8 L7.67,4.8 L7.67,9.3 L9,9.3 Z M9.185,15.22 C11.97,15 12.39,14 12.4,12.58 C12.4,11.15 11.39,10 9,10 L7.67,10 L7.67,15 L9.18,15 Z"/></svg>',bolt:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M4.74,20 L7.73,12 L3,12 L15.43,1 L12.32,9 L17.02,9 L4.74,20 L4.74,20 L4.74,20 Z M9.18,11 L7.1,16.39 L14.47,10 L10.86,10 L12.99,4.67 L5.61,11 L9.18,11 L9.18,11 L9.18,11 Z"/></svg>',bookmark:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon fill="none" stroke="#000" points="5.5 1.5 15.5 1.5 15.5 17.5 10.5 12.5 5.5 17.5"/></svg>',calendar:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M 2,3 2,17 18,17 18,3 2,3 Z M 17,16 3,16 3,8 17,8 17,16 Z M 17,7 3,7 3,4 17,4 17,7 Z"/><rect width="1" height="3" x="6" y="2"/><rect width="1" height="3" x="13" y="2"/></svg>',camera:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.1" cx="10" cy="10.8" r="3.8"/><path fill="none" stroke="#000" d="M1,4.5 C0.7,4.5 0.5,4.7 0.5,5 L0.5,17 C0.5,17.3 0.7,17.5 1,17.5 L19,17.5 C19.3,17.5 19.5,17.3 19.5,17 L19.5,5 C19.5,4.7 19.3,4.5 19,4.5 L13.5,4.5 L13.5,2.9 C13.5,2.6 13.3,2.5 13,2.5 L7,2.5 C6.7,2.5 6.5,2.6 6.5,2.9 L6.5,4.5 L1,4.5 L1,4.5 Z"/></svg>',cart:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle cx="7.3" cy="17.3" r="1.4"/><circle cx="13.3" cy="17.3" r="1.4"/><polyline fill="none" stroke="#000" points="0 2 3.2 4 5.3 12.5 16 12.5 18 6.5 8 6.5"/></svg>',check:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.1" points="4,10 8,15 17,4"/></svg>',"chevron-double-left":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.03" points="10 14 6 10 10 6"/><polyline fill="none" stroke="#000" stroke-width="1.03" points="14 14 10 10 14 6"/></svg>',"chevron-double-right":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.03" points="10 6 14 10 10 14"/><polyline fill="none" stroke="#000" stroke-width="1.03" points="6 6 10 10 6 14"/></svg>',"chevron-down":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.03" points="16 7 10 13 4 7"/></svg>',"chevron-left":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.03" points="13 16 7 10 13 4"/></svg>',"chevron-right":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.03" points="7 4 13 10 7 16"/></svg>',"chevron-up":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.03" points="4 13 10 7 16 13"/></svg>',clock:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.1" cx="10" cy="10" r="9"/><rect x="9" y="4" width="1" height="7"/><path fill="none" stroke="#000" stroke-width="1.1" d="M13.018,14.197 L9.445,10.625"/></svg>',close:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="1.06" d="M16,16 L4,4"/><path fill="none" stroke="#000" stroke-width="1.06" d="M16,4 L4,16"/></svg>',"cloud-download":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="1.1" d="M6.5,14.61 L3.75,14.61 C1.96,14.61 0.5,13.17 0.5,11.39 C0.5,9.76 1.72,8.41 3.3,8.2 C3.38,5.31 5.75,3 8.68,3 C11.19,3 13.31,4.71 13.89,7.02 C14.39,6.8 14.93,6.68 15.5,6.68 C17.71,6.68 19.5,8.45 19.5,10.64 C19.5,12.83 17.71,14.6 15.5,14.6 L12.5,14.6"/><polyline fill="none" stroke="#000" points="11.75 16 9.5 18.25 7.25 16"/><path fill="none" stroke="#000" d="M9.5,18 L9.5,9.5"/></svg>',"cloud-upload":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="1.1" d="M6.5,14.61 L3.75,14.61 C1.96,14.61 0.5,13.17 0.5,11.39 C0.5,9.76 1.72,8.41 3.31,8.2 C3.38,5.31 5.75,3 8.68,3 C11.19,3 13.31,4.71 13.89,7.02 C14.39,6.8 14.93,6.68 15.5,6.68 C17.71,6.68 19.5,8.45 19.5,10.64 C19.5,12.83 17.71,14.6 15.5,14.6 L12.5,14.6"/><polyline fill="none" stroke="#000" points="7.25 11.75 9.5 9.5 11.75 11.75"/><path fill="none" stroke="#000" d="M9.5,18 L9.5,9.5"/></svg>',code:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.01" points="13,4 19,10 13,16"/><polyline fill="none" stroke="#000" stroke-width="1.01" points="7,4 1,10 7,16"/></svg>',cog:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" cx="9.997" cy="10" r="3.31"/><path fill="none" stroke="#000" d="M18.488,12.285 L16.205,16.237 C15.322,15.496 14.185,15.281 13.303,15.791 C12.428,16.289 12.047,17.373 12.246,18.5 L7.735,18.5 C7.938,17.374 7.553,16.299 6.684,15.791 C5.801,15.27 4.655,15.492 3.773,16.237 L1.5,12.285 C2.573,11.871 3.317,10.999 3.317,9.991 C3.305,8.98 2.573,8.121 1.5,7.716 L3.765,3.784 C4.645,4.516 5.794,4.738 6.687,4.232 C7.555,3.722 7.939,2.637 7.735,1.5 L12.263,1.5 C12.072,2.637 12.441,3.71 13.314,4.22 C14.206,4.73 15.343,4.516 16.225,3.794 L18.487,7.714 C17.404,8.117 16.661,8.988 16.67,10.009 C16.672,11.018 17.415,11.88 18.488,12.285 L18.488,12.285 Z"/></svg>',comment:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6,18.71 L6,14 L1,14 L1,1 L19,1 L19,14 L10.71,14 L6,18.71 L6,18.71 Z M2,13 L7,13 L7,16.29 L10.29,13 L18,13 L18,2 L2,2 L2,13 L2,13 Z"/></svg>',commenting:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon fill="none" stroke="#000" points="1.5,1.5 18.5,1.5 18.5,13.5 10.5,13.5 6.5,17.5 6.5,13.5 1.5,13.5"/><circle cx="10" cy="8" r="1"/><circle cx="6" cy="8" r="1"/><circle cx="14" cy="8" r="1"/></svg>',comments:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" points="2 0.5 19.5 0.5 19.5 13"/><path d="M5,19.71 L5,15 L0,15 L0,2 L18,2 L18,15 L9.71,15 L5,19.71 L5,19.71 L5,19.71 Z M1,14 L6,14 L6,17.29 L9.29,14 L17,14 L17,3 L1,3 L1,14 L1,14 L1,14 Z"/></svg>',copy:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect fill="none" stroke="#000" x="3.5" y="2.5" width="12" height="16"/><polyline fill="none" stroke="#000" points="5 0.5 17.5 0.5 17.5 17"/></svg>',"credit-card":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect fill="none" stroke="#000" x="1.5" y="4.5" width="17" height="12"/><rect x="1" y="7" width="18" height="3"/></svg>',database:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><ellipse fill="none" stroke="#000" cx="10" cy="4.64" rx="7.5" ry="3.14"/><path fill="none" stroke="#000" d="M17.5,8.11 C17.5,9.85 14.14,11.25 10,11.25 C5.86,11.25 2.5,9.84 2.5,8.11"/><path fill="none" stroke="#000" d="M17.5,11.25 C17.5,12.99 14.14,14.39 10,14.39 C5.86,14.39 2.5,12.98 2.5,11.25"/><path fill="none" stroke="#000" d="M17.49,4.64 L17.5,14.36 C17.5,16.1 14.14,17.5 10,17.5 C5.86,17.5 2.5,16.09 2.5,14.36 L2.5,4.64"/></svg>',desktop:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="15" width="1" height="2"/><rect x="11" y="15" width="1" height="2"/><rect x="5" y="16" width="10" height="1"/><rect fill="none" stroke="#000" x="1.5" y="3.5" width="17" height="11"/></svg>',download:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" points="14,10 9.5,14.5 5,10"/><rect x="3" y="17" width="13" height="1"/><line fill="none" stroke="#000" x1="9.5" y1="13.91" x2="9.5" y2="3"/></svg>',dribbble:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="1.4" d="M1.3,8.9c0,0,5,0.1,8.6-1c1.4-0.4,2.6-0.9,4-1.9 c1.4-1.1,2.5-2.5,2.5-2.5"/><path fill="none" stroke="#000" stroke-width="1.4" d="M3.9,16.6c0,0,1.7-2.8,3.5-4.2 c1.8-1.3,4-2,5.7-2.2C16,10,19,10.6,19,10.6"/><path fill="none" stroke="#000" stroke-width="1.4" d="M6.9,1.6c0,0,3.3,4.6,4.2,6.8 c0.4,0.9,1.3,3.1,1.9,5.2c0.6,2,0.9,4.4,0.9,4.4"/><circle fill="none" stroke="#000" stroke-width="1.4" cx="10" cy="10" r="9"/></svg>',etsy:'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path d="M8,4.26C8,4.07,8,4,8.31,4h4.46c.79,0,1.22.67,1.53,1.91l.25,1h.76c.14-2.82.26-4,.26-4S13.65,3,12.52,3H6.81L3.75,2.92v.84l1,.2c.73.11.9.27,1,1,0,0,.06,2,.06,5.17s-.06,5.14-.06,5.14c0,.59-.23.81-1,.94l-1,.2v.84l3.06-.1h5.11c1.15,0,3.82.1,3.82.1,0-.7.45-3.88.51-4.22h-.73l-.76,1.69a2.25,2.25,0,0,1-2.45,1.47H9.4c-1,0-1.44-.4-1.44-1.24V10.44s2.16,0,2.86.06c.55,0,.85.19,1.06,1l.23,1H13L12.9,9.94,13,7.41h-.85l-.28,1.13c-.16.74-.28.84-1,1-1,.1-2.89.09-2.89.09Z"/></svg>',expand:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="13 2 18 2 18 7 17 7 17 3 13 3"/><polygon points="2 13 3 13 3 17 7 17 7 18 2 18"/><path fill="none" stroke="#000" stroke-width="1.1" d="M11,9 L17,3"/><path fill="none" stroke="#000" stroke-width="1.1" d="M3,17 L9,11"/></svg>',facebook:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11,10h2.6l0.4-3H11V5.3c0-0.9,0.2-1.5,1.5-1.5H14V1.1c-0.3,0-1-0.1-2.1-0.1C9.6,1,8,2.4,8,5v2H5.5v3H8v8h3V10z"/></svg>',"file-edit":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" d="M18.65,1.68 C18.41,1.45 18.109,1.33 17.81,1.33 C17.499,1.33 17.209,1.45 16.98,1.68 L8.92,9.76 L8,12.33 L10.55,11.41 L18.651,3.34 C19.12,2.87 19.12,2.15 18.65,1.68 L18.65,1.68 L18.65,1.68 Z"/><polyline fill="none" stroke="#000" points="16.5 8.482 16.5 18.5 3.5 18.5 3.5 1.5 14.211 1.5"/></svg>',"file-pdf":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect fill="none" stroke="#000" width="13" height="17" x="3.5" y="1.5"/><path d="M14.65 11.67c-.48.3-1.37-.19-1.79-.37a4.65 4.65 0 0 1 1.49.06c.35.1.36.28.3.31zm-6.3.06l.43-.79a14.7 14.7 0 0 0 .75-1.64 5.48 5.48 0 0 0 1.25 1.55l.2.15a16.36 16.36 0 0 0-2.63.73zM9.5 5.32c.2 0 .32.5.32.97a1.99 1.99 0 0 1-.23 1.04 5.05 5.05 0 0 1-.17-1.3s0-.71.08-.71zm-3.9 9a4.35 4.35 0 0 1 1.21-1.46l.24-.22a4.35 4.35 0 0 1-1.46 1.68zm9.23-3.3a2.05 2.05 0 0 0-1.32-.3 11.07 11.07 0 0 0-1.58.11 4.09 4.09 0 0 1-.74-.5 5.39 5.39 0 0 1-1.32-2.06 10.37 10.37 0 0 0 .28-2.62 1.83 1.83 0 0 0-.07-.25.57.57 0 0 0-.52-.4H9.4a.59.59 0 0 0-.6.38 6.95 6.95 0 0 0 .37 3.14c-.26.63-1 2.12-1 2.12-.3.58-.57 1.08-.82 1.5l-.8.44A3.11 3.11 0 0 0 5 14.16a.39.39 0 0 0 .15.42l.24.13c1.15.56 2.28-1.74 2.66-2.42a23.1 23.1 0 0 1 3.59-.85 4.56 4.56 0 0 0 2.91.8.5.5 0 0 0 .3-.21 1.1 1.1 0 0 0 .12-.75.84.84 0 0 0-.14-.25z"/></svg>',"file-text":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect fill="none" stroke="#000" width="13" height="17" x="3.5" y="1.5"/><line fill="none" stroke="#000" x1="6" x2="12" y1="12.5" y2="12.5"/><line fill="none" stroke="#000" x1="6" x2="14" y1="8.5" y2="8.5"/><line fill="none" stroke="#000" x1="6" x2="14" y1="6.5" y2="6.5"/><line fill="none" stroke="#000" x1="6" x2="14" y1="10.5" y2="10.5"/></svg>',file:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect fill="none" stroke="#000" x="3.5" y="1.5" width="13" height="17"/></svg>',flickr:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle cx="5.5" cy="9.5" r="3.5"/><circle cx="14.5" cy="9.5" r="3.5"/></svg>',folder:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon fill="none" stroke="#000" points="9.5 5.5 8.5 3.5 1.5 3.5 1.5 16.5 18.5 16.5 18.5 5.5"/></svg>',forward:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.47,13.11 C4.02,10.02 6.27,7.85 9.04,6.61 C9.48,6.41 10.27,6.13 11,5.91 L11,2 L18.89,9 L11,16 L11,12.13 C9.25,12.47 7.58,13.19 6.02,14.25 C3.03,16.28 1.63,18.54 1.63,18.54 C1.63,18.54 1.38,15.28 2.47,13.11 L2.47,13.11 Z M5.3,13.53 C6.92,12.4 9.04,11.4 12,10.92 L12,13.63 L17.36,9 L12,4.25 L12,6.8 C11.71,6.86 10.86,7.02 9.67,7.49 C6.79,8.65 4.58,10.96 3.49,13.08 C3.18,13.7 2.68,14.87 2.49,16 C3.28,15.05 4.4,14.15 5.3,13.53 L5.3,13.53 Z"/></svg>',foursquare:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.23,2 C15.96,2 16.4,2.41 16.5,2.86 C16.57,3.15 16.56,3.44 16.51,3.73 C16.46,4.04 14.86,11.72 14.75,12.03 C14.56,12.56 14.16,12.82 13.61,12.83 C13.03,12.84 11.09,12.51 10.69,13 C10.38,13.38 7.79,16.39 6.81,17.53 C6.61,17.76 6.4,17.96 6.08,17.99 C5.68,18.04 5.29,17.87 5.17,17.45 C5.12,17.28 5.1,17.09 5.1,16.91 C5.1,12.4 4.86,7.81 5.11,3.31 C5.17,2.5 5.81,2.12 6.53,2 L15.23,2 L15.23,2 Z M9.76,11.42 C9.94,11.19 10.17,11.1 10.45,11.1 L12.86,11.1 C13.12,11.1 13.31,10.94 13.36,10.69 C13.37,10.64 13.62,9.41 13.74,8.83 C13.81,8.52 13.53,8.28 13.27,8.28 C12.35,8.29 11.42,8.28 10.5,8.28 C9.84,8.28 9.83,7.69 9.82,7.21 C9.8,6.85 10.13,6.55 10.5,6.55 C11.59,6.56 12.67,6.55 13.76,6.55 C14.03,6.55 14.23,6.4 14.28,6.14 C14.34,5.87 14.67,4.29 14.67,4.29 C14.67,4.29 14.82,3.74 14.19,3.74 L7.34,3.74 C7,3.75 6.84,4.02 6.84,4.33 C6.84,7.58 6.85,14.95 6.85,14.99 C6.87,15 8.89,12.51 9.76,11.42 L9.76,11.42 Z"/></svg>',future:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline points="19 2 18 2 18 6 14 6 14 7 19 7 19 2"/><path fill="none" stroke="#000" stroke-width="1.1" d="M18,6.548 C16.709,3.29 13.354,1 9.6,1 C4.6,1 0.6,5 0.6,10 C0.6,15 4.6,19 9.6,19 C14.6,19 18.6,15 18.6,10"/><rect x="9" y="4" width="1" height="7"/><path d="M13.018,14.197 L9.445,10.625" fill="none" stroke="#000" stroke-width="1.1"/></svg>',"git-branch":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.2" cx="7" cy="3" r="2"/><circle fill="none" stroke="#000" stroke-width="1.2" cx="14" cy="6" r="2"/><circle fill="none" stroke="#000" stroke-width="1.2" cx="7" cy="17" r="2"/><path fill="none" stroke="#000" stroke-width="2" d="M14,8 C14,10.41 12.43,10.87 10.56,11.25 C9.09,11.54 7,12.06 7,15 L7,5"/></svg>',"git-fork":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.2" cx="5.79" cy="2.79" r="1.79"/><circle fill="none" stroke="#000" stroke-width="1.2" cx="14.19" cy="2.79" r="1.79"/><circle fill="none" stroke="#000" stroke-width="1.2" cx="10.03" cy="16.79" r="1.79"/><path fill="none" stroke="#000" stroke-width="2" d="M5.79,4.57 L5.79,6.56 C5.79,9.19 10.03,10.22 10.03,13.31 C10.03,14.86 10.04,14.55 10.04,14.55 C10.04,14.37 10.04,14.86 10.04,13.31 C10.04,10.22 14.2,9.19 14.2,6.56 L14.2,4.57"/></svg>',"github-alt":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10,0.5 C4.75,0.5 0.5,4.76 0.5,10.01 C0.5,15.26 4.75,19.51 10,19.51 C15.24,19.51 19.5,15.26 19.5,10.01 C19.5,4.76 15.25,0.5 10,0.5 L10,0.5 Z M12.81,17.69 C12.81,17.69 12.81,17.7 12.79,17.69 C12.47,17.75 12.35,17.59 12.35,17.36 L12.35,16.17 C12.35,15.45 12.09,14.92 11.58,14.56 C12.2,14.51 12.77,14.39 13.26,14.21 C13.87,13.98 14.36,13.69 14.74,13.29 C15.42,12.59 15.76,11.55 15.76,10.17 C15.76,9.25 15.45,8.46 14.83,7.8 C15.1,7.08 15.07,6.29 14.75,5.44 L14.51,5.42 C14.34,5.4 14.06,5.46 13.67,5.61 C13.25,5.78 12.79,6.03 12.31,6.35 C11.55,6.16 10.81,6.05 10.09,6.05 C9.36,6.05 8.61,6.15 7.88,6.35 C7.28,5.96 6.75,5.68 6.26,5.54 C6.07,5.47 5.9,5.44 5.78,5.44 L5.42,5.44 C5.06,6.29 5.04,7.08 5.32,7.8 C4.7,8.46 4.4,9.25 4.4,10.17 C4.4,11.94 4.96,13.16 6.08,13.84 C6.53,14.13 7.05,14.32 7.69,14.43 C8.03,14.5 8.32,14.54 8.55,14.55 C8.07,14.89 7.82,15.42 7.82,16.16 L7.82,17.51 C7.8,17.69 7.7,17.8 7.51,17.8 C4.21,16.74 1.82,13.65 1.82,10.01 C1.82,5.5 5.49,1.83 10,1.83 C14.5,1.83 18.17,5.5 18.17,10.01 C18.18,13.53 15.94,16.54 12.81,17.69 L12.81,17.69 Z"/></svg>',github:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10,1 C5.03,1 1,5.03 1,10 C1,13.98 3.58,17.35 7.16,18.54 C7.61,18.62 7.77,18.34 7.77,18.11 C7.77,17.9 7.76,17.33 7.76,16.58 C5.26,17.12 4.73,15.37 4.73,15.37 C4.32,14.33 3.73,14.05 3.73,14.05 C2.91,13.5 3.79,13.5 3.79,13.5 C4.69,13.56 5.17,14.43 5.17,14.43 C5.97,15.8 7.28,15.41 7.79,15.18 C7.87,14.6 8.1,14.2 8.36,13.98 C6.36,13.75 4.26,12.98 4.26,9.53 C4.26,8.55 4.61,7.74 5.19,7.11 C5.1,6.88 4.79,5.97 5.28,4.73 C5.28,4.73 6.04,4.49 7.75,5.65 C8.47,5.45 9.24,5.35 10,5.35 C10.76,5.35 11.53,5.45 12.25,5.65 C13.97,4.48 14.72,4.73 14.72,4.73 C15.21,5.97 14.9,6.88 14.81,7.11 C15.39,7.74 15.73,8.54 15.73,9.53 C15.73,12.99 13.63,13.75 11.62,13.97 C11.94,14.25 12.23,14.8 12.23,15.64 C12.23,16.84 12.22,17.81 12.22,18.11 C12.22,18.35 12.38,18.63 12.84,18.54 C16.42,17.35 19,13.98 19,10 C19,5.03 14.97,1 10,1 L10,1 Z"/></svg>',gitter:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="3.5" y="1" width="1.531" height="11.471"/><rect x="7.324" y="4.059" width="1.529" height="15.294"/><rect x="11.148" y="4.059" width="1.527" height="15.294"/><rect x="14.971" y="4.059" width="1.529" height="8.412"/></svg>',"google-plus":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M12.9,9c0,2.7-0.6,5-3.2,6.3c-3.7,1.8-8.1,0.2-9.4-3.6C-1.1,7.6,1.9,3.3,6.1,3c1.7-0.1,3.2,0.3,4.6,1.3 c0.1,0.1,0.3,0.2,0.4,0.4c-0.5,0.5-1.2,1-1.7,1.6c-1-0.8-2.1-1.1-3.5-0.9C5,5.6,4.2,6,3.6,6.7c-1.3,1.3-1.5,3.4-0.5,5 c1,1.7,2.6,2.3,4.6,1.9c1.4-0.3,2.4-1.2,2.6-2.6H6.9V9H12.9z"/><polygon points="20,9 20,11 18,11 18,13 16,13 16,11 14,11 14,9 16,9 16,7 18,7 18,9"/></svg>',google:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.86,9.09 C18.46,12.12 17.14,16.05 13.81,17.56 C9.45,19.53 4.13,17.68 2.47,12.87 C0.68,7.68 4.22,2.42 9.5,2.03 C11.57,1.88 13.42,2.37 15.05,3.65 C15.22,3.78 15.37,3.93 15.61,4.14 C14.9,4.81 14.23,5.45 13.5,6.14 C12.27,5.08 10.84,4.72 9.28,4.98 C8.12,5.17 7.16,5.76 6.37,6.63 C4.88,8.27 4.62,10.86 5.76,12.82 C6.95,14.87 9.17,15.8 11.57,15.25 C13.27,14.87 14.76,13.33 14.89,11.75 L10.51,11.75 L10.51,9.09 L17.86,9.09 L17.86,9.09 Z"/></svg>',grid:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="3" height="3"/><rect x="8" y="2" width="3" height="3"/><rect x="14" y="2" width="3" height="3"/><rect x="2" y="8" width="3" height="3"/><rect x="8" y="8" width="3" height="3"/><rect x="14" y="8" width="3" height="3"/><rect x="2" y="14" width="3" height="3"/><rect x="8" y="14" width="3" height="3"/><rect x="14" y="14" width="3" height="3"/></svg>',happy:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle cx="13" cy="7" r="1"/><circle cx="7" cy="7" r="1"/><circle fill="none" stroke="#000" cx="10" cy="10" r="8.5"/><path fill="none" stroke="#000" d="M14.6,11.4 C13.9,13.3 12.1,14.5 10,14.5 C7.9,14.5 6.1,13.3 5.4,11.4"/></svg>',hashtag:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.431,8 L15.661,7 L12.911,7 L13.831,3 L12.901,3 L11.98,7 L9.29,7 L10.21,3 L9.281,3 L8.361,7 L5.23,7 L5,8 L8.13,8 L7.21,12 L4.23,12 L4,13 L6.98,13 L6.061,17 L6.991,17 L7.911,13 L10.601,13 L9.681,17 L10.611,17 L11.531,13 L14.431,13 L14.661,12 L11.76,12 L12.681,8 L15.431,8 Z M10.831,12 L8.141,12 L9.061,8 L11.75,8 L10.831,12 Z"/></svg>',heart:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="1.03" d="M10,4 C10,4 8.1,2 5.74,2 C3.38,2 1,3.55 1,6.73 C1,8.84 2.67,10.44 2.67,10.44 L10,18 L17.33,10.44 C17.33,10.44 19,8.84 19,6.73 C19,3.55 16.62,2 14.26,2 C11.9,2 10,4 10,4 L10,4 Z"/></svg>',history:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="#000" points="1 2 2 2 2 6 6 6 6 7 1 7 1 2"/><path fill="none" stroke="#000" stroke-width="1.1" d="M2.1,6.548 C3.391,3.29 6.746,1 10.5,1 C15.5,1 19.5,5 19.5,10 C19.5,15 15.5,19 10.5,19 C5.5,19 1.5,15 1.5,10"/><rect x="9" y="4" width="1" height="7"/><path fill="none" stroke="#000" stroke-width="1.1" d="M13.018,14.197 L9.445,10.625"/></svg>',home:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="18.65 11.35 10 2.71 1.35 11.35 0.65 10.65 10 1.29 19.35 10.65"/><polygon points="15 4 18 4 18 7 17 7 17 5 15 5"/><polygon points="3 11 4 11 4 18 7 18 7 12 12 12 12 18 16 18 16 11 17 11 17 19 11 19 11 13 8 13 8 19 3 19"/></svg>',image:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle cx="16.1" cy="6.1" r="1.1"/><rect fill="none" stroke="#000" x=".5" y="2.5" width="19" height="15"/><polyline fill="none" stroke="#000" stroke-width="1.01" points="4,13 8,9 13,14"/><polyline fill="none" stroke="#000" stroke-width="1.01" points="11,12 12.5,10.5 16,14"/></svg>',info:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M12.13,11.59 C11.97,12.84 10.35,14.12 9.1,14.16 C6.17,14.2 9.89,9.46 8.74,8.37 C9.3,8.16 10.62,7.83 10.62,8.81 C10.62,9.63 10.12,10.55 9.88,11.32 C8.66,15.16 12.13,11.15 12.14,11.18 C12.16,11.21 12.16,11.35 12.13,11.59 C12.08,11.95 12.16,11.35 12.13,11.59 L12.13,11.59 Z M11.56,5.67 C11.56,6.67 9.36,7.15 9.36,6.03 C9.36,5 11.56,4.54 11.56,5.67 L11.56,5.67 Z"/><circle fill="none" stroke="#000" stroke-width="1.1" cx="10" cy="10" r="9"/></svg>',instagram:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M13.55,1H6.46C3.45,1,1,3.44,1,6.44v7.12c0,3,2.45,5.44,5.46,5.44h7.08c3.02,0,5.46-2.44,5.46-5.44V6.44 C19.01,3.44,16.56,1,13.55,1z M17.5,14c0,1.93-1.57,3.5-3.5,3.5H6c-1.93,0-3.5-1.57-3.5-3.5V6c0-1.93,1.57-3.5,3.5-3.5h8 c1.93,0,3.5,1.57,3.5,3.5V14z"/><circle cx="14.87" cy="5.26" r="1.09"/><path d="M10.03,5.45c-2.55,0-4.63,2.06-4.63,4.6c0,2.55,2.07,4.61,4.63,4.61c2.56,0,4.63-2.061,4.63-4.61 C14.65,7.51,12.58,5.45,10.03,5.45L10.03,5.45L10.03,5.45z M10.08,13c-1.66,0-3-1.34-3-2.99c0-1.65,1.34-2.99,3-2.99s3,1.34,3,2.99 C13.08,11.66,11.74,13,10.08,13L10.08,13L10.08,13z"/></svg>',italic:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M12.63,5.48 L10.15,14.52 C10,15.08 10.37,15.25 11.92,15.3 L11.72,16 L6,16 L6.2,15.31 C7.78,15.26 8.19,15.09 8.34,14.53 L10.82,5.49 C10.97,4.92 10.63,4.76 9.09,4.71 L9.28,4 L15,4 L14.81,4.69 C13.23,4.75 12.78,4.91 12.63,5.48 L12.63,5.48 Z"/></svg>',joomla:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7.8,13.4l1.7-1.7L5.9,8c-0.6-0.5-0.6-1.5,0-2c0.6-0.6,1.4-0.6,2,0l1.7-1.7c-1-1-2.3-1.3-3.6-1C5.8,2.2,4.8,1.4,3.7,1.4 c-1.3,0-2.3,1-2.3,2.3c0,1.1,0.8,2,1.8,2.3c-0.4,1.3-0.1,2.8,1,3.8L7.8,13.4L7.8,13.4z"/><path d="M10.2,4.3c1-1,2.5-1.4,3.8-1c0.2-1.1,1.1-2,2.3-2c1.3,0,2.3,1,2.3,2.3c0,1.2-0.9,2.2-2,2.3c0.4,1.3,0,2.8-1,3.8L13.9,8 c0.6-0.5,0.6-1.5,0-2c-0.5-0.6-1.5-0.6-2,0L8.2,9.7L6.5,8"/><path d="M14.1,16.8c-1.3,0.4-2.8,0.1-3.8-1l1.7-1.7c0.6,0.6,1.5,0.6,2,0c0.5-0.6,0.6-1.5,0-2l-3.7-3.7L12,6.7l3.7,3.7 c1,1,1.3,2.4,1,3.6c1.1,0.2,2,1.1,2,2.3c0,1.3-1,2.3-2.3,2.3C15.2,18.6,14.3,17.8,14.1,16.8"/><path d="M13.2,12.2l-3.7,3.7c-1,1-2.4,1.3-3.6,1c-0.2,1-1.2,1.8-2.2,1.8c-1.3,0-2.3-1-2.3-2.3c0-1.1,0.8-2,1.8-2.3 c-0.3-1.3,0-2.7,1-3.7l1.7,1.7c-0.6,0.6-0.6,1.5,0,2c0.6,0.6,1.4,0.6,2,0l3.7-3.7"/></svg>',laptop:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect y="16" width="20" height="1"/><rect fill="none" stroke="#000" x="2.5" y="4.5" width="15" height="10"/></svg>',lifesaver:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10,0.5 C4.76,0.5 0.5,4.76 0.5,10 C0.5,15.24 4.76,19.5 10,19.5 C15.24,19.5 19.5,15.24 19.5,10 C19.5,4.76 15.24,0.5 10,0.5 L10,0.5 Z M10,1.5 C11.49,1.5 12.89,1.88 14.11,2.56 L11.85,4.82 C11.27,4.61 10.65,4.5 10,4.5 C9.21,4.5 8.47,4.67 7.79,4.96 L5.58,2.75 C6.87,1.95 8.38,1.5 10,1.5 L10,1.5 Z M4.96,7.8 C4.67,8.48 4.5,9.21 4.5,10 C4.5,10.65 4.61,11.27 4.83,11.85 L2.56,14.11 C1.88,12.89 1.5,11.49 1.5,10 C1.5,8.38 1.95,6.87 2.75,5.58 L4.96,7.79 L4.96,7.8 L4.96,7.8 Z M10,18.5 C8.25,18.5 6.62,17.97 5.27,17.06 L7.46,14.87 C8.22,15.27 9.08,15.5 10,15.5 C10.79,15.5 11.53,15.33 12.21,15.04 L14.42,17.25 C13.13,18.05 11.62,18.5 10,18.5 L10,18.5 Z M10,14.5 C7.52,14.5 5.5,12.48 5.5,10 C5.5,7.52 7.52,5.5 10,5.5 C12.48,5.5 14.5,7.52 14.5,10 C14.5,12.48 12.48,14.5 10,14.5 L10,14.5 Z M15.04,12.21 C15.33,11.53 15.5,10.79 15.5,10 C15.5,9.08 15.27,8.22 14.87,7.46 L17.06,5.27 C17.97,6.62 18.5,8.25 18.5,10 C18.5,11.62 18.05,13.13 17.25,14.42 L15.04,12.21 L15.04,12.21 Z"/></svg>',link:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="1.1" d="M10.625,12.375 L7.525,15.475 C6.825,16.175 5.925,16.175 5.225,15.475 L4.525,14.775 C3.825,14.074 3.825,13.175 4.525,12.475 L7.625,9.375"/><path fill="none" stroke="#000" stroke-width="1.1" d="M9.325,7.375 L12.425,4.275 C13.125,3.575 14.025,3.575 14.724,4.275 L15.425,4.975 C16.125,5.675 16.125,6.575 15.425,7.275 L12.325,10.375"/><path fill="none" stroke="#000" stroke-width="1.1" d="M7.925,11.875 L11.925,7.975"/></svg>',linkedin:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5.77,17.89 L5.77,7.17 L2.21,7.17 L2.21,17.89 L5.77,17.89 L5.77,17.89 Z M3.99,5.71 C5.23,5.71 6.01,4.89 6.01,3.86 C5.99,2.8 5.24,2 4.02,2 C2.8,2 2,2.8 2,3.85 C2,4.88 2.77,5.7 3.97,5.7 L3.99,5.7 L3.99,5.71 L3.99,5.71 Z"/><path d="M7.75,17.89 L11.31,17.89 L11.31,11.9 C11.31,11.58 11.33,11.26 11.43,11.03 C11.69,10.39 12.27,9.73 13.26,9.73 C14.55,9.73 15.06,10.71 15.06,12.15 L15.06,17.89 L18.62,17.89 L18.62,11.74 C18.62,8.45 16.86,6.92 14.52,6.92 C12.6,6.92 11.75,7.99 11.28,8.73 L11.3,8.73 L11.3,7.17 L7.75,7.17 C7.79,8.17 7.75,17.89 7.75,17.89 L7.75,17.89 L7.75,17.89 Z"/></svg>',list:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="4" width="12" height="1"/><rect x="6" y="9" width="12" height="1"/><rect x="6" y="14" width="12" height="1"/><rect x="2" y="4" width="2" height="1"/><rect x="2" y="9" width="2" height="1"/><rect x="2" y="14" width="2" height="1"/></svg>',location:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="1.01" d="M10,0.5 C6.41,0.5 3.5,3.39 3.5,6.98 C3.5,11.83 10,19 10,19 C10,19 16.5,11.83 16.5,6.98 C16.5,3.39 13.59,0.5 10,0.5 L10,0.5 Z"/><circle fill="none" stroke="#000" cx="10" cy="6.8" r="2.3"/></svg>',lock:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect fill="none" stroke="#000" height="10" width="13" y="8.5" x="3.5"/><path fill="none" stroke="#000" d="M6.5,8 L6.5,4.88 C6.5,3.01 8.07,1.5 10,1.5 C11.93,1.5 13.5,3.01 13.5,4.88 L13.5,8"/></svg>',mail:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" points="1.4,6.5 10,11 18.6,6.5"/><path d="M 1,4 1,16 19,16 19,4 1,4 Z M 18,15 2,15 2,5 18,5 18,15 Z"/></svg>',menu:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="4" width="16" height="1"/><rect x="2" y="9" width="16" height="1"/><rect x="2" y="14" width="16" height="1"/></svg>',microphone:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><line fill="none" stroke="#000" x1="10" x2="10" y1="16.44" y2="18.5"/><line fill="none" stroke="#000" x1="7" x2="13" y1="18.5" y2="18.5"/><path fill="none" stroke="#000" stroke-width="1.1" d="M13.5 4.89v5.87a3.5 3.5 0 0 1-7 0V4.89a3.5 3.5 0 0 1 7 0z"/><path fill="none" stroke="#000" stroke-width="1.1" d="M15.5 10.36V11a5.5 5.5 0 0 1-11 0v-.6"/></svg>',"minus-circle":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.1" cx="9.5" cy="9.5" r="9"/><line fill="none" stroke="#000" x1="5" y1="9.5" x2="14" y2="9.5"/></svg>',minus:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect height="1" width="18" y="9" x="1"/></svg>',"more-vertical":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="3" r="2"/><circle cx="10" cy="10" r="2"/><circle cx="10" cy="17" r="2"/></svg>',more:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle cx="3" cy="10" r="2"/><circle cx="10" cy="10" r="2"/><circle cx="17" cy="10" r="2"/></svg>',move:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="4,5 1,5 1,9 2,9 2,6 4,6"/><polygon points="1,16 2,16 2,18 4,18 4,19 1,19"/><polygon points="14,16 14,19 11,19 11,18 13,18 13,16"/><rect fill="none" stroke="#000" x="5.5" y="1.5" width="13" height="13"/><rect x="1" y="11" width="1" height="3"/><rect x="6" y="18" width="3" height="1"/></svg>',nut:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon fill="none" stroke="#000" points="2.5,5.7 10,1.3 17.5,5.7 17.5,14.3 10,18.7 2.5,14.3"/><circle fill="none" stroke="#000" cx="10" cy="10" r="3.5"/></svg>',pagekit:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="3,1 17,1 17,16 10,16 10,13 14,13 14,4 6,4 6,16 10,16 10,19 3,19"/></svg>',"paint-bucket":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.21,1 L0,11.21 L8.1,19.31 L18.31,9.1 L10.21,1 L10.21,1 Z M16.89,9.1 L15,11 L1.7,11 L10.21,2.42 L16.89,9.1 Z"/><path fill="none" stroke="#000" stroke-width="1.1" d="M6.42,2.33 L11.7,7.61"/><path d="M18.49,12 C18.49,12 20,14.06 20,15.36 C20,16.28 19.24,17 18.49,17 L18.49,17 C17.74,17 17,16.28 17,15.36 C17,14.06 18.49,12 18.49,12 L18.49,12 Z"/></svg>',pencil:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" d="M17.25,6.01 L7.12,16.1 L3.82,17.2 L5.02,13.9 L15.12,3.88 C15.71,3.29 16.66,3.29 17.25,3.88 C17.83,4.47 17.83,5.42 17.25,6.01 L17.25,6.01 Z"/><path fill="none" stroke="#000" d="M15.98,7.268 L13.851,5.148"/></svg>',"phone-landscape":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" d="M17,5.5 C17.8,5.5 18.5,6.2 18.5,7 L18.5,14 C18.5,14.8 17.8,15.5 17,15.5 L3,15.5 C2.2,15.5 1.5,14.8 1.5,14 L1.5,7 C1.5,6.2 2.2,5.5 3,5.5 L17,5.5 L17,5.5 L17,5.5 Z"/><circle cx="3.8" cy="10.5" r=".8"/></svg>',phone:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" d="M15.5,17 C15.5,17.8 14.8,18.5 14,18.5 L7,18.5 C6.2,18.5 5.5,17.8 5.5,17 L5.5,3 C5.5,2.2 6.2,1.5 7,1.5 L14,1.5 C14.8,1.5 15.5,2.2 15.5,3 L15.5,17 L15.5,17 L15.5,17 Z"/><circle cx="10.5" cy="16.5" r=".8"/></svg>',pinterest:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.21,1 C5.5,1 3,4.16 3,7.61 C3,9.21 3.85,11.2 5.22,11.84 C5.43,11.94 5.54,11.89 5.58,11.69 C5.62,11.54 5.8,10.8 5.88,10.45 C5.91,10.34 5.89,10.24 5.8,10.14 C5.36,9.59 5,8.58 5,7.65 C5,5.24 6.82,2.91 9.93,2.91 C12.61,2.91 14.49,4.74 14.49,7.35 C14.49,10.3 13,12.35 11.06,12.35 C9.99,12.35 9.19,11.47 9.44,10.38 C9.75,9.08 10.35,7.68 10.35,6.75 C10.35,5.91 9.9,5.21 8.97,5.21 C7.87,5.21 6.99,6.34 6.99,7.86 C6.99,8.83 7.32,9.48 7.32,9.48 C7.32,9.48 6.24,14.06 6.04,14.91 C5.7,16.35 6.08,18.7 6.12,18.9 C6.14,19.01 6.26,19.05 6.33,18.95 C6.44,18.81 7.74,16.85 8.11,15.44 C8.24,14.93 8.79,12.84 8.79,12.84 C9.15,13.52 10.19,14.09 11.29,14.09 C14.58,14.09 16.96,11.06 16.96,7.3 C16.94,3.7 14,1 10.21,1"/></svg>',"play-circle":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon fill="none" stroke="#000" stroke-width="1.1" points="8.5 7 13.5 10 8.5 13"/><circle fill="none" stroke="#000" stroke-width="1.1" cx="10" cy="10" r="9"/></svg>',play:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon fill="none" stroke="#000" points="6.5,5 14.5,10 6.5,15"/></svg>',"plus-circle":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.1" cx="9.5" cy="9.5" r="9"/><line fill="none" stroke="#000" x1="9.5" y1="5" x2="9.5" y2="14"/><line fill="none" stroke="#000" x1="5" y1="9.5" x2="14" y2="9.5"/></svg>',plus:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="9" y="1" width="1" height="17"/><rect x="1" y="9" width="17" height="1"/></svg>',print:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" points="4.5 13.5 1.5 13.5 1.5 6.5 18.5 6.5 18.5 13.5 15.5 13.5"/><polyline fill="none" stroke="#000" points="15.5 6.5 15.5 2.5 4.5 2.5 4.5 6.5"/><rect fill="none" stroke="#000" width="11" height="6" x="4.5" y="11.5"/><rect width="8" height="1" x="6" y="13"/><rect width="8" height="1" x="6" y="15"/></svg>',pull:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="6.85,8 9.5,10.6 12.15,8 12.85,8.7 9.5,12 6.15,8.7"/><line fill="none" stroke="#000" x1="9.5" y1="11" x2="9.5" y2="2"/><polyline fill="none" stroke="#000" points="6,5.5 3.5,5.5 3.5,18.5 15.5,18.5 15.5,5.5 13,5.5"/></svg>',push:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="12.15,4 9.5,1.4 6.85,4 6.15,3.3 9.5,0 12.85,3.3"/><line fill="none" stroke="#000" x1="9.5" y1="10" x2="9.5" y2="1"/><polyline fill="none" stroke="#000" points="6 5.5 3.5 5.5 3.5 18.5 15.5 18.5 15.5 5.5 13 5.5"/></svg>',question:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.1" cx="10" cy="10" r="9"/><circle cx="10.44" cy="14.42" r="1.05"/><path fill="none" stroke="#000" stroke-width="1.2" d="M8.17,7.79 C8.17,4.75 12.72,4.73 12.72,7.72 C12.72,8.67 11.81,9.15 11.23,9.75 C10.75,10.24 10.51,10.73 10.45,11.4 C10.44,11.53 10.43,11.64 10.43,11.75"/></svg>',"quote-right":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.27,7.79 C17.27,9.45 16.97,10.43 15.99,12.02 C14.98,13.64 13,15.23 11.56,15.97 L11.1,15.08 C12.34,14.2 13.14,13.51 14.02,11.82 C14.27,11.34 14.41,10.92 14.49,10.54 C14.3,10.58 14.09,10.6 13.88,10.6 C12.06,10.6 10.59,9.12 10.59,7.3 C10.59,5.48 12.06,4 13.88,4 C15.39,4 16.67,5.02 17.05,6.42 C17.19,6.82 17.27,7.27 17.27,7.79 L17.27,7.79 Z"/><path d="M8.68,7.79 C8.68,9.45 8.38,10.43 7.4,12.02 C6.39,13.64 4.41,15.23 2.97,15.97 L2.51,15.08 C3.75,14.2 4.55,13.51 5.43,11.82 C5.68,11.34 5.82,10.92 5.9,10.54 C5.71,10.58 5.5,10.6 5.29,10.6 C3.47,10.6 2,9.12 2,7.3 C2,5.48 3.47,4 5.29,4 C6.8,4 8.08,5.02 8.46,6.42 C8.6,6.82 8.68,7.27 8.68,7.79 L8.68,7.79 Z"/></svg>',receiver:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="1.01" d="M6.189,13.611C8.134,15.525 11.097,18.239 13.867,18.257C16.47,18.275 18.2,16.241 18.2,16.241L14.509,12.551L11.539,13.639L6.189,8.29L7.313,5.355L3.76,1.8C3.76,1.8 1.732,3.537 1.7,6.092C1.667,8.809 4.347,11.738 6.189,13.611"/></svg>',reddit:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M19 9.05a2.56 2.56 0 0 0-2.56-2.56 2.59 2.59 0 0 0-1.88.82 10.63 10.63 0 0 0-4.14-1v-.08c.58-1.62 1.58-3.89 2.7-4.1.38-.08.77.12 1.19.57a1.15 1.15 0 0 0-.06.37 1.48 1.48 0 1 0 1.51-1.45 1.43 1.43 0 0 0-.76.19A2.29 2.29 0 0 0 12.91 1c-2.11.43-3.39 4.38-3.63 5.19 0 0 0 .11-.06.11a10.65 10.65 0 0 0-3.75 1A2.56 2.56 0 0 0 1 9.05a2.42 2.42 0 0 0 .72 1.76A5.18 5.18 0 0 0 1.24 13c0 3.66 3.92 6.64 8.73 6.64s8.74-3 8.74-6.64a5.23 5.23 0 0 0-.46-2.13A2.58 2.58 0 0 0 19 9.05zm-16.88 0a1.44 1.44 0 0 1 2.27-1.19 7.68 7.68 0 0 0-2.07 1.91 1.33 1.33 0 0 1-.2-.72zM10 18.4c-4.17 0-7.55-2.4-7.55-5.4S5.83 7.53 10 7.53 17.5 10 17.5 13s-3.38 5.4-7.5 5.4zm7.69-8.61a7.62 7.62 0 0 0-2.09-1.91 1.41 1.41 0 0 1 .84-.28 1.47 1.47 0 0 1 1.44 1.45 1.34 1.34 0 0 1-.21.72z"/><path d="M6.69 12.58a1.39 1.39 0 1 1 1.39-1.39 1.38 1.38 0 0 1-1.38 1.39z"/><path d="M14.26 11.2a1.39 1.39 0 1 1-1.39-1.39 1.39 1.39 0 0 1 1.39 1.39z"/><path d="M13.09 14.88a.54.54 0 0 1-.09.77 5.3 5.3 0 0 1-3.26 1.19 5.61 5.61 0 0 1-3.4-1.22.55.55 0 1 1 .73-.83 4.09 4.09 0 0 0 5.25 0 .56.56 0 0 1 .77.09z"/></svg>',refresh:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="1.1" d="M17.08,11.15 C17.09,11.31 17.1,11.47 17.1,11.64 C17.1,15.53 13.94,18.69 10.05,18.69 C6.16,18.68 3,15.53 3,11.63 C3,7.74 6.16,4.58 10.05,4.58 C10.9,4.58 11.71,4.73 12.46,5"/><polyline fill="none" stroke="#000" points="9.9 2 12.79 4.89 9.79 7.9"/></svg>',reply:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.7,13.11 C16.12,10.02 13.84,7.85 11.02,6.61 C10.57,6.41 9.75,6.13 9,5.91 L9,2 L1,9 L9,16 L9,12.13 C10.78,12.47 12.5,13.19 14.09,14.25 C17.13,16.28 18.56,18.54 18.56,18.54 C18.56,18.54 18.81,15.28 17.7,13.11 L17.7,13.11 Z M14.82,13.53 C13.17,12.4 11.01,11.4 8,10.92 L8,13.63 L2.55,9 L8,4.25 L8,6.8 C8.3,6.86 9.16,7.02 10.37,7.49 C13.3,8.65 15.54,10.96 16.65,13.08 C16.97,13.7 17.48,14.86 17.68,16 C16.87,15.05 15.73,14.15 14.82,13.53 L14.82,13.53 Z"/></svg>',rss:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle cx="3.12" cy="16.8" r="1.85"/><path fill="none" stroke="#000" stroke-width="1.1" d="M1.5,8.2 C1.78,8.18 2.06,8.16 2.35,8.16 C7.57,8.16 11.81,12.37 11.81,17.57 C11.81,17.89 11.79,18.19 11.76,18.5"/><path fill="none" stroke="#000" stroke-width="1.1" d="M1.5,2.52 C1.78,2.51 2.06,2.5 2.35,2.5 C10.72,2.5 17.5,9.24 17.5,17.57 C17.5,17.89 17.49,18.19 17.47,18.5"/></svg>',search:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.1" cx="9" cy="9" r="7"/><path fill="none" stroke="#000" stroke-width="1.1" d="M14,14 L18,18 L14,14 Z"/></svg>',server:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="1" height="2"/><rect x="5" y="3" width="1" height="2"/><rect x="7" y="3" width="1" height="2"/><rect x="16" y="3" width="1" height="1"/><rect x="16" y="10" width="1" height="1"/><circle fill="none" stroke="#000" cx="9.9" cy="17.4" r="1.4"/><rect x="3" y="10" width="1" height="2"/><rect x="5" y="10" width="1" height="2"/><rect x="9.5" y="14" width="1" height="2"/><rect x="3" y="17" width="6" height="1"/><rect x="11" y="17" width="6" height="1"/><rect fill="none" stroke="#000" x="1.5" y="1.5" width="17" height="5"/><rect fill="none" stroke="#000" x="1.5" y="8.5" width="17" height="5"/></svg>',settings:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><ellipse fill="none" stroke="#000" cx="6.11" cy="3.55" rx="2.11" ry="2.15"/><ellipse fill="none" stroke="#000" cx="6.11" cy="15.55" rx="2.11" ry="2.15"/><circle fill="none" stroke="#000" cx="13.15" cy="9.55" r="2.15"/><rect x="1" y="3" width="3" height="1"/><rect x="10" y="3" width="8" height="1"/><rect x="1" y="9" width="8" height="1"/><rect x="15" y="9" width="3" height="1"/><rect x="1" y="15" width="3" height="1"/><rect x="10" y="15" width="8" height="1"/></svg>',shrink:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="11 4 12 4 12 8 16 8 16 9 11 9"/><polygon points="4 11 9 11 9 16 8 16 8 12 4 12"/><path fill="none" stroke="#000" stroke-width="1.1" d="M12,8 L18,2"/><path fill="none" stroke="#000" stroke-width="1.1" d="M2,18 L8,12"/></svg>',"sign-in":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="7 2 17 2 17 17 7 17 7 16 16 16 16 3 7 3"/><polygon points="9.1 13.4 8.5 12.8 11.28 10 4 10 4 9 11.28 9 8.5 6.2 9.1 5.62 13 9.5"/></svg>',"sign-out":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="13.1 13.4 12.5 12.8 15.28 10 8 10 8 9 15.28 9 12.5 6.2 13.1 5.62 17 9.5"/><polygon points="13 2 3 2 3 17 13 17 13 16 4 16 4 3 13 3"/></svg>',social:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><line fill="none" stroke="#000" stroke-width="1.1" x1="13.4" y1="14" x2="6.3" y2="10.7"/><line fill="none" stroke="#000" stroke-width="1.1" x1="13.5" y1="5.5" x2="6.5" y2="8.8"/><circle fill="none" stroke="#000" stroke-width="1.1" cx="15.5" cy="4.6" r="2.3"/><circle fill="none" stroke="#000" stroke-width="1.1" cx="15.5" cy="14.8" r="2.3"/><circle fill="none" stroke="#000" stroke-width="1.1" cx="4.5" cy="9.8" r="2.3"/></svg>',soundcloud:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.2,9.4c-0.4,0-0.8,0.1-1.101,0.2c-0.199-2.5-2.399-4.5-5-4.5c-0.6,0-1.2,0.1-1.7,0.3C9.2,5.5,9.1,5.6,9.1,5.6V15h8 c1.601,0,2.801-1.2,2.801-2.8C20,10.7,18.7,9.4,17.2,9.4L17.2,9.4z"/><rect x="6" y="6.5" width="1.5" height="8.5"/><rect x="3" y="8" width="1.5" height="7"/><rect y="10" width="1.5" height="5"/></svg>',star:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon fill="none" stroke="#000" stroke-width="1.01" points="10 2 12.63 7.27 18.5 8.12 14.25 12.22 15.25 18 10 15.27 4.75 18 5.75 12.22 1.5 8.12 7.37 7.27"/></svg>',strikethrough:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6,13.02 L6.65,13.02 C7.64,15.16 8.86,16.12 10.41,16.12 C12.22,16.12 12.92,14.93 12.92,13.89 C12.92,12.55 11.99,12.03 9.74,11.23 C8.05,10.64 6.23,10.11 6.23,7.83 C6.23,5.5 8.09,4.09 10.4,4.09 C11.44,4.09 12.13,4.31 12.72,4.54 L13.33,4 L13.81,4 L13.81,7.59 L13.16,7.59 C12.55,5.88 11.52,4.89 10.07,4.89 C8.84,4.89 7.89,5.69 7.89,7.03 C7.89,8.29 8.89,8.78 10.88,9.45 C12.57,10.03 14.38,10.6 14.38,12.91 C14.38,14.75 13.27,16.93 10.18,16.93 C9.18,16.93 8.17,16.69 7.46,16.39 L6.52,17 L6,17 L6,13.02 L6,13.02 Z"/><rect x="3" y="10" width="15" height="1"/></svg>',table:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="3" width="18" height="1"/><rect x="1" y="7" width="18" height="1"/><rect x="1" y="11" width="18" height="1"/><rect x="1" y="15" width="18" height="1"/></svg>',"tablet-landscape":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" d="M1.5,5 C1.5,4.2 2.2,3.5 3,3.5 L17,3.5 C17.8,3.5 18.5,4.2 18.5,5 L18.5,16 C18.5,16.8 17.8,17.5 17,17.5 L3,17.5 C2.2,17.5 1.5,16.8 1.5,16 L1.5,5 L1.5,5 L1.5,5 Z"/><circle cx="3.7" cy="10.5" r=".8"/></svg>',tablet:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" d="M5,18.5 C4.2,18.5 3.5,17.8 3.5,17 L3.5,3 C3.5,2.2 4.2,1.5 5,1.5 L16,1.5 C16.8,1.5 17.5,2.2 17.5,3 L17.5,17 C17.5,17.8 16.8,18.5 16,18.5 L5,18.5 L5,18.5 L5,18.5 Z"/><circle cx="10.5" cy="16.3" r=".8"/></svg>',tag:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="1.1" d="M17.5,3.71 L17.5,7.72 C17.5,7.96 17.4,8.2 17.21,8.39 L8.39,17.2 C7.99,17.6 7.33,17.6 6.93,17.2 L2.8,13.07 C2.4,12.67 2.4,12.01 2.8,11.61 L11.61,2.8 C11.81,2.6 12.08,2.5 12.34,2.5 L16.19,2.5 C16.52,2.5 16.86,2.63 17.11,2.88 C17.35,3.11 17.48,3.4 17.5,3.71 L17.5,3.71 Z"/><circle cx="14" cy="6" r="1"/></svg>',thumbnails:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect fill="none" stroke="#000" x="3.5" y="3.5" width="5" height="5"/><rect fill="none" stroke="#000" x="11.5" y="3.5" width="5" height="5"/><rect fill="none" stroke="#000" x="11.5" y="11.5" width="5" height="5"/><rect fill="none" stroke="#000" x="3.5" y="11.5" width="5" height="5"/></svg>',trash:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" points="6.5 3 6.5 1.5 13.5 1.5 13.5 3"/><polyline fill="none" stroke="#000" points="4.5 4 4.5 18.5 15.5 18.5 15.5 4"/><rect x="8" y="7" width="1" height="9"/><rect x="11" y="7" width="1" height="9"/><rect x="2" y="3" width="16" height="1"/></svg>',"triangle-down":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="5 7 15 7 10 12"/></svg>',"triangle-left":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="12 5 7 10 12 15"/></svg>',"triangle-right":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="8 5 13 10 8 15"/></svg>',"triangle-up":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="5 13 10 8 15 13"/></svg>',tripadvisor:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M19.021,7.866C19.256,6.862,20,5.854,20,5.854h-3.346C14.781,4.641,12.504,4,9.98,4C7.363,4,4.999,4.651,3.135,5.876H0\tc0,0,0.738,0.987,0.976,1.988c-0.611,0.837-0.973,1.852-0.973,2.964c0,2.763,2.249,5.009,5.011,5.009\tc1.576,0,2.976-0.737,3.901-1.879l1.063,1.599l1.075-1.615c0.475,0.611,1.1,1.111,1.838,1.451c1.213,0.547,2.574,0.612,3.825,0.15\tc2.589-0.963,3.913-3.852,2.964-6.439c-0.175-0.463-0.4-0.876-0.675-1.238H19.021z M16.38,14.594\tc-1.002,0.371-2.088,0.328-3.06-0.119c-0.688-0.317-1.252-0.817-1.657-1.438c-0.164-0.25-0.313-0.52-0.417-0.811\tc-0.124-0.328-0.186-0.668-0.217-1.014c-0.063-0.689,0.037-1.396,0.339-2.043c0.448-0.971,1.251-1.71,2.25-2.079\tc2.075-0.765,4.375,0.3,5.14,2.366c0.762,2.066-0.301,4.37-2.363,5.134L16.38,14.594L16.38,14.594z M8.322,13.066\tc-0.72,1.059-1.935,1.76-3.309,1.76c-2.207,0-4.001-1.797-4.001-3.996c0-2.203,1.795-4.002,4.001-4.002\tc2.204,0,3.999,1.8,3.999,4.002c0,0.137-0.024,0.261-0.04,0.396c-0.067,0.678-0.284,1.313-0.648,1.853v-0.013H8.322z M2.472,10.775\tc0,1.367,1.112,2.479,2.476,2.479c1.363,0,2.472-1.11,2.472-2.479c0-1.359-1.11-2.468-2.472-2.468\tC3.584,8.306,2.473,9.416,2.472,10.775L2.472,10.775z M12.514,10.775c0,1.367,1.104,2.479,2.471,2.479\tc1.363,0,2.474-1.108,2.474-2.479c0-1.359-1.11-2.468-2.474-2.468c-1.364,0-2.477,1.109-2.477,2.468H12.514z M3.324,10.775\tc0-0.893,0.726-1.618,1.614-1.618c0.889,0,1.625,0.727,1.625,1.618c0,0.898-0.725,1.627-1.625,1.627\tc-0.901,0-1.625-0.729-1.625-1.627H3.324z M13.354,10.775c0-0.893,0.726-1.618,1.627-1.618c0.886,0,1.61,0.727,1.61,1.618\tc0,0.898-0.726,1.627-1.626,1.627s-1.625-0.729-1.625-1.627H13.354z M9.977,4.875c1.798,0,3.425,0.324,4.849,0.968\tc-0.535,0.015-1.061,0.108-1.586,0.3c-1.264,0.463-2.264,1.388-2.815,2.604c-0.262,0.551-0.398,1.133-0.448,1.72\tC9.79,7.905,7.677,5.873,5.076,5.82C6.501,5.208,8.153,4.875,9.94,4.875H9.977z"/></svg>',tumblr:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6.885,8.598c0,0,0,3.393,0,4.996c0,0.282,0,0.66,0.094,0.942c0.377,1.509,1.131,2.545,2.545,3.11 c1.319,0.472,2.356,0.472,3.676,0c0.565-0.188,1.132-0.659,1.132-0.659l-0.849-2.263c0,0-1.036,0.378-1.603,0.283 c-0.565-0.094-1.226-0.66-1.226-1.508c0-1.603,0-4.902,0-4.902h2.828V5.771h-2.828V2H8.205c0,0-0.094,0.66-0.188,0.942 C7.828,3.791,7.262,4.733,6.603,5.394C5.848,6.147,5,6.43,5,6.43v2.168H6.885z"/></svg>',tv:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="7" y="16" width="6" height="1"/><rect fill="none" stroke="#000" x=".5" y="3.5" width="19" height="11"/></svg>',twitter:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M19,4.74 C18.339,5.029 17.626,5.229 16.881,5.32 C17.644,4.86 18.227,4.139 18.503,3.28 C17.79,3.7 17.001,4.009 16.159,4.17 C15.485,3.45 14.526,3 13.464,3 C11.423,3 9.771,4.66 9.771,6.7 C9.771,6.99 9.804,7.269 9.868,7.539 C6.795,7.38 4.076,5.919 2.254,3.679 C1.936,4.219 1.754,4.86 1.754,5.539 C1.754,6.82 2.405,7.95 3.397,8.61 C2.79,8.589 2.22,8.429 1.723,8.149 L1.723,8.189 C1.723,9.978 2.997,11.478 4.686,11.82 C4.376,11.899 4.049,11.939 3.713,11.939 C3.475,11.939 3.245,11.919 3.018,11.88 C3.49,13.349 4.852,14.419 6.469,14.449 C5.205,15.429 3.612,16.019 1.882,16.019 C1.583,16.019 1.29,16.009 1,15.969 C2.635,17.019 4.576,17.629 6.662,17.629 C13.454,17.629 17.17,12 17.17,7.129 C17.17,6.969 17.166,6.809 17.157,6.649 C17.879,6.129 18.504,5.478 19,4.74"/></svg>',uikit:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="14.4,3.1 11.3,5.1 15,7.3 15,12.9 10,15.7 5,12.9 5,8.5 2,6.8 2,14.8 9.9,19.5 18,14.8 18,5.3"/><polygon points="9.8,4.2 6.7,2.4 9.8,0.4 12.9,2.3"/></svg>',unlock:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect fill="none" stroke="#000" x="3.5" y="8.5" width="13" height="10"/><path fill="none" stroke="#000" d="M6.5,8.5 L6.5,4.9 C6.5,3 8.1,1.5 10,1.5 C11.9,1.5 13.5,3 13.5,4.9"/></svg>',upload:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" points="5 8 9.5 3.5 14 8"/><rect x="3" y="17" width="13" height="1"/><line fill="none" stroke="#000" x1="9.5" y1="15" x2="9.5" y2="4"/></svg>',user:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.1" cx="9.9" cy="6.4" r="4.4"/><path fill="none" stroke="#000" stroke-width="1.1" d="M1.5,19 C2.3,14.5 5.8,11.2 10,11.2 C14.2,11.2 17.7,14.6 18.5,19.2"/></svg>',users:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.1" cx="7.7" cy="8.6" r="3.5"/><path fill="none" stroke="#000" stroke-width="1.1" d="M1,18.1 C1.7,14.6 4.4,12.1 7.6,12.1 C10.9,12.1 13.7,14.8 14.3,18.3"/><path fill="none" stroke="#000" stroke-width="1.1" d="M11.4,4 C12.8,2.4 15.4,2.8 16.3,4.7 C17.2,6.6 15.7,8.9 13.6,8.9 C16.5,8.9 18.8,11.3 19.2,14.1"/></svg>',"video-camera":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon fill="none" stroke="#000" points="17.5 6.9 17.5 13.1 13.5 10.4 13.5 14.5 2.5 14.5 2.5 5.5 13.5 5.5 13.5 9.6 17.5 6.9"/></svg>',vimeo:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.065,7.59C1.84,7.367,1.654,7.082,1.468,6.838c-0.332-0.42-0.137-0.411,0.274-0.772c1.026-0.91,2.004-1.896,3.127-2.688 c1.017-0.713,2.365-1.173,3.286-0.039c0.849,1.045,0.869,2.629,1.084,3.891c0.215,1.309,0.421,2.648,0.88,3.901 c0.127,0.352,0.37,1.018,0.81,1.074c0.567,0.078,1.145-0.917,1.408-1.289c0.684-0.987,1.611-2.317,1.494-3.587 c-0.115-1.349-1.572-1.095-2.482-0.773c0.146-1.514,1.555-3.216,2.912-3.792c1.439-0.597,3.579-0.587,4.302,1.036 c0.772,1.759,0.078,3.802-0.763,5.396c-0.918,1.731-2.1,3.333-3.363,4.829c-1.114,1.329-2.432,2.787-4.093,3.422 c-1.897,0.723-3.021-0.686-3.667-2.318c-0.705-1.777-1.056-3.771-1.565-5.621C4.898,8.726,4.644,7.836,4.136,7.191 C3.473,6.358,2.72,7.141,2.065,7.59C1.977,7.502,2.115,7.551,2.065,7.59L2.065,7.59z"/></svg>',warning:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="14" r="1"/><circle fill="none" stroke="#000" stroke-width="1.1" cx="10" cy="10" r="9"/><path d="M10.97,7.72 C10.85,9.54 10.56,11.29 10.56,11.29 C10.51,11.87 10.27,12 9.99,12 C9.69,12 9.49,11.87 9.43,11.29 C9.43,11.29 9.16,9.54 9.03,7.72 C8.96,6.54 9.03,6 9.03,6 C9.03,5.45 9.46,5.02 9.99,5 C10.53,5.01 10.97,5.44 10.97,6 C10.97,6 11.04,6.54 10.97,7.72 L10.97,7.72 Z"/></svg>',whatsapp:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M16.7,3.3c-1.8-1.8-4.1-2.8-6.7-2.8c-5.2,0-9.4,4.2-9.4,9.4c0,1.7,0.4,3.3,1.3,4.7l-1.3,4.9l5-1.3c1.4,0.8,2.9,1.2,4.5,1.2 l0,0l0,0c5.2,0,9.4-4.2,9.4-9.4C19.5,7.4,18.5,5,16.7,3.3 M10.1,17.7L10.1,17.7c-1.4,0-2.8-0.4-4-1.1l-0.3-0.2l-3,0.8l0.8-2.9 l-0.2-0.3c-0.8-1.2-1.2-2.7-1.2-4.2c0-4.3,3.5-7.8,7.8-7.8c2.1,0,4.1,0.8,5.5,2.3c1.5,1.5,2.3,3.4,2.3,5.5 C17.9,14.2,14.4,17.7,10.1,17.7 M14.4,11.9c-0.2-0.1-1.4-0.7-1.6-0.8c-0.2-0.1-0.4-0.1-0.5,0.1c-0.2,0.2-0.6,0.8-0.8,0.9 c-0.1,0.2-0.3,0.2-0.5,0.1c-0.2-0.1-1-0.4-1.9-1.2c-0.7-0.6-1.2-1.4-1.3-1.6c-0.1-0.2,0-0.4,0.1-0.5C8,8.8,8.1,8.7,8.2,8.5 c0.1-0.1,0.2-0.2,0.2-0.4c0.1-0.2,0-0.3,0-0.4C8.4,7.6,7.9,6.5,7.7,6C7.5,5.5,7.3,5.6,7.2,5.6c-0.1,0-0.3,0-0.4,0 c-0.2,0-0.4,0.1-0.6,0.3c-0.2,0.2-0.8,0.8-0.8,2c0,1.2,0.8,2.3,1,2.4c0.1,0.2,1.7,2.5,4,3.5c0.6,0.2,1,0.4,1.3,0.5 c0.6,0.2,1.1,0.2,1.5,0.1c0.5-0.1,1.4-0.6,1.6-1.1c0.2-0.5,0.2-1,0.1-1.1C14.8,12.1,14.6,12,14.4,11.9"/></svg>',wordpress:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10,0.5c-5.2,0-9.5,4.3-9.5,9.5s4.3,9.5,9.5,9.5c5.2,0,9.5-4.3,9.5-9.5S15.2,0.5,10,0.5L10,0.5L10,0.5z M15.6,3.9h-0.1 c-0.8,0-1.4,0.7-1.4,1.5c0,0.7,0.4,1.3,0.8,1.9c0.3,0.6,0.7,1.3,0.7,2.3c0,0.7-0.3,1.5-0.6,2.7L14.1,15l-3-8.9 c0.5,0,0.9-0.1,0.9-0.1C12.5,6,12.5,5.3,12,5.4c0,0-1.3,0.1-2.2,0.1C9,5.5,7.7,5.4,7.7,5.4C7.2,5.3,7.2,6,7.6,6c0,0,0.4,0.1,0.9,0.1 l1.3,3.5L8,15L5,6.1C5.5,6.1,5.9,6,5.9,6C6.4,6,6.3,5.3,5.9,5.4c0,0-1.3,0.1-2.2,0.1c-0.2,0-0.3,0-0.5,0c1.5-2.2,4-3.7,6.9-3.7 C12.2,1.7,14.1,2.6,15.6,3.9L15.6,3.9L15.6,3.9z M2.5,6.6l3.9,10.8c-2.7-1.3-4.6-4.2-4.6-7.4C1.8,8.8,2,7.6,2.5,6.6L2.5,6.6L2.5,6.6 z M10.2,10.7l2.5,6.9c0,0,0,0.1,0.1,0.1C11.9,18,11,18.2,10,18.2c-0.8,0-1.6-0.1-2.3-0.3L10.2,10.7L10.2,10.7L10.2,10.7z M14.2,17.1 l2.5-7.3c0.5-1.2,0.6-2.1,0.6-2.9c0-0.3,0-0.6-0.1-0.8c0.6,1.2,1,2.5,1,4C18.3,13,16.6,15.7,14.2,17.1L14.2,17.1L14.2,17.1z"/></svg>',world:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" d="M1,10.5 L19,10.5"/><path fill="none" stroke="#000" d="M2.35,15.5 L17.65,15.5"/><path fill="none" stroke="#000" d="M2.35,5.5 L17.523,5.5"/><path fill="none" stroke="#000" d="M10,19.46 L9.98,19.46 C7.31,17.33 5.61,14.141 5.61,10.58 C5.61,7.02 7.33,3.83 10,1.7 C10.01,1.7 9.99,1.7 10,1.7 L10,1.7 C12.67,3.83 14.4,7.02 14.4,10.58 C14.4,14.141 12.67,17.33 10,19.46 L10,19.46 L10,19.46 L10,19.46 Z"/><circle fill="none" stroke="#000" cx="10" cy="10.5" r="9"/></svg>',xing:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M4.4,4.56 C4.24,4.56 4.11,4.61 4.05,4.72 C3.98,4.83 3.99,4.97 4.07,5.12 L5.82,8.16 L5.82,8.17 L3.06,13.04 C2.99,13.18 2.99,13.33 3.06,13.44 C3.12,13.55 3.24,13.62 3.4,13.62 L6,13.62 C6.39,13.62 6.57,13.36 6.71,13.12 C6.71,13.12 9.41,8.35 9.51,8.16 C9.49,8.14 7.72,5.04 7.72,5.04 C7.58,4.81 7.39,4.56 6.99,4.56 L4.4,4.56 L4.4,4.56 Z"/><path d="M15.3,1 C14.91,1 14.74,1.25 14.6,1.5 C14.6,1.5 9.01,11.42 8.82,11.74 C8.83,11.76 12.51,18.51 12.51,18.51 C12.64,18.74 12.84,19 13.23,19 L15.82,19 C15.98,19 16.1,18.94 16.16,18.83 C16.23,18.72 16.23,18.57 16.16,18.43 L12.5,11.74 L12.5,11.72 L18.25,1.56 C18.32,1.42 18.32,1.27 18.25,1.16 C18.21,1.06 18.08,1 17.93,1 L15.3,1 L15.3,1 Z"/></svg>',yelp:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.175,14.971c-0.112,0.77-1.686,2.767-2.406,3.054c-0.246,0.1-0.487,0.076-0.675-0.069\tc-0.122-0.096-2.446-3.859-2.446-3.859c-0.194-0.293-0.157-0.682,0.083-0.978c0.234-0.284,0.581-0.393,0.881-0.276\tc0.016,0.01,4.21,1.394,4.332,1.482c0.178,0.148,0.263,0.379,0.225,0.646L17.175,14.971L17.175,14.971z M11.464,10.789\tc-0.203-0.307-0.199-0.666,0.009-0.916c0,0,2.625-3.574,2.745-3.657c0.203-0.135,0.452-0.141,0.69-0.025\tc0.691,0.335,2.085,2.405,2.167,3.199v0.027c0.024,0.271-0.082,0.491-0.273,0.623c-0.132,0.083-4.43,1.155-4.43,1.155\tc-0.322,0.096-0.68-0.06-0.882-0.381L11.464,10.789z M9.475,9.563C9.32,9.609,8.848,9.757,8.269,8.817c0,0-3.916-6.16-4.007-6.351\tc-0.057-0.212,0.011-0.455,0.202-0.65C5.047,1.211,8.21,0.327,9.037,0.529c0.27,0.069,0.457,0.238,0.522,0.479\tc0.047,0.266,0.433,5.982,0.488,7.264C10.098,9.368,9.629,9.517,9.475,9.563z M9.927,19.066c-0.083,0.225-0.273,0.373-0.54,0.421\tc-0.762,0.13-3.15-0.751-3.647-1.342c-0.096-0.131-0.155-0.262-0.167-0.394c-0.011-0.095,0-0.189,0.036-0.272\tc0.061-0.155,2.917-3.538,2.917-3.538c0.214-0.272,0.595-0.355,0.952-0.213c0.345,0.13,0.56,0.428,0.536,0.749\tC10.014,14.479,9.977,18.923,9.927,19.066z M3.495,13.912c-0.235-0.009-0.444-0.148-0.568-0.382c-0.089-0.17-0.151-0.453-0.19-0.794\tC2.63,11.701,2.761,10.144,3.07,9.648c0.145-0.226,0.357-0.345,0.592-0.336c0.154,0,4.255,1.667,4.255,1.667\tc0.321,0.118,0.521,0.453,0.5,0.833c-0.023,0.37-0.236,0.655-0.551,0.738L3.495,13.912z"/></svg>',youtube:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15,4.1c1,0.1,2.3,0,3,0.8c0.8,0.8,0.9,2.1,0.9,3.1C19,9.2,19,10.9,19,12c-0.1,1.1,0,2.4-0.5,3.4c-0.5,1.1-1.4,1.5-2.5,1.6 c-1.2,0.1-8.6,0.1-11,0c-1.1-0.1-2.4-0.1-3.2-1c-0.7-0.8-0.7-2-0.8-3C1,11.8,1,10.1,1,8.9c0-1.1,0-2.4,0.5-3.4C2,4.5,3,4.3,4.1,4.2 C5.3,4.1,12.6,4,15,4.1z M8,7.5v6l5.5-3L8,7.5z"/></svg>'})}return"undefined"!=typeof window&&window.UIkit&&window.UIkit.use(i),i});
},{}],"../cookieconsent.min.js":[function(require,module,exports) {
var define;
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

parcelRequire = function (e, r, n, t) {
  var i = "function" == typeof parcelRequire && parcelRequire,
      o = "function" == typeof require && require;

  function u(n, t) {
    if (!r[n]) {
      if (!e[n]) {
        var f = "function" == typeof parcelRequire && parcelRequire;
        if (!t && f) return f(n, !0);
        if (i) return i(n, !0);
        if (o && "string" == typeof n) return o(n);
        var c = new Error("Cannot find module '" + n + "'");
        throw c.code = "MODULE_NOT_FOUND", c;
      }

      p.resolve = function (r) {
        return e[n][1][r] || r;
      }, p.cache = {};
      var l = r[n] = new u.Module(n);
      e[n][0].call(l.exports, p, l, l.exports, this);
    }

    return r[n].exports;

    function p(e) {
      return u(p.resolve(e));
    }
  }

  u.isParcelRequire = !0, u.Module = function (e) {
    this.id = e, this.bundle = u, this.exports = {};
  }, u.modules = e, u.cache = r, u.parent = i, u.register = function (r, n) {
    e[r] = [function (e, r) {
      r.exports = n;
    }, {}];
  };

  for (var f = 0; f < n.length; f++) {
    u(n[f]);
  }

  if (n.length) {
    var c = u(n[n.length - 1]);
    "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = c : "function" == typeof define && define.amd ? define(function () {
      return c;
    }) : t && (this[t] = c);
  }

  return u;
}({
  "5qf4": [function (require, module, exports) {
    var e = module.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
    "number" == typeof __g && (__g = e);
  }, {}],
  "2uHg": [function (require, module, exports) {
    var r = {}.hasOwnProperty;

    module.exports = function (e, n) {
      return r.call(e, n);
    };
  }, {}],
  "5BXi": [function (require, module, exports) {
    module.exports = function (r) {
      try {
        return !!r();
      } catch (t) {
        return !0;
      }
    };
  }, {}],
  "P9Ib": [function (require, module, exports) {
    module.exports = !require("./_fails")(function () {
      return 7 != Object.defineProperty({}, "a", {
        get: function get() {
          return 7;
        }
      }).a;
    });
  }, {
    "./_fails": "5BXi"
  }],
  "ss9A": [function (require, module, exports) {
    var e = module.exports = {
      version: "2.6.5"
    };
    "number" == typeof __e && (__e = e);
  }, {}],
  "M7z6": [function (require, module, exports) {
    module.exports = function (o) {
      return "object" == _typeof(o) ? null !== o : "function" == typeof o;
    };
  }, {}],
  "eT53": [function (require, module, exports) {
    var r = require("./_is-object");

    module.exports = function (e) {
      if (!r(e)) throw TypeError(e + " is not an object!");
      return e;
    };
  }, {
    "./_is-object": "M7z6"
  }],
  "/vZ6": [function (require, module, exports) {
    var e = require("./_is-object"),
        r = require("./_global").document,
        t = e(r) && e(r.createElement);

    module.exports = function (e) {
      return t ? r.createElement(e) : {};
    };
  }, {
    "./_is-object": "M7z6",
    "./_global": "5qf4"
  }],
  "/o6G": [function (require, module, exports) {
    module.exports = !require("./_descriptors") && !require("./_fails")(function () {
      return 7 != Object.defineProperty(require("./_dom-create")("div"), "a", {
        get: function get() {
          return 7;
        }
      }).a;
    });
  }, {
    "./_descriptors": "P9Ib",
    "./_fails": "5BXi",
    "./_dom-create": "/vZ6"
  }],
  "9y37": [function (require, module, exports) {
    var t = require("./_is-object");

    module.exports = function (r, e) {
      if (!t(r)) return r;
      var o, n;
      if (e && "function" == typeof (o = r.toString) && !t(n = o.call(r))) return n;
      if ("function" == typeof (o = r.valueOf) && !t(n = o.call(r))) return n;
      if (!e && "function" == typeof (o = r.toString) && !t(n = o.call(r))) return n;
      throw TypeError("Can't convert object to primitive value");
    };
  }, {
    "./_is-object": "M7z6"
  }],
  "nw8e": [function (require, module, exports) {
    var e = require("./_an-object"),
        r = require("./_ie8-dom-define"),
        t = require("./_to-primitive"),
        i = Object.defineProperty;

    exports.f = require("./_descriptors") ? Object.defineProperty : function (o, n, u) {
      if (e(o), n = t(n, !0), e(u), r) try {
        return i(o, n, u);
      } catch (c) {}
      if ("get" in u || "set" in u) throw TypeError("Accessors not supported!");
      return "value" in u && (o[n] = u.value), o;
    };
  }, {
    "./_an-object": "eT53",
    "./_ie8-dom-define": "/o6G",
    "./_to-primitive": "9y37",
    "./_descriptors": "P9Ib"
  }],
  "uJ6d": [function (require, module, exports) {
    module.exports = function (e, r) {
      return {
        enumerable: !(1 & e),
        configurable: !(2 & e),
        writable: !(4 & e),
        value: r
      };
    };
  }, {}],
  "0NXb": [function (require, module, exports) {
    var r = require("./_object-dp"),
        e = require("./_property-desc");

    module.exports = require("./_descriptors") ? function (t, u, o) {
      return r.f(t, u, e(1, o));
    } : function (r, e, t) {
      return r[e] = t, r;
    };
  }, {
    "./_object-dp": "nw8e",
    "./_property-desc": "uJ6d",
    "./_descriptors": "P9Ib"
  }],
  "U49f": [function (require, module, exports) {
    var o = 0,
        t = Math.random();

    module.exports = function (n) {
      return "Symbol(".concat(void 0 === n ? "" : n, ")_", (++o + t).toString(36));
    };
  }, {}],
  "H21C": [function (require, module, exports) {
    module.exports = !1;
  }, {}],
  "6zGc": [function (require, module, exports) {
    var r = require("./_core"),
        e = require("./_global"),
        o = "__core-js_shared__",
        i = e[o] || (e[o] = {});

    (module.exports = function (r, e) {
      return i[r] || (i[r] = void 0 !== e ? e : {});
    })("versions", []).push({
      version: r.version,
      mode: require("./_library") ? "pure" : "global",
      copyright: "© 2019 Denis Pushkarev (zloirock.ru)"
    });
  }, {
    "./_core": "ss9A",
    "./_global": "5qf4",
    "./_library": "H21C"
  }],
  "d5RU": [function (require, module, exports) {
    module.exports = require("./_shared")("native-function-to-string", Function.toString);
  }, {
    "./_shared": "6zGc"
  }],
  "PHot": [function (require, module, exports) {
    var e = require("./_global"),
        r = require("./_hide"),
        t = require("./_has"),
        i = require("./_uid")("src"),
        n = require("./_function-to-string"),
        o = "toString",
        u = ("" + n).split(o);

    require("./_core").inspectSource = function (e) {
      return n.call(e);
    }, (module.exports = function (n, o, c, l) {
      var s = "function" == typeof c;
      s && (t(c, "name") || r(c, "name", o)), n[o] !== c && (s && (t(c, i) || r(c, i, n[o] ? "" + n[o] : u.join(String(o)))), n === e ? n[o] = c : l ? n[o] ? n[o] = c : r(n, o, c) : (delete n[o], r(n, o, c)));
    })(Function.prototype, o, function () {
      return "function" == typeof this && this[i] || n.call(this);
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
    module.exports = function (o) {
      if ("function" != typeof o) throw TypeError(o + " is not a function!");
      return o;
    };
  }, {}],
  "E3Kh": [function (require, module, exports) {
    var r = require("./_a-function");

    module.exports = function (n, t, u) {
      if (r(n), void 0 === t) return n;

      switch (u) {
        case 1:
          return function (r) {
            return n.call(t, r);
          };

        case 2:
          return function (r, u) {
            return n.call(t, r, u);
          };

        case 3:
          return function (r, u, e) {
            return n.call(t, r, u, e);
          };
      }

      return function () {
        return n.apply(t, arguments);
      };
    };
  }, {
    "./_a-function": "6kYj"
  }],
  "izCb": [function (require, module, exports) {
    var e = require("./_global"),
        r = require("./_core"),
        o = require("./_hide"),
        i = require("./_redefine"),
        u = require("./_ctx"),
        n = "prototype",
        t = function t(c, f, l) {
      var q,
          _,
          a,
          d,
          p = c & t.F,
          v = c & t.G,
          F = c & t.S,
          x = c & t.P,
          y = c & t.B,
          B = v ? e : F ? e[f] || (e[f] = {}) : (e[f] || {})[n],
          G = v ? r : r[f] || (r[f] = {}),
          P = G[n] || (G[n] = {});

      for (q in v && (l = f), l) {
        a = ((_ = !p && B && void 0 !== B[q]) ? B : l)[q], d = y && _ ? u(a, e) : x && "function" == typeof a ? u(Function.call, a) : a, B && i(B, q, a, c & t.U), G[q] != a && o(G, q, d), x && P[q] != a && (P[q] = a);
      }
    };

    e.core = r, t.F = 1, t.G = 2, t.S = 4, t.P = 8, t.B = 16, t.W = 32, t.U = 64, t.R = 128, module.exports = t;
  }, {
    "./_global": "5qf4",
    "./_core": "ss9A",
    "./_hide": "0NXb",
    "./_redefine": "PHot",
    "./_ctx": "E3Kh"
  }],
  "AoVy": [function (require, module, exports) {
    var e = require("./_uid")("meta"),
        r = require("./_is-object"),
        t = require("./_has"),
        n = require("./_object-dp").f,
        i = 0,
        u = Object.isExtensible || function () {
      return !0;
    },
        f = !require("./_fails")(function () {
      return u(Object.preventExtensions({}));
    }),
        o = function o(r) {
      n(r, e, {
        value: {
          i: "O" + ++i,
          w: {}
        }
      });
    },
        s = function s(n, i) {
      if (!r(n)) return "symbol" == _typeof(n) ? n : ("string" == typeof n ? "S" : "P") + n;

      if (!t(n, e)) {
        if (!u(n)) return "F";
        if (!i) return "E";
        o(n);
      }

      return n[e].i;
    },
        c = function c(r, n) {
      if (!t(r, e)) {
        if (!u(r)) return !0;
        if (!n) return !1;
        o(r);
      }

      return r[e].w;
    },
        E = function E(r) {
      return f && a.NEED && u(r) && !t(r, e) && o(r), r;
    },
        a = module.exports = {
      KEY: e,
      NEED: !1,
      fastKey: s,
      getWeak: c,
      onFreeze: E
    };
  }, {
    "./_uid": "U49f",
    "./_is-object": "M7z6",
    "./_has": "2uHg",
    "./_object-dp": "nw8e",
    "./_fails": "5BXi"
  }],
  "44AI": [function (require, module, exports) {
    var e = require("./_shared")("wks"),
        r = require("./_uid"),
        o = require("./_global").Symbol,
        u = "function" == typeof o,
        i = module.exports = function (i) {
      return e[i] || (e[i] = u && o[i] || (u ? o : r)("Symbol." + i));
    };

    i.store = e;
  }, {
    "./_shared": "6zGc",
    "./_uid": "U49f",
    "./_global": "5qf4"
  }],
  "rq3q": [function (require, module, exports) {
    var e = require("./_object-dp").f,
        r = require("./_has"),
        o = require("./_wks")("toStringTag");

    module.exports = function (t, u, i) {
      t && !r(t = i ? t : t.prototype, o) && e(t, o, {
        configurable: !0,
        value: u
      });
    };
  }, {
    "./_object-dp": "nw8e",
    "./_has": "2uHg",
    "./_wks": "44AI"
  }],
  "AuE7": [function (require, module, exports) {
    exports.f = require("./_wks");
  }, {
    "./_wks": "44AI"
  }],
  "r4vV": [function (require, module, exports) {
    var r = require("./_global"),
        e = require("./_core"),
        o = require("./_library"),
        i = require("./_wks-ext"),
        l = require("./_object-dp").f;

    module.exports = function (u) {
      var a = e.Symbol || (e.Symbol = o ? {} : r.Symbol || {});
      "_" == u.charAt(0) || u in a || l(a, u, {
        value: i.f(u)
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
    var r = {}.toString;

    module.exports = function (t) {
      return r.call(t).slice(8, -1);
    };
  }, {}],
  "nGau": [function (require, module, exports) {
    var e = require("./_cof");

    module.exports = Object("z").propertyIsEnumerable(0) ? Object : function (r) {
      return "String" == e(r) ? r.split("") : Object(r);
    };
  }, {
    "./_cof": "Z5df"
  }],
  "+Bjj": [function (require, module, exports) {
    module.exports = function (o) {
      if (null == o) throw TypeError("Can't call method on  " + o);
      return o;
    };
  }, {}],
  "g6sb": [function (require, module, exports) {
    var e = require("./_iobject"),
        r = require("./_defined");

    module.exports = function (i) {
      return e(r(i));
    };
  }, {
    "./_iobject": "nGau",
    "./_defined": "+Bjj"
  }],
  "yjVO": [function (require, module, exports) {
    var o = Math.ceil,
        r = Math.floor;

    module.exports = function (t) {
      return isNaN(t = +t) ? 0 : (t > 0 ? r : o)(t);
    };
  }, {}],
  "dJBs": [function (require, module, exports) {
    var e = require("./_to-integer"),
        r = Math.min;

    module.exports = function (t) {
      return t > 0 ? r(e(t), 9007199254740991) : 0;
    };
  }, {
    "./_to-integer": "yjVO"
  }],
  "vfEH": [function (require, module, exports) {
    var e = require("./_to-integer"),
        r = Math.max,
        t = Math.min;

    module.exports = function (n, a) {
      return (n = e(n)) < 0 ? r(n + a, 0) : t(n, a);
    };
  }, {
    "./_to-integer": "yjVO"
  }],
  "4Ca7": [function (require, module, exports) {
    var e = require("./_to-iobject"),
        r = require("./_to-length"),
        t = require("./_to-absolute-index");

    module.exports = function (n) {
      return function (i, o, u) {
        var f,
            l = e(i),
            a = r(l.length),
            c = t(u, a);

        if (n && o != o) {
          for (; a > c;) {
            if ((f = l[c++]) != f) return !0;
          }
        } else for (; a > c; c++) {
          if ((n || c in l) && l[c] === o) return n || c || 0;
        }

        return !n && -1;
      };
    };
  }, {
    "./_to-iobject": "g6sb",
    "./_to-length": "dJBs",
    "./_to-absolute-index": "vfEH"
  }],
  "NaGB": [function (require, module, exports) {
    var e = require("./_shared")("keys"),
        r = require("./_uid");

    module.exports = function (u) {
      return e[u] || (e[u] = r(u));
    };
  }, {
    "./_shared": "6zGc",
    "./_uid": "U49f"
  }],
  "vL0Z": [function (require, module, exports) {
    var r = require("./_has"),
        e = require("./_to-iobject"),
        u = require("./_array-includes")(!1),
        i = require("./_shared-key")("IE_PROTO");

    module.exports = function (o, a) {
      var n,
          s = e(o),
          t = 0,
          h = [];

      for (n in s) {
        n != i && r(s, n) && h.push(n);
      }

      for (; a.length > t;) {
        r(s, n = a[t++]) && (~u(h, n) || h.push(n));
      }

      return h;
    };
  }, {
    "./_has": "2uHg",
    "./_to-iobject": "g6sb",
    "./_array-includes": "4Ca7",
    "./_shared-key": "NaGB"
  }],
  "9bbv": [function (require, module, exports) {
    module.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
  }, {}],
  "U9a7": [function (require, module, exports) {
    var e = require("./_object-keys-internal"),
        r = require("./_enum-bug-keys");

    module.exports = Object.keys || function (u) {
      return e(u, r);
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
    var e = require("./_object-keys"),
        r = require("./_object-gops"),
        o = require("./_object-pie");

    module.exports = function (t) {
      var u = e(t),
          i = r.f;
      if (i) for (var c, f = i(t), a = o.f, l = 0; f.length > l;) {
        a.call(t, c = f[l++]) && u.push(c);
      }
      return u;
    };
  }, {
    "./_object-keys": "U9a7",
    "./_object-gops": "EWMd",
    "./_object-pie": "vjRp"
  }],
  "JTrm": [function (require, module, exports) {
    var r = require("./_cof");

    module.exports = Array.isArray || function (e) {
      return "Array" == r(e);
    };
  }, {
    "./_cof": "Z5df"
  }],
  "MiMz": [function (require, module, exports) {
    var e = require("./_object-dp"),
        r = require("./_an-object"),
        t = require("./_object-keys");

    module.exports = require("./_descriptors") ? Object.defineProperties : function (o, i) {
      r(o);

      for (var u, c = t(i), n = c.length, s = 0; n > s;) {
        e.f(o, u = c[s++], i[u]);
      }

      return o;
    };
  }, {
    "./_object-dp": "nw8e",
    "./_an-object": "eT53",
    "./_object-keys": "U9a7",
    "./_descriptors": "P9Ib"
  }],
  "xj/b": [function (require, module, exports) {
    var e = require("./_global").document;

    module.exports = e && e.documentElement;
  }, {
    "./_global": "5qf4"
  }],
  "sYaK": [function (require, module, exports) {
    var e = require("./_an-object"),
        r = require("./_object-dps"),
        t = require("./_enum-bug-keys"),
        n = require("./_shared-key")("IE_PROTO"),
        o = function o() {},
        i = "prototype",
        _u = function u() {
      var e,
          r = require("./_dom-create")("iframe"),
          n = t.length;

      for (r.style.display = "none", require("./_html").appendChild(r), r.src = "javascript:", (e = r.contentWindow.document).open(), e.write("<script>document.F=Object<\/script>"), e.close(), _u = e.F; n--;) {
        delete _u[i][t[n]];
      }

      return _u();
    };

    module.exports = Object.create || function (t, c) {
      var a;
      return null !== t ? (o[i] = e(t), a = new o(), o[i] = null, a[n] = t) : a = _u(), void 0 === c ? a : r(a, c);
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
    var e = require("./_object-keys-internal"),
        r = require("./_enum-bug-keys").concat("length", "prototype");

    exports.f = Object.getOwnPropertyNames || function (t) {
      return e(t, r);
    };
  }, {
    "./_object-keys-internal": "vL0Z",
    "./_enum-bug-keys": "9bbv"
  }],
  "dvol": [function (require, module, exports) {
    var e = require("./_to-iobject"),
        t = require("./_object-gopn").f,
        o = {}.toString,
        r = "object" == (typeof window === "undefined" ? "undefined" : _typeof(window)) && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [],
        n = function n(e) {
      try {
        return t(e);
      } catch (o) {
        return r.slice();
      }
    };

    module.exports.f = function (c) {
      return r && "[object Window]" == o.call(c) ? n(c) : t(e(c));
    };
  }, {
    "./_to-iobject": "g6sb",
    "./_object-gopn": "Vzm0"
  }],
  "uIjZ": [function (require, module, exports) {
    var e = require("./_object-pie"),
        r = require("./_property-desc"),
        i = require("./_to-iobject"),
        t = require("./_to-primitive"),
        o = require("./_has"),
        c = require("./_ie8-dom-define"),
        u = Object.getOwnPropertyDescriptor;

    exports.f = require("./_descriptors") ? u : function (p, q) {
      if (p = i(p), q = t(q, !0), c) try {
        return u(p, q);
      } catch (_) {}
      if (o(p, q)) return r(!e.f.call(p, q), p[q]);
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
    "use strict";

    var e = require("./_global"),
        r = require("./_has"),
        t = require("./_descriptors"),
        i = require("./_export"),
        n = require("./_redefine"),
        o = require("./_meta").KEY,
        u = require("./_fails"),
        s = require("./_shared"),
        f = require("./_set-to-string-tag"),
        a = require("./_uid"),
        c = require("./_wks"),
        l = require("./_wks-ext"),
        p = require("./_wks-define"),
        b = require("./_enum-keys"),
        h = require("./_is-array"),
        y = require("./_an-object"),
        _ = require("./_is-object"),
        q = require("./_to-iobject"),
        g = require("./_to-primitive"),
        m = require("./_property-desc"),
        v = require("./_object-create"),
        d = require("./_object-gopn-ext"),
        S = require("./_object-gopd"),
        j = require("./_object-dp"),
        O = require("./_object-keys"),
        k = S.f,
        w = j.f,
        P = d.f,
        _E = e.Symbol,
        F = e.JSON,
        N = F && F.stringify,
        J = "prototype",
        x = c("_hidden"),
        I = c("toPrimitive"),
        T = {}.propertyIsEnumerable,
        C = s("symbol-registry"),
        M = s("symbols"),
        D = s("op-symbols"),
        G = Object[J],
        K = "function" == typeof _E,
        Q = e.QObject,
        W = !Q || !Q[J] || !Q[J].findChild,
        Y = t && u(function () {
      return 7 != v(w({}, "a", {
        get: function get() {
          return w(this, "a", {
            value: 7
          }).a;
        }
      })).a;
    }) ? function (e, r, t) {
      var i = k(G, r);
      i && delete G[r], w(e, r, t), i && e !== G && w(G, r, i);
    } : w,
        z = function z(e) {
      var r = M[e] = v(_E[J]);
      return r._k = e, r;
    },
        A = K && "symbol" == _typeof(_E.iterator) ? function (e) {
      return "symbol" == _typeof(e);
    } : function (e) {
      return e instanceof _E;
    },
        B = function B(e, t, i) {
      return e === G && B(D, t, i), y(e), t = g(t, !0), y(i), r(M, t) ? (i.enumerable ? (r(e, x) && e[x][t] && (e[x][t] = !1), i = v(i, {
        enumerable: m(0, !1)
      })) : (r(e, x) || w(e, x, m(1, {})), e[x][t] = !0), Y(e, t, i)) : w(e, t, i);
    },
        H = function H(e, r) {
      y(e);

      for (var t, i = b(r = q(r)), n = 0, o = i.length; o > n;) {
        B(e, t = i[n++], r[t]);
      }

      return e;
    },
        L = function L(e, r) {
      return void 0 === r ? v(e) : H(v(e), r);
    },
        R = function R(e) {
      var t = T.call(this, e = g(e, !0));
      return !(this === G && r(M, e) && !r(D, e)) && (!(t || !r(this, e) || !r(M, e) || r(this, x) && this[x][e]) || t);
    },
        U = function U(e, t) {
      if (e = q(e), t = g(t, !0), e !== G || !r(M, t) || r(D, t)) {
        var i = k(e, t);
        return !i || !r(M, t) || r(e, x) && e[x][t] || (i.enumerable = !0), i;
      }
    },
        V = function V(e) {
      for (var t, i = P(q(e)), n = [], u = 0; i.length > u;) {
        r(M, t = i[u++]) || t == x || t == o || n.push(t);
      }

      return n;
    },
        X = function X(e) {
      for (var t, i = e === G, n = P(i ? D : q(e)), o = [], u = 0; n.length > u;) {
        !r(M, t = n[u++]) || i && !r(G, t) || o.push(M[t]);
      }

      return o;
    };

    K || (n((_E = function E() {
      if (this instanceof _E) throw TypeError("Symbol is not a constructor!");

      var e = a(arguments.length > 0 ? arguments[0] : void 0),
          i = function i(t) {
        this === G && i.call(D, t), r(this, x) && r(this[x], e) && (this[x][e] = !1), Y(this, e, m(1, t));
      };

      return t && W && Y(G, e, {
        configurable: !0,
        set: i
      }), z(e);
    })[J], "toString", function () {
      return this._k;
    }), S.f = U, j.f = B, require("./_object-gopn").f = d.f = V, require("./_object-pie").f = R, require("./_object-gops").f = X, t && !require("./_library") && n(G, "propertyIsEnumerable", R, !0), l.f = function (e) {
      return z(c(e));
    }), i(i.G + i.W + i.F * !K, {
      Symbol: _E
    });

    for (var Z = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), $ = 0; Z.length > $;) {
      c(Z[$++]);
    }

    for (var ee = O(c.store), re = 0; ee.length > re;) {
      p(ee[re++]);
    }

    i(i.S + i.F * !K, "Symbol", {
      for: function _for(e) {
        return r(C, e += "") ? C[e] : C[e] = _E(e);
      },
      keyFor: function keyFor(e) {
        if (!A(e)) throw TypeError(e + " is not a symbol!");

        for (var r in C) {
          if (C[r] === e) return r;
        }
      },
      useSetter: function useSetter() {
        W = !0;
      },
      useSimple: function useSimple() {
        W = !1;
      }
    }), i(i.S + i.F * !K, "Object", {
      create: L,
      defineProperty: B,
      defineProperties: H,
      getOwnPropertyDescriptor: U,
      getOwnPropertyNames: V,
      getOwnPropertySymbols: X
    }), F && i(i.S + i.F * (!K || u(function () {
      var e = _E();

      return "[null]" != N([e]) || "{}" != N({
        a: e
      }) || "{}" != N(Object(e));
    })), "JSON", {
      stringify: function stringify(e) {
        for (var r, t, i = [e], n = 1; arguments.length > n;) {
          i.push(arguments[n++]);
        }

        if (t = r = i[1], (_(r) || void 0 !== e) && !A(e)) return h(r) || (r = function r(e, _r) {
          if ("function" == typeof t && (_r = t.call(this, e, _r)), !A(_r)) return _r;
        }), i[1] = r, N.apply(F, i);
      }
    }), _E[J][I] || require("./_hide")(_E[J], I, _E[J].valueOf), f(_E, "Symbol"), f(Math, "Math", !0), f(e.JSON, "JSON", !0);
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
    var e = require("./_cof"),
        t = require("./_wks")("toStringTag"),
        n = "Arguments" == e(function () {
      return arguments;
    }()),
        r = function r(e, t) {
      try {
        return e[t];
      } catch (n) {}
    };

    module.exports = function (u) {
      var o, c, i;
      return void 0 === u ? "Undefined" : null === u ? "Null" : "string" == typeof (c = r(o = Object(u), t)) ? c : n ? e(o) : "Object" == (i = e(o)) && "function" == typeof o.callee ? "Arguments" : i;
    };
  }, {
    "./_cof": "Z5df",
    "./_wks": "44AI"
  }],
  "4zTK": [function (require, module, exports) {
    "use strict";

    var e = require("./_classof"),
        r = {};

    r[require("./_wks")("toStringTag")] = "z", r + "" != "[object z]" && require("./_redefine")(Object.prototype, "toString", function () {
      return "[object " + e(this) + "]";
    }, !0);
  }, {
    "./_classof": "GM7B",
    "./_wks": "44AI",
    "./_redefine": "PHot"
  }],
  "CtPZ": [function (require, module, exports) {
    require("../modules/es6.symbol"), require("../modules/es6.object.to-string"), module.exports = require("../modules/_core").Symbol;
  }, {
    "../modules/es6.symbol": "uVn9",
    "../modules/es6.object.to-string": "4zTK",
    "../modules/_core": "ss9A"
  }],
  "x5yM": [function (require, module, exports) {
    var e = require("./_to-integer"),
        r = require("./_defined");

    module.exports = function (t) {
      return function (n, i) {
        var o,
            u,
            c = String(r(n)),
            d = e(i),
            a = c.length;
        return d < 0 || d >= a ? t ? "" : void 0 : (o = c.charCodeAt(d)) < 55296 || o > 56319 || d + 1 === a || (u = c.charCodeAt(d + 1)) < 56320 || u > 57343 ? t ? c.charAt(d) : o : t ? c.slice(d, d + 2) : u - 56320 + (o - 55296 << 10) + 65536;
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
    "use strict";

    var e = require("./_object-create"),
        r = require("./_property-desc"),
        t = require("./_set-to-string-tag"),
        i = {};

    require("./_hide")(i, require("./_wks")("iterator"), function () {
      return this;
    }), module.exports = function (o, u, s) {
      o.prototype = e(i, {
        next: r(1, s)
      }), t(o, u + " Iterator");
    };
  }, {
    "./_object-create": "sYaK",
    "./_property-desc": "uJ6d",
    "./_set-to-string-tag": "rq3q",
    "./_hide": "0NXb",
    "./_wks": "44AI"
  }],
  "rfVX": [function (require, module, exports) {
    var e = require("./_defined");

    module.exports = function (r) {
      return Object(e(r));
    };
  }, {
    "./_defined": "+Bjj"
  }],
  "8q6y": [function (require, module, exports) {
    var t = require("./_has"),
        e = require("./_to-object"),
        o = require("./_shared-key")("IE_PROTO"),
        r = Object.prototype;

    module.exports = Object.getPrototypeOf || function (c) {
      return c = e(c), t(c, o) ? c[o] : "function" == typeof c.constructor && c instanceof c.constructor ? c.constructor.prototype : c instanceof Object ? r : null;
    };
  }, {
    "./_has": "2uHg",
    "./_to-object": "rfVX",
    "./_shared-key": "NaGB"
  }],
  "mH0U": [function (require, module, exports) {
    "use strict";

    var e = require("./_library"),
        r = require("./_export"),
        t = require("./_redefine"),
        i = require("./_hide"),
        n = require("./_iterators"),
        u = require("./_iter-create"),
        o = require("./_set-to-string-tag"),
        s = require("./_object-gpo"),
        a = require("./_wks")("iterator"),
        c = !([].keys && "next" in [].keys()),
        f = "@@iterator",
        l = "keys",
        q = "values",
        y = function y() {
      return this;
    };

    module.exports = function (_, p, h, k, v, w, d) {
      u(h, p, k);

      var x,
          b,
          g,
          j = function j(e) {
        if (!c && e in I) return I[e];

        switch (e) {
          case l:
          case q:
            return function () {
              return new h(this, e);
            };
        }

        return function () {
          return new h(this, e);
        };
      },
          m = p + " Iterator",
          A = v == q,
          F = !1,
          I = _.prototype,
          O = I[a] || I[f] || v && I[v],
          P = O || j(v),
          z = v ? A ? j("entries") : P : void 0,
          B = "Array" == p && I.entries || O;

      if (B && (g = s(B.call(new _()))) !== Object.prototype && g.next && (o(g, m, !0), e || "function" == typeof g[a] || i(g, a, y)), A && O && O.name !== q && (F = !0, P = function P() {
        return O.call(this);
      }), e && !d || !c && !F && I[a] || i(I, a, P), n[p] = P, n[m] = y, v) if (x = {
        values: A ? P : j(q),
        keys: w ? P : j(l),
        entries: z
      }, d) for (b in x) {
        b in I || t(I, b, x[b]);
      } else r(r.P + r.F * (c || F), p, x);
      return x;
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
    "use strict";

    var i = require("./_string-at")(!0);

    require("./_iter-define")(String, "String", function (i) {
      this._t = String(i), this._i = 0;
    }, function () {
      var t,
          e = this._t,
          n = this._i;
      return n >= e.length ? {
        value: void 0,
        done: !0
      } : (t = i(e, n), this._i += t.length, {
        value: t,
        done: !1
      });
    });
  }, {
    "./_string-at": "x5yM",
    "./_iter-define": "mH0U"
  }],
  "Z7e/": [function (require, module, exports) {
    var e = require("./_wks")("unscopables"),
        r = Array.prototype;

    null == r[e] && require("./_hide")(r, e, {}), module.exports = function (o) {
      r[e][o] = !0;
    };
  }, {
    "./_wks": "44AI",
    "./_hide": "0NXb"
  }],
  "x8b3": [function (require, module, exports) {
    module.exports = function (e, n) {
      return {
        value: n,
        done: !!e
      };
    };
  }, {}],
  "6w+v": [function (require, module, exports) {
    "use strict";

    var e = require("./_add-to-unscopables"),
        r = require("./_iter-step"),
        t = require("./_iterators"),
        i = require("./_to-iobject");

    module.exports = require("./_iter-define")(Array, "Array", function (e, r) {
      this._t = i(e), this._i = 0, this._k = r;
    }, function () {
      var e = this._t,
          t = this._k,
          i = this._i++;
      return !e || i >= e.length ? (this._t = void 0, r(1)) : r(0, "keys" == t ? i : "values" == t ? e[i] : [i, e[i]]);
    }, "values"), t.Arguments = t.Array, e("keys"), e("values"), e("entries");
  }, {
    "./_add-to-unscopables": "Z7e/",
    "./_iter-step": "x8b3",
    "./_iterators": "JO4d",
    "./_to-iobject": "g6sb",
    "./_iter-define": "mH0U"
  }],
  "v6Aj": [function (require, module, exports) {
    for (var e = require("./es6.array.iterator"), t = require("./_object-keys"), i = require("./_redefine"), r = require("./_global"), s = require("./_hide"), L = require("./_iterators"), a = require("./_wks"), o = a("iterator"), l = a("toStringTag"), S = L.Array, n = {
      CSSRuleList: !0,
      CSSStyleDeclaration: !1,
      CSSValueList: !1,
      ClientRectList: !1,
      DOMRectList: !1,
      DOMStringList: !1,
      DOMTokenList: !0,
      DataTransferItemList: !1,
      FileList: !1,
      HTMLAllCollection: !1,
      HTMLCollection: !1,
      HTMLFormElement: !1,
      HTMLSelectElement: !1,
      MediaList: !0,
      MimeTypeArray: !1,
      NamedNodeMap: !1,
      NodeList: !0,
      PaintRequestList: !1,
      Plugin: !1,
      PluginArray: !1,
      SVGLengthList: !1,
      SVGNumberList: !1,
      SVGPathSegList: !1,
      SVGPointList: !1,
      SVGStringList: !1,
      SVGTransformList: !1,
      SourceBufferList: !1,
      StyleSheetList: !0,
      TextTrackCueList: !1,
      TextTrackList: !1,
      TouchList: !1
    }, u = t(n), T = 0; T < u.length; T++) {
      var c,
          g = u[T],
          M = n[g],
          y = r[g],
          f = y && y.prototype;
      if (f && (f[o] || s(f, o, S), f[l] || s(f, l, g), L[g] = S, M)) for (c in e) {
        f[c] || i(f, c, e[c], !0);
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
    require("../../modules/es6.string.iterator"), require("../../modules/web.dom.iterable"), module.exports = require("../../modules/_wks-ext").f("iterator");
  }, {
    "../../modules/es6.string.iterator": "tbKg",
    "../../modules/web.dom.iterable": "v6Aj",
    "../../modules/_wks-ext": "AuE7"
  }],
  "/6wJ": [function (require, module, exports) {
    "use strict";

    function e(e, n) {
      if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
    }

    function n(e, n) {
      for (var t = 0; t < n.length; t++) {
        var o = n[t];
        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);
      }
    }

    function t(e, t, o) {
      return t && n(e.prototype, t), o && n(e, o), e;
    }

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;

    var o = function () {
      function n() {
        e(this, n);
      }

      return t(n, null, [{
        key: "ready",
        value: function value(e) {
          (document.attachEvent ? "complete" === document.readyState : "loading" !== document.readyState) ? e() : document.addEventListener("DOMContentLoaded", e);
        }
      }, {
        key: "objectType",
        value: function value(e) {
          return Object.prototype.toString.call(e).slice(8, -1);
        }
      }, {
        key: "lightenDarkenColor",
        value: function value(e, n) {
          var t = !1;
          "#" == e[0] && (e = e.slice(1), t = !0);
          var o = parseInt(e, 16),
              r = (o >> 16) + n;
          r > 255 ? r = 255 : r < 0 && (r = 0);
          var i = (o >> 8 & 255) + n;
          i > 255 ? i = 255 : i < 0 && (i = 0);
          var a = (255 & o) + n;
          return a > 255 ? a = 255 : a < 0 && (a = 0), (t ? "#" : "") + (a | i << 8 | r << 16).toString(16);
        }
      }, {
        key: "removeCookie",
        value: function value() {
          document.cookie = "cconsent=; expires=Thu, 01 Jan 1980 00:00:00 UTC; path=/;";
        }
      }, {
        key: "listGlobalServices",
        value: function value(e) {
          var n = [];
          if (void 0 === window.CookieConsent) return n;
          if (void 0 === e) for (var t in window.CookieConsent.config.services) {
            n.push(t);
          } else for (var o in window.CookieConsent.config.services) {
            window.CookieConsent.config.services[o].category === e && n.push(o);
          }
          return n;
        }
      }, {
        key: "dispatchEvent",
        value: function value(e, n) {
          "function" == typeof Event ? n = new Event(n) : (n = document.createEvent("Event")).initEvent(n, !0, !0), e.dispatchEvent(n);
        }
      }]), n;
    }();

    exports.default = o;
  }, {}],
  "aJ5U": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;
    var e = o(require("./Utilities"));

    function o(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    function n(e, o) {
      if (!(e instanceof o)) throw new TypeError("Cannot call a class as a function");
    }

    function r(e, o) {
      for (var n = 0; n < o.length; n++) {
        var r = o[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
      }
    }

    function i(e, o, n) {
      return o && r(e.prototype, o), n && r(e, n), e;
    }

    var t = function () {
      function o() {
        n(this, o);
      }

      return i(o, [{
        key: "createBlacklist",
        value: function value(o) {
          var n = {};

          for (var r in window.CookieConsent.config.services) {
            window.CookieConsent.config.services[r].type === o && !1 === window.CookieConsent.config.categories[window.CookieConsent.config.services[r].category].needed && !1 === window.CookieConsent.config.categories[window.CookieConsent.config.services[r].category].wanted && (n[r] = window.CookieConsent.config.services[r]);
          }

          var i = [];

          for (var r in n) {
            if ("String" === (o = e.default.objectType(n[r].search))) i.push(n[r].search);else if ("Array" === o) for (var t = 0; t < n[r].search.length; t++) {
              i.push(n[r].search[t]);
            }
          }

          return i;
        }
      }]), o;
    }();

    exports.default = t;
  }, {
    "./Utilities": "/6wJ"
  }],
  "UWvR": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;
    var e = o(require("./Filter"));

    function o(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    function t(e) {
      return (t = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
        return _typeof(e);
      } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : _typeof(e);
      })(e);
    }

    function n(e, o) {
      if (!(e instanceof o)) throw new TypeError("Cannot call a class as a function");
    }

    function r(e, o) {
      for (var t = 0; t < o.length; t++) {
        var n = o[t];
        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
      }
    }

    function i(e, o, t) {
      return o && r(e.prototype, o), t && r(e, t), e;
    }

    function c(e, o) {
      return !o || "object" !== t(o) && "function" != typeof o ? s(e) : o;
    }

    function s(e) {
      if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return e;
    }

    function f(e) {
      return (f = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
        return e.__proto__ || Object.getPrototypeOf(e);
      })(e);
    }

    function u(e, o) {
      if ("function" != typeof o && null !== o) throw new TypeError("Super expression must either be null or a function");
      e.prototype = Object.create(o && o.prototype, {
        constructor: {
          value: e,
          writable: !0,
          configurable: !0
        }
      }), o && a(e, o);
    }

    function a(e, o) {
      return (a = Object.setPrototypeOf || function (e, o) {
        return e.__proto__ = o, e;
      })(e, o);
    }

    var p = function (o) {
      function t() {
        return n(this, t), c(this, f(t).call(this));
      }

      return u(t, e.default), i(t, [{
        key: "init",
        value: function value() {
          this.overrideAppendChild(), this.overrideInsertBefore();
        }
      }, {
        key: "overrideAppendChild",
        value: function value() {
          Element.prototype.appendChild = function (e) {
            if ("SCRIPT" === arguments[0].tagName) for (var o in window.CookieConsent.config.services) {
              if ("dynamic-script" === window.CookieConsent.config.services[o].type && arguments[0].outerHTML.indexOf(window.CookieConsent.config.services[o].search) >= 0 && !1 === window.CookieConsent.config.categories[window.CookieConsent.config.services[o].category].wanted) return void window.CookieConsent.buffer.appendChild.push({
                this: this,
                category: window.CookieConsent.config.services[o].category,
                arguments: arguments
              });
            }
            return Node.prototype.appendChild.apply(this, arguments);
          };
        }
      }, {
        key: "overrideInsertBefore",
        value: function value() {
          Element.prototype.insertBefore = function (e) {
            if ("SCRIPT" === arguments[0].tagName) for (var o in window.CookieConsent.config.services) {
              if ("dynamic-script" === window.CookieConsent.config.services[o].type && arguments[0].outerHTML.indexOf(window.CookieConsent.config.services[o].search) >= 0 && !1 === window.CookieConsent.config.categories[window.CookieConsent.config.services[o].category].wanted) return void window.CookieConsent.buffer.insertBefore.push({
                this: this,
                category: window.CookieConsent.config.services[o].category,
                arguments: arguments
              });
            }
            return Node.prototype.insertBefore.apply(this, arguments);
          };
        }
      }]), t;
    }();

    exports.default = p;
  }, {
    "./Filter": "aJ5U"
  }],
  "ob2e": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;
    var t = r(require("./Utilities")),
        e = r(require("./Filter"));

    function r(t) {
      return t && t.__esModule ? t : {
        default: t
      };
    }

    function n(t) {
      return (n = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (t) {
        return _typeof(t);
      } : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : _typeof(t);
      })(t);
    }

    function o(t, e) {
      if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
    }

    function i(t, e) {
      for (var r = 0; r < e.length; r++) {
        var n = e[r];
        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
      }
    }

    function u(t, e, r) {
      return e && i(t.prototype, e), r && i(t, r), t;
    }

    function l(t, e) {
      return !e || "object" !== n(e) && "function" != typeof e ? a(t) : e;
    }

    function a(t) {
      if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return t;
    }

    function c(t, e, r) {
      return (c = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function (t, e, r) {
        var n = f(t, e);

        if (n) {
          var o = Object.getOwnPropertyDescriptor(n, e);
          return o.get ? o.get.call(r) : o.value;
        }
      })(t, e, r || t);
    }

    function f(t, e) {
      for (; !Object.prototype.hasOwnProperty.call(t, e) && null !== (t = y(t));) {
        ;
      }

      return t;
    }

    function y(t) {
      return (y = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
        return t.__proto__ || Object.getPrototypeOf(t);
      })(t);
    }

    function p(t, e) {
      if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
      t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          writable: !0,
          configurable: !0
        }
      }), e && s(t, e);
    }

    function s(t, e) {
      return (s = Object.setPrototypeOf || function (t, e) {
        return t.__proto__ = e, t;
      })(t, e);
    }

    var b = function (r) {
      function n() {
        return o(this, n), l(this, y(n).call(this));
      }

      return p(n, e.default), u(n, [{
        key: "init",
        value: function value() {
          this.filterTags();
        }
      }, {
        key: "filterTags",
        value: function value() {
          var e = this;
          t.default.ready(function () {
            var t = c(y(n.prototype), "createBlacklist", e).call(e, "script-tag"),
                r = document.querySelectorAll('script[type="text/plain"]'),
                o = !0,
                i = !1,
                u = void 0;

            try {
              for (var l, a = r[Symbol.iterator](); !(o = (l = a.next()).done); o = !0) {
                var f = l.value;

                if (t.indexOf(f.dataset.consent) < 0) {
                  var p = document.createElement("script"),
                      s = f.parentNode;
                  f.type = "text/javascript";
                  var b = !0,
                      d = !1,
                      v = void 0;

                  try {
                    for (var h, m = f.attributes[Symbol.iterator](); !(b = (h = m.next()).done); b = !0) {
                      var O = h.value;
                      p.setAttribute(O.nodeName, O.nodeValue);
                    }
                  } catch (g) {
                    d = !0, v = g;
                  } finally {
                    try {
                      b || null == m.return || m.return();
                    } finally {
                      if (d) throw v;
                    }
                  }

                  p.innerHTML = f.innerHTML, s.insertBefore(p, f), s.removeChild(f);
                }
              }
            } catch (g) {
              i = !0, u = g;
            } finally {
              try {
                o || null == a.return || a.return();
              } finally {
                if (i) throw u;
              }
            }
          });
        }
      }]), n;
    }();

    exports.default = b;
  }, {
    "./Utilities": "/6wJ",
    "./Filter": "aJ5U"
  }],
  "935K": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;
    var t = e(require("./Filter"));

    function e(t) {
      return t && t.__esModule ? t : {
        default: t
      };
    }

    function r(t) {
      return (r = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (t) {
        return _typeof(t);
      } : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : _typeof(t);
      })(t);
    }

    function n(t, e) {
      if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
    }

    function o(t, e) {
      for (var r = 0; r < e.length; r++) {
        var n = e[r];
        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
      }
    }

    function i(t, e, r) {
      return e && o(t.prototype, e), r && o(t, r), t;
    }

    function u(t, e) {
      return !e || "object" !== r(e) && "function" != typeof e ? f(t) : e;
    }

    function f(t) {
      if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return t;
    }

    function c(t, e, r) {
      return (c = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function (t, e, r) {
        var n = l(t, e);

        if (n) {
          var o = Object.getOwnPropertyDescriptor(n, e);
          return o.get ? o.get.call(r) : o.value;
        }
      })(t, e, r || t);
    }

    function l(t, e) {
      for (; !Object.prototype.hasOwnProperty.call(t, e) && null !== (t = a(t));) {
        ;
      }

      return t;
    }

    function a(t) {
      return (a = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
        return t.__proto__ || Object.getPrototypeOf(t);
      })(t);
    }

    function p(t, e) {
      if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
      t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          writable: !0,
          configurable: !0
        }
      }), e && s(t, e);
    }

    function s(t, e) {
      return (s = Object.setPrototypeOf || function (t, e) {
        return t.__proto__ = e, t;
      })(t, e);
    }

    var y = function (e) {
      function r() {
        return n(this, r), u(this, a(r).call(this));
      }

      return p(r, t.default), i(r, [{
        key: "init",
        value: function value() {
          this.filterWrappers();
        }
      }, {
        key: "filterWrappers",
        value: function value() {
          var t = c(a(r.prototype), "createBlacklist", this).call(this, "wrapped");

          window.CookieConsent.wrapper = function () {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
                r = arguments.length > 1 ? arguments[1] : void 0;
            t.indexOf(e) < 0 && r();
          };
        }
      }]), r;
    }();

    exports.default = y;
  }, {
    "./Filter": "aJ5U"
  }],
  "2E//": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;
    var e = t(require("./Filter"));

    function t(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    function o(e) {
      return (o = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
        return _typeof(e);
      } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : _typeof(e);
      })(e);
    }

    function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }

    function n(e, t) {
      for (var o = 0; o < t.length; o++) {
        var r = t[o];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
      }
    }

    function c(e, t, o) {
      return t && n(e.prototype, t), o && n(e, o), e;
    }

    function i(e, t) {
      return !t || "object" !== o(t) && "function" != typeof t ? u(e) : t;
    }

    function u(e) {
      if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return e;
    }

    function l(e, t, o) {
      return (l = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function (e, t, o) {
        var r = f(e, t);

        if (r) {
          var n = Object.getOwnPropertyDescriptor(r, t);
          return n.get ? n.get.call(o) : n.value;
        }
      })(e, t, o || e);
    }

    function f(e, t) {
      for (; !Object.prototype.hasOwnProperty.call(e, t) && null !== (e = p(e));) {
        ;
      }

      return e;
    }

    function p(e) {
      return (p = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
        return e.__proto__ || Object.getPrototypeOf(e);
      })(e);
    }

    function a(e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
      e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          writable: !0,
          configurable: !0
        }
      }), t && s(e, t);
    }

    function s(e, t) {
      return (s = Object.setPrototypeOf || function (e, t) {
        return e.__proto__ = t, e;
      })(e, t);
    }

    var y = function (t) {
      function o() {
        return r(this, o), i(this, p(o).call(this));
      }

      return a(o, e.default), c(o, [{
        key: "init",
        value: function value() {
          this.filterlocalCookies();
        }
      }, {
        key: "getCookieDescriptor",
        value: function value() {
          var e;
          return (e = Object.getOwnPropertyDescriptor(document, "cookie") || Object.getOwnPropertyDescriptor(HTMLDocument.prototype, "cookie")) || ((e = {}).get = HTMLDocument.prototype.__lookupGetter__("cookie"), e.set = HTMLDocument.prototype.__lookupSetter__("cookie")), e;
        }
      }, {
        key: "filterlocalCookies",
        value: function value() {
          var e = l(p(o.prototype), "createBlacklist", this).call(this, "localcookie"),
              t = this.getCookieDescriptor();
          Object.defineProperty(document, "cookie", {
            configurable: !0,
            get: function get() {
              return t.get.apply(document);
            },
            set: function set() {
              var o = arguments;

              if (e.length) {
                var r = arguments[0].split("=")[0];
                Array.prototype.forEach.call(e, function (e) {
                  r.indexOf(e) < 0 && t.set.apply(document, o);
                });
              } else t.set.apply(document, o);
            }
          });
        }
      }]), o;
    }();

    exports.default = y;
  }, {
    "./Filter": "aJ5U"
  }],
  "GuEK": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.text = exports.svg = exports.s = exports.setChildren = exports.setStyle = exports.setAttr = exports.Router = exports.router = exports.Place = exports.place = exports.unmount = exports.mount = exports.ListPool = exports.listPool = exports.List = exports.list = exports.html = exports.h = exports.el = void 0;

    var e = "#".charCodeAt(0),
        t = ".".charCodeAt(0),
        i = 0,
        n = 1,
        r = 2,
        o = function o(_o) {
      for (var s = null, l = null, u = null, a = i, f = 0, d = 0; d <= _o.length; d++) {
        var v = _o.charCodeAt(d),
            h = v === e,
            p = v === t;

        (h || p || !v) && (a === i ? s = 0 === d ? "div" : _o.substring(f, d) : a === n ? l = _o.substring(f, d) : u ? u += " " + _o.substring(f, d) : u = _o.substring(f, d), h ? a = n : p && (a = r), f = d + 1);
      }

      return {
        tag: s,
        id: l,
        className: u
      };
    },
        s = function s(e, t) {
      var i = o(e),
          n = i.tag,
          r = i.id,
          s = i.className,
          l = t ? document.createElementNS(t, n) : document.createElement(n);
      return r && (l.id = r), s && (t ? l.setAttribute("class", s) : l.className = s), l;
    },
        l = function l(e, t) {
      var i = N(e),
          n = N(t);
      return t === n && n.__redom_view && (t = n.__redom_view), n.parentNode && (u(t, n, i), i.removeChild(n)), t;
    };

    exports.unmount = l;

    var u = function u(e, t, i) {
      var n = t.__redom_lifecycle;
      if (a(n)) t.__redom_mounted = !1;else {
        var r = i;

        for (t.__redom_mounted && p(t, "onunmount"); r;) {
          var o = r.__redom_lifecycle || {};

          for (var s in n) {
            o[s] && (o[s] -= n[s]);
          }

          a(o) && (r.__redom_lifecycle = null), r = r.parentNode;
        }
      }
    },
        a = function a(e) {
      if (null == e) return !0;

      for (var t in e) {
        if (e[t]) return !1;
      }

      return !0;
    },
        f = ["onmount", "onremount", "onunmount"],
        d = "undefined" != typeof window && "ShadowRoot" in window,
        v = function v(e, t, i, n) {
      var r = N(e),
          o = N(t);
      t === o && o.__redom_view && (t = o.__redom_view), t !== o && (o.__redom_view = t);
      var s = o.__redom_mounted,
          l = o.parentNode;
      return s && l !== r && u(t, o, l), null != i ? n ? r.replaceChild(o, N(i)) : r.insertBefore(o, N(i)) : r.appendChild(o), h(t, o, r, l), t;
    };

    exports.mount = v;

    var h = function h(e, t, i, n) {
      for (var r = t.__redom_lifecycle || (t.__redom_lifecycle = {}), o = i === n, s = !1, l = 0, u = f; l < u.length; l += 1) {
        var a = u[l];
        o || e !== t && a in e && (r[a] = (r[a] || 0) + 1), r[a] && (s = !0);
      }

      if (s) {
        var v = i,
            h = !1;

        for ((o || v && v.__redom_mounted) && (p(t, o ? "onremount" : "onmount"), h = !0); v;) {
          var _ = v.parentNode,
              c = v.__redom_lifecycle || (v.__redom_lifecycle = {});

          for (var w in r) {
            c[w] = (c[w] || 0) + r[w];
          }

          if (h) break;
          (v === document || d && v instanceof window.ShadowRoot || _ && _.__redom_mounted) && (p(v, o ? "onremount" : "onmount"), h = !0), v = _;
        }
      } else t.__redom_mounted = !0;
    },
        p = function p(e, t) {
      "onmount" === t || "onremount" === t ? e.__redom_mounted = !0 : "onunmount" === t && (e.__redom_mounted = !1);
      var i = e.__redom_lifecycle;

      if (i) {
        var n = e.__redom_view,
            r = 0;

        for (var o in n && n[t] && n[t](), i) {
          o && r++;
        }

        if (r) for (var s = e.firstChild; s;) {
          var l = s.nextSibling;
          p(s, t), s = l;
        }
      }
    },
        _ = function _(e, t, i) {
      var n = N(e);
      if (void 0 !== i) n.style[t] = i;else if ("string" == typeof t) n.setAttribute("style", t);else for (var r in t) {
        _(n, r, t[r]);
      }
    };

    exports.setStyle = _;

    var c = "http://www.w3.org/1999/xlink",
        w = function w(e, t, i) {
      var n = N(e),
          r = n instanceof SVGElement,
          o = "function" == typeof i;
      if (void 0 !== i) {
        if ("style" === t) _(n, i);else if (r && o) n[t] = i;else if ("dataset" === t) x(n, i);else if (!r && (t in n || o)) n[t] = i;else {
          if (r && "xlink" === t) return void m(n, i);
          n.setAttribute(t, i);
        }
      } else for (var s in t) {
        w(n, s, t[s]);
      }
    };

    function m(e, t) {
      for (var i in t) {
        e.setAttributeNS(c, i, t[i]);
      }
    }

    function x(e, t) {
      for (var i in t) {
        e.dataset[i] = t[i];
      }
    }

    exports.setAttr = w;

    var y = function y(e) {
      return document.createTextNode(null != e ? e : "");
    };

    exports.text = y;

    var g = function g(e, t) {
      for (var i = 0, n = t; i < n.length; i += 1) {
        var r = n[i];

        if (0 === r || r) {
          var o = _typeof(r);

          "function" === o ? r(e) : "string" === o || "number" === o ? e.appendChild(y(r)) : k(N(r)) ? v(e, r) : r.length ? g(e, r) : "object" === o && w(e, r);
        }
      }
    },
        b = function b(e) {
      return "string" == typeof e ? C(e) : N(e);
    },
        N = function N(e) {
      return e.nodeType && e || !e.el && e || N(e.el);
    },
        k = function k(e) {
      return e && e.nodeType;
    },
        A = {},
        S = function S(e) {
      return A[e] || (A[e] = s(e));
    },
        C = function C(e) {
      for (var t, i = [], n = arguments.length - 1; n-- > 0;) {
        i[n] = arguments[n + 1];
      }

      var r = _typeof(e);

      if ("string" === r) t = S(e).cloneNode(!1);else if (k(e)) t = e.cloneNode(!1);else {
        if ("function" !== r) throw new Error("At least one argument required");
        var o = e;
        t = new (Function.prototype.bind.apply(o, [null].concat(i)))();
      }
      return g(N(t), i), t;
    };

    exports.html = C, C.extend = function (e) {
      for (var t = [], i = arguments.length - 1; i-- > 0;) {
        t[i] = arguments[i + 1];
      }

      var n = S(e);
      return C.bind.apply(C, [this, n].concat(t));
    };
    var V = C;
    exports.el = V;
    var D = C;
    exports.h = D;

    var P = function P(e) {
      for (var t = [], i = arguments.length - 1; i-- > 0;) {
        t[i] = arguments[i + 1];
      }

      for (var n = L(e, t, N(e).firstChild); n;) {
        var r = n.nextSibling;
        l(e, n), n = r;
      }
    };

    function L(e, t, i) {
      for (var n = i, r = new Array(t.length), o = 0; o < t.length; o++) {
        r[o] = t[o] && N(t[o]);
      }

      for (var s = 0; s < t.length; s++) {
        var l = t[s];

        if (l) {
          var u = r[s];
          if (u !== n) {
            if (k(u)) {
              var a = n && n.nextSibling,
                  f = null != l.__redom_index && a === r[s + 1];
              v(e, l, n, f), f && (n = a);
            } else null != l.length && (n = L(e, l, n));
          } else n = n.nextSibling;
        }
      }

      return n;
    }

    exports.setChildren = P;

    var E = function E(e) {
      return function (t) {
        return t[e];
      };
    },
        R = function R(e, t, i) {
      return new T(e, t, i);
    };

    exports.listPool = R;

    var T = function T(e, t, i) {
      this.View = e, this.initData = i, this.oldLookup = {}, this.lookup = {}, this.oldViews = [], this.views = [], null != t && (this.key = "function" == typeof t ? t : E(t));
    };

    exports.ListPool = T, T.prototype.update = function (e, t) {
      for (var i = this.View, n = this.key, r = this.initData, o = null != n, s = this.lookup, l = {}, u = new Array(e.length), a = this.views, f = 0; f < e.length; f++) {
        var d = e[f],
            v = void 0;

        if (o) {
          var h = n(d);
          v = s[h] || new i(r, d, f, e), l[h] = v, v.__redom_id = h;
        } else v = a[f] || new i(r, d, f, e);

        v.update && v.update(d, f, e, t), N(v.el).__redom_view = v, u[f] = v;
      }

      this.oldViews = a, this.views = u, this.oldLookup = s, this.lookup = l;
    };

    var j = function j(e, t, i, n) {
      return new q(e, t, i, n);
    };

    exports.list = j;

    var q = function q(e, t, i, n) {
      this.__redom_list = !0, this.View = t, this.initData = n, this.views = [], this.pool = new T(t, i, n), this.el = b(e), this.keySet = null != i;
    };

    exports.List = q, q.prototype.update = function (e, t) {
      void 0 === e && (e = []);
      var i = this.keySet,
          n = this.views;
      this.pool.update(e, t);
      var r = this.pool,
          o = r.views,
          s = r.lookup;
      if (i) for (var u = 0; u < n.length; u++) {
        var a = n[u];
        null == s[a.__redom_id] && (a.__redom_index = null, l(this, a));
      }

      for (var f = 0; f < o.length; f++) {
        o[f].__redom_index = f;
      }

      P(this, o), i && (this.lookup = s), this.views = o;
    }, q.extend = function (e, t, i, n) {
      return q.bind(q, e, t, i, n);
    }, j.extend = q.extend;

    var F = function F(e, t) {
      return new B(e, t);
    };

    exports.place = F;

    var B = function B(e, t) {
      this.el = y(""), this.visible = !1, this.view = null, this._placeholder = this.el, e instanceof Node ? this._el = e : this._View = e, this._initData = t;
    };

    exports.Place = B, B.prototype.update = function (e, t) {
      var i = this._placeholder,
          n = this.el.parentNode;

      if (e) {
        if (!this.visible) {
          if (this._el) return v(n, this._el, i), l(n, i), this.el = this._el, void (this.visible = e);
          var r = new (0, this._View)(this._initData);
          this.el = N(r), this.view = r, v(n, r, i), l(n, i);
        }

        this.view && this.view.update && this.view.update(t);
      } else if (this.visible) {
        if (this._el) return v(n, i, this._el), l(n, this._el), this.el = i, void (this.visible = e);
        v(n, i, this.view), l(n, this.view), this.el = i, this.view = null;
      }

      this.visible = e;
    };

    var G = function G(e, t, i) {
      return new M(e, t, i);
    };

    exports.router = G;

    var M = function M(e, t, i) {
      this.el = b(e), this.Views = t, this.initData = i;
    };

    exports.Router = M, M.prototype.update = function (e, t) {
      if (e !== this.route) {
        var i = this.Views[e];
        this.route = e, this.view = i && new i(this.initData, t), P(this.el, [this.view]);
      }

      this.view && this.view.update && this.view.update(t, e);
    };

    var O = "http://www.w3.org/2000/svg",
        z = {},
        H = function H(e) {
      return z[e] || (z[e] = s(e, O));
    },
        I = function I(e) {
      for (var t, i = [], n = arguments.length - 1; n-- > 0;) {
        i[n] = arguments[n + 1];
      }

      var r = _typeof(e);

      if ("string" === r) t = H(e).cloneNode(!1);else if (k(e)) t = e.cloneNode(!1);else {
        if ("function" !== r) throw new Error("At least one argument required");
        var o = e;
        t = new (Function.prototype.bind.apply(o, [null].concat(i)))();
      }
      return g(N(t), i), t;
    };

    exports.svg = I, I.extend = function (e) {
      var t = H(e);
      return I.bind(this, t);
    }, I.ns = O;
    var J = I;
    exports.s = J;
  }, {}],
  "4LWe": [function (require, module, exports) {
    "use strict";

    function e(e, n) {
      if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
    }

    function n(e, n) {
      for (var a = 0; a < n.length; a++) {
        var t = n[a];
        t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), Object.defineProperty(e, t.key, t);
      }
    }

    function a(e, a, t) {
      return a && n(e.prototype, a), t && n(e, t), e;
    }

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;

    var t = function () {
      function n() {
        e(this, n);
      }

      return a(n, [{
        key: "setLocale",
        value: function value(e) {
          window.CookieConsent.config.language.current = e;
        }
      }], [{
        key: "getTranslation",
        value: function value(e, n, a) {
          var t;
          return e.hasOwnProperty("language") ? e.language.hasOwnProperty("locale") ? (t = e.language.locale.hasOwnProperty(n) ? n : "en", e.language.locale[t].hasOwnProperty(a) ? e.language.locale[t][a] : "[Missing translation]") : "[Missing locale object]" : "[Missing language object]";
        }
      }]), n;
    }();

    exports.default = t;
  }, {}],
  "/Qw2": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;

    var e = require("redom"),
        o = n(require("./Language")),
        t = n(require("./Utilities"));

    function n(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    function c(e, o) {
      if (!(e instanceof o)) throw new TypeError("Cannot call a class as a function");
    }

    function i(e, o) {
      for (var t = 0; t < o.length; t++) {
        var n = o[t];
        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
      }
    }

    function a(e, o, t) {
      return o && i(e.prototype, o), t && i(e, t), e;
    }

    var r = function () {
      function n() {
        c(this, n), this.elements = {};
      }

      return a(n, [{
        key: "buildStyle",
        value: function value() {
          return (0, e.el)("style", "#cconsent-bar, #cconsent-bar * { box-sizing:border-box }", "#cconsent-bar { background-color:" + window.CookieConsent.config.theme.barColor + "; color:" + window.CookieConsent.config.theme.barTextColor + "; padding:15px; text-align:right; font-family:sans-serif; font-size:14px; line-height:18px; position:fixed; bottom:0; left:0; width:100%; z-index:9998; transform: translateY(0); transition: transform .6s ease-in-out; transition-delay: .3s;}", "#cconsent-bar.ccb--hidden {transform: translateY(100%); display:block;}", "#cconsent-bar .ccb__wrapper { display:flex; flex-wrap:wrap; justify-content:space-between; max-width:1800px; margin:0 auto;}", "#cconsent-bar .ccb__left { align-self:center; text-align:left; margin: 15px 0;}", "#cconsent-bar .ccb__right { align-self:center; white-space: nowrap;}", "#cconsent-bar .ccb__right > div {display:inline-block; color:#FFF;}", "#cconsent-bar a { text-decoration:underline; color:" + window.CookieConsent.config.theme.barTextColor + "; }", "#cconsent-bar button { line-height:normal; font-size:14px; border:none; padding:10px 10px; color:" + window.CookieConsent.config.theme.barMainButtonTextColor + "; background-color:" + window.CookieConsent.config.theme.barMainButtonColor + ";}", "#cconsent-bar a.ccb__edit { margin-right:15px }", "#cconsent-bar a:hover, #cconsent-bar button:hover { cursor:pointer; }", "#cconsent-modal { display:none; font-size:14px; line-height:18px; color:#666; width: 100vw; height: 100vh; position:fixed; left:0; top:0; right:0; bottom:0; font-family:sans-serif; font-size:14px; background-color:rgba(0,0,0,0.6); z-index:9999; align-items:center; justify-content:center;}", "@media (max-width: 600px) { #cconsent-modal { height: 100% } }", "#cconsent-modal h2, #cconsent-modal h3 {color:#333}", "#cconsent-modal.ccm--visible {display:flex}", "#cconsent-modal .ccm__content { max-width:600px; min-height:500px; max-height:600px; overflow-Y:auto; background-color:#EFEFEF; }", "@media (max-width: 600px) { #cconsent-modal .ccm__content { max-width:100vw; height:100%; max-height:initial; }}", "#cconsent-modal .ccm__content > .ccm__content__heading { border-bottom:1px solid #D8D8D8; padding:35px 35px 20px; background-color:#EFEFEF; position:relative;}", "#cconsent-modal .ccm__content > .ccm__content__heading h2 { font-size:21px; font-weight:600; color:#333; margin:0 }", "#cconsent-modal .ccm__content > .ccm__content__heading .ccm__cheading__close {font-weight:600; color:#888; cursor:pointer; font-size:26px; position: absolute; right:15px; top: 15px;}", "#cconsent-modal h2, #cconsent-modal h3 {margin-top:0}", "#cconsent-modal .ccm__content > .ccm__content__body { background-color:#FFF;}", "#cconsent-modal .ccm__content > .ccm__content__body .ccm__tabgroup {margin:0; border-bottom: 1px solid #D8D8D8; }", '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tabgroup .ccm__tab-head::before { position:absolute; left:35px; font-size:1.4em; font-weight: 600; color:#E56385; content:"×"; display:inline-block; margin-right: 20px;}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tabgroup.checked-5jhk .ccm__tab-head::before {font-size:1em; content:"✔"; color:#28A834}', "#cconsent-modal .ccm__content > .ccm__content__body .ccm__tabgroup .ccm__tab-head .ccm__tab-head__icon-wedge { transition: transform .3s ease-out; transform-origin: 16px 6px 0; position:absolute;right:25px; top:50%; transform:rotate(0deg); transform:translateY(-50%)}", "#cconsent-modal .ccm__content > .ccm__content__body .ccm__tabgroup .ccm__tab-head .ccm__tab-head__icon-wedge > svg { pointer-events: none; }", "#cconsent-modal .ccm__content > .ccm__content__body .ccm__tabgroup.ccm__tabgroup--open .ccm__tab-head .ccm__tab-head__icon-wedge {transform:rotate(-180deg)}", "#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-head {color:#333; padding:17px 35px 17px 56px; margin:0}", "#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content {padding:25px 35px; margin:0}", "#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-head { transition: background-color .5s ease-out }", "#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-head:hover { background-color:#F9F9F9 }", "#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-head {font-weight:600; cursor:pointer; position:relative;}", "#cconsent-modal .ccm__content > .ccm__content__body .ccm__tabgroup .ccm__tab-content {display:none;}", "#cconsent-modal .ccm__content > .ccm__content__body .ccm__tabgroup.ccm__tabgroup--open .ccm__tab-head { background-color:#F9F9F9 }", "#cconsent-modal .ccm__content > .ccm__content__body .ccm__tabgroup.ccm__tabgroup--open .ccm__tab-content {display:flex;}", "@media (max-width: 600px) { #cconsent-modal .ccm__content > .ccm__content__body .ccm__tabgroup.ccm__tabgroup--open .ccm__tab-content {flex-direction:column} }", "@media (max-width: 600px) { #cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__left { margin-bottom:20px; } }", "#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__left .ccm__switch-component {display:flex; margin-right:35px; align-items:center;}", "#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__left .ccm__switch-component > div {font-weight:600;}", "#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__left .ccm__switch-group {width:40px; height:20px; margin:0 10px; position:relative;}", "#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__left .ccm__switch {position: absolute; top:0; right:0; display: inline-block; width: 40px; height: 20px;}", "#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__left .ccm__switch input {display:none;}", "#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__left .ccm__switch .ccm__switch__slider  {position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; border-radius:10px; -webkit-transition: .4s; transition: .4s;}", '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__left .ccm__switch .ccm__switch__slider:before  {position: absolute; content: ""; height: 12px; width: 12px; left: 4px; bottom: 4px; background-color: white; border-radius:50%; -webkit-transition: .4s; transition: .4s;}', "#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__left .ccm__switch input:checked + .ccm__switch__slider  {background-color: #28A834;}", "#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__left .ccm__switch input:focus + .ccm__switch__slider  {box-shadow: 0 0 1px #28A834;}", "#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__left .ccm__switch input:checked + .ccm__switch__slider:before  {-webkit-transform: translateX(20px); -ms-transform: translateX(20px); transform: translateX(20px);}", "#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content h3 {font-size:18px; margin-bottom:10px; line-height:1;}", "#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content p {color:#444; margin-bottom:0}", "#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__list:not(:empty) {margin-top:30px;}", "#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__list .ccm__list__title {color:#333; font-weight:600;}", "#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__list ul { margin:15px 0; padding-left:15px }", "#cconsent-modal .ccm__footer { padding:35px; background-color:#EFEFEF; text-align:center; display: flex; align-items:center; justify-content:flex-end; }", "#cconsent-modal .ccm__footer button { line-height:normal; font-size:14px; transition: background-color .5s ease-out; background-color:" + window.CookieConsent.config.theme.modalMainButtonColor + "; color:" + window.CookieConsent.config.theme.modalMainButtonTextColor + "; border:none; padding:13px; min-width:110px; border-radius: 2px; cursor:pointer; }", "#cconsent-modal .ccm__footer button:hover { background-color:" + t.default.lightenDarkenColor(window.CookieConsent.config.theme.modalMainButtonColor, -20) + "; }", "#cconsent-modal .ccm__footer button#ccm__footer__consent-modal-submit {  margin-right:10px; }");
        }
      }, {
        key: "buildBar",
        value: function value() {
          return (0, e.el)("div#cconsent-bar.ccb--hidden", (0, e.el)("div.ccb__wrapper", (0, e.el)("div.ccb__left", (0, e.el)("div.cc-text", o.default.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, "barMainText"))), (0, e.el)("div.ccb__right", (0, e.el)("div.ccb__button", (0, e.el)("a.ccb__edit", o.default.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, "barLinkSetting")), (0, e.el)("button.consent-give", o.default.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, "barBtnAcceptAll"))))));
        }
      }, {
        key: "buildModal",
        value: function value() {
          var t = function t(_t) {
            var n = [];

            for (var c in window.CookieConsent.config.services) {
              window.CookieConsent.config.services[c].category === _t && n.push(window.CookieConsent.config.services[c]);
            }

            if (n.length) {
              var i = [];

              for (var a in n) {
                i.push((0, e.el)("li", o.default.getTranslation(n[a], window.CookieConsent.config.language.current, "name")));
              }

              return [(0, e.el)("div.ccm__list", (0, e.el)("span.ccm__list__title", o.default.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, "modalAffectedSolutions")), (0, e.el)("ul", i))];
            }
          };

          return (0, e.el)("div#cconsent-modal", (0, e.el)("div.ccm__content", (0, e.el)("div.ccm__content__heading", (0, e.el)("h2", o.default.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, "modalMainTitle")), (0, e.el)("p", o.default.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, "modalMainText"), window.CookieConsent.config.modalMainTextMoreLink ? (0, e.el)("a", {
            href: window.CookieConsent.config.modalMainTextMoreLink,
            target: "_blank",
            rel: "noopener noreferrer"
          }, o.default.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, "modalMainTitle")) : null), (0, e.el)("div.ccm__cheading__close", "×")), (0, e.el)("div.ccm__content__body", (0, e.el)("div.ccm__tabs", function () {
            var n = [];

            for (var c in window.CookieConsent.config.categories) {
              n.push((0, e.el)("dl.ccm__tabgroup." + c + (window.CookieConsent.config.categories[c].checked ? ".checked-5jhk" : ""), {
                "data-category": c
              }, (0, e.el)("dt.ccm__tab-head", o.default.getTranslation(window.CookieConsent.config.categories[c], window.CookieConsent.config.language.current, "name"), (0, e.el)("a.ccm__tab-head__icon-wedge", (0, e.el)(document.createElementNS("http://www.w3.org/2000/svg", "svg"), {
                version: "1.2",
                preserveAspectRatio: "none",
                viewBox: "0 0 24 24",
                class: "icon-wedge-svg",
                "data-id": "e9b3c566e8c14cfea38af128759b91a3",
                style: "opacity: 1; mix-blend-mode: normal; fill: rgb(51, 51, 51); width: 32px; height: 32px;"
              }, (0, e.el)(document.createElementNS("http://www.w3.org/2000/svg", "path"), {
                "xmlns:default": "http://www.w3.org/2000/svg",
                id: "angle-down",
                d: "M17.2,9.84c0-0.09-0.04-0.18-0.1-0.24l-0.52-0.52c-0.13-0.13-0.33-0.14-0.47-0.01c0,0-0.01,0.01-0.01,0.01  l-4.1,4.1l-4.09-4.1C7.78,8.94,7.57,8.94,7.44,9.06c0,0-0.01,0.01-0.01,0.01L6.91,9.6c-0.13,0.13-0.14,0.33-0.01,0.47  c0,0,0.01,0.01,0.01,0.01l4.85,4.85c0.13,0.13,0.33,0.14,0.47,0.01c0,0,0.01-0.01,0.01-0.01l4.85-4.85c0.06-0.06,0.1-0.15,0.1-0.24  l0,0H17.2z",
                style: "fill: rgb(51, 51, 51);"
              })))), (0, e.el)("dd.ccm__tab-content", (0, e.el)("div.ccm__tab-content__left", !window.CookieConsent.config.categories[c].needed && (0, e.el)("div.ccm__switch-component", (0, e.el)("div.status-off", o.default.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, "off")), (0, e.el)("div.ccm__switch-group", (0, e.el)("label.ccm__switch", (0, e.el)("input.category-onoff", {
                type: "checkbox",
                "data-category": c,
                checked: window.CookieConsent.config.categories[c].checked
              }), (0, e.el)("span.ccm__switch__slider"))), (0, e.el)("div.status-on", o.default.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, "on")))), (0, e.el)("div.right", (0, e.el)("h3", o.default.getTranslation(window.CookieConsent.config.categories[c], window.CookieConsent.config.language.current, "name")), (0, e.el)("p", o.default.getTranslation(window.CookieConsent.config.categories[c], window.CookieConsent.config.language.current, "description")), (0, e.el)("div.ccm__list", t(c))))));
            }

            return n;
          }())), (0, e.el)("div.ccm__footer", (0, e.el)("button#ccm__footer__consent-modal-submit", o.default.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, "modalBtnSave")), (0, e.el)("button.consent-give", o.default.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, "modalBtnAcceptAll")))));
        }
      }, {
        key: "modalRedrawIcons",
        value: function value() {
          var e = this.elements.modal.querySelectorAll(".ccm__tabgroup"),
              o = !0,
              t = !1,
              n = void 0;

          try {
            for (var c, i = e[Symbol.iterator](); !(o = (c = i.next()).done); o = !0) {
              var a = c.value;
              window.CookieConsent.config.categories[a.dataset.category].checked ? a.classList.contains("checked-5jhk") || (a.classList.add("checked-5jhk"), a.querySelector("input.category-onoff").checked = !0) : (a.classList.contains("checked-5jhk") && a.classList.remove("checked-5jhk"), a.querySelector("input.category-onoff").checked = !1);
            }
          } catch (r) {
            t = !0, n = r;
          } finally {
            try {
              o || null == i.return || i.return();
            } finally {
              if (t) throw n;
            }
          }
        }
      }, {
        key: "render",
        value: function value(o, t, n) {
          if (void 0 === n && (n = function n() {}), void 0 !== this.elements[o]) return this.elements[o].parentNode.replaceChild(t, this.elements[o]), this.elements[o] = t, n(t), t;
          var c = (0, e.mount)(document.body, t);
          return c && (this.elements[o] = c), n(c), c;
        }
      }, {
        key: "buildInterface",
        value: function value(e) {
          void 0 === e && (e = function e() {});
          var o = this;
          t.default.ready(function () {
            o.render("style", o.buildStyle()), o.render("bar", o.buildBar(), function (e) {
              window.CookieConsent.config.cookieExists || setTimeout(function () {
                e.classList.remove("ccb--hidden");
              }, window.CookieConsent.config.barTimeout);
            }), o.render("modal", o.buildModal()), e();
          });
        }
      }, {
        key: "addEventListeners",
        value: function value(e) {
          var o = this,
              t = document.querySelectorAll(".consent-give"),
              n = !0,
              c = !1,
              i = void 0;

          try {
            for (var a, r = t[Symbol.iterator](); !(n = (a = r.next()).done); n = !0) {
              a.value.addEventListener("click", function () {
                for (var e in window.CookieConsent.config.categories) {
                  window.CookieConsent.config.categories[e].wanted = window.CookieConsent.config.categories[e].checked = !0;
                }

                o.writeBufferToDOM(), o.buildCookie(function (e) {
                  o.setCookie(e);
                }), o.elements.bar.classList.add("ccb--hidden"), o.elements.modal.classList.remove("ccm--visible"), o.modalRedrawIcons();
              });
            }
          } catch (_) {
            c = !0, i = _;
          } finally {
            try {
              n || null == r.return || r.return();
            } finally {
              if (c) throw i;
            }
          }

          Array.prototype.forEach.call(document.getElementsByClassName("ccb__edit"), function (e) {
            e.addEventListener("click", function () {
              o.elements.modal.classList.add("ccm--visible");
            });
          }), this.elements.modal.querySelector(".ccm__tabs").addEventListener("click", function (e) {
            if (e.target.classList.contains("ccm__tab-head") || e.target.classList.contains("ccm__tab-head__icon-wedge")) {
              var o = function e(o) {
                var t = o.parentNode;
                return "DL" !== t.nodeName ? e(t) : t;
              }(e.target);

              o.classList.contains("ccm__tabgroup--open") ? o.classList.remove("ccm__tabgroup--open") : o.classList.add("ccm__tabgroup--open");
            }

            if (e.target.classList.contains("category-onoff")) {
              window.CookieConsent.config.categories[e.target.dataset.category].wanted = window.CookieConsent.config.categories[e.target.dataset.category].checked = !0 === e.target.checked;
              var t = document.querySelector(".ccm__tabgroup." + e.target.dataset.category);
              !1 === e.target.checked && t.classList.contains("checked-5jhk") ? t.classList.remove("checked-5jhk") : t.classList.add("checked-5jhk");
            }
          }), this.elements.modal.querySelector(".ccm__cheading__close").addEventListener("click", function (e) {
            o.elements.modal.classList.remove("ccm--visible");
          }), document.getElementById("ccm__footer__consent-modal-submit").addEventListener("click", function () {
            var e = o.elements.modal.querySelectorAll(".ccm__switch input");
            Array.prototype.forEach.call(e, function (e) {
              window.CookieConsent.config.categories[e.dataset.category].wanted = e.checked;
            }), o.buildCookie(function (e) {
              o.setCookie(e, function () {
                o.elements.modal.classList.remove("ccm--visible"), o.elements.bar.classList.add("ccb--hidden");
              });
            }), o.writeBufferToDOM();
          });
        }
      }, {
        key: "writeBufferToDOM",
        value: function value() {
          var e = !0,
              o = !1,
              t = void 0;

          try {
            for (var n, c = window.CookieConsent.buffer.appendChild[Symbol.iterator](); !(e = (n = c.next()).done); e = !0) {
              var i = n.value;
              !0 === window.CookieConsent.config.categories[i.category].wanted && Node.prototype.appendChild.apply(i.this, i.arguments);
            }
          } catch (m) {
            o = !0, t = m;
          } finally {
            try {
              e || null == c.return || c.return();
            } finally {
              if (o) throw t;
            }
          }

          var a = !0,
              r = !1,
              _ = void 0;

          try {
            for (var s, l = window.CookieConsent.buffer.insertBefore[Symbol.iterator](); !(a = (s = l.next()).done); a = !0) {
              var d = s.value;
              !0 === window.CookieConsent.config.categories[d.category].wanted && (d.arguments[1] = null === d.arguments[0].parentNode ? d.this.lastChild : d.arguments[1], Node.prototype.insertBefore.apply(d.this, d.arguments));
            }
          } catch (m) {
            r = !0, _ = m;
          } finally {
            try {
              a || null == l.return || l.return();
            } finally {
              if (r) throw _;
            }
          }
        }
      }, {
        key: "buildCookie",
        value: function value(e) {
          var o = {
            version: window.CookieConsent.config.cookieVersion,
            categories: {},
            services: []
          };

          for (var n in window.CookieConsent.config.categories) {
            o.categories[n] = {
              wanted: window.CookieConsent.config.categories[n].wanted
            };
          }

          return o.services = t.default.listGlobalServices(), e && e(o), o;
        }
      }, {
        key: "setCookie",
        value: function value(e, o) {
          document.cookie = "cconsent=".concat(JSON.stringify(e), "; expires=Thu, 01 Jan 2099 00:00:00 UTC; path=/;"), o && o();
        }
      }]), n;
    }();

    exports.default = r;
  }, {
    "redom": "GuEK",
    "./Language": "4LWe",
    "./Utilities": "/6wJ"
  }],
  "s9iF": [function (require, module, exports) {
    function t() {
      this.__data__ = [], this.size = 0;
    }

    module.exports = t;
  }, {}],
  "LIpy": [function (require, module, exports) {
    function e(e, n) {
      return e === n || e != e && n != n;
    }

    module.exports = e;
  }, {}],
  "yEjJ": [function (require, module, exports) {
    var r = require("./eq");

    function e(e, n) {
      for (var t = e.length; t--;) {
        if (r(e[t][0], n)) return t;
      }

      return -1;
    }

    module.exports = e;
  }, {
    "./eq": "LIpy"
  }],
  "+bWy": [function (require, module, exports) {
    var e = require("./_assocIndexOf"),
        r = Array.prototype,
        t = r.splice;

    function a(r) {
      var a = this.__data__,
          o = e(a, r);
      return !(o < 0) && (o == a.length - 1 ? a.pop() : t.call(a, o, 1), --this.size, !0);
    }

    module.exports = a;
  }, {
    "./_assocIndexOf": "yEjJ"
  }],
  "Ewuv": [function (require, module, exports) {
    var r = require("./_assocIndexOf");

    function e(e) {
      var a = this.__data__,
          o = r(a, e);
      return o < 0 ? void 0 : a[o][1];
    }

    module.exports = e;
  }, {
    "./_assocIndexOf": "yEjJ"
  }],
  "xDQX": [function (require, module, exports) {
    var e = require("./_assocIndexOf");

    function r(r) {
      return e(this.__data__, r) > -1;
    }

    module.exports = r;
  }, {
    "./_assocIndexOf": "yEjJ"
  }],
  "h0zV": [function (require, module, exports) {
    var s = require("./_assocIndexOf");

    function e(e, r) {
      var t = this.__data__,
          i = s(t, e);
      return i < 0 ? (++this.size, t.push([e, r])) : t[i][1] = r, this;
    }

    module.exports = e;
  }, {
    "./_assocIndexOf": "yEjJ"
  }],
  "Xk23": [function (require, module, exports) {
    var e = require("./_listCacheClear"),
        t = require("./_listCacheDelete"),
        r = require("./_listCacheGet"),
        l = require("./_listCacheHas"),
        o = require("./_listCacheSet");

    function a(e) {
      var t = -1,
          r = null == e ? 0 : e.length;

      for (this.clear(); ++t < r;) {
        var l = e[t];
        this.set(l[0], l[1]);
      }
    }

    a.prototype.clear = e, a.prototype.delete = t, a.prototype.get = r, a.prototype.has = l, a.prototype.set = o, module.exports = a;
  }, {
    "./_listCacheClear": "s9iF",
    "./_listCacheDelete": "+bWy",
    "./_listCacheGet": "Ewuv",
    "./_listCacheHas": "xDQX",
    "./_listCacheSet": "h0zV"
  }],
  "4y4D": [function (require, module, exports) {
    var e = require("./_ListCache");

    function i() {
      this.__data__ = new e(), this.size = 0;
    }

    module.exports = i;
  }, {
    "./_ListCache": "Xk23"
  }],
  "TpjK": [function (require, module, exports) {
    function e(e) {
      var t = this.__data__,
          i = t.delete(e);
      return this.size = t.size, i;
    }

    module.exports = e;
  }, {}],
  "skbs": [function (require, module, exports) {
    function t(t) {
      return this.__data__.get(t);
    }

    module.exports = t;
  }, {}],
  "9ocJ": [function (require, module, exports) {
    function t(t) {
      return this.__data__.has(t);
    }

    module.exports = t;
  }, {}],
  "j3D9": [function (require, module, exports) {
    var global = arguments[3];
    var e = arguments[3],
        t = "object" == _typeof(e) && e && e.Object === Object && e;
    module.exports = t;
  }, {}],
  "MIhM": [function (require, module, exports) {
    var e = require("./_freeGlobal"),
        t = "object" == (typeof self === "undefined" ? "undefined" : _typeof(self)) && self && self.Object === Object && self,
        l = e || t || Function("return this")();

    module.exports = l;
  }, {
    "./_freeGlobal": "j3D9"
  }],
  "wppe": [function (require, module, exports) {
    var o = require("./_root"),
        r = o.Symbol;

    module.exports = r;
  }, {
    "./_root": "MIhM"
  }],
  "uiOY": [function (require, module, exports) {
    var r = require("./_Symbol"),
        t = Object.prototype,
        e = t.hasOwnProperty,
        o = t.toString,
        a = r ? r.toStringTag : void 0;

    function l(r) {
      var t = e.call(r, a),
          l = r[a];

      try {
        r[a] = void 0;
        var c = !0;
      } catch (n) {}

      var i = o.call(r);
      return c && (t ? r[a] = l : delete r[a]), i;
    }

    module.exports = l;
  }, {
    "./_Symbol": "wppe"
  }],
  "lPmd": [function (require, module, exports) {
    var t = Object.prototype,
        o = t.toString;

    function r(t) {
      return o.call(t);
    }

    module.exports = r;
  }, {}],
  "e5TX": [function (require, module, exports) {
    var e = require("./_Symbol"),
        r = require("./_getRawTag"),
        o = require("./_objectToString"),
        t = "[object Null]",
        i = "[object Undefined]",
        n = e ? e.toStringTag : void 0;

    function u(e) {
      return null == e ? void 0 === e ? i : t : n && n in Object(e) ? r(e) : o(e);
    }

    module.exports = u;
  }, {
    "./_Symbol": "wppe",
    "./_getRawTag": "uiOY",
    "./_objectToString": "lPmd"
  }],
  "u9vI": [function (require, module, exports) {
    function n(n) {
      var o = _typeof(n);

      return null != n && ("object" == o || "function" == o);
    }

    module.exports = n;
  }, {}],
  "dRuq": [function (require, module, exports) {
    var e = require("./_baseGetTag"),
        r = require("./isObject"),
        t = "[object AsyncFunction]",
        n = "[object Function]",
        o = "[object GeneratorFunction]",
        c = "[object Proxy]";

    function u(u) {
      if (!r(u)) return !1;
      var i = e(u);
      return i == n || i == o || i == t || i == c;
    }

    module.exports = u;
  }, {
    "./_baseGetTag": "e5TX",
    "./isObject": "u9vI"
  }],
  "q3B8": [function (require, module, exports) {
    var r = require("./_root"),
        e = r["__core-js_shared__"];

    module.exports = e;
  }, {
    "./_root": "MIhM"
  }],
  "1qpN": [function (require, module, exports) {
    var e = require("./_coreJsData"),
        r = function () {
      var r = /[^.]+$/.exec(e && e.keys && e.keys.IE_PROTO || "");
      return r ? "Symbol(src)_1." + r : "";
    }();

    function n(e) {
      return !!r && r in e;
    }

    module.exports = n;
  }, {
    "./_coreJsData": "q3B8"
  }],
  "g55O": [function (require, module, exports) {
    var t = Function.prototype,
        r = t.toString;

    function n(t) {
      if (null != t) {
        try {
          return r.call(t);
        } catch (n) {}

        try {
          return t + "";
        } catch (n) {}
      }

      return "";
    }

    module.exports = n;
  }, {}],
  "iEGD": [function (require, module, exports) {
    var e = require("./isFunction"),
        r = require("./_isMasked"),
        t = require("./isObject"),
        o = require("./_toSource"),
        n = /[\\^$.*+?()[\]{}|]/g,
        c = /^\[object .+?Constructor\]$/,
        i = Function.prototype,
        u = Object.prototype,
        p = i.toString,
        s = u.hasOwnProperty,
        a = RegExp("^" + p.call(s).replace(n, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");

    function l(n) {
      return !(!t(n) || r(n)) && (e(n) ? a : c).test(o(n));
    }

    module.exports = l;
  }, {
    "./isFunction": "dRuq",
    "./_isMasked": "1qpN",
    "./isObject": "u9vI",
    "./_toSource": "g55O"
  }],
  "Nk5W": [function (require, module, exports) {
    function n(n, o) {
      return null == n ? void 0 : n[o];
    }

    module.exports = n;
  }, {}],
  "bViC": [function (require, module, exports) {
    var e = require("./_baseIsNative"),
        r = require("./_getValue");

    function u(u, a) {
      var i = r(u, a);
      return e(i) ? i : void 0;
    }

    module.exports = u;
  }, {
    "./_baseIsNative": "iEGD",
    "./_getValue": "Nk5W"
  }],
  "K9uV": [function (require, module, exports) {
    var e = require("./_getNative"),
        r = require("./_root"),
        o = e(r, "Map");

    module.exports = o;
  }, {
    "./_getNative": "bViC",
    "./_root": "MIhM"
  }],
  "FTXF": [function (require, module, exports) {
    var e = require("./_getNative"),
        r = e(Object, "create");

    module.exports = r;
  }, {
    "./_getNative": "bViC"
  }],
  "1RxS": [function (require, module, exports) {
    var e = require("./_nativeCreate");

    function t() {
      this.__data__ = e ? e(null) : {}, this.size = 0;
    }

    module.exports = t;
  }, {
    "./_nativeCreate": "FTXF"
  }],
  "qBl2": [function (require, module, exports) {
    function t(t) {
      var e = this.has(t) && delete this.__data__[t];
      return this.size -= e ? 1 : 0, e;
    }

    module.exports = t;
  }, {}],
  "hClK": [function (require, module, exports) {
    var e = require("./_nativeCreate"),
        r = "__lodash_hash_undefined__",
        t = Object.prototype,
        a = t.hasOwnProperty;

    function _(t) {
      var _ = this.__data__;

      if (e) {
        var o = _[t];
        return o === r ? void 0 : o;
      }

      return a.call(_, t) ? _[t] : void 0;
    }

    module.exports = _;
  }, {
    "./_nativeCreate": "FTXF"
  }],
  "YIaf": [function (require, module, exports) {
    var e = require("./_nativeCreate"),
        r = Object.prototype,
        t = r.hasOwnProperty;

    function a(r) {
      var a = this.__data__;
      return e ? void 0 !== a[r] : t.call(a, r);
    }

    module.exports = a;
  }, {
    "./_nativeCreate": "FTXF"
  }],
  "Ag0p": [function (require, module, exports) {
    var e = require("./_nativeCreate"),
        _ = "__lodash_hash_undefined__";

    function i(i, t) {
      var a = this.__data__;
      return this.size += this.has(i) ? 0 : 1, a[i] = e && void 0 === t ? _ : t, this;
    }

    module.exports = i;
  }, {
    "./_nativeCreate": "FTXF"
  }],
  "C8N4": [function (require, module, exports) {
    var e = require("./_hashClear"),
        r = require("./_hashDelete"),
        t = require("./_hashGet"),
        h = require("./_hashHas"),
        o = require("./_hashSet");

    function a(e) {
      var r = -1,
          t = null == e ? 0 : e.length;

      for (this.clear(); ++r < t;) {
        var h = e[r];
        this.set(h[0], h[1]);
      }
    }

    a.prototype.clear = e, a.prototype.delete = r, a.prototype.get = t, a.prototype.has = h, a.prototype.set = o, module.exports = a;
  }, {
    "./_hashClear": "1RxS",
    "./_hashDelete": "qBl2",
    "./_hashGet": "hClK",
    "./_hashHas": "YIaf",
    "./_hashSet": "Ag0p"
  }],
  "lBq7": [function (require, module, exports) {
    var e = require("./_Hash"),
        i = require("./_ListCache"),
        r = require("./_Map");

    function a() {
      this.size = 0, this.__data__ = {
        hash: new e(),
        map: new (r || i)(),
        string: new e()
      };
    }

    module.exports = a;
  }, {
    "./_Hash": "C8N4",
    "./_ListCache": "Xk23",
    "./_Map": "K9uV"
  }],
  "XJYD": [function (require, module, exports) {
    function o(o) {
      var n = _typeof(o);

      return "string" == n || "number" == n || "symbol" == n || "boolean" == n ? "__proto__" !== o : null === o;
    }

    module.exports = o;
  }, {}],
  "ZC1a": [function (require, module, exports) {
    var r = require("./_isKeyable");

    function e(e, a) {
      var t = e.__data__;
      return r(a) ? t["string" == typeof a ? "string" : "hash"] : t.map;
    }

    module.exports = e;
  }, {
    "./_isKeyable": "XJYD"
  }],
  "cDyG": [function (require, module, exports) {
    var e = require("./_getMapData");

    function t(t) {
      var r = e(this, t).delete(t);
      return this.size -= r ? 1 : 0, r;
    }

    module.exports = t;
  }, {
    "./_getMapData": "ZC1a"
  }],
  "G3gK": [function (require, module, exports) {
    var e = require("./_getMapData");

    function t(t) {
      return e(this, t).get(t);
    }

    module.exports = t;
  }, {
    "./_getMapData": "ZC1a"
  }],
  "85ue": [function (require, module, exports) {
    var e = require("./_getMapData");

    function r(r) {
      return e(this, r).has(r);
    }

    module.exports = r;
  }, {
    "./_getMapData": "ZC1a"
  }],
  "UY82": [function (require, module, exports) {
    var e = require("./_getMapData");

    function t(t, i) {
      var s = e(this, t),
          r = s.size;
      return s.set(t, i), this.size += s.size == r ? 0 : 1, this;
    }

    module.exports = t;
  }, {
    "./_getMapData": "ZC1a"
  }],
  "wtMJ": [function (require, module, exports) {
    var e = require("./_mapCacheClear"),
        r = require("./_mapCacheDelete"),
        t = require("./_mapCacheGet"),
        a = require("./_mapCacheHas"),
        p = require("./_mapCacheSet");

    function o(e) {
      var r = -1,
          t = null == e ? 0 : e.length;

      for (this.clear(); ++r < t;) {
        var a = e[r];
        this.set(a[0], a[1]);
      }
    }

    o.prototype.clear = e, o.prototype.delete = r, o.prototype.get = t, o.prototype.has = a, o.prototype.set = p, module.exports = o;
  }, {
    "./_mapCacheClear": "lBq7",
    "./_mapCacheDelete": "cDyG",
    "./_mapCacheGet": "G3gK",
    "./_mapCacheHas": "85ue",
    "./_mapCacheSet": "UY82"
  }],
  "fwYF": [function (require, module, exports) {
    var e = require("./_ListCache"),
        i = require("./_Map"),
        t = require("./_MapCache"),
        s = 200;

    function _(_, a) {
      var r = this.__data__;

      if (r instanceof e) {
        var h = r.__data__;
        if (!i || h.length < s - 1) return h.push([_, a]), this.size = ++r.size, this;
        r = this.__data__ = new t(h);
      }

      return r.set(_, a), this.size = r.size, this;
    }

    module.exports = _;
  }, {
    "./_ListCache": "Xk23",
    "./_Map": "K9uV",
    "./_MapCache": "wtMJ"
  }],
  "49I8": [function (require, module, exports) {
    var e = require("./_ListCache"),
        t = require("./_stackClear"),
        r = require("./_stackDelete"),
        a = require("./_stackGet"),
        s = require("./_stackHas"),
        o = require("./_stackSet");

    function i(t) {
      var r = this.__data__ = new e(t);
      this.size = r.size;
    }

    i.prototype.clear = t, i.prototype.delete = r, i.prototype.get = a, i.prototype.has = s, i.prototype.set = o, module.exports = i;
  }, {
    "./_ListCache": "Xk23",
    "./_stackClear": "4y4D",
    "./_stackDelete": "TpjK",
    "./_stackGet": "skbs",
    "./_stackHas": "9ocJ",
    "./_stackSet": "fwYF"
  }],
  "kAdy": [function (require, module, exports) {
    var e = require("./_getNative"),
        r = function () {
      try {
        var r = e(Object, "defineProperty");
        return r({}, "", {}), r;
      } catch (t) {}
    }();

    module.exports = r;
  }, {
    "./_getNative": "bViC"
  }],
  "d05+": [function (require, module, exports) {
    var e = require("./_defineProperty");

    function r(r, o, u) {
      "__proto__" == o && e ? e(r, o, {
        configurable: !0,
        enumerable: !0,
        value: u,
        writable: !0
      }) : r[o] = u;
    }

    module.exports = r;
  }, {
    "./_defineProperty": "kAdy"
  }],
  "2Tdb": [function (require, module, exports) {
    var e = require("./_baseAssignValue"),
        i = require("./eq");

    function r(r, o, u) {
      (void 0 === u || i(r[o], u)) && (void 0 !== u || o in r) || e(r, o, u);
    }

    module.exports = r;
  }, {
    "./_baseAssignValue": "d05+",
    "./eq": "LIpy"
  }],
  "oVe7": [function (require, module, exports) {
    function r(r) {
      return function (e, n, t) {
        for (var o = -1, u = Object(e), f = t(e), a = f.length; a--;) {
          var c = f[r ? a : ++o];
          if (!1 === n(u[c], c, u)) break;
        }

        return e;
      };
    }

    module.exports = r;
  }, {}],
  "mduf": [function (require, module, exports) {
    var e = require("./_createBaseFor"),
        r = e();

    module.exports = r;
  }, {
    "./_createBaseFor": "oVe7"
  }],
  "s4SJ": [function (require, module, exports) {
    var e = require("./_root"),
        o = "object" == _typeof(exports) && exports && !exports.nodeType && exports,
        r = o && "object" == _typeof(module) && module && !module.nodeType && module,
        t = r && r.exports === o,
        p = t ? e.Buffer : void 0,
        u = p ? p.allocUnsafe : void 0;

    function n(e, o) {
      if (o) return e.slice();
      var r = e.length,
          t = u ? u(r) : new e.constructor(r);
      return e.copy(t), t;
    }

    module.exports = n;
  }, {
    "./_root": "MIhM"
  }],
  "yfX1": [function (require, module, exports) {
    var r = require("./_root"),
        e = r.Uint8Array;

    module.exports = e;
  }, {
    "./_root": "MIhM"
  }],
  "zb3a": [function (require, module, exports) {
    var e = require("./_Uint8Array");

    function r(r) {
      var n = new r.constructor(r.byteLength);
      return new e(n).set(new e(r)), n;
    }

    module.exports = r;
  }, {
    "./_Uint8Array": "yfX1"
  }],
  "jXAN": [function (require, module, exports) {
    var r = require("./_cloneArrayBuffer");

    function e(e, f) {
      var t = f ? r(e.buffer) : e.buffer;
      return new e.constructor(t, e.byteOffset, e.length);
    }

    module.exports = e;
  }, {
    "./_cloneArrayBuffer": "zb3a"
  }],
  "Mkgn": [function (require, module, exports) {
    function r(r, e) {
      var n = -1,
          o = r.length;

      for (e || (e = Array(o)); ++n < o;) {
        e[n] = r[n];
      }

      return e;
    }

    module.exports = r;
  }, {}],
  "ga8q": [function (require, module, exports) {
    var r = require("./isObject"),
        e = Object.create,
        t = function () {
      function t() {}

      return function (n) {
        if (!r(n)) return {};
        if (e) return e(n);
        t.prototype = n;
        var o = new t();
        return t.prototype = void 0, o;
      };
    }();

    module.exports = t;
  }, {
    "./isObject": "u9vI"
  }],
  "4/4o": [function (require, module, exports) {
    function n(n, r) {
      return function (t) {
        return n(r(t));
      };
    }

    module.exports = n;
  }, {}],
  "CXf5": [function (require, module, exports) {
    var e = require("./_overArg"),
        r = e(Object.getPrototypeOf, Object);

    module.exports = r;
  }, {
    "./_overArg": "4/4o"
  }],
  "nhsl": [function (require, module, exports) {
    var t = Object.prototype;

    function o(o) {
      var r = o && o.constructor;
      return o === ("function" == typeof r && r.prototype || t);
    }

    module.exports = o;
  }, {}],
  "qE2F": [function (require, module, exports) {
    var e = require("./_baseCreate"),
        r = require("./_getPrototype"),
        t = require("./_isPrototype");

    function o(o) {
      return "function" != typeof o.constructor || t(o) ? {} : e(r(o));
    }

    module.exports = o;
  }, {
    "./_baseCreate": "ga8q",
    "./_getPrototype": "CXf5",
    "./_isPrototype": "nhsl"
  }],
  "OuyB": [function (require, module, exports) {
    function e(e) {
      return null != e && "object" == _typeof(e);
    }

    module.exports = e;
  }, {}],
  "pK4Y": [function (require, module, exports) {
    var e = require("./_baseGetTag"),
        r = require("./isObjectLike"),
        t = "[object Arguments]";

    function u(u) {
      return r(u) && e(u) == t;
    }

    module.exports = u;
  }, {
    "./_baseGetTag": "e5TX",
    "./isObjectLike": "OuyB"
  }],
  "3til": [function (require, module, exports) {
    var e = require("./_baseIsArguments"),
        r = require("./isObjectLike"),
        t = Object.prototype,
        l = t.hasOwnProperty,
        n = t.propertyIsEnumerable,
        u = e(function () {
      return arguments;
    }()) ? e : function (e) {
      return r(e) && l.call(e, "callee") && !n.call(e, "callee");
    };

    module.exports = u;
  }, {
    "./_baseIsArguments": "pK4Y",
    "./isObjectLike": "OuyB"
  }],
  "p/0c": [function (require, module, exports) {
    var r = Array.isArray;
    module.exports = r;
  }, {}],
  "GmNU": [function (require, module, exports) {
    var e = 9007199254740991;

    function r(r) {
      return "number" == typeof r && r > -1 && r % 1 == 0 && r <= e;
    }

    module.exports = r;
  }, {}],
  "LN6c": [function (require, module, exports) {
    var e = require("./isFunction"),
        n = require("./isLength");

    function r(r) {
      return null != r && n(r.length) && !e(r);
    }

    module.exports = r;
  }, {
    "./isFunction": "dRuq",
    "./isLength": "GmNU"
  }],
  "FwQQ": [function (require, module, exports) {
    var e = require("./isArrayLike"),
        r = require("./isObjectLike");

    function i(i) {
      return r(i) && e(i);
    }

    module.exports = i;
  }, {
    "./isArrayLike": "LN6c",
    "./isObjectLike": "OuyB"
  }],
  "PYZb": [function (require, module, exports) {
    function e() {
      return !1;
    }

    module.exports = e;
  }, {}],
  "iyC2": [function (require, module, exports) {
    var e = require("./_root"),
        o = require("./stubFalse"),
        r = "object" == _typeof(exports) && exports && !exports.nodeType && exports,
        t = r && "object" == _typeof(module) && module && !module.nodeType && module,
        p = t && t.exports === r,
        u = p ? e.Buffer : void 0,
        d = u ? u.isBuffer : void 0,
        s = d || o;

    module.exports = s;
  }, {
    "./_root": "MIhM",
    "./stubFalse": "PYZb"
  }],
  "ES04": [function (require, module, exports) {
    var t = require("./_baseGetTag"),
        e = require("./_getPrototype"),
        r = require("./isObjectLike"),
        o = "[object Object]",
        c = Function.prototype,
        n = Object.prototype,
        u = c.toString,
        i = n.hasOwnProperty,
        a = u.call(Object);

    function l(c) {
      if (!r(c) || t(c) != o) return !1;
      var n = e(c);
      if (null === n) return !0;
      var l = i.call(n, "constructor") && n.constructor;
      return "function" == typeof l && l instanceof l && u.call(l) == a;
    }

    module.exports = l;
  }, {
    "./_baseGetTag": "e5TX",
    "./_getPrototype": "CXf5",
    "./isObjectLike": "OuyB"
  }],
  "2L2L": [function (require, module, exports) {
    var e = require("./_baseGetTag"),
        t = require("./isLength"),
        r = require("./isObjectLike"),
        o = "[object Arguments]",
        b = "[object Array]",
        c = "[object Boolean]",
        j = "[object Date]",
        a = "[object Error]",
        n = "[object Function]",
        i = "[object Map]",
        A = "[object Number]",
        y = "[object Object]",
        u = "[object RegExp]",
        g = "[object Set]",
        l = "[object String]",
        p = "[object WeakMap]",
        s = "[object ArrayBuffer]",
        m = "[object DataView]",
        U = "[object Float32Array]",
        f = "[object Float64Array]",
        q = "[object Int8Array]",
        F = "[object Int16Array]",
        I = "[object Int32Array]",
        d = "[object Uint8Array]",
        h = "[object Uint8ClampedArray]",
        k = "[object Uint16Array]",
        x = "[object Uint32Array]",
        B = {};

    function D(o) {
      return r(o) && t(o.length) && !!B[e(o)];
    }

    B[U] = B[f] = B[q] = B[F] = B[I] = B[d] = B[h] = B[k] = B[x] = !0, B[o] = B[b] = B[s] = B[c] = B[m] = B[j] = B[a] = B[n] = B[i] = B[A] = B[y] = B[u] = B[g] = B[l] = B[p] = !1, module.exports = D;
  }, {
    "./_baseGetTag": "e5TX",
    "./isLength": "GmNU",
    "./isObjectLike": "OuyB"
  }],
  "PnXa": [function (require, module, exports) {
    function n(n) {
      return function (r) {
        return n(r);
      };
    }

    module.exports = n;
  }, {}],
  "PBPf": [function (require, module, exports) {
    var e = require("./_freeGlobal"),
        o = "object" == _typeof(exports) && exports && !exports.nodeType && exports,
        r = o && "object" == _typeof(module) && module && !module.nodeType && module,
        t = r && r.exports === o,
        p = t && e.process,
        u = function () {
      try {
        var e = r && r.require && r.require("util").types;

        return e || p && p.binding && p.binding("util");
      } catch (o) {}
    }();

    module.exports = u;
  }, {
    "./_freeGlobal": "j3D9"
  }],
  "kwIb": [function (require, module, exports) {
    var e = require("./_baseIsTypedArray"),
        r = require("./_baseUnary"),
        a = require("./_nodeUtil"),
        i = a && a.isTypedArray,
        s = i ? r(i) : e;

    module.exports = s;
  }, {
    "./_baseIsTypedArray": "2L2L",
    "./_baseUnary": "PnXa",
    "./_nodeUtil": "PBPf"
  }],
  "vW3g": [function (require, module, exports) {
    function o(o, r) {
      if ("__proto__" != r) return o[r];
    }

    module.exports = o;
  }, {}],
  "p/s9": [function (require, module, exports) {
    var e = require("./_baseAssignValue"),
        r = require("./eq"),
        o = Object.prototype,
        a = o.hasOwnProperty;

    function i(o, i, t) {
      var n = o[i];
      a.call(o, i) && r(n, t) && (void 0 !== t || i in o) || e(o, i, t);
    }

    module.exports = i;
  }, {
    "./_baseAssignValue": "d05+",
    "./eq": "LIpy"
  }],
  "dtkN": [function (require, module, exports) {
    var r = require("./_assignValue"),
        e = require("./_baseAssignValue");

    function a(a, i, u, n) {
      var o = !u;
      u || (u = {});

      for (var s = -1, v = i.length; ++s < v;) {
        var l = i[s],
            t = n ? n(u[l], a[l], l, u, a) : void 0;
        void 0 === t && (t = a[l]), o ? e(u, l, t) : r(u, l, t);
      }

      return u;
    }

    module.exports = a;
  }, {
    "./_assignValue": "p/s9",
    "./_baseAssignValue": "d05+"
  }],
  "r8MY": [function (require, module, exports) {
    function r(r, o) {
      for (var e = -1, n = Array(r); ++e < r;) {
        n[e] = o(e);
      }

      return n;
    }

    module.exports = r;
  }, {}],
  "A+gr": [function (require, module, exports) {
    var e = 9007199254740991,
        r = /^(?:0|[1-9]\d*)$/;

    function t(t, n) {
      var o = _typeof(t);

      return !!(n = null == n ? e : n) && ("number" == o || "symbol" != o && r.test(t)) && t > -1 && t % 1 == 0 && t < n;
    }

    module.exports = t;
  }, {}],
  "VcL+": [function (require, module, exports) {
    var e = require("./_baseTimes"),
        r = require("./isArguments"),
        t = require("./isArray"),
        i = require("./isBuffer"),
        n = require("./_isIndex"),
        s = require("./isTypedArray"),
        u = Object.prototype,
        f = u.hasOwnProperty;

    function a(u, a) {
      var o = t(u),
          p = !o && r(u),
          y = !o && !p && i(u),
          g = !o && !p && !y && s(u),
          h = o || p || y || g,
          l = h ? e(u.length, String) : [],
          q = l.length;

      for (var b in u) {
        !a && !f.call(u, b) || h && ("length" == b || y && ("offset" == b || "parent" == b) || g && ("buffer" == b || "byteLength" == b || "byteOffset" == b) || n(b, q)) || l.push(b);
      }

      return l;
    }

    module.exports = a;
  }, {
    "./_baseTimes": "r8MY",
    "./isArguments": "3til",
    "./isArray": "p/0c",
    "./isBuffer": "iyC2",
    "./_isIndex": "A+gr",
    "./isTypedArray": "kwIb"
  }],
  "uy4o": [function (require, module, exports) {
    function r(r) {
      var n = [];
      if (null != r) for (var u in Object(r)) {
        n.push(u);
      }
      return n;
    }

    module.exports = r;
  }, {}],
  "9FAS": [function (require, module, exports) {
    var r = require("./isObject"),
        e = require("./_isPrototype"),
        t = require("./_nativeKeysIn"),
        o = Object.prototype,
        i = o.hasOwnProperty;

    function n(o) {
      if (!r(o)) return t(o);
      var n = e(o),
          u = [];

      for (var s in o) {
        ("constructor" != s || !n && i.call(o, s)) && u.push(s);
      }

      return u;
    }

    module.exports = n;
  }, {
    "./isObject": "u9vI",
    "./_isPrototype": "nhsl",
    "./_nativeKeysIn": "uy4o"
  }],
  "+UAC": [function (require, module, exports) {
    var e = require("./_arrayLikeKeys"),
        r = require("./_baseKeysIn"),
        i = require("./isArrayLike");

    function u(u) {
      return i(u) ? e(u, !0) : r(u);
    }

    module.exports = u;
  }, {
    "./_arrayLikeKeys": "VcL+",
    "./_baseKeysIn": "9FAS",
    "./isArrayLike": "LN6c"
  }],
  "92s5": [function (require, module, exports) {
    var e = require("./_copyObject"),
        r = require("./keysIn");

    function u(u) {
      return e(u, r(u));
    }

    module.exports = u;
  }, {
    "./_copyObject": "dtkN",
    "./keysIn": "+UAC"
  }],
  "XsjK": [function (require, module, exports) {
    var e = require("./_assignMergeValue"),
        r = require("./_cloneBuffer"),
        i = require("./_cloneTypedArray"),
        u = require("./_copyArray"),
        q = require("./_initCloneObject"),
        s = require("./isArguments"),
        t = require("./isArray"),
        a = require("./isArrayLikeObject"),
        n = require("./isBuffer"),
        o = require("./isFunction"),
        c = require("./isObject"),
        l = require("./isPlainObject"),
        f = require("./isTypedArray"),
        y = require("./_safeGet"),
        d = require("./toPlainObject");

    function v(v, A, _, b, j, O, g) {
      var p = y(v, _),
          m = y(A, _),
          B = g.get(m);
      if (B) e(v, _, B);else {
        var P = O ? O(p, m, _ + "", v, A, g) : void 0,
            T = void 0 === P;

        if (T) {
          var k = t(m),
              x = !k && n(m),
              C = !k && !x && f(m);
          P = m, k || x || C ? t(p) ? P = p : a(p) ? P = u(p) : x ? (T = !1, P = r(m, !0)) : C ? (T = !1, P = i(m, !0)) : P = [] : l(m) || s(m) ? (P = p, s(p) ? P = d(p) : c(p) && !o(p) || (P = q(m))) : T = !1;
        }

        T && (g.set(m, P), j(P, m, b, O, g), g.delete(m)), e(v, _, P);
      }
    }

    module.exports = v;
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
    var e = require("./_Stack"),
        r = require("./_assignMergeValue"),
        i = require("./_baseFor"),
        u = require("./_baseMergeDeep"),
        s = require("./isObject"),
        a = require("./keysIn"),
        n = require("./_safeGet");

    function o(q, t, _, c, f) {
      q !== t && i(t, function (i, a) {
        if (s(i)) f || (f = new e()), u(q, t, a, _, o, c, f);else {
          var v = c ? c(n(q, a), i, a + "", q, t, f) : void 0;
          void 0 === v && (v = i), r(q, a, v);
        }
      }, a);
    }

    module.exports = o;
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
    function e(e) {
      return e;
    }

    module.exports = e;
  }, {}],
  "a+zQ": [function (require, module, exports) {
    function e(e, l, r) {
      switch (r.length) {
        case 0:
          return e.call(l);

        case 1:
          return e.call(l, r[0]);

        case 2:
          return e.call(l, r[0], r[1]);

        case 3:
          return e.call(l, r[0], r[1], r[2]);
      }

      return e.apply(l, r);
    }

    module.exports = e;
  }, {}],
  "qXFa": [function (require, module, exports) {
    var r = require("./_apply"),
        t = Math.max;

    function a(a, e, n) {
      return e = t(void 0 === e ? a.length - 1 : e, 0), function () {
        for (var o = arguments, u = -1, i = t(o.length - e, 0), f = Array(i); ++u < i;) {
          f[u] = o[e + u];
        }

        u = -1;

        for (var h = Array(e + 1); ++u < e;) {
          h[u] = o[u];
        }

        return h[e] = n(f), r(a, this, h);
      };
    }

    module.exports = a;
  }, {
    "./_apply": "a+zQ"
  }],
  "WMV8": [function (require, module, exports) {
    function n(n) {
      return function () {
        return n;
      };
    }

    module.exports = n;
  }, {}],
  "UJWv": [function (require, module, exports) {
    var e = require("./constant"),
        r = require("./_defineProperty"),
        t = require("./identity"),
        i = r ? function (t, i) {
      return r(t, "toString", {
        configurable: !0,
        enumerable: !1,
        value: e(i),
        writable: !0
      });
    } : t;

    module.exports = i;
  }, {
    "./constant": "WMV8",
    "./_defineProperty": "kAdy",
    "./identity": "Jpv1"
  }],
  "2NNl": [function (require, module, exports) {
    var r = 800,
        e = 16,
        n = Date.now;

    function t(t) {
      var o = 0,
          u = 0;
      return function () {
        var a = n(),
            i = e - (a - u);

        if (u = a, i > 0) {
          if (++o >= r) return arguments[0];
        } else o = 0;

        return t.apply(void 0, arguments);
      };
    }

    module.exports = t;
  }, {}],
  "KRxT": [function (require, module, exports) {
    var e = require("./_baseSetToString"),
        r = require("./_shortOut"),
        t = r(e);

    module.exports = t;
  }, {
    "./_baseSetToString": "UJWv",
    "./_shortOut": "2NNl"
  }],
  "f4Fl": [function (require, module, exports) {
    var e = require("./identity"),
        r = require("./_overRest"),
        t = require("./_setToString");

    function i(i, u) {
      return t(r(i, u, e), i + "");
    }

    module.exports = i;
  }, {
    "./identity": "Jpv1",
    "./_overRest": "qXFa",
    "./_setToString": "KRxT"
  }],
  "R62e": [function (require, module, exports) {
    var e = require("./eq"),
        r = require("./isArrayLike"),
        i = require("./_isIndex"),
        n = require("./isObject");

    function u(u, t, q) {
      if (!n(q)) return !1;

      var s = _typeof(t);

      return !!("number" == s ? r(q) && i(t, q.length) : "string" == s && t in q) && e(q[t], u);
    }

    module.exports = u;
  }, {
    "./eq": "LIpy",
    "./isArrayLike": "LN6c",
    "./_isIndex": "A+gr",
    "./isObject": "u9vI"
  }],
  "gmQJ": [function (require, module, exports) {
    var e = require("./_baseRest"),
        r = require("./_isIterateeCall");

    function t(t) {
      return e(function (e, o) {
        var i = -1,
            n = o.length,
            u = n > 1 ? o[n - 1] : void 0,
            v = n > 2 ? o[2] : void 0;

        for (u = t.length > 3 && "function" == typeof u ? (n--, u) : void 0, v && r(o[0], o[1], v) && (u = n < 3 ? void 0 : u, n = 1), e = Object(e); ++i < n;) {
          var a = o[i];
          a && t(e, a, i, u);
        }

        return e;
      });
    }

    module.exports = t;
  }, {
    "./_baseRest": "f4Fl",
    "./_isIterateeCall": "R62e"
  }],
  "yubd": [function (require, module, exports) {
    var e = require("./_baseMerge"),
        r = require("./_createAssigner"),
        i = r(function (r, i, s) {
      e(r, i, s);
    });

    module.exports = i;
  }, {
    "./_baseMerge": "WqwZ",
    "./_createAssigner": "gmQJ"
  }],
  "duLQ": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;
    var e = t(require("./Utilities")),
        o = t(require("lodash/merge"));

    function t(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    function n(e, o) {
      if (!(e instanceof o)) throw new TypeError("Cannot call a class as a function");
    }

    function i(e, o) {
      for (var t = 0; t < o.length; t++) {
        var n = o[t];
        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
      }
    }

    function r(e, o, t) {
      return o && i(e.prototype, o), t && i(e, t), e;
    }

    var a = function () {
      function t(e) {
        n(this, t), window.CookieConsent.buffer = {
          appendChild: [],
          insertBefore: []
        }, window.CookieConsent.wrapper = function () {}, window.CookieConsent.setConfiguration = this.setConfiguration.bind(this), window.CookieConsent.config = {
          active: !0,
          cookieExists: !1,
          cookieVersion: 1,
          modalMainTextMoreLink: null,
          barTimeout: 1e3,
          theme: {
            barColor: "#2C7CBF",
            barTextColor: "#FFF",
            barMainButtonColor: "#FFF",
            barMainButtonTextColor: "#2C7CBF",
            modalMainButtonColor: "#4285F4",
            modalMainButtonTextColor: "#FFF"
          },
          language: {
            current: "en",
            locale: {
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
              },
              hu: {
                barMainText: "Ez a weboldal Sütiket használ a jobb felhasználói élmény érdekében.",
                barLinkSetting: "Süti beállítások",
                barBtnAcceptAll: "Minden süti elfogadása",
                modalMainTitle: "Süti beállítások",
                modalMainText: "A HTTP-süti (általában egyszerűen süti, illetve angolul cookie) egy információcsomag, amelyet a szerver küld a webböngészőnek, majd a böngésző visszaküld a szervernek minden, a szerver felé irányított kérés alkalmával. Amikor egy weboldalt kérünk le a szervertől, akkor a böngésző elküldi a számára elérhető sütiket. A süti-ket úgy tervezték, hogy megbízható mechanizmust biztosítsanak a webhelyek számára az információk megőrzésére vagy a felhasználók böngészési tevékenységének rögzítésére.",
                modalBtnSave: "Beállítások mentése",
                modalBtnAcceptAll: "Minden Süti elfogadása",
                modalAffectedSolutions: "Mire lesz ez hatással:",
                learnMore: "Tudj meg többet",
                on: "Be",
                off: "Ki"
              }
            }
          },
          categories: {},
          services: {}
        }, this.setConfiguration(e);
      }

      return r(t, [{
        key: "setConfiguration",
        value: function value(t) {
          (0, o.default)(window.CookieConsent.config, t), this.cookieToConfig(), e.default.dispatchEvent(document, "CCConfigSet");
        }
      }, {
        key: "cookieToConfig",
        value: function value() {
          function o() {
            return e.default.removeCookie(), location.reload(), !1;
          }

          return document.cookie.split(";").filter(function (e) {
            if (e.indexOf("cconsent") >= 0) {
              var t = JSON.parse(e.split("=")[1]);
              if (void 0 === t.version) return o();
              if (t.version !== window.CookieConsent.config.cookieVersion) return o();

              for (var n in t.categories) {
                if (void 0 === window.CookieConsent.config.categories[n]) return o();
              }

              for (var i in t.services.forEach(function (e) {
                if (void 0 === window.CookieConsent.config.services[e]) return o();
              }), t.categories) {
                window.CookieConsent.config.categories[i].checked = window.CookieConsent.config.categories[i].wanted = !0 === t.categories[i].wanted;
              }

              return window.CookieConsent.config.cookieExists = !0, !0;
            }
          }), !1;
        }
      }]), t;
    }();

    exports.default = a;
  }, {
    "./Utilities": "/6wJ",
    "lodash/merge": "yubd"
  }],
  "ylk/": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;
    var e = a(require("./InsertScriptFilter")),
        r = a(require("./ScriptTagFilter")),
        t = a(require("./WrapperFilter")),
        n = a(require("./LocalCookieFilter")),
        i = a(require("./Interface")),
        u = a(require("./Configuration"));

    function a(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    function o(e, r) {
      if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function");
    }

    function l(e, r) {
      for (var t = 0; t < r.length; t++) {
        var n = r[t];
        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
      }
    }

    function f(e, r, t) {
      return r && l(e.prototype, r), t && l(e, t), e;
    }

    var c = function () {
      function a() {
        o(this, a);
      }

      return f(a, [{
        key: "init",
        value: function value(a) {
          new u.default(a);
          var o = new e.default(),
              l = new r.default(),
              f = new t.default(),
              c = new n.default();
          o.init(), l.init(), f.init(), c.init();
          var d = new i.default();
          d.buildInterface(function () {
            d.addEventListeners();
          });
        }
      }]), a;
    }();

    exports.default = c;
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

    require("core-js/es6/symbol"), require("core-js/fn/symbol/iterator");
    var e = o(require("./lib/CookieConsent"));

    function o(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var i = new e.default();
    window.CookieConsent = window.CookieConsent || {}, window.CookieConsent.init = i.init;
  }, {
    "core-js/es6/symbol": "CtPZ",
    "core-js/fn/symbol/iterator": "KQqW",
    "./lib/CookieConsent": "ylk/"
  }]
}, {}, ["Focm"], null);
},{}],"../spine.js":[function(require,module,exports) {
"use strict";

var _uikit = _interopRequireDefault(require("uikit/dist/js/uikit.min"));

var _uikitIcons = _interopRequireDefault(require("uikit/dist/js/uikit-icons.min"));

require("./cookieconsent.min.js");

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
},{"uikit/dist/js/uikit.min":"../node_modules/uikit/dist/js/uikit.min.js","uikit/dist/js/uikit-icons.min":"../node_modules/uikit/dist/js/uikit-icons.min.js","./cookieconsent.min.js":"../cookieconsent.min.js"}],"../index.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56409" + '/');

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