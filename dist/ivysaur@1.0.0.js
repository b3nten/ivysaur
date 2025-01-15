function it(t){let e=Object.create(null);for(let r of t.split(","))e[r]=1;return r=>r in
e}var ot=Object.assign;var te=Object.prototype.hasOwnProperty,q=(t,e)=>te.call(t,e),R=Array.isArray,P=t=>Mt(
t)==="[object Map]";var ee=t=>typeof t=="string",M=t=>typeof t=="symbol",F=t=>t!==null&&typeof t=="o\
bject";var re=Object.prototype.toString,Mt=t=>re.call(t),Lt=t=>Mt(t).slice(8,-1);var X=t=>ee(t)&&t!=="NaN"&&t[0]!=="-"&&""+parseInt(t,10)===t;var J=t=>{let e=Object.create(null);return r=>e[r]||(e[r]=t(r))},ne=/-(\w)/g,Me=J(
t=>t.replace(ne,(e,r)=>r?r.toUpperCase():"")),se=/\B([A-Z])/g,Le=J(t=>t.replace(
se,"-$1").toLowerCase()),ie=J(t=>t.charAt(0).toUpperCase()+t.slice(1)),Ie=J(t=>t?
`on${ie(t)}`:""),L=(t,e)=>!Object.is(t,e);var oe="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,reado\
nly";var ke=it(oe+",async,autofocus,autoplay,controls,default,defer,disabled,hidden,i\
nert,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected");var b,ft=class{constructor(e=!1){this.detached=e,this._active=!0,this.effects=[],
this.cleanups=[],this._isPaused=!1,this.parent=b,!e&&b&&(this.index=(b.scopes||(b.
scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){
this._isPaused=!0;let e,r;if(this.scopes)for(e=0,r=this.scopes.length;e<r;e++)this.
scopes[e].pause();for(e=0,r=this.effects.length;e<r;e++)this.effects[e].pause()}}resume(){
if(this._active&&this._isPaused){this._isPaused=!1;let e,r;if(this.scopes)for(e=
0,r=this.scopes.length;e<r;e++)this.scopes[e].resume();for(e=0,r=this.effects.length;e<
r;e++)this.effects[e].resume()}}run(e){if(this._active){let r=b;try{return b=this,
e()}finally{b=r}}}on(){b=this}off(){b=this.parent}stop(e){if(this._active){this.
_active=!1;let r,n;for(r=0,n=this.effects.length;r<n;r++)this.effects[r].stop();
for(this.effects.length=0,r=0,n=this.cleanups.length;r<n;r++)this.cleanups[r]();
if(this.cleanups.length=0,this.scopes){for(r=0,n=this.scopes.length;r<n;r++)this.
scopes[r].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){let s=this.
parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.
index)}this.parent=void 0}}};function bt(t){return new ft(t)}var u;var at=new WeakSet,V=class{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=
void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,b&&
b.active&&b.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.
flags&=-65,at.has(this)&&(at.delete(this),this.trigger()))}notify(){this.flags&2&&
!(this.flags&32)||this.flags&8||ae(this)}run(){if(!(this.flags&1))return this.fn();
this.flags|=2,It(this),Ft(this);let e=u,r=y;u=this,y=!0;try{return this.fn()}finally{
jt(this),u=e,y=r,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=
e.nextDep)Tt(e);this.deps=this.depsTail=void 0,It(this),this.onStop&&this.onStop(),
this.flags&=-2}}trigger(){this.flags&64?at.add(this):this.scheduler?this.scheduler():
this.runIfDirty()}runIfDirty(){ut(this)&&this.run()}get dirty(){return ut(this)}},
Pt=0,U,G;function ae(t,e=!1){if(t.flags|=8,e){t.next=G,G=t;return}t.next=U,U=t}function yt(){
Pt++}function St(){if(--Pt>0)return;if(G){let e=G;for(G=void 0;e;){let r=e.next;
e.next=void 0,e.flags&=-9,e=r}}let t;for(;U;){let e=U;for(U=void 0;e;){let r=e.next;
if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(n){t||(t=n)}e=r}}if(t)
throw t}function Ft(t){for(let e=t.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=
e.dep.activeLink,e.dep.activeLink=e}function jt(t){let e,r=t.depsTail,n=r;for(;n;){
let s=n.prevDep;n.version===-1?(n===r&&(r=s),Tt(n),le(n)):e=n,n.dep.activeLink=n.
prevActiveLink,n.prevActiveLink=void 0,n=s}t.deps=e,t.depsTail=r}function ut(t){
for(let e=t.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(ce(
e.dep.computed)||e.dep.version!==e.version))return!0;return!!t._dirty}function ce(t){
if(t.flags&4&&!(t.flags&16)||(t.flags&=-17,t.globalVersion===K))return;t.globalVersion=
K;let e=t.dep;if(t.flags|=2,e.version>0&&!t.isSSR&&t.deps&&!ut(t)){t.flags&=-3;return}
let r=u,n=y;u=t,y=!0;try{Ft(t);let s=t.fn(t._value);(e.version===0||L(s,t._value))&&
(t._value=s,e.version++)}catch(s){throw e.version++,s}finally{u=r,y=n,jt(t),t.flags&=
-3}}function Tt(t,e=!1){let{dep:r,prevSub:n,nextSub:s}=t;if(n&&(n.nextSub=s,t.prevSub=
void 0),s&&(s.prevSub=n,t.nextSub=void 0),r.subs===t&&(r.subs=n,!n&&r.computed)){
r.computed.flags&=-5;for(let i=r.computed.deps;i;i=i.nextDep)Tt(i,!0)}!e&&!--r.sc&&
r.map&&r.map.delete(r.key)}function le(t){let{prevDep:e,nextDep:r}=t;e&&(e.nextDep=
r,t.prevDep=void 0),r&&(r.prevDep=e,t.nextDep=void 0)}function At(t,e){t.effect instanceof
V&&(t=t.effect.fn);let r=new V(t);e&&ot(r,e);try{r.run()}catch(s){throw r.stop(),
s}let n=r.run.bind(r);return n.effect=r,n}var y=!0,Ut=[];function fe(){Ut.push(y),y=!1}function ue(){let t=Ut.pop();y=t===void 0?!0:t}function It(t){let{cleanup:e}=t;if(t.cleanup=void 0,e){let r=u;u=void 0;try{e()}finally{
u=r}}}var K=0,ht=class{constructor(e,r){this.sub=e,this.dep=r,this.version=r.version,
this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}},
pt=class{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.
subs=void 0,this.map=void 0,this.key=void 0,this.sc=0}track(e){if(!u||!y||u===this.
computed)return;let r=this.activeLink;if(r===void 0||r.sub!==u)r=this.activeLink=
new ht(u,this),u.deps?(r.prevDep=u.depsTail,u.depsTail.nextDep=r,u.depsTail=r):u.
deps=u.depsTail=r,Gt(r);else if(r.version===-1&&(r.version=this.version,r.nextDep)){
let n=r.nextDep;n.prevDep=r.prevDep,r.prevDep&&(r.prevDep.nextDep=n),r.prevDep=u.
depsTail,r.nextDep=void 0,u.depsTail.nextDep=r,u.depsTail=r,u.deps===r&&(u.deps=
n)}return r}trigger(e){this.version++,K++,this.notify(e)}notify(e){yt();try{for(let r=this.
subs;r;r=r.prevSub)r.sub.notify()&&r.sub.dep.notify()}finally{St()}}};function Gt(t){
if(t.dep.sc++,t.sub.flags&4){let e=t.dep.computed;if(e&&!t.dep.subs){e.flags|=20;
for(let n=e.deps;n;n=n.nextDep)Gt(n)}let r=t.dep.subs;r!==t&&(t.prevSub=r,r&&(r.
nextSub=t)),t.dep.subs=t}}var dt=new WeakMap,x=Symbol(""),gt=Symbol(""),z=Symbol(
"");function v(t,e,r){if(y&&u){let n=dt.get(t);n||dt.set(t,n=new Map);let s=n.get(
r);s||(n.set(r,s=new pt),s.map=n,s.key=r),s.track()}}function N(t,e,r,n,s,i){let o=dt.
get(t);if(!o){K++;return}let a=c=>{c&&c.trigger()};if(yt(),e==="clear")o.forEach(
a);else{let c=R(t),p=c&&X(r);if(c&&r==="length"){let d=Number(n);o.forEach((l,f)=>{
(f==="length"||f===z||!M(f)&&f>=d)&&a(l)})}else switch((r!==void 0||o.has(void 0))&&
a(o.get(r)),p&&a(o.get(z)),e){case"add":c?p&&a(o.get("length")):(a(o.get(x)),P(t)&&
a(o.get(gt)));break;case"delete":c||(a(o.get(x)),P(t)&&a(o.get(gt)));break;case"\
set":P(t)&&a(o.get(x));break}}St()}function I(t){let e=h(t);return e===t?e:(v(e,"iterate",z),w(t)?e:e.map(E))}function Nt(t){
return v(t=h(t),"iterate",z),t}var he={__proto__:null,[Symbol.iterator](){return ct(
this,Symbol.iterator,E)},concat(...t){return I(this).concat(...t.map(e=>R(e)?I(e):
e))},entries(){return ct(this,"entries",t=>(t[1]=E(t[1]),t))},every(t,e){return T(
this,"every",t,e,void 0,arguments)},filter(t,e){return T(this,"filter",t,e,r=>r.
map(E),arguments)},find(t,e){return T(this,"find",t,e,E,arguments)},findIndex(t,e){
return T(this,"findIndex",t,e,void 0,arguments)},findLast(t,e){return T(this,"fi\
ndLast",t,e,E,arguments)},findLastIndex(t,e){return T(this,"findLastIndex",t,e,void 0,
arguments)},forEach(t,e){return T(this,"forEach",t,e,void 0,arguments)},includes(...t){
return lt(this,"includes",t)},indexOf(...t){return lt(this,"indexOf",t)},join(t){
return I(this).join(t)},lastIndexOf(...t){return lt(this,"lastIndexOf",t)},map(t,e){
return T(this,"map",t,e,void 0,arguments)},pop(){return j(this,"pop")},push(...t){
return j(this,"push",t)},reduce(t,...e){return kt(this,"reduce",t,e)},reduceRight(t,...e){
return kt(this,"reduceRight",t,e)},shift(){return j(this,"shift")},some(t,e){return T(
this,"some",t,e,void 0,arguments)},splice(...t){return j(this,"splice",t)},toReversed(){
return I(this).toReversed()},toSorted(t){return I(this).toSorted(t)},toSpliced(...t){
return I(this).toSpliced(...t)},unshift(...t){return j(this,"unshift",t)},values(){
return ct(this,"values",E)}};function ct(t,e,r){let n=Nt(t),s=n[e]();return n!==
t&&!w(t)&&(s._next=s.next,s.next=()=>{let i=s._next();return i.value&&(i.value=r(
i.value)),i}),s}var pe=Array.prototype;function T(t,e,r,n,s,i){let o=Nt(t),a=o!==
t&&!w(t),c=o[e];if(c!==pe[e]){let l=c.apply(t,i);return a?E(l):l}let p=r;o!==t&&
(a?p=function(l,f){return r.call(this,E(l),f,t)}:r.length>2&&(p=function(l,f){return r.
call(this,l,f,t)}));let d=c.call(o,p,n);return a&&s?s(d):d}function kt(t,e,r,n){
let s=Nt(t),i=r;return s!==t&&(w(t)?r.length>3&&(i=function(o,a,c){return r.call(
this,o,a,c,t)}):i=function(o,a,c){return r.call(this,o,E(a),c,t)}),s[e](i,...n)}
function lt(t,e,r){let n=h(t);v(n,"iterate",z);let s=n[e](...r);return(s===-1||s===
!1)&&Oe(r[0])?(r[0]=h(r[0]),n[e](...r)):s}function j(t,e,r=[]){fe(),yt();let n=h(
t)[e].apply(t,r);return St(),ue(),n}var de=it("__proto__,__v_isRef,__isVue"),Wt=new Set(
Object.getOwnPropertyNames(Symbol).filter(t=>t!=="arguments"&&t!=="caller").map(
t=>Symbol[t]).filter(M));function ge(t){M(t)||(t=String(t));let e=h(this);return v(
e,"has",t),e.hasOwnProperty(t)}var tt=class{constructor(e=!1,r=!1){this._isReadonly=
e,this._isShallow=r}get(e,r,n){if(r==="__v_skip")return e.__v_skip;let s=this._isReadonly,
i=this._isShallow;if(r==="__v_isReactive")return!s;if(r==="__v_isReadonly")return s;
if(r==="__v_isShallow")return i;if(r==="__v_raw")return n===(s?i?Te:Bt:i?Se:Yt).
get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(n)?e:void 0;let o=R(e);
if(!s){let c;if(o&&(c=he[r]))return c;if(r==="hasOwnProperty")return ge}let a=Reflect.
get(e,r,W(e)?e:n);return(M(r)?Wt.has(r):de(r))||(s||v(e,"get",r),i)?a:W(a)?o&&X(
r)?a:a.value:F(a)?s?$t(a):D(a):a}},_t=class extends tt{constructor(e=!1){super(!1,
e)}set(e,r,n,s){let i=e[r];if(!this._isShallow){let c=Y(i);if(!w(n)&&!Y(n)&&(i=h(
i),n=h(n)),!R(e)&&W(i)&&!W(n))return c?!1:(i.value=n,!0)}let o=R(e)&&X(r)?Number(
r)<e.length:q(e,r),a=Reflect.set(e,r,n,W(e)?e:s);return e===h(s)&&(o?L(n,i)&&N(e,
"set",r,n,i):N(e,"add",r,n)),a}deleteProperty(e,r){let n=q(e,r),s=e[r],i=Reflect.
deleteProperty(e,r);return i&&n&&N(e,"delete",r,void 0,s),i}has(e,r){let n=Reflect.
has(e,r);return(!M(r)||!Wt.has(r))&&v(e,"has",r),n}ownKeys(e){return v(e,"iterat\
e",R(e)?"length":x),Reflect.ownKeys(e)}},mt=class extends tt{constructor(e=!1){super(
!0,e)}set(e,r){return!0}deleteProperty(e,r){return!0}},_e=new _t,me=new mt;var vt=t=>t,Z=t=>Reflect.getPrototypeOf(t);function ve(t,e,r){return function(...n){
let s=this.__v_raw,i=h(s),o=P(i),a=t==="entries"||t===Symbol.iterator&&o,c=t==="\
keys"&&o,p=s[t](...n),d=r?vt:e?Et:E;return!e&&v(i,"iterate",c?gt:x),{next(){let{
value:l,done:f}=p.next();return f?{value:l,done:f}:{value:a?[d(l[0]),d(l[1])]:d(
l),done:f}},[Symbol.iterator](){return this}}}}function Q(t){return function(...e){
return t==="delete"?!1:t==="clear"?void 0:this}}function Ee(t,e){let r={get(s){let i=this.
__v_raw,o=h(i),a=h(s);t||(L(s,a)&&v(o,"get",s),v(o,"get",a));let{has:c}=Z(o),p=e?
vt:t?Et:E;if(c.call(o,s))return p(i.get(s));if(c.call(o,a))return p(i.get(a));i!==
o&&i.get(s)},get size(){let s=this.__v_raw;return!t&&v(h(s),"iterate",x),Reflect.
get(s,"size",s)},has(s){let i=this.__v_raw,o=h(i),a=h(s);return t||(L(s,a)&&v(o,
"has",s),v(o,"has",a)),s===a?i.has(s):i.has(s)||i.has(a)},forEach(s,i){let o=this,
a=o.__v_raw,c=h(a),p=e?vt:t?Et:E;return!t&&v(c,"iterate",x),a.forEach((d,l)=>s.call(
i,p(d),p(l),o))}};return ot(r,t?{add:Q("add"),set:Q("set"),delete:Q("delete"),clear:Q(
"clear")}:{add(s){!e&&!w(s)&&!Y(s)&&(s=h(s));let i=h(this);return Z(i).has.call(
i,s)||(i.add(s),N(i,"add",s,s)),this},set(s,i){!e&&!w(i)&&!Y(i)&&(i=h(i));let o=h(
this),{has:a,get:c}=Z(o),p=a.call(o,s);p||(s=h(s),p=a.call(o,s));let d=c.call(o,
s);return o.set(s,i),p?L(i,d)&&N(o,"set",s,i,d):N(o,"add",s,i),this},delete(s){let i=h(
this),{has:o,get:a}=Z(i),c=o.call(i,s);c||(s=h(s),c=o.call(i,s));let p=a?a.call(
i,s):void 0,d=i.delete(s);return c&&N(i,"delete",s,void 0,p),d},clear(){let s=h(
this),i=s.size!==0,o=void 0,a=s.clear();return i&&N(s,"clear",void 0,void 0,o),a}}),
["keys","values","entries",Symbol.iterator].forEach(s=>{r[s]=ve(s,t,e)}),r}function zt(t,e){
let r=Ee(t,e);return(n,s,i)=>s==="__v_isReactive"?!t:s==="__v_isReadonly"?t:s===
"__v_raw"?n:Reflect.get(q(r,s)&&s in n?r:n,s,i)}var be={get:zt(!1,!1)};var ye={get:zt(!0,!1)};var Yt=new WeakMap,Se=new WeakMap,Bt=new WeakMap,Te=new WeakMap;function Ae(t){switch(t){case"\
Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:
return 0}}function Ne(t){return t.__v_skip||!Object.isExtensible(t)?0:Ae(Lt(t))}
function D(t){return Y(t)?t:Ht(t,!1,_e,be,Yt)}function $t(t){return Ht(t,!0,me,ye,Bt)}function Ht(t,e,r,n,s){if(!F(t)||t.__v_raw&&!(e&&t.__v_isReactive))return t;let i=s.
get(t);if(i)return i;let o=Ne(t);if(o===0)return t;let a=new Proxy(t,o===2?n:r);
return s.set(t,a),a}function Y(t){return!!(t&&t.__v_isReadonly)}function w(t){return!!(t&&t.__v_isShallow)}
function Oe(t){return t?!!t.__v_raw:!1}function h(t){let e=t&&t.__v_raw;return e?
h(e):t}var E=t=>F(t)?D(t):t,Et=t=>F(t)?$t(t):t;function W(t){return t?t.__v_isRef===!0:
!1}var Xt=1,B=3,rt={},Rt=[],Re="http://www.w3.org/2000/svg",qt=function(t){this._vevents[t.
type](t)},O=t=>t==null?t:t.key,Jt=(t,e,r,n,s)=>{e==="key"||(e[0]==="o"&&e[1]==="\
n"?(e=e.toLowerCase().slice(2),t._vevents??={},!n&&r&&t.removeEventListener(e,qt),
!r&&n&&t.addEventListener(e,qt),r!==n&&(t._vevents[e]=n?i=>n.call(we.host??t,i):
null)):e==="ref"?typeof n=="function"?r||(t._vcleanup=n(t)):n.current=n.value=t:
e.startsWith("attr:")?t.setAttribute(e.slice(5),n):e.startsWith("prop:")?t[e.slice(
5)]=n:!s&&e!=="list"&&e!=="form"&&e in t?t[e]=n??"":n==null||n===!1?t.removeAttribute(
e):t.setAttribute(e,n))},Ot=(t,e)=>{var r=t.props,n=t.type===B?document.createTextNode(
t.tag):(e=e||t.tag==="svg")?document.createElementNS(Re,t.tag,{is:r.is}):document.
createElement(t.tag,{is:r.is});for(var s in r)Jt(n,s,null,r[s],e);if(r.dangerouslySetInnerHTML)
return n.innerHTML=r.dangerouslySetInnerHTML.__html,t.node=n;for(var i=0;i<t.children.
length;i++)n.appendChild(Ot(t.children[i]=k(t.children[i]),e));return t.node=n},
C=(t,e,r,n,s)=>{if(r!==n)if(r!=null&&r.type===B&&n.type===B)r.tag!==n.tag&&(e.nodeValue=
n.tag);else if(r==null||r.tag!==n.tag)e=t.insertBefore(Ot(n=k(n),s),e),r!=null&&
t.removeChild(r.node);else{var i,o,a,c,p=r.props,d=n.props,l=r.children,f=n.children,
_=0,g=0,S=l.length-1,A=f.length-1;s=s||n.tag==="svg";for(var m in{...p,...d})(m===
"value"||m==="selected"||m==="checked"?e[m]:p[m])!==d[m]&&Jt(e,m,p[m],d[m],s);if(n.
props?.dangerouslySetInnerHTML)return e.innerHTML=n.props.dangerouslySetInnerHTML.
__html,n.node=e;for(;g<=A&&_<=S&&!((a=O(l[_]))==null||a!==O(f[g]));)C(e,l[_].node,
l[_++],f[g]=k(f[g++]),s);for(;g<=A&&_<=S&&!((a=O(l[S]))==null||a!==O(f[A]));)C(e,
l[S].node,l[S--],f[A]=k(f[A--]),s);if(_>S)for(;g<=A;)e.insertBefore(Ot(f[g]=k(f[g++]),
s),(o=l[_])&&o.node);else if(g>A)for(;_<=S;)e.removeChild(l[_++].node);else{for(var $={},
H={},m=_;m<=S;m++)(a=l[m].key)!=null&&($[a]=l[m]);for(;g<=A;){if(a=O(o=l[_]),c=O(
f[g]=k(f[g])),H[a]||c!=null&&c===O(l[_+1])){a==null&&e.removeChild(o.node),_++;continue}
c==null||r.type===Xt?(a==null&&(C(e,o&&o.node,o,f[g],s),g++),_++):(a===c?(C(e,o.
node,o,f[g],s),H[c]=!0,_++):(i=$[c])!=null?(C(e,e.insertBefore(i.node,o&&o.node),
i,f[g],s),H[c]=!0):C(e,o&&o.node,null,f[g],s),g++)}for(;_<=S;)O(o=l[_++])==null&&
e.removeChild(o.node);for(var m in $)H[m]==null&&e.removeChild($[m].node)}}return n.
node=e},k=t=>t!==!0&&t!==!1&&t?t:wt(""),Zt=t=>t.nodeType===B?wt(t.nodeValue,t):xt(
t.nodeName.toLowerCase(),rt,Rt.map.call(t.childNodes,Zt),Xt,t),xt=(t,e,r,n,s)=>({
tag:t,props:e,key:e.key,children:r,type:n,node:s}),xe=(t,e,r=Rt)=>xt(t,e,Array.isArray(
r)?r:[r]),wt=(t,e)=>xt(t,rt,Rt,B,e),Qt=(t,e)=>e.flat(),Dt=(t,e,...r)=>typeof t==
"function"?t(e,r):xe(t,e||{},r.flatMap(n=>typeof n=="string"||typeof n=="number"?
wt(n):n)),we=rt,et=(t,e,r={})=>(et.ctx=r,(e=C(e.parentNode,e,e.vdom||Zt(e),t)).vdom=
t,et.ctx=rt,e);Symbol.metadata??=Symbol("metadata");var nt=new Map,Ct=null,De=()=>(Ct===null&&(Ct=
Array.from(document.styleSheets).map(t=>{let e=new CSSStyleSheet,r=Array.from(t.
cssRules).map(n=>n.cssText).join(" ");return e.replaceSync(r),e})),Ct),st=!0,Ve=t=>st=
t,Vt=!1,Kt=class extends HTMLElement{static styles="";static use_global_styles=!1;static define_self(e){
customElements.get(e)||customElements.define(e,this)}static get observedAttributes(){
return Array.from(nt.get(this[Symbol.metadata])??[])}observed_attributes=D({});get observedAttributes(){
return this.observed_attributes}attributeChangedCallback(e,r,n){r!==n&&(this.observedAttributes[e]=
n)}get_attribute=this.getAttribute.bind(this);set_attribute=this.setAttribute.bind(
this);remove_attribute=this.removeAttribute.bind(this);on_mount(){}onMount(){}on_mounted(){}onMounted(){}on_unmount(){}onUnmount(){}constructor(){
if(super(),typeof document>"u")return;this.attachShadow({mode:"open"});let e=this.
constructor.styles;typeof e!="string"&&!Array.isArray(e)&&(this._log_error(new Error(
"Static styles property must be a string or string array."),"constructor"),this.
raw_styles=[""]),Array.isArray(e)||(e=[e]);let r=e.map(n=>{let s=new CSSStyleSheet;
return s.replaceSync(n),s});if(this.shadowRoot.adoptedStyleSheets=r,this.constructor.
useGlobalStyles||this.constructor.use_global_styles)try{this.adoptedStyleSheets.
push(...De())}catch(n){this._log_error(n,"adding global stylesheets")}this.root_node=
document.createElement("shadow-root"),this.shadowRoot.appendChild(this.root_node),
st&&!Vt&&(console.warn("Ivysaur is running in development mode. Call set_dev(fal\
se) to disable this warning."),Vt=!0)}render(){return st&&console.warn("No rende\
r method defined for",this.constructor.name),Dt(Qt,{},[])}connectedCallback(){this.
_rootEffectScope?.active&&this._rootEffectScope.stop(),this._rootEffectScope=bt(),
this._rootEffectScope.run(()=>{try{this.onMount?.(),this.on_mount?.()}catch(e){this.
_log_error(e,"on mount")}At(()=>{let e;try{e=this.render.call(this)}catch(r){this.
_log_error(r,"render")}try{et(Dt("shadow-root",{},e),this.root_node,{host:this})}catch(r){
this._log_error(r,"dom update")}});try{this.onMounted?.(),this.on_mounted?.()}catch(e){
this._log_error(e,"on mounted")}})}disconnectedCallback(){this._rootEffectScope.
run(()=>{try{this.onUnmount?.(),this.on_unmount?.()}catch(e){this._log_error(e,"\
on unmount")}}),this._rootEffectScope.stop()}_log_error=(e,r)=>{if(console.error(
"Error in",r,"of",this.constructor.name,e),st)throw e};_rootEffectScope;_reactive_states=D(
{})},Ke=String.raw;function tr(){return function(t,{kind:e,name:r}){if(e==="acce\
ssor")return{get(){return this._reactive_states[r]},set(n){this._reactive_states[r]=
n},init(n){this._reactive_states??=D({}),this._reactive_states[r]=n}};throw new Error(
"Invalid decorator usage: @state only works on class accessors.")}}var Ce=t=>t;function er(t,e={}){
return function(r,{kind:n,name:s,metadata:i}){let o=t??s,a=e.converter??Ce;if(nt.
has(i)||nt.set(i,new Set),nt.get(i).add(o),n==="accessor")return{get(){return a(
this.observed_attributes[o])},set(c){this.observed_attributes[o]=c,this.setAttribute(
o,String(c))},init(c){this.observed_attributes[o]=c}};if(n==="getter")return function(){
let c=this.observed_attributes[o];return typeof c<"u"?a(c):r()};throw new Error(
"Invalid decorator usage: @attribute only works on class accessors and getters.")}}export{Qt as Fragment,st as IS_DEV,Kt as Ivysaur,er as attribute,Ke as css,At as effect,
bt as effectScope,Dt as h,Kt as ivysaur,D as reactive,et as render,Ve as setDev,
Ve as set_dev,tr as state};
/*! Bundled license information:

@vue/shared/dist/shared.esm-bundler.js:
  (**
  * @vue/shared v3.5.13
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **)
  (*! #__NO_SIDE_EFFECTS__ *)

@vue/reactivity/dist/reactivity.esm-bundler.js:
  (**
  * @vue/reactivity v3.5.13
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **)
*/
