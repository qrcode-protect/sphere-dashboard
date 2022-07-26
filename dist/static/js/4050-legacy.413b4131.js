"use strict";(self["webpackChunksphere_dashboard"]=self["webpackChunksphere_dashboard"]||[]).push([[4050,4952],{64190:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{QT:function(){return useRequest}});var _mnt_c_Users_sofiane_Documents_IT_Projects_sphere_dashboard_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(95082);var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(92222);var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_1__);var vue__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(66252);var vue__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(2262);var _app_vue_store__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(7280);var _app_modules_request_request__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(97339);var vuex__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(33907);var requests=(0,vue__WEBPACK_IMPORTED_MODULE_4__.Fl)({get:function get(){return _app_vue_store__WEBPACK_IMPORTED_MODULE_2__.Z.getters["request/requests"]},set:function set(value){return _app_vue_store__WEBPACK_IMPORTED_MODULE_2__.Z.commit("request/SET_REQUESTS",value)}});var paginationData=(0,vue__WEBPACK_IMPORTED_MODULE_4__.Fl)((function(){return _app_vue_store__WEBPACK_IMPORTED_MODULE_2__.Z.getters["request/paginationData"]}));var useRequest=function useRequest(request){var store=(0,vuex__WEBPACK_IMPORTED_MODULE_5__.oR)();var state=(0,vue__WEBPACK_IMPORTED_MODULE_6__.qj)({request:_app_modules_request_request__WEBPACK_IMPORTED_MODULE_3__.Z.create(),tableKeys:[{icon:"user-cowboy",prop:"member.companyName",label:"Société",casts:function casts(){var _request$member$compa,_request$member$compa2;return(_request$member$compa=request===null||request===void 0?void 0:(_request$member$compa2=request.member.companyName)===null||_request$member$compa2===void 0?void 0:_request$member$compa2.capitalize())!==null&&_request$member$compa!==void 0?_request$member$compa:"N/D"}},{icon:"user-cowboy",prop:"partner.companyName",label:"Fournisseur",casts:function casts(){var _request$partner$comp,_request$partner$comp2;return(_request$partner$comp=request===null||request===void 0?void 0:(_request$partner$comp2=request.partner.companyName)===null||_request$partner$comp2===void 0?void 0:_request$partner$comp2.capitalize())!==null&&_request$partner$comp!==void 0?_request$partner$comp:"N/D"}},{icon:"user-cowboy",prop:"created",label:"Date demande",casts:function casts(){return"".concat(request===null||request===void 0?void 0:request.created.format("DD/MM/YYYY"),' <span class="secondary-item-small">à ').concat(request===null||request===void 0?void 0:request.created.format("HH:mm"),"</span>")}},{icon:"user-cowboy",prop:"created",label:"Date réponse",casts:function casts(){return(request===null||request===void 0?void 0:request.quote)===null?"<i class='fal fa-times text-danger'/>":"".concat(request===null||request===void 0?void 0:request.updated.format("DD/MM/YYYY"),' <span class="secondary-item-small">à ').concat(request===null||request===void 0?void 0:request.updated.format("HH:mm"),"</span>")}}]});var storeRequest=function storeRequest(){return store.dispatch("request/store",{request:_app_modules_request_request__WEBPACK_IMPORTED_MODULE_3__.Z.create(state.request)})};return(0,_mnt_c_Users_sofiane_Documents_IT_Projects_sphere_dashboard_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__.Z)((0,_mnt_c_Users_sofiane_Documents_IT_Projects_sphere_dashboard_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__.Z)({},(0,vue__WEBPACK_IMPORTED_MODULE_6__.BK)(state)),{},{storeRequest:storeRequest,declineRequest:function declineRequest(){return request?store.dispatch("request/decline",{request:request}):null},acceptRequest:function acceptRequest(quotation,data){return request&&quotation?store.dispatch("request/accept",{data:{id:request.id,quotation:quotation.data,memberId:request.memberId,amount:data.amount,expiresAt:data.expiresAt}}):null},fetchAllRequests:function fetchAllRequests(){return store.dispatch("request/fetchAll")},fetchPending:function fetchPending(){return store.dispatch("request/fetchPending")},fetchAccepted:function fetchAccepted(){return store.dispatch("request/fetchAccepted")},fetchDeclined:function fetchDeclined(){return store.dispatch("request/fetchDeclined")},fetchTerminated:function fetchTerminated(){return store.dispatch("request/fetchTerminated")},fetchDeniedByMember:function fetchDeniedByMember(){return store.dispatch("request/fetchDeniedByMember")},fetchAllRequestsPaginated:function fetchAllRequestsPaginated(page){return store.dispatch("request/fetchAllPaginated",{page:page})},fetchPendingPaginated:function fetchPendingPaginated(page){return store.dispatch("request/fetchPendingPaginated",{page:page})},fetchAcceptedPaginated:function fetchAcceptedPaginated(page){return store.dispatch("request/fetchAcceptedPaginated",{page:page})},fetchDeclinedPaginated:function fetchDeclinedPaginated(page){return store.dispatch("request/fetchDeclinedPaginated",{page:page})},fetchTerminatedPaginated:function fetchTerminatedPaginated(page){return store.dispatch("request/fetchTerminatedPaginated",{page:page})},fetchDeniedByMemberPaginated:function fetchDeniedByMemberPaginated(page){return store.dispatch("request/fetchDeniedByMemberPaginated",{page:page})},requests:(0,vue__WEBPACK_IMPORTED_MODULE_4__.Fl)((function(){return store.getters["request/requests"]})),paginationData:paginationData,setRequest:function setRequest(request){return state.request=request},quotationStatus:(0,vue__WEBPACK_IMPORTED_MODULE_4__.Fl)((function(){var _request$quote,_request$quote2;return request!==null&&request!==void 0&&(_request$quote=request.quote)!==null&&_request$quote!==void 0&&_request$quote.isPending()?"En attente":request!==null&&request!==void 0&&(_request$quote2=request.quote)!==null&&_request$quote2!==void 0&&_request$quote2.isAccepted()?"Accepté":"Refusé"}))})}},84050:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,{default:function(){return table_request_body}});var runtime_core_esm_bundler=__webpack_require__(66252);var _hoisted_1={class:"table-request-body"};function render(_ctx,_cache,$props,$setup,$data,$options){var _component_table_request_row=(0,runtime_core_esm_bundler.up)("table-request-row");return(0,runtime_core_esm_bundler.wg)(),(0,runtime_core_esm_bundler.iD)("tbody",_hoisted_1,[((0,runtime_core_esm_bundler.wg)(true),(0,runtime_core_esm_bundler.iD)(runtime_core_esm_bundler.HY,null,(0,runtime_core_esm_bundler.Ko)(_ctx.requests,(function(request){return(0,runtime_core_esm_bundler.wg)(),(0,runtime_core_esm_bundler.j4)(_component_table_request_row,{request:request,onDetails:function onDetails($event){return _ctx.$emit("details",request)},onShowQuotation:_cache[0]||(_cache[0]=function(event){return _ctx.$emit("show-quotation",event)})},null,8,["request","onDetails"])})),256))])}var table_request_row=__webpack_require__(4952);var table_request_bodyvue_type_script_lang_ts=(0,runtime_core_esm_bundler.aZ)({name:"table-request-body",components:{TableRequestRow:table_request_row["default"]},props:{requests:{type:Array,required:true}},emits:["details","show-quotation"],setup:function setup(){return{}}});var exportHelper=__webpack_require__(83744);const __exports__=(0,exportHelper.Z)(table_request_bodyvue_type_script_lang_ts,[["render",render]]);var table_request_body=__exports__},4952:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,{default:function(){return table_request_row}});var runtime_core_esm_bundler=__webpack_require__(66252);var shared_esm_bundler=__webpack_require__(3577);var _withScopeId=function _withScopeId(n){return _pushScopeId("data-v-752f8f82"),n=n(),_popScopeId(),n};var _hoisted_1={class:"table-request-row box-ite"};var _hoisted_2=["innerHTML"];var _hoisted_3={class:"request-action fa-ul"};var _hoisted_4={class:"fa-li"};var _hoisted_5=(0,runtime_core_esm_bundler.Uk)("Afficher les détails ");var _hoisted_6={class:"fa-li"};var _hoisted_7=(0,runtime_core_esm_bundler.Uk)("Voir le devis ");var _hoisted_8={class:"fa-li"};var _hoisted_9=(0,runtime_core_esm_bundler.Uk)("Refuser ");function render(_ctx,_cache,$props,$setup,$data,$options){var _component_ssf_icon=(0,runtime_core_esm_bundler.up)("ssf-icon");var _component_vue_popper=(0,runtime_core_esm_bundler.up)("vue-popper");return(0,runtime_core_esm_bundler.wg)(),(0,runtime_core_esm_bundler.iD)("tr",_hoisted_1,[((0,runtime_core_esm_bundler.wg)(true),(0,runtime_core_esm_bundler.iD)(runtime_core_esm_bundler.HY,null,(0,runtime_core_esm_bundler.Ko)(_ctx.tableKeys,(function(key){return(0,runtime_core_esm_bundler.wg)(),(0,runtime_core_esm_bundler.iD)("td",{class:(0,shared_esm_bundler.C_)({"text-center":key.center})},[(0,runtime_core_esm_bundler._)("span",{innerHTML:key.casts?key.casts(_ctx.request[key.prop]):_ctx.request[key.prop]},null,8,_hoisted_2)],2)})),256)),(0,runtime_core_esm_bundler._)("td",null,[(0,runtime_core_esm_bundler.Wm)(_component_vue_popper,{content:_ctx.requestStatusPopper,hover:""},{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_ssf_icon,{class:(0,shared_esm_bundler.C_)(_ctx.requestStatusColor),icon:_ctx.requestStatusIcon,light:""},null,8,["class","icon"])]})),_:1},8,["content"])]),(0,runtime_core_esm_bundler._)("td",null,[(0,runtime_core_esm_bundler.Wm)(_component_vue_popper,{interactive:false,arrow:""},{content:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler._)("ul",_hoisted_3,[(0,runtime_core_esm_bundler._)("li",{class:"py-1",onClick:_cache[0]||(_cache[0]=function($event){return _ctx.$emit("details")})},[(0,runtime_core_esm_bundler._)("span",_hoisted_4,[(0,runtime_core_esm_bundler.Wm)(_component_ssf_icon,{class:"color-2",duotone:"",icon:"eye"})]),_hoisted_5]),_ctx.request.quote?((0,runtime_core_esm_bundler.wg)(),(0,runtime_core_esm_bundler.iD)("li",{key:0,class:"py-1",onClick:_cache[1]||(_cache[1]=function($event){return _ctx.$emit("show-quotation",_ctx.request.quote)})},[(0,runtime_core_esm_bundler._)("span",_hoisted_6,[(0,runtime_core_esm_bundler.Wm)(_component_ssf_icon,{class:"color-2",duotone:"",icon:"file-pdf"})]),_hoisted_7])):(0,runtime_core_esm_bundler.kq)("",true),_ctx.request.pending?((0,runtime_core_esm_bundler.wg)(),(0,runtime_core_esm_bundler.iD)("li",{key:1,class:"py-1",onClick:_cache[2]||(_cache[2]=function(){return _ctx.declineRequest&&_ctx.declineRequest.apply(_ctx,arguments)})},[(0,runtime_core_esm_bundler._)("span",_hoisted_8,[(0,runtime_core_esm_bundler.Wm)(_component_ssf_icon,{class:"color-2",duotone:"",icon:"times"})]),_hoisted_9])):(0,runtime_core_esm_bundler.kq)("",true)])]})),default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_ssf_icon,{class:"cursor-pointer",icon:"ellipsis",light:"",size:"lg"})]})),_:1})])])}var request=__webpack_require__(97339);var request_module=__webpack_require__(64190);var popper_esm=__webpack_require__(51595);var table_request_rowvue_type_script_lang_ts=(0,runtime_core_esm_bundler.aZ)({name:"table-request-row",props:{request:{type:request.Z,required:true}},components:{VuePopper:popper_esm.Z},emits:["details","show-quotation"],setup:function setup(props){var _useRequest=(0,request_module.QT)(props.request),tableKeys=_useRequest.tableKeys,declineRequest=_useRequest.declineRequest,setRequest=_useRequest.setRequest;var requestStatusIcon=(0,runtime_core_esm_bundler.Fl)((function(){var _props$request$quote,_props$request$quote2;return props.request.accepted?(_props$request$quote=props.request.quote)!==null&&_props$request$quote!==void 0&&_props$request$quote.accepted?"check":(_props$request$quote2=props.request.quote)!==null&&_props$request$quote2!==void 0&&_props$request$quote2.isPending()?"hourglass":"times":props.request.declined?"times":"question-circle"}));var requestStatusPopper=(0,runtime_core_esm_bundler.Fl)((function(){var _props$request$quote3,_props$request$quote4;return props.request.accepted?(_props$request$quote3=props.request.quote)!==null&&_props$request$quote3!==void 0&&_props$request$quote3.accepted?"Terminé":(_props$request$quote4=props.request.quote)!==null&&_props$request$quote4!==void 0&&_props$request$quote4.isPending()?"Attente du client":"Refusé (client)":props.request.declined?"Refusé (fournisseur)":"Attente du fournisseur"}));var requestStatusColor=(0,runtime_core_esm_bundler.Fl)((function(){return props.request.accepted?"text-success":props.request.declined?"text-danger":"text-warning"}));(0,runtime_core_esm_bundler.YP)((function(){return props.request}),(function(){return setRequest(props.request)}),{immediate:true});return{tableKeys:tableKeys,declineRequest:declineRequest,requestStatusIcon:requestStatusIcon,requestStatusColor:requestStatusColor,requestStatusPopper:requestStatusPopper}}});var exportHelper=__webpack_require__(83744);const __exports__=(0,exportHelper.Z)(table_request_rowvue_type_script_lang_ts,[["render",render],["__scopeId","data-v-752f8f82"]]);var table_request_row=__exports__}}]);