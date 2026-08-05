import{$ as e,$t as t,Bt as n,Dn as r,E as i,En as a,Et as o,Fn as s,Ft as c,Hn as l,Ht as u,In as d,Jn as f,Kt as p,Ln as m,Mn as h,Nn as g,O as _,Qt as v,S as y,Sn as b,Tn as x,Un as S,Vn as C,Wn as w,Xt as T,Yt as E,Zn as D,Zt as O,_n as k,an as ee,bn as A,dn as j,en as te,er as M,hn as N,kt as P,l as F,lt as I,mn as ne,n as L,nt as re,ot as R,qt as z,rr as B,sn as ie,ut as V,vt as H,wn as U,wt as ae,xn as W,xt as oe,yn as se,yt as G}from"./auth-C3tLNBl0.js";import{C as ce,_ as le,g as K,t as ue,u as de,w as fe}from"./AppShell-C312L2Qg.js";import{a as pe,n as q,o as J,r as me,t as Y}from"./Popconfirm-B4aXM1MW.js";import{f as he}from"./useTheme-CkXqk_DM.js";import{c as ge,t as _e}from"./_plugin-vue_export-helper-OW_rLE0U.js";import{D as ve,E as ye}from"./light-BTYCES0c.js";import{t as be}from"./get-slot-6kXJmSMP.js";import{t as xe}from"./Add-n2QzB1Pj.js";import{t as X}from"./Alert-C1mMEZMU.js";import{t as Se}from"./use-message-HBDEeiPn.js";import{n as Ce,r as we}from"./light-DJEmH_lZ.js";import{t as Z}from"./docker-h2478yAS.js";import{n as Te,t as Q}from"./format-BxLcbkc3.js";var Ee=K(`.v-x-scroll`,{overflow:`auto`,scrollbarWidth:`none`},[K(`&::-webkit-scrollbar`,{width:0,height:0})]),De=b({name:`XScroll`,props:{disabled:Boolean,onScroll:Function},setup(){let e=f(null);function t(e){!(e.currentTarget.offsetWidth<e.currentTarget.scrollWidth)||e.deltaY===0||(e.currentTarget.scrollLeft+=e.deltaY+e.deltaX,e.preventDefault())}let n=o();return Ee.mount({id:`vueuc/x-scroll`,head:!0,anchorMetaName:le,ssr:n}),Object.assign({selfRef:e,handleWheel:t},{scrollTo(...t){var n;(n=e.value)==null||n.scrollTo(...t)}})},render(){return U(`div`,{ref:`selfRef`,onScroll:this.onScroll,onWheel:this.disabled?void 0:this.handleWheel,class:`v-x-scroll`},this.$slots)}});function Oe(e,t=`default`,n=[]){let{children:r}=e;if(typeof r==`object`&&r&&!Array.isArray(r)){let e=r[t];if(typeof e==`function`)return e()}return n}var ke=/\s/;function Ae(e){for(var t=e.length;t--&&ke.test(e.charAt(t)););return t}var je=/^\s+/;function Me(e){return e&&e.slice(0,Ae(e)+1).replace(je,``)}var Ne=NaN,Pe=/^[-+]0x[0-9a-f]+$/i,Fe=/^0b[01]+$/i,Ie=/^0o[0-7]+$/i,Le=parseInt;function Re(t){if(typeof t==`number`)return t;if(re(t))return Ne;if(e(t)){var n=typeof t.valueOf==`function`?t.valueOf():t;t=e(n)?n+``:n}if(typeof t!=`string`)return t===0?t:+t;t=Me(t);var r=Fe.test(t);return r||Ie.test(t)?Le(t.slice(2),r?2:8):Pe.test(t)?Ne:+t}var ze=function(){return R.Date.now()},Be=`Expected a function`,Ve=Math.max,He=Math.min;function Ue(t,n,r){var i,a,o,s,c,l,u=0,d=!1,f=!1,p=!0;if(typeof t!=`function`)throw TypeError(Be);n=Re(n)||0,e(r)&&(d=!!r.leading,f=`maxWait`in r,o=f?Ve(Re(r.maxWait)||0,n):o,p=`trailing`in r?!!r.trailing:p);function m(e){var n=i,r=a;return i=a=void 0,u=e,s=t.apply(r,n),s}function h(e){return u=e,c=setTimeout(v,n),d?m(e):s}function g(e){var t=e-l,r=e-u,i=n-t;return f?He(i,o-r):i}function _(e){var t=e-l,r=e-u;return l===void 0||t>=n||t<0||f&&r>=o}function v(){var e=ze();if(_(e))return y(e);c=setTimeout(v,g(e))}function y(e){return c=void 0,p&&i?m(e):(i=a=void 0,s)}function b(){c!==void 0&&clearTimeout(c),u=0,i=l=a=c=void 0}function x(){return c===void 0?s:y(ze())}function S(){var e=ze(),t=_(e);if(i=arguments,a=this,l=e,t){if(c===void 0)return h(l);if(f)return clearTimeout(c),c=setTimeout(v,n),m(l)}return c===void 0&&(c=setTimeout(v,n)),s}return S.cancel=b,S.flush=x,S}var We=`Expected a function`;function Ge(t,n,r){var i=!0,a=!0;if(typeof t!=`function`)throw TypeError(We);return e(r)&&(i=`leading`in r?!!r.leading:i,a=`trailing`in r?!!r.trailing:a),Ue(t,n,{leading:i,maxWait:n,trailing:a})}var Ke=p([z(`descriptions`,{fontSize:`var(--n-font-size)`},[z(`descriptions-separator`,`
 display: inline-block;
 margin: 0 8px 0 2px;
 `),z(`descriptions-table-wrapper`,[z(`descriptions-table`,[z(`descriptions-table-row`,[z(`descriptions-table-header`,{padding:`var(--n-th-padding)`}),z(`descriptions-table-content`,{padding:`var(--n-td-padding)`})])])]),O(`bordered`,[z(`descriptions-table-wrapper`,[z(`descriptions-table`,[z(`descriptions-table-row`,[p(`&:last-child`,[z(`descriptions-table-content`,{paddingBottom:0})])])])])]),T(`left-label-placement`,[z(`descriptions-table-content`,[p(`> *`,{verticalAlign:`top`})])]),T(`left-label-align`,[p(`th`,{textAlign:`left`})]),T(`center-label-align`,[p(`th`,{textAlign:`center`})]),T(`right-label-align`,[p(`th`,{textAlign:`right`})]),T(`bordered`,[z(`descriptions-table-wrapper`,`
 border-radius: var(--n-border-radius);
 overflow: hidden;
 background: var(--n-merged-td-color);
 border: 1px solid var(--n-merged-border-color);
 `,[z(`descriptions-table`,[z(`descriptions-table-row`,[p(`&:not(:last-child)`,[z(`descriptions-table-content`,{borderBottom:`1px solid var(--n-merged-border-color)`}),z(`descriptions-table-header`,{borderBottom:`1px solid var(--n-merged-border-color)`})]),z(`descriptions-table-header`,`
 font-weight: 400;
 background-clip: padding-box;
 background-color: var(--n-merged-th-color);
 `,[p(`&:not(:last-child)`,{borderRight:`1px solid var(--n-merged-border-color)`})]),z(`descriptions-table-content`,[p(`&:not(:last-child)`,{borderRight:`1px solid var(--n-merged-border-color)`})])])])])]),z(`descriptions-header`,`
 font-weight: var(--n-th-font-weight);
 font-size: 18px;
 transition: color .3s var(--n-bezier);
 line-height: var(--n-line-height);
 margin-bottom: 16px;
 color: var(--n-title-text-color);
 `),z(`descriptions-table-wrapper`,`
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[z(`descriptions-table`,`
 width: 100%;
 border-collapse: separate;
 border-spacing: 0;
 box-sizing: border-box;
 `,[z(`descriptions-table-row`,`
 box-sizing: border-box;
 transition: border-color .3s var(--n-bezier);
 `,[z(`descriptions-table-header`,`
 font-weight: var(--n-th-font-weight);
 line-height: var(--n-line-height);
 display: table-cell;
 box-sizing: border-box;
 color: var(--n-th-text-color);
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `),z(`descriptions-table-content`,`
 vertical-align: top;
 line-height: var(--n-line-height);
 display: table-cell;
 box-sizing: border-box;
 color: var(--n-td-text-color);
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[E(`content`,`
 transition: color .3s var(--n-bezier);
 display: inline-block;
 color: var(--n-td-text-color);
 `)]),E(`label`,`
 font-weight: var(--n-th-font-weight);
 transition: color .3s var(--n-bezier);
 display: inline-block;
 margin-right: 14px;
 color: var(--n-th-text-color);
 `)])])])]),z(`descriptions-table-wrapper`,`
 --n-merged-th-color: var(--n-th-color);
 --n-merged-td-color: var(--n-td-color);
 --n-merged-border-color: var(--n-border-color);
 `),t(z(`descriptions-table-wrapper`,`
 --n-merged-th-color: var(--n-th-color-modal);
 --n-merged-td-color: var(--n-td-color-modal);
 --n-merged-border-color: var(--n-border-color-modal);
 `)),te(z(`descriptions-table-wrapper`,`
 --n-merged-th-color: var(--n-th-color-popover);
 --n-merged-td-color: var(--n-td-color-popover);
 --n-merged-border-color: var(--n-border-color-popover);
 `))]),qe=`DESCRIPTION_ITEM_FLAG`;function Je(e){return typeof e==`object`&&e&&!Array.isArray(e)?e.type&&e.type.DESCRIPTION_ITEM_FLAG:!1}var Ye=Object.assign(Object.assign({},_.props),{title:String,column:{type:Number,default:3},columns:Number,labelPlacement:{type:String,default:`top`},labelAlign:{type:String,default:`left`},separator:{type:String,default:`:`},size:String,bordered:Boolean,labelClass:String,labelStyle:[Object,String],contentClass:String,contentStyle:[Object,String]}),Xe=b({name:`Descriptions`,props:Ye,slots:Object,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n,mergedComponentPropsRef:r}=V(e),i=N(()=>e.size||r?.value?.Descriptions?.size||`medium`),a=_(`Descriptions`,`-descriptions`,Ke,we,e,t),o=N(()=>{let{bordered:t}=e,n=i.value,{common:{cubicBezierEaseInOut:r},self:{titleTextColor:o,thColor:s,thColorModal:c,thColorPopover:l,thTextColor:u,thFontWeight:d,tdTextColor:f,tdColor:p,tdColorModal:m,tdColorPopover:h,borderColor:g,borderColorModal:_,borderColorPopover:y,borderRadius:b,lineHeight:x,[v(`fontSize`,n)]:S,[v(t?`thPaddingBordered`:`thPadding`,n)]:C,[v(t?`tdPaddingBordered`:`tdPadding`,n)]:w}}=a.value;return{"--n-title-text-color":o,"--n-th-padding":C,"--n-td-padding":w,"--n-font-size":S,"--n-bezier":r,"--n-th-font-weight":d,"--n-line-height":x,"--n-th-text-color":u,"--n-td-text-color":f,"--n-th-color":s,"--n-th-color-modal":c,"--n-th-color-popover":l,"--n-td-color":p,"--n-td-color-modal":m,"--n-td-color-popover":h,"--n-border-radius":b,"--n-border-color":g,"--n-border-color-modal":_,"--n-border-color-popover":y}}),s=n?I(`descriptions`,N(()=>{let t=``,{bordered:n}=e;return n&&(t+=`a`),t+=i.value[0],t}),o,e):void 0;return{mergedClsPrefix:t,cssVars:n?void 0:o,themeClass:s?.themeClass,onRender:s?.onRender,compitableColumn:ce(e,[`columns`,`column`]),inlineThemeDisabled:n,mergedSize:i}},render(){let e=this.$slots.default,t=e?he(e()):[];t.length;let{contentClass:n,labelClass:r,compitableColumn:i,labelPlacement:a,labelAlign:o,mergedSize:s,bordered:l,title:u,cssVars:d,mergedClsPrefix:f,separator:p,onRender:m}=this;m?.();let h=t.filter(e=>Je(e)),g=h.reduce((e,t,o)=>{let s=t.props||{},c=h.length-1===o,u=[`label`in s?s.label:Oe(t,`label`)],d=[Oe(t)],m=s.span||1,g=e.span;e.span+=m;let _=s.labelStyle||s[`label-style`]||this.labelStyle,v=s.contentStyle||s[`content-style`]||this.contentStyle;if(a===`left`)l?e.row.push(U(`th`,{class:[`${f}-descriptions-table-header`,r],colspan:1,style:_},u),U(`td`,{class:[`${f}-descriptions-table-content`,n],colspan:c?(i-g)*2+1:m*2-1,style:v},d)):e.row.push(U(`td`,{class:`${f}-descriptions-table-content`,colspan:c?(i-g)*2:m*2},U(`span`,{class:[`${f}-descriptions-table-content__label`,r],style:_},[...u,p&&U(`span`,{class:`${f}-descriptions-separator`},p)]),U(`span`,{class:[`${f}-descriptions-table-content__content`,n],style:v},d)));else{let t=c?(i-g)*2:m*2;e.row.push(U(`th`,{class:[`${f}-descriptions-table-header`,r],colspan:t,style:_},u)),e.secondRow.push(U(`td`,{class:[`${f}-descriptions-table-content`,n],colspan:t,style:v},d))}return(e.span>=i||c)&&(e.span=0,e.row.length&&(e.rows.push(e.row),e.row=[]),a!==`left`&&e.secondRow.length&&(e.rows.push(e.secondRow),e.secondRow=[])),e},{span:0,row:[],secondRow:[],rows:[]}).rows.map(e=>U(`tr`,{class:`${f}-descriptions-table-row`},e));return U(`div`,{style:d,class:[`${f}-descriptions`,this.themeClass,`${f}-descriptions--${a}-label-placement`,`${f}-descriptions--${o}-label-align`,`${f}-descriptions--${s}-size`,l&&`${f}-descriptions--bordered`]},u||this.$slots.header?U(`div`,{class:`${f}-descriptions-header`},u||be(this,`header`)):null,U(`div`,{class:`${f}-descriptions-table-wrapper`},U(`table`,{class:`${f}-descriptions-table`},U(`tbody`,null,a===`top`&&U(`tr`,{class:`${f}-descriptions-table-row`,style:{visibility:`collapse`}},c(i*2,U(`td`,null))),g))))}}),Ze={label:String,span:{type:Number,default:1},labelClass:String,labelStyle:[Object,String],contentClass:String,contentStyle:[Object,String]},$=b({name:`DescriptionsItem`,[qe]:!0,props:Ze,slots:Object,render(){return null}}),Qe=P(`n-tabs`),$e={tab:[String,Number,Object,Function],name:{type:[String,Number],required:!0},disabled:Boolean,displayDirective:{type:String,default:`if`},closable:{type:Boolean,default:void 0},tabProps:Object,label:[String,Number,Object,Function]},et=b({__TAB_PANE__:!0,name:`TabPane`,alias:[`TabPanel`],props:$e,slots:Object,setup(e){let t=x(Qe,null);return t||oe(`tab-pane`,"`n-tab-pane` must be placed inside `n-tabs`."),{style:t.paneStyleRef,class:t.paneClassRef,mergedClsPrefix:t.mergedClsPrefixRef}},render(){return U(`div`,{class:[`${this.mergedClsPrefix}-tab-pane`,this.class],style:this.style},this.$slots)}}),tt=Object.assign({internalLeftPadded:Boolean,internalAddable:Boolean,internalCreatedByPane:Boolean},ve($e,[`displayDirective`])),nt=b({__TAB__:!0,inheritAttrs:!1,name:`Tab`,props:tt,setup(e){let{mergedClsPrefixRef:t,valueRef:n,typeRef:r,closableRef:i,tabStyleRef:a,addTabStyleRef:o,tabClassRef:s,addTabClassRef:c,tabChangeIdRef:l,onBeforeLeaveRef:u,triggerRef:d,handleAdd:f,activateTab:p,handleClose:m}=x(Qe);return{trigger:d,mergedClosable:N(()=>{if(e.internalAddable)return!1;let{closable:t}=e;return t===void 0?i.value:t}),style:a,addStyle:o,tabClass:s,addTabClass:c,clsPrefix:t,value:n,type:r,handleClose(t){t.stopPropagation(),!e.disabled&&m(e.name)},activateTab(){if(e.disabled)return;if(e.internalAddable){f();return}let{name:t}=e,r=++l.id;if(t!==n.value){let{value:i}=u;i?Promise.resolve(i(e.name,n.value)).then(e=>{e&&l.id===r&&p(t)}):p(t)}}}},render(){let{internalAddable:e,clsPrefix:t,name:n,disabled:r,label:o,tab:s,value:c,mergedClosable:l,trigger:u,$slots:{default:d}}=this,f=o??s;return U(`div`,{class:`${t}-tabs-tab-wrapper`},this.internalLeftPadded?U(`div`,{class:`${t}-tabs-tab-pad`}):null,U(`div`,Object.assign({key:n,"data-name":n,"data-disabled":r?!0:void 0},a({class:[`${t}-tabs-tab`,c===n&&`${t}-tabs-tab--active`,r&&`${t}-tabs-tab--disabled`,l&&`${t}-tabs-tab--closable`,e&&`${t}-tabs-tab--addable`,e?this.addTabClass:this.tabClass],onClick:u===`click`?this.activateTab:void 0,onMouseenter:u===`hover`?this.activateTab:void 0,style:e?this.addStyle:this.style},this.internalCreatedByPane?this.tabProps||{}:this.$attrs)),U(`span`,{class:`${t}-tabs-tab__label`},e?U(j,null,U(`div`,{class:`${t}-tabs-tab__height-placeholder`},`\xA0`),U(i,{clsPrefix:t},{default:()=>U(xe,null)})):d?d():typeof f==`object`?f:ye(f??n)),l&&this.type===`card`?U(y,{clsPrefix:t,class:`${t}-tabs-tab__close`,onClick:this.handleClose,disabled:r}):null))}}),rt=z(`tabs`,`
 box-sizing: border-box;
 width: 100%;
 display: flex;
 flex-direction: column;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
`,[T(`segment-type`,[z(`tabs-rail`,[p(`&.transition-disabled`,[z(`tabs-capsule`,`
 transition: none;
 `)])])]),T(`top`,[z(`tab-pane`,`
 padding: var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left);
 `)]),T(`left`,[z(`tab-pane`,`
 padding: var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left) var(--n-pane-padding-top);
 `)]),T(`left, right`,`
 flex-direction: row;
 `,[z(`tabs-bar`,`
 width: 2px;
 right: 0;
 transition:
 top .2s var(--n-bezier),
 max-height .2s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `),z(`tabs-tab`,`
 padding: var(--n-tab-padding-vertical); 
 `)]),T(`right`,`
 flex-direction: row-reverse;
 `,[z(`tab-pane`,`
 padding: var(--n-pane-padding-left) var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom);
 `),z(`tabs-bar`,`
 left: 0;
 `)]),T(`bottom`,`
 flex-direction: column-reverse;
 justify-content: flex-end;
 `,[z(`tab-pane`,`
 padding: var(--n-pane-padding-bottom) var(--n-pane-padding-right) var(--n-pane-padding-top) var(--n-pane-padding-left);
 `),z(`tabs-bar`,`
 top: 0;
 `)]),z(`tabs-rail`,`
 position: relative;
 padding: 3px;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 background-color: var(--n-color-segment);
 transition: background-color .3s var(--n-bezier);
 display: flex;
 align-items: center;
 `,[z(`tabs-capsule`,`
 border-radius: var(--n-tab-border-radius);
 position: absolute;
 pointer-events: none;
 background-color: var(--n-tab-color-segment);
 box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .08);
 transition: transform 0.3s var(--n-bezier);
 `),z(`tabs-tab-wrapper`,`
 flex-basis: 0;
 flex-grow: 1;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[z(`tabs-tab`,`
 overflow: hidden;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[T(`active`,`
 font-weight: var(--n-font-weight-strong);
 color: var(--n-tab-text-color-active);
 `),p(`&:hover`,`
 color: var(--n-tab-text-color-hover);
 `)])])]),T(`flex`,[z(`tabs-nav`,`
 width: 100%;
 position: relative;
 `,[z(`tabs-wrapper`,`
 width: 100%;
 `,[z(`tabs-tab`,`
 margin-right: 0;
 `)])])]),z(`tabs-nav`,`
 box-sizing: border-box;
 line-height: 1.5;
 display: flex;
 transition: border-color .3s var(--n-bezier);
 `,[E(`prefix, suffix`,`
 display: flex;
 align-items: center;
 `),E(`prefix`,`padding-right: 16px;`),E(`suffix`,`padding-left: 16px;`)]),T(`top, bottom`,[p(`>`,[z(`tabs-nav`,[z(`tabs-nav-scroll-wrapper`,[p(`&::before`,`
 top: 0;
 bottom: 0;
 left: 0;
 width: 20px;
 `),p(`&::after`,`
 top: 0;
 bottom: 0;
 right: 0;
 width: 20px;
 `),T(`shadow-start`,[p(`&::before`,`
 box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, .12);
 `)]),T(`shadow-end`,[p(`&::after`,`
 box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),T(`left, right`,[z(`tabs-nav-scroll-content`,`
 flex-direction: column;
 `),p(`>`,[z(`tabs-nav`,[z(`tabs-nav-scroll-wrapper`,[p(`&::before`,`
 top: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),p(`&::after`,`
 bottom: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),T(`shadow-start`,[p(`&::before`,`
 box-shadow: inset 0 10px 8px -8px rgba(0, 0, 0, .12);
 `)]),T(`shadow-end`,[p(`&::after`,`
 box-shadow: inset 0 -10px 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),z(`tabs-nav-scroll-wrapper`,`
 flex: 1;
 position: relative;
 overflow: hidden;
 `,[z(`tabs-nav-y-scroll`,`
 height: 100%;
 width: 100%;
 overflow-y: auto; 
 scrollbar-width: none;
 `,[p(`&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb`,`
 width: 0;
 height: 0;
 display: none;
 `)]),p(`&::before, &::after`,`
 transition: box-shadow .3s var(--n-bezier);
 pointer-events: none;
 content: "";
 position: absolute;
 z-index: 1;
 `)]),z(`tabs-nav-scroll-content`,`
 display: flex;
 position: relative;
 min-width: 100%;
 min-height: 100%;
 width: fit-content;
 box-sizing: border-box;
 `),z(`tabs-wrapper`,`
 display: inline-flex;
 flex-wrap: nowrap;
 position: relative;
 `),z(`tabs-tab-wrapper`,`
 display: flex;
 flex-wrap: nowrap;
 flex-shrink: 0;
 flex-grow: 0;
 `),z(`tabs-tab`,`
 cursor: pointer;
 white-space: nowrap;
 flex-wrap: nowrap;
 display: inline-flex;
 align-items: center;
 color: var(--n-tab-text-color);
 font-size: var(--n-tab-font-size);
 background-clip: padding-box;
 padding: var(--n-tab-padding);
 transition:
 box-shadow .3s var(--n-bezier),
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[T(`disabled`,{cursor:`not-allowed`}),E(`close`,`
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),E(`label`,`
 display: flex;
 align-items: center;
 z-index: 1;
 `)]),z(`tabs-bar`,`
 position: absolute;
 bottom: 0;
 height: 2px;
 border-radius: 1px;
 background-color: var(--n-bar-color);
 transition:
 left .2s var(--n-bezier),
 max-width .2s var(--n-bezier),
 opacity .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `,[p(`&.transition-disabled`,`
 transition: none;
 `),T(`disabled`,`
 background-color: var(--n-tab-text-color-disabled)
 `)]),z(`tabs-pane-wrapper`,`
 position: relative;
 overflow: hidden;
 transition: max-height .2s var(--n-bezier);
 `),z(`tab-pane`,`
 color: var(--n-pane-text-color);
 width: 100%;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 opacity .2s var(--n-bezier);
 left: 0;
 right: 0;
 top: 0;
 `,[p(`&.next-transition-leave-active, &.prev-transition-leave-active, &.next-transition-enter-active, &.prev-transition-enter-active`,`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 transform .2s var(--n-bezier),
 opacity .2s var(--n-bezier);
 `),p(`&.next-transition-leave-active, &.prev-transition-leave-active`,`
 position: absolute;
 `),p(`&.next-transition-enter-from, &.prev-transition-leave-to`,`
 transform: translateX(32px);
 opacity: 0;
 `),p(`&.next-transition-leave-to, &.prev-transition-enter-from`,`
 transform: translateX(-32px);
 opacity: 0;
 `),p(`&.next-transition-leave-from, &.next-transition-enter-to, &.prev-transition-leave-from, &.prev-transition-enter-to`,`
 transform: translateX(0);
 opacity: 1;
 `)]),z(`tabs-tab-pad`,`
 box-sizing: border-box;
 width: var(--n-tab-gap);
 flex-grow: 0;
 flex-shrink: 0;
 `),T(`line-type, bar-type`,[z(`tabs-tab`,`
 font-weight: var(--n-tab-font-weight);
 box-sizing: border-box;
 vertical-align: bottom;
 `,[p(`&:hover`,{color:`var(--n-tab-text-color-hover)`}),T(`active`,`
 color: var(--n-tab-text-color-active);
 font-weight: var(--n-tab-font-weight-active);
 `),T(`disabled`,{color:`var(--n-tab-text-color-disabled)`})])]),z(`tabs-nav`,[T(`line-type`,[T(`top`,[E(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),z(`tabs-nav-scroll-content`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),z(`tabs-bar`,`
 bottom: -1px;
 `)]),T(`left`,[E(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),z(`tabs-nav-scroll-content`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),z(`tabs-bar`,`
 right: -1px;
 `)]),T(`right`,[E(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),z(`tabs-nav-scroll-content`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),z(`tabs-bar`,`
 left: -1px;
 `)]),T(`bottom`,[E(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),z(`tabs-nav-scroll-content`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),z(`tabs-bar`,`
 top: -1px;
 `)]),E(`prefix, suffix`,`
 transition: border-color .3s var(--n-bezier);
 `),z(`tabs-nav-scroll-content`,`
 transition: border-color .3s var(--n-bezier);
 `),z(`tabs-bar`,`
 border-radius: 0;
 `)]),T(`card-type`,[E(`prefix, suffix`,`
 transition: border-color .3s var(--n-bezier);
 `),z(`tabs-pad`,`
 flex-grow: 1;
 transition: border-color .3s var(--n-bezier);
 `),z(`tabs-tab-pad`,`
 transition: border-color .3s var(--n-bezier);
 `),z(`tabs-tab`,`
 font-weight: var(--n-tab-font-weight);
 border: 1px solid var(--n-tab-border-color);
 background-color: var(--n-tab-color);
 box-sizing: border-box;
 position: relative;
 vertical-align: bottom;
 display: flex;
 justify-content: space-between;
 font-size: var(--n-tab-font-size);
 color: var(--n-tab-text-color);
 `,[T(`addable`,`
 padding-left: 8px;
 padding-right: 8px;
 font-size: 16px;
 justify-content: center;
 `,[E(`height-placeholder`,`
 width: 0;
 font-size: var(--n-tab-font-size);
 `),O(`disabled`,[p(`&:hover`,`
 color: var(--n-tab-text-color-hover);
 `)])]),T(`closable`,`padding-right: 8px;`),T(`active`,`
 background-color: #0000;
 font-weight: var(--n-tab-font-weight-active);
 color: var(--n-tab-text-color-active);
 `),T(`disabled`,`color: var(--n-tab-text-color-disabled);`)])]),T(`left, right`,`
 flex-direction: column; 
 `,[E(`prefix, suffix`,`
 padding: var(--n-tab-padding-vertical);
 `),z(`tabs-wrapper`,`
 flex-direction: column;
 `),z(`tabs-tab-wrapper`,`
 flex-direction: column;
 `,[z(`tabs-tab-pad`,`
 height: var(--n-tab-gap-vertical);
 width: 100%;
 `)])]),T(`top`,[T(`card-type`,[z(`tabs-scroll-padding`,`border-bottom: 1px solid var(--n-tab-border-color);`),E(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),z(`tabs-tab`,`
 border-top-left-radius: var(--n-tab-border-radius);
 border-top-right-radius: var(--n-tab-border-radius);
 `,[T(`active`,`
 border-bottom: 1px solid #0000;
 `)]),z(`tabs-tab-pad`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),z(`tabs-pad`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `)])]),T(`left`,[T(`card-type`,[z(`tabs-scroll-padding`,`border-right: 1px solid var(--n-tab-border-color);`),E(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),z(`tabs-tab`,`
 border-top-left-radius: var(--n-tab-border-radius);
 border-bottom-left-radius: var(--n-tab-border-radius);
 `,[T(`active`,`
 border-right: 1px solid #0000;
 `)]),z(`tabs-tab-pad`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),z(`tabs-pad`,`
 border-right: 1px solid var(--n-tab-border-color);
 `)])]),T(`right`,[T(`card-type`,[z(`tabs-scroll-padding`,`border-left: 1px solid var(--n-tab-border-color);`),E(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),z(`tabs-tab`,`
 border-top-right-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[T(`active`,`
 border-left: 1px solid #0000;
 `)]),z(`tabs-tab-pad`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),z(`tabs-pad`,`
 border-left: 1px solid var(--n-tab-border-color);
 `)])]),T(`bottom`,[T(`card-type`,[z(`tabs-scroll-padding`,`border-top: 1px solid var(--n-tab-border-color);`),E(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),z(`tabs-tab`,`
 border-bottom-left-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[T(`active`,`
 border-top: 1px solid #0000;
 `)]),z(`tabs-tab-pad`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),z(`tabs-pad`,`
 border-top: 1px solid var(--n-tab-border-color);
 `)])])])]),it=Ge,at=Object.assign(Object.assign({},_.props),{value:[String,Number],defaultValue:[String,Number],trigger:{type:String,default:`click`},type:{type:String,default:`bar`},closable:Boolean,justifyContent:String,size:String,placement:{type:String,default:`top`},tabStyle:[String,Object],tabClass:String,addTabStyle:[String,Object],addTabClass:String,barWidth:Number,paneClass:String,paneStyle:[String,Object],paneWrapperClass:String,paneWrapperStyle:[String,Object],addable:[Boolean,Object],tabsPadding:{type:Number,default:0},animated:Boolean,onBeforeLeave:Function,onAdd:Function,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onClose:[Function,Array],labelSize:String,activeName:[String,Number],onActiveNameChange:[Function,Array]}),ot=b({name:`Tabs`,props:at,slots:Object,setup(e,{slots:t}){let{mergedClsPrefixRef:i,inlineThemeDisabled:a,mergedComponentPropsRef:o}=V(e),s=_(`Tabs`,`-tabs`,rt,Ce,e,i),c=f(null),p=f(null),m=f(null),g=f(null),y=f(null),b=f(null),x=f(!0),S=f(!0),w=ce(e,[`labelSize`,`size`]),T=N(()=>w.value?w.value:o?.value?.Tabs?.size||`medium`),E=ce(e,[`activeName`,`value`]),O=f(E.value??e.defaultValue??(t.default?he(t.default())[0]?.props?.name:null)),k=ge(E,O),ee={id:0},A=N(()=>{if(!(!e.justifyContent||e.type===`card`))return{display:`flex`,justifyContent:e.justifyContent}});C(k,()=>{ee.id=0,F(),ne()});function j(){let{value:e}=k;return e===null?null:c.value?.querySelector(`[data-name="${e}"]`)}function te(t){if(e.type===`card`)return;let{value:n}=p;if(!n)return;let r=n.style.opacity===`0`;if(t){let a=`${i.value}-tabs-bar--disabled`,{barWidth:o,placement:s}=e;if(t.dataset.disabled===`true`?n.classList.add(a):n.classList.remove(a),[`top`,`bottom`].includes(s)){if(P([`top`,`maxHeight`,`height`]),typeof o==`number`&&t.offsetWidth>=o){let e=Math.floor((t.offsetWidth-o)/2)+t.offsetLeft;n.style.left=`${e}px`,n.style.maxWidth=`${o}px`}else n.style.left=`${t.offsetLeft}px`,n.style.maxWidth=`${t.offsetWidth}px`;n.style.width=`8192px`,r&&(n.style.transition=`none`),n.offsetWidth,r&&(n.style.transition=``,n.style.opacity=`1`)}else{if(P([`left`,`maxWidth`,`width`]),typeof o==`number`&&t.offsetHeight>=o){let e=Math.floor((t.offsetHeight-o)/2)+t.offsetTop;n.style.top=`${e}px`,n.style.maxHeight=`${o}px`}else n.style.top=`${t.offsetTop}px`,n.style.maxHeight=`${t.offsetHeight}px`;n.style.height=`8192px`,r&&(n.style.transition=`none`),n.offsetHeight,r&&(n.style.transition=``,n.style.opacity=`1`)}}}function M(){if(e.type===`card`)return;let{value:t}=p;t&&(t.style.opacity=`0`)}function P(e){let{value:t}=p;if(t)for(let n of e)t.style[n]=``}function F(){if(e.type===`card`)return;let t=j();t?te(t):M()}function ne(){let e=y.value?.$el;if(!e)return;let t=j();if(!t)return;let{scrollLeft:n,offsetWidth:r}=e,{offsetLeft:i,offsetWidth:a}=t;n>i?e.scrollTo({top:0,left:i,behavior:`smooth`}):i+a>n+r&&e.scrollTo({top:0,left:i+a-r,behavior:`smooth`})}let L=f(null),re=0,R=null;function z(e){let t=L.value;if(t){re=e.getBoundingClientRect().height;let n=`${re}px`,r=()=>{t.style.height=n,t.style.maxHeight=n};R?(r(),R(),R=null):R=r}}function B(e){let t=L.value;if(t){let n=e.getBoundingClientRect().height,r=()=>{document.body.offsetHeight,t.style.maxHeight=`${n}px`,t.style.height=`${Math.max(re,n)}px`};R?(R(),R=null,r()):R=r}}function ie(){let t=L.value;if(t){t.style.maxHeight=``,t.style.height=``;let{paneWrapperStyle:n}=e;if(typeof n==`string`)t.style.cssText=n;else if(n){let{maxHeight:e,height:r}=n;e!==void 0&&(t.style.maxHeight=e),r!==void 0&&(t.style.height=r)}}}let H={value:[]},U=f(`next`);function ae(e){let t=k.value,n=`next`;for(let r of H.value){if(r===t)break;if(r===e){n=`prev`;break}}U.value=n,W(e)}function W(t){let{onActiveNameChange:n,onUpdateValue:r,"onUpdate:value":i}=e;n&&G(n,t),r&&G(r,t),i&&G(i,t),O.value=t}function oe(t){let{onClose:n}=e;n&&G(n,t)}let se=!0;function le(){let{value:e}=p;if(!e)return;se||=!1;let t=`transition-disabled`;e.classList.add(t),F(),e.classList.remove(t)}let K=f(null);function ue({transitionDisabled:e}){let t=c.value;if(!t)return;e&&t.classList.add(`transition-disabled`);let r=j();r&&K.value&&(K.value.style.width=`${r.offsetWidth}px`,K.value.style.height=`${r.offsetHeight}px`,K.value.style.transform=`translateX(${r.offsetLeft-n(getComputedStyle(t).paddingLeft)}px)`,e&&K.value.offsetWidth),e&&t.classList.remove(`transition-disabled`)}C([k],()=>{e.type===`segment`&&r(()=>{ue({transitionDisabled:!1})})}),h(()=>{e.type===`segment`&&ue({transitionDisabled:!0})});let de=0;function pe(t){if(t.contentRect.width===0&&t.contentRect.height===0||de===t.contentRect.width)return;de=t.contentRect.width;let{type:n}=e;if((n===`line`||n===`bar`)&&(se||e.justifyContent?.startsWith(`space`))&&le(),n!==`segment`){let{placement:t}=e;ve((t===`top`||t===`bottom`?y.value?.$el:b.value)||null)}}let q=it(pe,64);C([()=>e.justifyContent,()=>e.size],()=>{r(()=>{let{type:t}=e;(t===`line`||t===`bar`)&&le()})});let J=f(!1);function me(t){let{target:n,contentRect:{width:r,height:i}}=t,a=n.parentElement.parentElement.offsetWidth,o=n.parentElement.parentElement.offsetHeight,{placement:s}=e;if(!J.value)s===`top`||s===`bottom`?a<r&&(J.value=!0):o<i&&(J.value=!0);else{let{value:e}=g;if(!e)return;s===`top`||s===`bottom`?a-r>e.$el.offsetWidth&&(J.value=!1):o-i>e.$el.offsetHeight&&(J.value=!1)}ve(y.value?.$el||null)}let Y=it(me,64);function _e(){let{onAdd:t}=e;t&&t(),r(()=>{let e=j(),{value:t}=y;!e||!t||t.scrollTo({left:e.offsetLeft,top:0,behavior:`smooth`})})}function ve(t){if(!t)return;let{placement:n}=e;if(n===`top`||n===`bottom`){let{scrollLeft:e,scrollWidth:n,offsetWidth:r}=t;x.value=e<=0,S.value=e+r>=n}else{let{scrollTop:e,scrollHeight:n,offsetHeight:r}=t;x.value=e<=0,S.value=e+r>=n}}let ye=it(e=>{ve(e.target)},64);d(Qe,{triggerRef:D(e,`trigger`),tabStyleRef:D(e,`tabStyle`),tabClassRef:D(e,`tabClass`),addTabStyleRef:D(e,`addTabStyle`),addTabClassRef:D(e,`addTabClass`),paneClassRef:D(e,`paneClass`),paneStyleRef:D(e,`paneStyle`),mergedClsPrefixRef:i,typeRef:D(e,`type`),closableRef:D(e,`closable`),valueRef:k,tabChangeIdRef:ee,onBeforeLeaveRef:D(e,`onBeforeLeave`),activateTab:ae,handleClose:oe,handleAdd:_e}),fe(()=>{F(),ne()}),l(()=>{let{value:e}=m;if(!e)return;let{value:t}=i,n=`${t}-tabs-nav-scroll-wrapper--shadow-start`,r=`${t}-tabs-nav-scroll-wrapper--shadow-end`;x.value?e.classList.remove(n):e.classList.add(n),S.value?e.classList.remove(r):e.classList.add(r)});let be={syncBarPosition:()=>{F()}},xe=()=>{ue({transitionDisabled:!0})},X=N(()=>{let{value:t}=T,{type:n}=e,r=`${t}${{card:`Card`,bar:`Bar`,line:`Line`,segment:`Segment`}[n]}`,{self:{barColor:i,closeIconColor:a,closeIconColorHover:o,closeIconColorPressed:c,tabColor:l,tabBorderColor:d,paneTextColor:f,tabFontWeight:p,tabBorderRadius:m,tabFontWeightActive:h,colorSegment:g,fontWeightStrong:_,tabColorSegment:y,closeSize:b,closeIconSize:x,closeColorHover:S,closeColorPressed:C,closeBorderRadius:w,[v(`panePadding`,t)]:E,[v(`tabPadding`,r)]:D,[v(`tabPaddingVertical`,r)]:O,[v(`tabGap`,r)]:k,[v(`tabGap`,`${r}Vertical`)]:ee,[v(`tabTextColor`,n)]:A,[v(`tabTextColorActive`,n)]:j,[v(`tabTextColorHover`,n)]:te,[v(`tabTextColorDisabled`,n)]:M,[v(`tabFontSize`,t)]:N},common:{cubicBezierEaseInOut:P}}=s.value;return{"--n-bezier":P,"--n-color-segment":g,"--n-bar-color":i,"--n-tab-font-size":N,"--n-tab-text-color":A,"--n-tab-text-color-active":j,"--n-tab-text-color-disabled":M,"--n-tab-text-color-hover":te,"--n-pane-text-color":f,"--n-tab-border-color":d,"--n-tab-border-radius":m,"--n-close-size":b,"--n-close-icon-size":x,"--n-close-color-hover":S,"--n-close-color-pressed":C,"--n-close-border-radius":w,"--n-close-icon-color":a,"--n-close-icon-color-hover":o,"--n-close-icon-color-pressed":c,"--n-tab-color":l,"--n-tab-font-weight":p,"--n-tab-font-weight-active":h,"--n-tab-padding":D,"--n-tab-padding-vertical":O,"--n-tab-gap":k,"--n-tab-gap-vertical":ee,"--n-pane-padding-left":u(E,`left`),"--n-pane-padding-right":u(E,`right`),"--n-pane-padding-top":u(E,`top`),"--n-pane-padding-bottom":u(E,`bottom`),"--n-font-weight-strong":_,"--n-tab-color-segment":y}}),Se=a?I(`tabs`,N(()=>`${T.value[0]}${e.type[0]}`),X,e):void 0;return Object.assign({mergedClsPrefix:i,mergedValue:k,renderedNames:new Set,segmentCapsuleElRef:K,tabsPaneWrapperRef:L,tabsElRef:c,barElRef:p,addTabInstRef:g,xScrollInstRef:y,scrollWrapperElRef:m,addTabFixed:J,tabWrapperStyle:A,handleNavResize:q,mergedSize:T,handleScroll:ye,handleTabsResize:Y,cssVars:a?void 0:X,themeClass:Se?.themeClass,animationDirection:U,renderNameListRef:H,yScrollElRef:b,handleSegmentResize:xe,onAnimationBeforeLeave:z,onAnimationEnter:B,onAnimationAfterEnter:ie,onRender:Se?.onRender},be)},render(){let{mergedClsPrefix:e,type:t,placement:n,addTabFixed:r,addable:i,mergedSize:a,renderNameListRef:o,onRender:s,paneWrapperClass:c,paneWrapperStyle:l,$slots:{default:u,prefix:d,suffix:f}}=this;s?.();let p=u?he(u()).filter(e=>e.type.__TAB_PANE__===!0):[],m=u?he(u()).filter(e=>e.type.__TAB__===!0):[],h=!m.length,g=t===`card`,_=t===`segment`,v=!g&&!_&&this.justifyContent;o.value=[];let y=()=>{let t=U(`div`,{style:this.tabWrapperStyle,class:`${e}-tabs-wrapper`},v?null:U(`div`,{class:`${e}-tabs-scroll-padding`,style:n===`top`||n===`bottom`?{width:`${this.tabsPadding}px`}:{height:`${this.tabsPadding}px`}}),h?p.map((e,t)=>(o.value.push(e.props.name),ut(U(nt,Object.assign({},e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0&&(!v||v===`center`||v===`start`||v===`end`)}),e.children?{default:e.children.tab}:void 0)))):m.map((e,t)=>(o.value.push(e.props.name),ut(t!==0&&!v?lt(e):e))),!r&&i&&g?ct(i,(h?p.length:m.length)!==0):null,v?null:U(`div`,{class:`${e}-tabs-scroll-padding`,style:{width:`${this.tabsPadding}px`}}));return U(`div`,{ref:`tabsElRef`,class:`${e}-tabs-nav-scroll-content`},g&&i?U(ae,{onResize:this.handleTabsResize},{default:()=>t}):t,g?U(`div`,{class:`${e}-tabs-pad`}):null,g?null:U(`div`,{ref:`barElRef`,class:`${e}-tabs-bar`}))},b=_?`top`:n;return U(`div`,{class:[`${e}-tabs`,this.themeClass,`${e}-tabs--${t}-type`,`${e}-tabs--${a}-size`,v&&`${e}-tabs--flex`,`${e}-tabs--${b}`],style:this.cssVars},U(`div`,{class:[`${e}-tabs-nav--${t}-type`,`${e}-tabs-nav--${b}`,`${e}-tabs-nav`]},H(d,t=>t&&U(`div`,{class:`${e}-tabs-nav__prefix`},t)),_?U(ae,{onResize:this.handleSegmentResize},{default:()=>U(`div`,{class:`${e}-tabs-rail`,ref:`tabsElRef`},U(`div`,{class:`${e}-tabs-capsule`,ref:`segmentCapsuleElRef`},U(`div`,{class:`${e}-tabs-wrapper`},U(`div`,{class:`${e}-tabs-tab`}))),h?p.map((e,t)=>(o.value.push(e.props.name),U(nt,Object.assign({},e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0}),e.children?{default:e.children.tab}:void 0))):m.map((e,t)=>(o.value.push(e.props.name),t===0?e:lt(e))))}):U(ae,{onResize:this.handleNavResize},{default:()=>U(`div`,{class:`${e}-tabs-nav-scroll-wrapper`,ref:`scrollWrapperElRef`},[`top`,`bottom`].includes(b)?U(De,{ref:`xScrollInstRef`,onScroll:this.handleScroll},{default:y}):U(`div`,{class:`${e}-tabs-nav-y-scroll`,onScroll:this.handleScroll,ref:`yScrollElRef`},y()))}),r&&i&&g?ct(i,!0):null,H(f,t=>t&&U(`div`,{class:`${e}-tabs-nav__suffix`},t))),h&&(this.animated&&(b===`top`||b===`bottom`)?U(`div`,{ref:`tabsPaneWrapperRef`,style:l,class:[`${e}-tabs-pane-wrapper`,c]},st(p,this.mergedValue,this.renderedNames,this.onAnimationBeforeLeave,this.onAnimationEnter,this.onAnimationAfterEnter,this.animationDirection)):st(p,this.mergedValue,this.renderedNames)))}});function st(e,t,n,r,i,a,o){let s=[];return e.forEach(e=>{let{name:r,displayDirective:i,"display-directive":a}=e.props,o=e=>i===e||a===e,c=t===r;if(e.key!==void 0&&(e.key=r),c||o(`show`)||o(`show:lazy`)&&n.has(r)){n.has(r)||n.add(r);let t=!o(`if`);s.push(t?w(e,[[ie,c]]):e)}}),o?U(ee,{name:`${o}-transition`,onBeforeLeave:r,onEnter:i,onAfterEnter:a},{default:()=>s}):s}function ct(e,t){return U(nt,{ref:`addTabInstRef`,key:`__addable`,name:`__addable`,internalCreatedByPane:!0,internalAddable:!0,internalLeftPadded:t,disabled:typeof e==`object`&&e.disabled})}function lt(e){let t=ne(e);return t.props?t.props.internalLeftPadded=!0:t.props={internalLeftPadded:!0},t}function ut(e){return Array.isArray(e.dynamicProps)?e.dynamicProps.includes(`internalLeftPadded`)||e.dynamicProps.push(`internalLeftPadded`):e.dynamicProps=[`internalLeftPadded`],e}var dt={key:1,class:`tab-loading`},ft=_e(b({__name:`DockerView`,setup(e){let t=Se();function n(e){return e instanceof L&&e.status===503&&!!e.body&&typeof e.body==`object`&&`enabled`in e.body}function r(e,n){t.error(e instanceof L?e.message:n)}let i=e=>e===`running`?`success`:e===`paused`||e===`restarting`?`warning`:e===`dead`?`error`:`default`,a=f([]),o=f(!0),c=f(null),l;async function u(){try{let e=await Z.containers();a.value=e.containers,c.value=null}catch(e){n(e)&&(c.value=e.body)}finally{o.value=!1}}async function d(e,t){try{let n=await Z.containerAction(e,t);a.value=n.containers}catch(e){r(e,`Aksi ${t} gagal`)}}let p=[{title:`Nama`,key:`name`,width:160,ellipsis:{tooltip:!0}},{title:`Image`,key:`image`,width:180,ellipsis:{tooltip:!0}},{title:`Status`,key:`state`,width:130,render:e=>U(pe,{type:i(e.state),size:`small`},{default:()=>e.status})},{title:`CPU`,key:`cpu`,width:70,render:e=>e.hasStats?`${e.stats.cpuPercent.toFixed(1)}%`:`—`},{title:`RAM`,key:`ram`,width:150,render:e=>e.hasStats?`${Q(e.stats.memUsageBytes)} / ${Q(e.stats.memLimitBytes)}`:`—`},{title:`Network`,key:`net`,width:140,render:e=>e.hasStats?`↓ ${Q(e.stats.netRxBytes)} ↑ ${Q(e.stats.netTxBytes)}`:`—`},{title:`Ports`,key:`ports`,width:220,ellipsis:{tooltip:!0}},{title:`Aksi`,key:`actions`,width:220,render:e=>U(q,{size:`small`},()=>[e.state===`running`?[U(F,{size:`tiny`,onClick:()=>d(e.id,`stop`)},()=>`Stop`),U(F,{size:`tiny`,onClick:()=>d(e.id,`restart`)},()=>`Restart`)]:U(F,{size:`tiny`,type:`primary`,onClick:()=>d(e.id,`start`)},()=>`Start`),U(Y,{onPositiveClick:()=>d(e.id,`remove`)},{trigger:()=>U(F,{size:`tiny`,type:`error`,ghost:!0},()=>`Hapus`),default:()=>`Hapus container "${e.name}"?`})])}],_=f([]),v=f(!0),y=f(null);async function b(){v.value=!0;try{let e=await Z.images();_.value=e.images,y.value=null}catch(e){n(e)&&(y.value=e.body)}finally{v.value=!1}}async function x(e){try{let t=await Z.removeImage(e);_.value=t.images}catch(e){r(e,`Hapus image gagal (mungkin masih dipakai container)`)}}let w=[{title:`Tag`,key:`tag`,minWidth:200,ellipsis:{tooltip:!0},render:e=>e.dangling?U(q,{size:`small`,align:`center`},()=>[e.tag,U(pe,{size:`small`,type:`warning`},()=>`dangling`)]):e.tag},{title:`Ukuran`,key:`sizeBytes`,width:110,render:e=>Q(e.sizeBytes)},{title:`Dipakai`,key:`containers`,width:140,render:e=>e.containers<0?`—`:e.containers===0?`tidak dipakai`:`${e.containers} container`},{title:`Dibuat`,key:`created`,width:150,render:e=>Te(e.created)},{title:`Aksi`,key:`actions`,width:100,render:e=>U(Y,{onPositiveClick:()=>x(e.id)},{trigger:()=>U(F,{size:`tiny`,type:`error`,ghost:!0},()=>`Hapus`),default:()=>`Hapus image "${e.tag}"?`})}],T=f([]),E=f(!0),D=f(null);async function O(){E.value=!0;try{let e=await Z.volumes();T.value=e.volumes,D.value=null}catch(e){n(e)&&(D.value=e.body)}finally{E.value=!1}}async function ee(e){try{let t=await Z.removeVolume(e);T.value=t.volumes}catch(e){r(e,`Hapus volume gagal (mungkin masih dipakai container)`)}}let te=[{title:`Nama`,key:`name`,minWidth:180,ellipsis:{tooltip:!0}},{title:`Driver`,key:`driver`,width:100},{title:`Ukuran`,key:`sizeBytes`,width:110,render:e=>e.sizeBytes<0?`tidak diketahui`:Q(e.sizeBytes)},{title:`Status`,key:`inUse`,width:120,render:e=>U(pe,{size:`small`,type:e.inUse?`success`:`default`},()=>e.inUse?`dipakai`:`tidak dipakai`)},{title:`Aksi`,key:`actions`,width:100,render:e=>U(Y,{onPositiveClick:()=>ee(e.name)},{trigger:()=>U(F,{size:`tiny`,type:`error`,ghost:!0},()=>`Hapus`),default:()=>`Hapus volume "${e.name}"?`})}],N=f([]),P=f(!0),I=f(null);async function ne(){P.value=!0;try{let e=await Z.networks();N.value=e.networks,I.value=null}catch(e){n(e)&&(I.value=e.body)}finally{P.value=!1}}async function re(e){try{let t=await Z.removeNetwork(e);N.value=t.networks}catch(e){r(e,`Hapus network gagal (mungkin builtin atau masih dipakai)`)}}let R=[{title:`Nama`,key:`name`,minWidth:160,ellipsis:{tooltip:!0},render:e=>e.builtin?U(q,{size:`small`,align:`center`},()=>[e.name,U(pe,{size:`small`},()=>`builtin`)]):e.name},{title:`Driver`,key:`driver`,width:100},{title:`Subnet`,key:`subnet`,width:150,render:e=>e.subnet||`—`},{title:`Container Terhubung`,key:`connectedCount`,width:170},{title:`Aksi`,key:`actions`,width:100,render:e=>e.builtin?null:U(Y,{onPositiveClick:()=>re(e.id)},{trigger:()=>U(F,{size:`tiny`,type:`error`,ghost:!0},()=>`Hapus`),default:()=>`Hapus network "${e.name}"?`})}],z=f(null),ie=f(!0),V=f(null),H=f(null);async function ae(){ie.value=!0;try{z.value=await Z.settings(),V.value=null}catch(e){n(e)&&(V.value=e.body)}finally{ie.value=!1}}async function oe(e){H.value=e;try{z.value=await Z.prune(e),t.success(`Cleanup selesai`)}catch(t){r(t,`Cleanup gagal: ${e}`)}finally{H.value=null}}let G=f(`containers`),ce=new Set([`containers`]);return C(G,e=>{ce.has(e)||(ce.add(e),e===`images`?b():e===`volumes`?O():e===`networks`?ne():e===`settings`&&ae())}),h(()=>{u(),l=setInterval(u,5e3)}),g(()=>{l&&clearInterval(l)}),(e,t)=>(s(),k(ue,null,{default:S(()=>[W(M(ot),{type:`line`,value:G.value,"onUpdate:value":t[0]||=e=>G.value=e},{default:S(()=>[W(M(et),{name:`containers`,tab:`Containers`},{default:S(()=>[c.value?(s(),k(M(X),{key:0,type:`warning`,title:c.value.error},null,8,[`title`])):(s(),k(M(me),{key:1,columns:p,data:a.value,loading:o.value,"row-key":e=>e.id,"scroll-x":1200},null,8,[`data`,`loading`,`row-key`]))]),_:1}),W(M(et),{name:`images`,tab:`Images`},{default:S(()=>[y.value?(s(),k(M(X),{key:0,type:`warning`,title:y.value.error},null,8,[`title`])):(s(),k(M(me),{key:1,columns:w,data:_.value,loading:v.value,"row-key":e=>e.id,"scroll-x":700},null,8,[`data`,`loading`,`row-key`]))]),_:1}),W(M(et),{name:`volumes`,tab:`Volumes`},{default:S(()=>[D.value?(s(),k(M(X),{key:0,type:`warning`,title:D.value.error},null,8,[`title`])):(s(),k(M(me),{key:1,columns:te,data:T.value,loading:E.value,"row-key":e=>e.name,"scroll-x":610},null,8,[`data`,`loading`,`row-key`]))]),_:1}),W(M(et),{name:`networks`,tab:`Networks`},{default:S(()=>[I.value?(s(),k(M(X),{key:0,type:`warning`,title:I.value.error},null,8,[`title`])):(s(),k(M(me),{key:1,columns:R,data:N.value,loading:P.value,"row-key":e=>e.id,"scroll-x":680},null,8,[`data`,`loading`,`row-key`]))]),_:1}),W(M(et),{name:`settings`,tab:`Settings`},{default:S(()=>[V.value?(s(),k(M(X),{key:0,type:`warning`,title:V.value.error},null,8,[`title`])):ie.value&&!z.value?(s(),se(`div`,dt,[W(M(de),{size:`large`})])):z.value?(s(),k(M(q),{key:3,vertical:``,size:24},{default:S(()=>[W(M(Xe),{title:`Info Daemon`,column:2,bordered:``,"label-placement":`left`},{default:S(()=>[W(M($),{label:`Versi Server`},{default:S(()=>[A(B(z.value?.info.serverVersion),1)]),_:1}),W(M($),{label:`OS / Kernel`},{default:S(()=>[A(B(z.value?.info.operatingSystem)+` / `+B(z.value?.info.kernelVersion),1)]),_:1}),W(M($),{label:`Storage Driver`},{default:S(()=>[A(B(z.value?.info.storageDriver),1)]),_:1}),W(M($),{label:`Root Dir`},{default:S(()=>[A(B(z.value?.info.dockerRootDir),1)]),_:1}),W(M($),{label:`Container`},{default:S(()=>[A(B(z.value?.info.containersRunning)+` running, `+B(z.value?.info.containersPaused)+` paused, `+B(z.value?.info.containersStopped)+` stopped `,1)]),_:1}),W(M($),{label:`Images`},{default:S(()=>[A(B(z.value?.info.images),1)]),_:1})]),_:1}),W(M(Xe),{title:`Disk Usage`,column:2,bordered:``,"label-placement":`left`},{default:S(()=>[W(M($),{label:`Images`},{default:S(()=>[A(B(M(Q)(z.value?.diskUsage.imagesTotalBytes??0))+` (reclaimable `+B(M(Q)(z.value?.diskUsage.imagesReclaimableBytes??0))+`) `,1)]),_:1}),W(M($),{label:`Containers`},{default:S(()=>[A(B(M(Q)(z.value?.diskUsage.containersTotalBytes??0)),1)]),_:1}),W(M($),{label:`Volumes`},{default:S(()=>[A(B(M(Q)(z.value?.diskUsage.volumesTotalBytes??0))+` (reclaimable `+B(M(Q)(z.value?.diskUsage.volumesReclaimableBytes??0))+`) `,1)]),_:1})]),_:1}),W(M(q),null,{default:S(()=>[(s(),se(j,null,m([`containers`,`images`,`volumes`,`networks`,`all`],e=>W(M(Y),{key:e,onPositiveClick:t=>oe(e)},{trigger:S(()=>[W(M(F),{size:`small`,loading:H.value===e},{default:S(()=>[A(`Bersihkan `+B(e),1)]),_:2},1032,[`loading`])]),default:S(()=>[A(` Jalankan cleanup "`+B(e)+`"? Tindakan ini tidak bisa dibatalkan. `,1)]),_:2},1032,[`onPositiveClick`])),64))]),_:1})]),_:1})):(s(),k(M(J),{key:2,description:`Tidak ada data`}))]),_:1})]),_:1},8,[`value`])]),_:1}))}}),[[`__scopeId`,`data-v-c5a72694`]]);export{ft as default};