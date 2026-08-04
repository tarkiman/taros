import{At as e,Bt as t,Ct as n,En as r,Gt as i,Ht as a,Jt as o,Lt as s,Ot as c,Pt as l,Rt as u,S as d,St as f,Ut as p,Wt as m,X as h,Xt as g,Zt as _,_t as v,an as y,at as b,b as x,bt as S,ct as C,dn as w,et as T,fn as ee,g as E,gt as D,mn as te,n as O,nn as ne,nt as re,on as ie,pn as k,q as A,qt as j,r as M,rn as N,sn as ae,st as P,tt as oe,vn as F,wn as I,wt as se,xn as L,xt as R,yt as z}from"./auth-CDeeRorZ.js";import{a as B,i as V,o as ce,t as le}from"./AppShell-DADsiY02.js";import{d as H,f as U,i as W,n as G,o as K,r as ue,s as de,t as q,y as fe}from"./Popconfirm-5efbvO0i.js";import{C as pe,E as me,O as he,g as ge,m as _e,n as J,t as ve,y as Y}from"./_plugin-vue_export-helper-B7M-GU9I.js";import{u as ye}from"./light-BvYwiiVO.js";import{M as be,j as xe}from"./light-yM1D_vtE.js";import{n as X}from"./Input-D-jbI8Py.js";import{n as Se,r as Ce}from"./light-CaKAH9LP.js";import{n as we,r as Te,t as Z}from"./format-C2QPwJ-7.js";var Ee=H(`.v-x-scroll`,{overflow:`auto`,scrollbarWidth:`none`},[H(`&::-webkit-scrollbar`,{width:0,height:0})]),De=i({name:`XScroll`,props:{disabled:Boolean,onScroll:Function},setup(){let e=F(null);function t(e){!(e.currentTarget.offsetWidth<e.currentTarget.scrollWidth)||e.deltaY===0||(e.currentTarget.scrollLeft+=e.deltaY+e.deltaX,e.preventDefault())}let n=P();return Ee.mount({id:`vueuc/x-scroll`,head:!0,anchorMetaName:U,ssr:n}),Object.assign({selfRef:e,handleWheel:t},{scrollTo(...t){var n;(n=e.value)==null||n.scrollTo(...t)}})},render(){return j(`div`,{ref:`selfRef`,onScroll:this.onScroll,onWheel:this.disabled?void 0:this.handleWheel,class:`v-x-scroll`},this.$slots)}});function Oe(e,t=`default`,n=[]){let{children:r}=e;if(typeof r==`object`&&r&&!Array.isArray(r)){let e=r[t];if(typeof e==`function`)return e()}return n}var ke=/\s/;function Ae(e){for(var t=e.length;t--&&ke.test(e.charAt(t)););return t}var je=/^\s+/;function Me(e){return e&&e.slice(0,Ae(e)+1).replace(je,``)}var Ne=NaN,Pe=/^[-+]0x[0-9a-f]+$/i,Fe=/^0b[01]+$/i,Ie=/^0o[0-7]+$/i,Le=parseInt;function Re(e){if(typeof e==`number`)return e;if(h(e))return Ne;if(A(e)){var t=typeof e.valueOf==`function`?e.valueOf():e;e=A(t)?t+``:t}if(typeof e!=`string`)return e===0?e:+e;e=Me(e);var n=Fe.test(e);return n||Ie.test(e)?Le(e.slice(2),n?2:8):Pe.test(e)?Ne:+e}var ze=function(){return T.Date.now()},Be=`Expected a function`,Ve=Math.max,He=Math.min;function Ue(e,t,n){var r,i,a,o,s,c,l=0,u=!1,d=!1,f=!0;if(typeof e!=`function`)throw TypeError(Be);t=Re(t)||0,A(n)&&(u=!!n.leading,d=`maxWait`in n,a=d?Ve(Re(n.maxWait)||0,t):a,f=`trailing`in n?!!n.trailing:f);function p(t){var n=r,a=i;return r=i=void 0,l=t,o=e.apply(a,n),o}function m(e){return l=e,s=setTimeout(_,t),u?p(e):o}function h(e){var n=e-c,r=e-l,i=t-n;return d?He(i,a-r):i}function g(e){var n=e-c,r=e-l;return c===void 0||n>=t||n<0||d&&r>=a}function _(){var e=ze();if(g(e))return v(e);s=setTimeout(_,h(e))}function v(e){return s=void 0,f&&r?p(e):(r=i=void 0,o)}function y(){s!==void 0&&clearTimeout(s),l=0,r=c=i=s=void 0}function b(){return s===void 0?o:v(ze())}function x(){var e=ze(),n=g(e);if(r=arguments,i=this,c=e,n){if(s===void 0)return m(c);if(d)return clearTimeout(s),s=setTimeout(_,t),p(c)}return s===void 0&&(s=setTimeout(_,t)),o}return x.cancel=y,x.flush=b,x}var We=`Expected a function`;function Ge(e,t,n){var r=!0,i=!0;if(typeof e!=`function`)throw TypeError(We);return A(n)&&(r=`leading`in n?!!n.leading:r,i=`trailing`in n?!!n.trailing:i),Ue(e,t,{leading:r,maxWait:t,trailing:i})}var Ke=i({name:`Add`,render(){return j(`svg`,{width:`512`,height:`512`,viewBox:`0 0 512 512`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},j(`path`,{d:`M256 112V400M400 256H112`,stroke:`currentColor`,"stroke-width":`32`,"stroke-linecap":`round`,"stroke-linejoin":`round`}))}}),qe=D([v(`descriptions`,{fontSize:`var(--n-font-size)`},[v(`descriptions-separator`,`
 display: inline-block;
 margin: 0 8px 0 2px;
 `),v(`descriptions-table-wrapper`,[v(`descriptions-table`,[v(`descriptions-table-row`,[v(`descriptions-table-header`,{padding:`var(--n-th-padding)`}),v(`descriptions-table-content`,{padding:`var(--n-td-padding)`})])])]),R(`bordered`,[v(`descriptions-table-wrapper`,[v(`descriptions-table`,[v(`descriptions-table-row`,[D(`&:last-child`,[v(`descriptions-table-content`,{paddingBottom:0})])])])])]),S(`left-label-placement`,[v(`descriptions-table-content`,[D(`> *`,{verticalAlign:`top`})])]),S(`left-label-align`,[D(`th`,{textAlign:`left`})]),S(`center-label-align`,[D(`th`,{textAlign:`center`})]),S(`right-label-align`,[D(`th`,{textAlign:`right`})]),S(`bordered`,[v(`descriptions-table-wrapper`,`
 border-radius: var(--n-border-radius);
 overflow: hidden;
 background: var(--n-merged-td-color);
 border: 1px solid var(--n-merged-border-color);
 `,[v(`descriptions-table`,[v(`descriptions-table-row`,[D(`&:not(:last-child)`,[v(`descriptions-table-content`,{borderBottom:`1px solid var(--n-merged-border-color)`}),v(`descriptions-table-header`,{borderBottom:`1px solid var(--n-merged-border-color)`})]),v(`descriptions-table-header`,`
 font-weight: 400;
 background-clip: padding-box;
 background-color: var(--n-merged-th-color);
 `,[D(`&:not(:last-child)`,{borderRight:`1px solid var(--n-merged-border-color)`})]),v(`descriptions-table-content`,[D(`&:not(:last-child)`,{borderRight:`1px solid var(--n-merged-border-color)`})])])])])]),v(`descriptions-header`,`
 font-weight: var(--n-th-font-weight);
 font-size: 18px;
 transition: color .3s var(--n-bezier);
 line-height: var(--n-line-height);
 margin-bottom: 16px;
 color: var(--n-title-text-color);
 `),v(`descriptions-table-wrapper`,`
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[v(`descriptions-table`,`
 width: 100%;
 border-collapse: separate;
 border-spacing: 0;
 box-sizing: border-box;
 `,[v(`descriptions-table-row`,`
 box-sizing: border-box;
 transition: border-color .3s var(--n-bezier);
 `,[v(`descriptions-table-header`,`
 font-weight: var(--n-th-font-weight);
 line-height: var(--n-line-height);
 display: table-cell;
 box-sizing: border-box;
 color: var(--n-th-text-color);
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `),v(`descriptions-table-content`,`
 vertical-align: top;
 line-height: var(--n-line-height);
 display: table-cell;
 box-sizing: border-box;
 color: var(--n-td-text-color);
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[z(`content`,`
 transition: color .3s var(--n-bezier);
 display: inline-block;
 color: var(--n-td-text-color);
 `)]),z(`label`,`
 font-weight: var(--n-th-font-weight);
 transition: color .3s var(--n-bezier);
 display: inline-block;
 margin-right: 14px;
 color: var(--n-th-text-color);
 `)])])])]),v(`descriptions-table-wrapper`,`
 --n-merged-th-color: var(--n-th-color);
 --n-merged-td-color: var(--n-td-color);
 --n-merged-border-color: var(--n-border-color);
 `),n(v(`descriptions-table-wrapper`,`
 --n-merged-th-color: var(--n-th-color-modal);
 --n-merged-td-color: var(--n-td-color-modal);
 --n-merged-border-color: var(--n-border-color-modal);
 `)),se(v(`descriptions-table-wrapper`,`
 --n-merged-th-color: var(--n-th-color-popover);
 --n-merged-td-color: var(--n-td-color-popover);
 --n-merged-border-color: var(--n-border-color-popover);
 `))]),Je=`DESCRIPTION_ITEM_FLAG`;function Ye(e){return typeof e==`object`&&e&&!Array.isArray(e)?e.type&&e.type.DESCRIPTION_ITEM_FLAG:!1}var Xe=Object.assign(Object.assign({},d.props),{title:String,column:{type:Number,default:3},columns:Number,labelPlacement:{type:String,default:`top`},labelAlign:{type:String,default:`left`},separator:{type:String,default:`:`},size:String,bordered:Boolean,labelClass:String,labelStyle:[Object,String],contentClass:String,contentStyle:[Object,String]}),Ze=i({name:`Descriptions`,props:Xe,slots:Object,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n,mergedComponentPropsRef:r}=re(e),i=u(()=>e.size||r?.value?.Descriptions?.size||`medium`),a=d(`Descriptions`,`-descriptions`,qe,Ce,e,t),o=u(()=>{let{bordered:t}=e,n=i.value,{common:{cubicBezierEaseInOut:r},self:{titleTextColor:o,thColor:s,thColorModal:c,thColorPopover:l,thTextColor:u,thFontWeight:d,tdTextColor:p,tdColor:m,tdColorModal:h,tdColorPopover:g,borderColor:_,borderColorModal:v,borderColorPopover:y,borderRadius:b,lineHeight:x,[f(`fontSize`,n)]:S,[f(t?`thPaddingBordered`:`thPadding`,n)]:C,[f(t?`tdPaddingBordered`:`tdPadding`,n)]:w}}=a.value;return{"--n-title-text-color":o,"--n-th-padding":C,"--n-td-padding":w,"--n-font-size":S,"--n-bezier":r,"--n-th-font-weight":d,"--n-line-height":x,"--n-th-text-color":u,"--n-td-text-color":p,"--n-th-color":s,"--n-th-color-modal":c,"--n-th-color-popover":l,"--n-td-color":m,"--n-td-color-modal":h,"--n-td-color-popover":g,"--n-border-radius":b,"--n-border-color":_,"--n-border-color-modal":v,"--n-border-color-popover":y}}),s=n?oe(`descriptions`,u(()=>{let t=``,{bordered:n}=e;return n&&(t+=`a`),t+=i.value[0],t}),o,e):void 0;return{mergedClsPrefix:t,cssVars:n?void 0:o,themeClass:s?.themeClass,onRender:s?.onRender,compitableColumn:ce(e,[`columns`,`column`]),inlineThemeDisabled:n,mergedSize:i}},render(){let e=this.$slots.default,t=e?B(e()):[];t.length;let{contentClass:n,labelClass:r,compitableColumn:i,labelPlacement:a,labelAlign:o,mergedSize:s,bordered:c,title:l,cssVars:u,mergedClsPrefix:d,separator:f,onRender:p}=this;p?.();let m=t.filter(e=>Ye(e)),h=m.reduce((e,t,o)=>{let s=t.props||{},l=m.length-1===o,u=[`label`in s?s.label:Oe(t,`label`)],p=[Oe(t)],h=s.span||1,g=e.span;e.span+=h;let _=s.labelStyle||s[`label-style`]||this.labelStyle,v=s.contentStyle||s[`content-style`]||this.contentStyle;if(a===`left`)c?e.row.push(j(`th`,{class:[`${d}-descriptions-table-header`,r],colspan:1,style:_},u),j(`td`,{class:[`${d}-descriptions-table-content`,n],colspan:l?(i-g)*2+1:h*2-1,style:v},p)):e.row.push(j(`td`,{class:`${d}-descriptions-table-content`,colspan:l?(i-g)*2:h*2},j(`span`,{class:[`${d}-descriptions-table-content__label`,r],style:_},[...u,f&&j(`span`,{class:`${d}-descriptions-separator`},f)]),j(`span`,{class:[`${d}-descriptions-table-content__content`,n],style:v},p)));else{let t=l?(i-g)*2:h*2;e.row.push(j(`th`,{class:[`${d}-descriptions-table-header`,r],colspan:t,style:_},u)),e.secondRow.push(j(`td`,{class:[`${d}-descriptions-table-content`,n],colspan:t,style:v},p))}return(e.span>=i||l)&&(e.span=0,e.row.length&&(e.rows.push(e.row),e.row=[]),a!==`left`&&e.secondRow.length&&(e.rows.push(e.secondRow),e.secondRow=[])),e},{span:0,row:[],secondRow:[],rows:[]}).rows.map(e=>j(`tr`,{class:`${d}-descriptions-table-row`},e));return j(`div`,{style:u,class:[`${d}-descriptions`,this.themeClass,`${d}-descriptions--${a}-label-placement`,`${d}-descriptions--${o}-label-align`,`${d}-descriptions--${s}-size`,c&&`${d}-descriptions--bordered`]},l||this.$slots.header?j(`div`,{class:`${d}-descriptions-header`},l||V(this,`header`)):null,j(`div`,{class:`${d}-descriptions-table-wrapper`},j(`table`,{class:`${d}-descriptions-table`},j(`tbody`,null,a===`top`&&j(`tr`,{class:`${d}-descriptions-table-row`,style:{visibility:`collapse`}},ye(i*2,j(`td`,null))),h))))}}),Qe={label:String,span:{type:Number,default:1},labelClass:String,labelStyle:[Object,String],contentClass:String,contentStyle:[Object,String]},Q=i({name:`DescriptionsItem`,[Je]:!0,props:Qe,slots:Object,render(){return null}}),$e=C(`n-tabs`),et={tab:[String,Number,Object,Function],name:{type:[String,Number],required:!0},disabled:Boolean,displayDirective:{type:String,default:`if`},closable:{type:Boolean,default:void 0},tabProps:Object,label:[String,Number,Object,Function]},tt=i({__TAB_PANE__:!0,name:`TabPane`,alias:[`TabPanel`],props:et,slots:Object,setup(e){let t=o($e,null);return t||b(`tab-pane`,"`n-tab-pane` must be placed inside `n-tabs`."),{style:t.paneStyleRef,class:t.paneClassRef,mergedClsPrefix:t.mergedClsPrefixRef}},render(){return j(`div`,{class:[`${this.mergedClsPrefix}-tab-pane`,this.class],style:this.style},this.$slots)}}),nt=Object.assign({internalLeftPadded:Boolean,internalAddable:Boolean,internalCreatedByPane:Boolean},be(et,[`displayDirective`])),rt=i({__TAB__:!0,inheritAttrs:!1,name:`Tab`,props:nt,setup(e){let{mergedClsPrefixRef:t,valueRef:n,typeRef:r,closableRef:i,tabStyleRef:a,addTabStyleRef:s,tabClassRef:c,addTabClassRef:l,tabChangeIdRef:d,onBeforeLeaveRef:f,triggerRef:p,handleAdd:m,activateTab:h,handleClose:g}=o($e);return{trigger:p,mergedClosable:u(()=>{if(e.internalAddable)return!1;let{closable:t}=e;return t===void 0?i.value:t}),style:a,addStyle:s,tabClass:c,addTabClass:l,clsPrefix:t,value:n,type:r,handleClose(t){t.stopPropagation(),!e.disabled&&g(e.name)},activateTab(){if(e.disabled)return;if(e.internalAddable){m();return}let{name:t}=e,r=++d.id;if(t!==n.value){let{value:i}=f;i?Promise.resolve(i(e.name,n.value)).then(e=>{e&&d.id===r&&h(t)}):h(t)}}}},render(){let{internalAddable:e,clsPrefix:t,name:n,disabled:r,label:i,tab:a,value:o,mergedClosable:s,trigger:c,$slots:{default:u}}=this,d=i??a;return j(`div`,{class:`${t}-tabs-tab-wrapper`},this.internalLeftPadded?j(`div`,{class:`${t}-tabs-tab-pad`}):null,j(`div`,Object.assign({key:n,"data-name":n,"data-disabled":r?!0:void 0},g({class:[`${t}-tabs-tab`,o===n&&`${t}-tabs-tab--active`,r&&`${t}-tabs-tab--disabled`,s&&`${t}-tabs-tab--closable`,e&&`${t}-tabs-tab--addable`,e?this.addTabClass:this.tabClass],onClick:c===`click`?this.activateTab:void 0,onMouseenter:c===`hover`?this.activateTab:void 0,style:e?this.addStyle:this.style},this.internalCreatedByPane?this.tabProps||{}:this.$attrs)),j(`span`,{class:`${t}-tabs-tab__label`},e?j(l,null,j(`div`,{class:`${t}-tabs-tab__height-placeholder`},`\xA0`),j(x,{clsPrefix:t},{default:()=>j(Ke,null)})):u?u():typeof d==`object`?d:xe(d??n)),s&&this.type===`card`?j(E,{clsPrefix:t,class:`${t}-tabs-tab__close`,onClick:this.handleClose,disabled:r}):null))}}),it=v(`tabs`,`
 box-sizing: border-box;
 width: 100%;
 display: flex;
 flex-direction: column;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
`,[S(`segment-type`,[v(`tabs-rail`,[D(`&.transition-disabled`,[v(`tabs-capsule`,`
 transition: none;
 `)])])]),S(`top`,[v(`tab-pane`,`
 padding: var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left);
 `)]),S(`left`,[v(`tab-pane`,`
 padding: var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left) var(--n-pane-padding-top);
 `)]),S(`left, right`,`
 flex-direction: row;
 `,[v(`tabs-bar`,`
 width: 2px;
 right: 0;
 transition:
 top .2s var(--n-bezier),
 max-height .2s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `),v(`tabs-tab`,`
 padding: var(--n-tab-padding-vertical); 
 `)]),S(`right`,`
 flex-direction: row-reverse;
 `,[v(`tab-pane`,`
 padding: var(--n-pane-padding-left) var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom);
 `),v(`tabs-bar`,`
 left: 0;
 `)]),S(`bottom`,`
 flex-direction: column-reverse;
 justify-content: flex-end;
 `,[v(`tab-pane`,`
 padding: var(--n-pane-padding-bottom) var(--n-pane-padding-right) var(--n-pane-padding-top) var(--n-pane-padding-left);
 `),v(`tabs-bar`,`
 top: 0;
 `)]),v(`tabs-rail`,`
 position: relative;
 padding: 3px;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 background-color: var(--n-color-segment);
 transition: background-color .3s var(--n-bezier);
 display: flex;
 align-items: center;
 `,[v(`tabs-capsule`,`
 border-radius: var(--n-tab-border-radius);
 position: absolute;
 pointer-events: none;
 background-color: var(--n-tab-color-segment);
 box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .08);
 transition: transform 0.3s var(--n-bezier);
 `),v(`tabs-tab-wrapper`,`
 flex-basis: 0;
 flex-grow: 1;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[v(`tabs-tab`,`
 overflow: hidden;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[S(`active`,`
 font-weight: var(--n-font-weight-strong);
 color: var(--n-tab-text-color-active);
 `),D(`&:hover`,`
 color: var(--n-tab-text-color-hover);
 `)])])]),S(`flex`,[v(`tabs-nav`,`
 width: 100%;
 position: relative;
 `,[v(`tabs-wrapper`,`
 width: 100%;
 `,[v(`tabs-tab`,`
 margin-right: 0;
 `)])])]),v(`tabs-nav`,`
 box-sizing: border-box;
 line-height: 1.5;
 display: flex;
 transition: border-color .3s var(--n-bezier);
 `,[z(`prefix, suffix`,`
 display: flex;
 align-items: center;
 `),z(`prefix`,`padding-right: 16px;`),z(`suffix`,`padding-left: 16px;`)]),S(`top, bottom`,[D(`>`,[v(`tabs-nav`,[v(`tabs-nav-scroll-wrapper`,[D(`&::before`,`
 top: 0;
 bottom: 0;
 left: 0;
 width: 20px;
 `),D(`&::after`,`
 top: 0;
 bottom: 0;
 right: 0;
 width: 20px;
 `),S(`shadow-start`,[D(`&::before`,`
 box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, .12);
 `)]),S(`shadow-end`,[D(`&::after`,`
 box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),S(`left, right`,[v(`tabs-nav-scroll-content`,`
 flex-direction: column;
 `),D(`>`,[v(`tabs-nav`,[v(`tabs-nav-scroll-wrapper`,[D(`&::before`,`
 top: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),D(`&::after`,`
 bottom: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),S(`shadow-start`,[D(`&::before`,`
 box-shadow: inset 0 10px 8px -8px rgba(0, 0, 0, .12);
 `)]),S(`shadow-end`,[D(`&::after`,`
 box-shadow: inset 0 -10px 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),v(`tabs-nav-scroll-wrapper`,`
 flex: 1;
 position: relative;
 overflow: hidden;
 `,[v(`tabs-nav-y-scroll`,`
 height: 100%;
 width: 100%;
 overflow-y: auto; 
 scrollbar-width: none;
 `,[D(`&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb`,`
 width: 0;
 height: 0;
 display: none;
 `)]),D(`&::before, &::after`,`
 transition: box-shadow .3s var(--n-bezier);
 pointer-events: none;
 content: "";
 position: absolute;
 z-index: 1;
 `)]),v(`tabs-nav-scroll-content`,`
 display: flex;
 position: relative;
 min-width: 100%;
 min-height: 100%;
 width: fit-content;
 box-sizing: border-box;
 `),v(`tabs-wrapper`,`
 display: inline-flex;
 flex-wrap: nowrap;
 position: relative;
 `),v(`tabs-tab-wrapper`,`
 display: flex;
 flex-wrap: nowrap;
 flex-shrink: 0;
 flex-grow: 0;
 `),v(`tabs-tab`,`
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
 `,[S(`disabled`,{cursor:`not-allowed`}),z(`close`,`
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),z(`label`,`
 display: flex;
 align-items: center;
 z-index: 1;
 `)]),v(`tabs-bar`,`
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
 `,[D(`&.transition-disabled`,`
 transition: none;
 `),S(`disabled`,`
 background-color: var(--n-tab-text-color-disabled)
 `)]),v(`tabs-pane-wrapper`,`
 position: relative;
 overflow: hidden;
 transition: max-height .2s var(--n-bezier);
 `),v(`tab-pane`,`
 color: var(--n-pane-text-color);
 width: 100%;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 opacity .2s var(--n-bezier);
 left: 0;
 right: 0;
 top: 0;
 `,[D(`&.next-transition-leave-active, &.prev-transition-leave-active, &.next-transition-enter-active, &.prev-transition-enter-active`,`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 transform .2s var(--n-bezier),
 opacity .2s var(--n-bezier);
 `),D(`&.next-transition-leave-active, &.prev-transition-leave-active`,`
 position: absolute;
 `),D(`&.next-transition-enter-from, &.prev-transition-leave-to`,`
 transform: translateX(32px);
 opacity: 0;
 `),D(`&.next-transition-leave-to, &.prev-transition-enter-from`,`
 transform: translateX(-32px);
 opacity: 0;
 `),D(`&.next-transition-leave-from, &.next-transition-enter-to, &.prev-transition-leave-from, &.prev-transition-enter-to`,`
 transform: translateX(0);
 opacity: 1;
 `)]),v(`tabs-tab-pad`,`
 box-sizing: border-box;
 width: var(--n-tab-gap);
 flex-grow: 0;
 flex-shrink: 0;
 `),S(`line-type, bar-type`,[v(`tabs-tab`,`
 font-weight: var(--n-tab-font-weight);
 box-sizing: border-box;
 vertical-align: bottom;
 `,[D(`&:hover`,{color:`var(--n-tab-text-color-hover)`}),S(`active`,`
 color: var(--n-tab-text-color-active);
 font-weight: var(--n-tab-font-weight-active);
 `),S(`disabled`,{color:`var(--n-tab-text-color-disabled)`})])]),v(`tabs-nav`,[S(`line-type`,[S(`top`,[z(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),v(`tabs-nav-scroll-content`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),v(`tabs-bar`,`
 bottom: -1px;
 `)]),S(`left`,[z(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),v(`tabs-nav-scroll-content`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),v(`tabs-bar`,`
 right: -1px;
 `)]),S(`right`,[z(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),v(`tabs-nav-scroll-content`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),v(`tabs-bar`,`
 left: -1px;
 `)]),S(`bottom`,[z(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),v(`tabs-nav-scroll-content`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),v(`tabs-bar`,`
 top: -1px;
 `)]),z(`prefix, suffix`,`
 transition: border-color .3s var(--n-bezier);
 `),v(`tabs-nav-scroll-content`,`
 transition: border-color .3s var(--n-bezier);
 `),v(`tabs-bar`,`
 border-radius: 0;
 `)]),S(`card-type`,[z(`prefix, suffix`,`
 transition: border-color .3s var(--n-bezier);
 `),v(`tabs-pad`,`
 flex-grow: 1;
 transition: border-color .3s var(--n-bezier);
 `),v(`tabs-tab-pad`,`
 transition: border-color .3s var(--n-bezier);
 `),v(`tabs-tab`,`
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
 `,[S(`addable`,`
 padding-left: 8px;
 padding-right: 8px;
 font-size: 16px;
 justify-content: center;
 `,[z(`height-placeholder`,`
 width: 0;
 font-size: var(--n-tab-font-size);
 `),R(`disabled`,[D(`&:hover`,`
 color: var(--n-tab-text-color-hover);
 `)])]),S(`closable`,`padding-right: 8px;`),S(`active`,`
 background-color: #0000;
 font-weight: var(--n-tab-font-weight-active);
 color: var(--n-tab-text-color-active);
 `),S(`disabled`,`color: var(--n-tab-text-color-disabled);`)])]),S(`left, right`,`
 flex-direction: column; 
 `,[z(`prefix, suffix`,`
 padding: var(--n-tab-padding-vertical);
 `),v(`tabs-wrapper`,`
 flex-direction: column;
 `),v(`tabs-tab-wrapper`,`
 flex-direction: column;
 `,[v(`tabs-tab-pad`,`
 height: var(--n-tab-gap-vertical);
 width: 100%;
 `)])]),S(`top`,[S(`card-type`,[v(`tabs-scroll-padding`,`border-bottom: 1px solid var(--n-tab-border-color);`),z(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),v(`tabs-tab`,`
 border-top-left-radius: var(--n-tab-border-radius);
 border-top-right-radius: var(--n-tab-border-radius);
 `,[S(`active`,`
 border-bottom: 1px solid #0000;
 `)]),v(`tabs-tab-pad`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),v(`tabs-pad`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `)])]),S(`left`,[S(`card-type`,[v(`tabs-scroll-padding`,`border-right: 1px solid var(--n-tab-border-color);`),z(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),v(`tabs-tab`,`
 border-top-left-radius: var(--n-tab-border-radius);
 border-bottom-left-radius: var(--n-tab-border-radius);
 `,[S(`active`,`
 border-right: 1px solid #0000;
 `)]),v(`tabs-tab-pad`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),v(`tabs-pad`,`
 border-right: 1px solid var(--n-tab-border-color);
 `)])]),S(`right`,[S(`card-type`,[v(`tabs-scroll-padding`,`border-left: 1px solid var(--n-tab-border-color);`),z(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),v(`tabs-tab`,`
 border-top-right-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[S(`active`,`
 border-left: 1px solid #0000;
 `)]),v(`tabs-tab-pad`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),v(`tabs-pad`,`
 border-left: 1px solid var(--n-tab-border-color);
 `)])]),S(`bottom`,[S(`card-type`,[v(`tabs-scroll-padding`,`border-top: 1px solid var(--n-tab-border-color);`),z(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),v(`tabs-tab`,`
 border-bottom-left-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[S(`active`,`
 border-top: 1px solid #0000;
 `)]),v(`tabs-tab-pad`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),v(`tabs-pad`,`
 border-top: 1px solid var(--n-tab-border-color);
 `)])])])]),at=Ge,ot=Object.assign(Object.assign({},d.props),{value:[String,Number],defaultValue:[String,Number],trigger:{type:String,default:`click`},type:{type:String,default:`bar`},closable:Boolean,justifyContent:String,size:String,placement:{type:String,default:`top`},tabStyle:[String,Object],tabClass:String,addTabStyle:[String,Object],addTabClass:String,barWidth:Number,paneClass:String,paneStyle:[String,Object],paneWrapperClass:String,paneWrapperStyle:[String,Object],addable:[Boolean,Object],tabsPadding:{type:Number,default:0},animated:Boolean,onBeforeLeave:Function,onAdd:Function,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onClose:[Function,Array],labelSize:String,activeName:[String,Number],onActiveNameChange:[Function,Array]}),st=i({name:`Tabs`,props:ot,slots:Object,setup(e,{slots:t}){let{mergedClsPrefixRef:n,inlineThemeDisabled:r,mergedComponentPropsRef:i}=re(e),a=d(`Tabs`,`-tabs`,it,Se,e,n),o=F(null),s=F(null),c=F(null),l=F(null),p=F(null),m=F(null),h=F(!0),g=F(!0),v=ce(e,[`labelSize`,`size`]),y=u(()=>v.value?v.value:i?.value?.Tabs?.size||`medium`),b=ce(e,[`activeName`,`value`]),x=F(b.value??e.defaultValue??(t.default?B(t.default())[0]?.props?.name:null)),S=pe(b,x),C={id:0},T=u(()=>{if(!(!e.justifyContent||e.type===`card`))return{display:`flex`,justifyContent:e.justifyContent}});w(S,()=>{C.id=0,k(),A()});function E(){let{value:e}=S;return e===null?null:o.value?.querySelector(`[data-name="${e}"]`)}function D(t){if(e.type===`card`)return;let{value:r}=s;if(!r)return;let i=r.style.opacity===`0`;if(t){let a=`${n.value}-tabs-bar--disabled`,{barWidth:o,placement:s}=e;if(t.dataset.disabled===`true`?r.classList.add(a):r.classList.remove(a),[`top`,`bottom`].includes(s)){if(O([`top`,`maxHeight`,`height`]),typeof o==`number`&&t.offsetWidth>=o){let e=Math.floor((t.offsetWidth-o)/2)+t.offsetLeft;r.style.left=`${e}px`,r.style.maxWidth=`${o}px`}else r.style.left=`${t.offsetLeft}px`,r.style.maxWidth=`${t.offsetWidth}px`;r.style.width=`8192px`,i&&(r.style.transition=`none`),r.offsetWidth,i&&(r.style.transition=``,r.style.opacity=`1`)}else{if(O([`left`,`maxWidth`,`width`]),typeof o==`number`&&t.offsetHeight>=o){let e=Math.floor((t.offsetHeight-o)/2)+t.offsetTop;r.style.top=`${e}px`,r.style.maxHeight=`${o}px`}else r.style.top=`${t.offsetTop}px`,r.style.maxHeight=`${t.offsetHeight}px`;r.style.height=`8192px`,i&&(r.style.transition=`none`),r.offsetHeight,i&&(r.style.transition=``,r.style.opacity=`1`)}}}function te(){if(e.type===`card`)return;let{value:t}=s;t&&(t.style.opacity=`0`)}function O(e){let{value:t}=s;if(t)for(let n of e)t.style[n]=``}function k(){if(e.type===`card`)return;let t=E();t?D(t):te()}function A(){let e=p.value?.$el;if(!e)return;let t=E();if(!t)return;let{scrollLeft:n,offsetWidth:r}=e,{offsetLeft:i,offsetWidth:a}=t;n>i?e.scrollTo({top:0,left:i,behavior:`smooth`}):i+a>n+r&&e.scrollTo({top:0,left:i+a-r,behavior:`smooth`})}let j=F(null),M=0,N=null;function ae(e){let t=j.value;if(t){M=e.getBoundingClientRect().height;let n=`${M}px`,r=()=>{t.style.height=n,t.style.maxHeight=n};N?(r(),N(),N=null):N=r}}function P(e){let t=j.value;if(t){let n=e.getBoundingClientRect().height,r=()=>{document.body.offsetHeight,t.style.maxHeight=`${n}px`,t.style.height=`${Math.max(M,n)}px`};N?(N(),N=null,r()):N=r}}function I(){let t=j.value;if(t){t.style.maxHeight=``,t.style.height=``;let{paneWrapperStyle:n}=e;if(typeof n==`string`)t.style.cssText=n;else if(n){let{maxHeight:e,height:r}=n;e!==void 0&&(t.style.maxHeight=e),r!==void 0&&(t.style.height=r)}}}let se={value:[]},R=F(`next`);function z(e){let t=S.value,n=`next`;for(let r of se.value){if(r===t)break;if(r===e){n=`prev`;break}}R.value=n,V(e)}function V(t){let{onActiveNameChange:n,onUpdateValue:r,"onUpdate:value":i}=e;n&&ge(n,t),r&&ge(r,t),i&&ge(i,t),x.value=t}function le(t){let{onClose:n}=e;n&&ge(n,t)}let H=!0;function U(){let{value:e}=s;if(!e)return;H||=!1;let t=`transition-disabled`;e.classList.add(t),k(),e.classList.remove(t)}let W=F(null);function G({transitionDisabled:e}){let t=o.value;if(!t)return;e&&t.classList.add(`transition-disabled`);let n=E();n&&W.value&&(W.value.style.width=`${n.offsetWidth}px`,W.value.style.height=`${n.offsetHeight}px`,W.value.style.transform=`translateX(${n.offsetLeft-me(getComputedStyle(t).paddingLeft)}px)`,e&&W.value.offsetWidth),e&&t.classList.remove(`transition-disabled`)}w([S],()=>{e.type===`segment`&&_(()=>{G({transitionDisabled:!1})})}),ne(()=>{e.type===`segment`&&G({transitionDisabled:!0})});let K=0;function ue(t){if(t.contentRect.width===0&&t.contentRect.height===0||K===t.contentRect.width)return;K=t.contentRect.width;let{type:n}=e;if((n===`line`||n===`bar`)&&(H||e.justifyContent?.startsWith(`space`))&&U(),n!==`segment`){let{placement:t}=e;Y((t===`top`||t===`bottom`?p.value?.$el:m.value)||null)}}let de=at(ue,64);w([()=>e.justifyContent,()=>e.size],()=>{_(()=>{let{type:t}=e;(t===`line`||t===`bar`)&&U()})});let q=F(!1);function _e(t){let{target:n,contentRect:{width:r,height:i}}=t,a=n.parentElement.parentElement.offsetWidth,o=n.parentElement.parentElement.offsetHeight,{placement:s}=e;if(!q.value)s===`top`||s===`bottom`?a<r&&(q.value=!0):o<i&&(q.value=!0);else{let{value:e}=l;if(!e)return;s===`top`||s===`bottom`?a-r>e.$el.offsetWidth&&(q.value=!1):o-i>e.$el.offsetHeight&&(q.value=!1)}Y(p.value?.$el||null)}let J=at(_e,64);function ve(){let{onAdd:t}=e;t&&t(),_(()=>{let e=E(),{value:t}=p;!e||!t||t.scrollTo({left:e.offsetLeft,top:0,behavior:`smooth`})})}function Y(t){if(!t)return;let{placement:n}=e;if(n===`top`||n===`bottom`){let{scrollLeft:e,scrollWidth:n,offsetWidth:r}=t;h.value=e<=0,g.value=e+r>=n}else{let{scrollTop:e,scrollHeight:n,offsetHeight:r}=t;h.value=e<=0,g.value=e+r>=n}}let ye=at(e=>{Y(e.target)},64);ie($e,{triggerRef:L(e,`trigger`),tabStyleRef:L(e,`tabStyle`),tabClassRef:L(e,`tabClass`),addTabStyleRef:L(e,`addTabStyle`),addTabClassRef:L(e,`addTabClass`),paneClassRef:L(e,`paneClass`),paneStyleRef:L(e,`paneStyle`),mergedClsPrefixRef:n,typeRef:L(e,`type`),closableRef:L(e,`closable`),valueRef:S,tabChangeIdRef:C,onBeforeLeaveRef:L(e,`onBeforeLeave`),activateTab:z,handleClose:le,handleAdd:ve}),fe(()=>{k(),A()}),ee(()=>{let{value:e}=c;if(!e)return;let{value:t}=n,r=`${t}-tabs-nav-scroll-wrapper--shadow-start`,i=`${t}-tabs-nav-scroll-wrapper--shadow-end`;h.value?e.classList.remove(r):e.classList.add(r),g.value?e.classList.remove(i):e.classList.add(i)});let be={syncBarPosition:()=>{k()}},xe=()=>{G({transitionDisabled:!0})},X=u(()=>{let{value:t}=y,{type:n}=e,r=`${t}${{card:`Card`,bar:`Bar`,line:`Line`,segment:`Segment`}[n]}`,{self:{barColor:i,closeIconColor:o,closeIconColorHover:s,closeIconColorPressed:c,tabColor:l,tabBorderColor:u,paneTextColor:d,tabFontWeight:p,tabBorderRadius:m,tabFontWeightActive:h,colorSegment:g,fontWeightStrong:_,tabColorSegment:v,closeSize:b,closeIconSize:x,closeColorHover:S,closeColorPressed:C,closeBorderRadius:w,[f(`panePadding`,t)]:T,[f(`tabPadding`,r)]:ee,[f(`tabPaddingVertical`,r)]:E,[f(`tabGap`,r)]:D,[f(`tabGap`,`${r}Vertical`)]:te,[f(`tabTextColor`,n)]:O,[f(`tabTextColorActive`,n)]:ne,[f(`tabTextColorHover`,n)]:re,[f(`tabTextColorDisabled`,n)]:ie,[f(`tabFontSize`,t)]:k},common:{cubicBezierEaseInOut:A}}=a.value;return{"--n-bezier":A,"--n-color-segment":g,"--n-bar-color":i,"--n-tab-font-size":k,"--n-tab-text-color":O,"--n-tab-text-color-active":ne,"--n-tab-text-color-disabled":ie,"--n-tab-text-color-hover":re,"--n-pane-text-color":d,"--n-tab-border-color":u,"--n-tab-border-radius":m,"--n-close-size":b,"--n-close-icon-size":x,"--n-close-color-hover":S,"--n-close-color-pressed":C,"--n-close-border-radius":w,"--n-close-icon-color":o,"--n-close-icon-color-hover":s,"--n-close-icon-color-pressed":c,"--n-tab-color":l,"--n-tab-font-weight":p,"--n-tab-font-weight-active":h,"--n-tab-padding":ee,"--n-tab-padding-vertical":E,"--n-tab-gap":D,"--n-tab-gap-vertical":te,"--n-pane-padding-left":he(T,`left`),"--n-pane-padding-right":he(T,`right`),"--n-pane-padding-top":he(T,`top`),"--n-pane-padding-bottom":he(T,`bottom`),"--n-font-weight-strong":_,"--n-tab-color-segment":v}}),Ce=r?oe(`tabs`,u(()=>`${y.value[0]}${e.type[0]}`),X,e):void 0;return Object.assign({mergedClsPrefix:n,mergedValue:S,renderedNames:new Set,segmentCapsuleElRef:W,tabsPaneWrapperRef:j,tabsElRef:o,barElRef:s,addTabInstRef:l,xScrollInstRef:p,scrollWrapperElRef:c,addTabFixed:q,tabWrapperStyle:T,handleNavResize:de,mergedSize:y,handleScroll:ye,handleTabsResize:J,cssVars:r?void 0:X,themeClass:Ce?.themeClass,animationDirection:R,renderNameListRef:se,yScrollElRef:m,handleSegmentResize:xe,onAnimationBeforeLeave:ae,onAnimationEnter:P,onAnimationAfterEnter:I,onRender:Ce?.onRender},be)},render(){let{mergedClsPrefix:e,type:t,placement:n,addTabFixed:r,addable:i,mergedSize:a,renderNameListRef:o,onRender:s,paneWrapperClass:c,paneWrapperStyle:l,$slots:{default:u,prefix:d,suffix:f}}=this;s?.();let p=u?B(u()).filter(e=>e.type.__TAB_PANE__===!0):[],m=u?B(u()).filter(e=>e.type.__TAB__===!0):[],h=!m.length,g=t===`card`,_=t===`segment`,v=!g&&!_&&this.justifyContent;o.value=[];let y=()=>{let t=j(`div`,{style:this.tabWrapperStyle,class:`${e}-tabs-wrapper`},v?null:j(`div`,{class:`${e}-tabs-scroll-padding`,style:n===`top`||n===`bottom`?{width:`${this.tabsPadding}px`}:{height:`${this.tabsPadding}px`}}),h?p.map((e,t)=>(o.value.push(e.props.name),dt(j(rt,Object.assign({},e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0&&(!v||v===`center`||v===`start`||v===`end`)}),e.children?{default:e.children.tab}:void 0)))):m.map((e,t)=>(o.value.push(e.props.name),dt(t!==0&&!v?ut(e):e))),!r&&i&&g?lt(i,(h?p.length:m.length)!==0):null,v?null:j(`div`,{class:`${e}-tabs-scroll-padding`,style:{width:`${this.tabsPadding}px`}}));return j(`div`,{ref:`tabsElRef`,class:`${e}-tabs-nav-scroll-content`},g&&i?j(Y,{onResize:this.handleTabsResize},{default:()=>t}):t,g?j(`div`,{class:`${e}-tabs-pad`}):null,g?null:j(`div`,{ref:`barElRef`,class:`${e}-tabs-bar`}))},b=_?`top`:n;return j(`div`,{class:[`${e}-tabs`,this.themeClass,`${e}-tabs--${t}-type`,`${e}-tabs--${a}-size`,v&&`${e}-tabs--flex`,`${e}-tabs--${b}`],style:this.cssVars},j(`div`,{class:[`${e}-tabs-nav--${t}-type`,`${e}-tabs-nav--${b}`,`${e}-tabs-nav`]},_e(d,t=>t&&j(`div`,{class:`${e}-tabs-nav__prefix`},t)),_?j(Y,{onResize:this.handleSegmentResize},{default:()=>j(`div`,{class:`${e}-tabs-rail`,ref:`tabsElRef`},j(`div`,{class:`${e}-tabs-capsule`,ref:`segmentCapsuleElRef`},j(`div`,{class:`${e}-tabs-wrapper`},j(`div`,{class:`${e}-tabs-tab`}))),h?p.map((e,t)=>(o.value.push(e.props.name),j(rt,Object.assign({},e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0}),e.children?{default:e.children.tab}:void 0))):m.map((e,t)=>(o.value.push(e.props.name),t===0?e:ut(e))))}):j(Y,{onResize:this.handleNavResize},{default:()=>j(`div`,{class:`${e}-tabs-nav-scroll-wrapper`,ref:`scrollWrapperElRef`},[`top`,`bottom`].includes(b)?j(De,{ref:`xScrollInstRef`,onScroll:this.handleScroll},{default:y}):j(`div`,{class:`${e}-tabs-nav-y-scroll`,onScroll:this.handleScroll,ref:`yScrollElRef`},y()))}),r&&i&&g?lt(i,!0):null,_e(f,t=>t&&j(`div`,{class:`${e}-tabs-nav__suffix`},t))),h&&(this.animated&&(b===`top`||b===`bottom`)?j(`div`,{ref:`tabsPaneWrapperRef`,style:l,class:[`${e}-tabs-pane-wrapper`,c]},ct(p,this.mergedValue,this.renderedNames,this.onAnimationBeforeLeave,this.onAnimationEnter,this.onAnimationAfterEnter,this.animationDirection)):ct(p,this.mergedValue,this.renderedNames)))}});function ct(t,n,r,i,a,o,s){let l=[];return t.forEach(t=>{let{name:i,displayDirective:a,"display-directive":o}=t.props,s=e=>a===e||o===e,c=n===i;if(t.key!==void 0&&(t.key=i),c||s(`show`)||s(`show:lazy`)&&r.has(i)){r.has(i)||r.add(i);let n=!s(`if`);l.push(n?te(t,[[e,c]]):t)}}),s?j(c,{name:`${s}-transition`,onBeforeLeave:i,onEnter:a,onAfterEnter:o},{default:()=>l}):l}function lt(e,t){return j(rt,{ref:`addTabInstRef`,key:`__addable`,name:`__addable`,internalCreatedByPane:!0,internalAddable:!0,internalLeftPadded:t,disabled:typeof e==`object`&&e.disabled})}function ut(e){let t=s(e);return t.props?t.props.internalLeftPadded=!0:t.props={internalLeftPadded:!0},t}function dt(e){return Array.isArray(e.dynamicProps)?e.dynamicProps.includes(`internalLeftPadded`)||e.dynamicProps.push(`internalLeftPadded`):e.dynamicProps=[`internalLeftPadded`],e}var $={containers:()=>M.get(`/api/docker/containers`),containerAction:(e,t)=>M.post(`/api/docker/containers/${encodeURIComponent(e)}/${t}`),images:()=>M.get(`/api/docker/images`),removeImage:e=>M.post(`/api/docker/images/${encodeURIComponent(e)}/remove`),volumes:()=>M.get(`/api/docker/volumes`),removeVolume:e=>M.post(`/api/docker/volumes/${encodeURIComponent(e)}/remove`),networks:()=>M.get(`/api/docker/networks`),removeNetwork:e=>M.post(`/api/docker/networks/${encodeURIComponent(e)}/remove`),settings:()=>M.get(`/api/docker/settings`),prune:e=>M.post(`/api/docker/prune/${e}`)},ft={key:1,class:`tab-loading`},pt=ve(i({__name:`DockerView`,setup(e){let n=ue();function i(e){return e instanceof O&&e.status===503&&!!e.body&&typeof e.body==`object`&&`enabled`in e.body}function o(e,t){n.error(e instanceof O?e.message:t)}let s=e=>e===`running`?`success`:e===`paused`||e===`restarting`?`warning`:e===`dead`?`error`:`default`,c=F([]),u=F(!0),d=F(null),f;async function h(){try{let e=await $.containers();c.value=e.containers,d.value=null}catch(e){i(e)&&(d.value=e.body)}finally{u.value=!1}}async function g(e,t){try{let n=await $.containerAction(e,t);c.value=n.containers}catch(e){o(e,`Aksi ${t} gagal`)}}let _=[{title:`Nama`,key:`name`,width:160,ellipsis:{tooltip:!0}},{title:`Image`,key:`image`,width:180,ellipsis:{tooltip:!0}},{title:`Status`,key:`state`,width:130,render:e=>j(K,{type:s(e.state),size:`small`},{default:()=>e.status})},{title:`CPU`,key:`cpu`,width:70,render:e=>e.hasStats?`${e.stats.cpuPercent.toFixed(1)}%`:`—`},{title:`RAM`,key:`ram`,width:150,render:e=>e.hasStats?`${Z(e.stats.memUsageBytes)} / ${Z(e.stats.memLimitBytes)}`:`—`},{title:`Network`,key:`net`,width:140,render:e=>e.hasStats?`↓ ${Z(e.stats.netRxBytes)} ↑ ${Z(e.stats.netTxBytes)}`:`—`},{title:`Ports`,key:`ports`,width:220,ellipsis:{tooltip:!0}},{title:`Aksi`,key:`actions`,width:220,fixed:`right`,render:e=>j(G,{size:`small`},()=>[e.state===`running`?[j(J,{size:`tiny`,onClick:()=>g(e.id,`stop`)},()=>`Stop`),j(J,{size:`tiny`,onClick:()=>g(e.id,`restart`)},()=>`Restart`)]:j(J,{size:`tiny`,type:`primary`,onClick:()=>g(e.id,`start`)},()=>`Start`),j(q,{onPositiveClick:()=>g(e.id,`remove`)},{trigger:()=>j(J,{size:`tiny`,type:`error`,ghost:!0},()=>`Hapus`),default:()=>`Hapus container "${e.name}"?`})])}],v=F([]),b=F(!0),x=F(null);async function S(){b.value=!0;try{let e=await $.images();v.value=e.images,x.value=null}catch(e){i(e)&&(x.value=e.body)}finally{b.value=!1}}async function C(e){try{let t=await $.removeImage(e);v.value=t.images}catch(e){o(e,`Hapus image gagal (mungkin masih dipakai container)`)}}let T=[{title:`Tag`,key:`tag`,render:e=>e.dangling?j(G,{size:`small`,align:`center`},()=>[e.tag,j(K,{size:`small`,type:`warning`},()=>`dangling`)]):e.tag},{title:`Ukuran`,key:`sizeBytes`,render:e=>Z(e.sizeBytes)},{title:`Dipakai`,key:`containers`,render:e=>e.containers<0?`—`:e.containers===0?`tidak dipakai`:`${e.containers} container`},{title:`Dibuat`,key:`created`,render:e=>we(e.created)},{title:`Aksi`,key:`actions`,render:e=>j(q,{onPositiveClick:()=>C(e.id)},{trigger:()=>j(J,{size:`tiny`,type:`error`,ghost:!0},()=>`Hapus`),default:()=>`Hapus image "${e.tag}"?`})}],ee=F([]),E=F(!0),D=F(null);async function te(){E.value=!0;try{let e=await $.volumes();ee.value=e.volumes,D.value=null}catch(e){i(e)&&(D.value=e.body)}finally{E.value=!1}}async function re(e){try{let t=await $.removeVolume(e);ee.value=t.volumes}catch(e){o(e,`Hapus volume gagal (mungkin masih dipakai container)`)}}let ie=[{title:`Nama`,key:`name`},{title:`Driver`,key:`driver`},{title:`Ukuran`,key:`sizeBytes`,render:e=>e.sizeBytes<0?`tidak diketahui`:Z(e.sizeBytes)},{title:`Status`,key:`inUse`,render:e=>j(K,{size:`small`,type:e.inUse?`success`:`default`},()=>e.inUse?`dipakai`:`tidak dipakai`)},{title:`Aksi`,key:`actions`,render:e=>j(q,{onPositiveClick:()=>re(e.name)},{trigger:()=>j(J,{size:`tiny`,type:`error`,ghost:!0},()=>`Hapus`),default:()=>`Hapus volume "${e.name}"?`})}],A=F([]),M=F(!0),P=F(null);async function oe(){M.value=!0;try{let e=await $.networks();A.value=e.networks,P.value=null}catch(e){i(e)&&(P.value=e.body)}finally{M.value=!1}}async function se(e){try{let t=await $.removeNetwork(e);A.value=t.networks}catch(e){o(e,`Hapus network gagal (mungkin builtin atau masih dipakai)`)}}let L=[{title:`Nama`,key:`name`,render:e=>e.builtin?j(G,{size:`small`,align:`center`},()=>[e.name,j(K,{size:`small`},()=>`builtin`)]):e.name},{title:`Driver`,key:`driver`},{title:`Subnet`,key:`subnet`,render:e=>e.subnet||`—`},{title:`Container Terhubung`,key:`connectedCount`},{title:`Aksi`,key:`actions`,render:e=>e.builtin?null:j(q,{onPositiveClick:()=>se(e.id)},{trigger:()=>j(J,{size:`tiny`,type:`error`,ghost:!0},()=>`Hapus`),default:()=>`Hapus network "${e.name}"?`})}],R=F(null),z=F(!0),B=F(null),V=F(null);async function ce(){z.value=!0;try{R.value=await $.settings(),B.value=null}catch(e){i(e)&&(B.value=e.body)}finally{z.value=!1}}async function H(e){V.value=e;try{R.value=await $.prune(e),n.success(`Cleanup selesai`)}catch(t){o(t,`Cleanup gagal: ${e}`)}finally{V.value=null}}let U=F(`containers`),fe=new Set([`containers`]);return w(U,e=>{fe.has(e)||(fe.add(e),e===`images`?S():e===`volumes`?te():e===`networks`?oe():e===`settings`&&ce())}),ne(()=>{h(),f=setInterval(h,5e3)}),N(()=>{f&&clearInterval(f)}),(e,n)=>(y(),t(le,null,{default:k(()=>[m(I(st),{type:`line`,value:U.value,"onUpdate:value":n[0]||=e=>U.value=e},{default:k(()=>[m(I(tt),{name:`containers`,tab:`Containers`},{default:k(()=>[d.value?(y(),t(I(X),{key:0,type:`warning`,title:d.value.error},null,8,[`title`])):(y(),t(I(W),{key:1,columns:_,data:c.value,loading:u.value,"row-key":e=>e.id,"scroll-x":1200},null,8,[`data`,`loading`,`row-key`]))]),_:1}),m(I(tt),{name:`images`,tab:`Images`},{default:k(()=>[x.value?(y(),t(I(X),{key:0,type:`warning`,title:x.value.error},null,8,[`title`])):(y(),t(I(W),{key:1,columns:T,data:v.value,loading:b.value,"row-key":e=>e.id},null,8,[`data`,`loading`,`row-key`]))]),_:1}),m(I(tt),{name:`volumes`,tab:`Volumes`},{default:k(()=>[D.value?(y(),t(I(X),{key:0,type:`warning`,title:D.value.error},null,8,[`title`])):(y(),t(I(W),{key:1,columns:ie,data:ee.value,loading:E.value,"row-key":e=>e.name},null,8,[`data`,`loading`,`row-key`]))]),_:1}),m(I(tt),{name:`networks`,tab:`Networks`},{default:k(()=>[P.value?(y(),t(I(X),{key:0,type:`warning`,title:P.value.error},null,8,[`title`])):(y(),t(I(W),{key:1,columns:L,data:A.value,loading:M.value,"row-key":e=>e.id},null,8,[`data`,`loading`,`row-key`]))]),_:1}),m(I(tt),{name:`settings`,tab:`Settings`},{default:k(()=>[B.value?(y(),t(I(X),{key:0,type:`warning`,title:B.value.error},null,8,[`title`])):z.value&&!R.value?(y(),a(`div`,ft,[m(I(Te),{size:`large`})])):R.value?(y(),t(I(G),{key:3,vertical:``,size:24},{default:k(()=>[m(I(Ze),{title:`Info Daemon`,column:2,bordered:``,"label-placement":`left`},{default:k(()=>[m(I(Q),{label:`Versi Server`},{default:k(()=>[p(r(R.value?.info.serverVersion),1)]),_:1}),m(I(Q),{label:`OS / Kernel`},{default:k(()=>[p(r(R.value?.info.operatingSystem)+` / `+r(R.value?.info.kernelVersion),1)]),_:1}),m(I(Q),{label:`Storage Driver`},{default:k(()=>[p(r(R.value?.info.storageDriver),1)]),_:1}),m(I(Q),{label:`Root Dir`},{default:k(()=>[p(r(R.value?.info.dockerRootDir),1)]),_:1}),m(I(Q),{label:`Container`},{default:k(()=>[p(r(R.value?.info.containersRunning)+` running, `+r(R.value?.info.containersPaused)+` paused, `+r(R.value?.info.containersStopped)+` stopped `,1)]),_:1}),m(I(Q),{label:`Images`},{default:k(()=>[p(r(R.value?.info.images),1)]),_:1})]),_:1}),m(I(Ze),{title:`Disk Usage`,column:2,bordered:``,"label-placement":`left`},{default:k(()=>[m(I(Q),{label:`Images`},{default:k(()=>[p(r(I(Z)(R.value?.diskUsage.imagesTotalBytes??0))+` (reclaimable `+r(I(Z)(R.value?.diskUsage.imagesReclaimableBytes??0))+`) `,1)]),_:1}),m(I(Q),{label:`Containers`},{default:k(()=>[p(r(I(Z)(R.value?.diskUsage.containersTotalBytes??0)),1)]),_:1}),m(I(Q),{label:`Volumes`},{default:k(()=>[p(r(I(Z)(R.value?.diskUsage.volumesTotalBytes??0))+` (reclaimable `+r(I(Z)(R.value?.diskUsage.volumesReclaimableBytes??0))+`) `,1)]),_:1})]),_:1}),m(I(G),null,{default:k(()=>[(y(),a(l,null,ae([`containers`,`images`,`volumes`,`networks`,`all`],e=>m(I(q),{key:e,onPositiveClick:t=>H(e)},{trigger:k(()=>[m(I(J),{size:`small`,loading:V.value===e},{default:k(()=>[p(`Bersihkan `+r(e),1)]),_:2},1032,[`loading`])]),default:k(()=>[p(` Jalankan cleanup "`+r(e)+`"? Tindakan ini tidak bisa dibatalkan. `,1)]),_:2},1032,[`onPositiveClick`])),64))]),_:1})]),_:1})):(y(),t(I(de),{key:2,description:`Tidak ada data`}))]),_:1})]),_:1},8,[`value`])]),_:1}))}}),[[`__scopeId`,`data-v-961296c9`]]);export{pt as default};