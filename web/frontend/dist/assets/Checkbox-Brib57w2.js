import{$n as e,B as t,Bn as n,Ct as r,Gt as i,K as a,Nt as o,P as s,Pt as c,Rn as l,Tt as u,U as d,Vn as f,Xt as p,Yt as m,cn as h,dn as g,dr as _,fn as v,gn as y,hn as b,jn as x,ln as S,mn as C,mr as w,qt as T,wt as E}from"./auth-BqXj4TCh.js";import{c as D}from"./LocaleSwitcher-BxojKTdg.js";import{t as O}from"./light-De9-OOqE.js";var k=i(`n-checkbox-group`),A=l({name:`CheckboxGroup`,props:{min:Number,max:Number,size:String,value:Array,defaultValue:{type:Array,default:null},disabled:{type:Boolean,default:void 0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onChange:[Function,Array]},setup(t){let{mergedClsPrefixRef:n}=u(t),i=r(t),{mergedSizeRef:a,mergedDisabledRef:o}=i,s=_(t.defaultValue),l=x(()=>t.value),d=D(l,s),f=x(()=>d.value?.length||0),p=x(()=>Array.isArray(d.value)?new Set(d.value):new Set);function m(e,n){let{nTriggerFormInput:r,nTriggerFormChange:a}=i,{onChange:o,"onUpdate:value":l,onUpdateValue:u}=t;if(Array.isArray(d.value)){let t=Array.from(d.value),i=t.findIndex(e=>e===n);e?~i||(t.push(n),u&&c(u,t,{actionType:`check`,value:n}),l&&c(l,t,{actionType:`check`,value:n}),r(),a(),s.value=t,o&&c(o,t)):~i&&(t.splice(i,1),u&&c(u,t,{actionType:`uncheck`,value:n}),l&&c(l,t,{actionType:`uncheck`,value:n}),o&&c(o,t),s.value=t,r(),a())}else e?(u&&c(u,[n],{actionType:`check`,value:n}),l&&c(l,[n],{actionType:`check`,value:n}),o&&c(o,[n]),s.value=[n],r(),a()):(u&&c(u,[],{actionType:`uncheck`,value:n}),l&&c(l,[],{actionType:`uncheck`,value:n}),o&&c(o,[]),s.value=[],r(),a())}return e(k,{checkedCountRef:f,maxRef:w(t,`max`),minRef:w(t,`min`),valueSetRef:p,disabledRef:o,mergedSizeRef:a,toggleCheckbox:m}),{mergedClsPrefix:n}},render(){return n(`div`,{class:`${this.mergedClsPrefix}-checkbox-group`,role:`group`},this.$slots)}}),j=()=>n(`svg`,{viewBox:`0 0 64 64`,class:`check-icon`},n(`path`,{d:`M50.42,16.76L22.34,39.45l-8.1-11.46c-1.12-1.58-3.3-1.96-4.88-0.84c-1.58,1.12-1.95,3.3-0.84,4.88l10.26,14.51  c0.56,0.79,1.42,1.31,2.38,1.45c0.16,0.02,0.32,0.03,0.48,0.03c0.8,0,1.57-0.27,2.2-0.78l30.99-25.03c1.5-1.21,1.74-3.42,0.52-4.92  C54.13,15.78,51.93,15.55,50.42,16.76z`})),M=()=>n(`svg`,{viewBox:`0 0 100 100`,class:`line-icon`},n(`path`,{d:`M80.2,55.5H21.4c-2.8,0-5.1-2.5-5.1-5.5l0,0c0-3,2.3-5.5,5.1-5.5h58.7c2.8,0,5.1,2.5,5.1,5.5l0,0C85.2,53.1,82.9,55.5,80.2,55.5z`})),N=h([S(`checkbox`,`
 font-size: var(--n-font-size);
 outline: none;
 cursor: pointer;
 display: inline-flex;
 flex-wrap: nowrap;
 align-items: flex-start;
 word-break: break-word;
 line-height: var(--n-size);
 --n-merged-color-table: var(--n-color-table);
 `,[v(`show-label`,`line-height: var(--n-label-line-height);`),h(`&:hover`,[S(`checkbox-box`,[g(`border`,`border: var(--n-border-checked);`)])]),h(`&:focus:not(:active)`,[S(`checkbox-box`,[g(`border`,`
 border: var(--n-border-focus);
 box-shadow: var(--n-box-shadow-focus);
 `)])]),v(`inside-table`,[S(`checkbox-box`,`
 background-color: var(--n-merged-color-table);
 `)]),v(`checked`,[S(`checkbox-box`,`
 background-color: var(--n-color-checked);
 `,[S(`checkbox-icon`,[h(`.check-icon`,`
 opacity: 1;
 transform: scale(1);
 `)])])]),v(`indeterminate`,[S(`checkbox-box`,[S(`checkbox-icon`,[h(`.check-icon`,`
 opacity: 0;
 transform: scale(.5);
 `),h(`.line-icon`,`
 opacity: 1;
 transform: scale(1);
 `)])])]),v(`checked, indeterminate`,[h(`&:focus:not(:active)`,[S(`checkbox-box`,[g(`border`,`
 border: var(--n-border-checked);
 box-shadow: var(--n-box-shadow-focus);
 `)])]),S(`checkbox-box`,`
 background-color: var(--n-color-checked);
 border-left: 0;
 border-top: 0;
 `,[g(`border`,{border:`var(--n-border-checked)`})])]),v(`disabled`,{cursor:`not-allowed`},[v(`checked`,[S(`checkbox-box`,`
 background-color: var(--n-color-disabled-checked);
 `,[g(`border`,{border:`var(--n-border-disabled-checked)`}),S(`checkbox-icon`,[h(`.check-icon, .line-icon`,{fill:`var(--n-check-mark-color-disabled-checked)`})])])]),S(`checkbox-box`,`
 background-color: var(--n-color-disabled);
 `,[g(`border`,`
 border: var(--n-border-disabled);
 `),S(`checkbox-icon`,[h(`.check-icon, .line-icon`,`
 fill: var(--n-check-mark-color-disabled);
 `)])]),g(`label`,`
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
 `),S(`checkbox-icon`,`
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
 `),s({left:`1px`,top:`1px`})])]),g(`label`,`
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 user-select: none;
 -webkit-user-select: none;
 padding: var(--n-label-padding);
 font-weight: var(--n-label-font-weight);
 `,[h(`&:empty`,{display:`none`})])]),b(S(`checkbox`,`
 --n-merged-color-table: var(--n-color-table-modal);
 `)),y(S(`checkbox`,`
 --n-merged-color-table: var(--n-color-table-popover);
 `))]),P=Object.assign(Object.assign({},d.props),{size:String,checked:{type:[Boolean,String,Number],default:void 0},defaultChecked:{type:[Boolean,String,Number],default:!1},value:[String,Number],disabled:{type:Boolean,default:void 0},indeterminate:Boolean,label:String,focusable:{type:Boolean,default:!0},checkedValue:{type:[Boolean,String,Number],default:!0},uncheckedValue:{type:[Boolean,String,Number],default:!1},"onUpdate:checked":[Function,Array],onUpdateChecked:[Function,Array],privateInsideTable:Boolean,onChange:[Function,Array]}),F=l({name:`Checkbox`,props:P,setup(e){let t=f(k,null),n=_(null),{mergedClsPrefixRef:i,inlineThemeDisabled:o,mergedRtlRef:s,mergedComponentPropsRef:l}=u(e),m=_(e.defaultChecked),h=w(e,`checked`),g=D(h,m),v=T(()=>{if(t){let n=t.valueSetRef.value;return n&&e.value!==void 0?n.has(e.value):!1}return g.value===e.checkedValue}),y=r(e,{mergedSize(n){let{size:r}=e;if(r!==void 0)return r;if(t){let{value:e}=t.mergedSizeRef;if(e!==void 0)return e}if(n){let{mergedSize:e}=n;if(e!==void 0)return e.value}return l?.value?.Checkbox?.size||`medium`},mergedDisabled(n){let{disabled:r}=e;if(r!==void 0)return r;if(t){if(t.disabledRef.value)return!0;let{maxRef:{value:e},checkedCountRef:n}=t;if(e!==void 0&&n.value>=e&&!v.value)return!0;let{minRef:{value:r}}=t;if(r!==void 0&&n.value<=r&&v.value)return!0}return n?n.disabled.value:!1}}),{mergedDisabledRef:b,mergedSizeRef:S}=y,A=d(`Checkbox`,`-checkbox`,N,O,e,i);function j(n){if(t&&e.value!==void 0)t.toggleCheckbox(!v.value,e.value);else{let{onChange:t,"onUpdate:checked":r,onUpdateChecked:i}=e,{nTriggerFormInput:a,nTriggerFormChange:o}=y,s=v.value?e.uncheckedValue:e.checkedValue;r&&c(r,s,n),i&&c(i,s,n),t&&c(t,s,n),a(),o(),m.value=s}}function M(e){b.value||j(e)}function P(e){if(!b.value)switch(e.key){case` `:case`Enter`:j(e)}}function F(e){e.key===` `&&e.preventDefault()}let I={focus:()=>{var e;(e=n.value)==null||e.focus()},blur:()=>{var e;(e=n.value)==null||e.blur()}},L=a(`Checkbox`,s,i),R=x(()=>{let{value:e}=S,{common:{cubicBezierEaseInOut:t},self:{borderRadius:n,color:r,colorChecked:i,colorDisabled:a,colorTableHeader:o,colorTableHeaderModal:s,colorTableHeaderPopover:c,checkMarkColor:l,checkMarkColorDisabled:u,border:d,borderFocus:f,borderDisabled:p,borderChecked:m,boxShadowFocus:h,textColor:g,textColorDisabled:_,checkMarkColorDisabledChecked:v,colorDisabledChecked:y,borderDisabledChecked:b,labelPadding:x,labelLineHeight:w,labelFontWeight:T,[C(`fontSize`,e)]:E,[C(`size`,e)]:D}}=A.value;return{"--n-label-line-height":w,"--n-label-font-weight":T,"--n-size":D,"--n-bezier":t,"--n-border-radius":n,"--n-border":d,"--n-border-checked":m,"--n-border-focus":f,"--n-border-disabled":p,"--n-border-disabled-checked":b,"--n-box-shadow-focus":h,"--n-color":r,"--n-color-checked":i,"--n-color-table":o,"--n-color-table-modal":s,"--n-color-table-popover":c,"--n-color-disabled":a,"--n-color-disabled-checked":y,"--n-text-color":g,"--n-text-color-disabled":_,"--n-check-mark-color":l,"--n-check-mark-color-disabled":u,"--n-check-mark-color-disabled-checked":v,"--n-font-size":E,"--n-label-padding":x}}),z=o?E(`checkbox`,x(()=>S.value[0]),R,e):void 0;return Object.assign(y,I,{rtlEnabled:L,selfRef:n,mergedClsPrefix:i,mergedDisabled:b,renderedChecked:v,mergedTheme:A,labelId:p(),handleClick:M,handleKeyUp:P,handleKeyDown:F,cssVars:o?void 0:R,themeClass:z?.themeClass,onRender:z?.onRender})},render(){var e;let{$slots:r,renderedChecked:i,mergedDisabled:a,indeterminate:s,privateInsideTable:c,cssVars:l,labelId:u,label:d,mergedClsPrefix:f,focusable:p,handleKeyUp:h,handleKeyDown:g,handleClick:_}=this;(e=this.onRender)==null||e.call(this);let v=o(r.default,e=>d||e?n(`span`,{class:`${f}-checkbox__label`,id:u},d||e):null);return n(`div`,{ref:`selfRef`,class:[`${f}-checkbox`,this.themeClass,this.rtlEnabled&&`${f}-checkbox--rtl`,i&&`${f}-checkbox--checked`,a&&`${f}-checkbox--disabled`,s&&`${f}-checkbox--indeterminate`,c&&`${f}-checkbox--inside-table`,v&&`${f}-checkbox--show-label`],tabindex:a||!p?void 0:0,role:`checkbox`,"aria-checked":s?`mixed`:i,"aria-labelledby":u,style:l,onKeyup:h,onKeydown:g,onClick:_,onMousedown:()=>{m(`selectstart`,window,e=>{e.preventDefault()},{once:!0})}},n(`div`,{class:`${f}-checkbox-box-wrapper`},`\xA0`,n(`div`,{class:`${f}-checkbox-box`},n(t,null,{default:()=>this.indeterminate?n(`div`,{key:`indeterminate`,class:`${f}-checkbox-icon`},M()):n(`div`,{key:`check`,class:`${f}-checkbox-icon`},j())}),n(`div`,{class:`${f}-checkbox-box__border`}))),v)}});export{A as n,F as t};