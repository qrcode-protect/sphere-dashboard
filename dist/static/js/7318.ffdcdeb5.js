"use strict";(self["webpackChunksphere_dashboard"]=self["webpackChunksphere_dashboard"]||[]).push([[7318,382,2533,3278],{75451:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Dq:function(){return articles},PM:function(){return articleGetter},Zt:function(){return fetchArticles}});var _app_vue_store__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(7280);var _vue_reactivity__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(2262);var articlesGetter="article/articles";var articleGetter="article/article";var articles=(0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_1__.Fl)((function(){return _app_vue_store__WEBPACK_IMPORTED_MODULE_0__.Z.getters[articlesGetter]}));var currentArticle=(0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_1__.Fl)((function(){return _app_vue_store__WEBPACK_IMPORTED_MODULE_0__.Z.getters[articleGetter]}));var fetchArticles=function fetchArticles(){var force=arguments.length>0&&arguments[0]!==undefined?arguments[0]:false;if(force===true||articles.value===null){return _app_vue_store__WEBPACK_IMPORTED_MODULE_0__.Z.dispatch("article/fetchAll")}return null}},27782:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Z:function(){return page_title}});var runtime_core_esm_bundler=__webpack_require__(66252);var shared_esm_bundler=__webpack_require__(3577);function render(_ctx,_cache,$props,$setup,$data,$options){var _component_ssf_title=(0,runtime_core_esm_bundler.up)("ssf-title");var _component_ssf_container=(0,runtime_core_esm_bundler.up)("ssf-container");return(0,runtime_core_esm_bundler.wg)(),(0,runtime_core_esm_bundler.j4)(_component_ssf_container,{class:"py-3"},{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_ssf_title,{center:"",class:"text-uppercase",style:{"font-weight":"500"}},{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Uk)((0,shared_esm_bundler.zw)(_ctx.title),1)]})),_:1})]})),_:1})}var page_titlevue_type_script_lang_ts=(0,runtime_core_esm_bundler.aZ)({name:"page-title",props:{title:{type:String,required:true}},setup:function setup(){}});var exportHelper=__webpack_require__(83744);const __exports__=(0,exportHelper.Z)(page_titlevue_type_script_lang_ts,[["render",render]]);var page_title=__exports__},99555:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,{default:function(){return edit}});var runtime_core_esm_bundler=__webpack_require__(66252);function render(_ctx,_cache,$props,$setup,$data,$options){var _component_page_title=(0,runtime_core_esm_bundler.up)("page-title");var _component_article_form=(0,runtime_core_esm_bundler.up)("article-form");var _component_ssf_container=(0,runtime_core_esm_bundler.up)("ssf-container");return(0,runtime_core_esm_bundler.wg)(),(0,runtime_core_esm_bundler.j4)(_component_ssf_container,{name:"articles-edit"},{default:(0,runtime_core_esm_bundler.w5)((function(){return[(0,runtime_core_esm_bundler.Wm)(_component_page_title,{title:"modifier un article"}),_ctx.article?((0,runtime_core_esm_bundler.wg)(),(0,runtime_core_esm_bundler.j4)(_component_article_form,{key:0,article:_ctx.article,error:_ctx.error,errors:_ctx.errors,edition:"",onHasError:_cache[0]||(_cache[0]=function(event){return _ctx.error=event})},null,8,["article","error","errors"])):(0,runtime_core_esm_bundler.kq)("",true)]})),_:1})}var reactivity_esm_bundler=__webpack_require__(2262);var vue_meta_esm_browser_min=__webpack_require__(43612);var x_article=__webpack_require__(11099);var qrcp_input=__webpack_require__(50918);var page_title=__webpack_require__(27782);var article_form=__webpack_require__(41495);var vue_router_esm_bundler=__webpack_require__(42119);var vuex_esm_bundler=__webpack_require__(33907);var articles=__webpack_require__(75451);var editvue_type_script_lang_ts=(0,runtime_core_esm_bundler.aZ)({name:"articles-edit",components:{ArticleForm:article_form["default"],PageTitle:page_title.Z,QrcpInput:qrcp_input.Z,XArticle:x_article["default"]},setup:function setup(){(0,vue_meta_esm_browser_min.jq)({title:"Articles - Modifier"});var router=(0,vue_router_esm_bundler.tv)();var store=(0,vuex_esm_bundler.oR)();var article=(0,reactivity_esm_bundler.iH)(null);var errors=(0,reactivity_esm_bundler.iH)(null);(0,runtime_core_esm_bundler.bv)((function(){var currentArticle=store.getters[articles.PM];if(currentArticle===null){return router.back()}article.value=currentArticle}));return{article:article,errors:errors}},data:function data(){return{loading:false,error:null}},methods:{}});var exportHelper=__webpack_require__(83744);const __exports__=(0,exportHelper.Z)(editvue_type_script_lang_ts,[["render",render],["__scopeId","data-v-774ec704"]]);var edit=__exports__}}]);