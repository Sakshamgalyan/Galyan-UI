import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as d,R as $}from"./index-CC0H-XIk.js";import{B as c}from"./Button-BeMeJT-5.js";const U=()=>e.jsx("svg",{width:"14",height:"11",viewBox:"0 0 14 11",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("polyline",{points:"1,5 5,9 13,1"})});function s({steps:t,activeStep:r,defaultStep:i=0,orientation:P="horizontal",size:D="md",onStepClick:h,onStepChange:x,onComplete:J,className:L=""}){var f;const[T,q]=d.useState(i),o=r??T,V=n=>{n<0||n>=t.length||(q(n),x==null||x(n),h==null||h(n))},E=n=>n<o?"completed":n===o?"active":"upcoming",F=["gy-stepper",`gy-stepper--${P}`,`gy-stepper--${D}`,L].filter(Boolean).join(" ");return e.jsxs("div",{className:F,children:[e.jsx("div",{className:"gy-stepper__track",children:t.map((n,l)=>{const p=E(l);return e.jsxs($.Fragment,{children:[e.jsxs("div",{className:"gy-stepper__item",children:[e.jsx("button",{type:"button",className:["gy-stepper__indicator",`gy-stepper__indicator--${p}`].filter(Boolean).join(" "),onClick:()=>V(l),"aria-label":`Step ${l+1}: ${n.label}`,"aria-current":p==="active"?"step":void 0,children:p==="completed"?e.jsx(U,{}):n.icon?n.icon:l+1}),e.jsxs("div",{className:"gy-stepper__text",children:[e.jsx("div",{className:`gy-stepper__label gy-stepper__label--${p}`,children:n.label}),n.description&&e.jsx("div",{className:"gy-stepper__description",children:n.description}),n.optional&&!n.description&&e.jsx("div",{className:"gy-stepper__description",children:"Optional"})]})]}),l<t.length-1&&e.jsx("div",{className:`gy-stepper__connector ${l<o?"gy-stepper__connector--completed":""}`})]},n.id)})}),((f=t[o])==null?void 0:f.content)&&e.jsx("div",{className:"gy-stepper__panel",children:t[o].content},o)]})}s.__docgenInfo={description:"",methods:[],displayName:"Stepper",props:{steps:{required:!0,tsType:{name:"Array",elements:[{name:"Step"}],raw:"Step[]"},description:""},activeStep:{required:!1,tsType:{name:"number"},description:""},defaultStep:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},orientation:{required:!1,tsType:{name:"union",raw:'"horizontal" | "vertical"',elements:[{name:"literal",value:'"horizontal"'},{name:"literal",value:'"vertical"'}]},description:"",defaultValue:{value:'"horizontal"',computed:!1}},size:{required:!1,tsType:{name:"union",raw:'"sm" | "md" | "lg"',elements:[{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'}]},description:"",defaultValue:{value:'"md"',computed:!1}},onStepClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(index: number) => void",signature:{arguments:[{type:{name:"number"},name:"index"}],return:{name:"void"}}},description:""},onStepChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(index: number) => void",signature:{arguments:[{type:{name:"number"},name:"index"}],return:{name:"void"}}},description:""},onComplete:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}}}};const O=()=>e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"}),e.jsx("circle",{cx:"12",cy:"7",r:"4"})]}),G=()=>e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("rect",{x:"1",y:"4",width:"22",height:"16",rx:"2",ry:"2"}),e.jsx("line",{x1:"1",y1:"10",x2:"23",y2:"10"})]}),H=()=>e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"}),e.jsx("polyline",{points:"9 12 11 14 15 10"})]}),Y={title:"Galyan UI/Stepper",component:s,parameters:{layout:"centered"},tags:["autodocs"],decorators:[t=>e.jsx("div",{style:{width:700,padding:"1rem"},children:e.jsx(t,{})})],argTypes:{activeStep:{control:{type:"number",min:0,max:2}},orientation:{control:"inline-radio",options:["horizontal","vertical"]},size:{control:"inline-radio",options:["sm","md","lg"]}}},a=[{id:"account",label:"Account",description:"Create your account"},{id:"profile",label:"Profile",description:"Set up your profile"},{id:"review",label:"Review",description:"Review and submit"}],m={args:{activeStep:1,orientation:"horizontal",size:"md"},render:t=>{const[r,i]=d.useState(t.activeStep??1);return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1.5rem"},children:[e.jsx(s,{...t,steps:a,activeStep:r,onStepClick:i}),e.jsxs("div",{style:{display:"flex",gap:"0.75rem"},children:[e.jsx(c,{size:"sm",variant:"secondary",disabled:r===0,onClick:()=>i(Math.max(0,r-1)),children:"Back"}),e.jsx(c,{size:"sm",variant:"primary",disabled:r===a.length-1,onClick:()=>i(Math.min(a.length-1,r+1)),children:"Next Step"})]})]})}},u={render:()=>{const[t,r]=d.useState(1),i=[{id:"user",label:"Personal Info",description:"Name & email",icon:e.jsx(O,{})},{id:"billing",label:"Billing Method",description:"Credit card / PayPal",icon:e.jsx(G,{})},{id:"security",label:"2FA Verification",description:"Secure your account",icon:e.jsx(H,{})}];return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1.5rem"},children:[e.jsx(s,{steps:i,activeStep:t,onStepClick:r}),e.jsxs("div",{style:{display:"flex",gap:"0.75rem"},children:[e.jsx(c,{size:"sm",variant:"secondary",disabled:t===0,onClick:()=>r(Math.max(0,t-1)),children:"Previous"}),e.jsx(c,{size:"sm",variant:"primary",disabled:t===i.length-1,onClick:()=>r(Math.min(i.length-1,t+1)),children:"Continue"})]})]})}},v={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"2.5rem"},children:[e.jsxs("div",{children:[e.jsx("span",{style:{fontSize:"0.75rem",fontWeight:600,color:"var(--gy-text-subtle)",display:"block",marginBottom:"0.75rem"},children:"Small (sm)"}),e.jsx(s,{steps:a,activeStep:1,size:"sm"})]}),e.jsxs("div",{children:[e.jsx("span",{style:{fontSize:"0.75rem",fontWeight:600,color:"var(--gy-text-subtle)",display:"block",marginBottom:"0.75rem"},children:"Medium (md Default)"}),e.jsx(s,{steps:a,activeStep:1,size:"md"})]}),e.jsxs("div",{children:[e.jsx("span",{style:{fontSize:"0.75rem",fontWeight:600,color:"var(--gy-text-subtle)",display:"block",marginBottom:"0.75rem"},children:"Large (lg)"}),e.jsx(s,{steps:a,activeStep:1,size:"lg"})]})]})},g={render:()=>{const[t,r]=d.useState(1);return e.jsx("div",{style:{maxWidth:360},children:e.jsx(s,{steps:a,activeStep:t,orientation:"vertical",onStepClick:r})})}},y={render:()=>{const[t,r]=d.useState(0),i=[{id:"account",label:"Account Details",description:"Email & Password",content:e.jsxs("div",{style:{padding:"1.25rem",background:"var(--gy-surface-raised, rgba(255,255,255,0.05))",borderRadius:"0.5rem",border:"1px solid var(--gy-border)"},children:[e.jsx("h4",{style:{margin:"0 0 0.5rem",color:"var(--gy-text)"},children:"Step 1: Account Credentials"}),e.jsx("p",{style:{margin:0,color:"var(--gy-text-muted)",fontSize:"0.875rem"},children:"Fill in your personal email and choose a secure password."})]})},{id:"profile",label:"Profile Information",description:"Company & Role",content:e.jsxs("div",{style:{padding:"1.25rem",background:"var(--gy-surface-raised, rgba(255,255,255,0.05))",borderRadius:"0.5rem",border:"1px solid var(--gy-border)"},children:[e.jsx("h4",{style:{margin:"0 0 0.5rem",color:"var(--gy-text)"},children:"Step 2: Profile Setup"}),e.jsx("p",{style:{margin:0,color:"var(--gy-text-muted)",fontSize:"0.875rem"},children:"Set your organization name, profile photo, and job title."})]})},{id:"review",label:"Confirm & Launch",description:"Final Review",content:e.jsxs("div",{style:{padding:"1.25rem",background:"var(--gy-surface-raised, rgba(255,255,255,0.05))",borderRadius:"0.5rem",border:"1px solid var(--gy-border)"},children:[e.jsx("h4",{style:{margin:"0 0 0.5rem",color:"var(--gy-text)"},children:"Step 3: Ready to Launch"}),e.jsx("p",{style:{margin:0,color:"var(--gy-text-muted)",fontSize:"0.875rem"},children:"Everything looks great! Click Complete to activate your workspace."})]})}];return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1.5rem"},children:[e.jsx(s,{steps:i,activeStep:t,onStepClick:r}),e.jsxs("div",{style:{display:"flex",gap:"0.75rem"},children:[e.jsx(c,{size:"sm",variant:"secondary",disabled:t===0,onClick:()=>r(Math.max(0,t-1)),children:"Back"}),e.jsx(c,{size:"sm",variant:"primary",onClick:()=>{t<i.length-1?r(t+1):alert("Workflow Completed!")},children:t===i.length-1?"Complete":"Continue"})]})]})}};var S,b,j;m.parameters={...m.parameters,docs:{...(S=m.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    activeStep: 1,
    orientation: "horizontal",
    size: "md"
  },
  render: args => {
    const [active, setActive] = useState(args.activeStep ?? 1);
    return <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem"
    }}>\r
        <Stepper {...args} steps={steps} activeStep={active} onStepClick={setActive} />\r
        <div style={{
        display: "flex",
        gap: "0.75rem"
      }}>\r
          <Button size="sm" variant="secondary" disabled={active === 0} onClick={() => setActive(Math.max(0, active - 1))}>\r
            Back\r
          </Button>\r
          <Button size="sm" variant="primary" disabled={active === steps.length - 1} onClick={() => setActive(Math.min(steps.length - 1, active + 1))}>\r
            Next Step\r
          </Button>\r
        </div>\r
      </div>;
  }
}`,...(j=(b=m.parameters)==null?void 0:b.docs)==null?void 0:j.source}}};var k,C,z;u.parameters={...u.parameters,docs:{...(k=u.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => {
    const [active, setActive] = useState(1);
    const iconSteps = [{
      id: "user",
      label: "Personal Info",
      description: "Name & email",
      icon: <UserIcon />
    }, {
      id: "billing",
      label: "Billing Method",
      description: "Credit card / PayPal",
      icon: <CreditCardIcon />
    }, {
      id: "security",
      label: "2FA Verification",
      description: "Secure your account",
      icon: <ShieldCheckIcon />
    }];
    return <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem"
    }}>\r
        <Stepper steps={iconSteps} activeStep={active} onStepClick={setActive} />\r
        <div style={{
        display: "flex",
        gap: "0.75rem"
      }}>\r
          <Button size="sm" variant="secondary" disabled={active === 0} onClick={() => setActive(Math.max(0, active - 1))}>\r
            Previous\r
          </Button>\r
          <Button size="sm" variant="primary" disabled={active === iconSteps.length - 1} onClick={() => setActive(Math.min(iconSteps.length - 1, active + 1))}>\r
            Continue\r
          </Button>\r
        </div>\r
      </div>;
  }
}`,...(z=(C=u.parameters)==null?void 0:C.docs)==null?void 0:z.source}}};var B,w,_;v.parameters={...v.parameters,docs:{...(B=v.parameters)==null?void 0:B.docs,source:{originalSource:`{
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
        marginBottom: "0.75rem"
      }}>\r
          Small (sm)\r
        </span>\r
        <Stepper steps={steps} activeStep={1} size="sm" />\r
      </div>\r
      <div>\r
        <span style={{
        fontSize: "0.75rem",
        fontWeight: 600,
        color: "var(--gy-text-subtle)",
        display: "block",
        marginBottom: "0.75rem"
      }}>\r
          Medium (md Default)\r
        </span>\r
        <Stepper steps={steps} activeStep={1} size="md" />\r
      </div>\r
      <div>\r
        <span style={{
        fontSize: "0.75rem",
        fontWeight: 600,
        color: "var(--gy-text-subtle)",
        display: "block",
        marginBottom: "0.75rem"
      }}>\r
          Large (lg)\r
        </span>\r
        <Stepper steps={steps} activeStep={1} size="lg" />\r
      </div>\r
    </div>
}`,...(_=(w=v.parameters)==null?void 0:w.docs)==null?void 0:_.source}}};var A,W,R;g.parameters={...g.parameters,docs:{...(A=g.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => {
    const [active, setActive] = useState(1);
    return <div style={{
      maxWidth: 360
    }}>\r
        <Stepper steps={steps} activeStep={active} orientation="vertical" onStepClick={setActive} />\r
      </div>;
  }
}`,...(R=(W=g.parameters)==null?void 0:W.docs)==null?void 0:R.source}}};var I,M,N;y.parameters={...y.parameters,docs:{...(I=y.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => {
    const [active, setActive] = useState(0);
    const contentSteps = [{
      id: "account",
      label: "Account Details",
      description: "Email & Password",
      content: <div style={{
        padding: "1.25rem",
        background: "var(--gy-surface-raised, rgba(255,255,255,0.05))",
        borderRadius: "0.5rem",
        border: "1px solid var(--gy-border)"
      }}>\r
            <h4 style={{
          margin: "0 0 0.5rem",
          color: "var(--gy-text)"
        }}>Step 1: Account Credentials</h4>\r
            <p style={{
          margin: 0,
          color: "var(--gy-text-muted)",
          fontSize: "0.875rem"
        }}>Fill in your personal email and choose a secure password.</p>\r
          </div>
    }, {
      id: "profile",
      label: "Profile Information",
      description: "Company & Role",
      content: <div style={{
        padding: "1.25rem",
        background: "var(--gy-surface-raised, rgba(255,255,255,0.05))",
        borderRadius: "0.5rem",
        border: "1px solid var(--gy-border)"
      }}>\r
            <h4 style={{
          margin: "0 0 0.5rem",
          color: "var(--gy-text)"
        }}>Step 2: Profile Setup</h4>\r
            <p style={{
          margin: 0,
          color: "var(--gy-text-muted)",
          fontSize: "0.875rem"
        }}>Set your organization name, profile photo, and job title.</p>\r
          </div>
    }, {
      id: "review",
      label: "Confirm & Launch",
      description: "Final Review",
      content: <div style={{
        padding: "1.25rem",
        background: "var(--gy-surface-raised, rgba(255,255,255,0.05))",
        borderRadius: "0.5rem",
        border: "1px solid var(--gy-border)"
      }}>\r
            <h4 style={{
          margin: "0 0 0.5rem",
          color: "var(--gy-text)"
        }}>Step 3: Ready to Launch</h4>\r
            <p style={{
          margin: 0,
          color: "var(--gy-text-muted)",
          fontSize: "0.875rem"
        }}>Everything looks great! Click Complete to activate your workspace.</p>\r
          </div>
    }];
    return <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem"
    }}>\r
        <Stepper steps={contentSteps} activeStep={active} onStepClick={setActive} />\r
        <div style={{
        display: "flex",
        gap: "0.75rem"
      }}>\r
          <Button size="sm" variant="secondary" disabled={active === 0} onClick={() => setActive(Math.max(0, active - 1))}>\r
            Back\r
          </Button>\r
          <Button size="sm" variant="primary" onClick={() => {
          if (active < contentSteps.length - 1) setActive(active + 1);else alert("Workflow Completed!");
        }}>\r
            {active === contentSteps.length - 1 ? "Complete" : "Continue"}\r
          </Button>\r
        </div>\r
      </div>;
  }
}`,...(N=(M=y.parameters)==null?void 0:M.docs)==null?void 0:N.source}}};const Z=["Default","WithCustomIcons","Sizes","Vertical","WithStepContent"];export{m as Default,v as Sizes,g as Vertical,u as WithCustomIcons,y as WithStepContent,Z as __namedExportsOrder,Y as default};
