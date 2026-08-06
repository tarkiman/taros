import{$t as e,A as t,An as n,Bn as r,Cn as i,Ct as a,Dn as o,Dt as s,Fn as c,Gn as l,Gt as u,In as d,Kn as f,Mt as p,O as m,On as h,Qt as g,Rn as _,Rt as v,Sn as y,Tn as b,Ut as x,Wn as S,Xt as C,Yt as w,Zn as T,_n as E,bn as D,bt as O,c as k,cn as ee,ct as te,d as A,dt as ne,en as j,er as M,ft as N,it as re,kn as P,kt as ie,mn as F,nn as ae,o as oe,or as I,qn as L,rn as se,rr as R,tn as z,tt as B,un as V,vn as H,w as U,wn as W,xt as G,zn as ce}from"./auth-DhbqZPGu.js";import{C as le,S as K,g as q,h as ue,t as de,u as fe}from"./AppShell-B_mcjmaY.js";import{r as pe,t as J}from"./DataTable-DLx6cXV2.js";import{p as me}from"./createLucideIcon-Cwm8Fk5q.js";import{o as he}from"./get-P0QtIeki.js";import{C as ge,S as _e}from"./light-Bz5wMkf3.js";import{t as ve}from"./get-slot-6kXJmSMP.js";import{t as ye}from"./Add-BOxXvPZ9.js";import{t as be}from"./Tag-BBjcEX6v.js";import{t as Y}from"./Alert-DRXDJhIS.js";import{n as xe,r as Se}from"./light-B35qdR3K.js";import{t as Ce}from"./use-message-D800Ger1.js";import{t as X}from"./Space-mL1FVPb0.js";import{t as we}from"./Popconfirm-CXqwrSVF.js";import{t as Z}from"./docker-DoZfrUb0.js";import{n as Te,t as Q}from"./format-BxLcbkc3.js";var Ee=ue(`.v-x-scroll`,{overflow:`auto`,scrollbarWidth:`none`},[ue(`&::-webkit-scrollbar`,{width:0,height:0})]),De=b({name:`XScroll`,props:{disabled:Boolean,onScroll:Function},setup(){let e=T(null);function t(e){!(e.currentTarget.offsetWidth<e.currentTarget.scrollWidth)||e.deltaY===0||(e.currentTarget.scrollLeft+=e.deltaY+e.deltaX,e.preventDefault())}let n=ie();return Ee.mount({id:`vueuc/x-scroll`,head:!0,anchorMetaName:q,ssr:n}),Object.assign({selfRef:e,handleWheel:t},{scrollTo(...t){var n;(n=e.value)==null||n.scrollTo(...t)}})},render(){return o(`div`,{ref:`selfRef`,onScroll:this.onScroll,onWheel:this.disabled?void 0:this.handleWheel,class:`v-x-scroll`},this.$slots)}});function Oe(e,t=`default`,n=[]){let{children:r}=e;if(typeof r==`object`&&r&&!Array.isArray(r)){let e=r[t];if(typeof e==`function`)return e()}return n}var ke=/\s/;function Ae(e){for(var t=e.length;t--&&ke.test(e.charAt(t)););return t}var je=/^\s+/;function Me(e){return e&&e.slice(0,Ae(e)+1).replace(je,``)}var Ne=NaN,Pe=/^[-+]0x[0-9a-f]+$/i,Fe=/^0b[01]+$/i,Ie=/^0o[0-7]+$/i,Le=parseInt;function Re(e){if(typeof e==`number`)return e;if(re(e))return Ne;if(B(e)){var t=typeof e.valueOf==`function`?e.valueOf():e;e=B(t)?t+``:t}if(typeof e!=`string`)return e===0?e:+e;e=Me(e);var n=Fe.test(e);return n||Ie.test(e)?Le(e.slice(2),n?2:8):Pe.test(e)?Ne:+e}var ze=function(){return te.Date.now()},Be=`Expected a function`,Ve=Math.max,He=Math.min;function Ue(e,t,n){var r,i,a,o,s,c,l=0,u=!1,d=!1,f=!0;if(typeof e!=`function`)throw TypeError(Be);t=Re(t)||0,B(n)&&(u=!!n.leading,d=`maxWait`in n,a=d?Ve(Re(n.maxWait)||0,t):a,f=`trailing`in n?!!n.trailing:f);function p(t){var n=r,a=i;return r=i=void 0,l=t,o=e.apply(a,n),o}function m(e){return l=e,s=setTimeout(_,t),u?p(e):o}function h(e){var n=e-c,r=e-l,i=t-n;return d?He(i,a-r):i}function g(e){var n=e-c,r=e-l;return c===void 0||n>=t||n<0||d&&r>=a}function _(){var e=ze();if(g(e))return v(e);s=setTimeout(_,h(e))}function v(e){return s=void 0,f&&r?p(e):(r=i=void 0,o)}function y(){s!==void 0&&clearTimeout(s),l=0,r=c=i=s=void 0}function b(){return s===void 0?o:v(ze())}function x(){var e=ze(),n=g(e);if(r=arguments,i=this,c=e,n){if(s===void 0)return m(c);if(d)return clearTimeout(s),s=setTimeout(_,t),p(c)}return s===void 0&&(s=setTimeout(_,t)),o}return x.cancel=y,x.flush=b,x}var We=`Expected a function`;function Ge(e,t,n){var r=!0,i=!0;if(typeof e!=`function`)throw TypeError(We);return B(n)&&(r=`leading`in n?!!n.leading:r,i=`trailing`in n?!!n.trailing:i),Ue(e,t,{leading:r,maxWait:t,trailing:i})}var Ke=w([C(`descriptions`,{fontSize:`var(--n-font-size)`},[C(`descriptions-separator`,`
 display: inline-block;
 margin: 0 8px 0 2px;
 `),C(`descriptions-table-wrapper`,[C(`descriptions-table`,[C(`descriptions-table-row`,[C(`descriptions-table-header`,{padding:`var(--n-th-padding)`}),C(`descriptions-table-content`,{padding:`var(--n-td-padding)`})])])]),j(`bordered`,[C(`descriptions-table-wrapper`,[C(`descriptions-table`,[C(`descriptions-table-row`,[w(`&:last-child`,[C(`descriptions-table-content`,{paddingBottom:0})])])])])]),e(`left-label-placement`,[C(`descriptions-table-content`,[w(`> *`,{verticalAlign:`top`})])]),e(`left-label-align`,[w(`th`,{textAlign:`left`})]),e(`center-label-align`,[w(`th`,{textAlign:`center`})]),e(`right-label-align`,[w(`th`,{textAlign:`right`})]),e(`bordered`,[C(`descriptions-table-wrapper`,`
 border-radius: var(--n-border-radius);
 overflow: hidden;
 background: var(--n-merged-td-color);
 border: 1px solid var(--n-merged-border-color);
 `,[C(`descriptions-table`,[C(`descriptions-table-row`,[w(`&:not(:last-child)`,[C(`descriptions-table-content`,{borderBottom:`1px solid var(--n-merged-border-color)`}),C(`descriptions-table-header`,{borderBottom:`1px solid var(--n-merged-border-color)`})]),C(`descriptions-table-header`,`
 font-weight: 400;
 background-clip: padding-box;
 background-color: var(--n-merged-th-color);
 `,[w(`&:not(:last-child)`,{borderRight:`1px solid var(--n-merged-border-color)`})]),C(`descriptions-table-content`,[w(`&:not(:last-child)`,{borderRight:`1px solid var(--n-merged-border-color)`})])])])])]),C(`descriptions-header`,`
 font-weight: var(--n-th-font-weight);
 font-size: 18px;
 transition: color .3s var(--n-bezier);
 line-height: var(--n-line-height);
 margin-bottom: 16px;
 color: var(--n-title-text-color);
 `),C(`descriptions-table-wrapper`,`
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[C(`descriptions-table`,`
 width: 100%;
 border-collapse: separate;
 border-spacing: 0;
 box-sizing: border-box;
 `,[C(`descriptions-table-row`,`
 box-sizing: border-box;
 transition: border-color .3s var(--n-bezier);
 `,[C(`descriptions-table-header`,`
 font-weight: var(--n-th-font-weight);
 line-height: var(--n-line-height);
 display: table-cell;
 box-sizing: border-box;
 color: var(--n-th-text-color);
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `),C(`descriptions-table-content`,`
 vertical-align: top;
 line-height: var(--n-line-height);
 display: table-cell;
 box-sizing: border-box;
 color: var(--n-td-text-color);
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[g(`content`,`
 transition: color .3s var(--n-bezier);
 display: inline-block;
 color: var(--n-td-text-color);
 `)]),g(`label`,`
 font-weight: var(--n-th-font-weight);
 transition: color .3s var(--n-bezier);
 display: inline-block;
 margin-right: 14px;
 color: var(--n-th-text-color);
 `)])])])]),C(`descriptions-table-wrapper`,`
 --n-merged-th-color: var(--n-th-color);
 --n-merged-td-color: var(--n-td-color);
 --n-merged-border-color: var(--n-border-color);
 `),ae(C(`descriptions-table-wrapper`,`
 --n-merged-th-color: var(--n-th-color-modal);
 --n-merged-td-color: var(--n-td-color-modal);
 --n-merged-border-color: var(--n-border-color-modal);
 `)),se(C(`descriptions-table-wrapper`,`
 --n-merged-th-color: var(--n-th-color-popover);
 --n-merged-td-color: var(--n-td-color-popover);
 --n-merged-border-color: var(--n-border-color-popover);
 `))]),qe=`DESCRIPTION_ITEM_FLAG`;function Je(e){return typeof e==`object`&&e&&!Array.isArray(e)?e.type&&e.type.DESCRIPTION_ITEM_FLAG:!1}var Ye=Object.assign(Object.assign({},t.props),{title:String,column:{type:Number,default:3},columns:Number,labelPlacement:{type:String,default:`top`},labelAlign:{type:String,default:`left`},separator:{type:String,default:`:`},size:String,bordered:Boolean,labelClass:String,labelStyle:[Object,String],contentClass:String,contentStyle:[Object,String]}),Xe=b({name:`Descriptions`,props:Ye,slots:Object,setup(e){let{mergedClsPrefixRef:n,inlineThemeDisabled:r,mergedComponentPropsRef:i}=N(e),a=H(()=>e.size||i?.value?.Descriptions?.size||`medium`),o=t(`Descriptions`,`-descriptions`,Ke,Se,e,n),s=H(()=>{let{bordered:t}=e,n=a.value,{common:{cubicBezierEaseInOut:r},self:{titleTextColor:i,thColor:s,thColorModal:c,thColorPopover:l,thTextColor:u,thFontWeight:d,tdTextColor:f,tdColor:p,tdColorModal:m,tdColorPopover:h,borderColor:g,borderColorModal:_,borderColorPopover:v,borderRadius:y,lineHeight:b,[z(`fontSize`,n)]:x,[z(t?`thPaddingBordered`:`thPadding`,n)]:S,[z(t?`tdPaddingBordered`:`tdPadding`,n)]:C}}=o.value;return{"--n-title-text-color":i,"--n-th-padding":S,"--n-td-padding":C,"--n-font-size":x,"--n-bezier":r,"--n-th-font-weight":d,"--n-line-height":b,"--n-th-text-color":u,"--n-td-text-color":f,"--n-th-color":s,"--n-th-color-modal":c,"--n-th-color-popover":l,"--n-td-color":p,"--n-td-color-modal":m,"--n-td-color-popover":h,"--n-border-radius":y,"--n-border-color":g,"--n-border-color-modal":_,"--n-border-color-popover":v}}),c=r?ne(`descriptions`,H(()=>{let t=``,{bordered:n}=e;return n&&(t+=`a`),t+=a.value[0],t}),s,e):void 0;return{mergedClsPrefix:n,cssVars:r?void 0:s,themeClass:c?.themeClass,onRender:c?.onRender,compitableColumn:K(e,[`columns`,`column`]),inlineThemeDisabled:r,mergedSize:a}},render(){let e=this.$slots.default,t=e?me(e()):[];t.length;let{contentClass:n,labelClass:r,compitableColumn:i,labelPlacement:a,labelAlign:s,mergedSize:c,bordered:l,title:u,cssVars:d,mergedClsPrefix:f,separator:p,onRender:m}=this;m?.();let h=t.filter(e=>Je(e)),g=h.reduce((e,t,s)=>{let c=t.props||{},u=h.length-1===s,d=[`label`in c?c.label:Oe(t,`label`)],m=[Oe(t)],g=c.span||1,_=e.span;e.span+=g;let v=c.labelStyle||c[`label-style`]||this.labelStyle,y=c.contentStyle||c[`content-style`]||this.contentStyle;if(a===`left`)l?e.row.push(o(`th`,{class:[`${f}-descriptions-table-header`,r],colspan:1,style:v},d),o(`td`,{class:[`${f}-descriptions-table-content`,n],colspan:u?(i-_)*2+1:g*2-1,style:y},m)):e.row.push(o(`td`,{class:`${f}-descriptions-table-content`,colspan:u?(i-_)*2:g*2},o(`span`,{class:[`${f}-descriptions-table-content__label`,r],style:v},[...d,p&&o(`span`,{class:`${f}-descriptions-separator`},p)]),o(`span`,{class:[`${f}-descriptions-table-content__content`,n],style:y},m)));else{let t=u?(i-_)*2:g*2;e.row.push(o(`th`,{class:[`${f}-descriptions-table-header`,r],colspan:t,style:v},d)),e.secondRow.push(o(`td`,{class:[`${f}-descriptions-table-content`,n],colspan:t,style:y},m))}return(e.span>=i||u)&&(e.span=0,e.row.length&&(e.rows.push(e.row),e.row=[]),a!==`left`&&e.secondRow.length&&(e.rows.push(e.secondRow),e.secondRow=[])),e},{span:0,row:[],secondRow:[],rows:[]}).rows.map(e=>o(`tr`,{class:`${f}-descriptions-table-row`},e));return o(`div`,{style:d,class:[`${f}-descriptions`,this.themeClass,`${f}-descriptions--${a}-label-placement`,`${f}-descriptions--${s}-label-align`,`${f}-descriptions--${c}-size`,l&&`${f}-descriptions--bordered`]},u||this.$slots.header?o(`div`,{class:`${f}-descriptions-header`},u||ve(this,`header`)):null,o(`div`,{class:`${f}-descriptions-table-wrapper`},o(`table`,{class:`${f}-descriptions-table`},o(`tbody`,null,a===`top`&&o(`tr`,{class:`${f}-descriptions-table-row`,style:{visibility:`collapse`}},v(i*2,o(`td`,null))),g))))}}),Ze={label:String,span:{type:Number,default:1},labelClass:String,labelStyle:[Object,String],contentClass:String,contentStyle:[Object,String]},$=b({name:`DescriptionsItem`,[qe]:!0,props:Ze,slots:Object,render(){return null}}),Qe=p(`n-tabs`),$e={tab:[String,Number,Object,Function],name:{type:[String,Number],required:!0},disabled:Boolean,displayDirective:{type:String,default:`if`},closable:{type:Boolean,default:void 0},tabProps:Object,label:[String,Number,Object,Function]},et=b({__TAB_PANE__:!0,name:`TabPane`,alias:[`TabPanel`],props:$e,slots:Object,setup(e){let t=h(Qe,null);return t||a(`tab-pane`,"`n-tab-pane` must be placed inside `n-tabs`."),{style:t.paneStyleRef,class:t.paneClassRef,mergedClsPrefix:t.mergedClsPrefixRef}},render(){return o(`div`,{class:[`${this.mergedClsPrefix}-tab-pane`,this.class],style:this.style},this.$slots)}}),tt=Object.assign({internalLeftPadded:Boolean,internalAddable:Boolean,internalCreatedByPane:Boolean},ge($e,[`displayDirective`])),nt=b({__TAB__:!0,inheritAttrs:!1,name:`Tab`,props:tt,setup(e){let{mergedClsPrefixRef:t,valueRef:n,typeRef:r,closableRef:i,tabStyleRef:a,addTabStyleRef:o,tabClassRef:s,addTabClassRef:c,tabChangeIdRef:l,onBeforeLeaveRef:u,triggerRef:d,handleAdd:f,activateTab:p,handleClose:m}=h(Qe);return{trigger:d,mergedClosable:H(()=>{if(e.internalAddable)return!1;let{closable:t}=e;return t===void 0?i.value:t}),style:a,addStyle:o,tabClass:s,addTabClass:c,clsPrefix:t,value:n,type:r,handleClose(t){t.stopPropagation(),!e.disabled&&m(e.name)},activateTab(){if(e.disabled)return;if(e.internalAddable){f();return}let{name:t}=e,r=++l.id;if(t!==n.value){let{value:i}=u;i?Promise.resolve(i(e.name,n.value)).then(e=>{e&&l.id===r&&p(t)}):p(t)}}}},render(){let{internalAddable:e,clsPrefix:t,name:n,disabled:r,label:i,tab:a,value:s,mergedClosable:c,trigger:l,$slots:{default:u}}=this,d=i??a;return o(`div`,{class:`${t}-tabs-tab-wrapper`},this.internalLeftPadded?o(`div`,{class:`${t}-tabs-tab-pad`}):null,o(`div`,Object.assign({key:n,"data-name":n,"data-disabled":r?!0:void 0},P({class:[`${t}-tabs-tab`,s===n&&`${t}-tabs-tab--active`,r&&`${t}-tabs-tab--disabled`,c&&`${t}-tabs-tab--closable`,e&&`${t}-tabs-tab--addable`,e?this.addTabClass:this.tabClass],onClick:l===`click`?this.activateTab:void 0,onMouseenter:l===`hover`?this.activateTab:void 0,style:e?this.addStyle:this.style},this.internalCreatedByPane?this.tabProps||{}:this.$attrs)),o(`span`,{class:`${t}-tabs-tab__label`},e?o(F,null,o(`div`,{class:`${t}-tabs-tab__height-placeholder`},`\xA0`),o(m,{clsPrefix:t},{default:()=>o(ye,null)})):u?u():typeof d==`object`?d:_e(d??n)),c&&this.type===`card`?o(U,{clsPrefix:t,class:`${t}-tabs-tab__close`,onClick:this.handleClose,disabled:r}):null))}}),rt=C(`tabs`,`
 box-sizing: border-box;
 width: 100%;
 display: flex;
 flex-direction: column;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
`,[e(`segment-type`,[C(`tabs-rail`,[w(`&.transition-disabled`,[C(`tabs-capsule`,`
 transition: none;
 `)])])]),e(`top`,[C(`tab-pane`,`
 padding: var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left);
 `)]),e(`left`,[C(`tab-pane`,`
 padding: var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left) var(--n-pane-padding-top);
 `)]),e(`left, right`,`
 flex-direction: row;
 `,[C(`tabs-bar`,`
 width: 2px;
 right: 0;
 transition:
 top .2s var(--n-bezier),
 max-height .2s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `),C(`tabs-tab`,`
 padding: var(--n-tab-padding-vertical); 
 `)]),e(`right`,`
 flex-direction: row-reverse;
 `,[C(`tab-pane`,`
 padding: var(--n-pane-padding-left) var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom);
 `),C(`tabs-bar`,`
 left: 0;
 `)]),e(`bottom`,`
 flex-direction: column-reverse;
 justify-content: flex-end;
 `,[C(`tab-pane`,`
 padding: var(--n-pane-padding-bottom) var(--n-pane-padding-right) var(--n-pane-padding-top) var(--n-pane-padding-left);
 `),C(`tabs-bar`,`
 top: 0;
 `)]),C(`tabs-rail`,`
 position: relative;
 padding: 3px;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 background-color: var(--n-color-segment);
 transition: background-color .3s var(--n-bezier);
 display: flex;
 align-items: center;
 `,[C(`tabs-capsule`,`
 border-radius: var(--n-tab-border-radius);
 position: absolute;
 pointer-events: none;
 background-color: var(--n-tab-color-segment);
 box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .08);
 transition: transform 0.3s var(--n-bezier);
 `),C(`tabs-tab-wrapper`,`
 flex-basis: 0;
 flex-grow: 1;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[C(`tabs-tab`,`
 overflow: hidden;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[e(`active`,`
 font-weight: var(--n-font-weight-strong);
 color: var(--n-tab-text-color-active);
 `),w(`&:hover`,`
 color: var(--n-tab-text-color-hover);
 `)])])]),e(`flex`,[C(`tabs-nav`,`
 width: 100%;
 position: relative;
 `,[C(`tabs-wrapper`,`
 width: 100%;
 `,[C(`tabs-tab`,`
 margin-right: 0;
 `)])])]),C(`tabs-nav`,`
 box-sizing: border-box;
 line-height: 1.5;
 display: flex;
 transition: border-color .3s var(--n-bezier);
 `,[g(`prefix, suffix`,`
 display: flex;
 align-items: center;
 `),g(`prefix`,`padding-right: 16px;`),g(`suffix`,`padding-left: 16px;`)]),e(`top, bottom`,[w(`>`,[C(`tabs-nav`,[C(`tabs-nav-scroll-wrapper`,[w(`&::before`,`
 top: 0;
 bottom: 0;
 left: 0;
 width: 20px;
 `),w(`&::after`,`
 top: 0;
 bottom: 0;
 right: 0;
 width: 20px;
 `),e(`shadow-start`,[w(`&::before`,`
 box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, .12);
 `)]),e(`shadow-end`,[w(`&::after`,`
 box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),e(`left, right`,[C(`tabs-nav-scroll-content`,`
 flex-direction: column;
 `),w(`>`,[C(`tabs-nav`,[C(`tabs-nav-scroll-wrapper`,[w(`&::before`,`
 top: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),w(`&::after`,`
 bottom: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),e(`shadow-start`,[w(`&::before`,`
 box-shadow: inset 0 10px 8px -8px rgba(0, 0, 0, .12);
 `)]),e(`shadow-end`,[w(`&::after`,`
 box-shadow: inset 0 -10px 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),C(`tabs-nav-scroll-wrapper`,`
 flex: 1;
 position: relative;
 overflow: hidden;
 `,[C(`tabs-nav-y-scroll`,`
 height: 100%;
 width: 100%;
 overflow-y: auto; 
 scrollbar-width: none;
 `,[w(`&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb`,`
 width: 0;
 height: 0;
 display: none;
 `)]),w(`&::before, &::after`,`
 transition: box-shadow .3s var(--n-bezier);
 pointer-events: none;
 content: "";
 position: absolute;
 z-index: 1;
 `)]),C(`tabs-nav-scroll-content`,`
 display: flex;
 position: relative;
 min-width: 100%;
 min-height: 100%;
 width: fit-content;
 box-sizing: border-box;
 `),C(`tabs-wrapper`,`
 display: inline-flex;
 flex-wrap: nowrap;
 position: relative;
 `),C(`tabs-tab-wrapper`,`
 display: flex;
 flex-wrap: nowrap;
 flex-shrink: 0;
 flex-grow: 0;
 `),C(`tabs-tab`,`
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
 `,[e(`disabled`,{cursor:`not-allowed`}),g(`close`,`
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),g(`label`,`
 display: flex;
 align-items: center;
 z-index: 1;
 `)]),C(`tabs-bar`,`
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
 `,[w(`&.transition-disabled`,`
 transition: none;
 `),e(`disabled`,`
 background-color: var(--n-tab-text-color-disabled)
 `)]),C(`tabs-pane-wrapper`,`
 position: relative;
 overflow: hidden;
 transition: max-height .2s var(--n-bezier);
 `),C(`tab-pane`,`
 color: var(--n-pane-text-color);
 width: 100%;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 opacity .2s var(--n-bezier);
 left: 0;
 right: 0;
 top: 0;
 `,[w(`&.next-transition-leave-active, &.prev-transition-leave-active, &.next-transition-enter-active, &.prev-transition-enter-active`,`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 transform .2s var(--n-bezier),
 opacity .2s var(--n-bezier);
 `),w(`&.next-transition-leave-active, &.prev-transition-leave-active`,`
 position: absolute;
 `),w(`&.next-transition-enter-from, &.prev-transition-leave-to`,`
 transform: translateX(32px);
 opacity: 0;
 `),w(`&.next-transition-leave-to, &.prev-transition-enter-from`,`
 transform: translateX(-32px);
 opacity: 0;
 `),w(`&.next-transition-leave-from, &.next-transition-enter-to, &.prev-transition-leave-from, &.prev-transition-enter-to`,`
 transform: translateX(0);
 opacity: 1;
 `)]),C(`tabs-tab-pad`,`
 box-sizing: border-box;
 width: var(--n-tab-gap);
 flex-grow: 0;
 flex-shrink: 0;
 `),e(`line-type, bar-type`,[C(`tabs-tab`,`
 font-weight: var(--n-tab-font-weight);
 box-sizing: border-box;
 vertical-align: bottom;
 `,[w(`&:hover`,{color:`var(--n-tab-text-color-hover)`}),e(`active`,`
 color: var(--n-tab-text-color-active);
 font-weight: var(--n-tab-font-weight-active);
 `),e(`disabled`,{color:`var(--n-tab-text-color-disabled)`})])]),C(`tabs-nav`,[e(`line-type`,[e(`top`,[g(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),C(`tabs-nav-scroll-content`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),C(`tabs-bar`,`
 bottom: -1px;
 `)]),e(`left`,[g(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),C(`tabs-nav-scroll-content`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),C(`tabs-bar`,`
 right: -1px;
 `)]),e(`right`,[g(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),C(`tabs-nav-scroll-content`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),C(`tabs-bar`,`
 left: -1px;
 `)]),e(`bottom`,[g(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),C(`tabs-nav-scroll-content`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),C(`tabs-bar`,`
 top: -1px;
 `)]),g(`prefix, suffix`,`
 transition: border-color .3s var(--n-bezier);
 `),C(`tabs-nav-scroll-content`,`
 transition: border-color .3s var(--n-bezier);
 `),C(`tabs-bar`,`
 border-radius: 0;
 `)]),e(`card-type`,[g(`prefix, suffix`,`
 transition: border-color .3s var(--n-bezier);
 `),C(`tabs-pad`,`
 flex-grow: 1;
 transition: border-color .3s var(--n-bezier);
 `),C(`tabs-tab-pad`,`
 transition: border-color .3s var(--n-bezier);
 `),C(`tabs-tab`,`
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
 `,[e(`addable`,`
 padding-left: 8px;
 padding-right: 8px;
 font-size: 16px;
 justify-content: center;
 `,[g(`height-placeholder`,`
 width: 0;
 font-size: var(--n-tab-font-size);
 `),j(`disabled`,[w(`&:hover`,`
 color: var(--n-tab-text-color-hover);
 `)])]),e(`closable`,`padding-right: 8px;`),e(`active`,`
 background-color: #0000;
 font-weight: var(--n-tab-font-weight-active);
 color: var(--n-tab-text-color-active);
 `),e(`disabled`,`color: var(--n-tab-text-color-disabled);`)])]),e(`left, right`,`
 flex-direction: column; 
 `,[g(`prefix, suffix`,`
 padding: var(--n-tab-padding-vertical);
 `),C(`tabs-wrapper`,`
 flex-direction: column;
 `),C(`tabs-tab-wrapper`,`
 flex-direction: column;
 `,[C(`tabs-tab-pad`,`
 height: var(--n-tab-gap-vertical);
 width: 100%;
 `)])]),e(`top`,[e(`card-type`,[C(`tabs-scroll-padding`,`border-bottom: 1px solid var(--n-tab-border-color);`),g(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),C(`tabs-tab`,`
 border-top-left-radius: var(--n-tab-border-radius);
 border-top-right-radius: var(--n-tab-border-radius);
 `,[e(`active`,`
 border-bottom: 1px solid #0000;
 `)]),C(`tabs-tab-pad`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),C(`tabs-pad`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `)])]),e(`left`,[e(`card-type`,[C(`tabs-scroll-padding`,`border-right: 1px solid var(--n-tab-border-color);`),g(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),C(`tabs-tab`,`
 border-top-left-radius: var(--n-tab-border-radius);
 border-bottom-left-radius: var(--n-tab-border-radius);
 `,[e(`active`,`
 border-right: 1px solid #0000;
 `)]),C(`tabs-tab-pad`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),C(`tabs-pad`,`
 border-right: 1px solid var(--n-tab-border-color);
 `)])]),e(`right`,[e(`card-type`,[C(`tabs-scroll-padding`,`border-left: 1px solid var(--n-tab-border-color);`),g(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),C(`tabs-tab`,`
 border-top-right-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[e(`active`,`
 border-left: 1px solid #0000;
 `)]),C(`tabs-tab-pad`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),C(`tabs-pad`,`
 border-left: 1px solid var(--n-tab-border-color);
 `)])]),e(`bottom`,[e(`card-type`,[C(`tabs-scroll-padding`,`border-top: 1px solid var(--n-tab-border-color);`),g(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),C(`tabs-tab`,`
 border-bottom-left-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[e(`active`,`
 border-top: 1px solid #0000;
 `)]),C(`tabs-tab-pad`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),C(`tabs-pad`,`
 border-top: 1px solid var(--n-tab-border-color);
 `)])])])]),it=Ge,at=Object.assign(Object.assign({},t.props),{value:[String,Number],defaultValue:[String,Number],trigger:{type:String,default:`click`},type:{type:String,default:`bar`},closable:Boolean,justifyContent:String,size:String,placement:{type:String,default:`top`},tabStyle:[String,Object],tabClass:String,addTabStyle:[String,Object],addTabClass:String,barWidth:Number,paneClass:String,paneStyle:[String,Object],paneWrapperClass:String,paneWrapperStyle:[String,Object],addable:[Boolean,Object],tabsPadding:{type:Number,default:0},animated:Boolean,onBeforeLeave:Function,onAdd:Function,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onClose:[Function,Array],labelSize:String,activeName:[String,Number],onActiveNameChange:[Function,Array]}),ot=b({name:`Tabs`,props:at,slots:Object,setup(e,{slots:r}){let{mergedClsPrefixRef:i,inlineThemeDisabled:a,mergedComponentPropsRef:o}=N(e),s=t(`Tabs`,`-tabs`,rt,xe,e,i),d=T(null),f=T(null),p=T(null),m=T(null),h=T(null),g=T(null),_=T(!0),v=T(!0),y=K(e,[`labelSize`,`size`]),b=H(()=>y.value?y.value:o?.value?.Tabs?.size||`medium`),C=K(e,[`activeName`,`value`]),w=T(C.value??e.defaultValue??(r.default?me(r.default())[0]?.props?.name:null)),E=he(C,w),D={id:0},O=H(()=>{if(!(!e.justifyContent||e.type===`card`))return{display:`flex`,justifyContent:e.justifyContent}});S(E,()=>{D.id=0,j(),re()});function k(){let{value:e}=E;return e===null?null:d.value?.querySelector(`[data-name="${e}"]`)}function ee(t){if(e.type===`card`)return;let{value:n}=f;if(!n)return;let r=n.style.opacity===`0`;if(t){let a=`${i.value}-tabs-bar--disabled`,{barWidth:o,placement:s}=e;if(t.dataset.disabled===`true`?n.classList.add(a):n.classList.remove(a),[`top`,`bottom`].includes(s)){if(A([`top`,`maxHeight`,`height`]),typeof o==`number`&&t.offsetWidth>=o){let e=Math.floor((t.offsetWidth-o)/2)+t.offsetLeft;n.style.left=`${e}px`,n.style.maxWidth=`${o}px`}else n.style.left=`${t.offsetLeft}px`,n.style.maxWidth=`${t.offsetWidth}px`;n.style.width=`8192px`,r&&(n.style.transition=`none`),n.offsetWidth,r&&(n.style.transition=``,n.style.opacity=`1`)}else{if(A([`left`,`maxWidth`,`width`]),typeof o==`number`&&t.offsetHeight>=o){let e=Math.floor((t.offsetHeight-o)/2)+t.offsetTop;n.style.top=`${e}px`,n.style.maxHeight=`${o}px`}else n.style.top=`${t.offsetTop}px`,n.style.maxHeight=`${t.offsetHeight}px`;n.style.height=`8192px`,r&&(n.style.transition=`none`),n.offsetHeight,r&&(n.style.transition=``,n.style.opacity=`1`)}}}function te(){if(e.type===`card`)return;let{value:t}=f;t&&(t.style.opacity=`0`)}function A(e){let{value:t}=f;if(t)for(let n of e)t.style[n]=``}function j(){if(e.type===`card`)return;let t=k();t?ee(t):te()}function re(){let e=h.value?.$el;if(!e)return;let t=k();if(!t)return;let{scrollLeft:n,offsetWidth:r}=e,{offsetLeft:i,offsetWidth:a}=t;n>i?e.scrollTo({top:0,left:i,behavior:`smooth`}):i+a>n+r&&e.scrollTo({top:0,left:i+a-r,behavior:`smooth`})}let P=T(null),ie=0,F=null;function ae(e){let t=P.value;if(t){ie=e.getBoundingClientRect().height;let n=`${ie}px`,r=()=>{t.style.height=n,t.style.maxHeight=n};F?(r(),F(),F=null):F=r}}function oe(e){let t=P.value;if(t){let n=e.getBoundingClientRect().height,r=()=>{document.body.offsetHeight,t.style.maxHeight=`${n}px`,t.style.height=`${Math.max(ie,n)}px`};F?(F(),F=null,r()):F=r}}function I(){let t=P.value;if(t){t.style.maxHeight=``,t.style.height=``;let{paneWrapperStyle:n}=e;if(typeof n==`string`)t.style.cssText=n;else if(n){let{maxHeight:e,height:r}=n;e!==void 0&&(t.style.maxHeight=e),r!==void 0&&(t.style.height=r)}}}let L={value:[]},se=T(`next`);function R(e){let t=E.value,n=`next`;for(let r of L.value){if(r===t)break;if(r===e){n=`prev`;break}}se.value=n,B(e)}function B(t){let{onActiveNameChange:n,onUpdateValue:r,"onUpdate:value":i}=e;n&&G(n,t),r&&G(r,t),i&&G(i,t),w.value=t}function V(t){let{onClose:n}=e;n&&G(n,t)}let U=!0;function W(){let{value:e}=f;if(!e)return;U||=!1;let t=`transition-disabled`;e.classList.add(t),j(),e.classList.remove(t)}let q=T(null);function ue({transitionDisabled:e}){let t=d.value;if(!t)return;e&&t.classList.add(`transition-disabled`);let n=k();n&&q.value&&(q.value.style.width=`${n.offsetWidth}px`,q.value.style.height=`${n.offsetHeight}px`,q.value.style.transform=`translateX(${n.offsetLeft-x(getComputedStyle(t).paddingLeft)}px)`,e&&q.value.offsetWidth),e&&t.classList.remove(`transition-disabled`)}S([E],()=>{e.type===`segment`&&n(()=>{ue({transitionDisabled:!1})})}),c(()=>{e.type===`segment`&&ue({transitionDisabled:!0})});let de=0;function fe(t){if(t.contentRect.width===0&&t.contentRect.height===0||de===t.contentRect.width)return;de=t.contentRect.width;let{type:n}=e;if((n===`line`||n===`bar`)&&(U||e.justifyContent?.startsWith(`space`))&&W(),n!==`segment`){let{placement:t}=e;ye((t===`top`||t===`bottom`?h.value?.$el:g.value)||null)}}let pe=it(fe,64);S([()=>e.justifyContent,()=>e.size],()=>{n(()=>{let{type:t}=e;(t===`line`||t===`bar`)&&W()})});let J=T(!1);function ge(t){let{target:n,contentRect:{width:r,height:i}}=t,a=n.parentElement.parentElement.offsetWidth,o=n.parentElement.parentElement.offsetHeight,{placement:s}=e;if(!J.value)s===`top`||s===`bottom`?a<r&&(J.value=!0):o<i&&(J.value=!0);else{let{value:e}=m;if(!e)return;s===`top`||s===`bottom`?a-r>e.$el.offsetWidth&&(J.value=!1):o-i>e.$el.offsetHeight&&(J.value=!1)}ye(h.value?.$el||null)}let _e=it(ge,64);function ve(){let{onAdd:t}=e;t&&t(),n(()=>{let e=k(),{value:t}=h;!e||!t||t.scrollTo({left:e.offsetLeft,top:0,behavior:`smooth`})})}function ye(t){if(!t)return;let{placement:n}=e;if(n===`top`||n===`bottom`){let{scrollLeft:e,scrollWidth:n,offsetWidth:r}=t;_.value=e<=0,v.value=e+r>=n}else{let{scrollTop:e,scrollHeight:n,offsetHeight:r}=t;_.value=e<=0,v.value=e+r>=n}}let be=it(e=>{ye(e.target)},64);ce(Qe,{triggerRef:M(e,`trigger`),tabStyleRef:M(e,`tabStyle`),tabClassRef:M(e,`tabClass`),addTabStyleRef:M(e,`addTabStyle`),addTabClassRef:M(e,`addTabClass`),paneClassRef:M(e,`paneClass`),paneStyleRef:M(e,`paneStyle`),mergedClsPrefixRef:i,typeRef:M(e,`type`),closableRef:M(e,`closable`),valueRef:E,tabChangeIdRef:D,onBeforeLeaveRef:M(e,`onBeforeLeave`),activateTab:R,handleClose:V,handleAdd:ve}),le(()=>{j(),re()}),l(()=>{let{value:e}=p;if(!e)return;let{value:t}=i,n=`${t}-tabs-nav-scroll-wrapper--shadow-start`,r=`${t}-tabs-nav-scroll-wrapper--shadow-end`;_.value?e.classList.remove(n):e.classList.add(n),v.value?e.classList.remove(r):e.classList.add(r)});let Y={syncBarPosition:()=>{j()}},Se=()=>{ue({transitionDisabled:!0})},Ce=H(()=>{let{value:t}=b,{type:n}=e,r=`${t}${{card:`Card`,bar:`Bar`,line:`Line`,segment:`Segment`}[n]}`,{self:{barColor:i,closeIconColor:a,closeIconColorHover:o,closeIconColorPressed:c,tabColor:l,tabBorderColor:d,paneTextColor:f,tabFontWeight:p,tabBorderRadius:m,tabFontWeightActive:h,colorSegment:g,fontWeightStrong:_,tabColorSegment:v,closeSize:y,closeIconSize:x,closeColorHover:S,closeColorPressed:C,closeBorderRadius:w,[z(`panePadding`,t)]:T,[z(`tabPadding`,r)]:E,[z(`tabPaddingVertical`,r)]:D,[z(`tabGap`,r)]:O,[z(`tabGap`,`${r}Vertical`)]:k,[z(`tabTextColor`,n)]:ee,[z(`tabTextColorActive`,n)]:te,[z(`tabTextColorHover`,n)]:A,[z(`tabTextColorDisabled`,n)]:ne,[z(`tabFontSize`,t)]:j},common:{cubicBezierEaseInOut:M}}=s.value;return{"--n-bezier":M,"--n-color-segment":g,"--n-bar-color":i,"--n-tab-font-size":j,"--n-tab-text-color":ee,"--n-tab-text-color-active":te,"--n-tab-text-color-disabled":ne,"--n-tab-text-color-hover":A,"--n-pane-text-color":f,"--n-tab-border-color":d,"--n-tab-border-radius":m,"--n-close-size":y,"--n-close-icon-size":x,"--n-close-color-hover":S,"--n-close-color-pressed":C,"--n-close-border-radius":w,"--n-close-icon-color":a,"--n-close-icon-color-hover":o,"--n-close-icon-color-pressed":c,"--n-tab-color":l,"--n-tab-font-weight":p,"--n-tab-font-weight-active":h,"--n-tab-padding":E,"--n-tab-padding-vertical":D,"--n-tab-gap":O,"--n-tab-gap-vertical":k,"--n-pane-padding-left":u(T,`left`),"--n-pane-padding-right":u(T,`right`),"--n-pane-padding-top":u(T,`top`),"--n-pane-padding-bottom":u(T,`bottom`),"--n-font-weight-strong":_,"--n-tab-color-segment":v}}),X=a?ne(`tabs`,H(()=>`${b.value[0]}${e.type[0]}`),Ce,e):void 0;return Object.assign({mergedClsPrefix:i,mergedValue:E,renderedNames:new Set,segmentCapsuleElRef:q,tabsPaneWrapperRef:P,tabsElRef:d,barElRef:f,addTabInstRef:m,xScrollInstRef:h,scrollWrapperElRef:p,addTabFixed:J,tabWrapperStyle:O,handleNavResize:pe,mergedSize:b,handleScroll:be,handleTabsResize:_e,cssVars:a?void 0:Ce,themeClass:X?.themeClass,animationDirection:se,renderNameListRef:L,yScrollElRef:g,handleSegmentResize:Se,onAnimationBeforeLeave:ae,onAnimationEnter:oe,onAnimationAfterEnter:I,onRender:X?.onRender},Y)},render(){let{mergedClsPrefix:e,type:t,placement:n,addTabFixed:r,addable:i,mergedSize:a,renderNameListRef:c,onRender:l,paneWrapperClass:u,paneWrapperStyle:d,$slots:{default:f,prefix:p,suffix:m}}=this;l?.();let h=f?me(f()).filter(e=>e.type.__TAB_PANE__===!0):[],g=f?me(f()).filter(e=>e.type.__TAB__===!0):[],_=!g.length,v=t===`card`,y=t===`segment`,b=!v&&!y&&this.justifyContent;c.value=[];let x=()=>{let t=o(`div`,{style:this.tabWrapperStyle,class:`${e}-tabs-wrapper`},b?null:o(`div`,{class:`${e}-tabs-scroll-padding`,style:n===`top`||n===`bottom`?{width:`${this.tabsPadding}px`}:{height:`${this.tabsPadding}px`}}),_?h.map((e,t)=>(c.value.push(e.props.name),ut(o(nt,Object.assign({},e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0&&(!b||b===`center`||b===`start`||b===`end`)}),e.children?{default:e.children.tab}:void 0)))):g.map((e,t)=>(c.value.push(e.props.name),ut(t!==0&&!b?lt(e):e))),!r&&i&&v?ct(i,(_?h.length:g.length)!==0):null,b?null:o(`div`,{class:`${e}-tabs-scroll-padding`,style:{width:`${this.tabsPadding}px`}}));return o(`div`,{ref:`tabsElRef`,class:`${e}-tabs-nav-scroll-content`},v&&i?o(s,{onResize:this.handleTabsResize},{default:()=>t}):t,v?o(`div`,{class:`${e}-tabs-pad`}):null,v?null:o(`div`,{ref:`barElRef`,class:`${e}-tabs-bar`}))},S=y?`top`:n;return o(`div`,{class:[`${e}-tabs`,this.themeClass,`${e}-tabs--${t}-type`,`${e}-tabs--${a}-size`,b&&`${e}-tabs--flex`,`${e}-tabs--${S}`],style:this.cssVars},o(`div`,{class:[`${e}-tabs-nav--${t}-type`,`${e}-tabs-nav--${S}`,`${e}-tabs-nav`]},O(p,t=>t&&o(`div`,{class:`${e}-tabs-nav__prefix`},t)),y?o(s,{onResize:this.handleSegmentResize},{default:()=>o(`div`,{class:`${e}-tabs-rail`,ref:`tabsElRef`},o(`div`,{class:`${e}-tabs-capsule`,ref:`segmentCapsuleElRef`},o(`div`,{class:`${e}-tabs-wrapper`},o(`div`,{class:`${e}-tabs-tab`}))),_?h.map((e,t)=>(c.value.push(e.props.name),o(nt,Object.assign({},e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0}),e.children?{default:e.children.tab}:void 0))):g.map((e,t)=>(c.value.push(e.props.name),t===0?e:lt(e))))}):o(s,{onResize:this.handleNavResize},{default:()=>o(`div`,{class:`${e}-tabs-nav-scroll-wrapper`,ref:`scrollWrapperElRef`},[`top`,`bottom`].includes(S)?o(De,{ref:`xScrollInstRef`,onScroll:this.handleScroll},{default:x}):o(`div`,{class:`${e}-tabs-nav-y-scroll`,onScroll:this.handleScroll,ref:`yScrollElRef`},x()))}),r&&i&&v?ct(i,!0):null,O(m,t=>t&&o(`div`,{class:`${e}-tabs-nav__suffix`},t))),_&&(this.animated&&(S===`top`||S===`bottom`)?o(`div`,{ref:`tabsPaneWrapperRef`,style:d,class:[`${e}-tabs-pane-wrapper`,u]},st(h,this.mergedValue,this.renderedNames,this.onAnimationBeforeLeave,this.onAnimationEnter,this.onAnimationAfterEnter,this.animationDirection)):st(h,this.mergedValue,this.renderedNames)))}});function st(e,t,n,r,i,a,s){let c=[];return e.forEach(e=>{let{name:r,displayDirective:i,"display-directive":a}=e.props,o=e=>i===e||a===e,s=t===r;if(e.key!==void 0&&(e.key=r),s||o(`show`)||o(`show:lazy`)&&n.has(r)){n.has(r)||n.add(r);let t=!o(`if`);c.push(t?L(e,[[V,s]]):e)}}),s?o(ee,{name:`${s}-transition`,onBeforeLeave:r,onEnter:i,onAfterEnter:a},{default:()=>c}):c}function ct(e,t){return o(nt,{ref:`addTabInstRef`,key:`__addable`,name:`__addable`,internalCreatedByPane:!0,internalAddable:!0,internalLeftPadded:t,disabled:typeof e==`object`&&e.disabled})}function lt(e){let t=E(e);return t.props?t.props.internalLeftPadded=!0:t.props={internalLeftPadded:!0},t}function ut(e){return Array.isArray(e.dynamicProps)?e.dynamicProps.includes(`internalLeftPadded`)||e.dynamicProps.push(`internalLeftPadded`):e.dynamicProps=[`internalLeftPadded`],e}var dt={key:1,class:`tab-loading`},ft=oe(b({__name:`DockerView`,setup(e){let t=Ce();function n(e){return e instanceof k&&e.status===503&&!!e.body&&typeof e.body==`object`&&`enabled`in e.body}function a(e,n){t.error(e instanceof k?e.message:n)}let s=e=>e===`running`?`success`:e===`paused`||e===`restarting`?`warning`:e===`dead`?`error`:`default`,l={running:0,restarting:1,paused:2,created:3,exited:4,dead:5};function u(e){return l[e.state]??6}function p(e,t){return e.hasStats?t(e.stats):-1}let m=T([]),h=T(!0),g=T(null),v;async function b(){try{let e=await Z.containers();m.value=e.containers,g.value=null}catch(e){n(e)&&(g.value=e.body)}finally{h.value=!1}}async function x(e,t){try{let n=await Z.containerAction(e,t);m.value=n.containers}catch(e){a(e,`Aksi ${t} gagal`)}}let C=[{title:`Nama`,key:`name`,width:160,ellipsis:{tooltip:!0},sorter:(e,t)=>e.name.localeCompare(t.name)},{title:`Image`,key:`image`,width:180,ellipsis:{tooltip:!0},sorter:(e,t)=>e.image.localeCompare(t.image)},{title:`Status`,key:`state`,width:130,sorter:(e,t)=>u(e)-u(t),render:e=>o(be,{type:s(e.state),size:`small`},{default:()=>e.status})},{title:`CPU`,key:`cpu`,width:70,sorter:(e,t)=>p(e,e=>e.cpuPercent)-p(t,e=>e.cpuPercent),render:e=>e.hasStats?`${e.stats.cpuPercent.toFixed(1)}%`:`—`},{title:`RAM`,key:`ram`,width:150,sorter:(e,t)=>p(e,e=>e.memUsageBytes)-p(t,e=>e.memUsageBytes),render:e=>e.hasStats?`${Q(e.stats.memUsageBytes)} / ${Q(e.stats.memLimitBytes)}`:`—`},{title:`Network`,key:`net`,width:140,sorter:(e,t)=>p(e,e=>e.netRxBytes+e.netTxBytes)-p(t,e=>e.netRxBytes+e.netTxBytes),render:e=>e.hasStats?`↓ ${Q(e.stats.netRxBytes)} ↑ ${Q(e.stats.netTxBytes)}`:`—`},{title:`Ports`,key:`ports`,width:220,ellipsis:{tooltip:!0}},{title:`Aksi`,key:`actions`,width:220,render:e=>o(X,{size:`small`},()=>[e.state===`running`?[o(A,{size:`tiny`,onClick:()=>x(e.id,`stop`)},()=>`Stop`),o(A,{size:`tiny`,onClick:()=>x(e.id,`restart`)},()=>`Restart`)]:o(A,{size:`tiny`,type:`primary`,onClick:()=>x(e.id,`start`)},()=>`Start`),o(we,{onPositiveClick:()=>x(e.id,`remove`)},{trigger:()=>o(A,{size:`tiny`,type:`error`,ghost:!0},()=>`Hapus`),default:()=>`Hapus container "${e.name}"?`})])}],w=T([]),E=T(!0),O=T(null);async function ee(){E.value=!0;try{let e=await Z.images();w.value=e.images,O.value=null}catch(e){n(e)&&(O.value=e.body)}finally{E.value=!1}}async function te(e){try{let t=await Z.removeImage(e);w.value=t.images}catch(e){a(e,`Hapus image gagal (mungkin masih dipakai container)`)}}let ne=[{title:`Tag`,key:`tag`,minWidth:200,ellipsis:{tooltip:!0},sorter:(e,t)=>e.tag.localeCompare(t.tag),render:e=>e.dangling?o(X,{size:`small`,align:`center`},()=>[e.tag,o(be,{size:`small`,type:`warning`},()=>`dangling`)]):e.tag},{title:`Ukuran`,key:`sizeBytes`,width:110,sorter:(e,t)=>e.sizeBytes-t.sizeBytes,render:e=>Q(e.sizeBytes)},{title:`Dipakai`,key:`containers`,width:140,sorter:(e,t)=>e.containers-t.containers,render:e=>e.containers<0?`—`:e.containers===0?`tidak dipakai`:`${e.containers} container`},{title:`Dibuat`,key:`created`,width:150,sorter:(e,t)=>Date.parse(e.created)-Date.parse(t.created),render:e=>Te(e.created)},{title:`Aksi`,key:`actions`,width:100,render:e=>o(we,{onPositiveClick:()=>te(e.id)},{trigger:()=>o(A,{size:`tiny`,type:`error`,ghost:!0},()=>`Hapus`),default:()=>`Hapus image "${e.tag}"?`})}],j=T([]),M=T(!0),N=T(null);async function re(){M.value=!0;try{let e=await Z.volumes();j.value=e.volumes,N.value=null}catch(e){n(e)&&(N.value=e.body)}finally{M.value=!1}}async function P(e){try{let t=await Z.removeVolume(e);j.value=t.volumes}catch(e){a(e,`Hapus volume gagal (mungkin masih dipakai container)`)}}let ie=[{title:`Nama`,key:`name`,minWidth:180,ellipsis:{tooltip:!0},sorter:(e,t)=>e.name.localeCompare(t.name)},{title:`Driver`,key:`driver`,width:100,sorter:(e,t)=>e.driver.localeCompare(t.driver)},{title:`Ukuran`,key:`sizeBytes`,width:110,sorter:(e,t)=>e.sizeBytes-t.sizeBytes,render:e=>e.sizeBytes<0?`tidak diketahui`:Q(e.sizeBytes)},{title:`Status`,key:`inUse`,width:120,sorter:(e,t)=>Number(e.inUse)-Number(t.inUse),render:e=>o(be,{size:`small`,type:e.inUse?`success`:`default`},()=>e.inUse?`dipakai`:`tidak dipakai`)},{title:`Aksi`,key:`actions`,width:100,render:e=>o(we,{onPositiveClick:()=>P(e.name)},{trigger:()=>o(A,{size:`tiny`,type:`error`,ghost:!0},()=>`Hapus`),default:()=>`Hapus volume "${e.name}"?`})}],ae=T([]),oe=T(!0),L=T(null);async function se(){oe.value=!0;try{let e=await Z.networks();ae.value=e.networks,L.value=null}catch(e){n(e)&&(L.value=e.body)}finally{oe.value=!1}}async function z(e){try{let t=await Z.removeNetwork(e);ae.value=t.networks}catch(e){a(e,`Hapus network gagal (mungkin builtin atau masih dipakai)`)}}let B=[{title:`Nama`,key:`name`,minWidth:160,ellipsis:{tooltip:!0},sorter:(e,t)=>e.name.localeCompare(t.name),render:e=>e.builtin?o(X,{size:`small`,align:`center`},()=>[e.name,o(be,{size:`small`},()=>`builtin`)]):e.name},{title:`Driver`,key:`driver`,width:100,sorter:(e,t)=>e.driver.localeCompare(t.driver)},{title:`Subnet`,key:`subnet`,width:150,sorter:(e,t)=>e.subnet.localeCompare(t.subnet),render:e=>e.subnet||`—`},{title:`Container Terhubung`,key:`connectedCount`,width:170,sorter:(e,t)=>e.connectedCount-t.connectedCount},{title:`Aksi`,key:`actions`,width:100,render:e=>e.builtin?null:o(we,{onPositiveClick:()=>z(e.id)},{trigger:()=>o(A,{size:`tiny`,type:`error`,ghost:!0},()=>`Hapus`),default:()=>`Hapus network "${e.name}"?`})}],V=T(null),H=T(!0),U=T(null),G=T(null);async function ce(){H.value=!0;try{V.value=await Z.settings(),U.value=null}catch(e){n(e)&&(U.value=e.body)}finally{H.value=!1}}async function le(e){G.value=e;try{V.value=await Z.prune(e),t.success(`Cleanup selesai`)}catch(t){a(t,`Cleanup gagal: ${e}`)}finally{G.value=null}}let K=T(`containers`),q=new Set([`containers`]);return S(K,e=>{q.has(e)||(q.add(e),e===`images`?ee():e===`volumes`?re():e===`networks`?se():e===`settings`&&ce())}),c(()=>{b(),v=setInterval(b,5e3)}),d(()=>{v&&clearInterval(v)}),(e,t)=>(_(),D(de,null,{default:f(()=>[W(R(ot),{type:`line`,value:K.value,"onUpdate:value":t[0]||=e=>K.value=e},{default:f(()=>[W(R(et),{name:`containers`,tab:`Containers`},{default:f(()=>[g.value?(_(),D(R(Y),{key:0,type:`warning`,title:g.value.error},null,8,[`title`])):(_(),D(R(J),{key:1,columns:C,data:m.value,loading:h.value,"row-key":e=>e.id,"scroll-x":1200},null,8,[`data`,`loading`,`row-key`]))]),_:1}),W(R(et),{name:`images`,tab:`Images`},{default:f(()=>[O.value?(_(),D(R(Y),{key:0,type:`warning`,title:O.value.error},null,8,[`title`])):(_(),D(R(J),{key:1,columns:ne,data:w.value,loading:E.value,"row-key":e=>e.id,"scroll-x":700},null,8,[`data`,`loading`,`row-key`]))]),_:1}),W(R(et),{name:`volumes`,tab:`Volumes`},{default:f(()=>[N.value?(_(),D(R(Y),{key:0,type:`warning`,title:N.value.error},null,8,[`title`])):(_(),D(R(J),{key:1,columns:ie,data:j.value,loading:M.value,"row-key":e=>e.name,"scroll-x":610},null,8,[`data`,`loading`,`row-key`]))]),_:1}),W(R(et),{name:`networks`,tab:`Networks`},{default:f(()=>[L.value?(_(),D(R(Y),{key:0,type:`warning`,title:L.value.error},null,8,[`title`])):(_(),D(R(J),{key:1,columns:B,data:ae.value,loading:oe.value,"row-key":e=>e.id,"scroll-x":680},null,8,[`data`,`loading`,`row-key`]))]),_:1}),W(R(et),{name:`settings`,tab:`Settings`},{default:f(()=>[U.value?(_(),D(R(Y),{key:0,type:`warning`,title:U.value.error},null,8,[`title`])):H.value&&!V.value?(_(),y(`div`,dt,[W(R(fe),{size:`large`})])):V.value?(_(),D(R(X),{key:3,vertical:``,size:24},{default:f(()=>[W(R(Xe),{title:`Info Daemon`,column:2,bordered:``,"label-placement":`left`},{default:f(()=>[W(R($),{label:`Versi Server`},{default:f(()=>[i(I(V.value?.info.serverVersion),1)]),_:1}),W(R($),{label:`OS / Kernel`},{default:f(()=>[i(I(V.value?.info.operatingSystem)+` / `+I(V.value?.info.kernelVersion),1)]),_:1}),W(R($),{label:`Storage Driver`},{default:f(()=>[i(I(V.value?.info.storageDriver),1)]),_:1}),W(R($),{label:`Root Dir`},{default:f(()=>[i(I(V.value?.info.dockerRootDir),1)]),_:1}),W(R($),{label:`Container`},{default:f(()=>[i(I(V.value?.info.containersRunning)+` running, `+I(V.value?.info.containersPaused)+` paused, `+I(V.value?.info.containersStopped)+` stopped `,1)]),_:1}),W(R($),{label:`Images`},{default:f(()=>[i(I(V.value?.info.images),1)]),_:1})]),_:1}),W(R(Xe),{title:`Disk Usage`,column:2,bordered:``,"label-placement":`left`},{default:f(()=>[W(R($),{label:`Images`},{default:f(()=>[i(I(R(Q)(V.value?.diskUsage.imagesTotalBytes??0))+` (reclaimable `+I(R(Q)(V.value?.diskUsage.imagesReclaimableBytes??0))+`) `,1)]),_:1}),W(R($),{label:`Containers`},{default:f(()=>[i(I(R(Q)(V.value?.diskUsage.containersTotalBytes??0)),1)]),_:1}),W(R($),{label:`Volumes`},{default:f(()=>[i(I(R(Q)(V.value?.diskUsage.volumesTotalBytes??0))+` (reclaimable `+I(R(Q)(V.value?.diskUsage.volumesReclaimableBytes??0))+`) `,1)]),_:1})]),_:1}),W(R(X),null,{default:f(()=>[(_(),y(F,null,r([`containers`,`images`,`volumes`,`networks`,`all`],e=>W(R(we),{key:e,onPositiveClick:t=>le(e)},{trigger:f(()=>[W(R(A),{size:`small`,loading:G.value===e},{default:f(()=>[i(`Bersihkan `+I(e),1)]),_:2},1032,[`loading`])]),default:f(()=>[i(` Jalankan cleanup "`+I(e)+`"? Tindakan ini tidak bisa dibatalkan. `,1)]),_:2},1032,[`onPositiveClick`])),64))]),_:1})]),_:1})):(_(),D(R(pe),{key:2,description:`Tidak ada data`}))]),_:1})]),_:1},8,[`value`])]),_:1}))}}),[[`__scopeId`,`data-v-d232fd8a`]]);export{ft as default};