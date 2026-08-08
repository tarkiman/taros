import{$n as e,An as t,Bn as n,Bt as r,Cn as i,Dn as a,Fn as o,Gt as s,Hn as c,Ht as l,In as u,It as d,Jn as f,Ln as p,N as m,Nn as h,Nt as g,Pt as _,Qn as v,Rn as y,Tt as b,U as x,Un as S,V as C,Vn as w,Yn as ee,Zn as T,Zt as E,_ as D,_t as O,ar as k,c as A,cn as j,dn as M,fn as N,gn as P,gr as F,hn as te,in as I,ir as ne,jn as L,ln as R,m as re,mn as z,mt as B,nn as ie,o as V,or as ae,pn as oe,pr as H,rr as se,ur as U,wt as W,xn as G,xt as K,yr as q}from"./auth-DuOMAfJl.js";import{C as ce,S as le,g as ue,h as J,t as de,u as fe}from"./AppShell-Da3Ku9Bs.js";import{r as Y,t as pe}from"./DataTable-D-NwMz6l.js";import{u as X}from"./useTheme-7reTYSWY.js";import{c as me,n as he}from"./LocaleSwitcher-C8kLnMY3.js";import{n as ge,r as _e}from"./fade-in-scale-up.cssr-DdvCh1gq.js";import{t as ve}from"./get-slot-6kXJmSMP.js";import{t as ye}from"./Add-C4NwhC02.js";import{t as be}from"./Tag-B-zLyYdR.js";import{n as xe,r as Se}from"./light-CQMbmPK2.js";import{t as Ce}from"./use-message-BRBnDHCW.js";import{t as we}from"./Space-BS80NyFM.js";import{t as Te}from"./Popconfirm-BlCsgXvb.js";import{t as Z}from"./docker-C-0uhpxP.js";import{n as Ee,t as Q}from"./format-BxLcbkc3.js";var De=J(`.v-x-scroll`,{overflow:`auto`,scrollbarWidth:`none`},[J(`&::-webkit-scrollbar`,{width:0,height:0})]),Oe=y({name:`XScroll`,props:{disabled:Boolean,onScroll:Function},setup(){let e=U(null);function t(e){!(e.currentTarget.offsetWidth<e.currentTarget.scrollWidth)||e.deltaY===0||(e.currentTarget.scrollLeft+=e.deltaY+e.deltaX,e.preventDefault())}let n=l();return De.mount({id:`vueuc/x-scroll`,head:!0,anchorMetaName:ue,ssr:n}),Object.assign({selfRef:e,handleWheel:t},{scrollTo(...t){var n;(n=e.value)==null||n.scrollTo(...t)}})},render(){return n(`div`,{ref:`selfRef`,onScroll:this.onScroll,onWheel:this.disabled?void 0:this.handleWheel,class:`v-x-scroll`},this.$slots)}});function ke(e,t=`default`,n=[]){let{children:r}=e;if(typeof r==`object`&&r&&!Array.isArray(r)){let e=r[t];if(typeof e==`function`)return e()}return n}var Ae=/\s/;function je(e){for(var t=e.length;t--&&Ae.test(e.charAt(t)););return t}var Me=/^\s+/;function Ne(e){return e&&e.slice(0,je(e)+1).replace(Me,``)}var Pe=NaN,Fe=/^[-+]0x[0-9a-f]+$/i,Ie=/^0b[01]+$/i,Le=/^0o[0-7]+$/i,Re=parseInt;function ze(e){if(typeof e==`number`)return e;if(O(e))return Pe;if(B(e)){var t=typeof e.valueOf==`function`?e.valueOf():e;e=B(t)?t+``:t}if(typeof e!=`string`)return e===0?e:+e;e=Ne(e);var n=Ie.test(e);return n||Le.test(e)?Re(e.slice(2),n?2:8):Fe.test(e)?Pe:+e}var Be=function(){return K.Date.now()},Ve=`Expected a function`,He=Math.max,Ue=Math.min;function We(e,t,n){var r,i,a,o,s,c,l=0,u=!1,d=!1,f=!0;if(typeof e!=`function`)throw TypeError(Ve);t=ze(t)||0,B(n)&&(u=!!n.leading,d=`maxWait`in n,a=d?He(ze(n.maxWait)||0,t):a,f=`trailing`in n?!!n.trailing:f);function p(t){var n=r,a=i;return r=i=void 0,l=t,o=e.apply(a,n),o}function m(e){return l=e,s=setTimeout(_,t),u?p(e):o}function h(e){var n=e-c,r=e-l,i=t-n;return d?Ue(i,a-r):i}function g(e){var n=e-c,r=e-l;return c===void 0||n>=t||n<0||d&&r>=a}function _(){var e=Be();if(g(e))return v(e);s=setTimeout(_,h(e))}function v(e){return s=void 0,f&&r?p(e):(r=i=void 0,o)}function y(){s!==void 0&&clearTimeout(s),l=0,r=c=i=s=void 0}function b(){return s===void 0?o:v(Be())}function x(){var e=Be(),n=g(e);if(r=arguments,i=this,c=e,n){if(s===void 0)return m(c);if(d)return clearTimeout(s),s=setTimeout(_,t),p(c)}return s===void 0&&(s=setTimeout(_,t)),o}return x.cancel=y,x.flush=b,x}var Ge=`Expected a function`;function Ke(e,t,n){var r=!0,i=!0;if(typeof e!=`function`)throw TypeError(Ge);return B(n)&&(r=`leading`in n?!!n.leading:r,i=`trailing`in n?!!n.trailing:i),We(e,t,{leading:r,maxWait:t,trailing:i})}var qe=j([R(`descriptions`,{fontSize:`var(--n-font-size)`},[R(`descriptions-separator`,`
 display: inline-block;
 margin: 0 8px 0 2px;
 `),R(`descriptions-table-wrapper`,[R(`descriptions-table`,[R(`descriptions-table-row`,[R(`descriptions-table-header`,{padding:`var(--n-th-padding)`}),R(`descriptions-table-content`,{padding:`var(--n-td-padding)`})])])]),oe(`bordered`,[R(`descriptions-table-wrapper`,[R(`descriptions-table`,[R(`descriptions-table-row`,[j(`&:last-child`,[R(`descriptions-table-content`,{paddingBottom:0})])])])])]),N(`left-label-placement`,[R(`descriptions-table-content`,[j(`> *`,{verticalAlign:`top`})])]),N(`left-label-align`,[j(`th`,{textAlign:`left`})]),N(`center-label-align`,[j(`th`,{textAlign:`center`})]),N(`right-label-align`,[j(`th`,{textAlign:`right`})]),N(`bordered`,[R(`descriptions-table-wrapper`,`
 border-radius: var(--n-border-radius);
 overflow: hidden;
 background: var(--n-merged-td-color);
 border: 1px solid var(--n-merged-border-color);
 `,[R(`descriptions-table`,[R(`descriptions-table-row`,[j(`&:not(:last-child)`,[R(`descriptions-table-content`,{borderBottom:`1px solid var(--n-merged-border-color)`}),R(`descriptions-table-header`,{borderBottom:`1px solid var(--n-merged-border-color)`})]),R(`descriptions-table-header`,`
 font-weight: 400;
 background-clip: padding-box;
 background-color: var(--n-merged-th-color);
 `,[j(`&:not(:last-child)`,{borderRight:`1px solid var(--n-merged-border-color)`})]),R(`descriptions-table-content`,[j(`&:not(:last-child)`,{borderRight:`1px solid var(--n-merged-border-color)`})])])])])]),R(`descriptions-header`,`
 font-weight: var(--n-th-font-weight);
 font-size: 18px;
 transition: color .3s var(--n-bezier);
 line-height: var(--n-line-height);
 margin-bottom: 16px;
 color: var(--n-title-text-color);
 `),R(`descriptions-table-wrapper`,`
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[R(`descriptions-table`,`
 width: 100%;
 border-collapse: separate;
 border-spacing: 0;
 box-sizing: border-box;
 `,[R(`descriptions-table-row`,`
 box-sizing: border-box;
 transition: border-color .3s var(--n-bezier);
 `,[R(`descriptions-table-header`,`
 font-weight: var(--n-th-font-weight);
 line-height: var(--n-line-height);
 display: table-cell;
 box-sizing: border-box;
 color: var(--n-th-text-color);
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `),R(`descriptions-table-content`,`
 vertical-align: top;
 line-height: var(--n-line-height);
 display: table-cell;
 box-sizing: border-box;
 color: var(--n-td-text-color);
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[M(`content`,`
 transition: color .3s var(--n-bezier);
 display: inline-block;
 color: var(--n-td-text-color);
 `)]),M(`label`,`
 font-weight: var(--n-th-font-weight);
 transition: color .3s var(--n-bezier);
 display: inline-block;
 margin-right: 14px;
 color: var(--n-th-text-color);
 `)])])])]),R(`descriptions-table-wrapper`,`
 --n-merged-th-color: var(--n-th-color);
 --n-merged-td-color: var(--n-td-color);
 --n-merged-border-color: var(--n-border-color);
 `),te(R(`descriptions-table-wrapper`,`
 --n-merged-th-color: var(--n-th-color-modal);
 --n-merged-td-color: var(--n-td-color-modal);
 --n-merged-border-color: var(--n-border-color-modal);
 `)),P(R(`descriptions-table-wrapper`,`
 --n-merged-th-color: var(--n-th-color-popover);
 --n-merged-td-color: var(--n-td-color-popover);
 --n-merged-border-color: var(--n-border-color-popover);
 `))]),Je=`DESCRIPTION_ITEM_FLAG`;function Ye(e){return typeof e==`object`&&e&&!Array.isArray(e)?e.type&&e.type.DESCRIPTION_ITEM_FLAG:!1}var Xe=Object.assign(Object.assign({},x.props),{title:String,column:{type:Number,default:3},columns:Number,labelPlacement:{type:String,default:`top`},labelAlign:{type:String,default:`left`},separator:{type:String,default:`:`},size:String,bordered:Boolean,labelClass:String,labelStyle:[Object,String],contentClass:String,contentStyle:[Object,String]}),Ze=y({name:`Descriptions`,props:Xe,slots:Object,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n,mergedComponentPropsRef:r}=b(e),i=L(()=>e.size||r?.value?.Descriptions?.size||`medium`),a=x(`Descriptions`,`-descriptions`,qe,Se,e,t),o=L(()=>{let{bordered:t}=e,n=i.value,{common:{cubicBezierEaseInOut:r},self:{titleTextColor:o,thColor:s,thColorModal:c,thColorPopover:l,thTextColor:u,thFontWeight:d,tdTextColor:f,tdColor:p,tdColorModal:m,tdColorPopover:h,borderColor:g,borderColorModal:_,borderColorPopover:v,borderRadius:y,lineHeight:b,[z(`fontSize`,n)]:x,[z(t?`thPaddingBordered`:`thPadding`,n)]:S,[z(t?`tdPaddingBordered`:`tdPadding`,n)]:C}}=a.value;return{"--n-title-text-color":o,"--n-th-padding":S,"--n-td-padding":C,"--n-font-size":x,"--n-bezier":r,"--n-th-font-weight":d,"--n-line-height":b,"--n-th-text-color":u,"--n-td-text-color":f,"--n-th-color":s,"--n-th-color-modal":c,"--n-th-color-popover":l,"--n-td-color":p,"--n-td-color-modal":m,"--n-td-color-popover":h,"--n-border-radius":y,"--n-border-color":g,"--n-border-color-modal":_,"--n-border-color-popover":v}}),s=n?W(`descriptions`,L(()=>{let t=``,{bordered:n}=e;return n&&(t+=`a`),t+=i.value[0],t}),o,e):void 0;return{mergedClsPrefix:t,cssVars:n?void 0:o,themeClass:s?.themeClass,onRender:s?.onRender,compitableColumn:le(e,[`columns`,`column`]),inlineThemeDisabled:n,mergedSize:i}},render(){let e=this.$slots.default,t=e?X(e()):[];t.length;let{contentClass:r,labelClass:i,compitableColumn:a,labelPlacement:o,labelAlign:s,mergedSize:c,bordered:l,title:u,cssVars:d,mergedClsPrefix:f,separator:p,onRender:m}=this;m?.();let h=t.filter(e=>Ye(e)),g=h.reduce((e,t,s)=>{let c=t.props||{},u=h.length-1===s,d=[`label`in c?c.label:ke(t,`label`)],m=[ke(t)],g=c.span||1,_=e.span;e.span+=g;let v=c.labelStyle||c[`label-style`]||this.labelStyle,y=c.contentStyle||c[`content-style`]||this.contentStyle;if(o===`left`)l?e.row.push(n(`th`,{class:[`${f}-descriptions-table-header`,i],colspan:1,style:v},d),n(`td`,{class:[`${f}-descriptions-table-content`,r],colspan:u?(a-_)*2+1:g*2-1,style:y},m)):e.row.push(n(`td`,{class:`${f}-descriptions-table-content`,colspan:u?(a-_)*2:g*2},n(`span`,{class:[`${f}-descriptions-table-content__label`,i],style:v},[...d,p&&n(`span`,{class:`${f}-descriptions-separator`},p)]),n(`span`,{class:[`${f}-descriptions-table-content__content`,r],style:y},m)));else{let t=u?(a-_)*2:g*2;e.row.push(n(`th`,{class:[`${f}-descriptions-table-header`,i],colspan:t,style:v},d)),e.secondRow.push(n(`td`,{class:[`${f}-descriptions-table-content`,r],colspan:t,style:y},m))}return(e.span>=a||u)&&(e.span=0,e.row.length&&(e.rows.push(e.row),e.row=[]),o!==`left`&&e.secondRow.length&&(e.rows.push(e.secondRow),e.secondRow=[])),e},{span:0,row:[],secondRow:[],rows:[]}).rows.map(e=>n(`tr`,{class:`${f}-descriptions-table-row`},e));return n(`div`,{style:d,class:[`${f}-descriptions`,this.themeClass,`${f}-descriptions--${o}-label-placement`,`${f}-descriptions--${s}-label-align`,`${f}-descriptions--${c}-size`,l&&`${f}-descriptions--bordered`]},u||this.$slots.header?n(`div`,{class:`${f}-descriptions-header`},u||ve(this,`header`)):null,n(`div`,{class:`${f}-descriptions-table-wrapper`},n(`table`,{class:`${f}-descriptions-table`},n(`tbody`,null,o===`top`&&n(`tr`,{class:`${f}-descriptions-table-row`,style:{visibility:`collapse`}},E(a*2,n(`td`,null))),g))))}}),Qe={label:String,span:{type:Number,default:1},labelClass:String,labelStyle:[Object,String],contentClass:String,contentStyle:[Object,String]},$=y({name:`DescriptionsItem`,[Je]:!0,props:Qe,slots:Object,render(){return null}}),$e=s(`n-tabs`),et={tab:[String,Number,Object,Function],name:{type:[String,Number],required:!0},disabled:Boolean,displayDirective:{type:String,default:`if`},closable:{type:Boolean,default:void 0},tabProps:Object,label:[String,Number,Object,Function]},tt=y({__TAB_PANE__:!0,name:`TabPane`,alias:[`TabPanel`],props:et,slots:Object,setup(e){let t=w($e,null);return t||d(`tab-pane`,"`n-tab-pane` must be placed inside `n-tabs`."),{style:t.paneStyleRef,class:t.paneClassRef,mergedClsPrefix:t.mergedClsPrefixRef}},render(){return n(`div`,{class:[`${this.mergedClsPrefix}-tab-pane`,this.class],style:this.style},this.$slots)}}),nt=Object.assign({internalLeftPadded:Boolean,internalAddable:Boolean,internalCreatedByPane:Boolean},_e(et,[`displayDirective`])),rt=y({__TAB__:!0,inheritAttrs:!1,name:`Tab`,props:nt,setup(e){let{mergedClsPrefixRef:t,valueRef:n,typeRef:r,closableRef:i,tabStyleRef:a,addTabStyleRef:o,tabClassRef:s,addTabClassRef:c,tabChangeIdRef:l,onBeforeLeaveRef:u,triggerRef:d,handleAdd:f,activateTab:p,handleClose:m}=w($e);return{trigger:d,mergedClosable:L(()=>{if(e.internalAddable)return!1;let{closable:t}=e;return t===void 0?i.value:t}),style:a,addStyle:o,tabClass:s,addTabClass:c,clsPrefix:t,value:n,type:r,handleClose(t){t.stopPropagation(),!e.disabled&&m(e.name)},activateTab(){if(e.disabled)return;if(e.internalAddable){f();return}let{name:t}=e,r=++l.id;if(t!==n.value){let{value:i}=u;i?Promise.resolve(i(e.name,n.value)).then(e=>{e&&l.id===r&&p(t)}):p(t)}}}},render(){let{internalAddable:e,clsPrefix:t,name:r,disabled:i,label:o,tab:s,value:l,mergedClosable:u,trigger:d,$slots:{default:f}}=this,p=o??s;return n(`div`,{class:`${t}-tabs-tab-wrapper`},this.internalLeftPadded?n(`div`,{class:`${t}-tabs-tab-pad`}):null,n(`div`,Object.assign({key:r,"data-name":r,"data-disabled":i?!0:void 0},c({class:[`${t}-tabs-tab`,l===r&&`${t}-tabs-tab--active`,i&&`${t}-tabs-tab--disabled`,u&&`${t}-tabs-tab--closable`,e&&`${t}-tabs-tab--addable`,e?this.addTabClass:this.tabClass],onClick:d===`click`?this.activateTab:void 0,onMouseenter:d===`hover`?this.activateTab:void 0,style:e?this.addStyle:this.style},this.internalCreatedByPane?this.tabProps||{}:this.$attrs)),n(`span`,{class:`${t}-tabs-tab__label`},e?n(a,null,n(`div`,{class:`${t}-tabs-tab__height-placeholder`},`\xA0`),n(C,{clsPrefix:t},{default:()=>n(ye,null)})):f?f():typeof p==`object`?p:ge(p??r)),u&&this.type===`card`?n(m,{clsPrefix:t,class:`${t}-tabs-tab__close`,onClick:this.handleClose,disabled:i}):null))}}),it=R(`tabs`,`
 box-sizing: border-box;
 width: 100%;
 display: flex;
 flex-direction: column;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
`,[N(`segment-type`,[R(`tabs-rail`,[j(`&.transition-disabled`,[R(`tabs-capsule`,`
 transition: none;
 `)])])]),N(`top`,[R(`tab-pane`,`
 padding: var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left);
 `)]),N(`left`,[R(`tab-pane`,`
 padding: var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left) var(--n-pane-padding-top);
 `)]),N(`left, right`,`
 flex-direction: row;
 `,[R(`tabs-bar`,`
 width: 2px;
 right: 0;
 transition:
 top .2s var(--n-bezier),
 max-height .2s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `),R(`tabs-tab`,`
 padding: var(--n-tab-padding-vertical); 
 `)]),N(`right`,`
 flex-direction: row-reverse;
 `,[R(`tab-pane`,`
 padding: var(--n-pane-padding-left) var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom);
 `),R(`tabs-bar`,`
 left: 0;
 `)]),N(`bottom`,`
 flex-direction: column-reverse;
 justify-content: flex-end;
 `,[R(`tab-pane`,`
 padding: var(--n-pane-padding-bottom) var(--n-pane-padding-right) var(--n-pane-padding-top) var(--n-pane-padding-left);
 `),R(`tabs-bar`,`
 top: 0;
 `)]),R(`tabs-rail`,`
 position: relative;
 padding: 3px;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 background-color: var(--n-color-segment);
 transition: background-color .3s var(--n-bezier);
 display: flex;
 align-items: center;
 `,[R(`tabs-capsule`,`
 border-radius: var(--n-tab-border-radius);
 position: absolute;
 pointer-events: none;
 background-color: var(--n-tab-color-segment);
 box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .08);
 transition: transform 0.3s var(--n-bezier);
 `),R(`tabs-tab-wrapper`,`
 flex-basis: 0;
 flex-grow: 1;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[R(`tabs-tab`,`
 overflow: hidden;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[N(`active`,`
 font-weight: var(--n-font-weight-strong);
 color: var(--n-tab-text-color-active);
 `),j(`&:hover`,`
 color: var(--n-tab-text-color-hover);
 `)])])]),N(`flex`,[R(`tabs-nav`,`
 width: 100%;
 position: relative;
 `,[R(`tabs-wrapper`,`
 width: 100%;
 `,[R(`tabs-tab`,`
 margin-right: 0;
 `)])])]),R(`tabs-nav`,`
 box-sizing: border-box;
 line-height: 1.5;
 display: flex;
 transition: border-color .3s var(--n-bezier);
 `,[M(`prefix, suffix`,`
 display: flex;
 align-items: center;
 `),M(`prefix`,`padding-right: 16px;`),M(`suffix`,`padding-left: 16px;`)]),N(`top, bottom`,[j(`>`,[R(`tabs-nav`,[R(`tabs-nav-scroll-wrapper`,[j(`&::before`,`
 top: 0;
 bottom: 0;
 left: 0;
 width: 20px;
 `),j(`&::after`,`
 top: 0;
 bottom: 0;
 right: 0;
 width: 20px;
 `),N(`shadow-start`,[j(`&::before`,`
 box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, .12);
 `)]),N(`shadow-end`,[j(`&::after`,`
 box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),N(`left, right`,[R(`tabs-nav-scroll-content`,`
 flex-direction: column;
 `),j(`>`,[R(`tabs-nav`,[R(`tabs-nav-scroll-wrapper`,[j(`&::before`,`
 top: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),j(`&::after`,`
 bottom: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),N(`shadow-start`,[j(`&::before`,`
 box-shadow: inset 0 10px 8px -8px rgba(0, 0, 0, .12);
 `)]),N(`shadow-end`,[j(`&::after`,`
 box-shadow: inset 0 -10px 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),R(`tabs-nav-scroll-wrapper`,`
 flex: 1;
 position: relative;
 overflow: hidden;
 `,[R(`tabs-nav-y-scroll`,`
 height: 100%;
 width: 100%;
 overflow-y: auto; 
 scrollbar-width: none;
 `,[j(`&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb`,`
 width: 0;
 height: 0;
 display: none;
 `)]),j(`&::before, &::after`,`
 transition: box-shadow .3s var(--n-bezier);
 pointer-events: none;
 content: "";
 position: absolute;
 z-index: 1;
 `)]),R(`tabs-nav-scroll-content`,`
 display: flex;
 position: relative;
 min-width: 100%;
 min-height: 100%;
 width: fit-content;
 box-sizing: border-box;
 `),R(`tabs-wrapper`,`
 display: inline-flex;
 flex-wrap: nowrap;
 position: relative;
 `),R(`tabs-tab-wrapper`,`
 display: flex;
 flex-wrap: nowrap;
 flex-shrink: 0;
 flex-grow: 0;
 `),R(`tabs-tab`,`
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
 `,[N(`disabled`,{cursor:`not-allowed`}),M(`close`,`
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),M(`label`,`
 display: flex;
 align-items: center;
 z-index: 1;
 `)]),R(`tabs-bar`,`
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
 `,[j(`&.transition-disabled`,`
 transition: none;
 `),N(`disabled`,`
 background-color: var(--n-tab-text-color-disabled)
 `)]),R(`tabs-pane-wrapper`,`
 position: relative;
 overflow: hidden;
 transition: max-height .2s var(--n-bezier);
 `),R(`tab-pane`,`
 color: var(--n-pane-text-color);
 width: 100%;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 opacity .2s var(--n-bezier);
 left: 0;
 right: 0;
 top: 0;
 `,[j(`&.next-transition-leave-active, &.prev-transition-leave-active, &.next-transition-enter-active, &.prev-transition-enter-active`,`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 transform .2s var(--n-bezier),
 opacity .2s var(--n-bezier);
 `),j(`&.next-transition-leave-active, &.prev-transition-leave-active`,`
 position: absolute;
 `),j(`&.next-transition-enter-from, &.prev-transition-leave-to`,`
 transform: translateX(32px);
 opacity: 0;
 `),j(`&.next-transition-leave-to, &.prev-transition-enter-from`,`
 transform: translateX(-32px);
 opacity: 0;
 `),j(`&.next-transition-leave-from, &.next-transition-enter-to, &.prev-transition-leave-from, &.prev-transition-enter-to`,`
 transform: translateX(0);
 opacity: 1;
 `)]),R(`tabs-tab-pad`,`
 box-sizing: border-box;
 width: var(--n-tab-gap);
 flex-grow: 0;
 flex-shrink: 0;
 `),N(`line-type, bar-type`,[R(`tabs-tab`,`
 font-weight: var(--n-tab-font-weight);
 box-sizing: border-box;
 vertical-align: bottom;
 `,[j(`&:hover`,{color:`var(--n-tab-text-color-hover)`}),N(`active`,`
 color: var(--n-tab-text-color-active);
 font-weight: var(--n-tab-font-weight-active);
 `),N(`disabled`,{color:`var(--n-tab-text-color-disabled)`})])]),R(`tabs-nav`,[N(`line-type`,[N(`top`,[M(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),R(`tabs-nav-scroll-content`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),R(`tabs-bar`,`
 bottom: -1px;
 `)]),N(`left`,[M(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),R(`tabs-nav-scroll-content`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),R(`tabs-bar`,`
 right: -1px;
 `)]),N(`right`,[M(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),R(`tabs-nav-scroll-content`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),R(`tabs-bar`,`
 left: -1px;
 `)]),N(`bottom`,[M(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),R(`tabs-nav-scroll-content`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),R(`tabs-bar`,`
 top: -1px;
 `)]),M(`prefix, suffix`,`
 transition: border-color .3s var(--n-bezier);
 `),R(`tabs-nav-scroll-content`,`
 transition: border-color .3s var(--n-bezier);
 `),R(`tabs-bar`,`
 border-radius: 0;
 `)]),N(`card-type`,[M(`prefix, suffix`,`
 transition: border-color .3s var(--n-bezier);
 `),R(`tabs-pad`,`
 flex-grow: 1;
 transition: border-color .3s var(--n-bezier);
 `),R(`tabs-tab-pad`,`
 transition: border-color .3s var(--n-bezier);
 `),R(`tabs-tab`,`
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
 `,[N(`addable`,`
 padding-left: 8px;
 padding-right: 8px;
 font-size: 16px;
 justify-content: center;
 `,[M(`height-placeholder`,`
 width: 0;
 font-size: var(--n-tab-font-size);
 `),oe(`disabled`,[j(`&:hover`,`
 color: var(--n-tab-text-color-hover);
 `)])]),N(`closable`,`padding-right: 8px;`),N(`active`,`
 background-color: #0000;
 font-weight: var(--n-tab-font-weight-active);
 color: var(--n-tab-text-color-active);
 `),N(`disabled`,`color: var(--n-tab-text-color-disabled);`)])]),N(`left, right`,`
 flex-direction: column; 
 `,[M(`prefix, suffix`,`
 padding: var(--n-tab-padding-vertical);
 `),R(`tabs-wrapper`,`
 flex-direction: column;
 `),R(`tabs-tab-wrapper`,`
 flex-direction: column;
 `,[R(`tabs-tab-pad`,`
 height: var(--n-tab-gap-vertical);
 width: 100%;
 `)])]),N(`top`,[N(`card-type`,[R(`tabs-scroll-padding`,`border-bottom: 1px solid var(--n-tab-border-color);`),M(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),R(`tabs-tab`,`
 border-top-left-radius: var(--n-tab-border-radius);
 border-top-right-radius: var(--n-tab-border-radius);
 `,[N(`active`,`
 border-bottom: 1px solid #0000;
 `)]),R(`tabs-tab-pad`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),R(`tabs-pad`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `)])]),N(`left`,[N(`card-type`,[R(`tabs-scroll-padding`,`border-right: 1px solid var(--n-tab-border-color);`),M(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),R(`tabs-tab`,`
 border-top-left-radius: var(--n-tab-border-radius);
 border-bottom-left-radius: var(--n-tab-border-radius);
 `,[N(`active`,`
 border-right: 1px solid #0000;
 `)]),R(`tabs-tab-pad`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),R(`tabs-pad`,`
 border-right: 1px solid var(--n-tab-border-color);
 `)])]),N(`right`,[N(`card-type`,[R(`tabs-scroll-padding`,`border-left: 1px solid var(--n-tab-border-color);`),M(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),R(`tabs-tab`,`
 border-top-right-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[N(`active`,`
 border-left: 1px solid #0000;
 `)]),R(`tabs-tab-pad`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),R(`tabs-pad`,`
 border-left: 1px solid var(--n-tab-border-color);
 `)])]),N(`bottom`,[N(`card-type`,[R(`tabs-scroll-padding`,`border-top: 1px solid var(--n-tab-border-color);`),M(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),R(`tabs-tab`,`
 border-bottom-left-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[N(`active`,`
 border-top: 1px solid #0000;
 `)]),R(`tabs-tab-pad`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),R(`tabs-pad`,`
 border-top: 1px solid var(--n-tab-border-color);
 `)])])])]),at=Ke,ot=Object.assign(Object.assign({},x.props),{value:[String,Number],defaultValue:[String,Number],trigger:{type:String,default:`click`},type:{type:String,default:`bar`},closable:Boolean,justifyContent:String,size:String,placement:{type:String,default:`top`},tabStyle:[String,Object],tabClass:String,addTabStyle:[String,Object],addTabClass:String,barWidth:Number,paneClass:String,paneStyle:[String,Object],paneWrapperClass:String,paneWrapperStyle:[String,Object],addable:[Boolean,Object],tabsPadding:{type:Number,default:0},animated:Boolean,onBeforeLeave:Function,onAdd:Function,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onClose:[Function,Array],labelSize:String,activeName:[String,Number],onActiveNameChange:[Function,Array]}),st=y({name:`Tabs`,props:ot,slots:Object,setup(e,{slots:t}){let{mergedClsPrefixRef:n,inlineThemeDisabled:r,mergedComponentPropsRef:i}=b(e),a=x(`Tabs`,`-tabs`,it,xe,e,n),o=U(null),s=U(null),c=U(null),l=U(null),u=U(null),d=U(null),p=U(!0),m=U(!0),h=le(e,[`labelSize`,`size`]),g=L(()=>h.value?h.value:i?.value?.Tabs?.size||`medium`),y=le(e,[`activeName`,`value`]),C=U(y.value??e.defaultValue??(t.default?X(t.default())[0]?.props?.name:null)),w=me(y,C),ee={id:0},T=L(()=>{if(!(!e.justifyContent||e.type===`card`))return{display:`flex`,justifyContent:e.justifyContent}});se(w,()=>{ee.id=0,A(),j()});function E(){let{value:e}=w;return e===null?null:o.value?.querySelector(`[data-name="${e}"]`)}function D(t){if(e.type===`card`)return;let{value:r}=s;if(!r)return;let i=r.style.opacity===`0`;if(t){let a=`${n.value}-tabs-bar--disabled`,{barWidth:o,placement:s}=e;if(t.dataset.disabled===`true`?r.classList.add(a):r.classList.remove(a),[`top`,`bottom`].includes(s)){if(k([`top`,`maxHeight`,`height`]),typeof o==`number`&&t.offsetWidth>=o){let e=Math.floor((t.offsetWidth-o)/2)+t.offsetLeft;r.style.left=`${e}px`,r.style.maxWidth=`${o}px`}else r.style.left=`${t.offsetLeft}px`,r.style.maxWidth=`${t.offsetWidth}px`;r.style.width=`8192px`,i&&(r.style.transition=`none`),r.offsetWidth,i&&(r.style.transition=``,r.style.opacity=`1`)}else{if(k([`left`,`maxWidth`,`width`]),typeof o==`number`&&t.offsetHeight>=o){let e=Math.floor((t.offsetHeight-o)/2)+t.offsetTop;r.style.top=`${e}px`,r.style.maxHeight=`${o}px`}else r.style.top=`${t.offsetTop}px`,r.style.maxHeight=`${t.offsetHeight}px`;r.style.height=`8192px`,i&&(r.style.transition=`none`),r.offsetHeight,i&&(r.style.transition=``,r.style.opacity=`1`)}}}function O(){if(e.type===`card`)return;let{value:t}=s;t&&(t.style.opacity=`0`)}function k(e){let{value:t}=s;if(t)for(let n of e)t.style[n]=``}function A(){if(e.type===`card`)return;let t=E();t?D(t):O()}function j(){let e=u.value?.$el;if(!e)return;let t=E();if(!t)return;let{scrollLeft:n,offsetWidth:r}=e,{offsetLeft:i,offsetWidth:a}=t;n>i?e.scrollTo({top:0,left:i,behavior:`smooth`}):i+a>n+r&&e.scrollTo({top:0,left:i+a-r,behavior:`smooth`})}let M=U(null),N=0,P=null;function F(e){let t=M.value;if(t){N=e.getBoundingClientRect().height;let n=`${N}px`,r=()=>{t.style.height=n,t.style.maxHeight=n};P?(r(),P(),P=null):P=r}}function te(e){let t=M.value;if(t){let n=e.getBoundingClientRect().height,r=()=>{document.body.offsetHeight,t.style.maxHeight=`${n}px`,t.style.height=`${Math.max(N,n)}px`};P?(P(),P=null,r()):P=r}}function R(){let t=M.value;if(t){t.style.maxHeight=``,t.style.height=``;let{paneWrapperStyle:n}=e;if(typeof n==`string`)t.style.cssText=n;else if(n){let{maxHeight:e,height:r}=n;e!==void 0&&(t.style.maxHeight=e),r!==void 0&&(t.style.height=r)}}}let re={value:[]},B=U(`next`);function V(e){let t=w.value,n=`next`;for(let r of re.value){if(r===t)break;if(r===e){n=`prev`;break}}B.value=n,ae(e)}function ae(t){let{onActiveNameChange:n,onUpdateValue:r,"onUpdate:value":i}=e;n&&_(n,t),r&&_(r,t),i&&_(i,t),C.value=t}function oe(t){let{onClose:n}=e;n&&_(n,t)}let G=!0;function K(){let{value:e}=s;if(!e)return;G||=!1;let t=`transition-disabled`;e.classList.add(t),A(),e.classList.remove(t)}let q=U(null);function ue({transitionDisabled:e}){let t=o.value;if(!t)return;e&&t.classList.add(`transition-disabled`);let n=E();n&&q.value&&(q.value.style.width=`${n.offsetWidth}px`,q.value.style.height=`${n.offsetHeight}px`,q.value.style.transform=`translateX(${n.offsetLeft-ie(getComputedStyle(t).paddingLeft)}px)`,e&&q.value.offsetWidth),e&&t.classList.remove(`transition-disabled`)}se([w],()=>{e.type===`segment`&&S(()=>{ue({transitionDisabled:!1})})}),f(()=>{e.type===`segment`&&ue({transitionDisabled:!0})});let J=0;function de(t){if(t.contentRect.width===0&&t.contentRect.height===0||J===t.contentRect.width)return;J=t.contentRect.width;let{type:n}=e;if((n===`line`||n===`bar`)&&(G||e.justifyContent?.startsWith(`space`))&&K(),n!==`segment`){let{placement:t}=e;_e((t===`top`||t===`bottom`?u.value?.$el:d.value)||null)}}let fe=at(de,64);se([()=>e.justifyContent,()=>e.size],()=>{S(()=>{let{type:t}=e;(t===`line`||t===`bar`)&&K()})});let Y=U(!1);function pe(t){let{target:n,contentRect:{width:r,height:i}}=t,a=n.parentElement.parentElement.offsetWidth,o=n.parentElement.parentElement.offsetHeight,{placement:s}=e;if(!Y.value)s===`top`||s===`bottom`?a<r&&(Y.value=!0):o<i&&(Y.value=!0);else{let{value:e}=l;if(!e)return;s===`top`||s===`bottom`?a-r>e.$el.offsetWidth&&(Y.value=!1):o-i>e.$el.offsetHeight&&(Y.value=!1)}_e(u.value?.$el||null)}let he=at(pe,64);function ge(){let{onAdd:t}=e;t&&t(),S(()=>{let e=E(),{value:t}=u;!e||!t||t.scrollTo({left:e.offsetLeft,top:0,behavior:`smooth`})})}function _e(t){if(!t)return;let{placement:n}=e;if(n===`top`||n===`bottom`){let{scrollLeft:e,scrollWidth:n,offsetWidth:r}=t;p.value=e<=0,m.value=e+r>=n}else{let{scrollTop:e,scrollHeight:n,offsetHeight:r}=t;p.value=e<=0,m.value=e+r>=n}}let ve=at(e=>{_e(e.target)},64);v($e,{triggerRef:H(e,`trigger`),tabStyleRef:H(e,`tabStyle`),tabClassRef:H(e,`tabClass`),addTabStyleRef:H(e,`addTabStyle`),addTabClassRef:H(e,`addTabClass`),paneClassRef:H(e,`paneClass`),paneStyleRef:H(e,`paneStyle`),mergedClsPrefixRef:n,typeRef:H(e,`type`),closableRef:H(e,`closable`),valueRef:w,tabChangeIdRef:ee,onBeforeLeaveRef:H(e,`onBeforeLeave`),activateTab:V,handleClose:oe,handleAdd:ge}),ce(()=>{A(),j()}),ne(()=>{let{value:e}=c;if(!e)return;let{value:t}=n,r=`${t}-tabs-nav-scroll-wrapper--shadow-start`,i=`${t}-tabs-nav-scroll-wrapper--shadow-end`;p.value?e.classList.remove(r):e.classList.add(r),m.value?e.classList.remove(i):e.classList.add(i)});let ye={syncBarPosition:()=>{A()}},be=()=>{ue({transitionDisabled:!0})},Se=L(()=>{let{value:t}=g,{type:n}=e,r=`${t}${{card:`Card`,bar:`Bar`,line:`Line`,segment:`Segment`}[n]}`,{self:{barColor:i,closeIconColor:o,closeIconColorHover:s,closeIconColorPressed:c,tabColor:l,tabBorderColor:u,paneTextColor:d,tabFontWeight:f,tabBorderRadius:p,tabFontWeightActive:m,colorSegment:h,fontWeightStrong:_,tabColorSegment:v,closeSize:y,closeIconSize:b,closeColorHover:x,closeColorPressed:S,closeBorderRadius:C,[z(`panePadding`,t)]:w,[z(`tabPadding`,r)]:ee,[z(`tabPaddingVertical`,r)]:T,[z(`tabGap`,r)]:E,[z(`tabGap`,`${r}Vertical`)]:D,[z(`tabTextColor`,n)]:O,[z(`tabTextColorActive`,n)]:k,[z(`tabTextColorHover`,n)]:A,[z(`tabTextColorDisabled`,n)]:j,[z(`tabFontSize`,t)]:M},common:{cubicBezierEaseInOut:N}}=a.value;return{"--n-bezier":N,"--n-color-segment":h,"--n-bar-color":i,"--n-tab-font-size":M,"--n-tab-text-color":O,"--n-tab-text-color-active":k,"--n-tab-text-color-disabled":j,"--n-tab-text-color-hover":A,"--n-pane-text-color":d,"--n-tab-border-color":u,"--n-tab-border-radius":p,"--n-close-size":y,"--n-close-icon-size":b,"--n-close-color-hover":x,"--n-close-color-pressed":S,"--n-close-border-radius":C,"--n-close-icon-color":o,"--n-close-icon-color-hover":s,"--n-close-icon-color-pressed":c,"--n-tab-color":l,"--n-tab-font-weight":f,"--n-tab-font-weight-active":m,"--n-tab-padding":ee,"--n-tab-padding-vertical":T,"--n-tab-gap":E,"--n-tab-gap-vertical":D,"--n-pane-padding-left":I(w,`left`),"--n-pane-padding-right":I(w,`right`),"--n-pane-padding-top":I(w,`top`),"--n-pane-padding-bottom":I(w,`bottom`),"--n-font-weight-strong":_,"--n-tab-color-segment":v}}),Ce=r?W(`tabs`,L(()=>`${g.value[0]}${e.type[0]}`),Se,e):void 0;return Object.assign({mergedClsPrefix:n,mergedValue:w,renderedNames:new Set,segmentCapsuleElRef:q,tabsPaneWrapperRef:M,tabsElRef:o,barElRef:s,addTabInstRef:l,xScrollInstRef:u,scrollWrapperElRef:c,addTabFixed:Y,tabWrapperStyle:T,handleNavResize:fe,mergedSize:g,handleScroll:ve,handleTabsResize:he,cssVars:r?void 0:Se,themeClass:Ce?.themeClass,animationDirection:B,renderNameListRef:re,yScrollElRef:d,handleSegmentResize:be,onAnimationBeforeLeave:F,onAnimationEnter:te,onAnimationAfterEnter:R,onRender:Ce?.onRender},ye)},render(){let{mergedClsPrefix:e,type:t,placement:i,addTabFixed:a,addable:o,mergedSize:s,renderNameListRef:c,onRender:l,paneWrapperClass:u,paneWrapperStyle:d,$slots:{default:f,prefix:p,suffix:m}}=this;l?.();let h=f?X(f()).filter(e=>e.type.__TAB_PANE__===!0):[],_=f?X(f()).filter(e=>e.type.__TAB__===!0):[],v=!_.length,y=t===`card`,b=t===`segment`,x=!y&&!b&&this.justifyContent;c.value=[];let S=()=>{let t=n(`div`,{style:this.tabWrapperStyle,class:`${e}-tabs-wrapper`},x?null:n(`div`,{class:`${e}-tabs-scroll-padding`,style:i===`top`||i===`bottom`?{width:`${this.tabsPadding}px`}:{height:`${this.tabsPadding}px`}}),v?h.map((e,t)=>(c.value.push(e.props.name),dt(n(rt,Object.assign({},e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0&&(!x||x===`center`||x===`start`||x===`end`)}),e.children?{default:e.children.tab}:void 0)))):_.map((e,t)=>(c.value.push(e.props.name),dt(t!==0&&!x?ut(e):e))),!a&&o&&y?lt(o,(v?h.length:_.length)!==0):null,x?null:n(`div`,{class:`${e}-tabs-scroll-padding`,style:{width:`${this.tabsPadding}px`}}));return n(`div`,{ref:`tabsElRef`,class:`${e}-tabs-nav-scroll-content`},y&&o?n(r,{onResize:this.handleTabsResize},{default:()=>t}):t,y?n(`div`,{class:`${e}-tabs-pad`}):null,y?null:n(`div`,{ref:`barElRef`,class:`${e}-tabs-bar`}))},C=b?`top`:i;return n(`div`,{class:[`${e}-tabs`,this.themeClass,`${e}-tabs--${t}-type`,`${e}-tabs--${s}-size`,x&&`${e}-tabs--flex`,`${e}-tabs--${C}`],style:this.cssVars},n(`div`,{class:[`${e}-tabs-nav--${t}-type`,`${e}-tabs-nav--${C}`,`${e}-tabs-nav`]},g(p,t=>t&&n(`div`,{class:`${e}-tabs-nav__prefix`},t)),b?n(r,{onResize:this.handleSegmentResize},{default:()=>n(`div`,{class:`${e}-tabs-rail`,ref:`tabsElRef`},n(`div`,{class:`${e}-tabs-capsule`,ref:`segmentCapsuleElRef`},n(`div`,{class:`${e}-tabs-wrapper`},n(`div`,{class:`${e}-tabs-tab`}))),v?h.map((e,t)=>(c.value.push(e.props.name),n(rt,Object.assign({},e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0}),e.children?{default:e.children.tab}:void 0))):_.map((e,t)=>(c.value.push(e.props.name),t===0?e:ut(e))))}):n(r,{onResize:this.handleNavResize},{default:()=>n(`div`,{class:`${e}-tabs-nav-scroll-wrapper`,ref:`scrollWrapperElRef`},[`top`,`bottom`].includes(C)?n(Oe,{ref:`xScrollInstRef`,onScroll:this.handleScroll},{default:S}):n(`div`,{class:`${e}-tabs-nav-y-scroll`,onScroll:this.handleScroll,ref:`yScrollElRef`},S()))}),a&&o&&y?lt(o,!0):null,g(m,t=>t&&n(`div`,{class:`${e}-tabs-nav__suffix`},t))),v&&(this.animated&&(C===`top`||C===`bottom`)?n(`div`,{ref:`tabsPaneWrapperRef`,style:d,class:[`${e}-tabs-pane-wrapper`,u]},ct(h,this.mergedValue,this.renderedNames,this.onAnimationBeforeLeave,this.onAnimationEnter,this.onAnimationAfterEnter,this.animationDirection)):ct(h,this.mergedValue,this.renderedNames)))}});function ct(e,t,r,a,o,s,c){let l=[];return e.forEach(e=>{let{name:n,displayDirective:a,"display-directive":o}=e.props,s=e=>a===e||o===e,c=t===n;if(e.key!==void 0&&(e.key=n),c||s(`show`)||s(`show:lazy`)&&r.has(n)){r.has(n)||r.add(n);let t=!s(`if`);l.push(t?ae(e,[[i,c]]):e)}}),c?n(G,{name:`${c}-transition`,onBeforeLeave:a,onEnter:o,onAfterEnter:s},{default:()=>l}):l}function lt(e,t){return n(rt,{ref:`addTabInstRef`,key:`__addable`,name:`__addable`,internalCreatedByPane:!0,internalAddable:!0,internalLeftPadded:t,disabled:typeof e==`object`&&e.disabled})}function ut(e){let n=t(e);return n.props?n.props.internalLeftPadded=!0:n.props={internalLeftPadded:!0},n}function dt(e){return Array.isArray(e.dynamicProps)?e.dynamicProps.includes(`internalLeftPadded`)||e.dynamicProps.push(`internalLeftPadded`):e.dynamicProps=[`internalLeftPadded`],e}var ft={key:1,class:`tab-loading`},pt=V(y({__name:`DockerView`,setup(t){let{t:r}=re(),i=Ce();function s(e){return e instanceof A&&e.status===503&&!!e.body&&typeof e.body==`object`&&`enabled`in e.body}function c(e,t){i.error(e instanceof A?e.message:t)}let l=e=>e===`running`?`success`:e===`paused`||e===`restarting`?`warning`:e===`dead`?`error`:`default`,d={running:0,restarting:1,paused:2,created:3,exited:4,dead:5};function m(e){return d[e.state]??6}function g(e,t){return e.hasStats?t(e.stats):-1}let _=U([]),v=U(!0),y=U(null),b;async function x(){try{let e=await Z.containers();_.value=e.containers,y.value=null}catch(e){s(e)&&(y.value=e.body)}finally{v.value=!1}}async function S(e,t){try{let n=await Z.containerAction(e,t);_.value=n.containers}catch(e){c(e,r(`docker.actionFailed`,{action:t}))}}let C=L(()=>[{title:r(`common.name`),key:`name`,width:160,ellipsis:{tooltip:!0},sorter:(e,t)=>e.name.localeCompare(t.name)},{title:`Image`,key:`image`,width:180,ellipsis:{tooltip:!0},sorter:(e,t)=>e.image.localeCompare(t.image)},{title:`Status`,key:`state`,width:130,sorter:(e,t)=>m(e)-m(t),render:e=>n(be,{type:l(e.state),size:`small`},{default:()=>e.status})},{title:`CPU`,key:`cpu`,width:70,sorter:(e,t)=>g(e,e=>e.cpuPercent)-g(t,e=>e.cpuPercent),render:e=>e.hasStats?`${e.stats.cpuPercent.toFixed(1)}%`:`—`},{title:`RAM`,key:`ram`,width:150,sorter:(e,t)=>g(e,e=>e.memUsageBytes)-g(t,e=>e.memUsageBytes),render:e=>e.hasStats?`${Q(e.stats.memUsageBytes)} / ${Q(e.stats.memLimitBytes)}`:`—`},{title:`Network`,key:`net`,width:140,sorter:(e,t)=>g(e,e=>e.netRxBytes+e.netTxBytes)-g(t,e=>e.netRxBytes+e.netTxBytes),render:e=>e.hasStats?`↓ ${Q(e.stats.netRxBytes)} ↑ ${Q(e.stats.netTxBytes)}`:`—`},{title:`Ports`,key:`ports`,width:220,ellipsis:{tooltip:!0}},{title:r(`common.actions`),key:`actions`,width:220,render:e=>n(we,{size:`small`},()=>[e.state===`running`?[n(D,{size:`tiny`,onClick:()=>S(e.id,`stop`)},()=>`Stop`),n(D,{size:`tiny`,onClick:()=>S(e.id,`restart`)},()=>`Restart`)]:n(D,{size:`tiny`,type:`primary`,onClick:()=>S(e.id,`start`)},()=>`Start`),n(Te,{onPositiveClick:()=>S(e.id,`remove`)},{trigger:()=>n(D,{size:`tiny`,type:`error`,ghost:!0},()=>r(`common.delete`)),default:()=>r(`docker.confirmDeleteContainer`,{name:e.name})})])}]),w=U([]),E=U(!0),O=U(null);async function j(){E.value=!0;try{let e=await Z.images();w.value=e.images,O.value=null}catch(e){s(e)&&(O.value=e.body)}finally{E.value=!1}}async function M(e){try{let t=await Z.removeImage(e);w.value=t.images}catch(e){c(e,r(`docker.removeImageFailed`))}}let N=L(()=>[{title:`Tag`,key:`tag`,minWidth:200,ellipsis:{tooltip:!0},sorter:(e,t)=>e.tag.localeCompare(t.tag),render:e=>e.dangling?n(we,{size:`small`,align:`center`},()=>[e.tag,n(be,{size:`small`,type:`warning`},()=>`dangling`)]):e.tag},{title:r(`common.size`),key:`sizeBytes`,width:110,sorter:(e,t)=>e.sizeBytes-t.sizeBytes,render:e=>Q(e.sizeBytes)},{title:r(`docker.usedColumn`),key:`containers`,width:140,sorter:(e,t)=>e.containers-t.containers,render:e=>e.containers<0?`—`:e.containers===0?r(`docker.notUsed`):r(`docker.containerCount`,{count:e.containers})},{title:r(`docker.created`),key:`created`,width:150,sorter:(e,t)=>Date.parse(e.created)-Date.parse(t.created),render:e=>Ee(e.created)},{title:r(`common.actions`),key:`actions`,width:100,render:e=>n(Te,{onPositiveClick:()=>M(e.id)},{trigger:()=>n(D,{size:`tiny`,type:`error`,ghost:!0},()=>r(`common.delete`)),default:()=>r(`docker.confirmDeleteImage`,{tag:e.tag})})}]),P=U([]),te=U(!0),I=U(null);async function ne(){te.value=!0;try{let e=await Z.volumes();P.value=e.volumes,I.value=null}catch(e){s(e)&&(I.value=e.body)}finally{te.value=!1}}async function R(e){try{let t=await Z.removeVolume(e);P.value=t.volumes}catch(e){c(e,r(`docker.removeVolumeFailed`))}}let z=L(()=>[{title:r(`common.name`),key:`name`,minWidth:180,ellipsis:{tooltip:!0},sorter:(e,t)=>e.name.localeCompare(t.name)},{title:`Driver`,key:`driver`,width:100,sorter:(e,t)=>e.driver.localeCompare(t.driver)},{title:r(`common.size`),key:`sizeBytes`,width:110,sorter:(e,t)=>e.sizeBytes-t.sizeBytes,render:e=>e.sizeBytes<0?r(`docker.unknown`):Q(e.sizeBytes)},{title:`Status`,key:`inUse`,width:120,sorter:(e,t)=>Number(e.inUse)-Number(t.inUse),render:e=>n(be,{size:`small`,type:e.inUse?`success`:`default`},()=>e.inUse?r(`docker.used`):r(`docker.notUsed`))},{title:r(`common.actions`),key:`actions`,width:100,render:e=>n(Te,{onPositiveClick:()=>R(e.name)},{trigger:()=>n(D,{size:`tiny`,type:`error`,ghost:!0},()=>r(`common.delete`)),default:()=>r(`docker.confirmDeleteVolume`,{name:e.name})})}]),B=U([]),ie=U(!0),V=U(null);async function ae(){ie.value=!0;try{let e=await Z.networks();B.value=e.networks,V.value=null}catch(e){s(e)&&(V.value=e.body)}finally{ie.value=!1}}async function oe(e){try{let t=await Z.removeNetwork(e);B.value=t.networks}catch(e){c(e,r(`docker.removeNetworkFailed`))}}let H=L(()=>[{title:r(`common.name`),key:`name`,minWidth:160,ellipsis:{tooltip:!0},sorter:(e,t)=>e.name.localeCompare(t.name),render:e=>e.builtin?n(we,{size:`small`,align:`center`},()=>[e.name,n(be,{size:`small`},()=>`builtin`)]):e.name},{title:`Driver`,key:`driver`,width:100,sorter:(e,t)=>e.driver.localeCompare(t.driver)},{title:`Subnet`,key:`subnet`,width:150,sorter:(e,t)=>e.subnet.localeCompare(t.subnet),render:e=>e.subnet||`—`},{title:r(`docker.connectedContainers`),key:`connectedCount`,width:170,sorter:(e,t)=>e.connectedCount-t.connectedCount},{title:r(`common.actions`),key:`actions`,width:100,render:e=>e.builtin?null:n(Te,{onPositiveClick:()=>oe(e.id)},{trigger:()=>n(D,{size:`tiny`,type:`error`,ghost:!0},()=>r(`common.delete`)),default:()=>r(`docker.confirmDeleteNetwork`,{name:e.name})})}]),W=U(null),G=U(!0),K=U(null),ce=U(null);async function le(){G.value=!0;try{W.value=await Z.settings(),K.value=null}catch(e){s(e)&&(K.value=e.body)}finally{G.value=!1}}async function ue(e){ce.value=e;try{W.value=await Z.prune(e),i.success(r(`docker.cleanupDone`))}catch(t){c(t,r(`docker.cleanupFailed`,{kind:e}))}finally{ce.value=null}}let J=U(`containers`),X=new Set([`containers`]);return se(J,e=>{X.has(e)||(X.add(e),e===`images`?j():e===`volumes`?ne():e===`networks`?ae():e===`settings`&&le())}),f(()=>{x(),b=setInterval(x,5e3)}),ee(()=>{b&&clearInterval(b)}),(t,n)=>(T(),h(de,null,{default:k(()=>[p(F(st),{type:`line`,value:J.value,"onUpdate:value":n[0]||=e=>J.value=e},{default:k(()=>[p(F(tt),{name:`containers`,tab:`Containers`},{default:k(()=>[y.value?(T(),h(F(he),{key:0,type:`warning`,title:y.value.error},null,8,[`title`])):(T(),h(F(pe),{key:1,columns:C.value,data:_.value,loading:v.value,"row-key":e=>e.id,"scroll-x":1200},null,8,[`columns`,`data`,`loading`,`row-key`]))]),_:1}),p(F(tt),{name:`images`,tab:`Images`},{default:k(()=>[O.value?(T(),h(F(he),{key:0,type:`warning`,title:O.value.error},null,8,[`title`])):(T(),h(F(pe),{key:1,columns:N.value,data:w.value,loading:E.value,"row-key":e=>e.id,"scroll-x":700},null,8,[`columns`,`data`,`loading`,`row-key`]))]),_:1}),p(F(tt),{name:`volumes`,tab:`Volumes`},{default:k(()=>[I.value?(T(),h(F(he),{key:0,type:`warning`,title:I.value.error},null,8,[`title`])):(T(),h(F(pe),{key:1,columns:z.value,data:P.value,loading:te.value,"row-key":e=>e.name,"scroll-x":610},null,8,[`columns`,`data`,`loading`,`row-key`]))]),_:1}),p(F(tt),{name:`networks`,tab:`Networks`},{default:k(()=>[V.value?(T(),h(F(he),{key:0,type:`warning`,title:V.value.error},null,8,[`title`])):(T(),h(F(pe),{key:1,columns:H.value,data:B.value,loading:ie.value,"row-key":e=>e.id,"scroll-x":680},null,8,[`columns`,`data`,`loading`,`row-key`]))]),_:1}),p(F(tt),{name:`settings`,tab:`Settings`},{default:k(()=>[K.value?(T(),h(F(he),{key:0,type:`warning`,title:K.value.error},null,8,[`title`])):G.value&&!W.value?(T(),o(`div`,ft,[p(F(fe),{size:`large`})])):W.value?(T(),h(F(we),{key:3,vertical:``,size:24},{default:k(()=>[p(F(Ze),{title:F(r)(`docker.daemonInfo`),column:2,bordered:``,"label-placement":`left`},{default:k(()=>[p(F($),{label:F(r)(`docker.serverVersion`)},{default:k(()=>[u(q(W.value?.info.serverVersion),1)]),_:1},8,[`label`]),p(F($),{label:`OS / Kernel`},{default:k(()=>[u(q(W.value?.info.operatingSystem)+` / `+q(W.value?.info.kernelVersion),1)]),_:1}),p(F($),{label:`Storage Driver`},{default:k(()=>[u(q(W.value?.info.storageDriver),1)]),_:1}),p(F($),{label:`Root Dir`},{default:k(()=>[u(q(W.value?.info.dockerRootDir),1)]),_:1}),p(F($),{label:`Container`},{default:k(()=>[u(q(W.value?.info.containersRunning)+` running, `+q(W.value?.info.containersPaused)+` paused, `+q(W.value?.info.containersStopped)+` stopped `,1)]),_:1}),p(F($),{label:`Images`},{default:k(()=>[u(q(W.value?.info.images),1)]),_:1})]),_:1},8,[`title`]),p(F(Ze),{title:`Disk Usage`,column:2,bordered:``,"label-placement":`left`},{default:k(()=>[p(F($),{label:`Images`},{default:k(()=>[u(q(F(Q)(W.value?.diskUsage.imagesTotalBytes??0))+` (reclaimable `+q(F(Q)(W.value?.diskUsage.imagesReclaimableBytes??0))+`) `,1)]),_:1}),p(F($),{label:`Containers`},{default:k(()=>[u(q(F(Q)(W.value?.diskUsage.containersTotalBytes??0)),1)]),_:1}),p(F($),{label:`Volumes`},{default:k(()=>[u(q(F(Q)(W.value?.diskUsage.volumesTotalBytes??0))+` (reclaimable `+q(F(Q)(W.value?.diskUsage.volumesReclaimableBytes??0))+`) `,1)]),_:1})]),_:1}),p(F(we),null,{default:k(()=>[(T(),o(a,null,e([`containers`,`images`,`volumes`,`networks`,`all`],e=>p(F(Te),{key:e,onPositiveClick:t=>ue(e)},{trigger:k(()=>[p(F(D),{size:`small`,loading:ce.value===e},{default:k(()=>[u(q(F(r)(`docker.cleanup`))+` `+q(e),1)]),_:2},1032,[`loading`])]),default:k(()=>[u(` `+q(F(r)(`docker.confirmCleanup`,{kind:e})),1)]),_:2},1032,[`onPositiveClick`])),64))]),_:1})]),_:1})):(T(),h(F(Y),{key:2,description:F(r)(`docker.noData`)},null,8,[`description`]))]),_:1})]),_:1},8,[`value`])]),_:1}))}}),[[`__scopeId`,`data-v-f59f7e6d`]]);export{pt as default};