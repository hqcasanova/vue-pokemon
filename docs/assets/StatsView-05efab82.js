var $=Object.defineProperty;var w=(s,e,t)=>e in s?$(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var o=(s,e,t)=>(w(s,typeof e!="symbol"?e+"":e,t),t);import{d as y,c as g,a,r as m,T as N,o as d,b as v,n as x,t as b,e as _,u as A,f as k,g as T,h as B,w as D,i as f,j as S,k as V,l as j}from"./index-bbedd029.js";class P{constructor({height:e=0,weight:t=0,hp:i=0,attack:l=0,defense:c=0,specialAttack:r=0,specialDefense:n=0,speed:p=0}){o(this,"height");o(this,"weight");o(this,"hp");o(this,"attack");o(this,"defense");o(this,"specialAttack");o(this,"specialDefense");o(this,"speed");this.height=e,this.weight=t,this.hp=i,this.attack=l,this.defense=c,this.specialAttack=r,this.specialDefense=n,this.speed=p}}const L={class:"fixed top-0 bottom-0 left-0 right-0 flex bg-black/40"},M={class:"relative w-[90%] max-w-[600px] m-auto p-8 bg-white rounded-3xl"},z={class:"mt-3 mb-6 first-letter:uppercase"},E={class:"my-8"},F={key:0,class:"flex justify-center 2xs:justify-end"},O=["disabled"],R=y({__name:"ActionModal",props:{actionName:{default:"Ok"},actionType:{default:""},isDisabledAction:{type:Boolean,default:!1}},emits:["cancel","ok"],setup(s){return(e,t)=>(d(),g(N,{to:"body"},[a("div",L,[a("div",M,[a("button",{class:"app-btn absolute top-2 right-2 min-mobile-dims text-secondary-states text-4.5xl font-normal",type:"button",onClick:t[0]||(t[0]=i=>e.$emit("cancel"))}," × "),a("h2",z,[m(e.$slots,"title")]),a("div",E,[m(e.$slots,"default")]),m(e.$slots,"actions",{},()=>[e.actionType?(d(),v("div",F,[a("button",{class:"app-button py-2 px-4 text-secondary-states font-normal border border-darker-grey rounded-xl bg-secondary-states",type:"button",onClick:t[1]||(t[1]=i=>e.$emit("cancel"))}," Cancel "),a("button",{class:x(["app-btn ml-4 py-2 px-4 text-black font-bold first-letter:uppercase rounded-xl bg-primary-states",{"bg-danger-states":e.actionType==="destructive"}]),type:"button",disabled:e.isDisabledAction,onClick:t[2]||(t[2]=i=>e.$emit("ok"))},b(e.actionName),11,O)])):_("",!0)])])])]))}}),q={class:"stats relative min-h-[500px]"},J=y({__name:"StatsView",props:{id:{default:""}},setup(s){const e=s,t=A(),{fetchStats:i,isLoading:l,likePokemon:c}=S(),r=k(new P({})),n=k(!1);T(async()=>{if(e.id){const u=await i(e.id);u?r.value=u:n.value=!0}});const p=()=>{t.push({name:"home"})};return(u,h)=>{const C=B("heart-solid");return d(),g(R,{"is-disabled-action":f(l)||n.value,onCancel:p},{default:D(()=>[a("div",q,[f(l)||n.value?(d(),v("div",{key:0,class:x(["absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-lighter-grey/60 backdrop-blur-sm",{"text-danger font-normal":n.value}])},b(n.value?"Pokemon could not be found":"Loading pokemon data..."),3)):_("",!0),V(C,{onClick:h[0]||(h[0]=G=>f(c)(e.id))}),j(" "+b(r.value),1)])]),_:1},8,["is-disabled-action"])}}});export{J as default};
