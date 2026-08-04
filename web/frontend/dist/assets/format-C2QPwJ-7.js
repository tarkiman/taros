import{Dt as e,Gt as t,Rt as n,S as r,St as i,_t as a,bt as o,fn as s,gt as c,m as l,nt as u,p as d,qt as f,tt as p,vn as m}from"./auth-CDeeRorZ.js";import{o as h}from"./AppShell-DADsiY02.js";import{k as g,o as _}from"./_plugin-vue_export-helper-B7M-GU9I.js";import{n as v}from"./light-uLu6Jf9O.js";var y=c([c(`@keyframes spin-rotate`,`
 from {
 transform: rotate(0);
 }
 to {
 transform: rotate(360deg);
 }
 `),a(`spin-container`,`
 position: relative;
 `,[a(`spin-body`,`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 `,[_()])]),a(`spin-body`,`
 display: inline-flex;
 align-items: center;
 justify-content: center;
 flex-direction: column;
 `),a(`spin`,`
 display: inline-flex;
 height: var(--n-size);
 width: var(--n-size);
 font-size: var(--n-size);
 color: var(--n-color);
 `,[o(`rotate`,`
 animation: spin-rotate 2s linear infinite;
 `)]),a(`spin-description`,`
 display: inline-block;
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 margin-top: 8px;
 `),a(`spin-content`,`
 opacity: 1;
 transition: opacity .3s var(--n-bezier);
 pointer-events: all;
 `,[o(`spinning`,`
 user-select: none;
 -webkit-user-select: none;
 pointer-events: none;
 opacity: var(--n-opacity-spinning);
 `)])]),b={small:20,medium:18,large:16},x=Object.assign(Object.assign(Object.assign({},r.props),{contentClass:String,contentStyle:[Object,String],description:String,size:{type:[String,Number],default:`medium`},show:{type:Boolean,default:!0},rotate:{type:Boolean,default:!0},spinning:{type:Boolean,validator:()=>!0,default:void 0},delay:Number}),l),S=t({name:`Spin`,props:x,slots:Object,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:a}=u(e),o=r(`Spin`,`-spin`,y,v,e,t),c=n(()=>{let{size:t}=e,{common:{cubicBezierEaseInOut:n},self:r}=o.value,{opacitySpinning:a,color:s,textColor:c}=r;return{"--n-bezier":n,"--n-opacity-spinning":a,"--n-size":typeof t==`number`?g(t):r[i(`size`,t)],"--n-color":s,"--n-text-color":c}}),l=a?p(`spin`,n(()=>{let{size:t}=e;return typeof t==`number`?String(t):t[0]}),c,e):void 0,d=h(e,[`spinning`,`show`]),f=m(!1);return s(t=>{let n;if(d.value){let{delay:r}=e;if(r){n=window.setTimeout(()=>{f.value=!0},r),t(()=>{clearTimeout(n)});return}}f.value=d.value}),{mergedClsPrefix:t,active:f,mergedStrokeWidth:n(()=>{let{strokeWidth:t}=e;if(t!==void 0)return t;let{size:n}=e;return b[typeof n==`number`?`medium`:n]}),cssVars:a?void 0:c,themeClass:l?.themeClass,onRender:l?.onRender}},render(){var t;let{$slots:n,mergedClsPrefix:r,description:i}=this,a=n.icon&&this.rotate,o=(i||n.description)&&f(`div`,{class:`${r}-spin-description`},i||n.description?.call(n)),s=n.icon?f(`div`,{class:[`${r}-spin-body`,this.themeClass]},f(`div`,{class:[`${r}-spin`,a&&`${r}-spin--rotate`],style:n.default?``:this.cssVars},n.icon()),o):f(`div`,{class:[`${r}-spin-body`,this.themeClass]},f(d,{clsPrefix:r,style:n.default?``:this.cssVars,stroke:this.stroke,"stroke-width":this.mergedStrokeWidth,radius:this.radius,scale:this.scale,class:`${r}-spin`}),o);return(t=this.onRender)==null||t.call(this),n.default?f(`div`,{class:[`${r}-spin-container`,this.themeClass],style:this.cssVars},f(`div`,{class:[`${r}-spin-content`,this.active&&`${r}-spin-content--spinning`,this.contentClass],style:this.contentStyle},n),f(e,{name:`fade-in-transition`},{default:()=>this.active?s:null})):s}});function C(e){if(e<0||Number.isNaN(e))return`—`;let t=1024;if(e<t)return`${e.toFixed(0)} B`;let n=t,r=0;for(let i=e/t;i>=t;i/=t)n*=t,r++;return`${(e/n).toFixed(1)} ${`KMGTPE`[r]}B`}function w(e){let t=new Date(e);if(Number.isNaN(t.getTime()))return`—`;let n=e=>String(e).padStart(2,`0`);return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}export{w as n,S as r,C as t};