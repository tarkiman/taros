import{$t as e,A as t,D as n,Dn as r,It as i,Lt as a,Mt as o,N as s,On as c,Pt as l,Qt as u,T as d,Tn as f,Xt as p,Yt as m,Zn as h,bt as g,dt as _,er as v,ft as y,nn as b,rn as x,tn as S,ut as C,vn as w,xt as T,zn as E}from"./auth-DhbqZPGu.js";import{o as D}from"./get-P0QtIeki.js";import{t as O}from"./light-XzhBg2ID.js";var k=o(`n-checkbox-group`),A=f({name:`CheckboxGroup`,props:{min:Number,max:Number,size:String,value:Array,defaultValue:{type:Array,default:null},disabled:{type:Boolean,default:void 0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onChange:[Function,Array]},setup(e){let{mergedClsPrefixRef:t}=y(e),n=C(e),{mergedSizeRef:r,mergedDisabledRef:i}=n,a=h(e.defaultValue),o=w(()=>e.value),s=D(o,a),c=w(()=>s.value?.length||0),l=w(()=>Array.isArray(s.value)?new Set(s.value):new Set);function u(t,r){let{nTriggerFormInput:i,nTriggerFormChange:o}=n,{onChange:c,"onUpdate:value":l,onUpdateValue:u}=e;if(Array.isArray(s.value)){let e=Array.from(s.value),n=e.findIndex(e=>e===r);t?~n||(e.push(r),u&&T(u,e,{actionType:`check`,value:r}),l&&T(l,e,{actionType:`check`,value:r}),i(),o(),a.value=e,c&&T(c,e)):~n&&(e.splice(n,1),u&&T(u,e,{actionType:`uncheck`,value:r}),l&&T(l,e,{actionType:`uncheck`,value:r}),c&&T(c,e),a.value=e,i(),o())}else t?(u&&T(u,[r],{actionType:`check`,value:r}),l&&T(l,[r],{actionType:`check`,value:r}),c&&T(c,[r]),a.value=[r],i(),o()):(u&&T(u,[],{actionType:`uncheck`,value:r}),l&&T(l,[],{actionType:`uncheck`,value:r}),c&&T(c,[]),a.value=[],i(),o())}return E(k,{checkedCountRef:c,maxRef:v(e,`max`),minRef:v(e,`min`),valueSetRef:l,disabledRef:i,mergedSizeRef:r,toggleCheckbox:u}),{mergedClsPrefix:t}},render(){return r(`div`,{class:`${this.mergedClsPrefix}-checkbox-group`,role:`group`},this.$slots)}}),j=()=>r(`svg`,{viewBox:`0 0 64 64`,class:`check-icon`},r(`path`,{d:`M50.42,16.76L22.34,39.45l-8.1-11.46c-1.12-1.58-3.3-1.96-4.88-0.84c-1.58,1.12-1.95,3.3-0.84,4.88l10.26,14.51  c0.56,0.79,1.42,1.31,2.38,1.45c0.16,0.02,0.32,0.03,0.48,0.03c0.8,0,1.57-0.27,2.2-0.78l30.99-25.03c1.5-1.21,1.74-3.42,0.52-4.92  C54.13,15.78,51.93,15.55,50.42,16.76z`})),M=()=>r(`svg`,{viewBox:`0 0 100 100`,class:`line-icon`},r(`path`,{d:`M80.2,55.5H21.4c-2.8,0-5.1-2.5-5.1-5.5l0,0c0-3,2.3-5.5,5.1-5.5h58.7c2.8,0,5.1,2.5,5.1,5.5l0,0C85.2,53.1,82.9,55.5,80.2,55.5z`})),N=m([p(`checkbox`,`
 font-size: var(--n-font-size);
 outline: none;
 cursor: pointer;
 display: inline-flex;
 flex-wrap: nowrap;
 align-items: flex-start;
 word-break: break-word;
 line-height: var(--n-size);
 --n-merged-color-table: var(--n-color-table);
 `,[e(`show-label`,`line-height: var(--n-label-line-height);`),m(`&:hover`,[p(`checkbox-box`,[u(`border`,`border: var(--n-border-checked);`)])]),m(`&:focus:not(:active)`,[p(`checkbox-box`,[u(`border`,`
 border: var(--n-border-focus);
 box-shadow: var(--n-box-shadow-focus);
 `)])]),e(`inside-table`,[p(`checkbox-box`,`
 background-color: var(--n-merged-color-table);
 `)]),e(`checked`,[p(`checkbox-box`,`
 background-color: var(--n-color-checked);
 `,[p(`checkbox-icon`,[m(`.check-icon`,`
 opacity: 1;
 transform: scale(1);
 `)])])]),e(`indeterminate`,[p(`checkbox-box`,[p(`checkbox-icon`,[m(`.check-icon`,`
 opacity: 0;
 transform: scale(.5);
 `),m(`.line-icon`,`
 opacity: 1;
 transform: scale(1);
 `)])])]),e(`checked, indeterminate`,[m(`&:focus:not(:active)`,[p(`checkbox-box`,[u(`border`,`
 border: var(--n-border-checked);
 box-shadow: var(--n-box-shadow-focus);
 `)])]),p(`checkbox-box`,`
 background-color: var(--n-color-checked);
 border-left: 0;
 border-top: 0;
 `,[u(`border`,{border:`var(--n-border-checked)`})])]),e(`disabled`,{cursor:`not-allowed`},[e(`checked`,[p(`checkbox-box`,`
 background-color: var(--n-color-disabled-checked);
 `,[u(`border`,{border:`var(--n-border-disabled-checked)`}),p(`checkbox-icon`,[m(`.check-icon, .line-icon`,{fill:`var(--n-check-mark-color-disabled-checked)`})])])]),p(`checkbox-box`,`
 background-color: var(--n-color-disabled);
 `,[u(`border`,`
 border: var(--n-border-disabled);
 `),p(`checkbox-icon`,[m(`.check-icon, .line-icon`,`
 fill: var(--n-check-mark-color-disabled);
 `)])]),u(`label`,`
 color: var(--n-text-color-disabled);
 `)]),p(`checkbox-box-wrapper`,`
 position: relative;
 width: var(--n-size);
 flex-shrink: 0;
 flex-grow: 0;
 user-select: none;
 -webkit-user-select: none;
 `),p(`checkbox-box`,`
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
 `,[u(`border`,`
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
 `),p(`checkbox-icon`,`
 display: flex;
 align-items: center;
 justify-content: center;
 position: absolute;
 left: 1px;
 right: 1px;
 top: 1px;
 bottom: 1px;
 `,[m(`.check-icon, .line-icon`,`
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
 `),d({left:`1px`,top:`1px`})])]),u(`label`,`
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 user-select: none;
 -webkit-user-select: none;
 padding: var(--n-label-padding);
 font-weight: var(--n-label-font-weight);
 `,[m(`&:empty`,{display:`none`})])]),b(p(`checkbox`,`
 --n-merged-color-table: var(--n-color-table-modal);
 `)),x(p(`checkbox`,`
 --n-merged-color-table: var(--n-color-table-popover);
 `))]),P=Object.assign(Object.assign({},t.props),{size:String,checked:{type:[Boolean,String,Number],default:void 0},defaultChecked:{type:[Boolean,String,Number],default:!1},value:[String,Number],disabled:{type:Boolean,default:void 0},indeterminate:Boolean,label:String,focusable:{type:Boolean,default:!0},checkedValue:{type:[Boolean,String,Number],default:!0},uncheckedValue:{type:[Boolean,String,Number],default:!1},"onUpdate:checked":[Function,Array],onUpdateChecked:[Function,Array],privateInsideTable:Boolean,onChange:[Function,Array]}),F=f({name:`Checkbox`,props:P,setup(e){let n=c(k,null),r=h(null),{mergedClsPrefixRef:i,inlineThemeDisabled:o,mergedRtlRef:u,mergedComponentPropsRef:d}=y(e),f=h(e.defaultChecked),p=v(e,`checked`),m=D(p,f),g=l(()=>{if(n){let t=n.valueSetRef.value;return t&&e.value!==void 0?t.has(e.value):!1}return m.value===e.checkedValue}),b=C(e,{mergedSize(t){let{size:r}=e;if(r!==void 0)return r;if(n){let{value:e}=n.mergedSizeRef;if(e!==void 0)return e}if(t){let{mergedSize:e}=t;if(e!==void 0)return e.value}return d?.value?.Checkbox?.size||`medium`},mergedDisabled(t){let{disabled:r}=e;if(r!==void 0)return r;if(n){if(n.disabledRef.value)return!0;let{maxRef:{value:e},checkedCountRef:t}=n;if(e!==void 0&&t.value>=e&&!g.value)return!0;let{minRef:{value:r}}=n;if(r!==void 0&&t.value<=r&&g.value)return!0}return t?t.disabled.value:!1}}),{mergedDisabledRef:x,mergedSizeRef:E}=b,A=t(`Checkbox`,`-checkbox`,N,O,e,i);function j(t){if(n&&e.value!==void 0)n.toggleCheckbox(!g.value,e.value);else{let{onChange:n,"onUpdate:checked":r,onUpdateChecked:i}=e,{nTriggerFormInput:a,nTriggerFormChange:o}=b,s=g.value?e.uncheckedValue:e.checkedValue;r&&T(r,s,t),i&&T(i,s,t),n&&T(n,s,t),a(),o(),f.value=s}}function M(e){x.value||j(e)}function P(e){if(!x.value)switch(e.key){case` `:case`Enter`:j(e)}}function F(e){e.key===` `&&e.preventDefault()}let I={focus:()=>{var e;(e=r.value)==null||e.focus()},blur:()=>{var e;(e=r.value)==null||e.blur()}},L=s(`Checkbox`,u,i),R=w(()=>{let{value:e}=E,{common:{cubicBezierEaseInOut:t},self:{borderRadius:n,color:r,colorChecked:i,colorDisabled:a,colorTableHeader:o,colorTableHeaderModal:s,colorTableHeaderPopover:c,checkMarkColor:l,checkMarkColorDisabled:u,border:d,borderFocus:f,borderDisabled:p,borderChecked:m,boxShadowFocus:h,textColor:g,textColorDisabled:_,checkMarkColorDisabledChecked:v,colorDisabledChecked:y,borderDisabledChecked:b,labelPadding:x,labelLineHeight:C,labelFontWeight:w,[S(`fontSize`,e)]:T,[S(`size`,e)]:D}}=A.value;return{"--n-label-line-height":C,"--n-label-font-weight":w,"--n-size":D,"--n-bezier":t,"--n-border-radius":n,"--n-border":d,"--n-border-checked":m,"--n-border-focus":f,"--n-border-disabled":p,"--n-border-disabled-checked":b,"--n-box-shadow-focus":h,"--n-color":r,"--n-color-checked":i,"--n-color-table":o,"--n-color-table-modal":s,"--n-color-table-popover":c,"--n-color-disabled":a,"--n-color-disabled-checked":y,"--n-text-color":g,"--n-text-color-disabled":_,"--n-check-mark-color":l,"--n-check-mark-color-disabled":u,"--n-check-mark-color-disabled-checked":v,"--n-font-size":T,"--n-label-padding":x}}),z=o?_(`checkbox`,w(()=>E.value[0]),R,e):void 0;return Object.assign(b,I,{rtlEnabled:L,selfRef:r,mergedClsPrefix:i,mergedDisabled:x,renderedChecked:g,mergedTheme:A,labelId:a(),handleClick:M,handleKeyUp:P,handleKeyDown:F,cssVars:o?void 0:R,themeClass:z?.themeClass,onRender:z?.onRender})},render(){var e;let{$slots:t,renderedChecked:a,mergedDisabled:o,indeterminate:s,privateInsideTable:c,cssVars:l,labelId:u,label:d,mergedClsPrefix:f,focusable:p,handleKeyUp:m,handleKeyDown:h,handleClick:_}=this;(e=this.onRender)==null||e.call(this);let v=g(t.default,e=>d||e?r(`span`,{class:`${f}-checkbox__label`,id:u},d||e):null);return r(`div`,{ref:`selfRef`,class:[`${f}-checkbox`,this.themeClass,this.rtlEnabled&&`${f}-checkbox--rtl`,a&&`${f}-checkbox--checked`,o&&`${f}-checkbox--disabled`,s&&`${f}-checkbox--indeterminate`,c&&`${f}-checkbox--inside-table`,v&&`${f}-checkbox--show-label`],tabindex:o||!p?void 0:0,role:`checkbox`,"aria-checked":s?`mixed`:a,"aria-labelledby":u,style:l,onKeyup:m,onKeydown:h,onClick:_,onMousedown:()=>{i(`selectstart`,window,e=>{e.preventDefault()},{once:!0})}},r(`div`,{class:`${f}-checkbox-box-wrapper`},`\xA0`,r(`div`,{class:`${f}-checkbox-box`},r(n,null,{default:()=>this.indeterminate?r(`div`,{key:`indeterminate`,class:`${f}-checkbox-icon`},M()):r(`div`,{key:`check`,class:`${f}-checkbox-icon`},j())}),r(`div`,{class:`${f}-checkbox-box__border`}))),v)}});export{A as n,F as t};