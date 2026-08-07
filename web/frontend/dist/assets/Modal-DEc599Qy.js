import{An as e,At as t,B as n,Bn as r,C as i,Ct as a,D as o,F as s,G as c,Gn as l,Gt as u,H as d,Hn as f,I as p,It as m,Jt as h,L as g,Ln as _,M as v,Mt as y,Nt as b,O as x,P as S,Qn as C,Sn as w,T,V as E,Vn as D,Wn as O,Yn as ee,_ as k,_r as A,an as te,cn as j,dn as M,kn as ne,lr as N,mn as re,on as ie,or as P,pn as ae,pr as F,qt as I,rn as oe,rr as L,sn as R,un as z,ur as B,wt as V,y as se,yn as ce,zn as H}from"./auth-DAwZXSzT.js";import{C as le,_ as ue,b as de,d as fe,f as pe,l as me,m as he,p as ge,s as U,v as _e,w as W,x as ve,y as G}from"./useTheme-DVrwDudx.js";import{n as ye,t as be}from"./use-lock-html-scroll-CpU0cjTX.js";import{r as xe,t as K}from"./render-DZdFrPBV.js";import{l as q}from"./light-BznnZPhN.js";import{t as Se}from"./fade-in-scale-up.cssr-DaK_aF6Q.js";import{i as Ce,n as we,r as Te,t as Ee}from"./Card-CnUktULD.js";import{n as De}from"./context-Cy22Sn7B.js";var J=B(null);function Oe(e){if(e.clientX>0||e.clientY>0)J.value={x:e.clientX,y:e.clientY};else{let{target:t}=e;if(t instanceof Element){let{left:e,top:n,width:r,height:i}=t.getBoundingClientRect();J.value=e>0||n>0?{x:e+r/2,y:n+i/2}:{x:0,y:0}}else J.value=null}}var Y=0,ke=!0;function Ae(){if(!W)return N(B(null));Y===0&&h(`click`,document,Oe,!0);let e=()=>{Y+=1};return(ke&&=le())?(O(e),l(()=>{--Y,Y===0&&I(`click`,document,Oe,!0)})):e(),N(J)}var je=B(void 0),X=0;function Me(){je.value=Date.now()}var Ne=!0;function Pe(e){if(!W)return N(B(!1));let t=B(!1),n=null;function r(){n!==null&&window.clearTimeout(n)}function i(){r(),t.value=!0,n=window.setTimeout(()=>{t.value=!1},e)}X===0&&h(`click`,window,Me,!0);let a=()=>{X+=1,h(`click`,window,i,!0)};return(Ne&&=le())?(O(a),l(()=>{--X,X===0&&I(`click`,window,Me,!0),I(`click`,window,i,!0),r()})):a(),N(t)}var Fe={titleFontSize:`18px`,padding:`16px 28px 20px 28px`,iconSize:`28px`,actionSpace:`12px`,contentMargin:`8px 0 16px 0`,iconMargin:`0 4px 0 0`,iconMarginIconTop:`4px 0 8px 0`,closeSize:`22px`,closeIconSize:`18px`,closeMargin:`20px 26px 0 0`,closeMarginIconTop:`10px 16px 0 0`};function Ie(e){let{textColor1:t,textColor2:n,modalColor:r,closeIconColor:i,closeIconColorHover:a,closeIconColorPressed:o,closeColorHover:s,closeColorPressed:c,infoColor:l,successColor:u,warningColor:d,errorColor:f,primaryColor:p,dividerColor:m,borderRadius:h,fontWeightStrong:g,lineHeight:_,fontSize:v}=e;return Object.assign(Object.assign({},Fe),{fontSize:v,lineHeight:_,border:`1px solid ${m}`,titleTextColor:t,textColor:n,color:r,closeColorHover:s,closeColorPressed:c,closeIconColor:i,closeIconColorHover:a,closeIconColorPressed:o,closeBorderRadius:h,iconColor:p,iconColorInfo:l,iconColorSuccess:u,iconColorWarning:d,iconColorError:f,borderRadius:h,titleFontWeight:g})}var Le=E({name:`Dialog`,common:o,peers:{Button:se},self:Ie}),Z={icon:Function,type:{type:String,default:`default`},title:[String,Function],closable:{type:Boolean,default:!0},negativeText:String,positiveText:String,positiveButtonProps:Object,negativeButtonProps:Object,content:[String,Function],action:Function,showIcon:{type:Boolean,default:!0},loading:Boolean,bordered:Boolean,iconPlacement:String,titleClass:[String,Array],titleStyle:[String,Object],contentClass:[String,Array],contentStyle:[String,Object],actionClass:[String,Array],actionStyle:[String,Object],onPositiveClick:Function,onNegativeClick:Function,onClose:Function,closeFocusable:Boolean},Re=q(Z),ze=R([j(`dialog`,`
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
 `,[z(`icon`,`
 color: var(--n-icon-color);
 `),M(`bordered`,`
 border: var(--n-border);
 `),M(`icon-top`,[z(`close`,`
 margin: var(--n-close-margin);
 `),z(`icon`,`
 margin: var(--n-icon-margin);
 `),z(`content`,`
 text-align: center;
 `),z(`title`,`
 justify-content: center;
 `),z(`action`,`
 justify-content: center;
 `)]),M(`icon-left`,[z(`icon`,`
 margin: var(--n-icon-margin);
 `),M(`closable`,[z(`title`,`
 padding-right: calc(var(--n-close-size) + 6px);
 `)])]),z(`close`,`
 position: absolute;
 right: 0;
 top: 0;
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 z-index: 1;
 `),z(`content`,`
 font-size: var(--n-font-size);
 margin: var(--n-content-margin);
 position: relative;
 word-break: break-word;
 `,[M(`last`,`margin-bottom: 0;`)]),z(`action`,`
 display: flex;
 justify-content: flex-end;
 `,[R(`> *:not(:last-child)`,`
 margin-right: var(--n-action-space);
 `)]),z(`icon`,`
 font-size: var(--n-icon-size);
 transition: color .3s var(--n-bezier);
 `),z(`title`,`
 transition: color .3s var(--n-bezier);
 display: flex;
 align-items: center;
 font-size: var(--n-title-font-size);
 font-weight: var(--n-title-font-weight);
 color: var(--n-title-text-color);
 `),j(`dialog-icon-container`,`
 display: flex;
 justify-content: center;
 `)]),re(j(`dialog`,`
 width: 446px;
 max-width: calc(100vw - 32px);
 `)),j(`dialog`,[ie(`
 width: 446px;
 max-width: calc(100vw - 32px);
 `)])]),Be={default:()=>H(p,null),info:()=>H(p,null),success:()=>H(s,null),warning:()=>H(S,null),error:()=>H(g,null)},Ve=_({name:`Dialog`,alias:[`NimbusConfirmCard`,`Confirm`],props:Object.assign(Object.assign({},d.props),Z),slots:Object,setup(t){let{mergedComponentPropsRef:n,mergedClsPrefixRef:r,inlineThemeDisabled:i,mergedRtlRef:o}=V(t),s=c(`Dialog`,o,r),l=e(()=>{let{iconPlacement:e}=t;return e||n?.value?.Dialog?.iconPlacement||`left`});function u(e){let{onPositiveClick:n}=t;n&&n(e)}function f(e){let{onNegativeClick:n}=t;n&&n(e)}function p(){let{onClose:e}=t;e&&e()}let m=d(`Dialog`,`-dialog`,ze,Le,t,r),h=e(()=>{let{type:e}=t,n=l.value,{common:{cubicBezierEaseInOut:r},self:{fontSize:i,lineHeight:a,border:o,titleTextColor:s,textColor:c,color:u,closeBorderRadius:d,closeColorHover:f,closeColorPressed:p,closeIconColor:h,closeIconColorHover:g,closeIconColorPressed:_,closeIconSize:v,borderRadius:y,titleFontWeight:b,titleFontSize:x,padding:S,iconSize:C,actionSpace:w,contentMargin:T,closeSize:E,[n===`top`?`iconMarginIconTop`:`iconMargin`]:D,[n===`top`?`closeMarginIconTop`:`closeMargin`]:O,[ae(`iconColor`,e)]:ee}}=m.value,k=oe(D);return{"--n-font-size":i,"--n-icon-color":ee,"--n-bezier":r,"--n-close-margin":O,"--n-icon-margin-top":k.top,"--n-icon-margin-right":k.right,"--n-icon-margin-bottom":k.bottom,"--n-icon-margin-left":k.left,"--n-icon-size":C,"--n-close-size":E,"--n-close-icon-size":v,"--n-close-border-radius":d,"--n-close-color-hover":f,"--n-close-color-pressed":p,"--n-close-icon-color":h,"--n-close-icon-color-hover":g,"--n-close-icon-color-pressed":_,"--n-color":u,"--n-text-color":c,"--n-border-radius":y,"--n-padding":S,"--n-line-height":a,"--n-border":o,"--n-content-margin":T,"--n-title-font-size":x,"--n-title-font-weight":b,"--n-title-text-color":s,"--n-action-space":w}}),g=i?a(`dialog`,e(()=>`${t.type[0]}${l.value[0]}`),h,t):void 0;return{mergedClsPrefix:r,rtlEnabled:s,mergedIconPlacement:l,mergedTheme:m,handlePositiveClick:u,handleNegativeClick:f,handleCloseClick:p,cssVars:i?void 0:h,themeClass:g?.themeClass,onRender:g?.onRender}},render(){var e;let{bordered:r,mergedIconPlacement:i,cssVars:a,closable:o,showIcon:s,title:c,content:l,action:u,negativeText:d,positiveText:f,positiveButtonProps:p,negativeButtonProps:m,handlePositiveClick:h,handleNegativeClick:g,mergedTheme:_,loading:b,type:x,mergedClsPrefix:S}=this;(e=this.onRender)==null||e.call(this);let C=s?H(n,{clsPrefix:S,class:`${S}-dialog__icon`},{default:()=>y(this.$slots.icon,e=>e||(this.icon?K(this.icon):Be[this.type]()))}):null,w=y(this.$slots.action,e=>e||f||d||u?H(`div`,{class:[`${S}-dialog__action`,this.actionClass],style:this.actionStyle},e||(u?[K(u)]:[this.negativeText&&H(k,Object.assign({theme:_.peers.Button,themeOverrides:_.peerOverrides.Button,ghost:!0,size:`small`,onClick:g},m),{default:()=>K(this.negativeText)}),this.positiveText&&H(k,Object.assign({theme:_.peers.Button,themeOverrides:_.peerOverrides.Button,size:`small`,type:x==="default"?`primary`:x,disabled:b,loading:b,onClick:h},p),{default:()=>K(this.positiveText)})])):null);return H(`div`,{class:[`${S}-dialog`,this.themeClass,this.closable&&`${S}-dialog--closable`,`${S}-dialog--icon-${i}`,r&&`${S}-dialog--bordered`,this.rtlEnabled&&`${S}-dialog--rtl`],style:a,role:`dialog`},o?y(this.$slots.close,e=>{let t=[`${S}-dialog__close`,this.rtlEnabled&&`${S}-dialog--rtl`];return e?H(`div`,{class:t},e):H(v,{focusable:this.closeFocusable,clsPrefix:S,class:t,onClick:this.handleCloseClick})}):null,s&&i===`top`?H(`div`,{class:`${S}-dialog-icon-container`},C):null,H(`div`,{class:[`${S}-dialog__title`,this.titleClass],style:this.titleStyle},s&&i===`left`?C:null,t(this.$slots.header,()=>[K(c)])),H(`div`,{class:[`${S}-dialog__content`,w?``:`${S}-dialog__content--last`,this.contentClass],style:this.contentStyle},t(this.$slots.default,()=>[K(l)])),w)}});function He(e){let{modalColor:t,textColor2:n,boxShadow3:r}=e;return{color:t,textColor:n,boxShadow:r}}var Ue=E({name:`Modal`,common:o,peers:{Scrollbar:T,Dialog:Le,Card:Ce},self:He}),Q=`n-draggable`;function We(t,n){let r,i=e(()=>t.value!==!1),a=e(()=>i.value?Q:``),o=e(()=>{let e=t.value;return e===!0||e===!1||!e||e.bounds!==`none`});function s(e){let t=e.querySelector(`.${Q}`);if(!t||!a.value)return;let i=0,s=0,c=0,l=0,u=0,d=0,f,p=null,m=null;function g(t){t.preventDefault(),f=t;let{x:n,y:r,right:a,bottom:o}=e.getBoundingClientRect();s=n,l=r,i=window.innerWidth-a,c=window.innerHeight-o;let{left:p,top:m}=e.style;u=+m.slice(0,-2),d=+p.slice(0,-2)}function _(){m&&=(e.style.top=`${m.y}px`,e.style.left=`${m.x}px`,null),p=null}function v(e){if(!f)return;let{clientX:t,clientY:n}=f,r=e.clientX-t,a=e.clientY-n;o.value&&(r>i?r=i:-r>s&&(r=-s),a>c?a=c:-a>l&&(a=-l)),m={x:r+d,y:a+u},p||=requestAnimationFrame(_)}function y(){f=void 0,p&&=(cancelAnimationFrame(p),null),m&&=(e.style.top=`${m.y}px`,e.style.left=`${m.x}px`,null),n.onEnd(e)}h(`mousedown`,t,g),h(`mousemove`,window,v),h(`mouseup`,window,y),r=()=>{p&&cancelAnimationFrame(p),I(`mousedown`,t,g),I(`mousemove`,window,v),I(`mouseup`,window,y)}}function c(){r&&=(r(),void 0)}return ee(c),{stopDrag:c,startDrag:s,draggableRef:i,draggableClassRef:a}}var $=Object.assign(Object.assign({},Te),Z),Ge=q($),Ke=_({name:`ModalBody`,inheritAttrs:!1,slots:Object,props:Object.assign(Object.assign({show:{type:Boolean,required:!0},preset:String,displayDirective:{type:String,required:!0},trapFocus:{type:Boolean,default:!0},autoFocus:{type:Boolean,default:!0},blockScroll:Boolean,draggable:{type:[Boolean,Object],default:!1},maskHidden:Boolean},$),{renderMask:Function,onClickoutside:Function,onBeforeLeave:{type:Function,required:!0},onAfterLeave:{type:Function,required:!0},onPositiveClick:{type:Function,required:!0},onNegativeClick:{type:Function,required:!0},onClose:{type:Function,required:!0},onAfterEnter:Function,onEsc:Function}),setup(t){let n=B(null),i=B(null),a=B(t.show),o=B(null),s=B(null),c=r(G),l=null;L(F(t,`show`),e=>{e&&(l=c.getMousePosition())},{immediate:!0});let{stopDrag:u,startDrag:d,draggableRef:p,draggableClassRef:m}=We(F(t,`draggable`),{onEnd:e=>{v(e)}}),h=e(()=>A([t.titleClass,m.value])),g=e(()=>A([t.headerClass,m.value]));L(F(t,`show`),e=>{e&&(a.value=!0)}),be(e(()=>t.blockScroll&&a.value));function _(){if(c.transformOriginRef.value===`center`)return``;let{value:e}=o,{value:t}=s;return e===null||t===null?``:i.value?`${e}px ${t+i.value.containerScrollTop}px`:``}function v(e){if(c.transformOriginRef.value===`center`||!l||!i.value)return;let t=i.value.containerScrollTop,{offsetLeft:n,offsetTop:r}=e,a=l.y,u=l.x;o.value=-(n-u),s.value=-(r-a-t),e.style.transformOrigin=_()}function y(e){f(()=>{v(e)})}function b(e){e.style.transformOrigin=_(),t.onBeforeLeave()}function x(e){let n=e;p.value&&d(n),t.onAfterEnter&&t.onAfterEnter(n)}function S(){a.value=!1,o.value=null,s.value=null,u(),t.onAfterLeave()}function w(){let{onClose:e}=t;e&&e()}function T(){t.onNegativeClick()}function E(){t.onPositiveClick()}let D=B(null);return L(D,e=>{e&&f(()=>{let t=e.el;t&&n.value!==t&&(n.value=t)})}),C(_e,n),C(ve,null),C(ue,null),{mergedTheme:c.mergedThemeRef,appear:c.appearRef,isMounted:c.isMountedRef,mergedClsPrefix:c.mergedClsPrefixRef,bodyRef:n,scrollbarRef:i,draggableClass:m,displayed:a,childNodeRef:D,cardHeaderClass:g,dialogTitleClass:h,handlePositiveClick:E,handleNegativeClick:T,handleCloseClick:w,handleAfterEnter:x,handleAfterLeave:S,handleBeforeLeave:b,handleEnter:y}},render(){let{$slots:e,$attrs:t,handleEnter:n,handleAfterEnter:r,handleAfterLeave:a,handleBeforeLeave:o,preset:s,mergedClsPrefix:c}=this,l=null;if(!s){if(l=me(`default`,e.default,{draggableClass:this.draggableClass}),!l){m(`modal`,`default slot is empty`);return}l=ne(l),l.props=D({class:`${c}-modal`},t,l.props||{})}return this.displayDirective===`show`||this.displayed||this.show?P(H(`div`,{role:`none`,class:[`${c}-modal-body-wrapper`,this.maskHidden&&`${c}-modal-body-wrapper--mask-hidden`]},H(i,{ref:`scrollbarRef`,theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar,contentClass:`${c}-modal-scroll-content`},{default:()=>[this.renderMask?.call(this),H(fe,{disabled:!this.trapFocus||this.maskHidden,active:this.show,onEsc:this.onEsc,autoFocus:this.autoFocus},{default:()=>H(ce,{name:`fade-in-scale-up-transition`,appear:this.appear??this.isMounted,onEnter:n,onAfterEnter:r,onAfterLeave:a,onBeforeLeave:o},{default:()=>{let t=[[w,this.show]],{onClickoutside:n}=this;return n&&t.push([he,this.onClickoutside,void 0,{capture:!0}]),P(this.preset===`confirm`||this.preset===`dialog`?H(Ve,Object.assign({},this.$attrs,{class:[`${c}-modal`,this.$attrs.class],ref:`bodyRef`,theme:this.mergedTheme.peers.Dialog,themeOverrides:this.mergedTheme.peerOverrides.Dialog},U(this.$props,Re),{titleClass:this.dialogTitleClass,"aria-modal":`true`}),e):this.preset===`card`?H(Ee,Object.assign({},this.$attrs,{ref:`bodyRef`,class:[`${c}-modal`,this.$attrs.class],theme:this.mergedTheme.peers.Card,themeOverrides:this.mergedTheme.peerOverrides.Card},U(this.$props,we),{headerClass:this.cardHeaderClass,"aria-modal":`true`,role:`dialog`}),e):this.childNodeRef=l,t)}})})]})),[[w,this.displayDirective===`if`||this.displayed||this.show]]):null}}),qe=R([j(`modal-container`,`
 position: fixed;
 left: 0;
 top: 0;
 height: 0;
 width: 0;
 display: flex;
 `),j(`modal-mask`,`
 position: fixed;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 background-color: rgba(0, 0, 0, .4);
 `,[x({enterDuration:`.25s`,leaveDuration:`.25s`,enterCubicBezier:`var(--n-bezier-ease-out)`,leaveCubicBezier:`var(--n-bezier-ease-out)`})]),j(`modal-body-wrapper`,`
 position: fixed;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 overflow: visible;
 `,[j(`modal-scroll-content`,`
 min-height: 100%;
 display: flex;
 position: relative;
 `),M(`mask-hidden`,`pointer-events: none;`,[j(`modal-scroll-content`,[R(`> *`,`
 pointer-events: all;
 `)])])]),j(`modal`,`
 position: relative;
 align-self: center;
 color: var(--n-text-color);
 margin: auto;
 box-shadow: var(--n-box-shadow);
 `,[Se({duration:`.25s`,enterScale:`.5`}),R(`.${Q}`,`
 cursor: move;
 user-select: none;
 `)])]),Je=Object.assign(Object.assign(Object.assign(Object.assign({},d.props),{show:Boolean,showMask:{type:Boolean,default:!0},maskClosable:{type:Boolean,default:!0},preset:String,to:[String,Object],displayDirective:{type:String,default:`if`},transformOrigin:{type:String,default:`mouse`},zIndex:Number,autoFocus:{type:Boolean,default:!0},trapFocus:{type:Boolean,default:!0},closeOnEsc:{type:Boolean,default:!0},blockScroll:{type:Boolean,default:!0}}),$),{draggable:[Boolean,Object],onEsc:Function,"onUpdate:show":[Function,Array],onUpdateShow:[Function,Array],onAfterEnter:Function,onBeforeLeave:Function,onAfterLeave:Function,onClose:Function,onPositiveClick:Function,onNegativeClick:Function,onMaskClick:Function,internalDialog:Boolean,internalModal:Boolean,internalAppear:{type:Boolean,default:void 0},overlayStyle:[String,Object],onBeforeHide:Function,onAfterHide:Function,onHide:Function,unstableShowMask:{type:Boolean,default:void 0}}),Ye=_({name:`Modal`,inheritAttrs:!1,props:Je,slots:Object,setup(t){let n=B(null),{mergedClsPrefixRef:i,namespaceRef:o,inlineThemeDisabled:s}=V(t),c=d(`Modal`,`-modal`,qe,Ue,t,i),l=Pe(64),f=Ae(),p=u(),m=t.internalDialog?r(De,null):null,h=t.internalModal?r(de,null):null,g=ye();function _(e){let{onUpdateShow:n,"onUpdate:show":r,onHide:i}=t;n&&b(n,e),r&&b(r,e),i&&!e&&i(e)}function v(){let{onClose:e}=t;e?Promise.resolve(e()).then(e=>{e!==!1&&_(!1)}):_(!1)}function y(){let{onPositiveClick:e}=t;e?Promise.resolve(e()).then(e=>{e!==!1&&_(!1)}):_(!1)}function x(){let{onNegativeClick:e}=t;e?Promise.resolve(e()).then(e=>{e!==!1&&_(!1)}):_(!1)}function S(){let{onBeforeLeave:e,onBeforeHide:n}=t;e&&b(e),n&&n()}function w(){let{onAfterLeave:e,onAfterHide:n}=t;e&&b(e),n&&n()}function T(e){let{onMaskClick:r}=t;r&&r(e),t.maskClosable&&n.value?.contains(te(e))&&_(!1)}function E(e){var n;(n=t.onEsc)==null||n.call(t),t.show&&t.closeOnEsc&&xe(e)&&(g.value||_(!1))}C(G,{getMousePosition:()=>{let e=m||h;if(e){let{clickedRef:t,clickedPositionRef:n}=e;if(t.value&&n.value)return n.value}return l.value?f.value:null},mergedClsPrefixRef:i,mergedThemeRef:c,isMountedRef:p,appearRef:F(t,`internalAppear`),transformOriginRef:F(t,`transformOrigin`)});let D=e(()=>{let{common:{cubicBezierEaseOut:e},self:{boxShadow:t,color:n,textColor:r}}=c.value;return{"--n-bezier-ease-out":e,"--n-box-shadow":t,"--n-color":n,"--n-text-color":r}}),O=s?a(`theme-class`,void 0,D,t):void 0;return{mergedClsPrefix:i,namespace:o,isMounted:p,containerRef:n,presetProps:e(()=>U(t,Ge)),handleEsc:E,handleAfterLeave:w,handleClickoutside:T,handleBeforeLeave:S,doUpdateShow:_,handleNegativeClick:x,handlePositiveClick:y,handleCloseClick:v,cssVars:s?void 0:D,themeClass:O?.themeClass,onRender:O?.onRender}},render(){let{mergedClsPrefix:e}=this;return H(pe,{to:this.to,show:this.show},{default:()=>{var t;(t=this.onRender)==null||t.call(this);let{showMask:n}=this;return P(H(`div`,{role:`none`,ref:`containerRef`,class:[`${e}-modal-container`,this.themeClass,this.namespace],style:this.cssVars},H(Ke,Object.assign({style:this.overlayStyle},this.$attrs,{ref:`bodyWrapper`,displayDirective:this.displayDirective,show:this.show,preset:this.preset,autoFocus:this.autoFocus,trapFocus:this.trapFocus,draggable:this.draggable,blockScroll:this.blockScroll,maskHidden:!n},this.presetProps,{onEsc:this.handleEsc,onClose:this.handleCloseClick,onNegativeClick:this.handleNegativeClick,onPositiveClick:this.handlePositiveClick,onBeforeLeave:this.handleBeforeLeave,onAfterEnter:this.onAfterEnter,onAfterLeave:this.handleAfterLeave,onClickoutside:n?void 0:this.handleClickoutside,renderMask:n?()=>H(ce,{name:`fade-in-transition`,key:`mask`,appear:this.internalAppear??this.isMounted},{default:()=>this.show?H(`div`,{"aria-hidden":!0,ref:`containerRef`,class:`${e}-modal-mask`,onClick:this.handleClickoutside}):null}):void 0}),this.$slots)),[[ge,{zIndex:this.zIndex,enabled:this.show}]])}})}});export{Z as a,Ae as c,Re as i,He as n,Ie as o,Ve as r,Pe as s,Ye as t};