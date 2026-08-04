import{Bt as e,C as t,E as n,Et as r,St as i,Tt as a,Yt as o,_ as s,_t as c,nt as l,qt as u,rt as d,vt as f,wt as p,xt as m,yt as h}from"./auth-Trpo-0ON.js";import{O as g,g as _,h as v,i as y,m as b,u as x}from"./_plugin-vue_export-helper-C4Zs982g.js";import{t as S}from"./light-Dcshps2h.js";var C=h(`card-content`,`
 flex: 1;
 min-width: 0;
 box-sizing: border-box;
 padding: 0 var(--n-padding-left) var(--n-padding-bottom) var(--n-padding-left);
 font-size: var(--n-font-size);
`),w=f([h(`card`,`
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
 `,[c({background:`var(--n-color-modal)`}),i(`hoverable`,[f(`&:hover`,`box-shadow: var(--n-box-shadow);`)]),i(`content-segmented`,[f(`>`,[h(`card-content`,`
 padding-top: var(--n-padding-bottom);
 `),m(`content-scrollbar`,[f(`>`,[h(`scrollbar-container`,[f(`>`,[h(`card-content`,`
 padding-top: var(--n-padding-bottom);
 `)])])])])])]),i(`content-soft-segmented`,[f(`>`,[h(`card-content`,`
 margin: 0 var(--n-padding-left);
 padding: var(--n-padding-bottom) 0;
 `),m(`content-scrollbar`,[f(`>`,[h(`scrollbar-container`,[f(`>`,[h(`card-content`,`
 margin: 0 var(--n-padding-left);
 padding: var(--n-padding-bottom) 0;
 `)])])])])])]),i(`footer-segmented`,[f(`>`,[m(`footer`,`
 padding-top: var(--n-padding-bottom);
 `)])]),i(`footer-soft-segmented`,[f(`>`,[m(`footer`,`
 padding: var(--n-padding-bottom) 0;
 margin: 0 var(--n-padding-left);
 `)])]),f(`>`,[h(`card-header`,`
 box-sizing: border-box;
 display: flex;
 align-items: center;
 font-size: var(--n-title-font-size);
 padding:
 var(--n-padding-top)
 var(--n-padding-left)
 var(--n-padding-bottom)
 var(--n-padding-left);
 `,[m(`main`,`
 font-weight: var(--n-title-font-weight);
 transition: color .3s var(--n-bezier);
 flex: 1;
 min-width: 0;
 color: var(--n-title-text-color);
 `),m(`extra`,`
 display: flex;
 align-items: center;
 font-size: var(--n-font-size);
 font-weight: 400;
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `),m(`close`,`
 margin: 0 0 0 8px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)]),m(`action`,`
 box-sizing: border-box;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 background-clip: padding-box;
 background-color: var(--n-action-color);
 `),C,h(`card-content`,[f(`&:first-child`,`
 padding-top: var(--n-padding-bottom);
 `)]),m(`content-scrollbar`,`
 display: flex;
 flex-direction: column;
 `,[f(`>`,[h(`scrollbar-container`,[f(`>`,[C])])]),f(`&:first-child >`,[h(`scrollbar-container`,[f(`>`,[h(`card-content`,`
 padding-top: var(--n-padding-bottom);
 `)])])])]),m(`footer`,`
 box-sizing: border-box;
 padding: 0 var(--n-padding-left) var(--n-padding-bottom) var(--n-padding-left);
 font-size: var(--n-font-size);
 `,[f(`&:first-child`,`
 padding-top: var(--n-padding-bottom);
 `)]),m(`action`,`
 background-color: var(--n-action-color);
 padding: var(--n-padding-bottom) var(--n-padding-left);
 border-bottom-left-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `)]),h(`card-cover`,`
 overflow: hidden;
 width: 100%;
 border-radius: var(--n-border-radius) var(--n-border-radius) 0 0;
 `,[f(`img`,`
 display: block;
 width: 100%;
 `)]),i(`bordered`,`
 border: 1px solid var(--n-border-color);
 `,[f(`&:target`,`border-color: var(--n-color-target);`)]),i(`action-segmented`,[f(`>`,[m(`action`,[f(`&:not(:first-child)`,`
 border-top: 1px solid var(--n-border-color);
 `)])])]),i(`content-segmented, content-soft-segmented`,[f(`>`,[h(`card-content`,`
 transition: border-color 0.3s var(--n-bezier);
 `,[f(`&:not(:first-child)`,`
 border-top: 1px solid var(--n-border-color);
 `)]),m(`content-scrollbar`,`
 transition: border-color 0.3s var(--n-bezier);
 `,[f(`&:not(:first-child)`,`
 border-top: 1px solid var(--n-border-color);
 `)])])]),i(`footer-segmented, footer-soft-segmented`,[f(`>`,[m(`footer`,`
 transition: border-color 0.3s var(--n-bezier);
 `,[f(`&:not(:first-child)`,`
 border-top: 1px solid var(--n-border-color);
 `)])])]),i(`embedded`,`
 background-color: var(--n-color-embedded);
 `)]),a(h(`card`,`
 background: var(--n-color-modal);
 `,[i(`embedded`,`
 background-color: var(--n-color-embedded-modal);
 `)])),r(h(`card`,`
 background: var(--n-color-popover);
 `,[i(`embedded`,`
 background-color: var(--n-color-embedded-popover);
 `)]))]),T={title:[String,Function],contentClass:String,contentStyle:[Object,String],contentScrollable:Boolean,headerClass:String,headerStyle:[Object,String],headerExtraClass:String,headerExtraStyle:[Object,String],footerClass:String,footerStyle:[Object,String],embedded:Boolean,segmented:{type:[Boolean,Object],default:!1},size:String,bordered:{type:Boolean,default:!0},closable:Boolean,hoverable:Boolean,role:String,onClose:[Function,Array],tag:{type:String,default:`div`},cover:Function,content:[String,Function],footer:Function,action:Function,headerExtra:Function,closeFocusable:Boolean},E=v(T),D=Object.assign(Object.assign({},t.props),T),O=u({name:`Card`,props:D,slots:Object,setup(r){let i=()=>{let{onClose:e}=r;e&&_(e)},{inlineThemeDisabled:a,mergedClsPrefixRef:o,mergedRtlRef:s,mergedComponentPropsRef:c}=d(r),u=t(`Card`,`-card`,w,S,r,o),f=n(`Card`,s,o),m=e(()=>r.size||c?.value?.Card?.size||`medium`),h=e(()=>{let e=m.value,{self:{color:t,colorModal:n,colorTarget:r,textColor:i,titleTextColor:a,titleFontWeight:o,borderColor:s,actionColor:c,borderRadius:l,lineHeight:d,closeIconColor:f,closeIconColorHover:h,closeIconColorPressed:_,closeColorHover:v,closeColorPressed:y,closeBorderRadius:b,closeIconSize:x,closeSize:S,boxShadow:C,colorPopover:w,colorEmbedded:T,colorEmbeddedModal:E,colorEmbeddedPopover:D,[p(`padding`,e)]:O,[p(`fontSize`,e)]:k,[p(`titleFontSize`,e)]:A},common:{cubicBezierEaseInOut:j}}=u.value,{top:M,left:N,bottom:P}=g(O);return{"--n-bezier":j,"--n-border-radius":l,"--n-color":t,"--n-color-modal":n,"--n-color-popover":w,"--n-color-embedded":T,"--n-color-embedded-modal":E,"--n-color-embedded-popover":D,"--n-color-target":r,"--n-text-color":i,"--n-line-height":d,"--n-action-color":c,"--n-title-text-color":a,"--n-title-font-weight":o,"--n-close-icon-color":f,"--n-close-icon-color-hover":h,"--n-close-icon-color-pressed":_,"--n-close-color-hover":v,"--n-close-color-pressed":y,"--n-border-color":s,"--n-box-shadow":C,"--n-padding-top":M,"--n-padding-bottom":P,"--n-padding-left":N,"--n-font-size":k,"--n-title-font-size":A,"--n-close-size":S,"--n-close-icon-size":x,"--n-close-border-radius":b}}),v=a?l(`card`,e(()=>m.value[0]),h,r):void 0;return{rtlEnabled:f,mergedClsPrefix:o,mergedTheme:u,handleCloseClick:i,cssVars:a?void 0:h,themeClass:v?.themeClass,onRender:v?.onRender}},render(){let{segmented:e,bordered:t,hoverable:n,mergedClsPrefix:r,rtlEnabled:i,onRender:a,embedded:c,tag:l,$slots:u}=this;return a?.(),o(l,{class:[`${r}-card`,this.themeClass,c&&`${r}-card--embedded`,{[`${r}-card--rtl`]:i,[`${r}-card--content-scrollable`]:this.contentScrollable,[`${r}-card--content${typeof e!=`boolean`&&e.content===`soft`?`-soft`:``}-segmented`]:e===!0||e!==!1&&e.content,[`${r}-card--footer${typeof e!=`boolean`&&e.footer===`soft`?`-soft`:``}-segmented`]:e===!0||e!==!1&&e.footer,[`${r}-card--action-segmented`]:e===!0||e!==!1&&e.action,[`${r}-card--bordered`]:t,[`${r}-card--hoverable`]:n}],style:this.cssVars,role:this.role},b(u.cover,e=>{let t=this.cover?x([this.cover()]):e;return t&&o(`div`,{class:`${r}-card-cover`,role:`none`},t)}),b(u.header,e=>{let{title:t}=this,n=t?x(typeof t==`function`?[t()]:[t]):e;return n||this.closable?o(`div`,{class:[`${r}-card-header`,this.headerClass],style:this.headerStyle,role:`heading`},o(`div`,{class:`${r}-card-header__main`,role:`heading`},n),b(u[`header-extra`],e=>{let t=this.headerExtra?x([this.headerExtra()]):e;return t&&o(`div`,{class:[`${r}-card-header__extra`,this.headerExtraClass],style:this.headerExtraStyle},t)}),this.closable&&o(s,{clsPrefix:r,class:`${r}-card-header__close`,onClick:this.handleCloseClick,focusable:this.closeFocusable,absolute:!0})):null}),b(u.default,e=>{let{content:t}=this,n=t?x(typeof t==`function`?[t()]:[t]):e;return n?this.contentScrollable?o(y,{class:`${r}-card__content-scrollbar`,contentClass:[`${r}-card-content`,this.contentClass],contentStyle:this.contentStyle},n):o(`div`,{class:[`${r}-card-content`,this.contentClass],style:this.contentStyle,role:`none`},n):null}),b(u.footer,e=>{let t=this.footer?x([this.footer()]):e;return t&&o(`div`,{class:[`${r}-card__footer`,this.footerClass],style:this.footerStyle,role:`none`},t)}),b(u.action,e=>{let t=this.action?x([this.action()]):e;return t&&o(`div`,{class:`${r}-card__action`,role:`none`},t)}))}});export{E as n,T as r,O as t};