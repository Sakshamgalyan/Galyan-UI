import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as m}from"./index-CC0H-XIk.js";function l({options:a,name:n,value:o,defaultValue:O,onChange:f,size:C="md",orientation:I="vertical",label:t,helperText:b,hasError:g=!1,isDisabled:k=!1,isRequired:y=!1,className:F=""}){const H=m.useId(),L=n??H,h=o!==void 0,[M,Y]=m.useState(O),A=h?o:M;return e.jsxs("div",{role:"radiogroup","aria-label":typeof t=="string"?t:void 0,className:["gy-radio-group",`gy-radio-group--${C}`,g?"gy-radio-group--error":"",F].filter(Boolean).join(" "),children:[t&&e.jsx("div",{className:`gy-radio-group__label ${y?"gy-radio-group__label--required":""}`,children:t}),e.jsx("div",{className:`gy-radio-group__options ${I==="horizontal"?"gy-radio-group__options--horizontal":""}`,children:a.map(r=>{const v=A===r.value,x=k||r.disabled;return e.jsxs("label",{className:`gy-radio ${x?"gy-radio--disabled":""}`,children:[e.jsx("input",{type:"radio",name:L,value:r.value,checked:v,disabled:x,required:y,className:"gy-radio__input",onChange:()=>{h||Y(r.value),f==null||f(r.value)}}),e.jsx("span",{className:`gy-radio__circle ${v?"gy-radio__circle--checked":""} ${g?"gy-radio__circle--error":""}`,children:v&&e.jsx("span",{className:"gy-radio__dot"})}),e.jsx("span",{className:"gy-radio__label",children:r.label})]},r.value)})}),b&&e.jsx("div",{className:`gy-radio-group__helper ${g?"gy-radio-group__helper--error":""}`,children:b})]})}l.__docgenInfo={description:"",methods:[],displayName:"RadioGroup",props:{options:{required:!0,tsType:{name:"Array",elements:[{name:"RadioOption"}],raw:"RadioOption[]"},description:""},name:{required:!1,tsType:{name:"string"},description:""},value:{required:!1,tsType:{name:"string"},description:""},defaultValue:{required:!1,tsType:{name:"string"},description:""},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},size:{required:!1,tsType:{name:"union",raw:'"sm" | "md" | "lg"',elements:[{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'}]},description:"",defaultValue:{value:'"md"',computed:!1}},orientation:{required:!1,tsType:{name:"union",raw:'"horizontal" | "vertical"',elements:[{name:"literal",value:'"horizontal"'},{name:"literal",value:'"vertical"'}]},description:"",defaultValue:{value:'"vertical"',computed:!1}},label:{required:!1,tsType:{name:"string"},description:""},helperText:{required:!1,tsType:{name:"string"},description:""},hasError:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},isDisabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},isRequired:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}}}};const J={title:"Galyan UI/RadioGroup",component:l,parameters:{layout:"centered"},tags:["autodocs"],decorators:[a=>e.jsx("div",{style:{width:400},children:e.jsx(a,{})})],argTypes:{label:{control:"text"},size:{control:"inline-radio",options:["sm","md","lg"]},orientation:{control:"inline-radio",options:["vertical","horizontal"]},hasError:{control:"boolean"},isRequired:{control:"boolean"},isDisabled:{control:"boolean"},helperText:{control:"text"}}},s=[{value:"free",label:"Free Plan"},{value:"pro",label:"Pro Plan"},{value:"enterprise",label:"Enterprise Plan"}],i={args:{label:"Select a plan",size:"md",orientation:"vertical",helperText:"You can change this later",hasError:!1,isRequired:!1,isDisabled:!1},render:a=>{const[n,o]=m.useState("pro");return e.jsx(l,{...a,options:s,value:n,onChange:o})}},d={render:()=>{const[a,n]=m.useState("free");return e.jsx(l,{label:"Plan",options:s,value:a,onChange:n,orientation:"horizontal"})}},u={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"2rem"},children:[e.jsx(l,{label:"Small",options:s,size:"sm",defaultValue:"free"}),e.jsx(l,{label:"Medium",options:s,size:"md",defaultValue:"pro"}),e.jsx(l,{label:"Large",options:s,size:"lg",defaultValue:"enterprise"})]})},p={args:{label:"Required Selection",options:s,hasError:!0,helperText:"Please select a plan to continue",isRequired:!0}},c={args:{label:"Plan",options:[{value:"free",label:"Free Plan"},{value:"pro",label:"Pro Plan",disabled:!0},{value:"enterprise",label:"Enterprise Plan"}],defaultValue:"free"}};var _,V,q;i.parameters={...i.parameters,docs:{...(_=i.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    label: "Select a plan",
    size: "md",
    orientation: "vertical",
    helperText: "You can change this later",
    hasError: false,
    isRequired: false,
    isDisabled: false
  },
  render: args => {
    const [val, setVal] = useState("pro");
    return <RadioGroup {...args} options={options} value={val} onChange={setVal} />;
  }
}`,...(q=(V=i.parameters)==null?void 0:V.docs)==null?void 0:q.source}}};var z,j,S;d.parameters={...d.parameters,docs:{...(z=d.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => {
    const [val, setVal] = useState("free");
    return <RadioGroup label="Plan" options={options} value={val} onChange={setVal} orientation="horizontal" />;
  }
}`,...(S=(j=d.parameters)==null?void 0:j.docs)==null?void 0:S.source}}};var T,P,R;u.parameters={...u.parameters,docs:{...(T=u.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "2rem"
  }}>
      <RadioGroup label="Small" options={options} size="sm" defaultValue="free" />
      <RadioGroup label="Medium" options={options} size="md" defaultValue="pro" />
      <RadioGroup label="Large" options={options} size="lg" defaultValue="enterprise" />
    </div>
}`,...(R=(P=u.parameters)==null?void 0:P.docs)==null?void 0:R.source}}};var E,N,D;p.parameters={...p.parameters,docs:{...(E=p.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    label: "Required Selection",
    options,
    hasError: true,
    helperText: "Please select a plan to continue",
    isRequired: true
  }
}`,...(D=(N=p.parameters)==null?void 0:N.docs)==null?void 0:D.source}}};var G,$,w;c.parameters={...c.parameters,docs:{...(G=c.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    label: "Plan",
    options: [{
      value: "free",
      label: "Free Plan"
    }, {
      value: "pro",
      label: "Pro Plan",
      disabled: true
    }, {
      value: "enterprise",
      label: "Enterprise Plan"
    }],
    defaultValue: "free"
  }
}`,...(w=($=c.parameters)==null?void 0:$.docs)==null?void 0:w.source}}};const K=["Default","Horizontal","Sizes","ErrorState","DisabledOptions"];export{i as Default,c as DisabledOptions,p as ErrorState,d as Horizontal,u as Sizes,K as __namedExportsOrder,J as default};
