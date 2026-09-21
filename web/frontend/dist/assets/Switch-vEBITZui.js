import{A as e,At as t,B as n,Bn as r,Ct as i,Nt as a,O as o,P as s,Pt as c,Qt as l,Rn as u,Tt as d,U as f,an as p,cn as m,dn as h,dr as g,fn as _,jn as v,ln as y,mn as b,mr as x,nn as S,pn as C,wt as w}from"./auth-DvCWRTWY.js";import{c as T}from"./LocaleSwitcher-BMZ2PNLs.js";import{t as E}from"./_common-BnUKsVpJ.js";function D(e){let{primaryColor:t,opacityDisabled:n,borderRadius:r,textColor3:i}=e;return Object.assign(Object.assign({},E),{iconColor:i,textColor:`white`,loadingColor:t,opacityDisabled:n,railColor:`rgba(0, 0, 0, .14)`,railColorActive:t,buttonBoxShadow:`0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)`,buttonColor:`#FFF`,railBorderRadiusSmall:r,railBorderRadiusMedium:r,railBorderRadiusLarge:r,buttonBorderRadiusSmall:r,buttonBorderRadiusMedium:r,buttonBorderRadiusLarge:r,boxShadowFocus:`0 0 0 2px ${l(t,{alpha:.2})}`})}var O={name:`Switch`,common:o,self:D},k=y(`switch`,`
 height: var(--n-height);
 min-width: var(--n-width);
 vertical-align: middle;
 user-select: none;
 -webkit-user-select: none;
 display: inline-flex;
 outline: none;
 justify-content: center;
 align-items: center;
`,[h(`children-placeholder`,`
 height: var(--n-rail-height);
 display: flex;
 flex-direction: column;
 overflow: hidden;
 pointer-events: none;
 visibility: hidden;
 `),h(`rail-placeholder`,`
 display: flex;
 flex-wrap: none;
 `),h(`button-placeholder`,`
 width: calc(1.75 * var(--n-rail-height));
 height: var(--n-rail-height);
 `),y(`base-loading`,`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 font-size: calc(var(--n-button-width) - 4px);
 color: var(--n-loading-color);
 transition: color .3s var(--n-bezier);
 `,[s({left:`50%`,top:`50%`,originalTransform:`translateX(-50%) translateY(-50%)`})]),h(`checked, unchecked`,`
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 box-sizing: border-box;
 position: absolute;
 white-space: nowrap;
 top: 0;
 bottom: 0;
 display: flex;
 align-items: center;
 line-height: 1;
 `),h(`checked`,`
 right: 0;
 padding-right: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),h(`unchecked`,`
 left: 0;
 justify-content: flex-end;
 padding-left: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),m(`&:focus`,[h(`rail`,`
 box-shadow: var(--n-box-shadow-focus);
 `)]),_(`round`,[h(`rail`,`border-radius: calc(var(--n-rail-height) / 2);`,[h(`button`,`border-radius: calc(var(--n-button-height) / 2);`)])]),C(`disabled`,[C(`icon`,[_(`rubber-band`,[_(`pressed`,[h(`rail`,[h(`button`,`max-width: var(--n-button-width-pressed);`)])]),h(`rail`,[m(`&:active`,[h(`button`,`max-width: var(--n-button-width-pressed);`)])]),_(`active`,[_(`pressed`,[h(`rail`,[h(`button`,`left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));`)])]),h(`rail`,[m(`&:active`,[h(`button`,`left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));`)])])])])])]),_(`active`,[h(`rail`,[h(`button`,`left: calc(100% - var(--n-button-width) - var(--n-offset))`)])]),h(`rail`,`
 overflow: hidden;
 height: var(--n-rail-height);
 min-width: var(--n-rail-width);
 border-radius: var(--n-rail-border-radius);
 cursor: pointer;
 position: relative;
 transition:
 opacity .3s var(--n-bezier),
 background .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-rail-color);
 `,[h(`button-icon`,`
 color: var(--n-icon-color);
 transition: color .3s var(--n-bezier);
 font-size: calc(var(--n-button-height) - 4px);
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 display: flex;
 justify-content: center;
 align-items: center;
 line-height: 1;
 `,[s()]),h(`button`,`
 align-items: center; 
 top: var(--n-offset);
 left: var(--n-offset);
 height: var(--n-button-height);
 width: var(--n-button-width-pressed);
 max-width: var(--n-button-width);
 border-radius: var(--n-button-border-radius);
 background-color: var(--n-button-color);
 box-shadow: var(--n-button-box-shadow);
 box-sizing: border-box;
 cursor: inherit;
 content: "";
 position: absolute;
 transition:
 background-color .3s var(--n-bezier),
 left .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 max-width .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 `)]),_(`active`,[h(`rail`,`background-color: var(--n-rail-color-active);`)]),_(`loading`,[h(`rail`,`
 cursor: wait;
 `)]),_(`disabled`,[h(`rail`,`
 cursor: not-allowed;
 opacity: .5;
 `)])]),A=Object.assign(Object.assign({},f.props),{size:String,value:{type:[String,Number,Boolean],default:void 0},loading:Boolean,defaultValue:{type:[String,Number,Boolean],default:!1},disabled:{type:Boolean,default:void 0},round:{type:Boolean,default:!0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],checkedValue:{type:[String,Number,Boolean],default:!0},uncheckedValue:{type:[String,Number,Boolean],default:!1},railStyle:Function,rubberBand:{type:Boolean,default:!0},spinProps:Object,onChange:[Function,Array]}),j,M=u({name:`Switch`,props:A,slots:Object,setup(e){j===void 0&&(j=typeof CSS<`u`?CSS.supports!==void 0&&CSS.supports(`width`,`max(1px)`):!0);let{mergedClsPrefixRef:t,inlineThemeDisabled:n,mergedComponentPropsRef:r}=d(e),a=f(`Switch`,`-switch`,k,O,e,t),o=i(e,{mergedSize(t){return e.size===void 0?t?t.mergedSize.value:r?.value?.Switch?.size||`medium`:e.size}}),{mergedSizeRef:s,mergedDisabledRef:l}=o,u=g(e.defaultValue),m=x(e,`value`),h=T(m,u),_=v(()=>h.value===e.checkedValue),y=g(!1),C=g(!1),E=v(()=>{let{railStyle:t}=e;if(t)return t({focused:C.value,checked:_.value})});function D(t){let{"onUpdate:value":n,onChange:r,onUpdateValue:i}=e,{nTriggerFormInput:a,nTriggerFormChange:s}=o;n&&c(n,t),i&&c(i,t),r&&c(r,t),u.value=t,a(),s()}function A(){let{nTriggerFormFocus:e}=o;e()}function M(){let{nTriggerFormBlur:e}=o;e()}function N(){e.loading||l.value||(h.value===e.checkedValue?D(e.uncheckedValue):D(e.checkedValue))}function P(){C.value=!0,A()}function F(){C.value=!1,M(),y.value=!1}function I(t){e.loading||l.value||t.key===` `&&(h.value===e.checkedValue?D(e.uncheckedValue):D(e.checkedValue),y.value=!1)}function L(t){e.loading||l.value||t.key===` `&&(t.preventDefault(),y.value=!0)}let R=v(()=>{let{value:e}=s,{self:{opacityDisabled:t,railColor:n,railColorActive:r,buttonBoxShadow:i,buttonColor:o,boxShadowFocus:c,loadingColor:l,textColor:u,iconColor:d,[b(`buttonHeight`,e)]:f,[b(`buttonWidth`,e)]:m,[b(`buttonWidthPressed`,e)]:h,[b(`railHeight`,e)]:g,[b(`railWidth`,e)]:_,[b(`railBorderRadius`,e)]:v,[b(`buttonBorderRadius`,e)]:y},common:{cubicBezierEaseInOut:x}}=a.value,C,w,T;return j?(C=`calc((${g} - ${f}) / 2)`,w=`max(${g}, ${f})`,T=`max(${_}, calc(${_} + ${f} - ${g}))`):(C=p((S(g)-S(f))/2),w=p(Math.max(S(g),S(f))),T=S(g)>S(f)?_:p(S(_)+S(f)-S(g))),{"--n-bezier":x,"--n-button-border-radius":y,"--n-button-box-shadow":i,"--n-button-color":o,"--n-button-width":m,"--n-button-width-pressed":h,"--n-button-height":f,"--n-height":w,"--n-offset":C,"--n-opacity-disabled":t,"--n-rail-border-radius":v,"--n-rail-color":n,"--n-rail-color-active":r,"--n-rail-height":g,"--n-rail-width":_,"--n-width":T,"--n-box-shadow-focus":c,"--n-loading-color":l,"--n-text-color":u,"--n-icon-color":d}}),z=n?w(`switch`,v(()=>s.value[0]),R,e):void 0;return{handleClick:N,handleBlur:F,handleFocus:P,handleKeyup:I,handleKeydown:L,mergedRailStyle:E,pressed:y,mergedClsPrefix:t,mergedValue:h,checked:_,mergedDisabled:l,cssVars:n?void 0:R,themeClass:z?.themeClass,onRender:z?.onRender}},render(){let{mergedClsPrefix:i,mergedDisabled:o,checked:s,mergedRailStyle:c,onRender:l,$slots:u}=this;l?.();let{checked:d,unchecked:f,icon:p,"checked-icon":m,"unchecked-icon":h}=u,g=!(t(p)&&t(m)&&t(h));return r(`div`,{role:`switch`,"aria-checked":s,class:[`${i}-switch`,this.themeClass,g&&`${i}-switch--icon`,s&&`${i}-switch--active`,o&&`${i}-switch--disabled`,this.round&&`${i}-switch--round`,this.loading&&`${i}-switch--loading`,this.pressed&&`${i}-switch--pressed`,this.rubberBand&&`${i}-switch--rubber-band`],tabindex:this.mergedDisabled?void 0:0,style:this.cssVars,onClick:this.handleClick,onFocus:this.handleFocus,onBlur:this.handleBlur,onKeyup:this.handleKeyup,onKeydown:this.handleKeydown},r(`div`,{class:`${i}-switch__rail`,"aria-hidden":`true`,style:c},a(d,e=>a(f,t=>e||t?r(`div`,{"aria-hidden":!0,class:`${i}-switch__children-placeholder`},r(`div`,{class:`${i}-switch__rail-placeholder`},r(`div`,{class:`${i}-switch__button-placeholder`}),e),r(`div`,{class:`${i}-switch__rail-placeholder`},r(`div`,{class:`${i}-switch__button-placeholder`}),t)):null)),r(`div`,{class:`${i}-switch__button`},a(p,t=>a(m,o=>a(h,a=>r(n,null,{default:()=>this.loading?r(e,Object.assign({key:`loading`,clsPrefix:i,strokeWidth:20},this.spinProps)):this.checked&&(o||t)?r(`div`,{class:`${i}-switch__button-icon`,key:o?`checked-icon`:`icon`},o||t):!this.checked&&(a||t)?r(`div`,{class:`${i}-switch__button-icon`,key:a?`unchecked-icon`:`icon`},a||t):null})))),a(d,e=>e&&r(`div`,{key:`checked`,class:`${i}-switch__checked`},e)),a(f,e=>e&&r(`div`,{key:`unchecked`,class:`${i}-switch__unchecked`},e)))))}});export{M as t};