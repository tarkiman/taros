import{$n as e,An as t,Bn as n,Bt as r,Cn as i,Dn as a,Fn as o,Gt as s,Hn as c,Ht as l,In as u,It as d,Ln as f,Mn as p,N as m,Nn as h,Nt as g,Pn as _,Pt as v,Qn as y,Rn as b,Tt as x,U as S,Un as C,V as w,Vn as T,Xn as E,Yn as ee,Zt as D,_ as O,_r as k,_t as A,ar as j,br as M,c as N,cn as P,dn as F,dr as I,er as te,fn as L,gn as R,hn as z,in as B,ir as V,jn as H,ln as U,m as ne,mn as W,mr as G,mt as re,nn as ie,o as ae,or as K,pn as oe,sr as q,vr as se,wt as ce,xn as le,xt as ue}from"./auth-CSzQPoSN.js";import{T as de,_ as fe,f as J,t as pe,v as me,w as he}from"./AppShell-CNf0KbfX.js";import{i as ge,r as _e,t as ve}from"./DataTable-BgG8F20G.js";import{u as Y}from"./useTheme-DBG_Zh5D.js";import{c as ye,n as be}from"./LocaleSwitcher-CW3CfLlT.js";import{n as xe,t as Se}from"./render-B2Wnxc5G.js";import{t as Ce}from"./get-slot-6kXJmSMP.js";import{t as we}from"./Add-Dn3G8Pe_.js";import{t as Te}from"./Tag-D0N7Lwit.js";import{n as Ee,r as De}from"./light-DAVmjBn6.js";import{t as Oe}from"./use-message-BvHJHGh2.js";import{n as ke,t as Ae}from"./DrawerContent-3YsKxubz.js";import{t as je}from"./Space-ZGLPznzA.js";import{t as Me}from"./Popconfirm-81Rs5Gvq.js";import{t as X}from"./docker-BbW9hLcY.js";import{n as Ne,t as Z}from"./format-BxLcbkc3.js";var Pe=fe(`.v-x-scroll`,{overflow:`auto`,scrollbarWidth:`none`},[fe(`&::-webkit-scrollbar`,{width:0,height:0})]),Fe=b({name:`XScroll`,props:{disabled:Boolean,onScroll:Function},setup(){let e=I(null);function t(e){!(e.currentTarget.offsetWidth<e.currentTarget.scrollWidth)||e.deltaY===0||(e.currentTarget.scrollLeft+=e.deltaY+e.deltaX,e.preventDefault())}let n=l();return Pe.mount({id:`vueuc/x-scroll`,head:!0,anchorMetaName:me,ssr:n}),Object.assign({selfRef:e,handleWheel:t},{scrollTo(...t){var n;(n=e.value)==null||n.scrollTo(...t)}})},render(){return n(`div`,{ref:`selfRef`,onScroll:this.onScroll,onWheel:this.disabled?void 0:this.handleWheel,class:`v-x-scroll`},this.$slots)}});function Ie(e,t=`default`,n=[]){let{children:r}=e;if(typeof r==`object`&&r&&!Array.isArray(r)){let e=r[t];if(typeof e==`function`)return e()}return n}var Le=/\s/;function Q(e){for(var t=e.length;t--&&Le.test(e.charAt(t)););return t}var Re=/^\s+/;function ze(e){return e&&e.slice(0,Q(e)+1).replace(Re,``)}var Be=NaN,Ve=/^[-+]0x[0-9a-f]+$/i,He=/^0b[01]+$/i,Ue=/^0o[0-7]+$/i,We=parseInt;function Ge(e){if(typeof e==`number`)return e;if(A(e))return Be;if(re(e)){var t=typeof e.valueOf==`function`?e.valueOf():e;e=re(t)?t+``:t}if(typeof e!=`string`)return e===0?e:+e;e=ze(e);var n=He.test(e);return n||Ue.test(e)?We(e.slice(2),n?2:8):Ve.test(e)?Be:+e}var Ke=function(){return ue.Date.now()},qe=`Expected a function`,Je=Math.max,Ye=Math.min;function Xe(e,t,n){var r,i,a,o,s,c,l=0,u=!1,d=!1,f=!0;if(typeof e!=`function`)throw TypeError(qe);t=Ge(t)||0,re(n)&&(u=!!n.leading,d=`maxWait`in n,a=d?Je(Ge(n.maxWait)||0,t):a,f=`trailing`in n?!!n.trailing:f);function p(t){var n=r,a=i;return r=i=void 0,l=t,o=e.apply(a,n),o}function m(e){return l=e,s=setTimeout(_,t),u?p(e):o}function h(e){var n=e-c,r=e-l,i=t-n;return d?Ye(i,a-r):i}function g(e){var n=e-c,r=e-l;return c===void 0||n>=t||n<0||d&&r>=a}function _(){var e=Ke();if(g(e))return v(e);s=setTimeout(_,h(e))}function v(e){return s=void 0,f&&r?p(e):(r=i=void 0,o)}function y(){s!==void 0&&clearTimeout(s),l=0,r=c=i=s=void 0}function b(){return s===void 0?o:v(Ke())}function x(){var e=Ke(),n=g(e);if(r=arguments,i=this,c=e,n){if(s===void 0)return m(c);if(d)return clearTimeout(s),s=setTimeout(_,t),p(c)}return s===void 0&&(s=setTimeout(_,t)),o}return x.cancel=y,x.flush=b,x}var Ze=`Expected a function`;function Qe(e,t,n){var r=!0,i=!0;if(typeof e!=`function`)throw TypeError(Ze);return re(n)&&(r=`leading`in n?!!n.leading:r,i=`trailing`in n?!!n.trailing:i),Xe(e,t,{leading:r,maxWait:t,trailing:i})}var $e=P([U(`descriptions`,{fontSize:`var(--n-font-size)`},[U(`descriptions-separator`,`
 display: inline-block;
 margin: 0 8px 0 2px;
 `),U(`descriptions-table-wrapper`,[U(`descriptions-table`,[U(`descriptions-table-row`,[U(`descriptions-table-header`,{padding:`var(--n-th-padding)`}),U(`descriptions-table-content`,{padding:`var(--n-td-padding)`})])])]),oe(`bordered`,[U(`descriptions-table-wrapper`,[U(`descriptions-table`,[U(`descriptions-table-row`,[P(`&:last-child`,[U(`descriptions-table-content`,{paddingBottom:0})])])])])]),L(`left-label-placement`,[U(`descriptions-table-content`,[P(`> *`,{verticalAlign:`top`})])]),L(`left-label-align`,[P(`th`,{textAlign:`left`})]),L(`center-label-align`,[P(`th`,{textAlign:`center`})]),L(`right-label-align`,[P(`th`,{textAlign:`right`})]),L(`bordered`,[U(`descriptions-table-wrapper`,`
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
 `,[F(`content`,`
 transition: color .3s var(--n-bezier);
 display: inline-block;
 color: var(--n-td-text-color);
 `)]),F(`label`,`
 font-weight: var(--n-th-font-weight);
 transition: color .3s var(--n-bezier);
 display: inline-block;
 margin-right: 14px;
 color: var(--n-th-text-color);
 `)])])])]),U(`descriptions-table-wrapper`,`
 --n-merged-th-color: var(--n-th-color);
 --n-merged-td-color: var(--n-td-color);
 --n-merged-border-color: var(--n-border-color);
 `),z(U(`descriptions-table-wrapper`,`
 --n-merged-th-color: var(--n-th-color-modal);
 --n-merged-td-color: var(--n-td-color-modal);
 --n-merged-border-color: var(--n-border-color-modal);
 `)),R(U(`descriptions-table-wrapper`,`
 --n-merged-th-color: var(--n-th-color-popover);
 --n-merged-td-color: var(--n-td-color-popover);
 --n-merged-border-color: var(--n-border-color-popover);
 `))]),et=`DESCRIPTION_ITEM_FLAG`;function tt(e){return typeof e==`object`&&e&&!Array.isArray(e)?e.type&&e.type.DESCRIPTION_ITEM_FLAG:!1}var nt=Object.assign(Object.assign({},S.props),{title:String,column:{type:Number,default:3},columns:Number,labelPlacement:{type:String,default:`top`},labelAlign:{type:String,default:`left`},separator:{type:String,default:`:`},size:String,bordered:Boolean,labelClass:String,labelStyle:[Object,String],contentClass:String,contentStyle:[Object,String]}),rt=b({name:`Descriptions`,props:nt,slots:Object,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n,mergedComponentPropsRef:r}=x(e),i=H(()=>e.size||r?.value?.Descriptions?.size||`medium`),a=S(`Descriptions`,`-descriptions`,$e,De,e,t),o=H(()=>{let{bordered:t}=e,n=i.value,{common:{cubicBezierEaseInOut:r},self:{titleTextColor:o,thColor:s,thColorModal:c,thColorPopover:l,thTextColor:u,thFontWeight:d,tdTextColor:f,tdColor:p,tdColorModal:m,tdColorPopover:h,borderColor:g,borderColorModal:_,borderColorPopover:v,borderRadius:y,lineHeight:b,[W(`fontSize`,n)]:x,[W(t?`thPaddingBordered`:`thPadding`,n)]:S,[W(t?`tdPaddingBordered`:`tdPadding`,n)]:C}}=a.value;return{"--n-title-text-color":o,"--n-th-padding":S,"--n-td-padding":C,"--n-font-size":x,"--n-bezier":r,"--n-th-font-weight":d,"--n-line-height":b,"--n-th-text-color":u,"--n-td-text-color":f,"--n-th-color":s,"--n-th-color-modal":c,"--n-th-color-popover":l,"--n-td-color":p,"--n-td-color-modal":m,"--n-td-color-popover":h,"--n-border-radius":y,"--n-border-color":g,"--n-border-color-modal":_,"--n-border-color-popover":v}}),s=n?ce(`descriptions`,H(()=>{let t=``,{bordered:n}=e;return n&&(t+=`a`),t+=i.value[0],t}),o,e):void 0;return{mergedClsPrefix:t,cssVars:n?void 0:o,themeClass:s?.themeClass,onRender:s?.onRender,compitableColumn:he(e,[`columns`,`column`]),inlineThemeDisabled:n,mergedSize:i}},render(){let e=this.$slots.default,t=e?Y(e()):[];t.length;let{contentClass:r,labelClass:i,compitableColumn:a,labelPlacement:o,labelAlign:s,mergedSize:c,bordered:l,title:u,cssVars:d,mergedClsPrefix:f,separator:p,onRender:m}=this;m?.();let h=t.filter(e=>tt(e)),g=h.reduce((e,t,s)=>{let c=t.props||{},u=h.length-1===s,d=[`label`in c?c.label:Ie(t,`label`)],m=[Ie(t)],g=c.span||1,_=e.span;e.span+=g;let v=c.labelStyle||c[`label-style`]||this.labelStyle,y=c.contentStyle||c[`content-style`]||this.contentStyle;if(o===`left`)l?e.row.push(n(`th`,{class:[`${f}-descriptions-table-header`,i],colspan:1,style:v},d),n(`td`,{class:[`${f}-descriptions-table-content`,r],colspan:u?(a-_)*2+1:g*2-1,style:y},m)):e.row.push(n(`td`,{class:`${f}-descriptions-table-content`,colspan:u?(a-_)*2:g*2},n(`span`,{class:[`${f}-descriptions-table-content__label`,i],style:v},[...d,p&&n(`span`,{class:`${f}-descriptions-separator`},p)]),n(`span`,{class:[`${f}-descriptions-table-content__content`,r],style:y},m)));else{let t=u?(a-_)*2:g*2;e.row.push(n(`th`,{class:[`${f}-descriptions-table-header`,i],colspan:t,style:v},d)),e.secondRow.push(n(`td`,{class:[`${f}-descriptions-table-content`,r],colspan:t,style:y},m))}return(e.span>=a||u)&&(e.span=0,e.row.length&&(e.rows.push(e.row),e.row=[]),o!==`left`&&e.secondRow.length&&(e.rows.push(e.secondRow),e.secondRow=[])),e},{span:0,row:[],secondRow:[],rows:[]}).rows.map(e=>n(`tr`,{class:`${f}-descriptions-table-row`},e));return n(`div`,{style:d,class:[`${f}-descriptions`,this.themeClass,`${f}-descriptions--${o}-label-placement`,`${f}-descriptions--${s}-label-align`,`${f}-descriptions--${c}-size`,l&&`${f}-descriptions--bordered`]},u||this.$slots.header?n(`div`,{class:`${f}-descriptions-header`},u||Ce(this,`header`)):null,n(`div`,{class:`${f}-descriptions-table-wrapper`},n(`table`,{class:`${f}-descriptions-table`},n(`tbody`,null,o===`top`&&n(`tr`,{class:`${f}-descriptions-table-row`,style:{visibility:`collapse`}},D(a*2,n(`td`,null))),g))))}}),it={label:String,span:{type:Number,default:1},labelClass:String,labelStyle:[Object,String],contentClass:String,contentStyle:[Object,String]},$=b({name:`DescriptionsItem`,[et]:!0,props:it,slots:Object,render(){return null}}),at=s(`n-tabs`),ot={tab:[String,Number,Object,Function],name:{type:[String,Number],required:!0},disabled:Boolean,displayDirective:{type:String,default:`if`},closable:{type:Boolean,default:void 0},tabProps:Object,label:[String,Number,Object,Function]},st=b({__TAB_PANE__:!0,name:`TabPane`,alias:[`TabPanel`],props:ot,slots:Object,setup(e){let t=T(at,null);return t||d(`tab-pane`,"`n-tab-pane` must be placed inside `n-tabs`."),{style:t.paneStyleRef,class:t.paneClassRef,mergedClsPrefix:t.mergedClsPrefixRef}},render(){return n(`div`,{class:[`${this.mergedClsPrefix}-tab-pane`,this.class],style:this.style},this.$slots)}}),ct=Object.assign({internalLeftPadded:Boolean,internalAddable:Boolean,internalCreatedByPane:Boolean},xe(ot,[`displayDirective`])),lt=b({__TAB__:!0,inheritAttrs:!1,name:`Tab`,props:ct,setup(e){let{mergedClsPrefixRef:t,valueRef:n,typeRef:r,closableRef:i,tabStyleRef:a,addTabStyleRef:o,tabClassRef:s,addTabClassRef:c,tabChangeIdRef:l,onBeforeLeaveRef:u,triggerRef:d,handleAdd:f,activateTab:p,handleClose:m}=T(at);return{trigger:d,mergedClosable:H(()=>{if(e.internalAddable)return!1;let{closable:t}=e;return t===void 0?i.value:t}),style:a,addStyle:o,tabClass:s,addTabClass:c,clsPrefix:t,value:n,type:r,handleClose(t){t.stopPropagation(),!e.disabled&&m(e.name)},activateTab(){if(e.disabled)return;if(e.internalAddable){f();return}let{name:t}=e,r=++l.id;if(t!==n.value){let{value:i}=u;i?Promise.resolve(i(e.name,n.value)).then(e=>{e&&l.id===r&&p(t)}):p(t)}}}},render(){let{internalAddable:e,clsPrefix:t,name:r,disabled:i,label:o,tab:s,value:l,mergedClosable:u,trigger:d,$slots:{default:f}}=this,p=o??s;return n(`div`,{class:`${t}-tabs-tab-wrapper`},this.internalLeftPadded?n(`div`,{class:`${t}-tabs-tab-pad`}):null,n(`div`,Object.assign({key:r,"data-name":r,"data-disabled":i?!0:void 0},c({class:[`${t}-tabs-tab`,l===r&&`${t}-tabs-tab--active`,i&&`${t}-tabs-tab--disabled`,u&&`${t}-tabs-tab--closable`,e&&`${t}-tabs-tab--addable`,e?this.addTabClass:this.tabClass],onClick:d===`click`?this.activateTab:void 0,onMouseenter:d===`hover`?this.activateTab:void 0,style:e?this.addStyle:this.style},this.internalCreatedByPane?this.tabProps||{}:this.$attrs)),n(`span`,{class:`${t}-tabs-tab__label`},e?n(a,null,n(`div`,{class:`${t}-tabs-tab__height-placeholder`},`\xA0`),n(w,{clsPrefix:t},{default:()=>n(we,null)})):f?f():typeof p==`object`?p:Se(p??r)),u&&this.type===`card`?n(m,{clsPrefix:t,class:`${t}-tabs-tab__close`,onClick:this.handleClose,disabled:i}):null))}}),ut=U(`tabs`,`
 box-sizing: border-box;
 width: 100%;
 display: flex;
 flex-direction: column;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
`,[L(`segment-type`,[U(`tabs-rail`,[P(`&.transition-disabled`,[U(`tabs-capsule`,`
 transition: none;
 `)])])]),L(`top`,[U(`tab-pane`,`
 padding: var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left);
 `)]),L(`left`,[U(`tab-pane`,`
 padding: var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left) var(--n-pane-padding-top);
 `)]),L(`left, right`,`
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
 `)]),L(`right`,`
 flex-direction: row-reverse;
 `,[U(`tab-pane`,`
 padding: var(--n-pane-padding-left) var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom);
 `),U(`tabs-bar`,`
 left: 0;
 `)]),L(`bottom`,`
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
 `,[L(`active`,`
 font-weight: var(--n-font-weight-strong);
 color: var(--n-tab-text-color-active);
 `),P(`&:hover`,`
 color: var(--n-tab-text-color-hover);
 `)])])]),L(`flex`,[U(`tabs-nav`,`
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
 `,[F(`prefix, suffix`,`
 display: flex;
 align-items: center;
 `),F(`prefix`,`padding-right: 16px;`),F(`suffix`,`padding-left: 16px;`)]),L(`top, bottom`,[P(`>`,[U(`tabs-nav`,[U(`tabs-nav-scroll-wrapper`,[P(`&::before`,`
 top: 0;
 bottom: 0;
 left: 0;
 width: 20px;
 `),P(`&::after`,`
 top: 0;
 bottom: 0;
 right: 0;
 width: 20px;
 `),L(`shadow-start`,[P(`&::before`,`
 box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, .12);
 `)]),L(`shadow-end`,[P(`&::after`,`
 box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),L(`left, right`,[U(`tabs-nav-scroll-content`,`
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
 `),L(`shadow-start`,[P(`&::before`,`
 box-shadow: inset 0 10px 8px -8px rgba(0, 0, 0, .12);
 `)]),L(`shadow-end`,[P(`&::after`,`
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
 `,[L(`disabled`,{cursor:`not-allowed`}),F(`close`,`
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),F(`label`,`
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
 `),L(`disabled`,`
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
 `),L(`line-type, bar-type`,[U(`tabs-tab`,`
 font-weight: var(--n-tab-font-weight);
 box-sizing: border-box;
 vertical-align: bottom;
 `,[P(`&:hover`,{color:`var(--n-tab-text-color-hover)`}),L(`active`,`
 color: var(--n-tab-text-color-active);
 font-weight: var(--n-tab-font-weight-active);
 `),L(`disabled`,{color:`var(--n-tab-text-color-disabled)`})])]),U(`tabs-nav`,[L(`line-type`,[L(`top`,[F(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),U(`tabs-nav-scroll-content`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),U(`tabs-bar`,`
 bottom: -1px;
 `)]),L(`left`,[F(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),U(`tabs-nav-scroll-content`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),U(`tabs-bar`,`
 right: -1px;
 `)]),L(`right`,[F(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),U(`tabs-nav-scroll-content`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),U(`tabs-bar`,`
 left: -1px;
 `)]),L(`bottom`,[F(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),U(`tabs-nav-scroll-content`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),U(`tabs-bar`,`
 top: -1px;
 `)]),F(`prefix, suffix`,`
 transition: border-color .3s var(--n-bezier);
 `),U(`tabs-nav-scroll-content`,`
 transition: border-color .3s var(--n-bezier);
 `),U(`tabs-bar`,`
 border-radius: 0;
 `)]),L(`card-type`,[F(`prefix, suffix`,`
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
 `,[L(`addable`,`
 padding-left: 8px;
 padding-right: 8px;
 font-size: 16px;
 justify-content: center;
 `,[F(`height-placeholder`,`
 width: 0;
 font-size: var(--n-tab-font-size);
 `),oe(`disabled`,[P(`&:hover`,`
 color: var(--n-tab-text-color-hover);
 `)])]),L(`closable`,`padding-right: 8px;`),L(`active`,`
 background-color: #0000;
 font-weight: var(--n-tab-font-weight-active);
 color: var(--n-tab-text-color-active);
 `),L(`disabled`,`color: var(--n-tab-text-color-disabled);`)])]),L(`left, right`,`
 flex-direction: column; 
 `,[F(`prefix, suffix`,`
 padding: var(--n-tab-padding-vertical);
 `),U(`tabs-wrapper`,`
 flex-direction: column;
 `),U(`tabs-tab-wrapper`,`
 flex-direction: column;
 `,[U(`tabs-tab-pad`,`
 height: var(--n-tab-gap-vertical);
 width: 100%;
 `)])]),L(`top`,[L(`card-type`,[U(`tabs-scroll-padding`,`border-bottom: 1px solid var(--n-tab-border-color);`),F(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),U(`tabs-tab`,`
 border-top-left-radius: var(--n-tab-border-radius);
 border-top-right-radius: var(--n-tab-border-radius);
 `,[L(`active`,`
 border-bottom: 1px solid #0000;
 `)]),U(`tabs-tab-pad`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),U(`tabs-pad`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `)])]),L(`left`,[L(`card-type`,[U(`tabs-scroll-padding`,`border-right: 1px solid var(--n-tab-border-color);`),F(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),U(`tabs-tab`,`
 border-top-left-radius: var(--n-tab-border-radius);
 border-bottom-left-radius: var(--n-tab-border-radius);
 `,[L(`active`,`
 border-right: 1px solid #0000;
 `)]),U(`tabs-tab-pad`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),U(`tabs-pad`,`
 border-right: 1px solid var(--n-tab-border-color);
 `)])]),L(`right`,[L(`card-type`,[U(`tabs-scroll-padding`,`border-left: 1px solid var(--n-tab-border-color);`),F(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),U(`tabs-tab`,`
 border-top-right-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[L(`active`,`
 border-left: 1px solid #0000;
 `)]),U(`tabs-tab-pad`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),U(`tabs-pad`,`
 border-left: 1px solid var(--n-tab-border-color);
 `)])]),L(`bottom`,[L(`card-type`,[U(`tabs-scroll-padding`,`border-top: 1px solid var(--n-tab-border-color);`),F(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),U(`tabs-tab`,`
 border-bottom-left-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[L(`active`,`
 border-top: 1px solid #0000;
 `)]),U(`tabs-tab-pad`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),U(`tabs-pad`,`
 border-top: 1px solid var(--n-tab-border-color);
 `)])])])]),dt=Qe,ft=Object.assign(Object.assign({},S.props),{value:[String,Number],defaultValue:[String,Number],trigger:{type:String,default:`click`},type:{type:String,default:`bar`},closable:Boolean,justifyContent:String,size:String,placement:{type:String,default:`top`},tabStyle:[String,Object],tabClass:String,addTabStyle:[String,Object],addTabClass:String,barWidth:Number,paneClass:String,paneStyle:[String,Object],paneWrapperClass:String,paneWrapperStyle:[String,Object],addable:[Boolean,Object],tabsPadding:{type:Number,default:0},animated:Boolean,onBeforeLeave:Function,onAdd:Function,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onClose:[Function,Array],labelSize:String,activeName:[String,Number],onActiveNameChange:[Function,Array]}),pt=b({name:`Tabs`,props:ft,slots:Object,setup(t,{slots:n}){let{mergedClsPrefixRef:r,inlineThemeDisabled:i,mergedComponentPropsRef:a}=x(t),o=S(`Tabs`,`-tabs`,ut,Ee,t,r),s=I(null),c=I(null),l=I(null),u=I(null),d=I(null),f=I(null),p=I(!0),m=I(!0),h=he(t,[`labelSize`,`size`]),g=H(()=>h.value?h.value:a?.value?.Tabs?.size||`medium`),_=he(t,[`activeName`,`value`]),y=I(_.value??t.defaultValue??(n.default?Y(n.default())[0]?.props?.name:null)),b=ye(_,y),w={id:0},T=H(()=>{if(!(!t.justifyContent||t.type===`card`))return{display:`flex`,justifyContent:t.justifyContent}});V(b,()=>{w.id=0,A(),M()});function E(){let{value:e}=b;return e===null?null:s.value?.querySelector(`[data-name="${e}"]`)}function D(e){if(t.type===`card`)return;let{value:n}=c;if(!n)return;let i=n.style.opacity===`0`;if(e){let a=`${r.value}-tabs-bar--disabled`,{barWidth:o,placement:s}=t;if(e.dataset.disabled===`true`?n.classList.add(a):n.classList.remove(a),[`top`,`bottom`].includes(s)){if(k([`top`,`maxHeight`,`height`]),typeof o==`number`&&e.offsetWidth>=o){let t=Math.floor((e.offsetWidth-o)/2)+e.offsetLeft;n.style.left=`${t}px`,n.style.maxWidth=`${o}px`}else n.style.left=`${e.offsetLeft}px`,n.style.maxWidth=`${e.offsetWidth}px`;n.style.width=`8192px`,i&&(n.style.transition=`none`),n.offsetWidth,i&&(n.style.transition=``,n.style.opacity=`1`)}else{if(k([`left`,`maxWidth`,`width`]),typeof o==`number`&&e.offsetHeight>=o){let t=Math.floor((e.offsetHeight-o)/2)+e.offsetTop;n.style.top=`${t}px`,n.style.maxHeight=`${o}px`}else n.style.top=`${e.offsetTop}px`,n.style.maxHeight=`${e.offsetHeight}px`;n.style.height=`8192px`,i&&(n.style.transition=`none`),n.offsetHeight,i&&(n.style.transition=``,n.style.opacity=`1`)}}}function O(){if(t.type===`card`)return;let{value:e}=c;e&&(e.style.opacity=`0`)}function k(e){let{value:t}=c;if(t)for(let n of e)t.style[n]=``}function A(){if(t.type===`card`)return;let e=E();e?D(e):O()}function M(){let e=d.value?.$el;if(!e)return;let t=E();if(!t)return;let{scrollLeft:n,offsetWidth:r}=e,{offsetLeft:i,offsetWidth:a}=t;n>i?e.scrollTo({top:0,left:i,behavior:`smooth`}):i+a>n+r&&e.scrollTo({top:0,left:i+a-r,behavior:`smooth`})}let N=I(null),P=0,F=null;function te(e){let t=N.value;if(t){P=e.getBoundingClientRect().height;let n=`${P}px`,r=()=>{t.style.height=n,t.style.maxHeight=n};F?(r(),F(),F=null):F=r}}function L(e){let t=N.value;if(t){let n=e.getBoundingClientRect().height,r=()=>{document.body.offsetHeight,t.style.maxHeight=`${n}px`,t.style.height=`${Math.max(P,n)}px`};F?(F(),F=null,r()):F=r}}function R(){let e=N.value;if(e){e.style.maxHeight=``,e.style.height=``;let{paneWrapperStyle:n}=t;if(typeof n==`string`)e.style.cssText=n;else if(n){let{maxHeight:t,height:r}=n;t!==void 0&&(e.style.maxHeight=t),r!==void 0&&(e.style.height=r)}}}let z={value:[]},U=I(`next`);function ne(e){let t=b.value,n=`next`;for(let r of z.value){if(r===t)break;if(r===e){n=`prev`;break}}U.value=n,re(e)}function re(e){let{onActiveNameChange:n,onUpdateValue:r,"onUpdate:value":i}=t;n&&v(n,e),r&&v(r,e),i&&v(i,e),y.value=e}function ae(e){let{onClose:n}=t;n&&v(n,e)}let K=!0;function oe(){let{value:e}=c;if(!e)return;K||=!1;let t=`transition-disabled`;e.classList.add(t),A(),e.classList.remove(t)}let q=I(null);function se({transitionDisabled:e}){let t=s.value;if(!t)return;e&&t.classList.add(`transition-disabled`);let n=E();n&&q.value&&(q.value.style.width=`${n.offsetWidth}px`,q.value.style.height=`${n.offsetHeight}px`,q.value.style.transform=`translateX(${n.offsetLeft-ie(getComputedStyle(t).paddingLeft)}px)`,e&&q.value.offsetWidth),e&&t.classList.remove(`transition-disabled`)}V([b],()=>{t.type===`segment`&&C(()=>{se({transitionDisabled:!1})})}),ee(()=>{t.type===`segment`&&se({transitionDisabled:!0})});let le=0;function ue(e){if(e.contentRect.width===0&&e.contentRect.height===0||le===e.contentRect.width)return;le=e.contentRect.width;let{type:n}=t;if((n===`line`||n===`bar`)&&(K||t.justifyContent?.startsWith(`space`))&&oe(),n!==`segment`){let{placement:e}=t;_e((e===`top`||e===`bottom`?d.value?.$el:f.value)||null)}}let fe=dt(ue,64);V([()=>t.justifyContent,()=>t.size],()=>{C(()=>{let{type:e}=t;(e===`line`||e===`bar`)&&oe()})});let J=I(!1);function pe(e){let{target:n,contentRect:{width:r,height:i}}=e,a=n.parentElement.parentElement.offsetWidth,o=n.parentElement.parentElement.offsetHeight,{placement:s}=t;if(!J.value)s===`top`||s===`bottom`?a<r&&(J.value=!0):o<i&&(J.value=!0);else{let{value:e}=u;if(!e)return;s===`top`||s===`bottom`?a-r>e.$el.offsetWidth&&(J.value=!1):o-i>e.$el.offsetHeight&&(J.value=!1)}_e(d.value?.$el||null)}let me=dt(pe,64);function ge(){let{onAdd:e}=t;e&&e(),C(()=>{let e=E(),{value:t}=d;!e||!t||t.scrollTo({left:e.offsetLeft,top:0,behavior:`smooth`})})}function _e(e){if(!e)return;let{placement:n}=t;if(n===`top`||n===`bottom`){let{scrollLeft:t,scrollWidth:n,offsetWidth:r}=e;p.value=t<=0,m.value=t+r>=n}else{let{scrollTop:t,scrollHeight:n,offsetHeight:r}=e;p.value=t<=0,m.value=t+r>=n}}let ve=dt(e=>{_e(e.target)},64);e(at,{triggerRef:G(t,`trigger`),tabStyleRef:G(t,`tabStyle`),tabClassRef:G(t,`tabClass`),addTabStyleRef:G(t,`addTabStyle`),addTabClassRef:G(t,`addTabClass`),paneClassRef:G(t,`paneClass`),paneStyleRef:G(t,`paneStyle`),mergedClsPrefixRef:r,typeRef:G(t,`type`),closableRef:G(t,`closable`),valueRef:b,tabChangeIdRef:w,onBeforeLeaveRef:G(t,`onBeforeLeave`),activateTab:ne,handleClose:ae,handleAdd:ge}),de(()=>{A(),M()}),j(()=>{let{value:e}=l;if(!e)return;let{value:t}=r,n=`${t}-tabs-nav-scroll-wrapper--shadow-start`,i=`${t}-tabs-nav-scroll-wrapper--shadow-end`;p.value?e.classList.remove(n):e.classList.add(n),m.value?e.classList.remove(i):e.classList.add(i)});let be={syncBarPosition:()=>{A()}},xe=()=>{se({transitionDisabled:!0})},Se=H(()=>{let{value:e}=g,{type:n}=t,r=`${e}${{card:`Card`,bar:`Bar`,line:`Line`,segment:`Segment`}[n]}`,{self:{barColor:i,closeIconColor:a,closeIconColorHover:s,closeIconColorPressed:c,tabColor:l,tabBorderColor:u,paneTextColor:d,tabFontWeight:f,tabBorderRadius:p,tabFontWeightActive:m,colorSegment:h,fontWeightStrong:_,tabColorSegment:v,closeSize:y,closeIconSize:b,closeColorHover:x,closeColorPressed:S,closeBorderRadius:C,[W(`panePadding`,e)]:w,[W(`tabPadding`,r)]:T,[W(`tabPaddingVertical`,r)]:E,[W(`tabGap`,r)]:ee,[W(`tabGap`,`${r}Vertical`)]:D,[W(`tabTextColor`,n)]:O,[W(`tabTextColorActive`,n)]:k,[W(`tabTextColorHover`,n)]:A,[W(`tabTextColorDisabled`,n)]:j,[W(`tabFontSize`,e)]:M},common:{cubicBezierEaseInOut:N}}=o.value;return{"--n-bezier":N,"--n-color-segment":h,"--n-bar-color":i,"--n-tab-font-size":M,"--n-tab-text-color":O,"--n-tab-text-color-active":k,"--n-tab-text-color-disabled":j,"--n-tab-text-color-hover":A,"--n-pane-text-color":d,"--n-tab-border-color":u,"--n-tab-border-radius":p,"--n-close-size":y,"--n-close-icon-size":b,"--n-close-color-hover":x,"--n-close-color-pressed":S,"--n-close-border-radius":C,"--n-close-icon-color":a,"--n-close-icon-color-hover":s,"--n-close-icon-color-pressed":c,"--n-tab-color":l,"--n-tab-font-weight":f,"--n-tab-font-weight-active":m,"--n-tab-padding":T,"--n-tab-padding-vertical":E,"--n-tab-gap":ee,"--n-tab-gap-vertical":D,"--n-pane-padding-left":B(w,`left`),"--n-pane-padding-right":B(w,`right`),"--n-pane-padding-top":B(w,`top`),"--n-pane-padding-bottom":B(w,`bottom`),"--n-font-weight-strong":_,"--n-tab-color-segment":v}}),Ce=i?ce(`tabs`,H(()=>`${g.value[0]}${t.type[0]}`),Se,t):void 0;return Object.assign({mergedClsPrefix:r,mergedValue:b,renderedNames:new Set,segmentCapsuleElRef:q,tabsPaneWrapperRef:N,tabsElRef:s,barElRef:c,addTabInstRef:u,xScrollInstRef:d,scrollWrapperElRef:l,addTabFixed:J,tabWrapperStyle:T,handleNavResize:fe,mergedSize:g,handleScroll:ve,handleTabsResize:me,cssVars:i?void 0:Se,themeClass:Ce?.themeClass,animationDirection:U,renderNameListRef:z,yScrollElRef:f,handleSegmentResize:xe,onAnimationBeforeLeave:te,onAnimationEnter:L,onAnimationAfterEnter:R,onRender:Ce?.onRender},be)},render(){let{mergedClsPrefix:e,type:t,placement:i,addTabFixed:a,addable:o,mergedSize:s,renderNameListRef:c,onRender:l,paneWrapperClass:u,paneWrapperStyle:d,$slots:{default:f,prefix:p,suffix:m}}=this;l?.();let h=f?Y(f()).filter(e=>e.type.__TAB_PANE__===!0):[],_=f?Y(f()).filter(e=>e.type.__TAB__===!0):[],v=!_.length,y=t===`card`,b=t===`segment`,x=!y&&!b&&this.justifyContent;c.value=[];let S=()=>{let t=n(`div`,{style:this.tabWrapperStyle,class:`${e}-tabs-wrapper`},x?null:n(`div`,{class:`${e}-tabs-scroll-padding`,style:i===`top`||i===`bottom`?{width:`${this.tabsPadding}px`}:{height:`${this.tabsPadding}px`}}),v?h.map((e,t)=>(c.value.push(e.props.name),_t(n(lt,Object.assign({},e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0&&(!x||x===`center`||x===`start`||x===`end`)}),e.children?{default:e.children.tab}:void 0)))):_.map((e,t)=>(c.value.push(e.props.name),_t(t!==0&&!x?gt(e):e))),!a&&o&&y?ht(o,(v?h.length:_.length)!==0):null,x?null:n(`div`,{class:`${e}-tabs-scroll-padding`,style:{width:`${this.tabsPadding}px`}}));return n(`div`,{ref:`tabsElRef`,class:`${e}-tabs-nav-scroll-content`},y&&o?n(r,{onResize:this.handleTabsResize},{default:()=>t}):t,y?n(`div`,{class:`${e}-tabs-pad`}):null,y?null:n(`div`,{ref:`barElRef`,class:`${e}-tabs-bar`}))},C=b?`top`:i;return n(`div`,{class:[`${e}-tabs`,this.themeClass,`${e}-tabs--${t}-type`,`${e}-tabs--${s}-size`,x&&`${e}-tabs--flex`,`${e}-tabs--${C}`],style:this.cssVars},n(`div`,{class:[`${e}-tabs-nav--${t}-type`,`${e}-tabs-nav--${C}`,`${e}-tabs-nav`]},g(p,t=>t&&n(`div`,{class:`${e}-tabs-nav__prefix`},t)),b?n(r,{onResize:this.handleSegmentResize},{default:()=>n(`div`,{class:`${e}-tabs-rail`,ref:`tabsElRef`},n(`div`,{class:`${e}-tabs-capsule`,ref:`segmentCapsuleElRef`},n(`div`,{class:`${e}-tabs-wrapper`},n(`div`,{class:`${e}-tabs-tab`}))),v?h.map((e,t)=>(c.value.push(e.props.name),n(lt,Object.assign({},e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0}),e.children?{default:e.children.tab}:void 0))):_.map((e,t)=>(c.value.push(e.props.name),t===0?e:gt(e))))}):n(r,{onResize:this.handleNavResize},{default:()=>n(`div`,{class:`${e}-tabs-nav-scroll-wrapper`,ref:`scrollWrapperElRef`},[`top`,`bottom`].includes(C)?n(Fe,{ref:`xScrollInstRef`,onScroll:this.handleScroll},{default:S}):n(`div`,{class:`${e}-tabs-nav-y-scroll`,onScroll:this.handleScroll,ref:`yScrollElRef`},S()))}),a&&o&&y?ht(o,!0):null,g(m,t=>t&&n(`div`,{class:`${e}-tabs-nav__suffix`},t))),v&&(this.animated&&(C===`top`||C===`bottom`)?n(`div`,{ref:`tabsPaneWrapperRef`,style:d,class:[`${e}-tabs-pane-wrapper`,u]},mt(h,this.mergedValue,this.renderedNames,this.onAnimationBeforeLeave,this.onAnimationEnter,this.onAnimationAfterEnter,this.animationDirection)):mt(h,this.mergedValue,this.renderedNames)))}});function mt(e,t,r,a,o,s,c){let l=[];return e.forEach(e=>{let{name:n,displayDirective:a,"display-directive":o}=e.props,s=e=>a===e||o===e,c=t===n;if(e.key!==void 0&&(e.key=n),c||s(`show`)||s(`show:lazy`)&&r.has(n)){r.has(n)||r.add(n);let t=!s(`if`);l.push(t?q(e,[[i,c]]):e)}}),c?n(le,{name:`${c}-transition`,onBeforeLeave:a,onEnter:o,onAfterEnter:s},{default:()=>l}):l}function ht(e,t){return n(lt,{ref:`addTabInstRef`,key:`__addable`,name:`__addable`,internalCreatedByPane:!0,internalAddable:!0,internalLeftPadded:t,disabled:typeof e==`object`&&e.disabled})}function gt(e){let n=t(e);return n.props?n.props.internalLeftPadded=!0:n.props={internalLeftPadded:!0},n}function _t(e){return Array.isArray(e.dynamicProps)?e.dynamicProps.includes(`internalLeftPadded`)||e.dynamicProps.push(`internalLeftPadded`):e.dynamicProps=[`internalLeftPadded`],e}var vt=5e3;function yt(){let e=I([]),t=I(!1),n;function r(r,a,o){i(),e.value=[];let s=`/api/docker/containers/${encodeURIComponent(r)}/logs/stream?sinceMin=${a}&tail=${o}`;n=new EventSource(s),n.onopen=()=>{t.value=!0},n.onerror=()=>{t.value=!1},n.onmessage=t=>{try{let n=JSON.parse(t.data);e.value.push(n),e.value.length>vt&&e.value.splice(0,e.value.length-vt)}catch{}}}function i(){n?.close(),n=void 0,t.value=!1}return{lines:e,connected:t,open:r,close:i}}var bt={key:1,class:`tab-loading`},xt={key:0,class:`log-empty`},St={key:0,class:`log-empty`},Ct={key:0,class:`log-ts`},wt={class:`log-text`},Tt=500,Et=ae(b({__name:`DockerView`,setup(e){let{t}=ne(),r=Oe();function i(e){return e instanceof N&&e.status===503&&!!e.body&&typeof e.body==`object`&&`enabled`in e.body}function s(e,t){r.error(e instanceof N?e.message:t)}let c=e=>e===`running`?`success`:e===`paused`||e===`restarting`?`warning`:e===`dead`?`error`:`default`,l={running:0,restarting:1,paused:2,created:3,exited:4,dead:5};function d(e){return l[e.state]??6}function m(e,t){return e.hasStats?t(e.stats):-1}let g=I([]),v=I(!0),b=I(null),x;async function S(){try{let e=await X.containers();g.value=e.containers,b.value=null}catch(e){i(e)&&(b.value=e.body)}finally{v.value=!1}}async function w(e,n){try{let t=await X.containerAction(e,n);g.value=t.containers}catch(e){s(e,t(`docker.actionFailed`,{action:n}))}}let T=I(!1),D=I(``),A=I(``),j=I(15),P=[{label:t(`docker.logs.last5m`),value:5},{label:t(`docker.logs.last10m`),value:10},{label:t(`docker.logs.last15m`),value:15},{label:t(`docker.logs.last1h`),value:60},{label:t(`docker.logs.last6h`),value:360},{label:t(`docker.logs.last24h`),value:1440}],F=yt(),L=I(null),R=I(!0),z=I(!1),B;function U(e,t){z.value=!1,B&&clearTimeout(B),B=setTimeout(()=>{F.connected.value||(z.value=!0)},6e3),F.open(e,t,Tt)}function W(){R.value=!0,U(D.value,j.value)}function G(e){D.value=e.id,A.value=e.name,T.value=!0,R.value=!0,U(e.id,j.value)}V(j,e=>{T.value&&(R.value=!0,U(D.value,e))}),V(T,e=>{e||(F.close(),B&&clearTimeout(B))}),V(F.connected,e=>{e&&(z.value=!1,B&&clearTimeout(B))}),V(()=>F.lines.value.length,async()=>{if(!R.value)return;await C();let e=L.value;e&&(e.scrollTop=e.scrollHeight)});function re(){let e=L.value;if(!e)return;let t=e.scrollHeight-e.scrollTop-e.clientHeight<24;R.value=t}function ie(e){if(!e)return``;let t=new Date(e);return Number.isNaN(t.getTime())?``:t.toLocaleTimeString()}let ae=/\b(error|fatal|panic|exception|critical)\b/i,oe=/\bwarn(?:ing)?\b/i;function q(e){return e.stream===`stderr`||ae.test(e.text)?`log-line--error`:oe.test(e.text)?`log-line--warn`:``}let ce=H(()=>[{title:t(`common.name`),key:`name`,width:160,ellipsis:{tooltip:!0},sorter:(e,t)=>e.name.localeCompare(t.name)},{title:`Image`,key:`image`,width:180,ellipsis:{tooltip:!0},sorter:(e,t)=>e.image.localeCompare(t.image)},{title:`Status`,key:`state`,width:130,sorter:(e,t)=>d(e)-d(t),render:e=>n(Te,{type:c(e.state),size:`small`},{default:()=>e.status})},{title:`CPU`,key:`cpu`,width:70,sorter:(e,t)=>m(e,e=>e.cpuPercent)-m(t,e=>e.cpuPercent),render:e=>e.hasStats?`${e.stats.cpuPercent.toFixed(1)}%`:`—`},{title:`RAM`,key:`ram`,width:150,sorter:(e,t)=>m(e,e=>e.memUsageBytes)-m(t,e=>e.memUsageBytes),render:e=>e.hasStats?`${Z(e.stats.memUsageBytes)} / ${Z(e.stats.memLimitBytes)}`:`—`},{title:`Network`,key:`net`,width:140,sorter:(e,t)=>m(e,e=>e.netRxBytes+e.netTxBytes)-m(t,e=>e.netRxBytes+e.netTxBytes),render:e=>e.hasStats?`↓ ${Z(e.stats.netRxBytes)} ↑ ${Z(e.stats.netTxBytes)}`:`—`},{title:`Ports`,key:`ports`,width:220,ellipsis:{tooltip:!0}},{title:t(`common.actions`),key:`actions`,width:270,render:e=>n(je,{size:`small`},()=>[e.state===`running`?[n(O,{size:`tiny`,onClick:()=>w(e.id,`stop`)},()=>`Stop`),n(O,{size:`tiny`,onClick:()=>w(e.id,`restart`)},()=>`Restart`)]:n(O,{size:`tiny`,type:`primary`,onClick:()=>w(e.id,`start`)},()=>`Start`),n(O,{size:`tiny`,quaternary:!0,onClick:()=>G(e)},()=>t(`docker.logs.button`)),n(Me,{onPositiveClick:()=>w(e.id,`remove`)},{trigger:()=>n(O,{size:`tiny`,type:`error`,ghost:!0},()=>t(`common.delete`)),default:()=>t(`docker.confirmDeleteContainer`,{name:e.name})})])}]),le=I([]),ue=I(!0),de=I(null);async function fe(){ue.value=!0;try{let e=await X.images();le.value=e.images,de.value=null}catch(e){i(e)&&(de.value=e.body)}finally{ue.value=!1}}async function me(e){try{let t=await X.removeImage(e);le.value=t.images}catch(e){s(e,t(`docker.removeImageFailed`))}}let he=H(()=>[{title:`Tag`,key:`tag`,minWidth:200,ellipsis:{tooltip:!0},sorter:(e,t)=>e.tag.localeCompare(t.tag),render:e=>e.dangling?n(je,{size:`small`,align:`center`},()=>[e.tag,n(Te,{size:`small`,type:`warning`},()=>`dangling`)]):e.tag},{title:t(`common.size`),key:`sizeBytes`,width:110,sorter:(e,t)=>e.sizeBytes-t.sizeBytes,render:e=>Z(e.sizeBytes)},{title:t(`docker.usedColumn`),key:`containers`,width:140,sorter:(e,t)=>e.containers-t.containers,render:e=>e.containers<0?`—`:e.containers===0?t(`docker.notUsed`):t(`docker.containerCount`,{count:e.containers})},{title:t(`docker.created`),key:`created`,width:150,sorter:(e,t)=>Date.parse(e.created)-Date.parse(t.created),render:e=>Ne(e.created)},{title:t(`common.actions`),key:`actions`,width:100,render:e=>n(Me,{onPositiveClick:()=>me(e.id)},{trigger:()=>n(O,{size:`tiny`,type:`error`,ghost:!0},()=>t(`common.delete`)),default:()=>t(`docker.confirmDeleteImage`,{tag:e.tag})})}]),Y=I([]),ye=I(!0),xe=I(null);async function Se(){ye.value=!0;try{let e=await X.volumes();Y.value=e.volumes,xe.value=null}catch(e){i(e)&&(xe.value=e.body)}finally{ye.value=!1}}async function Ce(e){try{let t=await X.removeVolume(e);Y.value=t.volumes}catch(e){s(e,t(`docker.removeVolumeFailed`))}}let we=H(()=>[{title:t(`common.name`),key:`name`,minWidth:180,ellipsis:{tooltip:!0},sorter:(e,t)=>e.name.localeCompare(t.name)},{title:`Driver`,key:`driver`,width:100,sorter:(e,t)=>e.driver.localeCompare(t.driver)},{title:t(`common.size`),key:`sizeBytes`,width:110,sorter:(e,t)=>e.sizeBytes-t.sizeBytes,render:e=>e.sizeBytes<0?t(`docker.unknown`):Z(e.sizeBytes)},{title:`Status`,key:`inUse`,width:120,sorter:(e,t)=>Number(e.inUse)-Number(t.inUse),render:e=>n(Te,{size:`small`,type:e.inUse?`success`:`default`},()=>e.inUse?t(`docker.used`):t(`docker.notUsed`))},{title:t(`common.actions`),key:`actions`,width:100,render:e=>n(Me,{onPositiveClick:()=>Ce(e.name)},{trigger:()=>n(O,{size:`tiny`,type:`error`,ghost:!0},()=>t(`common.delete`)),default:()=>t(`docker.confirmDeleteVolume`,{name:e.name})})}]),Ee=I([]),De=I(!0),Pe=I(null);async function Fe(){De.value=!0;try{let e=await X.networks();Ee.value=e.networks,Pe.value=null}catch(e){i(e)&&(Pe.value=e.body)}finally{De.value=!1}}async function Ie(e){try{let t=await X.removeNetwork(e);Ee.value=t.networks}catch(e){s(e,t(`docker.removeNetworkFailed`))}}let Le=H(()=>[{title:t(`common.name`),key:`name`,minWidth:160,ellipsis:{tooltip:!0},sorter:(e,t)=>e.name.localeCompare(t.name),render:e=>e.builtin?n(je,{size:`small`,align:`center`},()=>[e.name,n(Te,{size:`small`},()=>`builtin`)]):e.name},{title:`Driver`,key:`driver`,width:100,sorter:(e,t)=>e.driver.localeCompare(t.driver)},{title:`Subnet`,key:`subnet`,width:150,sorter:(e,t)=>e.subnet.localeCompare(t.subnet),render:e=>e.subnet||`—`},{title:t(`docker.connectedContainers`),key:`connectedCount`,width:170,sorter:(e,t)=>e.connectedCount-t.connectedCount},{title:t(`common.actions`),key:`actions`,width:100,render:e=>e.builtin?null:n(Me,{onPositiveClick:()=>Ie(e.id)},{trigger:()=>n(O,{size:`tiny`,type:`error`,ghost:!0},()=>t(`common.delete`)),default:()=>t(`docker.confirmDeleteNetwork`,{name:e.name})})}]),Q=I(null),Re=I(!0),ze=I(null),Be=I(null);async function Ve(){Re.value=!0;try{Q.value=await X.settings(),ze.value=null}catch(e){i(e)&&(ze.value=e.body)}finally{Re.value=!1}}async function He(e){Be.value=e;try{Q.value=await X.prune(e),r.success(t(`docker.cleanupDone`))}catch(n){s(n,t(`docker.cleanupFailed`,{kind:e}))}finally{Be.value=null}}let Ue=I(`containers`),We=new Set([`containers`]);return V(Ue,e=>{We.has(e)||(We.add(e),e===`images`?fe():e===`volumes`?Se():e===`networks`?Fe():e===`settings`&&Ve())}),ee(()=>{S(),x=setInterval(S,5e3)}),E(()=>{x&&clearInterval(x),B&&clearTimeout(B),F.close()}),(e,n)=>(y(),h(pe,null,{default:K(()=>[f(k(pt),{type:`line`,value:Ue.value,"onUpdate:value":n[0]||=e=>Ue.value=e},{default:K(()=>[f(k(st),{name:`containers`,tab:`Containers`},{default:K(()=>[b.value?(y(),h(k(be),{key:0,type:`warning`,title:b.value.error},null,8,[`title`])):(y(),h(k(ve),{key:1,columns:ce.value,data:g.value,loading:v.value,"row-key":e=>e.id,"scroll-x":1200},null,8,[`columns`,`data`,`loading`,`row-key`]))]),_:1}),f(k(st),{name:`images`,tab:`Images`},{default:K(()=>[de.value?(y(),h(k(be),{key:0,type:`warning`,title:de.value.error},null,8,[`title`])):(y(),h(k(ve),{key:1,columns:he.value,data:le.value,loading:ue.value,"row-key":e=>e.id,"scroll-x":700},null,8,[`columns`,`data`,`loading`,`row-key`]))]),_:1}),f(k(st),{name:`volumes`,tab:`Volumes`},{default:K(()=>[xe.value?(y(),h(k(be),{key:0,type:`warning`,title:xe.value.error},null,8,[`title`])):(y(),h(k(ve),{key:1,columns:we.value,data:Y.value,loading:ye.value,"row-key":e=>e.name,"scroll-x":610},null,8,[`columns`,`data`,`loading`,`row-key`]))]),_:1}),f(k(st),{name:`networks`,tab:`Networks`},{default:K(()=>[Pe.value?(y(),h(k(be),{key:0,type:`warning`,title:Pe.value.error},null,8,[`title`])):(y(),h(k(ve),{key:1,columns:Le.value,data:Ee.value,loading:De.value,"row-key":e=>e.id,"scroll-x":680},null,8,[`columns`,`data`,`loading`,`row-key`]))]),_:1}),f(k(st),{name:`settings`,tab:`Settings`},{default:K(()=>[ze.value?(y(),h(k(be),{key:0,type:`warning`,title:ze.value.error},null,8,[`title`])):Re.value&&!Q.value?(y(),o(`div`,bt,[f(k(J),{size:`large`})])):Q.value?(y(),h(k(je),{key:3,vertical:``,size:24},{default:K(()=>[f(k(rt),{title:k(t)(`docker.daemonInfo`),column:2,bordered:``,"label-placement":`left`},{default:K(()=>[f(k($),{label:k(t)(`docker.serverVersion`)},{default:K(()=>[u(M(Q.value?.info.serverVersion),1)]),_:1},8,[`label`]),f(k($),{label:`OS / Kernel`},{default:K(()=>[u(M(Q.value?.info.operatingSystem)+` / `+M(Q.value?.info.kernelVersion),1)]),_:1}),f(k($),{label:`Storage Driver`},{default:K(()=>[u(M(Q.value?.info.storageDriver),1)]),_:1}),f(k($),{label:`Root Dir`},{default:K(()=>[u(M(Q.value?.info.dockerRootDir),1)]),_:1}),f(k($),{label:`Container`},{default:K(()=>[u(M(Q.value?.info.containersRunning)+` running, `+M(Q.value?.info.containersPaused)+` paused, `+M(Q.value?.info.containersStopped)+` stopped `,1)]),_:1}),f(k($),{label:`Images`},{default:K(()=>[u(M(Q.value?.info.images),1)]),_:1})]),_:1},8,[`title`]),f(k(rt),{title:`Disk Usage`,column:2,bordered:``,"label-placement":`left`},{default:K(()=>[f(k($),{label:`Images`},{default:K(()=>[u(M(k(Z)(Q.value?.diskUsage.imagesTotalBytes??0))+` (reclaimable `+M(k(Z)(Q.value?.diskUsage.imagesReclaimableBytes??0))+`) `,1)]),_:1}),f(k($),{label:`Containers`},{default:K(()=>[u(M(k(Z)(Q.value?.diskUsage.containersTotalBytes??0)),1)]),_:1}),f(k($),{label:`Volumes`},{default:K(()=>[u(M(k(Z)(Q.value?.diskUsage.volumesTotalBytes??0))+` (reclaimable `+M(k(Z)(Q.value?.diskUsage.volumesReclaimableBytes??0))+`) `,1)]),_:1})]),_:1}),f(k(je),null,{default:K(()=>[(y(),o(a,null,te([`containers`,`images`,`volumes`,`networks`,`all`],e=>f(k(Me),{key:e,onPositiveClick:t=>He(e)},{trigger:K(()=>[f(k(O),{size:`small`,loading:Be.value===e},{default:K(()=>[u(M(k(t)(`docker.cleanup`))+` `+M(e),1)]),_:2},1032,[`loading`])]),default:K(()=>[u(` `+M(k(t)(`docker.confirmCleanup`,{kind:e})),1)]),_:2},1032,[`onPositiveClick`])),64))]),_:1})]),_:1})):(y(),h(k(ge),{key:2,description:k(t)(`docker.noData`)},null,8,[`description`]))]),_:1})]),_:1},8,[`value`]),f(k(ke),{show:T.value,"onUpdate:show":n[2]||=e=>T.value=e,width:640,placement:`right`},{default:K(()=>[f(k(Ae),{title:k(t)(`docker.logs.title`,{name:A.value}),closable:``},{default:K(()=>[f(k(_e),{value:j.value,"onUpdate:value":n[1]||=e=>j.value=e,options:P,size:`small`,style:{width:`150px`,"margin-bottom":`10px`}},null,8,[`value`]),k(F).lines.value.length===0&&!k(F).connected.value?(y(),o(`div`,xt,[p(`p`,null,M(z.value?k(t)(`docker.logs.connectingSlow`):k(t)(`docker.logs.connecting`)),1),z.value?(y(),h(k(O),{key:0,size:`tiny`,onClick:W},{default:K(()=>[u(M(k(t)(`docker.logs.reconnect`)),1)]),_:1})):_(``,!0)])):_(``,!0),p(`div`,{ref_key:`logScrollEl`,ref:L,class:`log-scroll`,onScroll:re},[k(F).lines.value.length===0&&k(F).connected.value?(y(),o(`p`,St,M(k(t)(`docker.logs.waiting`)),1)):_(``,!0),(y(!0),o(a,null,te(k(F).lines.value,(e,t)=>(y(),o(`div`,{key:t,class:se([`log-line`,q(e)])},[e.timestamp?(y(),o(`span`,Ct,M(ie(e.timestamp)),1)):_(``,!0),p(`span`,wt,M(e.text),1)],2))),128))],544)]),_:1},8,[`title`])]),_:1},8,[`show`])]),_:1}))}}),[[`__scopeId`,`data-v-62512f43`]]);export{Et as default};