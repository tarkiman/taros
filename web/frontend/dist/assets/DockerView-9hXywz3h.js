import{$ as e,An as t,Bn as n,Bt as r,Cn as i,E as a,Et as o,Fn as s,Gt as c,Hn as l,Jt as u,Kn as d,Nn as f,O as p,Pn as m,Qn as h,Qt as g,Rt as _,S as v,Sn as y,Tn as b,Vn as x,Wt as S,Xt as C,Yn as w,Yt as T,Zt as E,_n as D,an as O,bn as k,fn as ee,hn as A,jn as te,kt as ne,l as j,ln as M,lt as N,n as re,nt as P,ot as F,pn as I,qt as L,r as R,rn as z,tr as B,ut as V,vn as H,vt as U,wn as ie,wt as ae,xt as oe,yn as W,yt as G,zn as se}from"./auth-CKvW4zla.js";import{t as ce}from"./get-slot-DLVBGA1t.js";import{a as K,c as le,l as ue,n as q,o as de,r as J,t as Y,u as fe}from"./Popconfirm-nEXjwLKX.js";import{n as pe}from"./misc-DDs3MKLt.js";import{O as me,k as he}from"./light-CsJMWWoD.js";import{t as ge}from"./flatten-BLQ6lCxA.js";import{r as _e,t as ve}from"./_plugin-vue_export-helper-CvyeNErQ.js";import{o as ye,t as be}from"./AppShell-CWwxWrf9.js";import{t as xe}from"./Add-B_R8D4BT.js";import{t as X}from"./Alert-Bm8M0KpW.js";import{t as Se}from"./use-message-BV9M4reU.js";import{n as Ce,r as we}from"./light-7AQuyFOf.js";import{t as Te}from"./Spin-CnrKleEQ.js";import{n as Ee,t as Z}from"./format-BxLcbkc3.js";var De=le(`.v-x-scroll`,{overflow:`auto`,scrollbarWidth:`none`},[le(`&::-webkit-scrollbar`,{width:0,height:0})]),Oe=k({name:`XScroll`,props:{disabled:Boolean,onScroll:Function},setup(){let e=d(null);function t(e){!(e.currentTarget.offsetWidth<e.currentTarget.scrollWidth)||e.deltaY===0||(e.currentTarget.scrollLeft+=e.deltaY+e.deltaX,e.preventDefault())}let n=o();return De.mount({id:`vueuc/x-scroll`,head:!0,anchorMetaName:ue,ssr:n}),Object.assign({selfRef:e,handleWheel:t},{scrollTo(...t){var n;(n=e.value)==null||n.scrollTo(...t)}})},render(){return y(`div`,{ref:`selfRef`,onScroll:this.onScroll,onWheel:this.disabled?void 0:this.handleWheel,class:`v-x-scroll`},this.$slots)}});function ke(e,t=`default`,n=[]){let{children:r}=e;if(typeof r==`object`&&r&&!Array.isArray(r)){let e=r[t];if(typeof e==`function`)return e()}return n}var Ae=/\s/;function je(e){for(var t=e.length;t--&&Ae.test(e.charAt(t)););return t}var Me=/^\s+/;function Ne(e){return e&&e.slice(0,je(e)+1).replace(Me,``)}var Pe=NaN,Fe=/^[-+]0x[0-9a-f]+$/i,Ie=/^0b[01]+$/i,Le=/^0o[0-7]+$/i,Re=parseInt;function ze(t){if(typeof t==`number`)return t;if(P(t))return Pe;if(e(t)){var n=typeof t.valueOf==`function`?t.valueOf():t;t=e(n)?n+``:n}if(typeof t!=`string`)return t===0?t:+t;t=Ne(t);var r=Ie.test(t);return r||Le.test(t)?Re(t.slice(2),r?2:8):Fe.test(t)?Pe:+t}var Be=function(){return F.Date.now()},Ve=`Expected a function`,He=Math.max,Ue=Math.min;function We(t,n,r){var i,a,o,s,c,l,u=0,d=!1,f=!1,p=!0;if(typeof t!=`function`)throw TypeError(Ve);n=ze(n)||0,e(r)&&(d=!!r.leading,f=`maxWait`in r,o=f?He(ze(r.maxWait)||0,n):o,p=`trailing`in r?!!r.trailing:p);function m(e){var n=i,r=a;return i=a=void 0,u=e,s=t.apply(r,n),s}function h(e){return u=e,c=setTimeout(v,n),d?m(e):s}function g(e){var t=e-l,r=e-u,i=n-t;return f?Ue(i,o-r):i}function _(e){var t=e-l,r=e-u;return l===void 0||t>=n||t<0||f&&r>=o}function v(){var e=Be();if(_(e))return y(e);c=setTimeout(v,g(e))}function y(e){return c=void 0,p&&i?m(e):(i=a=void 0,s)}function b(){c!==void 0&&clearTimeout(c),u=0,i=l=a=c=void 0}function x(){return c===void 0?s:y(Be())}function S(){var e=Be(),t=_(e);if(i=arguments,a=this,l=e,t){if(c===void 0)return h(l);if(f)return clearTimeout(c),c=setTimeout(v,n),m(l)}return c===void 0&&(c=setTimeout(v,n)),s}return S.cancel=b,S.flush=x,S}var Ge=`Expected a function`;function Ke(t,n,r){var i=!0,a=!0;if(typeof t!=`function`)throw TypeError(Ge);return e(r)&&(i=`leading`in r?!!r.leading:i,a=`trailing`in r?!!r.trailing:a),We(t,n,{leading:i,maxWait:n,trailing:a})}var qe=S([c(`descriptions`,{fontSize:`var(--n-font-size)`},[c(`descriptions-separator`,`
 display: inline-block;
 margin: 0 8px 0 2px;
 `),c(`descriptions-table-wrapper`,[c(`descriptions-table`,[c(`descriptions-table-row`,[c(`descriptions-table-header`,{padding:`var(--n-th-padding)`}),c(`descriptions-table-content`,{padding:`var(--n-td-padding)`})])])]),T(`bordered`,[c(`descriptions-table-wrapper`,[c(`descriptions-table`,[c(`descriptions-table-row`,[S(`&:last-child`,[c(`descriptions-table-content`,{paddingBottom:0})])])])])]),u(`left-label-placement`,[c(`descriptions-table-content`,[S(`> *`,{verticalAlign:`top`})])]),u(`left-label-align`,[S(`th`,{textAlign:`left`})]),u(`center-label-align`,[S(`th`,{textAlign:`center`})]),u(`right-label-align`,[S(`th`,{textAlign:`right`})]),u(`bordered`,[c(`descriptions-table-wrapper`,`
 border-radius: var(--n-border-radius);
 overflow: hidden;
 background: var(--n-merged-td-color);
 border: 1px solid var(--n-merged-border-color);
 `,[c(`descriptions-table`,[c(`descriptions-table-row`,[S(`&:not(:last-child)`,[c(`descriptions-table-content`,{borderBottom:`1px solid var(--n-merged-border-color)`}),c(`descriptions-table-header`,{borderBottom:`1px solid var(--n-merged-border-color)`})]),c(`descriptions-table-header`,`
 font-weight: 400;
 background-clip: padding-box;
 background-color: var(--n-merged-th-color);
 `,[S(`&:not(:last-child)`,{borderRight:`1px solid var(--n-merged-border-color)`})]),c(`descriptions-table-content`,[S(`&:not(:last-child)`,{borderRight:`1px solid var(--n-merged-border-color)`})])])])])]),c(`descriptions-header`,`
 font-weight: var(--n-th-font-weight);
 font-size: 18px;
 transition: color .3s var(--n-bezier);
 line-height: var(--n-line-height);
 margin-bottom: 16px;
 color: var(--n-title-text-color);
 `),c(`descriptions-table-wrapper`,`
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[c(`descriptions-table`,`
 width: 100%;
 border-collapse: separate;
 border-spacing: 0;
 box-sizing: border-box;
 `,[c(`descriptions-table-row`,`
 box-sizing: border-box;
 transition: border-color .3s var(--n-bezier);
 `,[c(`descriptions-table-header`,`
 font-weight: var(--n-th-font-weight);
 line-height: var(--n-line-height);
 display: table-cell;
 box-sizing: border-box;
 color: var(--n-th-text-color);
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `),c(`descriptions-table-content`,`
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
 `)])])])]),c(`descriptions-table-wrapper`,`
 --n-merged-th-color: var(--n-th-color);
 --n-merged-td-color: var(--n-td-color);
 --n-merged-border-color: var(--n-border-color);
 `),E(c(`descriptions-table-wrapper`,`
 --n-merged-th-color: var(--n-th-color-modal);
 --n-merged-td-color: var(--n-td-color-modal);
 --n-merged-border-color: var(--n-border-color-modal);
 `)),g(c(`descriptions-table-wrapper`,`
 --n-merged-th-color: var(--n-th-color-popover);
 --n-merged-td-color: var(--n-td-color-popover);
 --n-merged-border-color: var(--n-border-color-popover);
 `))]),Je=`DESCRIPTION_ITEM_FLAG`;function Ye(e){return typeof e==`object`&&e&&!Array.isArray(e)?e.type&&e.type.DESCRIPTION_ITEM_FLAG:!1}var Xe=Object.assign(Object.assign({},p.props),{title:String,column:{type:Number,default:3},columns:Number,labelPlacement:{type:String,default:`top`},labelAlign:{type:String,default:`left`},separator:{type:String,default:`:`},size:String,bordered:Boolean,labelClass:String,labelStyle:[Object,String],contentClass:String,contentStyle:[Object,String]}),Ze=k({name:`Descriptions`,props:Xe,slots:Object,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n,mergedComponentPropsRef:r}=V(e),i=I(()=>e.size||r?.value?.Descriptions?.size||`medium`),a=p(`Descriptions`,`-descriptions`,qe,we,e,t),o=I(()=>{let{bordered:t}=e,n=i.value,{common:{cubicBezierEaseInOut:r},self:{titleTextColor:o,thColor:s,thColorModal:c,thColorPopover:l,thTextColor:u,thFontWeight:d,tdTextColor:f,tdColor:p,tdColorModal:m,tdColorPopover:h,borderColor:g,borderColorModal:_,borderColorPopover:v,borderRadius:y,lineHeight:b,[C(`fontSize`,n)]:x,[C(t?`thPaddingBordered`:`thPadding`,n)]:S,[C(t?`tdPaddingBordered`:`tdPadding`,n)]:w}}=a.value;return{"--n-title-text-color":o,"--n-th-padding":S,"--n-td-padding":w,"--n-font-size":x,"--n-bezier":r,"--n-th-font-weight":d,"--n-line-height":b,"--n-th-text-color":u,"--n-td-text-color":f,"--n-th-color":s,"--n-th-color-modal":c,"--n-th-color-popover":l,"--n-td-color":p,"--n-td-color-modal":m,"--n-td-color-popover":h,"--n-border-radius":y,"--n-border-color":g,"--n-border-color-modal":_,"--n-border-color-popover":v}}),s=n?N(`descriptions`,I(()=>{let t=``,{bordered:n}=e;return n&&(t+=`a`),t+=i.value[0],t}),o,e):void 0;return{mergedClsPrefix:t,cssVars:n?void 0:o,themeClass:s?.themeClass,onRender:s?.onRender,compitableColumn:ye(e,[`columns`,`column`]),inlineThemeDisabled:n,mergedSize:i}},render(){let e=this.$slots.default,t=e?ge(e()):[];t.length;let{contentClass:n,labelClass:r,compitableColumn:i,labelPlacement:a,labelAlign:o,mergedSize:s,bordered:c,title:l,cssVars:u,mergedClsPrefix:d,separator:f,onRender:p}=this;p?.();let m=t.filter(e=>Ye(e)),h=m.reduce((e,t,o)=>{let s=t.props||{},l=m.length-1===o,u=[`label`in s?s.label:ke(t,`label`)],p=[ke(t)],h=s.span||1,g=e.span;e.span+=h;let _=s.labelStyle||s[`label-style`]||this.labelStyle,v=s.contentStyle||s[`content-style`]||this.contentStyle;if(a===`left`)c?e.row.push(y(`th`,{class:[`${d}-descriptions-table-header`,r],colspan:1,style:_},u),y(`td`,{class:[`${d}-descriptions-table-content`,n],colspan:l?(i-g)*2+1:h*2-1,style:v},p)):e.row.push(y(`td`,{class:`${d}-descriptions-table-content`,colspan:l?(i-g)*2:h*2},y(`span`,{class:[`${d}-descriptions-table-content__label`,r],style:_},[...u,f&&y(`span`,{class:`${d}-descriptions-separator`},f)]),y(`span`,{class:[`${d}-descriptions-table-content__content`,n],style:v},p)));else{let t=l?(i-g)*2:h*2;e.row.push(y(`th`,{class:[`${d}-descriptions-table-header`,r],colspan:t,style:_},u)),e.secondRow.push(y(`td`,{class:[`${d}-descriptions-table-content`,n],colspan:t,style:v},p))}return(e.span>=i||l)&&(e.span=0,e.row.length&&(e.rows.push(e.row),e.row=[]),a!==`left`&&e.secondRow.length&&(e.rows.push(e.secondRow),e.secondRow=[])),e},{span:0,row:[],secondRow:[],rows:[]}).rows.map(e=>y(`tr`,{class:`${d}-descriptions-table-row`},e));return y(`div`,{style:u,class:[`${d}-descriptions`,this.themeClass,`${d}-descriptions--${a}-label-placement`,`${d}-descriptions--${o}-label-align`,`${d}-descriptions--${s}-size`,c&&`${d}-descriptions--bordered`]},l||this.$slots.header?y(`div`,{class:`${d}-descriptions-header`},l||ce(this,`header`)):null,y(`div`,{class:`${d}-descriptions-table-wrapper`},y(`table`,{class:`${d}-descriptions-table`},y(`tbody`,null,a===`top`&&y(`tr`,{class:`${d}-descriptions-table-row`,style:{visibility:`collapse`}},pe(i*2,y(`td`,null))),h))))}}),Qe={label:String,span:{type:Number,default:1},labelClass:String,labelStyle:[Object,String],contentClass:String,contentStyle:[Object,String]},Q=k({name:`DescriptionsItem`,[Je]:!0,props:Qe,slots:Object,render(){return null}}),$e=ne(`n-tabs`),et={tab:[String,Number,Object,Function],name:{type:[String,Number],required:!0},disabled:Boolean,displayDirective:{type:String,default:`if`},closable:{type:Boolean,default:void 0},tabProps:Object,label:[String,Number,Object,Function]},tt=k({__TAB_PANE__:!0,name:`TabPane`,alias:[`TabPanel`],props:et,slots:Object,setup(e){let t=i($e,null);return t||oe(`tab-pane`,"`n-tab-pane` must be placed inside `n-tabs`."),{style:t.paneStyleRef,class:t.paneClassRef,mergedClsPrefix:t.mergedClsPrefixRef}},render(){return y(`div`,{class:[`${this.mergedClsPrefix}-tab-pane`,this.class],style:this.style},this.$slots)}}),nt=Object.assign({internalLeftPadded:Boolean,internalAddable:Boolean,internalCreatedByPane:Boolean},he(et,[`displayDirective`])),rt=k({__TAB__:!0,inheritAttrs:!1,name:`Tab`,props:nt,setup(e){let{mergedClsPrefixRef:t,valueRef:n,typeRef:r,closableRef:a,tabStyleRef:o,addTabStyleRef:s,tabClassRef:c,addTabClassRef:l,tabChangeIdRef:u,onBeforeLeaveRef:d,triggerRef:f,handleAdd:p,activateTab:m,handleClose:h}=i($e);return{trigger:f,mergedClosable:I(()=>{if(e.internalAddable)return!1;let{closable:t}=e;return t===void 0?a.value:t}),style:o,addStyle:s,tabClass:c,addTabClass:l,clsPrefix:t,value:n,type:r,handleClose(t){t.stopPropagation(),!e.disabled&&h(e.name)},activateTab(){if(e.disabled)return;if(e.internalAddable){p();return}let{name:t}=e,r=++u.id;if(t!==n.value){let{value:i}=d;i?Promise.resolve(i(e.name,n.value)).then(e=>{e&&u.id===r&&m(t)}):m(t)}}}},render(){let{internalAddable:e,clsPrefix:t,name:n,disabled:r,label:i,tab:o,value:s,mergedClosable:c,trigger:l,$slots:{default:u}}=this,d=i??o;return y(`div`,{class:`${t}-tabs-tab-wrapper`},this.internalLeftPadded?y(`div`,{class:`${t}-tabs-tab-pad`}):null,y(`div`,Object.assign({key:n,"data-name":n,"data-disabled":r?!0:void 0},ie({class:[`${t}-tabs-tab`,s===n&&`${t}-tabs-tab--active`,r&&`${t}-tabs-tab--disabled`,c&&`${t}-tabs-tab--closable`,e&&`${t}-tabs-tab--addable`,e?this.addTabClass:this.tabClass],onClick:l===`click`?this.activateTab:void 0,onMouseenter:l===`hover`?this.activateTab:void 0,style:e?this.addStyle:this.style},this.internalCreatedByPane?this.tabProps||{}:this.$attrs)),y(`span`,{class:`${t}-tabs-tab__label`},e?y(M,null,y(`div`,{class:`${t}-tabs-tab__height-placeholder`},`\xA0`),y(a,{clsPrefix:t},{default:()=>y(xe,null)})):u?u():typeof d==`object`?d:me(d??n)),c&&this.type===`card`?y(v,{clsPrefix:t,class:`${t}-tabs-tab__close`,onClick:this.handleClose,disabled:r}):null))}}),it=c(`tabs`,`
 box-sizing: border-box;
 width: 100%;
 display: flex;
 flex-direction: column;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
`,[u(`segment-type`,[c(`tabs-rail`,[S(`&.transition-disabled`,[c(`tabs-capsule`,`
 transition: none;
 `)])])]),u(`top`,[c(`tab-pane`,`
 padding: var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left);
 `)]),u(`left`,[c(`tab-pane`,`
 padding: var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left) var(--n-pane-padding-top);
 `)]),u(`left, right`,`
 flex-direction: row;
 `,[c(`tabs-bar`,`
 width: 2px;
 right: 0;
 transition:
 top .2s var(--n-bezier),
 max-height .2s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `),c(`tabs-tab`,`
 padding: var(--n-tab-padding-vertical); 
 `)]),u(`right`,`
 flex-direction: row-reverse;
 `,[c(`tab-pane`,`
 padding: var(--n-pane-padding-left) var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom);
 `),c(`tabs-bar`,`
 left: 0;
 `)]),u(`bottom`,`
 flex-direction: column-reverse;
 justify-content: flex-end;
 `,[c(`tab-pane`,`
 padding: var(--n-pane-padding-bottom) var(--n-pane-padding-right) var(--n-pane-padding-top) var(--n-pane-padding-left);
 `),c(`tabs-bar`,`
 top: 0;
 `)]),c(`tabs-rail`,`
 position: relative;
 padding: 3px;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 background-color: var(--n-color-segment);
 transition: background-color .3s var(--n-bezier);
 display: flex;
 align-items: center;
 `,[c(`tabs-capsule`,`
 border-radius: var(--n-tab-border-radius);
 position: absolute;
 pointer-events: none;
 background-color: var(--n-tab-color-segment);
 box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .08);
 transition: transform 0.3s var(--n-bezier);
 `),c(`tabs-tab-wrapper`,`
 flex-basis: 0;
 flex-grow: 1;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[c(`tabs-tab`,`
 overflow: hidden;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[u(`active`,`
 font-weight: var(--n-font-weight-strong);
 color: var(--n-tab-text-color-active);
 `),S(`&:hover`,`
 color: var(--n-tab-text-color-hover);
 `)])])]),u(`flex`,[c(`tabs-nav`,`
 width: 100%;
 position: relative;
 `,[c(`tabs-wrapper`,`
 width: 100%;
 `,[c(`tabs-tab`,`
 margin-right: 0;
 `)])])]),c(`tabs-nav`,`
 box-sizing: border-box;
 line-height: 1.5;
 display: flex;
 transition: border-color .3s var(--n-bezier);
 `,[L(`prefix, suffix`,`
 display: flex;
 align-items: center;
 `),L(`prefix`,`padding-right: 16px;`),L(`suffix`,`padding-left: 16px;`)]),u(`top, bottom`,[S(`>`,[c(`tabs-nav`,[c(`tabs-nav-scroll-wrapper`,[S(`&::before`,`
 top: 0;
 bottom: 0;
 left: 0;
 width: 20px;
 `),S(`&::after`,`
 top: 0;
 bottom: 0;
 right: 0;
 width: 20px;
 `),u(`shadow-start`,[S(`&::before`,`
 box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, .12);
 `)]),u(`shadow-end`,[S(`&::after`,`
 box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),u(`left, right`,[c(`tabs-nav-scroll-content`,`
 flex-direction: column;
 `),S(`>`,[c(`tabs-nav`,[c(`tabs-nav-scroll-wrapper`,[S(`&::before`,`
 top: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),S(`&::after`,`
 bottom: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),u(`shadow-start`,[S(`&::before`,`
 box-shadow: inset 0 10px 8px -8px rgba(0, 0, 0, .12);
 `)]),u(`shadow-end`,[S(`&::after`,`
 box-shadow: inset 0 -10px 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),c(`tabs-nav-scroll-wrapper`,`
 flex: 1;
 position: relative;
 overflow: hidden;
 `,[c(`tabs-nav-y-scroll`,`
 height: 100%;
 width: 100%;
 overflow-y: auto; 
 scrollbar-width: none;
 `,[S(`&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb`,`
 width: 0;
 height: 0;
 display: none;
 `)]),S(`&::before, &::after`,`
 transition: box-shadow .3s var(--n-bezier);
 pointer-events: none;
 content: "";
 position: absolute;
 z-index: 1;
 `)]),c(`tabs-nav-scroll-content`,`
 display: flex;
 position: relative;
 min-width: 100%;
 min-height: 100%;
 width: fit-content;
 box-sizing: border-box;
 `),c(`tabs-wrapper`,`
 display: inline-flex;
 flex-wrap: nowrap;
 position: relative;
 `),c(`tabs-tab-wrapper`,`
 display: flex;
 flex-wrap: nowrap;
 flex-shrink: 0;
 flex-grow: 0;
 `),c(`tabs-tab`,`
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
 `,[u(`disabled`,{cursor:`not-allowed`}),L(`close`,`
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),L(`label`,`
 display: flex;
 align-items: center;
 z-index: 1;
 `)]),c(`tabs-bar`,`
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
 `,[S(`&.transition-disabled`,`
 transition: none;
 `),u(`disabled`,`
 background-color: var(--n-tab-text-color-disabled)
 `)]),c(`tabs-pane-wrapper`,`
 position: relative;
 overflow: hidden;
 transition: max-height .2s var(--n-bezier);
 `),c(`tab-pane`,`
 color: var(--n-pane-text-color);
 width: 100%;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 opacity .2s var(--n-bezier);
 left: 0;
 right: 0;
 top: 0;
 `,[S(`&.next-transition-leave-active, &.prev-transition-leave-active, &.next-transition-enter-active, &.prev-transition-enter-active`,`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 transform .2s var(--n-bezier),
 opacity .2s var(--n-bezier);
 `),S(`&.next-transition-leave-active, &.prev-transition-leave-active`,`
 position: absolute;
 `),S(`&.next-transition-enter-from, &.prev-transition-leave-to`,`
 transform: translateX(32px);
 opacity: 0;
 `),S(`&.next-transition-leave-to, &.prev-transition-enter-from`,`
 transform: translateX(-32px);
 opacity: 0;
 `),S(`&.next-transition-leave-from, &.next-transition-enter-to, &.prev-transition-leave-from, &.prev-transition-enter-to`,`
 transform: translateX(0);
 opacity: 1;
 `)]),c(`tabs-tab-pad`,`
 box-sizing: border-box;
 width: var(--n-tab-gap);
 flex-grow: 0;
 flex-shrink: 0;
 `),u(`line-type, bar-type`,[c(`tabs-tab`,`
 font-weight: var(--n-tab-font-weight);
 box-sizing: border-box;
 vertical-align: bottom;
 `,[S(`&:hover`,{color:`var(--n-tab-text-color-hover)`}),u(`active`,`
 color: var(--n-tab-text-color-active);
 font-weight: var(--n-tab-font-weight-active);
 `),u(`disabled`,{color:`var(--n-tab-text-color-disabled)`})])]),c(`tabs-nav`,[u(`line-type`,[u(`top`,[L(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),c(`tabs-nav-scroll-content`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),c(`tabs-bar`,`
 bottom: -1px;
 `)]),u(`left`,[L(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),c(`tabs-nav-scroll-content`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),c(`tabs-bar`,`
 right: -1px;
 `)]),u(`right`,[L(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),c(`tabs-nav-scroll-content`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),c(`tabs-bar`,`
 left: -1px;
 `)]),u(`bottom`,[L(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),c(`tabs-nav-scroll-content`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),c(`tabs-bar`,`
 top: -1px;
 `)]),L(`prefix, suffix`,`
 transition: border-color .3s var(--n-bezier);
 `),c(`tabs-nav-scroll-content`,`
 transition: border-color .3s var(--n-bezier);
 `),c(`tabs-bar`,`
 border-radius: 0;
 `)]),u(`card-type`,[L(`prefix, suffix`,`
 transition: border-color .3s var(--n-bezier);
 `),c(`tabs-pad`,`
 flex-grow: 1;
 transition: border-color .3s var(--n-bezier);
 `),c(`tabs-tab-pad`,`
 transition: border-color .3s var(--n-bezier);
 `),c(`tabs-tab`,`
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
 `,[u(`addable`,`
 padding-left: 8px;
 padding-right: 8px;
 font-size: 16px;
 justify-content: center;
 `,[L(`height-placeholder`,`
 width: 0;
 font-size: var(--n-tab-font-size);
 `),T(`disabled`,[S(`&:hover`,`
 color: var(--n-tab-text-color-hover);
 `)])]),u(`closable`,`padding-right: 8px;`),u(`active`,`
 background-color: #0000;
 font-weight: var(--n-tab-font-weight-active);
 color: var(--n-tab-text-color-active);
 `),u(`disabled`,`color: var(--n-tab-text-color-disabled);`)])]),u(`left, right`,`
 flex-direction: column; 
 `,[L(`prefix, suffix`,`
 padding: var(--n-tab-padding-vertical);
 `),c(`tabs-wrapper`,`
 flex-direction: column;
 `),c(`tabs-tab-wrapper`,`
 flex-direction: column;
 `,[c(`tabs-tab-pad`,`
 height: var(--n-tab-gap-vertical);
 width: 100%;
 `)])]),u(`top`,[u(`card-type`,[c(`tabs-scroll-padding`,`border-bottom: 1px solid var(--n-tab-border-color);`),L(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),c(`tabs-tab`,`
 border-top-left-radius: var(--n-tab-border-radius);
 border-top-right-radius: var(--n-tab-border-radius);
 `,[u(`active`,`
 border-bottom: 1px solid #0000;
 `)]),c(`tabs-tab-pad`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),c(`tabs-pad`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `)])]),u(`left`,[u(`card-type`,[c(`tabs-scroll-padding`,`border-right: 1px solid var(--n-tab-border-color);`),L(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),c(`tabs-tab`,`
 border-top-left-radius: var(--n-tab-border-radius);
 border-bottom-left-radius: var(--n-tab-border-radius);
 `,[u(`active`,`
 border-right: 1px solid #0000;
 `)]),c(`tabs-tab-pad`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),c(`tabs-pad`,`
 border-right: 1px solid var(--n-tab-border-color);
 `)])]),u(`right`,[u(`card-type`,[c(`tabs-scroll-padding`,`border-left: 1px solid var(--n-tab-border-color);`),L(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),c(`tabs-tab`,`
 border-top-right-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[u(`active`,`
 border-left: 1px solid #0000;
 `)]),c(`tabs-tab-pad`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),c(`tabs-pad`,`
 border-left: 1px solid var(--n-tab-border-color);
 `)])]),u(`bottom`,[u(`card-type`,[c(`tabs-scroll-padding`,`border-top: 1px solid var(--n-tab-border-color);`),L(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),c(`tabs-tab`,`
 border-bottom-left-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[u(`active`,`
 border-top: 1px solid #0000;
 `)]),c(`tabs-tab-pad`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),c(`tabs-pad`,`
 border-top: 1px solid var(--n-tab-border-color);
 `)])])])]),at=Ke,ot=Object.assign(Object.assign({},p.props),{value:[String,Number],defaultValue:[String,Number],trigger:{type:String,default:`click`},type:{type:String,default:`bar`},closable:Boolean,justifyContent:String,size:String,placement:{type:String,default:`top`},tabStyle:[String,Object],tabClass:String,addTabStyle:[String,Object],addTabClass:String,barWidth:Number,paneClass:String,paneStyle:[String,Object],paneWrapperClass:String,paneWrapperStyle:[String,Object],addable:[Boolean,Object],tabsPadding:{type:Number,default:0},animated:Boolean,onBeforeLeave:Function,onAdd:Function,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onClose:[Function,Array],labelSize:String,activeName:[String,Number],onActiveNameChange:[Function,Array]}),st=k({name:`Tabs`,props:ot,slots:Object,setup(e,{slots:i}){let{mergedClsPrefixRef:a,inlineThemeDisabled:o,mergedComponentPropsRef:s}=V(e),c=p(`Tabs`,`-tabs`,it,Ce,e,a),l=d(null),u=d(null),f=d(null),h=d(null),g=d(null),v=d(null),y=d(!0),x=d(!0),S=ye(e,[`labelSize`,`size`]),T=I(()=>S.value?S.value:s?.value?.Tabs?.size||`medium`),E=ye(e,[`activeName`,`value`]),D=d(E.value??e.defaultValue??(i.default?ge(i.default())[0]?.props?.name:null)),O=_e(E,D),k={id:0},ee=I(()=>{if(!(!e.justifyContent||e.type===`card`))return{display:`flex`,justifyContent:e.justifyContent}});se(O,()=>{k.id=0,M(),re()});function A(){let{value:e}=O;return e===null?null:l.value?.querySelector(`[data-name="${e}"]`)}function te(t){if(e.type===`card`)return;let{value:n}=u;if(!n)return;let r=n.style.opacity===`0`;if(t){let i=`${a.value}-tabs-bar--disabled`,{barWidth:o,placement:s}=e;if(t.dataset.disabled===`true`?n.classList.add(i):n.classList.remove(i),[`top`,`bottom`].includes(s)){if(j([`top`,`maxHeight`,`height`]),typeof o==`number`&&t.offsetWidth>=o){let e=Math.floor((t.offsetWidth-o)/2)+t.offsetLeft;n.style.left=`${e}px`,n.style.maxWidth=`${o}px`}else n.style.left=`${t.offsetLeft}px`,n.style.maxWidth=`${t.offsetWidth}px`;n.style.width=`8192px`,r&&(n.style.transition=`none`),n.offsetWidth,r&&(n.style.transition=``,n.style.opacity=`1`)}else{if(j([`left`,`maxWidth`,`width`]),typeof o==`number`&&t.offsetHeight>=o){let e=Math.floor((t.offsetHeight-o)/2)+t.offsetTop;n.style.top=`${e}px`,n.style.maxHeight=`${o}px`}else n.style.top=`${t.offsetTop}px`,n.style.maxHeight=`${t.offsetHeight}px`;n.style.height=`8192px`,r&&(n.style.transition=`none`),n.offsetHeight,r&&(n.style.transition=``,n.style.opacity=`1`)}}}function ne(){if(e.type===`card`)return;let{value:t}=u;t&&(t.style.opacity=`0`)}function j(e){let{value:t}=u;if(t)for(let n of e)t.style[n]=``}function M(){if(e.type===`card`)return;let t=A();t?te(t):ne()}function re(){let e=g.value?.$el;if(!e)return;let t=A();if(!t)return;let{scrollLeft:n,offsetWidth:r}=e,{offsetLeft:i,offsetWidth:a}=t;n>i?e.scrollTo({top:0,left:i,behavior:`smooth`}):i+a>n+r&&e.scrollTo({top:0,left:i+a-r,behavior:`smooth`})}let P=d(null),F=0,L=null;function R(e){let t=P.value;if(t){F=e.getBoundingClientRect().height;let n=`${F}px`,r=()=>{t.style.height=n,t.style.maxHeight=n};L?(r(),L(),L=null):L=r}}function z(e){let t=P.value;if(t){let n=e.getBoundingClientRect().height,r=()=>{document.body.offsetHeight,t.style.maxHeight=`${n}px`,t.style.height=`${Math.max(F,n)}px`};L?(L(),L=null,r()):L=r}}function B(){let t=P.value;if(t){t.style.maxHeight=``,t.style.height=``;let{paneWrapperStyle:n}=e;if(typeof n==`string`)t.style.cssText=n;else if(n){let{maxHeight:e,height:r}=n;e!==void 0&&(t.style.maxHeight=e),r!==void 0&&(t.style.height=r)}}}let H={value:[]},U=d(`next`);function ie(e){let t=O.value,n=`next`;for(let r of H.value){if(r===t)break;if(r===e){n=`prev`;break}}U.value=n,ae(e)}function ae(t){let{onActiveNameChange:n,onUpdateValue:r,"onUpdate:value":i}=e;n&&G(n,t),r&&G(r,t),i&&G(i,t),D.value=t}function oe(t){let{onClose:n}=e;n&&G(n,t)}let W=!0;function ce(){let{value:e}=u;if(!e)return;W||=!1;let t=`transition-disabled`;e.classList.add(t),M(),e.classList.remove(t)}let K=d(null);function le({transitionDisabled:e}){let t=l.value;if(!t)return;e&&t.classList.add(`transition-disabled`);let n=A();n&&K.value&&(K.value.style.width=`${n.offsetWidth}px`,K.value.style.height=`${n.offsetHeight}px`,K.value.style.transform=`translateX(${n.offsetLeft-_(getComputedStyle(t).paddingLeft)}px)`,e&&K.value.offsetWidth),e&&t.classList.remove(`transition-disabled`)}se([O],()=>{e.type===`segment`&&b(()=>{le({transitionDisabled:!1})})}),t(()=>{e.type===`segment`&&le({transitionDisabled:!0})});let ue=0;function q(t){if(t.contentRect.width===0&&t.contentRect.height===0||ue===t.contentRect.width)return;ue=t.contentRect.width;let{type:n}=e;if((n===`line`||n===`bar`)&&(W||e.justifyContent?.startsWith(`space`))&&ce(),n!==`segment`){let{placement:t}=e;he((t===`top`||t===`bottom`?g.value?.$el:v.value)||null)}}let de=at(q,64);se([()=>e.justifyContent,()=>e.size],()=>{b(()=>{let{type:t}=e;(t===`line`||t===`bar`)&&ce()})});let J=d(!1);function Y(t){let{target:n,contentRect:{width:r,height:i}}=t,a=n.parentElement.parentElement.offsetWidth,o=n.parentElement.parentElement.offsetHeight,{placement:s}=e;if(!J.value)s===`top`||s===`bottom`?a<r&&(J.value=!0):o<i&&(J.value=!0);else{let{value:e}=h;if(!e)return;s===`top`||s===`bottom`?a-r>e.$el.offsetWidth&&(J.value=!1):o-i>e.$el.offsetHeight&&(J.value=!1)}he(g.value?.$el||null)}let pe=at(Y,64);function me(){let{onAdd:t}=e;t&&t(),b(()=>{let e=A(),{value:t}=g;!e||!t||t.scrollTo({left:e.offsetLeft,top:0,behavior:`smooth`})})}function he(t){if(!t)return;let{placement:n}=e;if(n===`top`||n===`bottom`){let{scrollLeft:e,scrollWidth:n,offsetWidth:r}=t;y.value=e<=0,x.value=e+r>=n}else{let{scrollTop:e,scrollHeight:n,offsetHeight:r}=t;y.value=e<=0,x.value=e+r>=n}}let ve=at(e=>{he(e.target)},64);m($e,{triggerRef:w(e,`trigger`),tabStyleRef:w(e,`tabStyle`),tabClassRef:w(e,`tabClass`),addTabStyleRef:w(e,`addTabStyle`),addTabClassRef:w(e,`addTabClass`),paneClassRef:w(e,`paneClass`),paneStyleRef:w(e,`paneStyle`),mergedClsPrefixRef:a,typeRef:w(e,`type`),closableRef:w(e,`closable`),valueRef:O,tabChangeIdRef:k,onBeforeLeaveRef:w(e,`onBeforeLeave`),activateTab:ie,handleClose:oe,handleAdd:me}),fe(()=>{M(),re()}),n(()=>{let{value:e}=f;if(!e)return;let{value:t}=a,n=`${t}-tabs-nav-scroll-wrapper--shadow-start`,r=`${t}-tabs-nav-scroll-wrapper--shadow-end`;y.value?e.classList.remove(n):e.classList.add(n),x.value?e.classList.remove(r):e.classList.add(r)});let be={syncBarPosition:()=>{M()}},xe=()=>{le({transitionDisabled:!0})},X=I(()=>{let{value:t}=T,{type:n}=e,i=`${t}${{card:`Card`,bar:`Bar`,line:`Line`,segment:`Segment`}[n]}`,{self:{barColor:a,closeIconColor:o,closeIconColorHover:s,closeIconColorPressed:l,tabColor:u,tabBorderColor:d,paneTextColor:f,tabFontWeight:p,tabBorderRadius:m,tabFontWeightActive:h,colorSegment:g,fontWeightStrong:_,tabColorSegment:v,closeSize:y,closeIconSize:b,closeColorHover:x,closeColorPressed:S,closeBorderRadius:w,[C(`panePadding`,t)]:E,[C(`tabPadding`,i)]:D,[C(`tabPaddingVertical`,i)]:O,[C(`tabGap`,i)]:k,[C(`tabGap`,`${i}Vertical`)]:ee,[C(`tabTextColor`,n)]:A,[C(`tabTextColorActive`,n)]:te,[C(`tabTextColorHover`,n)]:ne,[C(`tabTextColorDisabled`,n)]:j,[C(`tabFontSize`,t)]:M},common:{cubicBezierEaseInOut:N}}=c.value;return{"--n-bezier":N,"--n-color-segment":g,"--n-bar-color":a,"--n-tab-font-size":M,"--n-tab-text-color":A,"--n-tab-text-color-active":te,"--n-tab-text-color-disabled":j,"--n-tab-text-color-hover":ne,"--n-pane-text-color":f,"--n-tab-border-color":d,"--n-tab-border-radius":m,"--n-close-size":y,"--n-close-icon-size":b,"--n-close-color-hover":x,"--n-close-color-pressed":S,"--n-close-border-radius":w,"--n-close-icon-color":o,"--n-close-icon-color-hover":s,"--n-close-icon-color-pressed":l,"--n-tab-color":u,"--n-tab-font-weight":p,"--n-tab-font-weight-active":h,"--n-tab-padding":D,"--n-tab-padding-vertical":O,"--n-tab-gap":k,"--n-tab-gap-vertical":ee,"--n-pane-padding-left":r(E,`left`),"--n-pane-padding-right":r(E,`right`),"--n-pane-padding-top":r(E,`top`),"--n-pane-padding-bottom":r(E,`bottom`),"--n-font-weight-strong":_,"--n-tab-color-segment":v}}),Se=o?N(`tabs`,I(()=>`${T.value[0]}${e.type[0]}`),X,e):void 0;return Object.assign({mergedClsPrefix:a,mergedValue:O,renderedNames:new Set,segmentCapsuleElRef:K,tabsPaneWrapperRef:P,tabsElRef:l,barElRef:u,addTabInstRef:h,xScrollInstRef:g,scrollWrapperElRef:f,addTabFixed:J,tabWrapperStyle:ee,handleNavResize:de,mergedSize:T,handleScroll:ve,handleTabsResize:pe,cssVars:o?void 0:X,themeClass:Se?.themeClass,animationDirection:U,renderNameListRef:H,yScrollElRef:v,handleSegmentResize:xe,onAnimationBeforeLeave:R,onAnimationEnter:z,onAnimationAfterEnter:B,onRender:Se?.onRender},be)},render(){let{mergedClsPrefix:e,type:t,placement:n,addTabFixed:r,addable:i,mergedSize:a,renderNameListRef:o,onRender:s,paneWrapperClass:c,paneWrapperStyle:l,$slots:{default:u,prefix:d,suffix:f}}=this;s?.();let p=u?ge(u()).filter(e=>e.type.__TAB_PANE__===!0):[],m=u?ge(u()).filter(e=>e.type.__TAB__===!0):[],h=!m.length,g=t===`card`,_=t===`segment`,v=!g&&!_&&this.justifyContent;o.value=[];let b=()=>{let t=y(`div`,{style:this.tabWrapperStyle,class:`${e}-tabs-wrapper`},v?null:y(`div`,{class:`${e}-tabs-scroll-padding`,style:n===`top`||n===`bottom`?{width:`${this.tabsPadding}px`}:{height:`${this.tabsPadding}px`}}),h?p.map((e,t)=>(o.value.push(e.props.name),dt(y(rt,Object.assign({},e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0&&(!v||v===`center`||v===`start`||v===`end`)}),e.children?{default:e.children.tab}:void 0)))):m.map((e,t)=>(o.value.push(e.props.name),dt(t!==0&&!v?ut(e):e))),!r&&i&&g?lt(i,(h?p.length:m.length)!==0):null,v?null:y(`div`,{class:`${e}-tabs-scroll-padding`,style:{width:`${this.tabsPadding}px`}}));return y(`div`,{ref:`tabsElRef`,class:`${e}-tabs-nav-scroll-content`},g&&i?y(ae,{onResize:this.handleTabsResize},{default:()=>t}):t,g?y(`div`,{class:`${e}-tabs-pad`}):null,g?null:y(`div`,{ref:`barElRef`,class:`${e}-tabs-bar`}))},x=_?`top`:n;return y(`div`,{class:[`${e}-tabs`,this.themeClass,`${e}-tabs--${t}-type`,`${e}-tabs--${a}-size`,v&&`${e}-tabs--flex`,`${e}-tabs--${x}`],style:this.cssVars},y(`div`,{class:[`${e}-tabs-nav--${t}-type`,`${e}-tabs-nav--${x}`,`${e}-tabs-nav`]},U(d,t=>t&&y(`div`,{class:`${e}-tabs-nav__prefix`},t)),_?y(ae,{onResize:this.handleSegmentResize},{default:()=>y(`div`,{class:`${e}-tabs-rail`,ref:`tabsElRef`},y(`div`,{class:`${e}-tabs-capsule`,ref:`segmentCapsuleElRef`},y(`div`,{class:`${e}-tabs-wrapper`},y(`div`,{class:`${e}-tabs-tab`}))),h?p.map((e,t)=>(o.value.push(e.props.name),y(rt,Object.assign({},e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0}),e.children?{default:e.children.tab}:void 0))):m.map((e,t)=>(o.value.push(e.props.name),t===0?e:ut(e))))}):y(ae,{onResize:this.handleNavResize},{default:()=>y(`div`,{class:`${e}-tabs-nav-scroll-wrapper`,ref:`scrollWrapperElRef`},[`top`,`bottom`].includes(x)?y(Oe,{ref:`xScrollInstRef`,onScroll:this.handleScroll},{default:b}):y(`div`,{class:`${e}-tabs-nav-y-scroll`,onScroll:this.handleScroll,ref:`yScrollElRef`},b()))}),r&&i&&g?lt(i,!0):null,U(f,t=>t&&y(`div`,{class:`${e}-tabs-nav__suffix`},t))),h&&(this.animated&&(x===`top`||x===`bottom`)?y(`div`,{ref:`tabsPaneWrapperRef`,style:l,class:[`${e}-tabs-pane-wrapper`,c]},ct(p,this.mergedValue,this.renderedNames,this.onAnimationBeforeLeave,this.onAnimationEnter,this.onAnimationAfterEnter,this.animationDirection)):ct(p,this.mergedValue,this.renderedNames)))}});function ct(e,t,n,r,i,a,o){let s=[];return e.forEach(e=>{let{name:r,displayDirective:i,"display-directive":a}=e.props,o=e=>i===e||a===e,c=t===r;if(e.key!==void 0&&(e.key=r),c||o(`show`)||o(`show:lazy`)&&n.has(r)){n.has(r)||n.add(r);let t=!o(`if`);s.push(t?l(e,[[O,c]]):e)}}),o?y(z,{name:`${o}-transition`,onBeforeLeave:r,onEnter:i,onAfterEnter:a},{default:()=>s}):s}function lt(e,t){return y(rt,{ref:`addTabInstRef`,key:`__addable`,name:`__addable`,internalCreatedByPane:!0,internalAddable:!0,internalLeftPadded:t,disabled:typeof e==`object`&&e.disabled})}function ut(e){let t=ee(e);return t.props?t.props.internalLeftPadded=!0:t.props={internalLeftPadded:!0},t}function dt(e){return Array.isArray(e.dynamicProps)?e.dynamicProps.includes(`internalLeftPadded`)||e.dynamicProps.push(`internalLeftPadded`):e.dynamicProps=[`internalLeftPadded`],e}var $={containers:()=>R.get(`/api/docker/containers`),containerAction:(e,t)=>R.post(`/api/docker/containers/${encodeURIComponent(e)}/${t}`),images:()=>R.get(`/api/docker/images`),removeImage:e=>R.post(`/api/docker/images/${encodeURIComponent(e)}/remove`),volumes:()=>R.get(`/api/docker/volumes`),removeVolume:e=>R.post(`/api/docker/volumes/${encodeURIComponent(e)}/remove`),networks:()=>R.get(`/api/docker/networks`),removeNetwork:e=>R.post(`/api/docker/networks/${encodeURIComponent(e)}/remove`),settings:()=>R.get(`/api/docker/settings`),prune:e=>R.post(`/api/docker/prune/${e}`)},ft={key:1,class:`tab-loading`},pt=ve(k({__name:`DockerView`,setup(e){let n=Se();function r(e){return e instanceof re&&e.status===503&&!!e.body&&typeof e.body==`object`&&`enabled`in e.body}function i(e,t){n.error(e instanceof re?e.message:t)}let a=e=>e===`running`?`success`:e===`paused`||e===`restarting`?`warning`:e===`dead`?`error`:`default`,o=d([]),c=d(!0),l=d(null),u;async function p(){try{let e=await $.containers();o.value=e.containers,l.value=null}catch(e){r(e)&&(l.value=e.body)}finally{c.value=!1}}async function m(e,t){try{let n=await $.containerAction(e,t);o.value=n.containers}catch(e){i(e,`Aksi ${t} gagal`)}}let g=[{title:`Nama`,key:`name`,width:160,ellipsis:{tooltip:!0}},{title:`Image`,key:`image`,width:180,ellipsis:{tooltip:!0}},{title:`Status`,key:`state`,width:130,render:e=>y(K,{type:a(e.state),size:`small`},{default:()=>e.status})},{title:`CPU`,key:`cpu`,width:70,render:e=>e.hasStats?`${e.stats.cpuPercent.toFixed(1)}%`:`—`},{title:`RAM`,key:`ram`,width:150,render:e=>e.hasStats?`${Z(e.stats.memUsageBytes)} / ${Z(e.stats.memLimitBytes)}`:`—`},{title:`Network`,key:`net`,width:140,render:e=>e.hasStats?`↓ ${Z(e.stats.netRxBytes)} ↑ ${Z(e.stats.netTxBytes)}`:`—`},{title:`Ports`,key:`ports`,width:220,ellipsis:{tooltip:!0}},{title:`Aksi`,key:`actions`,width:220,fixed:`right`,render:e=>y(q,{size:`small`},()=>[e.state===`running`?[y(j,{size:`tiny`,onClick:()=>m(e.id,`stop`)},()=>`Stop`),y(j,{size:`tiny`,onClick:()=>m(e.id,`restart`)},()=>`Restart`)]:y(j,{size:`tiny`,type:`primary`,onClick:()=>m(e.id,`start`)},()=>`Start`),y(Y,{onPositiveClick:()=>m(e.id,`remove`)},{trigger:()=>y(j,{size:`tiny`,type:`error`,ghost:!0},()=>`Hapus`),default:()=>`Hapus container "${e.name}"?`})])}],_=d([]),v=d(!0),b=d(null);async function S(){v.value=!0;try{let e=await $.images();_.value=e.images,b.value=null}catch(e){r(e)&&(b.value=e.body)}finally{v.value=!1}}async function C(e){try{let t=await $.removeImage(e);_.value=t.images}catch(e){i(e,`Hapus image gagal (mungkin masih dipakai container)`)}}let w=[{title:`Tag`,key:`tag`,render:e=>e.dangling?y(q,{size:`small`,align:`center`},()=>[e.tag,y(K,{size:`small`,type:`warning`},()=>`dangling`)]):e.tag},{title:`Ukuran`,key:`sizeBytes`,render:e=>Z(e.sizeBytes)},{title:`Dipakai`,key:`containers`,render:e=>e.containers<0?`—`:e.containers===0?`tidak dipakai`:`${e.containers} container`},{title:`Dibuat`,key:`created`,render:e=>Ee(e.created)},{title:`Aksi`,key:`actions`,render:e=>y(Y,{onPositiveClick:()=>C(e.id)},{trigger:()=>y(j,{size:`tiny`,type:`error`,ghost:!0},()=>`Hapus`),default:()=>`Hapus image "${e.tag}"?`})}],T=d([]),E=d(!0),O=d(null);async function k(){E.value=!0;try{let e=await $.volumes();T.value=e.volumes,O.value=null}catch(e){r(e)&&(O.value=e.body)}finally{E.value=!1}}async function ee(e){try{let t=await $.removeVolume(e);T.value=t.volumes}catch(e){i(e,`Hapus volume gagal (mungkin masih dipakai container)`)}}let ne=[{title:`Nama`,key:`name`},{title:`Driver`,key:`driver`},{title:`Ukuran`,key:`sizeBytes`,render:e=>e.sizeBytes<0?`tidak diketahui`:Z(e.sizeBytes)},{title:`Status`,key:`inUse`,render:e=>y(K,{size:`small`,type:e.inUse?`success`:`default`},()=>e.inUse?`dipakai`:`tidak dipakai`)},{title:`Aksi`,key:`actions`,render:e=>y(Y,{onPositiveClick:()=>ee(e.name)},{trigger:()=>y(j,{size:`tiny`,type:`error`,ghost:!0},()=>`Hapus`),default:()=>`Hapus volume "${e.name}"?`})}],N=d([]),P=d(!0),F=d(null);async function I(){P.value=!0;try{let e=await $.networks();N.value=e.networks,F.value=null}catch(e){r(e)&&(F.value=e.body)}finally{P.value=!1}}async function L(e){try{let t=await $.removeNetwork(e);N.value=t.networks}catch(e){i(e,`Hapus network gagal (mungkin builtin atau masih dipakai)`)}}let R=[{title:`Nama`,key:`name`,render:e=>e.builtin?y(q,{size:`small`,align:`center`},()=>[e.name,y(K,{size:`small`},()=>`builtin`)]):e.name},{title:`Driver`,key:`driver`},{title:`Subnet`,key:`subnet`,render:e=>e.subnet||`—`},{title:`Container Terhubung`,key:`connectedCount`},{title:`Aksi`,key:`actions`,render:e=>e.builtin?null:y(Y,{onPositiveClick:()=>L(e.id)},{trigger:()=>y(j,{size:`tiny`,type:`error`,ghost:!0},()=>`Hapus`),default:()=>`Hapus network "${e.name}"?`})}],z=d(null),V=d(!0),U=d(null),ie=d(null);async function ae(){V.value=!0;try{z.value=await $.settings(),U.value=null}catch(e){r(e)&&(U.value=e.body)}finally{V.value=!1}}async function oe(e){ie.value=e;try{z.value=await $.prune(e),n.success(`Cleanup selesai`)}catch(t){i(t,`Cleanup gagal: ${e}`)}finally{ie.value=null}}let G=d(`containers`),ce=new Set([`containers`]);return se(G,e=>{ce.has(e)||(ce.add(e),e===`images`?S():e===`volumes`?k():e===`networks`?I():e===`settings`&&ae())}),t(()=>{p(),u=setInterval(p,5e3)}),te(()=>{u&&clearInterval(u)}),(e,t)=>(f(),A(be,null,{default:x(()=>[W(h(st),{type:`line`,value:G.value,"onUpdate:value":t[0]||=e=>G.value=e},{default:x(()=>[W(h(tt),{name:`containers`,tab:`Containers`},{default:x(()=>[l.value?(f(),A(h(X),{key:0,type:`warning`,title:l.value.error},null,8,[`title`])):(f(),A(h(J),{key:1,columns:g,data:o.value,loading:c.value,"row-key":e=>e.id,"scroll-x":1200},null,8,[`data`,`loading`,`row-key`]))]),_:1}),W(h(tt),{name:`images`,tab:`Images`},{default:x(()=>[b.value?(f(),A(h(X),{key:0,type:`warning`,title:b.value.error},null,8,[`title`])):(f(),A(h(J),{key:1,columns:w,data:_.value,loading:v.value,"row-key":e=>e.id},null,8,[`data`,`loading`,`row-key`]))]),_:1}),W(h(tt),{name:`volumes`,tab:`Volumes`},{default:x(()=>[O.value?(f(),A(h(X),{key:0,type:`warning`,title:O.value.error},null,8,[`title`])):(f(),A(h(J),{key:1,columns:ne,data:T.value,loading:E.value,"row-key":e=>e.name},null,8,[`data`,`loading`,`row-key`]))]),_:1}),W(h(tt),{name:`networks`,tab:`Networks`},{default:x(()=>[F.value?(f(),A(h(X),{key:0,type:`warning`,title:F.value.error},null,8,[`title`])):(f(),A(h(J),{key:1,columns:R,data:N.value,loading:P.value,"row-key":e=>e.id},null,8,[`data`,`loading`,`row-key`]))]),_:1}),W(h(tt),{name:`settings`,tab:`Settings`},{default:x(()=>[U.value?(f(),A(h(X),{key:0,type:`warning`,title:U.value.error},null,8,[`title`])):V.value&&!z.value?(f(),D(`div`,ft,[W(h(Te),{size:`large`})])):z.value?(f(),A(h(q),{key:3,vertical:``,size:24},{default:x(()=>[W(h(Ze),{title:`Info Daemon`,column:2,bordered:``,"label-placement":`left`},{default:x(()=>[W(h(Q),{label:`Versi Server`},{default:x(()=>[H(B(z.value?.info.serverVersion),1)]),_:1}),W(h(Q),{label:`OS / Kernel`},{default:x(()=>[H(B(z.value?.info.operatingSystem)+` / `+B(z.value?.info.kernelVersion),1)]),_:1}),W(h(Q),{label:`Storage Driver`},{default:x(()=>[H(B(z.value?.info.storageDriver),1)]),_:1}),W(h(Q),{label:`Root Dir`},{default:x(()=>[H(B(z.value?.info.dockerRootDir),1)]),_:1}),W(h(Q),{label:`Container`},{default:x(()=>[H(B(z.value?.info.containersRunning)+` running, `+B(z.value?.info.containersPaused)+` paused, `+B(z.value?.info.containersStopped)+` stopped `,1)]),_:1}),W(h(Q),{label:`Images`},{default:x(()=>[H(B(z.value?.info.images),1)]),_:1})]),_:1}),W(h(Ze),{title:`Disk Usage`,column:2,bordered:``,"label-placement":`left`},{default:x(()=>[W(h(Q),{label:`Images`},{default:x(()=>[H(B(h(Z)(z.value?.diskUsage.imagesTotalBytes??0))+` (reclaimable `+B(h(Z)(z.value?.diskUsage.imagesReclaimableBytes??0))+`) `,1)]),_:1}),W(h(Q),{label:`Containers`},{default:x(()=>[H(B(h(Z)(z.value?.diskUsage.containersTotalBytes??0)),1)]),_:1}),W(h(Q),{label:`Volumes`},{default:x(()=>[H(B(h(Z)(z.value?.diskUsage.volumesTotalBytes??0))+` (reclaimable `+B(h(Z)(z.value?.diskUsage.volumesReclaimableBytes??0))+`) `,1)]),_:1})]),_:1}),W(h(q),null,{default:x(()=>[(f(),D(M,null,s([`containers`,`images`,`volumes`,`networks`,`all`],e=>W(h(Y),{key:e,onPositiveClick:t=>oe(e)},{trigger:x(()=>[W(h(j),{size:`small`,loading:ie.value===e},{default:x(()=>[H(`Bersihkan `+B(e),1)]),_:2},1032,[`loading`])]),default:x(()=>[H(` Jalankan cleanup "`+B(e)+`"? Tindakan ini tidak bisa dibatalkan. `,1)]),_:2},1032,[`onPositiveClick`])),64))]),_:1})]),_:1})):(f(),A(h(de),{key:2,description:`Tidak ada data`}))]),_:1})]),_:1},8,[`value`])]),_:1}))}}),[[`__scopeId`,`data-v-961296c9`]]);export{pt as default};