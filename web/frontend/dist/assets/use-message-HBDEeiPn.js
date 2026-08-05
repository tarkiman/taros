import{$t as e,C as t,In as n,Jn as r,Kt as i,Nt as a,O as o,Pt as s,Qt as c,Sn as l,T as u,Tn as d,Xt as f,Yt as p,Zn as m,ct as h,en as g,hn as _,j as v,jt as y,kt as b,lt as x,qt as S,ut as C,vt as w,wn as T,xt as E,yt as D}from"./auth-C3tLNBl0.js";import{c as O}from"./_plugin-vue_export-helper-OW_rLE0U.js";import{r as k,t as A}from"./context-FydGRiCt.js";var j=b(`n-checkbox-group`),M=l({name:`CheckboxGroup`,props:{min:Number,max:Number,size:String,value:Array,defaultValue:{type:Array,default:null},disabled:{type:Boolean,default:void 0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onChange:[Function,Array]},setup(e){let{mergedClsPrefixRef:t}=C(e),i=h(e),{mergedSizeRef:a,mergedDisabledRef:o}=i,s=r(e.defaultValue),c=_(()=>e.value),l=O(c,s),u=_(()=>l.value?.length||0),d=_(()=>Array.isArray(l.value)?new Set(l.value):new Set);function f(t,n){let{nTriggerFormInput:r,nTriggerFormChange:a}=i,{onChange:o,"onUpdate:value":c,onUpdateValue:u}=e;if(Array.isArray(l.value)){let e=Array.from(l.value),i=e.findIndex(e=>e===n);t?~i||(e.push(n),u&&D(u,e,{actionType:`check`,value:n}),c&&D(c,e,{actionType:`check`,value:n}),r(),a(),s.value=e,o&&D(o,e)):~i&&(e.splice(i,1),u&&D(u,e,{actionType:`uncheck`,value:n}),c&&D(c,e,{actionType:`uncheck`,value:n}),o&&D(o,e),s.value=e,r(),a())}else t?(u&&D(u,[n],{actionType:`check`,value:n}),c&&D(c,[n],{actionType:`check`,value:n}),o&&D(o,[n]),s.value=[n],r(),a()):(u&&D(u,[],{actionType:`uncheck`,value:n}),c&&D(c,[],{actionType:`uncheck`,value:n}),o&&D(o,[]),s.value=[],r(),a())}return n(j,{checkedCountRef:u,maxRef:m(e,`max`),minRef:m(e,`min`),valueSetRef:d,disabledRef:o,mergedSizeRef:a,toggleCheckbox:f}),{mergedClsPrefix:t}},render(){return T(`div`,{class:`${this.mergedClsPrefix}-checkbox-group`,role:`group`},this.$slots)}}),N=()=>T(`svg`,{viewBox:`0 0 64 64`,class:`check-icon`},T(`path`,{d:`M50.42,16.76L22.34,39.45l-8.1-11.46c-1.12-1.58-3.3-1.96-4.88-0.84c-1.58,1.12-1.95,3.3-0.84,4.88l10.26,14.51  c0.56,0.79,1.42,1.31,2.38,1.45c0.16,0.02,0.32,0.03,0.48,0.03c0.8,0,1.57-0.27,2.2-0.78l30.99-25.03c1.5-1.21,1.74-3.42,0.52-4.92  C54.13,15.78,51.93,15.55,50.42,16.76z`})),P=()=>T(`svg`,{viewBox:`0 0 100 100`,class:`line-icon`},T(`path`,{d:`M80.2,55.5H21.4c-2.8,0-5.1-2.5-5.1-5.5l0,0c0-3,2.3-5.5,5.1-5.5h58.7c2.8,0,5.1,2.5,5.1,5.5l0,0C85.2,53.1,82.9,55.5,80.2,55.5z`})),F=i([S(`checkbox`,`
 font-size: var(--n-font-size);
 outline: none;
 cursor: pointer;
 display: inline-flex;
 flex-wrap: nowrap;
 align-items: flex-start;
 word-break: break-word;
 line-height: var(--n-size);
 --n-merged-color-table: var(--n-color-table);
 `,[f(`show-label`,`line-height: var(--n-label-line-height);`),i(`&:hover`,[S(`checkbox-box`,[p(`border`,`border: var(--n-border-checked);`)])]),i(`&:focus:not(:active)`,[S(`checkbox-box`,[p(`border`,`
 border: var(--n-border-focus);
 box-shadow: var(--n-box-shadow-focus);
 `)])]),f(`inside-table`,[S(`checkbox-box`,`
 background-color: var(--n-merged-color-table);
 `)]),f(`checked`,[S(`checkbox-box`,`
 background-color: var(--n-color-checked);
 `,[S(`checkbox-icon`,[i(`.check-icon`,`
 opacity: 1;
 transform: scale(1);
 `)])])]),f(`indeterminate`,[S(`checkbox-box`,[S(`checkbox-icon`,[i(`.check-icon`,`
 opacity: 0;
 transform: scale(.5);
 `),i(`.line-icon`,`
 opacity: 1;
 transform: scale(1);
 `)])])]),f(`checked, indeterminate`,[i(`&:focus:not(:active)`,[S(`checkbox-box`,[p(`border`,`
 border: var(--n-border-checked);
 box-shadow: var(--n-box-shadow-focus);
 `)])]),S(`checkbox-box`,`
 background-color: var(--n-color-checked);
 border-left: 0;
 border-top: 0;
 `,[p(`border`,{border:`var(--n-border-checked)`})])]),f(`disabled`,{cursor:`not-allowed`},[f(`checked`,[S(`checkbox-box`,`
 background-color: var(--n-color-disabled-checked);
 `,[p(`border`,{border:`var(--n-border-disabled-checked)`}),S(`checkbox-icon`,[i(`.check-icon, .line-icon`,{fill:`var(--n-check-mark-color-disabled-checked)`})])])]),S(`checkbox-box`,`
 background-color: var(--n-color-disabled);
 `,[p(`border`,`
 border: var(--n-border-disabled);
 `),S(`checkbox-icon`,[i(`.check-icon, .line-icon`,`
 fill: var(--n-check-mark-color-disabled);
 `)])]),p(`label`,`
 color: var(--n-text-color-disabled);
 `)]),S(`checkbox-box-wrapper`,`
 position: relative;
 width: var(--n-size);
 flex-shrink: 0;
 flex-grow: 0;
 user-select: none;
 -webkit-user-select: none;
 `),S(`checkbox-box`,`
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
 `,[p(`border`,`
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
 `),S(`checkbox-icon`,`
 display: flex;
 align-items: center;
 justify-content: center;
 position: absolute;
 left: 1px;
 right: 1px;
 top: 1px;
 bottom: 1px;
 `,[i(`.check-icon, .line-icon`,`
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
 `),t({left:`1px`,top:`1px`})])]),p(`label`,`
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 user-select: none;
 -webkit-user-select: none;
 padding: var(--n-label-padding);
 font-weight: var(--n-label-font-weight);
 `,[i(`&:empty`,{display:`none`})])]),e(S(`checkbox`,`
 --n-merged-color-table: var(--n-color-table-modal);
 `)),g(S(`checkbox`,`
 --n-merged-color-table: var(--n-color-table-popover);
 `))]),I=Object.assign(Object.assign({},o.props),{size:String,checked:{type:[Boolean,String,Number],default:void 0},defaultChecked:{type:[Boolean,String,Number],default:!1},value:[String,Number],disabled:{type:Boolean,default:void 0},indeterminate:Boolean,label:String,focusable:{type:Boolean,default:!0},checkedValue:{type:[Boolean,String,Number],default:!0},uncheckedValue:{type:[Boolean,String,Number],default:!1},"onUpdate:checked":[Function,Array],onUpdateChecked:[Function,Array],privateInsideTable:Boolean,onChange:[Function,Array]}),L=l({name:`Checkbox`,props:I,setup(e){let t=d(j,null),n=r(null),{mergedClsPrefixRef:i,inlineThemeDisabled:a,mergedRtlRef:l,mergedComponentPropsRef:u}=C(e),f=r(e.defaultChecked),p=m(e,`checked`),g=O(p,f),b=y(()=>{if(t){let n=t.valueSetRef.value;return n&&e.value!==void 0?n.has(e.value):!1}return g.value===e.checkedValue}),S=h(e,{mergedSize(n){let{size:r}=e;if(r!==void 0)return r;if(t){let{value:e}=t.mergedSizeRef;if(e!==void 0)return e}if(n){let{mergedSize:e}=n;if(e!==void 0)return e.value}return u?.value?.Checkbox?.size||`medium`},mergedDisabled(n){let{disabled:r}=e;if(r!==void 0)return r;if(t){if(t.disabledRef.value)return!0;let{maxRef:{value:e},checkedCountRef:n}=t;if(e!==void 0&&n.value>=e&&!b.value)return!0;let{minRef:{value:r}}=t;if(r!==void 0&&n.value<=r&&b.value)return!0}return n?n.disabled.value:!1}}),{mergedDisabledRef:w,mergedSizeRef:T}=S,E=o(`Checkbox`,`-checkbox`,F,k,e,i);function A(n){if(t&&e.value!==void 0)t.toggleCheckbox(!b.value,e.value);else{let{onChange:t,"onUpdate:checked":r,onUpdateChecked:i}=e,{nTriggerFormInput:a,nTriggerFormChange:o}=S,s=b.value?e.uncheckedValue:e.checkedValue;r&&D(r,s,n),i&&D(i,s,n),t&&D(t,s,n),a(),o(),f.value=s}}function M(e){w.value||A(e)}function N(e){if(!w.value)switch(e.key){case` `:case`Enter`:A(e)}}function P(e){e.key===` `&&e.preventDefault()}let I={focus:()=>{var e;(e=n.value)==null||e.focus()},blur:()=>{var e;(e=n.value)==null||e.blur()}},L=v(`Checkbox`,l,i),R=_(()=>{let{value:e}=T,{common:{cubicBezierEaseInOut:t},self:{borderRadius:n,color:r,colorChecked:i,colorDisabled:a,colorTableHeader:o,colorTableHeaderModal:s,colorTableHeaderPopover:l,checkMarkColor:u,checkMarkColorDisabled:d,border:f,borderFocus:p,borderDisabled:m,borderChecked:h,boxShadowFocus:g,textColor:_,textColorDisabled:v,checkMarkColorDisabledChecked:y,colorDisabledChecked:b,borderDisabledChecked:x,labelPadding:S,labelLineHeight:C,labelFontWeight:w,[c(`fontSize`,e)]:D,[c(`size`,e)]:O}}=E.value;return{"--n-label-line-height":C,"--n-label-font-weight":w,"--n-size":O,"--n-bezier":t,"--n-border-radius":n,"--n-border":f,"--n-border-checked":h,"--n-border-focus":p,"--n-border-disabled":m,"--n-border-disabled-checked":x,"--n-box-shadow-focus":g,"--n-color":r,"--n-color-checked":i,"--n-color-table":o,"--n-color-table-modal":s,"--n-color-table-popover":l,"--n-color-disabled":a,"--n-color-disabled-checked":b,"--n-text-color":_,"--n-text-color-disabled":v,"--n-check-mark-color":u,"--n-check-mark-color-disabled":d,"--n-check-mark-color-disabled-checked":y,"--n-font-size":D,"--n-label-padding":S}}),z=a?x(`checkbox`,_(()=>T.value[0]),R,e):void 0;return Object.assign(S,I,{rtlEnabled:L,selfRef:n,mergedClsPrefix:i,mergedDisabled:w,renderedChecked:b,mergedTheme:E,labelId:s(),handleClick:M,handleKeyUp:N,handleKeyDown:P,cssVars:a?void 0:R,themeClass:z?.themeClass,onRender:z?.onRender})},render(){var e;let{$slots:t,renderedChecked:n,mergedDisabled:r,indeterminate:i,privateInsideTable:o,cssVars:s,labelId:c,label:l,mergedClsPrefix:d,focusable:f,handleKeyUp:p,handleKeyDown:m,handleClick:h}=this;(e=this.onRender)==null||e.call(this);let g=w(t.default,e=>l||e?T(`span`,{class:`${d}-checkbox__label`,id:c},l||e):null);return T(`div`,{ref:`selfRef`,class:[`${d}-checkbox`,this.themeClass,this.rtlEnabled&&`${d}-checkbox--rtl`,n&&`${d}-checkbox--checked`,r&&`${d}-checkbox--disabled`,i&&`${d}-checkbox--indeterminate`,o&&`${d}-checkbox--inside-table`,g&&`${d}-checkbox--show-label`],tabindex:r||!f?void 0:0,role:`checkbox`,"aria-checked":i?`mixed`:n,"aria-labelledby":c,style:s,onKeyup:p,onKeydown:m,onClick:h,onMousedown:()=>{a(`selectstart`,window,e=>{e.preventDefault()},{once:!0})}},T(`div`,{class:`${d}-checkbox-box-wrapper`},`\xA0`,T(`div`,{class:`${d}-checkbox-box`},T(u,null,{default:()=>this.indeterminate?T(`div`,{key:`indeterminate`,class:`${d}-checkbox-icon`},P()):T(`div`,{key:`check`,class:`${d}-checkbox-icon`},N())}),T(`div`,{class:`${d}-checkbox-box__border`}))),g)}});function R(){let e=d(A,null);return e===null&&E(`use-message`,"No outer <n-message-provider /> founded. See prerequisite in https://www.naiveui.com/en-US/os-theme/components/message for more details. If you want to use `useMessage` outside setup, please check https://www.naiveui.com/zh-CN/os-theme/components/message#Q-&-A."),e}export{L as n,M as r,R as t};