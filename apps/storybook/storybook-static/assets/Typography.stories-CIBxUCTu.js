import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{T as r}from"./Typography-CympBPK-.js";const b={title:"Galyan UI/Typography",component:r,tags:["autodocs"],argTypes:{variant:{control:"select",options:["h1","h2","h3","h4","h5","h6","p","span","label","small"],description:"Typography variant element & scale preset",table:{type:{summary:"'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'label' | 'small'"},defaultValue:{summary:"'p'"}}},weight:{control:"select",options:["light","normal","medium","semibold","bold","extrabold"],description:"Font weight specification",table:{type:{summary:"'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold'"}}},align:{control:"select",options:["left","center","right","justify"],description:"Text alignment",table:{type:{summary:"'left' | 'center' | 'right' | 'justify'"}}},margin:{control:"select",options:["none","xs","sm","md","lg","xl"],description:"Bottom margin spacing preset",table:{type:{summary:"'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'"},defaultValue:{summary:"'none'"}}},textColor:{control:"color",description:"Custom text color hex/rgb",table:{type:{summary:"string"}}},bgColor:{control:"color",description:"Custom background color hex/rgb",table:{type:{summary:"string"}}},className:{control:"text",description:"Additional CSS class names for custom styling override",table:{type:{summary:"string"}}},children:{control:"text",description:"Text content",table:{type:{summary:"ReactNode"}}}}},a={args:{children:"Interactive Typography Component",variant:"p",weight:"normal",align:"left",margin:"none"}},n={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"0.5rem"},children:[e.jsx(r,{variant:"h1",children:"Heading 1 (h1)"}),e.jsx(r,{variant:"h2",children:"Heading 2 (h2)"}),e.jsx(r,{variant:"h3",children:"Heading 3 (h3)"}),e.jsx(r,{variant:"h4",children:"Heading 4 (h4)"}),e.jsx(r,{variant:"h5",children:"Heading 5 (h5)"}),e.jsx(r,{variant:"h6",children:"Heading 6 (h6)"}),e.jsx(r,{variant:"p",children:"Paragraph text element (p)"}),e.jsx(r,{variant:"span",children:"Span inline element (span)"}),e.jsx(r,{variant:"label",children:"Form Label element (label)"}),e.jsx(r,{variant:"small",children:"Small text element (small)"})]})},t={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"0.75rem"},children:[e.jsx(r,{variant:"p",weight:"light",children:"Light weight (300)"}),e.jsx(r,{variant:"p",weight:"normal",children:"Normal weight (400)"}),e.jsx(r,{variant:"p",weight:"medium",children:"Medium weight (500)"}),e.jsx(r,{variant:"p",weight:"semibold",children:"Semibold weight (600)"}),e.jsx(r,{variant:"p",weight:"bold",children:"Bold weight (700)"}),e.jsx(r,{variant:"p",weight:"extrabold",children:"Extrabold weight (800)"}),e.jsx("hr",{style:{border:"none",borderTop:"1px solid #e2e8f0",margin:"1rem 0"}}),e.jsx(r,{variant:"p",align:"left",children:"Left aligned text"}),e.jsx(r,{variant:"p",align:"center",children:"Center aligned text"}),e.jsx(r,{variant:"p",align:"right",children:"Right aligned text"})]})},i={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"0.75rem"},children:[e.jsx(r,{variant:"h3",textColor:"#f43f5e",children:"Custom Rose Text Color"}),e.jsx(r,{variant:"p",textColor:"#0284c7",bgColor:"#e0f2fe",style:{padding:"0.5rem 1rem",borderRadius:"6px"},children:"Custom Blue Text with Sky Blue Background"}),e.jsxs(r,{variant:"p",as:"div",weight:"semibold",textColor:"#10b981",children:["Rendered as HTML <div> element via ",e.jsx("code",{children:'as="div"'})]})]})};var o,l,p;a.parameters={...a.parameters,docs:{...(o=a.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {
    children: "Interactive Typography Component",
    variant: "p",
    weight: "normal",
    align: "left",
    margin: "none"
  }
}`,...(p=(l=a.parameters)==null?void 0:l.docs)==null?void 0:p.source}}};var s,h,g;n.parameters={...n.parameters,docs:{...(s=n.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem"
  }}>\r
      <Typography variant="h1">Heading 1 (h1)</Typography>\r
      <Typography variant="h2">Heading 2 (h2)</Typography>\r
      <Typography variant="h3">Heading 3 (h3)</Typography>\r
      <Typography variant="h4">Heading 4 (h4)</Typography>\r
      <Typography variant="h5">Heading 5 (h5)</Typography>\r
      <Typography variant="h6">Heading 6 (h6)</Typography>\r
      <Typography variant="p">Paragraph text element (p)</Typography>\r
      <Typography variant="span">Span inline element (span)</Typography>\r
      <Typography variant="label">Form Label element (label)</Typography>\r
      <Typography variant="small">Small text element (small)</Typography>\r
    </div>
}`,...(g=(h=n.parameters)==null?void 0:h.docs)==null?void 0:g.source}}};var d,y,m;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem"
  }}>\r
      <Typography variant="p" weight="light">\r
        Light weight (300)\r
      </Typography>\r
      <Typography variant="p" weight="normal">\r
        Normal weight (400)\r
      </Typography>\r
      <Typography variant="p" weight="medium">\r
        Medium weight (500)\r
      </Typography>\r
      <Typography variant="p" weight="semibold">\r
        Semibold weight (600)\r
      </Typography>\r
      <Typography variant="p" weight="bold">\r
        Bold weight (700)\r
      </Typography>\r
      <Typography variant="p" weight="extrabold">\r
        Extrabold weight (800)\r
      </Typography>\r
      <hr style={{
      border: "none",
      borderTop: "1px solid #e2e8f0",
      margin: "1rem 0"
    }} />\r
      <Typography variant="p" align="left">\r
        Left aligned text\r
      </Typography>\r
      <Typography variant="p" align="center">\r
        Center aligned text\r
      </Typography>\r
      <Typography variant="p" align="right">\r
        Right aligned text\r
      </Typography>\r
    </div>
}`,...(m=(y=t.parameters)==null?void 0:y.docs)==null?void 0:m.source}}};var c,x,v;i.parameters={...i.parameters,docs:{...(c=i.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem"
  }}>\r
      <Typography variant="h3" textColor="#f43f5e">\r
        Custom Rose Text Color\r
      </Typography>\r
      <Typography variant="p" textColor="#0284c7" bgColor="#e0f2fe" style={{
      padding: "0.5rem 1rem",
      borderRadius: "6px"
    }}>\r
        Custom Blue Text with Sky Blue Background\r
      </Typography>\r
      <Typography variant="p" as="div" weight="semibold" textColor="#10b981">\r
        Rendered as HTML &lt;div&gt; element via <code>as="div"</code>\r
      </Typography>\r
    </div>
}`,...(v=(x=i.parameters)==null?void 0:x.docs)==null?void 0:v.source}}};const f=["Default","AllVariants","WeightsAndAlignments","CustomStyling"];export{n as AllVariants,i as CustomStyling,a as Default,t as WeightsAndAlignments,f as __namedExportsOrder,b as default};
