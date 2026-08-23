import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as L}from"./index-CC0H-XIk.js";import{C as a}from"./Checkbox-B-VyznxO.js";const M={title:"Galyan UI/Checkbox",component:a,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{size:{control:"radio",options:["sm","md","lg"],description:"Size of the checkbox",table:{type:{summary:"sm | md | lg"},defaultValue:{summary:"md"}}},color:{control:"radio",options:["primary","error"],description:"Color theme of the checkbox",table:{type:{summary:"primary | error"},defaultValue:{summary:"primary"}}},variant:{control:"radio",options:["solid","outline","soft"],description:"The variant style of the checkbox",table:{type:{summary:"solid | outline | soft"},defaultValue:{summary:"solid"}}},label:{control:"text",description:"Text label displayed next to the checkbox"},description:{control:"text",description:"Secondary helper text underneath label"},checked:{control:"boolean",description:"Controlled checked state"},indeterminate:{control:"boolean",description:"If true, renders the checkbox in an indeterminate state"},isDisabled:{control:"boolean",description:"If true, the checkbox will be disabled"}}},r=t=>{const[i,c]=L.useState(t.checked||!1);return e.jsx(a,{...t,checked:t.checked!==void 0?t.checked:i,onChange:u=>c(u.target.checked)})},o={args:{label:"Accept terms and conditions"},render:t=>e.jsx(r,{...t})},s={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1.25rem",maxWidth:420},children:[e.jsx(r,{label:"Two-factor authentication",description:"Receive a secure SMS confirmation code whenever you sign in.",defaultChecked:!0}),e.jsx(r,{label:"Weekly telemetry & performance digest",description:"Get actionable summaries of error rates and API latency."}),e.jsx(r,{label:"Beta feature access",description:"Test unreleased experimental components before public rollouts."})]})},d={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"},children:[e.jsx(r,{size:"sm",label:"Small checkbox (16px)"}),e.jsx(r,{size:"md",label:"Medium checkbox (20px)",defaultChecked:!0}),e.jsx(r,{size:"lg",label:"Large checkbox (24px)",defaultChecked:!0})]})},m={render:()=>e.jsxs("div",{style:{display:"flex",gap:"3rem"},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"},children:[e.jsx("strong",{style:{fontSize:"0.85rem",color:"var(--gy-text-muted)"},children:"Primary Brand"}),e.jsx(r,{color:"primary",variant:"solid",label:"Solid Primary",checked:!0}),e.jsx(r,{color:"primary",variant:"outline",label:"Outline Primary",checked:!0}),e.jsx(r,{color:"primary",variant:"soft",label:"Soft Primary",checked:!0})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"},children:[e.jsx("strong",{style:{fontSize:"0.85rem",color:"var(--gy-text-muted)"},children:"Error / Danger"}),e.jsx(r,{color:"error",variant:"solid",label:"Solid Error",checked:!0}),e.jsx(r,{color:"error",variant:"outline",label:"Outline Error",checked:!0}),e.jsx(r,{color:"error",variant:"soft",label:"Soft Error",checked:!0})]})]})},h={render:()=>{const[t,i]=L.useState([{id:"1",label:"easyLife Customer App",checked:!0},{id:"2",label:"metalixia Dashboard",checked:!1},{id:"3",label:"samantrix Dark Studio",checked:!0}]),c=t.every(n=>n.checked),u=t.some(n=>n.checked)&&!c,W=()=>{const n=!c;i(t.map(l=>({...l,checked:n})))},G=n=>{i(t.map(l=>l.id===n?{...l,checked:!l.checked}:l))};return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"0.75rem",width:280},children:[e.jsx(a,{label:"Select all workspaces",checked:c,indeterminate:u,onChange:W}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"0.5rem",paddingLeft:"1.75rem"},children:t.map(n=>e.jsx(a,{label:n.label,checked:n.checked,onChange:()=>G(n.id)},n.id))})]})}},p={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"},children:[e.jsx(a,{label:"Disabled unchecked",isDisabled:!0}),e.jsx(a,{label:"Disabled checked",isDisabled:!0,checked:!0}),e.jsx(a,{label:"Disabled indeterminate",isDisabled:!0,indeterminate:!0})]})};var x,b,k;o.parameters={...o.parameters,docs:{...(x=o.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    label: "Accept terms and conditions"
  },
  render: args => <InteractiveCheckbox {...args} />
}`,...(k=(b=o.parameters)==null?void 0:b.docs)==null?void 0:k.source}}};var y,f,v;s.parameters={...s.parameters,docs:{...(y=s.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
    maxWidth: 420
  }}>\r
      <InteractiveCheckbox label="Two-factor authentication" description="Receive a secure SMS confirmation code whenever you sign in." defaultChecked />\r
      <InteractiveCheckbox label="Weekly telemetry & performance digest" description="Get actionable summaries of error rates and API latency." />\r
      <InteractiveCheckbox label="Beta feature access" description="Test unreleased experimental components before public rollouts." />\r
    </div>
}`,...(v=(f=s.parameters)==null?void 0:f.docs)==null?void 0:v.source}}};var g,C,S;d.parameters={...d.parameters,docs:{...(g=d.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "1rem"
  }}>\r
      <InteractiveCheckbox size="sm" label="Small checkbox (16px)" />\r
      <InteractiveCheckbox size="md" label="Medium checkbox (20px)" defaultChecked />\r
      <InteractiveCheckbox size="lg" label="Large checkbox (24px)" defaultChecked />\r
    </div>
}`,...(S=(C=d.parameters)==null?void 0:C.docs)==null?void 0:S.source}}};var D,j,I;m.parameters={...m.parameters,docs:{...(D=m.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: "3rem"
  }}>\r
      <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "1rem"
    }}>\r
        <strong style={{
        fontSize: "0.85rem",
        color: "var(--gy-text-muted)"
      }}>Primary Brand</strong>\r
        <InteractiveCheckbox color="primary" variant="solid" label="Solid Primary" checked />\r
        <InteractiveCheckbox color="primary" variant="outline" label="Outline Primary" checked />\r
        <InteractiveCheckbox color="primary" variant="soft" label="Soft Primary" checked />\r
      </div>\r
      <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "1rem"
    }}>\r
        <strong style={{
        fontSize: "0.85rem",
        color: "var(--gy-text-muted)"
      }}>Error / Danger</strong>\r
        <InteractiveCheckbox color="error" variant="solid" label="Solid Error" checked />\r
        <InteractiveCheckbox color="error" variant="outline" label="Outline Error" checked />\r
        <InteractiveCheckbox color="error" variant="soft" label="Soft Error" checked />\r
      </div>\r
    </div>
}`,...(I=(j=m.parameters)==null?void 0:j.docs)==null?void 0:I.source}}};var z,A,E;h.parameters={...h.parameters,docs:{...(z=h.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => {
    const [items, setItems] = useState([{
      id: "1",
      label: "easyLife Customer App",
      checked: true
    }, {
      id: "2",
      label: "metalixia Dashboard",
      checked: false
    }, {
      id: "3",
      label: "samantrix Dark Studio",
      checked: true
    }]);
    const allChecked = items.every(i => i.checked);
    const isIndeterminate = items.some(i => i.checked) && !allChecked;
    const handleSelectAll = () => {
      const next = !allChecked;
      setItems(items.map(i => ({
        ...i,
        checked: next
      })));
    };
    const toggle = (id: string) => {
      setItems(items.map(i => i.id === id ? {
        ...i,
        checked: !i.checked
      } : i));
    };
    return <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "0.75rem",
      width: 280
    }}>\r
        <Checkbox label="Select all workspaces" checked={allChecked} indeterminate={isIndeterminate} onChange={handleSelectAll} />\r
        <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        paddingLeft: "1.75rem"
      }}>\r
          {items.map(item => <Checkbox key={item.id} label={item.label} checked={item.checked} onChange={() => toggle(item.id)} />)}\r
        </div>\r
      </div>;
  }
}`,...(E=(A=h.parameters)==null?void 0:A.docs)==null?void 0:E.source}}};var P,w,T;p.parameters={...p.parameters,docs:{...(P=p.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "1rem"
  }}>\r
      <Checkbox label="Disabled unchecked" isDisabled />\r
      <Checkbox label="Disabled checked" isDisabled checked />\r
      <Checkbox label="Disabled indeterminate" isDisabled indeterminate />\r
    </div>
}`,...(T=(w=p.parameters)==null?void 0:w.docs)==null?void 0:T.source}}};const R=["Default","WithDescription","Sizes","ColorsAndVariants","SelectAllGroup","Disabled"];export{m as ColorsAndVariants,o as Default,p as Disabled,h as SelectAllGroup,d as Sizes,s as WithDescription,R as __namedExportsOrder,M as default};
