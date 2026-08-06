import{$t as e,Bn as t,Bt as n,Dt as r,En as i,Kt as a,Nt as o,On as s,P as c,Qn as l,St as u,T as d,Xt as f,Zt as p,b as m,en as h,ft as g,j as _,nn as v,pt as y,tn as b,tr as x,xt as S,yn as C}from"./auth-CSROUTah.js";import{t as w}from"./_common-BWSN0c8x.js";function T(e){let{textColor2:t,primaryColorHover:r,primaryColorPressed:i,primaryColor:a,infoColor:o,successColor:s,warningColor:c,errorColor:l,baseColor:u,borderColor:d,opacityDisabled:f,tagColor:p,closeIconColor:m,closeIconColorHover:h,closeIconColorPressed:g,borderRadiusSmall:_,fontSizeMini:v,fontSizeTiny:y,fontSizeSmall:b,fontSizeMedium:x,heightMini:S,heightTiny:C,heightSmall:T,heightMedium:E,closeColorHover:D,closeColorPressed:O,buttonColor2Hover:k,buttonColor2Pressed:A,fontWeightStrong:j}=e;return Object.assign(Object.assign({},w),{closeBorderRadius:_,heightTiny:S,heightSmall:C,heightMedium:T,heightLarge:E,borderRadius:_,opacityDisabled:f,fontSizeTiny:v,fontSizeSmall:y,fontSizeMedium:b,fontSizeLarge:x,fontWeightStrong:j,textColorCheckable:t,textColorHoverCheckable:t,textColorPressedCheckable:t,textColorChecked:u,colorCheckable:`#0000`,colorHoverCheckable:k,colorPressedCheckable:A,colorChecked:a,colorCheckedHover:r,colorCheckedPressed:i,border:`1px solid ${d}`,textColor:t,color:p,colorBordered:`rgb(250, 250, 252)`,closeIconColor:m,closeIconColorHover:h,closeIconColorPressed:g,closeColorHover:D,closeColorPressed:O,borderPrimary:`1px solid ${n(a,{alpha:.3})}`,textColorPrimary:a,colorPrimary:n(a,{alpha:.12}),colorBorderedPrimary:n(a,{alpha:.1}),closeIconColorPrimary:a,closeIconColorHoverPrimary:a,closeIconColorPressedPrimary:a,closeColorHoverPrimary:n(a,{alpha:.12}),closeColorPressedPrimary:n(a,{alpha:.18}),borderInfo:`1px solid ${n(o,{alpha:.3})}`,textColorInfo:o,colorInfo:n(o,{alpha:.12}),colorBorderedInfo:n(o,{alpha:.1}),closeIconColorInfo:o,closeIconColorHoverInfo:o,closeIconColorPressedInfo:o,closeColorHoverInfo:n(o,{alpha:.12}),closeColorPressedInfo:n(o,{alpha:.18}),borderSuccess:`1px solid ${n(s,{alpha:.3})}`,textColorSuccess:s,colorSuccess:n(s,{alpha:.12}),colorBorderedSuccess:n(s,{alpha:.1}),closeIconColorSuccess:s,closeIconColorHoverSuccess:s,closeIconColorPressedSuccess:s,closeColorHoverSuccess:n(s,{alpha:.12}),closeColorPressedSuccess:n(s,{alpha:.18}),borderWarning:`1px solid ${n(c,{alpha:.35})}`,textColorWarning:c,colorWarning:n(c,{alpha:.15}),colorBorderedWarning:n(c,{alpha:.12}),closeIconColorWarning:c,closeIconColorHoverWarning:c,closeIconColorPressedWarning:c,closeColorHoverWarning:n(c,{alpha:.12}),closeColorPressedWarning:n(c,{alpha:.18}),borderError:`1px solid ${n(l,{alpha:.23})}`,textColorError:l,colorError:n(l,{alpha:.1}),colorBorderedError:n(l,{alpha:.08}),closeIconColorError:l,closeIconColorHoverError:l,closeIconColorPressedError:l,closeColorHoverError:n(l,{alpha:.12}),closeColorPressedError:n(l,{alpha:.18})})}var E={name:`Tag`,common:m,self:T},D={color:Object,type:{type:String,default:`default`},round:Boolean,size:String,closable:Boolean,disabled:{type:Boolean,default:void 0}},O=p(`tag`,`
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
 `),e(`border`,`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
 border: var(--n-border);
 transition: border-color .3s var(--n-bezier);
 `),e(`icon`,`
 display: flex;
 margin: 0 4px 0 0;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 font-size: var(--n-avatar-size-override);
 `),e(`avatar`,`
 display: flex;
 margin: 0 6px 0 0;
 `),e(`close`,`
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),h(`round`,`
 padding: 0 calc(var(--n-height) / 3);
 border-radius: calc(var(--n-height) / 2);
 `,[e(`icon`,`
 margin: 0 4px 0 calc((var(--n-height) - 8px) / -2);
 `),e(`avatar`,`
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
 `,[b(`disabled`,[f(`&:hover`,`background-color: var(--n-color-hover-checkable);`,[b(`checked`,`color: var(--n-text-color-hover-checkable);`)]),f(`&:active`,`background-color: var(--n-color-pressed-checkable);`,[b(`checked`,`color: var(--n-text-color-pressed-checkable);`)])]),h(`checked`,`
 color: var(--n-text-color-checked);
 background-color: var(--n-color-checked);
 `,[b(`disabled`,[f(`&:hover`,`background-color: var(--n-color-checked-hover);`),f(`&:active`,`background-color: var(--n-color-checked-pressed);`)])])])]),k=Object.assign(Object.assign(Object.assign({},_.props),D),{bordered:{type:Boolean,default:void 0},checked:Boolean,checkable:Boolean,strong:Boolean,triggerClickOnClose:Boolean,onClose:[Array,Function],onMouseenter:Function,onMouseleave:Function,"onUpdate:checked":Function,onUpdateChecked:Function,internalCloseFocusable:{type:Boolean,default:!0},internalCloseIsButtonTag:{type:Boolean,default:!0},onCheckedChange:Function}),A=o(`n-tag`),j=i({name:`Tag`,props:k,slots:Object,setup(e){let n=l(null),{mergedBorderedRef:i,mergedClsPrefixRef:o,inlineThemeDisabled:s,mergedRtlRef:d,mergedComponentPropsRef:f}=y(e),p=C(()=>e.size||f?.value?.Tag?.size||`medium`),m=_(`Tag`,`-tag`,O,E,e,o);t(A,{roundRef:x(e,`round`)});function h(){if(!e.disabled&&e.checkable){let{checked:t,onCheckedChange:n,onUpdateChecked:r,"onUpdate:checked":i}=e;r&&r(!t),i&&i(!t),n&&n(!t)}}function b(t){if(e.triggerClickOnClose||t.stopPropagation(),!e.disabled){let{onClose:n}=e;n&&u(n,t)}}let S={setTextContent(e){let{value:t}=n;t&&(t.textContent=e)}},w=c(`Tag`,d,o),T=C(()=>{let{type:t,color:{color:n,textColor:r}={}}=e,o=p.value,{common:{cubicBezierEaseInOut:s},self:{padding:c,closeMargin:l,borderRadius:u,opacityDisabled:d,textColorCheckable:f,textColorHoverCheckable:h,textColorPressedCheckable:g,textColorChecked:_,colorCheckable:y,colorHoverCheckable:b,colorPressedCheckable:x,colorChecked:S,colorCheckedHover:C,colorCheckedPressed:w,closeBorderRadius:T,fontWeightStrong:E,[v(`colorBordered`,t)]:D,[v(`closeSize`,o)]:O,[v(`closeIconSize`,o)]:k,[v(`fontSize`,o)]:A,[v(`height`,o)]:j,[v(`color`,t)]:M,[v(`textColor`,t)]:N,[v(`border`,t)]:P,[v(`closeIconColor`,t)]:F,[v(`closeIconColorHover`,t)]:I,[v(`closeIconColorPressed`,t)]:L,[v(`closeColorHover`,t)]:R,[v(`closeColorPressed`,t)]:z}}=m.value,B=a(l);return{"--n-font-weight-strong":E,"--n-avatar-size-override":`calc(${j} - 8px)`,"--n-bezier":s,"--n-border-radius":u,"--n-border":P,"--n-close-icon-size":k,"--n-close-color-pressed":z,"--n-close-color-hover":R,"--n-close-border-radius":T,"--n-close-icon-color":F,"--n-close-icon-color-hover":I,"--n-close-icon-color-pressed":L,"--n-close-icon-color-disabled":F,"--n-close-margin-top":B.top,"--n-close-margin-right":B.right,"--n-close-margin-bottom":B.bottom,"--n-close-margin-left":B.left,"--n-close-size":O,"--n-color":n||(i.value?D:M),"--n-color-checkable":y,"--n-color-checked":S,"--n-color-checked-hover":C,"--n-color-checked-pressed":w,"--n-color-hover-checkable":b,"--n-color-pressed-checkable":x,"--n-font-size":A,"--n-height":j,"--n-opacity-disabled":d,"--n-padding":c,"--n-text-color":r||N,"--n-text-color-checkable":f,"--n-text-color-checked":_,"--n-text-color-hover-checkable":h,"--n-text-color-pressed-checkable":g}}),D=s?g(`tag`,C(()=>{let t=``,{type:n,color:{color:a,textColor:o}={}}=e;return t+=n[0],t+=p.value[0],a&&(t+=`a${r(a)}`),o&&(t+=`b${r(o)}`),i.value&&(t+=`c`),t}),T,e):void 0;return Object.assign(Object.assign({},S),{rtlEnabled:w,mergedClsPrefix:o,contentRef:n,mergedBordered:i,handleClick:h,handleCloseClick:b,cssVars:s?void 0:T,themeClass:D?.themeClass,onRender:D?.onRender})},render(){var e;let{mergedClsPrefix:t,rtlEnabled:n,closable:r,color:{borderColor:i}={},round:a,onRender:o,$slots:c}=this;o?.();let l=S(c.avatar,e=>e&&s(`div`,{class:`${t}-tag__avatar`},e)),u=S(c.icon,e=>e&&s(`div`,{class:`${t}-tag__icon`},e));return s(`div`,{class:[`${t}-tag`,this.themeClass,{[`${t}-tag--rtl`]:n,[`${t}-tag--strong`]:this.strong,[`${t}-tag--disabled`]:this.disabled,[`${t}-tag--checkable`]:this.checkable,[`${t}-tag--checked`]:this.checkable&&this.checked,[`${t}-tag--round`]:a,[`${t}-tag--avatar`]:l,[`${t}-tag--icon`]:u,[`${t}-tag--closable`]:r}],style:this.cssVars,onClick:this.handleClick,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},u||l,s(`span`,{class:`${t}-tag__content`,ref:`contentRef`},(e=this.$slots).default?.call(e)),!this.checkable&&r?s(d,{clsPrefix:t,class:`${t}-tag__close`,disabled:this.disabled,onClick:this.handleCloseClick,focusable:this.internalCloseFocusable,round:a,isButtonTag:this.internalCloseIsButtonTag,absolute:!0}):null,!this.checkable&&this.mergedBordered?s(`div`,{class:`${t}-tag__border`,style:{borderColor:i}}):null)}});export{j as t};