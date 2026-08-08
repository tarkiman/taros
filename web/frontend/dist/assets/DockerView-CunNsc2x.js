import{$n as e,An as t,Bn as n,Bt as r,Cn as i,Dn as a,Fn as o,Gt as s,Hn as c,Ht as l,In as u,It as d,Ln as f,Mn as p,N as m,Nn as h,Nt as g,Pn as _,Pt as v,Qn as y,Rn as b,Tt as x,U as S,Un as C,V as w,Vn as T,Xn as ee,Yn as te,Zt as ne,_ as E,_r as D,_t as O,ar as k,br as A,c as j,cn as M,dn as N,dr as P,er as re,fn as F,gn as I,hn as ie,in as ae,ir as L,jn as R,ln as z,m as oe,mn as B,mr as V,mt as H,nn as se,o as ce,or as U,pn as le,sr as W,vr as ue,wt as de,xn as G,xt as K}from"./auth-D-ZdZG47.js";import{C as fe,S as pe,g as me,h as q,t as he,u as ge}from"./AppShell-BFlhvNz6.js";import{i as _e,r as ve,t as ye}from"./DataTable-DZV6-98b.js";import{u as J}from"./useTheme-NUJdbCI0.js";import{c as be,n as Y}from"./LocaleSwitcher-Bsvejt90.js";import{n as xe,t as Se}from"./render-BidHjRi4.js";import{t as Ce}from"./get-slot-6kXJmSMP.js";import{t as X}from"./Add-BvhvVu9T.js";import{t as we}from"./Tag-CHK5lLpz.js";import{n as Te,r as Ee}from"./light-wqZ8r8w_.js";import{t as De}from"./use-message-D39UPyl-.js";import{n as Oe,t as ke}from"./DrawerContent-DGn2Pixr.js";import{t as Ae}from"./Space-Coiv6z0K.js";import{t as je}from"./Popconfirm-C1FXoVv9.js";import{t as Z}from"./docker-BG3gz3N3.js";import{n as Me,t as Q}from"./format-BxLcbkc3.js";var Ne=q(`.v-x-scroll`,{overflow:`auto`,scrollbarWidth:`none`},[q(`&::-webkit-scrollbar`,{width:0,height:0})]),Pe=b({name:`XScroll`,props:{disabled:Boolean,onScroll:Function},setup(){let e=P(null);function t(e){!(e.currentTarget.offsetWidth<e.currentTarget.scrollWidth)||e.deltaY===0||(e.currentTarget.scrollLeft+=e.deltaY+e.deltaX,e.preventDefault())}let n=l();return Ne.mount({id:`vueuc/x-scroll`,head:!0,anchorMetaName:me,ssr:n}),Object.assign({selfRef:e,handleWheel:t},{scrollTo(...t){var n;(n=e.value)==null||n.scrollTo(...t)}})},render(){return n(`div`,{ref:`selfRef`,onScroll:this.onScroll,onWheel:this.disabled?void 0:this.handleWheel,class:`v-x-scroll`},this.$slots)}});function Fe(e,t=`default`,n=[]){let{children:r}=e;if(typeof r==`object`&&r&&!Array.isArray(r)){let e=r[t];if(typeof e==`function`)return e()}return n}var Ie=/\s/;function Le(e){for(var t=e.length;t--&&Ie.test(e.charAt(t)););return t}var Re=/^\s+/;function ze(e){return e&&e.slice(0,Le(e)+1).replace(Re,``)}var Be=NaN,Ve=/^[-+]0x[0-9a-f]+$/i,He=/^0b[01]+$/i,Ue=/^0o[0-7]+$/i,We=parseInt;function Ge(e){if(typeof e==`number`)return e;if(O(e))return Be;if(H(e)){var t=typeof e.valueOf==`function`?e.valueOf():e;e=H(t)?t+``:t}if(typeof e!=`string`)return e===0?e:+e;e=ze(e);var n=He.test(e);return n||Ue.test(e)?We(e.slice(2),n?2:8):Ve.test(e)?Be:+e}var Ke=function(){return K.Date.now()},qe=`Expected a function`,Je=Math.max,Ye=Math.min;function Xe(e,t,n){var r,i,a,o,s,c,l=0,u=!1,d=!1,f=!0;if(typeof e!=`function`)throw TypeError(qe);t=Ge(t)||0,H(n)&&(u=!!n.leading,d=`maxWait`in n,a=d?Je(Ge(n.maxWait)||0,t):a,f=`trailing`in n?!!n.trailing:f);function p(t){var n=r,a=i;return r=i=void 0,l=t,o=e.apply(a,n),o}function m(e){return l=e,s=setTimeout(_,t),u?p(e):o}function h(e){var n=e-c,r=e-l,i=t-n;return d?Ye(i,a-r):i}function g(e){var n=e-c,r=e-l;return c===void 0||n>=t||n<0||d&&r>=a}function _(){var e=Ke();if(g(e))return v(e);s=setTimeout(_,h(e))}function v(e){return s=void 0,f&&r?p(e):(r=i=void 0,o)}function y(){s!==void 0&&clearTimeout(s),l=0,r=c=i=s=void 0}function b(){return s===void 0?o:v(Ke())}function x(){var e=Ke(),n=g(e);if(r=arguments,i=this,c=e,n){if(s===void 0)return m(c);if(d)return clearTimeout(s),s=setTimeout(_,t),p(c)}return s===void 0&&(s=setTimeout(_,t)),o}return x.cancel=y,x.flush=b,x}var Ze=`Expected a function`;function Qe(e,t,n){var r=!0,i=!0;if(typeof e!=`function`)throw TypeError(Ze);return H(n)&&(r=`leading`in n?!!n.leading:r,i=`trailing`in n?!!n.trailing:i),Xe(e,t,{leading:r,maxWait:t,trailing:i})}var $e=M([z(`descriptions`,{fontSize:`var(--n-font-size)`},[z(`descriptions-separator`,`
 display: inline-block;
 margin: 0 8px 0 2px;
 `),z(`descriptions-table-wrapper`,[z(`descriptions-table`,[z(`descriptions-table-row`,[z(`descriptions-table-header`,{padding:`var(--n-th-padding)`}),z(`descriptions-table-content`,{padding:`var(--n-td-padding)`})])])]),le(`bordered`,[z(`descriptions-table-wrapper`,[z(`descriptions-table`,[z(`descriptions-table-row`,[M(`&:last-child`,[z(`descriptions-table-content`,{paddingBottom:0})])])])])]),F(`left-label-placement`,[z(`descriptions-table-content`,[M(`> *`,{verticalAlign:`top`})])]),F(`left-label-align`,[M(`th`,{textAlign:`left`})]),F(`center-label-align`,[M(`th`,{textAlign:`center`})]),F(`right-label-align`,[M(`th`,{textAlign:`right`})]),F(`bordered`,[z(`descriptions-table-wrapper`,`
 border-radius: var(--n-border-radius);
 overflow: hidden;
 background: var(--n-merged-td-color);
 border: 1px solid var(--n-merged-border-color);
 `,[z(`descriptions-table`,[z(`descriptions-table-row`,[M(`&:not(:last-child)`,[z(`descriptions-table-content`,{borderBottom:`1px solid var(--n-merged-border-color)`}),z(`descriptions-table-header`,{borderBottom:`1px solid var(--n-merged-border-color)`})]),z(`descriptions-table-header`,`
 font-weight: 400;
 background-clip: padding-box;
 background-color: var(--n-merged-th-color);
 `,[M(`&:not(:last-child)`,{borderRight:`1px solid var(--n-merged-border-color)`})]),z(`descriptions-table-content`,[M(`&:not(:last-child)`,{borderRight:`1px solid var(--n-merged-border-color)`})])])])])]),z(`descriptions-header`,`
 font-weight: var(--n-th-font-weight);
 font-size: 18px;
 transition: color .3s var(--n-bezier);
 line-height: var(--n-line-height);
 margin-bottom: 16px;
 color: var(--n-title-text-color);
 `),z(`descriptions-table-wrapper`,`
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[z(`descriptions-table`,`
 width: 100%;
 border-collapse: separate;
 border-spacing: 0;
 box-sizing: border-box;
 `,[z(`descriptions-table-row`,`
 box-sizing: border-box;
 transition: border-color .3s var(--n-bezier);
 `,[z(`descriptions-table-header`,`
 font-weight: var(--n-th-font-weight);
 line-height: var(--n-line-height);
 display: table-cell;
 box-sizing: border-box;
 color: var(--n-th-text-color);
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `),z(`descriptions-table-content`,`
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
 `)])])])]),z(`descriptions-table-wrapper`,`
 --n-merged-th-color: var(--n-th-color);
 --n-merged-td-color: var(--n-td-color);
 --n-merged-border-color: var(--n-border-color);
 `),ie(z(`descriptions-table-wrapper`,`
 --n-merged-th-color: var(--n-th-color-modal);
 --n-merged-td-color: var(--n-td-color-modal);
 --n-merged-border-color: var(--n-border-color-modal);
 `)),I(z(`descriptions-table-wrapper`,`
 --n-merged-th-color: var(--n-th-color-popover);
 --n-merged-td-color: var(--n-td-color-popover);
 --n-merged-border-color: var(--n-border-color-popover);
 `))]),et=`DESCRIPTION_ITEM_FLAG`;function tt(e){return typeof e==`object`&&e&&!Array.isArray(e)?e.type&&e.type.DESCRIPTION_ITEM_FLAG:!1}var nt=Object.assign(Object.assign({},S.props),{title:String,column:{type:Number,default:3},columns:Number,labelPlacement:{type:String,default:`top`},labelAlign:{type:String,default:`left`},separator:{type:String,default:`:`},size:String,bordered:Boolean,labelClass:String,labelStyle:[Object,String],contentClass:String,contentStyle:[Object,String]}),rt=b({name:`Descriptions`,props:nt,slots:Object,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n,mergedComponentPropsRef:r}=x(e),i=R(()=>e.size||r?.value?.Descriptions?.size||`medium`),a=S(`Descriptions`,`-descriptions`,$e,Ee,e,t),o=R(()=>{let{bordered:t}=e,n=i.value,{common:{cubicBezierEaseInOut:r},self:{titleTextColor:o,thColor:s,thColorModal:c,thColorPopover:l,thTextColor:u,thFontWeight:d,tdTextColor:f,tdColor:p,tdColorModal:m,tdColorPopover:h,borderColor:g,borderColorModal:_,borderColorPopover:v,borderRadius:y,lineHeight:b,[B(`fontSize`,n)]:x,[B(t?`thPaddingBordered`:`thPadding`,n)]:S,[B(t?`tdPaddingBordered`:`tdPadding`,n)]:C}}=a.value;return{"--n-title-text-color":o,"--n-th-padding":S,"--n-td-padding":C,"--n-font-size":x,"--n-bezier":r,"--n-th-font-weight":d,"--n-line-height":b,"--n-th-text-color":u,"--n-td-text-color":f,"--n-th-color":s,"--n-th-color-modal":c,"--n-th-color-popover":l,"--n-td-color":p,"--n-td-color-modal":m,"--n-td-color-popover":h,"--n-border-radius":y,"--n-border-color":g,"--n-border-color-modal":_,"--n-border-color-popover":v}}),s=n?de(`descriptions`,R(()=>{let t=``,{bordered:n}=e;return n&&(t+=`a`),t+=i.value[0],t}),o,e):void 0;return{mergedClsPrefix:t,cssVars:n?void 0:o,themeClass:s?.themeClass,onRender:s?.onRender,compitableColumn:pe(e,[`columns`,`column`]),inlineThemeDisabled:n,mergedSize:i}},render(){let e=this.$slots.default,t=e?J(e()):[];t.length;let{contentClass:r,labelClass:i,compitableColumn:a,labelPlacement:o,labelAlign:s,mergedSize:c,bordered:l,title:u,cssVars:d,mergedClsPrefix:f,separator:p,onRender:m}=this;m?.();let h=t.filter(e=>tt(e)),g=h.reduce((e,t,s)=>{let c=t.props||{},u=h.length-1===s,d=[`label`in c?c.label:Fe(t,`label`)],m=[Fe(t)],g=c.span||1,_=e.span;e.span+=g;let v=c.labelStyle||c[`label-style`]||this.labelStyle,y=c.contentStyle||c[`content-style`]||this.contentStyle;if(o===`left`)l?e.row.push(n(`th`,{class:[`${f}-descriptions-table-header`,i],colspan:1,style:v},d),n(`td`,{class:[`${f}-descriptions-table-content`,r],colspan:u?(a-_)*2+1:g*2-1,style:y},m)):e.row.push(n(`td`,{class:`${f}-descriptions-table-content`,colspan:u?(a-_)*2:g*2},n(`span`,{class:[`${f}-descriptions-table-content__label`,i],style:v},[...d,p&&n(`span`,{class:`${f}-descriptions-separator`},p)]),n(`span`,{class:[`${f}-descriptions-table-content__content`,r],style:y},m)));else{let t=u?(a-_)*2:g*2;e.row.push(n(`th`,{class:[`${f}-descriptions-table-header`,i],colspan:t,style:v},d)),e.secondRow.push(n(`td`,{class:[`${f}-descriptions-table-content`,r],colspan:t,style:y},m))}return(e.span>=a||u)&&(e.span=0,e.row.length&&(e.rows.push(e.row),e.row=[]),o!==`left`&&e.secondRow.length&&(e.rows.push(e.secondRow),e.secondRow=[])),e},{span:0,row:[],secondRow:[],rows:[]}).rows.map(e=>n(`tr`,{class:`${f}-descriptions-table-row`},e));return n(`div`,{style:d,class:[`${f}-descriptions`,this.themeClass,`${f}-descriptions--${o}-label-placement`,`${f}-descriptions--${s}-label-align`,`${f}-descriptions--${c}-size`,l&&`${f}-descriptions--bordered`]},u||this.$slots.header?n(`div`,{class:`${f}-descriptions-header`},u||Ce(this,`header`)):null,n(`div`,{class:`${f}-descriptions-table-wrapper`},n(`table`,{class:`${f}-descriptions-table`},n(`tbody`,null,o===`top`&&n(`tr`,{class:`${f}-descriptions-table-row`,style:{visibility:`collapse`}},ne(a*2,n(`td`,null))),g))))}}),it={label:String,span:{type:Number,default:1},labelClass:String,labelStyle:[Object,String],contentClass:String,contentStyle:[Object,String]},$=b({name:`DescriptionsItem`,[et]:!0,props:it,slots:Object,render(){return null}}),at=s(`n-tabs`),ot={tab:[String,Number,Object,Function],name:{type:[String,Number],required:!0},disabled:Boolean,displayDirective:{type:String,default:`if`},closable:{type:Boolean,default:void 0},tabProps:Object,label:[String,Number,Object,Function]},st=b({__TAB_PANE__:!0,name:`TabPane`,alias:[`TabPanel`],props:ot,slots:Object,setup(e){let t=T(at,null);return t||d(`tab-pane`,"`n-tab-pane` must be placed inside `n-tabs`."),{style:t.paneStyleRef,class:t.paneClassRef,mergedClsPrefix:t.mergedClsPrefixRef}},render(){return n(`div`,{class:[`${this.mergedClsPrefix}-tab-pane`,this.class],style:this.style},this.$slots)}}),ct=Object.assign({internalLeftPadded:Boolean,internalAddable:Boolean,internalCreatedByPane:Boolean},xe(ot,[`displayDirective`])),lt=b({__TAB__:!0,inheritAttrs:!1,name:`Tab`,props:ct,setup(e){let{mergedClsPrefixRef:t,valueRef:n,typeRef:r,closableRef:i,tabStyleRef:a,addTabStyleRef:o,tabClassRef:s,addTabClassRef:c,tabChangeIdRef:l,onBeforeLeaveRef:u,triggerRef:d,handleAdd:f,activateTab:p,handleClose:m}=T(at);return{trigger:d,mergedClosable:R(()=>{if(e.internalAddable)return!1;let{closable:t}=e;return t===void 0?i.value:t}),style:a,addStyle:o,tabClass:s,addTabClass:c,clsPrefix:t,value:n,type:r,handleClose(t){t.stopPropagation(),!e.disabled&&m(e.name)},activateTab(){if(e.disabled)return;if(e.internalAddable){f();return}let{name:t}=e,r=++l.id;if(t!==n.value){let{value:i}=u;i?Promise.resolve(i(e.name,n.value)).then(e=>{e&&l.id===r&&p(t)}):p(t)}}}},render(){let{internalAddable:e,clsPrefix:t,name:r,disabled:i,label:o,tab:s,value:l,mergedClosable:u,trigger:d,$slots:{default:f}}=this,p=o??s;return n(`div`,{class:`${t}-tabs-tab-wrapper`},this.internalLeftPadded?n(`div`,{class:`${t}-tabs-tab-pad`}):null,n(`div`,Object.assign({key:r,"data-name":r,"data-disabled":i?!0:void 0},c({class:[`${t}-tabs-tab`,l===r&&`${t}-tabs-tab--active`,i&&`${t}-tabs-tab--disabled`,u&&`${t}-tabs-tab--closable`,e&&`${t}-tabs-tab--addable`,e?this.addTabClass:this.tabClass],onClick:d===`click`?this.activateTab:void 0,onMouseenter:d===`hover`?this.activateTab:void 0,style:e?this.addStyle:this.style},this.internalCreatedByPane?this.tabProps||{}:this.$attrs)),n(`span`,{class:`${t}-tabs-tab__label`},e?n(a,null,n(`div`,{class:`${t}-tabs-tab__height-placeholder`},`\xA0`),n(w,{clsPrefix:t},{default:()=>n(X,null)})):f?f():typeof p==`object`?p:Se(p??r)),u&&this.type===`card`?n(m,{clsPrefix:t,class:`${t}-tabs-tab__close`,onClick:this.handleClose,disabled:i}):null))}}),ut=z(`tabs`,`
 box-sizing: border-box;
 width: 100%;
 display: flex;
 flex-direction: column;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
`,[F(`segment-type`,[z(`tabs-rail`,[M(`&.transition-disabled`,[z(`tabs-capsule`,`
 transition: none;
 `)])])]),F(`top`,[z(`tab-pane`,`
 padding: var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left);
 `)]),F(`left`,[z(`tab-pane`,`
 padding: var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left) var(--n-pane-padding-top);
 `)]),F(`left, right`,`
 flex-direction: row;
 `,[z(`tabs-bar`,`
 width: 2px;
 right: 0;
 transition:
 top .2s var(--n-bezier),
 max-height .2s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `),z(`tabs-tab`,`
 padding: var(--n-tab-padding-vertical); 
 `)]),F(`right`,`
 flex-direction: row-reverse;
 `,[z(`tab-pane`,`
 padding: var(--n-pane-padding-left) var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom);
 `),z(`tabs-bar`,`
 left: 0;
 `)]),F(`bottom`,`
 flex-direction: column-reverse;
 justify-content: flex-end;
 `,[z(`tab-pane`,`
 padding: var(--n-pane-padding-bottom) var(--n-pane-padding-right) var(--n-pane-padding-top) var(--n-pane-padding-left);
 `),z(`tabs-bar`,`
 top: 0;
 `)]),z(`tabs-rail`,`
 position: relative;
 padding: 3px;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 background-color: var(--n-color-segment);
 transition: background-color .3s var(--n-bezier);
 display: flex;
 align-items: center;
 `,[z(`tabs-capsule`,`
 border-radius: var(--n-tab-border-radius);
 position: absolute;
 pointer-events: none;
 background-color: var(--n-tab-color-segment);
 box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .08);
 transition: transform 0.3s var(--n-bezier);
 `),z(`tabs-tab-wrapper`,`
 flex-basis: 0;
 flex-grow: 1;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[z(`tabs-tab`,`
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
 `)])])]),F(`flex`,[z(`tabs-nav`,`
 width: 100%;
 position: relative;
 `,[z(`tabs-wrapper`,`
 width: 100%;
 `,[z(`tabs-tab`,`
 margin-right: 0;
 `)])])]),z(`tabs-nav`,`
 box-sizing: border-box;
 line-height: 1.5;
 display: flex;
 transition: border-color .3s var(--n-bezier);
 `,[N(`prefix, suffix`,`
 display: flex;
 align-items: center;
 `),N(`prefix`,`padding-right: 16px;`),N(`suffix`,`padding-left: 16px;`)]),F(`top, bottom`,[M(`>`,[z(`tabs-nav`,[z(`tabs-nav-scroll-wrapper`,[M(`&::before`,`
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
 `)])])])])]),F(`left, right`,[z(`tabs-nav-scroll-content`,`
 flex-direction: column;
 `),M(`>`,[z(`tabs-nav`,[z(`tabs-nav-scroll-wrapper`,[M(`&::before`,`
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
 `)])])])])]),z(`tabs-nav-scroll-wrapper`,`
 flex: 1;
 position: relative;
 overflow: hidden;
 `,[z(`tabs-nav-y-scroll`,`
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
 `)]),z(`tabs-nav-scroll-content`,`
 display: flex;
 position: relative;
 min-width: 100%;
 min-height: 100%;
 width: fit-content;
 box-sizing: border-box;
 `),z(`tabs-wrapper`,`
 display: inline-flex;
 flex-wrap: nowrap;
 position: relative;
 `),z(`tabs-tab-wrapper`,`
 display: flex;
 flex-wrap: nowrap;
 flex-shrink: 0;
 flex-grow: 0;
 `),z(`tabs-tab`,`
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
 `)]),z(`tabs-bar`,`
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
 `)]),z(`tabs-pane-wrapper`,`
 position: relative;
 overflow: hidden;
 transition: max-height .2s var(--n-bezier);
 `),z(`tab-pane`,`
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
 `)]),z(`tabs-tab-pad`,`
 box-sizing: border-box;
 width: var(--n-tab-gap);
 flex-grow: 0;
 flex-shrink: 0;
 `),F(`line-type, bar-type`,[z(`tabs-tab`,`
 font-weight: var(--n-tab-font-weight);
 box-sizing: border-box;
 vertical-align: bottom;
 `,[M(`&:hover`,{color:`var(--n-tab-text-color-hover)`}),F(`active`,`
 color: var(--n-tab-text-color-active);
 font-weight: var(--n-tab-font-weight-active);
 `),F(`disabled`,{color:`var(--n-tab-text-color-disabled)`})])]),z(`tabs-nav`,[F(`line-type`,[F(`top`,[N(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),z(`tabs-nav-scroll-content`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),z(`tabs-bar`,`
 bottom: -1px;
 `)]),F(`left`,[N(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),z(`tabs-nav-scroll-content`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),z(`tabs-bar`,`
 right: -1px;
 `)]),F(`right`,[N(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),z(`tabs-nav-scroll-content`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),z(`tabs-bar`,`
 left: -1px;
 `)]),F(`bottom`,[N(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),z(`tabs-nav-scroll-content`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),z(`tabs-bar`,`
 top: -1px;
 `)]),N(`prefix, suffix`,`
 transition: border-color .3s var(--n-bezier);
 `),z(`tabs-nav-scroll-content`,`
 transition: border-color .3s var(--n-bezier);
 `),z(`tabs-bar`,`
 border-radius: 0;
 `)]),F(`card-type`,[N(`prefix, suffix`,`
 transition: border-color .3s var(--n-bezier);
 `),z(`tabs-pad`,`
 flex-grow: 1;
 transition: border-color .3s var(--n-bezier);
 `),z(`tabs-tab-pad`,`
 transition: border-color .3s var(--n-bezier);
 `),z(`tabs-tab`,`
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
 `),le(`disabled`,[M(`&:hover`,`
 color: var(--n-tab-text-color-hover);
 `)])]),F(`closable`,`padding-right: 8px;`),F(`active`,`
 background-color: #0000;
 font-weight: var(--n-tab-font-weight-active);
 color: var(--n-tab-text-color-active);
 `),F(`disabled`,`color: var(--n-tab-text-color-disabled);`)])]),F(`left, right`,`
 flex-direction: column; 
 `,[N(`prefix, suffix`,`
 padding: var(--n-tab-padding-vertical);
 `),z(`tabs-wrapper`,`
 flex-direction: column;
 `),z(`tabs-tab-wrapper`,`
 flex-direction: column;
 `,[z(`tabs-tab-pad`,`
 height: var(--n-tab-gap-vertical);
 width: 100%;
 `)])]),F(`top`,[F(`card-type`,[z(`tabs-scroll-padding`,`border-bottom: 1px solid var(--n-tab-border-color);`),N(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),z(`tabs-tab`,`
 border-top-left-radius: var(--n-tab-border-radius);
 border-top-right-radius: var(--n-tab-border-radius);
 `,[F(`active`,`
 border-bottom: 1px solid #0000;
 `)]),z(`tabs-tab-pad`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),z(`tabs-pad`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `)])]),F(`left`,[F(`card-type`,[z(`tabs-scroll-padding`,`border-right: 1px solid var(--n-tab-border-color);`),N(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),z(`tabs-tab`,`
 border-top-left-radius: var(--n-tab-border-radius);
 border-bottom-left-radius: var(--n-tab-border-radius);
 `,[F(`active`,`
 border-right: 1px solid #0000;
 `)]),z(`tabs-tab-pad`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),z(`tabs-pad`,`
 border-right: 1px solid var(--n-tab-border-color);
 `)])]),F(`right`,[F(`card-type`,[z(`tabs-scroll-padding`,`border-left: 1px solid var(--n-tab-border-color);`),N(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),z(`tabs-tab`,`
 border-top-right-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[F(`active`,`
 border-left: 1px solid #0000;
 `)]),z(`tabs-tab-pad`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),z(`tabs-pad`,`
 border-left: 1px solid var(--n-tab-border-color);
 `)])]),F(`bottom`,[F(`card-type`,[z(`tabs-scroll-padding`,`border-top: 1px solid var(--n-tab-border-color);`),N(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),z(`tabs-tab`,`
 border-bottom-left-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[F(`active`,`
 border-top: 1px solid #0000;
 `)]),z(`tabs-tab-pad`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),z(`tabs-pad`,`
 border-top: 1px solid var(--n-tab-border-color);
 `)])])])]),dt=Qe,ft=Object.assign(Object.assign({},S.props),{value:[String,Number],defaultValue:[String,Number],trigger:{type:String,default:`click`},type:{type:String,default:`bar`},closable:Boolean,justifyContent:String,size:String,placement:{type:String,default:`top`},tabStyle:[String,Object],tabClass:String,addTabStyle:[String,Object],addTabClass:String,barWidth:Number,paneClass:String,paneStyle:[String,Object],paneWrapperClass:String,paneWrapperStyle:[String,Object],addable:[Boolean,Object],tabsPadding:{type:Number,default:0},animated:Boolean,onBeforeLeave:Function,onAdd:Function,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onClose:[Function,Array],labelSize:String,activeName:[String,Number],onActiveNameChange:[Function,Array]}),pt=b({name:`Tabs`,props:ft,slots:Object,setup(t,{slots:n}){let{mergedClsPrefixRef:r,inlineThemeDisabled:i,mergedComponentPropsRef:a}=x(t),o=S(`Tabs`,`-tabs`,ut,Te,t,r),s=P(null),c=P(null),l=P(null),u=P(null),d=P(null),f=P(null),p=P(!0),m=P(!0),h=pe(t,[`labelSize`,`size`]),g=R(()=>h.value?h.value:a?.value?.Tabs?.size||`medium`),_=pe(t,[`activeName`,`value`]),y=P(_.value??t.defaultValue??(n.default?J(n.default())[0]?.props?.name:null)),b=be(_,y),w={id:0},T=R(()=>{if(!(!t.justifyContent||t.type===`card`))return{display:`flex`,justifyContent:t.justifyContent}});L(b,()=>{w.id=0,O(),A()});function ee(){let{value:e}=b;return e===null?null:s.value?.querySelector(`[data-name="${e}"]`)}function ne(e){if(t.type===`card`)return;let{value:n}=c;if(!n)return;let i=n.style.opacity===`0`;if(e){let a=`${r.value}-tabs-bar--disabled`,{barWidth:o,placement:s}=t;if(e.dataset.disabled===`true`?n.classList.add(a):n.classList.remove(a),[`top`,`bottom`].includes(s)){if(D([`top`,`maxHeight`,`height`]),typeof o==`number`&&e.offsetWidth>=o){let t=Math.floor((e.offsetWidth-o)/2)+e.offsetLeft;n.style.left=`${t}px`,n.style.maxWidth=`${o}px`}else n.style.left=`${e.offsetLeft}px`,n.style.maxWidth=`${e.offsetWidth}px`;n.style.width=`8192px`,i&&(n.style.transition=`none`),n.offsetWidth,i&&(n.style.transition=``,n.style.opacity=`1`)}else{if(D([`left`,`maxWidth`,`width`]),typeof o==`number`&&e.offsetHeight>=o){let t=Math.floor((e.offsetHeight-o)/2)+e.offsetTop;n.style.top=`${t}px`,n.style.maxHeight=`${o}px`}else n.style.top=`${e.offsetTop}px`,n.style.maxHeight=`${e.offsetHeight}px`;n.style.height=`8192px`,i&&(n.style.transition=`none`),n.offsetHeight,i&&(n.style.transition=``,n.style.opacity=`1`)}}}function E(){if(t.type===`card`)return;let{value:e}=c;e&&(e.style.opacity=`0`)}function D(e){let{value:t}=c;if(t)for(let n of e)t.style[n]=``}function O(){if(t.type===`card`)return;let e=ee();e?ne(e):E()}function A(){let e=d.value?.$el;if(!e)return;let t=ee();if(!t)return;let{scrollLeft:n,offsetWidth:r}=e,{offsetLeft:i,offsetWidth:a}=t;n>i?e.scrollTo({top:0,left:i,behavior:`smooth`}):i+a>n+r&&e.scrollTo({top:0,left:i+a-r,behavior:`smooth`})}let j=P(null),M=0,N=null;function re(e){let t=j.value;if(t){M=e.getBoundingClientRect().height;let n=`${M}px`,r=()=>{t.style.height=n,t.style.maxHeight=n};N?(r(),N(),N=null):N=r}}function F(e){let t=j.value;if(t){let n=e.getBoundingClientRect().height,r=()=>{document.body.offsetHeight,t.style.maxHeight=`${n}px`,t.style.height=`${Math.max(M,n)}px`};N?(N(),N=null,r()):N=r}}function I(){let e=j.value;if(e){e.style.maxHeight=``,e.style.height=``;let{paneWrapperStyle:n}=t;if(typeof n==`string`)e.style.cssText=n;else if(n){let{maxHeight:t,height:r}=n;t!==void 0&&(e.style.maxHeight=t),r!==void 0&&(e.style.height=r)}}}let ie={value:[]},z=P(`next`);function oe(e){let t=b.value,n=`next`;for(let r of ie.value){if(r===t)break;if(r===e){n=`prev`;break}}z.value=n,H(e)}function H(e){let{onActiveNameChange:n,onUpdateValue:r,"onUpdate:value":i}=t;n&&v(n,e),r&&v(r,e),i&&v(i,e),y.value=e}function ce(e){let{onClose:n}=t;n&&v(n,e)}let U=!0;function le(){let{value:e}=c;if(!e)return;U||=!1;let t=`transition-disabled`;e.classList.add(t),O(),e.classList.remove(t)}let W=P(null);function ue({transitionDisabled:e}){let t=s.value;if(!t)return;e&&t.classList.add(`transition-disabled`);let n=ee();n&&W.value&&(W.value.style.width=`${n.offsetWidth}px`,W.value.style.height=`${n.offsetHeight}px`,W.value.style.transform=`translateX(${n.offsetLeft-se(getComputedStyle(t).paddingLeft)}px)`,e&&W.value.offsetWidth),e&&t.classList.remove(`transition-disabled`)}L([b],()=>{t.type===`segment`&&C(()=>{ue({transitionDisabled:!1})})}),te(()=>{t.type===`segment`&&ue({transitionDisabled:!0})});let G=0;function K(e){if(e.contentRect.width===0&&e.contentRect.height===0||G===e.contentRect.width)return;G=e.contentRect.width;let{type:n}=t;if((n===`line`||n===`bar`)&&(U||t.justifyContent?.startsWith(`space`))&&le(),n!==`segment`){let{placement:e}=t;ve((e===`top`||e===`bottom`?d.value?.$el:f.value)||null)}}let me=dt(K,64);L([()=>t.justifyContent,()=>t.size],()=>{C(()=>{let{type:e}=t;(e===`line`||e===`bar`)&&le()})});let q=P(!1);function he(e){let{target:n,contentRect:{width:r,height:i}}=e,a=n.parentElement.parentElement.offsetWidth,o=n.parentElement.parentElement.offsetHeight,{placement:s}=t;if(!q.value)s===`top`||s===`bottom`?a<r&&(q.value=!0):o<i&&(q.value=!0);else{let{value:e}=u;if(!e)return;s===`top`||s===`bottom`?a-r>e.$el.offsetWidth&&(q.value=!1):o-i>e.$el.offsetHeight&&(q.value=!1)}ve(d.value?.$el||null)}let ge=dt(he,64);function _e(){let{onAdd:e}=t;e&&e(),C(()=>{let e=ee(),{value:t}=d;!e||!t||t.scrollTo({left:e.offsetLeft,top:0,behavior:`smooth`})})}function ve(e){if(!e)return;let{placement:n}=t;if(n===`top`||n===`bottom`){let{scrollLeft:t,scrollWidth:n,offsetWidth:r}=e;p.value=t<=0,m.value=t+r>=n}else{let{scrollTop:t,scrollHeight:n,offsetHeight:r}=e;p.value=t<=0,m.value=t+r>=n}}let ye=dt(e=>{ve(e.target)},64);e(at,{triggerRef:V(t,`trigger`),tabStyleRef:V(t,`tabStyle`),tabClassRef:V(t,`tabClass`),addTabStyleRef:V(t,`addTabStyle`),addTabClassRef:V(t,`addTabClass`),paneClassRef:V(t,`paneClass`),paneStyleRef:V(t,`paneStyle`),mergedClsPrefixRef:r,typeRef:V(t,`type`),closableRef:V(t,`closable`),valueRef:b,tabChangeIdRef:w,onBeforeLeaveRef:V(t,`onBeforeLeave`),activateTab:oe,handleClose:ce,handleAdd:_e}),fe(()=>{O(),A()}),k(()=>{let{value:e}=l;if(!e)return;let{value:t}=r,n=`${t}-tabs-nav-scroll-wrapper--shadow-start`,i=`${t}-tabs-nav-scroll-wrapper--shadow-end`;p.value?e.classList.remove(n):e.classList.add(n),m.value?e.classList.remove(i):e.classList.add(i)});let Y={syncBarPosition:()=>{O()}},xe=()=>{ue({transitionDisabled:!0})},Se=R(()=>{let{value:e}=g,{type:n}=t,r=`${e}${{card:`Card`,bar:`Bar`,line:`Line`,segment:`Segment`}[n]}`,{self:{barColor:i,closeIconColor:a,closeIconColorHover:s,closeIconColorPressed:c,tabColor:l,tabBorderColor:u,paneTextColor:d,tabFontWeight:f,tabBorderRadius:p,tabFontWeightActive:m,colorSegment:h,fontWeightStrong:_,tabColorSegment:v,closeSize:y,closeIconSize:b,closeColorHover:x,closeColorPressed:S,closeBorderRadius:C,[B(`panePadding`,e)]:w,[B(`tabPadding`,r)]:T,[B(`tabPaddingVertical`,r)]:ee,[B(`tabGap`,r)]:te,[B(`tabGap`,`${r}Vertical`)]:ne,[B(`tabTextColor`,n)]:E,[B(`tabTextColorActive`,n)]:D,[B(`tabTextColorHover`,n)]:O,[B(`tabTextColorDisabled`,n)]:k,[B(`tabFontSize`,e)]:A},common:{cubicBezierEaseInOut:j}}=o.value;return{"--n-bezier":j,"--n-color-segment":h,"--n-bar-color":i,"--n-tab-font-size":A,"--n-tab-text-color":E,"--n-tab-text-color-active":D,"--n-tab-text-color-disabled":k,"--n-tab-text-color-hover":O,"--n-pane-text-color":d,"--n-tab-border-color":u,"--n-tab-border-radius":p,"--n-close-size":y,"--n-close-icon-size":b,"--n-close-color-hover":x,"--n-close-color-pressed":S,"--n-close-border-radius":C,"--n-close-icon-color":a,"--n-close-icon-color-hover":s,"--n-close-icon-color-pressed":c,"--n-tab-color":l,"--n-tab-font-weight":f,"--n-tab-font-weight-active":m,"--n-tab-padding":T,"--n-tab-padding-vertical":ee,"--n-tab-gap":te,"--n-tab-gap-vertical":ne,"--n-pane-padding-left":ae(w,`left`),"--n-pane-padding-right":ae(w,`right`),"--n-pane-padding-top":ae(w,`top`),"--n-pane-padding-bottom":ae(w,`bottom`),"--n-font-weight-strong":_,"--n-tab-color-segment":v}}),Ce=i?de(`tabs`,R(()=>`${g.value[0]}${t.type[0]}`),Se,t):void 0;return Object.assign({mergedClsPrefix:r,mergedValue:b,renderedNames:new Set,segmentCapsuleElRef:W,tabsPaneWrapperRef:j,tabsElRef:s,barElRef:c,addTabInstRef:u,xScrollInstRef:d,scrollWrapperElRef:l,addTabFixed:q,tabWrapperStyle:T,handleNavResize:me,mergedSize:g,handleScroll:ye,handleTabsResize:ge,cssVars:i?void 0:Se,themeClass:Ce?.themeClass,animationDirection:z,renderNameListRef:ie,yScrollElRef:f,handleSegmentResize:xe,onAnimationBeforeLeave:re,onAnimationEnter:F,onAnimationAfterEnter:I,onRender:Ce?.onRender},Y)},render(){let{mergedClsPrefix:e,type:t,placement:i,addTabFixed:a,addable:o,mergedSize:s,renderNameListRef:c,onRender:l,paneWrapperClass:u,paneWrapperStyle:d,$slots:{default:f,prefix:p,suffix:m}}=this;l?.();let h=f?J(f()).filter(e=>e.type.__TAB_PANE__===!0):[],_=f?J(f()).filter(e=>e.type.__TAB__===!0):[],v=!_.length,y=t===`card`,b=t===`segment`,x=!y&&!b&&this.justifyContent;c.value=[];let S=()=>{let t=n(`div`,{style:this.tabWrapperStyle,class:`${e}-tabs-wrapper`},x?null:n(`div`,{class:`${e}-tabs-scroll-padding`,style:i===`top`||i===`bottom`?{width:`${this.tabsPadding}px`}:{height:`${this.tabsPadding}px`}}),v?h.map((e,t)=>(c.value.push(e.props.name),_t(n(lt,Object.assign({},e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0&&(!x||x===`center`||x===`start`||x===`end`)}),e.children?{default:e.children.tab}:void 0)))):_.map((e,t)=>(c.value.push(e.props.name),_t(t!==0&&!x?gt(e):e))),!a&&o&&y?ht(o,(v?h.length:_.length)!==0):null,x?null:n(`div`,{class:`${e}-tabs-scroll-padding`,style:{width:`${this.tabsPadding}px`}}));return n(`div`,{ref:`tabsElRef`,class:`${e}-tabs-nav-scroll-content`},y&&o?n(r,{onResize:this.handleTabsResize},{default:()=>t}):t,y?n(`div`,{class:`${e}-tabs-pad`}):null,y?null:n(`div`,{ref:`barElRef`,class:`${e}-tabs-bar`}))},C=b?`top`:i;return n(`div`,{class:[`${e}-tabs`,this.themeClass,`${e}-tabs--${t}-type`,`${e}-tabs--${s}-size`,x&&`${e}-tabs--flex`,`${e}-tabs--${C}`],style:this.cssVars},n(`div`,{class:[`${e}-tabs-nav--${t}-type`,`${e}-tabs-nav--${C}`,`${e}-tabs-nav`]},g(p,t=>t&&n(`div`,{class:`${e}-tabs-nav__prefix`},t)),b?n(r,{onResize:this.handleSegmentResize},{default:()=>n(`div`,{class:`${e}-tabs-rail`,ref:`tabsElRef`},n(`div`,{class:`${e}-tabs-capsule`,ref:`segmentCapsuleElRef`},n(`div`,{class:`${e}-tabs-wrapper`},n(`div`,{class:`${e}-tabs-tab`}))),v?h.map((e,t)=>(c.value.push(e.props.name),n(lt,Object.assign({},e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0}),e.children?{default:e.children.tab}:void 0))):_.map((e,t)=>(c.value.push(e.props.name),t===0?e:gt(e))))}):n(r,{onResize:this.handleNavResize},{default:()=>n(`div`,{class:`${e}-tabs-nav-scroll-wrapper`,ref:`scrollWrapperElRef`},[`top`,`bottom`].includes(C)?n(Pe,{ref:`xScrollInstRef`,onScroll:this.handleScroll},{default:S}):n(`div`,{class:`${e}-tabs-nav-y-scroll`,onScroll:this.handleScroll,ref:`yScrollElRef`},S()))}),a&&o&&y?ht(o,!0):null,g(m,t=>t&&n(`div`,{class:`${e}-tabs-nav__suffix`},t))),v&&(this.animated&&(C===`top`||C===`bottom`)?n(`div`,{ref:`tabsPaneWrapperRef`,style:d,class:[`${e}-tabs-pane-wrapper`,u]},mt(h,this.mergedValue,this.renderedNames,this.onAnimationBeforeLeave,this.onAnimationEnter,this.onAnimationAfterEnter,this.animationDirection)):mt(h,this.mergedValue,this.renderedNames)))}});function mt(e,t,r,a,o,s,c){let l=[];return e.forEach(e=>{let{name:n,displayDirective:a,"display-directive":o}=e.props,s=e=>a===e||o===e,c=t===n;if(e.key!==void 0&&(e.key=n),c||s(`show`)||s(`show:lazy`)&&r.has(n)){r.has(n)||r.add(n);let t=!s(`if`);l.push(t?W(e,[[i,c]]):e)}}),c?n(G,{name:`${c}-transition`,onBeforeLeave:a,onEnter:o,onAfterEnter:s},{default:()=>l}):l}function ht(e,t){return n(lt,{ref:`addTabInstRef`,key:`__addable`,name:`__addable`,internalCreatedByPane:!0,internalAddable:!0,internalLeftPadded:t,disabled:typeof e==`object`&&e.disabled})}function gt(e){let n=t(e);return n.props?n.props.internalLeftPadded=!0:n.props={internalLeftPadded:!0},n}function _t(e){return Array.isArray(e.dynamicProps)?e.dynamicProps.includes(`internalLeftPadded`)||e.dynamicProps.push(`internalLeftPadded`):e.dynamicProps=[`internalLeftPadded`],e}var vt=5e3;function yt(){let e=P([]),t=P(!1),n;function r(r,a,o){i(),e.value=[];let s=`/api/docker/containers/${encodeURIComponent(r)}/logs/stream?sinceMin=${a}&tail=${o}`;n=new EventSource(s),n.onopen=()=>{t.value=!0},n.onerror=()=>{t.value=!1},n.onmessage=t=>{try{let n=JSON.parse(t.data);e.value.push(n),e.value.length>vt&&e.value.splice(0,e.value.length-vt)}catch{}}}function i(){n?.close(),n=void 0,t.value=!1}return{lines:e,connected:t,open:r,close:i}}var bt={key:1,class:`tab-loading`},xt={key:0,class:`log-empty`},St={key:0,class:`log-ts`},Ct={class:`log-text`},wt=500,Tt=ce(b({__name:`DockerView`,setup(e){let{t}=oe(),r=De();function i(e){return e instanceof j&&e.status===503&&!!e.body&&typeof e.body==`object`&&`enabled`in e.body}function s(e,t){r.error(e instanceof j?e.message:t)}let c=e=>e===`running`?`success`:e===`paused`||e===`restarting`?`warning`:e===`dead`?`error`:`default`,l={running:0,restarting:1,paused:2,created:3,exited:4,dead:5};function d(e){return l[e.state]??6}function m(e,t){return e.hasStats?t(e.stats):-1}let g=P([]),v=P(!0),b=P(null),x;async function S(){try{let e=await Z.containers();g.value=e.containers,b.value=null}catch(e){i(e)&&(b.value=e.body)}finally{v.value=!1}}async function w(e,n){try{let t=await Z.containerAction(e,n);g.value=t.containers}catch(e){s(e,t(`docker.actionFailed`,{action:n}))}}let T=P(!1),ne=P(``),O=P(``),k=P(15),M=[{label:t(`docker.logs.last15m`),value:15},{label:t(`docker.logs.last1h`),value:60},{label:t(`docker.logs.last6h`),value:360},{label:t(`docker.logs.last24h`),value:1440}],N=yt(),F=P(null),I=P(!0);function ie(e){ne.value=e.id,O.value=e.name,T.value=!0,I.value=!0,N.open(e.id,k.value,wt)}L(k,e=>{T.value&&(I.value=!0,N.open(ne.value,e,wt))}),L(T,e=>{e||N.close()}),L(()=>N.lines.value.length,async()=>{if(!I.value)return;await C();let e=F.value;e&&(e.scrollTop=e.scrollHeight)});function ae(){let e=F.value;if(!e)return;let t=e.scrollHeight-e.scrollTop-e.clientHeight<24;I.value=t}function z(e){if(!e)return``;let t=new Date(e);return Number.isNaN(t.getTime())?``:t.toLocaleTimeString()}let B=R(()=>[{title:t(`common.name`),key:`name`,width:160,ellipsis:{tooltip:!0},sorter:(e,t)=>e.name.localeCompare(t.name)},{title:`Image`,key:`image`,width:180,ellipsis:{tooltip:!0},sorter:(e,t)=>e.image.localeCompare(t.image)},{title:`Status`,key:`state`,width:130,sorter:(e,t)=>d(e)-d(t),render:e=>n(we,{type:c(e.state),size:`small`},{default:()=>e.status})},{title:`CPU`,key:`cpu`,width:70,sorter:(e,t)=>m(e,e=>e.cpuPercent)-m(t,e=>e.cpuPercent),render:e=>e.hasStats?`${e.stats.cpuPercent.toFixed(1)}%`:`—`},{title:`RAM`,key:`ram`,width:150,sorter:(e,t)=>m(e,e=>e.memUsageBytes)-m(t,e=>e.memUsageBytes),render:e=>e.hasStats?`${Q(e.stats.memUsageBytes)} / ${Q(e.stats.memLimitBytes)}`:`—`},{title:`Network`,key:`net`,width:140,sorter:(e,t)=>m(e,e=>e.netRxBytes+e.netTxBytes)-m(t,e=>e.netRxBytes+e.netTxBytes),render:e=>e.hasStats?`↓ ${Q(e.stats.netRxBytes)} ↑ ${Q(e.stats.netTxBytes)}`:`—`},{title:`Ports`,key:`ports`,width:220,ellipsis:{tooltip:!0}},{title:t(`common.actions`),key:`actions`,width:270,render:e=>n(Ae,{size:`small`},()=>[e.state===`running`?[n(E,{size:`tiny`,onClick:()=>w(e.id,`stop`)},()=>`Stop`),n(E,{size:`tiny`,onClick:()=>w(e.id,`restart`)},()=>`Restart`)]:n(E,{size:`tiny`,type:`primary`,onClick:()=>w(e.id,`start`)},()=>`Start`),n(E,{size:`tiny`,quaternary:!0,onClick:()=>ie(e)},()=>t(`docker.logs.button`)),n(je,{onPositiveClick:()=>w(e.id,`remove`)},{trigger:()=>n(E,{size:`tiny`,type:`error`,ghost:!0},()=>t(`common.delete`)),default:()=>t(`docker.confirmDeleteContainer`,{name:e.name})})])}]),V=P([]),H=P(!0),se=P(null);async function ce(){H.value=!0;try{let e=await Z.images();V.value=e.images,se.value=null}catch(e){i(e)&&(se.value=e.body)}finally{H.value=!1}}async function le(e){try{let t=await Z.removeImage(e);V.value=t.images}catch(e){s(e,t(`docker.removeImageFailed`))}}let W=R(()=>[{title:`Tag`,key:`tag`,minWidth:200,ellipsis:{tooltip:!0},sorter:(e,t)=>e.tag.localeCompare(t.tag),render:e=>e.dangling?n(Ae,{size:`small`,align:`center`},()=>[e.tag,n(we,{size:`small`,type:`warning`},()=>`dangling`)]):e.tag},{title:t(`common.size`),key:`sizeBytes`,width:110,sorter:(e,t)=>e.sizeBytes-t.sizeBytes,render:e=>Q(e.sizeBytes)},{title:t(`docker.usedColumn`),key:`containers`,width:140,sorter:(e,t)=>e.containers-t.containers,render:e=>e.containers<0?`—`:e.containers===0?t(`docker.notUsed`):t(`docker.containerCount`,{count:e.containers})},{title:t(`docker.created`),key:`created`,width:150,sorter:(e,t)=>Date.parse(e.created)-Date.parse(t.created),render:e=>Me(e.created)},{title:t(`common.actions`),key:`actions`,width:100,render:e=>n(je,{onPositiveClick:()=>le(e.id)},{trigger:()=>n(E,{size:`tiny`,type:`error`,ghost:!0},()=>t(`common.delete`)),default:()=>t(`docker.confirmDeleteImage`,{tag:e.tag})})}]),de=P([]),G=P(!0),K=P(null);async function fe(){G.value=!0;try{let e=await Z.volumes();de.value=e.volumes,K.value=null}catch(e){i(e)&&(K.value=e.body)}finally{G.value=!1}}async function pe(e){try{let t=await Z.removeVolume(e);de.value=t.volumes}catch(e){s(e,t(`docker.removeVolumeFailed`))}}let me=R(()=>[{title:t(`common.name`),key:`name`,minWidth:180,ellipsis:{tooltip:!0},sorter:(e,t)=>e.name.localeCompare(t.name)},{title:`Driver`,key:`driver`,width:100,sorter:(e,t)=>e.driver.localeCompare(t.driver)},{title:t(`common.size`),key:`sizeBytes`,width:110,sorter:(e,t)=>e.sizeBytes-t.sizeBytes,render:e=>e.sizeBytes<0?t(`docker.unknown`):Q(e.sizeBytes)},{title:`Status`,key:`inUse`,width:120,sorter:(e,t)=>Number(e.inUse)-Number(t.inUse),render:e=>n(we,{size:`small`,type:e.inUse?`success`:`default`},()=>e.inUse?t(`docker.used`):t(`docker.notUsed`))},{title:t(`common.actions`),key:`actions`,width:100,render:e=>n(je,{onPositiveClick:()=>pe(e.name)},{trigger:()=>n(E,{size:`tiny`,type:`error`,ghost:!0},()=>t(`common.delete`)),default:()=>t(`docker.confirmDeleteVolume`,{name:e.name})})}]),q=P([]),J=P(!0),be=P(null);async function xe(){J.value=!0;try{let e=await Z.networks();q.value=e.networks,be.value=null}catch(e){i(e)&&(be.value=e.body)}finally{J.value=!1}}async function Se(e){try{let t=await Z.removeNetwork(e);q.value=t.networks}catch(e){s(e,t(`docker.removeNetworkFailed`))}}let Ce=R(()=>[{title:t(`common.name`),key:`name`,minWidth:160,ellipsis:{tooltip:!0},sorter:(e,t)=>e.name.localeCompare(t.name),render:e=>e.builtin?n(Ae,{size:`small`,align:`center`},()=>[e.name,n(we,{size:`small`},()=>`builtin`)]):e.name},{title:`Driver`,key:`driver`,width:100,sorter:(e,t)=>e.driver.localeCompare(t.driver)},{title:`Subnet`,key:`subnet`,width:150,sorter:(e,t)=>e.subnet.localeCompare(t.subnet),render:e=>e.subnet||`—`},{title:t(`docker.connectedContainers`),key:`connectedCount`,width:170,sorter:(e,t)=>e.connectedCount-t.connectedCount},{title:t(`common.actions`),key:`actions`,width:100,render:e=>e.builtin?null:n(je,{onPositiveClick:()=>Se(e.id)},{trigger:()=>n(E,{size:`tiny`,type:`error`,ghost:!0},()=>t(`common.delete`)),default:()=>t(`docker.confirmDeleteNetwork`,{name:e.name})})}]),X=P(null),Te=P(!0),Ee=P(null),Ne=P(null);async function Pe(){Te.value=!0;try{X.value=await Z.settings(),Ee.value=null}catch(e){i(e)&&(Ee.value=e.body)}finally{Te.value=!1}}async function Fe(e){Ne.value=e;try{X.value=await Z.prune(e),r.success(t(`docker.cleanupDone`))}catch(n){s(n,t(`docker.cleanupFailed`,{kind:e}))}finally{Ne.value=null}}let Ie=P(`containers`),Le=new Set([`containers`]);return L(Ie,e=>{Le.has(e)||(Le.add(e),e===`images`?ce():e===`volumes`?fe():e===`networks`?xe():e===`settings`&&Pe())}),te(()=>{S(),x=setInterval(S,5e3)}),ee(()=>{x&&clearInterval(x),N.close()}),(e,n)=>(y(),h(he,null,{default:U(()=>[f(D(pt),{type:`line`,value:Ie.value,"onUpdate:value":n[0]||=e=>Ie.value=e},{default:U(()=>[f(D(st),{name:`containers`,tab:`Containers`},{default:U(()=>[b.value?(y(),h(D(Y),{key:0,type:`warning`,title:b.value.error},null,8,[`title`])):(y(),h(D(ye),{key:1,columns:B.value,data:g.value,loading:v.value,"row-key":e=>e.id,"scroll-x":1200},null,8,[`columns`,`data`,`loading`,`row-key`]))]),_:1}),f(D(st),{name:`images`,tab:`Images`},{default:U(()=>[se.value?(y(),h(D(Y),{key:0,type:`warning`,title:se.value.error},null,8,[`title`])):(y(),h(D(ye),{key:1,columns:W.value,data:V.value,loading:H.value,"row-key":e=>e.id,"scroll-x":700},null,8,[`columns`,`data`,`loading`,`row-key`]))]),_:1}),f(D(st),{name:`volumes`,tab:`Volumes`},{default:U(()=>[K.value?(y(),h(D(Y),{key:0,type:`warning`,title:K.value.error},null,8,[`title`])):(y(),h(D(ye),{key:1,columns:me.value,data:de.value,loading:G.value,"row-key":e=>e.name,"scroll-x":610},null,8,[`columns`,`data`,`loading`,`row-key`]))]),_:1}),f(D(st),{name:`networks`,tab:`Networks`},{default:U(()=>[be.value?(y(),h(D(Y),{key:0,type:`warning`,title:be.value.error},null,8,[`title`])):(y(),h(D(ye),{key:1,columns:Ce.value,data:q.value,loading:J.value,"row-key":e=>e.id,"scroll-x":680},null,8,[`columns`,`data`,`loading`,`row-key`]))]),_:1}),f(D(st),{name:`settings`,tab:`Settings`},{default:U(()=>[Ee.value?(y(),h(D(Y),{key:0,type:`warning`,title:Ee.value.error},null,8,[`title`])):Te.value&&!X.value?(y(),o(`div`,bt,[f(D(ge),{size:`large`})])):X.value?(y(),h(D(Ae),{key:3,vertical:``,size:24},{default:U(()=>[f(D(rt),{title:D(t)(`docker.daemonInfo`),column:2,bordered:``,"label-placement":`left`},{default:U(()=>[f(D($),{label:D(t)(`docker.serverVersion`)},{default:U(()=>[u(A(X.value?.info.serverVersion),1)]),_:1},8,[`label`]),f(D($),{label:`OS / Kernel`},{default:U(()=>[u(A(X.value?.info.operatingSystem)+` / `+A(X.value?.info.kernelVersion),1)]),_:1}),f(D($),{label:`Storage Driver`},{default:U(()=>[u(A(X.value?.info.storageDriver),1)]),_:1}),f(D($),{label:`Root Dir`},{default:U(()=>[u(A(X.value?.info.dockerRootDir),1)]),_:1}),f(D($),{label:`Container`},{default:U(()=>[u(A(X.value?.info.containersRunning)+` running, `+A(X.value?.info.containersPaused)+` paused, `+A(X.value?.info.containersStopped)+` stopped `,1)]),_:1}),f(D($),{label:`Images`},{default:U(()=>[u(A(X.value?.info.images),1)]),_:1})]),_:1},8,[`title`]),f(D(rt),{title:`Disk Usage`,column:2,bordered:``,"label-placement":`left`},{default:U(()=>[f(D($),{label:`Images`},{default:U(()=>[u(A(D(Q)(X.value?.diskUsage.imagesTotalBytes??0))+` (reclaimable `+A(D(Q)(X.value?.diskUsage.imagesReclaimableBytes??0))+`) `,1)]),_:1}),f(D($),{label:`Containers`},{default:U(()=>[u(A(D(Q)(X.value?.diskUsage.containersTotalBytes??0)),1)]),_:1}),f(D($),{label:`Volumes`},{default:U(()=>[u(A(D(Q)(X.value?.diskUsage.volumesTotalBytes??0))+` (reclaimable `+A(D(Q)(X.value?.diskUsage.volumesReclaimableBytes??0))+`) `,1)]),_:1})]),_:1}),f(D(Ae),null,{default:U(()=>[(y(),o(a,null,re([`containers`,`images`,`volumes`,`networks`,`all`],e=>f(D(je),{key:e,onPositiveClick:t=>Fe(e)},{trigger:U(()=>[f(D(E),{size:`small`,loading:Ne.value===e},{default:U(()=>[u(A(D(t)(`docker.cleanup`))+` `+A(e),1)]),_:2},1032,[`loading`])]),default:U(()=>[u(` `+A(D(t)(`docker.confirmCleanup`,{kind:e})),1)]),_:2},1032,[`onPositiveClick`])),64))]),_:1})]),_:1})):(y(),h(D(_e),{key:2,description:D(t)(`docker.noData`)},null,8,[`description`]))]),_:1})]),_:1},8,[`value`]),f(D(Oe),{show:T.value,"onUpdate:show":n[2]||=e=>T.value=e,width:640,placement:`right`},{default:U(()=>[f(D(ke),{title:D(t)(`docker.logs.title`,{name:O.value}),closable:``},{default:U(()=>[f(D(ve),{value:k.value,"onUpdate:value":n[1]||=e=>k.value=e,options:M,size:`small`,style:{width:`150px`,"margin-bottom":`10px`}},null,8,[`value`]),p(`div`,{ref_key:`logScrollEl`,ref:F,class:`log-scroll`,onScroll:ae},[D(N).lines.value.length===0?(y(),o(`p`,xt,A(D(N).connected.value?D(t)(`docker.logs.waiting`):D(t)(`docker.logs.connecting`)),1)):_(``,!0),(y(!0),o(a,null,re(D(N).lines.value,(e,t)=>(y(),o(`div`,{key:t,class:ue([`log-line`,{"log-line--stderr":e.stream===`stderr`}])},[e.timestamp?(y(),o(`span`,St,A(z(e.timestamp)),1)):_(``,!0),p(`span`,Ct,A(e.text),1)],2))),128))],544)]),_:1},8,[`title`])]),_:1},8,[`show`])]),_:1}))}}),[[`__scopeId`,`data-v-af500729`]]);export{Tt as default};