import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as D,R as E}from"./index-CC0H-XIk.js";const L=()=>e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"3",strokeLinecap:"round",strokeLinejoin:"round",className:"gy-toggle__icon gy-toggle__icon--on",children:e.jsx("polyline",{points:"20 6 9 17 4 12"})}),O=()=>e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"3",strokeLinecap:"round",strokeLinejoin:"round",className:"gy-toggle__icon gy-toggle__icon--off",children:[e.jsx("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),e.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]}),a=D.forwardRef(({size:s="md",label:r,checked:n,withIcon:o=!1,icon:t,isDisabled:u=!1,className:T="",id:N,...R},C)=>{const S=E.useId(),m=N||S,q=["gy-toggle-wrapper",`gy-toggle--${s}`,u?"gy-toggle--disabled":"",T].filter(Boolean).join(" "),z=()=>o?t!=null&&t.on?e.jsx("span",{className:"gy-toggle__icon gy-toggle__icon--on",children:t.on}):e.jsx(L,{}):null,W=()=>o?t!=null&&t.off?e.jsx("span",{className:"gy-toggle__icon gy-toggle__icon--off",children:t.off}):e.jsx(O,{}):null;return e.jsxs("label",{className:q,htmlFor:m,children:[e.jsxs("div",{className:"gy-toggle__control",children:[e.jsx("input",{type:"checkbox",role:"switch",id:m,ref:C,className:"gy-toggle__input",checked:n,disabled:u,"aria-checked":n,...R}),e.jsxs("div",{className:"gy-toggle__track",children:[o&&e.jsxs("div",{className:"gy-toggle__track-icons",children:[z(),W()]}),e.jsx("div",{className:"gy-toggle__thumb"})]})]}),r&&e.jsx("span",{className:"gy-toggle__label",children:r})]})});a.displayName="Toggle";a.__docgenInfo={description:"",methods:[],displayName:"Toggle",props:{size:{required:!1,tsType:{name:"union",raw:'"sm" | "md" | "lg"',elements:[{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'}]},description:"Size variant of the toggle",defaultValue:{value:'"md"',computed:!1}},label:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Text label displayed next to the toggle"},withIcon:{required:!1,tsType:{name:"boolean"},description:"Whether to show icons inside the toggle thumb/track",defaultValue:{value:"false",computed:!1}},icon:{required:!1,tsType:{name:"signature",type:"object",raw:`{\r
  on: React.ReactNode;\r
  off: React.ReactNode;\r
}`,signature:{properties:[{key:"on",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!0}},{key:"off",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!0}}]}},description:"Custom icons for the on and off states"},isDisabled:{required:!1,tsType:{name:"boolean"},description:"If true, the toggle will be disabled",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Custom class for the wrapper",defaultValue:{value:'""',computed:!1}}},composes:["Omit"]};const F={title:"Galyan UI/Toggle",component:a,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{withIcon:{control:"boolean",description:"Whether to show icons inside the toggle"},label:{control:"text",description:"Text label displayed next to the toggle"},checked:{control:"boolean",description:"Controlled checked state"},isDisabled:{control:"boolean",description:"If true, the toggle will be disabled"}}},g=s=>{const[r,n]=D.useState(s.checked||!1);return e.jsx(a,{...s,checked:s.checked!==void 0?s.checked:r,onChange:o=>n(o.target.checked)})},l={args:{label:"Enable notifications"},render:s=>e.jsx(g,{...s})},c={args:{label:"Dark mode",withIcon:!0},render:s=>e.jsx(g,{...s})},i={args:{label:"Custom Theme",withIcon:!0,icon:{on:e.jsx("span",{style:{fontSize:"0.65rem"},children:"🌙"}),off:e.jsx("span",{style:{fontSize:"0.65rem"},children:"☀️"})}},render:s=>e.jsx(g,{...s})},d={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"},children:[e.jsx(a,{label:"Disabled off",isDisabled:!0}),e.jsx(a,{label:"Disabled on",isDisabled:!0,checked:!0}),e.jsx(a,{label:"Disabled with icon",isDisabled:!0,checked:!0,withIcon:!0})]})};var p,f,h;l.parameters={...l.parameters,docs:{...(p=l.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    label: "Enable notifications"
  },
  render: args => <InteractiveToggle {...args} />
}`,...(h=(f=l.parameters)==null?void 0:f.docs)==null?void 0:h.source}}};var b,x,y;c.parameters={...c.parameters,docs:{...(b=c.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    label: "Dark mode",
    withIcon: true
  },
  render: args => <InteractiveToggle {...args} />
}`,...(y=(x=c.parameters)==null?void 0:x.docs)==null?void 0:y.source}}};var j,_,k;i.parameters={...i.parameters,docs:{...(j=i.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    label: "Custom Theme",
    withIcon: true,
    icon: {
      on: <span style={{
        fontSize: "0.65rem"
      }}>🌙</span>,
      off: <span style={{
        fontSize: "0.65rem"
      }}>☀️</span>
    }
  },
  render: args => <InteractiveToggle {...args} />
}`,...(k=(_=i.parameters)==null?void 0:_.docs)==null?void 0:k.source}}};var v,I,w;d.parameters={...d.parameters,docs:{...(v=d.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "1rem"
  }}>
      <Toggle label="Disabled off" isDisabled />
      <Toggle label="Disabled on" isDisabled checked />
      <Toggle label="Disabled with icon" isDisabled checked withIcon />
    </div>
}`,...(w=(I=d.parameters)==null?void 0:I.docs)==null?void 0:w.source}}};const G=["Default","WithIcons","CustomIcons","Disabled"];export{i as CustomIcons,l as Default,d as Disabled,c as WithIcons,G as __namedExportsOrder,F as default};
