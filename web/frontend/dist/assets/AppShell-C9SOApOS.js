import{Bn as e,Cn as t,D as n,Dt as r,E as i,Fn as a,Ft as o,Gn as s,Gt as c,In as l,Jn as u,Jt as d,Mn as f,Nn as p,O as m,Sn as h,St as g,Wt as _,Zn as v,_ as y,_n as b,c as x,er as S,fn as C,gn as w,h as T,hn as E,kt as D,l as ee,lt as O,mn as te,p as k,pn as A,qt as j,t as ne,ut as M,vn as N,xn as P,yn as F,yt as I}from"./auth-CPbU0tuF.js";import{n as L,r as R,t as re}from"./_plugin-vue_export-helper-fnLlD4xv.js";import{t as ie}from"./light-CrwNniba.js";function ae(e,t){return C(()=>{for(let n of t)if(e[n]!==void 0)return e[n];return e[t[t.length-1]]})}var z=F({name:`ChevronRight`,render(){return P(`svg`,{viewBox:`0 0 16 16`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},P(`path`,{d:`M5.64645 3.14645C5.45118 3.34171 5.45118 3.65829 5.64645 3.85355L9.79289 8L5.64645 12.1464C5.45118 12.3417 5.45118 12.6583 5.64645 12.8536C5.84171 13.0488 6.15829 13.0488 6.35355 12.8536L10.8536 8.35355C11.0488 8.15829 11.0488 7.84171 10.8536 7.64645L6.35355 3.14645C6.15829 2.95118 5.84171 2.95118 5.64645 3.14645Z`,fill:`currentColor`}))}}),oe=c(`icon`,`
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
`,[d(`color-transition`,{transition:`color .3s var(--n-bezier)`}),d(`depth`,{color:`var(--n-color)`},[_(`svg`,{opacity:`var(--n-opacity)`,transition:`opacity .3s var(--n-bezier)`})]),_(`svg`,{height:`1em`,width:`1em`})]),se=Object.assign(Object.assign({},m.props),{depth:[String,Number],size:[Number,String],color:String,component:[Object,Function]}),B=F({_n_icon__:!0,name:`Icon`,inheritAttrs:!1,props:se,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n}=M(e),r=m(`Icon`,`-icon`,oe,ie,e,t),i=C(()=>{let{depth:t}=e,{common:{cubicBezierEaseInOut:n},self:i}=r.value;if(t!==void 0){let{color:e,[`opacity${t}Depth`]:r}=i;return{"--n-bezier":n,"--n-color":e,"--n-opacity":r}}return{"--n-bezier":n,"--n-color":``,"--n-opacity":``}}),a=n?O(`icon`,C(()=>`${e.depth||`d`}`),i,e):void 0;return{mergedClsPrefix:t,mergedStyle:C(()=>{let{size:t,color:n}=e;return{fontSize:L(t),color:n}}),cssVars:n?void 0:i,themeClass:a?.themeClass,onRender:a?.onRender}},render(){let{$parent:e,depth:n,mergedClsPrefix:r,component:i,onRender:a,themeClass:o}=this;return e?.$options?._n_icon__&&g(`icon`,"don't wrap `n-icon` inside `n-icon`"),a?.(),P(`i`,t(this.$attrs,{role:`img`,class:[`${r}-icon`,o,{[`${r}-icon--depth`]:n,[`${r}-icon--color-transition`]:n!==void 0}],style:[this.cssVars,this.mergedStyle]}),i?P(i):this.$slots)}});function ce(e){let{baseColor:t,textColor2:n,bodyColor:r,cardColor:i,dividerColor:a,actionColor:s,scrollbarColor:c,scrollbarColorHover:l,invertedColor:u}=e;return{textColor:n,textColorInverted:`#FFF`,color:r,colorEmbedded:s,headerColor:i,headerColorInverted:u,footerColor:s,footerColorInverted:u,headerBorderColor:a,headerBorderColorInverted:u,footerBorderColor:a,footerBorderColorInverted:u,siderBorderColor:a,siderBorderColorInverted:u,siderColor:i,siderColorInverted:u,siderToggleButtonBorder:`1px solid ${a}`,siderToggleButtonColor:t,siderToggleButtonIconColor:n,siderToggleButtonIconColorInverted:n,siderToggleBarColor:o(r,c),siderToggleBarColorHover:o(r,l),__invertScrollbar:`true`}}var V=n({name:`Layout`,common:y,peers:{Scrollbar:T},self:ce}),H=D(`n-layout-sider`),U={type:String,default:`static`},W=c(`layout`,`
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
`,[c(`layout-scroll-container`,`
 overflow-x: hidden;
 box-sizing: border-box;
 height: 100%;
 `),d(`absolute-positioned`,`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),G={embedded:Boolean,position:U,nativeScrollbar:{type:Boolean,default:!0},scrollbarProps:Object,onScroll:Function,contentClass:String,contentStyle:{type:[String,Object],default:``},hasSider:Boolean,siderPlacement:{type:String,default:`left`}},K=D(`n-layout`);function q(e){return F({name:e?`LayoutContent`:`Layout`,props:Object.assign(Object.assign({},m.props),G),setup(e){let t=s(null),n=s(null),{mergedClsPrefixRef:i,inlineThemeDisabled:a}=M(e),o=m(`Layout`,`-layout`,W,V,e,i);function c(r,i){if(e.nativeScrollbar){let{value:e}=t;e&&(i===void 0?e.scrollTo(r):e.scrollTo(r,i))}else{let{value:e}=n;e&&e.scrollTo(r,i)}}p(K,e);let l=0,u=0,d=t=>{var n;let r=t.target;l=r.scrollLeft,u=r.scrollTop,(n=e.onScroll)==null||n.call(e,t)};r(()=>{if(e.nativeScrollbar){let e=t.value;e&&(e.scrollTop=u,e.scrollLeft=l)}});let f={display:`flex`,flexWrap:`nowrap`,width:`100%`,flexDirection:`row`},h={scrollTo:c},g=C(()=>{let{common:{cubicBezierEaseInOut:t},self:n}=o.value;return{"--n-bezier":t,"--n-color":e.embedded?n.colorEmbedded:n.color,"--n-text-color":n.textColor}}),_=a?O(`layout`,C(()=>e.embedded?`e`:``),g,e):void 0;return Object.assign({mergedClsPrefix:i,scrollableElRef:t,scrollbarInstRef:n,hasSiderStyle:f,mergedTheme:o,handleNativeElScroll:d,cssVars:a?void 0:g,themeClass:_?.themeClass,onRender:_?.onRender},h)},render(){var t;let{mergedClsPrefix:n,hasSider:r}=this;(t=this.onRender)==null||t.call(this);let i=r?this.hasSiderStyle:void 0,a=[this.themeClass,e&&`${n}-layout-content`,`${n}-layout`,`${n}-layout--${this.position}-positioned`];return P(`div`,{class:a,style:this.cssVars},this.nativeScrollbar?P(`div`,{ref:`scrollableElRef`,class:[`${n}-layout-scroll-container`,this.contentClass],style:[this.contentStyle,i],onScroll:this.handleNativeElScroll},this.$slots):P(k,Object.assign({},this.scrollbarProps,{onScroll:this.onScroll,ref:`scrollbarInstRef`,theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar,contentClass:this.contentClass,contentStyle:[this.contentStyle,i]}),this.$slots))}})}var J=q(!1),le=q(!0),ue=c(`layout-header`,`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 box-sizing: border-box;
 width: 100%;
 background-color: var(--n-color);
 color: var(--n-text-color);
`,[d(`absolute-positioned`,`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 `),d(`bordered`,`
 border-bottom: solid 1px var(--n-border-color);
 `)]),de={position:U,inverted:Boolean,bordered:{type:Boolean,default:!1}},fe=F({name:`LayoutHeader`,props:Object.assign(Object.assign({},m.props),de),setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n}=M(e),r=m(`Layout`,`-layout-header`,ue,V,e,t),i=C(()=>{let{common:{cubicBezierEaseInOut:t},self:n}=r.value,i={"--n-bezier":t};return e.inverted?(i[`--n-color`]=n.headerColorInverted,i[`--n-text-color`]=n.textColorInverted,i[`--n-border-color`]=n.headerBorderColorInverted):(i[`--n-color`]=n.headerColor,i[`--n-text-color`]=n.textColor,i[`--n-border-color`]=n.headerBorderColor),i}),a=n?O(`layout-header`,C(()=>e.inverted?`a`:`b`),i,e):void 0;return{mergedClsPrefix:t,cssVars:n?void 0:i,themeClass:a?.themeClass,onRender:a?.onRender}},render(){var e;let{mergedClsPrefix:t}=this;return(e=this.onRender)==null||e.call(this),P(`div`,{class:[`${t}-layout-header`,this.themeClass,this.position&&`${t}-layout-header--${this.position}-positioned`,this.bordered&&`${t}-layout-header--bordered`],style:this.cssVars},this.$slots)}}),pe=c(`layout-sider`,`
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
`,[d(`bordered`,[j(`border`,`
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 width: 1px;
 background-color: var(--n-border-color);
 transition: background-color .3s var(--n-bezier);
 `)]),j(`left-placement`,[d(`bordered`,[j(`border`,`
 right: 0;
 `)])]),d(`right-placement`,`
 justify-content: flex-start;
 `,[d(`bordered`,[j(`border`,`
 left: 0;
 `)]),d(`collapsed`,[c(`layout-toggle-button`,[c(`base-icon`,`
 transform: rotate(180deg);
 `)]),c(`layout-toggle-bar`,[_(`&:hover`,[j(`top`,{transform:`rotate(-12deg) scale(1.15) translateY(-2px)`}),j(`bottom`,{transform:`rotate(12deg) scale(1.15) translateY(2px)`})])])]),c(`layout-toggle-button`,`
 left: 0;
 transform: translateX(-50%) translateY(-50%);
 `,[c(`base-icon`,`
 transform: rotate(0);
 `)]),c(`layout-toggle-bar`,`
 left: -28px;
 transform: rotate(180deg);
 `,[_(`&:hover`,[j(`top`,{transform:`rotate(12deg) scale(1.15) translateY(-2px)`}),j(`bottom`,{transform:`rotate(-12deg) scale(1.15) translateY(2px)`})])])]),d(`collapsed`,[c(`layout-toggle-bar`,[_(`&:hover`,[j(`top`,{transform:`rotate(-12deg) scale(1.15) translateY(-2px)`}),j(`bottom`,{transform:`rotate(12deg) scale(1.15) translateY(2px)`})])]),c(`layout-toggle-button`,[c(`base-icon`,`
 transform: rotate(0);
 `)])]),c(`layout-toggle-button`,`
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
 `,[c(`base-icon`,`
 transition: transform .3s var(--n-bezier);
 transform: rotate(180deg);
 `)]),c(`layout-toggle-bar`,`
 cursor: pointer;
 height: 72px;
 width: 32px;
 position: absolute;
 top: calc(50% - 36px);
 right: -28px;
 `,[j(`top, bottom`,`
 position: absolute;
 width: 4px;
 border-radius: 2px;
 height: 38px;
 left: 14px;
 transition: 
 background-color .3s var(--n-bezier),
 transform .3s var(--n-bezier);
 `),j(`bottom`,`
 position: absolute;
 top: 34px;
 `),_(`&:hover`,[j(`top`,{transform:`rotate(12deg) scale(1.15) translateY(-2px)`}),j(`bottom`,{transform:`rotate(-12deg) scale(1.15) translateY(2px)`})]),j(`top, bottom`,{backgroundColor:`var(--n-toggle-bar-color)`}),_(`&:hover`,[j(`top, bottom`,{backgroundColor:`var(--n-toggle-bar-color-hover)`})])]),j(`border`,`
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 width: 1px;
 transition: background-color .3s var(--n-bezier);
 `),c(`layout-sider-scroll-container`,`
 flex-grow: 1;
 flex-shrink: 0;
 box-sizing: border-box;
 height: 100%;
 opacity: 0;
 transition: opacity .3s var(--n-bezier);
 max-width: 100%;
 `),d(`show-content`,[c(`layout-sider-scroll-container`,{opacity:1})]),d(`absolute-positioned`,`
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 `)]),me=F({props:{clsPrefix:{type:String,required:!0},onClick:Function},render(){let{clsPrefix:e}=this;return P(`div`,{onClick:this.onClick,class:`${e}-layout-toggle-bar`},P(`div`,{class:`${e}-layout-toggle-bar__top`}),P(`div`,{class:`${e}-layout-toggle-bar__bottom`}))}}),he=F({name:`LayoutToggleButton`,props:{clsPrefix:{type:String,required:!0},onClick:Function},render(){let{clsPrefix:e}=this;return P(`div`,{class:`${e}-layout-toggle-button`,onClick:this.onClick},P(i,{clsPrefix:e},{default:()=>P(z,null)}))}}),ge={position:U,bordered:Boolean,collapsedWidth:{type:Number,default:48},width:{type:[Number,String],default:272},contentClass:String,contentStyle:{type:[String,Object],default:``},collapseMode:{type:String,default:`transform`},collapsed:{type:Boolean,default:void 0},defaultCollapsed:Boolean,showCollapsedContent:{type:Boolean,default:!0},showTrigger:{type:[Boolean,String],default:!1},nativeScrollbar:{type:Boolean,default:!0},inverted:Boolean,scrollbarProps:Object,triggerClass:String,triggerStyle:[String,Object],collapsedTriggerClass:String,collapsedTriggerStyle:[String,Object],"onUpdate:collapsed":[Function,Array],onUpdateCollapsed:[Function,Array],onAfterEnter:Function,onAfterLeave:Function,onExpand:[Function,Array],onCollapse:[Function,Array],onScroll:Function},_e=F({name:`LayoutSider`,props:Object.assign(Object.assign({},m.props),ge),setup(e){let t=h(K),n=s(null),i=s(null),a=s(e.defaultCollapsed),o=R(u(e,`collapsed`),a),c=C(()=>L(o.value?e.collapsedWidth:e.width)),l=C(()=>e.collapseMode===`transform`?{minWidth:L(e.width)}:{}),d=C(()=>t?t.siderPlacement:`left`);function f(t,r){if(e.nativeScrollbar){let{value:e}=n;e&&(r===void 0?e.scrollTo(t):e.scrollTo(t,r))}else{let{value:e}=i;e&&e.scrollTo(t,r)}}function g(){let{"onUpdate:collapsed":t,onUpdateCollapsed:n,onExpand:r,onCollapse:i}=e,{value:s}=o;n&&I(n,!s),t&&I(t,!s),a.value=!s,s?r&&I(r):i&&I(i)}let _=0,v=0,y=t=>{var n;let r=t.target;_=r.scrollLeft,v=r.scrollTop,(n=e.onScroll)==null||n.call(e,t)};r(()=>{if(e.nativeScrollbar){let e=n.value;e&&(e.scrollTop=v,e.scrollLeft=_)}}),p(H,{collapsedRef:o,collapseModeRef:u(e,`collapseMode`)});let{mergedClsPrefixRef:b,inlineThemeDisabled:x}=M(e),S=m(`Layout`,`-layout-sider`,pe,V,e,b);function w(t){var n,r;t.propertyName===`max-width`&&(o.value?(n=e.onAfterLeave)==null||n.call(e):(r=e.onAfterEnter)==null||r.call(e))}let T={scrollTo:f},E=C(()=>{let{common:{cubicBezierEaseInOut:t},self:n}=S.value,{siderToggleButtonColor:r,siderToggleButtonBorder:i,siderToggleBarColor:a,siderToggleBarColorHover:o}=n,s={"--n-bezier":t,"--n-toggle-button-color":r,"--n-toggle-button-border":i,"--n-toggle-bar-color":a,"--n-toggle-bar-color-hover":o};return e.inverted?(s[`--n-color`]=n.siderColorInverted,s[`--n-text-color`]=n.textColorInverted,s[`--n-border-color`]=n.siderBorderColorInverted,s[`--n-toggle-button-icon-color`]=n.siderToggleButtonIconColorInverted,s.__invertScrollbar=n.__invertScrollbar):(s[`--n-color`]=n.siderColor,s[`--n-text-color`]=n.textColor,s[`--n-border-color`]=n.siderBorderColor,s[`--n-toggle-button-icon-color`]=n.siderToggleButtonIconColor),s}),D=x?O(`layout-sider`,C(()=>e.inverted?`a`:`b`),E,e):void 0;return Object.assign({scrollableElRef:n,scrollbarInstRef:i,mergedClsPrefix:b,mergedTheme:S,styleMaxWidth:c,mergedCollapsed:o,scrollContainerStyle:l,siderPlacement:d,handleNativeElScroll:y,handleTransitionend:w,handleTriggerClick:g,inlineThemeDisabled:x,cssVars:E,themeClass:D?.themeClass,onRender:D?.onRender},T)},render(){var e;let{mergedClsPrefix:t,mergedCollapsed:n,showTrigger:r}=this;return(e=this.onRender)==null||e.call(this),P(`aside`,{class:[`${t}-layout-sider`,this.themeClass,`${t}-layout-sider--${this.position}-positioned`,`${t}-layout-sider--${this.siderPlacement}-placement`,this.bordered&&`${t}-layout-sider--bordered`,n&&`${t}-layout-sider--collapsed`,(!n||this.showCollapsedContent)&&`${t}-layout-sider--show-content`],onTransitionend:this.handleTransitionend,style:[this.inlineThemeDisabled?void 0:this.cssVars,{maxWidth:this.styleMaxWidth,width:L(this.width)}]},this.nativeScrollbar?P(`div`,{class:[`${t}-layout-sider-scroll-container`,this.contentClass],onScroll:this.handleNativeElScroll,style:[this.scrollContainerStyle,{overflow:`auto`},this.contentStyle],ref:`scrollableElRef`},this.$slots):P(k,Object.assign({},this.scrollbarProps,{onScroll:this.onScroll,ref:`scrollbarInstRef`,style:this.scrollContainerStyle,contentStyle:this.contentStyle,contentClass:this.contentClass,theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar,builtinThemeOverrides:this.inverted&&this.cssVars.__invertScrollbar===`true`?{colorHover:`rgba(255, 255, 255, .4)`,color:`rgba(255, 255, 255, .3)`}:void 0}),this.$slots),r?P(r===`bar`?me:he,{clsPrefix:t,class:n?this.collapsedTriggerClass:this.triggerClass,style:n?this.collapsedTriggerStyle:this.triggerStyle,onClick:this.handleTriggerClick}):null,this.bordered?P(`div`,{class:`${t}-layout-sider__border`}):null)}}),Y=e=>e===``,ve=(...e)=>e.filter((e,t,n)=>!!e&&e.trim()!==``&&n.indexOf(e)===t).join(` `).trim(),X=e=>e.replace(/([a-z0-9])([A-Z])/g,`$1-$2`).toLowerCase(),ye=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,n)=>n?n.toUpperCase():t.toLowerCase()),be=e=>{let t=ye(e);return t.charAt(0).toUpperCase()+t.slice(1)},Z={xmlns:`http://www.w3.org/2000/svg`,width:24,height:24,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":2,"stroke-linecap":`round`,"stroke-linejoin":`round`},xe=Symbol(`lucide-icons`);function Se(){return h(xe,{})}var Ce=({name:e,iconNode:t,"icon-node":n,absoluteStrokeWidth:r,"absolute-stroke-width":i,strokeWidth:a,"stroke-width":o,size:s,color:c,...l},{slots:u})=>{let{size:d,color:f,strokeWidth:p=2,absoluteStrokeWidth:m=!1,class:h=``}=Se(),g=C(()=>{let e=Y(r)||Y(i)||r===!0||i===!0||m===!0,t=a||o||p||Z[`stroke-width`];return e?Number(t)*24/Number(s??d??Z.width):t});return P(`svg`,{...Z,...l,width:s??d??Z.width,height:s??d??Z.height,stroke:c??f??Z.stroke,"stroke-width":g.value,class:ve(`lucide`,h,...e?[`lucide-${X(be(e))}-icon`,`lucide-${X(e)}`]:[`lucide-icon`])},[...(t??n??[]).map(e=>P(...e)),...u.default?[u.default()]:[]])},Q=(e,t)=>(n,{slots:r,attrs:i})=>P(Ce,{...i,...n,iconNode:t,name:e},r.default?{default:r.default}:void 0),we=Q(`box`,[[`path`,{d:`M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z`,key:`hh9hay`}],[`path`,{d:`m3.3 7 8.7 5 8.7-5`,key:`g66t2b`}],[`path`,{d:`M12 22V12`,key:`d0xqtd`}]]),Te=Q(`folder-open`,[[`path`,{d:`m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2`,key:`usdka0`}]]),Ee=Q(`layout-dashboard`,[[`rect`,{width:`7`,height:`9`,x:`3`,y:`3`,rx:`1`,key:`10lvy0`}],[`rect`,{width:`7`,height:`5`,x:`14`,y:`3`,rx:`1`,key:`16une8`}],[`rect`,{width:`7`,height:`9`,x:`14`,y:`12`,rx:`1`,key:`1hutg5`}],[`rect`,{width:`7`,height:`5`,x:`3`,y:`16`,rx:`1`,key:`ldoo1y`}]]),De=Q(`log-out`,[[`path`,{d:`m16 17 5-5-5-5`,key:`1bji2h`}],[`path`,{d:`M21 12H9`,key:`dn1m92`}],[`path`,{d:`M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4`,key:`1uf3rs`}]]),$=Q(`server`,[[`rect`,{width:`20`,height:`8`,x:`2`,y:`2`,rx:`2`,ry:`2`,key:`ngkwjq`}],[`rect`,{width:`20`,height:`8`,x:`2`,y:`14`,rx:`2`,ry:`2`,key:`iecqi9`}],[`line`,{x1:`6`,x2:`6.01`,y1:`6`,y2:`6`,key:`16zg32`}],[`line`,{x1:`6`,x2:`6.01`,y1:`18`,y2:`18`,key:`nzw8ys`}]]),Oe={class:`brand`},ke={class:`side-nav`},Ae={key:0},je={key:0},Me={key:0},Ne={key:0},Pe={class:`user`},Fe=re(F({__name:`AppShell`,setup(t){let n=ne(),r=x(),i=s(!1);async function o(){await n.logout(),r.push(`/login`)}return(t,r)=>{let s=l(`RouterLink`);return f(),te(v(J),{"has-sider":``,style:{height:`100vh`}},{default:e(()=>[N(v(_e),{bordered:``,width:220,"collapsed-width":64,collapsible:``,collapsed:i.value,"onUpdate:collapsed":r[0]||=e=>i.value=e},{default:e(()=>[A(`div`,Oe,S(i.value?`T`:`TarkimanOS`),1),A(`nav`,ke,[N(s,{to:`/`,class:`side-nav-item`,"active-class":`active`},{default:e(()=>[N(v(B),{component:v(Ee),size:`18`},null,8,[`component`]),i.value?E(``,!0):(f(),w(`span`,Ae,`Dashboard`))]),_:1}),N(s,{to:`/docker`,class:`side-nav-item`,"active-class":`active`},{default:e(()=>[N(v(B),{component:v(we),size:`18`},null,8,[`component`]),i.value?E(``,!0):(f(),w(`span`,je,`Docker`))]),_:1}),N(s,{to:`/services`,class:`side-nav-item`,"active-class":`active`},{default:e(()=>[N(v(B),{component:v($),size:`18`},null,8,[`component`]),i.value?E(``,!0):(f(),w(`span`,Me,`Service`))]),_:1}),N(s,{to:`/files`,class:`side-nav-item`,"active-class":`active`},{default:e(()=>[N(v(B),{component:v(Te),size:`18`},null,8,[`component`]),i.value?E(``,!0):(f(),w(`span`,Ne,`Files`))]),_:1})])]),_:1},8,[`collapsed`]),N(v(J),null,{default:e(()=>[N(v(fe),{bordered:``,class:`topbar`},{default:e(()=>[r[2]||=A(`span`,{class:`spacer`},null,-1),A(`span`,Pe,S(v(n).username),1),N(v(ee),{quaternary:``,size:`small`,onClick:o},{icon:e(()=>[N(v(B),{component:v(De)},null,8,[`component`])]),default:e(()=>[r[1]||=b(` Keluar `,-1)]),_:1})]),_:1}),N(v(le),{class:`content`},{default:e(()=>[a(t.$slots,`default`,{},void 0,!0)]),_:3})]),_:3})]),_:3})}}}),[[`__scopeId`,`data-v-cb2444be`]]);export{ae as a,z as i,Q as n,B as r,Fe as t};