"use strict";(self["webpackChunksphere_dashboard"]=self["webpackChunksphere_dashboard"]||[]).push([[34],{1909:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Gu:function(){return validate},sC:function(){return validator},sY:function(){return messages}});var lodash__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(6486);var lodash__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);var fields={email:"l'adresse e-mail",firstname:"le prénom",lastname:"le nom",company:"la société / organisation",phone:"le numéro de téléphone",password:"le mot de passe",companyName:"le nom commercial",siret:"le siret",activityId:"le domaine d'activité",certificate:"le kbis"};var requiredMessage=function requiredMessage(field){return"".concat(fields[field].capitalize()," est obligatoire")};var formatMessage=function formatMessage(field){return"".concat(fields[field].capitalize()," a un mauvais format")};var messages={"email.required":requiredMessage("email"),"email.format":formatMessage("email"),"firstname.required":requiredMessage("firstname"),"lastname.required":requiredMessage("lastname"),"company.required":requiredMessage("company"),"phone.required":requiredMessage("phone"),"phone.format":formatMessage("phone"),"password.required":requiredMessage("password"),"companyName.required":requiredMessage("companyName"),"siret.required":requiredMessage("siret"),"activityId.required":requiredMessage("activityId"),"certificate.required":requiredMessage("certificate"),"confirmPassword.different":"Le mot de passe et la confirmation doivent être identiques"};var inputError=function inputError(key){var clear=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;return clear?$("input[name=".concat(key,"]")).removeClass("invalid"):$("input[name=".concat(key,"]")).addClass("invalid")};var validator=function validator(data){if(!data)return{valid:false};var valid=true,error=null,errors=[];(0,lodash__WEBPACK_IMPORTED_MODULE_0__.keys)(data).forEach((function(key){if(data[key]===null||typeof data[key]==="undefined"||typeof data[key]==="string"&&data[key].trim()===""){inputError(key);valid=false;error="Merci de renseigner tous les champs marqués d'un *";errors.push("".concat(key,".required"))}else inputError(key,true)}));return{valid:valid,error:error,errors:errors}};var validate={email:function email(_email){if(_email===null||_email.trim()===""){inputError("email");return false}return/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(_email)},phone:function phone(_phone){return/^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/.test(_phone)},password:function password(_password){if(/(?=.*[A-Z])/.test(_password)&&/(?=.*[a-z])/.test(_password)&&/(?=.*\d)/.test(_password)&&/(?=.*?[\/+~"'{}()|#`_\[\]=%§.,:;?!@$^&*-])/.test(_password)&&/.{8,}/.test(_password))return true;inputError("password");return false},confirmPassword:function confirmPassword(password,confirmation){if(password&&password.trim()!==""&&validate.password(password)&&password===confirmation)return true;inputError("confirmPassword");return false}}},8034:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Z:function(){return qrcp_input}});var runtime_core_esm_bundler=__webpack_require__(6252);var shared_esm_bundler=__webpack_require__(3577);var runtime_dom_esm_bundler=__webpack_require__(9963);var _withScopeId=function _withScopeId(n){return _pushScopeId("data-v-47028cb9"),n=n(),_popScopeId(),n};var _hoisted_1={key:0,class:"help-content small rounded p-1 text-center text-white full-flex"};function render(_ctx,_cache,$props,$setup,$data,$options){var _component_ssf_icon=(0,runtime_core_esm_bundler.up)("ssf-icon");var _component_form_input=(0,runtime_core_esm_bundler.up)("form-input");return(0,runtime_core_esm_bundler.wg)(),(0,runtime_core_esm_bundler.j4)(_component_form_input,{key:"input-component-".concat(_ctx.name,"-").concat(_ctx.inputKey),ref:function ref(el){_ctx.input=el},autocomplete:_ctx.autocomplete,col:_ctx.col,disabled:_ctx.disabled,"error-messages":_ctx.errorMessages,errors:_ctx.errors,"form-group-class":_ctx.formGroupClass,icon:_ctx.icon,"input-class":"qrcp-form-control ".concat(_ctx.inputClass),label:_ctx.label,multiple:_ctx.multiple,name:_ctx.name,optionField:_ctx.optionField,optionGroup:_ctx.optionGroup,optionItems:_ctx.optionItems,optionLabel:_ctx.optionLabel,placeholder:_ctx.placeholder,required:_ctx.required,row:_ctx.row,scrollX:_ctx.scrollX,select:_ctx.select,selectHeight:_ctx.selectHeight,"wheel-propagation":_ctx.wheelPropagation,type:_ctx.type,value:_ctx.value,"onUpdate:value":_ctx.onUpdateValue},(0,runtime_core_esm_bundler.Nv)({_:2},[_ctx.withHelp?{name:"default",fn:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler._)("div",{style:(0,shared_esm_bundler.j5)("--help-item-bottom: ".concat(_ctx.helpItemBottom,"px")),class:"help-item align-flex",onMouseenter:_cache[0]||(_cache[0]=function($event){return _ctx.hoverHelp=true}),onMouseleave:_cache[1]||(_cache[1]=function($event){return _ctx.hoverHelp=false})},[(0,runtime_core_esm_bundler.Wm)(_component_ssf_icon,{class:(0,shared_esm_bundler.C_)(_ctx.helpColor),icon:"question-circle",la:"",size:"lg"},null,8,["class"]),(0,runtime_core_esm_bundler.Wm)(runtime_dom_esm_bundler.uT,{"enter-active-class":"animated fadeIn","leave-active-class":"animated fadeOut"},{default:(0,runtime_core_esm_bundler.w5)((function(){return[_ctx.hoverHelp?((0,runtime_core_esm_bundler.wg)(),(0,runtime_core_esm_bundler.iD)("div",_hoisted_1,(0,shared_esm_bundler.zw)(_ctx.helpText),1)):(0,runtime_core_esm_bundler.kq)("",true)]})),_:1})],36)]}))}:undefined]),1032,["autocomplete","col","disabled","error-messages","errors","form-group-class","icon","input-class","label","multiple","name","optionField","optionGroup","optionItems","optionLabel","placeholder","required","row","scrollX","select","selectHeight","wheel-propagation","type","value","onUpdate:value"])}var reactivity_esm_bundler=__webpack_require__(2262);var lodash=__webpack_require__(6486);var validation=__webpack_require__(1909);function form_inputvue_type_template_id_0a3bf581_render(_ctx,_cache,$props,$setup,$data,$options){var _component_ssf_container=(0,runtime_core_esm_bundler.up)("ssf-container");var _component_ssf_col=(0,runtime_core_esm_bundler.up)("ssf-col");var _component_ssf_form_group=(0,runtime_core_esm_bundler.up)("ssf-form-group");return(0,runtime_core_esm_bundler.wg)(),(0,runtime_core_esm_bundler.j4)(_component_ssf_form_group,{autocomplete:_ctx.autocomplete,col:_ctx.col,disabled:_ctx.disabled,"form-group-class":"qrcp-form-group ".concat(_ctx.formGroupClass).concat(_ctx.hasError?" has-own-slot":""),icon:{icon:_ctx.icon,type:_ctx.iconType,weight:_ctx.iconWeight},"input-class":"qrcp-form-control ".concat(_ctx.inputClass),label:_ctx.label,multiple:_ctx.multiple,name:_ctx.name,optionField:_ctx.optionField,optionGroup:_ctx.optionGroup,optionItems:_ctx.optionItems,optionLabel:_ctx.optionLabel,placeholder:_ctx.placeholder,required:_ctx.required,row:_ctx.row,scrollX:_ctx.scrollX,select:_ctx.select,selectHeight:_ctx.selectHeight,type:_ctx.type,value:_ctx.value,"wheel-propagation":_ctx.wheelPropagation,"onUpdate:value":_ctx.onUpdateValue},{default:(0,runtime_core_esm_bundler.w5)((function(){return[_ctx.hasError?((0,runtime_core_esm_bundler.wg)(),(0,runtime_core_esm_bundler.j4)(_component_ssf_container,{key:0,class:"form-input-error"},{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_ssf_col,{size:"12"},{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_ssf_container,{innerHTML:_ctx.messages},null,8,["innerHTML"])]})),_:1})]})),_:1})):(0,runtime_core_esm_bundler.kq)("",true),_ctx.hasSlot("label")?(0,runtime_core_esm_bundler.WI)(_ctx.$slots,"label",{key:1,slot:"label"}):(0,runtime_core_esm_bundler.kq)("",true),_ctx.hasSlot("file-info")?(0,runtime_core_esm_bundler.WI)(_ctx.$slots,"file-info",{key:2,slot:"file-info"}):(0,runtime_core_esm_bundler.kq)("",true),_ctx.hasSlot("selector")?(0,runtime_core_esm_bundler.WI)(_ctx.$slots,"selector",{key:3,slot:"selector"}):(0,runtime_core_esm_bundler.kq)("",true),_ctx.hasSlot("delete-file")?(0,runtime_core_esm_bundler.WI)(_ctx.$slots,"delete-file",{key:4,slot:"delete-file"}):(0,runtime_core_esm_bundler.kq)("",true),(0,runtime_core_esm_bundler.WI)(_ctx.$slots,"default")]})),_:3},8,["autocomplete","col","disabled","form-group-class","icon","input-class","label","multiple","name","optionField","optionGroup","optionItems","optionLabel","placeholder","required","row","scrollX","select","selectHeight","type","value","wheel-propagation","onUpdate:value"])}var form_inputvue_type_script_lang_js=(0,runtime_core_esm_bundler.aZ)({name:"form-input",emits:["update:value","input"],props:{row:{type:Boolean,required:false,default:false},col:{type:[Boolean,Number,Object,String],required:false,default:false},formGroupClass:{type:String,required:false,default:""},inputClass:{type:[String,Object],required:false,default:""},name:{type:[String,Object],required:true},label:{type:[String],required:false},value:{required:false,default:null},required:{type:Boolean,required:false,default:false},type:{type:String,required:false,default:"text"},disabled:{type:Boolean,required:false,default:false},placeholder:{type:[Boolean,String],required:false,default:false},autocomplete:{type:[Boolean,String],required:false,default:false},select:{type:Boolean,required:false,default:false},optionItems:{type:[Array,Object],required:false},optionField:{type:String,required:false,default:null},optionLabel:{type:String,required:false,default:"label"},optionGroup:{type:Boolean,required:false,default:false},multiple:{type:Boolean,required:false,default:false},scrollX:{type:Boolean,required:false,default:false},wheelPropagation:{type:Boolean,required:false,default:false},selectHeight:{type:[Number,String],required:false,default:350},icon:{type:[String],required:false},iconType:{type:[String],required:false,default:"fa"},iconWeight:{type:[String],required:false,default:"light"},errors:{type:Array},errorMessages:{type:[Array,Object],required:true}},setup:function setup(props){var _toRefs=(0,reactivity_esm_bundler.BK)(props),errors=_toRefs.errors,name=_toRefs.name;var pattern="(^".concat(name.value,".)|(\\.").concat(name.value,".)");var keyErrors=function keyErrors(){return(0,lodash.filter)(errors.value,(function(key){return key.match(new RegExp(pattern,"g"))!==null}))};var hasSlot=function hasSlot(){var name=arguments.length>0&&arguments[0]!==undefined?arguments[0]:"default";var component=arguments.length>1&&arguments[1]!==undefined?arguments[1]:(0,runtime_core_esm_bundler.FN)();return component&&!!component.slots[name]};var hasError=(0,runtime_core_esm_bundler.Fl)((function(){return keyErrors().length>0}));var messages=(0,runtime_core_esm_bundler.Fl)((function(){var result=[];(0,lodash.each)(keyErrors(),(function(key){return result.push(props.errorMessages[key]||null)}));return'<ul class="qrcp-errors mt-1">'.concat(result.map((function(item){return"<li>".concat(item,"</li>")})).join(""),"</ul>")}));return{hasError:hasError,messages:messages,hasSlot:hasSlot}},methods:{onUpdateValue:function onUpdateValue(event){this.$emit("update:value",event);this.$emit("input",event)}}});var exportHelper=__webpack_require__(3744);const __exports__=(0,exportHelper.Z)(form_inputvue_type_script_lang_js,[["render",form_inputvue_type_template_id_0a3bf581_render]]);var form_input=__exports__;var qrcp_inputvue_type_script_lang_js=(0,runtime_core_esm_bundler.aZ)({name:"qrcp-input",components:{FormInput:form_input},emits:["update:value","input"],props:{row:{type:Boolean,required:false,default:false},col:{type:[Boolean,Number,Object,String],required:false,default:false},formGroupClass:{type:String,required:false,default:""},inputClass:{type:[String,Object],required:false,default:""},name:{type:[String,Object],required:true},label:{type:[String],required:false},value:{required:false,default:null},required:{type:Boolean,required:false,default:false},type:{type:String,required:false,default:"text"},disabled:{type:Boolean,required:false,default:false},placeholder:{type:[Boolean,String],required:false,default:false},autocomplete:{type:[Boolean,String],required:false,default:false},select:{type:Boolean,required:false,default:false},optionItems:{type:[Array,Object],required:false},optionField:{type:String,required:false,default:null},optionLabel:{type:String,required:false,default:"label"},optionGroup:{type:Boolean,required:false,default:false},multiple:{type:Boolean,required:false,default:false},scrollX:{type:Boolean,required:false,default:false},wheelPropagation:{type:Boolean,required:false,default:false},selectHeight:{type:[Number,String],required:false,default:350},icon:{type:[String],required:false},errors:{type:Array},withHelp:{type:Boolean,required:false,default:false},helpText:{type:String,required:false},helpColor:{type:String,required:false,default:"help-text-info"}},setup:function setup(props){var hoverHelp=(0,reactivity_esm_bundler.iH)(false);var helpItemBottom=(0,reactivity_esm_bundler.iH)(0);var inputKeyIndex=(0,reactivity_esm_bundler.iH)(0);var inputKey=(0,reactivity_esm_bundler.iH)("input-component-".concat(props.name,"-").concat(inputKeyIndex.value));var input=(0,reactivity_esm_bundler.iH)(null);var updateHelpItemBottom=function updateHelpItemBottom(){var _input$value,_input$value$$el;helpItemBottom.value=0;(0,lodash.filter)((_input$value=input.value)===null||_input$value===void 0?void 0:(_input$value$$el=_input$value.$el)===null||_input$value$$el===void 0?void 0:_input$value$$el.children,(function(i){return(0,lodash.includes)(i.classList,"form-input-error")})).forEach((function(item){return helpItemBottom.value+=(item===null||item===void 0?void 0:item.clientHeight)||0}));helpItemBottom.value+=7};(0,runtime_core_esm_bundler.bv)((function(){return updateHelpItemBottom()}));(0,runtime_core_esm_bundler.YP)(inputKeyIndex,(function(){return inputKey.value="input-component-".concat(props.name,"-").concat(inputKeyIndex.value)}));(0,runtime_core_esm_bundler.YP)(input,(function(){return updateHelpItemBottom()}));return{hoverHelp:hoverHelp,helpItemBottom:helpItemBottom,inputKey:inputKey,input:input,errorMessages:validation.sY}},methods:{onUpdateValue:function onUpdateValue(event){this.$emit("update:value",event);this.$emit("input",event)}}});const qrcp_input_exports_=(0,exportHelper.Z)(qrcp_inputvue_type_script_lang_js,[["render",render],["__scopeId","data-v-47028cb9"]]);var qrcp_input=qrcp_input_exports_}}]);