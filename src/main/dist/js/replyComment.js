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
/******/ 	return __webpack_require__(__webpack_require__.s = "./webapp/js/replyComment.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./webapp/js/AJAX.js":
/*!***************************!*\
  !*** ./webapp/js/AJAX.js ***!
  \***************************/
/*! exports provided: Ajax, promiseAjax */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Ajax\", function() { return Ajax; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"promiseAjax\", function() { return promiseAjax; });\n/* harmony import */ var _getQueryStringArgs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getQueryStringArgs.js */ \"./webapp/js/getQueryStringArgs.js\");\n\r\n/*\r\najax({\r\n    url: \"\", //请求地址\r\n    type: 'get',   //请求方式\r\n    data: { name: 'zhangsan', age: '23', email: '2372734044@qq.com' }, //请求json参数\r\n    async: false,   //是否异步\r\n    success: function (responseText) {\r\n        //   此处执行请求成功后的代码\r\n    },\r\n    fail: function (err) {\r\n        // 此处为执行成功后的代码\r\n    }\r\n}); */\r\n\r\nfunction Ajax(obj) {\r\n\tlet xhr = new XMLHttpRequest();\r\n\txhr.withCredentials = true; //携带cookie\r\n\txhr.onreadystatechange = function() {\r\n\t\tif (xhr.readyState == 4) {\r\n\t\t\tif (xhr.status >= 200 && xhr.status <= 300) {\r\n\t\t\t\tobj.success(xhr.responseText);\r\n\t\t\t} else {\r\n\t\t\t\tobj.fail(xhr.status);\r\n\t\t\t}\r\n\t\t}\r\n\t};\r\n\r\n\tif (obj.type == 'get') {\r\n\t\tlet message = getParmer(obj.data);\r\n\t\txhr.open(\"get\", obj.url + \"?\" + message, obj.async);\r\n\t\txhr.send(null);\r\n\t} else if (obj.type == 'post') {\r\n\t\tconsole.log(obj.url);\r\n\t\txhr.open(\"post\", obj.url, obj.async);\r\n\t\tif(obj.send_form == true) {\r\n\t\t\tlet formdata = new FormData();\r\n\t\t\tfor(let key in obj.data) {\r\n\t\t\t\tif(key == 'upload_file') {\r\n\t\t\t\t\tfor(let i = 0, len = obj.data[key].length; i < len; i++) {\r\n\t\t\t\t\t\tformdata.append(key, obj.data[key][i]);\r\n\t\t\t\t\t}\r\n\t\t\t\t} else {\r\n\t\t\t\t\tformdata.append(key, obj.data[key]);\r\n\t\t\t\t}\r\n\t\t\t}\r\n\t\t\txhr.send(formdata);\r\n\t\t} else {\r\n\t\t\txhr.setRequestHeader(\"Content-Type\", \"application/x-www-form-urlencoded\");\r\n\t\t\txhr.send(message);\r\n\t\t}\r\n\r\n\t}\r\n\r\n\tfunction getParmer(data) {\r\n\t\tvar arr = [];\r\n\t\tfor (var thing in data) {\r\n\t\t\tarr.push(encodeURIComponent(thing) + '=' + encodeURIComponent(data[thing]));\r\n\t\t}\r\n\t\treturn arr.join('&');\r\n\t}\r\n}\r\n\r\n\r\nfunction promiseAjax(obj) {\r\n\treturn new Promise((reslove, reject) => {\r\n\t\tobj.success = (responseText) => {\r\n\t\t\t// 如果提示该操作需要cookie 则重新请求下发cookie\r\n\t\t\tlet json = JSON.parse(responseText);\r\n\t\t\tif(json.msg == 'LOSE-COOKIE'){\r\n\t\t\t\tsetCookie();\r\n\t\t\t}else {\r\n\t\t\t\treslove(responseText);\r\n\t\t\t}\r\n\t\t};\r\n\t\tobj.fail = (err) => {\r\n\t\t\treject(err);\r\n\t\t}\r\n\t\tAjax(obj);\r\n\t});\r\n}\r\n\r\nfunction setCookie() {\r\n\tAjax({\r\n\t\turl: 'http://118.31.12.175:8080/xiyouProject_war/user/login.do',\r\n\t\ttype: 'get',\r\n\t\tdata: {\r\n\t\t\tstudentId: Object(_getQueryStringArgs_js__WEBPACK_IMPORTED_MODULE_0__[\"getQueryStringArgs\"])().user_student_id\r\n\t\t},\r\n\t\tsend_form: false,\r\n\t\tasync: false,\r\n\t\tsuccess: function(responseText) {\r\n\t\t\tvar json = JSON.parse(responseText);\r\n\t\t\tif(json.status == 0) {\r\n\t\t\t\tconsole.log(json);\r\n\t\t\t\twindow.user_id = json.data.id;\r\n\t\t\t\twindow.user_message = json.data;\r\n\t\t\t\twindow.location.reload();\r\n\t\t\t}\r\n\t\t},\r\n\t\tfail: function(err) {\r\n\t\t\tconsole.log('登陆失败，请退出后重新登录');\r\n\t\t}\r\n\t});\r\n}\r\n\n\n//# sourceURL=webpack:///./webapp/js/AJAX.js?");

/***/ }),

/***/ "./webapp/js/getQueryStringArgs.js":
/*!*****************************************!*\
  !*** ./webapp/js/getQueryStringArgs.js ***!
  \*****************************************/
