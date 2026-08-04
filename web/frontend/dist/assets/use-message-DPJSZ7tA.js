import{C as e,Gn as t,Gt as n,Jn as r,Jt as i,Nn as a,Nt as o,O as s,Qt as c,Sn as l,T as u,Wt as d,Xt as f,Zt as p,ct as m,fn as h,j as g,jt as _,kt as v,lt as y,qt as b,ut as x,vt as S,xn as C,xt as w,yn as T,yt as E}from"./auth-CPbU0tuF.js";import{o as D}from"./fade-in-height-expand.cssr-Kmdf5eZ5.js";import{r as O}from"./_plugin-vue_export-helper-fnLlD4xv.js";import{r as k,t as A}from"./context-D2ha3D4v.js";var j=v(`n-checkbox-group`),M=T({name:`CheckboxGroup`,props:{min:Number,max:Number,size:String,value:Array,defaultValue:{type:Array,default:null},disabled:{type:Boolean,default:void 0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onChange:[Function,Array]},setup(e){let{mergedClsPrefixRef:n}=x(e),i=m(e),{mergedSizeRef:o,mergedDisabledRef:s}=i,c=t(e.defaultValue),l=h(()=>e.value),u=O(l,c),d=h(()=>u.value?.length||0),f=h(()=>Array.isArray(u.value)?new Set(u.value):new Set);function p(t,n){let{nTriggerFormInput:r,nTriggerFormChange:a}=i,{onChange:o,"onUpdate:value":s,onUpdateValue:l}=e;if(Array.isArray(u.value)){let e=Array.from(u.value),i=e.findIndex(e=>e===n);t?~i||(e.push(n),l&&E(l,e,{actionType:`check`,value:n}),s&&E(s,e,{actionType:`check`,value:n}),r(),a(),c.value=e,o&&E(o,e)):~i&&(e.splice(i,1),l&&E(l,e,{actionType:`uncheck`,value:n}),s&&E(s,e,{actionType:`uncheck`,value:n}),o&&E(o,e),c.value=e,r(),a())}else t?(l&&E(l,[n],{actionType:`check`,value:n}),s&&E(s,[n],{actionType:`check`,value:n}),o&&E(o,[n]),c.value=[n],r(),a()):(l&&E(l,[],{actionType:`uncheck`,value:n}),s&&E(s,[],{actionType:`uncheck`,value:n}),o&&E(o,[]),c.value=[],r(),a())}return a(j,{checkedCountRef:d,maxRef:r(e,`max`),minRef:r(e,`min`),valueSetRef:f,disabledRef:s,mergedSizeRef:o,toggleCheckbox:p}),{mergedClsPrefix:n}},render(){return C(`div`,{class:`${this.mergedClsPrefix}-checkbox-group`,role:`group`},this.$slots)}}),N=()=>C(`svg`,{viewBox:`0 0 64 64`,class:`check-icon`},C(`path`,{d:`M50.42,16.76L22.34,39.45l-8.1-11.46c-1.12-1.58-3.3-1.96-4.88-0.84c-1.58,1.12-1.95,3.3-0.84,4.88l10.26,14.51  c0.56,0.79,1.42,1.31,2.38,1.45c0.16,0.02,0.32,0.03,0.48,0.03c0.8,0,1.57-0.27,2.2-0.78l30.99-25.03c1.5-1.21,1.74-3.42,0.52-4.92  C54.13,15.78,51.93,15.55,50.42,16.76z`})),P=()=>C(`svg`,{viewBox:`0 0 100 100`,class:`line-icon`},C(`path`,{d:`M80.2,55.5H21.4c-2.8,0-5.1-2.5-5.1-5.5l0,0c0-3,2.3-5.5,5.1-5.5h58.7c2.8,0,5.1,2.5,5.1,5.5l0,0C85.2,53.1,82.9,55.5,80.2,55.5z`})),F=d([n(`checkbox`,`
 font-size: var(--n-font-size);
 outline: none;
 cursor: pointer;
 display: inline-flex;
 flex-wrap: nowrap;
 align-items: flex-start;
 word-break: break-word;
 line-height: var(--n-size);
 --n-merged-color-table: var(--n-color-table);
 `,[i(`show-label`,`line-height: var(--n-label-line-height);`),d(`&:hover`,[n(`checkbox-box`,[b(`border`,`border: var(--n-border-checked);`)])]),d(`&:focus:not(:active)`,[n(`checkbox-box`,[b(`border`,`
 border: var(--n-border-focus);
 box-shadow: var(--n-box-shadow-focus);
 `)])]),i(`inside-table`,[n(`checkbox-box`,`
 background-color: var(--n-merged-color-table);
 `)]),i(`checked`,[n(`checkbox-box`,`
 background-color: var(--n-color-checked);
 `,[n(`checkbox-icon`,[d(`.check-icon`,`
 opacity: 1;
 transform: scale(1);
 `)])])]),i(`indeterminate`,[n(`checkbox-box`,[n(`checkbox-icon`,[d(`.check-icon`,`
 opacity: 0;
 transform: scale(.5);
 `),d(`.line-icon`,`
 opacity: 1;
 transform: scale(1);
 `)])])]),i(`checked, indeterminate`,[d(`&:focus:not(:active)`,[n(`checkbox-box`,[b(`border`,`
 border: var(--n-border-checked);
 box-shadow: var(--n-box-shadow-focus);
 `)])]),n(`checkbox-box`,`
 background-color: var(--n-color-checked);
 border-left: 0;
 border-top: 0;
 `,[b(`border`,{border:`var(--n-border-checked)`})])]),i(`disabled`,{cursor:`not-allowed`},[i(`checked`,[n(`checkbox-box`,`
 background-color: var(--n-color-disabled-checked);
 `,[b(`border`,{border:`var(--n-border-disabled-checked)`}),n(`checkbox-icon`,[d(`.check-icon, .line-icon`,{fill:`var(--n-check-mark-color-disabled-checked)`})])])]),n(`checkbox-box`,`
 background-color: var(--n-color-disabled);
 `,[b(`border`,`
 border: var(--n-border-disabled);
 `),n(`checkbox-icon`,[d(`.check-icon, .line-icon`,`
 fill: var(--n-check-mark-color-disabled);
 `)])]),b(`label`,`
 color: var(--n-text-color-disabled);
 `)]),n(`checkbox-box-wrapper`,`
 position: relative;
 width: var(--n-size);
 flex-shrink: 0;
 flex-grow: 0;
 user-select: none;
 -webkit-user-select: none;
 `),n(`checkbox-box`,`
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
 `,[b(`border`,`
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
 `),n(`checkbox-icon`,`
 display: flex;
 align-items: center;
 justify-content: center;
 position: absolute;
 left: 1px;
 right: 1px;
 top: 1px;
 bottom: 1px;
 `,[d(`.check-icon, .line-icon`,`
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
 `),e({left:`1px`,top:`1px`})])]),b(`label`,`
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 user-select: none;
 -webkit-user-select: none;
 padding: var(--n-label-padding);
 font-weight: var(--n-label-font-weight);
 `,[d(`&:empty`,{display:`none`})])]),p(n(`checkbox`,`
 --n-merged-color-table: var(--n-color-table-modal);
 `)),c(n(`checkbox`,`
 --n-merged-color-table: var(--n-color-table-popover);
 `))]),I=Object.assign(Object.assign({},s.props),{size:String,checked:{type:[Boolean,String,Number],default:void 0},defaultChecked:{type:[Boolean,String,Number],default:!1},value:[String,Number],disabled:{type:Boolean,default:void 0},indeterminate:Boolean,label:String,focusable:{type:Boolean,default:!0},checkedValue:{type:[Boolean,String,Number],default:!0},uncheckedValue:{type:[Boolean,String,Number],default:!1},"onUpdate:checked":[Function,Array],onUpdateChecked:[Function,Array],privateInsideTable:Boolean,onChange:[Function,Array]}),L=T({name:`Checkbox`,props:I,setup(e){let n=l(j,null),i=t(null),{mergedClsPrefixRef:a,inlineThemeDisabled:o,mergedRtlRef:c,mergedComponentPropsRef:u}=x(e),d=t(e.defaultChecked),p=r(e,`checked`),v=O(p,d),b=_(()=>{if(n){let t=n.valueSetRef.value;return t&&e.value!==void 0?t.has(e.value):!1}return v.value===e.checkedValue}),S=m(e,{mergedSize(t){let{size:r}=e;if(r!==void 0)return r;if(n){let{value:e}=n.mergedSizeRef;if(e!==void 0)return e}if(t){let{mergedSize:e}=t;if(e!==void 0)return e.value}return u?.value?.Checkbox?.size||`medium`},mergedDisabled(t){let{disabled:r}=e;if(r!==void 0)return r;if(n){if(n.disabledRef.value)return!0;let{maxRef:{value:e},checkedCountRef:t}=n;if(e!==void 0&&t.value>=e&&!b.value)return!0;let{minRef:{value:r}}=n;if(r!==void 0&&t.value<=r&&b.value)return!0}return t?t.disabled.value:!1}}),{mergedDisabledRef:C,mergedSizeRef:w}=S,T=s(`Checkbox`,`-checkbox`,F,k,e,a);function A(t){if(n&&e.value!==void 0)n.toggleCheckbox(!b.value,e.value);else{let{onChange:n,"onUpdate:checked":r,onUpdateChecked:i}=e,{nTriggerFormInput:a,nTriggerFormChange:o}=S,s=b.value?e.uncheckedValue:e.checkedValue;r&&E(r,s,t),i&&E(i,s,t),n&&E(n,s,t),a(),o(),d.value=s}}function M(e){C.value||A(e)}function N(e){if(!C.value)switch(e.key){case` `:case`Enter`:A(e)}}function P(e){e.key===` `&&e.preventDefault()}let I={focus:()=>{var e;(e=i.value)==null||e.focus()},blur:()=>{var e;(e=i.value)==null||e.blur()}},L=g(`Checkbox`,c,a),R=h(()=>{let{value:e}=w,{common:{cubicBezierEaseInOut:t},self:{borderRadius:n,color:r,colorChecked:i,colorDisabled:a,colorTableHeader:o,colorTableHeaderModal:s,colorTableHeaderPopover:c,checkMarkColor:l,checkMarkColorDisabled:u,border:d,borderFocus:p,borderDisabled:m,borderChecked:h,boxShadowFocus:g,textColor:_,textColorDisabled:v,checkMarkColorDisabledChecked:y,colorDisabledChecked:b,borderDisabledChecked:x,labelPadding:S,labelLineHeight:C,labelFontWeight:E,[f(`fontSize`,e)]:D,[f(`size`,e)]:O}}=T.value;return{"--n-label-line-height":C,"--n-label-font-weight":E,"--n-size":O,"--n-bezier":t,"--n-border-radius":n,"--n-border":d,"--n-border-checked":h,"--n-border-focus":p,"--n-border-disabled":m,"--n-border-disabled-checked":x,"--n-box-shadow-focus":g,"--n-color":r,"--n-color-checked":i,"--n-color-table":o,"--n-color-table-modal":s,"--n-color-table-popover":c,"--n-color-disabled":a,"--n-color-disabled-checked":b,"--n-text-color":_,"--n-text-color-disabled":v,"--n-check-mark-color":l,"--n-check-mark-color-disabled":u,"--n-check-mark-color-disabled-checked":y,"--n-font-size":D,"--n-label-padding":S}}),z=o?y(`checkbox`,h(()=>w.value[0]),R,e):void 0;return Object.assign(S,I,{rtlEnabled:L,selfRef:i,mergedClsPrefix:a,mergedDisabled:C,renderedChecked:b,mergedTheme:T,labelId:D(),handleClick:M,handleKeyUp:N,handleKeyDown:P,cssVars:o?void 0:R,themeClass:z?.themeClass,onRender:z?.onRender})},render(){var e;let{$slots:t,renderedChecked:n,mergedDisabled:r,indeterminate:i,privateInsideTable:a,cssVars:s,labelId:c,label:l,mergedClsPrefix:d,focusable:f,handleKeyUp:p,handleKeyDown:m,handleClick:h}=this;(e=this.onRender)==null||e.call(this);let g=S(t.default,e=>l||e?C(`span`,{class:`${d}-checkbox__label`,id:c},l||e):null);return C(`div`,{ref:`selfRef`,class:[`${d}-checkbox`,this.themeClass,this.rtlEnabled&&`${d}-checkbox--rtl`,n&&`${d}-checkbox--checked`,r&&`${d}-checkbox--disabled`,i&&`${d}-checkbox--indeterminate`,a&&`${d}-checkbox--inside-table`,g&&`${d}-checkbox--show-label`],tabindex:r||!f?void 0:0,role:`checkbox`,"aria-checked":i?`mixed`:n,"aria-labelledby":c,style:s,onKeyup:p,onKeydown:m,onClick:h,onMousedown:()=>{o(`selectstart`,window,e=>{e.preventDefault()},{once:!0})}},C(`div`,{class:`${d}-checkbox-box-wrapper`},`\xA0`,C(`div`,{class:`${d}-checkbox-box`},C(u,null,{default:()=>this.indeterminate?C(`div`,{key:`indeterminate`,class:`${d}-checkbox-icon`},P()):C(`div`,{key:`check`,class:`${d}-checkbox-icon`},N())}),C(`div`,{class:`${d}-checkbox-box__border`}))),g)}});function R(){let e=l(A,null);return e===null&&w(`use-message`,"No outer <n-message-provider /> founded. See prerequisite in https://www.naiveui.com/en-US/os-theme/components/message for more details. If you want to use `useMessage` outside setup, please check https://www.naiveui.com/zh-CN/os-theme/components/message#Q-&-A."),e}export{L as n,M as r,R as t};