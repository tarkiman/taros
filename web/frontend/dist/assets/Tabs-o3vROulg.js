import{$n as e,An as t,Bn as n,Bt as r,Cn as i,Dn as a,Gt as o,Hn as s,Ht as c,It as l,N as u,Nt as d,Pt as f,Rn as p,Tt as m,U as h,Un as g,V as _,Vn as v,Yn as y,_t as b,ar as x,cn as S,dn as C,dr as w,fn as T,in as E,ir as D,jn as O,ln as k,mn as A,mr as j,mt as M,nn as ee,pn as N,sr as P,wt as te,xn as ne,xt as re}from"./auth-DH3jfQrf.js";import{T as ie,_ as F,v as I,w as ae}from"./AppShell-g4qI-N6w.js";import{u as L}from"./useTheme-Cu2B6Aya.js";import{c as oe}from"./LocaleSwitcher-Dm7MzLXt.js";import{r as R}from"./_common-BzFo7GKc.js";import{t as z}from"./omit-C4pE9leG.js";import{t as B}from"./Add-CXkCv7_T.js";import{n as se}from"./light-BZIwbx9w.js";var V=F(`.v-x-scroll`,{overflow:`auto`,scrollbarWidth:`none`},[F(`&::-webkit-scrollbar`,{width:0,height:0})]),ce=p({name:`XScroll`,props:{disabled:Boolean,onScroll:Function},setup(){let e=w(null);function t(e){!(e.currentTarget.offsetWidth<e.currentTarget.scrollWidth)||e.deltaY===0||(e.currentTarget.scrollLeft+=e.deltaY+e.deltaX,e.preventDefault())}let n=c();return V.mount({id:`vueuc/x-scroll`,head:!0,anchorMetaName:I,ssr:n}),Object.assign({selfRef:e,handleWheel:t},{scrollTo(...t){var n;(n=e.value)==null||n.scrollTo(...t)}})},render(){return n(`div`,{ref:`selfRef`,onScroll:this.onScroll,onWheel:this.disabled?void 0:this.handleWheel,class:`v-x-scroll`},this.$slots)}}),le=/\s/;function ue(e){for(var t=e.length;t--&&le.test(e.charAt(t)););return t}var H=/^\s+/;function U(e){return e&&e.slice(0,ue(e)+1).replace(H,``)}var W=NaN,de=/^[-+]0x[0-9a-f]+$/i,fe=/^0b[01]+$/i,G=/^0o[0-7]+$/i,K=parseInt;function q(e){if(typeof e==`number`)return e;if(b(e))return W;if(M(e)){var t=typeof e.valueOf==`function`?e.valueOf():e;e=M(t)?t+``:t}if(typeof e!=`string`)return e===0?e:+e;e=U(e);var n=fe.test(e);return n||G.test(e)?K(e.slice(2),n?2:8):de.test(e)?W:+e}var J=function(){return re.Date.now()},pe=`Expected a function`,me=Math.max,he=Math.min;function Y(e,t,n){var r,i,a,o,s,c,l=0,u=!1,d=!1,f=!0;if(typeof e!=`function`)throw TypeError(pe);t=q(t)||0,M(n)&&(u=!!n.leading,d=`maxWait`in n,a=d?me(q(n.maxWait)||0,t):a,f=`trailing`in n?!!n.trailing:f);function p(t){var n=r,a=i;return r=i=void 0,l=t,o=e.apply(a,n),o}function m(e){return l=e,s=setTimeout(_,t),u?p(e):o}function h(e){var n=e-c,r=e-l,i=t-n;return d?he(i,a-r):i}function g(e){var n=e-c,r=e-l;return c===void 0||n>=t||n<0||d&&r>=a}function _(){var e=J();if(g(e))return v(e);s=setTimeout(_,h(e))}function v(e){return s=void 0,f&&r?p(e):(r=i=void 0,o)}function y(){s!==void 0&&clearTimeout(s),l=0,r=c=i=s=void 0}function b(){return s===void 0?o:v(J())}function x(){var e=J(),n=g(e);if(r=arguments,i=this,c=e,n){if(s===void 0)return m(c);if(d)return clearTimeout(s),s=setTimeout(_,t),p(c)}return s===void 0&&(s=setTimeout(_,t)),o}return x.cancel=y,x.flush=b,x}var ge=`Expected a function`;function _e(e,t,n){var r=!0,i=!0;if(typeof e!=`function`)throw TypeError(ge);return M(n)&&(r=`leading`in n?!!n.leading:r,i=`trailing`in n?!!n.trailing:i),Y(e,t,{leading:r,maxWait:t,trailing:i})}var X=o(`n-tabs`),ve={tab:[String,Number,Object,Function],name:{type:[String,Number],required:!0},disabled:Boolean,displayDirective:{type:String,default:`if`},closable:{type:Boolean,default:void 0},tabProps:Object,label:[String,Number,Object,Function]},Z=p({__TAB_PANE__:!0,name:`TabPane`,alias:[`TabPanel`],props:ve,slots:Object,setup(e){let t=v(X,null);return t||l(`tab-pane`,"`n-tab-pane` must be placed inside `n-tabs`."),{style:t.paneStyleRef,class:t.paneClassRef,mergedClsPrefix:t.mergedClsPrefixRef}},render(){return n(`div`,{class:[`${this.mergedClsPrefix}-tab-pane`,this.class],style:this.style},this.$slots)}}),ye=Object.assign({internalLeftPadded:Boolean,internalAddable:Boolean,internalCreatedByPane:Boolean},z(ve,[`displayDirective`])),Q=p({__TAB__:!0,inheritAttrs:!1,name:`Tab`,props:ye,setup(e){let{mergedClsPrefixRef:t,valueRef:n,typeRef:r,closableRef:i,tabStyleRef:a,addTabStyleRef:o,tabClassRef:s,addTabClassRef:c,tabChangeIdRef:l,onBeforeLeaveRef:u,triggerRef:d,handleAdd:f,activateTab:p,handleClose:m}=v(X);return{trigger:d,mergedClosable:O(()=>{if(e.internalAddable)return!1;let{closable:t}=e;return t===void 0?i.value:t}),style:a,addStyle:o,tabClass:s,addTabClass:c,clsPrefix:t,value:n,type:r,handleClose(t){t.stopPropagation(),!e.disabled&&m(e.name)},activateTab(){if(e.disabled)return;if(e.internalAddable){f();return}let{name:t}=e,r=++l.id;if(t!==n.value){let{value:i}=u;i?Promise.resolve(i(e.name,n.value)).then(e=>{e&&l.id===r&&p(t)}):p(t)}}}},render(){let{internalAddable:e,clsPrefix:t,name:r,disabled:i,label:o,tab:c,value:l,mergedClosable:d,trigger:f,$slots:{default:p}}=this,m=o??c;return n(`div`,{class:`${t}-tabs-tab-wrapper`},this.internalLeftPadded?n(`div`,{class:`${t}-tabs-tab-pad`}):null,n(`div`,Object.assign({key:r,"data-name":r,"data-disabled":i?!0:void 0},s({class:[`${t}-tabs-tab`,l===r&&`${t}-tabs-tab--active`,i&&`${t}-tabs-tab--disabled`,d&&`${t}-tabs-tab--closable`,e&&`${t}-tabs-tab--addable`,e?this.addTabClass:this.tabClass],onClick:f===`click`?this.activateTab:void 0,onMouseenter:f===`hover`?this.activateTab:void 0,style:e?this.addStyle:this.style},this.internalCreatedByPane?this.tabProps||{}:this.$attrs)),n(`span`,{class:`${t}-tabs-tab__label`},e?n(a,null,n(`div`,{class:`${t}-tabs-tab__height-placeholder`},`\xA0`),n(_,{clsPrefix:t},{default:()=>n(B,null)})):p?p():typeof m==`object`?m:R(m??r)),d&&this.type===`card`?n(u,{clsPrefix:t,class:`${t}-tabs-tab__close`,onClick:this.handleClose,disabled:i}):null))}}),be=k(`tabs`,`
 box-sizing: border-box;
 width: 100%;
 display: flex;
 flex-direction: column;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
`,[T(`segment-type`,[k(`tabs-rail`,[S(`&.transition-disabled`,[k(`tabs-capsule`,`
 transition: none;
 `)])])]),T(`top`,[k(`tab-pane`,`
 padding: var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left);
 `)]),T(`left`,[k(`tab-pane`,`
 padding: var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left) var(--n-pane-padding-top);
 `)]),T(`left, right`,`
 flex-direction: row;
 `,[k(`tabs-bar`,`
 width: 2px;
 right: 0;
 transition:
 top .2s var(--n-bezier),
 max-height .2s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `),k(`tabs-tab`,`
 padding: var(--n-tab-padding-vertical); 
 `)]),T(`right`,`
 flex-direction: row-reverse;
 `,[k(`tab-pane`,`
 padding: var(--n-pane-padding-left) var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom);
 `),k(`tabs-bar`,`
 left: 0;
 `)]),T(`bottom`,`
 flex-direction: column-reverse;
 justify-content: flex-end;
 `,[k(`tab-pane`,`
 padding: var(--n-pane-padding-bottom) var(--n-pane-padding-right) var(--n-pane-padding-top) var(--n-pane-padding-left);
 `),k(`tabs-bar`,`
 top: 0;
 `)]),k(`tabs-rail`,`
 position: relative;
 padding: 3px;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 background-color: var(--n-color-segment);
 transition: background-color .3s var(--n-bezier);
 display: flex;
 align-items: center;
 `,[k(`tabs-capsule`,`
 border-radius: var(--n-tab-border-radius);
 position: absolute;
 pointer-events: none;
 background-color: var(--n-tab-color-segment);
 box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .08);
 transition: transform 0.3s var(--n-bezier);
 `),k(`tabs-tab-wrapper`,`
 flex-basis: 0;
 flex-grow: 1;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[k(`tabs-tab`,`
 overflow: hidden;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[T(`active`,`
 font-weight: var(--n-font-weight-strong);
 color: var(--n-tab-text-color-active);
 `),S(`&:hover`,`
 color: var(--n-tab-text-color-hover);
 `)])])]),T(`flex`,[k(`tabs-nav`,`
 width: 100%;
 position: relative;
 `,[k(`tabs-wrapper`,`
 width: 100%;
 `,[k(`tabs-tab`,`
 margin-right: 0;
 `)])])]),k(`tabs-nav`,`
 box-sizing: border-box;
 line-height: 1.5;
 display: flex;
 transition: border-color .3s var(--n-bezier);
 `,[C(`prefix, suffix`,`
 display: flex;
 align-items: center;
 `),C(`prefix`,`padding-right: 16px;`),C(`suffix`,`padding-left: 16px;`)]),T(`top, bottom`,[S(`>`,[k(`tabs-nav`,[k(`tabs-nav-scroll-wrapper`,[S(`&::before`,`
 top: 0;
 bottom: 0;
 left: 0;
 width: 20px;
 `),S(`&::after`,`
 top: 0;
 bottom: 0;
 right: 0;
 width: 20px;
 `),T(`shadow-start`,[S(`&::before`,`
 box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, .12);
 `)]),T(`shadow-end`,[S(`&::after`,`
 box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),T(`left, right`,[k(`tabs-nav-scroll-content`,`
 flex-direction: column;
 `),S(`>`,[k(`tabs-nav`,[k(`tabs-nav-scroll-wrapper`,[S(`&::before`,`
 top: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),S(`&::after`,`
 bottom: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),T(`shadow-start`,[S(`&::before`,`
 box-shadow: inset 0 10px 8px -8px rgba(0, 0, 0, .12);
 `)]),T(`shadow-end`,[S(`&::after`,`
 box-shadow: inset 0 -10px 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),k(`tabs-nav-scroll-wrapper`,`
 flex: 1;
 position: relative;
 overflow: hidden;
 `,[k(`tabs-nav-y-scroll`,`
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
 `)]),k(`tabs-nav-scroll-content`,`
 display: flex;
 position: relative;
 min-width: 100%;
 min-height: 100%;
 width: fit-content;
 box-sizing: border-box;
 `),k(`tabs-wrapper`,`
 display: inline-flex;
 flex-wrap: nowrap;
 position: relative;
 `),k(`tabs-tab-wrapper`,`
 display: flex;
 flex-wrap: nowrap;
 flex-shrink: 0;
 flex-grow: 0;
 `),k(`tabs-tab`,`
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
 `,[T(`disabled`,{cursor:`not-allowed`}),C(`close`,`
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),C(`label`,`
 display: flex;
 align-items: center;
 z-index: 1;
 `)]),k(`tabs-bar`,`
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
 `),T(`disabled`,`
 background-color: var(--n-tab-text-color-disabled)
 `)]),k(`tabs-pane-wrapper`,`
 position: relative;
 overflow: hidden;
 transition: max-height .2s var(--n-bezier);
 `),k(`tab-pane`,`
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
 `)]),k(`tabs-tab-pad`,`
 box-sizing: border-box;
 width: var(--n-tab-gap);
 flex-grow: 0;
 flex-shrink: 0;
 `),T(`line-type, bar-type`,[k(`tabs-tab`,`
 font-weight: var(--n-tab-font-weight);
 box-sizing: border-box;
 vertical-align: bottom;
 `,[S(`&:hover`,{color:`var(--n-tab-text-color-hover)`}),T(`active`,`
 color: var(--n-tab-text-color-active);
 font-weight: var(--n-tab-font-weight-active);
 `),T(`disabled`,{color:`var(--n-tab-text-color-disabled)`})])]),k(`tabs-nav`,[T(`line-type`,[T(`top`,[C(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),k(`tabs-nav-scroll-content`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),k(`tabs-bar`,`
 bottom: -1px;
 `)]),T(`left`,[C(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),k(`tabs-nav-scroll-content`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),k(`tabs-bar`,`
 right: -1px;
 `)]),T(`right`,[C(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),k(`tabs-nav-scroll-content`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),k(`tabs-bar`,`
 left: -1px;
 `)]),T(`bottom`,[C(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),k(`tabs-nav-scroll-content`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),k(`tabs-bar`,`
 top: -1px;
 `)]),C(`prefix, suffix`,`
 transition: border-color .3s var(--n-bezier);
 `),k(`tabs-nav-scroll-content`,`
 transition: border-color .3s var(--n-bezier);
 `),k(`tabs-bar`,`
 border-radius: 0;
 `)]),T(`card-type`,[C(`prefix, suffix`,`
 transition: border-color .3s var(--n-bezier);
 `),k(`tabs-pad`,`
 flex-grow: 1;
 transition: border-color .3s var(--n-bezier);
 `),k(`tabs-tab-pad`,`
 transition: border-color .3s var(--n-bezier);
 `),k(`tabs-tab`,`
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
 `,[T(`addable`,`
 padding-left: 8px;
 padding-right: 8px;
 font-size: 16px;
 justify-content: center;
 `,[C(`height-placeholder`,`
 width: 0;
 font-size: var(--n-tab-font-size);
 `),N(`disabled`,[S(`&:hover`,`
 color: var(--n-tab-text-color-hover);
 `)])]),T(`closable`,`padding-right: 8px;`),T(`active`,`
 background-color: #0000;
 font-weight: var(--n-tab-font-weight-active);
 color: var(--n-tab-text-color-active);
 `),T(`disabled`,`color: var(--n-tab-text-color-disabled);`)])]),T(`left, right`,`
 flex-direction: column; 
 `,[C(`prefix, suffix`,`
 padding: var(--n-tab-padding-vertical);
 `),k(`tabs-wrapper`,`
 flex-direction: column;
 `),k(`tabs-tab-wrapper`,`
 flex-direction: column;
 `,[k(`tabs-tab-pad`,`
 height: var(--n-tab-gap-vertical);
 width: 100%;
 `)])]),T(`top`,[T(`card-type`,[k(`tabs-scroll-padding`,`border-bottom: 1px solid var(--n-tab-border-color);`),C(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),k(`tabs-tab`,`
 border-top-left-radius: var(--n-tab-border-radius);
 border-top-right-radius: var(--n-tab-border-radius);
 `,[T(`active`,`
 border-bottom: 1px solid #0000;
 `)]),k(`tabs-tab-pad`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),k(`tabs-pad`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `)])]),T(`left`,[T(`card-type`,[k(`tabs-scroll-padding`,`border-right: 1px solid var(--n-tab-border-color);`),C(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),k(`tabs-tab`,`
 border-top-left-radius: var(--n-tab-border-radius);
 border-bottom-left-radius: var(--n-tab-border-radius);
 `,[T(`active`,`
 border-right: 1px solid #0000;
 `)]),k(`tabs-tab-pad`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),k(`tabs-pad`,`
 border-right: 1px solid var(--n-tab-border-color);
 `)])]),T(`right`,[T(`card-type`,[k(`tabs-scroll-padding`,`border-left: 1px solid var(--n-tab-border-color);`),C(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),k(`tabs-tab`,`
 border-top-right-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[T(`active`,`
 border-left: 1px solid #0000;
 `)]),k(`tabs-tab-pad`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),k(`tabs-pad`,`
 border-left: 1px solid var(--n-tab-border-color);
 `)])]),T(`bottom`,[T(`card-type`,[k(`tabs-scroll-padding`,`border-top: 1px solid var(--n-tab-border-color);`),C(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),k(`tabs-tab`,`
 border-bottom-left-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[T(`active`,`
 border-top: 1px solid #0000;
 `)]),k(`tabs-tab-pad`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),k(`tabs-pad`,`
 border-top: 1px solid var(--n-tab-border-color);
 `)])])])]),xe=_e,Se=Object.assign(Object.assign({},h.props),{value:[String,Number],defaultValue:[String,Number],trigger:{type:String,default:`click`},type:{type:String,default:`bar`},closable:Boolean,justifyContent:String,size:String,placement:{type:String,default:`top`},tabStyle:[String,Object],tabClass:String,addTabStyle:[String,Object],addTabClass:String,barWidth:Number,paneClass:String,paneStyle:[String,Object],paneWrapperClass:String,paneWrapperStyle:[String,Object],addable:[Boolean,Object],tabsPadding:{type:Number,default:0},animated:Boolean,onBeforeLeave:Function,onAdd:Function,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onClose:[Function,Array],labelSize:String,activeName:[String,Number],onActiveNameChange:[Function,Array]}),Ce=p({name:`Tabs`,props:Se,slots:Object,setup(t,{slots:n}){let{mergedClsPrefixRef:r,inlineThemeDisabled:i,mergedComponentPropsRef:a}=m(t),o=h(`Tabs`,`-tabs`,be,se,t,r),s=w(null),c=w(null),l=w(null),u=w(null),d=w(null),p=w(null),_=w(!0),v=w(!0),b=ae(t,[`labelSize`,`size`]),S=O(()=>b.value?b.value:a?.value?.Tabs?.size||`medium`),C=ae(t,[`activeName`,`value`]),T=w(C.value??t.defaultValue??(n.default?L(n.default())[0]?.props?.name:null)),k=oe(C,T),M={id:0},N=O(()=>{if(!(!t.justifyContent||t.type===`card`))return{display:`flex`,justifyContent:t.justifyContent}});D(k,()=>{M.id=0,I(),R()});function P(){let{value:e}=k;return e===null?null:s.value?.querySelector(`[data-name="${e}"]`)}function ne(e){if(t.type===`card`)return;let{value:n}=c;if(!n)return;let i=n.style.opacity===`0`;if(e){let a=`${r.value}-tabs-bar--disabled`,{barWidth:o,placement:s}=t;if(e.dataset.disabled===`true`?n.classList.add(a):n.classList.remove(a),[`top`,`bottom`].includes(s)){if(F([`top`,`maxHeight`,`height`]),typeof o==`number`&&e.offsetWidth>=o){let t=Math.floor((e.offsetWidth-o)/2)+e.offsetLeft;n.style.left=`${t}px`,n.style.maxWidth=`${o}px`}else n.style.left=`${e.offsetLeft}px`,n.style.maxWidth=`${e.offsetWidth}px`;n.style.width=`8192px`,i&&(n.style.transition=`none`),n.offsetWidth,i&&(n.style.transition=``,n.style.opacity=`1`)}else{if(F([`left`,`maxWidth`,`width`]),typeof o==`number`&&e.offsetHeight>=o){let t=Math.floor((e.offsetHeight-o)/2)+e.offsetTop;n.style.top=`${t}px`,n.style.maxHeight=`${o}px`}else n.style.top=`${e.offsetTop}px`,n.style.maxHeight=`${e.offsetHeight}px`;n.style.height=`8192px`,i&&(n.style.transition=`none`),n.offsetHeight,i&&(n.style.transition=``,n.style.opacity=`1`)}}}function re(){if(t.type===`card`)return;let{value:e}=c;e&&(e.style.opacity=`0`)}function F(e){let{value:t}=c;if(t)for(let n of e)t.style[n]=``}function I(){if(t.type===`card`)return;let e=P();e?ne(e):re()}function R(){let e=d.value?.$el;if(!e)return;let t=P();if(!t)return;let{scrollLeft:n,offsetWidth:r}=e,{offsetLeft:i,offsetWidth:a}=t;n>i?e.scrollTo({top:0,left:i,behavior:`smooth`}):i+a>n+r&&e.scrollTo({top:0,left:i+a-r,behavior:`smooth`})}let z=w(null),B=0,V=null;function ce(e){let t=z.value;if(t){B=e.getBoundingClientRect().height;let n=`${B}px`,r=()=>{t.style.height=n,t.style.maxHeight=n};V?(r(),V(),V=null):V=r}}function le(e){let t=z.value;if(t){let n=e.getBoundingClientRect().height,r=()=>{document.body.offsetHeight,t.style.maxHeight=`${n}px`,t.style.height=`${Math.max(B,n)}px`};V?(V(),V=null,r()):V=r}}function ue(){let e=z.value;if(e){e.style.maxHeight=``,e.style.height=``;let{paneWrapperStyle:n}=t;if(typeof n==`string`)e.style.cssText=n;else if(n){let{maxHeight:t,height:r}=n;t!==void 0&&(e.style.maxHeight=t),r!==void 0&&(e.style.height=r)}}}let H={value:[]},U=w(`next`);function W(e){let t=k.value,n=`next`;for(let r of H.value){if(r===t)break;if(r===e){n=`prev`;break}}U.value=n,de(e)}function de(e){let{onActiveNameChange:n,onUpdateValue:r,"onUpdate:value":i}=t;n&&f(n,e),r&&f(r,e),i&&f(i,e),T.value=e}function fe(e){let{onClose:n}=t;n&&f(n,e)}let G=!0;function K(){let{value:e}=c;if(!e)return;G||=!1;let t=`transition-disabled`;e.classList.add(t),I(),e.classList.remove(t)}let q=w(null);function J({transitionDisabled:e}){let t=s.value;if(!t)return;e&&t.classList.add(`transition-disabled`);let n=P();n&&q.value&&(q.value.style.width=`${n.offsetWidth}px`,q.value.style.height=`${n.offsetHeight}px`,q.value.style.transform=`translateX(${n.offsetLeft-ee(getComputedStyle(t).paddingLeft)}px)`,e&&q.value.offsetWidth),e&&t.classList.remove(`transition-disabled`)}D([k],()=>{t.type===`segment`&&g(()=>{J({transitionDisabled:!1})})}),y(()=>{t.type===`segment`&&J({transitionDisabled:!0})});let pe=0;function me(e){if(e.contentRect.width===0&&e.contentRect.height===0||pe===e.contentRect.width)return;pe=e.contentRect.width;let{type:n}=t;if((n===`line`||n===`bar`)&&(G||t.justifyContent?.startsWith(`space`))&&K(),n!==`segment`){let{placement:e}=t;Z((e===`top`||e===`bottom`?d.value?.$el:p.value)||null)}}let he=xe(me,64);D([()=>t.justifyContent,()=>t.size],()=>{g(()=>{let{type:e}=t;(e===`line`||e===`bar`)&&K()})});let Y=w(!1);function ge(e){let{target:n,contentRect:{width:r,height:i}}=e,a=n.parentElement.parentElement.offsetWidth,o=n.parentElement.parentElement.offsetHeight,{placement:s}=t;if(!Y.value)s===`top`||s===`bottom`?a<r&&(Y.value=!0):o<i&&(Y.value=!0);else{let{value:e}=u;if(!e)return;s===`top`||s===`bottom`?a-r>e.$el.offsetWidth&&(Y.value=!1):o-i>e.$el.offsetHeight&&(Y.value=!1)}Z(d.value?.$el||null)}let _e=xe(ge,64);function ve(){let{onAdd:e}=t;e&&e(),g(()=>{let e=P(),{value:t}=d;!e||!t||t.scrollTo({left:e.offsetLeft,top:0,behavior:`smooth`})})}function Z(e){if(!e)return;let{placement:n}=t;if(n===`top`||n===`bottom`){let{scrollLeft:t,scrollWidth:n,offsetWidth:r}=e;_.value=t<=0,v.value=t+r>=n}else{let{scrollTop:t,scrollHeight:n,offsetHeight:r}=e;_.value=t<=0,v.value=t+r>=n}}let ye=xe(e=>{Z(e.target)},64);e(X,{triggerRef:j(t,`trigger`),tabStyleRef:j(t,`tabStyle`),tabClassRef:j(t,`tabClass`),addTabStyleRef:j(t,`addTabStyle`),addTabClassRef:j(t,`addTabClass`),paneClassRef:j(t,`paneClass`),paneStyleRef:j(t,`paneStyle`),mergedClsPrefixRef:r,typeRef:j(t,`type`),closableRef:j(t,`closable`),valueRef:k,tabChangeIdRef:M,onBeforeLeaveRef:j(t,`onBeforeLeave`),activateTab:W,handleClose:fe,handleAdd:ve}),ie(()=>{I(),R()}),x(()=>{let{value:e}=l;if(!e)return;let{value:t}=r,n=`${t}-tabs-nav-scroll-wrapper--shadow-start`,i=`${t}-tabs-nav-scroll-wrapper--shadow-end`;_.value?e.classList.remove(n):e.classList.add(n),v.value?e.classList.remove(i):e.classList.add(i)});let Q={syncBarPosition:()=>{I()}},Se=()=>{J({transitionDisabled:!0})},Ce=O(()=>{let{value:e}=S,{type:n}=t,r=`${e}${{card:`Card`,bar:`Bar`,line:`Line`,segment:`Segment`}[n]}`,{self:{barColor:i,closeIconColor:a,closeIconColorHover:s,closeIconColorPressed:c,tabColor:l,tabBorderColor:u,paneTextColor:d,tabFontWeight:f,tabBorderRadius:p,tabFontWeightActive:m,colorSegment:h,fontWeightStrong:g,tabColorSegment:_,closeSize:v,closeIconSize:y,closeColorHover:b,closeColorPressed:x,closeBorderRadius:C,[A(`panePadding`,e)]:w,[A(`tabPadding`,r)]:T,[A(`tabPaddingVertical`,r)]:D,[A(`tabGap`,r)]:O,[A(`tabGap`,`${r}Vertical`)]:k,[A(`tabTextColor`,n)]:j,[A(`tabTextColorActive`,n)]:M,[A(`tabTextColorHover`,n)]:ee,[A(`tabTextColorDisabled`,n)]:N,[A(`tabFontSize`,e)]:P},common:{cubicBezierEaseInOut:te}}=o.value;return{"--n-bezier":te,"--n-color-segment":h,"--n-bar-color":i,"--n-tab-font-size":P,"--n-tab-text-color":j,"--n-tab-text-color-active":M,"--n-tab-text-color-disabled":N,"--n-tab-text-color-hover":ee,"--n-pane-text-color":d,"--n-tab-border-color":u,"--n-tab-border-radius":p,"--n-close-size":v,"--n-close-icon-size":y,"--n-close-color-hover":b,"--n-close-color-pressed":x,"--n-close-border-radius":C,"--n-close-icon-color":a,"--n-close-icon-color-hover":s,"--n-close-icon-color-pressed":c,"--n-tab-color":l,"--n-tab-font-weight":f,"--n-tab-font-weight-active":m,"--n-tab-padding":T,"--n-tab-padding-vertical":D,"--n-tab-gap":O,"--n-tab-gap-vertical":k,"--n-pane-padding-left":E(w,`left`),"--n-pane-padding-right":E(w,`right`),"--n-pane-padding-top":E(w,`top`),"--n-pane-padding-bottom":E(w,`bottom`),"--n-font-weight-strong":g,"--n-tab-color-segment":_}}),$=i?te(`tabs`,O(()=>`${S.value[0]}${t.type[0]}`),Ce,t):void 0;return Object.assign({mergedClsPrefix:r,mergedValue:k,renderedNames:new Set,segmentCapsuleElRef:q,tabsPaneWrapperRef:z,tabsElRef:s,barElRef:c,addTabInstRef:u,xScrollInstRef:d,scrollWrapperElRef:l,addTabFixed:Y,tabWrapperStyle:N,handleNavResize:he,mergedSize:S,handleScroll:ye,handleTabsResize:_e,cssVars:i?void 0:Ce,themeClass:$?.themeClass,animationDirection:U,renderNameListRef:H,yScrollElRef:p,handleSegmentResize:Se,onAnimationBeforeLeave:ce,onAnimationEnter:le,onAnimationAfterEnter:ue,onRender:$?.onRender},Q)},render(){let{mergedClsPrefix:e,type:t,placement:i,addTabFixed:a,addable:o,mergedSize:s,renderNameListRef:c,onRender:l,paneWrapperClass:u,paneWrapperStyle:f,$slots:{default:p,prefix:m,suffix:h}}=this;l?.();let g=p?L(p()).filter(e=>e.type.__TAB_PANE__===!0):[],_=p?L(p()).filter(e=>e.type.__TAB__===!0):[],v=!_.length,y=t===`card`,b=t===`segment`,x=!y&&!b&&this.justifyContent;c.value=[];let S=()=>{let t=n(`div`,{style:this.tabWrapperStyle,class:`${e}-tabs-wrapper`},x?null:n(`div`,{class:`${e}-tabs-scroll-padding`,style:i===`top`||i===`bottom`?{width:`${this.tabsPadding}px`}:{height:`${this.tabsPadding}px`}}),v?g.map((e,t)=>(c.value.push(e.props.name),Ee(n(Q,Object.assign({},e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0&&(!x||x===`center`||x===`start`||x===`end`)}),e.children?{default:e.children.tab}:void 0)))):_.map((e,t)=>(c.value.push(e.props.name),Ee(t!==0&&!x?Te(e):e))),!a&&o&&y?we(o,(v?g.length:_.length)!==0):null,x?null:n(`div`,{class:`${e}-tabs-scroll-padding`,style:{width:`${this.tabsPadding}px`}}));return n(`div`,{ref:`tabsElRef`,class:`${e}-tabs-nav-scroll-content`},y&&o?n(r,{onResize:this.handleTabsResize},{default:()=>t}):t,y?n(`div`,{class:`${e}-tabs-pad`}):null,y?null:n(`div`,{ref:`barElRef`,class:`${e}-tabs-bar`}))},C=b?`top`:i;return n(`div`,{class:[`${e}-tabs`,this.themeClass,`${e}-tabs--${t}-type`,`${e}-tabs--${s}-size`,x&&`${e}-tabs--flex`,`${e}-tabs--${C}`],style:this.cssVars},n(`div`,{class:[`${e}-tabs-nav--${t}-type`,`${e}-tabs-nav--${C}`,`${e}-tabs-nav`]},d(m,t=>t&&n(`div`,{class:`${e}-tabs-nav__prefix`},t)),b?n(r,{onResize:this.handleSegmentResize},{default:()=>n(`div`,{class:`${e}-tabs-rail`,ref:`tabsElRef`},n(`div`,{class:`${e}-tabs-capsule`,ref:`segmentCapsuleElRef`},n(`div`,{class:`${e}-tabs-wrapper`},n(`div`,{class:`${e}-tabs-tab`}))),v?g.map((e,t)=>(c.value.push(e.props.name),n(Q,Object.assign({},e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0}),e.children?{default:e.children.tab}:void 0))):_.map((e,t)=>(c.value.push(e.props.name),t===0?e:Te(e))))}):n(r,{onResize:this.handleNavResize},{default:()=>n(`div`,{class:`${e}-tabs-nav-scroll-wrapper`,ref:`scrollWrapperElRef`},[`top`,`bottom`].includes(C)?n(ce,{ref:`xScrollInstRef`,onScroll:this.handleScroll},{default:S}):n(`div`,{class:`${e}-tabs-nav-y-scroll`,onScroll:this.handleScroll,ref:`yScrollElRef`},S()))}),a&&o&&y?we(o,!0):null,d(h,t=>t&&n(`div`,{class:`${e}-tabs-nav__suffix`},t))),v&&(this.animated&&(C===`top`||C===`bottom`)?n(`div`,{ref:`tabsPaneWrapperRef`,style:f,class:[`${e}-tabs-pane-wrapper`,u]},$(g,this.mergedValue,this.renderedNames,this.onAnimationBeforeLeave,this.onAnimationEnter,this.onAnimationAfterEnter,this.animationDirection)):$(g,this.mergedValue,this.renderedNames)))}});function $(e,t,r,a,o,s,c){let l=[];return e.forEach(e=>{let{name:n,displayDirective:a,"display-directive":o}=e.props,s=e=>a===e||o===e,c=t===n;if(e.key!==void 0&&(e.key=n),c||s(`show`)||s(`show:lazy`)&&r.has(n)){r.has(n)||r.add(n);let t=!s(`if`);l.push(t?P(e,[[i,c]]):e)}}),c?n(ne,{name:`${c}-transition`,onBeforeLeave:a,onEnter:o,onAfterEnter:s},{default:()=>l}):l}function we(e,t){return n(Q,{ref:`addTabInstRef`,key:`__addable`,name:`__addable`,internalCreatedByPane:!0,internalAddable:!0,internalLeftPadded:t,disabled:typeof e==`object`&&e.disabled})}function Te(e){let n=t(e);return n.props?n.props.internalLeftPadded=!0:n.props={internalLeftPadded:!0},n}function Ee(e){return Array.isArray(e.dynamicProps)?e.dynamicProps.includes(`internalLeftPadded`)||e.dynamicProps.push(`internalLeftPadded`):e.dynamicProps=[`internalLeftPadded`],e}export{Z as n,Ce as t};