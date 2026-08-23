import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{C as r,a as U}from"./Chips-9VuCc6c0.js";import{r as B}from"./index-CC0H-XIk.js";const v=()=>e.jsx("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"currentColor",children:e.jsx("path",{d:"M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"})}),V=()=>e.jsx("span",{style:{width:16,height:16,borderRadius:"50%",background:"var(--gy-primary)",color:"white",fontSize:"0.6rem",display:"inline-flex",alignItems:"center",justifyContent:"center",fontWeight:"bold"},children:"A"}),P={title:"Galyan UI/Chip",component:r,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{variant:{control:"select",options:["solid","soft","outline","success","warning","danger","neutral"]},radius:{control:"select",options:["none","sm","md","lg","full"]},size:{control:"inline-radio",options:["sm","md","lg"]},removable:{control:"boolean"},clickable:{control:"boolean"},selected:{control:"boolean"}}},t={args:{children:"Interactive Chip",variant:"soft",radius:"full",size:"md",removable:!1,clickable:!0,selected:!1}},i={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"},children:[e.jsxs("div",{style:{display:"flex",gap:"0.75rem",alignItems:"center"},children:[e.jsx("span",{style:{width:60,fontSize:"0.8rem",color:"var(--gy-text-muted)"},children:"none:"}),e.jsx(r,{radius:"none",variant:"soft",children:"Square Tag"}),e.jsx(r,{radius:"none",variant:"solid",children:"Featured"}),e.jsx(r,{radius:"none",variant:"outline",removable:!0,children:"Delete me"})]}),e.jsxs("div",{style:{display:"flex",gap:"0.75rem",alignItems:"center"},children:[e.jsx("span",{style:{width:60,fontSize:"0.8rem",color:"var(--gy-text-muted)"},children:"sm:"}),e.jsx(r,{radius:"sm",variant:"soft",children:"Slightly Rounded"}),e.jsx(r,{radius:"sm",variant:"success",children:"Active"})]}),e.jsxs("div",{style:{display:"flex",gap:"0.75rem",alignItems:"center"},children:[e.jsx("span",{style:{width:60,fontSize:"0.8rem",color:"var(--gy-text-muted)"},children:"md:"}),e.jsx(r,{radius:"md",variant:"soft",children:"Medium Rounded"}),e.jsx(r,{radius:"md",variant:"warning",children:"In Review"})]}),e.jsxs("div",{style:{display:"flex",gap:"0.75rem",alignItems:"center"},children:[e.jsx("span",{style:{width:60,fontSize:"0.8rem",color:"var(--gy-text-muted)"},children:"lg:"}),e.jsx(r,{radius:"lg",variant:"soft",children:"Large Rounded"}),e.jsx(r,{radius:"lg",variant:"danger",children:"Blocked"})]}),e.jsxs("div",{style:{display:"flex",gap:"0.75rem",alignItems:"center"},children:[e.jsx("span",{style:{width:60,fontSize:"0.8rem",color:"var(--gy-text-muted)"},children:"full:"}),e.jsx(r,{radius:"full",variant:"soft",children:"Pill (Default)"}),e.jsx(r,{radius:"full",variant:"solid",removable:!0,children:"Badge"})]})]})},s={render:()=>e.jsxs("div",{style:{display:"flex",gap:"0.75rem",flexWrap:"wrap"},children:[e.jsx(r,{variant:"solid",children:"Solid"}),e.jsx(r,{variant:"soft",children:"Soft"}),e.jsx(r,{variant:"outline",children:"Outline"}),e.jsx(r,{variant:"success",children:"Success"}),e.jsx(r,{variant:"warning",children:"Warning"}),e.jsx(r,{variant:"danger",children:"Danger"}),e.jsx(r,{variant:"neutral",children:"Neutral"})]})},l={render:()=>e.jsxs("div",{style:{display:"flex",gap:"0.75rem",flexWrap:"wrap",alignItems:"center"},children:[e.jsx(r,{variant:"solid",icon:e.jsx(v,{}),children:"Starred"}),e.jsx(r,{variant:"soft",icon:e.jsx(V,{}),children:"Alex Morgan"}),e.jsx(r,{variant:"outline",icon:e.jsx(v,{}),removable:!0,onRemove:()=>alert("Removed"),children:"Favorite"})]})},o={render:()=>{const[p,m]=B.useState(["design","react"]),E=n=>{m(a=>a.includes(n)?a.filter(M=>M!==n):[...a,n])},G=[{id:"all",label:"All Items"},{id:"design",label:"Design System"},{id:"react",label:"React"},{id:"typescript",label:"TypeScript"},{id:"storybook",label:"Storybook"}];return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"0.75rem"},children:[e.jsx("span",{style:{fontSize:"0.85rem",color:"var(--gy-text-muted)"},children:"Click chips to toggle selection:"}),e.jsx("div",{style:{display:"flex",gap:"0.5rem",flexWrap:"wrap"},children:G.map(n=>{const a=p.includes(n.id);return e.jsx(r,{variant:a?"solid":"soft",clickable:!0,selected:a,onClick:()=>E(n.id),children:n.label},n.id)})})]})}},d={render:()=>e.jsxs("div",{style:{display:"flex",gap:"0.75rem"},children:[e.jsx(r,{variant:"soft",removable:!0,onRemove:()=>alert("Removed React"),children:"React"}),e.jsx(r,{variant:"solid",removable:!0,onRemove:()=>alert("Removed TypeScript"),children:"TypeScript"}),e.jsx(r,{variant:"outline",removable:!0,onRemove:()=>alert("Removed Design"),children:"Design"})]})},c={render:()=>{const[p,m]=B.useState(["React","TypeScript","Galyan UI"]);return e.jsx("div",{style:{width:"380px"},children:e.jsx(U,{values:p,onChange:m,placeholder:"Type and press Enter..."})})}};var u,h,g;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    children: "Interactive Chip",
    variant: "soft",
    radius: "full",
    size: "md",
    removable: false,
    clickable: true,
    selected: false
  }
}`,...(g=(h=t.parameters)==null?void 0:h.docs)==null?void 0:g.source}}};var x,y,f;i.parameters={...i.parameters,docs:{...(x=i.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "1rem"
  }}>\r
      <div style={{
      display: "flex",
      gap: "0.75rem",
      alignItems: "center"
    }}>\r
        <span style={{
        width: 60,
        fontSize: "0.8rem",
        color: "var(--gy-text-muted)"
      }}>none:</span>\r
        <Chip radius="none" variant="soft">Square Tag</Chip>\r
        <Chip radius="none" variant="solid">Featured</Chip>\r
        <Chip radius="none" variant="outline" removable>Delete me</Chip>\r
      </div>\r
      <div style={{
      display: "flex",
      gap: "0.75rem",
      alignItems: "center"
    }}>\r
        <span style={{
        width: 60,
        fontSize: "0.8rem",
        color: "var(--gy-text-muted)"
      }}>sm:</span>\r
        <Chip radius="sm" variant="soft">Slightly Rounded</Chip>\r
        <Chip radius="sm" variant="success">Active</Chip>\r
      </div>\r
      <div style={{
      display: "flex",
      gap: "0.75rem",
      alignItems: "center"
    }}>\r
        <span style={{
        width: 60,
        fontSize: "0.8rem",
        color: "var(--gy-text-muted)"
      }}>md:</span>\r
        <Chip radius="md" variant="soft">Medium Rounded</Chip>\r
        <Chip radius="md" variant="warning">In Review</Chip>\r
      </div>\r
      <div style={{
      display: "flex",
      gap: "0.75rem",
      alignItems: "center"
    }}>\r
        <span style={{
        width: 60,
        fontSize: "0.8rem",
        color: "var(--gy-text-muted)"
      }}>lg:</span>\r
        <Chip radius="lg" variant="soft">Large Rounded</Chip>\r
        <Chip radius="lg" variant="danger">Blocked</Chip>\r
      </div>\r
      <div style={{
      display: "flex",
      gap: "0.75rem",
      alignItems: "center"
    }}>\r
        <span style={{
        width: 60,
        fontSize: "0.8rem",
        color: "var(--gy-text-muted)"
      }}>full:</span>\r
        <Chip radius="full" variant="soft">Pill (Default)</Chip>\r
        <Chip radius="full" variant="solid" removable>Badge</Chip>\r
      </div>\r
    </div>
}`,...(f=(y=i.parameters)==null?void 0:y.docs)==null?void 0:f.source}}};var C,S,j;s.parameters={...s.parameters,docs:{...(C=s.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: "0.75rem",
    flexWrap: "wrap"
  }}>\r
      <Chip variant="solid">Solid</Chip>\r
      <Chip variant="soft">Soft</Chip>\r
      <Chip variant="outline">Outline</Chip>\r
      <Chip variant="success">Success</Chip>\r
      <Chip variant="warning">Warning</Chip>\r
      <Chip variant="danger">Danger</Chip>\r
      <Chip variant="neutral">Neutral</Chip>\r
    </div>
}`,...(j=(S=s.parameters)==null?void 0:S.docs)==null?void 0:j.source}}};var b,R,I;l.parameters={...l.parameters,docs:{...(b=l.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: "0.75rem",
    flexWrap: "wrap",
    alignItems: "center"
  }}>\r
      <Chip variant="solid" icon={<StarIcon />}>\r
        Starred\r
      </Chip>\r
      <Chip variant="soft" icon={<UserAvatar />}>\r
        Alex Morgan\r
      </Chip>\r
      <Chip variant="outline" icon={<StarIcon />} removable onRemove={() => alert("Removed")}>\r
        Favorite\r
      </Chip>\r
    </div>
}`,...(I=(R=l.parameters)==null?void 0:R.docs)==null?void 0:I.source}}};var w,D,k;o.parameters={...o.parameters,docs:{...(w=o.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => {
    const [selectedFilters, setSelectedFilters] = useState<string[]>(["design", "react"]);
    const toggle = (tag: string) => {
      setSelectedFilters(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
    };
    const tags = [{
      id: "all",
      label: "All Items"
    }, {
      id: "design",
      label: "Design System"
    }, {
      id: "react",
      label: "React"
    }, {
      id: "typescript",
      label: "TypeScript"
    }, {
      id: "storybook",
      label: "Storybook"
    }];
    return <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "0.75rem"
    }}>\r
        <span style={{
        fontSize: "0.85rem",
        color: "var(--gy-text-muted)"
      }}>\r
          Click chips to toggle selection:\r
        </span>\r
        <div style={{
        display: "flex",
        gap: "0.5rem",
        flexWrap: "wrap"
      }}>\r
          {tags.map(t => {
          const isSelected = selectedFilters.includes(t.id);
          return <Chip key={t.id} variant={isSelected ? "solid" : "soft"} clickable selected={isSelected} onClick={() => toggle(t.id)}>\r
                {t.label}\r
              </Chip>;
        })}\r
        </div>\r
      </div>;
  }
}`,...(k=(D=o.parameters)==null?void 0:D.docs)==null?void 0:k.source}}};var z,T,A;d.parameters={...d.parameters,docs:{...(z=d.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: "0.75rem"
  }}>\r
      <Chip variant="soft" removable onRemove={() => alert("Removed React")}>\r
        React\r
      </Chip>\r
      <Chip variant="solid" removable onRemove={() => alert("Removed TypeScript")}>\r
        TypeScript\r
      </Chip>\r
      <Chip variant="outline" removable onRemove={() => alert("Removed Design")}>\r
        Design\r
      </Chip>\r
    </div>
}`,...(A=(T=d.parameters)==null?void 0:T.docs)==null?void 0:A.source}}};var F,W,L;c.parameters={...c.parameters,docs:{...(F=c.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => {
    const [tags, setTags] = useState(["React", "TypeScript", "Galyan UI"]);
    return <div style={{
      width: "380px"
    }}>\r
        <ChipsInput values={tags} onChange={setTags} placeholder="Type and press Enter..." />\r
      </div>;
  }
}`,...(L=(W=c.parameters)==null?void 0:W.docs)==null?void 0:L.source}}};const _=["Default","RadiusVariants","Variants","WithIconsAndAvatars","SelectableFilterGroup","Removable","ChipsInputDemo"];export{c as ChipsInputDemo,t as Default,i as RadiusVariants,d as Removable,o as SelectableFilterGroup,s as Variants,l as WithIconsAndAvatars,_ as __namedExportsOrder,P as default};
