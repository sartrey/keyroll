/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/client/index.jsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/client/component/AccessMask.jsx":
/*!*********************************************!*\
  !*** ./lib/client/component/AccessMask.jsx ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _noflux_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @noflux/react */ "./node_modules/@noflux/react/dist/noflux-react.es.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../store */ "./lib/client/store.js");
/* harmony import */ var _design__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./design */ "./lib/client/component/design/index.js");
/* harmony import */ var _AccessMask_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AccessMask.scss */ "./lib/client/component/AccessMask.scss");
/* harmony import */ var _AccessMask_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_AccessMask_scss__WEBPACK_IMPORTED_MODULE_4__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }







var AccessMask = /*#__PURE__*/function (_Component) {
  _inherits(AccessMask, _Component);

  var _super = _createSuper(AccessMask);

  function AccessMask(props) {
    var _this;

    _classCallCheck(this, AccessMask);

    _this = _super.call(this, props);
    _this.state = {
      input: {
        code: ''
      },
      error: null
    };
    return _this;
  }

  _createClass(AccessMask, [{
    key: "changeInput",
    value: function changeInput(key, value) {
      var input = this.state.input;
      input[key] = value;
      this.setState({
        input: input
      });
    }
  }, {
    key: "handleEnter",
    value: function handleEnter(key, action) {
      if (key === 13) action();
    }
  }, {
    key: "randomCode",
    value: function randomCode() {
      throw new Error('not support');
    }
  }, {
    key: "lockDevice",
    value: function lockDevice(device) {
      var _this2 = this;

      var input = this.state.input;
      return _store__WEBPACK_IMPORTED_MODULE_2__["action"].lockDevice({
        device: {
          name: device.name,
          code: input.code
        }
      }).then(function () {})["catch"](function (error) {
        _this2.setState({
          error: error.code
        });
      });
    }
  }, {
    key: "unlockDevice",
    value: function () {
      var _unlockDevice = _asyncToGenerator(function* (device) {
        var input = this.state.input;
        device = yield _store__WEBPACK_IMPORTED_MODULE_2__["action"].unlockDevice({
          device: {
            name: device.name,
            code: input.code
          }
        });
        device.selected = true;
        var devices = _noflux_react__WEBPACK_IMPORTED_MODULE_1__["state"].get('devices').map(function (e) {
          return e.name === device.name ? device : e;
        });
        _noflux_react__WEBPACK_IMPORTED_MODULE_1__["state"].set('devices', devices);
        input.code = '';
        this.setState({
          input: input
        });
      });

      function unlockDevice(_x) {
        return _unlockDevice.apply(this, arguments);
      }

      return unlockDevice;
    }()
  }, {
    key: "renderSecretPanel",
    value: function renderSecretPanel(device) {
      var _this3 = this;

      var _this$state = this.state,
          input = _this$state.input,
          error = _this$state.error;
      if (!device) return;

      if (!device.secure.secret && device.size > 0) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "danger"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "your device is broken"));
      }

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "create secret"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "password",
        value: input.code,
        onChange: function onChange(e) {
          return _this3.changeInput('code', e.target.value);
        },
        onKeyUp: function onKeyUp(e) {
          return _this3.handleEnter(e.keyCode, function () {
            return _this3.lockDevice(device);
          });
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_design__WEBPACK_IMPORTED_MODULE_3__["Button"], {
        onClick: function onClick() {
          return _this3.randomCode();
        }
      }, "random"));
    }
  }, {
    key: "renderAccessPanel",
    value: function renderAccessPanel(device) {
      var _this4 = this;

      var _this$state2 = this.state,
          input = _this$state2.input,
          error = _this$state2.error;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "verify secret"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "password",
        value: input.code,
        onChange: function onChange(e) {
          return _this4.changeInput('code', e.target.value);
        },
        onKeyUp: function onKeyUp(e) {
          return _this4.handleEnter(e.keyCode, function () {
            return _this4.unlockDevice(device);
          });
        }
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var devices = _noflux_react__WEBPACK_IMPORTED_MODULE_1__["state"].get('devices');
      var currentDevice = devices.find(function (e) {
        return e.selected;
      });
      var willBlockAccess = !currentDevice || !currentDevice.secure.secret || currentDevice.secure.locked;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: Object(react__WEBPACK_IMPORTED_MODULE_0__["cls"])('access-mask', !willBlockAccess && 'hide')
      }, currentDevice && currentDevice.secure.secret ? this.renderAccessPanel(currentDevice) : this.renderSecretPanel(currentDevice));
    }
  }]);

  return AccessMask;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_noflux_react__WEBPACK_IMPORTED_MODULE_1__["connect"])(AccessMask));

/***/ }),

/***/ "./lib/client/component/AccessMask.scss":
/*!**********************************************!*\
  !*** ./lib/client/component/AccessMask.scss ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./lib/client/component/DeviceList.jsx":
/*!*********************************************!*\
  !*** ./lib/client/component/DeviceList.jsx ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _noflux_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @noflux/react */ "./node_modules/@noflux/react/dist/noflux-react.es.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../store */ "./lib/client/store.js");
/* harmony import */ var _design__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./design */ "./lib/client/component/design/index.js");
/* harmony import */ var _DeviceList_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DeviceList.scss */ "./lib/client/component/DeviceList.scss");
/* harmony import */ var _DeviceList_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_DeviceList_scss__WEBPACK_IMPORTED_MODULE_4__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }







var DeviceList = /*#__PURE__*/function (_Component) {
  _inherits(DeviceList, _Component);

  var _super = _createSuper(DeviceList);

  function DeviceList() {
    _classCallCheck(this, DeviceList);

    return _super.apply(this, arguments);
  }

  _createClass(DeviceList, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _asyncToGenerator(function* () {
        yield _store__WEBPACK_IMPORTED_MODULE_2__["action"].scanDevices();
      });

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "lockDevice",
    value: function () {
      var _lockDevice = _asyncToGenerator(function* (device) {
        if (device.secure.locked) return;
        device = yield _store__WEBPACK_IMPORTED_MODULE_2__["action"].lockDevice({
          device: {
            name: device.name
          }
        });
        device.selected = true;
        var devices = _noflux_react__WEBPACK_IMPORTED_MODULE_1__["state"].get('devices').map(function (e) {
          return e.name === device.name ? device : e;
        });
        _noflux_react__WEBPACK_IMPORTED_MODULE_1__["state"].set('devices', devices);
      });

      function lockDevice(_x) {
        return _lockDevice.apply(this, arguments);
      }

      return lockDevice;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var devices = _noflux_react__WEBPACK_IMPORTED_MODULE_1__["state"].get('devices');
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "device-list"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, devices.map(function (device) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
          key: device.name,
          onClick: function onClick() {
            return _this.lockDevice(device);
          }
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, device.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_design__WEBPACK_IMPORTED_MODULE_3__["Icon"], {
          name: device.secure.locked ? 'lock' : 'lock_open'
        }));
      })));
    }
  }]);

  return DeviceList;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_noflux_react__WEBPACK_IMPORTED_MODULE_1__["connect"])(DeviceList));

/***/ }),

/***/ "./lib/client/component/DeviceList.scss":
/*!**********************************************!*\
  !*** ./lib/client/component/DeviceList.scss ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./lib/client/component/RecordList.jsx":
/*!*********************************************!*\
  !*** ./lib/client/component/RecordList.jsx ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _higher_editable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./higher/editable */ "./lib/client/component/higher/editable.jsx");
/* harmony import */ var _design__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./design */ "./lib/client/component/design/index.js");
/* harmony import */ var _RecordListItem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./RecordListItem */ "./lib/client/component/RecordListItem.jsx");
/* harmony import */ var _noflux_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @noflux/react */ "./node_modules/@noflux/react/dist/noflux-react.es.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../store */ "./lib/client/store.js");
/* harmony import */ var _RecordList_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./RecordList.scss */ "./lib/client/component/RecordList.scss");
/* harmony import */ var _RecordList_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_RecordList_scss__WEBPACK_IMPORTED_MODULE_6__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }









