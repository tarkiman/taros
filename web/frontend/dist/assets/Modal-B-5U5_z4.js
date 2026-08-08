import{$n as e,An as t,Bn as n,Cn as r,E as i,F as a,Gn as o,H as s,Hn as c,I as l,Jt as u,K as d,Kn as f,Kt as p,L as m,Lt as h,N as g,Nt as _,O as v,Pt as y,R as b,Rn as x,Tt as S,U as C,Un as w,V as T,Vn as E,Xn as D,Yt as O,_ as k,bn as A,cn as j,dn as M,dr as N,fn as P,hn as ee,in as te,ir as F,jn as I,jt as L,k as ne,ln as R,mn as re,mr as z,on as ie,sn as ae,sr as B,ur as V,vr as oe,w as se,wt as ce,y as le}from"./auth-DqoAZwsL.js";import{C as ue,_ as de,b as fe,d as pe,f as me,l as he,m as ge,p as _e,s as H,v as ve,w as U,x as ye,y as W}from"./useTheme-BYlUbcuk.js";import{n as be,t as xe}from"./use-lock-html-scroll-_8c1inX1.js";import{r as Se,t as G}from"./render-4BpihoPC.js";import{l as K}from"./light-DLFrtZyR.js";import{t as Ce}from"./fade-in-scale-up.cssr-BTIUgFBL.js";import{i as we,n as Te,r as Ee,t as De}from"./Card-D8vSzh6M.js";import{n as Oe}from"./context-BtBrC3Su.js";var q=N(null);function J(e){if(e.clientX>0||e.clientY>0)q.value={x:e.clientX,y:e.clientY};else{let{target:t}=e;if(t instanceof Element){let{left:e,top:n,width:r,height:i}=t.getBoundingClientRect();q.value=e>0||n>0?{x:e+r/2,y:n+i/2}:{x:0,y:0}}else q.value=null}}var Y=0,ke=!0;function Ae(){if(!U)return V(N(null));Y===0&&O(`click`,document,J,!0);let e=()=>{Y+=1};return(ke&&=ue())?(o(e),f(()=>{--Y,Y===0&&u(`click`,document,J,!0)})):e(),V(q)}var je=N(void 0),X=0;function Me(){je.value=Date.now()}var Ne=!0;function Pe(e){if(!U)return V(N(!1));let t=N(!1),n=null;function r(){n!==null&&window.clearTimeout(n)}function i(){r(),t.value=!0,n=window.setTimeout(()=>{t.value=!1},e)}X===0&&O(`click`,window,Me,!0);let a=()=>{X+=1,O(`click`,window,i,!0)};return(Ne&&=ue())?(o(a),f(()=>{--X,X===0&&u(`click`,window,Me,!0),u(`click`,window,i,!0),r()})):a(),V(t)}var Fe={titleFontSize:`18px`,padding:`16px 28px 20px 28px`,iconSize:`28px`,actionSpace:`12px`,contentMargin:`8px 0 16px 0`,iconMargin:`0 4px 0 0`,iconMarginIconTop:`4px 0 8px 0`,closeSize:`22px`,closeIconSize:`18px`,closeMargin:`20px 26px 0 0`,closeMarginIconTop:`10px 16px 0 0`};function Ie(e){let{textColor1:t,textColor2:n,modalColor:r,closeIconColor:i,closeIconColorHover:a,closeIconColorPressed:o,closeColorHover:s,closeColorPressed:c,infoColor:l,successColor:u,warningColor:d,errorColor:f,primaryColor:p,dividerColor:m,borderRadius:h,fontWeightStrong:g,lineHeight:_,fontSize:v}=e;return Object.assign(Object.assign({},Fe),{fontSize:v,lineHeight:_,border:`1px solid ${m}`,titleTextColor:t,textColor:n,color:r,closeColorHover:s,closeColorPressed:c,closeIconColor:i,closeIconColorHover:a,closeIconColorPressed:o,closeBorderRadius:h,iconColor:p,iconColorInfo:l,iconColorSuccess:u,iconColorWarning:d,iconColorError:f,borderRadius:h,titleFontWeight:g})}var Le=s({name:`Dialog`,common:v,peers:{Button:le},self:Ie}),Z={icon:Function,type:{type:String,default:`default`},title:[String,Function],closable:{type:Boolean,default:!0},negativeText:String,positiveText:String,positiveButtonProps:Object,negativeButtonProps:Object,content:[String,Function],action:Function,showIcon:{type:Boolean,default:!0},loading:Boolean,bordered:Boolean,iconPlacement:String,titleClass:[String,Array],titleStyle:[String,Object],contentClass:[String,Array],contentStyle:[String,Object],actionClass:[String,Array],actionStyle:[String,Object],onPositiveClick:Function,onNegativeClick:Function,onClose:Function,closeFocusable:Boolean},Re=K(Z),ze=j([R(`dialog`,`
 --n-icon-margin: var(--n-icon-margin-top) var(--n-icon-margin-right) var(--n-icon-margin-bottom) var(--n-icon-margin-left);
 word-break: break-word;
 line-height: var(--n-line-height);
 position: relative;
 background: var(--n-color);
 color: var(--n-text-color);
 box-sizing: border-box;
 margin: auto;
 border-radius: var(--n-border-radius);
 padding: var(--n-padding);
 transition: 
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `,[M(`icon`,`
 color: var(--n-icon-color);
 `),P(`bordered`,`
 border: var(--n-border);
 `),P(`icon-top`,[M(`close`,`
 margin: var(--n-close-margin);
 `),M(`icon`,`
 margin: var(--n-icon-margin);
 `),M(`content`,`
 text-align: center;
 `),M(`title`,`
 justify-content: center;
 `),M(`action`,`
 justify-content: center;
 `)]),P(`icon-left`,[M(`icon`,`
 margin: var(--n-icon-margin);
 `),P(`closable`,[M(`title`,`
 padding-right: calc(var(--n-close-size) + 6px);
 `)])]),M(`close`,`
 position: absolute;
 right: 0;
 top: 0;
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 z-index: 1;
 `),M(`content`,`
 font-size: var(--n-font-size);
 margin: var(--n-content-margin);
 position: relative;
 word-break: break-word;
 `,[P(`last`,`margin-bottom: 0;`)]),M(`action`,`
 display: flex;
 justify-content: flex-end;
 `,[j(`> *:not(:last-child)`,`
 margin-right: var(--n-action-space);
 `)]),M(`icon`,`
 font-size: var(--n-icon-size);
 transition: color .3s var(--n-bezier);
 `),M(`title`,`
 transition: color .3s var(--n-bezier);
 display: flex;
 align-items: center;
 font-size: var(--n-title-font-size);
 font-weight: var(--n-title-font-weight);
 color: var(--n-title-text-color);
 `),R(`dialog-icon-container`,`
 display: flex;
 justify-content: center;
 `)]),ee(R(`dialog`,`
 width: 446px;
 max-width: calc(100vw - 32px);
 `)),R(`dialog`,[ae(`
 width: 446px;
 max-width: calc(100vw - 32px);
 `)])]),Be={default:()=>n(m,null),info:()=>n(m,null),success:()=>n(l,null),warning:()=>n(a,null),error:()=>n(b,null)},Ve=x({name:`Dialog`,alias:[`NimbusConfirmCard`,`Confirm`],props:Object.assign(Object.assign({},C.props),Z),slots:Object,setup(e){let{mergedComponentPropsRef:t,mergedClsPrefixRef:n,inlineThemeDisabled:r,mergedRtlRef:i}=S(e),a=d(`Dialog`,i,n),o=I(()=>{let{iconPlacement:n}=e;return n||t?.value?.Dialog?.iconPlacement||`left`});function s(t){let{onPositiveClick:n}=e;n&&n(t)}function c(t){let{onNegativeClick:n}=e;n&&n(t)}function l(){let{onClose:t}=e;t&&t()}let u=C(`Dialog`,`-dialog`,ze,Le,e,n),f=I(()=>{let{type:t}=e,n=o.value,{common:{cubicBezierEaseInOut:r},self:{fontSize:i,lineHeight:a,border:s,titleTextColor:c,textColor:l,color:d,closeBorderRadius:f,closeColorHover:p,closeColorPressed:m,closeIconColor:h,closeIconColorHover:g,closeIconColorPressed:_,closeIconSize:v,borderRadius:y,titleFontWeight:b,titleFontSize:x,padding:S,iconSize:C,actionSpace:w,contentMargin:T,closeSize:E,[n===`top`?`iconMarginIconTop`:`iconMargin`]:D,[n===`top`?`closeMarginIconTop`:`closeMargin`]:O,[re(`iconColor`,t)]:k}}=u.value,A=te(D);return{"--n-font-size":i,"--n-icon-color":k,"--n-bezier":r,"--n-close-margin":O,"--n-icon-margin-top":A.top,"--n-icon-margin-right":A.right,"--n-icon-margin-bottom":A.bottom,"--n-icon-margin-left":A.left,"--n-icon-size":C,"--n-close-size":E,"--n-close-icon-size":v,"--n-close-border-radius":f,"--n-close-color-hover":p,"--n-close-color-pressed":m,"--n-close-icon-color":h,"--n-close-icon-color-hover":g,"--n-close-icon-color-pressed":_,"--n-color":d,"--n-text-color":l,"--n-border-radius":y,"--n-padding":S,"--n-line-height":a,"--n-border":s,"--n-content-margin":T,"--n-title-font-size":x,"--n-title-font-weight":b,"--n-title-text-color":c,"--n-action-space":w}}),p=r?ce(`dialog`,I(()=>`${e.type[0]}${o.value[0]}`),f,e):void 0;return{mergedClsPrefix:n,rtlEnabled:a,mergedIconPlacement:o,mergedTheme:u,handlePositiveClick:s,handleNegativeClick:c,handleCloseClick:l,cssVars:r?void 0:f,themeClass:p?.themeClass,onRender:p?.onRender}},render(){var e;let{bordered:t,mergedIconPlacement:r,cssVars:i,closable:a,showIcon:o,title:s,content:c,action:l,negativeText:u,positiveText:d,positiveButtonProps:f,negativeButtonProps:p,handlePositiveClick:m,handleNegativeClick:h,mergedTheme:v,loading:y,type:b,mergedClsPrefix:x}=this;(e=this.onRender)==null||e.call(this);let S=o?n(T,{clsPrefix:x,class:`${x}-dialog__icon`},{default:()=>_(this.$slots.icon,e=>e||(this.icon?G(this.icon):Be[this.type]()))}):null,C=_(this.$slots.action,e=>e||d||u||l?n(`div`,{class:[`${x}-dialog__action`,this.actionClass],style:this.actionStyle},e||(l?[G(l)]:[this.negativeText&&n(k,Object.assign({theme:v.peers.Button,themeOverrides:v.peerOverrides.Button,ghost:!0,size:`small`,onClick:h},p),{default:()=>G(this.negativeText)}),this.positiveText&&n(k,Object.assign({theme:v.peers.Button,themeOverrides:v.peerOverrides.Button,size:`small`,type:b==="default"?`primary`:b,disabled:y,loading:y,onClick:m},f),{default:()=>G(this.positiveText)})])):null);return n(`div`,{class:[`${x}-dialog`,this.themeClass,this.closable&&`${x}-dialog--closable`,`${x}-dialog--icon-${r}`,t&&`${x}-dialog--bordered`,this.rtlEnabled&&`${x}-dialog--rtl`],style:i,role:`dialog`},a?_(this.$slots.close,e=>{let t=[`${x}-dialog__close`,this.rtlEnabled&&`${x}-dialog--rtl`];return e?n(`div`,{class:t},e):n(g,{focusable:this.closeFocusable,clsPrefix:x,class:t,onClick:this.handleCloseClick})}):null,o&&r===`top`?n(`div`,{class:`${x}-dialog-icon-container`},S):null,n(`div`,{class:[`${x}-dialog__title`,this.titleClass],style:this.titleStyle},o&&r===`left`?S:null,L(this.$slots.header,()=>[G(s)])),n(`div`,{class:[`${x}-dialog__content`,C?``:`${x}-dialog__content--last`,this.contentClass],style:this.contentStyle},L(this.$slots.default,()=>[G(c)])),C)}});function He(e){let{modalColor:t,textColor2:n,boxShadow3:r}=e;return{color:t,textColor:n,boxShadow:r}}var Ue=s({name:`Modal`,common:v,peers:{Scrollbar:i,Dialog:Le,Card:we},self:He}),Q=`n-draggable`;function We(e,t){let n,r=I(()=>e.value!==!1),i=I(()=>r.value?Q:``),a=I(()=>{let t=e.value;return t===!0||t===!1||!t||t.bounds!==`none`});function o(e){let r=e.querySelector(`.${Q}`);if(!r||!i.value)return;let o=0,s=0,c=0,l=0,d=0,f=0,p,m=null,h=null;function g(t){t.preventDefault(),p=t;let{x:n,y:r,right:i,bottom:a}=e.getBoundingClientRect();s=n,l=r,o=window.innerWidth-i,c=window.innerHeight-a;let{left:u,top:m}=e.style;d=+m.slice(0,-2),f=+u.slice(0,-2)}function _(){h&&=(e.style.top=`${h.y}px`,e.style.left=`${h.x}px`,null),m=null}function v(e){if(!p)return;let{clientX:t,clientY:n}=p,r=e.clientX-t,i=e.clientY-n;a.value&&(r>o?r=o:-r>s&&(r=-s),i>c?i=c:-i>l&&(i=-l)),h={x:r+f,y:i+d},m||=requestAnimationFrame(_)}function y(){p=void 0,m&&=(cancelAnimationFrame(m),null),h&&=(e.style.top=`${h.y}px`,e.style.left=`${h.x}px`,null),t.onEnd(e)}O(`mousedown`,r,g),O(`mousemove`,window,v),O(`mouseup`,window,y),n=()=>{m&&cancelAnimationFrame(m),u(`mousedown`,r,g),u(`mousemove`,window,v),u(`mouseup`,window,y)}}function s(){n&&=(n(),void 0)}return D(s),{stopDrag:s,startDrag:o,draggableRef:r,draggableClassRef:i}}var $=Object.assign(Object.assign({},Ee),Z),Ge=K($),Ke=x({name:`ModalBody`,inheritAttrs:!1,slots:Object,props:Object.assign(Object.assign({show:{type:Boolean,required:!0},preset:String,displayDirective:{type:String,required:!0},trapFocus:{type:Boolean,default:!0},autoFocus:{type:Boolean,default:!0},blockScroll:Boolean,draggable:{type:[Boolean,Object],default:!1},maskHidden:Boolean},$),{renderMask:Function,onClickoutside:Function,onBeforeLeave:{type:Function,required:!0},onAfterLeave:{type:Function,required:!0},onPositiveClick:{type:Function,required:!0},onNegativeClick:{type:Function,required:!0},onClose:{type:Function,required:!0},onAfterEnter:Function,onEsc:Function}),setup(t){let n=N(null),r=N(null),i=N(t.show),a=N(null),o=N(null),s=E(W),c=null;F(z(t,`show`),e=>{e&&(c=s.getMousePosition())},{immediate:!0});let{stopDrag:l,startDrag:u,draggableRef:d,draggableClassRef:f}=We(z(t,`draggable`),{onEnd:e=>{g(e)}}),p=I(()=>oe([t.titleClass,f.value])),m=I(()=>oe([t.headerClass,f.value]));F(z(t,`show`),e=>{e&&(i.value=!0)}),xe(I(()=>t.blockScroll&&i.value));function h(){if(s.transformOriginRef.value===`center`)return``;let{value:e}=a,{value:t}=o;return e===null||t===null?``:r.value?`${e}px ${t+r.value.containerScrollTop}px`:``}function g(e){if(s.transformOriginRef.value===`center`||!c||!r.value)return;let t=r.value.containerScrollTop,{offsetLeft:n,offsetTop:i}=e,l=c.y,u=c.x;a.value=-(n-u),o.value=-(i-l-t),e.style.transformOrigin=h()}function _(e){w(()=>{g(e)})}function v(e){e.style.transformOrigin=h(),t.onBeforeLeave()}function y(e){let n=e;d.value&&u(n),t.onAfterEnter&&t.onAfterEnter(n)}function b(){i.value=!1,a.value=null,o.value=null,l(),t.onAfterLeave()}function x(){let{onClose:e}=t;e&&e()}function S(){t.onNegativeClick()}function C(){t.onPositiveClick()}let T=N(null);return F(T,e=>{e&&w(()=>{let t=e.el;t&&n.value!==t&&(n.value=t)})}),e(ve,n),e(ye,null),e(de,null),{mergedTheme:s.mergedThemeRef,appear:s.appearRef,isMounted:s.isMountedRef,mergedClsPrefix:s.mergedClsPrefixRef,bodyRef:n,scrollbarRef:r,draggableClass:f,displayed:i,childNodeRef:T,cardHeaderClass:m,dialogTitleClass:p,handlePositiveClick:C,handleNegativeClick:S,handleCloseClick:x,handleAfterEnter:y,handleAfterLeave:b,handleBeforeLeave:v,handleEnter:_}},render(){let{$slots:e,$attrs:i,handleEnter:a,handleAfterEnter:o,handleAfterLeave:s,handleBeforeLeave:l,preset:u,mergedClsPrefix:d}=this,f=null;if(!u){if(f=he(`default`,e.default,{draggableClass:this.draggableClass}),!f){h(`modal`,`default slot is empty`);return}f=t(f),f.props=c({class:`${d}-modal`},i,f.props||{})}return this.displayDirective===`show`||this.displayed||this.show?B(n(`div`,{role:`none`,class:[`${d}-modal-body-wrapper`,this.maskHidden&&`${d}-modal-body-wrapper--mask-hidden`]},n(se,{ref:`scrollbarRef`,theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar,contentClass:`${d}-modal-scroll-content`},{default:()=>[this.renderMask?.call(this),n(pe,{disabled:!this.trapFocus||this.maskHidden,active:this.show,onEsc:this.onEsc,autoFocus:this.autoFocus},{default:()=>n(A,{name:`fade-in-scale-up-transition`,appear:this.appear??this.isMounted,onEnter:a,onAfterEnter:o,onAfterLeave:s,onBeforeLeave:l},{default:()=>{let t=[[r,this.show]],{onClickoutside:i}=this;return i&&t.push([ge,this.onClickoutside,void 0,{capture:!0}]),B(this.preset===`confirm`||this.preset===`dialog`?n(Ve,Object.assign({},this.$attrs,{class:[`${d}-modal`,this.$attrs.class],ref:`bodyRef`,theme:this.mergedTheme.peers.Dialog,themeOverrides:this.mergedTheme.peerOverrides.Dialog},H(this.$props,Re),{titleClass:this.dialogTitleClass,"aria-modal":`true`}),e):this.preset===`card`?n(De,Object.assign({},this.$attrs,{ref:`bodyRef`,class:[`${d}-modal`,this.$attrs.class],theme:this.mergedTheme.peers.Card,themeOverrides:this.mergedTheme.peerOverrides.Card},H(this.$props,Te),{headerClass:this.cardHeaderClass,"aria-modal":`true`,role:`dialog`}),e):this.childNodeRef=f,t)}})})]})),[[r,this.displayDirective===`if`||this.displayed||this.show]]):null}}),qe=j([R(`modal-container`,`
 position: fixed;
 left: 0;
 top: 0;
 height: 0;
 width: 0;
 display: flex;
 `),R(`modal-mask`,`
 position: fixed;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 background-color: rgba(0, 0, 0, .4);
 `,[ne({enterDuration:`.25s`,leaveDuration:`.25s`,enterCubicBezier:`var(--n-bezier-ease-out)`,leaveCubicBezier:`var(--n-bezier-ease-out)`})]),R(`modal-body-wrapper`,`
 position: fixed;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 overflow: visible;
 `,[R(`modal-scroll-content`,`
 min-height: 100%;
 display: flex;
 position: relative;
 `),P(`mask-hidden`,`pointer-events: none;`,[R(`modal-scroll-content`,[j(`> *`,`
 pointer-events: all;
 `)])])]),R(`modal`,`
 position: relative;
 align-self: center;
 color: var(--n-text-color);
 margin: auto;
 box-shadow: var(--n-box-shadow);
 `,[Ce({duration:`.25s`,enterScale:`.5`}),j(`.${Q}`,`
 cursor: move;
 user-select: none;
 `)])]),Je=Object.assign(Object.assign(Object.assign(Object.assign({},C.props),{show:Boolean,showMask:{type:Boolean,default:!0},maskClosable:{type:Boolean,default:!0},preset:String,to:[String,Object],displayDirective:{type:String,default:`if`},transformOrigin:{type:String,default:`mouse`},zIndex:Number,autoFocus:{type:Boolean,default:!0},trapFocus:{type:Boolean,default:!0},closeOnEsc:{type:Boolean,default:!0},blockScroll:{type:Boolean,default:!0}}),$),{draggable:[Boolean,Object],onEsc:Function,"onUpdate:show":[Function,Array],onUpdateShow:[Function,Array],onAfterEnter:Function,onBeforeLeave:Function,onAfterLeave:Function,onClose:Function,onPositiveClick:Function,onNegativeClick:Function,onMaskClick:Function,internalDialog:Boolean,internalModal:Boolean,internalAppear:{type:Boolean,default:void 0},overlayStyle:[String,Object],onBeforeHide:Function,onAfterHide:Function,onHide:Function,unstableShowMask:{type:Boolean,default:void 0}}),Ye=x({name:`Modal`,inheritAttrs:!1,props:Je,slots:Object,setup(t){let n=N(null),{mergedClsPrefixRef:r,namespaceRef:i,inlineThemeDisabled:a}=S(t),o=C(`Modal`,`-modal`,qe,Ue,t,r),s=Pe(64),c=Ae(),l=p(),u=t.internalDialog?E(Oe,null):null,d=t.internalModal?E(fe,null):null,f=be();function m(e){let{onUpdateShow:n,"onUpdate:show":r,onHide:i}=t;n&&y(n,e),r&&y(r,e),i&&!e&&i(e)}function h(){let{onClose:e}=t;e?Promise.resolve(e()).then(e=>{e!==!1&&m(!1)}):m(!1)}function g(){let{onPositiveClick:e}=t;e?Promise.resolve(e()).then(e=>{e!==!1&&m(!1)}):m(!1)}function _(){let{onNegativeClick:e}=t;e?Promise.resolve(e()).then(e=>{e!==!1&&m(!1)}):m(!1)}function v(){let{onBeforeLeave:e,onBeforeHide:n}=t;e&&y(e),n&&n()}function b(){let{onAfterLeave:e,onAfterHide:n}=t;e&&y(e),n&&n()}function x(e){let{onMaskClick:r}=t;r&&r(e),t.maskClosable&&n.value?.contains(ie(e))&&m(!1)}function w(e){var n;(n=t.onEsc)==null||n.call(t),t.show&&t.closeOnEsc&&Se(e)&&(f.value||m(!1))}e(W,{getMousePosition:()=>{let e=u||d;if(e){let{clickedRef:t,clickedPositionRef:n}=e;if(t.value&&n.value)return n.value}return s.value?c.value:null},mergedClsPrefixRef:r,mergedThemeRef:o,isMountedRef:l,appearRef:z(t,`internalAppear`),transformOriginRef:z(t,`transformOrigin`)});let T=I(()=>{let{common:{cubicBezierEaseOut:e},self:{boxShadow:t,color:n,textColor:r}}=o.value;return{"--n-bezier-ease-out":e,"--n-box-shadow":t,"--n-color":n,"--n-text-color":r}}),D=a?ce(`theme-class`,void 0,T,t):void 0;return{mergedClsPrefix:r,namespace:i,isMounted:l,containerRef:n,presetProps:I(()=>H(t,Ge)),handleEsc:w,handleAfterLeave:b,handleClickoutside:x,handleBeforeLeave:v,doUpdateShow:m,handleNegativeClick:_,handlePositiveClick:g,handleCloseClick:h,cssVars:a?void 0:T,themeClass:D?.themeClass,onRender:D?.onRender}},render(){let{mergedClsPrefix:e}=this;return n(me,{to:this.to,show:this.show},{default:()=>{var t;(t=this.onRender)==null||t.call(this);let{showMask:r}=this;return B(n(`div`,{role:`none`,ref:`containerRef`,class:[`${e}-modal-container`,this.themeClass,this.namespace],style:this.cssVars},n(Ke,Object.assign({style:this.overlayStyle},this.$attrs,{ref:`bodyWrapper`,displayDirective:this.displayDirective,show:this.show,preset:this.preset,autoFocus:this.autoFocus,trapFocus:this.trapFocus,draggable:this.draggable,blockScroll:this.blockScroll,maskHidden:!r},this.presetProps,{onEsc:this.handleEsc,onClose:this.handleCloseClick,onNegativeClick:this.handleNegativeClick,onPositiveClick:this.handlePositiveClick,onBeforeLeave:this.handleBeforeLeave,onAfterEnter:this.onAfterEnter,onAfterLeave:this.handleAfterLeave,onClickoutside:r?void 0:this.handleClickoutside,renderMask:r?()=>n(A,{name:`fade-in-transition`,key:`mask`,appear:this.internalAppear??this.isMounted},{default:()=>this.show?n(`div`,{"aria-hidden":!0,ref:`containerRef`,class:`${e}-modal-mask`,onClick:this.handleClickoutside}):null}):void 0}),this.$slots)),[[_e,{zIndex:this.zIndex,enabled:this.show}]])}})}});export{Z as a,Ae as c,Re as i,He as n,Ie as o,Ve as r,Pe as s,Ye as t};