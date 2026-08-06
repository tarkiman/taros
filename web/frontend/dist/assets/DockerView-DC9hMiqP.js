import{$t as e,An as t,At as n,Bn as r,Cn as i,En as a,Gn as o,In as s,Jn as c,Kn as l,Kt as u,Ln as d,Nt as f,On as p,Ot as m,Qn as h,St as g,T as _,Tn as v,Vn as y,Wt as b,Xt as x,Zt as S,at as C,c as ee,d as w,dn as T,en as E,ft as te,hn as ne,in as D,ir as O,j as k,jn as A,k as j,kn as M,ln as N,lt as re,nn as P,nt as F,o as I,pt as L,qn as R,rn as ie,sr as z,tn as ae,tr as B,vn as V,wn as H,wt as oe,xn as U,xt as W,yn as G,zn as K,zt as se}from"./auth-CSROUTah.js";import{C as ce,S as q,g as J,h as le,t as ue,u as de}from"./AppShell-B_vQi133.js";import{r as fe,t as Y}from"./DataTable-DiGRt8AX.js";import{p as pe}from"./createLucideIcon-QARvfWam.js";import{o as me}from"./get-CZqj-Zm2.js";import{C as he,S as ge}from"./light-OkaI1hXa.js";import{t as _e}from"./get-slot-6kXJmSMP.js";import{t as ve}from"./Add-9_Xi69uu.js";import{t as ye}from"./Tag-T5naHCya.js";import{t as be}from"./Alert-DTsrBM8f.js";import{n as xe,r as Se}from"./light-WvKeeqOk.js";import{t as Ce}from"./use-message-CjUHXxhA.js";import{t as X}from"./Space-Df3FVvUb.js";import{t as we}from"./Popconfirm-B6mAhy0s.js";import{t as Z}from"./docker-8F_ilhKI.js";import{n as Te,t as Q}from"./format-BxLcbkc3.js";var Ee=le(`.v-x-scroll`,{overflow:`auto`,scrollbarWidth:`none`},[le(`&::-webkit-scrollbar`,{width:0,height:0})]),De=a({name:`XScroll`,props:{disabled:Boolean,onScroll:Function},setup(){let e=h(null);function t(e){!(e.currentTarget.offsetWidth<e.currentTarget.scrollWidth)||e.deltaY===0||(e.currentTarget.scrollLeft+=e.deltaY+e.deltaX,e.preventDefault())}let r=n();return Ee.mount({id:`vueuc/x-scroll`,head:!0,anchorMetaName:J,ssr:r}),Object.assign({selfRef:e,handleWheel:t},{scrollTo(...t){var n;(n=e.value)==null||n.scrollTo(...t)}})},render(){return p(`div`,{ref:`selfRef`,onScroll:this.onScroll,onWheel:this.disabled?void 0:this.handleWheel,class:`v-x-scroll`},this.$slots)}});function Oe(e,t=`default`,n=[]){let{children:r}=e;if(typeof r==`object`&&r&&!Array.isArray(r)){let e=r[t];if(typeof e==`function`)return e()}return n}var ke=/\s/;function Ae(e){for(var t=e.length;t--&&ke.test(e.charAt(t)););return t}var je=/^\s+/;function Me(e){return e&&e.slice(0,Ae(e)+1).replace(je,``)}var Ne=NaN,Pe=/^[-+]0x[0-9a-f]+$/i,Fe=/^0b[01]+$/i,Ie=/^0o[0-7]+$/i,Le=parseInt;function Re(e){if(typeof e==`number`)return e;if(C(e))return Ne;if(F(e)){var t=typeof e.valueOf==`function`?e.valueOf():e;e=F(t)?t+``:t}if(typeof e!=`string`)return e===0?e:+e;e=Me(e);var n=Fe.test(e);return n||Ie.test(e)?Le(e.slice(2),n?2:8):Pe.test(e)?Ne:+e}var ze=function(){return re.Date.now()},Be=`Expected a function`,Ve=Math.max,He=Math.min;function Ue(e,t,n){var r,i,a,o,s,c,l=0,u=!1,d=!1,f=!0;if(typeof e!=`function`)throw TypeError(Be);t=Re(t)||0,F(n)&&(u=!!n.leading,d=`maxWait`in n,a=d?Ve(Re(n.maxWait)||0,t):a,f=`trailing`in n?!!n.trailing:f);function p(t){var n=r,a=i;return r=i=void 0,l=t,o=e.apply(a,n),o}function m(e){return l=e,s=setTimeout(_,t),u?p(e):o}function h(e){var n=e-c,r=e-l,i=t-n;return d?He(i,a-r):i}function g(e){var n=e-c,r=e-l;return c===void 0||n>=t||n<0||d&&r>=a}function _(){var e=ze();if(g(e))return v(e);s=setTimeout(_,h(e))}function v(e){return s=void 0,f&&r?p(e):(r=i=void 0,o)}function y(){s!==void 0&&clearTimeout(s),l=0,r=c=i=s=void 0}function b(){return s===void 0?o:v(ze())}function x(){var e=ze(),n=g(e);if(r=arguments,i=this,c=e,n){if(s===void 0)return m(c);if(d)return clearTimeout(s),s=setTimeout(_,t),p(c)}return s===void 0&&(s=setTimeout(_,t)),o}return x.cancel=y,x.flush=b,x}var We=`Expected a function`;function Ge(e,t,n){var r=!0,i=!0;if(typeof e!=`function`)throw TypeError(We);return F(n)&&(r=`leading`in n?!!n.leading:r,i=`trailing`in n?!!n.trailing:i),Ue(e,t,{leading:r,maxWait:t,trailing:i})}var Ke=x([S(`descriptions`,{fontSize:`var(--n-font-size)`},[S(`descriptions-separator`,`
 display: inline-block;
 margin: 0 8px 0 2px;
 `),S(`descriptions-table-wrapper`,[S(`descriptions-table`,[S(`descriptions-table-row`,[S(`descriptions-table-header`,{padding:`var(--n-th-padding)`}),S(`descriptions-table-content`,{padding:`var(--n-td-padding)`})])])]),ae(`bordered`,[S(`descriptions-table-wrapper`,[S(`descriptions-table`,[S(`descriptions-table-row`,[x(`&:last-child`,[S(`descriptions-table-content`,{paddingBottom:0})])])])])]),E(`left-label-placement`,[S(`descriptions-table-content`,[x(`> *`,{verticalAlign:`top`})])]),E(`left-label-align`,[x(`th`,{textAlign:`left`})]),E(`center-label-align`,[x(`th`,{textAlign:`center`})]),E(`right-label-align`,[x(`th`,{textAlign:`right`})]),E(`bordered`,[S(`descriptions-table-wrapper`,`
 border-radius: var(--n-border-radius);
 overflow: hidden;
 background: var(--n-merged-td-color);
 border: 1px solid var(--n-merged-border-color);
 `,[S(`descriptions-table`,[S(`descriptions-table-row`,[x(`&:not(:last-child)`,[S(`descriptions-table-content`,{borderBottom:`1px solid var(--n-merged-border-color)`}),S(`descriptions-table-header`,{borderBottom:`1px solid var(--n-merged-border-color)`})]),S(`descriptions-table-header`,`
 font-weight: 400;
 background-clip: padding-box;
 background-color: var(--n-merged-th-color);
 `,[x(`&:not(:last-child)`,{borderRight:`1px solid var(--n-merged-border-color)`})]),S(`descriptions-table-content`,[x(`&:not(:last-child)`,{borderRight:`1px solid var(--n-merged-border-color)`})])])])])]),S(`descriptions-header`,`
 font-weight: var(--n-th-font-weight);
 font-size: 18px;
 transition: color .3s var(--n-bezier);
 line-height: var(--n-line-height);
 margin-bottom: 16px;
 color: var(--n-title-text-color);
 `),S(`descriptions-table-wrapper`,`
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[S(`descriptions-table`,`
 width: 100%;
 border-collapse: separate;
 border-spacing: 0;
 box-sizing: border-box;
 `,[S(`descriptions-table-row`,`
 box-sizing: border-box;
 transition: border-color .3s var(--n-bezier);
 `,[S(`descriptions-table-header`,`
 font-weight: var(--n-th-font-weight);
 line-height: var(--n-line-height);
 display: table-cell;
 box-sizing: border-box;
 color: var(--n-th-text-color);
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `),S(`descriptions-table-content`,`
 vertical-align: top;
 line-height: var(--n-line-height);
 display: table-cell;
 box-sizing: border-box;
 color: var(--n-td-text-color);
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[e(`content`,`
 transition: color .3s var(--n-bezier);
 display: inline-block;
 color: var(--n-td-text-color);
 `)]),e(`label`,`
 font-weight: var(--n-th-font-weight);
 transition: color .3s var(--n-bezier);
 display: inline-block;
 margin-right: 14px;
 color: var(--n-th-text-color);
 `)])])])]),S(`descriptions-table-wrapper`,`
 --n-merged-th-color: var(--n-th-color);
 --n-merged-td-color: var(--n-td-color);
 --n-merged-border-color: var(--n-border-color);
 `),ie(S(`descriptions-table-wrapper`,`
 --n-merged-th-color: var(--n-th-color-modal);
 --n-merged-td-color: var(--n-td-color-modal);
 --n-merged-border-color: var(--n-border-color-modal);
 `)),D(S(`descriptions-table-wrapper`,`
 --n-merged-th-color: var(--n-th-color-popover);
 --n-merged-td-color: var(--n-td-color-popover);
 --n-merged-border-color: var(--n-border-color-popover);
 `))]),qe=`DESCRIPTION_ITEM_FLAG`;function Je(e){return typeof e==`object`&&e&&!Array.isArray(e)?e.type&&e.type.DESCRIPTION_ITEM_FLAG:!1}var Ye=Object.assign(Object.assign({},k.props),{title:String,column:{type:Number,default:3},columns:Number,labelPlacement:{type:String,default:`top`},labelAlign:{type:String,default:`left`},separator:{type:String,default:`:`},size:String,bordered:Boolean,labelClass:String,labelStyle:[Object,String],contentClass:String,contentStyle:[Object,String]}),Xe=a({name:`Descriptions`,props:Ye,slots:Object,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n,mergedComponentPropsRef:r}=L(e),i=G(()=>e.size||r?.value?.Descriptions?.size||`medium`),a=k(`Descriptions`,`-descriptions`,Ke,Se,e,t),o=G(()=>{let{bordered:t}=e,n=i.value,{common:{cubicBezierEaseInOut:r},self:{titleTextColor:o,thColor:s,thColorModal:c,thColorPopover:l,thTextColor:u,thFontWeight:d,tdTextColor:f,tdColor:p,tdColorModal:m,tdColorPopover:h,borderColor:g,borderColorModal:_,borderColorPopover:v,borderRadius:y,lineHeight:b,[P(`fontSize`,n)]:x,[P(t?`thPaddingBordered`:`thPadding`,n)]:S,[P(t?`tdPaddingBordered`:`tdPadding`,n)]:C}}=a.value;return{"--n-title-text-color":o,"--n-th-padding":S,"--n-td-padding":C,"--n-font-size":x,"--n-bezier":r,"--n-th-font-weight":d,"--n-line-height":b,"--n-th-text-color":u,"--n-td-text-color":f,"--n-th-color":s,"--n-th-color-modal":c,"--n-th-color-popover":l,"--n-td-color":p,"--n-td-color-modal":m,"--n-td-color-popover":h,"--n-border-radius":y,"--n-border-color":g,"--n-border-color-modal":_,"--n-border-color-popover":v}}),s=n?te(`descriptions`,G(()=>{let t=``,{bordered:n}=e;return n&&(t+=`a`),t+=i.value[0],t}),o,e):void 0;return{mergedClsPrefix:t,cssVars:n?void 0:o,themeClass:s?.themeClass,onRender:s?.onRender,compitableColumn:q(e,[`columns`,`column`]),inlineThemeDisabled:n,mergedSize:i}},render(){let e=this.$slots.default,t=e?pe(e()):[];t.length;let{contentClass:n,labelClass:r,compitableColumn:i,labelPlacement:a,labelAlign:o,mergedSize:s,bordered:c,title:l,cssVars:u,mergedClsPrefix:d,separator:f,onRender:m}=this;m?.();let h=t.filter(e=>Je(e)),g=h.reduce((e,t,o)=>{let s=t.props||{},l=h.length-1===o,u=[`label`in s?s.label:Oe(t,`label`)],m=[Oe(t)],g=s.span||1,_=e.span;e.span+=g;let v=s.labelStyle||s[`label-style`]||this.labelStyle,y=s.contentStyle||s[`content-style`]||this.contentStyle;if(a===`left`)c?e.row.push(p(`th`,{class:[`${d}-descriptions-table-header`,r],colspan:1,style:v},u),p(`td`,{class:[`${d}-descriptions-table-content`,n],colspan:l?(i-_)*2+1:g*2-1,style:y},m)):e.row.push(p(`td`,{class:`${d}-descriptions-table-content`,colspan:l?(i-_)*2:g*2},p(`span`,{class:[`${d}-descriptions-table-content__label`,r],style:v},[...u,f&&p(`span`,{class:`${d}-descriptions-separator`},f)]),p(`span`,{class:[`${d}-descriptions-table-content__content`,n],style:y},m)));else{let t=l?(i-_)*2:g*2;e.row.push(p(`th`,{class:[`${d}-descriptions-table-header`,r],colspan:t,style:v},u)),e.secondRow.push(p(`td`,{class:[`${d}-descriptions-table-content`,n],colspan:t,style:y},m))}return(e.span>=i||l)&&(e.span=0,e.row.length&&(e.rows.push(e.row),e.row=[]),a!==`left`&&e.secondRow.length&&(e.rows.push(e.secondRow),e.secondRow=[])),e},{span:0,row:[],secondRow:[],rows:[]}).rows.map(e=>p(`tr`,{class:`${d}-descriptions-table-row`},e));return p(`div`,{style:u,class:[`${d}-descriptions`,this.themeClass,`${d}-descriptions--${a}-label-placement`,`${d}-descriptions--${o}-label-align`,`${d}-descriptions--${s}-size`,c&&`${d}-descriptions--bordered`]},l||this.$slots.header?p(`div`,{class:`${d}-descriptions-header`},l||_e(this,`header`)):null,p(`div`,{class:`${d}-descriptions-table-wrapper`},p(`table`,{class:`${d}-descriptions-table`},p(`tbody`,null,a===`top`&&p(`tr`,{class:`${d}-descriptions-table-row`,style:{visibility:`collapse`}},se(i*2,p(`td`,null))),g))))}}),Ze={label:String,span:{type:Number,default:1},labelClass:String,labelStyle:[Object,String],contentClass:String,contentStyle:[Object,String]},$=a({name:`DescriptionsItem`,[qe]:!0,props:Ze,slots:Object,render(){return null}}),Qe=f(`n-tabs`),$e={tab:[String,Number,Object,Function],name:{type:[String,Number],required:!0},disabled:Boolean,displayDirective:{type:String,default:`if`},closable:{type:Boolean,default:void 0},tabProps:Object,label:[String,Number,Object,Function]},et=a({__TAB_PANE__:!0,name:`TabPane`,alias:[`TabPanel`],props:$e,slots:Object,setup(e){let t=M(Qe,null);return t||oe(`tab-pane`,"`n-tab-pane` must be placed inside `n-tabs`."),{style:t.paneStyleRef,class:t.paneClassRef,mergedClsPrefix:t.mergedClsPrefixRef}},render(){return p(`div`,{class:[`${this.mergedClsPrefix}-tab-pane`,this.class],style:this.style},this.$slots)}}),tt=Object.assign({internalLeftPadded:Boolean,internalAddable:Boolean,internalCreatedByPane:Boolean},he($e,[`displayDirective`])),nt=a({__TAB__:!0,inheritAttrs:!1,name:`Tab`,props:tt,setup(e){let{mergedClsPrefixRef:t,valueRef:n,typeRef:r,closableRef:i,tabStyleRef:a,addTabStyleRef:o,tabClassRef:s,addTabClassRef:c,tabChangeIdRef:l,onBeforeLeaveRef:u,triggerRef:d,handleAdd:f,activateTab:p,handleClose:m}=M(Qe);return{trigger:d,mergedClosable:G(()=>{if(e.internalAddable)return!1;let{closable:t}=e;return t===void 0?i.value:t}),style:a,addStyle:o,tabClass:s,addTabClass:c,clsPrefix:t,value:n,type:r,handleClose(t){t.stopPropagation(),!e.disabled&&m(e.name)},activateTab(){if(e.disabled)return;if(e.internalAddable){f();return}let{name:t}=e,r=++l.id;if(t!==n.value){let{value:i}=u;i?Promise.resolve(i(e.name,n.value)).then(e=>{e&&l.id===r&&p(t)}):p(t)}}}},render(){let{internalAddable:e,clsPrefix:n,name:r,disabled:i,label:a,tab:o,value:s,mergedClosable:c,trigger:l,$slots:{default:u}}=this,d=a??o;return p(`div`,{class:`${n}-tabs-tab-wrapper`},this.internalLeftPadded?p(`div`,{class:`${n}-tabs-tab-pad`}):null,p(`div`,Object.assign({key:r,"data-name":r,"data-disabled":i?!0:void 0},t({class:[`${n}-tabs-tab`,s===r&&`${n}-tabs-tab--active`,i&&`${n}-tabs-tab--disabled`,c&&`${n}-tabs-tab--closable`,e&&`${n}-tabs-tab--addable`,e?this.addTabClass:this.tabClass],onClick:l===`click`?this.activateTab:void 0,onMouseenter:l===`hover`?this.activateTab:void 0,style:e?this.addStyle:this.style},this.internalCreatedByPane?this.tabProps||{}:this.$attrs)),p(`span`,{class:`${n}-tabs-tab__label`},e?p(ne,null,p(`div`,{class:`${n}-tabs-tab__height-placeholder`},`\xA0`),p(j,{clsPrefix:n},{default:()=>p(ve,null)})):u?u():typeof d==`object`?d:ge(d??r)),c&&this.type===`card`?p(_,{clsPrefix:n,class:`${n}-tabs-tab__close`,onClick:this.handleClose,disabled:i}):null))}}),rt=S(`tabs`,`
 box-sizing: border-box;
 width: 100%;
 display: flex;
 flex-direction: column;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
`,[E(`segment-type`,[S(`tabs-rail`,[x(`&.transition-disabled`,[S(`tabs-capsule`,`
 transition: none;
 `)])])]),E(`top`,[S(`tab-pane`,`
 padding: var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left);
 `)]),E(`left`,[S(`tab-pane`,`
 padding: var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left) var(--n-pane-padding-top);
 `)]),E(`left, right`,`
 flex-direction: row;
 `,[S(`tabs-bar`,`
 width: 2px;
 right: 0;
 transition:
 top .2s var(--n-bezier),
 max-height .2s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `),S(`tabs-tab`,`
 padding: var(--n-tab-padding-vertical); 
 `)]),E(`right`,`
 flex-direction: row-reverse;
 `,[S(`tab-pane`,`
 padding: var(--n-pane-padding-left) var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom);
 `),S(`tabs-bar`,`
 left: 0;
 `)]),E(`bottom`,`
 flex-direction: column-reverse;
 justify-content: flex-end;
 `,[S(`tab-pane`,`
 padding: var(--n-pane-padding-bottom) var(--n-pane-padding-right) var(--n-pane-padding-top) var(--n-pane-padding-left);
 `),S(`tabs-bar`,`
 top: 0;
 `)]),S(`tabs-rail`,`
 position: relative;
 padding: 3px;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 background-color: var(--n-color-segment);
 transition: background-color .3s var(--n-bezier);
 display: flex;
 align-items: center;
 `,[S(`tabs-capsule`,`
 border-radius: var(--n-tab-border-radius);
 position: absolute;
 pointer-events: none;
 background-color: var(--n-tab-color-segment);
 box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .08);
 transition: transform 0.3s var(--n-bezier);
 `),S(`tabs-tab-wrapper`,`
 flex-basis: 0;
 flex-grow: 1;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[S(`tabs-tab`,`
 overflow: hidden;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[E(`active`,`
 font-weight: var(--n-font-weight-strong);
 color: var(--n-tab-text-color-active);
 `),x(`&:hover`,`
 color: var(--n-tab-text-color-hover);
 `)])])]),E(`flex`,[S(`tabs-nav`,`
 width: 100%;
 position: relative;
 `,[S(`tabs-wrapper`,`
 width: 100%;
 `,[S(`tabs-tab`,`
 margin-right: 0;
 `)])])]),S(`tabs-nav`,`
 box-sizing: border-box;
 line-height: 1.5;
 display: flex;
 transition: border-color .3s var(--n-bezier);
 `,[e(`prefix, suffix`,`
 display: flex;
 align-items: center;
 `),e(`prefix`,`padding-right: 16px;`),e(`suffix`,`padding-left: 16px;`)]),E(`top, bottom`,[x(`>`,[S(`tabs-nav`,[S(`tabs-nav-scroll-wrapper`,[x(`&::before`,`
 top: 0;
 bottom: 0;
 left: 0;
 width: 20px;
 `),x(`&::after`,`
 top: 0;
 bottom: 0;
 right: 0;
 width: 20px;
 `),E(`shadow-start`,[x(`&::before`,`
 box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, .12);
 `)]),E(`shadow-end`,[x(`&::after`,`
 box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),E(`left, right`,[S(`tabs-nav-scroll-content`,`
 flex-direction: column;
 `),x(`>`,[S(`tabs-nav`,[S(`tabs-nav-scroll-wrapper`,[x(`&::before`,`
 top: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),x(`&::after`,`
 bottom: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),E(`shadow-start`,[x(`&::before`,`
 box-shadow: inset 0 10px 8px -8px rgba(0, 0, 0, .12);
 `)]),E(`shadow-end`,[x(`&::after`,`
 box-shadow: inset 0 -10px 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),S(`tabs-nav-scroll-wrapper`,`
 flex: 1;
 position: relative;
 overflow: hidden;
 `,[S(`tabs-nav-y-scroll`,`
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
 `)]),S(`tabs-nav-scroll-content`,`
 display: flex;
 position: relative;
 min-width: 100%;
 min-height: 100%;
 width: fit-content;
 box-sizing: border-box;
 `),S(`tabs-wrapper`,`
 display: inline-flex;
 flex-wrap: nowrap;
 position: relative;
 `),S(`tabs-tab-wrapper`,`
 display: flex;
 flex-wrap: nowrap;
 flex-shrink: 0;
 flex-grow: 0;
 `),S(`tabs-tab`,`
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
 `,[E(`disabled`,{cursor:`not-allowed`}),e(`close`,`
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),e(`label`,`
 display: flex;
 align-items: center;
 z-index: 1;
 `)]),S(`tabs-bar`,`
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
 `),E(`disabled`,`
 background-color: var(--n-tab-text-color-disabled)
 `)]),S(`tabs-pane-wrapper`,`
 position: relative;
 overflow: hidden;
 transition: max-height .2s var(--n-bezier);
 `),S(`tab-pane`,`
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
 `)]),S(`tabs-tab-pad`,`
 box-sizing: border-box;
 width: var(--n-tab-gap);
 flex-grow: 0;
 flex-shrink: 0;
 `),E(`line-type, bar-type`,[S(`tabs-tab`,`
 font-weight: var(--n-tab-font-weight);
 box-sizing: border-box;
 vertical-align: bottom;
 `,[x(`&:hover`,{color:`var(--n-tab-text-color-hover)`}),E(`active`,`
 color: var(--n-tab-text-color-active);
 font-weight: var(--n-tab-font-weight-active);
 `),E(`disabled`,{color:`var(--n-tab-text-color-disabled)`})])]),S(`tabs-nav`,[E(`line-type`,[E(`top`,[e(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),S(`tabs-nav-scroll-content`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),S(`tabs-bar`,`
 bottom: -1px;
 `)]),E(`left`,[e(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),S(`tabs-nav-scroll-content`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),S(`tabs-bar`,`
 right: -1px;
 `)]),E(`right`,[e(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),S(`tabs-nav-scroll-content`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),S(`tabs-bar`,`
 left: -1px;
 `)]),E(`bottom`,[e(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),S(`tabs-nav-scroll-content`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),S(`tabs-bar`,`
 top: -1px;
 `)]),e(`prefix, suffix`,`
 transition: border-color .3s var(--n-bezier);
 `),S(`tabs-nav-scroll-content`,`
 transition: border-color .3s var(--n-bezier);
 `),S(`tabs-bar`,`
 border-radius: 0;
 `)]),E(`card-type`,[e(`prefix, suffix`,`
 transition: border-color .3s var(--n-bezier);
 `),S(`tabs-pad`,`
 flex-grow: 1;
 transition: border-color .3s var(--n-bezier);
 `),S(`tabs-tab-pad`,`
 transition: border-color .3s var(--n-bezier);
 `),S(`tabs-tab`,`
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
 `,[e(`height-placeholder`,`
 width: 0;
 font-size: var(--n-tab-font-size);
 `),ae(`disabled`,[x(`&:hover`,`
 color: var(--n-tab-text-color-hover);
 `)])]),E(`closable`,`padding-right: 8px;`),E(`active`,`
 background-color: #0000;
 font-weight: var(--n-tab-font-weight-active);
 color: var(--n-tab-text-color-active);
 `),E(`disabled`,`color: var(--n-tab-text-color-disabled);`)])]),E(`left, right`,`
 flex-direction: column; 
 `,[e(`prefix, suffix`,`
 padding: var(--n-tab-padding-vertical);
 `),S(`tabs-wrapper`,`
 flex-direction: column;
 `),S(`tabs-tab-wrapper`,`
 flex-direction: column;
 `,[S(`tabs-tab-pad`,`
 height: var(--n-tab-gap-vertical);
 width: 100%;
 `)])]),E(`top`,[E(`card-type`,[S(`tabs-scroll-padding`,`border-bottom: 1px solid var(--n-tab-border-color);`),e(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),S(`tabs-tab`,`
 border-top-left-radius: var(--n-tab-border-radius);
 border-top-right-radius: var(--n-tab-border-radius);
 `,[E(`active`,`
 border-bottom: 1px solid #0000;
 `)]),S(`tabs-tab-pad`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),S(`tabs-pad`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `)])]),E(`left`,[E(`card-type`,[S(`tabs-scroll-padding`,`border-right: 1px solid var(--n-tab-border-color);`),e(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),S(`tabs-tab`,`
 border-top-left-radius: var(--n-tab-border-radius);
 border-bottom-left-radius: var(--n-tab-border-radius);
 `,[E(`active`,`
 border-right: 1px solid #0000;
 `)]),S(`tabs-tab-pad`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),S(`tabs-pad`,`
 border-right: 1px solid var(--n-tab-border-color);
 `)])]),E(`right`,[E(`card-type`,[S(`tabs-scroll-padding`,`border-left: 1px solid var(--n-tab-border-color);`),e(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),S(`tabs-tab`,`
 border-top-right-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[E(`active`,`
 border-left: 1px solid #0000;
 `)]),S(`tabs-tab-pad`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),S(`tabs-pad`,`
 border-left: 1px solid var(--n-tab-border-color);
 `)])]),E(`bottom`,[E(`card-type`,[S(`tabs-scroll-padding`,`border-top: 1px solid var(--n-tab-border-color);`),e(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),S(`tabs-tab`,`
 border-bottom-left-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[E(`active`,`
 border-top: 1px solid #0000;
 `)]),S(`tabs-tab-pad`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),S(`tabs-pad`,`
 border-top: 1px solid var(--n-tab-border-color);
 `)])])])]),it=Ge,at=Object.assign(Object.assign({},k.props),{value:[String,Number],defaultValue:[String,Number],trigger:{type:String,default:`click`},type:{type:String,default:`bar`},closable:Boolean,justifyContent:String,size:String,placement:{type:String,default:`top`},tabStyle:[String,Object],tabClass:String,addTabStyle:[String,Object],addTabClass:String,barWidth:Number,paneClass:String,paneStyle:[String,Object],paneWrapperClass:String,paneWrapperStyle:[String,Object],addable:[Boolean,Object],tabsPadding:{type:Number,default:0},animated:Boolean,onBeforeLeave:Function,onAdd:Function,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onClose:[Function,Array],labelSize:String,activeName:[String,Number],onActiveNameChange:[Function,Array]}),ot=a({name:`Tabs`,props:at,slots:Object,setup(e,{slots:t}){let{mergedClsPrefixRef:n,inlineThemeDisabled:i,mergedComponentPropsRef:a}=L(e),c=k(`Tabs`,`-tabs`,rt,xe,e,n),d=h(null),f=h(null),p=h(null),m=h(null),_=h(null),v=h(null),y=h(!0),x=h(!0),S=q(e,[`labelSize`,`size`]),C=G(()=>S.value?S.value:a?.value?.Tabs?.size||`medium`),ee=q(e,[`activeName`,`value`]),w=h(ee.value??e.defaultValue??(t.default?pe(t.default())[0]?.props?.name:null)),T=me(ee,w),E={id:0},ne=G(()=>{if(!(!e.justifyContent||e.type===`card`))return{display:`flex`,justifyContent:e.justifyContent}});o(T,()=>{E.id=0,N(),re()});function D(){let{value:e}=T;return e===null?null:d.value?.querySelector(`[data-name="${e}"]`)}function O(t){if(e.type===`card`)return;let{value:r}=f;if(!r)return;let i=r.style.opacity===`0`;if(t){let a=`${n.value}-tabs-bar--disabled`,{barWidth:o,placement:s}=e;if(t.dataset.disabled===`true`?r.classList.add(a):r.classList.remove(a),[`top`,`bottom`].includes(s)){if(M([`top`,`maxHeight`,`height`]),typeof o==`number`&&t.offsetWidth>=o){let e=Math.floor((t.offsetWidth-o)/2)+t.offsetLeft;r.style.left=`${e}px`,r.style.maxWidth=`${o}px`}else r.style.left=`${t.offsetLeft}px`,r.style.maxWidth=`${t.offsetWidth}px`;r.style.width=`8192px`,i&&(r.style.transition=`none`),r.offsetWidth,i&&(r.style.transition=``,r.style.opacity=`1`)}else{if(M([`left`,`maxWidth`,`width`]),typeof o==`number`&&t.offsetHeight>=o){let e=Math.floor((t.offsetHeight-o)/2)+t.offsetTop;r.style.top=`${e}px`,r.style.maxHeight=`${o}px`}else r.style.top=`${t.offsetTop}px`,r.style.maxHeight=`${t.offsetHeight}px`;r.style.height=`8192px`,i&&(r.style.transition=`none`),r.offsetHeight,i&&(r.style.transition=``,r.style.opacity=`1`)}}}function j(){if(e.type===`card`)return;let{value:t}=f;t&&(t.style.opacity=`0`)}function M(e){let{value:t}=f;if(t)for(let n of e)t.style[n]=``}function N(){if(e.type===`card`)return;let t=D();t?O(t):j()}function re(){let e=_.value?.$el;if(!e)return;let t=D();if(!t)return;let{scrollLeft:n,offsetWidth:r}=e,{offsetLeft:i,offsetWidth:a}=t;n>i?e.scrollTo({top:0,left:i,behavior:`smooth`}):i+a>n+r&&e.scrollTo({top:0,left:i+a-r,behavior:`smooth`})}let F=h(null),I=0,R=null;function ie(e){let t=F.value;if(t){I=e.getBoundingClientRect().height;let n=`${I}px`,r=()=>{t.style.height=n,t.style.maxHeight=n};R?(r(),R(),R=null):R=r}}function z(e){let t=F.value;if(t){let n=e.getBoundingClientRect().height,r=()=>{document.body.offsetHeight,t.style.maxHeight=`${n}px`,t.style.height=`${Math.max(I,n)}px`};R?(R(),R=null,r()):R=r}}function ae(){let t=F.value;if(t){t.style.maxHeight=``,t.style.height=``;let{paneWrapperStyle:n}=e;if(typeof n==`string`)t.style.cssText=n;else if(n){let{maxHeight:e,height:r}=n;e!==void 0&&(t.style.maxHeight=e),r!==void 0&&(t.style.height=r)}}}let V={value:[]},H=h(`next`);function oe(e){let t=T.value,n=`next`;for(let r of V.value){if(r===t)break;if(r===e){n=`prev`;break}}H.value=n,U(e)}function U(t){let{onActiveNameChange:n,onUpdateValue:r,"onUpdate:value":i}=e;n&&g(n,t),r&&g(r,t),i&&g(i,t),w.value=t}function W(t){let{onClose:n}=e;n&&g(n,t)}let K=!0;function se(){let{value:e}=f;if(!e)return;K||=!1;let t=`transition-disabled`;e.classList.add(t),N(),e.classList.remove(t)}let J=h(null);function le({transitionDisabled:e}){let t=d.value;if(!t)return;e&&t.classList.add(`transition-disabled`);let n=D();n&&J.value&&(J.value.style.width=`${n.offsetWidth}px`,J.value.style.height=`${n.offsetHeight}px`,J.value.style.transform=`translateX(${n.offsetLeft-b(getComputedStyle(t).paddingLeft)}px)`,e&&J.value.offsetWidth),e&&t.classList.remove(`transition-disabled`)}o([T],()=>{e.type===`segment`&&A(()=>{le({transitionDisabled:!1})})}),s(()=>{e.type===`segment`&&le({transitionDisabled:!0})});let ue=0;function de(t){if(t.contentRect.width===0&&t.contentRect.height===0||ue===t.contentRect.width)return;ue=t.contentRect.width;let{type:n}=e;if((n===`line`||n===`bar`)&&(K||e.justifyContent?.startsWith(`space`))&&se(),n!==`segment`){let{placement:t}=e;ve((t===`top`||t===`bottom`?_.value?.$el:v.value)||null)}}let fe=it(de,64);o([()=>e.justifyContent,()=>e.size],()=>{A(()=>{let{type:t}=e;(t===`line`||t===`bar`)&&se()})});let Y=h(!1);function he(t){let{target:n,contentRect:{width:r,height:i}}=t,a=n.parentElement.parentElement.offsetWidth,o=n.parentElement.parentElement.offsetHeight,{placement:s}=e;if(!Y.value)s===`top`||s===`bottom`?a<r&&(Y.value=!0):o<i&&(Y.value=!0);else{let{value:e}=m;if(!e)return;s===`top`||s===`bottom`?a-r>e.$el.offsetWidth&&(Y.value=!1):o-i>e.$el.offsetHeight&&(Y.value=!1)}ve(_.value?.$el||null)}let ge=it(he,64);function _e(){let{onAdd:t}=e;t&&t(),A(()=>{let e=D(),{value:t}=_;!e||!t||t.scrollTo({left:e.offsetLeft,top:0,behavior:`smooth`})})}function ve(t){if(!t)return;let{placement:n}=e;if(n===`top`||n===`bottom`){let{scrollLeft:e,scrollWidth:n,offsetWidth:r}=t;y.value=e<=0,x.value=e+r>=n}else{let{scrollTop:e,scrollHeight:n,offsetHeight:r}=t;y.value=e<=0,x.value=e+r>=n}}let ye=it(e=>{ve(e.target)},64);r(Qe,{triggerRef:B(e,`trigger`),tabStyleRef:B(e,`tabStyle`),tabClassRef:B(e,`tabClass`),addTabStyleRef:B(e,`addTabStyle`),addTabClassRef:B(e,`addTabClass`),paneClassRef:B(e,`paneClass`),paneStyleRef:B(e,`paneStyle`),mergedClsPrefixRef:n,typeRef:B(e,`type`),closableRef:B(e,`closable`),valueRef:T,tabChangeIdRef:E,onBeforeLeaveRef:B(e,`onBeforeLeave`),activateTab:oe,handleClose:W,handleAdd:_e}),ce(()=>{N(),re()}),l(()=>{let{value:e}=p;if(!e)return;let{value:t}=n,r=`${t}-tabs-nav-scroll-wrapper--shadow-start`,i=`${t}-tabs-nav-scroll-wrapper--shadow-end`;y.value?e.classList.remove(r):e.classList.add(r),x.value?e.classList.remove(i):e.classList.add(i)});let be={syncBarPosition:()=>{N()}},Se=()=>{le({transitionDisabled:!0})},Ce=G(()=>{let{value:t}=C,{type:n}=e,r=`${t}${{card:`Card`,bar:`Bar`,line:`Line`,segment:`Segment`}[n]}`,{self:{barColor:i,closeIconColor:a,closeIconColorHover:o,closeIconColorPressed:s,tabColor:l,tabBorderColor:d,paneTextColor:f,tabFontWeight:p,tabBorderRadius:m,tabFontWeightActive:h,colorSegment:g,fontWeightStrong:_,tabColorSegment:v,closeSize:y,closeIconSize:b,closeColorHover:x,closeColorPressed:S,closeBorderRadius:ee,[P(`panePadding`,t)]:w,[P(`tabPadding`,r)]:T,[P(`tabPaddingVertical`,r)]:E,[P(`tabGap`,r)]:te,[P(`tabGap`,`${r}Vertical`)]:ne,[P(`tabTextColor`,n)]:D,[P(`tabTextColorActive`,n)]:O,[P(`tabTextColorHover`,n)]:k,[P(`tabTextColorDisabled`,n)]:A,[P(`tabFontSize`,t)]:j},common:{cubicBezierEaseInOut:M}}=c.value;return{"--n-bezier":M,"--n-color-segment":g,"--n-bar-color":i,"--n-tab-font-size":j,"--n-tab-text-color":D,"--n-tab-text-color-active":O,"--n-tab-text-color-disabled":A,"--n-tab-text-color-hover":k,"--n-pane-text-color":f,"--n-tab-border-color":d,"--n-tab-border-radius":m,"--n-close-size":y,"--n-close-icon-size":b,"--n-close-color-hover":x,"--n-close-color-pressed":S,"--n-close-border-radius":ee,"--n-close-icon-color":a,"--n-close-icon-color-hover":o,"--n-close-icon-color-pressed":s,"--n-tab-color":l,"--n-tab-font-weight":p,"--n-tab-font-weight-active":h,"--n-tab-padding":T,"--n-tab-padding-vertical":E,"--n-tab-gap":te,"--n-tab-gap-vertical":ne,"--n-pane-padding-left":u(w,`left`),"--n-pane-padding-right":u(w,`right`),"--n-pane-padding-top":u(w,`top`),"--n-pane-padding-bottom":u(w,`bottom`),"--n-font-weight-strong":_,"--n-tab-color-segment":v}}),X=i?te(`tabs`,G(()=>`${C.value[0]}${e.type[0]}`),Ce,e):void 0;return Object.assign({mergedClsPrefix:n,mergedValue:T,renderedNames:new Set,segmentCapsuleElRef:J,tabsPaneWrapperRef:F,tabsElRef:d,barElRef:f,addTabInstRef:m,xScrollInstRef:_,scrollWrapperElRef:p,addTabFixed:Y,tabWrapperStyle:ne,handleNavResize:fe,mergedSize:C,handleScroll:ye,handleTabsResize:ge,cssVars:i?void 0:Ce,themeClass:X?.themeClass,animationDirection:H,renderNameListRef:V,yScrollElRef:v,handleSegmentResize:Se,onAnimationBeforeLeave:ie,onAnimationEnter:z,onAnimationAfterEnter:ae,onRender:X?.onRender},be)},render(){let{mergedClsPrefix:e,type:t,placement:n,addTabFixed:r,addable:i,mergedSize:a,renderNameListRef:o,onRender:s,paneWrapperClass:c,paneWrapperStyle:l,$slots:{default:u,prefix:d,suffix:f}}=this;s?.();let h=u?pe(u()).filter(e=>e.type.__TAB_PANE__===!0):[],g=u?pe(u()).filter(e=>e.type.__TAB__===!0):[],_=!g.length,v=t===`card`,y=t===`segment`,b=!v&&!y&&this.justifyContent;o.value=[];let x=()=>{let t=p(`div`,{style:this.tabWrapperStyle,class:`${e}-tabs-wrapper`},b?null:p(`div`,{class:`${e}-tabs-scroll-padding`,style:n===`top`||n===`bottom`?{width:`${this.tabsPadding}px`}:{height:`${this.tabsPadding}px`}}),_?h.map((e,t)=>(o.value.push(e.props.name),ut(p(nt,Object.assign({},e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0&&(!b||b===`center`||b===`start`||b===`end`)}),e.children?{default:e.children.tab}:void 0)))):g.map((e,t)=>(o.value.push(e.props.name),ut(t!==0&&!b?lt(e):e))),!r&&i&&v?ct(i,(_?h.length:g.length)!==0):null,b?null:p(`div`,{class:`${e}-tabs-scroll-padding`,style:{width:`${this.tabsPadding}px`}}));return p(`div`,{ref:`tabsElRef`,class:`${e}-tabs-nav-scroll-content`},v&&i?p(m,{onResize:this.handleTabsResize},{default:()=>t}):t,v?p(`div`,{class:`${e}-tabs-pad`}):null,v?null:p(`div`,{ref:`barElRef`,class:`${e}-tabs-bar`}))},S=y?`top`:n;return p(`div`,{class:[`${e}-tabs`,this.themeClass,`${e}-tabs--${t}-type`,`${e}-tabs--${a}-size`,b&&`${e}-tabs--flex`,`${e}-tabs--${S}`],style:this.cssVars},p(`div`,{class:[`${e}-tabs-nav--${t}-type`,`${e}-tabs-nav--${S}`,`${e}-tabs-nav`]},W(d,t=>t&&p(`div`,{class:`${e}-tabs-nav__prefix`},t)),y?p(m,{onResize:this.handleSegmentResize},{default:()=>p(`div`,{class:`${e}-tabs-rail`,ref:`tabsElRef`},p(`div`,{class:`${e}-tabs-capsule`,ref:`segmentCapsuleElRef`},p(`div`,{class:`${e}-tabs-wrapper`},p(`div`,{class:`${e}-tabs-tab`}))),_?h.map((e,t)=>(o.value.push(e.props.name),p(nt,Object.assign({},e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0}),e.children?{default:e.children.tab}:void 0))):g.map((e,t)=>(o.value.push(e.props.name),t===0?e:lt(e))))}):p(m,{onResize:this.handleNavResize},{default:()=>p(`div`,{class:`${e}-tabs-nav-scroll-wrapper`,ref:`scrollWrapperElRef`},[`top`,`bottom`].includes(S)?p(De,{ref:`xScrollInstRef`,onScroll:this.handleScroll},{default:x}):p(`div`,{class:`${e}-tabs-nav-y-scroll`,onScroll:this.handleScroll,ref:`yScrollElRef`},x()))}),r&&i&&v?ct(i,!0):null,W(f,t=>t&&p(`div`,{class:`${e}-tabs-nav__suffix`},t))),_&&(this.animated&&(S===`top`||S===`bottom`)?p(`div`,{ref:`tabsPaneWrapperRef`,style:l,class:[`${e}-tabs-pane-wrapper`,c]},st(h,this.mergedValue,this.renderedNames,this.onAnimationBeforeLeave,this.onAnimationEnter,this.onAnimationAfterEnter,this.animationDirection)):st(h,this.mergedValue,this.renderedNames)))}});function st(e,t,n,r,i,a,o){let s=[];return e.forEach(e=>{let{name:r,displayDirective:i,"display-directive":a}=e.props,o=e=>i===e||a===e,l=t===r;if(e.key!==void 0&&(e.key=r),l||o(`show`)||o(`show:lazy`)&&n.has(r)){n.has(r)||n.add(r);let t=!o(`if`);s.push(t?c(e,[[T,l]]):e)}}),o?p(N,{name:`${o}-transition`,onBeforeLeave:r,onEnter:i,onAfterEnter:a},{default:()=>s}):s}function ct(e,t){return p(nt,{ref:`addTabInstRef`,key:`__addable`,name:`__addable`,internalCreatedByPane:!0,internalAddable:!0,internalLeftPadded:t,disabled:typeof e==`object`&&e.disabled})}function lt(e){let t=V(e);return t.props?t.props.internalLeftPadded=!0:t.props={internalLeftPadded:!0},t}function ut(e){return Array.isArray(e.dynamicProps)?e.dynamicProps.includes(`internalLeftPadded`)||e.dynamicProps.push(`internalLeftPadded`):e.dynamicProps=[`internalLeftPadded`],e}var dt={key:1,class:`tab-loading`},ft=I(a({__name:`DockerView`,setup(e){let t=Ce();function n(e){return e instanceof ee&&e.status===503&&!!e.body&&typeof e.body==`object`&&`enabled`in e.body}function r(e,n){t.error(e instanceof ee?e.message:n)}let a=e=>e===`running`?`success`:e===`paused`||e===`restarting`?`warning`:e===`dead`?`error`:`default`,c={running:0,restarting:1,paused:2,created:3,exited:4,dead:5};function l(e){return c[e.state]??6}function u(e,t){return e.hasStats?t(e.stats):-1}let f=h([]),m=h(!0),g=h(null),_;async function b(){try{let e=await Z.containers();f.value=e.containers,g.value=null}catch(e){n(e)&&(g.value=e.body)}finally{m.value=!1}}async function x(e,t){try{let n=await Z.containerAction(e,t);f.value=n.containers}catch(e){r(e,`Aksi ${t} gagal`)}}let S=[{title:`Nama`,key:`name`,width:160,ellipsis:{tooltip:!0},sorter:(e,t)=>e.name.localeCompare(t.name)},{title:`Image`,key:`image`,width:180,ellipsis:{tooltip:!0},sorter:(e,t)=>e.image.localeCompare(t.image)},{title:`Status`,key:`state`,width:130,sorter:(e,t)=>l(e)-l(t),render:e=>p(ye,{type:a(e.state),size:`small`},{default:()=>e.status})},{title:`CPU`,key:`cpu`,width:70,sorter:(e,t)=>u(e,e=>e.cpuPercent)-u(t,e=>e.cpuPercent),render:e=>e.hasStats?`${e.stats.cpuPercent.toFixed(1)}%`:`—`},{title:`RAM`,key:`ram`,width:150,sorter:(e,t)=>u(e,e=>e.memUsageBytes)-u(t,e=>e.memUsageBytes),render:e=>e.hasStats?`${Q(e.stats.memUsageBytes)} / ${Q(e.stats.memLimitBytes)}`:`—`},{title:`Network`,key:`net`,width:140,sorter:(e,t)=>u(e,e=>e.netRxBytes+e.netTxBytes)-u(t,e=>e.netRxBytes+e.netTxBytes),render:e=>e.hasStats?`↓ ${Q(e.stats.netRxBytes)} ↑ ${Q(e.stats.netTxBytes)}`:`—`},{title:`Ports`,key:`ports`,width:220,ellipsis:{tooltip:!0}},{title:`Aksi`,key:`actions`,width:220,render:e=>p(X,{size:`small`},()=>[e.state===`running`?[p(w,{size:`tiny`,onClick:()=>x(e.id,`stop`)},()=>`Stop`),p(w,{size:`tiny`,onClick:()=>x(e.id,`restart`)},()=>`Restart`)]:p(w,{size:`tiny`,type:`primary`,onClick:()=>x(e.id,`start`)},()=>`Start`),p(we,{onPositiveClick:()=>x(e.id,`remove`)},{trigger:()=>p(w,{size:`tiny`,type:`error`,ghost:!0},()=>`Hapus`),default:()=>`Hapus container "${e.name}"?`})])}],C=h([]),T=h(!0),E=h(null);async function te(){T.value=!0;try{let e=await Z.images();C.value=e.images,E.value=null}catch(e){n(e)&&(E.value=e.body)}finally{T.value=!1}}async function D(e){try{let t=await Z.removeImage(e);C.value=t.images}catch(e){r(e,`Hapus image gagal (mungkin masih dipakai container)`)}}let k=[{title:`Tag`,key:`tag`,minWidth:200,ellipsis:{tooltip:!0},sorter:(e,t)=>e.tag.localeCompare(t.tag),render:e=>e.dangling?p(X,{size:`small`,align:`center`},()=>[e.tag,p(ye,{size:`small`,type:`warning`},()=>`dangling`)]):e.tag},{title:`Ukuran`,key:`sizeBytes`,width:110,sorter:(e,t)=>e.sizeBytes-t.sizeBytes,render:e=>Q(e.sizeBytes)},{title:`Dipakai`,key:`containers`,width:140,sorter:(e,t)=>e.containers-t.containers,render:e=>e.containers<0?`—`:e.containers===0?`tidak dipakai`:`${e.containers} container`},{title:`Dibuat`,key:`created`,width:150,sorter:(e,t)=>Date.parse(e.created)-Date.parse(t.created),render:e=>Te(e.created)},{title:`Aksi`,key:`actions`,width:100,render:e=>p(we,{onPositiveClick:()=>D(e.id)},{trigger:()=>p(w,{size:`tiny`,type:`error`,ghost:!0},()=>`Hapus`),default:()=>`Hapus image "${e.tag}"?`})}],A=h([]),j=h(!0),M=h(null);async function N(){j.value=!0;try{let e=await Z.volumes();A.value=e.volumes,M.value=null}catch(e){n(e)&&(M.value=e.body)}finally{j.value=!1}}async function re(e){try{let t=await Z.removeVolume(e);A.value=t.volumes}catch(e){r(e,`Hapus volume gagal (mungkin masih dipakai container)`)}}let P=[{title:`Nama`,key:`name`,minWidth:180,ellipsis:{tooltip:!0},sorter:(e,t)=>e.name.localeCompare(t.name)},{title:`Driver`,key:`driver`,width:100,sorter:(e,t)=>e.driver.localeCompare(t.driver)},{title:`Ukuran`,key:`sizeBytes`,width:110,sorter:(e,t)=>e.sizeBytes-t.sizeBytes,render:e=>e.sizeBytes<0?`tidak diketahui`:Q(e.sizeBytes)},{title:`Status`,key:`inUse`,width:120,sorter:(e,t)=>Number(e.inUse)-Number(t.inUse),render:e=>p(ye,{size:`small`,type:e.inUse?`success`:`default`},()=>e.inUse?`dipakai`:`tidak dipakai`)},{title:`Aksi`,key:`actions`,width:100,render:e=>p(we,{onPositiveClick:()=>re(e.name)},{trigger:()=>p(w,{size:`tiny`,type:`error`,ghost:!0},()=>`Hapus`),default:()=>`Hapus volume "${e.name}"?`})}],F=h([]),I=h(!0),L=h(null);async function ie(){I.value=!0;try{let e=await Z.networks();F.value=e.networks,L.value=null}catch(e){n(e)&&(L.value=e.body)}finally{I.value=!1}}async function ae(e){try{let t=await Z.removeNetwork(e);F.value=t.networks}catch(e){r(e,`Hapus network gagal (mungkin builtin atau masih dipakai)`)}}let B=[{title:`Nama`,key:`name`,minWidth:160,ellipsis:{tooltip:!0},sorter:(e,t)=>e.name.localeCompare(t.name),render:e=>e.builtin?p(X,{size:`small`,align:`center`},()=>[e.name,p(ye,{size:`small`},()=>`builtin`)]):e.name},{title:`Driver`,key:`driver`,width:100,sorter:(e,t)=>e.driver.localeCompare(t.driver)},{title:`Subnet`,key:`subnet`,width:150,sorter:(e,t)=>e.subnet.localeCompare(t.subnet),render:e=>e.subnet||`—`},{title:`Container Terhubung`,key:`connectedCount`,width:170,sorter:(e,t)=>e.connectedCount-t.connectedCount},{title:`Aksi`,key:`actions`,width:100,render:e=>e.builtin?null:p(we,{onPositiveClick:()=>ae(e.id)},{trigger:()=>p(w,{size:`tiny`,type:`error`,ghost:!0},()=>`Hapus`),default:()=>`Hapus network "${e.name}"?`})}],V=h(null),oe=h(!0),W=h(null),G=h(null);async function se(){oe.value=!0;try{V.value=await Z.settings(),W.value=null}catch(e){n(e)&&(W.value=e.body)}finally{oe.value=!1}}async function ce(e){G.value=e;try{V.value=await Z.prune(e),t.success(`Cleanup selesai`)}catch(t){r(t,`Cleanup gagal: ${e}`)}finally{G.value=null}}let q=h(`containers`),J=new Set([`containers`]);return o(q,e=>{J.has(e)||(J.add(e),e===`images`?te():e===`volumes`?N():e===`networks`?ie():e===`settings`&&se())}),s(()=>{b(),_=setInterval(b,5e3)}),d(()=>{_&&clearInterval(_)}),(e,t)=>(K(),U(ue,null,{default:R(()=>[v(O(ot),{type:`line`,value:q.value,"onUpdate:value":t[0]||=e=>q.value=e},{default:R(()=>[v(O(et),{name:`containers`,tab:`Containers`},{default:R(()=>[g.value?(K(),U(O(be),{key:0,type:`warning`,title:g.value.error},null,8,[`title`])):(K(),U(O(Y),{key:1,columns:S,data:f.value,loading:m.value,"row-key":e=>e.id,"scroll-x":1200},null,8,[`data`,`loading`,`row-key`]))]),_:1}),v(O(et),{name:`images`,tab:`Images`},{default:R(()=>[E.value?(K(),U(O(be),{key:0,type:`warning`,title:E.value.error},null,8,[`title`])):(K(),U(O(Y),{key:1,columns:k,data:C.value,loading:T.value,"row-key":e=>e.id,"scroll-x":700},null,8,[`data`,`loading`,`row-key`]))]),_:1}),v(O(et),{name:`volumes`,tab:`Volumes`},{default:R(()=>[M.value?(K(),U(O(be),{key:0,type:`warning`,title:M.value.error},null,8,[`title`])):(K(),U(O(Y),{key:1,columns:P,data:A.value,loading:j.value,"row-key":e=>e.name,"scroll-x":610},null,8,[`data`,`loading`,`row-key`]))]),_:1}),v(O(et),{name:`networks`,tab:`Networks`},{default:R(()=>[L.value?(K(),U(O(be),{key:0,type:`warning`,title:L.value.error},null,8,[`title`])):(K(),U(O(Y),{key:1,columns:B,data:F.value,loading:I.value,"row-key":e=>e.id,"scroll-x":680},null,8,[`data`,`loading`,`row-key`]))]),_:1}),v(O(et),{name:`settings`,tab:`Settings`},{default:R(()=>[W.value?(K(),U(O(be),{key:0,type:`warning`,title:W.value.error},null,8,[`title`])):oe.value&&!V.value?(K(),i(`div`,dt,[v(O(de),{size:`large`})])):V.value?(K(),U(O(X),{key:3,vertical:``,size:24},{default:R(()=>[v(O(Xe),{title:`Info Daemon`,column:2,bordered:``,"label-placement":`left`},{default:R(()=>[v(O($),{label:`Versi Server`},{default:R(()=>[H(z(V.value?.info.serverVersion),1)]),_:1}),v(O($),{label:`OS / Kernel`},{default:R(()=>[H(z(V.value?.info.operatingSystem)+` / `+z(V.value?.info.kernelVersion),1)]),_:1}),v(O($),{label:`Storage Driver`},{default:R(()=>[H(z(V.value?.info.storageDriver),1)]),_:1}),v(O($),{label:`Root Dir`},{default:R(()=>[H(z(V.value?.info.dockerRootDir),1)]),_:1}),v(O($),{label:`Container`},{default:R(()=>[H(z(V.value?.info.containersRunning)+` running, `+z(V.value?.info.containersPaused)+` paused, `+z(V.value?.info.containersStopped)+` stopped `,1)]),_:1}),v(O($),{label:`Images`},{default:R(()=>[H(z(V.value?.info.images),1)]),_:1})]),_:1}),v(O(Xe),{title:`Disk Usage`,column:2,bordered:``,"label-placement":`left`},{default:R(()=>[v(O($),{label:`Images`},{default:R(()=>[H(z(O(Q)(V.value?.diskUsage.imagesTotalBytes??0))+` (reclaimable `+z(O(Q)(V.value?.diskUsage.imagesReclaimableBytes??0))+`) `,1)]),_:1}),v(O($),{label:`Containers`},{default:R(()=>[H(z(O(Q)(V.value?.diskUsage.containersTotalBytes??0)),1)]),_:1}),v(O($),{label:`Volumes`},{default:R(()=>[H(z(O(Q)(V.value?.diskUsage.volumesTotalBytes??0))+` (reclaimable `+z(O(Q)(V.value?.diskUsage.volumesReclaimableBytes??0))+`) `,1)]),_:1})]),_:1}),v(O(X),null,{default:R(()=>[(K(),i(ne,null,y([`containers`,`images`,`volumes`,`networks`,`all`],e=>v(O(we),{key:e,onPositiveClick:t=>ce(e)},{trigger:R(()=>[v(O(w),{size:`small`,loading:G.value===e},{default:R(()=>[H(`Bersihkan `+z(e),1)]),_:2},1032,[`loading`])]),default:R(()=>[H(` Jalankan cleanup "`+z(e)+`"? Tindakan ini tidak bisa dibatalkan. `,1)]),_:2},1032,[`onPositiveClick`])),64))]),_:1})]),_:1})):(K(),U(O(fe),{key:2,description:`Tidak ada data`}))]),_:1})]),_:1},8,[`value`])]),_:1}))}}),[[`__scopeId`,`data-v-d232fd8a`]]);export{ft as default};