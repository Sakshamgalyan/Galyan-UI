import{j as r}from"./jsx-runtime-D_zvdyIk.js";import{r as a}from"./index-CC0H-XIk.js";import{T as E}from"./Typography-CympBPK-.js";function _(e){return 1-Math.pow(1-e,3)}function z(e){return e<.5?4*e*e*e:1-Math.pow(-2*e+2,3)/2}function c({value:e,variant:n="span",weight:t="regular",duration:p=1e3,format:f,className:R="",prefix:q="",suffix:I="",decimals:j=0,easing:m="easeOut"}){const[g,A]=a.useState(0),d=a.useRef(0),s=a.useRef(null),l=a.useRef(0),h=a.useRef(0);a.useEffect(()=>{d.current=h.current,s.current=null;const S=m==="linear"?i=>i:m==="easeOut"?_:z,v=i=>{s.current||(s.current=i);const C=i-s.current,y=Math.min(C/p,1),D=S(y),k=d.current+(e-d.current)*D;A(k),y<1?l.current=requestAnimationFrame(v):h.current=e};return cancelAnimationFrame(l.current),l.current=requestAnimationFrame(v),()=>cancelAnimationFrame(l.current)},[e,p,m]);const M=f?f(g):g.toFixed(j).replace(/\B(?=(\d{3})+(?!\d))/g,","),$=`${q}${M}${I}`,N={bold:"bold",semibold:"semibold",medium:"medium",regular:"normal",light:"light"},F=n.startsWith("h")?n:n==="p"?"p":"span";return r.jsx(E,{as:F,variant:n==="p"?"p":n==="span"?"span":n,weight:N[t],className:`gy-animated-number ${R}`,children:$})}c.__docgenInfo={description:"",methods:[],displayName:"AnimatedNumber",props:{value:{required:!0,tsType:{name:"number"},description:""},variant:{required:!1,tsType:{name:"union",raw:`| "h1"\r
| "h2"\r
| "h3"\r
| "h4"\r
| "h5"\r
| "h6"\r
| "p"\r
| "span"`,elements:[{name:"literal",value:'"h1"'},{name:"literal",value:'"h2"'},{name:"literal",value:'"h3"'},{name:"literal",value:'"h4"'},{name:"literal",value:'"h5"'},{name:"literal",value:'"h6"'},{name:"literal",value:'"p"'},{name:"literal",value:'"span"'}]},description:"",defaultValue:{value:'"span"',computed:!1}},weight:{required:!1,tsType:{name:"union",raw:`| "bold"\r
| "semibold"\r
| "medium"\r
| "regular"\r
| "light"`,elements:[{name:"literal",value:'"bold"'},{name:"literal",value:'"semibold"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"regular"'},{name:"literal",value:'"light"'}]},description:"",defaultValue:{value:'"regular"',computed:!1}},duration:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1000",computed:!1}},format:{required:!1,tsType:{name:"signature",type:"function",raw:"(n: number) => string",signature:{arguments:[{type:{name:"number"},name:"n"}],return:{name:"string"}}},description:""},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}},prefix:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}},suffix:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}},decimals:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},easing:{required:!1,tsType:{name:"union",raw:'"linear" | "easeOut" | "easeInOut"',elements:[{name:"literal",value:'"linear"'},{name:"literal",value:'"easeOut"'},{name:"literal",value:'"easeInOut"'}]},description:"",defaultValue:{value:'"easeOut"',computed:!1}}}};const W={title:"Galyan UI/AnimatedNumber",component:c,parameters:{layout:"centered",docs:{description:{component:"Smoothly animates numeric transitions with customizable typography variants and font weights."}}},tags:["autodocs"],argTypes:{value:{control:"number"},variant:{control:"select",options:["h1","h2","h3","h4","h5","h6","p","span"]},weight:{control:"select",options:["bold","semibold","medium","regular","light"]},duration:{control:{type:"range",min:300,max:3e3,step:100}},prefix:{control:"text"},suffix:{control:"text"},decimals:{control:{type:"number",min:0,max:4}},easing:{control:"inline-radio",options:["linear","easeOut","easeInOut"]}}},u={args:{value:12500,prefix:"$",variant:"h2",weight:"bold",duration:1200,decimals:0,easing:"easeOut"}},o={render:e=>{const[n,t]=a.useState(1e3);return r.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem",alignItems:"center"},children:[r.jsxs("div",{style:{display:"flex",gap:"0.5rem"},children:[r.jsx("button",{style:{padding:"0.375rem 0.75rem",cursor:"pointer"},onClick:()=>t(Math.floor(Math.random()*5e4)),children:"Randomize Value"}),r.jsx("button",{style:{padding:"0.375rem 0.75rem",cursor:"pointer"},onClick:()=>t(0),children:"Reset to 0"})]}),r.jsx(c,{...e,value:n})]})},args:{prefix:"$",variant:"h1",weight:"bold",duration:1500,decimals:2}};var b,x,V;u.parameters={...u.parameters,docs:{...(b=u.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    value: 12500,
    prefix: "$",
    variant: "h2",
    weight: "bold",
    duration: 1200,
    decimals: 0,
    easing: "easeOut"
  }
}`,...(V=(x=u.parameters)==null?void 0:x.docs)==null?void 0:V.source}}};var w,T,O;o.parameters={...o.parameters,docs:{...(w=o.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: args => {
    const [val, setVal] = useState(1000);
    return <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      alignItems: "center"
    }}>\r
        <div style={{
        display: "flex",
        gap: "0.5rem"
      }}>\r
          <button style={{
          padding: "0.375rem 0.75rem",
          cursor: "pointer"
        }} onClick={() => setVal(Math.floor(Math.random() * 50000))}>\r
            Randomize Value\r
          </button>\r
          <button style={{
          padding: "0.375rem 0.75rem",
          cursor: "pointer"
        }} onClick={() => setVal(0)}>\r
            Reset to 0\r
          </button>\r
        </div>\r
        <AnimatedNumber {...args} value={val} />\r
      </div>;
  },
  args: {
    prefix: "$",
    variant: "h1",
    weight: "bold",
    duration: 1500,
    decimals: 2
  }
}`,...(O=(T=o.parameters)==null?void 0:T.docs)==null?void 0:O.source}}};const H=["Default","InteractiveValueToggle"];export{u as Default,o as InteractiveValueToggle,H as __namedExportsOrder,W as default};
