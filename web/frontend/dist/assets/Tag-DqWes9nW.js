import{$n as e,Bn as t,Gt as n,K as r,N as i,Nt as a,O as o,Pt as s,Qt as c,Rn as l,Tt as u,U as d,cn as f,dn as p,dr as m,fn as h,in as g,jn as _,ln as v,mn as y,mr as b,pn as x,wt as S,zt as C}from"./auth-DqoAZwsL.js";import{t as w}from"./_common-BWSN0c8x.js";function T(e){let{textColor2:t,primaryColorHover:n,primaryColorPressed:r,primaryColor:i,infoColor:a,successColor:o,warningColor:s,errorColor:l,baseColor:u,borderColor:d,opacityDisabled:f,tagColor:p,closeIconColor:m,closeIconColorHover:h,closeIconColorPressed:g,borderRadiusSmall:_,fontSizeMini:v,fontSizeTiny:y,fontSizeSmall:b,fontSizeMedium:x,heightMini:S,heightTiny:C,heightSmall:T,heightMedium:E,closeColorHover:D,closeColorPressed:O,buttonColor2Hover:k,buttonColor2Pressed:A,fontWeightStrong:j}=e;return Object.assign(Object.assign({},w),{closeBorderRadius:_,heightTiny:S,heightSmall:C,heightMedium:T,heightLarge:E,borderRadius:_,opacityDisabled:f,fontSizeTiny:v,fontSizeSmall:y,fontSizeMedium:b,fontSizeLarge:x,fontWeightStrong:j,textColorCheckable:t,textColorHoverCheckable:t,textColorPressedCheckable:t,textColorChecked:u,colorCheckable:`#0000`,colorHoverCheckable:k,colorPressedCheckable:A,colorChecked:i,colorCheckedHover:n,colorCheckedPressed:r,border:`1px solid ${d}`,textColor:t,color:p,colorBordered:`rgb(250, 250, 252)`,closeIconColor:m,closeIconColorHover:h,closeIconColorPressed:g,closeColorHover:D,closeColorPressed:O,borderPrimary:`1px solid ${c(i,{alpha:.3})}`,textColorPrimary:i,colorPrimary:c(i,{alpha:.12}),colorBorderedPrimary:c(i,{alpha:.1}),closeIconColorPrimary:i,closeIconColorHoverPrimary:i,closeIconColorPressedPrimary:i,closeColorHoverPrimary:c(i,{alpha:.12}),closeColorPressedPrimary:c(i,{alpha:.18}),borderInfo:`1px solid ${c(a,{alpha:.3})}`,textColorInfo:a,colorInfo:c(a,{alpha:.12}),colorBorderedInfo:c(a,{alpha:.1}),closeIconColorInfo:a,closeIconColorHoverInfo:a,closeIconColorPressedInfo:a,closeColorHoverInfo:c(a,{alpha:.12}),closeColorPressedInfo:c(a,{alpha:.18}),borderSuccess:`1px solid ${c(o,{alpha:.3})}`,textColorSuccess:o,colorSuccess:c(o,{alpha:.12}),colorBorderedSuccess:c(o,{alpha:.1}),closeIconColorSuccess:o,closeIconColorHoverSuccess:o,closeIconColorPressedSuccess:o,closeColorHoverSuccess:c(o,{alpha:.12}),closeColorPressedSuccess:c(o,{alpha:.18}),borderWarning:`1px solid ${c(s,{alpha:.35})}`,textColorWarning:s,colorWarning:c(s,{alpha:.15}),colorBorderedWarning:c(s,{alpha:.12}),closeIconColorWarning:s,closeIconColorHoverWarning:s,closeIconColorPressedWarning:s,closeColorHoverWarning:c(s,{alpha:.12}),closeColorPressedWarning:c(s,{alpha:.18}),borderError:`1px solid ${c(l,{alpha:.23})}`,textColorError:l,colorError:c(l,{alpha:.1}),colorBorderedError:c(l,{alpha:.08}),closeIconColorError:l,closeIconColorHoverError:l,closeIconColorPressedError:l,closeColorHoverError:c(l,{alpha:.12}),closeColorPressedError:c(l,{alpha:.18})})}var E={name:`Tag`,common:o,self:T},D={color:Object,type:{type:String,default:`default`},round:Boolean,size:String,closable:Boolean,disabled:{type:Boolean,default:void 0}},O=v(`tag`,`
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
`,[h(`strong`,`
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
 `),h(`round`,`
 padding: 0 calc(var(--n-height) / 3);
 border-radius: calc(var(--n-height) / 2);
 `,[p(`icon`,`
 margin: 0 4px 0 calc((var(--n-height) - 8px) / -2);
 `),p(`avatar`,`
 margin: 0 6px 0 calc((var(--n-height) - 8px) / -2);
 `),h(`closable`,`
 padding: 0 calc(var(--n-height) / 4) 0 calc(var(--n-height) / 3);
 `)]),h(`icon, avatar`,[h(`round`,`
 padding: 0 calc(var(--n-height) / 3) 0 calc(var(--n-height) / 2);
 `)]),h(`disabled`,`
 cursor: not-allowed !important;
 opacity: var(--n-opacity-disabled);
 `),h(`checkable`,`
 cursor: pointer;
 box-shadow: none;
 color: var(--n-text-color-checkable);
 background-color: var(--n-color-checkable);
 `,[x(`disabled`,[f(`&:hover`,`background-color: var(--n-color-hover-checkable);`,[x(`checked`,`color: var(--n-text-color-hover-checkable);`)]),f(`&:active`,`background-color: var(--n-color-pressed-checkable);`,[x(`checked`,`color: var(--n-text-color-pressed-checkable);`)])]),h(`checked`,`
 color: var(--n-text-color-checked);
 background-color: var(--n-color-checked);
 `,[x(`disabled`,[f(`&:hover`,`background-color: var(--n-color-checked-hover);`),f(`&:active`,`background-color: var(--n-color-checked-pressed);`)])])])]),k=Object.assign(Object.assign(Object.assign({},d.props),D),{bordered:{type:Boolean,default:void 0},checked:Boolean,checkable:Boolean,strong:Boolean,triggerClickOnClose:Boolean,onClose:[Array,Function],onMouseenter:Function,onMouseleave:Function,"onUpdate:checked":Function,onUpdateChecked:Function,internalCloseFocusable:{type:Boolean,default:!0},internalCloseIsButtonTag:{type:Boolean,default:!0},onCheckedChange:Function}),A=n(`n-tag`),j=l({name:`Tag`,props:k,slots:Object,setup(t){let n=m(null),{mergedBorderedRef:i,mergedClsPrefixRef:a,inlineThemeDisabled:o,mergedRtlRef:c,mergedComponentPropsRef:l}=u(t),f=_(()=>t.size||l?.value?.Tag?.size||`medium`),p=d(`Tag`,`-tag`,O,E,t,a);e(A,{roundRef:b(t,`round`)});function h(){if(!t.disabled&&t.checkable){let{checked:e,onCheckedChange:n,onUpdateChecked:r,"onUpdate:checked":i}=t;r&&r(!e),i&&i(!e),n&&n(!e)}}function v(e){if(t.triggerClickOnClose||e.stopPropagation(),!t.disabled){let{onClose:n}=t;n&&s(n,e)}}let x={setTextContent(e){let{value:t}=n;t&&(t.textContent=e)}},w=r(`Tag`,c,a),T=_(()=>{let{type:e,color:{color:n,textColor:r}={}}=t,a=f.value,{common:{cubicBezierEaseInOut:o},self:{padding:s,closeMargin:c,borderRadius:l,opacityDisabled:u,textColorCheckable:d,textColorHoverCheckable:m,textColorPressedCheckable:h,textColorChecked:_,colorCheckable:v,colorHoverCheckable:b,colorPressedCheckable:x,colorChecked:S,colorCheckedHover:C,colorCheckedPressed:w,closeBorderRadius:T,fontWeightStrong:E,[y(`colorBordered`,e)]:D,[y(`closeSize`,a)]:O,[y(`closeIconSize`,a)]:k,[y(`fontSize`,a)]:A,[y(`height`,a)]:j,[y(`color`,e)]:M,[y(`textColor`,e)]:N,[y(`border`,e)]:P,[y(`closeIconColor`,e)]:F,[y(`closeIconColorHover`,e)]:I,[y(`closeIconColorPressed`,e)]:L,[y(`closeColorHover`,e)]:R,[y(`closeColorPressed`,e)]:z}}=p.value,B=g(c);return{"--n-font-weight-strong":E,"--n-avatar-size-override":`calc(${j} - 8px)`,"--n-bezier":o,"--n-border-radius":l,"--n-border":P,"--n-close-icon-size":k,"--n-close-color-pressed":z,"--n-close-color-hover":R,"--n-close-border-radius":T,"--n-close-icon-color":F,"--n-close-icon-color-hover":I,"--n-close-icon-color-pressed":L,"--n-close-icon-color-disabled":F,"--n-close-margin-top":B.top,"--n-close-margin-right":B.right,"--n-close-margin-bottom":B.bottom,"--n-close-margin-left":B.left,"--n-close-size":O,"--n-color":n||(i.value?D:M),"--n-color-checkable":v,"--n-color-checked":S,"--n-color-checked-hover":C,"--n-color-checked-pressed":w,"--n-color-hover-checkable":b,"--n-color-pressed-checkable":x,"--n-font-size":A,"--n-height":j,"--n-opacity-disabled":u,"--n-padding":s,"--n-text-color":r||N,"--n-text-color-checkable":d,"--n-text-color-checked":_,"--n-text-color-hover-checkable":m,"--n-text-color-pressed-checkable":h}}),D=o?S(`tag`,_(()=>{let e=``,{type:n,color:{color:r,textColor:a}={}}=t;return e+=n[0],e+=f.value[0],r&&(e+=`a${C(r)}`),a&&(e+=`b${C(a)}`),i.value&&(e+=`c`),e}),T,t):void 0;return Object.assign(Object.assign({},x),{rtlEnabled:w,mergedClsPrefix:a,contentRef:n,mergedBordered:i,handleClick:h,handleCloseClick:v,cssVars:o?void 0:T,themeClass:D?.themeClass,onRender:D?.onRender})},render(){var e;let{mergedClsPrefix:n,rtlEnabled:r,closable:o,color:{borderColor:s}={},round:c,onRender:l,$slots:u}=this;l?.();let d=a(u.avatar,e=>e&&t(`div`,{class:`${n}-tag__avatar`},e)),f=a(u.icon,e=>e&&t(`div`,{class:`${n}-tag__icon`},e));return t(`div`,{class:[`${n}-tag`,this.themeClass,{[`${n}-tag--rtl`]:r,[`${n}-tag--strong`]:this.strong,[`${n}-tag--disabled`]:this.disabled,[`${n}-tag--checkable`]:this.checkable,[`${n}-tag--checked`]:this.checkable&&this.checked,[`${n}-tag--round`]:c,[`${n}-tag--avatar`]:d,[`${n}-tag--icon`]:f,[`${n}-tag--closable`]:o}],style:this.cssVars,onClick:this.handleClick,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},f||d,t(`span`,{class:`${n}-tag__content`,ref:`contentRef`},(e=this.$slots).default?.call(e)),!this.checkable&&o?t(i,{clsPrefix:n,class:`${n}-tag__close`,disabled:this.disabled,onClick:this.handleCloseClick,focusable:this.internalCloseFocusable,round:c,isButtonTag:this.internalCloseIsButtonTag,absolute:!0}):null,!this.checkable&&this.mergedBordered?t(`div`,{class:`${n}-tag__border`,style:{borderColor:s}}):null)}});export{j as t};