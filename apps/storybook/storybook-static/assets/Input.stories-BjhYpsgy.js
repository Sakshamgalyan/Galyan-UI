import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as Q}from"./index-CC0H-XIk.js";import{I as r}from"./Input-I8ziictD.js";const X=()=>e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("circle",{cx:"11",cy:"11",r:"8"}),e.jsx("line",{x1:"21",y1:"21",x2:"16.65",y2:"16.65"})]}),Z=()=>e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("rect",{x:"3",y:"11",width:"18",height:"11",rx:"2",ry:"2"}),e.jsx("path",{d:"M7 11V7a5 5 0 0 1 10 0v4"})]}),$=()=>e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"}),e.jsx("circle",{cx:"12",cy:"12",r:"3"})]}),Y=()=>e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),e.jsx("polyline",{points:"22,6 12,13 2,6"})]}),ee=()=>e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"#10b981",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14"}),e.jsx("polyline",{points:"22 4 12 14.01 9 11.01"})]}),se={title:"Galyan UI/Input",component:r,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{label:{control:"text",description:"Label text above the input"},placeholder:{control:"text",description:"Placeholder text"},helperText:{control:"text",description:"Helper text below the input"},size:{control:"radio",options:["sm","md","lg"],table:{type:{summary:"sm | md | lg"},defaultValue:{summary:"md"}}},variant:{control:"select",options:["default","filled","focused","error","success","disabled"],table:{type:{summary:"default | filled | focused | error | success | disabled"},defaultValue:{summary:"default"}}},type:{control:"text",description:"Input type (text, password, email, etc.)"},fullWidth:{control:"boolean"},required:{control:"boolean"},hasError:{control:"boolean"},hasSuccess:{control:"boolean"},isDisabled:{control:"boolean"},isFocused:{control:"boolean"},disableBorderEffects:{control:"boolean",description:"Disables the focus ring and border color change"},borderRadius:{control:"text",description:"Custom border radius CSS value"},clearable:{control:"boolean"}},decorators:[a=>e.jsx("div",{style:{width:400},children:e.jsx(a,{})})]},s={args:{label:"Username",placeholder:"Enter your username",helperText:"Must be unique across your organization"}},o={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1.5rem"},children:[e.jsx(r,{label:"Small",size:"sm",placeholder:"Small input"}),e.jsx(r,{label:"Medium (Default)",size:"md",placeholder:"Medium input"}),e.jsx(r,{label:"Large",size:"lg",placeholder:"Large input"})]})},t={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1.5rem"},children:[e.jsx(r,{label:"Default",variant:"default",placeholder:"Default variant"}),e.jsx(r,{label:"Filled",variant:"filled",placeholder:"Filled variant"}),e.jsx(r,{label:"Focused",variant:"focused",placeholder:"Always focused variant"}),e.jsx(r,{label:"Error",variant:"error",placeholder:"Error variant",helperText:"This field has an error"}),e.jsx(r,{label:"Success",variant:"success",placeholder:"Success variant",helperText:"Looks good!",hasSuccess:!0}),e.jsx(r,{label:"Disabled",variant:"disabled",placeholder:"Disabled variant"})]})},n={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1.5rem"},children:[e.jsx(r,{label:"Search",placeholder:"Search anything…",leftIcon:e.jsx(X,{})}),e.jsx(r,{label:"Email",placeholder:"you@example.com",type:"email",leftIcon:e.jsx(Y,{})}),e.jsx(r,{label:"Password",placeholder:"Enter password",type:"password",leftIcon:e.jsx(Z,{}),rightIcon:e.jsx($,{}),onRightIconClick:()=>alert("Toggle visibility!")})]})},i={args:{label:"Email Address",value:"invalid-email",hasError:!0,helperText:"Please enter a valid email address.",leftIcon:e.jsx(Y,{})}},c={args:{label:"Username",value:"available_user",hasSuccess:!0,helperText:"This username is available!",rightIcon:e.jsx(ee,{})}},d={render:()=>{const[a,l]=Q.useState("Type to search...");return e.jsx(r,{label:"Search",value:a,onChange:x=>l(x.target.value),clearable:!0,onClear:()=>l(""),leftIcon:e.jsx(X,{})})}},u={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1.5rem"},children:[e.jsx(r,{label:"Default Radius",placeholder:"Standard corners"}),e.jsx(r,{label:"Full Round",placeholder:"Pill shape",borderRadius:"9999px"}),e.jsx(r,{label:"Sharp Corners",placeholder:"No rounding",borderRadius:"0"}),e.jsx(r,{label:"Extra Round",placeholder:"1rem radius",borderRadius:"1rem"})]})},p={args:{label:"No Focus Ring",placeholder:"Click me — no ring effect",disableBorderEffects:!0,helperText:"Border effects are disabled on this input"}},h={args:{label:"Full Name",placeholder:"Enter your full name",required:!0,helperText:"This field is required"}},m={render:()=>{const[a,l]=Q.useState("");return e.jsx(r,{label:"Notes",variant:"filled",placeholder:"Start typing here…",value:a,onChange:x=>l(x.target.value),helperText:"This uses the filled style variant"})}};var b,f,g;s.parameters={...s.parameters,docs:{...(b=s.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
    helperText: 'Must be unique across your organization'
  }
}`,...(g=(f=s.parameters)==null?void 0:f.docs)==null?void 0:g.source}}};var v,y,j;o.parameters={...o.parameters,docs:{...(v=o.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  }}>\r
      <Input label="Small" size="sm" placeholder="Small input" />\r
      <Input label="Medium (Default)" size="md" placeholder="Medium input" />\r
      <Input label="Large" size="lg" placeholder="Large input" />\r
    </div>
}`,...(j=(y=o.parameters)==null?void 0:y.docs)==null?void 0:j.source}}};var I,S,E;t.parameters={...t.parameters,docs:{...(I=t.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  }}>\r
      <Input label="Default" variant="default" placeholder="Default variant" />\r
      <Input label="Filled" variant="filled" placeholder="Filled variant" />\r
      <Input label="Focused" variant="focused" placeholder="Always focused variant" />\r
      <Input label="Error" variant="error" placeholder="Error variant" helperText="This field has an error" />\r
      <Input label="Success" variant="success" placeholder="Success variant" helperText="Looks good!" hasSuccess />\r
      <Input label="Disabled" variant="disabled" placeholder="Disabled variant" />\r
    </div>
}`,...(E=(S=t.parameters)==null?void 0:S.docs)==null?void 0:E.source}}};var k,T,D;n.parameters={...n.parameters,docs:{...(k=n.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  }}>\r
      <Input label="Search" placeholder="Search anything…" leftIcon={<SearchIcon />} />\r
      <Input label="Email" placeholder="you@example.com" type="email" leftIcon={<MailIcon />} />\r
      <Input label="Password" placeholder="Enter password" type="password" leftIcon={<LockIcon />} rightIcon={<EyeIcon />} onRightIconClick={() => alert('Toggle visibility!')} />\r
    </div>
}`,...(D=(T=n.parameters)==null?void 0:T.docs)==null?void 0:D.source}}};var C,w,R;i.parameters={...i.parameters,docs:{...(C=i.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    label: 'Email Address',
    value: 'invalid-email',
    hasError: true,
    helperText: 'Please enter a valid email address.',
    leftIcon: <MailIcon />
  }
}`,...(R=(w=i.parameters)==null?void 0:w.docs)==null?void 0:R.source}}};var L,F,V;c.parameters={...c.parameters,docs:{...(L=c.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    label: 'Username',
    value: 'available_user',
    hasSuccess: true,
    helperText: 'This username is available!',
    rightIcon: <CheckCircleIcon />
  }
}`,...(V=(F=c.parameters)==null?void 0:F.docs)==null?void 0:V.source}}};var B,z,M;d.parameters={...d.parameters,docs:{...(B=d.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => {
    const [val, setVal] = useState('Type to search...');
    return <Input label="Search" value={val} onChange={e => setVal(e.target.value)} clearable onClear={() => setVal('')} leftIcon={<SearchIcon />} />;
  }
}`,...(M=(z=d.parameters)==null?void 0:z.docs)==null?void 0:M.source}}};var q,N,W;u.parameters={...u.parameters,docs:{...(q=u.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  }}>\r
      <Input label="Default Radius" placeholder="Standard corners" />\r
      <Input label="Full Round" placeholder="Pill shape" borderRadius="9999px" />\r
      <Input label="Sharp Corners" placeholder="No rounding" borderRadius="0" />\r
      <Input label="Extra Round" placeholder="1rem radius" borderRadius="1rem" />\r
    </div>
}`,...(W=(N=u.parameters)==null?void 0:N.docs)==null?void 0:W.source}}};var P,U,A;p.parameters={...p.parameters,docs:{...(P=p.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    label: 'No Focus Ring',
    placeholder: 'Click me — no ring effect',
    disableBorderEffects: true,
    helperText: 'Border effects are disabled on this input'
  }
}`,...(A=(U=p.parameters)==null?void 0:U.docs)==null?void 0:A.source}}};var _,H,G;h.parameters={...h.parameters,docs:{...(_=h.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    label: 'Full Name',
    placeholder: 'Enter your full name',
    required: true,
    helperText: 'This field is required'
  }
}`,...(G=(H=h.parameters)==null?void 0:H.docs)==null?void 0:G.source}}};var O,J,K;m.parameters={...m.parameters,docs:{...(O=m.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: () => {
    const [val, setVal] = useState('');
    return <Input label="Notes" variant="filled" placeholder="Start typing here…" value={val} onChange={e => setVal(e.target.value)} helperText="This uses the filled style variant" />;
  }
}`,...(K=(J=m.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};const oe=["Default","Sizes","Variants","WithIcons","ErrorState","SuccessState","ClearableDemo","CustomBorderRadius","DisabledBorderEffects","RequiredField","FilledVariant"];export{d as ClearableDemo,u as CustomBorderRadius,s as Default,p as DisabledBorderEffects,i as ErrorState,m as FilledVariant,h as RequiredField,o as Sizes,c as SuccessState,t as Variants,n as WithIcons,oe as __namedExportsOrder,se as default};
