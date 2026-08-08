import{Bn as e,Gt as t,K as n,N as r,Nt as i,O as a,Pt as o,Qn as s,Qt as c,Rn as l,Tt as u,U as d,cn as f,dn as p,fn as m,in as h,jn as g,ln as _,mn as v,pn as y,pr as b,ur as x,wt as S,zt as C}from"./auth-DuOMAfJl.js";import{t as w}from"./_common-BWSN0c8x.js";function T(e){let{textColor2:t,primaryColorHover:n,primaryColorPressed:r,primaryColor:i,infoColor:a,successColor:o,warningColor:s,errorColor:l,baseColor:u,borderColor:d,opacityDisabled:f,tagColor:p,closeIconColor:m,closeIconColorHover:h,closeIconColorPressed:g,borderRadiusSmall:_,fontSizeMini:v,fontSizeTiny:y,fontSizeSmall:b,fontSizeMedium:x,heightMini:S,heightTiny:C,heightSmall:T,heightMedium:E,closeColorHover:D,closeColorPressed:O,buttonColor2Hover:k,buttonColor2Pressed:A,fontWeightStrong:j}=e;return Object.assign(Object.assign({},w),{closeBorderRadius:_,heightTiny:S,heightSmall:C,heightMedium:T,heightLarge:E,borderRadius:_,opacityDisabled:f,fontSizeTiny:v,fontSizeSmall:y,fontSizeMedium:b,fontSizeLarge:x,fontWeightStrong:j,textColorCheckable:t,textColorHoverCheckable:t,textColorPressedCheckable:t,textColorChecked:u,colorCheckable:`#0000`,colorHoverCheckable:k,colorPressedCheckable:A,colorChecked:i,colorCheckedHover:n,colorCheckedPressed:r,border:`1px solid ${d}`,textColor:t,color:p,colorBordered:`rgb(250, 250, 252)`,closeIconColor:m,closeIconColorHover:h,closeIconColorPressed:g,closeColorHover:D,closeColorPressed:O,borderPrimary:`1px solid ${c(i,{alpha:.3})}`,textColorPrimary:i,colorPrimary:c(i,{alpha:.12}),colorBorderedPrimary:c(i,{alpha:.1}),closeIconColorPrimary:i,closeIconColorHoverPrimary:i,closeIconColorPressedPrimary:i,closeColorHoverPrimary:c(i,{alpha:.12}),closeColorPressedPrimary:c(i,{alpha:.18}),borderInfo:`1px solid ${c(a,{alpha:.3})}`,textColorInfo:a,colorInfo:c(a,{alpha:.12}),colorBorderedInfo:c(a,{alpha:.1}),closeIconColorInfo:a,closeIconColorHoverInfo:a,closeIconColorPressedInfo:a,closeColorHoverInfo:c(a,{alpha:.12}),closeColorPressedInfo:c(a,{alpha:.18}),borderSuccess:`1px solid ${c(o,{alpha:.3})}`,textColorSuccess:o,colorSuccess:c(o,{alpha:.12}),colorBorderedSuccess:c(o,{alpha:.1}),closeIconColorSuccess:o,closeIconColorHoverSuccess:o,closeIconColorPressedSuccess:o,closeColorHoverSuccess:c(o,{alpha:.12}),closeColorPressedSuccess:c(o,{alpha:.18}),borderWarning:`1px solid ${c(s,{alpha:.35})}`,textColorWarning:s,colorWarning:c(s,{alpha:.15}),colorBorderedWarning:c(s,{alpha:.12}),closeIconColorWarning:s,closeIconColorHoverWarning:s,closeIconColorPressedWarning:s,closeColorHoverWarning:c(s,{alpha:.12}),closeColorPressedWarning:c(s,{alpha:.18}),borderError:`1px solid ${c(l,{alpha:.23})}`,textColorError:l,colorError:c(l,{alpha:.1}),colorBorderedError:c(l,{alpha:.08}),closeIconColorError:l,closeIconColorHoverError:l,closeIconColorPressedError:l,closeColorHoverError:c(l,{alpha:.12}),closeColorPressedError:c(l,{alpha:.18})})}var E={name:`Tag`,common:a,self:T},D={color:Object,type:{type:String,default:`default`},round:Boolean,size:String,closable:Boolean,disabled:{type:Boolean,default:void 0}},O=_(`tag`,`
 --n-close-margin: var(--n-close-margin-top) var(--n-close-margin-right) var(--n-close-margin-bottom) var(--n-close-margin-left);
 white-space: nowrap;
 position: relative;
 box-sizing: border-box;
 cursor: default;
 display: inline-flex;
 align-items: center;
 flex-wrap: nowrap;
 padding: var(--n-padding);
 border-radius: var(--n-border-radius);
 color: var(--n-text-color);
 background-color: var(--n-color);
 transition: 
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 line-height: 1;
 height: var(--n-height);
 font-size: var(--n-font-size);
`,[m(`strong`,`
 font-weight: var(--n-font-weight-strong);
 `),p(`border`,`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
 border: var(--n-border);
 transition: border-color .3s var(--n-bezier);
 `),p(`icon`,`
 display: flex;
 margin: 0 4px 0 0;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 font-size: var(--n-avatar-size-override);
 `),p(`avatar`,`
 display: flex;
 margin: 0 6px 0 0;
 `),p(`close`,`
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),m(`round`,`
 padding: 0 calc(var(--n-height) / 3);
 border-radius: calc(var(--n-height) / 2);
 `,[p(`icon`,`
 margin: 0 4px 0 calc((var(--n-height) - 8px) / -2);
 `),p(`avatar`,`
 margin: 0 6px 0 calc((var(--n-height) - 8px) / -2);
 `),m(`closable`,`
 padding: 0 calc(var(--n-height) / 4) 0 calc(var(--n-height) / 3);
 `)]),m(`icon, avatar`,[m(`round`,`
 padding: 0 calc(var(--n-height) / 3) 0 calc(var(--n-height) / 2);
 `)]),m(`disabled`,`
 cursor: not-allowed !important;
 opacity: var(--n-opacity-disabled);
 `),m(`checkable`,`
 cursor: pointer;
 box-shadow: none;
 color: var(--n-text-color-checkable);
 background-color: var(--n-color-checkable);
 `,[y(`disabled`,[f(`&:hover`,`background-color: var(--n-color-hover-checkable);`,[y(`checked`,`color: var(--n-text-color-hover-checkable);`)]),f(`&:active`,`background-color: var(--n-color-pressed-checkable);`,[y(`checked`,`color: var(--n-text-color-pressed-checkable);`)])]),m(`checked`,`
 color: var(--n-text-color-checked);
 background-color: var(--n-color-checked);
 `,[y(`disabled`,[f(`&:hover`,`background-color: var(--n-color-checked-hover);`),f(`&:active`,`background-color: var(--n-color-checked-pressed);`)])])])]),k=Object.assign(Object.assign(Object.assign({},d.props),D),{bordered:{type:Boolean,default:void 0},checked:Boolean,checkable:Boolean,strong:Boolean,triggerClickOnClose:Boolean,onClose:[Array,Function],onMouseenter:Function,onMouseleave:Function,"onUpdate:checked":Function,onUpdateChecked:Function,internalCloseFocusable:{type:Boolean,default:!0},internalCloseIsButtonTag:{type:Boolean,default:!0},onCheckedChange:Function}),A=t(`n-tag`),j=l({name:`Tag`,props:k,slots:Object,setup(e){let t=x(null),{mergedBorderedRef:r,mergedClsPrefixRef:i,inlineThemeDisabled:a,mergedRtlRef:c,mergedComponentPropsRef:l}=u(e),f=g(()=>e.size||l?.value?.Tag?.size||`medium`),p=d(`Tag`,`-tag`,O,E,e,i);s(A,{roundRef:b(e,`round`)});function m(){if(!e.disabled&&e.checkable){let{checked:t,onCheckedChange:n,onUpdateChecked:r,"onUpdate:checked":i}=e;r&&r(!t),i&&i(!t),n&&n(!t)}}function _(t){if(e.triggerClickOnClose||t.stopPropagation(),!e.disabled){let{onClose:n}=e;n&&o(n,t)}}let y={setTextContent(e){let{value:n}=t;n&&(n.textContent=e)}},w=n(`Tag`,c,i),T=g(()=>{let{type:t,color:{color:n,textColor:i}={}}=e,a=f.value,{common:{cubicBezierEaseInOut:o},self:{padding:s,closeMargin:c,borderRadius:l,opacityDisabled:u,textColorCheckable:d,textColorHoverCheckable:m,textColorPressedCheckable:g,textColorChecked:_,colorCheckable:y,colorHoverCheckable:b,colorPressedCheckable:x,colorChecked:S,colorCheckedHover:C,colorCheckedPressed:w,closeBorderRadius:T,fontWeightStrong:E,[v(`colorBordered`,t)]:D,[v(`closeSize`,a)]:O,[v(`closeIconSize`,a)]:k,[v(`fontSize`,a)]:A,[v(`height`,a)]:j,[v(`color`,t)]:M,[v(`textColor`,t)]:N,[v(`border`,t)]:P,[v(`closeIconColor`,t)]:F,[v(`closeIconColorHover`,t)]:I,[v(`closeIconColorPressed`,t)]:L,[v(`closeColorHover`,t)]:R,[v(`closeColorPressed`,t)]:z}}=p.value,B=h(c);return{"--n-font-weight-strong":E,"--n-avatar-size-override":`calc(${j} - 8px)`,"--n-bezier":o,"--n-border-radius":l,"--n-border":P,"--n-close-icon-size":k,"--n-close-color-pressed":z,"--n-close-color-hover":R,"--n-close-border-radius":T,"--n-close-icon-color":F,"--n-close-icon-color-hover":I,"--n-close-icon-color-pressed":L,"--n-close-icon-color-disabled":F,"--n-close-margin-top":B.top,"--n-close-margin-right":B.right,"--n-close-margin-bottom":B.bottom,"--n-close-margin-left":B.left,"--n-close-size":O,"--n-color":n||(r.value?D:M),"--n-color-checkable":y,"--n-color-checked":S,"--n-color-checked-hover":C,"--n-color-checked-pressed":w,"--n-color-hover-checkable":b,"--n-color-pressed-checkable":x,"--n-font-size":A,"--n-height":j,"--n-opacity-disabled":u,"--n-padding":s,"--n-text-color":i||N,"--n-text-color-checkable":d,"--n-text-color-checked":_,"--n-text-color-hover-checkable":m,"--n-text-color-pressed-checkable":g}}),D=a?S(`tag`,g(()=>{let t=``,{type:n,color:{color:i,textColor:a}={}}=e;return t+=n[0],t+=f.value[0],i&&(t+=`a${C(i)}`),a&&(t+=`b${C(a)}`),r.value&&(t+=`c`),t}),T,e):void 0;return Object.assign(Object.assign({},y),{rtlEnabled:w,mergedClsPrefix:i,contentRef:t,mergedBordered:r,handleClick:m,handleCloseClick:_,cssVars:a?void 0:T,themeClass:D?.themeClass,onRender:D?.onRender})},render(){var t;let{mergedClsPrefix:n,rtlEnabled:a,closable:o,color:{borderColor:s}={},round:c,onRender:l,$slots:u}=this;l?.();let d=i(u.avatar,t=>t&&e(`div`,{class:`${n}-tag__avatar`},t)),f=i(u.icon,t=>t&&e(`div`,{class:`${n}-tag__icon`},t));return e(`div`,{class:[`${n}-tag`,this.themeClass,{[`${n}-tag--rtl`]:a,[`${n}-tag--strong`]:this.strong,[`${n}-tag--disabled`]:this.disabled,[`${n}-tag--checkable`]:this.checkable,[`${n}-tag--checked`]:this.checkable&&this.checked,[`${n}-tag--round`]:c,[`${n}-tag--avatar`]:d,[`${n}-tag--icon`]:f,[`${n}-tag--closable`]:o}],style:this.cssVars,onClick:this.handleClick,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},f||d,e(`span`,{class:`${n}-tag__content`,ref:`contentRef`},(t=this.$slots).default?.call(t)),!this.checkable&&o?e(r,{clsPrefix:n,class:`${n}-tag__close`,disabled:this.disabled,onClick:this.handleCloseClick,focusable:this.internalCloseFocusable,round:c,isButtonTag:this.internalCloseIsButtonTag,absolute:!0}):null,!this.checkable&&this.mergedBordered?e(`div`,{class:`${n}-tag__border`,style:{borderColor:s}}):null)}});export{j as t};