import{An as e,At as t,B as n,Ct as r,D as i,F as a,G as o,H as s,I as c,L as l,Ln as u,M as d,Mt as f,P as p,Qt as m,S as h,Vn as g,Zt as _,cn as v,dn as y,j as b,pn as x,rn as S,sn as C,un as w,ur as T,wt as E,zn as D}from"./auth-DAwZXSzT.js";import{t as O}from"./_common-DnEpalBx.js";function k(e){let{lineHeight:t,borderRadius:n,fontWeightStrong:r,baseColor:i,dividerColor:a,actionColor:o,textColor1:s,textColor2:c,closeColorHover:l,closeColorPressed:u,closeIconColor:d,closeIconColorHover:f,closeIconColorPressed:p,infoColor:h,successColor:g,warningColor:v,errorColor:y,fontSize:b}=e;return Object.assign(Object.assign({},O),{fontSize:b,lineHeight:t,titleFontWeight:r,borderRadius:n,border:`1px solid ${a}`,color:o,titleTextColor:s,iconColor:c,contentTextColor:c,closeBorderRadius:n,closeColorHover:l,closeColorPressed:u,closeIconColor:d,closeIconColorHover:f,closeIconColorPressed:p,borderInfo:`1px solid ${m(i,_(h,{alpha:.25}))}`,colorInfo:m(i,_(h,{alpha:.08})),titleTextColorInfo:s,iconColorInfo:h,contentTextColorInfo:c,closeColorHoverInfo:l,closeColorPressedInfo:u,closeIconColorInfo:d,closeIconColorHoverInfo:f,closeIconColorPressedInfo:p,borderSuccess:`1px solid ${m(i,_(g,{alpha:.25}))}`,colorSuccess:m(i,_(g,{alpha:.08})),titleTextColorSuccess:s,iconColorSuccess:g,contentTextColorSuccess:c,closeColorHoverSuccess:l,closeColorPressedSuccess:u,closeIconColorSuccess:d,closeIconColorHoverSuccess:f,closeIconColorPressedSuccess:p,borderWarning:`1px solid ${m(i,_(v,{alpha:.33}))}`,colorWarning:m(i,_(v,{alpha:.08})),titleTextColorWarning:s,iconColorWarning:v,contentTextColorWarning:c,closeColorHoverWarning:l,closeColorPressedWarning:u,closeIconColorWarning:d,closeIconColorHoverWarning:f,closeIconColorPressedWarning:p,borderError:`1px solid ${m(i,_(y,{alpha:.25}))}`,colorError:m(i,_(y,{alpha:.08})),titleTextColorError:s,iconColorError:y,contentTextColorError:c,closeColorHoverError:l,closeColorPressedError:u,closeIconColorError:d,closeIconColorHoverError:f,closeIconColorPressedError:p})}var A={name:`Alert`,common:i,self:k},j=v(`alert`,`
 line-height: var(--n-line-height);
 border-radius: var(--n-border-radius);
 position: relative;
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-color);
 text-align: start;
 word-break: break-word;
`,[w(`border`,`
 border-radius: inherit;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 transition: border-color .3s var(--n-bezier);
 border: var(--n-border);
 pointer-events: none;
 `),y(`closable`,[v(`alert-body`,[w(`title`,`
 padding-right: 24px;
 `)])]),w(`icon`,{color:`var(--n-icon-color)`}),v(`alert-body`,{padding:`var(--n-padding)`},[w(`title`,{color:`var(--n-title-text-color)`}),w(`content`,{color:`var(--n-content-text-color)`})]),h({originalTransition:`transform .3s var(--n-bezier)`,enterToProps:{transform:`scale(1)`},leaveToProps:{transform:`scale(0.9)`}}),w(`icon`,`
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
 `),w(`close`,`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 position: absolute;
 right: 0;
 top: 0;
 margin: var(--n-close-margin);
 `),y(`show-icon`,[v(`alert-body`,{paddingLeft:`calc(var(--n-icon-margin-left) + var(--n-icon-size) + var(--n-icon-margin-right))`})]),y(`right-adjust`,[v(`alert-body`,{paddingRight:`calc(var(--n-close-size) + var(--n-padding) + 2px)`})]),v(`alert-body`,`
 border-radius: var(--n-border-radius);
 transition: border-color .3s var(--n-bezier);
 `,[w(`title`,`
 transition: color .3s var(--n-bezier);
 font-size: 16px;
 line-height: 19px;
 font-weight: var(--n-title-font-weight);
 `,[C(`& +`,[w(`content`,{marginTop:`9px`})])]),w(`content`,{transition:`color .3s var(--n-bezier)`,fontSize:`var(--n-font-size)`})]),w(`icon`,{transition:`color .3s var(--n-bezier)`})]),M=Object.assign(Object.assign({},s.props),{title:String,showIcon:{type:Boolean,default:!0},type:{type:String,default:`default`},bordered:{type:Boolean,default:!0},closable:Boolean,onClose:Function,onAfterLeave:Function,onAfterHide:Function}),N=u({name:`Alert`,inheritAttrs:!1,props:M,slots:Object,setup(t){let{mergedClsPrefixRef:n,mergedBorderedRef:i,inlineThemeDisabled:a,mergedRtlRef:c}=E(t),l=s(`Alert`,`-alert`,j,A,t,n),u=o(`Alert`,c,n),d=e(()=>{let{common:{cubicBezierEaseInOut:e},self:n}=l.value,{fontSize:r,borderRadius:i,titleFontWeight:a,lineHeight:o,iconSize:s,iconMargin:c,iconMarginRtl:u,closeIconSize:d,closeBorderRadius:f,closeSize:p,closeMargin:m,closeMarginRtl:h,padding:g}=n,{type:_}=t,{left:v,right:y}=S(c);return{"--n-bezier":e,"--n-color":n[x(`color`,_)],"--n-close-icon-size":d,"--n-close-border-radius":f,"--n-close-color-hover":n[x(`closeColorHover`,_)],"--n-close-color-pressed":n[x(`closeColorPressed`,_)],"--n-close-icon-color":n[x(`closeIconColor`,_)],"--n-close-icon-color-hover":n[x(`closeIconColorHover`,_)],"--n-close-icon-color-pressed":n[x(`closeIconColorPressed`,_)],"--n-icon-color":n[x(`iconColor`,_)],"--n-border":n[x(`border`,_)],"--n-title-text-color":n[x(`titleTextColor`,_)],"--n-content-text-color":n[x(`contentTextColor`,_)],"--n-line-height":o,"--n-border-radius":i,"--n-font-size":r,"--n-title-font-weight":a,"--n-icon-size":s,"--n-icon-margin":c,"--n-icon-margin-rtl":u,"--n-close-size":p,"--n-close-margin":m,"--n-close-margin-rtl":h,"--n-padding":g,"--n-icon-margin-left":v,"--n-icon-margin-right":y}}),f=a?r(`alert`,e(()=>t.type[0]),d,t):void 0,p=T(!0),m=()=>{let{onAfterLeave:e,onAfterHide:n}=t;e&&e(),n&&n()};return{rtlEnabled:u,mergedClsPrefix:n,mergedBordered:i,visible:p,handleCloseClick:()=>{Promise.resolve(t.onClose?.call(t)).then(e=>{e!==!1&&(p.value=!1)})},handleAfterLeave:()=>{m()},mergedTheme:l,cssVars:a?void 0:d,themeClass:f?.themeClass,onRender:f?.onRender}},render(){var e;return(e=this.onRender)==null||e.call(this),D(b,{onAfterLeave:this.handleAfterLeave},{default:()=>{let{mergedClsPrefix:e,$slots:r}=this,i={class:[`${e}-alert`,this.themeClass,this.closable&&`${e}-alert--closable`,this.showIcon&&`${e}-alert--show-icon`,!this.title&&this.closable&&`${e}-alert--right-adjust`,this.rtlEnabled&&`${e}-alert--rtl`],style:this.cssVars,role:`alert`};return this.visible?D(`div`,Object.assign({},g(this.$attrs,i)),this.closable&&D(d,{clsPrefix:e,class:`${e}-alert__close`,onClick:this.handleCloseClick}),this.bordered&&D(`div`,{class:`${e}-alert__border`}),this.showIcon&&D(`div`,{class:`${e}-alert__icon`,"aria-hidden":`true`},t(r.icon,()=>[D(n,{clsPrefix:e},{default:()=>{switch(this.type){case`success`:return D(a,null);case`info`:return D(c,null);case`warning`:return D(p,null);case`error`:return D(l,null);default:return null}}})])),D(`div`,{class:[`${e}-alert-body`,this.mergedBordered&&`${e}-alert-body--bordered`]},f(r.header,t=>{let n=t||this.title;return n?D(`div`,{class:`${e}-alert-body__title`},n):null}),r.default&&D(`div`,{class:`${e}-alert-body__content`},r))):null}})}});export{N as t};