import{$ as e,An as t,Bn as n,Bt as r,Cn as i,E as a,Et as o,Gn as s,Gt as c,Jn as l,Jt as u,Mn as d,Nn as f,O as p,Pn as m,Qt as h,Rn as g,Rt as _,S as v,Sn as y,Vn as b,Wt as x,Xt as S,Yt as C,Zn as w,Zt as T,_n as E,cn as D,dn as O,er as k,fn as A,gn as ee,in as te,kn as ne,kt as j,l as M,lt as re,mn as N,n as P,nn as F,nt as I,ot as L,qt as R,r as z,ut as ie,vn as B,vt as V,wn as H,wt as U,xn as W,xt as ae,yn as G,yt as oe,zn as se}from"./auth-CPbU0tuF.js";import{t as ce}from"./get-slot-DLVBGA1t.js";import{a as K,c as le,l as ue,n as q,o as de,r as J,t as Y,u as fe}from"./Popconfirm-Bs-2IwrT.js";import{s as pe}from"./fade-in-height-expand.cssr-Kmdf5eZ5.js";import{O as me,k as he}from"./light-CrQHrZcA.js";import{t as ge}from"./flatten-C_dE_fId.js";import{r as _e,t as ve}from"./_plugin-vue_export-helper-fnLlD4xv.js";import{a as ye,t as be}from"./AppShell-C9SOApOS.js";import{t as xe}from"./Add-QGTmvT-P.js";import{t as X}from"./Alert-s-3fsWyo.js";import{t as Se}from"./use-message-DPJSZ7tA.js";import{n as Ce,r as we}from"./light-BqOApF1A.js";import{t as Te}from"./Spin-BYyGeLBI.js";import{n as Ee,t as Z}from"./format-BxLcbkc3.js";var De=le(`.v-x-scroll`,{overflow:`auto`,scrollbarWidth:`none`},[le(`&::-webkit-scrollbar`,{width:0,height:0})]),Oe=G({name:`XScroll`,props:{disabled:Boolean,onScroll:Function},setup(){let e=s(null);function t(e){!(e.currentTarget.offsetWidth<e.currentTarget.scrollWidth)||e.deltaY===0||(e.currentTarget.scrollLeft+=e.deltaY+e.deltaX,e.preventDefault())}let n=o();return De.mount({id:`vueuc/x-scroll`,head:!0,anchorMetaName:ue,ssr:n}),Object.assign({selfRef:e,handleWheel:t},{scrollTo(...t){var n;(n=e.value)==null||n.scrollTo(...t)}})},render(){return W(`div`,{ref:`selfRef`,onScroll:this.onScroll,onWheel:this.disabled?void 0:this.handleWheel,class:`v-x-scroll`},this.$slots)}});function ke(e,t=`default`,n=[]){let{children:r}=e;if(typeof r==`object`&&r&&!Array.isArray(r)){let e=r[t];if(typeof e==`function`)return e()}return n}var Ae=/\s/;function je(e){for(var t=e.length;t--&&Ae.test(e.charAt(t)););return t}var Me=/^\s+/;function Ne(e){return e&&e.slice(0,je(e)+1).replace(Me,``)}var Pe=NaN,Fe=/^[-+]0x[0-9a-f]+$/i,Ie=/^0b[01]+$/i,Le=/^0o[0-7]+$/i,Re=parseInt;function ze(t){if(typeof t==`number`)return t;if(I(t))return Pe;if(e(t)){var n=typeof t.valueOf==`function`?t.valueOf():t;t=e(n)?n+``:n}if(typeof t!=`string`)return t===0?t:+t;t=Ne(t);var r=Ie.test(t);return r||Le.test(t)?Re(t.slice(2),r?2:8):Fe.test(t)?Pe:+t}var Be=function(){return L.Date.now()},Ve=`Expected a function`,He=Math.max,Ue=Math.min;function We(t,n,r){var i,a,o,s,c,l,u=0,d=!1,f=!1,p=!0;if(typeof t!=`function`)throw TypeError(Ve);n=ze(n)||0,e(r)&&(d=!!r.leading,f=`maxWait`in r,o=f?He(ze(r.maxWait)||0,n):o,p=`trailing`in r?!!r.trailing:p);function m(e){var n=i,r=a;return i=a=void 0,u=e,s=t.apply(r,n),s}function h(e){return u=e,c=setTimeout(v,n),d?m(e):s}function g(e){var t=e-l,r=e-u,i=n-t;return f?Ue(i,o-r):i}function _(e){var t=e-l,r=e-u;return l===void 0||t>=n||t<0||f&&r>=o}function v(){var e=Be();if(_(e))return y(e);c=setTimeout(v,g(e))}function y(e){return c=void 0,p&&i?m(e):(i=a=void 0,s)}function b(){c!==void 0&&clearTimeout(c),u=0,i=l=a=c=void 0}function x(){return c===void 0?s:y(Be())}function S(){var e=Be(),t=_(e);if(i=arguments,a=this,l=e,t){if(c===void 0)return h(l);if(f)return clearTimeout(c),c=setTimeout(v,n),m(l)}return c===void 0&&(c=setTimeout(v,n)),s}return S.cancel=b,S.flush=x,S}var Ge=`Expected a function`;function Ke(t,n,r){var i=!0,a=!0;if(typeof t!=`function`)throw TypeError(Ge);return e(r)&&(i=`leading`in r?!!r.leading:i,a=`trailing`in r?!!r.trailing:a),We(t,n,{leading:i,maxWait:n,trailing:a})}var qe=x([c(`descriptions`,{fontSize:`var(--n-font-size)`},[c(`descriptions-separator`,`
 display: inline-block;
 margin: 0 8px 0 2px;
 `),c(`descriptions-table-wrapper`,[c(`descriptions-table`,[c(`descriptions-table-row`,[c(`descriptions-table-header`,{padding:`var(--n-th-padding)`}),c(`descriptions-table-content`,{padding:`var(--n-td-padding)`})])])]),C(`bordered`,[c(`descriptions-table-wrapper`,[c(`descriptions-table`,[c(`descriptions-table-row`,[x(`&:last-child`,[c(`descriptions-table-content`,{paddingBottom:0})])])])])]),u(`left-label-placement`,[c(`descriptions-table-content`,[x(`> *`,{verticalAlign:`top`})])]),u(`left-label-align`,[x(`th`,{textAlign:`left`})]),u(`center-label-align`,[x(`th`,{textAlign:`center`})]),u(`right-label-align`,[x(`th`,{textAlign:`right`})]),u(`bordered`,[c(`descriptions-table-wrapper`,`
 border-radius: var(--n-border-radius);
 overflow: hidden;
 background: var(--n-merged-td-color);
 border: 1px solid var(--n-merged-border-color);
 `,[c(`descriptions-table`,[c(`descriptions-table-row`,[x(`&:not(:last-child)`,[c(`descriptions-table-content`,{borderBottom:`1px solid var(--n-merged-border-color)`}),c(`descriptions-table-header`,{borderBottom:`1px solid var(--n-merged-border-color)`})]),c(`descriptions-table-header`,`
 font-weight: 400;
 background-clip: padding-box;
 background-color: var(--n-merged-th-color);
 `,[x(`&:not(:last-child)`,{borderRight:`1px solid var(--n-merged-border-color)`})]),c(`descriptions-table-content`,[x(`&:not(:last-child)`,{borderRight:`1px solid var(--n-merged-border-color)`})])])])])]),c(`descriptions-header`,`
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
 `,[R(`content`,`
 transition: color .3s var(--n-bezier);
 display: inline-block;
 color: var(--n-td-text-color);
 `)]),R(`label`,`
 font-weight: var(--n-th-font-weight);
 transition: color .3s var(--n-bezier);
 display: inline-block;
 margin-right: 14px;
 color: var(--n-th-text-color);
 `)])])])]),c(`descriptions-table-wrapper`,`
 --n-merged-th-color: var(--n-th-color);
 --n-merged-td-color: var(--n-td-color);
 --n-merged-border-color: var(--n-border-color);
 `),T(c(`descriptions-table-wrapper`,`
 --n-merged-th-color: var(--n-th-color-modal);
 --n-merged-td-color: var(--n-td-color-modal);
 --n-merged-border-color: var(--n-border-color-modal);
 `)),h(c(`descriptions-table-wrapper`,`
 --n-merged-th-color: var(--n-th-color-popover);
 --n-merged-td-color: var(--n-td-color-popover);
 --n-merged-border-color: var(--n-border-color-popover);
 `))]),Je=`DESCRIPTION_ITEM_FLAG`;function Ye(e){return typeof e==`object`&&e&&!Array.isArray(e)?e.type&&e.type.DESCRIPTION_ITEM_FLAG:!1}var Xe=Object.assign(Object.assign({},p.props),{title:String,column:{type:Number,default:3},columns:Number,labelPlacement:{type:String,default:`top`},labelAlign:{type:String,default:`left`},separator:{type:String,default:`:`},size:String,bordered:Boolean,labelClass:String,labelStyle:[Object,String],contentClass:String,contentStyle:[Object,String]}),Ze=G({name:`Descriptions`,props:Xe,slots:Object,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n,mergedComponentPropsRef:r}=ie(e),i=A(()=>e.size||r?.value?.Descriptions?.size||`medium`),a=p(`Descriptions`,`-descriptions`,qe,we,e,t),o=A(()=>{let{bordered:t}=e,n=i.value,{common:{cubicBezierEaseInOut:r},self:{titleTextColor:o,thColor:s,thColorModal:c,thColorPopover:l,thTextColor:u,thFontWeight:d,tdTextColor:f,tdColor:p,tdColorModal:m,tdColorPopover:h,borderColor:g,borderColorModal:_,borderColorPopover:v,borderRadius:y,lineHeight:b,[S(`fontSize`,n)]:x,[S(t?`thPaddingBordered`:`thPadding`,n)]:C,[S(t?`tdPaddingBordered`:`tdPadding`,n)]:w}}=a.value;return{"--n-title-text-color":o,"--n-th-padding":C,"--n-td-padding":w,"--n-font-size":x,"--n-bezier":r,"--n-th-font-weight":d,"--n-line-height":b,"--n-th-text-color":u,"--n-td-text-color":f,"--n-th-color":s,"--n-th-color-modal":c,"--n-th-color-popover":l,"--n-td-color":p,"--n-td-color-modal":m,"--n-td-color-popover":h,"--n-border-radius":y,"--n-border-color":g,"--n-border-color-modal":_,"--n-border-color-popover":v}}),s=n?re(`descriptions`,A(()=>{let t=``,{bordered:n}=e;return n&&(t+=`a`),t+=i.value[0],t}),o,e):void 0;return{mergedClsPrefix:t,cssVars:n?void 0:o,themeClass:s?.themeClass,onRender:s?.onRender,compitableColumn:ye(e,[`columns`,`column`]),inlineThemeDisabled:n,mergedSize:i}},render(){let e=this.$slots.default,t=e?ge(e()):[];t.length;let{contentClass:n,labelClass:r,compitableColumn:i,labelPlacement:a,labelAlign:o,mergedSize:s,bordered:c,title:l,cssVars:u,mergedClsPrefix:d,separator:f,onRender:p}=this;p?.();let m=t.filter(e=>Ye(e)),h=m.reduce((e,t,o)=>{let s=t.props||{},l=m.length-1===o,u=[`label`in s?s.label:ke(t,`label`)],p=[ke(t)],h=s.span||1,g=e.span;e.span+=h;let _=s.labelStyle||s[`label-style`]||this.labelStyle,v=s.contentStyle||s[`content-style`]||this.contentStyle;if(a===`left`)c?e.row.push(W(`th`,{class:[`${d}-descriptions-table-header`,r],colspan:1,style:_},u),W(`td`,{class:[`${d}-descriptions-table-content`,n],colspan:l?(i-g)*2+1:h*2-1,style:v},p)):e.row.push(W(`td`,{class:`${d}-descriptions-table-content`,colspan:l?(i-g)*2:h*2},W(`span`,{class:[`${d}-descriptions-table-content__label`,r],style:_},[...u,f&&W(`span`,{class:`${d}-descriptions-separator`},f)]),W(`span`,{class:[`${d}-descriptions-table-content__content`,n],style:v},p)));else{let t=l?(i-g)*2:h*2;e.row.push(W(`th`,{class:[`${d}-descriptions-table-header`,r],colspan:t,style:_},u)),e.secondRow.push(W(`td`,{class:[`${d}-descriptions-table-content`,n],colspan:t,style:v},p))}return(e.span>=i||l)&&(e.span=0,e.row.length&&(e.rows.push(e.row),e.row=[]),a!==`left`&&e.secondRow.length&&(e.rows.push(e.secondRow),e.secondRow=[])),e},{span:0,row:[],secondRow:[],rows:[]}).rows.map(e=>W(`tr`,{class:`${d}-descriptions-table-row`},e));return W(`div`,{style:u,class:[`${d}-descriptions`,this.themeClass,`${d}-descriptions--${a}-label-placement`,`${d}-descriptions--${o}-label-align`,`${d}-descriptions--${s}-size`,c&&`${d}-descriptions--bordered`]},l||this.$slots.header?W(`div`,{class:`${d}-descriptions-header`},l||ce(this,`header`)):null,W(`div`,{class:`${d}-descriptions-table-wrapper`},W(`table`,{class:`${d}-descriptions-table`},W(`tbody`,null,a===`top`&&W(`tr`,{class:`${d}-descriptions-table-row`,style:{visibility:`collapse`}},pe(i*2,W(`td`,null))),h))))}}),Qe={label:String,span:{type:Number,default:1},labelClass:String,labelStyle:[Object,String],contentClass:String,contentStyle:[Object,String]},Q=G({name:`DescriptionsItem`,[Je]:!0,props:Qe,slots:Object,render(){return null}}),$e=j(`n-tabs`),et={tab:[String,Number,Object,Function],name:{type:[String,Number],required:!0},disabled:Boolean,displayDirective:{type:String,default:`if`},closable:{type:Boolean,default:void 0},tabProps:Object,label:[String,Number,Object,Function]},tt=G({__TAB_PANE__:!0,name:`TabPane`,alias:[`TabPanel`],props:et,slots:Object,setup(e){let t=y($e,null);return t||ae(`tab-pane`,"`n-tab-pane` must be placed inside `n-tabs`."),{style:t.paneStyleRef,class:t.paneClassRef,mergedClsPrefix:t.mergedClsPrefixRef}},render(){return W(`div`,{class:[`${this.mergedClsPrefix}-tab-pane`,this.class],style:this.style},this.$slots)}}),nt=Object.assign({internalLeftPadded:Boolean,internalAddable:Boolean,internalCreatedByPane:Boolean},he(et,[`displayDirective`])),rt=G({__TAB__:!0,inheritAttrs:!1,name:`Tab`,props:nt,setup(e){let{mergedClsPrefixRef:t,valueRef:n,typeRef:r,closableRef:i,tabStyleRef:a,addTabStyleRef:o,tabClassRef:s,addTabClassRef:c,tabChangeIdRef:l,onBeforeLeaveRef:u,triggerRef:d,handleAdd:f,activateTab:p,handleClose:m}=y($e);return{trigger:d,mergedClosable:A(()=>{if(e.internalAddable)return!1;let{closable:t}=e;return t===void 0?i.value:t}),style:a,addStyle:o,tabClass:s,addTabClass:c,clsPrefix:t,value:n,type:r,handleClose(t){t.stopPropagation(),!e.disabled&&m(e.name)},activateTab(){if(e.disabled)return;if(e.internalAddable){f();return}let{name:t}=e,r=++l.id;if(t!==n.value){let{value:i}=u;i?Promise.resolve(i(e.name,n.value)).then(e=>{e&&l.id===r&&p(t)}):p(t)}}}},render(){let{internalAddable:e,clsPrefix:t,name:n,disabled:r,label:o,tab:s,value:c,mergedClosable:l,trigger:u,$slots:{default:d}}=this,f=o??s;return W(`div`,{class:`${t}-tabs-tab-wrapper`},this.internalLeftPadded?W(`div`,{class:`${t}-tabs-tab-pad`}):null,W(`div`,Object.assign({key:n,"data-name":n,"data-disabled":r?!0:void 0},i({class:[`${t}-tabs-tab`,c===n&&`${t}-tabs-tab--active`,r&&`${t}-tabs-tab--disabled`,l&&`${t}-tabs-tab--closable`,e&&`${t}-tabs-tab--addable`,e?this.addTabClass:this.tabClass],onClick:u===`click`?this.activateTab:void 0,onMouseenter:u===`hover`?this.activateTab:void 0,style:e?this.addStyle:this.style},this.internalCreatedByPane?this.tabProps||{}:this.$attrs)),W(`span`,{class:`${t}-tabs-tab__label`},e?W(D,null,W(`div`,{class:`${t}-tabs-tab__height-placeholder`},`\xA0`),W(a,{clsPrefix:t},{default:()=>W(xe,null)})):d?d():typeof f==`object`?f:me(f??n)),l&&this.type===`card`?W(v,{clsPrefix:t,class:`${t}-tabs-tab__close`,onClick:this.handleClose,disabled:r}):null))}}),it=c(`tabs`,`
 box-sizing: border-box;
 width: 100%;
 display: flex;
 flex-direction: column;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
`,[u(`segment-type`,[c(`tabs-rail`,[x(`&.transition-disabled`,[c(`tabs-capsule`,`
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
 `),x(`&:hover`,`
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
 `,[R(`prefix, suffix`,`
 display: flex;
 align-items: center;
 `),R(`prefix`,`padding-right: 16px;`),R(`suffix`,`padding-left: 16px;`)]),u(`top, bottom`,[x(`>`,[c(`tabs-nav`,[c(`tabs-nav-scroll-wrapper`,[x(`&::before`,`
 top: 0;
 bottom: 0;
 left: 0;
 width: 20px;
 `),x(`&::after`,`
 top: 0;
 bottom: 0;
 right: 0;
 width: 20px;
 `),u(`shadow-start`,[x(`&::before`,`
 box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, .12);
 `)]),u(`shadow-end`,[x(`&::after`,`
 box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),u(`left, right`,[c(`tabs-nav-scroll-content`,`
 flex-direction: column;
 `),x(`>`,[c(`tabs-nav`,[c(`tabs-nav-scroll-wrapper`,[x(`&::before`,`
 top: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),x(`&::after`,`
 bottom: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),u(`shadow-start`,[x(`&::before`,`
 box-shadow: inset 0 10px 8px -8px rgba(0, 0, 0, .12);
 `)]),u(`shadow-end`,[x(`&::after`,`
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
 `,[x(`&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb`,`
 width: 0;
 height: 0;
 display: none;
 `)]),x(`&::before, &::after`,`
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
 `,[u(`disabled`,{cursor:`not-allowed`}),R(`close`,`
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),R(`label`,`
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
 `,[x(`&.transition-disabled`,`
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
 `,[x(`&.next-transition-leave-active, &.prev-transition-leave-active, &.next-transition-enter-active, &.prev-transition-enter-active`,`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 transform .2s var(--n-bezier),
 opacity .2s var(--n-bezier);
 `),x(`&.next-transition-leave-active, &.prev-transition-leave-active`,`
 position: absolute;
 `),x(`&.next-transition-enter-from, &.prev-transition-leave-to`,`
 transform: translateX(32px);
 opacity: 0;
 `),x(`&.next-transition-leave-to, &.prev-transition-enter-from`,`
 transform: translateX(-32px);
 opacity: 0;
 `),x(`&.next-transition-leave-from, &.next-transition-enter-to, &.prev-transition-leave-from, &.prev-transition-enter-to`,`
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
 `,[x(`&:hover`,{color:`var(--n-tab-text-color-hover)`}),u(`active`,`
 color: var(--n-tab-text-color-active);
 font-weight: var(--n-tab-font-weight-active);
 `),u(`disabled`,{color:`var(--n-tab-text-color-disabled)`})])]),c(`tabs-nav`,[u(`line-type`,[u(`top`,[R(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),c(`tabs-nav-scroll-content`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),c(`tabs-bar`,`
 bottom: -1px;
 `)]),u(`left`,[R(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),c(`tabs-nav-scroll-content`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),c(`tabs-bar`,`
 right: -1px;
 `)]),u(`right`,[R(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),c(`tabs-nav-scroll-content`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),c(`tabs-bar`,`
 left: -1px;
 `)]),u(`bottom`,[R(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),c(`tabs-nav-scroll-content`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),c(`tabs-bar`,`
 top: -1px;
 `)]),R(`prefix, suffix`,`
 transition: border-color .3s var(--n-bezier);
 `),c(`tabs-nav-scroll-content`,`
 transition: border-color .3s var(--n-bezier);
 `),c(`tabs-bar`,`
 border-radius: 0;
 `)]),u(`card-type`,[R(`prefix, suffix`,`
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
 `,[R(`height-placeholder`,`
 width: 0;
 font-size: var(--n-tab-font-size);
 `),C(`disabled`,[x(`&:hover`,`
 color: var(--n-tab-text-color-hover);
 `)])]),u(`closable`,`padding-right: 8px;`),u(`active`,`
 background-color: #0000;
 font-weight: var(--n-tab-font-weight-active);
 color: var(--n-tab-text-color-active);
 `),u(`disabled`,`color: var(--n-tab-text-color-disabled);`)])]),u(`left, right`,`
 flex-direction: column; 
 `,[R(`prefix, suffix`,`
 padding: var(--n-tab-padding-vertical);
 `),c(`tabs-wrapper`,`
 flex-direction: column;
 `),c(`tabs-tab-wrapper`,`
 flex-direction: column;
 `,[c(`tabs-tab-pad`,`
 height: var(--n-tab-gap-vertical);
 width: 100%;
 `)])]),u(`top`,[u(`card-type`,[c(`tabs-scroll-padding`,`border-bottom: 1px solid var(--n-tab-border-color);`),R(`prefix, suffix`,`
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
 `)])]),u(`left`,[u(`card-type`,[c(`tabs-scroll-padding`,`border-right: 1px solid var(--n-tab-border-color);`),R(`prefix, suffix`,`
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
 `)])]),u(`right`,[u(`card-type`,[c(`tabs-scroll-padding`,`border-left: 1px solid var(--n-tab-border-color);`),R(`prefix, suffix`,`
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
 `)])]),u(`bottom`,[u(`card-type`,[c(`tabs-scroll-padding`,`border-top: 1px solid var(--n-tab-border-color);`),R(`prefix, suffix`,`
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
 `)])])])]),at=Ke,ot=Object.assign(Object.assign({},p.props),{value:[String,Number],defaultValue:[String,Number],trigger:{type:String,default:`click`},type:{type:String,default:`bar`},closable:Boolean,justifyContent:String,size:String,placement:{type:String,default:`top`},tabStyle:[String,Object],tabClass:String,addTabStyle:[String,Object],addTabClass:String,barWidth:Number,paneClass:String,paneStyle:[String,Object],paneWrapperClass:String,paneWrapperStyle:[String,Object],addable:[Boolean,Object],tabsPadding:{type:Number,default:0},animated:Boolean,onBeforeLeave:Function,onAdd:Function,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onClose:[Function,Array],labelSize:String,activeName:[String,Number],onActiveNameChange:[Function,Array]}),st=G({name:`Tabs`,props:ot,slots:Object,setup(e,{slots:t}){let{mergedClsPrefixRef:n,inlineThemeDisabled:i,mergedComponentPropsRef:a}=ie(e),o=p(`Tabs`,`-tabs`,it,Ce,e,n),c=s(null),u=s(null),d=s(null),m=s(null),h=s(null),v=s(null),y=s(!0),b=s(!0),x=ye(e,[`labelSize`,`size`]),C=A(()=>x.value?x.value:a?.value?.Tabs?.size||`medium`),w=ye(e,[`activeName`,`value`]),T=s(w.value??e.defaultValue??(t.default?ge(t.default())[0]?.props?.name:null)),E=_e(w,T),D={id:0},O=A(()=>{if(!(!e.justifyContent||e.type===`card`))return{display:`flex`,justifyContent:e.justifyContent}});g(E,()=>{D.id=0,M(),N()});function k(){let{value:e}=E;return e===null?null:c.value?.querySelector(`[data-name="${e}"]`)}function ee(t){if(e.type===`card`)return;let{value:r}=u;if(!r)return;let i=r.style.opacity===`0`;if(t){let a=`${n.value}-tabs-bar--disabled`,{barWidth:o,placement:s}=e;if(t.dataset.disabled===`true`?r.classList.add(a):r.classList.remove(a),[`top`,`bottom`].includes(s)){if(j([`top`,`maxHeight`,`height`]),typeof o==`number`&&t.offsetWidth>=o){let e=Math.floor((t.offsetWidth-o)/2)+t.offsetLeft;r.style.left=`${e}px`,r.style.maxWidth=`${o}px`}else r.style.left=`${t.offsetLeft}px`,r.style.maxWidth=`${t.offsetWidth}px`;r.style.width=`8192px`,i&&(r.style.transition=`none`),r.offsetWidth,i&&(r.style.transition=``,r.style.opacity=`1`)}else{if(j([`left`,`maxWidth`,`width`]),typeof o==`number`&&t.offsetHeight>=o){let e=Math.floor((t.offsetHeight-o)/2)+t.offsetTop;r.style.top=`${e}px`,r.style.maxHeight=`${o}px`}else r.style.top=`${t.offsetTop}px`,r.style.maxHeight=`${t.offsetHeight}px`;r.style.height=`8192px`,i&&(r.style.transition=`none`),r.offsetHeight,i&&(r.style.transition=``,r.style.opacity=`1`)}}}function te(){if(e.type===`card`)return;let{value:t}=u;t&&(t.style.opacity=`0`)}function j(e){let{value:t}=u;if(t)for(let n of e)t.style[n]=``}function M(){if(e.type===`card`)return;let t=k();t?ee(t):te()}function N(){let e=h.value?.$el;if(!e)return;let t=k();if(!t)return;let{scrollLeft:n,offsetWidth:r}=e,{offsetLeft:i,offsetWidth:a}=t;n>i?e.scrollTo({top:0,left:i,behavior:`smooth`}):i+a>n+r&&e.scrollTo({top:0,left:i+a-r,behavior:`smooth`})}let P=s(null),F=0,I=null;function L(e){let t=P.value;if(t){F=e.getBoundingClientRect().height;let n=`${F}px`,r=()=>{t.style.height=n,t.style.maxHeight=n};I?(r(),I(),I=null):I=r}}function R(e){let t=P.value;if(t){let n=e.getBoundingClientRect().height,r=()=>{document.body.offsetHeight,t.style.maxHeight=`${n}px`,t.style.height=`${Math.max(F,n)}px`};I?(I(),I=null,r()):I=r}}function z(){let t=P.value;if(t){t.style.maxHeight=``,t.style.height=``;let{paneWrapperStyle:n}=e;if(typeof n==`string`)t.style.cssText=n;else if(n){let{maxHeight:e,height:r}=n;e!==void 0&&(t.style.maxHeight=e),r!==void 0&&(t.style.height=r)}}}let B={value:[]},V=s(`next`);function U(e){let t=E.value,n=`next`;for(let r of B.value){if(r===t)break;if(r===e){n=`prev`;break}}V.value=n,W(e)}function W(t){let{onActiveNameChange:n,onUpdateValue:r,"onUpdate:value":i}=e;n&&oe(n,t),r&&oe(r,t),i&&oe(i,t),T.value=t}function ae(t){let{onClose:n}=e;n&&oe(n,t)}let G=!0;function ce(){let{value:e}=u;if(!e)return;G||=!1;let t=`transition-disabled`;e.classList.add(t),M(),e.classList.remove(t)}let K=s(null);function le({transitionDisabled:e}){let t=c.value;if(!t)return;e&&t.classList.add(`transition-disabled`);let n=k();n&&K.value&&(K.value.style.width=`${n.offsetWidth}px`,K.value.style.height=`${n.offsetHeight}px`,K.value.style.transform=`translateX(${n.offsetLeft-_(getComputedStyle(t).paddingLeft)}px)`,e&&K.value.offsetWidth),e&&t.classList.remove(`transition-disabled`)}g([E],()=>{e.type===`segment`&&H(()=>{le({transitionDisabled:!1})})}),ne(()=>{e.type===`segment`&&le({transitionDisabled:!0})});let ue=0;function q(t){if(t.contentRect.width===0&&t.contentRect.height===0||ue===t.contentRect.width)return;ue=t.contentRect.width;let{type:n}=e;if((n===`line`||n===`bar`)&&(G||e.justifyContent?.startsWith(`space`))&&ce(),n!==`segment`){let{placement:t}=e;he((t===`top`||t===`bottom`?h.value?.$el:v.value)||null)}}let de=at(q,64);g([()=>e.justifyContent,()=>e.size],()=>{H(()=>{let{type:t}=e;(t===`line`||t===`bar`)&&ce()})});let J=s(!1);function Y(t){let{target:n,contentRect:{width:r,height:i}}=t,a=n.parentElement.parentElement.offsetWidth,o=n.parentElement.parentElement.offsetHeight,{placement:s}=e;if(!J.value)s===`top`||s===`bottom`?a<r&&(J.value=!0):o<i&&(J.value=!0);else{let{value:e}=m;if(!e)return;s===`top`||s===`bottom`?a-r>e.$el.offsetWidth&&(J.value=!1):o-i>e.$el.offsetHeight&&(J.value=!1)}he(h.value?.$el||null)}let pe=at(Y,64);function me(){let{onAdd:t}=e;t&&t(),H(()=>{let e=k(),{value:t}=h;!e||!t||t.scrollTo({left:e.offsetLeft,top:0,behavior:`smooth`})})}function he(t){if(!t)return;let{placement:n}=e;if(n===`top`||n===`bottom`){let{scrollLeft:e,scrollWidth:n,offsetWidth:r}=t;y.value=e<=0,b.value=e+r>=n}else{let{scrollTop:e,scrollHeight:n,offsetHeight:r}=t;y.value=e<=0,b.value=e+r>=n}}let ve=at(e=>{he(e.target)},64);f($e,{triggerRef:l(e,`trigger`),tabStyleRef:l(e,`tabStyle`),tabClassRef:l(e,`tabClass`),addTabStyleRef:l(e,`addTabStyle`),addTabClassRef:l(e,`addTabClass`),paneClassRef:l(e,`paneClass`),paneStyleRef:l(e,`paneStyle`),mergedClsPrefixRef:n,typeRef:l(e,`type`),closableRef:l(e,`closable`),valueRef:E,tabChangeIdRef:D,onBeforeLeaveRef:l(e,`onBeforeLeave`),activateTab:U,handleClose:ae,handleAdd:me}),fe(()=>{M(),N()}),se(()=>{let{value:e}=d;if(!e)return;let{value:t}=n,r=`${t}-tabs-nav-scroll-wrapper--shadow-start`,i=`${t}-tabs-nav-scroll-wrapper--shadow-end`;y.value?e.classList.remove(r):e.classList.add(r),b.value?e.classList.remove(i):e.classList.add(i)});let be={syncBarPosition:()=>{M()}},xe=()=>{le({transitionDisabled:!0})},X=A(()=>{let{value:t}=C,{type:n}=e,i=`${t}${{card:`Card`,bar:`Bar`,line:`Line`,segment:`Segment`}[n]}`,{self:{barColor:a,closeIconColor:s,closeIconColorHover:c,closeIconColorPressed:l,tabColor:u,tabBorderColor:d,paneTextColor:f,tabFontWeight:p,tabBorderRadius:m,tabFontWeightActive:h,colorSegment:g,fontWeightStrong:_,tabColorSegment:v,closeSize:y,closeIconSize:b,closeColorHover:x,closeColorPressed:w,closeBorderRadius:T,[S(`panePadding`,t)]:E,[S(`tabPadding`,i)]:D,[S(`tabPaddingVertical`,i)]:O,[S(`tabGap`,i)]:k,[S(`tabGap`,`${i}Vertical`)]:A,[S(`tabTextColor`,n)]:ee,[S(`tabTextColorActive`,n)]:te,[S(`tabTextColorHover`,n)]:ne,[S(`tabTextColorDisabled`,n)]:j,[S(`tabFontSize`,t)]:M},common:{cubicBezierEaseInOut:re}}=o.value;return{"--n-bezier":re,"--n-color-segment":g,"--n-bar-color":a,"--n-tab-font-size":M,"--n-tab-text-color":ee,"--n-tab-text-color-active":te,"--n-tab-text-color-disabled":j,"--n-tab-text-color-hover":ne,"--n-pane-text-color":f,"--n-tab-border-color":d,"--n-tab-border-radius":m,"--n-close-size":y,"--n-close-icon-size":b,"--n-close-color-hover":x,"--n-close-color-pressed":w,"--n-close-border-radius":T,"--n-close-icon-color":s,"--n-close-icon-color-hover":c,"--n-close-icon-color-pressed":l,"--n-tab-color":u,"--n-tab-font-weight":p,"--n-tab-font-weight-active":h,"--n-tab-padding":D,"--n-tab-padding-vertical":O,"--n-tab-gap":k,"--n-tab-gap-vertical":A,"--n-pane-padding-left":r(E,`left`),"--n-pane-padding-right":r(E,`right`),"--n-pane-padding-top":r(E,`top`),"--n-pane-padding-bottom":r(E,`bottom`),"--n-font-weight-strong":_,"--n-tab-color-segment":v}}),Se=i?re(`tabs`,A(()=>`${C.value[0]}${e.type[0]}`),X,e):void 0;return Object.assign({mergedClsPrefix:n,mergedValue:E,renderedNames:new Set,segmentCapsuleElRef:K,tabsPaneWrapperRef:P,tabsElRef:c,barElRef:u,addTabInstRef:m,xScrollInstRef:h,scrollWrapperElRef:d,addTabFixed:J,tabWrapperStyle:O,handleNavResize:de,mergedSize:C,handleScroll:ve,handleTabsResize:pe,cssVars:i?void 0:X,themeClass:Se?.themeClass,animationDirection:V,renderNameListRef:B,yScrollElRef:v,handleSegmentResize:xe,onAnimationBeforeLeave:L,onAnimationEnter:R,onAnimationAfterEnter:z,onRender:Se?.onRender},be)},render(){let{mergedClsPrefix:e,type:t,placement:n,addTabFixed:r,addable:i,mergedSize:a,renderNameListRef:o,onRender:s,paneWrapperClass:c,paneWrapperStyle:l,$slots:{default:u,prefix:d,suffix:f}}=this;s?.();let p=u?ge(u()).filter(e=>e.type.__TAB_PANE__===!0):[],m=u?ge(u()).filter(e=>e.type.__TAB__===!0):[],h=!m.length,g=t===`card`,_=t===`segment`,v=!g&&!_&&this.justifyContent;o.value=[];let y=()=>{let t=W(`div`,{style:this.tabWrapperStyle,class:`${e}-tabs-wrapper`},v?null:W(`div`,{class:`${e}-tabs-scroll-padding`,style:n===`top`||n===`bottom`?{width:`${this.tabsPadding}px`}:{height:`${this.tabsPadding}px`}}),h?p.map((e,t)=>(o.value.push(e.props.name),dt(W(rt,Object.assign({},e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0&&(!v||v===`center`||v===`start`||v===`end`)}),e.children?{default:e.children.tab}:void 0)))):m.map((e,t)=>(o.value.push(e.props.name),dt(t!==0&&!v?ut(e):e))),!r&&i&&g?lt(i,(h?p.length:m.length)!==0):null,v?null:W(`div`,{class:`${e}-tabs-scroll-padding`,style:{width:`${this.tabsPadding}px`}}));return W(`div`,{ref:`tabsElRef`,class:`${e}-tabs-nav-scroll-content`},g&&i?W(U,{onResize:this.handleTabsResize},{default:()=>t}):t,g?W(`div`,{class:`${e}-tabs-pad`}):null,g?null:W(`div`,{ref:`barElRef`,class:`${e}-tabs-bar`}))},b=_?`top`:n;return W(`div`,{class:[`${e}-tabs`,this.themeClass,`${e}-tabs--${t}-type`,`${e}-tabs--${a}-size`,v&&`${e}-tabs--flex`,`${e}-tabs--${b}`],style:this.cssVars},W(`div`,{class:[`${e}-tabs-nav--${t}-type`,`${e}-tabs-nav--${b}`,`${e}-tabs-nav`]},V(d,t=>t&&W(`div`,{class:`${e}-tabs-nav__prefix`},t)),_?W(U,{onResize:this.handleSegmentResize},{default:()=>W(`div`,{class:`${e}-tabs-rail`,ref:`tabsElRef`},W(`div`,{class:`${e}-tabs-capsule`,ref:`segmentCapsuleElRef`},W(`div`,{class:`${e}-tabs-wrapper`},W(`div`,{class:`${e}-tabs-tab`}))),h?p.map((e,t)=>(o.value.push(e.props.name),W(rt,Object.assign({},e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0}),e.children?{default:e.children.tab}:void 0))):m.map((e,t)=>(o.value.push(e.props.name),t===0?e:ut(e))))}):W(U,{onResize:this.handleNavResize},{default:()=>W(`div`,{class:`${e}-tabs-nav-scroll-wrapper`,ref:`scrollWrapperElRef`},[`top`,`bottom`].includes(b)?W(Oe,{ref:`xScrollInstRef`,onScroll:this.handleScroll},{default:y}):W(`div`,{class:`${e}-tabs-nav-y-scroll`,onScroll:this.handleScroll,ref:`yScrollElRef`},y()))}),r&&i&&g?lt(i,!0):null,V(f,t=>t&&W(`div`,{class:`${e}-tabs-nav__suffix`},t))),h&&(this.animated&&(b===`top`||b===`bottom`)?W(`div`,{ref:`tabsPaneWrapperRef`,style:l,class:[`${e}-tabs-pane-wrapper`,c]},ct(p,this.mergedValue,this.renderedNames,this.onAnimationBeforeLeave,this.onAnimationEnter,this.onAnimationAfterEnter,this.animationDirection)):ct(p,this.mergedValue,this.renderedNames)))}});function ct(e,t,n,r,i,a,o){let s=[];return e.forEach(e=>{let{name:r,displayDirective:i,"display-directive":a}=e.props,o=e=>i===e||a===e,c=t===r;if(e.key!==void 0&&(e.key=r),c||o(`show`)||o(`show:lazy`)&&n.has(r)){n.has(r)||n.add(r);let t=!o(`if`);s.push(t?b(e,[[te,c]]):e)}}),o?W(F,{name:`${o}-transition`,onBeforeLeave:r,onEnter:i,onAfterEnter:a},{default:()=>s}):s}function lt(e,t){return W(rt,{ref:`addTabInstRef`,key:`__addable`,name:`__addable`,internalCreatedByPane:!0,internalAddable:!0,internalLeftPadded:t,disabled:typeof e==`object`&&e.disabled})}function ut(e){let t=O(e);return t.props?t.props.internalLeftPadded=!0:t.props={internalLeftPadded:!0},t}function dt(e){return Array.isArray(e.dynamicProps)?e.dynamicProps.includes(`internalLeftPadded`)||e.dynamicProps.push(`internalLeftPadded`):e.dynamicProps=[`internalLeftPadded`],e}var $={containers:()=>z.get(`/api/docker/containers`),containerAction:(e,t)=>z.post(`/api/docker/containers/${encodeURIComponent(e)}/${t}`),images:()=>z.get(`/api/docker/images`),removeImage:e=>z.post(`/api/docker/images/${encodeURIComponent(e)}/remove`),volumes:()=>z.get(`/api/docker/volumes`),removeVolume:e=>z.post(`/api/docker/volumes/${encodeURIComponent(e)}/remove`),networks:()=>z.get(`/api/docker/networks`),removeNetwork:e=>z.post(`/api/docker/networks/${encodeURIComponent(e)}/remove`),settings:()=>z.get(`/api/docker/settings`),prune:e=>z.post(`/api/docker/prune/${e}`)},ft={key:1,class:`tab-loading`},pt=ve(G({__name:`DockerView`,setup(e){let r=Se();function i(e){return e instanceof P&&e.status===503&&!!e.body&&typeof e.body==`object`&&`enabled`in e.body}function a(e,t){r.error(e instanceof P?e.message:t)}let o=e=>e===`running`?`success`:e===`paused`||e===`restarting`?`warning`:e===`dead`?`error`:`default`,c=s([]),l=s(!0),u=s(null),f;async function p(){try{let e=await $.containers();c.value=e.containers,u.value=null}catch(e){i(e)&&(u.value=e.body)}finally{l.value=!1}}async function h(e,t){try{let n=await $.containerAction(e,t);c.value=n.containers}catch(e){a(e,`Aksi ${t} gagal`)}}let _=[{title:`Nama`,key:`name`,width:160,ellipsis:{tooltip:!0}},{title:`Image`,key:`image`,width:180,ellipsis:{tooltip:!0}},{title:`Status`,key:`state`,width:130,render:e=>W(K,{type:o(e.state),size:`small`},{default:()=>e.status})},{title:`CPU`,key:`cpu`,width:70,render:e=>e.hasStats?`${e.stats.cpuPercent.toFixed(1)}%`:`—`},{title:`RAM`,key:`ram`,width:150,render:e=>e.hasStats?`${Z(e.stats.memUsageBytes)} / ${Z(e.stats.memLimitBytes)}`:`—`},{title:`Network`,key:`net`,width:140,render:e=>e.hasStats?`↓ ${Z(e.stats.netRxBytes)} ↑ ${Z(e.stats.netTxBytes)}`:`—`},{title:`Ports`,key:`ports`,width:220,ellipsis:{tooltip:!0}},{title:`Aksi`,key:`actions`,width:220,fixed:`right`,render:e=>W(q,{size:`small`},()=>[e.state===`running`?[W(M,{size:`tiny`,onClick:()=>h(e.id,`stop`)},()=>`Stop`),W(M,{size:`tiny`,onClick:()=>h(e.id,`restart`)},()=>`Restart`)]:W(M,{size:`tiny`,type:`primary`,onClick:()=>h(e.id,`start`)},()=>`Start`),W(Y,{onPositiveClick:()=>h(e.id,`remove`)},{trigger:()=>W(M,{size:`tiny`,type:`error`,ghost:!0},()=>`Hapus`),default:()=>`Hapus container "${e.name}"?`})])}],v=s([]),y=s(!0),b=s(null);async function x(){y.value=!0;try{let e=await $.images();v.value=e.images,b.value=null}catch(e){i(e)&&(b.value=e.body)}finally{y.value=!1}}async function S(e){try{let t=await $.removeImage(e);v.value=t.images}catch(e){a(e,`Hapus image gagal (mungkin masih dipakai container)`)}}let C=[{title:`Tag`,key:`tag`,render:e=>e.dangling?W(q,{size:`small`,align:`center`},()=>[e.tag,W(K,{size:`small`,type:`warning`},()=>`dangling`)]):e.tag},{title:`Ukuran`,key:`sizeBytes`,render:e=>Z(e.sizeBytes)},{title:`Dipakai`,key:`containers`,render:e=>e.containers<0?`—`:e.containers===0?`tidak dipakai`:`${e.containers} container`},{title:`Dibuat`,key:`created`,render:e=>Ee(e.created)},{title:`Aksi`,key:`actions`,render:e=>W(Y,{onPositiveClick:()=>S(e.id)},{trigger:()=>W(M,{size:`tiny`,type:`error`,ghost:!0},()=>`Hapus`),default:()=>`Hapus image "${e.tag}"?`})}],T=s([]),O=s(!0),A=s(null);async function te(){O.value=!0;try{let e=await $.volumes();T.value=e.volumes,A.value=null}catch(e){i(e)&&(A.value=e.body)}finally{O.value=!1}}async function j(e){try{let t=await $.removeVolume(e);T.value=t.volumes}catch(e){a(e,`Hapus volume gagal (mungkin masih dipakai container)`)}}let re=[{title:`Nama`,key:`name`},{title:`Driver`,key:`driver`},{title:`Ukuran`,key:`sizeBytes`,render:e=>e.sizeBytes<0?`tidak diketahui`:Z(e.sizeBytes)},{title:`Status`,key:`inUse`,render:e=>W(K,{size:`small`,type:e.inUse?`success`:`default`},()=>e.inUse?`dipakai`:`tidak dipakai`)},{title:`Aksi`,key:`actions`,render:e=>W(Y,{onPositiveClick:()=>j(e.name)},{trigger:()=>W(M,{size:`tiny`,type:`error`,ghost:!0},()=>`Hapus`),default:()=>`Hapus volume "${e.name}"?`})}],F=s([]),I=s(!0),L=s(null);async function R(){I.value=!0;try{let e=await $.networks();F.value=e.networks,L.value=null}catch(e){i(e)&&(L.value=e.body)}finally{I.value=!1}}async function z(e){try{let t=await $.removeNetwork(e);F.value=t.networks}catch(e){a(e,`Hapus network gagal (mungkin builtin atau masih dipakai)`)}}let ie=[{title:`Nama`,key:`name`,render:e=>e.builtin?W(q,{size:`small`,align:`center`},()=>[e.name,W(K,{size:`small`},()=>`builtin`)]):e.name},{title:`Driver`,key:`driver`},{title:`Subnet`,key:`subnet`,render:e=>e.subnet||`—`},{title:`Container Terhubung`,key:`connectedCount`},{title:`Aksi`,key:`actions`,render:e=>e.builtin?null:W(Y,{onPositiveClick:()=>z(e.id)},{trigger:()=>W(M,{size:`tiny`,type:`error`,ghost:!0},()=>`Hapus`),default:()=>`Hapus network "${e.name}"?`})}],V=s(null),H=s(!0),U=s(null),ae=s(null);async function G(){H.value=!0;try{V.value=await $.settings(),U.value=null}catch(e){i(e)&&(U.value=e.body)}finally{H.value=!1}}async function oe(e){ae.value=e;try{V.value=await $.prune(e),r.success(`Cleanup selesai`)}catch(t){a(t,`Cleanup gagal: ${e}`)}finally{ae.value=null}}let se=s(`containers`),ce=new Set([`containers`]);return g(se,e=>{ce.has(e)||(ce.add(e),e===`images`?x():e===`volumes`?te():e===`networks`?R():e===`settings`&&G())}),ne(()=>{p(),f=setInterval(p,5e3)}),t(()=>{f&&clearInterval(f)}),(e,t)=>(d(),N(be,null,{default:n(()=>[B(w(st),{type:`line`,value:se.value,"onUpdate:value":t[0]||=e=>se.value=e},{default:n(()=>[B(w(tt),{name:`containers`,tab:`Containers`},{default:n(()=>[u.value?(d(),N(w(X),{key:0,type:`warning`,title:u.value.error},null,8,[`title`])):(d(),N(w(J),{key:1,columns:_,data:c.value,loading:l.value,"row-key":e=>e.id,"scroll-x":1200},null,8,[`data`,`loading`,`row-key`]))]),_:1}),B(w(tt),{name:`images`,tab:`Images`},{default:n(()=>[b.value?(d(),N(w(X),{key:0,type:`warning`,title:b.value.error},null,8,[`title`])):(d(),N(w(J),{key:1,columns:C,data:v.value,loading:y.value,"row-key":e=>e.id},null,8,[`data`,`loading`,`row-key`]))]),_:1}),B(w(tt),{name:`volumes`,tab:`Volumes`},{default:n(()=>[A.value?(d(),N(w(X),{key:0,type:`warning`,title:A.value.error},null,8,[`title`])):(d(),N(w(J),{key:1,columns:re,data:T.value,loading:O.value,"row-key":e=>e.name},null,8,[`data`,`loading`,`row-key`]))]),_:1}),B(w(tt),{name:`networks`,tab:`Networks`},{default:n(()=>[L.value?(d(),N(w(X),{key:0,type:`warning`,title:L.value.error},null,8,[`title`])):(d(),N(w(J),{key:1,columns:ie,data:F.value,loading:I.value,"row-key":e=>e.id},null,8,[`data`,`loading`,`row-key`]))]),_:1}),B(w(tt),{name:`settings`,tab:`Settings`},{default:n(()=>[U.value?(d(),N(w(X),{key:0,type:`warning`,title:U.value.error},null,8,[`title`])):H.value&&!V.value?(d(),ee(`div`,ft,[B(w(Te),{size:`large`})])):V.value?(d(),N(w(q),{key:3,vertical:``,size:24},{default:n(()=>[B(w(Ze),{title:`Info Daemon`,column:2,bordered:``,"label-placement":`left`},{default:n(()=>[B(w(Q),{label:`Versi Server`},{default:n(()=>[E(k(V.value?.info.serverVersion),1)]),_:1}),B(w(Q),{label:`OS / Kernel`},{default:n(()=>[E(k(V.value?.info.operatingSystem)+` / `+k(V.value?.info.kernelVersion),1)]),_:1}),B(w(Q),{label:`Storage Driver`},{default:n(()=>[E(k(V.value?.info.storageDriver),1)]),_:1}),B(w(Q),{label:`Root Dir`},{default:n(()=>[E(k(V.value?.info.dockerRootDir),1)]),_:1}),B(w(Q),{label:`Container`},{default:n(()=>[E(k(V.value?.info.containersRunning)+` running, `+k(V.value?.info.containersPaused)+` paused, `+k(V.value?.info.containersStopped)+` stopped `,1)]),_:1}),B(w(Q),{label:`Images`},{default:n(()=>[E(k(V.value?.info.images),1)]),_:1})]),_:1}),B(w(Ze),{title:`Disk Usage`,column:2,bordered:``,"label-placement":`left`},{default:n(()=>[B(w(Q),{label:`Images`},{default:n(()=>[E(k(w(Z)(V.value?.diskUsage.imagesTotalBytes??0))+` (reclaimable `+k(w(Z)(V.value?.diskUsage.imagesReclaimableBytes??0))+`) `,1)]),_:1}),B(w(Q),{label:`Containers`},{default:n(()=>[E(k(w(Z)(V.value?.diskUsage.containersTotalBytes??0)),1)]),_:1}),B(w(Q),{label:`Volumes`},{default:n(()=>[E(k(w(Z)(V.value?.diskUsage.volumesTotalBytes??0))+` (reclaimable `+k(w(Z)(V.value?.diskUsage.volumesReclaimableBytes??0))+`) `,1)]),_:1})]),_:1}),B(w(q),null,{default:n(()=>[(d(),ee(D,null,m([`containers`,`images`,`volumes`,`networks`,`all`],e=>B(w(Y),{key:e,onPositiveClick:t=>oe(e)},{trigger:n(()=>[B(w(M),{size:`small`,loading:ae.value===e},{default:n(()=>[E(`Bersihkan `+k(e),1)]),_:2},1032,[`loading`])]),default:n(()=>[E(` Jalankan cleanup "`+k(e)+`"? Tindakan ini tidak bisa dibatalkan. `,1)]),_:2},1032,[`onPositiveClick`])),64))]),_:1})]),_:1})):(d(),N(w(de),{key:2,description:`Tidak ada data`}))]),_:1})]),_:1},8,[`value`])]),_:1}))}}),[[`__scopeId`,`data-v-961296c9`]]);export{pt as default};