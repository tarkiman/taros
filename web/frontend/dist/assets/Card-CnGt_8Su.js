import{Bn as e,K as t,N as n,Nt as r,O as i,Pt as a,Rn as o,Tt as s,U as c,cn as l,dn as u,fn as d,gn as f,hn as p,in as m,jn as h,kt as g,ln as _,mn as v,sn as y,w as b,wt as x}from"./auth-DuOMAfJl.js";import{l as S}from"./light-JSciYvli.js";var C={paddingSmall:`12px 16px 12px`,paddingMedium:`19px 24px 20px`,paddingLarge:`23px 32px 24px`,paddingHuge:`27px 40px 28px`,titleFontSizeSmall:`16px`,titleFontSizeMedium:`18px`,titleFontSizeLarge:`18px`,titleFontSizeHuge:`18px`,closeIconSize:`18px`,closeSize:`22px`};function w(e){let{primaryColor:t,borderRadius:n,lineHeight:r,fontSize:i,cardColor:a,textColor2:o,textColor1:s,dividerColor:c,fontWeightStrong:l,closeIconColor:u,closeIconColorHover:d,closeIconColorPressed:f,closeColorHover:p,closeColorPressed:m,modalColor:h,boxShadow1:g,popoverColor:_,actionColor:v}=e;return Object.assign(Object.assign({},C),{lineHeight:r,color:a,colorModal:h,colorPopover:_,colorTarget:t,colorEmbedded:v,colorEmbeddedModal:v,colorEmbeddedPopover:v,textColor:o,titleTextColor:s,borderColor:c,actionColor:v,titleFontWeight:l,closeColorHover:p,closeColorPressed:m,closeBorderRadius:n,closeIconColor:u,closeIconColorHover:d,closeIconColorPressed:f,fontSizeSmall:i,fontSizeMedium:i,fontSizeLarge:i,fontSizeHuge:i,boxShadow:g,borderRadius:n})}var T={name:`Card`,common:i,self:w},E=_(`card-content`,`
 flex: 1;
 min-width: 0;
 box-sizing: border-box;
 padding: 0 var(--n-padding-left) var(--n-padding-bottom) var(--n-padding-left);
 font-size: var(--n-font-size);
`),D=l([_(`card`,`
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
 `,[y({background:`var(--n-color-modal)`}),d(`hoverable`,[l(`&:hover`,`box-shadow: var(--n-box-shadow);`)]),d(`content-segmented`,[l(`>`,[_(`card-content`,`
 padding-top: var(--n-padding-bottom);
 `),u(`content-scrollbar`,[l(`>`,[_(`scrollbar-container`,[l(`>`,[_(`card-content`,`
 padding-top: var(--n-padding-bottom);
 `)])])])])])]),d(`content-soft-segmented`,[l(`>`,[_(`card-content`,`
 margin: 0 var(--n-padding-left);
 padding: var(--n-padding-bottom) 0;
 `),u(`content-scrollbar`,[l(`>`,[_(`scrollbar-container`,[l(`>`,[_(`card-content`,`
 margin: 0 var(--n-padding-left);
 padding: var(--n-padding-bottom) 0;
 `)])])])])])]),d(`footer-segmented`,[l(`>`,[u(`footer`,`
 padding-top: var(--n-padding-bottom);
 `)])]),d(`footer-soft-segmented`,[l(`>`,[u(`footer`,`
 padding: var(--n-padding-bottom) 0;
 margin: 0 var(--n-padding-left);
 `)])]),l(`>`,[_(`card-header`,`
 box-sizing: border-box;
 display: flex;
 align-items: center;
 font-size: var(--n-title-font-size);
 padding:
 var(--n-padding-top)
 var(--n-padding-left)
 var(--n-padding-bottom)
 var(--n-padding-left);
 `,[u(`main`,`
 font-weight: var(--n-title-font-weight);
 transition: color .3s var(--n-bezier);
 flex: 1;
 min-width: 0;
 color: var(--n-title-text-color);
 `),u(`extra`,`
 display: flex;
 align-items: center;
 font-size: var(--n-font-size);
 font-weight: 400;
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `),u(`close`,`
 margin: 0 0 0 8px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)]),u(`action`,`
 box-sizing: border-box;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 background-clip: padding-box;
 background-color: var(--n-action-color);
 `),E,_(`card-content`,[l(`&:first-child`,`
 padding-top: var(--n-padding-bottom);
 `)]),u(`content-scrollbar`,`
 display: flex;
 flex-direction: column;
 `,[l(`>`,[_(`scrollbar-container`,[l(`>`,[E])])]),l(`&:first-child >`,[_(`scrollbar-container`,[l(`>`,[_(`card-content`,`
 padding-top: var(--n-padding-bottom);
 `)])])])]),u(`footer`,`
 box-sizing: border-box;
 padding: 0 var(--n-padding-left) var(--n-padding-bottom) var(--n-padding-left);
 font-size: var(--n-font-size);
 `,[l(`&:first-child`,`
 padding-top: var(--n-padding-bottom);
 `)]),u(`action`,`
 background-color: var(--n-action-color);
 padding: var(--n-padding-bottom) var(--n-padding-left);
 border-bottom-left-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `)]),_(`card-cover`,`
 overflow: hidden;
 width: 100%;
 border-radius: var(--n-border-radius) var(--n-border-radius) 0 0;
 `,[l(`img`,`
 display: block;
 width: 100%;
 `)]),d(`bordered`,`
 border: 1px solid var(--n-border-color);
 `,[l(`&:target`,`border-color: var(--n-color-target);`)]),d(`action-segmented`,[l(`>`,[u(`action`,[l(`&:not(:first-child)`,`
 border-top: 1px solid var(--n-border-color);
 `)])])]),d(`content-segmented, content-soft-segmented`,[l(`>`,[_(`card-content`,`
 transition: border-color 0.3s var(--n-bezier);
 `,[l(`&:not(:first-child)`,`
 border-top: 1px solid var(--n-border-color);
 `)]),u(`content-scrollbar`,`
 transition: border-color 0.3s var(--n-bezier);
 `,[l(`&:not(:first-child)`,`
 border-top: 1px solid var(--n-border-color);
 `)])])]),d(`footer-segmented, footer-soft-segmented`,[l(`>`,[u(`footer`,`
 transition: border-color 0.3s var(--n-bezier);
 `,[l(`&:not(:first-child)`,`
 border-top: 1px solid var(--n-border-color);
 `)])])]),d(`embedded`,`
 background-color: var(--n-color-embedded);
 `)]),p(_(`card`,`
 background: var(--n-color-modal);
 `,[d(`embedded`,`
 background-color: var(--n-color-embedded-modal);
 `)])),f(_(`card`,`
 background: var(--n-color-popover);
 `,[d(`embedded`,`
 background-color: var(--n-color-embedded-popover);
 `)]))]),O={title:[String,Function],contentClass:String,contentStyle:[Object,String],contentScrollable:Boolean,headerClass:String,headerStyle:[Object,String],headerExtraClass:String,headerExtraStyle:[Object,String],footerClass:String,footerStyle:[Object,String],embedded:Boolean,segmented:{type:[Boolean,Object],default:!1},size:String,bordered:{type:Boolean,default:!0},closable:Boolean,hoverable:Boolean,role:String,onClose:[Function,Array],tag:{type:String,default:`div`},cover:Function,content:[String,Function],footer:Function,action:Function,headerExtra:Function,closeFocusable:Boolean},k=S(O),A=Object.assign(Object.assign({},c.props),O),j=o({name:`Card`,props:A,slots:Object,setup(e){let n=()=>{let{onClose:t}=e;t&&a(t)},{inlineThemeDisabled:r,mergedClsPrefixRef:i,mergedRtlRef:o,mergedComponentPropsRef:l}=s(e),u=c(`Card`,`-card`,D,T,e,i),d=t(`Card`,o,i),f=h(()=>e.size||l?.value?.Card?.size||`medium`),p=h(()=>{let e=f.value,{self:{color:t,colorModal:n,colorTarget:r,textColor:i,titleTextColor:a,titleFontWeight:o,borderColor:s,actionColor:c,borderRadius:l,lineHeight:d,closeIconColor:p,closeIconColorHover:h,closeIconColorPressed:g,closeColorHover:_,closeColorPressed:y,closeBorderRadius:b,closeIconSize:x,closeSize:S,boxShadow:C,colorPopover:w,colorEmbedded:T,colorEmbeddedModal:E,colorEmbeddedPopover:D,[v(`padding`,e)]:O,[v(`fontSize`,e)]:k,[v(`titleFontSize`,e)]:A},common:{cubicBezierEaseInOut:j}}=u.value,{top:M,left:N,bottom:P}=m(O);return{"--n-bezier":j,"--n-border-radius":l,"--n-color":t,"--n-color-modal":n,"--n-color-popover":w,"--n-color-embedded":T,"--n-color-embedded-modal":E,"--n-color-embedded-popover":D,"--n-color-target":r,"--n-text-color":i,"--n-line-height":d,"--n-action-color":c,"--n-title-text-color":a,"--n-title-font-weight":o,"--n-close-icon-color":p,"--n-close-icon-color-hover":h,"--n-close-icon-color-pressed":g,"--n-close-color-hover":_,"--n-close-color-pressed":y,"--n-border-color":s,"--n-box-shadow":C,"--n-padding-top":M,"--n-padding-bottom":P,"--n-padding-left":N,"--n-font-size":k,"--n-title-font-size":A,"--n-close-size":S,"--n-close-icon-size":x,"--n-close-border-radius":b}}),g=r?x(`card`,h(()=>f.value[0]),p,e):void 0;return{rtlEnabled:d,mergedClsPrefix:i,mergedTheme:u,handleCloseClick:n,cssVars:r?void 0:p,themeClass:g?.themeClass,onRender:g?.onRender}},render(){let{segmented:t,bordered:i,hoverable:a,mergedClsPrefix:o,rtlEnabled:s,onRender:c,embedded:l,tag:u,$slots:d}=this;return c?.(),e(u,{class:[`${o}-card`,this.themeClass,l&&`${o}-card--embedded`,{[`${o}-card--rtl`]:s,[`${o}-card--content-scrollable`]:this.contentScrollable,[`${o}-card--content${typeof t!=`boolean`&&t.content===`soft`?`-soft`:``}-segmented`]:t===!0||t!==!1&&t.content,[`${o}-card--footer${typeof t!=`boolean`&&t.footer===`soft`?`-soft`:``}-segmented`]:t===!0||t!==!1&&t.footer,[`${o}-card--action-segmented`]:t===!0||t!==!1&&t.action,[`${o}-card--bordered`]:i,[`${o}-card--hoverable`]:a}],style:this.cssVars,role:this.role},r(d.cover,t=>{let n=this.cover?g([this.cover()]):t;return n&&e(`div`,{class:`${o}-card-cover`,role:`none`},n)}),r(d.header,t=>{let{title:i}=this,a=i?g(typeof i==`function`?[i()]:[i]):t;return a||this.closable?e(`div`,{class:[`${o}-card-header`,this.headerClass],style:this.headerStyle,role:`heading`},e(`div`,{class:`${o}-card-header__main`,role:`heading`},a),r(d[`header-extra`],t=>{let n=this.headerExtra?g([this.headerExtra()]):t;return n&&e(`div`,{class:[`${o}-card-header__extra`,this.headerExtraClass],style:this.headerExtraStyle},n)}),this.closable&&e(n,{clsPrefix:o,class:`${o}-card-header__close`,onClick:this.handleCloseClick,focusable:this.closeFocusable,absolute:!0})):null}),r(d.default,t=>{let{content:n}=this,r=n?g(typeof n==`function`?[n()]:[n]):t;return r?this.contentScrollable?e(b,{class:`${o}-card__content-scrollbar`,contentClass:[`${o}-card-content`,this.contentClass],contentStyle:this.contentStyle},r):e(`div`,{class:[`${o}-card-content`,this.contentClass],style:this.contentStyle,role:`none`},r):null}),r(d.footer,t=>{let n=this.footer?g([this.footer()]):t;return n&&e(`div`,{class:[`${o}-card__footer`,this.footerClass],style:this.footerStyle,role:`none`},n)}),r(d.action,t=>{let n=this.action?g([this.action()]):t;return n&&e(`div`,{class:`${o}-card__action`,role:`none`},n)}))}});export{w as a,T as i,k as n,O as r,j as t};