"use strict";(self["webpackChunksphere_dashboard"]=self["webpackChunksphere_dashboard"]||[]).push([[1669,8960],{29022:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,{default:function(){return inactive_partners}});var es_function_name=__webpack_require__(68309);var runtime_core_esm_bundler=__webpack_require__(66252);var _withScopeId=function _withScopeId(n){return(0,runtime_core_esm_bundler.dD)("data-v-62d5177a"),n=n(),(0,runtime_core_esm_bundler.Cn)(),n};var _hoisted_1=["onClick"];var _hoisted_2=["onClick"];var _hoisted_3=_withScopeId((function(){return(0,runtime_core_esm_bundler._)("span",{class:"secondary-item"}," Aucune demande en attente de validation ",-1)}));function render(_ctx,_cache,$props,$setup,$data,$options){var _component_ssf_icon=(0,runtime_core_esm_bundler.up)("ssf-icon");var _component_ssf_container=(0,runtime_core_esm_bundler.up)("ssf-container");var _component_card_company_info=(0,runtime_core_esm_bundler.up)("card-company-info");var _component_ssf_row=(0,runtime_core_esm_bundler.up)("ssf-row");return(0,runtime_core_esm_bundler.wg)(),(0,runtime_core_esm_bundler.j4)(_component_ssf_container,{class:"position-relative",name:"inactive-partners"},{default:(0,runtime_core_esm_bundler.w5)((function(){return[$setup.partners&&$setup.partners.length>0?((0,runtime_core_esm_bundler.wg)(),(0,runtime_core_esm_bundler.j4)(_component_ssf_container,{key:0,class:"inactive-partners-container"},{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_ssf_row,null,{default:(0,runtime_core_esm_bundler.w5)((function(){return[((0,runtime_core_esm_bundler.wg)(true),(0,runtime_core_esm_bundler.iD)(runtime_core_esm_bundler.HY,null,(0,runtime_core_esm_bundler.Ko)($setup.partners,(function(partner){return(0,runtime_core_esm_bundler.wg)(),(0,runtime_core_esm_bundler.j4)(_component_card_company_info,{icon:$setup.Partner.icon.name,item:partner,"item-keys":_ctx.itemKeys,"data-type":"partner","footer-class":"bg-white border-0"},{footer:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_ssf_container,{class:"text-right"},{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler._)("button",{class:"btn text-danger rounded text-white border border-danger inactive-partner-action-button d-inline-block mr-3",onClick:function onClick($event){return $setup.deny(partner)}},[(0,runtime_core_esm_bundler.Wm)(_component_ssf_icon,{icon:"ban",size:"1x5",thin:""})],8,_hoisted_1),(0,runtime_core_esm_bundler._)("button",{class:"btn text-success rounded text-white border border-success inactive-partner-action-button d-inline-block ml-2",onClick:function onClick($event){return $setup.accept(partner)}},[(0,runtime_core_esm_bundler.Wm)(_component_ssf_icon,{icon:"check",size:"1x5",thin:""})],8,_hoisted_2)]})),_:2},1024)]})),_:2},1032,["icon","item","item-keys"])})),256))]})),_:1})]})),_:1})):((0,runtime_core_esm_bundler.wg)(),(0,runtime_core_esm_bundler.j4)(_component_ssf_container,{key:1,class:"full-absolute full-flex"},{default:(0,runtime_core_esm_bundler.w5)((function(){return[_hoisted_3]})),_:1}))]})),_:1})}var asyncToGenerator=__webpack_require__(48534);var regenerator=__webpack_require__(19298);var regenerator_default=__webpack_require__.n(regenerator);var vuex_esm_bundler=__webpack_require__(33907);var partner=__webpack_require__(15891);var company_info=__webpack_require__(4502);var commons=__webpack_require__(18416);var main_warning=__webpack_require__(87464);var main_success=__webpack_require__(25371);var card_company_info=__webpack_require__(6462);var swal=__webpack_require__(62045);var inactive_partnersvue_type_script_lang_ts={name:"inactive-partners",components:{CardCompanyInfo:card_company_info.Z},setup:function setup(){var store=(0,vuex_esm_bundler.oR)();(0,runtime_core_esm_bundler.bv)((0,asyncToGenerator.Z)(regenerator_default().mark((function _callee(){return regenerator_default().wrap((function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:_context.next=2;return store.dispatch("partner/fetchInactive");case 2:return _context.abrupt("return",_context.sent);case 3:case"end":return _context.stop()}}}),_callee)}))));var partners=(0,runtime_core_esm_bundler.Fl)((function(){return store.getters["partner/inactivePartners"]}));var accept=function accept(partner){return partner.accept().then((0,asyncToGenerator.Z)(regenerator_default().mark((function _callee2(){return regenerator_default().wrap((function _callee2$(_context2){while(1){switch(_context2.prev=_context2.next){case 0:main_success.Z.fire();_context2.next=3;return store.dispatch("partner/fetchInactive");case 3:return _context2.abrupt("return",_context2.sent);case 4:case"end":return _context2.stop()}}}),_callee2)})))).catch((function(error){return swal.zk.fire({text:error.message})}))};var deny=function deny(partner){return main_warning.Z.fire({html:"<span>Êtes-vous sûr(e) de vouloir refuser cette inscription ? <br/><span class='small'>(Cette action est irréversible)</span></span>",confirmButtonText:"Oui, j'en suis sûr",showCancelButton:true,cancelButtonText:"J'hésite encore",allowOutsideClick:false,customClass:{cancelButton:"rounded py-3 bg-warning",confirmButton:"rounded py-3 bg-danger"}}).then((function(answer){return answer.isConfirmed&&answer.value?partner.deny().then((0,asyncToGenerator.Z)(regenerator_default().mark((function _callee3(){return regenerator_default().wrap((function _callee3$(_context3){while(1){switch(_context3.prev=_context3.next){case 0:main_success.Z.fire();_context3.next=3;return store.dispatch("partner/fetchInactive");case 3:return _context3.abrupt("return",_context3.sent);case 4:case"end":return _context3.stop()}}}),_callee3)})))):null}))};return{partners:partners,accept:accept,deny:deny,Partner:partner.Z}},data:function data(){return{itemKeys:[new company_info.Z({icon:"at",key:"email",isLink:true,urlPrefix:commons.lu.email,urlType:commons.k2.email,copyable:true}),new company_info.Z({icon:"mobile",key:"phone",isLink:true,urlPrefix:commons.lu.phone,urlType:commons.k2.phone,copyable:true}),new company_info.Z({icon:"circle-user",key:"username"}),new company_info.Z({icon:"file-certificate",key:"certificate",isLink:true,title:"KBIS",urlPrefix:commons.lu.empty,urlType:commons.k2.image,titleOnly:true}),new company_info.Z({icon:"asterisk",key:"siret",title:"Siret"})]}}};var exportHelper=__webpack_require__(83744);const __exports__=(0,exportHelper.Z)(inactive_partnersvue_type_script_lang_ts,[["render",render],["__scopeId","data-v-62d5177a"]]);var inactive_partners=__exports__},38409:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,{default:function(){return components}});var runtime_core_esm_bundler=__webpack_require__(66252);var shared_esm_bundler=__webpack_require__(3577);function render(_ctx,_cache,$props,$setup,$data,$options){var _component_ssf_col=(0,runtime_core_esm_bundler.up)("ssf-col");var _component_ssf_row=(0,runtime_core_esm_bundler.up)("ssf-row");var _component_ssf_container=(0,runtime_core_esm_bundler.up)("ssf-container");var _component_active_partners=(0,runtime_core_esm_bundler.up)("active-partners");var _component_inactive_partners=(0,runtime_core_esm_bundler.up)("inactive-partners");var _component_ssf_icon=(0,runtime_core_esm_bundler.up)("ssf-icon");var _component_ssf_shape=(0,runtime_core_esm_bundler.up)("ssf-shape");var _component_router_link=(0,runtime_core_esm_bundler.up)("router-link");return(0,runtime_core_esm_bundler.wg)(),(0,runtime_core_esm_bundler.j4)(_component_ssf_container,{name:"partners"},{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_ssf_container,{class:"partner-nav-tabs","not-full":""},{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_ssf_row,{class:"px-3"},{default:(0,runtime_core_esm_bundler.w5)((function(){return[((0,runtime_core_esm_bundler.wg)(true),(0,runtime_core_esm_bundler.iD)(runtime_core_esm_bundler.HY,null,(0,runtime_core_esm_bundler.Ko)(_ctx.tabs,(function(tab){return(0,runtime_core_esm_bundler.wg)(),(0,runtime_core_esm_bundler.j4)(_component_ssf_col,{class:(0,shared_esm_bundler.C_)(["partner-nav-tab-item py-3 cursor-pointer",{"border-bottom border-strong border-color-1":tab.tabIndex===_ctx.currentTab}]),onClick:function onClick($event){return _ctx.onTabChange(tab.tabIndex)}},{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler._)("span",null,(0,shared_esm_bundler.zw)(tab.title),1)]})),_:2},1032,["class","onClick"])})),256))]})),_:1})]})),_:1}),(0,runtime_core_esm_bundler.Wm)(_component_ssf_container,{fluid:""},{default:(0,runtime_core_esm_bundler.w5)((function(){return[_ctx.currentTab===1?((0,runtime_core_esm_bundler.wg)(),(0,runtime_core_esm_bundler.j4)(_component_active_partners,{key:0})):(0,runtime_core_esm_bundler.kq)("",true),_ctx.currentTab===2?((0,runtime_core_esm_bundler.wg)(),(0,runtime_core_esm_bundler.j4)(_component_inactive_partners,{key:1})):(0,runtime_core_esm_bundler.kq)("",true)]})),_:1}),(0,runtime_core_esm_bundler.Wm)(_component_router_link,{to:{name:"partners.create"},class:"btn-create-partner"},{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_ssf_shape,{size:"75",circle:"",class:"bg-color-2 full-flex text-white z-depth-1"},{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_ssf_icon,{icon:"layer-plus",size:"2x",light:""})]})),_:1})]})),_:1},8,["to"])]})),_:1})}var vue_meta_esm_browser_min=__webpack_require__(43612);var active_partners=__webpack_require__(52203);var inactive_partners=__webpack_require__(29022);var componentsvue_type_script_lang_ts=(0,runtime_core_esm_bundler.aZ)({name:"partners-index",components:{InactivePartners:inactive_partners["default"],ActivePartners:active_partners["default"]},setup:function setup(){(0,vue_meta_esm_browser_min.jq)({title:"Partenaires"});return{}},data:function data(){return{currentTab:1,tabs:[{title:"Partenaires actifs",tabIndex:1},{title:"En attente de validation",tabIndex:2}]}},methods:{onTabChange:function onTabChange(tabItem){this.currentTab=tabItem}}});var exportHelper=__webpack_require__(83744);const __exports__=(0,exportHelper.Z)(componentsvue_type_script_lang_ts,[["render",render],["__scopeId","data-v-577758c8"]]);var components=__exports__}}]);