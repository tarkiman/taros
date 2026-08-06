import{Dt as e,E as t,Et as n,I as r,Nn as i,St as a,Zt as o,_ as s,_t as c,an as l,cn as u,en as d,in as f,jn as p,ln as m,nn as h,sn as g,tn as _,vt as v,wn as y,x as b,z as x}from"./auth-DkWBYjip.js";import{t as S}from"./keysOf-BNt7p-WY.js";var C={paddingSmall:`12px 16px 12px`,paddingMedium:`19px 24px 20px`,paddingLarge:`23px 32px 24px`,paddingHuge:`27px 40px 28px`,titleFontSizeSmall:`16px`,titleFontSizeMedium:`18px`,titleFontSizeLarge:`18px`,titleFontSizeHuge:`18px`,closeIconSize:`18px`,closeSize:`22px`};function w(e){let{primaryColor:t,borderRadius:n,lineHeight:r,fontSize:i,cardColor:a,textColor2:o,textColor1:s,dividerColor:c,fontWeightStrong:l,closeIconColor:u,closeIconColorHover:d,closeIconColorPressed:f,closeColorHover:p,closeColorPressed:m,modalColor:h,boxShadow1:g,popoverColor:_,actionColor:v}=e;return Object.assign(Object.assign({},C),{lineHeight:r,color:a,colorModal:h,colorPopover:_,colorTarget:t,colorEmbedded:v,colorEmbeddedModal:v,colorEmbeddedPopover:v,textColor:o,titleTextColor:s,borderColor:c,actionColor:v,titleFontWeight:l,closeColorHover:p,closeColorPressed:m,closeBorderRadius:n,closeIconColor:u,closeIconColorHover:d,closeIconColorPressed:f,fontSizeSmall:i,fontSizeMedium:i,fontSizeLarge:i,fontSizeHuge:i,boxShadow:g,borderRadius:n})}var T={name:`Card`,common:b,self:w},E=h(`card-content`,`
 flex: 1;
 min-width: 0;
 box-sizing: border-box;
 padding: 0 var(--n-padding-left) var(--n-padding-bottom) var(--n-padding-left);
 font-size: var(--n-font-size);
`),D=_([h(`card`,`
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
 `,[d({background:`var(--n-color-modal)`}),l(`hoverable`,[_(`&:hover`,`box-shadow: var(--n-box-shadow);`)]),l(`content-segmented`,[_(`>`,[h(`card-content`,`
 padding-top: var(--n-padding-bottom);
 `),f(`content-scrollbar`,[_(`>`,[h(`scrollbar-container`,[_(`>`,[h(`card-content`,`
 padding-top: var(--n-padding-bottom);
 `)])])])])])]),l(`content-soft-segmented`,[_(`>`,[h(`card-content`,`
 margin: 0 var(--n-padding-left);
 padding: var(--n-padding-bottom) 0;
 `),f(`content-scrollbar`,[_(`>`,[h(`scrollbar-container`,[_(`>`,[h(`card-content`,`
 margin: 0 var(--n-padding-left);
 padding: var(--n-padding-bottom) 0;
 `)])])])])])]),l(`footer-segmented`,[_(`>`,[f(`footer`,`
 padding-top: var(--n-padding-bottom);
 `)])]),l(`footer-soft-segmented`,[_(`>`,[f(`footer`,`
 padding: var(--n-padding-bottom) 0;
 margin: 0 var(--n-padding-left);
 `)])]),_(`>`,[h(`card-header`,`
 box-sizing: border-box;
 display: flex;
 align-items: center;
 font-size: var(--n-title-font-size);
 padding:
 var(--n-padding-top)
 var(--n-padding-left)
 var(--n-padding-bottom)
 var(--n-padding-left);
 `,[f(`main`,`
 font-weight: var(--n-title-font-weight);
 transition: color .3s var(--n-bezier);
 flex: 1;
 min-width: 0;
 color: var(--n-title-text-color);
 `),f(`extra`,`
 display: flex;
 align-items: center;
 font-size: var(--n-font-size);
 font-weight: 400;
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `),f(`close`,`
 margin: 0 0 0 8px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)]),f(`action`,`
 box-sizing: border-box;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 background-clip: padding-box;
 background-color: var(--n-action-color);
 `),E,h(`card-content`,[_(`&:first-child`,`
 padding-top: var(--n-padding-bottom);
 `)]),f(`content-scrollbar`,`
 display: flex;
 flex-direction: column;
 `,[_(`>`,[h(`scrollbar-container`,[_(`>`,[E])])]),_(`&:first-child >`,[h(`scrollbar-container`,[_(`>`,[h(`card-content`,`
 padding-top: var(--n-padding-bottom);
 `)])])])]),f(`footer`,`
 box-sizing: border-box;
 padding: 0 var(--n-padding-left) var(--n-padding-bottom) var(--n-padding-left);
 font-size: var(--n-font-size);
 `,[_(`&:first-child`,`
 padding-top: var(--n-padding-bottom);
 `)]),f(`action`,`
 background-color: var(--n-action-color);
 padding: var(--n-padding-bottom) var(--n-padding-left);
 border-bottom-left-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `)]),h(`card-cover`,`
 overflow: hidden;
 width: 100%;
 border-radius: var(--n-border-radius) var(--n-border-radius) 0 0;
 `,[_(`img`,`
 display: block;
 width: 100%;
 `)]),l(`bordered`,`
 border: 1px solid var(--n-border-color);
 `,[_(`&:target`,`border-color: var(--n-color-target);`)]),l(`action-segmented`,[_(`>`,[f(`action`,[_(`&:not(:first-child)`,`
 border-top: 1px solid var(--n-border-color);
 `)])])]),l(`content-segmented, content-soft-segmented`,[_(`>`,[h(`card-content`,`
 transition: border-color 0.3s var(--n-bezier);
 `,[_(`&:not(:first-child)`,`
 border-top: 1px solid var(--n-border-color);
 `)]),f(`content-scrollbar`,`
 transition: border-color 0.3s var(--n-bezier);
 `,[_(`&:not(:first-child)`,`
 border-top: 1px solid var(--n-border-color);
 `)])])]),l(`footer-segmented, footer-soft-segmented`,[_(`>`,[f(`footer`,`
 transition: border-color 0.3s var(--n-bezier);
 `,[_(`&:not(:first-child)`,`
 border-top: 1px solid var(--n-border-color);
 `)])])]),l(`embedded`,`
 background-color: var(--n-color-embedded);
 `)]),u(h(`card`,`
 background: var(--n-color-modal);
 `,[l(`embedded`,`
 background-color: var(--n-color-embedded-modal);
 `)])),m(h(`card`,`
 background: var(--n-color-popover);
 `,[l(`embedded`,`
 background-color: var(--n-color-embedded-popover);
 `)]))]),O={title:[String,Function],contentClass:String,contentStyle:[Object,String],contentScrollable:Boolean,headerClass:String,headerStyle:[Object,String],headerExtraClass:String,headerExtraStyle:[Object,String],footerClass:String,footerStyle:[Object,String],embedded:Boolean,segmented:{type:[Boolean,Object],default:!1},size:String,bordered:{type:Boolean,default:!0},closable:Boolean,hoverable:Boolean,role:String,onClose:[Function,Array],tag:{type:String,default:`div`},cover:Function,content:[String,Function],footer:Function,action:Function,headerExtra:Function,closeFocusable:Boolean},k=S(O),A=Object.assign(Object.assign({},r.props),O),j=p({name:`Card`,props:A,slots:Object,setup(t){let n=()=>{let{onClose:n}=t;n&&e(n)},{inlineThemeDisabled:i,mergedClsPrefixRef:a,mergedRtlRef:s,mergedComponentPropsRef:l}=v(t),u=r(`Card`,`-card`,D,T,t,a),d=x(`Card`,s,a),f=y(()=>t.size||l?.value?.Card?.size||`medium`),p=y(()=>{let e=f.value,{self:{color:t,colorModal:n,colorTarget:r,textColor:i,titleTextColor:a,titleFontWeight:s,borderColor:c,actionColor:l,borderRadius:d,lineHeight:p,closeIconColor:m,closeIconColorHover:h,closeIconColorPressed:_,closeColorHover:v,closeColorPressed:y,closeBorderRadius:b,closeIconSize:x,closeSize:S,boxShadow:C,colorPopover:w,colorEmbedded:T,colorEmbeddedModal:E,colorEmbeddedPopover:D,[g(`padding`,e)]:O,[g(`fontSize`,e)]:k,[g(`titleFontSize`,e)]:A},common:{cubicBezierEaseInOut:j}}=u.value,{top:M,left:N,bottom:P}=o(O);return{"--n-bezier":j,"--n-border-radius":d,"--n-color":t,"--n-color-modal":n,"--n-color-popover":w,"--n-color-embedded":T,"--n-color-embedded-modal":E,"--n-color-embedded-popover":D,"--n-color-target":r,"--n-text-color":i,"--n-line-height":p,"--n-action-color":l,"--n-title-text-color":a,"--n-title-font-weight":s,"--n-close-icon-color":m,"--n-close-icon-color-hover":h,"--n-close-icon-color-pressed":_,"--n-close-color-hover":v,"--n-close-color-pressed":y,"--n-border-color":c,"--n-box-shadow":C,"--n-padding-top":M,"--n-padding-bottom":P,"--n-padding-left":N,"--n-font-size":k,"--n-title-font-size":A,"--n-close-size":S,"--n-close-icon-size":x,"--n-close-border-radius":b}}),m=i?c(`card`,y(()=>f.value[0]),p,t):void 0;return{rtlEnabled:d,mergedClsPrefix:a,mergedTheme:u,handleCloseClick:n,cssVars:i?void 0:p,themeClass:m?.themeClass,onRender:m?.onRender}},render(){let{segmented:e,bordered:r,hoverable:o,mergedClsPrefix:c,rtlEnabled:l,onRender:u,embedded:d,tag:f,$slots:p}=this;return u?.(),i(f,{class:[`${c}-card`,this.themeClass,d&&`${c}-card--embedded`,{[`${c}-card--rtl`]:l,[`${c}-card--content-scrollable`]:this.contentScrollable,[`${c}-card--content${typeof e!=`boolean`&&e.content===`soft`?`-soft`:``}-segmented`]:e===!0||e!==!1&&e.content,[`${c}-card--footer${typeof e!=`boolean`&&e.footer===`soft`?`-soft`:``}-segmented`]:e===!0||e!==!1&&e.footer,[`${c}-card--action-segmented`]:e===!0||e!==!1&&e.action,[`${c}-card--bordered`]:r,[`${c}-card--hoverable`]:o}],style:this.cssVars,role:this.role},n(p.cover,e=>{let t=this.cover?a([this.cover()]):e;return t&&i(`div`,{class:`${c}-card-cover`,role:`none`},t)}),n(p.header,e=>{let{title:r}=this,o=r?a(typeof r==`function`?[r()]:[r]):e;return o||this.closable?i(`div`,{class:[`${c}-card-header`,this.headerClass],style:this.headerStyle,role:`heading`},i(`div`,{class:`${c}-card-header__main`,role:`heading`},o),n(p[`header-extra`],e=>{let t=this.headerExtra?a([this.headerExtra()]):e;return t&&i(`div`,{class:[`${c}-card-header__extra`,this.headerExtraClass],style:this.headerExtraStyle},t)}),this.closable&&i(t,{clsPrefix:c,class:`${c}-card-header__close`,onClick:this.handleCloseClick,focusable:this.closeFocusable,absolute:!0})):null}),n(p.default,e=>{let{content:t}=this,n=t?a(typeof t==`function`?[t()]:[t]):e;return n?this.contentScrollable?i(s,{class:`${c}-card__content-scrollbar`,contentClass:[`${c}-card-content`,this.contentClass],contentStyle:this.contentStyle},n):i(`div`,{class:[`${c}-card-content`,this.contentClass],style:this.contentStyle,role:`none`},n):null}),n(p.footer,e=>{let t=this.footer?a([this.footer()]):e;return t&&i(`div`,{class:[`${c}-card__footer`,this.footerClass],style:this.footerStyle,role:`none`},t)}),n(p.action,e=>{let t=this.action?a([this.action()]):e;return t&&i(`div`,{class:`${c}-card__action`,role:`none`},t)}))}});export{w as a,T as i,k as n,O as r,j as t};