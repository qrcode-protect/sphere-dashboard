"use strict";(self["webpackChunksphere_dashboard"]=self["webpackChunksphere_dashboard"]||[]).push([[715],{790:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){var _mnt_c_Users_sofiane_Documents_IT_Projects_sphere_dashboard_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(2833);var _mnt_c_Users_sofiane_Documents_IT_Projects_sphere_dashboard_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(3087);var _mnt_c_Users_sofiane_Documents_IT_Projects_sphere_dashboard_node_modules_babel_runtime_helpers_esm_inherits_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(3806);var _mnt_c_Users_sofiane_Documents_IT_Projects_sphere_dashboard_node_modules_babel_runtime_helpers_esm_createSuper_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(4343);var _app_http_controllers_controller__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(1330);var AuthController=function(_Controller){(0,_mnt_c_Users_sofiane_Documents_IT_Projects_sphere_dashboard_node_modules_babel_runtime_helpers_esm_inherits_js__WEBPACK_IMPORTED_MODULE_1__.Z)(AuthController,_Controller);var _super=(0,_mnt_c_Users_sofiane_Documents_IT_Projects_sphere_dashboard_node_modules_babel_runtime_helpers_esm_createSuper_js__WEBPACK_IMPORTED_MODULE_2__.Z)(AuthController);function AuthController(){(0,_mnt_c_Users_sofiane_Documents_IT_Projects_sphere_dashboard_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_0__.Z)(this,AuthController);return _super.apply(this,arguments)}return(0,_mnt_c_Users_sofiane_Documents_IT_Projects_sphere_dashboard_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_4__.Z)(AuthController)}(_app_http_controllers_controller__WEBPACK_IMPORTED_MODULE_3__.Z);__webpack_exports__["Z"]=new AuthController},8432:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Z:function(){return Auth}});var _mnt_c_Users_sofiane_Documents_IT_Projects_sphere_dashboard_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__(5082);var _mnt_c_Users_sofiane_Documents_IT_Projects_sphere_dashboard_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(3087);var _mnt_c_Users_sofiane_Documents_IT_Projects_sphere_dashboard_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(2833);var _mnt_c_Users_sofiane_Documents_IT_Projects_sphere_dashboard_node_modules_babel_runtime_helpers_esm_assertThisInitialized_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(2417);var _mnt_c_Users_sofiane_Documents_IT_Projects_sphere_dashboard_node_modules_babel_runtime_helpers_esm_inherits_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(3806);var _mnt_c_Users_sofiane_Documents_IT_Projects_sphere_dashboard_node_modules_babel_runtime_helpers_esm_createSuper_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(4343);var _mnt_c_Users_sofiane_Documents_IT_Projects_sphere_dashboard_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(2482);var _sofiakb_vue3_framework_models_model__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(987);var _app_modules_auth_auth_controller__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(790);var Auth=function(_Model){(0,_mnt_c_Users_sofiane_Documents_IT_Projects_sphere_dashboard_node_modules_babel_runtime_helpers_esm_inherits_js__WEBPACK_IMPORTED_MODULE_2__.Z)(Auth,_Model);var _super=(0,_mnt_c_Users_sofiane_Documents_IT_Projects_sphere_dashboard_node_modules_babel_runtime_helpers_esm_createSuper_js__WEBPACK_IMPORTED_MODULE_3__.Z)(Auth);function Auth(){var _this;var options=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{controller:_app_modules_auth_auth_controller__WEBPACK_IMPORTED_MODULE_5__.Z};(0,_mnt_c_Users_sofiane_Documents_IT_Projects_sphere_dashboard_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_0__.Z)(this,Auth);_this=_super.call(this,options);(0,_mnt_c_Users_sofiane_Documents_IT_Projects_sphere_dashboard_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_6__.Z)((0,_mnt_c_Users_sofiane_Documents_IT_Projects_sphere_dashboard_node_modules_babel_runtime_helpers_esm_assertThisInitialized_js__WEBPACK_IMPORTED_MODULE_1__.Z)(_this),"attributes",{id:{prop:"id",comment:"Identifiant"}});(0,_mnt_c_Users_sofiane_Documents_IT_Projects_sphere_dashboard_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_6__.Z)((0,_mnt_c_Users_sofiane_Documents_IT_Projects_sphere_dashboard_node_modules_babel_runtime_helpers_esm_assertThisInitialized_js__WEBPACK_IMPORTED_MODULE_1__.Z)(_this),"casts",{created:"date",updated:"date"});_this.model=eval(_this.__resolve.model(options.name||_this.constructor.name));return _this}(0,_mnt_c_Users_sofiane_Documents_IT_Projects_sphere_dashboard_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_7__.Z)(Auth,null,[{key:"login",value:function login(user){var _this2=this;return new Promise((function(resolve,reject){_app_modules_auth_auth_controller__WEBPACK_IMPORTED_MODULE_5__.Z.post("".concat(_this2.PREFIX,"/login"),(0,_mnt_c_Users_sofiane_Documents_IT_Projects_sphere_dashboard_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_8__.Z)({},user),{redirectIfNotLogged:false}).then((function(response){return resolve(response)})).catch((function(error){return reject(error)}))}))}},{key:"register",value:function register(user){var _this3=this;return new Promise((function(resolve,reject){_app_modules_auth_auth_controller__WEBPACK_IMPORTED_MODULE_5__.Z.post("".concat(_this3.PREFIX,"/register"),user,{redirectIfNotLogged:false}).then((function(response){return resolve(response)})).catch((function(error){return reject(error)}))}))}},{key:"forgot",value:function forgot(user){var _this4=this;return new Promise((function(resolve,reject){_app_modules_auth_auth_controller__WEBPACK_IMPORTED_MODULE_5__.Z.post("".concat(_this4.PREFIX,"/password/forgot"),user,{redirectIfNotLogged:false}).then((function(response){return resolve(response)})).catch((function(error){return reject(error)}))}))}},{key:"reset",value:function reset(user){var _this5=this;return new Promise((function(resolve,reject){_app_modules_auth_auth_controller__WEBPACK_IMPORTED_MODULE_5__.Z.post("".concat(_this5.PREFIX,"/password/reset"),user,{redirectIfNotLogged:false}).then((function(response){return resolve(response)})).catch((function(error){return reject(error)}))}))}}]);return Auth}(_sofiakb_vue3_framework_models_model__WEBPACK_IMPORTED_MODULE_4__["default"]);(0,_mnt_c_Users_sofiane_Documents_IT_Projects_sphere_dashboard_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_6__.Z)(Auth,"icon",{name:"test",type:"la"});(0,_mnt_c_Users_sofiane_Documents_IT_Projects_sphere_dashboard_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_6__.Z)(Auth,"PREFIX","/auth")},715:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,{login:function(){return login},navigate:function(){return navigate},password:function(){return password},register:function(){return register}});var _app_commons__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(8416);var _app_vue_utils__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(9996);var _app_modules_auth_auth__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(8432);var login=function login(user){return _app_modules_auth_auth__WEBPACK_IMPORTED_MODULE_2__.Z.login(user)};var register=function register(user){return _app_modules_auth_auth__WEBPACK_IMPORTED_MODULE_2__.Z.register(user)};var password={forgot:function forgot(user){return _app_modules_auth_auth__WEBPACK_IMPORTED_MODULE_2__.Z.forgot(user)},reset:function reset(user){return _app_modules_auth_auth__WEBPACK_IMPORTED_MODULE_2__.Z.reset(user)}};var navigate={login:function login(){var params=arguments.length>0&&arguments[0]!==undefined?arguments[0]:(0,_app_vue_utils__WEBPACK_IMPORTED_MODULE_1__.B5)();return(0,_app_commons__WEBPACK_IMPORTED_MODULE_0__.c4)("login",params)},register:function register(){var params=arguments.length>0&&arguments[0]!==undefined?arguments[0]:(0,_app_vue_utils__WEBPACK_IMPORTED_MODULE_1__.B5)();return(0,_app_commons__WEBPACK_IMPORTED_MODULE_0__.c4)("register",params)},password:{reset:function reset(){var params=arguments.length>0&&arguments[0]!==undefined?arguments[0]:(0,_app_vue_utils__WEBPACK_IMPORTED_MODULE_1__.B5)();return(0,_app_commons__WEBPACK_IMPORTED_MODULE_0__.c4)("password.reset",params)}}}}}]);