import{Bt as e,Gt as t,Jt as n,O as r,Qt as i,S as a,Sn as o,Ut as s,Wt as c,Xt as l,Zt as u,_ as d,bn as f,j as p,lt as m,mt as h,p as g,pn as _,qt as v,ut as y,vt as b,yt as x}from"./auth-CKvW4zla.js";import{t as S}from"./keysOf-BNt7p-WY.js";var C={paddingSmall:`12px 16px 12px`,paddingMedium:`19px 24px 20px`,paddingLarge:`23px 32px 24px`,paddingHuge:`27px 40px 28px`,titleFontSizeSmall:`16px`,titleFontSizeMedium:`18px`,titleFontSizeLarge:`18px`,titleFontSizeHuge:`18px`,closeIconSize:`18px`,closeSize:`22px`};function w(e){let{primaryColor:t,borderRadius:n,lineHeight:r,fontSize:i,cardColor:a,textColor2:o,textColor1:s,dividerColor:c,fontWeightStrong:l,closeIconColor:u,closeIconColorHover:d,closeIconColorPressed:f,closeColorHover:p,closeColorPressed:m,modalColor:h,boxShadow1:g,popoverColor:_,actionColor:v}=e;return Object.assign(Object.assign({},C),{lineHeight:r,color:a,colorModal:h,colorPopover:_,colorTarget:t,colorEmbedded:v,colorEmbeddedModal:v,colorEmbeddedPopover:v,textColor:o,titleTextColor:s,borderColor:c,actionColor:v,titleFontWeight:l,closeColorHover:p,closeColorPressed:m,closeBorderRadius:n,closeIconColor:u,closeIconColorHover:d,closeIconColorPressed:f,fontSizeSmall:i,fontSizeMedium:i,fontSizeLarge:i,fontSizeHuge:i,boxShadow:g,borderRadius:n})}var T={name:`Card`,common:d,self:w},E=t(`card-content`,`
 flex: 1;
 min-width: 0;
 box-sizing: border-box;
 padding: 0 var(--n-padding-left) var(--n-padding-bottom) var(--n-padding-left);
 font-size: var(--n-font-size);
`),D=c([t(`card`,`
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
 `,[s({background:`var(--n-color-modal)`}),n(`hoverable`,[c(`&:hover`,`box-shadow: var(--n-box-shadow);`)]),n(`content-segmented`,[c(`>`,[t(`card-content`,`
 padding-top: var(--n-padding-bottom);
 `),v(`content-scrollbar`,[c(`>`,[t(`scrollbar-container`,[c(`>`,[t(`card-content`,`
 padding-top: var(--n-padding-bottom);
 `)])])])])])]),n(`content-soft-segmented`,[c(`>`,[t(`card-content`,`
 margin: 0 var(--n-padding-left);
 padding: var(--n-padding-bottom) 0;
 `),v(`content-scrollbar`,[c(`>`,[t(`scrollbar-container`,[c(`>`,[t(`card-content`,`
 margin: 0 var(--n-padding-left);
 padding: var(--n-padding-bottom) 0;
 `)])])])])])]),n(`footer-segmented`,[c(`>`,[v(`footer`,`
 padding-top: var(--n-padding-bottom);
 `)])]),n(`footer-soft-segmented`,[c(`>`,[v(`footer`,`
 padding: var(--n-padding-bottom) 0;
 margin: 0 var(--n-padding-left);
 `)])]),c(`>`,[t(`card-header`,`
 box-sizing: border-box;
 display: flex;
 align-items: center;
 font-size: var(--n-title-font-size);
 padding:
 var(--n-padding-top)
 var(--n-padding-left)
 var(--n-padding-bottom)
 var(--n-padding-left);
 `,[v(`main`,`
 font-weight: var(--n-title-font-weight);
 transition: color .3s var(--n-bezier);
 flex: 1;
 min-width: 0;
 color: var(--n-title-text-color);
 `),v(`extra`,`
 display: flex;
 align-items: center;
 font-size: var(--n-font-size);
 font-weight: 400;
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `),v(`close`,`
 margin: 0 0 0 8px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)]),v(`action`,`
 box-sizing: border-box;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 background-clip: padding-box;
 background-color: var(--n-action-color);
 `),E,t(`card-content`,[c(`&:first-child`,`
 padding-top: var(--n-padding-bottom);
 `)]),v(`content-scrollbar`,`
 display: flex;
 flex-direction: column;
 `,[c(`>`,[t(`scrollbar-container`,[c(`>`,[E])])]),c(`&:first-child >`,[t(`scrollbar-container`,[c(`>`,[t(`card-content`,`
 padding-top: var(--n-padding-bottom);
 `)])])])]),v(`footer`,`
 box-sizing: border-box;
 padding: 0 var(--n-padding-left) var(--n-padding-bottom) var(--n-padding-left);
 font-size: var(--n-font-size);
 `,[c(`&:first-child`,`
 padding-top: var(--n-padding-bottom);
 `)]),v(`action`,`
 background-color: var(--n-action-color);
 padding: var(--n-padding-bottom) var(--n-padding-left);
 border-bottom-left-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `)]),t(`card-cover`,`
 overflow: hidden;
 width: 100%;
 border-radius: var(--n-border-radius) var(--n-border-radius) 0 0;
 `,[c(`img`,`
 display: block;
 width: 100%;
 `)]),n(`bordered`,`
 border: 1px solid var(--n-border-color);
 `,[c(`&:target`,`border-color: var(--n-color-target);`)]),n(`action-segmented`,[c(`>`,[v(`action`,[c(`&:not(:first-child)`,`
 border-top: 1px solid var(--n-border-color);
 `)])])]),n(`content-segmented, content-soft-segmented`,[c(`>`,[t(`card-content`,`
 transition: border-color 0.3s var(--n-bezier);
 `,[c(`&:not(:first-child)`,`
 border-top: 1px solid var(--n-border-color);
 `)]),v(`content-scrollbar`,`
 transition: border-color 0.3s var(--n-bezier);
 `,[c(`&:not(:first-child)`,`
 border-top: 1px solid var(--n-border-color);
 `)])])]),n(`footer-segmented, footer-soft-segmented`,[c(`>`,[v(`footer`,`
 transition: border-color 0.3s var(--n-bezier);
 `,[c(`&:not(:first-child)`,`
 border-top: 1px solid var(--n-border-color);
 `)])])]),n(`embedded`,`
 background-color: var(--n-color-embedded);
 `)]),u(t(`card`,`
 background: var(--n-color-modal);
 `,[n(`embedded`,`
 background-color: var(--n-color-embedded-modal);
 `)])),i(t(`card`,`
 background: var(--n-color-popover);
 `,[n(`embedded`,`
 background-color: var(--n-color-embedded-popover);
 `)]))]),O={title:[String,Function],contentClass:String,contentStyle:[Object,String],contentScrollable:Boolean,headerClass:String,headerStyle:[Object,String],headerExtraClass:String,headerExtraStyle:[Object,String],footerClass:String,footerStyle:[Object,String],embedded:Boolean,segmented:{type:[Boolean,Object],default:!1},size:String,bordered:{type:Boolean,default:!0},closable:Boolean,hoverable:Boolean,role:String,onClose:[Function,Array],tag:{type:String,default:`div`},cover:Function,content:[String,Function],footer:Function,action:Function,headerExtra:Function,closeFocusable:Boolean},k=S(O),A=Object.assign(Object.assign({},r.props),O),j=f({name:`Card`,props:A,slots:Object,setup(t){let n=()=>{let{onClose:e}=t;e&&x(e)},{inlineThemeDisabled:i,mergedClsPrefixRef:a,mergedRtlRef:o,mergedComponentPropsRef:s}=y(t),c=r(`Card`,`-card`,D,T,t,a),u=p(`Card`,o,a),d=_(()=>t.size||s?.value?.Card?.size||`medium`),f=_(()=>{let t=d.value,{self:{color:n,colorModal:r,colorTarget:i,textColor:a,titleTextColor:o,titleFontWeight:s,borderColor:u,actionColor:f,borderRadius:p,lineHeight:m,closeIconColor:h,closeIconColorHover:g,closeIconColorPressed:_,closeColorHover:v,closeColorPressed:y,closeBorderRadius:b,closeIconSize:x,closeSize:S,boxShadow:C,colorPopover:w,colorEmbedded:T,colorEmbeddedModal:E,colorEmbeddedPopover:D,[l(`padding`,t)]:O,[l(`fontSize`,t)]:k,[l(`titleFontSize`,t)]:A},common:{cubicBezierEaseInOut:j}}=c.value,{top:M,left:N,bottom:P}=e(O);return{"--n-bezier":j,"--n-border-radius":p,"--n-color":n,"--n-color-modal":r,"--n-color-popover":w,"--n-color-embedded":T,"--n-color-embedded-modal":E,"--n-color-embedded-popover":D,"--n-color-target":i,"--n-text-color":a,"--n-line-height":m,"--n-action-color":f,"--n-title-text-color":o,"--n-title-font-weight":s,"--n-close-icon-color":h,"--n-close-icon-color-hover":g,"--n-close-icon-color-pressed":_,"--n-close-color-hover":v,"--n-close-color-pressed":y,"--n-border-color":u,"--n-box-shadow":C,"--n-padding-top":M,"--n-padding-bottom":P,"--n-padding-left":N,"--n-font-size":k,"--n-title-font-size":A,"--n-close-size":S,"--n-close-icon-size":x,"--n-close-border-radius":b}}),h=i?m(`card`,_(()=>d.value[0]),f,t):void 0;return{rtlEnabled:u,mergedClsPrefix:a,mergedTheme:c,handleCloseClick:n,cssVars:i?void 0:f,themeClass:h?.themeClass,onRender:h?.onRender}},render(){let{segmented:e,bordered:t,hoverable:n,mergedClsPrefix:r,rtlEnabled:i,onRender:s,embedded:c,tag:l,$slots:u}=this;return s?.(),o(l,{class:[`${r}-card`,this.themeClass,c&&`${r}-card--embedded`,{[`${r}-card--rtl`]:i,[`${r}-card--content-scrollable`]:this.contentScrollable,[`${r}-card--content${typeof e!=`boolean`&&e.content===`soft`?`-soft`:``}-segmented`]:e===!0||e!==!1&&e.content,[`${r}-card--footer${typeof e!=`boolean`&&e.footer===`soft`?`-soft`:``}-segmented`]:e===!0||e!==!1&&e.footer,[`${r}-card--action-segmented`]:e===!0||e!==!1&&e.action,[`${r}-card--bordered`]:t,[`${r}-card--hoverable`]:n}],style:this.cssVars,role:this.role},b(u.cover,e=>{let t=this.cover?h([this.cover()]):e;return t&&o(`div`,{class:`${r}-card-cover`,role:`none`},t)}),b(u.header,e=>{let{title:t}=this,n=t?h(typeof t==`function`?[t()]:[t]):e;return n||this.closable?o(`div`,{class:[`${r}-card-header`,this.headerClass],style:this.headerStyle,role:`heading`},o(`div`,{class:`${r}-card-header__main`,role:`heading`},n),b(u[`header-extra`],e=>{let t=this.headerExtra?h([this.headerExtra()]):e;return t&&o(`div`,{class:[`${r}-card-header__extra`,this.headerExtraClass],style:this.headerExtraStyle},t)}),this.closable&&o(a,{clsPrefix:r,class:`${r}-card-header__close`,onClick:this.handleCloseClick,focusable:this.closeFocusable,absolute:!0})):null}),b(u.default,e=>{let{content:t}=this,n=t?h(typeof t==`function`?[t()]:[t]):e;return n?this.contentScrollable?o(g,{class:`${r}-card__content-scrollbar`,contentClass:[`${r}-card-content`,this.contentClass],contentStyle:this.contentStyle},n):o(`div`,{class:[`${r}-card-content`,this.contentClass],style:this.contentStyle,role:`none`},n):null}),b(u.footer,e=>{let t=this.footer?h([this.footer()]):e;return t&&o(`div`,{class:[`${r}-card__footer`,this.footerClass],style:this.footerStyle,role:`none`},t)}),b(u.action,e=>{let t=this.action?h([this.action()]):e;return t&&o(`div`,{class:`${r}-card__action`,role:`none`},t)}))}});export{w as a,T as i,k as n,O as r,j as t};