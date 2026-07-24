import{j as e}from"./jsx-runtime-D_zvdyIk.js";function r({size:x="md",color:y="primary",label:i,className:f=""}){return e.jsxs("div",{className:`gy-spinner-container ${f}`,children:[e.jsx("span",{className:`gy-spinner gy-spinner--${x} gy-spinner--${y}`,role:"status","aria-label":i??"Loading...",children:e.jsx("span",{className:"gy-spinner__circle","aria-hidden":"true"})}),i&&e.jsx("span",{className:"gy-spinner__label",children:i})]})}r.__docgenInfo={description:"",methods:[],displayName:"Spinner",props:{size:{required:!1,tsType:{name:"union",raw:"'xs' | 'sm' | 'md' | 'lg' | 'xl'",elements:[{name:"literal",value:"'xs'"},{name:"literal",value:"'sm'"},{name:"literal",value:"'md'"},{name:"literal",value:"'lg'"},{name:"literal",value:"'xl'"}]},description:"",defaultValue:{value:"'md'",computed:!1}},color:{required:!1,tsType:{name:"union",raw:"'primary' | 'white' | 'neutral'",elements:[{name:"literal",value:"'primary'"},{name:"literal",value:"'white'"},{name:"literal",value:"'neutral'"}]},description:"",defaultValue:{value:"'primary'",computed:!1}},label:{required:!1,tsType:{name:"string"},description:""},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}}}};const v={title:"Components/Spinner",component:r,tags:["autodocs"]},a={args:{size:"md",color:"primary"}},s={args:{size:"md",color:"primary",label:"Loading workspace details..."}},n={render:()=>e.jsxs("div",{style:{display:"flex",gap:"1.5rem",alignItems:"center"},children:[e.jsx(r,{size:"xs"}),e.jsx(r,{size:"sm"}),e.jsx(r,{size:"md"}),e.jsx(r,{size:"lg"}),e.jsx(r,{size:"xl"})]})};var l,t,m;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    size: 'md',
    color: 'primary'
  }
}`,...(m=(t=a.parameters)==null?void 0:t.docs)==null?void 0:m.source}}};var o,p,d;s.parameters={...s.parameters,docs:{...(o=s.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {
    size: 'md',
    color: 'primary',
    label: 'Loading workspace details...'
  }
}`,...(d=(p=s.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};var c,u,g;n.parameters={...n.parameters,docs:{...(c=n.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center'
  }}>\r
      <Spinner size="xs" />\r
      <Spinner size="sm" />\r
      <Spinner size="md" />\r
      <Spinner size="lg" />\r
      <Spinner size="xl" />\r
    </div>
}`,...(g=(u=n.parameters)==null?void 0:u.docs)==null?void 0:g.source}}};const S=["Default","WithLabel","Sizes"];export{a as Default,n as Sizes,s as WithLabel,S as __namedExportsOrder,v as default};