var RecordListHeader = /*#__PURE__*/function (_Component) {
  _inherits(RecordListHeader, _Component);

  var _super = _createSuper(RecordListHeader);

  function RecordListHeader() {
    _classCallCheck(this, RecordListHeader);

    return _super.apply(this, arguments);
  }

  _createClass(RecordListHeader, [{
    key: "render",
    value: function render() {
      var _this = this;

      var volumn = _noflux_react__WEBPACK_IMPORTED_MODULE_4__["state"].get('volumns').find(function (e) {
        return e.selected;
      });
      console.log('volumn', volumn);

      if (!volumn) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "header"
        }, "empty");
      }

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "header"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "detail"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "logo"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "info"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, volumn.name))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "action"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_design__WEBPACK_IMPORTED_MODULE_2__["Button"], {
        icon: "add",
        onClick: function onClick() {
          return _this.parent.createItem();
        }
      }, "add record")));
    }
  }]);

  return RecordListHeader;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_higher_editable__WEBPACK_IMPORTED_MODULE_1__["createEditableList"])([_RecordListItem__WEBPACK_IMPORTED_MODULE_3__["default"], Object(_noflux_react__WEBPACK_IMPORTED_MODULE_4__["connect"])(RecordListHeader)], {
  entityName: 'record',
  entityKey: 'id',
  dataSource: {
    source: function source() {
      return _noflux_react__WEBPACK_IMPORTED_MODULE_4__["state"].get('records');
    },
    select: function select() {},
    "delete": function () {
      var _delete2 = _asyncToGenerator(function* (item) {
        var device = _noflux_react__WEBPACK_IMPORTED_MODULE_4__["state"].get('devices').find(function (e) {
          return e.selected;
        });
        var volumn = _noflux_react__WEBPACK_IMPORTED_MODULE_4__["state"].get('volumns').find(function (e) {
          return e.selected;
        });
        var records = _noflux_react__WEBPACK_IMPORTED_MODULE_4__["state"].get('records');
        yield _store__WEBPACK_IMPORTED_MODULE_5__["action"].killRecord({
          device: {
            name: device.name
          },
          volumn: {
            name: volumn.name
          },
          record: {
            id: item.id
          }
        });
        var index = records.findIndex(function (e) {
          return e.id === item.id;
        });

        if (index >= 0) {
          _noflux_react__WEBPACK_IMPORTED_MODULE_4__["state"].cursor('records').splice(index, 1);
        }
      });

      function _delete(_x) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }(),
    update: function () {
      var _update = _asyncToGenerator(function* (item, next) {
        var device = _noflux_react__WEBPACK_IMPORTED_MODULE_4__["state"].get('devices').find(function (e) {
          return e.selected;
        });
        var volumn = _noflux_react__WEBPACK_IMPORTED_MODULE_4__["state"].get('volumns').find(function (e) {
          return e.selected;
        });

        var record = _objectSpread({}, next);

        if (item.$temp) {
          record.id = undefined;
        }

        yield _store__WEBPACK_IMPORTED_MODULE_5__["action"].editRecord({
          device: {
            name: device.name
          },
          volumn: {
            name: volumn.name
          },
          record: record
        }).then(function (result) {
          record.id = result.id; // todo - show value ?
        });

        if (item.$temp) {
          _noflux_react__WEBPACK_IMPORTED_MODULE_4__["state"].cursor('records').push(record);
        } else {
          var records = _noflux_react__WEBPACK_IMPORTED_MODULE_4__["state"].get('records');
          var index = records.findIndex(function (e) {
            return e.id === item.id;
          });
          _noflux_react__WEBPACK_IMPORTED_MODULE_4__["state"].cursor('records').splice(index, 1, record);
        }

        return next;
      });

      function update(_x2, _x3) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }
}));

/***/ }),

/***/ "./lib/client/component/RecordList.scss":
/*!**********************************************!*\
  !*** ./lib/client/component/RecordList.scss ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./lib/client/component/RecordListItem.jsx":
/*!*************************************************!*\
  !*** ./lib/client/component/RecordListItem.jsx ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _design__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./design */ "./lib/client/component/design/index.js");
/* harmony import */ var _higher_editable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./higher/editable */ "./lib/client/component/higher/editable.jsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }





var RecordEditor = /*#__PURE__*/function (_Component) {
  _inherits(RecordEditor, _Component);

  var _super = _createSuper(RecordEditor);

  function RecordEditor() {
    _classCallCheck(this, RecordEditor);

    return _super.apply(this, arguments);
  }

  _createClass(RecordEditor, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          model = _this$props.model,
          input = _this$props.input,
          _onChange = _this$props.onChange,
          onUpdate = _this$props.onUpdate,
          onCancel = _this$props.onCancel;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_design__WEBPACK_IMPORTED_MODULE_1__["Input"], {
        placeholder: "name",
        defaultValue: model.name,
        onChange: function onChange(e) {
          return _onChange('name', e.target.value);
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_design__WEBPACK_IMPORTED_MODULE_1__["Input"], {
        placeholder: "value",
        defaultValue: model.value,
        onChange: function onChange(e) {
          return _onChange('value', e.target.value);
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "checkbox",
        checked: input.seal,
        onChange: function onChange(e) {
          return _onChange('seal', e.target.checked);
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_design__WEBPACK_IMPORTED_MODULE_1__["Button"], {
        icon: "save",
        onClick: onUpdate
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_design__WEBPACK_IMPORTED_MODULE_1__["Button"], {
        icon: "close",
        onClick: onCancel
      })));
    }
  }]);

  return RecordEditor;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

var RecordViewer = /*#__PURE__*/function (_Component2) {
  _inherits(RecordViewer, _Component2);

  var _super2 = _createSuper(RecordViewer);

  function RecordViewer(props) {
    var _this;

    _classCallCheck(this, RecordViewer);

    _this = _super2.call(this, props);
    _this.state = {
      model: {
        unsealedValue: false
      }
    };
    return _this;
  }

  _createClass(RecordViewer, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          model = _this$props2.model,
          onActive = _this$props2.onActive,
          onRemove = _this$props2.onRemove,
          onSelect = _this$props2.onSelect;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "record-viewer",
        onClick: onSelect
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "field-name"
      }, model.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "type = ", model.type), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "field-value"
      }, model.seal ? this.state.model.unsealedValue && '***' : model.value), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_design__WEBPACK_IMPORTED_MODULE_1__["Button"], {
        icon: "edit",
        onClick: onActive
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_design__WEBPACK_IMPORTED_MODULE_1__["Button"], {
        icon: "delete",
        onClick: onRemove
      }));
    }
  }]);

  return RecordViewer;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_higher_editable__WEBPACK_IMPORTED_MODULE_2__["createEditableListItem"])([RecordEditor, RecordViewer], {
  entityName: 'record'
}));

/***/ }),

/***/ "./lib/client/component/VolumnList.jsx":
/*!*********************************************!*\
  !*** ./lib/client/component/VolumnList.jsx ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _noflux_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @noflux/react */ "./node_modules/@noflux/react/dist/noflux-react.es.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../store */ "./lib/client/store.js");
/* harmony import */ var _higher_editable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./higher/editable */ "./lib/client/component/higher/editable.jsx");
/* harmony import */ var _design__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./design */ "./lib/client/component/design/index.js");
/* harmony import */ var _VolumnListItem__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./VolumnListItem */ "./lib/client/component/VolumnListItem.jsx");
/* harmony import */ var _VolumnList_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./VolumnList.scss */ "./lib/client/component/VolumnList.scss");
/* harmony import */ var _VolumnList_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_VolumnList_scss__WEBPACK_IMPORTED_MODULE_6__);
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }









var VolumnListHeader = /*#__PURE__*/function (_Component) {
  _inherits(VolumnListHeader, _Component);

  var _super = _createSuper(VolumnListHeader);

  function VolumnListHeader() {
    _classCallCheck(this, VolumnListHeader);

    return _super.apply(this, arguments);
  }

  _createClass(VolumnListHeader, [{
    key: "render",
    value: function render() {
      var _this = this;

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "header"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_design__WEBPACK_IMPORTED_MODULE_4__["Input"], {
        onChange: function onChange(e) {
          return _this.filterVolumn(e.target.value);
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_design__WEBPACK_IMPORTED_MODULE_4__["Button"], {
        icon: "add",
        onClick: function onClick() {
          return _this.parent.createItem();
        }
      }));
    }
  }]);

  return VolumnListHeader;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_higher_editable__WEBPACK_IMPORTED_MODULE_3__["createEditableList"])([_VolumnListItem__WEBPACK_IMPORTED_MODULE_5__["default"], VolumnListHeader], {
  entityName: 'volumn',
  entityKey: 'name',
  dataSource: {
    source: function source() {
      return _noflux_react__WEBPACK_IMPORTED_MODULE_1__["state"].get('volumns');
    },
    select: function () {
      var _select = _asyncToGenerator(function* (item) {
        var volumns = _noflux_react__WEBPACK_IMPORTED_MODULE_1__["state"].get('volumns').map(function (e) {
          if (e.name === item.name) {
            item.selected = true;
            return item;
          }

          e.selected = false;
          return e;
        });
        _noflux_react__WEBPACK_IMPORTED_MODULE_1__["state"].set('volumns', volumns);
        var device = _noflux_react__WEBPACK_IMPORTED_MODULE_1__["state"].get('devices').find(function (e) {
          return e.selected;
        });
        yield _store__WEBPACK_IMPORTED_MODULE_2__["action"].findRecords({
          device: {
            name: device.name
          },
          volumn: {
            name: item.name
          }
        });
      });

      function select(_x) {
        return _select.apply(this, arguments);
      }

      return select;
    }(),
    "delete": function () {
      var _delete2 = _asyncToGenerator(function* (item) {
        var device = _noflux_react__WEBPACK_IMPORTED_MODULE_1__["state"].get('devices').find(function (e) {
          return e.selected;
        });
        yield _store__WEBPACK_IMPORTED_MODULE_2__["action"].killVolumn({
          device: {
            name: device.name
          },
          volumn: {
            name: item.name
          }
        });
        yield _store__WEBPACK_IMPORTED_MODULE_2__["action"].findVolumns({
          device: {
            name: device.name
          }
        });
      });

      function _delete(_x2) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }(),
    update: function () {
      var _update = _asyncToGenerator(function* (item, next) {
        var device = _noflux_react__WEBPACK_IMPORTED_MODULE_1__["state"].get('devices').find(function (e) {
          return e.selected;
        });
        yield _store__WEBPACK_IMPORTED_MODULE_2__["action"].editVolumn({
          device: {
            name: device.name
          },
          volumn: next
        });
        yield _store__WEBPACK_IMPORTED_MODULE_2__["action"].findVolumns({
          device: {
            name: device.name
          }
        });
        return next;
      });

      function update(_x3, _x4) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }
}));

