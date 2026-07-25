import{j as m}from"./jsx-runtime-D_zvdyIk.js";import{r as p}from"./index-JhL3uwfD.js";import{C as s}from"./Calendar-CHA_DCFV.js";const C={title:"Galyan UI/Calendar",component:s,parameters:{layout:"centered",docs:{description:{component:"Full-featured interactive grid calendar supporting single date selection and date range picking."}}},tags:["autodocs"],argTypes:{mode:{control:"inline-radio",options:["single","range"]},firstDayOfWeek:{control:"inline-radio",options:[0,1]}}},e={args:{mode:"single",firstDayOfWeek:0},render:n=>{const[r,t]=p.useState(new Date);return m.jsx(s,{...n,value:r,onChange:t})}},a={args:{mode:"range",firstDayOfWeek:0},render:n=>{const[r,t]=p.useState([new Date(2026,6,10),new Date(2026,6,20)]);return m.jsx(s,{...n,value:r,onChange:t})}};var o,d,g;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {
    mode: 'single',
    firstDayOfWeek: 0
  },
  render: args => {
    const [date, setDate] = useState<Date | [Date, Date]>(new Date());
    return <Calendar {...args} value={date} onChange={setDate} />;
  }
}`,...(g=(d=e.parameters)==null?void 0:d.docs)==null?void 0:g.source}}};var i,c,l;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    mode: 'range',
    firstDayOfWeek: 0
  },
  render: args => {
    const [range, setRange] = useState<Date | [Date, Date]>([new Date(2026, 6, 10), new Date(2026, 6, 20)]);
    return <Calendar {...args} value={range} onChange={setRange} />;
  }
}`,...(l=(c=a.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};const y=["SingleMode","RangeMode"];export{a as RangeMode,e as SingleMode,y as __namedExportsOrder,C as default};
