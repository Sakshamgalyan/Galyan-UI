import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as U}from"./index-CC0H-XIk.js";function n({items:r,variant:_="classic",size:D="md",activeTab:C,defaultTab:M,onTabChange:p,onChange:g,fullWidth:E=!1,disabled:F=!1,orientation:v="horizontal",className:H=""}){var y;const[O,R]=U.useState(M??((y=r[0])==null?void 0:y.id)??""),s=C??O,P=a=>{R(a),p==null||p(a),g==null||g(a)},i=r.find(a=>a.id===s),G=["gy-tabs",`gy-tabs--${_}`,`gy-tabs--${D}`,v==="vertical"?"gy-tabs--vertical":"",E?"gy-tabs--full-width":"",H].filter(Boolean).join(" ");return e.jsxs("div",{className:G,children:[e.jsx("div",{className:"gy-tabs-list",role:"tablist","aria-orientation":v,children:r.map(a=>{const b=F||a.disabled;return e.jsxs("button",{role:"tab",id:`gy-tab-${a.id}`,"aria-controls":`gy-panel-${a.id}`,"aria-selected":s===a.id,disabled:b,className:`gy-tabs-trigger ${s===a.id?"gy-tabs-trigger--active":""}`,onClick:()=>!b&&P(a.id),children:[a.icon&&e.jsx("span",{className:"gy-tabs-trigger__icon","aria-hidden":"true",children:a.icon}),a.label,a.badge!==void 0&&e.jsx("span",{className:"gy-tabs-trigger-badge",children:a.badge})]},a.id)})}),(i==null?void 0:i.content)&&e.jsx("div",{id:`gy-panel-${s}`,role:"tabpanel","aria-labelledby":`gy-tab-${s}`,className:"gy-tabs-panel",children:i.content},s)]})}n.__docgenInfo={description:"",methods:[],displayName:"Tabs",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"TabItem"}],raw:"TabItem[]"},description:""},variant:{required:!1,tsType:{name:"union",raw:'"classic" | "card" | "button"',elements:[{name:"literal",value:'"classic"'},{name:"literal",value:'"card"'},{name:"literal",value:'"button"'}]},description:"",defaultValue:{value:'"classic"',computed:!1}},size:{required:!1,tsType:{name:"union",raw:'"sm" | "md" | "lg"',elements:[{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'}]},description:"",defaultValue:{value:'"md"',computed:!1}},activeTab:{required:!1,tsType:{name:"string"},description:""},defaultTab:{required:!1,tsType:{name:"string"},description:""},onTabChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}}},description:""},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}}},description:"@deprecated use onTabChange"},fullWidth:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},orientation:{required:!1,tsType:{name:"union",raw:'"horizontal" | "vertical"',elements:[{name:"literal",value:'"horizontal"'},{name:"literal",value:'"vertical"'}]},description:"",defaultValue:{value:'"horizontal"',computed:!1}},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}}}};const J=()=>e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"}),e.jsx("polyline",{points:"9 22 9 12 15 12 15 22"})]}),K=()=>e.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("polyline",{points:"22 12 18 12 15 21 9 3 6 12 2 12"})}),Q=()=>e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}),e.jsx("polyline",{points:"14 2 14 8 20 8"}),e.jsx("line",{x1:"16",y1:"13",x2:"8",y2:"13"}),e.jsx("line",{x1:"16",y1:"17",x2:"8",y2:"17"})]}),Z={title:"Galyan UI/Tabs",component:n,parameters:{layout:"centered"},tags:["autodocs"],decorators:[r=>e.jsx("div",{style:{width:560,padding:"1rem"},children:e.jsx(r,{})})]},t=[{id:"overview",label:"Overview",icon:e.jsx(J,{}),content:e.jsx("p",{style:{color:"var(--gy-text-muted)",margin:"0.5rem 0"},children:"Overview content goes here. This is the main dashboard view."})},{id:"analytics",label:"Analytics",icon:e.jsx(K,{}),badge:3,content:e.jsx("p",{style:{color:"var(--gy-text-muted)",margin:"0.5rem 0"},children:"Analytics data and charts would render in this panel."})},{id:"reports",label:"Reports",icon:e.jsx(Q,{}),content:e.jsx("p",{style:{color:"var(--gy-text-muted)",margin:"0.5rem 0"},children:"Report generation tools and export options live here."})},{id:"settings",label:"Settings",disabled:!0,content:e.jsx("p",{children:"Settings (disabled)"})}],l={args:{items:t,variant:"classic"}},o={args:{items:t,variant:"card"}},d={args:{items:t,variant:"button"}},c={args:{items:t,variant:"classic",orientation:"vertical"}},m={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"2.5rem"},children:[e.jsxs("div",{children:[e.jsx("span",{style:{fontSize:"0.75rem",fontWeight:600,color:"var(--gy-text-subtle)",display:"block",marginBottom:"0.5rem"},children:"Small (sm)"}),e.jsx(n,{items:t,variant:"classic",size:"sm"})]}),e.jsxs("div",{children:[e.jsx("span",{style:{fontSize:"0.75rem",fontWeight:600,color:"var(--gy-text-subtle)",display:"block",marginBottom:"0.5rem"},children:"Medium (md Default)"}),e.jsx(n,{items:t,variant:"card",size:"md"})]}),e.jsxs("div",{children:[e.jsx("span",{style:{fontSize:"0.75rem",fontWeight:600,color:"var(--gy-text-subtle)",display:"block",marginBottom:"0.5rem"},children:"Large (lg)"}),e.jsx(n,{items:t,variant:"button",size:"lg"})]})]})},u={args:{items:t,variant:"card",fullWidth:!0}};var x,f,h;l.parameters={...l.parameters,docs:{...(x=l.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    items: demoItems,
    variant: "classic"
  }
}`,...(h=(f=l.parameters)==null?void 0:f.docs)==null?void 0:h.source}}};var j,T,z;o.parameters={...o.parameters,docs:{...(j=o.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    items: demoItems,
    variant: "card"
  }
}`,...(z=(T=o.parameters)==null?void 0:T.docs)==null?void 0:z.source}}};var S,k,w;d.parameters={...d.parameters,docs:{...(S=d.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    items: demoItems,
    variant: "button"
  }
}`,...(w=(k=d.parameters)==null?void 0:k.docs)==null?void 0:w.source}}};var I,W,B;c.parameters={...c.parameters,docs:{...(I=c.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    items: demoItems,
    variant: "classic",
    orientation: "vertical"
  }
}`,...(B=(W=c.parameters)==null?void 0:W.docs)==null?void 0:B.source}}};var q,V,L;m.parameters={...m.parameters,docs:{...(q=m.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "2.5rem"
  }}>\r
      <div>\r
        <span style={{
        fontSize: "0.75rem",
        fontWeight: 600,
        color: "var(--gy-text-subtle)",
        display: "block",
        marginBottom: "0.5rem"
      }}>\r
          Small (sm)\r
        </span>\r
        <Tabs items={demoItems} variant="classic" size="sm" />\r
      </div>\r
      <div>\r
        <span style={{
        fontSize: "0.75rem",
        fontWeight: 600,
        color: "var(--gy-text-subtle)",
        display: "block",
        marginBottom: "0.5rem"
      }}>\r
          Medium (md Default)\r
        </span>\r
        <Tabs items={demoItems} variant="card" size="md" />\r
      </div>\r
      <div>\r
        <span style={{
        fontSize: "0.75rem",
        fontWeight: 600,
        color: "var(--gy-text-subtle)",
        display: "block",
        marginBottom: "0.5rem"
      }}>\r
          Large (lg)\r
        </span>\r
        <Tabs items={demoItems} variant="button" size="lg" />\r
      </div>\r
    </div>
}`,...(L=(V=m.parameters)==null?void 0:V.docs)==null?void 0:L.source}}};var N,$,A;u.parameters={...u.parameters,docs:{...(N=u.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    items: demoItems,
    variant: "card",
    fullWidth: true
  }
}`,...(A=($=u.parameters)==null?void 0:$.docs)==null?void 0:A.source}}};const ee=["Classic","Card","ButtonPill","VerticalTabs","Sizes","FullWidth"];export{d as ButtonPill,o as Card,l as Classic,u as FullWidth,m as Sizes,c as VerticalTabs,ee as __namedExportsOrder,Z as default};