/***/ }),

/***/ "./lib/client/component/VolumnList.scss":
/*!**********************************************!*\
  !*** ./lib/client/component/VolumnList.scss ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./lib/client/component/VolumnListItem.jsx":
/*!*************************************************!*\
  !*** ./lib/client/component/VolumnListItem.jsx ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _design__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./design */ "./lib/client/component/design/index.js");
/* harmony import */ var _higher_editable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./higher/editable */ "./lib/client/component/higher/editable.jsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }





var VolumnEditor = /*#__PURE__*/function (_Component) {
  _inherits(VolumnEditor, _Component);

  var _super = _createSuper(VolumnEditor);

  function VolumnEditor() {
    _classCallCheck(this, VolumnEditor);

    return _super.apply(this, arguments);
  }

  _createClass(VolumnEditor, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          model = _this$props.model,
          _onChange = _this$props.onChange,
          onUpdate = _this$props.onUpdate,
          onCancel = _this$props.onCancel;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_design__WEBPACK_IMPORTED_MODULE_1__["Input"], {
        defaultValue: model.name,
        onChange: function onChange(e) {
          return _onChange('name', e.target.value);
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_design__WEBPACK_IMPORTED_MODULE_1__["Button"], {
        icon: "save",
        onClick: onUpdate
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_design__WEBPACK_IMPORTED_MODULE_1__["Button"], {
        icon: "close",
        onClick: onCancel
      }));
    }
  }]);

  return VolumnEditor;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

var VolumnViewer = /*#__PURE__*/function (_Component2) {
  _inherits(VolumnViewer, _Component2);

  var _super2 = _createSuper(VolumnViewer);

  function VolumnViewer() {
    _classCallCheck(this, VolumnViewer);

    return _super2.apply(this, arguments);
  }

  _createClass(VolumnViewer, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          model = _this$props2.model,
          onActive = _this$props2.onActive,
          onRemove = _this$props2.onRemove,
          onSelect = _this$props2.onSelect,
          selected = _this$props2.selected;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "viewer",
        onClick: onSelect
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "logo"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "info"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, model.name), selected && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "action"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_design__WEBPACK_IMPORTED_MODULE_1__["Button"], {
        size: "small",
        icon: "edit",
        onClick: onActive
      }, "edit"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_design__WEBPACK_IMPORTED_MODULE_1__["Button"], {
        size: "small",
        icon: "delete",
        onClick: onRemove
      }, "remove"))));
    }
  }]);

  return VolumnViewer;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_higher_editable__WEBPACK_IMPORTED_MODULE_2__["createEditableListItem"])([VolumnEditor, VolumnViewer], {
  entityName: 'volumn'
}));

/***/ }),

/***/ "./lib/client/component/design/Button.jsx":
/*!************************************************!*\
  !*** ./lib/client/component/design/Button.jsx ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Button; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Icon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Icon */ "./lib/client/component/design/Icon.jsx");
/* harmony import */ var _Button_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Button.scss */ "./lib/client/component/design/Button.scss");
/* harmony import */ var _Button_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Button_scss__WEBPACK_IMPORTED_MODULE_2__);



function Button(props) {
  var size = props.size,
      icon = props.icon,
      children = props.children;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    className: Object(react__WEBPACK_IMPORTED_MODULE_0__["cls"])('button', size),
    onClick: props.onClick
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Icon__WEBPACK_IMPORTED_MODULE_1__["default"], {
    name: icon
  }), children && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, children));
}

/***/ }),

/***/ "./lib/client/component/design/Button.scss":
/*!*************************************************!*\
  !*** ./lib/client/component/design/Button.scss ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./lib/client/component/design/Icon.jsx":
/*!**********************************************!*\
  !*** ./lib/client/component/design/Icon.jsx ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Icon; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Icon_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Icon.scss */ "./lib/client/component/design/Icon.scss");
/* harmony import */ var _Icon_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Icon_scss__WEBPACK_IMPORTED_MODULE_1__);


function Icon(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "icon"
  }, props.name);
}

/***/ }),

/***/ "./lib/client/component/design/Icon.scss":
/*!***********************************************!*\
  !*** ./lib/client/component/design/Icon.scss ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./lib/client/component/design/Input.jsx":
/*!***********************************************!*\
  !*** ./lib/client/component/design/Input.jsx ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Input; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Input_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Input.scss */ "./lib/client/component/design/Input.scss");
/* harmony import */ var _Input_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Input_scss__WEBPACK_IMPORTED_MODULE_1__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




var Input = /*#__PURE__*/function (_Component) {
  _inherits(Input, _Component);

  var _super = _createSuper(Input);

  function Input() {
    _classCallCheck(this, Input);

    return _super.apply(this, arguments);
  }

  _createClass(Input, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          type = _this$props.type,
          defaultValue = _this$props.defaultValue,
          onChange = _this$props.onChange;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        className: "input",
        defaultValue: defaultValue,
        onChange: onChange
      });
    }
  }]);

  return Input;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



/***/ }),

/***/ "./lib/client/component/design/Input.scss":
/*!************************************************!*\
  !*** ./lib/client/component/design/Input.scss ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./lib/client/component/design/index.js":
/*!**********************************************!*\
  !*** ./lib/client/component/design/index.js ***!
  \**********************************************/
/*! exports provided: Button, Icon, Input */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Button */ "./lib/client/component/design/Button.jsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Button", function() { return _Button__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _Icon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Icon */ "./lib/client/component/design/Icon.jsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Icon", function() { return _Icon__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _Input__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Input */ "./lib/client/component/design/Input.jsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Input", function() { return _Input__WEBPACK_IMPORTED_MODULE_2__["default"]; });








/***/ }),

/***/ "./lib/client/component/higher/editable.jsx":
/*!**************************************************!*\
  !*** ./lib/client/component/higher/editable.jsx ***!
  \**************************************************/
/*! exports provided: createEditableListItem, createEditableList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createEditableListItem", function() { return createEditableListItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createEditableList", function() { return createEditableList; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _noflux_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @noflux/react */ "./node_modules/@noflux/react/dist/noflux-react.es.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



function createEditableListItem(components, options) {
  var _components = _slicedToArray(components, 2),
      Editor = _components[0],
      Viewer = _components[1];

  var entityName = options.entityName,
      validator = options.validator;
  var className = "".concat(entityName, "-list-item");

  var EditableListItem = /*#__PURE__*/function (_Component) {
    _inherits(EditableListItem, _Component);

    var _super = _createSuper(EditableListItem);

    function EditableListItem(props) {
      var _this;

      _classCallCheck(this, EditableListItem);

      _this = _super.call(this, props);
      var model = props.model;
      _this.state = {
        input: model.$temp ? {} : _objectSpread({}, model),
        error: null,
        stage: model.$temp ? 'editor' : 'viewer'
      };
      return _this;
    }

    _createClass(EditableListItem, [{
      key: "changeInput",
      value: function changeInput(key, value) {
        var input = this.state.input;
        input[key] = value;
        this.setState({
          input: input
        });
      }
    }, {
      key: "activeInput",
      value: function activeInput() {
        this.setState({
          stage: 'editor'
        });
      }
    }, {
      key: "cancelInput",
      value: function cancelInput() {
        var model = this.props.model; // todo - confirm unsaved

        if (model.$temp) {
          // only remove temp item
          this.raiseRemove();
        } else {
          this.setState({
            stage: 'viewer'
          });
        }
      }
    }, {
      key: "raiseSelect",
      value: function raiseSelect() {
        if (this.props.onSelect) {
          this.props.onSelect();
        }
      }
    }, {
      key: "raiseRemove",
      value: function raiseRemove() {
        if (this.props.onRemove) {
          this.props.onRemove();
        }
      }
    }, {
      key: "raiseUpdate",
      value: function raiseUpdate() {
        var input = this.state.input;

        if (validator) {
          var error = validator(input);
          this.setState({
            error: error
          });

          if (error) {
            console.error(error);
            return;
          }
        }

        this.setState({
          stage: 'viewer'
        });

        if (this.props.onUpdate) {
          this.props.onUpdate(input);
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var _this$state = this.state,
            stage = _this$state.stage,
            input = _this$state.input;
        var _this$props = this.props,
            model = _this$props.model,
            selected = _this$props.selected;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
          className: Object(react__WEBPACK_IMPORTED_MODULE_0__["cls"])(className, selected && 'active')
        }, stage === 'editor' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Editor, {
          model: model,
          input: input,
          onCancel: function onCancel() {
            return _this2.cancelInput();
          },
          onUpdate: function onUpdate() {
            return _this2.raiseUpdate();
          },
          onChange: function onChange(key, value) {
            return _this2.changeInput(key, value);
          }
        }), stage === 'viewer' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Viewer, {
          model: model,
          selected: selected,
          onSelect: function onSelect() {
            return _this2.raiseSelect();
          },
          onActive: function onActive() {
            return _this2.activeInput();
          },
          onRemove: function onRemove() {
            return _this2.raiseRemove();
          }
        }));
      }
    }]);

    return EditableListItem;
  }(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

  return EditableListItem;
}
function createEditableList(components, options) {
  var _components2 = _slicedToArray(components, 3),
      EditableListItem = _components2[0],
      HeaderView = _components2[1],
      FooterView = _components2[2];

  var entityName = options.entityName,
      _options$entityKey = options.entityKey,
      entityKey = _options$entityKey === void 0 ? 'key' : _options$entityKey,
      dataSource = options.dataSource;
  var className = "".concat(entityName, "-list");

  var EditableList = /*#__PURE__*/function (_Component2) {
    _inherits(EditableList, _Component2);

    var _super2 = _createSuper(EditableList);

    function EditableList(props) {
      var _this3;

      _classCallCheck(this, EditableList);

      _this3 = _super2.call(this, props);
      _this3.state = {
        model: []
      };
      _this3.idgen = 1;
      if (HeaderView) HeaderView.prototype.parent = _assertThisInitialized(_this3);
      if (FooterView) FooterView.prototype.parent = _assertThisInitialized(_this3);
      return _this3;
    }

    _createClass(EditableList, [{
      key: "createItem",
      value: function createItem() {
        var model = this.state.model;
        model.unshift({
          $temp: this.idgen
        });
        this.idgen += 1;
        this.setState({
          model: model
        });
      }
    }, {
      key: "selectItem",
      value: function () {
        var _selectItem = _asyncToGenerator(function* (item) {
          yield dataSource.select(item);
        });

        function selectItem(_x) {
          return _selectItem.apply(this, arguments);
        }

        return selectItem;
      }()
    }, {
      key: "removeItem",
      value: function () {
        var _removeItem = _asyncToGenerator(function* (item) {
          if (!item.$temp) {
            yield dataSource["delete"](item);
          }

          var model = this.state.model;
          var i = model.indexOf(item);

          if (i >= 0) {
            model.splice(i, 1);
            this.setState({
              model: model
            });
          }
        });

        function removeItem(_x2) {
          return _removeItem.apply(this, arguments);
        }

        return removeItem;
      }()
    }, {
      key: "updateItem",
      value: function () {
        var _updateItem = _asyncToGenerator(function* (item, next) {
          var result = yield dataSource.update(item, next);
          var model = this.state.model;
          var i = model.indexOf(item);

          if (i >= 0) {
            model.splice(i, 1, result);
            this.setState({
              model: model
            });
          }
        });

        function updateItem(_x3, _x4) {
          return _updateItem.apply(this, arguments);
        }

        return updateItem;
      }()
    }, {
      key: "reconcileModel",
      value: function reconcileModel() {
        var innerModel = this.state.model;
        var outerModel = dataSource.source();
        var model = [];
        innerModel.forEach(function (e) {
          if (e.$temp) model.push(e);
        });
        outerModel.forEach(function (eo) {
          var e = innerModel.find(function (ei) {
            return ei[entityKey] === eo[entityKey];
          });
          model.push(e || eo);
        });
        return model;
      }
    }, {
      key: "render",
      value: function render() {
        var _this4 = this;

        var model = this.reconcileModel();
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: className
        }, HeaderView && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(HeaderView, null), model.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, model.map(function (item) {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(EditableListItem, {
            key: item[entityKey] || "temp-".concat(item.$temp),
            model: item,
            selected: item.selected,
            onSelect: function onSelect() {
              return _this4.selectItem(item);
            },
            onRemove: function onRemove() {
              return _this4.removeItem(item);
            },
            onUpdate: function onUpdate(input) {
              return _this4.updateItem(item, input);
            }
          });
        })), FooterView && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FooterView, null));
      }
    }]);

    return EditableList;
  }(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

  return Object(_noflux_react__WEBPACK_IMPORTED_MODULE_1__["connect"])(EditableList);
}

