import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{S as s}from"./Spinner-BLlcYVRD.js";const g={title:"Galyan UI/Spinner",component:s,tags:["autodocs"],argTypes:{size:{control:"select",options:["xs","sm","md","lg","xl"],description:"Spinner size preset",table:{type:{summary:"'xs' | 'sm' | 'md' | 'lg' | 'xl'"},defaultValue:{summary:"'md'"}}},color:{control:"select",options:["primary","white","muted"],description:"Spinner stroke color theme",table:{type:{summary:"'primary' | 'white' | 'muted'"},defaultValue:{summary:"'primary'"}}},label:{control:"text",description:"Optional loading text label next to spinner",table:{type:{summary:"string"}}},className:{control:"text",description:"Additional CSS class names for custom styling override",table:{type:{summary:"string"}}}}},r={args:{size:"md",color:"primary"}},a={args:{size:"md",color:"primary",label:"Loading workspace details..."}},t={render:()=>e.jsxs("div",{style:{display:"flex",gap:"1.5rem",alignItems:"center"},children:[e.jsx(s,{size:"xs"}),e.jsx(s,{size:"sm"}),e.jsx(s,{size:"md"}),e.jsx(s,{size:"lg"}),e.jsx(s,{size:"xl"})]})};var i,o,n;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    size: 'md',
    color: 'primary'
  }
}`,...(n=(o=r.parameters)==null?void 0:o.docs)==null?void 0:n.source}}};var l,m,p;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    size: 'md',
    color: 'primary',
    label: 'Loading workspace details...'
  }
}`,...(p=(m=a.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var c,d,u;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center'
  }}>
      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size="xl" />
    </div>
}`,...(u=(d=t.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};const z=["Default","WithLabel","Sizes"];export{r as Default,t as Sizes,a as WithLabel,z as __namedExportsOrder,g as default};
