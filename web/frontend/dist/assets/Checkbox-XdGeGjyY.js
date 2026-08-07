import{An as e,Bn as t,Ct as n,G as r,H as i,Jt as a,Kt as o,Ln as s,Mt as c,N as l,Nt as u,St as d,Wt as f,Yt as p,Zn as m,cn as h,dn as g,fr as _,hn as v,lr as y,mn as b,pn as x,sn as S,un as C,wt as w,z as T,zn as E}from"./auth-B9qrSSDV.js";import{s as D}from"./LocaleSwitcher-C-KNnAoz.js";import{t as O}from"./light-BaQQPopj.js";var k=f(`n-checkbox-group`),A=s({name:`CheckboxGroup`,props:{min:Number,max:Number,size:String,value:Array,defaultValue:{type:Array,default:null},disabled:{type:Boolean,default:void 0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onChange:[Function,Array]},setup(t){let{mergedClsPrefixRef:n}=w(t),r=d(t),{mergedSizeRef:i,mergedDisabledRef:a}=r,o=y(t.defaultValue),s=e(()=>t.value),c=D(s,o),l=e(()=>c.value?.length||0),f=e(()=>Array.isArray(c.value)?new Set(c.value):new Set);function p(e,n){let{nTriggerFormInput:i,nTriggerFormChange:a}=r,{onChange:s,"onUpdate:value":l,onUpdateValue:d}=t;if(Array.isArray(c.value)){let t=Array.from(c.value),r=t.findIndex(e=>e===n);e?~r||(t.push(n),d&&u(d,t,{actionType:`check`,value:n}),l&&u(l,t,{actionType:`check`,value:n}),i(),a(),o.value=t,s&&u(s,t)):~r&&(t.splice(r,1),d&&u(d,t,{actionType:`uncheck`,value:n}),l&&u(l,t,{actionType:`uncheck`,value:n}),s&&u(s,t),o.value=t,i(),a())}else e?(d&&u(d,[n],{actionType:`check`,value:n}),l&&u(l,[n],{actionType:`check`,value:n}),s&&u(s,[n]),o.value=[n],i(),a()):(d&&u(d,[],{actionType:`uncheck`,value:n}),l&&u(l,[],{actionType:`uncheck`,value:n}),s&&u(s,[]),o.value=[],i(),a())}return m(k,{checkedCountRef:l,maxRef:_(t,`max`),minRef:_(t,`min`),valueSetRef:f,disabledRef:a,mergedSizeRef:i,toggleCheckbox:p}),{mergedClsPrefix:n}},render(){return E(`div`,{class:`${this.mergedClsPrefix}-checkbox-group`,role:`group`},this.$slots)}}),j=()=>E(`svg`,{viewBox:`0 0 64 64`,class:`check-icon`},E(`path`,{d:`M50.42,16.76L22.34,39.45l-8.1-11.46c-1.12-1.58-3.3-1.96-4.88-0.84c-1.58,1.12-1.95,3.3-0.84,4.88l10.26,14.51  c0.56,0.79,1.42,1.31,2.38,1.45c0.16,0.02,0.32,0.03,0.48,0.03c0.8,0,1.57-0.27,2.2-0.78l30.99-25.03c1.5-1.21,1.74-3.42,0.52-4.92  C54.13,15.78,51.93,15.55,50.42,16.76z`})),M=()=>E(`svg`,{viewBox:`0 0 100 100`,class:`line-icon`},E(`path`,{d:`M80.2,55.5H21.4c-2.8,0-5.1-2.5-5.1-5.5l0,0c0-3,2.3-5.5,5.1-5.5h58.7c2.8,0,5.1,2.5,5.1,5.5l0,0C85.2,53.1,82.9,55.5,80.2,55.5z`})),N=S([h(`checkbox`,`
 font-size: var(--n-font-size);
 outline: none;
 cursor: pointer;
 display: inline-flex;
 flex-wrap: nowrap;
 align-items: flex-start;
 word-break: break-word;
 line-height: var(--n-size);
 --n-merged-color-table: var(--n-color-table);
 `,[g(`show-label`,`line-height: var(--n-label-line-height);`),S(`&:hover`,[h(`checkbox-box`,[C(`border`,`border: var(--n-border-checked);`)])]),S(`&:focus:not(:active)`,[h(`checkbox-box`,[C(`border`,`
 border: var(--n-border-focus);
 box-shadow: var(--n-box-shadow-focus);
 `)])]),g(`inside-table`,[h(`checkbox-box`,`
 background-color: var(--n-merged-color-table);
 `)]),g(`checked`,[h(`checkbox-box`,`
 background-color: var(--n-color-checked);
 `,[h(`checkbox-icon`,[S(`.check-icon`,`
 opacity: 1;
 transform: scale(1);
 `)])])]),g(`indeterminate`,[h(`checkbox-box`,[h(`checkbox-icon`,[S(`.check-icon`,`
 opacity: 0;
 transform: scale(.5);
 `),S(`.line-icon`,`
 opacity: 1;
 transform: scale(1);
 `)])])]),g(`checked, indeterminate`,[S(`&:focus:not(:active)`,[h(`checkbox-box`,[C(`border`,`
 border: var(--n-border-checked);
 box-shadow: var(--n-box-shadow-focus);
 `)])]),h(`checkbox-box`,`
 background-color: var(--n-color-checked);
 border-left: 0;
 border-top: 0;
 `,[C(`border`,{border:`var(--n-border-checked)`})])]),g(`disabled`,{cursor:`not-allowed`},[g(`checked`,[h(`checkbox-box`,`
 background-color: var(--n-color-disabled-checked);
 `,[C(`border`,{border:`var(--n-border-disabled-checked)`}),h(`checkbox-icon`,[S(`.check-icon, .line-icon`,{fill:`var(--n-check-mark-color-disabled-checked)`})])])]),h(`checkbox-box`,`
 background-color: var(--n-color-disabled);
 `,[C(`border`,`
 border: var(--n-border-disabled);
 `),h(`checkbox-icon`,[S(`.check-icon, .line-icon`,`
 fill: var(--n-check-mark-color-disabled);
 `)])]),C(`label`,`
 color: var(--n-text-color-disabled);
 `)]),h(`checkbox-box-wrapper`,`
 position: relative;
 width: var(--n-size);
 flex-shrink: 0;
 flex-grow: 0;
 user-select: none;
 -webkit-user-select: none;
 `),h(`checkbox-box`,`
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
 `,[C(`border`,`
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
 `),h(`checkbox-icon`,`
 display: flex;
 align-items: center;
 justify-content: center;
 position: absolute;
 left: 1px;
 right: 1px;
 top: 1px;
 bottom: 1px;
 `,[S(`.check-icon, .line-icon`,`
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
 `),l({left:`1px`,top:`1px`})])]),C(`label`,`
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 user-select: none;
 -webkit-user-select: none;
 padding: var(--n-label-padding);
 font-weight: var(--n-label-font-weight);
 `,[S(`&:empty`,{display:`none`})])]),b(h(`checkbox`,`
 --n-merged-color-table: var(--n-color-table-modal);
 `)),v(h(`checkbox`,`
 --n-merged-color-table: var(--n-color-table-popover);
 `))]),P=Object.assign(Object.assign({},i.props),{size:String,checked:{type:[Boolean,String,Number],default:void 0},defaultChecked:{type:[Boolean,String,Number],default:!1},value:[String,Number],disabled:{type:Boolean,default:void 0},indeterminate:Boolean,label:String,focusable:{type:Boolean,default:!0},checkedValue:{type:[Boolean,String,Number],default:!0},uncheckedValue:{type:[Boolean,String,Number],default:!1},"onUpdate:checked":[Function,Array],onUpdateChecked:[Function,Array],privateInsideTable:Boolean,onChange:[Function,Array]}),F=s({name:`Checkbox`,props:P,setup(a){let s=t(k,null),c=y(null),{mergedClsPrefixRef:l,inlineThemeDisabled:f,mergedRtlRef:m,mergedComponentPropsRef:h}=w(a),g=y(a.defaultChecked),v=_(a,`checked`),b=D(v,g),S=o(()=>{if(s){let e=s.valueSetRef.value;return e&&a.value!==void 0?e.has(a.value):!1}return b.value===a.checkedValue}),C=d(a,{mergedSize(e){let{size:t}=a;if(t!==void 0)return t;if(s){let{value:e}=s.mergedSizeRef;if(e!==void 0)return e}if(e){let{mergedSize:t}=e;if(t!==void 0)return t.value}return h?.value?.Checkbox?.size||`medium`},mergedDisabled(e){let{disabled:t}=a;if(t!==void 0)return t;if(s){if(s.disabledRef.value)return!0;let{maxRef:{value:e},checkedCountRef:t}=s;if(e!==void 0&&t.value>=e&&!S.value)return!0;let{minRef:{value:n}}=s;if(n!==void 0&&t.value<=n&&S.value)return!0}return e?e.disabled.value:!1}}),{mergedDisabledRef:T,mergedSizeRef:E}=C,A=i(`Checkbox`,`-checkbox`,N,O,a,l);function j(e){if(s&&a.value!==void 0)s.toggleCheckbox(!S.value,a.value);else{let{onChange:t,"onUpdate:checked":n,onUpdateChecked:r}=a,{nTriggerFormInput:i,nTriggerFormChange:o}=C,s=S.value?a.uncheckedValue:a.checkedValue;n&&u(n,s,e),r&&u(r,s,e),t&&u(t,s,e),i(),o(),g.value=s}}function M(e){T.value||j(e)}function P(e){if(!T.value)switch(e.key){case` `:case`Enter`:j(e)}}function F(e){e.key===` `&&e.preventDefault()}let I={focus:()=>{var e;(e=c.value)==null||e.focus()},blur:()=>{var e;(e=c.value)==null||e.blur()}},L=r(`Checkbox`,m,l),R=e(()=>{let{value:e}=E,{common:{cubicBezierEaseInOut:t},self:{borderRadius:n,color:r,colorChecked:i,colorDisabled:a,colorTableHeader:o,colorTableHeaderModal:s,colorTableHeaderPopover:c,checkMarkColor:l,checkMarkColorDisabled:u,border:d,borderFocus:f,borderDisabled:p,borderChecked:m,boxShadowFocus:h,textColor:g,textColorDisabled:_,checkMarkColorDisabledChecked:v,colorDisabledChecked:y,borderDisabledChecked:b,labelPadding:S,labelLineHeight:C,labelFontWeight:w,[x(`fontSize`,e)]:T,[x(`size`,e)]:D}}=A.value;return{"--n-label-line-height":C,"--n-label-font-weight":w,"--n-size":D,"--n-bezier":t,"--n-border-radius":n,"--n-border":d,"--n-border-checked":m,"--n-border-focus":f,"--n-border-disabled":p,"--n-border-disabled-checked":b,"--n-box-shadow-focus":h,"--n-color":r,"--n-color-checked":i,"--n-color-table":o,"--n-color-table-modal":s,"--n-color-table-popover":c,"--n-color-disabled":a,"--n-color-disabled-checked":y,"--n-text-color":g,"--n-text-color-disabled":_,"--n-check-mark-color":l,"--n-check-mark-color-disabled":u,"--n-check-mark-color-disabled-checked":v,"--n-font-size":T,"--n-label-padding":S}}),z=f?n(`checkbox`,e(()=>E.value[0]),R,a):void 0;return Object.assign(C,I,{rtlEnabled:L,selfRef:c,mergedClsPrefix:l,mergedDisabled:T,renderedChecked:S,mergedTheme:A,labelId:p(),handleClick:M,handleKeyUp:P,handleKeyDown:F,cssVars:f?void 0:R,themeClass:z?.themeClass,onRender:z?.onRender})},render(){var e;let{$slots:t,renderedChecked:n,mergedDisabled:r,indeterminate:i,privateInsideTable:o,cssVars:s,labelId:l,label:u,mergedClsPrefix:d,focusable:f,handleKeyUp:p,handleKeyDown:m,handleClick:h}=this;(e=this.onRender)==null||e.call(this);let g=c(t.default,e=>u||e?E(`span`,{class:`${d}-checkbox__label`,id:l},u||e):null);return E(`div`,{ref:`selfRef`,class:[`${d}-checkbox`,this.themeClass,this.rtlEnabled&&`${d}-checkbox--rtl`,n&&`${d}-checkbox--checked`,r&&`${d}-checkbox--disabled`,i&&`${d}-checkbox--indeterminate`,o&&`${d}-checkbox--inside-table`,g&&`${d}-checkbox--show-label`],tabindex:r||!f?void 0:0,role:`checkbox`,"aria-checked":i?`mixed`:n,"aria-labelledby":l,style:s,onKeyup:p,onKeydown:m,onClick:h,onMousedown:()=>{a(`selectstart`,window,e=>{e.preventDefault()},{once:!0})}},E(`div`,{class:`${d}-checkbox-box-wrapper`},`\xA0`,E(`div`,{class:`${d}-checkbox-box`},E(T,null,{default:()=>this.indeterminate?E(`div`,{key:`indeterminate`,class:`${d}-checkbox-icon`},M()):E(`div`,{key:`check`,class:`${d}-checkbox-icon`},j())}),E(`div`,{class:`${d}-checkbox-box__border`}))),g)}});export{A as n,F as t};