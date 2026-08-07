import{Bt as e,D as t,Dt as n,Et as r,Gn as i,Ht as a,I as o,N as s,Nn as c,Pn as l,Rt as u,Ut as d,_t as f,an as p,cn as m,gt as h,in as g,jn as _,ln as v,nn as y,or as b,rr as x,sn as S,tn as C,vt as w,wn as T,z as E}from"./auth-DkWBYjip.js";import{o as D}from"./get-ZXo8anbV.js";import{t as O}from"./light-Be5M-2Xp.js";var k=u(`n-checkbox-group`),A=_({name:`CheckboxGroup`,props:{min:Number,max:Number,size:String,value:Array,defaultValue:{type:Array,default:null},disabled:{type:Boolean,default:void 0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onChange:[Function,Array]},setup(e){let{mergedClsPrefixRef:t}=w(e),r=h(e),{mergedSizeRef:a,mergedDisabledRef:o}=r,s=x(e.defaultValue),c=T(()=>e.value),l=D(c,s),u=T(()=>l.value?.length||0),d=T(()=>Array.isArray(l.value)?new Set(l.value):new Set);function f(t,i){let{nTriggerFormInput:a,nTriggerFormChange:o}=r,{onChange:c,"onUpdate:value":u,onUpdateValue:d}=e;if(Array.isArray(l.value)){let e=Array.from(l.value),r=e.findIndex(e=>e===i);t?~r||(e.push(i),d&&n(d,e,{actionType:`check`,value:i}),u&&n(u,e,{actionType:`check`,value:i}),a(),o(),s.value=e,c&&n(c,e)):~r&&(e.splice(r,1),d&&n(d,e,{actionType:`uncheck`,value:i}),u&&n(u,e,{actionType:`uncheck`,value:i}),c&&n(c,e),s.value=e,a(),o())}else t?(d&&n(d,[i],{actionType:`check`,value:i}),u&&n(u,[i],{actionType:`check`,value:i}),c&&n(c,[i]),s.value=[i],a(),o()):(d&&n(d,[],{actionType:`uncheck`,value:i}),u&&n(u,[],{actionType:`uncheck`,value:i}),c&&n(c,[]),s.value=[],a(),o())}return i(k,{checkedCountRef:u,maxRef:b(e,`max`),minRef:b(e,`min`),valueSetRef:d,disabledRef:o,mergedSizeRef:a,toggleCheckbox:f}),{mergedClsPrefix:t}},render(){return c(`div`,{class:`${this.mergedClsPrefix}-checkbox-group`,role:`group`},this.$slots)}}),j=()=>c(`svg`,{viewBox:`0 0 64 64`,class:`check-icon`},c(`path`,{d:`M50.42,16.76L22.34,39.45l-8.1-11.46c-1.12-1.58-3.3-1.96-4.88-0.84c-1.58,1.12-1.95,3.3-0.84,4.88l10.26,14.51  c0.56,0.79,1.42,1.31,2.38,1.45c0.16,0.02,0.32,0.03,0.48,0.03c0.8,0,1.57-0.27,2.2-0.78l30.99-25.03c1.5-1.21,1.74-3.42,0.52-4.92  C54.13,15.78,51.93,15.55,50.42,16.76z`})),M=()=>c(`svg`,{viewBox:`0 0 100 100`,class:`line-icon`},c(`path`,{d:`M80.2,55.5H21.4c-2.8,0-5.1-2.5-5.1-5.5l0,0c0-3,2.3-5.5,5.1-5.5h58.7c2.8,0,5.1,2.5,5.1,5.5l0,0C85.2,53.1,82.9,55.5,80.2,55.5z`})),N=C([y(`checkbox`,`
 font-size: var(--n-font-size);
 outline: none;
 cursor: pointer;
 display: inline-flex;
 flex-wrap: nowrap;
 align-items: flex-start;
 word-break: break-word;
 line-height: var(--n-size);
 --n-merged-color-table: var(--n-color-table);
 `,[p(`show-label`,`line-height: var(--n-label-line-height);`),C(`&:hover`,[y(`checkbox-box`,[g(`border`,`border: var(--n-border-checked);`)])]),C(`&:focus:not(:active)`,[y(`checkbox-box`,[g(`border`,`
 border: var(--n-border-focus);
 box-shadow: var(--n-box-shadow-focus);
 `)])]),p(`inside-table`,[y(`checkbox-box`,`
 background-color: var(--n-merged-color-table);
 `)]),p(`checked`,[y(`checkbox-box`,`
 background-color: var(--n-color-checked);
 `,[y(`checkbox-icon`,[C(`.check-icon`,`
 opacity: 1;
 transform: scale(1);
 `)])])]),p(`indeterminate`,[y(`checkbox-box`,[y(`checkbox-icon`,[C(`.check-icon`,`
 opacity: 0;
 transform: scale(.5);
 `),C(`.line-icon`,`
 opacity: 1;
 transform: scale(1);
 `)])])]),p(`checked, indeterminate`,[C(`&:focus:not(:active)`,[y(`checkbox-box`,[g(`border`,`
 border: var(--n-border-checked);
 box-shadow: var(--n-box-shadow-focus);
 `)])]),y(`checkbox-box`,`
 background-color: var(--n-color-checked);
 border-left: 0;
 border-top: 0;
 `,[g(`border`,{border:`var(--n-border-checked)`})])]),p(`disabled`,{cursor:`not-allowed`},[p(`checked`,[y(`checkbox-box`,`
 background-color: var(--n-color-disabled-checked);
 `,[g(`border`,{border:`var(--n-border-disabled-checked)`}),y(`checkbox-icon`,[C(`.check-icon, .line-icon`,{fill:`var(--n-check-mark-color-disabled-checked)`})])])]),y(`checkbox-box`,`
 background-color: var(--n-color-disabled);
 `,[g(`border`,`
 border: var(--n-border-disabled);
 `),y(`checkbox-icon`,[C(`.check-icon, .line-icon`,`
 fill: var(--n-check-mark-color-disabled);
 `)])]),g(`label`,`
 color: var(--n-text-color-disabled);
 `)]),y(`checkbox-box-wrapper`,`
 position: relative;
 width: var(--n-size);
 flex-shrink: 0;
 flex-grow: 0;
 user-select: none;
 -webkit-user-select: none;
 `),y(`checkbox-box`,`
 position: absolute;
 left: 0;
 top: 50%;
 transform: translateY(-50%);
 height: var(--n-size);
 width: var(--n-size);
 display: inline-block;
 box-sizing: border-box;
 border-radius: var(--n-border-radius);
 background-color: var(--n-color);
 transition: background-color 0.3s var(--n-bezier);
 `,[g(`border`,`
 transition:
 border-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 border-radius: inherit;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border: var(--n-border);
 `),y(`checkbox-icon`,`
 display: flex;
 align-items: center;
 justify-content: center;
 position: absolute;
 left: 1px;
 right: 1px;
 top: 1px;
 bottom: 1px;
 `,[C(`.check-icon, .line-icon`,`
 width: 100%;
 fill: var(--n-check-mark-color);
 opacity: 0;
 transform: scale(0.5);
 transform-origin: center;
 transition:
 fill 0.3s var(--n-bezier),
 transform 0.3s var(--n-bezier),
 opacity 0.3s var(--n-bezier),
 border-color 0.3s var(--n-bezier);
 `),t({left:`1px`,top:`1px`})])]),g(`label`,`
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 user-select: none;
 -webkit-user-select: none;
 padding: var(--n-label-padding);
 font-weight: var(--n-label-font-weight);
 `,[C(`&:empty`,{display:`none`})])]),m(y(`checkbox`,`
 --n-merged-color-table: var(--n-color-table-modal);
 `)),v(y(`checkbox`,`
 --n-merged-color-table: var(--n-color-table-popover);
 `))]),P=Object.assign(Object.assign({},o.props),{size:String,checked:{type:[Boolean,String,Number],default:void 0},defaultChecked:{type:[Boolean,String,Number],default:!1},value:[String,Number],disabled:{type:Boolean,default:void 0},indeterminate:Boolean,label:String,focusable:{type:Boolean,default:!0},checkedValue:{type:[Boolean,String,Number],default:!0},uncheckedValue:{type:[Boolean,String,Number],default:!1},"onUpdate:checked":[Function,Array],onUpdateChecked:[Function,Array],privateInsideTable:Boolean,onChange:[Function,Array]}),F=_({name:`Checkbox`,props:P,setup(t){let r=l(k,null),i=x(null),{mergedClsPrefixRef:a,inlineThemeDisabled:s,mergedRtlRef:c,mergedComponentPropsRef:u}=w(t),p=x(t.defaultChecked),m=b(t,`checked`),g=D(m,p),_=e(()=>{if(r){let e=r.valueSetRef.value;return e&&t.value!==void 0?e.has(t.value):!1}return g.value===t.checkedValue}),v=h(t,{mergedSize(e){let{size:n}=t;if(n!==void 0)return n;if(r){let{value:e}=r.mergedSizeRef;if(e!==void 0)return e}if(e){let{mergedSize:t}=e;if(t!==void 0)return t.value}return u?.value?.Checkbox?.size||`medium`},mergedDisabled(e){let{disabled:n}=t;if(n!==void 0)return n;if(r){if(r.disabledRef.value)return!0;let{maxRef:{value:e},checkedCountRef:t}=r;if(e!==void 0&&t.value>=e&&!_.value)return!0;let{minRef:{value:n}}=r;if(n!==void 0&&t.value<=n&&_.value)return!0}return e?e.disabled.value:!1}}),{mergedDisabledRef:y,mergedSizeRef:C}=v,A=o(`Checkbox`,`-checkbox`,N,O,t,a);function j(e){if(r&&t.value!==void 0)r.toggleCheckbox(!_.value,t.value);else{let{onChange:r,"onUpdate:checked":i,onUpdateChecked:a}=t,{nTriggerFormInput:o,nTriggerFormChange:s}=v,c=_.value?t.uncheckedValue:t.checkedValue;i&&n(i,c,e),a&&n(a,c,e),r&&n(r,c,e),o(),s(),p.value=c}}function M(e){y.value||j(e)}function P(e){if(!y.value)switch(e.key){case` `:case`Enter`:j(e)}}function F(e){e.key===` `&&e.preventDefault()}let I={focus:()=>{var e;(e=i.value)==null||e.focus()},blur:()=>{var e;(e=i.value)==null||e.blur()}},L=E(`Checkbox`,c,a),R=T(()=>{let{value:e}=C,{common:{cubicBezierEaseInOut:t},self:{borderRadius:n,color:r,colorChecked:i,colorDisabled:a,colorTableHeader:o,colorTableHeaderModal:s,colorTableHeaderPopover:c,checkMarkColor:l,checkMarkColorDisabled:u,border:d,borderFocus:f,borderDisabled:p,borderChecked:m,boxShadowFocus:h,textColor:g,textColorDisabled:_,checkMarkColorDisabledChecked:v,colorDisabledChecked:y,borderDisabledChecked:b,labelPadding:x,labelLineHeight:w,labelFontWeight:T,[S(`fontSize`,e)]:E,[S(`size`,e)]:D}}=A.value;return{"--n-label-line-height":w,"--n-label-font-weight":T,"--n-size":D,"--n-bezier":t,"--n-border-radius":n,"--n-border":d,"--n-border-checked":m,"--n-border-focus":f,"--n-border-disabled":p,"--n-border-disabled-checked":b,"--n-box-shadow-focus":h,"--n-color":r,"--n-color-checked":i,"--n-color-table":o,"--n-color-table-modal":s,"--n-color-table-popover":c,"--n-color-disabled":a,"--n-color-disabled-checked":y,"--n-text-color":g,"--n-text-color-disabled":_,"--n-check-mark-color":l,"--n-check-mark-color-disabled":u,"--n-check-mark-color-disabled-checked":v,"--n-font-size":E,"--n-label-padding":x}}),z=s?f(`checkbox`,T(()=>C.value[0]),R,t):void 0;return Object.assign(v,I,{rtlEnabled:L,selfRef:i,mergedClsPrefix:a,mergedDisabled:y,renderedChecked:_,mergedTheme:A,labelId:d(),handleClick:M,handleKeyUp:P,handleKeyDown:F,cssVars:s?void 0:R,themeClass:z?.themeClass,onRender:z?.onRender})},render(){var e;let{$slots:t,renderedChecked:n,mergedDisabled:i,indeterminate:o,privateInsideTable:l,cssVars:u,labelId:d,label:f,mergedClsPrefix:p,focusable:m,handleKeyUp:h,handleKeyDown:g,handleClick:_}=this;(e=this.onRender)==null||e.call(this);let v=r(t.default,e=>f||e?c(`span`,{class:`${p}-checkbox__label`,id:d},f||e):null);return c(`div`,{ref:`selfRef`,class:[`${p}-checkbox`,this.themeClass,this.rtlEnabled&&`${p}-checkbox--rtl`,n&&`${p}-checkbox--checked`,i&&`${p}-checkbox--disabled`,o&&`${p}-checkbox--indeterminate`,l&&`${p}-checkbox--inside-table`,v&&`${p}-checkbox--show-label`],tabindex:i||!m?void 0:0,role:`checkbox`,"aria-checked":o?`mixed`:n,"aria-labelledby":d,style:u,onKeyup:h,onKeydown:g,onClick:_,onMousedown:()=>{a(`selectstart`,window,e=>{e.preventDefault()},{once:!0})}},c(`div`,{class:`${p}-checkbox-box-wrapper`},`\xA0`,c(`div`,{class:`${p}-checkbox-box`},c(s,null,{default:()=>this.indeterminate?c(`div`,{key:`indeterminate`,class:`${p}-checkbox-icon`},M()):c(`div`,{key:`check`,class:`${p}-checkbox-icon`},j())}),c(`div`,{class:`${p}-checkbox-box__border`}))),v)}});export{A as n,F as t};