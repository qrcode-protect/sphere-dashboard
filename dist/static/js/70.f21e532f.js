"use strict";(self["webpackChunksphere_dashboard"]=self["webpackChunksphere_dashboard"]||[]).push([[70],{40070:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,{default:function(){return table_activity_header}});var runtime_core_esm_bundler=__webpack_require__(66252);var shared_esm_bundler=__webpack_require__(3577);function render(_ctx,_cache,$props,$setup,$data,$options){var _component_ssf_icon=(0,runtime_core_esm_bundler.up)("ssf-icon");var _component_ssf_text=(0,runtime_core_esm_bundler.up)("ssf-text");var _component_ssf_col=(0,runtime_core_esm_bundler.up)("ssf-col");var _component_ssf_row=(0,runtime_core_esm_bundler.up)("ssf-row");var _component_ssf_container=(0,runtime_core_esm_bundler.up)("ssf-container");return(0,runtime_core_esm_bundler.wg)(),(0,runtime_core_esm_bundler.j4)(_component_ssf_container,{name:"table-activity-header"},{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_ssf_row,null,{default:(0,runtime_core_esm_bundler.w5)((function(){return[((0,runtime_core_esm_bundler.wg)(true),(0,runtime_core_esm_bundler.iD)(runtime_core_esm_bundler.HY,null,(0,runtime_core_esm_bundler.Ko)(_ctx.keys,(function(key){return(0,runtime_core_esm_bundler.wg)(),(0,runtime_core_esm_bundler.j4)(_component_ssf_col,{class:(0,shared_esm_bundler.C_)([{"cursor-pointer":key.action,"text-right":key.right},"font-weight-bold color-2 py-4"]),size:key.colSize,onClick:function onClick($event){return _ctx.handleAction(key.action)}},{default:(0,runtime_core_esm_bundler.w5)((function(){return[key.icon?((0,runtime_core_esm_bundler.wg)(),(0,runtime_core_esm_bundler.j4)(_component_ssf_icon,{key:0,icon:key.icon},null,8,["icon"])):(0,runtime_core_esm_bundler.kq)("",true),(0,runtime_core_esm_bundler.Wm)(_component_ssf_text,null,{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Uk)((0,shared_esm_bundler.zw)(key.title),1)]})),_:2},1024)]})),_:2},1032,["class","size","onClick"])})),256))]})),_:1})]})),_:1})}var reactivity_esm_bundler=__webpack_require__(2262);var table_activity_headervue_type_script_lang_ts=(0,runtime_core_esm_bundler.aZ)({name:"table-activity-header",emits:["create-activity"],props:{indexCol:{type:[String,Number],required:true},nameCol:{type:[String,Number],required:true},actionCol:{type:[String,Number],required:true}},setup:function setup(props,_ref){var emit=_ref.emit;var createNewActivity=function createNewActivity(){return emit("create-activity")};var handleAction=function handleAction(callable){return callable?callable():null};var keys=(0,reactivity_esm_bundler.iH)([{icon:"hashtag",colSize:props.indexCol},{title:"Activité",colSize:props.nameCol},{icon:"plus-circle",action:createNewActivity,right:true,colSize:props.actionCol}]);return{keys:keys,handleAction:handleAction}}});var exportHelper=__webpack_require__(83744);const __exports__=(0,exportHelper.Z)(table_activity_headervue_type_script_lang_ts,[["render",render]]);var table_activity_header=__exports__}}]);