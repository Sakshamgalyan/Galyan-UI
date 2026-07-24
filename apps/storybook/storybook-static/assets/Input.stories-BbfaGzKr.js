import{I as v}from"./index-B5o1GRfj.js";import{r as b,R as s}from"./index-JhL3uwfD.js";import"./jsx-runtime-D_zvdyIk.js";import"./index-BPftEo5x.js";import"./index-hLVmTiZX.js";const f={title:"Galyan UI/Input",component:v,tags:["autodocs"]},e={args:{label:"Username",placeholder:"Enter your username",helperText:"Must be unique across your organization"}},a={args:{label:"Email Address",value:"invalid-email",error:"Please enter a valid email address."}},r={render:()=>{const[g,t]=b.useState("Type to search...");return s.createElement("div",{style:{maxWidth:"400px"}},s.createElement(v,{label:"Search",value:g,onChange:h=>t(h.target.value),clearable:!0,onClear:()=>t("")}))}};var o,l,n;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
    helperText: 'Must be unique across your organization'
  }
}`,...(n=(l=e.parameters)==null?void 0:l.docs)==null?void 0:n.source}}};var c,u,m;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    label: 'Email Address',
    value: 'invalid-email',
    error: 'Please enter a valid email address.'
  }
}`,...(m=(u=a.parameters)==null?void 0:u.docs)==null?void 0:m.source}}};var i,d,p;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: () => {
    const [val, setVal] = useState('Type to search...');
    return <div style={{
      maxWidth: '400px'
    }}>\r
        <Input label="Search" value={val} onChange={e => setVal(e.target.value)} clearable onClear={() => setVal('')} />\r
      </div>;
  }
}`,...(p=(d=r.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};const I=["Default","WithError","ClearableDemo"];export{r as ClearableDemo,e as Default,a as WithError,I as __namedExportsOrder,f as default};
