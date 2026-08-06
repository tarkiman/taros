import{$t as e,A as t,Bt as n,C as r,Dn as i,Gt as a,N as o,O as s,Qt as c,Tn as l,Xt as u,Yt as d,Zn as f,bt as p,dt as m,ft as h,kn as g,tn as _,vn as v,vt as y,w as b,y as x,zt as S}from"./auth-DhbqZPGu.js";import{a as C,i as w,n as T,r as E,t as D}from"./fade-in-height-expand.cssr-4030mLdI.js";import{t as O}from"./_common-DnEpalBx.js";function k(e){let{lineHeight:t,borderRadius:r,fontWeightStrong:i,baseColor:a,dividerColor:o,actionColor:s,textColor1:c,textColor2:l,closeColorHover:u,closeColorPressed:d,closeIconColor:f,closeIconColorHover:p,closeIconColorPressed:m,infoColor:h,successColor:g,warningColor:_,errorColor:v,fontSize:y}=e;return Object.assign(Object.assign({},O),{fontSize:y,lineHeight:t,titleFontWeight:i,borderRadius:r,border:`1px solid ${o}`,color:s,titleTextColor:c,iconColor:l,contentTextColor:l,closeBorderRadius:r,closeColorHover:u,closeColorPressed:d,closeIconColor:f,closeIconColorHover:p,closeIconColorPressed:m,borderInfo:`1px solid ${n(a,S(h,{alpha:.25}))}`,colorInfo:n(a,S(h,{alpha:.08})),titleTextColorInfo:c,iconColorInfo:h,contentTextColorInfo:l,closeColorHoverInfo:u,closeColorPressedInfo:d,closeIconColorInfo:f,closeIconColorHoverInfo:p,closeIconColorPressedInfo:m,borderSuccess:`1px solid ${n(a,S(g,{alpha:.25}))}`,colorSuccess:n(a,S(g,{alpha:.08})),titleTextColorSuccess:c,iconColorSuccess:g,contentTextColorSuccess:l,closeColorHoverSuccess:u,closeColorPressedSuccess:d,closeIconColorSuccess:f,closeIconColorHoverSuccess:p,closeIconColorPressedSuccess:m,borderWarning:`1px solid ${n(a,S(_,{alpha:.33}))}`,colorWarning:n(a,S(_,{alpha:.08})),titleTextColorWarning:c,iconColorWarning:_,contentTextColorWarning:l,closeColorHoverWarning:u,closeColorPressedWarning:d,closeIconColorWarning:f,closeIconColorHoverWarning:p,closeIconColorPressedWarning:m,borderError:`1px solid ${n(a,S(v,{alpha:.25}))}`,colorError:n(a,S(v,{alpha:.08})),titleTextColorError:c,iconColorError:v,contentTextColorError:l,closeColorHoverError:u,closeColorPressedError:d,closeIconColorError:f,closeIconColorHoverError:p,closeIconColorPressedError:m})}var A={name:`Alert`,common:x,self:k},j=u(`alert`,`
 line-height: var(--n-line-height);
 border-radius: var(--n-border-radius);
 position: relative;
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-color);
 text-align: start;
 word-break: break-word;
`,[c(`border`,`
 border-radius: inherit;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 transition: border-color .3s var(--n-bezier);
 border: var(--n-border);
 pointer-events: none;
 `),e(`closable`,[u(`alert-body`,[c(`title`,`
 padding-right: 24px;
 `)])]),c(`icon`,{color:`var(--n-icon-color)`}),u(`alert-body`,{padding:`var(--n-padding)`},[c(`title`,{color:`var(--n-title-text-color)`}),c(`content`,{color:`var(--n-content-text-color)`})]),D({originalTransition:`transform .3s var(--n-bezier)`,enterToProps:{transform:`scale(1)`},leaveToProps:{transform:`scale(0.9)`}}),c(`icon`,`
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
 `),c(`close`,`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 position: absolute;
 right: 0;
 top: 0;
 margin: var(--n-close-margin);
 `),e(`show-icon`,[u(`alert-body`,{paddingLeft:`calc(var(--n-icon-margin-left) + var(--n-icon-size) + var(--n-icon-margin-right))`})]),e(`right-adjust`,[u(`alert-body`,{paddingRight:`calc(var(--n-close-size) + var(--n-padding) + 2px)`})]),u(`alert-body`,`
 border-radius: var(--n-border-radius);
 transition: border-color .3s var(--n-bezier);
 `,[c(`title`,`
 transition: color .3s var(--n-bezier);
 font-size: 16px;
 line-height: 19px;
 font-weight: var(--n-title-font-weight);
 `,[d(`& +`,[c(`content`,{marginTop:`9px`})])]),c(`content`,{transition:`color .3s var(--n-bezier)`,fontSize:`var(--n-font-size)`})]),c(`icon`,{transition:`color .3s var(--n-bezier)`})]),M=Object.assign(Object.assign({},t.props),{title:String,showIcon:{type:Boolean,default:!0},type:{type:String,default:`default`},bordered:{type:Boolean,default:!0},closable:Boolean,onClose:Function,onAfterLeave:Function,onAfterHide:Function}),N=l({name:`Alert`,inheritAttrs:!1,props:M,slots:Object,setup(e){let{mergedClsPrefixRef:n,mergedBorderedRef:r,inlineThemeDisabled:i,mergedRtlRef:s}=h(e),c=t(`Alert`,`-alert`,j,A,e,n),l=o(`Alert`,s,n),u=v(()=>{let{common:{cubicBezierEaseInOut:t},self:n}=c.value,{fontSize:r,borderRadius:i,titleFontWeight:o,lineHeight:s,iconSize:l,iconMargin:u,iconMarginRtl:d,closeIconSize:f,closeBorderRadius:p,closeSize:m,closeMargin:h,closeMarginRtl:g,padding:v}=n,{type:y}=e,{left:b,right:x}=a(u);return{"--n-bezier":t,"--n-color":n[_(`color`,y)],"--n-close-icon-size":f,"--n-close-border-radius":p,"--n-close-color-hover":n[_(`closeColorHover`,y)],"--n-close-color-pressed":n[_(`closeColorPressed`,y)],"--n-close-icon-color":n[_(`closeIconColor`,y)],"--n-close-icon-color-hover":n[_(`closeIconColorHover`,y)],"--n-close-icon-color-pressed":n[_(`closeIconColorPressed`,y)],"--n-icon-color":n[_(`iconColor`,y)],"--n-border":n[_(`border`,y)],"--n-title-text-color":n[_(`titleTextColor`,y)],"--n-content-text-color":n[_(`contentTextColor`,y)],"--n-line-height":s,"--n-border-radius":i,"--n-font-size":r,"--n-title-font-weight":o,"--n-icon-size":l,"--n-icon-margin":u,"--n-icon-margin-rtl":d,"--n-close-size":m,"--n-close-margin":h,"--n-close-margin-rtl":g,"--n-padding":v,"--n-icon-margin-left":b,"--n-icon-margin-right":x}}),d=i?m(`alert`,v(()=>e.type[0]),u,e):void 0,p=f(!0),g=()=>{let{onAfterLeave:t,onAfterHide:n}=e;t&&t(),n&&n()};return{rtlEnabled:l,mergedClsPrefix:n,mergedBordered:r,visible:p,handleCloseClick:()=>{Promise.resolve(e.onClose?.call(e)).then(e=>{e!==!1&&(p.value=!1)})},handleAfterLeave:()=>{g()},mergedTheme:c,cssVars:i?void 0:u,themeClass:d?.themeClass,onRender:d?.onRender}},render(){var e;return(e=this.onRender)==null||e.call(this),i(r,{onAfterLeave:this.handleAfterLeave},{default:()=>{let{mergedClsPrefix:e,$slots:t}=this,n={class:[`${e}-alert`,this.themeClass,this.closable&&`${e}-alert--closable`,this.showIcon&&`${e}-alert--show-icon`,!this.title&&this.closable&&`${e}-alert--right-adjust`,this.rtlEnabled&&`${e}-alert--rtl`],style:this.cssVars,role:`alert`};return this.visible?i(`div`,Object.assign({},g(this.$attrs,n)),this.closable&&i(b,{clsPrefix:e,class:`${e}-alert__close`,onClick:this.handleCloseClick}),this.bordered&&i(`div`,{class:`${e}-alert__border`}),this.showIcon&&i(`div`,{class:`${e}-alert__icon`,"aria-hidden":`true`},y(t.icon,()=>[i(s,{clsPrefix:e},{default:()=>{switch(this.type){case`success`:return i(E,null);case`info`:return i(w,null);case`warning`:return i(T,null);case`error`:return i(C,null);default:return null}}})])),i(`div`,{class:[`${e}-alert-body`,this.mergedBordered&&`${e}-alert-body--bordered`]},p(t.header,t=>{let n=t||this.title;return n?i(`div`,{class:`${e}-alert-body__title`},n):null}),t.default&&i(`div`,{class:`${e}-alert-body__content`},t))):null}})}});export{N as t};