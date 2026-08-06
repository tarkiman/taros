import{Ct as e,Ht as t,In as n,It as r,Jn as i,Kt as a,O as o,Qt as s,S as c,Sn as l,Xt as u,Yt as d,Zn as f,Zt as p,_ as m,hn as h,j as g,kt as _,lt as v,qt as y,ut as b,vt as x,wn as S,yt as C}from"./auth-DqHclkT-.js";import{t as w}from"./_common-BWSN0c8x.js";function T(e){let{textColor2:t,primaryColorHover:n,primaryColorPressed:i,primaryColor:a,infoColor:o,successColor:s,warningColor:c,errorColor:l,baseColor:u,borderColor:d,opacityDisabled:f,tagColor:p,closeIconColor:m,closeIconColorHover:h,closeIconColorPressed:g,borderRadiusSmall:_,fontSizeMini:v,fontSizeTiny:y,fontSizeSmall:b,fontSizeMedium:x,heightMini:S,heightTiny:C,heightSmall:T,heightMedium:E,closeColorHover:D,closeColorPressed:O,buttonColor2Hover:k,buttonColor2Pressed:A,fontWeightStrong:j}=e;return Object.assign(Object.assign({},w),{closeBorderRadius:_,heightTiny:S,heightSmall:C,heightMedium:T,heightLarge:E,borderRadius:_,opacityDisabled:f,fontSizeTiny:v,fontSizeSmall:y,fontSizeMedium:b,fontSizeLarge:x,fontWeightStrong:j,textColorCheckable:t,textColorHoverCheckable:t,textColorPressedCheckable:t,textColorChecked:u,colorCheckable:`#0000`,colorHoverCheckable:k,colorPressedCheckable:A,colorChecked:a,colorCheckedHover:n,colorCheckedPressed:i,border:`1px solid ${d}`,textColor:t,color:p,colorBordered:`rgb(250, 250, 252)`,closeIconColor:m,closeIconColorHover:h,closeIconColorPressed:g,closeColorHover:D,closeColorPressed:O,borderPrimary:`1px solid ${r(a,{alpha:.3})}`,textColorPrimary:a,colorPrimary:r(a,{alpha:.12}),colorBorderedPrimary:r(a,{alpha:.1}),closeIconColorPrimary:a,closeIconColorHoverPrimary:a,closeIconColorPressedPrimary:a,closeColorHoverPrimary:r(a,{alpha:.12}),closeColorPressedPrimary:r(a,{alpha:.18}),borderInfo:`1px solid ${r(o,{alpha:.3})}`,textColorInfo:o,colorInfo:r(o,{alpha:.12}),colorBorderedInfo:r(o,{alpha:.1}),closeIconColorInfo:o,closeIconColorHoverInfo:o,closeIconColorPressedInfo:o,closeColorHoverInfo:r(o,{alpha:.12}),closeColorPressedInfo:r(o,{alpha:.18}),borderSuccess:`1px solid ${r(s,{alpha:.3})}`,textColorSuccess:s,colorSuccess:r(s,{alpha:.12}),colorBorderedSuccess:r(s,{alpha:.1}),closeIconColorSuccess:s,closeIconColorHoverSuccess:s,closeIconColorPressedSuccess:s,closeColorHoverSuccess:r(s,{alpha:.12}),closeColorPressedSuccess:r(s,{alpha:.18}),borderWarning:`1px solid ${r(c,{alpha:.35})}`,textColorWarning:c,colorWarning:r(c,{alpha:.15}),colorBorderedWarning:r(c,{alpha:.12}),closeIconColorWarning:c,closeIconColorHoverWarning:c,closeIconColorPressedWarning:c,closeColorHoverWarning:r(c,{alpha:.12}),closeColorPressedWarning:r(c,{alpha:.18}),borderError:`1px solid ${r(l,{alpha:.23})}`,textColorError:l,colorError:r(l,{alpha:.1}),colorBorderedError:r(l,{alpha:.08}),closeIconColorError:l,closeIconColorHoverError:l,closeIconColorPressedError:l,closeColorHoverError:r(l,{alpha:.12}),closeColorPressedError:r(l,{alpha:.18})})}var E={name:`Tag`,common:m,self:T},D={color:Object,type:{type:String,default:`default`},round:Boolean,size:String,closable:Boolean,disabled:{type:Boolean,default:void 0}},O=y(`tag`,`
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
`,[u(`strong`,`
 font-weight: var(--n-font-weight-strong);
 `),d(`border`,`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
 border: var(--n-border);
 transition: border-color .3s var(--n-bezier);
 `),d(`icon`,`
 display: flex;
 margin: 0 4px 0 0;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 font-size: var(--n-avatar-size-override);
 `),d(`avatar`,`
 display: flex;
 margin: 0 6px 0 0;
 `),d(`close`,`
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),u(`round`,`
 padding: 0 calc(var(--n-height) / 3);
 border-radius: calc(var(--n-height) / 2);
 `,[d(`icon`,`
 margin: 0 4px 0 calc((var(--n-height) - 8px) / -2);
 `),d(`avatar`,`
 margin: 0 6px 0 calc((var(--n-height) - 8px) / -2);
 `),u(`closable`,`
 padding: 0 calc(var(--n-height) / 4) 0 calc(var(--n-height) / 3);
 `)]),u(`icon, avatar`,[u(`round`,`
 padding: 0 calc(var(--n-height) / 3) 0 calc(var(--n-height) / 2);
 `)]),u(`disabled`,`
 cursor: not-allowed !important;
 opacity: var(--n-opacity-disabled);
 `),u(`checkable`,`
 cursor: pointer;
 box-shadow: none;
 color: var(--n-text-color-checkable);
 background-color: var(--n-color-checkable);
 `,[p(`disabled`,[a(`&:hover`,`background-color: var(--n-color-hover-checkable);`,[p(`checked`,`color: var(--n-text-color-hover-checkable);`)]),a(`&:active`,`background-color: var(--n-color-pressed-checkable);`,[p(`checked`,`color: var(--n-text-color-pressed-checkable);`)])]),u(`checked`,`
 color: var(--n-text-color-checked);
 background-color: var(--n-color-checked);
 `,[p(`disabled`,[a(`&:hover`,`background-color: var(--n-color-checked-hover);`),a(`&:active`,`background-color: var(--n-color-checked-pressed);`)])])])]),k=Object.assign(Object.assign(Object.assign({},o.props),D),{bordered:{type:Boolean,default:void 0},checked:Boolean,checkable:Boolean,strong:Boolean,triggerClickOnClose:Boolean,onClose:[Array,Function],onMouseenter:Function,onMouseleave:Function,"onUpdate:checked":Function,onUpdateChecked:Function,internalCloseFocusable:{type:Boolean,default:!0},internalCloseIsButtonTag:{type:Boolean,default:!0},onCheckedChange:Function}),A=_(`n-tag`),j=l({name:`Tag`,props:k,slots:Object,setup(r){let a=i(null),{mergedBorderedRef:c,mergedClsPrefixRef:l,inlineThemeDisabled:u,mergedRtlRef:d,mergedComponentPropsRef:p}=b(r),m=h(()=>r.size||p?.value?.Tag?.size||`medium`),_=o(`Tag`,`-tag`,O,E,r,l);n(A,{roundRef:f(r,`round`)});function y(){if(!r.disabled&&r.checkable){let{checked:e,onCheckedChange:t,onUpdateChecked:n,"onUpdate:checked":i}=r;n&&n(!e),i&&i(!e),t&&t(!e)}}function x(e){if(r.triggerClickOnClose||e.stopPropagation(),!r.disabled){let{onClose:t}=r;t&&C(t,e)}}let S={setTextContent(e){let{value:t}=a;t&&(t.textContent=e)}},w=g(`Tag`,d,l),T=h(()=>{let{type:e,color:{color:n,textColor:i}={}}=r,a=m.value,{common:{cubicBezierEaseInOut:o},self:{padding:l,closeMargin:u,borderRadius:d,opacityDisabled:f,textColorCheckable:p,textColorHoverCheckable:h,textColorPressedCheckable:g,textColorChecked:v,colorCheckable:y,colorHoverCheckable:b,colorPressedCheckable:x,colorChecked:S,colorCheckedHover:C,colorCheckedPressed:w,closeBorderRadius:T,fontWeightStrong:E,[s(`colorBordered`,e)]:D,[s(`closeSize`,a)]:O,[s(`closeIconSize`,a)]:k,[s(`fontSize`,a)]:A,[s(`height`,a)]:j,[s(`color`,e)]:M,[s(`textColor`,e)]:N,[s(`border`,e)]:P,[s(`closeIconColor`,e)]:F,[s(`closeIconColorHover`,e)]:I,[s(`closeIconColorPressed`,e)]:L,[s(`closeColorHover`,e)]:R,[s(`closeColorPressed`,e)]:z}}=_.value,B=t(u);return{"--n-font-weight-strong":E,"--n-avatar-size-override":`calc(${j} - 8px)`,"--n-bezier":o,"--n-border-radius":d,"--n-border":P,"--n-close-icon-size":k,"--n-close-color-pressed":z,"--n-close-color-hover":R,"--n-close-border-radius":T,"--n-close-icon-color":F,"--n-close-icon-color-hover":I,"--n-close-icon-color-pressed":L,"--n-close-icon-color-disabled":F,"--n-close-margin-top":B.top,"--n-close-margin-right":B.right,"--n-close-margin-bottom":B.bottom,"--n-close-margin-left":B.left,"--n-close-size":O,"--n-color":n||(c.value?D:M),"--n-color-checkable":y,"--n-color-checked":S,"--n-color-checked-hover":C,"--n-color-checked-pressed":w,"--n-color-hover-checkable":b,"--n-color-pressed-checkable":x,"--n-font-size":A,"--n-height":j,"--n-opacity-disabled":f,"--n-padding":l,"--n-text-color":i||N,"--n-text-color-checkable":p,"--n-text-color-checked":v,"--n-text-color-hover-checkable":h,"--n-text-color-pressed-checkable":g}}),D=u?v(`tag`,h(()=>{let t=``,{type:n,color:{color:i,textColor:a}={}}=r;return t+=n[0],t+=m.value[0],i&&(t+=`a${e(i)}`),a&&(t+=`b${e(a)}`),c.value&&(t+=`c`),t}),T,r):void 0;return Object.assign(Object.assign({},S),{rtlEnabled:w,mergedClsPrefix:l,contentRef:a,mergedBordered:c,handleClick:y,handleCloseClick:x,cssVars:u?void 0:T,themeClass:D?.themeClass,onRender:D?.onRender})},render(){var e;let{mergedClsPrefix:t,rtlEnabled:n,closable:r,color:{borderColor:i}={},round:a,onRender:o,$slots:s}=this;o?.();let l=x(s.avatar,e=>e&&S(`div`,{class:`${t}-tag__avatar`},e)),u=x(s.icon,e=>e&&S(`div`,{class:`${t}-tag__icon`},e));return S(`div`,{class:[`${t}-tag`,this.themeClass,{[`${t}-tag--rtl`]:n,[`${t}-tag--strong`]:this.strong,[`${t}-tag--disabled`]:this.disabled,[`${t}-tag--checkable`]:this.checkable,[`${t}-tag--checked`]:this.checkable&&this.checked,[`${t}-tag--round`]:a,[`${t}-tag--avatar`]:l,[`${t}-tag--icon`]:u,[`${t}-tag--closable`]:r}],style:this.cssVars,onClick:this.handleClick,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},u||l,S(`span`,{class:`${t}-tag__content`,ref:`contentRef`},(e=this.$slots).default?.call(e)),!this.checkable&&r?S(c,{clsPrefix:t,class:`${t}-tag__close`,disabled:this.disabled,onClick:this.handleCloseClick,focusable:this.internalCloseFocusable,round:a,isButtonTag:this.internalCloseIsButtonTag,absolute:!0}):null,!this.checkable&&this.mergedBordered?S(`div`,{class:`${t}-tag__border`,style:{borderColor:i}}):null)}});export{j as t};