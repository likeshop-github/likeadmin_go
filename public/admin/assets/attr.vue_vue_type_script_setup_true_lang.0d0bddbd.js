import{O as y,P as U,D as v,C as w,w as N,F as O}from"./element-plus.de1a1f40.js";import{_ as $}from"./index.31464286.js";import{_ as j}from"./picker.3f838045.js";import{_ as I}from"./picker.49fbd768.js";import{f}from"./index.fc436213.js";import{d as P,o as c,c as E,X as e,P as t,U as r,a as m,W as R,a8 as T,O as V,T as G}from"./@vue.a137a740.js";const L={class:"flex-1"},W=m("div",{class:"form-tips"},"\u6700\u591A\u6DFB\u52A05\u5F20\uFF0C\u5EFA\u8BAE\u56FE\u7247\u5C3A\u5BF8\uFF1A750px*340px",-1),X={class:"bg-fill-light flex items-center w-full p-4 mt-4"},q={class:"ml-3 flex-1"},S=P({__name:"attr",props:{content:{type:Object,default:()=>({})},styles:{type:Object,default:()=>({})}},setup(a){const s=a,_=5,b=()=>{var n;((n=s.content.data)==null?void 0:n.length)<_?s.content.data.push({image:"",name:"",link:{}}):f.msgError(`\u6700\u591A\u6DFB\u52A0${_}\u5F20\u56FE\u7247`)},g=n=>{var u;if(((u=s.content.data)==null?void 0:u.length)<=1)return f.msgError("\u6700\u5C11\u4FDD\u7559\u4E00\u5F20\u56FE\u7247");s.content.data.splice(n,1)};return(n,u)=>{const p=y,h=U,d=v,k=I,x=w,B=j,A=$,C=N,D=O;return c(),E("div",null,[e(D,{"label-width":"70px"},{default:t(()=>{var i;return[e(d,{label:"\u662F\u5426\u542F\u7528"},{default:t(()=>[e(h,{modelValue:a.content.enabled,"onUpdate:modelValue":u[0]||(u[0]=l=>a.content.enabled=l)},{default:t(()=>[e(p,{label:1},{default:t(()=>[r("\u5F00\u542F")]),_:1}),e(p,{label:0},{default:t(()=>[r("\u505C\u7528")]),_:1})]),_:1},8,["modelValue"])]),_:1}),e(d,{label:"\u56FE\u7247\u8BBE\u7F6E"},{default:t(()=>[m("div",L,[W,(c(!0),E(R,null,T(a.content.data,(l,F)=>(c(),V(A,{key:F,onClose:o=>g(F),class:"max-w-[400px]"},{default:t(()=>[m("div",X,[e(k,{modelValue:l.image,"onUpdate:modelValue":o=>l.image=o,"upload-class":"bg-body","exclude-domain":""},null,8,["modelValue","onUpdate:modelValue"]),m("div",q,[e(d,{label:"\u56FE\u7247\u540D\u79F0"},{default:t(()=>[e(x,{modelValue:l.name,"onUpdate:modelValue":o=>l.name=o,placeholder:"\u8BF7\u8F93\u5165\u540D\u79F0"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),e(d,{class:"mt-[18px]",label:"\u56FE\u7247\u94FE\u63A5"},{default:t(()=>[e(B,{modelValue:l.link,"onUpdate:modelValue":o=>l.link=o},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)])])]),_:2},1032,["onClose"]))),128))])]),_:1}),((i=a.content.data)==null?void 0:i.length)<_?(c(),V(d,{key:0},{default:t(()=>[e(C,{type:"primary",onClick:b},{default:t(()=>[r("\u6DFB\u52A0\u56FE\u7247")]),_:1})]),_:1})):G("",!0)]}),_:1})])}}});export{S as _};
