import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{T as a}from"./Typography-6zVp92Kq.js";const b={title:"Galyan UI/Typography",component:a,tags:["autodocs"],argTypes:{variant:{control:"select",options:["h1","h2","h3","h4","h5","h6","p","span","label","small"],description:"Typography variant element & scale preset",table:{type:{summary:"'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'label' | 'small'"},defaultValue:{summary:"'p'"}}},weight:{control:"select",options:["light","normal","medium","semibold","bold","extrabold"],description:"Font weight specification",table:{type:{summary:"'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold'"}}},align:{control:"select",options:["left","center","right","justify"],description:"Text alignment",table:{type:{summary:"'left' | 'center' | 'right' | 'justify'"}}},margin:{control:"select",options:["none","xs","sm","md","lg","xl"],description:"Bottom margin spacing preset",table:{type:{summary:"'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'"},defaultValue:{summary:"'none'"}}},textColor:{control:"color",description:"Custom text color hex/rgb",table:{type:{summary:"string"}}},bgColor:{control:"color",description:"Custom background color hex/rgb",table:{type:{summary:"string"}}},className:{control:"text",description:"Additional CSS class names for custom styling override",table:{type:{summary:"string"}}},children:{control:"text",description:"Text content",table:{type:{summary:"ReactNode"}}}}},r={args:{children:"Interactive Typography Component",variant:"p",weight:"normal",align:"left",margin:"none"}},t={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"0.5rem"},children:[e.jsx(a,{variant:"h1",children:"Heading 1 (h1)"}),e.jsx(a,{variant:"h2",children:"Heading 2 (h2)"}),e.jsx(a,{variant:"h3",children:"Heading 3 (h3)"}),e.jsx(a,{variant:"h4",children:"Heading 4 (h4)"}),e.jsx(a,{variant:"h5",children:"Heading 5 (h5)"}),e.jsx(a,{variant:"h6",children:"Heading 6 (h6)"}),e.jsx(a,{variant:"p",children:"Paragraph text element (p)"}),e.jsx(a,{variant:"span",children:"Span inline element (span)"}),e.jsx(a,{variant:"label",children:"Form Label element (label)"}),e.jsx(a,{variant:"small",children:"Small text element (small)"})]})},i={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"0.75rem"},children:[e.jsx(a,{variant:"p",weight:"light",children:"Light weight (300)"}),e.jsx(a,{variant:"p",weight:"normal",children:"Normal weight (400)"}),e.jsx(a,{variant:"p",weight:"medium",children:"Medium weight (500)"}),e.jsx(a,{variant:"p",weight:"semibold",children:"Semibold weight (600)"}),e.jsx(a,{variant:"p",weight:"bold",children:"Bold weight (700)"}),e.jsx(a,{variant:"p",weight:"extrabold",children:"Extrabold weight (800)"}),e.jsx("hr",{style:{border:"none",borderTop:"1px solid #e2e8f0",margin:"1rem 0"}}),e.jsx(a,{variant:"p",align:"left",children:"Left aligned text"}),e.jsx(a,{variant:"p",align:"center",children:"Center aligned text"}),e.jsx(a,{variant:"p",align:"right",children:"Right aligned text"})]})},n={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"0.75rem"},children:[e.jsx(a,{variant:"h3",textColor:"#f43f5e",children:"Custom Rose Text Color"}),e.jsx(a,{variant:"p",textColor:"#0284c7",bgColor:"#e0f2fe",style:{padding:"0.5rem 1rem",borderRadius:"6px"},children:"Custom Blue Text with Sky Blue Background"}),e.jsxs(a,{variant:"p",as:"div",weight:"semibold",textColor:"#10b981",children:["Rendered as HTML <div> element via ",e.jsx("code",{children:'as="div"'})]})]})};var o,l,p;r.parameters={...r.parameters,docs:{...(o=r.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {
    children: 'Interactive Typography Component',
    variant: 'p',
    weight: 'normal',
    align: 'left',
    margin: 'none'
  }
}`,...(p=(l=r.parameters)==null?void 0:l.docs)==null?void 0:p.source}}};var s,h,g;t.parameters={...t.parameters,docs:{...(s=t.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  }}>
      <Typography variant="h1">Heading 1 (h1)</Typography>
      <Typography variant="h2">Heading 2 (h2)</Typography>
      <Typography variant="h3">Heading 3 (h3)</Typography>
      <Typography variant="h4">Heading 4 (h4)</Typography>
      <Typography variant="h5">Heading 5 (h5)</Typography>
      <Typography variant="h6">Heading 6 (h6)</Typography>
      <Typography variant="p">Paragraph text element (p)</Typography>
      <Typography variant="span">Span inline element (span)</Typography>
      <Typography variant="label">Form Label element (label)</Typography>
      <Typography variant="small">Small text element (small)</Typography>
    </div>
}`,...(g=(h=t.parameters)==null?void 0:h.docs)==null?void 0:g.source}}};var d,y,m;i.parameters={...i.parameters,docs:{...(d=i.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
  }}>
      <Typography variant="p" weight="light">Light weight (300)</Typography>
      <Typography variant="p" weight="normal">Normal weight (400)</Typography>
      <Typography variant="p" weight="medium">Medium weight (500)</Typography>
      <Typography variant="p" weight="semibold">Semibold weight (600)</Typography>
      <Typography variant="p" weight="bold">Bold weight (700)</Typography>
      <Typography variant="p" weight="extrabold">Extrabold weight (800)</Typography>
      <hr style={{
      border: 'none',
      borderTop: '1px solid #e2e8f0',
      margin: '1rem 0'
    }} />
      <Typography variant="p" align="left">Left aligned text</Typography>
      <Typography variant="p" align="center">Center aligned text</Typography>
      <Typography variant="p" align="right">Right aligned text</Typography>
    </div>
}`,...(m=(y=i.parameters)==null?void 0:y.docs)==null?void 0:m.source}}};var c,x,v;n.parameters={...n.parameters,docs:{...(c=n.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
  }}>
      <Typography variant="h3" textColor="#f43f5e">Custom Rose Text Color</Typography>
      <Typography variant="p" textColor="#0284c7" bgColor="#e0f2fe" style={{
      padding: '0.5rem 1rem',
      borderRadius: '6px'
    }}>
        Custom Blue Text with Sky Blue Background
      </Typography>
      <Typography variant="p" as="div" weight="semibold" textColor="#10b981">
        Rendered as HTML &lt;div&gt; element via <code>as="div"</code>
      </Typography>
    </div>
}`,...(v=(x=n.parameters)==null?void 0:x.docs)==null?void 0:v.source}}};const f=["Default","AllVariants","WeightsAndAlignments","CustomStyling"];export{t as AllVariants,n as CustomStyling,r as Default,i as WeightsAndAlignments,f as __namedExportsOrder,b as default};
