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
/******/ 	return __webpack_require__(__webpack_require__.s = "./webapp/js/compile_page.js");
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

/***/ "./webapp/js/PhotoSwipe_way.js":
/*!*************************************!*\
  !*** ./webapp/js/PhotoSwipe_way.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return show_PhotoSwipe; });\n\r\n/*\r\n\tshow_photo_arr是需要展示的数组\r\n\tindex 是开始展示的位置\r\n */\r\n\r\nfunction show_PhotoSwipe(show_photo_arr, index) {\r\n\tconsole.log(show_photo_arr);\r\n\tvar pswpElement = document.querySelectorAll('.pswp')[0];\r\n\r\n\t// build items array\r\n\tvar items = show_photo_arr;\r\n\titems.forEach((item) => {\r\n\t\tlet itemWh = getBase64ImgWidthHeight(item.src);\r\n\t\titem.w = itemWh.w;\r\n\t\titem.h = itemWh.h;\r\n\t});\r\n\tconsole.log(items);\r\n\t// define options (if needed)\r\n\tvar options = {\r\n\t    // optionName: 'option value'\r\n\t    // for example:\r\n\t    index: parseInt(index)// start at first slide\r\n\t};\r\n\r\n\t// Initializes and opens PhotoSwipe\r\n\tvar gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);\r\n\tgallery.init();\r\n}\r\n\r\nfunction getBase64ImgWidthHeight(img_src) {\r\n\tlet img = new Image();\r\n\timg.src = img_src;\r\n\treturn {\r\n\t\tw: img.width,\r\n\t\th: img.height\r\n\t};\r\n}\r\n\n\n//# sourceURL=webpack:///./webapp/js/PhotoSwipe_way.js?");

/***/ }),

