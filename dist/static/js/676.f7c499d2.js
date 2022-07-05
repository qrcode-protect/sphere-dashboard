"use strict";(self["webpackChunksphere_dashboard"]=self["webpackChunksphere_dashboard"]||[]).push([[676],{5907:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{i:function(){return useTenders},z:function(){return useTender}});var _mnt_c_Users_sofiane_Documents_IT_Projects_sphere_dashboard_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(5082);var vue__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(2262);var vue__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(6252);var vuex__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(3907);var _app_vue_utils_helpers__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(6818);var useTenders=function useTenders(){var store=(0,vuex__WEBPACK_IMPORTED_MODULE_1__.oR)();var state=(0,vue__WEBPACK_IMPORTED_MODULE_2__.qj)([]);var tenders=(0,vue__WEBPACK_IMPORTED_MODULE_3__.Fl)((function(){return store.getters["tender/tenders"]}));return(0,_mnt_c_Users_sofiane_Documents_IT_Projects_sphere_dashboard_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__.Z)((0,_mnt_c_Users_sofiane_Documents_IT_Projects_sphere_dashboard_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__.Z)({},(0,vue__WEBPACK_IMPORTED_MODULE_2__.BK)(state)),{},{tenders:tenders,hasTenders:(0,vue__WEBPACK_IMPORTED_MODULE_3__.Fl)((function(){return tenders.value&&tenders.value.length>0})),fetchAllTenders:function fetchAllTenders(){return store.dispatch("tender/fetchAll")}})};var useTender=function useTender(tender){var dateFormat=arguments.length>1&&arguments[1]!==undefined?arguments[1]:"DD/MM/YYYY";var state=(0,vue__WEBPACK_IMPORTED_MODULE_2__.qj)({full:false,actions:[]});var actionsList=function actionsList(){return[{method:destroy,label:"Supprimer",icon:"trash-can-list"},{method:toggleActive,label:tender.available?"Bloquer":"Débloquer",icon:tender.available?"ban":"check-double"}]};var updateActions=function updateActions(){return state.actions=actionsList()};var destroy=function destroy(){return tender.destroy()};var toggleActive=function toggleActive(){return(tender.available?tender.block():tender.unblock()).then((function(response){tender.available=response.available;console.log(tender.available,response);return updateActions()}))};(0,vue__WEBPACK_IMPORTED_MODULE_3__.bv)((function(){return state.actions=actionsList()}));return(0,_mnt_c_Users_sofiane_Documents_IT_Projects_sphere_dashboard_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__.Z)((0,_mnt_c_Users_sofiane_Documents_IT_Projects_sphere_dashboard_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__.Z)({},(0,vue__WEBPACK_IMPORTED_MODULE_2__.BK)(state)),{},{toggleFull:function toggleFull(){return state.full=!state.full},amount:(0,vue__WEBPACK_IMPORTED_MODULE_3__.Fl)((function(){return tender.amount?"".concat(_app_vue_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.Rx.pretty(tender.amount),"€"):"aucun"})),publishedAt:(0,vue__WEBPACK_IMPORTED_MODULE_3__.Fl)((function(){var _tender$publishedAt$f,_tender$publishedAt;return(_tender$publishedAt$f=(_tender$publishedAt=tender.publishedAt)===null||_tender$publishedAt===void 0?void 0:_tender$publishedAt.format(dateFormat))!==null&&_tender$publishedAt$f!==void 0?_tender$publishedAt$f:"inconnue"})),expiresAt:(0,vue__WEBPACK_IMPORTED_MODULE_3__.Fl)((function(){var _tender$expiresAt$for,_tender$expiresAt;return(_tender$expiresAt$for=(_tender$expiresAt=tender.expiresAt)===null||_tender$expiresAt===void 0?void 0:_tender$expiresAt.format(dateFormat))!==null&&_tender$expiresAt$for!==void 0?_tender$expiresAt$for:"aucune"})),beginAt:(0,vue__WEBPACK_IMPORTED_MODULE_3__.Fl)((function(){var _tender$beginAt$forma,_tender$beginAt;return(_tender$beginAt$forma=(_tender$beginAt=tender.beginAt)===null||_tender$beginAt===void 0?void 0:_tender$beginAt.format(dateFormat))!==null&&_tender$beginAt$forma!==void 0?_tender$beginAt$forma:"inconnue"})),endAt:(0,vue__WEBPACK_IMPORTED_MODULE_3__.Fl)((function(){var _tender$endAt$format,_tender$endAt;return(_tender$endAt$format=(_tender$endAt=tender.endAt)===null||_tender$endAt===void 0?void 0:_tender$endAt.format(dateFormat))!==null&&_tender$endAt$format!==void 0?_tender$endAt$format:"inconnue"})),shortDescription:(0,vue__WEBPACK_IMPORTED_MODULE_3__.Fl)((function(){var _tender$description;return(_tender$description=tender.description)===null||_tender$description===void 0?void 0:_tender$description.substring(0,200)}))})}},676:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,{default:function(){return list_tender_item}});var runtime_core_esm_bundler=__webpack_require__(6252);var shared_esm_bundler=__webpack_require__(3577);var runtime_dom_esm_bundler=__webpack_require__(9963);var _withScopeId=function _withScopeId(n){return(0,runtime_core_esm_bundler.dD)("data-v-63eba0b4"),n=n(),(0,runtime_core_esm_bundler.Cn)(),n};var _hoisted_1={class:"pl-0 mb-0"};var _hoisted_2=["onClick"];var _hoisted_3={class:"ml-2"};var _hoisted_4=(0,runtime_core_esm_bundler.Uk)(" Date de ");var _hoisted_5=_withScopeId((function(){return(0,runtime_core_esm_bundler._)("span",{class:"font-weight-bold"},"publication",-1)}));var _hoisted_6=(0,runtime_core_esm_bundler.Uk)(" Date d'");var _hoisted_7=_withScopeId((function(){return(0,runtime_core_esm_bundler._)("span",{class:"font-weight-bold"},"expiration",-1)}));var _hoisted_8=(0,runtime_core_esm_bundler.Uk)(" Date de ");var _hoisted_9=_withScopeId((function(){return(0,runtime_core_esm_bundler._)("span",{class:"font-weight-bold"},"début",-1)}));var _hoisted_10=(0,runtime_core_esm_bundler.Uk)(" Date de ");var _hoisted_11=_withScopeId((function(){return(0,runtime_core_esm_bundler._)("span",{class:"font-weight-bold"},"fin",-1)}));var _hoisted_12=(0,runtime_core_esm_bundler.Uk)("Description");var _hoisted_13={key:0};var _hoisted_14={key:0};var _hoisted_15=(0,runtime_core_esm_bundler.Uk)(",");var _hoisted_16=_withScopeId((function(){return(0,runtime_core_esm_bundler._)("br",null,null,-1)}));var _hoisted_17=_withScopeId((function(){return(0,runtime_core_esm_bundler._)("span",null,[(0,runtime_core_esm_bundler._)("br")],-1)}));var _hoisted_18={key:1};var _hoisted_19=(0,runtime_core_esm_bundler.Uk)("bloquée");function render(_ctx,_cache,$props,$setup,$data,$options){var _component_ssf_container=(0,runtime_core_esm_bundler.up)("ssf-container");var _component_ssf_title=(0,runtime_core_esm_bundler.up)("ssf-title");var _component_ssf_col=(0,runtime_core_esm_bundler.up)("ssf-col");var _component_ssf_icon=(0,runtime_core_esm_bundler.up)("ssf-icon");var _component_ssf_shape=(0,runtime_core_esm_bundler.up)("ssf-shape");var _component_vue_popper=(0,runtime_core_esm_bundler.up)("vue-popper");var _component_ssf_row=(0,runtime_core_esm_bundler.up)("ssf-row");var _component_ssf_text=(0,runtime_core_esm_bundler.up)("ssf-text");return(0,runtime_core_esm_bundler.wg)(),(0,runtime_core_esm_bundler.j4)(_component_ssf_container,{class:"box-item px-3",name:"list-tender-item",relative:""},{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_ssf_container,{class:"py-2",name:"list-tender-header"},{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_ssf_container,{class:"pr-3",relative:""},{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_ssf_container,{class:"left-absolute h-100 bg-color-2","not-full":"",style:{width:"2px"}}),(0,runtime_core_esm_bundler.Wm)(_component_ssf_col,{size:"12"},{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_ssf_title,null,{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Uk)((0,shared_esm_bundler.zw)(_ctx.tender.title),1)]})),_:1})]})),_:1}),(0,runtime_core_esm_bundler.Wm)(_component_ssf_container,{class:"right-absolute full-flex","not-full":""},{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_vue_popper,{interactive:false,arrow:"",zIndex:"1050"},{content:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler._)("ul",_hoisted_1,[((0,runtime_core_esm_bundler.wg)(true),(0,runtime_core_esm_bundler.iD)(runtime_core_esm_bundler.HY,null,(0,runtime_core_esm_bundler.Ko)(_ctx.actions,(function(action){return(0,runtime_core_esm_bundler.wg)(),(0,runtime_core_esm_bundler.iD)("li",{class:"action-item p-2 cursor-pointer rounded",onClick:(0,runtime_dom_esm_bundler.iM)(action.method,["prevent"])},[(0,runtime_core_esm_bundler.Wm)(_component_ssf_icon,{icon:action.icon,fw:"",light:""},null,8,["icon"]),(0,runtime_core_esm_bundler._)("span",_hoisted_3,(0,shared_esm_bundler.zw)(action.label),1)],8,_hoisted_2)})),256))])]})),default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_ssf_shape,{size:"25",class:"cursor-pointer"},{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_ssf_icon,{icon:"ellipsis-vertical"})]})),_:1})]})),_:1}),(0,runtime_core_esm_bundler.Wm)(_component_ssf_shape,{size:"25",class:"cursor-pointer",onClick:_ctx.toggleFull},{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_ssf_icon,{icon:"angle-".concat(_ctx.full?"up":"down")},null,8,["icon"])]})),_:1},8,["onClick"])]})),_:1})]})),_:1})]})),_:1}),(0,runtime_core_esm_bundler.Wm)(_component_ssf_container,{name:"list-tender-body"},{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_ssf_container,{class:"p-3 border-top"},{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_ssf_row,null,{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_ssf_col,{class:"justify-flex flex-column",size:"6"},{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Uk)(" Montant maximal : "+(0,shared_esm_bundler.zw)(_ctx.amount),1)]})),_:1}),(0,runtime_core_esm_bundler.Wm)(_component_ssf_col,{class:"font-italic",size:"6"},{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_ssf_container,null,{default:(0,runtime_core_esm_bundler.w5)((function(){return[_hoisted_4,_hoisted_5,(0,runtime_core_esm_bundler.Uk)(" : "+(0,shared_esm_bundler.zw)(_ctx.publishedAt),1)]})),_:1}),_ctx.expiresAt?((0,runtime_core_esm_bundler.wg)(),(0,runtime_core_esm_bundler.j4)(_component_ssf_container,{key:0},{default:(0,runtime_core_esm_bundler.w5)((function(){return[_hoisted_6,_hoisted_7,(0,runtime_core_esm_bundler.Uk)(" : "+(0,shared_esm_bundler.zw)(_ctx.expiresAt),1)]})),_:1})):(0,runtime_core_esm_bundler.kq)("",true)]})),_:1})]})),_:1})]})),_:1}),_ctx.full?((0,runtime_core_esm_bundler.wg)(),(0,runtime_core_esm_bundler.j4)(_component_ssf_container,{key:0,class:"px-3 py-2 border-top"},{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_ssf_row,null,{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_ssf_col,{class:"font-italic",size:"6"},{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_ssf_container,null,{default:(0,runtime_core_esm_bundler.w5)((function(){return[_hoisted_8,_hoisted_9,(0,runtime_core_esm_bundler.Uk)(" : "+(0,shared_esm_bundler.zw)(_ctx.beginAt),1)]})),_:1})]})),_:1}),(0,runtime_core_esm_bundler.Wm)(_component_ssf_col,{class:"font-italic ml-auto",size:"6"},{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_ssf_container,null,{default:(0,runtime_core_esm_bundler.w5)((function(){return[_hoisted_10,_hoisted_11,(0,runtime_core_esm_bundler.Uk)(" : "+(0,shared_esm_bundler.zw)(_ctx.endAt),1)]})),_:1})]})),_:1})]})),_:1})]})),_:1})):(0,runtime_core_esm_bundler.kq)("",true),(0,runtime_core_esm_bundler.Wm)(_component_ssf_container,{class:"px-3 py-2 border-top"},{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_ssf_row,null,{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_ssf_col,{size:"12"},{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_ssf_title,{h6:""},{default:(0,runtime_core_esm_bundler.w5)((function(){return[_hoisted_12]})),_:1}),_ctx.full?((0,runtime_core_esm_bundler.wg)(),(0,runtime_core_esm_bundler.j4)(_component_ssf_container,{key:0},{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler._)("p",null,(0,shared_esm_bundler.zw)(_ctx.tender.description),1)]})),_:1})):((0,runtime_core_esm_bundler.wg)(),(0,runtime_core_esm_bundler.j4)(_component_ssf_container,{key:1},{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler._)("p",null,(0,shared_esm_bundler.zw)(_ctx.shortDescription)+"...",1)]})),_:1}))]})),_:1})]})),_:1})]})),_:1})]})),_:1}),(0,runtime_core_esm_bundler.Wm)(_component_ssf_container,{class:"border-top",name:"list-tender-footer"},{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_ssf_container,{class:"px-3 py-2"},{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_ssf_col,{size:"12"},{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_ssf_row,null,{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_ssf_col,{"max-width":"30","no-padding":""},{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_ssf_icon,{icon:"location-dot",size:"sm",thin:""})]})),_:1}),(0,runtime_core_esm_bundler.Wm)(_component_ssf_col,{"no-padding":""},{default:(0,runtime_core_esm_bundler.w5)((function(){var _ctx$tender$address$a,_ctx$tender$address$c,_ctx$tender$address$c2;return[_ctx.full?((0,runtime_core_esm_bundler.wg)(),(0,runtime_core_esm_bundler.iD)("span",_hoisted_13,[(0,runtime_core_esm_bundler._)("span",null,(0,shared_esm_bundler.zw)(_ctx.tender.address.street_number)+" "+(0,shared_esm_bundler.zw)((_ctx$tender$address$a=_ctx.tender.address.address)===null||_ctx$tender$address$a===void 0?void 0:_ctx$tender$address$a.wordCapitalize()),1),_ctx.tender.address.address2?((0,runtime_core_esm_bundler.wg)(),(0,runtime_core_esm_bundler.iD)("span",_hoisted_14,[_hoisted_15,_hoisted_16,(0,runtime_core_esm_bundler.Uk)((0,shared_esm_bundler.zw)(_ctx.tender.address.address2.wordCapitalize()),1)])):(0,runtime_core_esm_bundler.kq)("",true),_hoisted_17,(0,runtime_core_esm_bundler._)("span",null,(0,shared_esm_bundler.zw)(_ctx.tender.address.zipcode)+" "+(0,shared_esm_bundler.zw)((_ctx$tender$address$c=_ctx.tender.address.city)===null||_ctx$tender$address$c===void 0?void 0:_ctx$tender$address$c.capitalize()),1)])):((0,runtime_core_esm_bundler.wg)(),(0,runtime_core_esm_bundler.iD)("span",_hoisted_18,(0,shared_esm_bundler.zw)((_ctx$tender$address$c2=_ctx.tender.address.city)===null||_ctx$tender$address$c2===void 0?void 0:_ctx$tender$address$c2.capitalize())+" ("+(0,shared_esm_bundler.zw)(_ctx.tender.address.zipcode)+")",1))]})),_:1})]})),_:1})]})),_:1})]})),_:1})]})),_:1}),!(_ctx.tender.available===true)?((0,runtime_core_esm_bundler.wg)(),(0,runtime_core_esm_bundler.j4)(_component_ssf_container,{key:0,class:"blocked-banner full-absolute px-3 rounded"},{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_ssf_container,{class:"blocked-banner-bg bg-danger rounded"}),(0,runtime_core_esm_bundler.Wm)(_component_ssf_container,{class:"blocked-banner-text full-flex full-absolute"},{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_ssf_text,{class:"text-white text-uppercase font-weight-bold"},{default:(0,runtime_core_esm_bundler.w5)((function(){return[_hoisted_19]})),_:1})]})),_:1})]})),_:1})):(0,runtime_core_esm_bundler.kq)("",true)]})),_:1})}var reactivity_esm_bundler=__webpack_require__(2262);var tender=__webpack_require__(9422);var tender_module=__webpack_require__(5907);var popper_esm=__webpack_require__(1595);var list_tender_itemvue_type_script_lang_ts=(0,runtime_core_esm_bundler.aZ)({name:"list-tender-item",components:{VuePopper:popper_esm.Z},props:{tender:{type:tender.Z,required:true}},setup:function setup(props){var tender=(0,reactivity_esm_bundler.Vh)(props,"tender");var _useTender=(0,tender_module.z)(tender.value),amount=_useTender.amount,beginAt=_useTender.beginAt,endAt=_useTender.endAt,publishedAt=_useTender.publishedAt,expiresAt=_useTender.expiresAt,full=_useTender.full,shortDescription=_useTender.shortDescription,toggleFull=_useTender.toggleFull,actions=_useTender.actions;return{amount:amount,publishedAt:publishedAt,expiresAt:expiresAt,beginAt:beginAt,endAt:endAt,shortDescription:shortDescription,full:full,toggleFull:toggleFull,actions:actions}}});var exportHelper=__webpack_require__(3744);const __exports__=(0,exportHelper.Z)(list_tender_itemvue_type_script_lang_ts,[["render",render],["__scopeId","data-v-63eba0b4"]]);var list_tender_item=__exports__}}]);