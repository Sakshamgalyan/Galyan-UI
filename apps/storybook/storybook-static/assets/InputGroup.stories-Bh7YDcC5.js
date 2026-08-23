import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as l}from"./index-CC0H-XIk.js";import{I as s}from"./Input-DxJFmKM0.js";import{B as Y}from"./Button-BeMeJT-5.js";import{D as R}from"./Dropdown-CmBfeP5y.js";import"./floating-ui.react-BUKrONLm.js";import"./index-DLSp3Bm_.js";import"./index-HBoXM-p9.js";import"./Checkbox-B-VyznxO.js";import"./Spinner-Cv7UGPGY.js";function i({leftAddon:r,rightAddon:t,size:a="md",fullWidth:n=!0,label:o,helperText:u,hasError:d=!1,disabled:p=!1,required:c=!1,children:w,className:x=""}){const C=["gy-input-group-wrapper",n?"gy-input-group-wrapper--full-width":"",x].filter(Boolean).join(" "),S=["gy-input-group",`gy-input-group--${a}`,n?"gy-input-group--full-width":"",r?"gy-input-group--has-left":"",t?"gy-input-group--has-right":"",d?"gy-input-group--error":"",p?"gy-input-group--disabled":""].filter(Boolean).join(" ");return e.jsxs("div",{className:C,children:[o&&e.jsx("label",{className:`gy-input-label ${c?"gy-input-label--required":""}`,children:o}),e.jsxs("div",{className:S,children:[r&&e.jsx("div",{className:"gy-input-group__addon gy-input-group__addon--left",children:r}),e.jsx("div",{className:"gy-input-group__control",children:w}),t&&e.jsx("div",{className:"gy-input-group__addon gy-input-group__addon--right",children:t})]}),u&&e.jsx("div",{className:`gy-input-helper ${d?"gy-input-helper--error":""}`,children:u})]})}function b({dropdown:r,dropdownPosition:t="left",leftAddon:a,rightAddon:n,size:o="md",fullWidth:u=!0,label:d,helperText:p,hasError:c=!1,disabled:w=!1,required:x=!1,children:C,className:S=""}){const Q=t==="left",K=t==="right",N=Q?e.jsx("div",{className:"gy-input-group__addon gy-input-group__addon--dropdown gy-input-group__addon--left",children:r}):a?e.jsx("div",{className:"gy-input-group__addon gy-input-group__addon--left",children:a}):null,j=K?e.jsx("div",{className:"gy-input-group__addon gy-input-group__addon--dropdown gy-input-group__addon--right",children:r}):n?e.jsx("div",{className:"gy-input-group__addon gy-input-group__addon--right",children:n}):null,O=["gy-input-group-wrapper",u?"gy-input-group-wrapper--full-width":"",S].filter(Boolean).join(" "),F=["gy-input-group",`gy-input-group--${o}`,u?"gy-input-group--full-width":"",N?"gy-input-group--has-left":"",j?"gy-input-group--has-right":"",c?"gy-input-group--error":"",w?"gy-input-group--disabled":""].filter(Boolean).join(" ");return e.jsxs("div",{className:O,children:[d&&e.jsx("label",{className:`gy-input-label ${x?"gy-input-label--required":""}`,children:d}),e.jsxs("div",{className:F,children:[N,e.jsx("div",{className:"gy-input-group__control",children:C}),j]}),p&&e.jsx("div",{className:`gy-input-helper ${c?"gy-input-helper--error":""}`,children:p})]})}i.__docgenInfo={description:"",methods:[],displayName:"InputGroup",props:{leftAddon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},rightAddon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},size:{required:!1,tsType:{name:"union",raw:'"sm" | "md" | "lg"',elements:[{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'}]},description:"",defaultValue:{value:'"md"',computed:!1}},fullWidth:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},label:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},helperText:{required:!1,tsType:{name:"string"},description:""},hasError:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},required:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}}}};b.__docgenInfo={description:"",methods:[],displayName:"DropdownGroup",props:{dropdown:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},dropdownPosition:{required:!1,tsType:{name:"union",raw:'"left" | "right"',elements:[{name:"literal",value:'"left"'},{name:"literal",value:'"right"'}]},description:"",defaultValue:{value:'"left"',computed:!1}},leftAddon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},rightAddon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},size:{defaultValue:{value:'"md"',computed:!1},required:!1},fullWidth:{defaultValue:{value:"true",computed:!1},required:!1},hasError:{defaultValue:{value:"false",computed:!1},required:!1},disabled:{defaultValue:{value:"false",computed:!1},required:!1},required:{defaultValue:{value:"false",computed:!1},required:!1},className:{defaultValue:{value:'""',computed:!1},required:!1}},composes:["Omit"]};const le={title:"Galyan UI/InputGroup",component:i,parameters:{layout:"centered",docs:{description:{component:"Combine input controls seamlessly with left/right text addons, buttons, or dropdown selects."}}},tags:["autodocs"],decorators:[r=>e.jsx("div",{style:{width:480,padding:"1rem"},children:e.jsx(r,{})})],argTypes:{size:{control:"select",options:["sm","md","lg"]},fullWidth:{control:"boolean"},leftAddon:{control:"text"},rightAddon:{control:"text"}}},m={args:{label:"Website Domain",size:"md",fullWidth:!0,leftAddon:"https://",rightAddon:".com",helperText:"Enter your custom subdomain"},render:r=>e.jsx(i,{...r,children:e.jsx(s,{placeholder:"my-domain"})})},g={render:()=>{const[r,t]=l.useState("+1"),[a,n]=l.useState("");return e.jsx(b,{label:"Phone Number",dropdownPosition:"left",dropdown:e.jsx(R,{options:[{value:"+1",label:"🇺🇸 +1"},{value:"+44",label:"🇬🇧 +44"},{value:"+91",label:"🇮🇳 +91"},{value:"+49",label:"🇩🇪 +49"}],value:r,onChange:t}),helperText:"Select your country calling code",children:e.jsx(s,{placeholder:"(555) 000-0000",value:a,onChange:o=>n(o.target.value)})})}},h={render:()=>{const[r,t]=l.useState("USD"),[a,n]=l.useState("1500");return e.jsx(b,{label:"Payment Amount",dropdownPosition:"right",leftAddon:"$",dropdown:e.jsx(R,{options:[{value:"USD",label:"USD"},{value:"EUR",label:"EUR"},{value:"GBP",label:"GBP"},{value:"JPY",label:"JPY"},{value:"INR",label:"INR"}],value:r,onChange:t}),helperText:"Enter transaction total and billing currency",children:e.jsx(s,{placeholder:"0.00",type:"number",value:a,onChange:o=>n(o.target.value)})})}},y={render:()=>{const[r,t]=l.useState("all"),[a,n]=l.useState("");return e.jsx(b,{label:"Search Knowledgebase",dropdownPosition:"left",rightAddon:e.jsx(Y,{size:"md",variant:"primary",onClick:()=>alert(`Searching: ${a}`),children:"Search"}),dropdown:e.jsx(R,{options:[{value:"all",label:"All Items"},{value:"docs",label:"Documentation"},{value:"components",label:"Components"},{value:"articles",label:"Articles"}],value:r,onChange:t}),children:e.jsx(s,{placeholder:"Search docs, APIs, tokens...",value:a,onChange:o=>n(o.target.value)})})}},f={args:{label:"Newsletter Subscription",size:"md",fullWidth:!0},render:r=>{const[t,a]=l.useState("");return e.jsx(i,{...r,rightAddon:e.jsx(Y,{variant:"primary",onClick:()=>alert(`Subscribed ${t}`),children:"Subscribe"}),children:e.jsx(s,{placeholder:"Enter your email address",value:t,onChange:n=>a(n.target.value)})})}},v={render:()=>e.jsx(i,{label:"Repository URL",leftAddon:"git@github.com:",rightAddon:".git",hasError:!0,required:!0,helperText:"Repository name cannot contain special characters",children:e.jsx(s,{placeholder:"username/repo",hasError:!0})})};var _,q,D;m.parameters={...m.parameters,docs:{...(_=m.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    label: "Website Domain",
    size: "md",
    fullWidth: true,
    leftAddon: "https://",
    rightAddon: ".com",
    helperText: "Enter your custom subdomain"
  },
  render: args => <InputGroup {...args}>\r
      <Input placeholder="my-domain" />\r
    </InputGroup>
}`,...(D=(q=m.parameters)==null?void 0:q.docs)==null?void 0:D.source}}};var A,G,I;g.parameters={...g.parameters,docs:{...(A=g.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => {
    const [countryCode, setCountryCode] = useState("+1");
    const [phone, setPhone] = useState("");
    return <DropdownGroup label="Phone Number" dropdownPosition="left" dropdown={<Dropdown options={[{
      value: "+1",
      label: "🇺🇸 +1"
    }, {
      value: "+44",
      label: "🇬🇧 +44"
    }, {
      value: "+91",
      label: "🇮🇳 +91"
    }, {
      value: "+49",
      label: "🇩🇪 +49"
    }]} value={countryCode} onChange={setCountryCode} />} helperText="Select your country calling code">\r
        <Input placeholder="(555) 000-0000" value={phone} onChange={e => setPhone(e.target.value)} />\r
      </DropdownGroup>;
  }
}`,...(I=(G=g.parameters)==null?void 0:G.docs)==null?void 0:I.source}}};var P,T,E;h.parameters={...h.parameters,docs:{...(P=h.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => {
    const [currency, setCurrency] = useState("USD");
    const [amount, setAmount] = useState("1500");
    return <DropdownGroup label="Payment Amount" dropdownPosition="right" leftAddon="$" dropdown={<Dropdown options={[{
      value: "USD",
      label: "USD"
    }, {
      value: "EUR",
      label: "EUR"
    }, {
      value: "GBP",
      label: "GBP"
    }, {
      value: "JPY",
      label: "JPY"
    }, {
      value: "INR",
      label: "INR"
    }]} value={currency} onChange={setCurrency} />} helperText="Enter transaction total and billing currency">\r
        <Input placeholder="0.00" type="number" value={amount} onChange={e => setAmount(e.target.value)} />\r
      </DropdownGroup>;
  }
}`,...(E=(T=h.parameters)==null?void 0:T.docs)==null?void 0:E.source}}};var B,U,V;y.parameters={...y.parameters,docs:{...(B=y.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => {
    const [category, setCategory] = useState("all");
    const [query, setQuery] = useState("");
    return <DropdownGroup label="Search Knowledgebase" dropdownPosition="left" rightAddon={<Button size="md" variant="primary" onClick={() => alert(\`Searching: \${query}\`)}>\r
            Search\r
          </Button>} dropdown={<Dropdown options={[{
      value: "all",
      label: "All Items"
    }, {
      value: "docs",
      label: "Documentation"
    }, {
      value: "components",
      label: "Components"
    }, {
      value: "articles",
      label: "Articles"
    }]} value={category} onChange={setCategory} />}>\r
        <Input placeholder="Search docs, APIs, tokens..." value={query} onChange={e => setQuery(e.target.value)} />\r
      </DropdownGroup>;
  }
}`,...(V=(U=y.parameters)==null?void 0:U.docs)==null?void 0:V.source}}};var $,z,W;f.parameters={...f.parameters,docs:{...($=f.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    label: "Newsletter Subscription",
    size: "md",
    fullWidth: true
  },
  render: args => {
    const [email, setEmail] = useState("");
    return <InputGroup {...args} rightAddon={<Button variant="primary" onClick={() => alert(\`Subscribed \${email}\`)}>\r
            Subscribe\r
          </Button>}>\r
        <Input placeholder="Enter your email address" value={email} onChange={e => setEmail(e.target.value)} />\r
      </InputGroup>;
  }
}`,...(W=(z=f.parameters)==null?void 0:z.docs)==null?void 0:W.source}}};var k,J,L;v.parameters={...v.parameters,docs:{...(k=v.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => <InputGroup label="Repository URL" leftAddon="git@github.com:" rightAddon=".git" hasError required helperText="Repository name cannot contain special characters">\r
      <Input placeholder="username/repo" hasError />\r
    </InputGroup>
}`,...(L=(J=v.parameters)==null?void 0:J.docs)==null?void 0:L.source}}};const se=["Default","PhoneCodeDropdownGroup","CurrencyAmountDropdownGroup","SearchCategoryDropdownGroup","WithButtonAddon","ErrorState"];export{h as CurrencyAmountDropdownGroup,m as Default,v as ErrorState,g as PhoneCodeDropdownGroup,y as SearchCategoryDropdownGroup,f as WithButtonAddon,se as __namedExportsOrder,le as default};
