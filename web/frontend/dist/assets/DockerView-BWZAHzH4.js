import{$n as e,An as t,B as n,Bn as r,Ct as i,En as a,Fn as o,Ft as s,H as c,Hn as l,In as u,Jn as d,Ln as f,M as p,Mn as m,Mt as h,Nt as g,Pn as _,Qn as v,Sn as y,Vn as b,Vt as x,Wt as S,Xt as C,Yn as w,Zn as T,_ as E,ar as D,bn as O,bt as k,c as ee,cn as A,dn as j,fn as M,gr as N,gt as te,hn as P,ir as ne,kn as F,m as re,mn as ie,o as ae,or as oe,pn as I,pr as L,pt as R,rn as se,rr as ce,sn as z,tn as le,un as B,ur as V,wt as ue,yr as H,zn as U,zt as W}from"./auth-DAwZXSzT.js";import{C as de,S as fe,g as G,h as K,t as pe,u as me}from"./AppShell-Ba70keUU.js";import{r as q,t as he}from"./DataTable-CrDUJCwd.js";import{u as J}from"./useTheme-DVrwDudx.js";import{s as ge}from"./LocaleSwitcher-qvIgonYg.js";import{n as _e,t as ve}from"./render-DZdFrPBV.js";import{t as ye}from"./get-slot-6kXJmSMP.js";import{t as be}from"./Add-qU2_gmtk.js";import{t as xe}from"./Tag-BUI_3VC1.js";import{t as Y}from"./Alert-BRjX9JZz.js";import{n as Se,r as Ce}from"./light-2Q4_6x7S.js";import{t as we}from"./use-message-DaQ-1LRF.js";import{t as Te}from"./Space-BrB-rIh5.js";import{t as X}from"./Popconfirm-cXo8rZfD.js";import{t as Z}from"./docker-_669y10-.js";import{n as Ee,t as Q}from"./format-BxLcbkc3.js";var De=K(`.v-x-scroll`,{overflow:`auto`,scrollbarWidth:`none`},[K(`&::-webkit-scrollbar`,{width:0,height:0})]),Oe=f({name:`XScroll`,props:{disabled:Boolean,onScroll:Function},setup(){let e=V(null);function t(e){!(e.currentTarget.offsetWidth<e.currentTarget.scrollWidth)||e.deltaY===0||(e.currentTarget.scrollLeft+=e.deltaY+e.deltaX,e.preventDefault())}let n=x();return De.mount({id:`vueuc/x-scroll`,head:!0,anchorMetaName:G,ssr:n}),Object.assign({selfRef:e,handleWheel:t},{scrollTo(...t){var n;(n=e.value)==null||n.scrollTo(...t)}})},render(){return U(`div`,{ref:`selfRef`,onScroll:this.onScroll,onWheel:this.disabled?void 0:this.handleWheel,class:`v-x-scroll`},this.$slots)}});function ke(e,t=`default`,n=[]){let{children:r}=e;if(typeof r==`object`&&r&&!Array.isArray(r)){let e=r[t];if(typeof e==`function`)return e()}return n}var Ae=/\s/;function je(e){for(var t=e.length;t--&&Ae.test(e.charAt(t)););return t}var Me=/^\s+/;function Ne(e){return e&&e.slice(0,je(e)+1).replace(Me,``)}var Pe=NaN,Fe=/^[-+]0x[0-9a-f]+$/i,Ie=/^0b[01]+$/i,Le=/^0o[0-7]+$/i,Re=parseInt;function ze(e){if(typeof e==`number`)return e;if(te(e))return Pe;if(R(e)){var t=typeof e.valueOf==`function`?e.valueOf():e;e=R(t)?t+``:t}if(typeof e!=`string`)return e===0?e:+e;e=Ne(e);var n=Ie.test(e);return n||Le.test(e)?Re(e.slice(2),n?2:8):Fe.test(e)?Pe:+e}var Be=function(){return k.Date.now()},Ve=`Expected a function`,He=Math.max,Ue=Math.min;function We(e,t,n){var r,i,a,o,s,c,l=0,u=!1,d=!1,f=!0;if(typeof e!=`function`)throw TypeError(Ve);t=ze(t)||0,R(n)&&(u=!!n.leading,d=`maxWait`in n,a=d?He(ze(n.maxWait)||0,t):a,f=`trailing`in n?!!n.trailing:f);function p(t){var n=r,a=i;return r=i=void 0,l=t,o=e.apply(a,n),o}function m(e){return l=e,s=setTimeout(_,t),u?p(e):o}function h(e){var n=e-c,r=e-l,i=t-n;return d?Ue(i,a-r):i}function g(e){var n=e-c,r=e-l;return c===void 0||n>=t||n<0||d&&r>=a}function _(){var e=Be();if(g(e))return v(e);s=setTimeout(_,h(e))}function v(e){return s=void 0,f&&r?p(e):(r=i=void 0,o)}function y(){s!==void 0&&clearTimeout(s),l=0,r=c=i=s=void 0}function b(){return s===void 0?o:v(Be())}function x(){var e=Be(),n=g(e);if(r=arguments,i=this,c=e,n){if(s===void 0)return m(c);if(d)return clearTimeout(s),s=setTimeout(_,t),p(c)}return s===void 0&&(s=setTimeout(_,t)),o}return x.cancel=y,x.flush=b,x}var Ge=`Expected a function`;function Ke(e,t,n){var r=!0,i=!0;if(typeof e!=`function`)throw TypeError(Ge);return R(n)&&(r=`leading`in n?!!n.leading:r,i=`trailing`in n?!!n.trailing:i),We(e,t,{leading:r,maxWait:t,trailing:i})}var qe=z([A(`descriptions`,{fontSize:`var(--n-font-size)`},[A(`descriptions-separator`,`
 display: inline-block;
 margin: 0 8px 0 2px;
 `),A(`descriptions-table-wrapper`,[A(`descriptions-table`,[A(`descriptions-table-row`,[A(`descriptions-table-header`,{padding:`var(--n-th-padding)`}),A(`descriptions-table-content`,{padding:`var(--n-td-padding)`})])])]),M(`bordered`,[A(`descriptions-table-wrapper`,[A(`descriptions-table`,[A(`descriptions-table-row`,[z(`&:last-child`,[A(`descriptions-table-content`,{paddingBottom:0})])])])])]),j(`left-label-placement`,[A(`descriptions-table-content`,[z(`> *`,{verticalAlign:`top`})])]),j(`left-label-align`,[z(`th`,{textAlign:`left`})]),j(`center-label-align`,[z(`th`,{textAlign:`center`})]),j(`right-label-align`,[z(`th`,{textAlign:`right`})]),j(`bordered`,[A(`descriptions-table-wrapper`,`
 border-radius: var(--n-border-radius);
 overflow: hidden;
 background: var(--n-merged-td-color);
 border: 1px solid var(--n-merged-border-color);
 `,[A(`descriptions-table`,[A(`descriptions-table-row`,[z(`&:not(:last-child)`,[A(`descriptions-table-content`,{borderBottom:`1px solid var(--n-merged-border-color)`}),A(`descriptions-table-header`,{borderBottom:`1px solid var(--n-merged-border-color)`})]),A(`descriptions-table-header`,`
 font-weight: 400;
 background-clip: padding-box;
 background-color: var(--n-merged-th-color);
 `,[z(`&:not(:last-child)`,{borderRight:`1px solid var(--n-merged-border-color)`})]),A(`descriptions-table-content`,[z(`&:not(:last-child)`,{borderRight:`1px solid var(--n-merged-border-color)`})])])])])]),A(`descriptions-header`,`
 font-weight: var(--n-th-font-weight);
 font-size: 18px;
 transition: color .3s var(--n-bezier);
 line-height: var(--n-line-height);
 margin-bottom: 16px;
 color: var(--n-title-text-color);
 `),A(`descriptions-table-wrapper`,`
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[A(`descriptions-table`,`
 width: 100%;
 border-collapse: separate;
 border-spacing: 0;
 box-sizing: border-box;
 `,[A(`descriptions-table-row`,`
 box-sizing: border-box;
 transition: border-color .3s var(--n-bezier);
 `,[A(`descriptions-table-header`,`
 font-weight: var(--n-th-font-weight);
 line-height: var(--n-line-height);
 display: table-cell;
 box-sizing: border-box;
 color: var(--n-th-text-color);
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `),A(`descriptions-table-content`,`
 vertical-align: top;
 line-height: var(--n-line-height);
 display: table-cell;
 box-sizing: border-box;
 color: var(--n-td-text-color);
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[B(`content`,`
 transition: color .3s var(--n-bezier);
 display: inline-block;
 color: var(--n-td-text-color);
 `)]),B(`label`,`
 font-weight: var(--n-th-font-weight);
 transition: color .3s var(--n-bezier);
 display: inline-block;
 margin-right: 14px;
 color: var(--n-th-text-color);
 `)])])])]),A(`descriptions-table-wrapper`,`
 --n-merged-th-color: var(--n-th-color);
 --n-merged-td-color: var(--n-td-color);
 --n-merged-border-color: var(--n-border-color);
 `),ie(A(`descriptions-table-wrapper`,`
 --n-merged-th-color: var(--n-th-color-modal);
 --n-merged-td-color: var(--n-td-color-modal);
 --n-merged-border-color: var(--n-border-color-modal);
 `)),P(A(`descriptions-table-wrapper`,`
 --n-merged-th-color: var(--n-th-color-popover);
 --n-merged-td-color: var(--n-td-color-popover);
 --n-merged-border-color: var(--n-border-color-popover);
 `))]),Je=`DESCRIPTION_ITEM_FLAG`;function Ye(e){return typeof e==`object`&&e&&!Array.isArray(e)?e.type&&e.type.DESCRIPTION_ITEM_FLAG:!1}var Xe=Object.assign(Object.assign({},c.props),{title:String,column:{type:Number,default:3},columns:Number,labelPlacement:{type:String,default:`top`},labelAlign:{type:String,default:`left`},separator:{type:String,default:`:`},size:String,bordered:Boolean,labelClass:String,labelStyle:[Object,String],contentClass:String,contentStyle:[Object,String]}),Ze=f({name:`Descriptions`,props:Xe,slots:Object,setup(e){let{mergedClsPrefixRef:n,inlineThemeDisabled:r,mergedComponentPropsRef:a}=ue(e),o=t(()=>e.size||a?.value?.Descriptions?.size||`medium`),s=c(`Descriptions`,`-descriptions`,qe,Ce,e,n),l=t(()=>{let{bordered:t}=e,n=o.value,{common:{cubicBezierEaseInOut:r},self:{titleTextColor:i,thColor:a,thColorModal:c,thColorPopover:l,thTextColor:u,thFontWeight:d,tdTextColor:f,tdColor:p,tdColorModal:m,tdColorPopover:h,borderColor:g,borderColorModal:_,borderColorPopover:v,borderRadius:y,lineHeight:b,[I(`fontSize`,n)]:x,[I(t?`thPaddingBordered`:`thPadding`,n)]:S,[I(t?`tdPaddingBordered`:`tdPadding`,n)]:C}}=s.value;return{"--n-title-text-color":i,"--n-th-padding":S,"--n-td-padding":C,"--n-font-size":x,"--n-bezier":r,"--n-th-font-weight":d,"--n-line-height":b,"--n-th-text-color":u,"--n-td-text-color":f,"--n-th-color":a,"--n-th-color-modal":c,"--n-th-color-popover":l,"--n-td-color":p,"--n-td-color-modal":m,"--n-td-color-popover":h,"--n-border-radius":y,"--n-border-color":g,"--n-border-color-modal":_,"--n-border-color-popover":v}}),u=r?i(`descriptions`,t(()=>{let t=``,{bordered:n}=e;return n&&(t+=`a`),t+=o.value[0],t}),l,e):void 0;return{mergedClsPrefix:n,cssVars:r?void 0:l,themeClass:u?.themeClass,onRender:u?.onRender,compitableColumn:fe(e,[`columns`,`column`]),inlineThemeDisabled:r,mergedSize:o}},render(){let e=this.$slots.default,t=e?J(e()):[];t.length;let{contentClass:n,labelClass:r,compitableColumn:i,labelPlacement:a,labelAlign:o,mergedSize:s,bordered:c,title:l,cssVars:u,mergedClsPrefix:d,separator:f,onRender:p}=this;p?.();let m=t.filter(e=>Ye(e)),h=m.reduce((e,t,o)=>{let s=t.props||{},l=m.length-1===o,u=[`label`in s?s.label:ke(t,`label`)],p=[ke(t)],h=s.span||1,g=e.span;e.span+=h;let _=s.labelStyle||s[`label-style`]||this.labelStyle,v=s.contentStyle||s[`content-style`]||this.contentStyle;if(a===`left`)c?e.row.push(U(`th`,{class:[`${d}-descriptions-table-header`,r],colspan:1,style:_},u),U(`td`,{class:[`${d}-descriptions-table-content`,n],colspan:l?(i-g)*2+1:h*2-1,style:v},p)):e.row.push(U(`td`,{class:`${d}-descriptions-table-content`,colspan:l?(i-g)*2:h*2},U(`span`,{class:[`${d}-descriptions-table-content__label`,r],style:_},[...u,f&&U(`span`,{class:`${d}-descriptions-separator`},f)]),U(`span`,{class:[`${d}-descriptions-table-content__content`,n],style:v},p)));else{let t=l?(i-g)*2:h*2;e.row.push(U(`th`,{class:[`${d}-descriptions-table-header`,r],colspan:t,style:_},u)),e.secondRow.push(U(`td`,{class:[`${d}-descriptions-table-content`,n],colspan:t,style:v},p))}return(e.span>=i||l)&&(e.span=0,e.row.length&&(e.rows.push(e.row),e.row=[]),a!==`left`&&e.secondRow.length&&(e.rows.push(e.secondRow),e.secondRow=[])),e},{span:0,row:[],secondRow:[],rows:[]}).rows.map(e=>U(`tr`,{class:`${d}-descriptions-table-row`},e));return U(`div`,{style:u,class:[`${d}-descriptions`,this.themeClass,`${d}-descriptions--${a}-label-placement`,`${d}-descriptions--${o}-label-align`,`${d}-descriptions--${s}-size`,c&&`${d}-descriptions--bordered`]},l||this.$slots.header?U(`div`,{class:`${d}-descriptions-header`},l||ye(this,`header`)):null,U(`div`,{class:`${d}-descriptions-table-wrapper`},U(`table`,{class:`${d}-descriptions-table`},U(`tbody`,null,a===`top`&&U(`tr`,{class:`${d}-descriptions-table-row`,style:{visibility:`collapse`}},C(i*2,U(`td`,null))),h))))}}),Qe={label:String,span:{type:Number,default:1},labelClass:String,labelStyle:[Object,String],contentClass:String,contentStyle:[Object,String]},$=f({name:`DescriptionsItem`,[Je]:!0,props:Qe,slots:Object,render(){return null}}),$e=S(`n-tabs`),et={tab:[String,Number,Object,Function],name:{type:[String,Number],required:!0},disabled:Boolean,displayDirective:{type:String,default:`if`},closable:{type:Boolean,default:void 0},tabProps:Object,label:[String,Number,Object,Function]},tt=f({__TAB_PANE__:!0,name:`TabPane`,alias:[`TabPanel`],props:et,slots:Object,setup(e){let t=r($e,null);return t||s(`tab-pane`,"`n-tab-pane` must be placed inside `n-tabs`."),{style:t.paneStyleRef,class:t.paneClassRef,mergedClsPrefix:t.mergedClsPrefixRef}},render(){return U(`div`,{class:[`${this.mergedClsPrefix}-tab-pane`,this.class],style:this.style},this.$slots)}}),nt=Object.assign({internalLeftPadded:Boolean,internalAddable:Boolean,internalCreatedByPane:Boolean},_e(et,[`displayDirective`])),rt=f({__TAB__:!0,inheritAttrs:!1,name:`Tab`,props:nt,setup(e){let{mergedClsPrefixRef:n,valueRef:i,typeRef:a,closableRef:o,tabStyleRef:s,addTabStyleRef:c,tabClassRef:l,addTabClassRef:u,tabChangeIdRef:d,onBeforeLeaveRef:f,triggerRef:p,handleAdd:m,activateTab:h,handleClose:g}=r($e);return{trigger:p,mergedClosable:t(()=>{if(e.internalAddable)return!1;let{closable:t}=e;return t===void 0?o.value:t}),style:s,addStyle:c,tabClass:l,addTabClass:u,clsPrefix:n,value:i,type:a,handleClose(t){t.stopPropagation(),!e.disabled&&g(e.name)},activateTab(){if(e.disabled)return;if(e.internalAddable){m();return}let{name:t}=e,n=++d.id;if(t!==i.value){let{value:r}=f;r?Promise.resolve(r(e.name,i.value)).then(e=>{e&&d.id===n&&h(t)}):h(t)}}}},render(){let{internalAddable:e,clsPrefix:t,name:r,disabled:i,label:o,tab:s,value:c,mergedClosable:l,trigger:u,$slots:{default:d}}=this,f=o??s;return U(`div`,{class:`${t}-tabs-tab-wrapper`},this.internalLeftPadded?U(`div`,{class:`${t}-tabs-tab-pad`}):null,U(`div`,Object.assign({key:r,"data-name":r,"data-disabled":i?!0:void 0},b({class:[`${t}-tabs-tab`,c===r&&`${t}-tabs-tab--active`,i&&`${t}-tabs-tab--disabled`,l&&`${t}-tabs-tab--closable`,e&&`${t}-tabs-tab--addable`,e?this.addTabClass:this.tabClass],onClick:u===`click`?this.activateTab:void 0,onMouseenter:u===`hover`?this.activateTab:void 0,style:e?this.addStyle:this.style},this.internalCreatedByPane?this.tabProps||{}:this.$attrs)),U(`span`,{class:`${t}-tabs-tab__label`},e?U(a,null,U(`div`,{class:`${t}-tabs-tab__height-placeholder`},`\xA0`),U(n,{clsPrefix:t},{default:()=>U(be,null)})):d?d():typeof f==`object`?f:ve(f??r)),l&&this.type===`card`?U(p,{clsPrefix:t,class:`${t}-tabs-tab__close`,onClick:this.handleClose,disabled:i}):null))}}),it=A(`tabs`,`
 box-sizing: border-box;
 width: 100%;
 display: flex;
 flex-direction: column;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
`,[j(`segment-type`,[A(`tabs-rail`,[z(`&.transition-disabled`,[A(`tabs-capsule`,`
 transition: none;
 `)])])]),j(`top`,[A(`tab-pane`,`
 padding: var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left);
 `)]),j(`left`,[A(`tab-pane`,`
 padding: var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left) var(--n-pane-padding-top);
 `)]),j(`left, right`,`
 flex-direction: row;
 `,[A(`tabs-bar`,`
 width: 2px;
 right: 0;
 transition:
 top .2s var(--n-bezier),
 max-height .2s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `),A(`tabs-tab`,`
 padding: var(--n-tab-padding-vertical); 
 `)]),j(`right`,`
 flex-direction: row-reverse;
 `,[A(`tab-pane`,`
 padding: var(--n-pane-padding-left) var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom);
 `),A(`tabs-bar`,`
 left: 0;
 `)]),j(`bottom`,`
 flex-direction: column-reverse;
 justify-content: flex-end;
 `,[A(`tab-pane`,`
 padding: var(--n-pane-padding-bottom) var(--n-pane-padding-right) var(--n-pane-padding-top) var(--n-pane-padding-left);
 `),A(`tabs-bar`,`
 top: 0;
 `)]),A(`tabs-rail`,`
 position: relative;
 padding: 3px;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 background-color: var(--n-color-segment);
 transition: background-color .3s var(--n-bezier);
 display: flex;
 align-items: center;
 `,[A(`tabs-capsule`,`
 border-radius: var(--n-tab-border-radius);
 position: absolute;
 pointer-events: none;
 background-color: var(--n-tab-color-segment);
 box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .08);
 transition: transform 0.3s var(--n-bezier);
 `),A(`tabs-tab-wrapper`,`
 flex-basis: 0;
 flex-grow: 1;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[A(`tabs-tab`,`
 overflow: hidden;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[j(`active`,`
 font-weight: var(--n-font-weight-strong);
 color: var(--n-tab-text-color-active);
 `),z(`&:hover`,`
 color: var(--n-tab-text-color-hover);
 `)])])]),j(`flex`,[A(`tabs-nav`,`
 width: 100%;
 position: relative;
 `,[A(`tabs-wrapper`,`
 width: 100%;
 `,[A(`tabs-tab`,`
 margin-right: 0;
 `)])])]),A(`tabs-nav`,`
 box-sizing: border-box;
 line-height: 1.5;
 display: flex;
 transition: border-color .3s var(--n-bezier);
 `,[B(`prefix, suffix`,`
 display: flex;
 align-items: center;
 `),B(`prefix`,`padding-right: 16px;`),B(`suffix`,`padding-left: 16px;`)]),j(`top, bottom`,[z(`>`,[A(`tabs-nav`,[A(`tabs-nav-scroll-wrapper`,[z(`&::before`,`
 top: 0;
 bottom: 0;
 left: 0;
 width: 20px;
 `),z(`&::after`,`
 top: 0;
 bottom: 0;
 right: 0;
 width: 20px;
 `),j(`shadow-start`,[z(`&::before`,`
 box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, .12);
 `)]),j(`shadow-end`,[z(`&::after`,`
 box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),j(`left, right`,[A(`tabs-nav-scroll-content`,`
 flex-direction: column;
 `),z(`>`,[A(`tabs-nav`,[A(`tabs-nav-scroll-wrapper`,[z(`&::before`,`
 top: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),z(`&::after`,`
 bottom: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),j(`shadow-start`,[z(`&::before`,`
 box-shadow: inset 0 10px 8px -8px rgba(0, 0, 0, .12);
 `)]),j(`shadow-end`,[z(`&::after`,`
 box-shadow: inset 0 -10px 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),A(`tabs-nav-scroll-wrapper`,`
 flex: 1;
 position: relative;
 overflow: hidden;
 `,[A(`tabs-nav-y-scroll`,`
 height: 100%;
 width: 100%;
 overflow-y: auto; 
 scrollbar-width: none;
 `,[z(`&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb`,`
 width: 0;
 height: 0;
 display: none;
 `)]),z(`&::before, &::after`,`
 transition: box-shadow .3s var(--n-bezier);
 pointer-events: none;
 content: "";
 position: absolute;
 z-index: 1;
 `)]),A(`tabs-nav-scroll-content`,`
 display: flex;
 position: relative;
 min-width: 100%;
 min-height: 100%;
 width: fit-content;
 box-sizing: border-box;
 `),A(`tabs-wrapper`,`
 display: inline-flex;
 flex-wrap: nowrap;
 position: relative;
 `),A(`tabs-tab-wrapper`,`
 display: flex;
 flex-wrap: nowrap;
 flex-shrink: 0;
 flex-grow: 0;
 `),A(`tabs-tab`,`
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
 `,[j(`disabled`,{cursor:`not-allowed`}),B(`close`,`
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),B(`label`,`
 display: flex;
 align-items: center;
 z-index: 1;
 `)]),A(`tabs-bar`,`
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
 `,[z(`&.transition-disabled`,`
 transition: none;
 `),j(`disabled`,`
 background-color: var(--n-tab-text-color-disabled)
 `)]),A(`tabs-pane-wrapper`,`
 position: relative;
 overflow: hidden;
 transition: max-height .2s var(--n-bezier);
 `),A(`tab-pane`,`
 color: var(--n-pane-text-color);
 width: 100%;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 opacity .2s var(--n-bezier);
 left: 0;
 right: 0;
 top: 0;
 `,[z(`&.next-transition-leave-active, &.prev-transition-leave-active, &.next-transition-enter-active, &.prev-transition-enter-active`,`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 transform .2s var(--n-bezier),
 opacity .2s var(--n-bezier);
 `),z(`&.next-transition-leave-active, &.prev-transition-leave-active`,`
 position: absolute;
 `),z(`&.next-transition-enter-from, &.prev-transition-leave-to`,`
 transform: translateX(32px);
 opacity: 0;
 `),z(`&.next-transition-leave-to, &.prev-transition-enter-from`,`
 transform: translateX(-32px);
 opacity: 0;
 `),z(`&.next-transition-leave-from, &.next-transition-enter-to, &.prev-transition-leave-from, &.prev-transition-enter-to`,`
 transform: translateX(0);
 opacity: 1;
 `)]),A(`tabs-tab-pad`,`
 box-sizing: border-box;
 width: var(--n-tab-gap);
 flex-grow: 0;
 flex-shrink: 0;
 `),j(`line-type, bar-type`,[A(`tabs-tab`,`
 font-weight: var(--n-tab-font-weight);
 box-sizing: border-box;
 vertical-align: bottom;
 `,[z(`&:hover`,{color:`var(--n-tab-text-color-hover)`}),j(`active`,`
 color: var(--n-tab-text-color-active);
 font-weight: var(--n-tab-font-weight-active);
 `),j(`disabled`,{color:`var(--n-tab-text-color-disabled)`})])]),A(`tabs-nav`,[j(`line-type`,[j(`top`,[B(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),A(`tabs-nav-scroll-content`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),A(`tabs-bar`,`
 bottom: -1px;
 `)]),j(`left`,[B(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),A(`tabs-nav-scroll-content`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),A(`tabs-bar`,`
 right: -1px;
 `)]),j(`right`,[B(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),A(`tabs-nav-scroll-content`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),A(`tabs-bar`,`
 left: -1px;
 `)]),j(`bottom`,[B(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),A(`tabs-nav-scroll-content`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),A(`tabs-bar`,`
 top: -1px;
 `)]),B(`prefix, suffix`,`
 transition: border-color .3s var(--n-bezier);
 `),A(`tabs-nav-scroll-content`,`
 transition: border-color .3s var(--n-bezier);
 `),A(`tabs-bar`,`
 border-radius: 0;
 `)]),j(`card-type`,[B(`prefix, suffix`,`
 transition: border-color .3s var(--n-bezier);
 `),A(`tabs-pad`,`
 flex-grow: 1;
 transition: border-color .3s var(--n-bezier);
 `),A(`tabs-tab-pad`,`
 transition: border-color .3s var(--n-bezier);
 `),A(`tabs-tab`,`
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
 `,[j(`addable`,`
 padding-left: 8px;
 padding-right: 8px;
 font-size: 16px;
 justify-content: center;
 `,[B(`height-placeholder`,`
 width: 0;
 font-size: var(--n-tab-font-size);
 `),M(`disabled`,[z(`&:hover`,`
 color: var(--n-tab-text-color-hover);
 `)])]),j(`closable`,`padding-right: 8px;`),j(`active`,`
 background-color: #0000;
 font-weight: var(--n-tab-font-weight-active);
 color: var(--n-tab-text-color-active);
 `),j(`disabled`,`color: var(--n-tab-text-color-disabled);`)])]),j(`left, right`,`
 flex-direction: column; 
 `,[B(`prefix, suffix`,`
 padding: var(--n-tab-padding-vertical);
 `),A(`tabs-wrapper`,`
 flex-direction: column;
 `),A(`tabs-tab-wrapper`,`
 flex-direction: column;
 `,[A(`tabs-tab-pad`,`
 height: var(--n-tab-gap-vertical);
 width: 100%;
 `)])]),j(`top`,[j(`card-type`,[A(`tabs-scroll-padding`,`border-bottom: 1px solid var(--n-tab-border-color);`),B(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),A(`tabs-tab`,`
 border-top-left-radius: var(--n-tab-border-radius);
 border-top-right-radius: var(--n-tab-border-radius);
 `,[j(`active`,`
 border-bottom: 1px solid #0000;
 `)]),A(`tabs-tab-pad`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),A(`tabs-pad`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `)])]),j(`left`,[j(`card-type`,[A(`tabs-scroll-padding`,`border-right: 1px solid var(--n-tab-border-color);`),B(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),A(`tabs-tab`,`
 border-top-left-radius: var(--n-tab-border-radius);
 border-bottom-left-radius: var(--n-tab-border-radius);
 `,[j(`active`,`
 border-right: 1px solid #0000;
 `)]),A(`tabs-tab-pad`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),A(`tabs-pad`,`
 border-right: 1px solid var(--n-tab-border-color);
 `)])]),j(`right`,[j(`card-type`,[A(`tabs-scroll-padding`,`border-left: 1px solid var(--n-tab-border-color);`),B(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),A(`tabs-tab`,`
 border-top-right-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[j(`active`,`
 border-left: 1px solid #0000;
 `)]),A(`tabs-tab-pad`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),A(`tabs-pad`,`
 border-left: 1px solid var(--n-tab-border-color);
 `)])]),j(`bottom`,[j(`card-type`,[A(`tabs-scroll-padding`,`border-top: 1px solid var(--n-tab-border-color);`),B(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),A(`tabs-tab`,`
 border-bottom-left-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[j(`active`,`
 border-top: 1px solid #0000;
 `)]),A(`tabs-tab-pad`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),A(`tabs-pad`,`
 border-top: 1px solid var(--n-tab-border-color);
 `)])])])]),at=Ke,ot=Object.assign(Object.assign({},c.props),{value:[String,Number],defaultValue:[String,Number],trigger:{type:String,default:`click`},type:{type:String,default:`bar`},closable:Boolean,justifyContent:String,size:String,placement:{type:String,default:`top`},tabStyle:[String,Object],tabClass:String,addTabStyle:[String,Object],addTabClass:String,barWidth:Number,paneClass:String,paneStyle:[String,Object],paneWrapperClass:String,paneWrapperStyle:[String,Object],addable:[Boolean,Object],tabsPadding:{type:Number,default:0},animated:Boolean,onBeforeLeave:Function,onAdd:Function,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onClose:[Function,Array],labelSize:String,activeName:[String,Number],onActiveNameChange:[Function,Array]}),st=f({name:`Tabs`,props:ot,slots:Object,setup(e,{slots:n}){let{mergedClsPrefixRef:r,inlineThemeDisabled:a,mergedComponentPropsRef:o}=ue(e),s=c(`Tabs`,`-tabs`,it,Se,e,r),u=V(null),f=V(null),p=V(null),m=V(null),h=V(null),_=V(null),y=V(!0),b=V(!0),x=fe(e,[`labelSize`,`size`]),S=t(()=>x.value?x.value:o?.value?.Tabs?.size||`medium`),C=fe(e,[`activeName`,`value`]),w=V(C.value??e.defaultValue??(n.default?J(n.default())[0]?.props?.name:null)),T=ge(C,w),E={id:0},D=t(()=>{if(!(!e.justifyContent||e.type===`card`))return{display:`flex`,justifyContent:e.justifyContent}});ce(T,()=>{E.id=0,j(),M()});function O(){let{value:e}=T;return e===null?null:u.value?.querySelector(`[data-name="${e}"]`)}function k(t){if(e.type===`card`)return;let{value:n}=f;if(!n)return;let i=n.style.opacity===`0`;if(t){let a=`${r.value}-tabs-bar--disabled`,{barWidth:o,placement:s}=e;if(t.dataset.disabled===`true`?n.classList.add(a):n.classList.remove(a),[`top`,`bottom`].includes(s)){if(A([`top`,`maxHeight`,`height`]),typeof o==`number`&&t.offsetWidth>=o){let e=Math.floor((t.offsetWidth-o)/2)+t.offsetLeft;n.style.left=`${e}px`,n.style.maxWidth=`${o}px`}else n.style.left=`${t.offsetLeft}px`,n.style.maxWidth=`${t.offsetWidth}px`;n.style.width=`8192px`,i&&(n.style.transition=`none`),n.offsetWidth,i&&(n.style.transition=``,n.style.opacity=`1`)}else{if(A([`left`,`maxWidth`,`width`]),typeof o==`number`&&t.offsetHeight>=o){let e=Math.floor((t.offsetHeight-o)/2)+t.offsetTop;n.style.top=`${e}px`,n.style.maxHeight=`${o}px`}else n.style.top=`${t.offsetTop}px`,n.style.maxHeight=`${t.offsetHeight}px`;n.style.height=`8192px`,i&&(n.style.transition=`none`),n.offsetHeight,i&&(n.style.transition=``,n.style.opacity=`1`)}}}function ee(){if(e.type===`card`)return;let{value:t}=f;t&&(t.style.opacity=`0`)}function A(e){let{value:t}=f;if(t)for(let n of e)t.style[n]=``}function j(){if(e.type===`card`)return;let t=O();t?k(t):ee()}function M(){let e=h.value?.$el;if(!e)return;let t=O();if(!t)return;let{scrollLeft:n,offsetWidth:r}=e,{offsetLeft:i,offsetWidth:a}=t;n>i?e.scrollTo({top:0,left:i,behavior:`smooth`}):i+a>n+r&&e.scrollTo({top:0,left:i+a-r,behavior:`smooth`})}let N=V(null),te=0,P=null;function F(e){let t=N.value;if(t){te=e.getBoundingClientRect().height;let n=`${te}px`,r=()=>{t.style.height=n,t.style.maxHeight=n};P?(r(),P(),P=null):P=r}}function re(e){let t=N.value;if(t){let n=e.getBoundingClientRect().height,r=()=>{document.body.offsetHeight,t.style.maxHeight=`${n}px`,t.style.height=`${Math.max(te,n)}px`};P?(P(),P=null,r()):P=r}}function ie(){let t=N.value;if(t){t.style.maxHeight=``,t.style.height=``;let{paneWrapperStyle:n}=e;if(typeof n==`string`)t.style.cssText=n;else if(n){let{maxHeight:e,height:r}=n;e!==void 0&&(t.style.maxHeight=e),r!==void 0&&(t.style.height=r)}}}let ae={value:[]},oe=V(`next`);function R(e){let t=T.value,n=`next`;for(let r of ae.value){if(r===t)break;if(r===e){n=`prev`;break}}oe.value=n,z(e)}function z(t){let{onActiveNameChange:n,onUpdateValue:r,"onUpdate:value":i}=e;n&&g(n,t),r&&g(r,t),i&&g(i,t),w.value=t}function B(t){let{onClose:n}=e;n&&g(n,t)}let H=!0;function U(){let{value:e}=f;if(!e)return;H||=!1;let t=`transition-disabled`;e.classList.add(t),j(),e.classList.remove(t)}let W=V(null);function G({transitionDisabled:e}){let t=u.value;if(!t)return;e&&t.classList.add(`transition-disabled`);let n=O();n&&W.value&&(W.value.style.width=`${n.offsetWidth}px`,W.value.style.height=`${n.offsetHeight}px`,W.value.style.transform=`translateX(${n.offsetLeft-le(getComputedStyle(t).paddingLeft)}px)`,e&&W.value.offsetWidth),e&&t.classList.remove(`transition-disabled`)}ce([T],()=>{e.type===`segment`&&l(()=>{G({transitionDisabled:!1})})}),d(()=>{e.type===`segment`&&G({transitionDisabled:!0})});let K=0;function pe(t){if(t.contentRect.width===0&&t.contentRect.height===0||K===t.contentRect.width)return;K=t.contentRect.width;let{type:n}=e;if((n===`line`||n===`bar`)&&(H||e.justifyContent?.startsWith(`space`))&&U(),n!==`segment`){let{placement:t}=e;ye((t===`top`||t===`bottom`?h.value?.$el:_.value)||null)}}let me=at(pe,64);ce([()=>e.justifyContent,()=>e.size],()=>{l(()=>{let{type:t}=e;(t===`line`||t===`bar`)&&U()})});let q=V(!1);function he(t){let{target:n,contentRect:{width:r,height:i}}=t,a=n.parentElement.parentElement.offsetWidth,o=n.parentElement.parentElement.offsetHeight,{placement:s}=e;if(!q.value)s===`top`||s===`bottom`?a<r&&(q.value=!0):o<i&&(q.value=!0);else{let{value:e}=m;if(!e)return;s===`top`||s===`bottom`?a-r>e.$el.offsetWidth&&(q.value=!1):o-i>e.$el.offsetHeight&&(q.value=!1)}ye(h.value?.$el||null)}let _e=at(he,64);function ve(){let{onAdd:t}=e;t&&t(),l(()=>{let e=O(),{value:t}=h;!e||!t||t.scrollTo({left:e.offsetLeft,top:0,behavior:`smooth`})})}function ye(t){if(!t)return;let{placement:n}=e;if(n===`top`||n===`bottom`){let{scrollLeft:e,scrollWidth:n,offsetWidth:r}=t;y.value=e<=0,b.value=e+r>=n}else{let{scrollTop:e,scrollHeight:n,offsetHeight:r}=t;y.value=e<=0,b.value=e+r>=n}}let be=at(e=>{ye(e.target)},64);v($e,{triggerRef:L(e,`trigger`),tabStyleRef:L(e,`tabStyle`),tabClassRef:L(e,`tabClass`),addTabStyleRef:L(e,`addTabStyle`),addTabClassRef:L(e,`addTabClass`),paneClassRef:L(e,`paneClass`),paneStyleRef:L(e,`paneStyle`),mergedClsPrefixRef:r,typeRef:L(e,`type`),closableRef:L(e,`closable`),valueRef:T,tabChangeIdRef:E,onBeforeLeaveRef:L(e,`onBeforeLeave`),activateTab:R,handleClose:B,handleAdd:ve}),de(()=>{j(),M()}),ne(()=>{let{value:e}=p;if(!e)return;let{value:t}=r,n=`${t}-tabs-nav-scroll-wrapper--shadow-start`,i=`${t}-tabs-nav-scroll-wrapper--shadow-end`;y.value?e.classList.remove(n):e.classList.add(n),b.value?e.classList.remove(i):e.classList.add(i)});let xe={syncBarPosition:()=>{j()}},Y=()=>{G({transitionDisabled:!0})},Ce=t(()=>{let{value:t}=S,{type:n}=e,r=`${t}${{card:`Card`,bar:`Bar`,line:`Line`,segment:`Segment`}[n]}`,{self:{barColor:i,closeIconColor:a,closeIconColorHover:o,closeIconColorPressed:c,tabColor:l,tabBorderColor:u,paneTextColor:d,tabFontWeight:f,tabBorderRadius:p,tabFontWeightActive:m,colorSegment:h,fontWeightStrong:g,tabColorSegment:_,closeSize:v,closeIconSize:y,closeColorHover:b,closeColorPressed:x,closeBorderRadius:C,[I(`panePadding`,t)]:w,[I(`tabPadding`,r)]:T,[I(`tabPaddingVertical`,r)]:E,[I(`tabGap`,r)]:D,[I(`tabGap`,`${r}Vertical`)]:O,[I(`tabTextColor`,n)]:k,[I(`tabTextColorActive`,n)]:ee,[I(`tabTextColorHover`,n)]:A,[I(`tabTextColorDisabled`,n)]:j,[I(`tabFontSize`,t)]:M},common:{cubicBezierEaseInOut:N}}=s.value;return{"--n-bezier":N,"--n-color-segment":h,"--n-bar-color":i,"--n-tab-font-size":M,"--n-tab-text-color":k,"--n-tab-text-color-active":ee,"--n-tab-text-color-disabled":j,"--n-tab-text-color-hover":A,"--n-pane-text-color":d,"--n-tab-border-color":u,"--n-tab-border-radius":p,"--n-close-size":v,"--n-close-icon-size":y,"--n-close-color-hover":b,"--n-close-color-pressed":x,"--n-close-border-radius":C,"--n-close-icon-color":a,"--n-close-icon-color-hover":o,"--n-close-icon-color-pressed":c,"--n-tab-color":l,"--n-tab-font-weight":f,"--n-tab-font-weight-active":m,"--n-tab-padding":T,"--n-tab-padding-vertical":E,"--n-tab-gap":D,"--n-tab-gap-vertical":O,"--n-pane-padding-left":se(w,`left`),"--n-pane-padding-right":se(w,`right`),"--n-pane-padding-top":se(w,`top`),"--n-pane-padding-bottom":se(w,`bottom`),"--n-font-weight-strong":g,"--n-tab-color-segment":_}}),we=a?i(`tabs`,t(()=>`${S.value[0]}${e.type[0]}`),Ce,e):void 0;return Object.assign({mergedClsPrefix:r,mergedValue:T,renderedNames:new Set,segmentCapsuleElRef:W,tabsPaneWrapperRef:N,tabsElRef:u,barElRef:f,addTabInstRef:m,xScrollInstRef:h,scrollWrapperElRef:p,addTabFixed:q,tabWrapperStyle:D,handleNavResize:me,mergedSize:S,handleScroll:be,handleTabsResize:_e,cssVars:a?void 0:Ce,themeClass:we?.themeClass,animationDirection:oe,renderNameListRef:ae,yScrollElRef:_,handleSegmentResize:Y,onAnimationBeforeLeave:F,onAnimationEnter:re,onAnimationAfterEnter:ie,onRender:we?.onRender},xe)},render(){let{mergedClsPrefix:e,type:t,placement:n,addTabFixed:r,addable:i,mergedSize:a,renderNameListRef:o,onRender:s,paneWrapperClass:c,paneWrapperStyle:l,$slots:{default:u,prefix:d,suffix:f}}=this;s?.();let p=u?J(u()).filter(e=>e.type.__TAB_PANE__===!0):[],m=u?J(u()).filter(e=>e.type.__TAB__===!0):[],g=!m.length,_=t===`card`,v=t===`segment`,y=!_&&!v&&this.justifyContent;o.value=[];let b=()=>{let t=U(`div`,{style:this.tabWrapperStyle,class:`${e}-tabs-wrapper`},y?null:U(`div`,{class:`${e}-tabs-scroll-padding`,style:n===`top`||n===`bottom`?{width:`${this.tabsPadding}px`}:{height:`${this.tabsPadding}px`}}),g?p.map((e,t)=>(o.value.push(e.props.name),dt(U(rt,Object.assign({},e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0&&(!y||y===`center`||y===`start`||y===`end`)}),e.children?{default:e.children.tab}:void 0)))):m.map((e,t)=>(o.value.push(e.props.name),dt(t!==0&&!y?ut(e):e))),!r&&i&&_?lt(i,(g?p.length:m.length)!==0):null,y?null:U(`div`,{class:`${e}-tabs-scroll-padding`,style:{width:`${this.tabsPadding}px`}}));return U(`div`,{ref:`tabsElRef`,class:`${e}-tabs-nav-scroll-content`},_&&i?U(W,{onResize:this.handleTabsResize},{default:()=>t}):t,_?U(`div`,{class:`${e}-tabs-pad`}):null,_?null:U(`div`,{ref:`barElRef`,class:`${e}-tabs-bar`}))},x=v?`top`:n;return U(`div`,{class:[`${e}-tabs`,this.themeClass,`${e}-tabs--${t}-type`,`${e}-tabs--${a}-size`,y&&`${e}-tabs--flex`,`${e}-tabs--${x}`],style:this.cssVars},U(`div`,{class:[`${e}-tabs-nav--${t}-type`,`${e}-tabs-nav--${x}`,`${e}-tabs-nav`]},h(d,t=>t&&U(`div`,{class:`${e}-tabs-nav__prefix`},t)),v?U(W,{onResize:this.handleSegmentResize},{default:()=>U(`div`,{class:`${e}-tabs-rail`,ref:`tabsElRef`},U(`div`,{class:`${e}-tabs-capsule`,ref:`segmentCapsuleElRef`},U(`div`,{class:`${e}-tabs-wrapper`},U(`div`,{class:`${e}-tabs-tab`}))),g?p.map((e,t)=>(o.value.push(e.props.name),U(rt,Object.assign({},e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0}),e.children?{default:e.children.tab}:void 0))):m.map((e,t)=>(o.value.push(e.props.name),t===0?e:ut(e))))}):U(W,{onResize:this.handleNavResize},{default:()=>U(`div`,{class:`${e}-tabs-nav-scroll-wrapper`,ref:`scrollWrapperElRef`},[`top`,`bottom`].includes(x)?U(Oe,{ref:`xScrollInstRef`,onScroll:this.handleScroll},{default:b}):U(`div`,{class:`${e}-tabs-nav-y-scroll`,onScroll:this.handleScroll,ref:`yScrollElRef`},b()))}),r&&i&&_?lt(i,!0):null,h(f,t=>t&&U(`div`,{class:`${e}-tabs-nav__suffix`},t))),g&&(this.animated&&(x===`top`||x===`bottom`)?U(`div`,{ref:`tabsPaneWrapperRef`,style:l,class:[`${e}-tabs-pane-wrapper`,c]},ct(p,this.mergedValue,this.renderedNames,this.onAnimationBeforeLeave,this.onAnimationEnter,this.onAnimationAfterEnter,this.animationDirection)):ct(p,this.mergedValue,this.renderedNames)))}});function ct(e,t,n,r,i,a,o){let s=[];return e.forEach(e=>{let{name:r,displayDirective:i,"display-directive":a}=e.props,o=e=>i===e||a===e,c=t===r;if(e.key!==void 0&&(e.key=r),c||o(`show`)||o(`show:lazy`)&&n.has(r)){n.has(r)||n.add(r);let t=!o(`if`);s.push(t?oe(e,[[y,c]]):e)}}),o?U(O,{name:`${o}-transition`,onBeforeLeave:r,onEnter:i,onAfterEnter:a},{default:()=>s}):s}function lt(e,t){return U(rt,{ref:`addTabInstRef`,key:`__addable`,name:`__addable`,internalCreatedByPane:!0,internalAddable:!0,internalLeftPadded:t,disabled:typeof e==`object`&&e.disabled})}function ut(e){let t=F(e);return t.props?t.props.internalLeftPadded=!0:t.props={internalLeftPadded:!0},t}function dt(e){return Array.isArray(e.dynamicProps)?e.dynamicProps.includes(`internalLeftPadded`)||e.dynamicProps.push(`internalLeftPadded`):e.dynamicProps=[`internalLeftPadded`],e}var ft={key:1,class:`tab-loading`},pt=ae(f({__name:`DockerView`,setup(n){let{t:r}=re(),i=we();function s(e){return e instanceof ee&&e.status===503&&!!e.body&&typeof e.body==`object`&&`enabled`in e.body}function c(e,t){i.error(e instanceof ee?e.message:t)}let l=e=>e===`running`?`success`:e===`paused`||e===`restarting`?`warning`:e===`dead`?`error`:`default`,f={running:0,restarting:1,paused:2,created:3,exited:4,dead:5};function p(e){return f[e.state]??6}function h(e,t){return e.hasStats?t(e.stats):-1}let g=V([]),v=V(!0),y=V(null),b;async function x(){try{let e=await Z.containers();g.value=e.containers,y.value=null}catch(e){s(e)&&(y.value=e.body)}finally{v.value=!1}}async function S(e,t){try{let n=await Z.containerAction(e,t);g.value=n.containers}catch(e){c(e,r(`docker.actionFailed`,{action:t}))}}let C=t(()=>[{title:r(`common.name`),key:`name`,width:160,ellipsis:{tooltip:!0},sorter:(e,t)=>e.name.localeCompare(t.name)},{title:`Image`,key:`image`,width:180,ellipsis:{tooltip:!0},sorter:(e,t)=>e.image.localeCompare(t.image)},{title:`Status`,key:`state`,width:130,sorter:(e,t)=>p(e)-p(t),render:e=>U(xe,{type:l(e.state),size:`small`},{default:()=>e.status})},{title:`CPU`,key:`cpu`,width:70,sorter:(e,t)=>h(e,e=>e.cpuPercent)-h(t,e=>e.cpuPercent),render:e=>e.hasStats?`${e.stats.cpuPercent.toFixed(1)}%`:`—`},{title:`RAM`,key:`ram`,width:150,sorter:(e,t)=>h(e,e=>e.memUsageBytes)-h(t,e=>e.memUsageBytes),render:e=>e.hasStats?`${Q(e.stats.memUsageBytes)} / ${Q(e.stats.memLimitBytes)}`:`—`},{title:`Network`,key:`net`,width:140,sorter:(e,t)=>h(e,e=>e.netRxBytes+e.netTxBytes)-h(t,e=>e.netRxBytes+e.netTxBytes),render:e=>e.hasStats?`↓ ${Q(e.stats.netRxBytes)} ↑ ${Q(e.stats.netTxBytes)}`:`—`},{title:`Ports`,key:`ports`,width:220,ellipsis:{tooltip:!0}},{title:r(`common.actions`),key:`actions`,width:220,render:e=>U(Te,{size:`small`},()=>[e.state===`running`?[U(E,{size:`tiny`,onClick:()=>S(e.id,`stop`)},()=>`Stop`),U(E,{size:`tiny`,onClick:()=>S(e.id,`restart`)},()=>`Restart`)]:U(E,{size:`tiny`,type:`primary`,onClick:()=>S(e.id,`start`)},()=>`Start`),U(X,{onPositiveClick:()=>S(e.id,`remove`)},{trigger:()=>U(E,{size:`tiny`,type:`error`,ghost:!0},()=>r(`common.delete`)),default:()=>r(`docker.confirmDeleteContainer`,{name:e.name})})])}]),O=V([]),k=V(!0),A=V(null);async function j(){k.value=!0;try{let e=await Z.images();O.value=e.images,A.value=null}catch(e){s(e)&&(A.value=e.body)}finally{k.value=!1}}async function M(e){try{let t=await Z.removeImage(e);O.value=t.images}catch(e){c(e,r(`docker.removeImageFailed`))}}let te=t(()=>[{title:`Tag`,key:`tag`,minWidth:200,ellipsis:{tooltip:!0},sorter:(e,t)=>e.tag.localeCompare(t.tag),render:e=>e.dangling?U(Te,{size:`small`,align:`center`},()=>[e.tag,U(xe,{size:`small`,type:`warning`},()=>`dangling`)]):e.tag},{title:r(`common.size`),key:`sizeBytes`,width:110,sorter:(e,t)=>e.sizeBytes-t.sizeBytes,render:e=>Q(e.sizeBytes)},{title:r(`docker.usedColumn`),key:`containers`,width:140,sorter:(e,t)=>e.containers-t.containers,render:e=>e.containers<0?`—`:e.containers===0?r(`docker.notUsed`):r(`docker.containerCount`,{count:e.containers})},{title:r(`docker.created`),key:`created`,width:150,sorter:(e,t)=>Date.parse(e.created)-Date.parse(t.created),render:e=>Ee(e.created)},{title:r(`common.actions`),key:`actions`,width:100,render:e=>U(X,{onPositiveClick:()=>M(e.id)},{trigger:()=>U(E,{size:`tiny`,type:`error`,ghost:!0},()=>r(`common.delete`)),default:()=>r(`docker.confirmDeleteImage`,{tag:e.tag})})}]),P=V([]),ne=V(!0),F=V(null);async function ie(){ne.value=!0;try{let e=await Z.volumes();P.value=e.volumes,F.value=null}catch(e){s(e)&&(F.value=e.body)}finally{ne.value=!1}}async function ae(e){try{let t=await Z.removeVolume(e);P.value=t.volumes}catch(e){c(e,r(`docker.removeVolumeFailed`))}}let oe=t(()=>[{title:r(`common.name`),key:`name`,minWidth:180,ellipsis:{tooltip:!0},sorter:(e,t)=>e.name.localeCompare(t.name)},{title:`Driver`,key:`driver`,width:100,sorter:(e,t)=>e.driver.localeCompare(t.driver)},{title:r(`common.size`),key:`sizeBytes`,width:110,sorter:(e,t)=>e.sizeBytes-t.sizeBytes,render:e=>e.sizeBytes<0?r(`docker.unknown`):Q(e.sizeBytes)},{title:`Status`,key:`inUse`,width:120,sorter:(e,t)=>Number(e.inUse)-Number(t.inUse),render:e=>U(xe,{size:`small`,type:e.inUse?`success`:`default`},()=>e.inUse?r(`docker.used`):r(`docker.notUsed`))},{title:r(`common.actions`),key:`actions`,width:100,render:e=>U(X,{onPositiveClick:()=>ae(e.name)},{trigger:()=>U(E,{size:`tiny`,type:`error`,ghost:!0},()=>r(`common.delete`)),default:()=>r(`docker.confirmDeleteVolume`,{name:e.name})})}]),I=V([]),L=V(!0),R=V(null);async function se(){L.value=!0;try{let e=await Z.networks();I.value=e.networks,R.value=null}catch(e){s(e)&&(R.value=e.body)}finally{L.value=!1}}async function z(e){try{let t=await Z.removeNetwork(e);I.value=t.networks}catch(e){c(e,r(`docker.removeNetworkFailed`))}}let le=t(()=>[{title:r(`common.name`),key:`name`,minWidth:160,ellipsis:{tooltip:!0},sorter:(e,t)=>e.name.localeCompare(t.name),render:e=>e.builtin?U(Te,{size:`small`,align:`center`},()=>[e.name,U(xe,{size:`small`},()=>`builtin`)]):e.name},{title:`Driver`,key:`driver`,width:100,sorter:(e,t)=>e.driver.localeCompare(t.driver)},{title:`Subnet`,key:`subnet`,width:150,sorter:(e,t)=>e.subnet.localeCompare(t.subnet),render:e=>e.subnet||`—`},{title:r(`docker.connectedContainers`),key:`connectedCount`,width:170,sorter:(e,t)=>e.connectedCount-t.connectedCount},{title:r(`common.actions`),key:`actions`,width:100,render:e=>e.builtin?null:U(X,{onPositiveClick:()=>z(e.id)},{trigger:()=>U(E,{size:`tiny`,type:`error`,ghost:!0},()=>r(`common.delete`)),default:()=>r(`docker.confirmDeleteNetwork`,{name:e.name})})}]),B=V(null),ue=V(!0),W=V(null),de=V(null);async function fe(){ue.value=!0;try{B.value=await Z.settings(),W.value=null}catch(e){s(e)&&(W.value=e.body)}finally{ue.value=!1}}async function G(e){de.value=e;try{B.value=await Z.prune(e),i.success(r(`docker.cleanupDone`))}catch(t){c(t,r(`docker.cleanupFailed`,{kind:e}))}finally{de.value=null}}let K=V(`containers`),J=new Set([`containers`]);return ce(K,e=>{J.has(e)||(J.add(e),e===`images`?j():e===`volumes`?ie():e===`networks`?se():e===`settings`&&fe())}),d(()=>{x(),b=setInterval(x,5e3)}),w(()=>{b&&clearInterval(b)}),(t,n)=>(T(),m(pe,null,{default:D(()=>[u(N(st),{type:`line`,value:K.value,"onUpdate:value":n[0]||=e=>K.value=e},{default:D(()=>[u(N(tt),{name:`containers`,tab:`Containers`},{default:D(()=>[y.value?(T(),m(N(Y),{key:0,type:`warning`,title:y.value.error},null,8,[`title`])):(T(),m(N(he),{key:1,columns:C.value,data:g.value,loading:v.value,"row-key":e=>e.id,"scroll-x":1200},null,8,[`columns`,`data`,`loading`,`row-key`]))]),_:1}),u(N(tt),{name:`images`,tab:`Images`},{default:D(()=>[A.value?(T(),m(N(Y),{key:0,type:`warning`,title:A.value.error},null,8,[`title`])):(T(),m(N(he),{key:1,columns:te.value,data:O.value,loading:k.value,"row-key":e=>e.id,"scroll-x":700},null,8,[`columns`,`data`,`loading`,`row-key`]))]),_:1}),u(N(tt),{name:`volumes`,tab:`Volumes`},{default:D(()=>[F.value?(T(),m(N(Y),{key:0,type:`warning`,title:F.value.error},null,8,[`title`])):(T(),m(N(he),{key:1,columns:oe.value,data:P.value,loading:ne.value,"row-key":e=>e.name,"scroll-x":610},null,8,[`columns`,`data`,`loading`,`row-key`]))]),_:1}),u(N(tt),{name:`networks`,tab:`Networks`},{default:D(()=>[R.value?(T(),m(N(Y),{key:0,type:`warning`,title:R.value.error},null,8,[`title`])):(T(),m(N(he),{key:1,columns:le.value,data:I.value,loading:L.value,"row-key":e=>e.id,"scroll-x":680},null,8,[`columns`,`data`,`loading`,`row-key`]))]),_:1}),u(N(tt),{name:`settings`,tab:`Settings`},{default:D(()=>[W.value?(T(),m(N(Y),{key:0,type:`warning`,title:W.value.error},null,8,[`title`])):ue.value&&!B.value?(T(),_(`div`,ft,[u(N(me),{size:`large`})])):B.value?(T(),m(N(Te),{key:3,vertical:``,size:24},{default:D(()=>[u(N(Ze),{title:N(r)(`docker.daemonInfo`),column:2,bordered:``,"label-placement":`left`},{default:D(()=>[u(N($),{label:N(r)(`docker.serverVersion`)},{default:D(()=>[o(H(B.value?.info.serverVersion),1)]),_:1},8,[`label`]),u(N($),{label:`OS / Kernel`},{default:D(()=>[o(H(B.value?.info.operatingSystem)+` / `+H(B.value?.info.kernelVersion),1)]),_:1}),u(N($),{label:`Storage Driver`},{default:D(()=>[o(H(B.value?.info.storageDriver),1)]),_:1}),u(N($),{label:`Root Dir`},{default:D(()=>[o(H(B.value?.info.dockerRootDir),1)]),_:1}),u(N($),{label:`Container`},{default:D(()=>[o(H(B.value?.info.containersRunning)+` running, `+H(B.value?.info.containersPaused)+` paused, `+H(B.value?.info.containersStopped)+` stopped `,1)]),_:1}),u(N($),{label:`Images`},{default:D(()=>[o(H(B.value?.info.images),1)]),_:1})]),_:1},8,[`title`]),u(N(Ze),{title:`Disk Usage`,column:2,bordered:``,"label-placement":`left`},{default:D(()=>[u(N($),{label:`Images`},{default:D(()=>[o(H(N(Q)(B.value?.diskUsage.imagesTotalBytes??0))+` (reclaimable `+H(N(Q)(B.value?.diskUsage.imagesReclaimableBytes??0))+`) `,1)]),_:1}),u(N($),{label:`Containers`},{default:D(()=>[o(H(N(Q)(B.value?.diskUsage.containersTotalBytes??0)),1)]),_:1}),u(N($),{label:`Volumes`},{default:D(()=>[o(H(N(Q)(B.value?.diskUsage.volumesTotalBytes??0))+` (reclaimable `+H(N(Q)(B.value?.diskUsage.volumesReclaimableBytes??0))+`) `,1)]),_:1})]),_:1}),u(N(Te),null,{default:D(()=>[(T(),_(a,null,e([`containers`,`images`,`volumes`,`networks`,`all`],e=>u(N(X),{key:e,onPositiveClick:t=>G(e)},{trigger:D(()=>[u(N(E),{size:`small`,loading:de.value===e},{default:D(()=>[o(H(N(r)(`docker.cleanup`))+` `+H(e),1)]),_:2},1032,[`loading`])]),default:D(()=>[o(` `+H(N(r)(`docker.confirmCleanup`,{kind:e})),1)]),_:2},1032,[`onPositiveClick`])),64))]),_:1})]),_:1})):(T(),m(N(q),{key:2,description:N(r)(`docker.noData`)},null,8,[`description`]))]),_:1})]),_:1},8,[`value`])]),_:1}))}}),[[`__scopeId`,`data-v-f59f7e6d`]]);export{pt as default};