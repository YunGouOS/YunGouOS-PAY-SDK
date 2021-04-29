(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],[
/* 0 */,
/* 1 */
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_NAME":"YunGouOS-UniApp-Demo","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      appOptions.onShow.apply(app, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      appOptions.onHide.apply(app, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(app, args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),
/* 2 */
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2021 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_NAME":"YunGouOS-UniApp-Demo","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_NAME":"YunGouOS-UniApp-Demo","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_NAME":"YunGouOS-UniApp-Demo","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_NAME":"YunGouOS-UniApp-Demo","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 3 */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/*!********************************************************!*\
  !*** E:/Vue-WorkSpace/YunGouOS-UniApp-Demo/pages.json ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 18);

/***/ }),
/* 18 */
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 19);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),
/* 19 */
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),
/* 20 */
/*!*******************************************************************************************!*\
  !*** E:/Vue-WorkSpace/YunGouOS-UniApp-Demo/node_modules/yungouos-pay-uniapp-sdk/index.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {var _regeneratorRuntime = __webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 17);!function (r, e) { true ? module.exports = e() : undefined;}(this, function () {return function (r) {var e = {};function t(n) {if (e[n]) return e[n].exports;var o = e[n] = { i: n, l: !1, exports: {} };return r[n].call(o.exports, o, o.exports, t), o.l = !0, o.exports;}return t.m = r, t.c = e, t.d = function (r, e, n) {t.o(r, e) || Object.defineProperty(r, e, { enumerable: !0, get: n });}, t.r = function (r) {"undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(r, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(r, "__esModule", { value: !0 });}, t.t = function (r, e) {if (1 & e && (r = t(r)), 8 & e) return r;if (4 & e && "object" == typeof r && r && r.__esModule) return r;var n = Object.create(null);if (t.r(n), Object.defineProperty(n, "default", { enumerable: !0, value: r }), 2 & e && "string" != typeof r) for (var o in r) {t.d(n, o, function (e) {return r[e];}.bind(null, o));}return n;}, t.n = function (r) {var e = r && r.__esModule ? function () {return r.default;} : function () {return r;};return t.d(e, "a", e), e;}, t.o = function (r, e) {return Object.prototype.hasOwnProperty.call(r, e);}, t.p = "", t(t.s = 141);}([function (r, e, t) {(function (e) {var t = function t(r) {return r && r.Math == Math && r;};r.exports = t("object" == typeof globalThis && globalThis) || t("object" == typeof window && window) || t("object" == typeof self && self) || t("object" == typeof e && e) || function () {return this;}() || Function("return this")();}).call(this, t(93));}, function (r, e, t) {var n = t(0),o = t(39),u = t(6),i = t(40),s = t(43),a = t(59),c = o("wks"),l = n.Symbol,p = a ? l : l && l.withoutSetter || i;r.exports = function (r) {return u(c, r) && (s || "string" == typeof c[r]) || (s && u(l, r) ? c[r] = l[r] : c[r] = p("Symbol." + r)), c[r];};}, function (r, e) {r.exports = function (r) {try {return !!r();} catch (r) {return !0;}};}, function (r, e, t) {var n = t(5);r.exports = function (r) {if (!n(r)) throw TypeError(String(r) + " is not an object");return r;};}, function (r, e, t) {var n = t(0),o = t(26).f,u = t(9),i = t(11),s = t(36),a = t(53),c = t(58);r.exports = function (r, e) {var t,l,p,f,y,d = r.target,m = r.global,g = r.stat;if (t = m ? n : g ? n[d] || s(d, {}) : (n[d] || {}).prototype) for (l in e) {if (f = e[l], p = r.noTargetGet ? (y = o(t, l)) && y.value : t[l], !c(m ? l : d + (g ? "." : "#") + l, r.forced) && void 0 !== p) {if (typeof f == typeof p) continue;a(f, p);}(r.sham || p && p.sham) && u(f, "sham", !0), i(t, l, f, r);}};}, function (r, e) {r.exports = function (r) {return "object" == typeof r ? null !== r : "function" == typeof r;};}, function (r, e) {var t = {}.hasOwnProperty;r.exports = function (r, e) {return t.call(r, e);};}, function (r, e, t) {var n = t(8),o = t(52),u = t(3),i = t(27),s = Object.defineProperty;e.f = n ? s : function (r, e, t) {if (u(r), e = i(e, !0), u(t), o) try {return s(r, e, t);} catch (r) {}if ("get" in t || "set" in t) throw TypeError("Accessors not supported");return "value" in t && (r[e] = t.value), r;};}, function (r, e, t) {var n = t(2);r.exports = !n(function () {return 7 != Object.defineProperty({}, 1, { get: function get() {return 7;} })[1];});}, function (r, e, t) {var n = t(8),o = t(7),u = t(21);r.exports = n ? function (r, e, t) {return o.f(r, e, u(1, t));} : function (r, e, t) {return r[e] = t, r;};}, function (r, e, t) {var n = t(34),o = t(17);r.exports = function (r) {return n(o(r));};}, function (r, e, t) {var n = t(0),o = t(9),u = t(6),i = t(36),s = t(37),a = t(22),c = a.get,l = a.enforce,p = String(String).split("String");(r.exports = function (r, e, t, s) {var a,c = !!s && !!s.unsafe,f = !!s && !!s.enumerable,y = !!s && !!s.noTargetGet;"function" == typeof t && ("string" != typeof e || u(t, "name") || o(t, "name", e), (a = l(t)).source || (a.source = p.join("string" == typeof e ? e : ""))), r !== n ? (c ? !y && r[e] && (f = !0) : delete r[e], f ? r[e] = t : o(r, e, t)) : f ? r[e] = t : i(e, t);})(Function.prototype, "toString", function () {return "function" == typeof this && c(this).source || s(this);});}, function (r, e) {var t = {}.toString;r.exports = function (r) {return t.call(r).slice(8, -1);};}, function (r, e, t) {var n = t(19),o = Math.min;r.exports = function (r) {return r > 0 ? o(n(r), 9007199254740991) : 0;};}, function (r, e, t) {var n = t(46),o = t(11),u = t(107);n || o(Object.prototype, "toString", u, { unsafe: !0 });}, function (r, e, t) {var n = t(17);r.exports = function (r) {return Object(n(r));};}, function (r, e, t) {"use strict";var n,o,u,i,s = t(4),a = t(23),c = t(0),l = t(18),p = t(97),f = t(11),y = t(98),d = t(30),m = t(99),g = t(5),h = t(24),b = t(100),v = t(37),E = t(101),k = t(64),x = t(65),_ = t(66).set,w = t(102),S = t(104),P = t(105),O = t(69),j = t(106),A = t(22),R = t(58),I = t(1),T = t(31),N = t(44),L = I("species"),C = "Promise",U = A.get,D = A.set,F = A.getterFor(C),_z = p,B = c.TypeError,M = c.document,q = c.process,J = l("fetch"),G = O.f,H = G,$ = !!(M && M.createEvent && c.dispatchEvent),W = "function" == typeof PromiseRejectionEvent,V = R(C, function () {if (!(v(_z) !== String(_z))) {if (66 === N) return !0;if (!T && !W) return !0;}if (a && !_z.prototype.finally) return !0;if (N >= 51 && /native code/.test(_z)) return !1;var r = _z.resolve(1),e = function e(r) {r(function () {}, function () {});};return (r.constructor = {})[L] = e, !(r.then(function () {}) instanceof e);}),Q = V || !k(function (r) {_z.all(r).catch(function () {});}),Y = function Y(r) {var e;return !(!g(r) || "function" != typeof (e = r.then)) && e;},K = function K(r, e) {if (!r.notified) {r.notified = !0;var t = r.reactions;w(function () {for (var n = r.value, o = 1 == r.state, u = 0; t.length > u;) {var i,s,a,c = t[u++],l = o ? c.ok : c.fail,p = c.resolve,f = c.reject,y = c.domain;try {l ? (o || (2 === r.rejection && er(r), r.rejection = 1), !0 === l ? i = n : (y && y.enter(), i = l(n), y && (y.exit(), a = !0)), i === c.promise ? f(B("Promise-chain cycle")) : (s = Y(i)) ? s.call(i, p, f) : p(i)) : f(n);} catch (r) {y && !a && y.exit(), f(r);}}r.reactions = [], r.notified = !1, e && !r.rejection && Z(r);});}},X = function X(r, e, t) {var n, o;$ ? ((n = M.createEvent("Event")).promise = e, n.reason = t, n.initEvent(r, !1, !0), c.dispatchEvent(n)) : n = { promise: e, reason: t }, !W && (o = c["on" + r]) ? o(n) : "unhandledrejection" === r && P("Unhandled promise rejection", t);},Z = function Z(r) {_.call(c, function () {var e,t = r.facade,n = r.value;if (rr(r) && (e = j(function () {T ? q.emit("unhandledRejection", n, t) : X("unhandledrejection", t, n);}), r.rejection = T || rr(r) ? 2 : 1, e.error)) throw e.value;});},rr = function rr(r) {return 1 !== r.rejection && !r.parent;},er = function er(r) {_.call(c, function () {var e = r.facade;T ? q.emit("rejectionHandled", e) : X("rejectionhandled", e, r.value);});},tr = function tr(r, e, t) {return function (n) {r(e, n, t);};},nr = function nr(r, e, t) {r.done || (r.done = !0, t && (r = t), r.value = e, r.state = 2, K(r, !0));},or = function or(r, e, t) {if (!r.done) {r.done = !0, t && (r = t);try {if (r.facade === e) throw B("Promise can't be resolved itself");var n = Y(e);n ? w(function () {var t = { done: !1 };try {n.call(e, tr(or, t, r), tr(nr, t, r));} catch (e) {nr(t, e, r);}}) : (r.value = e, r.state = 1, K(r, !1));} catch (e) {nr({ done: !1 }, e, r);}}};V && (_z = function z(r) {b(this, _z, C), h(r), n.call(this);var e = U(this);try {r(tr(or, e), tr(nr, e));} catch (r) {nr(e, r);}}, (n = function n(r) {D(this, { type: C, done: !1, notified: !1, parent: !1, reactions: [], rejection: !1, state: 0, value: void 0 });}).prototype = y(_z.prototype, { then: function then(r, e) {var t = F(this),n = G(x(this, _z));return n.ok = "function" != typeof r || r, n.fail = "function" == typeof e && e, n.domain = T ? q.domain : void 0, t.parent = !0, t.reactions.push(n), 0 != t.state && K(t, !1), n.promise;}, catch: function _catch(r) {return this.then(void 0, r);} }), o = function o() {var r = new n(),e = U(r);this.promise = r, this.resolve = tr(or, e), this.reject = tr(nr, e);}, O.f = G = function G(r) {return r === _z || r === u ? new o(r) : H(r);}, a || "function" != typeof p || (i = p.prototype.then, f(p.prototype, "then", function (r, e) {var t = this;return new _z(function (r, e) {i.call(t, r, e);}).then(r, e);}, { unsafe: !0 }), "function" == typeof J && s({ global: !0, enumerable: !0, forced: !0 }, { fetch: function fetch(r) {return S(_z, J.apply(c, arguments));} }))), s({ global: !0, wrap: !0, forced: V }, { Promise: _z }), d(_z, C, !1, !0), m(C), u = l(C), s({ target: C, stat: !0, forced: V }, { reject: function reject(r) {var e = G(this);return e.reject.call(void 0, r), e.promise;} }), s({ target: C, stat: !0, forced: a || V }, { resolve: function resolve(r) {return S(a && this === u ? _z : this, r);} }), s({ target: C, stat: !0, forced: Q }, { all: function all(r) {var e = this,t = G(e),n = t.resolve,o = t.reject,u = j(function () {var t = h(e.resolve),u = [],i = 0,s = 1;E(r, function (r) {var a = i++,c = !1;u.push(void 0), s++, t.call(e, r).then(function (r) {c || (c = !0, u[a] = r, --s || n(u));}, o);}), --s || n(u);});return u.error && o(u.value), t.promise;}, race: function race(r) {var e = this,t = G(e),n = t.reject,o = j(function () {var o = h(e.resolve);E(r, function (r) {o.call(e, r).then(t.resolve, n);});});return o.error && n(o.value), t.promise;} });}, function (r, e) {r.exports = function (r) {if (null == r) throw TypeError("Can't call method on " + r);return r;};}, function (r, e, t) {var n = t(54),o = t(0),u = function u(r) {return "function" == typeof r ? r : void 0;};r.exports = function (r, e) {return arguments.length < 2 ? u(n[r]) || u(o[r]) : n[r] && n[r][e] || o[r] && o[r][e];};}, function (r, e) {var t = Math.ceil,n = Math.floor;r.exports = function (r) {return isNaN(r = +r) ? 0 : (r > 0 ? n : t)(r);};}, function (r, e, t) {var n = function (r) {"use strict";var e = Object.prototype,t = e.hasOwnProperty,n = "function" == typeof Symbol ? Symbol : {},o = n.iterator || "@@iterator",u = n.asyncIterator || "@@asyncIterator",i = n.toStringTag || "@@toStringTag";function s(r, e, t, n) {var o = e && e.prototype instanceof l ? e : l,u = Object.create(o.prototype),i = new x(n || []);return u._invoke = function (r, e, t) {var n = "suspendedStart";return function (o, u) {if ("executing" === n) throw new Error("Generator is already running");if ("completed" === n) {if ("throw" === o) throw u;return w();}for (t.method = o, t.arg = u;;) {var i = t.delegate;if (i) {var s = v(i, t);if (s) {if (s === c) continue;return s;}}if ("next" === t.method) t.sent = t._sent = t.arg;else if ("throw" === t.method) {if ("suspendedStart" === n) throw n = "completed", t.arg;t.dispatchException(t.arg);} else "return" === t.method && t.abrupt("return", t.arg);n = "executing";var l = a(r, e, t);if ("normal" === l.type) {if (n = t.done ? "completed" : "suspendedYield", l.arg === c) continue;return { value: l.arg, done: t.done };}"throw" === l.type && (n = "completed", t.method = "throw", t.arg = l.arg);}};}(r, t, i), u;}function a(r, e, t) {try {return { type: "normal", arg: r.call(e, t) };} catch (r) {return { type: "throw", arg: r };}}r.wrap = s;var c = {};function l() {}function p() {}function f() {}var y = {};y[o] = function () {return this;};var d = Object.getPrototypeOf,m = d && d(d(_([])));m && m !== e && t.call(m, o) && (y = m);var g = f.prototype = l.prototype = Object.create(y);function h(r) {["next", "throw", "return"].forEach(function (e) {r[e] = function (r) {return this._invoke(e, r);};});}function b(r, e) {var n;this._invoke = function (o, u) {function i() {return new e(function (n, i) {!function n(o, u, i, s) {var c = a(r[o], r, u);if ("throw" !== c.type) {var l = c.arg,p = l.value;return p && "object" == typeof p && t.call(p, "__await") ? e.resolve(p.__await).then(function (r) {n("next", r, i, s);}, function (r) {n("throw", r, i, s);}) : e.resolve(p).then(function (r) {l.value = r, i(l);}, function (r) {return n("throw", r, i, s);});}s(c.arg);}(o, u, n, i);});}return n = n ? n.then(i, i) : i();};}function v(r, e) {var t = r.iterator[e.method];if (void 0 === t) {if (e.delegate = null, "throw" === e.method) {if (r.iterator.return && (e.method = "return", e.arg = void 0, v(r, e), "throw" === e.method)) return c;e.method = "throw", e.arg = new TypeError("The iterator does not provide a 'throw' method");}return c;}var n = a(t, r.iterator, e.arg);if ("throw" === n.type) return e.method = "throw", e.arg = n.arg, e.delegate = null, c;var o = n.arg;return o ? o.done ? (e[r.resultName] = o.value, e.next = r.nextLoc, "return" !== e.method && (e.method = "next", e.arg = void 0), e.delegate = null, c) : o : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, c);}function E(r) {var e = { tryLoc: r[0] };1 in r && (e.catchLoc = r[1]), 2 in r && (e.finallyLoc = r[2], e.afterLoc = r[3]), this.tryEntries.push(e);}function k(r) {var e = r.completion || {};e.type = "normal", delete e.arg, r.completion = e;}function x(r) {this.tryEntries = [{ tryLoc: "root" }], r.forEach(E, this), this.reset(!0);}function _(r) {if (r) {var e = r[o];if (e) return e.call(r);if ("function" == typeof r.next) return r;if (!isNaN(r.length)) {var n = -1,u = function e() {for (; ++n < r.length;) {if (t.call(r, n)) return e.value = r[n], e.done = !1, e;}return e.value = void 0, e.done = !0, e;};return u.next = u;}}return { next: w };}function w() {return { value: void 0, done: !0 };}return p.prototype = g.constructor = f, f.constructor = p, f[i] = p.displayName = "GeneratorFunction", r.isGeneratorFunction = function (r) {var e = "function" == typeof r && r.constructor;return !!e && (e === p || "GeneratorFunction" === (e.displayName || e.name));}, r.mark = function (r) {return Object.setPrototypeOf ? Object.setPrototypeOf(r, f) : (r.__proto__ = f, i in r || (r[i] = "GeneratorFunction")), r.prototype = Object.create(g), r;}, r.awrap = function (r) {return { __await: r };}, h(b.prototype), b.prototype[u] = function () {return this;}, r.AsyncIterator = b, r.async = function (e, t, n, o, u) {void 0 === u && (u = Promise);var i = new b(s(e, t, n, o), u);return r.isGeneratorFunction(t) ? i : i.next().then(function (r) {return r.done ? r.value : i.next();});}, h(g), g[i] = "Generator", g[o] = function () {return this;}, g.toString = function () {return "[object Generator]";}, r.keys = function (r) {var e = [];for (var t in r) {e.push(t);}return e.reverse(), function t() {for (; e.length;) {var n = e.pop();if (n in r) return t.value = n, t.done = !1, t;}return t.done = !0, t;};}, r.values = _, x.prototype = { constructor: x, reset: function reset(r) {if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = !1, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(k), !r) for (var e in this) {"t" === e.charAt(0) && t.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = void 0);}}, stop: function stop() {this.done = !0;var r = this.tryEntries[0].completion;if ("throw" === r.type) throw r.arg;return this.rval;}, dispatchException: function dispatchException(r) {if (this.done) throw r;var e = this;function n(t, n) {return i.type = "throw", i.arg = r, e.next = t, n && (e.method = "next", e.arg = void 0), !!n;}for (var o = this.tryEntries.length - 1; o >= 0; --o) {var u = this.tryEntries[o],i = u.completion;if ("root" === u.tryLoc) return n("end");if (u.tryLoc <= this.prev) {var s = t.call(u, "catchLoc"),a = t.call(u, "finallyLoc");if (s && a) {if (this.prev < u.catchLoc) return n(u.catchLoc, !0);if (this.prev < u.finallyLoc) return n(u.finallyLoc);} else if (s) {if (this.prev < u.catchLoc) return n(u.catchLoc, !0);} else {if (!a) throw new Error("try statement without catch or finally");if (this.prev < u.finallyLoc) return n(u.finallyLoc);}}}}, abrupt: function abrupt(r, e) {for (var n = this.tryEntries.length - 1; n >= 0; --n) {var o = this.tryEntries[n];if (o.tryLoc <= this.prev && t.call(o, "finallyLoc") && this.prev < o.finallyLoc) {var u = o;break;}}u && ("break" === r || "continue" === r) && u.tryLoc <= e && e <= u.finallyLoc && (u = null);var i = u ? u.completion : {};return i.type = r, i.arg = e, u ? (this.method = "next", this.next = u.finallyLoc, c) : this.complete(i);}, complete: function complete(r, e) {if ("throw" === r.type) throw r.arg;return "break" === r.type || "continue" === r.type ? this.next = r.arg : "return" === r.type ? (this.rval = this.arg = r.arg, this.method = "return", this.next = "end") : "normal" === r.type && e && (this.next = e), c;}, finish: function finish(r) {for (var e = this.tryEntries.length - 1; e >= 0; --e) {var t = this.tryEntries[e];if (t.finallyLoc === r) return this.complete(t.completion, t.afterLoc), k(t), c;}}, catch: function _catch(r) {for (var e = this.tryEntries.length - 1; e >= 0; --e) {var t = this.tryEntries[e];if (t.tryLoc === r) {var n = t.completion;if ("throw" === n.type) {var o = n.arg;k(t);}return o;}}throw new Error("illegal catch attempt");}, delegateYield: function delegateYield(r, e, t) {return this.delegate = { iterator: _(r), resultName: e, nextLoc: t }, "next" === this.method && (this.arg = void 0), c;} }, r;}(r.exports);try {regeneratorRuntime = n;} catch (r) {Function("r", "regeneratorRuntime = r")(n);}}, function (r, e) {r.exports = function (r, e) {return { enumerable: !(1 & r), configurable: !(2 & r), writable: !(4 & r), value: e };};}, function (r, e, t) {var n,o,u,i = t(94),s = t(0),a = t(5),c = t(9),l = t(6),p = t(38),f = t(28),y = t(29),d = s.WeakMap;if (i) {var m = p.state || (p.state = new d()),g = m.get,h = m.has,b = m.set;n = function n(r, e) {return e.facade = r, b.call(m, r, e), e;}, o = function o(r) {return g.call(m, r) || {};}, u = function u(r) {return h.call(m, r);};} else {var v = f("state");y[v] = !0, n = function n(r, e) {return e.facade = r, c(r, v, e), e;}, o = function o(r) {return l(r, v) ? r[v] : {};}, u = function u(r) {return l(r, v);};}r.exports = { set: n, get: o, has: u, enforce: function enforce(r) {return u(r) ? o(r) : n(r, {});}, getterFor: function getterFor(r) {return function (e) {var t;if (!a(e) || (t = o(e)).type !== r) throw TypeError("Incompatible receiver, " + r + " required");return t;};} };}, function (r, e) {r.exports = !1;}, function (r, e) {r.exports = function (r) {if ("function" != typeof r) throw TypeError(String(r) + " is not a function");return r;};}, function (r, e) {r.exports = {};}, function (r, e, t) {var n = t(8),o = t(51),u = t(21),i = t(10),s = t(27),a = t(6),c = t(52),l = Object.getOwnPropertyDescriptor;e.f = n ? l : function (r, e) {if (r = i(r), e = s(e, !0), c) try {return l(r, e);} catch (r) {}if (a(r, e)) return u(!o.f.call(r, e), r[e]);};}, function (r, e, t) {var n = t(5);r.exports = function (r, e) {if (!n(r)) return r;var t, o;if (e && "function" == typeof (t = r.toString) && !n(o = t.call(r))) return o;if ("function" == typeof (t = r.valueOf) && !n(o = t.call(r))) return o;if (!e && "function" == typeof (t = r.toString) && !n(o = t.call(r))) return o;throw TypeError("Can't convert object to primitive value");};}, function (r, e, t) {var n = t(39),o = t(40),u = n("keys");r.exports = function (r) {return u[r] || (u[r] = o(r));};}, function (r, e) {r.exports = {};}, function (r, e, t) {var n = t(7).f,o = t(6),u = t(1)("toStringTag");r.exports = function (r, e, t) {r && !o(r = t ? r : r.prototype, u) && n(r, u, { configurable: !0, value: e });};}, function (r, e, t) {var n = t(12),o = t(0);r.exports = "process" == n(o.process);}, function (r, e, t) {var n = t(24);r.exports = function (r, e, t) {if (n(r), void 0 === e) return r;switch (t) {case 0:return function () {return r.call(e);};case 1:return function (t) {return r.call(e, t);};case 2:return function (t, n) {return r.call(e, t, n);};case 3:return function (t, n, o) {return r.call(e, t, n, o);};}return function () {return r.apply(e, arguments);};};}, function (r, e, t) {"use strict";var n,o,u = t(72),i = t(112),s = RegExp.prototype.exec,a = String.prototype.replace,c = s,l = (n = /a/, o = /b*/g, s.call(n, "a"), s.call(o, "a"), 0 !== n.lastIndex || 0 !== o.lastIndex),p = i.UNSUPPORTED_Y || i.BROKEN_CARET,f = void 0 !== /()??/.exec("")[1];(l || f || p) && (c = function c(r) {var e,t,n,o,i = this,c = p && i.sticky,y = u.call(i),d = i.source,m = 0,g = r;return c && (-1 === (y = y.replace("y", "")).indexOf("g") && (y += "g"), g = String(r).slice(i.lastIndex), i.lastIndex > 0 && (!i.multiline || i.multiline && "\n" !== r[i.lastIndex - 1]) && (d = "(?: " + d + ")", g = " " + g, m++), t = new RegExp("^(?:" + d + ")", y)), f && (t = new RegExp("^" + d + "$(?!\\s)", y)), l && (e = i.lastIndex), n = s.call(c ? t : i, g), c ? n ? (n.input = n.input.slice(m), n[0] = n[0].slice(m), n.index = i.lastIndex, i.lastIndex += n[0].length) : i.lastIndex = 0 : l && n && (i.lastIndex = i.global ? n.index + n[0].length : e), f && n && n.length > 1 && a.call(n[0], t, function () {for (o = 1; o < arguments.length - 2; o++) {void 0 === arguments[o] && (n[o] = void 0);}}), n;}), r.exports = c;}, function (r, e, t) {var n = t(2),o = t(12),u = "".split;r.exports = n(function () {return !Object("z").propertyIsEnumerable(0);}) ? function (r) {return "String" == o(r) ? u.call(r, "") : Object(r);} : Object;}, function (r, e, t) {var n = t(0),o = t(5),u = n.document,i = o(u) && o(u.createElement);r.exports = function (r) {return i ? u.createElement(r) : {};};}, function (r, e, t) {var n = t(0),o = t(9);r.exports = function (r, e) {try {o(n, r, e);} catch (t) {n[r] = e;}return e;};}, function (r, e, t) {var n = t(38),o = Function.toString;"function" != typeof n.inspectSource && (n.inspectSource = function (r) {return o.call(r);}), r.exports = n.inspectSource;}, function (r, e, t) {var n = t(0),o = t(36),u = n["__core-js_shared__"] || o("__core-js_shared__", {});r.exports = u;}, function (r, e, t) {var n = t(23),o = t(38);(r.exports = function (r, e) {return o[r] || (o[r] = void 0 !== e ? e : {});})("versions", []).push({ version: "3.9.1", mode: n ? "pure" : "global", copyright: "© 2021 Denis Pushkarev (zloirock.ru)" });}, function (r, e) {var t = 0,n = Math.random();r.exports = function (r) {return "Symbol(" + String(void 0 === r ? "" : r) + ")_" + (++t + n).toString(36);};}, function (r, e, t) {var n = t(55),o = t(42).concat("length", "prototype");e.f = Object.getOwnPropertyNames || function (r) {return n(r, o);};}, function (r, e) {r.exports = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"];}, function (r, e, t) {var n = t(31),o = t(44),u = t(2);r.exports = !!Object.getOwnPropertySymbols && !u(function () {return !Symbol.sham && (n ? 38 === o : o > 37 && o < 41);});}, function (r, e, t) {var n,o,u = t(0),i = t(45),s = u.process,a = s && s.versions,c = a && a.v8;c ? o = (n = c.split("."))[0] + n[1] : i && (!(n = i.match(/Edge\/(\d+)/)) || n[1] >= 74) && (n = i.match(/Chrome\/(\d+)/)) && (o = n[1]), r.exports = o && +o;}, function (r, e, t) {var n = t(18);r.exports = n("navigator", "userAgent") || "";}, function (r, e, t) {var n = {};n[t(1)("toStringTag")] = "z", r.exports = "[object z]" === String(n);}, function (r, e, t) {var n = t(55),o = t(42);r.exports = Object.keys || function (r) {return n(r, o);};}, function (r, e, t) {var n = t(12);r.exports = Array.isArray || function (r) {return "Array" == n(r);};}, function (r, e, t) {var n,o = t(3),u = t(117),i = t(42),s = t(29),a = t(67),c = t(35),l = t(28),p = l("IE_PROTO"),f = function f() {},y = function y(r) {return "<script>" + r + "<\/script>";},_d = function d() {try {n = document.domain && new ActiveXObject("htmlfile");} catch (r) {}var r, e;_d = n ? function (r) {r.write(y("")), r.close();var e = r.parentWindow.Object;return r = null, e;}(n) : ((e = c("iframe")).style.display = "none", a.appendChild(e), e.src = String("javascript:"), (r = e.contentWindow.document).open(), r.write(y("document.F=Object")), r.close(), r.F);for (var t = i.length; t--;) {delete _d.prototype[i[t]];}return _d();};s[p] = !0, r.exports = Object.create || function (r, e) {var t;return null !== r ? (f.prototype = o(r), t = new f(), f.prototype = null, t[p] = r) : t = _d(), void 0 === e ? t : u(t, e);};}, function (r, e, t) {"use strict";var n = String.prototype.replace,o = /%20/g,u = "RFC1738",i = "RFC3986";r.exports = { default: i, formatters: { RFC1738: function RFC1738(r) {return n.call(r, o, "+");}, RFC3986: function RFC3986(r) {return String(r);} }, RFC1738: u, RFC3986: i };}, function (r, e, t) {"use strict";var n = {}.propertyIsEnumerable,o = Object.getOwnPropertyDescriptor,u = o && !n.call({ 1: 2 }, 1);e.f = u ? function (r) {var e = o(this, r);return !!e && e.enumerable;} : n;}, function (r, e, t) {var n = t(8),o = t(2),u = t(35);r.exports = !n && !o(function () {return 7 != Object.defineProperty(u("div"), "a", { get: function get() {return 7;} }).a;});}, function (r, e, t) {var n = t(6),o = t(95),u = t(26),i = t(7);r.exports = function (r, e) {for (var t = o(e), s = i.f, a = u.f, c = 0; c < t.length; c++) {var l = t[c];n(r, l) || s(r, l, a(e, l));}};}, function (r, e, t) {var n = t(0);r.exports = n;}, function (r, e, t) {var n = t(6),o = t(10),u = t(96).indexOf,i = t(29);r.exports = function (r, e) {var t,s = o(r),a = 0,c = [];for (t in s) {!n(i, t) && n(s, t) && c.push(t);}for (; e.length > a;) {n(s, t = e[a++]) && (~u(c, t) || c.push(t));}return c;};}, function (r, e, t) {var n = t(19),o = Math.max,u = Math.min;r.exports = function (r, e) {var t = n(r);return t < 0 ? o(t + e, 0) : u(t, e);};}, function (r, e) {e.f = Object.getOwnPropertySymbols;}, function (r, e, t) {var n = t(2),o = /#|\.prototype\./,u = function u(r, e) {var t = s[i(r)];return t == c || t != a && ("function" == typeof e ? n(e) : !!e);},i = u.normalize = function (r) {return String(r).replace(o, ".").toLowerCase();},s = u.data = {},a = u.NATIVE = "N",c = u.POLYFILL = "P";r.exports = u;}, function (r, e, t) {var n = t(43);r.exports = n && !Symbol.sham && "symbol" == typeof Symbol.iterator;}, function (r, e, t) {var n = t(1),o = t(25),u = n("iterator"),i = Array.prototype;r.exports = function (r) {return void 0 !== r && (o.Array === r || i[u] === r);};}, function (r, e, t) {var n = t(62),o = t(25),u = t(1)("iterator");r.exports = function (r) {if (null != r) return r[u] || r["@@iterator"] || o[n(r)];};}, function (r, e, t) {var n = t(46),o = t(12),u = t(1)("toStringTag"),i = "Arguments" == o(function () {return arguments;}());r.exports = n ? o : function (r) {var e, t, n;return void 0 === r ? "Undefined" : null === r ? "Null" : "string" == typeof (t = function (r, e) {try {return r[e];} catch (r) {}}(e = Object(r), u)) ? t : i ? o(e) : "Object" == (n = o(e)) && "function" == typeof e.callee ? "Arguments" : n;};}, function (r, e, t) {var n = t(3);r.exports = function (r) {var e = r.return;if (void 0 !== e) return n(e.call(r)).value;};}, function (r, e, t) {var n = t(1)("iterator"),o = !1;try {var u = 0,i = { next: function next() {return { done: !!u++ };}, return: function _return() {o = !0;} };i[n] = function () {return this;}, Array.from(i, function () {throw 2;});} catch (r) {}r.exports = function (r, e) {if (!e && !o) return !1;var t = !1;try {var u = {};u[n] = function () {return { next: function next() {return { done: t = !0 };} };}, r(u);} catch (r) {}return t;};}, function (r, e, t) {var n = t(3),o = t(24),u = t(1)("species");r.exports = function (r, e) {var t,i = n(r).constructor;return void 0 === i || null == (t = n(i)[u]) ? e : o(t);};}, function (r, e, t) {var n,o,u,i = t(0),s = t(2),a = t(32),c = t(67),l = t(35),p = t(68),f = t(31),y = i.location,d = i.setImmediate,m = i.clearImmediate,g = i.process,h = i.MessageChannel,b = i.Dispatch,v = 0,E = {},k = function k(r) {if (E.hasOwnProperty(r)) {var e = E[r];delete E[r], e();}},x = function x(r) {return function () {k(r);};},_ = function _(r) {k(r.data);},w = function w(r) {i.postMessage(r + "", y.protocol + "//" + y.host);};d && m || (d = function d(r) {for (var e = [], t = 1; arguments.length > t;) {e.push(arguments[t++]);}return E[++v] = function () {("function" == typeof r ? r : Function(r)).apply(void 0, e);}, n(v), v;}, m = function m(r) {delete E[r];}, f ? n = function n(r) {g.nextTick(x(r));} : b && b.now ? n = function n(r) {b.now(x(r));} : h && !p ? (u = (o = new h()).port2, o.port1.onmessage = _, n = a(u.postMessage, u, 1)) : i.addEventListener && "function" == typeof postMessage && !i.importScripts && y && "file:" !== y.protocol && !s(w) ? (n = w, i.addEventListener("message", _, !1)) : n = "onreadystatechange" in l("script") ? function (r) {c.appendChild(l("script")).onreadystatechange = function () {c.removeChild(this), k(r);};} : function (r) {setTimeout(x(r), 0);}), r.exports = { set: d, clear: m };}, function (r, e, t) {var n = t(18);r.exports = n("document", "documentElement");}, function (r, e, t) {var n = t(45);r.exports = /(iphone|ipod|ipad).*applewebkit/i.test(n);}, function (r, e, t) {"use strict";var n = t(24),o = function o(r) {var e, t;this.promise = new r(function (r, n) {if (void 0 !== e || void 0 !== t) throw TypeError("Bad Promise constructor");e = r, t = n;}), this.resolve = n(e), this.reject = n(t);};r.exports.f = function (r) {return new o(r);};}, function (r, e, t) {"use strict";t(71);var n = t(11),o = t(2),u = t(1),i = t(33),s = t(9),a = u("species"),c = !o(function () {var r = /./;return r.exec = function () {var r = [];return r.groups = { a: "7" }, r;}, "7" !== "".replace(r, "$<a>");}),l = "$0" === "a".replace(/./, "$0"),p = u("replace"),f = !!/./[p] && "" === /./[p]("a", "$0"),y = !o(function () {var r = /(?:)/,e = r.exec;r.exec = function () {return e.apply(this, arguments);};var t = "ab".split(r);return 2 !== t.length || "a" !== t[0] || "b" !== t[1];});r.exports = function (r, e, t, p) {var d = u(r),m = !o(function () {var e = {};return e[d] = function () {return 7;}, 7 != ""[r](e);}),g = m && !o(function () {var e = !1,t = /a/;return "split" === r && ((t = {}).constructor = {}, t.constructor[a] = function () {return t;}, t.flags = "", t[d] = /./[d]), t.exec = function () {return e = !0, null;}, t[d](""), !e;});if (!m || !g || "replace" === r && (!c || !l || f) || "split" === r && !y) {var h = /./[d],b = t(d, ""[r], function (r, e, t, n, o) {return e.exec === i ? m && !o ? { done: !0, value: h.call(e, t, n) } : { done: !0, value: r.call(t, e, n) } : { done: !1 };}, { REPLACE_KEEPS_$0: l, REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: f }),v = b[0],E = b[1];n(String.prototype, r, v), n(RegExp.prototype, d, 2 == e ? function (r, e) {return E.call(r, this, e);} : function (r) {return E.call(r, this);});}p && s(RegExp.prototype[d], "sham", !0);};}, function (r, e, t) {"use strict";var n = t(4),o = t(33);n({ target: "RegExp", proto: !0, forced: /./.exec !== o }, { exec: o });}, function (r, e, t) {"use strict";var n = t(3);r.exports = function () {var r = n(this),e = "";return r.global && (e += "g"), r.ignoreCase && (e += "i"), r.multiline && (e += "m"), r.dotAll && (e += "s"), r.unicode && (e += "u"), r.sticky && (e += "y"), e;};}, function (r, e, t) {"use strict";var n = t(74).charAt;r.exports = function (r, e, t) {return e + (t ? n(r, e).length : 1);};}, function (r, e, t) {var n = t(19),o = t(17),u = function u(r) {return function (e, t) {var u,i,s = String(o(e)),a = n(t),c = s.length;return a < 0 || a >= c ? r ? "" : void 0 : (u = s.charCodeAt(a)) < 55296 || u > 56319 || a + 1 === c || (i = s.charCodeAt(a + 1)) < 56320 || i > 57343 ? r ? s.charAt(a) : u : r ? s.slice(a, a + 2) : i - 56320 + (u - 55296 << 10) + 65536;};};r.exports = { codeAt: u(!1), charAt: u(!0) };}, function (r, e, t) {var n = t(12),o = t(33);r.exports = function (r, e) {var t = r.exec;if ("function" == typeof t) {var u = t.call(r, e);if ("object" != typeof u) throw TypeError("RegExp exec method returned something other than an Object or null");return u;}if ("RegExp" !== n(r)) throw TypeError("RegExp#exec called on incompatible receiver");return o.call(r, e);};}, function (r, e, t) {"use strict";var n = t(4),o = t(34),u = t(10),i = t(77),s = [].join,a = o != Object,c = i("join", ",");n({ target: "Array", proto: !0, forced: a || !c }, { join: function join(r) {return s.call(u(this), void 0 === r ? "," : r);} });}, function (r, e, t) {"use strict";var n = t(2);r.exports = function (r, e) {var t = [][r];return !!t && n(function () {t.call(null, e || function () {throw 1;}, 1);});};}, function (r, e, t) {var n = t(4),o = t(15),u = t(47);n({ target: "Object", stat: !0, forced: t(2)(function () {u(1);}) }, { keys: function keys(r) {return u(o(r));} });}, function (r, e, t) {var n = t(1);e.f = n;}, function (r, e, t) {var n = t(54),o = t(6),u = t(79),i = t(7).f;r.exports = function (r) {var e = n.Symbol || (n.Symbol = {});o(e, r) || i(e, r, { value: u.f(r) });};}, function (r, e, t) {var n = t(32),o = t(34),u = t(15),i = t(13),s = t(119),a = [].push,c = function c(r) {var e = 1 == r,t = 2 == r,c = 3 == r,l = 4 == r,p = 6 == r,f = 7 == r,y = 5 == r || p;return function (d, m, g, h) {for (var b, v, E = u(d), k = o(E), x = n(m, g, 3), _ = i(k.length), w = 0, S = h || s, P = e ? S(d, _) : t || f ? S(d, 0) : void 0; _ > w; w++) {if ((y || w in k) && (v = x(b = k[w], w, E), r)) if (e) P[w] = v;else if (v) switch (r) {case 3:return !0;case 5:return b;case 6:return w;case 2:a.call(P, b);} else switch (r) {case 4:return !1;case 7:a.call(P, b);}}return p ? -1 : c || l ? l : P;};};r.exports = { forEach: c(0), map: c(1), filter: c(2), some: c(3), every: c(4), find: c(5), findIndex: c(6), filterOut: c(7) };}, function (r, e, t) {"use strict";var n = t(4),o = t(123),u = t(84),i = t(125),s = t(30),a = t(9),c = t(11),l = t(1),p = t(23),f = t(25),y = t(83),d = y.IteratorPrototype,m = y.BUGGY_SAFARI_ITERATORS,g = l("iterator"),h = function h() {return this;};r.exports = function (r, e, t, l, y, b, v) {o(t, e, l);var E,k,x,_ = function _(r) {if (r === y && j) return j;if (!m && r in P) return P[r];switch (r) {case "keys":case "values":case "entries":return function () {return new t(this, r);};}return function () {return new t(this);};},w = e + " Iterator",S = !1,P = r.prototype,O = P[g] || P["@@iterator"] || y && P[y],j = !m && O || _(y),A = "Array" == e && P.entries || O;if (A && (E = u(A.call(new r())), d !== Object.prototype && E.next && (p || u(E) === d || (i ? i(E, d) : "function" != typeof E[g] && a(E, g, h)), s(E, w, !0, !0), p && (f[w] = h))), "values" == y && O && "values" !== O.name && (S = !0, j = function j() {return O.call(this);}), p && !v || P[g] === j || a(P, g, j), f[e] = j, y) if (k = { values: _("values"), keys: b ? j : _("keys"), entries: _("entries") }, v) for (x in k) {(m || S || !(x in P)) && c(P, x, k[x]);} else n({ target: e, proto: !0, forced: m || S }, k);return k;};}, function (r, e, t) {"use strict";var n,o,u,i = t(2),s = t(84),a = t(9),c = t(6),l = t(1),p = t(23),f = l("iterator"),y = !1;[].keys && ("next" in (u = [].keys()) ? (o = s(s(u))) !== Object.prototype && (n = o) : y = !0);var d = null == n || i(function () {var r = {};return n[f].call(r) !== r;});d && (n = {}), p && !d || c(n, f) || a(n, f, function () {return this;}), r.exports = { IteratorPrototype: n, BUGGY_SAFARI_ITERATORS: y };}, function (r, e, t) {var n = t(6),o = t(15),u = t(28),i = t(124),s = u("IE_PROTO"),a = Object.prototype;r.exports = i ? Object.getPrototypeOf : function (r) {return r = o(r), n(r, s) ? r[s] : "function" == typeof r.constructor && r instanceof r.constructor ? r.constructor.prototype : r instanceof Object ? a : null;};}, function (r, e, t) {"use strict";var n = t(10),o = t(127),u = t(25),i = t(22),s = t(82),a = i.set,c = i.getterFor("Array Iterator");r.exports = s(Array, "Array", function (r, e) {a(this, { type: "Array Iterator", target: n(r), index: 0, kind: e });}, function () {var r = c(this),e = r.target,t = r.kind,n = r.index++;return !e || n >= e.length ? (r.target = void 0, { value: void 0, done: !0 }) : "keys" == t ? { value: n, done: !1 } : "values" == t ? { value: e[n], done: !1 } : { value: [n, e[n]], done: !1 };}, "values"), u.Arguments = u.Array, o("keys"), o("values"), o("entries");}, function (r, e, t) {"use strict";var n = t(27),o = t(7),u = t(21);r.exports = function (r, e, t) {var i = n(e);i in r ? o.f(r, i, u(0, t)) : r[i] = t;};}, function (r, e, t) {var n = t(2),o = t(1),u = t(44),i = o("species");r.exports = function (r) {return u >= 51 || !n(function () {var e = [];return (e.constructor = {})[i] = function () {return { foo: 1 };}, 1 !== e[r](Boolean).foo;});};}, function (r, e, t) {var n = t(8),o = t(7).f,u = Function.prototype,i = u.toString,s = /^\s*function ([^ (]*)/;n && !("name" in u) && o(u, "name", { configurable: !0, get: function get() {try {return i.call(this).match(s)[1];} catch (r) {return "";}} });}, function (r, e, t) {"use strict";var n = t(50),o = Object.prototype.hasOwnProperty,u = Array.isArray,i = function () {for (var r = [], e = 0; e < 256; ++e) {r.push("%" + ((e < 16 ? "0" : "") + e.toString(16)).toUpperCase());}return r;}(),s = function s(r, e) {for (var t = e && e.plainObjects ? Object.create(null) : {}, n = 0; n < r.length; ++n) {void 0 !== r[n] && (t[n] = r[n]);}return t;};r.exports = { arrayToObject: s, assign: function assign(r, e) {return Object.keys(e).reduce(function (r, t) {return r[t] = e[t], r;}, r);}, combine: function combine(r, e) {return [].concat(r, e);}, compact: function compact(r) {for (var e = [{ obj: { o: r }, prop: "o" }], t = [], n = 0; n < e.length; ++n) {for (var o = e[n], i = o.obj[o.prop], s = Object.keys(i), a = 0; a < s.length; ++a) {var c = s[a],l = i[c];"object" == typeof l && null !== l && -1 === t.indexOf(l) && (e.push({ obj: i, prop: c }), t.push(l));}}return function (r) {for (; r.length > 1;) {var e = r.pop(),t = e.obj[e.prop];if (u(t)) {for (var n = [], o = 0; o < t.length; ++o) {void 0 !== t[o] && n.push(t[o]);}e.obj[e.prop] = n;}}}(e), r;}, decode: function decode(r, e, t) {var n = r.replace(/\+/g, " ");if ("iso-8859-1" === t) return n.replace(/%[0-9a-f]{2}/gi, unescape);try {return decodeURIComponent(n);} catch (r) {return n;}}, encode: function encode(r, e, t, o, u) {if (0 === r.length) return r;var s = r;if ("symbol" == typeof r ? s = Symbol.prototype.toString.call(r) : "string" != typeof r && (s = String(r)), "iso-8859-1" === t) return escape(s).replace(/%u[0-9a-f]{4}/gi, function (r) {return "%26%23" + parseInt(r.slice(2), 16) + "%3B";});for (var a = "", c = 0; c < s.length; ++c) {var l = s.charCodeAt(c);45 === l || 46 === l || 95 === l || 126 === l || l >= 48 && l <= 57 || l >= 65 && l <= 90 || l >= 97 && l <= 122 || u === n.RFC1738 && (40 === l || 41 === l) ? a += s.charAt(c) : l < 128 ? a += i[l] : l < 2048 ? a += i[192 | l >> 6] + i[128 | 63 & l] : l < 55296 || l >= 57344 ? a += i[224 | l >> 12] + i[128 | l >> 6 & 63] + i[128 | 63 & l] : (c += 1, l = 65536 + ((1023 & l) << 10 | 1023 & s.charCodeAt(c)), a += i[240 | l >> 18] + i[128 | l >> 12 & 63] + i[128 | l >> 6 & 63] + i[128 | 63 & l]);}return a;}, isBuffer: function isBuffer(r) {return !(!r || "object" != typeof r) && !!(r.constructor && r.constructor.isBuffer && r.constructor.isBuffer(r));}, isRegExp: function isRegExp(r) {return "[object RegExp]" === Object.prototype.toString.call(r);}, maybeMap: function maybeMap(r, e) {if (u(r)) {for (var t = [], n = 0; n < r.length; n += 1) {t.push(e(r[n]));}return t;}return e(r);}, merge: function r(e, t, n) {if (!t) return e;if ("object" != typeof t) {if (u(e)) e.push(t);else {if (!e || "object" != typeof e) return [e, t];(n && (n.plainObjects || n.allowPrototypes) || !o.call(Object.prototype, t)) && (e[t] = !0);}return e;}if (!e || "object" != typeof e) return [e].concat(t);var i = e;return u(e) && !u(t) && (i = s(e, n)), u(e) && u(t) ? (t.forEach(function (t, u) {if (o.call(e, u)) {var i = e[u];i && "object" == typeof i && t && "object" == typeof t ? e[u] = r(i, t, n) : e.push(t);} else e[u] = t;}), e) : Object.keys(t).reduce(function (e, u) {var i = t[u];return o.call(e, u) ? e[u] = r(e[u], i, n) : e[u] = i, e;}, i);} };}, function (r, e) {var t = { utf8: { stringToBytes: function stringToBytes(r) {return t.bin.stringToBytes(unescape(encodeURIComponent(r)));}, bytesToString: function bytesToString(r) {return decodeURIComponent(escape(t.bin.bytesToString(r)));} }, bin: { stringToBytes: function stringToBytes(r) {for (var e = [], t = 0; t < r.length; t++) {e.push(255 & r.charCodeAt(t));}return e;}, bytesToString: function bytesToString(r) {for (var e = [], t = 0; t < r.length; t++) {e.push(String.fromCharCode(r[t]));}return e.join("");} } };r.exports = t;}, function (r, e, t) {"use strict";var n = t(134),o = t(135),u = t(50);r.exports = { formats: u, parse: o, stringify: n };}, function (r, e, t) {var n, o, u, i, _s;n = t(139), o = t(90).utf8, u = t(140), i = t(90).bin, (_s = function s(r, e) {r.constructor == String ? r = e && "binary" === e.encoding ? i.stringToBytes(r) : o.stringToBytes(r) : u(r) ? r = Array.prototype.slice.call(r, 0) : Array.isArray(r) || r.constructor === Uint8Array || (r = r.toString());for (var t = n.bytesToWords(r), a = 8 * r.length, c = 1732584193, l = -271733879, p = -1732584194, f = 271733878, y = 0; y < t.length; y++) {t[y] = 16711935 & (t[y] << 8 | t[y] >>> 24) | 4278255360 & (t[y] << 24 | t[y] >>> 8);}t[a >>> 5] |= 128 << a % 32, t[14 + (a + 64 >>> 9 << 4)] = a;var d = _s._ff,m = _s._gg,g = _s._hh,h = _s._ii;for (y = 0; y < t.length; y += 16) {var b = c,v = l,E = p,k = f;c = d(c, l, p, f, t[y + 0], 7, -680876936), f = d(f, c, l, p, t[y + 1], 12, -389564586), p = d(p, f, c, l, t[y + 2], 17, 606105819), l = d(l, p, f, c, t[y + 3], 22, -1044525330), c = d(c, l, p, f, t[y + 4], 7, -176418897), f = d(f, c, l, p, t[y + 5], 12, 1200080426), p = d(p, f, c, l, t[y + 6], 17, -1473231341), l = d(l, p, f, c, t[y + 7], 22, -45705983), c = d(c, l, p, f, t[y + 8], 7, 1770035416), f = d(f, c, l, p, t[y + 9], 12, -1958414417), p = d(p, f, c, l, t[y + 10], 17, -42063), l = d(l, p, f, c, t[y + 11], 22, -1990404162), c = d(c, l, p, f, t[y + 12], 7, 1804603682), f = d(f, c, l, p, t[y + 13], 12, -40341101), p = d(p, f, c, l, t[y + 14], 17, -1502002290), c = m(c, l = d(l, p, f, c, t[y + 15], 22, 1236535329), p, f, t[y + 1], 5, -165796510), f = m(f, c, l, p, t[y + 6], 9, -1069501632), p = m(p, f, c, l, t[y + 11], 14, 643717713), l = m(l, p, f, c, t[y + 0], 20, -373897302), c = m(c, l, p, f, t[y + 5], 5, -701558691), f = m(f, c, l, p, t[y + 10], 9, 38016083), p = m(p, f, c, l, t[y + 15], 14, -660478335), l = m(l, p, f, c, t[y + 4], 20, -405537848), c = m(c, l, p, f, t[y + 9], 5, 568446438), f = m(f, c, l, p, t[y + 14], 9, -1019803690), p = m(p, f, c, l, t[y + 3], 14, -187363961), l = m(l, p, f, c, t[y + 8], 20, 1163531501), c = m(c, l, p, f, t[y + 13], 5, -1444681467), f = m(f, c, l, p, t[y + 2], 9, -51403784), p = m(p, f, c, l, t[y + 7], 14, 1735328473), c = g(c, l = m(l, p, f, c, t[y + 12], 20, -1926607734), p, f, t[y + 5], 4, -378558), f = g(f, c, l, p, t[y + 8], 11, -2022574463), p = g(p, f, c, l, t[y + 11], 16, 1839030562), l = g(l, p, f, c, t[y + 14], 23, -35309556), c = g(c, l, p, f, t[y + 1], 4, -1530992060), f = g(f, c, l, p, t[y + 4], 11, 1272893353), p = g(p, f, c, l, t[y + 7], 16, -155497632), l = g(l, p, f, c, t[y + 10], 23, -1094730640), c = g(c, l, p, f, t[y + 13], 4, 681279174), f = g(f, c, l, p, t[y + 0], 11, -358537222), p = g(p, f, c, l, t[y + 3], 16, -722521979), l = g(l, p, f, c, t[y + 6], 23, 76029189), c = g(c, l, p, f, t[y + 9], 4, -640364487), f = g(f, c, l, p, t[y + 12], 11, -421815835), p = g(p, f, c, l, t[y + 15], 16, 530742520), c = h(c, l = g(l, p, f, c, t[y + 2], 23, -995338651), p, f, t[y + 0], 6, -198630844), f = h(f, c, l, p, t[y + 7], 10, 1126891415), p = h(p, f, c, l, t[y + 14], 15, -1416354905), l = h(l, p, f, c, t[y + 5], 21, -57434055), c = h(c, l, p, f, t[y + 12], 6, 1700485571), f = h(f, c, l, p, t[y + 3], 10, -1894986606), p = h(p, f, c, l, t[y + 10], 15, -1051523), l = h(l, p, f, c, t[y + 1], 21, -2054922799), c = h(c, l, p, f, t[y + 8], 6, 1873313359), f = h(f, c, l, p, t[y + 15], 10, -30611744), p = h(p, f, c, l, t[y + 6], 15, -1560198380), l = h(l, p, f, c, t[y + 13], 21, 1309151649), c = h(c, l, p, f, t[y + 4], 6, -145523070), f = h(f, c, l, p, t[y + 11], 10, -1120210379), p = h(p, f, c, l, t[y + 2], 15, 718787259), l = h(l, p, f, c, t[y + 9], 21, -343485551), c = c + b >>> 0, l = l + v >>> 0, p = p + E >>> 0, f = f + k >>> 0;}return n.endian([c, l, p, f]);})._ff = function (r, e, t, n, o, u, i) {var s = r + (e & t | ~e & n) + (o >>> 0) + i;return (s << u | s >>> 32 - u) + e;}, _s._gg = function (r, e, t, n, o, u, i) {var s = r + (e & n | t & ~n) + (o >>> 0) + i;return (s << u | s >>> 32 - u) + e;}, _s._hh = function (r, e, t, n, o, u, i) {var s = r + (e ^ t ^ n) + (o >>> 0) + i;return (s << u | s >>> 32 - u) + e;}, _s._ii = function (r, e, t, n, o, u, i) {var s = r + (t ^ (e | ~n)) + (o >>> 0) + i;return (s << u | s >>> 32 - u) + e;}, _s._blocksize = 16, _s._digestsize = 16, r.exports = function (r, e) {if (null == r) throw new Error("Illegal argument " + r);var t = n.wordsToBytes(_s(r, e));return e && e.asBytes ? t : e && e.asString ? i.bytesToString(t) : n.bytesToHex(t);};}, function (r, e) {var t;t = function () {return this;}();try {t = t || new Function("return this")();} catch (r) {"object" == typeof window && (t = window);}r.exports = t;}, function (r, e, t) {var n = t(0),o = t(37),u = n.WeakMap;r.exports = "function" == typeof u && /native code/.test(o(u));}, function (r, e, t) {var n = t(18),o = t(41),u = t(57),i = t(3);r.exports = n("Reflect", "ownKeys") || function (r) {var e = o.f(i(r)),t = u.f;return t ? e.concat(t(r)) : e;};}, function (r, e, t) {var n = t(10),o = t(13),u = t(56),i = function i(r) {return function (e, t, i) {var s,a = n(e),c = o(a.length),l = u(i, c);if (r && t != t) {for (; c > l;) {if ((s = a[l++]) != s) return !0;}} else for (; c > l; l++) {if ((r || l in a) && a[l] === t) return r || l || 0;}return !r && -1;};};r.exports = { includes: i(!0), indexOf: i(!1) };}, function (r, e, t) {var n = t(0);r.exports = n.Promise;}, function (r, e, t) {var n = t(11);r.exports = function (r, e, t) {for (var o in e) {n(r, o, e[o], t);}return r;};}, function (r, e, t) {"use strict";var n = t(18),o = t(7),u = t(1),i = t(8),s = u("species");r.exports = function (r) {var e = n(r),t = o.f;i && e && !e[s] && t(e, s, { configurable: !0, get: function get() {return this;} });};}, function (r, e) {r.exports = function (r, e, t) {if (!(r instanceof e)) throw TypeError("Incorrect " + (t ? t + " " : "") + "invocation");return r;};}, function (r, e, t) {var n = t(3),o = t(60),u = t(13),i = t(32),s = t(61),a = t(63),c = function c(r, e) {this.stopped = r, this.result = e;};r.exports = function (r, e, t) {var l,p,f,y,d,m,g,h = t && t.that,b = !(!t || !t.AS_ENTRIES),v = !(!t || !t.IS_ITERATOR),E = !(!t || !t.INTERRUPTED),k = i(e, h, 1 + b + E),x = function x(r) {return l && a(l), new c(!0, r);},_ = function _(r) {return b ? (n(r), E ? k(r[0], r[1], x) : k(r[0], r[1])) : E ? k(r, x) : k(r);};if (v) l = r;else {if ("function" != typeof (p = s(r))) throw TypeError("Target is not iterable");if (o(p)) {for (f = 0, y = u(r.length); y > f; f++) {if ((d = _(r[f])) && d instanceof c) return d;}return new c(!1);}l = p.call(r);}for (m = l.next; !(g = m.call(l)).done;) {try {d = _(g.value);} catch (r) {throw a(l), r;}if ("object" == typeof d && d && d instanceof c) return d;}return new c(!1);};}, function (r, e, t) {var n,o,u,i,s,a,c,l,p = t(0),f = t(26).f,y = t(66).set,d = t(68),m = t(103),g = t(31),h = p.MutationObserver || p.WebKitMutationObserver,b = p.document,v = p.process,E = p.Promise,k = f(p, "queueMicrotask"),x = k && k.value;x || (n = function n() {var r, e;for (g && (r = v.domain) && r.exit(); o;) {e = o.fn, o = o.next;try {e();} catch (r) {throw o ? i() : u = void 0, r;}}u = void 0, r && r.enter();}, d || g || m || !h || !b ? E && E.resolve ? (c = E.resolve(void 0), l = c.then, i = function i() {l.call(c, n);}) : i = g ? function () {v.nextTick(n);} : function () {y.call(p, n);} : (s = !0, a = b.createTextNode(""), new h(n).observe(a, { characterData: !0 }), i = function i() {a.data = s = !s;})), r.exports = x || function (r) {var e = { fn: r, next: void 0 };u && (u.next = e), o || (o = e, i()), u = e;};}, function (r, e, t) {var n = t(45);r.exports = /web0s(?!.*chrome)/i.test(n);}, function (r, e, t) {var n = t(3),o = t(5),u = t(69);r.exports = function (r, e) {if (n(r), o(e) && e.constructor === r) return e;var t = u.f(r);return (0, t.resolve)(e), t.promise;};}, function (r, e, t) {var n = t(0);r.exports = function (r, e) {var t = n.console;t && t.error && (1 === arguments.length ? t.error(r) : t.error(r, e));};}, function (r, e) {r.exports = function (r) {try {return { error: !1, value: r() };} catch (r) {return { error: !0, value: r };}};}, function (r, e, t) {"use strict";var n = t(46),o = t(62);r.exports = n ? {}.toString : function () {return "[object " + o(this) + "]";};}, function (r, e, t) {"use strict";var n = t(4),o = t(19),u = t(109),i = t(110),s = t(2),a = 1..toFixed,c = Math.floor,l = function l(r, e, t) {return 0 === e ? t : e % 2 == 1 ? l(r, e - 1, t * r) : l(r * r, e / 2, t);},p = function p(r, e, t) {for (var n = -1, o = t; ++n < 6;) {o += e * r[n], r[n] = o % 1e7, o = c(o / 1e7);}},f = function f(r, e) {for (var t = 6, n = 0; --t >= 0;) {n += r[t], r[t] = c(n / e), n = n % e * 1e7;}},y = function y(r) {for (var e = 6, t = ""; --e >= 0;) {if ("" !== t || 0 === e || 0 !== r[e]) {var n = String(r[e]);t = "" === t ? n : t + i.call("0", 7 - n.length) + n;}}return t;};n({ target: "Number", proto: !0, forced: a && ("0.000" !== 8e-5.toFixed(3) || "1" !== .9.toFixed(0) || "1.25" !== 1.255.toFixed(2) || "1000000000000000128" !== 0xde0b6b3a7640080.toFixed(0)) || !s(function () {a.call({});}) }, { toFixed: function toFixed(r) {var e,t,n,s,a = u(this),c = o(r),d = [0, 0, 0, 0, 0, 0],m = "",g = "0";if (c < 0 || c > 20) throw RangeError("Incorrect fraction digits");if (a != a) return "NaN";if (a <= -1e21 || a >= 1e21) return String(a);if (a < 0 && (m = "-", a = -a), a > 1e-21) if (t = (e = function (r) {for (var e = 0, t = r; t >= 4096;) {e += 12, t /= 4096;}for (; t >= 2;) {e += 1, t /= 2;}return e;}(a * l(2, 69, 1)) - 69) < 0 ? a * l(2, -e, 1) : a / l(2, e, 1), t *= 4503599627370496, (e = 52 - e) > 0) {for (p(d, 0, t), n = c; n >= 7;) {p(d, 1e7, 0), n -= 7;}for (p(d, l(10, n, 1), 0), n = e - 1; n >= 23;) {f(d, 1 << 23), n -= 23;}f(d, 1 << n), p(d, 1, 1), f(d, 2), g = y(d);} else p(d, 0, t), p(d, 1 << -e, 0), g = y(d) + i.call("0", c);return g = c > 0 ? m + ((s = g.length) <= c ? "0." + i.call("0", c - s) + g : g.slice(0, s - c) + "." + g.slice(s - c)) : m + g;} });}, function (r, e, t) {var n = t(12);r.exports = function (r) {if ("number" != typeof r && "Number" != n(r)) throw TypeError("Incorrect invocation");return +r;};}, function (r, e, t) {"use strict";var n = t(19),o = t(17);r.exports = "".repeat || function (r) {var e = String(o(this)),t = "",u = n(r);if (u < 0 || u == 1 / 0) throw RangeError("Wrong number of repetitions");for (; u > 0; (u >>>= 1) && (e += e)) {1 & u && (t += e);}return t;};}, function (r, e, t) {"use strict";var n = t(70),o = t(3),u = t(13),i = t(19),s = t(17),a = t(73),c = t(113),l = t(75),p = Math.max,f = Math.min;n("replace", 2, function (r, e, t, n) {var y = n.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE,d = n.REPLACE_KEEPS_$0,m = y ? "$" : "$0";return [function (t, n) {var o = s(this),u = null == t ? void 0 : t[r];return void 0 !== u ? u.call(t, o, n) : e.call(String(o), t, n);}, function (r, n) {if (!y && d || "string" == typeof n && -1 === n.indexOf(m)) {var s = t(e, r, this, n);if (s.done) return s.value;}var g = o(r),h = String(this),b = "function" == typeof n;b || (n = String(n));var v = g.global;if (v) {var E = g.unicode;g.lastIndex = 0;}for (var k = [];;) {var x = l(g, h);if (null === x) break;if (k.push(x), !v) break;"" === String(x[0]) && (g.lastIndex = a(h, u(g.lastIndex), E));}for (var _, w = "", S = 0, P = 0; P < k.length; P++) {x = k[P];for (var O = String(x[0]), j = p(f(i(x.index), h.length), 0), A = [], R = 1; R < x.length; R++) {A.push(void 0 === (_ = x[R]) ? _ : String(_));}var I = x.groups;if (b) {var T = [O].concat(A, j, h);void 0 !== I && T.push(I);var N = String(n.apply(void 0, T));} else N = c(O, h, j, A, I, n);j >= S && (w += h.slice(S, j) + N, S = j + O.length);}return w + h.slice(S);}];});}, function (r, e, t) {"use strict";var n = t(2);function o(r, e) {return RegExp(r, e);}e.UNSUPPORTED_Y = n(function () {var r = o("a", "y");return r.lastIndex = 2, null != r.exec("abcd");}), e.BROKEN_CARET = n(function () {var r = o("^r", "gy");return r.lastIndex = 2, null != r.exec("str");});}, function (r, e, t) {var n = t(15),o = Math.floor,u = "".replace,i = /\$([$&'`]|\d{1,2}|<[^>]*>)/g,s = /\$([$&'`]|\d{1,2})/g;r.exports = function (r, e, t, a, c, l) {var p = t + r.length,f = a.length,y = s;return void 0 !== c && (c = n(c), y = i), u.call(l, y, function (n, u) {var i;switch (u.charAt(0)) {case "$":return "$";case "&":return r;case "`":return e.slice(0, t);case "'":return e.slice(p);case "<":i = c[u.slice(1, -1)];break;default:var s = +u;if (0 === s) return n;if (s > f) {var l = o(s / 10);return 0 === l ? n : l <= f ? void 0 === a[l - 1] ? u.charAt(1) : a[l - 1] + u.charAt(1) : n;}i = a[s - 1];}return void 0 === i ? "" : i;});};}, function (r, e, t) {"use strict";var n = t(70),o = t(115),u = t(3),i = t(17),s = t(65),a = t(73),c = t(13),l = t(75),p = t(33),f = t(2),y = [].push,d = Math.min,m = !f(function () {return !RegExp(4294967295, "y");});n("split", 2, function (r, e, t) {var n;return n = "c" == "abbc".split(/(b)*/)[1] || 4 != "test".split(/(?:)/, -1).length || 2 != "ab".split(/(?:ab)*/).length || 4 != ".".split(/(.?)(.?)/).length || ".".split(/()()/).length > 1 || "".split(/.?/).length ? function (r, t) {var n = String(i(this)),u = void 0 === t ? 4294967295 : t >>> 0;if (0 === u) return [];if (void 0 === r) return [n];if (!o(r)) return e.call(n, r, u);for (var s, a, c, l = [], f = (r.ignoreCase ? "i" : "") + (r.multiline ? "m" : "") + (r.unicode ? "u" : "") + (r.sticky ? "y" : ""), d = 0, m = new RegExp(r.source, f + "g"); (s = p.call(m, n)) && !((a = m.lastIndex) > d && (l.push(n.slice(d, s.index)), s.length > 1 && s.index < n.length && y.apply(l, s.slice(1)), c = s[0].length, d = a, l.length >= u));) {m.lastIndex === s.index && m.lastIndex++;}return d === n.length ? !c && m.test("") || l.push("") : l.push(n.slice(d)), l.length > u ? l.slice(0, u) : l;} : "0".split(void 0, 0).length ? function (r, t) {return void 0 === r && 0 === t ? [] : e.call(this, r, t);} : e, [function (e, t) {var o = i(this),u = null == e ? void 0 : e[r];return void 0 !== u ? u.call(e, o, t) : n.call(String(o), e, t);}, function (r, o) {var i = t(n, r, this, o, n !== e);if (i.done) return i.value;var p = u(r),f = String(this),y = s(p, RegExp),g = p.unicode,h = (p.ignoreCase ? "i" : "") + (p.multiline ? "m" : "") + (p.unicode ? "u" : "") + (m ? "y" : "g"),b = new y(m ? p : "^(?:" + p.source + ")", h),v = void 0 === o ? 4294967295 : o >>> 0;if (0 === v) return [];if (0 === f.length) return null === l(b, f) ? [f] : [];for (var E = 0, k = 0, x = []; k < f.length;) {b.lastIndex = m ? k : 0;var _,w = l(b, m ? f : f.slice(k));if (null === w || (_ = d(c(b.lastIndex + (m ? 0 : k)), f.length)) === E) k = a(f, k, g);else {if (x.push(f.slice(E, k)), x.length === v) return x;for (var S = 1; S <= w.length - 1; S++) {if (x.push(w[S]), x.length === v) return x;}k = E = _;}}return x.push(f.slice(E)), x;}];}, !m);}, function (r, e, t) {var n = t(5),o = t(12),u = t(1)("match");r.exports = function (r) {var e;return n(r) && (void 0 !== (e = r[u]) ? !!e : "RegExp" == o(r));};}, function (r, e, t) {"use strict";var n = t(4),o = t(0),u = t(18),i = t(23),s = t(8),a = t(43),c = t(59),l = t(2),p = t(6),f = t(48),y = t(5),d = t(3),m = t(15),g = t(10),h = t(27),b = t(21),v = t(49),E = t(47),k = t(41),x = t(118),_ = t(57),w = t(26),S = t(7),P = t(51),O = t(9),j = t(11),A = t(39),R = t(28),I = t(29),T = t(40),N = t(1),L = t(79),C = t(80),U = t(30),D = t(22),F = t(81).forEach,z = R("hidden"),B = N("toPrimitive"),M = D.set,q = D.getterFor("Symbol"),J = Object.prototype,_G = o.Symbol,H = u("JSON", "stringify"),$ = w.f,W = S.f,V = x.f,Q = P.f,Y = A("symbols"),K = A("op-symbols"),X = A("string-to-symbol-registry"),Z = A("symbol-to-string-registry"),rr = A("wks"),er = o.QObject,tr = !er || !er.prototype || !er.prototype.findChild,nr = s && l(function () {return 7 != v(W({}, "a", { get: function get() {return W(this, "a", { value: 7 }).a;} })).a;}) ? function (r, e, t) {var n = $(J, e);n && delete J[e], W(r, e, t), n && r !== J && W(J, e, n);} : W,or = function or(r, e) {var t = Y[r] = v(_G.prototype);return M(t, { type: "Symbol", tag: r, description: e }), s || (t.description = e), t;},ur = c ? function (r) {return "symbol" == typeof r;} : function (r) {return Object(r) instanceof _G;},ir = function ir(r, e, t) {r === J && ir(K, e, t), d(r);var n = h(e, !0);return d(t), p(Y, n) ? (t.enumerable ? (p(r, z) && r[z][n] && (r[z][n] = !1), t = v(t, { enumerable: b(0, !1) })) : (p(r, z) || W(r, z, b(1, {})), r[z][n] = !0), nr(r, n, t)) : W(r, n, t);},sr = function sr(r, e) {d(r);var t = g(e),n = E(t).concat(pr(t));return F(n, function (e) {s && !ar.call(t, e) || ir(r, e, t[e]);}), r;},ar = function ar(r) {var e = h(r, !0),t = Q.call(this, e);return !(this === J && p(Y, e) && !p(K, e)) && (!(t || !p(this, e) || !p(Y, e) || p(this, z) && this[z][e]) || t);},cr = function cr(r, e) {var t = g(r),n = h(e, !0);if (t !== J || !p(Y, n) || p(K, n)) {var o = $(t, n);return !o || !p(Y, n) || p(t, z) && t[z][n] || (o.enumerable = !0), o;}},lr = function lr(r) {var e = V(g(r)),t = [];return F(e, function (r) {p(Y, r) || p(I, r) || t.push(r);}), t;},pr = function pr(r) {var e = r === J,t = V(e ? K : g(r)),n = [];return F(t, function (r) {!p(Y, r) || e && !p(J, r) || n.push(Y[r]);}), n;};(a || (j((_G = function G() {if (this instanceof _G) throw TypeError("Symbol is not a constructor");var r = arguments.length && void 0 !== arguments[0] ? String(arguments[0]) : void 0,e = T(r),t = function t(r) {this === J && t.call(K, r), p(this, z) && p(this[z], e) && (this[z][e] = !1), nr(this, e, b(1, r));};return s && tr && nr(J, e, { configurable: !0, set: t }), or(e, r);}).prototype, "toString", function () {return q(this).tag;}), j(_G, "withoutSetter", function (r) {return or(T(r), r);}), P.f = ar, S.f = ir, w.f = cr, k.f = x.f = lr, _.f = pr, L.f = function (r) {return or(N(r), r);}, s && (W(_G.prototype, "description", { configurable: !0, get: function get() {return q(this).description;} }), i || j(J, "propertyIsEnumerable", ar, { unsafe: !0 }))), n({ global: !0, wrap: !0, forced: !a, sham: !a }, { Symbol: _G }), F(E(rr), function (r) {C(r);}), n({ target: "Symbol", stat: !0, forced: !a }, { for: function _for(r) {var e = String(r);if (p(X, e)) return X[e];var t = _G(e);return X[e] = t, Z[t] = e, t;}, keyFor: function keyFor(r) {if (!ur(r)) throw TypeError(r + " is not a symbol");if (p(Z, r)) return Z[r];}, useSetter: function useSetter() {tr = !0;}, useSimple: function useSimple() {tr = !1;} }), n({ target: "Object", stat: !0, forced: !a, sham: !s }, { create: function create(r, e) {return void 0 === e ? v(r) : sr(v(r), e);}, defineProperty: ir, defineProperties: sr, getOwnPropertyDescriptor: cr }), n({ target: "Object", stat: !0, forced: !a }, { getOwnPropertyNames: lr, getOwnPropertySymbols: pr }), n({ target: "Object", stat: !0, forced: l(function () {_.f(1);}) }, { getOwnPropertySymbols: function getOwnPropertySymbols(r) {return _.f(m(r));} }), H) && n({ target: "JSON", stat: !0, forced: !a || l(function () {var r = _G();return "[null]" != H([r]) || "{}" != H({ a: r }) || "{}" != H(Object(r));}) }, { stringify: function stringify(r, e, t) {for (var n, o = [r], u = 1; arguments.length > u;) {o.push(arguments[u++]);}if (n = e, (y(e) || void 0 !== r) && !ur(r)) return f(e) || (e = function e(r, _e) {if ("function" == typeof n && (_e = n.call(this, r, _e)), !ur(_e)) return _e;}), o[1] = e, H.apply(null, o);} });_G.prototype[B] || O(_G.prototype, B, _G.prototype.valueOf), U(_G, "Symbol"), I[z] = !0;}, function (r, e, t) {var n = t(8),o = t(7),u = t(3),i = t(47);r.exports = n ? Object.defineProperties : function (r, e) {u(r);for (var t, n = i(e), s = n.length, a = 0; s > a;) {o.f(r, t = n[a++], e[t]);}return r;};}, function (r, e, t) {var n = t(10),o = t(41).f,u = {}.toString,i = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];r.exports.f = function (r) {return i && "[object Window]" == u.call(r) ? function (r) {try {return o(r);} catch (r) {return i.slice();}}(r) : o(n(r));};}, function (r, e, t) {var n = t(5),o = t(48),u = t(1)("species");r.exports = function (r, e) {var t;return o(r) && ("function" != typeof (t = r.constructor) || t !== Array && !o(t.prototype) ? n(t) && null === (t = t[u]) && (t = void 0) : t = void 0), new (void 0 === t ? Array : t)(0 === e ? 0 : e);};}, function (r, e, t) {"use strict";var n = t(4),o = t(8),u = t(0),i = t(6),s = t(5),a = t(7).f,c = t(53),l = u.Symbol;if (o && "function" == typeof l && (!("description" in l.prototype) || void 0 !== l().description)) {var p = {},f = function f() {var r = arguments.length < 1 || void 0 === arguments[0] ? void 0 : String(arguments[0]),e = this instanceof f ? new l(r) : void 0 === r ? l() : l(r);return "" === r && (p[e] = !0), e;};c(f, l);var y = f.prototype = l.prototype;y.constructor = f;var d = y.toString,m = "Symbol(test)" == String(l("test")),g = /^Symbol\((.*)\)[^)]+$/;a(y, "description", { configurable: !0, get: function get() {var r = s(this) ? this.valueOf() : this,e = d.call(r);if (i(p, r)) return "";var t = m ? e.slice(7, -1) : e.replace(g, "$1");return "" === t ? void 0 : t;} }), n({ global: !0, forced: !0 }, { Symbol: f });}}, function (r, e, t) {t(80)("iterator");}, function (r, e, t) {"use strict";var n = t(74).charAt,o = t(22),u = t(82),i = o.set,s = o.getterFor("String Iterator");u(String, "String", function (r) {i(this, { type: "String Iterator", string: String(r), index: 0 });}, function () {var r,e = s(this),t = e.string,o = e.index;return o >= t.length ? { value: void 0, done: !0 } : (r = n(t, o), e.index += r.length, { value: r, done: !1 });});}, function (r, e, t) {"use strict";var n = t(83).IteratorPrototype,o = t(49),u = t(21),i = t(30),s = t(25),a = function a() {return this;};r.exports = function (r, e, t) {var c = e + " Iterator";return r.prototype = o(n, { next: u(1, t) }), i(r, c, !1, !0), s[c] = a, r;};}, function (r, e, t) {var n = t(2);r.exports = !n(function () {function r() {}return r.prototype.constructor = null, Object.getPrototypeOf(new r()) !== r.prototype;});}, function (r, e, t) {var n = t(3),o = t(126);r.exports = Object.setPrototypeOf || ("__proto__" in {} ? function () {var r,e = !1,t = {};try {(r = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set).call(t, []), e = t instanceof Array;} catch (r) {}return function (t, u) {return n(t), o(u), e ? r.call(t, u) : t.__proto__ = u, t;};}() : void 0);}, function (r, e, t) {var n = t(5);r.exports = function (r) {if (!n(r) && null !== r) throw TypeError("Can't set " + String(r) + " as a prototype");return r;};}, function (r, e, t) {var n = t(1),o = t(49),u = t(7),i = n("unscopables"),s = Array.prototype;null == s[i] && u.f(s, i, { configurable: !0, value: o(null) }), r.exports = function (r) {s[i][r] = !0;};}, function (r, e, t) {var n = t(0),o = t(129),u = t(85),i = t(9),s = t(1),a = s("iterator"),c = s("toStringTag"),l = u.values;for (var p in o) {var f = n[p],y = f && f.prototype;if (y) {if (y[a] !== l) try {i(y, a, l);} catch (r) {y[a] = l;}if (y[c] || i(y, c, p), o[p]) for (var d in u) {if (y[d] !== u[d]) try {i(y, d, u[d]);} catch (r) {y[d] = u[d];}}}}}, function (r, e) {r.exports = { CSSRuleList: 0, CSSStyleDeclaration: 0, CSSValueList: 0, ClientRectList: 0, DOMRectList: 0, DOMStringList: 0, DOMTokenList: 1, DataTransferItemList: 0, FileList: 0, HTMLAllCollection: 0, HTMLCollection: 0, HTMLFormElement: 0, HTMLSelectElement: 0, MediaList: 0, MimeTypeArray: 0, NamedNodeMap: 0, NodeList: 1, PaintRequestList: 0, Plugin: 0, PluginArray: 0, SVGLengthList: 0, SVGNumberList: 0, SVGPathSegList: 0, SVGPointList: 0, SVGStringList: 0, SVGTransformList: 0, SourceBufferList: 0, StyleSheetList: 0, TextTrackCueList: 0, TextTrackList: 0, TouchList: 0 };}, function (r, e, t) {"use strict";var n = t(4),o = t(5),u = t(48),i = t(56),s = t(13),a = t(10),c = t(86),l = t(1),p = t(87)("slice"),f = l("species"),y = [].slice,d = Math.max;n({ target: "Array", proto: !0, forced: !p }, { slice: function slice(r, e) {var t,n,l,p = a(this),m = s(p.length),g = i(r, m),h = i(void 0 === e ? m : e, m);if (u(p) && ("function" != typeof (t = p.constructor) || t !== Array && !u(t.prototype) ? o(t) && null === (t = t[f]) && (t = void 0) : t = void 0, t === Array || void 0 === t)) return y.call(p, g, h);for (n = new (void 0 === t ? Array : t)(d(h - g, 0)), l = 0; g < h; g++, l++) {g in p && c(n, l, p[g]);}return n.length = l, n;} });}, function (r, e, t) {var n = t(4),o = t(132);n({ target: "Array", stat: !0, forced: !t(64)(function (r) {Array.from(r);}) }, { from: o });}, function (r, e, t) {"use strict";var n = t(32),o = t(15),u = t(133),i = t(60),s = t(13),a = t(86),c = t(61);r.exports = function (r) {var e,t,l,p,f,y,d = o(r),m = "function" == typeof this ? this : Array,g = arguments.length,h = g > 1 ? arguments[1] : void 0,b = void 0 !== h,v = c(d),E = 0;if (b && (h = n(h, g > 2 ? arguments[2] : void 0, 2)), null == v || m == Array && i(v)) for (t = new m(e = s(d.length)); e > E; E++) {y = b ? h(d[E], E) : d[E], a(t, E, y);} else for (f = (p = v.call(d)).next, t = new m(); !(l = f.call(p)).done; E++) {y = b ? u(p, h, [l.value, E], !0) : l.value, a(t, E, y);}return t.length = E, t;};}, function (r, e, t) {var n = t(3),o = t(63);r.exports = function (r, e, t, u) {try {return u ? e(n(t)[0], t[1]) : e(t);} catch (e) {throw o(r), e;}};}, function (r, e, t) {"use strict";var n = t(89),o = t(50),u = Object.prototype.hasOwnProperty,i = { brackets: function brackets(r) {return r + "[]";}, comma: "comma", indices: function indices(r, e) {return r + "[" + e + "]";}, repeat: function repeat(r) {return r;} },s = Array.isArray,a = Array.prototype.push,c = function c(r, e) {a.apply(r, s(e) ? e : [e]);},l = Date.prototype.toISOString,p = o.default,f = { addQueryPrefix: !1, allowDots: !1, charset: "utf-8", charsetSentinel: !1, delimiter: "&", encode: !0, encoder: n.encode, encodeValuesOnly: !1, format: p, formatter: o.formatters[p], indices: !1, serializeDate: function serializeDate(r) {return l.call(r);}, skipNulls: !1, strictNullHandling: !1 },y = function r(e, t, o, u, i, a, l, p, y, d, m, g, h, b) {var v,E = e;if ("function" == typeof l ? E = l(t, E) : E instanceof Date ? E = d(E) : "comma" === o && s(E) && (E = n.maybeMap(E, function (r) {return r instanceof Date ? d(r) : r;})), null === E) {if (u) return a && !h ? a(t, f.encoder, b, "key", m) : t;E = "";}if ("string" == typeof (v = E) || "number" == typeof v || "boolean" == typeof v || "symbol" == typeof v || "bigint" == typeof v || n.isBuffer(E)) return a ? [g(h ? t : a(t, f.encoder, b, "key", m)) + "=" + g(a(E, f.encoder, b, "value", m))] : [g(t) + "=" + g(String(E))];var k,x = [];if (void 0 === E) return x;if ("comma" === o && s(E)) k = [{ value: E.length > 0 ? E.join(",") || null : void 0 }];else if (s(l)) k = l;else {var _ = Object.keys(E);k = p ? _.sort(p) : _;}for (var w = 0; w < k.length; ++w) {var S = k[w],P = "object" == typeof S && void 0 !== S.value ? S.value : E[S];if (!i || null !== P) {var O = s(E) ? "function" == typeof o ? o(t, S) : t : t + (y ? "." + S : "[" + S + "]");c(x, r(P, O, o, u, i, a, l, p, y, d, m, g, h, b));}}return x;};r.exports = function (r, e) {var t,n = r,a = function (r) {if (!r) return f;if (null !== r.encoder && void 0 !== r.encoder && "function" != typeof r.encoder) throw new TypeError("Encoder has to be a function.");var e = r.charset || f.charset;if (void 0 !== r.charset && "utf-8" !== r.charset && "iso-8859-1" !== r.charset) throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");var t = o.default;if (void 0 !== r.format) {if (!u.call(o.formatters, r.format)) throw new TypeError("Unknown format option provided.");t = r.format;}var n = o.formatters[t],i = f.filter;return ("function" == typeof r.filter || s(r.filter)) && (i = r.filter), { addQueryPrefix: "boolean" == typeof r.addQueryPrefix ? r.addQueryPrefix : f.addQueryPrefix, allowDots: void 0 === r.allowDots ? f.allowDots : !!r.allowDots, charset: e, charsetSentinel: "boolean" == typeof r.charsetSentinel ? r.charsetSentinel : f.charsetSentinel, delimiter: void 0 === r.delimiter ? f.delimiter : r.delimiter, encode: "boolean" == typeof r.encode ? r.encode : f.encode, encoder: "function" == typeof r.encoder ? r.encoder : f.encoder, encodeValuesOnly: "boolean" == typeof r.encodeValuesOnly ? r.encodeValuesOnly : f.encodeValuesOnly, filter: i, format: t, formatter: n, serializeDate: "function" == typeof r.serializeDate ? r.serializeDate : f.serializeDate, skipNulls: "boolean" == typeof r.skipNulls ? r.skipNulls : f.skipNulls, sort: "function" == typeof r.sort ? r.sort : null, strictNullHandling: "boolean" == typeof r.strictNullHandling ? r.strictNullHandling : f.strictNullHandling };}(e);"function" == typeof a.filter ? n = (0, a.filter)("", n) : s(a.filter) && (t = a.filter);var l,p = [];if ("object" != typeof n || null === n) return "";l = e && e.arrayFormat in i ? e.arrayFormat : e && "indices" in e ? e.indices ? "indices" : "repeat" : "indices";var d = i[l];t || (t = Object.keys(n)), a.sort && t.sort(a.sort);for (var m = 0; m < t.length; ++m) {var g = t[m];a.skipNulls && null === n[g] || c(p, y(n[g], g, d, a.strictNullHandling, a.skipNulls, a.encode ? a.encoder : null, a.filter, a.sort, a.allowDots, a.serializeDate, a.format, a.formatter, a.encodeValuesOnly, a.charset));}var h = p.join(a.delimiter),b = !0 === a.addQueryPrefix ? "?" : "";return a.charsetSentinel && ("iso-8859-1" === a.charset ? b += "utf8=%26%2310003%3B&" : b += "utf8=%E2%9C%93&"), h.length > 0 ? b + h : "";};}, function (r, e, t) {"use strict";var n = t(89),o = Object.prototype.hasOwnProperty,u = Array.isArray,i = { allowDots: !1, allowPrototypes: !1, arrayLimit: 20, charset: "utf-8", charsetSentinel: !1, comma: !1, decoder: n.decode, delimiter: "&", depth: 5, ignoreQueryPrefix: !1, interpretNumericEntities: !1, parameterLimit: 1e3, parseArrays: !0, plainObjects: !1, strictNullHandling: !1 },s = function s(r) {return r.replace(/&#(\d+);/g, function (r, e) {return String.fromCharCode(parseInt(e, 10));});},a = function a(r, e) {return r && "string" == typeof r && e.comma && r.indexOf(",") > -1 ? r.split(",") : r;},c = function c(r, e, t, n) {if (r) {var u = t.allowDots ? r.replace(/\.([^.[]+)/g, "[$1]") : r,i = /(\[[^[\]]*])/g,s = t.depth > 0 && /(\[[^[\]]*])/.exec(u),c = s ? u.slice(0, s.index) : u,l = [];if (c) {if (!t.plainObjects && o.call(Object.prototype, c) && !t.allowPrototypes) return;l.push(c);}for (var p = 0; t.depth > 0 && null !== (s = i.exec(u)) && p < t.depth;) {if (p += 1, !t.plainObjects && o.call(Object.prototype, s[1].slice(1, -1)) && !t.allowPrototypes) return;l.push(s[1]);}return s && l.push("[" + u.slice(s.index) + "]"), function (r, e, t, n) {for (var o = n ? e : a(e, t), u = r.length - 1; u >= 0; --u) {var i,s = r[u];if ("[]" === s && t.parseArrays) i = [].concat(o);else {i = t.plainObjects ? Object.create(null) : {};var c = "[" === s.charAt(0) && "]" === s.charAt(s.length - 1) ? s.slice(1, -1) : s,l = parseInt(c, 10);t.parseArrays || "" !== c ? !isNaN(l) && s !== c && String(l) === c && l >= 0 && t.parseArrays && l <= t.arrayLimit ? (i = [])[l] = o : i[c] = o : i = { 0: o };}o = i;}return o;}(l, e, t, n);}};r.exports = function (r, e) {var t = function (r) {if (!r) return i;if (null !== r.decoder && void 0 !== r.decoder && "function" != typeof r.decoder) throw new TypeError("Decoder has to be a function.");if (void 0 !== r.charset && "utf-8" !== r.charset && "iso-8859-1" !== r.charset) throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");var e = void 0 === r.charset ? i.charset : r.charset;return { allowDots: void 0 === r.allowDots ? i.allowDots : !!r.allowDots, allowPrototypes: "boolean" == typeof r.allowPrototypes ? r.allowPrototypes : i.allowPrototypes, arrayLimit: "number" == typeof r.arrayLimit ? r.arrayLimit : i.arrayLimit, charset: e, charsetSentinel: "boolean" == typeof r.charsetSentinel ? r.charsetSentinel : i.charsetSentinel, comma: "boolean" == typeof r.comma ? r.comma : i.comma, decoder: "function" == typeof r.decoder ? r.decoder : i.decoder, delimiter: "string" == typeof r.delimiter || n.isRegExp(r.delimiter) ? r.delimiter : i.delimiter, depth: "number" == typeof r.depth || !1 === r.depth ? +r.depth : i.depth, ignoreQueryPrefix: !0 === r.ignoreQueryPrefix, interpretNumericEntities: "boolean" == typeof r.interpretNumericEntities ? r.interpretNumericEntities : i.interpretNumericEntities, parameterLimit: "number" == typeof r.parameterLimit ? r.parameterLimit : i.parameterLimit, parseArrays: !1 !== r.parseArrays, plainObjects: "boolean" == typeof r.plainObjects ? r.plainObjects : i.plainObjects, strictNullHandling: "boolean" == typeof r.strictNullHandling ? r.strictNullHandling : i.strictNullHandling };}(e);if ("" === r || null == r) return t.plainObjects ? Object.create(null) : {};for (var l = "string" == typeof r ? function (r, e) {var t,c = {},l = e.ignoreQueryPrefix ? r.replace(/^\?/, "") : r,p = e.parameterLimit === 1 / 0 ? void 0 : e.parameterLimit,f = l.split(e.delimiter, p),y = -1,d = e.charset;if (e.charsetSentinel) for (t = 0; t < f.length; ++t) {0 === f[t].indexOf("utf8=") && ("utf8=%E2%9C%93" === f[t] ? d = "utf-8" : "utf8=%26%2310003%3B" === f[t] && (d = "iso-8859-1"), y = t, t = f.length);}for (t = 0; t < f.length; ++t) {if (t !== y) {var m,g,h = f[t],b = h.indexOf("]="),v = -1 === b ? h.indexOf("=") : b + 1;-1 === v ? (m = e.decoder(h, i.decoder, d, "key"), g = e.strictNullHandling ? null : "") : (m = e.decoder(h.slice(0, v), i.decoder, d, "key"), g = n.maybeMap(a(h.slice(v + 1), e), function (r) {return e.decoder(r, i.decoder, d, "value");})), g && e.interpretNumericEntities && "iso-8859-1" === d && (g = s(g)), h.indexOf("[]=") > -1 && (g = u(g) ? [g] : g), o.call(c, m) ? c[m] = n.combine(c[m], g) : c[m] = g;}}return c;}(r, t) : r, p = t.plainObjects ? Object.create(null) : {}, f = Object.keys(l), y = 0; y < f.length; ++y) {var d = f[y],m = c(d, l[d], t, "string" == typeof r);p = n.merge(p, m, t);}return n.compact(p);};}, function (r, e, t) {"use strict";var n = t(4),o = t(24),u = t(15),i = t(2),s = t(77),a = [],c = a.sort,l = i(function () {a.sort(void 0);}),p = i(function () {a.sort(null);}),f = s("sort");n({ target: "Array", proto: !0, forced: l || !p || !f }, { sort: function sort(r) {return void 0 === r ? c.call(u(this)) : c.call(u(this), o(r));} });}, function (r, e, t) {"use strict";var n = t(4),o = t(81).map;n({ target: "Array", proto: !0, forced: !t(87)("map") }, { map: function map(r) {return o(this, r, arguments.length > 1 ? arguments[1] : void 0);} });}, function (r, e, t) {"use strict";var n = t(11),o = t(3),u = t(2),i = t(72),s = RegExp.prototype,a = s.toString,c = u(function () {return "/a/b" != a.call({ source: "a", flags: "b" });}),l = "toString" != a.name;(c || l) && n(RegExp.prototype, "toString", function () {var r = o(this),e = String(r.source),t = r.flags;return "/" + e + "/" + String(void 0 === t && r instanceof RegExp && !("flags" in s) ? i.call(r) : t);}, { unsafe: !0 });}, function (r, e) {var t, n;t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", n = { rotl: function rotl(r, e) {return r << e | r >>> 32 - e;}, rotr: function rotr(r, e) {return r << 32 - e | r >>> e;}, endian: function endian(r) {if (r.constructor == Number) return 16711935 & n.rotl(r, 8) | 4278255360 & n.rotl(r, 24);for (var e = 0; e < r.length; e++) {r[e] = n.endian(r[e]);}return r;}, randomBytes: function randomBytes(r) {for (var e = []; r > 0; r--) {e.push(Math.floor(256 * Math.random()));}return e;}, bytesToWords: function bytesToWords(r) {for (var e = [], t = 0, n = 0; t < r.length; t++, n += 8) {e[n >>> 5] |= r[t] << 24 - n % 32;}return e;}, wordsToBytes: function wordsToBytes(r) {for (var e = [], t = 0; t < 32 * r.length; t += 8) {e.push(r[t >>> 5] >>> 24 - t % 32 & 255);}return e;}, bytesToHex: function bytesToHex(r) {for (var e = [], t = 0; t < r.length; t++) {e.push((r[t] >>> 4).toString(16)), e.push((15 & r[t]).toString(16));}return e.join("");}, hexToBytes: function hexToBytes(r) {for (var e = [], t = 0; t < r.length; t += 2) {e.push(parseInt(r.substr(t, 2), 16));}return e;}, bytesToBase64: function bytesToBase64(r) {for (var e = [], n = 0; n < r.length; n += 3) {for (var o = r[n] << 16 | r[n + 1] << 8 | r[n + 2], u = 0; u < 4; u++) {8 * n + 6 * u <= 8 * r.length ? e.push(t.charAt(o >>> 6 * (3 - u) & 63)) : e.push("=");}}return e.join("");}, base64ToBytes: function base64ToBytes(r) {r = r.replace(/[^A-Z0-9+\/]/gi, "");for (var e = [], n = 0, o = 0; n < r.length; o = ++n % 4) {0 != o && e.push((t.indexOf(r.charAt(n - 1)) & Math.pow(2, -2 * o + 8) - 1) << 2 * o | t.indexOf(r.charAt(n)) >>> 6 - 2 * o);}return e;} }, r.exports = n;}, function (r, e) {function t(r) {return !!r.constructor && "function" == typeof r.constructor.isBuffer && r.constructor.isBuffer(r);}
    /*!
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Determine if an object is a Buffer
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @author   Feross Aboukhadijeh <https://feross.org>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @license  MIT
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */
    r.exports = function (r) {return null != r && (t(r) || function (r) {return "function" == typeof r.readFloatLE && "function" == typeof r.slice && t(r.slice(0, 0));}(r) || !!r._isBuffer);};}, function (r, e, t) {"use strict";t.r(e), t.d(e, "WxPay", function () {return j;}), t.d(e, "AliPay", function () {return z;}), t.d(e, "Finance", function () {return Z;}), t.d(e, "Merge", function () {return or;}), t.d(e, "Order", function () {return cr;});t(20), t(16), t(14), t(108), t(111), t(71), t(114), t(76), t(78);function n(r) {return null == r || "" === r || !(r instanceof Function) && (r instanceof Array ? 0 == r.length : !(r instanceof Date) && r instanceof Object && (Object.keys ? 0 == Object.keys(r).length : "{}" == JSON.stringify(r)));}var o = { doApiResult: function doApiResult(r) {return n(r) ? (console.error("yungouos pay sdk", "请求API无响应"), null) : 0 != r.code ? (console.error("yungouos pay sdk", r), null) : r;}, formatMoney: function formatMoney(r, e) {e = e > 0 && e <= 20 ? e : 2;for (var t = (r = parseFloat((r + "").replace(/[^\d\.-]/g, "")).toFixed(e) + "").split(".")[0].split("").reverse(), n = r.split(".")[1], o = "", u = 0; u < t.length; u++) {o += t[u] + ((u + 1) % 3 == 0 && u + 1 != t.length ? "," : "");}return o.split("").reverse().join("") + "." + n;}, isEmpty: n },u = { codePay: "https://api.pay.yungouos.com/api/pay/wxpay/codePay", nativePay: "https://api.pay.yungouos.com/api/pay/wxpay/nativePay", jsapiPay: "https://api.pay.yungouos.com/api/pay/wxpay/jsapi", minAppPay: "https://api.pay.yungouos.com/api/pay/wxpay/minAppPay", cashierPay: "https://api.pay.yungouos.com/api/pay/wxpay/cashierPay", facePay: "https://api.pay.yungouos.com/api/pay/wxpay/facePay", wapPay: "https://api.pay.yungouos.com/api/pay/wxpay/wapPay", appPay: "https://api.pay.yungouos.com/api/pay/wxpay/appPay", refundOrder: "https://api.pay.yungouos.com/api/pay/wxpay/refundOrder", getRefundResult: "https://api.pay.yungouos.com/api/pay/wxpay/getRefundResult", closeOrder: "https://api.pay.yungouos.com/api/pay/wxpay/closeOrder", reverseOrder: "https://api.pay.yungouos.com/api/pay/wxpay/reverseOrder", getWxBillInfo: "https://api.pay.yungouos.com/api/pay/wxpay/getWxBillInfo", downloadBill: "https://api.pay.yungouos.com/api/pay/wxpay/downloadBill", getCodePayResult: "https://api.pay.yungouos.com/api/pay/wxpay/getCodePayResult" },i = (t(116), t(120), t(121), t(122), t(85), t(128), t(130), t(88), t(131), t(91)),s = t.n(i);function a(r, e) {return function (r) {if (Array.isArray(r)) return r;}(r) || function (r, e) {if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(r))) return;var t = [],n = !0,o = !1,u = void 0;try {for (var i, s = r[Symbol.iterator](); !(n = (i = s.next()).done) && (t.push(i.value), !e || t.length !== e); n = !0) {;}} catch (r) {o = !0, u = r;} finally {try {n || null == s.return || s.return();} finally {if (o) throw u;}}return t;}(r, e) || function (r, e) {if (!r) return;if ("string" == typeof r) return c(r, e);var t = Object.prototype.toString.call(r).slice(8, -1);"Object" === t && r.constructor && (t = r.constructor.name);if ("Map" === t || "Set" === t) return Array.from(r);if ("Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)) return c(r, e);}(r, e) || function () {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}();}function c(r, e) {(null == e || e > r.length) && (e = r.length);for (var t = 0, n = new Array(e); t < e; t++) {n[t] = r[t];}return n;}function l(r, e, t) {return new Promise(function (n, u) {var i = null;"GET" == r && (i = uni.request({ url: e, method: "GET", data: t, header: { "content-type": "application/x-www-form-urlencoded" } })), "POST" == r && (i = uni.request({ url: e, method: "POST", data: t, header: { "content-type": "application/x-www-form-urlencoded" } })), i.then(function (r) {var e = a(r, 2),t = e[0],i = e[1];o.isEmpty(t) || u("yungouos sdk error", t), 200 != i.statusCode && u("yungouos sdk error", i), n(i.data);}).catch(function (r) {u("yungouos sdk error", r);});});}var p = { get: function get(r, e) {return l("GET", r, e);}, post: function post(r, e) {return o.isEmpty(e) || (e = s.a.stringify(e)), l("POST", r, e);} },f = (t(136), t(137), t(138), t(92)),y = t.n(f);var d = { paySign: function paySign(r, e) {var t = Object.keys(r);t.sort();var n = [];t.map(function (e) {n.push(e + "=" + r[e]);}), n.push("key=" + e);var o = n.join("&");return y()(o).toString().toUpperCase();} };function m(r, e, t, n, o, u, i) {try {var s = r[u](i),a = s.value;} catch (r) {return void t(r);}s.done ? e(a) : Promise.resolve(a).then(n, o);}function g(r) {return function () {var e = this,t = arguments;return new Promise(function (n, o) {var u = r.apply(e, t);function i(r) {m(u, n, o, i, s, "next", r);}function s(r) {m(u, n, o, i, s, "throw", r);}i(void 0);});};}function h() {return (h = g(_regeneratorRuntime.mark(function r(e, t, n, i, s, a, c, l, f, y, m, g, h) {var b, v, E, k, x;return _regeneratorRuntime.wrap(function (r) {for (;;) {switch (r.prev = r.next) {case 0:if (!o.isEmpty(e)) {r.next = 3;break;}return console.error("yungouos sdk error", "商户订单号不能为空"), r.abrupt("return", null);case 3:if (!o.isEmpty(t)) {r.next = 6;break;}return console.error("yungouos sdk error", "支付金额不能为空"), r.abrupt("return", null);case 6:if (!o.isEmpty(n)) {r.next = 9;break;}return console.error("yungouos sdk error", "商户号不能为空"), r.abrupt("return", null);case 9:if (!o.isEmpty(i)) {r.next = 12;break;}return console.error("yungouos sdk error", "商品名称不能为空"), r.abrupt("return", null);case 12:if (!o.isEmpty(s)) {r.next = 15;break;}return console.error("yungouos sdk error", "支付授权码不能为空"), r.abrupt("return", null);case 15:if (!o.isEmpty(h)) {r.next = 18;break;}return console.error("yungouos sdk error", "支付密钥不能为空"), r.abrupt("return", null);case 18:if (b = { out_trade_no: e, total_fee: t, mch_id: n, body: i, auth_code: s }, v = d.paySign(b, h), b.sign = v, o.isEmpty(a) || (b.attach = a), o.isEmpty(c) || (b.receipt = c), o.isEmpty(l) || (b.notify_url = l), o.isEmpty(f) || (b.auto = f), o.isEmpty(y) || (b.auto_node = y), o.isEmpty(m) || (b.config_no = m), o.isEmpty(g)) {r.next = 32;break;}if (o.isObject(g)) {r.next = 31;break;}return console.error("yungouos sdk error", "biz_params不是合法的json"), r.abrupt("return", null);case 31:b.biz_params = JSON.stringify(g);case 32:return r.next = 34, p.post(u.codePay, b);case 34:if (E = r.sent, k = o.doApiResult(E), !o.isEmpty(k)) {r.next = 38;break;}return r.abrupt("return", null);case 38:if (x = k.data, !o.isEmpty(x)) {r.next = 42;break;}return console.error("yungouos sdk error", "API无返回结果"), r.abrupt("return", null);case 42:return r.abrupt("return", x);case 43:case "end":return r.stop();}}}, r);}))).apply(this, arguments);}function b() {return (b = g(_regeneratorRuntime.mark(function r(e, t, n, i, s, a, c, l, f, y, m, g) {var h, b, v, E, k;return _regeneratorRuntime.wrap(function (r) {for (;;) {switch (r.prev = r.next) {case 0:if (!o.isEmpty(e)) {r.next = 3;break;}return console.error("yungouos sdk error", "商户订单号不能为空"), r.abrupt("return", null);case 3:if (!o.isEmpty(t)) {r.next = 6;break;}return console.error("yungouos sdk error", "支付金额不能为空"), r.abrupt("return", null);case 6:if (!o.isEmpty(n)) {r.next = 9;break;}return console.error("yungouos sdk error", "商户号不能为空"), r.abrupt("return", null);case 9:if (!o.isEmpty(i)) {r.next = 12;break;}return console.error("yungouos sdk error", "商品名称不能为空"), r.abrupt("return", null);case 12:if (!o.isEmpty(g)) {r.next = 15;break;}return console.error("yungouos sdk error", "支付密钥不能为空"), r.abrupt("return", null);case 15:if (h = { out_trade_no: e, total_fee: t, mch_id: n, body: i }, b = d.paySign(h, g), h.sign = b, o.isEmpty(s) || (h.type = s), o.isEmpty(a) || (h.attach = a), o.isEmpty(c) || (h.notify_url = c), o.isEmpty(l) || (h.auto = l), o.isEmpty(f) || (h.auto_node = f), o.isEmpty(y) || (h.config_no = y), o.isEmpty(m)) {r.next = 29;break;}if (o.isObject(m)) {r.next = 28;break;}return console.error("yungouos sdk error", "biz_params不是合法的json"), r.abrupt("return", null);case 28:h.biz_params = JSON.stringify(m);case 29:return r.next = 31, p.post(u.nativePay, h);case 31:if (v = r.sent, E = o.doApiResult(v), !o.isEmpty(E)) {r.next = 35;break;}return r.abrupt("return", null);case 35:if (k = E.data, !o.isEmpty(k)) {r.next = 39;break;}return console.error("yungouos sdk error", "API无返回结果"), r.abrupt("return", null);case 39:return r.abrupt("return", k);case 40:case "end":return r.stop();}}}, r);}))).apply(this, arguments);}function v() {return (v = g(_regeneratorRuntime.mark(function r(e, t, n, i, s, a, c, l, f, y, m, g) {var h, b, v, E, k;return _regeneratorRuntime.wrap(function (r) {for (;;) {switch (r.prev = r.next) {case 0:if (!o.isEmpty(e)) {r.next = 3;break;}return console.error("yungouos sdk error", "商户订单号不能为空"), r.abrupt("return", null);case 3:if (!o.isEmpty(t)) {r.next = 6;break;}return console.error("yungouos sdk error", "支付金额不能为空"), r.abrupt("return", null);case 6:if (!o.isEmpty(n)) {r.next = 9;break;}return console.error("yungouos sdk error", "商户号不能为空"), r.abrupt("return", null);case 9:if (!o.isEmpty(i)) {r.next = 12;break;}return console.error("yungouos sdk error", "商品名称不能为空"), r.abrupt("return", null);case 12:if (!o.isEmpty(s)) {r.next = 15;break;}return console.error("yungouos sdk error", "openId不能为空"), r.abrupt("return", null);case 15:if (!o.isEmpty(g)) {r.next = 18;break;}return console.error("yungouos sdk error", "支付密钥不能为空"), r.abrupt("return", null);case 18:if (h = { out_trade_no: e, total_fee: t, mch_id: n, body: i, openId: s }, b = d.paySign(h, g), h.sign = b, o.isEmpty(a) || (h.attach = a), o.isEmpty(c) || (h.notify_url = c), o.isEmpty(l) || (h.auto = l), o.isEmpty(f) || (h.auto_node = f), o.isEmpty(y) || (h.config_no = y), o.isEmpty(m)) {r.next = 31;break;}if (o.isObject(m)) {r.next = 30;break;}return console.error("yungouos sdk error", "biz_params不是合法的json"), r.abrupt("return", null);case 30:h.biz_params = JSON.stringify(m);case 31:return r.next = 33, p.post(u.jsapiPay, h);case 33:if (v = r.sent, E = o.doApiResult(v), !o.isEmpty(E)) {r.next = 37;break;}return r.abrupt("return", null);case 37:if (k = E.data, !o.isEmpty(k)) {r.next = 41;break;}return console.error("yungouos sdk error", "API无返回结果"), r.abrupt("return", null);case 41:return r.abrupt("return", k);case 42:case "end":return r.stop();}}}, r);}))).apply(this, arguments);}function E() {return (E = g(_regeneratorRuntime.mark(function r(e, t, n, i, s, a, c, l, f, y, m, g) {var h, b, v, E, k;return _regeneratorRuntime.wrap(function (r) {for (;;) {switch (r.prev = r.next) {case 0:if (!o.isEmpty(e)) {r.next = 3;break;}return console.error("yungouos sdk error", "商户订单号不能为空"), r.abrupt("return", null);case 3:if (!o.isEmpty(t)) {r.next = 6;break;}return console.error("yungouos sdk error", "支付金额不能为空"), r.abrupt("return", null);case 6:if (!o.isEmpty(n)) {r.next = 9;break;}return console.error("yungouos sdk error", "商户号不能为空"), r.abrupt("return", null);case 9:if (!o.isEmpty(i)) {r.next = 12;break;}return console.error("yungouos sdk error", "商品名称不能为空"), r.abrupt("return", null);case 12:if (!o.isEmpty(g)) {r.next = 15;break;}return console.error("yungouos sdk error", "支付密钥不能为空"), r.abrupt("return", null);case 15:if (h = { out_trade_no: e, total_fee: t, mch_id: n, body: i }, b = d.paySign(h, g), h.sign = b, o.isEmpty(s) || (h.attach = s), o.isEmpty(a) || (h.notify_url = a), o.isEmpty(c) || (h.return_url = c), o.isEmpty(l) || (h.auto = l), o.isEmpty(f) || (h.auto_node = f), o.isEmpty(y) || (h.config_no = y), o.isEmpty(m)) {r.next = 29;break;}if (o.isObject(m)) {r.next = 28;break;}return console.error("yungouos sdk error", "biz_params不是合法的json"), r.abrupt("return", null);case 28:h.biz_params = JSON.stringify(m);case 29:return r.next = 31, p.post(u.cashierPay, h);case 31:if (v = r.sent, E = o.doApiResult(v), !o.isEmpty(E)) {r.next = 35;break;}return r.abrupt("return", null);case 35:if (k = E.data, !o.isEmpty(k)) {r.next = 39;break;}return console.error("yungouos sdk error", "API无返回结果"), r.abrupt("return", null);case 39:return r.abrupt("return", k);case 40:case "end":return r.stop();}}}, r);}))).apply(this, arguments);}function k() {return (k = g(_regeneratorRuntime.mark(function r(e, t, n, i, s, a, c, l, f, y, m, g) {var h, b, v, E, k;return _regeneratorRuntime.wrap(function (r) {for (;;) {switch (r.prev = r.next) {case 0:if (!o.isEmpty(e)) {r.next = 3;break;}return console.error("yungouos sdk error", "商户订单号不能为空"), r.abrupt("return", null);case 3:if (!o.isEmpty(t)) {r.next = 6;break;}return console.error("yungouos sdk error", "支付金额不能为空"), r.abrupt("return", null);case 6:if (!o.isEmpty(n)) {r.next = 9;break;}return console.error("yungouos sdk error", "商户号不能为空"), r.abrupt("return", null);case 9:if (!o.isEmpty(i)) {r.next = 12;break;}return console.error("yungouos sdk error", "商品名称不能为空"), r.abrupt("return", null);case 12:if (!o.isEmpty(s)) {r.next = 15;break;}return console.error("yungouos sdk error", "openId不能为空"), r.abrupt("return", null);case 15:if (!o.isEmpty(g)) {r.next = 18;break;}return console.error("yungouos sdk error", "支付密钥不能为空"), r.abrupt("return", null);case 18:if (h = { out_trade_no: e, total_fee: t, mch_id: n, body: i }, b = d.paySign(h, g), h.sign = b, h.openId = s, o.isEmpty(a) || (h.attach = a), o.isEmpty(c) || (h.notify_url = c), o.isEmpty(l) || (h.auto = l), o.isEmpty(f) || (h.auto_node = f), o.isEmpty(y) || (h.config_no = y), o.isEmpty(m)) {r.next = 32;break;}if (o.isObject(m)) {r.next = 31;break;}return console.error("yungouos sdk error", "biz_params不是合法的json"), r.abrupt("return", null);case 31:h.biz_params = JSON.stringify(m);case 32:return r.next = 34, p.post(u.minAppPay, h);case 34:if (v = r.sent, E = o.doApiResult(v), !o.isEmpty(E)) {r.next = 38;break;}return r.abrupt("return", null);case 38:if (k = E.data, !o.isEmpty(k)) {r.next = 42;break;}return console.error("yungouos sdk error", "API无返回结果"), r.abrupt("return", null);case 42:return r.abrupt("return", k);case 43:case "end":return r.stop();}}}, r);}))).apply(this, arguments);}function x() {return (x = g(_regeneratorRuntime.mark(function r(e, t, n, i, s, a, c, l, f, y, m, g, h) {var b, v, E, k, x;return _regeneratorRuntime.wrap(function (r) {for (;;) {switch (r.prev = r.next) {case 0:if (!o.isEmpty(e)) {r.next = 3;break;}return console.error("yungouos sdk error", "商户订单号不能为空"), r.abrupt("return", null);case 3:if (!o.isEmpty(t)) {r.next = 6;break;}return console.error("yungouos sdk error", "支付金额不能为空"), r.abrupt("return", null);case 6:if (!o.isEmpty(n)) {r.next = 9;break;}return console.error("yungouos sdk error", "商户号不能为空"), r.abrupt("return", null);case 9:if (!o.isEmpty(i)) {r.next = 12;break;}return console.error("yungouos sdk error", "商品名称不能为空"), r.abrupt("return", null);case 12:if (!o.isEmpty(s)) {r.next = 15;break;}return console.error("yungouos sdk error", "openId不能为空"), r.abrupt("return", null);case 15:if (!o.isEmpty(a)) {r.next = 18;break;}return console.error("yungouos sdk error", "人脸凭证不能为空"), r.abrupt("return", null);case 18:if (!o.isEmpty(h)) {r.next = 21;break;}return console.error("yungouos sdk error", "支付密钥不能为空"), r.abrupt("return", null);case 21:if (b = { out_trade_no: e, total_fee: t, mch_id: n, body: i, openId: s, face_code: a }, v = d.paySign(b, h), b.sign = v, o.isEmpty(c) || (b.attach = c), o.isEmpty(l) || (b.notify_url = l), o.isEmpty(f) || (b.auto = f), o.isEmpty(y) || (b.auto_node = y), o.isEmpty(m) || (b.config_no = m), o.isEmpty(g)) {r.next = 34;break;}if (o.isObject(g)) {r.next = 33;break;}return console.error("yungouos sdk error", "biz_params不是合法的json"), r.abrupt("return", null);case 33:b.biz_params = JSON.stringify(g);case 34:return r.next = 36, p.post(u.facePay, b);case 36:if (E = r.sent, k = o.doApiResult(E), !o.isEmpty(k)) {r.next = 40;break;}return r.abrupt("return", null);case 40:if (x = k.data, !o.isEmpty(x)) {r.next = 44;break;}return console.error("yungouos sdk error", "API无返回结果"), r.abrupt("return", null);case 44:return r.abrupt("return", x);case 45:case "end":return r.stop();}}}, r);}))).apply(this, arguments);}function _() {return (_ = g(_regeneratorRuntime.mark(function r(e, t, n, i, s, a, c, l, f, y, m, g) {var h, b, v, E, k;return _regeneratorRuntime.wrap(function (r) {for (;;) {switch (r.prev = r.next) {case 0:if (!o.isEmpty(e)) {r.next = 3;break;}return console.error("yungouos sdk error", "商户订单号不能为空"), r.abrupt("return", null);case 3:if (!o.isEmpty(t)) {r.next = 6;break;}return console.error("yungouos sdk error", "支付金额不能为空"), r.abrupt("return", null);case 6:if (!o.isEmpty(n)) {r.next = 9;break;}return console.error("yungouos sdk error", "商户号不能为空"), r.abrupt("return", null);case 9:if (!o.isEmpty(i)) {r.next = 12;break;}return console.error("yungouos sdk error", "商品名称不能为空"), r.abrupt("return", null);case 12:if (!o.isEmpty(g)) {r.next = 15;break;}return console.error("yungouos sdk error", "支付密钥不能为空"), r.abrupt("return", null);case 15:if (h = { out_trade_no: e, total_fee: t, mch_id: n, body: i }, b = d.paySign(h, g), h.sign = b, o.isEmpty(s) || (h.attach = s), o.isEmpty(a) || (h.notify_url = a), o.isEmpty(c) || (h.return_url = c), o.isEmpty(l) || (h.auto = l), o.isEmpty(f) || (h.auto_node = f), o.isEmpty(y) || (h.config_no = y), o.isEmpty(m)) {r.next = 29;break;}if (o.isObject(m)) {r.next = 28;break;}return console.error("yungouos sdk error", "biz_params不是合法的json"), r.abrupt("return", null);case 28:h.biz_params = JSON.stringify(m);case 29:return r.next = 31, p.post(u.wapPay, h);case 31:if (v = r.sent, E = o.doApiResult(v), !o.isEmpty(E)) {r.next = 35;break;}return r.abrupt("return", null);case 35:if (k = E.data, !o.isEmpty(k)) {r.next = 39;break;}return console.error("yungouos sdk error", "API无返回结果"), r.abrupt("return", null);case 39:return r.abrupt("return", k);case 40:case "end":return r.stop();}}}, r);}))).apply(this, arguments);}function w() {return (w = g(_regeneratorRuntime.mark(function r(e, t, n, i, s, a, c, l, f, y, m, g) {var h, b, v, E, k;return _regeneratorRuntime.wrap(function (r) {for (;;) {switch (r.prev = r.next) {case 0:if (!o.isEmpty(e)) {r.next = 3;break;}return console.error("yungouos sdk error", "APPID不能为空"), r.abrupt("return", null);case 3:if (!o.isEmpty(t)) {r.next = 6;break;}return console.error("yungouos sdk error", "商户订单号不能为空"), r.abrupt("return", null);case 6:if (!o.isEmpty(n)) {r.next = 9;break;}return console.error("yungouos sdk error", "支付金额不能为空"), r.abrupt("return", null);case 9:if (!o.isEmpty(i)) {r.next = 12;break;}return console.error("yungouos sdk error", "商户号不能为空"), r.abrupt("return", null);case 12:if (!o.isEmpty(s)) {r.next = 15;break;}return console.error("yungouos sdk error", "商品名称不能为空"), r.abrupt("return", null);case 15:if (!o.isEmpty(g)) {r.next = 18;break;}return console.error("yungouos sdk error", "支付密钥不能为空"), r.abrupt("return", null);case 18:if (h = { app_id: e, out_trade_no: t, total_fee: n, mch_id: i, body: s }, b = d.paySign(h, g), h.sign = b, o.isEmpty(a) || (h.attach = a), o.isEmpty(c) || (h.notify_url = c), o.isEmpty(l) || (h.auto = l), o.isEmpty(f) || (h.auto_node = f), o.isEmpty(y) || (h.config_no = y), o.isEmpty(m)) {r.next = 31;break;}if (o.isObject(m)) {r.next = 30;break;}return console.error("yungouos sdk error", "biz_params不是合法的json"), r.abrupt("return", null);case 30:h.biz_params = JSON.stringify(m);case 31:return r.next = 33, p.post(u.appPay, h);case 33:if (v = r.sent, E = o.doApiResult(v), !o.isEmpty(E)) {r.next = 37;break;}return r.abrupt("return", null);case 37:if (k = E.data, !o.isEmpty(k)) {r.next = 41;break;}return console.error("yungouos sdk error", "API无返回结果"), r.abrupt("return", null);case 41:return r.abrupt("return", k);case 42:case "end":return r.stop();}}}, r);}))).apply(this, arguments);}function S() {return (S = g(_regeneratorRuntime.mark(function r(e, t, n, i, s, a) {var c, l, f, y, m;return _regeneratorRuntime.wrap(function (r) {for (;;) {switch (r.prev = r.next) {case 0:if (!o.isEmpty(e)) {r.next = 3;break;}return console.error("yungouos sdk error", "商户订单号不能为空"), r.abrupt("return", null);case 3:if (!o.isEmpty(t)) {r.next = 6;break;}return console.error("yungouos sdk error", "商户号不能为空"), r.abrupt("return", null);case 6:if (!o.isEmpty(n)) {r.next = 9;break;}return console.error("yungouos sdk error", "退款金额不能为空"), r.abrupt("return", null);case 9:if (!o.isEmpty(a)) {r.next = 12;break;}return console.error("yungouos sdk error", "支付密钥不能为空"), r.abrupt("return", null);case 12:return c = { out_trade_no: e, mch_id: t, money: n }, l = d.paySign(c, a), o.isEmpty(i) || (c.refund_desc = i), o.isEmpty(s) || (c.notify_url = s), c.sign = l, r.next = 19, p.post(u.refundOrder, c);case 19:if (f = r.sent, y = o.doApiResult(f), !o.isEmpty(y)) {r.next = 23;break;}return r.abrupt("return", null);case 23:if (m = y.data, !o.isEmpty(m)) {r.next = 27;break;}return console.error("yungouos sdk error", "API无返回结果"), r.abrupt("return", null);case 27:return r.abrupt("return", m);case 28:case "end":return r.stop();}}}, r);}))).apply(this, arguments);}function P() {return (P = g(_regeneratorRuntime.mark(function r(e, t, n) {var i, s, a, c, l;return _regeneratorRuntime.wrap(function (r) {for (;;) {switch (r.prev = r.next) {case 0:if (!o.isEmpty(e)) {r.next = 3;break;}return console.error("yungouos sdk error", "退款单号不能为空"), r.abrupt("return", null);case 3:if (!o.isEmpty(t)) {r.next = 6;break;}return console.error("yungouos sdk error", "商户号不能为空"), r.abrupt("return", null);case 6:if (!o.isEmpty(n)) {r.next = 9;break;}return console.error("yungouos sdk error", "支付密钥不能为空"), r.abrupt("return", null);case 9:return i = { refund_no: e, mch_id: t }, s = d.paySign(i, n), i.sign = s, r.next = 14, p.post(u.getRefundResult, i);case 14:if (a = r.sent, c = o.doApiResult(a), !o.isEmpty(c)) {r.next = 18;break;}return r.abrupt("return", null);case 18:if (l = c.data, !o.isEmpty(l)) {r.next = 22;break;}return console.error("yungouos sdk error", "API无返回结果"), r.abrupt("return", null);case 22:return r.abrupt("return", l);case 23:case "end":return r.stop();}}}, r);}))).apply(this, arguments);}function O() {return (O = g(_regeneratorRuntime.mark(function r(e, t, n, i, s) {var a, c, l, f, y;return _regeneratorRuntime.wrap(function (r) {for (;;) {switch (r.prev = r.next) {case 0:if (!o.isEmpty(e)) {r.next = 3;break;}return console.error("yungouos sdk error", "商户号不能为空"), r.abrupt("return", null);case 3:if (!o.isEmpty(t)) {r.next = 6;break;}return console.error("yungouos sdk error", "对账单日期不能为空"), r.abrupt("return", null);case 6:if (!o.isEmpty(s)) {r.next = 9;break;}return console.error("yungouos sdk error", "支付密钥不能为空"), r.abrupt("return", null);case 9:return a = { mch_id: e, date: t }, c = d.paySign(a, s), o.isEmpty(n) || (a.end_date = n), o.isEmpty(i) || (a.device_info = i), a.sign = c, r.next = 16, p.post(u.downloadBill, a);case 16:if (l = r.sent, f = o.doApiResult(l), !o.isEmpty(f)) {r.next = 20;break;}return r.abrupt("return", null);case 20:if (y = f.data, !o.isEmpty(y)) {r.next = 24;break;}return console.error("yungouos sdk error", "API无返回结果"), r.abrupt("return", null);case 24:return r.abrupt("return", y);case 25:case "end":return r.stop();}}}, r);}))).apply(this, arguments);}var j = { codePayAsync: function codePayAsync(r, e, t, n, o, u, i, s, a, c, l, p, f) {return h.apply(this, arguments);}, codePay: function codePay(r, e, t, n, i, s, a, c, l, f, y, m, g) {if (o.isEmpty(r)) return console.error("yungouos sdk error", "商户订单号不能为空"), null;if (o.isEmpty(e)) return console.error("yungouos sdk error", "支付金额不能为空"), null;if (o.isEmpty(t)) return console.error("yungouos sdk error", "商户号不能为空"), null;if (o.isEmpty(n)) return console.error("yungouos sdk error", "商品名称不能为空"), null;if (o.isEmpty(i)) return console.error("yungouos sdk error", "支付授权码不能为空"), null;if (o.isEmpty(g)) return console.error("yungouos sdk error", "支付密钥不能为空"), null;var h = { out_trade_no: r, total_fee: e, mch_id: t, body: n, auth_code: i },b = d.paySign(h, g);if (h.sign = b, o.isEmpty(s) || (h.attach = s), o.isEmpty(a) || (h.receipt = a), o.isEmpty(c) || (h.notify_url = c), o.isEmpty(l) || (h.auto = l), o.isEmpty(f) || (h.auto_node = f), o.isEmpty(y) || (h.config_no = y), !o.isEmpty(m)) {if (!o.isObject(m)) return console.error("yungouos sdk error", "biz_params不是合法的json"), null;h.biz_params = JSON.stringify(m);}return p.post(u.codePay, h);}, nativePayAsync: function nativePayAsync(r, e, t, n, o, u, i, s, a, c, l, p) {return b.apply(this, arguments);}, nativePay: function nativePay(r, e, t, n, i, s, a, c, l, f, y, m) {if (o.isEmpty(r)) return console.error("yungouos sdk error", "商户订单号不能为空"), null;if (o.isEmpty(e)) return console.error("yungouos sdk error", "支付金额不能为空"), null;if (o.isEmpty(t)) return console.error("yungouos sdk error", "商户号不能为空"), null;if (o.isEmpty(n)) return console.error("yungouos sdk error", "商品名称不能为空"), null;if (o.isEmpty(m)) return console.error("yungouos sdk error", "支付密钥不能为空"), null;var g = { out_trade_no: r, total_fee: e, mch_id: t, body: n },h = d.paySign(g, m);if (g.sign = h, o.isEmpty(i) || (g.type = i), o.isEmpty(s) || (g.attach = s), o.isEmpty(a) || (g.notify_url = a), o.isEmpty(c) || (g.auto = c), o.isEmpty(l) || (g.auto_node = l), o.isEmpty(f) || (g.config_no = f), !o.isEmpty(y)) {if (!o.isObject(y)) return console.error("yungouos sdk error", "biz_params不是合法的json"), null;g.biz_params = JSON.stringify(y);}return p.post(u.nativePay, g);}, jsapiPayAsync: function jsapiPayAsync(r, e, t, n, o, u, i, s, a, c, l, p) {return v.apply(this, arguments);}, jsapiPay: function jsapiPay(r, e, t, n, i, s, a, c, l, f, y, m) {if (o.isEmpty(r)) return console.error("yungouos sdk error", "商户订单号不能为空"), null;if (o.isEmpty(e)) return console.error("yungouos sdk error", "支付金额不能为空"), null;if (o.isEmpty(t)) return console.error("yungouos sdk error", "商户号不能为空"), null;if (o.isEmpty(n)) return console.error("yungouos sdk error", "商品名称不能为空"), null;if (o.isEmpty(i)) return console.error("yungouos sdk error", "openId不能为空"), null;if (o.isEmpty(m)) return console.error("yungouos sdk error", "支付密钥不能为空"), null;var g = { out_trade_no: r, total_fee: e, mch_id: t, body: n, openId: i },h = d.paySign(g, m);if (g.sign = h, o.isEmpty(s) || (g.attach = s), o.isEmpty(a) || (g.notify_url = a), o.isEmpty(c) || (g.auto = c), o.isEmpty(l) || (g.auto_node = l), o.isEmpty(f) || (g.config_no = f), !o.isEmpty(y)) {if (!o.isObject(y)) return console.error("yungouos sdk error", "biz_params不是合法的json"), null;g.biz_params = JSON.stringify(y);}return p.post(u.jsapiPay, g);}, cashierPayAsync: function cashierPayAsync(r, e, t, n, o, u, i, s, a, c, l, p) {return E.apply(this, arguments);}, cashierPay: function cashierPay(r, e, t, n, i, s, a, c, l, f, y, m) {if (o.isEmpty(r)) return console.error("yungouos sdk error", "商户订单号不能为空"), null;if (o.isEmpty(e)) return console.error("yungouos sdk error", "支付金额不能为空"), null;if (o.isEmpty(t)) return console.error("yungouos sdk error", "商户号不能为空"), null;if (o.isEmpty(n)) return console.error("yungouos sdk error", "商品名称不能为空"), null;if (o.isEmpty(m)) return console.error("yungouos sdk error", "支付密钥不能为空"), null;var g = { out_trade_no: r, total_fee: e, mch_id: t, body: n },h = d.paySign(g, m);if (g.sign = h, o.isEmpty(i) || (g.attach = i), o.isEmpty(s) || (g.notify_url = s), o.isEmpty(a) || (g.return_url = a), o.isEmpty(c) || (g.auto = c), o.isEmpty(l) || (g.auto_node = l), o.isEmpty(f) || (g.config_no = f), !o.isEmpty(y)) {if (!o.isObject(y)) return console.error("yungouos sdk error", "biz_params不是合法的json"), null;g.biz_params = JSON.stringify(y);}return p.post(u.cashierPay, g);}, minAppPay: function minAppPay(r, e, t, n, u, i, s, a, c, l, p, f) {if (o.isEmpty(r)) return console.error("yungouos sdk error", "商户订单号不能为空"), null;if (o.isEmpty(e)) return console.error("yungouos sdk error", "支付金额不能为空"), null;if (o.isEmpty(t)) return console.error("yungouos sdk error", "商户号不能为空"), null;if (o.isEmpty(n)) return console.error("yungouos sdk error", "商品名称不能为空"), null;if (o.isEmpty(f)) return console.error("yungouos sdk error", "支付密钥不能为空"), null;var y = { out_trade_no: r, total_fee: e, mch_id: t, body: n },m = d.paySign(y, f);if (y.sign = m, o.isEmpty(u) || (y.attach = u), o.isEmpty(s) || (y.notify_url = s), o.isEmpty(i) || (y.title = i), o.isEmpty(a) || (y.auto = a), o.isEmpty(c) || (y.auto_node = c), o.isEmpty(l) || (y.config_no = l), !o.isEmpty(p)) {if (!o.isObject(p)) return console.error("yungouos sdk error", "biz_params不是合法的json"), null;y.biz_params = JSON.stringify(p);}uni.navigateToMiniProgram({ appId: "wxd9634afb01b983c0", path: "/pages/pay/pay", extraData: y, success: function success(r) {console.log("小程序拉起成功");} });}, minAppPayParams: function minAppPayParams(r, e, t, n, u, i, s, a, c, l, p, f) {if (o.isEmpty(r)) return console.error("yungouos sdk error", "商户订单号不能为空"), null;if (o.isEmpty(e)) return console.error("yungouos sdk error", "支付金额不能为空"), null;if (o.isEmpty(t)) return console.error("yungouos sdk error", "商户号不能为空"), null;if (o.isEmpty(n)) return console.error("yungouos sdk error", "商品名称不能为空"), null;if (o.isEmpty(f)) return console.error("yungouos sdk error", "支付密钥不能为空"), null;var y = { out_trade_no: r, total_fee: e, mch_id: t, body: n },m = d.paySign(y, f);if (y.sign = m, o.isEmpty(u) || (y.attach = u), o.isEmpty(s) || (y.notify_url = s), o.isEmpty(i) || (y.title = i), o.isEmpty(a) || (y.auto = a), o.isEmpty(c) || (y.auto_node = c), o.isEmpty(l) || (y.config_no = l), !o.isEmpty(p)) {if (!o.isObject(p)) return console.error("yungouos sdk error", "biz_params不是合法的json"), null;y.biz_params = JSON.stringify(p);}return y;}, minAppPayBusiness: function minAppPayBusiness(r, e, t, n, i, s, a, c, l, f, y, m) {if (o.isEmpty(r)) return console.error("yungouos sdk error", "商户订单号不能为空"), null;if (o.isEmpty(e)) return console.error("yungouos sdk error", "支付金额不能为空"), null;if (o.isEmpty(t)) return console.error("yungouos sdk error", "商户号不能为空"), null;if (o.isEmpty(n)) return console.error("yungouos sdk error", "商品名称不能为空"), null;if (o.isEmpty(i)) return console.error("yungouos sdk error", "openId不能为空"), null;if (o.isEmpty(m)) return console.error("yungouos sdk error", "支付密钥不能为空"), null;var g = { out_trade_no: r, total_fee: e, mch_id: t, body: n },h = d.paySign(g, m);if (g.sign = h, g.openId = i, o.isEmpty(s) || (g.attach = s), o.isEmpty(a) || (g.notify_url = a), o.isEmpty(c) || (g.auto = c), o.isEmpty(l) || (g.auto_node = l), o.isEmpty(f) || (g.config_no = f), !o.isEmpty(y)) {if (!o.isObject(y)) return console.error("yungouos sdk error", "biz_params不是合法的json"), null;g.biz_params = JSON.stringify(y);}return p.post(u.minAppPay, g);}, minAppPayBusinessAsync: function minAppPayBusinessAsync(r, e, t, n, o, u, i, s, a, c, l, p) {return k.apply(this, arguments);}, facePayAsync: function facePayAsync(r, e, t, n, o, u, i, s, a, c, l, p, f) {return x.apply(this, arguments);}, facePay: function facePay(r, e, t, n, i, s, a, c, l, f, y, m, g) {if (o.isEmpty(r)) return console.error("yungouos sdk error", "商户订单号不能为空"), null;if (o.isEmpty(e)) return console.error("yungouos sdk error", "支付金额不能为空"), null;if (o.isEmpty(t)) return console.error("yungouos sdk error", "商户号不能为空"), null;if (o.isEmpty(n)) return console.error("yungouos sdk error", "商品名称不能为空"), null;if (o.isEmpty(i)) return console.error("yungouos sdk error", "openId不能为空"), null;if (o.isEmpty(s)) return console.error("yungouos sdk error", "人脸凭证不能为空"), null;if (o.isEmpty(g)) return console.error("yungouos sdk error", "支付密钥不能为空"), null;var h = { out_trade_no: r, total_fee: e, mch_id: t, body: n, openId: i, face_code: s },b = d.paySign(h, g);if (h.sign = b, o.isEmpty(a) || (h.attach = a), o.isEmpty(c) || (h.notify_url = c), o.isEmpty(l) || (h.auto = l), o.isEmpty(f) || (h.auto_node = f), o.isEmpty(y) || (h.config_no = y), !o.isEmpty(m)) {if (!o.isObject(m)) return console.error("yungouos sdk error", "biz_params不是合法的json"), null;h.biz_params = JSON.stringify(m);}return p.post(u.facePay, h);}, wapPayAsync: function wapPayAsync(r, e, t, n, o, u, i, s, a, c, l, p) {return _.apply(this, arguments);}, wapPay: function wapPay(r, e, t, n, i, s, a, c, l, f, y, m) {if (o.isEmpty(r)) return console.error("yungouos sdk error", "商户订单号不能为空"), null;if (o.isEmpty(e)) return console.error("yungouos sdk error", "支付金额不能为空"), null;if (o.isEmpty(t)) return console.error("yungouos sdk error", "商户号不能为空"), null;if (o.isEmpty(n)) return console.error("yungouos sdk error", "商品名称不能为空"), null;if (o.isEmpty(m)) return console.error("yungouos sdk error", "支付密钥不能为空"), null;var g = { out_trade_no: r, total_fee: e, mch_id: t, body: n },h = d.paySign(g, m);if (g.sign = h, o.isEmpty(i) || (g.attach = i), o.isEmpty(s) || (g.notify_url = s), o.isEmpty(a) || (g.return_url = a), o.isEmpty(c) || (g.auto = c), o.isEmpty(l) || (g.auto_node = l), o.isEmpty(f) || (g.config_no = f), !o.isEmpty(y)) {if (!o.isObject(y)) return console.error("yungouos sdk error", "biz_params不是合法的json"), null;g.biz_params = JSON.stringify(y);}return p.post(u.wapPay, g);}, appPayAsync: function appPayAsync(r, e, t, n, o, u, i, s, a, c, l, p) {return w.apply(this, arguments);}, appPay: function appPay(r, e, t, n, i, s, a, c, l, f, y, m) {if (o.isEmpty(r)) return console.error("yungouos sdk error", "APPID不能为空"), null;if (o.isEmpty(e)) return console.error("yungouos sdk error", "商户订单号不能为空"), null;if (o.isEmpty(t)) return console.error("yungouos sdk error", "支付金额不能为空"), null;if (o.isEmpty(n)) return console.error("yungouos sdk error", "商户号不能为空"), null;if (o.isEmpty(i)) return console.error("yungouos sdk error", "商品名称不能为空"), null;if (o.isEmpty(m)) return console.error("yungouos sdk error", "支付密钥不能为空"), null;var g = { app_id: r, out_trade_no: e, total_fee: t, mch_id: n, body: i },h = d.paySign(g, m);if (g.sign = h, o.isEmpty(s) || (g.attach = s), o.isEmpty(a) || (g.notify_url = a), o.isEmpty(c) || (g.auto = c), o.isEmpty(l) || (g.auto_node = l), o.isEmpty(f) || (g.config_no = f), !o.isEmpty(y)) {if (!o.isObject(y)) return console.error("yungouos sdk error", "biz_params不是合法的json"), null;g.biz_params = JSON.stringify(y);}return p.post(u.appPay, g);}, refundAsync: function refundAsync(r, e, t, n, o, u) {return S.apply(this, arguments);}, refund: function refund(r, e, t, n, i, s) {if (o.isEmpty(r)) return console.error("yungouos sdk error", "商户订单号不能为空"), null;if (o.isEmpty(e)) return console.error("yungouos sdk error", "商户号不能为空"), null;if (o.isEmpty(t)) return console.error("yungouos sdk error", "退款金额不能为空"), null;if (o.isEmpty(s)) return console.error("yungouos sdk error", "支付密钥不能为空"), null;var a = { out_trade_no: r, mch_id: e, money: t },c = d.paySign(a, s);return o.isEmpty(n) || (a.refund_desc = n), o.isEmpty(i) || (a.notify_url = i), a.sign = c, p.post(u.refundOrder, a);}, getRefundResultAsync: function getRefundResultAsync(r, e, t) {return P.apply(this, arguments);}, getRefundResult: function getRefundResult(r, e, t) {if (o.isEmpty(r)) return console.error("yungouos sdk error", "退款单号不能为空"), null;if (o.isEmpty(e)) return console.error("yungouos sdk error", "商户号不能为空"), null;if (o.isEmpty(t)) return console.error("yungouos sdk error", "支付密钥不能为空"), null;var n = { refund_no: r, mch_id: e },i = d.paySign(n, t);return n.sign = i, p.post(u.getRefundResult, n);}, downloadBillAsync: function downloadBillAsync(r, e, t, n, o) {return O.apply(this, arguments);}, downloadBill: function downloadBill(r, e, t, n, i) {if (o.isEmpty(r)) return console.error("yungouos sdk error", "商户号不能为空"), null;if (o.isEmpty(e)) return console.error("yungouos sdk error", "对账单日期不能为空"), null;if (o.isEmpty(i)) return console.error("yungouos sdk error", "支付密钥不能为空"), null;var s = { mch_id: r, date: e },a = d.paySign(s, i);return o.isEmpty(t) || (s.end_date = t), o.isEmpty(n) || (s.device_info = n), s.sign = a, p.post(u.downloadBill, s);} },A = { nativePay: "https://api.pay.yungouos.com/api/pay/alipay/nativePay", wapPay: "https://api.pay.yungouos.com/api/pay/alipay/wapPay", jsPay: "https://api.pay.yungouos.com/api/pay/alipay/jsPay", mobilePay: "https://api.pay.yungouos.com/api/pay/alipay/mobilePay", appPay: "https://api.pay.yungouos.com/api/pay/alipay/appPay", refundOrder: "https://api.pay.yungouos.com/api/pay/alipay/refundOrder", getRefundResult: "https://api.pay.yungouos.com/api/pay/alipay/getRefundResult" };function R(r, e, t, n, o, u, i) {try {var s = r[u](i),a = s.value;} catch (r) {return void t(r);}s.done ? e(a) : Promise.resolve(a).then(n, o);}function I(r) {return function () {var e = this,t = arguments;return new Promise(function (n, o) {var u = r.apply(e, t);function i(r) {R(u, n, o, i, s, "next", r);}function s(r) {R(u, n, o, i, s, "throw", r);}i(void 0);});};}function T() {return (T = I(_regeneratorRuntime.mark(function r(e, t, n, u, i, s, a, c, l, f) {var y, m, g, h, b, v;return _regeneratorRuntime.wrap(function (r) {for (;;) {switch (r.prev = r.next) {case 0:if (!o.isEmpty(e)) {r.next = 3;break;}return console.error("yungouos sdk error", "商户订单号不能为空"), r.abrupt("return", null);case 3:if (!o.isEmpty(t)) {r.next = 6;break;}return console.error("yungouos sdk error", "支付金额不能为空"), r.abrupt("return", null);case 6:if (!o.isEmpty(n)) {r.next = 9;break;}return console.error("yungouos sdk error", "商户号不能为空"), r.abrupt("return", null);case 9:if (!o.isEmpty(u)) {r.next = 12;break;}return console.error("yungouos sdk error", "商品名称不能为空"), r.abrupt("return", null);case 12:if (!o.isEmpty(f)) {r.next = 15;break;}return console.error("yungouos sdk error", "支付密钥不能为空"), r.abrupt("return", null);case 15:return y = { out_trade_no: e, total_fee: t, mch_id: n, body: u }, m = d.paySign(y, f), y.sign = m, o.isEmpty(i) || (y.type = i), o.isEmpty(s) || (y.attach = s), o.isEmpty(a) || (y.notify_url = a), g = {}, o.isEmpty(c) || (g.hbfq_num = c), o.isEmpty(l) || (g.hbfq_percent = l), o.isEmpty(g) || (y.hb_fq = JSON.stringify(g)), r.next = 27, p.post(A.nativePay, y);case 27:if (h = r.sent, b = o.doApiResult(h), !o.isEmpty(b)) {r.next = 31;break;}return r.abrupt("return", null);case 31:if (v = b.data, !o.isEmpty(v)) {r.next = 35;break;}return console.error("yungouos sdk error", "API无返回结果"), r.abrupt("return", null);case 35:return r.abrupt("return", v);case 36:case "end":return r.stop();}}}, r);}))).apply(this, arguments);}function N() {return (N = I(_regeneratorRuntime.mark(function r(e, t, n, u, i, s, a, c, l) {var f, y, m, g, h, b;return _regeneratorRuntime.wrap(function (r) {for (;;) {switch (r.prev = r.next) {case 0:if (!o.isEmpty(e)) {r.next = 3;break;}return console.error("yungouos sdk error", "商户订单号不能为空"), r.abrupt("return", null);case 3:if (!o.isEmpty(t)) {r.next = 6;break;}return console.error("yungouos sdk error", "支付金额不能为空"), r.abrupt("return", null);case 6:if (!o.isEmpty(n)) {r.next = 9;break;}return console.error("yungouos sdk error", "商户号不能为空"), r.abrupt("return", null);case 9:if (!o.isEmpty(u)) {r.next = 12;break;}return console.error("yungouos sdk error", "商品名称不能为空"), r.abrupt("return", null);case 12:if (!o.isEmpty(l)) {r.next = 15;break;}return console.error("yungouos sdk error", "支付密钥不能为空"), r.abrupt("return", null);case 15:return f = { out_trade_no: e, total_fee: t, mch_id: n, body: u }, y = d.paySign(f, l), f.sign = y, o.isEmpty(i) || (f.attach = i), o.isEmpty(s) || (f.notify_url = s), m = {}, o.isEmpty(a) || (m.hbfq_num = a), o.isEmpty(c) || (m.hbfq_percent = c), o.isEmpty(m) || (f.hb_fq = JSON.stringify(m)), r.next = 26, p.post(A.wapPay, f);case 26:if (g = r.sent, h = o.doApiResult(g), !o.isEmpty(h)) {r.next = 30;break;}return r.abrupt("return", null);case 30:if (b = h.data, !o.isEmpty(b)) {r.next = 34;break;}return console.error("yungouos sdk error", "API无返回结果"), r.abrupt("return", null);case 34:return r.abrupt("return", b);case 35:case "end":return r.stop();}}}, r);}))).apply(this, arguments);}function L() {return (L = I(_regeneratorRuntime.mark(function r(e, t, n, u, i, s, a, c, l, f) {var y, m, g, h, b, v;return _regeneratorRuntime.wrap(function (r) {for (;;) {switch (r.prev = r.next) {case 0:if (!o.isEmpty(e)) {r.next = 3;break;}return console.error("yungouos sdk error", "商户订单号不能为空"), r.abrupt("return", null);case 3:if (!o.isEmpty(t)) {r.next = 6;break;}return console.error("yungouos sdk error", "支付金额不能为空"), r.abrupt("return", null);case 6:if (!o.isEmpty(n)) {r.next = 9;break;}return console.error("yungouos sdk error", "商户号不能为空"), r.abrupt("return", null);case 9:if (!o.isEmpty(u)) {r.next = 12;break;}return console.error("yungouos sdk error", "买家ID不能为空"), r.abrupt("return", null);case 12:if (!o.isEmpty(i)) {r.next = 15;break;}return console.error("yungouos sdk error", "商品名称不能为空"), r.abrupt("return", null);case 15:if (!o.isEmpty(f)) {r.next = 18;break;}return console.error("yungouos sdk error", "支付密钥不能为空"), r.abrupt("return", null);case 18:return y = { out_trade_no: e, total_fee: t, mch_id: n, buyer_id: u, body: i }, m = d.paySign(y, f), y.sign = m, o.isEmpty(s) || (y.attach = s), o.isEmpty(a) || (y.notify_url = a), g = {}, o.isEmpty(c) || (g.hbfq_num = c), o.isEmpty(l) || (g.hbfq_percent = l), o.isEmpty(g) || (y.hb_fq = JSON.stringify(g)), r.next = 29, p.post(A.jsPay, y);case 29:if (h = r.sent, b = o.doApiResult(h), !o.isEmpty(b)) {r.next = 33;break;}return r.abrupt("return", null);case 33:if (v = b.data, !o.isEmpty(v)) {r.next = 37;break;}return console.error("yungouos sdk error", "API无返回结果"), r.abrupt("return", null);case 37:return r.abrupt("return", v);case 38:case "end":return r.stop();}}}, r);}))).apply(this, arguments);}function C() {return (C = I(_regeneratorRuntime.mark(function r(e, t, n, u, i, s, a, c, l, f) {var y, m, g, h, b, v;return _regeneratorRuntime.wrap(function (r) {for (;;) {switch (r.prev = r.next) {case 0:if (!o.isEmpty(e)) {r.next = 3;break;}return console.error("yungouos sdk error", "商户订单号不能为空"), r.abrupt("return", null);case 3:if (!o.isEmpty(t)) {r.next = 6;break;}return console.error("yungouos sdk error", "支付金额不能为空"), r.abrupt("return", null);case 6:if (!o.isEmpty(n)) {r.next = 9;break;}return console.error("yungouos sdk error", "商户号不能为空"), r.abrupt("return", null);case 9:if (!o.isEmpty(u)) {r.next = 12;break;}return console.error("yungouos sdk error", "商品名称不能为空"), r.abrupt("return", null);case 12:if (!o.isEmpty(f)) {r.next = 15;break;}return console.error("yungouos sdk error", "支付密钥不能为空"), r.abrupt("return", null);case 15:return y = { out_trade_no: e, total_fee: t, mch_id: n, body: u }, m = d.paySign(y, f), y.sign = m, o.isEmpty(i) || (y.attach = i), o.isEmpty(s) || (y.notify_url = s), o.isEmpty(a) || (y.return_url = a), g = {}, o.isEmpty(c) || (g.hbfq_num = c), o.isEmpty(l) || (g.hbfq_percent = l), o.isEmpty(g) || (y.hb_fq = JSON.stringify(g)), r.next = 27, p.post(A.mobilePay, y);case 27:if (h = r.sent, b = o.doApiResult(h), !o.isEmpty(b)) {r.next = 31;break;}return r.abrupt("return", null);case 31:if (v = b.data, !o.isEmpty(v)) {r.next = 35;break;}return console.error("yungouos sdk error", "API无返回结果"), r.abrupt("return", null);case 35:return r.abrupt("return", v);case 36:case "end":return r.stop();}}}, r);}))).apply(this, arguments);}function U() {return (U = I(_regeneratorRuntime.mark(function r(e, t, n, u, i, s, a, c, l) {var f, y, m, g, h, b;return _regeneratorRuntime.wrap(function (r) {for (;;) {switch (r.prev = r.next) {case 0:if (!o.isEmpty(e)) {r.next = 3;break;}return console.error("yungouos sdk error", "商户订单号不能为空"), r.abrupt("return", null);case 3:if (!o.isEmpty(t)) {r.next = 6;break;}return console.error("yungouos sdk error", "支付金额不能为空"), r.abrupt("return", null);case 6:if (!o.isEmpty(n)) {r.next = 9;break;}return console.error("yungouos sdk error", "商户号不能为空"), r.abrupt("return", null);case 9:if (!o.isEmpty(u)) {r.next = 12;break;}return console.error("yungouos sdk error", "商品名称不能为空"), r.abrupt("return", null);case 12:if (!o.isEmpty(l)) {r.next = 15;break;}return console.error("yungouos sdk error", "支付密钥不能为空"), r.abrupt("return", null);case 15:return f = { out_trade_no: e, total_fee: t, mch_id: n, body: u }, y = d.paySign(f, l), f.sign = y, o.isEmpty(i) || (f.attach = i), o.isEmpty(s) || (f.notify_url = s), m = {}, o.isEmpty(a) || (m.hbfq_num = a), o.isEmpty(c) || (m.hbfq_percent = c), o.isEmpty(m) || (f.hb_fq = JSON.stringify(m)), r.next = 26, p.post(A.appPay, f);case 26:if (g = r.sent, h = o.doApiResult(g), !o.isEmpty(h)) {r.next = 30;break;}return r.abrupt("return", null);case 30:if (b = h.data, !o.isEmpty(b)) {r.next = 34;break;}return console.error("yungouos sdk error", "API无返回结果"), r.abrupt("return", null);case 34:return r.abrupt("return", b);case 35:case "end":return r.stop();}}}, r);}))).apply(this, arguments);}function D() {return (D = I(_regeneratorRuntime.mark(function r(e, t, n, u, i) {var s, a, c, l, f;return _regeneratorRuntime.wrap(function (r) {for (;;) {switch (r.prev = r.next) {case 0:if (!o.isEmpty(e)) {r.next = 3;break;}return console.error("yungouos sdk error", "商户订单号不能为空"), r.abrupt("return", null);case 3:if (!o.isEmpty(t)) {r.next = 6;break;}return console.error("yungouos sdk error", "商户号不能为空"), r.abrupt("return", null);case 6:if (!o.isEmpty(n)) {r.next = 9;break;}return console.error("yungouos sdk error", "退款金额不能为空"), r.abrupt("return", null);case 9:if (!o.isEmpty(i)) {r.next = 12;break;}return console.error("yungouos sdk error", "支付密钥不能为空"), r.abrupt("return", null);case 12:return s = { out_trade_no: e, mch_id: t, money: n }, a = d.paySign(s, i), s.sign = a, o.isEmpty(u) || (s.refund_desc = u), r.next = 18, p.post(A.refundOrder, s);case 18:if (c = r.sent, l = o.doApiResult(c), !o.isEmpty(l)) {r.next = 22;break;}return r.abrupt("return", null);case 22:if (f = l.data, !o.isEmpty(f)) {r.next = 26;break;}return console.error("yungouos sdk error", "API无返回结果"), r.abrupt("return", null);case 26:return r.abrupt("return", f);case 27:case "end":return r.stop();}}}, r);}))).apply(this, arguments);}function F() {return (F = I(_regeneratorRuntime.mark(function r(e, t, n) {var u, i, s, a, c;return _regeneratorRuntime.wrap(function (r) {for (;;) {switch (r.prev = r.next) {case 0:if (!o.isEmpty(e)) {r.next = 3;break;}return console.error("yungouos sdk error", "退款单号不能为空"), r.abrupt("return", null);case 3:if (!o.isEmpty(t)) {r.next = 6;break;}return console.error("yungouos sdk error", "商户号不能为空"), r.abrupt("return", null);case 6:if (!o.isEmpty(n)) {r.next = 9;break;}return console.error("yungouos sdk error", "支付密钥不能为空"), r.abrupt("return", null);case 9:return u = { refund_no: e, mch_id: t }, i = d.paySign(u, n), u.sign = i, r.next = 14, p.post(A.getRefundResult, u);case 14:if (s = r.sent, a = o.doApiResult(s), !o.isEmpty(a)) {r.next = 18;break;}return r.abrupt("return", null);case 18:if (c = a.data, !o.isEmpty(c)) {r.next = 22;break;}return console.error("yungouos sdk error", "API无返回结果"), r.abrupt("return", null);case 22:return r.abrupt("return", c);case 23:case "end":return r.stop();}}}, r);}))).apply(this, arguments);}var z = { nativePayAsync: function nativePayAsync(r, e, t, n, o, u, i, s, a, c) {return T.apply(this, arguments);}, nativePay: function nativePay(r, e, t, n, u, i, s, a, c, l) {if (o.isEmpty(r)) return console.error("yungouos sdk error", "商户订单号不能为空"), null;if (o.isEmpty(e)) return console.error("yungouos sdk error", "支付金额不能为空"), null;if (o.isEmpty(t)) return console.error("yungouos sdk error", "商户号不能为空"), null;if (o.isEmpty(n)) return console.error("yungouos sdk error", "商品名称不能为空"), null;if (o.isEmpty(l)) return console.error("yungouos sdk error", "支付密钥不能为空"), null;var f = { out_trade_no: r, total_fee: e, mch_id: t, body: n },y = d.paySign(f, l);f.sign = y, o.isEmpty(u) || (f.type = u), o.isEmpty(i) || (f.attach = i), o.isEmpty(s) || (f.notify_url = s);var m = {};return o.isEmpty(a) || (m.hbfq_num = a), o.isEmpty(c) || (m.hbfq_percent = c), o.isEmpty(m) || (f.hb_fq = JSON.stringify(m)), p.post(A.nativePay, f);}, wapPayAsync: function wapPayAsync(r, e, t, n, o, u, i, s, a) {return N.apply(this, arguments);}, wapPay: function wapPay(r, e, t, n, u, i, s, a, c) {if (o.isEmpty(r)) return console.error("yungouos sdk error", "商户订单号不能为空"), null;if (o.isEmpty(e)) return console.error("yungouos sdk error", "支付金额不能为空"), null;if (o.isEmpty(t)) return console.error("yungouos sdk error", "商户号不能为空"), null;if (o.isEmpty(n)) return console.error("yungouos sdk error", "商品名称不能为空"), null;if (o.isEmpty(c)) return console.error("yungouos sdk error", "支付密钥不能为空"), null;var l = { out_trade_no: r, total_fee: e, mch_id: t, body: n },f = d.paySign(l, c);l.sign = f, o.isEmpty(u) || (l.attach = u), o.isEmpty(i) || (l.notify_url = i);var y = {};return o.isEmpty(s) || (y.hbfq_num = s), o.isEmpty(a) || (y.hbfq_percent = a), o.isEmpty(y) || (l.hb_fq = JSON.stringify(y)), p.post(A.wapPay, l);}, jsPayAsync: function jsPayAsync(r, e, t, n, o, u, i, s, a, c) {return L.apply(this, arguments);}, jsPay: function jsPay(r, e, t, n, u, i, s, a, c, l) {if (o.isEmpty(r)) return console.error("yungouos sdk error", "商户订单号不能为空"), null;if (o.isEmpty(e)) return console.error("yungouos sdk error", "支付金额不能为空"), null;if (o.isEmpty(t)) return console.error("yungouos sdk error", "商户号不能为空"), null;if (o.isEmpty(n)) return console.error("yungouos sdk error", "买家ID不能为空"), null;if (o.isEmpty(u)) return console.error("yungouos sdk error", "商品名称不能为空"), null;if (o.isEmpty(l)) return console.error("yungouos sdk error", "支付密钥不能为空"), null;var f = { out_trade_no: r, total_fee: e, mch_id: t, buyer_id: n, body: u },y = d.paySign(f, l);f.sign = y, o.isEmpty(i) || (f.attach = i), o.isEmpty(s) || (f.notify_url = s);var m = {};return o.isEmpty(a) || (m.hbfq_num = a), o.isEmpty(c) || (m.hbfq_percent = c), o.isEmpty(m) || (f.hb_fq = JSON.stringify(m)), p.post(A.jsPay, f);}, h5PayAsync: function h5PayAsync(r, e, t, n, o, u, i, s, a, c) {return C.apply(this, arguments);}, h5Pay: function h5Pay(r, e, t, n, u, i, s, a, c, l) {if (o.isEmpty(r)) return console.error("yungouos sdk error", "商户订单号不能为空"), null;if (o.isEmpty(e)) return console.error("yungouos sdk error", "支付金额不能为空"), null;if (o.isEmpty(t)) return console.error("yungouos sdk error", "商户号不能为空"), null;if (o.isEmpty(n)) return console.error("yungouos sdk error", "商品名称不能为空"), null;if (o.isEmpty(l)) return console.error("yungouos sdk error", "支付密钥不能为空"), null;var f = { out_trade_no: r, total_fee: e, mch_id: t, body: n },y = d.paySign(f, l);f.sign = y, o.isEmpty(u) || (f.attach = u), o.isEmpty(i) || (f.notify_url = i), o.isEmpty(s) || (f.return_url = s);var m = {};return o.isEmpty(a) || (m.hbfq_num = a), o.isEmpty(c) || (m.hbfq_percent = c), o.isEmpty(m) || (f.hb_fq = JSON.stringify(m)), p.post(A.mobilePay, f);}, appPayAsync: function appPayAsync(r, e, t, n, o, u, i, s, a) {return U.apply(this, arguments);}, appPay: function appPay(r, e, t, n, u, i, s, a, c) {if (o.isEmpty(r)) return console.error("yungouos sdk error", "商户订单号不能为空"), null;if (o.isEmpty(e)) return console.error("yungouos sdk error", "支付金额不能为空"), null;if (o.isEmpty(t)) return console.error("yungouos sdk error", "商户号不能为空"), null;if (o.isEmpty(n)) return console.error("yungouos sdk error", "商品名称不能为空"), null;if (o.isEmpty(c)) return console.error("yungouos sdk error", "支付密钥不能为空"), null;var l = { out_trade_no: r, total_fee: e, mch_id: t, body: n },f = d.paySign(l, c);l.sign = f, o.isEmpty(u) || (l.attach = u), o.isEmpty(i) || (l.notify_url = i);var y = {};return o.isEmpty(s) || (y.hbfq_num = s), o.isEmpty(a) || (y.hbfq_percent = a), o.isEmpty(y) || (l.hb_fq = JSON.stringify(y)), p.post(A.appPay, l);}, refundAsync: function refundAsync(r, e, t, n, o) {return D.apply(this, arguments);}, refund: function refund(r, e, t, n, u) {if (o.isEmpty(r)) return console.error("yungouos sdk error", "商户订单号不能为空"), null;if (o.isEmpty(e)) return console.error("yungouos sdk error", "商户号不能为空"), null;if (o.isEmpty(t)) return console.error("yungouos sdk error", "退款金额不能为空"), null;if (o.isEmpty(u)) return console.error("yungouos sdk error", "支付密钥不能为空"), null;var i = { out_trade_no: r, mch_id: e, money: t },s = d.paySign(i, u);return i.sign = s, o.isEmpty(n) || (i.refund_desc = n), p.post(A.refundOrder, i);}, getRefundResultAsync: function getRefundResultAsync(r, e, t) {return F.apply(this, arguments);}, getRefundResult: function getRefundResult(r, e, t) {if (o.isEmpty(r)) return console.error("yungouos sdk error", "退款单号不能为空"), null;if (o.isEmpty(e)) return console.error("yungouos sdk error", "商户号不能为空"), null;if (o.isEmpty(t)) return console.error("yungouos sdk error", "支付密钥不能为空"), null;var n = { refund_no: r, mch_id: e },u = d.paySign(n, t);return n.sign = u, p.post(A.getRefundResult, n);} },B = B + "/api/finance/profitsharing/config",M = { getConfigUrl: B, getCreateBillUrl: "https://api.pay.yungouos.com/api/finance/profitsharing/createBill", getSendPayUrl: "https://api.pay.yungouos.com/api/finance/profitsharing/sendPay", getPayResultUrl: "https://api.pay.yungouos.com/api/finance/profitsharing/getPayResult", getFinishUrl: "https://api.pay.yungouos.com/api/finance/profitsharing/finish", getRePayWxPayUrl: "https://api.pay.yungouos.com/api/finance/repay/wxpay", getRePayAliPayUrl: "https://api.pay.yungouos.com/api/finance/repay/alipay" };function q(r, e, t, n, o, u, i) {try {var s = r[u](i),a = s.value;} catch (r) {return void t(r);}s.done ? e(a) : Promise.resolve(a).then(n, o);}function J(r) {return function () {var e = this,t = arguments;return new Promise(function (n, o) {var u = r.apply(e, t);function i(r) {q(u, n, o, i, s, "next", r);}function s(r) {q(u, n, o, i, s, "throw", r);}i(void 0);});};}function G() {return (G = J(_regeneratorRuntime.mark(function r(e, t, n, u, i, s, a, c, l) {var f, y, m, g, h, b;return _regeneratorRuntime.wrap(function (r) {for (;;) {switch (r.prev = r.next) {case 0:if (f = "wxpay", !o.isEmpty(e)) {r.next = 4;break;}return console.error("yungouos sdk error", "商户号不能为空"), r.abrupt("return", null);case 4:if (!o.isEmpty(n)) {r.next = 7;break;}return console.error("yungouos sdk error", "分账原因不能为空"), r.abrupt("return", null);case 7:if (!o.isEmpty(l)) {r.next = 10;break;}return console.error("yungouos sdk error", "支付密钥不能为空"), r.abrupt("return", null);case 10:if (!o.isEmpty(u) || !o.isEmpty(i)) {r.next = 13;break;}return console.error("yungouos sdk error", "分账收款方openId、收款帐号、收款商户号不能同时为空！"), r.abrupt("return", null);case 13:return y = { mch_id: e, reason: n, channel: f }, o.isEmpty(u) || (y.openId = u), o.isEmpty(i) || (y.receiver_mch_id = i), o.isEmpty(s) || (y.name = s), o.isEmpty(a) || (y.rate = a), o.isEmpty(c) || (y.money = c), m = d.paySign(y, l), y.sign = m, o.isEmpty(t) || (y.appId = t), r.next = 24, p.post(M.getConfigUrl, y);case 24:if (g = r.sent, h = o.doApiResult(g), !o.isEmpty(h)) {r.next = 28;break;}return r.abrupt("return", null);case 28:if (b = h.data, !o.isEmpty(b)) {r.next = 32;break;}return console.error("yungouos sdk error", "API无返回结果"), r.abrupt("return", null);case 32:return r.abrupt("return", b);case 33:case "end":return r.stop();}}}, r);}))).apply(this, arguments);}function H() {return (H = J(_regeneratorRuntime.mark(function r(e, t, n, u, i, s, a) {var c, l, f, y, m, g;return _regeneratorRuntime.wrap(function (r) {for (;;) {switch (r.prev = r.next) {case 0:if (c = "alipay", !o.isEmpty(e)) {r.next = 4;break;}return console.error("yungouos sdk error", "商户号不能为空"), r.abrupt("return", null);case 4:if (!o.isEmpty(t)) {r.next = 7;break;}return console.error("yungouos sdk error", "分账原因不能为空"), r.abrupt("return", null);case 7:if (!o.isEmpty(n)) {r.next = 10;break;}return console.error("yungouos sdk error", "分账方支付宝账户不能为空"), r.abrupt("return", null);case 10:if (!o.isEmpty(u)) {r.next = 13;break;}return console.error("yungouos sdk error", "分账方支付宝账户姓名不能为空"), r.abrupt("return", null);case 13:if (!o.isEmpty(a)) {r.next = 16;break;}return console.error("yungouos sdk error", "支付密钥不能为空"), r.abrupt("return", null);case 16:return l = { mch_id: e, reason: t, channel: c, account: n, name: u }, o.isEmpty(i) || (l.rate = i), o.isEmpty(s) || (l.money = s), f = d.paySign(l, a), l.sign = f, r.next = 23, p.post(M.getConfigUrl, l);case 23:if (y = r.sent, m = o.doApiResult(y), !o.isEmpty(m)) {r.next = 27;break;}return r.abrupt("return", null);case 27:if (g = m.data, !o.isEmpty(g)) {r.next = 31;break;}return console.error("yungouos sdk error", "API无返回结果"), r.abrupt("return", null);case 31:return r.abrupt("return", g);case 32:case "end":return r.stop();}}}, r);}))).apply(this, arguments);}function $() {return ($ = J(_regeneratorRuntime.mark(function r(e, t, n, u, i, s, a, c, l, f) {var y, m, g, h, b;return _regeneratorRuntime.wrap(function (r) {for (;;) {switch (r.prev = r.next) {case 0:if (!o.isEmpty(e)) {r.next = 3;break;}return console.error("yungouos sdk error", "商户号不能为空"), r.abrupt("return", null);case 3:if (!o.isEmpty(n)) {r.next = 6;break;}return console.error("yungouos sdk error", "分账原因不能为空"), r.abrupt("return", null);case 6:if (!o.isEmpty(u)) {r.next = 9;break;}return console.error("yungouos sdk error", "分账渠道不能为空"), r.abrupt("return", null);case 9:if (!o.isEmpty(f)) {r.next = 12;break;}return console.error("yungouos sdk error", "支付密钥不能为空"), r.abrupt("return", null);case 12:if ("wxpay" == u || "alipay" == u) {r.next = 15;break;}return console.error("yungouos sdk error", "分账渠道参数不合法！参考值：wxpay、alipay"), r.abrupt("return", null);case 15:if (!o.isEmpty(i) || !o.isEmpty(s)) {r.next = 18;break;}return console.error("yungouos sdk error", "分账收款方openId、收款帐号、收款商户号不能同时为空！"), r.abrupt("return", null);case 18:return y = { mch_id: e, reason: n, channel: u }, o.isEmpty(i) || (y.openId = i), o.isEmpty(s) || (y.receiver_mch_id = s), o.isEmpty(a) || (y.name = a), o.isEmpty(c) || (y.rate = c), o.isEmpty(l) || (y.money = l), m = d.paySign(y, f), y.sign = m, o.isEmpty(t) || (y.appId = t), r.next = 29, p.post(M.getConfigUrl, y);case 29:if (g = r.sent, h = o.doApiResult(g), !o.isEmpty(h)) {r.next = 33;break;}return r.abrupt("return", null);case 33:if (b = h.data, !o.isEmpty(b)) {r.next = 37;break;}return console.error("yungouos sdk error", "API无返回结果"), r.abrupt("return", null);case 37:return r.abrupt("return", b);case 38:case "end":return r.stop();}}}, r);}))).apply(this, arguments);}function W() {return (W = J(_regeneratorRuntime.mark(function r(e, t, n, u) {var i, s, a, c, l;return _regeneratorRuntime.wrap(function (r) {for (;;) {switch (r.prev = r.next) {case 0:if (!o.isEmpty(e)) {r.next = 3;break;}return console.error("yungouos sdk error", "商户号不能为空"), r.abrupt("return", null);case 3:if (!o.isEmpty(t)) {r.next = 6;break;}return console.error("yungouos sdk error", "商户单号不能为空！"), r.abrupt("return", null);case 6:if (!o.isEmpty(u)) {r.next = 9;break;}return console.error("yungouos sdk error", "支付密钥不能为空"), r.abrupt("return", null);case 9:return i = { mch_id: e, out_trade_no: t }, s = d.paySign(i, u), i.sign = s, o.isEmpty(n) || (i.config_no = n), r.next = 15, p.post(M.getCreateBillUrl, i);case 15:if (a = r.sent, c = o.doApiResult(a), !o.isEmpty(c)) {r.next = 19;break;}return r.abrupt("return", null);case 19:if (l = c.data, !o.isEmpty(l)) {r.next = 23;break;}return console.error("yungouos sdk error", "API无返回结果"), r.abrupt("return", null);case 23:return r.abrupt("return", l);case 24:case "end":return r.stop();}}}, r);}))).apply(this, arguments);}function V() {return (V = J(_regeneratorRuntime.mark(function r(e, t, n, u) {var i, s, a, c, l;return _regeneratorRuntime.wrap(function (r) {for (;;) {switch (r.prev = r.next) {case 0:if (!o.isEmpty(e)) {r.next = 3;break;}return console.error("yungouos sdk error", "商户号不能为空"), r.abrupt("return", null);case 3:if (!o.isEmpty(t)) {r.next = 6;break;}return console.error("yungouos sdk error", "分账单号不能为空"), r.abrupt("return", null);case 6:if (!o.isEmpty(n)) {r.next = 9;break;}return console.error("yungouos sdk error", "分账描述不能为空"), r.abrupt("return", null);case 9:return i = { mch_id: e, ps_no: t, description: n }, s = d.paySign(i, u), i.sign = s, r.next = 14, p.post(M.getSendPayUrl, i);case 14:if (a = r.sent, c = o.doApiResult(a), !o.isEmpty(c)) {r.next = 18;break;}return r.abrupt("return", null);case 18:if (l = c.data, !o.isEmpty(l)) {r.next = 22;break;}return console.error("yungouos sdk error", "API无返回结果"), r.abrupt("return", null);case 22:return r.abrupt("return", l);case 23:case "end":return r.stop();}}}, r);}))).apply(this, arguments);}function Q() {return (Q = J(_regeneratorRuntime.mark(function r(e, t, n) {var u, i, s, a, c;return _regeneratorRuntime.wrap(function (r) {for (;;) {switch (r.prev = r.next) {case 0:if (!o.isEmpty(e)) {r.next = 3;break;}return console.error("yungouos sdk error", "商户号不能为空"), r.abrupt("return", null);case 3:if (!o.isEmpty(t)) {r.next = 6;break;}return console.error("yungouos sdk error", "分账单号不能为空"), r.abrupt("return", null);case 6:return u = { mch_id: e, ps_no: t }, i = d.paySign(u, n), u.sign = i, r.next = 11, p.post(M.getPayResultUrl, u);case 11:if (s = r.sent, a = o.doApiResult(s), !o.isEmpty(a)) {r.next = 15;break;}return r.abrupt("return", null);case 15:if (c = a.data, !o.isEmpty(c)) {r.next = 19;break;}return console.error("yungouos sdk error", "API无返回结果"), r.abrupt("return", null);case 19:return r.abrupt("return", c);case 20:case "end":return r.stop();}}}, r);}))).apply(this, arguments);}function Y() {return (Y = J(_regeneratorRuntime.mark(function r(e, t, n) {var u, i, s, a, c;return _regeneratorRuntime.wrap(function (r) {for (;;) {switch (r.prev = r.next) {case 0:if (!o.isEmpty(e)) {r.next = 3;break;}return console.error("yungouos sdk error", "商户号不能为空"), r.abrupt("return", null);case 3:if (!o.isEmpty(t)) {r.next = 6;break;}return console.error("yungouos sdk error", "分账单号不能为空"), r.abrupt("return", null);case 6:return u = { mch_id: e, out_trade_no: t }, i = d.paySign(u, n), u.sign = i, r.next = 11, p.post(M.getFinishUrl, u);case 11:if (s = r.sent, a = o.doApiResult(s), !o.isEmpty(a)) {r.next = 15;break;}return r.abrupt("return", null);case 15:if (c = a.data, !o.isEmpty(c)) {r.next = 19;break;}return console.error("yungouos sdk error", "API无返回结果"), r.abrupt("return", null);case 19:return r.abrupt("return", c);case 20:case "end":return r.stop();}}}, r);}))).apply(this, arguments);}function K() {return (K = J(_regeneratorRuntime.mark(function r(e, t, n, u, i, s, a, c) {var l, f, y, m, g;return _regeneratorRuntime.wrap(function (r) {for (;;) {switch (r.prev = r.next) {case 0:if (!o.isEmpty(e)) {r.next = 3;break;}return console.error("yungouos sdk error", "YunGouOS商户ID不能为空"), r.abrupt("return", null);case 3:if (!o.isEmpty(t)) {r.next = 6;break;}return console.error("yungouos sdk error", "商户单号不能为空"), r.abrupt("return", null);case 6:if (!o.isEmpty(n)) {r.next = 9;break;}return console.error("yungouos sdk error", "收款账户openid不能为空"), r.abrupt("return", null);case 9:if (!o.isEmpty(i)) {r.next = 12;break;}return console.error("yungouos sdk error", "付款金额不能为空"), r.abrupt("return", null);case 12:if (!o.isEmpty(s)) {r.next = 15;break;}return console.error("yungouos sdk error", "付款描述不能为空"), r.abrupt("return", null);case 15:return l = { merchant_id: e, out_trade_no: t, account: n, money: i, desc: s }, f = d.paySign(l, c), l.sign = f, o.isEmpty(u) || (l.account_name = u), o.isEmpty(a) || (l.mch_id = a), l.sign = f, r.next = 23, p.post(M.getRePayWxPayUrl, l);case 23:if (y = r.sent, m = o.doApiResult(y), !o.isEmpty(m)) {r.next = 27;break;}return r.abrupt("return", null);case 27:if (g = m.data, !o.isEmpty(g)) {r.next = 31;break;}return console.error("yungouos sdk error", "API无返回结果"), r.abrupt("return", null);case 31:return r.abrupt("return", g);case 32:case "end":return r.stop();}}}, r);}))).apply(this, arguments);}function X() {return (X = J(_regeneratorRuntime.mark(function r(e, t, n, u, i, s, a, c) {var l, f, y, m, g;return _regeneratorRuntime.wrap(function (r) {for (;;) {switch (r.prev = r.next) {case 0:if (!o.isEmpty(e)) {r.next = 3;break;}return console.error("yungouos sdk error", "YunGouOS商户ID不能为空"), r.abrupt("return", null);case 3:if (!o.isEmpty(t)) {r.next = 6;break;}return console.error("yungouos sdk error", "商户单号不能为空"), r.abrupt("return", null);case 6:if (!o.isEmpty(n)) {r.next = 9;break;}return console.error("yungouos sdk error", "收款支付宝账户不能为空"), r.abrupt("return", null);case 9:if (!o.isEmpty(u)) {r.next = 12;break;}return console.error("yungouos sdk error", "收款支付宝姓名不能为空"), r.abrupt("return", null);case 12:if (!o.isEmpty(i)) {r.next = 15;break;}return console.error("yungouos sdk error", "付款金额不能为空"), r.abrupt("return", null);case 15:if (!o.isEmpty(s)) {r.next = 18;break;}return console.error("yungouos sdk error", "付款描述不能为空"), r.abrupt("return", null);case 18:return l = { merchant_id: e, out_trade_no: t, account: n, account_name: u, money: i, desc: s }, f = d.paySign(l, c), l.sign = f, o.isEmpty(a) || (l.mch_id = a), l.sign = f, r.next = 25, p.post(M.getRePayAliPayUrl, l);case 25:if (y = r.sent, m = o.doApiResult(y), !o.isEmpty(m)) {r.next = 29;break;}return r.abrupt("return", null);case 29:if (g = m.data, !o.isEmpty(g)) {r.next = 33;break;}return console.error("yungouos sdk error", "API无返回结果"), r.abrupt("return", null);case 33:return r.abrupt("return", g);case 34:case "end":return r.stop();}}}, r);}))).apply(this, arguments);}var Z = { configAsync: function configAsync(r, e, t, n, o, u, i, s, a, c) {return $.apply(this, arguments);}, config: function config(r, e, t, n, u, i, s, a, c, l) {if (o.isEmpty(r)) return console.error("yungouos sdk error", "商户号不能为空"), null;if (o.isEmpty(t)) return console.error("yungouos sdk error", "分账原因不能为空"), null;if (o.isEmpty(n)) return console.error("yungouos sdk error", "分账渠道不能为空"), null;if (o.isEmpty(l)) return console.error("yungouos sdk error", "支付密钥不能为空"), null;if ("wxpay" != n && "alipay" != n) return console.error("yungouos sdk error", "分账渠道参数不合法！参考值：wxpay、alipay"), null;if (o.isEmpty(u) && o.isEmpty(i)) return console.error("yungouos sdk error", "分账收款方openId、收款帐号、收款商户号不能同时为空！"), null;var f = { mch_id: r, reason: t, channel: n };o.isEmpty(u) || (f.openId = u), o.isEmpty(i) || (f.receiver_mch_id = i), o.isEmpty(s) || (f.name = s), o.isEmpty(a) || (f.rate = a), o.isEmpty(c) || (f.money = c);var y = d.paySign(f, l);return f.sign = y, o.isEmpty(e) || (f.appId = e), p.post(M.getConfigUrl, f);}, createBillAsync: function createBillAsync(r, e, t, n) {return W.apply(this, arguments);}, createBill: function createBill(r, e, t, n) {if (o.isEmpty(r)) return console.error("yungouos sdk error", "商户号不能为空"), null;if (o.isEmpty(e)) return console.error("yungouos sdk error", "商户单号不能为空！"), null;if (o.isEmpty(n)) return console.error("yungouos sdk error", "支付密钥不能为空"), null;var u = { mch_id: r, out_trade_no: e },i = d.paySign(u, n);return u.sign = i, o.isEmpty(t) || (u.config_no = t), p.post(M.getCreateBillUrl, u);}, sendPayAsync: function sendPayAsync(r, e, t, n) {return V.apply(this, arguments);}, sendPay: function sendPay(r, e, t, n) {if (o.isEmpty(r)) return console.error("yungouos sdk error", "商户号不能为空"), null;if (o.isEmpty(e)) return console.error("yungouos sdk error", "分账单号不能为空"), null;if (o.isEmpty(t)) return console.error("yungouos sdk error", "分账描述不能为空"), null;var u = { mch_id: r, ps_no: e, description: t },i = d.paySign(u, n);return u.sign = i, p.post(M.getSendPayUrl, u);}, getPayResultAsync: function getPayResultAsync(r, e, t) {return Q.apply(this, arguments);}, getPayResult: function getPayResult(r, e, t) {if (o.isEmpty(r)) return console.error("yungouos sdk error", "商户号不能为空"), null;if (o.isEmpty(e)) return console.error("yungouos sdk error", "分账单号不能为空"), null;var n = { mch_id: r, ps_no: e },u = d.paySign(n, t);return n.sign = u, p.post(M.getPayResultUrl, n);}, finishAsync: function finishAsync(r, e, t) {return Y.apply(this, arguments);}, finish: function finish(r, e, t) {if (o.isEmpty(r)) return console.error("yungouos sdk error", "商户号不能为空"), null;if (o.isEmpty(e)) return console.error("yungouos sdk error", "分账单号不能为空"), null;var n = { mch_id: r, out_trade_no: e },u = d.paySign(n, t);return n.sign = u, p.post(M.getFinishUrl, n);}, rePayWxPayAsync: function rePayWxPayAsync(r, e, t, n, o, u, i, s) {return K.apply(this, arguments);}, rePayWxPay: function rePayWxPay(r, e, t, n, u, i, s, a) {if (o.isEmpty(r)) return console.error("yungouos sdk error", "YunGouOS商户ID不能为空"), null;if (o.isEmpty(e)) return console.error("yungouos sdk error", "商户单号不能为空"), null;if (o.isEmpty(t)) return console.error("yungouos sdk error", "收款账户openid不能为空"), null;if (o.isEmpty(u)) return console.error("yungouos sdk error", "付款金额不能为空"), null;if (o.isEmpty(i)) return console.error("yungouos sdk error", "付款描述不能为空"), null;var c = { merchant_id: r, out_trade_no: e, account: t, money: u, desc: i },l = d.paySign(c, a);return c.sign = l, o.isEmpty(n) || (c.account_name = n), o.isEmpty(s) || (c.mch_id = s), c.sign = l, p.post(M.getRePayWxPayUrl, c);}, rePayAliPayAsync: function rePayAliPayAsync(r, e, t, n, o, u, i, s) {return X.apply(this, arguments);}, rePayAliPay: function rePayAliPay(r, e, t, n, u, i, s, a) {if (o.isEmpty(r)) return console.error("yungouos sdk error", "YunGouOS商户ID不能为空"), null;if (o.isEmpty(e)) return console.error("yungouos sdk error", "商户单号不能为空"), null;if (o.isEmpty(t)) return console.error("yungouos sdk error", "收款支付宝账户不能为空"), null;if (o.isEmpty(n)) return console.error("yungouos sdk error", "收款支付宝姓名不能为空"), null;if (o.isEmpty(u)) return console.error("yungouos sdk error", "付款金额不能为空"), null;if (o.isEmpty(i)) return console.error("yungouos sdk error", "付款描述不能为空"), null;var c = { merchant_id: r, out_trade_no: e, account: t, account_name: n, money: u, desc: i },l = d.paySign(c, a);return c.sign = l, o.isEmpty(s) || (c.mch_id = s), c.sign = l, p.post(M.getRePayAliPayUrl, c);}, wxPayConfigAsync: function wxPayConfigAsync(r, e, t, n, o, u, i, s, a) {return G.apply(this, arguments);}, wxPayConfig: function wxPayConfig(r, e, t, n, u, i, s, a, c) {if (o.isEmpty(r)) return console.error("yungouos sdk error", "商户号不能为空"), null;if (o.isEmpty(t)) return console.error("yungouos sdk error", "分账原因不能为空"), null;if (o.isEmpty(c)) return console.error("yungouos sdk error", "支付密钥不能为空"), null;if (o.isEmpty(n) && o.isEmpty(u)) return console.error("yungouos sdk error", "分账收款方openId、收款帐号、收款商户号不能同时为空！"), null;var l = { mch_id: r, reason: t, channel: "wxpay" };o.isEmpty(n) || (l.openId = n), o.isEmpty(u) || (l.receiver_mch_id = u), o.isEmpty(i) || (l.name = i), o.isEmpty(s) || (l.rate = s), o.isEmpty(a) || (l.money = a);var f = d.paySign(l, c);return l.sign = f, o.isEmpty(e) || (l.appId = e), p.post(M.getConfigUrl, l);}, aliPayConfigAsync: function aliPayConfigAsync(r, e, t, n, o, u, i) {return H.apply(this, arguments);}, aliPayConfig: function aliPayConfig(r, e, t, n, u, i, s) {if (o.isEmpty(r)) return console.error("yungouos sdk error", "商户号不能为空"), null;if (o.isEmpty(e)) return console.error("yungouos sdk error", "分账原因不能为空"), null;if (o.isEmpty(t)) return console.error("yungouos sdk error", "分账方支付宝账户不能为空"), null;if (o.isEmpty(n)) return console.error("yungouos sdk error", "分账方支付宝账户姓名不能为空"), null;if (o.isEmpty(s)) return console.error("yungouos sdk error", "支付密钥不能为空"), null;var a = { mch_id: r, reason: e, channel: "alipay", account: t, name: n };o.isEmpty(u) || (a.rate = u), o.isEmpty(i) || (a.money = i);var c = d.paySign(a, s);return a.sign = c, p.post(M.getConfigUrl, a);} },rr = { nativePay: "https://api.pay.yungouos.com/api/pay/merge/nativePay" };function er(r, e, t, n, o, u, i) {try {var s = r[u](i),a = s.value;} catch (r) {return void t(r);}s.done ? e(a) : Promise.resolve(a).then(n, o);}function tr(r) {return function () {var e = this,t = arguments;return new Promise(function (n, o) {var u = r.apply(e, t);function i(r) {er(u, n, o, i, s, "next", r);}function s(r) {er(u, n, o, i, s, "throw", r);}i(void 0);});};}function nr() {return (nr = tr(_regeneratorRuntime.mark(function r(e, t, n, u, i, s, a, c, l, f, y, m) {var g, h, b, v, E;return _regeneratorRuntime.wrap(function (r) {for (;;) {switch (r.prev = r.next) {case 0:if (!o.isEmpty(e)) {r.next = 3;break;}return console.error("yungouos sdk error", "商户订单号不能为空"), r.abrupt("return", null);case 3:if (!o.isEmpty(t)) {r.next = 6;break;}return console.error("yungouos sdk error", "支付金额不能为空"), r.abrupt("return", null);case 6:if (!o.isEmpty(n)) {r.next = 9;break;}return console.error("yungouos sdk error", "商户号不能为空"), r.abrupt("return", null);case 9:if (!o.isEmpty(u)) {r.next = 12;break;}return console.error("yungouos sdk error", "商品名称不能为空"), r.abrupt("return", null);case 12:if (!o.isEmpty(m)) {r.next = 15;break;}return console.error("yungouos sdk error", "支付密钥不能为空"), r.abrupt("return", null);case 15:return g = { out_trade_no: e, total_fee: t, mch_id: n, body: u }, h = d.paySign(g, m), g.sign = h, o.isEmpty(i) || (g.type = i), o.isEmpty(s) || (g.attach = s), o.isEmpty(a) || (g.notify_url = a), o.isEmpty(c) || (g.return_url = c), o.isEmpty(l) || (g.auto = l), o.isEmpty(f) || (g.auto_node = f), o.isEmpty(y) || (g.config_no = y), r.next = 27, p.post(rr.nativePay, g);case 27:if (b = r.sent, v = o.doApiResult(b), !o.isEmpty(v)) {r.next = 31;break;}return r.abrupt("return", null);case 31:if (E = v.data, !o.isEmpty(E)) {r.next = 35;break;}return console.error("yungouos sdk error", "API无返回结果"), r.abrupt("return", null);case 35:return r.abrupt("return", E);case 36:case "end":return r.stop();}}}, r);}))).apply(this, arguments);}var or = { nativePayAsync: function nativePayAsync(r, e, t, n, o, u, i, s, a, c, l, p) {return nr.apply(this, arguments);}, nativePay: function nativePay(r, e, t, n, u, i, s, a, c, l, f, y) {if (o.isEmpty(r)) return console.error("yungouos sdk error", "商户订单号不能为空"), null;if (o.isEmpty(e)) return console.error("yungouos sdk error", "支付金额不能为空"), null;if (o.isEmpty(t)) return console.error("yungouos sdk error", "商户号不能为空"), null;if (o.isEmpty(n)) return console.error("yungouos sdk error", "商品名称不能为空"), null;if (o.isEmpty(y)) return console.error("yungouos sdk error", "支付密钥不能为空"), null;var m = { out_trade_no: r, total_fee: e, mch_id: t, body: n },g = d.paySign(m, y);return m.sign = g, o.isEmpty(u) || (m.type = u), o.isEmpty(i) || (m.attach = i), o.isEmpty(s) || (m.notify_url = s), o.isEmpty(a) || (m.return_url = a), o.isEmpty(c) || (m.auto = c), o.isEmpty(l) || (m.auto_node = l), o.isEmpty(f) || (m.config_no = f), p.post(rr.nativePay, m);} },ur = { getPayOrderInfoUrl: "https://api.pay.yungouos.com/api/system/order/getPayOrderInfo" };function ir(r, e, t, n, o, u, i) {try {var s = r[u](i),a = s.value;} catch (r) {return void t(r);}s.done ? e(a) : Promise.resolve(a).then(n, o);}function sr(r) {return function () {var e = this,t = arguments;return new Promise(function (n, o) {var u = r.apply(e, t);function i(r) {ir(u, n, o, i, s, "next", r);}function s(r) {ir(u, n, o, i, s, "throw", r);}i(void 0);});};}function ar() {return (ar = sr(_regeneratorRuntime.mark(function r(e, t, n) {var u, i, s, a, c;return _regeneratorRuntime.wrap(function (r) {for (;;) {switch (r.prev = r.next) {case 0:if (!o.isEmpty(e)) {r.next = 3;break;}return console.error("yungouos sdk error", "商户订单号不能为空"), r.abrupt("return", null);case 3:if (!o.isEmpty(t)) {r.next = 6;break;}return console.error("yungouos sdk error", "商户号不能为空"), r.abrupt("return", null);case 6:if (!o.isEmpty(n)) {r.next = 9;break;}return console.error("yungouos sdk error", "支付密钥不能为空"), r.abrupt("return", null);case 9:return u = { out_trade_no: e, mch_id: t }, i = d.paySign(u, n), u.sign = i, r.next = 14, p.get(ur.getPayOrderInfoUrl, u);case 14:if (s = r.sent, a = o.doApiResult(s), !o.isEmpty(a)) {r.next = 18;break;}return r.abrupt("return", null);case 18:if (c = a.data, !o.isEmpty(c)) {r.next = 22;break;}return console.error("yungouos sdk error", "API无返回结果"), r.abrupt("return", null);case 22:return r.abrupt("return", c);case 23:case "end":return r.stop();}}}, r);}))).apply(this, arguments);}var cr = { getOrderInfoAsync: function getOrderInfoAsync(r, e, t) {return ar.apply(this, arguments);}, getOrderInfo: function getOrderInfo(r, e, t) {if (o.isEmpty(r)) return console.error("yungouos sdk error", "商户订单号不能为空"), null;if (o.isEmpty(e)) return console.error("yungouos sdk error", "商户号不能为空"), null;if (o.isEmpty(t)) return console.error("yungouos sdk error", "支付密钥不能为空"), null;var n = { out_trade_no: r, mch_id: e },u = d.paySign(n, t);return n.sign = u, p.get(ur.getPayOrderInfoUrl, n);} };}]);});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ })
]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map