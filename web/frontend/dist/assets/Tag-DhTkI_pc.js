import{Dt as e,E as t,Et as n,Gn as r,Gt as i,I as a,Mt as o,Nn as s,Rt as c,Zt as l,_t as u,an as d,in as f,jn as p,nn as m,on as h,or as g,rr as _,sn as v,tn as y,vt as b,wn as x,x as S,z as C}from"./auth-DkWBYjip.js";import{t as w}from"./_common-BWSN0c8x.js";function T(e){let{textColor2:t,primaryColorHover:n,primaryColorPressed:r,primaryColor:a,infoColor:o,successColor:s,warningColor:c,errorColor:l,baseColor:u,borderColor:d,opacityDisabled:f,tagColor:p,closeIconColor:m,closeIconColorHover:h,closeIconColorPressed:g,borderRadiusSmall:_,fontSizeMini:v,fontSizeTiny:y,fontSizeSmall:b,fontSizeMedium:x,heightMini:S,heightTiny:C,heightSmall:T,heightMedium:E,closeColorHover:D,closeColorPressed:O,buttonColor2Hover:k,buttonColor2Pressed:A,fontWeightStrong:j}=e;return Object.assign(Object.assign({},w),{closeBorderRadius:_,heightTiny:S,heightSmall:C,heightMedium:T,heightLarge:E,borderRadius:_,opacityDisabled:f,fontSizeTiny:v,fontSizeSmall:y,fontSizeMedium:b,fontSizeLarge:x,fontWeightStrong:j,textColorCheckable:t,textColorHoverCheckable:t,textColorPressedCheckable:t,textColorChecked:u,colorCheckable:`#0000`,colorHoverCheckable:k,colorPressedCheckable:A,colorChecked:a,colorCheckedHover:n,colorCheckedPressed:r,border:`1px solid ${d}`,textColor:t,color:p,colorBordered:`rgb(250, 250, 252)`,closeIconColor:m,closeIconColorHover:h,closeIconColorPressed:g,closeColorHover:D,closeColorPressed:O,borderPrimary:`1px solid ${i(a,{alpha:.3})}`,textColorPrimary:a,colorPrimary:i(a,{alpha:.12}),colorBorderedPrimary:i(a,{alpha:.1}),closeIconColorPrimary:a,closeIconColorHoverPrimary:a,closeIconColorPressedPrimary:a,closeColorHoverPrimary:i(a,{alpha:.12}),closeColorPressedPrimary:i(a,{alpha:.18}),borderInfo:`1px solid ${i(o,{alpha:.3})}`,textColorInfo:o,colorInfo:i(o,{alpha:.12}),colorBorderedInfo:i(o,{alpha:.1}),closeIconColorInfo:o,closeIconColorHoverInfo:o,closeIconColorPressedInfo:o,closeColorHoverInfo:i(o,{alpha:.12}),closeColorPressedInfo:i(o,{alpha:.18}),borderSuccess:`1px solid ${i(s,{alpha:.3})}`,textColorSuccess:s,colorSuccess:i(s,{alpha:.12}),colorBorderedSuccess:i(s,{alpha:.1}),closeIconColorSuccess:s,closeIconColorHoverSuccess:s,closeIconColorPressedSuccess:s,closeColorHoverSuccess:i(s,{alpha:.12}),closeColorPressedSuccess:i(s,{alpha:.18}),borderWarning:`1px solid ${i(c,{alpha:.35})}`,textColorWarning:c,colorWarning:i(c,{alpha:.15}),colorBorderedWarning:i(c,{alpha:.12}),closeIconColorWarning:c,closeIconColorHoverWarning:c,closeIconColorPressedWarning:c,closeColorHoverWarning:i(c,{alpha:.12}),closeColorPressedWarning:i(c,{alpha:.18}),borderError:`1px solid ${i(l,{alpha:.23})}`,textColorError:l,colorError:i(l,{alpha:.1}),colorBorderedError:i(l,{alpha:.08}),closeIconColorError:l,closeIconColorHoverError:l,closeIconColorPressedError:l,closeColorHoverError:i(l,{alpha:.12}),closeColorPressedError:i(l,{alpha:.18})})}var E={name:`Tag`,common:S,self:T},D={color:Object,type:{type:String,default:`default`},round:Boolean,size:String,closable:Boolean,disabled:{type:Boolean,default:void 0}},O=m(`tag`,`
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
`,[d(`strong`,`
 font-weight: var(--n-font-weight-strong);
 `),f(`border`,`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
 border: var(--n-border);
 transition: border-color .3s var(--n-bezier);
 `),f(`icon`,`
 display: flex;
 margin: 0 4px 0 0;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 font-size: var(--n-avatar-size-override);
 `),f(`avatar`,`
 display: flex;
 margin: 0 6px 0 0;
 `),f(`close`,`
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),d(`round`,`
 padding: 0 calc(var(--n-height) / 3);
 border-radius: calc(var(--n-height) / 2);
 `,[f(`icon`,`
 margin: 0 4px 0 calc((var(--n-height) - 8px) / -2);
 `),f(`avatar`,`
 margin: 0 6px 0 calc((var(--n-height) - 8px) / -2);
 `),d(`closable`,`
 padding: 0 calc(var(--n-height) / 4) 0 calc(var(--n-height) / 3);
 `)]),d(`icon, avatar`,[d(`round`,`
 padding: 0 calc(var(--n-height) / 3) 0 calc(var(--n-height) / 2);
 `)]),d(`disabled`,`
 cursor: not-allowed !important;
 opacity: var(--n-opacity-disabled);
 `),d(`checkable`,`
 cursor: pointer;
 box-shadow: none;
 color: var(--n-text-color-checkable);
 background-color: var(--n-color-checkable);
 `,[h(`disabled`,[y(`&:hover`,`background-color: var(--n-color-hover-checkable);`,[h(`checked`,`color: var(--n-text-color-hover-checkable);`)]),y(`&:active`,`background-color: var(--n-color-pressed-checkable);`,[h(`checked`,`color: var(--n-text-color-pressed-checkable);`)])]),d(`checked`,`
 color: var(--n-text-color-checked);
 background-color: var(--n-color-checked);
 `,[h(`disabled`,[y(`&:hover`,`background-color: var(--n-color-checked-hover);`),y(`&:active`,`background-color: var(--n-color-checked-pressed);`)])])])]),k=Object.assign(Object.assign(Object.assign({},a.props),D),{bordered:{type:Boolean,default:void 0},checked:Boolean,checkable:Boolean,strong:Boolean,triggerClickOnClose:Boolean,onClose:[Array,Function],onMouseenter:Function,onMouseleave:Function,"onUpdate:checked":Function,onUpdateChecked:Function,internalCloseFocusable:{type:Boolean,default:!0},internalCloseIsButtonTag:{type:Boolean,default:!0},onCheckedChange:Function}),A=c(`n-tag`),j=p({name:`Tag`,props:k,slots:Object,setup(t){let n=_(null),{mergedBorderedRef:i,mergedClsPrefixRef:s,inlineThemeDisabled:c,mergedRtlRef:d,mergedComponentPropsRef:f}=b(t),p=x(()=>t.size||f?.value?.Tag?.size||`medium`),m=a(`Tag`,`-tag`,O,E,t,s);r(A,{roundRef:g(t,`round`)});function h(){if(!t.disabled&&t.checkable){let{checked:e,onCheckedChange:n,onUpdateChecked:r,"onUpdate:checked":i}=t;r&&r(!e),i&&i(!e),n&&n(!e)}}function y(n){if(t.triggerClickOnClose||n.stopPropagation(),!t.disabled){let{onClose:r}=t;r&&e(r,n)}}let S={setTextContent(e){let{value:t}=n;t&&(t.textContent=e)}},w=C(`Tag`,d,s),T=x(()=>{let{type:e,color:{color:n,textColor:r}={}}=t,a=p.value,{common:{cubicBezierEaseInOut:o},self:{padding:s,closeMargin:c,borderRadius:u,opacityDisabled:d,textColorCheckable:f,textColorHoverCheckable:h,textColorPressedCheckable:g,textColorChecked:_,colorCheckable:y,colorHoverCheckable:b,colorPressedCheckable:x,colorChecked:S,colorCheckedHover:C,colorCheckedPressed:w,closeBorderRadius:T,fontWeightStrong:E,[v(`colorBordered`,e)]:D,[v(`closeSize`,a)]:O,[v(`closeIconSize`,a)]:k,[v(`fontSize`,a)]:A,[v(`height`,a)]:j,[v(`color`,e)]:M,[v(`textColor`,e)]:N,[v(`border`,e)]:P,[v(`closeIconColor`,e)]:F,[v(`closeIconColorHover`,e)]:I,[v(`closeIconColorPressed`,e)]:L,[v(`closeColorHover`,e)]:R,[v(`closeColorPressed`,e)]:z}}=m.value,B=l(c);return{"--n-font-weight-strong":E,"--n-avatar-size-override":`calc(${j} - 8px)`,"--n-bezier":o,"--n-border-radius":u,"--n-border":P,"--n-close-icon-size":k,"--n-close-color-pressed":z,"--n-close-color-hover":R,"--n-close-border-radius":T,"--n-close-icon-color":F,"--n-close-icon-color-hover":I,"--n-close-icon-color-pressed":L,"--n-close-icon-color-disabled":F,"--n-close-margin-top":B.top,"--n-close-margin-right":B.right,"--n-close-margin-bottom":B.bottom,"--n-close-margin-left":B.left,"--n-close-size":O,"--n-color":n||(i.value?D:M),"--n-color-checkable":y,"--n-color-checked":S,"--n-color-checked-hover":C,"--n-color-checked-pressed":w,"--n-color-hover-checkable":b,"--n-color-pressed-checkable":x,"--n-font-size":A,"--n-height":j,"--n-opacity-disabled":d,"--n-padding":s,"--n-text-color":r||N,"--n-text-color-checkable":f,"--n-text-color-checked":_,"--n-text-color-hover-checkable":h,"--n-text-color-pressed-checkable":g}}),D=c?u(`tag`,x(()=>{let e=``,{type:n,color:{color:r,textColor:a}={}}=t;return e+=n[0],e+=p.value[0],r&&(e+=`a${o(r)}`),a&&(e+=`b${o(a)}`),i.value&&(e+=`c`),e}),T,t):void 0;return Object.assign(Object.assign({},S),{rtlEnabled:w,mergedClsPrefix:s,contentRef:n,mergedBordered:i,handleClick:h,handleCloseClick:y,cssVars:c?void 0:T,themeClass:D?.themeClass,onRender:D?.onRender})},render(){var e;let{mergedClsPrefix:r,rtlEnabled:i,closable:a,color:{borderColor:o}={},round:c,onRender:l,$slots:u}=this;l?.();let d=n(u.avatar,e=>e&&s(`div`,{class:`${r}-tag__avatar`},e)),f=n(u.icon,e=>e&&s(`div`,{class:`${r}-tag__icon`},e));return s(`div`,{class:[`${r}-tag`,this.themeClass,{[`${r}-tag--rtl`]:i,[`${r}-tag--strong`]:this.strong,[`${r}-tag--disabled`]:this.disabled,[`${r}-tag--checkable`]:this.checkable,[`${r}-tag--checked`]:this.checkable&&this.checked,[`${r}-tag--round`]:c,[`${r}-tag--avatar`]:d,[`${r}-tag--icon`]:f,[`${r}-tag--closable`]:a}],style:this.cssVars,onClick:this.handleClick,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},f||d,s(`span`,{class:`${r}-tag__content`,ref:`contentRef`},(e=this.$slots).default?.call(e)),!this.checkable&&a?s(t,{clsPrefix:r,class:`${r}-tag__close`,disabled:this.disabled,onClick:this.handleCloseClick,focusable:this.internalCloseFocusable,round:c,isButtonTag:this.internalCloseIsButtonTag,absolute:!0}):null,!this.checkable&&this.mergedBordered?s(`div`,{class:`${r}-tag__border`,style:{borderColor:o}}):null)}});export{j as t};