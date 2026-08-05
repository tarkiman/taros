import{Bt as e,C as t,Fn as n,It as r,Jn as i,Kt as a,Mn as o,O as s,Qt as c,Sn as l,T as u,Un as d,Ut as f,Xt as p,Yt as m,Zn as h,Zt as g,_,_n as v,bn as y,cn as b,ct as x,er as S,gn as C,hn as w,ht as T,l as E,lt as ee,n as D,qt as O,r as k,rr as A,ut as j,vn as M,vt as N,wn as P,xn as F,y as I,yn as L,yt as R}from"./auth-C3tLNBl0.js";import{d as z,f as B,r as V,t as H}from"./AppShell-gMkJZkOj.js";import{c as U,t as W}from"./_plugin-vue_export-helper-OW_rLE0U.js";import{t as G}from"./Input-trlWXUr8.js";import{t as K}from"./Alert-C1mMEZMU.js";import{t as q}from"./Card-CGSoNiB9.js";import{t as J}from"./use-message-l296anoF.js";import{t as Y}from"./Space-Bi2_uJyF.js";import{t as X}from"./_common-BnUKsVpJ.js";import{t as Z}from"./triangle-alert-NL539K1J.js";function Q(e){let{primaryColor:t,opacityDisabled:n,borderRadius:i,textColor3:a}=e;return Object.assign(Object.assign({},X),{iconColor:a,textColor:`white`,loadingColor:t,opacityDisabled:n,railColor:`rgba(0, 0, 0, .14)`,railColorActive:t,buttonBoxShadow:`0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)`,buttonColor:`#FFF`,railBorderRadiusSmall:i,railBorderRadiusMedium:i,railBorderRadiusLarge:i,buttonBorderRadiusSmall:i,buttonBorderRadiusMedium:i,buttonBorderRadiusLarge:i,boxShadowFocus:`0 0 0 2px ${r(t,{alpha:.2})}`})}var te={name:`Switch`,common:_,self:Q},ne=O(`switch`,`
 height: var(--n-height);
 min-width: var(--n-width);
 vertical-align: middle;
 user-select: none;
 -webkit-user-select: none;
 display: inline-flex;
 outline: none;
 justify-content: center;
 align-items: center;
`,[m(`children-placeholder`,`
 height: var(--n-rail-height);
 display: flex;
 flex-direction: column;
 overflow: hidden;
 pointer-events: none;
 visibility: hidden;
 `),m(`rail-placeholder`,`
 display: flex;
 flex-wrap: none;
 `),m(`button-placeholder`,`
 width: calc(1.75 * var(--n-rail-height));
 height: var(--n-rail-height);
 `),O(`base-loading`,`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 font-size: calc(var(--n-button-width) - 4px);
 color: var(--n-loading-color);
 transition: color .3s var(--n-bezier);
 `,[t({left:`50%`,top:`50%`,originalTransform:`translateX(-50%) translateY(-50%)`})]),m(`checked, unchecked`,`
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 box-sizing: border-box;
 position: absolute;
 white-space: nowrap;
 top: 0;
 bottom: 0;
 display: flex;
 align-items: center;
 line-height: 1;
 `),m(`checked`,`
 right: 0;
 padding-right: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),m(`unchecked`,`
 left: 0;
 justify-content: flex-end;
 padding-left: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),a(`&:focus`,[m(`rail`,`
 box-shadow: var(--n-box-shadow-focus);
 `)]),p(`round`,[m(`rail`,`border-radius: calc(var(--n-rail-height) / 2);`,[m(`button`,`border-radius: calc(var(--n-button-height) / 2);`)])]),g(`disabled`,[g(`icon`,[p(`rubber-band`,[p(`pressed`,[m(`rail`,[m(`button`,`max-width: var(--n-button-width-pressed);`)])]),m(`rail`,[a(`&:active`,[m(`button`,`max-width: var(--n-button-width-pressed);`)])]),p(`active`,[p(`pressed`,[m(`rail`,[m(`button`,`left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));`)])]),m(`rail`,[a(`&:active`,[m(`button`,`left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));`)])])])])])]),p(`active`,[m(`rail`,[m(`button`,`left: calc(100% - var(--n-button-width) - var(--n-offset))`)])]),m(`rail`,`
 overflow: hidden;
 height: var(--n-rail-height);
 min-width: var(--n-rail-width);
 border-radius: var(--n-rail-border-radius);
 cursor: pointer;
 position: relative;
 transition:
 opacity .3s var(--n-bezier),
 background .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-rail-color);
 `,[m(`button-icon`,`
 color: var(--n-icon-color);
 transition: color .3s var(--n-bezier);
 font-size: calc(var(--n-button-height) - 4px);
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 display: flex;
 justify-content: center;
 align-items: center;
 line-height: 1;
 `,[t()]),m(`button`,`
 align-items: center; 
 top: var(--n-offset);
 left: var(--n-offset);
 height: var(--n-button-height);
 width: var(--n-button-width-pressed);
 max-width: var(--n-button-width);
 border-radius: var(--n-button-border-radius);
 background-color: var(--n-button-color);
 box-shadow: var(--n-button-box-shadow);
 box-sizing: border-box;
 cursor: inherit;
 content: "";
 position: absolute;
 transition:
 background-color .3s var(--n-bezier),
 left .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 max-width .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 `)]),p(`active`,[m(`rail`,`background-color: var(--n-rail-color-active);`)]),p(`loading`,[m(`rail`,`
 cursor: wait;
 `)]),p(`disabled`,[m(`rail`,`
 cursor: not-allowed;
 opacity: .5;
 `)])]),re=Object.assign(Object.assign({},s.props),{size:String,value:{type:[String,Number,Boolean],default:void 0},loading:Boolean,defaultValue:{type:[String,Number,Boolean],default:!1},disabled:{type:Boolean,default:void 0},round:{type:Boolean,default:!0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],checkedValue:{type:[String,Number,Boolean],default:!0},uncheckedValue:{type:[String,Number,Boolean],default:!1},railStyle:Function,rubberBand:{type:Boolean,default:!0},spinProps:Object,onChange:[Function,Array]}),$,ie=l({name:`Switch`,props:re,slots:Object,setup(t){$===void 0&&($=typeof CSS<`u`?CSS.supports!==void 0&&CSS.supports(`width`,`max(1px)`):!0);let{mergedClsPrefixRef:n,inlineThemeDisabled:r,mergedComponentPropsRef:a}=j(t),o=s(`Switch`,`-switch`,ne,te,t,n),l=x(t,{mergedSize(e){return t.size===void 0?e?e.mergedSize.value:a?.value?.Switch?.size||`medium`:t.size}}),{mergedSizeRef:u,mergedDisabledRef:d}=l,p=i(t.defaultValue),m=h(t,`value`),g=U(m,p),_=w(()=>g.value===t.checkedValue),v=i(!1),y=i(!1),b=w(()=>{let{railStyle:e}=t;if(e)return e({focused:y.value,checked:_.value})});function S(e){let{"onUpdate:value":n,onChange:r,onUpdateValue:i}=t,{nTriggerFormInput:a,nTriggerFormChange:o}=l;n&&R(n,e),i&&R(i,e),r&&R(r,e),p.value=e,a(),o()}function C(){let{nTriggerFormFocus:e}=l;e()}function T(){let{nTriggerFormBlur:e}=l;e()}function E(){t.loading||d.value||(g.value===t.checkedValue?S(t.uncheckedValue):S(t.checkedValue))}function D(){y.value=!0,C()}function O(){y.value=!1,T(),v.value=!1}function k(e){t.loading||d.value||e.key===` `&&(g.value===t.checkedValue?S(t.uncheckedValue):S(t.checkedValue),v.value=!1)}function A(e){t.loading||d.value||e.key===` `&&(e.preventDefault(),v.value=!0)}let M=w(()=>{let{value:t}=u,{self:{opacityDisabled:n,railColor:r,railColorActive:i,buttonBoxShadow:a,buttonColor:s,boxShadowFocus:l,loadingColor:d,textColor:p,iconColor:m,[c(`buttonHeight`,t)]:h,[c(`buttonWidth`,t)]:g,[c(`buttonWidthPressed`,t)]:_,[c(`railHeight`,t)]:v,[c(`railWidth`,t)]:y,[c(`railBorderRadius`,t)]:b,[c(`buttonBorderRadius`,t)]:x},common:{cubicBezierEaseInOut:S}}=o.value,C,w,T;return $?(C=`calc((${v} - ${h}) / 2)`,w=`max(${v}, ${h})`,T=`max(${y}, calc(${y} + ${h} - ${v}))`):(C=f((e(v)-e(h))/2),w=f(Math.max(e(v),e(h))),T=e(v)>e(h)?y:f(e(y)+e(h)-e(v))),{"--n-bezier":S,"--n-button-border-radius":x,"--n-button-box-shadow":a,"--n-button-color":s,"--n-button-width":g,"--n-button-width-pressed":_,"--n-button-height":h,"--n-height":w,"--n-offset":C,"--n-opacity-disabled":n,"--n-rail-border-radius":b,"--n-rail-color":r,"--n-rail-color-active":i,"--n-rail-height":v,"--n-rail-width":y,"--n-width":T,"--n-box-shadow-focus":l,"--n-loading-color":d,"--n-text-color":p,"--n-icon-color":m}}),N=r?ee(`switch`,w(()=>u.value[0]),M,t):void 0;return{handleClick:E,handleBlur:O,handleFocus:D,handleKeyup:k,handleKeydown:A,mergedRailStyle:b,pressed:v,mergedClsPrefix:n,mergedValue:g,checked:_,mergedDisabled:d,cssVars:r?void 0:M,themeClass:N?.themeClass,onRender:N?.onRender}},render(){let{mergedClsPrefix:e,mergedDisabled:t,checked:n,mergedRailStyle:r,onRender:i,$slots:a}=this;i?.();let{checked:o,unchecked:s,icon:c,"checked-icon":l,"unchecked-icon":d}=a,f=!(T(c)&&T(l)&&T(d));return P(`div`,{role:`switch`,"aria-checked":n,class:[`${e}-switch`,this.themeClass,f&&`${e}-switch--icon`,n&&`${e}-switch--active`,t&&`${e}-switch--disabled`,this.round&&`${e}-switch--round`,this.loading&&`${e}-switch--loading`,this.pressed&&`${e}-switch--pressed`,this.rubberBand&&`${e}-switch--rubber-band`],tabindex:this.mergedDisabled?void 0:0,style:this.cssVars,onClick:this.handleClick,onFocus:this.handleFocus,onBlur:this.handleBlur,onKeyup:this.handleKeyup,onKeydown:this.handleKeydown},P(`div`,{class:`${e}-switch__rail`,"aria-hidden":`true`,style:r},N(o,t=>N(s,n=>t||n?P(`div`,{"aria-hidden":!0,class:`${e}-switch__children-placeholder`},P(`div`,{class:`${e}-switch__rail-placeholder`},P(`div`,{class:`${e}-switch__button-placeholder`}),t),P(`div`,{class:`${e}-switch__rail-placeholder`},P(`div`,{class:`${e}-switch__button-placeholder`}),n)):null)),P(`div`,{class:`${e}-switch__button`},N(c,t=>N(l,n=>N(d,r=>P(u,null,{default:()=>this.loading?P(I,Object.assign({key:`loading`,clsPrefix:e,strokeWidth:20},this.spinProps)):this.checked&&(n||t)?P(`div`,{class:`${e}-switch__button-icon`,key:n?`checked-icon`:`icon`},n||t):!this.checked&&(r||t)?P(`div`,{class:`${e}-switch__button-icon`,key:r?`unchecked-icon`:`icon`},r||t):null})))),N(o,t=>t&&P(`div`,{key:`checked`,class:`${e}-switch__checked`},t)),N(s,t=>t&&P(`div`,{key:`unchecked`,class:`${e}-switch__unchecked`},t)))))}}),ae={setTerminalEnabled:(e,t)=>k.post(`/api/settings/terminal`,{enabled:e,password:t})},oe={key:0,class:`loading`},se={key:1,class:`flow-row`},ce={key:2,class:`flow-row`},le=W(l({__name:`SettingsView`,setup(e){let t=J(),r=i(!0),a=i(!1);async function s(){r.value=!0;try{let e=await V.status();a.value=e.enabled}catch{t.error(`Gagal membaca status Terminal.`)}finally{r.value=!1}}o(s);let c=i(`idle`),l=i(``),u=i(``),f=i(!1);function p(e){f.value=e,u.value=``,l.value=``,c.value=`confirm`}function m(){c.value=`idle`,u.value=``}function h(){u.value=``,l.value=``,c.value=`confirm`}async function g(){if(u.value){c.value=`applying`,l.value=``;try{await ae.setTerminalEnabled(f.value,u.value),c.value=`restarting`,_()}catch(e){l.value=e instanceof D&&e.status===403?`Password salah.`:e instanceof Error?e.message:`Gagal mengubah pengaturan.`,c.value=`error`}}}async function _(){for(let e=0;e<30;e++){await new Promise(e=>setTimeout(e,1e3));try{if((await fetch(`/api/terminal/status`,{credentials:`include`})).ok){location.reload();return}}catch{}}location.reload()}return(e,t)=>(n(),v(H,null,{default:d(()=>[F(S(q),{title:`Pengaturan`},{default:d(()=>[r.value?(n(),L(`div`,oe,[F(S(z),{size:`large`})])):(n(),v(S(q),{key:1,embedded:``,size:`small`,title:`Web Terminal`},{default:d(()=>[F(S(Y),{vertical:``,size:12},{default:d(()=>[F(S(Y),{align:`center`,justify:`space-between`},{default:d(()=>[t[1]||=C(`span`,null,`Akses shell sungguhan lewat dashboard`,-1),F(S(ie),{value:a.value,disabled:c.value!==`idle`,"onUpdate:value":p},null,8,[`value`,`disabled`])]),_:1}),c.value===`confirm`?(n(),v(S(K),{key:0,type:`warning`,"show-icon":!1},{default:d(()=>[F(S(Y),{vertical:``,size:10},{default:d(()=>[C(`span`,null,A(f.value?`Mengaktifkan`:`Menonaktifkan`)+` Terminal akan me-restart servis (downtime singkat) dan kamu perlu login ulang setelahnya. Masukkan password dashboard untuk konfirmasi. `,1),F(S(G),{value:u.value,"onUpdate:value":t[0]||=e=>u.value=e,type:`password`,"show-password-on":`click`,placeholder:`Password dashboard`,autocomplete:`current-password`,onKeyup:b(g,[`enter`])},null,8,[`value`]),F(S(Y),null,{default:d(()=>[F(S(E),{size:`small`,onClick:m},{default:d(()=>[...t[2]||=[y(`Batal`,-1)]]),_:1}),F(S(E),{size:`small`,type:`primary`,disabled:!u.value,onClick:g},{default:d(()=>[y(A(f.value?`Aktifkan`:`Nonaktifkan`),1)]),_:1},8,[`disabled`])]),_:1})]),_:1})]),_:1})):c.value===`applying`?(n(),L(`div`,se,[F(S(z),{size:`small`}),t[3]||=y(),t[4]||=C(`span`,null,`Menyimpan & me-restart servis…`,-1)])):c.value===`restarting`?(n(),L(`div`,ce,[F(S(z),{size:`small`}),t[5]||=y(),t[6]||=C(`span`,null,`Menunggu servis kembali… halaman akan dimuat ulang otomatis.`,-1)])):c.value===`error`?(n(),v(S(K),{key:3,type:`error`,"show-icon":!1},{default:d(()=>[F(S(Y),{vertical:``,size:10},{default:d(()=>[C(`span`,null,[F(S(B),{component:S(Z),size:`14`},null,8,[`component`]),y(` `+A(l.value),1)]),F(S(E),{size:`small`,onClick:h},{default:d(()=>[...t[7]||=[y(`Coba lagi`,-1)]]),_:1})]),_:1})]),_:1})):M(``,!0),t[8]||=C(`p`,{class:`text-muted`},` Nonaktif secara default karena ini fitur dengan akses paling luas di aplikasi — lihat docs/07-security.md §7.6 kalau baca dari repo. Setelah aktif, menu Terminal muncul di topbar. `,-1)]),_:1})]),_:1}))]),_:1})]),_:1}))}}),[[`__scopeId`,`data-v-c78cef11`]]);export{le as default};