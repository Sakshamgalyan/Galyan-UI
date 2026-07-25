import{j as r}from"./jsx-runtime-D_zvdyIk.js";import{r as u}from"./index-JhL3uwfD.js";import{D as t}from"./Dropdown-B3unr0-k.js";import"./index-BPftEo5x.js";import"./index-hLVmTiZX.js";import"./Spinner-BLlcYVRD.js";import"./Checkbox-B1kmQTUw.js";const I={title:"Galyan UI/Dropdown",component:t,parameters:{layout:"centered",docs:{description:{component:"Feature-rich select dropdown supporting search, multi-selection, select-all, grouping, custom option rendering, and portal popovers."}}},tags:["autodocs"],decorators:[e=>r.jsx("div",{style:{width:380,minHeight:320},children:r.jsx(e,{})})],argTypes:{size:{control:"select",options:["sm","md","lg"]},label:{control:"text"},placeholder:{control:"text"},helperText:{control:"text"},error:{control:"text"},disabled:{control:"boolean"},required:{control:"boolean"},multiple:{control:"boolean"},searchable:{control:"boolean"},searchPlaceholder:{control:"text"},clearable:{control:"boolean"},loading:{control:"boolean"},hasError:{control:"boolean"},hasSuccess:{control:"boolean"},showSelectAll:{control:"boolean"},maxTagCount:{control:"number"},placement:{control:"inline-radio",options:["top","bottom"]},align:{control:"inline-radio",options:["left","right"]},dropdownWidth:{control:"text"}}},l=[{value:"react",label:"React.js",group:"Frontend"},{value:"vue",label:"Vue.js",group:"Frontend"},{value:"angular",label:"Angular",group:"Frontend"},{value:"node",label:"Node.js",group:"Backend"},{value:"python",label:"Python (FastAPI)",group:"Backend"},{value:"go",label:"Go (Golang)",group:"Backend"}],n={args:{label:"Select Tech Stack",placeholder:"Select an option",options:l,size:"md",clearable:!0,searchable:!1,disabled:!1,required:!1,multiple:!1},render:e=>{const[o,a]=u.useState("react");return r.jsx(t,{...e,value:o,onChange:a})}},s={args:{label:"Select Frameworks",options:l,multiple:!0,showSelectAll:!0,searchable:!0,clearable:!0},render:e=>{const[o,a]=u.useState(["react","node"]);return r.jsx(t,{...e,value:o,onChange:a})}},c={args:{label:"Selected Technologies (Click × on tag to remove)",options:l,multiple:!0,clearable:!0,maxTagCount:4},render:e=>{const[o,a]=u.useState(["react","vue","node","python"]);return r.jsx(t,{...e,value:o,onChange:a})}},i={args:{label:"Categorized Searchable Dropdown",options:l,searchable:!0,searchPlaceholder:"Search frameworks or languages...",groupBy:"group",clearable:!0},render:e=>{const[o,a]=u.useState("");return r.jsx(t,{...e,value:o,onChange:a})}},d={render:()=>r.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1.5rem"},children:[r.jsx(t,{label:"Loading Options...",loading:!0,placeholder:"Fetching data from API...",options:[]}),r.jsx(t,{label:"Invalid Field",options:l,hasError:!0,error:"Please choose a valid framework option",required:!0})]})};var p,g,m;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    label: 'Select Tech Stack',
    placeholder: 'Select an option',
    options: demoOptions,
    size: 'md',
    clearable: true,
    searchable: false,
    disabled: false,
    required: false,
    multiple: false
  },
  render: args => {
    const [val, setVal] = useState('react');
    return <Dropdown {...args} value={val} onChange={setVal} />;
  }
}`,...(m=(g=n.parameters)==null?void 0:g.docs)==null?void 0:m.source}}};var h,b,v;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    label: 'Select Frameworks',
    options: demoOptions,
    multiple: true,
    showSelectAll: true,
    searchable: true,
    clearable: true
  },
  render: args => {
    const [val, setVal] = useState<string[]>(['react', 'node']);
    return <Dropdown {...args} value={val} onChange={setVal} />;
  }
}`,...(v=(b=s.parameters)==null?void 0:b.docs)==null?void 0:v.source}}};var S,x,f;c.parameters={...c.parameters,docs:{...(S=c.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    label: 'Selected Technologies (Click × on tag to remove)',
    options: demoOptions,
    multiple: true,
    clearable: true,
    maxTagCount: 4
  },
  render: args => {
    const [val, setVal] = useState<string[]>(['react', 'vue', 'node', 'python']);
    return <Dropdown {...args} value={val} onChange={setVal} />;
  }
}`,...(f=(x=c.parameters)==null?void 0:x.docs)==null?void 0:f.source}}};var w,C,D;i.parameters={...i.parameters,docs:{...(w=i.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    label: 'Categorized Searchable Dropdown',
    options: demoOptions,
    searchable: true,
    searchPlaceholder: 'Search frameworks or languages...',
    groupBy: 'group',
    clearable: true
  },
  render: args => {
    const [val, setVal] = useState('');
    return <Dropdown {...args} value={val} onChange={setVal} />;
  }
}`,...(D=(C=i.parameters)==null?void 0:C.docs)==null?void 0:D.source}}};var j,y,k;d.parameters={...d.parameters,docs:{...(j=d.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  }}>\r
      <Dropdown label="Loading Options..." loading placeholder="Fetching data from API..." options={[]} />\r
      <Dropdown label="Invalid Field" options={demoOptions} hasError error="Please choose a valid framework option" required />\r
    </div>
}`,...(k=(y=d.parameters)==null?void 0:y.docs)==null?void 0:k.source}}};const q=["Default","MultiSelectWithSelectAll","MultiSelectWithTagRemoval","SearchableAndGrouped","LoadingAndErrorStates"];export{n as Default,d as LoadingAndErrorStates,s as MultiSelectWithSelectAll,c as MultiSelectWithTagRemoval,i as SearchableAndGrouped,q as __namedExportsOrder,I as default};