/***/ "./webapp/js/compile_page.js":
/*!***********************************!*\
  !*** ./webapp/js/compile_page.js ***!
  \***********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _AJAX_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AJAX.js */ \"./webapp/js/AJAX.js\");\n/* harmony import */ var _PhotoSwipe_way_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PhotoSwipe_way.js */ \"./webapp/js/PhotoSwipe_way.js\");\n/* harmony import */ var _getBase64ImgWidthHeight_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getBase64ImgWidthHeight.js */ \"./webapp/js/getBase64ImgWidthHeight.js\");\n/* harmony import */ var _setSessionBackRefresh_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./setSessionBackRefresh.js */ \"./webapp/js/setSessionBackRefresh.js\");\n\r\n\r\n\r\n\r\nclass APP {\r\n\tconstructor(el, return_btn, choose_btn, photos_show, upload_imgs, send_btn) {\r\n\t\tthis.el = el;\r\n\t\tthis.return_btn = return_btn;\r\n\t\tthis.choose_btn = choose_btn;\r\n\t\tthis.photos_show = photos_show;\r\n\t\tthis.upload_imgs = upload_imgs;\r\n\t\tthis.send_btn = send_btn;\r\n\t\tthis.photo_display = false;\r\n\t\tthis.photos_add = [];\r\n\t\tthis.assist_var = {\r\n\t\t\ttimer : null,\r\n\t\t\tcount: 0,\r\n\t\t\twait_show_photo: [],\r\n\t\t\ttimer2:null\r\n\t\t}\r\n\t}\r\n\r\n\tinit() {\r\n\t\tthis.choose_btn.addEventListener('click', (e) => {\r\n\t\t\tthis.handle_choose_Click(e);\r\n\t\t}, false);\r\n\r\n\t\t// this.upload_imgs.addEventListener('click', () => {\r\n\t\t// \t// 调用安卓注入的方法\r\n\t\t// \twindow.android.getphoto();\r\n\t\t// }, false);\r\n\t\tthis.return_btn.addEventListener('click', () => {\r\n\t\t\twindow.history.back()\r\n\t\t}, false);\r\n\t\tthis.send_btn.addEventListener('click', () => {\r\n\t\t\t// 直接将属性添加到对象的 动态信息属性上\r\n\t\t\t// this.getDtMessage();\r\n\t\t\tif(!this.assist_var.timer2) {\r\n\t\t\t\tthis.send_message();\r\n\t\t\t\tsetTimeout(() => {\r\n\t\t\t\t\tclearTimeout(this.assist_var.timer2);\r\n\t\t\t\t\tthis.assist_var.timer2 = null;\r\n\t\t\t\t}, 2000);\r\n\t\t\t}\r\n\r\n\t\t}, false);\r\n\t\t// 将input标签选中的图片添加到页面中\r\n\t\tthis.upload_imgs.onchange = () => {\r\n\t\t\thandleFiles(this.upload_imgs.files);\r\n\t\t};\r\n\r\n\t\t// 单击查看图片，双击取消图片\r\n\t\tthis.photos_show.addEventListener('click', (e) => {\r\n\t\t\t// this.remove_photo(e);\r\n\t\t\tthis.assist_var.count++;\r\n\t\t\tif(this.assist_var.timer == null) {\r\n\t\t\t\tthis.assist_var.timer = setTimeout(() => {\r\n\t\t\t\t\tif(this.assist_var.count > 1) {\r\n\t\t\t\t\t\t//双击及三击四击..以上事件\r\n\t\t\t\t\t\tthis.remove_photo(e);\r\n\t\t\t\t\t\tthis.assist_var.timer = null;\r\n\t\t\t\t\t} else {\r\n\t\t\t\t\t\t// 单击事件\r\n\t\t\t\t\t\tthis.show_imgs(e);\r\n\t\t\t\t\t\tthis.assist_var.timer = null;\r\n\t\t\t\t\t}\r\n\t\t\t\t}, 250);\r\n\t\t\t}\r\n\t\t}, false);\r\n\t}\r\n\r\n\t// 将e对应的目标放大\r\n\tshow_imgs(e) {\r\n\t\tconsole.log(e.target)\r\n\t\tthis.assist_var.count = 0;\r\n\t\t// 参数为需要展示的数组\r\n\t\tlet index = e.target.classList[0] - 1;\r\n\t\tlet items = [];\r\n\t\tfor(let i = 0, len = this.assist_var.wait_show_photo.length; i < len; i ++) {\r\n\t\t\t// 得到base64编码的图片的宽和高\r\n\t\t\tlet img_wh = Object(_getBase64ImgWidthHeight_js__WEBPACK_IMPORTED_MODULE_2__[\"getBase64ImgWidthHeight\"])(this.assist_var.wait_show_photo[i]);\r\n\t\t\titems.push({\r\n\t\t\t\tsrc: this.assist_var.wait_show_photo[i],\r\n\t\t\t\tw: img_wh.w,\r\n\t\t\t\th: img_wh.h\r\n\t\t\t})\r\n\r\n\t\t}\r\n\t\tObject(_PhotoSwipe_way_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(items, index);\r\n\t}\r\n\r\n\tremove_photo(e) {\r\n\t\tthis.assist_var.count = 0;\r\n\t\tlet index = e.target.classList[0];\r\n\t\tconsole.log(index);\r\n\t\t// 将该图片从待发送数组中删除\r\n\t\tthis.photos_add.splice(index, 1);\r\n\t\tthis.assist_var.wait_show_photo.splice(index, 1);\r\n\t\t// 将display 改变\r\n\t\te.target.parentNode.style.display = 'none';\r\n\t}\r\n\r\n\tsend_message () {\r\n\t\t// 判断格式是否正确\r\n\t\tif(!this.check()) {\r\n\t\t\treturn;\r\n\t\t}\r\n\t\tthis.send_Ajax();\r\n\t}\r\n\r\n\t//判断格式是否正确\r\n\tcheck() {\r\n\t\tif(document.getElementsByTagName('textarea')[0].value == '' && this.upload_imgs.files.length == 0) {\r\n\t\t\tconsole.log('照片和文字不能同时为空');\r\n\t\t\treturn false;\r\n\t\t}\r\n\t\treturn true;\r\n\t}\r\n\r\n\tgetDtMessage() {\r\n\t\tconsole.log(document.getElementsByTagName('textarea')[0].value);\r\n\t\tconsole.log(this.add_photos);\r\n\t\tthis.Dt_message.append('contentText', document.getElementsByTagName('textarea')[0].value);\r\n\r\n\t\tthis.Dt_message.append('upload_file', this.upload_imgs.files[0]);\r\n\t\t// this.Dt_message.send_time = new Date();\r\n\t\t// console.log(this.Dt_message);\r\n\t}\r\n\t// galleryImgs() {\r\n\t// \tconsole.log('从相册中选取多张照片');\r\n\t// \tplus.grallery.pick(function (e) {\r\n\t// \t\t// 成功的回调函数\r\n\t// \t\tfor(var i in e.files) {\r\n\t// \t\t\tconsole.log(e.files[i]);\r\n\t// \t\t}\r\n\t// \t}, function(e) {\r\n\t// \t\t// 失败的回调函数\r\n\t// \t\tconsole.log('取消选择图片');\r\n\t// \t}, {\r\n\t// \t\tfilter: \"image\",\r\n\t// \t\tmultiple: true\r\n\t// \t});\r\n\t// }s\r\n\thandle_choose_Click(e) {\r\n\t\tlet target = e.target;\r\n\r\n\t\tif(target.classList.contains('is_choose') || target == this.choose_btn){\r\n\t\t\t// 如果是如果被点击的选项已经被选择， 则直接返回\r\n\t\t\treturn\r\n\t\t} else {\r\n\t\t\t// 清除被选中的格式\r\n\t\t\tfor(let i = 0; i < 3; i ++) {\r\n\t\t\t\tif(this.choose_btn.childNodes[i].classList.contains('is_choose')) {\r\n\t\t\t\t\tthis.choose_btn.childNodes[i].classList.remove('is_choose');\r\n\t\t\t\t}\r\n\t\t\t}\r\n\r\n\t\t\t// 为被选中的添加class\r\n\r\n\t\t\ttarget.classList.add('is_choose');\r\n\t\t}\r\n\t}\r\n\r\n\t// 调整显示照片的尺寸\r\n\tadopt_photos_size() {\r\n\r\n\t\tif(this.photos_show.childElementCount == 1) this.photos_show.childNodes[0].style.wihth = '99%';\r\n\t\tlet img_height;\r\n\t\tif(this.photos_show.childElementCount >= 2) {\r\n\t\t\tfor(let i = 0; i < this.photos_show.childElementCount; i++) {\r\n\t\t\t\tthis.photos_show.childNodes[i].style.width = '33%';\r\n\t\t\t\tthis.photos_show.childNodes[i].style.height = `${img_height}px`;\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n\r\n\tsend_Ajax() {\r\n\t\tObject(_AJAX_js__WEBPACK_IMPORTED_MODULE_0__[\"Ajax\"])({\r\n\t\t\turl: 'http://118.31.12.175:8080/xiyouProject_war/message/add.do',\r\n\t\t\ttype: 'post',\r\n\t\t\tsend_form: true,\r\n\t\t\tdata: {\r\n\t\t\t\tcontentText: document.getElementsByTagName('textarea')[0].value,\r\n\t\t\t\tupload_file: this.photos_add\r\n\t\t\t},\r\n\t\t\tsuccess: (responeText) => {\r\n\t\t\t\tlet json = JSON.parse(responeText);\r\n\t\t\t\tconsole.log(json);\r\n\t\t\t\tObject(_setSessionBackRefresh_js__WEBPACK_IMPORTED_MODULE_3__[\"setSessionBack\"])()\r\n\t\t\t},\r\n\t\t\tfail: function(err) {\r\n\t\t\t\tconsole.log(err);\r\n\t\t\t\talert('错误' + err);\r\n\t\t\t}\r\n\t\t});\r\n\t}\r\n\r\n}\r\n\r\nvar App = new APP(document.getElementById('app'),\r\n\t\t\t\t document.getElementById('return_btn'),\r\n\t\t\t\t document.getElementById('choose_open'),\r\n\t\t\t\t document.getElementById('photos_show'),\r\n\t\t\t\t document.getElementById('upload_imgs'),\r\n\t\t\t\t document.getElementById('send_btn'));\r\n\r\nApp.init();\r\n\r\nfunction render(argument) {\r\n\r\n}\r\n\r\nfunction handleFiles(files) {\r\n\tif(files.length) {\r\n\t\tfiles = Array.prototype.slice.call(files);\r\n\t\tfor(let i = 0, len = files.length; i < len; i ++) {\r\n\t\t\tlet file = files[i];\r\n\t\t\tlet reader = new FileReader();\r\n\t\t\treader.onload = function() {\r\n\t\t\t\t//以base64格式将图片的编码添加到img的src中\r\n\t\t\t\tApp.photos_add.push(file);\r\n\t\t\t\tApp.photos_show.innerHTML += `<div class=\"photo_item\"><img class=\"${App.photos_add.length}\" style=\"width: 100%; height: 100%; object-fit: cover;\" src=${reader.result}></div>`;\r\n\t\t\t\tApp.adopt_photos_size();\r\n\t\t\t\tApp.assist_var.wait_show_photo.push(this.result);\r\n\t\t\t}\r\n\t\t\treader.readAsDataURL(file);\r\n\t\t}\r\n\t}\r\n}\r\n\r\nfunction getClientWidth() {\r\n\tlet page_width = window.innerWidth;\r\n\r\n\tif(typeof page_width != 'number') {\r\n\t\tif(document.compatMode == 'CSS1Compat') {\r\n\t\t\tpage_width = document.documentElement.clientWidth;\r\n\t\t} else {\r\n\t\t\tpage_width = document.body.clientWidth;\r\n\t\t}\r\n\t}\r\n\treturn page_width;\r\n}\r\n\r\n\n\n//# sourceURL=webpack:///./webapp/js/compile_page.js?");

/***/ }),

/***/ "./webapp/js/getBase64ImgWidthHeight.js":
/*!**********************************************!*\
  !*** ./webapp/js/getBase64ImgWidthHeight.js ***!
  \**********************************************/
/*! exports provided: getBase64ImgWidthHeight */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getBase64ImgWidthHeight\", function() { return getBase64ImgWidthHeight; });\n\r\n\r\n\r\n\r\nfunction getBase64ImgWidthHeight(img_src) {\r\n\tlet img = new Image();\r\n\timg.src = img_src;\r\n\treturn {\r\n\t\tw: img.width,\r\n\t\th: img.height\r\n\t};\r\n}\r\n\r\n\n\n//# sourceURL=webpack:///./webapp/js/getBase64ImgWidthHeight.js?");

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