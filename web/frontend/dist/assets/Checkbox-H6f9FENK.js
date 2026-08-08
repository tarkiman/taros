import{B as e,Bn as t,Ct as n,Gt as r,K as i,Nt as a,P as o,Pt as s,Qn as c,Rn as l,Tt as u,U as d,Vn as f,Xt as p,Yt as m,cn as h,dn as g,fn as _,gn as v,hn as y,jn as b,ln as x,mn as S,pr as C,qt as w,ur as T,wt as E}from"./auth-DuOMAfJl.js";import{c as D}from"./LocaleSwitcher-C8kLnMY3.js";import{t as O}from"./light-Dg0JCRQN.js";var k=r(`n-checkbox-group`),A=l({name:`CheckboxGroup`,props:{min:Number,max:Number,size:String,value:Array,defaultValue:{type:Array,default:null},disabled:{type:Boolean,default:void 0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onChange:[Function,Array]},setup(e){let{mergedClsPrefixRef:t}=u(e),r=n(e),{mergedSizeRef:i,mergedDisabledRef:a}=r,o=T(e.defaultValue),l=b(()=>e.value),d=D(l,o),f=b(()=>d.value?.length||0),p=b(()=>Array.isArray(d.value)?new Set(d.value):new Set);function m(t,n){let{nTriggerFormInput:i,nTriggerFormChange:a}=r,{onChange:c,"onUpdate:value":l,onUpdateValue:u}=e;if(Array.isArray(d.value)){let e=Array.from(d.value),r=e.findIndex(e=>e===n);t?~r||(e.push(n),u&&s(u,e,{actionType:`check`,value:n}),l&&s(l,e,{actionType:`check`,value:n}),i(),a(),o.value=e,c&&s(c,e)):~r&&(e.splice(r,1),u&&s(u,e,{actionType:`uncheck`,value:n}),l&&s(l,e,{actionType:`uncheck`,value:n}),c&&s(c,e),o.value=e,i(),a())}else t?(u&&s(u,[n],{actionType:`check`,value:n}),l&&s(l,[n],{actionType:`check`,value:n}),c&&s(c,[n]),o.value=[n],i(),a()):(u&&s(u,[],{actionType:`uncheck`,value:n}),l&&s(l,[],{actionType:`uncheck`,value:n}),c&&s(c,[]),o.value=[],i(),a())}return c(k,{checkedCountRef:f,maxRef:C(e,`max`),minRef:C(e,`min`),valueSetRef:p,disabledRef:a,mergedSizeRef:i,toggleCheckbox:m}),{mergedClsPrefix:t}},render(){return t(`div`,{class:`${this.mergedClsPrefix}-checkbox-group`,role:`group`},this.$slots)}}),j=()=>t(`svg`,{viewBox:`0 0 64 64`,class:`check-icon`},t(`path`,{d:`M50.42,16.76L22.34,39.45l-8.1-11.46c-1.12-1.58-3.3-1.96-4.88-0.84c-1.58,1.12-1.95,3.3-0.84,4.88l10.26,14.51  c0.56,0.79,1.42,1.31,2.38,1.45c0.16,0.02,0.32,0.03,0.48,0.03c0.8,0,1.57-0.27,2.2-0.78l30.99-25.03c1.5-1.21,1.74-3.42,0.52-4.92  C54.13,15.78,51.93,15.55,50.42,16.76z`})),M=()=>t(`svg`,{viewBox:`0 0 100 100`,class:`line-icon`},t(`path`,{d:`M80.2,55.5H21.4c-2.8,0-5.1-2.5-5.1-5.5l0,0c0-3,2.3-5.5,5.1-5.5h58.7c2.8,0,5.1,2.5,5.1,5.5l0,0C85.2,53.1,82.9,55.5,80.2,55.5z`})),N=h([x(`checkbox`,`
 font-size: var(--n-font-size);
 outline: none;
 cursor: pointer;
 display: inline-flex;
 flex-wrap: nowrap;
 align-items: flex-start;
 word-break: break-word;
 line-height: var(--n-size);
 --n-merged-color-table: var(--n-color-table);
 `,[_(`show-label`,`line-height: var(--n-label-line-height);`),h(`&:hover`,[x(`checkbox-box`,[g(`border`,`border: var(--n-border-checked);`)])]),h(`&:focus:not(:active)`,[x(`checkbox-box`,[g(`border`,`
 border: var(--n-border-focus);
 box-shadow: var(--n-box-shadow-focus);
 `)])]),_(`inside-table`,[x(`checkbox-box`,`
 background-color: var(--n-merged-color-table);
 `)]),_(`checked`,[x(`checkbox-box`,`
 background-color: var(--n-color-checked);
 `,[x(`checkbox-icon`,[h(`.check-icon`,`
 opacity: 1;
 transform: scale(1);
 `)])])]),_(`indeterminate`,[x(`checkbox-box`,[x(`checkbox-icon`,[h(`.check-icon`,`
 opacity: 0;
 transform: scale(.5);
 `),h(`.line-icon`,`
 opacity: 1;
 transform: scale(1);
 `)])])]),_(`checked, indeterminate`,[h(`&:focus:not(:active)`,[x(`checkbox-box`,[g(`border`,`
 border: var(--n-border-checked);
 box-shadow: var(--n-box-shadow-focus);
 `)])]),x(`checkbox-box`,`
 background-color: var(--n-color-checked);
 border-left: 0;
 border-top: 0;
 `,[g(`border`,{border:`var(--n-border-checked)`})])]),_(`disabled`,{cursor:`not-allowed`},[_(`checked`,[x(`checkbox-box`,`
 background-color: var(--n-color-disabled-checked);
 `,[g(`border`,{border:`var(--n-border-disabled-checked)`}),x(`checkbox-icon`,[h(`.check-icon, .line-icon`,{fill:`var(--n-check-mark-color-disabled-checked)`})])])]),x(`checkbox-box`,`
 background-color: var(--n-color-disabled);
 `,[g(`border`,`
 border: var(--n-border-disabled);
 `),x(`checkbox-icon`,[h(`.check-icon, .line-icon`,`
 fill: var(--n-check-mark-color-disabled);
 `)])]),g(`label`,`
 color: var(--n-text-color-disabled);
 `)]),x(`checkbox-box-wrapper`,`
 position: relative;
 width: var(--n-size);
 flex-shrink: 0;
 flex-grow: 0;
 user-select: none;
 -webkit-user-select: none;
 `),x(`checkbox-box`,`
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
 `),x(`checkbox-icon`,`
 display: flex;
 align-items: center;
 justify-content: center;
 position: absolute;
 left: 1px;
 right: 1px;
 top: 1px;
 bottom: 1px;
 `,[h(`.check-icon, .line-icon`,`
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
 `),o({left:`1px`,top:`1px`})])]),g(`label`,`
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 user-select: none;
 -webkit-user-select: none;
 padding: var(--n-label-padding);
 font-weight: var(--n-label-font-weight);
 `,[h(`&:empty`,{display:`none`})])]),y(x(`checkbox`,`
 --n-merged-color-table: var(--n-color-table-modal);
 `)),v(x(`checkbox`,`
 --n-merged-color-table: var(--n-color-table-popover);
 `))]),P=Object.assign(Object.assign({},d.props),{size:String,checked:{type:[Boolean,String,Number],default:void 0},defaultChecked:{type:[Boolean,String,Number],default:!1},value:[String,Number],disabled:{type:Boolean,default:void 0},indeterminate:Boolean,label:String,focusable:{type:Boolean,default:!0},checkedValue:{type:[Boolean,String,Number],default:!0},uncheckedValue:{type:[Boolean,String,Number],default:!1},"onUpdate:checked":[Function,Array],onUpdateChecked:[Function,Array],privateInsideTable:Boolean,onChange:[Function,Array]}),F=l({name:`Checkbox`,props:P,setup(e){let t=f(k,null),r=T(null),{mergedClsPrefixRef:a,inlineThemeDisabled:o,mergedRtlRef:c,mergedComponentPropsRef:l}=u(e),m=T(e.defaultChecked),h=C(e,`checked`),g=D(h,m),_=w(()=>{if(t){let n=t.valueSetRef.value;return n&&e.value!==void 0?n.has(e.value):!1}return g.value===e.checkedValue}),v=n(e,{mergedSize(n){let{size:r}=e;if(r!==void 0)return r;if(t){let{value:e}=t.mergedSizeRef;if(e!==void 0)return e}if(n){let{mergedSize:e}=n;if(e!==void 0)return e.value}return l?.value?.Checkbox?.size||`medium`},mergedDisabled(n){let{disabled:r}=e;if(r!==void 0)return r;if(t){if(t.disabledRef.value)return!0;let{maxRef:{value:e},checkedCountRef:n}=t;if(e!==void 0&&n.value>=e&&!_.value)return!0;let{minRef:{value:r}}=t;if(r!==void 0&&n.value<=r&&_.value)return!0}return n?n.disabled.value:!1}}),{mergedDisabledRef:y,mergedSizeRef:x}=v,A=d(`Checkbox`,`-checkbox`,N,O,e,a);function j(n){if(t&&e.value!==void 0)t.toggleCheckbox(!_.value,e.value);else{let{onChange:t,"onUpdate:checked":r,onUpdateChecked:i}=e,{nTriggerFormInput:a,nTriggerFormChange:o}=v,c=_.value?e.uncheckedValue:e.checkedValue;r&&s(r,c,n),i&&s(i,c,n),t&&s(t,c,n),a(),o(),m.value=c}}function M(e){y.value||j(e)}function P(e){if(!y.value)switch(e.key){case` `:case`Enter`:j(e)}}function F(e){e.key===` `&&e.preventDefault()}let I={focus:()=>{var e;(e=r.value)==null||e.focus()},blur:()=>{var e;(e=r.value)==null||e.blur()}},L=i(`Checkbox`,c,a),R=b(()=>{let{value:e}=x,{common:{cubicBezierEaseInOut:t},self:{borderRadius:n,color:r,colorChecked:i,colorDisabled:a,colorTableHeader:o,colorTableHeaderModal:s,colorTableHeaderPopover:c,checkMarkColor:l,checkMarkColorDisabled:u,border:d,borderFocus:f,borderDisabled:p,borderChecked:m,boxShadowFocus:h,textColor:g,textColorDisabled:_,checkMarkColorDisabledChecked:v,colorDisabledChecked:y,borderDisabledChecked:b,labelPadding:C,labelLineHeight:w,labelFontWeight:T,[S(`fontSize`,e)]:E,[S(`size`,e)]:D}}=A.value;return{"--n-label-line-height":w,"--n-label-font-weight":T,"--n-size":D,"--n-bezier":t,"--n-border-radius":n,"--n-border":d,"--n-border-checked":m,"--n-border-focus":f,"--n-border-disabled":p,"--n-border-disabled-checked":b,"--n-box-shadow-focus":h,"--n-color":r,"--n-color-checked":i,"--n-color-table":o,"--n-color-table-modal":s,"--n-color-table-popover":c,"--n-color-disabled":a,"--n-color-disabled-checked":y,"--n-text-color":g,"--n-text-color-disabled":_,"--n-check-mark-color":l,"--n-check-mark-color-disabled":u,"--n-check-mark-color-disabled-checked":v,"--n-font-size":E,"--n-label-padding":C}}),z=o?E(`checkbox`,b(()=>x.value[0]),R,e):void 0;return Object.assign(v,I,{rtlEnabled:L,selfRef:r,mergedClsPrefix:a,mergedDisabled:y,renderedChecked:_,mergedTheme:A,labelId:p(),handleClick:M,handleKeyUp:P,handleKeyDown:F,cssVars:o?void 0:R,themeClass:z?.themeClass,onRender:z?.onRender})},render(){var n;let{$slots:r,renderedChecked:i,mergedDisabled:o,indeterminate:s,privateInsideTable:c,cssVars:l,labelId:u,label:d,mergedClsPrefix:f,focusable:p,handleKeyUp:h,handleKeyDown:g,handleClick:_}=this;(n=this.onRender)==null||n.call(this);let v=a(r.default,e=>d||e?t(`span`,{class:`${f}-checkbox__label`,id:u},d||e):null);return t(`div`,{ref:`selfRef`,class:[`${f}-checkbox`,this.themeClass,this.rtlEnabled&&`${f}-checkbox--rtl`,i&&`${f}-checkbox--checked`,o&&`${f}-checkbox--disabled`,s&&`${f}-checkbox--indeterminate`,c&&`${f}-checkbox--inside-table`,v&&`${f}-checkbox--show-label`],tabindex:o||!p?void 0:0,role:`checkbox`,"aria-checked":s?`mixed`:i,"aria-labelledby":u,style:l,onKeyup:h,onKeydown:g,onClick:_,onMousedown:()=>{m(`selectstart`,window,e=>{e.preventDefault()},{once:!0})}},t(`div`,{class:`${f}-checkbox-box-wrapper`},`\xA0`,t(`div`,{class:`${f}-checkbox-box`},t(e,null,{default:()=>this.indeterminate?t(`div`,{key:`indeterminate`,class:`${f}-checkbox-icon`},M()):t(`div`,{key:`check`,class:`${f}-checkbox-icon`},j())}),t(`div`,{class:`${f}-checkbox-box__border`}))),v)}});export{A as n,F as t};