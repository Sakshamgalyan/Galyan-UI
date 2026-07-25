import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as o}from"./index-JhL3uwfD.js";import{I as re}from"./Input-DEDycwxq.js";import{B as w}from"./Button-CIcEDTxP.js";/* empty css                   */const T=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function c({placeholder:l="Select month",value:r,onChange:t,minYear:a=1970,maxYear:k=2050,onOpen:te,onClose:ae,onCancel:h,onApply:d,placement:I="bottom",align:_="left",zIndex:B=1e3,usePortal:oe=!1,required:L=!1,disabled:y=!1,label:z,helperText:J,hasError:W=!1,className:H=""}){const G=o.useId(),[U,p]=o.useState(!1),[i,m]=o.useState((r==null?void 0:r.year)??new Date().getFullYear()),[v,q]=o.useState((r==null?void 0:r.month)??null),S=o.useRef(null),[K,j]=o.useState("months");o.useEffect(()=>{r&&(m(r.year),q(r.month))},[r]),o.useEffect(()=>{const n=s=>{var u;(u=S.current)!=null&&u.contains(s.target)||p(!1)};return document.addEventListener("mousedown",n),()=>document.removeEventListener("mousedown",n)},[]);const Q=n=>{const s={year:i,month:n};q(n),d||(t==null||t(s),p(!1))},X=()=>{if(v!==null){const n={year:i,month:v};t==null||t(n),d==null||d(n)}p(!1)},Z=()=>{h==null||h(),p(!1)},ee=r?`${T[r.month]} ${r.year}`:"",M=i-i%10,ne=Array.from({length:12},(n,s)=>M-1+s);return e.jsxs("div",{ref:S,className:`gy-monthpicker ${H}`,children:[e.jsx("div",{onClick:()=>!y&&p(n=>!n),children:e.jsx(re,{id:`gy-monthpicker-${G}`,label:z,placeholder:l,value:ee,readOnly:!0,disabled:y,required:L,hasError:W,helperText:J,style:{cursor:y?"not-allowed":"pointer"},rightIcon:e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2",ry:"2"}),e.jsx("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),e.jsx("line",{x1:"8",y1:"2",x2:"8",y2:"6"})]})})}),U&&!y&&e.jsxs("div",{className:`gy-monthpicker-popover gy-datepicker-popover--${I} gy-datepicker-popover--${_}`,style:{zIndex:B},children:[K==="months"?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"gy-monthpicker-header",children:[e.jsx("button",{type:"button",className:"gy-monthpicker-nav",onClick:()=>m(n=>Math.max(a,n-1)),children:"‹"}),e.jsx("span",{className:"gy-monthpicker-year",onClick:()=>j("years"),children:i}),e.jsx("button",{type:"button",className:"gy-monthpicker-nav",onClick:()=>m(n=>Math.min(k,n+1)),children:"›"})]}),e.jsx("div",{className:"gy-monthpicker-grid",children:T.map((n,s)=>{const u=(r==null?void 0:r.year)===i&&v===s;return e.jsx("button",{type:"button",className:`gy-monthpicker-cell ${u?"gy-monthpicker-cell--selected":""}`,onClick:()=>Q(s),children:n},n)})})]}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"gy-monthpicker-header",children:[e.jsx("button",{type:"button",className:"gy-monthpicker-nav",onClick:()=>m(n=>Math.max(a,n-10)),children:"‹"}),e.jsxs("span",{className:"gy-monthpicker-year",onClick:()=>j("months"),children:[M," - ",M+9]}),e.jsx("button",{type:"button",className:"gy-monthpicker-nav",onClick:()=>m(n=>Math.min(k,n+10)),children:"›"})]}),e.jsx("div",{className:"gy-monthpicker-grid",children:ne.map(n=>{const s=i===n,u=n<a||n>k;return e.jsx("button",{type:"button",disabled:u,className:`gy-monthpicker-cell ${s?"gy-monthpicker-cell--selected":""}`,onClick:()=>{m(n),j("months")},children:n},n)})})]}),(d||h)&&e.jsxs("div",{className:"gy-datepicker-actions",children:[e.jsx(w,{size:"sm",variant:"secondary",onClick:Z,children:"Cancel"}),e.jsx(w,{size:"sm",variant:"primary",onClick:X,children:"Apply"})]})]})]})}c.__docgenInfo={description:"",methods:[],displayName:"MonthPicker",props:{placeholder:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'Select month'",computed:!1}},value:{required:!1,tsType:{name:"union",raw:"{ year: number; month: number } | null",elements:[{name:"signature",type:"object",raw:"{ year: number; month: number }",signature:{properties:[{key:"year",value:{name:"number",required:!0}},{key:"month",value:{name:"number",required:!0}}]}},{name:"null"}]},description:""},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(val: { year: number; month: number } | null) => void",signature:{arguments:[{type:{name:"union",raw:"{ year: number; month: number } | null",elements:[{name:"signature",type:"object",raw:"{ year: number; month: number }",signature:{properties:[{key:"year",value:{name:"number",required:!0}},{key:"month",value:{name:"number",required:!0}}]}},{name:"null"}]},name:"val"}],return:{name:"void"}}},description:""},minYear:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1970",computed:!1}},maxYear:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"2050",computed:!1}},onOpen:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onClose:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onCancel:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onApply:{required:!1,tsType:{name:"signature",type:"function",raw:"(val: { year: number; month: number } | null) => void",signature:{arguments:[{type:{name:"union",raw:"{ year: number; month: number } | null",elements:[{name:"signature",type:"object",raw:"{ year: number; month: number }",signature:{properties:[{key:"year",value:{name:"number",required:!0}},{key:"month",value:{name:"number",required:!0}}]}},{name:"null"}]},name:"val"}],return:{name:"void"}}},description:""},placement:{required:!1,tsType:{name:"union",raw:"'top' | 'bottom'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'bottom'"}]},description:"",defaultValue:{value:"'bottom'",computed:!1}},align:{required:!1,tsType:{name:"union",raw:"'left' | 'right'",elements:[{name:"literal",value:"'left'"},{name:"literal",value:"'right'"}]},description:"",defaultValue:{value:"'left'",computed:!1}},zIndex:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1000",computed:!1}},usePortal:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},required:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},label:{required:!1,tsType:{name:"string"},description:""},helperText:{required:!1,tsType:{name:"string"},description:""},hasError:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}}}};const ue={title:"Galyan UI/MonthPicker",component:c,parameters:{layout:"centered",docs:{description:{component:"Dedicated selector for month and year combinations."}}},tags:["autodocs"],decorators:[l=>e.jsx("div",{style:{width:340,minHeight:320},children:e.jsx(l,{})})],argTypes:{label:{control:"text"},placeholder:{control:"text"},helperText:{control:"text"},minYear:{control:"number"},maxYear:{control:"number"},placement:{control:"inline-radio",options:["top","bottom"]},align:{control:"inline-radio",options:["left","right"]},disabled:{control:"boolean"},required:{control:"boolean"},hasError:{control:"boolean"}}},f={args:{label:"Billing Month",placeholder:"Select month & year",minYear:1970,maxYear:2050,disabled:!1,required:!1,hasError:!1},render:l=>{const[r,t]=o.useState({year:2026,month:6});return e.jsx(c,{...l,value:r,onChange:t})}},b={args:{label:"Report Period",placeholder:"Choose period"},render:l=>{const[r,t]=o.useState({year:2026,month:0});return e.jsx(c,{...l,value:r,onApply:a=>{t(a),alert(`Applied: ${(a==null?void 0:a.month)!==void 0?a.month+1:""}/${a==null?void 0:a.year}`)},onCancel:()=>alert("Cancelled")})}},g={args:{label:"Recent Year (2020 - 2030)",placeholder:"Select bounded month",minYear:2020,maxYear:2030},render:l=>{const[r,t]=o.useState({year:2025,month:3});return e.jsx(c,{...l,value:r,onChange:t})}},x={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1.5rem"},children:[e.jsx(c,{label:"Disabled MonthPicker",placeholder:"Cannot interact",disabled:!0,value:{year:2026,month:6}}),e.jsx(c,{label:"Required Field with Error",placeholder:"Select month",hasError:!0,required:!0,helperText:"Please select a valid billing month"})]})};var N,C,E;f.parameters={...f.parameters,docs:{...(N=f.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    label: 'Billing Month',
    placeholder: 'Select month & year',
    minYear: 1970,
    maxYear: 2050,
    disabled: false,
    required: false,
    hasError: false
  },
  render: args => {
    const [month, setMonth] = useState<{
      year: number;
      month: number;
    } | null>({
      year: 2026,
      month: 6
    });
    return <MonthPicker {...args} value={month} onChange={setMonth} />;
  }
}`,...(E=(C=f.parameters)==null?void 0:C.docs)==null?void 0:E.source}}};var P,Y,A;b.parameters={...b.parameters,docs:{...(P=b.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    label: 'Report Period',
    placeholder: 'Choose period'
  },
  render: args => {
    const [month, setMonth] = useState<{
      year: number;
      month: number;
    } | null>({
      year: 2026,
      month: 0
    });
    return <MonthPicker {...args} value={month} onApply={val => {
      setMonth(val);
      alert(\`Applied: \${val?.month !== undefined ? val.month + 1 : ''}/\${val?.year}\`);
    }} onCancel={() => alert('Cancelled')} />;
  }
}`,...(A=(Y=b.parameters)==null?void 0:Y.docs)==null?void 0:A.source}}};var V,$,D;g.parameters={...g.parameters,docs:{...(V=g.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    label: 'Recent Year (2020 - 2030)',
    placeholder: 'Select bounded month',
    minYear: 2020,
    maxYear: 2030
  },
  render: args => {
    const [month, setMonth] = useState<{
      year: number;
      month: number;
    } | null>({
      year: 2025,
      month: 3
    });
    return <MonthPicker {...args} value={month} onChange={setMonth} />;
  }
}`,...(D=($=g.parameters)==null?void 0:$.docs)==null?void 0:D.source}}};var R,O,F;x.parameters={...x.parameters,docs:{...(R=x.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  }}>\r
      <MonthPicker label="Disabled MonthPicker" placeholder="Cannot interact" disabled value={{
      year: 2026,
      month: 6
    }} />\r
      <MonthPicker label="Required Field with Error" placeholder="Select month" hasError required helperText="Please select a valid billing month" />\r
    </div>
}`,...(F=(O=x.parameters)==null?void 0:O.docs)==null?void 0:F.source}}};const de=["Default","WithApplyCancelActions","MinAndMaxYears","DisabledAndErrorStates"];export{f as Default,x as DisabledAndErrorStates,g as MinAndMaxYears,b as WithApplyCancelActions,de as __namedExportsOrder,ue as default};
