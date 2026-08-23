import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as b}from"./index-CC0H-XIk.js";import{C as Y}from"./Chips-9VuCc6c0.js";const j=()=>e.jsx("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("polyline",{points:"4,6 8,10 12,6"})});function a({size:r="md",variant:m="default",disabled:o=!1,defaultExpanded:F=!1,expanded:u,onChange:h,unmountOnExit:f=!1,expandIconPosition:s="right",title:G,children:V,items:y,className:g=""}){var v;const[$,z]=b.useState(F),t=u!==void 0?u:$,D=()=>{if(o)return;const n=!t;u===void 0&&z(n),h==null||h(n)},x=b.useRef(null);t&&((v=x.current)==null||v.scrollHeight);const W=["gy-accordion",`gy-accordion--${r}`,`gy-accordion--${m}`,o?"gy-accordion--disabled":"",t?"gy-accordion--expanded":"",g].filter(Boolean).join(" ");return y&&y.length>0?e.jsx("div",{className:`gy-accordion-group gy-accordion-group--${m} ${g}`,children:y.map(n=>e.jsx(a,{size:r,variant:m,disabled:o||n.disabled,expandIconPosition:s,title:n.title,unmountOnExit:f,children:n.content},n.id))}):e.jsxs("div",{className:W,children:[e.jsxs("button",{type:"button",className:`gy-accordion__trigger gy-accordion__trigger--icon-${s}`,onClick:D,disabled:o,"aria-expanded":t,children:[s==="left"&&e.jsx("span",{className:`gy-accordion__icon ${t?"gy-accordion__icon--open":""}`,children:e.jsx(j,{})}),e.jsx("span",{className:"gy-accordion__title",children:G}),s==="right"&&e.jsx("span",{className:`gy-accordion__icon ${t?"gy-accordion__icon--open":""}`,children:e.jsx(j,{})})]}),(!f||t)&&e.jsx("div",{className:`gy-accordion__panel ${t?"gy-accordion__panel--expanded":""}`,style:{display:"grid",gridTemplateRows:t?"1fr":"0fr",transition:"grid-template-rows 300ms cubic-bezier(0.4, 0, 0.2, 1)"},children:e.jsx("div",{className:"gy-accordion__panel-inner",style:{overflow:"hidden"},children:e.jsx("div",{ref:x,className:"gy-accordion__content",children:V})})})]})}a.__docgenInfo={description:"",methods:[],displayName:"Accordion",props:{size:{required:!1,tsType:{name:"union",raw:'"sm" | "md" | "lg"',elements:[{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'}]},description:"",defaultValue:{value:'"md"',computed:!1}},variant:{required:!1,tsType:{name:"union",raw:'"default" | "bordered" | "flush" | "separated"',elements:[{name:"literal",value:'"default"'},{name:"literal",value:'"bordered"'},{name:"literal",value:'"flush"'},{name:"literal",value:'"separated"'}]},description:"",defaultValue:{value:'"default"',computed:!1}},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},defaultExpanded:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},expanded:{required:!1,tsType:{name:"boolean"},description:""},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(expanded: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"expanded"}],return:{name:"void"}}},description:""},unmountOnExit:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},expandIconPosition:{required:!1,tsType:{name:"union",raw:'"left" | "right"',elements:[{name:"literal",value:'"left"'},{name:"literal",value:'"right"'}]},description:"",defaultValue:{value:'"right"',computed:!1}},title:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}},items:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{\r
  id: string;\r
  title: React.ReactNode;\r
  content: React.ReactNode;\r
  disabled?: boolean;\r
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"title",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!0}},{key:"content",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!0}},{key:"disabled",value:{name:"boolean",required:!1}}]}}],raw:`{\r
  id: string;\r
  title: React.ReactNode;\r
  content: React.ReactNode;\r
  disabled?: boolean;\r
}[]`},description:""}}};const U=()=>e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("circle",{cx:"12",cy:"12",r:"10"}),e.jsx("path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"}),e.jsx("line",{x1:"12",y1:"17",x2:"12.01",y2:"17"})]}),M=()=>e.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("path",{d:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"})}),H=()=>e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("rect",{x:"1",y:"4",width:"22",height:"16",rx:"2",ry:"2"}),e.jsx("line",{x1:"1",y1:"10",x2:"23",y2:"10"})]}),J={title:"Galyan UI/Accordion",component:a,parameters:{layout:"centered",docs:{description:{component:"Collapsible panels for presenting hierarchical, grouped, or FAQ information."}}},tags:["autodocs"],decorators:[r=>e.jsx("div",{style:{width:600,padding:"1rem"},children:e.jsx(r,{})})],argTypes:{size:{control:"select",options:["sm","md","lg"]},variant:{control:"select",options:["default","bordered","flush","separated"]},disabled:{control:"boolean"},defaultExpanded:{control:"boolean"},expanded:{control:"boolean"},unmountOnExit:{control:"boolean"},expandIconPosition:{control:"inline-radio",options:["left","right"]},title:{control:"text"},className:{control:"text"}}},i={args:{title:"What is Galyan UI?",children:"Galyan UI is a modern, enterprise-ready React component library with built-in multi-brand theme tokens, dark mode, and high-performance CSS.",defaultExpanded:!0,size:"md",variant:"default",expandIconPosition:"right"}},d={render:()=>e.jsx(a,{variant:"separated",items:[{id:"1",title:e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.5rem",width:"100%"},children:[e.jsx(H,{}),e.jsx("span",{children:"Billing & Subscription"}),e.jsx("span",{style:{marginLeft:"auto",marginRight:"0.5rem"},children:e.jsx(Y,{size:"sm",variant:"success",children:"Active"})})]}),content:"Manage your payment methods, invoice receipts, and auto-renewal settings."},{id:"2",title:e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.5rem"},children:[e.jsx(M,{}),e.jsx("span",{children:"Security & Two-Factor Authentication"})]}),content:"Protect your workspace with 2FA, biometric keys, and session management."},{id:"3",title:e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.5rem"},children:[e.jsx(U,{}),e.jsx("span",{children:"Developer API Keys"})]}),content:"Generate and rotate API keys for easyLife, metalixia, and samantrix apps."}]})},l={render:()=>e.jsx(a,{variant:"bordered",items:[{id:"1",title:"How does the Brand × Role theme system work?",content:"Brands define the company palette (easyLife, metalixia, samantrix) while roles adjust surfaces and permission-based accents."},{id:"2",title:"Can I provide custom primary colors?",content:"Yes! Pass brand='custom' and customTheme={{ primary: '#ff6600' }} to dynamically derive a complete color ramp."},{id:"3",title:"Is dark mode supported out of the box?",content:"Yes, all components support light and dark modes seamlessly via CSS custom properties."}]})},c={args:{title:"Click to reveal secrets",children:"Expand icon is located on the left side of the header.",expandIconPosition:"left",variant:"separated"}},p={render:()=>e.jsx(a,{variant:"separated",items:[{id:"1",title:"Available Feature",content:"This section can be opened and closed normally."},{id:"2",title:"Pro Feature (Locked)",content:"You need an enterprise license to view this content.",disabled:!0}]})};var w,k,I;i.parameters={...i.parameters,docs:{...(w=i.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    title: "What is Galyan UI?",
    children: "Galyan UI is a modern, enterprise-ready React component library with built-in multi-brand theme tokens, dark mode, and high-performance CSS.",
    defaultExpanded: true,
    size: "md",
    variant: "default",
    expandIconPosition: "right"
  }
}`,...(I=(k=i.parameters)==null?void 0:k.docs)==null?void 0:I.source}}};var R,_,C;d.parameters={...d.parameters,docs:{...(R=d.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: () => <Accordion variant="separated" items={[{
    id: "1",
    title: <div style={{
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      width: "100%"
    }}>\r
              <CreditCardIcon />\r
              <span>Billing & Subscription</span>\r
              <span style={{
        marginLeft: "auto",
        marginRight: "0.5rem"
      }}>\r
                <Chip size="sm" variant="success">Active</Chip>\r
              </span>\r
            </div>,
    content: "Manage your payment methods, invoice receipts, and auto-renewal settings."
  }, {
    id: "2",
    title: <div style={{
      display: "flex",
      alignItems: "center",
      gap: "0.5rem"
    }}>\r
              <ShieldIcon />\r
              <span>Security & Two-Factor Authentication</span>\r
            </div>,
    content: "Protect your workspace with 2FA, biometric keys, and session management."
  }, {
    id: "3",
    title: <div style={{
      display: "flex",
      alignItems: "center",
      gap: "0.5rem"
    }}>\r
              <QuestionIcon />\r
              <span>Developer API Keys</span>\r
            </div>,
    content: "Generate and rotate API keys for easyLife, metalixia, and samantrix apps."
  }]} />
}`,...(C=(_=d.parameters)==null?void 0:_.docs)==null?void 0:C.source}}};var N,S,T;l.parameters={...l.parameters,docs:{...(N=l.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => <Accordion variant="bordered" items={[{
    id: "1",
    title: "How does the Brand × Role theme system work?",
    content: "Brands define the company palette (easyLife, metalixia, samantrix) while roles adjust surfaces and permission-based accents."
  }, {
    id: "2",
    title: "Can I provide custom primary colors?",
    content: "Yes! Pass brand='custom' and customTheme={{ primary: '#ff6600' }} to dynamically derive a complete color ramp."
  }, {
    id: "3",
    title: "Is dark mode supported out of the box?",
    content: "Yes, all components support light and dark modes seamlessly via CSS custom properties."
  }]} />
}`,...(T=(S=l.parameters)==null?void 0:S.docs)==null?void 0:T.source}}};var A,L,q;c.parameters={...c.parameters,docs:{...(A=c.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    title: "Click to reveal secrets",
    children: "Expand icon is located on the left side of the header.",
    expandIconPosition: "left",
    variant: "separated"
  }
}`,...(q=(L=c.parameters)==null?void 0:L.docs)==null?void 0:q.source}}};var P,B,E;p.parameters={...p.parameters,docs:{...(P=p.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => <Accordion variant="separated" items={[{
    id: "1",
    title: "Available Feature",
    content: "This section can be opened and closed normally."
  }, {
    id: "2",
    title: "Pro Feature (Locked)",
    content: "You need an enterprise license to view this content.",
    disabled: true
  }]} />
}`,...(E=(B=p.parameters)==null?void 0:B.docs)==null?void 0:E.source}}};const X=["Default","SeparatedCards","BorderedGroup","LeftIconPosition","DisabledItems"];export{l as BorderedGroup,i as Default,p as DisabledItems,c as LeftIconPosition,d as SeparatedCards,X as __namedExportsOrder,J as default};
