import{j as e}from"./jsx-runtime-D_zvdyIk.js";const b={h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",h6:"h6","body-xl":"p","body-lg":"p","body-md":"p","body-sm":"p","body-xs":"p","caption-lg":"span","caption-md":"span",label:"label",code:"code"};function a({variant:n="body-md",color:y="default",as:m,truncate:c=!1,className:u="",children:g,...h}){const v=m??b[n],f=["gy-text",`gy-text--${n}`,`gy-text--color-${y}`,c?"gy-text--truncate":"",u].filter(Boolean).join(" ");return e.jsx(v,{className:f,...h,children:g})}a.__docgenInfo={description:"",methods:[],displayName:"Typography",props:{variant:{required:!1,tsType:{name:"union",raw:`| 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
| 'body-xl' | 'body-lg' | 'body-md' | 'body-sm' | 'body-xs'
| 'caption-lg' | 'caption-md'
| 'label' | 'code'`,elements:[{name:"literal",value:"'h1'"},{name:"literal",value:"'h2'"},{name:"literal",value:"'h3'"},{name:"literal",value:"'h4'"},{name:"literal",value:"'h5'"},{name:"literal",value:"'h6'"},{name:"literal",value:"'body-xl'"},{name:"literal",value:"'body-lg'"},{name:"literal",value:"'body-md'"},{name:"literal",value:"'body-sm'"},{name:"literal",value:"'body-xs'"},{name:"literal",value:"'caption-lg'"},{name:"literal",value:"'caption-md'"},{name:"literal",value:"'label'"},{name:"literal",value:"'code'"}]},description:"",defaultValue:{value:"'body-md'",computed:!1}},color:{required:!1,tsType:{name:"union",raw:`| 'default' | 'muted' | 'subtle' | 'disabled' | 'inverse'
| 'primary' | 'success' | 'warning' | 'danger' | 'info'`,elements:[{name:"literal",value:"'default'"},{name:"literal",value:"'muted'"},{name:"literal",value:"'subtle'"},{name:"literal",value:"'disabled'"},{name:"literal",value:"'inverse'"},{name:"literal",value:"'primary'"},{name:"literal",value:"'success'"},{name:"literal",value:"'warning'"},{name:"literal",value:"'danger'"},{name:"literal",value:"'info'"}]},description:"",defaultValue:{value:"'default'",computed:!1}},as:{required:!1,tsType:{name:"ReactElementType",raw:"React.ElementType"},description:""},truncate:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},id:{required:!1,tsType:{name:"string"},description:""},htmlFor:{required:!1,tsType:{name:"string"},description:""},style:{required:!1,tsType:{name:"ReactCSSProperties",raw:"React.CSSProperties"},description:""}}};const T={title:"Components/Typography",component:a,tags:["autodocs"]},r={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"0.5rem"},children:[e.jsx(a,{variant:"h1",children:"Heading 1 — 2.25rem"}),e.jsx(a,{variant:"h2",children:"Heading 2 — 1.75rem"}),e.jsx(a,{variant:"h3",children:"Heading 3 — 1.375rem"}),e.jsx(a,{variant:"h4",children:"Heading 4 — 1.125rem"})]})},l={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"0.5rem"},children:[e.jsx(a,{variant:"body-lg",children:"Body Large — Clean readable body font built for modern interfaces."}),e.jsx(a,{variant:"body-md",children:"Body Medium — Standard body text style in Galyan design tokens."}),e.jsx(a,{variant:"body-sm",children:"Body Small — Secondary descriptions and supporting card copy."})]})};var t,i,d;r.parameters={...r.parameters,docs:{...(t=r.parameters)==null?void 0:t.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  }}>\r
      <Typography variant="h1">Heading 1 — 2.25rem</Typography>\r
      <Typography variant="h2">Heading 2 — 1.75rem</Typography>\r
      <Typography variant="h3">Heading 3 — 1.375rem</Typography>\r
      <Typography variant="h4">Heading 4 — 1.125rem</Typography>\r
    </div>
}`,...(d=(i=r.parameters)==null?void 0:i.docs)==null?void 0:d.source}}};var o,s,p;l.parameters={...l.parameters,docs:{...(o=l.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  }}>\r
      <Typography variant="body-lg">Body Large — Clean readable body font built for modern interfaces.</Typography>\r
      <Typography variant="body-md">Body Medium — Standard body text style in Galyan design tokens.</Typography>\r
      <Typography variant="body-sm">Body Small — Secondary descriptions and supporting card copy.</Typography>\r
    </div>
}`,...(p=(s=l.parameters)==null?void 0:s.docs)==null?void 0:p.source}}};const j=["Headings","BodyVariants"];export{l as BodyVariants,r as Headings,j as __namedExportsOrder,T as default};
