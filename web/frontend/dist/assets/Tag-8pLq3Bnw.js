import{An as e,Ct as t,D as n,G as r,H as i,Ln as a,M as o,Mt as s,Nt as c,Rt as l,Wt as u,Zn as d,Zt as f,cn as p,dn as m,fn as h,fr as g,lr as _,pn as v,rn as y,sn as b,un as x,wt as S,zn as C}from"./auth-FLVH1SR4.js";import{t as w}from"./_common-BWSN0c8x.js";function T(e){let{textColor2:t,primaryColorHover:n,primaryColorPressed:r,primaryColor:i,infoColor:a,successColor:o,warningColor:s,errorColor:c,baseColor:l,borderColor:u,opacityDisabled:d,tagColor:p,closeIconColor:m,closeIconColorHover:h,closeIconColorPressed:g,borderRadiusSmall:_,fontSizeMini:v,fontSizeTiny:y,fontSizeSmall:b,fontSizeMedium:x,heightMini:S,heightTiny:C,heightSmall:T,heightMedium:E,closeColorHover:D,closeColorPressed:O,buttonColor2Hover:k,buttonColor2Pressed:A,fontWeightStrong:j}=e;return Object.assign(Object.assign({},w),{closeBorderRadius:_,heightTiny:S,heightSmall:C,heightMedium:T,heightLarge:E,borderRadius:_,opacityDisabled:d,fontSizeTiny:v,fontSizeSmall:y,fontSizeMedium:b,fontSizeLarge:x,fontWeightStrong:j,textColorCheckable:t,textColorHoverCheckable:t,textColorPressedCheckable:t,textColorChecked:l,colorCheckable:`#0000`,colorHoverCheckable:k,colorPressedCheckable:A,colorChecked:i,colorCheckedHover:n,colorCheckedPressed:r,border:`1px solid ${u}`,textColor:t,color:p,colorBordered:`rgb(250, 250, 252)`,closeIconColor:m,closeIconColorHover:h,closeIconColorPressed:g,closeColorHover:D,closeColorPressed:O,borderPrimary:`1px solid ${f(i,{alpha:.3})}`,textColorPrimary:i,colorPrimary:f(i,{alpha:.12}),colorBorderedPrimary:f(i,{alpha:.1}),closeIconColorPrimary:i,closeIconColorHoverPrimary:i,closeIconColorPressedPrimary:i,closeColorHoverPrimary:f(i,{alpha:.12}),closeColorPressedPrimary:f(i,{alpha:.18}),borderInfo:`1px solid ${f(a,{alpha:.3})}`,textColorInfo:a,colorInfo:f(a,{alpha:.12}),colorBorderedInfo:f(a,{alpha:.1}),closeIconColorInfo:a,closeIconColorHoverInfo:a,closeIconColorPressedInfo:a,closeColorHoverInfo:f(a,{alpha:.12}),closeColorPressedInfo:f(a,{alpha:.18}),borderSuccess:`1px solid ${f(o,{alpha:.3})}`,textColorSuccess:o,colorSuccess:f(o,{alpha:.12}),colorBorderedSuccess:f(o,{alpha:.1}),closeIconColorSuccess:o,closeIconColorHoverSuccess:o,closeIconColorPressedSuccess:o,closeColorHoverSuccess:f(o,{alpha:.12}),closeColorPressedSuccess:f(o,{alpha:.18}),borderWarning:`1px solid ${f(s,{alpha:.35})}`,textColorWarning:s,colorWarning:f(s,{alpha:.15}),colorBorderedWarning:f(s,{alpha:.12}),closeIconColorWarning:s,closeIconColorHoverWarning:s,closeIconColorPressedWarning:s,closeColorHoverWarning:f(s,{alpha:.12}),closeColorPressedWarning:f(s,{alpha:.18}),borderError:`1px solid ${f(c,{alpha:.23})}`,textColorError:c,colorError:f(c,{alpha:.1}),colorBorderedError:f(c,{alpha:.08}),closeIconColorError:c,closeIconColorHoverError:c,closeIconColorPressedError:c,closeColorHoverError:f(c,{alpha:.12}),closeColorPressedError:f(c,{alpha:.18})})}var E={name:`Tag`,common:n,self:T},D={color:Object,type:{type:String,default:`default`},round:Boolean,size:String,closable:Boolean,disabled:{type:Boolean,default:void 0}},O=p(`tag`,`
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
 `),x(`border`,`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
 border: var(--n-border);
 transition: border-color .3s var(--n-bezier);
 `),x(`icon`,`
 display: flex;
 margin: 0 4px 0 0;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 font-size: var(--n-avatar-size-override);
 `),x(`avatar`,`
 display: flex;
 margin: 0 6px 0 0;
 `),x(`close`,`
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),m(`round`,`
 padding: 0 calc(var(--n-height) / 3);
 border-radius: calc(var(--n-height) / 2);
 `,[x(`icon`,`
 margin: 0 4px 0 calc((var(--n-height) - 8px) / -2);
 `),x(`avatar`,`
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
 `,[h(`disabled`,[b(`&:hover`,`background-color: var(--n-color-hover-checkable);`,[h(`checked`,`color: var(--n-text-color-hover-checkable);`)]),b(`&:active`,`background-color: var(--n-color-pressed-checkable);`,[h(`checked`,`color: var(--n-text-color-pressed-checkable);`)])]),m(`checked`,`
 color: var(--n-text-color-checked);
 background-color: var(--n-color-checked);
 `,[h(`disabled`,[b(`&:hover`,`background-color: var(--n-color-checked-hover);`),b(`&:active`,`background-color: var(--n-color-checked-pressed);`)])])])]),k=Object.assign(Object.assign(Object.assign({},i.props),D),{bordered:{type:Boolean,default:void 0},checked:Boolean,checkable:Boolean,strong:Boolean,triggerClickOnClose:Boolean,onClose:[Array,Function],onMouseenter:Function,onMouseleave:Function,"onUpdate:checked":Function,onUpdateChecked:Function,internalCloseFocusable:{type:Boolean,default:!0},internalCloseIsButtonTag:{type:Boolean,default:!0},onCheckedChange:Function}),A=u(`n-tag`),j=a({name:`Tag`,props:k,slots:Object,setup(n){let a=_(null),{mergedBorderedRef:o,mergedClsPrefixRef:s,inlineThemeDisabled:u,mergedRtlRef:f,mergedComponentPropsRef:p}=S(n),m=e(()=>n.size||p?.value?.Tag?.size||`medium`),h=i(`Tag`,`-tag`,O,E,n,s);d(A,{roundRef:g(n,`round`)});function b(){if(!n.disabled&&n.checkable){let{checked:e,onCheckedChange:t,onUpdateChecked:r,"onUpdate:checked":i}=n;r&&r(!e),i&&i(!e),t&&t(!e)}}function x(e){if(n.triggerClickOnClose||e.stopPropagation(),!n.disabled){let{onClose:t}=n;t&&c(t,e)}}let C={setTextContent(e){let{value:t}=a;t&&(t.textContent=e)}},w=r(`Tag`,f,s),T=e(()=>{let{type:e,color:{color:t,textColor:r}={}}=n,i=m.value,{common:{cubicBezierEaseInOut:a},self:{padding:s,closeMargin:c,borderRadius:l,opacityDisabled:u,textColorCheckable:d,textColorHoverCheckable:f,textColorPressedCheckable:p,textColorChecked:g,colorCheckable:_,colorHoverCheckable:b,colorPressedCheckable:x,colorChecked:S,colorCheckedHover:C,colorCheckedPressed:w,closeBorderRadius:T,fontWeightStrong:E,[v(`colorBordered`,e)]:D,[v(`closeSize`,i)]:O,[v(`closeIconSize`,i)]:k,[v(`fontSize`,i)]:A,[v(`height`,i)]:j,[v(`color`,e)]:M,[v(`textColor`,e)]:N,[v(`border`,e)]:P,[v(`closeIconColor`,e)]:F,[v(`closeIconColorHover`,e)]:I,[v(`closeIconColorPressed`,e)]:L,[v(`closeColorHover`,e)]:R,[v(`closeColorPressed`,e)]:z}}=h.value,B=y(c);return{"--n-font-weight-strong":E,"--n-avatar-size-override":`calc(${j} - 8px)`,"--n-bezier":a,"--n-border-radius":l,"--n-border":P,"--n-close-icon-size":k,"--n-close-color-pressed":z,"--n-close-color-hover":R,"--n-close-border-radius":T,"--n-close-icon-color":F,"--n-close-icon-color-hover":I,"--n-close-icon-color-pressed":L,"--n-close-icon-color-disabled":F,"--n-close-margin-top":B.top,"--n-close-margin-right":B.right,"--n-close-margin-bottom":B.bottom,"--n-close-margin-left":B.left,"--n-close-size":O,"--n-color":t||(o.value?D:M),"--n-color-checkable":_,"--n-color-checked":S,"--n-color-checked-hover":C,"--n-color-checked-pressed":w,"--n-color-hover-checkable":b,"--n-color-pressed-checkable":x,"--n-font-size":A,"--n-height":j,"--n-opacity-disabled":u,"--n-padding":s,"--n-text-color":r||N,"--n-text-color-checkable":d,"--n-text-color-checked":g,"--n-text-color-hover-checkable":f,"--n-text-color-pressed-checkable":p}}),D=u?t(`tag`,e(()=>{let e=``,{type:t,color:{color:r,textColor:i}={}}=n;return e+=t[0],e+=m.value[0],r&&(e+=`a${l(r)}`),i&&(e+=`b${l(i)}`),o.value&&(e+=`c`),e}),T,n):void 0;return Object.assign(Object.assign({},C),{rtlEnabled:w,mergedClsPrefix:s,contentRef:a,mergedBordered:o,handleClick:b,handleCloseClick:x,cssVars:u?void 0:T,themeClass:D?.themeClass,onRender:D?.onRender})},render(){var e;let{mergedClsPrefix:t,rtlEnabled:n,closable:r,color:{borderColor:i}={},round:a,onRender:c,$slots:l}=this;c?.();let u=s(l.avatar,e=>e&&C(`div`,{class:`${t}-tag__avatar`},e)),d=s(l.icon,e=>e&&C(`div`,{class:`${t}-tag__icon`},e));return C(`div`,{class:[`${t}-tag`,this.themeClass,{[`${t}-tag--rtl`]:n,[`${t}-tag--strong`]:this.strong,[`${t}-tag--disabled`]:this.disabled,[`${t}-tag--checkable`]:this.checkable,[`${t}-tag--checked`]:this.checkable&&this.checked,[`${t}-tag--round`]:a,[`${t}-tag--avatar`]:u,[`${t}-tag--icon`]:d,[`${t}-tag--closable`]:r}],style:this.cssVars,onClick:this.handleClick,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},d||u,C(`span`,{class:`${t}-tag__content`,ref:`contentRef`},(e=this.$slots).default?.call(e)),!this.checkable&&r?C(o,{clsPrefix:t,class:`${t}-tag__close`,disabled:this.disabled,onClick:this.handleCloseClick,focusable:this.internalCloseFocusable,round:a,isButtonTag:this.internalCloseIsButtonTag,absolute:!0}):null,!this.checkable&&this.mergedBordered?C(`div`,{class:`${t}-tag__border`,style:{borderColor:i}}):null)}});export{j as t};