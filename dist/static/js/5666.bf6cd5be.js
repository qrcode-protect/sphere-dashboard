"use strict";(self["webpackChunksphere_dashboard"]=self["webpackChunksphere_dashboard"]||[]).push([[5666,382,2533,3278],{27782:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Z:function(){return page_title}});var runtime_core_esm_bundler=__webpack_require__(66252);var shared_esm_bundler=__webpack_require__(3577);function render(_ctx,_cache,$props,$setup,$data,$options){var _component_ssf_title=(0,runtime_core_esm_bundler.up)("ssf-title");var _component_ssf_container=(0,runtime_core_esm_bundler.up)("ssf-container");return(0,runtime_core_esm_bundler.wg)(),(0,runtime_core_esm_bundler.j4)(_component_ssf_container,{class:"py-3"},{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_ssf_title,{center:"",class:"text-uppercase",style:{"font-weight":"500"}},{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Uk)((0,shared_esm_bundler.zw)(_ctx.title),1)]})),_:1})]})),_:1})}var page_titlevue_type_script_lang_ts=(0,runtime_core_esm_bundler.aZ)({name:"page-title",props:{title:{type:String,required:true}},setup:function setup(){}});var exportHelper=__webpack_require__(83744);const __exports__=(0,exportHelper.Z)(page_titlevue_type_script_lang_ts,[["render",render]]);var page_title=__exports__},6577:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,{default:function(){return create}});var runtime_core_esm_bundler=__webpack_require__(66252);function render(_ctx,_cache,$props,$setup,$data,$options){var _component_page_title=(0,runtime_core_esm_bundler.up)("page-title");var _component_article_form=(0,runtime_core_esm_bundler.up)("article-form");var _component_ssf_container=(0,runtime_core_esm_bundler.up)("ssf-container");return(0,runtime_core_esm_bundler.wg)(),(0,runtime_core_esm_bundler.j4)(_component_ssf_container,{name:"articles-create"},{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_page_title,{title:"ajouter un article"}),(0,runtime_core_esm_bundler.Wm)(_component_article_form,{article:_ctx.article,error:_ctx.error,errors:_ctx.errors,onSaved:_ctx.onSaved,onHasError:_cache[0]||(_cache[0]=function(event){return _ctx.error=event})},null,8,["article","error","errors","onSaved"])]})),_:1})}var reactivity_esm_bundler=__webpack_require__(2262);var vue_meta_esm_browser_min=__webpack_require__(43612);var x_article=__webpack_require__(11099);var article_article=__webpack_require__(37071);var qrcp_input=__webpack_require__(50918);var article_paragraph=__webpack_require__(96454);var page_title=__webpack_require__(27782);var article_form=__webpack_require__(41495);var createvue_type_script_lang_ts=(0,runtime_core_esm_bundler.aZ)({name:"articles-create",components:{ArticleForm:article_form["default"],PageTitle:page_title.Z,QrcpInput:qrcp_input.Z,XArticle:x_article["default"]},setup:function setup(){(0,vue_meta_esm_browser_min.jq)({title:"Articles - Nouveau"});var article=(0,reactivity_esm_bundler.iH)((new article_article.Z).__setItemAttributes({writer:null,image:null,title:null,themes:[""],paragraphs:[new article_paragraph.Z],networks:null}));var errors=(0,reactivity_esm_bundler.iH)(null);return{article:article,errors:errors}},data:function data(){return{loading:false,error:null}},methods:{onSaved:function onSaved(){this.article=(new article_article.Z).__setItemAttributes({writer:null,image:null,title:null,themes:[""],paragraphs:[new article_paragraph.Z],networks:null})}}});var exportHelper=__webpack_require__(83744);const __exports__=(0,exportHelper.Z)(createvue_type_script_lang_ts,[["render",render],["__scopeId","data-v-242d57b4"]]);var create=__exports__}}]);