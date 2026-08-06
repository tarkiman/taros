import{A as e,E as t,Et as n,Fn as r,Gt as i,I as a,Kt as o,Nn as s,O as c,P as l,T as u,Zt as d,_t as f,an as p,g as m,in as h,j as g,jn as _,k as v,nn as y,rr as b,sn as x,tn as S,vt as C,wn as w,wt as T,x as E,z as D}from"./auth-DkWBYjip.js";import{t as O}from"./_common-DnEpalBx.js";function k(e){let{lineHeight:t,borderRadius:n,fontWeightStrong:r,baseColor:a,dividerColor:s,actionColor:c,textColor1:l,textColor2:u,closeColorHover:d,closeColorPressed:f,closeIconColor:p,closeIconColorHover:m,closeIconColorPressed:h,infoColor:g,successColor:_,warningColor:v,errorColor:y,fontSize:b}=e;return Object.assign(Object.assign({},O),{fontSize:b,lineHeight:t,titleFontWeight:r,borderRadius:n,border:`1px solid ${s}`,color:c,titleTextColor:l,iconColor:u,contentTextColor:u,closeBorderRadius:n,closeColorHover:d,closeColorPressed:f,closeIconColor:p,closeIconColorHover:m,closeIconColorPressed:h,borderInfo:`1px solid ${o(a,i(g,{alpha:.25}))}`,colorInfo:o(a,i(g,{alpha:.08})),titleTextColorInfo:l,iconColorInfo:g,contentTextColorInfo:u,closeColorHoverInfo:d,closeColorPressedInfo:f,closeIconColorInfo:p,closeIconColorHoverInfo:m,closeIconColorPressedInfo:h,borderSuccess:`1px solid ${o(a,i(_,{alpha:.25}))}`,colorSuccess:o(a,i(_,{alpha:.08})),titleTextColorSuccess:l,iconColorSuccess:_,contentTextColorSuccess:u,closeColorHoverSuccess:d,closeColorPressedSuccess:f,closeIconColorSuccess:p,closeIconColorHoverSuccess:m,closeIconColorPressedSuccess:h,borderWarning:`1px solid ${o(a,i(v,{alpha:.33}))}`,colorWarning:o(a,i(v,{alpha:.08})),titleTextColorWarning:l,iconColorWarning:v,contentTextColorWarning:u,closeColorHoverWarning:d,closeColorPressedWarning:f,closeIconColorWarning:p,closeIconColorHoverWarning:m,closeIconColorPressedWarning:h,borderError:`1px solid ${o(a,i(y,{alpha:.25}))}`,colorError:o(a,i(y,{alpha:.08})),titleTextColorError:l,iconColorError:y,contentTextColorError:u,closeColorHoverError:d,closeColorPressedError:f,closeIconColorError:p,closeIconColorHoverError:m,closeIconColorPressedError:h})}var A={name:`Alert`,common:E,self:k},j=y(`alert`,`
 line-height: var(--n-line-height);
 border-radius: var(--n-border-radius);
 position: relative;
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-color);
 text-align: start;
 word-break: break-word;
`,[h(`border`,`
 border-radius: inherit;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 transition: border-color .3s var(--n-bezier);
 border: var(--n-border);
 pointer-events: none;
 `),p(`closable`,[y(`alert-body`,[h(`title`,`
 padding-right: 24px;
 `)])]),h(`icon`,{color:`var(--n-icon-color)`}),y(`alert-body`,{padding:`var(--n-padding)`},[h(`title`,{color:`var(--n-title-text-color)`}),h(`content`,{color:`var(--n-content-text-color)`})]),m({originalTransition:`transform .3s var(--n-bezier)`,enterToProps:{transform:`scale(1)`},leaveToProps:{transform:`scale(0.9)`}}),h(`icon`,`
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
 `),h(`close`,`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 position: absolute;
 right: 0;
 top: 0;
 margin: var(--n-close-margin);
 `),p(`show-icon`,[y(`alert-body`,{paddingLeft:`calc(var(--n-icon-margin-left) + var(--n-icon-size) + var(--n-icon-margin-right))`})]),p(`right-adjust`,[y(`alert-body`,{paddingRight:`calc(var(--n-close-size) + var(--n-padding) + 2px)`})]),y(`alert-body`,`
 border-radius: var(--n-border-radius);
 transition: border-color .3s var(--n-bezier);
 `,[h(`title`,`
 transition: color .3s var(--n-bezier);
 font-size: 16px;
 line-height: 19px;
 font-weight: var(--n-title-font-weight);
 `,[S(`& +`,[h(`content`,{marginTop:`9px`})])]),h(`content`,{transition:`color .3s var(--n-bezier)`,fontSize:`var(--n-font-size)`})]),h(`icon`,{transition:`color .3s var(--n-bezier)`})]),M=Object.assign(Object.assign({},a.props),{title:String,showIcon:{type:Boolean,default:!0},type:{type:String,default:`default`},bordered:{type:Boolean,default:!0},closable:Boolean,onClose:Function,onAfterLeave:Function,onAfterHide:Function}),N=_({name:`Alert`,inheritAttrs:!1,props:M,slots:Object,setup(e){let{mergedClsPrefixRef:t,mergedBorderedRef:n,inlineThemeDisabled:r,mergedRtlRef:i}=C(e),o=a(`Alert`,`-alert`,j,A,e,t),s=D(`Alert`,i,t),c=w(()=>{let{common:{cubicBezierEaseInOut:t},self:n}=o.value,{fontSize:r,borderRadius:i,titleFontWeight:a,lineHeight:s,iconSize:c,iconMargin:l,iconMarginRtl:u,closeIconSize:f,closeBorderRadius:p,closeSize:m,closeMargin:h,closeMarginRtl:g,padding:_}=n,{type:v}=e,{left:y,right:b}=d(l);return{"--n-bezier":t,"--n-color":n[x(`color`,v)],"--n-close-icon-size":f,"--n-close-border-radius":p,"--n-close-color-hover":n[x(`closeColorHover`,v)],"--n-close-color-pressed":n[x(`closeColorPressed`,v)],"--n-close-icon-color":n[x(`closeIconColor`,v)],"--n-close-icon-color-hover":n[x(`closeIconColorHover`,v)],"--n-close-icon-color-pressed":n[x(`closeIconColorPressed`,v)],"--n-icon-color":n[x(`iconColor`,v)],"--n-border":n[x(`border`,v)],"--n-title-text-color":n[x(`titleTextColor`,v)],"--n-content-text-color":n[x(`contentTextColor`,v)],"--n-line-height":s,"--n-border-radius":i,"--n-font-size":r,"--n-title-font-weight":a,"--n-icon-size":c,"--n-icon-margin":l,"--n-icon-margin-rtl":u,"--n-close-size":m,"--n-close-margin":h,"--n-close-margin-rtl":g,"--n-padding":_,"--n-icon-margin-left":y,"--n-icon-margin-right":b}}),l=r?f(`alert`,w(()=>e.type[0]),c,e):void 0,u=b(!0),p=()=>{let{onAfterLeave:t,onAfterHide:n}=e;t&&t(),n&&n()};return{rtlEnabled:s,mergedClsPrefix:t,mergedBordered:n,visible:u,handleCloseClick:()=>{Promise.resolve(e.onClose?.call(e)).then(e=>{e!==!1&&(u.value=!1)})},handleAfterLeave:()=>{p()},mergedTheme:o,cssVars:r?void 0:c,themeClass:l?.themeClass,onRender:l?.onRender}},render(){var i;return(i=this.onRender)==null||i.call(this),s(u,{onAfterLeave:this.handleAfterLeave},{default:()=>{let{mergedClsPrefix:i,$slots:a}=this,o={class:[`${i}-alert`,this.themeClass,this.closable&&`${i}-alert--closable`,this.showIcon&&`${i}-alert--show-icon`,!this.title&&this.closable&&`${i}-alert--right-adjust`,this.rtlEnabled&&`${i}-alert--rtl`],style:this.cssVars,role:`alert`};return this.visible?s(`div`,Object.assign({},r(this.$attrs,o)),this.closable&&s(t,{clsPrefix:i,class:`${i}-alert__close`,onClick:this.handleCloseClick}),this.bordered&&s(`div`,{class:`${i}-alert__border`}),this.showIcon&&s(`div`,{class:`${i}-alert__icon`,"aria-hidden":`true`},T(a.icon,()=>[s(l,{clsPrefix:i},{default:()=>{switch(this.type){case`success`:return s(v,null);case`info`:return s(e,null);case`warning`:return s(c,null);case`error`:return s(g,null);default:return null}}})])),s(`div`,{class:[`${i}-alert-body`,this.mergedBordered&&`${i}-alert-body--bordered`]},n(a.header,e=>{let t=e||this.title;return t?s(`div`,{class:`${i}-alert-body__title`},t):null}),a.default&&s(`div`,{class:`${i}-alert-body__content`},a))):null}})}});export{N as t};