/***/ }),

/***/ "./lib/client/index.jsx":
/*!******************************!*\
  !*** ./lib/client/index.jsx ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _noflux_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @noflux/react */ "./node_modules/@noflux/react/dist/noflux-react.es.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./store */ "./lib/client/store.js");
/* harmony import */ var _component_DeviceList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./component/DeviceList */ "./lib/client/component/DeviceList.jsx");
/* harmony import */ var _component_VolumnList__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./component/VolumnList */ "./lib/client/component/VolumnList.jsx");
/* harmony import */ var _component_RecordList__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./component/RecordList */ "./lib/client/component/RecordList.jsx");
/* harmony import */ var _component_AccessMask__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./component/AccessMask */ "./lib/client/component/AccessMask.jsx");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./index.scss */ "./lib/client/index.scss");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_index_scss__WEBPACK_IMPORTED_MODULE_7__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



react__WEBPACK_IMPORTED_MODULE_0___default.a.cls = function concatClassNames() {
  var names = arguments;

  if (arguments.length === 1) {
    names = arguments[0];
  } else {
    names = Array.prototype.slice.call(arguments);
  }

  if (Array.isArray(names)) {
    return names.filter(Boolean).join(' ');
  }

  return names;
};









var App = /*#__PURE__*/function (_Component) {
  _inherits(App, _Component);

  var _super = _createSuper(App);

  function App(props) {
    var _this;

    _classCallCheck(this, App);

    _this = _super.call(this, props);
    _store__WEBPACK_IMPORTED_MODULE_2__["default"].initialize();
    return _this;
  }

  _createClass(App, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "container"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "side"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "header"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "KeyRoll")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_component_DeviceList__WEBPACK_IMPORTED_MODULE_3__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "main"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_component_VolumnList__WEBPACK_IMPORTED_MODULE_4__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_component_RecordList__WEBPACK_IMPORTED_MODULE_5__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_component_AccessMask__WEBPACK_IMPORTED_MODULE_6__["default"], null)));
    }
  }]);

  return App;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_noflux_react__WEBPACK_IMPORTED_MODULE_1__["connect"])(App));;(function(){if (typeof window !== 'undefined' && window) {
  if (!window.epii) window.epii = {};
  if (typeof __webpack_exports__ !== 'undefined' && __webpack_exports__) {
    var capture = __webpack_exports__.default;
    if (!capture) {
      var keys = Object.keys(__webpack_exports__);
      if (keys.length > 0) {
        capture = __webpack_exports__[keys[0]];
      }
    }
    window.epii.entry = capture;
  } else {
    console.error('settle-loader error :: __webpack_exports__ not found');
  }
};__webpack_require__(/*! react-dom */ "react-dom");}());

/***/ }),

/***/ "./lib/client/index.scss":
/*!*******************************!*\
  !*** ./lib/client/index.scss ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./lib/client/store.js":
/*!*****************************!*\
  !*** ./lib/client/store.js ***!
  \*****************************/
/*! exports provided: initialize, raiseQuery, action, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialize", function() { return initialize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "raiseQuery", function() { return raiseQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "action", function() { return actionHandler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return store; });
/* harmony import */ var whatwg_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! whatwg-fetch */ "./node_modules/whatwg-fetch/fetch.js");
/* harmony import */ var _noflux_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @noflux/react */ "./node_modules/@noflux/react/dist/noflux-react.es.js");



function raiseQuery(action, payload) {
  console.warn(`action [${action}] <=`, payload)
  const apiPath = `/__/data/${action}`;
  return fetch(apiPath, {
    method: 'POST',
    body: JSON.stringify(payload),
    // headers: {}
  })
    .then(response => response.json())
    .then(json => {
      if (json.state === 0) {
        console.warn(`action [${action}] =>`, json.model);
        return json.model;
      }
      console.error(`action [${action}] =>`, json.error);
      console.warn(json.stack);
      throw new Error('server error');
    });
}

function initialize() {
  _noflux_react__WEBPACK_IMPORTED_MODULE_1__["state"].set({
    devices: [],
    volumns: [],
    records: [],
  });
}

const stateActions = {
  scanDevices: async (model) => {
    const devices = model;
    if (devices.length > 0) {
      const device = devices[0];
      device.selected = true;
      await actionHandler.findVolumns({
        device: { name: device.name }
      });
    }
    _noflux_react__WEBPACK_IMPORTED_MODULE_1__["state"].set('devices', devices);
  },

  lockDevice: (model) => {
    const device = model;
    const devices = _noflux_react__WEBPACK_IMPORTED_MODULE_1__["state"].get('devices')
      .map(e => e.name === device.name ? device : e);
    _noflux_react__WEBPACK_IMPORTED_MODULE_1__["state"].set('devices', devices);
  },

  unlockDevice: (model) => {
    const device = model;
    const devices = _noflux_react__WEBPACK_IMPORTED_MODULE_1__["state"].get('devices')
      .map(e => e.name === device.name ? device : e);
    _noflux_react__WEBPACK_IMPORTED_MODULE_1__["state"].set('devices', devices);
  },
  
  findVolumns: (model) => {
    const volumns = model;
    _noflux_react__WEBPACK_IMPORTED_MODULE_1__["state"].set('volumns', volumns);
  },

  findRecords: (model) => {
    const records = model;
    _noflux_react__WEBPACK_IMPORTED_MODULE_1__["state"].set('records', records);
  },

  killRecord: (model) => {
  }
};

const actionHandler = new Proxy({}, {
  get: (o, prop) => {
    // todo - use o to do sth magic
    return async (payload) => {
      const model = await raiseQuery(prop, payload);
      const stateAction = stateActions[prop];
      if (stateAction) {
        await stateAction(model);
      }
      return model;
    }
  }
});

const store = {
  initialize,
  raiseQuery,
  action: actionHandler,
};



// export function findRecord(query) {
//   return fetchData('findRecord', query);
// }

// export function findRecords(query) {
//   return fetchData('findRecords', query);
// }

// export function killRecord(query, model) {
//   return fetchData('killRecord', query, model)
//     .then(result => {
//       console.log('killRecord', result);
//     });
// }

/***/ }),

