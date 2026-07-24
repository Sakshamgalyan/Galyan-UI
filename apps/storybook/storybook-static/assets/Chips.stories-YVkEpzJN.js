import{f as r,g as C}from"./index-B5o1GRfj.js";import{r as g,R as e}from"./index-JhL3uwfD.js";import"./jsx-runtime-D_zvdyIk.js";import"./index-BPftEo5x.js";import"./index-hLVmTiZX.js";const x={title:"Galyan UI/Chip",component:r,tags:["autodocs"]},a={render:()=>e.createElement("div",{style:{display:"flex",gap:"0.75rem",flexWrap:"wrap"}},e.createElement(r,{variant:"solid"},"Solid"),e.createElement(r,{variant:"soft"},"Soft"),e.createElement(r,{variant:"outline"},"Outline"),e.createElement(r,{variant:"success"},"Success"),e.createElement(r,{variant:"warning"},"Warning"),e.createElement(r,{variant:"danger"},"Danger"),e.createElement(r,{variant:"neutral"},"Neutral"))},t={render:()=>e.createElement("div",{style:{display:"flex",gap:"0.75rem"}},e.createElement(r,{variant:"soft",removable:!0,onRemove:()=>alert("Removed")},"React"),e.createElement(r,{variant:"solid",removable:!0,onRemove:()=>alert("Removed")},"TypeScript"),e.createElement(r,{variant:"outline",removable:!0,onRemove:()=>alert("Removed")},"Neumorphic"))},i={render:()=>{const[u,h]=g.useState(["React","TypeScript","UI Library"]);return e.createElement("div",{style:{maxWidth:"400px"}},e.createElement(C,{values:u,onChange:h,placeholder:"Add technologies..."}))}};var o,n,s;a.parameters={...a.parameters,docs:{...(o=a.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '0.75rem',
    flexWrap: 'wrap'
  }}>\r
      <Chip variant="solid">Solid</Chip>\r
      <Chip variant="soft">Soft</Chip>\r
      <Chip variant="outline">Outline</Chip>\r
      <Chip variant="success">Success</Chip>\r
      <Chip variant="warning">Warning</Chip>\r
      <Chip variant="danger">Danger</Chip>\r
      <Chip variant="neutral">Neutral</Chip>\r
    </div>
}`,...(s=(n=a.parameters)==null?void 0:n.docs)==null?void 0:s.source}}};var p,l,m;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '0.75rem'
  }}>\r
      <Chip variant="soft" removable onRemove={() => alert('Removed')}>React</Chip>\r
      <Chip variant="solid" removable onRemove={() => alert('Removed')}>TypeScript</Chip>\r
      <Chip variant="outline" removable onRemove={() => alert('Removed')}>Neumorphic</Chip>\r
    </div>
}`,...(m=(l=t.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};var c,d,v;i.parameters={...i.parameters,docs:{...(c=i.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: () => {
    const [tags, setTags] = useState(['React', 'TypeScript', 'UI Library']);
    return <div style={{
      maxWidth: '400px'
    }}>\r
        <ChipsInput values={tags} onChange={setTags} placeholder="Add technologies..." />\r
      </div>;
  }
}`,...(v=(d=i.parameters)==null?void 0:d.docs)==null?void 0:v.source}}};const b=["Variants","Removable","ChipsInputDemo"];export{i as ChipsInputDemo,t as Removable,a as Variants,b as __namedExportsOrder,x as default};
