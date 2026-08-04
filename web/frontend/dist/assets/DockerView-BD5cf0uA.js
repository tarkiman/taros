import{$ as e,An as t,Bn as n,Bt as r,Cn as i,E as a,Et as o,Fn as s,Gt as c,Hn as l,Jt as u,Kn as d,Nn as f,O as p,Pn as m,Qn as h,Qt as g,Rt as _,S as v,Sn as y,Tn as b,Vn as x,Wt as S,Xt as C,Yn as w,Yt as T,Zt as E,_n as D,an as O,bn as k,fn as ee,hn as A,jn as te,kt as ne,l as j,ln as M,lt as N,n as re,nt as P,ot as F,pn as I,qt as L,rn as ie,tr as R,ut as z,vn as B,vt as V,wn as H,wt as U,xt as ae,yn as W,yt as oe,zn as se}from"./auth-CKvW4zla.js";import{t as G}from"./get-slot-DLVBGA1t.js";import{a as K,c as q,l as ce,n as J,o as le,r as ue,t as Y,u as de}from"./Popconfirm-Cz59ChiM.js";import{n as fe}from"./misc-DDs3MKLt.js";import{O as pe,k as me}from"./light-CsJMWWoD.js";import{t as he}from"./flatten-BLQ6lCxA.js";import{t as ge}from"./use-merged-state-BLpT01b2.js";import{d as _e,t as ve}from"./AppShell-CRXavD31.js";import{t as ye}from"./_plugin-vue_export-helper-8ZQHCb4z.js";import{t as be}from"./Add-B_R8D4BT.js";import{t as X}from"./Alert-Bm8M0KpW.js";import{t as xe}from"./use-message-RcBYBjjL.js";import{n as Se,r as Ce}from"./light-7AQuyFOf.js";import{t as we}from"./Spin-fNpKdKdl.js";import{t as Z}from"./docker-QdtRDdWf.js";import{n as Te,t as Q}from"./format-BxLcbkc3.js";var Ee=q(`.v-x-scroll`,{overflow:`auto`,scrollbarWidth:`none`},[q(`&::-webkit-scrollbar`,{width:0,height:0})]),De=k({name:`XScroll`,props:{disabled:Boolean,onScroll:Function},setup(){let e=d(null);function t(e){!(e.currentTarget.offsetWidth<e.currentTarget.scrollWidth)||e.deltaY===0||(e.currentTarget.scrollLeft+=e.deltaY+e.deltaX,e.preventDefault())}let n=o();return Ee.mount({id:`vueuc/x-scroll`,head:!0,anchorMetaName:ce,ssr:n}),Object.assign({selfRef:e,handleWheel:t},{scrollTo(...t){var n;(n=e.value)==null||n.scrollTo(...t)}})},render(){return y(`div`,{ref:`selfRef`,onScroll:this.onScroll,onWheel:this.disabled?void 0:this.handleWheel,class:`v-x-scroll`},this.$slots)}});function Oe(e,t=`default`,n=[]){let{children:r}=e;if(typeof r==`object`&&r&&!Array.isArray(r)){let e=r[t];if(typeof e==`function`)return e()}return n}var ke=/\s/;function Ae(e){for(var t=e.length;t--&&ke.test(e.charAt(t)););return t}var je=/^\s+/;function Me(e){return e&&e.slice(0,Ae(e)+1).replace(je,``)}var Ne=NaN,Pe=/^[-+]0x[0-9a-f]+$/i,Fe=/^0b[01]+$/i,Ie=/^0o[0-7]+$/i,Le=parseInt;function Re(t){if(typeof t==`number`)return t;if(P(t))return Ne;if(e(t)){var n=typeof t.valueOf==`function`?t.valueOf():t;t=e(n)?n+``:n}if(typeof t!=`string`)return t===0?t:+t;t=Me(t);var r=Fe.test(t);return r||Ie.test(t)?Le(t.slice(2),r?2:8):Pe.test(t)?Ne:+t}var ze=function(){return F.Date.now()},Be=`Expected a function`,Ve=Math.max,He=Math.min;function Ue(t,n,r){var i,a,o,s,c,l,u=0,d=!1,f=!1,p=!0;if(typeof t!=`function`)throw TypeError(Be);n=Re(n)||0,e(r)&&(d=!!r.leading,f=`maxWait`in r,o=f?Ve(Re(r.maxWait)||0,n):o,p=`trailing`in r?!!r.trailing:p);function m(e){var n=i,r=a;return i=a=void 0,u=e,s=t.apply(r,n),s}function h(e){return u=e,c=setTimeout(v,n),d?m(e):s}function g(e){var t=e-l,r=e-u,i=n-t;return f?He(i,o-r):i}function _(e){var t=e-l,r=e-u;return l===void 0||t>=n||t<0||f&&r>=o}function v(){var e=ze();if(_(e))return y(e);c=setTimeout(v,g(e))}function y(e){return c=void 0,p&&i?m(e):(i=a=void 0,s)}function b(){c!==void 0&&clearTimeout(c),u=0,i=l=a=c=void 0}function x(){return c===void 0?s:y(ze())}function S(){var e=ze(),t=_(e);if(i=arguments,a=this,l=e,t){if(c===void 0)return h(l);if(f)return clearTimeout(c),c=setTimeout(v,n),m(l)}return c===void 0&&(c=setTimeout(v,n)),s}return S.cancel=b,S.flush=x,S}var We=`Expected a function`;function Ge(t,n,r){var i=!0,a=!0;if(typeof t!=`function`)throw TypeError(We);return e(r)&&(i=`leading`in r?!!r.leading:i,a=`trailing`in r?!!r.trailing:a),Ue(t,n,{leading:i,maxWait:n,trailing:a})}var Ke=S([c(`descriptions`,{fontSize:`var(--n-font-size)`},[c(`descriptions-separator`,`
 display: inline-block;
 margin: 0 8px 0 2px;
 `),c(`descriptions-table-wrapper`,[c(`descriptions-table`,[c(`descriptions-table-row`,[c(`descriptions-table-header`,{padding:`var(--n-th-padding)`}),c(`descriptions-table-content`,{padding:`var(--n-td-padding)`})])])]),T(`bordered`,[c(`descriptions-table-wrapper`,[c(`descriptions-table`,[c(`descriptions-table-row`,[S(`&:last-child`,[c(`descriptions-table-content`,{paddingBottom:0})])])])])]),u(`left-label-placement`,[c(`descriptions-table-content`,[S(`> *`,{verticalAlign:`top`})])]),u(`left-label-align`,[S(`th`,{textAlign:`left`})]),u(`center-label-align`,[S(`th`,{textAlign:`center`})]),u(`right-label-align`,[S(`th`,{textAlign:`right`})]),u(`bordered`,[c(`descriptions-table-wrapper`,`
 border-radius: var(--n-border-radius);
 overflow: hidden;
 background: var(--n-merged-td-color);
 border: 1px solid var(--n-merged-border-color);
 `,[c(`descriptions-table`,[c(`descriptions-table-row`,[S(`&:not(:last-child)`,[c(`descriptions-table-content`,{borderBottom:`1px solid var(--n-merged-border-color)`}),c(`descriptions-table-header`,{borderBottom:`1px solid var(--n-merged-border-color)`})]),c(`descriptions-table-header`,`
 font-weight: 400;
 background-clip: padding-box;
 background-color: var(--n-merged-th-color);
 `,[S(`&:not(:last-child)`,{borderRight:`1px solid var(--n-merged-border-color)`})]),c(`descriptions-table-content`,[S(`&:not(:last-child)`,{borderRight:`1px solid var(--n-merged-border-color)`})])])])])]),c(`descriptions-header`,`
 font-weight: var(--n-th-font-weight);
 font-size: 18px;
 transition: color .3s var(--n-bezier);
 line-height: var(--n-line-height);
 margin-bottom: 16px;
 color: var(--n-title-text-color);
 `),c(`descriptions-table-wrapper`,`
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[c(`descriptions-table`,`
 width: 100%;
 border-collapse: separate;
 border-spacing: 0;
 box-sizing: border-box;
 `,[c(`descriptions-table-row`,`
 box-sizing: border-box;
 transition: border-color .3s var(--n-bezier);
 `,[c(`descriptions-table-header`,`
 font-weight: var(--n-th-font-weight);
 line-height: var(--n-line-height);
 display: table-cell;
 box-sizing: border-box;
 color: var(--n-th-text-color);
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `),c(`descriptions-table-content`,`
 vertical-align: top;
 line-height: var(--n-line-height);
 display: table-cell;
 box-sizing: border-box;
 color: var(--n-td-text-color);
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[L(`content`,`
 transition: color .3s var(--n-bezier);
 display: inline-block;
 color: var(--n-td-text-color);
 `)]),L(`label`,`
 font-weight: var(--n-th-font-weight);
 transition: color .3s var(--n-bezier);
 display: inline-block;
 margin-right: 14px;
 color: var(--n-th-text-color);
 `)])])])]),c(`descriptions-table-wrapper`,`
 --n-merged-th-color: var(--n-th-color);
 --n-merged-td-color: var(--n-td-color);
 --n-merged-border-color: var(--n-border-color);
 `),E(c(`descriptions-table-wrapper`,`
 --n-merged-th-color: var(--n-th-color-modal);
 --n-merged-td-color: var(--n-td-color-modal);
 --n-merged-border-color: var(--n-border-color-modal);
 `)),g(c(`descriptions-table-wrapper`,`
 --n-merged-th-color: var(--n-th-color-popover);
 --n-merged-td-color: var(--n-td-color-popover);
 --n-merged-border-color: var(--n-border-color-popover);
 `))]),qe=`DESCRIPTION_ITEM_FLAG`;function Je(e){return typeof e==`object`&&e&&!Array.isArray(e)?e.type&&e.type.DESCRIPTION_ITEM_FLAG:!1}var Ye=Object.assign(Object.assign({},p.props),{title:String,column:{type:Number,default:3},columns:Number,labelPlacement:{type:String,default:`top`},labelAlign:{type:String,default:`left`},separator:{type:String,default:`:`},size:String,bordered:Boolean,labelClass:String,labelStyle:[Object,String],contentClass:String,contentStyle:[Object,String]}),Xe=k({name:`Descriptions`,props:Ye,slots:Object,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n,mergedComponentPropsRef:r}=z(e),i=I(()=>e.size||r?.value?.Descriptions?.size||`medium`),a=p(`Descriptions`,`-descriptions`,Ke,Ce,e,t),o=I(()=>{let{bordered:t}=e,n=i.value,{common:{cubicBezierEaseInOut:r},self:{titleTextColor:o,thColor:s,thColorModal:c,thColorPopover:l,thTextColor:u,thFontWeight:d,tdTextColor:f,tdColor:p,tdColorModal:m,tdColorPopover:h,borderColor:g,borderColorModal:_,borderColorPopover:v,borderRadius:y,lineHeight:b,[C(`fontSize`,n)]:x,[C(t?`thPaddingBordered`:`thPadding`,n)]:S,[C(t?`tdPaddingBordered`:`tdPadding`,n)]:w}}=a.value;return{"--n-title-text-color":o,"--n-th-padding":S,"--n-td-padding":w,"--n-font-size":x,"--n-bezier":r,"--n-th-font-weight":d,"--n-line-height":b,"--n-th-text-color":u,"--n-td-text-color":f,"--n-th-color":s,"--n-th-color-modal":c,"--n-th-color-popover":l,"--n-td-color":p,"--n-td-color-modal":m,"--n-td-color-popover":h,"--n-border-radius":y,"--n-border-color":g,"--n-border-color-modal":_,"--n-border-color-popover":v}}),s=n?N(`descriptions`,I(()=>{let t=``,{bordered:n}=e;return n&&(t+=`a`),t+=i.value[0],t}),o,e):void 0;return{mergedClsPrefix:t,cssVars:n?void 0:o,themeClass:s?.themeClass,onRender:s?.onRender,compitableColumn:_e(e,[`columns`,`column`]),inlineThemeDisabled:n,mergedSize:i}},render(){let e=this.$slots.default,t=e?he(e()):[];t.length;let{contentClass:n,labelClass:r,compitableColumn:i,labelPlacement:a,labelAlign:o,mergedSize:s,bordered:c,title:l,cssVars:u,mergedClsPrefix:d,separator:f,onRender:p}=this;p?.();let m=t.filter(e=>Je(e)),h=m.reduce((e,t,o)=>{let s=t.props||{},l=m.length-1===o,u=[`label`in s?s.label:Oe(t,`label`)],p=[Oe(t)],h=s.span||1,g=e.span;e.span+=h;let _=s.labelStyle||s[`label-style`]||this.labelStyle,v=s.contentStyle||s[`content-style`]||this.contentStyle;if(a===`left`)c?e.row.push(y(`th`,{class:[`${d}-descriptions-table-header`,r],colspan:1,style:_},u),y(`td`,{class:[`${d}-descriptions-table-content`,n],colspan:l?(i-g)*2+1:h*2-1,style:v},p)):e.row.push(y(`td`,{class:`${d}-descriptions-table-content`,colspan:l?(i-g)*2:h*2},y(`span`,{class:[`${d}-descriptions-table-content__label`,r],style:_},[...u,f&&y(`span`,{class:`${d}-descriptions-separator`},f)]),y(`span`,{class:[`${d}-descriptions-table-content__content`,n],style:v},p)));else{let t=l?(i-g)*2:h*2;e.row.push(y(`th`,{class:[`${d}-descriptions-table-header`,r],colspan:t,style:_},u)),e.secondRow.push(y(`td`,{class:[`${d}-descriptions-table-content`,n],colspan:t,style:v},p))}return(e.span>=i||l)&&(e.span=0,e.row.length&&(e.rows.push(e.row),e.row=[]),a!==`left`&&e.secondRow.length&&(e.rows.push(e.secondRow),e.secondRow=[])),e},{span:0,row:[],secondRow:[],rows:[]}).rows.map(e=>y(`tr`,{class:`${d}-descriptions-table-row`},e));return y(`div`,{style:u,class:[`${d}-descriptions`,this.themeClass,`${d}-descriptions--${a}-label-placement`,`${d}-descriptions--${o}-label-align`,`${d}-descriptions--${s}-size`,c&&`${d}-descriptions--bordered`]},l||this.$slots.header?y(`div`,{class:`${d}-descriptions-header`},l||G(this,`header`)):null,y(`div`,{class:`${d}-descriptions-table-wrapper`},y(`table`,{class:`${d}-descriptions-table`},y(`tbody`,null,a===`top`&&y(`tr`,{class:`${d}-descriptions-table-row`,style:{visibility:`collapse`}},fe(i*2,y(`td`,null))),h))))}}),Ze={label:String,span:{type:Number,default:1},labelClass:String,labelStyle:[Object,String],contentClass:String,contentStyle:[Object,String]},$=k({name:`DescriptionsItem`,[qe]:!0,props:Ze,slots:Object,render(){return null}}),Qe=ne(`n-tabs`),$e={tab:[String,Number,Object,Function],name:{type:[String,Number],required:!0},disabled:Boolean,displayDirective:{type:String,default:`if`},closable:{type:Boolean,default:void 0},tabProps:Object,label:[String,Number,Object,Function]},et=k({__TAB_PANE__:!0,name:`TabPane`,alias:[`TabPanel`],props:$e,slots:Object,setup(e){let t=i(Qe,null);return t||ae(`tab-pane`,"`n-tab-pane` must be placed inside `n-tabs`."),{style:t.paneStyleRef,class:t.paneClassRef,mergedClsPrefix:t.mergedClsPrefixRef}},render(){return y(`div`,{class:[`${this.mergedClsPrefix}-tab-pane`,this.class],style:this.style},this.$slots)}}),tt=Object.assign({internalLeftPadded:Boolean,internalAddable:Boolean,internalCreatedByPane:Boolean},me($e,[`displayDirective`])),nt=k({__TAB__:!0,inheritAttrs:!1,name:`Tab`,props:tt,setup(e){let{mergedClsPrefixRef:t,valueRef:n,typeRef:r,closableRef:a,tabStyleRef:o,addTabStyleRef:s,tabClassRef:c,addTabClassRef:l,tabChangeIdRef:u,onBeforeLeaveRef:d,triggerRef:f,handleAdd:p,activateTab:m,handleClose:h}=i(Qe);return{trigger:f,mergedClosable:I(()=>{if(e.internalAddable)return!1;let{closable:t}=e;return t===void 0?a.value:t}),style:o,addStyle:s,tabClass:c,addTabClass:l,clsPrefix:t,value:n,type:r,handleClose(t){t.stopPropagation(),!e.disabled&&h(e.name)},activateTab(){if(e.disabled)return;if(e.internalAddable){p();return}let{name:t}=e,r=++u.id;if(t!==n.value){let{value:i}=d;i?Promise.resolve(i(e.name,n.value)).then(e=>{e&&u.id===r&&m(t)}):m(t)}}}},render(){let{internalAddable:e,clsPrefix:t,name:n,disabled:r,label:i,tab:o,value:s,mergedClosable:c,trigger:l,$slots:{default:u}}=this,d=i??o;return y(`div`,{class:`${t}-tabs-tab-wrapper`},this.internalLeftPadded?y(`div`,{class:`${t}-tabs-tab-pad`}):null,y(`div`,Object.assign({key:n,"data-name":n,"data-disabled":r?!0:void 0},H({class:[`${t}-tabs-tab`,s===n&&`${t}-tabs-tab--active`,r&&`${t}-tabs-tab--disabled`,c&&`${t}-tabs-tab--closable`,e&&`${t}-tabs-tab--addable`,e?this.addTabClass:this.tabClass],onClick:l===`click`?this.activateTab:void 0,onMouseenter:l===`hover`?this.activateTab:void 0,style:e?this.addStyle:this.style},this.internalCreatedByPane?this.tabProps||{}:this.$attrs)),y(`span`,{class:`${t}-tabs-tab__label`},e?y(M,null,y(`div`,{class:`${t}-tabs-tab__height-placeholder`},`\xA0`),y(a,{clsPrefix:t},{default:()=>y(be,null)})):u?u():typeof d==`object`?d:pe(d??n)),c&&this.type===`card`?y(v,{clsPrefix:t,class:`${t}-tabs-tab__close`,onClick:this.handleClose,disabled:r}):null))}}),rt=c(`tabs`,`
 box-sizing: border-box;
 width: 100%;
 display: flex;
 flex-direction: column;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
`,[u(`segment-type`,[c(`tabs-rail`,[S(`&.transition-disabled`,[c(`tabs-capsule`,`
 transition: none;
 `)])])]),u(`top`,[c(`tab-pane`,`
 padding: var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left);
 `)]),u(`left`,[c(`tab-pane`,`
 padding: var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left) var(--n-pane-padding-top);
 `)]),u(`left, right`,`
 flex-direction: row;
 `,[c(`tabs-bar`,`
 width: 2px;
 right: 0;
 transition:
 top .2s var(--n-bezier),
 max-height .2s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `),c(`tabs-tab`,`
 padding: var(--n-tab-padding-vertical); 
 `)]),u(`right`,`
 flex-direction: row-reverse;
 `,[c(`tab-pane`,`
 padding: var(--n-pane-padding-left) var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom);
 `),c(`tabs-bar`,`
 left: 0;
 `)]),u(`bottom`,`
 flex-direction: column-reverse;
 justify-content: flex-end;
 `,[c(`tab-pane`,`
 padding: var(--n-pane-padding-bottom) var(--n-pane-padding-right) var(--n-pane-padding-top) var(--n-pane-padding-left);
 `),c(`tabs-bar`,`
 top: 0;
 `)]),c(`tabs-rail`,`
 position: relative;
 padding: 3px;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 background-color: var(--n-color-segment);
 transition: background-color .3s var(--n-bezier);
 display: flex;
 align-items: center;
 `,[c(`tabs-capsule`,`
 border-radius: var(--n-tab-border-radius);
 position: absolute;
 pointer-events: none;
 background-color: var(--n-tab-color-segment);
 box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .08);
 transition: transform 0.3s var(--n-bezier);
 `),c(`tabs-tab-wrapper`,`
 flex-basis: 0;
 flex-grow: 1;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[c(`tabs-tab`,`
 overflow: hidden;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[u(`active`,`
 font-weight: var(--n-font-weight-strong);
 color: var(--n-tab-text-color-active);
 `),S(`&:hover`,`
 color: var(--n-tab-text-color-hover);
 `)])])]),u(`flex`,[c(`tabs-nav`,`
 width: 100%;
 position: relative;
 `,[c(`tabs-wrapper`,`
 width: 100%;
 `,[c(`tabs-tab`,`
 margin-right: 0;
 `)])])]),c(`tabs-nav`,`
 box-sizing: border-box;
 line-height: 1.5;
 display: flex;
 transition: border-color .3s var(--n-bezier);
 `,[L(`prefix, suffix`,`
 display: flex;
 align-items: center;
 `),L(`prefix`,`padding-right: 16px;`),L(`suffix`,`padding-left: 16px;`)]),u(`top, bottom`,[S(`>`,[c(`tabs-nav`,[c(`tabs-nav-scroll-wrapper`,[S(`&::before`,`
 top: 0;
 bottom: 0;
 left: 0;
 width: 20px;
 `),S(`&::after`,`
 top: 0;
 bottom: 0;
 right: 0;
 width: 20px;
 `),u(`shadow-start`,[S(`&::before`,`
 box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, .12);
 `)]),u(`shadow-end`,[S(`&::after`,`
 box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),u(`left, right`,[c(`tabs-nav-scroll-content`,`
 flex-direction: column;
 `),S(`>`,[c(`tabs-nav`,[c(`tabs-nav-scroll-wrapper`,[S(`&::before`,`
 top: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),S(`&::after`,`
 bottom: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),u(`shadow-start`,[S(`&::before`,`
 box-shadow: inset 0 10px 8px -8px rgba(0, 0, 0, .12);
 `)]),u(`shadow-end`,[S(`&::after`,`
 box-shadow: inset 0 -10px 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),c(`tabs-nav-scroll-wrapper`,`
 flex: 1;
 position: relative;
 overflow: hidden;
 `,[c(`tabs-nav-y-scroll`,`
 height: 100%;
 width: 100%;
 overflow-y: auto; 
 scrollbar-width: none;
 `,[S(`&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb`,`
 width: 0;
 height: 0;
 display: none;
 `)]),S(`&::before, &::after`,`
 transition: box-shadow .3s var(--n-bezier);
 pointer-events: none;
 content: "";
 position: absolute;
 z-index: 1;
 `)]),c(`tabs-nav-scroll-content`,`
 display: flex;
 position: relative;
 min-width: 100%;
 min-height: 100%;
 width: fit-content;
 box-sizing: border-box;
 `),c(`tabs-wrapper`,`
 display: inline-flex;
 flex-wrap: nowrap;
 position: relative;
 `),c(`tabs-tab-wrapper`,`
 display: flex;
 flex-wrap: nowrap;
 flex-shrink: 0;
 flex-grow: 0;
 `),c(`tabs-tab`,`
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
 `,[u(`disabled`,{cursor:`not-allowed`}),L(`close`,`
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),L(`label`,`
 display: flex;
 align-items: center;
 z-index: 1;
 `)]),c(`tabs-bar`,`
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
 `,[S(`&.transition-disabled`,`
 transition: none;
 `),u(`disabled`,`
 background-color: var(--n-tab-text-color-disabled)
 `)]),c(`tabs-pane-wrapper`,`
 position: relative;
 overflow: hidden;
 transition: max-height .2s var(--n-bezier);
 `),c(`tab-pane`,`
 color: var(--n-pane-text-color);
 width: 100%;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 opacity .2s var(--n-bezier);
 left: 0;
 right: 0;
 top: 0;
 `,[S(`&.next-transition-leave-active, &.prev-transition-leave-active, &.next-transition-enter-active, &.prev-transition-enter-active`,`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 transform .2s var(--n-bezier),
 opacity .2s var(--n-bezier);
 `),S(`&.next-transition-leave-active, &.prev-transition-leave-active`,`
 position: absolute;
 `),S(`&.next-transition-enter-from, &.prev-transition-leave-to`,`
 transform: translateX(32px);
 opacity: 0;
 `),S(`&.next-transition-leave-to, &.prev-transition-enter-from`,`
 transform: translateX(-32px);
 opacity: 0;
 `),S(`&.next-transition-leave-from, &.next-transition-enter-to, &.prev-transition-leave-from, &.prev-transition-enter-to`,`
 transform: translateX(0);
 opacity: 1;
 `)]),c(`tabs-tab-pad`,`
 box-sizing: border-box;
 width: var(--n-tab-gap);
 flex-grow: 0;
 flex-shrink: 0;
 `),u(`line-type, bar-type`,[c(`tabs-tab`,`
 font-weight: var(--n-tab-font-weight);
 box-sizing: border-box;
 vertical-align: bottom;
 `,[S(`&:hover`,{color:`var(--n-tab-text-color-hover)`}),u(`active`,`
 color: var(--n-tab-text-color-active);
 font-weight: var(--n-tab-font-weight-active);
 `),u(`disabled`,{color:`var(--n-tab-text-color-disabled)`})])]),c(`tabs-nav`,[u(`line-type`,[u(`top`,[L(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),c(`tabs-nav-scroll-content`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),c(`tabs-bar`,`
 bottom: -1px;
 `)]),u(`left`,[L(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),c(`tabs-nav-scroll-content`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),c(`tabs-bar`,`
 right: -1px;
 `)]),u(`right`,[L(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),c(`tabs-nav-scroll-content`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),c(`tabs-bar`,`
 left: -1px;
 `)]),u(`bottom`,[L(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),c(`tabs-nav-scroll-content`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),c(`tabs-bar`,`
 top: -1px;
 `)]),L(`prefix, suffix`,`
 transition: border-color .3s var(--n-bezier);
 `),c(`tabs-nav-scroll-content`,`
 transition: border-color .3s var(--n-bezier);
 `),c(`tabs-bar`,`
 border-radius: 0;
 `)]),u(`card-type`,[L(`prefix, suffix`,`
 transition: border-color .3s var(--n-bezier);
 `),c(`tabs-pad`,`
 flex-grow: 1;
 transition: border-color .3s var(--n-bezier);
 `),c(`tabs-tab-pad`,`
 transition: border-color .3s var(--n-bezier);
 `),c(`tabs-tab`,`
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
 `,[u(`addable`,`
 padding-left: 8px;
 padding-right: 8px;
 font-size: 16px;
 justify-content: center;
 `,[L(`height-placeholder`,`
 width: 0;
 font-size: var(--n-tab-font-size);
 `),T(`disabled`,[S(`&:hover`,`
 color: var(--n-tab-text-color-hover);
 `)])]),u(`closable`,`padding-right: 8px;`),u(`active`,`
 background-color: #0000;
 font-weight: var(--n-tab-font-weight-active);
 color: var(--n-tab-text-color-active);
 `),u(`disabled`,`color: var(--n-tab-text-color-disabled);`)])]),u(`left, right`,`
 flex-direction: column; 
 `,[L(`prefix, suffix`,`
 padding: var(--n-tab-padding-vertical);
 `),c(`tabs-wrapper`,`
 flex-direction: column;
 `),c(`tabs-tab-wrapper`,`
 flex-direction: column;
 `,[c(`tabs-tab-pad`,`
 height: var(--n-tab-gap-vertical);
 width: 100%;
 `)])]),u(`top`,[u(`card-type`,[c(`tabs-scroll-padding`,`border-bottom: 1px solid var(--n-tab-border-color);`),L(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),c(`tabs-tab`,`
 border-top-left-radius: var(--n-tab-border-radius);
 border-top-right-radius: var(--n-tab-border-radius);
 `,[u(`active`,`
 border-bottom: 1px solid #0000;
 `)]),c(`tabs-tab-pad`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),c(`tabs-pad`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `)])]),u(`left`,[u(`card-type`,[c(`tabs-scroll-padding`,`border-right: 1px solid var(--n-tab-border-color);`),L(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),c(`tabs-tab`,`
 border-top-left-radius: var(--n-tab-border-radius);
 border-bottom-left-radius: var(--n-tab-border-radius);
 `,[u(`active`,`
 border-right: 1px solid #0000;
 `)]),c(`tabs-tab-pad`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),c(`tabs-pad`,`
 border-right: 1px solid var(--n-tab-border-color);
 `)])]),u(`right`,[u(`card-type`,[c(`tabs-scroll-padding`,`border-left: 1px solid var(--n-tab-border-color);`),L(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),c(`tabs-tab`,`
 border-top-right-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[u(`active`,`
 border-left: 1px solid #0000;
 `)]),c(`tabs-tab-pad`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),c(`tabs-pad`,`
 border-left: 1px solid var(--n-tab-border-color);
 `)])]),u(`bottom`,[u(`card-type`,[c(`tabs-scroll-padding`,`border-top: 1px solid var(--n-tab-border-color);`),L(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),c(`tabs-tab`,`
 border-bottom-left-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[u(`active`,`
 border-top: 1px solid #0000;
 `)]),c(`tabs-tab-pad`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),c(`tabs-pad`,`
 border-top: 1px solid var(--n-tab-border-color);
 `)])])])]),it=Ge,at=Object.assign(Object.assign({},p.props),{value:[String,Number],defaultValue:[String,Number],trigger:{type:String,default:`click`},type:{type:String,default:`bar`},closable:Boolean,justifyContent:String,size:String,placement:{type:String,default:`top`},tabStyle:[String,Object],tabClass:String,addTabStyle:[String,Object],addTabClass:String,barWidth:Number,paneClass:String,paneStyle:[String,Object],paneWrapperClass:String,paneWrapperStyle:[String,Object],addable:[Boolean,Object],tabsPadding:{type:Number,default:0},animated:Boolean,onBeforeLeave:Function,onAdd:Function,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onClose:[Function,Array],labelSize:String,activeName:[String,Number],onActiveNameChange:[Function,Array]}),ot=k({name:`Tabs`,props:at,slots:Object,setup(e,{slots:i}){let{mergedClsPrefixRef:a,inlineThemeDisabled:o,mergedComponentPropsRef:s}=z(e),c=p(`Tabs`,`-tabs`,rt,Se,e,a),l=d(null),u=d(null),f=d(null),h=d(null),g=d(null),v=d(null),y=d(!0),x=d(!0),S=_e(e,[`labelSize`,`size`]),T=I(()=>S.value?S.value:s?.value?.Tabs?.size||`medium`),E=_e(e,[`activeName`,`value`]),D=d(E.value??e.defaultValue??(i.default?he(i.default())[0]?.props?.name:null)),O=ge(E,D),k={id:0},ee=I(()=>{if(!(!e.justifyContent||e.type===`card`))return{display:`flex`,justifyContent:e.justifyContent}});se(O,()=>{k.id=0,M(),re()});function A(){let{value:e}=O;return e===null?null:l.value?.querySelector(`[data-name="${e}"]`)}function te(t){if(e.type===`card`)return;let{value:n}=u;if(!n)return;let r=n.style.opacity===`0`;if(t){let i=`${a.value}-tabs-bar--disabled`,{barWidth:o,placement:s}=e;if(t.dataset.disabled===`true`?n.classList.add(i):n.classList.remove(i),[`top`,`bottom`].includes(s)){if(j([`top`,`maxHeight`,`height`]),typeof o==`number`&&t.offsetWidth>=o){let e=Math.floor((t.offsetWidth-o)/2)+t.offsetLeft;n.style.left=`${e}px`,n.style.maxWidth=`${o}px`}else n.style.left=`${t.offsetLeft}px`,n.style.maxWidth=`${t.offsetWidth}px`;n.style.width=`8192px`,r&&(n.style.transition=`none`),n.offsetWidth,r&&(n.style.transition=``,n.style.opacity=`1`)}else{if(j([`left`,`maxWidth`,`width`]),typeof o==`number`&&t.offsetHeight>=o){let e=Math.floor((t.offsetHeight-o)/2)+t.offsetTop;n.style.top=`${e}px`,n.style.maxHeight=`${o}px`}else n.style.top=`${t.offsetTop}px`,n.style.maxHeight=`${t.offsetHeight}px`;n.style.height=`8192px`,r&&(n.style.transition=`none`),n.offsetHeight,r&&(n.style.transition=``,n.style.opacity=`1`)}}}function ne(){if(e.type===`card`)return;let{value:t}=u;t&&(t.style.opacity=`0`)}function j(e){let{value:t}=u;if(t)for(let n of e)t.style[n]=``}function M(){if(e.type===`card`)return;let t=A();t?te(t):ne()}function re(){let e=g.value?.$el;if(!e)return;let t=A();if(!t)return;let{scrollLeft:n,offsetWidth:r}=e,{offsetLeft:i,offsetWidth:a}=t;n>i?e.scrollTo({top:0,left:i,behavior:`smooth`}):i+a>n+r&&e.scrollTo({top:0,left:i+a-r,behavior:`smooth`})}let P=d(null),F=0,L=null;function ie(e){let t=P.value;if(t){F=e.getBoundingClientRect().height;let n=`${F}px`,r=()=>{t.style.height=n,t.style.maxHeight=n};L?(r(),L(),L=null):L=r}}function R(e){let t=P.value;if(t){let n=e.getBoundingClientRect().height,r=()=>{document.body.offsetHeight,t.style.maxHeight=`${n}px`,t.style.height=`${Math.max(F,n)}px`};L?(L(),L=null,r()):L=r}}function B(){let t=P.value;if(t){t.style.maxHeight=``,t.style.height=``;let{paneWrapperStyle:n}=e;if(typeof n==`string`)t.style.cssText=n;else if(n){let{maxHeight:e,height:r}=n;e!==void 0&&(t.style.maxHeight=e),r!==void 0&&(t.style.height=r)}}}let V={value:[]},H=d(`next`);function U(e){let t=O.value,n=`next`;for(let r of V.value){if(r===t)break;if(r===e){n=`prev`;break}}H.value=n,ae(e)}function ae(t){let{onActiveNameChange:n,onUpdateValue:r,"onUpdate:value":i}=e;n&&oe(n,t),r&&oe(r,t),i&&oe(i,t),D.value=t}function W(t){let{onClose:n}=e;n&&oe(n,t)}let G=!0;function K(){let{value:e}=u;if(!e)return;G||=!1;let t=`transition-disabled`;e.classList.add(t),M(),e.classList.remove(t)}let q=d(null);function ce({transitionDisabled:e}){let t=l.value;if(!t)return;e&&t.classList.add(`transition-disabled`);let n=A();n&&q.value&&(q.value.style.width=`${n.offsetWidth}px`,q.value.style.height=`${n.offsetHeight}px`,q.value.style.transform=`translateX(${n.offsetLeft-_(getComputedStyle(t).paddingLeft)}px)`,e&&q.value.offsetWidth),e&&t.classList.remove(`transition-disabled`)}se([O],()=>{e.type===`segment`&&b(()=>{ce({transitionDisabled:!1})})}),t(()=>{e.type===`segment`&&ce({transitionDisabled:!0})});let J=0;function le(t){if(t.contentRect.width===0&&t.contentRect.height===0||J===t.contentRect.width)return;J=t.contentRect.width;let{type:n}=e;if((n===`line`||n===`bar`)&&(G||e.justifyContent?.startsWith(`space`))&&K(),n!==`segment`){let{placement:t}=e;ve((t===`top`||t===`bottom`?g.value?.$el:v.value)||null)}}let ue=it(le,64);se([()=>e.justifyContent,()=>e.size],()=>{b(()=>{let{type:t}=e;(t===`line`||t===`bar`)&&K()})});let Y=d(!1);function fe(t){let{target:n,contentRect:{width:r,height:i}}=t,a=n.parentElement.parentElement.offsetWidth,o=n.parentElement.parentElement.offsetHeight,{placement:s}=e;if(!Y.value)s===`top`||s===`bottom`?a<r&&(Y.value=!0):o<i&&(Y.value=!0);else{let{value:e}=h;if(!e)return;s===`top`||s===`bottom`?a-r>e.$el.offsetWidth&&(Y.value=!1):o-i>e.$el.offsetHeight&&(Y.value=!1)}ve(g.value?.$el||null)}let pe=it(fe,64);function me(){let{onAdd:t}=e;t&&t(),b(()=>{let e=A(),{value:t}=g;!e||!t||t.scrollTo({left:e.offsetLeft,top:0,behavior:`smooth`})})}function ve(t){if(!t)return;let{placement:n}=e;if(n===`top`||n===`bottom`){let{scrollLeft:e,scrollWidth:n,offsetWidth:r}=t;y.value=e<=0,x.value=e+r>=n}else{let{scrollTop:e,scrollHeight:n,offsetHeight:r}=t;y.value=e<=0,x.value=e+r>=n}}let ye=it(e=>{ve(e.target)},64);m(Qe,{triggerRef:w(e,`trigger`),tabStyleRef:w(e,`tabStyle`),tabClassRef:w(e,`tabClass`),addTabStyleRef:w(e,`addTabStyle`),addTabClassRef:w(e,`addTabClass`),paneClassRef:w(e,`paneClass`),paneStyleRef:w(e,`paneStyle`),mergedClsPrefixRef:a,typeRef:w(e,`type`),closableRef:w(e,`closable`),valueRef:O,tabChangeIdRef:k,onBeforeLeaveRef:w(e,`onBeforeLeave`),activateTab:U,handleClose:W,handleAdd:me}),de(()=>{M(),re()}),n(()=>{let{value:e}=f;if(!e)return;let{value:t}=a,n=`${t}-tabs-nav-scroll-wrapper--shadow-start`,r=`${t}-tabs-nav-scroll-wrapper--shadow-end`;y.value?e.classList.remove(n):e.classList.add(n),x.value?e.classList.remove(r):e.classList.add(r)});let be={syncBarPosition:()=>{M()}},X=()=>{ce({transitionDisabled:!0})},xe=I(()=>{let{value:t}=T,{type:n}=e,i=`${t}${{card:`Card`,bar:`Bar`,line:`Line`,segment:`Segment`}[n]}`,{self:{barColor:a,closeIconColor:o,closeIconColorHover:s,closeIconColorPressed:l,tabColor:u,tabBorderColor:d,paneTextColor:f,tabFontWeight:p,tabBorderRadius:m,tabFontWeightActive:h,colorSegment:g,fontWeightStrong:_,tabColorSegment:v,closeSize:y,closeIconSize:b,closeColorHover:x,closeColorPressed:S,closeBorderRadius:w,[C(`panePadding`,t)]:E,[C(`tabPadding`,i)]:D,[C(`tabPaddingVertical`,i)]:O,[C(`tabGap`,i)]:k,[C(`tabGap`,`${i}Vertical`)]:ee,[C(`tabTextColor`,n)]:A,[C(`tabTextColorActive`,n)]:te,[C(`tabTextColorHover`,n)]:ne,[C(`tabTextColorDisabled`,n)]:j,[C(`tabFontSize`,t)]:M},common:{cubicBezierEaseInOut:N}}=c.value;return{"--n-bezier":N,"--n-color-segment":g,"--n-bar-color":a,"--n-tab-font-size":M,"--n-tab-text-color":A,"--n-tab-text-color-active":te,"--n-tab-text-color-disabled":j,"--n-tab-text-color-hover":ne,"--n-pane-text-color":f,"--n-tab-border-color":d,"--n-tab-border-radius":m,"--n-close-size":y,"--n-close-icon-size":b,"--n-close-color-hover":x,"--n-close-color-pressed":S,"--n-close-border-radius":w,"--n-close-icon-color":o,"--n-close-icon-color-hover":s,"--n-close-icon-color-pressed":l,"--n-tab-color":u,"--n-tab-font-weight":p,"--n-tab-font-weight-active":h,"--n-tab-padding":D,"--n-tab-padding-vertical":O,"--n-tab-gap":k,"--n-tab-gap-vertical":ee,"--n-pane-padding-left":r(E,`left`),"--n-pane-padding-right":r(E,`right`),"--n-pane-padding-top":r(E,`top`),"--n-pane-padding-bottom":r(E,`bottom`),"--n-font-weight-strong":_,"--n-tab-color-segment":v}}),Ce=o?N(`tabs`,I(()=>`${T.value[0]}${e.type[0]}`),xe,e):void 0;return Object.assign({mergedClsPrefix:a,mergedValue:O,renderedNames:new Set,segmentCapsuleElRef:q,tabsPaneWrapperRef:P,tabsElRef:l,barElRef:u,addTabInstRef:h,xScrollInstRef:g,scrollWrapperElRef:f,addTabFixed:Y,tabWrapperStyle:ee,handleNavResize:ue,mergedSize:T,handleScroll:ye,handleTabsResize:pe,cssVars:o?void 0:xe,themeClass:Ce?.themeClass,animationDirection:H,renderNameListRef:V,yScrollElRef:v,handleSegmentResize:X,onAnimationBeforeLeave:ie,onAnimationEnter:R,onAnimationAfterEnter:B,onRender:Ce?.onRender},be)},render(){let{mergedClsPrefix:e,type:t,placement:n,addTabFixed:r,addable:i,mergedSize:a,renderNameListRef:o,onRender:s,paneWrapperClass:c,paneWrapperStyle:l,$slots:{default:u,prefix:d,suffix:f}}=this;s?.();let p=u?he(u()).filter(e=>e.type.__TAB_PANE__===!0):[],m=u?he(u()).filter(e=>e.type.__TAB__===!0):[],h=!m.length,g=t===`card`,_=t===`segment`,v=!g&&!_&&this.justifyContent;o.value=[];let b=()=>{let t=y(`div`,{style:this.tabWrapperStyle,class:`${e}-tabs-wrapper`},v?null:y(`div`,{class:`${e}-tabs-scroll-padding`,style:n===`top`||n===`bottom`?{width:`${this.tabsPadding}px`}:{height:`${this.tabsPadding}px`}}),h?p.map((e,t)=>(o.value.push(e.props.name),ut(y(nt,Object.assign({},e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0&&(!v||v===`center`||v===`start`||v===`end`)}),e.children?{default:e.children.tab}:void 0)))):m.map((e,t)=>(o.value.push(e.props.name),ut(t!==0&&!v?lt(e):e))),!r&&i&&g?ct(i,(h?p.length:m.length)!==0):null,v?null:y(`div`,{class:`${e}-tabs-scroll-padding`,style:{width:`${this.tabsPadding}px`}}));return y(`div`,{ref:`tabsElRef`,class:`${e}-tabs-nav-scroll-content`},g&&i?y(U,{onResize:this.handleTabsResize},{default:()=>t}):t,g?y(`div`,{class:`${e}-tabs-pad`}):null,g?null:y(`div`,{ref:`barElRef`,class:`${e}-tabs-bar`}))},x=_?`top`:n;return y(`div`,{class:[`${e}-tabs`,this.themeClass,`${e}-tabs--${t}-type`,`${e}-tabs--${a}-size`,v&&`${e}-tabs--flex`,`${e}-tabs--${x}`],style:this.cssVars},y(`div`,{class:[`${e}-tabs-nav--${t}-type`,`${e}-tabs-nav--${x}`,`${e}-tabs-nav`]},V(d,t=>t&&y(`div`,{class:`${e}-tabs-nav__prefix`},t)),_?y(U,{onResize:this.handleSegmentResize},{default:()=>y(`div`,{class:`${e}-tabs-rail`,ref:`tabsElRef`},y(`div`,{class:`${e}-tabs-capsule`,ref:`segmentCapsuleElRef`},y(`div`,{class:`${e}-tabs-wrapper`},y(`div`,{class:`${e}-tabs-tab`}))),h?p.map((e,t)=>(o.value.push(e.props.name),y(nt,Object.assign({},e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0}),e.children?{default:e.children.tab}:void 0))):m.map((e,t)=>(o.value.push(e.props.name),t===0?e:lt(e))))}):y(U,{onResize:this.handleNavResize},{default:()=>y(`div`,{class:`${e}-tabs-nav-scroll-wrapper`,ref:`scrollWrapperElRef`},[`top`,`bottom`].includes(x)?y(De,{ref:`xScrollInstRef`,onScroll:this.handleScroll},{default:b}):y(`div`,{class:`${e}-tabs-nav-y-scroll`,onScroll:this.handleScroll,ref:`yScrollElRef`},b()))}),r&&i&&g?ct(i,!0):null,V(f,t=>t&&y(`div`,{class:`${e}-tabs-nav__suffix`},t))),h&&(this.animated&&(x===`top`||x===`bottom`)?y(`div`,{ref:`tabsPaneWrapperRef`,style:l,class:[`${e}-tabs-pane-wrapper`,c]},st(p,this.mergedValue,this.renderedNames,this.onAnimationBeforeLeave,this.onAnimationEnter,this.onAnimationAfterEnter,this.animationDirection)):st(p,this.mergedValue,this.renderedNames)))}});function st(e,t,n,r,i,a,o){let s=[];return e.forEach(e=>{let{name:r,displayDirective:i,"display-directive":a}=e.props,o=e=>i===e||a===e,c=t===r;if(e.key!==void 0&&(e.key=r),c||o(`show`)||o(`show:lazy`)&&n.has(r)){n.has(r)||n.add(r);let t=!o(`if`);s.push(t?l(e,[[O,c]]):e)}}),o?y(ie,{name:`${o}-transition`,onBeforeLeave:r,onEnter:i,onAfterEnter:a},{default:()=>s}):s}function ct(e,t){return y(nt,{ref:`addTabInstRef`,key:`__addable`,name:`__addable`,internalCreatedByPane:!0,internalAddable:!0,internalLeftPadded:t,disabled:typeof e==`object`&&e.disabled})}function lt(e){let t=ee(e);return t.props?t.props.internalLeftPadded=!0:t.props={internalLeftPadded:!0},t}function ut(e){return Array.isArray(e.dynamicProps)?e.dynamicProps.includes(`internalLeftPadded`)||e.dynamicProps.push(`internalLeftPadded`):e.dynamicProps=[`internalLeftPadded`],e}var dt={key:1,class:`tab-loading`},ft=ye(k({__name:`DockerView`,setup(e){let n=xe();function r(e){return e instanceof re&&e.status===503&&!!e.body&&typeof e.body==`object`&&`enabled`in e.body}function i(e,t){n.error(e instanceof re?e.message:t)}let a=e=>e===`running`?`success`:e===`paused`||e===`restarting`?`warning`:e===`dead`?`error`:`default`,o=d([]),c=d(!0),l=d(null),u;async function p(){try{let e=await Z.containers();o.value=e.containers,l.value=null}catch(e){r(e)&&(l.value=e.body)}finally{c.value=!1}}async function m(e,t){try{let n=await Z.containerAction(e,t);o.value=n.containers}catch(e){i(e,`Aksi ${t} gagal`)}}let g=[{title:`Nama`,key:`name`,width:160,ellipsis:{tooltip:!0}},{title:`Image`,key:`image`,width:180,ellipsis:{tooltip:!0}},{title:`Status`,key:`state`,width:130,render:e=>y(K,{type:a(e.state),size:`small`},{default:()=>e.status})},{title:`CPU`,key:`cpu`,width:70,render:e=>e.hasStats?`${e.stats.cpuPercent.toFixed(1)}%`:`—`},{title:`RAM`,key:`ram`,width:150,render:e=>e.hasStats?`${Q(e.stats.memUsageBytes)} / ${Q(e.stats.memLimitBytes)}`:`—`},{title:`Network`,key:`net`,width:140,render:e=>e.hasStats?`↓ ${Q(e.stats.netRxBytes)} ↑ ${Q(e.stats.netTxBytes)}`:`—`},{title:`Ports`,key:`ports`,width:220,ellipsis:{tooltip:!0}},{title:`Aksi`,key:`actions`,width:220,render:e=>y(J,{size:`small`},()=>[e.state===`running`?[y(j,{size:`tiny`,onClick:()=>m(e.id,`stop`)},()=>`Stop`),y(j,{size:`tiny`,onClick:()=>m(e.id,`restart`)},()=>`Restart`)]:y(j,{size:`tiny`,type:`primary`,onClick:()=>m(e.id,`start`)},()=>`Start`),y(Y,{onPositiveClick:()=>m(e.id,`remove`)},{trigger:()=>y(j,{size:`tiny`,type:`error`,ghost:!0},()=>`Hapus`),default:()=>`Hapus container "${e.name}"?`})])}],_=d([]),v=d(!0),b=d(null);async function S(){v.value=!0;try{let e=await Z.images();_.value=e.images,b.value=null}catch(e){r(e)&&(b.value=e.body)}finally{v.value=!1}}async function C(e){try{let t=await Z.removeImage(e);_.value=t.images}catch(e){i(e,`Hapus image gagal (mungkin masih dipakai container)`)}}let w=[{title:`Tag`,key:`tag`,minWidth:200,ellipsis:{tooltip:!0},render:e=>e.dangling?y(J,{size:`small`,align:`center`},()=>[e.tag,y(K,{size:`small`,type:`warning`},()=>`dangling`)]):e.tag},{title:`Ukuran`,key:`sizeBytes`,width:110,render:e=>Q(e.sizeBytes)},{title:`Dipakai`,key:`containers`,width:140,render:e=>e.containers<0?`—`:e.containers===0?`tidak dipakai`:`${e.containers} container`},{title:`Dibuat`,key:`created`,width:150,render:e=>Te(e.created)},{title:`Aksi`,key:`actions`,width:100,render:e=>y(Y,{onPositiveClick:()=>C(e.id)},{trigger:()=>y(j,{size:`tiny`,type:`error`,ghost:!0},()=>`Hapus`),default:()=>`Hapus image "${e.tag}"?`})}],T=d([]),E=d(!0),O=d(null);async function k(){E.value=!0;try{let e=await Z.volumes();T.value=e.volumes,O.value=null}catch(e){r(e)&&(O.value=e.body)}finally{E.value=!1}}async function ee(e){try{let t=await Z.removeVolume(e);T.value=t.volumes}catch(e){i(e,`Hapus volume gagal (mungkin masih dipakai container)`)}}let ne=[{title:`Nama`,key:`name`,minWidth:180,ellipsis:{tooltip:!0}},{title:`Driver`,key:`driver`,width:100},{title:`Ukuran`,key:`sizeBytes`,width:110,render:e=>e.sizeBytes<0?`tidak diketahui`:Q(e.sizeBytes)},{title:`Status`,key:`inUse`,width:120,render:e=>y(K,{size:`small`,type:e.inUse?`success`:`default`},()=>e.inUse?`dipakai`:`tidak dipakai`)},{title:`Aksi`,key:`actions`,width:100,render:e=>y(Y,{onPositiveClick:()=>ee(e.name)},{trigger:()=>y(j,{size:`tiny`,type:`error`,ghost:!0},()=>`Hapus`),default:()=>`Hapus volume "${e.name}"?`})}],N=d([]),P=d(!0),F=d(null);async function I(){P.value=!0;try{let e=await Z.networks();N.value=e.networks,F.value=null}catch(e){r(e)&&(F.value=e.body)}finally{P.value=!1}}async function L(e){try{let t=await Z.removeNetwork(e);N.value=t.networks}catch(e){i(e,`Hapus network gagal (mungkin builtin atau masih dipakai)`)}}let ie=[{title:`Nama`,key:`name`,minWidth:160,ellipsis:{tooltip:!0},render:e=>e.builtin?y(J,{size:`small`,align:`center`},()=>[e.name,y(K,{size:`small`},()=>`builtin`)]):e.name},{title:`Driver`,key:`driver`,width:100},{title:`Subnet`,key:`subnet`,width:150,render:e=>e.subnet||`—`},{title:`Container Terhubung`,key:`connectedCount`,width:170},{title:`Aksi`,key:`actions`,width:100,render:e=>e.builtin?null:y(Y,{onPositiveClick:()=>L(e.id)},{trigger:()=>y(j,{size:`tiny`,type:`error`,ghost:!0},()=>`Hapus`),default:()=>`Hapus network "${e.name}"?`})}],z=d(null),V=d(!0),H=d(null),U=d(null);async function ae(){V.value=!0;try{z.value=await Z.settings(),H.value=null}catch(e){r(e)&&(H.value=e.body)}finally{V.value=!1}}async function oe(e){U.value=e;try{z.value=await Z.prune(e),n.success(`Cleanup selesai`)}catch(t){i(t,`Cleanup gagal: ${e}`)}finally{U.value=null}}let G=d(`containers`),q=new Set([`containers`]);return se(G,e=>{q.has(e)||(q.add(e),e===`images`?S():e===`volumes`?k():e===`networks`?I():e===`settings`&&ae())}),t(()=>{p(),u=setInterval(p,5e3)}),te(()=>{u&&clearInterval(u)}),(e,t)=>(f(),A(ve,null,{default:x(()=>[W(h(ot),{type:`line`,value:G.value,"onUpdate:value":t[0]||=e=>G.value=e},{default:x(()=>[W(h(et),{name:`containers`,tab:`Containers`},{default:x(()=>[l.value?(f(),A(h(X),{key:0,type:`warning`,title:l.value.error},null,8,[`title`])):(f(),A(h(ue),{key:1,columns:g,data:o.value,loading:c.value,"row-key":e=>e.id,"scroll-x":1200},null,8,[`data`,`loading`,`row-key`]))]),_:1}),W(h(et),{name:`images`,tab:`Images`},{default:x(()=>[b.value?(f(),A(h(X),{key:0,type:`warning`,title:b.value.error},null,8,[`title`])):(f(),A(h(ue),{key:1,columns:w,data:_.value,loading:v.value,"row-key":e=>e.id,"scroll-x":700},null,8,[`data`,`loading`,`row-key`]))]),_:1}),W(h(et),{name:`volumes`,tab:`Volumes`},{default:x(()=>[O.value?(f(),A(h(X),{key:0,type:`warning`,title:O.value.error},null,8,[`title`])):(f(),A(h(ue),{key:1,columns:ne,data:T.value,loading:E.value,"row-key":e=>e.name,"scroll-x":610},null,8,[`data`,`loading`,`row-key`]))]),_:1}),W(h(et),{name:`networks`,tab:`Networks`},{default:x(()=>[F.value?(f(),A(h(X),{key:0,type:`warning`,title:F.value.error},null,8,[`title`])):(f(),A(h(ue),{key:1,columns:ie,data:N.value,loading:P.value,"row-key":e=>e.id,"scroll-x":680},null,8,[`data`,`loading`,`row-key`]))]),_:1}),W(h(et),{name:`settings`,tab:`Settings`},{default:x(()=>[H.value?(f(),A(h(X),{key:0,type:`warning`,title:H.value.error},null,8,[`title`])):V.value&&!z.value?(f(),D(`div`,dt,[W(h(we),{size:`large`})])):z.value?(f(),A(h(J),{key:3,vertical:``,size:24},{default:x(()=>[W(h(Xe),{title:`Info Daemon`,column:2,bordered:``,"label-placement":`left`},{default:x(()=>[W(h($),{label:`Versi Server`},{default:x(()=>[B(R(z.value?.info.serverVersion),1)]),_:1}),W(h($),{label:`OS / Kernel`},{default:x(()=>[B(R(z.value?.info.operatingSystem)+` / `+R(z.value?.info.kernelVersion),1)]),_:1}),W(h($),{label:`Storage Driver`},{default:x(()=>[B(R(z.value?.info.storageDriver),1)]),_:1}),W(h($),{label:`Root Dir`},{default:x(()=>[B(R(z.value?.info.dockerRootDir),1)]),_:1}),W(h($),{label:`Container`},{default:x(()=>[B(R(z.value?.info.containersRunning)+` running, `+R(z.value?.info.containersPaused)+` paused, `+R(z.value?.info.containersStopped)+` stopped `,1)]),_:1}),W(h($),{label:`Images`},{default:x(()=>[B(R(z.value?.info.images),1)]),_:1})]),_:1}),W(h(Xe),{title:`Disk Usage`,column:2,bordered:``,"label-placement":`left`},{default:x(()=>[W(h($),{label:`Images`},{default:x(()=>[B(R(h(Q)(z.value?.diskUsage.imagesTotalBytes??0))+` (reclaimable `+R(h(Q)(z.value?.diskUsage.imagesReclaimableBytes??0))+`) `,1)]),_:1}),W(h($),{label:`Containers`},{default:x(()=>[B(R(h(Q)(z.value?.diskUsage.containersTotalBytes??0)),1)]),_:1}),W(h($),{label:`Volumes`},{default:x(()=>[B(R(h(Q)(z.value?.diskUsage.volumesTotalBytes??0))+` (reclaimable `+R(h(Q)(z.value?.diskUsage.volumesReclaimableBytes??0))+`) `,1)]),_:1})]),_:1}),W(h(J),null,{default:x(()=>[(f(),D(M,null,s([`containers`,`images`,`volumes`,`networks`,`all`],e=>W(h(Y),{key:e,onPositiveClick:t=>oe(e)},{trigger:x(()=>[W(h(j),{size:`small`,loading:U.value===e},{default:x(()=>[B(`Bersihkan `+R(e),1)]),_:2},1032,[`loading`])]),default:x(()=>[B(` Jalankan cleanup "`+R(e)+`"? Tindakan ini tidak bisa dibatalkan. `,1)]),_:2},1032,[`onPositiveClick`])),64))]),_:1})]),_:1})):(f(),A(h(le),{key:2,description:`Tidak ada data`}))]),_:1})]),_:1},8,[`value`])]),_:1}))}}),[[`__scopeId`,`data-v-c5a72694`]]);export{ft as default};