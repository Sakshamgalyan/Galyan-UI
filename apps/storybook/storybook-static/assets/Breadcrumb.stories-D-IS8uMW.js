import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as X}from"./index-CC0H-XIk.js";const Y=()=>e.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.25",strokeLinecap:"round",strokeLinejoin:"round",className:"gy-breadcrumb-back-icon",children:e.jsx("polyline",{points:"15 18 9 12 15 6"})}),Z=()=>e.jsx("span",{className:"gy-breadcrumb-separator-char","aria-hidden":"true",children:"/"});function n({items:r,separator:p=e.jsx(Z,{}),onItemClick:h,showBackButton:_=!1,backButtonLabel:b,onBackClick:M,size:U="md",variant:$="default",maxItems:g,className:G=""}){var y,B,k,j,v;const[O,J]=X.useState(!1),f=g&&r.length>g+1&&!O,x=(a,t,o)=>{if(a.disabled){o.preventDefault();return}a.href||o.preventDefault(),h==null||h(a,t)},K=["gy-breadcrumb-nav",`gy-breadcrumb-nav--${U}`,`gy-breadcrumb-nav--${$}`,G].filter(Boolean).join(" ");return f&&(r[0],r[r.length-1]),e.jsx("nav",{"aria-label":"Breadcrumb",className:K,children:e.jsxs("ol",{className:"gy-breadcrumb-list",children:[_&&e.jsxs("li",{className:"gy-breadcrumb-item gy-breadcrumb-back-wrapper",children:[e.jsxs("button",{type:"button",className:"gy-breadcrumb-back-btn",onClick:M,"aria-label":b||"Go back",children:[e.jsx(Y,{}),b&&e.jsx("span",{className:"gy-breadcrumb-back-label",children:b})]}),e.jsx("span",{className:"gy-breadcrumb-divider","aria-hidden":"true"})]}),f?e.jsxs(e.Fragment,{children:[e.jsxs("li",{className:"gy-breadcrumb-item",children:[e.jsxs("a",{className:"gy-breadcrumb-link",href:((y=r[0])==null?void 0:y.href)??"#",onClick:a=>x(r[0],0,a),children:[((B=r[0])==null?void 0:B.icon)&&e.jsx("span",{className:"gy-breadcrumb-icon",children:r[0].icon}),e.jsx("span",{children:(k=r[0])==null?void 0:k.label})]}),e.jsx("span",{className:"gy-breadcrumb-separator","aria-hidden":"true",children:p})]}),e.jsxs("li",{className:"gy-breadcrumb-item",children:[e.jsx("button",{type:"button",className:"gy-breadcrumb-ellipsis",onClick:()=>J(!0),"aria-label":"Show all breadcrumb items",children:"•••"}),e.jsx("span",{className:"gy-breadcrumb-separator","aria-hidden":"true",children:p})]}),e.jsx("li",{className:"gy-breadcrumb-item",children:e.jsxs("span",{className:"gy-breadcrumb-current","aria-current":"page",children:[((j=r[r.length-1])==null?void 0:j.icon)&&e.jsx("span",{className:"gy-breadcrumb-icon",children:r[r.length-1].icon}),e.jsx("span",{children:(v=r[r.length-1])==null?void 0:v.label})]})})]}):r.map((a,t)=>{const o=t===r.length-1;return e.jsx("li",{className:"gy-breadcrumb-item",children:o?e.jsxs("span",{className:"gy-breadcrumb-current","aria-current":"page",children:[a.icon&&e.jsx("span",{className:"gy-breadcrumb-icon",children:a.icon}),e.jsx("span",{children:a.label})]}):e.jsxs(e.Fragment,{children:[e.jsxs("a",{className:`gy-breadcrumb-link ${a.disabled?"gy-breadcrumb-link--disabled":""}`,href:a.href??"#",onClick:Q=>x(a,t,Q),children:[a.icon&&e.jsx("span",{className:"gy-breadcrumb-icon",children:a.icon}),e.jsx("span",{children:a.label})]}),e.jsx("span",{className:"gy-breadcrumb-separator","aria-hidden":"true",children:p})]})},a.id??t)})]})})}n.__docgenInfo={description:"",methods:[],displayName:"Breadcrumb",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"BreadcrumbItemDef"}],raw:"BreadcrumbItemDef[]"},description:""},separator:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"",defaultValue:{value:"<DefaultSlash />",computed:!1}},onItemClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(item: BreadcrumbItemDef, index: number) => void",signature:{arguments:[{type:{name:"BreadcrumbItemDef"},name:"item"},{type:{name:"number"},name:"index"}],return:{name:"void"}}},description:""},showBackButton:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},backButtonLabel:{required:!1,tsType:{name:"string"},description:""},onBackClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},size:{required:!1,tsType:{name:"union",raw:'"sm" | "md" | "lg"',elements:[{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'}]},description:"",defaultValue:{value:'"md"',computed:!1}},variant:{required:!1,tsType:{name:"union",raw:'"default" | "subtle" | "ghost"',elements:[{name:"literal",value:'"default"'},{name:"literal",value:'"subtle"'},{name:"literal",value:'"ghost"'}]},description:"",defaultValue:{value:'"default"',computed:!1}},maxItems:{required:!1,tsType:{name:"number"},description:""},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}}}};const ee=()=>e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"}),e.jsx("polyline",{points:"9 22 9 12 15 12 15 22"})]}),re=()=>e.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("path",{d:"M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"})}),ae=()=>e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}),e.jsx("polyline",{points:"14 2 14 8 20 8"})]}),te={title:"Galyan UI/Breadcrumb",component:n,parameters:{layout:"centered",docs:{description:{component:"Navigation aid showing hierarchical location path with optional sleek back button."}}},tags:["autodocs"],decorators:[r=>e.jsx("div",{style:{width:680,padding:"1rem"},children:e.jsx(r,{})})],argTypes:{size:{control:"select",options:["sm","md","lg"]},variant:{control:"select",options:["default","subtle","ghost"]},showBackButton:{control:"boolean"},maxItems:{control:"number"}}},s=[{label:"Home",href:"/"},{label:"Products",href:"/products"},{label:"Electronics",href:"/products/electronics"},{label:"Smartphones"}],l={args:{items:s,size:"md",variant:"default",showBackButton:!1}},c={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1.5rem"},children:[e.jsxs("div",{children:[e.jsx("h4",{style:{margin:"0 0 0.5rem",fontSize:"0.85rem",color:"var(--gy-text-muted)"},children:"Icon-only Back Button"}),e.jsx(n,{items:s,showBackButton:!0,onBackClick:()=>alert("Back button clicked")})]}),e.jsxs("div",{children:[e.jsx("h4",{style:{margin:"0 0 0.5rem",fontSize:"0.85rem",color:"var(--gy-text-muted)"},children:"Back Button with Label"}),e.jsx(n,{items:s,showBackButton:!0,backButtonLabel:"Back",onBackClick:()=>alert("Back button clicked")})]})]})},i={args:{items:[{label:"Dashboard",href:"/",icon:e.jsx(ee,{})},{label:"Projects",href:"/projects",icon:e.jsx(re,{})},{label:"Design System",icon:e.jsx(ae,{})}],showBackButton:!0,backButtonLabel:"Back"}},d={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1.25rem"},children:[e.jsxs("div",{children:[e.jsx("span",{style:{fontSize:"0.8rem",color:"var(--gy-text-muted)"},children:"Slash Separator (default)"}),e.jsx(n,{items:s})]}),e.jsxs("div",{children:[e.jsx("span",{style:{fontSize:"0.8rem",color:"var(--gy-text-muted)"},children:"Chevron Separator"}),e.jsx(n,{items:s,separator:"›"})]}),e.jsxs("div",{children:[e.jsx("span",{style:{fontSize:"0.8rem",color:"var(--gy-text-muted)"},children:"Arrow Separator"}),e.jsx(n,{items:s,separator:"→"})]}),e.jsxs("div",{children:[e.jsx("span",{style:{fontSize:"0.8rem",color:"var(--gy-text-muted)"},children:"Bullet Separator"}),e.jsx(n,{items:s,separator:"•"})]})]})},m={args:{items:[{label:"Home",href:"/"},{label:"Company",href:"/company"},{label:"Engineering",href:"/company/eng"},{label:"Frontend",href:"/company/eng/fe"},{label:"UI Components",href:"/company/eng/fe/ui"},{label:"Breadcrumb"}],maxItems:3,showBackButton:!0,backButtonLabel:"Back"}},u={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"},children:[e.jsx(n,{items:s,size:"sm",showBackButton:!0}),e.jsx(n,{items:s,size:"md",showBackButton:!0}),e.jsx(n,{items:s,size:"lg",showBackButton:!0})]})};var w,S,I;l.parameters={...l.parameters,docs:{...(w=l.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    items: demoItems,
    size: "md",
    variant: "default",
    showBackButton: false
  }
}`,...(I=(S=l.parameters)==null?void 0:S.docs)==null?void 0:I.source}}};var N,z,C;c.parameters={...c.parameters,docs:{...(N=c.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem"
  }}>\r
      <div>\r
        <h4 style={{
        margin: "0 0 0.5rem",
        fontSize: "0.85rem",
        color: "var(--gy-text-muted)"
      }}>\r
          Icon-only Back Button\r
        </h4>\r
        <Breadcrumb items={demoItems} showBackButton onBackClick={() => alert("Back button clicked")} />\r
      </div>\r
\r
      <div>\r
        <h4 style={{
        margin: "0 0 0.5rem",
        fontSize: "0.85rem",
        color: "var(--gy-text-muted)"
      }}>\r
          Back Button with Label\r
        </h4>\r
        <Breadcrumb items={demoItems} showBackButton backButtonLabel="Back" onBackClick={() => alert("Back button clicked")} />\r
      </div>\r
    </div>
}`,...(C=(z=c.parameters)==null?void 0:z.docs)==null?void 0:C.source}}};var D,L,T;i.parameters={...i.parameters,docs:{...(D=i.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    items: [{
      label: "Dashboard",
      href: "/",
      icon: <HomeIcon />
    }, {
      label: "Projects",
      href: "/projects",
      icon: <FolderIcon />
    }, {
      label: "Design System",
      icon: <DocumentIcon />
    }],
    showBackButton: true,
    backButtonLabel: "Back"
  }
}`,...(T=(L=i.parameters)==null?void 0:L.docs)==null?void 0:T.source}}};var q,H,W;d.parameters={...d.parameters,docs:{...(q=d.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem"
  }}>\r
      <div>\r
        <span style={{
        fontSize: "0.8rem",
        color: "var(--gy-text-muted)"
      }}>Slash Separator (default)</span>\r
        <Breadcrumb items={demoItems} />\r
      </div>\r
      <div>\r
        <span style={{
        fontSize: "0.8rem",
        color: "var(--gy-text-muted)"
      }}>Chevron Separator</span>\r
        <Breadcrumb items={demoItems} separator="›" />\r
      </div>\r
      <div>\r
        <span style={{
        fontSize: "0.8rem",
        color: "var(--gy-text-muted)"
      }}>Arrow Separator</span>\r
        <Breadcrumb items={demoItems} separator="→" />\r
      </div>\r
      <div>\r
        <span style={{
        fontSize: "0.8rem",
        color: "var(--gy-text-muted)"
      }}>Bullet Separator</span>\r
        <Breadcrumb items={demoItems} separator="•" />\r
      </div>\r
    </div>
}`,...(W=(H=d.parameters)==null?void 0:H.docs)==null?void 0:W.source}}};var E,V,F;m.parameters={...m.parameters,docs:{...(E=m.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    items: [{
      label: "Home",
      href: "/"
    }, {
      label: "Company",
      href: "/company"
    }, {
      label: "Engineering",
      href: "/company/eng"
    }, {
      label: "Frontend",
      href: "/company/eng/fe"
    }, {
      label: "UI Components",
      href: "/company/eng/fe/ui"
    }, {
      label: "Breadcrumb"
    }],
    maxItems: 3,
    showBackButton: true,
    backButtonLabel: "Back"
  }
}`,...(F=(V=m.parameters)==null?void 0:V.docs)==null?void 0:F.source}}};var P,R,A;u.parameters={...u.parameters,docs:{...(P=u.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "1rem"
  }}>\r
      <Breadcrumb items={demoItems} size="sm" showBackButton />\r
      <Breadcrumb items={demoItems} size="md" showBackButton />\r
      <Breadcrumb items={demoItems} size="lg" showBackButton />\r
    </div>
}`,...(A=(R=u.parameters)==null?void 0:R.docs)==null?void 0:A.source}}};const oe=["Default","WithSleekBackButton","WithIcons","CustomSeparators","CollapsedLongPath","Sizes"];export{m as CollapsedLongPath,d as CustomSeparators,l as Default,u as Sizes,i as WithIcons,c as WithSleekBackButton,oe as __namedExportsOrder,te as default};
