import{$t as e,Gt as t,Ht as n,Kt as r,O as i,Qt as a,S as o,Sn as s,Xt as c,Yt as l,_ as u,en as d,hn as f,j as p,lt as m,mt as h,p as g,qt as _,ut as v,vt as y,wn as b,yt as x}from"./auth-DqHclkT-.js";import{t as S}from"./keysOf-BNt7p-WY.js";var C={paddingSmall:`12px 16px 12px`,paddingMedium:`19px 24px 20px`,paddingLarge:`23px 32px 24px`,paddingHuge:`27px 40px 28px`,titleFontSizeSmall:`16px`,titleFontSizeMedium:`18px`,titleFontSizeLarge:`18px`,titleFontSizeHuge:`18px`,closeIconSize:`18px`,closeSize:`22px`};function w(e){let{primaryColor:t,borderRadius:n,lineHeight:r,fontSize:i,cardColor:a,textColor2:o,textColor1:s,dividerColor:c,fontWeightStrong:l,closeIconColor:u,closeIconColorHover:d,closeIconColorPressed:f,closeColorHover:p,closeColorPressed:m,modalColor:h,boxShadow1:g,popoverColor:_,actionColor:v}=e;return Object.assign(Object.assign({},C),{lineHeight:r,color:a,colorModal:h,colorPopover:_,colorTarget:t,colorEmbedded:v,colorEmbeddedModal:v,colorEmbeddedPopover:v,textColor:o,titleTextColor:s,borderColor:c,actionColor:v,titleFontWeight:l,closeColorHover:p,closeColorPressed:m,closeBorderRadius:n,closeIconColor:u,closeIconColorHover:d,closeIconColorPressed:f,fontSizeSmall:i,fontSizeMedium:i,fontSizeLarge:i,fontSizeHuge:i,boxShadow:g,borderRadius:n})}var T={name:`Card`,common:u,self:w},E=_(`card-content`,`
 flex: 1;
 min-width: 0;
 box-sizing: border-box;
 padding: 0 var(--n-padding-left) var(--n-padding-bottom) var(--n-padding-left);
 font-size: var(--n-font-size);
`),D=r([_(`card`,`
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
 `,[t({background:`var(--n-color-modal)`}),c(`hoverable`,[r(`&:hover`,`box-shadow: var(--n-box-shadow);`)]),c(`content-segmented`,[r(`>`,[_(`card-content`,`
 padding-top: var(--n-padding-bottom);
 `),l(`content-scrollbar`,[r(`>`,[_(`scrollbar-container`,[r(`>`,[_(`card-content`,`
 padding-top: var(--n-padding-bottom);
 `)])])])])])]),c(`content-soft-segmented`,[r(`>`,[_(`card-content`,`
 margin: 0 var(--n-padding-left);
 padding: var(--n-padding-bottom) 0;
 `),l(`content-scrollbar`,[r(`>`,[_(`scrollbar-container`,[r(`>`,[_(`card-content`,`
 margin: 0 var(--n-padding-left);
 padding: var(--n-padding-bottom) 0;
 `)])])])])])]),c(`footer-segmented`,[r(`>`,[l(`footer`,`
 padding-top: var(--n-padding-bottom);
 `)])]),c(`footer-soft-segmented`,[r(`>`,[l(`footer`,`
 padding: var(--n-padding-bottom) 0;
 margin: 0 var(--n-padding-left);
 `)])]),r(`>`,[_(`card-header`,`
 box-sizing: border-box;
 display: flex;
 align-items: center;
 font-size: var(--n-title-font-size);
 padding:
 var(--n-padding-top)
 var(--n-padding-left)
 var(--n-padding-bottom)
 var(--n-padding-left);
 `,[l(`main`,`
 font-weight: var(--n-title-font-weight);
 transition: color .3s var(--n-bezier);
 flex: 1;
 min-width: 0;
 color: var(--n-title-text-color);
 `),l(`extra`,`
 display: flex;
 align-items: center;
 font-size: var(--n-font-size);
 font-weight: 400;
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `),l(`close`,`
 margin: 0 0 0 8px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)]),l(`action`,`
 box-sizing: border-box;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 background-clip: padding-box;
 background-color: var(--n-action-color);
 `),E,_(`card-content`,[r(`&:first-child`,`
 padding-top: var(--n-padding-bottom);
 `)]),l(`content-scrollbar`,`
 display: flex;
 flex-direction: column;
 `,[r(`>`,[_(`scrollbar-container`,[r(`>`,[E])])]),r(`&:first-child >`,[_(`scrollbar-container`,[r(`>`,[_(`card-content`,`
 padding-top: var(--n-padding-bottom);
 `)])])])]),l(`footer`,`
 box-sizing: border-box;
 padding: 0 var(--n-padding-left) var(--n-padding-bottom) var(--n-padding-left);
 font-size: var(--n-font-size);
 `,[r(`&:first-child`,`
 padding-top: var(--n-padding-bottom);
 `)]),l(`action`,`
 background-color: var(--n-action-color);
 padding: var(--n-padding-bottom) var(--n-padding-left);
 border-bottom-left-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `)]),_(`card-cover`,`
 overflow: hidden;
 width: 100%;
 border-radius: var(--n-border-radius) var(--n-border-radius) 0 0;
 `,[r(`img`,`
 display: block;
 width: 100%;
 `)]),c(`bordered`,`
 border: 1px solid var(--n-border-color);
 `,[r(`&:target`,`border-color: var(--n-color-target);`)]),c(`action-segmented`,[r(`>`,[l(`action`,[r(`&:not(:first-child)`,`
 border-top: 1px solid var(--n-border-color);
 `)])])]),c(`content-segmented, content-soft-segmented`,[r(`>`,[_(`card-content`,`
 transition: border-color 0.3s var(--n-bezier);
 `,[r(`&:not(:first-child)`,`
 border-top: 1px solid var(--n-border-color);
 `)]),l(`content-scrollbar`,`
 transition: border-color 0.3s var(--n-bezier);
 `,[r(`&:not(:first-child)`,`
 border-top: 1px solid var(--n-border-color);
 `)])])]),c(`footer-segmented, footer-soft-segmented`,[r(`>`,[l(`footer`,`
 transition: border-color 0.3s var(--n-bezier);
 `,[r(`&:not(:first-child)`,`
 border-top: 1px solid var(--n-border-color);
 `)])])]),c(`embedded`,`
 background-color: var(--n-color-embedded);
 `)]),e(_(`card`,`
 background: var(--n-color-modal);
 `,[c(`embedded`,`
 background-color: var(--n-color-embedded-modal);
 `)])),d(_(`card`,`
 background: var(--n-color-popover);
 `,[c(`embedded`,`
 background-color: var(--n-color-embedded-popover);
 `)]))]),O={title:[String,Function],contentClass:String,contentStyle:[Object,String],contentScrollable:Boolean,headerClass:String,headerStyle:[Object,String],headerExtraClass:String,headerExtraStyle:[Object,String],footerClass:String,footerStyle:[Object,String],embedded:Boolean,segmented:{type:[Boolean,Object],default:!1},size:String,bordered:{type:Boolean,default:!0},closable:Boolean,hoverable:Boolean,role:String,onClose:[Function,Array],tag:{type:String,default:`div`},cover:Function,content:[String,Function],footer:Function,action:Function,headerExtra:Function,closeFocusable:Boolean},k=S(O),A=Object.assign(Object.assign({},i.props),O),j=s({name:`Card`,props:A,slots:Object,setup(e){let t=()=>{let{onClose:t}=e;t&&x(t)},{inlineThemeDisabled:r,mergedClsPrefixRef:o,mergedRtlRef:s,mergedComponentPropsRef:c}=v(e),l=i(`Card`,`-card`,D,T,e,o),u=p(`Card`,s,o),d=f(()=>e.size||c?.value?.Card?.size||`medium`),h=f(()=>{let e=d.value,{self:{color:t,colorModal:r,colorTarget:i,textColor:o,titleTextColor:s,titleFontWeight:c,borderColor:u,actionColor:f,borderRadius:p,lineHeight:m,closeIconColor:h,closeIconColorHover:g,closeIconColorPressed:_,closeColorHover:v,closeColorPressed:y,closeBorderRadius:b,closeIconSize:x,closeSize:S,boxShadow:C,colorPopover:w,colorEmbedded:T,colorEmbeddedModal:E,colorEmbeddedPopover:D,[a(`padding`,e)]:O,[a(`fontSize`,e)]:k,[a(`titleFontSize`,e)]:A},common:{cubicBezierEaseInOut:j}}=l.value,{top:M,left:N,bottom:P}=n(O);return{"--n-bezier":j,"--n-border-radius":p,"--n-color":t,"--n-color-modal":r,"--n-color-popover":w,"--n-color-embedded":T,"--n-color-embedded-modal":E,"--n-color-embedded-popover":D,"--n-color-target":i,"--n-text-color":o,"--n-line-height":m,"--n-action-color":f,"--n-title-text-color":s,"--n-title-font-weight":c,"--n-close-icon-color":h,"--n-close-icon-color-hover":g,"--n-close-icon-color-pressed":_,"--n-close-color-hover":v,"--n-close-color-pressed":y,"--n-border-color":u,"--n-box-shadow":C,"--n-padding-top":M,"--n-padding-bottom":P,"--n-padding-left":N,"--n-font-size":k,"--n-title-font-size":A,"--n-close-size":S,"--n-close-icon-size":x,"--n-close-border-radius":b}}),g=r?m(`card`,f(()=>d.value[0]),h,e):void 0;return{rtlEnabled:u,mergedClsPrefix:o,mergedTheme:l,handleCloseClick:t,cssVars:r?void 0:h,themeClass:g?.themeClass,onRender:g?.onRender}},render(){let{segmented:e,bordered:t,hoverable:n,mergedClsPrefix:r,rtlEnabled:i,onRender:a,embedded:s,tag:c,$slots:l}=this;return a?.(),b(c,{class:[`${r}-card`,this.themeClass,s&&`${r}-card--embedded`,{[`${r}-card--rtl`]:i,[`${r}-card--content-scrollable`]:this.contentScrollable,[`${r}-card--content${typeof e!=`boolean`&&e.content===`soft`?`-soft`:``}-segmented`]:e===!0||e!==!1&&e.content,[`${r}-card--footer${typeof e!=`boolean`&&e.footer===`soft`?`-soft`:``}-segmented`]:e===!0||e!==!1&&e.footer,[`${r}-card--action-segmented`]:e===!0||e!==!1&&e.action,[`${r}-card--bordered`]:t,[`${r}-card--hoverable`]:n}],style:this.cssVars,role:this.role},y(l.cover,e=>{let t=this.cover?h([this.cover()]):e;return t&&b(`div`,{class:`${r}-card-cover`,role:`none`},t)}),y(l.header,e=>{let{title:t}=this,n=t?h(typeof t==`function`?[t()]:[t]):e;return n||this.closable?b(`div`,{class:[`${r}-card-header`,this.headerClass],style:this.headerStyle,role:`heading`},b(`div`,{class:`${r}-card-header__main`,role:`heading`},n),y(l[`header-extra`],e=>{let t=this.headerExtra?h([this.headerExtra()]):e;return t&&b(`div`,{class:[`${r}-card-header__extra`,this.headerExtraClass],style:this.headerExtraStyle},t)}),this.closable&&b(o,{clsPrefix:r,class:`${r}-card-header__close`,onClick:this.handleCloseClick,focusable:this.closeFocusable,absolute:!0})):null}),y(l.default,e=>{let{content:t}=this,n=t?h(typeof t==`function`?[t()]:[t]):e;return n?this.contentScrollable?b(g,{class:`${r}-card__content-scrollbar`,contentClass:[`${r}-card-content`,this.contentClass],contentStyle:this.contentStyle},n):b(`div`,{class:[`${r}-card-content`,this.contentClass],style:this.contentStyle,role:`none`},n):null}),y(l.footer,e=>{let t=this.footer?h([this.footer()]):e;return t&&b(`div`,{class:[`${r}-card__footer`,this.footerClass],style:this.footerStyle,role:`none`},t)}),y(l.action,e=>{let t=this.action?h([this.action()]):e;return t&&b(`div`,{class:`${r}-card__action`,role:`none`},t)}))}});export{w as a,T as i,k as n,O as r,j as t};