/***/ "./node_modules/@noflux/react/dist/noflux-react.es.js":
/*!************************************************************!*\
  !*** ./node_modules/@noflux/react/dist/noflux-react.es.js ***!
  \************************************************************/
/*! exports provided: state, connect */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "state", function() { return state; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "connect", function() { return connect; });
/* harmony import */ var _noflux_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @noflux/state */ "./node_modules/@noflux/state/dist/noflux-state.es.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/*
 * @license
 * @noflux/react v1.0.0
 * (c) 2017-2018 Malash <i@malash.me>
 * Released under the MIT License.
 */



var state = new _noflux_state__WEBPACK_IMPORTED_MODULE_0__["State"]();

var __DEV__ = "development" !== 'production';

/* global performance */
var timer = typeof performance !== 'undefined' && performance && performance.now ? performance : Date;

var isReactComponent = function isReactComponent(Component$$1) {
  return Boolean(Component$$1 && Component$$1.prototype && typeof Component$$1.prototype.render === 'function');
};

var isReactComponentInstance = function isReactComponentInstance(instance) {
  return Boolean(instance && typeof instance.render === 'function');
};

var getComponentName = function getComponentName(Component$$1) {
  var constructor = Component$$1.prototype && Component$$1.prototype.constructor;
  return Component$$1.displayName || constructor && constructor.displayName || Component$$1.name || constructor && constructor.name || 'Component';
};

// detect if the component is rendering from the client or the server
// copy from fbjs/lib/ExecutionEnvironment
// https://github.com/facebook/fbjs/blob/38bf26f4e6ea64d7ff68393919fb5e98f5ceac3b/packages/fbjs/src/core/ExecutionEnvironment.js#L12-L16
var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

var hasSymbol = typeof Symbol === 'function' && Symbol.for;

var SYMBOL_NOFLUX = hasSymbol ? Symbol.for('noflux') : '__noflux';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var connectComponent = function connectComponent(Target) {
  if (Target[SYMBOL_NOFLUX]) {
    throw new SyntaxError('You should not use @connect for component ' + getComponentName(Target) + ' more than once.');
  }
  Target[SYMBOL_NOFLUX] = {};

  // skip event listening for server-side rendering
  if (!canUseDOM) {
    return Target;
  }

  var ConnectedComponent = function (_Target) {
    inherits(ConnectedComponent, _Target);

    function ConnectedComponent(props) {
      classCallCheck(this, ConnectedComponent);

      // init
      var _this = possibleConstructorReturn(this, (ConnectedComponent.__proto__ || Object.getPrototypeOf(ConnectedComponent)).call(this, props));

      _this[SYMBOL_NOFLUX] = {
        getPaths: {},
        onSetDisposers: [],
        mounted: false,
        isForcingUpdate: false
      };
      var __noflux = _this[SYMBOL_NOFLUX];

      var onSet = function onSet() {
        // skip re-render after unmounting component
        // TODO: test this guard
        if (!__noflux.mounted) return;

        // skip duplicate forceUpdate calling
        if (__noflux.isForcingUpdate) return;
        __noflux.isForcingUpdate = true;

        var startTime = timer.now();
        _this.forceUpdate(function () {
          __noflux.isForcingUpdate = false;

          var endTime = timer.now();
          var cost = endTime - startTime;
          if (__DEV__) {
            // eslint-disable-next-line no-console
            console.log('[noflux] ' + getComponentName(Target) + ' rendering time ' + cost.toFixed(3) + ' ms');
          }
        });
      };
      __noflux.onGetDisposer = state.on('get', function (_ref) {
        var path = _ref.path;

        if (__noflux.isRendering && !__noflux.getPaths[path]) {
          __noflux.getPaths[path] = true;
          // register cursor on set handler
          __noflux.onSetDisposers.push(state.cursor(path).on('set', onSet));
        }
      });
      return _this;
    }

    createClass(ConnectedComponent, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        // set component mounted flag
        this[SYMBOL_NOFLUX].mounted = true;

        // call origin componentDidMount
        if (get(ConnectedComponent.prototype.__proto__ || Object.getPrototypeOf(ConnectedComponent.prototype), 'componentDidMount', this)) {
          get(ConnectedComponent.prototype.__proto__ || Object.getPrototypeOf(ConnectedComponent.prototype), 'componentDidMount', this).call(this);
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        var __noflux = this[SYMBOL_NOFLUX];
        // dispose cursor on set listeners
        __noflux.onSetDisposers.forEach(function (disposer) {
          return disposer();
        });

        // dispose get listener
        __noflux.onGetDisposer();

        // reset component mounted flag
        __noflux.mounted = false;

        // call origin componentWillUnmount
        if (get(ConnectedComponent.prototype.__proto__ || Object.getPrototypeOf(ConnectedComponent.prototype), 'componentWillUnmount', this)) {
          get(ConnectedComponent.prototype.__proto__ || Object.getPrototypeOf(ConnectedComponent.prototype), 'componentWillUnmount', this).call(this);
        }
      }
    }, {
      key: 'render',
      value: function render() {
        if (!get(ConnectedComponent.prototype.__proto__ || Object.getPrototypeOf(ConnectedComponent.prototype), 'render', this)) {
          throw new Error('No render method found on the returned component instance of ' + getComponentName(Target) + ', you may have forgotten to define render.');
        }

        var __noflux = this[SYMBOL_NOFLUX];
        __noflux.isRendering = true;
        var vdom = get(ConnectedComponent.prototype.__proto__ || Object.getPrototypeOf(ConnectedComponent.prototype), 'render', this).call(this);
        __noflux.isRendering = false;
        return vdom;
      }
    }]);
    return ConnectedComponent;
  }(Target);

  ConnectedComponent.displayName = 'Connect(' + getComponentName(Target) + ')';

  return ConnectedComponent;
};

var connect = function connect(target, prop, descriptor) {
  if (!target) {
    throw new TypeError('@connect() is invalid, do you mean @connect ?');
  }
  if (isReactComponentInstance(target) && prop && descriptor) {
    throw new SyntaxError('@connect should not be used for component method.');
  }
  if (!isReactComponent(target)) {
    if (typeof target !== 'function') {
      throw new TypeError('@connect should be used for React component');
    }

    var ConnectedComponent = function (_Component) {
      inherits(ConnectedComponent, _Component);

      function ConnectedComponent() {
        classCallCheck(this, ConnectedComponent);
        return possibleConstructorReturn(this, (ConnectedComponent.__proto__ || Object.getPrototypeOf(ConnectedComponent)).apply(this, arguments));
      }

      createClass(ConnectedComponent, [{
        key: 'render',
        value: function render() {
          return target.call(this, this.props, this.context);
        }
      }]);
      return ConnectedComponent;
    }(react__WEBPACK_IMPORTED_MODULE_1__["Component"]);

    ConnectedComponent.displayName = 'Connect(' + getComponentName(target) + ')';
    ConnectedComponent.contextTypes = target.contextTypes;
    ConnectedComponent.propTypes = target.propTypes;
    ConnectedComponent.defaultProps = target.defaultProps;

    return connectComponent(ConnectedComponent);
  }
  return connectComponent(target);
};




/***/ }),

/***/ "./node_modules/@noflux/state/dist/noflux-state.es.js":
/*!************************************************************!*\
  !*** ./node_modules/@noflux/state/dist/noflux-state.es.js ***!
  \************************************************************/
