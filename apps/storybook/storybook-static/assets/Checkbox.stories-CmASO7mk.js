import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as z}from"./index-CC0H-XIk.js";import{C as o}from"./Checkbox-1pFZ2Xn9.js";const A={title:"Galyan UI/Checkbox",component:o,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{size:{control:"radio",options:["sm","md","lg"],description:"Size of the checkbox",table:{type:{summary:"sm | md | lg"},defaultValue:{summary:"md"}}},color:{control:"radio",options:["primary","error"],description:"Color theme of the checkbox",table:{type:{summary:"primary | error"},defaultValue:{summary:"primary"}}},variant:{control:"radio",options:["solid","outline","soft"],description:"The variant style of the checkbox",table:{type:{summary:"solid | outline | soft"},defaultValue:{summary:"solid"}}},label:{control:"text",description:"Text label displayed next to the checkbox"},checked:{control:"boolean",description:"Controlled checked state"},indeterminate:{control:"boolean",description:"If true, renders the checkbox in an indeterminate state"},isDisabled:{control:"boolean",description:"If true, the checkbox will be disabled"}}},r=a=>{const[C,S]=z.useState(a.checked||!1);return e.jsx(o,{...a,checked:a.checked!==void 0?a.checked:C,onChange:I=>S(I.target.checked)})},t={args:{label:"Accept terms and conditions"},render:a=>e.jsx(r,{...a})},l={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"},children:[e.jsx(r,{size:"sm",label:"Small checkbox"}),e.jsx(r,{size:"md",label:"Medium checkbox"}),e.jsx(r,{size:"lg",label:"Large checkbox"})]})},c={render:()=>e.jsxs("div",{style:{display:"flex",gap:"2rem"},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"},children:[e.jsx("strong",{children:"Primary"}),e.jsx(r,{color:"primary",variant:"solid",label:"Solid",checked:!0}),e.jsx(r,{color:"primary",variant:"outline",label:"Outline",checked:!0}),e.jsx(r,{color:"primary",variant:"soft",label:"Soft",checked:!0})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"},children:[e.jsx("strong",{children:"Error"}),e.jsx(r,{color:"error",variant:"solid",label:"Solid",checked:!0}),e.jsx(r,{color:"error",variant:"outline",label:"Outline",checked:!0}),e.jsx(r,{color:"error",variant:"soft",label:"Soft",checked:!0})]})]})},s={args:{label:"Select all",indeterminate:!0},render:a=>e.jsx(r,{...a})},i={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"},children:[e.jsx(o,{label:"Disabled unchecked",isDisabled:!0}),e.jsx(o,{label:"Disabled checked",isDisabled:!0,checked:!0}),e.jsx(o,{label:"Disabled indeterminate",isDisabled:!0,indeterminate:!0})]})};var n,d,m;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    label: 'Accept terms and conditions'
  },
  render: args => <InteractiveCheckbox {...args} />
}`,...(m=(d=t.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};var b,x,p;l.parameters={...l.parameters,docs:{...(b=l.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  }}>\r
      <InteractiveCheckbox size="sm" label="Small checkbox" />\r
      <InteractiveCheckbox size="md" label="Medium checkbox" />\r
      <InteractiveCheckbox size="lg" label="Large checkbox" />\r
    </div>
}`,...(p=(x=l.parameters)==null?void 0:x.docs)==null?void 0:p.source}}};var h,u,k;c.parameters={...c.parameters,docs:{...(h=c.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '2rem'
  }}>\r
      <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    }}>\r
        <strong>Primary</strong>\r
        <InteractiveCheckbox color="primary" variant="solid" label="Solid" checked />\r
        <InteractiveCheckbox color="primary" variant="outline" label="Outline" checked />\r
        <InteractiveCheckbox color="primary" variant="soft" label="Soft" checked />\r
      </div>\r
      <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    }}>\r
        <strong>Error</strong>\r
        <InteractiveCheckbox color="error" variant="solid" label="Solid" checked />\r
        <InteractiveCheckbox color="error" variant="outline" label="Outline" checked />\r
        <InteractiveCheckbox color="error" variant="soft" label="Soft" checked />\r
      </div>\r
    </div>
}`,...(k=(u=c.parameters)==null?void 0:u.docs)==null?void 0:k.source}}};var y,f,v;s.parameters={...s.parameters,docs:{...(y=s.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    label: 'Select all',
    indeterminate: true
  },
  render: args => <InteractiveCheckbox {...args} />
}`,...(v=(f=s.parameters)==null?void 0:f.docs)==null?void 0:v.source}}};var g,D,j;i.parameters={...i.parameters,docs:{...(g=i.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  }}>\r
      <Checkbox label="Disabled unchecked" isDisabled />\r
      <Checkbox label="Disabled checked" isDisabled checked />\r
      <Checkbox label="Disabled indeterminate" isDisabled indeterminate />\r
    </div>
}`,...(j=(D=i.parameters)==null?void 0:D.docs)==null?void 0:j.source}}};const T=["Default","Sizes","ColorsAndVariants","Indeterminate","Disabled"];export{c as ColorsAndVariants,t as Default,i as Disabled,s as Indeterminate,l as Sizes,T as __namedExportsOrder,A as default};
