(self["webpackChunksphere_dashboard"]=self["webpackChunksphere_dashboard"]||[]).push([[5802,4784],{81909:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,{Gu:function(){return validate},sC:function(){return validator},sY:function(){return messages}});var lodash__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(96486);var lodash__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);var fields={email:"l'adresse e-mail",firstname:"le prénom",lastname:"le nom",company:"la société / organisation",phone:"le numéro de téléphone",password:"le mot de passe",companyName:"le nom commercial",siret:"le siret",activityId:"le domaine d'activité",certificate:"le kbis",label:"le libellé",title:"le titre",description:"la description",memberId:"l'adhérent",file:"le fichier",address:"l'adresse",zipcode:"le code postal",city:"la ville"};var requiredMessage=function requiredMessage(field){return"".concat(fields[field].capitalize()," est obligatoire")};var formatMessage=function formatMessage(field){return"".concat(fields[field].capitalize()," a un mauvais format")};var messages={"email.required":requiredMessage("email"),"email.format":formatMessage("email"),"firstname.required":requiredMessage("firstname"),"lastname.required":requiredMessage("lastname"),"company.required":requiredMessage("company"),"phone.required":requiredMessage("phone"),"phone.format":formatMessage("phone"),"siret.format":formatMessage("siret"),"password.required":requiredMessage("password"),"companyName.required":requiredMessage("companyName"),"siret.required":requiredMessage("siret"),"activityId.required":requiredMessage("activityId"),"certificate.required":requiredMessage("certificate"),"label.required":requiredMessage("label"),"title.required":requiredMessage("title"),"description.required":requiredMessage("description"),"memberId.required":requiredMessage("memberId"),"address.required":requiredMessage("address"),"zipcode.required":requiredMessage("zipcode"),"file.required":requiredMessage("file"),"city.required":requiredMessage("city"),"confirmPassword.different":"Le mot de passe et la confirmation doivent être identiques"};var inputError=function inputError(key){var clear=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;return clear?$("[name=".concat(key,"]")).removeClass("invalid"):$("[name=".concat(key,"]")).addClass("invalid")};var validator=function validator(data){if(!data)return{valid:false};var valid=true,error=null,errors=[];(0,lodash__WEBPACK_IMPORTED_MODULE_0__.keys)(data).forEach((function(key){if(data[key]===null||typeof data[key]==="undefined"||typeof data[key]==="string"&&data[key].trim()===""){inputError(key);valid=false;error="Merci de renseigner tous les champs marqués d'un *";errors.push("".concat(key,".required"))}else inputError(key,true)}));return{valid:valid,error:error,errors:errors}};var validate={email:function email(_email){if(_email===null||_email.trim()===""){inputError("email");return false}return/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(_email)},phone:function phone(_phone){return/^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/.test(_phone)},siret:function siret(_siret){_siret=_siret.trim();var siretArray=_siret.toString().split("");if(_siret===""||_siret.length!==14){return false}var sum=0,tmp;(0,lodash__WEBPACK_IMPORTED_MODULE_0__.each)(siretArray,(function(item,k){if(k%2==0){tmp=siretArray[k].toInteger()*2;tmp=tmp>9?tmp-9:tmp}else{tmp=siretArray[k]}sum+=tmp.toString().toInteger()}));return sum%10===0},password:function password(_password){if(/(?=.*[A-Z])/.test(_password)&&/(?=.*[a-z])/.test(_password)&&/(?=.*\d)/.test(_password)&&/(?=.*?[\/+~"'{}()|#`_\[\]=%§.,:;?!@$^&*-])/.test(_password)&&/.{8,}/.test(_password))return true;inputError("password");return false},confirmPassword:function confirmPassword(password,confirmation){if(password&&password.trim()!==""&&validate.password(password)&&password===confirmation)return true;inputError("confirmPassword");return false}}},54784:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,{default:function(){return auth}});var runtime_core_esm_bundler=__webpack_require__(66252);var shared_esm_bundler=__webpack_require__(3577);var runtime_dom_esm_bundler=__webpack_require__(49963);var _hoisted_1={class:"small grey-text font-italic"};var _hoisted_2=(0,runtime_core_esm_bundler._)("hr",{class:"w-75 my-4 bg-white"},null,-1);var _hoisted_3=["src"];function render(_ctx,_cache,$props,$setup,$data,$options){var _component_logo=(0,runtime_core_esm_bundler.up)("logo");var _component_ssf_container=(0,runtime_core_esm_bundler.up)("ssf-container");var _component_ssf_col=(0,runtime_core_esm_bundler.up)("ssf-col");var _component_ssf_row=(0,runtime_core_esm_bundler.up)("ssf-row");var _component_ssf_icon=(0,runtime_core_esm_bundler.up)("ssf-icon");return(0,runtime_core_esm_bundler.wg)(),(0,runtime_core_esm_bundler.j4)(_component_ssf_container,{class:"auth-container",name:"auth","not-full":""},{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_ssf_row,{class:"h-100"},{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_ssf_col,{sm:_ctx.formContainerCol.sm,xs:_ctx.formContainerCol.xs,md:_ctx.formContainerCol.md,lg:_ctx.formContainerCol.lg,xl:_ctx.formContainerCol.xl,class:"mx-auto p-0 p-md-2",style:{transition:"all .5s"}},{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_ssf_container,{class:"bg-color-1 rounded h-100 auth-form-container"},{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_ssf_container,{class:"mx-auto form-container full-flex h-100",name:"auth-form","not-full":""},{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_ssf_container,null,{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_ssf_row,null,{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_ssf_col,{class:"text-center my-4",size:"12"},{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_ssf_container,{class:"p-3 mb-2 rounded","not-full":""},{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_logo,{class:"d-block mx-auto auth-logo"})]})),_:1}),(0,runtime_core_esm_bundler._)("label",_hoisted_1,(0,shared_esm_bundler.zw)(_ctx.application.label),1),_hoisted_2]})),_:1})]})),_:1}),(0,runtime_core_esm_bundler.Wm)(runtime_dom_esm_bundler.uT,{"enter-active-class":"animated zoomIn","leave-active-class":"animated fadeOut"},{default:(0,runtime_core_esm_bundler.w5)((function(){return[_ctx.hasSlot("error")||_ctx.hasSlot("success")?((0,runtime_core_esm_bundler.wg)(),(0,runtime_core_esm_bundler.j4)(_component_ssf_row,{key:0,class:"col-12 mb-3"},{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_ssf_col,{class:(0,shared_esm_bundler.C_)([{danger:_ctx.hasSlot("error"),success:_ctx.hasSlot("success")},"form-fallback-container align-flex"]),size:"12"},{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_ssf_icon,{icon:"".concat(_ctx.hasSlot("error")?"times-circle":"check-circle"),class:"mr-2",size:"1x5",light:""},null,8,["icon"]),(0,runtime_core_esm_bundler.WI)(_ctx.$slots,"error"),(0,runtime_core_esm_bundler.WI)(_ctx.$slots,"success")]})),_:3},8,["class"])]})),_:3})):(0,runtime_core_esm_bundler.kq)("",true)]})),_:3}),(0,runtime_core_esm_bundler.Wm)(_component_ssf_row,null,{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.WI)(_ctx.$slots,"form")]})),_:3})]})),_:3})]})),_:3})]})),_:3})]})),_:3},8,["sm","xs","md","lg","xl"]),_ctx.background?((0,runtime_core_esm_bundler.wg)(),(0,runtime_core_esm_bundler.j4)(_component_ssf_container,{key:0,class:"full-absolute position-fixed bg-overlay bg-black behind",style:{opacity:".2"}})):(0,runtime_core_esm_bundler.kq)("",true),_ctx.background?((0,runtime_core_esm_bundler.wg)(),(0,runtime_core_esm_bundler.iD)("img",{key:1,src:_ctx.background,alt:"Background image",class:"full-absolute position-fixed auth-img-bg img-fluid behind",style:{"z-index":"-2 !important"}},null,8,_hoisted_3)):(0,runtime_core_esm_bundler.kq)("",true)]})),_:3})]})),_:3})}var reactivity_esm_bundler=__webpack_require__(2262);var vuex_esm_bundler=__webpack_require__(33907);var utils=__webpack_require__(89996);var logo=__webpack_require__(52013);var authvue_type_script_lang_ts=(0,runtime_core_esm_bundler.aZ)({name:"auth",components:{Logo:logo.Z},setup:function setup(){var store=(0,vuex_esm_bundler.oR)();var application=(0,reactivity_esm_bundler.iH)({label:"Dashboard"});var background=(0,reactivity_esm_bundler.iH)(null);var formContainerCol=(0,reactivity_esm_bundler.iH)({xs:12,sm:12,md:12,lg:12,xl:12});(0,runtime_core_esm_bundler.bv)((function(){application.value={label:"Dashboard"};var image="auth.jpg";background.value=__webpack_require__(66915)("./".concat(image));formContainerCol.value={xs:12,sm:10,md:8,lg:7,xl:6}}));return{application:application,background:background,formContainerCol:formContainerCol,hasSlot:utils._Y}}});var exportHelper=__webpack_require__(83744);const __exports__=(0,exportHelper.Z)(authvue_type_script_lang_ts,[["render",render]]);var auth=__exports__},5802:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,{default:function(){return login}});var runtime_core_esm_bundler=__webpack_require__(66252);var runtime_dom_esm_bundler=__webpack_require__(49963);var _hoisted_1=["innerHTML"];var _hoisted_2=(0,runtime_core_esm_bundler._)("button",{class:"btn bg-color-2 btn-block mb-0",type:"submit"},"Connexion",-1);function render(_ctx,_cache,$props,$setup,$data,$options){var _component_ssf_form_group=(0,runtime_core_esm_bundler.up)("ssf-form-group");var _component_ssf_col=(0,runtime_core_esm_bundler.up)("ssf-col");var _component_ssf_row=(0,runtime_core_esm_bundler.up)("ssf-row");var _component_auth=(0,runtime_core_esm_bundler.up)("auth");return(0,runtime_core_esm_bundler.wg)(),(0,runtime_core_esm_bundler.j4)(_component_auth,{id:"login"},(0,runtime_core_esm_bundler.Nv)({form:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler._)("form",{id:"formLogin",class:"w-100",novalidate:"",onSubmit:_cache[3]||(_cache[3]=(0,runtime_dom_esm_bundler.iM)((function($event){return _ctx.login()}),["prevent"]))},[(0,runtime_core_esm_bundler.Wm)(_component_ssf_form_group,{errors:_ctx.errors,icon:{icon:"user",weight:"light"},value:_ctx.user.email,col:"col-12",label:"Adresse e-mail ou nom d'utilisateur",name:"email",required:"",row:"","onUpdate:value":_cache[0]||(_cache[0]=function(event){return _ctx.user.email=event})},null,8,["errors","value"]),(0,runtime_core_esm_bundler.Wm)(_component_ssf_form_group,{errors:_ctx.errors,icon:{icon:"lock",weight:"light"},value:_ctx.user.password,col:"col-12",label:"Mot de passe",name:"password",required:"",row:"",type:"password","onUpdate:value":_cache[1]||(_cache[1]=function(event){return _ctx.user.password=event})},null,8,["errors","value"]),(0,runtime_core_esm_bundler.Wm)(_component_ssf_form_group,{value:_ctx.user.remember,col:"col-12","form-group-class":"mid-flex",label:"Se souvenir de moi",name:"remember",row:"",type:"checkbox","onUpdate:value":_cache[2]||(_cache[2]=function(event){return _ctx.user.remember=event})},null,8,["value"]),(0,runtime_core_esm_bundler.Wm)(_component_ssf_row,null,{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_ssf_col,{class:"ssf-form-group text-right mt-1",size:"12"},{default:(0,runtime_core_esm_bundler.w5)((function(){return[_hoisted_2]})),_:1})]})),_:1})],32)]})),_:2},[_ctx.error?{name:"error",fn:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler._)("span",{innerHTML:_ctx.error},null,8,_hoisted_1)]}))}:undefined]),1024)}var reactivity_esm_bundler=__webpack_require__(2262);var vue_meta_esm_browser_min=__webpack_require__(43612);var auth=__webpack_require__(54784);var utils=__webpack_require__(80715);var iconvue_type_template_id_767c64f3_hoisted_1=["src","alt"];function iconvue_type_template_id_767c64f3_render(_ctx,_cache,$props,$setup,$data,$options){return(0,runtime_core_esm_bundler.wg)(),(0,runtime_core_esm_bundler.iD)("img",{src:$options.src,alt:$options.alt},null,8,iconvue_type_template_id_767c64f3_hoisted_1)}var iconvue_type_script_lang_js={name:"icon",props:{icon:{type:String,required:true}},computed:{src:function src(){return __webpack_require__(74658)("./".concat(this.icon,".png"))},alt:function alt(){return"Icon ".concat(this.icon)}}};var exportHelper=__webpack_require__(83744);const __exports__=(0,exportHelper.Z)(iconvue_type_script_lang_js,[["render",iconvue_type_template_id_767c64f3_render]]);var icon=__exports__;var vue_utils=__webpack_require__(89996);var validation=__webpack_require__(81909);var vuex_esm_bundler=__webpack_require__(33907);var lib=__webpack_require__(75958);var helpers=__webpack_require__(56818);var esm2017=__webpack_require__(52889);var firebase=__webpack_require__(26793);var loginvue_type_script_lang_ts=(0,runtime_core_esm_bundler.aZ)({name:"login",components:{Icon:icon,Auth:auth["default"]},setup:function setup(){(0,vue_meta_esm_browser_min.jq)({title:"Connexion"});var error=(0,reactivity_esm_bundler.iH)(null);var user=(0,reactivity_esm_bundler.qj)({email:null,password:null,remember:false});var query=(0,reactivity_esm_bundler.iH)({});var errors=(0,reactivity_esm_bundler.iH)([]);var loading=(0,reactivity_esm_bundler.iH)(false);(0,runtime_core_esm_bundler.bv)((function(){query.value=(0,vue_utils.B5)()}));var validator=function validator(){var result=(0,validation.sC)(user);error.value=result.error;return result.valid};return{error:error,user:user,query:query,errors:errors,loading:loading,validator:validator,navigate:utils.navigate,tokenName:(0,vuex_esm_bundler.oR)().getters.TOKEN_NAME}},methods:{login:function login(){var _this=this;if(this.loading)return false;this.loading=true;this.error=null;if(this.validator())return(0,utils.login)(this.user).then((function(response){var _response$email;(0,helpers.V_)(true);(0,esm2017.e5)(firebase.lX,(_response$email=response.email)!==null&&_response$email!==void 0?_response$email:_this.user.email,_this.user.password).then((function(){lib["default"].set(_this.tokenName,response.token.bearer);_this.$router.push({name:"members.index"});location.reload()})).catch((function(){return null}))})).catch((function(error){_this.loading=false;return _this.error=error.message})).finally((function(){return _this.loading=false}));else this.loading=false}}});const login_exports_=(0,exportHelper.Z)(loginvue_type_script_lang_ts,[["render",render]]);var login=login_exports_},66915:function(module,__unused_webpack_exports,__webpack_require__){var map={"./auth.jpg":3861,"./under-construction.jpg":74426};function webpackContext(req){var id=webpackContextResolve(req);return __webpack_require__(id)}function webpackContextResolve(req){if(!__webpack_require__.o(map,req)){var e=new Error("Cannot find module '"+req+"'");e.code="MODULE_NOT_FOUND";throw e}return map[req]}webpackContext.keys=function webpackContextKeys(){return Object.keys(map)};webpackContext.resolve=webpackContextResolve;module.exports=webpackContext;webpackContext.id=66915},74658:function(module,__unused_webpack_exports,__webpack_require__){var map={"./lock-forgot-color.png":58233};function webpackContext(req){var id=webpackContextResolve(req);return __webpack_require__(id)}function webpackContextResolve(req){if(!__webpack_require__.o(map,req)){var e=new Error("Cannot find module '"+req+"'");e.code="MODULE_NOT_FOUND";throw e}return map[req]}webpackContext.keys=function webpackContextKeys(){return Object.keys(map)};webpackContext.resolve=webpackContextResolve;module.exports=webpackContext;webpackContext.id=74658}}]);