/*! exports provided: State, Store */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "State", function() { return State; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/*
 * @license
 * @noflux/state v1.0.1
 * (c) 2017-2018 Malash <i@malash.me>
 * Released under the MIT License.
 */
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var SYMBOL_NOFLUX = '__noflux';

/*
 * JSON Pointer style escape
 * http://tools.ietf.org/html/rfc6901
 */
var escapePath = function escapePath(path) {
  return path.replace(/~/g, '~1').replace(/\./g, '~0');
};
var unescapePath = function unescapePath(path) {
  return path.replace(/~0/g, '.').replace(/~1/g, '~');
};

var parsePath = function parsePath(path) {
  if (Array.isArray(path)) {
    return path;
  }
  if (typeof path === 'string') {
    if (!path.length) {
      return [];
    }
    // path with dot, e.g. 'a~1b.c' => ['a.b', 'c']
    if (path.indexOf('~') !== -1) {
      return path.split('.').map(unescapePath);
    }
    return path.split('.');
  }
  throw Error('State.prototype.cursor only accept string or array, ' + (typeof path === 'undefined' ? 'undefined' : _typeof(path)) + ' is forbidden');
};

var stringifyPath = function stringifyPath(path) {
  if (typeof path === 'string') {
    return path;
  }
  if (Array.isArray(path)) {
    // path with dot, e.g. ['a.b', 'c'] => 'a~1b.c'
    return path.map(escapePath).join('.');
  }
  throw Error('State.prototype.cursor only accept string or array, ' + (typeof path === 'undefined' ? 'undefined' : _typeof(path)) + ' is forbidden');
};

var isNullOrUndefined = function isNullOrUndefined(obj) {
  return obj === undefined || obj === null;
};

var getByPath = function getByPath(obj, path) {
  var pointer = obj;
  for (var i = 0; i < path.length; i += 1) {
    var next = path[i];
    // only null and undefined has no properties
    // ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/No_properties
    if (isNullOrUndefined(pointer)) {
      return undefined;
    }
    pointer = pointer[next];
  }
  return pointer;
};

var isObject = function isObject(obj) {
  return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj !== null;
};
var isNumeric = function isNumeric(num) {
  return !isNaN(num) && num !== '';
};

var shallowClone = function shallowClone(obj) {
  var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  if (Array.isArray(obj)) {
    return [].concat(toConsumableArray(obj));
  } else if (isObject(obj)) {
    return _extends({}, obj);
  }
  if (isNumeric(path)) {
    return [];
  } else {
    return {};
  }
};

var HEAD = 'HEAD';
var setByPath = function setByPath(obj) {
  var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var value = arguments[2];

  if (!path.length) {
    return value;
  }

  var root = {};
  root[HEAD] = obj;
  var parentPointer = root;
  var lastNext = HEAD;
  var pointer = obj;
  for (var i = 0; i < path.length; i += 1) {
    var next = path[i];
    parentPointer[lastNext] = shallowClone(pointer, next);
    parentPointer = parentPointer[lastNext];
    lastNext = next;
    if (isNullOrUndefined(pointer)) {
      // always skip traversing null or undefined
      pointer = null;
    } else {
      pointer = pointer[next];
    }
  }
  parentPointer[lastNext] = value;
  return root[HEAD];
};

// null or undefined will cause an error
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
var arrayFromAllowNullOrUndefined = function arrayFromAllowNullOrUndefined(arrayLike) {
  return isNullOrUndefined(arrayLike) ? [] : [].concat(toConsumableArray(arrayLike));
};

var count = 1;
var getNextId = function getNextId() {
  count += 1;
  return count;
};

var removeFirstFromArray = function removeFirstFromArray(array, value) {
  var pos = array.indexOf(value);
  if (pos !== -1) {
    // about 1.5x faster than the two-arg version of Array#splice() as nodejs said
    // https://github.com/nodejs/node/blob/v6.x/lib/events.js#L470-L475
    for (var i = pos, k = i + 1, n = array.length; k < n; i += 1, k += 1) {
      array[i] = array[k];
    }
    array.pop();
  }
};

var Store = function () {
  function Store() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        data = _ref.data,
        _ref$maxSnapshots = _ref.maxSnapshots,
        maxSnapshots = _ref$maxSnapshots === undefined ? Infinity : _ref$maxSnapshots;

    classCallCheck(this, Store);

    this.__data = data;
    this.__maxSnapshots = maxSnapshots;
    this.__snapshots = [];
    this.__snapshotIndex = -1;
  }

  createClass(Store, [{
    key: 'read',
    value: function read(path) {
      return getByPath(this.__data, path);
    }
  }, {
    key: 'write',
    value: function write(path, value) {
      this.__data = setByPath(this.__data, path, value);
    }
  }, {
    key: 'snapshot',
    value: function snapshot() {
      this.__snapshotIndex += 1;
      this.__snapshots[this.__snapshotIndex] = this.__data;
      // override redid snapshots
      this.__snapshots.length = this.__snapshotIndex + 1;
      if (this.__snapshots.length > this.maxSnapshots) {
        this.__snapshots.shift();
        this.__snapshotIndex -= 1;
      }
    }
  }, {
    key: 'canUndo',
    value: function canUndo() {
      return this.__snapshotIndex > 0;
    }
  }, {
    key: 'undo',
    value: function undo() {
      if (!this.canUndo()) {
        throw new RangeError('no more snapshot available');
      }
      this.__snapshotIndex -= 1;
      this.__data = this.__snapshots[this.__snapshotIndex];
    }
  }, {
    key: 'canRedo',
    value: function canRedo() {
      return this.__snapshotIndex + 1 < this.__snapshots.length;
    }
  }, {
    key: 'redo',
    value: function redo() {
      if (!this.canRedo()) {
        throw new RangeError('no more snapshot available');
      }
      this.__snapshotIndex += 1;
      this.__data = this.__snapshots[this.__snapshotIndex];
    }
  }]);
  return Store;
}();

// reduce property get times will accelerate 10%~15%
var SYMBOL_NOFLUX_ID = SYMBOL_NOFLUX + '_id';

var getListenerId = function getListenerId(listener) {
  var autoGenerate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  // unique id for each listener
  if (autoGenerate && listener[SYMBOL_NOFLUX_ID] === undefined) {
    Object.defineProperty(listener, SYMBOL_NOFLUX_ID, {
      enumerable: false,
      writable: true,
      configurable: true,
      value: getNextId()
    });
  }
  return listener[SYMBOL_NOFLUX_ID];
};

/*
 * for performance hit, every node maintain ownListeners and subtreeListeners
 * ownListeners[listenerId] = listener on current path
 * subtreeListeners[listenerId] = merge(
 *   ownListeners[listenerId],
 *   children.every.subtreeListeners[listenerId],
 * )
 */
var ListenerTreeNode = function ListenerTreeNode() {
  classCallCheck(this, ListenerTreeNode);
  this.children = {};
  this.subtreeListeners = [];
  this.ownListeners = [];
};

var ListenerTree = function () {
  function ListenerTree() {
    classCallCheck(this, ListenerTree);
    this.__tree = new ListenerTreeNode();
  }

  createClass(ListenerTree, [{
    key: '__traverse',
    value: function __traverse(_ref) {
      var path = _ref.path,
          _ref$createEmptyPath = _ref.createEmptyPath,
          createEmptyPath = _ref$createEmptyPath === undefined ? false : _ref$createEmptyPath,
          callbackBeforeRecursion = _ref.callbackBeforeRecursion,
          callbackAfterRecursion = _ref.callbackAfterRecursion,
          callbackAtBottom = _ref.callbackAtBottom;

      var pointer = this.__tree;
      // save call stack for backtracking
      var stack = [];
      stack.push(pointer);
      for (var index = 0; index <= path.length; index += 1) {
        var isAtBottom = index === path.length || !createEmptyPath && pointer.children[path[index]] === undefined;
        if (isAtBottom && callbackAtBottom) {
          callbackAtBottom(pointer, index);
          break;
        }
        if (callbackBeforeRecursion) {
          callbackBeforeRecursion(pointer);
        }
        var child = path[index];
        if (pointer.children[child] === undefined) {
          pointer.children[child] = new ListenerTreeNode();
        }
        pointer = pointer.children[child];
        stack.push(pointer);
      }
      if (callbackAfterRecursion) {
        while (stack.length) {
          pointer = stack.pop();
          callbackAfterRecursion(pointer);
        }
      }
    }
  }, {
    key: 'addListener',
    value: function addListener(path, listener) {
      var _this = this;

      if (typeof listener !== 'function') {
        throw new TypeError('"listener" argument must be a function');
      }
      // init listener id
      getListenerId(listener, true);
      this.__traverse({
        path: path,
        createEmptyPath: true,
        callbackAfterRecursion: function callbackAfterRecursion(node) {
          return node.subtreeListeners.push(listener);
        },
        callbackAtBottom: function callbackAtBottom(node) {
          return node.ownListeners.push(listener);
        }
      });
      return function () {
        _this.removeListener(path, listener);
      };
    }
  }, {
    key: 'removeListener',
    value: function removeListener(path, listener) {
      if (typeof listener !== 'function') {
        throw new TypeError('"listener" argument must be a function');
      }
      this.__traverse({
        path: path,
        callbackAfterRecursion: function callbackAfterRecursion(node) {
          return removeFirstFromArray(node.subtreeListeners, listener);
        },
        callbackAtBottom: function callbackAtBottom(node) {
          return removeFirstFromArray(node.ownListeners, listener);
        }
      });
    }

    // path [a, b, ..., n] will emit
    // merge(ownListener[root], ownListener[a], ownListener[b], ..., subtreeListener[n])

  }, {
    key: 'emit',
    value: function emit(path, data) {
      var listeners = [];
      this.__traverse({
        path: path,
        callbackAtBottom: function callbackAtBottom(node, index) {
          // if emit an empty path, there is no subtree
          if (index === path.length) {
            listeners.push.apply(listeners, toConsumableArray(node.subtreeListeners));
          }
        },
        callbackAfterRecursion: function callbackAfterRecursion(node) {
          if (node.ownListeners.length) {
            listeners.push.apply(listeners, toConsumableArray(node.ownListeners));
          }
        }
      });
      var called = {};
      for (var index = 0; index < listeners.length; index += 1) {
        var listener = listeners[index];
        var listenerId = getListenerId(listener);
        // same listener will call once
        if (!called[listenerId]) {
          called[listenerId] = true;
          listener(data);
        }
      }
    }
  }, {
    key: 'on',
    value: function on(path, listener) {
      return this.addListener(path, listener);
    }
  }, {
    key: 'off',
    value: function off(path, listener) {
      this.removeListener(path, listener);
    }
  }]);
  return ListenerTree;
}();

