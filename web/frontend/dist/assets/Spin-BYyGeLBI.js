import{Gn as e,Gt as t,Jt as n,O as r,Vt as i,Wt as a,Xt as o,b as s,fn as c,lt as l,tn as u,ut as d,v as f,xn as p,y as m,yn as h,zn as g}from"./auth-CPbU0tuF.js";import{a as _}from"./AppShell-C9SOApOS.js";import{n as v}from"./light-DJJ7zD0M.js";var y=a([a(`@keyframes spin-rotate`,`
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
 `,[f()])]),t(`spin-body`,`
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
 `)])]),b={small:20,medium:18,large:16},x=Object.assign(Object.assign(Object.assign({},r.props),{contentClass:String,contentStyle:[Object,String],description:String,size:{type:[String,Number],default:`medium`},show:{type:Boolean,default:!0},rotate:{type:Boolean,default:!0},spinning:{type:Boolean,validator:()=>!0,default:void 0},delay:Number}),s),S=h({name:`Spin`,props:x,slots:Object,setup(t){let{mergedClsPrefixRef:n,inlineThemeDisabled:a}=d(t),s=r(`Spin`,`-spin`,y,v,t,n),u=c(()=>{let{size:e}=t,{common:{cubicBezierEaseInOut:n},self:r}=s.value,{opacitySpinning:a,color:c,textColor:l}=r;return{"--n-bezier":n,"--n-opacity-spinning":a,"--n-size":typeof e==`number`?i(e):r[o(`size`,e)],"--n-color":c,"--n-text-color":l}}),f=a?l(`spin`,c(()=>{let{size:e}=t;return typeof e==`number`?String(e):e[0]}),u,t):void 0,p=_(t,[`spinning`,`show`]),m=e(!1);return g(e=>{let n;if(p.value){let{delay:r}=t;if(r){n=window.setTimeout(()=>{m.value=!0},r),e(()=>{clearTimeout(n)});return}}m.value=p.value}),{mergedClsPrefix:n,active:m,mergedStrokeWidth:c(()=>{let{strokeWidth:e}=t;if(e!==void 0)return e;let{size:n}=t;return b[typeof n==`number`?`medium`:n]}),cssVars:a?void 0:u,themeClass:f?.themeClass,onRender:f?.onRender}},render(){var e;let{$slots:t,mergedClsPrefix:n,description:r}=this,i=t.icon&&this.rotate,a=(r||t.description)&&p(`div`,{class:`${n}-spin-description`},r||t.description?.call(t)),o=t.icon?p(`div`,{class:[`${n}-spin-body`,this.themeClass]},p(`div`,{class:[`${n}-spin`,i&&`${n}-spin--rotate`],style:t.default?``:this.cssVars},t.icon()),a):p(`div`,{class:[`${n}-spin-body`,this.themeClass]},p(m,{clsPrefix:n,style:t.default?``:this.cssVars,stroke:this.stroke,"stroke-width":this.mergedStrokeWidth,radius:this.radius,scale:this.scale,class:`${n}-spin`}),a);return(e=this.onRender)==null||e.call(this),t.default?p(`div`,{class:[`${n}-spin-container`,this.themeClass],style:this.cssVars},p(`div`,{class:[`${n}-spin-content`,this.active&&`${n}-spin-content--spinning`,this.contentClass],style:this.contentStyle},t),p(u,{name:`fade-in-transition`},{default:()=>this.active?o:null})):o}});export{S as t};