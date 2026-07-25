import{j as a}from"./jsx-runtime-D_zvdyIk.js";import{r as U}from"./index-JhL3uwfD.js";function i({items:r,variant:A="classic",size:W="md",activeTab:B,defaultTab:D,onTabChange:u,onChange:p,fullWidth:E=!1,disabled:O=!1,orientation:g="horizontal",className:R=""}){var v;const[F,k]=U.useState(D??((v=r[0])==null?void 0:v.id)??""),t=B??F,C=e=>{k(e),u==null||u(e),p==null||p(e)},n=r.find(e=>e.id===t),G=["gy-tabs",`gy-tabs--${A}`,`gy-tabs--${W}`,g==="vertical"?"gy-tabs--vertical":"",E?"gy-tabs--full-width":"",R].filter(Boolean).join(" ");return a.jsxs("div",{className:G,children:[a.jsx("div",{className:"gy-tabs-list",role:"tablist","aria-orientation":g,children:r.map(e=>{const b=O||e.disabled;return a.jsxs("button",{role:"tab",id:`gy-tab-${e.id}`,"aria-controls":`gy-panel-${e.id}`,"aria-selected":t===e.id,disabled:b,className:`gy-tabs-trigger ${t===e.id?"gy-tabs-trigger--active":""}`,onClick:()=>!b&&C(e.id),children:[e.icon&&a.jsx("span",{className:"gy-tabs-trigger__icon","aria-hidden":"true",children:e.icon}),e.label,e.badge!==void 0&&a.jsx("span",{className:"gy-tabs-trigger-badge",children:e.badge})]},e.id)})}),(n==null?void 0:n.content)&&a.jsx("div",{id:`gy-panel-${t}`,role:"tabpanel","aria-labelledby":`gy-tab-${t}`,className:"gy-tabs-panel",children:n.content},t)]})}i.__docgenInfo={description:"",methods:[],displayName:"Tabs",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"TabItem"}],raw:"TabItem[]"},description:""},variant:{required:!1,tsType:{name:"union",raw:"'classic' | 'card' | 'button'",elements:[{name:"literal",value:"'classic'"},{name:"literal",value:"'card'"},{name:"literal",value:"'button'"}]},description:"",defaultValue:{value:"'classic'",computed:!1}},size:{required:!1,tsType:{name:"union",raw:"'sm' | 'md' | 'lg'",elements:[{name:"literal",value:"'sm'"},{name:"literal",value:"'md'"},{name:"literal",value:"'lg'"}]},description:"",defaultValue:{value:"'md'",computed:!1}},activeTab:{required:!1,tsType:{name:"string"},description:""},defaultTab:{required:!1,tsType:{name:"string"},description:""},onTabChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}}},description:""},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}}},description:"@deprecated use onTabChange"},fullWidth:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},orientation:{required:!1,tsType:{name:"union",raw:"'horizontal' | 'vertical'",elements:[{name:"literal",value:"'horizontal'"},{name:"literal",value:"'vertical'"}]},description:"",defaultValue:{value:"'horizontal'",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}}}};const K={title:"Galyan UI/Tabs",component:i,parameters:{layout:"centered"},tags:["autodocs"],decorators:[r=>a.jsx("div",{style:{width:500},children:a.jsx(r,{})})]},s=[{id:"overview",label:"Overview",content:a.jsx("p",{children:"Overview content goes here. This is the main dashboard view."})},{id:"analytics",label:"Analytics",badge:3,content:a.jsx("p",{children:"Analytics data and charts would render in this panel."})},{id:"reports",label:"Reports",content:a.jsx("p",{children:"Report generation tools and export options live here."})},{id:"settings",label:"Settings",disabled:!0,content:a.jsx("p",{children:"Settings (disabled)"})}],l={args:{items:s,variant:"classic"}},d={args:{items:s,variant:"card"}},o={args:{items:s,variant:"button"}},c={render:()=>a.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"2rem"},children:[a.jsx(i,{items:s,variant:"classic",size:"sm"}),a.jsx(i,{items:s,variant:"card",size:"md"}),a.jsx(i,{items:s,variant:"button",size:"lg"})]})},m={args:{items:s,variant:"card",fullWidth:!0}};var f,y,h;l.parameters={...l.parameters,docs:{...(f=l.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    items: demoItems,
    variant: 'classic'
  }
}`,...(h=(y=l.parameters)==null?void 0:y.docs)==null?void 0:h.source}}};var x,T,j;d.parameters={...d.parameters,docs:{...(x=d.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    items: demoItems,
    variant: 'card'
  }
}`,...(j=(T=d.parameters)==null?void 0:T.docs)==null?void 0:j.source}}};var w,z,I;o.parameters={...o.parameters,docs:{...(w=o.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    items: demoItems,
    variant: 'button'
  }
}`,...(I=(z=o.parameters)==null?void 0:z.docs)==null?void 0:I.source}}};var q,S,N;c.parameters={...c.parameters,docs:{...(q=c.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem'
  }}>\r
      <Tabs items={demoItems} variant="classic" size="sm" />\r
      <Tabs items={demoItems} variant="card" size="md" />\r
      <Tabs items={demoItems} variant="button" size="lg" />\r
    </div>
}`,...(N=(S=c.parameters)==null?void 0:S.docs)==null?void 0:N.source}}};var $,V,_;m.parameters={...m.parameters,docs:{...($=m.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    items: demoItems,
    variant: 'card',
    fullWidth: true
  }
}`,...(_=(V=m.parameters)==null?void 0:V.docs)==null?void 0:_.source}}};const L=["Classic","Card","Button","Sizes","FullWidth"];export{o as Button,d as Card,l as Classic,m as FullWidth,c as Sizes,L as __namedExportsOrder,K as default};
