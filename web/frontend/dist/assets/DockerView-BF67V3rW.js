import{$ as e,$t as t,Bt as n,Dn as r,E as i,En as a,Et as o,Fn as s,Ft as c,Hn as l,Ht as u,In as d,Jn as f,Kt as p,Ln as m,Mn as h,Nn as g,O as _,Qt as v,S as y,Sn as b,Tn as x,Un as S,Vn as C,Wn as w,Xt as T,Yt as E,Zn as D,Zt as O,_n as k,an as A,bn as j,dn as M,en as N,er as P,hn as F,kt as ee,l as I,lt as te,mn as L,n as R,nt as z,ot as B,qt as V,rr as H,sn as ne,ut as re,vt as U,wn as W,wt as G,xn as K,xt as ie,yn as ae,yt as q}from"./auth-C3tLNBl0.js";import{C as oe,_ as se,g as J,t as ce,u as le,w as ue}from"./AppShell-C312L2Qg.js";import{a as de,n as fe,o as Y,r as pe,t as me}from"./Popconfirm-B4aXM1MW.js";import{f as he}from"./useTheme-CkXqk_DM.js";import{c as ge,t as _e}from"./_plugin-vue_export-helper-OW_rLE0U.js";import{D as ve,E as ye}from"./light-BTYCES0c.js";import{t as be}from"./get-slot-6kXJmSMP.js";import{t as xe}from"./Add-n2QzB1Pj.js";import{t as X}from"./Alert-C1mMEZMU.js";import{t as Se}from"./use-message-HBDEeiPn.js";import{n as Ce,r as we}from"./light-DJEmH_lZ.js";import{t as Z}from"./docker-h2478yAS.js";import{n as Te,t as Q}from"./format-BxLcbkc3.js";var Ee=J(`.v-x-scroll`,{overflow:`auto`,scrollbarWidth:`none`},[J(`&::-webkit-scrollbar`,{width:0,height:0})]),De=b({name:`XScroll`,props:{disabled:Boolean,onScroll:Function},setup(){let e=f(null);function t(e){!(e.currentTarget.offsetWidth<e.currentTarget.scrollWidth)||e.deltaY===0||(e.currentTarget.scrollLeft+=e.deltaY+e.deltaX,e.preventDefault())}let n=o();return Ee.mount({id:`vueuc/x-scroll`,head:!0,anchorMetaName:se,ssr:n}),Object.assign({selfRef:e,handleWheel:t},{scrollTo(...t){var n;(n=e.value)==null||n.scrollTo(...t)}})},render(){return W(`div`,{ref:`selfRef`,onScroll:this.onScroll,onWheel:this.disabled?void 0:this.handleWheel,class:`v-x-scroll`},this.$slots)}});function Oe(e,t=`default`,n=[]){let{children:r}=e;if(typeof r==`object`&&r&&!Array.isArray(r)){let e=r[t];if(typeof e==`function`)return e()}return n}var ke=/\s/;function Ae(e){for(var t=e.length;t--&&ke.test(e.charAt(t)););return t}var je=/^\s+/;function Me(e){return e&&e.slice(0,Ae(e)+1).replace(je,``)}var Ne=NaN,Pe=/^[-+]0x[0-9a-f]+$/i,Fe=/^0b[01]+$/i,Ie=/^0o[0-7]+$/i,Le=parseInt;function Re(t){if(typeof t==`number`)return t;if(z(t))return Ne;if(e(t)){var n=typeof t.valueOf==`function`?t.valueOf():t;t=e(n)?n+``:n}if(typeof t!=`string`)return t===0?t:+t;t=Me(t);var r=Fe.test(t);return r||Ie.test(t)?Le(t.slice(2),r?2:8):Pe.test(t)?Ne:+t}var ze=function(){return B.Date.now()},Be=`Expected a function`,Ve=Math.max,He=Math.min;function Ue(t,n,r){var i,a,o,s,c,l,u=0,d=!1,f=!1,p=!0;if(typeof t!=`function`)throw TypeError(Be);n=Re(n)||0,e(r)&&(d=!!r.leading,f=`maxWait`in r,o=f?Ve(Re(r.maxWait)||0,n):o,p=`trailing`in r?!!r.trailing:p);function m(e){var n=i,r=a;return i=a=void 0,u=e,s=t.apply(r,n),s}function h(e){return u=e,c=setTimeout(v,n),d?m(e):s}function g(e){var t=e-l,r=e-u,i=n-t;return f?He(i,o-r):i}function _(e){var t=e-l,r=e-u;return l===void 0||t>=n||t<0||f&&r>=o}function v(){var e=ze();if(_(e))return y(e);c=setTimeout(v,g(e))}function y(e){return c=void 0,p&&i?m(e):(i=a=void 0,s)}function b(){c!==void 0&&clearTimeout(c),u=0,i=l=a=c=void 0}function x(){return c===void 0?s:y(ze())}function S(){var e=ze(),t=_(e);if(i=arguments,a=this,l=e,t){if(c===void 0)return h(l);if(f)return clearTimeout(c),c=setTimeout(v,n),m(l)}return c===void 0&&(c=setTimeout(v,n)),s}return S.cancel=b,S.flush=x,S}var We=`Expected a function`;function Ge(t,n,r){var i=!0,a=!0;if(typeof t!=`function`)throw TypeError(We);return e(r)&&(i=`leading`in r?!!r.leading:i,a=`trailing`in r?!!r.trailing:a),Ue(t,n,{leading:i,maxWait:n,trailing:a})}var Ke=p([V(`descriptions`,{fontSize:`var(--n-font-size)`},[V(`descriptions-separator`,`
 display: inline-block;
 margin: 0 8px 0 2px;
 `),V(`descriptions-table-wrapper`,[V(`descriptions-table`,[V(`descriptions-table-row`,[V(`descriptions-table-header`,{padding:`var(--n-th-padding)`}),V(`descriptions-table-content`,{padding:`var(--n-td-padding)`})])])]),O(`bordered`,[V(`descriptions-table-wrapper`,[V(`descriptions-table`,[V(`descriptions-table-row`,[p(`&:last-child`,[V(`descriptions-table-content`,{paddingBottom:0})])])])])]),T(`left-label-placement`,[V(`descriptions-table-content`,[p(`> *`,{verticalAlign:`top`})])]),T(`left-label-align`,[p(`th`,{textAlign:`left`})]),T(`center-label-align`,[p(`th`,{textAlign:`center`})]),T(`right-label-align`,[p(`th`,{textAlign:`right`})]),T(`bordered`,[V(`descriptions-table-wrapper`,`
 border-radius: var(--n-border-radius);
 overflow: hidden;
 background: var(--n-merged-td-color);
 border: 1px solid var(--n-merged-border-color);
 `,[V(`descriptions-table`,[V(`descriptions-table-row`,[p(`&:not(:last-child)`,[V(`descriptions-table-content`,{borderBottom:`1px solid var(--n-merged-border-color)`}),V(`descriptions-table-header`,{borderBottom:`1px solid var(--n-merged-border-color)`})]),V(`descriptions-table-header`,`
 font-weight: 400;
 background-clip: padding-box;
 background-color: var(--n-merged-th-color);
 `,[p(`&:not(:last-child)`,{borderRight:`1px solid var(--n-merged-border-color)`})]),V(`descriptions-table-content`,[p(`&:not(:last-child)`,{borderRight:`1px solid var(--n-merged-border-color)`})])])])])]),V(`descriptions-header`,`
 font-weight: var(--n-th-font-weight);
 font-size: 18px;
 transition: color .3s var(--n-bezier);
 line-height: var(--n-line-height);
 margin-bottom: 16px;
 color: var(--n-title-text-color);
 `),V(`descriptions-table-wrapper`,`
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[V(`descriptions-table`,`
 width: 100%;
 border-collapse: separate;
 border-spacing: 0;
 box-sizing: border-box;
 `,[V(`descriptions-table-row`,`
 box-sizing: border-box;
 transition: border-color .3s var(--n-bezier);
 `,[V(`descriptions-table-header`,`
 font-weight: var(--n-th-font-weight);
 line-height: var(--n-line-height);
 display: table-cell;
 box-sizing: border-box;
 color: var(--n-th-text-color);
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `),V(`descriptions-table-content`,`
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
 `)])])])]),V(`descriptions-table-wrapper`,`
 --n-merged-th-color: var(--n-th-color);
 --n-merged-td-color: var(--n-td-color);
 --n-merged-border-color: var(--n-border-color);
 `),t(V(`descriptions-table-wrapper`,`
 --n-merged-th-color: var(--n-th-color-modal);
 --n-merged-td-color: var(--n-td-color-modal);
 --n-merged-border-color: var(--n-border-color-modal);
 `)),N(V(`descriptions-table-wrapper`,`
 --n-merged-th-color: var(--n-th-color-popover);
 --n-merged-td-color: var(--n-td-color-popover);
 --n-merged-border-color: var(--n-border-color-popover);
 `))]),qe=`DESCRIPTION_ITEM_FLAG`;function Je(e){return typeof e==`object`&&e&&!Array.isArray(e)?e.type&&e.type.DESCRIPTION_ITEM_FLAG:!1}var Ye=Object.assign(Object.assign({},_.props),{title:String,column:{type:Number,default:3},columns:Number,labelPlacement:{type:String,default:`top`},labelAlign:{type:String,default:`left`},separator:{type:String,default:`:`},size:String,bordered:Boolean,labelClass:String,labelStyle:[Object,String],contentClass:String,contentStyle:[Object,String]}),Xe=b({name:`Descriptions`,props:Ye,slots:Object,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n,mergedComponentPropsRef:r}=re(e),i=F(()=>e.size||r?.value?.Descriptions?.size||`medium`),a=_(`Descriptions`,`-descriptions`,Ke,we,e,t),o=F(()=>{let{bordered:t}=e,n=i.value,{common:{cubicBezierEaseInOut:r},self:{titleTextColor:o,thColor:s,thColorModal:c,thColorPopover:l,thTextColor:u,thFontWeight:d,tdTextColor:f,tdColor:p,tdColorModal:m,tdColorPopover:h,borderColor:g,borderColorModal:_,borderColorPopover:y,borderRadius:b,lineHeight:x,[v(`fontSize`,n)]:S,[v(t?`thPaddingBordered`:`thPadding`,n)]:C,[v(t?`tdPaddingBordered`:`tdPadding`,n)]:w}}=a.value;return{"--n-title-text-color":o,"--n-th-padding":C,"--n-td-padding":w,"--n-font-size":S,"--n-bezier":r,"--n-th-font-weight":d,"--n-line-height":x,"--n-th-text-color":u,"--n-td-text-color":f,"--n-th-color":s,"--n-th-color-modal":c,"--n-th-color-popover":l,"--n-td-color":p,"--n-td-color-modal":m,"--n-td-color-popover":h,"--n-border-radius":b,"--n-border-color":g,"--n-border-color-modal":_,"--n-border-color-popover":y}}),s=n?te(`descriptions`,F(()=>{let t=``,{bordered:n}=e;return n&&(t+=`a`),t+=i.value[0],t}),o,e):void 0;return{mergedClsPrefix:t,cssVars:n?void 0:o,themeClass:s?.themeClass,onRender:s?.onRender,compitableColumn:oe(e,[`columns`,`column`]),inlineThemeDisabled:n,mergedSize:i}},render(){let e=this.$slots.default,t=e?he(e()):[];t.length;let{contentClass:n,labelClass:r,compitableColumn:i,labelPlacement:a,labelAlign:o,mergedSize:s,bordered:l,title:u,cssVars:d,mergedClsPrefix:f,separator:p,onRender:m}=this;m?.();let h=t.filter(e=>Je(e)),g=h.reduce((e,t,o)=>{let s=t.props||{},c=h.length-1===o,u=[`label`in s?s.label:Oe(t,`label`)],d=[Oe(t)],m=s.span||1,g=e.span;e.span+=m;let _=s.labelStyle||s[`label-style`]||this.labelStyle,v=s.contentStyle||s[`content-style`]||this.contentStyle;if(a===`left`)l?e.row.push(W(`th`,{class:[`${f}-descriptions-table-header`,r],colspan:1,style:_},u),W(`td`,{class:[`${f}-descriptions-table-content`,n],colspan:c?(i-g)*2+1:m*2-1,style:v},d)):e.row.push(W(`td`,{class:`${f}-descriptions-table-content`,colspan:c?(i-g)*2:m*2},W(`span`,{class:[`${f}-descriptions-table-content__label`,r],style:_},[...u,p&&W(`span`,{class:`${f}-descriptions-separator`},p)]),W(`span`,{class:[`${f}-descriptions-table-content__content`,n],style:v},d)));else{let t=c?(i-g)*2:m*2;e.row.push(W(`th`,{class:[`${f}-descriptions-table-header`,r],colspan:t,style:_},u)),e.secondRow.push(W(`td`,{class:[`${f}-descriptions-table-content`,n],colspan:t,style:v},d))}return(e.span>=i||c)&&(e.span=0,e.row.length&&(e.rows.push(e.row),e.row=[]),a!==`left`&&e.secondRow.length&&(e.rows.push(e.secondRow),e.secondRow=[])),e},{span:0,row:[],secondRow:[],rows:[]}).rows.map(e=>W(`tr`,{class:`${f}-descriptions-table-row`},e));return W(`div`,{style:d,class:[`${f}-descriptions`,this.themeClass,`${f}-descriptions--${a}-label-placement`,`${f}-descriptions--${o}-label-align`,`${f}-descriptions--${s}-size`,l&&`${f}-descriptions--bordered`]},u||this.$slots.header?W(`div`,{class:`${f}-descriptions-header`},u||be(this,`header`)):null,W(`div`,{class:`${f}-descriptions-table-wrapper`},W(`table`,{class:`${f}-descriptions-table`},W(`tbody`,null,a===`top`&&W(`tr`,{class:`${f}-descriptions-table-row`,style:{visibility:`collapse`}},c(i*2,W(`td`,null))),g))))}}),Ze={label:String,span:{type:Number,default:1},labelClass:String,labelStyle:[Object,String],contentClass:String,contentStyle:[Object,String]},$=b({name:`DescriptionsItem`,[qe]:!0,props:Ze,slots:Object,render(){return null}}),Qe=ee(`n-tabs`),$e={tab:[String,Number,Object,Function],name:{type:[String,Number],required:!0},disabled:Boolean,displayDirective:{type:String,default:`if`},closable:{type:Boolean,default:void 0},tabProps:Object,label:[String,Number,Object,Function]},et=b({__TAB_PANE__:!0,name:`TabPane`,alias:[`TabPanel`],props:$e,slots:Object,setup(e){let t=x(Qe,null);return t||ie(`tab-pane`,"`n-tab-pane` must be placed inside `n-tabs`."),{style:t.paneStyleRef,class:t.paneClassRef,mergedClsPrefix:t.mergedClsPrefixRef}},render(){return W(`div`,{class:[`${this.mergedClsPrefix}-tab-pane`,this.class],style:this.style},this.$slots)}}),tt=Object.assign({internalLeftPadded:Boolean,internalAddable:Boolean,internalCreatedByPane:Boolean},ve($e,[`displayDirective`])),nt=b({__TAB__:!0,inheritAttrs:!1,name:`Tab`,props:tt,setup(e){let{mergedClsPrefixRef:t,valueRef:n,typeRef:r,closableRef:i,tabStyleRef:a,addTabStyleRef:o,tabClassRef:s,addTabClassRef:c,tabChangeIdRef:l,onBeforeLeaveRef:u,triggerRef:d,handleAdd:f,activateTab:p,handleClose:m}=x(Qe);return{trigger:d,mergedClosable:F(()=>{if(e.internalAddable)return!1;let{closable:t}=e;return t===void 0?i.value:t}),style:a,addStyle:o,tabClass:s,addTabClass:c,clsPrefix:t,value:n,type:r,handleClose(t){t.stopPropagation(),!e.disabled&&m(e.name)},activateTab(){if(e.disabled)return;if(e.internalAddable){f();return}let{name:t}=e,r=++l.id;if(t!==n.value){let{value:i}=u;i?Promise.resolve(i(e.name,n.value)).then(e=>{e&&l.id===r&&p(t)}):p(t)}}}},render(){let{internalAddable:e,clsPrefix:t,name:n,disabled:r,label:o,tab:s,value:c,mergedClosable:l,trigger:u,$slots:{default:d}}=this,f=o??s;return W(`div`,{class:`${t}-tabs-tab-wrapper`},this.internalLeftPadded?W(`div`,{class:`${t}-tabs-tab-pad`}):null,W(`div`,Object.assign({key:n,"data-name":n,"data-disabled":r?!0:void 0},a({class:[`${t}-tabs-tab`,c===n&&`${t}-tabs-tab--active`,r&&`${t}-tabs-tab--disabled`,l&&`${t}-tabs-tab--closable`,e&&`${t}-tabs-tab--addable`,e?this.addTabClass:this.tabClass],onClick:u===`click`?this.activateTab:void 0,onMouseenter:u===`hover`?this.activateTab:void 0,style:e?this.addStyle:this.style},this.internalCreatedByPane?this.tabProps||{}:this.$attrs)),W(`span`,{class:`${t}-tabs-tab__label`},e?W(M,null,W(`div`,{class:`${t}-tabs-tab__height-placeholder`},`\xA0`),W(i,{clsPrefix:t},{default:()=>W(xe,null)})):d?d():typeof f==`object`?f:ye(f??n)),l&&this.type===`card`?W(y,{clsPrefix:t,class:`${t}-tabs-tab__close`,onClick:this.handleClose,disabled:r}):null))}}),rt=V(`tabs`,`
 box-sizing: border-box;
 width: 100%;
 display: flex;
 flex-direction: column;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
`,[T(`segment-type`,[V(`tabs-rail`,[p(`&.transition-disabled`,[V(`tabs-capsule`,`
 transition: none;
 `)])])]),T(`top`,[V(`tab-pane`,`
 padding: var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left);
 `)]),T(`left`,[V(`tab-pane`,`
 padding: var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left) var(--n-pane-padding-top);
 `)]),T(`left, right`,`
 flex-direction: row;
 `,[V(`tabs-bar`,`
 width: 2px;
 right: 0;
 transition:
 top .2s var(--n-bezier),
 max-height .2s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `),V(`tabs-tab`,`
 padding: var(--n-tab-padding-vertical); 
 `)]),T(`right`,`
 flex-direction: row-reverse;
 `,[V(`tab-pane`,`
 padding: var(--n-pane-padding-left) var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom);
 `),V(`tabs-bar`,`
 left: 0;
 `)]),T(`bottom`,`
 flex-direction: column-reverse;
 justify-content: flex-end;
 `,[V(`tab-pane`,`
 padding: var(--n-pane-padding-bottom) var(--n-pane-padding-right) var(--n-pane-padding-top) var(--n-pane-padding-left);
 `),V(`tabs-bar`,`
 top: 0;
 `)]),V(`tabs-rail`,`
 position: relative;
 padding: 3px;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 background-color: var(--n-color-segment);
 transition: background-color .3s var(--n-bezier);
 display: flex;
 align-items: center;
 `,[V(`tabs-capsule`,`
 border-radius: var(--n-tab-border-radius);
 position: absolute;
 pointer-events: none;
 background-color: var(--n-tab-color-segment);
 box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .08);
 transition: transform 0.3s var(--n-bezier);
 `),V(`tabs-tab-wrapper`,`
 flex-basis: 0;
 flex-grow: 1;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[V(`tabs-tab`,`
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
 `)])])]),T(`flex`,[V(`tabs-nav`,`
 width: 100%;
 position: relative;
 `,[V(`tabs-wrapper`,`
 width: 100%;
 `,[V(`tabs-tab`,`
 margin-right: 0;
 `)])])]),V(`tabs-nav`,`
 box-sizing: border-box;
 line-height: 1.5;
 display: flex;
 transition: border-color .3s var(--n-bezier);
 `,[E(`prefix, suffix`,`
 display: flex;
 align-items: center;
 `),E(`prefix`,`padding-right: 16px;`),E(`suffix`,`padding-left: 16px;`)]),T(`top, bottom`,[p(`>`,[V(`tabs-nav`,[V(`tabs-nav-scroll-wrapper`,[p(`&::before`,`
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
 `)])])])])]),T(`left, right`,[V(`tabs-nav-scroll-content`,`
 flex-direction: column;
 `),p(`>`,[V(`tabs-nav`,[V(`tabs-nav-scroll-wrapper`,[p(`&::before`,`
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
 `)])])])])]),V(`tabs-nav-scroll-wrapper`,`
 flex: 1;
 position: relative;
 overflow: hidden;
 `,[V(`tabs-nav-y-scroll`,`
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
 `)]),V(`tabs-nav-scroll-content`,`
 display: flex;
 position: relative;
 min-width: 100%;
 min-height: 100%;
 width: fit-content;
 box-sizing: border-box;
 `),V(`tabs-wrapper`,`
 display: inline-flex;
 flex-wrap: nowrap;
 position: relative;
 `),V(`tabs-tab-wrapper`,`
 display: flex;
 flex-wrap: nowrap;
 flex-shrink: 0;
 flex-grow: 0;
 `),V(`tabs-tab`,`
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
 `)]),V(`tabs-bar`,`
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
 `)]),V(`tabs-pane-wrapper`,`
 position: relative;
 overflow: hidden;
 transition: max-height .2s var(--n-bezier);
 `),V(`tab-pane`,`
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
 `)]),V(`tabs-tab-pad`,`
 box-sizing: border-box;
 width: var(--n-tab-gap);
 flex-grow: 0;
 flex-shrink: 0;
 `),T(`line-type, bar-type`,[V(`tabs-tab`,`
 font-weight: var(--n-tab-font-weight);
 box-sizing: border-box;
 vertical-align: bottom;
 `,[p(`&:hover`,{color:`var(--n-tab-text-color-hover)`}),T(`active`,`
 color: var(--n-tab-text-color-active);
 font-weight: var(--n-tab-font-weight-active);
 `),T(`disabled`,{color:`var(--n-tab-text-color-disabled)`})])]),V(`tabs-nav`,[T(`line-type`,[T(`top`,[E(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),V(`tabs-nav-scroll-content`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),V(`tabs-bar`,`
 bottom: -1px;
 `)]),T(`left`,[E(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),V(`tabs-nav-scroll-content`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),V(`tabs-bar`,`
 right: -1px;
 `)]),T(`right`,[E(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),V(`tabs-nav-scroll-content`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),V(`tabs-bar`,`
 left: -1px;
 `)]),T(`bottom`,[E(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),V(`tabs-nav-scroll-content`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),V(`tabs-bar`,`
 top: -1px;
 `)]),E(`prefix, suffix`,`
 transition: border-color .3s var(--n-bezier);
 `),V(`tabs-nav-scroll-content`,`
 transition: border-color .3s var(--n-bezier);
 `),V(`tabs-bar`,`
 border-radius: 0;
 `)]),T(`card-type`,[E(`prefix, suffix`,`
 transition: border-color .3s var(--n-bezier);
 `),V(`tabs-pad`,`
 flex-grow: 1;
 transition: border-color .3s var(--n-bezier);
 `),V(`tabs-tab-pad`,`
 transition: border-color .3s var(--n-bezier);
 `),V(`tabs-tab`,`
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
 `),V(`tabs-wrapper`,`
 flex-direction: column;
 `),V(`tabs-tab-wrapper`,`
 flex-direction: column;
 `,[V(`tabs-tab-pad`,`
 height: var(--n-tab-gap-vertical);
 width: 100%;
 `)])]),T(`top`,[T(`card-type`,[V(`tabs-scroll-padding`,`border-bottom: 1px solid var(--n-tab-border-color);`),E(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),V(`tabs-tab`,`
 border-top-left-radius: var(--n-tab-border-radius);
 border-top-right-radius: var(--n-tab-border-radius);
 `,[T(`active`,`
 border-bottom: 1px solid #0000;
 `)]),V(`tabs-tab-pad`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),V(`tabs-pad`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `)])]),T(`left`,[T(`card-type`,[V(`tabs-scroll-padding`,`border-right: 1px solid var(--n-tab-border-color);`),E(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),V(`tabs-tab`,`
 border-top-left-radius: var(--n-tab-border-radius);
 border-bottom-left-radius: var(--n-tab-border-radius);
 `,[T(`active`,`
 border-right: 1px solid #0000;
 `)]),V(`tabs-tab-pad`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),V(`tabs-pad`,`
 border-right: 1px solid var(--n-tab-border-color);
 `)])]),T(`right`,[T(`card-type`,[V(`tabs-scroll-padding`,`border-left: 1px solid var(--n-tab-border-color);`),E(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),V(`tabs-tab`,`
 border-top-right-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[T(`active`,`
 border-left: 1px solid #0000;
 `)]),V(`tabs-tab-pad`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),V(`tabs-pad`,`
 border-left: 1px solid var(--n-tab-border-color);
 `)])]),T(`bottom`,[T(`card-type`,[V(`tabs-scroll-padding`,`border-top: 1px solid var(--n-tab-border-color);`),E(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),V(`tabs-tab`,`
 border-bottom-left-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[T(`active`,`
 border-top: 1px solid #0000;
 `)]),V(`tabs-tab-pad`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),V(`tabs-pad`,`
 border-top: 1px solid var(--n-tab-border-color);
 `)])])])]),it=Ge,at=Object.assign(Object.assign({},_.props),{value:[String,Number],defaultValue:[String,Number],trigger:{type:String,default:`click`},type:{type:String,default:`bar`},closable:Boolean,justifyContent:String,size:String,placement:{type:String,default:`top`},tabStyle:[String,Object],tabClass:String,addTabStyle:[String,Object],addTabClass:String,barWidth:Number,paneClass:String,paneStyle:[String,Object],paneWrapperClass:String,paneWrapperStyle:[String,Object],addable:[Boolean,Object],tabsPadding:{type:Number,default:0},animated:Boolean,onBeforeLeave:Function,onAdd:Function,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onClose:[Function,Array],labelSize:String,activeName:[String,Number],onActiveNameChange:[Function,Array]}),ot=b({name:`Tabs`,props:at,slots:Object,setup(e,{slots:t}){let{mergedClsPrefixRef:i,inlineThemeDisabled:a,mergedComponentPropsRef:o}=re(e),s=_(`Tabs`,`-tabs`,rt,Ce,e,i),c=f(null),p=f(null),m=f(null),g=f(null),y=f(null),b=f(null),x=f(!0),S=f(!0),w=oe(e,[`labelSize`,`size`]),T=F(()=>w.value?w.value:o?.value?.Tabs?.size||`medium`),E=oe(e,[`activeName`,`value`]),O=f(E.value??e.defaultValue??(t.default?he(t.default())[0]?.props?.name:null)),k=ge(E,O),A={id:0},j=F(()=>{if(!(!e.justifyContent||e.type===`card`))return{display:`flex`,justifyContent:e.justifyContent}});C(k,()=>{A.id=0,I(),L()});function M(){let{value:e}=k;return e===null?null:c.value?.querySelector(`[data-name="${e}"]`)}function N(t){if(e.type===`card`)return;let{value:n}=p;if(!n)return;let r=n.style.opacity===`0`;if(t){let a=`${i.value}-tabs-bar--disabled`,{barWidth:o,placement:s}=e;if(t.dataset.disabled===`true`?n.classList.add(a):n.classList.remove(a),[`top`,`bottom`].includes(s)){if(ee([`top`,`maxHeight`,`height`]),typeof o==`number`&&t.offsetWidth>=o){let e=Math.floor((t.offsetWidth-o)/2)+t.offsetLeft;n.style.left=`${e}px`,n.style.maxWidth=`${o}px`}else n.style.left=`${t.offsetLeft}px`,n.style.maxWidth=`${t.offsetWidth}px`;n.style.width=`8192px`,r&&(n.style.transition=`none`),n.offsetWidth,r&&(n.style.transition=``,n.style.opacity=`1`)}else{if(ee([`left`,`maxWidth`,`width`]),typeof o==`number`&&t.offsetHeight>=o){let e=Math.floor((t.offsetHeight-o)/2)+t.offsetTop;n.style.top=`${e}px`,n.style.maxHeight=`${o}px`}else n.style.top=`${t.offsetTop}px`,n.style.maxHeight=`${t.offsetHeight}px`;n.style.height=`8192px`,r&&(n.style.transition=`none`),n.offsetHeight,r&&(n.style.transition=``,n.style.opacity=`1`)}}}function P(){if(e.type===`card`)return;let{value:t}=p;t&&(t.style.opacity=`0`)}function ee(e){let{value:t}=p;if(t)for(let n of e)t.style[n]=``}function I(){if(e.type===`card`)return;let t=M();t?N(t):P()}function L(){let e=y.value?.$el;if(!e)return;let t=M();if(!t)return;let{scrollLeft:n,offsetWidth:r}=e,{offsetLeft:i,offsetWidth:a}=t;n>i?e.scrollTo({top:0,left:i,behavior:`smooth`}):i+a>n+r&&e.scrollTo({top:0,left:i+a-r,behavior:`smooth`})}let R=f(null),z=0,B=null;function V(e){let t=R.value;if(t){z=e.getBoundingClientRect().height;let n=`${z}px`,r=()=>{t.style.height=n,t.style.maxHeight=n};B?(r(),B(),B=null):B=r}}function H(e){let t=R.value;if(t){let n=e.getBoundingClientRect().height,r=()=>{document.body.offsetHeight,t.style.maxHeight=`${n}px`,t.style.height=`${Math.max(z,n)}px`};B?(B(),B=null,r()):B=r}}function ne(){let t=R.value;if(t){t.style.maxHeight=``,t.style.height=``;let{paneWrapperStyle:n}=e;if(typeof n==`string`)t.style.cssText=n;else if(n){let{maxHeight:e,height:r}=n;e!==void 0&&(t.style.maxHeight=e),r!==void 0&&(t.style.height=r)}}}let U={value:[]},W=f(`next`);function G(e){let t=k.value,n=`next`;for(let r of U.value){if(r===t)break;if(r===e){n=`prev`;break}}W.value=n,K(e)}function K(t){let{onActiveNameChange:n,onUpdateValue:r,"onUpdate:value":i}=e;n&&q(n,t),r&&q(r,t),i&&q(i,t),O.value=t}function ie(t){let{onClose:n}=e;n&&q(n,t)}let ae=!0;function se(){let{value:e}=p;if(!e)return;ae||=!1;let t=`transition-disabled`;e.classList.add(t),I(),e.classList.remove(t)}let J=f(null);function ce({transitionDisabled:e}){let t=c.value;if(!t)return;e&&t.classList.add(`transition-disabled`);let r=M();r&&J.value&&(J.value.style.width=`${r.offsetWidth}px`,J.value.style.height=`${r.offsetHeight}px`,J.value.style.transform=`translateX(${r.offsetLeft-n(getComputedStyle(t).paddingLeft)}px)`,e&&J.value.offsetWidth),e&&t.classList.remove(`transition-disabled`)}C([k],()=>{e.type===`segment`&&r(()=>{ce({transitionDisabled:!1})})}),h(()=>{e.type===`segment`&&ce({transitionDisabled:!0})});let le=0;function de(t){if(t.contentRect.width===0&&t.contentRect.height===0||le===t.contentRect.width)return;le=t.contentRect.width;let{type:n}=e;if((n===`line`||n===`bar`)&&(ae||e.justifyContent?.startsWith(`space`))&&se(),n!==`segment`){let{placement:t}=e;ve((t===`top`||t===`bottom`?y.value?.$el:b.value)||null)}}let fe=it(de,64);C([()=>e.justifyContent,()=>e.size],()=>{r(()=>{let{type:t}=e;(t===`line`||t===`bar`)&&se()})});let Y=f(!1);function pe(t){let{target:n,contentRect:{width:r,height:i}}=t,a=n.parentElement.parentElement.offsetWidth,o=n.parentElement.parentElement.offsetHeight,{placement:s}=e;if(!Y.value)s===`top`||s===`bottom`?a<r&&(Y.value=!0):o<i&&(Y.value=!0);else{let{value:e}=g;if(!e)return;s===`top`||s===`bottom`?a-r>e.$el.offsetWidth&&(Y.value=!1):o-i>e.$el.offsetHeight&&(Y.value=!1)}ve(y.value?.$el||null)}let me=it(pe,64);function _e(){let{onAdd:t}=e;t&&t(),r(()=>{let e=M(),{value:t}=y;!e||!t||t.scrollTo({left:e.offsetLeft,top:0,behavior:`smooth`})})}function ve(t){if(!t)return;let{placement:n}=e;if(n===`top`||n===`bottom`){let{scrollLeft:e,scrollWidth:n,offsetWidth:r}=t;x.value=e<=0,S.value=e+r>=n}else{let{scrollTop:e,scrollHeight:n,offsetHeight:r}=t;x.value=e<=0,S.value=e+r>=n}}let ye=it(e=>{ve(e.target)},64);d(Qe,{triggerRef:D(e,`trigger`),tabStyleRef:D(e,`tabStyle`),tabClassRef:D(e,`tabClass`),addTabStyleRef:D(e,`addTabStyle`),addTabClassRef:D(e,`addTabClass`),paneClassRef:D(e,`paneClass`),paneStyleRef:D(e,`paneStyle`),mergedClsPrefixRef:i,typeRef:D(e,`type`),closableRef:D(e,`closable`),valueRef:k,tabChangeIdRef:A,onBeforeLeaveRef:D(e,`onBeforeLeave`),activateTab:G,handleClose:ie,handleAdd:_e}),ue(()=>{I(),L()}),l(()=>{let{value:e}=m;if(!e)return;let{value:t}=i,n=`${t}-tabs-nav-scroll-wrapper--shadow-start`,r=`${t}-tabs-nav-scroll-wrapper--shadow-end`;x.value?e.classList.remove(n):e.classList.add(n),S.value?e.classList.remove(r):e.classList.add(r)});let be={syncBarPosition:()=>{I()}},xe=()=>{ce({transitionDisabled:!0})},X=F(()=>{let{value:t}=T,{type:n}=e,r=`${t}${{card:`Card`,bar:`Bar`,line:`Line`,segment:`Segment`}[n]}`,{self:{barColor:i,closeIconColor:a,closeIconColorHover:o,closeIconColorPressed:c,tabColor:l,tabBorderColor:d,paneTextColor:f,tabFontWeight:p,tabBorderRadius:m,tabFontWeightActive:h,colorSegment:g,fontWeightStrong:_,tabColorSegment:y,closeSize:b,closeIconSize:x,closeColorHover:S,closeColorPressed:C,closeBorderRadius:w,[v(`panePadding`,t)]:E,[v(`tabPadding`,r)]:D,[v(`tabPaddingVertical`,r)]:O,[v(`tabGap`,r)]:k,[v(`tabGap`,`${r}Vertical`)]:A,[v(`tabTextColor`,n)]:j,[v(`tabTextColorActive`,n)]:M,[v(`tabTextColorHover`,n)]:N,[v(`tabTextColorDisabled`,n)]:P,[v(`tabFontSize`,t)]:F},common:{cubicBezierEaseInOut:ee}}=s.value;return{"--n-bezier":ee,"--n-color-segment":g,"--n-bar-color":i,"--n-tab-font-size":F,"--n-tab-text-color":j,"--n-tab-text-color-active":M,"--n-tab-text-color-disabled":P,"--n-tab-text-color-hover":N,"--n-pane-text-color":f,"--n-tab-border-color":d,"--n-tab-border-radius":m,"--n-close-size":b,"--n-close-icon-size":x,"--n-close-color-hover":S,"--n-close-color-pressed":C,"--n-close-border-radius":w,"--n-close-icon-color":a,"--n-close-icon-color-hover":o,"--n-close-icon-color-pressed":c,"--n-tab-color":l,"--n-tab-font-weight":p,"--n-tab-font-weight-active":h,"--n-tab-padding":D,"--n-tab-padding-vertical":O,"--n-tab-gap":k,"--n-tab-gap-vertical":A,"--n-pane-padding-left":u(E,`left`),"--n-pane-padding-right":u(E,`right`),"--n-pane-padding-top":u(E,`top`),"--n-pane-padding-bottom":u(E,`bottom`),"--n-font-weight-strong":_,"--n-tab-color-segment":y}}),Se=a?te(`tabs`,F(()=>`${T.value[0]}${e.type[0]}`),X,e):void 0;return Object.assign({mergedClsPrefix:i,mergedValue:k,renderedNames:new Set,segmentCapsuleElRef:J,tabsPaneWrapperRef:R,tabsElRef:c,barElRef:p,addTabInstRef:g,xScrollInstRef:y,scrollWrapperElRef:m,addTabFixed:Y,tabWrapperStyle:j,handleNavResize:fe,mergedSize:T,handleScroll:ye,handleTabsResize:me,cssVars:a?void 0:X,themeClass:Se?.themeClass,animationDirection:W,renderNameListRef:U,yScrollElRef:b,handleSegmentResize:xe,onAnimationBeforeLeave:V,onAnimationEnter:H,onAnimationAfterEnter:ne,onRender:Se?.onRender},be)},render(){let{mergedClsPrefix:e,type:t,placement:n,addTabFixed:r,addable:i,mergedSize:a,renderNameListRef:o,onRender:s,paneWrapperClass:c,paneWrapperStyle:l,$slots:{default:u,prefix:d,suffix:f}}=this;s?.();let p=u?he(u()).filter(e=>e.type.__TAB_PANE__===!0):[],m=u?he(u()).filter(e=>e.type.__TAB__===!0):[],h=!m.length,g=t===`card`,_=t===`segment`,v=!g&&!_&&this.justifyContent;o.value=[];let y=()=>{let t=W(`div`,{style:this.tabWrapperStyle,class:`${e}-tabs-wrapper`},v?null:W(`div`,{class:`${e}-tabs-scroll-padding`,style:n===`top`||n===`bottom`?{width:`${this.tabsPadding}px`}:{height:`${this.tabsPadding}px`}}),h?p.map((e,t)=>(o.value.push(e.props.name),ut(W(nt,Object.assign({},e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0&&(!v||v===`center`||v===`start`||v===`end`)}),e.children?{default:e.children.tab}:void 0)))):m.map((e,t)=>(o.value.push(e.props.name),ut(t!==0&&!v?lt(e):e))),!r&&i&&g?ct(i,(h?p.length:m.length)!==0):null,v?null:W(`div`,{class:`${e}-tabs-scroll-padding`,style:{width:`${this.tabsPadding}px`}}));return W(`div`,{ref:`tabsElRef`,class:`${e}-tabs-nav-scroll-content`},g&&i?W(G,{onResize:this.handleTabsResize},{default:()=>t}):t,g?W(`div`,{class:`${e}-tabs-pad`}):null,g?null:W(`div`,{ref:`barElRef`,class:`${e}-tabs-bar`}))},b=_?`top`:n;return W(`div`,{class:[`${e}-tabs`,this.themeClass,`${e}-tabs--${t}-type`,`${e}-tabs--${a}-size`,v&&`${e}-tabs--flex`,`${e}-tabs--${b}`],style:this.cssVars},W(`div`,{class:[`${e}-tabs-nav--${t}-type`,`${e}-tabs-nav--${b}`,`${e}-tabs-nav`]},U(d,t=>t&&W(`div`,{class:`${e}-tabs-nav__prefix`},t)),_?W(G,{onResize:this.handleSegmentResize},{default:()=>W(`div`,{class:`${e}-tabs-rail`,ref:`tabsElRef`},W(`div`,{class:`${e}-tabs-capsule`,ref:`segmentCapsuleElRef`},W(`div`,{class:`${e}-tabs-wrapper`},W(`div`,{class:`${e}-tabs-tab`}))),h?p.map((e,t)=>(o.value.push(e.props.name),W(nt,Object.assign({},e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0}),e.children?{default:e.children.tab}:void 0))):m.map((e,t)=>(o.value.push(e.props.name),t===0?e:lt(e))))}):W(G,{onResize:this.handleNavResize},{default:()=>W(`div`,{class:`${e}-tabs-nav-scroll-wrapper`,ref:`scrollWrapperElRef`},[`top`,`bottom`].includes(b)?W(De,{ref:`xScrollInstRef`,onScroll:this.handleScroll},{default:y}):W(`div`,{class:`${e}-tabs-nav-y-scroll`,onScroll:this.handleScroll,ref:`yScrollElRef`},y()))}),r&&i&&g?ct(i,!0):null,U(f,t=>t&&W(`div`,{class:`${e}-tabs-nav__suffix`},t))),h&&(this.animated&&(b===`top`||b===`bottom`)?W(`div`,{ref:`tabsPaneWrapperRef`,style:l,class:[`${e}-tabs-pane-wrapper`,c]},st(p,this.mergedValue,this.renderedNames,this.onAnimationBeforeLeave,this.onAnimationEnter,this.onAnimationAfterEnter,this.animationDirection)):st(p,this.mergedValue,this.renderedNames)))}});function st(e,t,n,r,i,a,o){let s=[];return e.forEach(e=>{let{name:r,displayDirective:i,"display-directive":a}=e.props,o=e=>i===e||a===e,c=t===r;if(e.key!==void 0&&(e.key=r),c||o(`show`)||o(`show:lazy`)&&n.has(r)){n.has(r)||n.add(r);let t=!o(`if`);s.push(t?w(e,[[ne,c]]):e)}}),o?W(A,{name:`${o}-transition`,onBeforeLeave:r,onEnter:i,onAfterEnter:a},{default:()=>s}):s}function ct(e,t){return W(nt,{ref:`addTabInstRef`,key:`__addable`,name:`__addable`,internalCreatedByPane:!0,internalAddable:!0,internalLeftPadded:t,disabled:typeof e==`object`&&e.disabled})}function lt(e){let t=L(e);return t.props?t.props.internalLeftPadded=!0:t.props={internalLeftPadded:!0},t}function ut(e){return Array.isArray(e.dynamicProps)?e.dynamicProps.includes(`internalLeftPadded`)||e.dynamicProps.push(`internalLeftPadded`):e.dynamicProps=[`internalLeftPadded`],e}var dt={key:1,class:`tab-loading`},ft=_e(b({__name:`DockerView`,setup(e){let t=Se();function n(e){return e instanceof R&&e.status===503&&!!e.body&&typeof e.body==`object`&&`enabled`in e.body}function r(e,n){t.error(e instanceof R?e.message:n)}let i=e=>e===`running`?`success`:e===`paused`||e===`restarting`?`warning`:e===`dead`?`error`:`default`,a={running:0,restarting:1,paused:2,created:3,exited:4,dead:5};function o(e){return a[e.state]??6}function c(e,t){return e.hasStats?t(e.stats):-1}let l=f([]),u=f(!0),d=f(null),p;async function _(){try{let e=await Z.containers();l.value=e.containers,d.value=null}catch(e){n(e)&&(d.value=e.body)}finally{u.value=!1}}async function v(e,t){try{let n=await Z.containerAction(e,t);l.value=n.containers}catch(e){r(e,`Aksi ${t} gagal`)}}let y=[{title:`Nama`,key:`name`,width:160,ellipsis:{tooltip:!0},sorter:(e,t)=>e.name.localeCompare(t.name)},{title:`Image`,key:`image`,width:180,ellipsis:{tooltip:!0},sorter:(e,t)=>e.image.localeCompare(t.image)},{title:`Status`,key:`state`,width:130,sorter:(e,t)=>o(e)-o(t),render:e=>W(de,{type:i(e.state),size:`small`},{default:()=>e.status})},{title:`CPU`,key:`cpu`,width:70,sorter:(e,t)=>c(e,e=>e.cpuPercent)-c(t,e=>e.cpuPercent),render:e=>e.hasStats?`${e.stats.cpuPercent.toFixed(1)}%`:`—`},{title:`RAM`,key:`ram`,width:150,sorter:(e,t)=>c(e,e=>e.memUsageBytes)-c(t,e=>e.memUsageBytes),render:e=>e.hasStats?`${Q(e.stats.memUsageBytes)} / ${Q(e.stats.memLimitBytes)}`:`—`},{title:`Network`,key:`net`,width:140,sorter:(e,t)=>c(e,e=>e.netRxBytes+e.netTxBytes)-c(t,e=>e.netRxBytes+e.netTxBytes),render:e=>e.hasStats?`↓ ${Q(e.stats.netRxBytes)} ↑ ${Q(e.stats.netTxBytes)}`:`—`},{title:`Ports`,key:`ports`,width:220,ellipsis:{tooltip:!0}},{title:`Aksi`,key:`actions`,width:220,render:e=>W(fe,{size:`small`},()=>[e.state===`running`?[W(I,{size:`tiny`,onClick:()=>v(e.id,`stop`)},()=>`Stop`),W(I,{size:`tiny`,onClick:()=>v(e.id,`restart`)},()=>`Restart`)]:W(I,{size:`tiny`,type:`primary`,onClick:()=>v(e.id,`start`)},()=>`Start`),W(me,{onPositiveClick:()=>v(e.id,`remove`)},{trigger:()=>W(I,{size:`tiny`,type:`error`,ghost:!0},()=>`Hapus`),default:()=>`Hapus container "${e.name}"?`})])}],b=f([]),x=f(!0),w=f(null);async function T(){x.value=!0;try{let e=await Z.images();b.value=e.images,w.value=null}catch(e){n(e)&&(w.value=e.body)}finally{x.value=!1}}async function E(e){try{let t=await Z.removeImage(e);b.value=t.images}catch(e){r(e,`Hapus image gagal (mungkin masih dipakai container)`)}}let D=[{title:`Tag`,key:`tag`,minWidth:200,ellipsis:{tooltip:!0},sorter:(e,t)=>e.tag.localeCompare(t.tag),render:e=>e.dangling?W(fe,{size:`small`,align:`center`},()=>[e.tag,W(de,{size:`small`,type:`warning`},()=>`dangling`)]):e.tag},{title:`Ukuran`,key:`sizeBytes`,width:110,sorter:(e,t)=>e.sizeBytes-t.sizeBytes,render:e=>Q(e.sizeBytes)},{title:`Dipakai`,key:`containers`,width:140,sorter:(e,t)=>e.containers-t.containers,render:e=>e.containers<0?`—`:e.containers===0?`tidak dipakai`:`${e.containers} container`},{title:`Dibuat`,key:`created`,width:150,sorter:(e,t)=>Date.parse(e.created)-Date.parse(t.created),render:e=>Te(e.created)},{title:`Aksi`,key:`actions`,width:100,render:e=>W(me,{onPositiveClick:()=>E(e.id)},{trigger:()=>W(I,{size:`tiny`,type:`error`,ghost:!0},()=>`Hapus`),default:()=>`Hapus image "${e.tag}"?`})}],O=f([]),A=f(!0),N=f(null);async function F(){A.value=!0;try{let e=await Z.volumes();O.value=e.volumes,N.value=null}catch(e){n(e)&&(N.value=e.body)}finally{A.value=!1}}async function ee(e){try{let t=await Z.removeVolume(e);O.value=t.volumes}catch(e){r(e,`Hapus volume gagal (mungkin masih dipakai container)`)}}let te=[{title:`Nama`,key:`name`,minWidth:180,ellipsis:{tooltip:!0},sorter:(e,t)=>e.name.localeCompare(t.name)},{title:`Driver`,key:`driver`,width:100,sorter:(e,t)=>e.driver.localeCompare(t.driver)},{title:`Ukuran`,key:`sizeBytes`,width:110,sorter:(e,t)=>e.sizeBytes-t.sizeBytes,render:e=>e.sizeBytes<0?`tidak diketahui`:Q(e.sizeBytes)},{title:`Status`,key:`inUse`,width:120,sorter:(e,t)=>Number(e.inUse)-Number(t.inUse),render:e=>W(de,{size:`small`,type:e.inUse?`success`:`default`},()=>e.inUse?`dipakai`:`tidak dipakai`)},{title:`Aksi`,key:`actions`,width:100,render:e=>W(me,{onPositiveClick:()=>ee(e.name)},{trigger:()=>W(I,{size:`tiny`,type:`error`,ghost:!0},()=>`Hapus`),default:()=>`Hapus volume "${e.name}"?`})}],L=f([]),z=f(!0),B=f(null);async function V(){z.value=!0;try{let e=await Z.networks();L.value=e.networks,B.value=null}catch(e){n(e)&&(B.value=e.body)}finally{z.value=!1}}async function ne(e){try{let t=await Z.removeNetwork(e);L.value=t.networks}catch(e){r(e,`Hapus network gagal (mungkin builtin atau masih dipakai)`)}}let re=[{title:`Nama`,key:`name`,minWidth:160,ellipsis:{tooltip:!0},sorter:(e,t)=>e.name.localeCompare(t.name),render:e=>e.builtin?W(fe,{size:`small`,align:`center`},()=>[e.name,W(de,{size:`small`},()=>`builtin`)]):e.name},{title:`Driver`,key:`driver`,width:100,sorter:(e,t)=>e.driver.localeCompare(t.driver)},{title:`Subnet`,key:`subnet`,width:150,sorter:(e,t)=>e.subnet.localeCompare(t.subnet),render:e=>e.subnet||`—`},{title:`Container Terhubung`,key:`connectedCount`,width:170,sorter:(e,t)=>e.connectedCount-t.connectedCount},{title:`Aksi`,key:`actions`,width:100,render:e=>e.builtin?null:W(me,{onPositiveClick:()=>ne(e.id)},{trigger:()=>W(I,{size:`tiny`,type:`error`,ghost:!0},()=>`Hapus`),default:()=>`Hapus network "${e.name}"?`})}],U=f(null),G=f(!0),ie=f(null),q=f(null);async function oe(){G.value=!0;try{U.value=await Z.settings(),ie.value=null}catch(e){n(e)&&(ie.value=e.body)}finally{G.value=!1}}async function se(e){q.value=e;try{U.value=await Z.prune(e),t.success(`Cleanup selesai`)}catch(t){r(t,`Cleanup gagal: ${e}`)}finally{q.value=null}}let J=f(`containers`),ue=new Set([`containers`]);return C(J,e=>{ue.has(e)||(ue.add(e),e===`images`?T():e===`volumes`?F():e===`networks`?V():e===`settings`&&oe())}),h(()=>{_(),p=setInterval(_,5e3)}),g(()=>{p&&clearInterval(p)}),(e,t)=>(s(),k(ce,null,{default:S(()=>[K(P(ot),{type:`line`,value:J.value,"onUpdate:value":t[0]||=e=>J.value=e},{default:S(()=>[K(P(et),{name:`containers`,tab:`Containers`},{default:S(()=>[d.value?(s(),k(P(X),{key:0,type:`warning`,title:d.value.error},null,8,[`title`])):(s(),k(P(pe),{key:1,columns:y,data:l.value,loading:u.value,"row-key":e=>e.id,"scroll-x":1200},null,8,[`data`,`loading`,`row-key`]))]),_:1}),K(P(et),{name:`images`,tab:`Images`},{default:S(()=>[w.value?(s(),k(P(X),{key:0,type:`warning`,title:w.value.error},null,8,[`title`])):(s(),k(P(pe),{key:1,columns:D,data:b.value,loading:x.value,"row-key":e=>e.id,"scroll-x":700},null,8,[`data`,`loading`,`row-key`]))]),_:1}),K(P(et),{name:`volumes`,tab:`Volumes`},{default:S(()=>[N.value?(s(),k(P(X),{key:0,type:`warning`,title:N.value.error},null,8,[`title`])):(s(),k(P(pe),{key:1,columns:te,data:O.value,loading:A.value,"row-key":e=>e.name,"scroll-x":610},null,8,[`data`,`loading`,`row-key`]))]),_:1}),K(P(et),{name:`networks`,tab:`Networks`},{default:S(()=>[B.value?(s(),k(P(X),{key:0,type:`warning`,title:B.value.error},null,8,[`title`])):(s(),k(P(pe),{key:1,columns:re,data:L.value,loading:z.value,"row-key":e=>e.id,"scroll-x":680},null,8,[`data`,`loading`,`row-key`]))]),_:1}),K(P(et),{name:`settings`,tab:`Settings`},{default:S(()=>[ie.value?(s(),k(P(X),{key:0,type:`warning`,title:ie.value.error},null,8,[`title`])):G.value&&!U.value?(s(),ae(`div`,dt,[K(P(le),{size:`large`})])):U.value?(s(),k(P(fe),{key:3,vertical:``,size:24},{default:S(()=>[K(P(Xe),{title:`Info Daemon`,column:2,bordered:``,"label-placement":`left`},{default:S(()=>[K(P($),{label:`Versi Server`},{default:S(()=>[j(H(U.value?.info.serverVersion),1)]),_:1}),K(P($),{label:`OS / Kernel`},{default:S(()=>[j(H(U.value?.info.operatingSystem)+` / `+H(U.value?.info.kernelVersion),1)]),_:1}),K(P($),{label:`Storage Driver`},{default:S(()=>[j(H(U.value?.info.storageDriver),1)]),_:1}),K(P($),{label:`Root Dir`},{default:S(()=>[j(H(U.value?.info.dockerRootDir),1)]),_:1}),K(P($),{label:`Container`},{default:S(()=>[j(H(U.value?.info.containersRunning)+` running, `+H(U.value?.info.containersPaused)+` paused, `+H(U.value?.info.containersStopped)+` stopped `,1)]),_:1}),K(P($),{label:`Images`},{default:S(()=>[j(H(U.value?.info.images),1)]),_:1})]),_:1}),K(P(Xe),{title:`Disk Usage`,column:2,bordered:``,"label-placement":`left`},{default:S(()=>[K(P($),{label:`Images`},{default:S(()=>[j(H(P(Q)(U.value?.diskUsage.imagesTotalBytes??0))+` (reclaimable `+H(P(Q)(U.value?.diskUsage.imagesReclaimableBytes??0))+`) `,1)]),_:1}),K(P($),{label:`Containers`},{default:S(()=>[j(H(P(Q)(U.value?.diskUsage.containersTotalBytes??0)),1)]),_:1}),K(P($),{label:`Volumes`},{default:S(()=>[j(H(P(Q)(U.value?.diskUsage.volumesTotalBytes??0))+` (reclaimable `+H(P(Q)(U.value?.diskUsage.volumesReclaimableBytes??0))+`) `,1)]),_:1})]),_:1}),K(P(fe),null,{default:S(()=>[(s(),ae(M,null,m([`containers`,`images`,`volumes`,`networks`,`all`],e=>K(P(me),{key:e,onPositiveClick:t=>se(e)},{trigger:S(()=>[K(P(I),{size:`small`,loading:q.value===e},{default:S(()=>[j(`Bersihkan `+H(e),1)]),_:2},1032,[`loading`])]),default:S(()=>[j(` Jalankan cleanup "`+H(e)+`"? Tindakan ini tidak bisa dibatalkan. `,1)]),_:2},1032,[`onPositiveClick`])),64))]),_:1})]),_:1})):(s(),k(P(Y),{key:2,description:`Tidak ada data`}))]),_:1})]),_:1},8,[`value`])]),_:1}))}}),[[`__scopeId`,`data-v-d232fd8a`]]);export{ft as default};