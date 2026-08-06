import{$t as e,A as t,Dn as n,Et as r,Gt as i,Mt as a,N as o,Qt as s,Tn as c,Xt as l,Yt as u,Zn as d,bt as f,dt as p,en as m,er as h,ft as g,tn as _,vn as v,w as y,xt as b,y as x,zn as S,zt as C}from"./auth-DhbqZPGu.js";import{t as w}from"./_common-BWSN0c8x.js";function T(e){let{textColor2:t,primaryColorHover:n,primaryColorPressed:r,primaryColor:i,infoColor:a,successColor:o,warningColor:s,errorColor:c,baseColor:l,borderColor:u,opacityDisabled:d,tagColor:f,closeIconColor:p,closeIconColorHover:m,closeIconColorPressed:h,borderRadiusSmall:g,fontSizeMini:_,fontSizeTiny:v,fontSizeSmall:y,fontSizeMedium:b,heightMini:x,heightTiny:S,heightSmall:T,heightMedium:E,closeColorHover:D,closeColorPressed:O,buttonColor2Hover:k,buttonColor2Pressed:A,fontWeightStrong:j}=e;return Object.assign(Object.assign({},w),{closeBorderRadius:g,heightTiny:x,heightSmall:S,heightMedium:T,heightLarge:E,borderRadius:g,opacityDisabled:d,fontSizeTiny:_,fontSizeSmall:v,fontSizeMedium:y,fontSizeLarge:b,fontWeightStrong:j,textColorCheckable:t,textColorHoverCheckable:t,textColorPressedCheckable:t,textColorChecked:l,colorCheckable:`#0000`,colorHoverCheckable:k,colorPressedCheckable:A,colorChecked:i,colorCheckedHover:n,colorCheckedPressed:r,border:`1px solid ${u}`,textColor:t,color:f,colorBordered:`rgb(250, 250, 252)`,closeIconColor:p,closeIconColorHover:m,closeIconColorPressed:h,closeColorHover:D,closeColorPressed:O,borderPrimary:`1px solid ${C(i,{alpha:.3})}`,textColorPrimary:i,colorPrimary:C(i,{alpha:.12}),colorBorderedPrimary:C(i,{alpha:.1}),closeIconColorPrimary:i,closeIconColorHoverPrimary:i,closeIconColorPressedPrimary:i,closeColorHoverPrimary:C(i,{alpha:.12}),closeColorPressedPrimary:C(i,{alpha:.18}),borderInfo:`1px solid ${C(a,{alpha:.3})}`,textColorInfo:a,colorInfo:C(a,{alpha:.12}),colorBorderedInfo:C(a,{alpha:.1}),closeIconColorInfo:a,closeIconColorHoverInfo:a,closeIconColorPressedInfo:a,closeColorHoverInfo:C(a,{alpha:.12}),closeColorPressedInfo:C(a,{alpha:.18}),borderSuccess:`1px solid ${C(o,{alpha:.3})}`,textColorSuccess:o,colorSuccess:C(o,{alpha:.12}),colorBorderedSuccess:C(o,{alpha:.1}),closeIconColorSuccess:o,closeIconColorHoverSuccess:o,closeIconColorPressedSuccess:o,closeColorHoverSuccess:C(o,{alpha:.12}),closeColorPressedSuccess:C(o,{alpha:.18}),borderWarning:`1px solid ${C(s,{alpha:.35})}`,textColorWarning:s,colorWarning:C(s,{alpha:.15}),colorBorderedWarning:C(s,{alpha:.12}),closeIconColorWarning:s,closeIconColorHoverWarning:s,closeIconColorPressedWarning:s,closeColorHoverWarning:C(s,{alpha:.12}),closeColorPressedWarning:C(s,{alpha:.18}),borderError:`1px solid ${C(c,{alpha:.23})}`,textColorError:c,colorError:C(c,{alpha:.1}),colorBorderedError:C(c,{alpha:.08}),closeIconColorError:c,closeIconColorHoverError:c,closeIconColorPressedError:c,closeColorHoverError:C(c,{alpha:.12}),closeColorPressedError:C(c,{alpha:.18})})}var E={name:`Tag`,common:x,self:T},D={color:Object,type:{type:String,default:`default`},round:Boolean,size:String,closable:Boolean,disabled:{type:Boolean,default:void 0}},O=l(`tag`,`
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
`,[e(`strong`,`
 font-weight: var(--n-font-weight-strong);
 `),s(`border`,`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
 border: var(--n-border);
 transition: border-color .3s var(--n-bezier);
 `),s(`icon`,`
 display: flex;
 margin: 0 4px 0 0;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 font-size: var(--n-avatar-size-override);
 `),s(`avatar`,`
 display: flex;
 margin: 0 6px 0 0;
 `),s(`close`,`
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),e(`round`,`
 padding: 0 calc(var(--n-height) / 3);
 border-radius: calc(var(--n-height) / 2);
 `,[s(`icon`,`
 margin: 0 4px 0 calc((var(--n-height) - 8px) / -2);
 `),s(`avatar`,`
 margin: 0 6px 0 calc((var(--n-height) - 8px) / -2);
 `),e(`closable`,`
 padding: 0 calc(var(--n-height) / 4) 0 calc(var(--n-height) / 3);
 `)]),e(`icon, avatar`,[e(`round`,`
 padding: 0 calc(var(--n-height) / 3) 0 calc(var(--n-height) / 2);
 `)]),e(`disabled`,`
 cursor: not-allowed !important;
 opacity: var(--n-opacity-disabled);
 `),e(`checkable`,`
 cursor: pointer;
 box-shadow: none;
 color: var(--n-text-color-checkable);
 background-color: var(--n-color-checkable);
 `,[m(`disabled`,[u(`&:hover`,`background-color: var(--n-color-hover-checkable);`,[m(`checked`,`color: var(--n-text-color-hover-checkable);`)]),u(`&:active`,`background-color: var(--n-color-pressed-checkable);`,[m(`checked`,`color: var(--n-text-color-pressed-checkable);`)])]),e(`checked`,`
 color: var(--n-text-color-checked);
 background-color: var(--n-color-checked);
 `,[m(`disabled`,[u(`&:hover`,`background-color: var(--n-color-checked-hover);`),u(`&:active`,`background-color: var(--n-color-checked-pressed);`)])])])]),k=Object.assign(Object.assign(Object.assign({},t.props),D),{bordered:{type:Boolean,default:void 0},checked:Boolean,checkable:Boolean,strong:Boolean,triggerClickOnClose:Boolean,onClose:[Array,Function],onMouseenter:Function,onMouseleave:Function,"onUpdate:checked":Function,onUpdateChecked:Function,internalCloseFocusable:{type:Boolean,default:!0},internalCloseIsButtonTag:{type:Boolean,default:!0},onCheckedChange:Function}),A=a(`n-tag`),j=c({name:`Tag`,props:k,slots:Object,setup(e){let n=d(null),{mergedBorderedRef:a,mergedClsPrefixRef:s,inlineThemeDisabled:c,mergedRtlRef:l,mergedComponentPropsRef:u}=g(e),f=v(()=>e.size||u?.value?.Tag?.size||`medium`),m=t(`Tag`,`-tag`,O,E,e,s);S(A,{roundRef:h(e,`round`)});function y(){if(!e.disabled&&e.checkable){let{checked:t,onCheckedChange:n,onUpdateChecked:r,"onUpdate:checked":i}=e;r&&r(!t),i&&i(!t),n&&n(!t)}}function x(t){if(e.triggerClickOnClose||t.stopPropagation(),!e.disabled){let{onClose:n}=e;n&&b(n,t)}}let C={setTextContent(e){let{value:t}=n;t&&(t.textContent=e)}},w=o(`Tag`,l,s),T=v(()=>{let{type:t,color:{color:n,textColor:r}={}}=e,o=f.value,{common:{cubicBezierEaseInOut:s},self:{padding:c,closeMargin:l,borderRadius:u,opacityDisabled:d,textColorCheckable:p,textColorHoverCheckable:h,textColorPressedCheckable:g,textColorChecked:v,colorCheckable:y,colorHoverCheckable:b,colorPressedCheckable:x,colorChecked:S,colorCheckedHover:C,colorCheckedPressed:w,closeBorderRadius:T,fontWeightStrong:E,[_(`colorBordered`,t)]:D,[_(`closeSize`,o)]:O,[_(`closeIconSize`,o)]:k,[_(`fontSize`,o)]:A,[_(`height`,o)]:j,[_(`color`,t)]:M,[_(`textColor`,t)]:N,[_(`border`,t)]:P,[_(`closeIconColor`,t)]:F,[_(`closeIconColorHover`,t)]:I,[_(`closeIconColorPressed`,t)]:L,[_(`closeColorHover`,t)]:R,[_(`closeColorPressed`,t)]:z}}=m.value,B=i(l);return{"--n-font-weight-strong":E,"--n-avatar-size-override":`calc(${j} - 8px)`,"--n-bezier":s,"--n-border-radius":u,"--n-border":P,"--n-close-icon-size":k,"--n-close-color-pressed":z,"--n-close-color-hover":R,"--n-close-border-radius":T,"--n-close-icon-color":F,"--n-close-icon-color-hover":I,"--n-close-icon-color-pressed":L,"--n-close-icon-color-disabled":F,"--n-close-margin-top":B.top,"--n-close-margin-right":B.right,"--n-close-margin-bottom":B.bottom,"--n-close-margin-left":B.left,"--n-close-size":O,"--n-color":n||(a.value?D:M),"--n-color-checkable":y,"--n-color-checked":S,"--n-color-checked-hover":C,"--n-color-checked-pressed":w,"--n-color-hover-checkable":b,"--n-color-pressed-checkable":x,"--n-font-size":A,"--n-height":j,"--n-opacity-disabled":d,"--n-padding":c,"--n-text-color":r||N,"--n-text-color-checkable":p,"--n-text-color-checked":v,"--n-text-color-hover-checkable":h,"--n-text-color-pressed-checkable":g}}),D=c?p(`tag`,v(()=>{let t=``,{type:n,color:{color:i,textColor:o}={}}=e;return t+=n[0],t+=f.value[0],i&&(t+=`a${r(i)}`),o&&(t+=`b${r(o)}`),a.value&&(t+=`c`),t}),T,e):void 0;return Object.assign(Object.assign({},C),{rtlEnabled:w,mergedClsPrefix:s,contentRef:n,mergedBordered:a,handleClick:y,handleCloseClick:x,cssVars:c?void 0:T,themeClass:D?.themeClass,onRender:D?.onRender})},render(){var e;let{mergedClsPrefix:t,rtlEnabled:r,closable:i,color:{borderColor:a}={},round:o,onRender:s,$slots:c}=this;s?.();let l=f(c.avatar,e=>e&&n(`div`,{class:`${t}-tag__avatar`},e)),u=f(c.icon,e=>e&&n(`div`,{class:`${t}-tag__icon`},e));return n(`div`,{class:[`${t}-tag`,this.themeClass,{[`${t}-tag--rtl`]:r,[`${t}-tag--strong`]:this.strong,[`${t}-tag--disabled`]:this.disabled,[`${t}-tag--checkable`]:this.checkable,[`${t}-tag--checked`]:this.checkable&&this.checked,[`${t}-tag--round`]:o,[`${t}-tag--avatar`]:l,[`${t}-tag--icon`]:u,[`${t}-tag--closable`]:i}],style:this.cssVars,onClick:this.handleClick,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},u||l,n(`span`,{class:`${t}-tag__content`,ref:`contentRef`},(e=this.$slots).default?.call(e)),!this.checkable&&i?n(y,{clsPrefix:t,class:`${t}-tag__close`,disabled:this.disabled,onClick:this.handleCloseClick,focusable:this.internalCloseFocusable,round:o,isButtonTag:this.internalCloseIsButtonTag,absolute:!0}):null,!this.checkable&&this.mergedBordered?n(`div`,{class:`${t}-tag__border`,style:{borderColor:a}}):null)}});export{j as t};