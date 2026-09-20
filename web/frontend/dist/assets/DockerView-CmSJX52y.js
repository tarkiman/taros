import{$n as e,An as t,Bn as n,Bt as r,Cn as i,Dn as a,Fn as o,Gt as s,Hn as c,Ht as l,In as u,It as d,Ln as f,Mn as p,N as m,Nn as h,Nt as g,Pn as _,Pt as v,Qn as y,Rn as b,Tt as x,U as S,Un as C,V as w,Vn as T,Xn as E,Yn as ee,Zt as D,_ as O,_r as k,_t as A,ar as j,br as M,c as N,cn as P,d as F,dn as I,dr as L,er as te,fn as R,gn as ne,h as z,hn as re,i as ie,in as B,ir as V,jn as H,ln as U,m as ae,mn as W,mr as G,mt as K,nn as oe,nr as se,o as q,or as J,pn as ce,sr as le,vr as Y,wn as ue,wt as de,xn as fe,xt as pe}from"./auth-DMtWjmL3.js";import{T as me,_ as he,f as ge,l as _e,t as ve,v as ye,w as be}from"./AppShell-D5nh7ups.js";import{i as xe,r as Se,t as Ce}from"./DataTable-DUPRHDHy.js";import{u as we}from"./useTheme-qJEnNIkD.js";import{t as Te}from"./Modal-D_UhbDiC.js";import{c as Ee,n as X}from"./LocaleSwitcher-BoEvypuv.js";import{n as De,t as Oe}from"./render-eCl_raHH.js";import{t as ke}from"./get-slot-6kXJmSMP.js";import{t as Ae}from"./Input-CqnCGn0x.js";import{t as je}from"./Add-B05OZnRO.js";import{t as Me}from"./Tag-CvHwKaSo.js";import{t as Ne}from"./Checkbox-vWiZoJr_.js";import{n as Pe,r as Fe}from"./light-Cuqr_20i.js";import{t as Ie}from"./use-message-B_UXk7pt.js";import{n as Le,t as Re}from"./DrawerContent-BpqUcUW3.js";import{t as ze}from"./Space-BY3ZRy7j.js";import{t as Be}from"./Popconfirm-BYO4ox1o.js";import{n as Ve,r as He,t as Z}from"./copy-C-P6wZ_D.js";import{t as Ue}from"./trash-2-Ct4SxOeu.js";import{i as We,n as Ge,t as Q}from"./docker-B8MKg95m.js";import{n as Ke,t as $}from"./format-BxLcbkc3.js";var qe=he(`.v-x-scroll`,{overflow:`auto`,scrollbarWidth:`none`},[he(`&::-webkit-scrollbar`,{width:0,height:0})]),Je=b({name:`XScroll`,props:{disabled:Boolean,onScroll:Function},setup(){let e=L(null);function t(e){!(e.currentTarget.offsetWidth<e.currentTarget.scrollWidth)||e.deltaY===0||(e.currentTarget.scrollLeft+=e.deltaY+e.deltaX,e.preventDefault())}let n=l();return qe.mount({id:`vueuc/x-scroll`,head:!0,anchorMetaName:ye,ssr:n}),Object.assign({selfRef:e,handleWheel:t},{scrollTo(...t){var n;(n=e.value)==null||n.scrollTo(...t)}})},render(){return n(`div`,{ref:`selfRef`,onScroll:this.onScroll,onWheel:this.disabled?void 0:this.handleWheel,class:`v-x-scroll`},this.$slots)}});function Ye(e,t=`default`,n=[]){let{children:r}=e;if(typeof r==`object`&&r&&!Array.isArray(r)){let e=r[t];if(typeof e==`function`)return e()}return n}var Xe=/\s/;function Ze(e){for(var t=e.length;t--&&Xe.test(e.charAt(t)););return t}var Qe=/^\s+/;function $e(e){return e&&e.slice(0,Ze(e)+1).replace(Qe,``)}var et=NaN,tt=/^[-+]0x[0-9a-f]+$/i,nt=/^0b[01]+$/i,rt=/^0o[0-7]+$/i,it=parseInt;function at(e){if(typeof e==`number`)return e;if(A(e))return et;if(K(e)){var t=typeof e.valueOf==`function`?e.valueOf():e;e=K(t)?t+``:t}if(typeof e!=`string`)return e===0?e:+e;e=$e(e);var n=nt.test(e);return n||rt.test(e)?it(e.slice(2),n?2:8):tt.test(e)?et:+e}var ot=function(){return pe.Date.now()},st=`Expected a function`,ct=Math.max,lt=Math.min;function ut(e,t,n){var r,i,a,o,s,c,l=0,u=!1,d=!1,f=!0;if(typeof e!=`function`)throw TypeError(st);t=at(t)||0,K(n)&&(u=!!n.leading,d=`maxWait`in n,a=d?ct(at(n.maxWait)||0,t):a,f=`trailing`in n?!!n.trailing:f);function p(t){var n=r,a=i;return r=i=void 0,l=t,o=e.apply(a,n),o}function m(e){return l=e,s=setTimeout(_,t),u?p(e):o}function h(e){var n=e-c,r=e-l,i=t-n;return d?lt(i,a-r):i}function g(e){var n=e-c,r=e-l;return c===void 0||n>=t||n<0||d&&r>=a}function _(){var e=ot();if(g(e))return v(e);s=setTimeout(_,h(e))}function v(e){return s=void 0,f&&r?p(e):(r=i=void 0,o)}function y(){s!==void 0&&clearTimeout(s),l=0,r=c=i=s=void 0}function b(){return s===void 0?o:v(ot())}function x(){var e=ot(),n=g(e);if(r=arguments,i=this,c=e,n){if(s===void 0)return m(c);if(d)return clearTimeout(s),s=setTimeout(_,t),p(c)}return s===void 0&&(s=setTimeout(_,t)),o}return x.cancel=y,x.flush=b,x}var dt=`Expected a function`;function ft(e,t,n){var r=!0,i=!0;if(typeof e!=`function`)throw TypeError(dt);return K(n)&&(r=`leading`in n?!!n.leading:r,i=`trailing`in n?!!n.trailing:i),ut(e,t,{leading:r,maxWait:t,trailing:i})}var pt=P([U(`descriptions`,{fontSize:`var(--n-font-size)`},[U(`descriptions-separator`,`
 display: inline-block;
 margin: 0 8px 0 2px;
 `),U(`descriptions-table-wrapper`,[U(`descriptions-table`,[U(`descriptions-table-row`,[U(`descriptions-table-header`,{padding:`var(--n-th-padding)`}),U(`descriptions-table-content`,{padding:`var(--n-td-padding)`})])])]),ce(`bordered`,[U(`descriptions-table-wrapper`,[U(`descriptions-table`,[U(`descriptions-table-row`,[P(`&:last-child`,[U(`descriptions-table-content`,{paddingBottom:0})])])])])]),R(`left-label-placement`,[U(`descriptions-table-content`,[P(`> *`,{verticalAlign:`top`})])]),R(`left-label-align`,[P(`th`,{textAlign:`left`})]),R(`center-label-align`,[P(`th`,{textAlign:`center`})]),R(`right-label-align`,[P(`th`,{textAlign:`right`})]),R(`bordered`,[U(`descriptions-table-wrapper`,`
 border-radius: var(--n-border-radius);
 overflow: hidden;
 background: var(--n-merged-td-color);
 border: 1px solid var(--n-merged-border-color);
 `,[U(`descriptions-table`,[U(`descriptions-table-row`,[P(`&:not(:last-child)`,[U(`descriptions-table-content`,{borderBottom:`1px solid var(--n-merged-border-color)`}),U(`descriptions-table-header`,{borderBottom:`1px solid var(--n-merged-border-color)`})]),U(`descriptions-table-header`,`
 font-weight: 400;
 background-clip: padding-box;
 background-color: var(--n-merged-th-color);
 `,[P(`&:not(:last-child)`,{borderRight:`1px solid var(--n-merged-border-color)`})]),U(`descriptions-table-content`,[P(`&:not(:last-child)`,{borderRight:`1px solid var(--n-merged-border-color)`})])])])])]),U(`descriptions-header`,`
 font-weight: var(--n-th-font-weight);
 font-size: 18px;
 transition: color .3s var(--n-bezier);
 line-height: var(--n-line-height);
 margin-bottom: 16px;
 color: var(--n-title-text-color);
 `),U(`descriptions-table-wrapper`,`
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[U(`descriptions-table`,`
 width: 100%;
 border-collapse: separate;
 border-spacing: 0;
 box-sizing: border-box;
 `,[U(`descriptions-table-row`,`
 box-sizing: border-box;
 transition: border-color .3s var(--n-bezier);
 `,[U(`descriptions-table-header`,`
 font-weight: var(--n-th-font-weight);
 line-height: var(--n-line-height);
 display: table-cell;
 box-sizing: border-box;
 color: var(--n-th-text-color);
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `),U(`descriptions-table-content`,`
 vertical-align: top;
 line-height: var(--n-line-height);
 display: table-cell;
 box-sizing: border-box;
 color: var(--n-td-text-color);
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[I(`content`,`
 transition: color .3s var(--n-bezier);
 display: inline-block;
 color: var(--n-td-text-color);
 `)]),I(`label`,`
 font-weight: var(--n-th-font-weight);
 transition: color .3s var(--n-bezier);
 display: inline-block;
 margin-right: 14px;
 color: var(--n-th-text-color);
 `)])])])]),U(`descriptions-table-wrapper`,`
 --n-merged-th-color: var(--n-th-color);
 --n-merged-td-color: var(--n-td-color);
 --n-merged-border-color: var(--n-border-color);
 `),re(U(`descriptions-table-wrapper`,`
 --n-merged-th-color: var(--n-th-color-modal);
 --n-merged-td-color: var(--n-td-color-modal);
 --n-merged-border-color: var(--n-border-color-modal);
 `)),ne(U(`descriptions-table-wrapper`,`
 --n-merged-th-color: var(--n-th-color-popover);
 --n-merged-td-color: var(--n-td-color-popover);
 --n-merged-border-color: var(--n-border-color-popover);
 `))]),mt=`DESCRIPTION_ITEM_FLAG`;function ht(e){return typeof e==`object`&&e&&!Array.isArray(e)?e.type&&e.type.DESCRIPTION_ITEM_FLAG:!1}var gt=Object.assign(Object.assign({},S.props),{title:String,column:{type:Number,default:3},columns:Number,labelPlacement:{type:String,default:`top`},labelAlign:{type:String,default:`left`},separator:{type:String,default:`:`},size:String,bordered:Boolean,labelClass:String,labelStyle:[Object,String],contentClass:String,contentStyle:[Object,String]}),_t=b({name:`Descriptions`,props:gt,slots:Object,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n,mergedComponentPropsRef:r}=x(e),i=H(()=>e.size||r?.value?.Descriptions?.size||`medium`),a=S(`Descriptions`,`-descriptions`,pt,Fe,e,t),o=H(()=>{let{bordered:t}=e,n=i.value,{common:{cubicBezierEaseInOut:r},self:{titleTextColor:o,thColor:s,thColorModal:c,thColorPopover:l,thTextColor:u,thFontWeight:d,tdTextColor:f,tdColor:p,tdColorModal:m,tdColorPopover:h,borderColor:g,borderColorModal:_,borderColorPopover:v,borderRadius:y,lineHeight:b,[W(`fontSize`,n)]:x,[W(t?`thPaddingBordered`:`thPadding`,n)]:S,[W(t?`tdPaddingBordered`:`tdPadding`,n)]:C}}=a.value;return{"--n-title-text-color":o,"--n-th-padding":S,"--n-td-padding":C,"--n-font-size":x,"--n-bezier":r,"--n-th-font-weight":d,"--n-line-height":b,"--n-th-text-color":u,"--n-td-text-color":f,"--n-th-color":s,"--n-th-color-modal":c,"--n-th-color-popover":l,"--n-td-color":p,"--n-td-color-modal":m,"--n-td-color-popover":h,"--n-border-radius":y,"--n-border-color":g,"--n-border-color-modal":_,"--n-border-color-popover":v}}),s=n?de(`descriptions`,H(()=>{let t=``,{bordered:n}=e;return n&&(t+=`a`),t+=i.value[0],t}),o,e):void 0;return{mergedClsPrefix:t,cssVars:n?void 0:o,themeClass:s?.themeClass,onRender:s?.onRender,compitableColumn:be(e,[`columns`,`column`]),inlineThemeDisabled:n,mergedSize:i}},render(){let e=this.$slots.default,t=e?we(e()):[];t.length;let{contentClass:r,labelClass:i,compitableColumn:a,labelPlacement:o,labelAlign:s,mergedSize:c,bordered:l,title:u,cssVars:d,mergedClsPrefix:f,separator:p,onRender:m}=this;m?.();let h=t.filter(e=>ht(e)),g=h.reduce((e,t,s)=>{let c=t.props||{},u=h.length-1===s,d=[`label`in c?c.label:Ye(t,`label`)],m=[Ye(t)],g=c.span||1,_=e.span;e.span+=g;let v=c.labelStyle||c[`label-style`]||this.labelStyle,y=c.contentStyle||c[`content-style`]||this.contentStyle;if(o===`left`)l?e.row.push(n(`th`,{class:[`${f}-descriptions-table-header`,i],colspan:1,style:v},d),n(`td`,{class:[`${f}-descriptions-table-content`,r],colspan:u?(a-_)*2+1:g*2-1,style:y},m)):e.row.push(n(`td`,{class:`${f}-descriptions-table-content`,colspan:u?(a-_)*2:g*2},n(`span`,{class:[`${f}-descriptions-table-content__label`,i],style:v},[...d,p&&n(`span`,{class:`${f}-descriptions-separator`},p)]),n(`span`,{class:[`${f}-descriptions-table-content__content`,r],style:y},m)));else{let t=u?(a-_)*2:g*2;e.row.push(n(`th`,{class:[`${f}-descriptions-table-header`,i],colspan:t,style:v},d)),e.secondRow.push(n(`td`,{class:[`${f}-descriptions-table-content`,r],colspan:t,style:y},m))}return(e.span>=a||u)&&(e.span=0,e.row.length&&(e.rows.push(e.row),e.row=[]),o!==`left`&&e.secondRow.length&&(e.rows.push(e.secondRow),e.secondRow=[])),e},{span:0,row:[],secondRow:[],rows:[]}).rows.map(e=>n(`tr`,{class:`${f}-descriptions-table-row`},e));return n(`div`,{style:d,class:[`${f}-descriptions`,this.themeClass,`${f}-descriptions--${o}-label-placement`,`${f}-descriptions--${s}-label-align`,`${f}-descriptions--${c}-size`,l&&`${f}-descriptions--bordered`]},u||this.$slots.header?n(`div`,{class:`${f}-descriptions-header`},u||ke(this,`header`)):null,n(`div`,{class:`${f}-descriptions-table-wrapper`},n(`table`,{class:`${f}-descriptions-table`},n(`tbody`,null,o===`top`&&n(`tr`,{class:`${f}-descriptions-table-row`,style:{visibility:`collapse`}},D(a*2,n(`td`,null))),g))))}}),vt={label:String,span:{type:Number,default:1},labelClass:String,labelStyle:[Object,String],contentClass:String,contentStyle:[Object,String]},yt=b({name:`DescriptionsItem`,[mt]:!0,props:vt,slots:Object,render(){return null}}),bt=s(`n-tabs`),xt={tab:[String,Number,Object,Function],name:{type:[String,Number],required:!0},disabled:Boolean,displayDirective:{type:String,default:`if`},closable:{type:Boolean,default:void 0},tabProps:Object,label:[String,Number,Object,Function]},St=b({__TAB_PANE__:!0,name:`TabPane`,alias:[`TabPanel`],props:xt,slots:Object,setup(e){let t=T(bt,null);return t||d(`tab-pane`,"`n-tab-pane` must be placed inside `n-tabs`."),{style:t.paneStyleRef,class:t.paneClassRef,mergedClsPrefix:t.mergedClsPrefixRef}},render(){return n(`div`,{class:[`${this.mergedClsPrefix}-tab-pane`,this.class],style:this.style},this.$slots)}}),Ct=Object.assign({internalLeftPadded:Boolean,internalAddable:Boolean,internalCreatedByPane:Boolean},De(xt,[`displayDirective`])),wt=b({__TAB__:!0,inheritAttrs:!1,name:`Tab`,props:Ct,setup(e){let{mergedClsPrefixRef:t,valueRef:n,typeRef:r,closableRef:i,tabStyleRef:a,addTabStyleRef:o,tabClassRef:s,addTabClassRef:c,tabChangeIdRef:l,onBeforeLeaveRef:u,triggerRef:d,handleAdd:f,activateTab:p,handleClose:m}=T(bt);return{trigger:d,mergedClosable:H(()=>{if(e.internalAddable)return!1;let{closable:t}=e;return t===void 0?i.value:t}),style:a,addStyle:o,tabClass:s,addTabClass:c,clsPrefix:t,value:n,type:r,handleClose(t){t.stopPropagation(),!e.disabled&&m(e.name)},activateTab(){if(e.disabled)return;if(e.internalAddable){f();return}let{name:t}=e,r=++l.id;if(t!==n.value){let{value:i}=u;i?Promise.resolve(i(e.name,n.value)).then(e=>{e&&l.id===r&&p(t)}):p(t)}}}},render(){let{internalAddable:e,clsPrefix:t,name:r,disabled:i,label:o,tab:s,value:l,mergedClosable:u,trigger:d,$slots:{default:f}}=this,p=o??s;return n(`div`,{class:`${t}-tabs-tab-wrapper`},this.internalLeftPadded?n(`div`,{class:`${t}-tabs-tab-pad`}):null,n(`div`,Object.assign({key:r,"data-name":r,"data-disabled":i?!0:void 0},c({class:[`${t}-tabs-tab`,l===r&&`${t}-tabs-tab--active`,i&&`${t}-tabs-tab--disabled`,u&&`${t}-tabs-tab--closable`,e&&`${t}-tabs-tab--addable`,e?this.addTabClass:this.tabClass],onClick:d===`click`?this.activateTab:void 0,onMouseenter:d===`hover`?this.activateTab:void 0,style:e?this.addStyle:this.style},this.internalCreatedByPane?this.tabProps||{}:this.$attrs)),n(`span`,{class:`${t}-tabs-tab__label`},e?n(a,null,n(`div`,{class:`${t}-tabs-tab__height-placeholder`},`\xA0`),n(w,{clsPrefix:t},{default:()=>n(je,null)})):f?f():typeof p==`object`?p:Oe(p??r)),u&&this.type===`card`?n(m,{clsPrefix:t,class:`${t}-tabs-tab__close`,onClick:this.handleClose,disabled:i}):null))}}),Tt=U(`tabs`,`
 box-sizing: border-box;
 width: 100%;
 display: flex;
 flex-direction: column;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
`,[R(`segment-type`,[U(`tabs-rail`,[P(`&.transition-disabled`,[U(`tabs-capsule`,`
 transition: none;
 `)])])]),R(`top`,[U(`tab-pane`,`
 padding: var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left);
 `)]),R(`left`,[U(`tab-pane`,`
 padding: var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left) var(--n-pane-padding-top);
 `)]),R(`left, right`,`
 flex-direction: row;
 `,[U(`tabs-bar`,`
 width: 2px;
 right: 0;
 transition:
 top .2s var(--n-bezier),
 max-height .2s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `),U(`tabs-tab`,`
 padding: var(--n-tab-padding-vertical); 
 `)]),R(`right`,`
 flex-direction: row-reverse;
 `,[U(`tab-pane`,`
 padding: var(--n-pane-padding-left) var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom);
 `),U(`tabs-bar`,`
 left: 0;
 `)]),R(`bottom`,`
 flex-direction: column-reverse;
 justify-content: flex-end;
 `,[U(`tab-pane`,`
 padding: var(--n-pane-padding-bottom) var(--n-pane-padding-right) var(--n-pane-padding-top) var(--n-pane-padding-left);
 `),U(`tabs-bar`,`
 top: 0;
 `)]),U(`tabs-rail`,`
 position: relative;
 padding: 3px;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 background-color: var(--n-color-segment);
 transition: background-color .3s var(--n-bezier);
 display: flex;
 align-items: center;
 `,[U(`tabs-capsule`,`
 border-radius: var(--n-tab-border-radius);
 position: absolute;
 pointer-events: none;
 background-color: var(--n-tab-color-segment);
 box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .08);
 transition: transform 0.3s var(--n-bezier);
 `),U(`tabs-tab-wrapper`,`
 flex-basis: 0;
 flex-grow: 1;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[U(`tabs-tab`,`
 overflow: hidden;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[R(`active`,`
 font-weight: var(--n-font-weight-strong);
 color: var(--n-tab-text-color-active);
 `),P(`&:hover`,`
 color: var(--n-tab-text-color-hover);
 `)])])]),R(`flex`,[U(`tabs-nav`,`
 width: 100%;
 position: relative;
 `,[U(`tabs-wrapper`,`
 width: 100%;
 `,[U(`tabs-tab`,`
 margin-right: 0;
 `)])])]),U(`tabs-nav`,`
 box-sizing: border-box;
 line-height: 1.5;
 display: flex;
 transition: border-color .3s var(--n-bezier);
 `,[I(`prefix, suffix`,`
 display: flex;
 align-items: center;
 `),I(`prefix`,`padding-right: 16px;`),I(`suffix`,`padding-left: 16px;`)]),R(`top, bottom`,[P(`>`,[U(`tabs-nav`,[U(`tabs-nav-scroll-wrapper`,[P(`&::before`,`
 top: 0;
 bottom: 0;
 left: 0;
 width: 20px;
 `),P(`&::after`,`
 top: 0;
 bottom: 0;
 right: 0;
 width: 20px;
 `),R(`shadow-start`,[P(`&::before`,`
 box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, .12);
 `)]),R(`shadow-end`,[P(`&::after`,`
 box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),R(`left, right`,[U(`tabs-nav-scroll-content`,`
 flex-direction: column;
 `),P(`>`,[U(`tabs-nav`,[U(`tabs-nav-scroll-wrapper`,[P(`&::before`,`
 top: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),P(`&::after`,`
 bottom: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),R(`shadow-start`,[P(`&::before`,`
 box-shadow: inset 0 10px 8px -8px rgba(0, 0, 0, .12);
 `)]),R(`shadow-end`,[P(`&::after`,`
 box-shadow: inset 0 -10px 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),U(`tabs-nav-scroll-wrapper`,`
 flex: 1;
 position: relative;
 overflow: hidden;
 `,[U(`tabs-nav-y-scroll`,`
 height: 100%;
 width: 100%;
 overflow-y: auto; 
 scrollbar-width: none;
 `,[P(`&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb`,`
 width: 0;
 height: 0;
 display: none;
 `)]),P(`&::before, &::after`,`
 transition: box-shadow .3s var(--n-bezier);
 pointer-events: none;
 content: "";
 position: absolute;
 z-index: 1;
 `)]),U(`tabs-nav-scroll-content`,`
 display: flex;
 position: relative;
 min-width: 100%;
 min-height: 100%;
 width: fit-content;
 box-sizing: border-box;
 `),U(`tabs-wrapper`,`
 display: inline-flex;
 flex-wrap: nowrap;
 position: relative;
 `),U(`tabs-tab-wrapper`,`
 display: flex;
 flex-wrap: nowrap;
 flex-shrink: 0;
 flex-grow: 0;
 `),U(`tabs-tab`,`
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
 `,[R(`disabled`,{cursor:`not-allowed`}),I(`close`,`
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),I(`label`,`
 display: flex;
 align-items: center;
 z-index: 1;
 `)]),U(`tabs-bar`,`
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
 `,[P(`&.transition-disabled`,`
 transition: none;
 `),R(`disabled`,`
 background-color: var(--n-tab-text-color-disabled)
 `)]),U(`tabs-pane-wrapper`,`
 position: relative;
 overflow: hidden;
 transition: max-height .2s var(--n-bezier);
 `),U(`tab-pane`,`
 color: var(--n-pane-text-color);
 width: 100%;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 opacity .2s var(--n-bezier);
 left: 0;
 right: 0;
 top: 0;
 `,[P(`&.next-transition-leave-active, &.prev-transition-leave-active, &.next-transition-enter-active, &.prev-transition-enter-active`,`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 transform .2s var(--n-bezier),
 opacity .2s var(--n-bezier);
 `),P(`&.next-transition-leave-active, &.prev-transition-leave-active`,`
 position: absolute;
 `),P(`&.next-transition-enter-from, &.prev-transition-leave-to`,`
 transform: translateX(32px);
 opacity: 0;
 `),P(`&.next-transition-leave-to, &.prev-transition-enter-from`,`
 transform: translateX(-32px);
 opacity: 0;
 `),P(`&.next-transition-leave-from, &.next-transition-enter-to, &.prev-transition-leave-from, &.prev-transition-enter-to`,`
 transform: translateX(0);
 opacity: 1;
 `)]),U(`tabs-tab-pad`,`
 box-sizing: border-box;
 width: var(--n-tab-gap);
 flex-grow: 0;
 flex-shrink: 0;
 `),R(`line-type, bar-type`,[U(`tabs-tab`,`
 font-weight: var(--n-tab-font-weight);
 box-sizing: border-box;
 vertical-align: bottom;
 `,[P(`&:hover`,{color:`var(--n-tab-text-color-hover)`}),R(`active`,`
 color: var(--n-tab-text-color-active);
 font-weight: var(--n-tab-font-weight-active);
 `),R(`disabled`,{color:`var(--n-tab-text-color-disabled)`})])]),U(`tabs-nav`,[R(`line-type`,[R(`top`,[I(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),U(`tabs-nav-scroll-content`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),U(`tabs-bar`,`
 bottom: -1px;
 `)]),R(`left`,[I(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),U(`tabs-nav-scroll-content`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),U(`tabs-bar`,`
 right: -1px;
 `)]),R(`right`,[I(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),U(`tabs-nav-scroll-content`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),U(`tabs-bar`,`
 left: -1px;
 `)]),R(`bottom`,[I(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),U(`tabs-nav-scroll-content`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),U(`tabs-bar`,`
 top: -1px;
 `)]),I(`prefix, suffix`,`
 transition: border-color .3s var(--n-bezier);
 `),U(`tabs-nav-scroll-content`,`
 transition: border-color .3s var(--n-bezier);
 `),U(`tabs-bar`,`
 border-radius: 0;
 `)]),R(`card-type`,[I(`prefix, suffix`,`
 transition: border-color .3s var(--n-bezier);
 `),U(`tabs-pad`,`
 flex-grow: 1;
 transition: border-color .3s var(--n-bezier);
 `),U(`tabs-tab-pad`,`
 transition: border-color .3s var(--n-bezier);
 `),U(`tabs-tab`,`
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
 `,[R(`addable`,`
 padding-left: 8px;
 padding-right: 8px;
 font-size: 16px;
 justify-content: center;
 `,[I(`height-placeholder`,`
 width: 0;
 font-size: var(--n-tab-font-size);
 `),ce(`disabled`,[P(`&:hover`,`
 color: var(--n-tab-text-color-hover);
 `)])]),R(`closable`,`padding-right: 8px;`),R(`active`,`
 background-color: #0000;
 font-weight: var(--n-tab-font-weight-active);
 color: var(--n-tab-text-color-active);
 `),R(`disabled`,`color: var(--n-tab-text-color-disabled);`)])]),R(`left, right`,`
 flex-direction: column; 
 `,[I(`prefix, suffix`,`
 padding: var(--n-tab-padding-vertical);
 `),U(`tabs-wrapper`,`
 flex-direction: column;
 `),U(`tabs-tab-wrapper`,`
 flex-direction: column;
 `,[U(`tabs-tab-pad`,`
 height: var(--n-tab-gap-vertical);
 width: 100%;
 `)])]),R(`top`,[R(`card-type`,[U(`tabs-scroll-padding`,`border-bottom: 1px solid var(--n-tab-border-color);`),I(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),U(`tabs-tab`,`
 border-top-left-radius: var(--n-tab-border-radius);
 border-top-right-radius: var(--n-tab-border-radius);
 `,[R(`active`,`
 border-bottom: 1px solid #0000;
 `)]),U(`tabs-tab-pad`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),U(`tabs-pad`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `)])]),R(`left`,[R(`card-type`,[U(`tabs-scroll-padding`,`border-right: 1px solid var(--n-tab-border-color);`),I(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),U(`tabs-tab`,`
 border-top-left-radius: var(--n-tab-border-radius);
 border-bottom-left-radius: var(--n-tab-border-radius);
 `,[R(`active`,`
 border-right: 1px solid #0000;
 `)]),U(`tabs-tab-pad`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),U(`tabs-pad`,`
 border-right: 1px solid var(--n-tab-border-color);
 `)])]),R(`right`,[R(`card-type`,[U(`tabs-scroll-padding`,`border-left: 1px solid var(--n-tab-border-color);`),I(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),U(`tabs-tab`,`
 border-top-right-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[R(`active`,`
 border-left: 1px solid #0000;
 `)]),U(`tabs-tab-pad`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),U(`tabs-pad`,`
 border-left: 1px solid var(--n-tab-border-color);
 `)])]),R(`bottom`,[R(`card-type`,[U(`tabs-scroll-padding`,`border-top: 1px solid var(--n-tab-border-color);`),I(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),U(`tabs-tab`,`
 border-bottom-left-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[R(`active`,`
 border-top: 1px solid #0000;
 `)]),U(`tabs-tab-pad`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),U(`tabs-pad`,`
 border-top: 1px solid var(--n-tab-border-color);
 `)])])])]),Et=ft,Dt=Object.assign(Object.assign({},S.props),{value:[String,Number],defaultValue:[String,Number],trigger:{type:String,default:`click`},type:{type:String,default:`bar`},closable:Boolean,justifyContent:String,size:String,placement:{type:String,default:`top`},tabStyle:[String,Object],tabClass:String,addTabStyle:[String,Object],addTabClass:String,barWidth:Number,paneClass:String,paneStyle:[String,Object],paneWrapperClass:String,paneWrapperStyle:[String,Object],addable:[Boolean,Object],tabsPadding:{type:Number,default:0},animated:Boolean,onBeforeLeave:Function,onAdd:Function,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onClose:[Function,Array],labelSize:String,activeName:[String,Number],onActiveNameChange:[Function,Array]}),Ot=b({name:`Tabs`,props:Dt,slots:Object,setup(t,{slots:n}){let{mergedClsPrefixRef:r,inlineThemeDisabled:i,mergedComponentPropsRef:a}=x(t),o=S(`Tabs`,`-tabs`,Tt,Pe,t,r),s=L(null),c=L(null),l=L(null),u=L(null),d=L(null),f=L(null),p=L(!0),m=L(!0),h=be(t,[`labelSize`,`size`]),g=H(()=>h.value?h.value:a?.value?.Tabs?.size||`medium`),_=be(t,[`activeName`,`value`]),y=L(_.value??t.defaultValue??(n.default?we(n.default())[0]?.props?.name:null)),b=Ee(_,y),w={id:0},T=H(()=>{if(!(!t.justifyContent||t.type===`card`))return{display:`flex`,justifyContent:t.justifyContent}});V(b,()=>{w.id=0,A(),M()});function E(){let{value:e}=b;return e===null?null:s.value?.querySelector(`[data-name="${e}"]`)}function D(e){if(t.type===`card`)return;let{value:n}=c;if(!n)return;let i=n.style.opacity===`0`;if(e){let a=`${r.value}-tabs-bar--disabled`,{barWidth:o,placement:s}=t;if(e.dataset.disabled===`true`?n.classList.add(a):n.classList.remove(a),[`top`,`bottom`].includes(s)){if(k([`top`,`maxHeight`,`height`]),typeof o==`number`&&e.offsetWidth>=o){let t=Math.floor((e.offsetWidth-o)/2)+e.offsetLeft;n.style.left=`${t}px`,n.style.maxWidth=`${o}px`}else n.style.left=`${e.offsetLeft}px`,n.style.maxWidth=`${e.offsetWidth}px`;n.style.width=`8192px`,i&&(n.style.transition=`none`),n.offsetWidth,i&&(n.style.transition=``,n.style.opacity=`1`)}else{if(k([`left`,`maxWidth`,`width`]),typeof o==`number`&&e.offsetHeight>=o){let t=Math.floor((e.offsetHeight-o)/2)+e.offsetTop;n.style.top=`${t}px`,n.style.maxHeight=`${o}px`}else n.style.top=`${e.offsetTop}px`,n.style.maxHeight=`${e.offsetHeight}px`;n.style.height=`8192px`,i&&(n.style.transition=`none`),n.offsetHeight,i&&(n.style.transition=``,n.style.opacity=`1`)}}}function O(){if(t.type===`card`)return;let{value:e}=c;e&&(e.style.opacity=`0`)}function k(e){let{value:t}=c;if(t)for(let n of e)t.style[n]=``}function A(){if(t.type===`card`)return;let e=E();e?D(e):O()}function M(){let e=d.value?.$el;if(!e)return;let t=E();if(!t)return;let{scrollLeft:n,offsetWidth:r}=e,{offsetLeft:i,offsetWidth:a}=t;n>i?e.scrollTo({top:0,left:i,behavior:`smooth`}):i+a>n+r&&e.scrollTo({top:0,left:i+a-r,behavior:`smooth`})}let N=L(null),P=0,F=null;function I(e){let t=N.value;if(t){P=e.getBoundingClientRect().height;let n=`${P}px`,r=()=>{t.style.height=n,t.style.maxHeight=n};F?(r(),F(),F=null):F=r}}function te(e){let t=N.value;if(t){let n=e.getBoundingClientRect().height,r=()=>{document.body.offsetHeight,t.style.maxHeight=`${n}px`,t.style.height=`${Math.max(P,n)}px`};F?(F(),F=null,r()):F=r}}function R(){let e=N.value;if(e){e.style.maxHeight=``,e.style.height=``;let{paneWrapperStyle:n}=t;if(typeof n==`string`)e.style.cssText=n;else if(n){let{maxHeight:t,height:r}=n;t!==void 0&&(e.style.maxHeight=t),r!==void 0&&(e.style.height=r)}}}let ne={value:[]},z=L(`next`);function re(e){let t=b.value,n=`next`;for(let r of ne.value){if(r===t)break;if(r===e){n=`prev`;break}}z.value=n,ie(e)}function ie(e){let{onActiveNameChange:n,onUpdateValue:r,"onUpdate:value":i}=t;n&&v(n,e),r&&v(r,e),i&&v(i,e),y.value=e}function U(e){let{onClose:n}=t;n&&v(n,e)}let ae=!0;function K(){let{value:e}=c;if(!e)return;ae||=!1;let t=`transition-disabled`;e.classList.add(t),A(),e.classList.remove(t)}let se=L(null);function q({transitionDisabled:e}){let t=s.value;if(!t)return;e&&t.classList.add(`transition-disabled`);let n=E();n&&se.value&&(se.value.style.width=`${n.offsetWidth}px`,se.value.style.height=`${n.offsetHeight}px`,se.value.style.transform=`translateX(${n.offsetLeft-oe(getComputedStyle(t).paddingLeft)}px)`,e&&se.value.offsetWidth),e&&t.classList.remove(`transition-disabled`)}V([b],()=>{t.type===`segment`&&C(()=>{q({transitionDisabled:!1})})}),ee(()=>{t.type===`segment`&&q({transitionDisabled:!0})});let J=0;function ce(e){if(e.contentRect.width===0&&e.contentRect.height===0||J===e.contentRect.width)return;J=e.contentRect.width;let{type:n}=t;if((n===`line`||n===`bar`)&&(ae||t.justifyContent?.startsWith(`space`))&&K(),n!==`segment`){let{placement:e}=t;he((e===`top`||e===`bottom`?d.value?.$el:f.value)||null)}}let le=Et(ce,64);V([()=>t.justifyContent,()=>t.size],()=>{C(()=>{let{type:e}=t;(e===`line`||e===`bar`)&&K()})});let Y=L(!1);function ue(e){let{target:n,contentRect:{width:r,height:i}}=e,a=n.parentElement.parentElement.offsetWidth,o=n.parentElement.parentElement.offsetHeight,{placement:s}=t;if(!Y.value)s===`top`||s===`bottom`?a<r&&(Y.value=!0):o<i&&(Y.value=!0);else{let{value:e}=u;if(!e)return;s===`top`||s===`bottom`?a-r>e.$el.offsetWidth&&(Y.value=!1):o-i>e.$el.offsetHeight&&(Y.value=!1)}he(d.value?.$el||null)}let fe=Et(ue,64);function pe(){let{onAdd:e}=t;e&&e(),C(()=>{let e=E(),{value:t}=d;!e||!t||t.scrollTo({left:e.offsetLeft,top:0,behavior:`smooth`})})}function he(e){if(!e)return;let{placement:n}=t;if(n===`top`||n===`bottom`){let{scrollLeft:t,scrollWidth:n,offsetWidth:r}=e;p.value=t<=0,m.value=t+r>=n}else{let{scrollTop:t,scrollHeight:n,offsetHeight:r}=e;p.value=t<=0,m.value=t+r>=n}}let ge=Et(e=>{he(e.target)},64);e(bt,{triggerRef:G(t,`trigger`),tabStyleRef:G(t,`tabStyle`),tabClassRef:G(t,`tabClass`),addTabStyleRef:G(t,`addTabStyle`),addTabClassRef:G(t,`addTabClass`),paneClassRef:G(t,`paneClass`),paneStyleRef:G(t,`paneStyle`),mergedClsPrefixRef:r,typeRef:G(t,`type`),closableRef:G(t,`closable`),valueRef:b,tabChangeIdRef:w,onBeforeLeaveRef:G(t,`onBeforeLeave`),activateTab:re,handleClose:U,handleAdd:pe}),me(()=>{A(),M()}),j(()=>{let{value:e}=l;if(!e)return;let{value:t}=r,n=`${t}-tabs-nav-scroll-wrapper--shadow-start`,i=`${t}-tabs-nav-scroll-wrapper--shadow-end`;p.value?e.classList.remove(n):e.classList.add(n),m.value?e.classList.remove(i):e.classList.add(i)});let _e={syncBarPosition:()=>{A()}},ve=()=>{q({transitionDisabled:!0})},ye=H(()=>{let{value:e}=g,{type:n}=t,r=`${e}${{card:`Card`,bar:`Bar`,line:`Line`,segment:`Segment`}[n]}`,{self:{barColor:i,closeIconColor:a,closeIconColorHover:s,closeIconColorPressed:c,tabColor:l,tabBorderColor:u,paneTextColor:d,tabFontWeight:f,tabBorderRadius:p,tabFontWeightActive:m,colorSegment:h,fontWeightStrong:_,tabColorSegment:v,closeSize:y,closeIconSize:b,closeColorHover:x,closeColorPressed:S,closeBorderRadius:C,[W(`panePadding`,e)]:w,[W(`tabPadding`,r)]:T,[W(`tabPaddingVertical`,r)]:E,[W(`tabGap`,r)]:ee,[W(`tabGap`,`${r}Vertical`)]:D,[W(`tabTextColor`,n)]:O,[W(`tabTextColorActive`,n)]:k,[W(`tabTextColorHover`,n)]:A,[W(`tabTextColorDisabled`,n)]:j,[W(`tabFontSize`,e)]:M},common:{cubicBezierEaseInOut:N}}=o.value;return{"--n-bezier":N,"--n-color-segment":h,"--n-bar-color":i,"--n-tab-font-size":M,"--n-tab-text-color":O,"--n-tab-text-color-active":k,"--n-tab-text-color-disabled":j,"--n-tab-text-color-hover":A,"--n-pane-text-color":d,"--n-tab-border-color":u,"--n-tab-border-radius":p,"--n-close-size":y,"--n-close-icon-size":b,"--n-close-color-hover":x,"--n-close-color-pressed":S,"--n-close-border-radius":C,"--n-close-icon-color":a,"--n-close-icon-color-hover":s,"--n-close-icon-color-pressed":c,"--n-tab-color":l,"--n-tab-font-weight":f,"--n-tab-font-weight-active":m,"--n-tab-padding":T,"--n-tab-padding-vertical":E,"--n-tab-gap":ee,"--n-tab-gap-vertical":D,"--n-pane-padding-left":B(w,`left`),"--n-pane-padding-right":B(w,`right`),"--n-pane-padding-top":B(w,`top`),"--n-pane-padding-bottom":B(w,`bottom`),"--n-font-weight-strong":_,"--n-tab-color-segment":v}}),xe=i?de(`tabs`,H(()=>`${g.value[0]}${t.type[0]}`),ye,t):void 0;return Object.assign({mergedClsPrefix:r,mergedValue:b,renderedNames:new Set,segmentCapsuleElRef:se,tabsPaneWrapperRef:N,tabsElRef:s,barElRef:c,addTabInstRef:u,xScrollInstRef:d,scrollWrapperElRef:l,addTabFixed:Y,tabWrapperStyle:T,handleNavResize:le,mergedSize:g,handleScroll:ge,handleTabsResize:fe,cssVars:i?void 0:ye,themeClass:xe?.themeClass,animationDirection:z,renderNameListRef:ne,yScrollElRef:f,handleSegmentResize:ve,onAnimationBeforeLeave:I,onAnimationEnter:te,onAnimationAfterEnter:R,onRender:xe?.onRender},_e)},render(){let{mergedClsPrefix:e,type:t,placement:i,addTabFixed:a,addable:o,mergedSize:s,renderNameListRef:c,onRender:l,paneWrapperClass:u,paneWrapperStyle:d,$slots:{default:f,prefix:p,suffix:m}}=this;l?.();let h=f?we(f()).filter(e=>e.type.__TAB_PANE__===!0):[],_=f?we(f()).filter(e=>e.type.__TAB__===!0):[],v=!_.length,y=t===`card`,b=t===`segment`,x=!y&&!b&&this.justifyContent;c.value=[];let S=()=>{let t=n(`div`,{style:this.tabWrapperStyle,class:`${e}-tabs-wrapper`},x?null:n(`div`,{class:`${e}-tabs-scroll-padding`,style:i===`top`||i===`bottom`?{width:`${this.tabsPadding}px`}:{height:`${this.tabsPadding}px`}}),v?h.map((e,t)=>(c.value.push(e.props.name),Mt(n(wt,Object.assign({},e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0&&(!x||x===`center`||x===`start`||x===`end`)}),e.children?{default:e.children.tab}:void 0)))):_.map((e,t)=>(c.value.push(e.props.name),Mt(t!==0&&!x?jt(e):e))),!a&&o&&y?At(o,(v?h.length:_.length)!==0):null,x?null:n(`div`,{class:`${e}-tabs-scroll-padding`,style:{width:`${this.tabsPadding}px`}}));return n(`div`,{ref:`tabsElRef`,class:`${e}-tabs-nav-scroll-content`},y&&o?n(r,{onResize:this.handleTabsResize},{default:()=>t}):t,y?n(`div`,{class:`${e}-tabs-pad`}):null,y?null:n(`div`,{ref:`barElRef`,class:`${e}-tabs-bar`}))},C=b?`top`:i;return n(`div`,{class:[`${e}-tabs`,this.themeClass,`${e}-tabs--${t}-type`,`${e}-tabs--${s}-size`,x&&`${e}-tabs--flex`,`${e}-tabs--${C}`],style:this.cssVars},n(`div`,{class:[`${e}-tabs-nav--${t}-type`,`${e}-tabs-nav--${C}`,`${e}-tabs-nav`]},g(p,t=>t&&n(`div`,{class:`${e}-tabs-nav__prefix`},t)),b?n(r,{onResize:this.handleSegmentResize},{default:()=>n(`div`,{class:`${e}-tabs-rail`,ref:`tabsElRef`},n(`div`,{class:`${e}-tabs-capsule`,ref:`segmentCapsuleElRef`},n(`div`,{class:`${e}-tabs-wrapper`},n(`div`,{class:`${e}-tabs-tab`}))),v?h.map((e,t)=>(c.value.push(e.props.name),n(wt,Object.assign({},e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0}),e.children?{default:e.children.tab}:void 0))):_.map((e,t)=>(c.value.push(e.props.name),t===0?e:jt(e))))}):n(r,{onResize:this.handleNavResize},{default:()=>n(`div`,{class:`${e}-tabs-nav-scroll-wrapper`,ref:`scrollWrapperElRef`},[`top`,`bottom`].includes(C)?n(Je,{ref:`xScrollInstRef`,onScroll:this.handleScroll},{default:S}):n(`div`,{class:`${e}-tabs-nav-y-scroll`,onScroll:this.handleScroll,ref:`yScrollElRef`},S()))}),a&&o&&y?At(o,!0):null,g(m,t=>t&&n(`div`,{class:`${e}-tabs-nav__suffix`},t))),v&&(this.animated&&(C===`top`||C===`bottom`)?n(`div`,{ref:`tabsPaneWrapperRef`,style:d,class:[`${e}-tabs-pane-wrapper`,u]},kt(h,this.mergedValue,this.renderedNames,this.onAnimationBeforeLeave,this.onAnimationEnter,this.onAnimationAfterEnter,this.animationDirection)):kt(h,this.mergedValue,this.renderedNames)))}});function kt(e,t,r,a,o,s,c){let l=[];return e.forEach(e=>{let{name:n,displayDirective:a,"display-directive":o}=e.props,s=e=>a===e||o===e,c=t===n;if(e.key!==void 0&&(e.key=n),c||s(`show`)||s(`show:lazy`)&&r.has(n)){r.has(n)||r.add(n);let t=!s(`if`);l.push(t?le(e,[[i,c]]):e)}}),c?n(fe,{name:`${c}-transition`,onBeforeLeave:a,onEnter:o,onAfterEnter:s},{default:()=>l}):l}function At(e,t){return n(wt,{ref:`addTabInstRef`,key:`__addable`,name:`__addable`,internalCreatedByPane:!0,internalAddable:!0,internalLeftPadded:t,disabled:typeof e==`object`&&e.disabled})}function jt(e){let n=t(e);return n.props?n.props.internalLeftPadded=!0:n.props={internalLeftPadded:!0},n}function Mt(e){return Array.isArray(e.dynamicProps)?e.dynamicProps.includes(`internalLeftPadded`)||e.dynamicProps.push(`internalLeftPadded`):e.dynamicProps=[`internalLeftPadded`],e}var Nt=F(`lock`,[[`rect`,{width:`18`,height:`11`,x:`3`,y:`11`,rx:`2`,ry:`2`,key:`1w4ew1`}],[`path`,{d:`M7 11V7a5 5 0 0 1 10 0v4`,key:`fwvmzm`}]]),Pt={class:`apps`},Ft={key:0,class:`text-muted`},It=[`id`],Lt=[`onClick`],Rt={class:`app-name`},zt={class:`app-meta`},Bt={class:`app-meta mono`},Vt={key:0,class:`app-body`},Ht={class:`mono text-muted`},Ut={class:`svc-list`},Wt={class:`svc-name`},Gt={class:`svc-status text-muted`},Kt={class:`svc-res mono text-muted`},qt={class:`svc-btns`},Jt={key:1,class:`app-actions`},Yt={key:1,class:`text-muted hint`},Xt=q(b({__name:`DockerProjectsPanel`,props:{containers:{},focus:{}},emits:[`logs`,`env`,`uninstall`],setup(e,{emit:t}){let n=e,r=t,{t:i}=ae(),s=H(()=>Ge(n.containers)),c=L({});function l(e){return c.value[e.name]??(e.verdict===`danger`||e.verdict===`warn`)}function d(e){c.value={...c.value,[e.name]:!l(e)}}V(()=>[n.focus,s.value.length],async([e,t])=>{!e||t===0||(c.value={...c.value,[e]:!0},await C(),document.getElementById(`app-${e}`)?.scrollIntoView({block:`center`,behavior:`smooth`}))},{immediate:!0});let m={ok:`success`,warn:`warning`,danger:`error`,stopped:`default`},g=e=>i({ok:`docker.apps.statusOk`,warn:`docker.apps.statusWarn`,danger:`docker.apps.statusDanger`,stopped:`docker.apps.statusStopped`}[e]);function v(e){return e.state===`restarting`?i(`docker.apps.restarting`):e.health===`unhealthy`?i(`docker.apps.unhealthy`):e.health===`starting`?i(`docker.apps.starting`):``}function b(e){return e.state===`running`?e.health===`unhealthy`?`danger`:e.health===`starting`?`warn`:`ok`:e.state===`restarting`?`danger`:e.state===`paused`?`warn`:`off`}return(t,n)=>{let c=se(`RouterLink`);return y(),o(`div`,Pt,[e.containers.length===0?(y(),o(`p`,Ft,M(k(i)(`docker.apps.noContainers`)),1)):_(``,!0),(y(!0),o(a,null,te(s.value,e=>(y(),o(`div`,{key:e.name,id:`app-${e.name}`,class:Y([`app-card`,`v-${e.verdict}`])},[p(`button`,{type:`button`,class:`app-head`,onClick:t=>d(e)},[f(k(z),{component:l(e)?k(He):k(Ve),size:`16`},null,8,[`component`]),p(`span`,Rt,M(e.name||k(i)(`docker.apps.other`)),1),f(k(Me),{size:`small`,type:m[e.verdict],bordered:!1},{default:J(()=>[u(M(g(e.verdict)),1)]),_:2},1032,[`type`]),p(`span`,zt,M(k(i)(`docker.apps.runningOf`,{running:e.running,total:e.containers.length})),1),p(`span`,Bt,M(e.cpu.toFixed(1))+`% · `+M(k($)(e.mem)),1)],8,Lt),l(e)?(y(),o(`div`,Vt,[e.workingDir?(y(),h(c,{key:0,to:{path:`/files`,query:{path:e.workingDir}},class:`folder-link`},{default:J(()=>[f(k(z),{component:k(_e),size:`14`},null,8,[`component`]),u(` `+M(k(i)(`docker.apps.openFolder`))+` `,1),p(`span`,Ht,M(e.workingDir),1)]),_:2},1032,[`to`])):_(``,!0),p(`ul`,Ut,[(y(!0),o(a,null,te(e.containers,e=>(y(),o(`li`,{key:e.id},[p(`span`,{class:Y([`dot`,`d-${b(e)}`])},null,2),p(`span`,Wt,M(e.service||e.name),1),v(e)?(y(),o(`span`,{key:0,class:Y([`svc-note`,{danger:e.health===`unhealthy`||e.state===`restarting`}])},M(v(e)),3)):_(``,!0),p(`span`,Gt,M(e.status),1),p(`span`,Kt,M(e.hasStats?`${e.stats.cpuPercent.toFixed(1)}% · ${k($)(e.stats.memUsageBytes)}`:`—`),1),p(`span`,qt,[f(k(O),{size:`tiny`,quaternary:``,onClick:t=>r(`env`,e)},{default:J(()=>[u(M(k(i)(`docker.env.button`)),1)]),_:1},8,[`onClick`]),f(k(O),{size:`tiny`,quaternary:``,onClick:t=>r(`logs`,e)},{default:J(()=>[u(M(k(i)(`docker.logs.button`)),1)]),_:1},8,[`onClick`])])]))),128))]),e.name?(y(),o(`div`,Jt,[f(k(O),{size:`small`,quaternary:``,type:`error`,onClick:t=>r(`uninstall`,e.name)},{icon:J(()=>[f(k(z),{component:k(Ue)},null,8,[`component`])]),default:J(()=>[u(` `+M(k(i)(`docker.apps.uninstall.button`)),1)]),_:1},8,[`onClick`])])):_(``,!0)])):_(``,!0)],10,It))),128)),e.containers.length>0?(y(),o(`p`,Yt,M(k(i)(`docker.apps.hint`)),1)):_(``,!0)])}}}),[[`__scopeId`,`data-v-ad4386b4`]]),Zt={class:`text-muted note`},Qt={key:0,class:`center`},$t={class:`controls`},en={style:{margin:`0 0 8px`}},tn={class:`reveal-row`},nn={key:0,class:`reveal-error`},rn={key:1,class:`text-muted`},an={key:2,class:`text-muted`},on={key:3,class:`env-list`},sn={class:`env-key`},cn={key:1},ln=q(b({__name:`ContainerEnvDrawer`,props:{show:{type:Boolean},container:{}},emits:[`update:show`],setup(e,{emit:t}){let n=e,r=t,{t:i}=ae(),s=Ie(),c={autocomplete:`off`,name:`env-filter`,"data-1p-ignore":``,"data-lpignore":`true`},l={autocomplete:`current-password`,name:`env-reveal-password`},d=L(!1),m=L(``),g=L([]),v=L(!0),b=L(``),x=L(null),S=L(!1),C=L(``),w=L(``),T=L(!1);function E(){g.value=[],m.value=``,b.value=``,x.value=null,S.value=!1,C.value=``,w.value=``}async function ee(){if(n.container){d.value=!0,m.value=``;try{g.value=(await Q.containerEnv(n.container.id)).vars}catch(e){m.value=e instanceof N?e.message:i(`docker.env.loadFailed`)}finally{d.value=!1}}}V(()=>[n.show,n.container?.id],([e])=>{E(),e&&ee()});let D=H(()=>g.value.filter(e=>e.imageDefault).length),A=H(()=>g.value.filter(e=>e.secret).length),j=H(()=>{let e=b.value.trim().toLowerCase();return g.value.filter(t=>v.value&&t.imageDefault&&!t.secret?!1:!e||t.key.toLowerCase().includes(e))});function P(e){return e.secret?x.value?.[e.key]:e.value}async function F(){if(!(!n.container||!C.value)){T.value=!0,w.value=``;try{x.value=(await Q.revealEnv(n.container.id,C.value)).values,S.value=!1,C.value=``}catch(e){w.value=e instanceof N&&e.status===403?i(`common.wrongPassword`):e instanceof N?e.message:i(`docker.env.loadFailed`)}finally{T.value=!1}}}async function I(e){try{await We(e),s.success(i(`docker.env.copied`))}catch{s.error(i(`docker.env.copyFailed`))}}return(t,n)=>(y(),h(k(Le),{show:e.show,width:640,placement:`right`,"onUpdate:show":n[6]||=e=>r(`update:show`,e)},{default:J(()=>[f(k(Re),{title:k(i)(`docker.env.title`,{name:e.container?.name??``}),closable:``},{default:J(()=>[p(`p`,Zt,M(k(i)(`docker.env.readOnlyNote`)),1),d.value?(y(),o(`div`,Qt,[f(k(ge))])):m.value?(y(),h(k(X),{key:1,type:`error`,title:m.value},null,8,[`title`])):(y(),o(a,{key:2},[p(`div`,$t,[f(k(Ae),{value:b.value,"onUpdate:value":n[0]||=e=>b.value=e,size:`small`,clearable:``,placeholder:k(i)(`docker.env.filter`),"input-props":c,style:{"max-width":`200px`}},null,8,[`value`,`placeholder`]),D.value>0?(y(),h(k(Ne),{key:0,checked:v.value,"onUpdate:checked":n[1]||=e=>v.value=e,size:`small`},{default:J(()=>[u(M(k(i)(`docker.env.hideImageDefaults`,{count:D.value})),1)]),_:1},8,[`checked`])):_(``,!0),n[7]||=p(`span`,{class:`spacer`},null,-1),A.value>0&&!x.value&&!S.value?(y(),h(k(O),{key:1,size:`small`,onClick:n[2]||=e=>S.value=!0},{icon:J(()=>[f(k(z),{component:k(Nt)},null,8,[`component`])]),default:J(()=>[u(` `+M(k(i)(`docker.env.revealSecrets`,{count:A.value})),1)]),_:1})):_(``,!0),x.value?(y(),h(k(O),{key:2,size:`small`,quaternary:``,onClick:n[3]||=e=>x.value=null},{default:J(()=>[u(M(k(i)(`docker.env.hideAgain`)),1)]),_:1})):_(``,!0)]),S.value?(y(),h(k(X),{key:0,type:`warning`,"show-icon":!1,class:`reveal-box`},{default:J(()=>[p(`p`,en,M(k(i)(`docker.env.revealConfirm`)),1),p(`div`,tn,[f(k(Ae),{value:C.value,"onUpdate:value":n[4]||=e=>C.value=e,type:`password`,"show-password-on":`click`,size:`small`,placeholder:k(i)(`common.dashboardPassword`),"input-props":l,onKeyup:ue(F,[`enter`])},null,8,[`value`,`placeholder`]),f(k(O),{size:`small`,onClick:n[5]||=e=>{S.value=!1,C.value=``,w.value=``}},{default:J(()=>[u(M(k(i)(`common.cancel`)),1)]),_:1}),f(k(O),{size:`small`,type:`primary`,loading:T.value,disabled:!C.value,onClick:F},{default:J(()=>[u(M(k(i)(`docker.env.reveal`)),1)]),_:1},8,[`loading`,`disabled`])]),w.value?(y(),o(`p`,nn,M(w.value),1)):_(``,!0)]),_:1})):_(``,!0),g.value.length===0?(y(),o(`p`,rn,M(k(i)(`docker.env.none`)),1)):j.value.length===0?(y(),o(`p`,an,M(k(i)(`docker.env.noMatch`)),1)):(y(),o(`ul`,on,[(y(!0),o(a,null,te(j.value,e=>(y(),o(`li`,{key:e.key},[p(`span`,sn,M(e.key),1),p(`span`,{class:Y([`env-val`,{masked:e.secret&&P(e)===void 0}])},[e.secret&&P(e)===void 0?(y(),o(a,{key:0},[f(k(z),{component:k(Nt),size:`12`},null,8,[`component`]),n[8]||=u(` •••••••• `,-1)],64)):(y(),o(a,{key:1},[u(M(P(e)),1)],64))],2),P(e)!==void 0&&P(e)!==``?(y(),h(k(O),{key:0,size:`tiny`,quaternary:``,title:k(i)(`docker.env.copy`),onClick:t=>I(P(e))},{default:J(()=>[f(k(z),{component:k(Z),size:`13`},null,8,[`component`])]),_:1},8,[`title`,`onClick`])):(y(),o(`span`,cn))]))),128))]))],64))]),_:1},8,[`title`])]),_:1},8,[`show`]))}}),[[`__scopeId`,`data-v-9e641e9a`]]),un={key:0,class:`center`},dn={class:`text-muted`},fn={class:`text-muted`},pn={class:`fail-list`},mn={class:`text-muted`},hn={class:`block`},gn={class:`label`},_n={class:`row`},vn={class:`mono`},yn={key:0,class:`row`},bn={class:`mono`},xn={key:0,class:`block`},Sn={class:`danger-text`},Cn={key:0,class:`hint danger-text`},wn={key:1,class:`hint text-muted`},Tn={key:1,class:`block`},En={class:`hint text-muted`},Dn={class:`note text-muted`},On={class:`block`},kn={class:`block`},An={class:`label`},jn={class:`mono`},Mn={key:0,class:`mismatch`},Nn={key:3,class:`hint text-muted`},Pn={class:`footer`},Fn=q(b({__name:`AppUninstallModal`,props:{show:{type:Boolean},name:{}},emits:[`update:show`,`done`],setup(e,{emit:t}){let n=e,r=t,{t:i}=ae(),s=L(!1),c=L(null),l=L(``),d=L(!1),m=L(!1),g=L(``),v=L(``),b=L(!1),x=L(``),S=L(null);function C(){c.value=null,l.value=``,d.value=!1,m.value=!1,g.value=``,v.value=``,x.value=``,S.value=null}V(()=>[n.show,n.name],async([e,t])=>{if(C(),!(!e||!t)){s.value=!0;try{c.value=await Q.uninstallPlan(t)}catch(e){l.value=e instanceof N?e.message:i(`docker.apps.uninstall.loadFailed`)}finally{s.value=!1}}});let w={autocomplete:`off`,name:`confirm-app-name`,"data-1p-ignore":``,"data-lpignore":`true`},T={autocomplete:`current-password`,name:`confirm-password`},E=H(()=>g.value!==``&&g.value!==n.name),ee=H(()=>!!c.value&&g.value===n.name&&!!v.value&&!b.value),D=H(()=>(c.value?.volumes??[]).join(`, `)),A=H(()=>(S.value??[]).filter(e=>!e.ok)),j=H(()=>(S.value??[]).filter(e=>e.ok).length);async function P(){if(ee.value){b.value=!0,x.value=``;try{S.value=(await Q.uninstallProject(n.name,{password:v.value,confirmName:g.value,removeVolumes:d.value,removeImages:m.value})).steps,v.value=``,r(`done`)}catch(e){x.value=e instanceof N&&e.status===403?i(`common.wrongPassword`):e instanceof N?e.message:i(`docker.apps.uninstall.failed`)}finally{b.value=!1}}}function F(){b.value||r(`update:show`,!1)}return(t,n)=>(y(),h(k(Te),{show:e.show,preset:`card`,title:S.value?k(i)(`docker.apps.uninstall.doneTitle`):k(i)(`docker.apps.uninstall.title`,{name:e.name}),style:{"max-width":`520px`},closable:!b.value,"mask-closable":!1,"close-on-esc":!b.value,"onUpdate:show":F},{footer:J(()=>[p(`div`,Pn,[S.value?(y(),h(k(O),{key:0,type:`primary`,onClick:F},{default:J(()=>[u(M(k(i)(`docker.apps.uninstall.close`)),1)]),_:1})):(y(),o(a,{key:1},[f(k(O),{disabled:b.value,onClick:F},{default:J(()=>[u(M(k(i)(`common.cancel`)),1)]),_:1},8,[`disabled`]),f(k(O),{type:`error`,loading:b.value,disabled:!ee.value,onClick:P},{default:J(()=>[u(M(k(i)(`docker.apps.uninstall.confirm`)),1)]),_:1},8,[`loading`,`disabled`])],64))])]),default:J(()=>[s.value?(y(),o(`div`,un,[f(k(ge)),n[4]||=u(),p(`span`,dn,M(k(i)(`docker.apps.uninstall.loading`)),1)])):l.value?(y(),h(k(X),{key:1,type:`error`,title:l.value},null,8,[`title`])):S.value?(y(),o(a,{key:2},[A.value.length===0?(y(),h(k(X),{key:0,type:`success`,"show-icon":!1},{default:J(()=>[u(M(k(i)(`docker.apps.uninstall.doneOk`,{count:j.value})),1)]),_:1})):(y(),o(a,{key:1},[p(`p`,fn,M(k(i)(`docker.apps.uninstall.doneOk`,{count:j.value})),1),f(k(X),{type:`warning`,title:k(i)(`docker.apps.uninstall.doneFailed`,{count:A.value.length})},{default:J(()=>[p(`ul`,pn,[(y(!0),o(a,null,te(A.value,e=>(y(),o(`li`,{key:e.kind+e.name},[p(`strong`,null,M(k(i)(`docker.apps.uninstall.kind.${e.kind}`))+` `+M(e.name),1),p(`span`,mn,` — `+M(e.error),1)]))),128))])]),_:1},8,[`title`])],64))],64)):c.value?(y(),o(a,{key:3},[p(`div`,hn,[p(`div`,gn,M(k(i)(`docker.apps.uninstall.willRemove`)),1),p(`div`,_n,[u(M(k(i)(`docker.apps.uninstall.containers`,{count:c.value.containers.length}))+`: `,1),p(`span`,vn,M(c.value.containers.map(e=>e.service||e.name).join(`, `)),1)]),c.value.networks.length?(y(),o(`div`,yn,[u(M(k(i)(`docker.apps.uninstall.networks`,{count:c.value.networks.length}))+`: `,1),p(`span`,bn,M(c.value.networks.join(`, `)),1)])):_(``,!0)]),c.value.volumes.length?(y(),o(`div`,xn,[f(k(Ne),{checked:d.value,"onUpdate:checked":n[0]||=e=>d.value=e,disabled:b.value},{default:J(()=>[p(`span`,Sn,M(k(i)(`docker.apps.uninstall.removeVolumes`)),1)]),_:1},8,[`checked`,`disabled`]),d.value?(y(),o(`p`,Cn,M(k(i)(`docker.apps.uninstall.volumesWarn`,{names:D.value})),1)):(y(),o(`p`,wn,M(k(i)(`docker.apps.uninstall.keepVolumes`,{names:D.value})),1))])):_(``,!0),c.value.images.length?(y(),o(`div`,Tn,[f(k(Ne),{checked:m.value,"onUpdate:checked":n[1]||=e=>m.value=e,disabled:b.value},{default:J(()=>[u(M(k(i)(`docker.apps.uninstall.removeImages`,{count:c.value.images.length})),1)]),_:1},8,[`checked`,`disabled`]),p(`p`,En,M(k(i)(`docker.apps.uninstall.imagesHint`)),1)])):_(``,!0),p(`p`,Dn,M(k(i)(`docker.apps.uninstall.keepNote`)),1),p(`div`,On,[f(k(Ae),{value:v.value,"onUpdate:value":n[2]||=e=>v.value=e,type:`password`,"show-password-on":`click`,size:`small`,disabled:b.value,placeholder:k(i)(`docker.apps.uninstall.password`),"input-props":T,onKeyup:ue(P,[`enter`])},null,8,[`value`,`disabled`,`placeholder`])]),p(`div`,kn,[p(`div`,An,[u(M(k(i)(`docker.apps.uninstall.typeName`))+`: `,1),p(`span`,jn,M(e.name),1)]),f(k(Ae),{value:g.value,"onUpdate:value":n[3]||=e=>g.value=e,size:`small`,disabled:b.value,placeholder:e.name,status:E.value?`error`:void 0,"input-props":w},null,8,[`value`,`disabled`,`placeholder`,`status`]),E.value?(y(),o(`p`,Mn,M(k(i)(`docker.apps.uninstall.nameMismatch`)),1)):_(``,!0)]),x.value?(y(),h(k(X),{key:2,type:`error`,title:x.value,class:`block`},null,8,[`title`])):_(``,!0),b.value?(y(),o(`p`,Nn,M(k(i)(`docker.apps.uninstall.working`)),1)):_(``,!0)],64)):_(``,!0)]),_:1},8,[`show`,`title`,`closable`,`close-on-esc`]))}}),[[`__scopeId`,`data-v-0289968b`]]),In=5e3;function Ln(){let e=L([]),t=L(!1),n;function r(r,a,o){i(),e.value=[];let s=`/api/docker/containers/${encodeURIComponent(r)}/logs/stream?sinceMin=${a}&tail=${o}`;n=new EventSource(s),n.onopen=()=>{t.value=!0},n.onerror=()=>{t.value=!1},n.onmessage=t=>{try{let n=JSON.parse(t.data);e.value.push(n),e.value.length>In&&e.value.splice(0,e.value.length-In)}catch{}}}function i(){n?.close(),n=void 0,t.value=!1}return{lines:e,connected:t,open:r,close:i}}var Rn={key:1,class:`tab-loading`},zn={key:0,class:`log-empty`},Bn={key:0,class:`log-empty`},Vn={key:0,class:`log-ts`},Hn={class:`log-text`},Un=500,Wn=q(b({__name:`DockerView`,setup(e){let{t}=ae(),r=Ie();function i(e){return e instanceof N&&e.status===503&&!!e.body&&typeof e.body==`object`&&`enabled`in e.body}function s(e,t){r.error(e instanceof N?e.message:t)}let c=e=>e===`running`?`success`:e===`paused`||e===`restarting`?`warning`:e===`dead`?`error`:`default`,l={running:0,restarting:1,paused:2,created:3,exited:4,dead:5};function d(e){return l[e.state]??6}function m(e,t){return e.hasStats?t(e.stats):-1}let g=L([]),v=L(!0),b=L(null),x;async function S(){try{let e=await Q.containers();g.value=e.containers??[],b.value=null}catch(e){i(e)&&(b.value=e.body)}finally{v.value=!1}}async function w(e,n){try{let t=await Q.containerAction(e,n);g.value=t.containers}catch(e){s(e,t(`docker.actionFailed`,{action:n}))}}let T=L(!1),D=L(``),A=L(``),j=L(15),P=[{label:t(`docker.logs.last5m`),value:5},{label:t(`docker.logs.last10m`),value:10},{label:t(`docker.logs.last15m`),value:15},{label:t(`docker.logs.last1h`),value:60},{label:t(`docker.logs.last6h`),value:360},{label:t(`docker.logs.last24h`),value:1440}],F=L(!1),I=L(``);function R(e){I.value=e,F.value=!0}let ne=L(!1),z=L(null);function re(e){z.value=e,ne.value=!0}let B=Ln(),U=L(null),W=L(!0),G=L(!1),K;function oe(e,t){G.value=!1,K&&clearTimeout(K),K=setTimeout(()=>{B.connected.value||(G.value=!0)},6e3),B.open(e,t,Un)}function se(){W.value=!0,oe(D.value,j.value)}function q(e){D.value=e.id,A.value=e.name,T.value=!0,W.value=!0,oe(e.id,j.value)}V(j,e=>{T.value&&(W.value=!0,oe(D.value,e))}),V(T,e=>{e||(B.close(),K&&clearTimeout(K))}),V(B.connected,e=>{e&&(G.value=!1,K&&clearTimeout(K))}),V(()=>B.lines.value.length,async()=>{if(!W.value)return;await C();let e=U.value;e&&(e.scrollTop=e.scrollHeight)});function ce(){let e=U.value;if(!e)return;let t=e.scrollHeight-e.scrollTop-e.clientHeight<24;W.value=t}function le(e){if(!e)return``;let t=new Date(e);return Number.isNaN(t.getTime())?``:t.toLocaleTimeString()}let ue=/\b(error|fatal|panic|exception|critical)\b/i,de=/\bwarn(?:ing)?\b/i;function fe(e){return e.stream===`stderr`||ue.test(e.text)?`log-line--error`:de.test(e.text)?`log-line--warn`:``}let pe=H(()=>[{title:t(`common.name`),key:`name`,width:160,ellipsis:{tooltip:!0},sorter:(e,t)=>e.name.localeCompare(t.name)},{title:`Image`,key:`image`,width:180,ellipsis:{tooltip:!0},sorter:(e,t)=>e.image.localeCompare(t.image)},{title:`Status`,key:`state`,width:130,sorter:(e,t)=>d(e)-d(t),render:e=>n(Me,{type:c(e.state),size:`small`},{default:()=>e.status})},{title:`CPU`,key:`cpu`,width:70,sorter:(e,t)=>m(e,e=>e.cpuPercent)-m(t,e=>e.cpuPercent),render:e=>e.hasStats?`${e.stats.cpuPercent.toFixed(1)}%`:`—`},{title:`RAM`,key:`ram`,width:150,sorter:(e,t)=>m(e,e=>e.memUsageBytes)-m(t,e=>e.memUsageBytes),render:e=>e.hasStats?`${$(e.stats.memUsageBytes)} / ${$(e.stats.memLimitBytes)}`:`—`},{title:`Network`,key:`net`,width:140,sorter:(e,t)=>m(e,e=>e.netRxBytes+e.netTxBytes)-m(t,e=>e.netRxBytes+e.netTxBytes),render:e=>e.hasStats?`↓ ${$(e.stats.netRxBytes)} ↑ ${$(e.stats.netTxBytes)}`:`—`},{title:`Ports`,key:`ports`,width:220,ellipsis:{tooltip:!0}},{title:t(`common.actions`),key:`actions`,width:270,render:e=>n(ze,{size:`small`},()=>[e.state===`running`?[n(O,{size:`tiny`,onClick:()=>w(e.id,`stop`)},()=>`Stop`),n(O,{size:`tiny`,onClick:()=>w(e.id,`restart`)},()=>`Restart`)]:n(O,{size:`tiny`,type:`primary`,onClick:()=>w(e.id,`start`)},()=>`Start`),n(O,{size:`tiny`,quaternary:!0,onClick:()=>q(e)},()=>t(`docker.logs.button`)),n(Be,{onPositiveClick:()=>w(e.id,`remove`)},{trigger:()=>n(O,{size:`tiny`,type:`error`,ghost:!0},()=>t(`common.delete`)),default:()=>t(`docker.confirmDeleteContainer`,{name:e.name})})])}]),me=L([]),he=L(!0),_e=L(null);async function ye(){he.value=!0;try{let e=await Q.images();me.value=e.images,_e.value=null}catch(e){i(e)&&(_e.value=e.body)}finally{he.value=!1}}async function be(e){try{let t=await Q.removeImage(e);me.value=t.images}catch(e){s(e,t(`docker.removeImageFailed`))}}let we=H(()=>[{title:`Tag`,key:`tag`,minWidth:200,ellipsis:{tooltip:!0},sorter:(e,t)=>e.tag.localeCompare(t.tag),render:e=>e.dangling?n(ze,{size:`small`,align:`center`},()=>[e.tag,n(Me,{size:`small`,type:`warning`},()=>`dangling`)]):e.tag},{title:t(`common.size`),key:`sizeBytes`,width:110,sorter:(e,t)=>e.sizeBytes-t.sizeBytes,render:e=>$(e.sizeBytes)},{title:t(`docker.usedColumn`),key:`containers`,width:140,sorter:(e,t)=>e.containers-t.containers,render:e=>e.containers<0?`—`:e.containers===0?t(`docker.notUsed`):t(`docker.containerCount`,{count:e.containers})},{title:t(`docker.created`),key:`created`,width:150,sorter:(e,t)=>Date.parse(e.created)-Date.parse(t.created),render:e=>Ke(e.created)},{title:t(`common.actions`),key:`actions`,width:100,render:e=>n(Be,{onPositiveClick:()=>be(e.id)},{trigger:()=>n(O,{size:`tiny`,type:`error`,ghost:!0},()=>t(`common.delete`)),default:()=>t(`docker.confirmDeleteImage`,{tag:e.tag})})}]),Te=L([]),Ee=L(!0),De=L(null);async function Oe(){Ee.value=!0;try{let e=await Q.volumes();Te.value=e.volumes,De.value=null}catch(e){i(e)&&(De.value=e.body)}finally{Ee.value=!1}}async function ke(e){try{let t=await Q.removeVolume(e);Te.value=t.volumes}catch(e){s(e,t(`docker.removeVolumeFailed`))}}let Ae=H(()=>[{title:t(`common.name`),key:`name`,minWidth:180,ellipsis:{tooltip:!0},sorter:(e,t)=>e.name.localeCompare(t.name)},{title:`Driver`,key:`driver`,width:100,sorter:(e,t)=>e.driver.localeCompare(t.driver)},{title:t(`common.size`),key:`sizeBytes`,width:110,sorter:(e,t)=>e.sizeBytes-t.sizeBytes,render:e=>e.sizeBytes<0?t(`docker.unknown`):$(e.sizeBytes)},{title:`Status`,key:`inUse`,width:120,sorter:(e,t)=>Number(e.inUse)-Number(t.inUse),render:e=>n(Me,{size:`small`,type:e.inUse?`success`:`default`},()=>e.inUse?t(`docker.used`):t(`docker.notUsed`))},{title:t(`common.actions`),key:`actions`,width:100,render:e=>n(Be,{onPositiveClick:()=>ke(e.name)},{trigger:()=>n(O,{size:`tiny`,type:`error`,ghost:!0},()=>t(`common.delete`)),default:()=>t(`docker.confirmDeleteVolume`,{name:e.name})})}]),je=L([]),Ne=L(!0),Pe=L(null);async function Fe(){Ne.value=!0;try{let e=await Q.networks();je.value=e.networks,Pe.value=null}catch(e){i(e)&&(Pe.value=e.body)}finally{Ne.value=!1}}async function Ve(e){try{let t=await Q.removeNetwork(e);je.value=t.networks}catch(e){s(e,t(`docker.removeNetworkFailed`))}}let He=H(()=>[{title:t(`common.name`),key:`name`,minWidth:160,ellipsis:{tooltip:!0},sorter:(e,t)=>e.name.localeCompare(t.name),render:e=>e.builtin?n(ze,{size:`small`,align:`center`},()=>[e.name,n(Me,{size:`small`},()=>`builtin`)]):e.name},{title:`Driver`,key:`driver`,width:100,sorter:(e,t)=>e.driver.localeCompare(t.driver)},{title:`Subnet`,key:`subnet`,width:150,sorter:(e,t)=>e.subnet.localeCompare(t.subnet),render:e=>e.subnet||`—`},{title:t(`docker.connectedContainers`),key:`connectedCount`,width:170,sorter:(e,t)=>e.connectedCount-t.connectedCount},{title:t(`common.actions`),key:`actions`,width:100,render:e=>e.builtin?null:n(Be,{onPositiveClick:()=>Ve(e.id)},{trigger:()=>n(O,{size:`tiny`,type:`error`,ghost:!0},()=>t(`common.delete`)),default:()=>t(`docker.confirmDeleteNetwork`,{name:e.name})})}]),Z=L(null),Ue=L(!0),We=L(null),Ge=L(null);async function qe(){Ue.value=!0;try{Z.value=await Q.settings(),We.value=null}catch(e){i(e)&&(We.value=e.body)}finally{Ue.value=!1}}async function Je(e){Ge.value=e;try{Z.value=await Q.prune(e),r.success(t(`docker.cleanupDone`))}catch(n){s(n,t(`docker.cleanupFailed`,{kind:e}))}finally{Ge.value=null}}let Ye=ie(),Xe=typeof Ye.query.app==`string`?Ye.query.app:void 0,Ze=L(Ye.query.tab===`apps`?`apps`:`containers`),Qe=new Set([`containers`]);return V(Ze,e=>{Qe.has(e)||(Qe.add(e),e===`images`?ye():e===`volumes`?Oe():e===`networks`?Fe():e===`settings`&&qe())}),ee(()=>{S(),x=setInterval(S,5e3)}),E(()=>{x&&clearInterval(x),K&&clearTimeout(K),B.close()}),(e,n)=>(y(),h(ve,null,{default:J(()=>[f(k(Ot),{type:`line`,value:Ze.value,"onUpdate:value":n[0]||=e=>Ze.value=e},{default:J(()=>[f(k(St),{name:`containers`,tab:`Containers`},{default:J(()=>[b.value?(y(),h(k(X),{key:0,type:`warning`,title:b.value.error},null,8,[`title`])):(y(),h(k(Ce),{key:1,columns:pe.value,data:g.value,loading:v.value,"row-key":e=>e.id,"scroll-x":1200},null,8,[`columns`,`data`,`loading`,`row-key`]))]),_:1}),f(k(St),{name:`apps`,tab:k(t)(`docker.apps.tab`)},{default:J(()=>[b.value?(y(),h(k(X),{key:0,type:`warning`,title:b.value.error},null,8,[`title`])):(y(),h(Xt,{key:1,containers:g.value,focus:k(Xe),onLogs:q,onEnv:re,onUninstall:R},null,8,[`containers`,`focus`]))]),_:1},8,[`tab`]),f(k(St),{name:`images`,tab:`Images`},{default:J(()=>[_e.value?(y(),h(k(X),{key:0,type:`warning`,title:_e.value.error},null,8,[`title`])):(y(),h(k(Ce),{key:1,columns:we.value,data:me.value,loading:he.value,"row-key":e=>e.id,"scroll-x":700},null,8,[`columns`,`data`,`loading`,`row-key`]))]),_:1}),f(k(St),{name:`volumes`,tab:`Volumes`},{default:J(()=>[De.value?(y(),h(k(X),{key:0,type:`warning`,title:De.value.error},null,8,[`title`])):(y(),h(k(Ce),{key:1,columns:Ae.value,data:Te.value,loading:Ee.value,"row-key":e=>e.name,"scroll-x":610},null,8,[`columns`,`data`,`loading`,`row-key`]))]),_:1}),f(k(St),{name:`networks`,tab:`Networks`},{default:J(()=>[Pe.value?(y(),h(k(X),{key:0,type:`warning`,title:Pe.value.error},null,8,[`title`])):(y(),h(k(Ce),{key:1,columns:He.value,data:je.value,loading:Ne.value,"row-key":e=>e.id,"scroll-x":680},null,8,[`columns`,`data`,`loading`,`row-key`]))]),_:1}),f(k(St),{name:`settings`,tab:`Settings`},{default:J(()=>[We.value?(y(),h(k(X),{key:0,type:`warning`,title:We.value.error},null,8,[`title`])):Ue.value&&!Z.value?(y(),o(`div`,Rn,[f(k(ge),{size:`large`})])):Z.value?(y(),h(k(ze),{key:3,vertical:``,size:24},{default:J(()=>[f(k(_t),{title:k(t)(`docker.daemonInfo`),column:2,bordered:``,"label-placement":`left`},{default:J(()=>[f(k(yt),{label:k(t)(`docker.serverVersion`)},{default:J(()=>[u(M(Z.value?.info.serverVersion),1)]),_:1},8,[`label`]),f(k(yt),{label:`OS / Kernel`},{default:J(()=>[u(M(Z.value?.info.operatingSystem)+` / `+M(Z.value?.info.kernelVersion),1)]),_:1}),f(k(yt),{label:`Storage Driver`},{default:J(()=>[u(M(Z.value?.info.storageDriver),1)]),_:1}),f(k(yt),{label:`Root Dir`},{default:J(()=>[u(M(Z.value?.info.dockerRootDir),1)]),_:1}),f(k(yt),{label:`Container`},{default:J(()=>[u(M(Z.value?.info.containersRunning)+` running, `+M(Z.value?.info.containersPaused)+` paused, `+M(Z.value?.info.containersStopped)+` stopped `,1)]),_:1}),f(k(yt),{label:`Images`},{default:J(()=>[u(M(Z.value?.info.images),1)]),_:1})]),_:1},8,[`title`]),f(k(_t),{title:`Disk Usage`,column:2,bordered:``,"label-placement":`left`},{default:J(()=>[f(k(yt),{label:`Images`},{default:J(()=>[u(M(k($)(Z.value?.diskUsage.imagesTotalBytes??0))+` (reclaimable `+M(k($)(Z.value?.diskUsage.imagesReclaimableBytes??0))+`) `,1)]),_:1}),f(k(yt),{label:`Containers`},{default:J(()=>[u(M(k($)(Z.value?.diskUsage.containersTotalBytes??0)),1)]),_:1}),f(k(yt),{label:`Volumes`},{default:J(()=>[u(M(k($)(Z.value?.diskUsage.volumesTotalBytes??0))+` (reclaimable `+M(k($)(Z.value?.diskUsage.volumesReclaimableBytes??0))+`) `,1)]),_:1})]),_:1}),f(k(ze),null,{default:J(()=>[(y(),o(a,null,te([`containers`,`images`,`volumes`,`networks`,`all`],e=>f(k(Be),{key:e,onPositiveClick:t=>Je(e)},{trigger:J(()=>[f(k(O),{size:`small`,loading:Ge.value===e},{default:J(()=>[u(M(k(t)(`docker.cleanup`))+` `+M(e),1)]),_:2},1032,[`loading`])]),default:J(()=>[u(` `+M(k(t)(`docker.confirmCleanup`,{kind:e})),1)]),_:2},1032,[`onPositiveClick`])),64))]),_:1})]),_:1})):(y(),h(k(xe),{key:2,description:k(t)(`docker.noData`)},null,8,[`description`]))]),_:1})]),_:1},8,[`value`]),f(ln,{show:ne.value,"onUpdate:show":n[1]||=e=>ne.value=e,container:z.value},null,8,[`show`,`container`]),f(Fn,{show:F.value,"onUpdate:show":n[2]||=e=>F.value=e,name:I.value,onDone:S},null,8,[`show`,`name`]),f(k(Le),{show:T.value,"onUpdate:show":n[4]||=e=>T.value=e,width:640,placement:`right`},{default:J(()=>[f(k(Re),{title:k(t)(`docker.logs.title`,{name:A.value}),closable:``},{default:J(()=>[f(k(Se),{value:j.value,"onUpdate:value":n[3]||=e=>j.value=e,options:P,size:`small`,style:{width:`150px`,"margin-bottom":`10px`}},null,8,[`value`]),k(B).lines.value.length===0&&!k(B).connected.value?(y(),o(`div`,zn,[p(`p`,null,M(G.value?k(t)(`docker.logs.connectingSlow`):k(t)(`docker.logs.connecting`)),1),G.value?(y(),h(k(O),{key:0,size:`tiny`,onClick:se},{default:J(()=>[u(M(k(t)(`docker.logs.reconnect`)),1)]),_:1})):_(``,!0)])):_(``,!0),p(`div`,{ref_key:`logScrollEl`,ref:U,class:`log-scroll`,onScroll:ce},[k(B).lines.value.length===0&&k(B).connected.value?(y(),o(`p`,Bn,M(k(t)(`docker.logs.waiting`)),1)):_(``,!0),(y(!0),o(a,null,te(k(B).lines.value,(e,t)=>(y(),o(`div`,{key:t,class:Y([`log-line`,fe(e)])},[e.timestamp?(y(),o(`span`,Vn,M(le(e.timestamp)),1)):_(``,!0),p(`span`,Hn,M(e.text),1)],2))),128))],544)]),_:1},8,[`title`])]),_:1},8,[`show`])]),_:1}))}}),[[`__scopeId`,`data-v-b9e93c92`]]);export{Wn as default};