import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{R as I,T as u,n as m}from"./_baseAssignValue-BDuV01YI.js";import{P as U,a as X}from"./PieChart-Dnt0ly_f.js";import{a as Y,B as H}from"./generateCategoricalChart-a1QKwuT8.js";import{A as Q}from"./AreaChart-D6DvpkV0.js";import{C,X as b,Y as j}from"./YAxis-UKDpoztY.js";import{A as Z}from"./Area-CFbnRuNJ.js";import{B as ee}from"./BarChart-DxnwYVmn.js";import{L as re}from"./LineChart-B-49b4ZB.js";import{L as ae}from"./Line-BIdihWvk.js";import"./index-CC0H-XIk.js";import"./tiny-invariant-CopsF_GD.js";import"./PolarAngleAxis-DhxfU7vt.js";import"./Polygon-CZsXK870.js";const t=["var(--gy-primary)","var(--gy-success)","var(--gy-warning)","var(--gy-danger)","var(--gy-info)","#8b5cf6","#ec4899"];function W({type:f,data:n,xAxisKey:x,series:o=[],nameKey:E,valueKey:J,height:M=300,showGrid:v=!0,showLegend:i=!0,className:N=""}){const s={stroke:"var(--gy-border-strong)",tick:{fill:"var(--gy-text-subtle)",fontSize:12},tickLine:{stroke:"var(--gy-border)"}},l={contentStyle:{backgroundColor:"var(--gy-surface)",borderColor:"var(--gy-border)",borderRadius:"var(--gy-radius-lg)",boxShadow:"var(--gy-shadow-md)",color:"var(--gy-text)",fontSize:13},itemStyle:{color:"var(--gy-text)"}},F=()=>{switch(f){case"line":return e.jsxs(re,{data:n,children:[v&&e.jsx(C,{strokeDasharray:"3 3",stroke:"var(--gy-border)",vertical:!1}),e.jsx(b,{dataKey:x,...s}),e.jsx(j,{...s}),e.jsx(u,{...l}),i&&e.jsx(m,{wrapperStyle:{fontSize:12}}),o.map((r,a)=>e.jsx(ae,{type:"monotone",dataKey:r.key,name:r.name??r.key,stroke:r.color??t[a%t.length],strokeWidth:2,dot:{r:4,strokeWidth:2,fill:"var(--gy-surface)"},activeDot:{r:6,strokeWidth:0}},r.key))]});case"bar":return e.jsxs(ee,{data:n,children:[v&&e.jsx(C,{strokeDasharray:"3 3",stroke:"var(--gy-border)",vertical:!1}),e.jsx(b,{dataKey:x,...s}),e.jsx(j,{...s}),e.jsx(u,{...l,cursor:{fill:"var(--gy-background-muted)"}}),i&&e.jsx(m,{wrapperStyle:{fontSize:12}}),o.map((r,a)=>e.jsx(H,{dataKey:r.key,name:r.name??r.key,fill:r.color??t[a%t.length],radius:[4,4,0,0]},r.key))]});case"area":return e.jsxs(Q,{data:n,children:[e.jsx("defs",{children:o.map((r,a)=>{const d=r.color??t[a%t.length];return e.jsxs("linearGradient",{id:`grad-${r.key}`,x1:"0",y1:"0",x2:"0",y2:"1",children:[e.jsx("stop",{offset:"5%",stopColor:d,stopOpacity:.3}),e.jsx("stop",{offset:"95%",stopColor:d,stopOpacity:0})]},`grad-${r.key}`)})}),v&&e.jsx(C,{strokeDasharray:"3 3",stroke:"var(--gy-border)",vertical:!1}),e.jsx(b,{dataKey:x,...s}),e.jsx(j,{...s}),e.jsx(u,{...l}),i&&e.jsx(m,{wrapperStyle:{fontSize:12}}),o.map((r,a)=>{const d=r.color??t[a%t.length];return e.jsx(Z,{type:"monotone",dataKey:r.key,name:r.name??r.key,stroke:d,strokeWidth:2,fillOpacity:1,fill:`url(#grad-${r.key})`},r.key)})]});case"pie":case"donut":return e.jsxs(U,{children:[e.jsx(u,{...l}),i&&e.jsx(m,{wrapperStyle:{fontSize:12}}),e.jsx(X,{data:n,dataKey:J,nameKey:E,cx:"50%",cy:"50%",innerRadius:f==="donut"?"60%":0,outerRadius:"80%",stroke:"var(--gy-surface)",strokeWidth:2,paddingAngle:f==="donut"?2:0,children:n.map((r,a)=>e.jsx(Y,{fill:r.color??t[a%t.length]},`cell-${a}`))})]})}};return e.jsx("div",{className:`gy-chart ${N}`,style:{width:"100%",height:M},children:e.jsx(I,{width:"100%",height:"100%",children:F()})})}W.__docgenInfo={description:"",methods:[],displayName:"Chart",props:{type:{required:!0,tsType:{name:"union",raw:'"line" | "bar" | "area" | "pie" | "donut"',elements:[{name:"literal",value:'"line"'},{name:"literal",value:'"bar"'},{name:"literal",value:'"area"'},{name:"literal",value:'"pie"'},{name:"literal",value:'"donut"'}]},description:""},data:{required:!0,tsType:{name:"Array",elements:[{name:"any"}],raw:"any[]"},description:""},xAxisKey:{required:!1,tsType:{name:"string"},description:""},series:{required:!1,tsType:{name:"Array",elements:[{name:"ChartSeries"}],raw:"ChartSeries[]"},description:"",defaultValue:{value:"[]",computed:!1}},nameKey:{required:!1,tsType:{name:"string"},description:""},valueKey:{required:!1,tsType:{name:"string"},description:""},height:{required:!1,tsType:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}]},description:"",defaultValue:{value:"300",computed:!1}},showGrid:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},showLegend:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}}}};const fe={title:"Galyan UI/Chart",component:W,tags:["autodocs"],argTypes:{type:{control:"select",options:["line","bar","area","pie","donut"]},height:{control:"number"},showGrid:{control:"boolean"},showLegend:{control:"boolean"}}},k=[{month:"Jan",revenue:4500,expenses:2800,users:120},{month:"Feb",revenue:5200,expenses:3100,users:150},{month:"Mar",revenue:4900,expenses:3400,users:180},{month:"Apr",revenue:6300,expenses:4e3,users:220},{month:"May",revenue:5800,expenses:3800,users:260},{month:"Jun",revenue:7100,expenses:4200,users:310},{month:"Jul",revenue:8500,expenses:4900,users:380}],w=[{key:"revenue",name:"Revenue ($)",color:"var(--gy-primary)"},{key:"expenses",name:"Expenses ($)",color:"var(--gy-danger)"}],_=[{label:"Direct",share:45,color:"var(--gy-primary)"},{label:"Organic Search",share:25,color:"var(--gy-success)"},{label:"Referral",share:15,color:"var(--gy-warning)"},{label:"Social Media",share:15,color:"var(--gy-info)"}],c={name:"Line Chart",args:{type:"line",data:k,xAxisKey:"month",series:w,height:350,showGrid:!0,showLegend:!0}},h={name:"Bar Chart",args:{type:"bar",data:k,xAxisKey:"month",series:w,height:350,showGrid:!0,showLegend:!0}},p={name:"Area Chart",args:{type:"area",data:k,xAxisKey:"month",series:w,height:350,showGrid:!0,showLegend:!0}},y={name:"Pie Chart",args:{type:"pie",data:_,nameKey:"label",valueKey:"share",height:350,showGrid:!1,showLegend:!0}},g={name:"Donut Chart",args:{type:"donut",data:_,nameKey:"label",valueKey:"share",height:350,showGrid:!1,showLegend:!0}};var S,K,A;c.parameters={...c.parameters,docs:{...(S=c.parameters)==null?void 0:S.docs,source:{originalSource:`{
  name: "Line Chart",
  args: {
    type: "line",
    data: trendData,
    xAxisKey: "month",
    series: seriesConfig,
    height: 350,
    showGrid: true,
    showLegend: true
  }
}`,...(A=(K=c.parameters)==null?void 0:K.docs)==null?void 0:A.source}}};var L,D,T;h.parameters={...h.parameters,docs:{...(L=h.parameters)==null?void 0:L.docs,source:{originalSource:`{
  name: "Bar Chart",
  args: {
    type: "bar",
    data: trendData,
    xAxisKey: "month",
    series: seriesConfig,
    height: 350,
    showGrid: true,
    showLegend: true
  }
}`,...(T=(D=h.parameters)==null?void 0:D.docs)==null?void 0:T.source}}};var G,q,P;p.parameters={...p.parameters,docs:{...(G=p.parameters)==null?void 0:G.docs,source:{originalSource:`{
  name: "Area Chart",
  args: {
    type: "area",
    data: trendData,
    xAxisKey: "month",
    series: seriesConfig,
    height: 350,
    showGrid: true,
    showLegend: true
  }
}`,...(P=(q=p.parameters)==null?void 0:q.docs)==null?void 0:P.source}}};var R,B,O;y.parameters={...y.parameters,docs:{...(R=y.parameters)==null?void 0:R.docs,source:{originalSource:`{
  name: "Pie Chart",
  args: {
    type: "pie",
    data: shareData,
    nameKey: "label",
    valueKey: "share",
    height: 350,
    showGrid: false,
    showLegend: true
  }
}`,...(O=(B=y.parameters)==null?void 0:B.docs)==null?void 0:O.source}}};var $,z,V;g.parameters={...g.parameters,docs:{...($=g.parameters)==null?void 0:$.docs,source:{originalSource:`{
  name: "Donut Chart",
  args: {
    type: "donut",
    data: shareData,
    nameKey: "label",
    valueKey: "share",
    height: 350,
    showGrid: false,
    showLegend: true
  }
}`,...(V=(z=g.parameters)==null?void 0:z.docs)==null?void 0:V.source}}};const xe=["LineChartStory","BarChartStory","AreaChartStory","PieChartStory","DonutChartStory"];export{p as AreaChartStory,h as BarChartStory,g as DonutChartStory,c as LineChartStory,y as PieChartStory,xe as __namedExportsOrder,fe as default};
