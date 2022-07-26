"use strict";(self["webpackChunksphere_dashboard"]=self["webpackChunksphere_dashboard"]||[]).push([[9857,2164],{48028:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Z:function(){return useConversations}});var _mnt_c_Users_sofiane_Documents_IT_Projects_sphere_dashboard_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(95082);var vue__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(2262);var vue__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(66252);var vuex__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(33907);var useConversations=function useConversations(){var store=(0,vuex__WEBPACK_IMPORTED_MODULE_1__.oR)();var state=(0,vue__WEBPACK_IMPORTED_MODULE_2__.qj)([]);var conversations=(0,vue__WEBPACK_IMPORTED_MODULE_3__.Fl)((function(){return store.getters["conversation/conversations"]}));return(0,_mnt_c_Users_sofiane_Documents_IT_Projects_sphere_dashboard_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__.Z)((0,_mnt_c_Users_sofiane_Documents_IT_Projects_sphere_dashboard_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__.Z)({},(0,vue__WEBPACK_IMPORTED_MODULE_2__.BK)(state)),{},{conversations:conversations,conversation:(0,vue__WEBPACK_IMPORTED_MODULE_3__.Fl)((function(){return store.getters["conversation/conversation"]})),hasConversations:(0,vue__WEBPACK_IMPORTED_MODULE_3__.Fl)((function(){return conversations.value&&conversations.value.length>0})),fetchAllConversations:function fetchAllConversations(){return store.dispatch("conversation/fetchAll")},fetchConversationById:function fetchConversationById(conversationId){return store.dispatch("conversation/fetchById",{id:conversationId})},selectConversation:function selectConversation(conversation){return store.commit("conversation/SET_CONVERSATION",conversation)}})};var useConversation=function useConversation(conversation){var dateFormat=arguments.length>1&&arguments[1]!==undefined?arguments[1]:"DD/MM/YYYY"}},27782:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Z:function(){return page_title}});var runtime_core_esm_bundler=__webpack_require__(66252);var shared_esm_bundler=__webpack_require__(3577);function render(_ctx,_cache,$props,$setup,$data,$options){var _component_ssf_title=(0,runtime_core_esm_bundler.up)("ssf-title");var _component_ssf_container=(0,runtime_core_esm_bundler.up)("ssf-container");return(0,runtime_core_esm_bundler.wg)(),(0,runtime_core_esm_bundler.j4)(_component_ssf_container,{class:"py-3"},{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_ssf_title,{center:"",class:"text-uppercase",style:{"font-weight":"500"}},{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Uk)((0,shared_esm_bundler.zw)(_ctx.title),1)]})),_:1})]})),_:1})}var page_titlevue_type_script_lang_ts=(0,runtime_core_esm_bundler.aZ)({name:"page-title",props:{title:{type:String,required:true}},setup:function setup(){}});var exportHelper=__webpack_require__(83744);const __exports__=(0,exportHelper.Z)(page_titlevue_type_script_lang_ts,[["render",render]]);var page_title=__exports__},97025:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Z:function(){return commons_under_construction}});var runtime_core_esm_bundler=__webpack_require__(66252);var under_construction=__webpack_require__(74426);var _hoisted_1=(0,runtime_core_esm_bundler._)("img",{src:under_construction,alt:"En cours de construction",class:"img-fluid"},null,-1);function render(_ctx,_cache,$props,$setup,$data,$options){var _component_ssf_container=(0,runtime_core_esm_bundler.up)("ssf-container");return(0,runtime_core_esm_bundler.wg)(),(0,runtime_core_esm_bundler.j4)(_component_ssf_container,{name:"under-construction"},{default:(0,runtime_core_esm_bundler.w5)((function(){return[_hoisted_1]})),_:1})}var under_constructionvue_type_script_lang_ts=(0,runtime_core_esm_bundler.aZ)({name:"under-construction",setup:function setup(){return{}}});var exportHelper=__webpack_require__(83744);const __exports__=(0,exportHelper.Z)(under_constructionvue_type_script_lang_ts,[["render",render]]);var commons_under_construction=__exports__},62164:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,{default:function(){return list_conversations}});var es_string_trim=__webpack_require__(73210);var runtime_core_esm_bundler=__webpack_require__(66252);var shared_esm_bundler=__webpack_require__(3577);var _withScopeId=function _withScopeId(n){return _pushScopeId("data-v-4d88e57e"),n=n(),_popScopeId(),n};var _hoisted_1=["src"];var _hoisted_2=["src"];function render(_ctx,_cache,$props,$setup,$data,$options){var _component_ssf_col=(0,runtime_core_esm_bundler.up)("ssf-col");var _component_ssf_icon=(0,runtime_core_esm_bundler.up)("ssf-icon");var _component_ssf_row=(0,runtime_core_esm_bundler.up)("ssf-row");var _component_ssf_container=(0,runtime_core_esm_bundler.up)("ssf-container");return(0,runtime_core_esm_bundler.wg)(),(0,runtime_core_esm_bundler.j4)(_component_ssf_container,{container:"",name:"list-conversations"},{default:(0,runtime_core_esm_bundler.w5)((function(){return[((0,runtime_core_esm_bundler.wg)(true),(0,runtime_core_esm_bundler.iD)(runtime_core_esm_bundler.HY,null,(0,runtime_core_esm_bundler.Ko)(_ctx.conversations,(function(_conversation){return(0,runtime_core_esm_bundler.wg)(),(0,runtime_core_esm_bundler.j4)(_component_ssf_row,{class:"cursor-pointer",onClick:function onClick($event){return _ctx.selectConversation(_conversation)}},{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_ssf_col,{class:"box-item",size:"12"},{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_ssf_container,{relative:""},{default:(0,runtime_core_esm_bundler.w5)((function(){var _conversation$partner,_conversation$partner2,_conversation$partner3,_conversation$member,_conversation$member2,_conversation$member3;return[(_conversation$partner=_conversation.partner)!==null&&_conversation$partner!==void 0&&_conversation$partner.avatar&&((_conversation$partner2=_conversation.partner)===null||_conversation$partner2===void 0?void 0:_conversation$partner2.avatar.trim())!==""?((0,runtime_core_esm_bundler.wg)(),(0,runtime_core_esm_bundler.iD)("img",{key:0,src:(_conversation$partner3=_conversation.partner)===null||_conversation$partner3===void 0?void 0:_conversation$partner3.avatar,alt:"",class:"left-absolute"},null,8,_hoisted_1)):(0,runtime_core_esm_bundler.kq)("",true),(_conversation$member=_conversation.member)!==null&&_conversation$member!==void 0&&_conversation$member.avatar&&((_conversation$member2=_conversation.member)===null||_conversation$member2===void 0?void 0:_conversation$member2.avatar.trim())!==""?((0,runtime_core_esm_bundler.wg)(),(0,runtime_core_esm_bundler.iD)("img",{key:1,src:(_conversation$member3=_conversation.member)===null||_conversation$member3===void 0?void 0:_conversation$member3.avatar,alt:"",class:"left-absolute"},null,8,_hoisted_2)):(0,runtime_core_esm_bundler.kq)("",true),(0,runtime_core_esm_bundler.Wm)(_component_ssf_row,null,{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_ssf_col,{class:"company-container full-flex flex-column",size:"5"},{default:(0,runtime_core_esm_bundler.w5)((function(){var _conversation$partner4;return[(0,runtime_core_esm_bundler.Uk)((0,shared_esm_bundler.zw)((_conversation$partner4=_conversation.partner)===null||_conversation$partner4===void 0?void 0:_conversation$partner4.companyName),1)]})),_:2},1024),(0,runtime_core_esm_bundler.Wm)(_component_ssf_col,{class:"full-flex flex-column",size:"2"},{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_ssf_icon,{class:"my-2",icon:"right-left"}),(0,runtime_core_esm_bundler.Uk)(" "+(0,shared_esm_bundler.zw)(_conversation.date.format("DD/MM/YYYY")),1)]})),_:2},1024),(0,runtime_core_esm_bundler.Wm)(_component_ssf_col,{class:"company-container full-flex flex-column",size:"5"},{default:(0,runtime_core_esm_bundler.w5)((function(){var _conversation$member4;return[(0,runtime_core_esm_bundler.Uk)((0,shared_esm_bundler.zw)((_conversation$member4=_conversation.member)===null||_conversation$member4===void 0?void 0:_conversation$member4.companyName),1)]})),_:2},1024)]})),_:2},1024)]})),_:2},1024)]})),_:2},1024)]})),_:2},1032,["onClick"])})),256))]})),_:1})}var utils=__webpack_require__(89996);var conversation_module=__webpack_require__(48028);var vue_router_esm_bundler=__webpack_require__(42119);var list_conversationsvue_type_script_lang_ts=(0,runtime_core_esm_bundler.aZ)({name:"list-conversations",props:{conversations:{type:Array,required:true}},setup:function setup(){var router=(0,vue_router_esm_bundler.tv)();var _useConversations=(0,conversation_module.Z)(),selectConversation=_useConversations.selectConversation,conversation=_useConversations.conversation;return{key:function key(conversation){return(0,utils.Jy)({id:conversation.id,name:conversation.id})},selectConversation:function selectConversation(conversation){return router.push({name:"history.messages",params:{id:conversation.id}})},conversation:conversation}}});var exportHelper=__webpack_require__(83744);const __exports__=(0,exportHelper.Z)(list_conversationsvue_type_script_lang_ts,[["render",render],["__scopeId","data-v-4d88e57e"]]);var list_conversations=__exports__},19857:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,{default:function(){return messages}});var runtime_core_esm_bundler=__webpack_require__(66252);function render(_ctx,_cache,$props,$setup,$data,$options){var _component_under_construction=(0,runtime_core_esm_bundler.up)("under-construction");var _component_ssf_container=(0,runtime_core_esm_bundler.up)("ssf-container");return(0,runtime_core_esm_bundler.wg)(),(0,runtime_core_esm_bundler.j4)(_component_ssf_container,{name:"history-messages"},{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_under_construction)]})),_:1})}var vue_meta_esm_browser_min=__webpack_require__(43612);var page_title=__webpack_require__(27782);var conversation_module=__webpack_require__(48028);var list_conversations=__webpack_require__(62164);var under_construction=__webpack_require__(97025);var vue_router_esm_bundler=__webpack_require__(42119);var messagesvue_type_script_lang_ts=(0,runtime_core_esm_bundler.aZ)({name:"history-messages-index",components:{UnderConstruction:under_construction.Z,ListConversations:list_conversations["default"],PageTitle:page_title.Z},setup:function setup(){(0,vue_meta_esm_browser_min.jq)({title:"Messages | Historique des conversations"});var route=(0,vue_router_esm_bundler.yj)();var router=(0,vue_router_esm_bundler.tv)();var _useConversations=(0,conversation_module.Z)(),conversations=_useConversations.conversations,hasConversations=_useConversations.hasConversations,fetchConversationById=_useConversations.fetchConversationById;(0,runtime_core_esm_bundler.bv)((function(){return!route.params.id?router.push({name:"history.index"}):fetchConversationById(route.params.id)}));return{conversations:conversations,hasConversations:hasConversations}}});var exportHelper=__webpack_require__(83744);const __exports__=(0,exportHelper.Z)(messagesvue_type_script_lang_ts,[["render",render]]);var messages=__exports__}}]);