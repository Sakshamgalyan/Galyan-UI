import{j as n}from"./jsx-runtime-D_zvdyIk.js";import{r as s}from"./index-CC0H-XIk.js";import{C as t}from"./Calendar-CMSAYgbq.js";const I={title:"Galyan UI/Calendar",component:t,parameters:{layout:"centered",docs:{description:{component:"Full-featured interactive grid calendar supporting single date selection and date range picking."}}},tags:["autodocs"],argTypes:{mode:{control:"inline-radio",options:["single","range"]},firstDayOfWeek:{control:"inline-radio",options:[0,1]}}},o={args:{mode:"single",firstDayOfWeek:0},render:a=>{const[e,r]=s.useState(new Date(2026,6,15));return n.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem",alignItems:"center"},children:[n.jsx(t,{...a,value:e,onChange:r}),n.jsxs("span",{style:{fontSize:"0.875rem",color:"var(--gy-text-muted)"},children:["Selected: ",Array.isArray(e)?"":e==null?void 0:e.toLocaleDateString()]})]})}},i={args:{mode:"range",firstDayOfWeek:0},render:a=>{const[e,r]=s.useState([new Date(2026,6,10),new Date(2026,6,20)]);return n.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem",alignItems:"center"},children:[n.jsx(t,{...a,value:e,onChange:r}),n.jsxs("span",{style:{fontSize:"0.875rem",color:"var(--gy-text-muted)"},children:["Range: ",Array.isArray(e)&&e[0]?e[0].toLocaleDateString():""," –"," ",Array.isArray(e)&&e[1]?e[1].toLocaleDateString():""]})]})}},l={args:{mode:"single",firstDayOfWeek:0},render:a=>{const e=new Date(2026,6,15),r=new Date(2026,6,5),c=new Date(2026,6,25),[A,W]=s.useState(e);return n.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem",alignItems:"center"},children:[n.jsx(t,{...a,value:A,minDate:r,maxDate:c,onChange:W}),n.jsxs("span",{style:{fontSize:"0.875rem",color:"var(--gy-text-muted)"},children:["Selectable window: ",r.toLocaleDateString()," to ",c.toLocaleDateString()]})]})}},g={args:{mode:"range",firstDayOfWeek:1},render:a=>{const[e,r]=s.useState([new Date(2026,6,6),new Date(2026,6,12)]);return n.jsx(t,{...a,value:e,onChange:r})}},d={render:()=>{const[a,e]=s.useState([new Date(2026,6,8),new Date(2026,6,22)]);return n.jsxs("div",{style:{padding:"2rem",background:"#0f172a",borderRadius:"1rem",display:"flex",flexDirection:"column",alignItems:"center",gap:"1rem"},"data-color-mode":"dark",children:[n.jsx("h4",{style:{margin:0,color:"#f8fafc",fontSize:"0.95rem"},children:"Gentle & Soft Dark Range Highlight"}),n.jsx(t,{mode:"range",value:a,onChange:e})]})}};var m,D,u;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    mode: "single",
    firstDayOfWeek: 0
  },
  render: args => {
    const [date, setDate] = useState<Date | [Date, Date]>(new Date(2026, 6, 15));
    return <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      alignItems: "center"
    }}>\r
        <Calendar {...args} value={date} onChange={setDate} />\r
        <span style={{
        fontSize: "0.875rem",
        color: "var(--gy-text-muted)"
      }}>\r
          Selected: {Array.isArray(date) ? "" : date?.toLocaleDateString()}\r
        </span>\r
      </div>;
  }
}`,...(u=(D=o.parameters)==null?void 0:D.docs)==null?void 0:u.source}}};var p,f,y;i.parameters={...i.parameters,docs:{...(p=i.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    mode: "range",
    firstDayOfWeek: 0
  },
  render: args => {
    const [range, setRange] = useState<Date | [Date, Date]>([new Date(2026, 6, 10), new Date(2026, 6, 20)]);
    return <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      alignItems: "center"
    }}>\r
        <Calendar {...args} value={range} onChange={setRange} />\r
        <span style={{
        fontSize: "0.875rem",
        color: "var(--gy-text-muted)"
      }}>\r
          Range: {Array.isArray(range) && range[0] ? range[0].toLocaleDateString() : ""} –{" "}\r
          {Array.isArray(range) && range[1] ? range[1].toLocaleDateString() : ""}\r
        </span>\r
      </div>;
  }
}`,...(y=(f=i.parameters)==null?void 0:f.docs)==null?void 0:y.source}}};var x,S,h;l.parameters={...l.parameters,docs:{...(x=l.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    mode: "single",
    firstDayOfWeek: 0
  },
  render: args => {
    const today = new Date(2026, 6, 15);
    const min = new Date(2026, 6, 5);
    const max = new Date(2026, 6, 25);
    const [date, setDate] = useState<Date | [Date, Date]>(today);
    return <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      alignItems: "center"
    }}>\r
        <Calendar {...args} value={date} minDate={min} maxDate={max} onChange={setDate} />\r
        <span style={{
        fontSize: "0.875rem",
        color: "var(--gy-text-muted)"
      }}>\r
          Selectable window: {min.toLocaleDateString()} to {max.toLocaleDateString()}\r
        </span>\r
      </div>;
  }
}`,...(h=(S=l.parameters)==null?void 0:S.docs)==null?void 0:h.source}}};var v,w,C;g.parameters={...g.parameters,docs:{...(v=g.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    mode: "range",
    firstDayOfWeek: 1
  },
  render: args => {
    const [range, setRange] = useState<Date | [Date, Date]>([new Date(2026, 6, 6), new Date(2026, 6, 12)]);
    return <Calendar {...args} value={range} onChange={setRange} />;
  }
}`,...(C=(w=g.parameters)==null?void 0:w.docs)==null?void 0:C.source}}};var R,k,j;d.parameters={...d.parameters,docs:{...(R=d.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: () => {
    const [range, setRange] = useState<Date | [Date, Date]>([new Date(2026, 6, 8), new Date(2026, 6, 22)]);
    return <div style={{
      padding: "2rem",
      background: "#0f172a",
      borderRadius: "1rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "1rem"
    }} data-color-mode="dark">\r
        <h4 style={{
        margin: 0,
        color: "#f8fafc",
        fontSize: "0.95rem"
      }}>\r
          Gentle & Soft Dark Range Highlight\r
        </h4>\r
        <Calendar mode="range" value={range} onChange={setRange} />\r
      </div>;
  }
}`,...(j=(k=d.parameters)==null?void 0:k.docs)==null?void 0:j.source}}};const z=["SingleMode","RangeMode","WithMinMaxConstraints","MondayFirst","SoftRangeHighlightDarkCard"];export{g as MondayFirst,i as RangeMode,o as SingleMode,d as SoftRangeHighlightDarkCard,l as WithMinMaxConstraints,z as __namedExportsOrder,I as default};
