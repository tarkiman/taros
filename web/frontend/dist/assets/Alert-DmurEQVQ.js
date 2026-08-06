import{E as e,En as t,Ht as n,It as r,Jn as i,Kt as a,Lt as o,O as s,Qt as c,S as l,Sn as u,Xt as d,Yt as f,_ as p,gt as m,hn as h,j as g,lt as _,qt as v,ut as y,vt as b,wn as x,x as S}from"./auth-DqHclkT-.js";import{a as C,i as w,n as T,r as E,t as D}from"./fade-in-height-expand.cssr-RKCOTE1x.js";import{t as O}from"./_common-DnEpalBx.js";function k(e){let{lineHeight:t,borderRadius:n,fontWeightStrong:i,baseColor:a,dividerColor:s,actionColor:c,textColor1:l,textColor2:u,closeColorHover:d,closeColorPressed:f,closeIconColor:p,closeIconColorHover:m,closeIconColorPressed:h,infoColor:g,successColor:_,warningColor:v,errorColor:y,fontSize:b}=e;return Object.assign(Object.assign({},O),{fontSize:b,lineHeight:t,titleFontWeight:i,borderRadius:n,border:`1px solid ${s}`,color:c,titleTextColor:l,iconColor:u,contentTextColor:u,closeBorderRadius:n,closeColorHover:d,closeColorPressed:f,closeIconColor:p,closeIconColorHover:m,closeIconColorPressed:h,borderInfo:`1px solid ${o(a,r(g,{alpha:.25}))}`,colorInfo:o(a,r(g,{alpha:.08})),titleTextColorInfo:l,iconColorInfo:g,contentTextColorInfo:u,closeColorHoverInfo:d,closeColorPressedInfo:f,closeIconColorInfo:p,closeIconColorHoverInfo:m,closeIconColorPressedInfo:h,borderSuccess:`1px solid ${o(a,r(_,{alpha:.25}))}`,colorSuccess:o(a,r(_,{alpha:.08})),titleTextColorSuccess:l,iconColorSuccess:_,contentTextColorSuccess:u,closeColorHoverSuccess:d,closeColorPressedSuccess:f,closeIconColorSuccess:p,closeIconColorHoverSuccess:m,closeIconColorPressedSuccess:h,borderWarning:`1px solid ${o(a,r(v,{alpha:.33}))}`,colorWarning:o(a,r(v,{alpha:.08})),titleTextColorWarning:l,iconColorWarning:v,contentTextColorWarning:u,closeColorHoverWarning:d,closeColorPressedWarning:f,closeIconColorWarning:p,closeIconColorHoverWarning:m,closeIconColorPressedWarning:h,borderError:`1px solid ${o(a,r(y,{alpha:.25}))}`,colorError:o(a,r(y,{alpha:.08})),titleTextColorError:l,iconColorError:y,contentTextColorError:u,closeColorHoverError:d,closeColorPressedError:f,closeIconColorError:p,closeIconColorHoverError:m,closeIconColorPressedError:h})}var A={name:`Alert`,common:p,self:k},j=v(`alert`,`
 line-height: var(--n-line-height);
 border-radius: var(--n-border-radius);
 position: relative;
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-color);
 text-align: start;
 word-break: break-word;
`,[f(`border`,`
 border-radius: inherit;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 transition: border-color .3s var(--n-bezier);
 border: var(--n-border);
 pointer-events: none;
 `),d(`closable`,[v(`alert-body`,[f(`title`,`
 padding-right: 24px;
 `)])]),f(`icon`,{color:`var(--n-icon-color)`}),v(`alert-body`,{padding:`var(--n-padding)`},[f(`title`,{color:`var(--n-title-text-color)`}),f(`content`,{color:`var(--n-content-text-color)`})]),D({originalTransition:`transform .3s var(--n-bezier)`,enterToProps:{transform:`scale(1)`},leaveToProps:{transform:`scale(0.9)`}}),f(`icon`,`
 position: absolute;
 left: 0;
 top: 0;
 align-items: center;
 justify-content: center;
 display: flex;
 width: var(--n-icon-size);
 height: var(--n-icon-size);
 font-size: var(--n-icon-size);
 margin: var(--n-icon-margin);
 `),f(`close`,`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 position: absolute;
 right: 0;
 top: 0;
 margin: var(--n-close-margin);
 `),d(`show-icon`,[v(`alert-body`,{paddingLeft:`calc(var(--n-icon-margin-left) + var(--n-icon-size) + var(--n-icon-margin-right))`})]),d(`right-adjust`,[v(`alert-body`,{paddingRight:`calc(var(--n-close-size) + var(--n-padding) + 2px)`})]),v(`alert-body`,`
 border-radius: var(--n-border-radius);
 transition: border-color .3s var(--n-bezier);
 `,[f(`title`,`
 transition: color .3s var(--n-bezier);
 font-size: 16px;
 line-height: 19px;
 font-weight: var(--n-title-font-weight);
 `,[a(`& +`,[f(`content`,{marginTop:`9px`})])]),f(`content`,{transition:`color .3s var(--n-bezier)`,fontSize:`var(--n-font-size)`})]),f(`icon`,{transition:`color .3s var(--n-bezier)`})]),M=Object.assign(Object.assign({},s.props),{title:String,showIcon:{type:Boolean,default:!0},type:{type:String,default:`default`},bordered:{type:Boolean,default:!0},closable:Boolean,onClose:Function,onAfterLeave:Function,onAfterHide:Function}),N=u({name:`Alert`,inheritAttrs:!1,props:M,slots:Object,setup(e){let{mergedClsPrefixRef:t,mergedBorderedRef:r,inlineThemeDisabled:a,mergedRtlRef:o}=y(e),l=s(`Alert`,`-alert`,j,A,e,t),u=g(`Alert`,o,t),d=h(()=>{let{common:{cubicBezierEaseInOut:t},self:r}=l.value,{fontSize:i,borderRadius:a,titleFontWeight:o,lineHeight:s,iconSize:u,iconMargin:d,iconMarginRtl:f,closeIconSize:p,closeBorderRadius:m,closeSize:h,closeMargin:g,closeMarginRtl:_,padding:v}=r,{type:y}=e,{left:b,right:x}=n(d);return{"--n-bezier":t,"--n-color":r[c(`color`,y)],"--n-close-icon-size":p,"--n-close-border-radius":m,"--n-close-color-hover":r[c(`closeColorHover`,y)],"--n-close-color-pressed":r[c(`closeColorPressed`,y)],"--n-close-icon-color":r[c(`closeIconColor`,y)],"--n-close-icon-color-hover":r[c(`closeIconColorHover`,y)],"--n-close-icon-color-pressed":r[c(`closeIconColorPressed`,y)],"--n-icon-color":r[c(`iconColor`,y)],"--n-border":r[c(`border`,y)],"--n-title-text-color":r[c(`titleTextColor`,y)],"--n-content-text-color":r[c(`contentTextColor`,y)],"--n-line-height":s,"--n-border-radius":a,"--n-font-size":i,"--n-title-font-weight":o,"--n-icon-size":u,"--n-icon-margin":d,"--n-icon-margin-rtl":f,"--n-close-size":h,"--n-close-margin":g,"--n-close-margin-rtl":_,"--n-padding":v,"--n-icon-margin-left":b,"--n-icon-margin-right":x}}),f=a?_(`alert`,h(()=>e.type[0]),d,e):void 0,p=i(!0),m=()=>{let{onAfterLeave:t,onAfterHide:n}=e;t&&t(),n&&n()};return{rtlEnabled:u,mergedClsPrefix:t,mergedBordered:r,visible:p,handleCloseClick:()=>{Promise.resolve(e.onClose?.call(e)).then(e=>{e!==!1&&(p.value=!1)})},handleAfterLeave:()=>{m()},mergedTheme:l,cssVars:a?void 0:d,themeClass:f?.themeClass,onRender:f?.onRender}},render(){var n;return(n=this.onRender)==null||n.call(this),x(S,{onAfterLeave:this.handleAfterLeave},{default:()=>{let{mergedClsPrefix:n,$slots:r}=this,i={class:[`${n}-alert`,this.themeClass,this.closable&&`${n}-alert--closable`,this.showIcon&&`${n}-alert--show-icon`,!this.title&&this.closable&&`${n}-alert--right-adjust`,this.rtlEnabled&&`${n}-alert--rtl`],style:this.cssVars,role:`alert`};return this.visible?x(`div`,Object.assign({},t(this.$attrs,i)),this.closable&&x(l,{clsPrefix:n,class:`${n}-alert__close`,onClick:this.handleCloseClick}),this.bordered&&x(`div`,{class:`${n}-alert__border`}),this.showIcon&&x(`div`,{class:`${n}-alert__icon`,"aria-hidden":`true`},m(r.icon,()=>[x(e,{clsPrefix:n},{default:()=>{switch(this.type){case`success`:return x(E,null);case`info`:return x(w,null);case`warning`:return x(T,null);case`error`:return x(C,null);default:return null}}})])),x(`div`,{class:[`${n}-alert-body`,this.mergedBordered&&`${n}-alert-body--bordered`]},b(r.header,e=>{let t=e||this.title;return t?x(`div`,{class:`${n}-alert-body__title`},t):null}),r.default&&x(`div`,{class:`${n}-alert-body__content`},r))):null}})}});export{N as t};