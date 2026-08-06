import{$n as e,An as t,Cn as n,Dt as r,E as i,En as a,Et as o,Fn as s,Ft as c,Gn as l,Hn as u,I as d,In as f,Kn as p,Nn as m,Nt as h,On as g,P as _,Pn as v,Qn as y,Rt as b,Vn as x,Wn as S,Wt as C,Xn as w,Yt as ee,Zn as te,Zt as T,_t as ne,an as E,bn as re,c as D,cn as ie,d as O,fr as k,gn as A,in as j,jn as M,kn as N,kt as P,ln as ae,lr as F,mn as oe,mt as I,nn as L,o as R,on as se,or as z,rr as B,sn as V,st as H,tn as U,ut as W,vt as ce,wn as G}from"./auth-DkWBYjip.js";import{C as le,S as K,g as q,h as ue,t as de,u as fe}from"./AppShell-Caq-HVsG.js";import{r as pe,t as J}from"./DataTable-CnoswyGx.js";import{p as me}from"./createLucideIcon-DyEI0UjO.js";import{o as he}from"./get-ZXo8anbV.js";import{C as ge,S as _e}from"./light-f70v_CaB.js";import{t as ve}from"./get-slot-6kXJmSMP.js";import{t as ye}from"./Add-BOpzO3YN.js";import{t as be}from"./Tag-DhTkI_pc.js";import{t as Y}from"./Alert-zdz8XMSF.js";import{n as xe,r as Se}from"./light-DSJ0F8F_.js";import{t as Ce}from"./use-message-DcDiSLdC.js";import{t as X}from"./Space-CirmwW8h.js";import{t as we}from"./Popconfirm-CQKdORK4.js";import{t as Z}from"./docker-Bl-1G0Hy.js";import{n as Te,t as Q}from"./format-BxLcbkc3.js";var Ee=ue(`.v-x-scroll`,{overflow:`auto`,scrollbarWidth:`none`},[ue(`&::-webkit-scrollbar`,{width:0,height:0})]),De=M({name:`XScroll`,props:{disabled:Boolean,onScroll:Function},setup(){let e=B(null);function t(e){!(e.currentTarget.offsetWidth<e.currentTarget.scrollWidth)||e.deltaY===0||(e.currentTarget.scrollLeft+=e.deltaY+e.deltaX,e.preventDefault())}let n=c();return Ee.mount({id:`vueuc/x-scroll`,head:!0,anchorMetaName:q,ssr:n}),Object.assign({selfRef:e,handleWheel:t},{scrollTo(...t){var n;(n=e.value)==null||n.scrollTo(...t)}})},render(){return m(`div`,{ref:`selfRef`,onScroll:this.onScroll,onWheel:this.disabled?void 0:this.handleWheel,class:`v-x-scroll`},this.$slots)}});function Oe(e,t=`default`,n=[]){let{children:r}=e;if(typeof r==`object`&&r&&!Array.isArray(r)){let e=r[t];if(typeof e==`function`)return e()}return n}var ke=/\s/;function Ae(e){for(var t=e.length;t--&&ke.test(e.charAt(t)););return t}var je=/^\s+/;function Me(e){return e&&e.slice(0,Ae(e)+1).replace(je,``)}var Ne=NaN,Pe=/^[-+]0x[0-9a-f]+$/i,Fe=/^0b[01]+$/i,Ie=/^0o[0-7]+$/i,Le=parseInt;function Re(e){if(typeof e==`number`)return e;if(W(e))return Ne;if(H(e)){var t=typeof e.valueOf==`function`?e.valueOf():e;e=H(t)?t+``:t}if(typeof e!=`string`)return e===0?e:+e;e=Me(e);var n=Fe.test(e);return n||Ie.test(e)?Le(e.slice(2),n?2:8):Pe.test(e)?Ne:+e}var ze=function(){return I.Date.now()},Be=`Expected a function`,Ve=Math.max,He=Math.min;function Ue(e,t,n){var r,i,a,o,s,c,l=0,u=!1,d=!1,f=!0;if(typeof e!=`function`)throw TypeError(Be);t=Re(t)||0,H(n)&&(u=!!n.leading,d=`maxWait`in n,a=d?Ve(Re(n.maxWait)||0,t):a,f=`trailing`in n?!!n.trailing:f);function p(t){var n=r,a=i;return r=i=void 0,l=t,o=e.apply(a,n),o}function m(e){return l=e,s=setTimeout(_,t),u?p(e):o}function h(e){var n=e-c,r=e-l,i=t-n;return d?He(i,a-r):i}function g(e){var n=e-c,r=e-l;return c===void 0||n>=t||n<0||d&&r>=a}function _(){var e=ze();if(g(e))return v(e);s=setTimeout(_,h(e))}function v(e){return s=void 0,f&&r?p(e):(r=i=void 0,o)}function y(){s!==void 0&&clearTimeout(s),l=0,r=c=i=s=void 0}function b(){return s===void 0?o:v(ze())}function x(){var e=ze(),n=g(e);if(r=arguments,i=this,c=e,n){if(s===void 0)return m(c);if(d)return clearTimeout(s),s=setTimeout(_,t),p(c)}return s===void 0&&(s=setTimeout(_,t)),o}return x.cancel=y,x.flush=b,x}var We=`Expected a function`;function Ge(e,t,n){var r=!0,i=!0;if(typeof e!=`function`)throw TypeError(We);return H(n)&&(r=`leading`in n?!!n.leading:r,i=`trailing`in n?!!n.trailing:i),Ue(e,t,{leading:r,maxWait:t,trailing:i})}var Ke=U([L(`descriptions`,{fontSize:`var(--n-font-size)`},[L(`descriptions-separator`,`
 display: inline-block;
 margin: 0 8px 0 2px;
 `),L(`descriptions-table-wrapper`,[L(`descriptions-table`,[L(`descriptions-table-row`,[L(`descriptions-table-header`,{padding:`var(--n-th-padding)`}),L(`descriptions-table-content`,{padding:`var(--n-td-padding)`})])])]),se(`bordered`,[L(`descriptions-table-wrapper`,[L(`descriptions-table`,[L(`descriptions-table-row`,[U(`&:last-child`,[L(`descriptions-table-content`,{paddingBottom:0})])])])])]),E(`left-label-placement`,[L(`descriptions-table-content`,[U(`> *`,{verticalAlign:`top`})])]),E(`left-label-align`,[U(`th`,{textAlign:`left`})]),E(`center-label-align`,[U(`th`,{textAlign:`center`})]),E(`right-label-align`,[U(`th`,{textAlign:`right`})]),E(`bordered`,[L(`descriptions-table-wrapper`,`
 border-radius: var(--n-border-radius);
 overflow: hidden;
 background: var(--n-merged-td-color);
 border: 1px solid var(--n-merged-border-color);
 `,[L(`descriptions-table`,[L(`descriptions-table-row`,[U(`&:not(:last-child)`,[L(`descriptions-table-content`,{borderBottom:`1px solid var(--n-merged-border-color)`}),L(`descriptions-table-header`,{borderBottom:`1px solid var(--n-merged-border-color)`})]),L(`descriptions-table-header`,`
 font-weight: 400;
 background-clip: padding-box;
 background-color: var(--n-merged-th-color);
 `,[U(`&:not(:last-child)`,{borderRight:`1px solid var(--n-merged-border-color)`})]),L(`descriptions-table-content`,[U(`&:not(:last-child)`,{borderRight:`1px solid var(--n-merged-border-color)`})])])])])]),L(`descriptions-header`,`
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
 `,[j(`content`,`
 transition: color .3s var(--n-bezier);
 display: inline-block;
 color: var(--n-td-text-color);
 `)]),j(`label`,`
 font-weight: var(--n-th-font-weight);
 transition: color .3s var(--n-bezier);
 display: inline-block;
 margin-right: 14px;
 color: var(--n-th-text-color);
 `)])])])]),L(`descriptions-table-wrapper`,`
 --n-merged-th-color: var(--n-th-color);
 --n-merged-td-color: var(--n-td-color);
 --n-merged-border-color: var(--n-border-color);
 `),ie(L(`descriptions-table-wrapper`,`
 --n-merged-th-color: var(--n-th-color-modal);
 --n-merged-td-color: var(--n-td-color-modal);
 --n-merged-border-color: var(--n-border-color-modal);
 `)),ae(L(`descriptions-table-wrapper`,`
 --n-merged-th-color: var(--n-th-color-popover);
 --n-merged-td-color: var(--n-td-color-popover);
 --n-merged-border-color: var(--n-border-color-popover);
 `))]),qe=`DESCRIPTION_ITEM_FLAG`;function Je(e){return typeof e==`object`&&e&&!Array.isArray(e)?e.type&&e.type.DESCRIPTION_ITEM_FLAG:!1}var Ye=Object.assign(Object.assign({},d.props),{title:String,column:{type:Number,default:3},columns:Number,labelPlacement:{type:String,default:`top`},labelAlign:{type:String,default:`left`},separator:{type:String,default:`:`},size:String,bordered:Boolean,labelClass:String,labelStyle:[Object,String],contentClass:String,contentStyle:[Object,String]}),Xe=M({name:`Descriptions`,props:Ye,slots:Object,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n,mergedComponentPropsRef:r}=ce(e),i=G(()=>e.size||r?.value?.Descriptions?.size||`medium`),a=d(`Descriptions`,`-descriptions`,Ke,Se,e,t),o=G(()=>{let{bordered:t}=e,n=i.value,{common:{cubicBezierEaseInOut:r},self:{titleTextColor:o,thColor:s,thColorModal:c,thColorPopover:l,thTextColor:u,thFontWeight:d,tdTextColor:f,tdColor:p,tdColorModal:m,tdColorPopover:h,borderColor:g,borderColorModal:_,borderColorPopover:v,borderRadius:y,lineHeight:b,[V(`fontSize`,n)]:x,[V(t?`thPaddingBordered`:`thPadding`,n)]:S,[V(t?`tdPaddingBordered`:`tdPadding`,n)]:C}}=a.value;return{"--n-title-text-color":o,"--n-th-padding":S,"--n-td-padding":C,"--n-font-size":x,"--n-bezier":r,"--n-th-font-weight":d,"--n-line-height":b,"--n-th-text-color":u,"--n-td-text-color":f,"--n-th-color":s,"--n-th-color-modal":c,"--n-th-color-popover":l,"--n-td-color":p,"--n-td-color-modal":m,"--n-td-color-popover":h,"--n-border-radius":y,"--n-border-color":g,"--n-border-color-modal":_,"--n-border-color-popover":v}}),s=n?ne(`descriptions`,G(()=>{let t=``,{bordered:n}=e;return n&&(t+=`a`),t+=i.value[0],t}),o,e):void 0;return{mergedClsPrefix:t,cssVars:n?void 0:o,themeClass:s?.themeClass,onRender:s?.onRender,compitableColumn:K(e,[`columns`,`column`]),inlineThemeDisabled:n,mergedSize:i}},render(){let e=this.$slots.default,t=e?me(e()):[];t.length;let{contentClass:n,labelClass:r,compitableColumn:i,labelPlacement:a,labelAlign:o,mergedSize:s,bordered:c,title:l,cssVars:u,mergedClsPrefix:d,separator:f,onRender:p}=this;p?.();let h=t.filter(e=>Je(e)),g=h.reduce((e,t,o)=>{let s=t.props||{},l=h.length-1===o,u=[`label`in s?s.label:Oe(t,`label`)],p=[Oe(t)],g=s.span||1,_=e.span;e.span+=g;let v=s.labelStyle||s[`label-style`]||this.labelStyle,y=s.contentStyle||s[`content-style`]||this.contentStyle;if(a===`left`)c?e.row.push(m(`th`,{class:[`${d}-descriptions-table-header`,r],colspan:1,style:v},u),m(`td`,{class:[`${d}-descriptions-table-content`,n],colspan:l?(i-_)*2+1:g*2-1,style:y},p)):e.row.push(m(`td`,{class:`${d}-descriptions-table-content`,colspan:l?(i-_)*2:g*2},m(`span`,{class:[`${d}-descriptions-table-content__label`,r],style:v},[...u,f&&m(`span`,{class:`${d}-descriptions-separator`},f)]),m(`span`,{class:[`${d}-descriptions-table-content__content`,n],style:y},p)));else{let t=l?(i-_)*2:g*2;e.row.push(m(`th`,{class:[`${d}-descriptions-table-header`,r],colspan:t,style:v},u)),e.secondRow.push(m(`td`,{class:[`${d}-descriptions-table-content`,n],colspan:t,style:y},p))}return(e.span>=i||l)&&(e.span=0,e.row.length&&(e.rows.push(e.row),e.row=[]),a!==`left`&&e.secondRow.length&&(e.rows.push(e.secondRow),e.secondRow=[])),e},{span:0,row:[],secondRow:[],rows:[]}).rows.map(e=>m(`tr`,{class:`${d}-descriptions-table-row`},e));return m(`div`,{style:u,class:[`${d}-descriptions`,this.themeClass,`${d}-descriptions--${a}-label-placement`,`${d}-descriptions--${o}-label-align`,`${d}-descriptions--${s}-size`,c&&`${d}-descriptions--bordered`]},l||this.$slots.header?m(`div`,{class:`${d}-descriptions-header`},l||ve(this,`header`)):null,m(`div`,{class:`${d}-descriptions-table-wrapper`},m(`table`,{class:`${d}-descriptions-table`},m(`tbody`,null,a===`top`&&m(`tr`,{class:`${d}-descriptions-table-row`,style:{visibility:`collapse`}},C(i*2,m(`td`,null))),g))))}}),Ze={label:String,span:{type:Number,default:1},labelClass:String,labelStyle:[Object,String],contentClass:String,contentStyle:[Object,String]},$=M({name:`DescriptionsItem`,[qe]:!0,props:Ze,slots:Object,render(){return null}}),Qe=b(`n-tabs`),$e={tab:[String,Number,Object,Function],name:{type:[String,Number],required:!0},disabled:Boolean,displayDirective:{type:String,default:`if`},closable:{type:Boolean,default:void 0},tabProps:Object,label:[String,Number,Object,Function]},et=M({__TAB_PANE__:!0,name:`TabPane`,alias:[`TabPanel`],props:$e,slots:Object,setup(e){let t=v(Qe,null);return t||P(`tab-pane`,"`n-tab-pane` must be placed inside `n-tabs`."),{style:t.paneStyleRef,class:t.paneClassRef,mergedClsPrefix:t.mergedClsPrefixRef}},render(){return m(`div`,{class:[`${this.mergedClsPrefix}-tab-pane`,this.class],style:this.style},this.$slots)}}),tt=Object.assign({internalLeftPadded:Boolean,internalAddable:Boolean,internalCreatedByPane:Boolean},ge($e,[`displayDirective`])),nt=M({__TAB__:!0,inheritAttrs:!1,name:`Tab`,props:tt,setup(e){let{mergedClsPrefixRef:t,valueRef:n,typeRef:r,closableRef:i,tabStyleRef:a,addTabStyleRef:o,tabClassRef:s,addTabClassRef:c,tabChangeIdRef:l,onBeforeLeaveRef:u,triggerRef:d,handleAdd:f,activateTab:p,handleClose:m}=v(Qe);return{trigger:d,mergedClosable:G(()=>{if(e.internalAddable)return!1;let{closable:t}=e;return t===void 0?i.value:t}),style:a,addStyle:o,tabClass:s,addTabClass:c,clsPrefix:t,value:n,type:r,handleClose(t){t.stopPropagation(),!e.disabled&&m(e.name)},activateTab(){if(e.disabled)return;if(e.internalAddable){f();return}let{name:t}=e,r=++l.id;if(t!==n.value){let{value:i}=u;i?Promise.resolve(i(e.name,n.value)).then(e=>{e&&l.id===r&&p(t)}):p(t)}}}},render(){let{internalAddable:e,clsPrefix:t,name:n,disabled:r,label:a,tab:o,value:c,mergedClosable:l,trigger:u,$slots:{default:d}}=this,f=a??o;return m(`div`,{class:`${t}-tabs-tab-wrapper`},this.internalLeftPadded?m(`div`,{class:`${t}-tabs-tab-pad`}):null,m(`div`,Object.assign({key:n,"data-name":n,"data-disabled":r?!0:void 0},s({class:[`${t}-tabs-tab`,c===n&&`${t}-tabs-tab--active`,r&&`${t}-tabs-tab--disabled`,l&&`${t}-tabs-tab--closable`,e&&`${t}-tabs-tab--addable`,e?this.addTabClass:this.tabClass],onClick:u===`click`?this.activateTab:void 0,onMouseenter:u===`hover`?this.activateTab:void 0,style:e?this.addStyle:this.style},this.internalCreatedByPane?this.tabProps||{}:this.$attrs)),m(`span`,{class:`${t}-tabs-tab__label`},e?m(re,null,m(`div`,{class:`${t}-tabs-tab__height-placeholder`},`\xA0`),m(_,{clsPrefix:t},{default:()=>m(ye,null)})):d?d():typeof f==`object`?f:_e(f??n)),l&&this.type===`card`?m(i,{clsPrefix:t,class:`${t}-tabs-tab__close`,onClick:this.handleClose,disabled:r}):null))}}),rt=L(`tabs`,`
 box-sizing: border-box;
 width: 100%;
 display: flex;
 flex-direction: column;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
`,[E(`segment-type`,[L(`tabs-rail`,[U(`&.transition-disabled`,[L(`tabs-capsule`,`
 transition: none;
 `)])])]),E(`top`,[L(`tab-pane`,`
 padding: var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left);
 `)]),E(`left`,[L(`tab-pane`,`
 padding: var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left) var(--n-pane-padding-top);
 `)]),E(`left, right`,`
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
 `)]),E(`right`,`
 flex-direction: row-reverse;
 `,[L(`tab-pane`,`
 padding: var(--n-pane-padding-left) var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom);
 `),L(`tabs-bar`,`
 left: 0;
 `)]),E(`bottom`,`
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
 `,[E(`active`,`
 font-weight: var(--n-font-weight-strong);
 color: var(--n-tab-text-color-active);
 `),U(`&:hover`,`
 color: var(--n-tab-text-color-hover);
 `)])])]),E(`flex`,[L(`tabs-nav`,`
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
 `,[j(`prefix, suffix`,`
 display: flex;
 align-items: center;
 `),j(`prefix`,`padding-right: 16px;`),j(`suffix`,`padding-left: 16px;`)]),E(`top, bottom`,[U(`>`,[L(`tabs-nav`,[L(`tabs-nav-scroll-wrapper`,[U(`&::before`,`
 top: 0;
 bottom: 0;
 left: 0;
 width: 20px;
 `),U(`&::after`,`
 top: 0;
 bottom: 0;
 right: 0;
 width: 20px;
 `),E(`shadow-start`,[U(`&::before`,`
 box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, .12);
 `)]),E(`shadow-end`,[U(`&::after`,`
 box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),E(`left, right`,[L(`tabs-nav-scroll-content`,`
 flex-direction: column;
 `),U(`>`,[L(`tabs-nav`,[L(`tabs-nav-scroll-wrapper`,[U(`&::before`,`
 top: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),U(`&::after`,`
 bottom: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),E(`shadow-start`,[U(`&::before`,`
 box-shadow: inset 0 10px 8px -8px rgba(0, 0, 0, .12);
 `)]),E(`shadow-end`,[U(`&::after`,`
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
 `,[U(`&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb`,`
 width: 0;
 height: 0;
 display: none;
 `)]),U(`&::before, &::after`,`
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
 `,[E(`disabled`,{cursor:`not-allowed`}),j(`close`,`
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),j(`label`,`
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
 `,[U(`&.transition-disabled`,`
 transition: none;
 `),E(`disabled`,`
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
 `,[U(`&.next-transition-leave-active, &.prev-transition-leave-active, &.next-transition-enter-active, &.prev-transition-enter-active`,`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 transform .2s var(--n-bezier),
 opacity .2s var(--n-bezier);
 `),U(`&.next-transition-leave-active, &.prev-transition-leave-active`,`
 position: absolute;
 `),U(`&.next-transition-enter-from, &.prev-transition-leave-to`,`
 transform: translateX(32px);
 opacity: 0;
 `),U(`&.next-transition-leave-to, &.prev-transition-enter-from`,`
 transform: translateX(-32px);
 opacity: 0;
 `),U(`&.next-transition-leave-from, &.next-transition-enter-to, &.prev-transition-leave-from, &.prev-transition-enter-to`,`
 transform: translateX(0);
 opacity: 1;
 `)]),L(`tabs-tab-pad`,`
 box-sizing: border-box;
 width: var(--n-tab-gap);
 flex-grow: 0;
 flex-shrink: 0;
 `),E(`line-type, bar-type`,[L(`tabs-tab`,`
 font-weight: var(--n-tab-font-weight);
 box-sizing: border-box;
 vertical-align: bottom;
 `,[U(`&:hover`,{color:`var(--n-tab-text-color-hover)`}),E(`active`,`
 color: var(--n-tab-text-color-active);
 font-weight: var(--n-tab-font-weight-active);
 `),E(`disabled`,{color:`var(--n-tab-text-color-disabled)`})])]),L(`tabs-nav`,[E(`line-type`,[E(`top`,[j(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),L(`tabs-nav-scroll-content`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),L(`tabs-bar`,`
 bottom: -1px;
 `)]),E(`left`,[j(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),L(`tabs-nav-scroll-content`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),L(`tabs-bar`,`
 right: -1px;
 `)]),E(`right`,[j(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),L(`tabs-nav-scroll-content`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),L(`tabs-bar`,`
 left: -1px;
 `)]),E(`bottom`,[j(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),L(`tabs-nav-scroll-content`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),L(`tabs-bar`,`
 top: -1px;
 `)]),j(`prefix, suffix`,`
 transition: border-color .3s var(--n-bezier);
 `),L(`tabs-nav-scroll-content`,`
 transition: border-color .3s var(--n-bezier);
 `),L(`tabs-bar`,`
 border-radius: 0;
 `)]),E(`card-type`,[j(`prefix, suffix`,`
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
 `,[E(`addable`,`
 padding-left: 8px;
 padding-right: 8px;
 font-size: 16px;
 justify-content: center;
 `,[j(`height-placeholder`,`
 width: 0;
 font-size: var(--n-tab-font-size);
 `),se(`disabled`,[U(`&:hover`,`
 color: var(--n-tab-text-color-hover);
 `)])]),E(`closable`,`padding-right: 8px;`),E(`active`,`
 background-color: #0000;
 font-weight: var(--n-tab-font-weight-active);
 color: var(--n-tab-text-color-active);
 `),E(`disabled`,`color: var(--n-tab-text-color-disabled);`)])]),E(`left, right`,`
 flex-direction: column; 
 `,[j(`prefix, suffix`,`
 padding: var(--n-tab-padding-vertical);
 `),L(`tabs-wrapper`,`
 flex-direction: column;
 `),L(`tabs-tab-wrapper`,`
 flex-direction: column;
 `,[L(`tabs-tab-pad`,`
 height: var(--n-tab-gap-vertical);
 width: 100%;
 `)])]),E(`top`,[E(`card-type`,[L(`tabs-scroll-padding`,`border-bottom: 1px solid var(--n-tab-border-color);`),j(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),L(`tabs-tab`,`
 border-top-left-radius: var(--n-tab-border-radius);
 border-top-right-radius: var(--n-tab-border-radius);
 `,[E(`active`,`
 border-bottom: 1px solid #0000;
 `)]),L(`tabs-tab-pad`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),L(`tabs-pad`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `)])]),E(`left`,[E(`card-type`,[L(`tabs-scroll-padding`,`border-right: 1px solid var(--n-tab-border-color);`),j(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),L(`tabs-tab`,`
 border-top-left-radius: var(--n-tab-border-radius);
 border-bottom-left-radius: var(--n-tab-border-radius);
 `,[E(`active`,`
 border-right: 1px solid #0000;
 `)]),L(`tabs-tab-pad`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),L(`tabs-pad`,`
 border-right: 1px solid var(--n-tab-border-color);
 `)])]),E(`right`,[E(`card-type`,[L(`tabs-scroll-padding`,`border-left: 1px solid var(--n-tab-border-color);`),j(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),L(`tabs-tab`,`
 border-top-right-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[E(`active`,`
 border-left: 1px solid #0000;
 `)]),L(`tabs-tab-pad`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),L(`tabs-pad`,`
 border-left: 1px solid var(--n-tab-border-color);
 `)])]),E(`bottom`,[E(`card-type`,[L(`tabs-scroll-padding`,`border-top: 1px solid var(--n-tab-border-color);`),j(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),L(`tabs-tab`,`
 border-bottom-left-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[E(`active`,`
 border-top: 1px solid #0000;
 `)]),L(`tabs-tab-pad`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),L(`tabs-pad`,`
 border-top: 1px solid var(--n-tab-border-color);
 `)])])])]),it=Ge,at=Object.assign(Object.assign({},d.props),{value:[String,Number],defaultValue:[String,Number],trigger:{type:String,default:`click`},type:{type:String,default:`bar`},closable:Boolean,justifyContent:String,size:String,placement:{type:String,default:`top`},tabStyle:[String,Object],tabClass:String,addTabStyle:[String,Object],addTabClass:String,barWidth:Number,paneClass:String,paneStyle:[String,Object],paneWrapperClass:String,paneWrapperStyle:[String,Object],addable:[Boolean,Object],tabsPadding:{type:Number,default:0},animated:Boolean,onBeforeLeave:Function,onAdd:Function,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onClose:[Function,Array],labelSize:String,activeName:[String,Number],onActiveNameChange:[Function,Array]}),ot=M({name:`Tabs`,props:at,slots:Object,setup(e,{slots:t}){let{mergedClsPrefixRef:n,inlineThemeDisabled:i,mergedComponentPropsRef:a}=ce(e),o=d(`Tabs`,`-tabs`,rt,xe,e,n),s=B(null),c=B(null),u=B(null),p=B(null),m=B(null),h=B(null),g=B(!0),_=B(!0),v=K(e,[`labelSize`,`size`]),y=G(()=>v.value?v.value:a?.value?.Tabs?.size||`medium`),b=K(e,[`activeName`,`value`]),S=B(b.value??e.defaultValue??(t.default?me(t.default())[0]?.props?.name:null)),C=he(b,S),E={id:0},re=G(()=>{if(!(!e.justifyContent||e.type===`card`))return{display:`flex`,justifyContent:e.justifyContent}});w(C,()=>{E.id=0,A(),j()});function D(){let{value:e}=C;return e===null?null:s.value?.querySelector(`[data-name="${e}"]`)}function ie(t){if(e.type===`card`)return;let{value:r}=c;if(!r)return;let i=r.style.opacity===`0`;if(t){let a=`${n.value}-tabs-bar--disabled`,{barWidth:o,placement:s}=e;if(t.dataset.disabled===`true`?r.classList.add(a):r.classList.remove(a),[`top`,`bottom`].includes(s)){if(k([`top`,`maxHeight`,`height`]),typeof o==`number`&&t.offsetWidth>=o){let e=Math.floor((t.offsetWidth-o)/2)+t.offsetLeft;r.style.left=`${e}px`,r.style.maxWidth=`${o}px`}else r.style.left=`${t.offsetLeft}px`,r.style.maxWidth=`${t.offsetWidth}px`;r.style.width=`8192px`,i&&(r.style.transition=`none`),r.offsetWidth,i&&(r.style.transition=``,r.style.opacity=`1`)}else{if(k([`left`,`maxWidth`,`width`]),typeof o==`number`&&t.offsetHeight>=o){let e=Math.floor((t.offsetHeight-o)/2)+t.offsetTop;r.style.top=`${e}px`,r.style.maxHeight=`${o}px`}else r.style.top=`${t.offsetTop}px`,r.style.maxHeight=`${t.offsetHeight}px`;r.style.height=`8192px`,i&&(r.style.transition=`none`),r.offsetHeight,i&&(r.style.transition=``,r.style.opacity=`1`)}}}function O(){if(e.type===`card`)return;let{value:t}=c;t&&(t.style.opacity=`0`)}function k(e){let{value:t}=c;if(t)for(let n of e)t.style[n]=``}function A(){if(e.type===`card`)return;let t=D();t?ie(t):O()}function j(){let e=m.value?.$el;if(!e)return;let t=D();if(!t)return;let{scrollLeft:n,offsetWidth:r}=e,{offsetLeft:i,offsetWidth:a}=t;n>i?e.scrollTo({top:0,left:i,behavior:`smooth`}):i+a>n+r&&e.scrollTo({top:0,left:i+a-r,behavior:`smooth`})}let M=B(null),N=0,P=null;function ae(e){let t=M.value;if(t){N=e.getBoundingClientRect().height;let n=`${N}px`,r=()=>{t.style.height=n,t.style.maxHeight=n};P?(r(),P(),P=null):P=r}}function F(e){let t=M.value;if(t){let n=e.getBoundingClientRect().height,r=()=>{document.body.offsetHeight,t.style.maxHeight=`${n}px`,t.style.height=`${Math.max(N,n)}px`};P?(P(),P=null,r()):P=r}}function oe(){let t=M.value;if(t){t.style.maxHeight=``,t.style.height=``;let{paneWrapperStyle:n}=e;if(typeof n==`string`)t.style.cssText=n;else if(n){let{maxHeight:e,height:r}=n;e!==void 0&&(t.style.maxHeight=e),r!==void 0&&(t.style.height=r)}}}let I={value:[]},L=B(`next`);function R(e){let t=C.value,n=`next`;for(let r of I.value){if(r===t)break;if(r===e){n=`prev`;break}}L.value=n,se(e)}function se(t){let{onActiveNameChange:n,onUpdateValue:i,"onUpdate:value":a}=e;n&&r(n,t),i&&r(i,t),a&&r(a,t),S.value=t}function H(t){let{onClose:n}=e;n&&r(n,t)}let U=!0;function W(){let{value:e}=c;if(!e)return;U||=!1;let t=`transition-disabled`;e.classList.add(t),A(),e.classList.remove(t)}let q=B(null);function ue({transitionDisabled:e}){let t=s.value;if(!t)return;e&&t.classList.add(`transition-disabled`);let n=D();n&&q.value&&(q.value.style.width=`${n.offsetWidth}px`,q.value.style.height=`${n.offsetHeight}px`,q.value.style.transform=`translateX(${n.offsetLeft-ee(getComputedStyle(t).paddingLeft)}px)`,e&&q.value.offsetWidth),e&&t.classList.remove(`transition-disabled`)}w([C],()=>{e.type===`segment`&&f(()=>{ue({transitionDisabled:!1})})}),x(()=>{e.type===`segment`&&ue({transitionDisabled:!0})});let de=0;function fe(t){if(t.contentRect.width===0&&t.contentRect.height===0||de===t.contentRect.width)return;de=t.contentRect.width;let{type:n}=e;if((n===`line`||n===`bar`)&&(U||e.justifyContent?.startsWith(`space`))&&W(),n!==`segment`){let{placement:t}=e;ye((t===`top`||t===`bottom`?m.value?.$el:h.value)||null)}}let pe=it(fe,64);w([()=>e.justifyContent,()=>e.size],()=>{f(()=>{let{type:t}=e;(t===`line`||t===`bar`)&&W()})});let J=B(!1);function ge(t){let{target:n,contentRect:{width:r,height:i}}=t,a=n.parentElement.parentElement.offsetWidth,o=n.parentElement.parentElement.offsetHeight,{placement:s}=e;if(!J.value)s===`top`||s===`bottom`?a<r&&(J.value=!0):o<i&&(J.value=!0);else{let{value:e}=p;if(!e)return;s===`top`||s===`bottom`?a-r>e.$el.offsetWidth&&(J.value=!1):o-i>e.$el.offsetHeight&&(J.value=!1)}ye(m.value?.$el||null)}let _e=it(ge,64);function ve(){let{onAdd:t}=e;t&&t(),f(()=>{let e=D(),{value:t}=m;!e||!t||t.scrollTo({left:e.offsetLeft,top:0,behavior:`smooth`})})}function ye(t){if(!t)return;let{placement:n}=e;if(n===`top`||n===`bottom`){let{scrollLeft:e,scrollWidth:n,offsetWidth:r}=t;g.value=e<=0,_.value=e+r>=n}else{let{scrollTop:e,scrollHeight:n,offsetHeight:r}=t;g.value=e<=0,_.value=e+r>=n}}let be=it(e=>{ye(e.target)},64);l(Qe,{triggerRef:z(e,`trigger`),tabStyleRef:z(e,`tabStyle`),tabClassRef:z(e,`tabClass`),addTabStyleRef:z(e,`addTabStyle`),addTabClassRef:z(e,`addTabClass`),paneClassRef:z(e,`paneClass`),paneStyleRef:z(e,`paneStyle`),mergedClsPrefixRef:n,typeRef:z(e,`type`),closableRef:z(e,`closable`),valueRef:C,tabChangeIdRef:E,onBeforeLeaveRef:z(e,`onBeforeLeave`),activateTab:R,handleClose:H,handleAdd:ve}),le(()=>{A(),j()}),te(()=>{let{value:e}=u;if(!e)return;let{value:t}=n,r=`${t}-tabs-nav-scroll-wrapper--shadow-start`,i=`${t}-tabs-nav-scroll-wrapper--shadow-end`;g.value?e.classList.remove(r):e.classList.add(r),_.value?e.classList.remove(i):e.classList.add(i)});let Y={syncBarPosition:()=>{A()}},Se=()=>{ue({transitionDisabled:!0})},Ce=G(()=>{let{value:t}=y,{type:n}=e,r=`${t}${{card:`Card`,bar:`Bar`,line:`Line`,segment:`Segment`}[n]}`,{self:{barColor:i,closeIconColor:a,closeIconColorHover:s,closeIconColorPressed:c,tabColor:l,tabBorderColor:u,paneTextColor:d,tabFontWeight:f,tabBorderRadius:p,tabFontWeightActive:m,colorSegment:h,fontWeightStrong:g,tabColorSegment:_,closeSize:v,closeIconSize:b,closeColorHover:x,closeColorPressed:S,closeBorderRadius:C,[V(`panePadding`,t)]:w,[V(`tabPadding`,r)]:ee,[V(`tabPaddingVertical`,r)]:te,[V(`tabGap`,r)]:ne,[V(`tabGap`,`${r}Vertical`)]:E,[V(`tabTextColor`,n)]:re,[V(`tabTextColorActive`,n)]:D,[V(`tabTextColorHover`,n)]:ie,[V(`tabTextColorDisabled`,n)]:O,[V(`tabFontSize`,t)]:k},common:{cubicBezierEaseInOut:A}}=o.value;return{"--n-bezier":A,"--n-color-segment":h,"--n-bar-color":i,"--n-tab-font-size":k,"--n-tab-text-color":re,"--n-tab-text-color-active":D,"--n-tab-text-color-disabled":O,"--n-tab-text-color-hover":ie,"--n-pane-text-color":d,"--n-tab-border-color":u,"--n-tab-border-radius":p,"--n-close-size":v,"--n-close-icon-size":b,"--n-close-color-hover":x,"--n-close-color-pressed":S,"--n-close-border-radius":C,"--n-close-icon-color":a,"--n-close-icon-color-hover":s,"--n-close-icon-color-pressed":c,"--n-tab-color":l,"--n-tab-font-weight":f,"--n-tab-font-weight-active":m,"--n-tab-padding":ee,"--n-tab-padding-vertical":te,"--n-tab-gap":ne,"--n-tab-gap-vertical":E,"--n-pane-padding-left":T(w,`left`),"--n-pane-padding-right":T(w,`right`),"--n-pane-padding-top":T(w,`top`),"--n-pane-padding-bottom":T(w,`bottom`),"--n-font-weight-strong":g,"--n-tab-color-segment":_}}),X=i?ne(`tabs`,G(()=>`${y.value[0]}${e.type[0]}`),Ce,e):void 0;return Object.assign({mergedClsPrefix:n,mergedValue:C,renderedNames:new Set,segmentCapsuleElRef:q,tabsPaneWrapperRef:M,tabsElRef:s,barElRef:c,addTabInstRef:p,xScrollInstRef:m,scrollWrapperElRef:u,addTabFixed:J,tabWrapperStyle:re,handleNavResize:pe,mergedSize:y,handleScroll:be,handleTabsResize:_e,cssVars:i?void 0:Ce,themeClass:X?.themeClass,animationDirection:L,renderNameListRef:I,yScrollElRef:h,handleSegmentResize:Se,onAnimationBeforeLeave:ae,onAnimationEnter:F,onAnimationAfterEnter:oe,onRender:X?.onRender},Y)},render(){let{mergedClsPrefix:e,type:t,placement:n,addTabFixed:r,addable:i,mergedSize:a,renderNameListRef:s,onRender:c,paneWrapperClass:l,paneWrapperStyle:u,$slots:{default:d,prefix:f,suffix:p}}=this;c?.();let g=d?me(d()).filter(e=>e.type.__TAB_PANE__===!0):[],_=d?me(d()).filter(e=>e.type.__TAB__===!0):[],v=!_.length,y=t===`card`,b=t===`segment`,x=!y&&!b&&this.justifyContent;s.value=[];let S=()=>{let t=m(`div`,{style:this.tabWrapperStyle,class:`${e}-tabs-wrapper`},x?null:m(`div`,{class:`${e}-tabs-scroll-padding`,style:n===`top`||n===`bottom`?{width:`${this.tabsPadding}px`}:{height:`${this.tabsPadding}px`}}),v?g.map((e,t)=>(s.value.push(e.props.name),ut(m(nt,Object.assign({},e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0&&(!x||x===`center`||x===`start`||x===`end`)}),e.children?{default:e.children.tab}:void 0)))):_.map((e,t)=>(s.value.push(e.props.name),ut(t!==0&&!x?lt(e):e))),!r&&i&&y?ct(i,(v?g.length:_.length)!==0):null,x?null:m(`div`,{class:`${e}-tabs-scroll-padding`,style:{width:`${this.tabsPadding}px`}}));return m(`div`,{ref:`tabsElRef`,class:`${e}-tabs-nav-scroll-content`},y&&i?m(h,{onResize:this.handleTabsResize},{default:()=>t}):t,y?m(`div`,{class:`${e}-tabs-pad`}):null,y?null:m(`div`,{ref:`barElRef`,class:`${e}-tabs-bar`}))},C=b?`top`:n;return m(`div`,{class:[`${e}-tabs`,this.themeClass,`${e}-tabs--${t}-type`,`${e}-tabs--${a}-size`,x&&`${e}-tabs--flex`,`${e}-tabs--${C}`],style:this.cssVars},m(`div`,{class:[`${e}-tabs-nav--${t}-type`,`${e}-tabs-nav--${C}`,`${e}-tabs-nav`]},o(f,t=>t&&m(`div`,{class:`${e}-tabs-nav__prefix`},t)),b?m(h,{onResize:this.handleSegmentResize},{default:()=>m(`div`,{class:`${e}-tabs-rail`,ref:`tabsElRef`},m(`div`,{class:`${e}-tabs-capsule`,ref:`segmentCapsuleElRef`},m(`div`,{class:`${e}-tabs-wrapper`},m(`div`,{class:`${e}-tabs-tab`}))),v?g.map((e,t)=>(s.value.push(e.props.name),m(nt,Object.assign({},e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0}),e.children?{default:e.children.tab}:void 0))):_.map((e,t)=>(s.value.push(e.props.name),t===0?e:lt(e))))}):m(h,{onResize:this.handleNavResize},{default:()=>m(`div`,{class:`${e}-tabs-nav-scroll-wrapper`,ref:`scrollWrapperElRef`},[`top`,`bottom`].includes(C)?m(De,{ref:`xScrollInstRef`,onScroll:this.handleScroll},{default:S}):m(`div`,{class:`${e}-tabs-nav-y-scroll`,onScroll:this.handleScroll,ref:`yScrollElRef`},S()))}),r&&i&&y?ct(i,!0):null,o(p,t=>t&&m(`div`,{class:`${e}-tabs-nav__suffix`},t))),v&&(this.animated&&(C===`top`||C===`bottom`)?m(`div`,{ref:`tabsPaneWrapperRef`,style:u,class:[`${e}-tabs-pane-wrapper`,l]},st(g,this.mergedValue,this.renderedNames,this.onAnimationBeforeLeave,this.onAnimationEnter,this.onAnimationAfterEnter,this.animationDirection)):st(g,this.mergedValue,this.renderedNames)))}});function st(t,n,r,i,a,o,s){let c=[];return t.forEach(t=>{let{name:i,displayDirective:a,"display-directive":o}=t.props,s=e=>a===e||o===e,l=n===i;if(t.key!==void 0&&(t.key=i),l||s(`show`)||s(`show:lazy`)&&r.has(i)){r.has(i)||r.add(i);let n=!s(`if`);c.push(n?e(t,[[A,l]]):t)}}),s?m(oe,{name:`${s}-transition`,onBeforeLeave:i,onEnter:a,onAfterEnter:o},{default:()=>c}):c}function ct(e,t){return m(nt,{ref:`addTabInstRef`,key:`__addable`,name:`__addable`,internalCreatedByPane:!0,internalAddable:!0,internalLeftPadded:t,disabled:typeof e==`object`&&e.disabled})}function lt(e){let t=n(e);return t.props?t.props.internalLeftPadded=!0:t.props={internalLeftPadded:!0},t}function ut(e){return Array.isArray(e.dynamicProps)?e.dynamicProps.includes(`internalLeftPadded`)||e.dynamicProps.push(`internalLeftPadded`):e.dynamicProps=[`internalLeftPadded`],e}var dt={key:1,class:`tab-loading`},ft=R(M({__name:`DockerView`,setup(e){let n=Ce();function r(e){return e instanceof D&&e.status===503&&!!e.body&&typeof e.body==`object`&&`enabled`in e.body}function i(e,t){n.error(e instanceof D?e.message:t)}let o=e=>e===`running`?`success`:e===`paused`||e===`restarting`?`warning`:e===`dead`?`error`:`default`,s={running:0,restarting:1,paused:2,created:3,exited:4,dead:5};function c(e){return s[e.state]??6}function l(e,t){return e.hasStats?t(e.stats):-1}let d=B([]),f=B(!0),h=B(null),_;async function v(){try{let e=await Z.containers();d.value=e.containers,h.value=null}catch(e){r(e)&&(h.value=e.body)}finally{f.value=!1}}async function b(e,t){try{let n=await Z.containerAction(e,t);d.value=n.containers}catch(e){i(e,`Aksi ${t} gagal`)}}let C=[{title:`Nama`,key:`name`,width:160,ellipsis:{tooltip:!0},sorter:(e,t)=>e.name.localeCompare(t.name)},{title:`Image`,key:`image`,width:180,ellipsis:{tooltip:!0},sorter:(e,t)=>e.image.localeCompare(t.image)},{title:`Status`,key:`state`,width:130,sorter:(e,t)=>c(e)-c(t),render:e=>m(be,{type:o(e.state),size:`small`},{default:()=>e.status})},{title:`CPU`,key:`cpu`,width:70,sorter:(e,t)=>l(e,e=>e.cpuPercent)-l(t,e=>e.cpuPercent),render:e=>e.hasStats?`${e.stats.cpuPercent.toFixed(1)}%`:`—`},{title:`RAM`,key:`ram`,width:150,sorter:(e,t)=>l(e,e=>e.memUsageBytes)-l(t,e=>e.memUsageBytes),render:e=>e.hasStats?`${Q(e.stats.memUsageBytes)} / ${Q(e.stats.memLimitBytes)}`:`—`},{title:`Network`,key:`net`,width:140,sorter:(e,t)=>l(e,e=>e.netRxBytes+e.netTxBytes)-l(t,e=>e.netRxBytes+e.netTxBytes),render:e=>e.hasStats?`↓ ${Q(e.stats.netRxBytes)} ↑ ${Q(e.stats.netTxBytes)}`:`—`},{title:`Ports`,key:`ports`,width:220,ellipsis:{tooltip:!0}},{title:`Aksi`,key:`actions`,width:220,render:e=>m(X,{size:`small`},()=>[e.state===`running`?[m(O,{size:`tiny`,onClick:()=>b(e.id,`stop`)},()=>`Stop`),m(O,{size:`tiny`,onClick:()=>b(e.id,`restart`)},()=>`Restart`)]:m(O,{size:`tiny`,type:`primary`,onClick:()=>b(e.id,`start`)},()=>`Start`),m(we,{onPositiveClick:()=>b(e.id,`remove`)},{trigger:()=>m(O,{size:`tiny`,type:`error`,ghost:!0},()=>`Hapus`),default:()=>`Hapus container "${e.name}"?`})])}],ee=B([]),te=B(!0),T=B(null);async function ne(){te.value=!0;try{let e=await Z.images();ee.value=e.images,T.value=null}catch(e){r(e)&&(T.value=e.body)}finally{te.value=!1}}async function E(e){try{let t=await Z.removeImage(e);ee.value=t.images}catch(e){i(e,`Hapus image gagal (mungkin masih dipakai container)`)}}let ie=[{title:`Tag`,key:`tag`,minWidth:200,ellipsis:{tooltip:!0},sorter:(e,t)=>e.tag.localeCompare(t.tag),render:e=>e.dangling?m(X,{size:`small`,align:`center`},()=>[e.tag,m(be,{size:`small`,type:`warning`},()=>`dangling`)]):e.tag},{title:`Ukuran`,key:`sizeBytes`,width:110,sorter:(e,t)=>e.sizeBytes-t.sizeBytes,render:e=>Q(e.sizeBytes)},{title:`Dipakai`,key:`containers`,width:140,sorter:(e,t)=>e.containers-t.containers,render:e=>e.containers<0?`—`:e.containers===0?`tidak dipakai`:`${e.containers} container`},{title:`Dibuat`,key:`created`,width:150,sorter:(e,t)=>Date.parse(e.created)-Date.parse(t.created),render:e=>Te(e.created)},{title:`Aksi`,key:`actions`,width:100,render:e=>m(we,{onPositiveClick:()=>E(e.id)},{trigger:()=>m(O,{size:`tiny`,type:`error`,ghost:!0},()=>`Hapus`),default:()=>`Hapus image "${e.tag}"?`})}],A=B([]),j=B(!0),M=B(null);async function P(){j.value=!0;try{let e=await Z.volumes();A.value=e.volumes,M.value=null}catch(e){r(e)&&(M.value=e.body)}finally{j.value=!1}}async function ae(e){try{let t=await Z.removeVolume(e);A.value=t.volumes}catch(e){i(e,`Hapus volume gagal (mungkin masih dipakai container)`)}}let oe=[{title:`Nama`,key:`name`,minWidth:180,ellipsis:{tooltip:!0},sorter:(e,t)=>e.name.localeCompare(t.name)},{title:`Driver`,key:`driver`,width:100,sorter:(e,t)=>e.driver.localeCompare(t.driver)},{title:`Ukuran`,key:`sizeBytes`,width:110,sorter:(e,t)=>e.sizeBytes-t.sizeBytes,render:e=>e.sizeBytes<0?`tidak diketahui`:Q(e.sizeBytes)},{title:`Status`,key:`inUse`,width:120,sorter:(e,t)=>Number(e.inUse)-Number(t.inUse),render:e=>m(be,{size:`small`,type:e.inUse?`success`:`default`},()=>e.inUse?`dipakai`:`tidak dipakai`)},{title:`Aksi`,key:`actions`,width:100,render:e=>m(we,{onPositiveClick:()=>ae(e.name)},{trigger:()=>m(O,{size:`tiny`,type:`error`,ghost:!0},()=>`Hapus`),default:()=>`Hapus volume "${e.name}"?`})}],I=B([]),L=B(!0),R=B(null);async function se(){L.value=!0;try{let e=await Z.networks();I.value=e.networks,R.value=null}catch(e){r(e)&&(R.value=e.body)}finally{L.value=!1}}async function z(e){try{let t=await Z.removeNetwork(e);I.value=t.networks}catch(e){i(e,`Hapus network gagal (mungkin builtin atau masih dipakai)`)}}let V=[{title:`Nama`,key:`name`,minWidth:160,ellipsis:{tooltip:!0},sorter:(e,t)=>e.name.localeCompare(t.name),render:e=>e.builtin?m(X,{size:`small`,align:`center`},()=>[e.name,m(be,{size:`small`},()=>`builtin`)]):e.name},{title:`Driver`,key:`driver`,width:100,sorter:(e,t)=>e.driver.localeCompare(t.driver)},{title:`Subnet`,key:`subnet`,width:150,sorter:(e,t)=>e.subnet.localeCompare(t.subnet),render:e=>e.subnet||`—`},{title:`Container Terhubung`,key:`connectedCount`,width:170,sorter:(e,t)=>e.connectedCount-t.connectedCount},{title:`Aksi`,key:`actions`,width:100,render:e=>e.builtin?null:m(we,{onPositiveClick:()=>z(e.id)},{trigger:()=>m(O,{size:`tiny`,type:`error`,ghost:!0},()=>`Hapus`),default:()=>`Hapus network "${e.name}"?`})}],H=B(null),U=B(!0),W=B(null),ce=B(null);async function G(){U.value=!0;try{H.value=await Z.settings(),W.value=null}catch(e){r(e)&&(W.value=e.body)}finally{U.value=!1}}async function le(e){ce.value=e;try{H.value=await Z.prune(e),n.success(`Cleanup selesai`)}catch(t){i(t,`Cleanup gagal: ${e}`)}finally{ce.value=null}}let K=B(`containers`),q=new Set([`containers`]);return w(K,e=>{q.has(e)||(q.add(e),e===`images`?ne():e===`volumes`?P():e===`networks`?se():e===`settings`&&G())}),x(()=>{v(),_=setInterval(v,5e3)}),u(()=>{_&&clearInterval(_)}),(e,n)=>(S(),a(de,null,{default:y(()=>[t(F(ot),{type:`line`,value:K.value,"onUpdate:value":n[0]||=e=>K.value=e},{default:y(()=>[t(F(et),{name:`containers`,tab:`Containers`},{default:y(()=>[h.value?(S(),a(F(Y),{key:0,type:`warning`,title:h.value.error},null,8,[`title`])):(S(),a(F(J),{key:1,columns:C,data:d.value,loading:f.value,"row-key":e=>e.id,"scroll-x":1200},null,8,[`data`,`loading`,`row-key`]))]),_:1}),t(F(et),{name:`images`,tab:`Images`},{default:y(()=>[T.value?(S(),a(F(Y),{key:0,type:`warning`,title:T.value.error},null,8,[`title`])):(S(),a(F(J),{key:1,columns:ie,data:ee.value,loading:te.value,"row-key":e=>e.id,"scroll-x":700},null,8,[`data`,`loading`,`row-key`]))]),_:1}),t(F(et),{name:`volumes`,tab:`Volumes`},{default:y(()=>[M.value?(S(),a(F(Y),{key:0,type:`warning`,title:M.value.error},null,8,[`title`])):(S(),a(F(J),{key:1,columns:oe,data:A.value,loading:j.value,"row-key":e=>e.name,"scroll-x":610},null,8,[`data`,`loading`,`row-key`]))]),_:1}),t(F(et),{name:`networks`,tab:`Networks`},{default:y(()=>[R.value?(S(),a(F(Y),{key:0,type:`warning`,title:R.value.error},null,8,[`title`])):(S(),a(F(J),{key:1,columns:V,data:I.value,loading:L.value,"row-key":e=>e.id,"scroll-x":680},null,8,[`data`,`loading`,`row-key`]))]),_:1}),t(F(et),{name:`settings`,tab:`Settings`},{default:y(()=>[W.value?(S(),a(F(Y),{key:0,type:`warning`,title:W.value.error},null,8,[`title`])):U.value&&!H.value?(S(),g(`div`,dt,[t(F(fe),{size:`large`})])):H.value?(S(),a(F(X),{key:3,vertical:``,size:24},{default:y(()=>[t(F(Xe),{title:`Info Daemon`,column:2,bordered:``,"label-placement":`left`},{default:y(()=>[t(F($),{label:`Versi Server`},{default:y(()=>[N(k(H.value?.info.serverVersion),1)]),_:1}),t(F($),{label:`OS / Kernel`},{default:y(()=>[N(k(H.value?.info.operatingSystem)+` / `+k(H.value?.info.kernelVersion),1)]),_:1}),t(F($),{label:`Storage Driver`},{default:y(()=>[N(k(H.value?.info.storageDriver),1)]),_:1}),t(F($),{label:`Root Dir`},{default:y(()=>[N(k(H.value?.info.dockerRootDir),1)]),_:1}),t(F($),{label:`Container`},{default:y(()=>[N(k(H.value?.info.containersRunning)+` running, `+k(H.value?.info.containersPaused)+` paused, `+k(H.value?.info.containersStopped)+` stopped `,1)]),_:1}),t(F($),{label:`Images`},{default:y(()=>[N(k(H.value?.info.images),1)]),_:1})]),_:1}),t(F(Xe),{title:`Disk Usage`,column:2,bordered:``,"label-placement":`left`},{default:y(()=>[t(F($),{label:`Images`},{default:y(()=>[N(k(F(Q)(H.value?.diskUsage.imagesTotalBytes??0))+` (reclaimable `+k(F(Q)(H.value?.diskUsage.imagesReclaimableBytes??0))+`) `,1)]),_:1}),t(F($),{label:`Containers`},{default:y(()=>[N(k(F(Q)(H.value?.diskUsage.containersTotalBytes??0)),1)]),_:1}),t(F($),{label:`Volumes`},{default:y(()=>[N(k(F(Q)(H.value?.diskUsage.volumesTotalBytes??0))+` (reclaimable `+k(F(Q)(H.value?.diskUsage.volumesReclaimableBytes??0))+`) `,1)]),_:1})]),_:1}),t(F(X),null,{default:y(()=>[(S(),g(re,null,p([`containers`,`images`,`volumes`,`networks`,`all`],e=>t(F(we),{key:e,onPositiveClick:t=>le(e)},{trigger:y(()=>[t(F(O),{size:`small`,loading:ce.value===e},{default:y(()=>[N(`Bersihkan `+k(e),1)]),_:2},1032,[`loading`])]),default:y(()=>[N(` Jalankan cleanup "`+k(e)+`"? Tindakan ini tidak bisa dibatalkan. `,1)]),_:2},1032,[`onPositiveClick`])),64))]),_:1})]),_:1})):(S(),a(F(pe),{key:2,description:`Tidak ada data`}))]),_:1})]),_:1},8,[`value`])]),_:1}))}}),[[`__scopeId`,`data-v-d232fd8a`]]);export{ft as default};