var State = function () {
  function State() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$store = _ref.store,
        store = _ref$store === undefined ? new Store() : _ref$store,
        _ref$cursor = _ref.cursor,
        cursor = _ref$cursor === undefined ? [] : _ref$cursor,
        _ref$emitters = _ref.emitters,
        emitters = _ref$emitters === undefined ? {
      get: new ListenerTree(),
      set: new ListenerTree()
    } : _ref$emitters;

    classCallCheck(this, State);

    this.__store = store;
    this.__cursor = cursor;
    this.__emitters = emitters;
  }

  createClass(State, [{
    key: 'cursor',
    value: function cursor() {
      var subPath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var __store = this.__store,
          __cursor = this.__cursor,
          __emitters = this.__emitters;

      subPath = parsePath(subPath);
      return new State({
        store: __store,
        cursor: __cursor.concat(subPath),
        emitters: __emitters
      });
    }
  }, {
    key: 'get',
    value: function get$$1() {
      var subPath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var length = arguments.length;

      if (length !== 0) {
        return this.cursor(subPath).get();
      }
      var value = this.__store.read(this.__cursor);
      this.__emitters.get.emit(this.__cursor, {
        path: stringifyPath(this.__cursor),
        value: value
      });
      return value;
    }
  }, {
    key: 'set',
    value: function set$$1(subPath, value) {
      var length = arguments.length;

      if (length < 1) {
        throw new TypeError('value argument must be set');
      }
      if (length === 1) {
        var _ref2 = [undefined, subPath];
        subPath = _ref2[0];
        value = _ref2[1];
      }
      if (subPath !== undefined) {
        return this.cursor(subPath).set(value);
      }
      this.__store.write(this.__cursor, value);
      this.__emitters.set.emit(this.__cursor, {
        path: stringifyPath(this.__cursor),
        value: value
      });
    }
  }, {
    key: 'update',
    value: function update(subPath, callback) {
      var length = arguments.length;

      if (length < 1) {
        throw new TypeError('callback argument must be set');
      }
      if (length === 1) {
        var _ref3 = [undefined, subPath];
        subPath = _ref3[0];
        callback = _ref3[1];
      }
      if (typeof callback !== 'function') {
        throw new TypeError('callback argument must be a function');
      }
      var s = subPath === undefined ? this : this.cursor(subPath);
      s.set(callback(s.get()));
    }
  }, {
    key: '__getEmitterByName',
    value: function __getEmitterByName(message) {
      if (!this.__emitters[message]) {
        throw new Error('event not allowed');
      }
      return this.__emitters[message];
    }
  }, {
    key: 'on',
    value: function on(message, callback) {
      return this.__getEmitterByName(message).on(this.__cursor, callback);
    }
  }, {
    key: 'addEventListener',
    value: function addEventListener(message, callback) {
      return this.on(message, callback);
    }
  }, {
    key: 'off',
    value: function off(message, callback) {
      this.__getEmitterByName(message).off(this.__cursor, callback);
    }
  }, {
    key: 'removeEventListener',
    value: function removeEventListener(message, callback) {
      this.off(message, callback);
    }

    // snapshot support

  }, {
    key: 'snapshot',
    value: function snapshot() {
      this.__store.snapshot();
    }
  }, {
    key: 'canUndo',
    value: function canUndo() {
      return this.__store.canUndo();
    }
  }, {
    key: 'undo',
    value: function undo() {
      this.__store.undo();
      // snapshot always emit root event
      this.__emitters.set.emit([], {
        path: stringifyPath([]),
        value: this.__store.read([])
      });
    }
  }, {
    key: 'canRedo',
    value: function canRedo() {
      return this.__store.canRedo();
    }
  }, {
    key: 'redo',
    value: function redo() {
      this.__store.redo();
      // snapshot always emit root event
      this.__emitters.set.emit([], {
        path: stringifyPath([]),
        value: this.__store.read([])
      });
    }

    // immutable Array operators

  }, {
    key: '__arrayOperator',
    value: function __arrayOperator(operator, values) {
      var array = arrayFromAllowNullOrUndefined(this.get());
      Array.prototype[operator].apply(array, values);
      this.set(array);
    }
  }, {
    key: 'push',
    value: function push() {
      for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
        values[_key] = arguments[_key];
      }

      this.__arrayOperator('push', values);
    }
  }, {
    key: 'pop',
    value: function pop() {
      this.__arrayOperator('pop');
    }
  }, {
    key: 'unshift',
    value: function unshift() {
      for (var _len2 = arguments.length, values = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        values[_key2] = arguments[_key2];
      }

      this.__arrayOperator('unshift', values);
    }
  }, {
    key: 'shift',
    value: function shift() {
      this.__arrayOperator('shift');
    }
  }, {
    key: 'fill',
    value: function fill(value) {
      this.__arrayOperator('fill', [value]);
    }
  }, {
    key: 'reverse',
    value: function reverse() {
      this.__arrayOperator('reverse');
    }
  }, {
    key: 'splice',
    value: function splice() {
      for (var _len3 = arguments.length, values = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        values[_key3] = arguments[_key3];
      }

      this.__arrayOperator('splice', values);
    }
  }]);
  return State;
}();




/***/ }),

/***/ "./node_modules/whatwg-fetch/fetch.js":
/*!********************************************!*\
  !*** ./node_modules/whatwg-fetch/fetch.js ***!
  \********************************************/
/*! exports provided: Headers, Request, Response, DOMException, fetch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Headers", function() { return Headers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Request", function() { return Request; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Response", function() { return Response; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOMException", function() { return DOMException; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetch", function() { return fetch; });
var global =
  (typeof globalThis !== 'undefined' && globalThis) ||
  (typeof self !== 'undefined' && self) ||
  (typeof global !== 'undefined' && global)

var support = {
  searchParams: 'URLSearchParams' in global,
  iterable: 'Symbol' in global && 'iterator' in Symbol,
  blob:
    'FileReader' in global &&
    'Blob' in global &&
    (function() {
      try {
        new Blob()
        return true
      } catch (e) {
        return false
      }
    })(),
  formData: 'FormData' in global,
  arrayBuffer: 'ArrayBuffer' in global
}

function isDataView(obj) {
  return obj && DataView.prototype.isPrototypeOf(obj)
}

if (support.arrayBuffer) {
  var viewClasses = [
    '[object Int8Array]',
    '[object Uint8Array]',
    '[object Uint8ClampedArray]',
    '[object Int16Array]',
    '[object Uint16Array]',
    '[object Int32Array]',
    '[object Uint32Array]',
    '[object Float32Array]',
    '[object Float64Array]'
  ]

  var isArrayBufferView =
    ArrayBuffer.isView ||
    function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
}

function normalizeName(name) {
  if (typeof name !== 'string') {
    name = String(name)
  }
  if (/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(name) || name === '') {
    throw new TypeError('Invalid character in header field name')
  }
  return name.toLowerCase()
}

function normalizeValue(value) {
  if (typeof value !== 'string') {
    value = String(value)
  }
  return value
}

// Build a destructive iterator for the value list
function iteratorFor(items) {
  var iterator = {
    next: function() {
      var value = items.shift()
      return {done: value === undefined, value: value}
    }
  }

  if (support.iterable) {
    iterator[Symbol.iterator] = function() {
      return iterator
    }
  }

  return iterator
}

function Headers(headers) {
  this.map = {}

  if (headers instanceof Headers) {
    headers.forEach(function(value, name) {
      this.append(name, value)
    }, this)
  } else if (Array.isArray(headers)) {
    headers.forEach(function(header) {
      this.append(header[0], header[1])
    }, this)
  } else if (headers) {
    Object.getOwnPropertyNames(headers).forEach(function(name) {
      this.append(name, headers[name])
    }, this)
  }
}

Headers.prototype.append = function(name, value) {
  name = normalizeName(name)
  value = normalizeValue(value)
  var oldValue = this.map[name]
  this.map[name] = oldValue ? oldValue + ', ' + value : value
}

Headers.prototype['delete'] = function(name) {
  delete this.map[normalizeName(name)]
}

Headers.prototype.get = function(name) {
  name = normalizeName(name)
  return this.has(name) ? this.map[name] : null
}

Headers.prototype.has = function(name) {
  return this.map.hasOwnProperty(normalizeName(name))
}

Headers.prototype.set = function(name, value) {
  this.map[normalizeName(name)] = normalizeValue(value)
}

Headers.prototype.forEach = function(callback, thisArg) {
  for (var name in this.map) {
    if (this.map.hasOwnProperty(name)) {
      callback.call(thisArg, this.map[name], name, this)
    }
  }
}

Headers.prototype.keys = function() {
  var items = []
  this.forEach(function(value, name) {
    items.push(name)
  })
  return iteratorFor(items)
}

Headers.prototype.values = function() {
  var items = []
  this.forEach(function(value) {
    items.push(value)
  })
  return iteratorFor(items)
}

Headers.prototype.entries = function() {
  var items = []
  this.forEach(function(value, name) {
    items.push([name, value])
  })
  return iteratorFor(items)
}

if (support.iterable) {
  Headers.prototype[Symbol.iterator] = Headers.prototype.entries
}

function consumed(body) {
  if (body.bodyUsed) {
    return Promise.reject(new TypeError('Already read'))
  }
  body.bodyUsed = true
}

function fileReaderReady(reader) {
  return new Promise(function(resolve, reject) {
    reader.onload = function() {
      resolve(reader.result)
    }
    reader.onerror = function() {
      reject(reader.error)
    }
  })
}

function readBlobAsArrayBuffer(blob) {
  var reader = new FileReader()
  var promise = fileReaderReady(reader)
  reader.readAsArrayBuffer(blob)
  return promise
}

function readBlobAsText(blob) {
  var reader = new FileReader()
  var promise = fileReaderReady(reader)
  reader.readAsText(blob)
  return promise
}

function readArrayBufferAsText(buf) {
  var view = new Uint8Array(buf)
  var chars = new Array(view.length)

  for (var i = 0; i < view.length; i++) {
    chars[i] = String.fromCharCode(view[i])
  }
  return chars.join('')
}

function bufferClone(buf) {
  if (buf.slice) {
    return buf.slice(0)
  } else {
    var view = new Uint8Array(buf.byteLength)
    view.set(new Uint8Array(buf))
    return view.buffer
  }
}

function Body() {
  this.bodyUsed = false

  this._initBody = function(body) {
    /*
      fetch-mock wraps the Response object in an ES6 Proxy to
      provide useful test harness features such as flush. However, on
      ES5 browsers without fetch or Proxy support pollyfills must be used;
      the proxy-pollyfill is unable to proxy an attribute unless it exists
      on the object before the Proxy is created. This change ensures
      Response.bodyUsed exists on the instance, while maintaining the
      semantic of setting Request.bodyUsed in the constructor before
      _initBody is called.
    */
    this.bodyUsed = this.bodyUsed
    this._bodyInit = body
    if (!body) {
      this._bodyText = ''
    } else if (typeof body === 'string') {
      this._bodyText = body
    } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
      this._bodyBlob = body
    } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
      this._bodyFormData = body
    } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
      this._bodyText = body.toString()
    } else if (support.arrayBuffer && support.blob && isDataView(body)) {
      this._bodyArrayBuffer = bufferClone(body.buffer)
      // IE 10-11 can't handle a DataView body.
      this._bodyInit = new Blob([this._bodyArrayBuffer])
    } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
      this._bodyArrayBuffer = bufferClone(body)
    } else {
      this._bodyText = body = Object.prototype.toString.call(body)
    }

    if (!this.headers.get('content-type')) {
      if (typeof body === 'string') {
        this.headers.set('content-type', 'text/plain;charset=UTF-8')
      } else if (this._bodyBlob && this._bodyBlob.type) {
        this.headers.set('content-type', this._bodyBlob.type)
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
      }
    }
  }

  if (support.blob) {
    this.blob = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return Promise.resolve(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(new Blob([this._bodyArrayBuffer]))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as blob')
      } else {
        return Promise.resolve(new Blob([this._bodyText]))
      }
    }

    this.arrayBuffer = function() {
      if (this._bodyArrayBuffer) {
        var isConsumed = consumed(this)
        if (isConsumed) {
          return isConsumed
        }
        if (ArrayBuffer.isView(this._bodyArrayBuffer)) {
          return Promise.resolve(
            this._bodyArrayBuffer.buffer.slice(
              this._bodyArrayBuffer.byteOffset,
              this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength
            )
          )
        } else {
          return Promise.resolve(this._bodyArrayBuffer)
        }
      } else {
        return this.blob().then(readBlobAsArrayBuffer)
      }
    }
  }

  this.text = function() {
    var rejected = consumed(this)
    if (rejected) {
      return rejected
    }

    if (this._bodyBlob) {
      return readBlobAsText(this._bodyBlob)
    } else if (this._bodyArrayBuffer) {
      return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
    } else if (this._bodyFormData) {
      throw new Error('could not read FormData body as text')
    } else {
      return Promise.resolve(this._bodyText)
    }
  }

  if (support.formData) {
    this.formData = function() {
      return this.text().then(decode)
    }
  }

  this.json = function() {
    return this.text().then(JSON.parse)
  }

  return this
}

