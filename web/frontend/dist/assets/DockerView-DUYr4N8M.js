import{$n as e,An as t,Bn as n,Bt as r,Cn as i,Dn as a,Fn as o,Gt as s,Hn as c,Ht as l,In as u,It as d,Kn as f,Ln as p,Mn as m,N as h,Nn as g,Nt as _,Pn as v,Pt as y,Qn as b,Rn as x,Tt as S,U as C,Un as w,V as T,Vn as E,Xn as ee,Yn as D,Zt as O,_ as k,_r as A,_t as j,ar as M,br as N,c as P,cn as F,d as I,dn as L,dr as R,er as te,fn as z,gn as ne,h as B,hn as re,i as ie,in as ae,ir as V,jn as H,ln as U,m as oe,mn as W,mr as G,mt as K,nn as se,nr as ce,o as q,or as J,p as le,pn as ue,sr as de,tr as fe,vr as pe,wn as me,wt as he,xn as ge,xt as _e,yn as ve}from"./auth-DGoV9TJi.js";import{T as ye,_ as be,f as xe,l as Se,t as Ce,v as we,w as Te}from"./AppShell-Bd7Uhp6v.js";import{a as Ee,r as Y,t as De}from"./Select-BcaKVLak.js";import{t as Oe,u as ke}from"./useTheme-DiuzT7mm.js";import{t as Ae}from"./Modal-DNnw_-dk.js";import{c as je,n as X}from"./LocaleSwitcher-Ywy3SSXV.js";import{t as Me}from"./DataTable-D3vKOgAa.js";import{n as Ne}from"./fade-in-scale-up.cssr-DYxu4Fw-.js";import{t as Pe}from"./get-slot-6kXJmSMP.js";import{t as Fe}from"./omit-C4pE9leG.js";import{t as Ie}from"./Input-BICb--Ry.js";import{t as Le}from"./Add-fEGjPfWJ.js";import{t as Re}from"./Checkbox-BwhTrnZY.js";import{i as ze,r as Be,t as Ve}from"./play-At4TqYQS.js";import{t as He}from"./use-message-DzNW-Qzi.js";import{n as Ue,t as We}from"./DrawerContent-D_cBiZJZ.js";import{t as Ge}from"./Space-BkvcRa2v.js";import{t as Ke}from"./Popconfirm-BBe84bvk.js";import{n as Z,r as qe,t as Je}from"./copy-9pb6vFVO.js";import{a as Ye,r as Xe,t as Ze}from"./inputProps-kih66hpo.js";import{t as Qe}from"./trash-2-iim3ypeM.js";import{t as $e}from"./x-DlTT1dIF.js";import{r as et,t as tt}from"./dockerProjects-DUZuaNb6.js";import{t as Q}from"./docker-B1kNYO9T.js";import{n as nt,t as $}from"./format-BxLcbkc3.js";import{n as rt,t as it}from"./xterm-BErkPzDY.js";var at=be(`.v-x-scroll`,{overflow:`auto`,scrollbarWidth:`none`},[be(`&::-webkit-scrollbar`,{width:0,height:0})]),ot=x({name:`XScroll`,props:{disabled:Boolean,onScroll:Function},setup(){let e=R(null);function t(e){!(e.currentTarget.offsetWidth<e.currentTarget.scrollWidth)||e.deltaY===0||(e.currentTarget.scrollLeft+=e.deltaY+e.deltaX,e.preventDefault())}let n=l();return at.mount({id:`vueuc/x-scroll`,head:!0,anchorMetaName:we,ssr:n}),Object.assign({selfRef:e,handleWheel:t},{scrollTo(...t){var n;(n=e.value)==null||n.scrollTo(...t)}})},render(){return n(`div`,{ref:`selfRef`,onScroll:this.onScroll,onWheel:this.disabled?void 0:this.handleWheel,class:`v-x-scroll`},this.$slots)}});function st(e,t=`default`,n=[]){let{children:r}=e;if(typeof r==`object`&&r&&!Array.isArray(r)){let e=r[t];if(typeof e==`function`)return e()}return n}var ct=/\s/;function lt(e){for(var t=e.length;t--&&ct.test(e.charAt(t)););return t}var ut=/^\s+/;function dt(e){return e&&e.slice(0,lt(e)+1).replace(ut,``)}var ft=NaN,pt=/^[-+]0x[0-9a-f]+$/i,mt=/^0b[01]+$/i,ht=/^0o[0-7]+$/i,gt=parseInt;function _t(e){if(typeof e==`number`)return e;if(j(e))return ft;if(K(e)){var t=typeof e.valueOf==`function`?e.valueOf():e;e=K(t)?t+``:t}if(typeof e!=`string`)return e===0?e:+e;e=dt(e);var n=mt.test(e);return n||ht.test(e)?gt(e.slice(2),n?2:8):pt.test(e)?ft:+e}var vt=function(){return _e.Date.now()},yt=`Expected a function`,bt=Math.max,xt=Math.min;function St(e,t,n){var r,i,a,o,s,c,l=0,u=!1,d=!1,f=!0;if(typeof e!=`function`)throw TypeError(yt);t=_t(t)||0,K(n)&&(u=!!n.leading,d=`maxWait`in n,a=d?bt(_t(n.maxWait)||0,t):a,f=`trailing`in n?!!n.trailing:f);function p(t){var n=r,a=i;return r=i=void 0,l=t,o=e.apply(a,n),o}function m(e){return l=e,s=setTimeout(_,t),u?p(e):o}function h(e){var n=e-c,r=e-l,i=t-n;return d?xt(i,a-r):i}function g(e){var n=e-c,r=e-l;return c===void 0||n>=t||n<0||d&&r>=a}function _(){var e=vt();if(g(e))return v(e);s=setTimeout(_,h(e))}function v(e){return s=void 0,f&&r?p(e):(r=i=void 0,o)}function y(){s!==void 0&&clearTimeout(s),l=0,r=c=i=s=void 0}function b(){return s===void 0?o:v(vt())}function x(){var e=vt(),n=g(e);if(r=arguments,i=this,c=e,n){if(s===void 0)return m(c);if(d)return clearTimeout(s),s=setTimeout(_,t),p(c)}return s===void 0&&(s=setTimeout(_,t)),o}return x.cancel=y,x.flush=b,x}var Ct=`Expected a function`;function wt(e,t,n){var r=!0,i=!0;if(typeof e!=`function`)throw TypeError(Ct);return K(n)&&(r=`leading`in n?!!n.leading:r,i=`trailing`in n?!!n.trailing:i),St(e,t,{leading:r,maxWait:t,trailing:i})}var Tt=F([U(`descriptions`,{fontSize:`var(--n-font-size)`},[U(`descriptions-separator`,`
 display: inline-block;
 margin: 0 8px 0 2px;
 `),U(`descriptions-table-wrapper`,[U(`descriptions-table`,[U(`descriptions-table-row`,[U(`descriptions-table-header`,{padding:`var(--n-th-padding)`}),U(`descriptions-table-content`,{padding:`var(--n-td-padding)`})])])]),ue(`bordered`,[U(`descriptions-table-wrapper`,[U(`descriptions-table`,[U(`descriptions-table-row`,[F(`&:last-child`,[U(`descriptions-table-content`,{paddingBottom:0})])])])])]),z(`left-label-placement`,[U(`descriptions-table-content`,[F(`> *`,{verticalAlign:`top`})])]),z(`left-label-align`,[F(`th`,{textAlign:`left`})]),z(`center-label-align`,[F(`th`,{textAlign:`center`})]),z(`right-label-align`,[F(`th`,{textAlign:`right`})]),z(`bordered`,[U(`descriptions-table-wrapper`,`
 border-radius: var(--n-border-radius);
 overflow: hidden;
 background: var(--n-merged-td-color);
 border: 1px solid var(--n-merged-border-color);
 `,[U(`descriptions-table`,[U(`descriptions-table-row`,[F(`&:not(:last-child)`,[U(`descriptions-table-content`,{borderBottom:`1px solid var(--n-merged-border-color)`}),U(`descriptions-table-header`,{borderBottom:`1px solid var(--n-merged-border-color)`})]),U(`descriptions-table-header`,`
 font-weight: 400;
 background-clip: padding-box;
 background-color: var(--n-merged-th-color);
 `,[F(`&:not(:last-child)`,{borderRight:`1px solid var(--n-merged-border-color)`})]),U(`descriptions-table-content`,[F(`&:not(:last-child)`,{borderRight:`1px solid var(--n-merged-border-color)`})])])])])]),U(`descriptions-header`,`
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
 `,[L(`content`,`
 transition: color .3s var(--n-bezier);
 display: inline-block;
 color: var(--n-td-text-color);
 `)]),L(`label`,`
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
 `))]),Et=`DESCRIPTION_ITEM_FLAG`;function Dt(e){return typeof e==`object`&&e&&!Array.isArray(e)?e.type&&e.type.DESCRIPTION_ITEM_FLAG:!1}var Ot=Object.assign(Object.assign({},C.props),{title:String,column:{type:Number,default:3},columns:Number,labelPlacement:{type:String,default:`top`},labelAlign:{type:String,default:`left`},separator:{type:String,default:`:`},size:String,bordered:Boolean,labelClass:String,labelStyle:[Object,String],contentClass:String,contentStyle:[Object,String]}),kt=x({name:`Descriptions`,props:Ot,slots:Object,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n,mergedComponentPropsRef:r}=S(e),i=H(()=>e.size||r?.value?.Descriptions?.size||`medium`),a=C(`Descriptions`,`-descriptions`,Tt,ze,e,t),o=H(()=>{let{bordered:t}=e,n=i.value,{common:{cubicBezierEaseInOut:r},self:{titleTextColor:o,thColor:s,thColorModal:c,thColorPopover:l,thTextColor:u,thFontWeight:d,tdTextColor:f,tdColor:p,tdColorModal:m,tdColorPopover:h,borderColor:g,borderColorModal:_,borderColorPopover:v,borderRadius:y,lineHeight:b,[W(`fontSize`,n)]:x,[W(t?`thPaddingBordered`:`thPadding`,n)]:S,[W(t?`tdPaddingBordered`:`tdPadding`,n)]:C}}=a.value;return{"--n-title-text-color":o,"--n-th-padding":S,"--n-td-padding":C,"--n-font-size":x,"--n-bezier":r,"--n-th-font-weight":d,"--n-line-height":b,"--n-th-text-color":u,"--n-td-text-color":f,"--n-th-color":s,"--n-th-color-modal":c,"--n-th-color-popover":l,"--n-td-color":p,"--n-td-color-modal":m,"--n-td-color-popover":h,"--n-border-radius":y,"--n-border-color":g,"--n-border-color-modal":_,"--n-border-color-popover":v}}),s=n?he(`descriptions`,H(()=>{let t=``,{bordered:n}=e;return n&&(t+=`a`),t+=i.value[0],t}),o,e):void 0;return{mergedClsPrefix:t,cssVars:n?void 0:o,themeClass:s?.themeClass,onRender:s?.onRender,compitableColumn:Te(e,[`columns`,`column`]),inlineThemeDisabled:n,mergedSize:i}},render(){let e=this.$slots.default,t=e?ke(e()):[];t.length;let{contentClass:r,labelClass:i,compitableColumn:a,labelPlacement:o,labelAlign:s,mergedSize:c,bordered:l,title:u,cssVars:d,mergedClsPrefix:f,separator:p,onRender:m}=this;m?.();let h=t.filter(e=>Dt(e)),g=h.reduce((e,t,s)=>{let c=t.props||{},u=h.length-1===s,d=[`label`in c?c.label:st(t,`label`)],m=[st(t)],g=c.span||1,_=e.span;e.span+=g;let v=c.labelStyle||c[`label-style`]||this.labelStyle,y=c.contentStyle||c[`content-style`]||this.contentStyle;if(o===`left`)l?e.row.push(n(`th`,{class:[`${f}-descriptions-table-header`,i],colspan:1,style:v},d),n(`td`,{class:[`${f}-descriptions-table-content`,r],colspan:u?(a-_)*2+1:g*2-1,style:y},m)):e.row.push(n(`td`,{class:`${f}-descriptions-table-content`,colspan:u?(a-_)*2:g*2},n(`span`,{class:[`${f}-descriptions-table-content__label`,i],style:v},[...d,p&&n(`span`,{class:`${f}-descriptions-separator`},p)]),n(`span`,{class:[`${f}-descriptions-table-content__content`,r],style:y},m)));else{let t=u?(a-_)*2:g*2;e.row.push(n(`th`,{class:[`${f}-descriptions-table-header`,i],colspan:t,style:v},d)),e.secondRow.push(n(`td`,{class:[`${f}-descriptions-table-content`,r],colspan:t,style:y},m))}return(e.span>=a||u)&&(e.span=0,e.row.length&&(e.rows.push(e.row),e.row=[]),o!==`left`&&e.secondRow.length&&(e.rows.push(e.secondRow),e.secondRow=[])),e},{span:0,row:[],secondRow:[],rows:[]}).rows.map(e=>n(`tr`,{class:`${f}-descriptions-table-row`},e));return n(`div`,{style:d,class:[`${f}-descriptions`,this.themeClass,`${f}-descriptions--${o}-label-placement`,`${f}-descriptions--${s}-label-align`,`${f}-descriptions--${c}-size`,l&&`${f}-descriptions--bordered`]},u||this.$slots.header?n(`div`,{class:`${f}-descriptions-header`},u||Pe(this,`header`)):null,n(`div`,{class:`${f}-descriptions-table-wrapper`},n(`table`,{class:`${f}-descriptions-table`},n(`tbody`,null,o===`top`&&n(`tr`,{class:`${f}-descriptions-table-row`,style:{visibility:`collapse`}},O(a*2,n(`td`,null))),g))))}}),At={label:String,span:{type:Number,default:1},labelClass:String,labelStyle:[Object,String],contentClass:String,contentStyle:[Object,String]},jt=x({name:`DescriptionsItem`,[Et]:!0,props:At,slots:Object,render(){return null}}),Mt=s(`n-tabs`),Nt={tab:[String,Number,Object,Function],name:{type:[String,Number],required:!0},disabled:Boolean,displayDirective:{type:String,default:`if`},closable:{type:Boolean,default:void 0},tabProps:Object,label:[String,Number,Object,Function]},Pt=x({__TAB_PANE__:!0,name:`TabPane`,alias:[`TabPanel`],props:Nt,slots:Object,setup(e){let t=E(Mt,null);return t||d(`tab-pane`,"`n-tab-pane` must be placed inside `n-tabs`."),{style:t.paneStyleRef,class:t.paneClassRef,mergedClsPrefix:t.mergedClsPrefixRef}},render(){return n(`div`,{class:[`${this.mergedClsPrefix}-tab-pane`,this.class],style:this.style},this.$slots)}}),Ft=Object.assign({internalLeftPadded:Boolean,internalAddable:Boolean,internalCreatedByPane:Boolean},Fe(Nt,[`displayDirective`])),It=x({__TAB__:!0,inheritAttrs:!1,name:`Tab`,props:Ft,setup(e){let{mergedClsPrefixRef:t,valueRef:n,typeRef:r,closableRef:i,tabStyleRef:a,addTabStyleRef:o,tabClassRef:s,addTabClassRef:c,tabChangeIdRef:l,onBeforeLeaveRef:u,triggerRef:d,handleAdd:f,activateTab:p,handleClose:m}=E(Mt);return{trigger:d,mergedClosable:H(()=>{if(e.internalAddable)return!1;let{closable:t}=e;return t===void 0?i.value:t}),style:a,addStyle:o,tabClass:s,addTabClass:c,clsPrefix:t,value:n,type:r,handleClose(t){t.stopPropagation(),!e.disabled&&m(e.name)},activateTab(){if(e.disabled)return;if(e.internalAddable){f();return}let{name:t}=e,r=++l.id;if(t!==n.value){let{value:i}=u;i?Promise.resolve(i(e.name,n.value)).then(e=>{e&&l.id===r&&p(t)}):p(t)}}}},render(){let{internalAddable:e,clsPrefix:t,name:r,disabled:i,label:o,tab:s,value:l,mergedClosable:u,trigger:d,$slots:{default:f}}=this,p=o??s;return n(`div`,{class:`${t}-tabs-tab-wrapper`},this.internalLeftPadded?n(`div`,{class:`${t}-tabs-tab-pad`}):null,n(`div`,Object.assign({key:r,"data-name":r,"data-disabled":i?!0:void 0},c({class:[`${t}-tabs-tab`,l===r&&`${t}-tabs-tab--active`,i&&`${t}-tabs-tab--disabled`,u&&`${t}-tabs-tab--closable`,e&&`${t}-tabs-tab--addable`,e?this.addTabClass:this.tabClass],onClick:d===`click`?this.activateTab:void 0,onMouseenter:d===`hover`?this.activateTab:void 0,style:e?this.addStyle:this.style},this.internalCreatedByPane?this.tabProps||{}:this.$attrs)),n(`span`,{class:`${t}-tabs-tab__label`},e?n(a,null,n(`div`,{class:`${t}-tabs-tab__height-placeholder`},`\xA0`),n(T,{clsPrefix:t},{default:()=>n(Le,null)})):f?f():typeof p==`object`?p:Ne(p??r)),u&&this.type===`card`?n(h,{clsPrefix:t,class:`${t}-tabs-tab__close`,onClick:this.handleClose,disabled:i}):null))}}),Lt=U(`tabs`,`
 box-sizing: border-box;
 width: 100%;
 display: flex;
 flex-direction: column;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
`,[z(`segment-type`,[U(`tabs-rail`,[F(`&.transition-disabled`,[U(`tabs-capsule`,`
 transition: none;
 `)])])]),z(`top`,[U(`tab-pane`,`
 padding: var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left);
 `)]),z(`left`,[U(`tab-pane`,`
 padding: var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left) var(--n-pane-padding-top);
 `)]),z(`left, right`,`
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
 `)]),z(`right`,`
 flex-direction: row-reverse;
 `,[U(`tab-pane`,`
 padding: var(--n-pane-padding-left) var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom);
 `),U(`tabs-bar`,`
 left: 0;
 `)]),z(`bottom`,`
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
 `,[z(`active`,`
 font-weight: var(--n-font-weight-strong);
 color: var(--n-tab-text-color-active);
 `),F(`&:hover`,`
 color: var(--n-tab-text-color-hover);
 `)])])]),z(`flex`,[U(`tabs-nav`,`
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
 `,[L(`prefix, suffix`,`
 display: flex;
 align-items: center;
 `),L(`prefix`,`padding-right: 16px;`),L(`suffix`,`padding-left: 16px;`)]),z(`top, bottom`,[F(`>`,[U(`tabs-nav`,[U(`tabs-nav-scroll-wrapper`,[F(`&::before`,`
 top: 0;
 bottom: 0;
 left: 0;
 width: 20px;
 `),F(`&::after`,`
 top: 0;
 bottom: 0;
 right: 0;
 width: 20px;
 `),z(`shadow-start`,[F(`&::before`,`
 box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, .12);
 `)]),z(`shadow-end`,[F(`&::after`,`
 box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),z(`left, right`,[U(`tabs-nav-scroll-content`,`
 flex-direction: column;
 `),F(`>`,[U(`tabs-nav`,[U(`tabs-nav-scroll-wrapper`,[F(`&::before`,`
 top: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),F(`&::after`,`
 bottom: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),z(`shadow-start`,[F(`&::before`,`
 box-shadow: inset 0 10px 8px -8px rgba(0, 0, 0, .12);
 `)]),z(`shadow-end`,[F(`&::after`,`
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
 `,[F(`&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb`,`
 width: 0;
 height: 0;
 display: none;
 `)]),F(`&::before, &::after`,`
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
 `,[z(`disabled`,{cursor:`not-allowed`}),L(`close`,`
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),L(`label`,`
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
 `,[F(`&.transition-disabled`,`
 transition: none;
 `),z(`disabled`,`
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
 `,[F(`&.next-transition-leave-active, &.prev-transition-leave-active, &.next-transition-enter-active, &.prev-transition-enter-active`,`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 transform .2s var(--n-bezier),
 opacity .2s var(--n-bezier);
 `),F(`&.next-transition-leave-active, &.prev-transition-leave-active`,`
 position: absolute;
 `),F(`&.next-transition-enter-from, &.prev-transition-leave-to`,`
 transform: translateX(32px);
 opacity: 0;
 `),F(`&.next-transition-leave-to, &.prev-transition-enter-from`,`
 transform: translateX(-32px);
 opacity: 0;
 `),F(`&.next-transition-leave-from, &.next-transition-enter-to, &.prev-transition-leave-from, &.prev-transition-enter-to`,`
 transform: translateX(0);
 opacity: 1;
 `)]),U(`tabs-tab-pad`,`
 box-sizing: border-box;
 width: var(--n-tab-gap);
 flex-grow: 0;
 flex-shrink: 0;
 `),z(`line-type, bar-type`,[U(`tabs-tab`,`
 font-weight: var(--n-tab-font-weight);
 box-sizing: border-box;
 vertical-align: bottom;
 `,[F(`&:hover`,{color:`var(--n-tab-text-color-hover)`}),z(`active`,`
 color: var(--n-tab-text-color-active);
 font-weight: var(--n-tab-font-weight-active);
 `),z(`disabled`,{color:`var(--n-tab-text-color-disabled)`})])]),U(`tabs-nav`,[z(`line-type`,[z(`top`,[L(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),U(`tabs-nav-scroll-content`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),U(`tabs-bar`,`
 bottom: -1px;
 `)]),z(`left`,[L(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),U(`tabs-nav-scroll-content`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),U(`tabs-bar`,`
 right: -1px;
 `)]),z(`right`,[L(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),U(`tabs-nav-scroll-content`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),U(`tabs-bar`,`
 left: -1px;
 `)]),z(`bottom`,[L(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),U(`tabs-nav-scroll-content`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),U(`tabs-bar`,`
 top: -1px;
 `)]),L(`prefix, suffix`,`
 transition: border-color .3s var(--n-bezier);
 `),U(`tabs-nav-scroll-content`,`
 transition: border-color .3s var(--n-bezier);
 `),U(`tabs-bar`,`
 border-radius: 0;
 `)]),z(`card-type`,[L(`prefix, suffix`,`
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
 `,[z(`addable`,`
 padding-left: 8px;
 padding-right: 8px;
 font-size: 16px;
 justify-content: center;
 `,[L(`height-placeholder`,`
 width: 0;
 font-size: var(--n-tab-font-size);
 `),ue(`disabled`,[F(`&:hover`,`
 color: var(--n-tab-text-color-hover);
 `)])]),z(`closable`,`padding-right: 8px;`),z(`active`,`
 background-color: #0000;
 font-weight: var(--n-tab-font-weight-active);
 color: var(--n-tab-text-color-active);
 `),z(`disabled`,`color: var(--n-tab-text-color-disabled);`)])]),z(`left, right`,`
 flex-direction: column; 
 `,[L(`prefix, suffix`,`
 padding: var(--n-tab-padding-vertical);
 `),U(`tabs-wrapper`,`
 flex-direction: column;
 `),U(`tabs-tab-wrapper`,`
 flex-direction: column;
 `,[U(`tabs-tab-pad`,`
 height: var(--n-tab-gap-vertical);
 width: 100%;
 `)])]),z(`top`,[z(`card-type`,[U(`tabs-scroll-padding`,`border-bottom: 1px solid var(--n-tab-border-color);`),L(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),U(`tabs-tab`,`
 border-top-left-radius: var(--n-tab-border-radius);
 border-top-right-radius: var(--n-tab-border-radius);
 `,[z(`active`,`
 border-bottom: 1px solid #0000;
 `)]),U(`tabs-tab-pad`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),U(`tabs-pad`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `)])]),z(`left`,[z(`card-type`,[U(`tabs-scroll-padding`,`border-right: 1px solid var(--n-tab-border-color);`),L(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),U(`tabs-tab`,`
 border-top-left-radius: var(--n-tab-border-radius);
 border-bottom-left-radius: var(--n-tab-border-radius);
 `,[z(`active`,`
 border-right: 1px solid #0000;
 `)]),U(`tabs-tab-pad`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),U(`tabs-pad`,`
 border-right: 1px solid var(--n-tab-border-color);
 `)])]),z(`right`,[z(`card-type`,[U(`tabs-scroll-padding`,`border-left: 1px solid var(--n-tab-border-color);`),L(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),U(`tabs-tab`,`
 border-top-right-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[z(`active`,`
 border-left: 1px solid #0000;
 `)]),U(`tabs-tab-pad`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),U(`tabs-pad`,`
 border-left: 1px solid var(--n-tab-border-color);
 `)])]),z(`bottom`,[z(`card-type`,[U(`tabs-scroll-padding`,`border-top: 1px solid var(--n-tab-border-color);`),L(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),U(`tabs-tab`,`
 border-bottom-left-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[z(`active`,`
 border-top: 1px solid #0000;
 `)]),U(`tabs-tab-pad`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),U(`tabs-pad`,`
 border-top: 1px solid var(--n-tab-border-color);
 `)])])])]),Rt=wt,zt=Object.assign(Object.assign({},C.props),{value:[String,Number],defaultValue:[String,Number],trigger:{type:String,default:`click`},type:{type:String,default:`bar`},closable:Boolean,justifyContent:String,size:String,placement:{type:String,default:`top`},tabStyle:[String,Object],tabClass:String,addTabStyle:[String,Object],addTabClass:String,barWidth:Number,paneClass:String,paneStyle:[String,Object],paneWrapperClass:String,paneWrapperStyle:[String,Object],addable:[Boolean,Object],tabsPadding:{type:Number,default:0},animated:Boolean,onBeforeLeave:Function,onAdd:Function,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onClose:[Function,Array],labelSize:String,activeName:[String,Number],onActiveNameChange:[Function,Array]}),Bt=x({name:`Tabs`,props:zt,slots:Object,setup(t,{slots:n}){let{mergedClsPrefixRef:r,inlineThemeDisabled:i,mergedComponentPropsRef:a}=S(t),o=C(`Tabs`,`-tabs`,Lt,Be,t,r),s=R(null),c=R(null),l=R(null),u=R(null),d=R(null),f=R(null),p=R(!0),m=R(!0),h=Te(t,[`labelSize`,`size`]),g=H(()=>h.value?h.value:a?.value?.Tabs?.size||`medium`),_=Te(t,[`activeName`,`value`]),v=R(_.value??t.defaultValue??(n.default?ke(n.default())[0]?.props?.name:null)),b=je(_,v),x={id:0},T=H(()=>{if(!(!t.justifyContent||t.type===`card`))return{display:`flex`,justifyContent:t.justifyContent}});V(b,()=>{x.id=0,A(),j()});function E(){let{value:e}=b;return e===null?null:s.value?.querySelector(`[data-name="${e}"]`)}function ee(e){if(t.type===`card`)return;let{value:n}=c;if(!n)return;let i=n.style.opacity===`0`;if(e){let a=`${r.value}-tabs-bar--disabled`,{barWidth:o,placement:s}=t;if(e.dataset.disabled===`true`?n.classList.add(a):n.classList.remove(a),[`top`,`bottom`].includes(s)){if(k([`top`,`maxHeight`,`height`]),typeof o==`number`&&e.offsetWidth>=o){let t=Math.floor((e.offsetWidth-o)/2)+e.offsetLeft;n.style.left=`${t}px`,n.style.maxWidth=`${o}px`}else n.style.left=`${e.offsetLeft}px`,n.style.maxWidth=`${e.offsetWidth}px`;n.style.width=`8192px`,i&&(n.style.transition=`none`),n.offsetWidth,i&&(n.style.transition=``,n.style.opacity=`1`)}else{if(k([`left`,`maxWidth`,`width`]),typeof o==`number`&&e.offsetHeight>=o){let t=Math.floor((e.offsetHeight-o)/2)+e.offsetTop;n.style.top=`${t}px`,n.style.maxHeight=`${o}px`}else n.style.top=`${e.offsetTop}px`,n.style.maxHeight=`${e.offsetHeight}px`;n.style.height=`8192px`,i&&(n.style.transition=`none`),n.offsetHeight,i&&(n.style.transition=``,n.style.opacity=`1`)}}}function O(){if(t.type===`card`)return;let{value:e}=c;e&&(e.style.opacity=`0`)}function k(e){let{value:t}=c;if(t)for(let n of e)t.style[n]=``}function A(){if(t.type===`card`)return;let e=E();e?ee(e):O()}function j(){let e=d.value?.$el;if(!e)return;let t=E();if(!t)return;let{scrollLeft:n,offsetWidth:r}=e,{offsetLeft:i,offsetWidth:a}=t;n>i?e.scrollTo({top:0,left:i,behavior:`smooth`}):i+a>n+r&&e.scrollTo({top:0,left:i+a-r,behavior:`smooth`})}let N=R(null),P=0,F=null;function I(e){let t=N.value;if(t){P=e.getBoundingClientRect().height;let n=`${P}px`,r=()=>{t.style.height=n,t.style.maxHeight=n};F?(r(),F(),F=null):F=r}}function L(e){let t=N.value;if(t){let n=e.getBoundingClientRect().height,r=()=>{document.body.offsetHeight,t.style.maxHeight=`${n}px`,t.style.height=`${Math.max(P,n)}px`};F?(F(),F=null,r()):F=r}}function te(){let e=N.value;if(e){e.style.maxHeight=``,e.style.height=``;let{paneWrapperStyle:n}=t;if(typeof n==`string`)e.style.cssText=n;else if(n){let{maxHeight:t,height:r}=n;t!==void 0&&(e.style.maxHeight=t),r!==void 0&&(e.style.height=r)}}}let z={value:[]},ne=R(`next`);function B(e){let t=b.value,n=`next`;for(let r of z.value){if(r===t)break;if(r===e){n=`prev`;break}}ne.value=n,re(e)}function re(e){let{onActiveNameChange:n,onUpdateValue:r,"onUpdate:value":i}=t;n&&y(n,e),r&&y(r,e),i&&y(i,e),v.value=e}function ie(e){let{onClose:n}=t;n&&y(n,e)}let U=!0;function oe(){let{value:e}=c;if(!e)return;U||=!1;let t=`transition-disabled`;e.classList.add(t),A(),e.classList.remove(t)}let K=R(null);function ce({transitionDisabled:e}){let t=s.value;if(!t)return;e&&t.classList.add(`transition-disabled`);let n=E();n&&K.value&&(K.value.style.width=`${n.offsetWidth}px`,K.value.style.height=`${n.offsetHeight}px`,K.value.style.transform=`translateX(${n.offsetLeft-se(getComputedStyle(t).paddingLeft)}px)`,e&&K.value.offsetWidth),e&&t.classList.remove(`transition-disabled`)}V([b],()=>{t.type===`segment`&&w(()=>{ce({transitionDisabled:!1})})}),D(()=>{t.type===`segment`&&ce({transitionDisabled:!0})});let q=0;function J(e){if(e.contentRect.width===0&&e.contentRect.height===0||q===e.contentRect.width)return;q=e.contentRect.width;let{type:n}=t;if((n===`line`||n===`bar`)&&(U||t.justifyContent?.startsWith(`space`))&&oe(),n!==`segment`){let{placement:e}=t;me((e===`top`||e===`bottom`?d.value?.$el:f.value)||null)}}let le=Rt(J,64);V([()=>t.justifyContent,()=>t.size],()=>{w(()=>{let{type:e}=t;(e===`line`||e===`bar`)&&oe()})});let ue=R(!1);function de(e){let{target:n,contentRect:{width:r,height:i}}=e,a=n.parentElement.parentElement.offsetWidth,o=n.parentElement.parentElement.offsetHeight,{placement:s}=t;if(!ue.value)s===`top`||s===`bottom`?a<r&&(ue.value=!0):o<i&&(ue.value=!0);else{let{value:e}=u;if(!e)return;s===`top`||s===`bottom`?a-r>e.$el.offsetWidth&&(ue.value=!1):o-i>e.$el.offsetHeight&&(ue.value=!1)}me(d.value?.$el||null)}let fe=Rt(de,64);function pe(){let{onAdd:e}=t;e&&e(),w(()=>{let e=E(),{value:t}=d;!e||!t||t.scrollTo({left:e.offsetLeft,top:0,behavior:`smooth`})})}function me(e){if(!e)return;let{placement:n}=t;if(n===`top`||n===`bottom`){let{scrollLeft:t,scrollWidth:n,offsetWidth:r}=e;p.value=t<=0,m.value=t+r>=n}else{let{scrollTop:t,scrollHeight:n,offsetHeight:r}=e;p.value=t<=0,m.value=t+r>=n}}let ge=Rt(e=>{me(e.target)},64);e(Mt,{triggerRef:G(t,`trigger`),tabStyleRef:G(t,`tabStyle`),tabClassRef:G(t,`tabClass`),addTabStyleRef:G(t,`addTabStyle`),addTabClassRef:G(t,`addTabClass`),paneClassRef:G(t,`paneClass`),paneStyleRef:G(t,`paneStyle`),mergedClsPrefixRef:r,typeRef:G(t,`type`),closableRef:G(t,`closable`),valueRef:b,tabChangeIdRef:x,onBeforeLeaveRef:G(t,`onBeforeLeave`),activateTab:B,handleClose:ie,handleAdd:pe}),ye(()=>{A(),j()}),M(()=>{let{value:e}=l;if(!e)return;let{value:t}=r,n=`${t}-tabs-nav-scroll-wrapper--shadow-start`,i=`${t}-tabs-nav-scroll-wrapper--shadow-end`;p.value?e.classList.remove(n):e.classList.add(n),m.value?e.classList.remove(i):e.classList.add(i)});let _e={syncBarPosition:()=>{A()}},ve=()=>{ce({transitionDisabled:!0})},be=H(()=>{let{value:e}=g,{type:n}=t,r=`${e}${{card:`Card`,bar:`Bar`,line:`Line`,segment:`Segment`}[n]}`,{self:{barColor:i,closeIconColor:a,closeIconColorHover:s,closeIconColorPressed:c,tabColor:l,tabBorderColor:u,paneTextColor:d,tabFontWeight:f,tabBorderRadius:p,tabFontWeightActive:m,colorSegment:h,fontWeightStrong:_,tabColorSegment:v,closeSize:y,closeIconSize:b,closeColorHover:x,closeColorPressed:S,closeBorderRadius:C,[W(`panePadding`,e)]:w,[W(`tabPadding`,r)]:T,[W(`tabPaddingVertical`,r)]:E,[W(`tabGap`,r)]:ee,[W(`tabGap`,`${r}Vertical`)]:D,[W(`tabTextColor`,n)]:O,[W(`tabTextColorActive`,n)]:k,[W(`tabTextColorHover`,n)]:A,[W(`tabTextColorDisabled`,n)]:j,[W(`tabFontSize`,e)]:M},common:{cubicBezierEaseInOut:N}}=o.value;return{"--n-bezier":N,"--n-color-segment":h,"--n-bar-color":i,"--n-tab-font-size":M,"--n-tab-text-color":O,"--n-tab-text-color-active":k,"--n-tab-text-color-disabled":j,"--n-tab-text-color-hover":A,"--n-pane-text-color":d,"--n-tab-border-color":u,"--n-tab-border-radius":p,"--n-close-size":y,"--n-close-icon-size":b,"--n-close-color-hover":x,"--n-close-color-pressed":S,"--n-close-border-radius":C,"--n-close-icon-color":a,"--n-close-icon-color-hover":s,"--n-close-icon-color-pressed":c,"--n-tab-color":l,"--n-tab-font-weight":f,"--n-tab-font-weight-active":m,"--n-tab-padding":T,"--n-tab-padding-vertical":E,"--n-tab-gap":ee,"--n-tab-gap-vertical":D,"--n-pane-padding-left":ae(w,`left`),"--n-pane-padding-right":ae(w,`right`),"--n-pane-padding-top":ae(w,`top`),"--n-pane-padding-bottom":ae(w,`bottom`),"--n-font-weight-strong":_,"--n-tab-color-segment":v}}),xe=i?he(`tabs`,H(()=>`${g.value[0]}${t.type[0]}`),be,t):void 0;return Object.assign({mergedClsPrefix:r,mergedValue:b,renderedNames:new Set,segmentCapsuleElRef:K,tabsPaneWrapperRef:N,tabsElRef:s,barElRef:c,addTabInstRef:u,xScrollInstRef:d,scrollWrapperElRef:l,addTabFixed:ue,tabWrapperStyle:T,handleNavResize:le,mergedSize:g,handleScroll:ge,handleTabsResize:fe,cssVars:i?void 0:be,themeClass:xe?.themeClass,animationDirection:ne,renderNameListRef:z,yScrollElRef:f,handleSegmentResize:ve,onAnimationBeforeLeave:I,onAnimationEnter:L,onAnimationAfterEnter:te,onRender:xe?.onRender},_e)},render(){let{mergedClsPrefix:e,type:t,placement:i,addTabFixed:a,addable:o,mergedSize:s,renderNameListRef:c,onRender:l,paneWrapperClass:u,paneWrapperStyle:d,$slots:{default:f,prefix:p,suffix:m}}=this;l?.();let h=f?ke(f()).filter(e=>e.type.__TAB_PANE__===!0):[],g=f?ke(f()).filter(e=>e.type.__TAB__===!0):[],v=!g.length,y=t===`card`,b=t===`segment`,x=!y&&!b&&this.justifyContent;c.value=[];let S=()=>{let t=n(`div`,{style:this.tabWrapperStyle,class:`${e}-tabs-wrapper`},x?null:n(`div`,{class:`${e}-tabs-scroll-padding`,style:i===`top`||i===`bottom`?{width:`${this.tabsPadding}px`}:{height:`${this.tabsPadding}px`}}),v?h.map((e,t)=>(c.value.push(e.props.name),Wt(n(It,Object.assign({},e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0&&(!x||x===`center`||x===`start`||x===`end`)}),e.children?{default:e.children.tab}:void 0)))):g.map((e,t)=>(c.value.push(e.props.name),Wt(t!==0&&!x?Ut(e):e))),!a&&o&&y?Ht(o,(v?h.length:g.length)!==0):null,x?null:n(`div`,{class:`${e}-tabs-scroll-padding`,style:{width:`${this.tabsPadding}px`}}));return n(`div`,{ref:`tabsElRef`,class:`${e}-tabs-nav-scroll-content`},y&&o?n(r,{onResize:this.handleTabsResize},{default:()=>t}):t,y?n(`div`,{class:`${e}-tabs-pad`}):null,y?null:n(`div`,{ref:`barElRef`,class:`${e}-tabs-bar`}))},C=b?`top`:i;return n(`div`,{class:[`${e}-tabs`,this.themeClass,`${e}-tabs--${t}-type`,`${e}-tabs--${s}-size`,x&&`${e}-tabs--flex`,`${e}-tabs--${C}`],style:this.cssVars},n(`div`,{class:[`${e}-tabs-nav--${t}-type`,`${e}-tabs-nav--${C}`,`${e}-tabs-nav`]},_(p,t=>t&&n(`div`,{class:`${e}-tabs-nav__prefix`},t)),b?n(r,{onResize:this.handleSegmentResize},{default:()=>n(`div`,{class:`${e}-tabs-rail`,ref:`tabsElRef`},n(`div`,{class:`${e}-tabs-capsule`,ref:`segmentCapsuleElRef`},n(`div`,{class:`${e}-tabs-wrapper`},n(`div`,{class:`${e}-tabs-tab`}))),v?h.map((e,t)=>(c.value.push(e.props.name),n(It,Object.assign({},e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0}),e.children?{default:e.children.tab}:void 0))):g.map((e,t)=>(c.value.push(e.props.name),t===0?e:Ut(e))))}):n(r,{onResize:this.handleNavResize},{default:()=>n(`div`,{class:`${e}-tabs-nav-scroll-wrapper`,ref:`scrollWrapperElRef`},[`top`,`bottom`].includes(C)?n(ot,{ref:`xScrollInstRef`,onScroll:this.handleScroll},{default:S}):n(`div`,{class:`${e}-tabs-nav-y-scroll`,onScroll:this.handleScroll,ref:`yScrollElRef`},S()))}),a&&o&&y?Ht(o,!0):null,_(m,t=>t&&n(`div`,{class:`${e}-tabs-nav__suffix`},t))),v&&(this.animated&&(C===`top`||C===`bottom`)?n(`div`,{ref:`tabsPaneWrapperRef`,style:d,class:[`${e}-tabs-pane-wrapper`,u]},Vt(h,this.mergedValue,this.renderedNames,this.onAnimationBeforeLeave,this.onAnimationEnter,this.onAnimationAfterEnter,this.animationDirection)):Vt(h,this.mergedValue,this.renderedNames)))}});function Vt(e,t,r,a,o,s,c){let l=[];return e.forEach(e=>{let{name:n,displayDirective:a,"display-directive":o}=e.props,s=e=>a===e||o===e,c=t===n;if(e.key!==void 0&&(e.key=n),c||s(`show`)||s(`show:lazy`)&&r.has(n)){r.has(n)||r.add(n);let t=!s(`if`);l.push(t?de(e,[[i,c]]):e)}}),c?n(ge,{name:`${c}-transition`,onBeforeLeave:a,onEnter:o,onAfterEnter:s},{default:()=>l}):l}function Ht(e,t){return n(It,{ref:`addTabInstRef`,key:`__addable`,name:`__addable`,internalCreatedByPane:!0,internalAddable:!0,internalLeftPadded:t,disabled:typeof e==`object`&&e.disabled})}function Ut(e){let n=t(e);return n.props?n.props.internalLeftPadded=!0:n.props={internalLeftPadded:!0},n}function Wt(e){return Array.isArray(e.dynamicProps)?e.dynamicProps.includes(`internalLeftPadded`)||e.dynamicProps.push(`internalLeftPadded`):e.dynamicProps=[`internalLeftPadded`],e}var Gt=I(`check`,[[`path`,{d:`M20 6 9 17l-5-5`,key:`1gmf2c`}]]),Kt=I(`circle-minus`,[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`path`,{d:`M8 12h8`,key:`1wcyev`}]]),qt=I(`circle`,[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}]]),Jt=I(`rotate-cw`,[[`path`,{d:`M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8`,key:`1p45f6`}],[`path`,{d:`M21 3v5h-5`,key:`1q7to0`}]]),Yt=I(`square`,[[`rect`,{width:`18`,height:`18`,x:`3`,y:`3`,rx:`2`,key:`afitv7`}]]),Xt={class:`lifecycle`},Zt={class:`bar`},Qt={key:1,class:`job`},$t={class:`job-head`},en={class:`steps`},tn={class:`ico`},nn={class:`tag`},rn={class:`svc`},an={key:0,class:`detail`},on={key:0,class:`note`},sn=q(x({__name:`AppLifecycle`,props:{name:{},containers:{}},emits:[`changed`],setup(e,{emit:t}){let n=e,r=t,{t:i}=oe(),s=R(null),c=R(``),l=R(!1),d=R(!1),h=e=>[`running`,`restarting`,`paused`].includes(e.state),_=H(()=>n.containers.some(h)),y=H(()=>n.containers.some(e=>!h(e))),x=H(()=>l.value||s.value?.phase===`running`),S=null;async function C(){try{let{job:e}=await Q.appJob(n.name),t=s.value?.phase===`running`;s.value=e,e?.phase===`running`?S=setTimeout(C,1200):t&&r(`changed`)}catch{S=setTimeout(C,2500)}}D(async()=>{try{s.value=(await Q.appJob(n.name)).job,s.value?.phase===`running`&&(S=setTimeout(C,1200))}catch{}}),f(()=>{S&&clearTimeout(S)});async function w(e){l.value=!0,c.value=``,d.value=!1;try{s.value=(await Q.appLifecycle(n.name,e)).job,S=setTimeout(C,800)}catch(e){c.value=e instanceof P?e.message:i(`docker.apps.lifecycle.failed`)}finally{l.value=!1}}let T=H(()=>{let e=s.value;return!e||d.value?!1:e.phase===`running`||!!e.finishedAt&&Date.now()-new Date(e.finishedAt).getTime()<6e5}),E={pending:qt,running:qt,ok:Gt,failed:$e,skipped:Kt},ee=e=>i(`docker.apps.lifecycle.step.${e}`);return(t,n)=>(b(),o(`div`,Xt,[m(`div`,Zt,[p(A(k),{size:`small`,quaternary:``,disabled:x.value||!y.value,onClick:n[0]||=e=>w(`start`)},{icon:J(()=>[p(A(B),{component:A(Ve)},null,8,[`component`])]),default:J(()=>[u(` `+N(A(i)(`docker.apps.lifecycle.start`)),1)]),_:1},8,[`disabled`]),p(A(Ke),{"positive-text":A(i)(`docker.apps.lifecycle.stop`),onPositiveClick:n[1]||=e=>w(`stop`)},{trigger:J(()=>[p(A(k),{size:`small`,quaternary:``,disabled:x.value||!_.value},{icon:J(()=>[p(A(B),{component:A(Yt)},null,8,[`component`])]),default:J(()=>[u(` `+N(A(i)(`docker.apps.lifecycle.stop`)),1)]),_:1},8,[`disabled`])]),default:J(()=>[u(` `+N(A(i)(`docker.apps.lifecycle.confirmStop`,{name:e.name})),1)]),_:1},8,[`positive-text`]),p(A(Ke),{"positive-text":A(i)(`docker.apps.lifecycle.restart`),onPositiveClick:n[2]||=e=>w(`restart`)},{trigger:J(()=>[p(A(k),{size:`small`,quaternary:``,disabled:x.value||!_.value},{icon:J(()=>[p(A(B),{component:A(Jt)},null,8,[`component`])]),default:J(()=>[u(` `+N(A(i)(`docker.apps.lifecycle.restart`)),1)]),_:1},8,[`disabled`])]),default:J(()=>[u(` `+N(A(i)(`docker.apps.lifecycle.confirmRestart`,{name:e.name})),1)]),_:1},8,[`positive-text`]),n[5]||=m(`span`,{class:`spacer`},null,-1),fe(t.$slots,`extra`,{},void 0,!0)]),c.value?(b(),g(A(X),{key:0,type:`error`,"show-icon":!1,class:`gap`,closable:``,onClose:n[3]||=e=>c.value=``},{default:J(()=>[u(N(c.value),1)]),_:1})):v(``,!0),T.value&&s.value?(b(),o(`div`,Qt,[m(`div`,$t,[s.value.phase===`running`?(b(),g(A(xe),{key:0,size:`small`})):v(``,!0),m(`strong`,null,N(s.value.phase===`running`?A(i)(`docker.apps.lifecycle.running`,{action:A(i)(`docker.apps.lifecycle.${s.value.action}`)}):A(i)(`docker.apps.lifecycle.result.${s.value.result}`,{action:A(i)(`docker.apps.lifecycle.${s.value.action}`)})),1),n[6]||=m(`span`,{class:`spacer`},null,-1),s.value.phase===`done`?(b(),g(A(k),{key:1,size:`tiny`,quaternary:``,onClick:n[4]||=e=>d.value=!0},{default:J(()=>[u(N(A(i)(`docker.apps.lifecycle.dismiss`)),1)]),_:1})):v(``,!0)]),m(`ul`,en,[(b(!0),o(a,null,te(s.value.steps,(e,t)=>(b(),o(`li`,{key:t,class:pe(`s-${e.state}`)},[m(`span`,tn,[e.state===`running`?(b(),g(A(xe),{key:0,size:12})):(b(),g(A(B),{key:1,component:E[e.state],size:`13`},null,8,[`component`]))]),m(`span`,nn,N(ee(e.action)),1),m(`span`,rn,N(e.service),1),e.detail?(b(),o(`span`,an,N(e.detail),1)):v(``,!0)],2))),128))]),s.value.phase===`done`&&s.value.result!==`ok`?(b(),o(`p`,on,N(A(i)(`docker.apps.lifecycle.partialNote`)),1)):v(``,!0)])):v(``,!0)]))}}),[[`__scopeId`,`data-v-022ed129`]]),cn={class:`apps`},ln={key:0,class:`text-muted`},un=[`id`],dn=[`onClick`],fn={class:`app-name`},pn={class:`app-meta`},mn={class:`app-meta mono`},hn={key:0,class:`app-body`},gn={class:`mono text-muted`},_n={class:`svc-list`},vn={class:`svc-name`},yn={class:`svc-status text-muted`},bn={class:`svc-res mono text-muted`},xn={class:`svc-btns`},Sn={key:1,class:`text-muted hint`},Cn=q(x({__name:`DockerProjectsPanel`,props:{containers:{},focus:{},shellEnabled:{type:Boolean}},emits:[`logs`,`env`,`uninstall`,`changed`,`shell`],setup(e,{emit:t}){let n=e,r=t,{t:i}=oe(),s=H(()=>tt(n.containers)),c=R({});function l(e){return c.value[e.name]??(e.verdict===`danger`||e.verdict===`warn`)}function d(e){c.value={...c.value,[e.name]:!l(e)}}V(()=>[n.focus,s.value.length],async([e,t])=>{!e||t===0||(c.value={...c.value,[e]:!0},await w(),document.getElementById(`app-${e}`)?.scrollIntoView({block:`center`,behavior:`smooth`}))},{immediate:!0});let f={ok:`success`,warn:`warning`,danger:`error`,stopped:`default`},h=e=>i({ok:`docker.apps.statusOk`,warn:`docker.apps.statusWarn`,danger:`docker.apps.statusDanger`,stopped:`docker.apps.statusStopped`}[e]);function _(e){return e.state===`restarting`?i(`docker.apps.restarting`):e.health===`unhealthy`?i(`docker.apps.unhealthy`):e.health===`starting`?i(`docker.apps.starting`):``}function y(e){return e.state===`running`?e.health===`unhealthy`?`danger`:e.health===`starting`?`warn`:`ok`:e.state===`restarting`?`danger`:e.state===`paused`?`warn`:`off`}return(t,n)=>{let c=ce(`RouterLink`);return b(),o(`div`,cn,[e.containers.length===0?(b(),o(`p`,ln,N(A(i)(`docker.apps.noContainers`)),1)):v(``,!0),(b(!0),o(a,null,te(s.value,t=>(b(),o(`div`,{key:t.name,id:`app-${t.name}`,class:pe([`app-card`,`v-${t.verdict}`])},[m(`button`,{type:`button`,class:`app-head`,onClick:e=>d(t)},[p(A(B),{component:l(t)?A(qe):A(Z),size:`16`},null,8,[`component`]),m(`span`,fn,N(t.name||A(i)(`docker.apps.other`)),1),p(A(Y),{size:`small`,type:f[t.verdict],bordered:!1},{default:J(()=>[u(N(h(t.verdict)),1)]),_:2},1032,[`type`]),m(`span`,pn,N(A(i)(`docker.apps.runningOf`,{running:t.running,total:t.containers.length})),1),m(`span`,mn,N(t.cpu.toFixed(1))+`% · `+N(A($)(t.mem)),1)],8,dn),l(t)?(b(),o(`div`,hn,[t.workingDir?(b(),g(c,{key:0,to:{path:`/files`,query:{path:t.workingDir}},class:`folder-link`},{default:J(()=>[p(A(B),{component:A(Se),size:`14`},null,8,[`component`]),u(` `+N(A(i)(`docker.apps.openFolder`))+` `,1),m(`span`,gn,N(t.workingDir),1)]),_:2},1032,[`to`])):v(``,!0),m(`ul`,_n,[(b(!0),o(a,null,te(t.containers,t=>(b(),o(`li`,{key:t.id},[m(`span`,{class:pe([`dot`,`d-${y(t)}`])},null,2),m(`span`,vn,N(t.service||t.name),1),_(t)?(b(),o(`span`,{key:0,class:pe([`svc-note`,{danger:t.health===`unhealthy`||t.state===`restarting`}])},N(_(t)),3)):v(``,!0),m(`span`,yn,N(t.status),1),m(`span`,bn,N(t.hasStats?`${t.stats.cpuPercent.toFixed(1)}% · ${A($)(t.stats.memUsageBytes)}`:`—`),1),m(`span`,xn,[e.shellEnabled&&t.state===`running`?(b(),g(A(k),{key:0,size:`tiny`,quaternary:``,onClick:e=>r(`shell`,t)},{default:J(()=>[u(N(A(i)(`docker.shell.button`)),1)]),_:1},8,[`onClick`])):v(``,!0),p(A(k),{size:`tiny`,quaternary:``,onClick:e=>r(`env`,t)},{default:J(()=>[u(N(A(i)(`docker.env.button`)),1)]),_:1},8,[`onClick`]),p(A(k),{size:`tiny`,quaternary:``,onClick:e=>r(`logs`,t)},{default:J(()=>[u(N(A(i)(`docker.logs.button`)),1)]),_:1},8,[`onClick`])])]))),128))]),t.name?(b(),g(sn,{key:1,name:t.name,containers:t.containers,onChanged:n[0]||=e=>r(`changed`)},{extra:J(()=>[p(A(k),{size:`small`,quaternary:``,type:`error`,onClick:e=>r(`uninstall`,t.name)},{icon:J(()=>[p(A(B),{component:A(Qe)},null,8,[`component`])]),default:J(()=>[u(` `+N(A(i)(`docker.apps.uninstall.button`)),1)]),_:1},8,[`onClick`])]),_:2},1032,[`name`,`containers`])):v(``,!0)])):v(``,!0)],10,un))),128)),e.containers.length>0?(b(),o(`p`,Sn,N(A(i)(`docker.apps.hint`)),1)):v(``,!0)])}}}),[[`__scopeId`,`data-v-4f0753d7`]]),wn={class:`text-muted note`},Tn={key:0,class:`center`},En={class:`controls`},Dn={style:{margin:`0 0 8px`}},On={class:`reveal-row`},kn={key:0,class:`reveal-error`},An={key:1,class:`text-muted`},jn={key:2,class:`text-muted`},Mn={key:3,class:`env-list`},Nn={class:`env-key`},Pn={key:1},Fn=q(x({__name:`ContainerEnvDrawer`,props:{show:{type:Boolean},container:{}},emits:[`update:show`],setup(e,{emit:t}){let n=e,r=t,{t:i}=oe(),s=He(),c=Xe(`env-filter`),l=Ze(`env-reveal-password`),d=R(!1),f=R(``),h=R([]),_=R(!0),y=R(``),x=R(null),S=R(!1),C=R(``),w=R(``),T=R(!1);function E(){h.value=[],f.value=``,y.value=``,x.value=null,S.value=!1,C.value=``,w.value=``}async function ee(){if(n.container){d.value=!0,f.value=``;try{h.value=(await Q.containerEnv(n.container.id)).vars}catch(e){f.value=e instanceof P?e.message:i(`docker.env.loadFailed`)}finally{d.value=!1}}}V(()=>[n.show,n.container?.id],([e])=>{E(),e&&ee()});let D=H(()=>h.value.filter(e=>e.imageDefault).length),O=H(()=>h.value.filter(e=>e.secret).length),j=H(()=>{let e=y.value.trim().toLowerCase();return h.value.filter(t=>_.value&&t.imageDefault&&!t.secret?!1:!e||t.key.toLowerCase().includes(e))});function M(e){return e.secret?x.value?.[e.key]:e.value}async function F(){if(!(!n.container||!C.value)){T.value=!0,w.value=``;try{x.value=(await Q.revealEnv(n.container.id,C.value)).values,S.value=!1,C.value=``}catch(e){w.value=e instanceof P&&e.status===403?i(`common.wrongPassword`):e instanceof P?e.message:i(`docker.env.loadFailed`)}finally{T.value=!1}}}async function I(e){try{await et(e),s.success(i(`docker.env.copied`))}catch{s.error(i(`docker.env.copyFailed`))}}return(t,n)=>(b(),g(A(Ue),{show:e.show,width:640,placement:`right`,"onUpdate:show":n[6]||=e=>r(`update:show`,e)},{default:J(()=>[p(A(We),{title:A(i)(`docker.env.title`,{name:e.container?.name??``}),closable:``},{default:J(()=>[m(`p`,wn,N(A(i)(`docker.env.readOnlyNote`)),1),d.value?(b(),o(`div`,Tn,[p(A(xe))])):f.value?(b(),g(A(X),{key:1,type:`error`,title:f.value},null,8,[`title`])):(b(),o(a,{key:2},[m(`div`,En,[p(A(Ie),{value:y.value,"onUpdate:value":n[0]||=e=>y.value=e,size:`small`,clearable:``,placeholder:A(i)(`docker.env.filter`),"input-props":A(c),style:{"max-width":`200px`}},null,8,[`value`,`placeholder`,`input-props`]),D.value>0?(b(),g(A(Re),{key:0,checked:_.value,"onUpdate:checked":n[1]||=e=>_.value=e,size:`small`},{default:J(()=>[u(N(A(i)(`docker.env.hideImageDefaults`,{count:D.value})),1)]),_:1},8,[`checked`])):v(``,!0),n[7]||=m(`span`,{class:`spacer`},null,-1),O.value>0&&!x.value&&!S.value?(b(),g(A(k),{key:1,size:`small`,onClick:n[2]||=e=>S.value=!0},{icon:J(()=>[p(A(B),{component:A(Ye)},null,8,[`component`])]),default:J(()=>[u(` `+N(A(i)(`docker.env.revealSecrets`,{count:O.value})),1)]),_:1})):v(``,!0),x.value?(b(),g(A(k),{key:2,size:`small`,quaternary:``,onClick:n[3]||=e=>x.value=null},{default:J(()=>[u(N(A(i)(`docker.env.hideAgain`)),1)]),_:1})):v(``,!0)]),S.value?(b(),g(A(X),{key:0,type:`warning`,"show-icon":!1,class:`reveal-box`},{default:J(()=>[m(`p`,Dn,N(A(i)(`docker.env.revealConfirm`)),1),m(`div`,On,[p(A(Ie),{value:C.value,"onUpdate:value":n[4]||=e=>C.value=e,type:`password`,"show-password-on":`click`,size:`small`,placeholder:A(i)(`common.dashboardPassword`),"input-props":A(l),onKeyup:me(F,[`enter`])},null,8,[`value`,`placeholder`,`input-props`]),p(A(k),{size:`small`,onClick:n[5]||=e=>{S.value=!1,C.value=``,w.value=``}},{default:J(()=>[u(N(A(i)(`common.cancel`)),1)]),_:1}),p(A(k),{size:`small`,type:`primary`,loading:T.value,disabled:!C.value,onClick:F},{default:J(()=>[u(N(A(i)(`docker.env.reveal`)),1)]),_:1},8,[`loading`,`disabled`])]),w.value?(b(),o(`p`,kn,N(w.value),1)):v(``,!0)]),_:1})):v(``,!0),h.value.length===0?(b(),o(`p`,An,N(A(i)(`docker.env.none`)),1)):j.value.length===0?(b(),o(`p`,jn,N(A(i)(`docker.env.noMatch`)),1)):(b(),o(`ul`,Mn,[(b(!0),o(a,null,te(j.value,e=>(b(),o(`li`,{key:e.key},[m(`span`,Nn,N(e.key),1),m(`span`,{class:pe([`env-val`,{masked:e.secret&&M(e)===void 0}])},[e.secret&&M(e)===void 0?(b(),o(a,{key:0},[p(A(B),{component:A(Ye),size:`12`},null,8,[`component`]),n[8]||=u(` •••••••• `,-1)],64)):(b(),o(a,{key:1},[u(N(M(e)),1)],64))],2),M(e)!==void 0&&M(e)!==``?(b(),g(A(k),{key:0,size:`tiny`,quaternary:``,title:A(i)(`docker.env.copy`),onClick:t=>I(M(e))},{default:J(()=>[p(A(B),{component:A(Je),size:`13`},null,8,[`component`])]),_:1},8,[`title`,`onClick`])):(b(),o(`span`,Pn))]))),128))]))],64))]),_:1},8,[`title`])]),_:1},8,[`show`]))}}),[[`__scopeId`,`data-v-ad269986`]]),In={key:0,class:`center`},Ln={class:`text-muted`},Rn={class:`text-muted`},zn={class:`fail-list`},Bn={class:`text-muted`},Vn={class:`block`},Hn={class:`label`},Un={class:`row`},Wn={class:`mono`},Gn={key:0,class:`row`},Kn={class:`mono`},qn={key:0,class:`block`},Jn={class:`danger-text`},Yn={key:0,class:`hint danger-text`},Xn={key:1,class:`hint text-muted`},Zn={key:1,class:`block`},Qn={class:`hint text-muted`},$n={class:`note text-muted`},er={class:`block`},tr={class:`block`},nr={class:`label`},rr={class:`mono`},ir={key:0,class:`mismatch`},ar={key:3,class:`hint text-muted`},or={class:`footer`},sr=q(x({__name:`AppUninstallModal`,props:{show:{type:Boolean},name:{}},emits:[`update:show`,`done`],setup(e,{emit:t}){let n=e,r=t,{t:i}=oe(),s=R(!1),c=R(null),l=R(``),d=R(!1),f=R(!1),h=R(``),_=R(``),y=R(!1),x=R(``),S=R(null);function C(){c.value=null,l.value=``,d.value=!1,f.value=!1,h.value=``,_.value=``,x.value=``,S.value=null}V(()=>[n.show,n.name],async([e,t])=>{if(C(),!(!e||!t)){s.value=!0;try{c.value=await Q.uninstallPlan(t)}catch(e){l.value=e instanceof P?e.message:i(`docker.apps.uninstall.loadFailed`)}finally{s.value=!1}}});let w=Xe(`confirm-app-name`),T=Ze(`confirm-password`),E=H(()=>h.value!==``&&h.value!==n.name),ee=H(()=>!!c.value&&h.value===n.name&&!!_.value&&!y.value),D=H(()=>(c.value?.volumes??[]).join(`, `)),O=H(()=>(S.value??[]).filter(e=>!e.ok)),j=H(()=>(S.value??[]).filter(e=>e.ok).length);async function M(){if(ee.value){y.value=!0,x.value=``;try{S.value=(await Q.uninstallProject(n.name,{password:_.value,confirmName:h.value,removeVolumes:d.value,removeImages:f.value})).steps,_.value=``,r(`done`)}catch(e){x.value=e instanceof P&&e.status===403?i(`common.wrongPassword`):e instanceof P?e.message:i(`docker.apps.uninstall.failed`)}finally{y.value=!1}}}function F(){y.value||r(`update:show`,!1)}return(t,n)=>(b(),g(A(Ae),{show:e.show,preset:`card`,title:S.value?A(i)(`docker.apps.uninstall.doneTitle`):A(i)(`docker.apps.uninstall.title`,{name:e.name}),style:{"max-width":`520px`},closable:!y.value,"mask-closable":!1,"close-on-esc":!y.value,"onUpdate:show":F},{footer:J(()=>[m(`div`,or,[S.value?(b(),g(A(k),{key:0,type:`primary`,onClick:F},{default:J(()=>[u(N(A(i)(`docker.apps.uninstall.close`)),1)]),_:1})):(b(),o(a,{key:1},[p(A(k),{disabled:y.value,onClick:F},{default:J(()=>[u(N(A(i)(`common.cancel`)),1)]),_:1},8,[`disabled`]),p(A(k),{type:`error`,loading:y.value,disabled:!ee.value,onClick:M},{default:J(()=>[u(N(A(i)(`docker.apps.uninstall.confirm`)),1)]),_:1},8,[`loading`,`disabled`])],64))])]),default:J(()=>[s.value?(b(),o(`div`,In,[p(A(xe)),n[4]||=u(),m(`span`,Ln,N(A(i)(`docker.apps.uninstall.loading`)),1)])):l.value?(b(),g(A(X),{key:1,type:`error`,title:l.value},null,8,[`title`])):S.value?(b(),o(a,{key:2},[O.value.length===0?(b(),g(A(X),{key:0,type:`success`,"show-icon":!1},{default:J(()=>[u(N(A(i)(`docker.apps.uninstall.doneOk`,{count:j.value})),1)]),_:1})):(b(),o(a,{key:1},[m(`p`,Rn,N(A(i)(`docker.apps.uninstall.doneOk`,{count:j.value})),1),p(A(X),{type:`warning`,title:A(i)(`docker.apps.uninstall.doneFailed`,{count:O.value.length})},{default:J(()=>[m(`ul`,zn,[(b(!0),o(a,null,te(O.value,e=>(b(),o(`li`,{key:e.kind+e.name},[m(`strong`,null,N(A(i)(`docker.apps.uninstall.kind.${e.kind}`))+` `+N(e.name),1),m(`span`,Bn,` — `+N(e.error),1)]))),128))])]),_:1},8,[`title`])],64))],64)):c.value?(b(),o(a,{key:3},[m(`div`,Vn,[m(`div`,Hn,N(A(i)(`docker.apps.uninstall.willRemove`)),1),m(`div`,Un,[u(N(A(i)(`docker.apps.uninstall.containers`,{count:c.value.containers.length}))+`: `,1),m(`span`,Wn,N(c.value.containers.map(e=>e.service||e.name).join(`, `)),1)]),c.value.networks.length?(b(),o(`div`,Gn,[u(N(A(i)(`docker.apps.uninstall.networks`,{count:c.value.networks.length}))+`: `,1),m(`span`,Kn,N(c.value.networks.join(`, `)),1)])):v(``,!0)]),c.value.volumes.length?(b(),o(`div`,qn,[p(A(Re),{checked:d.value,"onUpdate:checked":n[0]||=e=>d.value=e,disabled:y.value},{default:J(()=>[m(`span`,Jn,N(A(i)(`docker.apps.uninstall.removeVolumes`)),1)]),_:1},8,[`checked`,`disabled`]),d.value?(b(),o(`p`,Yn,N(A(i)(`docker.apps.uninstall.volumesWarn`,{names:D.value})),1)):(b(),o(`p`,Xn,N(A(i)(`docker.apps.uninstall.keepVolumes`,{names:D.value})),1))])):v(``,!0),c.value.images.length?(b(),o(`div`,Zn,[p(A(Re),{checked:f.value,"onUpdate:checked":n[1]||=e=>f.value=e,disabled:y.value},{default:J(()=>[u(N(A(i)(`docker.apps.uninstall.removeImages`,{count:c.value.images.length})),1)]),_:1},8,[`checked`,`disabled`]),m(`p`,Qn,N(A(i)(`docker.apps.uninstall.imagesHint`)),1)])):v(``,!0),m(`p`,$n,N(A(i)(`docker.apps.uninstall.keepNote`)),1),m(`div`,er,[p(A(Ie),{value:_.value,"onUpdate:value":n[2]||=e=>_.value=e,type:`password`,"show-password-on":`click`,size:`small`,disabled:y.value,placeholder:A(i)(`docker.apps.uninstall.password`),"input-props":A(T),onKeyup:me(M,[`enter`])},null,8,[`value`,`disabled`,`placeholder`,`input-props`])]),m(`div`,tr,[m(`div`,nr,[u(N(A(i)(`docker.apps.uninstall.typeName`))+`: `,1),m(`span`,rr,N(e.name),1)]),p(A(Ie),{value:h.value,"onUpdate:value":n[3]||=e=>h.value=e,size:`small`,disabled:y.value,placeholder:e.name,status:E.value?`error`:void 0,"input-props":A(w)},null,8,[`value`,`disabled`,`placeholder`,`status`,`input-props`]),E.value?(b(),o(`p`,ir,N(A(i)(`docker.apps.uninstall.nameMismatch`)),1)):v(``,!0)]),x.value?(b(),g(A(X),{key:2,type:`error`,title:x.value,class:`block`},null,8,[`title`])):v(``,!0),y.value?(b(),o(`p`,ar,N(A(i)(`docker.apps.uninstall.working`)),1)):v(``,!0)],64)):v(``,!0)]),_:1},8,[`show`,`title`,`closable`,`close-on-esc`]))}}),[[`__scopeId`,`data-v-b79970b9`]]),cr=ve(`containerShell`,{state:()=>({enabled:!1,idleTimeoutMin:15,maxSessions:2,loaded:!1}),actions:{async ensureLoaded(){if(!this.loaded)try{let e=await Q.shellStatus();this.enabled=e.enabled,this.idleTimeoutMin=e.idleTimeoutMin,this.maxSessions=e.maxSessions}catch{this.enabled=!1}finally{this.loaded=!0}}}}),lr={class:`bar`},ur={class:`mono image`},dr={class:`hint`},fr=q(x({__name:`ContainerShellDrawer`,props:{show:{type:Boolean},container:{}},emits:[`update:show`],setup(e,{emit:t}){let n=e,r=t,{t:i}=oe(),a=Oe(),o=cr(),s=R(`connecting`),c=R(``),l=R(null),d=R(null),h=null,_=null,y=null,x=null,S={background:`#0f1115`,foreground:`#e8eaed`,cursor:`#4da3ff`,selectionBackground:`#4da3ff55`},C={background:`#ffffff`,foreground:`#14161a`,cursor:`#2f6fbf`,selectionBackground:`#4da3ff55`};function w(){h&&y?.readyState===WebSocket.OPEN&&y.send(JSON.stringify({type:`resize`,cols:h.cols,rows:h.rows}))}function T(e,t){let n=`errors.${e}`;return le.global.te(n)?String(le.global.t(n,t??{})):e}function E(){x?.disconnect(),x=null,y?.close(),y=null,h?.dispose(),h=null,_=null}function ee(){if(E(),!n.container||!d.value)return;s.value=`connecting`,c.value=``,l.value=null,h=new rt({cursorBlink:!0,scrollback:2e3,fontFamily:`ui-monospace, "Cascadia Code", "SF Mono", Menlo, Consolas, monospace`,fontSize:13,theme:a.value?S:C}),_=new it,h.loadAddon(_),h.open(d.value),_.fit();let e=location.protocol===`https:`?`wss:`:`ws:`;y=new WebSocket(`${e}//${location.host}/api/docker/containers/${encodeURIComponent(n.container.id)}/shell/ws`),y.binaryType=`arraybuffer`,y.onmessage=e=>{if(e.data instanceof ArrayBuffer){h?.write(new Uint8Array(e.data));return}try{let t=JSON.parse(String(e.data));t.type===`ready`?(s.value=`connected`,w(),h?.focus()):t.type===`error`?(s.value=`error`,c.value=T(String(t.code),t.params)):t.type===`exit`&&(s.value=`exited`,l.value=Number(t.code))}catch{}},y.onclose=()=>{(s.value===`connecting`||s.value===`connected`)&&(s.value=`closed`)},y.onerror=()=>{s.value===`connecting`&&(s.value=`error`,c.value=i(`docker.shell.connectFailed`))},h.onData(e=>{y?.readyState===WebSocket.OPEN&&y.send(new TextEncoder().encode(e))}),h.onResize(()=>w()),x=new ResizeObserver(()=>_?.fit()),x.observe(d.value)}function D(){r(`update:show`,!1)}return f(E),(t,n)=>(b(),g(A(Ue),{show:e.show,width:920,placement:`right`,"trap-focus":!1,"onUpdate:show":n[0]||=e=>r(`update:show`,e),onAfterEnter:ee,onAfterLeave:E},{default:J(()=>[p(A(We),{title:A(i)(`docker.shell.title`,{name:e.container?.name??``}),closable:``,"native-scrollbar":!1,"body-content-style":`padding: 0; display: flex; flex-direction: column; height: 100%`},{default:J(()=>[m(`div`,lr,[s.value===`connecting`?(b(),g(A(Y),{key:0,size:`small`,bordered:!1},{default:J(()=>[u(N(A(i)(`docker.shell.connecting`)),1)]),_:1})):s.value===`connected`?(b(),g(A(Y),{key:1,size:`small`,type:`success`,bordered:!1},{default:J(()=>[u(N(A(i)(`docker.shell.connected`)),1)]),_:1})):s.value===`exited`?(b(),g(A(Y),{key:2,size:`small`,bordered:!1},{default:J(()=>[u(N(A(i)(`docker.shell.exited`,{code:l.value??0})),1)]),_:1})):s.value===`closed`?(b(),g(A(Y),{key:3,size:`small`,type:`warning`,bordered:!1},{default:J(()=>[u(N(A(i)(`docker.shell.closed`)),1)]),_:1})):(b(),g(A(Y),{key:4,size:`small`,type:`error`,bordered:!1},{default:J(()=>[u(N(A(i)(`docker.shell.failed`)),1)]),_:1})),m(`span`,ur,N(e.container?.image),1),n[1]||=m(`span`,{class:`spacer`},null,-1),s.value!==`connecting`&&s.value!==`connected`?(b(),g(A(k),{key:5,size:`tiny`,onClick:ee},{default:J(()=>[u(N(A(i)(`docker.shell.reconnect`)),1)]),_:1})):v(``,!0),p(A(k),{size:`tiny`,quaternary:``,onClick:D},{default:J(()=>[u(N(A(i)(`docker.shell.end`)),1)]),_:1})]),c.value?(b(),g(A(X),{key:0,type:`error`,"show-icon":!1,class:`msg`},{default:J(()=>[u(N(c.value),1)]),_:1})):v(``,!0),m(`p`,dr,N(A(i)(`docker.shell.hint`,{min:A(o).idleTimeoutMin})),1),m(`div`,{ref_key:`host`,ref:d,class:`term`},null,512)]),_:1},8,[`title`])]),_:1},8,[`show`]))}}),[[`__scopeId`,`data-v-aa17f759`]]),pr=5e3;function mr(){let e=R([]),t=R(!1),n;function r(r,a,o){i(),e.value=[];let s=`/api/docker/containers/${encodeURIComponent(r)}/logs/stream?sinceMin=${a}&tail=${o}`;n=new EventSource(s),n.onopen=()=>{t.value=!0},n.onerror=()=>{t.value=!1},n.onmessage=t=>{try{let n=JSON.parse(t.data);e.value.push(n),e.value.length>pr&&e.value.splice(0,e.value.length-pr)}catch{}}}function i(){n?.close(),n=void 0,t.value=!1}return{lines:e,connected:t,open:r,close:i}}var hr={key:1,class:`tab-loading`},gr={key:0,class:`log-empty`},_r={key:0,class:`log-empty`},vr={key:0,class:`log-ts`},yr={class:`log-text`},br=500,xr=q(x({__name:`DockerView`,setup(e){let{t}=oe(),r=He();function i(e){return e instanceof P&&e.status===503&&!!e.body&&typeof e.body==`object`&&`enabled`in e.body}function s(e,t){r.error(e instanceof P?e.message:t)}let c=e=>e===`running`?`success`:e===`paused`||e===`restarting`?`warning`:e===`dead`?`error`:`default`,l={running:0,restarting:1,paused:2,created:3,exited:4,dead:5};function d(e){return l[e.state]??6}function f(e,t){return e.hasStats?t(e.stats):-1}let h=R([]),_=R(!0),y=R(null),x;async function S(){try{let e=await Q.containers();h.value=e.containers??[],y.value=null}catch(e){i(e)&&(y.value=e.body)}finally{_.value=!1}}async function C(e,n){try{let t=await Q.containerAction(e,n);h.value=t.containers}catch(e){s(e,t(`docker.actionFailed`,{action:n}))}}let T=R(!1),E=R(``),O=R(``),j=R(15),M=[{label:t(`docker.logs.last5m`),value:5},{label:t(`docker.logs.last10m`),value:10},{label:t(`docker.logs.last15m`),value:15},{label:t(`docker.logs.last1h`),value:60},{label:t(`docker.logs.last6h`),value:360},{label:t(`docker.logs.last24h`),value:1440}],F=cr(),I=R(!1),L=R(null);function z(e){L.value=e,I.value=!0}let ne=R(!1),B=R(``);function re(e){B.value=e,ne.value=!0}let ae=R(!1),U=R(null);function W(e){U.value=e,ae.value=!0}let G=mr(),K=R(null),se=R(!0),ce=R(!1),q;function le(e,t){ce.value=!1,q&&clearTimeout(q),q=setTimeout(()=>{G.connected.value||(ce.value=!0)},6e3),G.open(e,t,br)}function ue(){se.value=!0,le(E.value,j.value)}function de(e){E.value=e.id,O.value=e.name,T.value=!0,se.value=!0,le(e.id,j.value)}V(j,e=>{T.value&&(se.value=!0,le(E.value,e))}),V(T,e=>{e||(G.close(),q&&clearTimeout(q))}),V(G.connected,e=>{e&&(ce.value=!1,q&&clearTimeout(q))}),V(()=>G.lines.value.length,async()=>{if(!se.value)return;await w();let e=K.value;e&&(e.scrollTop=e.scrollHeight)});function fe(){let e=K.value;if(!e)return;let t=e.scrollHeight-e.scrollTop-e.clientHeight<24;se.value=t}function me(e){if(!e)return``;let t=new Date(e);return Number.isNaN(t.getTime())?``:t.toLocaleTimeString()}let he=/\b(error|fatal|panic|exception|critical)\b/i,ge=/\bwarn(?:ing)?\b/i;function _e(e){return e.stream===`stderr`||he.test(e.text)?`log-line--error`:ge.test(e.text)?`log-line--warn`:``}let ve=H(()=>[{title:t(`common.name`),key:`name`,width:160,ellipsis:{tooltip:!0},sorter:(e,t)=>e.name.localeCompare(t.name)},{title:`Image`,key:`image`,width:180,ellipsis:{tooltip:!0},sorter:(e,t)=>e.image.localeCompare(t.image)},{title:`Status`,key:`state`,width:130,sorter:(e,t)=>d(e)-d(t),render:e=>n(Y,{type:c(e.state),size:`small`},{default:()=>e.status})},{title:`CPU`,key:`cpu`,width:70,sorter:(e,t)=>f(e,e=>e.cpuPercent)-f(t,e=>e.cpuPercent),render:e=>e.hasStats?`${e.stats.cpuPercent.toFixed(1)}%`:`—`},{title:`RAM`,key:`ram`,width:150,sorter:(e,t)=>f(e,e=>e.memUsageBytes)-f(t,e=>e.memUsageBytes),render:e=>e.hasStats?`${$(e.stats.memUsageBytes)} / ${$(e.stats.memLimitBytes)}`:`—`},{title:`Network`,key:`net`,width:140,sorter:(e,t)=>f(e,e=>e.netRxBytes+e.netTxBytes)-f(t,e=>e.netRxBytes+e.netTxBytes),render:e=>e.hasStats?`↓ ${$(e.stats.netRxBytes)} ↑ ${$(e.stats.netTxBytes)}`:`—`},{title:`Ports`,key:`ports`,width:220,ellipsis:{tooltip:!0}},{title:t(`common.actions`),key:`actions`,width:330,render:e=>n(Ge,{size:`small`},()=>[e.state===`running`?[n(k,{size:`tiny`,onClick:()=>C(e.id,`stop`)},()=>`Stop`),n(k,{size:`tiny`,onClick:()=>C(e.id,`restart`)},()=>`Restart`)]:n(k,{size:`tiny`,type:`primary`,onClick:()=>C(e.id,`start`)},()=>`Start`),n(k,{size:`tiny`,quaternary:!0,onClick:()=>de(e)},()=>t(`docker.logs.button`)),F.enabled&&e.state===`running`?n(k,{size:`tiny`,quaternary:!0,onClick:()=>z(e)},()=>t(`docker.shell.button`)):null,n(Ke,{onPositiveClick:()=>C(e.id,`remove`)},{trigger:()=>n(k,{size:`tiny`,type:`error`,ghost:!0},()=>t(`common.delete`)),default:()=>t(`docker.confirmDeleteContainer`,{name:e.name})})])}]),ye=R([]),be=R(!0),Se=R(null);async function we(){be.value=!0;try{let e=await Q.images();ye.value=e.images,Se.value=null}catch(e){i(e)&&(Se.value=e.body)}finally{be.value=!1}}async function Te(e){try{let t=await Q.removeImage(e);ye.value=t.images}catch(e){s(e,t(`docker.removeImageFailed`))}}let Oe=H(()=>[{title:`Tag`,key:`tag`,minWidth:200,ellipsis:{tooltip:!0},sorter:(e,t)=>e.tag.localeCompare(t.tag),render:e=>e.dangling?n(Ge,{size:`small`,align:`center`},()=>[e.tag,n(Y,{size:`small`,type:`warning`},()=>`dangling`)]):e.tag},{title:t(`common.size`),key:`sizeBytes`,width:110,sorter:(e,t)=>e.sizeBytes-t.sizeBytes,render:e=>$(e.sizeBytes)},{title:t(`docker.usedColumn`),key:`containers`,width:140,sorter:(e,t)=>e.containers-t.containers,render:e=>e.containers<0?`—`:e.containers===0?t(`docker.notUsed`):t(`docker.containerCount`,{count:e.containers})},{title:t(`docker.created`),key:`created`,width:150,sorter:(e,t)=>Date.parse(e.created)-Date.parse(t.created),render:e=>nt(e.created)},{title:t(`common.actions`),key:`actions`,width:100,render:e=>n(Ke,{onPositiveClick:()=>Te(e.id)},{trigger:()=>n(k,{size:`tiny`,type:`error`,ghost:!0},()=>t(`common.delete`)),default:()=>t(`docker.confirmDeleteImage`,{tag:e.tag})})}]),ke=R([]),Ae=R(!0),je=R(null);async function Ne(){Ae.value=!0;try{let e=await Q.volumes();ke.value=e.volumes,je.value=null}catch(e){i(e)&&(je.value=e.body)}finally{Ae.value=!1}}async function Pe(e){try{let t=await Q.removeVolume(e);ke.value=t.volumes}catch(e){s(e,t(`docker.removeVolumeFailed`))}}let Fe=H(()=>[{title:t(`common.name`),key:`name`,minWidth:180,ellipsis:{tooltip:!0},sorter:(e,t)=>e.name.localeCompare(t.name)},{title:`Driver`,key:`driver`,width:100,sorter:(e,t)=>e.driver.localeCompare(t.driver)},{title:t(`common.size`),key:`sizeBytes`,width:110,sorter:(e,t)=>e.sizeBytes-t.sizeBytes,render:e=>e.sizeBytes<0?t(`docker.unknown`):$(e.sizeBytes)},{title:`Status`,key:`inUse`,width:120,sorter:(e,t)=>Number(e.inUse)-Number(t.inUse),render:e=>n(Y,{size:`small`,type:e.inUse?`success`:`default`},()=>e.inUse?t(`docker.used`):t(`docker.notUsed`))},{title:t(`common.actions`),key:`actions`,width:100,render:e=>n(Ke,{onPositiveClick:()=>Pe(e.name)},{trigger:()=>n(k,{size:`tiny`,type:`error`,ghost:!0},()=>t(`common.delete`)),default:()=>t(`docker.confirmDeleteVolume`,{name:e.name})})}]),Ie=R([]),Le=R(!0),Re=R(null);async function ze(){Le.value=!0;try{let e=await Q.networks();Ie.value=e.networks,Re.value=null}catch(e){i(e)&&(Re.value=e.body)}finally{Le.value=!1}}async function Be(e){try{let t=await Q.removeNetwork(e);Ie.value=t.networks}catch(e){s(e,t(`docker.removeNetworkFailed`))}}let Ve=H(()=>[{title:t(`common.name`),key:`name`,minWidth:160,ellipsis:{tooltip:!0},sorter:(e,t)=>e.name.localeCompare(t.name),render:e=>e.builtin?n(Ge,{size:`small`,align:`center`},()=>[e.name,n(Y,{size:`small`},()=>`builtin`)]):e.name},{title:`Driver`,key:`driver`,width:100,sorter:(e,t)=>e.driver.localeCompare(t.driver)},{title:`Subnet`,key:`subnet`,width:150,sorter:(e,t)=>e.subnet.localeCompare(t.subnet),render:e=>e.subnet||`—`},{title:t(`docker.connectedContainers`),key:`connectedCount`,width:170,sorter:(e,t)=>e.connectedCount-t.connectedCount},{title:t(`common.actions`),key:`actions`,width:100,render:e=>e.builtin?null:n(Ke,{onPositiveClick:()=>Be(e.id)},{trigger:()=>n(k,{size:`tiny`,type:`error`,ghost:!0},()=>t(`common.delete`)),default:()=>t(`docker.confirmDeleteNetwork`,{name:e.name})})}]),Z=R(null),qe=R(!0),Je=R(null),Ye=R(null);async function Xe(){qe.value=!0;try{Z.value=await Q.settings(),Je.value=null}catch(e){i(e)&&(Je.value=e.body)}finally{qe.value=!1}}async function Ze(e){Ye.value=e;try{Z.value=await Q.prune(e),r.success(t(`docker.cleanupDone`))}catch(n){s(n,t(`docker.cleanupFailed`,{kind:e}))}finally{Ye.value=null}}let Qe=ie(),$e=typeof Qe.query.app==`string`?Qe.query.app:void 0,et=R(Qe.query.tab===`apps`?`apps`:`containers`),tt=new Set([`containers`]);return V(et,e=>{tt.has(e)||(tt.add(e),e===`images`?we():e===`volumes`?Ne():e===`networks`?ze():e===`settings`&&Xe())}),D(()=>{F.ensureLoaded(),S(),x=setInterval(S,5e3)}),ee(()=>{x&&clearInterval(x),q&&clearTimeout(q),G.close()}),(e,n)=>(b(),g(Ce,null,{default:J(()=>[p(A(Bt),{type:`line`,value:et.value,"onUpdate:value":n[0]||=e=>et.value=e},{default:J(()=>[p(A(Pt),{name:`containers`,tab:`Containers`},{default:J(()=>[y.value?(b(),g(A(X),{key:0,type:`warning`,title:y.value.error},null,8,[`title`])):(b(),g(A(Me),{key:1,columns:ve.value,data:h.value,loading:_.value,"row-key":e=>e.id,"scroll-x":1200},null,8,[`columns`,`data`,`loading`,`row-key`]))]),_:1}),p(A(Pt),{name:`apps`,tab:A(t)(`docker.apps.tab`)},{default:J(()=>[y.value?(b(),g(A(X),{key:0,type:`warning`,title:y.value.error},null,8,[`title`])):(b(),g(Cn,{key:1,containers:h.value,focus:A($e),onLogs:de,onEnv:W,onShell:z,"shell-enabled":A(F).enabled,onUninstall:re,onChanged:S},null,8,[`containers`,`focus`,`shell-enabled`]))]),_:1},8,[`tab`]),p(A(Pt),{name:`images`,tab:`Images`},{default:J(()=>[Se.value?(b(),g(A(X),{key:0,type:`warning`,title:Se.value.error},null,8,[`title`])):(b(),g(A(Me),{key:1,columns:Oe.value,data:ye.value,loading:be.value,"row-key":e=>e.id,"scroll-x":700},null,8,[`columns`,`data`,`loading`,`row-key`]))]),_:1}),p(A(Pt),{name:`volumes`,tab:`Volumes`},{default:J(()=>[je.value?(b(),g(A(X),{key:0,type:`warning`,title:je.value.error},null,8,[`title`])):(b(),g(A(Me),{key:1,columns:Fe.value,data:ke.value,loading:Ae.value,"row-key":e=>e.name,"scroll-x":610},null,8,[`columns`,`data`,`loading`,`row-key`]))]),_:1}),p(A(Pt),{name:`networks`,tab:`Networks`},{default:J(()=>[Re.value?(b(),g(A(X),{key:0,type:`warning`,title:Re.value.error},null,8,[`title`])):(b(),g(A(Me),{key:1,columns:Ve.value,data:Ie.value,loading:Le.value,"row-key":e=>e.id,"scroll-x":680},null,8,[`columns`,`data`,`loading`,`row-key`]))]),_:1}),p(A(Pt),{name:`settings`,tab:`Settings`},{default:J(()=>[Je.value?(b(),g(A(X),{key:0,type:`warning`,title:Je.value.error},null,8,[`title`])):qe.value&&!Z.value?(b(),o(`div`,hr,[p(A(xe),{size:`large`})])):Z.value?(b(),g(A(Ge),{key:3,vertical:``,size:24},{default:J(()=>[p(A(kt),{title:A(t)(`docker.daemonInfo`),column:2,bordered:``,"label-placement":`left`},{default:J(()=>[p(A(jt),{label:A(t)(`docker.serverVersion`)},{default:J(()=>[u(N(Z.value?.info.serverVersion),1)]),_:1},8,[`label`]),p(A(jt),{label:`OS / Kernel`},{default:J(()=>[u(N(Z.value?.info.operatingSystem)+` / `+N(Z.value?.info.kernelVersion),1)]),_:1}),p(A(jt),{label:`Storage Driver`},{default:J(()=>[u(N(Z.value?.info.storageDriver),1)]),_:1}),p(A(jt),{label:`Root Dir`},{default:J(()=>[u(N(Z.value?.info.dockerRootDir),1)]),_:1}),p(A(jt),{label:`Container`},{default:J(()=>[u(N(Z.value?.info.containersRunning)+` running, `+N(Z.value?.info.containersPaused)+` paused, `+N(Z.value?.info.containersStopped)+` stopped `,1)]),_:1}),p(A(jt),{label:`Images`},{default:J(()=>[u(N(Z.value?.info.images),1)]),_:1})]),_:1},8,[`title`]),p(A(kt),{title:`Disk Usage`,column:2,bordered:``,"label-placement":`left`},{default:J(()=>[p(A(jt),{label:`Images`},{default:J(()=>[u(N(A($)(Z.value?.diskUsage.imagesTotalBytes??0))+` (reclaimable `+N(A($)(Z.value?.diskUsage.imagesReclaimableBytes??0))+`) `,1)]),_:1}),p(A(jt),{label:`Containers`},{default:J(()=>[u(N(A($)(Z.value?.diskUsage.containersTotalBytes??0)),1)]),_:1}),p(A(jt),{label:`Volumes`},{default:J(()=>[u(N(A($)(Z.value?.diskUsage.volumesTotalBytes??0))+` (reclaimable `+N(A($)(Z.value?.diskUsage.volumesReclaimableBytes??0))+`) `,1)]),_:1})]),_:1}),p(A(Ge),null,{default:J(()=>[(b(),o(a,null,te([`containers`,`images`,`volumes`,`networks`,`all`],e=>p(A(Ke),{key:e,onPositiveClick:t=>Ze(e)},{trigger:J(()=>[p(A(k),{size:`small`,loading:Ye.value===e},{default:J(()=>[u(N(A(t)(`docker.cleanup`))+` `+N(e),1)]),_:2},1032,[`loading`])]),default:J(()=>[u(` `+N(A(t)(`docker.confirmCleanup`,{kind:e})),1)]),_:2},1032,[`onPositiveClick`])),64))]),_:1})]),_:1})):(b(),g(A(Ee),{key:2,description:A(t)(`docker.noData`)},null,8,[`description`]))]),_:1})]),_:1},8,[`value`]),p(Fn,{show:ae.value,"onUpdate:show":n[1]||=e=>ae.value=e,container:U.value},null,8,[`show`,`container`]),p(fr,{show:I.value,"onUpdate:show":n[2]||=e=>I.value=e,container:L.value},null,8,[`show`,`container`]),p(sr,{show:ne.value,"onUpdate:show":n[3]||=e=>ne.value=e,name:B.value,onDone:S},null,8,[`show`,`name`]),p(A(Ue),{show:T.value,"onUpdate:show":n[5]||=e=>T.value=e,width:640,placement:`right`},{default:J(()=>[p(A(We),{title:A(t)(`docker.logs.title`,{name:O.value}),closable:``},{default:J(()=>[p(A(De),{value:j.value,"onUpdate:value":n[4]||=e=>j.value=e,options:M,size:`small`,style:{width:`150px`,"margin-bottom":`10px`}},null,8,[`value`]),A(G).lines.value.length===0&&!A(G).connected.value?(b(),o(`div`,gr,[m(`p`,null,N(ce.value?A(t)(`docker.logs.connectingSlow`):A(t)(`docker.logs.connecting`)),1),ce.value?(b(),g(A(k),{key:0,size:`tiny`,onClick:ue},{default:J(()=>[u(N(A(t)(`docker.logs.reconnect`)),1)]),_:1})):v(``,!0)])):v(``,!0),m(`div`,{ref_key:`logScrollEl`,ref:K,class:`log-scroll`,onScroll:fe},[A(G).lines.value.length===0&&A(G).connected.value?(b(),o(`p`,_r,N(A(t)(`docker.logs.waiting`)),1)):v(``,!0),(b(!0),o(a,null,te(A(G).lines.value,(e,t)=>(b(),o(`div`,{key:t,class:pe([`log-line`,_e(e)])},[e.timestamp?(b(),o(`span`,vr,N(me(e.timestamp)),1)):v(``,!0),m(`span`,yr,N(e.text),1)],2))),128))],544)]),_:1},8,[`title`])]),_:1},8,[`show`])]),_:1}))}}),[[`__scopeId`,`data-v-ce472e64`]]);export{xr as default};