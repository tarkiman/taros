import{$t as e,A as t,Dn as n,Gt as r,Jt as i,N as a,Qt as o,Tn as s,Xt as c,Yt as l,bt as u,dt as d,ft as f,gt as p,h as m,nn as h,rn as g,tn as _,vn as v,w as y,xt as b,y as x}from"./auth-DhbqZPGu.js";import{t as S}from"./keysOf-BNt7p-WY.js";var C={paddingSmall:`12px 16px 12px`,paddingMedium:`19px 24px 20px`,paddingLarge:`23px 32px 24px`,paddingHuge:`27px 40px 28px`,titleFontSizeSmall:`16px`,titleFontSizeMedium:`18px`,titleFontSizeLarge:`18px`,titleFontSizeHuge:`18px`,closeIconSize:`18px`,closeSize:`22px`};function w(e){let{primaryColor:t,borderRadius:n,lineHeight:r,fontSize:i,cardColor:a,textColor2:o,textColor1:s,dividerColor:c,fontWeightStrong:l,closeIconColor:u,closeIconColorHover:d,closeIconColorPressed:f,closeColorHover:p,closeColorPressed:m,modalColor:h,boxShadow1:g,popoverColor:_,actionColor:v}=e;return Object.assign(Object.assign({},C),{lineHeight:r,color:a,colorModal:h,colorPopover:_,colorTarget:t,colorEmbedded:v,colorEmbeddedModal:v,colorEmbeddedPopover:v,textColor:o,titleTextColor:s,borderColor:c,actionColor:v,titleFontWeight:l,closeColorHover:p,closeColorPressed:m,closeBorderRadius:n,closeIconColor:u,closeIconColorHover:d,closeIconColorPressed:f,fontSizeSmall:i,fontSizeMedium:i,fontSizeLarge:i,fontSizeHuge:i,boxShadow:g,borderRadius:n})}var T={name:`Card`,common:x,self:w},E=c(`card-content`,`
 flex: 1;
 min-width: 0;
 box-sizing: border-box;
 padding: 0 var(--n-padding-left) var(--n-padding-bottom) var(--n-padding-left);
 font-size: var(--n-font-size);
`),D=l([c(`card`,`
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
 `,[i({background:`var(--n-color-modal)`}),e(`hoverable`,[l(`&:hover`,`box-shadow: var(--n-box-shadow);`)]),e(`content-segmented`,[l(`>`,[c(`card-content`,`
 padding-top: var(--n-padding-bottom);
 `),o(`content-scrollbar`,[l(`>`,[c(`scrollbar-container`,[l(`>`,[c(`card-content`,`
 padding-top: var(--n-padding-bottom);
 `)])])])])])]),e(`content-soft-segmented`,[l(`>`,[c(`card-content`,`
 margin: 0 var(--n-padding-left);
 padding: var(--n-padding-bottom) 0;
 `),o(`content-scrollbar`,[l(`>`,[c(`scrollbar-container`,[l(`>`,[c(`card-content`,`
 margin: 0 var(--n-padding-left);
 padding: var(--n-padding-bottom) 0;
 `)])])])])])]),e(`footer-segmented`,[l(`>`,[o(`footer`,`
 padding-top: var(--n-padding-bottom);
 `)])]),e(`footer-soft-segmented`,[l(`>`,[o(`footer`,`
 padding: var(--n-padding-bottom) 0;
 margin: 0 var(--n-padding-left);
 `)])]),l(`>`,[c(`card-header`,`
 box-sizing: border-box;
 display: flex;
 align-items: center;
 font-size: var(--n-title-font-size);
 padding:
 var(--n-padding-top)
 var(--n-padding-left)
 var(--n-padding-bottom)
 var(--n-padding-left);
 `,[o(`main`,`
 font-weight: var(--n-title-font-weight);
 transition: color .3s var(--n-bezier);
 flex: 1;
 min-width: 0;
 color: var(--n-title-text-color);
 `),o(`extra`,`
 display: flex;
 align-items: center;
 font-size: var(--n-font-size);
 font-weight: 400;
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `),o(`close`,`
 margin: 0 0 0 8px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)]),o(`action`,`
 box-sizing: border-box;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 background-clip: padding-box;
 background-color: var(--n-action-color);
 `),E,c(`card-content`,[l(`&:first-child`,`
 padding-top: var(--n-padding-bottom);
 `)]),o(`content-scrollbar`,`
 display: flex;
 flex-direction: column;
 `,[l(`>`,[c(`scrollbar-container`,[l(`>`,[E])])]),l(`&:first-child >`,[c(`scrollbar-container`,[l(`>`,[c(`card-content`,`
 padding-top: var(--n-padding-bottom);
 `)])])])]),o(`footer`,`
 box-sizing: border-box;
 padding: 0 var(--n-padding-left) var(--n-padding-bottom) var(--n-padding-left);
 font-size: var(--n-font-size);
 `,[l(`&:first-child`,`
 padding-top: var(--n-padding-bottom);
 `)]),o(`action`,`
 background-color: var(--n-action-color);
 padding: var(--n-padding-bottom) var(--n-padding-left);
 border-bottom-left-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `)]),c(`card-cover`,`
 overflow: hidden;
 width: 100%;
 border-radius: var(--n-border-radius) var(--n-border-radius) 0 0;
 `,[l(`img`,`
 display: block;
 width: 100%;
 `)]),e(`bordered`,`
 border: 1px solid var(--n-border-color);
 `,[l(`&:target`,`border-color: var(--n-color-target);`)]),e(`action-segmented`,[l(`>`,[o(`action`,[l(`&:not(:first-child)`,`
 border-top: 1px solid var(--n-border-color);
 `)])])]),e(`content-segmented, content-soft-segmented`,[l(`>`,[c(`card-content`,`
 transition: border-color 0.3s var(--n-bezier);
 `,[l(`&:not(:first-child)`,`
 border-top: 1px solid var(--n-border-color);
 `)]),o(`content-scrollbar`,`
 transition: border-color 0.3s var(--n-bezier);
 `,[l(`&:not(:first-child)`,`
 border-top: 1px solid var(--n-border-color);
 `)])])]),e(`footer-segmented, footer-soft-segmented`,[l(`>`,[o(`footer`,`
 transition: border-color 0.3s var(--n-bezier);
 `,[l(`&:not(:first-child)`,`
 border-top: 1px solid var(--n-border-color);
 `)])])]),e(`embedded`,`
 background-color: var(--n-color-embedded);
 `)]),h(c(`card`,`
 background: var(--n-color-modal);
 `,[e(`embedded`,`
 background-color: var(--n-color-embedded-modal);
 `)])),g(c(`card`,`
 background: var(--n-color-popover);
 `,[e(`embedded`,`
 background-color: var(--n-color-embedded-popover);
 `)]))]),O={title:[String,Function],contentClass:String,contentStyle:[Object,String],contentScrollable:Boolean,headerClass:String,headerStyle:[Object,String],headerExtraClass:String,headerExtraStyle:[Object,String],footerClass:String,footerStyle:[Object,String],embedded:Boolean,segmented:{type:[Boolean,Object],default:!1},size:String,bordered:{type:Boolean,default:!0},closable:Boolean,hoverable:Boolean,role:String,onClose:[Function,Array],tag:{type:String,default:`div`},cover:Function,content:[String,Function],footer:Function,action:Function,headerExtra:Function,closeFocusable:Boolean},k=S(O),A=Object.assign(Object.assign({},t.props),O),j=s({name:`Card`,props:A,slots:Object,setup(e){let n=()=>{let{onClose:t}=e;t&&b(t)},{inlineThemeDisabled:i,mergedClsPrefixRef:o,mergedRtlRef:s,mergedComponentPropsRef:c}=f(e),l=t(`Card`,`-card`,D,T,e,o),u=a(`Card`,s,o),p=v(()=>e.size||c?.value?.Card?.size||`medium`),m=v(()=>{let e=p.value,{self:{color:t,colorModal:n,colorTarget:i,textColor:a,titleTextColor:o,titleFontWeight:s,borderColor:c,actionColor:u,borderRadius:d,lineHeight:f,closeIconColor:m,closeIconColorHover:h,closeIconColorPressed:g,closeColorHover:v,closeColorPressed:y,closeBorderRadius:b,closeIconSize:x,closeSize:S,boxShadow:C,colorPopover:w,colorEmbedded:T,colorEmbeddedModal:E,colorEmbeddedPopover:D,[_(`padding`,e)]:O,[_(`fontSize`,e)]:k,[_(`titleFontSize`,e)]:A},common:{cubicBezierEaseInOut:j}}=l.value,{top:M,left:N,bottom:P}=r(O);return{"--n-bezier":j,"--n-border-radius":d,"--n-color":t,"--n-color-modal":n,"--n-color-popover":w,"--n-color-embedded":T,"--n-color-embedded-modal":E,"--n-color-embedded-popover":D,"--n-color-target":i,"--n-text-color":a,"--n-line-height":f,"--n-action-color":u,"--n-title-text-color":o,"--n-title-font-weight":s,"--n-close-icon-color":m,"--n-close-icon-color-hover":h,"--n-close-icon-color-pressed":g,"--n-close-color-hover":v,"--n-close-color-pressed":y,"--n-border-color":c,"--n-box-shadow":C,"--n-padding-top":M,"--n-padding-bottom":P,"--n-padding-left":N,"--n-font-size":k,"--n-title-font-size":A,"--n-close-size":S,"--n-close-icon-size":x,"--n-close-border-radius":b}}),h=i?d(`card`,v(()=>p.value[0]),m,e):void 0;return{rtlEnabled:u,mergedClsPrefix:o,mergedTheme:l,handleCloseClick:n,cssVars:i?void 0:m,themeClass:h?.themeClass,onRender:h?.onRender}},render(){let{segmented:e,bordered:t,hoverable:r,mergedClsPrefix:i,rtlEnabled:a,onRender:o,embedded:s,tag:c,$slots:l}=this;return o?.(),n(c,{class:[`${i}-card`,this.themeClass,s&&`${i}-card--embedded`,{[`${i}-card--rtl`]:a,[`${i}-card--content-scrollable`]:this.contentScrollable,[`${i}-card--content${typeof e!=`boolean`&&e.content===`soft`?`-soft`:``}-segmented`]:e===!0||e!==!1&&e.content,[`${i}-card--footer${typeof e!=`boolean`&&e.footer===`soft`?`-soft`:``}-segmented`]:e===!0||e!==!1&&e.footer,[`${i}-card--action-segmented`]:e===!0||e!==!1&&e.action,[`${i}-card--bordered`]:t,[`${i}-card--hoverable`]:r}],style:this.cssVars,role:this.role},u(l.cover,e=>{let t=this.cover?p([this.cover()]):e;return t&&n(`div`,{class:`${i}-card-cover`,role:`none`},t)}),u(l.header,e=>{let{title:t}=this,r=t?p(typeof t==`function`?[t()]:[t]):e;return r||this.closable?n(`div`,{class:[`${i}-card-header`,this.headerClass],style:this.headerStyle,role:`heading`},n(`div`,{class:`${i}-card-header__main`,role:`heading`},r),u(l[`header-extra`],e=>{let t=this.headerExtra?p([this.headerExtra()]):e;return t&&n(`div`,{class:[`${i}-card-header__extra`,this.headerExtraClass],style:this.headerExtraStyle},t)}),this.closable&&n(y,{clsPrefix:i,class:`${i}-card-header__close`,onClick:this.handleCloseClick,focusable:this.closeFocusable,absolute:!0})):null}),u(l.default,e=>{let{content:t}=this,r=t?p(typeof t==`function`?[t()]:[t]):e;return r?this.contentScrollable?n(m,{class:`${i}-card__content-scrollbar`,contentClass:[`${i}-card-content`,this.contentClass],contentStyle:this.contentStyle},r):n(`div`,{class:[`${i}-card-content`,this.contentClass],style:this.contentStyle,role:`none`},r):null}),u(l.footer,e=>{let t=this.footer?p([this.footer()]):e;return t&&n(`div`,{class:[`${i}-card__footer`,this.footerClass],style:this.footerStyle,role:`none`},t)}),u(l.action,e=>{let t=this.action?p([this.action()]):e;return t&&n(`div`,{class:`${i}-card__action`,role:`none`},t)}))}});export{w as a,T as i,k as n,O as r,j as t};