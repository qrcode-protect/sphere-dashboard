"use strict";(self["webpackChunksphere_dashboard"]=self["webpackChunksphere_dashboard"]||[]).push([[8001],{8001:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,{default:function(){return subdomain_checkbox}});var runtime_core_esm_bundler=__webpack_require__(6252);var shared_esm_bundler=__webpack_require__(3577);function render(_ctx,_cache,$props,$setup,$data,$options){var _component_ssf_container=(0,runtime_core_esm_bundler.up)("ssf-container");return(0,runtime_core_esm_bundler.wg)(),(0,runtime_core_esm_bundler.j4)(_component_ssf_container,{class:(0,shared_esm_bundler.C_)([{"bg-color-2 text-white":_ctx.isSelected},"box-item px-2 cursor-pointer"]),name:"subdomain-checkbox","not-full":"",onClick:_ctx.toggleSelected},{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Uk)((0,shared_esm_bundler.zw)(_ctx.activity.label),1)]})),_:1},8,["class","onClick"])}var objectSpread2=__webpack_require__(5082);var reactivity_esm_bundler=__webpack_require__(2262);var activity=__webpack_require__(6153);var subdomain_checkboxvue_type_script_lang_ts=(0,runtime_core_esm_bundler.aZ)({name:"subdomain-checkbox",props:{activity:{type:activity.Z,required:true},selected:{type:Boolean,required:false,default:false}},emits:["select","unselect"],setup:function setup(props,_ref){var emit=_ref.emit;var _ref2=function(){var state=(0,reactivity_esm_bundler.qj)({selected:false});var setSelected=function setSelected(value){state.selected=value;emit(state.selected?"select":"unselect",props.activity.id)};return(0,objectSpread2.Z)((0,objectSpread2.Z)({},(0,reactivity_esm_bundler.BK)(state)),{},{toggleSelected:function toggleSelected(){return setSelected(!state.selected)},setSelected:setSelected})}(),selected=_ref2.selected,toggleSelected=_ref2.toggleSelected,setSelected=_ref2.setSelected;var isSelected=(0,runtime_core_esm_bundler.Fl)((function(){return props.selected===true&&selected.value}));(0,runtime_core_esm_bundler.YP)((function(){return props.selected}),(function(){return setSelected(props.selected===true)}),{immediate:true});return{isSelected:isSelected,toggleSelected:toggleSelected}}});var exportHelper=__webpack_require__(3744);const __exports__=(0,exportHelper.Z)(subdomain_checkboxvue_type_script_lang_ts,[["render",render]]);var subdomain_checkbox=__exports__}}]);