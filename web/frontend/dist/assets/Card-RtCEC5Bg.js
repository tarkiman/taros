import{An as e,C as t,Ct as n,D as r,G as i,H as a,Ln as o,M as s,Mt as c,Nt as l,Ot as u,cn as d,dn as f,hn as p,mn as m,on as h,pn as g,rn as _,sn as v,un as y,wt as b,zn as x}from"./auth-B9qrSSDV.js";import{l as S}from"./light-DDg2yKbn.js";var C={paddingSmall:`12px 16px 12px`,paddingMedium:`19px 24px 20px`,paddingLarge:`23px 32px 24px`,paddingHuge:`27px 40px 28px`,titleFontSizeSmall:`16px`,titleFontSizeMedium:`18px`,titleFontSizeLarge:`18px`,titleFontSizeHuge:`18px`,closeIconSize:`18px`,closeSize:`22px`};function w(e){let{primaryColor:t,borderRadius:n,lineHeight:r,fontSize:i,cardColor:a,textColor2:o,textColor1:s,dividerColor:c,fontWeightStrong:l,closeIconColor:u,closeIconColorHover:d,closeIconColorPressed:f,closeColorHover:p,closeColorPressed:m,modalColor:h,boxShadow1:g,popoverColor:_,actionColor:v}=e;return Object.assign(Object.assign({},C),{lineHeight:r,color:a,colorModal:h,colorPopover:_,colorTarget:t,colorEmbedded:v,colorEmbeddedModal:v,colorEmbeddedPopover:v,textColor:o,titleTextColor:s,borderColor:c,actionColor:v,titleFontWeight:l,closeColorHover:p,closeColorPressed:m,closeBorderRadius:n,closeIconColor:u,closeIconColorHover:d,closeIconColorPressed:f,fontSizeSmall:i,fontSizeMedium:i,fontSizeLarge:i,fontSizeHuge:i,boxShadow:g,borderRadius:n})}var T={name:`Card`,common:r,self:w},E=d(`card-content`,`
 flex: 1;
 min-width: 0;
 box-sizing: border-box;
 padding: 0 var(--n-padding-left) var(--n-padding-bottom) var(--n-padding-left);
 font-size: var(--n-font-size);
`),D=v([d(`card`,`
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
 `,[h({background:`var(--n-color-modal)`}),f(`hoverable`,[v(`&:hover`,`box-shadow: var(--n-box-shadow);`)]),f(`content-segmented`,[v(`>`,[d(`card-content`,`
 padding-top: var(--n-padding-bottom);
 `),y(`content-scrollbar`,[v(`>`,[d(`scrollbar-container`,[v(`>`,[d(`card-content`,`
 padding-top: var(--n-padding-bottom);
 `)])])])])])]),f(`content-soft-segmented`,[v(`>`,[d(`card-content`,`
 margin: 0 var(--n-padding-left);
 padding: var(--n-padding-bottom) 0;
 `),y(`content-scrollbar`,[v(`>`,[d(`scrollbar-container`,[v(`>`,[d(`card-content`,`
 margin: 0 var(--n-padding-left);
 padding: var(--n-padding-bottom) 0;
 `)])])])])])]),f(`footer-segmented`,[v(`>`,[y(`footer`,`
 padding-top: var(--n-padding-bottom);
 `)])]),f(`footer-soft-segmented`,[v(`>`,[y(`footer`,`
 padding: var(--n-padding-bottom) 0;
 margin: 0 var(--n-padding-left);
 `)])]),v(`>`,[d(`card-header`,`
 box-sizing: border-box;
 display: flex;
 align-items: center;
 font-size: var(--n-title-font-size);
 padding:
 var(--n-padding-top)
 var(--n-padding-left)
 var(--n-padding-bottom)
 var(--n-padding-left);
 `,[y(`main`,`
 font-weight: var(--n-title-font-weight);
 transition: color .3s var(--n-bezier);
 flex: 1;
 min-width: 0;
 color: var(--n-title-text-color);
 `),y(`extra`,`
 display: flex;
 align-items: center;
 font-size: var(--n-font-size);
 font-weight: 400;
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `),y(`close`,`
 margin: 0 0 0 8px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)]),y(`action`,`
 box-sizing: border-box;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 background-clip: padding-box;
 background-color: var(--n-action-color);
 `),E,d(`card-content`,[v(`&:first-child`,`
 padding-top: var(--n-padding-bottom);
 `)]),y(`content-scrollbar`,`
 display: flex;
 flex-direction: column;
 `,[v(`>`,[d(`scrollbar-container`,[v(`>`,[E])])]),v(`&:first-child >`,[d(`scrollbar-container`,[v(`>`,[d(`card-content`,`
 padding-top: var(--n-padding-bottom);
 `)])])])]),y(`footer`,`
 box-sizing: border-box;
 padding: 0 var(--n-padding-left) var(--n-padding-bottom) var(--n-padding-left);
 font-size: var(--n-font-size);
 `,[v(`&:first-child`,`
 padding-top: var(--n-padding-bottom);
 `)]),y(`action`,`
 background-color: var(--n-action-color);
 padding: var(--n-padding-bottom) var(--n-padding-left);
 border-bottom-left-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `)]),d(`card-cover`,`
 overflow: hidden;
 width: 100%;
 border-radius: var(--n-border-radius) var(--n-border-radius) 0 0;
 `,[v(`img`,`
 display: block;
 width: 100%;
 `)]),f(`bordered`,`
 border: 1px solid var(--n-border-color);
 `,[v(`&:target`,`border-color: var(--n-color-target);`)]),f(`action-segmented`,[v(`>`,[y(`action`,[v(`&:not(:first-child)`,`
 border-top: 1px solid var(--n-border-color);
 `)])])]),f(`content-segmented, content-soft-segmented`,[v(`>`,[d(`card-content`,`
 transition: border-color 0.3s var(--n-bezier);
 `,[v(`&:not(:first-child)`,`
 border-top: 1px solid var(--n-border-color);
 `)]),y(`content-scrollbar`,`
 transition: border-color 0.3s var(--n-bezier);
 `,[v(`&:not(:first-child)`,`
 border-top: 1px solid var(--n-border-color);
 `)])])]),f(`footer-segmented, footer-soft-segmented`,[v(`>`,[y(`footer`,`
 transition: border-color 0.3s var(--n-bezier);
 `,[v(`&:not(:first-child)`,`
 border-top: 1px solid var(--n-border-color);
 `)])])]),f(`embedded`,`
 background-color: var(--n-color-embedded);
 `)]),m(d(`card`,`
 background: var(--n-color-modal);
 `,[f(`embedded`,`
 background-color: var(--n-color-embedded-modal);
 `)])),p(d(`card`,`
 background: var(--n-color-popover);
 `,[f(`embedded`,`
 background-color: var(--n-color-embedded-popover);
 `)]))]),O={title:[String,Function],contentClass:String,contentStyle:[Object,String],contentScrollable:Boolean,headerClass:String,headerStyle:[Object,String],headerExtraClass:String,headerExtraStyle:[Object,String],footerClass:String,footerStyle:[Object,String],embedded:Boolean,segmented:{type:[Boolean,Object],default:!1},size:String,bordered:{type:Boolean,default:!0},closable:Boolean,hoverable:Boolean,role:String,onClose:[Function,Array],tag:{type:String,default:`div`},cover:Function,content:[String,Function],footer:Function,action:Function,headerExtra:Function,closeFocusable:Boolean},k=S(O),A=Object.assign(Object.assign({},a.props),O),j=o({name:`Card`,props:A,slots:Object,setup(t){let r=()=>{let{onClose:e}=t;e&&l(e)},{inlineThemeDisabled:o,mergedClsPrefixRef:s,mergedRtlRef:c,mergedComponentPropsRef:u}=b(t),d=a(`Card`,`-card`,D,T,t,s),f=i(`Card`,c,s),p=e(()=>t.size||u?.value?.Card?.size||`medium`),m=e(()=>{let e=p.value,{self:{color:t,colorModal:n,colorTarget:r,textColor:i,titleTextColor:a,titleFontWeight:o,borderColor:s,actionColor:c,borderRadius:l,lineHeight:u,closeIconColor:f,closeIconColorHover:m,closeIconColorPressed:h,closeColorHover:v,closeColorPressed:y,closeBorderRadius:b,closeIconSize:x,closeSize:S,boxShadow:C,colorPopover:w,colorEmbedded:T,colorEmbeddedModal:E,colorEmbeddedPopover:D,[g(`padding`,e)]:O,[g(`fontSize`,e)]:k,[g(`titleFontSize`,e)]:A},common:{cubicBezierEaseInOut:j}}=d.value,{top:M,left:N,bottom:P}=_(O);return{"--n-bezier":j,"--n-border-radius":l,"--n-color":t,"--n-color-modal":n,"--n-color-popover":w,"--n-color-embedded":T,"--n-color-embedded-modal":E,"--n-color-embedded-popover":D,"--n-color-target":r,"--n-text-color":i,"--n-line-height":u,"--n-action-color":c,"--n-title-text-color":a,"--n-title-font-weight":o,"--n-close-icon-color":f,"--n-close-icon-color-hover":m,"--n-close-icon-color-pressed":h,"--n-close-color-hover":v,"--n-close-color-pressed":y,"--n-border-color":s,"--n-box-shadow":C,"--n-padding-top":M,"--n-padding-bottom":P,"--n-padding-left":N,"--n-font-size":k,"--n-title-font-size":A,"--n-close-size":S,"--n-close-icon-size":x,"--n-close-border-radius":b}}),h=o?n(`card`,e(()=>p.value[0]),m,t):void 0;return{rtlEnabled:f,mergedClsPrefix:s,mergedTheme:d,handleCloseClick:r,cssVars:o?void 0:m,themeClass:h?.themeClass,onRender:h?.onRender}},render(){let{segmented:e,bordered:n,hoverable:r,mergedClsPrefix:i,rtlEnabled:a,onRender:o,embedded:l,tag:d,$slots:f}=this;return o?.(),x(d,{class:[`${i}-card`,this.themeClass,l&&`${i}-card--embedded`,{[`${i}-card--rtl`]:a,[`${i}-card--content-scrollable`]:this.contentScrollable,[`${i}-card--content${typeof e!=`boolean`&&e.content===`soft`?`-soft`:``}-segmented`]:e===!0||e!==!1&&e.content,[`${i}-card--footer${typeof e!=`boolean`&&e.footer===`soft`?`-soft`:``}-segmented`]:e===!0||e!==!1&&e.footer,[`${i}-card--action-segmented`]:e===!0||e!==!1&&e.action,[`${i}-card--bordered`]:n,[`${i}-card--hoverable`]:r}],style:this.cssVars,role:this.role},c(f.cover,e=>{let t=this.cover?u([this.cover()]):e;return t&&x(`div`,{class:`${i}-card-cover`,role:`none`},t)}),c(f.header,e=>{let{title:t}=this,n=t?u(typeof t==`function`?[t()]:[t]):e;return n||this.closable?x(`div`,{class:[`${i}-card-header`,this.headerClass],style:this.headerStyle,role:`heading`},x(`div`,{class:`${i}-card-header__main`,role:`heading`},n),c(f[`header-extra`],e=>{let t=this.headerExtra?u([this.headerExtra()]):e;return t&&x(`div`,{class:[`${i}-card-header__extra`,this.headerExtraClass],style:this.headerExtraStyle},t)}),this.closable&&x(s,{clsPrefix:i,class:`${i}-card-header__close`,onClick:this.handleCloseClick,focusable:this.closeFocusable,absolute:!0})):null}),c(f.default,e=>{let{content:n}=this,r=n?u(typeof n==`function`?[n()]:[n]):e;return r?this.contentScrollable?x(t,{class:`${i}-card__content-scrollbar`,contentClass:[`${i}-card-content`,this.contentClass],contentStyle:this.contentStyle},r):x(`div`,{class:[`${i}-card-content`,this.contentClass],style:this.contentStyle,role:`none`},r):null}),c(f.footer,e=>{let t=this.footer?u([this.footer()]):e;return t&&x(`div`,{class:[`${i}-card__footer`,this.footerClass],style:this.footerStyle,role:`none`},t)}),c(f.action,e=>{let t=this.action?u([this.action()]):e;return t&&x(`div`,{class:`${i}-card__action`,role:`none`},t)}))}});export{w as a,T as i,k as n,O as r,j as t};