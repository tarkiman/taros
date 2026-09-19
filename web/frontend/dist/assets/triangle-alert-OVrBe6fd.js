import{A as e,At as t,B as n,Bn as r,Ct as i,Nt as a,O as o,P as s,Pt as c,Qt as l,Rn as u,Tt as d,U as f,an as p,cn as m,d as h,dn as g,dr as _,fn as v,jn as y,ln as b,mn as x,mr as S,nn as C,pn as w,wt as T}from"./auth-D5QNH05D.js";import{c as E}from"./LocaleSwitcher-DGVthD6c.js";import{t as D}from"./_common-BnUKsVpJ.js";function O(e){let{primaryColor:t,opacityDisabled:n,borderRadius:r,textColor3:i}=e;return Object.assign(Object.assign({},D),{iconColor:i,textColor:`white`,loadingColor:t,opacityDisabled:n,railColor:`rgba(0, 0, 0, .14)`,railColorActive:t,buttonBoxShadow:`0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)`,buttonColor:`#FFF`,railBorderRadiusSmall:r,railBorderRadiusMedium:r,railBorderRadiusLarge:r,buttonBorderRadiusSmall:r,buttonBorderRadiusMedium:r,buttonBorderRadiusLarge:r,boxShadowFocus:`0 0 0 2px ${l(t,{alpha:.2})}`})}var k={name:`Switch`,common:o,self:O},A=b(`switch`,`
 height: var(--n-height);
 min-width: var(--n-width);
 vertical-align: middle;
 user-select: none;
 -webkit-user-select: none;
 display: inline-flex;
 outline: none;
 justify-content: center;
 align-items: center;
`,[g(`children-placeholder`,`
 height: var(--n-rail-height);
 display: flex;
 flex-direction: column;
 overflow: hidden;
 pointer-events: none;
 visibility: hidden;
 `),g(`rail-placeholder`,`
 display: flex;
 flex-wrap: none;
 `),g(`button-placeholder`,`
 width: calc(1.75 * var(--n-rail-height));
 height: var(--n-rail-height);
 `),b(`base-loading`,`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 font-size: calc(var(--n-button-width) - 4px);
 color: var(--n-loading-color);
 transition: color .3s var(--n-bezier);
 `,[s({left:`50%`,top:`50%`,originalTransform:`translateX(-50%) translateY(-50%)`})]),g(`checked, unchecked`,`
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
 `),g(`checked`,`
 right: 0;
 padding-right: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),g(`unchecked`,`
 left: 0;
 justify-content: flex-end;
 padding-left: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),m(`&:focus`,[g(`rail`,`
 box-shadow: var(--n-box-shadow-focus);
 `)]),v(`round`,[g(`rail`,`border-radius: calc(var(--n-rail-height) / 2);`,[g(`button`,`border-radius: calc(var(--n-button-height) / 2);`)])]),w(`disabled`,[w(`icon`,[v(`rubber-band`,[v(`pressed`,[g(`rail`,[g(`button`,`max-width: var(--n-button-width-pressed);`)])]),g(`rail`,[m(`&:active`,[g(`button`,`max-width: var(--n-button-width-pressed);`)])]),v(`active`,[v(`pressed`,[g(`rail`,[g(`button`,`left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));`)])]),g(`rail`,[m(`&:active`,[g(`button`,`left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));`)])])])])])]),v(`active`,[g(`rail`,[g(`button`,`left: calc(100% - var(--n-button-width) - var(--n-offset))`)])]),g(`rail`,`
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
 `,[g(`button-icon`,`
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
 `,[s()]),g(`button`,`
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
 `)]),v(`active`,[g(`rail`,`background-color: var(--n-rail-color-active);`)]),v(`loading`,[g(`rail`,`
 cursor: wait;
 `)]),v(`disabled`,[g(`rail`,`
 cursor: not-allowed;
 opacity: .5;
 `)])]),j=Object.assign(Object.assign({},f.props),{size:String,value:{type:[String,Number,Boolean],default:void 0},loading:Boolean,defaultValue:{type:[String,Number,Boolean],default:!1},disabled:{type:Boolean,default:void 0},round:{type:Boolean,default:!0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],checkedValue:{type:[String,Number,Boolean],default:!0},uncheckedValue:{type:[String,Number,Boolean],default:!1},railStyle:Function,rubberBand:{type:Boolean,default:!0},spinProps:Object,onChange:[Function,Array]}),M,N=u({name:`Switch`,props:j,slots:Object,setup(e){M===void 0&&(M=typeof CSS<`u`?CSS.supports!==void 0&&CSS.supports(`width`,`max(1px)`):!0);let{mergedClsPrefixRef:t,inlineThemeDisabled:n,mergedComponentPropsRef:r}=d(e),a=f(`Switch`,`-switch`,A,k,e,t),o=i(e,{mergedSize(t){return e.size===void 0?t?t.mergedSize.value:r?.value?.Switch?.size||`medium`:e.size}}),{mergedSizeRef:s,mergedDisabledRef:l}=o,u=_(e.defaultValue),m=S(e,`value`),h=E(m,u),g=y(()=>h.value===e.checkedValue),v=_(!1),b=_(!1),w=y(()=>{let{railStyle:t}=e;if(t)return t({focused:b.value,checked:g.value})});function D(t){let{"onUpdate:value":n,onChange:r,onUpdateValue:i}=e,{nTriggerFormInput:a,nTriggerFormChange:s}=o;n&&c(n,t),i&&c(i,t),r&&c(r,t),u.value=t,a(),s()}function O(){let{nTriggerFormFocus:e}=o;e()}function j(){let{nTriggerFormBlur:e}=o;e()}function N(){e.loading||l.value||(h.value===e.checkedValue?D(e.uncheckedValue):D(e.checkedValue))}function P(){b.value=!0,O()}function F(){b.value=!1,j(),v.value=!1}function I(t){e.loading||l.value||t.key===` `&&(h.value===e.checkedValue?D(e.uncheckedValue):D(e.checkedValue),v.value=!1)}function L(t){e.loading||l.value||t.key===` `&&(t.preventDefault(),v.value=!0)}let R=y(()=>{let{value:e}=s,{self:{opacityDisabled:t,railColor:n,railColorActive:r,buttonBoxShadow:i,buttonColor:o,boxShadowFocus:c,loadingColor:l,textColor:u,iconColor:d,[x(`buttonHeight`,e)]:f,[x(`buttonWidth`,e)]:m,[x(`buttonWidthPressed`,e)]:h,[x(`railHeight`,e)]:g,[x(`railWidth`,e)]:_,[x(`railBorderRadius`,e)]:v,[x(`buttonBorderRadius`,e)]:y},common:{cubicBezierEaseInOut:b}}=a.value,S,w,T;return M?(S=`calc((${g} - ${f}) / 2)`,w=`max(${g}, ${f})`,T=`max(${_}, calc(${_} + ${f} - ${g}))`):(S=p((C(g)-C(f))/2),w=p(Math.max(C(g),C(f))),T=C(g)>C(f)?_:p(C(_)+C(f)-C(g))),{"--n-bezier":b,"--n-button-border-radius":y,"--n-button-box-shadow":i,"--n-button-color":o,"--n-button-width":m,"--n-button-width-pressed":h,"--n-button-height":f,"--n-height":w,"--n-offset":S,"--n-opacity-disabled":t,"--n-rail-border-radius":v,"--n-rail-color":n,"--n-rail-color-active":r,"--n-rail-height":g,"--n-rail-width":_,"--n-width":T,"--n-box-shadow-focus":c,"--n-loading-color":l,"--n-text-color":u,"--n-icon-color":d}}),z=n?T(`switch`,y(()=>s.value[0]),R,e):void 0;return{handleClick:N,handleBlur:F,handleFocus:P,handleKeyup:I,handleKeydown:L,mergedRailStyle:w,pressed:v,mergedClsPrefix:t,mergedValue:h,checked:g,mergedDisabled:l,cssVars:n?void 0:R,themeClass:z?.themeClass,onRender:z?.onRender}},render(){let{mergedClsPrefix:i,mergedDisabled:o,checked:s,mergedRailStyle:c,onRender:l,$slots:u}=this;l?.();let{checked:d,unchecked:f,icon:p,"checked-icon":m,"unchecked-icon":h}=u,g=!(t(p)&&t(m)&&t(h));return r(`div`,{role:`switch`,"aria-checked":s,class:[`${i}-switch`,this.themeClass,g&&`${i}-switch--icon`,s&&`${i}-switch--active`,o&&`${i}-switch--disabled`,this.round&&`${i}-switch--round`,this.loading&&`${i}-switch--loading`,this.pressed&&`${i}-switch--pressed`,this.rubberBand&&`${i}-switch--rubber-band`],tabindex:this.mergedDisabled?void 0:0,style:this.cssVars,onClick:this.handleClick,onFocus:this.handleFocus,onBlur:this.handleBlur,onKeyup:this.handleKeyup,onKeydown:this.handleKeydown},r(`div`,{class:`${i}-switch__rail`,"aria-hidden":`true`,style:c},a(d,e=>a(f,t=>e||t?r(`div`,{"aria-hidden":!0,class:`${i}-switch__children-placeholder`},r(`div`,{class:`${i}-switch__rail-placeholder`},r(`div`,{class:`${i}-switch__button-placeholder`}),e),r(`div`,{class:`${i}-switch__rail-placeholder`},r(`div`,{class:`${i}-switch__button-placeholder`}),t)):null)),r(`div`,{class:`${i}-switch__button`},a(p,t=>a(m,o=>a(h,a=>r(n,null,{default:()=>this.loading?r(e,Object.assign({key:`loading`,clsPrefix:i,strokeWidth:20},this.spinProps)):this.checked&&(o||t)?r(`div`,{class:`${i}-switch__button-icon`,key:o?`checked-icon`:`icon`},o||t):!this.checked&&(a||t)?r(`div`,{class:`${i}-switch__button-icon`,key:a?`unchecked-icon`:`icon`},a||t):null})))),a(d,e=>e&&r(`div`,{key:`checked`,class:`${i}-switch__checked`},e)),a(f,e=>e&&r(`div`,{key:`unchecked`,class:`${i}-switch__unchecked`},e)))))}}),P=h(`triangle-alert`,[[`path`,{d:`m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3`,key:`wmoenq`}],[`path`,{d:`M12 9v4`,key:`juzpu7`}],[`path`,{d:`M12 17h.01`,key:`p32p05`}]]);export{N as n,P as t};