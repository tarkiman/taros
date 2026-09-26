import{$n as e,A as t,Bn as n,Bt as r,Cn as i,Ct as a,Dn as o,Hn as s,Ht as c,Jn as l,K as u,Kn as d,Kt as f,Nt as p,Ot as m,Pt as h,Rn as g,Tt as _,U as v,Un as y,V as b,Vn as x,Vt as S,Wn as C,Yn as w,an as T,ar as E,bn as D,cn as O,dn as k,dr as A,fn as j,in as M,ir as N,jn as P,jt as F,ln as I,mn as L,mr as R,nn as z,on as ee,pn as B,qt as V,sr as H,tr as te,w as U,wt as ne}from"./auth-CagbRib-.js";import{C as re,E as W,S as ie,_ as G,b as K,g as q,p as ae,v as J,w as oe,x as se,y as ce}from"./AppShell-CNLaICFz.js";import{m as Y}from"./useTheme-BUD59PT5.js";import{c as le}from"./LocaleSwitcher-Bh-zPO1-.js";import{a as ue,n as X,r as Z}from"./_common-CHHEzeRD.js";import{t as Q}from"./Tag-CMgr2iS2.js";import{a as de,n as fe}from"./Input-B5Y0PkHH.js";import{a as pe,r as me,s as he,t as ge}from"./light-5c7EkE2u.js";function _e(e,t){let{target:n}=e;for(;n;){if(n.dataset&&n.dataset[t]!==void 0)return!0;n=n.parentElement}return!1}function ve(e){return e&-e}var ye=class{constructor(e,t){this.l=e,this.min=t;let n=Array(e+1);for(let t=0;t<e+1;++t)n[t]=0;this.ft=n}add(e,t){if(t===0)return;let{l:n,ft:r}=this;for(e+=1;e<=n;)r[e]+=t,e+=ve(e)}get(e){return this.sum(e+1)-this.sum(e)}sum(e){if(e===void 0&&(e=this.l),e<=0)return 0;let{ft:t,min:n,l:r}=this;if(e>r)throw Error("[FinweckTree.sum]: `i` is larger than length.");let i=e*n;for(;e>0;)i+=t[e],e-=ve(e);return i}getBound(e){let t=0,n=this.l;for(;n>t;){let r=Math.floor((t+n)/2),i=this.sum(r);if(i>e){n=r;continue}if(i<e){if(t===r)return this.sum(t+1)<=e?t+1:r;t=r}else return r}return t}},be;function xe(){return typeof document>`u`?!1:(be===void 0&&(be=`matchMedia`in window&&window.matchMedia(`(pointer:coarse)`).matches),be)}var Se;function Ce(){return typeof document>`u`?1:(Se===void 0&&(Se=`chrome`in window?window.devicePixelRatio:1),Se)}var we=`VVirtualListXScroll`;function Te({columnsRef:t,renderColRef:n,renderItemWithColsRef:r}){let i=A(0),a=A(0),o=P(()=>{let e=t.value;if(e.length===0)return null;let n=new ye(e.length,0);return e.forEach((e,t)=>{n.add(t,e.width)}),n}),s=V(()=>{let e=o.value;return e===null?0:Math.max(e.getBound(a.value)-1,0)}),c=e=>{let t=o.value;return t===null?0:t.sum(e)},l=V(()=>{let e=o.value;return e===null?0:Math.min(e.getBound(a.value+i.value)+1,t.value.length-1)});return e(we,{startIndexRef:s,endIndexRef:l,columnsRef:t,renderColRef:n,renderItemWithColsRef:r,getLeft:c}),{listWidthRef:i,scrollLeftRef:a}}var Ee=g({name:`VirtualListRow`,props:{index:{type:Number,required:!0},item:{type:Object,required:!0}},setup(){let{startIndexRef:e,endIndexRef:t,columnsRef:n,getLeft:r,renderColRef:i,renderItemWithColsRef:a}=x(we);return{startIndex:e,endIndex:t,columns:n,renderCol:i,renderItemWithCols:a,getLeft:r}},render(){let{startIndex:e,endIndex:t,columns:n,renderCol:r,renderItemWithCols:i,getLeft:a,item:o}=this;if(i!=null)return i({itemIndex:this.index,startColIndex:e,endColIndex:t,allColumns:n,item:o,getLeft:a});if(r!=null){let i=[];for(let s=e;s<=t;++s){let e=n[s];i.push(r({column:e,left:a(s),item:o}))}return i}return null}}),De=G(`.v-vl`,{maxHeight:`inherit`,height:`100%`,overflow:`auto`,minWidth:`1px`},[G(`&:not(.v-vl--show-scrollbar)`,{scrollbarWidth:`none`},[G(`&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb`,{width:0,height:0,display:`none`})])]),Oe=g({name:`VirtualList`,inheritAttrs:!1,props:{showScrollbar:{type:Boolean,default:!0},columns:{type:Array,default:()=>[]},renderCol:Function,renderItemWithCols:Function,items:{type:Array,default:()=>[]},itemSize:{type:Number,required:!0},itemResizable:Boolean,itemsStyle:[String,Object],visibleItemsTag:{type:[String,Object],default:`div`},visibleItemsProps:Object,ignoreItemResize:Boolean,onScroll:Function,onWheel:Function,onResize:Function,defaultScrollKey:[Number,String],defaultScrollIndex:Number,keyField:{type:String,default:`key`},paddingTop:{type:[Number,String],default:0},paddingBottom:{type:[Number,String],default:0}},setup(e){let t=c();De.mount({id:`vueuc/virtual-list`,head:!0,anchorMetaName:J,ssr:t}),w(()=>{let{defaultScrollIndex:t,defaultScrollKey:n}=e;t==null?n!=null&&v({key:n}):v({index:t})});let n=!1,r=!1;C(()=>{if(n=!1,!r){r=!0;return}v({top:h.value,left:o.value})}),l(()=>{n=!0,r||=!0});let i=V(()=>{if(e.renderCol==null&&e.renderItemWithCols==null||e.columns.length===0)return;let t=0;return e.columns.forEach(e=>{t+=e.width}),t}),a=P(()=>{let t=new Map,{keyField:n}=e;return e.items.forEach((e,r)=>{t.set(e[n],r)}),t}),{scrollLeftRef:o,listWidthRef:s}=Te({columnsRef:R(e,`columns`),renderColRef:R(e,`renderCol`),renderItemWithColsRef:R(e,`renderItemWithCols`)}),u=A(null),d=A(void 0),f=new Map,p=P(()=>{let{items:t,itemSize:n,keyField:r}=e,i=new ye(t.length,n);return t.forEach((e,t)=>{let n=e[r],a=f.get(n);a!==void 0&&i.add(t,a)}),i}),m=A(0),h=A(0),g=V(()=>Math.max(p.value.getBound(h.value-z(e.paddingTop))-1,0)),_=P(()=>{let{value:t}=d;if(t===void 0)return[];let{items:n,itemSize:r}=e,i=g.value,a=Math.min(i+Math.ceil(t/r+1),n.length-1),o=[];for(let e=i;e<=a;++e)o.push(n[e]);return o}),v=(e,t)=>{if(typeof e==`number`){S(e,t,`auto`);return}let{left:n,top:r,index:i,key:o,position:s,behavior:c,debounce:l=!0}=e;if(n!==void 0||r!==void 0)S(n,r,c);else if(i!==void 0)x(i,c,l);else if(o!==void 0){let e=a.value.get(o);e!==void 0&&x(e,c,l)}else s===`bottom`?S(0,2**53-1,c):s===`top`&&S(0,0,c)},y,b=null;function x(t,n,r){let{value:i}=p,a=i.sum(t)+z(e.paddingTop);if(!r)u.value.scrollTo({left:0,top:a,behavior:n});else{y=t,b!==null&&window.clearTimeout(b),b=window.setTimeout(()=>{y=void 0,b=null},16);let{scrollTop:e,offsetHeight:r}=u.value;if(a>e){let o=i.get(t);a+o<=e+r||u.value.scrollTo({left:0,top:a+o-r,behavior:n})}else u.value.scrollTo({left:0,top:a,behavior:n})}}function S(e,t,n){u.value.scrollTo({left:e,top:t,behavior:n})}function E(t,r){if(n||e.ignoreItemResize||F(r.target))return;let{value:i}=p,o=a.value.get(t),s=i.get(o),c=r.borderBoxSize?.[0]?.blockSize??r.contentRect.height;if(c===s)return;c-e.itemSize===0?f.delete(t):f.set(t,c-e.itemSize);let l=c-s;if(l===0)return;i.add(o,l);let d=u.value;if(d!=null){if(y===void 0){let e=i.sum(o);d.scrollTop>e&&d.scrollBy(0,l)}else(o<y||o===y&&c+i.sum(o)>d.scrollTop+d.offsetHeight)&&d.scrollBy(0,l);N()}m.value++}let D=!xe(),O=!1;function k(t){var n;(n=e.onScroll)==null||n.call(e,t),(!D||!O)&&N()}function j(t){var n;if((n=e.onWheel)==null||n.call(e,t),D){let e=u.value;if(e!=null){if(t.deltaX===0&&(e.scrollTop===0&&t.deltaY<=0||e.scrollTop+e.offsetHeight>=e.scrollHeight&&t.deltaY>=0))return;t.preventDefault(),e.scrollTop+=t.deltaY/Ce(),e.scrollLeft+=t.deltaX/Ce(),N(),O=!0,W(()=>{O=!1})}}}function M(t){if(n||F(t.target))return;if(e.renderCol==null&&e.renderItemWithCols==null){if(t.contentRect.height===d.value)return}else if(t.contentRect.height===d.value&&t.contentRect.width===s.value)return;d.value=t.contentRect.height,s.value=t.contentRect.width;let{onResize:r}=e;r!==void 0&&r(t)}function N(){let{value:e}=u;e!=null&&(h.value=e.scrollTop,o.value=e.scrollLeft)}function F(e){let t=e;for(;t!==null;){if(t.style.display===`none`)return!0;t=t.parentElement}return!1}return{listHeight:d,listStyle:{overflow:`auto`},keyToIndex:a,itemsStyle:P(()=>{let{itemResizable:t}=e,n=T(p.value.sum());return m.value,[e.itemsStyle,{boxSizing:`content-box`,width:T(i.value),height:t?``:n,minHeight:t?n:``,paddingTop:T(e.paddingTop),paddingBottom:T(e.paddingBottom)}]}),visibleItemsStyle:P(()=>(m.value,{transform:`translateY(${T(p.value.sum(g.value))})`})),viewportItems:_,listElRef:u,itemsElRef:A(null),scrollTo:v,handleListResize:M,handleListScroll:k,handleListWheel:j,handleItemResize:E}},render(){let{itemResizable:e,keyField:t,keyToIndex:i,visibleItemsTag:a}=this;return n(r,{onResize:this.handleListResize},{default:()=>{var o;return n(`div`,s(this.$attrs,{class:[`v-vl`,this.showScrollbar&&`v-vl--show-scrollbar`],onScroll:this.handleListScroll,onWheel:this.handleListWheel,ref:`listElRef`}),[this.items.length===0?(o=this.$slots).empty?.call(o):n(`div`,{ref:`itemsElRef`,class:`v-vl-items`,style:this.itemsStyle},[n(a,Object.assign({class:`v-vl-visible-items`,style:this.visibleItemsStyle},this.visibleItemsProps),{default:()=>{let{renderCol:a,renderItemWithCols:o}=this;return this.viewportItems.map(s=>{let c=s[t],l=i.get(c),u=a==null?void 0:n(Ee,{index:l,item:s}),d=o==null?void 0:n(Ee,{index:l,item:s}),f=this.$slots.default({item:s,renderedCols:u,renderedItemWithCols:d,index:l})[0];return e?n(r,{key:c,onResize:e=>this.handleItemResize(c,e)},{default:()=>f}):(f.key=c,f)})}})])])}})}}),$=`v-hidden`,ke=G(`[v-hidden]`,{display:`none!important`}),Ae=g({name:`Overflow`,props:{getCounter:Function,getTail:Function,updateCounter:Function,onUpdateCount:Function,onUpdateOverflow:Function},setup(e,{slots:t}){let n=A(null),r=A(null);function i(i){let{value:a}=n,{getCounter:o,getTail:s}=e,c;if(c=o===void 0?r.value:o(),!a||!c)return;c.hasAttribute($)&&c.removeAttribute($);let{children:l}=a;if(i.showAllItemsBeforeCalculate)for(let e of l)e.hasAttribute($)&&e.removeAttribute($);let u=a.offsetWidth,d=[],f=t.tail?s?.():null,p=f?f.offsetWidth:0,m=!1,h=a.children.length-+!!t.tail;for(let t=0;t<h-1;++t){if(t<0)continue;let n=l[t];if(m){n.hasAttribute($)||n.setAttribute($,``);continue}n.hasAttribute($)&&n.removeAttribute($);let r=n.offsetWidth;if(p+=r,d[t]=r,p>u){let{updateCounter:n}=e;for(let r=t;r>=0;--r){let i=h-1-r;n===void 0?c.textContent=`${i}`:n(i);let a=c.offsetWidth;if(p-=d[r],p+a<=u||r===0){m=!0,t=r-1,f&&(t===-1?(f.style.maxWidth=`${u-a}px`,f.style.boxSizing=`border-box`):f.style.maxWidth=``);let{onUpdateCount:n}=e;n&&n(i);break}}}}let{onUpdateOverflow:g}=e;m?g!==void 0&&g(!0):(g!==void 0&&g(!1),c.setAttribute($,``))}let a=c();return ke.mount({id:`vueuc/overflow`,head:!0,anchorMetaName:J,ssr:a}),w(()=>i({showAllItemsBeforeCalculate:!1})),{selfRef:n,counterRef:r,sync:i}},render(){let{$slots:e}=this;return y(()=>this.sync({showAllItemsBeforeCalculate:!1})),n(`div`,{class:`v-overflow`,ref:`selfRef`},[te(e,`default`),e.counter?e.counter():n(`span`,{style:{display:`inline-block`},ref:`counterRef`}),e.tail?e.tail():null])}});function je(e,t){t&&(w(()=>{let{value:n}=e;n&&S.registerHandler(n,t)}),N(e,(e,t)=>{t&&S.unregisterHandler(t)},{deep:!1}),d(()=>{let{value:t}=e;t&&S.unregisterHandler(t)}))}function Me(e){switch(typeof e){case`string`:return e||void 0;case`number`:return String(e);default:return}}function Ne(e){let t=e.filter(e=>e!==void 0);if(t.length!==0)return t.length===1?t[0]:t=>{e.forEach(e=>{e&&e(t)})}}var Pe=g({name:`Checkmark`,render(){return n(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 16 16`},n(`g`,{fill:`none`},n(`path`,{d:`M14.046 3.486a.75.75 0 0 1-.032 1.06l-7.93 7.474a.85.85 0 0 1-1.188-.022l-2.68-2.72a.75.75 0 1 1 1.068-1.053l2.234 2.267l7.468-7.038a.75.75 0 0 1 1.06.032z`,fill:`currentColor`})))}}),Fe=g({name:`Empty`,render(){return n(`svg`,{viewBox:`0 0 28 28`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},n(`path`,{d:`M26 7.5C26 11.0899 23.0899 14 19.5 14C15.9101 14 13 11.0899 13 7.5C13 3.91015 15.9101 1 19.5 1C23.0899 1 26 3.91015 26 7.5ZM16.8536 4.14645C16.6583 3.95118 16.3417 3.95118 16.1464 4.14645C15.9512 4.34171 15.9512 4.65829 16.1464 4.85355L18.7929 7.5L16.1464 10.1464C15.9512 10.3417 15.9512 10.6583 16.1464 10.8536C16.3417 11.0488 16.6583 11.0488 16.8536 10.8536L19.5 8.20711L22.1464 10.8536C22.3417 11.0488 22.6583 11.0488 22.8536 10.8536C23.0488 10.6583 23.0488 10.3417 22.8536 10.1464L20.2071 7.5L22.8536 4.85355C23.0488 4.65829 23.0488 4.34171 22.8536 4.14645C22.6583 3.95118 22.3417 3.95118 22.1464 4.14645L19.5 6.79289L16.8536 4.14645Z`,fill:`currentColor`}),n(`path`,{d:`M25 22.75V12.5991C24.5572 13.0765 24.053 13.4961 23.5 13.8454V16H17.5L17.3982 16.0068C17.0322 16.0565 16.75 16.3703 16.75 16.75C16.75 18.2688 15.5188 19.5 14 19.5C12.4812 19.5 11.25 18.2688 11.25 16.75L11.2432 16.6482C11.1935 16.2822 10.8797 16 10.5 16H4.5V7.25C4.5 6.2835 5.2835 5.5 6.25 5.5H12.2696C12.4146 4.97463 12.6153 4.47237 12.865 4H6.25C4.45507 4 3 5.45507 3 7.25V22.75C3 24.5449 4.45507 26 6.25 26H21.75C23.5449 26 25 24.5449 25 22.75ZM4.5 22.75V17.5H9.81597L9.85751 17.7041C10.2905 19.5919 11.9808 21 14 21L14.215 20.9947C16.2095 20.8953 17.842 19.4209 18.184 17.5H23.5V22.75C23.5 23.7165 22.7165 24.5 21.75 24.5H6.25C5.2835 24.5 4.5 23.7165 4.5 22.75Z`,fill:`currentColor`}))}}),Ie=g({props:{onFocus:Function,onBlur:Function},setup(e){return()=>n(`div`,{style:`width: 0; height: 0`,tabindex:0,onFocus:e.onFocus,onBlur:e.onBlur})}});function Le(e){return Array.isArray(e)?e:[e]}var Re={STOP:`STOP`};function ze(e,t){let n=t(e);e.children!==void 0&&n!==Re.STOP&&e.children.forEach(e=>ze(e,t))}function Be(e,t={}){let{preserveGroup:n=!1}=t,r=[],i=n?e=>{e.isLeaf||(r.push(e.key),a(e.children))}:e=>{e.isLeaf||(e.isGroup||r.push(e.key),a(e.children))};function a(e){e.forEach(i)}return a(e),r}function Ve(e,t){let{isLeaf:n}=e;return n===void 0?!t(e):n}function He(e){return e.children}function Ue(e){return e.key}function We(){return!1}function Ge(e,t){let{isLeaf:n}=e;return!(n===!1&&!Array.isArray(t(e)))}function Ke(e){return e.disabled===!0}function qe(e,t){return e.isLeaf===!1&&!Array.isArray(t(e))}function Je(e){return e==null?[]:Array.isArray(e)?e:e.checkedKeys??[]}function Ye(e){return e==null||Array.isArray(e)?[]:e.indeterminateKeys??[]}function Xe(e,t){let n=new Set(e);return t.forEach(e=>{n.has(e)||n.add(e)}),Array.from(n)}function Ze(e,t){let n=new Set(e);return t.forEach(e=>{n.has(e)&&n.delete(e)}),Array.from(n)}function Qe(e){return e?.type===`group`}function $e(e){let t=new Map;return e.forEach((e,n)=>{t.set(e.key,n)}),e=>t.get(e)??null}var et=class extends Error{constructor(){super(),this.message=`SubtreeNotLoadedError: checking a subtree whose required nodes are not fully loaded.`}};function tt(e,t,n,r){return at(t.concat(e),n,r,!1)}function nt(e,t){let n=new Set;return e.forEach(e=>{let r=t.treeNodeMap.get(e);if(r!==void 0){let e=r.parent;for(;e!==null&&!(e.disabled||n.has(e.key));)n.add(e.key),e=e.parent}}),n}function rt(e,t,n,r){let i=at(t,n,r,!1),a=at(e,n,r,!0),o=nt(e,n),s=[];return i.forEach(e=>{(a.has(e)||o.has(e))&&s.push(e)}),s.forEach(e=>i.delete(e)),i}function it(e,t){let{checkedKeys:n,keysToCheck:r,keysToUncheck:i,indeterminateKeys:a,cascade:o,leafOnly:s,checkStrategy:c,allowNotLoaded:l}=e;if(!o)return r===void 0?i===void 0?{checkedKeys:Array.from(n),indeterminateKeys:Array.from(a)}:{checkedKeys:Ze(n,i),indeterminateKeys:Array.from(a)}:{checkedKeys:Xe(n,r),indeterminateKeys:Array.from(a)};let{levelTreeNodeMap:u}=t,d;d=i===void 0?r===void 0?at(n,t,l,!1):tt(r,n,t,l):rt(i,n,t,l);let f=c===`parent`,p=c===`child`||s,m=d,h=new Set,g=Math.max.apply(null,Array.from(u.keys()));for(let e=g;e>=0;--e){let t=e===0,n=u.get(e);for(let e of n){if(e.isLeaf)continue;let{key:n,shallowLoaded:r}=e;if(p&&r&&e.children.forEach(e=>{!e.disabled&&!e.isLeaf&&e.shallowLoaded&&m.has(e.key)&&m.delete(e.key)}),e.disabled||!r)continue;let i=!0,a=!1,o=!0;for(let t of e.children){let e=t.key;if(!t.disabled){if(o&&=!1,m.has(e))a=!0;else if(h.has(e)){a=!0,i=!1;break}else if(i=!1,a)break}}i&&!o?(f&&e.children.forEach(e=>{!e.disabled&&m.has(e.key)&&m.delete(e.key)}),m.add(n)):a&&h.add(n),t&&p&&m.has(n)&&m.delete(n)}}return{checkedKeys:Array.from(m),indeterminateKeys:Array.from(h)}}function at(e,t,n,r){let{treeNodeMap:i,getChildren:a}=t,o=new Set,s=new Set(e);return e.forEach(e=>{let t=i.get(e);t!==void 0&&ze(t,e=>{if(e.disabled)return Re.STOP;let{key:t}=e;if(!o.has(t)&&(o.add(t),s.add(t),qe(e.rawNode,a))){if(r)return Re.STOP;if(!n)throw new et}})}),s}function ot(e,{includeGroup:t=!1,includeSelf:n=!0},r){let i=r.treeNodeMap,a=e==null?null:i.get(e)??null,o={keyPath:[],treeNodePath:[],treeNode:a};if(a?.ignored)return o.treeNode=null,o;for(;a;)!a.ignored&&(t||!a.isGroup)&&o.treeNodePath.push(a),a=a.parent;return o.treeNodePath.reverse(),n||o.treeNodePath.pop(),o.keyPath=o.treeNodePath.map(e=>e.key),o}function st(e){if(e.length===0)return null;let t=e[0];return t.isGroup||t.ignored||t.disabled?t.getNext():t}function ct(e,t){let n=e.siblings,r=n.length,{index:i}=e;return t?n[(i+1)%r]:i===n.length-1?null:n[i+1]}function lt(e,t,{loop:n=!1,includeDisabled:r=!1}={}){let i=t===`prev`?ut:ct,a={reverse:t===`prev`},o=!1,s=null;function c(t){if(t!==null){if(t===e){if(!o)o=!0;else if(!e.disabled&&!e.isGroup){s=e;return}}else if((!t.disabled||r)&&!t.ignored&&!t.isGroup){s=t;return}if(t.isGroup){let e=ft(t,a);e===null?c(i(t,n)):s=e}else{let e=i(t,!1);if(e!==null)c(e);else{let e=dt(t);e?.isGroup?c(i(e,n)):n&&c(i(t,!0))}}}}return c(e),s}function ut(e,t){let n=e.siblings,r=n.length,{index:i}=e;return t?n[(i-1+r)%r]:i===0?null:n[i-1]}function dt(e){return e.parent}function ft(e,t={}){let{reverse:n=!1}=t,{children:r}=e;if(r){let{length:e}=r,i=n?e-1:0,a=n?-1:e,o=n?-1:1;for(let e=i;e!==a;e+=o){let n=r[e];if(!n.disabled&&!n.ignored)if(n.isGroup){let e=ft(n,t);if(e!==null)return e}else return n}}return null}var pt={getChild(){return this.ignored?null:ft(this)},getParent(){let{parent:e}=this;return e?.isGroup?e.getParent():e},getNext(e={}){return lt(this,`next`,e)},getPrev(e={}){return lt(this,`prev`,e)}};function mt(e,t){let n=t?new Set(t):void 0,r=[];function i(e){e.forEach(e=>{r.push(e),!(e.isLeaf||!e.children||e.ignored)&&(e.isGroup||n===void 0||n.has(e.key))&&i(e.children)})}return i(e),r}function ht(e,t){let n=e.key;for(;t;){if(t.key===n)return!0;t=t.parent}return!1}function gt(e,t,n,r,i,a=null,o=0){let s=[];return e.forEach((c,l)=>{var u;let d=Object.create(r);if(d.rawNode=c,d.siblings=s,d.level=o,d.index=l,d.isFirstChild=l===0,d.isLastChild=l+1===e.length,d.parent=a,!d.ignored){let e=i(c);Array.isArray(e)&&(d.children=gt(e,t,n,r,i,d,o+1))}s.push(d),t.set(d.key,d),n.has(o)||n.set(o,[]),(u=n.get(o))==null||u.push(d)}),s}function _t(e,t={}){let n=new Map,r=new Map,{getDisabled:i=Ke,getIgnored:a=We,getIsGroup:o=Qe,getKey:s=Ue}=t,c=t.getChildren??He,l=t.ignoreEmptyChildren?e=>{let t=c(e);return Array.isArray(t)?t.length?t:null:t}:c,u=gt(e,n,r,Object.assign({get key(){return s(this.rawNode)},get disabled(){return i(this.rawNode)},get isGroup(){return o(this.rawNode)},get isLeaf(){return Ve(this.rawNode,l)},get shallowLoaded(){return Ge(this.rawNode,l)},get ignored(){return a(this.rawNode)},contains(e){return ht(this,e)}},pt),l);function d(e){if(e==null)return null;let t=n.get(e);return t&&!t.isGroup&&!t.ignored?t:null}function f(e){if(e==null)return null;let t=n.get(e);return t&&!t.ignored?t:null}function p(e,t){let n=f(e);return n?n.getPrev(t):null}function m(e,t){let n=f(e);return n?n.getNext(t):null}function h(e){let t=f(e);return t?t.getParent():null}function g(e){let t=f(e);return t?t.getChild():null}let _={treeNodes:u,treeNodeMap:n,levelTreeNodeMap:r,maxLevel:Math.max(...r.keys()),getChildren:l,getFlattenedNodes(e){return mt(u,e)},getNode:d,getPrev:p,getNext:m,getParent:h,getChild:g,getFirstAvailableNode(){return st(u)},getPath(e,t={}){return ot(e,t,_)},getCheckedKeys(e,t={}){let{cascade:n=!0,leafOnly:r=!1,checkStrategy:i=`all`,allowNotLoaded:a=!1}=t;return it({checkedKeys:Je(e),indeterminateKeys:Ye(e),cascade:n,leafOnly:r,checkStrategy:i,allowNotLoaded:a},_)},check(e,t,n={}){let{cascade:r=!0,leafOnly:i=!1,checkStrategy:a=`all`,allowNotLoaded:o=!1}=n;return it({checkedKeys:Je(t),indeterminateKeys:Ye(t),keysToCheck:e==null?[]:Le(e),cascade:r,leafOnly:i,checkStrategy:a,allowNotLoaded:o},_)},uncheck(e,t,n={}){let{cascade:r=!0,leafOnly:i=!1,checkStrategy:a=`all`,allowNotLoaded:o=!1}=n;return it({checkedKeys:Je(t),indeterminateKeys:Ye(t),keysToUncheck:e==null?[]:Le(e),cascade:r,leafOnly:i,checkStrategy:a,allowNotLoaded:o},_)},getNonLeafKeys(e={}){return Be(u,e)}};return _}var vt=I(`empty`,`
 display: flex;
 flex-direction: column;
 align-items: center;
 font-size: var(--n-font-size);
`,[k(`icon`,`
 width: var(--n-icon-size);
 height: var(--n-icon-size);
 font-size: var(--n-icon-size);
 line-height: var(--n-icon-size);
 color: var(--n-icon-color);
 transition:
 color .3s var(--n-bezier);
 `,[O(`+`,[k(`description`,`
 margin-top: 8px;
 `)])]),k(`description`,`
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `),k(`extra`,`
 text-align: center;
 transition: color .3s var(--n-bezier);
 margin-top: 12px;
 color: var(--n-extra-text-color);
 `)]),yt=Object.assign(Object.assign({},v.props),{description:String,showDescription:{type:Boolean,default:!0},showIcon:{type:Boolean,default:!0},size:{type:String,default:`medium`},renderIcon:Function}),bt=g({name:`Empty`,props:yt,slots:Object,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:r,mergedComponentPropsRef:i}=_(e),a=v(`Empty`,`-empty`,vt,he,e,t),{localeRef:o}=de(`Empty`),s=P(()=>e.description??i?.value?.Empty?.description),c=P(()=>i?.value?.Empty?.renderIcon||(()=>n(Fe,null))),l=P(()=>{let{size:t}=e,{common:{cubicBezierEaseInOut:n},self:{[L(`iconSize`,t)]:r,[L(`fontSize`,t)]:i,textColor:o,iconColor:s,extraTextColor:c}}=a.value;return{"--n-icon-size":r,"--n-font-size":i,"--n-bezier":n,"--n-text-color":o,"--n-icon-color":s,"--n-extra-text-color":c}}),u=r?ne(`empty`,P(()=>{let t=``,{size:n}=e;return t+=n[0],t}),l,e):void 0;return{mergedClsPrefix:t,mergedRenderIcon:c,localizedDescription:P(()=>s.value||o.value.description),cssVars:r?void 0:l,themeClass:u?.themeClass,onRender:u?.onRender}},render(){let{$slots:e,mergedClsPrefix:t,onRender:r}=this;return r?.(),n(`div`,{class:[`${t}-empty`,this.themeClass],style:this.cssVars},this.showIcon?n(`div`,{class:`${t}-empty__icon`},e.icon?e.icon():n(b,{clsPrefix:t},{default:this.mergedRenderIcon})):null,this.showDescription?n(`div`,{class:`${t}-empty__description`},e.default?e.default():this.localizedDescription):null,e.extra?n(`div`,{class:`${t}-empty__extra`},e.extra()):null)}}),xt=g({name:`NBaseSelectGroupHeader`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){let{renderLabelRef:e,renderOptionRef:t,labelFieldRef:n,nodePropsRef:r}=x(re);return{labelField:n,nodeProps:r,renderLabel:e,renderOption:t}},render(){let{clsPrefix:e,renderLabel:t,renderOption:r,nodeProps:i,tmNode:{rawNode:a}}=this,o=i?.(a),s=t?t(a,!1):Z(a[this.labelField],a,!1),c=n(`div`,Object.assign({},o,{class:[`${e}-base-select-group-header`,o?.class]}),s);return a.render?a.render({node:c,option:a}):r?r({node:c,option:a,selected:!1}):c}});function St(e,t){return n(D,{name:`fade-in-scale-up-transition`},{default:()=>e?n(b,{clsPrefix:t,class:`${t}-base-select-option__check`},{default:()=>n(Pe)}):null})}var Ct=g({name:`NBaseSelectOption`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(e){let{valueRef:t,pendingTmNodeRef:n,multipleRef:r,valueSetRef:i,renderLabelRef:a,renderOptionRef:o,labelFieldRef:s,valueFieldRef:c,showCheckmarkRef:l,nodePropsRef:u,handleOptionClick:d,handleOptionMouseEnter:f}=x(re),p=V(()=>{let{value:t}=n;return t?e.tmNode.key===t.key:!1});function m(t){let{tmNode:n}=e;n.disabled||d(t,n)}function h(t){let{tmNode:n}=e;n.disabled||f(t,n)}function g(t){let{tmNode:n}=e,{value:r}=p;n.disabled||r||f(t,n)}return{multiple:r,isGrouped:V(()=>{let{tmNode:t}=e,{parent:n}=t;return n&&n.rawNode.type===`group`}),showCheckmark:l,nodeProps:u,isPending:p,isSelected:V(()=>{let{value:n}=t,{value:a}=r;if(n===null)return!1;let o=e.tmNode.rawNode[c.value];if(a){let{value:e}=i;return e.has(o)}return n===o}),labelField:s,renderLabel:a,renderOption:o,handleMouseMove:g,handleMouseEnter:h,handleClick:m}},render(){let{clsPrefix:e,tmNode:{rawNode:t},isSelected:r,isPending:i,isGrouped:a,showCheckmark:o,nodeProps:s,renderOption:c,renderLabel:l,handleClick:u,handleMouseEnter:d,handleMouseMove:f}=this,p=St(r,e),m=l?[l(t,r),o&&p]:[Z(t[this.labelField],t,r),o&&p],h=s?.(t),g=n(`div`,Object.assign({},h,{class:[`${e}-base-select-option`,t.class,h?.class,{[`${e}-base-select-option--disabled`]:t.disabled,[`${e}-base-select-option--selected`]:r,[`${e}-base-select-option--grouped`]:a,[`${e}-base-select-option--pending`]:i,[`${e}-base-select-option--show-checkmark`]:o}],style:[h?.style||``,t.style||``],onClick:Ne([u,h?.onClick]),onMouseenter:Ne([d,h?.onMouseenter]),onMousemove:Ne([f,h?.onMousemove])}),n(`div`,{class:`${e}-base-select-option__content`},m));return t.render?t.render({node:g,option:t,selected:r}):c?c({node:g,option:t,selected:r}):g}}),wt=I(`base-select-menu`,`
 line-height: 1.5;
 outline: none;
 z-index: 0;
 position: relative;
 border-radius: var(--n-border-radius);
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-color);
`,[I(`scrollbar`,`
 max-height: var(--n-height);
 `),I(`virtual-list`,`
 max-height: var(--n-height);
 `),I(`base-select-option`,`
 min-height: var(--n-option-height);
 font-size: var(--n-option-font-size);
 display: flex;
 align-items: center;
 `,[k(`content`,`
 z-index: 1;
 white-space: nowrap;
 text-overflow: ellipsis;
 overflow: hidden;
 `)]),I(`base-select-group-header`,`
 min-height: var(--n-option-height);
 font-size: .93em;
 display: flex;
 align-items: center;
 `),I(`base-select-menu-option-wrapper`,`
 position: relative;
 width: 100%;
 `),k(`loading, empty`,`
 display: flex;
 padding: 12px 32px;
 flex: 1;
 justify-content: center;
 `),k(`loading`,`
 color: var(--n-loading-color);
 font-size: var(--n-loading-size);
 `),k(`header`,`
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `),k(`action`,`
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 border-top: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `),I(`base-select-group-header`,`
 position: relative;
 cursor: default;
 padding: var(--n-option-padding);
 color: var(--n-group-header-text-color);
 `),I(`base-select-option`,`
 cursor: pointer;
 position: relative;
 padding: var(--n-option-padding);
 transition:
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 box-sizing: border-box;
 color: var(--n-option-text-color);
 opacity: 1;
 `,[j(`show-checkmark`,`
 padding-right: calc(var(--n-option-padding-right) + 20px);
 `),O(`&::before`,`
 content: "";
 position: absolute;
 left: 4px;
 right: 4px;
 top: 0;
 bottom: 0;
 border-radius: var(--n-border-radius);
 transition: background-color .3s var(--n-bezier);
 `),O(`&:active`,`
 color: var(--n-option-text-color-pressed);
 `),j(`grouped`,`
 padding-left: calc(var(--n-option-padding-left) * 1.5);
 `),j(`pending`,[O(`&::before`,`
 background-color: var(--n-option-color-pending);
 `)]),j(`selected`,`
 color: var(--n-option-text-color-active);
 `,[O(`&::before`,`
 background-color: var(--n-option-color-active);
 `),j(`pending`,[O(`&::before`,`
 background-color: var(--n-option-color-active-pending);
 `)])]),j(`disabled`,`
 cursor: not-allowed;
 `,[B(`selected`,`
 color: var(--n-option-text-color-disabled);
 `),j(`selected`,`
 opacity: var(--n-option-opacity-disabled);
 `)]),k(`check`,`
 font-size: 16px;
 position: absolute;
 right: calc(var(--n-option-padding-right) - 4px);
 top: calc(50% - 7px);
 color: var(--n-option-check-color);
 transition: color .3s var(--n-bezier);
 `,[X({enterScale:`0.5`})])])]),Tt=g({name:`InternalSelectMenu`,props:Object.assign(Object.assign({},v.props),{clsPrefix:{type:String,required:!0},scrollable:{type:Boolean,default:!0},treeMate:{type:Object,required:!0},multiple:Boolean,size:{type:String,default:`medium`},value:{type:[String,Number,Array],default:null},autoPending:Boolean,virtualScroll:{type:Boolean,default:!0},show:{type:Boolean,default:!0},labelField:{type:String,default:`label`},valueField:{type:String,default:`value`},loading:Boolean,focusable:Boolean,renderLabel:Function,renderOption:Function,nodeProps:Function,showCheckmark:{type:Boolean,default:!0},onMousedown:Function,onScroll:Function,onFocus:Function,onBlur:Function,onKeyup:Function,onKeydown:Function,onTabOut:Function,onMouseenter:Function,onMouseleave:Function,onResize:Function,resetMenuOnOptionsChange:{type:Boolean,default:!0},inlineThemeDisabled:Boolean,scrollbarProps:Object,onToggle:Function}),setup(t){let{mergedClsPrefixRef:n,mergedRtlRef:r,mergedComponentPropsRef:i}=_(t),a=u(`InternalSelectMenu`,r,n),o=v(`InternalSelectMenu`,`-internal-select-menu`,wt,pe,t,R(t,`clsPrefix`)),s=A(null),c=A(null),l=A(null),f=P(()=>t.treeMate.getFlattenedNodes()),p=P(()=>$e(f.value)),m=A(null);function h(){let{treeMate:e}=t,n=null,{value:r}=t;r===null?n=e.getFirstAvailableNode():(n=t.multiple?e.getNode((r||[])[(r||[]).length-1]):e.getNode(r),(!n||n.disabled)&&(n=e.getFirstAvailableNode())),W(n||null)}function g(){let{value:e}=m;e&&!t.treeMate.getNode(e.key)&&(m.value=null)}let b;N(()=>t.show,e=>{e?b=N(()=>t.treeMate,()=>{t.resetMenuOnOptionsChange?(t.autoPending?h():g(),y(G)):g()},{immediate:!0}):b?.()},{immediate:!0}),d(()=>{b?.()});let x=P(()=>z(o.value.self[L(`optionHeight`,t.size)])),S=P(()=>M(o.value.self[L(`padding`,t.size)])),C=P(()=>t.multiple&&Array.isArray(t.value)?new Set(t.value):new Set),T=P(()=>{let e=f.value;return e&&e.length===0}),E=P(()=>i?.value?.Select?.renderEmpty);function D(e){let{onToggle:n}=t;n&&n(e)}function O(e){let{onScroll:n}=t;n&&n(e)}function k(e){var t;(t=l.value)==null||t.sync(),O(e)}function j(){var e;(e=l.value)==null||e.sync()}function F(){let{value:e}=m;return e||null}function I(e,t){t.disabled||W(t,!1)}function ee(e,t){t.disabled||D(t)}function B(e){var n;_e(e,`action`)||(n=t.onKeyup)==null||n.call(t,e)}function V(e){var n;_e(e,`action`)||(n=t.onKeydown)==null||n.call(t,e)}function H(e){var n;(n=t.onMousedown)==null||n.call(t,e),!t.focusable&&e.preventDefault()}function te(){let{value:e}=m;e&&W(e.getNext({loop:!0}),!0)}function U(){let{value:e}=m;e&&W(e.getPrev({loop:!0}),!0)}function W(e,t=!1){m.value=e,t&&G()}function G(){var e,n;let r=m.value;if(!r)return;let i=p.value(r.key);i!==null&&(t.virtualScroll?(e=c.value)==null||e.scrollTo({index:i}):(n=l.value)==null||n.scrollTo({index:i,elSize:x.value}))}function K(e){var n;s.value?.contains(e.target)&&((n=t.onFocus)==null||n.call(t,e))}function q(e){var n;s.value?.contains(e.relatedTarget)||(n=t.onBlur)==null||n.call(t,e)}e(re,{handleOptionMouseEnter:I,handleOptionClick:ee,valueSetRef:C,pendingTmNodeRef:m,nodePropsRef:R(t,`nodeProps`),showCheckmarkRef:R(t,`showCheckmark`),multipleRef:R(t,`multiple`),valueRef:R(t,`value`),renderLabelRef:R(t,`renderLabel`),renderOptionRef:R(t,`renderOption`),labelFieldRef:R(t,`labelField`),valueFieldRef:R(t,`valueField`)}),e(ie,s),w(()=>{let{value:e}=l;e&&e.sync()});let ae=P(()=>{let{size:e}=t,{common:{cubicBezierEaseInOut:n},self:{height:r,borderRadius:i,color:a,groupHeaderTextColor:s,actionDividerColor:c,optionTextColorPressed:l,optionTextColor:u,optionTextColorDisabled:d,optionTextColorActive:f,optionOpacityDisabled:p,optionCheckColor:m,actionTextColor:h,optionColorPending:g,optionColorActive:_,loadingColor:v,loadingSize:y,optionColorActivePending:b,[L(`optionFontSize`,e)]:x,[L(`optionHeight`,e)]:S,[L(`optionPadding`,e)]:C}}=o.value;return{"--n-height":r,"--n-action-divider-color":c,"--n-action-text-color":h,"--n-bezier":n,"--n-border-radius":i,"--n-color":a,"--n-option-font-size":x,"--n-group-header-text-color":s,"--n-option-check-color":m,"--n-option-color-pending":g,"--n-option-color-active":_,"--n-option-color-active-pending":b,"--n-option-height":S,"--n-option-opacity-disabled":p,"--n-option-text-color":u,"--n-option-text-color-active":f,"--n-option-text-color-disabled":d,"--n-option-text-color-pressed":l,"--n-option-padding":C,"--n-option-padding-left":M(C,`left`),"--n-option-padding-right":M(C,`right`),"--n-loading-color":v,"--n-loading-size":y}}),{inlineThemeDisabled:J}=t,oe=J?ne(`internal-select-menu`,P(()=>t.size[0]),ae,t):void 0,se={selfRef:s,next:te,prev:U,getPendingTmNode:F};return je(s,t.onResize),Object.assign({mergedTheme:o,mergedClsPrefix:n,rtlEnabled:a,virtualListRef:c,scrollbarRef:l,itemSize:x,padding:S,flattenedNodes:f,empty:T,mergedRenderEmpty:E,virtualListContainer(){let{value:e}=c;return e?.listElRef},virtualListContent(){let{value:e}=c;return e?.itemsElRef},doScroll:O,handleFocusin:K,handleFocusout:q,handleKeyUp:B,handleKeyDown:V,handleMouseDown:H,handleVirtualListResize:j,handleVirtualListScroll:k,cssVars:J?void 0:ae,themeClass:oe?.themeClass,onRender:oe?.onRender},se)},render(){let{$slots:e,virtualScroll:r,clsPrefix:i,mergedTheme:a,themeClass:o,onRender:s}=this;return s?.(),n(`div`,{ref:`selfRef`,tabindex:this.focusable?0:-1,class:[`${i}-base-select-menu`,`${i}-base-select-menu--${this.size}-size`,this.rtlEnabled&&`${i}-base-select-menu--rtl`,o,this.multiple&&`${i}-base-select-menu--multiple`],style:this.cssVars,onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onKeyup:this.handleKeyUp,onKeydown:this.handleKeyDown,onMousedown:this.handleMouseDown,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},p(e.header,e=>e&&n(`div`,{class:`${i}-base-select-menu__header`,"data-header":!0,key:`header`},e)),this.loading?n(`div`,{class:`${i}-base-select-menu__loading`},n(t,{clsPrefix:i,strokeWidth:20})):this.empty?n(`div`,{class:`${i}-base-select-menu__empty`,"data-empty":!0},F(e.empty,()=>[this.mergedRenderEmpty?.call(this)||n(bt,{theme:a.peers.Empty,themeOverrides:a.peerOverrides.Empty,size:this.size})])):n(U,Object.assign({ref:`scrollbarRef`,theme:a.peers.Scrollbar,themeOverrides:a.peerOverrides.Scrollbar,scrollable:this.scrollable,container:r?this.virtualListContainer:void 0,content:r?this.virtualListContent:void 0,onScroll:r?void 0:this.doScroll},this.scrollbarProps),{default:()=>r?n(Oe,{ref:`virtualListRef`,class:`${i}-virtual-list`,items:this.flattenedNodes,itemSize:this.itemSize,showScrollbar:!1,paddingTop:this.padding.top,paddingBottom:this.padding.bottom,onResize:this.handleVirtualListResize,onScroll:this.handleVirtualListScroll,itemResizable:!0},{default:({item:e})=>e.isGroup?n(xt,{key:e.key,clsPrefix:i,tmNode:e}):e.ignored?null:n(Ct,{clsPrefix:i,key:e.key,tmNode:e})}):n(`div`,{class:`${i}-base-select-menu-option-wrapper`,style:{paddingTop:this.padding.top,paddingBottom:this.padding.bottom}},this.flattenedNodes.map(e=>e.isGroup?n(xt,{key:e.key,clsPrefix:i,tmNode:e}):n(Ct,{clsPrefix:i,key:e.key,tmNode:e})))}),p(e.action,e=>e&&[n(`div`,{class:`${i}-base-select-menu__action`,"data-action":!0,key:`action`},e),n(Ie,{onFocus:this.onTabOut,key:`focus-detector`})]))}}),Et=O([I(`base-selection`,`
 --n-padding-single: var(--n-padding-single-top) var(--n-padding-single-right) var(--n-padding-single-bottom) var(--n-padding-single-left);
 --n-padding-multiple: var(--n-padding-multiple-top) var(--n-padding-multiple-right) var(--n-padding-multiple-bottom) var(--n-padding-multiple-left);
 position: relative;
 z-index: auto;
 box-shadow: none;
 width: 100%;
 max-width: 100%;
 display: inline-block;
 vertical-align: bottom;
 border-radius: var(--n-border-radius);
 min-height: var(--n-height);
 line-height: 1.5;
 font-size: var(--n-font-size);
 `,[I(`base-loading`,`
 color: var(--n-loading-color);
 `),I(`base-selection-tags`,`min-height: var(--n-height);`),k(`border, state-border`,`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 pointer-events: none;
 border: var(--n-border);
 border-radius: inherit;
 transition:
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `),k(`state-border`,`
 z-index: 1;
 border-color: #0000;
 `),I(`base-suffix`,`
 cursor: pointer;
 position: absolute;
 top: 50%;
 transform: translateY(-50%);
 right: 10px;
 `,[k(`arrow`,`
 font-size: var(--n-arrow-size);
 color: var(--n-arrow-color);
 transition: color .3s var(--n-bezier);
 `)]),I(`base-selection-overlay`,`
 display: flex;
 align-items: center;
 white-space: nowrap;
 pointer-events: none;
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 padding: var(--n-padding-single);
 transition: color .3s var(--n-bezier);
 `,[k(`wrapper`,`
 flex-basis: 0;
 flex-grow: 1;
 overflow: hidden;
 text-overflow: ellipsis;
 `)]),I(`base-selection-placeholder`,`
 color: var(--n-placeholder-color);
 `,[k(`inner`,`
 max-width: 100%;
 overflow: hidden;
 `)]),I(`base-selection-tags`,`
 cursor: pointer;
 outline: none;
 box-sizing: border-box;
 position: relative;
 z-index: auto;
 display: flex;
 padding: var(--n-padding-multiple);
 flex-wrap: wrap;
 align-items: center;
 width: 100%;
 vertical-align: bottom;
 background-color: var(--n-color);
 border-radius: inherit;
 transition:
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `),I(`base-selection-label`,`
 height: var(--n-height);
 display: inline-flex;
 width: 100%;
 vertical-align: bottom;
 cursor: pointer;
 outline: none;
 z-index: auto;
 box-sizing: border-box;
 position: relative;
 transition:
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 border-radius: inherit;
 background-color: var(--n-color);
 align-items: center;
 `,[I(`base-selection-input`,`
 font-size: inherit;
 line-height: inherit;
 outline: none;
 cursor: pointer;
 box-sizing: border-box;
 border:none;
 width: 100%;
 padding: var(--n-padding-single);
 background-color: #0000;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 caret-color: var(--n-caret-color);
 `,[k(`content`,`
 text-overflow: ellipsis;
 overflow: hidden;
 white-space: nowrap; 
 `)]),k(`render-label`,`
 color: var(--n-text-color);
 `)]),B(`disabled`,[O(`&:hover`,[k(`state-border`,`
 box-shadow: var(--n-box-shadow-hover);
 border: var(--n-border-hover);
 `)]),j(`focus`,[k(`state-border`,`
 box-shadow: var(--n-box-shadow-focus);
 border: var(--n-border-focus);
 `)]),j(`active`,[k(`state-border`,`
 box-shadow: var(--n-box-shadow-active);
 border: var(--n-border-active);
 `),I(`base-selection-label`,`background-color: var(--n-color-active);`),I(`base-selection-tags`,`background-color: var(--n-color-active);`)])]),j(`disabled`,`cursor: not-allowed;`,[k(`arrow`,`
 color: var(--n-arrow-color-disabled);
 `),I(`base-selection-label`,`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `,[I(`base-selection-input`,`
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 `),k(`render-label`,`
 color: var(--n-text-color-disabled);
 `)]),I(`base-selection-tags`,`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `),I(`base-selection-placeholder`,`
 cursor: not-allowed;
 color: var(--n-placeholder-color-disabled);
 `)]),I(`base-selection-input-tag`,`
 height: calc(var(--n-height) - 6px);
 line-height: calc(var(--n-height) - 6px);
 outline: none;
 display: none;
 position: relative;
 margin-bottom: 3px;
 max-width: 100%;
 vertical-align: bottom;
 `,[k(`input`,`
 font-size: inherit;
 font-family: inherit;
 min-width: 1px;
 padding: 0;
 background-color: #0000;
 outline: none;
 border: none;
 max-width: 100%;
 overflow: hidden;
 width: 1em;
 line-height: inherit;
 cursor: pointer;
 color: var(--n-text-color);
 caret-color: var(--n-caret-color);
 `),k(`mirror`,`
 position: absolute;
 left: 0;
 top: 0;
 white-space: pre;
 visibility: hidden;
 user-select: none;
 -webkit-user-select: none;
 opacity: 0;
 `)]),[`warning`,`error`].map(e=>j(`${e}-status`,[k(`state-border`,`border: var(--n-border-${e});`),B(`disabled`,[O(`&:hover`,[k(`state-border`,`
 box-shadow: var(--n-box-shadow-hover-${e});
 border: var(--n-border-hover-${e});
 `)]),j(`active`,[k(`state-border`,`
 box-shadow: var(--n-box-shadow-active-${e});
 border: var(--n-border-active-${e});
 `),I(`base-selection-label`,`background-color: var(--n-color-active-${e});`),I(`base-selection-tags`,`background-color: var(--n-color-active-${e});`)]),j(`focus`,[k(`state-border`,`
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `)])])]))]),I(`base-selection-popover`,`
 margin-bottom: -3px;
 display: flex;
 flex-wrap: wrap;
 margin-right: -8px;
 `),I(`base-selection-tag-wrapper`,`
 max-width: 100%;
 display: inline-flex;
 padding: 0 7px 3px 0;
 `,[O(`&:last-child`,`padding-right: 0;`),I(`tag`,`
 font-size: 14px;
 max-width: 100%;
 `,[k(`content`,`
 line-height: 1.25;
 text-overflow: ellipsis;
 overflow: hidden;
 `)])])]),Dt=g({name:`InternalSelection`,props:Object.assign(Object.assign({},v.props),{clsPrefix:{type:String,required:!0},bordered:{type:Boolean,default:void 0},active:Boolean,pattern:{type:String,default:``},placeholder:String,selectedOption:{type:Object,default:null},selectedOptions:{type:Array,default:null},labelField:{type:String,default:`label`},valueField:{type:String,default:`value`},multiple:Boolean,filterable:Boolean,clearable:Boolean,disabled:Boolean,size:{type:String,default:`medium`},loading:Boolean,autofocus:Boolean,showArrow:{type:Boolean,default:!0},inputProps:Object,focused:Boolean,renderTag:Function,onKeydown:Function,onClick:Function,onBlur:Function,onFocus:Function,onDeleteOption:Function,maxTagCount:[String,Number],ellipsisTagPopoverProps:Object,onClear:Function,onPatternInput:Function,onPatternFocus:Function,onPatternBlur:Function,renderLabel:Function,status:String,inlineThemeDisabled:Boolean,ignoreComposition:{type:Boolean,default:!0},onResize:Function}),setup(e){let{mergedClsPrefixRef:t,mergedRtlRef:n}=_(e),r=u(`InternalSelection`,n,t),i=A(null),a=A(null),o=A(null),s=A(null),c=A(null),l=A(null),d=A(null),f=A(null),p=A(null),m=A(null),h=A(!1),g=A(!1),b=A(!1),x=v(`InternalSelection`,`-internal-selection`,Et,me,e,R(e,`clsPrefix`)),S=P(()=>e.clearable&&!e.disabled&&(b.value||e.active)),C=P(()=>e.selectedOption?e.renderTag?e.renderTag({option:e.selectedOption,handleClose:()=>{}}):e.renderLabel?e.renderLabel(e.selectedOption,!0):Z(e.selectedOption[e.labelField],e.selectedOption,!0):e.placeholder),T=P(()=>{let t=e.selectedOption;if(t)return t[e.labelField]}),D=P(()=>e.multiple?!!(Array.isArray(e.selectedOptions)&&e.selectedOptions.length):e.selectedOption!==null);function O(){var t;let{value:n}=i;if(n){let{value:r}=a;r&&(r.style.width=`${n.offsetWidth}px`,e.maxTagCount!==`responsive`&&((t=p.value)==null||t.sync({showAllItemsBeforeCalculate:!1})))}}function k(){let{value:e}=m;e&&(e.style.display=`none`)}function j(){let{value:e}=m;e&&(e.style.display=`inline-block`)}N(R(e,`active`),e=>{e||k()}),N(R(e,`pattern`),()=>{e.multiple&&y(O)});function F(t){let{onFocus:n}=e;n&&n(t)}function I(t){let{onBlur:n}=e;n&&n(t)}function z(t){let{onDeleteOption:n}=e;n&&n(t)}function ee(t){let{onClear:n}=e;n&&n(t)}function B(t){let{onPatternInput:n}=e;n&&n(t)}function V(e){(!e.relatedTarget||!o.value?.contains(e.relatedTarget))&&F(e)}function H(e){o.value?.contains(e.relatedTarget)||I(e)}function te(e){ee(e)}function U(){b.value=!0}function re(){b.value=!1}function W(t){!e.active||!e.filterable||t.target!==a.value&&t.preventDefault()}function ie(e){z(e)}let G=A(!1);function K(t){if(t.key===`Backspace`&&!G.value&&!e.pattern.length){let{selectedOptions:t}=e;t?.length&&ie(t[t.length-1])}}let q=null;function ae(t){let{value:n}=i;n&&(n.textContent=t.target.value,O()),e.ignoreComposition&&G.value?q=t:B(t)}function J(){G.value=!0}function oe(){G.value=!1,e.ignoreComposition&&B(q),q=null}function se(t){var n;g.value=!0,(n=e.onPatternFocus)==null||n.call(e,t)}function ce(t){var n;g.value=!1,(n=e.onPatternBlur)==null||n.call(e,t)}function Y(){var t,n;if(e.filterable)g.value=!1,(t=l.value)==null||t.blur(),(n=a.value)==null||n.blur();else if(e.multiple){let{value:e}=s;e?.blur()}else{let{value:e}=c;e?.blur()}}function le(){var t,n,r;e.filterable?(g.value=!1,(t=l.value)==null||t.focus()):e.multiple?(n=s.value)==null||n.focus():(r=c.value)==null||r.focus()}function ue(){let{value:e}=a;e&&(j(),e.focus())}function X(){let{value:e}=a;e&&e.blur()}function Q(e){let{value:t}=d;t&&t.setTextContent(`+${e}`)}function de(){let{value:e}=f;return e}function fe(){return a.value}let pe=null;function he(){pe!==null&&window.clearTimeout(pe)}function ge(){e.active||(he(),pe=window.setTimeout(()=>{D.value&&(h.value=!0)},100))}function _e(){he()}function ve(e){e||(he(),h.value=!1)}N(D,e=>{e||(h.value=!1)}),w(()=>{E(()=>{let t=l.value;t&&(e.disabled?t.removeAttribute(`tabindex`):t.tabIndex=g.value?-1:0)})}),je(o,e.onResize);let{inlineThemeDisabled:ye}=e,be=P(()=>{let{size:t}=e,{common:{cubicBezierEaseInOut:n},self:{fontWeight:r,borderRadius:i,color:a,placeholderColor:o,textColor:s,paddingSingle:c,paddingMultiple:l,caretColor:u,colorDisabled:d,textColorDisabled:f,placeholderColorDisabled:p,colorActive:m,boxShadowFocus:h,boxShadowActive:g,boxShadowHover:_,border:v,borderFocus:y,borderHover:b,borderActive:S,arrowColor:C,arrowColorDisabled:w,loadingColor:T,colorActiveWarning:E,boxShadowFocusWarning:D,boxShadowActiveWarning:O,boxShadowHoverWarning:k,borderWarning:A,borderFocusWarning:j,borderHoverWarning:N,borderActiveWarning:P,colorActiveError:F,boxShadowFocusError:I,boxShadowActiveError:R,boxShadowHoverError:z,borderError:ee,borderFocusError:B,borderHoverError:V,borderActiveError:H,clearColor:te,clearColorHover:U,clearColorPressed:ne,clearSize:re,arrowSize:W,[L(`height`,t)]:ie,[L(`fontSize`,t)]:G}}=x.value,K=M(c),q=M(l);return{"--n-bezier":n,"--n-border":v,"--n-border-active":S,"--n-border-focus":y,"--n-border-hover":b,"--n-border-radius":i,"--n-box-shadow-active":g,"--n-box-shadow-focus":h,"--n-box-shadow-hover":_,"--n-caret-color":u,"--n-color":a,"--n-color-active":m,"--n-color-disabled":d,"--n-font-size":G,"--n-height":ie,"--n-padding-single-top":K.top,"--n-padding-multiple-top":q.top,"--n-padding-single-right":K.right,"--n-padding-multiple-right":q.right,"--n-padding-single-left":K.left,"--n-padding-multiple-left":q.left,"--n-padding-single-bottom":K.bottom,"--n-padding-multiple-bottom":q.bottom,"--n-placeholder-color":o,"--n-placeholder-color-disabled":p,"--n-text-color":s,"--n-text-color-disabled":f,"--n-arrow-color":C,"--n-arrow-color-disabled":w,"--n-loading-color":T,"--n-color-active-warning":E,"--n-box-shadow-focus-warning":D,"--n-box-shadow-active-warning":O,"--n-box-shadow-hover-warning":k,"--n-border-warning":A,"--n-border-focus-warning":j,"--n-border-hover-warning":N,"--n-border-active-warning":P,"--n-color-active-error":F,"--n-box-shadow-focus-error":I,"--n-box-shadow-active-error":R,"--n-box-shadow-hover-error":z,"--n-border-error":ee,"--n-border-focus-error":B,"--n-border-hover-error":V,"--n-border-active-error":H,"--n-clear-size":re,"--n-clear-color":te,"--n-clear-color-hover":U,"--n-clear-color-pressed":ne,"--n-arrow-size":W,"--n-font-weight":r}}),xe=ye?ne(`internal-selection`,P(()=>e.size[0]),be,e):void 0;return{mergedTheme:x,mergedClearable:S,mergedClsPrefix:t,rtlEnabled:r,patternInputFocused:g,filterablePlaceholder:C,label:T,selected:D,showTagsPanel:h,isComposing:G,counterRef:d,counterWrapperRef:f,patternInputMirrorRef:i,patternInputRef:a,selfRef:o,multipleElRef:s,singleElRef:c,patternInputWrapperRef:l,overflowRef:p,inputTagElRef:m,handleMouseDown:W,handleFocusin:V,handleClear:te,handleMouseEnter:U,handleMouseLeave:re,handleDeleteOption:ie,handlePatternKeyDown:K,handlePatternInputInput:ae,handlePatternInputBlur:ce,handlePatternInputFocus:se,handleMouseEnterCounter:ge,handleMouseLeaveCounter:_e,handleFocusout:H,handleCompositionEnd:oe,handleCompositionStart:J,onPopoverUpdateShow:ve,focus:le,focusInput:ue,blur:Y,blurInput:X,updateCounter:Q,getCounter:de,getTail:fe,renderLabel:e.renderLabel,cssVars:ye?void 0:be,themeClass:xe?.themeClass,onRender:xe?.onRender}},render(){let{status:e,multiple:t,size:r,disabled:i,filterable:a,maxTagCount:s,bordered:c,clsPrefix:l,ellipsisTagPopoverProps:u,onRender:d,renderTag:f,renderLabel:p}=this;d?.();let h=s===`responsive`,g=typeof s==`number`,_=h||g,v=n(m,null,{default:()=>n(fe,{clsPrefix:l,loading:this.loading,showArrow:this.showArrow,showClear:this.mergedClearable&&this.selected,onClear:this.handleClear},{default:()=>{var e;return(e=this.$slots).arrow?.call(e)}})}),y;if(t){let{labelField:e}=this,t=t=>n(`div`,{class:`${l}-base-selection-tag-wrapper`,key:t.value},f?f({option:t,handleClose:()=>{this.handleDeleteOption(t)}}):n(Q,{size:r,closable:!t.disabled,disabled:i,onClose:()=>{this.handleDeleteOption(t)},internalCloseIsButtonTag:!1,internalCloseFocusable:!1},{default:()=>p?p(t,!0):Z(t[e],t,!0)})),c=()=>(g?this.selectedOptions.slice(0,s):this.selectedOptions).map(t),d=a?n(`div`,{class:`${l}-base-selection-input-tag`,ref:`inputTagElRef`,key:`__input-tag__`},n(`input`,Object.assign({},this.inputProps,{ref:`patternInputRef`,tabindex:-1,disabled:i,value:this.pattern,autofocus:this.autofocus,class:`${l}-base-selection-input-tag__input`,onBlur:this.handlePatternInputBlur,onFocus:this.handlePatternInputFocus,onKeydown:this.handlePatternKeyDown,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd})),n(`span`,{ref:`patternInputMirrorRef`,class:`${l}-base-selection-input-tag__mirror`},this.pattern)):null,m=h?()=>n(`div`,{class:`${l}-base-selection-tag-wrapper`,ref:`counterWrapperRef`},n(Q,{size:r,ref:`counterRef`,onMouseenter:this.handleMouseEnterCounter,onMouseleave:this.handleMouseLeaveCounter,disabled:i})):void 0,b;if(g){let e=this.selectedOptions.length-s;e>0&&(b=n(`div`,{class:`${l}-base-selection-tag-wrapper`,key:`__counter__`},n(Q,{size:r,ref:`counterRef`,onMouseenter:this.handleMouseEnterCounter,disabled:i},{default:()=>`+${e}`})))}let x=h?a?n(Ae,{ref:`overflowRef`,updateCounter:this.updateCounter,getCounter:this.getCounter,getTail:this.getTail,style:{width:`100%`,display:`flex`,overflow:`hidden`}},{default:c,counter:m,tail:()=>d}):n(Ae,{ref:`overflowRef`,updateCounter:this.updateCounter,getCounter:this.getCounter,style:{width:`100%`,display:`flex`,overflow:`hidden`}},{default:c,counter:m}):g&&b?c().concat(b):c(),S=_?()=>n(`div`,{class:`${l}-base-selection-popover`},h?c():this.selectedOptions.map(t)):void 0,C=_?Object.assign({show:this.showTagsPanel,trigger:`hover`,overlap:!0,placement:`top`,width:`trigger`,onUpdateShow:this.onPopoverUpdateShow,theme:this.mergedTheme.peers.Popover,themeOverrides:this.mergedTheme.peerOverrides.Popover},u):null,w=!this.selected&&(!this.active||!this.pattern&&!this.isComposing)?n(`div`,{class:`${l}-base-selection-placeholder ${l}-base-selection-overlay`},n(`div`,{class:`${l}-base-selection-placeholder__inner`},this.placeholder)):null,T=a?n(`div`,{ref:`patternInputWrapperRef`,class:`${l}-base-selection-tags`},x,h?null:d,v):n(`div`,{ref:`multipleElRef`,class:`${l}-base-selection-tags`,tabindex:i?void 0:0},x,v);y=n(o,null,_?n(ae,Object.assign({},C,{scrollable:!0,style:`max-height: calc(var(--v-target-height) * 6.6);`}),{trigger:()=>T,default:S}):T,w)}else if(a){let e=this.pattern||this.isComposing,t=this.active?!e:!this.selected,r=!this.active&&this.selected;y=n(`div`,{ref:`patternInputWrapperRef`,class:`${l}-base-selection-label`,title:this.patternInputFocused?void 0:Me(this.label)},n(`input`,Object.assign({},this.inputProps,{ref:`patternInputRef`,class:`${l}-base-selection-input`,value:this.active?this.pattern:``,placeholder:``,readonly:i,disabled:i,tabindex:-1,autofocus:this.autofocus,onFocus:this.handlePatternInputFocus,onBlur:this.handlePatternInputBlur,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd})),r?n(`div`,{class:`${l}-base-selection-label__render-label ${l}-base-selection-overlay`,key:`input`},n(`div`,{class:`${l}-base-selection-overlay__wrapper`},f?f({option:this.selectedOption,handleClose:()=>{}}):p?p(this.selectedOption,!0):Z(this.label,this.selectedOption,!0))):null,t?n(`div`,{class:`${l}-base-selection-placeholder ${l}-base-selection-overlay`,key:`placeholder`},n(`div`,{class:`${l}-base-selection-overlay__wrapper`},this.filterablePlaceholder)):null,v)}else y=n(`div`,{ref:`singleElRef`,class:`${l}-base-selection-label`,tabindex:this.disabled?void 0:0},this.label===void 0?n(`div`,{class:`${l}-base-selection-placeholder ${l}-base-selection-overlay`,key:`placeholder`},n(`div`,{class:`${l}-base-selection-placeholder__inner`},this.placeholder)):n(`div`,{class:`${l}-base-selection-input`,title:Me(this.label),key:`input`},n(`div`,{class:`${l}-base-selection-input__content`},f?f({option:this.selectedOption,handleClose:()=>{}}):p?p(this.selectedOption,!0):Z(this.label,this.selectedOption,!0))),v);return n(`div`,{ref:`selfRef`,class:[`${l}-base-selection`,this.rtlEnabled&&`${l}-base-selection--rtl`,this.themeClass,e&&`${l}-base-selection--${e}-status`,{[`${l}-base-selection--active`]:this.active,[`${l}-base-selection--selected`]:this.selected||this.active&&this.pattern,[`${l}-base-selection--disabled`]:this.disabled,[`${l}-base-selection--multiple`]:this.multiple,[`${l}-base-selection--focus`]:this.focused}],style:this.cssVars,onClick:this.onClick,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onKeydown:this.onKeydown,onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onMousedown:this.handleMouseDown},y,c?n(`div`,{class:`${l}-base-selection__border`}):null,c?n(`div`,{class:`${l}-base-selection__state-border`}):null)}});function Ot(e){return e.type===`group`}function kt(e){return e.type===`ignored`}function At(e,t){try{return!!(1+t.toString().toLowerCase().indexOf(e.trim().toLowerCase()))}catch{return!1}}function jt(e,t){return{getIsGroup:Ot,getIgnored:kt,getKey(t){return Ot(t)?t.name||t.key||`key-required`:t[e]},getChildren(e){return e[t]}}}function Mt(e,t,n,r){if(!t)return e;function i(e){if(!Array.isArray(e))return[];let a=[];for(let o of e)if(Ot(o)){let e=i(o[r]);e.length&&a.push(Object.assign({},o,{[r]:e}))}else if(kt(o))continue;else t(n,o)&&a.push(o);return a}return i(e)}function Nt(e,t,n){let r=new Map;return e.forEach(e=>{Ot(e)?e[n].forEach(e=>{r.set(e[t],e)}):r.set(e[t],e)}),r}var Pt=O([I(`select`,`
 z-index: auto;
 outline: none;
 width: 100%;
 position: relative;
 font-weight: var(--n-font-weight);
 `),I(`select-menu`,`
 margin: 4px 0;
 box-shadow: var(--n-menu-box-shadow);
 `,[X({originalTransition:`background-color .3s var(--n-bezier), box-shadow .3s var(--n-bezier)`})])]),Ft=Object.assign(Object.assign({},v.props),{to:se.propTo,bordered:{type:Boolean,default:void 0},clearable:Boolean,clearCreatedOptionsOnClear:{type:Boolean,default:!0},clearFilterAfterSelect:{type:Boolean,default:!0},options:{type:Array,default:()=>[]},defaultValue:{type:[String,Number,Array],default:null},keyboard:{type:Boolean,default:!0},value:[String,Number,Array],placeholder:String,menuProps:Object,multiple:Boolean,size:String,menuSize:{type:String},filterable:Boolean,disabled:{type:Boolean,default:void 0},remote:Boolean,loading:Boolean,filter:Function,placement:{type:String,default:`bottom-start`},widthMode:{type:String,default:`trigger`},tag:Boolean,onCreate:Function,fallbackOption:{type:[Function,Boolean],default:void 0},show:{type:Boolean,default:void 0},showArrow:{type:Boolean,default:!0},maxTagCount:[Number,String],ellipsisTagPopoverProps:Object,consistentMenuWidth:{type:Boolean,default:!0},virtualScroll:{type:Boolean,default:!0},labelField:{type:String,default:`label`},valueField:{type:String,default:`value`},childrenField:{type:String,default:`children`},renderLabel:Function,renderOption:Function,renderTag:Function,"onUpdate:value":[Function,Array],inputProps:Object,nodeProps:Function,ignoreComposition:{type:Boolean,default:!0},showOnFocus:Boolean,onUpdateValue:[Function,Array],onBlur:[Function,Array],onClear:[Function,Array],onFocus:[Function,Array],onScroll:[Function,Array],onSearch:[Function,Array],onUpdateShow:[Function,Array],"onUpdate:show":[Function,Array],displayDirective:{type:String,default:`show`},resetMenuOnOptionsChange:{type:Boolean,default:!0},status:String,showCheckmark:{type:Boolean,default:!0},scrollbarProps:Object,onChange:[Function,Array],items:Array}),It=g({name:`Select`,props:Ft,slots:Object,setup(e){let{mergedClsPrefixRef:t,mergedBorderedRef:n,namespaceRef:r,inlineThemeDisabled:i,mergedComponentPropsRef:o}=_(e),s=v(`Select`,`-select`,Pt,ge,e,t),c=A(e.defaultValue),l=R(e,`value`),u=le(l,c),d=A(!1),p=A(``),m=oe(e,[`items`,`options`]),g=A([]),y=A([]),b=P(()=>y.value.concat(g.value).concat(m.value)),x=P(()=>{let{filter:t}=e;if(t)return t;let{labelField:n,valueField:r}=e;return(e,t)=>{if(!t)return!1;let i=t[n];if(typeof i==`string`)return At(e,i);let a=t[r];return typeof a==`string`?At(e,a):typeof a==`number`&&At(e,String(a))}}),S=P(()=>{if(e.remote)return m.value;{let{value:t}=b,{value:n}=p;return!n.length||!e.filterable?t:Mt(t,x.value,n,e.childrenField)}}),C=P(()=>{let{valueField:t,childrenField:n}=e,r=jt(t,n);return _t(S.value,r)}),w=P(()=>Nt(b.value,e.valueField,e.childrenField)),T=A(!1),E=le(R(e,`show`),T),D=A(null),O=A(null),k=A(null),{localeRef:j}=de(`Select`),M=P(()=>e.placeholder??j.value.placeholder),F=[],I=A(new Map),L=P(()=>{let{fallbackOption:t}=e;if(t===void 0){let{labelField:t,valueField:n}=e;return e=>({[t]:String(e),[n]:e})}return t===!1?!1:e=>Object.assign(t(e),{value:e})});function z(t){let n=e.remote,{value:r}=I,{value:i}=w,{value:a}=L,o=[];return t.forEach(e=>{if(i.has(e))o.push(i.get(e));else if(n&&r.has(e))o.push(r.get(e));else if(a){let t=a(e);t&&o.push(t)}}),o}let B=P(()=>{if(e.multiple){let{value:e}=u;return Array.isArray(e)?z(e):[]}return null}),V=P(()=>{let{value:t}=u;return!e.multiple&&!Array.isArray(t)?t===null?null:z([t])[0]||null:null}),H=a(e,{mergedSize:t=>{let{size:n}=e;if(n)return n;let{mergedSize:r}=t||{};return r?.value?r.value:o?.value?.Select?.size||`medium`}}),{mergedSizeRef:te,mergedDisabledRef:U,mergedStatusRef:re}=H;function W(t,n){let{onChange:r,"onUpdate:value":i,onUpdateValue:a}=e,{nTriggerFormChange:o,nTriggerFormInput:s}=H;r&&h(r,t,n),a&&h(a,t,n),i&&h(i,t,n),c.value=t,o(),s()}function ie(t){let{onBlur:n}=e,{nTriggerFormBlur:r}=H;n&&h(n,t),r()}function G(){let{onClear:t}=e;t&&h(t)}function K(t){let{onFocus:n,showOnFocus:r}=e,{nTriggerFormFocus:i}=H;n&&h(n,t),i(),r&&Y()}function q(t){let{onSearch:n}=e;n&&h(n,t)}function ae(t){let{onScroll:n}=e;n&&h(n,t)}function J(){var t;let{remote:n,multiple:r}=e;if(n){let{value:n}=I;if(r){let{valueField:r}=e;(t=B.value)==null||t.forEach(e=>{n.set(e[r],e)})}else{let t=V.value;t&&n.set(t[e.valueField],t)}}}function ce(t){let{onUpdateShow:n,"onUpdate:show":r}=e;n&&h(n,t),r&&h(r,t),T.value=t}function Y(){U.value||(ce(!0),T.value=!0,e.filterable&&Me())}function X(){ce(!1)}function Z(){p.value=``,y.value=F}let Q=A(!1);function fe(){e.filterable&&(Q.value=!0)}function pe(){e.filterable&&(Q.value=!1,E.value||Z())}function me(){U.value||(E.value?e.filterable?Me():X():Y())}function he(e){(k.value?.selfRef)?.contains(e.relatedTarget)||(d.value=!1,ie(e),X())}function ve(e){K(e),d.value=!0}function ye(){d.value=!0}function be(e){D.value?.$el.contains(e.relatedTarget)||(d.value=!1,ie(e),X())}function xe(){var e;(e=D.value)==null||e.focus(),X()}function Se(e){E.value&&(D.value?.$el.contains(ee(e))||X())}function Ce(t){if(!Array.isArray(t))return[];if(L.value)return Array.from(t);{let{remote:n}=e,{value:r}=w;if(n){let{value:e}=I;return t.filter(t=>r.has(t)||e.has(t))}return t.filter(e=>r.has(e))}}function we(e){Te(e.rawNode)}function Te(t){if(U.value)return;let{tag:n,remote:r,clearFilterAfterSelect:i,valueField:a}=e;if(n&&!r){let{value:e}=y,t=e[0]||null;if(t){let e=g.value;e.length?e.push(t):g.value=[t],y.value=F}}if(r&&I.value.set(t[a],t),e.multiple){let e=Ce(u.value),o=e.findIndex(e=>e===t[a]);if(~o){if(e.splice(o,1),n&&!r){let e=Ee(t[a]);~e&&(g.value.splice(e,1),i&&(p.value=``))}}else e.push(t[a]),i&&(p.value=``);W(e,z(e))}else{if(n&&!r){let e=Ee(t[a]);~e?g.value=[g.value[e]]:g.value=F}je(),X(),W(t[a],t)}}function Ee(t){return g.value.findIndex(n=>n[e.valueField]===t)}function De(t){E.value||Y();let{value:n}=t.target;p.value=n;let{tag:r,remote:i}=e;if(q(n),r&&!i){if(!n){y.value=F;return}let{onCreate:t}=e,r=t?t(n):{[e.labelField]:n,[e.valueField]:n},{valueField:i,labelField:a}=e;m.value.some(e=>e[i]===r[i]||e[a]===r[a])||g.value.some(e=>e[i]===r[i]||e[a]===r[a])?y.value=F:y.value=[r]}}function Oe(t){t.stopPropagation();let{multiple:n,tag:r,remote:i,clearCreatedOptionsOnClear:a}=e;!n&&e.filterable&&X(),r&&!i&&a&&(g.value=F),G(),n?W([],[]):W(null,null)}function $(e){!_e(e,`action`)&&!_e(e,`empty`)&&!_e(e,`header`)&&e.preventDefault()}function ke(e){ae(e)}function Ae(t){var n,r,i;if(!e.keyboard){t.preventDefault();return}switch(t.key){case` `:if(e.filterable)break;t.preventDefault();case`Enter`:if(!D.value?.isComposing){if(E.value){let t=k.value?.getPendingTmNode();t?we(t):e.filterable||(X(),je())}else if(Y(),e.tag&&Q.value){let t=y.value[0];if(t){let n=t[e.valueField],{value:r}=u;e.multiple&&Array.isArray(r)&&r.includes(n)||Te(t)}}}t.preventDefault();break;case`ArrowUp`:if(t.preventDefault(),e.loading)return;E.value&&((n=k.value)==null||n.prev());break;case`ArrowDown`:if(t.preventDefault(),e.loading)return;E.value?(r=k.value)==null||r.next():Y();break;case`Escape`:E.value&&(ue(t),X()),(i=D.value)==null||i.focus()}}function je(){var e;(e=D.value)==null||e.focus()}function Me(){var e;(e=D.value)==null||e.focusInput()}function Ne(){var e;E.value&&((e=O.value)==null||e.syncPosition())}J(),N(R(e,`options`),J);let Pe={focus:()=>{var e;(e=D.value)==null||e.focus()},focusInput:()=>{var e;(e=D.value)==null||e.focusInput()},blur:()=>{var e;(e=D.value)==null||e.blur()},blurInput:()=>{var e;(e=D.value)==null||e.blurInput()}},Fe=P(()=>{let{self:{menuBoxShadow:e}}=s.value;return{"--n-menu-box-shadow":e}}),Ie=i?ne(`select`,void 0,Fe,e):void 0;return Object.assign(Object.assign({},Pe),{mergedStatus:re,mergedClsPrefix:t,mergedBordered:n,namespace:r,treeMate:C,isMounted:f(),triggerRef:D,menuRef:k,pattern:p,uncontrolledShow:T,mergedShow:E,adjustedTo:se(e),uncontrolledValue:c,mergedValue:u,followerRef:O,localizedPlaceholder:M,selectedOption:V,selectedOptions:B,mergedSize:te,mergedDisabled:U,focused:d,activeWithoutMenuOpen:Q,inlineThemeDisabled:i,onTriggerInputFocus:fe,onTriggerInputBlur:pe,handleTriggerOrMenuResize:Ne,handleMenuFocus:ye,handleMenuBlur:be,handleMenuTabOut:xe,handleTriggerClick:me,handleToggle:we,handleDeleteOption:Te,handlePatternInput:De,handleClear:Oe,handleTriggerBlur:he,handleTriggerFocus:ve,handleKeydown:Ae,handleMenuAfterLeave:Z,handleMenuClickOutside:Se,handleMenuScroll:ke,handleMenuKeydown:Ae,handleMenuMousedown:$,mergedTheme:s,cssVars:i?void 0:Fe,themeClass:Ie?.themeClass,onRender:Ie?.onRender})},render(){return n(`div`,{class:`${this.mergedClsPrefix}-select`},n(K,null,{default:()=>[n(ce,null,{default:()=>n(Dt,{ref:`triggerRef`,inlineThemeDisabled:this.inlineThemeDisabled,status:this.mergedStatus,inputProps:this.inputProps,clsPrefix:this.mergedClsPrefix,showArrow:this.showArrow,maxTagCount:this.maxTagCount,ellipsisTagPopoverProps:this.ellipsisTagPopoverProps,bordered:this.mergedBordered,active:this.activeWithoutMenuOpen||this.mergedShow,pattern:this.pattern,placeholder:this.localizedPlaceholder,selectedOption:this.selectedOption,selectedOptions:this.selectedOptions,multiple:this.multiple,renderTag:this.renderTag,renderLabel:this.renderLabel,filterable:this.filterable,clearable:this.clearable,disabled:this.mergedDisabled,size:this.mergedSize,theme:this.mergedTheme.peers.InternalSelection,labelField:this.labelField,valueField:this.valueField,themeOverrides:this.mergedTheme.peerOverrides.InternalSelection,loading:this.loading,focused:this.focused,onClick:this.handleTriggerClick,onDeleteOption:this.handleDeleteOption,onPatternInput:this.handlePatternInput,onClear:this.handleClear,onBlur:this.handleTriggerBlur,onFocus:this.handleTriggerFocus,onKeydown:this.handleKeydown,onPatternBlur:this.onTriggerInputBlur,onPatternFocus:this.onTriggerInputFocus,onResize:this.handleTriggerOrMenuResize,ignoreComposition:this.ignoreComposition},{arrow:()=>{var e;return[(e=this.$slots).arrow?.call(e)]}})}),n(q,{ref:`followerRef`,show:this.mergedShow,to:this.adjustedTo,teleportDisabled:this.adjustedTo===se.tdkey,containerClass:this.namespace,width:this.consistentMenuWidth?`target`:void 0,minWidth:`target`,placement:this.placement},{default:()=>n(D,{name:`fade-in-scale-up-transition`,appear:this.isMounted,onAfterLeave:this.handleMenuAfterLeave},{default:()=>{var e;return this.mergedShow||this.displayDirective===`show`?((e=this.onRender)==null||e.call(this),H(n(Tt,Object.assign({},this.menuProps,{ref:`menuRef`,onResize:this.handleTriggerOrMenuResize,inlineThemeDisabled:this.inlineThemeDisabled,virtualScroll:this.consistentMenuWidth&&this.virtualScroll,class:[`${this.mergedClsPrefix}-select-menu`,this.themeClass,this.menuProps?.class],clsPrefix:this.mergedClsPrefix,focusable:!0,labelField:this.labelField,valueField:this.valueField,autoPending:!0,nodeProps:this.nodeProps,theme:this.mergedTheme.peers.InternalSelectMenu,themeOverrides:this.mergedTheme.peerOverrides.InternalSelectMenu,treeMate:this.treeMate,multiple:this.multiple,size:this.menuSize,renderOption:this.renderOption,renderLabel:this.renderLabel,value:this.mergedValue,style:[this.menuProps?.style,this.cssVars],onToggle:this.handleToggle,onScroll:this.handleMenuScroll,onFocus:this.handleMenuFocus,onBlur:this.handleMenuBlur,onKeydown:this.handleMenuKeydown,onTabOut:this.handleMenuTabOut,onMousedown:this.handleMenuMousedown,show:this.mergedShow,showCheckmark:this.showCheckmark,resetMenuOnOptionsChange:this.resetMenuOnOptionsChange,scrollbarProps:this.scrollbarProps}),{empty:()=>{var e;return[(e=this.$slots).empty?.call(e)]},header:()=>{var e;return[(e=this.$slots).header?.call(e)]},action:()=>{var e;return[(e=this.$slots).action?.call(e)]}}),this.displayDirective===`show`?[[i,this.mergedShow],[Y,this.handleMenuClickOutside,void 0,{capture:!0}]]:[[Y,this.handleMenuClickOutside,void 0,{capture:!0}]])):null}})})]}))}});export{_t as a,_e as c,bt as i,jt as n,Ne as o,Tt as r,Oe as s,It as t};