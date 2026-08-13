import{$n as e,Bn as t,Cn as n,G as r,Hn as i,It as a,K as o,Kn as s,Kt as c,N as l,Pt as u,Rn as d,Rt as f,Tt as p,U as m,Vn as h,ar as g,bn as _,cn as v,dn as y,dr as b,fn as x,ir as S,jn as C,k as w,ln as T,mr as E,sr as D,w as O,wt as k}from"./auth-HQixzRlA.js";import{S as A,_ as j,d as M,f as N,m as P,p as F,v as I,x as L}from"./useTheme-C7QcCzZi.js";import{c as R}from"./LocaleSwitcher-b94LFCCL.js";import{i as z,r as B}from"./light-B0ZxCFd7.js";import{r as V}from"./render-C-zdZzDv.js";import{t as H}from"./light-BKzTgQ9D.js";var U=d({name:`NDrawerContent`,inheritAttrs:!1,props:{blockScroll:Boolean,show:{type:Boolean,default:void 0},displayDirective:{type:String,required:!0},placement:{type:String,required:!0},contentClass:String,contentStyle:[Object,String],nativeScrollbar:{type:Boolean,required:!0},scrollbarProps:Object,trapFocus:{type:Boolean,default:!0},autoFocus:{type:Boolean,default:!0},showMask:{type:[Boolean,String],required:!0},maxWidth:Number,maxHeight:Number,minWidth:Number,minHeight:Number,resizable:Boolean,onClickoutside:Function,onAfterLeave:Function,onAfterEnter:Function,onEsc:Function},setup(t){let r=b(!!t.show),i=b(null),a=h(A),c=0,l=``,u=null,d=b(!1),f=b(!1),m=C(()=>t.placement===`top`||t.placement===`bottom`),{mergedClsPrefixRef:_,mergedRtlRef:v}=p(t),y=o(`Drawer`,v,_),x=F,w=e=>{f.value=!0,c=m.value?e.clientY:e.clientX,l=document.body.style.cursor,document.body.style.cursor=m.value?`ns-resize`:`ew-resize`,document.body.addEventListener(`mousemove`,N),document.body.addEventListener(`mouseleave`,x),document.body.addEventListener(`mouseup`,F)},T=()=>{u!==null&&(window.clearTimeout(u),u=null),f.value?d.value=!0:u=window.setTimeout(()=>{d.value=!0},300)},E=()=>{u!==null&&(window.clearTimeout(u),u=null),d.value=!1},{doUpdateHeight:D,doUpdateWidth:O}=a,k=e=>{let{maxWidth:n}=t;if(n&&e>n)return n;let{minWidth:r}=t;return r&&e<r?r:e},M=e=>{let{maxHeight:n}=t;if(n&&e>n)return n;let{minHeight:r}=t;return r&&e<r?r:e};function N(e){if(f.value)if(m.value){let n=i.value?.offsetHeight||0,r=c-e.clientY;n+=t.placement===`bottom`?r:-r,n=M(n),D(n),c=e.clientY}else{let n=i.value?.offsetWidth||0,r=c-e.clientX;n+=t.placement===`right`?r:-r,n=k(n),O(n),c=e.clientX}}function F(){f.value&&(c=0,f.value=!1,document.body.style.cursor=l,document.body.removeEventListener(`mousemove`,N),document.body.removeEventListener(`mouseup`,F),document.body.removeEventListener(`mouseleave`,x))}g(()=>{t.show&&(r.value=!0)}),S(()=>t.show,e=>{e||F()}),s(()=>{F()});let R=C(()=>{let{show:e}=t,r=[[n,e]];return t.showMask||r.push([P,t.onClickoutside,void 0,{capture:!0}]),r});function z(){var e;r.value=!1,(e=t.onAfterLeave)==null||e.call(t)}return B(C(()=>t.blockScroll&&r.value)),e(L,i),e(j,null),e(I,null),{bodyRef:i,rtlEnabled:y,mergedClsPrefix:a.mergedClsPrefixRef,isMounted:a.isMountedRef,mergedTheme:a.mergedThemeRef,displayed:r,transitionName:C(()=>({right:`slide-in-from-right-transition`,left:`slide-in-from-left-transition`,top:`slide-in-from-top-transition`,bottom:`slide-in-from-bottom-transition`})[t.placement]),handleAfterLeave:z,bodyDirectives:R,handleMousedownResizeTrigger:w,handleMouseenterResizeTrigger:T,handleMouseleaveResizeTrigger:E,isDragging:f,isHoverOnResizeTrigger:d}},render(){let{$slots:e,mergedClsPrefix:r}=this;return this.displayDirective===`show`||this.displayed||this.show?D(t(`div`,{role:`none`},t(M,{disabled:!this.showMask||!this.trapFocus,active:this.show,autoFocus:this.autoFocus,onEsc:this.onEsc},{default:()=>t(_,{name:this.transitionName,appear:this.isMounted,onAfterEnter:this.onAfterEnter,onAfterLeave:this.handleAfterLeave},{default:()=>D(t(`div`,i(this.$attrs,{role:`dialog`,ref:`bodyRef`,"aria-modal":`true`,class:[`${r}-drawer`,this.rtlEnabled&&`${r}-drawer--rtl`,`${r}-drawer--${this.placement}-placement`,this.isDragging&&`${r}-drawer--unselectable`,this.nativeScrollbar&&`${r}-drawer--native-scrollbar`]}),[this.resizable?t(`div`,{class:[`${r}-drawer__resize-trigger`,(this.isDragging||this.isHoverOnResizeTrigger)&&`${r}-drawer__resize-trigger--hover`],onMouseenter:this.handleMouseenterResizeTrigger,onMouseleave:this.handleMouseleaveResizeTrigger,onMousedown:this.handleMousedownResizeTrigger}):null,this.nativeScrollbar?t(`div`,{class:[`${r}-drawer-content-wrapper`,this.contentClass],style:this.contentStyle,role:`none`},e):t(O,Object.assign({},this.scrollbarProps,{contentStyle:this.contentStyle,contentClass:[`${r}-drawer-content-wrapper`,this.contentClass],theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar}),e)]),this.bodyDirectives)})})),[[n,this.displayDirective===`if`||this.displayed||this.show]]):null}}),{cubicBezierEaseIn:W,cubicBezierEaseOut:G}=r;function K({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-bottom`}={}){return[v(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${W}`}),v(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${G}`}),v(`&.${n}-transition-enter-to`,{transform:`translateY(0)`}),v(`&.${n}-transition-enter-from`,{transform:`translateY(100%)`}),v(`&.${n}-transition-leave-from`,{transform:`translateY(0)`}),v(`&.${n}-transition-leave-to`,{transform:`translateY(100%)`})]}var{cubicBezierEaseIn:q,cubicBezierEaseOut:J}=r;function Y({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-left`}={}){return[v(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${q}`}),v(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${J}`}),v(`&.${n}-transition-enter-to`,{transform:`translateX(0)`}),v(`&.${n}-transition-enter-from`,{transform:`translateX(-100%)`}),v(`&.${n}-transition-leave-from`,{transform:`translateX(0)`}),v(`&.${n}-transition-leave-to`,{transform:`translateX(-100%)`})]}var{cubicBezierEaseIn:X,cubicBezierEaseOut:Z}=r;function Q({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-right`}={}){return[v(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${X}`}),v(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${Z}`}),v(`&.${n}-transition-enter-to`,{transform:`translateX(0)`}),v(`&.${n}-transition-enter-from`,{transform:`translateX(100%)`}),v(`&.${n}-transition-leave-from`,{transform:`translateX(0)`}),v(`&.${n}-transition-leave-to`,{transform:`translateX(100%)`})]}var{cubicBezierEaseIn:$,cubicBezierEaseOut:ee}=r;function te({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-top`}={}){return[v(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${$}`}),v(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${ee}`}),v(`&.${n}-transition-enter-to`,{transform:`translateY(0)`}),v(`&.${n}-transition-enter-from`,{transform:`translateY(-100%)`}),v(`&.${n}-transition-leave-from`,{transform:`translateY(0)`}),v(`&.${n}-transition-leave-to`,{transform:`translateY(-100%)`})]}var ne=v([T(`drawer`,`
 word-break: break-word;
 line-height: var(--n-line-height);
 position: absolute;
 pointer-events: all;
 box-shadow: var(--n-box-shadow);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 background-color: var(--n-color);
 color: var(--n-text-color);
 box-sizing: border-box;
 `,[Q(),Y(),te(),K(),x(`unselectable`,`
 user-select: none; 
 -webkit-user-select: none;
 `),x(`native-scrollbar`,[T(`drawer-content-wrapper`,`
 overflow: auto;
 height: 100%;
 `)]),y(`resize-trigger`,`
 position: absolute;
 background-color: #0000;
 transition: background-color .3s var(--n-bezier);
 `,[x(`hover`,`
 background-color: var(--n-resize-trigger-color-hover);
 `)]),T(`drawer-content-wrapper`,`
 box-sizing: border-box;
 `),T(`drawer-content`,`
 height: 100%;
 display: flex;
 flex-direction: column;
 `,[x(`native-scrollbar`,[T(`drawer-body-content-wrapper`,`
 height: 100%;
 overflow: auto;
 `)]),T(`drawer-body`,`
 flex: 1 0 0;
 overflow: hidden;
 `),T(`drawer-body-content-wrapper`,`
 box-sizing: border-box;
 padding: var(--n-body-padding);
 `),T(`drawer-header`,`
 font-weight: var(--n-title-font-weight);
 line-height: 1;
 font-size: var(--n-title-font-size);
 color: var(--n-title-text-color);
 padding: var(--n-header-padding);
 transition: border .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-divider-color);
 border-bottom: var(--n-header-border-bottom);
 display: flex;
 justify-content: space-between;
 align-items: center;
 `,[y(`main`,`
 flex: 1;
 `),y(`close`,`
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)]),T(`drawer-footer`,`
 display: flex;
 justify-content: flex-end;
 border-top: var(--n-footer-border-top);
 transition: border .3s var(--n-bezier);
 padding: var(--n-footer-padding);
 `)]),x(`right-placement`,`
 top: 0;
 bottom: 0;
 right: 0;
 border-top-left-radius: var(--n-border-radius);
 border-bottom-left-radius: var(--n-border-radius);
 `,[y(`resize-trigger`,`
 width: 3px;
 height: 100%;
 top: 0;
 left: 0;
 transform: translateX(-1.5px);
 cursor: ew-resize;
 `)]),x(`left-placement`,`
 top: 0;
 bottom: 0;
 left: 0;
 border-top-right-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `,[y(`resize-trigger`,`
 width: 3px;
 height: 100%;
 top: 0;
 right: 0;
 transform: translateX(1.5px);
 cursor: ew-resize;
 `)]),x(`top-placement`,`
 top: 0;
 left: 0;
 right: 0;
 border-bottom-left-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `,[y(`resize-trigger`,`
 width: 100%;
 height: 3px;
 bottom: 0;
 left: 0;
 transform: translateY(1.5px);
 cursor: ns-resize;
 `)]),x(`bottom-placement`,`
 left: 0;
 bottom: 0;
 right: 0;
 border-top-left-radius: var(--n-border-radius);
 border-top-right-radius: var(--n-border-radius);
 `,[y(`resize-trigger`,`
 width: 100%;
 height: 3px;
 top: 0;
 left: 0;
 transform: translateY(-1.5px);
 cursor: ns-resize;
 `)])]),v(`body`,[v(`>`,[T(`drawer-container`,`
 position: fixed;
 `)])]),T(`drawer-container`,`
 position: relative;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 pointer-events: none;
 `,[v(`> *`,`
 pointer-events: all;
 `)]),T(`drawer-mask`,`
 background-color: rgba(0, 0, 0, .3);
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `,[x(`invisible`,`
 background-color: rgba(0, 0, 0, 0)
 `),w({enterDuration:`0.2s`,leaveDuration:`0.2s`,enterCubicBezier:`var(--n-bezier-in)`,leaveCubicBezier:`var(--n-bezier-out)`})])]),re=Object.assign(Object.assign({},m.props),{show:Boolean,width:[Number,String],height:[Number,String],placement:{type:String,default:`right`},maskClosable:{type:Boolean,default:!0},showMask:{type:[Boolean,String],default:!0},to:[String,Object],displayDirective:{type:String,default:`if`},nativeScrollbar:{type:Boolean,default:!0},zIndex:Number,onMaskClick:Function,scrollbarProps:Object,contentClass:String,contentStyle:[Object,String],trapFocus:{type:Boolean,default:!0},onEsc:Function,autoFocus:{type:Boolean,default:!0},closeOnEsc:{type:Boolean,default:!0},blockScroll:{type:Boolean,default:!0},maxWidth:Number,maxHeight:Number,minWidth:Number,minHeight:Number,resizable:Boolean,defaultWidth:{type:[Number,String],default:251},defaultHeight:{type:[Number,String],default:251},onUpdateWidth:[Function,Array],onUpdateHeight:[Function,Array],"onUpdate:width":[Function,Array],"onUpdate:height":[Function,Array],"onUpdate:show":[Function,Array],onUpdateShow:[Function,Array],onAfterEnter:Function,onAfterLeave:Function,drawerStyle:[String,Object],drawerClass:String,target:null,onShow:Function,onHide:Function}),ie=d({name:`Drawer`,inheritAttrs:!1,props:re,setup(t){let{mergedClsPrefixRef:n,namespaceRef:r,inlineThemeDisabled:i}=p(t),a=c(),o=m(`Drawer`,`-drawer`,ne,H,t,n),s=b(t.defaultWidth),l=b(t.defaultHeight),d=R(E(t,`width`),s),h=R(E(t,`height`),l),g=C(()=>{let{placement:e}=t;return e===`top`||e===`bottom`?``:f(d.value)}),_=C(()=>{let{placement:e}=t;return e===`left`||e===`right`?``:f(h.value)}),v=e=>{let{onUpdateWidth:n,"onUpdate:width":r}=t;n&&u(n,e),r&&u(r,e),s.value=e},y=e=>{let{onUpdateHeight:n,"onUpdate:width":r}=t;n&&u(n,e),r&&u(r,e),l.value=e},x=C(()=>[{width:g.value,height:_.value},t.drawerStyle||``]);function S(e){let{onMaskClick:n,maskClosable:r}=t;r&&O(!1),n&&n(e)}function w(e){S(e)}let T=z();function D(e){var n;(n=t.onEsc)==null||n.call(t),t.show&&t.closeOnEsc&&V(e)&&(T.value||O(!1))}function O(e){let{onHide:n,onUpdateShow:r,"onUpdate:show":i}=t;r&&u(r,e),i&&u(i,e),n&&!e&&u(n,e)}e(A,{isMountedRef:a,mergedThemeRef:o,mergedClsPrefixRef:n,doUpdateShow:O,doUpdateHeight:y,doUpdateWidth:v});let j=C(()=>{let{common:{cubicBezierEaseInOut:e,cubicBezierEaseIn:t,cubicBezierEaseOut:n},self:{color:r,textColor:i,boxShadow:a,lineHeight:s,headerPadding:c,footerPadding:l,borderRadius:u,bodyPadding:d,titleFontSize:f,titleTextColor:p,titleFontWeight:m,headerBorderBottom:h,footerBorderTop:g,closeIconColor:_,closeIconColorHover:v,closeIconColorPressed:y,closeColorHover:b,closeColorPressed:x,closeIconSize:S,closeSize:C,closeBorderRadius:w,resizableTriggerColorHover:T}}=o.value;return{"--n-line-height":s,"--n-color":r,"--n-border-radius":u,"--n-text-color":i,"--n-box-shadow":a,"--n-bezier":e,"--n-bezier-out":n,"--n-bezier-in":t,"--n-header-padding":c,"--n-body-padding":d,"--n-footer-padding":l,"--n-title-text-color":p,"--n-title-font-size":f,"--n-title-font-weight":m,"--n-header-border-bottom":h,"--n-footer-border-top":g,"--n-close-icon-color":_,"--n-close-icon-color-hover":v,"--n-close-icon-color-pressed":y,"--n-close-size":C,"--n-close-color-hover":b,"--n-close-color-pressed":x,"--n-close-icon-size":S,"--n-close-border-radius":w,"--n-resize-trigger-color-hover":T}}),M=i?k(`drawer`,void 0,j,t):void 0;return{mergedClsPrefix:n,namespace:r,mergedBodyStyle:x,handleOutsideClick:w,handleMaskClick:S,handleEsc:D,mergedTheme:o,cssVars:i?void 0:j,themeClass:M?.themeClass,onRender:M?.onRender,isMounted:a}},render(){let{mergedClsPrefix:e}=this;return t(N,{to:this.to,show:this.show},{default:()=>{var n;return(n=this.onRender)==null||n.call(this),D(t(`div`,{class:[`${e}-drawer-container`,this.namespace,this.themeClass],style:this.cssVars,role:`none`},this.showMask?t(_,{name:`fade-in-transition`,appear:this.isMounted},{default:()=>this.show?t(`div`,{"aria-hidden":!0,class:[`${e}-drawer-mask`,this.showMask===`transparent`&&`${e}-drawer-mask--invisible`],onClick:this.handleMaskClick}):null}):null,t(U,Object.assign({},this.$attrs,{class:[this.drawerClass,this.$attrs.class],style:[this.mergedBodyStyle,this.$attrs.style],blockScroll:this.blockScroll,contentStyle:this.contentStyle,contentClass:this.contentClass,placement:this.placement,scrollbarProps:this.scrollbarProps,show:this.show,displayDirective:this.displayDirective,nativeScrollbar:this.nativeScrollbar,onAfterEnter:this.onAfterEnter,onAfterLeave:this.onAfterLeave,trapFocus:this.trapFocus,autoFocus:this.autoFocus,resizable:this.resizable,maxHeight:this.maxHeight,minHeight:this.minHeight,maxWidth:this.maxWidth,minWidth:this.minWidth,showMask:this.showMask,onEsc:this.handleEsc,onClickoutside:this.handleOutsideClick}),this.$slots)),[[F,{zIndex:this.zIndex,enabled:this.show}]])}})}}),ae=d({name:`DrawerContent`,props:{title:String,headerClass:String,headerStyle:[Object,String],footerClass:String,footerStyle:[Object,String],bodyClass:String,bodyStyle:[Object,String],bodyContentClass:String,bodyContentStyle:[Object,String],nativeScrollbar:{type:Boolean,default:!0},scrollbarProps:Object,closable:Boolean},slots:Object,setup(){let e=h(A,null);e||a(`drawer-content`,"`n-drawer-content` must be placed inside `n-drawer`.");let{doUpdateShow:t}=e;function n(){t(!1)}return{handleCloseClick:n,mergedTheme:e.mergedThemeRef,mergedClsPrefix:e.mergedClsPrefixRef}},render(){let{title:e,mergedClsPrefix:n,nativeScrollbar:r,mergedTheme:i,bodyClass:a,bodyStyle:o,bodyContentClass:s,bodyContentStyle:c,headerClass:u,headerStyle:d,footerClass:f,footerStyle:p,scrollbarProps:m,closable:h,$slots:g}=this;return t(`div`,{role:`none`,class:[`${n}-drawer-content`,r&&`${n}-drawer-content--native-scrollbar`]},g.header||e||h?t(`div`,{class:[`${n}-drawer-header`,u],style:d,role:`none`},t(`div`,{class:`${n}-drawer-header__main`,role:`heading`,"aria-level":`1`},g.header===void 0?e:g.header()),h&&t(l,{onClick:this.handleCloseClick,clsPrefix:n,class:`${n}-drawer-header__close`,absolute:!0})):null,r?t(`div`,{class:[`${n}-drawer-body`,a],style:o,role:`none`},t(`div`,{class:[`${n}-drawer-body-content-wrapper`,s],style:c,role:`none`},g)):t(O,Object.assign({themeOverrides:i.peerOverrides.Scrollbar,theme:i.peers.Scrollbar},m,{class:`${n}-drawer-body`,contentClass:[`${n}-drawer-body-content-wrapper`,s],contentStyle:c}),g),g.footer?t(`div`,{class:[`${n}-drawer-footer`,f],style:p,role:`none`},g.footer()):null)}});export{ie as n,ae as t};