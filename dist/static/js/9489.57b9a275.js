"use strict";(self["webpackChunksphere_dashboard"]=self["webpackChunksphere_dashboard"]||[]).push([[9489,697],{697:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,{create:function(){return create}});var _app_modules_user_user__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(7961);var create=function create(data){var user=(new _app_modules_user_user__WEBPACK_IMPORTED_MODULE_0__.Z).setAttributes(data);return user.store(data)}},8836:function(__unused_webpack_module,__webpack_exports__){var config={customClass:{title:"open-sans",content:"open-sans",popup:"p-0 rounded",confirmButton:"btn-block rounded py-3"},confirmButtonText:"J'ai compris"};__webpack_exports__["Z"]=config},5371:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){var sweetalert2__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(6455);var sweetalert2__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_0__);var _config__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(8836);var config={icon:"success",title:"Réussi",text:"L'action s'est terminée avec succès",customClass:{title:_config__WEBPACK_IMPORTED_MODULE_1__.Z.customClass.title,content:_config__WEBPACK_IMPORTED_MODULE_1__.Z.customClass.content,popup:_config__WEBPACK_IMPORTED_MODULE_1__.Z.customClass.popup,confirmButton:"".concat(_config__WEBPACK_IMPORTED_MODULE_1__.Z.customClass.confirmButton," success-color-dark")},confirmButtonText:"J'ai compris"};var MainSuccess=sweetalert2__WEBPACK_IMPORTED_MODULE_0___default().mixin(config);__webpack_exports__["Z"]=MainSuccess},4213:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,{default:function(){return modal_create_user}});var runtime_core_esm_bundler=__webpack_require__(6252);var runtime_dom_esm_bundler=__webpack_require__(9963);var _hoisted_1=(0,runtime_core_esm_bundler._)("hr",{class:"w-75 mt-4"},null,-1);var _hoisted_2=["innerHTML"];var _hoisted_3={class:"btn text-danger",type:"button"};var _hoisted_4={class:"btn text-success",type:"button"};function render(_ctx,_cache,$props,$setup,$data,$options){var _component_ssf_icon=(0,runtime_core_esm_bundler.up)("ssf-icon");var _component_ssf_container=(0,runtime_core_esm_bundler.up)("ssf-container");var _component_ssf_col=(0,runtime_core_esm_bundler.up)("ssf-col");var _component_ssf_row=(0,runtime_core_esm_bundler.up)("ssf-row");var _component_qrcp_input=(0,runtime_core_esm_bundler.up)("qrcp-input");var _component_ssf_modal=(0,runtime_core_esm_bundler.up)("ssf-modal");return(0,runtime_core_esm_bundler.wg)(),(0,runtime_core_esm_bundler.j4)(_component_ssf_modal,{modelValue:_ctx.open,"onUpdate:modelValue":_cache[5]||(_cache[5]=function($event){return _ctx.open=$event}),"click-to-close":false,"esc-to-close":false,name:_ctx.modalName,attach:"#app","body-classes":"pt-4 border-0",classes:"modal-container full-flex","content-class":"modal-content z-depth-1 full-flex modal-data-information rounded","fit-parent":"","footer-classes":"p-2 border-0 align-flex","header-classes":"pt-4 d-block border-0","lock-scroll":""},{header:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_ssf_container,null,{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_ssf_container,{class:"modal-header-icon full-flex mx-auto border-color-2 btn--corners","not-full":""},{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler._)("span",null,[(0,runtime_core_esm_bundler.Wm)(_component_ssf_icon,{icon:"user-plus",size:"1x5",thin:""})])]})),_:1})]})),_:1}),_hoisted_1]})),body:(0,runtime_core_esm_bundler.w5)((function(){return[_ctx.error?((0,runtime_core_esm_bundler.wg)(),(0,runtime_core_esm_bundler.j4)(_component_ssf_row,{key:0,class:"mb-3"},{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_ssf_col,{class:"form-fallback-container align-flex text-danger",size:"12"},{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_ssf_icon,{class:"mr-2",icon:"times-circle",light:"",size:"1x5"}),(0,runtime_core_esm_bundler._)("span",{innerHTML:_ctx.error},null,8,_hoisted_2)]})),_:1})]})),_:1})):(0,runtime_core_esm_bundler.kq)("",true),(0,runtime_core_esm_bundler._)("form",{style:{"padding-bottom":"75px"},onSubmit:_cache[4]||(_cache[4]=(0,runtime_dom_esm_bundler.iM)((function(){return _ctx.save&&_ctx.save.apply(_ctx,arguments)}),["prevent"]))},[(0,runtime_core_esm_bundler.Wm)(_component_qrcp_input,{errors:_ctx.errors,value:_ctx.user.lastname,icon:"user",label:"Nom de famille",name:"lastname",required:"",row:"","onUpdate:value":_cache[0]||(_cache[0]=function(event){return _ctx.user.lastname=event})},null,8,["errors","value"]),(0,runtime_core_esm_bundler.Wm)(_component_qrcp_input,{errors:_ctx.errors,value:_ctx.user.firstname,icon:"user-alt",label:"Prénom",name:"firstname",required:"",row:"","onUpdate:value":_cache[1]||(_cache[1]=function(event){return _ctx.user.firstname=event})},null,8,["errors","value"]),(0,runtime_core_esm_bundler.Wm)(_component_qrcp_input,{errors:_ctx.errors,value:_ctx.user.email,icon:"at",label:"Adresse e-mail",name:"email",required:"",row:"",onInput:_ctx.onEmailInput,"onUpdate:value":_cache[2]||(_cache[2]=function(event){return _ctx.user.email=event})},null,8,["errors","value","onInput"]),(0,runtime_core_esm_bundler.Wm)(_component_qrcp_input,{errors:_ctx.errors,"option-items":_ctx.roles,value:_ctx.user.roleType,name:"roleType","option-field":"name","option-label":"label",required:"",row:"",select:"","wheel-propagation":"","onUpdate:value":_cache[3]||(_cache[3]=function(event){return _ctx.user.roleType=event})},null,8,["errors","option-items","value"])],32)]})),footer:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_ssf_row,{class:"cursor-pointer"},{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_ssf_col,{class:"text-center",size:"6",onClick:_ctx.cancel},{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler._)("button",_hoisted_3,[(0,runtime_core_esm_bundler.Wm)(_component_ssf_icon,{icon:"ban",light:"",size:"2x"})])]})),_:1},8,["onClick"]),(0,runtime_core_esm_bundler.Wm)(_component_ssf_col,{class:"text-center",size:"6",onClick:_ctx.save},{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler._)("button",_hoisted_4,[(0,runtime_core_esm_bundler.Wm)(_component_ssf_icon,{icon:"floppy-disk-circle-arrow-right",light:"",size:"2x"})])]})),_:1},8,["onClick"])]})),_:1})]})),_:1},8,["modelValue","name"])}var es_array_includes=__webpack_require__(6699);var reactivity_esm_bundler=__webpack_require__(2262);var lodash=__webpack_require__(6486);var commons=__webpack_require__(8416);var auth=__webpack_require__(4874);var utils=__webpack_require__(697);var validation=__webpack_require__(1909);var qrcp_input=__webpack_require__(4916);var main_success=__webpack_require__(5371);var modal_create_uservue_type_script_lang_js=(0,runtime_core_esm_bundler.aZ)({name:"modal-create-user",components:{QrcpInput:qrcp_input.Z},props:{modalName:{type:String,required:false,default:"modal-create-user"},open:{type:Boolean,required:false,default:false}},emits:["close","save","created"],setup:function setup(props,_ref){var emit=_ref.emit;var ctx=(0,runtime_core_esm_bundler.FN)().ctx;var user=(0,reactivity_esm_bundler.iH)({lastname:null,firstname:null,email:null,roleType:null});var errors=(0,reactivity_esm_bundler.iH)([]);var error=(0,reactivity_esm_bundler.iH)(null);var success=(0,reactivity_esm_bundler.iH)(null);var loading=(0,reactivity_esm_bundler.iH)(false);var close=function close(){return emit("close")};var cancel=function cancel(){return close()};var validator=function validator(){if(validation.Gu.email(user.value.email)){var result=(0,validation.sC)(user.value);error.value=result.error;errors.value=result.errors;return result.valid}ctx.onEmailInput();error.value="Merci de vérifier le formulaire.";return false};var save=function save(){if(loading.value)return false;if(validator()){if((0,commons.VI)(user.value.firstname)&&(0,commons.VI)(user.value.lastname)&&(0,commons.VI)(user.value.email)){loading.value=true;error.value=null;(0,utils.create)({lastname:user.value.lastname,firstname:user.value.firstname,email:user.value.email,roleType:user.value.roleType}).then((function(){main_success.Z.fire({allowOutsideClick:false}).then((function(){close();emit("created")}))})).catch((function(e){var _e$message;return error.value=(_e$message=e===null||e===void 0?void 0:e.message)!==null&&_e$message!==void 0?_e$message:"Merci de réessayer plus tard"})).finally((function(){return loading.value=false}))}}};var roles=(0,runtime_core_esm_bundler.Fl)((function(){return(0,lodash.filter)((0,auth.uJ)(),(function(role){return role.label=role.label.capitalize()}))}));return{user:user,errors:errors,error:error,success:success,loading:loading,roles:roles,save:save,cancel:cancel}},methods:{onEmailInput:function onEmailInput(){this.onFieldInput("email")},onFieldInput:function onFieldInput(field){if(!validation.Gu[field](this.user[field])){if(!this.errors.includes("".concat(field,".format")))this.errors.push("".concat(field,".format"))}else this.errors=this.errors.filter((function(item){return item!=="".concat(field,".format")}))}}});var exportHelper=__webpack_require__(3744);const __exports__=(0,exportHelper.Z)(modal_create_uservue_type_script_lang_js,[["render",render]]);var modal_create_user=__exports__}}]);