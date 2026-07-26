import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as g}from"./index-CC0H-XIk.js";import{I as n}from"./Input-I8ziictD.js";import{B as z}from"./Button-CYenr2QO.js";import{D as A}from"./Dropdown-CX4Ls0u_.js";import"./index-DLSp3Bm_.js";import"./index-HBoXM-p9.js";import"./Spinner-BLlcYVRD.js";import"./Checkbox-1pFZ2Xn9.js";function s({leftAddon:r,rightAddon:t,size:o="md",fullWidth:a=!0,label:l,helperText:i,hasError:d=!1,disabled:_=!1,required:P=!1,children:C,className:U=""}){const B=["gy-input-group-wrapper",a?"gy-input-group-wrapper--full-width":"",U].filter(Boolean).join(" "),W=["gy-input-group",`gy-input-group--${o}`,a?"gy-input-group--full-width":"",r?"gy-input-group--has-left":"",t?"gy-input-group--has-right":"",d?"gy-input-group--error":"",_?"gy-input-group--disabled":""].filter(Boolean).join(" ");return e.jsxs("div",{className:B,children:[l&&e.jsx("label",{className:`gy-input-label ${P?"gy-input-label--required":""}`,children:l}),e.jsxs("div",{className:W,children:[r&&e.jsx("div",{className:"gy-input-group__addon gy-input-group__addon--left",children:r}),e.jsx("div",{className:"gy-input-group__control",children:C}),t&&e.jsx("div",{className:"gy-input-group__addon gy-input-group__addon--right",children:t})]}),i&&e.jsx("div",{className:`gy-input-helper ${d?"gy-input-helper--error":""}`,children:i})]})}function f({dropdown:r,dropdownPosition:t="left",leftAddon:o,rightAddon:a,...l}){const i=t==="left"?r??o:o,d=t==="right"?r??a:a;return e.jsx(s,{leftAddon:i,rightAddon:d,...l})}s.__docgenInfo={description:"",methods:[],displayName:"InputGroup",props:{leftAddon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},rightAddon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},size:{required:!1,tsType:{name:"union",raw:"'sm' | 'md' | 'lg'",elements:[{name:"literal",value:"'sm'"},{name:"literal",value:"'md'"},{name:"literal",value:"'lg'"}]},description:"",defaultValue:{value:"'md'",computed:!1}},fullWidth:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},label:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},helperText:{required:!1,tsType:{name:"string"},description:""},hasError:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},required:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}}}};f.__docgenInfo={description:"",methods:[],displayName:"DropdownGroup",props:{leftAddon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},rightAddon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},size:{required:!1,tsType:{name:"union",raw:"'sm' | 'md' | 'lg'",elements:[{name:"literal",value:"'sm'"},{name:"literal",value:"'md'"},{name:"literal",value:"'lg'"}]},description:""},fullWidth:{required:!1,tsType:{name:"boolean"},description:""},label:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},helperText:{required:!1,tsType:{name:"string"},description:""},hasError:{required:!1,tsType:{name:"boolean"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:""},required:{required:!1,tsType:{name:"boolean"},description:""},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:""},dropdown:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},dropdownPosition:{required:!1,tsType:{name:"union",raw:"'left' | 'right'",elements:[{name:"literal",value:"'left'"},{name:"literal",value:"'right'"}]},description:"",defaultValue:{value:"'left'",computed:!1}}}};const M={title:"Galyan UI/InputGroup",component:s,parameters:{layout:"centered",docs:{description:{component:"Combine input controls seamlessly with left/right text addons, buttons, or dropdown selects."}}},tags:["autodocs"],decorators:[r=>e.jsx("div",{style:{width:480},children:e.jsx(r,{})})],argTypes:{size:{control:"select",options:["sm","md","lg"]},fullWidth:{control:"boolean"},leftAddon:{control:"text"},rightAddon:{control:"text"}}},p={args:{label:"Website Domain",size:"md",fullWidth:!0,leftAddon:"https://",rightAddon:".com",helperText:"Enter your custom subdomain"},render:r=>e.jsx(s,{...r,children:e.jsx(n,{placeholder:"my-domain"})})},u={args:{label:"Newsletter Subscription",size:"md",fullWidth:!0},render:r=>{const[t,o]=g.useState("");return e.jsx(s,{...r,rightAddon:e.jsx(z,{variant:"primary",onClick:()=>alert(`Subscribed ${t}`),children:"Subscribe"}),children:e.jsx(n,{placeholder:"Enter your email address",value:t,onChange:a=>o(a.target.value)})})}},c={render:()=>{const[r,t]=g.useState("https://");return e.jsx(f,{label:"Server Address",dropdownPosition:"left",dropdown:e.jsx(A,{options:[{value:"https://",label:"https://"},{value:"http://",label:"http://"},{value:"ftp://",label:"ftp://"}],value:r,onChange:t}),children:e.jsx(n,{placeholder:"api.example.com/v1"})})}},m={render:()=>{const[r,t]=g.useState("USD");return e.jsx(f,{label:"Pricing Plan",dropdownPosition:"right",leftAddon:"$",dropdown:e.jsx(A,{options:[{value:"USD",label:"USD"},{value:"EUR",label:"EUR"},{value:"GBP",label:"GBP"}],value:r,onChange:t}),children:e.jsx(n,{placeholder:"99.00",type:"number"})})}},h={render:()=>e.jsx(s,{label:"Repository URL",leftAddon:"git@github.com:",rightAddon:".git",hasError:!0,required:!0,helperText:"Repository name cannot contain special characters",children:e.jsx(n,{placeholder:"username/repo",hasError:!0})})};var y,b,R;p.parameters={...p.parameters,docs:{...(y=p.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    label: 'Website Domain',
    size: 'md',
    fullWidth: true,
    leftAddon: 'https://',
    rightAddon: '.com',
    helperText: 'Enter your custom subdomain'
  },
  render: args => <InputGroup {...args}>\r
      <Input placeholder="my-domain" />\r
    </InputGroup>
}`,...(R=(b=p.parameters)==null?void 0:b.docs)==null?void 0:R.source}}};var v,w,x;u.parameters={...u.parameters,docs:{...(v=u.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    label: 'Newsletter Subscription',
    size: 'md',
    fullWidth: true
  },
  render: args => {
    const [email, setEmail] = useState('');
    return <InputGroup {...args} rightAddon={<Button variant="primary" onClick={() => alert(\`Subscribed \${email}\`)}>\r
            Subscribe\r
          </Button>}>\r
        <Input placeholder="Enter your email address" value={email} onChange={e => setEmail(e.target.value)} />\r
      </InputGroup>;
  }
}`,...(x=(w=u.parameters)==null?void 0:w.docs)==null?void 0:x.source}}};var N,T,q;c.parameters={...c.parameters,docs:{...(N=c.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => {
    const [proto, setProto] = useState('https://');
    return <DropdownGroup label="Server Address" dropdownPosition="left" dropdown={<Dropdown options={[{
      value: 'https://',
      label: 'https://'
    }, {
      value: 'http://',
      label: 'http://'
    }, {
      value: 'ftp://',
      label: 'ftp://'
    }]} value={proto} onChange={setProto} />}>\r
        <Input placeholder="api.example.com/v1" />\r
      </DropdownGroup>;
  }
}`,...(q=(T=c.parameters)==null?void 0:T.docs)==null?void 0:q.source}}};var j,S,D;m.parameters={...m.parameters,docs:{...(j=m.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => {
    const [currency, setCurrency] = useState('USD');
    return <DropdownGroup label="Pricing Plan" dropdownPosition="right" leftAddon="$" dropdown={<Dropdown options={[{
      value: 'USD',
      label: 'USD'
    }, {
      value: 'EUR',
      label: 'EUR'
    }, {
      value: 'GBP',
      label: 'GBP'
    }]} value={currency} onChange={setCurrency} />}>\r
        <Input placeholder="99.00" type="number" />\r
      </DropdownGroup>;
  }
}`,...(D=(S=m.parameters)==null?void 0:S.docs)==null?void 0:D.source}}};var G,E,I;h.parameters={...h.parameters,docs:{...(G=h.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: () => <InputGroup label="Repository URL" leftAddon="git@github.com:" rightAddon=".git" hasError required helperText="Repository name cannot contain special characters">\r
      <Input placeholder="username/repo" hasError />\r
    </InputGroup>
}`,...(I=(E=h.parameters)==null?void 0:E.docs)==null?void 0:I.source}}};const Q=["Default","WithButtonAddon","DropdownGroupLeft","DropdownGroupRight","ErrorState"];export{p as Default,c as DropdownGroupLeft,m as DropdownGroupRight,h as ErrorState,u as WithButtonAddon,Q as __namedExportsOrder,M as default};