// HTTP methods whose capitalization should be normalized
var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

function normalizeMethod(method) {
  var upcased = method.toUpperCase()
  return methods.indexOf(upcased) > -1 ? upcased : method
}

function Request(input, options) {
  if (!(this instanceof Request)) {
    throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.')
  }

  options = options || {}
  var body = options.body

  if (input instanceof Request) {
    if (input.bodyUsed) {
      throw new TypeError('Already read')
    }
    this.url = input.url
    this.credentials = input.credentials
    if (!options.headers) {
      this.headers = new Headers(input.headers)
    }
    this.method = input.method
    this.mode = input.mode
    this.signal = input.signal
    if (!body && input._bodyInit != null) {
      body = input._bodyInit
      input.bodyUsed = true
    }
  } else {
    this.url = String(input)
  }

  this.credentials = options.credentials || this.credentials || 'same-origin'
  if (options.headers || !this.headers) {
    this.headers = new Headers(options.headers)
  }
  this.method = normalizeMethod(options.method || this.method || 'GET')
  this.mode = options.mode || this.mode || null
  this.signal = options.signal || this.signal
  this.referrer = null

  if ((this.method === 'GET' || this.method === 'HEAD') && body) {
    throw new TypeError('Body not allowed for GET or HEAD requests')
  }
  this._initBody(body)

  if (this.method === 'GET' || this.method === 'HEAD') {
    if (options.cache === 'no-store' || options.cache === 'no-cache') {
      // Search for a '_' parameter in the query string
      var reParamSearch = /([?&])_=[^&]*/
      if (reParamSearch.test(this.url)) {
        // If it already exists then set the value with the current time
        this.url = this.url.replace(reParamSearch, '$1_=' + new Date().getTime())
      } else {
        // Otherwise add a new '_' parameter to the end with the current time
        var reQueryString = /\?/
        this.url += (reQueryString.test(this.url) ? '&' : '?') + '_=' + new Date().getTime()
      }
    }
  }
}

Request.prototype.clone = function() {
  return new Request(this, {body: this._bodyInit})
}

function decode(body) {
  var form = new FormData()
  body
    .trim()
    .split('&')
    .forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
  return form
}

function parseHeaders(rawHeaders) {
  var headers = new Headers()
  // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
  // https://tools.ietf.org/html/rfc7230#section-3.2
  var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ')
  preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
    var parts = line.split(':')
    var key = parts.shift().trim()
    if (key) {
      var value = parts.join(':').trim()
      headers.append(key, value)
    }
  })
  return headers
}

Body.call(Request.prototype)

function Response(bodyInit, options) {
  if (!(this instanceof Response)) {
    throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.')
  }
  if (!options) {
    options = {}
  }

  this.type = 'default'
  this.status = options.status === undefined ? 200 : options.status
  this.ok = this.status >= 200 && this.status < 300
  this.statusText = 'statusText' in options ? options.statusText : ''
  this.headers = new Headers(options.headers)
  this.url = options.url || ''
  this._initBody(bodyInit)
}

Body.call(Response.prototype)

Response.prototype.clone = function() {
  return new Response(this._bodyInit, {
    status: this.status,
    statusText: this.statusText,
    headers: new Headers(this.headers),
    url: this.url
  })
}

Response.error = function() {
  var response = new Response(null, {status: 0, statusText: ''})
  response.type = 'error'
  return response
}

var redirectStatuses = [301, 302, 303, 307, 308]

Response.redirect = function(url, status) {
  if (redirectStatuses.indexOf(status) === -1) {
    throw new RangeError('Invalid status code')
  }

  return new Response(null, {status: status, headers: {location: url}})
}

var DOMException = global.DOMException
try {
  new DOMException()
} catch (err) {
  DOMException = function(message, name) {
    this.message = message
    this.name = name
    var error = Error(message)
    this.stack = error.stack
  }
  DOMException.prototype = Object.create(Error.prototype)
  DOMException.prototype.constructor = DOMException
}

function fetch(input, init) {
  return new Promise(function(resolve, reject) {
    var request = new Request(input, init)

    if (request.signal && request.signal.aborted) {
      return reject(new DOMException('Aborted', 'AbortError'))
    }

    var xhr = new XMLHttpRequest()

    function abortXhr() {
      xhr.abort()
    }

    xhr.onload = function() {
      var options = {
        status: xhr.status,
        statusText: xhr.statusText,
        headers: parseHeaders(xhr.getAllResponseHeaders() || '')
      }
      options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
      var body = 'response' in xhr ? xhr.response : xhr.responseText
      setTimeout(function() {
        resolve(new Response(body, options))
      }, 0)
    }

    xhr.onerror = function() {
      setTimeout(function() {
        reject(new TypeError('Network request failed'))
      }, 0)
    }

    xhr.ontimeout = function() {
      setTimeout(function() {
        reject(new TypeError('Network request failed'))
      }, 0)
    }

    xhr.onabort = function() {
      setTimeout(function() {
        reject(new DOMException('Aborted', 'AbortError'))
      }, 0)
    }

    function fixUrl(url) {
      try {
        return url === '' && global.location.href ? global.location.href : url
      } catch (e) {
        return url
      }
    }

    xhr.open(request.method, fixUrl(request.url), true)

    if (request.credentials === 'include') {
      xhr.withCredentials = true
    } else if (request.credentials === 'omit') {
      xhr.withCredentials = false
    }

    if ('responseType' in xhr) {
      if (support.blob) {
        xhr.responseType = 'blob'
      } else if (
        support.arrayBuffer &&
        request.headers.get('Content-Type') &&
        request.headers.get('Content-Type').indexOf('application/octet-stream') !== -1
      ) {
        xhr.responseType = 'arraybuffer'
      }
    }

    if (init && typeof init.headers === 'object' && !(init.headers instanceof Headers)) {
      Object.getOwnPropertyNames(init.headers).forEach(function(name) {
        xhr.setRequestHeader(name, normalizeValue(init.headers[name]))
      })
    } else {
      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })
    }

    if (request.signal) {
      request.signal.addEventListener('abort', abortXhr)

      xhr.onreadystatechange = function() {
        // DONE (success or failure)
        if (xhr.readyState === 4) {
          request.signal.removeEventListener('abort', abortXhr)
        }
      }
    }

    xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
  })
}

fetch.polyfill = true

if (!global.fetch) {
  global.fetch = fetch
  global.Headers = Headers
  global.Request = Request
  global.Response = Response
}


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ })

/******/ });
//# sourceMappingURL=index.js.map