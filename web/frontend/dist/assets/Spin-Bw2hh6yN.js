import{Bn as e,Gt as t,Jt as n,Kn as r,O as i,Sn as a,Vt as o,Wt as s,Xt as c,b as l,bn as u,lt as d,nn as f,pn as p,ut as m,v as h,y as g}from"./auth-CKvW4zla.js";import{o as _}from"./AppShell-CFec9gIt.js";import{n as v}from"./light-DkB7KYbe.js";var y=s([s(`@keyframes spin-rotate`,`
 from {
 transform: rotate(0);
 }
 to {
 transform: rotate(360deg);
 }
 `),t(`spin-container`,`
 position: relative;
 `,[t(`spin-body`,`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 `,[h()])]),t(`spin-body`,`
 display: inline-flex;
 align-items: center;
 justify-content: center;
 flex-direction: column;
 `),t(`spin`,`
 display: inline-flex;
 height: var(--n-size);
 width: var(--n-size);
 font-size: var(--n-size);
 color: var(--n-color);
 `,[n(`rotate`,`
 animation: spin-rotate 2s linear infinite;
 `)]),t(`spin-description`,`
 display: inline-block;
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 margin-top: 8px;
 `),t(`spin-content`,`
 opacity: 1;
 transition: opacity .3s var(--n-bezier);
 pointer-events: all;
 `,[n(`spinning`,`
 user-select: none;
 -webkit-user-select: none;
 pointer-events: none;
 opacity: var(--n-opacity-spinning);
 `)])]),b={small:20,medium:18,large:16},x=Object.assign(Object.assign(Object.assign({},i.props),{contentClass:String,contentStyle:[Object,String],description:String,size:{type:[String,Number],default:`medium`},show:{type:Boolean,default:!0},rotate:{type:Boolean,default:!0},spinning:{type:Boolean,validator:()=>!0,default:void 0},delay:Number}),l),S=u({name:`Spin`,props:x,slots:Object,setup(t){let{mergedClsPrefixRef:n,inlineThemeDisabled:a}=m(t),s=i(`Spin`,`-spin`,y,v,t,n),l=p(()=>{let{size:e}=t,{common:{cubicBezierEaseInOut:n},self:r}=s.value,{opacitySpinning:i,color:a,textColor:l}=r;return{"--n-bezier":n,"--n-opacity-spinning":i,"--n-size":typeof e==`number`?o(e):r[c(`size`,e)],"--n-color":a,"--n-text-color":l}}),u=a?d(`spin`,p(()=>{let{size:e}=t;return typeof e==`number`?String(e):e[0]}),l,t):void 0,f=_(t,[`spinning`,`show`]),h=r(!1);return e(e=>{let n;if(f.value){let{delay:r}=t;if(r){n=window.setTimeout(()=>{h.value=!0},r),e(()=>{clearTimeout(n)});return}}h.value=f.value}),{mergedClsPrefix:n,active:h,mergedStrokeWidth:p(()=>{let{strokeWidth:e}=t;if(e!==void 0)return e;let{size:n}=t;return b[typeof n==`number`?`medium`:n]}),cssVars:a?void 0:l,themeClass:u?.themeClass,onRender:u?.onRender}},render(){var e;let{$slots:t,mergedClsPrefix:n,description:r}=this,i=t.icon&&this.rotate,o=(r||t.description)&&a(`div`,{class:`${n}-spin-description`},r||t.description?.call(t)),s=t.icon?a(`div`,{class:[`${n}-spin-body`,this.themeClass]},a(`div`,{class:[`${n}-spin`,i&&`${n}-spin--rotate`],style:t.default?``:this.cssVars},t.icon()),o):a(`div`,{class:[`${n}-spin-body`,this.themeClass]},a(g,{clsPrefix:n,style:t.default?``:this.cssVars,stroke:this.stroke,"stroke-width":this.mergedStrokeWidth,radius:this.radius,scale:this.scale,class:`${n}-spin`}),o);return(e=this.onRender)==null||e.call(this),t.default?a(`div`,{class:[`${n}-spin-container`,this.themeClass],style:this.cssVars},a(`div`,{class:[`${n}-spin-content`,this.active&&`${n}-spin-content--spinning`,this.contentClass],style:this.contentStyle},t),a(f,{name:`fade-in-transition`},{default:()=>this.active?s:null})):s}});export{S as t};