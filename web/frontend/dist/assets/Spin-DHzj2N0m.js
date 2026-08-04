import{Bt as e,C as t,St as n,Yt as r,bn as i,h as a,kt as o,m as s,mn as c,nt as l,qt as u,rt as d,vt as f,wt as p,yt as m}from"./auth-Trpo-0ON.js";import{s as h}from"./AppShell-BQP-X2Kk.js";import{k as g,o as _}from"./_plugin-vue_export-helper-C4Zs982g.js";import{n as v}from"./light-C_5NTV8-.js";var y=f([f(`@keyframes spin-rotate`,`
 from {
 transform: rotate(0);
 }
 to {
 transform: rotate(360deg);
 }
 `),m(`spin-container`,`
 position: relative;
 `,[m(`spin-body`,`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 `,[_()])]),m(`spin-body`,`
 display: inline-flex;
 align-items: center;
 justify-content: center;
 flex-direction: column;
 `),m(`spin`,`
 display: inline-flex;
 height: var(--n-size);
 width: var(--n-size);
 font-size: var(--n-size);
 color: var(--n-color);
 `,[n(`rotate`,`
 animation: spin-rotate 2s linear infinite;
 `)]),m(`spin-description`,`
 display: inline-block;
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 margin-top: 8px;
 `),m(`spin-content`,`
 opacity: 1;
 transition: opacity .3s var(--n-bezier);
 pointer-events: all;
 `,[n(`spinning`,`
 user-select: none;
 -webkit-user-select: none;
 pointer-events: none;
 opacity: var(--n-opacity-spinning);
 `)])]),b={small:20,medium:18,large:16},x=Object.assign(Object.assign(Object.assign({},t.props),{contentClass:String,contentStyle:[Object,String],description:String,size:{type:[String,Number],default:`medium`},show:{type:Boolean,default:!0},rotate:{type:Boolean,default:!0},spinning:{type:Boolean,validator:()=>!0,default:void 0},delay:Number}),a),S=u({name:`Spin`,props:x,slots:Object,setup(n){let{mergedClsPrefixRef:r,inlineThemeDisabled:a}=d(n),o=t(`Spin`,`-spin`,y,v,n,r),s=e(()=>{let{size:e}=n,{common:{cubicBezierEaseInOut:t},self:r}=o.value,{opacitySpinning:i,color:a,textColor:s}=r;return{"--n-bezier":t,"--n-opacity-spinning":i,"--n-size":typeof e==`number`?g(e):r[p(`size`,e)],"--n-color":a,"--n-text-color":s}}),u=a?l(`spin`,e(()=>{let{size:e}=n;return typeof e==`number`?String(e):e[0]}),s,n):void 0,f=h(n,[`spinning`,`show`]),m=i(!1);return c(e=>{let t;if(f.value){let{delay:r}=n;if(r){t=window.setTimeout(()=>{m.value=!0},r),e(()=>{clearTimeout(t)});return}}m.value=f.value}),{mergedClsPrefix:r,active:m,mergedStrokeWidth:e(()=>{let{strokeWidth:e}=n;if(e!==void 0)return e;let{size:t}=n;return b[typeof t==`number`?`medium`:t]}),cssVars:a?void 0:s,themeClass:u?.themeClass,onRender:u?.onRender}},render(){var e;let{$slots:t,mergedClsPrefix:n,description:i}=this,a=t.icon&&this.rotate,c=(i||t.description)&&r(`div`,{class:`${n}-spin-description`},i||t.description?.call(t)),l=t.icon?r(`div`,{class:[`${n}-spin-body`,this.themeClass]},r(`div`,{class:[`${n}-spin`,a&&`${n}-spin--rotate`],style:t.default?``:this.cssVars},t.icon()),c):r(`div`,{class:[`${n}-spin-body`,this.themeClass]},r(s,{clsPrefix:n,style:t.default?``:this.cssVars,stroke:this.stroke,"stroke-width":this.mergedStrokeWidth,radius:this.radius,scale:this.scale,class:`${n}-spin`}),c);return(e=this.onRender)==null||e.call(this),t.default?r(`div`,{class:[`${n}-spin-container`,this.themeClass],style:this.cssVars},r(`div`,{class:[`${n}-spin-content`,this.active&&`${n}-spin-content--spinning`,this.contentClass],style:this.contentStyle},t),r(o,{name:`fade-in-transition`},{default:()=>this.active?l:null})):l}});export{S as t};