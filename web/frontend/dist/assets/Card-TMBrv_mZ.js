import{Ct as e,Gt as t,Rt as n,S as r,St as i,T as a,_t as o,bt as s,g as c,gt as l,ht as u,nt as d,qt as f,tt as p,wt as m,yt as h}from"./auth-CDeeRorZ.js";import{O as g,g as _,h as v,i as y,m as b,u as x}from"./_plugin-vue_export-helper-B7M-GU9I.js";import{t as S}from"./light-DToSZKID.js";var C=o(`card-content`,`
 flex: 1;
 min-width: 0;
 box-sizing: border-box;
 padding: 0 var(--n-padding-left) var(--n-padding-bottom) var(--n-padding-left);
 font-size: var(--n-font-size);
`),w=l([o(`card`,`
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
 `,[u({background:`var(--n-color-modal)`}),s(`hoverable`,[l(`&:hover`,`box-shadow: var(--n-box-shadow);`)]),s(`content-segmented`,[l(`>`,[o(`card-content`,`
 padding-top: var(--n-padding-bottom);
 `),h(`content-scrollbar`,[l(`>`,[o(`scrollbar-container`,[l(`>`,[o(`card-content`,`
 padding-top: var(--n-padding-bottom);
 `)])])])])])]),s(`content-soft-segmented`,[l(`>`,[o(`card-content`,`
 margin: 0 var(--n-padding-left);
 padding: var(--n-padding-bottom) 0;
 `),h(`content-scrollbar`,[l(`>`,[o(`scrollbar-container`,[l(`>`,[o(`card-content`,`
 margin: 0 var(--n-padding-left);
 padding: var(--n-padding-bottom) 0;
 `)])])])])])]),s(`footer-segmented`,[l(`>`,[h(`footer`,`
 padding-top: var(--n-padding-bottom);
 `)])]),s(`footer-soft-segmented`,[l(`>`,[h(`footer`,`
 padding: var(--n-padding-bottom) 0;
 margin: 0 var(--n-padding-left);
 `)])]),l(`>`,[o(`card-header`,`
 box-sizing: border-box;
 display: flex;
 align-items: center;
 font-size: var(--n-title-font-size);
 padding:
 var(--n-padding-top)
 var(--n-padding-left)
 var(--n-padding-bottom)
 var(--n-padding-left);
 `,[h(`main`,`
 font-weight: var(--n-title-font-weight);
 transition: color .3s var(--n-bezier);
 flex: 1;
 min-width: 0;
 color: var(--n-title-text-color);
 `),h(`extra`,`
 display: flex;
 align-items: center;
 font-size: var(--n-font-size);
 font-weight: 400;
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `),h(`close`,`
 margin: 0 0 0 8px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)]),h(`action`,`
 box-sizing: border-box;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 background-clip: padding-box;
 background-color: var(--n-action-color);
 `),C,o(`card-content`,[l(`&:first-child`,`
 padding-top: var(--n-padding-bottom);
 `)]),h(`content-scrollbar`,`
 display: flex;
 flex-direction: column;
 `,[l(`>`,[o(`scrollbar-container`,[l(`>`,[C])])]),l(`&:first-child >`,[o(`scrollbar-container`,[l(`>`,[o(`card-content`,`
 padding-top: var(--n-padding-bottom);
 `)])])])]),h(`footer`,`
 box-sizing: border-box;
 padding: 0 var(--n-padding-left) var(--n-padding-bottom) var(--n-padding-left);
 font-size: var(--n-font-size);
 `,[l(`&:first-child`,`
 padding-top: var(--n-padding-bottom);
 `)]),h(`action`,`
 background-color: var(--n-action-color);
 padding: var(--n-padding-bottom) var(--n-padding-left);
 border-bottom-left-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `)]),o(`card-cover`,`
 overflow: hidden;
 width: 100%;
 border-radius: var(--n-border-radius) var(--n-border-radius) 0 0;
 `,[l(`img`,`
 display: block;
 width: 100%;
 `)]),s(`bordered`,`
 border: 1px solid var(--n-border-color);
 `,[l(`&:target`,`border-color: var(--n-color-target);`)]),s(`action-segmented`,[l(`>`,[h(`action`,[l(`&:not(:first-child)`,`
 border-top: 1px solid var(--n-border-color);
 `)])])]),s(`content-segmented, content-soft-segmented`,[l(`>`,[o(`card-content`,`
 transition: border-color 0.3s var(--n-bezier);
 `,[l(`&:not(:first-child)`,`
 border-top: 1px solid var(--n-border-color);
 `)]),h(`content-scrollbar`,`
 transition: border-color 0.3s var(--n-bezier);
 `,[l(`&:not(:first-child)`,`
 border-top: 1px solid var(--n-border-color);
 `)])])]),s(`footer-segmented, footer-soft-segmented`,[l(`>`,[h(`footer`,`
 transition: border-color 0.3s var(--n-bezier);
 `,[l(`&:not(:first-child)`,`
 border-top: 1px solid var(--n-border-color);
 `)])])]),s(`embedded`,`
 background-color: var(--n-color-embedded);
 `)]),e(o(`card`,`
 background: var(--n-color-modal);
 `,[s(`embedded`,`
 background-color: var(--n-color-embedded-modal);
 `)])),m(o(`card`,`
 background: var(--n-color-popover);
 `,[s(`embedded`,`
 background-color: var(--n-color-embedded-popover);
 `)]))]),T={title:[String,Function],contentClass:String,contentStyle:[Object,String],contentScrollable:Boolean,headerClass:String,headerStyle:[Object,String],headerExtraClass:String,headerExtraStyle:[Object,String],footerClass:String,footerStyle:[Object,String],embedded:Boolean,segmented:{type:[Boolean,Object],default:!1},size:String,bordered:{type:Boolean,default:!0},closable:Boolean,hoverable:Boolean,role:String,onClose:[Function,Array],tag:{type:String,default:`div`},cover:Function,content:[String,Function],footer:Function,action:Function,headerExtra:Function,closeFocusable:Boolean};v(T);var E=Object.assign(Object.assign({},r.props),T),D=t({name:`Card`,props:E,slots:Object,setup(e){let t=()=>{let{onClose:t}=e;t&&_(t)},{inlineThemeDisabled:o,mergedClsPrefixRef:s,mergedRtlRef:c,mergedComponentPropsRef:l}=d(e),u=r(`Card`,`-card`,w,S,e,s),f=a(`Card`,c,s),m=n(()=>e.size||l?.value?.Card?.size||`medium`),h=n(()=>{let e=m.value,{self:{color:t,colorModal:n,colorTarget:r,textColor:a,titleTextColor:o,titleFontWeight:s,borderColor:c,actionColor:l,borderRadius:d,lineHeight:f,closeIconColor:p,closeIconColorHover:h,closeIconColorPressed:_,closeColorHover:v,closeColorPressed:y,closeBorderRadius:b,closeIconSize:x,closeSize:S,boxShadow:C,colorPopover:w,colorEmbedded:T,colorEmbeddedModal:E,colorEmbeddedPopover:D,[i(`padding`,e)]:O,[i(`fontSize`,e)]:k,[i(`titleFontSize`,e)]:A},common:{cubicBezierEaseInOut:j}}=u.value,{top:M,left:N,bottom:P}=g(O);return{"--n-bezier":j,"--n-border-radius":d,"--n-color":t,"--n-color-modal":n,"--n-color-popover":w,"--n-color-embedded":T,"--n-color-embedded-modal":E,"--n-color-embedded-popover":D,"--n-color-target":r,"--n-text-color":a,"--n-line-height":f,"--n-action-color":l,"--n-title-text-color":o,"--n-title-font-weight":s,"--n-close-icon-color":p,"--n-close-icon-color-hover":h,"--n-close-icon-color-pressed":_,"--n-close-color-hover":v,"--n-close-color-pressed":y,"--n-border-color":c,"--n-box-shadow":C,"--n-padding-top":M,"--n-padding-bottom":P,"--n-padding-left":N,"--n-font-size":k,"--n-title-font-size":A,"--n-close-size":S,"--n-close-icon-size":x,"--n-close-border-radius":b}}),v=o?p(`card`,n(()=>m.value[0]),h,e):void 0;return{rtlEnabled:f,mergedClsPrefix:s,mergedTheme:u,handleCloseClick:t,cssVars:o?void 0:h,themeClass:v?.themeClass,onRender:v?.onRender}},render(){let{segmented:e,bordered:t,hoverable:n,mergedClsPrefix:r,rtlEnabled:i,onRender:a,embedded:o,tag:s,$slots:l}=this;return a?.(),f(s,{class:[`${r}-card`,this.themeClass,o&&`${r}-card--embedded`,{[`${r}-card--rtl`]:i,[`${r}-card--content-scrollable`]:this.contentScrollable,[`${r}-card--content${typeof e!=`boolean`&&e.content===`soft`?`-soft`:``}-segmented`]:e===!0||e!==!1&&e.content,[`${r}-card--footer${typeof e!=`boolean`&&e.footer===`soft`?`-soft`:``}-segmented`]:e===!0||e!==!1&&e.footer,[`${r}-card--action-segmented`]:e===!0||e!==!1&&e.action,[`${r}-card--bordered`]:t,[`${r}-card--hoverable`]:n}],style:this.cssVars,role:this.role},b(l.cover,e=>{let t=this.cover?x([this.cover()]):e;return t&&f(`div`,{class:`${r}-card-cover`,role:`none`},t)}),b(l.header,e=>{let{title:t}=this,n=t?x(typeof t==`function`?[t()]:[t]):e;return n||this.closable?f(`div`,{class:[`${r}-card-header`,this.headerClass],style:this.headerStyle,role:`heading`},f(`div`,{class:`${r}-card-header__main`,role:`heading`},n),b(l[`header-extra`],e=>{let t=this.headerExtra?x([this.headerExtra()]):e;return t&&f(`div`,{class:[`${r}-card-header__extra`,this.headerExtraClass],style:this.headerExtraStyle},t)}),this.closable&&f(c,{clsPrefix:r,class:`${r}-card-header__close`,onClick:this.handleCloseClick,focusable:this.closeFocusable,absolute:!0})):null}),b(l.default,e=>{let{content:t}=this,n=t?x(typeof t==`function`?[t()]:[t]):e;return n?this.contentScrollable?f(y,{class:`${r}-card__content-scrollbar`,contentClass:[`${r}-card-content`,this.contentClass],contentStyle:this.contentStyle},n):f(`div`,{class:[`${r}-card-content`,this.contentClass],style:this.contentStyle,role:`none`},n):null}),b(l.footer,e=>{let t=this.footer?x([this.footer()]):e;return t&&f(`div`,{class:[`${r}-card__footer`,this.footerClass],style:this.footerStyle,role:`none`},t)}),b(l.action,e=>{let t=this.action?x([this.action()]):e;return t&&f(`div`,{class:`${r}-card__action`,role:`none`},t)}))}});export{D as t};