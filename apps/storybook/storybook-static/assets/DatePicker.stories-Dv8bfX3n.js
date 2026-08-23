import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as o}from"./index-CC0H-XIk.js";import{u as Qe,a as Ge,b as Ke,c as Xe,F as Ze,d as et,o as tt,f as at,s as rt}from"./floating-ui.react-BUKrONLm.js";import{C as nt}from"./Calendar-CMSAYgbq.js";import{I as st}from"./Input-DxJFmKM0.js";import{B as w}from"./Button-BeMeJT-5.js";/* empty css                   */import"./index-DLSp3Bm_.js";import"./index-HBoXM-p9.js";const lt=()=>e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2",ry:"2"}),e.jsx("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),e.jsx("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),e.jsx("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]});function u({mode:t="single",placeholder:s,variant:i="default",value:a,onChange:n,leftIcon:fe,rightIcon:ge=e.jsx(lt,{}),minDate:ye,maxDate:he,onOpen:y,onClose:h,onCancel:q,onApply:p,onClear:R,dateFormat:E="YYYY-MM-DD",firstDayOfWeek:ve=0,placement:xe="bottom",align:we="left",zIndex:be=1e3,usePortal:ot=!0,disableFutureDates:ke=!1,required:Ye=!1,disabled:v=!1,label:Se,helperText:Pe,hasError:Me=!1,showActions:D=!0,showPresent:Te=!0,showClear:Fe=!0,presets:W,className:Ve=""}){const je=o.useId(),[x,c]=o.useState(!1),[d,m]=o.useState(a??null),qe=`${xe}-${we==="right"?"end":"start"}`,{refs:N,floatingStyles:Re,context:$}=Qe({open:x,onOpenChange:c,placement:qe,whileElementsMounted:et,strategy:"fixed",middleware:[tt(6),at({fallbackAxisSideDirection:"start",padding:8}),rt({padding:8})]}),We=Ge($),Ce=Ke($,{role:"dialog"}),{getReferenceProps:Ee,getFloatingProps:Ne}=Xe([We,Ce]);o.useEffect(()=>{m(a??null)},[a]),o.useEffect(()=>{x?y==null||y():h==null||h()},[x,y,h]);const g=r=>{if(!r)return"";if(r==="present")return"Present";if(!(r instanceof Date))return"";const l=r.getFullYear(),f=String(r.getMonth()+1).padStart(2,"0"),C=String(r.getDate()).padStart(2,"0");return E==="MM/DD/YYYY"?`${f}/${C}/${l}`:E==="DD/MM/YYYY"?`${C}/${f}/${l}`:`${l}-${f}-${C}`},$e=()=>{if(!a)return"";if(t==="range"&&Array.isArray(a)){const[r,l]=a;return r?l==="present"?`${g(r)} - Present`:l?`${g(r)} - ${g(l)}`:g(r):""}return a instanceof Date?g(a):""},Ae=r=>{m(r),!D&&!p&&(n==null||n(r),c(!1))},Ie=()=>{n==null||n(d),p==null||p(d),c(!1)},Oe=()=>{m(a??null),q==null||q(),c(!1)},Ue=()=>{m(null),R==null||R(),!D&&!p&&(n==null||n(null),c(!1))},ze=()=>{const r=new Date;if(t==="range")if(Array.isArray(d)&&d[0]instanceof Date){const l=[d[0],"present"];m(l),!D&&!p&&(n==null||n(l),c(!1))}else{const l=[r,"present"];m(l),!D&&!p&&(n==null||n(l),c(!1))}else m(r),!D&&!p&&(n==null||n(r),c(!1))},Be=t==="range"&&Array.isArray(d)&&d[1]==="present"||t==="single"&&d instanceof Date&&d.toDateString()===new Date().toDateString(),He=(()=>{if(d){if(t==="range"&&Array.isArray(d)){const[r,l]=d;return r?[r,l==="present"?new Date:l??void 0]:void 0}if(d instanceof Date)return d}})(),Je=ke?new Date:he,Le=s??(t==="range"?"Select date range":"Select date"),_e=e.jsxs("div",{ref:N.setFloating,className:"gy-datepicker-popover",style:{...Re,zIndex:be},...Ne(),children:[W&&W.length>0&&e.jsx("div",{className:"gy-datepicker-presets",children:W.map((r,l)=>e.jsx("button",{type:"button",className:"gy-datepicker-preset-btn",onClick:()=>{const f=r.getValue();m(f),!D&&!p&&(n==null||n(f),c(!1))},children:r.label},l))}),e.jsx(nt,{mode:t,value:He,onChange:r=>Ae(r),minDate:ye,maxDate:Je,firstDayOfWeek:ve}),D&&e.jsxs("div",{className:"gy-datepicker-actions",children:[Te&&e.jsx(w,{size:"sm",variant:Be?"primary":"ghost",className:"gy-datepicker-present-btn",onClick:ze,children:"Present"}),Fe&&e.jsx(w,{size:"sm",variant:"ghost",className:"gy-datepicker-clear-btn",onClick:Ue,children:"Clear"}),e.jsx("div",{style:{flex:1}}),e.jsx(w,{size:"sm",variant:"secondary",onClick:Oe,children:"Cancel"}),e.jsx(w,{size:"sm",variant:"primary",onClick:Ie,children:"Apply"})]})]});return e.jsxs("div",{className:`gy-datepicker ${Ve}`,children:[e.jsx("div",{ref:N.setReference,...Ee({onClick:()=>!v&&c(r=>!r)}),children:e.jsx(st,{id:`gy-datepicker-${je}`,label:Se,placeholder:Le,value:$e(),readOnly:!0,disabled:v,required:Ye,hasError:Me,helperText:Pe,variant:i,leftIcon:fe,rightIcon:ge,style:{cursor:v?"not-allowed":"pointer"}})}),x&&!v&&e.jsx(Ze,{children:_e})]})}u.__docgenInfo={description:"",methods:[],displayName:"DatePicker",props:{mode:{required:!1,tsType:{name:"union",raw:'"single" | "range"',elements:[{name:"literal",value:'"single"'},{name:"literal",value:'"range"'}]},description:"",defaultValue:{value:'"single"',computed:!1}},placeholder:{required:!1,tsType:{name:"string"},description:""},variant:{required:!1,tsType:{name:"union",raw:'"default" | "filled" | "focused" | "error" | "success" | "disabled"',elements:[{name:"literal",value:'"default"'},{name:"literal",value:'"filled"'},{name:"literal",value:'"focused"'},{name:"literal",value:'"error"'},{name:"literal",value:'"success"'},{name:"literal",value:'"disabled"'}]},description:"",defaultValue:{value:'"default"',computed:!1}},value:{required:!1,tsType:{name:"union",raw:"DatePickerSingleValue | DatePickerRangeValue",elements:[{name:"union",raw:"Date | null",elements:[{name:"Date"},{name:"null"}]},{name:"union",raw:'[Date | null, Date | "present" | null] | null',elements:[{name:"tuple",raw:'[Date | null, Date | "present" | null]',elements:[{name:"union",raw:"Date | null",elements:[{name:"Date"},{name:"null"}]},{name:"union",raw:'Date | "present" | null',elements:[{name:"Date"},{name:"literal",value:'"present"'},{name:"null"}]}]},{name:"null"}]}]},description:""},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(date: any) => void",signature:{arguments:[{type:{name:"any"},name:"date"}],return:{name:"void"}}},description:""},leftIcon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},rightIcon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"",defaultValue:{value:"<CalendarIcon />",computed:!1}},minDate:{required:!1,tsType:{name:"Date"},description:""},maxDate:{required:!1,tsType:{name:"Date"},description:""},onOpen:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onClose:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onCancel:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onApply:{required:!1,tsType:{name:"signature",type:"function",raw:"(date: any) => void",signature:{arguments:[{type:{name:"any"},name:"date"}],return:{name:"void"}}},description:""},onClear:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},dateFormat:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"YYYY-MM-DD"',computed:!1}},firstDayOfWeek:{required:!1,tsType:{name:"union",raw:"0 | 1",elements:[{name:"literal",value:"0"},{name:"literal",value:"1"}]},description:"",defaultValue:{value:"0",computed:!1}},placement:{required:!1,tsType:{name:"union",raw:'"top" | "bottom"',elements:[{name:"literal",value:'"top"'},{name:"literal",value:'"bottom"'}]},description:"",defaultValue:{value:'"bottom"',computed:!1}},align:{required:!1,tsType:{name:"union",raw:'"left" | "right"',elements:[{name:"literal",value:'"left"'},{name:"literal",value:'"right"'}]},description:"",defaultValue:{value:'"left"',computed:!1}},zIndex:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1000",computed:!1}},usePortal:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},disableFutureDates:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},valueFormat:{required:!1,tsType:{name:"string"},description:""},required:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},label:{required:!1,tsType:{name:"string"},description:""},helperText:{required:!1,tsType:{name:"string"},description:""},hasError:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},showActions:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},showPresent:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},showClear:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},presets:{required:!1,tsType:{name:"Array",elements:[{name:"DatePickerPreset"}],raw:"DatePickerPreset[]"},description:""},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}}}};const yt={title:"Galyan UI/DatePicker",component:u,parameters:{layout:"centered",docs:{description:{component:'Popover date picker input with support for single date, date range, "Present" ongoing feature, formats, presets, constraints, and custom triggers.'}}},tags:["autodocs"],decorators:[t=>e.jsx("div",{style:{width:380,minHeight:460,padding:"1rem"},children:e.jsx(t,{})})],argTypes:{placeholder:{control:"text"},label:{control:"text"},helperText:{control:"text"},dateFormat:{control:"select",options:["YYYY-MM-DD","MM/DD/YYYY","DD/MM/YYYY"]},firstDayOfWeek:{control:"inline-radio",options:[0,1]},placement:{control:"inline-radio",options:["top","bottom"]},align:{control:"inline-radio",options:["left","right"]},disabled:{control:"boolean"},required:{control:"boolean"},hasError:{control:"boolean"},disableFutureDates:{control:"boolean"},usePortal:{control:"boolean"},showPresent:{control:"boolean"},showClear:{control:"boolean"}}},b={args:{label:"Select Date",placeholder:"Pick a date",dateFormat:"YYYY-MM-DD",firstDayOfWeek:0,placement:"bottom",align:"left",disabled:!1,required:!1,hasError:!1,disableFutureDates:!1,showPresent:!0,showClear:!0},render:t=>{const[s,i]=o.useState(new Date);return e.jsx(u,{...t,value:s,onChange:i})}},k={render:()=>{const[t,s]=o.useState([new Date(2022,0,15),"present"]);return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"},children:[e.jsx(u,{mode:"range",label:"Employment Period (Supports 'Present')",placeholder:"Select start and end date",value:t,onChange:s,showPresent:!0,showClear:!0,helperText:"Click 'Present' in the popover to indicate currently active role"}),e.jsxs("div",{style:{fontSize:"0.85rem",color:"var(--gy-text-muted)"},children:["Current Selected Value: ",e.jsx("code",{children:JSON.stringify(t)})]})]})}},Y={render:()=>{const t=new Date,s=new Date(t);s.setDate(t.getDate()+5);const[i,a]=o.useState([t,s]);return e.jsx(u,{mode:"range",label:"Hotel Reservation (Check-in & Check-out)",placeholder:"Select check-in & check-out dates",value:i,minDate:t,onChange:a,helperText:"Past dates are disabled for booking"})}},S={render:()=>{const[t,s]=o.useState(null),i=[{label:"Today",getValue:()=>new Date},{label:"Yesterday",getValue:()=>{const a=new Date;return a.setDate(a.getDate()-1),a}},{label:"Last 7 Days",getValue:()=>{const a=new Date;return a.setDate(a.getDate()-7),[a,new Date]}},{label:"This Month",getValue:()=>{const a=new Date;return[new Date(a.getFullYear(),a.getMonth(),1),a]}}];return e.jsx(u,{mode:"range",label:"Analytics Date Filter",placeholder:"Filter by date range...",value:t,onChange:s,presets:i})}},P={render:()=>{const t=new Date,s=new Date(t.getFullYear(),t.getMonth(),5),i=new Date(t.getFullYear(),t.getMonth(),25),[a,n]=o.useState(new Date(t.getFullYear(),t.getMonth(),12));return e.jsx(u,{label:"Delivery Window (5th - 25th this month)",placeholder:"Select within delivery window",value:a,onChange:n,minDate:s,maxDate:i,helperText:"Dates outside 5th-25th are disabled"})}},M={render:()=>{const[t,s]=o.useState(new Date);return e.jsx(u,{label:"EU Calendar (Monday Start)",firstDayOfWeek:1,dateFormat:"DD/MM/YYYY",value:t,onChange:s,helperText:"Week begins on Monday (Mo, Tu, We, Th, Fr, Sa, Su)"})}},T={render:()=>{const[t,s]=o.useState(new Date),[i,a]=o.useState(new Date);return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1.5rem"},children:[e.jsx(u,{label:"US Format (MM/DD/YYYY)",dateFormat:"MM/DD/YYYY",value:t,onChange:s}),e.jsx(u,{label:"EU Format (DD/MM/YYYY)",dateFormat:"DD/MM/YYYY",value:i,onChange:a})]})}},F={args:{label:"Event Start Date",placeholder:"Select starting date"},render:t=>{const[s,i]=o.useState(new Date);return e.jsx(u,{...t,value:s,onApply:a=>alert(`Applied date: ${JSON.stringify(a)}`),onCancel:()=>alert("Selection cancelled")})}},V={args:{label:"Date of Birth (No Future Dates)",disableFutureDates:!0,placeholder:"Pick a past date"},render:t=>{const[s,i]=o.useState(new Date);return e.jsx(u,{...t,value:s,onChange:i})}},j={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1.5rem"},children:[e.jsx(u,{label:"Disabled DatePicker",placeholder:"Cannot interact",disabled:!0,value:new Date}),e.jsx(u,{label:"Required Appointment Date",placeholder:"Pick date",required:!0,hasError:!0,helperText:"Please select an available appointment slot"})]})};var A,I,O;b.parameters={...b.parameters,docs:{...(A=b.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    label: "Select Date",
    placeholder: "Pick a date",
    dateFormat: "YYYY-MM-DD",
    firstDayOfWeek: 0,
    placement: "bottom",
    align: "left",
    disabled: false,
    required: false,
    hasError: false,
    disableFutureDates: false,
    showPresent: true,
    showClear: true
  },
  render: args => {
    const [date, setDate] = useState<DatePickerValue>(new Date());
    return <DatePicker {...args} value={date} onChange={setDate} />;
  }
}`,...(O=(I=b.parameters)==null?void 0:I.docs)==null?void 0:O.source}}};var U,z,B;k.parameters={...k.parameters,docs:{...(U=k.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: () => {
    // Initial value: Start date Jan 15, 2022 to Present
    const [range, setRange] = useState<DatePickerRangeValue>([new Date(2022, 0, 15), "present"]);
    return <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "1rem"
    }}>\r
        <DatePicker mode="range" label="Employment Period (Supports 'Present')" placeholder="Select start and end date" value={range} onChange={setRange} showPresent showClear helperText="Click 'Present' in the popover to indicate currently active role" />\r
        <div style={{
        fontSize: "0.85rem",
        color: "var(--gy-text-muted)"
      }}>\r
          Current Selected Value: <code>{JSON.stringify(range)}</code>\r
        </div>\r
      </div>;
  }
}`,...(B=(z=k.parameters)==null?void 0:z.docs)==null?void 0:B.source}}};var H,J,L;Y.parameters={...Y.parameters,docs:{...(H=Y.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: () => {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 5);
    const [range, setRange] = useState<DatePickerRangeValue>([today, nextWeek]);
    return <DatePicker mode="range" label="Hotel Reservation (Check-in & Check-out)" placeholder="Select check-in & check-out dates" value={range} minDate={today} onChange={setRange} helperText="Past dates are disabled for booking" />;
  }
}`,...(L=(J=Y.parameters)==null?void 0:J.docs)==null?void 0:L.source}}};var _,Q,G;S.parameters={...S.parameters,docs:{...(_=S.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: () => {
    const [date, setDate] = useState<DatePickerValue>(null);
    const presets = [{
      label: "Today",
      getValue: () => new Date()
    }, {
      label: "Yesterday",
      getValue: () => {
        const d = new Date();
        d.setDate(d.getDate() - 1);
        return d;
      }
    }, {
      label: "Last 7 Days",
      getValue: () => {
        const start = new Date();
        start.setDate(start.getDate() - 7);
        return [start, new Date()] as DatePickerRangeValue;
      }
    }, {
      label: "This Month",
      getValue: () => {
        const now = new Date();
        const start = new Date(now.getFullYear(), now.getMonth(), 1);
        return [start, now] as DatePickerRangeValue;
      }
    }];
    return <DatePicker mode="range" label="Analytics Date Filter" placeholder="Filter by date range..." value={date} onChange={setDate} presets={presets} />;
  }
}`,...(G=(Q=S.parameters)==null?void 0:Q.docs)==null?void 0:G.source}}};var K,X,Z;P.parameters={...P.parameters,docs:{...(K=P.parameters)==null?void 0:K.docs,source:{originalSource:`{
  render: () => {
    const now = new Date();
    const minDate = new Date(now.getFullYear(), now.getMonth(), 5);
    const maxDate = new Date(now.getFullYear(), now.getMonth(), 25);
    const [date, setDate] = useState<DatePickerValue>(new Date(now.getFullYear(), now.getMonth(), 12));
    return <DatePicker label="Delivery Window (5th - 25th this month)" placeholder="Select within delivery window" value={date} onChange={setDate} minDate={minDate} maxDate={maxDate} helperText="Dates outside 5th-25th are disabled" />;
  }
}`,...(Z=(X=P.parameters)==null?void 0:X.docs)==null?void 0:Z.source}}};var ee,te,ae;M.parameters={...M.parameters,docs:{...(ee=M.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  render: () => {
    const [date, setDate] = useState<DatePickerValue>(new Date());
    return <DatePicker label="EU Calendar (Monday Start)" firstDayOfWeek={1} dateFormat="DD/MM/YYYY" value={date} onChange={setDate} helperText="Week begins on Monday (Mo, Tu, We, Th, Fr, Sa, Su)" />;
  }
}`,...(ae=(te=M.parameters)==null?void 0:te.docs)==null?void 0:ae.source}}};var re,ne,se;T.parameters={...T.parameters,docs:{...(re=T.parameters)==null?void 0:re.docs,source:{originalSource:`{
  render: () => {
    const [d1, setD1] = useState<DatePickerValue>(new Date());
    const [d2, setD2] = useState<DatePickerValue>(new Date());
    return <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem"
    }}>\r
        <DatePicker label="US Format (MM/DD/YYYY)" dateFormat="MM/DD/YYYY" value={d1} onChange={setD1} />\r
        <DatePicker label="EU Format (DD/MM/YYYY)" dateFormat="DD/MM/YYYY" value={d2} onChange={setD2} />\r
      </div>;
  }
}`,...(se=(ne=T.parameters)==null?void 0:ne.docs)==null?void 0:se.source}}};var le,oe,ie;F.parameters={...F.parameters,docs:{...(le=F.parameters)==null?void 0:le.docs,source:{originalSource:`{
  args: {
    label: "Event Start Date",
    placeholder: "Select starting date"
  },
  render: args => {
    const [date, setDate] = useState<DatePickerValue>(new Date());
    return <DatePicker {...args} value={date} onApply={d => alert(\`Applied date: \${JSON.stringify(d)}\`)} onCancel={() => alert("Selection cancelled")} />;
  }
}`,...(ie=(oe=F.parameters)==null?void 0:oe.docs)==null?void 0:ie.source}}};var de,ue,ce;V.parameters={...V.parameters,docs:{...(de=V.parameters)==null?void 0:de.docs,source:{originalSource:`{
  args: {
    label: "Date of Birth (No Future Dates)",
    disableFutureDates: true,
    placeholder: "Pick a past date"
  },
  render: args => {
    const [date, setDate] = useState<DatePickerValue>(new Date());
    return <DatePicker {...args} value={date} onChange={setDate} />;
  }
}`,...(ce=(ue=V.parameters)==null?void 0:ue.docs)==null?void 0:ce.source}}};var pe,me,De;j.parameters={...j.parameters,docs:{...(pe=j.parameters)==null?void 0:pe.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem"
  }}>\r
      <DatePicker label="Disabled DatePicker" placeholder="Cannot interact" disabled value={new Date()} />\r
      <DatePicker label="Required Appointment Date" placeholder="Pick date" required hasError helperText="Please select an available appointment slot" />\r
    </div>
}`,...(De=(me=j.parameters)==null?void 0:me.docs)==null?void 0:De.source}}};const ht=["Default","RangeWithPresentFeature","HotelBookingRange","WithQuickPresets","MinAndMaxConstraints","MondayFirstDayOfWeek","CustomFormats","WithApplyCancelActions","DisableFutureDates","DisabledAndErrorStates"];export{T as CustomFormats,b as Default,V as DisableFutureDates,j as DisabledAndErrorStates,Y as HotelBookingRange,P as MinAndMaxConstraints,M as MondayFirstDayOfWeek,k as RangeWithPresentFeature,F as WithApplyCancelActions,S as WithQuickPresets,ht as __namedExportsOrder,yt as default};
