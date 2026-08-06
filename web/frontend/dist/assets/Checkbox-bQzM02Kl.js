import{$t as e,Bn as t,E as n,En as r,Ft as i,Lt as a,Nt as o,O as s,On as c,P as l,Qn as u,Rt as d,St as f,Xt as p,Zt as m,dt as h,en as g,ft as _,in as v,j as y,kn as b,nn as x,pt as S,rn as C,tr as w,xt as T,yn as E}from"./auth-CSROUTah.js";import{o as D}from"./get-CZqj-Zm2.js";import{t as O}from"./light-8yFmJ69Y.js";var k=o(`n-checkbox-group`),A=r({name:`CheckboxGroup`,props:{min:Number,max:Number,size:String,value:Array,defaultValue:{type:Array,default:null},disabled:{type:Boolean,default:void 0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onChange:[Function,Array]},setup(e){let{mergedClsPrefixRef:n}=S(e),r=h(e),{mergedSizeRef:i,mergedDisabledRef:a}=r,o=u(e.defaultValue),s=E(()=>e.value),c=D(s,o),l=E(()=>c.value?.length||0),d=E(()=>Array.isArray(c.value)?new Set(c.value):new Set);function p(t,n){let{nTriggerFormInput:i,nTriggerFormChange:a}=r,{onChange:s,"onUpdate:value":l,onUpdateValue:u}=e;if(Array.isArray(c.value)){let e=Array.from(c.value),r=e.findIndex(e=>e===n);t?~r||(e.push(n),u&&f(u,e,{actionType:`check`,value:n}),l&&f(l,e,{actionType:`check`,value:n}),i(),a(),o.value=e,s&&f(s,e)):~r&&(e.splice(r,1),u&&f(u,e,{actionType:`uncheck`,value:n}),l&&f(l,e,{actionType:`uncheck`,value:n}),s&&f(s,e),o.value=e,i(),a())}else t?(u&&f(u,[n],{actionType:`check`,value:n}),l&&f(l,[n],{actionType:`check`,value:n}),s&&f(s,[n]),o.value=[n],i(),a()):(u&&f(u,[],{actionType:`uncheck`,value:n}),l&&f(l,[],{actionType:`uncheck`,value:n}),s&&f(s,[]),o.value=[],i(),a())}return t(k,{checkedCountRef:l,maxRef:w(e,`max`),minRef:w(e,`min`),valueSetRef:d,disabledRef:a,mergedSizeRef:i,toggleCheckbox:p}),{mergedClsPrefix:n}},render(){return c(`div`,{class:`${this.mergedClsPrefix}-checkbox-group`,role:`group`},this.$slots)}}),j=()=>c(`svg`,{viewBox:`0 0 64 64`,class:`check-icon`},c(`path`,{d:`M50.42,16.76L22.34,39.45l-8.1-11.46c-1.12-1.58-3.3-1.96-4.88-0.84c-1.58,1.12-1.95,3.3-0.84,4.88l10.26,14.51  c0.56,0.79,1.42,1.31,2.38,1.45c0.16,0.02,0.32,0.03,0.48,0.03c0.8,0,1.57-0.27,2.2-0.78l30.99-25.03c1.5-1.21,1.74-3.42,0.52-4.92  C54.13,15.78,51.93,15.55,50.42,16.76z`})),M=()=>c(`svg`,{viewBox:`0 0 100 100`,class:`line-icon`},c(`path`,{d:`M80.2,55.5H21.4c-2.8,0-5.1-2.5-5.1-5.5l0,0c0-3,2.3-5.5,5.1-5.5h58.7c2.8,0,5.1,2.5,5.1,5.5l0,0C85.2,53.1,82.9,55.5,80.2,55.5z`})),N=p([m(`checkbox`,`
 font-size: var(--n-font-size);
 outline: none;
 cursor: pointer;
 display: inline-flex;
 flex-wrap: nowrap;
 align-items: flex-start;
 word-break: break-word;
 line-height: var(--n-size);
 --n-merged-color-table: var(--n-color-table);
 `,[g(`show-label`,`line-height: var(--n-label-line-height);`),p(`&:hover`,[m(`checkbox-box`,[e(`border`,`border: var(--n-border-checked);`)])]),p(`&:focus:not(:active)`,[m(`checkbox-box`,[e(`border`,`
 border: var(--n-border-focus);
 box-shadow: var(--n-box-shadow-focus);
 `)])]),g(`inside-table`,[m(`checkbox-box`,`
 background-color: var(--n-merged-color-table);
 `)]),g(`checked`,[m(`checkbox-box`,`
 background-color: var(--n-color-checked);
 `,[m(`checkbox-icon`,[p(`.check-icon`,`
 opacity: 1;
 transform: scale(1);
 `)])])]),g(`indeterminate`,[m(`checkbox-box`,[m(`checkbox-icon`,[p(`.check-icon`,`
 opacity: 0;
 transform: scale(.5);
 `),p(`.line-icon`,`
 opacity: 1;
 transform: scale(1);
 `)])])]),g(`checked, indeterminate`,[p(`&:focus:not(:active)`,[m(`checkbox-box`,[e(`border`,`
 border: var(--n-border-checked);
 box-shadow: var(--n-box-shadow-focus);
 `)])]),m(`checkbox-box`,`
 background-color: var(--n-color-checked);
 border-left: 0;
 border-top: 0;
 `,[e(`border`,{border:`var(--n-border-checked)`})])]),g(`disabled`,{cursor:`not-allowed`},[g(`checked`,[m(`checkbox-box`,`
 background-color: var(--n-color-disabled-checked);
 `,[e(`border`,{border:`var(--n-border-disabled-checked)`}),m(`checkbox-icon`,[p(`.check-icon, .line-icon`,{fill:`var(--n-check-mark-color-disabled-checked)`})])])]),m(`checkbox-box`,`
 background-color: var(--n-color-disabled);
 `,[e(`border`,`
 border: var(--n-border-disabled);
 `),m(`checkbox-icon`,[p(`.check-icon, .line-icon`,`
 fill: var(--n-check-mark-color-disabled);
 `)])]),e(`label`,`
 color: var(--n-text-color-disabled);
 `)]),m(`checkbox-box-wrapper`,`
 position: relative;
 width: var(--n-size);
 flex-shrink: 0;
 flex-grow: 0;
 user-select: none;
 -webkit-user-select: none;
 `),m(`checkbox-box`,`
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
 `,[e(`border`,`
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
 `),m(`checkbox-icon`,`
 display: flex;
 align-items: center;
 justify-content: center;
 position: absolute;
 left: 1px;
 right: 1px;
 top: 1px;
 bottom: 1px;
 `,[p(`.check-icon, .line-icon`,`
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
 `),n({left:`1px`,top:`1px`})])]),e(`label`,`
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 user-select: none;
 -webkit-user-select: none;
 padding: var(--n-label-padding);
 font-weight: var(--n-label-font-weight);
 `,[p(`&:empty`,{display:`none`})])]),C(m(`checkbox`,`
 --n-merged-color-table: var(--n-color-table-modal);
 `)),v(m(`checkbox`,`
 --n-merged-color-table: var(--n-color-table-popover);
 `))]),P=Object.assign(Object.assign({},y.props),{size:String,checked:{type:[Boolean,String,Number],default:void 0},defaultChecked:{type:[Boolean,String,Number],default:!1},value:[String,Number],disabled:{type:Boolean,default:void 0},indeterminate:Boolean,label:String,focusable:{type:Boolean,default:!0},checkedValue:{type:[Boolean,String,Number],default:!0},uncheckedValue:{type:[Boolean,String,Number],default:!1},"onUpdate:checked":[Function,Array],onUpdateChecked:[Function,Array],privateInsideTable:Boolean,onChange:[Function,Array]}),F=r({name:`Checkbox`,props:P,setup(e){let t=b(k,null),n=u(null),{mergedClsPrefixRef:r,inlineThemeDisabled:a,mergedRtlRef:o,mergedComponentPropsRef:s}=S(e),c=u(e.defaultChecked),p=w(e,`checked`),m=D(p,c),g=i(()=>{if(t){let n=t.valueSetRef.value;return n&&e.value!==void 0?n.has(e.value):!1}return m.value===e.checkedValue}),v=h(e,{mergedSize(n){let{size:r}=e;if(r!==void 0)return r;if(t){let{value:e}=t.mergedSizeRef;if(e!==void 0)return e}if(n){let{mergedSize:e}=n;if(e!==void 0)return e.value}return s?.value?.Checkbox?.size||`medium`},mergedDisabled(n){let{disabled:r}=e;if(r!==void 0)return r;if(t){if(t.disabledRef.value)return!0;let{maxRef:{value:e},checkedCountRef:n}=t;if(e!==void 0&&n.value>=e&&!g.value)return!0;let{minRef:{value:r}}=t;if(r!==void 0&&n.value<=r&&g.value)return!0}return n?n.disabled.value:!1}}),{mergedDisabledRef:C,mergedSizeRef:T}=v,A=y(`Checkbox`,`-checkbox`,N,O,e,r);function j(n){if(t&&e.value!==void 0)t.toggleCheckbox(!g.value,e.value);else{let{onChange:t,"onUpdate:checked":r,onUpdateChecked:i}=e,{nTriggerFormInput:a,nTriggerFormChange:o}=v,s=g.value?e.uncheckedValue:e.checkedValue;r&&f(r,s,n),i&&f(i,s,n),t&&f(t,s,n),a(),o(),c.value=s}}function M(e){C.value||j(e)}function P(e){if(!C.value)switch(e.key){case` `:case`Enter`:j(e)}}function F(e){e.key===` `&&e.preventDefault()}let I={focus:()=>{var e;(e=n.value)==null||e.focus()},blur:()=>{var e;(e=n.value)==null||e.blur()}},L=l(`Checkbox`,o,r),R=E(()=>{let{value:e}=T,{common:{cubicBezierEaseInOut:t},self:{borderRadius:n,color:r,colorChecked:i,colorDisabled:a,colorTableHeader:o,colorTableHeaderModal:s,colorTableHeaderPopover:c,checkMarkColor:l,checkMarkColorDisabled:u,border:d,borderFocus:f,borderDisabled:p,borderChecked:m,boxShadowFocus:h,textColor:g,textColorDisabled:_,checkMarkColorDisabledChecked:v,colorDisabledChecked:y,borderDisabledChecked:b,labelPadding:S,labelLineHeight:C,labelFontWeight:w,[x(`fontSize`,e)]:E,[x(`size`,e)]:D}}=A.value;return{"--n-label-line-height":C,"--n-label-font-weight":w,"--n-size":D,"--n-bezier":t,"--n-border-radius":n,"--n-border":d,"--n-border-checked":m,"--n-border-focus":f,"--n-border-disabled":p,"--n-border-disabled-checked":b,"--n-box-shadow-focus":h,"--n-color":r,"--n-color-checked":i,"--n-color-table":o,"--n-color-table-modal":s,"--n-color-table-popover":c,"--n-color-disabled":a,"--n-color-disabled-checked":y,"--n-text-color":g,"--n-text-color-disabled":_,"--n-check-mark-color":l,"--n-check-mark-color-disabled":u,"--n-check-mark-color-disabled-checked":v,"--n-font-size":E,"--n-label-padding":S}}),z=a?_(`checkbox`,E(()=>T.value[0]),R,e):void 0;return Object.assign(v,I,{rtlEnabled:L,selfRef:n,mergedClsPrefix:r,mergedDisabled:C,renderedChecked:g,mergedTheme:A,labelId:d(),handleClick:M,handleKeyUp:P,handleKeyDown:F,cssVars:a?void 0:R,themeClass:z?.themeClass,onRender:z?.onRender})},render(){var e;let{$slots:t,renderedChecked:n,mergedDisabled:r,indeterminate:i,privateInsideTable:o,cssVars:l,labelId:u,label:d,mergedClsPrefix:f,focusable:p,handleKeyUp:m,handleKeyDown:h,handleClick:g}=this;(e=this.onRender)==null||e.call(this);let _=T(t.default,e=>d||e?c(`span`,{class:`${f}-checkbox__label`,id:u},d||e):null);return c(`div`,{ref:`selfRef`,class:[`${f}-checkbox`,this.themeClass,this.rtlEnabled&&`${f}-checkbox--rtl`,n&&`${f}-checkbox--checked`,r&&`${f}-checkbox--disabled`,i&&`${f}-checkbox--indeterminate`,o&&`${f}-checkbox--inside-table`,_&&`${f}-checkbox--show-label`],tabindex:r||!p?void 0:0,role:`checkbox`,"aria-checked":i?`mixed`:n,"aria-labelledby":u,style:l,onKeyup:m,onKeydown:h,onClick:g,onMousedown:()=>{a(`selectstart`,window,e=>{e.preventDefault()},{once:!0})}},c(`div`,{class:`${f}-checkbox-box-wrapper`},`\xA0`,c(`div`,{class:`${f}-checkbox-box`},c(s,null,{default:()=>this.indeterminate?c(`div`,{key:`indeterminate`,class:`${f}-checkbox-icon`},M()):c(`div`,{key:`check`,class:`${f}-checkbox-icon`},j())}),c(`div`,{class:`${f}-checkbox-box__border`}))),_)}});export{A as n,F as t};