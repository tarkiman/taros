import{$n as e,An as t,Bn as n,Bt as r,Cn as i,Dn as a,Fn as o,Gt as s,Hn as c,Ht as l,In as u,It as d,Ln as f,N as p,Nn as m,Nt as h,Pt as g,Qn as _,Rn as v,Tt as y,U as b,Un as x,V as S,Vn as C,Xn as w,Yn as ee,Zt as T,_ as E,_r as D,_t as O,ar as te,br as k,c as A,cn as j,dn as M,dr as N,er as ne,fn as P,gn as re,hn as F,in as ie,ir as ae,jn as I,ln as L,m as oe,mn as R,mr as z,mt as B,nn as V,o as se,or as H,pn as ce,sr as le,wt as U,xn as W,xt as G}from"./auth-BqXj4TCh.js";import{C as ue,S as de,g as fe,h as K,t as pe,u as me}from"./AppShell-Cfoi_5jT.js";import{r as q,t as he}from"./DataTable-CGEiwS9B.js";import{u as J}from"./useTheme-CCyAvF15.js";import{c as ge,n as Y}from"./LocaleSwitcher-BxojKTdg.js";import{n as _e,t as ve}from"./render-CkNTz3qs.js";import{t as ye}from"./get-slot-6kXJmSMP.js";import{t as be}from"./Add-DSg9YyUp.js";import{t as xe}from"./Tag-BQxshXyA.js";import{n as Se,r as Ce}from"./light-DZhPG9Gu.js";import{t as we}from"./use-message-2fn5LdJt.js";import{t as Te}from"./Space-YZZ23fa-.js";import{t as Ee}from"./Popconfirm-DYpWxXrI.js";import{t as X}from"./docker-ChsJiX6E.js";import{n as De,t as Z}from"./format-BxLcbkc3.js";var Oe=K(`.v-x-scroll`,{overflow:`auto`,scrollbarWidth:`none`},[K(`&::-webkit-scrollbar`,{width:0,height:0})]),ke=v({name:`XScroll`,props:{disabled:Boolean,onScroll:Function},setup(){let e=N(null);function t(e){!(e.currentTarget.offsetWidth<e.currentTarget.scrollWidth)||e.deltaY===0||(e.currentTarget.scrollLeft+=e.deltaY+e.deltaX,e.preventDefault())}let n=l();return Oe.mount({id:`vueuc/x-scroll`,head:!0,anchorMetaName:fe,ssr:n}),Object.assign({selfRef:e,handleWheel:t},{scrollTo(...t){var n;(n=e.value)==null||n.scrollTo(...t)}})},render(){return n(`div`,{ref:`selfRef`,onScroll:this.onScroll,onWheel:this.disabled?void 0:this.handleWheel,class:`v-x-scroll`},this.$slots)}});function Ae(e,t=`default`,n=[]){let{children:r}=e;if(typeof r==`object`&&r&&!Array.isArray(r)){let e=r[t];if(typeof e==`function`)return e()}return n}var je=/\s/;function Me(e){for(var t=e.length;t--&&je.test(e.charAt(t)););return t}var Ne=/^\s+/;function Pe(e){return e&&e.slice(0,Me(e)+1).replace(Ne,``)}var Fe=NaN,Ie=/^[-+]0x[0-9a-f]+$/i,Le=/^0b[01]+$/i,Re=/^0o[0-7]+$/i,ze=parseInt;function Be(e){if(typeof e==`number`)return e;if(O(e))return Fe;if(B(e)){var t=typeof e.valueOf==`function`?e.valueOf():e;e=B(t)?t+``:t}if(typeof e!=`string`)return e===0?e:+e;e=Pe(e);var n=Le.test(e);return n||Re.test(e)?ze(e.slice(2),n?2:8):Ie.test(e)?Fe:+e}var Ve=function(){return G.Date.now()},He=`Expected a function`,Ue=Math.max,We=Math.min;function Ge(e,t,n){var r,i,a,o,s,c,l=0,u=!1,d=!1,f=!0;if(typeof e!=`function`)throw TypeError(He);t=Be(t)||0,B(n)&&(u=!!n.leading,d=`maxWait`in n,a=d?Ue(Be(n.maxWait)||0,t):a,f=`trailing`in n?!!n.trailing:f);function p(t){var n=r,a=i;return r=i=void 0,l=t,o=e.apply(a,n),o}function m(e){return l=e,s=setTimeout(_,t),u?p(e):o}function h(e){var n=e-c,r=e-l,i=t-n;return d?We(i,a-r):i}function g(e){var n=e-c,r=e-l;return c===void 0||n>=t||n<0||d&&r>=a}function _(){var e=Ve();if(g(e))return v(e);s=setTimeout(_,h(e))}function v(e){return s=void 0,f&&r?p(e):(r=i=void 0,o)}function y(){s!==void 0&&clearTimeout(s),l=0,r=c=i=s=void 0}function b(){return s===void 0?o:v(Ve())}function x(){var e=Ve(),n=g(e);if(r=arguments,i=this,c=e,n){if(s===void 0)return m(c);if(d)return clearTimeout(s),s=setTimeout(_,t),p(c)}return s===void 0&&(s=setTimeout(_,t)),o}return x.cancel=y,x.flush=b,x}var Ke=`Expected a function`;function qe(e,t,n){var r=!0,i=!0;if(typeof e!=`function`)throw TypeError(Ke);return B(n)&&(r=`leading`in n?!!n.leading:r,i=`trailing`in n?!!n.trailing:i),Ge(e,t,{leading:r,maxWait:t,trailing:i})}var Je=j([L(`descriptions`,{fontSize:`var(--n-font-size)`},[L(`descriptions-separator`,`
 display: inline-block;
 margin: 0 8px 0 2px;
 `),L(`descriptions-table-wrapper`,[L(`descriptions-table`,[L(`descriptions-table-row`,[L(`descriptions-table-header`,{padding:`var(--n-th-padding)`}),L(`descriptions-table-content`,{padding:`var(--n-td-padding)`})])])]),ce(`bordered`,[L(`descriptions-table-wrapper`,[L(`descriptions-table`,[L(`descriptions-table-row`,[j(`&:last-child`,[L(`descriptions-table-content`,{paddingBottom:0})])])])])]),P(`left-label-placement`,[L(`descriptions-table-content`,[j(`> *`,{verticalAlign:`top`})])]),P(`left-label-align`,[j(`th`,{textAlign:`left`})]),P(`center-label-align`,[j(`th`,{textAlign:`center`})]),P(`right-label-align`,[j(`th`,{textAlign:`right`})]),P(`bordered`,[L(`descriptions-table-wrapper`,`
 border-radius: var(--n-border-radius);
 overflow: hidden;
 background: var(--n-merged-td-color);
 border: 1px solid var(--n-merged-border-color);
 `,[L(`descriptions-table`,[L(`descriptions-table-row`,[j(`&:not(:last-child)`,[L(`descriptions-table-content`,{borderBottom:`1px solid var(--n-merged-border-color)`}),L(`descriptions-table-header`,{borderBottom:`1px solid var(--n-merged-border-color)`})]),L(`descriptions-table-header`,`
 font-weight: 400;
 background-clip: padding-box;
 background-color: var(--n-merged-th-color);
 `,[j(`&:not(:last-child)`,{borderRight:`1px solid var(--n-merged-border-color)`})]),L(`descriptions-table-content`,[j(`&:not(:last-child)`,{borderRight:`1px solid var(--n-merged-border-color)`})])])])])]),L(`descriptions-header`,`
 font-weight: var(--n-th-font-weight);
 font-size: 18px;
 transition: color .3s var(--n-bezier);
 line-height: var(--n-line-height);
 margin-bottom: 16px;
 color: var(--n-title-text-color);
 `),L(`descriptions-table-wrapper`,`
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[L(`descriptions-table`,`
 width: 100%;
 border-collapse: separate;
 border-spacing: 0;
 box-sizing: border-box;
 `,[L(`descriptions-table-row`,`
 box-sizing: border-box;
 transition: border-color .3s var(--n-bezier);
 `,[L(`descriptions-table-header`,`
 font-weight: var(--n-th-font-weight);
 line-height: var(--n-line-height);
 display: table-cell;
 box-sizing: border-box;
 color: var(--n-th-text-color);
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `),L(`descriptions-table-content`,`
 vertical-align: top;
 line-height: var(--n-line-height);
 display: table-cell;
 box-sizing: border-box;
 color: var(--n-td-text-color);
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[M(`content`,`
 transition: color .3s var(--n-bezier);
 display: inline-block;
 color: var(--n-td-text-color);
 `)]),M(`label`,`
 font-weight: var(--n-th-font-weight);
 transition: color .3s var(--n-bezier);
 display: inline-block;
 margin-right: 14px;
 color: var(--n-th-text-color);
 `)])])])]),L(`descriptions-table-wrapper`,`
 --n-merged-th-color: var(--n-th-color);
 --n-merged-td-color: var(--n-td-color);
 --n-merged-border-color: var(--n-border-color);
 `),F(L(`descriptions-table-wrapper`,`
 --n-merged-th-color: var(--n-th-color-modal);
 --n-merged-td-color: var(--n-td-color-modal);
 --n-merged-border-color: var(--n-border-color-modal);
 `)),re(L(`descriptions-table-wrapper`,`
 --n-merged-th-color: var(--n-th-color-popover);
 --n-merged-td-color: var(--n-td-color-popover);
 --n-merged-border-color: var(--n-border-color-popover);
 `))]),Ye=`DESCRIPTION_ITEM_FLAG`;function Xe(e){return typeof e==`object`&&e&&!Array.isArray(e)?e.type&&e.type.DESCRIPTION_ITEM_FLAG:!1}var Ze=Object.assign(Object.assign({},b.props),{title:String,column:{type:Number,default:3},columns:Number,labelPlacement:{type:String,default:`top`},labelAlign:{type:String,default:`left`},separator:{type:String,default:`:`},size:String,bordered:Boolean,labelClass:String,labelStyle:[Object,String],contentClass:String,contentStyle:[Object,String]}),Qe=v({name:`Descriptions`,props:Ze,slots:Object,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n,mergedComponentPropsRef:r}=y(e),i=I(()=>e.size||r?.value?.Descriptions?.size||`medium`),a=b(`Descriptions`,`-descriptions`,Je,Ce,e,t),o=I(()=>{let{bordered:t}=e,n=i.value,{common:{cubicBezierEaseInOut:r},self:{titleTextColor:o,thColor:s,thColorModal:c,thColorPopover:l,thTextColor:u,thFontWeight:d,tdTextColor:f,tdColor:p,tdColorModal:m,tdColorPopover:h,borderColor:g,borderColorModal:_,borderColorPopover:v,borderRadius:y,lineHeight:b,[R(`fontSize`,n)]:x,[R(t?`thPaddingBordered`:`thPadding`,n)]:S,[R(t?`tdPaddingBordered`:`tdPadding`,n)]:C}}=a.value;return{"--n-title-text-color":o,"--n-th-padding":S,"--n-td-padding":C,"--n-font-size":x,"--n-bezier":r,"--n-th-font-weight":d,"--n-line-height":b,"--n-th-text-color":u,"--n-td-text-color":f,"--n-th-color":s,"--n-th-color-modal":c,"--n-th-color-popover":l,"--n-td-color":p,"--n-td-color-modal":m,"--n-td-color-popover":h,"--n-border-radius":y,"--n-border-color":g,"--n-border-color-modal":_,"--n-border-color-popover":v}}),s=n?U(`descriptions`,I(()=>{let t=``,{bordered:n}=e;return n&&(t+=`a`),t+=i.value[0],t}),o,e):void 0;return{mergedClsPrefix:t,cssVars:n?void 0:o,themeClass:s?.themeClass,onRender:s?.onRender,compitableColumn:de(e,[`columns`,`column`]),inlineThemeDisabled:n,mergedSize:i}},render(){let e=this.$slots.default,t=e?J(e()):[];t.length;let{contentClass:r,labelClass:i,compitableColumn:a,labelPlacement:o,labelAlign:s,mergedSize:c,bordered:l,title:u,cssVars:d,mergedClsPrefix:f,separator:p,onRender:m}=this;m?.();let h=t.filter(e=>Xe(e)),g=h.reduce((e,t,s)=>{let c=t.props||{},u=h.length-1===s,d=[`label`in c?c.label:Ae(t,`label`)],m=[Ae(t)],g=c.span||1,_=e.span;e.span+=g;let v=c.labelStyle||c[`label-style`]||this.labelStyle,y=c.contentStyle||c[`content-style`]||this.contentStyle;if(o===`left`)l?e.row.push(n(`th`,{class:[`${f}-descriptions-table-header`,i],colspan:1,style:v},d),n(`td`,{class:[`${f}-descriptions-table-content`,r],colspan:u?(a-_)*2+1:g*2-1,style:y},m)):e.row.push(n(`td`,{class:`${f}-descriptions-table-content`,colspan:u?(a-_)*2:g*2},n(`span`,{class:[`${f}-descriptions-table-content__label`,i],style:v},[...d,p&&n(`span`,{class:`${f}-descriptions-separator`},p)]),n(`span`,{class:[`${f}-descriptions-table-content__content`,r],style:y},m)));else{let t=u?(a-_)*2:g*2;e.row.push(n(`th`,{class:[`${f}-descriptions-table-header`,i],colspan:t,style:v},d)),e.secondRow.push(n(`td`,{class:[`${f}-descriptions-table-content`,r],colspan:t,style:y},m))}return(e.span>=a||u)&&(e.span=0,e.row.length&&(e.rows.push(e.row),e.row=[]),o!==`left`&&e.secondRow.length&&(e.rows.push(e.secondRow),e.secondRow=[])),e},{span:0,row:[],secondRow:[],rows:[]}).rows.map(e=>n(`tr`,{class:`${f}-descriptions-table-row`},e));return n(`div`,{style:d,class:[`${f}-descriptions`,this.themeClass,`${f}-descriptions--${o}-label-placement`,`${f}-descriptions--${s}-label-align`,`${f}-descriptions--${c}-size`,l&&`${f}-descriptions--bordered`]},u||this.$slots.header?n(`div`,{class:`${f}-descriptions-header`},u||ye(this,`header`)):null,n(`div`,{class:`${f}-descriptions-table-wrapper`},n(`table`,{class:`${f}-descriptions-table`},n(`tbody`,null,o===`top`&&n(`tr`,{class:`${f}-descriptions-table-row`,style:{visibility:`collapse`}},T(a*2,n(`td`,null))),g))))}}),$e={label:String,span:{type:Number,default:1},labelClass:String,labelStyle:[Object,String],contentClass:String,contentStyle:[Object,String]},Q=v({name:`DescriptionsItem`,[Ye]:!0,props:$e,slots:Object,render(){return null}}),et=s(`n-tabs`),tt={tab:[String,Number,Object,Function],name:{type:[String,Number],required:!0},disabled:Boolean,displayDirective:{type:String,default:`if`},closable:{type:Boolean,default:void 0},tabProps:Object,label:[String,Number,Object,Function]},$=v({__TAB_PANE__:!0,name:`TabPane`,alias:[`TabPanel`],props:tt,slots:Object,setup(e){let t=C(et,null);return t||d(`tab-pane`,"`n-tab-pane` must be placed inside `n-tabs`."),{style:t.paneStyleRef,class:t.paneClassRef,mergedClsPrefix:t.mergedClsPrefixRef}},render(){return n(`div`,{class:[`${this.mergedClsPrefix}-tab-pane`,this.class],style:this.style},this.$slots)}}),nt=Object.assign({internalLeftPadded:Boolean,internalAddable:Boolean,internalCreatedByPane:Boolean},_e(tt,[`displayDirective`])),rt=v({__TAB__:!0,inheritAttrs:!1,name:`Tab`,props:nt,setup(e){let{mergedClsPrefixRef:t,valueRef:n,typeRef:r,closableRef:i,tabStyleRef:a,addTabStyleRef:o,tabClassRef:s,addTabClassRef:c,tabChangeIdRef:l,onBeforeLeaveRef:u,triggerRef:d,handleAdd:f,activateTab:p,handleClose:m}=C(et);return{trigger:d,mergedClosable:I(()=>{if(e.internalAddable)return!1;let{closable:t}=e;return t===void 0?i.value:t}),style:a,addStyle:o,tabClass:s,addTabClass:c,clsPrefix:t,value:n,type:r,handleClose(t){t.stopPropagation(),!e.disabled&&m(e.name)},activateTab(){if(e.disabled)return;if(e.internalAddable){f();return}let{name:t}=e,r=++l.id;if(t!==n.value){let{value:i}=u;i?Promise.resolve(i(e.name,n.value)).then(e=>{e&&l.id===r&&p(t)}):p(t)}}}},render(){let{internalAddable:e,clsPrefix:t,name:r,disabled:i,label:o,tab:s,value:l,mergedClosable:u,trigger:d,$slots:{default:f}}=this,m=o??s;return n(`div`,{class:`${t}-tabs-tab-wrapper`},this.internalLeftPadded?n(`div`,{class:`${t}-tabs-tab-pad`}):null,n(`div`,Object.assign({key:r,"data-name":r,"data-disabled":i?!0:void 0},c({class:[`${t}-tabs-tab`,l===r&&`${t}-tabs-tab--active`,i&&`${t}-tabs-tab--disabled`,u&&`${t}-tabs-tab--closable`,e&&`${t}-tabs-tab--addable`,e?this.addTabClass:this.tabClass],onClick:d===`click`?this.activateTab:void 0,onMouseenter:d===`hover`?this.activateTab:void 0,style:e?this.addStyle:this.style},this.internalCreatedByPane?this.tabProps||{}:this.$attrs)),n(`span`,{class:`${t}-tabs-tab__label`},e?n(a,null,n(`div`,{class:`${t}-tabs-tab__height-placeholder`},`\xA0`),n(S,{clsPrefix:t},{default:()=>n(be,null)})):f?f():typeof m==`object`?m:ve(m??r)),u&&this.type===`card`?n(p,{clsPrefix:t,class:`${t}-tabs-tab__close`,onClick:this.handleClose,disabled:i}):null))}}),it=L(`tabs`,`
 box-sizing: border-box;
 width: 100%;
 display: flex;
 flex-direction: column;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
`,[P(`segment-type`,[L(`tabs-rail`,[j(`&.transition-disabled`,[L(`tabs-capsule`,`
 transition: none;
 `)])])]),P(`top`,[L(`tab-pane`,`
 padding: var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left);
 `)]),P(`left`,[L(`tab-pane`,`
 padding: var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left) var(--n-pane-padding-top);
 `)]),P(`left, right`,`
 flex-direction: row;
 `,[L(`tabs-bar`,`
 width: 2px;
 right: 0;
 transition:
 top .2s var(--n-bezier),
 max-height .2s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `),L(`tabs-tab`,`
 padding: var(--n-tab-padding-vertical); 
 `)]),P(`right`,`
 flex-direction: row-reverse;
 `,[L(`tab-pane`,`
 padding: var(--n-pane-padding-left) var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom);
 `),L(`tabs-bar`,`
 left: 0;
 `)]),P(`bottom`,`
 flex-direction: column-reverse;
 justify-content: flex-end;
 `,[L(`tab-pane`,`
 padding: var(--n-pane-padding-bottom) var(--n-pane-padding-right) var(--n-pane-padding-top) var(--n-pane-padding-left);
 `),L(`tabs-bar`,`
 top: 0;
 `)]),L(`tabs-rail`,`
 position: relative;
 padding: 3px;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 background-color: var(--n-color-segment);
 transition: background-color .3s var(--n-bezier);
 display: flex;
 align-items: center;
 `,[L(`tabs-capsule`,`
 border-radius: var(--n-tab-border-radius);
 position: absolute;
 pointer-events: none;
 background-color: var(--n-tab-color-segment);
 box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .08);
 transition: transform 0.3s var(--n-bezier);
 `),L(`tabs-tab-wrapper`,`
 flex-basis: 0;
 flex-grow: 1;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[L(`tabs-tab`,`
 overflow: hidden;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[P(`active`,`
 font-weight: var(--n-font-weight-strong);
 color: var(--n-tab-text-color-active);
 `),j(`&:hover`,`
 color: var(--n-tab-text-color-hover);
 `)])])]),P(`flex`,[L(`tabs-nav`,`
 width: 100%;
 position: relative;
 `,[L(`tabs-wrapper`,`
 width: 100%;
 `,[L(`tabs-tab`,`
 margin-right: 0;
 `)])])]),L(`tabs-nav`,`
 box-sizing: border-box;
 line-height: 1.5;
 display: flex;
 transition: border-color .3s var(--n-bezier);
 `,[M(`prefix, suffix`,`
 display: flex;
 align-items: center;
 `),M(`prefix`,`padding-right: 16px;`),M(`suffix`,`padding-left: 16px;`)]),P(`top, bottom`,[j(`>`,[L(`tabs-nav`,[L(`tabs-nav-scroll-wrapper`,[j(`&::before`,`
 top: 0;
 bottom: 0;
 left: 0;
 width: 20px;
 `),j(`&::after`,`
 top: 0;
 bottom: 0;
 right: 0;
 width: 20px;
 `),P(`shadow-start`,[j(`&::before`,`
 box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, .12);
 `)]),P(`shadow-end`,[j(`&::after`,`
 box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),P(`left, right`,[L(`tabs-nav-scroll-content`,`
 flex-direction: column;
 `),j(`>`,[L(`tabs-nav`,[L(`tabs-nav-scroll-wrapper`,[j(`&::before`,`
 top: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),j(`&::after`,`
 bottom: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),P(`shadow-start`,[j(`&::before`,`
 box-shadow: inset 0 10px 8px -8px rgba(0, 0, 0, .12);
 `)]),P(`shadow-end`,[j(`&::after`,`
 box-shadow: inset 0 -10px 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),L(`tabs-nav-scroll-wrapper`,`
 flex: 1;
 position: relative;
 overflow: hidden;
 `,[L(`tabs-nav-y-scroll`,`
 height: 100%;
 width: 100%;
 overflow-y: auto; 
 scrollbar-width: none;
 `,[j(`&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb`,`
 width: 0;
 height: 0;
 display: none;
 `)]),j(`&::before, &::after`,`
 transition: box-shadow .3s var(--n-bezier);
 pointer-events: none;
 content: "";
 position: absolute;
 z-index: 1;
 `)]),L(`tabs-nav-scroll-content`,`
 display: flex;
 position: relative;
 min-width: 100%;
 min-height: 100%;
 width: fit-content;
 box-sizing: border-box;
 `),L(`tabs-wrapper`,`
 display: inline-flex;
 flex-wrap: nowrap;
 position: relative;
 `),L(`tabs-tab-wrapper`,`
 display: flex;
 flex-wrap: nowrap;
 flex-shrink: 0;
 flex-grow: 0;
 `),L(`tabs-tab`,`
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
 `,[P(`disabled`,{cursor:`not-allowed`}),M(`close`,`
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),M(`label`,`
 display: flex;
 align-items: center;
 z-index: 1;
 `)]),L(`tabs-bar`,`
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
 `,[j(`&.transition-disabled`,`
 transition: none;
 `),P(`disabled`,`
 background-color: var(--n-tab-text-color-disabled)
 `)]),L(`tabs-pane-wrapper`,`
 position: relative;
 overflow: hidden;
 transition: max-height .2s var(--n-bezier);
 `),L(`tab-pane`,`
 color: var(--n-pane-text-color);
 width: 100%;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 opacity .2s var(--n-bezier);
 left: 0;
 right: 0;
 top: 0;
 `,[j(`&.next-transition-leave-active, &.prev-transition-leave-active, &.next-transition-enter-active, &.prev-transition-enter-active`,`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 transform .2s var(--n-bezier),
 opacity .2s var(--n-bezier);
 `),j(`&.next-transition-leave-active, &.prev-transition-leave-active`,`
 position: absolute;
 `),j(`&.next-transition-enter-from, &.prev-transition-leave-to`,`
 transform: translateX(32px);
 opacity: 0;
 `),j(`&.next-transition-leave-to, &.prev-transition-enter-from`,`
 transform: translateX(-32px);
 opacity: 0;
 `),j(`&.next-transition-leave-from, &.next-transition-enter-to, &.prev-transition-leave-from, &.prev-transition-enter-to`,`
 transform: translateX(0);
 opacity: 1;
 `)]),L(`tabs-tab-pad`,`
 box-sizing: border-box;
 width: var(--n-tab-gap);
 flex-grow: 0;
 flex-shrink: 0;
 `),P(`line-type, bar-type`,[L(`tabs-tab`,`
 font-weight: var(--n-tab-font-weight);
 box-sizing: border-box;
 vertical-align: bottom;
 `,[j(`&:hover`,{color:`var(--n-tab-text-color-hover)`}),P(`active`,`
 color: var(--n-tab-text-color-active);
 font-weight: var(--n-tab-font-weight-active);
 `),P(`disabled`,{color:`var(--n-tab-text-color-disabled)`})])]),L(`tabs-nav`,[P(`line-type`,[P(`top`,[M(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),L(`tabs-nav-scroll-content`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),L(`tabs-bar`,`
 bottom: -1px;
 `)]),P(`left`,[M(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),L(`tabs-nav-scroll-content`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),L(`tabs-bar`,`
 right: -1px;
 `)]),P(`right`,[M(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),L(`tabs-nav-scroll-content`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),L(`tabs-bar`,`
 left: -1px;
 `)]),P(`bottom`,[M(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),L(`tabs-nav-scroll-content`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),L(`tabs-bar`,`
 top: -1px;
 `)]),M(`prefix, suffix`,`
 transition: border-color .3s var(--n-bezier);
 `),L(`tabs-nav-scroll-content`,`
 transition: border-color .3s var(--n-bezier);
 `),L(`tabs-bar`,`
 border-radius: 0;
 `)]),P(`card-type`,[M(`prefix, suffix`,`
 transition: border-color .3s var(--n-bezier);
 `),L(`tabs-pad`,`
 flex-grow: 1;
 transition: border-color .3s var(--n-bezier);
 `),L(`tabs-tab-pad`,`
 transition: border-color .3s var(--n-bezier);
 `),L(`tabs-tab`,`
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
 `,[P(`addable`,`
 padding-left: 8px;
 padding-right: 8px;
 font-size: 16px;
 justify-content: center;
 `,[M(`height-placeholder`,`
 width: 0;
 font-size: var(--n-tab-font-size);
 `),ce(`disabled`,[j(`&:hover`,`
 color: var(--n-tab-text-color-hover);
 `)])]),P(`closable`,`padding-right: 8px;`),P(`active`,`
 background-color: #0000;
 font-weight: var(--n-tab-font-weight-active);
 color: var(--n-tab-text-color-active);
 `),P(`disabled`,`color: var(--n-tab-text-color-disabled);`)])]),P(`left, right`,`
 flex-direction: column; 
 `,[M(`prefix, suffix`,`
 padding: var(--n-tab-padding-vertical);
 `),L(`tabs-wrapper`,`
 flex-direction: column;
 `),L(`tabs-tab-wrapper`,`
 flex-direction: column;
 `,[L(`tabs-tab-pad`,`
 height: var(--n-tab-gap-vertical);
 width: 100%;
 `)])]),P(`top`,[P(`card-type`,[L(`tabs-scroll-padding`,`border-bottom: 1px solid var(--n-tab-border-color);`),M(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),L(`tabs-tab`,`
 border-top-left-radius: var(--n-tab-border-radius);
 border-top-right-radius: var(--n-tab-border-radius);
 `,[P(`active`,`
 border-bottom: 1px solid #0000;
 `)]),L(`tabs-tab-pad`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),L(`tabs-pad`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `)])]),P(`left`,[P(`card-type`,[L(`tabs-scroll-padding`,`border-right: 1px solid var(--n-tab-border-color);`),M(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),L(`tabs-tab`,`
 border-top-left-radius: var(--n-tab-border-radius);
 border-bottom-left-radius: var(--n-tab-border-radius);
 `,[P(`active`,`
 border-right: 1px solid #0000;
 `)]),L(`tabs-tab-pad`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),L(`tabs-pad`,`
 border-right: 1px solid var(--n-tab-border-color);
 `)])]),P(`right`,[P(`card-type`,[L(`tabs-scroll-padding`,`border-left: 1px solid var(--n-tab-border-color);`),M(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),L(`tabs-tab`,`
 border-top-right-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[P(`active`,`
 border-left: 1px solid #0000;
 `)]),L(`tabs-tab-pad`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),L(`tabs-pad`,`
 border-left: 1px solid var(--n-tab-border-color);
 `)])]),P(`bottom`,[P(`card-type`,[L(`tabs-scroll-padding`,`border-top: 1px solid var(--n-tab-border-color);`),M(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),L(`tabs-tab`,`
 border-bottom-left-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[P(`active`,`
 border-top: 1px solid #0000;
 `)]),L(`tabs-tab-pad`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),L(`tabs-pad`,`
 border-top: 1px solid var(--n-tab-border-color);
 `)])])])]),at=qe,ot=Object.assign(Object.assign({},b.props),{value:[String,Number],defaultValue:[String,Number],trigger:{type:String,default:`click`},type:{type:String,default:`bar`},closable:Boolean,justifyContent:String,size:String,placement:{type:String,default:`top`},tabStyle:[String,Object],tabClass:String,addTabStyle:[String,Object],addTabClass:String,barWidth:Number,paneClass:String,paneStyle:[String,Object],paneWrapperClass:String,paneWrapperStyle:[String,Object],addable:[Boolean,Object],tabsPadding:{type:Number,default:0},animated:Boolean,onBeforeLeave:Function,onAdd:Function,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onClose:[Function,Array],labelSize:String,activeName:[String,Number],onActiveNameChange:[Function,Array]}),st=v({name:`Tabs`,props:ot,slots:Object,setup(t,{slots:n}){let{mergedClsPrefixRef:r,inlineThemeDisabled:i,mergedComponentPropsRef:a}=y(t),o=b(`Tabs`,`-tabs`,it,Se,t,r),s=N(null),c=N(null),l=N(null),u=N(null),d=N(null),f=N(null),p=N(!0),m=N(!0),h=de(t,[`labelSize`,`size`]),_=I(()=>h.value?h.value:a?.value?.Tabs?.size||`medium`),v=de(t,[`activeName`,`value`]),S=N(v.value??t.defaultValue??(n.default?J(n.default())[0]?.props?.name:null)),C=ge(v,S),w={id:0},T=I(()=>{if(!(!t.justifyContent||t.type===`card`))return{display:`flex`,justifyContent:t.justifyContent}});ae(C,()=>{w.id=0,A(),j()});function E(){let{value:e}=C;return e===null?null:s.value?.querySelector(`[data-name="${e}"]`)}function D(e){if(t.type===`card`)return;let{value:n}=c;if(!n)return;let i=n.style.opacity===`0`;if(e){let a=`${r.value}-tabs-bar--disabled`,{barWidth:o,placement:s}=t;if(e.dataset.disabled===`true`?n.classList.add(a):n.classList.remove(a),[`top`,`bottom`].includes(s)){if(k([`top`,`maxHeight`,`height`]),typeof o==`number`&&e.offsetWidth>=o){let t=Math.floor((e.offsetWidth-o)/2)+e.offsetLeft;n.style.left=`${t}px`,n.style.maxWidth=`${o}px`}else n.style.left=`${e.offsetLeft}px`,n.style.maxWidth=`${e.offsetWidth}px`;n.style.width=`8192px`,i&&(n.style.transition=`none`),n.offsetWidth,i&&(n.style.transition=``,n.style.opacity=`1`)}else{if(k([`left`,`maxWidth`,`width`]),typeof o==`number`&&e.offsetHeight>=o){let t=Math.floor((e.offsetHeight-o)/2)+e.offsetTop;n.style.top=`${t}px`,n.style.maxHeight=`${o}px`}else n.style.top=`${e.offsetTop}px`,n.style.maxHeight=`${e.offsetHeight}px`;n.style.height=`8192px`,i&&(n.style.transition=`none`),n.offsetHeight,i&&(n.style.transition=``,n.style.opacity=`1`)}}}function O(){if(t.type===`card`)return;let{value:e}=c;e&&(e.style.opacity=`0`)}function k(e){let{value:t}=c;if(t)for(let n of e)t.style[n]=``}function A(){if(t.type===`card`)return;let e=E();e?D(e):O()}function j(){let e=d.value?.$el;if(!e)return;let t=E();if(!t)return;let{scrollLeft:n,offsetWidth:r}=e,{offsetLeft:i,offsetWidth:a}=t;n>i?e.scrollTo({top:0,left:i,behavior:`smooth`}):i+a>n+r&&e.scrollTo({top:0,left:i+a-r,behavior:`smooth`})}let M=N(null),ne=0,P=null;function re(e){let t=M.value;if(t){ne=e.getBoundingClientRect().height;let n=`${ne}px`,r=()=>{t.style.height=n,t.style.maxHeight=n};P?(r(),P(),P=null):P=r}}function F(e){let t=M.value;if(t){let n=e.getBoundingClientRect().height,r=()=>{document.body.offsetHeight,t.style.maxHeight=`${n}px`,t.style.height=`${Math.max(ne,n)}px`};P?(P(),P=null,r()):P=r}}function L(){let e=M.value;if(e){e.style.maxHeight=``,e.style.height=``;let{paneWrapperStyle:n}=t;if(typeof n==`string`)e.style.cssText=n;else if(n){let{maxHeight:t,height:r}=n;t!==void 0&&(e.style.maxHeight=t),r!==void 0&&(e.style.height=r)}}}let oe={value:[]},B=N(`next`);function se(e){let t=C.value,n=`next`;for(let r of oe.value){if(r===t)break;if(r===e){n=`prev`;break}}B.value=n,H(e)}function H(e){let{onActiveNameChange:n,onUpdateValue:r,"onUpdate:value":i}=t;n&&g(n,e),r&&g(r,e),i&&g(i,e),S.value=e}function ce(e){let{onClose:n}=t;n&&g(n,e)}let le=!0;function W(){let{value:e}=c;if(!e)return;le||=!1;let t=`transition-disabled`;e.classList.add(t),A(),e.classList.remove(t)}let G=N(null);function fe({transitionDisabled:e}){let t=s.value;if(!t)return;e&&t.classList.add(`transition-disabled`);let n=E();n&&G.value&&(G.value.style.width=`${n.offsetWidth}px`,G.value.style.height=`${n.offsetHeight}px`,G.value.style.transform=`translateX(${n.offsetLeft-V(getComputedStyle(t).paddingLeft)}px)`,e&&G.value.offsetWidth),e&&t.classList.remove(`transition-disabled`)}ae([C],()=>{t.type===`segment`&&x(()=>{fe({transitionDisabled:!1})})}),ee(()=>{t.type===`segment`&&fe({transitionDisabled:!0})});let K=0;function pe(e){if(e.contentRect.width===0&&e.contentRect.height===0||K===e.contentRect.width)return;K=e.contentRect.width;let{type:n}=t;if((n===`line`||n===`bar`)&&(le||t.justifyContent?.startsWith(`space`))&&W(),n!==`segment`){let{placement:e}=t;ve((e===`top`||e===`bottom`?d.value?.$el:f.value)||null)}}let me=at(pe,64);ae([()=>t.justifyContent,()=>t.size],()=>{x(()=>{let{type:e}=t;(e===`line`||e===`bar`)&&W()})});let q=N(!1);function he(e){let{target:n,contentRect:{width:r,height:i}}=e,a=n.parentElement.parentElement.offsetWidth,o=n.parentElement.parentElement.offsetHeight,{placement:s}=t;if(!q.value)s===`top`||s===`bottom`?a<r&&(q.value=!0):o<i&&(q.value=!0);else{let{value:e}=u;if(!e)return;s===`top`||s===`bottom`?a-r>e.$el.offsetWidth&&(q.value=!1):o-i>e.$el.offsetHeight&&(q.value=!1)}ve(d.value?.$el||null)}let Y=at(he,64);function _e(){let{onAdd:e}=t;e&&e(),x(()=>{let e=E(),{value:t}=d;!e||!t||t.scrollTo({left:e.offsetLeft,top:0,behavior:`smooth`})})}function ve(e){if(!e)return;let{placement:n}=t;if(n===`top`||n===`bottom`){let{scrollLeft:t,scrollWidth:n,offsetWidth:r}=e;p.value=t<=0,m.value=t+r>=n}else{let{scrollTop:t,scrollHeight:n,offsetHeight:r}=e;p.value=t<=0,m.value=t+r>=n}}let ye=at(e=>{ve(e.target)},64);e(et,{triggerRef:z(t,`trigger`),tabStyleRef:z(t,`tabStyle`),tabClassRef:z(t,`tabClass`),addTabStyleRef:z(t,`addTabStyle`),addTabClassRef:z(t,`addTabClass`),paneClassRef:z(t,`paneClass`),paneStyleRef:z(t,`paneStyle`),mergedClsPrefixRef:r,typeRef:z(t,`type`),closableRef:z(t,`closable`),valueRef:C,tabChangeIdRef:w,onBeforeLeaveRef:z(t,`onBeforeLeave`),activateTab:se,handleClose:ce,handleAdd:_e}),ue(()=>{A(),j()}),te(()=>{let{value:e}=l;if(!e)return;let{value:t}=r,n=`${t}-tabs-nav-scroll-wrapper--shadow-start`,i=`${t}-tabs-nav-scroll-wrapper--shadow-end`;p.value?e.classList.remove(n):e.classList.add(n),m.value?e.classList.remove(i):e.classList.add(i)});let be={syncBarPosition:()=>{A()}},xe=()=>{fe({transitionDisabled:!0})},Ce=I(()=>{let{value:e}=_,{type:n}=t,r=`${e}${{card:`Card`,bar:`Bar`,line:`Line`,segment:`Segment`}[n]}`,{self:{barColor:i,closeIconColor:a,closeIconColorHover:s,closeIconColorPressed:c,tabColor:l,tabBorderColor:u,paneTextColor:d,tabFontWeight:f,tabBorderRadius:p,tabFontWeightActive:m,colorSegment:h,fontWeightStrong:g,tabColorSegment:v,closeSize:y,closeIconSize:b,closeColorHover:x,closeColorPressed:S,closeBorderRadius:C,[R(`panePadding`,e)]:w,[R(`tabPadding`,r)]:ee,[R(`tabPaddingVertical`,r)]:T,[R(`tabGap`,r)]:E,[R(`tabGap`,`${r}Vertical`)]:D,[R(`tabTextColor`,n)]:O,[R(`tabTextColorActive`,n)]:te,[R(`tabTextColorHover`,n)]:k,[R(`tabTextColorDisabled`,n)]:A,[R(`tabFontSize`,e)]:j},common:{cubicBezierEaseInOut:M}}=o.value;return{"--n-bezier":M,"--n-color-segment":h,"--n-bar-color":i,"--n-tab-font-size":j,"--n-tab-text-color":O,"--n-tab-text-color-active":te,"--n-tab-text-color-disabled":A,"--n-tab-text-color-hover":k,"--n-pane-text-color":d,"--n-tab-border-color":u,"--n-tab-border-radius":p,"--n-close-size":y,"--n-close-icon-size":b,"--n-close-color-hover":x,"--n-close-color-pressed":S,"--n-close-border-radius":C,"--n-close-icon-color":a,"--n-close-icon-color-hover":s,"--n-close-icon-color-pressed":c,"--n-tab-color":l,"--n-tab-font-weight":f,"--n-tab-font-weight-active":m,"--n-tab-padding":ee,"--n-tab-padding-vertical":T,"--n-tab-gap":E,"--n-tab-gap-vertical":D,"--n-pane-padding-left":ie(w,`left`),"--n-pane-padding-right":ie(w,`right`),"--n-pane-padding-top":ie(w,`top`),"--n-pane-padding-bottom":ie(w,`bottom`),"--n-font-weight-strong":g,"--n-tab-color-segment":v}}),we=i?U(`tabs`,I(()=>`${_.value[0]}${t.type[0]}`),Ce,t):void 0;return Object.assign({mergedClsPrefix:r,mergedValue:C,renderedNames:new Set,segmentCapsuleElRef:G,tabsPaneWrapperRef:M,tabsElRef:s,barElRef:c,addTabInstRef:u,xScrollInstRef:d,scrollWrapperElRef:l,addTabFixed:q,tabWrapperStyle:T,handleNavResize:me,mergedSize:_,handleScroll:ye,handleTabsResize:Y,cssVars:i?void 0:Ce,themeClass:we?.themeClass,animationDirection:B,renderNameListRef:oe,yScrollElRef:f,handleSegmentResize:xe,onAnimationBeforeLeave:re,onAnimationEnter:F,onAnimationAfterEnter:L,onRender:we?.onRender},be)},render(){let{mergedClsPrefix:e,type:t,placement:i,addTabFixed:a,addable:o,mergedSize:s,renderNameListRef:c,onRender:l,paneWrapperClass:u,paneWrapperStyle:d,$slots:{default:f,prefix:p,suffix:m}}=this;l?.();let g=f?J(f()).filter(e=>e.type.__TAB_PANE__===!0):[],_=f?J(f()).filter(e=>e.type.__TAB__===!0):[],v=!_.length,y=t===`card`,b=t===`segment`,x=!y&&!b&&this.justifyContent;c.value=[];let S=()=>{let t=n(`div`,{style:this.tabWrapperStyle,class:`${e}-tabs-wrapper`},x?null:n(`div`,{class:`${e}-tabs-scroll-padding`,style:i===`top`||i===`bottom`?{width:`${this.tabsPadding}px`}:{height:`${this.tabsPadding}px`}}),v?g.map((e,t)=>(c.value.push(e.props.name),dt(n(rt,Object.assign({},e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0&&(!x||x===`center`||x===`start`||x===`end`)}),e.children?{default:e.children.tab}:void 0)))):_.map((e,t)=>(c.value.push(e.props.name),dt(t!==0&&!x?ut(e):e))),!a&&o&&y?lt(o,(v?g.length:_.length)!==0):null,x?null:n(`div`,{class:`${e}-tabs-scroll-padding`,style:{width:`${this.tabsPadding}px`}}));return n(`div`,{ref:`tabsElRef`,class:`${e}-tabs-nav-scroll-content`},y&&o?n(r,{onResize:this.handleTabsResize},{default:()=>t}):t,y?n(`div`,{class:`${e}-tabs-pad`}):null,y?null:n(`div`,{ref:`barElRef`,class:`${e}-tabs-bar`}))},C=b?`top`:i;return n(`div`,{class:[`${e}-tabs`,this.themeClass,`${e}-tabs--${t}-type`,`${e}-tabs--${s}-size`,x&&`${e}-tabs--flex`,`${e}-tabs--${C}`],style:this.cssVars},n(`div`,{class:[`${e}-tabs-nav--${t}-type`,`${e}-tabs-nav--${C}`,`${e}-tabs-nav`]},h(p,t=>t&&n(`div`,{class:`${e}-tabs-nav__prefix`},t)),b?n(r,{onResize:this.handleSegmentResize},{default:()=>n(`div`,{class:`${e}-tabs-rail`,ref:`tabsElRef`},n(`div`,{class:`${e}-tabs-capsule`,ref:`segmentCapsuleElRef`},n(`div`,{class:`${e}-tabs-wrapper`},n(`div`,{class:`${e}-tabs-tab`}))),v?g.map((e,t)=>(c.value.push(e.props.name),n(rt,Object.assign({},e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0}),e.children?{default:e.children.tab}:void 0))):_.map((e,t)=>(c.value.push(e.props.name),t===0?e:ut(e))))}):n(r,{onResize:this.handleNavResize},{default:()=>n(`div`,{class:`${e}-tabs-nav-scroll-wrapper`,ref:`scrollWrapperElRef`},[`top`,`bottom`].includes(C)?n(ke,{ref:`xScrollInstRef`,onScroll:this.handleScroll},{default:S}):n(`div`,{class:`${e}-tabs-nav-y-scroll`,onScroll:this.handleScroll,ref:`yScrollElRef`},S()))}),a&&o&&y?lt(o,!0):null,h(m,t=>t&&n(`div`,{class:`${e}-tabs-nav__suffix`},t))),v&&(this.animated&&(C===`top`||C===`bottom`)?n(`div`,{ref:`tabsPaneWrapperRef`,style:d,class:[`${e}-tabs-pane-wrapper`,u]},ct(g,this.mergedValue,this.renderedNames,this.onAnimationBeforeLeave,this.onAnimationEnter,this.onAnimationAfterEnter,this.animationDirection)):ct(g,this.mergedValue,this.renderedNames)))}});function ct(e,t,r,a,o,s,c){let l=[];return e.forEach(e=>{let{name:n,displayDirective:a,"display-directive":o}=e.props,s=e=>a===e||o===e,c=t===n;if(e.key!==void 0&&(e.key=n),c||s(`show`)||s(`show:lazy`)&&r.has(n)){r.has(n)||r.add(n);let t=!s(`if`);l.push(t?le(e,[[i,c]]):e)}}),c?n(W,{name:`${c}-transition`,onBeforeLeave:a,onEnter:o,onAfterEnter:s},{default:()=>l}):l}function lt(e,t){return n(rt,{ref:`addTabInstRef`,key:`__addable`,name:`__addable`,internalCreatedByPane:!0,internalAddable:!0,internalLeftPadded:t,disabled:typeof e==`object`&&e.disabled})}function ut(e){let n=t(e);return n.props?n.props.internalLeftPadded=!0:n.props={internalLeftPadded:!0},n}function dt(e){return Array.isArray(e.dynamicProps)?e.dynamicProps.includes(`internalLeftPadded`)||e.dynamicProps.push(`internalLeftPadded`):e.dynamicProps=[`internalLeftPadded`],e}var ft={key:1,class:`tab-loading`},pt=se(v({__name:`DockerView`,setup(e){let{t}=oe(),r=we();function i(e){return e instanceof A&&e.status===503&&!!e.body&&typeof e.body==`object`&&`enabled`in e.body}function s(e,t){r.error(e instanceof A?e.message:t)}let c=e=>e===`running`?`success`:e===`paused`||e===`restarting`?`warning`:e===`dead`?`error`:`default`,l={running:0,restarting:1,paused:2,created:3,exited:4,dead:5};function d(e){return l[e.state]??6}function p(e,t){return e.hasStats?t(e.stats):-1}let h=N([]),g=N(!0),v=N(null),y;async function b(){try{let e=await X.containers();h.value=e.containers,v.value=null}catch(e){i(e)&&(v.value=e.body)}finally{g.value=!1}}async function x(e,n){try{let t=await X.containerAction(e,n);h.value=t.containers}catch(e){s(e,t(`docker.actionFailed`,{action:n}))}}let S=I(()=>[{title:t(`common.name`),key:`name`,width:160,ellipsis:{tooltip:!0},sorter:(e,t)=>e.name.localeCompare(t.name)},{title:`Image`,key:`image`,width:180,ellipsis:{tooltip:!0},sorter:(e,t)=>e.image.localeCompare(t.image)},{title:`Status`,key:`state`,width:130,sorter:(e,t)=>d(e)-d(t),render:e=>n(xe,{type:c(e.state),size:`small`},{default:()=>e.status})},{title:`CPU`,key:`cpu`,width:70,sorter:(e,t)=>p(e,e=>e.cpuPercent)-p(t,e=>e.cpuPercent),render:e=>e.hasStats?`${e.stats.cpuPercent.toFixed(1)}%`:`—`},{title:`RAM`,key:`ram`,width:150,sorter:(e,t)=>p(e,e=>e.memUsageBytes)-p(t,e=>e.memUsageBytes),render:e=>e.hasStats?`${Z(e.stats.memUsageBytes)} / ${Z(e.stats.memLimitBytes)}`:`—`},{title:`Network`,key:`net`,width:140,sorter:(e,t)=>p(e,e=>e.netRxBytes+e.netTxBytes)-p(t,e=>e.netRxBytes+e.netTxBytes),render:e=>e.hasStats?`↓ ${Z(e.stats.netRxBytes)} ↑ ${Z(e.stats.netTxBytes)}`:`—`},{title:`Ports`,key:`ports`,width:220,ellipsis:{tooltip:!0}},{title:t(`common.actions`),key:`actions`,width:220,render:e=>n(Te,{size:`small`},()=>[e.state===`running`?[n(E,{size:`tiny`,onClick:()=>x(e.id,`stop`)},()=>`Stop`),n(E,{size:`tiny`,onClick:()=>x(e.id,`restart`)},()=>`Restart`)]:n(E,{size:`tiny`,type:`primary`,onClick:()=>x(e.id,`start`)},()=>`Start`),n(Ee,{onPositiveClick:()=>x(e.id,`remove`)},{trigger:()=>n(E,{size:`tiny`,type:`error`,ghost:!0},()=>t(`common.delete`)),default:()=>t(`docker.confirmDeleteContainer`,{name:e.name})})])}]),C=N([]),T=N(!0),O=N(null);async function te(){T.value=!0;try{let e=await X.images();C.value=e.images,O.value=null}catch(e){i(e)&&(O.value=e.body)}finally{T.value=!1}}async function j(e){try{let t=await X.removeImage(e);C.value=t.images}catch(e){s(e,t(`docker.removeImageFailed`))}}let M=I(()=>[{title:`Tag`,key:`tag`,minWidth:200,ellipsis:{tooltip:!0},sorter:(e,t)=>e.tag.localeCompare(t.tag),render:e=>e.dangling?n(Te,{size:`small`,align:`center`},()=>[e.tag,n(xe,{size:`small`,type:`warning`},()=>`dangling`)]):e.tag},{title:t(`common.size`),key:`sizeBytes`,width:110,sorter:(e,t)=>e.sizeBytes-t.sizeBytes,render:e=>Z(e.sizeBytes)},{title:t(`docker.usedColumn`),key:`containers`,width:140,sorter:(e,t)=>e.containers-t.containers,render:e=>e.containers<0?`—`:e.containers===0?t(`docker.notUsed`):t(`docker.containerCount`,{count:e.containers})},{title:t(`docker.created`),key:`created`,width:150,sorter:(e,t)=>Date.parse(e.created)-Date.parse(t.created),render:e=>De(e.created)},{title:t(`common.actions`),key:`actions`,width:100,render:e=>n(Ee,{onPositiveClick:()=>j(e.id)},{trigger:()=>n(E,{size:`tiny`,type:`error`,ghost:!0},()=>t(`common.delete`)),default:()=>t(`docker.confirmDeleteImage`,{tag:e.tag})})}]),P=N([]),re=N(!0),F=N(null);async function ie(){re.value=!0;try{let e=await X.volumes();P.value=e.volumes,F.value=null}catch(e){i(e)&&(F.value=e.body)}finally{re.value=!1}}async function L(e){try{let t=await X.removeVolume(e);P.value=t.volumes}catch(e){s(e,t(`docker.removeVolumeFailed`))}}let R=I(()=>[{title:t(`common.name`),key:`name`,minWidth:180,ellipsis:{tooltip:!0},sorter:(e,t)=>e.name.localeCompare(t.name)},{title:`Driver`,key:`driver`,width:100,sorter:(e,t)=>e.driver.localeCompare(t.driver)},{title:t(`common.size`),key:`sizeBytes`,width:110,sorter:(e,t)=>e.sizeBytes-t.sizeBytes,render:e=>e.sizeBytes<0?t(`docker.unknown`):Z(e.sizeBytes)},{title:`Status`,key:`inUse`,width:120,sorter:(e,t)=>Number(e.inUse)-Number(t.inUse),render:e=>n(xe,{size:`small`,type:e.inUse?`success`:`default`},()=>e.inUse?t(`docker.used`):t(`docker.notUsed`))},{title:t(`common.actions`),key:`actions`,width:100,render:e=>n(Ee,{onPositiveClick:()=>L(e.name)},{trigger:()=>n(E,{size:`tiny`,type:`error`,ghost:!0},()=>t(`common.delete`)),default:()=>t(`docker.confirmDeleteVolume`,{name:e.name})})}]),z=N([]),B=N(!0),V=N(null);async function se(){B.value=!0;try{let e=await X.networks();z.value=e.networks,V.value=null}catch(e){i(e)&&(V.value=e.body)}finally{B.value=!1}}async function ce(e){try{let t=await X.removeNetwork(e);z.value=t.networks}catch(e){s(e,t(`docker.removeNetworkFailed`))}}let le=I(()=>[{title:t(`common.name`),key:`name`,minWidth:160,ellipsis:{tooltip:!0},sorter:(e,t)=>e.name.localeCompare(t.name),render:e=>e.builtin?n(Te,{size:`small`,align:`center`},()=>[e.name,n(xe,{size:`small`},()=>`builtin`)]):e.name},{title:`Driver`,key:`driver`,width:100,sorter:(e,t)=>e.driver.localeCompare(t.driver)},{title:`Subnet`,key:`subnet`,width:150,sorter:(e,t)=>e.subnet.localeCompare(t.subnet),render:e=>e.subnet||`—`},{title:t(`docker.connectedContainers`),key:`connectedCount`,width:170,sorter:(e,t)=>e.connectedCount-t.connectedCount},{title:t(`common.actions`),key:`actions`,width:100,render:e=>e.builtin?null:n(Ee,{onPositiveClick:()=>ce(e.id)},{trigger:()=>n(E,{size:`tiny`,type:`error`,ghost:!0},()=>t(`common.delete`)),default:()=>t(`docker.confirmDeleteNetwork`,{name:e.name})})}]),U=N(null),W=N(!0),G=N(null),ue=N(null);async function de(){W.value=!0;try{U.value=await X.settings(),G.value=null}catch(e){i(e)&&(G.value=e.body)}finally{W.value=!1}}async function fe(e){ue.value=e;try{U.value=await X.prune(e),r.success(t(`docker.cleanupDone`))}catch(n){s(n,t(`docker.cleanupFailed`,{kind:e}))}finally{ue.value=null}}let K=N(`containers`),J=new Set([`containers`]);return ae(K,e=>{J.has(e)||(J.add(e),e===`images`?te():e===`volumes`?ie():e===`networks`?se():e===`settings`&&de())}),ee(()=>{b(),y=setInterval(b,5e3)}),w(()=>{y&&clearInterval(y)}),(e,n)=>(_(),m(pe,null,{default:H(()=>[f(D(st),{type:`line`,value:K.value,"onUpdate:value":n[0]||=e=>K.value=e},{default:H(()=>[f(D($),{name:`containers`,tab:`Containers`},{default:H(()=>[v.value?(_(),m(D(Y),{key:0,type:`warning`,title:v.value.error},null,8,[`title`])):(_(),m(D(he),{key:1,columns:S.value,data:h.value,loading:g.value,"row-key":e=>e.id,"scroll-x":1200},null,8,[`columns`,`data`,`loading`,`row-key`]))]),_:1}),f(D($),{name:`images`,tab:`Images`},{default:H(()=>[O.value?(_(),m(D(Y),{key:0,type:`warning`,title:O.value.error},null,8,[`title`])):(_(),m(D(he),{key:1,columns:M.value,data:C.value,loading:T.value,"row-key":e=>e.id,"scroll-x":700},null,8,[`columns`,`data`,`loading`,`row-key`]))]),_:1}),f(D($),{name:`volumes`,tab:`Volumes`},{default:H(()=>[F.value?(_(),m(D(Y),{key:0,type:`warning`,title:F.value.error},null,8,[`title`])):(_(),m(D(he),{key:1,columns:R.value,data:P.value,loading:re.value,"row-key":e=>e.name,"scroll-x":610},null,8,[`columns`,`data`,`loading`,`row-key`]))]),_:1}),f(D($),{name:`networks`,tab:`Networks`},{default:H(()=>[V.value?(_(),m(D(Y),{key:0,type:`warning`,title:V.value.error},null,8,[`title`])):(_(),m(D(he),{key:1,columns:le.value,data:z.value,loading:B.value,"row-key":e=>e.id,"scroll-x":680},null,8,[`columns`,`data`,`loading`,`row-key`]))]),_:1}),f(D($),{name:`settings`,tab:`Settings`},{default:H(()=>[G.value?(_(),m(D(Y),{key:0,type:`warning`,title:G.value.error},null,8,[`title`])):W.value&&!U.value?(_(),o(`div`,ft,[f(D(me),{size:`large`})])):U.value?(_(),m(D(Te),{key:3,vertical:``,size:24},{default:H(()=>[f(D(Qe),{title:D(t)(`docker.daemonInfo`),column:2,bordered:``,"label-placement":`left`},{default:H(()=>[f(D(Q),{label:D(t)(`docker.serverVersion`)},{default:H(()=>[u(k(U.value?.info.serverVersion),1)]),_:1},8,[`label`]),f(D(Q),{label:`OS / Kernel`},{default:H(()=>[u(k(U.value?.info.operatingSystem)+` / `+k(U.value?.info.kernelVersion),1)]),_:1}),f(D(Q),{label:`Storage Driver`},{default:H(()=>[u(k(U.value?.info.storageDriver),1)]),_:1}),f(D(Q),{label:`Root Dir`},{default:H(()=>[u(k(U.value?.info.dockerRootDir),1)]),_:1}),f(D(Q),{label:`Container`},{default:H(()=>[u(k(U.value?.info.containersRunning)+` running, `+k(U.value?.info.containersPaused)+` paused, `+k(U.value?.info.containersStopped)+` stopped `,1)]),_:1}),f(D(Q),{label:`Images`},{default:H(()=>[u(k(U.value?.info.images),1)]),_:1})]),_:1},8,[`title`]),f(D(Qe),{title:`Disk Usage`,column:2,bordered:``,"label-placement":`left`},{default:H(()=>[f(D(Q),{label:`Images`},{default:H(()=>[u(k(D(Z)(U.value?.diskUsage.imagesTotalBytes??0))+` (reclaimable `+k(D(Z)(U.value?.diskUsage.imagesReclaimableBytes??0))+`) `,1)]),_:1}),f(D(Q),{label:`Containers`},{default:H(()=>[u(k(D(Z)(U.value?.diskUsage.containersTotalBytes??0)),1)]),_:1}),f(D(Q),{label:`Volumes`},{default:H(()=>[u(k(D(Z)(U.value?.diskUsage.volumesTotalBytes??0))+` (reclaimable `+k(D(Z)(U.value?.diskUsage.volumesReclaimableBytes??0))+`) `,1)]),_:1})]),_:1}),f(D(Te),null,{default:H(()=>[(_(),o(a,null,ne([`containers`,`images`,`volumes`,`networks`,`all`],e=>f(D(Ee),{key:e,onPositiveClick:t=>fe(e)},{trigger:H(()=>[f(D(E),{size:`small`,loading:ue.value===e},{default:H(()=>[u(k(D(t)(`docker.cleanup`))+` `+k(e),1)]),_:2},1032,[`loading`])]),default:H(()=>[u(` `+k(D(t)(`docker.confirmCleanup`,{kind:e})),1)]),_:2},1032,[`onPositiveClick`])),64))]),_:1})]),_:1})):(_(),m(D(q),{key:2,description:D(t)(`docker.noData`)},null,8,[`description`]))]),_:1})]),_:1},8,[`value`])]),_:1}))}}),[[`__scopeId`,`data-v-f59f7e6d`]]);export{pt as default};