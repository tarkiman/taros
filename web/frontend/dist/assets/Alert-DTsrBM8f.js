import{$t as e,An as t,Bt as n,En as r,Kt as i,On as a,P as o,Qn as s,T as c,Vt as l,Xt as u,Zt as d,b as f,en as p,ft as m,j as h,k as g,nn as _,pt as v,w as y,xt as b,yn as x,yt as S}from"./auth-CSROUTah.js";import{a as C,i as w,n as T,r as E,t as D}from"./fade-in-height-expand.cssr-rxmB5bMg.js";import{t as O}from"./_common-DnEpalBx.js";function k(e){let{lineHeight:t,borderRadius:r,fontWeightStrong:i,baseColor:a,dividerColor:o,actionColor:s,textColor1:c,textColor2:u,closeColorHover:d,closeColorPressed:f,closeIconColor:p,closeIconColorHover:m,closeIconColorPressed:h,infoColor:g,successColor:_,warningColor:v,errorColor:y,fontSize:b}=e;return Object.assign(Object.assign({},O),{fontSize:b,lineHeight:t,titleFontWeight:i,borderRadius:r,border:`1px solid ${o}`,color:s,titleTextColor:c,iconColor:u,contentTextColor:u,closeBorderRadius:r,closeColorHover:d,closeColorPressed:f,closeIconColor:p,closeIconColorHover:m,closeIconColorPressed:h,borderInfo:`1px solid ${l(a,n(g,{alpha:.25}))}`,colorInfo:l(a,n(g,{alpha:.08})),titleTextColorInfo:c,iconColorInfo:g,contentTextColorInfo:u,closeColorHoverInfo:d,closeColorPressedInfo:f,closeIconColorInfo:p,closeIconColorHoverInfo:m,closeIconColorPressedInfo:h,borderSuccess:`1px solid ${l(a,n(_,{alpha:.25}))}`,colorSuccess:l(a,n(_,{alpha:.08})),titleTextColorSuccess:c,iconColorSuccess:_,contentTextColorSuccess:u,closeColorHoverSuccess:d,closeColorPressedSuccess:f,closeIconColorSuccess:p,closeIconColorHoverSuccess:m,closeIconColorPressedSuccess:h,borderWarning:`1px solid ${l(a,n(v,{alpha:.33}))}`,colorWarning:l(a,n(v,{alpha:.08})),titleTextColorWarning:c,iconColorWarning:v,contentTextColorWarning:u,closeColorHoverWarning:d,closeColorPressedWarning:f,closeIconColorWarning:p,closeIconColorHoverWarning:m,closeIconColorPressedWarning:h,borderError:`1px solid ${l(a,n(y,{alpha:.25}))}`,colorError:l(a,n(y,{alpha:.08})),titleTextColorError:c,iconColorError:y,contentTextColorError:u,closeColorHoverError:d,closeColorPressedError:f,closeIconColorError:p,closeIconColorHoverError:m,closeIconColorPressedError:h})}var A={name:`Alert`,common:f,self:k},j=d(`alert`,`
 line-height: var(--n-line-height);
 border-radius: var(--n-border-radius);
 position: relative;
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-color);
 text-align: start;
 word-break: break-word;
`,[e(`border`,`
 border-radius: inherit;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 transition: border-color .3s var(--n-bezier);
 border: var(--n-border);
 pointer-events: none;
 `),p(`closable`,[d(`alert-body`,[e(`title`,`
 padding-right: 24px;
 `)])]),e(`icon`,{color:`var(--n-icon-color)`}),d(`alert-body`,{padding:`var(--n-padding)`},[e(`title`,{color:`var(--n-title-text-color)`}),e(`content`,{color:`var(--n-content-text-color)`})]),D({originalTransition:`transform .3s var(--n-bezier)`,enterToProps:{transform:`scale(1)`},leaveToProps:{transform:`scale(0.9)`}}),e(`icon`,`
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
 `),e(`close`,`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 position: absolute;
 right: 0;
 top: 0;
 margin: var(--n-close-margin);
 `),p(`show-icon`,[d(`alert-body`,{paddingLeft:`calc(var(--n-icon-margin-left) + var(--n-icon-size) + var(--n-icon-margin-right))`})]),p(`right-adjust`,[d(`alert-body`,{paddingRight:`calc(var(--n-close-size) + var(--n-padding) + 2px)`})]),d(`alert-body`,`
 border-radius: var(--n-border-radius);
 transition: border-color .3s var(--n-bezier);
 `,[e(`title`,`
 transition: color .3s var(--n-bezier);
 font-size: 16px;
 line-height: 19px;
 font-weight: var(--n-title-font-weight);
 `,[u(`& +`,[e(`content`,{marginTop:`9px`})])]),e(`content`,{transition:`color .3s var(--n-bezier)`,fontSize:`var(--n-font-size)`})]),e(`icon`,{transition:`color .3s var(--n-bezier)`})]),M=Object.assign(Object.assign({},h.props),{title:String,showIcon:{type:Boolean,default:!0},type:{type:String,default:`default`},bordered:{type:Boolean,default:!0},closable:Boolean,onClose:Function,onAfterLeave:Function,onAfterHide:Function}),N=r({name:`Alert`,inheritAttrs:!1,props:M,slots:Object,setup(e){let{mergedClsPrefixRef:t,mergedBorderedRef:n,inlineThemeDisabled:r,mergedRtlRef:a}=v(e),c=h(`Alert`,`-alert`,j,A,e,t),l=o(`Alert`,a,t),u=x(()=>{let{common:{cubicBezierEaseInOut:t},self:n}=c.value,{fontSize:r,borderRadius:a,titleFontWeight:o,lineHeight:s,iconSize:l,iconMargin:u,iconMarginRtl:d,closeIconSize:f,closeBorderRadius:p,closeSize:m,closeMargin:h,closeMarginRtl:g,padding:v}=n,{type:y}=e,{left:b,right:x}=i(u);return{"--n-bezier":t,"--n-color":n[_(`color`,y)],"--n-close-icon-size":f,"--n-close-border-radius":p,"--n-close-color-hover":n[_(`closeColorHover`,y)],"--n-close-color-pressed":n[_(`closeColorPressed`,y)],"--n-close-icon-color":n[_(`closeIconColor`,y)],"--n-close-icon-color-hover":n[_(`closeIconColorHover`,y)],"--n-close-icon-color-pressed":n[_(`closeIconColorPressed`,y)],"--n-icon-color":n[_(`iconColor`,y)],"--n-border":n[_(`border`,y)],"--n-title-text-color":n[_(`titleTextColor`,y)],"--n-content-text-color":n[_(`contentTextColor`,y)],"--n-line-height":s,"--n-border-radius":a,"--n-font-size":r,"--n-title-font-weight":o,"--n-icon-size":l,"--n-icon-margin":u,"--n-icon-margin-rtl":d,"--n-close-size":m,"--n-close-margin":h,"--n-close-margin-rtl":g,"--n-padding":v,"--n-icon-margin-left":b,"--n-icon-margin-right":x}}),d=r?m(`alert`,x(()=>e.type[0]),u,e):void 0,f=s(!0),p=()=>{let{onAfterLeave:t,onAfterHide:n}=e;t&&t(),n&&n()};return{rtlEnabled:l,mergedClsPrefix:t,mergedBordered:n,visible:f,handleCloseClick:()=>{Promise.resolve(e.onClose?.call(e)).then(e=>{e!==!1&&(f.value=!1)})},handleAfterLeave:()=>{p()},mergedTheme:c,cssVars:r?void 0:u,themeClass:d?.themeClass,onRender:d?.onRender}},render(){var e;return(e=this.onRender)==null||e.call(this),a(y,{onAfterLeave:this.handleAfterLeave},{default:()=>{let{mergedClsPrefix:e,$slots:n}=this,r={class:[`${e}-alert`,this.themeClass,this.closable&&`${e}-alert--closable`,this.showIcon&&`${e}-alert--show-icon`,!this.title&&this.closable&&`${e}-alert--right-adjust`,this.rtlEnabled&&`${e}-alert--rtl`],style:this.cssVars,role:`alert`};return this.visible?a(`div`,Object.assign({},t(this.$attrs,r)),this.closable&&a(c,{clsPrefix:e,class:`${e}-alert__close`,onClick:this.handleCloseClick}),this.bordered&&a(`div`,{class:`${e}-alert__border`}),this.showIcon&&a(`div`,{class:`${e}-alert__icon`,"aria-hidden":`true`},S(n.icon,()=>[a(g,{clsPrefix:e},{default:()=>{switch(this.type){case`success`:return a(E,null);case`info`:return a(w,null);case`warning`:return a(T,null);case`error`:return a(C,null);default:return null}}})])),a(`div`,{class:[`${e}-alert-body`,this.mergedBordered&&`${e}-alert-body--bordered`]},b(n.header,t=>{let n=t||this.title;return n?a(`div`,{class:`${e}-alert-body__title`},n):null}),n.default&&a(`div`,{class:`${e}-alert-body__content`},n))):null}})}});export{N as t};