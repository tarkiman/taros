import{$n as e,An as t,Bn as n,Bt as r,Cn as i,Dn as a,Fn as o,Gt as s,Hn as c,Ht as l,In as u,It as d,Ln as f,Mn as p,N as m,Nn as h,Nt as g,Pn as _,Pt as v,Qn as y,Rn as b,Tt as x,U as S,Un as C,V as w,Vn as T,Xn as E,Yn as ee,Zt as D,_ as O,_r as k,_t as A,ar as j,br as M,c as N,cn as P,dn as F,dr as I,er as te,fn as L,gn as ne,h as R,hn as re,i as ie,in as ae,ir as z,jn as B,ln as V,m as oe,mn as H,mr as U,mt as W,nn as G,nr as se,o as K,or as q,pn as ce,sr as le,vr as ue,wn as J,wt as de,xn as fe,xt as pe}from"./auth-m9aK0c11.js";import{T as me,_ as he,f as ge,l as _e,t as ve,v as ye,w as be}from"./AppShell-DGyeuBy3.js";import{a as xe,r as Se,t as Ce}from"./Select-_739hLiq.js";import{u as we}from"./useTheme-BPu6TUbX.js";import{t as Te}from"./Modal-CflsQjTS.js";import{c as Ee,n as Y}from"./LocaleSwitcher-DWZQiaIV.js";import{t as De}from"./DataTable-Bw7tZtxZ.js";import{n as Oe}from"./fade-in-scale-up.cssr-COXXU_xj.js";import{t as ke}from"./get-slot-6kXJmSMP.js";import{t as Ae}from"./omit-C4pE9leG.js";import{t as je}from"./Input-DDHBXNV6.js";import{t as Me}from"./Add-DG3UsRjQ.js";import{t as Ne}from"./Checkbox-CZXeTFQA.js";import{n as Pe,r as Fe}from"./light-BrFUZ1-P.js";import{t as Ie}from"./use-message-C5tgn7l2.js";import{n as Le,t as Re}from"./DrawerContent-etpsseUs.js";import{t as ze}from"./Space-CL6sj53I.js";import{t as Be}from"./Popconfirm-Bz246LTS.js";import{n as Ve,r as He,t as Ue}from"./copy-B6UKKb97.js";import{a as X,r as We,t as Ge}from"./inputProps-zFrQEkhP.js";import{t as Ke}from"./trash-2-CoiRzwer.js";import{i as qe,n as Je,t as Z}from"./docker-DiIHzIl4.js";import{n as Ye,t as Q}from"./format-BxLcbkc3.js";var Xe=he(`.v-x-scroll`,{overflow:`auto`,scrollbarWidth:`none`},[he(`&::-webkit-scrollbar`,{width:0,height:0})]),Ze=b({name:`XScroll`,props:{disabled:Boolean,onScroll:Function},setup(){let e=I(null);function t(e){!(e.currentTarget.offsetWidth<e.currentTarget.scrollWidth)||e.deltaY===0||(e.currentTarget.scrollLeft+=e.deltaY+e.deltaX,e.preventDefault())}let n=l();return Xe.mount({id:`vueuc/x-scroll`,head:!0,anchorMetaName:ye,ssr:n}),Object.assign({selfRef:e,handleWheel:t},{scrollTo(...t){var n;(n=e.value)==null||n.scrollTo(...t)}})},render(){return n(`div`,{ref:`selfRef`,onScroll:this.onScroll,onWheel:this.disabled?void 0:this.handleWheel,class:`v-x-scroll`},this.$slots)}});function Qe(e,t=`default`,n=[]){let{children:r}=e;if(typeof r==`object`&&r&&!Array.isArray(r)){let e=r[t];if(typeof e==`function`)return e()}return n}var $e=/\s/;function et(e){for(var t=e.length;t--&&$e.test(e.charAt(t)););return t}var tt=/^\s+/;function nt(e){return e&&e.slice(0,et(e)+1).replace(tt,``)}var rt=NaN,it=/^[-+]0x[0-9a-f]+$/i,at=/^0b[01]+$/i,ot=/^0o[0-7]+$/i,st=parseInt;function ct(e){if(typeof e==`number`)return e;if(A(e))return rt;if(W(e)){var t=typeof e.valueOf==`function`?e.valueOf():e;e=W(t)?t+``:t}if(typeof e!=`string`)return e===0?e:+e;e=nt(e);var n=at.test(e);return n||ot.test(e)?st(e.slice(2),n?2:8):it.test(e)?rt:+e}var lt=function(){return pe.Date.now()},ut=`Expected a function`,dt=Math.max,ft=Math.min;function pt(e,t,n){var r,i,a,o,s,c,l=0,u=!1,d=!1,f=!0;if(typeof e!=`function`)throw TypeError(ut);t=ct(t)||0,W(n)&&(u=!!n.leading,d=`maxWait`in n,a=d?dt(ct(n.maxWait)||0,t):a,f=`trailing`in n?!!n.trailing:f);function p(t){var n=r,a=i;return r=i=void 0,l=t,o=e.apply(a,n),o}function m(e){return l=e,s=setTimeout(_,t),u?p(e):o}function h(e){var n=e-c,r=e-l,i=t-n;return d?ft(i,a-r):i}function g(e){var n=e-c,r=e-l;return c===void 0||n>=t||n<0||d&&r>=a}function _(){var e=lt();if(g(e))return v(e);s=setTimeout(_,h(e))}function v(e){return s=void 0,f&&r?p(e):(r=i=void 0,o)}function y(){s!==void 0&&clearTimeout(s),l=0,r=c=i=s=void 0}function b(){return s===void 0?o:v(lt())}function x(){var e=lt(),n=g(e);if(r=arguments,i=this,c=e,n){if(s===void 0)return m(c);if(d)return clearTimeout(s),s=setTimeout(_,t),p(c)}return s===void 0&&(s=setTimeout(_,t)),o}return x.cancel=y,x.flush=b,x}var mt=`Expected a function`;function ht(e,t,n){var r=!0,i=!0;if(typeof e!=`function`)throw TypeError(mt);return W(n)&&(r=`leading`in n?!!n.leading:r,i=`trailing`in n?!!n.trailing:i),pt(e,t,{leading:r,maxWait:t,trailing:i})}var gt=P([V(`descriptions`,{fontSize:`var(--n-font-size)`},[V(`descriptions-separator`,`
 display: inline-block;
 margin: 0 8px 0 2px;
 `),V(`descriptions-table-wrapper`,[V(`descriptions-table`,[V(`descriptions-table-row`,[V(`descriptions-table-header`,{padding:`var(--n-th-padding)`}),V(`descriptions-table-content`,{padding:`var(--n-td-padding)`})])])]),ce(`bordered`,[V(`descriptions-table-wrapper`,[V(`descriptions-table`,[V(`descriptions-table-row`,[P(`&:last-child`,[V(`descriptions-table-content`,{paddingBottom:0})])])])])]),L(`left-label-placement`,[V(`descriptions-table-content`,[P(`> *`,{verticalAlign:`top`})])]),L(`left-label-align`,[P(`th`,{textAlign:`left`})]),L(`center-label-align`,[P(`th`,{textAlign:`center`})]),L(`right-label-align`,[P(`th`,{textAlign:`right`})]),L(`bordered`,[V(`descriptions-table-wrapper`,`
 border-radius: var(--n-border-radius);
 overflow: hidden;
 background: var(--n-merged-td-color);
 border: 1px solid var(--n-merged-border-color);
 `,[V(`descriptions-table`,[V(`descriptions-table-row`,[P(`&:not(:last-child)`,[V(`descriptions-table-content`,{borderBottom:`1px solid var(--n-merged-border-color)`}),V(`descriptions-table-header`,{borderBottom:`1px solid var(--n-merged-border-color)`})]),V(`descriptions-table-header`,`
 font-weight: 400;
 background-clip: padding-box;
 background-color: var(--n-merged-th-color);
 `,[P(`&:not(:last-child)`,{borderRight:`1px solid var(--n-merged-border-color)`})]),V(`descriptions-table-content`,[P(`&:not(:last-child)`,{borderRight:`1px solid var(--n-merged-border-color)`})])])])])]),V(`descriptions-header`,`
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
 `)])])])]),V(`descriptions-table-wrapper`,`
 --n-merged-th-color: var(--n-th-color);
 --n-merged-td-color: var(--n-td-color);
 --n-merged-border-color: var(--n-border-color);
 `),re(V(`descriptions-table-wrapper`,`
 --n-merged-th-color: var(--n-th-color-modal);
 --n-merged-td-color: var(--n-td-color-modal);
 --n-merged-border-color: var(--n-border-color-modal);
 `)),ne(V(`descriptions-table-wrapper`,`
 --n-merged-th-color: var(--n-th-color-popover);
 --n-merged-td-color: var(--n-td-color-popover);
 --n-merged-border-color: var(--n-border-color-popover);
 `))]),_t=`DESCRIPTION_ITEM_FLAG`;function vt(e){return typeof e==`object`&&e&&!Array.isArray(e)?e.type&&e.type.DESCRIPTION_ITEM_FLAG:!1}var yt=Object.assign(Object.assign({},S.props),{title:String,column:{type:Number,default:3},columns:Number,labelPlacement:{type:String,default:`top`},labelAlign:{type:String,default:`left`},separator:{type:String,default:`:`},size:String,bordered:Boolean,labelClass:String,labelStyle:[Object,String],contentClass:String,contentStyle:[Object,String]}),bt=b({name:`Descriptions`,props:yt,slots:Object,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n,mergedComponentPropsRef:r}=x(e),i=B(()=>e.size||r?.value?.Descriptions?.size||`medium`),a=S(`Descriptions`,`-descriptions`,gt,Fe,e,t),o=B(()=>{let{bordered:t}=e,n=i.value,{common:{cubicBezierEaseInOut:r},self:{titleTextColor:o,thColor:s,thColorModal:c,thColorPopover:l,thTextColor:u,thFontWeight:d,tdTextColor:f,tdColor:p,tdColorModal:m,tdColorPopover:h,borderColor:g,borderColorModal:_,borderColorPopover:v,borderRadius:y,lineHeight:b,[H(`fontSize`,n)]:x,[H(t?`thPaddingBordered`:`thPadding`,n)]:S,[H(t?`tdPaddingBordered`:`tdPadding`,n)]:C}}=a.value;return{"--n-title-text-color":o,"--n-th-padding":S,"--n-td-padding":C,"--n-font-size":x,"--n-bezier":r,"--n-th-font-weight":d,"--n-line-height":b,"--n-th-text-color":u,"--n-td-text-color":f,"--n-th-color":s,"--n-th-color-modal":c,"--n-th-color-popover":l,"--n-td-color":p,"--n-td-color-modal":m,"--n-td-color-popover":h,"--n-border-radius":y,"--n-border-color":g,"--n-border-color-modal":_,"--n-border-color-popover":v}}),s=n?de(`descriptions`,B(()=>{let t=``,{bordered:n}=e;return n&&(t+=`a`),t+=i.value[0],t}),o,e):void 0;return{mergedClsPrefix:t,cssVars:n?void 0:o,themeClass:s?.themeClass,onRender:s?.onRender,compitableColumn:be(e,[`columns`,`column`]),inlineThemeDisabled:n,mergedSize:i}},render(){let e=this.$slots.default,t=e?we(e()):[];t.length;let{contentClass:r,labelClass:i,compitableColumn:a,labelPlacement:o,labelAlign:s,mergedSize:c,bordered:l,title:u,cssVars:d,mergedClsPrefix:f,separator:p,onRender:m}=this;m?.();let h=t.filter(e=>vt(e)),g=h.reduce((e,t,s)=>{let c=t.props||{},u=h.length-1===s,d=[`label`in c?c.label:Qe(t,`label`)],m=[Qe(t)],g=c.span||1,_=e.span;e.span+=g;let v=c.labelStyle||c[`label-style`]||this.labelStyle,y=c.contentStyle||c[`content-style`]||this.contentStyle;if(o===`left`)l?e.row.push(n(`th`,{class:[`${f}-descriptions-table-header`,i],colspan:1,style:v},d),n(`td`,{class:[`${f}-descriptions-table-content`,r],colspan:u?(a-_)*2+1:g*2-1,style:y},m)):e.row.push(n(`td`,{class:`${f}-descriptions-table-content`,colspan:u?(a-_)*2:g*2},n(`span`,{class:[`${f}-descriptions-table-content__label`,i],style:v},[...d,p&&n(`span`,{class:`${f}-descriptions-separator`},p)]),n(`span`,{class:[`${f}-descriptions-table-content__content`,r],style:y},m)));else{let t=u?(a-_)*2:g*2;e.row.push(n(`th`,{class:[`${f}-descriptions-table-header`,i],colspan:t,style:v},d)),e.secondRow.push(n(`td`,{class:[`${f}-descriptions-table-content`,r],colspan:t,style:y},m))}return(e.span>=a||u)&&(e.span=0,e.row.length&&(e.rows.push(e.row),e.row=[]),o!==`left`&&e.secondRow.length&&(e.rows.push(e.secondRow),e.secondRow=[])),e},{span:0,row:[],secondRow:[],rows:[]}).rows.map(e=>n(`tr`,{class:`${f}-descriptions-table-row`},e));return n(`div`,{style:d,class:[`${f}-descriptions`,this.themeClass,`${f}-descriptions--${o}-label-placement`,`${f}-descriptions--${s}-label-align`,`${f}-descriptions--${c}-size`,l&&`${f}-descriptions--bordered`]},u||this.$slots.header?n(`div`,{class:`${f}-descriptions-header`},u||ke(this,`header`)):null,n(`div`,{class:`${f}-descriptions-table-wrapper`},n(`table`,{class:`${f}-descriptions-table`},n(`tbody`,null,o===`top`&&n(`tr`,{class:`${f}-descriptions-table-row`,style:{visibility:`collapse`}},D(a*2,n(`td`,null))),g))))}}),xt={label:String,span:{type:Number,default:1},labelClass:String,labelStyle:[Object,String],contentClass:String,contentStyle:[Object,String]},$=b({name:`DescriptionsItem`,[_t]:!0,props:xt,slots:Object,render(){return null}}),St=s(`n-tabs`),Ct={tab:[String,Number,Object,Function],name:{type:[String,Number],required:!0},disabled:Boolean,displayDirective:{type:String,default:`if`},closable:{type:Boolean,default:void 0},tabProps:Object,label:[String,Number,Object,Function]},wt=b({__TAB_PANE__:!0,name:`TabPane`,alias:[`TabPanel`],props:Ct,slots:Object,setup(e){let t=T(St,null);return t||d(`tab-pane`,"`n-tab-pane` must be placed inside `n-tabs`."),{style:t.paneStyleRef,class:t.paneClassRef,mergedClsPrefix:t.mergedClsPrefixRef}},render(){return n(`div`,{class:[`${this.mergedClsPrefix}-tab-pane`,this.class],style:this.style},this.$slots)}}),Tt=Object.assign({internalLeftPadded:Boolean,internalAddable:Boolean,internalCreatedByPane:Boolean},Ae(Ct,[`displayDirective`])),Et=b({__TAB__:!0,inheritAttrs:!1,name:`Tab`,props:Tt,setup(e){let{mergedClsPrefixRef:t,valueRef:n,typeRef:r,closableRef:i,tabStyleRef:a,addTabStyleRef:o,tabClassRef:s,addTabClassRef:c,tabChangeIdRef:l,onBeforeLeaveRef:u,triggerRef:d,handleAdd:f,activateTab:p,handleClose:m}=T(St);return{trigger:d,mergedClosable:B(()=>{if(e.internalAddable)return!1;let{closable:t}=e;return t===void 0?i.value:t}),style:a,addStyle:o,tabClass:s,addTabClass:c,clsPrefix:t,value:n,type:r,handleClose(t){t.stopPropagation(),!e.disabled&&m(e.name)},activateTab(){if(e.disabled)return;if(e.internalAddable){f();return}let{name:t}=e,r=++l.id;if(t!==n.value){let{value:i}=u;i?Promise.resolve(i(e.name,n.value)).then(e=>{e&&l.id===r&&p(t)}):p(t)}}}},render(){let{internalAddable:e,clsPrefix:t,name:r,disabled:i,label:o,tab:s,value:l,mergedClosable:u,trigger:d,$slots:{default:f}}=this,p=o??s;return n(`div`,{class:`${t}-tabs-tab-wrapper`},this.internalLeftPadded?n(`div`,{class:`${t}-tabs-tab-pad`}):null,n(`div`,Object.assign({key:r,"data-name":r,"data-disabled":i?!0:void 0},c({class:[`${t}-tabs-tab`,l===r&&`${t}-tabs-tab--active`,i&&`${t}-tabs-tab--disabled`,u&&`${t}-tabs-tab--closable`,e&&`${t}-tabs-tab--addable`,e?this.addTabClass:this.tabClass],onClick:d===`click`?this.activateTab:void 0,onMouseenter:d===`hover`?this.activateTab:void 0,style:e?this.addStyle:this.style},this.internalCreatedByPane?this.tabProps||{}:this.$attrs)),n(`span`,{class:`${t}-tabs-tab__label`},e?n(a,null,n(`div`,{class:`${t}-tabs-tab__height-placeholder`},`\xA0`),n(w,{clsPrefix:t},{default:()=>n(Me,null)})):f?f():typeof p==`object`?p:Oe(p??r)),u&&this.type===`card`?n(m,{clsPrefix:t,class:`${t}-tabs-tab__close`,onClick:this.handleClose,disabled:i}):null))}}),Dt=V(`tabs`,`
 box-sizing: border-box;
 width: 100%;
 display: flex;
 flex-direction: column;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
`,[L(`segment-type`,[V(`tabs-rail`,[P(`&.transition-disabled`,[V(`tabs-capsule`,`
 transition: none;
 `)])])]),L(`top`,[V(`tab-pane`,`
 padding: var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left);
 `)]),L(`left`,[V(`tab-pane`,`
 padding: var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left) var(--n-pane-padding-top);
 `)]),L(`left, right`,`
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
 `)]),L(`right`,`
 flex-direction: row-reverse;
 `,[V(`tab-pane`,`
 padding: var(--n-pane-padding-left) var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom);
 `),V(`tabs-bar`,`
 left: 0;
 `)]),L(`bottom`,`
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
 `,[L(`active`,`
 font-weight: var(--n-font-weight-strong);
 color: var(--n-tab-text-color-active);
 `),P(`&:hover`,`
 color: var(--n-tab-text-color-hover);
 `)])])]),L(`flex`,[V(`tabs-nav`,`
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
 `,[F(`prefix, suffix`,`
 display: flex;
 align-items: center;
 `),F(`prefix`,`padding-right: 16px;`),F(`suffix`,`padding-left: 16px;`)]),L(`top, bottom`,[P(`>`,[V(`tabs-nav`,[V(`tabs-nav-scroll-wrapper`,[P(`&::before`,`
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
 `)])])])])]),L(`left, right`,[V(`tabs-nav-scroll-content`,`
 flex-direction: column;
 `),P(`>`,[V(`tabs-nav`,[V(`tabs-nav-scroll-wrapper`,[P(`&::before`,`
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
 `)])])])])]),V(`tabs-nav-scroll-wrapper`,`
 flex: 1;
 position: relative;
 overflow: hidden;
 `,[V(`tabs-nav-y-scroll`,`
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
 `,[L(`disabled`,{cursor:`not-allowed`}),F(`close`,`
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),F(`label`,`
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
 `,[P(`&.transition-disabled`,`
 transition: none;
 `),L(`disabled`,`
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
 `)]),V(`tabs-tab-pad`,`
 box-sizing: border-box;
 width: var(--n-tab-gap);
 flex-grow: 0;
 flex-shrink: 0;
 `),L(`line-type, bar-type`,[V(`tabs-tab`,`
 font-weight: var(--n-tab-font-weight);
 box-sizing: border-box;
 vertical-align: bottom;
 `,[P(`&:hover`,{color:`var(--n-tab-text-color-hover)`}),L(`active`,`
 color: var(--n-tab-text-color-active);
 font-weight: var(--n-tab-font-weight-active);
 `),L(`disabled`,{color:`var(--n-tab-text-color-disabled)`})])]),V(`tabs-nav`,[L(`line-type`,[L(`top`,[F(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),V(`tabs-nav-scroll-content`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),V(`tabs-bar`,`
 bottom: -1px;
 `)]),L(`left`,[F(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),V(`tabs-nav-scroll-content`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),V(`tabs-bar`,`
 right: -1px;
 `)]),L(`right`,[F(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),V(`tabs-nav-scroll-content`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),V(`tabs-bar`,`
 left: -1px;
 `)]),L(`bottom`,[F(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),V(`tabs-nav-scroll-content`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),V(`tabs-bar`,`
 top: -1px;
 `)]),F(`prefix, suffix`,`
 transition: border-color .3s var(--n-bezier);
 `),V(`tabs-nav-scroll-content`,`
 transition: border-color .3s var(--n-bezier);
 `),V(`tabs-bar`,`
 border-radius: 0;
 `)]),L(`card-type`,[F(`prefix, suffix`,`
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
 `,[L(`addable`,`
 padding-left: 8px;
 padding-right: 8px;
 font-size: 16px;
 justify-content: center;
 `,[F(`height-placeholder`,`
 width: 0;
 font-size: var(--n-tab-font-size);
 `),ce(`disabled`,[P(`&:hover`,`
 color: var(--n-tab-text-color-hover);
 `)])]),L(`closable`,`padding-right: 8px;`),L(`active`,`
 background-color: #0000;
 font-weight: var(--n-tab-font-weight-active);
 color: var(--n-tab-text-color-active);
 `),L(`disabled`,`color: var(--n-tab-text-color-disabled);`)])]),L(`left, right`,`
 flex-direction: column; 
 `,[F(`prefix, suffix`,`
 padding: var(--n-tab-padding-vertical);
 `),V(`tabs-wrapper`,`
 flex-direction: column;
 `),V(`tabs-tab-wrapper`,`
 flex-direction: column;
 `,[V(`tabs-tab-pad`,`
 height: var(--n-tab-gap-vertical);
 width: 100%;
 `)])]),L(`top`,[L(`card-type`,[V(`tabs-scroll-padding`,`border-bottom: 1px solid var(--n-tab-border-color);`),F(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),V(`tabs-tab`,`
 border-top-left-radius: var(--n-tab-border-radius);
 border-top-right-radius: var(--n-tab-border-radius);
 `,[L(`active`,`
 border-bottom: 1px solid #0000;
 `)]),V(`tabs-tab-pad`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),V(`tabs-pad`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `)])]),L(`left`,[L(`card-type`,[V(`tabs-scroll-padding`,`border-right: 1px solid var(--n-tab-border-color);`),F(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),V(`tabs-tab`,`
 border-top-left-radius: var(--n-tab-border-radius);
 border-bottom-left-radius: var(--n-tab-border-radius);
 `,[L(`active`,`
 border-right: 1px solid #0000;
 `)]),V(`tabs-tab-pad`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),V(`tabs-pad`,`
 border-right: 1px solid var(--n-tab-border-color);
 `)])]),L(`right`,[L(`card-type`,[V(`tabs-scroll-padding`,`border-left: 1px solid var(--n-tab-border-color);`),F(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),V(`tabs-tab`,`
 border-top-right-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[L(`active`,`
 border-left: 1px solid #0000;
 `)]),V(`tabs-tab-pad`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),V(`tabs-pad`,`
 border-left: 1px solid var(--n-tab-border-color);
 `)])]),L(`bottom`,[L(`card-type`,[V(`tabs-scroll-padding`,`border-top: 1px solid var(--n-tab-border-color);`),F(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),V(`tabs-tab`,`
 border-bottom-left-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[L(`active`,`
 border-top: 1px solid #0000;
 `)]),V(`tabs-tab-pad`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),V(`tabs-pad`,`
 border-top: 1px solid var(--n-tab-border-color);
 `)])])])]),Ot=ht,kt=Object.assign(Object.assign({},S.props),{value:[String,Number],defaultValue:[String,Number],trigger:{type:String,default:`click`},type:{type:String,default:`bar`},closable:Boolean,justifyContent:String,size:String,placement:{type:String,default:`top`},tabStyle:[String,Object],tabClass:String,addTabStyle:[String,Object],addTabClass:String,barWidth:Number,paneClass:String,paneStyle:[String,Object],paneWrapperClass:String,paneWrapperStyle:[String,Object],addable:[Boolean,Object],tabsPadding:{type:Number,default:0},animated:Boolean,onBeforeLeave:Function,onAdd:Function,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onClose:[Function,Array],labelSize:String,activeName:[String,Number],onActiveNameChange:[Function,Array]}),At=b({name:`Tabs`,props:kt,slots:Object,setup(t,{slots:n}){let{mergedClsPrefixRef:r,inlineThemeDisabled:i,mergedComponentPropsRef:a}=x(t),o=S(`Tabs`,`-tabs`,Dt,Pe,t,r),s=I(null),c=I(null),l=I(null),u=I(null),d=I(null),f=I(null),p=I(!0),m=I(!0),h=be(t,[`labelSize`,`size`]),g=B(()=>h.value?h.value:a?.value?.Tabs?.size||`medium`),_=be(t,[`activeName`,`value`]),y=I(_.value??t.defaultValue??(n.default?we(n.default())[0]?.props?.name:null)),b=Ee(_,y),w={id:0},T=B(()=>{if(!(!t.justifyContent||t.type===`card`))return{display:`flex`,justifyContent:t.justifyContent}});z(b,()=>{w.id=0,A(),M()});function E(){let{value:e}=b;return e===null?null:s.value?.querySelector(`[data-name="${e}"]`)}function D(e){if(t.type===`card`)return;let{value:n}=c;if(!n)return;let i=n.style.opacity===`0`;if(e){let a=`${r.value}-tabs-bar--disabled`,{barWidth:o,placement:s}=t;if(e.dataset.disabled===`true`?n.classList.add(a):n.classList.remove(a),[`top`,`bottom`].includes(s)){if(k([`top`,`maxHeight`,`height`]),typeof o==`number`&&e.offsetWidth>=o){let t=Math.floor((e.offsetWidth-o)/2)+e.offsetLeft;n.style.left=`${t}px`,n.style.maxWidth=`${o}px`}else n.style.left=`${e.offsetLeft}px`,n.style.maxWidth=`${e.offsetWidth}px`;n.style.width=`8192px`,i&&(n.style.transition=`none`),n.offsetWidth,i&&(n.style.transition=``,n.style.opacity=`1`)}else{if(k([`left`,`maxWidth`,`width`]),typeof o==`number`&&e.offsetHeight>=o){let t=Math.floor((e.offsetHeight-o)/2)+e.offsetTop;n.style.top=`${t}px`,n.style.maxHeight=`${o}px`}else n.style.top=`${e.offsetTop}px`,n.style.maxHeight=`${e.offsetHeight}px`;n.style.height=`8192px`,i&&(n.style.transition=`none`),n.offsetHeight,i&&(n.style.transition=``,n.style.opacity=`1`)}}}function O(){if(t.type===`card`)return;let{value:e}=c;e&&(e.style.opacity=`0`)}function k(e){let{value:t}=c;if(t)for(let n of e)t.style[n]=``}function A(){if(t.type===`card`)return;let e=E();e?D(e):O()}function M(){let e=d.value?.$el;if(!e)return;let t=E();if(!t)return;let{scrollLeft:n,offsetWidth:r}=e,{offsetLeft:i,offsetWidth:a}=t;n>i?e.scrollTo({top:0,left:i,behavior:`smooth`}):i+a>n+r&&e.scrollTo({top:0,left:i+a-r,behavior:`smooth`})}let N=I(null),P=0,F=null;function te(e){let t=N.value;if(t){P=e.getBoundingClientRect().height;let n=`${P}px`,r=()=>{t.style.height=n,t.style.maxHeight=n};F?(r(),F(),F=null):F=r}}function L(e){let t=N.value;if(t){let n=e.getBoundingClientRect().height,r=()=>{document.body.offsetHeight,t.style.maxHeight=`${n}px`,t.style.height=`${Math.max(P,n)}px`};F?(F(),F=null,r()):F=r}}function ne(){let e=N.value;if(e){e.style.maxHeight=``,e.style.height=``;let{paneWrapperStyle:n}=t;if(typeof n==`string`)e.style.cssText=n;else if(n){let{maxHeight:t,height:r}=n;t!==void 0&&(e.style.maxHeight=t),r!==void 0&&(e.style.height=r)}}}let R={value:[]},re=I(`next`);function ie(e){let t=b.value,n=`next`;for(let r of R.value){if(r===t)break;if(r===e){n=`prev`;break}}re.value=n,V(e)}function V(e){let{onActiveNameChange:n,onUpdateValue:r,"onUpdate:value":i}=t;n&&v(n,e),r&&v(r,e),i&&v(i,e),y.value=e}function oe(e){let{onClose:n}=t;n&&v(n,e)}let W=!0;function se(){let{value:e}=c;if(!e)return;W||=!1;let t=`transition-disabled`;e.classList.add(t),A(),e.classList.remove(t)}let K=I(null);function q({transitionDisabled:e}){let t=s.value;if(!t)return;e&&t.classList.add(`transition-disabled`);let n=E();n&&K.value&&(K.value.style.width=`${n.offsetWidth}px`,K.value.style.height=`${n.offsetHeight}px`,K.value.style.transform=`translateX(${n.offsetLeft-G(getComputedStyle(t).paddingLeft)}px)`,e&&K.value.offsetWidth),e&&t.classList.remove(`transition-disabled`)}z([b],()=>{t.type===`segment`&&C(()=>{q({transitionDisabled:!1})})}),ee(()=>{t.type===`segment`&&q({transitionDisabled:!0})});let ce=0;function le(e){if(e.contentRect.width===0&&e.contentRect.height===0||ce===e.contentRect.width)return;ce=e.contentRect.width;let{type:n}=t;if((n===`line`||n===`bar`)&&(W||t.justifyContent?.startsWith(`space`))&&se(),n!==`segment`){let{placement:e}=t;ge((e===`top`||e===`bottom`?d.value?.$el:f.value)||null)}}let ue=Ot(le,64);z([()=>t.justifyContent,()=>t.size],()=>{C(()=>{let{type:e}=t;(e===`line`||e===`bar`)&&se()})});let J=I(!1);function fe(e){let{target:n,contentRect:{width:r,height:i}}=e,a=n.parentElement.parentElement.offsetWidth,o=n.parentElement.parentElement.offsetHeight,{placement:s}=t;if(!J.value)s===`top`||s===`bottom`?a<r&&(J.value=!0):o<i&&(J.value=!0);else{let{value:e}=u;if(!e)return;s===`top`||s===`bottom`?a-r>e.$el.offsetWidth&&(J.value=!1):o-i>e.$el.offsetHeight&&(J.value=!1)}ge(d.value?.$el||null)}let pe=Ot(fe,64);function he(){let{onAdd:e}=t;e&&e(),C(()=>{let e=E(),{value:t}=d;!e||!t||t.scrollTo({left:e.offsetLeft,top:0,behavior:`smooth`})})}function ge(e){if(!e)return;let{placement:n}=t;if(n===`top`||n===`bottom`){let{scrollLeft:t,scrollWidth:n,offsetWidth:r}=e;p.value=t<=0,m.value=t+r>=n}else{let{scrollTop:t,scrollHeight:n,offsetHeight:r}=e;p.value=t<=0,m.value=t+r>=n}}let _e=Ot(e=>{ge(e.target)},64);e(St,{triggerRef:U(t,`trigger`),tabStyleRef:U(t,`tabStyle`),tabClassRef:U(t,`tabClass`),addTabStyleRef:U(t,`addTabStyle`),addTabClassRef:U(t,`addTabClass`),paneClassRef:U(t,`paneClass`),paneStyleRef:U(t,`paneStyle`),mergedClsPrefixRef:r,typeRef:U(t,`type`),closableRef:U(t,`closable`),valueRef:b,tabChangeIdRef:w,onBeforeLeaveRef:U(t,`onBeforeLeave`),activateTab:ie,handleClose:oe,handleAdd:he}),me(()=>{A(),M()}),j(()=>{let{value:e}=l;if(!e)return;let{value:t}=r,n=`${t}-tabs-nav-scroll-wrapper--shadow-start`,i=`${t}-tabs-nav-scroll-wrapper--shadow-end`;p.value?e.classList.remove(n):e.classList.add(n),m.value?e.classList.remove(i):e.classList.add(i)});let ve={syncBarPosition:()=>{A()}},ye=()=>{q({transitionDisabled:!0})},xe=B(()=>{let{value:e}=g,{type:n}=t,r=`${e}${{card:`Card`,bar:`Bar`,line:`Line`,segment:`Segment`}[n]}`,{self:{barColor:i,closeIconColor:a,closeIconColorHover:s,closeIconColorPressed:c,tabColor:l,tabBorderColor:u,paneTextColor:d,tabFontWeight:f,tabBorderRadius:p,tabFontWeightActive:m,colorSegment:h,fontWeightStrong:_,tabColorSegment:v,closeSize:y,closeIconSize:b,closeColorHover:x,closeColorPressed:S,closeBorderRadius:C,[H(`panePadding`,e)]:w,[H(`tabPadding`,r)]:T,[H(`tabPaddingVertical`,r)]:E,[H(`tabGap`,r)]:ee,[H(`tabGap`,`${r}Vertical`)]:D,[H(`tabTextColor`,n)]:O,[H(`tabTextColorActive`,n)]:k,[H(`tabTextColorHover`,n)]:A,[H(`tabTextColorDisabled`,n)]:j,[H(`tabFontSize`,e)]:M},common:{cubicBezierEaseInOut:N}}=o.value;return{"--n-bezier":N,"--n-color-segment":h,"--n-bar-color":i,"--n-tab-font-size":M,"--n-tab-text-color":O,"--n-tab-text-color-active":k,"--n-tab-text-color-disabled":j,"--n-tab-text-color-hover":A,"--n-pane-text-color":d,"--n-tab-border-color":u,"--n-tab-border-radius":p,"--n-close-size":y,"--n-close-icon-size":b,"--n-close-color-hover":x,"--n-close-color-pressed":S,"--n-close-border-radius":C,"--n-close-icon-color":a,"--n-close-icon-color-hover":s,"--n-close-icon-color-pressed":c,"--n-tab-color":l,"--n-tab-font-weight":f,"--n-tab-font-weight-active":m,"--n-tab-padding":T,"--n-tab-padding-vertical":E,"--n-tab-gap":ee,"--n-tab-gap-vertical":D,"--n-pane-padding-left":ae(w,`left`),"--n-pane-padding-right":ae(w,`right`),"--n-pane-padding-top":ae(w,`top`),"--n-pane-padding-bottom":ae(w,`bottom`),"--n-font-weight-strong":_,"--n-tab-color-segment":v}}),Se=i?de(`tabs`,B(()=>`${g.value[0]}${t.type[0]}`),xe,t):void 0;return Object.assign({mergedClsPrefix:r,mergedValue:b,renderedNames:new Set,segmentCapsuleElRef:K,tabsPaneWrapperRef:N,tabsElRef:s,barElRef:c,addTabInstRef:u,xScrollInstRef:d,scrollWrapperElRef:l,addTabFixed:J,tabWrapperStyle:T,handleNavResize:ue,mergedSize:g,handleScroll:_e,handleTabsResize:pe,cssVars:i?void 0:xe,themeClass:Se?.themeClass,animationDirection:re,renderNameListRef:R,yScrollElRef:f,handleSegmentResize:ye,onAnimationBeforeLeave:te,onAnimationEnter:L,onAnimationAfterEnter:ne,onRender:Se?.onRender},ve)},render(){let{mergedClsPrefix:e,type:t,placement:i,addTabFixed:a,addable:o,mergedSize:s,renderNameListRef:c,onRender:l,paneWrapperClass:u,paneWrapperStyle:d,$slots:{default:f,prefix:p,suffix:m}}=this;l?.();let h=f?we(f()).filter(e=>e.type.__TAB_PANE__===!0):[],_=f?we(f()).filter(e=>e.type.__TAB__===!0):[],v=!_.length,y=t===`card`,b=t===`segment`,x=!y&&!b&&this.justifyContent;c.value=[];let S=()=>{let t=n(`div`,{style:this.tabWrapperStyle,class:`${e}-tabs-wrapper`},x?null:n(`div`,{class:`${e}-tabs-scroll-padding`,style:i===`top`||i===`bottom`?{width:`${this.tabsPadding}px`}:{height:`${this.tabsPadding}px`}}),v?h.map((e,t)=>(c.value.push(e.props.name),Pt(n(Et,Object.assign({},e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0&&(!x||x===`center`||x===`start`||x===`end`)}),e.children?{default:e.children.tab}:void 0)))):_.map((e,t)=>(c.value.push(e.props.name),Pt(t!==0&&!x?Nt(e):e))),!a&&o&&y?Mt(o,(v?h.length:_.length)!==0):null,x?null:n(`div`,{class:`${e}-tabs-scroll-padding`,style:{width:`${this.tabsPadding}px`}}));return n(`div`,{ref:`tabsElRef`,class:`${e}-tabs-nav-scroll-content`},y&&o?n(r,{onResize:this.handleTabsResize},{default:()=>t}):t,y?n(`div`,{class:`${e}-tabs-pad`}):null,y?null:n(`div`,{ref:`barElRef`,class:`${e}-tabs-bar`}))},C=b?`top`:i;return n(`div`,{class:[`${e}-tabs`,this.themeClass,`${e}-tabs--${t}-type`,`${e}-tabs--${s}-size`,x&&`${e}-tabs--flex`,`${e}-tabs--${C}`],style:this.cssVars},n(`div`,{class:[`${e}-tabs-nav--${t}-type`,`${e}-tabs-nav--${C}`,`${e}-tabs-nav`]},g(p,t=>t&&n(`div`,{class:`${e}-tabs-nav__prefix`},t)),b?n(r,{onResize:this.handleSegmentResize},{default:()=>n(`div`,{class:`${e}-tabs-rail`,ref:`tabsElRef`},n(`div`,{class:`${e}-tabs-capsule`,ref:`segmentCapsuleElRef`},n(`div`,{class:`${e}-tabs-wrapper`},n(`div`,{class:`${e}-tabs-tab`}))),v?h.map((e,t)=>(c.value.push(e.props.name),n(Et,Object.assign({},e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0}),e.children?{default:e.children.tab}:void 0))):_.map((e,t)=>(c.value.push(e.props.name),t===0?e:Nt(e))))}):n(r,{onResize:this.handleNavResize},{default:()=>n(`div`,{class:`${e}-tabs-nav-scroll-wrapper`,ref:`scrollWrapperElRef`},[`top`,`bottom`].includes(C)?n(Ze,{ref:`xScrollInstRef`,onScroll:this.handleScroll},{default:S}):n(`div`,{class:`${e}-tabs-nav-y-scroll`,onScroll:this.handleScroll,ref:`yScrollElRef`},S()))}),a&&o&&y?Mt(o,!0):null,g(m,t=>t&&n(`div`,{class:`${e}-tabs-nav__suffix`},t))),v&&(this.animated&&(C===`top`||C===`bottom`)?n(`div`,{ref:`tabsPaneWrapperRef`,style:d,class:[`${e}-tabs-pane-wrapper`,u]},jt(h,this.mergedValue,this.renderedNames,this.onAnimationBeforeLeave,this.onAnimationEnter,this.onAnimationAfterEnter,this.animationDirection)):jt(h,this.mergedValue,this.renderedNames)))}});function jt(e,t,r,a,o,s,c){let l=[];return e.forEach(e=>{let{name:n,displayDirective:a,"display-directive":o}=e.props,s=e=>a===e||o===e,c=t===n;if(e.key!==void 0&&(e.key=n),c||s(`show`)||s(`show:lazy`)&&r.has(n)){r.has(n)||r.add(n);let t=!s(`if`);l.push(t?le(e,[[i,c]]):e)}}),c?n(fe,{name:`${c}-transition`,onBeforeLeave:a,onEnter:o,onAfterEnter:s},{default:()=>l}):l}function Mt(e,t){return n(Et,{ref:`addTabInstRef`,key:`__addable`,name:`__addable`,internalCreatedByPane:!0,internalAddable:!0,internalLeftPadded:t,disabled:typeof e==`object`&&e.disabled})}function Nt(e){let n=t(e);return n.props?n.props.internalLeftPadded=!0:n.props={internalLeftPadded:!0},n}function Pt(e){return Array.isArray(e.dynamicProps)?e.dynamicProps.includes(`internalLeftPadded`)||e.dynamicProps.push(`internalLeftPadded`):e.dynamicProps=[`internalLeftPadded`],e}var Ft={class:`apps`},It={key:0,class:`text-muted`},Lt=[`id`],Rt=[`onClick`],zt={class:`app-name`},Bt={class:`app-meta`},Vt={class:`app-meta mono`},Ht={key:0,class:`app-body`},Ut={class:`mono text-muted`},Wt={class:`svc-list`},Gt={class:`svc-name`},Kt={class:`svc-status text-muted`},qt={class:`svc-res mono text-muted`},Jt={class:`svc-btns`},Yt={key:1,class:`app-actions`},Xt={key:1,class:`text-muted hint`},Zt=K(b({__name:`DockerProjectsPanel`,props:{containers:{},focus:{}},emits:[`logs`,`env`,`uninstall`],setup(e,{emit:t}){let n=e,r=t,{t:i}=oe(),s=B(()=>Je(n.containers)),c=I({});function l(e){return c.value[e.name]??(e.verdict===`danger`||e.verdict===`warn`)}function d(e){c.value={...c.value,[e.name]:!l(e)}}z(()=>[n.focus,s.value.length],async([e,t])=>{!e||t===0||(c.value={...c.value,[e]:!0},await C(),document.getElementById(`app-${e}`)?.scrollIntoView({block:`center`,behavior:`smooth`}))},{immediate:!0});let m={ok:`success`,warn:`warning`,danger:`error`,stopped:`default`},g=e=>i({ok:`docker.apps.statusOk`,warn:`docker.apps.statusWarn`,danger:`docker.apps.statusDanger`,stopped:`docker.apps.statusStopped`}[e]);function v(e){return e.state===`restarting`?i(`docker.apps.restarting`):e.health===`unhealthy`?i(`docker.apps.unhealthy`):e.health===`starting`?i(`docker.apps.starting`):``}function b(e){return e.state===`running`?e.health===`unhealthy`?`danger`:e.health===`starting`?`warn`:`ok`:e.state===`restarting`?`danger`:e.state===`paused`?`warn`:`off`}return(t,n)=>{let c=se(`RouterLink`);return y(),o(`div`,Ft,[e.containers.length===0?(y(),o(`p`,It,M(k(i)(`docker.apps.noContainers`)),1)):_(``,!0),(y(!0),o(a,null,te(s.value,e=>(y(),o(`div`,{key:e.name,id:`app-${e.name}`,class:ue([`app-card`,`v-${e.verdict}`])},[p(`button`,{type:`button`,class:`app-head`,onClick:t=>d(e)},[f(k(R),{component:l(e)?k(He):k(Ve),size:`16`},null,8,[`component`]),p(`span`,zt,M(e.name||k(i)(`docker.apps.other`)),1),f(k(Se),{size:`small`,type:m[e.verdict],bordered:!1},{default:q(()=>[u(M(g(e.verdict)),1)]),_:2},1032,[`type`]),p(`span`,Bt,M(k(i)(`docker.apps.runningOf`,{running:e.running,total:e.containers.length})),1),p(`span`,Vt,M(e.cpu.toFixed(1))+`% · `+M(k(Q)(e.mem)),1)],8,Rt),l(e)?(y(),o(`div`,Ht,[e.workingDir?(y(),h(c,{key:0,to:{path:`/files`,query:{path:e.workingDir}},class:`folder-link`},{default:q(()=>[f(k(R),{component:k(_e),size:`14`},null,8,[`component`]),u(` `+M(k(i)(`docker.apps.openFolder`))+` `,1),p(`span`,Ut,M(e.workingDir),1)]),_:2},1032,[`to`])):_(``,!0),p(`ul`,Wt,[(y(!0),o(a,null,te(e.containers,e=>(y(),o(`li`,{key:e.id},[p(`span`,{class:ue([`dot`,`d-${b(e)}`])},null,2),p(`span`,Gt,M(e.service||e.name),1),v(e)?(y(),o(`span`,{key:0,class:ue([`svc-note`,{danger:e.health===`unhealthy`||e.state===`restarting`}])},M(v(e)),3)):_(``,!0),p(`span`,Kt,M(e.status),1),p(`span`,qt,M(e.hasStats?`${e.stats.cpuPercent.toFixed(1)}% · ${k(Q)(e.stats.memUsageBytes)}`:`—`),1),p(`span`,Jt,[f(k(O),{size:`tiny`,quaternary:``,onClick:t=>r(`env`,e)},{default:q(()=>[u(M(k(i)(`docker.env.button`)),1)]),_:1},8,[`onClick`]),f(k(O),{size:`tiny`,quaternary:``,onClick:t=>r(`logs`,e)},{default:q(()=>[u(M(k(i)(`docker.logs.button`)),1)]),_:1},8,[`onClick`])])]))),128))]),e.name?(y(),o(`div`,Yt,[f(k(O),{size:`small`,quaternary:``,type:`error`,onClick:t=>r(`uninstall`,e.name)},{icon:q(()=>[f(k(R),{component:k(Ke)},null,8,[`component`])]),default:q(()=>[u(` `+M(k(i)(`docker.apps.uninstall.button`)),1)]),_:1},8,[`onClick`])])):_(``,!0)])):_(``,!0)],10,Lt))),128)),e.containers.length>0?(y(),o(`p`,Xt,M(k(i)(`docker.apps.hint`)),1)):_(``,!0)])}}}),[[`__scopeId`,`data-v-ad4386b4`]]),Qt={class:`text-muted note`},$t={key:0,class:`center`},en={class:`controls`},tn={style:{margin:`0 0 8px`}},nn={class:`reveal-row`},rn={key:0,class:`reveal-error`},an={key:1,class:`text-muted`},on={key:2,class:`text-muted`},sn={key:3,class:`env-list`},cn={class:`env-key`},ln={key:1},un=K(b({__name:`ContainerEnvDrawer`,props:{show:{type:Boolean},container:{}},emits:[`update:show`],setup(e,{emit:t}){let n=e,r=t,{t:i}=oe(),s=Ie(),c=We(`env-filter`),l=Ge(`env-reveal-password`),d=I(!1),m=I(``),g=I([]),v=I(!0),b=I(``),x=I(null),S=I(!1),C=I(``),w=I(``),T=I(!1);function E(){g.value=[],m.value=``,b.value=``,x.value=null,S.value=!1,C.value=``,w.value=``}async function ee(){if(n.container){d.value=!0,m.value=``;try{g.value=(await Z.containerEnv(n.container.id)).vars}catch(e){m.value=e instanceof N?e.message:i(`docker.env.loadFailed`)}finally{d.value=!1}}}z(()=>[n.show,n.container?.id],([e])=>{E(),e&&ee()});let D=B(()=>g.value.filter(e=>e.imageDefault).length),A=B(()=>g.value.filter(e=>e.secret).length),j=B(()=>{let e=b.value.trim().toLowerCase();return g.value.filter(t=>v.value&&t.imageDefault&&!t.secret?!1:!e||t.key.toLowerCase().includes(e))});function P(e){return e.secret?x.value?.[e.key]:e.value}async function F(){if(!(!n.container||!C.value)){T.value=!0,w.value=``;try{x.value=(await Z.revealEnv(n.container.id,C.value)).values,S.value=!1,C.value=``}catch(e){w.value=e instanceof N&&e.status===403?i(`common.wrongPassword`):e instanceof N?e.message:i(`docker.env.loadFailed`)}finally{T.value=!1}}}async function L(e){try{await qe(e),s.success(i(`docker.env.copied`))}catch{s.error(i(`docker.env.copyFailed`))}}return(t,n)=>(y(),h(k(Le),{show:e.show,width:640,placement:`right`,"onUpdate:show":n[6]||=e=>r(`update:show`,e)},{default:q(()=>[f(k(Re),{title:k(i)(`docker.env.title`,{name:e.container?.name??``}),closable:``},{default:q(()=>[p(`p`,Qt,M(k(i)(`docker.env.readOnlyNote`)),1),d.value?(y(),o(`div`,$t,[f(k(ge))])):m.value?(y(),h(k(Y),{key:1,type:`error`,title:m.value},null,8,[`title`])):(y(),o(a,{key:2},[p(`div`,en,[f(k(je),{value:b.value,"onUpdate:value":n[0]||=e=>b.value=e,size:`small`,clearable:``,placeholder:k(i)(`docker.env.filter`),"input-props":k(c),style:{"max-width":`200px`}},null,8,[`value`,`placeholder`,`input-props`]),D.value>0?(y(),h(k(Ne),{key:0,checked:v.value,"onUpdate:checked":n[1]||=e=>v.value=e,size:`small`},{default:q(()=>[u(M(k(i)(`docker.env.hideImageDefaults`,{count:D.value})),1)]),_:1},8,[`checked`])):_(``,!0),n[7]||=p(`span`,{class:`spacer`},null,-1),A.value>0&&!x.value&&!S.value?(y(),h(k(O),{key:1,size:`small`,onClick:n[2]||=e=>S.value=!0},{icon:q(()=>[f(k(R),{component:k(X)},null,8,[`component`])]),default:q(()=>[u(` `+M(k(i)(`docker.env.revealSecrets`,{count:A.value})),1)]),_:1})):_(``,!0),x.value?(y(),h(k(O),{key:2,size:`small`,quaternary:``,onClick:n[3]||=e=>x.value=null},{default:q(()=>[u(M(k(i)(`docker.env.hideAgain`)),1)]),_:1})):_(``,!0)]),S.value?(y(),h(k(Y),{key:0,type:`warning`,"show-icon":!1,class:`reveal-box`},{default:q(()=>[p(`p`,tn,M(k(i)(`docker.env.revealConfirm`)),1),p(`div`,nn,[f(k(je),{value:C.value,"onUpdate:value":n[4]||=e=>C.value=e,type:`password`,"show-password-on":`click`,size:`small`,placeholder:k(i)(`common.dashboardPassword`),"input-props":k(l),onKeyup:J(F,[`enter`])},null,8,[`value`,`placeholder`,`input-props`]),f(k(O),{size:`small`,onClick:n[5]||=e=>{S.value=!1,C.value=``,w.value=``}},{default:q(()=>[u(M(k(i)(`common.cancel`)),1)]),_:1}),f(k(O),{size:`small`,type:`primary`,loading:T.value,disabled:!C.value,onClick:F},{default:q(()=>[u(M(k(i)(`docker.env.reveal`)),1)]),_:1},8,[`loading`,`disabled`])]),w.value?(y(),o(`p`,rn,M(w.value),1)):_(``,!0)]),_:1})):_(``,!0),g.value.length===0?(y(),o(`p`,an,M(k(i)(`docker.env.none`)),1)):j.value.length===0?(y(),o(`p`,on,M(k(i)(`docker.env.noMatch`)),1)):(y(),o(`ul`,sn,[(y(!0),o(a,null,te(j.value,e=>(y(),o(`li`,{key:e.key},[p(`span`,cn,M(e.key),1),p(`span`,{class:ue([`env-val`,{masked:e.secret&&P(e)===void 0}])},[e.secret&&P(e)===void 0?(y(),o(a,{key:0},[f(k(R),{component:k(X),size:`12`},null,8,[`component`]),n[8]||=u(` •••••••• `,-1)],64)):(y(),o(a,{key:1},[u(M(P(e)),1)],64))],2),P(e)!==void 0&&P(e)!==``?(y(),h(k(O),{key:0,size:`tiny`,quaternary:``,title:k(i)(`docker.env.copy`),onClick:t=>L(P(e))},{default:q(()=>[f(k(R),{component:k(Ue),size:`13`},null,8,[`component`])]),_:1},8,[`title`,`onClick`])):(y(),o(`span`,ln))]))),128))]))],64))]),_:1},8,[`title`])]),_:1},8,[`show`]))}}),[[`__scopeId`,`data-v-ad269986`]]),dn={key:0,class:`center`},fn={class:`text-muted`},pn={class:`text-muted`},mn={class:`fail-list`},hn={class:`text-muted`},gn={class:`block`},_n={class:`label`},vn={class:`row`},yn={class:`mono`},bn={key:0,class:`row`},xn={class:`mono`},Sn={key:0,class:`block`},Cn={class:`danger-text`},wn={key:0,class:`hint danger-text`},Tn={key:1,class:`hint text-muted`},En={key:1,class:`block`},Dn={class:`hint text-muted`},On={class:`note text-muted`},kn={class:`block`},An={class:`block`},jn={class:`label`},Mn={class:`mono`},Nn={key:0,class:`mismatch`},Pn={key:3,class:`hint text-muted`},Fn={class:`footer`},In=K(b({__name:`AppUninstallModal`,props:{show:{type:Boolean},name:{}},emits:[`update:show`,`done`],setup(e,{emit:t}){let n=e,r=t,{t:i}=oe(),s=I(!1),c=I(null),l=I(``),d=I(!1),m=I(!1),g=I(``),v=I(``),b=I(!1),x=I(``),S=I(null);function C(){c.value=null,l.value=``,d.value=!1,m.value=!1,g.value=``,v.value=``,x.value=``,S.value=null}z(()=>[n.show,n.name],async([e,t])=>{if(C(),!(!e||!t)){s.value=!0;try{c.value=await Z.uninstallPlan(t)}catch(e){l.value=e instanceof N?e.message:i(`docker.apps.uninstall.loadFailed`)}finally{s.value=!1}}});let w=We(`confirm-app-name`),T=Ge(`confirm-password`),E=B(()=>g.value!==``&&g.value!==n.name),ee=B(()=>!!c.value&&g.value===n.name&&!!v.value&&!b.value),D=B(()=>(c.value?.volumes??[]).join(`, `)),A=B(()=>(S.value??[]).filter(e=>!e.ok)),j=B(()=>(S.value??[]).filter(e=>e.ok).length);async function P(){if(ee.value){b.value=!0,x.value=``;try{S.value=(await Z.uninstallProject(n.name,{password:v.value,confirmName:g.value,removeVolumes:d.value,removeImages:m.value})).steps,v.value=``,r(`done`)}catch(e){x.value=e instanceof N&&e.status===403?i(`common.wrongPassword`):e instanceof N?e.message:i(`docker.apps.uninstall.failed`)}finally{b.value=!1}}}function F(){b.value||r(`update:show`,!1)}return(t,n)=>(y(),h(k(Te),{show:e.show,preset:`card`,title:S.value?k(i)(`docker.apps.uninstall.doneTitle`):k(i)(`docker.apps.uninstall.title`,{name:e.name}),style:{"max-width":`520px`},closable:!b.value,"mask-closable":!1,"close-on-esc":!b.value,"onUpdate:show":F},{footer:q(()=>[p(`div`,Fn,[S.value?(y(),h(k(O),{key:0,type:`primary`,onClick:F},{default:q(()=>[u(M(k(i)(`docker.apps.uninstall.close`)),1)]),_:1})):(y(),o(a,{key:1},[f(k(O),{disabled:b.value,onClick:F},{default:q(()=>[u(M(k(i)(`common.cancel`)),1)]),_:1},8,[`disabled`]),f(k(O),{type:`error`,loading:b.value,disabled:!ee.value,onClick:P},{default:q(()=>[u(M(k(i)(`docker.apps.uninstall.confirm`)),1)]),_:1},8,[`loading`,`disabled`])],64))])]),default:q(()=>[s.value?(y(),o(`div`,dn,[f(k(ge)),n[4]||=u(),p(`span`,fn,M(k(i)(`docker.apps.uninstall.loading`)),1)])):l.value?(y(),h(k(Y),{key:1,type:`error`,title:l.value},null,8,[`title`])):S.value?(y(),o(a,{key:2},[A.value.length===0?(y(),h(k(Y),{key:0,type:`success`,"show-icon":!1},{default:q(()=>[u(M(k(i)(`docker.apps.uninstall.doneOk`,{count:j.value})),1)]),_:1})):(y(),o(a,{key:1},[p(`p`,pn,M(k(i)(`docker.apps.uninstall.doneOk`,{count:j.value})),1),f(k(Y),{type:`warning`,title:k(i)(`docker.apps.uninstall.doneFailed`,{count:A.value.length})},{default:q(()=>[p(`ul`,mn,[(y(!0),o(a,null,te(A.value,e=>(y(),o(`li`,{key:e.kind+e.name},[p(`strong`,null,M(k(i)(`docker.apps.uninstall.kind.${e.kind}`))+` `+M(e.name),1),p(`span`,hn,` — `+M(e.error),1)]))),128))])]),_:1},8,[`title`])],64))],64)):c.value?(y(),o(a,{key:3},[p(`div`,gn,[p(`div`,_n,M(k(i)(`docker.apps.uninstall.willRemove`)),1),p(`div`,vn,[u(M(k(i)(`docker.apps.uninstall.containers`,{count:c.value.containers.length}))+`: `,1),p(`span`,yn,M(c.value.containers.map(e=>e.service||e.name).join(`, `)),1)]),c.value.networks.length?(y(),o(`div`,bn,[u(M(k(i)(`docker.apps.uninstall.networks`,{count:c.value.networks.length}))+`: `,1),p(`span`,xn,M(c.value.networks.join(`, `)),1)])):_(``,!0)]),c.value.volumes.length?(y(),o(`div`,Sn,[f(k(Ne),{checked:d.value,"onUpdate:checked":n[0]||=e=>d.value=e,disabled:b.value},{default:q(()=>[p(`span`,Cn,M(k(i)(`docker.apps.uninstall.removeVolumes`)),1)]),_:1},8,[`checked`,`disabled`]),d.value?(y(),o(`p`,wn,M(k(i)(`docker.apps.uninstall.volumesWarn`,{names:D.value})),1)):(y(),o(`p`,Tn,M(k(i)(`docker.apps.uninstall.keepVolumes`,{names:D.value})),1))])):_(``,!0),c.value.images.length?(y(),o(`div`,En,[f(k(Ne),{checked:m.value,"onUpdate:checked":n[1]||=e=>m.value=e,disabled:b.value},{default:q(()=>[u(M(k(i)(`docker.apps.uninstall.removeImages`,{count:c.value.images.length})),1)]),_:1},8,[`checked`,`disabled`]),p(`p`,Dn,M(k(i)(`docker.apps.uninstall.imagesHint`)),1)])):_(``,!0),p(`p`,On,M(k(i)(`docker.apps.uninstall.keepNote`)),1),p(`div`,kn,[f(k(je),{value:v.value,"onUpdate:value":n[2]||=e=>v.value=e,type:`password`,"show-password-on":`click`,size:`small`,disabled:b.value,placeholder:k(i)(`docker.apps.uninstall.password`),"input-props":k(T),onKeyup:J(P,[`enter`])},null,8,[`value`,`disabled`,`placeholder`,`input-props`])]),p(`div`,An,[p(`div`,jn,[u(M(k(i)(`docker.apps.uninstall.typeName`))+`: `,1),p(`span`,Mn,M(e.name),1)]),f(k(je),{value:g.value,"onUpdate:value":n[3]||=e=>g.value=e,size:`small`,disabled:b.value,placeholder:e.name,status:E.value?`error`:void 0,"input-props":k(w)},null,8,[`value`,`disabled`,`placeholder`,`status`,`input-props`]),E.value?(y(),o(`p`,Nn,M(k(i)(`docker.apps.uninstall.nameMismatch`)),1)):_(``,!0)]),x.value?(y(),h(k(Y),{key:2,type:`error`,title:x.value,class:`block`},null,8,[`title`])):_(``,!0),b.value?(y(),o(`p`,Pn,M(k(i)(`docker.apps.uninstall.working`)),1)):_(``,!0)],64)):_(``,!0)]),_:1},8,[`show`,`title`,`closable`,`close-on-esc`]))}}),[[`__scopeId`,`data-v-b79970b9`]]),Ln=5e3;function Rn(){let e=I([]),t=I(!1),n;function r(r,a,o){i(),e.value=[];let s=`/api/docker/containers/${encodeURIComponent(r)}/logs/stream?sinceMin=${a}&tail=${o}`;n=new EventSource(s),n.onopen=()=>{t.value=!0},n.onerror=()=>{t.value=!1},n.onmessage=t=>{try{let n=JSON.parse(t.data);e.value.push(n),e.value.length>Ln&&e.value.splice(0,e.value.length-Ln)}catch{}}}function i(){n?.close(),n=void 0,t.value=!1}return{lines:e,connected:t,open:r,close:i}}var zn={key:1,class:`tab-loading`},Bn={key:0,class:`log-empty`},Vn={key:0,class:`log-empty`},Hn={key:0,class:`log-ts`},Un={class:`log-text`},Wn=500,Gn=K(b({__name:`DockerView`,setup(e){let{t}=oe(),r=Ie();function i(e){return e instanceof N&&e.status===503&&!!e.body&&typeof e.body==`object`&&`enabled`in e.body}function s(e,t){r.error(e instanceof N?e.message:t)}let c=e=>e===`running`?`success`:e===`paused`||e===`restarting`?`warning`:e===`dead`?`error`:`default`,l={running:0,restarting:1,paused:2,created:3,exited:4,dead:5};function d(e){return l[e.state]??6}function m(e,t){return e.hasStats?t(e.stats):-1}let g=I([]),v=I(!0),b=I(null),x;async function S(){try{let e=await Z.containers();g.value=e.containers??[],b.value=null}catch(e){i(e)&&(b.value=e.body)}finally{v.value=!1}}async function w(e,n){try{let t=await Z.containerAction(e,n);g.value=t.containers}catch(e){s(e,t(`docker.actionFailed`,{action:n}))}}let T=I(!1),D=I(``),A=I(``),j=I(15),P=[{label:t(`docker.logs.last5m`),value:5},{label:t(`docker.logs.last10m`),value:10},{label:t(`docker.logs.last15m`),value:15},{label:t(`docker.logs.last1h`),value:60},{label:t(`docker.logs.last6h`),value:360},{label:t(`docker.logs.last24h`),value:1440}],F=I(!1),L=I(``);function ne(e){L.value=e,F.value=!0}let R=I(!1),re=I(null);function ae(e){re.value=e,R.value=!0}let V=Rn(),H=I(null),U=I(!0),W=I(!1),G;function se(e,t){W.value=!1,G&&clearTimeout(G),G=setTimeout(()=>{V.connected.value||(W.value=!0)},6e3),V.open(e,t,Wn)}function K(){U.value=!0,se(D.value,j.value)}function ce(e){D.value=e.id,A.value=e.name,T.value=!0,U.value=!0,se(e.id,j.value)}z(j,e=>{T.value&&(U.value=!0,se(D.value,e))}),z(T,e=>{e||(V.close(),G&&clearTimeout(G))}),z(V.connected,e=>{e&&(W.value=!1,G&&clearTimeout(G))}),z(()=>V.lines.value.length,async()=>{if(!U.value)return;await C();let e=H.value;e&&(e.scrollTop=e.scrollHeight)});function le(){let e=H.value;if(!e)return;let t=e.scrollHeight-e.scrollTop-e.clientHeight<24;U.value=t}function J(e){if(!e)return``;let t=new Date(e);return Number.isNaN(t.getTime())?``:t.toLocaleTimeString()}let de=/\b(error|fatal|panic|exception|critical)\b/i,fe=/\bwarn(?:ing)?\b/i;function pe(e){return e.stream===`stderr`||de.test(e.text)?`log-line--error`:fe.test(e.text)?`log-line--warn`:``}let me=B(()=>[{title:t(`common.name`),key:`name`,width:160,ellipsis:{tooltip:!0},sorter:(e,t)=>e.name.localeCompare(t.name)},{title:`Image`,key:`image`,width:180,ellipsis:{tooltip:!0},sorter:(e,t)=>e.image.localeCompare(t.image)},{title:`Status`,key:`state`,width:130,sorter:(e,t)=>d(e)-d(t),render:e=>n(Se,{type:c(e.state),size:`small`},{default:()=>e.status})},{title:`CPU`,key:`cpu`,width:70,sorter:(e,t)=>m(e,e=>e.cpuPercent)-m(t,e=>e.cpuPercent),render:e=>e.hasStats?`${e.stats.cpuPercent.toFixed(1)}%`:`—`},{title:`RAM`,key:`ram`,width:150,sorter:(e,t)=>m(e,e=>e.memUsageBytes)-m(t,e=>e.memUsageBytes),render:e=>e.hasStats?`${Q(e.stats.memUsageBytes)} / ${Q(e.stats.memLimitBytes)}`:`—`},{title:`Network`,key:`net`,width:140,sorter:(e,t)=>m(e,e=>e.netRxBytes+e.netTxBytes)-m(t,e=>e.netRxBytes+e.netTxBytes),render:e=>e.hasStats?`↓ ${Q(e.stats.netRxBytes)} ↑ ${Q(e.stats.netTxBytes)}`:`—`},{title:`Ports`,key:`ports`,width:220,ellipsis:{tooltip:!0}},{title:t(`common.actions`),key:`actions`,width:270,render:e=>n(ze,{size:`small`},()=>[e.state===`running`?[n(O,{size:`tiny`,onClick:()=>w(e.id,`stop`)},()=>`Stop`),n(O,{size:`tiny`,onClick:()=>w(e.id,`restart`)},()=>`Restart`)]:n(O,{size:`tiny`,type:`primary`,onClick:()=>w(e.id,`start`)},()=>`Start`),n(O,{size:`tiny`,quaternary:!0,onClick:()=>ce(e)},()=>t(`docker.logs.button`)),n(Be,{onPositiveClick:()=>w(e.id,`remove`)},{trigger:()=>n(O,{size:`tiny`,type:`error`,ghost:!0},()=>t(`common.delete`)),default:()=>t(`docker.confirmDeleteContainer`,{name:e.name})})])}]),he=I([]),_e=I(!0),ye=I(null);async function be(){_e.value=!0;try{let e=await Z.images();he.value=e.images,ye.value=null}catch(e){i(e)&&(ye.value=e.body)}finally{_e.value=!1}}async function we(e){try{let t=await Z.removeImage(e);he.value=t.images}catch(e){s(e,t(`docker.removeImageFailed`))}}let Te=B(()=>[{title:`Tag`,key:`tag`,minWidth:200,ellipsis:{tooltip:!0},sorter:(e,t)=>e.tag.localeCompare(t.tag),render:e=>e.dangling?n(ze,{size:`small`,align:`center`},()=>[e.tag,n(Se,{size:`small`,type:`warning`},()=>`dangling`)]):e.tag},{title:t(`common.size`),key:`sizeBytes`,width:110,sorter:(e,t)=>e.sizeBytes-t.sizeBytes,render:e=>Q(e.sizeBytes)},{title:t(`docker.usedColumn`),key:`containers`,width:140,sorter:(e,t)=>e.containers-t.containers,render:e=>e.containers<0?`—`:e.containers===0?t(`docker.notUsed`):t(`docker.containerCount`,{count:e.containers})},{title:t(`docker.created`),key:`created`,width:150,sorter:(e,t)=>Date.parse(e.created)-Date.parse(t.created),render:e=>Ye(e.created)},{title:t(`common.actions`),key:`actions`,width:100,render:e=>n(Be,{onPositiveClick:()=>we(e.id)},{trigger:()=>n(O,{size:`tiny`,type:`error`,ghost:!0},()=>t(`common.delete`)),default:()=>t(`docker.confirmDeleteImage`,{tag:e.tag})})}]),Ee=I([]),Oe=I(!0),ke=I(null);async function Ae(){Oe.value=!0;try{let e=await Z.volumes();Ee.value=e.volumes,ke.value=null}catch(e){i(e)&&(ke.value=e.body)}finally{Oe.value=!1}}async function je(e){try{let t=await Z.removeVolume(e);Ee.value=t.volumes}catch(e){s(e,t(`docker.removeVolumeFailed`))}}let Me=B(()=>[{title:t(`common.name`),key:`name`,minWidth:180,ellipsis:{tooltip:!0},sorter:(e,t)=>e.name.localeCompare(t.name)},{title:`Driver`,key:`driver`,width:100,sorter:(e,t)=>e.driver.localeCompare(t.driver)},{title:t(`common.size`),key:`sizeBytes`,width:110,sorter:(e,t)=>e.sizeBytes-t.sizeBytes,render:e=>e.sizeBytes<0?t(`docker.unknown`):Q(e.sizeBytes)},{title:`Status`,key:`inUse`,width:120,sorter:(e,t)=>Number(e.inUse)-Number(t.inUse),render:e=>n(Se,{size:`small`,type:e.inUse?`success`:`default`},()=>e.inUse?t(`docker.used`):t(`docker.notUsed`))},{title:t(`common.actions`),key:`actions`,width:100,render:e=>n(Be,{onPositiveClick:()=>je(e.name)},{trigger:()=>n(O,{size:`tiny`,type:`error`,ghost:!0},()=>t(`common.delete`)),default:()=>t(`docker.confirmDeleteVolume`,{name:e.name})})}]),Ne=I([]),Pe=I(!0),Fe=I(null);async function Ve(){Pe.value=!0;try{let e=await Z.networks();Ne.value=e.networks,Fe.value=null}catch(e){i(e)&&(Fe.value=e.body)}finally{Pe.value=!1}}async function He(e){try{let t=await Z.removeNetwork(e);Ne.value=t.networks}catch(e){s(e,t(`docker.removeNetworkFailed`))}}let Ue=B(()=>[{title:t(`common.name`),key:`name`,minWidth:160,ellipsis:{tooltip:!0},sorter:(e,t)=>e.name.localeCompare(t.name),render:e=>e.builtin?n(ze,{size:`small`,align:`center`},()=>[e.name,n(Se,{size:`small`},()=>`builtin`)]):e.name},{title:`Driver`,key:`driver`,width:100,sorter:(e,t)=>e.driver.localeCompare(t.driver)},{title:`Subnet`,key:`subnet`,width:150,sorter:(e,t)=>e.subnet.localeCompare(t.subnet),render:e=>e.subnet||`—`},{title:t(`docker.connectedContainers`),key:`connectedCount`,width:170,sorter:(e,t)=>e.connectedCount-t.connectedCount},{title:t(`common.actions`),key:`actions`,width:100,render:e=>e.builtin?null:n(Be,{onPositiveClick:()=>He(e.id)},{trigger:()=>n(O,{size:`tiny`,type:`error`,ghost:!0},()=>t(`common.delete`)),default:()=>t(`docker.confirmDeleteNetwork`,{name:e.name})})}]),X=I(null),We=I(!0),Ge=I(null),Ke=I(null);async function qe(){We.value=!0;try{X.value=await Z.settings(),Ge.value=null}catch(e){i(e)&&(Ge.value=e.body)}finally{We.value=!1}}async function Je(e){Ke.value=e;try{X.value=await Z.prune(e),r.success(t(`docker.cleanupDone`))}catch(n){s(n,t(`docker.cleanupFailed`,{kind:e}))}finally{Ke.value=null}}let Xe=ie(),Ze=typeof Xe.query.app==`string`?Xe.query.app:void 0,Qe=I(Xe.query.tab===`apps`?`apps`:`containers`),$e=new Set([`containers`]);return z(Qe,e=>{$e.has(e)||($e.add(e),e===`images`?be():e===`volumes`?Ae():e===`networks`?Ve():e===`settings`&&qe())}),ee(()=>{S(),x=setInterval(S,5e3)}),E(()=>{x&&clearInterval(x),G&&clearTimeout(G),V.close()}),(e,n)=>(y(),h(ve,null,{default:q(()=>[f(k(At),{type:`line`,value:Qe.value,"onUpdate:value":n[0]||=e=>Qe.value=e},{default:q(()=>[f(k(wt),{name:`containers`,tab:`Containers`},{default:q(()=>[b.value?(y(),h(k(Y),{key:0,type:`warning`,title:b.value.error},null,8,[`title`])):(y(),h(k(De),{key:1,columns:me.value,data:g.value,loading:v.value,"row-key":e=>e.id,"scroll-x":1200},null,8,[`columns`,`data`,`loading`,`row-key`]))]),_:1}),f(k(wt),{name:`apps`,tab:k(t)(`docker.apps.tab`)},{default:q(()=>[b.value?(y(),h(k(Y),{key:0,type:`warning`,title:b.value.error},null,8,[`title`])):(y(),h(Zt,{key:1,containers:g.value,focus:k(Ze),onLogs:ce,onEnv:ae,onUninstall:ne},null,8,[`containers`,`focus`]))]),_:1},8,[`tab`]),f(k(wt),{name:`images`,tab:`Images`},{default:q(()=>[ye.value?(y(),h(k(Y),{key:0,type:`warning`,title:ye.value.error},null,8,[`title`])):(y(),h(k(De),{key:1,columns:Te.value,data:he.value,loading:_e.value,"row-key":e=>e.id,"scroll-x":700},null,8,[`columns`,`data`,`loading`,`row-key`]))]),_:1}),f(k(wt),{name:`volumes`,tab:`Volumes`},{default:q(()=>[ke.value?(y(),h(k(Y),{key:0,type:`warning`,title:ke.value.error},null,8,[`title`])):(y(),h(k(De),{key:1,columns:Me.value,data:Ee.value,loading:Oe.value,"row-key":e=>e.name,"scroll-x":610},null,8,[`columns`,`data`,`loading`,`row-key`]))]),_:1}),f(k(wt),{name:`networks`,tab:`Networks`},{default:q(()=>[Fe.value?(y(),h(k(Y),{key:0,type:`warning`,title:Fe.value.error},null,8,[`title`])):(y(),h(k(De),{key:1,columns:Ue.value,data:Ne.value,loading:Pe.value,"row-key":e=>e.id,"scroll-x":680},null,8,[`columns`,`data`,`loading`,`row-key`]))]),_:1}),f(k(wt),{name:`settings`,tab:`Settings`},{default:q(()=>[Ge.value?(y(),h(k(Y),{key:0,type:`warning`,title:Ge.value.error},null,8,[`title`])):We.value&&!X.value?(y(),o(`div`,zn,[f(k(ge),{size:`large`})])):X.value?(y(),h(k(ze),{key:3,vertical:``,size:24},{default:q(()=>[f(k(bt),{title:k(t)(`docker.daemonInfo`),column:2,bordered:``,"label-placement":`left`},{default:q(()=>[f(k($),{label:k(t)(`docker.serverVersion`)},{default:q(()=>[u(M(X.value?.info.serverVersion),1)]),_:1},8,[`label`]),f(k($),{label:`OS / Kernel`},{default:q(()=>[u(M(X.value?.info.operatingSystem)+` / `+M(X.value?.info.kernelVersion),1)]),_:1}),f(k($),{label:`Storage Driver`},{default:q(()=>[u(M(X.value?.info.storageDriver),1)]),_:1}),f(k($),{label:`Root Dir`},{default:q(()=>[u(M(X.value?.info.dockerRootDir),1)]),_:1}),f(k($),{label:`Container`},{default:q(()=>[u(M(X.value?.info.containersRunning)+` running, `+M(X.value?.info.containersPaused)+` paused, `+M(X.value?.info.containersStopped)+` stopped `,1)]),_:1}),f(k($),{label:`Images`},{default:q(()=>[u(M(X.value?.info.images),1)]),_:1})]),_:1},8,[`title`]),f(k(bt),{title:`Disk Usage`,column:2,bordered:``,"label-placement":`left`},{default:q(()=>[f(k($),{label:`Images`},{default:q(()=>[u(M(k(Q)(X.value?.diskUsage.imagesTotalBytes??0))+` (reclaimable `+M(k(Q)(X.value?.diskUsage.imagesReclaimableBytes??0))+`) `,1)]),_:1}),f(k($),{label:`Containers`},{default:q(()=>[u(M(k(Q)(X.value?.diskUsage.containersTotalBytes??0)),1)]),_:1}),f(k($),{label:`Volumes`},{default:q(()=>[u(M(k(Q)(X.value?.diskUsage.volumesTotalBytes??0))+` (reclaimable `+M(k(Q)(X.value?.diskUsage.volumesReclaimableBytes??0))+`) `,1)]),_:1})]),_:1}),f(k(ze),null,{default:q(()=>[(y(),o(a,null,te([`containers`,`images`,`volumes`,`networks`,`all`],e=>f(k(Be),{key:e,onPositiveClick:t=>Je(e)},{trigger:q(()=>[f(k(O),{size:`small`,loading:Ke.value===e},{default:q(()=>[u(M(k(t)(`docker.cleanup`))+` `+M(e),1)]),_:2},1032,[`loading`])]),default:q(()=>[u(` `+M(k(t)(`docker.confirmCleanup`,{kind:e})),1)]),_:2},1032,[`onPositiveClick`])),64))]),_:1})]),_:1})):(y(),h(k(xe),{key:2,description:k(t)(`docker.noData`)},null,8,[`description`]))]),_:1})]),_:1},8,[`value`]),f(un,{show:R.value,"onUpdate:show":n[1]||=e=>R.value=e,container:re.value},null,8,[`show`,`container`]),f(In,{show:F.value,"onUpdate:show":n[2]||=e=>F.value=e,name:L.value,onDone:S},null,8,[`show`,`name`]),f(k(Le),{show:T.value,"onUpdate:show":n[4]||=e=>T.value=e,width:640,placement:`right`},{default:q(()=>[f(k(Re),{title:k(t)(`docker.logs.title`,{name:A.value}),closable:``},{default:q(()=>[f(k(Ce),{value:j.value,"onUpdate:value":n[3]||=e=>j.value=e,options:P,size:`small`,style:{width:`150px`,"margin-bottom":`10px`}},null,8,[`value`]),k(V).lines.value.length===0&&!k(V).connected.value?(y(),o(`div`,Bn,[p(`p`,null,M(W.value?k(t)(`docker.logs.connectingSlow`):k(t)(`docker.logs.connecting`)),1),W.value?(y(),h(k(O),{key:0,size:`tiny`,onClick:K},{default:q(()=>[u(M(k(t)(`docker.logs.reconnect`)),1)]),_:1})):_(``,!0)])):_(``,!0),p(`div`,{ref_key:`logScrollEl`,ref:H,class:`log-scroll`,onScroll:le},[k(V).lines.value.length===0&&k(V).connected.value?(y(),o(`p`,Vn,M(k(t)(`docker.logs.waiting`)),1)):_(``,!0),(y(!0),o(a,null,te(k(V).lines.value,(e,t)=>(y(),o(`div`,{key:t,class:ue([`log-line`,pe(e)])},[e.timestamp?(y(),o(`span`,Hn,M(J(e.timestamp)),1)):_(``,!0),p(`span`,Un,M(e.text),1)],2))),128))],544)]),_:1},8,[`title`])]),_:1},8,[`show`])]),_:1}))}}),[[`__scopeId`,`data-v-b9e93c92`]]);export{Gn as default};