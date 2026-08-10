import{j as r}from"./jsx-runtime-D_zvdyIk.js";const T={sm:40,md:64,lg:96,xl:128};function e({progress:D=0,type:k="bar",size:s="md",variant:y="primary",showLabel:u=!1,label:l,showValue:g=!1,className:h="",barClassName:f="",strokeWidth:W}){const t=Math.min(Math.max(D,0),100);if(k==="circular"){const a=T[s],p=W??(s==="sm"?4:s==="md"?6:s==="lg"?8:10),m=(a-p)/2,d=2*Math.PI*m,$=d-t/100*d;return r.jsxs("div",{className:`gy-progress gy-progress--circular gy-progress--${s} ${h}`,children:[l&&r.jsx("div",{className:"gy-progress__header gy-progress__header--circular",children:r.jsx("span",{className:"gy-progress__label",children:l})}),r.jsxs("div",{className:`gy-progress-circular gy-progress-circular--${s} gy-progress-circular--${y}`,children:[r.jsxs("svg",{width:a,height:a,viewBox:`0 0 ${a} ${a}`,className:"gy-progress-circular__svg",children:[r.jsx("circle",{className:"gy-progress-circular__bg",cx:a/2,cy:a/2,r:m,strokeWidth:p}),r.jsx("circle",{className:`gy-progress-circular__fill ${f}`,cx:a/2,cy:a/2,r:m,strokeWidth:p,strokeDasharray:d,strokeDashoffset:$,strokeLinecap:"round"})]}),(g||u)&&r.jsx("div",{className:"gy-progress-circular__content",children:r.jsxs("span",{className:"gy-progress__value",children:[Math.round(t),"%"]})})]})]})}return r.jsxs("div",{className:`gy-progress gy-progress--${s} ${h}`,children:[(l||u||g)&&r.jsxs("div",{className:"gy-progress__header",children:[l&&r.jsx("span",{className:"gy-progress__label",children:l}),(g||u)&&r.jsxs("span",{className:"gy-progress__value",children:[Math.round(t),"%"]})]}),r.jsx("div",{className:`gy-progress__track gy-progress__track--${s}`,role:"progressbar","aria-valuenow":t,"aria-valuemin":0,"aria-valuemax":100,"aria-label":l??"Progress",children:r.jsx("div",{className:`gy-progress__bar gy-progress__bar--${y} ${f}`,style:{width:`${t}%`}})})]})}e.__docgenInfo={description:"",methods:[],displayName:"ProgressBar",props:{progress:{required:!1,tsType:{name:"number"},description:"Current progress value (0-100)",defaultValue:{value:"0",computed:!1}},type:{required:!1,tsType:{name:"union",raw:'"bar" | "circular"',elements:[{name:"literal",value:'"bar"'},{name:"literal",value:'"circular"'}]},description:"Display type: linear bar or circular ring",defaultValue:{value:'"bar"',computed:!1}},size:{required:!1,tsType:{name:"union",raw:'"sm" | "md" | "lg" | "xl"',elements:[{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'},{name:"literal",value:'"xl"'}]},description:"Height of the bar / diameter of the circle",defaultValue:{value:'"md"',computed:!1}},variant:{required:!1,tsType:{name:"union",raw:`| "primary"\r
| "success"\r
| "warning"\r
| "danger"\r
| "info"\r
| "gradient"\r
| "indigo"`,elements:[{name:"literal",value:'"primary"'},{name:"literal",value:'"success"'},{name:"literal",value:'"warning"'},{name:"literal",value:'"danger"'},{name:"literal",value:'"info"'},{name:"literal",value:'"gradient"'},{name:"literal",value:'"indigo"'}]},description:"Color variant",defaultValue:{value:'"primary"',computed:!1}},showLabel:{required:!1,tsType:{name:"boolean"},description:"Whether to show the percentage label",defaultValue:{value:"false",computed:!1}},label:{required:!1,tsType:{name:"string"},description:"Custom label text to show above the bar"},showValue:{required:!1,tsType:{name:"boolean"},description:"Whether to show the progress value",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Custom class name for the container",defaultValue:{value:'""',computed:!1}},barClassName:{required:!1,tsType:{name:"string"},description:"Custom class name for the bar itself",defaultValue:{value:'""',computed:!1}},strokeWidth:{required:!1,tsType:{name:"number"},description:"Stroke width for circular type"}}};const z={title:"Galyan UI/ProgressBar",component:e,tags:["autodocs"],argTypes:{progress:{control:{type:"range",min:0,max:100,step:1},description:"Current progress percentage value (0-100)",table:{type:{summary:"number"},defaultValue:{summary:"0"}}},type:{control:"select",options:["bar","circular"],description:"Display type: linear bar or circular ring",table:{type:{summary:"'bar' | 'circular'"},defaultValue:{summary:"'bar'"}}},size:{control:"select",options:["sm","md","lg","xl"],description:"Size preset for bar height or circle diameter",table:{type:{summary:"'sm' | 'md' | 'lg' | 'xl'"},defaultValue:{summary:"'md'"}}},variant:{control:"select",options:["primary","success","warning","danger","info","gradient","indigo"],description:"Color theme variant preset",table:{type:{summary:"'primary' | 'success' | 'warning' | 'danger' | 'info' | 'gradient' | 'indigo'"},defaultValue:{summary:"'primary'"}}},showLabel:{control:"boolean",description:"Show percentage label",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},showValue:{control:"boolean",description:"Show numerical progress value percentage",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},label:{control:"text",description:"Custom label text above progress bar",table:{type:{summary:"string"}}},strokeWidth:{control:"number",description:"Custom stroke width for circular type ring",table:{type:{summary:"number"}}},className:{control:"text",description:"Additional CSS class names for container",table:{type:{summary:"string"}}},barClassName:{control:"text",description:"Additional CSS class names for progress bar fill",table:{type:{summary:"string"}}}}},n={args:{progress:65,type:"bar",size:"md",variant:"primary",label:"Downloading update",showValue:!0}},i={args:{progress:78,type:"circular",size:"lg",variant:"gradient",label:"Storage",showValue:!0}},o={render:()=>r.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem",maxWidth:"500px"},children:[r.jsx(e,{progress:75,variant:"primary",label:"Primary Progress",showValue:!0}),r.jsx(e,{progress:60,variant:"success",label:"Success Progress",showValue:!0}),r.jsx(e,{progress:45,variant:"warning",label:"Warning Progress",showValue:!0}),r.jsx(e,{progress:90,variant:"danger",label:"Danger Progress",showValue:!0}),r.jsx(e,{progress:80,variant:"info",label:"Info Progress",showValue:!0}),r.jsx(e,{progress:65,variant:"indigo",label:"Indigo Progress",showValue:!0}),r.jsx(e,{progress:85,variant:"gradient",label:"Gradient Progress",showValue:!0})]})},c={render:()=>r.jsxs("div",{style:{display:"flex",gap:"2rem",alignItems:"center",flexWrap:"wrap"},children:[r.jsx(e,{type:"circular",progress:75,size:"sm",variant:"primary",showValue:!0}),r.jsx(e,{type:"circular",progress:85,size:"md",variant:"indigo",showValue:!0,label:"Disk"}),r.jsx(e,{type:"circular",progress:92,size:"lg",variant:"gradient",showValue:!0,label:"Score"}),r.jsx(e,{type:"circular",progress:60,size:"xl",variant:"success",showValue:!0,label:"Battery"})]})};var v,b,x;n.parameters={...n.parameters,docs:{...(v=n.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    progress: 65,
    type: "bar",
    size: "md",
    variant: "primary",
    label: "Downloading update",
    showValue: true
  }
}`,...(x=(b=n.parameters)==null?void 0:b.docs)==null?void 0:x.source}}};var w,V,_;i.parameters={...i.parameters,docs:{...(w=i.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    progress: 78,
    type: "circular",
    size: "lg",
    variant: "gradient",
    label: "Storage",
    showValue: true
  }
}`,...(_=(V=i.parameters)==null?void 0:V.docs)==null?void 0:_.source}}};var P,j,B;o.parameters={...o.parameters,docs:{...(P=o.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    maxWidth: "500px"
  }}>\r
      <ProgressBar progress={75} variant="primary" label="Primary Progress" showValue />\r
      <ProgressBar progress={60} variant="success" label="Success Progress" showValue />\r
      <ProgressBar progress={45} variant="warning" label="Warning Progress" showValue />\r
      <ProgressBar progress={90} variant="danger" label="Danger Progress" showValue />\r
      <ProgressBar progress={80} variant="info" label="Info Progress" showValue />\r
      <ProgressBar progress={65} variant="indigo" label="Indigo Progress" showValue />\r
      <ProgressBar progress={85} variant="gradient" label="Gradient Progress" showValue />\r
    </div>
}`,...(B=(j=o.parameters)==null?void 0:j.docs)==null?void 0:B.source}}};var S,N,C;c.parameters={...c.parameters,docs:{...(S=c.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: "2rem",
    alignItems: "center",
    flexWrap: "wrap"
  }}>\r
      <ProgressBar type="circular" progress={75} size="sm" variant="primary" showValue />\r
      <ProgressBar type="circular" progress={85} size="md" variant="indigo" showValue label="Disk" />\r
      <ProgressBar type="circular" progress={92} size="lg" variant="gradient" showValue label="Score" />\r
      <ProgressBar type="circular" progress={60} size="xl" variant="success" showValue label="Battery" />\r
    </div>
}`,...(C=(N=c.parameters)==null?void 0:N.docs)==null?void 0:C.source}}};const I=["DefaultLinearBar","DefaultCircularRing","LinearBarVariants","CircularRingVariants"];export{c as CircularRingVariants,i as DefaultCircularRing,n as DefaultLinearBar,o as LinearBarVariants,I as __namedExportsOrder,z as default};
