import{$n as e,Bn as t,Ct as n,Gt as r,K as i,Pt as a,Rn as o,Tt as s,U as c,Vn as l,cn as u,dn as d,dr as f,fn as p,jn as m,ln as h,mn as g,mr as _,pn as v,qt as y,wt as b}from"./auth-CagbRib-.js";import{u as x}from"./useTheme-BUD59PT5.js";import{c as S}from"./LocaleSwitcher-Bh-zPO1-.js";import{n as C}from"./Tag-CMgr2iS2.js";import{t as w}from"./light-Cc8xdJbj.js";var T={name:String,value:{type:[String,Number,Boolean],default:`on`},checked:{type:Boolean,default:void 0},defaultChecked:Boolean,disabled:{type:Boolean,default:void 0},label:String,size:String,onUpdateChecked:[Function,Array],"onUpdate:checked":[Function,Array],checkedValue:{type:Boolean,default:void 0}},E=r(`n-radio-group`);function D(e){let t=l(E,null),{mergedClsPrefixRef:r,mergedComponentPropsRef:i}=s(e),o=n(e,{mergedSize(n){let{size:r}=e;if(r!==void 0)return r;if(t){let{mergedSizeRef:{value:e}}=t;if(e!==void 0)return e}return n?n.mergedSize.value:i?.value?.Radio?.size||`medium`},mergedDisabled(n){return!!(e.disabled||t?.disabledRef.value||n?.disabled.value)}}),{mergedSizeRef:c,mergedDisabledRef:u}=o,d=f(null),p=f(null),m=f(e.defaultChecked),h=_(e,`checked`),g=S(h,m),v=y(()=>t?t.valueRef.value===e.value:g.value),b=y(()=>{let{name:n}=e;if(n!==void 0)return n;if(t)return t.nameRef.value}),x=f(!1);function C(){if(t){let{doUpdateValue:n}=t,{value:r}=e;a(n,r)}else{let{onUpdateChecked:t,"onUpdate:checked":n}=e,{nTriggerFormInput:r,nTriggerFormChange:i}=o;t&&a(t,!0),n&&a(n,!0),r(),i(),m.value=!0}}function w(){u.value||v.value||C()}function T(){w(),d.value&&(d.value.checked=v.value)}function D(){x.value=!1}function O(){x.value=!0}return{mergedClsPrefix:t?t.mergedClsPrefixRef:r,inputRef:d,labelRef:p,mergedName:b,mergedDisabled:u,renderSafeChecked:v,focus:x,mergedSize:c,handleRadioInputChange:T,handleRadioInputBlur:D,handleRadioInputFocus:O}}var O=h(`radio-group`,`
 display: inline-block;
 font-size: var(--n-font-size);
`,[d(`splitor`,`
 display: inline-block;
 vertical-align: bottom;
 width: 1px;
 transition:
 background-color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 background: var(--n-button-border-color);
 `,[p(`checked`,{backgroundColor:`var(--n-button-border-color-active)`}),p(`disabled`,{opacity:`var(--n-opacity-disabled)`})]),p(`button-group`,`
 white-space: nowrap;
 height: var(--n-height);
 line-height: var(--n-height);
 `,[h(`radio-button`,{height:`var(--n-height)`,lineHeight:`var(--n-height)`}),d(`splitor`,{height:`var(--n-height)`})]),h(`radio-button`,`
 vertical-align: bottom;
 outline: none;
 position: relative;
 user-select: none;
 -webkit-user-select: none;
 display: inline-block;
 box-sizing: border-box;
 padding-left: 14px;
 padding-right: 14px;
 white-space: nowrap;
 transition:
 background-color .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 background: var(--n-button-color);
 color: var(--n-button-text-color);
 border-top: 1px solid var(--n-button-border-color);
 border-bottom: 1px solid var(--n-button-border-color);
 `,[h(`radio-input`,`
 pointer-events: none;
 position: absolute;
 border: 0;
 border-radius: inherit;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 opacity: 0;
 z-index: 1;
 `),d(`state-border`,`
 z-index: 1;
 pointer-events: none;
 position: absolute;
 box-shadow: var(--n-button-box-shadow);
 transition: box-shadow .3s var(--n-bezier);
 left: -1px;
 bottom: -1px;
 right: -1px;
 top: -1px;
 `),u(`&:first-child`,`
 border-top-left-radius: var(--n-button-border-radius);
 border-bottom-left-radius: var(--n-button-border-radius);
 border-left: 1px solid var(--n-button-border-color);
 `,[d(`state-border`,`
 border-top-left-radius: var(--n-button-border-radius);
 border-bottom-left-radius: var(--n-button-border-radius);
 `)]),u(`&:last-child`,`
 border-top-right-radius: var(--n-button-border-radius);
 border-bottom-right-radius: var(--n-button-border-radius);
 border-right: 1px solid var(--n-button-border-color);
 `,[d(`state-border`,`
 border-top-right-radius: var(--n-button-border-radius);
 border-bottom-right-radius: var(--n-button-border-radius);
 `)]),v(`disabled`,`
 cursor: pointer;
 `,[u(`&:hover`,[d(`state-border`,`
 transition: box-shadow .3s var(--n-bezier);
 box-shadow: var(--n-button-box-shadow-hover);
 `),v(`checked`,{color:`var(--n-button-text-color-hover)`})]),p(`focus`,[u(`&:not(:active)`,[d(`state-border`,{boxShadow:`var(--n-button-box-shadow-focus)`})])])]),p(`checked`,`
 background: var(--n-button-color-active);
 color: var(--n-button-text-color-active);
 border-color: var(--n-button-border-color-active);
 `),p(`disabled`,`
 cursor: not-allowed;
 opacity: var(--n-opacity-disabled);
 `)])]);function k(e,n,r){let i=[],a=!1;for(let o=0;o<e.length;++o){let s=e[o],c=s.type?.name;c===`RadioButton`&&(a=!0);let l=s.props;if(c!==`RadioButton`){i.push(s);continue}if(o===0)i.push(s);else{let e=i[i.length-1].props,a=n===e.value,o=e.disabled,c=n===l.value,u=l.disabled,d=(a?2:0)+ +!o,f=(c?2:0)+ +!u,p={[`${r}-radio-group__splitor--disabled`]:o,[`${r}-radio-group__splitor--checked`]:a},m={[`${r}-radio-group__splitor--disabled`]:u,[`${r}-radio-group__splitor--checked`]:c},h=d<f?m:p;i.push(t(`div`,{class:[`${r}-radio-group__splitor`,h]}),s)}}return{children:i,isButtonGroup:a}}var A=Object.assign(Object.assign({},c.props),{name:String,value:[String,Number,Boolean],defaultValue:{type:[String,Number,Boolean],default:null},size:String,disabled:{type:Boolean,default:void 0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array]}),j=o({name:`RadioGroup`,props:A,setup(t){let r=f(null),{mergedSizeRef:o,mergedDisabledRef:l,nTriggerFormChange:u,nTriggerFormInput:d,nTriggerFormBlur:p,nTriggerFormFocus:h}=n(t),{mergedClsPrefixRef:v,inlineThemeDisabled:y,mergedRtlRef:x}=s(t),C=c(`Radio`,`-radio-group`,O,w,t,v),T=f(t.defaultValue),D=_(t,`value`),k=S(D,T);function A(e){let{onUpdateValue:n,"onUpdate:value":r}=t;n&&a(n,e),r&&a(r,e),T.value=e,u(),d()}function j(e){let{value:t}=r;t&&(t.contains(e.relatedTarget)||h())}function M(e){let{value:t}=r;t&&(t.contains(e.relatedTarget)||p())}e(E,{mergedClsPrefixRef:v,nameRef:_(t,`name`),valueRef:k,disabledRef:l,mergedSizeRef:o,doUpdateValue:A});let N=i(`Radio`,x,v),P=m(()=>{let{value:e}=o,{common:{cubicBezierEaseInOut:t},self:{buttonBorderColor:n,buttonBorderColorActive:r,buttonBorderRadius:i,buttonBoxShadow:a,buttonBoxShadowFocus:s,buttonBoxShadowHover:c,buttonColor:l,buttonColorActive:u,buttonTextColor:d,buttonTextColorActive:f,buttonTextColorHover:p,opacityDisabled:m,[g(`buttonHeight`,e)]:h,[g(`fontSize`,e)]:_}}=C.value;return{"--n-font-size":_,"--n-bezier":t,"--n-button-border-color":n,"--n-button-border-color-active":r,"--n-button-border-radius":i,"--n-button-box-shadow":a,"--n-button-box-shadow-focus":s,"--n-button-box-shadow-hover":c,"--n-button-color":l,"--n-button-color-active":u,"--n-button-text-color":d,"--n-button-text-color-hover":p,"--n-button-text-color-active":f,"--n-height":h,"--n-opacity-disabled":m}}),F=y?b(`radio-group`,m(()=>o.value[0]),P,t):void 0;return{selfElRef:r,rtlEnabled:N,mergedClsPrefix:v,mergedValue:k,handleFocusout:M,handleFocusin:j,cssVars:y?void 0:P,themeClass:F?.themeClass,onRender:F?.onRender}},render(){var e;let{mergedValue:n,mergedClsPrefix:r,handleFocusin:i,handleFocusout:a}=this,{children:o,isButtonGroup:s}=k(x(C(this)),n,r);return(e=this.onRender)==null||e.call(this),t(`div`,{onFocusin:i,onFocusout:a,ref:`selfElRef`,class:[`${r}-radio-group`,this.rtlEnabled&&`${r}-radio-group--rtl`,this.themeClass,s&&`${r}-radio-group--button-group`],style:this.cssVars},o)}});export{T as n,D as r,j as t};