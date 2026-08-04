import{Bt as e,C as t,E as n,Qt as r,St as i,Yt as a,_ as o,bn as s,g as c,mt as l,nt as u,p as d,pt as f,qt as p,rt as m,vt as h,wt as g,x as _,xt as v,yt as y}from"./auth-Trpo-0ON.js";import{O as b,f as x,m as S}from"./_plugin-vue_export-helper-C4Zs982g.js";import{a as C,i as w,o as T,r as E,s as D}from"./light-BidEkyRZ.js";import{t as O}from"./_common-DnEpalBx.js";function k(e){let{lineHeight:t,borderRadius:n,fontWeightStrong:r,baseColor:i,dividerColor:a,actionColor:o,textColor1:s,textColor2:c,closeColorHover:u,closeColorPressed:d,closeIconColor:p,closeIconColorHover:m,closeIconColorPressed:h,infoColor:g,successColor:_,warningColor:v,errorColor:y,fontSize:b}=e;return Object.assign(Object.assign({},O),{fontSize:b,lineHeight:t,titleFontWeight:r,borderRadius:n,border:`1px solid ${a}`,color:o,titleTextColor:s,iconColor:c,contentTextColor:c,closeBorderRadius:n,closeColorHover:u,closeColorPressed:d,closeIconColor:p,closeIconColorHover:m,closeIconColorPressed:h,borderInfo:`1px solid ${l(i,f(g,{alpha:.25}))}`,colorInfo:l(i,f(g,{alpha:.08})),titleTextColorInfo:s,iconColorInfo:g,contentTextColorInfo:c,closeColorHoverInfo:u,closeColorPressedInfo:d,closeIconColorInfo:p,closeIconColorHoverInfo:m,closeIconColorPressedInfo:h,borderSuccess:`1px solid ${l(i,f(_,{alpha:.25}))}`,colorSuccess:l(i,f(_,{alpha:.08})),titleTextColorSuccess:s,iconColorSuccess:_,contentTextColorSuccess:c,closeColorHoverSuccess:u,closeColorPressedSuccess:d,closeIconColorSuccess:p,closeIconColorHoverSuccess:m,closeIconColorPressedSuccess:h,borderWarning:`1px solid ${l(i,f(v,{alpha:.33}))}`,colorWarning:l(i,f(v,{alpha:.08})),titleTextColorWarning:s,iconColorWarning:v,contentTextColorWarning:c,closeColorHoverWarning:u,closeColorPressedWarning:d,closeIconColorWarning:p,closeIconColorHoverWarning:m,closeIconColorPressedWarning:h,borderError:`1px solid ${l(i,f(y,{alpha:.25}))}`,colorError:l(i,f(y,{alpha:.08})),titleTextColorError:s,iconColorError:y,contentTextColorError:c,closeColorHoverError:u,closeColorPressedError:d,closeIconColorError:p,closeIconColorHoverError:m,closeIconColorPressedError:h})}var A={name:`Alert`,common:d,self:k},j=y(`alert`,`
 line-height: var(--n-line-height);
 border-radius: var(--n-border-radius);
 position: relative;
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-color);
 text-align: start;
 word-break: break-word;
`,[v(`border`,`
 border-radius: inherit;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 transition: border-color .3s var(--n-bezier);
 border: var(--n-border);
 pointer-events: none;
 `),i(`closable`,[y(`alert-body`,[v(`title`,`
 padding-right: 24px;
 `)])]),v(`icon`,{color:`var(--n-icon-color)`}),y(`alert-body`,{padding:`var(--n-padding)`},[v(`title`,{color:`var(--n-title-text-color)`}),v(`content`,{color:`var(--n-content-text-color)`})]),E({originalTransition:`transform .3s var(--n-bezier)`,enterToProps:{transform:`scale(1)`},leaveToProps:{transform:`scale(0.9)`}}),v(`icon`,`
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
 `),v(`close`,`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 position: absolute;
 right: 0;
 top: 0;
 margin: var(--n-close-margin);
 `),i(`show-icon`,[y(`alert-body`,{paddingLeft:`calc(var(--n-icon-margin-left) + var(--n-icon-size) + var(--n-icon-margin-right))`})]),i(`right-adjust`,[y(`alert-body`,{paddingRight:`calc(var(--n-close-size) + var(--n-padding) + 2px)`})]),y(`alert-body`,`
 border-radius: var(--n-border-radius);
 transition: border-color .3s var(--n-bezier);
 `,[v(`title`,`
 transition: color .3s var(--n-bezier);
 font-size: 16px;
 line-height: 19px;
 font-weight: var(--n-title-font-weight);
 `,[h(`& +`,[v(`content`,{marginTop:`9px`})])]),v(`content`,{transition:`color .3s var(--n-bezier)`,fontSize:`var(--n-font-size)`})]),v(`icon`,{transition:`color .3s var(--n-bezier)`})]),M=Object.assign(Object.assign({},t.props),{title:String,showIcon:{type:Boolean,default:!0},type:{type:String,default:`default`},bordered:{type:Boolean,default:!0},closable:Boolean,onClose:Function,onAfterLeave:Function,onAfterHide:Function}),N=p({name:`Alert`,inheritAttrs:!1,props:M,slots:Object,setup(r){let{mergedClsPrefixRef:i,mergedBorderedRef:a,inlineThemeDisabled:o,mergedRtlRef:c}=m(r),l=t(`Alert`,`-alert`,j,A,r,i),d=n(`Alert`,c,i),f=e(()=>{let{common:{cubicBezierEaseInOut:e},self:t}=l.value,{fontSize:n,borderRadius:i,titleFontWeight:a,lineHeight:o,iconSize:s,iconMargin:c,iconMarginRtl:u,closeIconSize:d,closeBorderRadius:f,closeSize:p,closeMargin:m,closeMarginRtl:h,padding:_}=t,{type:v}=r,{left:y,right:x}=b(c);return{"--n-bezier":e,"--n-color":t[g(`color`,v)],"--n-close-icon-size":d,"--n-close-border-radius":f,"--n-close-color-hover":t[g(`closeColorHover`,v)],"--n-close-color-pressed":t[g(`closeColorPressed`,v)],"--n-close-icon-color":t[g(`closeIconColor`,v)],"--n-close-icon-color-hover":t[g(`closeIconColorHover`,v)],"--n-close-icon-color-pressed":t[g(`closeIconColorPressed`,v)],"--n-icon-color":t[g(`iconColor`,v)],"--n-border":t[g(`border`,v)],"--n-title-text-color":t[g(`titleTextColor`,v)],"--n-content-text-color":t[g(`contentTextColor`,v)],"--n-line-height":o,"--n-border-radius":i,"--n-font-size":n,"--n-title-font-weight":a,"--n-icon-size":s,"--n-icon-margin":c,"--n-icon-margin-rtl":u,"--n-close-size":p,"--n-close-margin":m,"--n-close-margin-rtl":h,"--n-padding":_,"--n-icon-margin-left":y,"--n-icon-margin-right":x}}),p=o?u(`alert`,e(()=>r.type[0]),f,r):void 0,h=s(!0),_=()=>{let{onAfterLeave:e,onAfterHide:t}=r;e&&e(),t&&t()};return{rtlEnabled:d,mergedClsPrefix:i,mergedBordered:a,visible:h,handleCloseClick:()=>{Promise.resolve(r.onClose?.call(r)).then(e=>{e!==!1&&(h.value=!1)})},handleAfterLeave:()=>{_()},mergedTheme:l,cssVars:o?void 0:f,themeClass:p?.themeClass,onRender:p?.onRender}},render(){var e;return(e=this.onRender)==null||e.call(this),a(c,{onAfterLeave:this.handleAfterLeave},{default:()=>{let{mergedClsPrefix:e,$slots:t}=this,n={class:[`${e}-alert`,this.themeClass,this.closable&&`${e}-alert--closable`,this.showIcon&&`${e}-alert--show-icon`,!this.title&&this.closable&&`${e}-alert--right-adjust`,this.rtlEnabled&&`${e}-alert--rtl`],style:this.cssVars,role:`alert`};return this.visible?a(`div`,Object.assign({},r(this.$attrs,n)),this.closable&&a(o,{clsPrefix:e,class:`${e}-alert__close`,onClick:this.handleCloseClick}),this.bordered&&a(`div`,{class:`${e}-alert__border`}),this.showIcon&&a(`div`,{class:`${e}-alert__icon`,"aria-hidden":`true`},x(t.icon,()=>[a(_,{clsPrefix:e},{default:()=>{switch(this.type){case`success`:return a(C,null);case`info`:return a(T,null);case`warning`:return a(w,null);case`error`:return a(D,null);default:return null}}})])),a(`div`,{class:[`${e}-alert-body`,this.mergedBordered&&`${e}-alert-body--bordered`]},S(t.header,t=>{let n=t||this.title;return n?a(`div`,{class:`${e}-alert-body__title`},n):null}),t.default&&a(`div`,{class:`${e}-alert-body__content`},t))):null}})}});export{N as t};