/*! exports provided: getQueryStringArgs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getQueryStringArgs\", function() { return getQueryStringArgs; });\n\r\n\r\n\r\nfunction getQueryStringArgs() {\r\n\tlet data_str = window.location.search;\r\n\tlet str = (data_str.length > 0 ? data_str.substring(1) : ''),\r\n\t\targs = {}, // 保存数据的对象\r\n\r\n\t\titem_arr = str.length > 0 ? str.split('&') : [],\r\n\t\titem = null,\r\n\t\tname = null,\r\n\t\tvalue= null,\r\n\t\ti = 0,\r\n\t\tlen = item_arr.length;\r\n\twhile(i < len) {\r\n\t\titem = item_arr[i].split('=');\r\n\t\tname = decodeURIComponent(item[0]);\r\n\t\tvalue = decodeURIComponent(item[1]);\r\n\t\targs[name] = value;\r\n\t\ti++;\r\n\t}\r\n\treturn args;\r\n}\n\n//# sourceURL=webpack:///./webapp/js/getQueryStringArgs.js?");

/***/ }),

/***/ "./webapp/js/replyComment.js":
/*!***********************************!*\
  !*** ./webapp/js/replyComment.js ***!
  \***********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _AJAX_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AJAX.js */ \"./webapp/js/AJAX.js\");\n/* harmony import */ var _getQueryStringArgs_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getQueryStringArgs.js */ \"./webapp/js/getQueryStringArgs.js\");\n/* harmony import */ var _setSessionBackRefresh_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./setSessionBackRefresh.js */ \"./webapp/js/setSessionBackRefresh.js\");\n\r\n\r\n\r\n\r\n\r\nclass Obj {\r\n\tconstructor(return_el, send_reply_el, value_el) {\r\n\t\tthis.return_el = return_el;\r\n\t\tthis.send_reply_el = send_reply_el;\r\n\t\tthis.value_el = value_el;\r\n\t}\r\n\r\n\tinit() {\r\n\t\tthis.return_el.addEventListener('click', () => {\r\n\t\t\tObject(_setSessionBackRefresh_js__WEBPACK_IMPORTED_MODULE_2__[\"setSessionBack\"])();\r\n\t\t}, false);\r\n\t\tthis.send_reply_el.addEventListener('click', () => {\r\n\t\t\tif(this.checkContent()) {\r\n\t\t\t\tthis.sendRequest();\r\n\t\t\t}\r\n\t\t}, false);\r\n\t}\r\n\r\n\t// 检查格式是否正确\r\n\tcheckContent() {\r\n\t\treturn this.value_el.value.length > 0 ? true : false;\r\n\t}\r\n\r\n\tsendRequest() {\r\n\t\tlet args = Object(_getQueryStringArgs_js__WEBPACK_IMPORTED_MODULE_1__[\"getQueryStringArgs\"])();\r\n\t\tObject(_AJAX_js__WEBPACK_IMPORTED_MODULE_0__[\"promiseAjax\"])({\r\n\t\t\turl: 'http://118.31.12.175:8080/xiyouProject_war/reply/addToComment.do',\r\n\t\t\ttype: 'get',\r\n\t\t\tdata: {\r\n\t\t\t\tcontent: this.value_el.value,\r\n\t\t\t\tcommentId: args.commentId,\r\n\t\t\t\treceiveUserId: args.receiveUserId\r\n\t\t\t},\r\n\t\t\tsend_from: true,\r\n\t\t\tasync: false\r\n\t\t}).then((value) => {\r\n\t\t\tconsole.log(JSON.parse(value))\r\n\t\t});\r\n\t}\r\n}\r\n\r\n\r\nlet obj = new Obj(  document.getElementsByClassName('return_btn')[0],\r\n\t\t\t\t\tdocument.getElementById('send_reply'),\r\n\t\t\t\t\tdocument.getElementById('reply_content'));\r\n\r\nobj.init();\n\n//# sourceURL=webpack:///./webapp/js/replyComment.js?");

/***/ }),

/***/ "./webapp/js/setSessionBackRefresh.js":
/*!********************************************!*\
  !*** ./webapp/js/setSessionBackRefresh.js ***!
  \********************************************/
/*! exports provided: window_addEvent, setSessionBack */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"window_addEvent\", function() { return window_addEvent; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setSessionBack\", function() { return setSessionBack; });\n\r\nfunction window_addEvent() {\r\n\twindow.addEventListener('pageshow', (e) => {\r\n\t\t// 适配ios设备\r\n\t\tif(e.persisted) {\r\n\t\t\twindow.location.reload();\r\n\t\t} else {\r\n\t\t\t// ios外的设备\r\n\t\t\tif(sessionStorage.getItem('refresh') === 'true') {\r\n\t\t\t\twindow.location.reload();\r\n\t\t\t}\r\n\t\t}\r\n\t\t// 清除session\r\n\t\twindow.sessionStorage.removeItem('refresh');\r\n\t}, false);\r\n}\r\n\r\nfunction setSessionBack() {\r\n\twindow.sessionStorage.setItem('refresh', 'true');\r\n\twindow.history.back();\r\n}\r\n\r\n\n\n//# sourceURL=webpack:///./webapp/js/setSessionBackRefresh.js?");

/***/ })

/******/ });