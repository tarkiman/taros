import{Bt as e,En as t,Gt as n,Ht as r,Jt as i,Kt as a,Nt as o,Pt as s,Rt as c,S as l,Ut as u,Vt as d,Wt as f,Xt as p,_t as m,an as h,b as g,bt as _,cn as v,ct as y,f as b,ft as x,gt as S,ln as C,nt as w,on as T,ot as ee,pn as E,qt as D,s as te,t as O,tt as k,u as ne,vn as A,wn as j,x as re,xn as M,yt as N,zt as P}from"./auth-CDeeRorZ.js";import{C as ie,_ as F,g as I,i as L,n as ae,t as oe,x as R}from"./_plugin-vue_export-helper-B7M-GU9I.js";import{t as se}from"./light-CyxVnNzb.js";var z=[],B=new WeakMap;function ce(){z.forEach(e=>e(...B.get(e))),z=[]}function le(e,...t){B.set(e,t),!z.includes(e)&&z.push(e)===1&&requestAnimationFrame(ce)}function ue(){return a()!==null}var de=typeof window<`u`;function fe(e,t){return c(()=>{for(let n of t)if(e[n]!==void 0)return e[n];return e[t[t.length-1]]})}function V(e,t=!0,n=[]){return e.forEach(e=>{if(e!==null){if(typeof e!=`object`){(typeof e==`string`||typeof e==`number`)&&n.push(u(String(e)));return}if(Array.isArray(e)){V(e,t,n);return}if(e.type===s){if(e.children===null)return;Array.isArray(e.children)&&V(e.children,t,n)}else{if(e.type===o&&t)return;n.push(e)}}}),n}function pe(e,t=`default`,n=[]){let r=e.$slots[t];return r===void 0?n:r()}var H=n({name:`ChevronRight`,render(){return D(`svg`,{viewBox:`0 0 16 16`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},D(`path`,{d:`M5.64645 3.14645C5.45118 3.34171 5.45118 3.65829 5.64645 3.85355L9.79289 8L5.64645 12.1464C5.45118 12.3417 5.45118 12.6583 5.64645 12.8536C5.84171 13.0488 6.15829 13.0488 6.35355 12.8536L10.8536 8.35355C11.0488 8.15829 11.0488 7.84171 10.8536 7.64645L6.35355 3.14645C6.15829 2.95118 5.84171 2.95118 5.64645 3.14645Z`,fill:`currentColor`}))}}),me=m(`icon`,`
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
`,[_(`color-transition`,{transition:`color .3s var(--n-bezier)`}),_(`depth`,{color:`var(--n-color)`},[S(`svg`,{opacity:`var(--n-opacity)`,transition:`opacity .3s var(--n-bezier)`})]),S(`svg`,{height:`1em`,width:`1em`})]),he=Object.assign(Object.assign({},l.props),{depth:[String,Number],size:[Number,String],color:String,component:[Object,Function]}),U=n({_n_icon__:!0,name:`Icon`,inheritAttrs:!1,props:he,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n}=w(e),r=l(`Icon`,`-icon`,me,se,e,t),i=c(()=>{let{depth:t}=e,{common:{cubicBezierEaseInOut:n},self:i}=r.value;if(t!==void 0){let{color:e,[`opacity${t}Depth`]:r}=i;return{"--n-bezier":n,"--n-color":e,"--n-opacity":r}}return{"--n-bezier":n,"--n-color":``,"--n-opacity":``}}),a=n?k(`icon`,c(()=>`${e.depth||`d`}`),i,e):void 0;return{mergedClsPrefix:t,mergedStyle:c(()=>{let{size:t,color:n}=e;return{fontSize:F(t),color:n}}),cssVars:n?void 0:i,themeClass:a?.themeClass,onRender:a?.onRender}},render(){let{$parent:e,depth:t,mergedClsPrefix:n,component:r,onRender:i,themeClass:a}=this;return e?.$options?._n_icon__&&ee(`icon`,"don't wrap `n-icon` inside `n-icon`"),i?.(),D(`i`,p(this.$attrs,{role:`img`,class:[`${n}-icon`,a,{[`${n}-icon--depth`]:t,[`${n}-icon--color-transition`]:t!==void 0}],style:[this.cssVars,this.mergedStyle]}),r?D(r):this.$slots)}});function ge(e){let{baseColor:t,textColor2:n,bodyColor:r,cardColor:i,dividerColor:a,actionColor:o,scrollbarColor:s,scrollbarColorHover:c,invertedColor:l}=e;return{textColor:n,textColorInverted:`#FFF`,color:r,colorEmbedded:o,headerColor:i,headerColorInverted:l,footerColor:o,footerColorInverted:l,headerBorderColor:a,headerBorderColorInverted:l,footerBorderColor:a,footerBorderColorInverted:l,siderBorderColor:a,siderBorderColorInverted:l,siderColor:i,siderColorInverted:l,siderToggleButtonBorder:`1px solid ${a}`,siderToggleButtonColor:t,siderToggleButtonIconColor:n,siderToggleButtonIconColorInverted:n,siderToggleBarColor:x(r,s),siderToggleBarColorHover:x(r,c),__invertScrollbar:`true`}}var W=re({name:`Layout`,common:b,peers:{Scrollbar:ne},self:ge}),_e=y(`n-layout-sider`),G={type:String,default:`static`},ve=m(`layout`,`
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
`,[m(`layout-scroll-container`,`
 overflow-x: hidden;
 box-sizing: border-box;
 height: 100%;
 `),_(`absolute-positioned`,`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),ye={embedded:Boolean,position:G,nativeScrollbar:{type:Boolean,default:!0},scrollbarProps:Object,onScroll:Function,contentClass:String,contentStyle:{type:[String,Object],default:``},hasSider:Boolean,siderPlacement:{type:String,default:`left`}},K=y(`n-layout`);function q(e){return n({name:e?`LayoutContent`:`Layout`,props:Object.assign(Object.assign({},l.props),ye),setup(e){let t=A(null),n=A(null),{mergedClsPrefixRef:r,inlineThemeDisabled:i}=w(e),a=l(`Layout`,`-layout`,ve,W,e,r);function o(r,i){if(e.nativeScrollbar){let{value:e}=t;e&&(i===void 0?e.scrollTo(r):e.scrollTo(r,i))}else{let{value:e}=n;e&&e.scrollTo(r,i)}}T(K,e);let s=0,u=0,d=t=>{var n;let r=t.target;s=r.scrollLeft,u=r.scrollTop,(n=e.onScroll)==null||n.call(e,t)};R(()=>{if(e.nativeScrollbar){let e=t.value;e&&(e.scrollTop=u,e.scrollLeft=s)}});let f={display:`flex`,flexWrap:`nowrap`,width:`100%`,flexDirection:`row`},p={scrollTo:o},m=c(()=>{let{common:{cubicBezierEaseInOut:t},self:n}=a.value;return{"--n-bezier":t,"--n-color":e.embedded?n.colorEmbedded:n.color,"--n-text-color":n.textColor}}),h=i?k(`layout`,c(()=>e.embedded?`e`:``),m,e):void 0;return Object.assign({mergedClsPrefix:r,scrollableElRef:t,scrollbarInstRef:n,hasSiderStyle:f,mergedTheme:a,handleNativeElScroll:d,cssVars:i?void 0:m,themeClass:h?.themeClass,onRender:h?.onRender},p)},render(){var t;let{mergedClsPrefix:n,hasSider:r}=this;(t=this.onRender)==null||t.call(this);let i=r?this.hasSiderStyle:void 0,a=[this.themeClass,e&&`${n}-layout-content`,`${n}-layout`,`${n}-layout--${this.position}-positioned`];return D(`div`,{class:a,style:this.cssVars},this.nativeScrollbar?D(`div`,{ref:`scrollableElRef`,class:[`${n}-layout-scroll-container`,this.contentClass],style:[this.contentStyle,i],onScroll:this.handleNativeElScroll},this.$slots):D(L,Object.assign({},this.scrollbarProps,{onScroll:this.onScroll,ref:`scrollbarInstRef`,theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar,contentClass:this.contentClass,contentStyle:[this.contentStyle,i]}),this.$slots))}})}var J=q(!1),be=q(!0),xe=m(`layout-header`,`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 box-sizing: border-box;
 width: 100%;
 background-color: var(--n-color);
 color: var(--n-text-color);
`,[_(`absolute-positioned`,`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 `),_(`bordered`,`
 border-bottom: solid 1px var(--n-border-color);
 `)]),Se={position:G,inverted:Boolean,bordered:{type:Boolean,default:!1}},Ce=n({name:`LayoutHeader`,props:Object.assign(Object.assign({},l.props),Se),setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n}=w(e),r=l(`Layout`,`-layout-header`,xe,W,e,t),i=c(()=>{let{common:{cubicBezierEaseInOut:t},self:n}=r.value,i={"--n-bezier":t};return e.inverted?(i[`--n-color`]=n.headerColorInverted,i[`--n-text-color`]=n.textColorInverted,i[`--n-border-color`]=n.headerBorderColorInverted):(i[`--n-color`]=n.headerColor,i[`--n-text-color`]=n.textColor,i[`--n-border-color`]=n.headerBorderColor),i}),a=n?k(`layout-header`,c(()=>e.inverted?`a`:`b`),i,e):void 0;return{mergedClsPrefix:t,cssVars:n?void 0:i,themeClass:a?.themeClass,onRender:a?.onRender}},render(){var e;let{mergedClsPrefix:t}=this;return(e=this.onRender)==null||e.call(this),D(`div`,{class:[`${t}-layout-header`,this.themeClass,this.position&&`${t}-layout-header--${this.position}-positioned`,this.bordered&&`${t}-layout-header--bordered`],style:this.cssVars},this.$slots)}}),we=m(`layout-sider`,`
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
`,[_(`bordered`,[N(`border`,`
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 width: 1px;
 background-color: var(--n-border-color);
 transition: background-color .3s var(--n-bezier);
 `)]),N(`left-placement`,[_(`bordered`,[N(`border`,`
 right: 0;
 `)])]),_(`right-placement`,`
 justify-content: flex-start;
 `,[_(`bordered`,[N(`border`,`
 left: 0;
 `)]),_(`collapsed`,[m(`layout-toggle-button`,[m(`base-icon`,`
 transform: rotate(180deg);
 `)]),m(`layout-toggle-bar`,[S(`&:hover`,[N(`top`,{transform:`rotate(-12deg) scale(1.15) translateY(-2px)`}),N(`bottom`,{transform:`rotate(12deg) scale(1.15) translateY(2px)`})])])]),m(`layout-toggle-button`,`
 left: 0;
 transform: translateX(-50%) translateY(-50%);
 `,[m(`base-icon`,`
 transform: rotate(0);
 `)]),m(`layout-toggle-bar`,`
 left: -28px;
 transform: rotate(180deg);
 `,[S(`&:hover`,[N(`top`,{transform:`rotate(12deg) scale(1.15) translateY(-2px)`}),N(`bottom`,{transform:`rotate(-12deg) scale(1.15) translateY(2px)`})])])]),_(`collapsed`,[m(`layout-toggle-bar`,[S(`&:hover`,[N(`top`,{transform:`rotate(-12deg) scale(1.15) translateY(-2px)`}),N(`bottom`,{transform:`rotate(12deg) scale(1.15) translateY(2px)`})])]),m(`layout-toggle-button`,[m(`base-icon`,`
 transform: rotate(0);
 `)])]),m(`layout-toggle-button`,`
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
 `,[m(`base-icon`,`
 transition: transform .3s var(--n-bezier);
 transform: rotate(180deg);
 `)]),m(`layout-toggle-bar`,`
 cursor: pointer;
 height: 72px;
 width: 32px;
 position: absolute;
 top: calc(50% - 36px);
 right: -28px;
 `,[N(`top, bottom`,`
 position: absolute;
 width: 4px;
 border-radius: 2px;
 height: 38px;
 left: 14px;
 transition: 
 background-color .3s var(--n-bezier),
 transform .3s var(--n-bezier);
 `),N(`bottom`,`
 position: absolute;
 top: 34px;
 `),S(`&:hover`,[N(`top`,{transform:`rotate(12deg) scale(1.15) translateY(-2px)`}),N(`bottom`,{transform:`rotate(-12deg) scale(1.15) translateY(2px)`})]),N(`top, bottom`,{backgroundColor:`var(--n-toggle-bar-color)`}),S(`&:hover`,[N(`top, bottom`,{backgroundColor:`var(--n-toggle-bar-color-hover)`})])]),N(`border`,`
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 width: 1px;
 transition: background-color .3s var(--n-bezier);
 `),m(`layout-sider-scroll-container`,`
 flex-grow: 1;
 flex-shrink: 0;
 box-sizing: border-box;
 height: 100%;
 opacity: 0;
 transition: opacity .3s var(--n-bezier);
 max-width: 100%;
 `),_(`show-content`,[m(`layout-sider-scroll-container`,{opacity:1})]),_(`absolute-positioned`,`
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 `)]),Te=n({props:{clsPrefix:{type:String,required:!0},onClick:Function},render(){let{clsPrefix:e}=this;return D(`div`,{onClick:this.onClick,class:`${e}-layout-toggle-bar`},D(`div`,{class:`${e}-layout-toggle-bar__top`}),D(`div`,{class:`${e}-layout-toggle-bar__bottom`}))}}),Ee=n({name:`LayoutToggleButton`,props:{clsPrefix:{type:String,required:!0},onClick:Function},render(){let{clsPrefix:e}=this;return D(`div`,{class:`${e}-layout-toggle-button`,onClick:this.onClick},D(g,{clsPrefix:e},{default:()=>D(H,null)}))}}),De={position:G,bordered:Boolean,collapsedWidth:{type:Number,default:48},width:{type:[Number,String],default:272},contentClass:String,contentStyle:{type:[String,Object],default:``},collapseMode:{type:String,default:`transform`},collapsed:{type:Boolean,default:void 0},defaultCollapsed:Boolean,showCollapsedContent:{type:Boolean,default:!0},showTrigger:{type:[Boolean,String],default:!1},nativeScrollbar:{type:Boolean,default:!0},inverted:Boolean,scrollbarProps:Object,triggerClass:String,triggerStyle:[String,Object],collapsedTriggerClass:String,collapsedTriggerStyle:[String,Object],"onUpdate:collapsed":[Function,Array],onUpdateCollapsed:[Function,Array],onAfterEnter:Function,onAfterLeave:Function,onExpand:[Function,Array],onCollapse:[Function,Array],onScroll:Function},Oe=n({name:`LayoutSider`,props:Object.assign(Object.assign({},l.props),De),setup(e){let t=i(K),n=A(null),r=A(null),a=A(e.defaultCollapsed),o=ie(M(e,`collapsed`),a),s=c(()=>F(o.value?e.collapsedWidth:e.width)),u=c(()=>e.collapseMode===`transform`?{minWidth:F(e.width)}:{}),d=c(()=>t?t.siderPlacement:`left`);function f(t,i){if(e.nativeScrollbar){let{value:e}=n;e&&(i===void 0?e.scrollTo(t):e.scrollTo(t,i))}else{let{value:e}=r;e&&e.scrollTo(t,i)}}function p(){let{"onUpdate:collapsed":t,onUpdateCollapsed:n,onExpand:r,onCollapse:i}=e,{value:s}=o;n&&I(n,!s),t&&I(t,!s),a.value=!s,s?r&&I(r):i&&I(i)}let m=0,h=0,g=t=>{var n;let r=t.target;m=r.scrollLeft,h=r.scrollTop,(n=e.onScroll)==null||n.call(e,t)};R(()=>{if(e.nativeScrollbar){let e=n.value;e&&(e.scrollTop=h,e.scrollLeft=m)}}),T(_e,{collapsedRef:o,collapseModeRef:M(e,`collapseMode`)});let{mergedClsPrefixRef:_,inlineThemeDisabled:v}=w(e),y=l(`Layout`,`-layout-sider`,we,W,e,_);function b(t){var n,r;t.propertyName===`max-width`&&(o.value?(n=e.onAfterLeave)==null||n.call(e):(r=e.onAfterEnter)==null||r.call(e))}let x={scrollTo:f},S=c(()=>{let{common:{cubicBezierEaseInOut:t},self:n}=y.value,{siderToggleButtonColor:r,siderToggleButtonBorder:i,siderToggleBarColor:a,siderToggleBarColorHover:o}=n,s={"--n-bezier":t,"--n-toggle-button-color":r,"--n-toggle-button-border":i,"--n-toggle-bar-color":a,"--n-toggle-bar-color-hover":o};return e.inverted?(s[`--n-color`]=n.siderColorInverted,s[`--n-text-color`]=n.textColorInverted,s[`--n-border-color`]=n.siderBorderColorInverted,s[`--n-toggle-button-icon-color`]=n.siderToggleButtonIconColorInverted,s.__invertScrollbar=n.__invertScrollbar):(s[`--n-color`]=n.siderColor,s[`--n-text-color`]=n.textColor,s[`--n-border-color`]=n.siderBorderColor,s[`--n-toggle-button-icon-color`]=n.siderToggleButtonIconColor),s}),C=v?k(`layout-sider`,c(()=>e.inverted?`a`:`b`),S,e):void 0;return Object.assign({scrollableElRef:n,scrollbarInstRef:r,mergedClsPrefix:_,mergedTheme:y,styleMaxWidth:s,mergedCollapsed:o,scrollContainerStyle:u,siderPlacement:d,handleNativeElScroll:g,handleTransitionend:b,handleTriggerClick:p,inlineThemeDisabled:v,cssVars:S,themeClass:C?.themeClass,onRender:C?.onRender},x)},render(){var e;let{mergedClsPrefix:t,mergedCollapsed:n,showTrigger:r}=this;return(e=this.onRender)==null||e.call(this),D(`aside`,{class:[`${t}-layout-sider`,this.themeClass,`${t}-layout-sider--${this.position}-positioned`,`${t}-layout-sider--${this.siderPlacement}-placement`,this.bordered&&`${t}-layout-sider--bordered`,n&&`${t}-layout-sider--collapsed`,(!n||this.showCollapsedContent)&&`${t}-layout-sider--show-content`],onTransitionend:this.handleTransitionend,style:[this.inlineThemeDisabled?void 0:this.cssVars,{maxWidth:this.styleMaxWidth,width:F(this.width)}]},this.nativeScrollbar?D(`div`,{class:[`${t}-layout-sider-scroll-container`,this.contentClass],onScroll:this.handleNativeElScroll,style:[this.scrollContainerStyle,{overflow:`auto`},this.contentStyle],ref:`scrollableElRef`},this.$slots):D(L,Object.assign({},this.scrollbarProps,{onScroll:this.onScroll,ref:`scrollbarInstRef`,style:this.scrollContainerStyle,contentStyle:this.contentStyle,contentClass:this.contentClass,theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar,builtinThemeOverrides:this.inverted&&this.cssVars.__invertScrollbar===`true`?{colorHover:`rgba(255, 255, 255, .4)`,color:`rgba(255, 255, 255, .3)`}:void 0}),this.$slots),r?D(r===`bar`?Te:Ee,{clsPrefix:t,class:n?this.collapsedTriggerClass:this.triggerClass,style:n?this.collapsedTriggerStyle:this.triggerStyle,onClick:this.handleTriggerClick}):null,this.bordered?D(`div`,{class:`${t}-layout-sider__border`}):null)}}),Y=e=>e===``,ke=(...e)=>e.filter((e,t,n)=>!!e&&e.trim()!==``&&n.indexOf(e)===t).join(` `).trim(),X=e=>e.replace(/([a-z0-9])([A-Z])/g,`$1-$2`).toLowerCase(),Ae=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,n)=>n?n.toUpperCase():t.toLowerCase()),je=e=>{let t=Ae(e);return t.charAt(0).toUpperCase()+t.slice(1)},Z={xmlns:`http://www.w3.org/2000/svg`,width:24,height:24,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":2,"stroke-linecap":`round`,"stroke-linejoin":`round`},Me=Symbol(`lucide-icons`);function Ne(){return i(Me,{})}var Pe=({name:e,iconNode:t,"icon-node":n,absoluteStrokeWidth:r,"absolute-stroke-width":i,strokeWidth:a,"stroke-width":o,size:s,color:l,...u},{slots:d})=>{let{size:f,color:p,strokeWidth:m=2,absoluteStrokeWidth:h=!1,class:g=``}=Ne(),_=c(()=>{let e=Y(r)||Y(i)||r===!0||i===!0||h===!0,t=a||o||m||Z[`stroke-width`];return e?Number(t)*24/Number(s??f??Z.width):t});return D(`svg`,{...Z,...u,width:s??f??Z.width,height:s??f??Z.height,stroke:l??p??Z.stroke,"stroke-width":_.value,class:ke(`lucide`,g,...e?[`lucide-${X(je(e))}-icon`,`lucide-${X(e)}`]:[`lucide-icon`])},[...(t??n??[]).map(e=>D(...e)),...d.default?[d.default()]:[]])},Q=(e,t)=>(n,{slots:r,attrs:i})=>D(Pe,{...i,...n,iconNode:t,name:e},r.default?{default:r.default}:void 0),$=Q(`box`,[[`path`,{d:`M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z`,key:`hh9hay`}],[`path`,{d:`m3.3 7 8.7 5 8.7-5`,key:`g66t2b`}],[`path`,{d:`M12 22V12`,key:`d0xqtd`}]]),Fe=Q(`folder-open`,[[`path`,{d:`m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2`,key:`usdka0`}]]),Ie=Q(`layout-dashboard`,[[`rect`,{width:`7`,height:`9`,x:`3`,y:`3`,rx:`1`,key:`10lvy0`}],[`rect`,{width:`7`,height:`5`,x:`14`,y:`3`,rx:`1`,key:`16une8`}],[`rect`,{width:`7`,height:`9`,x:`14`,y:`12`,rx:`1`,key:`1hutg5`}],[`rect`,{width:`7`,height:`5`,x:`3`,y:`16`,rx:`1`,key:`ldoo1y`}]]),Le=Q(`log-out`,[[`path`,{d:`m16 17 5-5-5-5`,key:`1bji2h`}],[`path`,{d:`M21 12H9`,key:`dn1m92`}],[`path`,{d:`M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4`,key:`1uf3rs`}]]),Re=Q(`server`,[[`rect`,{width:`20`,height:`8`,x:`2`,y:`2`,rx:`2`,ry:`2`,key:`ngkwjq`}],[`rect`,{width:`20`,height:`8`,x:`2`,y:`14`,rx:`2`,ry:`2`,key:`iecqi9`}],[`line`,{x1:`6`,x2:`6.01`,y1:`6`,y2:`6`,key:`16zg32`}],[`line`,{x1:`6`,x2:`6.01`,y1:`18`,y2:`18`,key:`nzw8ys`}]]),ze={class:`brand`},Be={class:`side-nav`},Ve={key:0},He={key:0},Ue={key:0},We={href:`/files`,class:`side-nav-item`},Ge={key:0},Ke={class:`user`},qe=oe(n({__name:`AppShell`,setup(n){let i=O(),a=te(),o=A(!1);async function s(){await i.logout(),a.push(`/login`)}return(n,a)=>{let c=C(`RouterLink`);return h(),e(j(J),{"has-sider":``,style:{height:`100vh`}},{default:E(()=>[f(j(Oe),{bordered:``,width:220,"collapsed-width":64,collapsible:``,collapsed:o.value,"onUpdate:collapsed":a[0]||=e=>o.value=e},{default:E(()=>[P(`div`,ze,t(o.value?`T`:`TarkimanOS`),1),P(`nav`,Be,[f(c,{to:`/`,class:`side-nav-item`,"active-class":`active`},{default:E(()=>[f(j(U),{component:j(Ie),size:`18`},null,8,[`component`]),o.value?d(``,!0):(h(),r(`span`,Ve,`Dashboard`))]),_:1}),f(c,{to:`/docker`,class:`side-nav-item`,"active-class":`active`},{default:E(()=>[f(j(U),{component:j($),size:`18`},null,8,[`component`]),o.value?d(``,!0):(h(),r(`span`,He,`Docker`))]),_:1}),f(c,{to:`/services`,class:`side-nav-item`,"active-class":`active`},{default:E(()=>[f(j(U),{component:j(Re),size:`18`},null,8,[`component`]),o.value?d(``,!0):(h(),r(`span`,Ue,`Service`))]),_:1}),P(`a`,We,[f(j(U),{component:j(Fe),size:`18`},null,8,[`component`]),o.value?d(``,!0):(h(),r(`span`,Ge,`Files`))])])]),_:1},8,[`collapsed`]),f(j(J),null,{default:E(()=>[f(j(Ce),{bordered:``,class:`topbar`},{default:E(()=>[a[2]||=P(`span`,{class:`spacer`},null,-1),P(`span`,Ke,t(j(i).username),1),f(j(ae),{quaternary:``,size:`small`,onClick:s},{icon:E(()=>[f(j(U),{component:j(Le)},null,8,[`component`])]),default:E(()=>[a[1]||=u(` Keluar `,-1)]),_:1})]),_:1}),f(j(be),{class:`content`},{default:E(()=>[v(n.$slots,`default`,{},void 0,!0)]),_:3})]),_:3})]),_:3})}}}),[[`__scopeId`,`data-v-3608047a`]]);export{V as a,de as c,pe as i,le as l,U as n,fe as o,H as r,ue as s,qe as t};