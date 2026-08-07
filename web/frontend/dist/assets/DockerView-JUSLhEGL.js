import{An as e,B as t,Bn as n,Ct as r,En as i,Fn as a,Ft as o,H as s,Hn as c,In as l,Jn as u,Ln as d,M as f,Mn as p,Mt as m,Nt as h,Pn as g,Qn as _,Sn as v,Vn as y,Vt as b,Wt as x,Xn as S,Xt as C,Zn as w,_ as T,ar as E,bn as D,bt as O,c as ee,cn as k,dn as A,fn as j,fr as M,gt as N,hn as P,hr as F,ir as I,kn as te,lr as L,m as ne,mn as re,nr as ie,o as ae,pn as R,pt as z,qn as oe,rn as B,rr as se,sn as V,tn as ce,un as H,vr as U,wt as W,zn as G,zt as K}from"./auth-FLVH1SR4.js";import{C as le,S as ue,g as de,h as q,t as fe,u as pe}from"./AppShell-DKIwdsuJ.js";import{r as J,t as me}from"./DataTable-B3WTf7qt.js";import{u as Y}from"./useTheme-D5VpTs75.js";import{s as he}from"./LocaleSwitcher-ClQYD6XY.js";import{n as ge,r as _e}from"./fade-in-scale-up.cssr-B7ZuX6V5.js";import{t as ve}from"./get-slot-6kXJmSMP.js";import{t as ye}from"./Add-CKAR0chR.js";import{t as be}from"./Tag-8pLq3Bnw.js";import{t as X}from"./Alert-Ch_dBlvi.js";import{n as xe,r as Se}from"./light-BhiTc6_5.js";import{t as Ce}from"./use-message-CEeG6D6-.js";import{t as we}from"./Space-DyEa9pC9.js";import{t as Te}from"./Popconfirm-CenqIrVX.js";import{t as Z}from"./docker-KFaQl-CC.js";import{n as Ee,t as Q}from"./format-BxLcbkc3.js";var De=q(`.v-x-scroll`,{overflow:`auto`,scrollbarWidth:`none`},[q(`&::-webkit-scrollbar`,{width:0,height:0})]),Oe=d({name:`XScroll`,props:{disabled:Boolean,onScroll:Function},setup(){let e=L(null);function t(e){!(e.currentTarget.offsetWidth<e.currentTarget.scrollWidth)||e.deltaY===0||(e.currentTarget.scrollLeft+=e.deltaY+e.deltaX,e.preventDefault())}let n=b();return De.mount({id:`vueuc/x-scroll`,head:!0,anchorMetaName:de,ssr:n}),Object.assign({selfRef:e,handleWheel:t},{scrollTo(...t){var n;(n=e.value)==null||n.scrollTo(...t)}})},render(){return G(`div`,{ref:`selfRef`,onScroll:this.onScroll,onWheel:this.disabled?void 0:this.handleWheel,class:`v-x-scroll`},this.$slots)}});function ke(e,t=`default`,n=[]){let{children:r}=e;if(typeof r==`object`&&r&&!Array.isArray(r)){let e=r[t];if(typeof e==`function`)return e()}return n}var Ae=/\s/;function je(e){for(var t=e.length;t--&&Ae.test(e.charAt(t)););return t}var Me=/^\s+/;function Ne(e){return e&&e.slice(0,je(e)+1).replace(Me,``)}var Pe=NaN,Fe=/^[-+]0x[0-9a-f]+$/i,Ie=/^0b[01]+$/i,Le=/^0o[0-7]+$/i,Re=parseInt;function ze(e){if(typeof e==`number`)return e;if(N(e))return Pe;if(z(e)){var t=typeof e.valueOf==`function`?e.valueOf():e;e=z(t)?t+``:t}if(typeof e!=`string`)return e===0?e:+e;e=Ne(e);var n=Ie.test(e);return n||Le.test(e)?Re(e.slice(2),n?2:8):Fe.test(e)?Pe:+e}var Be=function(){return O.Date.now()},Ve=`Expected a function`,He=Math.max,Ue=Math.min;function We(e,t,n){var r,i,a,o,s,c,l=0,u=!1,d=!1,f=!0;if(typeof e!=`function`)throw TypeError(Ve);t=ze(t)||0,z(n)&&(u=!!n.leading,d=`maxWait`in n,a=d?He(ze(n.maxWait)||0,t):a,f=`trailing`in n?!!n.trailing:f);function p(t){var n=r,a=i;return r=i=void 0,l=t,o=e.apply(a,n),o}function m(e){return l=e,s=setTimeout(_,t),u?p(e):o}function h(e){var n=e-c,r=e-l,i=t-n;return d?Ue(i,a-r):i}function g(e){var n=e-c,r=e-l;return c===void 0||n>=t||n<0||d&&r>=a}function _(){var e=Be();if(g(e))return v(e);s=setTimeout(_,h(e))}function v(e){return s=void 0,f&&r?p(e):(r=i=void 0,o)}function y(){s!==void 0&&clearTimeout(s),l=0,r=c=i=s=void 0}function b(){return s===void 0?o:v(Be())}function x(){var e=Be(),n=g(e);if(r=arguments,i=this,c=e,n){if(s===void 0)return m(c);if(d)return clearTimeout(s),s=setTimeout(_,t),p(c)}return s===void 0&&(s=setTimeout(_,t)),o}return x.cancel=y,x.flush=b,x}var Ge=`Expected a function`;function Ke(e,t,n){var r=!0,i=!0;if(typeof e!=`function`)throw TypeError(Ge);return z(n)&&(r=`leading`in n?!!n.leading:r,i=`trailing`in n?!!n.trailing:i),We(e,t,{leading:r,maxWait:t,trailing:i})}var qe=V([k(`descriptions`,{fontSize:`var(--n-font-size)`},[k(`descriptions-separator`,`
 display: inline-block;
 margin: 0 8px 0 2px;
 `),k(`descriptions-table-wrapper`,[k(`descriptions-table`,[k(`descriptions-table-row`,[k(`descriptions-table-header`,{padding:`var(--n-th-padding)`}),k(`descriptions-table-content`,{padding:`var(--n-td-padding)`})])])]),j(`bordered`,[k(`descriptions-table-wrapper`,[k(`descriptions-table`,[k(`descriptions-table-row`,[V(`&:last-child`,[k(`descriptions-table-content`,{paddingBottom:0})])])])])]),A(`left-label-placement`,[k(`descriptions-table-content`,[V(`> *`,{verticalAlign:`top`})])]),A(`left-label-align`,[V(`th`,{textAlign:`left`})]),A(`center-label-align`,[V(`th`,{textAlign:`center`})]),A(`right-label-align`,[V(`th`,{textAlign:`right`})]),A(`bordered`,[k(`descriptions-table-wrapper`,`
 border-radius: var(--n-border-radius);
 overflow: hidden;
 background: var(--n-merged-td-color);
 border: 1px solid var(--n-merged-border-color);
 `,[k(`descriptions-table`,[k(`descriptions-table-row`,[V(`&:not(:last-child)`,[k(`descriptions-table-content`,{borderBottom:`1px solid var(--n-merged-border-color)`}),k(`descriptions-table-header`,{borderBottom:`1px solid var(--n-merged-border-color)`})]),k(`descriptions-table-header`,`
 font-weight: 400;
 background-clip: padding-box;
 background-color: var(--n-merged-th-color);
 `,[V(`&:not(:last-child)`,{borderRight:`1px solid var(--n-merged-border-color)`})]),k(`descriptions-table-content`,[V(`&:not(:last-child)`,{borderRight:`1px solid var(--n-merged-border-color)`})])])])])]),k(`descriptions-header`,`
 font-weight: var(--n-th-font-weight);
 font-size: 18px;
 transition: color .3s var(--n-bezier);
 line-height: var(--n-line-height);
 margin-bottom: 16px;
 color: var(--n-title-text-color);
 `),k(`descriptions-table-wrapper`,`
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[k(`descriptions-table`,`
 width: 100%;
 border-collapse: separate;
 border-spacing: 0;
 box-sizing: border-box;
 `,[k(`descriptions-table-row`,`
 box-sizing: border-box;
 transition: border-color .3s var(--n-bezier);
 `,[k(`descriptions-table-header`,`
 font-weight: var(--n-th-font-weight);
 line-height: var(--n-line-height);
 display: table-cell;
 box-sizing: border-box;
 color: var(--n-th-text-color);
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `),k(`descriptions-table-content`,`
 vertical-align: top;
 line-height: var(--n-line-height);
 display: table-cell;
 box-sizing: border-box;
 color: var(--n-td-text-color);
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[H(`content`,`
 transition: color .3s var(--n-bezier);
 display: inline-block;
 color: var(--n-td-text-color);
 `)]),H(`label`,`
 font-weight: var(--n-th-font-weight);
 transition: color .3s var(--n-bezier);
 display: inline-block;
 margin-right: 14px;
 color: var(--n-th-text-color);
 `)])])])]),k(`descriptions-table-wrapper`,`
 --n-merged-th-color: var(--n-th-color);
 --n-merged-td-color: var(--n-td-color);
 --n-merged-border-color: var(--n-border-color);
 `),re(k(`descriptions-table-wrapper`,`
 --n-merged-th-color: var(--n-th-color-modal);
 --n-merged-td-color: var(--n-td-color-modal);
 --n-merged-border-color: var(--n-border-color-modal);
 `)),P(k(`descriptions-table-wrapper`,`
 --n-merged-th-color: var(--n-th-color-popover);
 --n-merged-td-color: var(--n-td-color-popover);
 --n-merged-border-color: var(--n-border-color-popover);
 `))]),Je=`DESCRIPTION_ITEM_FLAG`;function Ye(e){return typeof e==`object`&&e&&!Array.isArray(e)?e.type&&e.type.DESCRIPTION_ITEM_FLAG:!1}var Xe=Object.assign(Object.assign({},s.props),{title:String,column:{type:Number,default:3},columns:Number,labelPlacement:{type:String,default:`top`},labelAlign:{type:String,default:`left`},separator:{type:String,default:`:`},size:String,bordered:Boolean,labelClass:String,labelStyle:[Object,String],contentClass:String,contentStyle:[Object,String]}),Ze=d({name:`Descriptions`,props:Xe,slots:Object,setup(t){let{mergedClsPrefixRef:n,inlineThemeDisabled:i,mergedComponentPropsRef:a}=W(t),o=e(()=>t.size||a?.value?.Descriptions?.size||`medium`),c=s(`Descriptions`,`-descriptions`,qe,Se,t,n),l=e(()=>{let{bordered:e}=t,n=o.value,{common:{cubicBezierEaseInOut:r},self:{titleTextColor:i,thColor:a,thColorModal:s,thColorPopover:l,thTextColor:u,thFontWeight:d,tdTextColor:f,tdColor:p,tdColorModal:m,tdColorPopover:h,borderColor:g,borderColorModal:_,borderColorPopover:v,borderRadius:y,lineHeight:b,[R(`fontSize`,n)]:x,[R(e?`thPaddingBordered`:`thPadding`,n)]:S,[R(e?`tdPaddingBordered`:`tdPadding`,n)]:C}}=c.value;return{"--n-title-text-color":i,"--n-th-padding":S,"--n-td-padding":C,"--n-font-size":x,"--n-bezier":r,"--n-th-font-weight":d,"--n-line-height":b,"--n-th-text-color":u,"--n-td-text-color":f,"--n-th-color":a,"--n-th-color-modal":s,"--n-th-color-popover":l,"--n-td-color":p,"--n-td-color-modal":m,"--n-td-color-popover":h,"--n-border-radius":y,"--n-border-color":g,"--n-border-color-modal":_,"--n-border-color-popover":v}}),u=i?r(`descriptions`,e(()=>{let e=``,{bordered:n}=t;return n&&(e+=`a`),e+=o.value[0],e}),l,t):void 0;return{mergedClsPrefix:n,cssVars:i?void 0:l,themeClass:u?.themeClass,onRender:u?.onRender,compitableColumn:ue(t,[`columns`,`column`]),inlineThemeDisabled:i,mergedSize:o}},render(){let e=this.$slots.default,t=e?Y(e()):[];t.length;let{contentClass:n,labelClass:r,compitableColumn:i,labelPlacement:a,labelAlign:o,mergedSize:s,bordered:c,title:l,cssVars:u,mergedClsPrefix:d,separator:f,onRender:p}=this;p?.();let m=t.filter(e=>Ye(e)),h=m.reduce((e,t,o)=>{let s=t.props||{},l=m.length-1===o,u=[`label`in s?s.label:ke(t,`label`)],p=[ke(t)],h=s.span||1,g=e.span;e.span+=h;let _=s.labelStyle||s[`label-style`]||this.labelStyle,v=s.contentStyle||s[`content-style`]||this.contentStyle;if(a===`left`)c?e.row.push(G(`th`,{class:[`${d}-descriptions-table-header`,r],colspan:1,style:_},u),G(`td`,{class:[`${d}-descriptions-table-content`,n],colspan:l?(i-g)*2+1:h*2-1,style:v},p)):e.row.push(G(`td`,{class:`${d}-descriptions-table-content`,colspan:l?(i-g)*2:h*2},G(`span`,{class:[`${d}-descriptions-table-content__label`,r],style:_},[...u,f&&G(`span`,{class:`${d}-descriptions-separator`},f)]),G(`span`,{class:[`${d}-descriptions-table-content__content`,n],style:v},p)));else{let t=l?(i-g)*2:h*2;e.row.push(G(`th`,{class:[`${d}-descriptions-table-header`,r],colspan:t,style:_},u)),e.secondRow.push(G(`td`,{class:[`${d}-descriptions-table-content`,n],colspan:t,style:v},p))}return(e.span>=i||l)&&(e.span=0,e.row.length&&(e.rows.push(e.row),e.row=[]),a!==`left`&&e.secondRow.length&&(e.rows.push(e.secondRow),e.secondRow=[])),e},{span:0,row:[],secondRow:[],rows:[]}).rows.map(e=>G(`tr`,{class:`${d}-descriptions-table-row`},e));return G(`div`,{style:u,class:[`${d}-descriptions`,this.themeClass,`${d}-descriptions--${a}-label-placement`,`${d}-descriptions--${o}-label-align`,`${d}-descriptions--${s}-size`,c&&`${d}-descriptions--bordered`]},l||this.$slots.header?G(`div`,{class:`${d}-descriptions-header`},l||ve(this,`header`)):null,G(`div`,{class:`${d}-descriptions-table-wrapper`},G(`table`,{class:`${d}-descriptions-table`},G(`tbody`,null,a===`top`&&G(`tr`,{class:`${d}-descriptions-table-row`,style:{visibility:`collapse`}},C(i*2,G(`td`,null))),h))))}}),Qe={label:String,span:{type:Number,default:1},labelClass:String,labelStyle:[Object,String],contentClass:String,contentStyle:[Object,String]},$=d({name:`DescriptionsItem`,[Je]:!0,props:Qe,slots:Object,render(){return null}}),$e=x(`n-tabs`),et={tab:[String,Number,Object,Function],name:{type:[String,Number],required:!0},disabled:Boolean,displayDirective:{type:String,default:`if`},closable:{type:Boolean,default:void 0},tabProps:Object,label:[String,Number,Object,Function]},tt=d({__TAB_PANE__:!0,name:`TabPane`,alias:[`TabPanel`],props:et,slots:Object,setup(e){let t=n($e,null);return t||o(`tab-pane`,"`n-tab-pane` must be placed inside `n-tabs`."),{style:t.paneStyleRef,class:t.paneClassRef,mergedClsPrefix:t.mergedClsPrefixRef}},render(){return G(`div`,{class:[`${this.mergedClsPrefix}-tab-pane`,this.class],style:this.style},this.$slots)}}),nt=Object.assign({internalLeftPadded:Boolean,internalAddable:Boolean,internalCreatedByPane:Boolean},_e(et,[`displayDirective`])),rt=d({__TAB__:!0,inheritAttrs:!1,name:`Tab`,props:nt,setup(t){let{mergedClsPrefixRef:r,valueRef:i,typeRef:a,closableRef:o,tabStyleRef:s,addTabStyleRef:c,tabClassRef:l,addTabClassRef:u,tabChangeIdRef:d,onBeforeLeaveRef:f,triggerRef:p,handleAdd:m,activateTab:h,handleClose:g}=n($e);return{trigger:p,mergedClosable:e(()=>{if(t.internalAddable)return!1;let{closable:e}=t;return e===void 0?o.value:e}),style:s,addStyle:c,tabClass:l,addTabClass:u,clsPrefix:r,value:i,type:a,handleClose(e){e.stopPropagation(),!t.disabled&&g(t.name)},activateTab(){if(t.disabled)return;if(t.internalAddable){m();return}let{name:e}=t,n=++d.id;if(e!==i.value){let{value:r}=f;r?Promise.resolve(r(t.name,i.value)).then(t=>{t&&d.id===n&&h(e)}):h(e)}}}},render(){let{internalAddable:e,clsPrefix:n,name:r,disabled:a,label:o,tab:s,value:c,mergedClosable:l,trigger:u,$slots:{default:d}}=this,p=o??s;return G(`div`,{class:`${n}-tabs-tab-wrapper`},this.internalLeftPadded?G(`div`,{class:`${n}-tabs-tab-pad`}):null,G(`div`,Object.assign({key:r,"data-name":r,"data-disabled":a?!0:void 0},y({class:[`${n}-tabs-tab`,c===r&&`${n}-tabs-tab--active`,a&&`${n}-tabs-tab--disabled`,l&&`${n}-tabs-tab--closable`,e&&`${n}-tabs-tab--addable`,e?this.addTabClass:this.tabClass],onClick:u===`click`?this.activateTab:void 0,onMouseenter:u===`hover`?this.activateTab:void 0,style:e?this.addStyle:this.style},this.internalCreatedByPane?this.tabProps||{}:this.$attrs)),G(`span`,{class:`${n}-tabs-tab__label`},e?G(i,null,G(`div`,{class:`${n}-tabs-tab__height-placeholder`},`\xA0`),G(t,{clsPrefix:n},{default:()=>G(ye,null)})):d?d():typeof p==`object`?p:ge(p??r)),l&&this.type===`card`?G(f,{clsPrefix:n,class:`${n}-tabs-tab__close`,onClick:this.handleClose,disabled:a}):null))}}),it=k(`tabs`,`
 box-sizing: border-box;
 width: 100%;
 display: flex;
 flex-direction: column;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
`,[A(`segment-type`,[k(`tabs-rail`,[V(`&.transition-disabled`,[k(`tabs-capsule`,`
 transition: none;
 `)])])]),A(`top`,[k(`tab-pane`,`
 padding: var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left);
 `)]),A(`left`,[k(`tab-pane`,`
 padding: var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left) var(--n-pane-padding-top);
 `)]),A(`left, right`,`
 flex-direction: row;
 `,[k(`tabs-bar`,`
 width: 2px;
 right: 0;
 transition:
 top .2s var(--n-bezier),
 max-height .2s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `),k(`tabs-tab`,`
 padding: var(--n-tab-padding-vertical); 
 `)]),A(`right`,`
 flex-direction: row-reverse;
 `,[k(`tab-pane`,`
 padding: var(--n-pane-padding-left) var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom);
 `),k(`tabs-bar`,`
 left: 0;
 `)]),A(`bottom`,`
 flex-direction: column-reverse;
 justify-content: flex-end;
 `,[k(`tab-pane`,`
 padding: var(--n-pane-padding-bottom) var(--n-pane-padding-right) var(--n-pane-padding-top) var(--n-pane-padding-left);
 `),k(`tabs-bar`,`
 top: 0;
 `)]),k(`tabs-rail`,`
 position: relative;
 padding: 3px;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 background-color: var(--n-color-segment);
 transition: background-color .3s var(--n-bezier);
 display: flex;
 align-items: center;
 `,[k(`tabs-capsule`,`
 border-radius: var(--n-tab-border-radius);
 position: absolute;
 pointer-events: none;
 background-color: var(--n-tab-color-segment);
 box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .08);
 transition: transform 0.3s var(--n-bezier);
 `),k(`tabs-tab-wrapper`,`
 flex-basis: 0;
 flex-grow: 1;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[k(`tabs-tab`,`
 overflow: hidden;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[A(`active`,`
 font-weight: var(--n-font-weight-strong);
 color: var(--n-tab-text-color-active);
 `),V(`&:hover`,`
 color: var(--n-tab-text-color-hover);
 `)])])]),A(`flex`,[k(`tabs-nav`,`
 width: 100%;
 position: relative;
 `,[k(`tabs-wrapper`,`
 width: 100%;
 `,[k(`tabs-tab`,`
 margin-right: 0;
 `)])])]),k(`tabs-nav`,`
 box-sizing: border-box;
 line-height: 1.5;
 display: flex;
 transition: border-color .3s var(--n-bezier);
 `,[H(`prefix, suffix`,`
 display: flex;
 align-items: center;
 `),H(`prefix`,`padding-right: 16px;`),H(`suffix`,`padding-left: 16px;`)]),A(`top, bottom`,[V(`>`,[k(`tabs-nav`,[k(`tabs-nav-scroll-wrapper`,[V(`&::before`,`
 top: 0;
 bottom: 0;
 left: 0;
 width: 20px;
 `),V(`&::after`,`
 top: 0;
 bottom: 0;
 right: 0;
 width: 20px;
 `),A(`shadow-start`,[V(`&::before`,`
 box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, .12);
 `)]),A(`shadow-end`,[V(`&::after`,`
 box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),A(`left, right`,[k(`tabs-nav-scroll-content`,`
 flex-direction: column;
 `),V(`>`,[k(`tabs-nav`,[k(`tabs-nav-scroll-wrapper`,[V(`&::before`,`
 top: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),V(`&::after`,`
 bottom: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),A(`shadow-start`,[V(`&::before`,`
 box-shadow: inset 0 10px 8px -8px rgba(0, 0, 0, .12);
 `)]),A(`shadow-end`,[V(`&::after`,`
 box-shadow: inset 0 -10px 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),k(`tabs-nav-scroll-wrapper`,`
 flex: 1;
 position: relative;
 overflow: hidden;
 `,[k(`tabs-nav-y-scroll`,`
 height: 100%;
 width: 100%;
 overflow-y: auto; 
 scrollbar-width: none;
 `,[V(`&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb`,`
 width: 0;
 height: 0;
 display: none;
 `)]),V(`&::before, &::after`,`
 transition: box-shadow .3s var(--n-bezier);
 pointer-events: none;
 content: "";
 position: absolute;
 z-index: 1;
 `)]),k(`tabs-nav-scroll-content`,`
 display: flex;
 position: relative;
 min-width: 100%;
 min-height: 100%;
 width: fit-content;
 box-sizing: border-box;
 `),k(`tabs-wrapper`,`
 display: inline-flex;
 flex-wrap: nowrap;
 position: relative;
 `),k(`tabs-tab-wrapper`,`
 display: flex;
 flex-wrap: nowrap;
 flex-shrink: 0;
 flex-grow: 0;
 `),k(`tabs-tab`,`
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
 `,[A(`disabled`,{cursor:`not-allowed`}),H(`close`,`
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),H(`label`,`
 display: flex;
 align-items: center;
 z-index: 1;
 `)]),k(`tabs-bar`,`
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
 `,[V(`&.transition-disabled`,`
 transition: none;
 `),A(`disabled`,`
 background-color: var(--n-tab-text-color-disabled)
 `)]),k(`tabs-pane-wrapper`,`
 position: relative;
 overflow: hidden;
 transition: max-height .2s var(--n-bezier);
 `),k(`tab-pane`,`
 color: var(--n-pane-text-color);
 width: 100%;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 opacity .2s var(--n-bezier);
 left: 0;
 right: 0;
 top: 0;
 `,[V(`&.next-transition-leave-active, &.prev-transition-leave-active, &.next-transition-enter-active, &.prev-transition-enter-active`,`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 transform .2s var(--n-bezier),
 opacity .2s var(--n-bezier);
 `),V(`&.next-transition-leave-active, &.prev-transition-leave-active`,`
 position: absolute;
 `),V(`&.next-transition-enter-from, &.prev-transition-leave-to`,`
 transform: translateX(32px);
 opacity: 0;
 `),V(`&.next-transition-leave-to, &.prev-transition-enter-from`,`
 transform: translateX(-32px);
 opacity: 0;
 `),V(`&.next-transition-leave-from, &.next-transition-enter-to, &.prev-transition-leave-from, &.prev-transition-enter-to`,`
 transform: translateX(0);
 opacity: 1;
 `)]),k(`tabs-tab-pad`,`
 box-sizing: border-box;
 width: var(--n-tab-gap);
 flex-grow: 0;
 flex-shrink: 0;
 `),A(`line-type, bar-type`,[k(`tabs-tab`,`
 font-weight: var(--n-tab-font-weight);
 box-sizing: border-box;
 vertical-align: bottom;
 `,[V(`&:hover`,{color:`var(--n-tab-text-color-hover)`}),A(`active`,`
 color: var(--n-tab-text-color-active);
 font-weight: var(--n-tab-font-weight-active);
 `),A(`disabled`,{color:`var(--n-tab-text-color-disabled)`})])]),k(`tabs-nav`,[A(`line-type`,[A(`top`,[H(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),k(`tabs-nav-scroll-content`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),k(`tabs-bar`,`
 bottom: -1px;
 `)]),A(`left`,[H(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),k(`tabs-nav-scroll-content`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),k(`tabs-bar`,`
 right: -1px;
 `)]),A(`right`,[H(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),k(`tabs-nav-scroll-content`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),k(`tabs-bar`,`
 left: -1px;
 `)]),A(`bottom`,[H(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),k(`tabs-nav-scroll-content`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),k(`tabs-bar`,`
 top: -1px;
 `)]),H(`prefix, suffix`,`
 transition: border-color .3s var(--n-bezier);
 `),k(`tabs-nav-scroll-content`,`
 transition: border-color .3s var(--n-bezier);
 `),k(`tabs-bar`,`
 border-radius: 0;
 `)]),A(`card-type`,[H(`prefix, suffix`,`
 transition: border-color .3s var(--n-bezier);
 `),k(`tabs-pad`,`
 flex-grow: 1;
 transition: border-color .3s var(--n-bezier);
 `),k(`tabs-tab-pad`,`
 transition: border-color .3s var(--n-bezier);
 `),k(`tabs-tab`,`
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
 `,[A(`addable`,`
 padding-left: 8px;
 padding-right: 8px;
 font-size: 16px;
 justify-content: center;
 `,[H(`height-placeholder`,`
 width: 0;
 font-size: var(--n-tab-font-size);
 `),j(`disabled`,[V(`&:hover`,`
 color: var(--n-tab-text-color-hover);
 `)])]),A(`closable`,`padding-right: 8px;`),A(`active`,`
 background-color: #0000;
 font-weight: var(--n-tab-font-weight-active);
 color: var(--n-tab-text-color-active);
 `),A(`disabled`,`color: var(--n-tab-text-color-disabled);`)])]),A(`left, right`,`
 flex-direction: column; 
 `,[H(`prefix, suffix`,`
 padding: var(--n-tab-padding-vertical);
 `),k(`tabs-wrapper`,`
 flex-direction: column;
 `),k(`tabs-tab-wrapper`,`
 flex-direction: column;
 `,[k(`tabs-tab-pad`,`
 height: var(--n-tab-gap-vertical);
 width: 100%;
 `)])]),A(`top`,[A(`card-type`,[k(`tabs-scroll-padding`,`border-bottom: 1px solid var(--n-tab-border-color);`),H(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),k(`tabs-tab`,`
 border-top-left-radius: var(--n-tab-border-radius);
 border-top-right-radius: var(--n-tab-border-radius);
 `,[A(`active`,`
 border-bottom: 1px solid #0000;
 `)]),k(`tabs-tab-pad`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),k(`tabs-pad`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `)])]),A(`left`,[A(`card-type`,[k(`tabs-scroll-padding`,`border-right: 1px solid var(--n-tab-border-color);`),H(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),k(`tabs-tab`,`
 border-top-left-radius: var(--n-tab-border-radius);
 border-bottom-left-radius: var(--n-tab-border-radius);
 `,[A(`active`,`
 border-right: 1px solid #0000;
 `)]),k(`tabs-tab-pad`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),k(`tabs-pad`,`
 border-right: 1px solid var(--n-tab-border-color);
 `)])]),A(`right`,[A(`card-type`,[k(`tabs-scroll-padding`,`border-left: 1px solid var(--n-tab-border-color);`),H(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),k(`tabs-tab`,`
 border-top-right-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[A(`active`,`
 border-left: 1px solid #0000;
 `)]),k(`tabs-tab-pad`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),k(`tabs-pad`,`
 border-left: 1px solid var(--n-tab-border-color);
 `)])]),A(`bottom`,[A(`card-type`,[k(`tabs-scroll-padding`,`border-top: 1px solid var(--n-tab-border-color);`),H(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),k(`tabs-tab`,`
 border-bottom-left-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[A(`active`,`
 border-top: 1px solid #0000;
 `)]),k(`tabs-tab-pad`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),k(`tabs-pad`,`
 border-top: 1px solid var(--n-tab-border-color);
 `)])])])]),at=Ke,ot=Object.assign(Object.assign({},s.props),{value:[String,Number],defaultValue:[String,Number],trigger:{type:String,default:`click`},type:{type:String,default:`bar`},closable:Boolean,justifyContent:String,size:String,placement:{type:String,default:`top`},tabStyle:[String,Object],tabClass:String,addTabStyle:[String,Object],addTabClass:String,barWidth:Number,paneClass:String,paneStyle:[String,Object],paneWrapperClass:String,paneWrapperStyle:[String,Object],addable:[Boolean,Object],tabsPadding:{type:Number,default:0},animated:Boolean,onBeforeLeave:Function,onAdd:Function,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onClose:[Function,Array],labelSize:String,activeName:[String,Number],onActiveNameChange:[Function,Array]}),st=d({name:`Tabs`,props:ot,slots:Object,setup(t,{slots:n}){let{mergedClsPrefixRef:i,inlineThemeDisabled:a,mergedComponentPropsRef:o}=W(t),l=s(`Tabs`,`-tabs`,it,xe,t,i),u=L(null),d=L(null),f=L(null),p=L(null),m=L(null),g=L(null),_=L(!0),v=L(!0),y=ue(t,[`labelSize`,`size`]),b=e(()=>y.value?y.value:o?.value?.Tabs?.size||`medium`),x=ue(t,[`activeName`,`value`]),S=L(x.value??t.defaultValue??(n.default?Y(n.default())[0]?.props?.name:null)),C=he(x,S),T={id:0},E=e(()=>{if(!(!t.justifyContent||t.type===`card`))return{display:`flex`,justifyContent:t.justifyContent}});ie(C,()=>{T.id=0,A(),j()});function D(){let{value:e}=C;return e===null?null:u.value?.querySelector(`[data-name="${e}"]`)}function O(e){if(t.type===`card`)return;let{value:n}=d;if(!n)return;let r=n.style.opacity===`0`;if(e){let a=`${i.value}-tabs-bar--disabled`,{barWidth:o,placement:s}=t;if(e.dataset.disabled===`true`?n.classList.add(a):n.classList.remove(a),[`top`,`bottom`].includes(s)){if(k([`top`,`maxHeight`,`height`]),typeof o==`number`&&e.offsetWidth>=o){let t=Math.floor((e.offsetWidth-o)/2)+e.offsetLeft;n.style.left=`${t}px`,n.style.maxWidth=`${o}px`}else n.style.left=`${e.offsetLeft}px`,n.style.maxWidth=`${e.offsetWidth}px`;n.style.width=`8192px`,r&&(n.style.transition=`none`),n.offsetWidth,r&&(n.style.transition=``,n.style.opacity=`1`)}else{if(k([`left`,`maxWidth`,`width`]),typeof o==`number`&&e.offsetHeight>=o){let t=Math.floor((e.offsetHeight-o)/2)+e.offsetTop;n.style.top=`${t}px`,n.style.maxHeight=`${o}px`}else n.style.top=`${e.offsetTop}px`,n.style.maxHeight=`${e.offsetHeight}px`;n.style.height=`8192px`,r&&(n.style.transition=`none`),n.offsetHeight,r&&(n.style.transition=``,n.style.opacity=`1`)}}}function ee(){if(t.type===`card`)return;let{value:e}=d;e&&(e.style.opacity=`0`)}function k(e){let{value:t}=d;if(t)for(let n of e)t.style[n]=``}function A(){if(t.type===`card`)return;let e=D();e?O(e):ee()}function j(){let e=m.value?.$el;if(!e)return;let t=D();if(!t)return;let{scrollLeft:n,offsetWidth:r}=e,{offsetLeft:i,offsetWidth:a}=t;n>i?e.scrollTo({top:0,left:i,behavior:`smooth`}):i+a>n+r&&e.scrollTo({top:0,left:i+a-r,behavior:`smooth`})}let N=L(null),P=0,F=null;function I(e){let t=N.value;if(t){P=e.getBoundingClientRect().height;let n=`${P}px`,r=()=>{t.style.height=n,t.style.maxHeight=n};F?(r(),F(),F=null):F=r}}function te(e){let t=N.value;if(t){let n=e.getBoundingClientRect().height,r=()=>{document.body.offsetHeight,t.style.maxHeight=`${n}px`,t.style.height=`${Math.max(P,n)}px`};F?(F(),F=null,r()):F=r}}function ne(){let e=N.value;if(e){e.style.maxHeight=``,e.style.height=``;let{paneWrapperStyle:n}=t;if(typeof n==`string`)e.style.cssText=n;else if(n){let{maxHeight:t,height:r}=n;t!==void 0&&(e.style.maxHeight=t),r!==void 0&&(e.style.height=r)}}}let re={value:[]},ae=L(`next`);function z(e){let t=C.value,n=`next`;for(let r of re.value){if(r===t)break;if(r===e){n=`prev`;break}}ae.value=n,V(e)}function V(e){let{onActiveNameChange:n,onUpdateValue:r,"onUpdate:value":i}=t;n&&h(n,e),r&&h(r,e),i&&h(i,e),S.value=e}function H(e){let{onClose:n}=t;n&&h(n,e)}let U=!0;function G(){let{value:e}=d;if(!e)return;U||=!1;let t=`transition-disabled`;e.classList.add(t),A(),e.classList.remove(t)}let K=L(null);function de({transitionDisabled:e}){let t=u.value;if(!t)return;e&&t.classList.add(`transition-disabled`);let n=D();n&&K.value&&(K.value.style.width=`${n.offsetWidth}px`,K.value.style.height=`${n.offsetHeight}px`,K.value.style.transform=`translateX(${n.offsetLeft-ce(getComputedStyle(t).paddingLeft)}px)`,e&&K.value.offsetWidth),e&&t.classList.remove(`transition-disabled`)}ie([C],()=>{t.type===`segment`&&c(()=>{de({transitionDisabled:!1})})}),oe(()=>{t.type===`segment`&&de({transitionDisabled:!0})});let q=0;function fe(e){if(e.contentRect.width===0&&e.contentRect.height===0||q===e.contentRect.width)return;q=e.contentRect.width;let{type:n}=t;if((n===`line`||n===`bar`)&&(U||t.justifyContent?.startsWith(`space`))&&G(),n!==`segment`){let{placement:e}=t;ve((e===`top`||e===`bottom`?m.value?.$el:g.value)||null)}}let pe=at(fe,64);ie([()=>t.justifyContent,()=>t.size],()=>{c(()=>{let{type:e}=t;(e===`line`||e===`bar`)&&G()})});let J=L(!1);function me(e){let{target:n,contentRect:{width:r,height:i}}=e,a=n.parentElement.parentElement.offsetWidth,o=n.parentElement.parentElement.offsetHeight,{placement:s}=t;if(!J.value)s===`top`||s===`bottom`?a<r&&(J.value=!0):o<i&&(J.value=!0);else{let{value:e}=p;if(!e)return;s===`top`||s===`bottom`?a-r>e.$el.offsetWidth&&(J.value=!1):o-i>e.$el.offsetHeight&&(J.value=!1)}ve(m.value?.$el||null)}let ge=at(me,64);function _e(){let{onAdd:e}=t;e&&e(),c(()=>{let e=D(),{value:t}=m;!e||!t||t.scrollTo({left:e.offsetLeft,top:0,behavior:`smooth`})})}function ve(e){if(!e)return;let{placement:n}=t;if(n===`top`||n===`bottom`){let{scrollLeft:t,scrollWidth:n,offsetWidth:r}=e;_.value=t<=0,v.value=t+r>=n}else{let{scrollTop:t,scrollHeight:n,offsetHeight:r}=e;_.value=t<=0,v.value=t+r>=n}}let ye=at(e=>{ve(e.target)},64);w($e,{triggerRef:M(t,`trigger`),tabStyleRef:M(t,`tabStyle`),tabClassRef:M(t,`tabClass`),addTabStyleRef:M(t,`addTabStyle`),addTabClassRef:M(t,`addTabClass`),paneClassRef:M(t,`paneClass`),paneStyleRef:M(t,`paneStyle`),mergedClsPrefixRef:i,typeRef:M(t,`type`),closableRef:M(t,`closable`),valueRef:C,tabChangeIdRef:T,onBeforeLeaveRef:M(t,`onBeforeLeave`),activateTab:z,handleClose:H,handleAdd:_e}),le(()=>{A(),j()}),se(()=>{let{value:e}=f;if(!e)return;let{value:t}=i,n=`${t}-tabs-nav-scroll-wrapper--shadow-start`,r=`${t}-tabs-nav-scroll-wrapper--shadow-end`;_.value?e.classList.remove(n):e.classList.add(n),v.value?e.classList.remove(r):e.classList.add(r)});let be={syncBarPosition:()=>{A()}},X=()=>{de({transitionDisabled:!0})},Se=e(()=>{let{value:e}=b,{type:n}=t,r=`${e}${{card:`Card`,bar:`Bar`,line:`Line`,segment:`Segment`}[n]}`,{self:{barColor:i,closeIconColor:a,closeIconColorHover:o,closeIconColorPressed:s,tabColor:c,tabBorderColor:u,paneTextColor:d,tabFontWeight:f,tabBorderRadius:p,tabFontWeightActive:m,colorSegment:h,fontWeightStrong:g,tabColorSegment:_,closeSize:v,closeIconSize:y,closeColorHover:x,closeColorPressed:S,closeBorderRadius:C,[R(`panePadding`,e)]:w,[R(`tabPadding`,r)]:T,[R(`tabPaddingVertical`,r)]:E,[R(`tabGap`,r)]:D,[R(`tabGap`,`${r}Vertical`)]:O,[R(`tabTextColor`,n)]:ee,[R(`tabTextColorActive`,n)]:k,[R(`tabTextColorHover`,n)]:A,[R(`tabTextColorDisabled`,n)]:j,[R(`tabFontSize`,e)]:M},common:{cubicBezierEaseInOut:N}}=l.value;return{"--n-bezier":N,"--n-color-segment":h,"--n-bar-color":i,"--n-tab-font-size":M,"--n-tab-text-color":ee,"--n-tab-text-color-active":k,"--n-tab-text-color-disabled":j,"--n-tab-text-color-hover":A,"--n-pane-text-color":d,"--n-tab-border-color":u,"--n-tab-border-radius":p,"--n-close-size":v,"--n-close-icon-size":y,"--n-close-color-hover":x,"--n-close-color-pressed":S,"--n-close-border-radius":C,"--n-close-icon-color":a,"--n-close-icon-color-hover":o,"--n-close-icon-color-pressed":s,"--n-tab-color":c,"--n-tab-font-weight":f,"--n-tab-font-weight-active":m,"--n-tab-padding":T,"--n-tab-padding-vertical":E,"--n-tab-gap":D,"--n-tab-gap-vertical":O,"--n-pane-padding-left":B(w,`left`),"--n-pane-padding-right":B(w,`right`),"--n-pane-padding-top":B(w,`top`),"--n-pane-padding-bottom":B(w,`bottom`),"--n-font-weight-strong":g,"--n-tab-color-segment":_}}),Ce=a?r(`tabs`,e(()=>`${b.value[0]}${t.type[0]}`),Se,t):void 0;return Object.assign({mergedClsPrefix:i,mergedValue:C,renderedNames:new Set,segmentCapsuleElRef:K,tabsPaneWrapperRef:N,tabsElRef:u,barElRef:d,addTabInstRef:p,xScrollInstRef:m,scrollWrapperElRef:f,addTabFixed:J,tabWrapperStyle:E,handleNavResize:pe,mergedSize:b,handleScroll:ye,handleTabsResize:ge,cssVars:a?void 0:Se,themeClass:Ce?.themeClass,animationDirection:ae,renderNameListRef:re,yScrollElRef:g,handleSegmentResize:X,onAnimationBeforeLeave:I,onAnimationEnter:te,onAnimationAfterEnter:ne,onRender:Ce?.onRender},be)},render(){let{mergedClsPrefix:e,type:t,placement:n,addTabFixed:r,addable:i,mergedSize:a,renderNameListRef:o,onRender:s,paneWrapperClass:c,paneWrapperStyle:l,$slots:{default:u,prefix:d,suffix:f}}=this;s?.();let p=u?Y(u()).filter(e=>e.type.__TAB_PANE__===!0):[],h=u?Y(u()).filter(e=>e.type.__TAB__===!0):[],g=!h.length,_=t===`card`,v=t===`segment`,y=!_&&!v&&this.justifyContent;o.value=[];let b=()=>{let t=G(`div`,{style:this.tabWrapperStyle,class:`${e}-tabs-wrapper`},y?null:G(`div`,{class:`${e}-tabs-scroll-padding`,style:n===`top`||n===`bottom`?{width:`${this.tabsPadding}px`}:{height:`${this.tabsPadding}px`}}),g?p.map((e,t)=>(o.value.push(e.props.name),dt(G(rt,Object.assign({},e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0&&(!y||y===`center`||y===`start`||y===`end`)}),e.children?{default:e.children.tab}:void 0)))):h.map((e,t)=>(o.value.push(e.props.name),dt(t!==0&&!y?ut(e):e))),!r&&i&&_?lt(i,(g?p.length:h.length)!==0):null,y?null:G(`div`,{class:`${e}-tabs-scroll-padding`,style:{width:`${this.tabsPadding}px`}}));return G(`div`,{ref:`tabsElRef`,class:`${e}-tabs-nav-scroll-content`},_&&i?G(K,{onResize:this.handleTabsResize},{default:()=>t}):t,_?G(`div`,{class:`${e}-tabs-pad`}):null,_?null:G(`div`,{ref:`barElRef`,class:`${e}-tabs-bar`}))},x=v?`top`:n;return G(`div`,{class:[`${e}-tabs`,this.themeClass,`${e}-tabs--${t}-type`,`${e}-tabs--${a}-size`,y&&`${e}-tabs--flex`,`${e}-tabs--${x}`],style:this.cssVars},G(`div`,{class:[`${e}-tabs-nav--${t}-type`,`${e}-tabs-nav--${x}`,`${e}-tabs-nav`]},m(d,t=>t&&G(`div`,{class:`${e}-tabs-nav__prefix`},t)),v?G(K,{onResize:this.handleSegmentResize},{default:()=>G(`div`,{class:`${e}-tabs-rail`,ref:`tabsElRef`},G(`div`,{class:`${e}-tabs-capsule`,ref:`segmentCapsuleElRef`},G(`div`,{class:`${e}-tabs-wrapper`},G(`div`,{class:`${e}-tabs-tab`}))),g?p.map((e,t)=>(o.value.push(e.props.name),G(rt,Object.assign({},e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0}),e.children?{default:e.children.tab}:void 0))):h.map((e,t)=>(o.value.push(e.props.name),t===0?e:ut(e))))}):G(K,{onResize:this.handleNavResize},{default:()=>G(`div`,{class:`${e}-tabs-nav-scroll-wrapper`,ref:`scrollWrapperElRef`},[`top`,`bottom`].includes(x)?G(Oe,{ref:`xScrollInstRef`,onScroll:this.handleScroll},{default:b}):G(`div`,{class:`${e}-tabs-nav-y-scroll`,onScroll:this.handleScroll,ref:`yScrollElRef`},b()))}),r&&i&&_?lt(i,!0):null,m(f,t=>t&&G(`div`,{class:`${e}-tabs-nav__suffix`},t))),g&&(this.animated&&(x===`top`||x===`bottom`)?G(`div`,{ref:`tabsPaneWrapperRef`,style:l,class:[`${e}-tabs-pane-wrapper`,c]},ct(p,this.mergedValue,this.renderedNames,this.onAnimationBeforeLeave,this.onAnimationEnter,this.onAnimationAfterEnter,this.animationDirection)):ct(p,this.mergedValue,this.renderedNames)))}});function ct(e,t,n,r,i,a,o){let s=[];return e.forEach(e=>{let{name:r,displayDirective:i,"display-directive":a}=e.props,o=e=>i===e||a===e,c=t===r;if(e.key!==void 0&&(e.key=r),c||o(`show`)||o(`show:lazy`)&&n.has(r)){n.has(r)||n.add(r);let t=!o(`if`);s.push(t?E(e,[[v,c]]):e)}}),o?G(D,{name:`${o}-transition`,onBeforeLeave:r,onEnter:i,onAfterEnter:a},{default:()=>s}):s}function lt(e,t){return G(rt,{ref:`addTabInstRef`,key:`__addable`,name:`__addable`,internalCreatedByPane:!0,internalAddable:!0,internalLeftPadded:t,disabled:typeof e==`object`&&e.disabled})}function ut(e){let t=te(e);return t.props?t.props.internalLeftPadded=!0:t.props={internalLeftPadded:!0},t}function dt(e){return Array.isArray(e.dynamicProps)?e.dynamicProps.includes(`internalLeftPadded`)||e.dynamicProps.push(`internalLeftPadded`):e.dynamicProps=[`internalLeftPadded`],e}var ft={key:1,class:`tab-loading`},pt=ae(d({__name:`DockerView`,setup(t){let{t:n}=ne(),r=Ce();function o(e){return e instanceof ee&&e.status===503&&!!e.body&&typeof e.body==`object`&&`enabled`in e.body}function s(e,t){r.error(e instanceof ee?e.message:t)}let c=e=>e===`running`?`success`:e===`paused`||e===`restarting`?`warning`:e===`dead`?`error`:`default`,d={running:0,restarting:1,paused:2,created:3,exited:4,dead:5};function f(e){return d[e.state]??6}function m(e,t){return e.hasStats?t(e.stats):-1}let h=L([]),v=L(!0),y=L(null),b;async function x(){try{let e=await Z.containers();h.value=e.containers,y.value=null}catch(e){o(e)&&(y.value=e.body)}finally{v.value=!1}}async function C(e,t){try{let n=await Z.containerAction(e,t);h.value=n.containers}catch(e){s(e,n(`docker.actionFailed`,{action:t}))}}let w=e(()=>[{title:n(`common.name`),key:`name`,width:160,ellipsis:{tooltip:!0},sorter:(e,t)=>e.name.localeCompare(t.name)},{title:`Image`,key:`image`,width:180,ellipsis:{tooltip:!0},sorter:(e,t)=>e.image.localeCompare(t.image)},{title:`Status`,key:`state`,width:130,sorter:(e,t)=>f(e)-f(t),render:e=>G(be,{type:c(e.state),size:`small`},{default:()=>e.status})},{title:`CPU`,key:`cpu`,width:70,sorter:(e,t)=>m(e,e=>e.cpuPercent)-m(t,e=>e.cpuPercent),render:e=>e.hasStats?`${e.stats.cpuPercent.toFixed(1)}%`:`—`},{title:`RAM`,key:`ram`,width:150,sorter:(e,t)=>m(e,e=>e.memUsageBytes)-m(t,e=>e.memUsageBytes),render:e=>e.hasStats?`${Q(e.stats.memUsageBytes)} / ${Q(e.stats.memLimitBytes)}`:`—`},{title:`Network`,key:`net`,width:140,sorter:(e,t)=>m(e,e=>e.netRxBytes+e.netTxBytes)-m(t,e=>e.netRxBytes+e.netTxBytes),render:e=>e.hasStats?`↓ ${Q(e.stats.netRxBytes)} ↑ ${Q(e.stats.netTxBytes)}`:`—`},{title:`Ports`,key:`ports`,width:220,ellipsis:{tooltip:!0}},{title:n(`common.actions`),key:`actions`,width:220,render:e=>G(we,{size:`small`},()=>[e.state===`running`?[G(T,{size:`tiny`,onClick:()=>C(e.id,`stop`)},()=>`Stop`),G(T,{size:`tiny`,onClick:()=>C(e.id,`restart`)},()=>`Restart`)]:G(T,{size:`tiny`,type:`primary`,onClick:()=>C(e.id,`start`)},()=>`Start`),G(Te,{onPositiveClick:()=>C(e.id,`remove`)},{trigger:()=>G(T,{size:`tiny`,type:`error`,ghost:!0},()=>n(`common.delete`)),default:()=>n(`docker.confirmDeleteContainer`,{name:e.name})})])}]),E=L([]),D=L(!0),O=L(null);async function k(){D.value=!0;try{let e=await Z.images();E.value=e.images,O.value=null}catch(e){o(e)&&(O.value=e.body)}finally{D.value=!1}}async function A(e){try{let t=await Z.removeImage(e);E.value=t.images}catch(e){s(e,n(`docker.removeImageFailed`))}}let j=e(()=>[{title:`Tag`,key:`tag`,minWidth:200,ellipsis:{tooltip:!0},sorter:(e,t)=>e.tag.localeCompare(t.tag),render:e=>e.dangling?G(we,{size:`small`,align:`center`},()=>[e.tag,G(be,{size:`small`,type:`warning`},()=>`dangling`)]):e.tag},{title:n(`common.size`),key:`sizeBytes`,width:110,sorter:(e,t)=>e.sizeBytes-t.sizeBytes,render:e=>Q(e.sizeBytes)},{title:n(`docker.usedColumn`),key:`containers`,width:140,sorter:(e,t)=>e.containers-t.containers,render:e=>e.containers<0?`—`:e.containers===0?n(`docker.notUsed`):n(`docker.containerCount`,{count:e.containers})},{title:n(`docker.created`),key:`created`,width:150,sorter:(e,t)=>Date.parse(e.created)-Date.parse(t.created),render:e=>Ee(e.created)},{title:n(`common.actions`),key:`actions`,width:100,render:e=>G(Te,{onPositiveClick:()=>A(e.id)},{trigger:()=>G(T,{size:`tiny`,type:`error`,ghost:!0},()=>n(`common.delete`)),default:()=>n(`docker.confirmDeleteImage`,{tag:e.tag})})}]),M=L([]),N=L(!0),P=L(null);async function te(){N.value=!0;try{let e=await Z.volumes();M.value=e.volumes,P.value=null}catch(e){o(e)&&(P.value=e.body)}finally{N.value=!1}}async function re(e){try{let t=await Z.removeVolume(e);M.value=t.volumes}catch(e){s(e,n(`docker.removeVolumeFailed`))}}let ae=e(()=>[{title:n(`common.name`),key:`name`,minWidth:180,ellipsis:{tooltip:!0},sorter:(e,t)=>e.name.localeCompare(t.name)},{title:`Driver`,key:`driver`,width:100,sorter:(e,t)=>e.driver.localeCompare(t.driver)},{title:n(`common.size`),key:`sizeBytes`,width:110,sorter:(e,t)=>e.sizeBytes-t.sizeBytes,render:e=>e.sizeBytes<0?n(`docker.unknown`):Q(e.sizeBytes)},{title:`Status`,key:`inUse`,width:120,sorter:(e,t)=>Number(e.inUse)-Number(t.inUse),render:e=>G(be,{size:`small`,type:e.inUse?`success`:`default`},()=>e.inUse?n(`docker.used`):n(`docker.notUsed`))},{title:n(`common.actions`),key:`actions`,width:100,render:e=>G(Te,{onPositiveClick:()=>re(e.name)},{trigger:()=>G(T,{size:`tiny`,type:`error`,ghost:!0},()=>n(`common.delete`)),default:()=>n(`docker.confirmDeleteVolume`,{name:e.name})})}]),R=L([]),z=L(!0),B=L(null);async function se(){z.value=!0;try{let e=await Z.networks();R.value=e.networks,B.value=null}catch(e){o(e)&&(B.value=e.body)}finally{z.value=!1}}async function V(e){try{let t=await Z.removeNetwork(e);R.value=t.networks}catch(e){s(e,n(`docker.removeNetworkFailed`))}}let ce=e(()=>[{title:n(`common.name`),key:`name`,minWidth:160,ellipsis:{tooltip:!0},sorter:(e,t)=>e.name.localeCompare(t.name),render:e=>e.builtin?G(we,{size:`small`,align:`center`},()=>[e.name,G(be,{size:`small`},()=>`builtin`)]):e.name},{title:`Driver`,key:`driver`,width:100,sorter:(e,t)=>e.driver.localeCompare(t.driver)},{title:`Subnet`,key:`subnet`,width:150,sorter:(e,t)=>e.subnet.localeCompare(t.subnet),render:e=>e.subnet||`—`},{title:n(`docker.connectedContainers`),key:`connectedCount`,width:170,sorter:(e,t)=>e.connectedCount-t.connectedCount},{title:n(`common.actions`),key:`actions`,width:100,render:e=>e.builtin?null:G(Te,{onPositiveClick:()=>V(e.id)},{trigger:()=>G(T,{size:`tiny`,type:`error`,ghost:!0},()=>n(`common.delete`)),default:()=>n(`docker.confirmDeleteNetwork`,{name:e.name})})}]),H=L(null),W=L(!0),K=L(null),le=L(null);async function ue(){W.value=!0;try{H.value=await Z.settings(),K.value=null}catch(e){o(e)&&(K.value=e.body)}finally{W.value=!1}}async function de(e){le.value=e;try{H.value=await Z.prune(e),r.success(n(`docker.cleanupDone`))}catch(t){s(t,n(`docker.cleanupFailed`,{kind:e}))}finally{le.value=null}}let q=L(`containers`),Y=new Set([`containers`]);return ie(q,e=>{Y.has(e)||(Y.add(e),e===`images`?k():e===`volumes`?te():e===`networks`?se():e===`settings`&&ue())}),oe(()=>{x(),b=setInterval(x,5e3)}),u(()=>{b&&clearInterval(b)}),(e,t)=>(S(),p(fe,null,{default:I(()=>[l(F(st),{type:`line`,value:q.value,"onUpdate:value":t[0]||=e=>q.value=e},{default:I(()=>[l(F(tt),{name:`containers`,tab:`Containers`},{default:I(()=>[y.value?(S(),p(F(X),{key:0,type:`warning`,title:y.value.error},null,8,[`title`])):(S(),p(F(me),{key:1,columns:w.value,data:h.value,loading:v.value,"row-key":e=>e.id,"scroll-x":1200},null,8,[`columns`,`data`,`loading`,`row-key`]))]),_:1}),l(F(tt),{name:`images`,tab:`Images`},{default:I(()=>[O.value?(S(),p(F(X),{key:0,type:`warning`,title:O.value.error},null,8,[`title`])):(S(),p(F(me),{key:1,columns:j.value,data:E.value,loading:D.value,"row-key":e=>e.id,"scroll-x":700},null,8,[`columns`,`data`,`loading`,`row-key`]))]),_:1}),l(F(tt),{name:`volumes`,tab:`Volumes`},{default:I(()=>[P.value?(S(),p(F(X),{key:0,type:`warning`,title:P.value.error},null,8,[`title`])):(S(),p(F(me),{key:1,columns:ae.value,data:M.value,loading:N.value,"row-key":e=>e.name,"scroll-x":610},null,8,[`columns`,`data`,`loading`,`row-key`]))]),_:1}),l(F(tt),{name:`networks`,tab:`Networks`},{default:I(()=>[B.value?(S(),p(F(X),{key:0,type:`warning`,title:B.value.error},null,8,[`title`])):(S(),p(F(me),{key:1,columns:ce.value,data:R.value,loading:z.value,"row-key":e=>e.id,"scroll-x":680},null,8,[`columns`,`data`,`loading`,`row-key`]))]),_:1}),l(F(tt),{name:`settings`,tab:`Settings`},{default:I(()=>[K.value?(S(),p(F(X),{key:0,type:`warning`,title:K.value.error},null,8,[`title`])):W.value&&!H.value?(S(),g(`div`,ft,[l(F(pe),{size:`large`})])):H.value?(S(),p(F(we),{key:3,vertical:``,size:24},{default:I(()=>[l(F(Ze),{title:F(n)(`docker.daemonInfo`),column:2,bordered:``,"label-placement":`left`},{default:I(()=>[l(F($),{label:F(n)(`docker.serverVersion`)},{default:I(()=>[a(U(H.value?.info.serverVersion),1)]),_:1},8,[`label`]),l(F($),{label:`OS / Kernel`},{default:I(()=>[a(U(H.value?.info.operatingSystem)+` / `+U(H.value?.info.kernelVersion),1)]),_:1}),l(F($),{label:`Storage Driver`},{default:I(()=>[a(U(H.value?.info.storageDriver),1)]),_:1}),l(F($),{label:`Root Dir`},{default:I(()=>[a(U(H.value?.info.dockerRootDir),1)]),_:1}),l(F($),{label:`Container`},{default:I(()=>[a(U(H.value?.info.containersRunning)+` running, `+U(H.value?.info.containersPaused)+` paused, `+U(H.value?.info.containersStopped)+` stopped `,1)]),_:1}),l(F($),{label:`Images`},{default:I(()=>[a(U(H.value?.info.images),1)]),_:1})]),_:1},8,[`title`]),l(F(Ze),{title:`Disk Usage`,column:2,bordered:``,"label-placement":`left`},{default:I(()=>[l(F($),{label:`Images`},{default:I(()=>[a(U(F(Q)(H.value?.diskUsage.imagesTotalBytes??0))+` (reclaimable `+U(F(Q)(H.value?.diskUsage.imagesReclaimableBytes??0))+`) `,1)]),_:1}),l(F($),{label:`Containers`},{default:I(()=>[a(U(F(Q)(H.value?.diskUsage.containersTotalBytes??0)),1)]),_:1}),l(F($),{label:`Volumes`},{default:I(()=>[a(U(F(Q)(H.value?.diskUsage.volumesTotalBytes??0))+` (reclaimable `+U(F(Q)(H.value?.diskUsage.volumesReclaimableBytes??0))+`) `,1)]),_:1})]),_:1}),l(F(we),null,{default:I(()=>[(S(),g(i,null,_([`containers`,`images`,`volumes`,`networks`,`all`],e=>l(F(Te),{key:e,onPositiveClick:t=>de(e)},{trigger:I(()=>[l(F(T),{size:`small`,loading:le.value===e},{default:I(()=>[a(U(F(n)(`docker.cleanup`))+` `+U(e),1)]),_:2},1032,[`loading`])]),default:I(()=>[a(` `+U(F(n)(`docker.confirmCleanup`,{kind:e})),1)]),_:2},1032,[`onPositiveClick`])),64))]),_:1})]),_:1})):(S(),p(F(J),{key:2,description:F(n)(`docker.noData`)},null,8,[`description`]))]),_:1})]),_:1},8,[`value`])]),_:1}))}}),[[`__scopeId`,`data-v-f59f7e6d`]]);export{pt as default};