import{$t as e,At as t,Bt as n,C as r,Cn as i,Ct as a,En as o,Et as s,Gt as c,Ht as l,It as u,J as d,Kt as f,Mt as p,Qt as m,St as h,Tt as g,Wt as _,Xt as v,Yt as y,Z as b,_ as x,an as S,bn as C,cn as w,gn as ee,hn as T,in as te,kn as E,ln as ne,lt as re,mn as D,n as O,nt as k,pn as A,qt as j,r as M,rt as ie,sn as N,st as P,tt as F,ut as I,vt as L,wt as R,x as ae,xt as z,yt as B,zt as oe}from"./auth-Trpo-0ON.js";import{a as V,o as H,s as se,t as ce}from"./AppShell-BQP-X2Kk.js";import{E as le,_ as U,g as W,i as G,l as ue,n as K,r as de,s as fe,t as q}from"./Popconfirm-BrBq7EcA.js";import{C as pe,E as me,O as he,g as ge,m as _e,n as J,t as ve,y as Y}from"./_plugin-vue_export-helper-C4Zs982g.js";import{l as ye}from"./light-BidEkyRZ.js";import{M as be,j as xe}from"./light-Btc45Y6D.js";import{t as Se}from"./Add-DvXfGXJw.js";import{t as X}from"./Alert-Dj3GMiX1.js";import{n as Ce,r as we}from"./light-DZPgtxTL.js";import{t as Te}from"./Spin-DHzj2N0m.js";import{n as Ee,t as Z}from"./format-BxLcbkc3.js";var De=W(`.v-x-scroll`,{overflow:`auto`,scrollbarWidth:`none`},[W(`&::-webkit-scrollbar`,{width:0,height:0})]),Oe=j({name:`XScroll`,props:{disabled:Boolean,onScroll:Function},setup(){let e=C(null);function t(e){!(e.currentTarget.offsetWidth<e.currentTarget.scrollWidth)||e.deltaY===0||(e.currentTarget.scrollLeft+=e.deltaY+e.deltaX,e.preventDefault())}let n=re();return De.mount({id:`vueuc/x-scroll`,head:!0,anchorMetaName:U,ssr:n}),Object.assign({selfRef:e,handleWheel:t},{scrollTo(...t){var n;(n=e.value)==null||n.scrollTo(...t)}})},render(){return y(`div`,{ref:`selfRef`,onScroll:this.onScroll,onWheel:this.disabled?void 0:this.handleWheel,class:`v-x-scroll`},this.$slots)}});function ke(e,t=`default`,n=[]){let{children:r}=e;if(typeof r==`object`&&r&&!Array.isArray(r)){let e=r[t];if(typeof e==`function`)return e()}return n}var Ae=/\s/;function je(e){for(var t=e.length;t--&&Ae.test(e.charAt(t)););return t}var Me=/^\s+/;function Ne(e){return e&&e.slice(0,je(e)+1).replace(Me,``)}var Pe=NaN,Fe=/^[-+]0x[0-9a-f]+$/i,Ie=/^0b[01]+$/i,Le=/^0o[0-7]+$/i,Re=parseInt;function ze(e){if(typeof e==`number`)return e;if(b(e))return Pe;if(d(e)){var t=typeof e.valueOf==`function`?e.valueOf():e;e=d(t)?t+``:t}if(typeof e!=`string`)return e===0?e:+e;e=Ne(e);var n=Ie.test(e);return n||Le.test(e)?Re(e.slice(2),n?2:8):Fe.test(e)?Pe:+e}var Be=function(){return F.Date.now()},Ve=`Expected a function`,He=Math.max,Ue=Math.min;function We(e,t,n){var r,i,a,o,s,c,l=0,u=!1,f=!1,p=!0;if(typeof e!=`function`)throw TypeError(Ve);t=ze(t)||0,d(n)&&(u=!!n.leading,f=`maxWait`in n,a=f?He(ze(n.maxWait)||0,t):a,p=`trailing`in n?!!n.trailing:p);function m(t){var n=r,a=i;return r=i=void 0,l=t,o=e.apply(a,n),o}function h(e){return l=e,s=setTimeout(v,t),u?m(e):o}function g(e){var n=e-c,r=e-l,i=t-n;return f?Ue(i,a-r):i}function _(e){var n=e-c,r=e-l;return c===void 0||n>=t||n<0||f&&r>=a}function v(){var e=Be();if(_(e))return y(e);s=setTimeout(v,g(e))}function y(e){return s=void 0,p&&r?m(e):(r=i=void 0,o)}function b(){s!==void 0&&clearTimeout(s),l=0,r=c=i=s=void 0}function x(){return s===void 0?o:y(Be())}function S(){var e=Be(),n=_(e);if(r=arguments,i=this,c=e,n){if(s===void 0)return h(c);if(f)return clearTimeout(s),s=setTimeout(v,t),m(c)}return s===void 0&&(s=setTimeout(v,t)),o}return S.cancel=b,S.flush=x,S}var Ge=`Expected a function`;function Ke(e,t,n){var r=!0,i=!0;if(typeof e!=`function`)throw TypeError(Ge);return d(n)&&(r=`leading`in n?!!n.leading:r,i=`trailing`in n?!!n.trailing:i),We(e,t,{leading:r,maxWait:t,trailing:i})}var qe=L([B(`descriptions`,{fontSize:`var(--n-font-size)`},[B(`descriptions-separator`,`
 display: inline-block;
 margin: 0 8px 0 2px;
 `),B(`descriptions-table-wrapper`,[B(`descriptions-table`,[B(`descriptions-table-row`,[B(`descriptions-table-header`,{padding:`var(--n-th-padding)`}),B(`descriptions-table-content`,{padding:`var(--n-td-padding)`})])])]),a(`bordered`,[B(`descriptions-table-wrapper`,[B(`descriptions-table`,[B(`descriptions-table-row`,[L(`&:last-child`,[B(`descriptions-table-content`,{paddingBottom:0})])])])])]),h(`left-label-placement`,[B(`descriptions-table-content`,[L(`> *`,{verticalAlign:`top`})])]),h(`left-label-align`,[L(`th`,{textAlign:`left`})]),h(`center-label-align`,[L(`th`,{textAlign:`center`})]),h(`right-label-align`,[L(`th`,{textAlign:`right`})]),h(`bordered`,[B(`descriptions-table-wrapper`,`
 border-radius: var(--n-border-radius);
 overflow: hidden;
 background: var(--n-merged-td-color);
 border: 1px solid var(--n-merged-border-color);
 `,[B(`descriptions-table`,[B(`descriptions-table-row`,[L(`&:not(:last-child)`,[B(`descriptions-table-content`,{borderBottom:`1px solid var(--n-merged-border-color)`}),B(`descriptions-table-header`,{borderBottom:`1px solid var(--n-merged-border-color)`})]),B(`descriptions-table-header`,`
 font-weight: 400;
 background-clip: padding-box;
 background-color: var(--n-merged-th-color);
 `,[L(`&:not(:last-child)`,{borderRight:`1px solid var(--n-merged-border-color)`})]),B(`descriptions-table-content`,[L(`&:not(:last-child)`,{borderRight:`1px solid var(--n-merged-border-color)`})])])])])]),B(`descriptions-header`,`
 font-weight: var(--n-th-font-weight);
 font-size: 18px;
 transition: color .3s var(--n-bezier);
 line-height: var(--n-line-height);
 margin-bottom: 16px;
 color: var(--n-title-text-color);
 `),B(`descriptions-table-wrapper`,`
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[B(`descriptions-table`,`
 width: 100%;
 border-collapse: separate;
 border-spacing: 0;
 box-sizing: border-box;
 `,[B(`descriptions-table-row`,`
 box-sizing: border-box;
 transition: border-color .3s var(--n-bezier);
 `,[B(`descriptions-table-header`,`
 font-weight: var(--n-th-font-weight);
 line-height: var(--n-line-height);
 display: table-cell;
 box-sizing: border-box;
 color: var(--n-th-text-color);
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `),B(`descriptions-table-content`,`
 vertical-align: top;
 line-height: var(--n-line-height);
 display: table-cell;
 box-sizing: border-box;
 color: var(--n-td-text-color);
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[z(`content`,`
 transition: color .3s var(--n-bezier);
 display: inline-block;
 color: var(--n-td-text-color);
 `)]),z(`label`,`
 font-weight: var(--n-th-font-weight);
 transition: color .3s var(--n-bezier);
 display: inline-block;
 margin-right: 14px;
 color: var(--n-th-text-color);
 `)])])])]),B(`descriptions-table-wrapper`,`
 --n-merged-th-color: var(--n-th-color);
 --n-merged-td-color: var(--n-td-color);
 --n-merged-border-color: var(--n-border-color);
 `),g(B(`descriptions-table-wrapper`,`
 --n-merged-th-color: var(--n-th-color-modal);
 --n-merged-td-color: var(--n-td-color-modal);
 --n-merged-border-color: var(--n-border-color-modal);
 `)),s(B(`descriptions-table-wrapper`,`
 --n-merged-th-color: var(--n-th-color-popover);
 --n-merged-td-color: var(--n-td-color-popover);
 --n-merged-border-color: var(--n-border-color-popover);
 `))]),Je=`DESCRIPTION_ITEM_FLAG`;function Ye(e){return typeof e==`object`&&e&&!Array.isArray(e)?e.type&&e.type.DESCRIPTION_ITEM_FLAG:!1}var Xe=Object.assign(Object.assign({},r.props),{title:String,column:{type:Number,default:3},columns:Number,labelPlacement:{type:String,default:`top`},labelAlign:{type:String,default:`left`},separator:{type:String,default:`:`},size:String,bordered:Boolean,labelClass:String,labelStyle:[Object,String],contentClass:String,contentStyle:[Object,String]}),Ze=j({name:`Descriptions`,props:Xe,slots:Object,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:i,mergedComponentPropsRef:a}=ie(e),o=n(()=>e.size||a?.value?.Descriptions?.size||`medium`),s=r(`Descriptions`,`-descriptions`,qe,we,e,t),c=n(()=>{let{bordered:t}=e,n=o.value,{common:{cubicBezierEaseInOut:r},self:{titleTextColor:i,thColor:a,thColorModal:c,thColorPopover:l,thTextColor:u,thFontWeight:d,tdTextColor:f,tdColor:p,tdColorModal:m,tdColorPopover:h,borderColor:g,borderColorModal:_,borderColorPopover:v,borderRadius:y,lineHeight:b,[R(`fontSize`,n)]:x,[R(t?`thPaddingBordered`:`thPadding`,n)]:S,[R(t?`tdPaddingBordered`:`tdPadding`,n)]:C}}=s.value;return{"--n-title-text-color":i,"--n-th-padding":S,"--n-td-padding":C,"--n-font-size":x,"--n-bezier":r,"--n-th-font-weight":d,"--n-line-height":b,"--n-th-text-color":u,"--n-td-text-color":f,"--n-th-color":a,"--n-th-color-modal":c,"--n-th-color-popover":l,"--n-td-color":p,"--n-td-color-modal":m,"--n-td-color-popover":h,"--n-border-radius":y,"--n-border-color":g,"--n-border-color-modal":_,"--n-border-color-popover":v}}),l=i?k(`descriptions`,n(()=>{let t=``,{bordered:n}=e;return n&&(t+=`a`),t+=o.value[0],t}),c,e):void 0;return{mergedClsPrefix:t,cssVars:i?void 0:c,themeClass:l?.themeClass,onRender:l?.onRender,compitableColumn:se(e,[`columns`,`column`]),inlineThemeDisabled:i,mergedSize:o}},render(){let e=this.$slots.default,t=e?H(e()):[];t.length;let{contentClass:n,labelClass:r,compitableColumn:i,labelPlacement:a,labelAlign:o,mergedSize:s,bordered:c,title:l,cssVars:u,mergedClsPrefix:d,separator:f,onRender:p}=this;p?.();let m=t.filter(e=>Ye(e)),h=m.reduce((e,t,o)=>{let s=t.props||{},l=m.length-1===o,u=[`label`in s?s.label:ke(t,`label`)],p=[ke(t)],h=s.span||1,g=e.span;e.span+=h;let _=s.labelStyle||s[`label-style`]||this.labelStyle,v=s.contentStyle||s[`content-style`]||this.contentStyle;if(a===`left`)c?e.row.push(y(`th`,{class:[`${d}-descriptions-table-header`,r],colspan:1,style:_},u),y(`td`,{class:[`${d}-descriptions-table-content`,n],colspan:l?(i-g)*2+1:h*2-1,style:v},p)):e.row.push(y(`td`,{class:`${d}-descriptions-table-content`,colspan:l?(i-g)*2:h*2},y(`span`,{class:[`${d}-descriptions-table-content__label`,r],style:_},[...u,f&&y(`span`,{class:`${d}-descriptions-separator`},f)]),y(`span`,{class:[`${d}-descriptions-table-content__content`,n],style:v},p)));else{let t=l?(i-g)*2:h*2;e.row.push(y(`th`,{class:[`${d}-descriptions-table-header`,r],colspan:t,style:_},u)),e.secondRow.push(y(`td`,{class:[`${d}-descriptions-table-content`,n],colspan:t,style:v},p))}return(e.span>=i||l)&&(e.span=0,e.row.length&&(e.rows.push(e.row),e.row=[]),a!==`left`&&e.secondRow.length&&(e.rows.push(e.secondRow),e.secondRow=[])),e},{span:0,row:[],secondRow:[],rows:[]}).rows.map(e=>y(`tr`,{class:`${d}-descriptions-table-row`},e));return y(`div`,{style:u,class:[`${d}-descriptions`,this.themeClass,`${d}-descriptions--${a}-label-placement`,`${d}-descriptions--${o}-label-align`,`${d}-descriptions--${s}-size`,c&&`${d}-descriptions--bordered`]},l||this.$slots.header?y(`div`,{class:`${d}-descriptions-header`},l||V(this,`header`)):null,y(`div`,{class:`${d}-descriptions-table-wrapper`},y(`table`,{class:`${d}-descriptions-table`},y(`tbody`,null,a===`top`&&y(`tr`,{class:`${d}-descriptions-table-row`,style:{visibility:`collapse`}},ye(i*2,y(`td`,null))),h))))}}),Qe={label:String,span:{type:Number,default:1},labelClass:String,labelStyle:[Object,String],contentClass:String,contentStyle:[Object,String]},Q=j({name:`DescriptionsItem`,[Je]:!0,props:Qe,slots:Object,render(){return null}}),$e=I(`n-tabs`),et={tab:[String,Number,Object,Function],name:{type:[String,Number],required:!0},disabled:Boolean,displayDirective:{type:String,default:`if`},closable:{type:Boolean,default:void 0},tabProps:Object,label:[String,Number,Object,Function]},tt=j({__TAB_PANE__:!0,name:`TabPane`,alias:[`TabPanel`],props:et,slots:Object,setup(e){let t=v($e,null);return t||P(`tab-pane`,"`n-tab-pane` must be placed inside `n-tabs`."),{style:t.paneStyleRef,class:t.paneClassRef,mergedClsPrefix:t.mergedClsPrefixRef}},render(){return y(`div`,{class:[`${this.mergedClsPrefix}-tab-pane`,this.class],style:this.style},this.$slots)}}),nt=Object.assign({internalLeftPadded:Boolean,internalAddable:Boolean,internalCreatedByPane:Boolean},be(et,[`displayDirective`])),rt=j({__TAB__:!0,inheritAttrs:!1,name:`Tab`,props:nt,setup(e){let{mergedClsPrefixRef:t,valueRef:r,typeRef:i,closableRef:a,tabStyleRef:o,addTabStyleRef:s,tabClassRef:c,addTabClassRef:l,tabChangeIdRef:u,onBeforeLeaveRef:d,triggerRef:f,handleAdd:p,activateTab:m,handleClose:h}=v($e);return{trigger:f,mergedClosable:n(()=>{if(e.internalAddable)return!1;let{closable:t}=e;return t===void 0?a.value:t}),style:o,addStyle:s,tabClass:c,addTabClass:l,clsPrefix:t,value:r,type:i,handleClose(t){t.stopPropagation(),!e.disabled&&h(e.name)},activateTab(){if(e.disabled)return;if(e.internalAddable){p();return}let{name:t}=e,n=++u.id;if(t!==r.value){let{value:i}=d;i?Promise.resolve(i(e.name,r.value)).then(e=>{e&&u.id===n&&m(t)}):m(t)}}}},render(){let{internalAddable:e,clsPrefix:t,name:n,disabled:r,label:i,tab:a,value:o,mergedClosable:s,trigger:c,$slots:{default:l}}=this,d=i??a;return y(`div`,{class:`${t}-tabs-tab-wrapper`},this.internalLeftPadded?y(`div`,{class:`${t}-tabs-tab-pad`}):null,y(`div`,Object.assign({key:n,"data-name":n,"data-disabled":r?!0:void 0},m({class:[`${t}-tabs-tab`,o===n&&`${t}-tabs-tab--active`,r&&`${t}-tabs-tab--disabled`,s&&`${t}-tabs-tab--closable`,e&&`${t}-tabs-tab--addable`,e?this.addTabClass:this.tabClass],onClick:c===`click`?this.activateTab:void 0,onMouseenter:c===`hover`?this.activateTab:void 0,style:e?this.addStyle:this.style},this.internalCreatedByPane?this.tabProps||{}:this.$attrs)),y(`span`,{class:`${t}-tabs-tab__label`},e?y(u,null,y(`div`,{class:`${t}-tabs-tab__height-placeholder`},`\xA0`),y(ae,{clsPrefix:t},{default:()=>y(Se,null)})):l?l():typeof d==`object`?d:xe(d??n)),s&&this.type===`card`?y(x,{clsPrefix:t,class:`${t}-tabs-tab__close`,onClick:this.handleClose,disabled:r}):null))}}),it=B(`tabs`,`
 box-sizing: border-box;
 width: 100%;
 display: flex;
 flex-direction: column;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
`,[h(`segment-type`,[B(`tabs-rail`,[L(`&.transition-disabled`,[B(`tabs-capsule`,`
 transition: none;
 `)])])]),h(`top`,[B(`tab-pane`,`
 padding: var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left);
 `)]),h(`left`,[B(`tab-pane`,`
 padding: var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left) var(--n-pane-padding-top);
 `)]),h(`left, right`,`
 flex-direction: row;
 `,[B(`tabs-bar`,`
 width: 2px;
 right: 0;
 transition:
 top .2s var(--n-bezier),
 max-height .2s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `),B(`tabs-tab`,`
 padding: var(--n-tab-padding-vertical); 
 `)]),h(`right`,`
 flex-direction: row-reverse;
 `,[B(`tab-pane`,`
 padding: var(--n-pane-padding-left) var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom);
 `),B(`tabs-bar`,`
 left: 0;
 `)]),h(`bottom`,`
 flex-direction: column-reverse;
 justify-content: flex-end;
 `,[B(`tab-pane`,`
 padding: var(--n-pane-padding-bottom) var(--n-pane-padding-right) var(--n-pane-padding-top) var(--n-pane-padding-left);
 `),B(`tabs-bar`,`
 top: 0;
 `)]),B(`tabs-rail`,`
 position: relative;
 padding: 3px;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 background-color: var(--n-color-segment);
 transition: background-color .3s var(--n-bezier);
 display: flex;
 align-items: center;
 `,[B(`tabs-capsule`,`
 border-radius: var(--n-tab-border-radius);
 position: absolute;
 pointer-events: none;
 background-color: var(--n-tab-color-segment);
 box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .08);
 transition: transform 0.3s var(--n-bezier);
 `),B(`tabs-tab-wrapper`,`
 flex-basis: 0;
 flex-grow: 1;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[B(`tabs-tab`,`
 overflow: hidden;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[h(`active`,`
 font-weight: var(--n-font-weight-strong);
 color: var(--n-tab-text-color-active);
 `),L(`&:hover`,`
 color: var(--n-tab-text-color-hover);
 `)])])]),h(`flex`,[B(`tabs-nav`,`
 width: 100%;
 position: relative;
 `,[B(`tabs-wrapper`,`
 width: 100%;
 `,[B(`tabs-tab`,`
 margin-right: 0;
 `)])])]),B(`tabs-nav`,`
 box-sizing: border-box;
 line-height: 1.5;
 display: flex;
 transition: border-color .3s var(--n-bezier);
 `,[z(`prefix, suffix`,`
 display: flex;
 align-items: center;
 `),z(`prefix`,`padding-right: 16px;`),z(`suffix`,`padding-left: 16px;`)]),h(`top, bottom`,[L(`>`,[B(`tabs-nav`,[B(`tabs-nav-scroll-wrapper`,[L(`&::before`,`
 top: 0;
 bottom: 0;
 left: 0;
 width: 20px;
 `),L(`&::after`,`
 top: 0;
 bottom: 0;
 right: 0;
 width: 20px;
 `),h(`shadow-start`,[L(`&::before`,`
 box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, .12);
 `)]),h(`shadow-end`,[L(`&::after`,`
 box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),h(`left, right`,[B(`tabs-nav-scroll-content`,`
 flex-direction: column;
 `),L(`>`,[B(`tabs-nav`,[B(`tabs-nav-scroll-wrapper`,[L(`&::before`,`
 top: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),L(`&::after`,`
 bottom: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),h(`shadow-start`,[L(`&::before`,`
 box-shadow: inset 0 10px 8px -8px rgba(0, 0, 0, .12);
 `)]),h(`shadow-end`,[L(`&::after`,`
 box-shadow: inset 0 -10px 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),B(`tabs-nav-scroll-wrapper`,`
 flex: 1;
 position: relative;
 overflow: hidden;
 `,[B(`tabs-nav-y-scroll`,`
 height: 100%;
 width: 100%;
 overflow-y: auto; 
 scrollbar-width: none;
 `,[L(`&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb`,`
 width: 0;
 height: 0;
 display: none;
 `)]),L(`&::before, &::after`,`
 transition: box-shadow .3s var(--n-bezier);
 pointer-events: none;
 content: "";
 position: absolute;
 z-index: 1;
 `)]),B(`tabs-nav-scroll-content`,`
 display: flex;
 position: relative;
 min-width: 100%;
 min-height: 100%;
 width: fit-content;
 box-sizing: border-box;
 `),B(`tabs-wrapper`,`
 display: inline-flex;
 flex-wrap: nowrap;
 position: relative;
 `),B(`tabs-tab-wrapper`,`
 display: flex;
 flex-wrap: nowrap;
 flex-shrink: 0;
 flex-grow: 0;
 `),B(`tabs-tab`,`
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
 `,[h(`disabled`,{cursor:`not-allowed`}),z(`close`,`
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),z(`label`,`
 display: flex;
 align-items: center;
 z-index: 1;
 `)]),B(`tabs-bar`,`
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
 `,[L(`&.transition-disabled`,`
 transition: none;
 `),h(`disabled`,`
 background-color: var(--n-tab-text-color-disabled)
 `)]),B(`tabs-pane-wrapper`,`
 position: relative;
 overflow: hidden;
 transition: max-height .2s var(--n-bezier);
 `),B(`tab-pane`,`
 color: var(--n-pane-text-color);
 width: 100%;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 opacity .2s var(--n-bezier);
 left: 0;
 right: 0;
 top: 0;
 `,[L(`&.next-transition-leave-active, &.prev-transition-leave-active, &.next-transition-enter-active, &.prev-transition-enter-active`,`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 transform .2s var(--n-bezier),
 opacity .2s var(--n-bezier);
 `),L(`&.next-transition-leave-active, &.prev-transition-leave-active`,`
 position: absolute;
 `),L(`&.next-transition-enter-from, &.prev-transition-leave-to`,`
 transform: translateX(32px);
 opacity: 0;
 `),L(`&.next-transition-leave-to, &.prev-transition-enter-from`,`
 transform: translateX(-32px);
 opacity: 0;
 `),L(`&.next-transition-leave-from, &.next-transition-enter-to, &.prev-transition-leave-from, &.prev-transition-enter-to`,`
 transform: translateX(0);
 opacity: 1;
 `)]),B(`tabs-tab-pad`,`
 box-sizing: border-box;
 width: var(--n-tab-gap);
 flex-grow: 0;
 flex-shrink: 0;
 `),h(`line-type, bar-type`,[B(`tabs-tab`,`
 font-weight: var(--n-tab-font-weight);
 box-sizing: border-box;
 vertical-align: bottom;
 `,[L(`&:hover`,{color:`var(--n-tab-text-color-hover)`}),h(`active`,`
 color: var(--n-tab-text-color-active);
 font-weight: var(--n-tab-font-weight-active);
 `),h(`disabled`,{color:`var(--n-tab-text-color-disabled)`})])]),B(`tabs-nav`,[h(`line-type`,[h(`top`,[z(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),B(`tabs-nav-scroll-content`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),B(`tabs-bar`,`
 bottom: -1px;
 `)]),h(`left`,[z(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),B(`tabs-nav-scroll-content`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),B(`tabs-bar`,`
 right: -1px;
 `)]),h(`right`,[z(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),B(`tabs-nav-scroll-content`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),B(`tabs-bar`,`
 left: -1px;
 `)]),h(`bottom`,[z(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),B(`tabs-nav-scroll-content`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),B(`tabs-bar`,`
 top: -1px;
 `)]),z(`prefix, suffix`,`
 transition: border-color .3s var(--n-bezier);
 `),B(`tabs-nav-scroll-content`,`
 transition: border-color .3s var(--n-bezier);
 `),B(`tabs-bar`,`
 border-radius: 0;
 `)]),h(`card-type`,[z(`prefix, suffix`,`
 transition: border-color .3s var(--n-bezier);
 `),B(`tabs-pad`,`
 flex-grow: 1;
 transition: border-color .3s var(--n-bezier);
 `),B(`tabs-tab-pad`,`
 transition: border-color .3s var(--n-bezier);
 `),B(`tabs-tab`,`
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
 `,[h(`addable`,`
 padding-left: 8px;
 padding-right: 8px;
 font-size: 16px;
 justify-content: center;
 `,[z(`height-placeholder`,`
 width: 0;
 font-size: var(--n-tab-font-size);
 `),a(`disabled`,[L(`&:hover`,`
 color: var(--n-tab-text-color-hover);
 `)])]),h(`closable`,`padding-right: 8px;`),h(`active`,`
 background-color: #0000;
 font-weight: var(--n-tab-font-weight-active);
 color: var(--n-tab-text-color-active);
 `),h(`disabled`,`color: var(--n-tab-text-color-disabled);`)])]),h(`left, right`,`
 flex-direction: column; 
 `,[z(`prefix, suffix`,`
 padding: var(--n-tab-padding-vertical);
 `),B(`tabs-wrapper`,`
 flex-direction: column;
 `),B(`tabs-tab-wrapper`,`
 flex-direction: column;
 `,[B(`tabs-tab-pad`,`
 height: var(--n-tab-gap-vertical);
 width: 100%;
 `)])]),h(`top`,[h(`card-type`,[B(`tabs-scroll-padding`,`border-bottom: 1px solid var(--n-tab-border-color);`),z(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),B(`tabs-tab`,`
 border-top-left-radius: var(--n-tab-border-radius);
 border-top-right-radius: var(--n-tab-border-radius);
 `,[h(`active`,`
 border-bottom: 1px solid #0000;
 `)]),B(`tabs-tab-pad`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),B(`tabs-pad`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `)])]),h(`left`,[h(`card-type`,[B(`tabs-scroll-padding`,`border-right: 1px solid var(--n-tab-border-color);`),z(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),B(`tabs-tab`,`
 border-top-left-radius: var(--n-tab-border-radius);
 border-bottom-left-radius: var(--n-tab-border-radius);
 `,[h(`active`,`
 border-right: 1px solid #0000;
 `)]),B(`tabs-tab-pad`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),B(`tabs-pad`,`
 border-right: 1px solid var(--n-tab-border-color);
 `)])]),h(`right`,[h(`card-type`,[B(`tabs-scroll-padding`,`border-left: 1px solid var(--n-tab-border-color);`),z(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),B(`tabs-tab`,`
 border-top-right-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[h(`active`,`
 border-left: 1px solid #0000;
 `)]),B(`tabs-tab-pad`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),B(`tabs-pad`,`
 border-left: 1px solid var(--n-tab-border-color);
 `)])]),h(`bottom`,[h(`card-type`,[B(`tabs-scroll-padding`,`border-top: 1px solid var(--n-tab-border-color);`),z(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),B(`tabs-tab`,`
 border-bottom-left-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[h(`active`,`
 border-top: 1px solid #0000;
 `)]),B(`tabs-tab-pad`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),B(`tabs-pad`,`
 border-top: 1px solid var(--n-tab-border-color);
 `)])])])]),at=Ke,ot=Object.assign(Object.assign({},r.props),{value:[String,Number],defaultValue:[String,Number],trigger:{type:String,default:`click`},type:{type:String,default:`bar`},closable:Boolean,justifyContent:String,size:String,placement:{type:String,default:`top`},tabStyle:[String,Object],tabClass:String,addTabStyle:[String,Object],addTabClass:String,barWidth:Number,paneClass:String,paneStyle:[String,Object],paneWrapperClass:String,paneWrapperStyle:[String,Object],addable:[Boolean,Object],tabsPadding:{type:Number,default:0},animated:Boolean,onBeforeLeave:Function,onAdd:Function,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onClose:[Function,Array],labelSize:String,activeName:[String,Number],onActiveNameChange:[Function,Array]}),st=j({name:`Tabs`,props:ot,slots:Object,setup(t,{slots:a}){let{mergedClsPrefixRef:o,inlineThemeDisabled:s,mergedComponentPropsRef:c}=ie(t),l=r(`Tabs`,`-tabs`,it,Ce,t,o),u=C(null),d=C(null),f=C(null),p=C(null),m=C(null),h=C(null),g=C(!0),_=C(!0),v=se(t,[`labelSize`,`size`]),y=n(()=>v.value?v.value:c?.value?.Tabs?.size||`medium`),b=se(t,[`activeName`,`value`]),x=C(b.value??t.defaultValue??(a.default?H(a.default())[0]?.props?.name:null)),S=pe(b,x),ee={id:0},T=n(()=>{if(!(!t.justifyContent||t.type===`card`))return{display:`flex`,justifyContent:t.justifyContent}});A(S,()=>{ee.id=0,j(),M()});function E(){let{value:e}=S;return e===null?null:u.value?.querySelector(`[data-name="${e}"]`)}function ne(e){if(t.type===`card`)return;let{value:n}=d;if(!n)return;let r=n.style.opacity===`0`;if(e){let i=`${o.value}-tabs-bar--disabled`,{barWidth:a,placement:s}=t;if(e.dataset.disabled===`true`?n.classList.add(i):n.classList.remove(i),[`top`,`bottom`].includes(s)){if(O([`top`,`maxHeight`,`height`]),typeof a==`number`&&e.offsetWidth>=a){let t=Math.floor((e.offsetWidth-a)/2)+e.offsetLeft;n.style.left=`${t}px`,n.style.maxWidth=`${a}px`}else n.style.left=`${e.offsetLeft}px`,n.style.maxWidth=`${e.offsetWidth}px`;n.style.width=`8192px`,r&&(n.style.transition=`none`),n.offsetWidth,r&&(n.style.transition=``,n.style.opacity=`1`)}else{if(O([`left`,`maxWidth`,`width`]),typeof a==`number`&&e.offsetHeight>=a){let t=Math.floor((e.offsetHeight-a)/2)+e.offsetTop;n.style.top=`${t}px`,n.style.maxHeight=`${a}px`}else n.style.top=`${e.offsetTop}px`,n.style.maxHeight=`${e.offsetHeight}px`;n.style.height=`8192px`,r&&(n.style.transition=`none`),n.offsetHeight,r&&(n.style.transition=``,n.style.opacity=`1`)}}}function re(){if(t.type===`card`)return;let{value:e}=d;e&&(e.style.opacity=`0`)}function O(e){let{value:t}=d;if(t)for(let n of e)t.style[n]=``}function j(){if(t.type===`card`)return;let e=E();e?ne(e):re()}function M(){let e=m.value?.$el;if(!e)return;let t=E();if(!t)return;let{scrollLeft:n,offsetWidth:r}=e,{offsetLeft:i,offsetWidth:a}=t;n>i?e.scrollTo({top:0,left:i,behavior:`smooth`}):i+a>n+r&&e.scrollTo({top:0,left:i+a-r,behavior:`smooth`})}let N=C(null),P=0,F=null;function I(e){let t=N.value;if(t){P=e.getBoundingClientRect().height;let n=`${P}px`,r=()=>{t.style.height=n,t.style.maxHeight=n};F?(r(),F(),F=null):F=r}}function L(e){let t=N.value;if(t){let n=e.getBoundingClientRect().height,r=()=>{document.body.offsetHeight,t.style.maxHeight=`${n}px`,t.style.height=`${Math.max(P,n)}px`};F?(F(),F=null,r()):F=r}}function ae(){let e=N.value;if(e){e.style.maxHeight=``,e.style.height=``;let{paneWrapperStyle:n}=t;if(typeof n==`string`)e.style.cssText=n;else if(n){let{maxHeight:t,height:r}=n;t!==void 0&&(e.style.maxHeight=t),r!==void 0&&(e.style.height=r)}}}let z={value:[]},B=C(`next`);function oe(e){let t=S.value,n=`next`;for(let r of z.value){if(r===t)break;if(r===e){n=`prev`;break}}B.value=n,V(e)}function V(e){let{onActiveNameChange:n,onUpdateValue:r,"onUpdate:value":i}=t;n&&ge(n,e),r&&ge(r,e),i&&ge(i,e),x.value=e}function ce(e){let{onClose:n}=t;n&&ge(n,e)}let U=!0;function W(){let{value:e}=d;if(!e)return;U||=!1;let t=`transition-disabled`;e.classList.add(t),j(),e.classList.remove(t)}let G=C(null);function ue({transitionDisabled:e}){let t=u.value;if(!t)return;e&&t.classList.add(`transition-disabled`);let n=E();n&&G.value&&(G.value.style.width=`${n.offsetWidth}px`,G.value.style.height=`${n.offsetHeight}px`,G.value.style.transform=`translateX(${n.offsetLeft-me(getComputedStyle(t).paddingLeft)}px)`,e&&G.value.offsetWidth),e&&t.classList.remove(`transition-disabled`)}A([S],()=>{t.type===`segment`&&e(()=>{ue({transitionDisabled:!1})})}),te(()=>{t.type===`segment`&&ue({transitionDisabled:!0})});let K=0;function de(e){if(e.contentRect.width===0&&e.contentRect.height===0||K===e.contentRect.width)return;K=e.contentRect.width;let{type:n}=t;if((n===`line`||n===`bar`)&&(U||t.justifyContent?.startsWith(`space`))&&W(),n!==`segment`){let{placement:e}=t;Y((e===`top`||e===`bottom`?m.value?.$el:h.value)||null)}}let fe=at(de,64);A([()=>t.justifyContent,()=>t.size],()=>{e(()=>{let{type:e}=t;(e===`line`||e===`bar`)&&W()})});let q=C(!1);function _e(e){let{target:n,contentRect:{width:r,height:i}}=e,a=n.parentElement.parentElement.offsetWidth,o=n.parentElement.parentElement.offsetHeight,{placement:s}=t;if(!q.value)s===`top`||s===`bottom`?a<r&&(q.value=!0):o<i&&(q.value=!0);else{let{value:e}=p;if(!e)return;s===`top`||s===`bottom`?a-r>e.$el.offsetWidth&&(q.value=!1):o-i>e.$el.offsetHeight&&(q.value=!1)}Y(m.value?.$el||null)}let J=at(_e,64);function ve(){let{onAdd:n}=t;n&&n(),e(()=>{let e=E(),{value:t}=m;!e||!t||t.scrollTo({left:e.offsetLeft,top:0,behavior:`smooth`})})}function Y(e){if(!e)return;let{placement:n}=t;if(n===`top`||n===`bottom`){let{scrollLeft:t,scrollWidth:n,offsetWidth:r}=e;g.value=t<=0,_.value=t+r>=n}else{let{scrollTop:t,scrollHeight:n,offsetHeight:r}=e;g.value=t<=0,_.value=t+r>=n}}let ye=at(e=>{Y(e.target)},64);w($e,{triggerRef:i(t,`trigger`),tabStyleRef:i(t,`tabStyle`),tabClassRef:i(t,`tabClass`),addTabStyleRef:i(t,`addTabStyle`),addTabClassRef:i(t,`addTabClass`),paneClassRef:i(t,`paneClass`),paneStyleRef:i(t,`paneStyle`),mergedClsPrefixRef:o,typeRef:i(t,`type`),closableRef:i(t,`closable`),valueRef:S,tabChangeIdRef:ee,onBeforeLeaveRef:i(t,`onBeforeLeave`),activateTab:oe,handleClose:ce,handleAdd:ve}),le(()=>{j(),M()}),D(()=>{let{value:e}=f;if(!e)return;let{value:t}=o,n=`${t}-tabs-nav-scroll-wrapper--shadow-start`,r=`${t}-tabs-nav-scroll-wrapper--shadow-end`;g.value?e.classList.remove(n):e.classList.add(n),_.value?e.classList.remove(r):e.classList.add(r)});let be={syncBarPosition:()=>{j()}},xe=()=>{ue({transitionDisabled:!0})},Se=n(()=>{let{value:e}=y,{type:n}=t,r=`${e}${{card:`Card`,bar:`Bar`,line:`Line`,segment:`Segment`}[n]}`,{self:{barColor:i,closeIconColor:a,closeIconColorHover:o,closeIconColorPressed:s,tabColor:c,tabBorderColor:u,paneTextColor:d,tabFontWeight:f,tabBorderRadius:p,tabFontWeightActive:m,colorSegment:h,fontWeightStrong:g,tabColorSegment:_,closeSize:v,closeIconSize:b,closeColorHover:x,closeColorPressed:S,closeBorderRadius:C,[R(`panePadding`,e)]:w,[R(`tabPadding`,r)]:ee,[R(`tabPaddingVertical`,r)]:T,[R(`tabGap`,r)]:te,[R(`tabGap`,`${r}Vertical`)]:E,[R(`tabTextColor`,n)]:ne,[R(`tabTextColorActive`,n)]:re,[R(`tabTextColorHover`,n)]:D,[R(`tabTextColorDisabled`,n)]:O,[R(`tabFontSize`,e)]:k},common:{cubicBezierEaseInOut:A}}=l.value;return{"--n-bezier":A,"--n-color-segment":h,"--n-bar-color":i,"--n-tab-font-size":k,"--n-tab-text-color":ne,"--n-tab-text-color-active":re,"--n-tab-text-color-disabled":O,"--n-tab-text-color-hover":D,"--n-pane-text-color":d,"--n-tab-border-color":u,"--n-tab-border-radius":p,"--n-close-size":v,"--n-close-icon-size":b,"--n-close-color-hover":x,"--n-close-color-pressed":S,"--n-close-border-radius":C,"--n-close-icon-color":a,"--n-close-icon-color-hover":o,"--n-close-icon-color-pressed":s,"--n-tab-color":c,"--n-tab-font-weight":f,"--n-tab-font-weight-active":m,"--n-tab-padding":ee,"--n-tab-padding-vertical":T,"--n-tab-gap":te,"--n-tab-gap-vertical":E,"--n-pane-padding-left":he(w,`left`),"--n-pane-padding-right":he(w,`right`),"--n-pane-padding-top":he(w,`top`),"--n-pane-padding-bottom":he(w,`bottom`),"--n-font-weight-strong":g,"--n-tab-color-segment":_}}),X=s?k(`tabs`,n(()=>`${y.value[0]}${t.type[0]}`),Se,t):void 0;return Object.assign({mergedClsPrefix:o,mergedValue:S,renderedNames:new Set,segmentCapsuleElRef:G,tabsPaneWrapperRef:N,tabsElRef:u,barElRef:d,addTabInstRef:p,xScrollInstRef:m,scrollWrapperElRef:f,addTabFixed:q,tabWrapperStyle:T,handleNavResize:fe,mergedSize:y,handleScroll:ye,handleTabsResize:J,cssVars:s?void 0:Se,themeClass:X?.themeClass,animationDirection:B,renderNameListRef:z,yScrollElRef:h,handleSegmentResize:xe,onAnimationBeforeLeave:I,onAnimationEnter:L,onAnimationAfterEnter:ae,onRender:X?.onRender},be)},render(){let{mergedClsPrefix:e,type:t,placement:n,addTabFixed:r,addable:i,mergedSize:a,renderNameListRef:o,onRender:s,paneWrapperClass:c,paneWrapperStyle:l,$slots:{default:u,prefix:d,suffix:f}}=this;s?.();let p=u?H(u()).filter(e=>e.type.__TAB_PANE__===!0):[],m=u?H(u()).filter(e=>e.type.__TAB__===!0):[],h=!m.length,g=t===`card`,_=t===`segment`,v=!g&&!_&&this.justifyContent;o.value=[];let b=()=>{let t=y(`div`,{style:this.tabWrapperStyle,class:`${e}-tabs-wrapper`},v?null:y(`div`,{class:`${e}-tabs-scroll-padding`,style:n===`top`||n===`bottom`?{width:`${this.tabsPadding}px`}:{height:`${this.tabsPadding}px`}}),h?p.map((e,t)=>(o.value.push(e.props.name),dt(y(rt,Object.assign({},e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0&&(!v||v===`center`||v===`start`||v===`end`)}),e.children?{default:e.children.tab}:void 0)))):m.map((e,t)=>(o.value.push(e.props.name),dt(t!==0&&!v?ut(e):e))),!r&&i&&g?lt(i,(h?p.length:m.length)!==0):null,v?null:y(`div`,{class:`${e}-tabs-scroll-padding`,style:{width:`${this.tabsPadding}px`}}));return y(`div`,{ref:`tabsElRef`,class:`${e}-tabs-nav-scroll-content`},g&&i?y(Y,{onResize:this.handleTabsResize},{default:()=>t}):t,g?y(`div`,{class:`${e}-tabs-pad`}):null,g?null:y(`div`,{ref:`barElRef`,class:`${e}-tabs-bar`}))},x=_?`top`:n;return y(`div`,{class:[`${e}-tabs`,this.themeClass,`${e}-tabs--${t}-type`,`${e}-tabs--${a}-size`,v&&`${e}-tabs--flex`,`${e}-tabs--${x}`],style:this.cssVars},y(`div`,{class:[`${e}-tabs-nav--${t}-type`,`${e}-tabs-nav--${x}`,`${e}-tabs-nav`]},_e(d,t=>t&&y(`div`,{class:`${e}-tabs-nav__prefix`},t)),_?y(Y,{onResize:this.handleSegmentResize},{default:()=>y(`div`,{class:`${e}-tabs-rail`,ref:`tabsElRef`},y(`div`,{class:`${e}-tabs-capsule`,ref:`segmentCapsuleElRef`},y(`div`,{class:`${e}-tabs-wrapper`},y(`div`,{class:`${e}-tabs-tab`}))),h?p.map((e,t)=>(o.value.push(e.props.name),y(rt,Object.assign({},e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0}),e.children?{default:e.children.tab}:void 0))):m.map((e,t)=>(o.value.push(e.props.name),t===0?e:ut(e))))}):y(Y,{onResize:this.handleNavResize},{default:()=>y(`div`,{class:`${e}-tabs-nav-scroll-wrapper`,ref:`scrollWrapperElRef`},[`top`,`bottom`].includes(x)?y(Oe,{ref:`xScrollInstRef`,onScroll:this.handleScroll},{default:b}):y(`div`,{class:`${e}-tabs-nav-y-scroll`,onScroll:this.handleScroll,ref:`yScrollElRef`},b()))}),r&&i&&g?lt(i,!0):null,_e(f,t=>t&&y(`div`,{class:`${e}-tabs-nav__suffix`},t))),h&&(this.animated&&(x===`top`||x===`bottom`)?y(`div`,{ref:`tabsPaneWrapperRef`,style:l,class:[`${e}-tabs-pane-wrapper`,c]},ct(p,this.mergedValue,this.renderedNames,this.onAnimationBeforeLeave,this.onAnimationEnter,this.onAnimationAfterEnter,this.animationDirection)):ct(p,this.mergedValue,this.renderedNames)))}});function ct(e,n,r,i,a,o,s){let c=[];return e.forEach(e=>{let{name:t,displayDirective:i,"display-directive":a}=e.props,o=e=>i===e||a===e,s=n===t;if(e.key!==void 0&&(e.key=t),s||o(`show`)||o(`show:lazy`)&&r.has(t)){r.has(t)||r.add(t);let n=!o(`if`);c.push(n?ee(e,[[p,s]]):e)}}),s?y(t,{name:`${s}-transition`,onBeforeLeave:i,onEnter:a,onAfterEnter:o},{default:()=>c}):c}function lt(e,t){return y(rt,{ref:`addTabInstRef`,key:`__addable`,name:`__addable`,internalCreatedByPane:!0,internalAddable:!0,internalLeftPadded:t,disabled:typeof e==`object`&&e.disabled})}function ut(e){let t=oe(e);return t.props?t.props.internalLeftPadded=!0:t.props={internalLeftPadded:!0},t}function dt(e){return Array.isArray(e.dynamicProps)?e.dynamicProps.includes(`internalLeftPadded`)||e.dynamicProps.push(`internalLeftPadded`):e.dynamicProps=[`internalLeftPadded`],e}var $={containers:()=>M.get(`/api/docker/containers`),containerAction:(e,t)=>M.post(`/api/docker/containers/${encodeURIComponent(e)}/${t}`),images:()=>M.get(`/api/docker/images`),removeImage:e=>M.post(`/api/docker/images/${encodeURIComponent(e)}/remove`),volumes:()=>M.get(`/api/docker/volumes`),removeVolume:e=>M.post(`/api/docker/volumes/${encodeURIComponent(e)}/remove`),networks:()=>M.get(`/api/docker/networks`),removeNetwork:e=>M.post(`/api/docker/networks/${encodeURIComponent(e)}/remove`),settings:()=>M.get(`/api/docker/settings`),prune:e=>M.post(`/api/docker/prune/${e}`)},ft={key:1,class:`tab-loading`},pt=ve(j({__name:`DockerView`,setup(e){let t=de();function n(e){return e instanceof O&&e.status===503&&!!e.body&&typeof e.body==`object`&&`enabled`in e.body}function r(e,n){t.error(e instanceof O?e.message:n)}let i=e=>e===`running`?`success`:e===`paused`||e===`restarting`?`warning`:e===`dead`?`error`:`default`,a=C([]),s=C(!0),d=C(null),p;async function m(){try{let e=await $.containers();a.value=e.containers,d.value=null}catch(e){n(e)&&(d.value=e.body)}finally{s.value=!1}}async function h(e,t){try{let n=await $.containerAction(e,t);a.value=n.containers}catch(e){r(e,`Aksi ${t} gagal`)}}let g=[{title:`Nama`,key:`name`,width:160,ellipsis:{tooltip:!0}},{title:`Image`,key:`image`,width:180,ellipsis:{tooltip:!0}},{title:`Status`,key:`state`,width:130,render:e=>y(fe,{type:i(e.state),size:`small`},{default:()=>e.status})},{title:`CPU`,key:`cpu`,width:70,render:e=>e.hasStats?`${e.stats.cpuPercent.toFixed(1)}%`:`—`},{title:`RAM`,key:`ram`,width:150,render:e=>e.hasStats?`${Z(e.stats.memUsageBytes)} / ${Z(e.stats.memLimitBytes)}`:`—`},{title:`Network`,key:`net`,width:140,render:e=>e.hasStats?`↓ ${Z(e.stats.netRxBytes)} ↑ ${Z(e.stats.netTxBytes)}`:`—`},{title:`Ports`,key:`ports`,width:220,ellipsis:{tooltip:!0}},{title:`Aksi`,key:`actions`,width:220,fixed:`right`,render:e=>y(K,{size:`small`},()=>[e.state===`running`?[y(J,{size:`tiny`,onClick:()=>h(e.id,`stop`)},()=>`Stop`),y(J,{size:`tiny`,onClick:()=>h(e.id,`restart`)},()=>`Restart`)]:y(J,{size:`tiny`,type:`primary`,onClick:()=>h(e.id,`start`)},()=>`Start`),y(q,{onPositiveClick:()=>h(e.id,`remove`)},{trigger:()=>y(J,{size:`tiny`,type:`error`,ghost:!0},()=>`Hapus`),default:()=>`Hapus container "${e.name}"?`})])}],v=C([]),b=C(!0),x=C(null);async function w(){b.value=!0;try{let e=await $.images();v.value=e.images,x.value=null}catch(e){n(e)&&(x.value=e.body)}finally{b.value=!1}}async function ee(e){try{let t=await $.removeImage(e);v.value=t.images}catch(e){r(e,`Hapus image gagal (mungkin masih dipakai container)`)}}let re=[{title:`Tag`,key:`tag`,render:e=>e.dangling?y(K,{size:`small`,align:`center`},()=>[e.tag,y(fe,{size:`small`,type:`warning`},()=>`dangling`)]):e.tag},{title:`Ukuran`,key:`sizeBytes`,render:e=>Z(e.sizeBytes)},{title:`Dipakai`,key:`containers`,render:e=>e.containers<0?`—`:e.containers===0?`tidak dipakai`:`${e.containers} container`},{title:`Dibuat`,key:`created`,render:e=>Ee(e.created)},{title:`Aksi`,key:`actions`,render:e=>y(q,{onPositiveClick:()=>ee(e.id)},{trigger:()=>y(J,{size:`tiny`,type:`error`,ghost:!0},()=>`Hapus`),default:()=>`Hapus image "${e.tag}"?`})}],D=C([]),k=C(!0),j=C(null);async function M(){k.value=!0;try{let e=await $.volumes();D.value=e.volumes,j.value=null}catch(e){n(e)&&(j.value=e.body)}finally{k.value=!1}}async function ie(e){try{let t=await $.removeVolume(e);D.value=t.volumes}catch(e){r(e,`Hapus volume gagal (mungkin masih dipakai container)`)}}let P=[{title:`Nama`,key:`name`},{title:`Driver`,key:`driver`},{title:`Ukuran`,key:`sizeBytes`,render:e=>e.sizeBytes<0?`tidak diketahui`:Z(e.sizeBytes)},{title:`Status`,key:`inUse`,render:e=>y(fe,{size:`small`,type:e.inUse?`success`:`default`},()=>e.inUse?`dipakai`:`tidak dipakai`)},{title:`Aksi`,key:`actions`,render:e=>y(q,{onPositiveClick:()=>ie(e.name)},{trigger:()=>y(J,{size:`tiny`,type:`error`,ghost:!0},()=>`Hapus`),default:()=>`Hapus volume "${e.name}"?`})}],F=C([]),I=C(!0),L=C(null);async function R(){I.value=!0;try{let e=await $.networks();F.value=e.networks,L.value=null}catch(e){n(e)&&(L.value=e.body)}finally{I.value=!1}}async function ae(e){try{let t=await $.removeNetwork(e);F.value=t.networks}catch(e){r(e,`Hapus network gagal (mungkin builtin atau masih dipakai)`)}}let z=[{title:`Nama`,key:`name`,render:e=>e.builtin?y(K,{size:`small`,align:`center`},()=>[e.name,y(fe,{size:`small`},()=>`builtin`)]):e.name},{title:`Driver`,key:`driver`},{title:`Subnet`,key:`subnet`,render:e=>e.subnet||`—`},{title:`Container Terhubung`,key:`connectedCount`},{title:`Aksi`,key:`actions`,render:e=>e.builtin?null:y(q,{onPositiveClick:()=>ae(e.id)},{trigger:()=>y(J,{size:`tiny`,type:`error`,ghost:!0},()=>`Hapus`),default:()=>`Hapus network "${e.name}"?`})}],B=C(null),oe=C(!0),V=C(null),H=C(null);async function se(){oe.value=!0;try{B.value=await $.settings(),V.value=null}catch(e){n(e)&&(V.value=e.body)}finally{oe.value=!1}}async function le(e){H.value=e;try{B.value=await $.prune(e),t.success(`Cleanup selesai`)}catch(t){r(t,`Cleanup gagal: ${e}`)}finally{H.value=null}}let U=C(`containers`),W=new Set([`containers`]);return A(U,e=>{W.has(e)||(W.add(e),e===`images`?w():e===`volumes`?M():e===`networks`?R():e===`settings`&&se())}),te(()=>{m(),p=setInterval(m,5e3)}),S(()=>{p&&clearInterval(p)}),(e,t)=>(N(),l(ce,null,{default:T(()=>[f(o(st),{type:`line`,value:U.value,"onUpdate:value":t[0]||=e=>U.value=e},{default:T(()=>[f(o(tt),{name:`containers`,tab:`Containers`},{default:T(()=>[d.value?(N(),l(o(X),{key:0,type:`warning`,title:d.value.error},null,8,[`title`])):(N(),l(o(G),{key:1,columns:g,data:a.value,loading:s.value,"row-key":e=>e.id,"scroll-x":1200},null,8,[`data`,`loading`,`row-key`]))]),_:1}),f(o(tt),{name:`images`,tab:`Images`},{default:T(()=>[x.value?(N(),l(o(X),{key:0,type:`warning`,title:x.value.error},null,8,[`title`])):(N(),l(o(G),{key:1,columns:re,data:v.value,loading:b.value,"row-key":e=>e.id},null,8,[`data`,`loading`,`row-key`]))]),_:1}),f(o(tt),{name:`volumes`,tab:`Volumes`},{default:T(()=>[j.value?(N(),l(o(X),{key:0,type:`warning`,title:j.value.error},null,8,[`title`])):(N(),l(o(G),{key:1,columns:P,data:D.value,loading:k.value,"row-key":e=>e.name},null,8,[`data`,`loading`,`row-key`]))]),_:1}),f(o(tt),{name:`networks`,tab:`Networks`},{default:T(()=>[L.value?(N(),l(o(X),{key:0,type:`warning`,title:L.value.error},null,8,[`title`])):(N(),l(o(G),{key:1,columns:z,data:F.value,loading:I.value,"row-key":e=>e.id},null,8,[`data`,`loading`,`row-key`]))]),_:1}),f(o(tt),{name:`settings`,tab:`Settings`},{default:T(()=>[V.value?(N(),l(o(X),{key:0,type:`warning`,title:V.value.error},null,8,[`title`])):oe.value&&!B.value?(N(),_(`div`,ft,[f(o(Te),{size:`large`})])):B.value?(N(),l(o(K),{key:3,vertical:``,size:24},{default:T(()=>[f(o(Ze),{title:`Info Daemon`,column:2,bordered:``,"label-placement":`left`},{default:T(()=>[f(o(Q),{label:`Versi Server`},{default:T(()=>[c(E(B.value?.info.serverVersion),1)]),_:1}),f(o(Q),{label:`OS / Kernel`},{default:T(()=>[c(E(B.value?.info.operatingSystem)+` / `+E(B.value?.info.kernelVersion),1)]),_:1}),f(o(Q),{label:`Storage Driver`},{default:T(()=>[c(E(B.value?.info.storageDriver),1)]),_:1}),f(o(Q),{label:`Root Dir`},{default:T(()=>[c(E(B.value?.info.dockerRootDir),1)]),_:1}),f(o(Q),{label:`Container`},{default:T(()=>[c(E(B.value?.info.containersRunning)+` running, `+E(B.value?.info.containersPaused)+` paused, `+E(B.value?.info.containersStopped)+` stopped `,1)]),_:1}),f(o(Q),{label:`Images`},{default:T(()=>[c(E(B.value?.info.images),1)]),_:1})]),_:1}),f(o(Ze),{title:`Disk Usage`,column:2,bordered:``,"label-placement":`left`},{default:T(()=>[f(o(Q),{label:`Images`},{default:T(()=>[c(E(o(Z)(B.value?.diskUsage.imagesTotalBytes??0))+` (reclaimable `+E(o(Z)(B.value?.diskUsage.imagesReclaimableBytes??0))+`) `,1)]),_:1}),f(o(Q),{label:`Containers`},{default:T(()=>[c(E(o(Z)(B.value?.diskUsage.containersTotalBytes??0)),1)]),_:1}),f(o(Q),{label:`Volumes`},{default:T(()=>[c(E(o(Z)(B.value?.diskUsage.volumesTotalBytes??0))+` (reclaimable `+E(o(Z)(B.value?.diskUsage.volumesReclaimableBytes??0))+`) `,1)]),_:1})]),_:1}),f(o(K),null,{default:T(()=>[(N(),_(u,null,ne([`containers`,`images`,`volumes`,`networks`,`all`],e=>f(o(q),{key:e,onPositiveClick:t=>le(e)},{trigger:T(()=>[f(o(J),{size:`small`,loading:H.value===e},{default:T(()=>[c(`Bersihkan `+E(e),1)]),_:2},1032,[`loading`])]),default:T(()=>[c(` Jalankan cleanup "`+E(e)+`"? Tindakan ini tidak bisa dibatalkan. `,1)]),_:2},1032,[`onPositiveClick`])),64))]),_:1})]),_:1})):(N(),l(o(ue),{key:2,description:`Tidak ada data`}))]),_:1})]),_:1},8,[`value`])]),_:1}))}}),[[`__scopeId`,`data-v-961296c9`]]);export{pt as default};