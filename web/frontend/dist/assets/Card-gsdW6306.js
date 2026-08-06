import{$t as e,En as t,Kt as n,On as r,P as i,St as a,T as o,Xt as s,Yt as c,Zt as l,_t as u,b as d,en as f,ft as p,g as m,in as h,j as g,nn as _,pt as v,rn as y,xt as b,yn as x}from"./auth-CSROUTah.js";import{t as S}from"./keysOf-BNt7p-WY.js";var C={paddingSmall:`12px 16px 12px`,paddingMedium:`19px 24px 20px`,paddingLarge:`23px 32px 24px`,paddingHuge:`27px 40px 28px`,titleFontSizeSmall:`16px`,titleFontSizeMedium:`18px`,titleFontSizeLarge:`18px`,titleFontSizeHuge:`18px`,closeIconSize:`18px`,closeSize:`22px`};function w(e){let{primaryColor:t,borderRadius:n,lineHeight:r,fontSize:i,cardColor:a,textColor2:o,textColor1:s,dividerColor:c,fontWeightStrong:l,closeIconColor:u,closeIconColorHover:d,closeIconColorPressed:f,closeColorHover:p,closeColorPressed:m,modalColor:h,boxShadow1:g,popoverColor:_,actionColor:v}=e;return Object.assign(Object.assign({},C),{lineHeight:r,color:a,colorModal:h,colorPopover:_,colorTarget:t,colorEmbedded:v,colorEmbeddedModal:v,colorEmbeddedPopover:v,textColor:o,titleTextColor:s,borderColor:c,actionColor:v,titleFontWeight:l,closeColorHover:p,closeColorPressed:m,closeBorderRadius:n,closeIconColor:u,closeIconColorHover:d,closeIconColorPressed:f,fontSizeSmall:i,fontSizeMedium:i,fontSizeLarge:i,fontSizeHuge:i,boxShadow:g,borderRadius:n})}var T={name:`Card`,common:d,self:w},E=l(`card-content`,`
 flex: 1;
 min-width: 0;
 box-sizing: border-box;
 padding: 0 var(--n-padding-left) var(--n-padding-bottom) var(--n-padding-left);
 font-size: var(--n-font-size);
`),D=s([l(`card`,`
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
 `,[c({background:`var(--n-color-modal)`}),f(`hoverable`,[s(`&:hover`,`box-shadow: var(--n-box-shadow);`)]),f(`content-segmented`,[s(`>`,[l(`card-content`,`
 padding-top: var(--n-padding-bottom);
 `),e(`content-scrollbar`,[s(`>`,[l(`scrollbar-container`,[s(`>`,[l(`card-content`,`
 padding-top: var(--n-padding-bottom);
 `)])])])])])]),f(`content-soft-segmented`,[s(`>`,[l(`card-content`,`
 margin: 0 var(--n-padding-left);
 padding: var(--n-padding-bottom) 0;
 `),e(`content-scrollbar`,[s(`>`,[l(`scrollbar-container`,[s(`>`,[l(`card-content`,`
 margin: 0 var(--n-padding-left);
 padding: var(--n-padding-bottom) 0;
 `)])])])])])]),f(`footer-segmented`,[s(`>`,[e(`footer`,`
 padding-top: var(--n-padding-bottom);
 `)])]),f(`footer-soft-segmented`,[s(`>`,[e(`footer`,`
 padding: var(--n-padding-bottom) 0;
 margin: 0 var(--n-padding-left);
 `)])]),s(`>`,[l(`card-header`,`
 box-sizing: border-box;
 display: flex;
 align-items: center;
 font-size: var(--n-title-font-size);
 padding:
 var(--n-padding-top)
 var(--n-padding-left)
 var(--n-padding-bottom)
 var(--n-padding-left);
 `,[e(`main`,`
 font-weight: var(--n-title-font-weight);
 transition: color .3s var(--n-bezier);
 flex: 1;
 min-width: 0;
 color: var(--n-title-text-color);
 `),e(`extra`,`
 display: flex;
 align-items: center;
 font-size: var(--n-font-size);
 font-weight: 400;
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `),e(`close`,`
 margin: 0 0 0 8px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)]),e(`action`,`
 box-sizing: border-box;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 background-clip: padding-box;
 background-color: var(--n-action-color);
 `),E,l(`card-content`,[s(`&:first-child`,`
 padding-top: var(--n-padding-bottom);
 `)]),e(`content-scrollbar`,`
 display: flex;
 flex-direction: column;
 `,[s(`>`,[l(`scrollbar-container`,[s(`>`,[E])])]),s(`&:first-child >`,[l(`scrollbar-container`,[s(`>`,[l(`card-content`,`
 padding-top: var(--n-padding-bottom);
 `)])])])]),e(`footer`,`
 box-sizing: border-box;
 padding: 0 var(--n-padding-left) var(--n-padding-bottom) var(--n-padding-left);
 font-size: var(--n-font-size);
 `,[s(`&:first-child`,`
 padding-top: var(--n-padding-bottom);
 `)]),e(`action`,`
 background-color: var(--n-action-color);
 padding: var(--n-padding-bottom) var(--n-padding-left);
 border-bottom-left-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `)]),l(`card-cover`,`
 overflow: hidden;
 width: 100%;
 border-radius: var(--n-border-radius) var(--n-border-radius) 0 0;
 `,[s(`img`,`
 display: block;
 width: 100%;
 `)]),f(`bordered`,`
 border: 1px solid var(--n-border-color);
 `,[s(`&:target`,`border-color: var(--n-color-target);`)]),f(`action-segmented`,[s(`>`,[e(`action`,[s(`&:not(:first-child)`,`
 border-top: 1px solid var(--n-border-color);
 `)])])]),f(`content-segmented, content-soft-segmented`,[s(`>`,[l(`card-content`,`
 transition: border-color 0.3s var(--n-bezier);
 `,[s(`&:not(:first-child)`,`
 border-top: 1px solid var(--n-border-color);
 `)]),e(`content-scrollbar`,`
 transition: border-color 0.3s var(--n-bezier);
 `,[s(`&:not(:first-child)`,`
 border-top: 1px solid var(--n-border-color);
 `)])])]),f(`footer-segmented, footer-soft-segmented`,[s(`>`,[e(`footer`,`
 transition: border-color 0.3s var(--n-bezier);
 `,[s(`&:not(:first-child)`,`
 border-top: 1px solid var(--n-border-color);
 `)])])]),f(`embedded`,`
 background-color: var(--n-color-embedded);
 `)]),y(l(`card`,`
 background: var(--n-color-modal);
 `,[f(`embedded`,`
 background-color: var(--n-color-embedded-modal);
 `)])),h(l(`card`,`
 background: var(--n-color-popover);
 `,[f(`embedded`,`
 background-color: var(--n-color-embedded-popover);
 `)]))]),O={title:[String,Function],contentClass:String,contentStyle:[Object,String],contentScrollable:Boolean,headerClass:String,headerStyle:[Object,String],headerExtraClass:String,headerExtraStyle:[Object,String],footerClass:String,footerStyle:[Object,String],embedded:Boolean,segmented:{type:[Boolean,Object],default:!1},size:String,bordered:{type:Boolean,default:!0},closable:Boolean,hoverable:Boolean,role:String,onClose:[Function,Array],tag:{type:String,default:`div`},cover:Function,content:[String,Function],footer:Function,action:Function,headerExtra:Function,closeFocusable:Boolean},k=S(O),A=Object.assign(Object.assign({},g.props),O),j=t({name:`Card`,props:A,slots:Object,setup(e){let t=()=>{let{onClose:t}=e;t&&a(t)},{inlineThemeDisabled:r,mergedClsPrefixRef:o,mergedRtlRef:s,mergedComponentPropsRef:c}=v(e),l=g(`Card`,`-card`,D,T,e,o),u=i(`Card`,s,o),d=x(()=>e.size||c?.value?.Card?.size||`medium`),f=x(()=>{let e=d.value,{self:{color:t,colorModal:r,colorTarget:i,textColor:a,titleTextColor:o,titleFontWeight:s,borderColor:c,actionColor:u,borderRadius:f,lineHeight:p,closeIconColor:m,closeIconColorHover:h,closeIconColorPressed:g,closeColorHover:v,closeColorPressed:y,closeBorderRadius:b,closeIconSize:x,closeSize:S,boxShadow:C,colorPopover:w,colorEmbedded:T,colorEmbeddedModal:E,colorEmbeddedPopover:D,[_(`padding`,e)]:O,[_(`fontSize`,e)]:k,[_(`titleFontSize`,e)]:A},common:{cubicBezierEaseInOut:j}}=l.value,{top:M,left:N,bottom:P}=n(O);return{"--n-bezier":j,"--n-border-radius":f,"--n-color":t,"--n-color-modal":r,"--n-color-popover":w,"--n-color-embedded":T,"--n-color-embedded-modal":E,"--n-color-embedded-popover":D,"--n-color-target":i,"--n-text-color":a,"--n-line-height":p,"--n-action-color":u,"--n-title-text-color":o,"--n-title-font-weight":s,"--n-close-icon-color":m,"--n-close-icon-color-hover":h,"--n-close-icon-color-pressed":g,"--n-close-color-hover":v,"--n-close-color-pressed":y,"--n-border-color":c,"--n-box-shadow":C,"--n-padding-top":M,"--n-padding-bottom":P,"--n-padding-left":N,"--n-font-size":k,"--n-title-font-size":A,"--n-close-size":S,"--n-close-icon-size":x,"--n-close-border-radius":b}}),m=r?p(`card`,x(()=>d.value[0]),f,e):void 0;return{rtlEnabled:u,mergedClsPrefix:o,mergedTheme:l,handleCloseClick:t,cssVars:r?void 0:f,themeClass:m?.themeClass,onRender:m?.onRender}},render(){let{segmented:e,bordered:t,hoverable:n,mergedClsPrefix:i,rtlEnabled:a,onRender:s,embedded:c,tag:l,$slots:d}=this;return s?.(),r(l,{class:[`${i}-card`,this.themeClass,c&&`${i}-card--embedded`,{[`${i}-card--rtl`]:a,[`${i}-card--content-scrollable`]:this.contentScrollable,[`${i}-card--content${typeof e!=`boolean`&&e.content===`soft`?`-soft`:``}-segmented`]:e===!0||e!==!1&&e.content,[`${i}-card--footer${typeof e!=`boolean`&&e.footer===`soft`?`-soft`:``}-segmented`]:e===!0||e!==!1&&e.footer,[`${i}-card--action-segmented`]:e===!0||e!==!1&&e.action,[`${i}-card--bordered`]:t,[`${i}-card--hoverable`]:n}],style:this.cssVars,role:this.role},b(d.cover,e=>{let t=this.cover?u([this.cover()]):e;return t&&r(`div`,{class:`${i}-card-cover`,role:`none`},t)}),b(d.header,e=>{let{title:t}=this,n=t?u(typeof t==`function`?[t()]:[t]):e;return n||this.closable?r(`div`,{class:[`${i}-card-header`,this.headerClass],style:this.headerStyle,role:`heading`},r(`div`,{class:`${i}-card-header__main`,role:`heading`},n),b(d[`header-extra`],e=>{let t=this.headerExtra?u([this.headerExtra()]):e;return t&&r(`div`,{class:[`${i}-card-header__extra`,this.headerExtraClass],style:this.headerExtraStyle},t)}),this.closable&&r(o,{clsPrefix:i,class:`${i}-card-header__close`,onClick:this.handleCloseClick,focusable:this.closeFocusable,absolute:!0})):null}),b(d.default,e=>{let{content:t}=this,n=t?u(typeof t==`function`?[t()]:[t]):e;return n?this.contentScrollable?r(m,{class:`${i}-card__content-scrollbar`,contentClass:[`${i}-card-content`,this.contentClass],contentStyle:this.contentStyle},n):r(`div`,{class:[`${i}-card-content`,this.contentClass],style:this.contentStyle,role:`none`},n):null}),b(d.footer,e=>{let t=this.footer?u([this.footer()]):e;return t&&r(`div`,{class:[`${i}-card__footer`,this.footerClass],style:this.footerStyle,role:`none`},t)}),b(d.action,e=>{let t=this.action?u([this.action()]):e;return t&&r(`div`,{class:`${i}-card__action`,role:`none`},t)}))}});export{w as a,T as i,k as n,O as r,j as t};