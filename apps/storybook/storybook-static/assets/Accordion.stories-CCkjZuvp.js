import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as h}from"./index-CC0H-XIk.js";const v=()=>e.jsx("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("polyline",{points:"4,6 8,10 12,6"})});function r({size:n="md",variant:l="default",disabled:o=!1,defaultExpanded:S=!1,expanded:c,onChange:u,unmountOnExit:m=!1,expandIconPosition:i="right",title:q,children:w,items:p,className:f=""}){var y;const[T,k]=h.useState(S),a=c!==void 0?c:T,E=()=>{if(o)return;const t=!a;c===void 0&&k(t),u==null||u(t)},g=h.useRef(null),G=a?((y=g.current)==null?void 0:y.scrollHeight)??"auto":0,I=["gy-accordion",`gy-accordion--${n}`,`gy-accordion--${l}`,o?"gy-accordion--disabled":"",a?"gy-accordion--expanded":"",f].filter(Boolean).join(" ");return p&&p.length>0?e.jsx("div",{className:`gy-accordion-group gy-accordion-group--${l} ${f}`,children:p.map(t=>e.jsx(r,{size:n,variant:l,disabled:o||t.disabled,expandIconPosition:i,title:t.title,unmountOnExit:m,children:t.content},t.id))}):e.jsxs("div",{className:I,children:[e.jsxs("button",{type:"button",className:`gy-accordion__trigger gy-accordion__trigger--icon-${i}`,onClick:E,disabled:o,"aria-expanded":a,children:[i==="left"&&e.jsx("span",{className:`gy-accordion__icon ${a?"gy-accordion__icon--open":""}`,children:e.jsx(v,{})}),e.jsx("span",{className:"gy-accordion__title",children:q}),i==="right"&&e.jsx("span",{className:`gy-accordion__icon ${a?"gy-accordion__icon--open":""}`,children:e.jsx(v,{})})]}),(!m||a)&&e.jsx("div",{className:"gy-accordion__panel",style:{height:G,transition:"height 250ms cubic-bezier(0.4, 0, 0.2, 1)",overflow:"hidden"},children:e.jsx("div",{ref:g,className:"gy-accordion__content",children:w})})]})}r.__docgenInfo={description:"",methods:[],displayName:"Accordion",props:{size:{required:!1,tsType:{name:"union",raw:'"sm" | "md" | "lg"',elements:[{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'}]},description:"",defaultValue:{value:'"md"',computed:!1}},variant:{required:!1,tsType:{name:"union",raw:'"default" | "bordered" | "flush" | "separated"',elements:[{name:"literal",value:'"default"'},{name:"literal",value:'"bordered"'},{name:"literal",value:'"flush"'},{name:"literal",value:'"separated"'}]},description:"",defaultValue:{value:'"default"',computed:!1}},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},defaultExpanded:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},expanded:{required:!1,tsType:{name:"boolean"},description:""},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(expanded: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"expanded"}],return:{name:"void"}}},description:""},unmountOnExit:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},expandIconPosition:{required:!1,tsType:{name:"union",raw:'"left" | "right"',elements:[{name:"literal",value:'"left"'},{name:"literal",value:'"right"'}]},description:"",defaultValue:{value:'"right"',computed:!1}},title:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}},items:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{\r
  id: string;\r
  title: React.ReactNode;\r
  content: React.ReactNode;\r
  disabled?: boolean;\r
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"title",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!0}},{key:"content",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!0}},{key:"disabled",value:{name:"boolean",required:!1}}]}}],raw:`{\r
  id: string;\r
  title: React.ReactNode;\r
  content: React.ReactNode;\r
  disabled?: boolean;\r
}[]`},description:""}}};const C={title:"Galyan UI/Accordion",component:r,parameters:{layout:"centered",docs:{description:{component:"Collapsible panels for presenting hierarchical or grouped information."}}},tags:["autodocs"],decorators:[n=>e.jsx("div",{style:{width:550},children:e.jsx(n,{})})],argTypes:{size:{control:"select",options:["sm","md","lg"]},variant:{control:"select",options:["default","bordered","flush","separated"]},disabled:{control:"boolean"},defaultExpanded:{control:"boolean"},expanded:{control:"boolean"},unmountOnExit:{control:"boolean"},expandIconPosition:{control:"inline-radio",options:["left","right"]},title:{control:"text"},className:{control:"text"}}},d={args:{title:"What is Galyan UI?",children:"Galyan UI is a modern, accessible React component library built with design tokens and high-performance CSS.",defaultExpanded:!0,size:"md",variant:"default",expandIconPosition:"right"}},s={render:n=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"2rem"},children:[e.jsxs("div",{children:[e.jsx("h4",{style:{margin:"0 0 0.5rem"},children:"Bordered Group"}),e.jsx(r,{...n,variant:"bordered",items:[{id:"1",title:"First Section",content:"Content for the first section in a bordered group."},{id:"2",title:"Second Section",content:"Content for the second section in a bordered group."}]})]}),e.jsxs("div",{children:[e.jsx("h4",{style:{margin:"0 0 0.5rem"},children:"Separated Group"}),e.jsx(r,{...n,variant:"separated",items:[{id:"1",title:"Payment Method",content:"Manage your credit card and payment details here."},{id:"2",title:"Billing Address",content:"Set your primary billing and invoice address."}]})]})]})};var x,b,R;d.parameters={...d.parameters,docs:{...(x=d.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    title: "What is Galyan UI?",
    children: "Galyan UI is a modern, accessible React component library built with design tokens and high-performance CSS.",
    defaultExpanded: true,
    size: "md",
    variant: "default",
    expandIconPosition: "right"
  }
}`,...(R=(b=d.parameters)==null?void 0:b.docs)==null?void 0:R.source}}};var j,N,_;s.parameters={...s.parameters,docs:{...(j=s.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: args => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "2rem"
  }}>\r
      <div>\r
        <h4 style={{
        margin: "0 0 0.5rem"
      }}>Bordered Group</h4>\r
        <Accordion {...args} variant="bordered" items={[{
        id: "1",
        title: "First Section",
        content: "Content for the first section in a bordered group."
      }, {
        id: "2",
        title: "Second Section",
        content: "Content for the second section in a bordered group."
      }]} />\r
      </div>\r
\r
      <div>\r
        <h4 style={{
        margin: "0 0 0.5rem"
      }}>Separated Group</h4>\r
        <Accordion {...args} variant="separated" items={[{
        id: "1",
        title: "Payment Method",
        content: "Manage your credit card and payment details here."
      }, {
        id: "2",
        title: "Billing Address",
        content: "Set your primary billing and invoice address."
      }]} />\r
      </div>\r
    </div>
}`,...(_=(N=s.parameters)==null?void 0:N.docs)==null?void 0:_.source}}};const $=["Default","Variants"];export{d as Default,s as Variants,$ as __namedExportsOrder,C as default};
