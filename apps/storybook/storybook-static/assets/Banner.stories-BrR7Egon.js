import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as K}from"./index-CC0H-XIk.js";import{B as p}from"./Button-BeMeJT-5.js";const E={info:e.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("circle",{cx:"12",cy:"12",r:"10"}),e.jsx("line",{x1:"12",y1:"16",x2:"12",y2:"12"}),e.jsx("line",{x1:"12",y1:"8",x2:"12.01",y2:"8"})]}),success:e.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14"}),e.jsx("polyline",{points:"22 4 12 14.01 9 11.01"})]}),warning:e.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"}),e.jsx("line",{x1:"12",y1:"9",x2:"12",y2:"13"}),e.jsx("line",{x1:"12",y1:"17",x2:"12.01",y2:"17"})]}),danger:e.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("circle",{cx:"12",cy:"12",r:"10"}),e.jsx("line",{x1:"15",y1:"9",x2:"9",y2:"15"}),e.jsx("line",{x1:"9",y1:"9",x2:"15",y2:"15"})]}),neutral:e.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"}),e.jsx("path",{d:"M13.73 21a2 2 0 0 1-3.46 0"})]})};function n({variant:i="info",bannerStyle:N="subtle",title:c,description:L,size:W="md",icon:q,button:u,fullWidth:V=!0,dismissible:_=!1,onDismiss:d,className:P="",bordered:I=!0,children:M}){const[U,Y]=K.useState(!1);if(U)return null;const O=()=>{Y(!0),d==null||d()},m=M??L,F=["gy-banner",`gy-banner--${i}`,`gy-banner--${N}`,`gy-banner--${W}`,V?"gy-banner--full-width":"",I?"gy-banner--bordered":"",P].filter(Boolean).join(" ");return e.jsxs("div",{className:F,role:"alert",children:[e.jsx("span",{className:"gy-banner__icon",children:q??E[i]}),e.jsxs("div",{className:"gy-banner__content",children:[c&&e.jsx("div",{className:"gy-banner__title",children:c}),m&&e.jsx("div",{className:"gy-banner__description",children:m})]}),u&&e.jsx("div",{className:"gy-banner__action",children:u}),_&&e.jsx("button",{type:"button",className:"gy-banner__close",onClick:O,"aria-label":"Dismiss",children:e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.25",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),e.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})}n.__docgenInfo={description:"",methods:[],displayName:"Banner",props:{variant:{required:!1,tsType:{name:"union",raw:`| "info"
| "success"
| "warning"
| "danger"
| "neutral"`,elements:[{name:"literal",value:'"info"'},{name:"literal",value:'"success"'},{name:"literal",value:'"warning"'},{name:"literal",value:'"danger"'},{name:"literal",value:'"neutral"'}]},description:"The semantic variant/color theme of the banner ('info', 'success', 'warning', 'danger', 'neutral'). Default is 'info'.",defaultValue:{value:'"info"',computed:!1}},bannerStyle:{required:!1,tsType:{name:"union",raw:'"subtle" | "solid" | "outline"',elements:[{name:"literal",value:'"subtle"'},{name:"literal",value:'"solid"'},{name:"literal",value:'"outline"'}]},description:"Visual style variant ('subtle', 'solid', 'outline'). Default is 'subtle'.",defaultValue:{value:'"subtle"',computed:!1}},title:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Title header element or text displayed at the top of the banner."},description:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Description message content displayed within the banner body."},size:{required:!1,tsType:{name:"union",raw:'"sm" | "md" | "lg"',elements:[{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'}]},description:"Size variant controlling banner padding and font sizes ('sm', 'md', 'lg'). Default is 'md'.",defaultValue:{value:'"md"',computed:!1}},icon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Custom leading icon to replace the default variant icon."},button:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Custom action element or button displayed on the right side of the banner."},fullWidth:{required:!1,tsType:{name:"boolean"},description:"Whether the banner takes up the full width of its container. Default is true.",defaultValue:{value:"true",computed:!1}},dismissible:{required:!1,tsType:{name:"boolean"},description:"Whether to render a close button allowing users to dismiss the banner. Default is false.",defaultValue:{value:"false",computed:!1}},onDismiss:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Callback triggered when the dismiss close button is clicked."},className:{required:!1,tsType:{name:"string"},description:"Additional CSS class names to apply to the root banner container.",defaultValue:{value:'""',computed:!1}},bordered:{required:!1,tsType:{name:"boolean"},description:"Whether to render a border around the banner. Default is true.",defaultValue:{value:"true",computed:!1}},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Children content passed as fallback or alternative for description."}}};const H={title:"Galyan UI/Banner",component:n,parameters:{layout:"centered",docs:{description:{component:"Prominent contextual feedback messages, alerts, and system notices."}}},tags:["autodocs"],decorators:[i=>e.jsx("div",{style:{width:660,padding:"1rem"},children:e.jsx(i,{})})],argTypes:{variant:{control:"select",options:["info","success","warning","danger","neutral"]},bannerStyle:{control:"select",options:["subtle","solid","outline"]},size:{control:"select",options:["sm","md","lg"]},title:{control:"text"},description:{control:"text"},fullWidth:{control:"boolean"},bordered:{control:"boolean"},dismissible:{control:"boolean"}}},t={args:{title:"System Maintenance Scheduled",description:"We will be performing routine server maintenance on Sunday at 02:00 UTC.",variant:"info",bannerStyle:"subtle",size:"md",fullWidth:!0,bordered:!0,dismissible:!0}},r={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"},children:[e.jsx(n,{variant:"info",title:"Information Update",description:"A new software version (v2.4.0) is ready for deployment.",dismissible:!0}),e.jsx(n,{variant:"success",title:"Payment Succeeded",description:"Your enterprise invoice #2049 has been processed.",dismissible:!0}),e.jsx(n,{variant:"warning",title:"Storage Quota Nearing Limit",description:"You have used 88% of your available workspace storage.",dismissible:!0}),e.jsx(n,{variant:"danger",title:"Deployment Failed",description:"Build #819 encountered syntax compilation errors.",dismissible:!0}),e.jsx(n,{variant:"neutral",title:"Tip of the Day",description:"Press ⌘+K anytime to quickly open the command palette.",dismissible:!0})]})},a={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"},children:[e.jsx(n,{variant:"info",bannerStyle:"solid",title:"New Cloud Region Available",description:"You can now deploy workloads in Frankfurt (eu-central-1).",dismissible:!0}),e.jsx(n,{variant:"success",bannerStyle:"solid",title:"Security Audit Passed",description:"100% compliance with SOC2 and ISO27001 standards.",dismissible:!0}),e.jsx(n,{variant:"warning",bannerStyle:"solid",title:"Action Required: API Key Deprecation",description:"Legacy tokens will stop working on September 30, 2026.",dismissible:!0}),e.jsx(n,{variant:"danger",bannerStyle:"solid",title:"Critical Security Alert",description:"Unauthorized IP address attempted admin portal login.",dismissible:!0})]})},s={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"},children:[e.jsx(n,{variant:"info",title:"Try our new AI Assistant",description:"Accelerate your workflow with contextual code completions.",button:e.jsx(p,{size:"sm",variant:"primary",children:"Try Now"}),dismissible:!0}),e.jsx(n,{variant:"warning",title:"Verify your recovery email",description:"Please confirm your secondary address to prevent lockout.",button:e.jsx(p,{size:"sm",variant:"secondary",children:"Verify"}),dismissible:!0})]})},o={render:()=>e.jsx(n,{variant:"info",title:"What's new in Galyan v2.0",dismissible:!0,children:e.jsx("div",{style:{marginTop:"0.25rem"},children:e.jsxs("ul",{style:{margin:"0",paddingLeft:"1.25rem"},children:[e.jsx("li",{children:"Two-axis theme architecture (Brand × Role)"}),e.jsx("li",{children:"Custom zero-dependency color derivation"}),e.jsx("li",{children:"Refined dark theme and soft high-contrast components"})]})})})},l={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"},children:[e.jsx(n,{size:"sm",variant:"info",title:"Small Banner",description:"Compact notification message."}),e.jsx(n,{size:"md",variant:"info",title:"Medium Banner (Default)",description:"Standard size notification message."}),e.jsx(n,{size:"lg",variant:"info",title:"Large Banner",description:"Prominent large callout with extensive details."})]})};var y,f,h;t.parameters={...t.parameters,docs:{...(y=t.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    title: "System Maintenance Scheduled",
    description: "We will be performing routine server maintenance on Sunday at 02:00 UTC.",
    variant: "info",
    bannerStyle: "subtle",
    size: "md",
    fullWidth: true,
    bordered: true,
    dismissible: true
  }
}`,...(h=(f=t.parameters)==null?void 0:f.docs)==null?void 0:h.source}}};var v,g,x;r.parameters={...r.parameters,docs:{...(v=r.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "1rem"
  }}>\r
      <Banner variant="info" title="Information Update" description="A new software version (v2.4.0) is ready for deployment." dismissible />\r
      <Banner variant="success" title="Payment Succeeded" description="Your enterprise invoice #2049 has been processed." dismissible />\r
      <Banner variant="warning" title="Storage Quota Nearing Limit" description="You have used 88% of your available workspace storage." dismissible />\r
      <Banner variant="danger" title="Deployment Failed" description="Build #819 encountered syntax compilation errors." dismissible />\r
      <Banner variant="neutral" title="Tip of the Day" description="Press ⌘+K anytime to quickly open the command palette." dismissible />\r
    </div>
}`,...(x=(g=r.parameters)==null?void 0:g.docs)==null?void 0:x.source}}};var b,w,j;a.parameters={...a.parameters,docs:{...(b=a.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "1rem"
  }}>\r
      <Banner variant="info" bannerStyle="solid" title="New Cloud Region Available" description="You can now deploy workloads in Frankfurt (eu-central-1)." dismissible />\r
      <Banner variant="success" bannerStyle="solid" title="Security Audit Passed" description="100% compliance with SOC2 and ISO27001 standards." dismissible />\r
      <Banner variant="warning" bannerStyle="solid" title="Action Required: API Key Deprecation" description="Legacy tokens will stop working on September 30, 2026." dismissible />\r
      <Banner variant="danger" bannerStyle="solid" title="Critical Security Alert" description="Unauthorized IP address attempted admin portal login." dismissible />\r
    </div>
}`,...(j=(w=a.parameters)==null?void 0:w.docs)==null?void 0:j.source}}};var S,k,B;s.parameters={...s.parameters,docs:{...(S=s.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "1rem"
  }}>\r
      <Banner variant="info" title="Try our new AI Assistant" description="Accelerate your workflow with contextual code completions." button={<Button size="sm" variant="primary">Try Now</Button>} dismissible />\r
      <Banner variant="warning" title="Verify your recovery email" description="Please confirm your secondary address to prevent lockout." button={<Button size="sm" variant="secondary">Verify</Button>} dismissible />\r
    </div>
}`,...(B=(k=s.parameters)==null?void 0:k.docs)==null?void 0:B.source}}};var R,C,T;o.parameters={...o.parameters,docs:{...(R=o.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: () => <Banner variant="info" title="What's new in Galyan v2.0" dismissible>\r
      <div style={{
      marginTop: "0.25rem"
    }}>\r
        <ul style={{
        margin: "0",
        paddingLeft: "1.25rem"
      }}>\r
          <li>Two-axis theme architecture (Brand × Role)</li>\r
          <li>Custom zero-dependency color derivation</li>\r
          <li>Refined dark theme and soft high-contrast components</li>\r
        </ul>\r
      </div>\r
    </Banner>
}`,...(T=(C=o.parameters)==null?void 0:C.docs)==null?void 0:T.source}}};var A,z,D;l.parameters={...l.parameters,docs:{...(A=l.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "1rem"
  }}>\r
      <Banner size="sm" variant="info" title="Small Banner" description="Compact notification message." />\r
      <Banner size="md" variant="info" title="Medium Banner (Default)" description="Standard size notification message." />\r
      <Banner size="lg" variant="info" title="Large Banner" description="Prominent large callout with extensive details." />\r
    </div>
}`,...(D=(z=l.parameters)==null?void 0:z.docs)==null?void 0:D.source}}};const J=["Default","AllVariants","SolidVariants","WithActionButtons","RichContentAndBullets","Sizes"];export{r as AllVariants,t as Default,o as RichContentAndBullets,l as Sizes,a as SolidVariants,s as WithActionButtons,J as __namedExportsOrder,H as default};
