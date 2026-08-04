import{Bt as e,Cn as t,E as n,Ft as r,Gn as i,Gt as a,Jt as o,O as s,Pt as c,S as l,Wt as u,Xt as d,_ as f,fn as p,gt as m,j as h,lt as g,qt as _,ut as v,vt as y,x as b,xn as x,yn as S}from"./auth-CPbU0tuF.js";import{a as C,i as w,n as T,r as E,t as D}from"./fade-in-height-expand.cssr-Kmdf5eZ5.js";import{t as O}from"./_common-DnEpalBx.js";function k(e){let{lineHeight:t,borderRadius:n,fontWeightStrong:i,baseColor:a,dividerColor:o,actionColor:s,textColor1:l,textColor2:u,closeColorHover:d,closeColorPressed:f,closeIconColor:p,closeIconColorHover:m,closeIconColorPressed:h,infoColor:g,successColor:_,warningColor:v,errorColor:y,fontSize:b}=e;return Object.assign(Object.assign({},O),{fontSize:b,lineHeight:t,titleFontWeight:i,borderRadius:n,border:`1px solid ${o}`,color:s,titleTextColor:l,iconColor:u,contentTextColor:u,closeBorderRadius:n,closeColorHover:d,closeColorPressed:f,closeIconColor:p,closeIconColorHover:m,closeIconColorPressed:h,borderInfo:`1px solid ${r(a,c(g,{alpha:.25}))}`,colorInfo:r(a,c(g,{alpha:.08})),titleTextColorInfo:l,iconColorInfo:g,contentTextColorInfo:u,closeColorHoverInfo:d,closeColorPressedInfo:f,closeIconColorInfo:p,closeIconColorHoverInfo:m,closeIconColorPressedInfo:h,borderSuccess:`1px solid ${r(a,c(_,{alpha:.25}))}`,colorSuccess:r(a,c(_,{alpha:.08})),titleTextColorSuccess:l,iconColorSuccess:_,contentTextColorSuccess:u,closeColorHoverSuccess:d,closeColorPressedSuccess:f,closeIconColorSuccess:p,closeIconColorHoverSuccess:m,closeIconColorPressedSuccess:h,borderWarning:`1px solid ${r(a,c(v,{alpha:.33}))}`,colorWarning:r(a,c(v,{alpha:.08})),titleTextColorWarning:l,iconColorWarning:v,contentTextColorWarning:u,closeColorHoverWarning:d,closeColorPressedWarning:f,closeIconColorWarning:p,closeIconColorHoverWarning:m,closeIconColorPressedWarning:h,borderError:`1px solid ${r(a,c(y,{alpha:.25}))}`,colorError:r(a,c(y,{alpha:.08})),titleTextColorError:l,iconColorError:y,contentTextColorError:u,closeColorHoverError:d,closeColorPressedError:f,closeIconColorError:p,closeIconColorHoverError:m,closeIconColorPressedError:h})}var A={name:`Alert`,common:f,self:k},j=a(`alert`,`
 line-height: var(--n-line-height);
 border-radius: var(--n-border-radius);
 position: relative;
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-color);
 text-align: start;
 word-break: break-word;
`,[_(`border`,`
 border-radius: inherit;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 transition: border-color .3s var(--n-bezier);
 border: var(--n-border);
 pointer-events: none;
 `),o(`closable`,[a(`alert-body`,[_(`title`,`
 padding-right: 24px;
 `)])]),_(`icon`,{color:`var(--n-icon-color)`}),a(`alert-body`,{padding:`var(--n-padding)`},[_(`title`,{color:`var(--n-title-text-color)`}),_(`content`,{color:`var(--n-content-text-color)`})]),D({originalTransition:`transform .3s var(--n-bezier)`,enterToProps:{transform:`scale(1)`},leaveToProps:{transform:`scale(0.9)`}}),_(`icon`,`
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
 `),_(`close`,`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 position: absolute;
 right: 0;
 top: 0;
 margin: var(--n-close-margin);
 `),o(`show-icon`,[a(`alert-body`,{paddingLeft:`calc(var(--n-icon-margin-left) + var(--n-icon-size) + var(--n-icon-margin-right))`})]),o(`right-adjust`,[a(`alert-body`,{paddingRight:`calc(var(--n-close-size) + var(--n-padding) + 2px)`})]),a(`alert-body`,`
 border-radius: var(--n-border-radius);
 transition: border-color .3s var(--n-bezier);
 `,[_(`title`,`
 transition: color .3s var(--n-bezier);
 font-size: 16px;
 line-height: 19px;
 font-weight: var(--n-title-font-weight);
 `,[u(`& +`,[_(`content`,{marginTop:`9px`})])]),_(`content`,{transition:`color .3s var(--n-bezier)`,fontSize:`var(--n-font-size)`})]),_(`icon`,{transition:`color .3s var(--n-bezier)`})]),M=Object.assign(Object.assign({},s.props),{title:String,showIcon:{type:Boolean,default:!0},type:{type:String,default:`default`},bordered:{type:Boolean,default:!0},closable:Boolean,onClose:Function,onAfterLeave:Function,onAfterHide:Function}),N=S({name:`Alert`,inheritAttrs:!1,props:M,slots:Object,setup(t){let{mergedClsPrefixRef:n,mergedBorderedRef:r,inlineThemeDisabled:a,mergedRtlRef:o}=v(t),c=s(`Alert`,`-alert`,j,A,t,n),l=h(`Alert`,o,n),u=p(()=>{let{common:{cubicBezierEaseInOut:n},self:r}=c.value,{fontSize:i,borderRadius:a,titleFontWeight:o,lineHeight:s,iconSize:l,iconMargin:u,iconMarginRtl:f,closeIconSize:p,closeBorderRadius:m,closeSize:h,closeMargin:g,closeMarginRtl:_,padding:v}=r,{type:y}=t,{left:b,right:x}=e(u);return{"--n-bezier":n,"--n-color":r[d(`color`,y)],"--n-close-icon-size":p,"--n-close-border-radius":m,"--n-close-color-hover":r[d(`closeColorHover`,y)],"--n-close-color-pressed":r[d(`closeColorPressed`,y)],"--n-close-icon-color":r[d(`closeIconColor`,y)],"--n-close-icon-color-hover":r[d(`closeIconColorHover`,y)],"--n-close-icon-color-pressed":r[d(`closeIconColorPressed`,y)],"--n-icon-color":r[d(`iconColor`,y)],"--n-border":r[d(`border`,y)],"--n-title-text-color":r[d(`titleTextColor`,y)],"--n-content-text-color":r[d(`contentTextColor`,y)],"--n-line-height":s,"--n-border-radius":a,"--n-font-size":i,"--n-title-font-weight":o,"--n-icon-size":l,"--n-icon-margin":u,"--n-icon-margin-rtl":f,"--n-close-size":h,"--n-close-margin":g,"--n-close-margin-rtl":_,"--n-padding":v,"--n-icon-margin-left":b,"--n-icon-margin-right":x}}),f=a?g(`alert`,p(()=>t.type[0]),u,t):void 0,m=i(!0),_=()=>{let{onAfterLeave:e,onAfterHide:n}=t;e&&e(),n&&n()};return{rtlEnabled:l,mergedClsPrefix:n,mergedBordered:r,visible:m,handleCloseClick:()=>{Promise.resolve(t.onClose?.call(t)).then(e=>{e!==!1&&(m.value=!1)})},handleAfterLeave:()=>{_()},mergedTheme:c,cssVars:a?void 0:u,themeClass:f?.themeClass,onRender:f?.onRender}},render(){var e;return(e=this.onRender)==null||e.call(this),x(b,{onAfterLeave:this.handleAfterLeave},{default:()=>{let{mergedClsPrefix:e,$slots:r}=this,i={class:[`${e}-alert`,this.themeClass,this.closable&&`${e}-alert--closable`,this.showIcon&&`${e}-alert--show-icon`,!this.title&&this.closable&&`${e}-alert--right-adjust`,this.rtlEnabled&&`${e}-alert--rtl`],style:this.cssVars,role:`alert`};return this.visible?x(`div`,Object.assign({},t(this.$attrs,i)),this.closable&&x(l,{clsPrefix:e,class:`${e}-alert__close`,onClick:this.handleCloseClick}),this.bordered&&x(`div`,{class:`${e}-alert__border`}),this.showIcon&&x(`div`,{class:`${e}-alert__icon`,"aria-hidden":`true`},m(r.icon,()=>[x(n,{clsPrefix:e},{default:()=>{switch(this.type){case`success`:return x(E,null);case`info`:return x(w,null);case`warning`:return x(T,null);case`error`:return x(C,null);default:return null}}})])),x(`div`,{class:[`${e}-alert-body`,this.mergedBordered&&`${e}-alert-body--bordered`]},y(r.header,t=>{let n=t||this.title;return n?x(`div`,{class:`${e}-alert-body__title`},n):null}),r.default&&x(`div`,{class:`${e}-alert-body__content`},r))):null}})}});export{N as t};