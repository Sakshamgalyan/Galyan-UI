import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as l}from"./index-CC0H-XIk.js";import{r as ce}from"./index-DLSp3Bm_.js";import{C as pe}from"./Calendar-DMHmamFT.js";import{I as me}from"./Input-I8ziictD.js";import{B as j}from"./Button-CYenr2QO.js";/* empty css                   */import"./index-HBoXM-p9.js";const fe=()=>e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2",ry:"2"}),e.jsx("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),e.jsx("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),e.jsx("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]});function o({placeholder:s="Select date",variant:n="default",value:t,onChange:r,leftIcon:z,rightIcon:O=e.jsx(fe,{}),minDate:G,maxDate:H,onOpen:p,onClose:m,onCancel:f,onApply:d,dateFormat:M="YYYY-MM-DD",firstDayOfWeek:J=0,placement:K="bottom",align:Q="left",zIndex:X=1e3,usePortal:Z=!1,disableFutureDates:ee=!1,valueFormat:De,required:ae=!1,disabled:D=!1,label:te,helperText:re,hasError:le=!1,className:se=""}){const ne=l.useId(),[x,u]=l.useState(!1),[b,S]=l.useState(t??null),w=l.useRef(null);l.useEffect(()=>{S(t??null)},[t]),l.useEffect(()=>{x?p==null||p():m==null||m()},[x,p,m]),l.useEffect(()=>{const a=c=>{var i;(i=w.current)!=null&&i.contains(c.target)||u(!1)};return document.addEventListener("mousedown",a),()=>document.removeEventListener("mousedown",a)},[]);const oe=a=>{if(!a)return"";const c=a.getFullYear(),i=String(a.getMonth()+1).padStart(2,"0"),k=String(a.getDate()).padStart(2,"0");return M==="MM/DD/YYYY"?`${i}/${k}/${c}`:M==="DD/MM/YYYY"?`${k}/${i}/${c}`:`${c}-${i}-${k}`},q=a=>{S(a),d||(r==null||r(a),u(!1))},ie=()=>{r==null||r(b),d==null||d(b),u(!1)},de=()=>{S(t??null),f==null||f(),u(!1)},ue=ee?new Date:H,T=e.jsxs("div",{className:`gy-datepicker-popover gy-datepicker-popover--${K} gy-datepicker-popover--${Q}`,style:{zIndex:X},children:[e.jsx(pe,{value:b??void 0,onChange:a=>{a instanceof Date?q(a):Array.isArray(a)&&a[0]&&q(a[0])},minDate:G,maxDate:ue,firstDayOfWeek:J}),(d||f)&&e.jsxs("div",{className:"gy-datepicker-actions",children:[e.jsx(j,{size:"sm",variant:"secondary",onClick:de,children:"Cancel"}),e.jsx(j,{size:"sm",variant:"primary",onClick:ie,children:"Apply"})]})]});return e.jsxs("div",{ref:w,className:`gy-datepicker ${se}`,children:[e.jsx("div",{onClick:()=>!D&&u(a=>!a),children:e.jsx(me,{id:`gy-datepicker-${ne}`,label:te,placeholder:s,value:oe(t??null),readOnly:!0,disabled:D,required:ae,hasError:le,helperText:re,variant:n,leftIcon:z,rightIcon:O,style:{cursor:D?"not-allowed":"pointer"}})}),x&&!D&&(Z?ce.createPortal(T,document.body):T)]})}o.__docgenInfo={description:"",methods:[],displayName:"DatePicker",props:{placeholder:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'Select date'",computed:!1}},variant:{required:!1,tsType:{name:"union",raw:"'default' | 'filled' | 'focused' | 'error' | 'success' | 'disabled'",elements:[{name:"literal",value:"'default'"},{name:"literal",value:"'filled'"},{name:"literal",value:"'focused'"},{name:"literal",value:"'error'"},{name:"literal",value:"'success'"},{name:"literal",value:"'disabled'"}]},description:"",defaultValue:{value:"'default'",computed:!1}},value:{required:!1,tsType:{name:"union",raw:"Date | null",elements:[{name:"Date"},{name:"null"}]},description:""},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(date: Date | null) => void",signature:{arguments:[{type:{name:"union",raw:"Date | null",elements:[{name:"Date"},{name:"null"}]},name:"date"}],return:{name:"void"}}},description:""},leftIcon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},rightIcon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"",defaultValue:{value:"<CalendarIcon />",computed:!1}},minDate:{required:!1,tsType:{name:"Date"},description:""},maxDate:{required:!1,tsType:{name:"Date"},description:""},onOpen:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onClose:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onCancel:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onApply:{required:!1,tsType:{name:"signature",type:"function",raw:"(date: Date | null) => void",signature:{arguments:[{type:{name:"union",raw:"Date | null",elements:[{name:"Date"},{name:"null"}]},name:"date"}],return:{name:"void"}}},description:""},dateFormat:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'YYYY-MM-DD'",computed:!1}},firstDayOfWeek:{required:!1,tsType:{name:"union",raw:"0 | 1",elements:[{name:"literal",value:"0"},{name:"literal",value:"1"}]},description:"",defaultValue:{value:"0",computed:!1}},placement:{required:!1,tsType:{name:"union",raw:"'top' | 'bottom'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'bottom'"}]},description:"",defaultValue:{value:"'bottom'",computed:!1}},align:{required:!1,tsType:{name:"union",raw:"'left' | 'right'",elements:[{name:"literal",value:"'left'"},{name:"literal",value:"'right'"}]},description:"",defaultValue:{value:"'left'",computed:!1}},zIndex:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1000",computed:!1}},usePortal:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},disableFutureDates:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},valueFormat:{required:!1,tsType:{name:"string"},description:""},required:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},label:{required:!1,tsType:{name:"string"},description:""},helperText:{required:!1,tsType:{name:"string"},description:""},hasError:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}}}};const ke={title:"Galyan UI/DatePicker",component:o,parameters:{layout:"centered",docs:{description:{component:"Popover date picker input with support for date range, formats, constraints, and custom triggers."}}},tags:["autodocs"],decorators:[s=>e.jsx("div",{style:{width:360,minHeight:380},children:e.jsx(s,{})})],argTypes:{placeholder:{control:"text"},label:{control:"text"},helperText:{control:"text"},dateFormat:{control:"select",options:["YYYY-MM-DD","MM/DD/YYYY","DD/MM/YYYY"]},firstDayOfWeek:{control:"inline-radio",options:[0,1]},placement:{control:"inline-radio",options:["top","bottom"]},align:{control:"inline-radio",options:["left","right"]},disabled:{control:"boolean"},required:{control:"boolean"},hasError:{control:"boolean"},disableFutureDates:{control:"boolean"},usePortal:{control:"boolean"}}},v={args:{label:"Select Birthday",placeholder:"Pick a date",dateFormat:"YYYY-MM-DD",firstDayOfWeek:0,placement:"bottom",align:"left",disabled:!1,required:!1,hasError:!1,disableFutureDates:!1},render:s=>{const[n,t]=l.useState(new Date);return e.jsx(o,{...s,value:n,onChange:t})}},g={render:()=>{const[s,n]=l.useState(new Date),[t,r]=l.useState(new Date);return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1.5rem"},children:[e.jsx(o,{label:"US Format (MM/DD/YYYY)",dateFormat:"MM/DD/YYYY",value:s,onChange:n}),e.jsx(o,{label:"EU Format (DD/MM/YYYY)",dateFormat:"DD/MM/YYYY",value:t,onChange:r})]})}},y={args:{label:"Event Start Date",placeholder:"Select starting date"},render:s=>{const[n,t]=l.useState(new Date);return e.jsx(o,{...s,value:n,onApply:r=>alert(`Applied date: ${r==null?void 0:r.toLocaleDateString()}`),onCancel:()=>alert("Selection cancelled")})}},Y={args:{label:"Date of Birth (No Future Dates)",disableFutureDates:!0,placeholder:"Pick a past date"},render:s=>{const[n,t]=l.useState(new Date);return e.jsx(o,{...s,value:n,onChange:t})}},h={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1.5rem"},children:[e.jsx(o,{label:"Disabled DatePicker",placeholder:"Cannot interact",disabled:!0,value:new Date}),e.jsx(o,{label:"Required Appointment Date",placeholder:"Pick date",required:!0,hasError:!0,helperText:"Please select an available appointment slot"})]})};var F,P,E;v.parameters={...v.parameters,docs:{...(F=v.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    label: 'Select Birthday',
    placeholder: 'Pick a date',
    dateFormat: 'YYYY-MM-DD',
    firstDayOfWeek: 0,
    placement: 'bottom',
    align: 'left',
    disabled: false,
    required: false,
    hasError: false,
    disableFutureDates: false
  },
  render: args => {
    const [date, setDate] = useState<Date | null>(new Date());
    return <DatePicker {...args} value={date} onChange={setDate} />;
  }
}`,...(E=(P=v.parameters)==null?void 0:P.docs)==null?void 0:E.source}}};var $,C,V;g.parameters={...g.parameters,docs:{...($=g.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: () => {
    const [d1, setD1] = useState<Date | null>(new Date());
    const [d2, setD2] = useState<Date | null>(new Date());
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    }}>\r
        <DatePicker label="US Format (MM/DD/YYYY)" dateFormat="MM/DD/YYYY" value={d1} onChange={setD1} />\r
        <DatePicker label="EU Format (DD/MM/YYYY)" dateFormat="DD/MM/YYYY" value={d2} onChange={setD2} />\r
      </div>;
  }
}`,...(V=(C=g.parameters)==null?void 0:C.docs)==null?void 0:V.source}}};var R,A,N;y.parameters={...y.parameters,docs:{...(R=y.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    label: 'Event Start Date',
    placeholder: 'Select starting date'
  },
  render: args => {
    const [date, setDate] = useState<Date | null>(new Date());
    return <DatePicker {...args} value={date} onApply={d => alert(\`Applied date: \${d?.toLocaleDateString()}\`)} onCancel={() => alert('Selection cancelled')} />;
  }
}`,...(N=(A=y.parameters)==null?void 0:A.docs)==null?void 0:N.source}}};var I,B,W;Y.parameters={...Y.parameters,docs:{...(I=Y.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    label: 'Date of Birth (No Future Dates)',
    disableFutureDates: true,
    placeholder: 'Pick a past date'
  },
  render: args => {
    const [date, setDate] = useState<Date | null>(new Date());
    return <DatePicker {...args} value={date} onChange={setDate} />;
  }
}`,...(W=(B=Y.parameters)==null?void 0:B.docs)==null?void 0:W.source}}};var L,U,_;h.parameters={...h.parameters,docs:{...(L=h.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  }}>\r
      <DatePicker label="Disabled DatePicker" placeholder="Cannot interact" disabled value={new Date()} />\r
      <DatePicker label="Required Appointment Date" placeholder="Pick date" required hasError helperText="Please select an available appointment slot" />\r
    </div>
}`,...(_=(U=h.parameters)==null?void 0:U.docs)==null?void 0:_.source}}};const Me=["Default","CustomFormats","WithApplyCancelActions","DisableFutureDates","DisabledAndErrorStates"];export{g as CustomFormats,v as Default,Y as DisableFutureDates,h as DisabledAndErrorStates,y as WithApplyCancelActions,Me as __namedExportsOrder,ke as default};
