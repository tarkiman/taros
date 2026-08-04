import{At as e,B as t,Bt as n,Ct as r,D as i,E as a,Et as o,Ft as s,G as c,It as l,J as u,K as d,L as f,Mt as p,N as m,P as h,R as g,St as _,T as v,Tt as y,U as b,Ut as x,W as S,X as C,Y as w,Z as T,_ as E,_t as D,at as O,bt as k,c as A,et as j,f as ee,gt as M,h as te,lt as N,ot as ne,q as P,u as re,v as ie,vt as F,w as I,wt as ae,x as oe,xt as se,y as ce,yt as le,z as ue}from"./auth-BL8gKMVx.js";function de(e){return e.composedPath()[0]||null}function fe(e){return typeof e==`string`?e.endsWith(`px`)?Number(e.slice(0,e.length-2)):Number(e):e}function pe(e){if(e!=null)return typeof e==`number`?`${e}px`:e.endsWith(`px`)?e:`${e}px`}function L(e,t){let n=e.trim().split(/\s+/g),r={top:n[0]};switch(n.length){case 1:r.right=n[0],r.bottom=n[0],r.left=n[0];break;case 2:r.right=n[1],r.left=n[1],r.bottom=n[0];break;case 3:r.right=n[1],r.bottom=n[2],r.left=n[1];break;case 4:r.right=n[1],r.bottom=n[2],r.left=n[3];break;default:throw Error(`[seemly/getMargin]:`+e+` is not a valid value.`)}return t===void 0?r:r[t]}function R(e){return e.composedPath()[0]}var me={mousemoveoutside:new WeakMap,clickoutside:new WeakMap};function he(e,t,n){if(e===`mousemoveoutside`){let e=e=>{t.contains(R(e))||n(e)};return{mousemove:e,touchstart:e}}if(e===`clickoutside`){let e=!1,r=n=>{e=!t.contains(R(n))},i=r=>{e&&(t.contains(R(r))||n(r))};return{mousedown:r,mouseup:i,touchstart:r,touchend:i}}return console.error(`[evtd/create-trap-handler]: name \`${e}\` is invalid. This could be a bug of evtd.`),{}}function z(e,t,n){let r=me[e],i=r.get(t);i===void 0&&r.set(t,i=new WeakMap);let a=i.get(n);return a===void 0&&i.set(n,a=he(e,t,n)),a}function ge(e,t,n,r){if(e===`mousemoveoutside`||e===`clickoutside`){let i=z(e,t,n);return Object.keys(i).forEach(e=>{B(e,document,i[e],r)}),!0}return!1}function _e(e,t,n,r){if(e===`mousemoveoutside`||e===`clickoutside`){let i=z(e,t,n);return Object.keys(i).forEach(e=>{V(e,document,i[e],r)}),!0}return!1}function ve(){if(typeof window>`u`)return{on:()=>{},off:()=>{}};let e=new WeakMap,t=new WeakMap;function n(){e.set(this,!0)}function r(){e.set(this,!0),t.set(this,!0)}function i(e,t,n){let r=e[t];return e[t]=function(){return n.apply(e,arguments),r.apply(e,arguments)},e}function a(e,t){e[t]=Event.prototype[t]}let o=new WeakMap,s=Object.getOwnPropertyDescriptor(Event.prototype,`currentTarget`);function c(){return o.get(this)??null}function l(e,t){s!==void 0&&Object.defineProperty(e,"currentTarget",{configurable:!0,enumerable:!0,get:t??s.get})}let u={bubble:{},capture:{}},d={};function f(){let s=function(s){let{type:d,eventPhase:f,bubbles:p}=s,m=R(s);if(f===2)return;let h=f===1?`capture`:`bubble`,g=m,_=[];for(;g===null&&(g=window),_.push(g),g!==window;)g=g.parentNode||null;let v=u.capture[d],y=u.bubble[d];if(i(s,`stopPropagation`,n),i(s,`stopImmediatePropagation`,r),l(s,c),h===`capture`){if(v===void 0)return;for(let n=_.length-1;n>=0&&!e.has(s);--n){let e=_[n],r=v.get(e);if(r!==void 0){o.set(s,e);for(let e of r){if(t.has(s))break;e(s)}}if(n===0&&!p&&y!==void 0){let n=y.get(e);if(n!==void 0)for(let e of n){if(t.has(s))break;e(s)}}}}else if(h===`bubble`){if(y===void 0)return;for(let n=0;n<_.length&&!e.has(s);++n){let e=_[n],r=y.get(e);if(r!==void 0){o.set(s,e);for(let e of r){if(t.has(s))break;e(s)}}}}a(s,`stopPropagation`),a(s,`stopImmediatePropagation`),l(s)};return s.displayName=`evtdUnifiedHandler`,s}function p(){let e=function(e){let{type:t,eventPhase:n}=e;if(n!==2)return;let r=d[t];r!==void 0&&r.forEach(t=>t(e))};return e.displayName=`evtdUnifiedWindowEventHandler`,e}let m=f(),h=p();function g(e,t){let n=u[e];return n[t]===void 0&&(n[t]=new Map,window.addEventListener(t,m,e===`capture`)),n[t]}function _(e){return d[e]===void 0&&(d[e]=new Set,window.addEventListener(e,h)),d[e]}function v(e,t){let n=e.get(t);return n===void 0&&e.set(t,n=new Set),n}function y(e,t,n,r){let i=u[t][n];if(i!==void 0){let t=i.get(e);if(t!==void 0&&t.has(r))return!0}return!1}function b(e,t){let n=d[e];return!!(n!==void 0&&n.has(t))}function x(e,t,n,r){let i;if(i=typeof r==`object`&&r.once===!0?a=>{S(e,t,i,r),n(a)}:n,ge(e,t,i,r))return;let a=v(g(r===!0||typeof r==`object`&&r.capture===!0?`capture`:`bubble`,e),t);if(a.has(i)||a.add(i),t===window){let t=_(e);t.has(i)||t.add(i)}}function S(e,t,n,r){if(_e(e,t,n,r))return;let i=r===!0||typeof r==`object`&&r.capture===!0,a=i?`capture`:`bubble`,o=g(a,e),s=v(o,t);if(t===window&&!y(t,i?`bubble`:`capture`,e,n)&&b(e,n)){let t=d[e];t.delete(n),t.size===0&&(window.removeEventListener(e,h),d[e]=void 0)}s.has(n)&&s.delete(n),s.size===0&&o.delete(t),o.size===0&&(window.removeEventListener(e,m,a===`capture`),u[a][e]=void 0)}return{on:x,off:S}}var{on:B,off:V}=ve();function ye(e,t){return s(e,e=>{e!==void 0&&(t.value=e)}),N(()=>e.value===void 0?t.value:e.value)}var be=(typeof window>`u`?!1:/iPad|iPhone|iPod/.test(navigator.platform)||navigator.platform===`MacIntel`&&navigator.maxTouchPoints>1)&&!window.MSStream;function xe(){return be}var H=typeof document<`u`&&typeof window<`u`;function Se(e){let t={isDeactivated:!1},n=!1;return r(()=>{if(t.isDeactivated=!1,!n){n=!0;return}e()}),y(()=>{t.isDeactivated=!0,n||=!0}),t}function U(e,t){console.error(`[vueuc/${e}]: ${t}`)}var W=[],Ce=function(){return W.some(function(e){return e.activeTargets.length>0})},we=function(){return W.some(function(e){return e.skippedTargets.length>0})},Te=`ResizeObserver loop completed with undelivered notifications.`,Ee=function(){var e;typeof ErrorEvent==`function`?e=new ErrorEvent(`error`,{message:Te}):(e=document.createEvent(`Event`),e.initEvent(`error`,!1,!1),e.message=Te),window.dispatchEvent(e)},De;(function(e){e.BORDER_BOX=`border-box`,e.CONTENT_BOX=`content-box`,e.DEVICE_PIXEL_CONTENT_BOX=`device-pixel-content-box`})(De||={});var G=function(e){return Object.freeze(e)},Oe=function(){function e(e,t){this.inlineSize=e,this.blockSize=t,G(this)}return e}(),ke=function(){function e(e,t,n,r){return this.x=e,this.y=t,this.width=n,this.height=r,this.top=this.y,this.left=this.x,this.bottom=this.top+this.height,this.right=this.left+this.width,G(this)}return e.prototype.toJSON=function(){var e=this;return{x:e.x,y:e.y,top:e.top,right:e.right,bottom:e.bottom,left:e.left,width:e.width,height:e.height}},e.fromRect=function(t){return new e(t.x,t.y,t.width,t.height)},e}(),Ae=function(e){return e instanceof SVGElement&&`getBBox`in e},je=function(e){if(Ae(e)){var t=e.getBBox(),n=t.width,r=t.height;return!n&&!r}var i=e,a=i.offsetWidth,o=i.offsetHeight;return!(a||o||e.getClientRects().length)},K=function(e){if(e instanceof Element)return!0;var t=e?.ownerDocument?.defaultView;return!!(t&&e instanceof t.Element)},Me=function(e){switch(e.tagName){case`INPUT`:if(e.type!==`image`)break;case`VIDEO`:case`AUDIO`:case`EMBED`:case`OBJECT`:case`CANVAS`:case`IFRAME`:case`IMG`:return!0}return!1},q=typeof window<`u`?window:{},Ne=new WeakMap,Pe=/auto|scroll/,Fe=/^tb|vertical/,Ie=/msie|trident/i.test(q.navigator&&q.navigator.userAgent),J=function(e){return parseFloat(e||`0`)},Y=function(e,t,n){return e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=!1),new Oe((n?t:e)||0,(n?e:t)||0)},Le=G({devicePixelContentBoxSize:Y(),borderBoxSize:Y(),contentBoxSize:Y(),contentRect:new ke(0,0,0,0)}),Re=function(e,t){if(t===void 0&&(t=!1),Ne.has(e)&&!t)return Ne.get(e);if(je(e))return Ne.set(e,Le),Le;var n=getComputedStyle(e),r=Ae(e)&&e.ownerSVGElement&&e.getBBox(),i=!Ie&&n.boxSizing===`border-box`,a=Fe.test(n.writingMode||``),o=!r&&Pe.test(n.overflowY||``),s=!r&&Pe.test(n.overflowX||``),c=r?0:J(n.paddingTop),l=r?0:J(n.paddingRight),u=r?0:J(n.paddingBottom),d=r?0:J(n.paddingLeft),f=r?0:J(n.borderTopWidth),p=r?0:J(n.borderRightWidth),m=r?0:J(n.borderBottomWidth),h=r?0:J(n.borderLeftWidth),g=d+l,_=c+u,v=h+p,y=f+m,b=s?e.offsetHeight-y-e.clientHeight:0,x=o?e.offsetWidth-v-e.clientWidth:0,S=i?g+v:0,C=i?_+y:0,w=r?r.width:J(n.width)-S-x,T=r?r.height:J(n.height)-C-b,E=w+g+x+v,D=T+_+b+y,O=G({devicePixelContentBoxSize:Y(Math.round(w*devicePixelRatio),Math.round(T*devicePixelRatio),a),borderBoxSize:Y(E,D,a),contentBoxSize:Y(w,T,a),contentRect:new ke(d,c,w,T)});return Ne.set(e,O),O},ze=function(e,t,n){var r=Re(e,n),i=r.borderBoxSize,a=r.contentBoxSize,o=r.devicePixelContentBoxSize;switch(t){case De.DEVICE_PIXEL_CONTENT_BOX:return o;case De.BORDER_BOX:return i;default:return a}},Be=function(){function e(e){var t=Re(e);this.target=e,this.contentRect=t.contentRect,this.borderBoxSize=G([t.borderBoxSize]),this.contentBoxSize=G([t.contentBoxSize]),this.devicePixelContentBoxSize=G([t.devicePixelContentBoxSize])}return e}(),Ve=function(e){if(je(e))return 1/0;for(var t=0,n=e.parentNode;n;)t+=1,n=n.parentNode;return t},He=function(){var e=1/0,t=[];W.forEach(function(n){if(n.activeTargets.length!==0){var r=[];n.activeTargets.forEach(function(t){var n=new Be(t.target),i=Ve(t.target);r.push(n),t.lastReportedSize=ze(t.target,t.observedBox),i<e&&(e=i)}),t.push(function(){n.callback.call(n.observer,r,n.observer)}),n.activeTargets.splice(0,n.activeTargets.length)}});for(var n=0,r=t;n<r.length;n++){var i=r[n];i()}return e},Ue=function(e){W.forEach(function(t){t.activeTargets.splice(0,t.activeTargets.length),t.skippedTargets.splice(0,t.skippedTargets.length),t.observationTargets.forEach(function(n){n.isActive()&&(Ve(n.target)>e?t.activeTargets.push(n):t.skippedTargets.push(n))})})},We=function(){var e=0;for(Ue(e);Ce();)e=He(),Ue(e);return we()&&Ee(),e>0},Ge,Ke=[],qe=function(){return Ke.splice(0).forEach(function(e){return e()})},Je=function(e){if(!Ge){var t=0,n=document.createTextNode(``);new MutationObserver(function(){return qe()}).observe(n,{characterData:!0}),Ge=function(){n.textContent=`${t?t--:t++}`}}Ke.push(e),Ge()},Ye=function(e){Je(function(){requestAnimationFrame(e)})},Xe=0,Ze=function(){return!!Xe},Qe=250,$e={attributes:!0,characterData:!0,childList:!0,subtree:!0},et=[`resize`,`load`,`transitionend`,`animationend`,`animationstart`,`animationiteration`,`keyup`,`keydown`,`mouseup`,`mousedown`,`mouseover`,`mouseout`,`blur`,`focus`],tt=function(e){return e===void 0&&(e=0),Date.now()+e},nt=!1,rt=new(function(){function e(){var e=this;this.stopped=!0,this.listener=function(){return e.schedule()}}return e.prototype.run=function(e){var t=this;if(e===void 0&&(e=Qe),!nt){nt=!0;var n=tt(e);Ye(function(){var r=!1;try{r=We()}finally{if(nt=!1,e=n-tt(),!Ze())return;r?t.run(1e3):e>0?t.run(e):t.start()}})}},e.prototype.schedule=function(){this.stop(),this.run()},e.prototype.observe=function(){var e=this,t=function(){return e.observer&&e.observer.observe(document.body,$e)};document.body?t():q.addEventListener(`DOMContentLoaded`,t)},e.prototype.start=function(){var e=this;this.stopped&&(this.stopped=!1,this.observer=new MutationObserver(this.listener),this.observe(),et.forEach(function(t){return q.addEventListener(t,e.listener,!0)}))},e.prototype.stop=function(){var e=this;this.stopped||=(this.observer&&this.observer.disconnect(),et.forEach(function(t){return q.removeEventListener(t,e.listener,!0)}),!0)},e}()),it=function(e){!Xe&&e>0&&rt.start(),Xe+=e,!Xe&&rt.stop()},at=function(e){return!Ae(e)&&!Me(e)&&getComputedStyle(e).display===`inline`},ot=function(){function e(e,t){this.target=e,this.observedBox=t||De.CONTENT_BOX,this.lastReportedSize={inlineSize:0,blockSize:0}}return e.prototype.isActive=function(){var e=ze(this.target,this.observedBox,!0);return at(this.target)&&(this.lastReportedSize=e),this.lastReportedSize.inlineSize!==e.inlineSize||this.lastReportedSize.blockSize!==e.blockSize},e}(),st=function(){function e(e,t){this.activeTargets=[],this.skippedTargets=[],this.observationTargets=[],this.observer=e,this.callback=t}return e}(),ct=new WeakMap,lt=function(e,t){for(var n=0;n<e.length;n+=1)if(e[n].target===t)return n;return-1},ut=function(){function e(){}return e.connect=function(e,t){var n=new st(e,t);ct.set(e,n)},e.observe=function(e,t,n){var r=ct.get(e),i=r.observationTargets.length===0;lt(r.observationTargets,t)<0&&(i&&W.push(r),r.observationTargets.push(new ot(t,n&&n.box)),it(1),rt.schedule())},e.unobserve=function(e,t){var n=ct.get(e),r=lt(n.observationTargets,t),i=n.observationTargets.length===1;r>=0&&(i&&W.splice(W.indexOf(n),1),n.observationTargets.splice(r,1),it(-1))},e.disconnect=function(e){var t=this,n=ct.get(e);n.observationTargets.slice().forEach(function(n){return t.unobserve(e,n.target)}),n.activeTargets.splice(0,n.activeTargets.length)},e}(),dt=function(){function e(e){if(arguments.length===0)throw TypeError(`Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.`);if(typeof e!=`function`)throw TypeError(`Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function.`);ut.connect(this,e)}return e.prototype.observe=function(e,t){if(arguments.length===0)throw TypeError(`Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present.`);if(!K(e))throw TypeError(`Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element`);ut.observe(this,e,t)},e.prototype.unobserve=function(e){if(arguments.length===0)throw TypeError(`Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present.`);if(!K(e))throw TypeError(`Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element`);ut.unobserve(this,e)},e.prototype.disconnect=function(){ut.disconnect(this)},e.toString=function(){return`function ResizeObserver () { [polyfill code] }`},e}(),ft=new class{constructor(){this.handleResize=this.handleResize.bind(this),this.observer=new(typeof window<`u`&&window.ResizeObserver||dt)(this.handleResize),this.elHandlersMap=new Map}handleResize(e){for(let t of e){let e=this.elHandlersMap.get(t.target);e!==void 0&&e(t)}}registerHandler(e,t){this.elHandlersMap.set(e,t),this.observer.observe(e)}unregisterHandler(e){this.elHandlersMap.has(e)&&(this.elHandlersMap.delete(e),this.observer.unobserve(e))}},pt=M({name:`ResizeObserver`,props:{onResize:Function},setup(e){let t=!1,n=D().proxy;function r(t){let{onResize:n}=e;n!==void 0&&n(t)}o(()=>{let e=n.$el;if(e===void 0){U(`resize-observer`,`$el does not exist.`);return}if(e.nextElementSibling!==e.nextSibling&&e.nodeType===3&&e.nodeValue!==``){U(`resize-observer`,`$el can not be observed (it may be a text node).`);return}e.nextElementSibling!==null&&(ft.registerHandler(e.nextElementSibling,r),t=!0)}),ae(()=>{t&&ft.unregisterHandler(n.$el.nextElementSibling)})},render(){return p(this.$slots,`default`)}});function mt(e){return e.replace(/#|\(|\)|,|\s|\./g,`_`)}var ht=/^(\d|\.)+$/,gt=/(\d|\.)+/;function _t(e,{c:t=1,offset:n=0,attachPx:r=!0}={}){if(typeof e==`number`){let r=(e+n)*t;return r===0?`0`:`${r}px`}if(typeof e==`string`)if(ht.test(e)){let i=(Number(e)+n)*t;return r?i===0?`0`:`${i}px`:`${i}`}else{let r=gt.exec(e);return r?e.replace(gt,String((Number(r[0])+n)*t)):e}return e}function vt(e){let{left:t,right:n,top:r,bottom:i}=L(e);return`${r} ${t} ${i} ${n}`}function yt(e,...t){if(Array.isArray(e))e.forEach(e=>yt(e,...t));else return e(...t)}function bt(e){return Object.keys(e)}function X(e){return e.some(e=>!k(e)||!(e.type===O||e.type===ne&&!X(e.children)))?e:null}function xt(e,t){return e&&X(e())||t()}function St(e,t,n){return e&&X(e(t))||n(t)}function Z(e,t){return t(e&&X(e())||null)}function Ct(e){return!(e&&X(e()))}var wt=M({render(){var e;return(e=this.$slots).default?.call(e)}}),Tt=f(`n-form-item`);function Et(t,{defaultSize:n=`medium`,mergedSize:r,mergedDisabled:i}={}){let a=le(Tt,null);e(Tt,null);let o=N(r?()=>r(a):()=>{let{size:e}=t;if(e)return e;if(a){let{mergedSize:e}=a;if(e.value!==void 0)return e.value}return n}),s=N(i?()=>i(a):()=>{let{disabled:e}=t;return e===void 0?a?a.disabled.value:!1:e}),c=N(()=>{let{status:e}=t;return e||a?.mergedValidationStatus.value});return ae(()=>{a&&a.restoreValidation()}),{mergedSizeRef:o,mergedDisabledRef:s,mergedStatusRef:c,nTriggerFormBlur(){a&&a.handleContentBlur()},nTriggerFormChange(){a&&a.handleContentChange()},nTriggerFormFocus(){a&&a.handleContentFocus()},nTriggerFormInput(){a&&a.handleContentInput()}}}var{cubicBezierEaseInOut:Dt}=a;function Ot({name:e=`fade-in`,enterDuration:t=`0.2s`,leaveDuration:n=`0.2s`,enterCubicBezier:r=Dt,leaveCubicBezier:i=Dt}={}){return[S(`&.${e}-transition-enter-active`,{transition:`all ${t} ${r}!important`}),S(`&.${e}-transition-leave-active`,{transition:`all ${n} ${i}!important`}),S(`&.${e}-transition-enter-from, &.${e}-transition-leave-to`,{opacity:0}),S(`&.${e}-transition-leave-from, &.${e}-transition-enter-to`,{opacity:1})]}var kt=c(`scrollbar`,`
 overflow: hidden;
 position: relative;
 z-index: auto;
 height: 100%;
 width: 100%;
`,[S(`>`,[c(`scrollbar-container`,`
 width: 100%;
 overflow: scroll;
 height: 100%;
 min-height: inherit;
 max-height: inherit;
 scrollbar-width: none;
 `,[S(`&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb`,`
 width: 0;
 height: 0;
 display: none;
 `),S(`>`,[c(`scrollbar-content`,`
 box-sizing: border-box;
 min-width: 100%;
 `)])])]),S(`>, +`,[c(`scrollbar-rail`,`
 position: absolute;
 pointer-events: none;
 user-select: none;
 background: var(--n-scrollbar-rail-color);
 -webkit-user-select: none;
 `,[P(`horizontal`,`
 height: var(--n-scrollbar-height);
 `,[S(`>`,[d(`scrollbar`,`
 height: var(--n-scrollbar-height);
 border-radius: var(--n-scrollbar-border-radius);
 right: 0;
 `)])]),P(`horizontal--top`,`
 top: var(--n-scrollbar-rail-top-horizontal-top); 
 right: var(--n-scrollbar-rail-right-horizontal-top); 
 bottom: var(--n-scrollbar-rail-bottom-horizontal-top); 
 left: var(--n-scrollbar-rail-left-horizontal-top); 
 `),P(`horizontal--bottom`,`
 top: var(--n-scrollbar-rail-top-horizontal-bottom); 
 right: var(--n-scrollbar-rail-right-horizontal-bottom); 
 bottom: var(--n-scrollbar-rail-bottom-horizontal-bottom); 
 left: var(--n-scrollbar-rail-left-horizontal-bottom); 
 `),P(`vertical`,`
 width: var(--n-scrollbar-width);
 `,[S(`>`,[d(`scrollbar`,`
 width: var(--n-scrollbar-width);
 border-radius: var(--n-scrollbar-border-radius);
 bottom: 0;
 `)])]),P(`vertical--left`,`
 top: var(--n-scrollbar-rail-top-vertical-left); 
 right: var(--n-scrollbar-rail-right-vertical-left); 
 bottom: var(--n-scrollbar-rail-bottom-vertical-left); 
 left: var(--n-scrollbar-rail-left-vertical-left); 
 `),P(`vertical--right`,`
 top: var(--n-scrollbar-rail-top-vertical-right); 
 right: var(--n-scrollbar-rail-right-vertical-right); 
 bottom: var(--n-scrollbar-rail-bottom-vertical-right); 
 left: var(--n-scrollbar-rail-left-vertical-right); 
 `),P(`disabled`,[S(`>`,[d(`scrollbar`,`pointer-events: none;`)])]),S(`>`,[d(`scrollbar`,`
 z-index: 1;
 position: absolute;
 cursor: pointer;
 pointer-events: all;
 background-color: var(--n-scrollbar-color);
 transition: background-color .2s var(--n-scrollbar-bezier);
 `,[Ot(),S(`&:hover`,`background-color: var(--n-scrollbar-color-hover);`)])])])])]),At=Object.assign(Object.assign({},I.props),{duration:{type:Number,default:0},scrollable:{type:Boolean,default:!0},xScrollable:Boolean,trigger:{type:String,default:`hover`},useUnifiedContainer:Boolean,triggerDisplayManually:Boolean,container:Function,content:Function,containerClass:String,containerStyle:[String,Object],contentClass:[String,Array],contentStyle:[String,Object],horizontalRailStyle:[String,Object],verticalRailStyle:[String,Object],onScroll:Function,onWheel:Function,onResize:Function,internalOnUpdateScrollLeft:Function,internalHoistYRail:Boolean,internalExposeWidthCssVar:Boolean,yPlacement:{type:String,default:`right`},xPlacement:{type:String,default:`bottom`}}),jt=M({name:`Scrollbar`,props:At,inheritAttrs:!1,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:r,mergedRtlRef:a}=h(e),s=i(`Scrollbar`,a,t),c=n(null),u=n(null),d=n(null),f=n(null),p=n(null),g=n(null),_=n(null),v=n(null),y=n(null),b=n(null),x=n(null),S=n(0),C=n(0),w=n(!1),T=n(!1),E=!1,D=!1,O,k,A=0,j=0,M=0,te=0,ne=xe(),P=I(`Scrollbar`,`-scrollbar`,kt,ee,e,t),re=N(()=>{let{value:e}=v,{value:t}=g,{value:n}=b;return e===null||t===null||n===null?0:Math.min(e,n*e/t+fe(P.value.self.width)*1.5)}),ie=N(()=>`${re.value}px`),F=N(()=>{let{value:e}=y,{value:t}=_,{value:n}=x;return e===null||t===null||n===null?0:n*e/t+fe(P.value.self.height)*1.5}),oe=N(()=>`${F.value}px`),se=N(()=>{let{value:e}=v,{value:t}=S,{value:n}=g,{value:r}=b;if(e===null||n===null||r===null)return 0;{let i=n-e;return i?t/i*(r-re.value):0}}),ce=N(()=>`${se.value}px`),le=N(()=>{let{value:e}=y,{value:t}=C,{value:n}=_,{value:r}=x;if(e===null||n===null||r===null)return 0;{let i=n-e;return i?t/i*(r-F.value):0}}),ue=N(()=>`${le.value}px`),pe=N(()=>{let{value:e}=v,{value:t}=g;return e!==null&&t!==null&&t>e}),R=N(()=>{let{value:e}=y,{value:t}=_;return e!==null&&t!==null&&t>e}),me=N(()=>{let{trigger:t}=e;return t===`none`||w.value}),he=N(()=>{let{trigger:t}=e;return t===`none`||T.value}),z=N(()=>{let{container:t}=e;return t?t():u.value}),ge=N(()=>{let{content:t}=e;return t?t():d.value}),_e=(t,n)=>{if(!e.scrollable)return;if(typeof t==`number`){U(t,n??0,0,!1,`auto`);return}let{left:r,top:i,index:a,elSize:o,position:s,behavior:c,el:l,debounce:u=!0}=t;(r!==void 0||i!==void 0)&&U(r??0,i??0,0,!1,c),l===void 0?a!==void 0&&o!==void 0?U(0,a*o,o,u,c):s===`bottom`?U(0,2**53-1,0,!1,c):s===`top`&&U(0,0,0,!1,c):U(0,l.offsetTop,l.offsetHeight,u,c)},ve=Se(()=>{e.container||_e({top:S.value,left:C.value})}),ye=()=>{ve.isDeactivated||K()},be=t=>{if(ve.isDeactivated)return;let{onResize:n}=e;n&&n(t),K()},H=(t,n)=>{if(!e.scrollable)return;let{value:r}=z;r&&(typeof t==`object`?r.scrollBy(t):r.scrollBy(t,n||0))};function U(e,t,n,r,i){let{value:a}=z;if(a){if(r){let{scrollTop:r,offsetHeight:o}=a;if(t>r){t+n<=r+o||a.scrollTo({left:e,top:t+n-o,behavior:i});return}}a.scrollTo({left:e,top:t,behavior:i})}}function W(){De(),G(),K()}function Ce(){we()}function we(){Te(),Ee()}function Te(){k!==void 0&&window.clearTimeout(k),k=window.setTimeout(()=>{T.value=!1},e.duration)}function Ee(){O!==void 0&&window.clearTimeout(O),O=window.setTimeout(()=>{w.value=!1},e.duration)}function De(){O!==void 0&&window.clearTimeout(O),w.value=!0}function G(){k!==void 0&&window.clearTimeout(k),T.value=!0}function Oe(t){let{onScroll:n}=e;n&&n(t),ke()}function ke(){let{value:e}=z;e&&(S.value=e.scrollTop,C.value=e.scrollLeft*(s?.value?-1:1))}function Ae(){let{value:e}=ge;e&&(g.value=e.offsetHeight,_.value=e.offsetWidth);let{value:t}=z;t&&(v.value=t.offsetHeight,y.value=t.offsetWidth);let{value:n}=p,{value:r}=f;n&&(x.value=n.offsetWidth),r&&(b.value=r.offsetHeight)}function je(){let{value:e}=z;e&&(S.value=e.scrollTop,C.value=e.scrollLeft*(s?.value?-1:1),v.value=e.offsetHeight,y.value=e.offsetWidth,g.value=e.scrollHeight,_.value=e.scrollWidth);let{value:t}=p,{value:n}=f;t&&(x.value=t.offsetWidth),n&&(b.value=n.offsetHeight)}function K(){e.scrollable&&(e.useUnifiedContainer?je():(Ae(),ke()))}function Me(e){return!c.value?.contains(de(e))}function q(e){e.preventDefault(),e.stopPropagation(),D=!0,B(`mousemove`,window,Ne,!0),B(`mouseup`,window,Pe,!0),j=C.value,M=s?.value?window.innerWidth-e.clientX:e.clientX}function Ne(t){if(!D)return;O!==void 0&&window.clearTimeout(O),k!==void 0&&window.clearTimeout(k);let{value:n}=y,{value:r}=_,{value:i}=F;if(n===null||r===null)return;let a=(s?.value?window.innerWidth-t.clientX-M:t.clientX-M)*(r-n)/(n-i),o=r-n,c=j+a;c=Math.min(o,c),c=Math.max(c,0);let{value:l}=z;if(l){l.scrollLeft=c*(s?.value?-1:1);let{internalOnUpdateScrollLeft:t}=e;t&&t(c)}}function Pe(e){e.preventDefault(),e.stopPropagation(),V(`mousemove`,window,Ne,!0),V(`mouseup`,window,Pe,!0),D=!1,K(),Me(e)&&we()}function Fe(e){e.preventDefault(),e.stopPropagation(),E=!0,B(`mousemove`,window,Ie,!0),B(`mouseup`,window,J,!0),A=S.value,te=e.clientY}function Ie(e){if(!E)return;O!==void 0&&window.clearTimeout(O),k!==void 0&&window.clearTimeout(k);let{value:t}=v,{value:n}=g,{value:r}=re;if(t===null||n===null)return;let i=(e.clientY-te)*(n-t)/(t-r),a=n-t,o=A+i;o=Math.min(a,o),o=Math.max(o,0);let{value:s}=z;s&&(s.scrollTop=o)}function J(e){e.preventDefault(),e.stopPropagation(),V(`mousemove`,window,Ie,!0),V(`mouseup`,window,J,!0),E=!1,K(),Me(e)&&we()}l(()=>{let{value:e}=R,{value:n}=pe,{value:r}=t,{value:i}=p,{value:a}=f;i&&(e?i.classList.remove(`${r}-scrollbar-rail--disabled`):i.classList.add(`${r}-scrollbar-rail--disabled`)),a&&(n?a.classList.remove(`${r}-scrollbar-rail--disabled`):a.classList.add(`${r}-scrollbar-rail--disabled`))}),o(()=>{e.container||K()}),ae(()=>{O!==void 0&&window.clearTimeout(O),k!==void 0&&window.clearTimeout(k),V(`mousemove`,window,Ie,!0),V(`mouseup`,window,J,!0)});let Y=N(()=>{let{common:{cubicBezierEaseInOut:e},self:{color:t,colorHover:n,height:r,width:i,borderRadius:a,railInsetHorizontalTop:o,railInsetHorizontalBottom:c,railInsetVerticalRight:l,railInsetVerticalLeft:u,railColor:d}}=P.value,{top:f,right:p,bottom:m,left:h}=L(o),{top:g,right:_,bottom:v,left:y}=L(c),{top:b,right:x,bottom:S,left:C}=L(s?.value?vt(l):l),{top:w,right:T,bottom:E,left:D}=L(s?.value?vt(u):u);return{"--n-scrollbar-bezier":e,"--n-scrollbar-color":t,"--n-scrollbar-color-hover":n,"--n-scrollbar-border-radius":a,"--n-scrollbar-width":i,"--n-scrollbar-height":r,"--n-scrollbar-rail-top-horizontal-top":f,"--n-scrollbar-rail-right-horizontal-top":p,"--n-scrollbar-rail-bottom-horizontal-top":m,"--n-scrollbar-rail-left-horizontal-top":h,"--n-scrollbar-rail-top-horizontal-bottom":g,"--n-scrollbar-rail-right-horizontal-bottom":_,"--n-scrollbar-rail-bottom-horizontal-bottom":v,"--n-scrollbar-rail-left-horizontal-bottom":y,"--n-scrollbar-rail-top-vertical-right":b,"--n-scrollbar-rail-right-vertical-right":x,"--n-scrollbar-rail-bottom-vertical-right":S,"--n-scrollbar-rail-left-vertical-right":C,"--n-scrollbar-rail-top-vertical-left":w,"--n-scrollbar-rail-right-vertical-left":T,"--n-scrollbar-rail-bottom-vertical-left":E,"--n-scrollbar-rail-left-vertical-left":D,"--n-scrollbar-rail-color":d}}),Le=r?m(`scrollbar`,void 0,Y,e):void 0;return Object.assign(Object.assign({},{scrollTo:_e,scrollBy:H,sync:K,syncUnifiedContainer:je,handleMouseEnterWrapper:W,handleMouseLeaveWrapper:Ce}),{mergedClsPrefix:t,rtlEnabled:s,containerScrollTop:S,wrapperRef:c,containerRef:u,contentRef:d,yRailRef:f,xRailRef:p,needYBar:pe,needXBar:R,yBarSizePx:ie,xBarSizePx:oe,yBarTopPx:ce,xBarLeftPx:ue,isShowXBar:me,isShowYBar:he,isIos:ne,handleScroll:Oe,handleContentResize:ye,handleContainerResize:be,handleYScrollMouseDown:Fe,handleXScrollMouseDown:q,containerWidth:y,cssVars:r?void 0:Y,themeClass:Le?.themeClass,onRender:Le?.onRender})},render(){let{$slots:e,mergedClsPrefix:t,triggerDisplayManually:n,rtlEnabled:r,internalHoistYRail:i,yPlacement:a,xPlacement:o,xScrollable:s}=this;if(!this.scrollable)return e.default?.call(e);let c=this.trigger===`none`,l=(e,n)=>F(`div`,{ref:`yRailRef`,class:[`${t}-scrollbar-rail`,`${t}-scrollbar-rail--vertical`,`${t}-scrollbar-rail--vertical--${a}`,e],"data-scrollbar-rail":!0,style:[n||``,this.verticalRailStyle],"aria-hidden":!0},F(c?wt:j,c?null:{name:`fade-in-transition`},{default:()=>this.needYBar&&this.isShowYBar&&!this.isIos?F(`div`,{class:`${t}-scrollbar-rail__scrollbar`,style:{height:this.yBarSizePx,top:this.yBarTopPx},onMousedown:this.handleYScrollMouseDown}):null})),u=()=>{var a;return(a=this.onRender)==null||a.call(this),F(`div`,se(this.$attrs,{role:`none`,ref:`wrapperRef`,class:[`${t}-scrollbar`,this.themeClass,r&&`${t}-scrollbar--rtl`],style:this.cssVars,onMouseenter:n?void 0:this.handleMouseEnterWrapper,onMouseleave:n?void 0:this.handleMouseLeaveWrapper}),[this.container?e.default?.call(e):F(`div`,{role:`none`,ref:`containerRef`,class:[`${t}-scrollbar-container`,this.containerClass],style:[this.containerStyle,this.internalExposeWidthCssVar?{"--n-scrollbar-current-width":pe(this.containerWidth)}:void 0],onScroll:this.handleScroll,onWheel:this.onWheel},F(pt,{onResize:this.handleContentResize},{default:()=>F(`div`,{ref:`contentRef`,role:`none`,style:[{width:this.xScrollable?`fit-content`:null},this.contentStyle],class:[`${t}-scrollbar-content`,this.contentClass]},e)})),i?null:l(void 0,void 0),s&&F(`div`,{ref:`xRailRef`,class:[`${t}-scrollbar-rail`,`${t}-scrollbar-rail--horizontal`,`${t}-scrollbar-rail--horizontal--${o}`],style:this.horizontalRailStyle,"data-scrollbar-rail":!0,"aria-hidden":!0},F(c?wt:j,c?null:{name:`fade-in-transition`},{default:()=>this.needXBar&&this.isShowXBar&&!this.isIos?F(`div`,{class:`${t}-scrollbar-rail__scrollbar`,style:{width:this.xBarSizePx,right:r?this.xBarLeftPx:void 0,left:r?void 0:this.xBarLeftPx},onMousedown:this.handleXScrollMouseDown}):null}))])},d=this.container?u():F(pt,{onResize:this.handleContainerResize},{default:u});return i?F(ne,null,d,l(this.themeClass,this.cssVars)):d}}),{cubicBezierEaseInOut:Q}=a;function Mt({duration:e=`.2s`,delay:t=`.1s`}={}){return[S(`&.fade-in-width-expand-transition-leave-from, &.fade-in-width-expand-transition-enter-to`,{opacity:1}),S(`&.fade-in-width-expand-transition-leave-to, &.fade-in-width-expand-transition-enter-from`,`
 opacity: 0!important;
 margin-left: 0!important;
 margin-right: 0!important;
 `),S(`&.fade-in-width-expand-transition-leave-active`,`
 overflow: hidden;
 transition:
 opacity ${e} ${Q},
 max-width ${e} ${Q} ${t},
 margin-left ${e} ${Q} ${t},
 margin-right ${e} ${Q} ${t};
 `),S(`&.fade-in-width-expand-transition-enter-active`,`
 overflow: hidden;
 transition:
 opacity ${e} ${Q} ${t},
 max-width ${e} ${Q},
 margin-left ${e} ${Q},
 margin-right ${e} ${Q};
 `)]}var Nt=c(`base-wave`,`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
`),Pt=M({name:`BaseWave`,props:{clsPrefix:{type:String,required:!0}},setup(e){v(`-base-wave`,Nt,x(e,`clsPrefix`));let t=n(null),r=n(!1),i=null;return ae(()=>{i!==null&&window.clearTimeout(i)}),{active:r,selfRef:t,play(){i!==null&&(window.clearTimeout(i),r.value=!1,i=null),_(()=>{var e;(e=t.value)==null||e.offsetHeight,r.value=!0,i=window.setTimeout(()=>{r.value=!1,i=null},1e3)})}}},render(){let{clsPrefix:e}=this;return F(`div`,{ref:`selfRef`,"aria-hidden":!0,class:[`${e}-base-wave`,this.active&&`${e}-base-wave--active`]})}}),Ft=H&&`chrome`in window;H&&navigator.userAgent.includes(`Firefox`);var It=H&&navigator.userAgent.includes(`Safari`)&&!Ft;function $(e){return t(e,[255,255,255,.16])}function Lt(e){return t(e,[0,0,0,.12])}var Rt=f(`n-button-group`),zt=S([c(`button`,`
 margin: 0;
 font-weight: var(--n-font-weight);
 line-height: 1;
 font-family: inherit;
 padding: var(--n-padding);
 height: var(--n-height);
 font-size: var(--n-font-size);
 border-radius: var(--n-border-radius);
 color: var(--n-text-color);
 background-color: var(--n-color);
 width: var(--n-width);
 white-space: nowrap;
 outline: none;
 position: relative;
 z-index: auto;
 border: none;
 display: inline-flex;
 flex-wrap: nowrap;
 flex-shrink: 0;
 align-items: center;
 justify-content: center;
 user-select: none;
 -webkit-user-select: none;
 text-align: center;
 cursor: pointer;
 text-decoration: none;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[P(`color`,[d(`border`,{borderColor:`var(--n-border-color)`}),P(`disabled`,[d(`border`,{borderColor:`var(--n-border-color-disabled)`})]),u(`disabled`,[S(`&:focus`,[d(`state-border`,{borderColor:`var(--n-border-color-focus)`})]),S(`&:hover`,[d(`state-border`,{borderColor:`var(--n-border-color-hover)`})]),S(`&:active`,[d(`state-border`,{borderColor:`var(--n-border-color-pressed)`})]),P(`pressed`,[d(`state-border`,{borderColor:`var(--n-border-color-pressed)`})])])]),P(`disabled`,{backgroundColor:`var(--n-color-disabled)`,color:`var(--n-text-color-disabled)`},[d(`border`,{border:`var(--n-border-disabled)`})]),u(`disabled`,[S(`&:focus`,{backgroundColor:`var(--n-color-focus)`,color:`var(--n-text-color-focus)`},[d(`state-border`,{border:`var(--n-border-focus)`})]),S(`&:hover`,{backgroundColor:`var(--n-color-hover)`,color:`var(--n-text-color-hover)`},[d(`state-border`,{border:`var(--n-border-hover)`})]),S(`&:active`,{backgroundColor:`var(--n-color-pressed)`,color:`var(--n-text-color-pressed)`},[d(`state-border`,{border:`var(--n-border-pressed)`})]),P(`pressed`,{backgroundColor:`var(--n-color-pressed)`,color:`var(--n-text-color-pressed)`},[d(`state-border`,{border:`var(--n-border-pressed)`})])]),P(`loading`,`cursor: wait;`),c(`base-wave`,`
 pointer-events: none;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 animation-iteration-count: 1;
 animation-duration: var(--n-ripple-duration);
 animation-timing-function: var(--n-bezier-ease-out), var(--n-bezier-ease-out);
 `,[P(`active`,{zIndex:1,animationName:`button-wave-spread, button-wave-opacity`})]),H&&`MozBoxSizing`in document.createElement(`div`).style?S(`&::moz-focus-inner`,{border:0}):null,d(`border, state-border`,`
 position: absolute;
 left: 0;
 top: 0;
 right: 0;
 bottom: 0;
 border-radius: inherit;
 transition: border-color .3s var(--n-bezier);
 pointer-events: none;
 `),d(`border`,`
 border: var(--n-border);
 `),d(`state-border`,`
 border: var(--n-border);
 border-color: #0000;
 z-index: 1;
 `),d(`icon`,`
 margin: var(--n-icon-margin);
 margin-left: 0;
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 max-width: var(--n-icon-size);
 font-size: var(--n-icon-size);
 position: relative;
 flex-shrink: 0;
 `,[c(`icon-slot`,`
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 position: absolute;
 left: 0;
 top: 50%;
 transform: translateY(-50%);
 display: flex;
 align-items: center;
 justify-content: center;
 `,[ce({top:`50%`,originalTransform:`translateY(-50%)`})]),Mt()]),d(`content`,`
 display: flex;
 align-items: center;
 flex-wrap: nowrap;
 min-width: 0;
 `,[S(`~`,[d(`icon`,{margin:`var(--n-icon-margin)`,marginRight:0})])]),P(`block`,`
 display: flex;
 width: 100%;
 `),P(`dashed`,[d(`border, state-border`,{borderStyle:`dashed !important`})]),P(`disabled`,{cursor:`not-allowed`,opacity:`var(--n-opacity-disabled)`})]),S(`@keyframes button-wave-spread`,{from:{boxShadow:`0 0 0.5px 0 var(--n-ripple-color)`},to:{boxShadow:`0 0 0.5px 4.5px var(--n-ripple-color)`}}),S(`@keyframes button-wave-opacity`,{from:{opacity:`var(--n-wave-opacity)`},to:{opacity:0}})]),Bt=Object.assign(Object.assign({},I.props),{color:String,textColor:String,text:Boolean,block:Boolean,loading:Boolean,disabled:Boolean,circle:Boolean,size:String,ghost:Boolean,round:Boolean,secondary:Boolean,tertiary:Boolean,quaternary:Boolean,strong:Boolean,focusable:{type:Boolean,default:!0},keyboard:{type:Boolean,default:!0},tag:{type:String,default:`button`},type:{type:String,default:`default`},dashed:Boolean,renderIcon:Function,iconPlacement:{type:String,default:`left`},attrType:{type:String,default:`button`},bordered:{type:Boolean,default:!0},onClick:[Function,Array],nativeFocusBehavior:{type:Boolean,default:!It},spinProps:Object}),Vt=M({name:`Button`,props:Bt,slots:Object,setup(e){let t=n(null),r=n(null),a=n(!1),o=g(()=>!e.quaternary&&!e.tertiary&&!e.secondary&&!e.text&&(!e.color||e.ghost||e.dashed)&&e.bordered),s=le(Rt,{}),{inlineThemeDisabled:c,mergedClsPrefixRef:l,mergedRtlRef:u,mergedComponentPropsRef:d}=h(e),{mergedSizeRef:f}=Et({},{defaultSize:`medium`,mergedSize:t=>{let{size:n}=e;if(n)return n;let{size:r}=s;if(r)return r;let{mergedSize:i}=t||{};return i?i.value:d?.value?.Button?.size||`medium`}}),p=N(()=>e.focusable&&!e.disabled),_=n=>{var r;p.value||n.preventDefault(),!e.nativeFocusBehavior&&(n.preventDefault(),!e.disabled&&p.value&&((r=t.value)==null||r.focus({preventScroll:!0})))},v=t=>{var n;if(!e.disabled&&!e.loading){let{onClick:i}=e;i&&yt(i,t),e.text||(n=r.value)==null||n.play()}},y=t=>{if(t.key===`Enter`){if(!e.keyboard)return;a.value=!1}},b=t=>{if(t.key===`Enter`){if(!e.keyboard||e.loading){t.preventDefault();return}a.value=!0}},x=()=>{a.value=!1},S=I(`Button`,`-button`,zt,re,e,l),C=i(`Button`,u,l),T=N(()=>{let{common:{cubicBezierEaseInOut:t,cubicBezierEaseOut:n},self:r}=S.value,{rippleDuration:i,opacityDisabled:a,fontWeight:o,fontWeightStrong:s}=r,c=f.value,{dashed:l,type:u,ghost:d,text:p,color:m,round:h,circle:g,textColor:_,secondary:v,tertiary:y,quaternary:b,strong:x}=e,C={"--n-font-weight":x?s:o},T={"--n-color":`initial`,"--n-color-hover":`initial`,"--n-color-pressed":`initial`,"--n-color-focus":`initial`,"--n-color-disabled":`initial`,"--n-ripple-color":`initial`,"--n-text-color":`initial`,"--n-text-color-hover":`initial`,"--n-text-color-pressed":`initial`,"--n-text-color-focus":`initial`,"--n-text-color-disabled":`initial`},E=u===`tertiary`,D=u==="default",O=E?`default`:u;if(p){let e=_||m;T={"--n-color":`#0000`,"--n-color-hover":`#0000`,"--n-color-pressed":`#0000`,"--n-color-focus":`#0000`,"--n-color-disabled":`#0000`,"--n-ripple-color":`#0000`,"--n-text-color":e||r[w(`textColorText`,O)],"--n-text-color-hover":e?$(e):r[w(`textColorTextHover`,O)],"--n-text-color-pressed":e?Lt(e):r[w(`textColorTextPressed`,O)],"--n-text-color-focus":e?$(e):r[w(`textColorTextHover`,O)],"--n-text-color-disabled":e||r[w(`textColorTextDisabled`,O)]}}else if(d||l){let e=_||m;T={"--n-color":`#0000`,"--n-color-hover":`#0000`,"--n-color-pressed":`#0000`,"--n-color-focus":`#0000`,"--n-color-disabled":`#0000`,"--n-ripple-color":m||r[w(`rippleColor`,O)],"--n-text-color":e||r[w(`textColorGhost`,O)],"--n-text-color-hover":e?$(e):r[w(`textColorGhostHover`,O)],"--n-text-color-pressed":e?Lt(e):r[w(`textColorGhostPressed`,O)],"--n-text-color-focus":e?$(e):r[w(`textColorGhostHover`,O)],"--n-text-color-disabled":e||r[w(`textColorGhostDisabled`,O)]}}else if(v){let e=D?r.textColor:E?r.textColorTertiary:r[w(`color`,O)],t=m||e,n=u!=="default"&&u!==`tertiary`;T={"--n-color":n?ue(t,{alpha:Number(r.colorOpacitySecondary)}):r.colorSecondary,"--n-color-hover":n?ue(t,{alpha:Number(r.colorOpacitySecondaryHover)}):r.colorSecondaryHover,"--n-color-pressed":n?ue(t,{alpha:Number(r.colorOpacitySecondaryPressed)}):r.colorSecondaryPressed,"--n-color-focus":n?ue(t,{alpha:Number(r.colorOpacitySecondaryHover)}):r.colorSecondaryHover,"--n-color-disabled":r.colorSecondary,"--n-ripple-color":`#0000`,"--n-text-color":t,"--n-text-color-hover":t,"--n-text-color-pressed":t,"--n-text-color-focus":t,"--n-text-color-disabled":t}}else if(y||b){let e=D?r.textColor:E?r.textColorTertiary:r[w(`color`,O)],t=m||e;y?(T[`--n-color`]=r.colorTertiary,T[`--n-color-hover`]=r.colorTertiaryHover,T[`--n-color-pressed`]=r.colorTertiaryPressed,T[`--n-color-focus`]=r.colorSecondaryHover,T[`--n-color-disabled`]=r.colorTertiary):(T[`--n-color`]=r.colorQuaternary,T[`--n-color-hover`]=r.colorQuaternaryHover,T[`--n-color-pressed`]=r.colorQuaternaryPressed,T[`--n-color-focus`]=r.colorQuaternaryHover,T[`--n-color-disabled`]=r.colorQuaternary),T[`--n-ripple-color`]=`#0000`,T[`--n-text-color`]=t,T[`--n-text-color-hover`]=t,T[`--n-text-color-pressed`]=t,T[`--n-text-color-focus`]=t,T[`--n-text-color-disabled`]=t}else T={"--n-color":m||r[w(`color`,O)],"--n-color-hover":m?$(m):r[w(`colorHover`,O)],"--n-color-pressed":m?Lt(m):r[w(`colorPressed`,O)],"--n-color-focus":m?$(m):r[w(`colorFocus`,O)],"--n-color-disabled":m||r[w(`colorDisabled`,O)],"--n-ripple-color":m||r[w(`rippleColor`,O)],"--n-text-color":_||(m?r.textColorPrimary:E?r.textColorTertiary:r[w(`textColor`,O)]),"--n-text-color-hover":_||(m?r.textColorHoverPrimary:r[w(`textColorHover`,O)]),"--n-text-color-pressed":_||(m?r.textColorPressedPrimary:r[w(`textColorPressed`,O)]),"--n-text-color-focus":_||(m?r.textColorFocusPrimary:r[w(`textColorFocus`,O)]),"--n-text-color-disabled":_||(m?r.textColorDisabledPrimary:r[w(`textColorDisabled`,O)])};let k={"--n-border":`initial`,"--n-border-hover":`initial`,"--n-border-pressed":`initial`,"--n-border-focus":`initial`,"--n-border-disabled":`initial`};k=p?{"--n-border":`none`,"--n-border-hover":`none`,"--n-border-pressed":`none`,"--n-border-focus":`none`,"--n-border-disabled":`none`}:{"--n-border":r[w(`border`,O)],"--n-border-hover":r[w(`borderHover`,O)],"--n-border-pressed":r[w(`borderPressed`,O)],"--n-border-focus":r[w(`borderFocus`,O)],"--n-border-disabled":r[w(`borderDisabled`,O)]};let{[w(`height`,c)]:A,[w(`fontSize`,c)]:j,[w(`padding`,c)]:ee,[w(`paddingRound`,c)]:M,[w(`iconSize`,c)]:te,[w(`borderRadius`,c)]:N,[w(`iconMargin`,c)]:ne,waveOpacity:P}=r,re={"--n-width":g&&!p?A:`initial`,"--n-height":p?`initial`:A,"--n-font-size":j,"--n-padding":g||p?`initial`:h?M:ee,"--n-icon-size":te,"--n-icon-margin":ne,"--n-border-radius":p?`initial`:g||h?A:N};return Object.assign(Object.assign(Object.assign(Object.assign({"--n-bezier":t,"--n-bezier-ease-out":n,"--n-ripple-duration":i,"--n-opacity-disabled":a,"--n-wave-opacity":P},C),T),k),re)}),E=c?m(`button`,N(()=>{let t=``,{dashed:n,type:r,ghost:i,text:a,color:o,round:s,circle:c,textColor:l,secondary:u,tertiary:d,quaternary:p,strong:m}=e;n&&(t+=`a`),i&&(t+=`b`),a&&(t+=`c`),s&&(t+=`d`),c&&(t+=`e`),u&&(t+=`f`),d&&(t+=`g`),p&&(t+=`h`),m&&(t+=`i`),o&&(t+=`j${mt(o)}`),l&&(t+=`k${mt(l)}`);let{value:h}=f;return t+=`l${h[0]}`,t+=`m${r[0]}`,t}),T,e):void 0;return{selfElRef:t,waveElRef:r,mergedClsPrefix:l,mergedFocusable:p,mergedSize:f,showBorder:o,enterPressed:a,rtlEnabled:C,handleMousedown:_,handleKeydown:b,handleBlur:x,handleKeyup:y,handleClick:v,customColorCssVars:N(()=>{let{color:t}=e;if(!t)return null;let n=$(t);return{"--n-border-color":t,"--n-border-color-hover":n,"--n-border-color-pressed":Lt(t),"--n-border-color-focus":n,"--n-border-color-disabled":t}}),cssVars:c?void 0:T,themeClass:E?.themeClass,onRender:E?.onRender}},render(){let{mergedClsPrefix:e,tag:t,onRender:n}=this;n?.();let r=Z(this.$slots.default,t=>t&&F(`span`,{class:`${e}-button__content`},t));return F(t,{ref:`selfElRef`,class:[this.themeClass,`${e}-button`,`${e}-button--${this.type}-type`,`${e}-button--${this.mergedSize}-type`,this.rtlEnabled&&`${e}-button--rtl`,this.disabled&&`${e}-button--disabled`,this.block&&`${e}-button--block`,this.enterPressed&&`${e}-button--pressed`,!this.text&&this.dashed&&`${e}-button--dashed`,this.color&&`${e}-button--color`,this.secondary&&`${e}-button--secondary`,this.loading&&`${e}-button--loading`,this.ghost&&`${e}-button--ghost`],tabindex:this.mergedFocusable?0:-1,type:this.attrType,style:this.cssVars,disabled:this.disabled,onClick:this.handleClick,onBlur:this.handleBlur,onMousedown:this.handleMousedown,onKeyup:this.handleKeyup,onKeydown:this.handleKeydown},this.iconPlacement===`right`&&r,F(E,{width:!0},{default:()=>Z(this.$slots.icon,t=>(this.loading||this.renderIcon||t)&&F(`span`,{class:`${e}-button__icon`,style:{margin:Ct(this.$slots.default)?`0`:``}},F(oe,null,{default:()=>this.loading?F(te,Object.assign({clsPrefix:e,key:`loading`,class:`${e}-icon-slot`,strokeWidth:20},this.spinProps)):F(`div`,{key:`icon`,class:`${e}-icon-slot`,role:`none`},this.renderIcon?this.renderIcon():t)})))}),this.iconPlacement===`left`&&r,this.text?null:F(Pt,{ref:`waveElRef`,clsPrefix:e}),this.showBorder?F(`div`,{"aria-hidden":!0,class:`${e}-button__border`,style:this.customColorCssVars}):null,this.showBorder?F(`div`,{"aria-hidden":!0,class:`${e}-button__state-border`,style:this.customColorCssVars}):null)}}),Ht=c(`card-content`,`
 flex: 1;
 min-width: 0;
 box-sizing: border-box;
 padding: 0 var(--n-padding-left) var(--n-padding-bottom) var(--n-padding-left);
 font-size: var(--n-font-size);
`),Ut=S([c(`card`,`
 font-size: var(--n-font-size);
 line-height: var(--n-line-height);
 display: flex;
 flex-direction: column;
 width: 100%;
 box-sizing: border-box;
 position: relative;
 border-radius: var(--n-border-radius);
 background-color: var(--n-color);
 color: var(--n-text-color);
 word-break: break-word;
 transition: 
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[b({background:`var(--n-color-modal)`}),P(`hoverable`,[S(`&:hover`,`box-shadow: var(--n-box-shadow);`)]),P(`content-segmented`,[S(`>`,[c(`card-content`,`
 padding-top: var(--n-padding-bottom);
 `),d(`content-scrollbar`,[S(`>`,[c(`scrollbar-container`,[S(`>`,[c(`card-content`,`
 padding-top: var(--n-padding-bottom);
 `)])])])])])]),P(`content-soft-segmented`,[S(`>`,[c(`card-content`,`
 margin: 0 var(--n-padding-left);
 padding: var(--n-padding-bottom) 0;
 `),d(`content-scrollbar`,[S(`>`,[c(`scrollbar-container`,[S(`>`,[c(`card-content`,`
 margin: 0 var(--n-padding-left);
 padding: var(--n-padding-bottom) 0;
 `)])])])])])]),P(`footer-segmented`,[S(`>`,[d(`footer`,`
 padding-top: var(--n-padding-bottom);
 `)])]),P(`footer-soft-segmented`,[S(`>`,[d(`footer`,`
 padding: var(--n-padding-bottom) 0;
 margin: 0 var(--n-padding-left);
 `)])]),S(`>`,[c(`card-header`,`
 box-sizing: border-box;
 display: flex;
 align-items: center;
 font-size: var(--n-title-font-size);
 padding:
 var(--n-padding-top)
 var(--n-padding-left)
 var(--n-padding-bottom)
 var(--n-padding-left);
 `,[d(`main`,`
 font-weight: var(--n-title-font-weight);
 transition: color .3s var(--n-bezier);
 flex: 1;
 min-width: 0;
 color: var(--n-title-text-color);
 `),d(`extra`,`
 display: flex;
 align-items: center;
 font-size: var(--n-font-size);
 font-weight: 400;
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `),d(`close`,`
 margin: 0 0 0 8px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)]),d(`action`,`
 box-sizing: border-box;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 background-clip: padding-box;
 background-color: var(--n-action-color);
 `),Ht,c(`card-content`,[S(`&:first-child`,`
 padding-top: var(--n-padding-bottom);
 `)]),d(`content-scrollbar`,`
 display: flex;
 flex-direction: column;
 `,[S(`>`,[c(`scrollbar-container`,[S(`>`,[Ht])])]),S(`&:first-child >`,[c(`scrollbar-container`,[S(`>`,[c(`card-content`,`
 padding-top: var(--n-padding-bottom);
 `)])])])]),d(`footer`,`
 box-sizing: border-box;
 padding: 0 var(--n-padding-left) var(--n-padding-bottom) var(--n-padding-left);
 font-size: var(--n-font-size);
 `,[S(`&:first-child`,`
 padding-top: var(--n-padding-bottom);
 `)]),d(`action`,`
 background-color: var(--n-action-color);
 padding: var(--n-padding-bottom) var(--n-padding-left);
 border-bottom-left-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `)]),c(`card-cover`,`
 overflow: hidden;
 width: 100%;
 border-radius: var(--n-border-radius) var(--n-border-radius) 0 0;
 `,[S(`img`,`
 display: block;
 width: 100%;
 `)]),P(`bordered`,`
 border: 1px solid var(--n-border-color);
 `,[S(`&:target`,`border-color: var(--n-color-target);`)]),P(`action-segmented`,[S(`>`,[d(`action`,[S(`&:not(:first-child)`,`
 border-top: 1px solid var(--n-border-color);
 `)])])]),P(`content-segmented, content-soft-segmented`,[S(`>`,[c(`card-content`,`
 transition: border-color 0.3s var(--n-bezier);
 `,[S(`&:not(:first-child)`,`
 border-top: 1px solid var(--n-border-color);
 `)]),d(`content-scrollbar`,`
 transition: border-color 0.3s var(--n-bezier);
 `,[S(`&:not(:first-child)`,`
 border-top: 1px solid var(--n-border-color);
 `)])])]),P(`footer-segmented, footer-soft-segmented`,[S(`>`,[d(`footer`,`
 transition: border-color 0.3s var(--n-bezier);
 `,[S(`&:not(:first-child)`,`
 border-top: 1px solid var(--n-border-color);
 `)])])]),P(`embedded`,`
 background-color: var(--n-color-embedded);
 `)]),C(c(`card`,`
 background: var(--n-color-modal);
 `,[P(`embedded`,`
 background-color: var(--n-color-embedded-modal);
 `)])),T(c(`card`,`
 background: var(--n-color-popover);
 `,[P(`embedded`,`
 background-color: var(--n-color-embedded-popover);
 `)]))]),Wt={title:[String,Function],contentClass:String,contentStyle:[Object,String],contentScrollable:Boolean,headerClass:String,headerStyle:[Object,String],headerExtraClass:String,headerExtraStyle:[Object,String],footerClass:String,footerStyle:[Object,String],embedded:Boolean,segmented:{type:[Boolean,Object],default:!1},size:String,bordered:{type:Boolean,default:!0},closable:Boolean,hoverable:Boolean,role:String,onClose:[Function,Array],tag:{type:String,default:`div`},cover:Function,content:[String,Function],footer:Function,action:Function,headerExtra:Function,closeFocusable:Boolean};bt(Wt);var Gt=Object.assign(Object.assign({},I.props),Wt),Kt=M({name:`Card`,props:Gt,slots:Object,setup(e){let t=()=>{let{onClose:t}=e;t&&yt(t)},{inlineThemeDisabled:n,mergedClsPrefixRef:r,mergedRtlRef:a,mergedComponentPropsRef:o}=h(e),s=I(`Card`,`-card`,Ut,A,e,r),c=i(`Card`,a,r),l=N(()=>e.size||o?.value?.Card?.size||`medium`),u=N(()=>{let e=l.value,{self:{color:t,colorModal:n,colorTarget:r,textColor:i,titleTextColor:a,titleFontWeight:o,borderColor:c,actionColor:u,borderRadius:d,lineHeight:f,closeIconColor:p,closeIconColorHover:m,closeIconColorPressed:h,closeColorHover:g,closeColorPressed:_,closeBorderRadius:v,closeIconSize:y,closeSize:b,boxShadow:x,colorPopover:S,colorEmbedded:C,colorEmbeddedModal:T,colorEmbeddedPopover:E,[w(`padding`,e)]:D,[w(`fontSize`,e)]:O,[w(`titleFontSize`,e)]:k},common:{cubicBezierEaseInOut:A}}=s.value,{top:j,left:ee,bottom:M}=L(D);return{"--n-bezier":A,"--n-border-radius":d,"--n-color":t,"--n-color-modal":n,"--n-color-popover":S,"--n-color-embedded":C,"--n-color-embedded-modal":T,"--n-color-embedded-popover":E,"--n-color-target":r,"--n-text-color":i,"--n-line-height":f,"--n-action-color":u,"--n-title-text-color":a,"--n-title-font-weight":o,"--n-close-icon-color":p,"--n-close-icon-color-hover":m,"--n-close-icon-color-pressed":h,"--n-close-color-hover":g,"--n-close-color-pressed":_,"--n-border-color":c,"--n-box-shadow":x,"--n-padding-top":j,"--n-padding-bottom":M,"--n-padding-left":ee,"--n-font-size":O,"--n-title-font-size":k,"--n-close-size":b,"--n-close-icon-size":y,"--n-close-border-radius":v}}),d=n?m(`card`,N(()=>l.value[0]),u,e):void 0;return{rtlEnabled:c,mergedClsPrefix:r,mergedTheme:s,handleCloseClick:t,cssVars:n?void 0:u,themeClass:d?.themeClass,onRender:d?.onRender}},render(){let{segmented:e,bordered:t,hoverable:n,mergedClsPrefix:r,rtlEnabled:i,onRender:a,embedded:o,tag:s,$slots:c}=this;return a?.(),F(s,{class:[`${r}-card`,this.themeClass,o&&`${r}-card--embedded`,{[`${r}-card--rtl`]:i,[`${r}-card--content-scrollable`]:this.contentScrollable,[`${r}-card--content${typeof e!=`boolean`&&e.content===`soft`?`-soft`:``}-segmented`]:e===!0||e!==!1&&e.content,[`${r}-card--footer${typeof e!=`boolean`&&e.footer===`soft`?`-soft`:``}-segmented`]:e===!0||e!==!1&&e.footer,[`${r}-card--action-segmented`]:e===!0||e!==!1&&e.action,[`${r}-card--bordered`]:t,[`${r}-card--hoverable`]:n}],style:this.cssVars,role:this.role},Z(c.cover,e=>{let t=this.cover?X([this.cover()]):e;return t&&F(`div`,{class:`${r}-card-cover`,role:`none`},t)}),Z(c.header,e=>{let{title:t}=this,n=t?X(typeof t==`function`?[t()]:[t]):e;return n||this.closable?F(`div`,{class:[`${r}-card-header`,this.headerClass],style:this.headerStyle,role:`heading`},F(`div`,{class:`${r}-card-header__main`,role:`heading`},n),Z(c[`header-extra`],e=>{let t=this.headerExtra?X([this.headerExtra()]):e;return t&&F(`div`,{class:[`${r}-card-header__extra`,this.headerExtraClass],style:this.headerExtraStyle},t)}),this.closable&&F(ie,{clsPrefix:r,class:`${r}-card-header__close`,onClick:this.handleCloseClick,focusable:this.closeFocusable,absolute:!0})):null}),Z(c.default,e=>{let{content:t}=this,n=t?X(typeof t==`function`?[t()]:[t]):e;return n?this.contentScrollable?F(jt,{class:`${r}-card__content-scrollbar`,contentClass:[`${r}-card-content`,this.contentClass],contentStyle:this.contentStyle},n):F(`div`,{class:[`${r}-card-content`,this.contentClass],style:this.contentStyle,role:`none`},n):null}),Z(c.footer,e=>{let t=this.footer?X([this.footer()]):e;return t&&F(`div`,{class:[`${r}-card__footer`,this.footerClass],style:this.footerStyle,role:`none`},t)}),Z(c.action,e=>{let t=this.action?X([this.action()]):e;return t&&F(`div`,{class:`${r}-card__action`,role:`none`},t)}))}}),qt=(e,t)=>{let n=e.__vccOpts||e;for(let[e,r]of t)n[e]=r;return n};export{pe as S,H as _,jt as a,B as b,Et as c,Z as d,bt as f,Se as g,pt as h,It as i,xt as l,_t as m,Kt as n,Ot as o,yt as p,Vt as r,Tt as s,qt as t,St as u,ye as v,L as x,V as y};