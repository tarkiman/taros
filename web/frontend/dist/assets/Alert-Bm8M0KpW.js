import{Bt as e,E as t,Ft as n,Gt as r,Jt as i,Kn as a,O as o,Pt as s,S as c,Sn as l,Wt as u,Xt as d,_ as f,bn as p,gt as m,j as h,lt as g,pn as _,qt as v,ut as y,vt as b,wn as x,x as S}from"./auth-CKvW4zla.js";import{a as C,i as w,n as T,r as E,t as D}from"./fade-in-height-expand.cssr-DKOO-BQw.js";import{t as O}from"./_common-DnEpalBx.js";function k(e){let{lineHeight:t,borderRadius:r,fontWeightStrong:i,baseColor:a,dividerColor:o,actionColor:c,textColor1:l,textColor2:u,closeColorHover:d,closeColorPressed:f,closeIconColor:p,closeIconColorHover:m,closeIconColorPressed:h,infoColor:g,successColor:_,warningColor:v,errorColor:y,fontSize:b}=e;return Object.assign(Object.assign({},O),{fontSize:b,lineHeight:t,titleFontWeight:i,borderRadius:r,border:`1px solid ${o}`,color:c,titleTextColor:l,iconColor:u,contentTextColor:u,closeBorderRadius:r,closeColorHover:d,closeColorPressed:f,closeIconColor:p,closeIconColorHover:m,closeIconColorPressed:h,borderInfo:`1px solid ${n(a,s(g,{alpha:.25}))}`,colorInfo:n(a,s(g,{alpha:.08})),titleTextColorInfo:l,iconColorInfo:g,contentTextColorInfo:u,closeColorHoverInfo:d,closeColorPressedInfo:f,closeIconColorInfo:p,closeIconColorHoverInfo:m,closeIconColorPressedInfo:h,borderSuccess:`1px solid ${n(a,s(_,{alpha:.25}))}`,colorSuccess:n(a,s(_,{alpha:.08})),titleTextColorSuccess:l,iconColorSuccess:_,contentTextColorSuccess:u,closeColorHoverSuccess:d,closeColorPressedSuccess:f,closeIconColorSuccess:p,closeIconColorHoverSuccess:m,closeIconColorPressedSuccess:h,borderWarning:`1px solid ${n(a,s(v,{alpha:.33}))}`,colorWarning:n(a,s(v,{alpha:.08})),titleTextColorWarning:l,iconColorWarning:v,contentTextColorWarning:u,closeColorHoverWarning:d,closeColorPressedWarning:f,closeIconColorWarning:p,closeIconColorHoverWarning:m,closeIconColorPressedWarning:h,borderError:`1px solid ${n(a,s(y,{alpha:.25}))}`,colorError:n(a,s(y,{alpha:.08})),titleTextColorError:l,iconColorError:y,contentTextColorError:u,closeColorHoverError:d,closeColorPressedError:f,closeIconColorError:p,closeIconColorHoverError:m,closeIconColorPressedError:h})}var A={name:`Alert`,common:f,self:k},j=r(`alert`,`
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
 `),i(`closable`,[r(`alert-body`,[v(`title`,`
 padding-right: 24px;
 `)])]),v(`icon`,{color:`var(--n-icon-color)`}),r(`alert-body`,{padding:`var(--n-padding)`},[v(`title`,{color:`var(--n-title-text-color)`}),v(`content`,{color:`var(--n-content-text-color)`})]),D({originalTransition:`transform .3s var(--n-bezier)`,enterToProps:{transform:`scale(1)`},leaveToProps:{transform:`scale(0.9)`}}),v(`icon`,`
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
 `),i(`show-icon`,[r(`alert-body`,{paddingLeft:`calc(var(--n-icon-margin-left) + var(--n-icon-size) + var(--n-icon-margin-right))`})]),i(`right-adjust`,[r(`alert-body`,{paddingRight:`calc(var(--n-close-size) + var(--n-padding) + 2px)`})]),r(`alert-body`,`
 border-radius: var(--n-border-radius);
 transition: border-color .3s var(--n-bezier);
 `,[v(`title`,`
 transition: color .3s var(--n-bezier);
 font-size: 16px;
 line-height: 19px;
 font-weight: var(--n-title-font-weight);
 `,[u(`& +`,[v(`content`,{marginTop:`9px`})])]),v(`content`,{transition:`color .3s var(--n-bezier)`,fontSize:`var(--n-font-size)`})]),v(`icon`,{transition:`color .3s var(--n-bezier)`})]),M=Object.assign(Object.assign({},o.props),{title:String,showIcon:{type:Boolean,default:!0},type:{type:String,default:`default`},bordered:{type:Boolean,default:!0},closable:Boolean,onClose:Function,onAfterLeave:Function,onAfterHide:Function}),N=p({name:`Alert`,inheritAttrs:!1,props:M,slots:Object,setup(t){let{mergedClsPrefixRef:n,mergedBorderedRef:r,inlineThemeDisabled:i,mergedRtlRef:s}=y(t),c=o(`Alert`,`-alert`,j,A,t,n),l=h(`Alert`,s,n),u=_(()=>{let{common:{cubicBezierEaseInOut:n},self:r}=c.value,{fontSize:i,borderRadius:a,titleFontWeight:o,lineHeight:s,iconSize:l,iconMargin:u,iconMarginRtl:f,closeIconSize:p,closeBorderRadius:m,closeSize:h,closeMargin:g,closeMarginRtl:_,padding:v}=r,{type:y}=t,{left:b,right:x}=e(u);return{"--n-bezier":n,"--n-color":r[d(`color`,y)],"--n-close-icon-size":p,"--n-close-border-radius":m,"--n-close-color-hover":r[d(`closeColorHover`,y)],"--n-close-color-pressed":r[d(`closeColorPressed`,y)],"--n-close-icon-color":r[d(`closeIconColor`,y)],"--n-close-icon-color-hover":r[d(`closeIconColorHover`,y)],"--n-close-icon-color-pressed":r[d(`closeIconColorPressed`,y)],"--n-icon-color":r[d(`iconColor`,y)],"--n-border":r[d(`border`,y)],"--n-title-text-color":r[d(`titleTextColor`,y)],"--n-content-text-color":r[d(`contentTextColor`,y)],"--n-line-height":s,"--n-border-radius":a,"--n-font-size":i,"--n-title-font-weight":o,"--n-icon-size":l,"--n-icon-margin":u,"--n-icon-margin-rtl":f,"--n-close-size":h,"--n-close-margin":g,"--n-close-margin-rtl":_,"--n-padding":v,"--n-icon-margin-left":b,"--n-icon-margin-right":x}}),f=i?g(`alert`,_(()=>t.type[0]),u,t):void 0,p=a(!0),m=()=>{let{onAfterLeave:e,onAfterHide:n}=t;e&&e(),n&&n()};return{rtlEnabled:l,mergedClsPrefix:n,mergedBordered:r,visible:p,handleCloseClick:()=>{Promise.resolve(t.onClose?.call(t)).then(e=>{e!==!1&&(p.value=!1)})},handleAfterLeave:()=>{m()},mergedTheme:c,cssVars:i?void 0:u,themeClass:f?.themeClass,onRender:f?.onRender}},render(){var e;return(e=this.onRender)==null||e.call(this),l(S,{onAfterLeave:this.handleAfterLeave},{default:()=>{let{mergedClsPrefix:e,$slots:n}=this,r={class:[`${e}-alert`,this.themeClass,this.closable&&`${e}-alert--closable`,this.showIcon&&`${e}-alert--show-icon`,!this.title&&this.closable&&`${e}-alert--right-adjust`,this.rtlEnabled&&`${e}-alert--rtl`],style:this.cssVars,role:`alert`};return this.visible?l(`div`,Object.assign({},x(this.$attrs,r)),this.closable&&l(c,{clsPrefix:e,class:`${e}-alert__close`,onClick:this.handleCloseClick}),this.bordered&&l(`div`,{class:`${e}-alert__border`}),this.showIcon&&l(`div`,{class:`${e}-alert__icon`,"aria-hidden":`true`},m(n.icon,()=>[l(t,{clsPrefix:e},{default:()=>{switch(this.type){case`success`:return l(E,null);case`info`:return l(w,null);case`warning`:return l(T,null);case`error`:return l(C,null);default:return null}}})])),l(`div`,{class:[`${e}-alert-body`,this.mergedBordered&&`${e}-alert-body--bordered`]},b(n.header,t=>{let n=t||this.title;return n?l(`div`,{class:`${e}-alert-body__title`},n):null}),n.default&&l(`div`,{class:`${e}-alert-body__content`},n))):null}})}});export{N as t};