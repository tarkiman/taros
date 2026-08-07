import{$n as e,An as t,At as n,B as r,Bn as i,Bt as a,C as o,Ct as s,Dt as c,En as l,Et as u,G as d,Gn as f,Gt as p,H as m,Hn as h,It as g,Jn as _,Jt as v,K as y,Kn as b,Kt as x,Ln as S,Lt as C,Mt as w,N as T,Nt as E,Sn as D,St as O,Tt as k,U as A,Un as j,Vn as M,Vt as N,Wn as P,Wt as F,Xt as I,Yt as L,Zn as R,_ as z,an as ee,ar as te,cn as B,cr as V,dn as H,fn as U,fr as W,h as ne,hn as re,in as G,k as ie,lr as K,mn as ae,nr as q,pn as J,qn as oe,qt as Y,rn as se,rr as ce,sn as X,sr as le,tn as ue,un as Z,w as de,wt as Q,yn as fe,z as pe,zn as $,zt as me}from"./auth-B9qrSSDV.js";import{S as he,_ as ge,b as _e,d as ve,f as ye,g as be,h as xe,m as Se,p as Ce,v as we,w as Te,x as Ee,y as De}from"./AppShell-BHseDx9P.js";import{C as Oe,_ as ke,m as Ae,s as je,u as Me,v as Ne,x as Pe}from"./useTheme-DEkHxaFR.js";import{n as Fe,s as Ie}from"./LocaleSwitcher-C-KNnAoz.js";import{a as Le,n as Re,r as ze,t as Be}from"./fade-in-scale-up.cssr-Cm568Q-V.js";import{t as Ve}from"./get-slot-6kXJmSMP.js";import{l as He}from"./light-DDg2yKbn.js";import{a as Ue,i as We,n as Ge,t as Ke}from"./Input-DYp59KIM.js";import{_ as qe,a as Je,c as Ye,f as Xe,h as Ze,m as Qe,o as $e,r as et,t as tt,u as nt,y as rt}from"./light-CEXl0FjN.js";import{t as it}from"./Tag-DvAW4GKS.js";import{n as at,t as ot}from"./Checkbox-XdGeGjyY.js";function st(e,t){let{target:n}=e;for(;n;){if(n.dataset&&n.dataset[t]!==void 0)return!0;n=n.parentElement}return!1}function ct(e={},t){let n=le({ctrl:!1,command:!1,win:!1,shift:!1,tab:!1}),{keydown:r,keyup:i}=e,a=e=>{switch(e.key){case`Control`:n.ctrl=!0;break;case`Meta`:n.command=!0,n.win=!0;break;case`Shift`:n.shift=!0;break;case`Tab`:n.tab=!0}r!==void 0&&Object.keys(r).forEach(t=>{if(t!==e.key)return;let n=r[t];if(typeof n==`function`)n(e);else{let{stop:t=!1,prevent:r=!1}=n;t&&e.stopPropagation(),r&&e.preventDefault(),n.handler(e)}})},o=e=>{switch(e.key){case`Control`:n.ctrl=!1;break;case`Meta`:n.command=!1,n.win=!1;break;case`Shift`:n.shift=!1;break;case`Tab`:n.tab=!1}i!==void 0&&Object.keys(i).forEach(t=>{if(t!==e.key)return;let n=i[t];if(typeof n==`function`)n(e);else{let{stop:t=!1,prevent:r=!1}=n;t&&e.stopPropagation(),r&&e.preventDefault(),n.handler(e)}})},s=()=>{(t===void 0||t.value)&&(v(`keydown`,document,a),v(`keyup`,document,o)),t!==void 0&&q(t,e=>{e?(v(`keydown`,document,a),v(`keyup`,document,o)):(Y(`keydown`,document,a),Y(`keyup`,document,o))})};return Oe()?(P(s),f(()=>{(t===void 0||t.value)&&(Y(`keydown`,document,a),Y(`keyup`,document,o))})):s(),V(n)}function lt(e,t,n){if(!t)return e;let r=K(e.value),i=null;return q(e,e=>{i!==null&&window.clearTimeout(i),e===!0?n&&!n.value?r.value=!0:i=window.setTimeout(()=>{r.value=!0},t):r.value=!1}),r}function ut(e){return e&-e}var dt=class{constructor(e,t){this.l=e,this.min=t;let n=Array(e+1);for(let t=0;t<e+1;++t)n[t]=0;this.ft=n}add(e,t){if(t===0)return;let{l:n,ft:r}=this;for(e+=1;e<=n;)r[e]+=t,e+=ut(e)}get(e){return this.sum(e+1)-this.sum(e)}sum(e){if(e===void 0&&(e=this.l),e<=0)return 0;let{ft:t,min:n,l:r}=this;if(e>r)throw Error("[FinweckTree.sum]: `i` is larger than length.");let i=e*n;for(;e>0;)i+=t[e],e-=ut(e);return i}getBound(e){let t=0,n=this.l;for(;n>t;){let r=Math.floor((t+n)/2),i=this.sum(r);if(i>e){n=r;continue}if(i<e){if(t===r)return this.sum(t+1)<=e?t+1:r;t=r}else return r}return t}},ft;function pt(){return typeof document>`u`?!1:(ft===void 0&&(ft=`matchMedia`in window&&window.matchMedia(`(pointer:coarse)`).matches),ft)}var mt;function ht(){return typeof document>`u`?1:(mt===void 0&&(mt=`chrome`in window?window.devicePixelRatio:1),mt)}var gt=`VVirtualListXScroll`;function _t({columnsRef:e,renderColRef:n,renderItemWithColsRef:r}){let i=K(0),a=K(0),o=t(()=>{let t=e.value;if(t.length===0)return null;let n=new dt(t.length,0);return t.forEach((e,t)=>{n.add(t,e.width)}),n}),s=x(()=>{let e=o.value;return e===null?0:Math.max(e.getBound(a.value)-1,0)}),c=e=>{let t=o.value;return t===null?0:t.sum(e)},l=x(()=>{let t=o.value;return t===null?0:Math.min(t.getBound(a.value+i.value)+1,e.value.length-1)});return R(gt,{startIndexRef:s,endIndexRef:l,columnsRef:e,renderColRef:n,renderItemWithColsRef:r,getLeft:c}),{listWidthRef:i,scrollLeftRef:a}}var vt=S({name:`VirtualListRow`,props:{index:{type:Number,required:!0},item:{type:Object,required:!0}},setup(){let{startIndexRef:e,endIndexRef:t,columnsRef:n,getLeft:r,renderColRef:a,renderItemWithColsRef:o}=i(gt);return{startIndex:e,endIndex:t,columns:n,renderCol:a,renderItemWithCols:o,getLeft:r}},render(){let{startIndex:e,endIndex:t,columns:n,renderCol:r,renderItemWithCols:i,getLeft:a,item:o}=this;if(i!=null)return i({itemIndex:this.index,startColIndex:e,endColIndex:t,allColumns:n,item:o,getLeft:a});if(r!=null){let i=[];for(let s=e;s<=t;++s){let e=n[s];i.push(r({column:e,left:a(s),item:o}))}return i}return null}}),yt=xe(`.v-vl`,{maxHeight:`inherit`,height:`100%`,overflow:`auto`,minWidth:`1px`},[xe(`&:not(.v-vl--show-scrollbar)`,{scrollbarWidth:`none`},[xe(`&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb`,{width:0,height:0,display:`none`})])]),bt=S({name:`VirtualList`,inheritAttrs:!1,props:{showScrollbar:{type:Boolean,default:!0},columns:{type:Array,default:()=>[]},renderCol:Function,renderItemWithCols:Function,items:{type:Array,default:()=>[]},itemSize:{type:Number,required:!0},itemResizable:Boolean,itemsStyle:[String,Object],visibleItemsTag:{type:[String,Object],default:`div`},visibleItemsProps:Object,ignoreItemResize:Boolean,onScroll:Function,onWheel:Function,onResize:Function,defaultScrollKey:[Number,String],defaultScrollIndex:Number,keyField:{type:String,default:`key`},paddingTop:{type:[Number,String],default:0},paddingBottom:{type:[Number,String],default:0}},setup(e){let n=N();yt.mount({id:`vueuc/virtual-list`,head:!0,anchorMetaName:be,ssr:n}),oe(()=>{let{defaultScrollIndex:t,defaultScrollKey:n}=e;t==null?n!=null&&_({key:n}):_({index:t})});let r=!1,i=!1;j(()=>{if(r=!1,!i){i=!0;return}_({top:m.value,left:s.value})}),b(()=>{r=!0,i||=!0});let a=x(()=>{if(e.renderCol==null&&e.renderItemWithCols==null||e.columns.length===0)return;let t=0;return e.columns.forEach(e=>{t+=e.width}),t}),o=t(()=>{let t=new Map,{keyField:n}=e;return e.items.forEach((e,r)=>{t.set(e[n],r)}),t}),{scrollLeftRef:s,listWidthRef:c}=_t({columnsRef:W(e,`columns`),renderColRef:W(e,`renderCol`),renderItemWithColsRef:W(e,`renderItemWithCols`)}),l=K(null),u=K(void 0),d=new Map,f=t(()=>{let{items:t,itemSize:n,keyField:r}=e,i=new dt(t.length,n);return t.forEach((e,t)=>{let n=e[r],a=d.get(n);a!==void 0&&i.add(t,a)}),i}),p=K(0),m=K(0),h=x(()=>Math.max(f.value.getBound(m.value-ue(e.paddingTop))-1,0)),g=t(()=>{let{value:t}=u;if(t===void 0)return[];let{items:n,itemSize:r}=e,i=h.value,a=Math.min(i+Math.ceil(t/r+1),n.length-1),o=[];for(let e=i;e<=a;++e)o.push(n[e]);return o}),_=(e,t)=>{if(typeof e==`number`){C(e,t,`auto`);return}let{left:n,top:r,index:i,key:a,position:s,behavior:c,debounce:l=!0}=e;if(n!==void 0||r!==void 0)C(n,r,c);else if(i!==void 0)S(i,c,l);else if(a!==void 0){let e=o.value.get(a);e!==void 0&&S(e,c,l)}else s===`bottom`?C(0,2**53-1,c):s===`top`&&C(0,0,c)},v,y=null;function S(t,n,r){let{value:i}=f,a=i.sum(t)+ue(e.paddingTop);if(!r)l.value.scrollTo({left:0,top:a,behavior:n});else{v=t,y!==null&&window.clearTimeout(y),y=window.setTimeout(()=>{v=void 0,y=null},16);let{scrollTop:e,offsetHeight:r}=l.value;if(a>e){let o=i.get(t);a+o<=e+r||l.value.scrollTo({left:0,top:a+o-r,behavior:n})}else l.value.scrollTo({left:0,top:a,behavior:n})}}function C(e,t,n){l.value.scrollTo({left:e,top:t,behavior:n})}function w(t,n){if(r||e.ignoreItemResize||M(n.target))return;let{value:i}=f,a=o.value.get(t),s=i.get(a),c=n.borderBoxSize?.[0]?.blockSize??n.contentRect.height;if(c===s)return;c-e.itemSize===0?d.delete(t):d.set(t,c-e.itemSize);let u=c-s;if(u===0)return;i.add(a,u);let m=l.value;if(m!=null){if(v===void 0){let e=i.sum(a);m.scrollTop>e&&m.scrollBy(0,u)}else(a<v||a===v&&c+i.sum(a)>m.scrollTop+m.offsetHeight)&&m.scrollBy(0,u);A()}p.value++}let T=!pt(),E=!1;function D(t){var n;(n=e.onScroll)==null||n.call(e,t),(!T||!E)&&A()}function O(t){var n;if((n=e.onWheel)==null||n.call(e,t),T){let e=l.value;if(e!=null){if(t.deltaX===0&&(e.scrollTop===0&&t.deltaY<=0||e.scrollTop+e.offsetHeight>=e.scrollHeight&&t.deltaY>=0))return;t.preventDefault(),e.scrollTop+=t.deltaY/ht(),e.scrollLeft+=t.deltaX/ht(),A(),E=!0,Te(()=>{E=!1})}}}function k(t){if(r||M(t.target))return;if(e.renderCol==null&&e.renderItemWithCols==null){if(t.contentRect.height===u.value)return}else if(t.contentRect.height===u.value&&t.contentRect.width===c.value)return;u.value=t.contentRect.height,c.value=t.contentRect.width;let{onResize:n}=e;n!==void 0&&n(t)}function A(){let{value:e}=l;e!=null&&(m.value=e.scrollTop,s.value=e.scrollLeft)}function M(e){let t=e;for(;t!==null;){if(t.style.display===`none`)return!0;t=t.parentElement}return!1}return{listHeight:u,listStyle:{overflow:`auto`},keyToIndex:o,itemsStyle:t(()=>{let{itemResizable:t}=e,n=G(f.value.sum());return p.value,[e.itemsStyle,{boxSizing:`content-box`,width:G(a.value),height:t?``:n,minHeight:t?n:``,paddingTop:G(e.paddingTop),paddingBottom:G(e.paddingBottom)}]}),visibleItemsStyle:t(()=>(p.value,{transform:`translateY(${G(f.value.sum(h.value))})`})),viewportItems:g,listElRef:l,itemsElRef:K(null),scrollTo:_,handleListResize:k,handleListScroll:D,handleListWheel:O,handleItemResize:w}},render(){let{itemResizable:e,keyField:t,keyToIndex:n,visibleItemsTag:r}=this;return $(me,{onResize:this.handleListResize},{default:()=>{var i;return $(`div`,M(this.$attrs,{class:[`v-vl`,this.showScrollbar&&`v-vl--show-scrollbar`],onScroll:this.handleListScroll,onWheel:this.handleListWheel,ref:`listElRef`}),[this.items.length===0?(i=this.$slots).empty?.call(i):$(`div`,{ref:`itemsElRef`,class:`v-vl-items`,style:this.itemsStyle},[$(r,Object.assign({class:`v-vl-visible-items`,style:this.visibleItemsStyle},this.visibleItemsProps),{default:()=>{let{renderCol:r,renderItemWithCols:i}=this;return this.viewportItems.map(a=>{let o=a[t],s=n.get(o),c=r==null?void 0:$(vt,{index:s,item:a}),l=i==null?void 0:$(vt,{index:s,item:a}),u=this.$slots.default({item:a,renderedCols:c,renderedItemWithCols:l,index:s})[0];return e?$(me,{key:o,onResize:e=>this.handleItemResize(o,e)},{default:()=>u}):(u.key=o,u)})}})])])}})}}),xt=`v-hidden`,St=xe(`[v-hidden]`,{display:`none!important`}),Ct=S({name:`Overflow`,props:{getCounter:Function,getTail:Function,updateCounter:Function,onUpdateCount:Function,onUpdateOverflow:Function},setup(e,{slots:t}){let n=K(null),r=K(null);function i(i){let{value:a}=n,{getCounter:o,getTail:s}=e,c;if(c=o===void 0?r.value:o(),!a||!c)return;c.hasAttribute(xt)&&c.removeAttribute(xt);let{children:l}=a;if(i.showAllItemsBeforeCalculate)for(let e of l)e.hasAttribute(xt)&&e.removeAttribute(xt);let u=a.offsetWidth,d=[],f=t.tail?s?.():null,p=f?f.offsetWidth:0,m=!1,h=a.children.length-+!!t.tail;for(let t=0;t<h-1;++t){if(t<0)continue;let n=l[t];if(m){n.hasAttribute(xt)||n.setAttribute(xt,``);continue}n.hasAttribute(xt)&&n.removeAttribute(xt);let r=n.offsetWidth;if(p+=r,d[t]=r,p>u){let{updateCounter:n}=e;for(let r=t;r>=0;--r){let i=h-1-r;n===void 0?c.textContent=`${i}`:n(i);let a=c.offsetWidth;if(p-=d[r],p+a<=u||r===0){m=!0,t=r-1,f&&(t===-1?(f.style.maxWidth=`${u-a}px`,f.style.boxSizing=`border-box`):f.style.maxWidth=``);let{onUpdateCount:n}=e;n&&n(i);break}}}}let{onUpdateOverflow:g}=e;m?g!==void 0&&g(!0):(g!==void 0&&g(!1),c.setAttribute(xt,``))}let a=N();return St.mount({id:`vueuc/overflow`,head:!0,anchorMetaName:be,ssr:a}),oe(()=>i({showAllItemsBeforeCalculate:!1})),{selfRef:n,counterRef:r,sync:i}},render(){let{$slots:t}=this;return h(()=>this.sync({showAllItemsBeforeCalculate:!1})),$(`div`,{class:`v-overflow`,ref:`selfRef`},[e(t,`default`),t.counter?t.counter():$(`span`,{style:{display:`inline-block`},ref:`counterRef`}),t.tail?t.tail():null])}});function wt(e,t){t&&(oe(()=>{let{value:n}=e;n&&a.registerHandler(n,t)}),q(e,(e,t)=>{t&&a.unregisterHandler(t)},{deep:!1}),f(()=>{let{value:t}=e;t&&a.unregisterHandler(t)}))}function Tt(e,t){if(!e)return;let n=document.createElement(`a`);n.href=e,t!==void 0&&(n.download=t),document.body.appendChild(n),n.click(),document.body.removeChild(n)}function Et(e){switch(typeof e){case`string`:return e||void 0;case`number`:return String(e);default:return}}var Dt={tiny:`mini`,small:`tiny`,medium:`small`,large:`medium`,huge:`large`};function Ot(e){let t=Dt[e];if(t===void 0)throw Error(`${e} has no smaller size.`);return t}function kt(e){return t=>{e.value=t?t.$el:null}}function At(e){let t=e.filter(e=>e!==void 0);if(t.length!==0)return t.length===1?t[0]:t=>{e.forEach(e=>{e&&e(t)})}}var jt=S({name:`ArrowDown`,render(){return $(`svg`,{viewBox:`0 0 28 28`,version:`1.1`,xmlns:`http://www.w3.org/2000/svg`},$(`g`,{stroke:`none`,"stroke-width":`1`,"fill-rule":`evenodd`},$(`g`,{"fill-rule":`nonzero`},$(`path`,{d:`M23.7916,15.2664 C24.0788,14.9679 24.0696,14.4931 23.7711,14.206 C23.4726,13.9188 22.9978,13.928 22.7106,14.2265 L14.7511,22.5007 L14.7511,3.74792 C14.7511,3.33371 14.4153,2.99792 14.0011,2.99792 C13.5869,2.99792 13.2511,3.33371 13.2511,3.74793 L13.2511,22.4998 L5.29259,14.2265 C5.00543,13.928 4.53064,13.9188 4.23213,14.206 C3.93361,14.4931 3.9244,14.9679 4.21157,15.2664 L13.2809,24.6944 C13.6743,25.1034 14.3289,25.1034 14.7223,24.6944 L23.7916,15.2664 Z`}))))}}),Mt=S({name:`Backward`,render(){return $(`svg`,{viewBox:`0 0 20 20`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},$(`path`,{d:`M12.2674 15.793C11.9675 16.0787 11.4927 16.0672 11.2071 15.7673L6.20572 10.5168C5.9298 10.2271 5.9298 9.7719 6.20572 9.48223L11.2071 4.23177C11.4927 3.93184 11.9675 3.92031 12.2674 4.206C12.5673 4.49169 12.5789 4.96642 12.2932 5.26634L7.78458 9.99952L12.2932 14.7327C12.5789 15.0326 12.5673 15.5074 12.2674 15.793Z`,fill:`currentColor`}))}}),Nt=S({name:`Checkmark`,render(){return $(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 16 16`},$(`g`,{fill:`none`},$(`path`,{d:`M14.046 3.486a.75.75 0 0 1-.032 1.06l-7.93 7.474a.85.85 0 0 1-1.188-.022l-2.68-2.72a.75.75 0 1 1 1.068-1.053l2.234 2.267l7.468-7.038a.75.75 0 0 1 1.06.032z`,fill:`currentColor`})))}}),Pt=S({name:`ChevronRight`,render(){return $(`svg`,{viewBox:`0 0 16 16`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},$(`path`,{d:`M5.64645 3.14645C5.45118 3.34171 5.45118 3.65829 5.64645 3.85355L9.79289 8L5.64645 12.1464C5.45118 12.3417 5.45118 12.6583 5.64645 12.8536C5.84171 13.0488 6.15829 13.0488 6.35355 12.8536L10.8536 8.35355C11.0488 8.15829 11.0488 7.84171 10.8536 7.64645L6.35355 3.14645C6.15829 2.95118 5.84171 2.95118 5.64645 3.14645Z`,fill:`currentColor`}))}}),Ft=S({name:`Empty`,render(){return $(`svg`,{viewBox:`0 0 28 28`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},$(`path`,{d:`M26 7.5C26 11.0899 23.0899 14 19.5 14C15.9101 14 13 11.0899 13 7.5C13 3.91015 15.9101 1 19.5 1C23.0899 1 26 3.91015 26 7.5ZM16.8536 4.14645C16.6583 3.95118 16.3417 3.95118 16.1464 4.14645C15.9512 4.34171 15.9512 4.65829 16.1464 4.85355L18.7929 7.5L16.1464 10.1464C15.9512 10.3417 15.9512 10.6583 16.1464 10.8536C16.3417 11.0488 16.6583 11.0488 16.8536 10.8536L19.5 8.20711L22.1464 10.8536C22.3417 11.0488 22.6583 11.0488 22.8536 10.8536C23.0488 10.6583 23.0488 10.3417 22.8536 10.1464L20.2071 7.5L22.8536 4.85355C23.0488 4.65829 23.0488 4.34171 22.8536 4.14645C22.6583 3.95118 22.3417 3.95118 22.1464 4.14645L19.5 6.79289L16.8536 4.14645Z`,fill:`currentColor`}),$(`path`,{d:`M25 22.75V12.5991C24.5572 13.0765 24.053 13.4961 23.5 13.8454V16H17.5L17.3982 16.0068C17.0322 16.0565 16.75 16.3703 16.75 16.75C16.75 18.2688 15.5188 19.5 14 19.5C12.4812 19.5 11.25 18.2688 11.25 16.75L11.2432 16.6482C11.1935 16.2822 10.8797 16 10.5 16H4.5V7.25C4.5 6.2835 5.2835 5.5 6.25 5.5H12.2696C12.4146 4.97463 12.6153 4.47237 12.865 4H6.25C4.45507 4 3 5.45507 3 7.25V22.75C3 24.5449 4.45507 26 6.25 26H21.75C23.5449 26 25 24.5449 25 22.75ZM4.5 22.75V17.5H9.81597L9.85751 17.7041C10.2905 19.5919 11.9808 21 14 21L14.215 20.9947C16.2095 20.8953 17.842 19.4209 18.184 17.5H23.5V22.75C23.5 23.7165 22.7165 24.5 21.75 24.5H6.25C5.2835 24.5 4.5 23.7165 4.5 22.75Z`,fill:`currentColor`}))}}),It=S({name:`FastBackward`,render(){return $(`svg`,{viewBox:`0 0 20 20`,version:`1.1`,xmlns:`http://www.w3.org/2000/svg`},$(`g`,{stroke:`none`,"stroke-width":`1`,fill:`none`,"fill-rule":`evenodd`},$(`g`,{fill:`currentColor`,"fill-rule":`nonzero`},$(`path`,{d:`M8.73171,16.7949 C9.03264,17.0795 9.50733,17.0663 9.79196,16.7654 C10.0766,16.4644 10.0634,15.9897 9.76243,15.7051 L4.52339,10.75 L17.2471,10.75 C17.6613,10.75 17.9971,10.4142 17.9971,10 C17.9971,9.58579 17.6613,9.25 17.2471,9.25 L4.52112,9.25 L9.76243,4.29275 C10.0634,4.00812 10.0766,3.53343 9.79196,3.2325 C9.50733,2.93156 9.03264,2.91834 8.73171,3.20297 L2.31449,9.27241 C2.14819,9.4297 2.04819,9.62981 2.01448,9.8386 C2.00308,9.89058 1.99707,9.94459 1.99707,10 C1.99707,10.0576 2.00356,10.1137 2.01585,10.1675 C2.05084,10.3733 2.15039,10.5702 2.31449,10.7254 L8.73171,16.7949 Z`}))))}}),Lt=S({name:`FastForward`,render(){return $(`svg`,{viewBox:`0 0 20 20`,version:`1.1`,xmlns:`http://www.w3.org/2000/svg`},$(`g`,{stroke:`none`,"stroke-width":`1`,fill:`none`,"fill-rule":`evenodd`},$(`g`,{fill:`currentColor`,"fill-rule":`nonzero`},$(`path`,{d:`M11.2654,3.20511 C10.9644,2.92049 10.4897,2.93371 10.2051,3.23464 C9.92049,3.53558 9.93371,4.01027 10.2346,4.29489 L15.4737,9.25 L2.75,9.25 C2.33579,9.25 2,9.58579 2,10.0000012 C2,10.4142 2.33579,10.75 2.75,10.75 L15.476,10.75 L10.2346,15.7073 C9.93371,15.9919 9.92049,16.4666 10.2051,16.7675 C10.4897,17.0684 10.9644,17.0817 11.2654,16.797 L17.6826,10.7276 C17.8489,10.5703 17.9489,10.3702 17.9826,10.1614 C17.994,10.1094 18,10.0554 18,10.0000012 C18,9.94241 17.9935,9.88633 17.9812,9.83246 C17.9462,9.62667 17.8467,9.42976 17.6826,9.27455 L11.2654,3.20511 Z`}))))}}),Rt=S({name:`Filter`,render(){return $(`svg`,{viewBox:`0 0 28 28`,version:`1.1`,xmlns:`http://www.w3.org/2000/svg`},$(`g`,{stroke:`none`,"stroke-width":`1`,"fill-rule":`evenodd`},$(`g`,{"fill-rule":`nonzero`},$(`path`,{d:`M17,19 C17.5522847,19 18,19.4477153 18,20 C18,20.5522847 17.5522847,21 17,21 L11,21 C10.4477153,21 10,20.5522847 10,20 C10,19.4477153 10.4477153,19 11,19 L17,19 Z M21,13 C21.5522847,13 22,13.4477153 22,14 C22,14.5522847 21.5522847,15 21,15 L7,15 C6.44771525,15 6,14.5522847 6,14 C6,13.4477153 6.44771525,13 7,13 L21,13 Z M24,7 C24.5522847,7 25,7.44771525 25,8 C25,8.55228475 24.5522847,9 24,9 L4,9 C3.44771525,9 3,8.55228475 3,8 C3,7.44771525 3.44771525,7 4,7 L24,7 Z`}))))}}),zt=S({name:`Forward`,render(){return $(`svg`,{viewBox:`0 0 20 20`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},$(`path`,{d:`M7.73271 4.20694C8.03263 3.92125 8.50737 3.93279 8.79306 4.23271L13.7944 9.48318C14.0703 9.77285 14.0703 10.2281 13.7944 10.5178L8.79306 15.7682C8.50737 16.0681 8.03263 16.0797 7.73271 15.794C7.43279 15.5083 7.42125 15.0336 7.70694 14.7336L12.2155 10.0005L7.70694 5.26729C7.42125 4.96737 7.43279 4.49264 7.73271 4.20694Z`,fill:`currentColor`}))}}),Bt=S({name:`More`,render(){return $(`svg`,{viewBox:`0 0 16 16`,version:`1.1`,xmlns:`http://www.w3.org/2000/svg`},$(`g`,{stroke:`none`,"stroke-width":`1`,fill:`none`,"fill-rule":`evenodd`},$(`g`,{fill:`currentColor`,"fill-rule":`nonzero`},$(`path`,{d:`M4,7 C4.55228,7 5,7.44772 5,8 C5,8.55229 4.55228,9 4,9 C3.44772,9 3,8.55229 3,8 C3,7.44772 3.44772,7 4,7 Z M8,7 C8.55229,7 9,7.44772 9,8 C9,8.55229 8.55229,9 8,9 C7.44772,9 7,8.55229 7,8 C7,7.44772 7.44772,7 8,7 Z M12,7 C12.5523,7 13,7.44772 13,8 C13,8.55229 12.5523,9 12,9 C11.4477,9 11,8.55229 11,8 C11,7.44772 11.4477,7 12,7 Z`}))))}}),Vt=S({props:{onFocus:Function,onBlur:Function},setup(e){return()=>$(`div`,{style:`width: 0; height: 0`,tabindex:0,onFocus:e.onFocus,onBlur:e.onBlur})}});function Ht(e){return Array.isArray(e)?e:[e]}var Ut={STOP:`STOP`};function Wt(e,t){let n=t(e);e.children!==void 0&&n!==Ut.STOP&&e.children.forEach(e=>Wt(e,t))}function Gt(e,t={}){let{preserveGroup:n=!1}=t,r=[],i=n?e=>{e.isLeaf||(r.push(e.key),a(e.children))}:e=>{e.isLeaf||(e.isGroup||r.push(e.key),a(e.children))};function a(e){e.forEach(i)}return a(e),r}function Kt(e,t){let{isLeaf:n}=e;return n===void 0?!t(e):n}function qt(e){return e.children}function Jt(e){return e.key}function Yt(){return!1}function Xt(e,t){let{isLeaf:n}=e;return!(n===!1&&!Array.isArray(t(e)))}function Zt(e){return e.disabled===!0}function Qt(e,t){return e.isLeaf===!1&&!Array.isArray(t(e))}function $t(e){return e==null?[]:Array.isArray(e)?e:e.checkedKeys??[]}function en(e){return e==null||Array.isArray(e)?[]:e.indeterminateKeys??[]}function tn(e,t){let n=new Set(e);return t.forEach(e=>{n.has(e)||n.add(e)}),Array.from(n)}function nn(e,t){let n=new Set(e);return t.forEach(e=>{n.has(e)&&n.delete(e)}),Array.from(n)}function rn(e){return e?.type===`group`}function an(e){let t=new Map;return e.forEach((e,n)=>{t.set(e.key,n)}),e=>t.get(e)??null}var on=class extends Error{constructor(){super(),this.message=`SubtreeNotLoadedError: checking a subtree whose required nodes are not fully loaded.`}};function sn(e,t,n,r){return dn(t.concat(e),n,r,!1)}function cn(e,t){let n=new Set;return e.forEach(e=>{let r=t.treeNodeMap.get(e);if(r!==void 0){let e=r.parent;for(;e!==null&&!(e.disabled||n.has(e.key));)n.add(e.key),e=e.parent}}),n}function ln(e,t,n,r){let i=dn(t,n,r,!1),a=dn(e,n,r,!0),o=cn(e,n),s=[];return i.forEach(e=>{(a.has(e)||o.has(e))&&s.push(e)}),s.forEach(e=>i.delete(e)),i}function un(e,t){let{checkedKeys:n,keysToCheck:r,keysToUncheck:i,indeterminateKeys:a,cascade:o,leafOnly:s,checkStrategy:c,allowNotLoaded:l}=e;if(!o)return r===void 0?i===void 0?{checkedKeys:Array.from(n),indeterminateKeys:Array.from(a)}:{checkedKeys:nn(n,i),indeterminateKeys:Array.from(a)}:{checkedKeys:tn(n,r),indeterminateKeys:Array.from(a)};let{levelTreeNodeMap:u}=t,d;d=i===void 0?r===void 0?dn(n,t,l,!1):sn(r,n,t,l):ln(i,n,t,l);let f=c===`parent`,p=c===`child`||s,m=d,h=new Set,g=Math.max.apply(null,Array.from(u.keys()));for(let e=g;e>=0;--e){let t=e===0,n=u.get(e);for(let e of n){if(e.isLeaf)continue;let{key:n,shallowLoaded:r}=e;if(p&&r&&e.children.forEach(e=>{!e.disabled&&!e.isLeaf&&e.shallowLoaded&&m.has(e.key)&&m.delete(e.key)}),e.disabled||!r)continue;let i=!0,a=!1,o=!0;for(let t of e.children){let e=t.key;if(!t.disabled){if(o&&=!1,m.has(e))a=!0;else if(h.has(e)){a=!0,i=!1;break}else if(i=!1,a)break}}i&&!o?(f&&e.children.forEach(e=>{!e.disabled&&m.has(e.key)&&m.delete(e.key)}),m.add(n)):a&&h.add(n),t&&p&&m.has(n)&&m.delete(n)}}return{checkedKeys:Array.from(m),indeterminateKeys:Array.from(h)}}function dn(e,t,n,r){let{treeNodeMap:i,getChildren:a}=t,o=new Set,s=new Set(e);return e.forEach(e=>{let t=i.get(e);t!==void 0&&Wt(t,e=>{if(e.disabled)return Ut.STOP;let{key:t}=e;if(!o.has(t)&&(o.add(t),s.add(t),Qt(e.rawNode,a))){if(r)return Ut.STOP;if(!n)throw new on}})}),s}function fn(e,{includeGroup:t=!1,includeSelf:n=!0},r){let i=r.treeNodeMap,a=e==null?null:i.get(e)??null,o={keyPath:[],treeNodePath:[],treeNode:a};if(a?.ignored)return o.treeNode=null,o;for(;a;)!a.ignored&&(t||!a.isGroup)&&o.treeNodePath.push(a),a=a.parent;return o.treeNodePath.reverse(),n||o.treeNodePath.pop(),o.keyPath=o.treeNodePath.map(e=>e.key),o}function pn(e){if(e.length===0)return null;let t=e[0];return t.isGroup||t.ignored||t.disabled?t.getNext():t}function mn(e,t){let n=e.siblings,r=n.length,{index:i}=e;return t?n[(i+1)%r]:i===n.length-1?null:n[i+1]}function hn(e,t,{loop:n=!1,includeDisabled:r=!1}={}){let i=t===`prev`?gn:mn,a={reverse:t===`prev`},o=!1,s=null;function c(t){if(t!==null){if(t===e){if(!o)o=!0;else if(!e.disabled&&!e.isGroup){s=e;return}}else if((!t.disabled||r)&&!t.ignored&&!t.isGroup){s=t;return}if(t.isGroup){let e=vn(t,a);e===null?c(i(t,n)):s=e}else{let e=i(t,!1);if(e!==null)c(e);else{let e=_n(t);e?.isGroup?c(i(e,n)):n&&c(i(t,!0))}}}}return c(e),s}function gn(e,t){let n=e.siblings,r=n.length,{index:i}=e;return t?n[(i-1+r)%r]:i===0?null:n[i-1]}function _n(e){return e.parent}function vn(e,t={}){let{reverse:n=!1}=t,{children:r}=e;if(r){let{length:e}=r,i=n?e-1:0,a=n?-1:e,o=n?-1:1;for(let e=i;e!==a;e+=o){let n=r[e];if(!n.disabled&&!n.ignored)if(n.isGroup){let e=vn(n,t);if(e!==null)return e}else return n}}return null}var yn={getChild(){return this.ignored?null:vn(this)},getParent(){let{parent:e}=this;return e?.isGroup?e.getParent():e},getNext(e={}){return hn(this,`next`,e)},getPrev(e={}){return hn(this,`prev`,e)}};function bn(e,t){let n=t?new Set(t):void 0,r=[];function i(e){e.forEach(e=>{r.push(e),!(e.isLeaf||!e.children||e.ignored)&&(e.isGroup||n===void 0||n.has(e.key))&&i(e.children)})}return i(e),r}function xn(e,t){let n=e.key;for(;t;){if(t.key===n)return!0;t=t.parent}return!1}function Sn(e,t,n,r,i,a=null,o=0){let s=[];return e.forEach((c,l)=>{var u;let d=Object.create(r);if(d.rawNode=c,d.siblings=s,d.level=o,d.index=l,d.isFirstChild=l===0,d.isLastChild=l+1===e.length,d.parent=a,!d.ignored){let e=i(c);Array.isArray(e)&&(d.children=Sn(e,t,n,r,i,d,o+1))}s.push(d),t.set(d.key,d),n.has(o)||n.set(o,[]),(u=n.get(o))==null||u.push(d)}),s}function Cn(e,t={}){let n=new Map,r=new Map,{getDisabled:i=Zt,getIgnored:a=Yt,getIsGroup:o=rn,getKey:s=Jt}=t,c=t.getChildren??qt,l=t.ignoreEmptyChildren?e=>{let t=c(e);return Array.isArray(t)?t.length?t:null:t}:c,u=Sn(e,n,r,Object.assign({get key(){return s(this.rawNode)},get disabled(){return i(this.rawNode)},get isGroup(){return o(this.rawNode)},get isLeaf(){return Kt(this.rawNode,l)},get shallowLoaded(){return Xt(this.rawNode,l)},get ignored(){return a(this.rawNode)},contains(e){return xn(this,e)}},yn),l);function d(e){if(e==null)return null;let t=n.get(e);return t&&!t.isGroup&&!t.ignored?t:null}function f(e){if(e==null)return null;let t=n.get(e);return t&&!t.ignored?t:null}function p(e,t){let n=f(e);return n?n.getPrev(t):null}function m(e,t){let n=f(e);return n?n.getNext(t):null}function h(e){let t=f(e);return t?t.getParent():null}function g(e){let t=f(e);return t?t.getChild():null}let _={treeNodes:u,treeNodeMap:n,levelTreeNodeMap:r,maxLevel:Math.max(...r.keys()),getChildren:l,getFlattenedNodes(e){return bn(u,e)},getNode:d,getPrev:p,getNext:m,getParent:h,getChild:g,getFirstAvailableNode(){return pn(u)},getPath(e,t={}){return fn(e,t,_)},getCheckedKeys(e,t={}){let{cascade:n=!0,leafOnly:r=!1,checkStrategy:i=`all`,allowNotLoaded:a=!1}=t;return un({checkedKeys:$t(e),indeterminateKeys:en(e),cascade:n,leafOnly:r,checkStrategy:i,allowNotLoaded:a},_)},check(e,t,n={}){let{cascade:r=!0,leafOnly:i=!1,checkStrategy:a=`all`,allowNotLoaded:o=!1}=n;return un({checkedKeys:$t(t),indeterminateKeys:en(t),keysToCheck:e==null?[]:Ht(e),cascade:r,leafOnly:i,checkStrategy:a,allowNotLoaded:o},_)},uncheck(e,t,n={}){let{cascade:r=!0,leafOnly:i=!1,checkStrategy:a=`all`,allowNotLoaded:o=!1}=n;return un({checkedKeys:$t(t),indeterminateKeys:en(t),keysToUncheck:e==null?[]:Ht(e),cascade:r,leafOnly:i,checkStrategy:a,allowNotLoaded:o},_)},getNonLeafKeys(e={}){return Gt(u,e)}};return _}var wn=B(`empty`,`
 display: flex;
 flex-direction: column;
 align-items: center;
 font-size: var(--n-font-size);
`,[Z(`icon`,`
 width: var(--n-icon-size);
 height: var(--n-icon-size);
 font-size: var(--n-icon-size);
 line-height: var(--n-icon-size);
 color: var(--n-icon-color);
 transition:
 color .3s var(--n-bezier);
 `,[X(`+`,[Z(`description`,`
 margin-top: 8px;
 `)])]),Z(`description`,`
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `),Z(`extra`,`
 text-align: center;
 transition: color .3s var(--n-bezier);
 margin-top: 12px;
 color: var(--n-extra-text-color);
 `)]),Tn=Object.assign(Object.assign({},m.props),{description:String,showDescription:{type:Boolean,default:!0},showIcon:{type:Boolean,default:!0},size:{type:String,default:`medium`},renderIcon:Function}),En=S({name:`Empty`,props:Tn,slots:Object,setup(e){let{mergedClsPrefixRef:n,inlineThemeDisabled:r,mergedComponentPropsRef:i}=Q(e),a=m(`Empty`,`-empty`,wn,rt,e,n),{localeRef:o}=Ue(`Empty`),c=t(()=>e.description??i?.value?.Empty?.description),l=t(()=>i?.value?.Empty?.renderIcon||(()=>$(Ft,null))),u=t(()=>{let{size:t}=e,{common:{cubicBezierEaseInOut:n},self:{[J(`iconSize`,t)]:r,[J(`fontSize`,t)]:i,textColor:o,iconColor:s,extraTextColor:c}}=a.value;return{"--n-icon-size":r,"--n-font-size":i,"--n-bezier":n,"--n-text-color":o,"--n-icon-color":s,"--n-extra-text-color":c}}),d=r?s(`empty`,t(()=>{let t=``,{size:n}=e;return t+=n[0],t}),u,e):void 0;return{mergedClsPrefix:n,mergedRenderIcon:l,localizedDescription:t(()=>c.value||o.value.description),cssVars:r?void 0:u,themeClass:d?.themeClass,onRender:d?.onRender}},render(){let{$slots:e,mergedClsPrefix:t,onRender:n}=this;return n?.(),$(`div`,{class:[`${t}-empty`,this.themeClass],style:this.cssVars},this.showIcon?$(`div`,{class:`${t}-empty__icon`},e.icon?e.icon():$(r,{clsPrefix:t},{default:this.mergedRenderIcon})):null,this.showDescription?$(`div`,{class:`${t}-empty__description`},e.default?e.default():this.localizedDescription):null,e.extra?$(`div`,{class:`${t}-empty__extra`},e.extra()):null)}}),Dn=S({name:`NBaseSelectGroupHeader`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){let{renderLabelRef:e,renderOptionRef:t,labelFieldRef:n,nodePropsRef:r}=i(Ee);return{labelField:n,nodeProps:r,renderLabel:e,renderOption:t}},render(){let{clsPrefix:e,renderLabel:t,renderOption:n,nodeProps:r,tmNode:{rawNode:i}}=this,a=r?.(i),o=t?t(i,!1):Re(i[this.labelField],i,!1),s=$(`div`,Object.assign({},a,{class:[`${e}-base-select-group-header`,a?.class]}),o);return i.render?i.render({node:s,option:i}):n?n({node:s,option:i,selected:!1}):s}});function On(e,t){return $(fe,{name:`fade-in-scale-up-transition`},{default:()=>e?$(r,{clsPrefix:t,class:`${t}-base-select-option__check`},{default:()=>$(Nt)}):null})}var kn=S({name:`NBaseSelectOption`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(e){let{valueRef:t,pendingTmNodeRef:n,multipleRef:r,valueSetRef:a,renderLabelRef:o,renderOptionRef:s,labelFieldRef:c,valueFieldRef:l,showCheckmarkRef:u,nodePropsRef:d,handleOptionClick:f,handleOptionMouseEnter:p}=i(Ee),m=x(()=>{let{value:t}=n;return t?e.tmNode.key===t.key:!1});function h(t){let{tmNode:n}=e;n.disabled||f(t,n)}function g(t){let{tmNode:n}=e;n.disabled||p(t,n)}function _(t){let{tmNode:n}=e,{value:r}=m;n.disabled||r||p(t,n)}return{multiple:r,isGrouped:x(()=>{let{tmNode:t}=e,{parent:n}=t;return n&&n.rawNode.type===`group`}),showCheckmark:u,nodeProps:d,isPending:m,isSelected:x(()=>{let{value:n}=t,{value:i}=r;if(n===null)return!1;let o=e.tmNode.rawNode[l.value];if(i){let{value:e}=a;return e.has(o)}return n===o}),labelField:c,renderLabel:o,renderOption:s,handleMouseMove:_,handleMouseEnter:g,handleClick:h}},render(){let{clsPrefix:e,tmNode:{rawNode:t},isSelected:n,isPending:r,isGrouped:i,showCheckmark:a,nodeProps:o,renderOption:s,renderLabel:c,handleClick:l,handleMouseEnter:u,handleMouseMove:d}=this,f=On(n,e),p=c?[c(t,n),a&&f]:[Re(t[this.labelField],t,n),a&&f],m=o?.(t),h=$(`div`,Object.assign({},m,{class:[`${e}-base-select-option`,t.class,m?.class,{[`${e}-base-select-option--disabled`]:t.disabled,[`${e}-base-select-option--selected`]:n,[`${e}-base-select-option--grouped`]:i,[`${e}-base-select-option--pending`]:r,[`${e}-base-select-option--show-checkmark`]:a}],style:[m?.style||``,t.style||``],onClick:At([l,m?.onClick]),onMouseenter:At([u,m?.onMouseenter]),onMousemove:At([d,m?.onMousemove])}),$(`div`,{class:`${e}-base-select-option__content`},p));return t.render?t.render({node:h,option:t,selected:n}):s?s({node:h,option:t,selected:n}):h}}),An=B(`base-select-menu`,`
 line-height: 1.5;
 outline: none;
 z-index: 0;
 position: relative;
 border-radius: var(--n-border-radius);
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-color);
`,[B(`scrollbar`,`
 max-height: var(--n-height);
 `),B(`virtual-list`,`
 max-height: var(--n-height);
 `),B(`base-select-option`,`
 min-height: var(--n-option-height);
 font-size: var(--n-option-font-size);
 display: flex;
 align-items: center;
 `,[Z(`content`,`
 z-index: 1;
 white-space: nowrap;
 text-overflow: ellipsis;
 overflow: hidden;
 `)]),B(`base-select-group-header`,`
 min-height: var(--n-option-height);
 font-size: .93em;
 display: flex;
 align-items: center;
 `),B(`base-select-menu-option-wrapper`,`
 position: relative;
 width: 100%;
 `),Z(`loading, empty`,`
 display: flex;
 padding: 12px 32px;
 flex: 1;
 justify-content: center;
 `),Z(`loading`,`
 color: var(--n-loading-color);
 font-size: var(--n-loading-size);
 `),Z(`header`,`
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `),Z(`action`,`
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 border-top: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `),B(`base-select-group-header`,`
 position: relative;
 cursor: default;
 padding: var(--n-option-padding);
 color: var(--n-group-header-text-color);
 `),B(`base-select-option`,`
 cursor: pointer;
 position: relative;
 padding: var(--n-option-padding);
 transition:
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 box-sizing: border-box;
 color: var(--n-option-text-color);
 opacity: 1;
 `,[H(`show-checkmark`,`
 padding-right: calc(var(--n-option-padding-right) + 20px);
 `),X(`&::before`,`
 content: "";
 position: absolute;
 left: 4px;
 right: 4px;
 top: 0;
 bottom: 0;
 border-radius: var(--n-border-radius);
 transition: background-color .3s var(--n-bezier);
 `),X(`&:active`,`
 color: var(--n-option-text-color-pressed);
 `),H(`grouped`,`
 padding-left: calc(var(--n-option-padding-left) * 1.5);
 `),H(`pending`,[X(`&::before`,`
 background-color: var(--n-option-color-pending);
 `)]),H(`selected`,`
 color: var(--n-option-text-color-active);
 `,[X(`&::before`,`
 background-color: var(--n-option-color-active);
 `),H(`pending`,[X(`&::before`,`
 background-color: var(--n-option-color-active-pending);
 `)])]),H(`disabled`,`
 cursor: not-allowed;
 `,[U(`selected`,`
 color: var(--n-option-text-color-disabled);
 `),H(`selected`,`
 opacity: var(--n-option-opacity-disabled);
 `)]),Z(`check`,`
 font-size: 16px;
 position: absolute;
 right: calc(var(--n-option-padding-right) - 4px);
 top: calc(50% - 7px);
 color: var(--n-option-check-color);
 transition: color .3s var(--n-bezier);
 `,[Be({enterScale:`0.5`})])])]),jn=S({name:`InternalSelectMenu`,props:Object.assign(Object.assign({},m.props),{clsPrefix:{type:String,required:!0},scrollable:{type:Boolean,default:!0},treeMate:{type:Object,required:!0},multiple:Boolean,size:{type:String,default:`medium`},value:{type:[String,Number,Array],default:null},autoPending:Boolean,virtualScroll:{type:Boolean,default:!0},show:{type:Boolean,default:!0},labelField:{type:String,default:`label`},valueField:{type:String,default:`value`},loading:Boolean,focusable:Boolean,renderLabel:Function,renderOption:Function,nodeProps:Function,showCheckmark:{type:Boolean,default:!0},onMousedown:Function,onScroll:Function,onFocus:Function,onBlur:Function,onKeyup:Function,onKeydown:Function,onTabOut:Function,onMouseenter:Function,onMouseleave:Function,onResize:Function,resetMenuOnOptionsChange:{type:Boolean,default:!0},inlineThemeDisabled:Boolean,scrollbarProps:Object,onToggle:Function}),setup(e){let{mergedClsPrefixRef:n,mergedRtlRef:r,mergedComponentPropsRef:i}=Q(e),a=d(`InternalSelectMenu`,r,n),o=m(`InternalSelectMenu`,`-internal-select-menu`,An,qe,e,W(e,`clsPrefix`)),c=K(null),l=K(null),u=K(null),p=t(()=>e.treeMate.getFlattenedNodes()),g=t(()=>an(p.value)),_=K(null);function v(){let{treeMate:t}=e,n=null,{value:r}=e;r===null?n=t.getFirstAvailableNode():(n=e.multiple?t.getNode((r||[])[(r||[]).length-1]):t.getNode(r),(!n||n.disabled)&&(n=t.getFirstAvailableNode())),z(n||null)}function y(){let{value:t}=_;t&&!e.treeMate.getNode(t.key)&&(_.value=null)}let b;q(()=>e.show,t=>{t?b=q(()=>e.treeMate,()=>{e.resetMenuOnOptionsChange?(e.autoPending?v():y(),h(ee)):y()},{immediate:!0}):b?.()},{immediate:!0}),f(()=>{b?.()});let x=t(()=>ue(o.value.self[J(`optionHeight`,e.size)])),S=t(()=>se(o.value.self[J(`padding`,e.size)])),C=t(()=>e.multiple&&Array.isArray(e.value)?new Set(e.value):new Set),w=t(()=>{let e=p.value;return e&&e.length===0}),T=t(()=>i?.value?.Select?.renderEmpty);function E(t){let{onToggle:n}=e;n&&n(t)}function D(t){let{onScroll:n}=e;n&&n(t)}function O(e){var t;(t=u.value)==null||t.sync(),D(e)}function k(){var e;(e=u.value)==null||e.sync()}function A(){let{value:e}=_;return e||null}function j(e,t){t.disabled||z(t,!1)}function M(e,t){t.disabled||E(t)}function N(t){var n;st(t,`action`)||(n=e.onKeyup)==null||n.call(e,t)}function P(t){var n;st(t,`action`)||(n=e.onKeydown)==null||n.call(e,t)}function F(t){var n;(n=e.onMousedown)==null||n.call(e,t),!e.focusable&&t.preventDefault()}function I(){let{value:e}=_;e&&z(e.getNext({loop:!0}),!0)}function L(){let{value:e}=_;e&&z(e.getPrev({loop:!0}),!0)}function z(e,t=!1){_.value=e,t&&ee()}function ee(){var t,n;let r=_.value;if(!r)return;let i=g.value(r.key);i!==null&&(e.virtualScroll?(t=l.value)==null||t.scrollTo({index:i}):(n=u.value)==null||n.scrollTo({index:i,elSize:x.value}))}function te(t){var n;c.value?.contains(t.target)&&((n=e.onFocus)==null||n.call(e,t))}function B(t){var n;c.value?.contains(t.relatedTarget)||(n=e.onBlur)==null||n.call(e,t)}R(Ee,{handleOptionMouseEnter:j,handleOptionClick:M,valueSetRef:C,pendingTmNodeRef:_,nodePropsRef:W(e,`nodeProps`),showCheckmarkRef:W(e,`showCheckmark`),multipleRef:W(e,`multiple`),valueRef:W(e,`value`),renderLabelRef:W(e,`renderLabel`),renderOptionRef:W(e,`renderOption`),labelFieldRef:W(e,`labelField`),valueFieldRef:W(e,`valueField`)}),R(_e,c),oe(()=>{let{value:e}=u;e&&e.sync()});let V=t(()=>{let{size:t}=e,{common:{cubicBezierEaseInOut:n},self:{height:r,borderRadius:i,color:a,groupHeaderTextColor:s,actionDividerColor:c,optionTextColorPressed:l,optionTextColor:u,optionTextColorDisabled:d,optionTextColorActive:f,optionOpacityDisabled:p,optionCheckColor:m,actionTextColor:h,optionColorPending:g,optionColorActive:_,loadingColor:v,loadingSize:y,optionColorActivePending:b,[J(`optionFontSize`,t)]:x,[J(`optionHeight`,t)]:S,[J(`optionPadding`,t)]:C}}=o.value;return{"--n-height":r,"--n-action-divider-color":c,"--n-action-text-color":h,"--n-bezier":n,"--n-border-radius":i,"--n-color":a,"--n-option-font-size":x,"--n-group-header-text-color":s,"--n-option-check-color":m,"--n-option-color-pending":g,"--n-option-color-active":_,"--n-option-color-active-pending":b,"--n-option-height":S,"--n-option-opacity-disabled":p,"--n-option-text-color":u,"--n-option-text-color-active":f,"--n-option-text-color-disabled":d,"--n-option-text-color-pressed":l,"--n-option-padding":C,"--n-option-padding-left":se(C,`left`),"--n-option-padding-right":se(C,`right`),"--n-loading-color":v,"--n-loading-size":y}}),{inlineThemeDisabled:H}=e,U=H?s(`internal-select-menu`,t(()=>e.size[0]),V,e):void 0,ne={selfRef:c,next:I,prev:L,getPendingTmNode:A};return wt(c,e.onResize),Object.assign({mergedTheme:o,mergedClsPrefix:n,rtlEnabled:a,virtualListRef:l,scrollbarRef:u,itemSize:x,padding:S,flattenedNodes:p,empty:w,mergedRenderEmpty:T,virtualListContainer(){let{value:e}=l;return e?.listElRef},virtualListContent(){let{value:e}=l;return e?.itemsElRef},doScroll:D,handleFocusin:te,handleFocusout:B,handleKeyUp:N,handleKeyDown:P,handleMouseDown:F,handleVirtualListResize:k,handleVirtualListScroll:O,cssVars:H?void 0:V,themeClass:U?.themeClass,onRender:U?.onRender},ne)},render(){let{$slots:e,virtualScroll:t,clsPrefix:r,mergedTheme:i,themeClass:a,onRender:s}=this;return s?.(),$(`div`,{ref:`selfRef`,tabindex:this.focusable?0:-1,class:[`${r}-base-select-menu`,`${r}-base-select-menu--${this.size}-size`,this.rtlEnabled&&`${r}-base-select-menu--rtl`,a,this.multiple&&`${r}-base-select-menu--multiple`],style:this.cssVars,onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onKeyup:this.handleKeyUp,onKeydown:this.handleKeyDown,onMousedown:this.handleMouseDown,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},w(e.header,e=>e&&$(`div`,{class:`${r}-base-select-menu__header`,"data-header":!0,key:`header`},e)),this.loading?$(`div`,{class:`${r}-base-select-menu__loading`},$(ie,{clsPrefix:r,strokeWidth:20})):this.empty?$(`div`,{class:`${r}-base-select-menu__empty`,"data-empty":!0},n(e.empty,()=>[this.mergedRenderEmpty?.call(this)||$(En,{theme:i.peers.Empty,themeOverrides:i.peerOverrides.Empty,size:this.size})])):$(o,Object.assign({ref:`scrollbarRef`,theme:i.peers.Scrollbar,themeOverrides:i.peerOverrides.Scrollbar,scrollable:this.scrollable,container:t?this.virtualListContainer:void 0,content:t?this.virtualListContent:void 0,onScroll:t?void 0:this.doScroll},this.scrollbarProps),{default:()=>t?$(bt,{ref:`virtualListRef`,class:`${r}-virtual-list`,items:this.flattenedNodes,itemSize:this.itemSize,showScrollbar:!1,paddingTop:this.padding.top,paddingBottom:this.padding.bottom,onResize:this.handleVirtualListResize,onScroll:this.handleVirtualListScroll,itemResizable:!0},{default:({item:e})=>e.isGroup?$(Dn,{key:e.key,clsPrefix:r,tmNode:e}):e.ignored?null:$(kn,{clsPrefix:r,key:e.key,tmNode:e})}):$(`div`,{class:`${r}-base-select-menu-option-wrapper`,style:{paddingTop:this.padding.top,paddingBottom:this.padding.bottom}},this.flattenedNodes.map(e=>e.isGroup?$(Dn,{key:e.key,clsPrefix:r,tmNode:e}):$(kn,{clsPrefix:r,key:e.key,tmNode:e})))}),w(e.action,e=>e&&[$(`div`,{class:`${r}-base-select-menu__action`,"data-action":!0,key:`action`},e),$(Vt,{onFocus:this.onTabOut,key:`focus-detector`})]))}}),Mn=X([B(`base-selection`,`
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
 `,[B(`base-loading`,`
 color: var(--n-loading-color);
 `),B(`base-selection-tags`,`min-height: var(--n-height);`),Z(`border, state-border`,`
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
 `),Z(`state-border`,`
 z-index: 1;
 border-color: #0000;
 `),B(`base-suffix`,`
 cursor: pointer;
 position: absolute;
 top: 50%;
 transform: translateY(-50%);
 right: 10px;
 `,[Z(`arrow`,`
 font-size: var(--n-arrow-size);
 color: var(--n-arrow-color);
 transition: color .3s var(--n-bezier);
 `)]),B(`base-selection-overlay`,`
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
 `,[Z(`wrapper`,`
 flex-basis: 0;
 flex-grow: 1;
 overflow: hidden;
 text-overflow: ellipsis;
 `)]),B(`base-selection-placeholder`,`
 color: var(--n-placeholder-color);
 `,[Z(`inner`,`
 max-width: 100%;
 overflow: hidden;
 `)]),B(`base-selection-tags`,`
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
 `),B(`base-selection-label`,`
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
 `,[B(`base-selection-input`,`
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
 `,[Z(`content`,`
 text-overflow: ellipsis;
 overflow: hidden;
 white-space: nowrap; 
 `)]),Z(`render-label`,`
 color: var(--n-text-color);
 `)]),U(`disabled`,[X(`&:hover`,[Z(`state-border`,`
 box-shadow: var(--n-box-shadow-hover);
 border: var(--n-border-hover);
 `)]),H(`focus`,[Z(`state-border`,`
 box-shadow: var(--n-box-shadow-focus);
 border: var(--n-border-focus);
 `)]),H(`active`,[Z(`state-border`,`
 box-shadow: var(--n-box-shadow-active);
 border: var(--n-border-active);
 `),B(`base-selection-label`,`background-color: var(--n-color-active);`),B(`base-selection-tags`,`background-color: var(--n-color-active);`)])]),H(`disabled`,`cursor: not-allowed;`,[Z(`arrow`,`
 color: var(--n-arrow-color-disabled);
 `),B(`base-selection-label`,`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `,[B(`base-selection-input`,`
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 `),Z(`render-label`,`
 color: var(--n-text-color-disabled);
 `)]),B(`base-selection-tags`,`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `),B(`base-selection-placeholder`,`
 cursor: not-allowed;
 color: var(--n-placeholder-color-disabled);
 `)]),B(`base-selection-input-tag`,`
 height: calc(var(--n-height) - 6px);
 line-height: calc(var(--n-height) - 6px);
 outline: none;
 display: none;
 position: relative;
 margin-bottom: 3px;
 max-width: 100%;
 vertical-align: bottom;
 `,[Z(`input`,`
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
 `),Z(`mirror`,`
 position: absolute;
 left: 0;
 top: 0;
 white-space: pre;
 visibility: hidden;
 user-select: none;
 -webkit-user-select: none;
 opacity: 0;
 `)]),[`warning`,`error`].map(e=>H(`${e}-status`,[Z(`state-border`,`border: var(--n-border-${e});`),U(`disabled`,[X(`&:hover`,[Z(`state-border`,`
 box-shadow: var(--n-box-shadow-hover-${e});
 border: var(--n-border-hover-${e});
 `)]),H(`active`,[Z(`state-border`,`
 box-shadow: var(--n-box-shadow-active-${e});
 border: var(--n-border-active-${e});
 `),B(`base-selection-label`,`background-color: var(--n-color-active-${e});`),B(`base-selection-tags`,`background-color: var(--n-color-active-${e});`)]),H(`focus`,[Z(`state-border`,`
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `)])])]))]),B(`base-selection-popover`,`
 margin-bottom: -3px;
 display: flex;
 flex-wrap: wrap;
 margin-right: -8px;
 `),B(`base-selection-tag-wrapper`,`
 max-width: 100%;
 display: inline-flex;
 padding: 0 7px 3px 0;
 `,[X(`&:last-child`,`padding-right: 0;`),B(`tag`,`
 font-size: 14px;
 max-width: 100%;
 `,[Z(`content`,`
 line-height: 1.25;
 text-overflow: ellipsis;
 overflow: hidden;
 `)])])]),Nn=S({name:`InternalSelection`,props:Object.assign(Object.assign({},m.props),{clsPrefix:{type:String,required:!0},bordered:{type:Boolean,default:void 0},active:Boolean,pattern:{type:String,default:``},placeholder:String,selectedOption:{type:Object,default:null},selectedOptions:{type:Array,default:null},labelField:{type:String,default:`label`},valueField:{type:String,default:`value`},multiple:Boolean,filterable:Boolean,clearable:Boolean,disabled:Boolean,size:{type:String,default:`medium`},loading:Boolean,autofocus:Boolean,showArrow:{type:Boolean,default:!0},inputProps:Object,focused:Boolean,renderTag:Function,onKeydown:Function,onClick:Function,onBlur:Function,onFocus:Function,onDeleteOption:Function,maxTagCount:[String,Number],ellipsisTagPopoverProps:Object,onClear:Function,onPatternInput:Function,onPatternFocus:Function,onPatternBlur:Function,renderLabel:Function,status:String,inlineThemeDisabled:Boolean,ignoreComposition:{type:Boolean,default:!0},onResize:Function}),setup(e){let{mergedClsPrefixRef:n,mergedRtlRef:r}=Q(e),i=d(`InternalSelection`,r,n),a=K(null),o=K(null),c=K(null),l=K(null),u=K(null),f=K(null),p=K(null),g=K(null),_=K(null),v=K(null),y=K(!1),b=K(!1),x=K(!1),S=m(`InternalSelection`,`-internal-selection`,Mn,Ze,e,W(e,`clsPrefix`)),C=t(()=>e.clearable&&!e.disabled&&(x.value||e.active)),w=t(()=>e.selectedOption?e.renderTag?e.renderTag({option:e.selectedOption,handleClose:()=>{}}):e.renderLabel?e.renderLabel(e.selectedOption,!0):Re(e.selectedOption[e.labelField],e.selectedOption,!0):e.placeholder),T=t(()=>{let t=e.selectedOption;if(t)return t[e.labelField]}),E=t(()=>e.multiple?!!(Array.isArray(e.selectedOptions)&&e.selectedOptions.length):e.selectedOption!==null);function D(){var t;let{value:n}=a;if(n){let{value:r}=o;r&&(r.style.width=`${n.offsetWidth}px`,e.maxTagCount!==`responsive`&&((t=_.value)==null||t.sync({showAllItemsBeforeCalculate:!1})))}}function O(){let{value:e}=v;e&&(e.style.display=`none`)}function k(){let{value:e}=v;e&&(e.style.display=`inline-block`)}q(W(e,`active`),e=>{e||O()}),q(W(e,`pattern`),()=>{e.multiple&&h(D)});function A(t){let{onFocus:n}=e;n&&n(t)}function j(t){let{onBlur:n}=e;n&&n(t)}function M(t){let{onDeleteOption:n}=e;n&&n(t)}function N(t){let{onClear:n}=e;n&&n(t)}function P(t){let{onPatternInput:n}=e;n&&n(t)}function F(e){(!e.relatedTarget||!c.value?.contains(e.relatedTarget))&&A(e)}function I(e){c.value?.contains(e.relatedTarget)||j(e)}function L(e){N(e)}function R(){x.value=!0}function z(){x.value=!1}function ee(t){!e.active||!e.filterable||t.target!==o.value&&t.preventDefault()}function te(e){M(e)}let B=K(!1);function V(t){if(t.key===`Backspace`&&!B.value&&!e.pattern.length){let{selectedOptions:t}=e;t?.length&&te(t[t.length-1])}}let H=null;function U(t){let{value:n}=a;n&&(n.textContent=t.target.value,D()),e.ignoreComposition&&B.value?H=t:P(t)}function ne(){B.value=!0}function re(){B.value=!1,e.ignoreComposition&&P(H),H=null}function G(t){var n;b.value=!0,(n=e.onPatternFocus)==null||n.call(e,t)}function ie(t){var n;b.value=!1,(n=e.onPatternBlur)==null||n.call(e,t)}function ae(){var t,n;if(e.filterable)b.value=!1,(t=f.value)==null||t.blur(),(n=o.value)==null||n.blur();else if(e.multiple){let{value:e}=l;e?.blur()}else{let{value:e}=u;e?.blur()}}function Y(){var t,n,r;e.filterable?(b.value=!1,(t=f.value)==null||t.focus()):e.multiple?(n=l.value)==null||n.focus():(r=u.value)==null||r.focus()}function X(){let{value:e}=o;e&&(k(),e.focus())}function le(){let{value:e}=o;e&&e.blur()}function ue(e){let{value:t}=p;t&&t.setTextContent(`+${e}`)}function Z(){let{value:e}=g;return e}function de(){return o.value}let fe=null;function pe(){fe!==null&&window.clearTimeout(fe)}function $(){e.active||(pe(),fe=window.setTimeout(()=>{E.value&&(y.value=!0)},100))}function me(){pe()}function he(e){e||(pe(),y.value=!1)}q(E,e=>{e||(y.value=!1)}),oe(()=>{ce(()=>{let t=f.value;t&&(e.disabled?t.removeAttribute(`tabindex`):t.tabIndex=b.value?-1:0)})}),wt(c,e.onResize);let{inlineThemeDisabled:ge}=e,_e=t(()=>{let{size:t}=e,{common:{cubicBezierEaseInOut:n},self:{fontWeight:r,borderRadius:i,color:a,placeholderColor:o,textColor:s,paddingSingle:c,paddingMultiple:l,caretColor:u,colorDisabled:d,textColorDisabled:f,placeholderColorDisabled:p,colorActive:m,boxShadowFocus:h,boxShadowActive:g,boxShadowHover:_,border:v,borderFocus:y,borderHover:b,borderActive:x,arrowColor:C,arrowColorDisabled:w,loadingColor:T,colorActiveWarning:E,boxShadowFocusWarning:D,boxShadowActiveWarning:O,boxShadowHoverWarning:k,borderWarning:A,borderFocusWarning:j,borderHoverWarning:M,borderActiveWarning:N,colorActiveError:P,boxShadowFocusError:F,boxShadowActiveError:I,boxShadowHoverError:L,borderError:R,borderFocusError:z,borderHoverError:ee,borderActiveError:te,clearColor:B,clearColorHover:V,clearColorPressed:H,clearSize:U,arrowSize:W,[J(`height`,t)]:ne,[J(`fontSize`,t)]:re}}=S.value,G=se(c),ie=se(l);return{"--n-bezier":n,"--n-border":v,"--n-border-active":x,"--n-border-focus":y,"--n-border-hover":b,"--n-border-radius":i,"--n-box-shadow-active":g,"--n-box-shadow-focus":h,"--n-box-shadow-hover":_,"--n-caret-color":u,"--n-color":a,"--n-color-active":m,"--n-color-disabled":d,"--n-font-size":re,"--n-height":ne,"--n-padding-single-top":G.top,"--n-padding-multiple-top":ie.top,"--n-padding-single-right":G.right,"--n-padding-multiple-right":ie.right,"--n-padding-single-left":G.left,"--n-padding-multiple-left":ie.left,"--n-padding-single-bottom":G.bottom,"--n-padding-multiple-bottom":ie.bottom,"--n-placeholder-color":o,"--n-placeholder-color-disabled":p,"--n-text-color":s,"--n-text-color-disabled":f,"--n-arrow-color":C,"--n-arrow-color-disabled":w,"--n-loading-color":T,"--n-color-active-warning":E,"--n-box-shadow-focus-warning":D,"--n-box-shadow-active-warning":O,"--n-box-shadow-hover-warning":k,"--n-border-warning":A,"--n-border-focus-warning":j,"--n-border-hover-warning":M,"--n-border-active-warning":N,"--n-color-active-error":P,"--n-box-shadow-focus-error":F,"--n-box-shadow-active-error":I,"--n-box-shadow-hover-error":L,"--n-border-error":R,"--n-border-focus-error":z,"--n-border-hover-error":ee,"--n-border-active-error":te,"--n-clear-size":U,"--n-clear-color":B,"--n-clear-color-hover":V,"--n-clear-color-pressed":H,"--n-arrow-size":W,"--n-font-weight":r}}),ve=ge?s(`internal-selection`,t(()=>e.size[0]),_e,e):void 0;return{mergedTheme:S,mergedClearable:C,mergedClsPrefix:n,rtlEnabled:i,patternInputFocused:b,filterablePlaceholder:w,label:T,selected:E,showTagsPanel:y,isComposing:B,counterRef:p,counterWrapperRef:g,patternInputMirrorRef:a,patternInputRef:o,selfRef:c,multipleElRef:l,singleElRef:u,patternInputWrapperRef:f,overflowRef:_,inputTagElRef:v,handleMouseDown:ee,handleFocusin:F,handleClear:L,handleMouseEnter:R,handleMouseLeave:z,handleDeleteOption:te,handlePatternKeyDown:V,handlePatternInputInput:U,handlePatternInputBlur:ie,handlePatternInputFocus:G,handleMouseEnterCounter:$,handleMouseLeaveCounter:me,handleFocusout:I,handleCompositionEnd:re,handleCompositionStart:ne,onPopoverUpdateShow:he,focus:Y,focusInput:X,blur:ae,blurInput:le,updateCounter:ue,getCounter:Z,getTail:de,renderLabel:e.renderLabel,cssVars:ge?void 0:_e,themeClass:ve?.themeClass,onRender:ve?.onRender}},render(){let{status:e,multiple:t,size:n,disabled:r,filterable:i,maxTagCount:a,bordered:o,clsPrefix:s,ellipsisTagPopoverProps:u,onRender:d,renderTag:f,renderLabel:p}=this;d?.();let m=a===`responsive`,h=typeof a==`number`,g=m||h,_=$(c,null,{default:()=>$(Ge,{clsPrefix:s,loading:this.loading,showArrow:this.showArrow,showClear:this.mergedClearable&&this.selected,onClear:this.handleClear},{default:()=>{var e;return(e=this.$slots).arrow?.call(e)}})}),v;if(t){let{labelField:e}=this,t=t=>$(`div`,{class:`${s}-base-selection-tag-wrapper`,key:t.value},f?f({option:t,handleClose:()=>{this.handleDeleteOption(t)}}):$(it,{size:n,closable:!t.disabled,disabled:r,onClose:()=>{this.handleDeleteOption(t)},internalCloseIsButtonTag:!1,internalCloseFocusable:!1},{default:()=>p?p(t,!0):Re(t[e],t,!0)})),o=()=>(h?this.selectedOptions.slice(0,a):this.selectedOptions).map(t),c=i?$(`div`,{class:`${s}-base-selection-input-tag`,ref:`inputTagElRef`,key:`__input-tag__`},$(`input`,Object.assign({},this.inputProps,{ref:`patternInputRef`,tabindex:-1,disabled:r,value:this.pattern,autofocus:this.autofocus,class:`${s}-base-selection-input-tag__input`,onBlur:this.handlePatternInputBlur,onFocus:this.handlePatternInputFocus,onKeydown:this.handlePatternKeyDown,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd})),$(`span`,{ref:`patternInputMirrorRef`,class:`${s}-base-selection-input-tag__mirror`},this.pattern)):null,d=m?()=>$(`div`,{class:`${s}-base-selection-tag-wrapper`,ref:`counterWrapperRef`},$(it,{size:n,ref:`counterRef`,onMouseenter:this.handleMouseEnterCounter,onMouseleave:this.handleMouseLeaveCounter,disabled:r})):void 0,y;if(h){let e=this.selectedOptions.length-a;e>0&&(y=$(`div`,{class:`${s}-base-selection-tag-wrapper`,key:`__counter__`},$(it,{size:n,ref:`counterRef`,onMouseenter:this.handleMouseEnterCounter,disabled:r},{default:()=>`+${e}`})))}let b=m?i?$(Ct,{ref:`overflowRef`,updateCounter:this.updateCounter,getCounter:this.getCounter,getTail:this.getTail,style:{width:`100%`,display:`flex`,overflow:`hidden`}},{default:o,counter:d,tail:()=>c}):$(Ct,{ref:`overflowRef`,updateCounter:this.updateCounter,getCounter:this.getCounter,style:{width:`100%`,display:`flex`,overflow:`hidden`}},{default:o,counter:d}):h&&y?o().concat(y):o(),x=g?()=>$(`div`,{class:`${s}-base-selection-popover`},m?o():this.selectedOptions.map(t)):void 0,S=g?Object.assign({show:this.showTagsPanel,trigger:`hover`,overlap:!0,placement:`top`,width:`trigger`,onUpdateShow:this.onPopoverUpdateShow,theme:this.mergedTheme.peers.Popover,themeOverrides:this.mergedTheme.peerOverrides.Popover},u):null,C=!this.selected&&(!this.active||!this.pattern&&!this.isComposing)?$(`div`,{class:`${s}-base-selection-placeholder ${s}-base-selection-overlay`},$(`div`,{class:`${s}-base-selection-placeholder__inner`},this.placeholder)):null,w=i?$(`div`,{ref:`patternInputWrapperRef`,class:`${s}-base-selection-tags`},b,m?null:c,_):$(`div`,{ref:`multipleElRef`,class:`${s}-base-selection-tags`,tabindex:r?void 0:0},b,_);v=$(l,null,g?$(ve,Object.assign({},S,{scrollable:!0,style:`max-height: calc(var(--v-target-height) * 6.6);`}),{trigger:()=>w,default:x}):w,C)}else if(i){let e=this.pattern||this.isComposing,t=this.active?!e:!this.selected,n=!this.active&&this.selected;v=$(`div`,{ref:`patternInputWrapperRef`,class:`${s}-base-selection-label`,title:this.patternInputFocused?void 0:Et(this.label)},$(`input`,Object.assign({},this.inputProps,{ref:`patternInputRef`,class:`${s}-base-selection-input`,value:this.active?this.pattern:``,placeholder:``,readonly:r,disabled:r,tabindex:-1,autofocus:this.autofocus,onFocus:this.handlePatternInputFocus,onBlur:this.handlePatternInputBlur,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd})),n?$(`div`,{class:`${s}-base-selection-label__render-label ${s}-base-selection-overlay`,key:`input`},$(`div`,{class:`${s}-base-selection-overlay__wrapper`},f?f({option:this.selectedOption,handleClose:()=>{}}):p?p(this.selectedOption,!0):Re(this.label,this.selectedOption,!0))):null,t?$(`div`,{class:`${s}-base-selection-placeholder ${s}-base-selection-overlay`,key:`placeholder`},$(`div`,{class:`${s}-base-selection-overlay__wrapper`},this.filterablePlaceholder)):null,_)}else v=$(`div`,{ref:`singleElRef`,class:`${s}-base-selection-label`,tabindex:this.disabled?void 0:0},this.label===void 0?$(`div`,{class:`${s}-base-selection-placeholder ${s}-base-selection-overlay`,key:`placeholder`},$(`div`,{class:`${s}-base-selection-placeholder__inner`},this.placeholder)):$(`div`,{class:`${s}-base-selection-input`,title:Et(this.label),key:`input`},$(`div`,{class:`${s}-base-selection-input__content`},f?f({option:this.selectedOption,handleClose:()=>{}}):p?p(this.selectedOption,!0):Re(this.label,this.selectedOption,!0))),_);return $(`div`,{ref:`selfRef`,class:[`${s}-base-selection`,this.rtlEnabled&&`${s}-base-selection--rtl`,this.themeClass,e&&`${s}-base-selection--${e}-status`,{[`${s}-base-selection--active`]:this.active,[`${s}-base-selection--selected`]:this.selected||this.active&&this.pattern,[`${s}-base-selection--disabled`]:this.disabled,[`${s}-base-selection--multiple`]:this.multiple,[`${s}-base-selection--focus`]:this.focused}],style:this.cssVars,onClick:this.onClick,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onKeydown:this.onKeydown,onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onMousedown:this.handleMouseDown},v,o?$(`div`,{class:`${s}-base-selection__border`}):null,o?$(`div`,{class:`${s}-base-selection__state-border`}):null)}});function Pn(e){return e.type===`group`}function Fn(e){return e.type===`ignored`}function In(e,t){try{return!!(1+t.toString().toLowerCase().indexOf(e.trim().toLowerCase()))}catch{return!1}}function Ln(e,t){return{getIsGroup:Pn,getIgnored:Fn,getKey(t){return Pn(t)?t.name||t.key||`key-required`:t[e]},getChildren(e){return e[t]}}}function Rn(e,t,n,r){if(!t)return e;function i(e){if(!Array.isArray(e))return[];let a=[];for(let o of e)if(Pn(o)){let e=i(o[r]);e.length&&a.push(Object.assign({},o,{[r]:e}))}else if(Fn(o))continue;else t(n,o)&&a.push(o);return a}return i(e)}function zn(e,t,n){let r=new Map;return e.forEach(e=>{Pn(e)?e[n].forEach(e=>{r.set(e[t],e)}):r.set(e[t],e)}),r}var Bn=F(`n-popselect`),Vn=B(`popselect-menu`,`
 box-shadow: var(--n-menu-box-shadow);
`),Hn={multiple:Boolean,value:{type:[String,Number,Array],default:null},cancelable:Boolean,options:{type:Array,default:()=>[]},size:String,scrollable:Boolean,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onMouseenter:Function,onMouseleave:Function,renderLabel:Function,showCheckmark:{type:Boolean,default:void 0},nodeProps:Function,virtualScroll:Boolean,onChange:[Function,Array]},Un=He(Hn),Wn=S({name:`PopselectPanel`,props:Hn,setup(e){let n=i(Bn),{mergedClsPrefixRef:r,inlineThemeDisabled:a,mergedComponentPropsRef:o}=Q(e),c=t(()=>e.size||o?.value?.Popselect?.size||`medium`),l=m(`Popselect`,`-pop-select`,Vn,Qe,n.props,r),u=t(()=>Cn(e.options,Ln(`value`,`children`)));function d(t,n){let{onUpdateValue:r,"onUpdate:value":i,onChange:a}=e;r&&E(r,t,n),i&&E(i,t,n),a&&E(a,t,n)}function f(e){g(e.key)}function p(e){!st(e,`action`)&&!st(e,`empty`)&&!st(e,`header`)&&e.preventDefault()}function g(t){let{value:{getNode:r}}=u;if(e.multiple)if(Array.isArray(e.value)){let n=[],i=[],a=!0;e.value.forEach(e=>{if(e===t){a=!1;return}let o=r(e);o&&(n.push(o.key),i.push(o.rawNode))}),a&&(n.push(t),i.push(r(t).rawNode)),d(n,i)}else{let e=r(t);e&&d([t],[e.rawNode])}else if(e.value===t&&e.cancelable)d(null,null);else{let e=r(t);e&&d(t,e.rawNode);let{"onUpdate:show":i,onUpdateShow:a}=n.props;i&&E(i,!1),a&&E(a,!1),n.setShow(!1)}h(()=>{n.syncPosition()})}q(W(e,`options`),()=>{h(()=>{n.syncPosition()})});let _=t(()=>{let{self:{menuBoxShadow:e}}=l.value;return{"--n-menu-box-shadow":e}}),v=a?s(`select`,void 0,_,n.props):void 0;return{mergedTheme:n.mergedThemeRef,mergedClsPrefix:r,treeMate:u,handleToggle:f,handleMenuMousedown:p,cssVars:a?void 0:_,themeClass:v?.themeClass,onRender:v?.onRender,mergedSize:c,scrollbarProps:n.props.scrollbarProps}},render(){var e;return(e=this.onRender)==null||e.call(this),$(jn,{clsPrefix:this.mergedClsPrefix,focusable:!0,nodeProps:this.nodeProps,class:[`${this.mergedClsPrefix}-popselect-menu`,this.themeClass],style:this.cssVars,theme:this.mergedTheme.peers.InternalSelectMenu,themeOverrides:this.mergedTheme.peerOverrides.InternalSelectMenu,multiple:this.multiple,treeMate:this.treeMate,size:this.mergedSize,value:this.value,virtualScroll:this.virtualScroll,scrollable:this.scrollable,scrollbarProps:this.scrollbarProps,renderLabel:this.renderLabel,onToggle:this.handleToggle,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseenter,onMousedown:this.handleMenuMousedown,showCheckmark:this.showCheckmark},{header:()=>{var e;return(e=this.$slots).header?.call(e)||[]},action:()=>{var e;return(e=this.$slots).action?.call(e)||[]},empty:()=>{var e;return(e=this.$slots).empty?.call(e)||[]}})}}),Gn=Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},m.props),ze(ye,[`showArrow`,`arrow`])),{placement:Object.assign(Object.assign({},ye.placement),{default:`bottom`}),trigger:{type:String,default:`hover`}}),Hn),{scrollbarProps:Object}),Kn=S({name:`Popselect`,props:Gn,slots:Object,inheritAttrs:!1,__popover__:!0,setup(e){let{mergedClsPrefixRef:t}=Q(e),n=m(`Popselect`,`-popselect`,void 0,Qe,e,t),r=K(null);function i(){var e;(e=r.value)==null||e.syncPosition()}function a(e){var t;(t=r.value)==null||t.setShow(e)}return R(Bn,{props:e,mergedThemeRef:n,syncPosition:i,setShow:a}),Object.assign(Object.assign({},{syncPosition:i,setShow:a}),{popoverInstRef:r,mergedTheme:n})},render(){let{mergedTheme:e}=this,t={theme:e.peers.Popover,themeOverrides:e.peerOverrides.Popover,builtinThemeOverrides:{padding:`0`},ref:`popoverInstRef`,internalRenderBody:(e,t,n,r,i)=>{let{$attrs:a}=this;return $(Wn,Object.assign({},a,{class:[a.class,e],style:[a.style,...n]},je(this.$props,Un),{ref:kt(t),onMouseenter:At([r,a.onMouseenter]),onMouseleave:At([i,a.onMouseleave])}),{header:()=>{var e;return(e=this.$slots).header?.call(e)},action:()=>{var e;return(e=this.$slots).action?.call(e)},empty:()=>{var e;return(e=this.$slots).empty?.call(e)}})}};return $(ve,Object.assign({},ze(this.$props,Un),t,{internalDeactivateImmediately:!0}),{trigger:()=>{var e;return(e=this.$slots).default?.call(e)}})}}),qn=X([B(`select`,`
 z-index: auto;
 outline: none;
 width: 100%;
 position: relative;
 font-weight: var(--n-font-weight);
 `),B(`select-menu`,`
 margin: 4px 0;
 box-shadow: var(--n-menu-box-shadow);
 `,[Be({originalTransition:`background-color .3s var(--n-bezier), box-shadow .3s var(--n-bezier)`})])]),Jn=Object.assign(Object.assign({},m.props),{to:De.propTo,bordered:{type:Boolean,default:void 0},clearable:Boolean,clearCreatedOptionsOnClear:{type:Boolean,default:!0},clearFilterAfterSelect:{type:Boolean,default:!0},options:{type:Array,default:()=>[]},defaultValue:{type:[String,Number,Array],default:null},keyboard:{type:Boolean,default:!0},value:[String,Number,Array],placeholder:String,menuProps:Object,multiple:Boolean,size:String,menuSize:{type:String},filterable:Boolean,disabled:{type:Boolean,default:void 0},remote:Boolean,loading:Boolean,filter:Function,placement:{type:String,default:`bottom-start`},widthMode:{type:String,default:`trigger`},tag:Boolean,onCreate:Function,fallbackOption:{type:[Function,Boolean],default:void 0},show:{type:Boolean,default:void 0},showArrow:{type:Boolean,default:!0},maxTagCount:[Number,String],ellipsisTagPopoverProps:Object,consistentMenuWidth:{type:Boolean,default:!0},virtualScroll:{type:Boolean,default:!0},labelField:{type:String,default:`label`},valueField:{type:String,default:`value`},childrenField:{type:String,default:`children`},renderLabel:Function,renderOption:Function,renderTag:Function,"onUpdate:value":[Function,Array],inputProps:Object,nodeProps:Function,ignoreComposition:{type:Boolean,default:!0},showOnFocus:Boolean,onUpdateValue:[Function,Array],onBlur:[Function,Array],onClear:[Function,Array],onFocus:[Function,Array],onScroll:[Function,Array],onSearch:[Function,Array],onUpdateShow:[Function,Array],"onUpdate:show":[Function,Array],displayDirective:{type:String,default:`show`},resetMenuOnOptionsChange:{type:Boolean,default:!0},status:String,showCheckmark:{type:Boolean,default:!0},scrollbarProps:Object,onChange:[Function,Array],items:Array}),Yn=S({name:`Select`,props:Jn,slots:Object,setup(e){let{mergedClsPrefixRef:n,mergedBorderedRef:r,namespaceRef:i,inlineThemeDisabled:a,mergedComponentPropsRef:o}=Q(e),c=m(`Select`,`-select`,qn,Xe,e,n),l=K(e.defaultValue),u=W(e,`value`),d=Ie(u,l),f=K(!1),h=K(``),g=he(e,[`items`,`options`]),_=K([]),v=K([]),y=t(()=>v.value.concat(_.value).concat(g.value)),b=t(()=>{let{filter:t}=e;if(t)return t;let{labelField:n,valueField:r}=e;return(e,t)=>{if(!t)return!1;let i=t[n];if(typeof i==`string`)return In(e,i);let a=t[r];return typeof a==`string`?In(e,a):typeof a==`number`&&In(e,String(a))}}),x=t(()=>{if(e.remote)return g.value;{let{value:t}=y,{value:n}=h;return!n.length||!e.filterable?t:Rn(t,b.value,n,e.childrenField)}}),S=t(()=>{let{valueField:t,childrenField:n}=e,r=Ln(t,n);return Cn(x.value,r)}),C=t(()=>zn(y.value,e.valueField,e.childrenField)),w=K(!1),T=Ie(W(e,`show`),w),D=K(null),k=K(null),A=K(null),{localeRef:j}=Ue(`Select`),M=t(()=>e.placeholder??j.value.placeholder),N=[],P=K(new Map),F=t(()=>{let{fallbackOption:t}=e;if(t===void 0){let{labelField:t,valueField:n}=e;return e=>({[t]:String(e),[n]:e})}return t===!1?!1:e=>Object.assign(t(e),{value:e})});function I(t){let n=e.remote,{value:r}=P,{value:i}=C,{value:a}=F,o=[];return t.forEach(e=>{if(i.has(e))o.push(i.get(e));else if(n&&r.has(e))o.push(r.get(e));else if(a){let t=a(e);t&&o.push(t)}}),o}let L=t(()=>{if(e.multiple){let{value:e}=d;return Array.isArray(e)?I(e):[]}return null}),R=t(()=>{let{value:t}=d;return!e.multiple&&!Array.isArray(t)?t===null?null:I([t])[0]||null:null}),z=O(e,{mergedSize:t=>{let{size:n}=e;if(n)return n;let{mergedSize:r}=t||{};return r?.value?r.value:o?.value?.Select?.size||`medium`}}),{mergedSizeRef:te,mergedDisabledRef:B,mergedStatusRef:V}=z;function H(t,n){let{onChange:r,"onUpdate:value":i,onUpdateValue:a}=e,{nTriggerFormChange:o,nTriggerFormInput:s}=z;r&&E(r,t,n),a&&E(a,t,n),i&&E(i,t,n),l.value=t,o(),s()}function U(t){let{onBlur:n}=e,{nTriggerFormBlur:r}=z;n&&E(n,t),r()}function ne(){let{onClear:t}=e;t&&E(t)}function re(t){let{onFocus:n,showOnFocus:r}=e,{nTriggerFormFocus:i}=z;n&&E(n,t),i(),r&&oe()}function G(t){let{onSearch:n}=e;n&&E(n,t)}function ie(t){let{onScroll:n}=e;n&&E(n,t)}function ae(){var t;let{remote:n,multiple:r}=e;if(n){let{value:n}=P;if(r){let{valueField:r}=e;(t=L.value)==null||t.forEach(e=>{n.set(e[r],e)})}else{let t=R.value;t&&n.set(t[e.valueField],t)}}}function J(t){let{onUpdateShow:n,"onUpdate:show":r}=e;n&&E(n,t),r&&E(r,t),w.value=t}function oe(){B.value||(J(!0),w.value=!0,e.filterable&&Ee())}function Y(){J(!1)}function se(){h.value=``,v.value=N}let ce=K(!1);function X(){e.filterable&&(ce.value=!0)}function le(){e.filterable&&(ce.value=!1,T.value||se())}function ue(){B.value||(T.value?e.filterable?Ee():Y():oe())}function Z(e){(A.value?.selfRef)?.contains(e.relatedTarget)||(f.value=!1,U(e),Y())}function de(e){re(e),f.value=!0}function fe(){f.value=!0}function pe(e){D.value?.$el.contains(e.relatedTarget)||(f.value=!1,U(e),Y())}function $(){var e;(e=D.value)==null||e.focus(),Y()}function me(e){T.value&&(D.value?.$el.contains(ee(e))||Y())}function ge(t){if(!Array.isArray(t))return[];if(F.value)return Array.from(t);{let{remote:n}=e,{value:r}=C;if(n){let{value:e}=P;return t.filter(t=>r.has(t)||e.has(t))}return t.filter(e=>r.has(e))}}function _e(e){ve(e.rawNode)}function ve(t){if(B.value)return;let{tag:n,remote:r,clearFilterAfterSelect:i,valueField:a}=e;if(n&&!r){let{value:e}=v,t=e[0]||null;if(t){let e=_.value;e.length?e.push(t):_.value=[t],v.value=N}}if(r&&P.value.set(t[a],t),e.multiple){let e=ge(d.value),o=e.findIndex(e=>e===t[a]);if(~o){if(e.splice(o,1),n&&!r){let e=ye(t[a]);~e&&(_.value.splice(e,1),i&&(h.value=``))}}else e.push(t[a]),i&&(h.value=``);H(e,I(e))}else{if(n&&!r){let e=ye(t[a]);~e?_.value=[_.value[e]]:_.value=N}Te(),Y(),H(t[a],t)}}function ye(t){return _.value.findIndex(n=>n[e.valueField]===t)}function be(t){T.value||oe();let{value:n}=t.target;h.value=n;let{tag:r,remote:i}=e;if(G(n),r&&!i){if(!n){v.value=N;return}let{onCreate:t}=e,r=t?t(n):{[e.labelField]:n,[e.valueField]:n},{valueField:i,labelField:a}=e;g.value.some(e=>e[i]===r[i]||e[a]===r[a])||_.value.some(e=>e[i]===r[i]||e[a]===r[a])?v.value=N:v.value=[r]}}function xe(t){t.stopPropagation();let{multiple:n,tag:r,remote:i,clearCreatedOptionsOnClear:a}=e;!n&&e.filterable&&Y(),r&&!i&&a&&(_.value=N),ne(),n?H([],[]):H(null,null)}function Se(e){!st(e,`action`)&&!st(e,`empty`)&&!st(e,`header`)&&e.preventDefault()}function Ce(e){ie(e)}function we(t){var n,r,i;if(!e.keyboard){t.preventDefault();return}switch(t.key){case` `:if(e.filterable)break;t.preventDefault();case`Enter`:if(!D.value?.isComposing){if(T.value){let t=A.value?.getPendingTmNode();t?_e(t):e.filterable||(Y(),Te())}else if(oe(),e.tag&&ce.value){let t=v.value[0];if(t){let n=t[e.valueField],{value:r}=d;e.multiple&&Array.isArray(r)&&r.includes(n)||ve(t)}}}t.preventDefault();break;case`ArrowUp`:if(t.preventDefault(),e.loading)return;T.value&&((n=A.value)==null||n.prev());break;case`ArrowDown`:if(t.preventDefault(),e.loading)return;T.value?(r=A.value)==null||r.next():oe();break;case`Escape`:T.value&&(Le(t),Y()),(i=D.value)==null||i.focus()}}function Te(){var e;(e=D.value)==null||e.focus()}function Ee(){var e;(e=D.value)==null||e.focusInput()}function Oe(){var e;T.value&&((e=k.value)==null||e.syncPosition())}ae(),q(W(e,`options`),ae);let ke={focus:()=>{var e;(e=D.value)==null||e.focus()},focusInput:()=>{var e;(e=D.value)==null||e.focusInput()},blur:()=>{var e;(e=D.value)==null||e.blur()},blurInput:()=>{var e;(e=D.value)==null||e.blurInput()}},Ae=t(()=>{let{self:{menuBoxShadow:e}}=c.value;return{"--n-menu-box-shadow":e}}),je=a?s(`select`,void 0,Ae,e):void 0;return Object.assign(Object.assign({},ke),{mergedStatus:V,mergedClsPrefix:n,mergedBordered:r,namespace:i,treeMate:S,isMounted:p(),triggerRef:D,menuRef:A,pattern:h,uncontrolledShow:w,mergedShow:T,adjustedTo:De(e),uncontrolledValue:l,mergedValue:d,followerRef:k,localizedPlaceholder:M,selectedOption:R,selectedOptions:L,mergedSize:te,mergedDisabled:B,focused:f,activeWithoutMenuOpen:ce,inlineThemeDisabled:a,onTriggerInputFocus:X,onTriggerInputBlur:le,handleTriggerOrMenuResize:Oe,handleMenuFocus:fe,handleMenuBlur:pe,handleMenuTabOut:$,handleTriggerClick:ue,handleToggle:_e,handleDeleteOption:ve,handlePatternInput:be,handleClear:xe,handleTriggerBlur:Z,handleTriggerFocus:de,handleKeydown:we,handleMenuAfterLeave:se,handleMenuClickOutside:me,handleMenuScroll:Ce,handleMenuKeydown:we,handleMenuMousedown:Se,mergedTheme:c,cssVars:a?void 0:Ae,themeClass:je?.themeClass,onRender:je?.onRender})},render(){return $(`div`,{class:`${this.mergedClsPrefix}-select`},$(we,null,{default:()=>[$(ge,null,{default:()=>$(Nn,{ref:`triggerRef`,inlineThemeDisabled:this.inlineThemeDisabled,status:this.mergedStatus,inputProps:this.inputProps,clsPrefix:this.mergedClsPrefix,showArrow:this.showArrow,maxTagCount:this.maxTagCount,ellipsisTagPopoverProps:this.ellipsisTagPopoverProps,bordered:this.mergedBordered,active:this.activeWithoutMenuOpen||this.mergedShow,pattern:this.pattern,placeholder:this.localizedPlaceholder,selectedOption:this.selectedOption,selectedOptions:this.selectedOptions,multiple:this.multiple,renderTag:this.renderTag,renderLabel:this.renderLabel,filterable:this.filterable,clearable:this.clearable,disabled:this.mergedDisabled,size:this.mergedSize,theme:this.mergedTheme.peers.InternalSelection,labelField:this.labelField,valueField:this.valueField,themeOverrides:this.mergedTheme.peerOverrides.InternalSelection,loading:this.loading,focused:this.focused,onClick:this.handleTriggerClick,onDeleteOption:this.handleDeleteOption,onPatternInput:this.handlePatternInput,onClear:this.handleClear,onBlur:this.handleTriggerBlur,onFocus:this.handleTriggerFocus,onKeydown:this.handleKeydown,onPatternBlur:this.onTriggerInputBlur,onPatternFocus:this.onTriggerInputFocus,onResize:this.handleTriggerOrMenuResize,ignoreComposition:this.ignoreComposition},{arrow:()=>{var e;return[(e=this.$slots).arrow?.call(e)]}})}),$(Se,{ref:`followerRef`,show:this.mergedShow,to:this.adjustedTo,teleportDisabled:this.adjustedTo===De.tdkey,containerClass:this.namespace,width:this.consistentMenuWidth?`target`:void 0,minWidth:`target`,placement:this.placement},{default:()=>$(fe,{name:`fade-in-scale-up-transition`,appear:this.isMounted,onAfterLeave:this.handleMenuAfterLeave},{default:()=>{var e;return this.mergedShow||this.displayDirective===`show`?((e=this.onRender)==null||e.call(this),te($(jn,Object.assign({},this.menuProps,{ref:`menuRef`,onResize:this.handleTriggerOrMenuResize,inlineThemeDisabled:this.inlineThemeDisabled,virtualScroll:this.consistentMenuWidth&&this.virtualScroll,class:[`${this.mergedClsPrefix}-select-menu`,this.themeClass,this.menuProps?.class],clsPrefix:this.mergedClsPrefix,focusable:!0,labelField:this.labelField,valueField:this.valueField,autoPending:!0,nodeProps:this.nodeProps,theme:this.mergedTheme.peers.InternalSelectMenu,themeOverrides:this.mergedTheme.peerOverrides.InternalSelectMenu,treeMate:this.treeMate,multiple:this.multiple,size:this.menuSize,renderOption:this.renderOption,renderLabel:this.renderLabel,value:this.mergedValue,style:[this.menuProps?.style,this.cssVars],onToggle:this.handleToggle,onScroll:this.handleMenuScroll,onFocus:this.handleMenuFocus,onBlur:this.handleMenuBlur,onKeydown:this.handleMenuKeydown,onTabOut:this.handleMenuTabOut,onMousedown:this.handleMenuMousedown,show:this.mergedShow,showCheckmark:this.showCheckmark,resetMenuOnOptionsChange:this.resetMenuOnOptionsChange,scrollbarProps:this.scrollbarProps}),{empty:()=>{var e;return[(e=this.$slots).empty?.call(e)]},header:()=>{var e;return[(e=this.$slots).header?.call(e)]},action:()=>{var e;return[(e=this.$slots).action?.call(e)]}}),this.displayDirective===`show`?[[D,this.mergedShow],[Ae,this.handleMenuClickOutside,void 0,{capture:!0}]]:[[Ae,this.handleMenuClickOutside,void 0,{capture:!0}]])):null}})})]}))}}),Xn=`
 background: var(--n-item-color-hover);
 color: var(--n-item-text-color-hover);
 border: var(--n-item-border-hover);
`,Zn=[H(`button`,`
 background: var(--n-button-color-hover);
 border: var(--n-button-border-hover);
 color: var(--n-button-icon-color-hover);
 `)],Qn=B(`pagination`,`
 display: flex;
 vertical-align: middle;
 font-size: var(--n-item-font-size);
 flex-wrap: nowrap;
`,[B(`pagination-prefix`,`
 display: flex;
 align-items: center;
 margin: var(--n-prefix-margin);
 `),B(`pagination-suffix`,`
 display: flex;
 align-items: center;
 margin: var(--n-suffix-margin);
 `),X(`> *:not(:first-child)`,`
 margin: var(--n-item-margin);
 `),B(`select`,`
 width: var(--n-select-width);
 `),X(`&.transition-disabled`,[B(`pagination-item`,`transition: none!important;`)]),B(`pagination-quick-jumper`,`
 white-space: nowrap;
 display: flex;
 color: var(--n-jumper-text-color);
 transition: color .3s var(--n-bezier);
 align-items: center;
 font-size: var(--n-jumper-font-size);
 `,[B(`input`,`
 margin: var(--n-input-margin);
 width: var(--n-input-width);
 `)]),B(`pagination-item`,`
 position: relative;
 cursor: pointer;
 user-select: none;
 -webkit-user-select: none;
 display: flex;
 align-items: center;
 justify-content: center;
 box-sizing: border-box;
 min-width: var(--n-item-size);
 height: var(--n-item-size);
 padding: var(--n-item-padding);
 background-color: var(--n-item-color);
 color: var(--n-item-text-color);
 border-radius: var(--n-item-border-radius);
 border: var(--n-item-border);
 fill: var(--n-button-icon-color);
 transition:
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 fill .3s var(--n-bezier);
 `,[H(`button`,`
 background: var(--n-button-color);
 color: var(--n-button-icon-color);
 border: var(--n-button-border);
 padding: 0;
 `,[B(`base-icon`,`
 font-size: var(--n-button-icon-size);
 `)]),U(`disabled`,[H(`hover`,Xn,Zn),X(`&:hover`,Xn,Zn),X(`&:active`,`
 background: var(--n-item-color-pressed);
 color: var(--n-item-text-color-pressed);
 border: var(--n-item-border-pressed);
 `,[H(`button`,`
 background: var(--n-button-color-pressed);
 border: var(--n-button-border-pressed);
 color: var(--n-button-icon-color-pressed);
 `)]),H(`active`,`
 background: var(--n-item-color-active);
 color: var(--n-item-text-color-active);
 border: var(--n-item-border-active);
 `,[X(`&:hover`,`
 background: var(--n-item-color-active-hover);
 `)])]),H(`disabled`,`
 cursor: not-allowed;
 color: var(--n-item-text-color-disabled);
 `,[H(`active, button`,`
 background-color: var(--n-item-color-disabled);
 border: var(--n-item-border-disabled);
 `)])]),H(`disabled`,`
 cursor: not-allowed;
 `,[B(`pagination-quick-jumper`,`
 color: var(--n-jumper-text-color-disabled);
 `)]),H(`simple`,`
 display: flex;
 align-items: center;
 flex-wrap: nowrap;
 `,[B(`pagination-quick-jumper`,[B(`input`,`
 margin: 0;
 `)])])]);function $n(e){if(!e)return 10;let{defaultPageSize:t}=e;if(t!==void 0)return t;let n=e.pageSizes?.[0];return typeof n==`number`?n:n?.value||10}function er(e,t,n,r){let i=!1,a=!1,o=1,s=t;if(t===1)return{hasFastBackward:!1,hasFastForward:!1,fastForwardTo:s,fastBackwardTo:o,items:[{type:`page`,label:1,active:e===1,mayBeFastBackward:!1,mayBeFastForward:!1}]};if(t===2)return{hasFastBackward:!1,hasFastForward:!1,fastForwardTo:s,fastBackwardTo:o,items:[{type:`page`,label:1,active:e===1,mayBeFastBackward:!1,mayBeFastForward:!1},{type:`page`,label:2,active:e===2,mayBeFastBackward:!0,mayBeFastForward:!1}]};let c=t,l=e,u=e,d=(n-5)/2;u+=Math.ceil(d),u=Math.min(Math.max(u,1+n-3),c-2),l-=Math.floor(d),l=Math.max(Math.min(l,c-n+3),3);let f=!1,p=!1;l>3&&(f=!0),u<c-2&&(p=!0);let m=[];m.push({type:`page`,label:1,active:e===1,mayBeFastBackward:!1,mayBeFastForward:!1}),f?(i=!0,o=l-1,m.push({type:`fast-backward`,active:!1,label:void 0,options:r?tr(2,l-1):null})):c>=2&&m.push({type:`page`,label:2,mayBeFastBackward:!0,mayBeFastForward:!1,active:e===2});for(let t=l;t<=u;++t)m.push({type:`page`,label:t,mayBeFastBackward:!1,mayBeFastForward:!1,active:e===t});return p?(a=!0,s=u+1,m.push({type:`fast-forward`,active:!1,label:void 0,options:r?tr(u+1,c-1):null})):u===c-2&&m[m.length-1].label!==c-1&&m.push({type:`page`,mayBeFastForward:!0,mayBeFastBackward:!1,label:c-1,active:e===c-1}),m[m.length-1].label!==c&&m.push({type:`page`,mayBeFastForward:!1,mayBeFastBackward:!1,label:c,active:e===c}),{hasFastBackward:i,hasFastForward:a,fastBackwardTo:o,fastForwardTo:s,items:m}}function tr(e,t){let n=[];for(let r=e;r<=t;++r)n.push({label:`${r}`,value:r});return n}var nr=Object.assign(Object.assign({},m.props),{simple:Boolean,page:Number,defaultPage:{type:Number,default:1},itemCount:Number,pageCount:Number,defaultPageCount:{type:Number,default:1},showSizePicker:Boolean,pageSize:Number,defaultPageSize:Number,pageSizes:{type:Array,default(){return[10]}},showQuickJumper:Boolean,size:String,disabled:Boolean,pageSlot:{type:Number,default:9},selectProps:Object,prev:Function,next:Function,goto:Function,prefix:Function,suffix:Function,label:Function,displayOrder:{type:Array,default:[`pages`,`size-picker`,`quick-jumper`]},to:De.propTo,showQuickJumpDropdown:{type:Boolean,default:!0},scrollbarProps:Object,"onUpdate:page":[Function,Array],onUpdatePage:[Function,Array],"onUpdate:pageSize":[Function,Array],onUpdatePageSize:[Function,Array],onPageSizeChange:[Function,Array],onChange:[Function,Array]}),rr=S({name:`Pagination`,props:nr,slots:Object,setup(e){let{mergedComponentPropsRef:n,mergedClsPrefixRef:r,inlineThemeDisabled:i,mergedRtlRef:a}=Q(e),o=t(()=>e.size||n?.value?.Pagination?.size||`medium`),c=m(`Pagination`,`-pagination`,Qn,nt,e,r),{localeRef:l}=Ue(`Pagination`),u=K(null),f=K(e.defaultPage),p=K($n(e)),g=Ie(W(e,`page`),f),_=Ie(W(e,`pageSize`),p),v=t(()=>{let{itemCount:t}=e;if(t!==void 0)return Math.max(1,Math.ceil(t/_.value));let{pageCount:n}=e;return n===void 0?1:Math.max(n,1)}),y=K(``);ce(()=>{e.simple,y.value=String(g.value)});let b=K(!1),x=K(!1),S=K(!1),C=K(!1),w=()=>{e.disabled||(b.value=!0,R())},T=()=>{e.disabled||(b.value=!1,R())},D=()=>{x.value=!0,R()},O=()=>{x.value=!1,R()},k=e=>{z(e)},A=t(()=>er(g.value,v.value,e.pageSlot,e.showQuickJumpDropdown));ce(()=>{A.value.hasFastBackward?A.value.hasFastForward||(b.value=!1,S.value=!1):(x.value=!1,C.value=!1)});let j=t(()=>{let t=l.value.selectionSuffix;return e.pageSizes.map(e=>typeof e==`number`?{label:`${e} / ${t}`,value:e}:e)}),M=t(()=>n?.value?.Pagination?.inputSize||Ot(o.value)),N=t(()=>n?.value?.Pagination?.selectSize||Ot(o.value)),P=t(()=>(g.value-1)*_.value),F=t(()=>{let t=g.value*_.value-1,{itemCount:n}=e;return n===void 0?t:t>n-1?n-1:t}),I=t(()=>{let{itemCount:t}=e;return t===void 0?(e.pageCount||1)*_.value:t}),L=d(`Pagination`,a,r);function R(){h(()=>{var e;let{value:t}=u;t&&(t.classList.add(`transition-disabled`),(e=u.value)==null||e.offsetWidth,t.classList.remove(`transition-disabled`))})}function z(t){if(t===g.value)return;let{"onUpdate:page":n,onUpdatePage:r,onChange:i,simple:a}=e;n&&E(n,t),r&&E(r,t),i&&E(i,t),f.value=t,a&&(y.value=String(t))}function ee(t){if(t===_.value)return;let{"onUpdate:pageSize":n,onUpdatePageSize:r,onPageSizeChange:i}=e;n&&E(n,t),r&&E(r,t),i&&E(i,t),p.value=t,v.value<g.value&&z(v.value)}function te(){e.disabled||z(Math.min(g.value+1,v.value))}function B(){e.disabled||z(Math.max(g.value-1,1))}function V(){e.disabled||z(Math.min(A.value.fastForwardTo,v.value))}function H(){e.disabled||z(Math.max(A.value.fastBackwardTo,1))}function U(e){ee(e)}function ne(){let t=Number.parseInt(y.value);Number.isNaN(t)||(z(Math.max(1,Math.min(t,v.value))),e.simple||(y.value=``))}function re(){ne()}function G(t){if(!e.disabled)switch(t.type){case`page`:z(t.label);break;case`fast-backward`:H();break;case`fast-forward`:V()}}function ie(e){y.value=e.replace(/\D+/g,``)}ce(()=>{g.value,_.value,R()});let ae=t(()=>{let e=o.value,{self:{buttonBorder:t,buttonBorderHover:n,buttonBorderPressed:r,buttonIconColor:i,buttonIconColorHover:a,buttonIconColorPressed:s,itemTextColor:l,itemTextColorHover:u,itemTextColorPressed:d,itemTextColorActive:f,itemTextColorDisabled:p,itemColor:m,itemColorHover:h,itemColorPressed:g,itemColorActive:_,itemColorActiveHover:v,itemColorDisabled:y,itemBorder:b,itemBorderHover:x,itemBorderPressed:S,itemBorderActive:C,itemBorderDisabled:w,itemBorderRadius:T,jumperTextColor:E,jumperTextColorDisabled:D,buttonColor:O,buttonColorHover:k,buttonColorPressed:A,[J(`itemPadding`,e)]:j,[J(`itemMargin`,e)]:M,[J(`inputWidth`,e)]:N,[J(`selectWidth`,e)]:P,[J(`inputMargin`,e)]:F,[J(`selectMargin`,e)]:I,[J(`jumperFontSize`,e)]:L,[J(`prefixMargin`,e)]:R,[J(`suffixMargin`,e)]:z,[J(`itemSize`,e)]:ee,[J(`buttonIconSize`,e)]:te,[J(`itemFontSize`,e)]:B,[`${J(`itemMargin`,e)}Rtl`]:V,[`${J(`inputMargin`,e)}Rtl`]:H},common:{cubicBezierEaseInOut:U}}=c.value;return{"--n-prefix-margin":R,"--n-suffix-margin":z,"--n-item-font-size":B,"--n-select-width":P,"--n-select-margin":I,"--n-input-width":N,"--n-input-margin":F,"--n-input-margin-rtl":H,"--n-item-size":ee,"--n-item-text-color":l,"--n-item-text-color-disabled":p,"--n-item-text-color-hover":u,"--n-item-text-color-active":f,"--n-item-text-color-pressed":d,"--n-item-color":m,"--n-item-color-hover":h,"--n-item-color-disabled":y,"--n-item-color-active":_,"--n-item-color-active-hover":v,"--n-item-color-pressed":g,"--n-item-border":b,"--n-item-border-hover":x,"--n-item-border-disabled":w,"--n-item-border-active":C,"--n-item-border-pressed":S,"--n-item-padding":j,"--n-item-border-radius":T,"--n-bezier":U,"--n-jumper-font-size":L,"--n-jumper-text-color":E,"--n-jumper-text-color-disabled":D,"--n-item-margin":M,"--n-item-margin-rtl":V,"--n-button-icon-size":te,"--n-button-icon-color":i,"--n-button-icon-color-hover":a,"--n-button-icon-color-pressed":s,"--n-button-color-hover":k,"--n-button-color":O,"--n-button-color-pressed":A,"--n-button-border":t,"--n-button-border-hover":n,"--n-button-border-pressed":r}}),q=i?s(`pagination`,t(()=>{let e=``;return e+=o.value[0],e}),ae,e):void 0;return{rtlEnabled:L,mergedClsPrefix:r,locale:l,selfRef:u,mergedPage:g,pageItems:t(()=>A.value.items),mergedItemCount:I,jumperValue:y,pageSizeOptions:j,mergedPageSize:_,inputSize:M,selectSize:N,mergedTheme:c,mergedPageCount:v,startIndex:P,endIndex:F,showFastForwardMenu:S,showFastBackwardMenu:C,fastForwardActive:b,fastBackwardActive:x,handleMenuSelect:k,handleFastForwardMouseenter:w,handleFastForwardMouseleave:T,handleFastBackwardMouseenter:D,handleFastBackwardMouseleave:O,handleJumperInput:ie,handleBackwardClick:B,handleForwardClick:te,handlePageItemClick:G,handleSizePickerChange:U,handleQuickJumperChange:re,cssVars:i?void 0:ae,themeClass:q?.themeClass,onRender:q?.onRender}},render(){let{$slots:e,mergedClsPrefix:t,disabled:i,cssVars:a,mergedPage:o,mergedPageCount:s,pageItems:c,showSizePicker:u,showQuickJumper:d,mergedTheme:f,locale:p,inputSize:m,selectSize:h,mergedPageSize:g,pageSizeOptions:_,jumperValue:v,simple:y,prev:b,next:x,prefix:S,suffix:C,label:w,goto:T,handleJumperInput:E,handleSizePickerChange:D,handleBackwardClick:O,handlePageItemClick:k,handleForwardClick:A,handleQuickJumperChange:j,onRender:M}=this;M?.();let N=S||e.prefix,P=C||e.suffix,F=b||e.prev,I=x||e.next,L=w||e.label;return $(`div`,{ref:`selfRef`,class:[`${t}-pagination`,this.themeClass,this.rtlEnabled&&`${t}-pagination--rtl`,i&&`${t}-pagination--disabled`,y&&`${t}-pagination--simple`],style:a},N?$(`div`,{class:`${t}-pagination-prefix`},N({page:o,pageSize:g,pageCount:s,startIndex:this.startIndex,endIndex:this.endIndex,itemCount:this.mergedItemCount})):null,this.displayOrder.map(e=>{switch(e){case`pages`:return $(l,null,$(`div`,{class:[`${t}-pagination-item`,!F&&`${t}-pagination-item--button`,(o<=1||o>s||i)&&`${t}-pagination-item--disabled`],onClick:O},F?F({page:o,pageSize:g,pageCount:s,startIndex:this.startIndex,endIndex:this.endIndex,itemCount:this.mergedItemCount}):$(r,{clsPrefix:t},{default:()=>this.rtlEnabled?$(zt,null):$(Mt,null)})),y?$(l,null,$(`div`,{class:`${t}-pagination-quick-jumper`},$(Ke,{value:v,onUpdateValue:E,size:m,placeholder:``,disabled:i,theme:f.peers.Input,themeOverrides:f.peerOverrides.Input,onChange:j})),`\xA0/`,` `,s):c.map((e,n)=>{let a,o,s,{type:c}=e;switch(c){case`page`:let n=e.label;a=L?L({type:`page`,node:n,active:e.active}):n;break;case`fast-forward`:let i=this.fastForwardActive?$(r,{clsPrefix:t},{default:()=>this.rtlEnabled?$(It,null):$(Lt,null)}):$(r,{clsPrefix:t},{default:()=>$(Bt,null)});a=L?L({type:`fast-forward`,node:i,active:this.fastForwardActive||this.showFastForwardMenu}):i,o=this.handleFastForwardMouseenter,s=this.handleFastForwardMouseleave;break;case`fast-backward`:let c=this.fastBackwardActive?$(r,{clsPrefix:t},{default:()=>this.rtlEnabled?$(Lt,null):$(It,null)}):$(r,{clsPrefix:t},{default:()=>$(Bt,null)});a=L?L({type:`fast-backward`,node:c,active:this.fastBackwardActive||this.showFastBackwardMenu}):c,o=this.handleFastBackwardMouseenter,s=this.handleFastBackwardMouseleave}let l=$(`div`,{key:n,class:[`${t}-pagination-item`,e.active&&`${t}-pagination-item--active`,c!==`page`&&(c===`fast-backward`&&this.showFastBackwardMenu||c===`fast-forward`&&this.showFastForwardMenu)&&`${t}-pagination-item--hover`,i&&`${t}-pagination-item--disabled`,c===`page`&&`${t}-pagination-item--clickable`],onClick:()=>{k(e)},onMouseenter:o,onMouseleave:s},a);if(c===`page`&&!e.mayBeFastBackward&&!e.mayBeFastForward)return l;{let t=e.type===`page`?e.mayBeFastBackward?`fast-backward`:`fast-forward`:e.type;return e.type!==`page`&&!e.options?l:$(Kn,{to:this.to,key:t,disabled:i,trigger:`hover`,virtualScroll:!0,style:{width:`60px`},theme:f.peers.Popselect,themeOverrides:f.peerOverrides.Popselect,builtinThemeOverrides:{peers:{InternalSelectMenu:{height:`calc(var(--n-option-height) * 4.6)`}}},nodeProps:()=>({style:{justifyContent:`center`}}),show:c===`page`?!1:c===`fast-backward`?this.showFastBackwardMenu:this.showFastForwardMenu,onUpdateShow:e=>{c!==`page`&&(e?c===`fast-backward`?this.showFastBackwardMenu=e:this.showFastForwardMenu=e:(this.showFastBackwardMenu=!1,this.showFastForwardMenu=!1))},options:e.type!==`page`&&e.options?e.options:[],onUpdateValue:this.handleMenuSelect,scrollable:!0,scrollbarProps:this.scrollbarProps,showCheckmark:!1},{default:()=>l})}}),$(`div`,{class:[`${t}-pagination-item`,!I&&`${t}-pagination-item--button`,{[`${t}-pagination-item--disabled`]:o<1||o>=s||i}],onClick:A},I?I({page:o,pageSize:g,pageCount:s,itemCount:this.mergedItemCount,startIndex:this.startIndex,endIndex:this.endIndex}):$(r,{clsPrefix:t},{default:()=>this.rtlEnabled?$(Mt,null):$(zt,null)})));case`size-picker`:return!y&&u?$(Yn,Object.assign({consistentMenuWidth:!1,placeholder:``,showCheckmark:!1,to:this.to},this.selectProps,{size:h,options:_,value:g,disabled:i,scrollbarProps:this.scrollbarProps,theme:f.peers.Select,themeOverrides:f.peerOverrides.Select,onUpdateValue:D})):null;case`quick-jumper`:return!y&&d?$(`div`,{class:`${t}-pagination-quick-jumper`},T?T():n(this.$slots.goto,()=>[p.goto]),$(Ke,{value:v,onUpdateValue:E,size:m,placeholder:``,disabled:i,theme:f.peers.Input,themeOverrides:f.peerOverrides.Input,onChange:j})):null;default:return null}}),P?$(`div`,{class:`${t}-pagination-suffix`},P({page:o,pageSize:g,pageCount:s,startIndex:this.startIndex,endIndex:this.endIndex,itemCount:this.mergedItemCount})):null)}}),ir=Object.assign(Object.assign({},m.props),{onUnstableColumnResize:Function,pagination:{type:[Object,Boolean],default:!1},paginateSinglePage:{type:Boolean,default:!0},minHeight:[Number,String],maxHeight:[Number,String],columns:{type:Array,default:()=>[]},rowClassName:[String,Function],rowProps:Function,rowKey:Function,summary:[Function],data:{type:Array,default:()=>[]},loading:Boolean,bordered:{type:Boolean,default:void 0},bottomBordered:{type:Boolean,default:void 0},striped:Boolean,scrollX:[Number,String],defaultCheckedRowKeys:{type:Array,default:()=>[]},checkedRowKeys:Array,singleLine:{type:Boolean,default:!0},singleColumn:Boolean,size:String,remote:Boolean,defaultExpandedRowKeys:{type:Array,default:[]},defaultExpandAll:Boolean,expandedRowKeys:Array,stickyExpandedRows:Boolean,virtualScroll:Boolean,virtualScrollX:Boolean,virtualScrollHeader:Boolean,headerHeight:{type:Number,default:28},heightForRow:Function,minRowHeight:{type:Number,default:28},tableLayout:{type:String,default:`auto`},allowCheckingNotLoaded:Boolean,cascade:{type:Boolean,default:!0},childrenKey:{type:String,default:`children`},indent:{type:Number,default:16},flexHeight:Boolean,summaryPlacement:{type:String,default:`bottom`},paginationBehaviorOnFilter:{type:String,default:`current`},filterIconPopoverProps:Object,scrollbarProps:Object,renderCell:Function,renderExpandIcon:Function,spinProps:Object,getCsvCell:Function,getCsvHeader:Function,onLoad:Function,"onUpdate:page":[Function,Array],onUpdatePage:[Function,Array],"onUpdate:pageSize":[Function,Array],onUpdatePageSize:[Function,Array],"onUpdate:sorter":[Function,Array],onUpdateSorter:[Function,Array],"onUpdate:filters":[Function,Array],onUpdateFilters:[Function,Array],"onUpdate:checkedRowKeys":[Function,Array],onUpdateCheckedRowKeys:[Function,Array],"onUpdate:expandedRowKeys":[Function,Array],onUpdateExpandedRowKeys:[Function,Array],onScroll:Function,onPageChange:[Function,Array],onPageSizeChange:[Function,Array],onSorterChange:[Function,Array],onFiltersChange:[Function,Array],onCheckedRowKeysChange:[Function,Array]}),ar=F(`n-data-table`);function or(e){if(e.type===`selection`||e.type===`expand`)return e.width===void 0?40:ue(e.width);if(!(`children`in e))return typeof e.width==`string`?ue(e.width):e.width}function sr(e){if(e.type===`selection`||e.type===`expand`)return C(e.width??40);if(!(`children`in e))return C(e.width)}function cr(e){return e.type===`selection`?`__n_selection__`:e.type===`expand`?`__n_expand__`:e.key}function lr(e){return e&&(typeof e==`object`?Object.assign({},e):e)}function ur(e){return e===`ascend`?1:e===`descend`?-1:0}function dr(e,t,n){return n!==void 0&&(e=Math.min(e,typeof n==`number`?n:Number.parseFloat(n))),t!==void 0&&(e=Math.max(e,typeof t==`number`?t:Number.parseFloat(t))),e}function fr(e,t){if(t!==void 0)return{width:t,minWidth:t,maxWidth:t};let n=sr(e),{minWidth:r,maxWidth:i}=e;return{width:n,minWidth:C(r)||n,maxWidth:C(i)}}function pr(e,t,n){return typeof n==`function`?n(e,t):n||``}function mr(e){return e.filterOptionValues!==void 0||e.filterOptionValue===void 0&&e.defaultFilterOptionValues!==void 0}function hr(e){return`children`in e?!1:!!e.sorter}function gr(e){return`children`in e&&e.children.length?!1:!!e.resizable}function _r(e){return`children`in e?!1:!!e.filter&&(!!e.filterOptions||!!e.renderFilterMenu)}function vr(e){return e?e===`descend`&&`ascend`:`descend`}function yr(e,t){if(e.sorter===void 0)return null;let{customNextSortOrder:n}=e;return t===null||t.columnKey!==e.key?{columnKey:e.key,sorter:e.sorter,order:vr(!1)}:Object.assign(Object.assign({},t),{order:(n||vr)(t.order)})}function br(e,t){return t.find(t=>t.columnKey===e.key&&t.order)!==void 0}function xr(e){return typeof e==`string`?e.replace(/,/g,`\\,`):e==null?``:`${e}`.replace(/,/g,`\\,`)}function Sr(e,t,n,r){let i=e.filter(e=>e.type!==`expand`&&e.type!==`selection`&&e.allowExport!==!1);return[i.map(e=>r?r(e):e.title).join(`,`),...t.map(e=>i.map(t=>n?n(e[t.key],e,t):xr(e[t.key])).join(`,`))].join(`
`)}var Cr=S({name:`DataTableBodyCheckbox`,props:{rowKey:{type:[String,Number],required:!0},disabled:{type:Boolean,required:!0},onUpdateChecked:{type:Function,required:!0}},setup(e){let{mergedCheckedRowKeySetRef:t,mergedInderminateRowKeySetRef:n}=i(ar);return()=>{let{rowKey:r}=e;return $(ot,{privateInsideTable:!0,disabled:e.disabled,indeterminate:n.value.has(r),checked:t.value.has(r),onUpdateChecked:e.onUpdateChecked})}}}),wr=B(`radio`,`
 line-height: var(--n-label-line-height);
 outline: none;
 position: relative;
 user-select: none;
 -webkit-user-select: none;
 display: inline-flex;
 align-items: flex-start;
 flex-wrap: nowrap;
 font-size: var(--n-font-size);
 word-break: break-word;
`,[H(`checked`,[Z(`dot`,`
 background-color: var(--n-color-active);
 `)]),Z(`dot-wrapper`,`
 position: relative;
 flex-shrink: 0;
 flex-grow: 0;
 width: var(--n-radio-size);
 `),B(`radio-input`,`
 position: absolute;
 border: 0;
 width: 0;
 height: 0;
 opacity: 0;
 margin: 0;
 `),Z(`dot`,`
 position: absolute;
 top: 50%;
 left: 0;
 transform: translateY(-50%);
 height: var(--n-radio-size);
 width: var(--n-radio-size);
 background: var(--n-color);
 box-shadow: var(--n-box-shadow);
 border-radius: 50%;
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 `,[X(`&::before`,`
 content: "";
 opacity: 0;
 position: absolute;
 left: 4px;
 top: 4px;
 height: calc(100% - 8px);
 width: calc(100% - 8px);
 border-radius: 50%;
 transform: scale(.8);
 background: var(--n-dot-color-active);
 transition: 
 opacity .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 transform .3s var(--n-bezier);
 `),H(`checked`,{boxShadow:`var(--n-box-shadow-active)`},[X(`&::before`,`
 opacity: 1;
 transform: scale(1);
 `)])]),Z(`label`,`
 color: var(--n-text-color);
 padding: var(--n-label-padding);
 font-weight: var(--n-label-font-weight);
 display: inline-block;
 transition: color .3s var(--n-bezier);
 `),U(`disabled`,`
 cursor: pointer;
 `,[X(`&:hover`,[Z(`dot`,{boxShadow:`var(--n-box-shadow-hover)`})]),H(`focus`,[X(`&:not(:active)`,[Z(`dot`,{boxShadow:`var(--n-box-shadow-focus)`})])])]),H(`disabled`,`
 cursor: not-allowed;
 `,[Z(`dot`,{boxShadow:`var(--n-box-shadow-disabled)`,backgroundColor:`var(--n-color-disabled)`},[X(`&::before`,{backgroundColor:`var(--n-dot-color-disabled)`}),H(`checked`,`
 opacity: 1;
 `)]),Z(`label`,{color:`var(--n-text-color-disabled)`}),B(`radio-input`,`
 cursor: not-allowed;
 `)])]),Tr={name:String,value:{type:[String,Number,Boolean],default:`on`},checked:{type:Boolean,default:void 0},defaultChecked:Boolean,disabled:{type:Boolean,default:void 0},label:String,size:String,onUpdateChecked:[Function,Array],"onUpdate:checked":[Function,Array],checkedValue:{type:Boolean,default:void 0}},Er=F(`n-radio-group`);function Dr(e){let t=i(Er,null),{mergedClsPrefixRef:n,mergedComponentPropsRef:r}=Q(e),a=O(e,{mergedSize(n){let{size:i}=e;if(i!==void 0)return i;if(t){let{mergedSizeRef:{value:e}}=t;if(e!==void 0)return e}return n?n.mergedSize.value:r?.value?.Radio?.size||`medium`},mergedDisabled(n){return!!(e.disabled||t?.disabledRef.value||n?.disabled.value)}}),{mergedSizeRef:o,mergedDisabledRef:s}=a,c=K(null),l=K(null),u=K(e.defaultChecked),d=W(e,`checked`),f=Ie(d,u),p=x(()=>t?t.valueRef.value===e.value:f.value),m=x(()=>{let{name:n}=e;if(n!==void 0)return n;if(t)return t.nameRef.value}),h=K(!1);function g(){if(t){let{doUpdateValue:n}=t,{value:r}=e;E(n,r)}else{let{onUpdateChecked:t,"onUpdate:checked":n}=e,{nTriggerFormInput:r,nTriggerFormChange:i}=a;t&&E(t,!0),n&&E(n,!0),r(),i(),u.value=!0}}function _(){s.value||p.value||g()}function v(){_(),c.value&&(c.value.checked=p.value)}function y(){h.value=!1}function b(){h.value=!0}return{mergedClsPrefix:t?t.mergedClsPrefixRef:n,inputRef:c,labelRef:l,mergedName:m,mergedDisabled:s,renderSafeChecked:p,focus:h,mergedSize:o,handleRadioInputChange:v,handleRadioInputBlur:y,handleRadioInputFocus:b}}var Or=Object.assign(Object.assign({},m.props),Tr),kr=S({name:`Radio`,props:Or,setup(e){let n=Dr(e),r=m(`Radio`,`-radio`,wr,et,e,n.mergedClsPrefix),i=t(()=>{let{mergedSize:{value:e}}=n,{common:{cubicBezierEaseInOut:t},self:{boxShadow:i,boxShadowActive:a,boxShadowDisabled:o,boxShadowFocus:s,boxShadowHover:c,color:l,colorDisabled:u,colorActive:d,textColor:f,textColorDisabled:p,dotColorActive:m,dotColorDisabled:h,labelPadding:g,labelLineHeight:_,labelFontWeight:v,[J(`fontSize`,e)]:y,[J(`radioSize`,e)]:b}}=r.value;return{"--n-bezier":t,"--n-label-line-height":_,"--n-label-font-weight":v,"--n-box-shadow":i,"--n-box-shadow-active":a,"--n-box-shadow-disabled":o,"--n-box-shadow-focus":s,"--n-box-shadow-hover":c,"--n-color":l,"--n-color-active":d,"--n-color-disabled":u,"--n-dot-color-active":m,"--n-dot-color-disabled":h,"--n-font-size":y,"--n-radio-size":b,"--n-text-color":f,"--n-text-color-disabled":p,"--n-label-padding":g}}),{inlineThemeDisabled:a,mergedClsPrefixRef:o,mergedRtlRef:c}=Q(e),l=d(`Radio`,c,o),u=a?s(`radio`,t(()=>n.mergedSize.value[0]),i,e):void 0;return Object.assign(n,{rtlEnabled:l,cssVars:a?void 0:i,themeClass:u?.themeClass,onRender:u?.onRender})},render(){let{$slots:e,mergedClsPrefix:t,onRender:n,label:r}=this;return n?.(),$(`label`,{class:[`${t}-radio`,this.themeClass,this.rtlEnabled&&`${t}-radio--rtl`,this.mergedDisabled&&`${t}-radio--disabled`,this.renderSafeChecked&&`${t}-radio--checked`,this.focus&&`${t}-radio--focus`],style:this.cssVars},$(`div`,{class:`${t}-radio__dot-wrapper`},`\xA0`,$(`div`,{class:[`${t}-radio__dot`,this.renderSafeChecked&&`${t}-radio__dot--checked`]}),$(`input`,{ref:`inputRef`,type:`radio`,class:`${t}-radio-input`,value:this.value,name:this.mergedName,checked:this.renderSafeChecked,disabled:this.mergedDisabled,onChange:this.handleRadioInputChange,onFocus:this.handleRadioInputFocus,onBlur:this.handleRadioInputBlur})),w(e.default,e=>!e&&!r?null:$(`div`,{ref:`labelRef`,class:`${t}-radio__label`},e||r)))}}),Ar=B(`radio-group`,`
 display: inline-block;
 font-size: var(--n-font-size);
`,[Z(`splitor`,`
 display: inline-block;
 vertical-align: bottom;
 width: 1px;
 transition:
 background-color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 background: var(--n-button-border-color);
 `,[H(`checked`,{backgroundColor:`var(--n-button-border-color-active)`}),H(`disabled`,{opacity:`var(--n-opacity-disabled)`})]),H(`button-group`,`
 white-space: nowrap;
 height: var(--n-height);
 line-height: var(--n-height);
 `,[B(`radio-button`,{height:`var(--n-height)`,lineHeight:`var(--n-height)`}),Z(`splitor`,{height:`var(--n-height)`})]),B(`radio-button`,`
 vertical-align: bottom;
 outline: none;
 position: relative;
 user-select: none;
 -webkit-user-select: none;
 display: inline-block;
 box-sizing: border-box;
 padding-left: 14px;
 padding-right: 14px;
 white-space: nowrap;
 transition:
 background-color .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 background: var(--n-button-color);
 color: var(--n-button-text-color);
 border-top: 1px solid var(--n-button-border-color);
 border-bottom: 1px solid var(--n-button-border-color);
 `,[B(`radio-input`,`
 pointer-events: none;
 position: absolute;
 border: 0;
 border-radius: inherit;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 opacity: 0;
 z-index: 1;
 `),Z(`state-border`,`
 z-index: 1;
 pointer-events: none;
 position: absolute;
 box-shadow: var(--n-button-box-shadow);
 transition: box-shadow .3s var(--n-bezier);
 left: -1px;
 bottom: -1px;
 right: -1px;
 top: -1px;
 `),X(`&:first-child`,`
 border-top-left-radius: var(--n-button-border-radius);
 border-bottom-left-radius: var(--n-button-border-radius);
 border-left: 1px solid var(--n-button-border-color);
 `,[Z(`state-border`,`
 border-top-left-radius: var(--n-button-border-radius);
 border-bottom-left-radius: var(--n-button-border-radius);
 `)]),X(`&:last-child`,`
 border-top-right-radius: var(--n-button-border-radius);
 border-bottom-right-radius: var(--n-button-border-radius);
 border-right: 1px solid var(--n-button-border-color);
 `,[Z(`state-border`,`
 border-top-right-radius: var(--n-button-border-radius);
 border-bottom-right-radius: var(--n-button-border-radius);
 `)]),U(`disabled`,`
 cursor: pointer;
 `,[X(`&:hover`,[Z(`state-border`,`
 transition: box-shadow .3s var(--n-bezier);
 box-shadow: var(--n-button-box-shadow-hover);
 `),U(`checked`,{color:`var(--n-button-text-color-hover)`})]),H(`focus`,[X(`&:not(:active)`,[Z(`state-border`,{boxShadow:`var(--n-button-box-shadow-focus)`})])])]),H(`checked`,`
 background: var(--n-button-color-active);
 color: var(--n-button-text-color-active);
 border-color: var(--n-button-border-color-active);
 `),H(`disabled`,`
 cursor: not-allowed;
 opacity: var(--n-opacity-disabled);
 `)])]);function jr(e,t,n){let r=[],i=!1;for(let a=0;a<e.length;++a){let o=e[a],s=o.type?.name;s===`RadioButton`&&(i=!0);let c=o.props;if(s!==`RadioButton`){r.push(o);continue}if(a===0)r.push(o);else{let e=r[r.length-1].props,i=t===e.value,a=e.disabled,s=t===c.value,l=c.disabled,u=(i?2:0)+ +!a,d=(s?2:0)+ +!l,f={[`${n}-radio-group__splitor--disabled`]:a,[`${n}-radio-group__splitor--checked`]:i},p={[`${n}-radio-group__splitor--disabled`]:l,[`${n}-radio-group__splitor--checked`]:s},m=u<d?p:f;r.push($(`div`,{class:[`${n}-radio-group__splitor`,m]}),o)}}return{children:r,isButtonGroup:i}}var Mr=Object.assign(Object.assign({},m.props),{name:String,value:[String,Number,Boolean],defaultValue:{type:[String,Number,Boolean],default:null},size:String,disabled:{type:Boolean,default:void 0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array]}),Nr=S({name:`RadioGroup`,props:Mr,setup(e){let n=K(null),{mergedSizeRef:r,mergedDisabledRef:i,nTriggerFormChange:a,nTriggerFormInput:o,nTriggerFormBlur:c,nTriggerFormFocus:l}=O(e),{mergedClsPrefixRef:u,inlineThemeDisabled:f,mergedRtlRef:p}=Q(e),h=m(`Radio`,`-radio-group`,Ar,et,e,u),g=K(e.defaultValue),_=W(e,`value`),v=Ie(_,g);function y(t){let{onUpdateValue:n,"onUpdate:value":r}=e;n&&E(n,t),r&&E(r,t),g.value=t,a(),o()}function b(e){let{value:t}=n;t&&(t.contains(e.relatedTarget)||l())}function x(e){let{value:t}=n;t&&(t.contains(e.relatedTarget)||c())}R(Er,{mergedClsPrefixRef:u,nameRef:W(e,`name`),valueRef:v,disabledRef:i,mergedSizeRef:r,doUpdateValue:y});let S=d(`Radio`,p,u),C=t(()=>{let{value:e}=r,{common:{cubicBezierEaseInOut:t},self:{buttonBorderColor:n,buttonBorderColorActive:i,buttonBorderRadius:a,buttonBoxShadow:o,buttonBoxShadowFocus:s,buttonBoxShadowHover:c,buttonColor:l,buttonColorActive:u,buttonTextColor:d,buttonTextColorActive:f,buttonTextColorHover:p,opacityDisabled:m,[J(`buttonHeight`,e)]:g,[J(`fontSize`,e)]:_}}=h.value;return{"--n-font-size":_,"--n-bezier":t,"--n-button-border-color":n,"--n-button-border-color-active":i,"--n-button-border-radius":a,"--n-button-box-shadow":o,"--n-button-box-shadow-focus":s,"--n-button-box-shadow-hover":c,"--n-button-color":l,"--n-button-color-active":u,"--n-button-text-color":d,"--n-button-text-color-hover":p,"--n-button-text-color-active":f,"--n-height":g,"--n-opacity-disabled":m}}),w=f?s(`radio-group`,t(()=>r.value[0]),C,e):void 0;return{selfElRef:n,rtlEnabled:S,mergedClsPrefix:u,mergedValue:v,handleFocusout:x,handleFocusin:b,cssVars:f?void 0:C,themeClass:w?.themeClass,onRender:w?.onRender}},render(){var e;let{mergedValue:t,mergedClsPrefix:n,handleFocusin:r,handleFocusout:i}=this,{children:a,isButtonGroup:o}=jr(Me(Ve(this)),t,n);return(e=this.onRender)==null||e.call(this),$(`div`,{onFocusin:r,onFocusout:i,ref:`selfElRef`,class:[`${n}-radio-group`,this.rtlEnabled&&`${n}-radio-group--rtl`,this.themeClass,o&&`${n}-radio-group--button-group`],style:this.cssVars},a)}}),Pr=S({name:`DataTableBodyRadio`,props:{rowKey:{type:[String,Number],required:!0},disabled:{type:Boolean,required:!0},onUpdateChecked:{type:Function,required:!0}},setup(e){let{mergedCheckedRowKeySetRef:t,componentId:n}=i(ar);return()=>{let{rowKey:r}=e;return $(kr,{name:n,disabled:e.disabled,checked:t.value.has(r),onUpdateChecked:e.onUpdateChecked})}}}),Fr=Object.assign(Object.assign({},ye),m.props),Ir=S({name:`Tooltip`,props:Fr,slots:Object,__popover__:!0,setup(e){let{mergedClsPrefixRef:n}=Q(e),r=m(`Tooltip`,`-tooltip`,void 0,$e,e,n),i=K(null);return Object.assign(Object.assign({},{syncPosition(){i.value.syncPosition()},setShow(e){i.value.setShow(e)}}),{popoverRef:i,mergedTheme:r,popoverThemeOverrides:t(()=>r.value.self)})},render(){let{mergedTheme:e,internalExtraClass:t}=this;return $(ve,Object.assign(Object.assign({},this.$props),{theme:e.peers.Popover,themeOverrides:e.peerOverrides.Popover,builtinThemeOverrides:this.popoverThemeOverrides,internalExtraClass:t.concat(`tooltip`),ref:`popoverRef`}),this.$slots)}}),Lr=B(`ellipsis`,{overflow:`hidden`},[U(`line-clamp`,`
 white-space: nowrap;
 display: inline-block;
 vertical-align: bottom;
 max-width: 100%;
 `),H(`line-clamp`,`
 display: -webkit-inline-box;
 -webkit-box-orient: vertical;
 `),H(`cursor-pointer`,`
 cursor: pointer;
 `)]);function Rr(e){return`${e}-ellipsis--line-clamp`}function zr(e,t){return`${e}-ellipsis--cursor-${t}`}var Br=Object.assign(Object.assign({},m.props),{expandTrigger:String,lineClamp:[Number,String],tooltip:{type:[Boolean,Object],default:!0}}),Vr=S({name:`Ellipsis`,inheritAttrs:!1,props:Br,slots:Object,setup(e,{slots:n,attrs:r}){let i=k(),a=m(`Ellipsis`,`-ellipsis`,Lr,Je,e,i),o=K(null),s=K(null),c=K(null),l=K(!1),u=t(()=>{let{lineClamp:t}=e,{value:n}=l;return t===void 0?{textOverflow:n?``:`ellipsis`,"-webkit-line-clamp":``}:{textOverflow:``,"-webkit-line-clamp":n?``:t}});function d(){let t=!1,{value:n}=l;if(n)return!0;let{value:r}=o;if(r){let{lineClamp:n}=e;if(h(r),n!==void 0)t=r.scrollHeight<=r.offsetHeight;else{let{value:e}=s;e&&(t=e.getBoundingClientRect().width<=r.getBoundingClientRect().width)}g(r,t)}return t}let f=t(()=>e.expandTrigger===`click`?()=>{var e;let{value:t}=l;t&&((e=c.value)==null||e.setShow(!1)),l.value=!t}:void 0);b(()=>{var t;e.tooltip&&((t=c.value)==null||t.setShow(!1))});let p=()=>$(`span`,Object.assign({},M(r,{class:[`${i.value}-ellipsis`,e.lineClamp===void 0?void 0:Rr(i.value),e.expandTrigger===`click`?zr(i.value,`pointer`):void 0],style:u.value}),{ref:`triggerRef`,onClick:f.value,onMouseenter:e.expandTrigger===`click`?d:void 0}),e.lineClamp?n:$(`span`,{ref:`triggerInnerRef`},n));function h(t){if(!t)return;let n=u.value,r=Rr(i.value);e.lineClamp===void 0?_(t,r,`remove`):_(t,r,`add`);for(let e in n)t.style[e]!==n[e]&&(t.style[e]=n[e])}function g(t,n){let r=zr(i.value,`pointer`);e.expandTrigger===`click`&&!n?_(t,r,`add`):_(t,r,`remove`)}function _(e,t,n){n===`add`?e.classList.contains(t)||e.classList.add(t):e.classList.contains(t)&&e.classList.remove(t)}return{mergedTheme:a,triggerRef:o,triggerInnerRef:s,tooltipRef:c,handleClick:f,renderTrigger:p,getTooltipDisabled:d}},render(){let{tooltip:e,renderTrigger:t,$slots:n}=this;if(e){let{mergedTheme:r}=this;return $(Ir,Object.assign({ref:`tooltipRef`,placement:`top`},e,{getDisabled:this.getTooltipDisabled,theme:r.peers.Tooltip,themeOverrides:r.peerOverrides.Tooltip}),{trigger:t,default:n.tooltip??n.default})}return t()}}),Hr=S({name:`PerformantEllipsis`,props:Br,inheritAttrs:!1,setup(e,{attrs:t,slots:n}){let r=K(!1),i=k();return A(`-ellipsis`,Lr,i),{mouseEntered:r,renderTrigger:()=>{let{lineClamp:a}=e,o=i.value;return $(`span`,Object.assign({},M(t,{class:[`${o}-ellipsis`,a===void 0?void 0:Rr(o),e.expandTrigger===`click`?zr(o,`pointer`):void 0],style:a===void 0?{textOverflow:`ellipsis`}:{"-webkit-line-clamp":a}}),{onMouseenter:()=>{r.value=!0}}),a?n:$(`span`,null,n))}}},render(){return this.mouseEntered?$(Vr,M({},this.$attrs,this.$props),this.$slots):this.renderTrigger()}}),Ur=S({name:`DataTableCell`,props:{clsPrefix:{type:String,required:!0},row:{type:Object,required:!0},index:{type:Number,required:!0},column:{type:Object,required:!0},isSummary:Boolean,mergedTheme:{type:Object,required:!0},renderCell:Function},render(){let{isSummary:e,column:t,row:n,renderCell:r}=this,i,{render:a,key:o,ellipsis:s}=t;if(i=a&&!e?a(n,this.index):e?n[o]?.value:r?r(Fe(n,o),n,t):Fe(n,o),s)if(typeof s==`object`){let{mergedTheme:e}=this;return t.ellipsisComponent===`performant-ellipsis`?$(Hr,Object.assign({},s,{theme:e.peers.Ellipsis,themeOverrides:e.peerOverrides.Ellipsis}),{default:()=>i}):$(Vr,Object.assign({},s,{theme:e.peers.Ellipsis,themeOverrides:e.peerOverrides.Ellipsis}),{default:()=>i})}else return $(`span`,{class:`${this.clsPrefix}-data-table-td__ellipsis`},i);return i}}),Wr=S({name:`DataTableExpandTrigger`,props:{clsPrefix:{type:String,required:!0},expanded:Boolean,loading:Boolean,onClick:{type:Function,required:!0},renderExpandIcon:{type:Function},rowData:{type:Object,required:!0}},render(){let{clsPrefix:e}=this;return $(`div`,{class:[`${e}-data-table-expand-trigger`,this.expanded&&`${e}-data-table-expand-trigger--expanded`],onClick:this.onClick,onMousedown:e=>{e.preventDefault()}},$(pe,null,{default:()=>this.loading?$(ie,{key:`loading`,clsPrefix:this.clsPrefix,radius:85,strokeWidth:15,scale:.88}):this.renderExpandIcon?this.renderExpandIcon({expanded:this.expanded,rowData:this.rowData}):$(r,{clsPrefix:e,key:`base-icon`},{default:()=>$(Pt,null)})}))}}),Gr=S({name:`DataTableFilterMenu`,props:{column:{type:Object,required:!0},radioGroupName:{type:String,required:!0},multiple:{type:Boolean,required:!0},value:{type:[Array,String,Number],default:null},options:{type:Array,required:!0},onConfirm:{type:Function,required:!0},onClear:{type:Function,required:!0},onChange:{type:Function,required:!0}},setup(e){let{mergedClsPrefixRef:n,mergedRtlRef:r}=Q(e),a=d(`DataTable`,r,n),{mergedClsPrefixRef:o,mergedThemeRef:s,localeRef:c}=i(ar),l=K(e.value),u=t(()=>{let{value:e}=l;return Array.isArray(e)?e:null}),f=t(()=>{let{value:t}=l;return mr(e.column)?Array.isArray(t)&&t.length&&t[0]||null:Array.isArray(t)?null:t});function p(t){e.onChange(t)}function m(t){e.multiple&&Array.isArray(t)?l.value=t:mr(e.column)&&!Array.isArray(t)?l.value=[t]:l.value=t}function h(){p(l.value),e.onConfirm()}function g(){e.multiple||mr(e.column)?p([]):p(null),e.onClear()}return{mergedClsPrefix:o,rtlEnabled:a,mergedTheme:s,locale:c,checkboxGroupValue:u,radioGroupValue:f,handleChange:m,handleConfirmClick:h,handleClearClick:g}},render(){let{mergedTheme:e,locale:t,mergedClsPrefix:n}=this;return $(`div`,{class:[`${n}-data-table-filter-menu`,this.rtlEnabled&&`${n}-data-table-filter-menu--rtl`]},$(o,null,{default:()=>{let{checkboxGroupValue:t,handleChange:r}=this;return this.multiple?$(at,{value:t,class:`${n}-data-table-filter-menu__group`,onUpdateValue:r},{default:()=>this.options.map(t=>$(ot,{key:t.value,theme:e.peers.Checkbox,themeOverrides:e.peerOverrides.Checkbox,value:t.value},{default:()=>t.label}))}):$(Nr,{name:this.radioGroupName,class:`${n}-data-table-filter-menu__group`,value:this.radioGroupValue,onUpdateValue:this.handleChange},{default:()=>this.options.map(t=>$(kr,{key:t.value,value:t.value,theme:e.peers.Radio,themeOverrides:e.peerOverrides.Radio},{default:()=>t.label}))})}}),$(`div`,{class:`${n}-data-table-filter-menu__action`},$(z,{size:`tiny`,theme:e.peers.Button,themeOverrides:e.peerOverrides.Button,onClick:this.handleClearClick},{default:()=>t.clear}),$(z,{theme:e.peers.Button,themeOverrides:e.peerOverrides.Button,type:`primary`,size:`tiny`,onClick:this.handleConfirmClick},{default:()=>t.confirm})))}}),Kr=S({name:`DataTableRenderFilter`,props:{render:{type:Function,required:!0},active:{type:Boolean,default:!1},show:{type:Boolean,default:!1}},render(){let{render:e,active:t,show:n}=this;return e({active:t,show:n})}});function qr(e,t,n){let r=Object.assign({},e);return r[t]=n,r}var Jr=S({name:`DataTableFilterButton`,props:{column:{type:Object,required:!0},options:{type:Array,default:()=>[]}},setup(e){let{mergedComponentPropsRef:n}=Q(),{mergedThemeRef:r,mergedClsPrefixRef:a,mergedFilterStateRef:o,filterMenuCssVarsRef:s,paginationBehaviorOnFilterRef:c,doUpdatePage:l,doUpdateFilters:u,filterIconPopoverPropsRef:d}=i(ar),f=K(!1),p=o,m=t(()=>e.column.filterMultiple!==!1),h=t(()=>{let t=p.value[e.column.key];if(t===void 0){let{value:e}=m;return e?[]:null}return t}),g=t(()=>{let{value:e}=h;return Array.isArray(e)?e.length>0:e!==null}),_=t(()=>n?.value?.DataTable?.renderFilter||e.column.renderFilter);function v(t){let n=qr(p.value,e.column.key,t);u(n,e.column),c.value===`first`&&l(1)}function y(){f.value=!1}function b(){f.value=!1}return{mergedTheme:r,mergedClsPrefix:a,active:g,showPopover:f,mergedRenderFilter:_,filterIconPopoverProps:d,filterMultiple:m,mergedFilterValue:h,filterMenuCssVars:s,handleFilterChange:v,handleFilterMenuConfirm:b,handleFilterMenuCancel:y}},render(){let{mergedTheme:e,mergedClsPrefix:t,handleFilterMenuCancel:n,filterIconPopoverProps:i}=this;return $(ve,Object.assign({show:this.showPopover,onUpdateShow:e=>this.showPopover=e,trigger:`click`,theme:e.peers.Popover,themeOverrides:e.peerOverrides.Popover,placement:`bottom`},i,{style:{padding:0}}),{trigger:()=>{let{mergedRenderFilter:e}=this;if(e)return $(Kr,{"data-data-table-filter":!0,render:e,active:this.active,show:this.showPopover});let{renderFilterIcon:n}=this.column;return $(`div`,{"data-data-table-filter":!0,class:[`${t}-data-table-filter`,{[`${t}-data-table-filter--active`]:this.active,[`${t}-data-table-filter--show`]:this.showPopover}]},n?n({active:this.active,show:this.showPopover}):$(r,{clsPrefix:t},{default:()=>$(Rt,null)}))},default:()=>{let{renderFilterMenu:e}=this.column;return e?e({hide:n}):$(Gr,{style:this.filterMenuCssVars,radioGroupName:String(this.column.key),multiple:this.filterMultiple,value:this.mergedFilterValue,options:this.options,column:this.column,onChange:this.handleFilterChange,onClear:this.handleFilterMenuCancel,onConfirm:this.handleFilterMenuConfirm})}})}}),Yr=S({name:`ColumnResizeButton`,props:{onResizeStart:Function,onResize:Function,onResizeEnd:Function},setup(e){let{mergedClsPrefixRef:t}=i(ar),n=K(!1),r=0;function a(e){return e.clientX}function o(t){var i;t.preventDefault();let o=n.value;r=a(t),n.value=!0,o||(v(`mousemove`,window,s),v(`mouseup`,window,c),(i=e.onResizeStart)==null||i.call(e))}function s(t){var n;(n=e.onResize)==null||n.call(e,a(t)-r)}function c(){var t;n.value=!1,(t=e.onResizeEnd)==null||t.call(e),Y(`mousemove`,window,s),Y(`mouseup`,window,c)}return f(()=>{Y(`mousemove`,window,s),Y(`mouseup`,window,c)}),{mergedClsPrefix:t,active:n,handleMousedown:o}},render(){let{mergedClsPrefix:e}=this;return $(`span`,{"data-data-table-resizable":!0,class:[`${e}-data-table-resize-button`,this.active&&`${e}-data-table-resize-button--active`],onMousedown:this.handleMousedown})}}),Xr=S({name:`DataTableRenderSorter`,props:{render:{type:Function,required:!0},order:{type:[String,Boolean],default:!1}},render(){let{render:e,order:t}=this;return e({order:t})}}),Zr=S({name:`SortIcon`,props:{column:{type:Object,required:!0}},setup(e){let{mergedComponentPropsRef:n}=Q(),{mergedSortStateRef:r,mergedClsPrefixRef:a}=i(ar),o=t(()=>r.value.find(t=>t.columnKey===e.column.key)),s=t(()=>o.value!==void 0);return{mergedClsPrefix:a,active:s,mergedSortOrder:t(()=>{let{value:e}=o;return e&&s.value?e.order:!1}),mergedRenderSorter:t(()=>n?.value?.DataTable?.renderSorter||e.column.renderSorter)}},render(){let{mergedRenderSorter:e,mergedSortOrder:t,mergedClsPrefix:n}=this,{renderSorterIcon:i}=this.column;return e?$(Xr,{render:e,order:t}):$(`span`,{class:[`${n}-data-table-sorter`,t===`ascend`&&`${n}-data-table-sorter--asc`,t===`descend`&&`${n}-data-table-sorter--desc`]},i?i({order:t}):$(r,{clsPrefix:n},{default:()=>$(jt,null)}))}}),Qr=F(`n-dropdown-menu`),$r=F(`n-dropdown`),ei=F(`n-dropdown-option`),ti=S({name:`DropdownDivider`,props:{clsPrefix:{type:String,required:!0}},render(){return $(`div`,{class:`${this.clsPrefix}-dropdown-divider`})}}),ni=S({name:`DropdownGroupHeader`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){let{showIconRef:e,hasSubmenuRef:t}=i(Qr),{renderLabelRef:n,labelFieldRef:r,nodePropsRef:a,renderOptionRef:o}=i($r);return{labelField:r,showIcon:e,hasSubmenu:t,renderLabel:n,nodeProps:a,renderOption:o}},render(){let{clsPrefix:e,hasSubmenu:t,showIcon:n,nodeProps:r,renderLabel:i,renderOption:a}=this,{rawNode:o}=this.tmNode,s=$(`div`,Object.assign({class:`${e}-dropdown-option`},r?.(o)),$(`div`,{class:`${e}-dropdown-option-body ${e}-dropdown-option-body--group`},$(`div`,{"data-dropdown-option":!0,class:[`${e}-dropdown-option-body__prefix`,n&&`${e}-dropdown-option-body__prefix--show-icon`]},Re(o.icon)),$(`div`,{class:`${e}-dropdown-option-body__label`,"data-dropdown-option":!0},i?i(o):Re(o.title??o[this.labelField])),$(`div`,{class:[`${e}-dropdown-option-body__suffix`,t&&`${e}-dropdown-option-body__suffix--has-submenu`],"data-dropdown-option":!0})));return a?a({node:s,option:o}):s}});function ri(e,t){return e.type===`submenu`||e.type===void 0&&e[t]!==void 0}function ii(e){return e.type===`group`}function ai(e){return e.type===`divider`}function oi(e){return e.type===`render`}var si=S({name:`DropdownOption`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null},placement:{type:String,default:`right-start`},props:Object,scrollable:Boolean},setup(e){let n=i($r),{hoverKeyRef:r,keyboardKeyRef:a,lastToggledSubmenuKeyRef:o,pendingKeyPathRef:s,activeKeyPathRef:c,animatedRef:l,mergedShowRef:u,renderLabelRef:d,renderIconRef:f,labelFieldRef:p,childrenFieldRef:m,renderOptionRef:h,nodePropsRef:g,menuPropsRef:_}=n,v=i(ei,null),y=i(Qr),b=i(ke),S=t(()=>e.tmNode.rawNode),C=t(()=>{let{value:t}=m;return ri(e.tmNode.rawNode,t)}),w=t(()=>{let{disabled:t}=e.tmNode;return t}),T=lt(t(()=>{if(!C.value)return!1;let{key:t,disabled:n}=e.tmNode;if(n)return!1;let{value:i}=r,{value:c}=a,{value:l}=o,{value:u}=s;return i===null?c===null?l!==null&&u.includes(t):u.includes(t)&&u[u.length-1]!==t:u.includes(t)}),300,t(()=>a.value===null&&!l.value)),E=t(()=>!!v?.enteringSubmenuRef.value),D=K(!1);R(ei,{enteringSubmenuRef:D});function O(){D.value=!0}function k(){D.value=!1}function A(){let{parentKey:t,tmNode:n}=e;n.disabled||u.value&&(o.value=t,a.value=null,r.value=n.key)}function j(){let{tmNode:t}=e;t.disabled||u.value&&r.value!==t.key&&A()}function M(t){if(e.tmNode.disabled||!u.value)return;let{relatedTarget:n}=t;n&&!st({target:n},`dropdownOption`)&&!st({target:n},`scrollbarRail`)&&(r.value=null)}function N(){let{value:t}=C,{tmNode:r}=e;u.value&&!t&&!r.disabled&&(n.doSelect(r.key,r.rawNode),n.doUpdateShow(!1))}return{labelField:p,renderLabel:d,renderIcon:f,siblingHasIcon:y.showIconRef,siblingHasSubmenu:y.hasSubmenuRef,menuProps:_,popoverBody:b,animated:l,mergedShowSubmenu:t(()=>T.value&&!E.value),rawNode:S,hasSubmenu:C,pending:x(()=>{let{value:t}=s,{key:n}=e.tmNode;return t.includes(n)}),childActive:x(()=>{let{value:t}=c,{key:n}=e.tmNode,r=t.findIndex(e=>n===e);return r!==-1&&r<t.length-1}),active:x(()=>{let{value:t}=c,{key:n}=e.tmNode,r=t.findIndex(e=>n===e);return r!==-1&&r===t.length-1}),mergedDisabled:w,renderOption:h,nodeProps:g,handleClick:N,handleMouseMove:j,handleMouseEnter:A,handleMouseLeave:M,handleSubmenuBeforeEnter:O,handleSubmenuAfterEnter:k}},render(){let{animated:e,rawNode:t,mergedShowSubmenu:n,clsPrefix:r,siblingHasIcon:i,siblingHasSubmenu:a,renderLabel:o,renderIcon:s,renderOption:c,nodeProps:l,props:u,scrollable:d}=this,f=null;if(n){let e=this.menuProps?.call(this,t,t.children);f=$(ui,Object.assign({},e,{clsPrefix:r,scrollable:this.scrollable,tmNodes:this.tmNode.children,parentKey:this.tmNode.key}))}let p={class:[`${r}-dropdown-option-body`,this.pending&&`${r}-dropdown-option-body--pending`,this.active&&`${r}-dropdown-option-body--active`,this.childActive&&`${r}-dropdown-option-body--child-active`,this.mergedDisabled&&`${r}-dropdown-option-body--disabled`],onMousemove:this.handleMouseMove,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onClick:this.handleClick},m=l?.(t),h=$(`div`,Object.assign({class:[`${r}-dropdown-option`,m?.class],"data-dropdown-option":!0},m),$(`div`,M(p,u),[$(`div`,{class:[`${r}-dropdown-option-body__prefix`,i&&`${r}-dropdown-option-body__prefix--show-icon`]},[s?s(t):Re(t.icon)]),$(`div`,{"data-dropdown-option":!0,class:`${r}-dropdown-option-body__label`},o?o(t):Re(t[this.labelField]??t.title)),$(`div`,{"data-dropdown-option":!0,class:[`${r}-dropdown-option-body__suffix`,a&&`${r}-dropdown-option-body__suffix--has-submenu`]},this.hasSubmenu?$(ne,null,{default:()=>$(Pt,null)}):null)]),this.hasSubmenu?$(we,null,{default:()=>[$(ge,null,{default:()=>$(`div`,{class:`${r}-dropdown-offset-container`},$(Se,{show:this.mergedShowSubmenu,placement:this.placement,to:d&&this.popoverBody||void 0,teleportDisabled:!d},{default:()=>$(`div`,{class:`${r}-dropdown-menu-wrapper`},e?$(fe,{onBeforeEnter:this.handleSubmenuBeforeEnter,onAfterEnter:this.handleSubmenuAfterEnter,name:`fade-in-scale-up-transition`,appear:!0},{default:()=>f}):f)}))})]}):null);return c?c({node:h,option:t}):h}}),ci=S({name:`NDropdownGroup`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null}},render(){let{tmNode:e,parentKey:t,clsPrefix:n}=this,{children:r}=e;return $(l,null,$(ni,{clsPrefix:n,tmNode:e,key:e.key}),r?.map(e=>{let{rawNode:r}=e;return r.show===!1?null:ai(r)?$(ti,{clsPrefix:n,key:e.key}):e.isGroup?(g(`dropdown`,"`group` node is not allowed to be put in `group` node."),null):$(si,{clsPrefix:n,tmNode:e,parentKey:t,key:e.key})}))}}),li=S({name:`DropdownRenderOption`,props:{tmNode:{type:Object,required:!0}},render(){let{rawNode:{render:e,props:t}}=this.tmNode;return $(`div`,t,[e?.()])}}),ui=S({name:`DropdownMenu`,props:{scrollable:Boolean,showArrow:Boolean,arrowStyle:[String,Object],clsPrefix:{type:String,required:!0},tmNodes:{type:Array,default:()=>[]},parentKey:{type:[String,Number],default:null}},setup(e){let{renderIconRef:n,childrenFieldRef:r}=i($r);R(Qr,{showIconRef:t(()=>{let t=n.value;return e.tmNodes.some(e=>{if(e.isGroup)return e.children?.some(({rawNode:e})=>t?t(e):e.icon);let{rawNode:n}=e;return t?t(n):n.icon})}),hasSubmenuRef:t(()=>{let{value:t}=r;return e.tmNodes.some(e=>{if(e.isGroup)return e.children?.some(({rawNode:e})=>ri(e,t));let{rawNode:n}=e;return ri(n,t)})})});let a=K(null);return R(Ne,null),R(Pe,null),R(ke,a),{bodyRef:a}},render(){let{parentKey:e,clsPrefix:t,scrollable:n}=this,r=this.tmNodes.map(r=>{let{rawNode:i}=r;return i.show===!1?null:oi(i)?$(li,{tmNode:r,key:r.key}):ai(i)?$(ti,{clsPrefix:t,key:r.key}):ii(i)?$(ci,{clsPrefix:t,tmNode:r,parentKey:e,key:r.key}):$(si,{clsPrefix:t,tmNode:r,parentKey:e,key:r.key,props:i.props,scrollable:n})});return $(`div`,{class:[`${t}-dropdown-menu`,n&&`${t}-dropdown-menu--scrollable`],ref:`bodyRef`},n?$(de,{contentClass:`${t}-dropdown-menu__content`},{default:()=>r}):r,this.showArrow?Ce({clsPrefix:t,arrowStyle:this.arrowStyle,arrowClass:void 0,arrowWrapperClass:void 0,arrowWrapperStyle:void 0}):null)}}),di=B(`dropdown-menu`,`
 transform-origin: var(--v-transform-origin);
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 box-shadow: var(--n-box-shadow);
 position: relative;
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
`,[Be(),B(`dropdown-option`,`
 position: relative;
 `,[X(`a`,`
 text-decoration: none;
 color: inherit;
 outline: none;
 `,[X(`&::before`,`
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),B(`dropdown-option-body`,`
 display: flex;
 cursor: pointer;
 position: relative;
 height: var(--n-option-height);
 line-height: var(--n-option-height);
 font-size: var(--n-font-size);
 color: var(--n-option-text-color);
 transition: color .3s var(--n-bezier);
 `,[X(`&::before`,`
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 left: 4px;
 right: 4px;
 transition: background-color .3s var(--n-bezier);
 border-radius: var(--n-border-radius);
 `),U(`disabled`,[H(`pending`,`
 color: var(--n-option-text-color-hover);
 `,[Z(`prefix, suffix`,`
 color: var(--n-option-text-color-hover);
 `),X(`&::before`,`background-color: var(--n-option-color-hover);`)]),H(`active`,`
 color: var(--n-option-text-color-active);
 `,[Z(`prefix, suffix`,`
 color: var(--n-option-text-color-active);
 `),X(`&::before`,`background-color: var(--n-option-color-active);`)]),H(`child-active`,`
 color: var(--n-option-text-color-child-active);
 `,[Z(`prefix, suffix`,`
 color: var(--n-option-text-color-child-active);
 `)])]),H(`disabled`,`
 cursor: not-allowed;
 opacity: var(--n-option-opacity-disabled);
 `),H(`group`,`
 font-size: calc(var(--n-font-size) - 1px);
 color: var(--n-group-header-text-color);
 `,[Z(`prefix`,`
 width: calc(var(--n-option-prefix-width) / 2);
 `,[H(`show-icon`,`
 width: calc(var(--n-option-icon-prefix-width) / 2);
 `)])]),Z(`prefix`,`
 width: var(--n-option-prefix-width);
 display: flex;
 justify-content: center;
 align-items: center;
 color: var(--n-prefix-color);
 transition: color .3s var(--n-bezier);
 z-index: 1;
 `,[H(`show-icon`,`
 width: var(--n-option-icon-prefix-width);
 `),B(`icon`,`
 font-size: var(--n-option-icon-size);
 `)]),Z(`label`,`
 white-space: nowrap;
 flex: 1;
 z-index: 1;
 `),Z(`suffix`,`
 box-sizing: border-box;
 flex-grow: 0;
 flex-shrink: 0;
 display: flex;
 justify-content: flex-end;
 align-items: center;
 min-width: var(--n-option-suffix-width);
 padding: 0 8px;
 transition: color .3s var(--n-bezier);
 color: var(--n-suffix-color);
 z-index: 1;
 `,[H(`has-submenu`,`
 width: var(--n-option-icon-suffix-width);
 `),B(`icon`,`
 font-size: var(--n-option-icon-size);
 `)]),B(`dropdown-menu`,`pointer-events: all;`)]),B(`dropdown-offset-container`,`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: -4px;
 bottom: -4px;
 `)]),B(`dropdown-divider`,`
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 4px 0;
 `),B(`dropdown-menu-wrapper`,`
 transform-origin: var(--v-transform-origin);
 width: fit-content;
 `),X(`>`,[B(`scrollbar`,`
 height: inherit;
 max-height: inherit;
 `)]),U(`scrollable`,`
 padding: var(--n-padding);
 `),H(`scrollable`,[Z(`content`,`
 padding: var(--n-padding);
 `)])]),fi={animated:{type:Boolean,default:!0},keyboard:{type:Boolean,default:!0},size:String,inverted:Boolean,placement:{type:String,default:`bottom`},onSelect:[Function,Array],options:{type:Array,default:()=>[]},menuProps:Function,showArrow:Boolean,renderLabel:Function,renderIcon:Function,renderOption:Function,nodeProps:Function,labelField:{type:String,default:`label`},keyField:{type:String,default:`key`},childrenField:{type:String,default:`children`},value:[String,Number]},pi=Object.keys(ye),mi=Object.assign(Object.assign(Object.assign({},ye),fi),m.props),hi=S({name:`Dropdown`,inheritAttrs:!1,props:mi,setup(e){let n=K(!1),r=Ie(W(e,`show`),n),i=t(()=>{let{keyField:t,childrenField:n}=e;return Cn(e.options,{getKey(e){return e[t]},getDisabled(e){return e.disabled===!0},getIgnored(e){return e.type===`divider`||e.type===`render`},getChildren(e){return e[n]}})}),a=t(()=>i.value.treeNodes),o=K(null),c=K(null),l=K(null),u=t(()=>o.value??c.value??l.value??null),d=t(()=>i.value.getPath(u.value).keyPath),f=t(()=>i.value.getPath(e.value).keyPath),p=x(()=>e.keyboard&&r.value);ct({keydown:{ArrowUp:{prevent:!0,handler:O},ArrowRight:{prevent:!0,handler:D},ArrowDown:{prevent:!0,handler:k},ArrowLeft:{prevent:!0,handler:T},Enter:{prevent:!0,handler:A},Escape:w}},p);let{mergedClsPrefixRef:h,inlineThemeDisabled:g,mergedComponentPropsRef:_}=Q(e),v=t(()=>e.size||_?.value?.Dropdown?.size||`medium`),y=m(`Dropdown`,`-dropdown`,di,Ye,e,h);R($r,{labelFieldRef:W(e,`labelField`),childrenFieldRef:W(e,`childrenField`),renderLabelRef:W(e,`renderLabel`),renderIconRef:W(e,`renderIcon`),hoverKeyRef:o,keyboardKeyRef:c,lastToggledSubmenuKeyRef:l,pendingKeyPathRef:d,activeKeyPathRef:f,animatedRef:W(e,`animated`),mergedShowRef:r,nodePropsRef:W(e,`nodeProps`),renderOptionRef:W(e,`renderOption`),menuPropsRef:W(e,`menuProps`),doSelect:b,doUpdateShow:S}),q(r,t=>{!e.animated&&!t&&C()});function b(t,n){let{onSelect:r}=e;r&&E(r,t,n)}function S(t){let{"onUpdate:show":r,onUpdateShow:i}=e;r&&E(r,t),i&&E(i,t),n.value=t}function C(){o.value=null,c.value=null,l.value=null}function w(){S(!1)}function T(){M(`left`)}function D(){M(`right`)}function O(){M(`up`)}function k(){M(`down`)}function A(){let e=j();e?.isLeaf&&r.value&&(b(e.key,e.rawNode),S(!1))}function j(){let{value:e}=i,{value:t}=u;return!e||t===null?null:e.getNode(t)??null}function M(e){let{value:t}=u,{value:{getFirstAvailableNode:n}}=i,r=null;if(t===null){let e=n();e!==null&&(r=e.key)}else{let t=j();if(t){let n;switch(e){case`down`:n=t.getNext();break;case`up`:n=t.getPrev();break;case`right`:n=t.getChild();break;case`left`:n=t.getParent()}n&&(r=n.key)}}r!==null&&(o.value=null,c.value=r)}let N=t(()=>{let{inverted:t}=e,n=v.value,{common:{cubicBezierEaseInOut:r},self:i}=y.value,{padding:a,dividerColor:o,borderRadius:s,optionOpacityDisabled:c,[J(`optionIconSuffixWidth`,n)]:l,[J(`optionSuffixWidth`,n)]:u,[J(`optionIconPrefixWidth`,n)]:d,[J(`optionPrefixWidth`,n)]:f,[J(`fontSize`,n)]:p,[J(`optionHeight`,n)]:m,[J(`optionIconSize`,n)]:h}=i,g={"--n-bezier":r,"--n-font-size":p,"--n-padding":a,"--n-border-radius":s,"--n-option-height":m,"--n-option-prefix-width":f,"--n-option-icon-prefix-width":d,"--n-option-suffix-width":u,"--n-option-icon-suffix-width":l,"--n-option-icon-size":h,"--n-divider-color":o,"--n-option-opacity-disabled":c};return t?(g[`--n-color`]=i.colorInverted,g[`--n-option-color-hover`]=i.optionColorHoverInverted,g[`--n-option-color-active`]=i.optionColorActiveInverted,g[`--n-option-text-color`]=i.optionTextColorInverted,g[`--n-option-text-color-hover`]=i.optionTextColorHoverInverted,g[`--n-option-text-color-active`]=i.optionTextColorActiveInverted,g[`--n-option-text-color-child-active`]=i.optionTextColorChildActiveInverted,g[`--n-prefix-color`]=i.prefixColorInverted,g[`--n-suffix-color`]=i.suffixColorInverted,g[`--n-group-header-text-color`]=i.groupHeaderTextColorInverted):(g[`--n-color`]=i.color,g[`--n-option-color-hover`]=i.optionColorHover,g[`--n-option-color-active`]=i.optionColorActive,g[`--n-option-text-color`]=i.optionTextColor,g[`--n-option-text-color-hover`]=i.optionTextColorHover,g[`--n-option-text-color-active`]=i.optionTextColorActive,g[`--n-option-text-color-child-active`]=i.optionTextColorChildActive,g[`--n-prefix-color`]=i.prefixColor,g[`--n-suffix-color`]=i.suffixColor,g[`--n-group-header-text-color`]=i.groupHeaderTextColor),g}),P=g?s(`dropdown`,t(()=>`${v.value[0]}${e.inverted?`i`:``}`),N,e):void 0;return{mergedClsPrefix:h,mergedTheme:y,mergedSize:v,tmNodes:a,mergedShow:r,handleAfterLeave:()=>{e.animated&&C()},doUpdateShow:S,cssVars:g?void 0:N,themeClass:P?.themeClass,onRender:P?.onRender}},render(){let e=(e,t,n,r,i)=>{var a;let{mergedClsPrefix:o,menuProps:s}=this;(a=this.onRender)==null||a.call(this);let c=s?.(void 0,this.tmNodes.map(e=>e.rawNode))||{},l={ref:kt(t),class:[e,`${o}-dropdown`,`${o}-dropdown--${this.mergedSize}-size`,this.themeClass],clsPrefix:o,tmNodes:this.tmNodes,style:[...n,this.cssVars],showArrow:this.showArrow,arrowStyle:this.arrowStyle,scrollable:this.scrollable,onMouseenter:r,onMouseleave:i};return $(ui,M(this.$attrs,l,c))},{mergedTheme:t}=this,n={show:this.mergedShow,theme:t.peers.Popover,themeOverrides:t.peerOverrides.Popover,internalOnAfterLeave:this.handleAfterLeave,internalRenderBody:e,onUpdateShow:this.doUpdateShow,"onUpdate:show":void 0};return $(ve,Object.assign({},je(this.$props,pi),n),{trigger:()=>{var e;return(e=this.$slots).default?.call(e)}})}}),gi=`_n_all__`,_i=`_n_none__`;function vi(e,t,n,r){return e?i=>{for(let a of e)switch(i){case gi:n(!0);return;case _i:r(!0);return;default:if(typeof a==`object`&&a.key===i){a.onSelect(t.value);return}}}:()=>{}}function yi(e,t){return e?e.map(e=>{switch(e){case`all`:return{label:t.checkTableAll,key:gi};case`none`:return{label:t.uncheckTableAll,key:_i};default:return e}}):[]}var bi=S({name:`DataTableSelectionMenu`,props:{clsPrefix:{type:String,required:!0}},setup(e){let{props:n,localeRef:a,checkOptionsRef:o,rawPaginatedDataRef:s,doCheckAll:c,doUncheckAll:l}=i(ar),u=t(()=>vi(o.value,s,c,l)),d=t(()=>yi(o.value,a.value));return()=>{let{clsPrefix:t}=e;return $(hi,{theme:n.theme?.peers?.Dropdown,themeOverrides:n.themeOverrides?.peers?.Dropdown,options:d.value,onSelect:u.value},{default:()=>$(r,{clsPrefix:t,class:`${t}-data-table-check-extra`},{default:()=>$(We,null)})})}}});function xi(e){return typeof e.title==`function`?e.title(e):e.title}var Si=S({props:{clsPrefix:{type:String,required:!0},id:{type:String,required:!0},cols:{type:Array,required:!0},width:String},render(){let{clsPrefix:e,id:t,cols:n,width:r}=this;return $(`table`,{style:{tableLayout:`fixed`,width:r},class:`${e}-data-table-table`},$(`colgroup`,null,n.map(e=>$(`col`,{key:e.key,style:e.style}))),$(`thead`,{"data-n-id":t,class:`${e}-data-table-thead`},this.$slots))}}),Ci=S({name:`DataTableHeader`,props:{discrete:{type:Boolean,default:!0}},setup(){let{mergedClsPrefixRef:e,scrollXRef:t,fixedColumnLeftMapRef:n,fixedColumnRightMapRef:r,mergedCurrentPageRef:a,allRowsCheckedRef:o,someRowsCheckedRef:s,rowsRef:c,colsRef:l,mergedThemeRef:u,checkOptionsRef:d,mergedSortStateRef:f,componentId:p,mergedTableLayoutRef:m,headerCheckboxDisabledRef:h,virtualScrollHeaderRef:g,headerHeightRef:_,onUnstableColumnResize:v,doUpdateResizableWidth:y,handleTableHeaderScroll:b,deriveNextSorter:x,doUncheckAll:S,doCheckAll:C}=i(ar),w=K(),T=K({});function E(e){return T.value[e]?.getBoundingClientRect().width}function D(){o.value?S():C()}function O(e,t){if(st(e,`dataTableFilter`)||st(e,`dataTableResizable`)||!hr(t))return;let n=yr(t,f.value.find(e=>e.columnKey===t.key)||null);x(n)}let k=new Map;function A(e){k.set(e.key,E(e.key))}function j(e,t){let n=k.get(e.key);if(n===void 0)return;let r=n+t,i=dr(r,e.minWidth,e.maxWidth);v(r,i,e,E),y(e,i)}return{cellElsRef:T,componentId:p,mergedSortState:f,mergedClsPrefix:e,scrollX:t,fixedColumnLeftMap:n,fixedColumnRightMap:r,currentPage:a,allRowsChecked:o,someRowsChecked:s,rows:c,cols:l,mergedTheme:u,checkOptions:d,mergedTableLayout:m,headerCheckboxDisabled:h,headerHeight:_,virtualScrollHeader:g,virtualListRef:w,handleCheckboxUpdateChecked:D,handleColHeaderClick:O,handleTableHeaderScroll:b,handleColumnResizeStart:A,handleColumnResize:j}},render(){let{cellElsRef:e,mergedClsPrefix:t,fixedColumnLeftMap:n,fixedColumnRightMap:r,currentPage:i,allRowsChecked:a,someRowsChecked:o,rows:s,cols:c,mergedTheme:u,checkOptions:d,componentId:f,discrete:p,mergedTableLayout:m,headerCheckboxDisabled:h,mergedSortState:g,virtualScrollHeader:_,handleColHeaderClick:v,handleCheckboxUpdateChecked:y,handleColumnResizeStart:b,handleColumnResize:x}=this,S=!1,w=(s,c,f)=>s.map(({column:s,colIndex:p,colSpan:m,rowSpan:_,isLast:C})=>{let w=cr(s),{ellipsis:T}=s;!S&&T&&(S=!0);let E=()=>s.type===`selection`?s.multiple===!1?null:$(l,null,$(ot,{key:i,privateInsideTable:!0,checked:a,indeterminate:o,disabled:h,onUpdateChecked:y}),d?$(bi,{clsPrefix:t}):null):$(l,null,$(`div`,{class:`${t}-data-table-th__title-wrapper`},$(`div`,{class:`${t}-data-table-th__title`},T===!0||T&&!T.tooltip?$(`div`,{class:`${t}-data-table-th__ellipsis`},xi(s)):T&&typeof T==`object`?$(Vr,Object.assign({},T,{theme:u.peers.Ellipsis,themeOverrides:u.peerOverrides.Ellipsis}),{default:()=>xi(s)}):xi(s)),hr(s)?$(Zr,{column:s}):null),_r(s)?$(Jr,{column:s,options:s.filterOptions}):null,gr(s)?$(Yr,{onResizeStart:()=>{b(s)},onResize:e=>{x(s,e)}}):null),D=w in n,O=w in r,k=c&&!s.fixed?`div`:`th`;return $(k,{ref:t=>e[w]=t,key:w,style:[c&&!s.fixed?{position:`absolute`,left:G(c(p)),top:0,bottom:0}:{left:G(n[w]?.start),right:G(r[w]?.start)},{width:G(s.width),textAlign:s.titleAlign||s.align,height:f}],colspan:m,rowspan:_,"data-col-key":w,class:[`${t}-data-table-th`,(D||O)&&`${t}-data-table-th--fixed-${D?`left`:`right`}`,{[`${t}-data-table-th--sorting`]:br(s,g),[`${t}-data-table-th--filterable`]:_r(s),[`${t}-data-table-th--sortable`]:hr(s),[`${t}-data-table-th--selection`]:s.type===`selection`,[`${t}-data-table-th--last`]:C},s.className],onClick:s.type!==`selection`&&s.type!==`expand`&&!(`children`in s)?e=>{v(e,s)}:void 0},E())});if(_){let{headerHeight:e}=this,n=0,r=0;return c.forEach(e=>{e.column.fixed===`left`?n++:e.column.fixed===`right`&&r++}),$(bt,{ref:`virtualListRef`,class:`${t}-data-table-base-table-header`,style:{height:G(e)},onScroll:this.handleTableHeaderScroll,columns:c,itemSize:e,showScrollbar:!1,items:[{}],itemResizable:!1,visibleItemsTag:Si,visibleItemsProps:{clsPrefix:t,id:f,cols:c,width:C(this.scrollX)},renderItemWithCols:({startColIndex:t,endColIndex:i,getLeft:a})=>{let o=c.map((e,t)=>({column:e.column,isLast:t===c.length-1,colIndex:e.index,colSpan:1,rowSpan:1})).filter(({column:e},n)=>!!(t<=n&&n<=i||e.fixed)),s=w(o,a,G(e));return s.splice(n,0,$(`th`,{colspan:c.length-n-r,style:{pointerEvents:`none`,visibility:`hidden`,height:0}})),$(`tr`,{style:{position:`relative`}},s)}},{default:({renderedItemWithCols:e})=>e})}let T=$(`thead`,{class:`${t}-data-table-thead`,"data-n-id":f},s.map(e=>$(`tr`,{class:`${t}-data-table-tr`},w(e,null,void 0))));if(!p)return T;let{handleTableHeaderScroll:E,scrollX:D}=this;return $(`div`,{class:`${t}-data-table-base-table-header`,onScroll:E},$(`table`,{class:`${t}-data-table-table`,style:{minWidth:C(D),tableLayout:m}},$(`colgroup`,null,c.map(e=>$(`col`,{key:e.key,style:e.style}))),T))}});function wi(e,t){let n=[];function r(e,i){e.forEach(e=>{e.children&&t.has(e.key)?(n.push({tmNode:e,striped:!1,key:e.key,index:i}),r(e.children,i)):n.push({key:e.key,tmNode:e,striped:!1,index:i})})}return e.forEach(e=>{n.push(e);let{children:i}=e.tmNode;i&&t.has(e.key)&&r(i,e.index)}),n}var Ti=S({props:{clsPrefix:{type:String,required:!0},id:{type:String,required:!0},cols:{type:Array,required:!0},onMouseenter:Function,onMouseleave:Function},render(){let{clsPrefix:e,id:t,cols:n,onMouseenter:r,onMouseleave:i}=this;return $(`table`,{style:{tableLayout:`fixed`},class:`${e}-data-table-table`,onMouseenter:r,onMouseleave:i},$(`colgroup`,null,n.map(e=>$(`col`,{key:e.key,style:e.style}))),$(`tbody`,{"data-n-id":t,class:`${e}-data-table-tbody`},this.$slots))}}),Ei=S({name:`DataTableBody`,props:{onResize:Function,showHeader:Boolean,flexHeight:Boolean,bodyStyle:Object},setup(e){let{slots:n,bodyWidthRef:r,mergedExpandedRowKeysRef:a,mergedClsPrefixRef:o,mergedThemeRef:s,scrollXRef:c,colsRef:l,paginatedDataRef:d,rawPaginatedDataRef:f,fixedColumnLeftMapRef:p,fixedColumnRightMapRef:m,mergedCurrentPageRef:h,rowClassNameRef:v,leftActiveFixedColKeyRef:b,leftActiveFixedChildrenColKeysRef:S,rightActiveFixedColKeyRef:C,rightActiveFixedChildrenColKeysRef:w,renderExpandRef:T,hoverKeyRef:E,summaryRef:D,mergedSortStateRef:O,virtualScrollRef:k,virtualScrollXRef:A,heightForRowRef:j,minRowHeightRef:M,componentId:N,mergedTableLayoutRef:P,childTriggerColIndexRef:F,indentRef:I,rowPropsRef:L,stripedRef:R,loadingRef:z,onLoadRef:ee,loadingKeySetRef:te,expandableRef:B,stickyExpandedRowsRef:V,renderExpandIconRef:H,summaryPlacementRef:U,treeMateRef:W,scrollbarPropsRef:ne,setHeaderScrollLeft:re,doUpdateExpandedRowKeys:G,handleTableBodyScroll:ie,doCheck:ae,doUncheck:q,renderCell:J,xScrollableRef:oe,explicitlyScrollableRef:Y}=i(ar),se=i(u),le=K(null),ue=K(null),Z=K(null),de=t(()=>se?.mergedComponentPropsRef.value?.DataTable?.renderEmpty),Q=x(()=>d.value.length===0),fe=x(()=>k.value&&!Q.value),pe=``,$=t(()=>new Set(a.value));function me(e){return W.value.getNode(e)?.rawNode}function he(e,t,n){let r=me(e.key);if(!r){g(`data-table`,`fail to get row data with key ${e.key}`);return}if(n){let n=d.value.findIndex(e=>e.key===pe);if(n!==-1){let i=d.value.findIndex(t=>t.key===e.key),a=Math.min(n,i),o=Math.max(n,i),s=[];d.value.slice(a,o+1).forEach(e=>{e.disabled||s.push(e.key)}),t?ae(s,!1,r):q(s,r),pe=e.key;return}}t?ae(e.key,!1,r):q(e.key,r),pe=e.key}function ge(e){let t=me(e.key);if(!t){g(`data-table`,`fail to get row data with key ${e.key}`);return}ae(e.key,!0,t)}function _e(){if(fe.value)return be();let{value:e}=le;return e?e.containerRef:null}function ve(e,t){var n;if(te.value.has(e))return;let{value:r}=a,i=r.indexOf(e),o=Array.from(r);~i?(o.splice(i,1),G(o)):t&&!t.isLeaf&&!t.shallowLoaded?(te.value.add(e),(n=ee.value)==null||n.call(ee,t.rawNode).then(()=>{let{value:t}=a,n=Array.from(t);~n.indexOf(e)||n.push(e),G(n)}).finally(()=>{te.value.delete(e)})):(o.push(e),G(o))}function ye(){E.value=null}function be(){let{value:e}=ue;return e?.listElRef||null}function xe(){let{value:e}=ue;return e?.itemsElRef||null}function Se(e){var t;ie(e),(t=le.value)==null||t.sync()}function Ce(t){var n;let{onResize:r}=e;r&&r(t),(n=le.value)==null||n.sync()}let we={getScrollContainer:_e,scrollTo(e,t){var n,r;k.value?(n=ue.value)==null||n.scrollTo(e,t):(r=le.value)==null||r.scrollTo(e,t)}},Te=X([({props:e})=>{let t=t=>t===null?null:X(`[data-n-id="${e.componentId}"] [data-col-key="${t}"]::after`,{boxShadow:`var(--n-box-shadow-after)`}),n=t=>t===null?null:X(`[data-n-id="${e.componentId}"] [data-col-key="${t}"]::before`,{boxShadow:`var(--n-box-shadow-before)`});return X([t(e.leftActiveFixedColKey),n(e.rightActiveFixedColKey),e.leftActiveFixedChildrenColKeys.map(e=>t(e)),e.rightActiveFixedChildrenColKeys.map(e=>n(e))])}]),Ee=!1;return ce(()=>{let{value:e}=b,{value:t}=S,{value:n}=C,{value:r}=w;if(!Ee&&e===null&&n===null)return;let i={leftActiveFixedColKey:e,leftActiveFixedChildrenColKeys:t,rightActiveFixedColKey:n,rightActiveFixedChildrenColKeys:r,componentId:N};Te.mount({id:`n-${N}`,force:!0,props:i,anchorMetaName:y,parent:se?.styleMountTarget}),Ee=!0}),_(()=>{Te.unmount({id:`n-${N}`,parent:se?.styleMountTarget})}),Object.assign({bodyWidth:r,summaryPlacement:U,dataTableSlots:n,componentId:N,scrollbarInstRef:le,virtualListRef:ue,emptyElRef:Z,summary:D,mergedClsPrefix:o,mergedTheme:s,mergedRenderEmpty:de,scrollX:c,cols:l,loading:z,shouldDisplayVirtualList:fe,empty:Q,paginatedDataAndInfo:t(()=>{let{value:e}=R,t=!1;return{data:d.value.map(e?(e,n)=>(e.isLeaf||(t=!0),{tmNode:e,key:e.key,striped:n%2==1,index:n}):(e,n)=>(e.isLeaf||(t=!0),{tmNode:e,key:e.key,striped:!1,index:n})),hasChildren:t}}),rawPaginatedData:f,fixedColumnLeftMap:p,fixedColumnRightMap:m,currentPage:h,rowClassName:v,renderExpand:T,mergedExpandedRowKeySet:$,hoverKey:E,mergedSortState:O,virtualScroll:k,virtualScrollX:A,heightForRow:j,minRowHeight:M,mergedTableLayout:P,childTriggerColIndex:F,indent:I,rowProps:L,loadingKeySet:te,expandable:B,stickyExpandedRows:V,renderExpandIcon:H,scrollbarProps:ne,setHeaderScrollLeft:re,handleVirtualListScroll:Se,handleVirtualListResize:Ce,handleMouseleaveTable:ye,virtualListContainer:be,virtualListContent:xe,handleTableBodyScroll:ie,handleCheckboxUpdateChecked:he,handleRadioUpdateChecked:ge,handleUpdateExpanded:ve,renderCell:J,explicitlyScrollable:Y,xScrollable:oe},we)},render(){let{mergedTheme:e,scrollX:t,mergedClsPrefix:r,explicitlyScrollable:i,xScrollable:a,loadingKeySet:s,onResize:c,setHeaderScrollLeft:u,empty:d,shouldDisplayVirtualList:f}=this,p={minWidth:C(t)||`100%`};t&&(p.width=`100%`);let m=()=>$(`div`,{class:[`${r}-data-table-empty`,this.loading&&`${r}-data-table-empty--hide`],style:[this.bodyStyle,a?`position: sticky; left: 0; width: var(--n-scrollbar-current-width);`:void 0],ref:`emptyElRef`},n(this.dataTableSlots.empty,()=>[this.mergedRenderEmpty?.call(this)||$(En,{theme:this.mergedTheme.peers.Empty,themeOverrides:this.mergedTheme.peerOverrides.Empty})])),h=$(o,Object.assign({},this.scrollbarProps,{ref:`scrollbarInstRef`,scrollable:i||a,class:`${r}-data-table-base-table-body`,style:d?`height: initial;`:this.bodyStyle,theme:e.peers.Scrollbar,themeOverrides:e.peerOverrides.Scrollbar,contentStyle:p,container:f?this.virtualListContainer:void 0,content:f?this.virtualListContent:void 0,horizontalRailStyle:{zIndex:3},verticalRailStyle:{zIndex:3},internalExposeWidthCssVar:a&&d,xScrollable:a,onScroll:f?void 0:this.handleTableBodyScroll,internalOnUpdateScrollLeft:u,onResize:c}),{default:()=>{if(this.empty&&!this.showHeader&&(this.explicitlyScrollable||this.xScrollable))return m();let e={},t={},{cols:n,paginatedDataAndInfo:i,mergedTheme:a,fixedColumnLeftMap:o,fixedColumnRightMap:c,currentPage:u,rowClassName:d,mergedSortState:f,mergedExpandedRowKeySet:h,stickyExpandedRows:g,componentId:_,childTriggerColIndex:v,expandable:y,rowProps:b,handleMouseleaveTable:x,renderExpand:S,summary:C,handleCheckboxUpdateChecked:w,handleRadioUpdateChecked:T,handleUpdateExpanded:E,heightForRow:D,minRowHeight:O,virtualScrollX:k}=this,{length:A}=n,j,{data:M,hasChildren:N}=i,P=N?wi(M,h):M;if(C){let e=C(this.rawPaginatedData);if(Array.isArray(e)){let t=e.map((e,t)=>({isSummaryRow:!0,key:`__n_summary__${t}`,tmNode:{rawNode:e,disabled:!0},index:-1}));j=this.summaryPlacement===`top`?[...t,...P]:[...P,...t]}else{let t={isSummaryRow:!0,key:`__n_summary__`,tmNode:{rawNode:e,disabled:!0},index:-1};j=this.summaryPlacement===`top`?[t,...P]:[...P,t]}}else j=P;let F=N?{width:G(this.indent)}:void 0,L=[];j.forEach(e=>{S&&h.has(e.key)&&(!y||y(e.tmNode.rawNode))?L.push(e,{isExpandedRow:!0,key:`${e.key}-expand`,tmNode:e.tmNode,index:e.index}):L.push(e)});let{length:R}=L,z={};M.forEach(({tmNode:e},t)=>{z[t]=e.key});let ee=g?this.bodyWidth:null,te=ee===null?void 0:`${ee}px`,B=this.virtualScrollX?`div`:`td`,V=0,H=0;k&&n.forEach(e=>{e.column.fixed===`left`?V++:e.column.fixed===`right`&&H++});let U=({rowInfo:i,displayedRowIndex:l,isVirtual:p,isVirtualX:m,startColIndex:_,endColIndex:y,getLeft:x})=>{let{index:C}=i;if(`isExpandedRow`in i){let{tmNode:{key:e,rawNode:t}}=i;return $(`tr`,{class:`${r}-data-table-tr ${r}-data-table-tr--expanded`,key:`${e}__expand`},$(`td`,{class:[`${r}-data-table-td`,`${r}-data-table-td--last-col`,l+1===R&&`${r}-data-table-td--last-row`],colspan:A},g?$(`div`,{class:`${r}-data-table-expand`,style:{width:te}},S(t,C)):S(t,C)))}let k=`isSummaryRow`in i,j=!k&&i.striped,{tmNode:M,key:P}=i,{rawNode:L}=M,ee=h.has(P),U=b?b(L,C):void 0,W=typeof d==`string`?d:pr(L,C,d),ne=m?n.filter((e,t)=>!!(_<=t&&t<=y||e.column.fixed)):n,re=m?G(D?.(L,C)||O):void 0,ie=ne.map(n=>{let d=n.index;if(l in e){let t=e[l],n=t.indexOf(d);if(~n)return t.splice(n,1),null}let{column:h}=n,g=cr(n),{rowSpan:_,colSpan:y}=h,b=k?i.tmNode.rawNode[g]?.colSpan||1:y?y(L,C):1,S=k?i.tmNode.rawNode[g]?.rowSpan||1:_?_(L,C):1,D=d+b===A,O=l+S===R,j=S>1;if(j&&(t[l]={[d]:[]}),b>1||j)for(let n=l;n<l+S;++n){j&&t[l][d].push(z[n]);for(let t=d;t<d+b;++t)(n!==l||t!==d)&&(n in e?e[n].push(t):e[n]=[t])}let M=j?this.hoverKey:null,{cellProps:te}=h,V=te?.(L,C),H={"--indent-offset":``},U=h.fixed?`td`:B;return $(U,Object.assign({},V,{key:g,style:[{textAlign:h.align||void 0,width:G(h.width)},m&&{height:re},m&&!h.fixed?{position:`absolute`,left:G(x(d)),top:0,bottom:0}:{left:G(o[g]?.start),right:G(c[g]?.start)},H,V?.style||``],colspan:b,rowspan:p?void 0:S,"data-col-key":g,class:[`${r}-data-table-td`,h.className,V?.class,k&&`${r}-data-table-td--summary`,M!==null&&t[l][d].includes(M)&&`${r}-data-table-td--hover`,br(h,f)&&`${r}-data-table-td--sorting`,h.fixed&&`${r}-data-table-td--fixed-${h.fixed}`,h.align&&`${r}-data-table-td--${h.align}-align`,h.type===`selection`&&`${r}-data-table-td--selection`,h.type===`expand`&&`${r}-data-table-td--expand`,D&&`${r}-data-table-td--last-col`,O&&`${r}-data-table-td--last-row`]}),N&&d===v?[I(H[`--indent-offset`]=k?0:i.tmNode.level,$(`div`,{class:`${r}-data-table-indent`,style:F})),k||i.tmNode.isLeaf?$(`div`,{class:`${r}-data-table-expand-placeholder`}):$(Wr,{class:`${r}-data-table-expand-trigger`,clsPrefix:r,expanded:ee,rowData:L,renderExpandIcon:this.renderExpandIcon,loading:s.has(i.key),onClick:()=>{E(P,i.tmNode)}})]:null,h.type===`selection`?k?null:h.multiple===!1?$(Pr,{key:u,rowKey:P,disabled:i.tmNode.disabled,onUpdateChecked:()=>{T(i.tmNode)}}):$(Cr,{key:u,rowKey:P,disabled:i.tmNode.disabled,onUpdateChecked:(e,t)=>{w(i.tmNode,e,t.shiftKey)}}):h.type===`expand`?k?null:!h.expandable||h.expandable?.call(h,L)?$(Wr,{clsPrefix:r,rowData:L,expanded:ee,renderExpandIcon:this.renderExpandIcon,onClick:()=>{E(P,null)}}):null:$(Ur,{clsPrefix:r,index:C,row:L,column:h,isSummary:k,mergedTheme:a,renderCell:this.renderCell}))});return m&&V&&H&&ie.splice(V,0,$(`td`,{colspan:n.length-V-H,style:{pointerEvents:`none`,visibility:`hidden`,height:0}})),$(`tr`,Object.assign({},U,{onMouseenter:e=>{var t;this.hoverKey=P,(t=U?.onMouseenter)==null||t.call(U,e)},key:P,class:[`${r}-data-table-tr`,k&&`${r}-data-table-tr--summary`,j&&`${r}-data-table-tr--striped`,ee&&`${r}-data-table-tr--expanded`,W,U?.class],style:[U?.style,m&&{height:re}]}),ie)};return this.shouldDisplayVirtualList?$(bt,{ref:`virtualListRef`,items:L,itemSize:this.minRowHeight,visibleItemsTag:Ti,visibleItemsProps:{clsPrefix:r,id:_,cols:n,onMouseleave:x},showScrollbar:!1,onResize:this.handleVirtualListResize,onScroll:this.handleVirtualListScroll,itemsStyle:p,itemResizable:!k,columns:n,renderItemWithCols:k?({itemIndex:e,item:t,startColIndex:n,endColIndex:r,getLeft:i})=>U({displayedRowIndex:e,isVirtual:!0,isVirtualX:!0,rowInfo:t,startColIndex:n,endColIndex:r,getLeft:i}):void 0},{default:({item:e,index:t,renderedItemWithCols:n})=>n||U({rowInfo:e,displayedRowIndex:t,isVirtual:!0,isVirtualX:!1,startColIndex:0,endColIndex:0,getLeft(e){return 0}})}):$(l,null,$(`table`,{class:`${r}-data-table-table`,onMouseleave:x,style:{tableLayout:this.mergedTableLayout}},$(`colgroup`,null,n.map(e=>$(`col`,{key:e.key,style:e.style}))),this.showHeader?$(Ci,{discrete:!1}):null,this.empty?null:$(`tbody`,{"data-n-id":_,class:`${r}-data-table-tbody`},L.map((e,t)=>U({rowInfo:e,displayedRowIndex:t,isVirtual:!1,isVirtualX:!1,startColIndex:-1,endColIndex:-1,getLeft(e){return-1}})))),this.empty&&this.xScrollable?m():null)}});return this.empty?this.explicitlyScrollable||this.xScrollable?h:$(me,{onResize:this.onResize},{default:m}):h}}),Di=S({name:`MainTable`,setup(){let{mergedClsPrefixRef:e,rightFixedColumnsRef:n,leftFixedColumnsRef:r,bodyWidthRef:a,maxHeightRef:o,minHeightRef:s,flexHeightRef:c,virtualScrollHeaderRef:l,syncScrollState:u,scrollXRef:d}=i(ar),f=K(null),p=K(null),m=K(null),h=K(!(r.value.length||n.value.length)),g=t(()=>({maxHeight:C(o.value),minHeight:C(s.value)}));function _(e){a.value=e.contentRect.width,u(),h.value||=!0}function v(){let{value:e}=f;return e?l.value?e.virtualListRef?.listElRef||null:e.$el:null}function y(){let{value:e}=p;return e?e.getScrollContainer():null}let b={getBodyElement:y,getHeaderElement:v,scrollTo(e,t){var n;(n=p.value)==null||n.scrollTo(e,t)}};return ce(()=>{let{value:t}=m;if(!t)return;let n=`${e.value}-data-table-base-table--transition-disabled`;h.value?setTimeout(()=>{t.classList.remove(n)},0):t.classList.add(n)}),Object.assign({maxHeight:o,mergedClsPrefix:e,selfElRef:m,headerInstRef:f,bodyInstRef:p,bodyStyle:g,flexHeight:c,handleBodyResize:_,scrollX:d},b)},render(){let{mergedClsPrefix:e,maxHeight:t,flexHeight:n}=this,r=t===void 0&&!n;return $(`div`,{class:`${e}-data-table-base-table`,ref:`selfElRef`},r?null:$(Ci,{ref:`headerInstRef`}),$(Ei,{ref:`bodyInstRef`,bodyStyle:this.bodyStyle,showHeader:r,flexHeight:n,onResize:this.handleBodyResize}))}}),Oi=Ai(),ki=X([B(`data-table`,`
 width: 100%;
 font-size: var(--n-font-size);
 display: flex;
 flex-direction: column;
 position: relative;
 --n-merged-th-color: var(--n-th-color);
 --n-merged-td-color: var(--n-td-color);
 --n-merged-border-color: var(--n-border-color);
 --n-merged-th-color-hover: var(--n-th-color-hover);
 --n-merged-th-color-sorting: var(--n-th-color-sorting);
 --n-merged-td-color-hover: var(--n-td-color-hover);
 --n-merged-td-color-sorting: var(--n-td-color-sorting);
 --n-merged-td-color-striped: var(--n-td-color-striped);
 `,[B(`data-table-wrapper`,`
 flex-grow: 1;
 display: flex;
 flex-direction: column;
 `),H(`flex-height`,[X(`>`,[B(`data-table-wrapper`,[X(`>`,[B(`data-table-base-table`,`
 display: flex;
 flex-direction: column;
 flex-grow: 1;
 `,[X(`>`,[B(`data-table-base-table-body`,`flex-basis: 0;`,[X(`&:last-child`,`flex-grow: 1;`)])])])])])])]),X(`>`,[B(`data-table-loading-wrapper`,`
 color: var(--n-loading-color);
 font-size: var(--n-loading-size);
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 transition: color .3s var(--n-bezier);
 display: flex;
 align-items: center;
 justify-content: center;
 `,[Be({originalTransform:`translateX(-50%) translateY(-50%)`})])]),B(`data-table-expand-placeholder`,`
 margin-right: 8px;
 display: inline-block;
 width: 16px;
 height: 1px;
 `),B(`data-table-indent`,`
 display: inline-block;
 height: 1px;
 `),B(`data-table-expand-trigger`,`
 display: inline-flex;
 margin-right: 8px;
 cursor: pointer;
 font-size: 16px;
 vertical-align: -0.2em;
 position: relative;
 width: 16px;
 height: 16px;
 color: var(--n-td-text-color);
 transition: color .3s var(--n-bezier);
 `,[H(`expanded`,[B(`icon`,`transform: rotate(90deg);`,[T({originalTransform:`rotate(90deg)`})]),B(`base-icon`,`transform: rotate(90deg);`,[T({originalTransform:`rotate(90deg)`})])]),B(`base-loading`,`
 color: var(--n-loading-color);
 transition: color .3s var(--n-bezier);
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `,[T()]),B(`icon`,`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `,[T()]),B(`base-icon`,`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `,[T()])]),B(`data-table-thead`,`
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-merged-th-color);
 `),B(`data-table-tr`,`
 position: relative;
 box-sizing: border-box;
 background-clip: padding-box;
 transition: background-color .3s var(--n-bezier);
 `,[B(`data-table-expand`,`
 position: sticky;
 left: 0;
 overflow: hidden;
 margin: calc(var(--n-th-padding) * -1);
 padding: var(--n-th-padding);
 box-sizing: border-box;
 `),H(`striped`,`background-color: var(--n-merged-td-color-striped);`,[B(`data-table-td`,`background-color: var(--n-merged-td-color-striped);`)]),U(`summary`,[X(`&:hover`,`background-color: var(--n-merged-td-color-hover);`,[X(`>`,[B(`data-table-td`,`background-color: var(--n-merged-td-color-hover);`)])])])]),B(`data-table-th`,`
 padding: var(--n-th-padding);
 position: relative;
 text-align: start;
 box-sizing: border-box;
 background-color: var(--n-merged-th-color);
 border-color: var(--n-merged-border-color);
 border-bottom: 1px solid var(--n-merged-border-color);
 color: var(--n-th-text-color);
 transition:
 border-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 font-weight: var(--n-th-font-weight);
 `,[H(`filterable`,`
 padding-right: 36px;
 `,[H(`sortable`,`
 padding-right: calc(var(--n-th-padding) + 36px);
 `)]),Oi,H(`selection`,`
 padding: 0;
 text-align: center;
 line-height: 0;
 z-index: 3;
 `),Z(`title-wrapper`,`
 display: flex;
 align-items: center;
 flex-wrap: nowrap;
 max-width: 100%;
 `,[Z(`title`,`
 flex: 1;
 min-width: 0;
 `)]),Z(`ellipsis`,`
 display: inline-block;
 vertical-align: bottom;
 text-overflow: ellipsis;
 overflow: hidden;
 white-space: nowrap;
 max-width: 100%;
 `),H(`hover`,`
 background-color: var(--n-merged-th-color-hover);
 `),H(`sorting`,`
 background-color: var(--n-merged-th-color-sorting);
 `),H(`sortable`,`
 cursor: pointer;
 `,[Z(`ellipsis`,`
 max-width: calc(100% - 18px);
 `),X(`&:hover`,`
 background-color: var(--n-merged-th-color-hover);
 `)]),B(`data-table-sorter`,`
 height: var(--n-sorter-size);
 width: var(--n-sorter-size);
 margin-left: 4px;
 position: relative;
 display: inline-flex;
 align-items: center;
 justify-content: center;
 vertical-align: -0.2em;
 color: var(--n-th-icon-color);
 transition: color .3s var(--n-bezier);
 `,[B(`base-icon`,`transition: transform .3s var(--n-bezier)`),H(`desc`,[B(`base-icon`,`
 transform: rotate(0deg);
 `)]),H(`asc`,[B(`base-icon`,`
 transform: rotate(-180deg);
 `)]),H(`asc, desc`,`
 color: var(--n-th-icon-color-active);
 `)]),B(`data-table-resize-button`,`
 width: var(--n-resizable-container-size);
 position: absolute;
 top: 0;
 right: calc(var(--n-resizable-container-size) / 2);
 bottom: 0;
 cursor: col-resize;
 user-select: none;
 `,[X(`&::after`,`
 width: var(--n-resizable-size);
 height: 50%;
 position: absolute;
 top: 50%;
 left: calc(var(--n-resizable-container-size) / 2);
 bottom: 0;
 background-color: var(--n-merged-border-color);
 transform: translateY(-50%);
 transition: background-color .3s var(--n-bezier);
 z-index: 1;
 content: '';
 `),H(`active`,[X(`&::after`,` 
 background-color: var(--n-th-icon-color-active);
 `)]),X(`&:hover::after`,`
 background-color: var(--n-th-icon-color-active);
 `)]),B(`data-table-filter`,`
 position: absolute;
 z-index: auto;
 right: 0;
 width: 36px;
 top: 0;
 bottom: 0;
 cursor: pointer;
 display: flex;
 justify-content: center;
 align-items: center;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 font-size: var(--n-filter-size);
 color: var(--n-th-icon-color);
 `,[X(`&:hover`,`
 background-color: var(--n-th-button-color-hover);
 `),H(`show`,`
 background-color: var(--n-th-button-color-hover);
 `),H(`active`,`
 background-color: var(--n-th-button-color-hover);
 color: var(--n-th-icon-color-active);
 `)])]),B(`data-table-td`,`
 padding: var(--n-td-padding);
 text-align: start;
 box-sizing: border-box;
 border: none;
 background-color: var(--n-merged-td-color);
 color: var(--n-td-text-color);
 border-bottom: 1px solid var(--n-merged-border-color);
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `,[H(`expand`,[B(`data-table-expand-trigger`,`
 margin-right: 0;
 `)]),H(`last-row`,`
 border-bottom: 0 solid var(--n-merged-border-color);
 `,[X(`&::after`,`
 bottom: 0 !important;
 `),X(`&::before`,`
 bottom: 0 !important;
 `)]),H(`summary`,`
 background-color: var(--n-merged-th-color);
 `),H(`hover`,`
 background-color: var(--n-merged-td-color-hover);
 `),H(`sorting`,`
 background-color: var(--n-merged-td-color-sorting);
 `),Z(`ellipsis`,`
 display: inline-block;
 text-overflow: ellipsis;
 overflow: hidden;
 white-space: nowrap;
 max-width: 100%;
 vertical-align: bottom;
 max-width: calc(100% - var(--indent-offset, -1.5) * 16px - 24px);
 `),H(`selection, expand`,`
 text-align: center;
 padding: 0;
 line-height: 0;
 `),Oi]),B(`data-table-empty`,`
 box-sizing: border-box;
 padding: var(--n-empty-padding);
 flex-grow: 1;
 flex-shrink: 0;
 opacity: 1;
 display: flex;
 align-items: center;
 justify-content: center;
 transition: opacity .3s var(--n-bezier);
 `,[H(`hide`,`
 opacity: 0;
 `)]),Z(`pagination`,`
 margin: var(--n-pagination-margin);
 display: flex;
 justify-content: flex-end;
 `),B(`data-table-wrapper`,`
 position: relative;
 opacity: 1;
 transition: opacity .3s var(--n-bezier), border-color .3s var(--n-bezier);
 border-top-left-radius: var(--n-border-radius);
 border-top-right-radius: var(--n-border-radius);
 line-height: var(--n-line-height);
 `),H(`loading`,[B(`data-table-wrapper`,`
 opacity: var(--n-opacity-loading);
 pointer-events: none;
 `)]),H(`single-column`,[B(`data-table-td`,`
 border-bottom: 0 solid var(--n-merged-border-color);
 `,[X(`&::after, &::before`,`
 bottom: 0 !important;
 `)])]),U(`single-line`,[B(`data-table-th`,`
 border-right: 1px solid var(--n-merged-border-color);
 `,[H(`last`,`
 border-right: 0 solid var(--n-merged-border-color);
 `)]),B(`data-table-td`,`
 border-right: 1px solid var(--n-merged-border-color);
 `,[H(`last-col`,`
 border-right: 0 solid var(--n-merged-border-color);
 `)])]),H(`bordered`,[B(`data-table-wrapper`,`
 border: 1px solid var(--n-merged-border-color);
 border-bottom-left-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 overflow: hidden;
 `)]),B(`data-table-base-table`,[H(`transition-disabled`,[B(`data-table-th`,[X(`&::after, &::before`,`transition: none;`)]),B(`data-table-td`,[X(`&::after, &::before`,`transition: none;`)])])]),H(`bottom-bordered`,[B(`data-table-td`,[H(`last-row`,`
 border-bottom: 1px solid var(--n-merged-border-color);
 `)])]),B(`data-table-table`,`
 font-variant-numeric: tabular-nums;
 width: 100%;
 word-break: break-word;
 transition: background-color .3s var(--n-bezier);
 border-collapse: separate;
 border-spacing: 0;
 background-color: var(--n-merged-td-color);
 `),B(`data-table-base-table-header`,`
 border-top-left-radius: calc(var(--n-border-radius) - 1px);
 border-top-right-radius: calc(var(--n-border-radius) - 1px);
 z-index: 3;
 overflow: scroll;
 flex-shrink: 0;
 transition: border-color .3s var(--n-bezier);
 scrollbar-width: none;
 `,[X(`&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb`,`
 display: none;
 width: 0;
 height: 0;
 `)]),B(`data-table-check-extra`,`
 transition: color .3s var(--n-bezier);
 color: var(--n-th-icon-color);
 position: absolute;
 font-size: 14px;
 right: -4px;
 top: 50%;
 transform: translateY(-50%);
 z-index: 1;
 `)]),B(`data-table-filter-menu`,[B(`scrollbar`,`
 max-height: 240px;
 `),Z(`group`,`
 display: flex;
 flex-direction: column;
 padding: 12px 12px 0 12px;
 `,[B(`checkbox`,`
 margin-bottom: 12px;
 margin-right: 0;
 `),B(`radio`,`
 margin-bottom: 12px;
 margin-right: 0;
 `)]),Z(`action`,`
 padding: var(--n-action-padding);
 display: flex;
 flex-wrap: nowrap;
 justify-content: space-evenly;
 border-top: 1px solid var(--n-action-divider-color);
 `,[B(`button`,[X(`&:not(:last-child)`,`
 margin: var(--n-action-button-margin);
 `),X(`&:last-child`,`
 margin-right: 0;
 `)])]),B(`divider`,`
 margin: 0 !important;
 `)]),ae(B(`data-table`,`
 --n-merged-th-color: var(--n-th-color-modal);
 --n-merged-td-color: var(--n-td-color-modal);
 --n-merged-border-color: var(--n-border-color-modal);
 --n-merged-th-color-hover: var(--n-th-color-hover-modal);
 --n-merged-td-color-hover: var(--n-td-color-hover-modal);
 --n-merged-th-color-sorting: var(--n-th-color-hover-modal);
 --n-merged-td-color-sorting: var(--n-td-color-hover-modal);
 --n-merged-td-color-striped: var(--n-td-color-striped-modal);
 `)),re(B(`data-table`,`
 --n-merged-th-color: var(--n-th-color-popover);
 --n-merged-td-color: var(--n-td-color-popover);
 --n-merged-border-color: var(--n-border-color-popover);
 --n-merged-th-color-hover: var(--n-th-color-hover-popover);
 --n-merged-td-color-hover: var(--n-td-color-hover-popover);
 --n-merged-th-color-sorting: var(--n-th-color-hover-popover);
 --n-merged-td-color-sorting: var(--n-td-color-hover-popover);
 --n-merged-td-color-striped: var(--n-td-color-striped-popover);
 `))]);function Ai(){return[H(`fixed-left`,`
 left: 0;
 position: sticky;
 z-index: 2;
 `,[X(`&::after`,`
 pointer-events: none;
 content: "";
 width: 36px;
 display: inline-block;
 position: absolute;
 top: 0;
 bottom: -1px;
 transition: box-shadow .2s var(--n-bezier);
 right: -36px;
 `)]),H(`fixed-right`,`
 right: 0;
 position: sticky;
 z-index: 1;
 `,[X(`&::before`,`
 pointer-events: none;
 content: "";
 width: 36px;
 display: inline-block;
 position: absolute;
 top: 0;
 bottom: -1px;
 transition: box-shadow .2s var(--n-bezier);
 left: -36px;
 `)])]}function ji(e,n){let{paginatedDataRef:r,treeMateRef:i,selectionColumnRef:a}=n,o=K(e.defaultCheckedRowKeys),s=t(()=>{let{checkedRowKeys:t}=e,n=t===void 0?o.value:t;return a.value?.multiple===!1?{checkedKeys:n.slice(0,1),indeterminateKeys:[]}:i.value.getCheckedKeys(n,{cascade:e.cascade,allowNotLoaded:e.allowCheckingNotLoaded})}),c=t(()=>s.value.checkedKeys),l=t(()=>s.value.indeterminateKeys),u=t(()=>new Set(c.value)),d=t(()=>new Set(l.value)),f=t(()=>{let{value:e}=u;return r.value.reduce((t,n)=>{let{key:r,disabled:i}=n;return t+(!i&&e.has(r)?1:0)},0)}),p=t(()=>r.value.filter(e=>e.disabled).length),m=t(()=>{let{length:e}=r.value,{value:t}=d;return f.value>0&&f.value<e-p.value||r.value.some(e=>t.has(e.key))}),h=t(()=>{let{length:e}=r.value;return f.value!==0&&f.value===e-p.value}),g=t(()=>r.value.length===0);function _(t,n,r){let{"onUpdate:checkedRowKeys":a,onUpdateCheckedRowKeys:s,onCheckedRowKeysChange:c}=e,l=[],{value:{getNode:u}}=i;t.forEach(e=>{let t=u(e)?.rawNode;l.push(t)}),a&&E(a,t,l,{row:n,action:r}),s&&E(s,t,l,{row:n,action:r}),c&&E(c,t,l,{row:n,action:r}),o.value=t}function v(t,n=!1,r){if(!e.loading){if(n){_(Array.isArray(t)?t.slice(0,1):[t],r,`check`);return}_(i.value.check(t,c.value,{cascade:e.cascade,allowNotLoaded:e.allowCheckingNotLoaded}).checkedKeys,r,`check`)}}function y(t,n){e.loading||_(i.value.uncheck(t,c.value,{cascade:e.cascade,allowNotLoaded:e.allowCheckingNotLoaded}).checkedKeys,n,`uncheck`)}function b(t=!1){let{value:n}=a;if(!n||e.loading)return;let o=[];(t?i.value.treeNodes:r.value).forEach(e=>{e.disabled||o.push(e.key)}),_(i.value.check(o,c.value,{cascade:!0,allowNotLoaded:e.allowCheckingNotLoaded}).checkedKeys,void 0,`checkAll`)}function x(t=!1){let{value:n}=a;if(!n||e.loading)return;let o=[];(t?i.value.treeNodes:r.value).forEach(e=>{e.disabled||o.push(e.key)}),_(i.value.uncheck(o,c.value,{cascade:!0,allowNotLoaded:e.allowCheckingNotLoaded}).checkedKeys,void 0,`uncheckAll`)}return{mergedCheckedRowKeySetRef:u,mergedCheckedRowKeysRef:c,mergedInderminateRowKeySetRef:d,someRowsCheckedRef:m,allRowsCheckedRef:h,headerCheckboxDisabledRef:g,doUpdateCheckedRowKeys:_,doCheckAll:b,doUncheckAll:x,doCheck:v,doUncheck:y}}function Mi(e,t){let n=x(()=>{for(let t of e.columns)if(t.type===`expand`)return t.renderExpand}),r=x(()=>{let t;for(let n of e.columns)if(n.type===`expand`){t=n.expandable;break}return t}),i=K(e.defaultExpandAll?n?.value?(()=>{let e=[];return t.value.treeNodes.forEach(t=>{r.value?.call(r,t.rawNode)&&e.push(t.key)}),e})():t.value.getNonLeafKeys():e.defaultExpandedRowKeys),a=W(e,`expandedRowKeys`),o=W(e,`stickyExpandedRows`),s=Ie(a,i);function c(t){let{onUpdateExpandedRowKeys:n,"onUpdate:expandedRowKeys":r}=e;n&&E(n,t),r&&E(r,t),i.value=t}return{stickyExpandedRowsRef:o,mergedExpandedRowKeysRef:s,renderExpandRef:n,expandableRef:r,doUpdateExpandedRowKeys:c}}function Ni(e,t){let n=[],r=[],i=[],a=new WeakMap,o=-1,s=0,c=!1,l=0;function u(e,a){a>o&&(n[a]=[],o=a),e.forEach(e=>{if(`children`in e)u(e.children,a+1);else{let n=`key`in e?e.key:void 0;r.push({key:cr(e),style:fr(e,n===void 0?void 0:C(t(n))),column:e,index:l++,width:e.width===void 0?128:Number(e.width)}),s+=1,c||=!!e.ellipsis,i.push(e)}})}u(e,0),l=0;function d(e,t){let r=0;e.forEach(e=>{if(`children`in e){let r=l,i={column:e,colIndex:l,colSpan:0,rowSpan:1,isLast:!1};d(e.children,t+1),e.children.forEach(e=>{i.colSpan+=a.get(e)?.colSpan??0}),r+i.colSpan===s&&(i.isLast=!0),a.set(e,i),n[t].push(i)}else{if(l<r){l+=1;return}let i=1;`titleColSpan`in e&&(i=e.titleColSpan??1),i>1&&(r=l+i);let c=l+i===s,u={column:e,colSpan:i,colIndex:l,rowSpan:o-t+1,isLast:c};a.set(e,u),n[t].push(u),l+=1}})}return d(e,0),{hasEllipsis:c,rows:n,cols:r,dataRelatedCols:i}}function Pi(e,n){let r=t(()=>Ni(e.columns,n));return{rowsRef:t(()=>r.value.rows),colsRef:t(()=>r.value.cols),hasEllipsisRef:t(()=>r.value.hasEllipsis),dataRelatedColsRef:t(()=>r.value.dataRelatedCols)}}function Fi(){let e=K({});function t(t){return e.value[t]}function n(t,n){gr(t)&&`key`in t&&(e.value[t.key]=n)}function r(){e.value={}}return{getResizableWidth:t,doUpdateResizableWidth:n,clearResizableWidth:r}}function Ii(e,{mainTableInstRef:n,mergedCurrentPageRef:r,bodyWidthRef:i,maxHeightRef:a,mergedTableLayoutRef:o}){let s=t(()=>e.scrollX!==void 0||a.value!==void 0||e.flexHeight),c=t(()=>{let t=!s.value&&o.value===`auto`;return e.scrollX!==void 0||t}),l=0,u=K(),d=K(null),f=K([]),p=K(null),m=K([]),h=t(()=>C(e.scrollX)),g=t(()=>e.columns.filter(e=>e.fixed===`left`)),_=t(()=>e.columns.filter(e=>e.fixed===`right`)),v=t(()=>{let e={},t=0;function n(r){r.forEach(r=>{let i={start:t,end:0};e[cr(r)]=i,`children`in r?(n(r.children),i.end=t):(t+=or(r)||0,i.end=t)})}return n(g.value),e}),y=t(()=>{let e={},t=0;function n(r){for(let i=r.length-1;i>=0;--i){let a=r[i],o={start:t,end:0};e[cr(a)]=o,`children`in a?(n(a.children),o.end=t):(t+=or(a)||0,o.end=t)}}return n(_.value),e});function b(){let{value:e}=g,t=0,{value:n}=v,r=null;for(let i=0;i<e.length;++i){let a=cr(e[i]);if(l>(n[a]?.start||0)-t)r=a,t=n[a]?.end||0;else break}d.value=r}function x(){f.value=[];let t=e.columns.find(e=>cr(e)===d.value);for(;t&&`children`in t;){let e=t.children.length;if(e===0)break;let n=t.children[e-1];f.value.push(cr(n)),t=n}}function S(){let{value:t}=_,n=Number(e.scrollX),{value:r}=i;if(r===null)return;let a=0,o=null,{value:s}=y;for(let e=t.length-1;e>=0;--e){let i=cr(t[e]);if(Math.round(l+(s[i]?.start||0)+r-a)<n)o=i,a=s[i]?.end||0;else break}p.value=o}function w(){m.value=[];let t=e.columns.find(e=>cr(e)===p.value);for(;t&&`children`in t&&t.children.length;){let e=t.children[0];m.value.push(cr(e)),t=e}}function T(){return{header:n.value?n.value.getHeaderElement():null,body:n.value?n.value.getBodyElement():null}}function E(){let{body:e}=T();e&&(e.scrollTop=0)}function D(){u.value===`body`?u.value=void 0:Te(k)}function O(t){var n;(n=e.onScroll)==null||n.call(e,t),u.value===`head`?u.value=void 0:Te(k)}function k(){let{header:e,body:t}=T();if(!t)return;let{value:n}=i;if(n!==null){if(e){let n=l-e.scrollLeft;u.value=n===0?`body`:`head`,u.value===`head`?(l=e.scrollLeft,t.scrollLeft=l):(l=t.scrollLeft,e.scrollLeft=l)}else l=t.scrollLeft;b(),x(),S(),w()}}function A(e){let{header:t}=T();t&&(t.scrollLeft=e,k())}return q(r,()=>{E()}),{styleScrollXRef:h,fixedColumnLeftMapRef:v,fixedColumnRightMapRef:y,leftFixedColumnsRef:g,rightFixedColumnsRef:_,leftActiveFixedColKeyRef:d,leftActiveFixedChildrenColKeysRef:f,rightActiveFixedColKeyRef:p,rightActiveFixedChildrenColKeysRef:m,syncScrollState:k,handleTableBodyScroll:O,handleTableHeaderScroll:D,setHeaderScrollLeft:A,explicitlyScrollableRef:s,xScrollableRef:c}}function Li(e){return typeof e==`object`&&typeof e.multiple==`number`&&e.multiple}function Ri(e,t){return t&&(e===void 0||e==="default"||typeof e==`object`&&e.compare==="default")?zi(t):typeof e==`function`?e:e&&typeof e==`object`&&e.compare&&e.compare!=="default"?e.compare:!1}function zi(e){return(t,n)=>{let r=t[e],i=n[e];return r==null?i==null?0:-1:i==null?1:typeof r==`number`&&typeof i==`number`?r-i:typeof r==`string`&&typeof i==`string`?r.localeCompare(i):0}}function Bi(e,{dataRelatedColsRef:n,filteredDataRef:r}){let i=[];n.value.forEach(e=>{e.sorter!==void 0&&p(i,{columnKey:e.key,sorter:e.sorter,order:e.defaultSortOrder??!1})});let a=K(i),o=t(()=>{let e=n.value.filter(e=>e.type!==`selection`&&e.sorter!==void 0&&(e.sortOrder===`ascend`||e.sortOrder===`descend`||e.sortOrder===!1)),t=e.filter(e=>e.sortOrder!==!1);if(t.length)return t.map(e=>({columnKey:e.key,order:e.sortOrder,sorter:e.sorter}));if(e.length)return[];let{value:r}=a;return Array.isArray(r)?r:r?[r]:[]}),s=t(()=>{let e=o.value.slice().sort((e,t)=>{let n=Li(e.sorter)||0;return(Li(t.sorter)||0)-n});return e.length?r.value.slice().sort((t,n)=>{let r=0;return e.some(e=>{let{columnKey:i,sorter:a,order:o}=e,s=Ri(a,i);return s&&o&&(r=s(t.rawNode,n.rawNode),r!==0)?(r*=ur(o),!0):!1}),r}):r.value});function c(e){let t=o.value.slice();return e&&Li(e.sorter)!==!1?(t=t.filter(e=>Li(e.sorter)!==!1),p(t,e),t):e||null}function l(e){u(c(e))}function u(t){let{"onUpdate:sorter":n,onUpdateSorter:r,onSorterChange:i}=e;n&&E(n,t),r&&E(r,t),i&&E(i,t),a.value=t}function d(e,t=`ascend`){if(!e)f();else{let r=n.value.find(t=>t.type!==`selection`&&t.type!==`expand`&&t.key===e);if(!r?.sorter)return;let i=r.sorter;l({columnKey:e,sorter:i,order:t})}}function f(){u(null)}function p(e,t){let n=e.findIndex(e=>t?.columnKey&&e.columnKey===t.columnKey);n!==void 0&&n>=0?e[n]=t:e.push(t)}return{clearSorter:f,sort:d,sortedDataRef:s,mergedSortStateRef:o,deriveNextSorter:l}}function Vi(e,{dataRelatedColsRef:n}){let r=t(()=>{let t=e=>{for(let n=0;n<e.length;++n){let r=e[n];if(`children`in r)return t(r.children);if(r.type===`selection`)return r}return null};return t(e.columns)}),i=t(()=>{let{childrenKey:t}=e;return Cn(e.data,{ignoreEmptyChildren:!0,getKey:e.rowKey,getChildren:e=>e[t],getDisabled:e=>{var t;return!!((t=r.value)?.disabled)?.call(t,e)}})}),a=x(()=>{let{columns:t}=e,{length:n}=t,r=null;for(let e=0;e<n;++e){let n=t[e];if(!n.type&&r===null&&(r=e),`tree`in n&&n.tree)return e}return r||0}),o=K({}),{pagination:s}=e,c=K(s&&s.defaultPage||1),l=K($n(s)),u=t(()=>{let e=n.value.filter(e=>e.filterOptionValues!==void 0||e.filterOptionValue!==void 0),t={};return e.forEach(e=>{e.type!==`selection`&&e.type!==`expand`&&(e.filterOptionValues===void 0?t[e.key]=e.filterOptionValue??null:t[e.key]=e.filterOptionValues)}),Object.assign(lr(o.value),t)}),d=t(()=>{let t=u.value,{columns:n}=e;function r(e){return(t,n)=>!!~String(n[e]).indexOf(String(t))}let{value:{treeNodes:a}}=i,o=[];return n.forEach(e=>{e.type===`selection`||e.type===`expand`||`children`in e||o.push([e.key,e])}),a?a.filter(e=>{let{rawNode:n}=e;for(let[e,i]of o){let a=t[e];if(a==null||(Array.isArray(a)||(a=[a]),!a.length))continue;let o=i.filter==="default"?r(e):i.filter;if(i&&typeof o==`function`)if(i.filterMode===`and`){if(a.some(e=>!o(e,n)))return!1}else if(a.some(e=>o(e,n)))continue;else return!1}return!0}):[]}),{sortedDataRef:f,deriveNextSorter:p,mergedSortStateRef:m,sort:h,clearSorter:g}=Bi(e,{dataRelatedColsRef:n,filteredDataRef:d});n.value.forEach(e=>{if(e.filter){let t=e.defaultFilterOptionValues;e.filterMultiple?o.value[e.key]=t||[]:t===void 0?o.value[e.key]=e.defaultFilterOptionValue??null:o.value[e.key]=t===null?[]:t}});let _=t(()=>{let{pagination:t}=e;if(t!==!1)return t.page}),v=t(()=>{let{pagination:t}=e;if(t!==!1)return t.pageSize}),y=Ie(_,c),b=Ie(v,l),S=x(()=>{let t=y.value;return e.remote?t:Math.max(1,Math.min(Math.ceil(d.value.length/b.value),t))}),C=t(()=>{let{pagination:t}=e;if(t){let{pageCount:e}=t;if(e!==void 0)return e}}),w=t(()=>{if(e.remote)return i.value.treeNodes;if(!e.pagination)return f.value;let t=b.value,n=(S.value-1)*t;return f.value.slice(n,n+t)}),T=t(()=>w.value.map(e=>e.rawNode));function D(t){let{pagination:n}=e;if(n){let{onChange:e,"onUpdate:page":r,onUpdatePage:i}=n;e&&E(e,t),i&&E(i,t),r&&E(r,t),j(t)}}function O(t){let{pagination:n}=e;if(n){let{onPageSizeChange:e,"onUpdate:pageSize":r,onUpdatePageSize:i}=n;e&&E(e,t),i&&E(i,t),r&&E(r,t),M(t)}}let k=t(()=>{if(e.remote){let{pagination:t}=e;if(t){let{itemCount:e}=t;if(e!==void 0)return e}return}return d.value.length}),A=t(()=>Object.assign(Object.assign({},e.pagination),{onChange:void 0,onUpdatePage:void 0,onUpdatePageSize:void 0,onPageSizeChange:void 0,"onUpdate:page":D,"onUpdate:pageSize":O,page:S.value,pageSize:b.value,pageCount:k.value===void 0?C.value:void 0,itemCount:k.value}));function j(t){let{"onUpdate:page":n,onPageChange:r,onUpdatePage:i}=e;i&&E(i,t),n&&E(n,t),r&&E(r,t),c.value=t}function M(t){let{"onUpdate:pageSize":n,onPageSizeChange:r,onUpdatePageSize:i}=e;r&&E(r,t),i&&E(i,t),n&&E(n,t),l.value=t}function N(t,n){let{onUpdateFilters:r,"onUpdate:filters":i,onFiltersChange:a}=e;r&&E(r,t,n),i&&E(i,t,n),a&&E(a,t,n),o.value=t}function P(t,n,r,i){var a;(a=e.onUnstableColumnResize)==null||a.call(e,t,n,r,i)}function F(e){j(e)}function I(){L()}function L(){R({})}function R(e){z(e)}function z(e){e?e&&(o.value=lr(e)):o.value={}}return{treeMateRef:i,mergedCurrentPageRef:S,mergedPaginationRef:A,paginatedDataRef:w,rawPaginatedDataRef:T,mergedFilterStateRef:u,mergedSortStateRef:m,hoverKeyRef:K(null),selectionColumnRef:r,childTriggerColIndexRef:a,doUpdateFilters:N,deriveNextSorter:p,doUpdatePageSize:M,doUpdatePage:j,onUnstableColumnResize:P,filter:z,filters:R,clearFilter:I,clearFilters:L,clearSorter:g,page:F,sort:h}}var Hi=S({name:`DataTable`,alias:[`AdvancedTable`],props:ir,slots:Object,setup(e,{slots:n}){let{mergedBorderedRef:r,mergedClsPrefixRef:i,inlineThemeDisabled:a,mergedRtlRef:o,mergedComponentPropsRef:c}=Q(e),l=d(`DataTable`,o,i),u=t(()=>e.size||c?.value?.DataTable?.size||`medium`),f=t(()=>{let{bottomBordered:t}=e;return r.value?!1:t===void 0||t}),p=m(`DataTable`,`-data-table`,ki,tt,e,i),h=K(null),g=K(null),{getResizableWidth:_,clearResizableWidth:v,doUpdateResizableWidth:y}=Fi(),{rowsRef:b,colsRef:x,dataRelatedColsRef:S,hasEllipsisRef:C}=Pi(e,_),{treeMateRef:w,mergedCurrentPageRef:T,paginatedDataRef:E,rawPaginatedDataRef:D,selectionColumnRef:O,hoverKeyRef:k,mergedPaginationRef:A,mergedFilterStateRef:j,mergedSortStateRef:M,childTriggerColIndexRef:N,doUpdatePage:P,doUpdateFilters:F,onUnstableColumnResize:I,deriveNextSorter:z,filter:ee,filters:te,clearFilter:B,clearFilters:V,clearSorter:H,page:U,sort:ne}=Vi(e,{dataRelatedColsRef:S}),re=t=>{let{fileName:n=`data.csv`,keepOriginalData:r=!1}=t||{},i=r?e.data:D.value,a=Sr(e.columns,i,e.getCsvCell,e.getCsvHeader),o=new Blob([a],{type:`text/csv;charset=utf-8`}),s=URL.createObjectURL(o);Tt(s,n.endsWith(`.csv`)?n:`${n}.csv`),URL.revokeObjectURL(s)},{doCheckAll:G,doUncheckAll:ie,doCheck:ae,doUncheck:q,headerCheckboxDisabledRef:oe,someRowsCheckedRef:Y,allRowsCheckedRef:se,mergedCheckedRowKeySetRef:ce,mergedInderminateRowKeySetRef:X}=ji(e,{selectionColumnRef:O,treeMateRef:w,paginatedDataRef:E}),{stickyExpandedRowsRef:le,mergedExpandedRowKeysRef:ue,renderExpandRef:Z,expandableRef:de,doUpdateExpandedRowKeys:fe}=Mi(e,w),pe=W(e,`maxHeight`),$=t(()=>e.virtualScroll||e.flexHeight||e.maxHeight!==void 0||C.value?`fixed`:e.tableLayout),{handleTableBodyScroll:me,handleTableHeaderScroll:he,syncScrollState:ge,setHeaderScrollLeft:_e,leftActiveFixedColKeyRef:ve,leftActiveFixedChildrenColKeysRef:ye,rightActiveFixedColKeyRef:be,rightActiveFixedChildrenColKeysRef:xe,leftFixedColumnsRef:Se,rightFixedColumnsRef:Ce,fixedColumnLeftMapRef:we,fixedColumnRightMapRef:Te,xScrollableRef:Ee,explicitlyScrollableRef:De}=Ii(e,{bodyWidthRef:h,mainTableInstRef:g,mergedCurrentPageRef:T,maxHeightRef:pe,mergedTableLayoutRef:$}),{localeRef:Oe}=Ue(`DataTable`);R(ar,{xScrollableRef:Ee,explicitlyScrollableRef:De,props:e,treeMateRef:w,renderExpandIconRef:W(e,`renderExpandIcon`),loadingKeySetRef:K(new Set),slots:n,indentRef:W(e,`indent`),childTriggerColIndexRef:N,bodyWidthRef:h,componentId:L(),hoverKeyRef:k,mergedClsPrefixRef:i,mergedThemeRef:p,scrollXRef:t(()=>e.scrollX),rowsRef:b,colsRef:x,paginatedDataRef:E,leftActiveFixedColKeyRef:ve,leftActiveFixedChildrenColKeysRef:ye,rightActiveFixedColKeyRef:be,rightActiveFixedChildrenColKeysRef:xe,leftFixedColumnsRef:Se,rightFixedColumnsRef:Ce,fixedColumnLeftMapRef:we,fixedColumnRightMapRef:Te,mergedCurrentPageRef:T,someRowsCheckedRef:Y,allRowsCheckedRef:se,mergedSortStateRef:M,mergedFilterStateRef:j,loadingRef:W(e,`loading`),rowClassNameRef:W(e,`rowClassName`),mergedCheckedRowKeySetRef:ce,mergedExpandedRowKeysRef:ue,mergedInderminateRowKeySetRef:X,localeRef:Oe,expandableRef:de,stickyExpandedRowsRef:le,rowKeyRef:W(e,`rowKey`),renderExpandRef:Z,summaryRef:W(e,`summary`),virtualScrollRef:W(e,`virtualScroll`),virtualScrollXRef:W(e,`virtualScrollX`),heightForRowRef:W(e,`heightForRow`),minRowHeightRef:W(e,`minRowHeight`),virtualScrollHeaderRef:W(e,`virtualScrollHeader`),headerHeightRef:W(e,`headerHeight`),rowPropsRef:W(e,`rowProps`),stripedRef:W(e,`striped`),checkOptionsRef:t(()=>{let{value:e}=O;return e?.options}),rawPaginatedDataRef:D,filterMenuCssVarsRef:t(()=>{let{self:{actionDividerColor:e,actionPadding:t,actionButtonMargin:n}}=p.value;return{"--n-action-padding":t,"--n-action-button-margin":n,"--n-action-divider-color":e}}),onLoadRef:W(e,`onLoad`),mergedTableLayoutRef:$,maxHeightRef:pe,minHeightRef:W(e,`minHeight`),flexHeightRef:W(e,`flexHeight`),headerCheckboxDisabledRef:oe,paginationBehaviorOnFilterRef:W(e,`paginationBehaviorOnFilter`),summaryPlacementRef:W(e,`summaryPlacement`),filterIconPopoverPropsRef:W(e,`filterIconPopoverProps`),scrollbarPropsRef:W(e,`scrollbarProps`),syncScrollState:ge,doUpdatePage:P,doUpdateFilters:F,getResizableWidth:_,onUnstableColumnResize:I,clearResizableWidth:v,doUpdateResizableWidth:y,deriveNextSorter:z,doCheck:ae,doUncheck:q,doCheckAll:G,doUncheckAll:ie,doUpdateExpandedRowKeys:fe,handleTableHeaderScroll:he,handleTableBodyScroll:me,setHeaderScrollLeft:_e,renderCell:W(e,`renderCell`)});let ke={filter:ee,filters:te,clearFilters:V,clearSorter:H,page:U,sort:ne,clearFilter:B,downloadCsv:re,scrollTo:(e,t)=>{var n;(n=g.value)==null||n.scrollTo(e,t)}},Ae=t(()=>{let e=u.value,{common:{cubicBezierEaseInOut:t},self:{borderColor:n,tdColorHover:r,tdColorSorting:i,tdColorSortingModal:a,tdColorSortingPopover:o,thColorSorting:s,thColorSortingModal:c,thColorSortingPopover:l,thColor:d,thColorHover:f,tdColor:m,tdTextColor:h,thTextColor:g,thFontWeight:_,thButtonColorHover:v,thIconColor:y,thIconColorActive:b,filterSize:x,borderRadius:S,lineHeight:C,tdColorModal:w,thColorModal:T,borderColorModal:E,thColorHoverModal:D,tdColorHoverModal:O,borderColorPopover:k,thColorPopover:A,tdColorPopover:j,tdColorHoverPopover:M,thColorHoverPopover:N,paginationMargin:P,emptyPadding:F,boxShadowAfter:I,boxShadowBefore:L,sorterSize:R,resizableContainerSize:z,resizableSize:ee,loadingColor:te,loadingSize:B,opacityLoading:V,tdColorStriped:H,tdColorStripedModal:U,tdColorStripedPopover:W,[J(`fontSize`,e)]:ne,[J(`thPadding`,e)]:re,[J(`tdPadding`,e)]:G}}=p.value;return{"--n-font-size":ne,"--n-th-padding":re,"--n-td-padding":G,"--n-bezier":t,"--n-border-radius":S,"--n-line-height":C,"--n-border-color":n,"--n-border-color-modal":E,"--n-border-color-popover":k,"--n-th-color":d,"--n-th-color-hover":f,"--n-th-color-modal":T,"--n-th-color-hover-modal":D,"--n-th-color-popover":A,"--n-th-color-hover-popover":N,"--n-td-color":m,"--n-td-color-hover":r,"--n-td-color-modal":w,"--n-td-color-hover-modal":O,"--n-td-color-popover":j,"--n-td-color-hover-popover":M,"--n-th-text-color":g,"--n-td-text-color":h,"--n-th-font-weight":_,"--n-th-button-color-hover":v,"--n-th-icon-color":y,"--n-th-icon-color-active":b,"--n-filter-size":x,"--n-pagination-margin":P,"--n-empty-padding":F,"--n-box-shadow-before":L,"--n-box-shadow-after":I,"--n-sorter-size":R,"--n-resizable-container-size":z,"--n-resizable-size":ee,"--n-loading-size":B,"--n-loading-color":te,"--n-opacity-loading":V,"--n-td-color-striped":H,"--n-td-color-striped-modal":U,"--n-td-color-striped-popover":W,"--n-td-color-sorting":i,"--n-td-color-sorting-modal":a,"--n-td-color-sorting-popover":o,"--n-th-color-sorting":s,"--n-th-color-sorting-modal":c,"--n-th-color-sorting-popover":l}}),je=a?s(`data-table`,t(()=>u.value[0]),Ae,e):void 0,Me=t(()=>{if(!e.pagination)return!1;if(e.paginateSinglePage)return!0;let t=A.value,{pageCount:n}=t;return n===void 0?t.itemCount&&t.pageSize&&t.itemCount>t.pageSize:n>1});return Object.assign({mainTableInstRef:g,mergedClsPrefix:i,rtlEnabled:l,mergedTheme:p,paginatedData:E,mergedBordered:r,mergedBottomBordered:f,mergedPagination:A,mergedShowPagination:Me,cssVars:a?void 0:Ae,themeClass:je?.themeClass,onRender:je?.onRender},ke)},render(){let{mergedClsPrefix:e,themeClass:t,onRender:r,$slots:i,spinProps:a}=this;return r?.(),$(`div`,{class:[`${e}-data-table`,this.rtlEnabled&&`${e}-data-table--rtl`,t,{[`${e}-data-table--bordered`]:this.mergedBordered,[`${e}-data-table--bottom-bordered`]:this.mergedBottomBordered,[`${e}-data-table--single-line`]:this.singleLine,[`${e}-data-table--single-column`]:this.singleColumn,[`${e}-data-table--loading`]:this.loading,[`${e}-data-table--flex-height`]:this.flexHeight}],style:this.cssVars},$(`div`,{class:`${e}-data-table-wrapper`},$(Di,{ref:`mainTableInstRef`})),this.mergedShowPagination?$(`div`,{class:`${e}-data-table__pagination`},$(rr,Object.assign({theme:this.mergedTheme.peers.Pagination,themeOverrides:this.mergedTheme.peerOverrides.Pagination,disabled:this.loading},this.mergedPagination))):null,$(fe,{name:`fade-in-scale-up-transition`},{default:()=>this.loading?$(`div`,{class:`${e}-data-table-loading-wrapper`},n(i.loading,()=>[$(ie,Object.assign({clsPrefix:e,strokeWidth:20},a))])):null}))}});export{Tt as i,Ir as n,En as r,Hi as t};