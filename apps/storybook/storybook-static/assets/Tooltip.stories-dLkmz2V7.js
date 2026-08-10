import{j as t}from"./jsx-runtime-D_zvdyIk.js";import{r as m}from"./index-CC0H-XIk.js";import{T as q}from"./Typography-BPjUOFhO.js";import{B as o}from"./Button-PdOFK0Ua.js";const L=()=>t.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-label":"Info",style:{cursor:"pointer",display:"inline-block",verticalAlign:"middle"},children:[t.jsx("circle",{cx:"12",cy:"12",r:"10"}),t.jsx("line",{x1:"12",y1:"16",x2:"12",y2:"12"}),t.jsx("line",{x1:"12",y1:"8",x2:"12.01",y2:"8"})]});function e({content:l,children:C,target:N,position:H="top",delay:S=150,width:p,className:I=""}){const[_,c]=m.useState(!1),n=m.useRef(null),d=()=>{n.current=setTimeout(()=>{c(!0)},S)},u=()=>{n.current&&(clearTimeout(n.current),n.current=null),c(!1)},k=N??C??t.jsx(L,{});return t.jsxs("div",{className:"gy-tooltip-wrapper",onMouseEnter:d,onMouseLeave:u,onFocus:d,onBlur:u,children:[k,_&&t.jsxs("div",{className:`gy-tooltip gy-tooltip--${H} ${I}`,style:p?{width:p,maxWidth:p}:void 0,role:"tooltip",children:[t.jsx("div",{className:"gy-tooltip__content",children:typeof l=="string"?t.jsx(q,{variant:"small",weight:"medium",textColor:"inherit",children:l}):l}),t.jsx("div",{className:"gy-tooltip__arrow"})]})]})}e.__docgenInfo={description:"",methods:[],displayName:"Tooltip",props:{content:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Content displayed inside the tooltip popover"},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Optional target element that triggers the tooltip"},target:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Optional target element (alias for children)"},position:{required:!1,tsType:{name:"union",raw:'"top" | "bottom" | "left" | "right"',elements:[{name:"literal",value:'"top"'},{name:"literal",value:'"bottom"'},{name:"literal",value:'"left"'},{name:"literal",value:'"right"'}]},description:"Positioning relative to target element",defaultValue:{value:'"top"',computed:!1}},delay:{required:!1,tsType:{name:"number"},description:"Delay in milliseconds before showing tooltip on hover",defaultValue:{value:"150",computed:!1}},width:{required:!1,tsType:{name:"string"},description:"Custom width for the tooltip popup"},className:{required:!1,tsType:{name:"string"},description:"Custom class name for the tooltip popover container",defaultValue:{value:'""',computed:!1}}}};const E={title:"Galyan UI/Tooltip",component:e,tags:["autodocs"],argTypes:{position:{control:"select",options:["top","bottom","left","right"],description:"Tooltip popup positioning relative to target",table:{type:{summary:"'top' | 'bottom' | 'left' | 'right'"},defaultValue:{summary:"'top'"}}},delay:{control:"number",description:"Delay in milliseconds before showing tooltip on hover"},width:{control:"text",description:"Custom max width for the tooltip container"},content:{control:"text",description:"Content inside the tooltip popup"}}},i={args:{content:"Helpful tooltip information",position:"top",delay:150}},r={args:{content:"Clicking or hovering this button shows additional context",position:"top",children:t.jsx(o,{variant:"primary",children:"Hover Me"})}},a={render:()=>t.jsxs("div",{style:{display:"flex",gap:"1.5rem",justifyContent:"center",padding:"3rem 1rem"},children:[t.jsx(e,{content:"Tooltip on top",position:"top",children:t.jsx(o,{variant:"secondary",children:"Hover Top"})}),t.jsx(e,{content:"Tooltip on bottom",position:"bottom",children:t.jsx(o,{variant:"secondary",children:"Hover Bottom"})}),t.jsx(e,{content:"Tooltip on left",position:"left",children:t.jsx(o,{variant:"secondary",children:"Hover Left"})}),t.jsx(e,{content:"Tooltip on right",position:"right",children:t.jsx(o,{variant:"secondary",children:"Hover Right"})})]})},s={render:()=>t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.5rem",padding:"2rem"},children:[t.jsx("span",{children:"Feature info"}),t.jsx(e,{content:"Standalone tooltip without children prop!",position:"right"})]})};var h,g,f;i.parameters={...i.parameters,docs:{...(h=i.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    content: "Helpful tooltip information",
    position: "top",
    delay: 150
  }
}`,...(f=(g=i.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};var y,v,x;r.parameters={...r.parameters,docs:{...(y=r.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    content: "Clicking or hovering this button shows additional context",
    position: "top",
    children: <Button variant="primary">Hover Me</Button>
  }
}`,...(x=(v=r.parameters)==null?void 0:v.docs)==null?void 0:x.source}}};var T,j,b;a.parameters={...a.parameters,docs:{...(T=a.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: "1.5rem",
    justifyContent: "center",
    padding: "3rem 1rem"
  }}>
      <Tooltip content="Tooltip on top" position="top">
        <Button variant="secondary">Hover Top</Button>
      </Tooltip>
      <Tooltip content="Tooltip on bottom" position="bottom">
        <Button variant="secondary">Hover Bottom</Button>
      </Tooltip>
      <Tooltip content="Tooltip on left" position="left">
        <Button variant="secondary">Hover Left</Button>
      </Tooltip>
      <Tooltip content="Tooltip on right" position="right">
        <Button variant="secondary">Hover Right</Button>
      </Tooltip>
    </div>
}`,...(b=(j=a.parameters)==null?void 0:j.docs)==null?void 0:b.source}}};var w,R,B;s.parameters={...s.parameters,docs:{...(w=s.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "2rem"
  }}>
      <span>Feature info</span>
      <Tooltip content="Standalone tooltip without children prop!" position="right" />
    </div>
}`,...(B=(R=s.parameters)==null?void 0:R.docs)==null?void 0:B.source}}};const F=["Default","WithCustomTarget","Positions","StandaloneWithoutChildren"];export{i as Default,a as Positions,s as StandaloneWithoutChildren,r as WithCustomTarget,F as __namedExportsOrder,E as default};
