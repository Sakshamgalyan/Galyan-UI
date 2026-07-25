import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{S as t}from"./Skeleton-CxDDz_vm.js";const g={title:"Galyan UI/Skeleton",component:t,tags:["autodocs"],argTypes:{variant:{control:"select",options:["text","circular","rectangular"],description:"Skeleton element shape variant",table:{type:{summary:"'text' | 'circular' | 'rectangular'"},defaultValue:{summary:"'text'"}}},width:{control:"text",description:'Custom width specification (e.g. "100%", "48px", "200px")',table:{type:{summary:"string"}}},height:{control:"text",description:'Custom height specification (e.g. "20px", "48px", "120px")',table:{type:{summary:"string"}}},className:{control:"text",description:"Additional CSS class names for custom styling override",table:{type:{summary:"string"}}}}},r={args:{variant:"text",width:"100%",height:"20px"}},a={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1.25rem",maxWidth:"400px"},children:[e.jsxs("div",{children:[e.jsx("span",{style:{fontSize:"0.85rem",color:"#64748b"},children:"Text Variant:"}),e.jsx(t,{variant:"text"})]}),e.jsxs("div",{children:[e.jsx("span",{style:{fontSize:"0.85rem",color:"#64748b"},children:"Circular Variant:"}),e.jsx(t,{variant:"circular",width:"48px",height:"48px"})]}),e.jsxs("div",{children:[e.jsx("span",{style:{fontSize:"0.85rem",color:"#64748b"},children:"Rectangular Variant:"}),e.jsx(t,{variant:"rectangular",height:"120px"})]})]})},i={render:()=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"1rem",padding:"1rem",border:"1px solid #e2e8f0",borderRadius:"12px",maxWidth:"400px"},children:[e.jsx(t,{variant:"circular",width:"56px",height:"56px"}),e.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column",gap:"0.5rem"},children:[e.jsx(t,{variant:"text",width:"60%",height:"18px"}),e.jsx(t,{variant:"text",width:"90%",height:"14px"})]})]})};var s,n,o;r.parameters={...r.parameters,docs:{...(s=r.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    variant: 'text',
    width: '100%',
    height: '20px'
  }
}`,...(o=(n=r.parameters)==null?void 0:n.docs)==null?void 0:o.source}}};var l,d,c;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
    maxWidth: '400px'
  }}>
      <div>
        <span style={{
        fontSize: '0.85rem',
        color: '#64748b'
      }}>Text Variant:</span>
        <Skeleton variant="text" />
      </div>
      <div>
        <span style={{
        fontSize: '0.85rem',
        color: '#64748b'
      }}>Circular Variant:</span>
        <Skeleton variant="circular" width="48px" height="48px" />
      </div>
      <div>
        <span style={{
        fontSize: '0.85rem',
        color: '#64748b'
      }}>Rectangular Variant:</span>
        <Skeleton variant="rectangular" height="120px" />
      </div>
    </div>
}`,...(c=(d=a.parameters)==null?void 0:d.docs)==null?void 0:c.source}}};var p,x,m;i.parameters={...i.parameters,docs:{...(p=i.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    maxWidth: '400px'
  }}>
      <Skeleton variant="circular" width="56px" height="56px" />
      <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    }}>
        <Skeleton variant="text" width="60%" height="18px" />
        <Skeleton variant="text" width="90%" height="14px" />
      </div>
    </div>
}`,...(m=(x=i.parameters)==null?void 0:x.docs)==null?void 0:m.source}}};const v=["Default","Variants","CardSkeletonComposition"];export{i as CardSkeletonComposition,r as Default,a as Variants,v as __namedExportsOrder,g as default};
