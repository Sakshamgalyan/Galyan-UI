import{j as a}from"./jsx-runtime-D_zvdyIk.js";import{r as t}from"./index-CC0H-XIk.js";import{D as n}from"./Dropdown-CmBfeP5y.js";import{B as M}from"./Button-BeMeJT-5.js";import"./floating-ui.react-BUKrONLm.js";import"./index-DLSp3Bm_.js";import"./index-HBoXM-p9.js";import"./Checkbox-B-VyznxO.js";import"./Spinner-Cv7UGPGY.js";const Z={title:"Galyan UI/Dropdown",component:n,parameters:{layout:"centered",docs:{description:{component:"Feature-rich select dropdown supporting search, multi-selection, select-all, grouping, async loading states, custom option rendering, and portal popovers."}}},tags:["autodocs"],decorators:[e=>a.jsx("div",{style:{width:380,minHeight:340,padding:"1rem"},children:a.jsx(e,{})})],argTypes:{size:{control:"select",options:["sm","md","lg"]},label:{control:"text"},placeholder:{control:"text"},helperText:{control:"text"},error:{control:"text"},disabled:{control:"boolean"},required:{control:"boolean"},multiple:{control:"boolean"},searchable:{control:"boolean"},searchPlaceholder:{control:"text"},clearable:{control:"boolean"},loading:{control:"boolean"},hasError:{control:"boolean"},hasSuccess:{control:"boolean"},showSelectAll:{control:"boolean"},maxTagCount:{control:"number"},placement:{control:"inline-radio",options:["top","bottom"]},align:{control:"inline-radio",options:["left","right"]},dropdownWidth:{control:"text"}}},l=[{value:"react",label:"React.js",group:"Frontend"},{value:"vue",label:"Vue.js",group:"Frontend"},{value:"angular",label:"Angular",group:"Frontend"},{value:"node",label:"Node.js",group:"Backend"},{value:"python",label:"Python (FastAPI)",group:"Backend"},{value:"go",label:"Go (Golang)",group:"Backend"}],s={args:{label:"Select Tech Stack",placeholder:"Select an option",options:l,size:"md",clearable:!0,searchable:!1,disabled:!1,required:!1,multiple:!1},render:e=>{const[r,o]=t.useState("react");return a.jsx(n,{...e,value:r,onChange:o})}},i={render:()=>{const[e,r]=t.useState(!0),[o,h]=t.useState("");return a.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"},children:[a.jsx("div",{style:{display:"flex",gap:"0.5rem",alignItems:"center"},children:a.jsxs(M,{size:"sm",variant:"secondary",onClick:()=>r(v=>!v),children:["Toggle Loading State (",e?"Loading ON":"Loading OFF",")"]})}),a.jsx(n,{label:"Server Repositories (Async)",loading:e,placeholder:e?"Fetching data from API...":"Choose repository",options:e?[]:l,value:o,onChange:h,helperText:e?"Loading spinner active with wait cursor":"Data resolved successfully"})]})}},c={args:{label:"Select Frameworks",options:l,multiple:!0,showSelectAll:!0,searchable:!0,clearable:!0},render:e=>{const[r,o]=t.useState(["react","node"]);return a.jsx(n,{...e,value:r,onChange:o})}},u={args:{label:"Selected Technologies (Click × on tag to remove)",options:l,multiple:!0,clearable:!0,maxTagCount:3},render:e=>{const[r,o]=t.useState(["react","vue","node","python"]);return a.jsx(n,{...e,value:r,onChange:o})}},d={render:()=>{const[e,r]=t.useState("us"),o=[{value:"us",label:"🇺🇸 United States (USD)",group:"Americas"},{value:"ca",label:"🇨🇦 Canada (CAD)",group:"Americas"},{value:"uk",label:"🇬🇧 United Kingdom (GBP)",group:"Europe"},{value:"de",label:"🇩🇪 Germany (EUR)",group:"Europe"},{value:"jp",label:"🇯🇵 Japan (JPY)",group:"Asia"},{value:"in",label:"🇮🇳 India (INR)",group:"Asia"}];return a.jsx(n,{label:"Billing Region",searchable:!0,searchPlaceholder:"Search country or currency...",groupBy:"group",options:o,value:e,onChange:r,helperText:"Tax and currency rates adjust automatically"})}},p={args:{label:"Categorized Searchable Dropdown",options:l,searchable:!0,searchPlaceholder:"Search frameworks or languages...",groupBy:"group",clearable:!0},render:e=>{const[r,o]=t.useState("");return a.jsx(n,{...e,value:r,onChange:o})}},g={render:()=>{const[e,r]=t.useState("react"),[o,h]=t.useState("node"),[v,q]=t.useState("python");return a.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1.25rem"},children:[a.jsx(n,{size:"sm",label:"Small Dropdown (32px)",options:l,value:e,onChange:r}),a.jsx(n,{size:"md",label:"Medium Dropdown (40px Default)",options:l,value:o,onChange:h}),a.jsx(n,{size:"lg",label:"Large Dropdown (48px)",options:l,value:v,onChange:q})]})}},m={render:()=>a.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1.5rem"},children:[a.jsx(n,{label:"Disabled Dropdown",placeholder:"Cannot interact",disabled:!0,options:l,value:"react"}),a.jsx(n,{label:"Required Field with Validation Error",options:l,hasError:!0,error:"Please choose a valid framework option",required:!0})]})};var b,S,x;s.parameters={...s.parameters,docs:{...(b=s.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    label: "Select Tech Stack",
    placeholder: "Select an option",
    options: demoOptions,
    size: "md",
    clearable: true,
    searchable: false,
    disabled: false,
    required: false,
    multiple: false
  },
  render: args => {
    const [val, setVal] = useState("react");
    return <Dropdown {...args} value={val} onChange={setVal} />;
  }
}`,...(x=(S=s.parameters)==null?void 0:S.docs)==null?void 0:x.source}}};var y,w,D;i.parameters={...i.parameters,docs:{...(y=i.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => {
    const [isLoading, setIsLoading] = useState(true);
    const [val, setVal] = useState("");
    return <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "1rem"
    }}>\r
        <div style={{
        display: "flex",
        gap: "0.5rem",
        alignItems: "center"
      }}>\r
          <Button size="sm" variant="secondary" onClick={() => setIsLoading(prev => !prev)}>\r
            Toggle Loading State ({isLoading ? "Loading ON" : "Loading OFF"})\r
          </Button>\r
        </div>\r
        <Dropdown label="Server Repositories (Async)" loading={isLoading} placeholder={isLoading ? "Fetching data from API..." : "Choose repository"} options={isLoading ? [] : demoOptions} value={val} onChange={setVal} helperText={isLoading ? "Loading spinner active with wait cursor" : "Data resolved successfully"} />\r
      </div>;
  }
}`,...(D=(w=i.parameters)==null?void 0:w.docs)==null?void 0:D.source}}};var f,C,j;c.parameters={...c.parameters,docs:{...(f=c.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    label: "Select Frameworks",
    options: demoOptions,
    multiple: true,
    showSelectAll: true,
    searchable: true,
    clearable: true
  },
  render: args => {
    const [val, setVal] = useState<string[]>(["react", "node"]);
    return <Dropdown {...args} value={val} onChange={setVal} />;
  }
}`,...(j=(C=c.parameters)==null?void 0:C.docs)==null?void 0:j.source}}};var A,V,L;u.parameters={...u.parameters,docs:{...(A=u.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    label: "Selected Technologies (Click × on tag to remove)",
    options: demoOptions,
    multiple: true,
    clearable: true,
    maxTagCount: 3
  },
  render: args => {
    const [val, setVal] = useState<string[]>(["react", "vue", "node", "python"]);
    return <Dropdown {...args} value={val} onChange={setVal} />;
  }
}`,...(L=(V=u.parameters)==null?void 0:V.docs)==null?void 0:L.source}}};var k,T,P;d.parameters={...d.parameters,docs:{...(k=d.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => {
    const [country, setCountry] = useState("us");
    const countries = [{
      value: "us",
      label: "🇺🇸 United States (USD)",
      group: "Americas"
    }, {
      value: "ca",
      label: "🇨🇦 Canada (CAD)",
      group: "Americas"
    }, {
      value: "uk",
      label: "🇬🇧 United Kingdom (GBP)",
      group: "Europe"
    }, {
      value: "de",
      label: "🇩🇪 Germany (EUR)",
      group: "Europe"
    }, {
      value: "jp",
      label: "🇯🇵 Japan (JPY)",
      group: "Asia"
    }, {
      value: "in",
      label: "🇮🇳 India (INR)",
      group: "Asia"
    }];
    return <Dropdown label="Billing Region" searchable searchPlaceholder="Search country or currency..." groupBy="group" options={countries} value={country} onChange={setCountry} helperText="Tax and currency rates adjust automatically" />;
  }
}`,...(P=(T=d.parameters)==null?void 0:T.docs)==null?void 0:P.source}}};var E,O,z;p.parameters={...p.parameters,docs:{...(E=p.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    label: "Categorized Searchable Dropdown",
    options: demoOptions,
    searchable: true,
    searchPlaceholder: "Search frameworks or languages...",
    groupBy: "group",
    clearable: true
  },
  render: args => {
    const [val, setVal] = useState("");
    return <Dropdown {...args} value={val} onChange={setVal} />;
  }
}`,...(z=(O=p.parameters)==null?void 0:O.docs)==null?void 0:z.source}}};var B,F,R;g.parameters={...g.parameters,docs:{...(B=g.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => {
    const [v1, setV1] = useState("react");
    const [v2, setV2] = useState("node");
    const [v3, setV3] = useState("python");
    return <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "1.25rem"
    }}>\r
        <Dropdown size="sm" label="Small Dropdown (32px)" options={demoOptions} value={v1} onChange={setV1} />\r
        <Dropdown size="md" label="Medium Dropdown (40px Default)" options={demoOptions} value={v2} onChange={setV2} />\r
        <Dropdown size="lg" label="Large Dropdown (48px)" options={demoOptions} value={v3} onChange={setV3} />\r
      </div>;
  }
}`,...(R=(F=g.parameters)==null?void 0:F.docs)==null?void 0:R.source}}};var I,G,U;m.parameters={...m.parameters,docs:{...(I=m.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem"
  }}>\r
      <Dropdown label="Disabled Dropdown" placeholder="Cannot interact" disabled options={demoOptions} value="react" />\r
      <Dropdown label="Required Field with Validation Error" options={demoOptions} hasError error="Please choose a valid framework option" required />\r
    </div>
}`,...(U=(G=m.parameters)==null?void 0:G.docs)==null?void 0:U.source}}};const $=["Default","AsyncLoadingShowcase","MultiSelectWithSelectAll","MultiSelectWithTagRemoval","CountryLanguagePicker","SearchableAndGrouped","SizesShowcase","DisabledAndErrorStates"];export{i as AsyncLoadingShowcase,d as CountryLanguagePicker,s as Default,m as DisabledAndErrorStates,c as MultiSelectWithSelectAll,u as MultiSelectWithTagRemoval,p as SearchableAndGrouped,g as SizesShowcase,$ as __namedExportsOrder,Z as default};
