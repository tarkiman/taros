import{$n as e,An as t,Bn as n,Bt as r,Cn as i,Dn as a,Fn as o,Gt as s,Hn as c,Ht as l,In as u,It as d,Ln as f,Mn as p,N as m,Nn as h,Nt as g,Pn as _,Pt as v,Qn as y,Rn as b,Tt as x,U as S,Un as C,V as w,Vn as T,Xn as ee,Yn as te,Zt as ne,_ as E,_r as D,_t as O,ar as k,br as A,c as j,cn as M,dn as N,dr as P,er as re,fn as F,gn as I,hn as L,in as R,ir as z,jn as B,ln as V,m as ie,mn as H,mr as U,mt as W,nn as ae,o as oe,or as G,pn as K,sr as q,vr as se,wt as J,xn as ce,xt as le}from"./auth-HQixzRlA.js";import{C as ue,S as de,g as fe,h as Y,t as pe,u as me}from"./AppShell-D5N-E-uA.js";import{i as he,r as ge,t as _e}from"./DataTable-DBT7RYzd.js";import{u as ve}from"./useTheme-C7QcCzZi.js";import{c as ye,n as be}from"./LocaleSwitcher-b94LFCCL.js";import{n as xe,t as Se}from"./render-C-zdZzDv.js";import{t as Ce}from"./get-slot-6kXJmSMP.js";import{t as we}from"./Add-Cjq1B9ZX.js";import{t as Te}from"./Tag-D5fPQBIJ.js";import{n as Ee,r as De}from"./light-CWvnrRuO.js";import{t as Oe}from"./use-message-DsgqapBt.js";import{n as ke,t as Ae}from"./DrawerContent-Kxs0d6vE.js";import{t as je}from"./Space-DOeg8G1L.js";import{t as Me}from"./Popconfirm-CagwUv4w.js";import{t as X}from"./docker-BFa0jETW.js";import{n as Ne,t as Z}from"./format-BxLcbkc3.js";var Pe=Y(`.v-x-scroll`,{overflow:`auto`,scrollbarWidth:`none`},[Y(`&::-webkit-scrollbar`,{width:0,height:0})]),Q=b({name:`XScroll`,props:{disabled:Boolean,onScroll:Function},setup(){let e=P(null);function t(e){!(e.currentTarget.offsetWidth<e.currentTarget.scrollWidth)||e.deltaY===0||(e.currentTarget.scrollLeft+=e.deltaY+e.deltaX,e.preventDefault())}let n=l();return Pe.mount({id:`vueuc/x-scroll`,head:!0,anchorMetaName:fe,ssr:n}),Object.assign({selfRef:e,handleWheel:t},{scrollTo(...t){var n;(n=e.value)==null||n.scrollTo(...t)}})},render(){return n(`div`,{ref:`selfRef`,onScroll:this.onScroll,onWheel:this.disabled?void 0:this.handleWheel,class:`v-x-scroll`},this.$slots)}});function Fe(e,t=`default`,n=[]){let{children:r}=e;if(typeof r==`object`&&r&&!Array.isArray(r)){let e=r[t];if(typeof e==`function`)return e()}return n}var Ie=/\s/;function Le(e){for(var t=e.length;t--&&Ie.test(e.charAt(t)););return t}var Re=/^\s+/;function ze(e){return e&&e.slice(0,Le(e)+1).replace(Re,``)}var Be=NaN,Ve=/^[-+]0x[0-9a-f]+$/i,He=/^0b[01]+$/i,Ue=/^0o[0-7]+$/i,We=parseInt;function Ge(e){if(typeof e==`number`)return e;if(O(e))return Be;if(W(e)){var t=typeof e.valueOf==`function`?e.valueOf():e;e=W(t)?t+``:t}if(typeof e!=`string`)return e===0?e:+e;e=ze(e);var n=He.test(e);return n||Ue.test(e)?We(e.slice(2),n?2:8):Ve.test(e)?Be:+e}var Ke=function(){return le.Date.now()},qe=`Expected a function`,Je=Math.max,Ye=Math.min;function Xe(e,t,n){var r,i,a,o,s,c,l=0,u=!1,d=!1,f=!0;if(typeof e!=`function`)throw TypeError(qe);t=Ge(t)||0,W(n)&&(u=!!n.leading,d=`maxWait`in n,a=d?Je(Ge(n.maxWait)||0,t):a,f=`trailing`in n?!!n.trailing:f);function p(t){var n=r,a=i;return r=i=void 0,l=t,o=e.apply(a,n),o}function m(e){return l=e,s=setTimeout(_,t),u?p(e):o}function h(e){var n=e-c,r=e-l,i=t-n;return d?Ye(i,a-r):i}function g(e){var n=e-c,r=e-l;return c===void 0||n>=t||n<0||d&&r>=a}function _(){var e=Ke();if(g(e))return v(e);s=setTimeout(_,h(e))}function v(e){return s=void 0,f&&r?p(e):(r=i=void 0,o)}function y(){s!==void 0&&clearTimeout(s),l=0,r=c=i=s=void 0}function b(){return s===void 0?o:v(Ke())}function x(){var e=Ke(),n=g(e);if(r=arguments,i=this,c=e,n){if(s===void 0)return m(c);if(d)return clearTimeout(s),s=setTimeout(_,t),p(c)}return s===void 0&&(s=setTimeout(_,t)),o}return x.cancel=y,x.flush=b,x}var Ze=`Expected a function`;function Qe(e,t,n){var r=!0,i=!0;if(typeof e!=`function`)throw TypeError(Ze);return W(n)&&(r=`leading`in n?!!n.leading:r,i=`trailing`in n?!!n.trailing:i),Xe(e,t,{leading:r,maxWait:t,trailing:i})}var $e=M([V(`descriptions`,{fontSize:`var(--n-font-size)`},[V(`descriptions-separator`,`
 display: inline-block;
 margin: 0 8px 0 2px;
 `),V(`descriptions-table-wrapper`,[V(`descriptions-table`,[V(`descriptions-table-row`,[V(`descriptions-table-header`,{padding:`var(--n-th-padding)`}),V(`descriptions-table-content`,{padding:`var(--n-td-padding)`})])])]),K(`bordered`,[V(`descriptions-table-wrapper`,[V(`descriptions-table`,[V(`descriptions-table-row`,[M(`&:last-child`,[V(`descriptions-table-content`,{paddingBottom:0})])])])])]),F(`left-label-placement`,[V(`descriptions-table-content`,[M(`> *`,{verticalAlign:`top`})])]),F(`left-label-align`,[M(`th`,{textAlign:`left`})]),F(`center-label-align`,[M(`th`,{textAlign:`center`})]),F(`right-label-align`,[M(`th`,{textAlign:`right`})]),F(`bordered`,[V(`descriptions-table-wrapper`,`
 border-radius: var(--n-border-radius);
 overflow: hidden;
 background: var(--n-merged-td-color);
 border: 1px solid var(--n-merged-border-color);
 `,[V(`descriptions-table`,[V(`descriptions-table-row`,[M(`&:not(:last-child)`,[V(`descriptions-table-content`,{borderBottom:`1px solid var(--n-merged-border-color)`}),V(`descriptions-table-header`,{borderBottom:`1px solid var(--n-merged-border-color)`})]),V(`descriptions-table-header`,`
 font-weight: 400;
 background-clip: padding-box;
 background-color: var(--n-merged-th-color);
 `,[M(`&:not(:last-child)`,{borderRight:`1px solid var(--n-merged-border-color)`})]),V(`descriptions-table-content`,[M(`&:not(:last-child)`,{borderRight:`1px solid var(--n-merged-border-color)`})])])])])]),V(`descriptions-header`,`
 font-weight: var(--n-th-font-weight);
 font-size: 18px;
 transition: color .3s var(--n-bezier);
 line-height: var(--n-line-height);
 margin-bottom: 16px;
 color: var(--n-title-text-color);
 `),V(`descriptions-table-wrapper`,`
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[V(`descriptions-table`,`
 width: 100%;
 border-collapse: separate;
 border-spacing: 0;
 box-sizing: border-box;
 `,[V(`descriptions-table-row`,`
 box-sizing: border-box;
 transition: border-color .3s var(--n-bezier);
 `,[V(`descriptions-table-header`,`
 font-weight: var(--n-th-font-weight);
 line-height: var(--n-line-height);
 display: table-cell;
 box-sizing: border-box;
 color: var(--n-th-text-color);
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `),V(`descriptions-table-content`,`
 vertical-align: top;
 line-height: var(--n-line-height);
 display: table-cell;
 box-sizing: border-box;
 color: var(--n-td-text-color);
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[N(`content`,`
 transition: color .3s var(--n-bezier);
 display: inline-block;
 color: var(--n-td-text-color);
 `)]),N(`label`,`
 font-weight: var(--n-th-font-weight);
 transition: color .3s var(--n-bezier);
 display: inline-block;
 margin-right: 14px;
 color: var(--n-th-text-color);
 `)])])])]),V(`descriptions-table-wrapper`,`
 --n-merged-th-color: var(--n-th-color);
 --n-merged-td-color: var(--n-td-color);
 --n-merged-border-color: var(--n-border-color);
 `),L(V(`descriptions-table-wrapper`,`
 --n-merged-th-color: var(--n-th-color-modal);
 --n-merged-td-color: var(--n-td-color-modal);
 --n-merged-border-color: var(--n-border-color-modal);
 `)),I(V(`descriptions-table-wrapper`,`
 --n-merged-th-color: var(--n-th-color-popover);
 --n-merged-td-color: var(--n-td-color-popover);
 --n-merged-border-color: var(--n-border-color-popover);
 `))]),et=`DESCRIPTION_ITEM_FLAG`;function tt(e){return typeof e==`object`&&e&&!Array.isArray(e)?e.type&&e.type.DESCRIPTION_ITEM_FLAG:!1}var nt=Object.assign(Object.assign({},S.props),{title:String,column:{type:Number,default:3},columns:Number,labelPlacement:{type:String,default:`top`},labelAlign:{type:String,default:`left`},separator:{type:String,default:`:`},size:String,bordered:Boolean,labelClass:String,labelStyle:[Object,String],contentClass:String,contentStyle:[Object,String]}),rt=b({name:`Descriptions`,props:nt,slots:Object,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n,mergedComponentPropsRef:r}=x(e),i=B(()=>e.size||r?.value?.Descriptions?.size||`medium`),a=S(`Descriptions`,`-descriptions`,$e,De,e,t),o=B(()=>{let{bordered:t}=e,n=i.value,{common:{cubicBezierEaseInOut:r},self:{titleTextColor:o,thColor:s,thColorModal:c,thColorPopover:l,thTextColor:u,thFontWeight:d,tdTextColor:f,tdColor:p,tdColorModal:m,tdColorPopover:h,borderColor:g,borderColorModal:_,borderColorPopover:v,borderRadius:y,lineHeight:b,[H(`fontSize`,n)]:x,[H(t?`thPaddingBordered`:`thPadding`,n)]:S,[H(t?`tdPaddingBordered`:`tdPadding`,n)]:C}}=a.value;return{"--n-title-text-color":o,"--n-th-padding":S,"--n-td-padding":C,"--n-font-size":x,"--n-bezier":r,"--n-th-font-weight":d,"--n-line-height":b,"--n-th-text-color":u,"--n-td-text-color":f,"--n-th-color":s,"--n-th-color-modal":c,"--n-th-color-popover":l,"--n-td-color":p,"--n-td-color-modal":m,"--n-td-color-popover":h,"--n-border-radius":y,"--n-border-color":g,"--n-border-color-modal":_,"--n-border-color-popover":v}}),s=n?J(`descriptions`,B(()=>{let t=``,{bordered:n}=e;return n&&(t+=`a`),t+=i.value[0],t}),o,e):void 0;return{mergedClsPrefix:t,cssVars:n?void 0:o,themeClass:s?.themeClass,onRender:s?.onRender,compitableColumn:de(e,[`columns`,`column`]),inlineThemeDisabled:n,mergedSize:i}},render(){let e=this.$slots.default,t=e?ve(e()):[];t.length;let{contentClass:r,labelClass:i,compitableColumn:a,labelPlacement:o,labelAlign:s,mergedSize:c,bordered:l,title:u,cssVars:d,mergedClsPrefix:f,separator:p,onRender:m}=this;m?.();let h=t.filter(e=>tt(e)),g=h.reduce((e,t,s)=>{let c=t.props||{},u=h.length-1===s,d=[`label`in c?c.label:Fe(t,`label`)],m=[Fe(t)],g=c.span||1,_=e.span;e.span+=g;let v=c.labelStyle||c[`label-style`]||this.labelStyle,y=c.contentStyle||c[`content-style`]||this.contentStyle;if(o===`left`)l?e.row.push(n(`th`,{class:[`${f}-descriptions-table-header`,i],colspan:1,style:v},d),n(`td`,{class:[`${f}-descriptions-table-content`,r],colspan:u?(a-_)*2+1:g*2-1,style:y},m)):e.row.push(n(`td`,{class:`${f}-descriptions-table-content`,colspan:u?(a-_)*2:g*2},n(`span`,{class:[`${f}-descriptions-table-content__label`,i],style:v},[...d,p&&n(`span`,{class:`${f}-descriptions-separator`},p)]),n(`span`,{class:[`${f}-descriptions-table-content__content`,r],style:y},m)));else{let t=u?(a-_)*2:g*2;e.row.push(n(`th`,{class:[`${f}-descriptions-table-header`,i],colspan:t,style:v},d)),e.secondRow.push(n(`td`,{class:[`${f}-descriptions-table-content`,r],colspan:t,style:y},m))}return(e.span>=a||u)&&(e.span=0,e.row.length&&(e.rows.push(e.row),e.row=[]),o!==`left`&&e.secondRow.length&&(e.rows.push(e.secondRow),e.secondRow=[])),e},{span:0,row:[],secondRow:[],rows:[]}).rows.map(e=>n(`tr`,{class:`${f}-descriptions-table-row`},e));return n(`div`,{style:d,class:[`${f}-descriptions`,this.themeClass,`${f}-descriptions--${o}-label-placement`,`${f}-descriptions--${s}-label-align`,`${f}-descriptions--${c}-size`,l&&`${f}-descriptions--bordered`]},u||this.$slots.header?n(`div`,{class:`${f}-descriptions-header`},u||Ce(this,`header`)):null,n(`div`,{class:`${f}-descriptions-table-wrapper`},n(`table`,{class:`${f}-descriptions-table`},n(`tbody`,null,o===`top`&&n(`tr`,{class:`${f}-descriptions-table-row`,style:{visibility:`collapse`}},ne(a*2,n(`td`,null))),g))))}}),it={label:String,span:{type:Number,default:1},labelClass:String,labelStyle:[Object,String],contentClass:String,contentStyle:[Object,String]},$=b({name:`DescriptionsItem`,[et]:!0,props:it,slots:Object,render(){return null}}),at=s(`n-tabs`),ot={tab:[String,Number,Object,Function],name:{type:[String,Number],required:!0},disabled:Boolean,displayDirective:{type:String,default:`if`},closable:{type:Boolean,default:void 0},tabProps:Object,label:[String,Number,Object,Function]},st=b({__TAB_PANE__:!0,name:`TabPane`,alias:[`TabPanel`],props:ot,slots:Object,setup(e){let t=T(at,null);return t||d(`tab-pane`,"`n-tab-pane` must be placed inside `n-tabs`."),{style:t.paneStyleRef,class:t.paneClassRef,mergedClsPrefix:t.mergedClsPrefixRef}},render(){return n(`div`,{class:[`${this.mergedClsPrefix}-tab-pane`,this.class],style:this.style},this.$slots)}}),ct=Object.assign({internalLeftPadded:Boolean,internalAddable:Boolean,internalCreatedByPane:Boolean},xe(ot,[`displayDirective`])),lt=b({__TAB__:!0,inheritAttrs:!1,name:`Tab`,props:ct,setup(e){let{mergedClsPrefixRef:t,valueRef:n,typeRef:r,closableRef:i,tabStyleRef:a,addTabStyleRef:o,tabClassRef:s,addTabClassRef:c,tabChangeIdRef:l,onBeforeLeaveRef:u,triggerRef:d,handleAdd:f,activateTab:p,handleClose:m}=T(at);return{trigger:d,mergedClosable:B(()=>{if(e.internalAddable)return!1;let{closable:t}=e;return t===void 0?i.value:t}),style:a,addStyle:o,tabClass:s,addTabClass:c,clsPrefix:t,value:n,type:r,handleClose(t){t.stopPropagation(),!e.disabled&&m(e.name)},activateTab(){if(e.disabled)return;if(e.internalAddable){f();return}let{name:t}=e,r=++l.id;if(t!==n.value){let{value:i}=u;i?Promise.resolve(i(e.name,n.value)).then(e=>{e&&l.id===r&&p(t)}):p(t)}}}},render(){let{internalAddable:e,clsPrefix:t,name:r,disabled:i,label:o,tab:s,value:l,mergedClosable:u,trigger:d,$slots:{default:f}}=this,p=o??s;return n(`div`,{class:`${t}-tabs-tab-wrapper`},this.internalLeftPadded?n(`div`,{class:`${t}-tabs-tab-pad`}):null,n(`div`,Object.assign({key:r,"data-name":r,"data-disabled":i?!0:void 0},c({class:[`${t}-tabs-tab`,l===r&&`${t}-tabs-tab--active`,i&&`${t}-tabs-tab--disabled`,u&&`${t}-tabs-tab--closable`,e&&`${t}-tabs-tab--addable`,e?this.addTabClass:this.tabClass],onClick:d===`click`?this.activateTab:void 0,onMouseenter:d===`hover`?this.activateTab:void 0,style:e?this.addStyle:this.style},this.internalCreatedByPane?this.tabProps||{}:this.$attrs)),n(`span`,{class:`${t}-tabs-tab__label`},e?n(a,null,n(`div`,{class:`${t}-tabs-tab__height-placeholder`},`\xA0`),n(w,{clsPrefix:t},{default:()=>n(we,null)})):f?f():typeof p==`object`?p:Se(p??r)),u&&this.type===`card`?n(m,{clsPrefix:t,class:`${t}-tabs-tab__close`,onClick:this.handleClose,disabled:i}):null))}}),ut=V(`tabs`,`
 box-sizing: border-box;
 width: 100%;
 display: flex;
 flex-direction: column;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
`,[F(`segment-type`,[V(`tabs-rail`,[M(`&.transition-disabled`,[V(`tabs-capsule`,`
 transition: none;
 `)])])]),F(`top`,[V(`tab-pane`,`
 padding: var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left);
 `)]),F(`left`,[V(`tab-pane`,`
 padding: var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left) var(--n-pane-padding-top);
 `)]),F(`left, right`,`
 flex-direction: row;
 `,[V(`tabs-bar`,`
 width: 2px;
 right: 0;
 transition:
 top .2s var(--n-bezier),
 max-height .2s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `),V(`tabs-tab`,`
 padding: var(--n-tab-padding-vertical); 
 `)]),F(`right`,`
 flex-direction: row-reverse;
 `,[V(`tab-pane`,`
 padding: var(--n-pane-padding-left) var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom);
 `),V(`tabs-bar`,`
 left: 0;
 `)]),F(`bottom`,`
 flex-direction: column-reverse;
 justify-content: flex-end;
 `,[V(`tab-pane`,`
 padding: var(--n-pane-padding-bottom) var(--n-pane-padding-right) var(--n-pane-padding-top) var(--n-pane-padding-left);
 `),V(`tabs-bar`,`
 top: 0;
 `)]),V(`tabs-rail`,`
 position: relative;
 padding: 3px;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 background-color: var(--n-color-segment);
 transition: background-color .3s var(--n-bezier);
 display: flex;
 align-items: center;
 `,[V(`tabs-capsule`,`
 border-radius: var(--n-tab-border-radius);
 position: absolute;
 pointer-events: none;
 background-color: var(--n-tab-color-segment);
 box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .08);
 transition: transform 0.3s var(--n-bezier);
 `),V(`tabs-tab-wrapper`,`
 flex-basis: 0;
 flex-grow: 1;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[V(`tabs-tab`,`
 overflow: hidden;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[F(`active`,`
 font-weight: var(--n-font-weight-strong);
 color: var(--n-tab-text-color-active);
 `),M(`&:hover`,`
 color: var(--n-tab-text-color-hover);
 `)])])]),F(`flex`,[V(`tabs-nav`,`
 width: 100%;
 position: relative;
 `,[V(`tabs-wrapper`,`
 width: 100%;
 `,[V(`tabs-tab`,`
 margin-right: 0;
 `)])])]),V(`tabs-nav`,`
 box-sizing: border-box;
 line-height: 1.5;
 display: flex;
 transition: border-color .3s var(--n-bezier);
 `,[N(`prefix, suffix`,`
 display: flex;
 align-items: center;
 `),N(`prefix`,`padding-right: 16px;`),N(`suffix`,`padding-left: 16px;`)]),F(`top, bottom`,[M(`>`,[V(`tabs-nav`,[V(`tabs-nav-scroll-wrapper`,[M(`&::before`,`
 top: 0;
 bottom: 0;
 left: 0;
 width: 20px;
 `),M(`&::after`,`
 top: 0;
 bottom: 0;
 right: 0;
 width: 20px;
 `),F(`shadow-start`,[M(`&::before`,`
 box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, .12);
 `)]),F(`shadow-end`,[M(`&::after`,`
 box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),F(`left, right`,[V(`tabs-nav-scroll-content`,`
 flex-direction: column;
 `),M(`>`,[V(`tabs-nav`,[V(`tabs-nav-scroll-wrapper`,[M(`&::before`,`
 top: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),M(`&::after`,`
 bottom: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),F(`shadow-start`,[M(`&::before`,`
 box-shadow: inset 0 10px 8px -8px rgba(0, 0, 0, .12);
 `)]),F(`shadow-end`,[M(`&::after`,`
 box-shadow: inset 0 -10px 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),V(`tabs-nav-scroll-wrapper`,`
 flex: 1;
 position: relative;
 overflow: hidden;
 `,[V(`tabs-nav-y-scroll`,`
 height: 100%;
 width: 100%;
 overflow-y: auto; 
 scrollbar-width: none;
 `,[M(`&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb`,`
 width: 0;
 height: 0;
 display: none;
 `)]),M(`&::before, &::after`,`
 transition: box-shadow .3s var(--n-bezier);
 pointer-events: none;
 content: "";
 position: absolute;
 z-index: 1;
 `)]),V(`tabs-nav-scroll-content`,`
 display: flex;
 position: relative;
 min-width: 100%;
 min-height: 100%;
 width: fit-content;
 box-sizing: border-box;
 `),V(`tabs-wrapper`,`
 display: inline-flex;
 flex-wrap: nowrap;
 position: relative;
 `),V(`tabs-tab-wrapper`,`
 display: flex;
 flex-wrap: nowrap;
 flex-shrink: 0;
 flex-grow: 0;
 `),V(`tabs-tab`,`
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
 `,[F(`disabled`,{cursor:`not-allowed`}),N(`close`,`
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),N(`label`,`
 display: flex;
 align-items: center;
 z-index: 1;
 `)]),V(`tabs-bar`,`
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
 `,[M(`&.transition-disabled`,`
 transition: none;
 `),F(`disabled`,`
 background-color: var(--n-tab-text-color-disabled)
 `)]),V(`tabs-pane-wrapper`,`
 position: relative;
 overflow: hidden;
 transition: max-height .2s var(--n-bezier);
 `),V(`tab-pane`,`
 color: var(--n-pane-text-color);
 width: 100%;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 opacity .2s var(--n-bezier);
 left: 0;
 right: 0;
 top: 0;
 `,[M(`&.next-transition-leave-active, &.prev-transition-leave-active, &.next-transition-enter-active, &.prev-transition-enter-active`,`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 transform .2s var(--n-bezier),
 opacity .2s var(--n-bezier);
 `),M(`&.next-transition-leave-active, &.prev-transition-leave-active`,`
 position: absolute;
 `),M(`&.next-transition-enter-from, &.prev-transition-leave-to`,`
 transform: translateX(32px);
 opacity: 0;
 `),M(`&.next-transition-leave-to, &.prev-transition-enter-from`,`
 transform: translateX(-32px);
 opacity: 0;
 `),M(`&.next-transition-leave-from, &.next-transition-enter-to, &.prev-transition-leave-from, &.prev-transition-enter-to`,`
 transform: translateX(0);
 opacity: 1;
 `)]),V(`tabs-tab-pad`,`
 box-sizing: border-box;
 width: var(--n-tab-gap);
 flex-grow: 0;
 flex-shrink: 0;
 `),F(`line-type, bar-type`,[V(`tabs-tab`,`
 font-weight: var(--n-tab-font-weight);
 box-sizing: border-box;
 vertical-align: bottom;
 `,[M(`&:hover`,{color:`var(--n-tab-text-color-hover)`}),F(`active`,`
 color: var(--n-tab-text-color-active);
 font-weight: var(--n-tab-font-weight-active);
 `),F(`disabled`,{color:`var(--n-tab-text-color-disabled)`})])]),V(`tabs-nav`,[F(`line-type`,[F(`top`,[N(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),V(`tabs-nav-scroll-content`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),V(`tabs-bar`,`
 bottom: -1px;
 `)]),F(`left`,[N(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),V(`tabs-nav-scroll-content`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),V(`tabs-bar`,`
 right: -1px;
 `)]),F(`right`,[N(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),V(`tabs-nav-scroll-content`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),V(`tabs-bar`,`
 left: -1px;
 `)]),F(`bottom`,[N(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),V(`tabs-nav-scroll-content`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),V(`tabs-bar`,`
 top: -1px;
 `)]),N(`prefix, suffix`,`
 transition: border-color .3s var(--n-bezier);
 `),V(`tabs-nav-scroll-content`,`
 transition: border-color .3s var(--n-bezier);
 `),V(`tabs-bar`,`
 border-radius: 0;
 `)]),F(`card-type`,[N(`prefix, suffix`,`
 transition: border-color .3s var(--n-bezier);
 `),V(`tabs-pad`,`
 flex-grow: 1;
 transition: border-color .3s var(--n-bezier);
 `),V(`tabs-tab-pad`,`
 transition: border-color .3s var(--n-bezier);
 `),V(`tabs-tab`,`
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
 `,[F(`addable`,`
 padding-left: 8px;
 padding-right: 8px;
 font-size: 16px;
 justify-content: center;
 `,[N(`height-placeholder`,`
 width: 0;
 font-size: var(--n-tab-font-size);
 `),K(`disabled`,[M(`&:hover`,`
 color: var(--n-tab-text-color-hover);
 `)])]),F(`closable`,`padding-right: 8px;`),F(`active`,`
 background-color: #0000;
 font-weight: var(--n-tab-font-weight-active);
 color: var(--n-tab-text-color-active);
 `),F(`disabled`,`color: var(--n-tab-text-color-disabled);`)])]),F(`left, right`,`
 flex-direction: column; 
 `,[N(`prefix, suffix`,`
 padding: var(--n-tab-padding-vertical);
 `),V(`tabs-wrapper`,`
 flex-direction: column;
 `),V(`tabs-tab-wrapper`,`
 flex-direction: column;
 `,[V(`tabs-tab-pad`,`
 height: var(--n-tab-gap-vertical);
 width: 100%;
 `)])]),F(`top`,[F(`card-type`,[V(`tabs-scroll-padding`,`border-bottom: 1px solid var(--n-tab-border-color);`),N(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),V(`tabs-tab`,`
 border-top-left-radius: var(--n-tab-border-radius);
 border-top-right-radius: var(--n-tab-border-radius);
 `,[F(`active`,`
 border-bottom: 1px solid #0000;
 `)]),V(`tabs-tab-pad`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),V(`tabs-pad`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `)])]),F(`left`,[F(`card-type`,[V(`tabs-scroll-padding`,`border-right: 1px solid var(--n-tab-border-color);`),N(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),V(`tabs-tab`,`
 border-top-left-radius: var(--n-tab-border-radius);
 border-bottom-left-radius: var(--n-tab-border-radius);
 `,[F(`active`,`
 border-right: 1px solid #0000;
 `)]),V(`tabs-tab-pad`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),V(`tabs-pad`,`
 border-right: 1px solid var(--n-tab-border-color);
 `)])]),F(`right`,[F(`card-type`,[V(`tabs-scroll-padding`,`border-left: 1px solid var(--n-tab-border-color);`),N(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),V(`tabs-tab`,`
 border-top-right-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[F(`active`,`
 border-left: 1px solid #0000;
 `)]),V(`tabs-tab-pad`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),V(`tabs-pad`,`
 border-left: 1px solid var(--n-tab-border-color);
 `)])]),F(`bottom`,[F(`card-type`,[V(`tabs-scroll-padding`,`border-top: 1px solid var(--n-tab-border-color);`),N(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),V(`tabs-tab`,`
 border-bottom-left-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[F(`active`,`
 border-top: 1px solid #0000;
 `)]),V(`tabs-tab-pad`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),V(`tabs-pad`,`
 border-top: 1px solid var(--n-tab-border-color);
 `)])])])]),dt=Qe,ft=Object.assign(Object.assign({},S.props),{value:[String,Number],defaultValue:[String,Number],trigger:{type:String,default:`click`},type:{type:String,default:`bar`},closable:Boolean,justifyContent:String,size:String,placement:{type:String,default:`top`},tabStyle:[String,Object],tabClass:String,addTabStyle:[String,Object],addTabClass:String,barWidth:Number,paneClass:String,paneStyle:[String,Object],paneWrapperClass:String,paneWrapperStyle:[String,Object],addable:[Boolean,Object],tabsPadding:{type:Number,default:0},animated:Boolean,onBeforeLeave:Function,onAdd:Function,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onClose:[Function,Array],labelSize:String,activeName:[String,Number],onActiveNameChange:[Function,Array]}),pt=b({name:`Tabs`,props:ft,slots:Object,setup(t,{slots:n}){let{mergedClsPrefixRef:r,inlineThemeDisabled:i,mergedComponentPropsRef:a}=x(t),o=S(`Tabs`,`-tabs`,ut,Ee,t,r),s=P(null),c=P(null),l=P(null),u=P(null),d=P(null),f=P(null),p=P(!0),m=P(!0),h=de(t,[`labelSize`,`size`]),g=B(()=>h.value?h.value:a?.value?.Tabs?.size||`medium`),_=de(t,[`activeName`,`value`]),y=P(_.value??t.defaultValue??(n.default?ve(n.default())[0]?.props?.name:null)),b=ye(_,y),w={id:0},T=B(()=>{if(!(!t.justifyContent||t.type===`card`))return{display:`flex`,justifyContent:t.justifyContent}});z(b,()=>{w.id=0,O(),A()});function ee(){let{value:e}=b;return e===null?null:s.value?.querySelector(`[data-name="${e}"]`)}function ne(e){if(t.type===`card`)return;let{value:n}=c;if(!n)return;let i=n.style.opacity===`0`;if(e){let a=`${r.value}-tabs-bar--disabled`,{barWidth:o,placement:s}=t;if(e.dataset.disabled===`true`?n.classList.add(a):n.classList.remove(a),[`top`,`bottom`].includes(s)){if(D([`top`,`maxHeight`,`height`]),typeof o==`number`&&e.offsetWidth>=o){let t=Math.floor((e.offsetWidth-o)/2)+e.offsetLeft;n.style.left=`${t}px`,n.style.maxWidth=`${o}px`}else n.style.left=`${e.offsetLeft}px`,n.style.maxWidth=`${e.offsetWidth}px`;n.style.width=`8192px`,i&&(n.style.transition=`none`),n.offsetWidth,i&&(n.style.transition=``,n.style.opacity=`1`)}else{if(D([`left`,`maxWidth`,`width`]),typeof o==`number`&&e.offsetHeight>=o){let t=Math.floor((e.offsetHeight-o)/2)+e.offsetTop;n.style.top=`${t}px`,n.style.maxHeight=`${o}px`}else n.style.top=`${e.offsetTop}px`,n.style.maxHeight=`${e.offsetHeight}px`;n.style.height=`8192px`,i&&(n.style.transition=`none`),n.offsetHeight,i&&(n.style.transition=``,n.style.opacity=`1`)}}}function E(){if(t.type===`card`)return;let{value:e}=c;e&&(e.style.opacity=`0`)}function D(e){let{value:t}=c;if(t)for(let n of e)t.style[n]=``}function O(){if(t.type===`card`)return;let e=ee();e?ne(e):E()}function A(){let e=d.value?.$el;if(!e)return;let t=ee();if(!t)return;let{scrollLeft:n,offsetWidth:r}=e,{offsetLeft:i,offsetWidth:a}=t;n>i?e.scrollTo({top:0,left:i,behavior:`smooth`}):i+a>n+r&&e.scrollTo({top:0,left:i+a-r,behavior:`smooth`})}let j=P(null),M=0,N=null;function re(e){let t=j.value;if(t){M=e.getBoundingClientRect().height;let n=`${M}px`,r=()=>{t.style.height=n,t.style.maxHeight=n};N?(r(),N(),N=null):N=r}}function F(e){let t=j.value;if(t){let n=e.getBoundingClientRect().height,r=()=>{document.body.offsetHeight,t.style.maxHeight=`${n}px`,t.style.height=`${Math.max(M,n)}px`};N?(N(),N=null,r()):N=r}}function I(){let e=j.value;if(e){e.style.maxHeight=``,e.style.height=``;let{paneWrapperStyle:n}=t;if(typeof n==`string`)e.style.cssText=n;else if(n){let{maxHeight:t,height:r}=n;t!==void 0&&(e.style.maxHeight=t),r!==void 0&&(e.style.height=r)}}}let L={value:[]},V=P(`next`);function ie(e){let t=b.value,n=`next`;for(let r of L.value){if(r===t)break;if(r===e){n=`prev`;break}}V.value=n,W(e)}function W(e){let{onActiveNameChange:n,onUpdateValue:r,"onUpdate:value":i}=t;n&&v(n,e),r&&v(r,e),i&&v(i,e),y.value=e}function oe(e){let{onClose:n}=t;n&&v(n,e)}let G=!0;function K(){let{value:e}=c;if(!e)return;G||=!1;let t=`transition-disabled`;e.classList.add(t),O(),e.classList.remove(t)}let q=P(null);function se({transitionDisabled:e}){let t=s.value;if(!t)return;e&&t.classList.add(`transition-disabled`);let n=ee();n&&q.value&&(q.value.style.width=`${n.offsetWidth}px`,q.value.style.height=`${n.offsetHeight}px`,q.value.style.transform=`translateX(${n.offsetLeft-ae(getComputedStyle(t).paddingLeft)}px)`,e&&q.value.offsetWidth),e&&t.classList.remove(`transition-disabled`)}z([b],()=>{t.type===`segment`&&C(()=>{se({transitionDisabled:!1})})}),te(()=>{t.type===`segment`&&se({transitionDisabled:!0})});let ce=0;function le(e){if(e.contentRect.width===0&&e.contentRect.height===0||ce===e.contentRect.width)return;ce=e.contentRect.width;let{type:n}=t;if((n===`line`||n===`bar`)&&(G||t.justifyContent?.startsWith(`space`))&&K(),n!==`segment`){let{placement:e}=t;ge((e===`top`||e===`bottom`?d.value?.$el:f.value)||null)}}let fe=dt(le,64);z([()=>t.justifyContent,()=>t.size],()=>{C(()=>{let{type:e}=t;(e===`line`||e===`bar`)&&K()})});let Y=P(!1);function pe(e){let{target:n,contentRect:{width:r,height:i}}=e,a=n.parentElement.parentElement.offsetWidth,o=n.parentElement.parentElement.offsetHeight,{placement:s}=t;if(!Y.value)s===`top`||s===`bottom`?a<r&&(Y.value=!0):o<i&&(Y.value=!0);else{let{value:e}=u;if(!e)return;s===`top`||s===`bottom`?a-r>e.$el.offsetWidth&&(Y.value=!1):o-i>e.$el.offsetHeight&&(Y.value=!1)}ge(d.value?.$el||null)}let me=dt(pe,64);function he(){let{onAdd:e}=t;e&&e(),C(()=>{let e=ee(),{value:t}=d;!e||!t||t.scrollTo({left:e.offsetLeft,top:0,behavior:`smooth`})})}function ge(e){if(!e)return;let{placement:n}=t;if(n===`top`||n===`bottom`){let{scrollLeft:t,scrollWidth:n,offsetWidth:r}=e;p.value=t<=0,m.value=t+r>=n}else{let{scrollTop:t,scrollHeight:n,offsetHeight:r}=e;p.value=t<=0,m.value=t+r>=n}}let _e=dt(e=>{ge(e.target)},64);e(at,{triggerRef:U(t,`trigger`),tabStyleRef:U(t,`tabStyle`),tabClassRef:U(t,`tabClass`),addTabStyleRef:U(t,`addTabStyle`),addTabClassRef:U(t,`addTabClass`),paneClassRef:U(t,`paneClass`),paneStyleRef:U(t,`paneStyle`),mergedClsPrefixRef:r,typeRef:U(t,`type`),closableRef:U(t,`closable`),valueRef:b,tabChangeIdRef:w,onBeforeLeaveRef:U(t,`onBeforeLeave`),activateTab:ie,handleClose:oe,handleAdd:he}),ue(()=>{O(),A()}),k(()=>{let{value:e}=l;if(!e)return;let{value:t}=r,n=`${t}-tabs-nav-scroll-wrapper--shadow-start`,i=`${t}-tabs-nav-scroll-wrapper--shadow-end`;p.value?e.classList.remove(n):e.classList.add(n),m.value?e.classList.remove(i):e.classList.add(i)});let be={syncBarPosition:()=>{O()}},xe=()=>{se({transitionDisabled:!0})},Se=B(()=>{let{value:e}=g,{type:n}=t,r=`${e}${{card:`Card`,bar:`Bar`,line:`Line`,segment:`Segment`}[n]}`,{self:{barColor:i,closeIconColor:a,closeIconColorHover:s,closeIconColorPressed:c,tabColor:l,tabBorderColor:u,paneTextColor:d,tabFontWeight:f,tabBorderRadius:p,tabFontWeightActive:m,colorSegment:h,fontWeightStrong:_,tabColorSegment:v,closeSize:y,closeIconSize:b,closeColorHover:x,closeColorPressed:S,closeBorderRadius:C,[H(`panePadding`,e)]:w,[H(`tabPadding`,r)]:T,[H(`tabPaddingVertical`,r)]:ee,[H(`tabGap`,r)]:te,[H(`tabGap`,`${r}Vertical`)]:ne,[H(`tabTextColor`,n)]:E,[H(`tabTextColorActive`,n)]:D,[H(`tabTextColorHover`,n)]:O,[H(`tabTextColorDisabled`,n)]:k,[H(`tabFontSize`,e)]:A},common:{cubicBezierEaseInOut:j}}=o.value;return{"--n-bezier":j,"--n-color-segment":h,"--n-bar-color":i,"--n-tab-font-size":A,"--n-tab-text-color":E,"--n-tab-text-color-active":D,"--n-tab-text-color-disabled":k,"--n-tab-text-color-hover":O,"--n-pane-text-color":d,"--n-tab-border-color":u,"--n-tab-border-radius":p,"--n-close-size":y,"--n-close-icon-size":b,"--n-close-color-hover":x,"--n-close-color-pressed":S,"--n-close-border-radius":C,"--n-close-icon-color":a,"--n-close-icon-color-hover":s,"--n-close-icon-color-pressed":c,"--n-tab-color":l,"--n-tab-font-weight":f,"--n-tab-font-weight-active":m,"--n-tab-padding":T,"--n-tab-padding-vertical":ee,"--n-tab-gap":te,"--n-tab-gap-vertical":ne,"--n-pane-padding-left":R(w,`left`),"--n-pane-padding-right":R(w,`right`),"--n-pane-padding-top":R(w,`top`),"--n-pane-padding-bottom":R(w,`bottom`),"--n-font-weight-strong":_,"--n-tab-color-segment":v}}),Ce=i?J(`tabs`,B(()=>`${g.value[0]}${t.type[0]}`),Se,t):void 0;return Object.assign({mergedClsPrefix:r,mergedValue:b,renderedNames:new Set,segmentCapsuleElRef:q,tabsPaneWrapperRef:j,tabsElRef:s,barElRef:c,addTabInstRef:u,xScrollInstRef:d,scrollWrapperElRef:l,addTabFixed:Y,tabWrapperStyle:T,handleNavResize:fe,mergedSize:g,handleScroll:_e,handleTabsResize:me,cssVars:i?void 0:Se,themeClass:Ce?.themeClass,animationDirection:V,renderNameListRef:L,yScrollElRef:f,handleSegmentResize:xe,onAnimationBeforeLeave:re,onAnimationEnter:F,onAnimationAfterEnter:I,onRender:Ce?.onRender},be)},render(){let{mergedClsPrefix:e,type:t,placement:i,addTabFixed:a,addable:o,mergedSize:s,renderNameListRef:c,onRender:l,paneWrapperClass:u,paneWrapperStyle:d,$slots:{default:f,prefix:p,suffix:m}}=this;l?.();let h=f?ve(f()).filter(e=>e.type.__TAB_PANE__===!0):[],_=f?ve(f()).filter(e=>e.type.__TAB__===!0):[],v=!_.length,y=t===`card`,b=t===`segment`,x=!y&&!b&&this.justifyContent;c.value=[];let S=()=>{let t=n(`div`,{style:this.tabWrapperStyle,class:`${e}-tabs-wrapper`},x?null:n(`div`,{class:`${e}-tabs-scroll-padding`,style:i===`top`||i===`bottom`?{width:`${this.tabsPadding}px`}:{height:`${this.tabsPadding}px`}}),v?h.map((e,t)=>(c.value.push(e.props.name),_t(n(lt,Object.assign({},e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0&&(!x||x===`center`||x===`start`||x===`end`)}),e.children?{default:e.children.tab}:void 0)))):_.map((e,t)=>(c.value.push(e.props.name),_t(t!==0&&!x?gt(e):e))),!a&&o&&y?ht(o,(v?h.length:_.length)!==0):null,x?null:n(`div`,{class:`${e}-tabs-scroll-padding`,style:{width:`${this.tabsPadding}px`}}));return n(`div`,{ref:`tabsElRef`,class:`${e}-tabs-nav-scroll-content`},y&&o?n(r,{onResize:this.handleTabsResize},{default:()=>t}):t,y?n(`div`,{class:`${e}-tabs-pad`}):null,y?null:n(`div`,{ref:`barElRef`,class:`${e}-tabs-bar`}))},C=b?`top`:i;return n(`div`,{class:[`${e}-tabs`,this.themeClass,`${e}-tabs--${t}-type`,`${e}-tabs--${s}-size`,x&&`${e}-tabs--flex`,`${e}-tabs--${C}`],style:this.cssVars},n(`div`,{class:[`${e}-tabs-nav--${t}-type`,`${e}-tabs-nav--${C}`,`${e}-tabs-nav`]},g(p,t=>t&&n(`div`,{class:`${e}-tabs-nav__prefix`},t)),b?n(r,{onResize:this.handleSegmentResize},{default:()=>n(`div`,{class:`${e}-tabs-rail`,ref:`tabsElRef`},n(`div`,{class:`${e}-tabs-capsule`,ref:`segmentCapsuleElRef`},n(`div`,{class:`${e}-tabs-wrapper`},n(`div`,{class:`${e}-tabs-tab`}))),v?h.map((e,t)=>(c.value.push(e.props.name),n(lt,Object.assign({},e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0}),e.children?{default:e.children.tab}:void 0))):_.map((e,t)=>(c.value.push(e.props.name),t===0?e:gt(e))))}):n(r,{onResize:this.handleNavResize},{default:()=>n(`div`,{class:`${e}-tabs-nav-scroll-wrapper`,ref:`scrollWrapperElRef`},[`top`,`bottom`].includes(C)?n(Q,{ref:`xScrollInstRef`,onScroll:this.handleScroll},{default:S}):n(`div`,{class:`${e}-tabs-nav-y-scroll`,onScroll:this.handleScroll,ref:`yScrollElRef`},S()))}),a&&o&&y?ht(o,!0):null,g(m,t=>t&&n(`div`,{class:`${e}-tabs-nav__suffix`},t))),v&&(this.animated&&(C===`top`||C===`bottom`)?n(`div`,{ref:`tabsPaneWrapperRef`,style:d,class:[`${e}-tabs-pane-wrapper`,u]},mt(h,this.mergedValue,this.renderedNames,this.onAnimationBeforeLeave,this.onAnimationEnter,this.onAnimationAfterEnter,this.animationDirection)):mt(h,this.mergedValue,this.renderedNames)))}});function mt(e,t,r,a,o,s,c){let l=[];return e.forEach(e=>{let{name:n,displayDirective:a,"display-directive":o}=e.props,s=e=>a===e||o===e,c=t===n;if(e.key!==void 0&&(e.key=n),c||s(`show`)||s(`show:lazy`)&&r.has(n)){r.has(n)||r.add(n);let t=!s(`if`);l.push(t?q(e,[[i,c]]):e)}}),c?n(ce,{name:`${c}-transition`,onBeforeLeave:a,onEnter:o,onAfterEnter:s},{default:()=>l}):l}function ht(e,t){return n(lt,{ref:`addTabInstRef`,key:`__addable`,name:`__addable`,internalCreatedByPane:!0,internalAddable:!0,internalLeftPadded:t,disabled:typeof e==`object`&&e.disabled})}function gt(e){let n=t(e);return n.props?n.props.internalLeftPadded=!0:n.props={internalLeftPadded:!0},n}function _t(e){return Array.isArray(e.dynamicProps)?e.dynamicProps.includes(`internalLeftPadded`)||e.dynamicProps.push(`internalLeftPadded`):e.dynamicProps=[`internalLeftPadded`],e}var vt=5e3;function yt(){let e=P([]),t=P(!1),n;function r(r,a,o){i(),e.value=[];let s=`/api/docker/containers/${encodeURIComponent(r)}/logs/stream?sinceMin=${a}&tail=${o}`;n=new EventSource(s),n.onopen=()=>{t.value=!0},n.onerror=()=>{t.value=!1},n.onmessage=t=>{try{let n=JSON.parse(t.data);e.value.push(n),e.value.length>vt&&e.value.splice(0,e.value.length-vt)}catch{}}}function i(){n?.close(),n=void 0,t.value=!1}return{lines:e,connected:t,open:r,close:i}}var bt={key:1,class:`tab-loading`},xt={key:0,class:`log-empty`},St={key:0,class:`log-empty`},Ct={key:0,class:`log-ts`},wt={class:`log-text`},Tt=500,Et=oe(b({__name:`DockerView`,setup(e){let{t}=ie(),r=Oe();function i(e){return e instanceof j&&e.status===503&&!!e.body&&typeof e.body==`object`&&`enabled`in e.body}function s(e,t){r.error(e instanceof j?e.message:t)}let c=e=>e===`running`?`success`:e===`paused`||e===`restarting`?`warning`:e===`dead`?`error`:`default`,l={running:0,restarting:1,paused:2,created:3,exited:4,dead:5};function d(e){return l[e.state]??6}function m(e,t){return e.hasStats?t(e.stats):-1}let g=P([]),v=P(!0),b=P(null),x;async function S(){try{let e=await X.containers();g.value=e.containers,b.value=null}catch(e){i(e)&&(b.value=e.body)}finally{v.value=!1}}async function w(e,n){try{let t=await X.containerAction(e,n);g.value=t.containers}catch(e){s(e,t(`docker.actionFailed`,{action:n}))}}let T=P(!1),ne=P(``),O=P(``),k=P(15),M=[{label:t(`docker.logs.last5m`),value:5},{label:t(`docker.logs.last10m`),value:10},{label:t(`docker.logs.last15m`),value:15},{label:t(`docker.logs.last1h`),value:60},{label:t(`docker.logs.last6h`),value:360},{label:t(`docker.logs.last24h`),value:1440}],N=yt(),F=P(null),I=P(!0),L=P(!1),R;function V(e,t){L.value=!1,R&&clearTimeout(R),R=setTimeout(()=>{N.connected.value||(L.value=!0)},6e3),N.open(e,t,Tt)}function H(){I.value=!0,V(ne.value,k.value)}function U(e){ne.value=e.id,O.value=e.name,T.value=!0,I.value=!0,V(e.id,k.value)}z(k,e=>{T.value&&(I.value=!0,V(ne.value,e))}),z(T,e=>{e||(N.close(),R&&clearTimeout(R))}),z(N.connected,e=>{e&&(L.value=!1,R&&clearTimeout(R))}),z(()=>N.lines.value.length,async()=>{if(!I.value)return;await C();let e=F.value;e&&(e.scrollTop=e.scrollHeight)});function W(){let e=F.value;if(!e)return;let t=e.scrollHeight-e.scrollTop-e.clientHeight<24;I.value=t}function ae(e){if(!e)return``;let t=new Date(e);return Number.isNaN(t.getTime())?``:t.toLocaleTimeString()}let oe=B(()=>[{title:t(`common.name`),key:`name`,width:160,ellipsis:{tooltip:!0},sorter:(e,t)=>e.name.localeCompare(t.name)},{title:`Image`,key:`image`,width:180,ellipsis:{tooltip:!0},sorter:(e,t)=>e.image.localeCompare(t.image)},{title:`Status`,key:`state`,width:130,sorter:(e,t)=>d(e)-d(t),render:e=>n(Te,{type:c(e.state),size:`small`},{default:()=>e.status})},{title:`CPU`,key:`cpu`,width:70,sorter:(e,t)=>m(e,e=>e.cpuPercent)-m(t,e=>e.cpuPercent),render:e=>e.hasStats?`${e.stats.cpuPercent.toFixed(1)}%`:`—`},{title:`RAM`,key:`ram`,width:150,sorter:(e,t)=>m(e,e=>e.memUsageBytes)-m(t,e=>e.memUsageBytes),render:e=>e.hasStats?`${Z(e.stats.memUsageBytes)} / ${Z(e.stats.memLimitBytes)}`:`—`},{title:`Network`,key:`net`,width:140,sorter:(e,t)=>m(e,e=>e.netRxBytes+e.netTxBytes)-m(t,e=>e.netRxBytes+e.netTxBytes),render:e=>e.hasStats?`↓ ${Z(e.stats.netRxBytes)} ↑ ${Z(e.stats.netTxBytes)}`:`—`},{title:`Ports`,key:`ports`,width:220,ellipsis:{tooltip:!0}},{title:t(`common.actions`),key:`actions`,width:270,render:e=>n(je,{size:`small`},()=>[e.state===`running`?[n(E,{size:`tiny`,onClick:()=>w(e.id,`stop`)},()=>`Stop`),n(E,{size:`tiny`,onClick:()=>w(e.id,`restart`)},()=>`Restart`)]:n(E,{size:`tiny`,type:`primary`,onClick:()=>w(e.id,`start`)},()=>`Start`),n(E,{size:`tiny`,quaternary:!0,onClick:()=>U(e)},()=>t(`docker.logs.button`)),n(Me,{onPositiveClick:()=>w(e.id,`remove`)},{trigger:()=>n(E,{size:`tiny`,type:`error`,ghost:!0},()=>t(`common.delete`)),default:()=>t(`docker.confirmDeleteContainer`,{name:e.name})})])}]),K=P([]),q=P(!0),J=P(null);async function ce(){q.value=!0;try{let e=await X.images();K.value=e.images,J.value=null}catch(e){i(e)&&(J.value=e.body)}finally{q.value=!1}}async function le(e){try{let t=await X.removeImage(e);K.value=t.images}catch(e){s(e,t(`docker.removeImageFailed`))}}let ue=B(()=>[{title:`Tag`,key:`tag`,minWidth:200,ellipsis:{tooltip:!0},sorter:(e,t)=>e.tag.localeCompare(t.tag),render:e=>e.dangling?n(je,{size:`small`,align:`center`},()=>[e.tag,n(Te,{size:`small`,type:`warning`},()=>`dangling`)]):e.tag},{title:t(`common.size`),key:`sizeBytes`,width:110,sorter:(e,t)=>e.sizeBytes-t.sizeBytes,render:e=>Z(e.sizeBytes)},{title:t(`docker.usedColumn`),key:`containers`,width:140,sorter:(e,t)=>e.containers-t.containers,render:e=>e.containers<0?`—`:e.containers===0?t(`docker.notUsed`):t(`docker.containerCount`,{count:e.containers})},{title:t(`docker.created`),key:`created`,width:150,sorter:(e,t)=>Date.parse(e.created)-Date.parse(t.created),render:e=>Ne(e.created)},{title:t(`common.actions`),key:`actions`,width:100,render:e=>n(Me,{onPositiveClick:()=>le(e.id)},{trigger:()=>n(E,{size:`tiny`,type:`error`,ghost:!0},()=>t(`common.delete`)),default:()=>t(`docker.confirmDeleteImage`,{tag:e.tag})})}]),de=P([]),fe=P(!0),Y=P(null);async function ve(){fe.value=!0;try{let e=await X.volumes();de.value=e.volumes,Y.value=null}catch(e){i(e)&&(Y.value=e.body)}finally{fe.value=!1}}async function ye(e){try{let t=await X.removeVolume(e);de.value=t.volumes}catch(e){s(e,t(`docker.removeVolumeFailed`))}}let xe=B(()=>[{title:t(`common.name`),key:`name`,minWidth:180,ellipsis:{tooltip:!0},sorter:(e,t)=>e.name.localeCompare(t.name)},{title:`Driver`,key:`driver`,width:100,sorter:(e,t)=>e.driver.localeCompare(t.driver)},{title:t(`common.size`),key:`sizeBytes`,width:110,sorter:(e,t)=>e.sizeBytes-t.sizeBytes,render:e=>e.sizeBytes<0?t(`docker.unknown`):Z(e.sizeBytes)},{title:`Status`,key:`inUse`,width:120,sorter:(e,t)=>Number(e.inUse)-Number(t.inUse),render:e=>n(Te,{size:`small`,type:e.inUse?`success`:`default`},()=>e.inUse?t(`docker.used`):t(`docker.notUsed`))},{title:t(`common.actions`),key:`actions`,width:100,render:e=>n(Me,{onPositiveClick:()=>ye(e.name)},{trigger:()=>n(E,{size:`tiny`,type:`error`,ghost:!0},()=>t(`common.delete`)),default:()=>t(`docker.confirmDeleteVolume`,{name:e.name})})}]),Se=P([]),Ce=P(!0),we=P(null);async function Ee(){Ce.value=!0;try{let e=await X.networks();Se.value=e.networks,we.value=null}catch(e){i(e)&&(we.value=e.body)}finally{Ce.value=!1}}async function De(e){try{let t=await X.removeNetwork(e);Se.value=t.networks}catch(e){s(e,t(`docker.removeNetworkFailed`))}}let Pe=B(()=>[{title:t(`common.name`),key:`name`,minWidth:160,ellipsis:{tooltip:!0},sorter:(e,t)=>e.name.localeCompare(t.name),render:e=>e.builtin?n(je,{size:`small`,align:`center`},()=>[e.name,n(Te,{size:`small`},()=>`builtin`)]):e.name},{title:`Driver`,key:`driver`,width:100,sorter:(e,t)=>e.driver.localeCompare(t.driver)},{title:`Subnet`,key:`subnet`,width:150,sorter:(e,t)=>e.subnet.localeCompare(t.subnet),render:e=>e.subnet||`—`},{title:t(`docker.connectedContainers`),key:`connectedCount`,width:170,sorter:(e,t)=>e.connectedCount-t.connectedCount},{title:t(`common.actions`),key:`actions`,width:100,render:e=>e.builtin?null:n(Me,{onPositiveClick:()=>De(e.id)},{trigger:()=>n(E,{size:`tiny`,type:`error`,ghost:!0},()=>t(`common.delete`)),default:()=>t(`docker.confirmDeleteNetwork`,{name:e.name})})}]),Q=P(null),Fe=P(!0),Ie=P(null),Le=P(null);async function Re(){Fe.value=!0;try{Q.value=await X.settings(),Ie.value=null}catch(e){i(e)&&(Ie.value=e.body)}finally{Fe.value=!1}}async function ze(e){Le.value=e;try{Q.value=await X.prune(e),r.success(t(`docker.cleanupDone`))}catch(n){s(n,t(`docker.cleanupFailed`,{kind:e}))}finally{Le.value=null}}let Be=P(`containers`),Ve=new Set([`containers`]);return z(Be,e=>{Ve.has(e)||(Ve.add(e),e===`images`?ce():e===`volumes`?ve():e===`networks`?Ee():e===`settings`&&Re())}),te(()=>{S(),x=setInterval(S,5e3)}),ee(()=>{x&&clearInterval(x),R&&clearTimeout(R),N.close()}),(e,n)=>(y(),h(pe,null,{default:G(()=>[f(D(pt),{type:`line`,value:Be.value,"onUpdate:value":n[0]||=e=>Be.value=e},{default:G(()=>[f(D(st),{name:`containers`,tab:`Containers`},{default:G(()=>[b.value?(y(),h(D(be),{key:0,type:`warning`,title:b.value.error},null,8,[`title`])):(y(),h(D(_e),{key:1,columns:oe.value,data:g.value,loading:v.value,"row-key":e=>e.id,"scroll-x":1200},null,8,[`columns`,`data`,`loading`,`row-key`]))]),_:1}),f(D(st),{name:`images`,tab:`Images`},{default:G(()=>[J.value?(y(),h(D(be),{key:0,type:`warning`,title:J.value.error},null,8,[`title`])):(y(),h(D(_e),{key:1,columns:ue.value,data:K.value,loading:q.value,"row-key":e=>e.id,"scroll-x":700},null,8,[`columns`,`data`,`loading`,`row-key`]))]),_:1}),f(D(st),{name:`volumes`,tab:`Volumes`},{default:G(()=>[Y.value?(y(),h(D(be),{key:0,type:`warning`,title:Y.value.error},null,8,[`title`])):(y(),h(D(_e),{key:1,columns:xe.value,data:de.value,loading:fe.value,"row-key":e=>e.name,"scroll-x":610},null,8,[`columns`,`data`,`loading`,`row-key`]))]),_:1}),f(D(st),{name:`networks`,tab:`Networks`},{default:G(()=>[we.value?(y(),h(D(be),{key:0,type:`warning`,title:we.value.error},null,8,[`title`])):(y(),h(D(_e),{key:1,columns:Pe.value,data:Se.value,loading:Ce.value,"row-key":e=>e.id,"scroll-x":680},null,8,[`columns`,`data`,`loading`,`row-key`]))]),_:1}),f(D(st),{name:`settings`,tab:`Settings`},{default:G(()=>[Ie.value?(y(),h(D(be),{key:0,type:`warning`,title:Ie.value.error},null,8,[`title`])):Fe.value&&!Q.value?(y(),o(`div`,bt,[f(D(me),{size:`large`})])):Q.value?(y(),h(D(je),{key:3,vertical:``,size:24},{default:G(()=>[f(D(rt),{title:D(t)(`docker.daemonInfo`),column:2,bordered:``,"label-placement":`left`},{default:G(()=>[f(D($),{label:D(t)(`docker.serverVersion`)},{default:G(()=>[u(A(Q.value?.info.serverVersion),1)]),_:1},8,[`label`]),f(D($),{label:`OS / Kernel`},{default:G(()=>[u(A(Q.value?.info.operatingSystem)+` / `+A(Q.value?.info.kernelVersion),1)]),_:1}),f(D($),{label:`Storage Driver`},{default:G(()=>[u(A(Q.value?.info.storageDriver),1)]),_:1}),f(D($),{label:`Root Dir`},{default:G(()=>[u(A(Q.value?.info.dockerRootDir),1)]),_:1}),f(D($),{label:`Container`},{default:G(()=>[u(A(Q.value?.info.containersRunning)+` running, `+A(Q.value?.info.containersPaused)+` paused, `+A(Q.value?.info.containersStopped)+` stopped `,1)]),_:1}),f(D($),{label:`Images`},{default:G(()=>[u(A(Q.value?.info.images),1)]),_:1})]),_:1},8,[`title`]),f(D(rt),{title:`Disk Usage`,column:2,bordered:``,"label-placement":`left`},{default:G(()=>[f(D($),{label:`Images`},{default:G(()=>[u(A(D(Z)(Q.value?.diskUsage.imagesTotalBytes??0))+` (reclaimable `+A(D(Z)(Q.value?.diskUsage.imagesReclaimableBytes??0))+`) `,1)]),_:1}),f(D($),{label:`Containers`},{default:G(()=>[u(A(D(Z)(Q.value?.diskUsage.containersTotalBytes??0)),1)]),_:1}),f(D($),{label:`Volumes`},{default:G(()=>[u(A(D(Z)(Q.value?.diskUsage.volumesTotalBytes??0))+` (reclaimable `+A(D(Z)(Q.value?.diskUsage.volumesReclaimableBytes??0))+`) `,1)]),_:1})]),_:1}),f(D(je),null,{default:G(()=>[(y(),o(a,null,re([`containers`,`images`,`volumes`,`networks`,`all`],e=>f(D(Me),{key:e,onPositiveClick:t=>ze(e)},{trigger:G(()=>[f(D(E),{size:`small`,loading:Le.value===e},{default:G(()=>[u(A(D(t)(`docker.cleanup`))+` `+A(e),1)]),_:2},1032,[`loading`])]),default:G(()=>[u(` `+A(D(t)(`docker.confirmCleanup`,{kind:e})),1)]),_:2},1032,[`onPositiveClick`])),64))]),_:1})]),_:1})):(y(),h(D(he),{key:2,description:D(t)(`docker.noData`)},null,8,[`description`]))]),_:1})]),_:1},8,[`value`]),f(D(ke),{show:T.value,"onUpdate:show":n[2]||=e=>T.value=e,width:640,placement:`right`},{default:G(()=>[f(D(Ae),{title:D(t)(`docker.logs.title`,{name:O.value}),closable:``},{default:G(()=>[f(D(ge),{value:k.value,"onUpdate:value":n[1]||=e=>k.value=e,options:M,size:`small`,style:{width:`150px`,"margin-bottom":`10px`}},null,8,[`value`]),D(N).lines.value.length===0&&!D(N).connected.value?(y(),o(`div`,xt,[p(`p`,null,A(L.value?D(t)(`docker.logs.connectingSlow`):D(t)(`docker.logs.connecting`)),1),L.value?(y(),h(D(E),{key:0,size:`tiny`,onClick:H},{default:G(()=>[u(A(D(t)(`docker.logs.reconnect`)),1)]),_:1})):_(``,!0)])):_(``,!0),p(`div`,{ref_key:`logScrollEl`,ref:F,class:`log-scroll`,onScroll:W},[D(N).lines.value.length===0&&D(N).connected.value?(y(),o(`p`,St,A(D(t)(`docker.logs.waiting`)),1)):_(``,!0),(y(!0),o(a,null,re(D(N).lines.value,(e,t)=>(y(),o(`div`,{key:t,class:se([`log-line`,{"log-line--stderr":e.stream===`stderr`}])},[e.timestamp?(y(),o(`span`,Ct,A(ae(e.timestamp)),1)):_(``,!0),p(`span`,wt,A(e.text),1)],2))),128))],544)]),_:1},8,[`title`])]),_:1},8,[`show`])]),_:1}))}}),[[`__scopeId`,`data-v-3327d4f0`]]);export{Et as default};