import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as S}from"./index-JhL3uwfD.js";const T={info:e.jsx("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"currentColor",children:e.jsx("path",{d:"M8 1a7 7 0 100 14A7 7 0 008 1zm0 3a1 1 0 110 2 1 1 0 010-2zm0 3a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 018 7z"})}),success:e.jsx("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"currentColor",children:e.jsx("path",{d:"M8 1a7 7 0 100 14A7 7 0 008 1zm3.78 5.78a.75.75 0 00-1.06-1.06L7 9.44 5.28 7.72a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.06 0l4.25-4.25z"})}),warning:e.jsx("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"currentColor",children:e.jsx("path",{d:"M8 1.5a.75.75 0 01.65.375l6 10.5A.75.75 0 0114 13.5H2a.75.75 0 01-.65-1.125l6-10.5A.75.75 0 018 1.5zm0 4a.75.75 0 01.75.75v3a.75.75 0 01-1.5 0v-3A.75.75 0 018 5.5zm0 6.5a1 1 0 110-2 1 1 0 010 2z"})}),danger:e.jsx("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"currentColor",children:e.jsx("path",{d:"M8 1a7 7 0 100 14A7 7 0 008 1zm0 3a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 018 4zm0 7.5a1 1 0 110-2 1 1 0 010 2z"})}),neutral:e.jsx("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"currentColor",children:e.jsx("path",{d:"M8 1a7 7 0 100 14A7 7 0 008 1zm0 3a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 018 4zm0 7.5a1 1 0 110-2 1 1 0 010 2z"})})};function b({variant:t="info",layout:j="inline",title:l,description:N,children:z,icon:A,dismissible:_=!1,onDismiss:i,className:C=""}){const[R,q]=S.useState(!1);if(R)return null;const B=()=>{q(!0),i==null||i()},o=z??N;return e.jsxs("div",{className:["gy-banner",`gy-banner--${t}`,`gy-banner--${j}`,C].filter(Boolean).join(" "),role:"alert",children:[e.jsx("span",{className:"gy-banner__icon",children:A??T[t]}),e.jsxs("div",{className:"gy-banner__content",children:[l&&e.jsx("div",{className:"gy-banner__title",children:l}),o&&e.jsx("div",{className:"gy-banner__description",children:o})]}),_&&e.jsx("button",{className:"gy-banner__close",onClick:B,"aria-label":"Dismiss",children:e.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 12 12",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",children:[e.jsx("line",{x1:"1",y1:"1",x2:"11",y2:"11"}),e.jsx("line",{x1:"11",y1:"1",x2:"1",y2:"11"})]})})]})}b.__docgenInfo={description:"",methods:[],displayName:"Banner",props:{variant:{required:!1,tsType:{name:"union",raw:"'info' | 'success' | 'warning' | 'danger' | 'neutral'",elements:[{name:"literal",value:"'info'"},{name:"literal",value:"'success'"},{name:"literal",value:"'warning'"},{name:"literal",value:"'danger'"},{name:"literal",value:"'neutral'"}]},description:"",defaultValue:{value:"'info'",computed:!1}},layout:{required:!1,tsType:{name:"union",raw:"'inline' | 'full'",elements:[{name:"literal",value:"'inline'"},{name:"literal",value:"'full'"}]},description:"",defaultValue:{value:"'inline'",computed:!1}},title:{required:!1,tsType:{name:"string"},description:""},description:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},icon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},dismissible:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},onDismiss:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}}}};const k={title:"Components/Banner",component:b,tags:["autodocs"]},a={args:{variant:"info",title:"Update Available",children:"A new software update is available for your application.",dismissible:!0}},r={args:{variant:"success",title:"Order Confirmed",children:"Your payment was processed successfully.",dismissible:!0}},s={args:{variant:"warning",title:"Storage Nearly Full",children:"You are using 95% of your available storage quota.",dismissible:!0}},n={args:{variant:"danger",title:"Connection Error",children:"Failed to reach the authentication service.",dismissible:!0}};var c,d,u;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    variant: 'info',
    title: 'Update Available',
    children: 'A new software update is available for your application.',
    dismissible: true
  }
}`,...(u=(d=a.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};var m,p,g;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    variant: 'success',
    title: 'Order Confirmed',
    children: 'Your payment was processed successfully.',
    dismissible: true
  }
}`,...(g=(p=r.parameters)==null?void 0:p.docs)==null?void 0:g.source}}};var f,h,v;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    variant: 'warning',
    title: 'Storage Nearly Full',
    children: 'You are using 95% of your available storage quota.',
    dismissible: true
  }
}`,...(v=(h=s.parameters)==null?void 0:h.docs)==null?void 0:v.source}}};var y,x,w;n.parameters={...n.parameters,docs:{...(y=n.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    variant: 'danger',
    title: 'Connection Error',
    children: 'Failed to reach the authentication service.',
    dismissible: true
  }
}`,...(w=(x=n.parameters)==null?void 0:x.docs)==null?void 0:w.source}}};const F=["Info","Success","Warning","Danger"];export{n as Danger,a as Info,r as Success,s as Warning,F as __namedExportsOrder,k as default};
