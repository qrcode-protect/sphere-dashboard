"use strict";(self["webpackChunksphere_dashboard"]=self["webpackChunksphere_dashboard"]||[]).push([[9032,3278,7305],{37670:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{c:function(){return useForm}});var _mnt_c_Users_sofiane_Documents_IT_Projects_sphere_dashboard_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(95082);var vue__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(2262);var _app_commons_validation__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(81909);var useForm=function useForm(){var state=(0,vue__WEBPACK_IMPORTED_MODULE_2__.qj)({error:null,success:null,errors:[],loading:false});var validator=function validator(data){var _result$errors;var result=(0,_app_commons_validation__WEBPACK_IMPORTED_MODULE_1__.sC)(data);state.errors=(_result$errors=result.errors)!==null&&_result$errors!==void 0?_result$errors:[];state.error=result.error;return result.valid};var setLoading=function setLoading(value){return state.loading=value};var setError=function setError(value){return state.error=value};var setSuccess=function setSuccess(value){return state.success=value};return(0,_mnt_c_Users_sofiane_Documents_IT_Projects_sphere_dashboard_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__.Z)((0,_mnt_c_Users_sofiane_Documents_IT_Projects_sphere_dashboard_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__.Z)({},(0,vue__WEBPACK_IMPORTED_MODULE_2__.BK)(state)),{},{validator:validator,setLoading:setLoading,setError:setError,setSuccess:setSuccess})}},27305:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,{default:function(){return form_next_button}});var runtime_core_esm_bundler=__webpack_require__(66252);var shared_esm_bundler=__webpack_require__(3577);var _hoisted_1={class:"btn color-2 pr-0",type:"button"};function render(_ctx,_cache,$props,$setup,$data,$options){var _component_ssf_icon=(0,runtime_core_esm_bundler.up)("ssf-icon");var _component_ssf_col=(0,runtime_core_esm_bundler.up)("ssf-col");var _component_ssf_row=(0,runtime_core_esm_bundler.up)("ssf-row");var _component_ssf_container=(0,runtime_core_esm_bundler.up)("ssf-container");return(0,runtime_core_esm_bundler.wg)(),(0,runtime_core_esm_bundler.j4)(_component_ssf_container,{name:"form-next-button","not-full":"",onClick:_cache[0]||(_cache[0]=function($event){return _ctx.$emit("next")})},{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_ssf_row,null,{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_ssf_col,{class:"text-right",size:"12"},{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler._)("button",_hoisted_1,[(0,runtime_core_esm_bundler.Uk)((0,shared_esm_bundler.zw)(_ctx.text)+" ",1),(0,runtime_core_esm_bundler.Wm)(_component_ssf_icon,{icon:"arrow-to-right",light:""})])]})),_:1})]})),_:1})]})),_:1})}var form_next_buttonvue_type_script_lang_ts=(0,runtime_core_esm_bundler.aZ)({name:"form-next-button",emits:["next"],props:{text:{type:String,required:false,default:"Suivant"}},setup:function setup(){return{}}});var exportHelper=__webpack_require__(83744);const __exports__=(0,exportHelper.Z)(form_next_buttonvue_type_script_lang_ts,[["render",render]]);var form_next_button=__exports__}}]);