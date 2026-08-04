import{An as e,Cn as t,D as n,Dt as r,E as i,Ft as a,Gt as o,In as s,Jt as c,Kn as l,Ln as u,Nn as d,O as f,Pn as p,Qn as m,Sn as h,St as g,Vn as _,Wt as v,Yn as y,_ as b,_n as x,bn as S,c as C,gn as w,h as T,hn as E,kt as D,l as ee,lt as O,mn as k,p as A,pn as j,qt as M,r as te,t as N,tn as ne,tr as P,ut as F,vn as re,wn as ie,yn as I,yt as L}from"./auth-CKvW4zla.js";import{n as R,r as ae,t as oe}from"./_plugin-vue_export-helper-CvyeNErQ.js";import{t as se}from"./light-D3KYNMdO.js";function ce(e,t){return j(()=>{for(let n of t)if(e[n]!==void 0)return e[n];return e[t[t.length-1]]})}var z=S({name:`ChevronRight`,render(){return h(`svg`,{viewBox:`0 0 16 16`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},h(`path`,{d:`M5.64645 3.14645C5.45118 3.34171 5.45118 3.65829 5.64645 3.85355L9.79289 8L5.64645 12.1464C5.45118 12.3417 5.45118 12.6583 5.64645 12.8536C5.84171 13.0488 6.15829 13.0488 6.35355 12.8536L10.8536 8.35355C11.0488 8.15829 11.0488 7.84171 10.8536 7.64645L6.35355 3.14645C6.15829 2.95118 5.84171 2.95118 5.64645 3.14645Z`,fill:`currentColor`}))}}),le=o(`icon`,`
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
`,[c(`color-transition`,{transition:`color .3s var(--n-bezier)`}),c(`depth`,{color:`var(--n-color)`},[v(`svg`,{opacity:`var(--n-opacity)`,transition:`opacity .3s var(--n-bezier)`})]),v(`svg`,{height:`1em`,width:`1em`})]),ue=Object.assign(Object.assign({},f.props),{depth:[String,Number],size:[Number,String],color:String,component:[Object,Function]}),B=S({_n_icon__:!0,name:`Icon`,inheritAttrs:!1,props:ue,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n}=F(e),r=f(`Icon`,`-icon`,le,se,e,t),i=j(()=>{let{depth:t}=e,{common:{cubicBezierEaseInOut:n},self:i}=r.value;if(t!==void 0){let{color:e,[`opacity${t}Depth`]:r}=i;return{"--n-bezier":n,"--n-color":e,"--n-opacity":r}}return{"--n-bezier":n,"--n-color":``,"--n-opacity":``}}),a=n?O(`icon`,j(()=>`${e.depth||`d`}`),i,e):void 0;return{mergedClsPrefix:t,mergedStyle:j(()=>{let{size:t,color:n}=e;return{fontSize:R(t),color:n}}),cssVars:n?void 0:i,themeClass:a?.themeClass,onRender:a?.onRender}},render(){let{$parent:e,depth:t,mergedClsPrefix:n,component:r,onRender:i,themeClass:a}=this;return e?.$options?._n_icon__&&g(`icon`,"don't wrap `n-icon` inside `n-icon`"),i?.(),h(`i`,ie(this.$attrs,{role:`img`,class:[`${n}-icon`,a,{[`${n}-icon--depth`]:t,[`${n}-icon--color-transition`]:t!==void 0}],style:[this.cssVars,this.mergedStyle]}),r?h(r):this.$slots)}});function V(e){let{baseColor:t,textColor2:n,bodyColor:r,cardColor:i,dividerColor:o,actionColor:s,scrollbarColor:c,scrollbarColorHover:l,invertedColor:u}=e;return{textColor:n,textColorInverted:`#FFF`,color:r,colorEmbedded:s,headerColor:i,headerColorInverted:u,footerColor:s,footerColorInverted:u,headerBorderColor:o,headerBorderColorInverted:u,footerBorderColor:o,footerBorderColorInverted:u,siderBorderColor:o,siderBorderColorInverted:u,siderColor:i,siderColorInverted:u,siderToggleButtonBorder:`1px solid ${o}`,siderToggleButtonColor:t,siderToggleButtonIconColor:n,siderToggleButtonIconColorInverted:n,siderToggleBarColor:a(r,c),siderToggleBarColorHover:a(r,l),__invertScrollbar:`true`}}var H=n({name:`Layout`,common:b,peers:{Scrollbar:T},self:V}),U=D(`n-layout-sider`),W={type:String,default:`static`},de=o(`layout`,`
 color: var(--n-text-color);
 background-color: var(--n-color);
 box-sizing: border-box;
 position: relative;
 z-index: auto;
 flex: auto;
 overflow: hidden;
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
`,[o(`layout-scroll-container`,`
 overflow-x: hidden;
 box-sizing: border-box;
 height: 100%;
 `),c(`absolute-positioned`,`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),fe={embedded:Boolean,position:W,nativeScrollbar:{type:Boolean,default:!0},scrollbarProps:Object,onScroll:Function,contentClass:String,contentStyle:{type:[String,Object],default:``},hasSider:Boolean,siderPlacement:{type:String,default:`left`}},G=D(`n-layout`);function K(e){return S({name:e?`LayoutContent`:`Layout`,props:Object.assign(Object.assign({},f.props),fe),setup(e){let t=l(null),n=l(null),{mergedClsPrefixRef:i,inlineThemeDisabled:a}=F(e),o=f(`Layout`,`-layout`,de,H,e,i);function s(r,i){if(e.nativeScrollbar){let{value:e}=t;e&&(i===void 0?e.scrollTo(r):e.scrollTo(r,i))}else{let{value:e}=n;e&&e.scrollTo(r,i)}}p(G,e);let c=0,u=0,d=t=>{var n;let r=t.target;c=r.scrollLeft,u=r.scrollTop,(n=e.onScroll)==null||n.call(e,t)};r(()=>{if(e.nativeScrollbar){let e=t.value;e&&(e.scrollTop=u,e.scrollLeft=c)}});let m={display:`flex`,flexWrap:`nowrap`,width:`100%`,flexDirection:`row`},h={scrollTo:s},g=j(()=>{let{common:{cubicBezierEaseInOut:t},self:n}=o.value;return{"--n-bezier":t,"--n-color":e.embedded?n.colorEmbedded:n.color,"--n-text-color":n.textColor}}),_=a?O(`layout`,j(()=>e.embedded?`e`:``),g,e):void 0;return Object.assign({mergedClsPrefix:i,scrollableElRef:t,scrollbarInstRef:n,hasSiderStyle:m,mergedTheme:o,handleNativeElScroll:d,cssVars:a?void 0:g,themeClass:_?.themeClass,onRender:_?.onRender},h)},render(){var t;let{mergedClsPrefix:n,hasSider:r}=this;(t=this.onRender)==null||t.call(this);let i=r?this.hasSiderStyle:void 0,a=[this.themeClass,e&&`${n}-layout-content`,`${n}-layout`,`${n}-layout--${this.position}-positioned`];return h(`div`,{class:a,style:this.cssVars},this.nativeScrollbar?h(`div`,{ref:`scrollableElRef`,class:[`${n}-layout-scroll-container`,this.contentClass],style:[this.contentStyle,i],onScroll:this.handleNativeElScroll},this.$slots):h(A,Object.assign({},this.scrollbarProps,{onScroll:this.onScroll,ref:`scrollbarInstRef`,theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar,contentClass:this.contentClass,contentStyle:[this.contentStyle,i]}),this.$slots))}})}var q=K(!1),pe=K(!0),me=o(`layout-header`,`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 box-sizing: border-box;
 width: 100%;
 background-color: var(--n-color);
 color: var(--n-text-color);
`,[c(`absolute-positioned`,`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 `),c(`bordered`,`
 border-bottom: solid 1px var(--n-border-color);
 `)]),he={position:W,inverted:Boolean,bordered:{type:Boolean,default:!1}},ge=S({name:`LayoutHeader`,props:Object.assign(Object.assign({},f.props),he),setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n}=F(e),r=f(`Layout`,`-layout-header`,me,H,e,t),i=j(()=>{let{common:{cubicBezierEaseInOut:t},self:n}=r.value,i={"--n-bezier":t};return e.inverted?(i[`--n-color`]=n.headerColorInverted,i[`--n-text-color`]=n.textColorInverted,i[`--n-border-color`]=n.headerBorderColorInverted):(i[`--n-color`]=n.headerColor,i[`--n-text-color`]=n.textColor,i[`--n-border-color`]=n.headerBorderColor),i}),a=n?O(`layout-header`,j(()=>e.inverted?`a`:`b`),i,e):void 0;return{mergedClsPrefix:t,cssVars:n?void 0:i,themeClass:a?.themeClass,onRender:a?.onRender}},render(){var e;let{mergedClsPrefix:t}=this;return(e=this.onRender)==null||e.call(this),h(`div`,{class:[`${t}-layout-header`,this.themeClass,this.position&&`${t}-layout-header--${this.position}-positioned`,this.bordered&&`${t}-layout-header--bordered`],style:this.cssVars},this.$slots)}}),_e=o(`layout-sider`,`
 flex-shrink: 0;
 box-sizing: border-box;
 position: relative;
 z-index: 1;
 color: var(--n-text-color);
 transition:
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 min-width .3s var(--n-bezier),
 max-width .3s var(--n-bezier),
 transform .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 background-color: var(--n-color);
 display: flex;
 justify-content: flex-end;
`,[c(`bordered`,[M(`border`,`
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 width: 1px;
 background-color: var(--n-border-color);
 transition: background-color .3s var(--n-bezier);
 `)]),M(`left-placement`,[c(`bordered`,[M(`border`,`
 right: 0;
 `)])]),c(`right-placement`,`
 justify-content: flex-start;
 `,[c(`bordered`,[M(`border`,`
 left: 0;
 `)]),c(`collapsed`,[o(`layout-toggle-button`,[o(`base-icon`,`
 transform: rotate(180deg);
 `)]),o(`layout-toggle-bar`,[v(`&:hover`,[M(`top`,{transform:`rotate(-12deg) scale(1.15) translateY(-2px)`}),M(`bottom`,{transform:`rotate(12deg) scale(1.15) translateY(2px)`})])])]),o(`layout-toggle-button`,`
 left: 0;
 transform: translateX(-50%) translateY(-50%);
 `,[o(`base-icon`,`
 transform: rotate(0);
 `)]),o(`layout-toggle-bar`,`
 left: -28px;
 transform: rotate(180deg);
 `,[v(`&:hover`,[M(`top`,{transform:`rotate(12deg) scale(1.15) translateY(-2px)`}),M(`bottom`,{transform:`rotate(-12deg) scale(1.15) translateY(2px)`})])])]),c(`collapsed`,[o(`layout-toggle-bar`,[v(`&:hover`,[M(`top`,{transform:`rotate(-12deg) scale(1.15) translateY(-2px)`}),M(`bottom`,{transform:`rotate(12deg) scale(1.15) translateY(2px)`})])]),o(`layout-toggle-button`,[o(`base-icon`,`
 transform: rotate(0);
 `)])]),o(`layout-toggle-button`,`
 transition:
 color .3s var(--n-bezier),
 right .3s var(--n-bezier),
 left .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 cursor: pointer;
 width: 24px;
 height: 24px;
 position: absolute;
 top: 50%;
 right: 0;
 border-radius: 50%;
 display: flex;
 align-items: center;
 justify-content: center;
 font-size: 18px;
 color: var(--n-toggle-button-icon-color);
 border: var(--n-toggle-button-border);
 background-color: var(--n-toggle-button-color);
 box-shadow: 0 2px 4px 0px rgba(0, 0, 0, .06);
 transform: translateX(50%) translateY(-50%);
 z-index: 1;
 `,[o(`base-icon`,`
 transition: transform .3s var(--n-bezier);
 transform: rotate(180deg);
 `)]),o(`layout-toggle-bar`,`
 cursor: pointer;
 height: 72px;
 width: 32px;
 position: absolute;
 top: calc(50% - 36px);
 right: -28px;
 `,[M(`top, bottom`,`
 position: absolute;
 width: 4px;
 border-radius: 2px;
 height: 38px;
 left: 14px;
 transition: 
 background-color .3s var(--n-bezier),
 transform .3s var(--n-bezier);
 `),M(`bottom`,`
 position: absolute;
 top: 34px;
 `),v(`&:hover`,[M(`top`,{transform:`rotate(12deg) scale(1.15) translateY(-2px)`}),M(`bottom`,{transform:`rotate(-12deg) scale(1.15) translateY(2px)`})]),M(`top, bottom`,{backgroundColor:`var(--n-toggle-bar-color)`}),v(`&:hover`,[M(`top, bottom`,{backgroundColor:`var(--n-toggle-bar-color-hover)`})])]),M(`border`,`
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 width: 1px;
 transition: background-color .3s var(--n-bezier);
 `),o(`layout-sider-scroll-container`,`
 flex-grow: 1;
 flex-shrink: 0;
 box-sizing: border-box;
 height: 100%;
 opacity: 0;
 transition: opacity .3s var(--n-bezier);
 max-width: 100%;
 `),c(`show-content`,[o(`layout-sider-scroll-container`,{opacity:1})]),c(`absolute-positioned`,`
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 `)]),ve=S({props:{clsPrefix:{type:String,required:!0},onClick:Function},render(){let{clsPrefix:e}=this;return h(`div`,{onClick:this.onClick,class:`${e}-layout-toggle-bar`},h(`div`,{class:`${e}-layout-toggle-bar__top`}),h(`div`,{class:`${e}-layout-toggle-bar__bottom`}))}}),J=S({name:`LayoutToggleButton`,props:{clsPrefix:{type:String,required:!0},onClick:Function},render(){let{clsPrefix:e}=this;return h(`div`,{class:`${e}-layout-toggle-button`,onClick:this.onClick},h(i,{clsPrefix:e},{default:()=>h(z,null)}))}}),ye={position:W,bordered:Boolean,collapsedWidth:{type:Number,default:48},width:{type:[Number,String],default:272},contentClass:String,contentStyle:{type:[String,Object],default:``},collapseMode:{type:String,default:`transform`},collapsed:{type:Boolean,default:void 0},defaultCollapsed:Boolean,showCollapsedContent:{type:Boolean,default:!0},showTrigger:{type:[Boolean,String],default:!1},nativeScrollbar:{type:Boolean,default:!0},inverted:Boolean,scrollbarProps:Object,triggerClass:String,triggerStyle:[String,Object],collapsedTriggerClass:String,collapsedTriggerStyle:[String,Object],"onUpdate:collapsed":[Function,Array],onUpdateCollapsed:[Function,Array],onAfterEnter:Function,onAfterLeave:Function,onExpand:[Function,Array],onCollapse:[Function,Array],onScroll:Function},be=S({name:`LayoutSider`,props:Object.assign(Object.assign({},f.props),ye),setup(e){let n=t(G),i=l(null),a=l(null),o=l(e.defaultCollapsed),s=ae(y(e,`collapsed`),o),c=j(()=>R(s.value?e.collapsedWidth:e.width)),u=j(()=>e.collapseMode===`transform`?{minWidth:R(e.width)}:{}),d=j(()=>n?n.siderPlacement:`left`);function m(t,n){if(e.nativeScrollbar){let{value:e}=i;e&&(n===void 0?e.scrollTo(t):e.scrollTo(t,n))}else{let{value:e}=a;e&&e.scrollTo(t,n)}}function h(){let{"onUpdate:collapsed":t,onUpdateCollapsed:n,onExpand:r,onCollapse:i}=e,{value:a}=s;n&&L(n,!a),t&&L(t,!a),o.value=!a,a?r&&L(r):i&&L(i)}let g=0,_=0,v=t=>{var n;let r=t.target;g=r.scrollLeft,_=r.scrollTop,(n=e.onScroll)==null||n.call(e,t)};r(()=>{if(e.nativeScrollbar){let e=i.value;e&&(e.scrollTop=_,e.scrollLeft=g)}}),p(U,{collapsedRef:s,collapseModeRef:y(e,`collapseMode`)});let{mergedClsPrefixRef:b,inlineThemeDisabled:x}=F(e),S=f(`Layout`,`-layout-sider`,_e,H,e,b);function C(t){var n,r;t.propertyName===`max-width`&&(s.value?(n=e.onAfterLeave)==null||n.call(e):(r=e.onAfterEnter)==null||r.call(e))}let w={scrollTo:m},T=j(()=>{let{common:{cubicBezierEaseInOut:t},self:n}=S.value,{siderToggleButtonColor:r,siderToggleButtonBorder:i,siderToggleBarColor:a,siderToggleBarColorHover:o}=n,s={"--n-bezier":t,"--n-toggle-button-color":r,"--n-toggle-button-border":i,"--n-toggle-bar-color":a,"--n-toggle-bar-color-hover":o};return e.inverted?(s[`--n-color`]=n.siderColorInverted,s[`--n-text-color`]=n.textColorInverted,s[`--n-border-color`]=n.siderBorderColorInverted,s[`--n-toggle-button-icon-color`]=n.siderToggleButtonIconColorInverted,s.__invertScrollbar=n.__invertScrollbar):(s[`--n-color`]=n.siderColor,s[`--n-text-color`]=n.textColor,s[`--n-border-color`]=n.siderBorderColor,s[`--n-toggle-button-icon-color`]=n.siderToggleButtonIconColor),s}),E=x?O(`layout-sider`,j(()=>e.inverted?`a`:`b`),T,e):void 0;return Object.assign({scrollableElRef:i,scrollbarInstRef:a,mergedClsPrefix:b,mergedTheme:S,styleMaxWidth:c,mergedCollapsed:s,scrollContainerStyle:u,siderPlacement:d,handleNativeElScroll:v,handleTransitionend:C,handleTriggerClick:h,inlineThemeDisabled:x,cssVars:T,themeClass:E?.themeClass,onRender:E?.onRender},w)},render(){var e;let{mergedClsPrefix:t,mergedCollapsed:n,showTrigger:r}=this;return(e=this.onRender)==null||e.call(this),h(`aside`,{class:[`${t}-layout-sider`,this.themeClass,`${t}-layout-sider--${this.position}-positioned`,`${t}-layout-sider--${this.siderPlacement}-placement`,this.bordered&&`${t}-layout-sider--bordered`,n&&`${t}-layout-sider--collapsed`,(!n||this.showCollapsedContent)&&`${t}-layout-sider--show-content`],onTransitionend:this.handleTransitionend,style:[this.inlineThemeDisabled?void 0:this.cssVars,{maxWidth:this.styleMaxWidth,width:R(this.width)}]},this.nativeScrollbar?h(`div`,{class:[`${t}-layout-sider-scroll-container`,this.contentClass],onScroll:this.handleNativeElScroll,style:[this.scrollContainerStyle,{overflow:`auto`},this.contentStyle],ref:`scrollableElRef`},this.$slots):h(A,Object.assign({},this.scrollbarProps,{onScroll:this.onScroll,ref:`scrollbarInstRef`,style:this.scrollContainerStyle,contentStyle:this.contentStyle,contentClass:this.contentClass,theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar,builtinThemeOverrides:this.inverted&&this.cssVars.__invertScrollbar===`true`?{colorHover:`rgba(255, 255, 255, .4)`,color:`rgba(255, 255, 255, .3)`}:void 0}),this.$slots),r?h(r===`bar`?ve:J,{clsPrefix:t,class:n?this.collapsedTriggerClass:this.triggerClass,style:n?this.collapsedTriggerStyle:this.triggerStyle,onClick:this.handleTriggerClick}):null,this.bordered?h(`div`,{class:`${t}-layout-sider__border`}):null)}}),Y=e=>e===``,xe=(...e)=>e.filter((e,t,n)=>!!e&&e.trim()!==``&&n.indexOf(e)===t).join(` `).trim(),X=e=>e.replace(/([a-z0-9])([A-Z])/g,`$1-$2`).toLowerCase(),Se=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,n)=>n?n.toUpperCase():t.toLowerCase()),Ce=e=>{let t=Se(e);return t.charAt(0).toUpperCase()+t.slice(1)},Z={xmlns:`http://www.w3.org/2000/svg`,width:24,height:24,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":2,"stroke-linecap":`round`,"stroke-linejoin":`round`},we=Symbol(`lucide-icons`);function Te(){return t(we,{})}var Ee=({name:e,iconNode:t,"icon-node":n,absoluteStrokeWidth:r,"absolute-stroke-width":i,strokeWidth:a,"stroke-width":o,size:s,color:c,...l},{slots:u})=>{let{size:d,color:f,strokeWidth:p=2,absoluteStrokeWidth:m=!1,class:g=``}=Te(),_=j(()=>{let e=Y(r)||Y(i)||r===!0||i===!0||m===!0,t=a||o||p||Z[`stroke-width`];return e?Number(t)*24/Number(s??d??Z.width):t});return h(`svg`,{...Z,...l,width:s??d??Z.width,height:s??d??Z.height,stroke:c??f??Z.stroke,"stroke-width":_.value,class:xe(`lucide`,g,...e?[`lucide-${X(Ce(e))}-icon`,`lucide-${X(e)}`]:[`lucide-icon`])},[...(t??n??[]).map(e=>h(...e)),...u.default?[u.default()]:[]])},Q=(e,t)=>(n,{slots:r,attrs:i})=>h(Ee,{...i,...n,iconNode:t,name:e},r.default?{default:r.default}:void 0),De=Q(`box`,[[`path`,{d:`M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z`,key:`hh9hay`}],[`path`,{d:`m3.3 7 8.7 5 8.7-5`,key:`g66t2b`}],[`path`,{d:`M12 22V12`,key:`d0xqtd`}]]),Oe=Q(`folder-open`,[[`path`,{d:`m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2`,key:`usdka0`}]]),ke=Q(`layout-dashboard`,[[`rect`,{width:`7`,height:`9`,x:`3`,y:`3`,rx:`1`,key:`10lvy0`}],[`rect`,{width:`7`,height:`5`,x:`14`,y:`3`,rx:`1`,key:`16une8`}],[`rect`,{width:`7`,height:`9`,x:`14`,y:`12`,rx:`1`,key:`1hutg5`}],[`rect`,{width:`7`,height:`5`,x:`3`,y:`16`,rx:`1`,key:`ldoo1y`}]]),Ae=Q(`log-out`,[[`path`,{d:`m16 17 5-5-5-5`,key:`1bji2h`}],[`path`,{d:`M21 12H9`,key:`dn1m92`}],[`path`,{d:`M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4`,key:`1uf3rs`}]]),je=Q(`server`,[[`rect`,{width:`20`,height:`8`,x:`2`,y:`2`,rx:`2`,ry:`2`,key:`ngkwjq`}],[`rect`,{width:`20`,height:`8`,x:`2`,y:`14`,rx:`2`,ry:`2`,key:`iecqi9`}],[`line`,{x1:`6`,x2:`6.01`,y1:`6`,y2:`6`,key:`16zg32`}],[`line`,{x1:`6`,x2:`6.01`,y1:`18`,y2:`18`,key:`nzw8ys`}]]),Me=Q(`square-terminal`,[[`path`,{d:`m7 11 2-2-2-2`,key:`1lz0vl`}],[`path`,{d:`M11 13h4`,key:`1p7l4v`}],[`rect`,{width:`18`,height:`18`,x:`3`,y:`3`,rx:`2`,ry:`2`,key:`1m3agn`}]]),$={status:()=>te.get(`/api/terminal/status`)},Ne=ne(`terminal`,{state:()=>({enabled:!1,loaded:!1}),actions:{async ensureLoaded(){if(!this.loaded)try{let e=await $.status();this.enabled=e.enabled}catch{this.enabled=!1}finally{this.loaded=!0}}}}),Pe={class:`brand`},Fe={class:`side-nav`},Ie={key:0},Le={key:0},Re={key:0},ze={key:0},Be={key:0},Ve={class:`user`},He=oe(S({__name:`AppShell`,setup(t){let n=N(),r=Ne(),i=C(),a=l(!1);e(()=>{r.ensureLoaded()});async function o(){await n.logout(),i.push(`/login`)}return(e,t)=>{let i=u(`RouterLink`);return d(),E(m(q),{"has-sider":``,style:{height:`100vh`}},{default:_(()=>[I(m(be),{bordered:``,width:220,"collapsed-width":64,collapsible:``,collapsed:a.value,"onUpdate:collapsed":t[0]||=e=>a.value=e},{default:_(()=>[k(`div`,Pe,P(a.value?`T`:`TarkimanOS`),1),k(`nav`,Fe,[I(i,{to:`/`,class:`side-nav-item`,"active-class":`active`},{default:_(()=>[I(m(B),{component:m(ke),size:`18`},null,8,[`component`]),a.value?w(``,!0):(d(),x(`span`,Ie,`Dashboard`))]),_:1}),I(i,{to:`/docker`,class:`side-nav-item`,"active-class":`active`},{default:_(()=>[I(m(B),{component:m(De),size:`18`},null,8,[`component`]),a.value?w(``,!0):(d(),x(`span`,Le,`Docker`))]),_:1}),I(i,{to:`/services`,class:`side-nav-item`,"active-class":`active`},{default:_(()=>[I(m(B),{component:m(je),size:`18`},null,8,[`component`]),a.value?w(``,!0):(d(),x(`span`,Re,`Service`))]),_:1}),I(i,{to:`/files`,class:`side-nav-item`,"active-class":`active`},{default:_(()=>[I(m(B),{component:m(Oe),size:`18`},null,8,[`component`]),a.value?w(``,!0):(d(),x(`span`,ze,`Files`))]),_:1}),m(r).enabled?(d(),E(i,{key:0,to:`/terminal`,class:`side-nav-item`,"active-class":`active`},{default:_(()=>[I(m(B),{component:m(Me),size:`18`},null,8,[`component`]),a.value?w(``,!0):(d(),x(`span`,Be,`Terminal`))]),_:1})):w(``,!0)])]),_:1},8,[`collapsed`]),I(m(q),null,{default:_(()=>[I(m(ge),{bordered:``,class:`topbar`},{default:_(()=>[t[2]||=k(`span`,{class:`spacer`},null,-1),k(`span`,Ve,P(m(n).username),1),I(m(ee),{quaternary:``,size:`small`,onClick:o},{icon:_(()=>[I(m(B),{component:m(Ae)},null,8,[`component`])]),default:_(()=>[t[1]||=re(` Keluar `,-1)]),_:1})]),_:1}),I(m(pe),{class:`content`},{default:_(()=>[s(e.$slots,`default`,{},void 0,!0)]),_:3})]),_:3})]),_:3})}}}),[[`__scopeId`,`data-v-58ccb902`]]);export{z as a,B as i,$ as n,ce as o,Q as r,He as t};