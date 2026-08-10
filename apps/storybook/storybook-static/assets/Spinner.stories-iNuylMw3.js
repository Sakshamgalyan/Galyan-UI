import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{S as r}from"./Spinner-Cv7UGPGY.js";const g={title:"Galyan UI/Spinner",component:r,tags:["autodocs"],argTypes:{size:{control:"select",options:["xs","sm","md","lg","xl"],description:"Spinner size preset",table:{type:{summary:"'xs' | 'sm' | 'md' | 'lg' | 'xl'"},defaultValue:{summary:"'md'"}}},color:{control:"select",options:["primary","white","muted"],description:"Spinner stroke color theme",table:{type:{summary:"'primary' | 'white' | 'muted'"},defaultValue:{summary:"'primary'"}}},label:{control:"text",description:"Optional loading text label next to spinner",table:{type:{summary:"string"}}},className:{control:"text",description:"Additional CSS class names for custom styling override",table:{type:{summary:"string"}}}}},s={args:{size:"md",color:"primary"}},a={args:{size:"md",color:"primary",label:"Loading workspace details..."}},t={render:()=>e.jsxs("div",{style:{display:"flex",gap:"1.5rem",alignItems:"center"},children:[e.jsx(r,{size:"xs"}),e.jsx(r,{size:"sm"}),e.jsx(r,{size:"md"}),e.jsx(r,{size:"lg"}),e.jsx(r,{size:"xl"})]})};var n,i,o;s.parameters={...s.parameters,docs:{...(n=s.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    size: "md",
    color: "primary"
  }
}`,...(o=(i=s.parameters)==null?void 0:i.docs)==null?void 0:o.source}}};var l,m,p;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    size: "md",
    color: "primary",
    label: "Loading workspace details..."
  }
}`,...(p=(m=a.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var c,d,u;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: "1.5rem",
    alignItems: "center"
  }}>\r
      <Spinner size="xs" />\r
      <Spinner size="sm" />\r
      <Spinner size="md" />\r
      <Spinner size="lg" />\r
      <Spinner size="xl" />\r
    </div>
}`,...(u=(d=t.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};const z=["Default","WithLabel","Sizes"];export{s as Default,t as Sizes,a as WithLabel,z as __namedExportsOrder,g as default};
