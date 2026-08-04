import{C as e,Cn as t,Gt as n,Jt as r,Kn as i,Nt as a,O as o,Pn as s,Qt as c,Sn as l,T as u,Wt as d,Xt as f,Yn as p,Zt as m,bn as h,ct as g,j as _,jt as v,kt as y,lt as b,pn as x,qt as S,ut as C,vt as w,xt as T,yt as E}from"./auth-CKvW4zla.js";import{t as D}from"./misc-DDs3MKLt.js";import{t as O}from"./use-merged-state-BLpT01b2.js";import{r as k,t as A}from"./context-7SCPvhVh.js";var j=y(`n-checkbox-group`),M=h({name:`CheckboxGroup`,props:{min:Number,max:Number,size:String,value:Array,defaultValue:{type:Array,default:null},disabled:{type:Boolean,default:void 0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onChange:[Function,Array]},setup(e){let{mergedClsPrefixRef:t}=C(e),n=g(e),{mergedSizeRef:r,mergedDisabledRef:a}=n,o=i(e.defaultValue),c=x(()=>e.value),l=O(c,o),u=x(()=>l.value?.length||0),d=x(()=>Array.isArray(l.value)?new Set(l.value):new Set);function f(t,r){let{nTriggerFormInput:i,nTriggerFormChange:a}=n,{onChange:s,"onUpdate:value":c,onUpdateValue:u}=e;if(Array.isArray(l.value)){let e=Array.from(l.value),n=e.findIndex(e=>e===r);t?~n||(e.push(r),u&&E(u,e,{actionType:`check`,value:r}),c&&E(c,e,{actionType:`check`,value:r}),i(),a(),o.value=e,s&&E(s,e)):~n&&(e.splice(n,1),u&&E(u,e,{actionType:`uncheck`,value:r}),c&&E(c,e,{actionType:`uncheck`,value:r}),s&&E(s,e),o.value=e,i(),a())}else t?(u&&E(u,[r],{actionType:`check`,value:r}),c&&E(c,[r],{actionType:`check`,value:r}),s&&E(s,[r]),o.value=[r],i(),a()):(u&&E(u,[],{actionType:`uncheck`,value:r}),c&&E(c,[],{actionType:`uncheck`,value:r}),s&&E(s,[]),o.value=[],i(),a())}return s(j,{checkedCountRef:u,maxRef:p(e,`max`),minRef:p(e,`min`),valueSetRef:d,disabledRef:a,mergedSizeRef:r,toggleCheckbox:f}),{mergedClsPrefix:t}},render(){return l(`div`,{class:`${this.mergedClsPrefix}-checkbox-group`,role:`group`},this.$slots)}}),N=()=>l(`svg`,{viewBox:`0 0 64 64`,class:`check-icon`},l(`path`,{d:`M50.42,16.76L22.34,39.45l-8.1-11.46c-1.12-1.58-3.3-1.96-4.88-0.84c-1.58,1.12-1.95,3.3-0.84,4.88l10.26,14.51  c0.56,0.79,1.42,1.31,2.38,1.45c0.16,0.02,0.32,0.03,0.48,0.03c0.8,0,1.57-0.27,2.2-0.78l30.99-25.03c1.5-1.21,1.74-3.42,0.52-4.92  C54.13,15.78,51.93,15.55,50.42,16.76z`})),P=()=>l(`svg`,{viewBox:`0 0 100 100`,class:`line-icon`},l(`path`,{d:`M80.2,55.5H21.4c-2.8,0-5.1-2.5-5.1-5.5l0,0c0-3,2.3-5.5,5.1-5.5h58.7c2.8,0,5.1,2.5,5.1,5.5l0,0C85.2,53.1,82.9,55.5,80.2,55.5z`})),F=d([n(`checkbox`,`
 font-size: var(--n-font-size);
 outline: none;
 cursor: pointer;
 display: inline-flex;
 flex-wrap: nowrap;
 align-items: flex-start;
 word-break: break-word;
 line-height: var(--n-size);
 --n-merged-color-table: var(--n-color-table);
 `,[r(`show-label`,`line-height: var(--n-label-line-height);`),d(`&:hover`,[n(`checkbox-box`,[S(`border`,`border: var(--n-border-checked);`)])]),d(`&:focus:not(:active)`,[n(`checkbox-box`,[S(`border`,`
 border: var(--n-border-focus);
 box-shadow: var(--n-box-shadow-focus);
 `)])]),r(`inside-table`,[n(`checkbox-box`,`
 background-color: var(--n-merged-color-table);
 `)]),r(`checked`,[n(`checkbox-box`,`
 background-color: var(--n-color-checked);
 `,[n(`checkbox-icon`,[d(`.check-icon`,`
 opacity: 1;
 transform: scale(1);
 `)])])]),r(`indeterminate`,[n(`checkbox-box`,[n(`checkbox-icon`,[d(`.check-icon`,`
 opacity: 0;
 transform: scale(.5);
 `),d(`.line-icon`,`
 opacity: 1;
 transform: scale(1);
 `)])])]),r(`checked, indeterminate`,[d(`&:focus:not(:active)`,[n(`checkbox-box`,[S(`border`,`
 border: var(--n-border-checked);
 box-shadow: var(--n-box-shadow-focus);
 `)])]),n(`checkbox-box`,`
 background-color: var(--n-color-checked);
 border-left: 0;
 border-top: 0;
 `,[S(`border`,{border:`var(--n-border-checked)`})])]),r(`disabled`,{cursor:`not-allowed`},[r(`checked`,[n(`checkbox-box`,`
 background-color: var(--n-color-disabled-checked);
 `,[S(`border`,{border:`var(--n-border-disabled-checked)`}),n(`checkbox-icon`,[d(`.check-icon, .line-icon`,{fill:`var(--n-check-mark-color-disabled-checked)`})])])]),n(`checkbox-box`,`
 background-color: var(--n-color-disabled);
 `,[S(`border`,`
 border: var(--n-border-disabled);
 `),n(`checkbox-icon`,[d(`.check-icon, .line-icon`,`
 fill: var(--n-check-mark-color-disabled);
 `)])]),S(`label`,`
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
 `,[S(`border`,`
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
 `),e({left:`1px`,top:`1px`})])]),S(`label`,`
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 user-select: none;
 -webkit-user-select: none;
 padding: var(--n-label-padding);
 font-weight: var(--n-label-font-weight);
 `,[d(`&:empty`,{display:`none`})])]),m(n(`checkbox`,`
 --n-merged-color-table: var(--n-color-table-modal);
 `)),c(n(`checkbox`,`
 --n-merged-color-table: var(--n-color-table-popover);
 `))]),I=Object.assign(Object.assign({},o.props),{size:String,checked:{type:[Boolean,String,Number],default:void 0},defaultChecked:{type:[Boolean,String,Number],default:!1},value:[String,Number],disabled:{type:Boolean,default:void 0},indeterminate:Boolean,label:String,focusable:{type:Boolean,default:!0},checkedValue:{type:[Boolean,String,Number],default:!0},uncheckedValue:{type:[Boolean,String,Number],default:!1},"onUpdate:checked":[Function,Array],onUpdateChecked:[Function,Array],privateInsideTable:Boolean,onChange:[Function,Array]}),L=h({name:`Checkbox`,props:I,setup(e){let n=t(j,null),r=i(null),{mergedClsPrefixRef:a,inlineThemeDisabled:s,mergedRtlRef:c,mergedComponentPropsRef:l}=C(e),u=i(e.defaultChecked),d=p(e,`checked`),m=O(d,u),h=v(()=>{if(n){let t=n.valueSetRef.value;return t&&e.value!==void 0?t.has(e.value):!1}return m.value===e.checkedValue}),y=g(e,{mergedSize(t){let{size:r}=e;if(r!==void 0)return r;if(n){let{value:e}=n.mergedSizeRef;if(e!==void 0)return e}if(t){let{mergedSize:e}=t;if(e!==void 0)return e.value}return l?.value?.Checkbox?.size||`medium`},mergedDisabled(t){let{disabled:r}=e;if(r!==void 0)return r;if(n){if(n.disabledRef.value)return!0;let{maxRef:{value:e},checkedCountRef:t}=n;if(e!==void 0&&t.value>=e&&!h.value)return!0;let{minRef:{value:r}}=n;if(r!==void 0&&t.value<=r&&h.value)return!0}return t?t.disabled.value:!1}}),{mergedDisabledRef:S,mergedSizeRef:w}=y,T=o(`Checkbox`,`-checkbox`,F,k,e,a);function A(t){if(n&&e.value!==void 0)n.toggleCheckbox(!h.value,e.value);else{let{onChange:n,"onUpdate:checked":r,onUpdateChecked:i}=e,{nTriggerFormInput:a,nTriggerFormChange:o}=y,s=h.value?e.uncheckedValue:e.checkedValue;r&&E(r,s,t),i&&E(i,s,t),n&&E(n,s,t),a(),o(),u.value=s}}function M(e){S.value||A(e)}function N(e){if(!S.value)switch(e.key){case` `:case`Enter`:A(e)}}function P(e){e.key===` `&&e.preventDefault()}let I={focus:()=>{var e;(e=r.value)==null||e.focus()},blur:()=>{var e;(e=r.value)==null||e.blur()}},L=_(`Checkbox`,c,a),R=x(()=>{let{value:e}=w,{common:{cubicBezierEaseInOut:t},self:{borderRadius:n,color:r,colorChecked:i,colorDisabled:a,colorTableHeader:o,colorTableHeaderModal:s,colorTableHeaderPopover:c,checkMarkColor:l,checkMarkColorDisabled:u,border:d,borderFocus:p,borderDisabled:m,borderChecked:h,boxShadowFocus:g,textColor:_,textColorDisabled:v,checkMarkColorDisabledChecked:y,colorDisabledChecked:b,borderDisabledChecked:x,labelPadding:S,labelLineHeight:C,labelFontWeight:E,[f(`fontSize`,e)]:D,[f(`size`,e)]:O}}=T.value;return{"--n-label-line-height":C,"--n-label-font-weight":E,"--n-size":O,"--n-bezier":t,"--n-border-radius":n,"--n-border":d,"--n-border-checked":h,"--n-border-focus":p,"--n-border-disabled":m,"--n-border-disabled-checked":x,"--n-box-shadow-focus":g,"--n-color":r,"--n-color-checked":i,"--n-color-table":o,"--n-color-table-modal":s,"--n-color-table-popover":c,"--n-color-disabled":a,"--n-color-disabled-checked":b,"--n-text-color":_,"--n-text-color-disabled":v,"--n-check-mark-color":l,"--n-check-mark-color-disabled":u,"--n-check-mark-color-disabled-checked":y,"--n-font-size":D,"--n-label-padding":S}}),z=s?b(`checkbox`,x(()=>w.value[0]),R,e):void 0;return Object.assign(y,I,{rtlEnabled:L,selfRef:r,mergedClsPrefix:a,mergedDisabled:S,renderedChecked:h,mergedTheme:T,labelId:D(),handleClick:M,handleKeyUp:N,handleKeyDown:P,cssVars:s?void 0:R,themeClass:z?.themeClass,onRender:z?.onRender})},render(){var e;let{$slots:t,renderedChecked:n,mergedDisabled:r,indeterminate:i,privateInsideTable:o,cssVars:s,labelId:c,label:d,mergedClsPrefix:f,focusable:p,handleKeyUp:m,handleKeyDown:h,handleClick:g}=this;(e=this.onRender)==null||e.call(this);let _=w(t.default,e=>d||e?l(`span`,{class:`${f}-checkbox__label`,id:c},d||e):null);return l(`div`,{ref:`selfRef`,class:[`${f}-checkbox`,this.themeClass,this.rtlEnabled&&`${f}-checkbox--rtl`,n&&`${f}-checkbox--checked`,r&&`${f}-checkbox--disabled`,i&&`${f}-checkbox--indeterminate`,o&&`${f}-checkbox--inside-table`,_&&`${f}-checkbox--show-label`],tabindex:r||!p?void 0:0,role:`checkbox`,"aria-checked":i?`mixed`:n,"aria-labelledby":c,style:s,onKeyup:m,onKeydown:h,onClick:g,onMousedown:()=>{a(`selectstart`,window,e=>{e.preventDefault()},{once:!0})}},l(`div`,{class:`${f}-checkbox-box-wrapper`},`\xA0`,l(`div`,{class:`${f}-checkbox-box`},l(u,null,{default:()=>this.indeterminate?l(`div`,{key:`indeterminate`,class:`${f}-checkbox-icon`},P()):l(`div`,{key:`check`,class:`${f}-checkbox-icon`},N())}),l(`div`,{class:`${f}-checkbox-box__border`}))),_)}});function R(){let e=t(A,null);return e===null&&T(`use-message`,"No outer <n-message-provider /> founded. See prerequisite in https://www.naiveui.com/en-US/os-theme/components/message for more details. If you want to use `useMessage` outside setup, please check https://www.naiveui.com/zh-CN/os-theme/components/message#Q-&-A."),e}export{L as n,M as r,R as t};