import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as c}from"./index-CC0H-XIk.js";import{u as Te,a as qe,b as Ye,c as Ce,F as Ae,d as Ve,o as Fe,f as Ne,s as De}from"./floating-ui.react-BUKrONLm.js";import{I as Oe}from"./Input-DxJFmKM0.js";import{B as E}from"./Button-BeMeJT-5.js";/* empty css                   */import"./index-DLSp3Bm_.js";import"./index-HBoXM-p9.js";const R=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function d({placeholder:r="Select month",value:n,onChange:o,minYear:s=1970,maxYear:A=2050,minMonth:u,maxMonth:m,minDate:p,maxDate:f,onOpen:Ee,onClose:Re,onCancel:k,onApply:g,placement:re="bottom",align:ae="left",zIndex:oe=1e3,usePortal:$e=!0,required:se=!1,disabled:S=!1,label:le,helperText:ie,hasError:ce=!1,className:de=""}){const ue=c.useId(),[N,y]=c.useState(!1),[l,x]=c.useState((n==null?void 0:n.year)??new Date().getFullYear()),[j,me]=c.useState((n==null?void 0:n.month)??null),[he,V]=c.useState("months"),pe=`${re}-${ae==="right"?"end":"start"}`,{refs:D,floatingStyles:fe,context:O}=Te({open:N,onOpenChange:y,placement:pe,whileElementsMounted:Ve,strategy:"fixed",middleware:[Fe(6),Ne({fallbackAxisSideDirection:"start",padding:8}),De({padding:8})]}),ge=qe(O),ye=Ye(O,{role:"dialog"}),{getReferenceProps:xe,getFloatingProps:be}=Ce([ge,ye]),b=u?u.year:p?p.getFullYear():s,M=m?m.year:f?f.getFullYear():A,F=(t,a)=>{if(s!==void 0&&t<s||A!==void 0&&t>A||u&&(t<u.year||t===u.year&&a<u.month)||m&&(t>m.year||t===m.year&&a>m.month))return!0;if(p){const i=p.getFullYear(),h=p.getMonth();if(t<i||t===i&&a<h)return!0}if(f){const i=f.getFullYear(),h=f.getMonth();if(t>i||t===i&&a>h)return!0}return!1},Me=t=>t<b||t>M,ve=t=>{if(F(l,t))return;const a={year:l,month:t};me(t),g||(o==null||o(a),y(!1))},ke=()=>{if(j!==null&&!F(l,j)){const t={year:l,month:j};o==null||o(t),g==null||g(t)}y(!1)},Se=()=>{k==null||k(),y(!1)},je=n?`${R[n.month]} ${n.year}`:"",v=l-l%10,Pe=Array.from({length:12},(t,a)=>v-1+a),we=e.jsxs("div",{ref:D.setFloating,className:"gy-monthpicker-popover",style:{...fe,zIndex:oe},...be(),children:[he==="months"?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"gy-monthpicker-header",children:[e.jsx("button",{type:"button",className:"gy-monthpicker-nav",disabled:l<=b,onClick:()=>x(t=>Math.max(b,t-1)),"aria-label":"Previous Year",children:"‹"}),e.jsx("span",{className:"gy-monthpicker-year",onClick:()=>V("years"),children:l}),e.jsx("button",{type:"button",className:"gy-monthpicker-nav",disabled:l>=M,onClick:()=>x(t=>Math.min(M,t+1)),"aria-label":"Next Year",children:"›"})]}),e.jsx("div",{className:"gy-monthpicker-grid",children:R.map((t,a)=>{const i=(n==null?void 0:n.year)===l&&j===a,h=F(l,a);return e.jsx("button",{type:"button",disabled:h,className:["gy-monthpicker-cell",i?"gy-monthpicker-cell--selected":"",h?"gy-monthpicker-cell--disabled":""].filter(Boolean).join(" "),onClick:()=>ve(a),children:t},t)})})]}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"gy-monthpicker-header",children:[e.jsx("button",{type:"button",className:"gy-monthpicker-nav",disabled:v<=b,onClick:()=>x(t=>Math.max(b,t-10)),"aria-label":"Previous Decade",children:"‹"}),e.jsxs("span",{className:"gy-monthpicker-year",onClick:()=>V("months"),children:[v," - ",v+9]}),e.jsx("button",{type:"button",className:"gy-monthpicker-nav",disabled:v+9>=M,onClick:()=>x(t=>Math.min(M,t+10)),"aria-label":"Next Decade",children:"›"})]}),e.jsx("div",{className:"gy-monthpicker-grid",children:Pe.map(t=>{const a=l===t,i=Me(t);return e.jsx("button",{type:"button",disabled:i,className:["gy-monthpicker-cell",a?"gy-monthpicker-cell--selected":"",i?"gy-monthpicker-cell--disabled":""].filter(Boolean).join(" "),onClick:()=>{i||(x(t),V("months"))},children:t},t)})})]}),(g||k)&&e.jsxs("div",{className:"gy-datepicker-actions",children:[e.jsx(E,{size:"sm",variant:"secondary",onClick:Se,children:"Cancel"}),e.jsx(E,{size:"sm",variant:"primary",onClick:ke,children:"Apply"})]})]});return e.jsxs("div",{className:`gy-monthpicker ${de}`,children:[e.jsx("div",{ref:D.setReference,...xe({onClick:()=>!S&&y(t=>!t)}),children:e.jsx(Oe,{id:`gy-monthpicker-${ue}`,label:le,placeholder:r,value:je,readOnly:!0,disabled:S,required:se,hasError:ce,helperText:ie,style:{cursor:S?"not-allowed":"pointer"},rightIcon:e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2",ry:"2"}),e.jsx("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),e.jsx("line",{x1:"8",y1:"2",x2:"8",y2:"6"})]})})}),N&&!S&&e.jsx(Ae,{children:we})]})}d.__docgenInfo={description:"",methods:[],displayName:"MonthPicker",props:{placeholder:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"Select month"',computed:!1}},value:{required:!1,tsType:{name:"union",raw:"MonthPickerValue | null",elements:[{name:"MonthPickerValue"},{name:"null"}]},description:""},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(val: MonthPickerValue | null) => void",signature:{arguments:[{type:{name:"union",raw:"MonthPickerValue | null",elements:[{name:"MonthPickerValue"},{name:"null"}]},name:"val"}],return:{name:"void"}}},description:""},minYear:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1970",computed:!1}},maxYear:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"2050",computed:!1}},minMonth:{required:!1,tsType:{name:"MonthPickerValue"},description:""},maxMonth:{required:!1,tsType:{name:"MonthPickerValue"},description:""},minDate:{required:!1,tsType:{name:"Date"},description:""},maxDate:{required:!1,tsType:{name:"Date"},description:""},onOpen:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onClose:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onCancel:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onApply:{required:!1,tsType:{name:"signature",type:"function",raw:"(val: MonthPickerValue | null) => void",signature:{arguments:[{type:{name:"union",raw:"MonthPickerValue | null",elements:[{name:"MonthPickerValue"},{name:"null"}]},name:"val"}],return:{name:"void"}}},description:""},placement:{required:!1,tsType:{name:"union",raw:'"top" | "bottom"',elements:[{name:"literal",value:'"top"'},{name:"literal",value:'"bottom"'}]},description:"",defaultValue:{value:'"bottom"',computed:!1}},align:{required:!1,tsType:{name:"union",raw:'"left" | "right"',elements:[{name:"literal",value:'"left"'},{name:"literal",value:'"right"'}]},description:"",defaultValue:{value:'"left"',computed:!1}},zIndex:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1000",computed:!1}},usePortal:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},required:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},label:{required:!1,tsType:{name:"string"},description:""},helperText:{required:!1,tsType:{name:"string"},description:""},hasError:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}}}};const Qe={title:"Galyan UI/MonthPicker",component:d,parameters:{layout:"centered",docs:{description:{component:"Dedicated selector for month and year combinations with support for min/max month/year constraints, custom formats, and action buttons."}}},tags:["autodocs"],decorators:[r=>e.jsx("div",{style:{width:360,minHeight:380,padding:"1rem"},children:e.jsx(r,{})})],argTypes:{label:{control:"text"},placeholder:{control:"text"},helperText:{control:"text"},minYear:{control:"number"},maxYear:{control:"number"},placement:{control:"inline-radio",options:["top","bottom"]},align:{control:"inline-radio",options:["left","right"]},disabled:{control:"boolean"},required:{control:"boolean"},hasError:{control:"boolean"}}},P={args:{label:"Billing Month",placeholder:"Select month & year",minYear:1970,maxYear:2050,disabled:!1,required:!1,hasError:!1},render:r=>{const[n,o]=c.useState({year:2026,month:6});return e.jsx(d,{...r,value:n,onChange:o})}},w={render:()=>{const[r,n]=c.useState({year:2026,month:4});return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"},children:[e.jsx(d,{label:"Fiscal Quarter (Apr 2026 - Aug 2026 Only)",placeholder:"Choose allowed month",value:r,onChange:n,minMonth:{year:2026,month:3},maxMonth:{year:2026,month:7},helperText:"Months before April and after August are disabled and greyed out"}),e.jsxs("div",{style:{fontSize:"0.85rem",color:"var(--gy-text-muted)"},children:["Selected Month: ",e.jsx("code",{children:JSON.stringify(r)})]})]})}},T={render:()=>{const r=new Date,[n,o]=c.useState({year:r.getFullYear(),month:r.getMonth()});return e.jsx(d,{label:"Subscription Renewal (Future Months)",placeholder:"Select renewal month",value:n,onChange:o,minDate:r,maxYear:r.getFullYear()+3,helperText:"Past months are disabled and greyed out"})}},q={render:()=>{const[r,n]=c.useState({year:2024,month:5});return e.jsx(d,{label:"Archived Tax Filings (2020 - 2025)",placeholder:"Select filing period",value:r,onChange:n,minYear:2020,maxYear:2025,helperText:"Years outside 2020-2025 are disabled in both month and decade view"})}},Y={args:{label:"Report Period",placeholder:"Choose period"},render:r=>{const[n,o]=c.useState({year:2026,month:0});return e.jsx(d,{...r,value:n,onApply:s=>{o(s),alert(`Applied: ${(s==null?void 0:s.month)!==void 0?s.month+1:""}/${s==null?void 0:s.year}`)},onCancel:()=>alert("Cancelled")})}},C={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1.5rem"},children:[e.jsx(d,{label:"Disabled MonthPicker",placeholder:"Cannot interact",disabled:!0,value:{year:2026,month:6}}),e.jsx(d,{label:"Required Field with Error",placeholder:"Select month",hasError:!0,required:!0,helperText:"Please select a valid billing month"})]})};var $,B,I;P.parameters={...P.parameters,docs:{...($=P.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    label: "Billing Month",
    placeholder: "Select month & year",
    minYear: 1970,
    maxYear: 2050,
    disabled: false,
    required: false,
    hasError: false
  },
  render: args => {
    const [month, setMonth] = useState<MonthPickerValue | null>({
      year: 2026,
      month: 6
    });
    return <MonthPicker {...args} value={month} onChange={setMonth} />;
  }
}`,...(I=(B=P.parameters)==null?void 0:B.docs)==null?void 0:I.source}}};var _,z,J;w.parameters={...w.parameters,docs:{...(_=w.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: () => {
    // Only allow April 2026 (index 3) to August 2026 (index 7)
    const [month, setMonth] = useState<MonthPickerValue | null>({
      year: 2026,
      month: 4
    });
    return <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "1rem"
    }}>\r
        <MonthPicker label="Fiscal Quarter (Apr 2026 - Aug 2026 Only)" placeholder="Choose allowed month" value={month} onChange={setMonth} minMonth={{
        year: 2026,
        month: 3
      }} maxMonth={{
        year: 2026,
        month: 7
      }} helperText="Months before April and after August are disabled and greyed out" />\r
        <div style={{
        fontSize: "0.85rem",
        color: "var(--gy-text-muted)"
      }}>\r
          Selected Month: <code>{JSON.stringify(month)}</code>\r
        </div>\r
      </div>;
  }
}`,...(J=(z=w.parameters)==null?void 0:z.docs)==null?void 0:J.source}}};var H,W,L;T.parameters={...T.parameters,docs:{...(H=T.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: () => {
    const now = new Date();
    const [month, setMonth] = useState<MonthPickerValue | null>({
      year: now.getFullYear(),
      month: now.getMonth()
    });
    return <MonthPicker label="Subscription Renewal (Future Months)" placeholder="Select renewal month" value={month} onChange={setMonth} minDate={now} maxYear={now.getFullYear() + 3} helperText="Past months are disabled and greyed out" />;
  }
}`,...(L=(W=T.parameters)==null?void 0:W.docs)==null?void 0:L.source}}};var Q,U,G;q.parameters={...q.parameters,docs:{...(Q=q.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  render: () => {
    const [month, setMonth] = useState<MonthPickerValue | null>({
      year: 2024,
      month: 5
    });
    return <MonthPicker label="Archived Tax Filings (2020 - 2025)" placeholder="Select filing period" value={month} onChange={setMonth} minYear={2020} maxYear={2025} helperText="Years outside 2020-2025 are disabled in both month and decade view" />;
  }
}`,...(G=(U=q.parameters)==null?void 0:U.docs)==null?void 0:G.source}}};var K,X,Z;Y.parameters={...Y.parameters,docs:{...(K=Y.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    label: "Report Period",
    placeholder: "Choose period"
  },
  render: args => {
    const [month, setMonth] = useState<MonthPickerValue | null>({
      year: 2026,
      month: 0
    });
    return <MonthPicker {...args} value={month} onApply={val => {
      setMonth(val);
      alert(\`Applied: \${val?.month !== undefined ? val.month + 1 : ""}/\${val?.year}\`);
    }} onCancel={() => alert("Cancelled")} />;
  }
}`,...(Z=(X=Y.parameters)==null?void 0:X.docs)==null?void 0:Z.source}}};var ee,te,ne;C.parameters={...C.parameters,docs:{...(ee=C.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem"
  }}>\r
      <MonthPicker label="Disabled MonthPicker" placeholder="Cannot interact" disabled value={{
      year: 2026,
      month: 6
    }} />\r
      <MonthPicker label="Required Field with Error" placeholder="Select month" hasError required helperText="Please select a valid billing month" />\r
    </div>
}`,...(ne=(te=C.parameters)==null?void 0:te.docs)==null?void 0:ne.source}}};const Ue=["Default","MinAndMaxMonthConstraints","FutureMonthsOnly","HistoricalArchiveOnly","WithApplyCancelActions","DisabledAndErrorStates"];export{P as Default,C as DisabledAndErrorStates,T as FutureMonthsOnly,q as HistoricalArchiveOnly,w as MinAndMaxMonthConstraints,Y as WithApplyCancelActions,Ue as __namedExportsOrder,Qe as default};
