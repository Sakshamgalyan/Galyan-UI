import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as g,R as B}from"./index-CC0H-XIk.js";const R=()=>e.jsx("svg",{width:"14",height:"11",viewBox:"0 0 14 11",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("polyline",{points:"1,5 5,9 13,1"})});function i({steps:n,activeStep:r,defaultStep:c=0,orientation:N="horizontal",size:T="md",onStepClick:u,onStepChange:v,onComplete:D,className:w=""}){var y;const[A,q]=g.useState(c),s=r??A,C=t=>{t<0||t>=n.length||(q(t),v==null||v(t),u==null||u(t))},$=t=>t<s?"completed":t===s?"active":"upcoming",V=["gy-stepper",`gy-stepper--${N}`,`gy-stepper--${T}`,w].filter(Boolean).join(" ");return e.jsxs("div",{className:V,children:[e.jsx("div",{className:"gy-stepper__track",children:n.map((t,a)=>{const l=$(a);return e.jsxs(B.Fragment,{children:[e.jsxs("div",{className:"gy-stepper__item",children:[e.jsx("button",{type:"button",className:["gy-stepper__indicator",`gy-stepper__indicator--${l}`].filter(Boolean).join(" "),onClick:()=>C(a),"aria-label":`Step ${a+1}: ${t.label}`,"aria-current":l==="active"?"step":void 0,children:l==="completed"?e.jsx(R,{}):t.icon?t.icon:a+1}),e.jsxs("div",{className:"gy-stepper__text",children:[e.jsx("div",{className:`gy-stepper__label gy-stepper__label--${l}`,children:t.label}),t.description&&e.jsx("div",{className:"gy-stepper__description",children:t.description}),t.optional&&!t.description&&e.jsx("div",{className:"gy-stepper__description",children:"Optional"})]})]}),a<n.length-1&&e.jsx("div",{className:`gy-stepper__connector ${a<s?"gy-stepper__connector--completed":""}`})]},t.id)})}),((y=n[s])==null?void 0:y.content)&&e.jsx("div",{className:"gy-stepper__panel",children:n[s].content},s)]})}i.__docgenInfo={description:"",methods:[],displayName:"Stepper",props:{steps:{required:!0,tsType:{name:"Array",elements:[{name:"Step"}],raw:"Step[]"},description:""},activeStep:{required:!1,tsType:{name:"number"},description:""},defaultStep:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},orientation:{required:!1,tsType:{name:"union",raw:'"horizontal" | "vertical"',elements:[{name:"literal",value:'"horizontal"'},{name:"literal",value:'"vertical"'}]},description:"",defaultValue:{value:'"horizontal"',computed:!1}},size:{required:!1,tsType:{name:"union",raw:'"sm" | "md" | "lg"',elements:[{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'}]},description:"",defaultValue:{value:'"md"',computed:!1}},onStepClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(index: number) => void",signature:{arguments:[{type:{name:"number"},name:"index"}],return:{name:"void"}}},description:""},onStepChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(index: number) => void",signature:{arguments:[{type:{name:"number"},name:"index"}],return:{name:"void"}}},description:""},onComplete:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}}}};const E={title:"Galyan UI/Stepper",component:i,parameters:{layout:"centered"},tags:["autodocs"],decorators:[n=>e.jsx("div",{style:{width:600},children:e.jsx(n,{})})],argTypes:{activeStep:{control:{type:"number",min:0,max:2}},orientation:{control:"inline-radio",options:["horizontal","vertical"]},size:{control:"inline-radio",options:["sm","md","lg"]}}},o=[{id:"account",label:"Account",description:"Create your account"},{id:"profile",label:"Profile",description:"Set up your profile"},{id:"review",label:"Review",description:"Review and submit"}],p={args:{activeStep:1,orientation:"horizontal",size:"md"},render:n=>{const[r,c]=g.useState(n.activeStep??1);return e.jsxs("div",{children:[e.jsx(i,{...n,steps:o,activeStep:r,onStepClick:c}),e.jsxs("div",{style:{display:"flex",gap:"0.5rem",marginTop:"1rem"},children:[e.jsx("button",{onClick:()=>c(Math.max(0,r-1)),children:"Back"}),e.jsx("button",{onClick:()=>c(Math.min(o.length-1,r+1)),children:"Next"})]})]})}},d={render:()=>{const[n,r]=g.useState(0);return e.jsx(i,{steps:o,activeStep:n,orientation:"vertical",onStepClick:r})}},m={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"2rem"},children:[e.jsx(i,{steps:o,activeStep:1,size:"sm"}),e.jsx(i,{steps:o,activeStep:1,size:"md"}),e.jsx(i,{steps:o,activeStep:1,size:"lg"})]})};var f,S,x;p.parameters={...p.parameters,docs:{...(f=p.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    activeStep: 1,
    orientation: "horizontal",
    size: "md"
  },
  render: args => {
    const [active, setActive] = useState(args.activeStep ?? 1);
    return <div>
        <Stepper {...args} steps={steps} activeStep={active} onStepClick={setActive} />
        <div style={{
        display: "flex",
        gap: "0.5rem",
        marginTop: "1rem"
      }}>
          <button onClick={() => setActive(Math.max(0, active - 1))}>
            Back
          </button>
          <button onClick={() => setActive(Math.min(steps.length - 1, active + 1))}>
            Next
          </button>
        </div>
      </div>;
  }
}`,...(x=(S=p.parameters)==null?void 0:S.docs)==null?void 0:x.source}}};var h,j,_;d.parameters={...d.parameters,docs:{...(h=d.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => {
    const [active, setActive] = useState(0);
    return <Stepper steps={steps} activeStep={active} orientation="vertical" onStepClick={setActive} />;
  }
}`,...(_=(j=d.parameters)==null?void 0:j.docs)==null?void 0:_.source}}};var b,z,k;m.parameters={...m.parameters,docs:{...(b=m.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "2rem"
  }}>
      <Stepper steps={steps} activeStep={1} size="sm" />
      <Stepper steps={steps} activeStep={1} size="md" />
      <Stepper steps={steps} activeStep={1} size="lg" />
    </div>
}`,...(k=(z=m.parameters)==null?void 0:z.docs)==null?void 0:k.source}}};const L=["Default","Vertical","Sizes"];export{p as Default,m as Sizes,d as Vertical,L as __namedExportsOrder,E as default};
