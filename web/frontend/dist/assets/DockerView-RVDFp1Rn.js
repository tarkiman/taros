import{$n as e,An as t,Bn as n,Bt as r,Cn as i,Dn as a,Fn as o,Gt as s,Hn as c,Ht as l,In as u,It as d,Kn as f,Ln as p,Mn as m,N as h,Nn as g,Nt as _,Pn as v,Pt as y,Qn as b,Rn as x,Tt as S,U as C,Un as w,V as T,Vn as E,Xn as ee,Yn as te,Zt as D,_ as O,_r as k,_t as A,ar as j,br as M,c as N,cn as P,d as F,dn as I,dr as L,er as R,fn as z,gn as ne,h as B,hn as V,i as re,in as ie,ir as H,jn as U,ln as W,m as ae,mn as G,mr as K,mt as q,nn as oe,nr as se,o as ce,or as J,pn as le,sr as ue,tr as de,vr as fe,wn as pe,wt as me,xn as he,xt as ge}from"./auth-DMRQX4m_.js";import{T as _e,_ as ve,f as ye,l as be,t as xe,v as Se,w as Ce}from"./AppShell-b1lonom2.js";import{a as we,r as Te,t as Ee}from"./Select-B3SubMTj.js";import{u as De}from"./useTheme-B0dOq6U-.js";import{t as Oe}from"./Modal-BlJQ-MhV.js";import{c as ke,n as Y}from"./LocaleSwitcher-qh_c9vyJ.js";import{t as Ae}from"./DataTable-CzP2_Ttq.js";import{n as je}from"./fade-in-scale-up.cssr-QWxWPrO2.js";import{t as Me}from"./get-slot-6kXJmSMP.js";import{t as Ne}from"./omit-C4pE9leG.js";import{t as Pe}from"./Input-tZhefikb.js";import{t as Fe}from"./Add-Ux3GYy06.js";import{t as Ie}from"./Checkbox-QNkXddFT.js";import{i as Le,r as Re,t as X}from"./play-8uuaKkR1.js";import{t as ze}from"./use-message-g_fSnJ3K.js";import{n as Be,t as Ve}from"./DrawerContent-DtPn_HBY.js";import{t as He}from"./Space-B6XB3Fek.js";import{t as Ue}from"./Popconfirm-6Z-6_3Go.js";import{n as We,r as Ge,t as Ke}from"./copy-BbZif9p6.js";import{a as qe,r as Je,t as Ye}from"./inputProps-C-BwJukl.js";import{t as Xe}from"./trash-2-CylMNNPm.js";import{t as Ze}from"./x-AkTYUIbD.js";import{i as Qe,n as $e,t as Z}from"./docker-DnAJILqG.js";import{n as et,t as Q}from"./format-BxLcbkc3.js";var tt=ve(`.v-x-scroll`,{overflow:`auto`,scrollbarWidth:`none`},[ve(`&::-webkit-scrollbar`,{width:0,height:0})]),nt=x({name:`XScroll`,props:{disabled:Boolean,onScroll:Function},setup(){let e=L(null);function t(e){!(e.currentTarget.offsetWidth<e.currentTarget.scrollWidth)||e.deltaY===0||(e.currentTarget.scrollLeft+=e.deltaY+e.deltaX,e.preventDefault())}let n=l();return tt.mount({id:`vueuc/x-scroll`,head:!0,anchorMetaName:Se,ssr:n}),Object.assign({selfRef:e,handleWheel:t},{scrollTo(...t){var n;(n=e.value)==null||n.scrollTo(...t)}})},render(){return n(`div`,{ref:`selfRef`,onScroll:this.onScroll,onWheel:this.disabled?void 0:this.handleWheel,class:`v-x-scroll`},this.$slots)}});function rt(e,t=`default`,n=[]){let{children:r}=e;if(typeof r==`object`&&r&&!Array.isArray(r)){let e=r[t];if(typeof e==`function`)return e()}return n}var it=/\s/;function at(e){for(var t=e.length;t--&&it.test(e.charAt(t)););return t}var ot=/^\s+/;function st(e){return e&&e.slice(0,at(e)+1).replace(ot,``)}var ct=NaN,lt=/^[-+]0x[0-9a-f]+$/i,ut=/^0b[01]+$/i,dt=/^0o[0-7]+$/i,ft=parseInt;function pt(e){if(typeof e==`number`)return e;if(A(e))return ct;if(q(e)){var t=typeof e.valueOf==`function`?e.valueOf():e;e=q(t)?t+``:t}if(typeof e!=`string`)return e===0?e:+e;e=st(e);var n=ut.test(e);return n||dt.test(e)?ft(e.slice(2),n?2:8):lt.test(e)?ct:+e}var mt=function(){return ge.Date.now()},ht=`Expected a function`,gt=Math.max,_t=Math.min;function vt(e,t,n){var r,i,a,o,s,c,l=0,u=!1,d=!1,f=!0;if(typeof e!=`function`)throw TypeError(ht);t=pt(t)||0,q(n)&&(u=!!n.leading,d=`maxWait`in n,a=d?gt(pt(n.maxWait)||0,t):a,f=`trailing`in n?!!n.trailing:f);function p(t){var n=r,a=i;return r=i=void 0,l=t,o=e.apply(a,n),o}function m(e){return l=e,s=setTimeout(_,t),u?p(e):o}function h(e){var n=e-c,r=e-l,i=t-n;return d?_t(i,a-r):i}function g(e){var n=e-c,r=e-l;return c===void 0||n>=t||n<0||d&&r>=a}function _(){var e=mt();if(g(e))return v(e);s=setTimeout(_,h(e))}function v(e){return s=void 0,f&&r?p(e):(r=i=void 0,o)}function y(){s!==void 0&&clearTimeout(s),l=0,r=c=i=s=void 0}function b(){return s===void 0?o:v(mt())}function x(){var e=mt(),n=g(e);if(r=arguments,i=this,c=e,n){if(s===void 0)return m(c);if(d)return clearTimeout(s),s=setTimeout(_,t),p(c)}return s===void 0&&(s=setTimeout(_,t)),o}return x.cancel=y,x.flush=b,x}var yt=`Expected a function`;function bt(e,t,n){var r=!0,i=!0;if(typeof e!=`function`)throw TypeError(yt);return q(n)&&(r=`leading`in n?!!n.leading:r,i=`trailing`in n?!!n.trailing:i),vt(e,t,{leading:r,maxWait:t,trailing:i})}var xt=P([W(`descriptions`,{fontSize:`var(--n-font-size)`},[W(`descriptions-separator`,`
 display: inline-block;
 margin: 0 8px 0 2px;
 `),W(`descriptions-table-wrapper`,[W(`descriptions-table`,[W(`descriptions-table-row`,[W(`descriptions-table-header`,{padding:`var(--n-th-padding)`}),W(`descriptions-table-content`,{padding:`var(--n-td-padding)`})])])]),le(`bordered`,[W(`descriptions-table-wrapper`,[W(`descriptions-table`,[W(`descriptions-table-row`,[P(`&:last-child`,[W(`descriptions-table-content`,{paddingBottom:0})])])])])]),z(`left-label-placement`,[W(`descriptions-table-content`,[P(`> *`,{verticalAlign:`top`})])]),z(`left-label-align`,[P(`th`,{textAlign:`left`})]),z(`center-label-align`,[P(`th`,{textAlign:`center`})]),z(`right-label-align`,[P(`th`,{textAlign:`right`})]),z(`bordered`,[W(`descriptions-table-wrapper`,`
 border-radius: var(--n-border-radius);
 overflow: hidden;
 background: var(--n-merged-td-color);
 border: 1px solid var(--n-merged-border-color);
 `,[W(`descriptions-table`,[W(`descriptions-table-row`,[P(`&:not(:last-child)`,[W(`descriptions-table-content`,{borderBottom:`1px solid var(--n-merged-border-color)`}),W(`descriptions-table-header`,{borderBottom:`1px solid var(--n-merged-border-color)`})]),W(`descriptions-table-header`,`
 font-weight: 400;
 background-clip: padding-box;
 background-color: var(--n-merged-th-color);
 `,[P(`&:not(:last-child)`,{borderRight:`1px solid var(--n-merged-border-color)`})]),W(`descriptions-table-content`,[P(`&:not(:last-child)`,{borderRight:`1px solid var(--n-merged-border-color)`})])])])])]),W(`descriptions-header`,`
 font-weight: var(--n-th-font-weight);
 font-size: 18px;
 transition: color .3s var(--n-bezier);
 line-height: var(--n-line-height);
 margin-bottom: 16px;
 color: var(--n-title-text-color);
 `),W(`descriptions-table-wrapper`,`
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[W(`descriptions-table`,`
 width: 100%;
 border-collapse: separate;
 border-spacing: 0;
 box-sizing: border-box;
 `,[W(`descriptions-table-row`,`
 box-sizing: border-box;
 transition: border-color .3s var(--n-bezier);
 `,[W(`descriptions-table-header`,`
 font-weight: var(--n-th-font-weight);
 line-height: var(--n-line-height);
 display: table-cell;
 box-sizing: border-box;
 color: var(--n-th-text-color);
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `),W(`descriptions-table-content`,`
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
 `)])])])]),W(`descriptions-table-wrapper`,`
 --n-merged-th-color: var(--n-th-color);
 --n-merged-td-color: var(--n-td-color);
 --n-merged-border-color: var(--n-border-color);
 `),V(W(`descriptions-table-wrapper`,`
 --n-merged-th-color: var(--n-th-color-modal);
 --n-merged-td-color: var(--n-td-color-modal);
 --n-merged-border-color: var(--n-border-color-modal);
 `)),ne(W(`descriptions-table-wrapper`,`
 --n-merged-th-color: var(--n-th-color-popover);
 --n-merged-td-color: var(--n-td-color-popover);
 --n-merged-border-color: var(--n-border-color-popover);
 `))]),St=`DESCRIPTION_ITEM_FLAG`;function Ct(e){return typeof e==`object`&&e&&!Array.isArray(e)?e.type&&e.type.DESCRIPTION_ITEM_FLAG:!1}var wt=Object.assign(Object.assign({},C.props),{title:String,column:{type:Number,default:3},columns:Number,labelPlacement:{type:String,default:`top`},labelAlign:{type:String,default:`left`},separator:{type:String,default:`:`},size:String,bordered:Boolean,labelClass:String,labelStyle:[Object,String],contentClass:String,contentStyle:[Object,String]}),Tt=x({name:`Descriptions`,props:wt,slots:Object,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n,mergedComponentPropsRef:r}=S(e),i=U(()=>e.size||r?.value?.Descriptions?.size||`medium`),a=C(`Descriptions`,`-descriptions`,xt,Le,e,t),o=U(()=>{let{bordered:t}=e,n=i.value,{common:{cubicBezierEaseInOut:r},self:{titleTextColor:o,thColor:s,thColorModal:c,thColorPopover:l,thTextColor:u,thFontWeight:d,tdTextColor:f,tdColor:p,tdColorModal:m,tdColorPopover:h,borderColor:g,borderColorModal:_,borderColorPopover:v,borderRadius:y,lineHeight:b,[G(`fontSize`,n)]:x,[G(t?`thPaddingBordered`:`thPadding`,n)]:S,[G(t?`tdPaddingBordered`:`tdPadding`,n)]:C}}=a.value;return{"--n-title-text-color":o,"--n-th-padding":S,"--n-td-padding":C,"--n-font-size":x,"--n-bezier":r,"--n-th-font-weight":d,"--n-line-height":b,"--n-th-text-color":u,"--n-td-text-color":f,"--n-th-color":s,"--n-th-color-modal":c,"--n-th-color-popover":l,"--n-td-color":p,"--n-td-color-modal":m,"--n-td-color-popover":h,"--n-border-radius":y,"--n-border-color":g,"--n-border-color-modal":_,"--n-border-color-popover":v}}),s=n?me(`descriptions`,U(()=>{let t=``,{bordered:n}=e;return n&&(t+=`a`),t+=i.value[0],t}),o,e):void 0;return{mergedClsPrefix:t,cssVars:n?void 0:o,themeClass:s?.themeClass,onRender:s?.onRender,compitableColumn:Ce(e,[`columns`,`column`]),inlineThemeDisabled:n,mergedSize:i}},render(){let e=this.$slots.default,t=e?De(e()):[];t.length;let{contentClass:r,labelClass:i,compitableColumn:a,labelPlacement:o,labelAlign:s,mergedSize:c,bordered:l,title:u,cssVars:d,mergedClsPrefix:f,separator:p,onRender:m}=this;m?.();let h=t.filter(e=>Ct(e)),g=h.reduce((e,t,s)=>{let c=t.props||{},u=h.length-1===s,d=[`label`in c?c.label:rt(t,`label`)],m=[rt(t)],g=c.span||1,_=e.span;e.span+=g;let v=c.labelStyle||c[`label-style`]||this.labelStyle,y=c.contentStyle||c[`content-style`]||this.contentStyle;if(o===`left`)l?e.row.push(n(`th`,{class:[`${f}-descriptions-table-header`,i],colspan:1,style:v},d),n(`td`,{class:[`${f}-descriptions-table-content`,r],colspan:u?(a-_)*2+1:g*2-1,style:y},m)):e.row.push(n(`td`,{class:`${f}-descriptions-table-content`,colspan:u?(a-_)*2:g*2},n(`span`,{class:[`${f}-descriptions-table-content__label`,i],style:v},[...d,p&&n(`span`,{class:`${f}-descriptions-separator`},p)]),n(`span`,{class:[`${f}-descriptions-table-content__content`,r],style:y},m)));else{let t=u?(a-_)*2:g*2;e.row.push(n(`th`,{class:[`${f}-descriptions-table-header`,i],colspan:t,style:v},d)),e.secondRow.push(n(`td`,{class:[`${f}-descriptions-table-content`,r],colspan:t,style:y},m))}return(e.span>=a||u)&&(e.span=0,e.row.length&&(e.rows.push(e.row),e.row=[]),o!==`left`&&e.secondRow.length&&(e.rows.push(e.secondRow),e.secondRow=[])),e},{span:0,row:[],secondRow:[],rows:[]}).rows.map(e=>n(`tr`,{class:`${f}-descriptions-table-row`},e));return n(`div`,{style:d,class:[`${f}-descriptions`,this.themeClass,`${f}-descriptions--${o}-label-placement`,`${f}-descriptions--${s}-label-align`,`${f}-descriptions--${c}-size`,l&&`${f}-descriptions--bordered`]},u||this.$slots.header?n(`div`,{class:`${f}-descriptions-header`},u||Me(this,`header`)):null,n(`div`,{class:`${f}-descriptions-table-wrapper`},n(`table`,{class:`${f}-descriptions-table`},n(`tbody`,null,o===`top`&&n(`tr`,{class:`${f}-descriptions-table-row`,style:{visibility:`collapse`}},D(a*2,n(`td`,null))),g))))}}),Et={label:String,span:{type:Number,default:1},labelClass:String,labelStyle:[Object,String],contentClass:String,contentStyle:[Object,String]},$=x({name:`DescriptionsItem`,[St]:!0,props:Et,slots:Object,render(){return null}}),Dt=s(`n-tabs`),Ot={tab:[String,Number,Object,Function],name:{type:[String,Number],required:!0},disabled:Boolean,displayDirective:{type:String,default:`if`},closable:{type:Boolean,default:void 0},tabProps:Object,label:[String,Number,Object,Function]},kt=x({__TAB_PANE__:!0,name:`TabPane`,alias:[`TabPanel`],props:Ot,slots:Object,setup(e){let t=E(Dt,null);return t||d(`tab-pane`,"`n-tab-pane` must be placed inside `n-tabs`."),{style:t.paneStyleRef,class:t.paneClassRef,mergedClsPrefix:t.mergedClsPrefixRef}},render(){return n(`div`,{class:[`${this.mergedClsPrefix}-tab-pane`,this.class],style:this.style},this.$slots)}}),At=Object.assign({internalLeftPadded:Boolean,internalAddable:Boolean,internalCreatedByPane:Boolean},Ne(Ot,[`displayDirective`])),jt=x({__TAB__:!0,inheritAttrs:!1,name:`Tab`,props:At,setup(e){let{mergedClsPrefixRef:t,valueRef:n,typeRef:r,closableRef:i,tabStyleRef:a,addTabStyleRef:o,tabClassRef:s,addTabClassRef:c,tabChangeIdRef:l,onBeforeLeaveRef:u,triggerRef:d,handleAdd:f,activateTab:p,handleClose:m}=E(Dt);return{trigger:d,mergedClosable:U(()=>{if(e.internalAddable)return!1;let{closable:t}=e;return t===void 0?i.value:t}),style:a,addStyle:o,tabClass:s,addTabClass:c,clsPrefix:t,value:n,type:r,handleClose(t){t.stopPropagation(),!e.disabled&&m(e.name)},activateTab(){if(e.disabled)return;if(e.internalAddable){f();return}let{name:t}=e,r=++l.id;if(t!==n.value){let{value:i}=u;i?Promise.resolve(i(e.name,n.value)).then(e=>{e&&l.id===r&&p(t)}):p(t)}}}},render(){let{internalAddable:e,clsPrefix:t,name:r,disabled:i,label:o,tab:s,value:l,mergedClosable:u,trigger:d,$slots:{default:f}}=this,p=o??s;return n(`div`,{class:`${t}-tabs-tab-wrapper`},this.internalLeftPadded?n(`div`,{class:`${t}-tabs-tab-pad`}):null,n(`div`,Object.assign({key:r,"data-name":r,"data-disabled":i?!0:void 0},c({class:[`${t}-tabs-tab`,l===r&&`${t}-tabs-tab--active`,i&&`${t}-tabs-tab--disabled`,u&&`${t}-tabs-tab--closable`,e&&`${t}-tabs-tab--addable`,e?this.addTabClass:this.tabClass],onClick:d===`click`?this.activateTab:void 0,onMouseenter:d===`hover`?this.activateTab:void 0,style:e?this.addStyle:this.style},this.internalCreatedByPane?this.tabProps||{}:this.$attrs)),n(`span`,{class:`${t}-tabs-tab__label`},e?n(a,null,n(`div`,{class:`${t}-tabs-tab__height-placeholder`},`\xA0`),n(T,{clsPrefix:t},{default:()=>n(Fe,null)})):f?f():typeof p==`object`?p:je(p??r)),u&&this.type===`card`?n(h,{clsPrefix:t,class:`${t}-tabs-tab__close`,onClick:this.handleClose,disabled:i}):null))}}),Mt=W(`tabs`,`
 box-sizing: border-box;
 width: 100%;
 display: flex;
 flex-direction: column;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
`,[z(`segment-type`,[W(`tabs-rail`,[P(`&.transition-disabled`,[W(`tabs-capsule`,`
 transition: none;
 `)])])]),z(`top`,[W(`tab-pane`,`
 padding: var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left);
 `)]),z(`left`,[W(`tab-pane`,`
 padding: var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left) var(--n-pane-padding-top);
 `)]),z(`left, right`,`
 flex-direction: row;
 `,[W(`tabs-bar`,`
 width: 2px;
 right: 0;
 transition:
 top .2s var(--n-bezier),
 max-height .2s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `),W(`tabs-tab`,`
 padding: var(--n-tab-padding-vertical); 
 `)]),z(`right`,`
 flex-direction: row-reverse;
 `,[W(`tab-pane`,`
 padding: var(--n-pane-padding-left) var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom);
 `),W(`tabs-bar`,`
 left: 0;
 `)]),z(`bottom`,`
 flex-direction: column-reverse;
 justify-content: flex-end;
 `,[W(`tab-pane`,`
 padding: var(--n-pane-padding-bottom) var(--n-pane-padding-right) var(--n-pane-padding-top) var(--n-pane-padding-left);
 `),W(`tabs-bar`,`
 top: 0;
 `)]),W(`tabs-rail`,`
 position: relative;
 padding: 3px;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 background-color: var(--n-color-segment);
 transition: background-color .3s var(--n-bezier);
 display: flex;
 align-items: center;
 `,[W(`tabs-capsule`,`
 border-radius: var(--n-tab-border-radius);
 position: absolute;
 pointer-events: none;
 background-color: var(--n-tab-color-segment);
 box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .08);
 transition: transform 0.3s var(--n-bezier);
 `),W(`tabs-tab-wrapper`,`
 flex-basis: 0;
 flex-grow: 1;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[W(`tabs-tab`,`
 overflow: hidden;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[z(`active`,`
 font-weight: var(--n-font-weight-strong);
 color: var(--n-tab-text-color-active);
 `),P(`&:hover`,`
 color: var(--n-tab-text-color-hover);
 `)])])]),z(`flex`,[W(`tabs-nav`,`
 width: 100%;
 position: relative;
 `,[W(`tabs-wrapper`,`
 width: 100%;
 `,[W(`tabs-tab`,`
 margin-right: 0;
 `)])])]),W(`tabs-nav`,`
 box-sizing: border-box;
 line-height: 1.5;
 display: flex;
 transition: border-color .3s var(--n-bezier);
 `,[I(`prefix, suffix`,`
 display: flex;
 align-items: center;
 `),I(`prefix`,`padding-right: 16px;`),I(`suffix`,`padding-left: 16px;`)]),z(`top, bottom`,[P(`>`,[W(`tabs-nav`,[W(`tabs-nav-scroll-wrapper`,[P(`&::before`,`
 top: 0;
 bottom: 0;
 left: 0;
 width: 20px;
 `),P(`&::after`,`
 top: 0;
 bottom: 0;
 right: 0;
 width: 20px;
 `),z(`shadow-start`,[P(`&::before`,`
 box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, .12);
 `)]),z(`shadow-end`,[P(`&::after`,`
 box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),z(`left, right`,[W(`tabs-nav-scroll-content`,`
 flex-direction: column;
 `),P(`>`,[W(`tabs-nav`,[W(`tabs-nav-scroll-wrapper`,[P(`&::before`,`
 top: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),P(`&::after`,`
 bottom: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),z(`shadow-start`,[P(`&::before`,`
 box-shadow: inset 0 10px 8px -8px rgba(0, 0, 0, .12);
 `)]),z(`shadow-end`,[P(`&::after`,`
 box-shadow: inset 0 -10px 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),W(`tabs-nav-scroll-wrapper`,`
 flex: 1;
 position: relative;
 overflow: hidden;
 `,[W(`tabs-nav-y-scroll`,`
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
 `)]),W(`tabs-nav-scroll-content`,`
 display: flex;
 position: relative;
 min-width: 100%;
 min-height: 100%;
 width: fit-content;
 box-sizing: border-box;
 `),W(`tabs-wrapper`,`
 display: inline-flex;
 flex-wrap: nowrap;
 position: relative;
 `),W(`tabs-tab-wrapper`,`
 display: flex;
 flex-wrap: nowrap;
 flex-shrink: 0;
 flex-grow: 0;
 `),W(`tabs-tab`,`
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
 `,[z(`disabled`,{cursor:`not-allowed`}),I(`close`,`
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),I(`label`,`
 display: flex;
 align-items: center;
 z-index: 1;
 `)]),W(`tabs-bar`,`
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
 `),z(`disabled`,`
 background-color: var(--n-tab-text-color-disabled)
 `)]),W(`tabs-pane-wrapper`,`
 position: relative;
 overflow: hidden;
 transition: max-height .2s var(--n-bezier);
 `),W(`tab-pane`,`
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
 `)]),W(`tabs-tab-pad`,`
 box-sizing: border-box;
 width: var(--n-tab-gap);
 flex-grow: 0;
 flex-shrink: 0;
 `),z(`line-type, bar-type`,[W(`tabs-tab`,`
 font-weight: var(--n-tab-font-weight);
 box-sizing: border-box;
 vertical-align: bottom;
 `,[P(`&:hover`,{color:`var(--n-tab-text-color-hover)`}),z(`active`,`
 color: var(--n-tab-text-color-active);
 font-weight: var(--n-tab-font-weight-active);
 `),z(`disabled`,{color:`var(--n-tab-text-color-disabled)`})])]),W(`tabs-nav`,[z(`line-type`,[z(`top`,[I(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),W(`tabs-nav-scroll-content`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),W(`tabs-bar`,`
 bottom: -1px;
 `)]),z(`left`,[I(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),W(`tabs-nav-scroll-content`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),W(`tabs-bar`,`
 right: -1px;
 `)]),z(`right`,[I(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),W(`tabs-nav-scroll-content`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),W(`tabs-bar`,`
 left: -1px;
 `)]),z(`bottom`,[I(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),W(`tabs-nav-scroll-content`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),W(`tabs-bar`,`
 top: -1px;
 `)]),I(`prefix, suffix`,`
 transition: border-color .3s var(--n-bezier);
 `),W(`tabs-nav-scroll-content`,`
 transition: border-color .3s var(--n-bezier);
 `),W(`tabs-bar`,`
 border-radius: 0;
 `)]),z(`card-type`,[I(`prefix, suffix`,`
 transition: border-color .3s var(--n-bezier);
 `),W(`tabs-pad`,`
 flex-grow: 1;
 transition: border-color .3s var(--n-bezier);
 `),W(`tabs-tab-pad`,`
 transition: border-color .3s var(--n-bezier);
 `),W(`tabs-tab`,`
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
 `,[I(`height-placeholder`,`
 width: 0;
 font-size: var(--n-tab-font-size);
 `),le(`disabled`,[P(`&:hover`,`
 color: var(--n-tab-text-color-hover);
 `)])]),z(`closable`,`padding-right: 8px;`),z(`active`,`
 background-color: #0000;
 font-weight: var(--n-tab-font-weight-active);
 color: var(--n-tab-text-color-active);
 `),z(`disabled`,`color: var(--n-tab-text-color-disabled);`)])]),z(`left, right`,`
 flex-direction: column; 
 `,[I(`prefix, suffix`,`
 padding: var(--n-tab-padding-vertical);
 `),W(`tabs-wrapper`,`
 flex-direction: column;
 `),W(`tabs-tab-wrapper`,`
 flex-direction: column;
 `,[W(`tabs-tab-pad`,`
 height: var(--n-tab-gap-vertical);
 width: 100%;
 `)])]),z(`top`,[z(`card-type`,[W(`tabs-scroll-padding`,`border-bottom: 1px solid var(--n-tab-border-color);`),I(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),W(`tabs-tab`,`
 border-top-left-radius: var(--n-tab-border-radius);
 border-top-right-radius: var(--n-tab-border-radius);
 `,[z(`active`,`
 border-bottom: 1px solid #0000;
 `)]),W(`tabs-tab-pad`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),W(`tabs-pad`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `)])]),z(`left`,[z(`card-type`,[W(`tabs-scroll-padding`,`border-right: 1px solid var(--n-tab-border-color);`),I(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),W(`tabs-tab`,`
 border-top-left-radius: var(--n-tab-border-radius);
 border-bottom-left-radius: var(--n-tab-border-radius);
 `,[z(`active`,`
 border-right: 1px solid #0000;
 `)]),W(`tabs-tab-pad`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),W(`tabs-pad`,`
 border-right: 1px solid var(--n-tab-border-color);
 `)])]),z(`right`,[z(`card-type`,[W(`tabs-scroll-padding`,`border-left: 1px solid var(--n-tab-border-color);`),I(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),W(`tabs-tab`,`
 border-top-right-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[z(`active`,`
 border-left: 1px solid #0000;
 `)]),W(`tabs-tab-pad`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),W(`tabs-pad`,`
 border-left: 1px solid var(--n-tab-border-color);
 `)])]),z(`bottom`,[z(`card-type`,[W(`tabs-scroll-padding`,`border-top: 1px solid var(--n-tab-border-color);`),I(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),W(`tabs-tab`,`
 border-bottom-left-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[z(`active`,`
 border-top: 1px solid #0000;
 `)]),W(`tabs-tab-pad`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),W(`tabs-pad`,`
 border-top: 1px solid var(--n-tab-border-color);
 `)])])])]),Nt=bt,Pt=Object.assign(Object.assign({},C.props),{value:[String,Number],defaultValue:[String,Number],trigger:{type:String,default:`click`},type:{type:String,default:`bar`},closable:Boolean,justifyContent:String,size:String,placement:{type:String,default:`top`},tabStyle:[String,Object],tabClass:String,addTabStyle:[String,Object],addTabClass:String,barWidth:Number,paneClass:String,paneStyle:[String,Object],paneWrapperClass:String,paneWrapperStyle:[String,Object],addable:[Boolean,Object],tabsPadding:{type:Number,default:0},animated:Boolean,onBeforeLeave:Function,onAdd:Function,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onClose:[Function,Array],labelSize:String,activeName:[String,Number],onActiveNameChange:[Function,Array]}),Ft=x({name:`Tabs`,props:Pt,slots:Object,setup(t,{slots:n}){let{mergedClsPrefixRef:r,inlineThemeDisabled:i,mergedComponentPropsRef:a}=S(t),o=C(`Tabs`,`-tabs`,Mt,Re,t,r),s=L(null),c=L(null),l=L(null),u=L(null),d=L(null),f=L(null),p=L(!0),m=L(!0),h=Ce(t,[`labelSize`,`size`]),g=U(()=>h.value?h.value:a?.value?.Tabs?.size||`medium`),_=Ce(t,[`activeName`,`value`]),v=L(_.value??t.defaultValue??(n.default?De(n.default())[0]?.props?.name:null)),b=ke(_,v),x={id:0},T=U(()=>{if(!(!t.justifyContent||t.type===`card`))return{display:`flex`,justifyContent:t.justifyContent}});H(b,()=>{x.id=0,k(),A()});function E(){let{value:e}=b;return e===null?null:s.value?.querySelector(`[data-name="${e}"]`)}function ee(e){if(t.type===`card`)return;let{value:n}=c;if(!n)return;let i=n.style.opacity===`0`;if(e){let a=`${r.value}-tabs-bar--disabled`,{barWidth:o,placement:s}=t;if(e.dataset.disabled===`true`?n.classList.add(a):n.classList.remove(a),[`top`,`bottom`].includes(s)){if(O([`top`,`maxHeight`,`height`]),typeof o==`number`&&e.offsetWidth>=o){let t=Math.floor((e.offsetWidth-o)/2)+e.offsetLeft;n.style.left=`${t}px`,n.style.maxWidth=`${o}px`}else n.style.left=`${e.offsetLeft}px`,n.style.maxWidth=`${e.offsetWidth}px`;n.style.width=`8192px`,i&&(n.style.transition=`none`),n.offsetWidth,i&&(n.style.transition=``,n.style.opacity=`1`)}else{if(O([`left`,`maxWidth`,`width`]),typeof o==`number`&&e.offsetHeight>=o){let t=Math.floor((e.offsetHeight-o)/2)+e.offsetTop;n.style.top=`${t}px`,n.style.maxHeight=`${o}px`}else n.style.top=`${e.offsetTop}px`,n.style.maxHeight=`${e.offsetHeight}px`;n.style.height=`8192px`,i&&(n.style.transition=`none`),n.offsetHeight,i&&(n.style.transition=``,n.style.opacity=`1`)}}}function D(){if(t.type===`card`)return;let{value:e}=c;e&&(e.style.opacity=`0`)}function O(e){let{value:t}=c;if(t)for(let n of e)t.style[n]=``}function k(){if(t.type===`card`)return;let e=E();e?ee(e):D()}function A(){let e=d.value?.$el;if(!e)return;let t=E();if(!t)return;let{scrollLeft:n,offsetWidth:r}=e,{offsetLeft:i,offsetWidth:a}=t;n>i?e.scrollTo({top:0,left:i,behavior:`smooth`}):i+a>n+r&&e.scrollTo({top:0,left:i+a-r,behavior:`smooth`})}let M=L(null),N=0,P=null;function F(e){let t=M.value;if(t){N=e.getBoundingClientRect().height;let n=`${N}px`,r=()=>{t.style.height=n,t.style.maxHeight=n};P?(r(),P(),P=null):P=r}}function I(e){let t=M.value;if(t){let n=e.getBoundingClientRect().height,r=()=>{document.body.offsetHeight,t.style.maxHeight=`${n}px`,t.style.height=`${Math.max(N,n)}px`};P?(P(),P=null,r()):P=r}}function R(){let e=M.value;if(e){e.style.maxHeight=``,e.style.height=``;let{paneWrapperStyle:n}=t;if(typeof n==`string`)e.style.cssText=n;else if(n){let{maxHeight:t,height:r}=n;t!==void 0&&(e.style.maxHeight=t),r!==void 0&&(e.style.height=r)}}}let z={value:[]},ne=L(`next`);function B(e){let t=b.value,n=`next`;for(let r of z.value){if(r===t)break;if(r===e){n=`prev`;break}}ne.value=n,V(e)}function V(e){let{onActiveNameChange:n,onUpdateValue:r,"onUpdate:value":i}=t;n&&y(n,e),r&&y(r,e),i&&y(i,e),v.value=e}function re(e){let{onClose:n}=t;n&&y(n,e)}let W=!0;function ae(){let{value:e}=c;if(!e)return;W||=!1;let t=`transition-disabled`;e.classList.add(t),k(),e.classList.remove(t)}let q=L(null);function se({transitionDisabled:e}){let t=s.value;if(!t)return;e&&t.classList.add(`transition-disabled`);let n=E();n&&q.value&&(q.value.style.width=`${n.offsetWidth}px`,q.value.style.height=`${n.offsetHeight}px`,q.value.style.transform=`translateX(${n.offsetLeft-oe(getComputedStyle(t).paddingLeft)}px)`,e&&q.value.offsetWidth),e&&t.classList.remove(`transition-disabled`)}H([b],()=>{t.type===`segment`&&w(()=>{se({transitionDisabled:!1})})}),te(()=>{t.type===`segment`&&se({transitionDisabled:!0})});let ce=0;function J(e){if(e.contentRect.width===0&&e.contentRect.height===0||ce===e.contentRect.width)return;ce=e.contentRect.width;let{type:n}=t;if((n===`line`||n===`bar`)&&(W||t.justifyContent?.startsWith(`space`))&&ae(),n!==`segment`){let{placement:e}=t;he((e===`top`||e===`bottom`?d.value?.$el:f.value)||null)}}let le=Nt(J,64);H([()=>t.justifyContent,()=>t.size],()=>{w(()=>{let{type:e}=t;(e===`line`||e===`bar`)&&ae()})});let ue=L(!1);function de(e){let{target:n,contentRect:{width:r,height:i}}=e,a=n.parentElement.parentElement.offsetWidth,o=n.parentElement.parentElement.offsetHeight,{placement:s}=t;if(!ue.value)s===`top`||s===`bottom`?a<r&&(ue.value=!0):o<i&&(ue.value=!0);else{let{value:e}=u;if(!e)return;s===`top`||s===`bottom`?a-r>e.$el.offsetWidth&&(ue.value=!1):o-i>e.$el.offsetHeight&&(ue.value=!1)}he(d.value?.$el||null)}let fe=Nt(de,64);function pe(){let{onAdd:e}=t;e&&e(),w(()=>{let e=E(),{value:t}=d;!e||!t||t.scrollTo({left:e.offsetLeft,top:0,behavior:`smooth`})})}function he(e){if(!e)return;let{placement:n}=t;if(n===`top`||n===`bottom`){let{scrollLeft:t,scrollWidth:n,offsetWidth:r}=e;p.value=t<=0,m.value=t+r>=n}else{let{scrollTop:t,scrollHeight:n,offsetHeight:r}=e;p.value=t<=0,m.value=t+r>=n}}let ge=Nt(e=>{he(e.target)},64);e(Dt,{triggerRef:K(t,`trigger`),tabStyleRef:K(t,`tabStyle`),tabClassRef:K(t,`tabClass`),addTabStyleRef:K(t,`addTabStyle`),addTabClassRef:K(t,`addTabClass`),paneClassRef:K(t,`paneClass`),paneStyleRef:K(t,`paneStyle`),mergedClsPrefixRef:r,typeRef:K(t,`type`),closableRef:K(t,`closable`),valueRef:b,tabChangeIdRef:x,onBeforeLeaveRef:K(t,`onBeforeLeave`),activateTab:B,handleClose:re,handleAdd:pe}),_e(()=>{k(),A()}),j(()=>{let{value:e}=l;if(!e)return;let{value:t}=r,n=`${t}-tabs-nav-scroll-wrapper--shadow-start`,i=`${t}-tabs-nav-scroll-wrapper--shadow-end`;p.value?e.classList.remove(n):e.classList.add(n),m.value?e.classList.remove(i):e.classList.add(i)});let ve={syncBarPosition:()=>{k()}},ye=()=>{se({transitionDisabled:!0})},be=U(()=>{let{value:e}=g,{type:n}=t,r=`${e}${{card:`Card`,bar:`Bar`,line:`Line`,segment:`Segment`}[n]}`,{self:{barColor:i,closeIconColor:a,closeIconColorHover:s,closeIconColorPressed:c,tabColor:l,tabBorderColor:u,paneTextColor:d,tabFontWeight:f,tabBorderRadius:p,tabFontWeightActive:m,colorSegment:h,fontWeightStrong:_,tabColorSegment:v,closeSize:y,closeIconSize:b,closeColorHover:x,closeColorPressed:S,closeBorderRadius:C,[G(`panePadding`,e)]:w,[G(`tabPadding`,r)]:T,[G(`tabPaddingVertical`,r)]:E,[G(`tabGap`,r)]:ee,[G(`tabGap`,`${r}Vertical`)]:te,[G(`tabTextColor`,n)]:D,[G(`tabTextColorActive`,n)]:O,[G(`tabTextColorHover`,n)]:k,[G(`tabTextColorDisabled`,n)]:A,[G(`tabFontSize`,e)]:j},common:{cubicBezierEaseInOut:M}}=o.value;return{"--n-bezier":M,"--n-color-segment":h,"--n-bar-color":i,"--n-tab-font-size":j,"--n-tab-text-color":D,"--n-tab-text-color-active":O,"--n-tab-text-color-disabled":A,"--n-tab-text-color-hover":k,"--n-pane-text-color":d,"--n-tab-border-color":u,"--n-tab-border-radius":p,"--n-close-size":y,"--n-close-icon-size":b,"--n-close-color-hover":x,"--n-close-color-pressed":S,"--n-close-border-radius":C,"--n-close-icon-color":a,"--n-close-icon-color-hover":s,"--n-close-icon-color-pressed":c,"--n-tab-color":l,"--n-tab-font-weight":f,"--n-tab-font-weight-active":m,"--n-tab-padding":T,"--n-tab-padding-vertical":E,"--n-tab-gap":ee,"--n-tab-gap-vertical":te,"--n-pane-padding-left":ie(w,`left`),"--n-pane-padding-right":ie(w,`right`),"--n-pane-padding-top":ie(w,`top`),"--n-pane-padding-bottom":ie(w,`bottom`),"--n-font-weight-strong":_,"--n-tab-color-segment":v}}),xe=i?me(`tabs`,U(()=>`${g.value[0]}${t.type[0]}`),be,t):void 0;return Object.assign({mergedClsPrefix:r,mergedValue:b,renderedNames:new Set,segmentCapsuleElRef:q,tabsPaneWrapperRef:M,tabsElRef:s,barElRef:c,addTabInstRef:u,xScrollInstRef:d,scrollWrapperElRef:l,addTabFixed:ue,tabWrapperStyle:T,handleNavResize:le,mergedSize:g,handleScroll:ge,handleTabsResize:fe,cssVars:i?void 0:be,themeClass:xe?.themeClass,animationDirection:ne,renderNameListRef:z,yScrollElRef:f,handleSegmentResize:ye,onAnimationBeforeLeave:F,onAnimationEnter:I,onAnimationAfterEnter:R,onRender:xe?.onRender},ve)},render(){let{mergedClsPrefix:e,type:t,placement:i,addTabFixed:a,addable:o,mergedSize:s,renderNameListRef:c,onRender:l,paneWrapperClass:u,paneWrapperStyle:d,$slots:{default:f,prefix:p,suffix:m}}=this;l?.();let h=f?De(f()).filter(e=>e.type.__TAB_PANE__===!0):[],g=f?De(f()).filter(e=>e.type.__TAB__===!0):[],v=!g.length,y=t===`card`,b=t===`segment`,x=!y&&!b&&this.justifyContent;c.value=[];let S=()=>{let t=n(`div`,{style:this.tabWrapperStyle,class:`${e}-tabs-wrapper`},x?null:n(`div`,{class:`${e}-tabs-scroll-padding`,style:i===`top`||i===`bottom`?{width:`${this.tabsPadding}px`}:{height:`${this.tabsPadding}px`}}),v?h.map((e,t)=>(c.value.push(e.props.name),zt(n(jt,Object.assign({},e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0&&(!x||x===`center`||x===`start`||x===`end`)}),e.children?{default:e.children.tab}:void 0)))):g.map((e,t)=>(c.value.push(e.props.name),zt(t!==0&&!x?Rt(e):e))),!a&&o&&y?Lt(o,(v?h.length:g.length)!==0):null,x?null:n(`div`,{class:`${e}-tabs-scroll-padding`,style:{width:`${this.tabsPadding}px`}}));return n(`div`,{ref:`tabsElRef`,class:`${e}-tabs-nav-scroll-content`},y&&o?n(r,{onResize:this.handleTabsResize},{default:()=>t}):t,y?n(`div`,{class:`${e}-tabs-pad`}):null,y?null:n(`div`,{ref:`barElRef`,class:`${e}-tabs-bar`}))},C=b?`top`:i;return n(`div`,{class:[`${e}-tabs`,this.themeClass,`${e}-tabs--${t}-type`,`${e}-tabs--${s}-size`,x&&`${e}-tabs--flex`,`${e}-tabs--${C}`],style:this.cssVars},n(`div`,{class:[`${e}-tabs-nav--${t}-type`,`${e}-tabs-nav--${C}`,`${e}-tabs-nav`]},_(p,t=>t&&n(`div`,{class:`${e}-tabs-nav__prefix`},t)),b?n(r,{onResize:this.handleSegmentResize},{default:()=>n(`div`,{class:`${e}-tabs-rail`,ref:`tabsElRef`},n(`div`,{class:`${e}-tabs-capsule`,ref:`segmentCapsuleElRef`},n(`div`,{class:`${e}-tabs-wrapper`},n(`div`,{class:`${e}-tabs-tab`}))),v?h.map((e,t)=>(c.value.push(e.props.name),n(jt,Object.assign({},e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0}),e.children?{default:e.children.tab}:void 0))):g.map((e,t)=>(c.value.push(e.props.name),t===0?e:Rt(e))))}):n(r,{onResize:this.handleNavResize},{default:()=>n(`div`,{class:`${e}-tabs-nav-scroll-wrapper`,ref:`scrollWrapperElRef`},[`top`,`bottom`].includes(C)?n(nt,{ref:`xScrollInstRef`,onScroll:this.handleScroll},{default:S}):n(`div`,{class:`${e}-tabs-nav-y-scroll`,onScroll:this.handleScroll,ref:`yScrollElRef`},S()))}),a&&o&&y?Lt(o,!0):null,_(m,t=>t&&n(`div`,{class:`${e}-tabs-nav__suffix`},t))),v&&(this.animated&&(C===`top`||C===`bottom`)?n(`div`,{ref:`tabsPaneWrapperRef`,style:d,class:[`${e}-tabs-pane-wrapper`,u]},It(h,this.mergedValue,this.renderedNames,this.onAnimationBeforeLeave,this.onAnimationEnter,this.onAnimationAfterEnter,this.animationDirection)):It(h,this.mergedValue,this.renderedNames)))}});function It(e,t,r,a,o,s,c){let l=[];return e.forEach(e=>{let{name:n,displayDirective:a,"display-directive":o}=e.props,s=e=>a===e||o===e,c=t===n;if(e.key!==void 0&&(e.key=n),c||s(`show`)||s(`show:lazy`)&&r.has(n)){r.has(n)||r.add(n);let t=!s(`if`);l.push(t?ue(e,[[i,c]]):e)}}),c?n(he,{name:`${c}-transition`,onBeforeLeave:a,onEnter:o,onAfterEnter:s},{default:()=>l}):l}function Lt(e,t){return n(jt,{ref:`addTabInstRef`,key:`__addable`,name:`__addable`,internalCreatedByPane:!0,internalAddable:!0,internalLeftPadded:t,disabled:typeof e==`object`&&e.disabled})}function Rt(e){let n=t(e);return n.props?n.props.internalLeftPadded=!0:n.props={internalLeftPadded:!0},n}function zt(e){return Array.isArray(e.dynamicProps)?e.dynamicProps.includes(`internalLeftPadded`)||e.dynamicProps.push(`internalLeftPadded`):e.dynamicProps=[`internalLeftPadded`],e}var Bt=F(`check`,[[`path`,{d:`M20 6 9 17l-5-5`,key:`1gmf2c`}]]),Vt=F(`circle-minus`,[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`path`,{d:`M8 12h8`,key:`1wcyev`}]]),Ht=F(`circle`,[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}]]),Ut=F(`rotate-cw`,[[`path`,{d:`M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8`,key:`1p45f6`}],[`path`,{d:`M21 3v5h-5`,key:`1q7to0`}]]),Wt=F(`square`,[[`rect`,{width:`18`,height:`18`,x:`3`,y:`3`,rx:`2`,key:`afitv7`}]]),Gt={class:`lifecycle`},Kt={class:`bar`},qt={key:1,class:`job`},Jt={class:`job-head`},Yt={class:`steps`},Xt={class:`ico`},Zt={class:`tag`},Qt={class:`svc`},$t={key:0,class:`detail`},en={key:0,class:`note`},tn=ce(x({__name:`AppLifecycle`,props:{name:{},containers:{}},emits:[`changed`],setup(e,{emit:t}){let n=e,r=t,{t:i}=ae(),s=L(null),c=L(``),l=L(!1),d=L(!1),h=e=>[`running`,`restarting`,`paused`].includes(e.state),_=U(()=>n.containers.some(h)),y=U(()=>n.containers.some(e=>!h(e))),x=U(()=>l.value||s.value?.phase===`running`),S=null;async function C(){try{let{job:e}=await Z.appJob(n.name),t=s.value?.phase===`running`;s.value=e,e?.phase===`running`?S=setTimeout(C,1200):t&&r(`changed`)}catch{S=setTimeout(C,2500)}}te(async()=>{try{s.value=(await Z.appJob(n.name)).job,s.value?.phase===`running`&&(S=setTimeout(C,1200))}catch{}}),f(()=>{S&&clearTimeout(S)});async function w(e){l.value=!0,c.value=``,d.value=!1;try{s.value=(await Z.appLifecycle(n.name,e)).job,S=setTimeout(C,800)}catch(e){c.value=e instanceof N?e.message:i(`docker.apps.lifecycle.failed`)}finally{l.value=!1}}let T=U(()=>{let e=s.value;return!e||d.value?!1:e.phase===`running`||!!e.finishedAt&&Date.now()-new Date(e.finishedAt).getTime()<6e5}),E={pending:Ht,running:Ht,ok:Bt,failed:Ze,skipped:Vt},ee=e=>i(`docker.apps.lifecycle.step.${e}`);return(t,n)=>(b(),o(`div`,Gt,[m(`div`,Kt,[p(k(O),{size:`small`,quaternary:``,disabled:x.value||!y.value,onClick:n[0]||=e=>w(`start`)},{icon:J(()=>[p(k(B),{component:k(X)},null,8,[`component`])]),default:J(()=>[u(` `+M(k(i)(`docker.apps.lifecycle.start`)),1)]),_:1},8,[`disabled`]),p(k(Ue),{"positive-text":k(i)(`docker.apps.lifecycle.stop`),onPositiveClick:n[1]||=e=>w(`stop`)},{trigger:J(()=>[p(k(O),{size:`small`,quaternary:``,disabled:x.value||!_.value},{icon:J(()=>[p(k(B),{component:k(Wt)},null,8,[`component`])]),default:J(()=>[u(` `+M(k(i)(`docker.apps.lifecycle.stop`)),1)]),_:1},8,[`disabled`])]),default:J(()=>[u(` `+M(k(i)(`docker.apps.lifecycle.confirmStop`,{name:e.name})),1)]),_:1},8,[`positive-text`]),p(k(Ue),{"positive-text":k(i)(`docker.apps.lifecycle.restart`),onPositiveClick:n[2]||=e=>w(`restart`)},{trigger:J(()=>[p(k(O),{size:`small`,quaternary:``,disabled:x.value||!_.value},{icon:J(()=>[p(k(B),{component:k(Ut)},null,8,[`component`])]),default:J(()=>[u(` `+M(k(i)(`docker.apps.lifecycle.restart`)),1)]),_:1},8,[`disabled`])]),default:J(()=>[u(` `+M(k(i)(`docker.apps.lifecycle.confirmRestart`,{name:e.name})),1)]),_:1},8,[`positive-text`]),n[5]||=m(`span`,{class:`spacer`},null,-1),de(t.$slots,`extra`,{},void 0,!0)]),c.value?(b(),g(k(Y),{key:0,type:`error`,"show-icon":!1,class:`gap`,closable:``,onClose:n[3]||=e=>c.value=``},{default:J(()=>[u(M(c.value),1)]),_:1})):v(``,!0),T.value&&s.value?(b(),o(`div`,qt,[m(`div`,Jt,[s.value.phase===`running`?(b(),g(k(ye),{key:0,size:`small`})):v(``,!0),m(`strong`,null,M(s.value.phase===`running`?k(i)(`docker.apps.lifecycle.running`,{action:k(i)(`docker.apps.lifecycle.${s.value.action}`)}):k(i)(`docker.apps.lifecycle.result.${s.value.result}`,{action:k(i)(`docker.apps.lifecycle.${s.value.action}`)})),1),n[6]||=m(`span`,{class:`spacer`},null,-1),s.value.phase===`done`?(b(),g(k(O),{key:1,size:`tiny`,quaternary:``,onClick:n[4]||=e=>d.value=!0},{default:J(()=>[u(M(k(i)(`docker.apps.lifecycle.dismiss`)),1)]),_:1})):v(``,!0)]),m(`ul`,Yt,[(b(!0),o(a,null,R(s.value.steps,(e,t)=>(b(),o(`li`,{key:t,class:fe(`s-${e.state}`)},[m(`span`,Xt,[e.state===`running`?(b(),g(k(ye),{key:0,size:12})):(b(),g(k(B),{key:1,component:E[e.state],size:`13`},null,8,[`component`]))]),m(`span`,Zt,M(ee(e.action)),1),m(`span`,Qt,M(e.service),1),e.detail?(b(),o(`span`,$t,M(e.detail),1)):v(``,!0)],2))),128))]),s.value.phase===`done`&&s.value.result!==`ok`?(b(),o(`p`,en,M(k(i)(`docker.apps.lifecycle.partialNote`)),1)):v(``,!0)])):v(``,!0)]))}}),[[`__scopeId`,`data-v-022ed129`]]),nn={class:`apps`},rn={key:0,class:`text-muted`},an=[`id`],on=[`onClick`],sn={class:`app-name`},cn={class:`app-meta`},ln={class:`app-meta mono`},un={key:0,class:`app-body`},dn={class:`mono text-muted`},fn={class:`svc-list`},pn={class:`svc-name`},mn={class:`svc-status text-muted`},hn={class:`svc-res mono text-muted`},gn={class:`svc-btns`},_n={key:1,class:`text-muted hint`},vn=ce(x({__name:`DockerProjectsPanel`,props:{containers:{},focus:{}},emits:[`logs`,`env`,`uninstall`,`changed`],setup(e,{emit:t}){let n=e,r=t,{t:i}=ae(),s=U(()=>$e(n.containers)),c=L({});function l(e){return c.value[e.name]??(e.verdict===`danger`||e.verdict===`warn`)}function d(e){c.value={...c.value,[e.name]:!l(e)}}H(()=>[n.focus,s.value.length],async([e,t])=>{!e||t===0||(c.value={...c.value,[e]:!0},await w(),document.getElementById(`app-${e}`)?.scrollIntoView({block:`center`,behavior:`smooth`}))},{immediate:!0});let f={ok:`success`,warn:`warning`,danger:`error`,stopped:`default`},h=e=>i({ok:`docker.apps.statusOk`,warn:`docker.apps.statusWarn`,danger:`docker.apps.statusDanger`,stopped:`docker.apps.statusStopped`}[e]);function _(e){return e.state===`restarting`?i(`docker.apps.restarting`):e.health===`unhealthy`?i(`docker.apps.unhealthy`):e.health===`starting`?i(`docker.apps.starting`):``}function y(e){return e.state===`running`?e.health===`unhealthy`?`danger`:e.health===`starting`?`warn`:`ok`:e.state===`restarting`?`danger`:e.state===`paused`?`warn`:`off`}return(t,n)=>{let c=se(`RouterLink`);return b(),o(`div`,nn,[e.containers.length===0?(b(),o(`p`,rn,M(k(i)(`docker.apps.noContainers`)),1)):v(``,!0),(b(!0),o(a,null,R(s.value,e=>(b(),o(`div`,{key:e.name,id:`app-${e.name}`,class:fe([`app-card`,`v-${e.verdict}`])},[m(`button`,{type:`button`,class:`app-head`,onClick:t=>d(e)},[p(k(B),{component:l(e)?k(Ge):k(We),size:`16`},null,8,[`component`]),m(`span`,sn,M(e.name||k(i)(`docker.apps.other`)),1),p(k(Te),{size:`small`,type:f[e.verdict],bordered:!1},{default:J(()=>[u(M(h(e.verdict)),1)]),_:2},1032,[`type`]),m(`span`,cn,M(k(i)(`docker.apps.runningOf`,{running:e.running,total:e.containers.length})),1),m(`span`,ln,M(e.cpu.toFixed(1))+`% · `+M(k(Q)(e.mem)),1)],8,on),l(e)?(b(),o(`div`,un,[e.workingDir?(b(),g(c,{key:0,to:{path:`/files`,query:{path:e.workingDir}},class:`folder-link`},{default:J(()=>[p(k(B),{component:k(be),size:`14`},null,8,[`component`]),u(` `+M(k(i)(`docker.apps.openFolder`))+` `,1),m(`span`,dn,M(e.workingDir),1)]),_:2},1032,[`to`])):v(``,!0),m(`ul`,fn,[(b(!0),o(a,null,R(e.containers,e=>(b(),o(`li`,{key:e.id},[m(`span`,{class:fe([`dot`,`d-${y(e)}`])},null,2),m(`span`,pn,M(e.service||e.name),1),_(e)?(b(),o(`span`,{key:0,class:fe([`svc-note`,{danger:e.health===`unhealthy`||e.state===`restarting`}])},M(_(e)),3)):v(``,!0),m(`span`,mn,M(e.status),1),m(`span`,hn,M(e.hasStats?`${e.stats.cpuPercent.toFixed(1)}% · ${k(Q)(e.stats.memUsageBytes)}`:`—`),1),m(`span`,gn,[p(k(O),{size:`tiny`,quaternary:``,onClick:t=>r(`env`,e)},{default:J(()=>[u(M(k(i)(`docker.env.button`)),1)]),_:1},8,[`onClick`]),p(k(O),{size:`tiny`,quaternary:``,onClick:t=>r(`logs`,e)},{default:J(()=>[u(M(k(i)(`docker.logs.button`)),1)]),_:1},8,[`onClick`])])]))),128))]),e.name?(b(),g(tn,{key:1,name:e.name,containers:e.containers,onChanged:n[0]||=e=>r(`changed`)},{extra:J(()=>[p(k(O),{size:`small`,quaternary:``,type:`error`,onClick:t=>r(`uninstall`,e.name)},{icon:J(()=>[p(k(B),{component:k(Xe)},null,8,[`component`])]),default:J(()=>[u(` `+M(k(i)(`docker.apps.uninstall.button`)),1)]),_:1},8,[`onClick`])]),_:2},1032,[`name`,`containers`])):v(``,!0)])):v(``,!0)],10,an))),128)),e.containers.length>0?(b(),o(`p`,_n,M(k(i)(`docker.apps.hint`)),1)):v(``,!0)])}}}),[[`__scopeId`,`data-v-2181e1d2`]]),yn={class:`text-muted note`},bn={key:0,class:`center`},xn={class:`controls`},Sn={style:{margin:`0 0 8px`}},Cn={class:`reveal-row`},wn={key:0,class:`reveal-error`},Tn={key:1,class:`text-muted`},En={key:2,class:`text-muted`},Dn={key:3,class:`env-list`},On={class:`env-key`},kn={key:1},An=ce(x({__name:`ContainerEnvDrawer`,props:{show:{type:Boolean},container:{}},emits:[`update:show`],setup(e,{emit:t}){let n=e,r=t,{t:i}=ae(),s=ze(),c=Je(`env-filter`),l=Ye(`env-reveal-password`),d=L(!1),f=L(``),h=L([]),_=L(!0),y=L(``),x=L(null),S=L(!1),C=L(``),w=L(``),T=L(!1);function E(){h.value=[],f.value=``,y.value=``,x.value=null,S.value=!1,C.value=``,w.value=``}async function ee(){if(n.container){d.value=!0,f.value=``;try{h.value=(await Z.containerEnv(n.container.id)).vars}catch(e){f.value=e instanceof N?e.message:i(`docker.env.loadFailed`)}finally{d.value=!1}}}H(()=>[n.show,n.container?.id],([e])=>{E(),e&&ee()});let te=U(()=>h.value.filter(e=>e.imageDefault).length),D=U(()=>h.value.filter(e=>e.secret).length),A=U(()=>{let e=y.value.trim().toLowerCase();return h.value.filter(t=>_.value&&t.imageDefault&&!t.secret?!1:!e||t.key.toLowerCase().includes(e))});function j(e){return e.secret?x.value?.[e.key]:e.value}async function P(){if(!(!n.container||!C.value)){T.value=!0,w.value=``;try{x.value=(await Z.revealEnv(n.container.id,C.value)).values,S.value=!1,C.value=``}catch(e){w.value=e instanceof N&&e.status===403?i(`common.wrongPassword`):e instanceof N?e.message:i(`docker.env.loadFailed`)}finally{T.value=!1}}}async function F(e){try{await Qe(e),s.success(i(`docker.env.copied`))}catch{s.error(i(`docker.env.copyFailed`))}}return(t,n)=>(b(),g(k(Be),{show:e.show,width:640,placement:`right`,"onUpdate:show":n[6]||=e=>r(`update:show`,e)},{default:J(()=>[p(k(Ve),{title:k(i)(`docker.env.title`,{name:e.container?.name??``}),closable:``},{default:J(()=>[m(`p`,yn,M(k(i)(`docker.env.readOnlyNote`)),1),d.value?(b(),o(`div`,bn,[p(k(ye))])):f.value?(b(),g(k(Y),{key:1,type:`error`,title:f.value},null,8,[`title`])):(b(),o(a,{key:2},[m(`div`,xn,[p(k(Pe),{value:y.value,"onUpdate:value":n[0]||=e=>y.value=e,size:`small`,clearable:``,placeholder:k(i)(`docker.env.filter`),"input-props":k(c),style:{"max-width":`200px`}},null,8,[`value`,`placeholder`,`input-props`]),te.value>0?(b(),g(k(Ie),{key:0,checked:_.value,"onUpdate:checked":n[1]||=e=>_.value=e,size:`small`},{default:J(()=>[u(M(k(i)(`docker.env.hideImageDefaults`,{count:te.value})),1)]),_:1},8,[`checked`])):v(``,!0),n[7]||=m(`span`,{class:`spacer`},null,-1),D.value>0&&!x.value&&!S.value?(b(),g(k(O),{key:1,size:`small`,onClick:n[2]||=e=>S.value=!0},{icon:J(()=>[p(k(B),{component:k(qe)},null,8,[`component`])]),default:J(()=>[u(` `+M(k(i)(`docker.env.revealSecrets`,{count:D.value})),1)]),_:1})):v(``,!0),x.value?(b(),g(k(O),{key:2,size:`small`,quaternary:``,onClick:n[3]||=e=>x.value=null},{default:J(()=>[u(M(k(i)(`docker.env.hideAgain`)),1)]),_:1})):v(``,!0)]),S.value?(b(),g(k(Y),{key:0,type:`warning`,"show-icon":!1,class:`reveal-box`},{default:J(()=>[m(`p`,Sn,M(k(i)(`docker.env.revealConfirm`)),1),m(`div`,Cn,[p(k(Pe),{value:C.value,"onUpdate:value":n[4]||=e=>C.value=e,type:`password`,"show-password-on":`click`,size:`small`,placeholder:k(i)(`common.dashboardPassword`),"input-props":k(l),onKeyup:pe(P,[`enter`])},null,8,[`value`,`placeholder`,`input-props`]),p(k(O),{size:`small`,onClick:n[5]||=e=>{S.value=!1,C.value=``,w.value=``}},{default:J(()=>[u(M(k(i)(`common.cancel`)),1)]),_:1}),p(k(O),{size:`small`,type:`primary`,loading:T.value,disabled:!C.value,onClick:P},{default:J(()=>[u(M(k(i)(`docker.env.reveal`)),1)]),_:1},8,[`loading`,`disabled`])]),w.value?(b(),o(`p`,wn,M(w.value),1)):v(``,!0)]),_:1})):v(``,!0),h.value.length===0?(b(),o(`p`,Tn,M(k(i)(`docker.env.none`)),1)):A.value.length===0?(b(),o(`p`,En,M(k(i)(`docker.env.noMatch`)),1)):(b(),o(`ul`,Dn,[(b(!0),o(a,null,R(A.value,e=>(b(),o(`li`,{key:e.key},[m(`span`,On,M(e.key),1),m(`span`,{class:fe([`env-val`,{masked:e.secret&&j(e)===void 0}])},[e.secret&&j(e)===void 0?(b(),o(a,{key:0},[p(k(B),{component:k(qe),size:`12`},null,8,[`component`]),n[8]||=u(` •••••••• `,-1)],64)):(b(),o(a,{key:1},[u(M(j(e)),1)],64))],2),j(e)!==void 0&&j(e)!==``?(b(),g(k(O),{key:0,size:`tiny`,quaternary:``,title:k(i)(`docker.env.copy`),onClick:t=>F(j(e))},{default:J(()=>[p(k(B),{component:k(Ke),size:`13`},null,8,[`component`])]),_:1},8,[`title`,`onClick`])):(b(),o(`span`,kn))]))),128))]))],64))]),_:1},8,[`title`])]),_:1},8,[`show`]))}}),[[`__scopeId`,`data-v-ad269986`]]),jn={key:0,class:`center`},Mn={class:`text-muted`},Nn={class:`text-muted`},Pn={class:`fail-list`},Fn={class:`text-muted`},In={class:`block`},Ln={class:`label`},Rn={class:`row`},zn={class:`mono`},Bn={key:0,class:`row`},Vn={class:`mono`},Hn={key:0,class:`block`},Un={class:`danger-text`},Wn={key:0,class:`hint danger-text`},Gn={key:1,class:`hint text-muted`},Kn={key:1,class:`block`},qn={class:`hint text-muted`},Jn={class:`note text-muted`},Yn={class:`block`},Xn={class:`block`},Zn={class:`label`},Qn={class:`mono`},$n={key:0,class:`mismatch`},er={key:3,class:`hint text-muted`},tr={class:`footer`},nr=ce(x({__name:`AppUninstallModal`,props:{show:{type:Boolean},name:{}},emits:[`update:show`,`done`],setup(e,{emit:t}){let n=e,r=t,{t:i}=ae(),s=L(!1),c=L(null),l=L(``),d=L(!1),f=L(!1),h=L(``),_=L(``),y=L(!1),x=L(``),S=L(null);function C(){c.value=null,l.value=``,d.value=!1,f.value=!1,h.value=``,_.value=``,x.value=``,S.value=null}H(()=>[n.show,n.name],async([e,t])=>{if(C(),!(!e||!t)){s.value=!0;try{c.value=await Z.uninstallPlan(t)}catch(e){l.value=e instanceof N?e.message:i(`docker.apps.uninstall.loadFailed`)}finally{s.value=!1}}});let w=Je(`confirm-app-name`),T=Ye(`confirm-password`),E=U(()=>h.value!==``&&h.value!==n.name),ee=U(()=>!!c.value&&h.value===n.name&&!!_.value&&!y.value),te=U(()=>(c.value?.volumes??[]).join(`, `)),D=U(()=>(S.value??[]).filter(e=>!e.ok)),A=U(()=>(S.value??[]).filter(e=>e.ok).length);async function j(){if(ee.value){y.value=!0,x.value=``;try{S.value=(await Z.uninstallProject(n.name,{password:_.value,confirmName:h.value,removeVolumes:d.value,removeImages:f.value})).steps,_.value=``,r(`done`)}catch(e){x.value=e instanceof N&&e.status===403?i(`common.wrongPassword`):e instanceof N?e.message:i(`docker.apps.uninstall.failed`)}finally{y.value=!1}}}function P(){y.value||r(`update:show`,!1)}return(t,n)=>(b(),g(k(Oe),{show:e.show,preset:`card`,title:S.value?k(i)(`docker.apps.uninstall.doneTitle`):k(i)(`docker.apps.uninstall.title`,{name:e.name}),style:{"max-width":`520px`},closable:!y.value,"mask-closable":!1,"close-on-esc":!y.value,"onUpdate:show":P},{footer:J(()=>[m(`div`,tr,[S.value?(b(),g(k(O),{key:0,type:`primary`,onClick:P},{default:J(()=>[u(M(k(i)(`docker.apps.uninstall.close`)),1)]),_:1})):(b(),o(a,{key:1},[p(k(O),{disabled:y.value,onClick:P},{default:J(()=>[u(M(k(i)(`common.cancel`)),1)]),_:1},8,[`disabled`]),p(k(O),{type:`error`,loading:y.value,disabled:!ee.value,onClick:j},{default:J(()=>[u(M(k(i)(`docker.apps.uninstall.confirm`)),1)]),_:1},8,[`loading`,`disabled`])],64))])]),default:J(()=>[s.value?(b(),o(`div`,jn,[p(k(ye)),n[4]||=u(),m(`span`,Mn,M(k(i)(`docker.apps.uninstall.loading`)),1)])):l.value?(b(),g(k(Y),{key:1,type:`error`,title:l.value},null,8,[`title`])):S.value?(b(),o(a,{key:2},[D.value.length===0?(b(),g(k(Y),{key:0,type:`success`,"show-icon":!1},{default:J(()=>[u(M(k(i)(`docker.apps.uninstall.doneOk`,{count:A.value})),1)]),_:1})):(b(),o(a,{key:1},[m(`p`,Nn,M(k(i)(`docker.apps.uninstall.doneOk`,{count:A.value})),1),p(k(Y),{type:`warning`,title:k(i)(`docker.apps.uninstall.doneFailed`,{count:D.value.length})},{default:J(()=>[m(`ul`,Pn,[(b(!0),o(a,null,R(D.value,e=>(b(),o(`li`,{key:e.kind+e.name},[m(`strong`,null,M(k(i)(`docker.apps.uninstall.kind.${e.kind}`))+` `+M(e.name),1),m(`span`,Fn,` — `+M(e.error),1)]))),128))])]),_:1},8,[`title`])],64))],64)):c.value?(b(),o(a,{key:3},[m(`div`,In,[m(`div`,Ln,M(k(i)(`docker.apps.uninstall.willRemove`)),1),m(`div`,Rn,[u(M(k(i)(`docker.apps.uninstall.containers`,{count:c.value.containers.length}))+`: `,1),m(`span`,zn,M(c.value.containers.map(e=>e.service||e.name).join(`, `)),1)]),c.value.networks.length?(b(),o(`div`,Bn,[u(M(k(i)(`docker.apps.uninstall.networks`,{count:c.value.networks.length}))+`: `,1),m(`span`,Vn,M(c.value.networks.join(`, `)),1)])):v(``,!0)]),c.value.volumes.length?(b(),o(`div`,Hn,[p(k(Ie),{checked:d.value,"onUpdate:checked":n[0]||=e=>d.value=e,disabled:y.value},{default:J(()=>[m(`span`,Un,M(k(i)(`docker.apps.uninstall.removeVolumes`)),1)]),_:1},8,[`checked`,`disabled`]),d.value?(b(),o(`p`,Wn,M(k(i)(`docker.apps.uninstall.volumesWarn`,{names:te.value})),1)):(b(),o(`p`,Gn,M(k(i)(`docker.apps.uninstall.keepVolumes`,{names:te.value})),1))])):v(``,!0),c.value.images.length?(b(),o(`div`,Kn,[p(k(Ie),{checked:f.value,"onUpdate:checked":n[1]||=e=>f.value=e,disabled:y.value},{default:J(()=>[u(M(k(i)(`docker.apps.uninstall.removeImages`,{count:c.value.images.length})),1)]),_:1},8,[`checked`,`disabled`]),m(`p`,qn,M(k(i)(`docker.apps.uninstall.imagesHint`)),1)])):v(``,!0),m(`p`,Jn,M(k(i)(`docker.apps.uninstall.keepNote`)),1),m(`div`,Yn,[p(k(Pe),{value:_.value,"onUpdate:value":n[2]||=e=>_.value=e,type:`password`,"show-password-on":`click`,size:`small`,disabled:y.value,placeholder:k(i)(`docker.apps.uninstall.password`),"input-props":k(T),onKeyup:pe(j,[`enter`])},null,8,[`value`,`disabled`,`placeholder`,`input-props`])]),m(`div`,Xn,[m(`div`,Zn,[u(M(k(i)(`docker.apps.uninstall.typeName`))+`: `,1),m(`span`,Qn,M(e.name),1)]),p(k(Pe),{value:h.value,"onUpdate:value":n[3]||=e=>h.value=e,size:`small`,disabled:y.value,placeholder:e.name,status:E.value?`error`:void 0,"input-props":k(w)},null,8,[`value`,`disabled`,`placeholder`,`status`,`input-props`]),E.value?(b(),o(`p`,$n,M(k(i)(`docker.apps.uninstall.nameMismatch`)),1)):v(``,!0)]),x.value?(b(),g(k(Y),{key:2,type:`error`,title:x.value,class:`block`},null,8,[`title`])):v(``,!0),y.value?(b(),o(`p`,er,M(k(i)(`docker.apps.uninstall.working`)),1)):v(``,!0)],64)):v(``,!0)]),_:1},8,[`show`,`title`,`closable`,`close-on-esc`]))}}),[[`__scopeId`,`data-v-b79970b9`]]),rr=5e3;function ir(){let e=L([]),t=L(!1),n;function r(r,a,o){i(),e.value=[];let s=`/api/docker/containers/${encodeURIComponent(r)}/logs/stream?sinceMin=${a}&tail=${o}`;n=new EventSource(s),n.onopen=()=>{t.value=!0},n.onerror=()=>{t.value=!1},n.onmessage=t=>{try{let n=JSON.parse(t.data);e.value.push(n),e.value.length>rr&&e.value.splice(0,e.value.length-rr)}catch{}}}function i(){n?.close(),n=void 0,t.value=!1}return{lines:e,connected:t,open:r,close:i}}var ar={key:1,class:`tab-loading`},or={key:0,class:`log-empty`},sr={key:0,class:`log-empty`},cr={key:0,class:`log-ts`},lr={class:`log-text`},ur=500,dr=ce(x({__name:`DockerView`,setup(e){let{t}=ae(),r=ze();function i(e){return e instanceof N&&e.status===503&&!!e.body&&typeof e.body==`object`&&`enabled`in e.body}function s(e,t){r.error(e instanceof N?e.message:t)}let c=e=>e===`running`?`success`:e===`paused`||e===`restarting`?`warning`:e===`dead`?`error`:`default`,l={running:0,restarting:1,paused:2,created:3,exited:4,dead:5};function d(e){return l[e.state]??6}function f(e,t){return e.hasStats?t(e.stats):-1}let h=L([]),_=L(!0),y=L(null),x;async function S(){try{let e=await Z.containers();h.value=e.containers??[],y.value=null}catch(e){i(e)&&(y.value=e.body)}finally{_.value=!1}}async function C(e,n){try{let t=await Z.containerAction(e,n);h.value=t.containers}catch(e){s(e,t(`docker.actionFailed`,{action:n}))}}let T=L(!1),E=L(``),D=L(``),A=L(15),j=[{label:t(`docker.logs.last5m`),value:5},{label:t(`docker.logs.last10m`),value:10},{label:t(`docker.logs.last15m`),value:15},{label:t(`docker.logs.last1h`),value:60},{label:t(`docker.logs.last6h`),value:360},{label:t(`docker.logs.last24h`),value:1440}],P=L(!1),F=L(``);function I(e){F.value=e,P.value=!0}let z=L(!1),ne=L(null);function B(e){ne.value=e,z.value=!0}let V=ir(),ie=L(null),W=L(!0),G=L(!1),K;function q(e,t){G.value=!1,K&&clearTimeout(K),K=setTimeout(()=>{V.connected.value||(G.value=!0)},6e3),V.open(e,t,ur)}function oe(){W.value=!0,q(E.value,A.value)}function se(e){E.value=e.id,D.value=e.name,T.value=!0,W.value=!0,q(e.id,A.value)}H(A,e=>{T.value&&(W.value=!0,q(E.value,e))}),H(T,e=>{e||(V.close(),K&&clearTimeout(K))}),H(V.connected,e=>{e&&(G.value=!1,K&&clearTimeout(K))}),H(()=>V.lines.value.length,async()=>{if(!W.value)return;await w();let e=ie.value;e&&(e.scrollTop=e.scrollHeight)});function ce(){let e=ie.value;if(!e)return;let t=e.scrollHeight-e.scrollTop-e.clientHeight<24;W.value=t}function le(e){if(!e)return``;let t=new Date(e);return Number.isNaN(t.getTime())?``:t.toLocaleTimeString()}let ue=/\b(error|fatal|panic|exception|critical)\b/i,de=/\bwarn(?:ing)?\b/i;function pe(e){return e.stream===`stderr`||ue.test(e.text)?`log-line--error`:de.test(e.text)?`log-line--warn`:``}let me=U(()=>[{title:t(`common.name`),key:`name`,width:160,ellipsis:{tooltip:!0},sorter:(e,t)=>e.name.localeCompare(t.name)},{title:`Image`,key:`image`,width:180,ellipsis:{tooltip:!0},sorter:(e,t)=>e.image.localeCompare(t.image)},{title:`Status`,key:`state`,width:130,sorter:(e,t)=>d(e)-d(t),render:e=>n(Te,{type:c(e.state),size:`small`},{default:()=>e.status})},{title:`CPU`,key:`cpu`,width:70,sorter:(e,t)=>f(e,e=>e.cpuPercent)-f(t,e=>e.cpuPercent),render:e=>e.hasStats?`${e.stats.cpuPercent.toFixed(1)}%`:`—`},{title:`RAM`,key:`ram`,width:150,sorter:(e,t)=>f(e,e=>e.memUsageBytes)-f(t,e=>e.memUsageBytes),render:e=>e.hasStats?`${Q(e.stats.memUsageBytes)} / ${Q(e.stats.memLimitBytes)}`:`—`},{title:`Network`,key:`net`,width:140,sorter:(e,t)=>f(e,e=>e.netRxBytes+e.netTxBytes)-f(t,e=>e.netRxBytes+e.netTxBytes),render:e=>e.hasStats?`↓ ${Q(e.stats.netRxBytes)} ↑ ${Q(e.stats.netTxBytes)}`:`—`},{title:`Ports`,key:`ports`,width:220,ellipsis:{tooltip:!0}},{title:t(`common.actions`),key:`actions`,width:270,render:e=>n(He,{size:`small`},()=>[e.state===`running`?[n(O,{size:`tiny`,onClick:()=>C(e.id,`stop`)},()=>`Stop`),n(O,{size:`tiny`,onClick:()=>C(e.id,`restart`)},()=>`Restart`)]:n(O,{size:`tiny`,type:`primary`,onClick:()=>C(e.id,`start`)},()=>`Start`),n(O,{size:`tiny`,quaternary:!0,onClick:()=>se(e)},()=>t(`docker.logs.button`)),n(Ue,{onPositiveClick:()=>C(e.id,`remove`)},{trigger:()=>n(O,{size:`tiny`,type:`error`,ghost:!0},()=>t(`common.delete`)),default:()=>t(`docker.confirmDeleteContainer`,{name:e.name})})])}]),he=L([]),ge=L(!0),_e=L(null);async function ve(){ge.value=!0;try{let e=await Z.images();he.value=e.images,_e.value=null}catch(e){i(e)&&(_e.value=e.body)}finally{ge.value=!1}}async function be(e){try{let t=await Z.removeImage(e);he.value=t.images}catch(e){s(e,t(`docker.removeImageFailed`))}}let Se=U(()=>[{title:`Tag`,key:`tag`,minWidth:200,ellipsis:{tooltip:!0},sorter:(e,t)=>e.tag.localeCompare(t.tag),render:e=>e.dangling?n(He,{size:`small`,align:`center`},()=>[e.tag,n(Te,{size:`small`,type:`warning`},()=>`dangling`)]):e.tag},{title:t(`common.size`),key:`sizeBytes`,width:110,sorter:(e,t)=>e.sizeBytes-t.sizeBytes,render:e=>Q(e.sizeBytes)},{title:t(`docker.usedColumn`),key:`containers`,width:140,sorter:(e,t)=>e.containers-t.containers,render:e=>e.containers<0?`—`:e.containers===0?t(`docker.notUsed`):t(`docker.containerCount`,{count:e.containers})},{title:t(`docker.created`),key:`created`,width:150,sorter:(e,t)=>Date.parse(e.created)-Date.parse(t.created),render:e=>et(e.created)},{title:t(`common.actions`),key:`actions`,width:100,render:e=>n(Ue,{onPositiveClick:()=>be(e.id)},{trigger:()=>n(O,{size:`tiny`,type:`error`,ghost:!0},()=>t(`common.delete`)),default:()=>t(`docker.confirmDeleteImage`,{tag:e.tag})})}]),Ce=L([]),De=L(!0),Oe=L(null);async function ke(){De.value=!0;try{let e=await Z.volumes();Ce.value=e.volumes,Oe.value=null}catch(e){i(e)&&(Oe.value=e.body)}finally{De.value=!1}}async function je(e){try{let t=await Z.removeVolume(e);Ce.value=t.volumes}catch(e){s(e,t(`docker.removeVolumeFailed`))}}let Me=U(()=>[{title:t(`common.name`),key:`name`,minWidth:180,ellipsis:{tooltip:!0},sorter:(e,t)=>e.name.localeCompare(t.name)},{title:`Driver`,key:`driver`,width:100,sorter:(e,t)=>e.driver.localeCompare(t.driver)},{title:t(`common.size`),key:`sizeBytes`,width:110,sorter:(e,t)=>e.sizeBytes-t.sizeBytes,render:e=>e.sizeBytes<0?t(`docker.unknown`):Q(e.sizeBytes)},{title:`Status`,key:`inUse`,width:120,sorter:(e,t)=>Number(e.inUse)-Number(t.inUse),render:e=>n(Te,{size:`small`,type:e.inUse?`success`:`default`},()=>e.inUse?t(`docker.used`):t(`docker.notUsed`))},{title:t(`common.actions`),key:`actions`,width:100,render:e=>n(Ue,{onPositiveClick:()=>je(e.name)},{trigger:()=>n(O,{size:`tiny`,type:`error`,ghost:!0},()=>t(`common.delete`)),default:()=>t(`docker.confirmDeleteVolume`,{name:e.name})})}]),Ne=L([]),Pe=L(!0),Fe=L(null);async function Ie(){Pe.value=!0;try{let e=await Z.networks();Ne.value=e.networks,Fe.value=null}catch(e){i(e)&&(Fe.value=e.body)}finally{Pe.value=!1}}async function Le(e){try{let t=await Z.removeNetwork(e);Ne.value=t.networks}catch(e){s(e,t(`docker.removeNetworkFailed`))}}let Re=U(()=>[{title:t(`common.name`),key:`name`,minWidth:160,ellipsis:{tooltip:!0},sorter:(e,t)=>e.name.localeCompare(t.name),render:e=>e.builtin?n(He,{size:`small`,align:`center`},()=>[e.name,n(Te,{size:`small`},()=>`builtin`)]):e.name},{title:`Driver`,key:`driver`,width:100,sorter:(e,t)=>e.driver.localeCompare(t.driver)},{title:`Subnet`,key:`subnet`,width:150,sorter:(e,t)=>e.subnet.localeCompare(t.subnet),render:e=>e.subnet||`—`},{title:t(`docker.connectedContainers`),key:`connectedCount`,width:170,sorter:(e,t)=>e.connectedCount-t.connectedCount},{title:t(`common.actions`),key:`actions`,width:100,render:e=>e.builtin?null:n(Ue,{onPositiveClick:()=>Le(e.id)},{trigger:()=>n(O,{size:`tiny`,type:`error`,ghost:!0},()=>t(`common.delete`)),default:()=>t(`docker.confirmDeleteNetwork`,{name:e.name})})}]),X=L(null),We=L(!0),Ge=L(null),Ke=L(null);async function qe(){We.value=!0;try{X.value=await Z.settings(),Ge.value=null}catch(e){i(e)&&(Ge.value=e.body)}finally{We.value=!1}}async function Je(e){Ke.value=e;try{X.value=await Z.prune(e),r.success(t(`docker.cleanupDone`))}catch(n){s(n,t(`docker.cleanupFailed`,{kind:e}))}finally{Ke.value=null}}let Ye=re(),Xe=typeof Ye.query.app==`string`?Ye.query.app:void 0,Ze=L(Ye.query.tab===`apps`?`apps`:`containers`),Qe=new Set([`containers`]);return H(Ze,e=>{Qe.has(e)||(Qe.add(e),e===`images`?ve():e===`volumes`?ke():e===`networks`?Ie():e===`settings`&&qe())}),te(()=>{S(),x=setInterval(S,5e3)}),ee(()=>{x&&clearInterval(x),K&&clearTimeout(K),V.close()}),(e,n)=>(b(),g(xe,null,{default:J(()=>[p(k(Ft),{type:`line`,value:Ze.value,"onUpdate:value":n[0]||=e=>Ze.value=e},{default:J(()=>[p(k(kt),{name:`containers`,tab:`Containers`},{default:J(()=>[y.value?(b(),g(k(Y),{key:0,type:`warning`,title:y.value.error},null,8,[`title`])):(b(),g(k(Ae),{key:1,columns:me.value,data:h.value,loading:_.value,"row-key":e=>e.id,"scroll-x":1200},null,8,[`columns`,`data`,`loading`,`row-key`]))]),_:1}),p(k(kt),{name:`apps`,tab:k(t)(`docker.apps.tab`)},{default:J(()=>[y.value?(b(),g(k(Y),{key:0,type:`warning`,title:y.value.error},null,8,[`title`])):(b(),g(vn,{key:1,containers:h.value,focus:k(Xe),onLogs:se,onEnv:B,onUninstall:I,onChanged:S},null,8,[`containers`,`focus`]))]),_:1},8,[`tab`]),p(k(kt),{name:`images`,tab:`Images`},{default:J(()=>[_e.value?(b(),g(k(Y),{key:0,type:`warning`,title:_e.value.error},null,8,[`title`])):(b(),g(k(Ae),{key:1,columns:Se.value,data:he.value,loading:ge.value,"row-key":e=>e.id,"scroll-x":700},null,8,[`columns`,`data`,`loading`,`row-key`]))]),_:1}),p(k(kt),{name:`volumes`,tab:`Volumes`},{default:J(()=>[Oe.value?(b(),g(k(Y),{key:0,type:`warning`,title:Oe.value.error},null,8,[`title`])):(b(),g(k(Ae),{key:1,columns:Me.value,data:Ce.value,loading:De.value,"row-key":e=>e.name,"scroll-x":610},null,8,[`columns`,`data`,`loading`,`row-key`]))]),_:1}),p(k(kt),{name:`networks`,tab:`Networks`},{default:J(()=>[Fe.value?(b(),g(k(Y),{key:0,type:`warning`,title:Fe.value.error},null,8,[`title`])):(b(),g(k(Ae),{key:1,columns:Re.value,data:Ne.value,loading:Pe.value,"row-key":e=>e.id,"scroll-x":680},null,8,[`columns`,`data`,`loading`,`row-key`]))]),_:1}),p(k(kt),{name:`settings`,tab:`Settings`},{default:J(()=>[Ge.value?(b(),g(k(Y),{key:0,type:`warning`,title:Ge.value.error},null,8,[`title`])):We.value&&!X.value?(b(),o(`div`,ar,[p(k(ye),{size:`large`})])):X.value?(b(),g(k(He),{key:3,vertical:``,size:24},{default:J(()=>[p(k(Tt),{title:k(t)(`docker.daemonInfo`),column:2,bordered:``,"label-placement":`left`},{default:J(()=>[p(k($),{label:k(t)(`docker.serverVersion`)},{default:J(()=>[u(M(X.value?.info.serverVersion),1)]),_:1},8,[`label`]),p(k($),{label:`OS / Kernel`},{default:J(()=>[u(M(X.value?.info.operatingSystem)+` / `+M(X.value?.info.kernelVersion),1)]),_:1}),p(k($),{label:`Storage Driver`},{default:J(()=>[u(M(X.value?.info.storageDriver),1)]),_:1}),p(k($),{label:`Root Dir`},{default:J(()=>[u(M(X.value?.info.dockerRootDir),1)]),_:1}),p(k($),{label:`Container`},{default:J(()=>[u(M(X.value?.info.containersRunning)+` running, `+M(X.value?.info.containersPaused)+` paused, `+M(X.value?.info.containersStopped)+` stopped `,1)]),_:1}),p(k($),{label:`Images`},{default:J(()=>[u(M(X.value?.info.images),1)]),_:1})]),_:1},8,[`title`]),p(k(Tt),{title:`Disk Usage`,column:2,bordered:``,"label-placement":`left`},{default:J(()=>[p(k($),{label:`Images`},{default:J(()=>[u(M(k(Q)(X.value?.diskUsage.imagesTotalBytes??0))+` (reclaimable `+M(k(Q)(X.value?.diskUsage.imagesReclaimableBytes??0))+`) `,1)]),_:1}),p(k($),{label:`Containers`},{default:J(()=>[u(M(k(Q)(X.value?.diskUsage.containersTotalBytes??0)),1)]),_:1}),p(k($),{label:`Volumes`},{default:J(()=>[u(M(k(Q)(X.value?.diskUsage.volumesTotalBytes??0))+` (reclaimable `+M(k(Q)(X.value?.diskUsage.volumesReclaimableBytes??0))+`) `,1)]),_:1})]),_:1}),p(k(He),null,{default:J(()=>[(b(),o(a,null,R([`containers`,`images`,`volumes`,`networks`,`all`],e=>p(k(Ue),{key:e,onPositiveClick:t=>Je(e)},{trigger:J(()=>[p(k(O),{size:`small`,loading:Ke.value===e},{default:J(()=>[u(M(k(t)(`docker.cleanup`))+` `+M(e),1)]),_:2},1032,[`loading`])]),default:J(()=>[u(` `+M(k(t)(`docker.confirmCleanup`,{kind:e})),1)]),_:2},1032,[`onPositiveClick`])),64))]),_:1})]),_:1})):(b(),g(k(we),{key:2,description:k(t)(`docker.noData`)},null,8,[`description`]))]),_:1})]),_:1},8,[`value`]),p(An,{show:z.value,"onUpdate:show":n[1]||=e=>z.value=e,container:ne.value},null,8,[`show`,`container`]),p(nr,{show:P.value,"onUpdate:show":n[2]||=e=>P.value=e,name:F.value,onDone:S},null,8,[`show`,`name`]),p(k(Be),{show:T.value,"onUpdate:show":n[4]||=e=>T.value=e,width:640,placement:`right`},{default:J(()=>[p(k(Ve),{title:k(t)(`docker.logs.title`,{name:D.value}),closable:``},{default:J(()=>[p(k(Ee),{value:A.value,"onUpdate:value":n[3]||=e=>A.value=e,options:j,size:`small`,style:{width:`150px`,"margin-bottom":`10px`}},null,8,[`value`]),k(V).lines.value.length===0&&!k(V).connected.value?(b(),o(`div`,or,[m(`p`,null,M(G.value?k(t)(`docker.logs.connectingSlow`):k(t)(`docker.logs.connecting`)),1),G.value?(b(),g(k(O),{key:0,size:`tiny`,onClick:oe},{default:J(()=>[u(M(k(t)(`docker.logs.reconnect`)),1)]),_:1})):v(``,!0)])):v(``,!0),m(`div`,{ref_key:`logScrollEl`,ref:ie,class:`log-scroll`,onScroll:ce},[k(V).lines.value.length===0&&k(V).connected.value?(b(),o(`p`,sr,M(k(t)(`docker.logs.waiting`)),1)):v(``,!0),(b(!0),o(a,null,R(k(V).lines.value,(e,t)=>(b(),o(`div`,{key:t,class:fe([`log-line`,pe(e)])},[e.timestamp?(b(),o(`span`,cr,M(le(e.timestamp)),1)):v(``,!0),m(`span`,lr,M(e.text),1)],2))),128))],544)]),_:1},8,[`title`])]),_:1},8,[`show`])]),_:1}))}}),[[`__scopeId`,`data-v-a1dc0cb7`]]);export{dr as default};