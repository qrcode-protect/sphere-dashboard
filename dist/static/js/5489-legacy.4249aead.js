"use strict";(self["webpackChunksphere_dashboard"]=self["webpackChunksphere_dashboard"]||[]).push([[5489],{25489:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,{default:function(){return modal_departments}});var es_function_name=__webpack_require__(68309);var runtime_core_esm_bundler=__webpack_require__(66252);var shared_esm_bundler=__webpack_require__(3577);var _hoisted_1=(0,runtime_core_esm_bundler._)("hr",{class:"w-75 mt-4"},null,-1);var _hoisted_2=(0,runtime_core_esm_bundler.Uk)("-");function render(_ctx,_cache,$props,$setup,$data,$options){var _component_ssf_title=(0,runtime_core_esm_bundler.up)("ssf-title");var _component_ssf_container=(0,runtime_core_esm_bundler.up)("ssf-container");var _component_ssf_text=(0,runtime_core_esm_bundler.up)("ssf-text");var _component_ssf_modal=(0,runtime_core_esm_bundler.up)("ssf-modal");return(0,runtime_core_esm_bundler.wg)(),(0,runtime_core_esm_bundler.j4)(_component_ssf_modal,{modelValue:_ctx.visible,"onUpdate:modelValue":_cache[0]||(_cache[0]=function($event){return _ctx.visible=$event}),name:_ctx.modalName,attach:"#app","body-classes":"pt-2 border-0",classes:"modal-container full-flex modal-departments","content-class":"modal-content z-depth-1 full-flex rounded","fit-parent":"","header-classes":"pt-4 pb-2 d-block border-0",onBeforeClose:_cache[1]||(_cache[1]=function($event){return _ctx.$emit("close")}),"lock-scroll":"",scrollable:""},{header:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_ssf_container,null,{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_ssf_container,{class:"modal-header-icon full-flex mx-auto border-color-2","not-full":""},{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_ssf_title,{h5:""},{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Uk)((0,shared_esm_bundler.zw)(_ctx.network.name),1)]})),_:1})]})),_:1})]})),_:1}),_hoisted_1]})),body:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler._)("ul",null,[((0,runtime_core_esm_bundler.wg)(true),(0,runtime_core_esm_bundler.iD)(runtime_core_esm_bundler.HY,null,(0,runtime_core_esm_bundler.Ko)(_ctx.network.departments,(function(department){return(0,runtime_core_esm_bundler.wg)(),(0,runtime_core_esm_bundler.iD)("li",null,[(0,runtime_core_esm_bundler.Wm)(_component_ssf_text,{class:"department-code"},{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Uk)((0,shared_esm_bundler.zw)(department.code),1)]})),_:2},1024),(0,runtime_core_esm_bundler.Wm)(_component_ssf_text,{class:"mx-2"},{default:(0,runtime_core_esm_bundler.w5)((function(){return[_hoisted_2]})),_:1}),(0,runtime_core_esm_bundler.Wm)(_component_ssf_text,null,{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Uk)((0,shared_esm_bundler.zw)(department.name),1)]})),_:2},1024)])})),256))])]})),_:1},8,["modelValue","name"])}var reactivity_esm_bundler=__webpack_require__(2262);var network=__webpack_require__(47104);var modal_departmentsvue_type_script_lang_ts=(0,runtime_core_esm_bundler.aZ)({name:"modal-departments",props:{modalName:{type:String,required:false,default:"modal-departments"},open:{type:Boolean,required:false,default:false},network:{type:network.Z,required:true}},emits:["close"],setup:function setup(props,_ref){var emit=_ref.emit;var visible=(0,reactivity_esm_bundler.iH)(false);(0,runtime_core_esm_bundler.YP)((function(){return props.open}),(function(){return visible.value=props.open}),{immediate:true});return{visible:visible}}});var exportHelper=__webpack_require__(83744);const __exports__=(0,exportHelper.Z)(modal_departmentsvue_type_script_lang_ts,[["render",render]]);var modal_departments=__exports__}}]);