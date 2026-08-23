import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{S as r}from"./Skeleton-CYAW5Hss.js";const g={title:"Galyan UI/Skeleton",component:r,tags:["autodocs"],argTypes:{variant:{control:"select",options:["text","circular","rectangular"],description:"Skeleton element shape variant",table:{type:{summary:"'text' | 'circular' | 'rectangular'"},defaultValue:{summary:"'text'"}}},width:{control:"text",description:'Custom width specification (e.g. "100%", "48px", "200px")',table:{type:{summary:"string"}}},height:{control:"text",description:'Custom height specification (e.g. "20px", "48px", "120px")',table:{type:{summary:"string"}}},className:{control:"text",description:"Additional CSS class names for custom styling override",table:{type:{summary:"string"}}}}},t={args:{variant:"text",width:"100%",height:"20px"}},n={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1.25rem",maxWidth:"400px"},children:[e.jsxs("div",{children:[e.jsx("span",{style:{fontSize:"0.85rem",color:"#64748b"},children:"Text Variant:"}),e.jsx(r,{variant:"text"})]}),e.jsxs("div",{children:[e.jsx("span",{style:{fontSize:"0.85rem",color:"#64748b"},children:"Circular Variant:"}),e.jsx(r,{variant:"circular",width:"48px",height:"48px"})]}),e.jsxs("div",{children:[e.jsx("span",{style:{fontSize:"0.85rem",color:"#64748b"},children:"Rectangular Variant:"}),e.jsx(r,{variant:"rectangular",height:"120px"})]})]})},a={render:()=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"1rem",padding:"1rem",border:"1px solid #e2e8f0",borderRadius:"12px",maxWidth:"400px"},children:[e.jsx(r,{variant:"circular",width:"56px",height:"56px"}),e.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column",gap:"0.5rem"},children:[e.jsx(r,{variant:"text",width:"60%",height:"18px"}),e.jsx(r,{variant:"text",width:"90%",height:"14px"})]})]})};var i,s,o;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    variant: "text",
    width: "100%",
    height: "20px"
  }
}`,...(o=(s=t.parameters)==null?void 0:s.docs)==null?void 0:o.source}}};var l,d,c;n.parameters={...n.parameters,docs:{...(l=n.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
    maxWidth: "400px"
  }}>\r
      <div>\r
        <span style={{
        fontSize: "0.85rem",
        color: "#64748b"
      }}>\r
          Text Variant:\r
        </span>\r
        <Skeleton variant="text" />\r
      </div>\r
      <div>\r
        <span style={{
        fontSize: "0.85rem",
        color: "#64748b"
      }}>\r
          Circular Variant:\r
        </span>\r
        <Skeleton variant="circular" width="48px" height="48px" />\r
      </div>\r
      <div>\r
        <span style={{
        fontSize: "0.85rem",
        color: "#64748b"
      }}>\r
          Rectangular Variant:\r
        </span>\r
        <Skeleton variant="rectangular" height="120px" />\r
      </div>\r
    </div>
}`,...(c=(d=n.parameters)==null?void 0:d.docs)==null?void 0:c.source}}};var p,x,m;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    padding: "1rem",
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
    maxWidth: "400px"
  }}>\r
      <Skeleton variant="circular" width="56px" height="56px" />\r
      <div style={{
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem"
    }}>\r
        <Skeleton variant="text" width="60%" height="18px" />\r
        <Skeleton variant="text" width="90%" height="14px" />\r
      </div>\r
    </div>
}`,...(m=(x=a.parameters)==null?void 0:x.docs)==null?void 0:m.source}}};const v=["Default","Variants","CardSkeletonComposition"];export{a as CardSkeletonComposition,t as Default,n as Variants,v as __namedExportsOrder,g as default};
