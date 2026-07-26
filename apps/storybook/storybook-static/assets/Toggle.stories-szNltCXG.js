import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as D,R as E}from"./index-CC0H-XIk.js";const z=()=>e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"3",strokeLinecap:"round",strokeLinejoin:"round",className:"gy-toggle__icon gy-toggle__icon--on",children:e.jsx("polyline",{points:"20 6 9 17 4 12"})}),L=()=>e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"3",strokeLinecap:"round",strokeLinejoin:"round",className:"gy-toggle__icon gy-toggle__icon--off",children:[e.jsx("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),e.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]}),t=D.forwardRef(({label:s,checked:r,withIcon:a=!1,icon:o,isDisabled:g=!1,className:N="",id:T,...v},R)=>{const C=E.useId(),u=T||C,S=["gy-toggle-wrapper",g?"gy-toggle--disabled":"",N].filter(Boolean).join(" "),q=()=>a?o!=null&&o.on?e.jsx("span",{className:"gy-toggle__icon gy-toggle__icon--on",children:o.on}):e.jsx(z,{}):null,W=()=>a?o!=null&&o.off?e.jsx("span",{className:"gy-toggle__icon gy-toggle__icon--off",children:o.off}):e.jsx(L,{}):null;return e.jsxs("label",{className:S,htmlFor:u,children:[e.jsxs("div",{className:"gy-toggle__control",children:[e.jsx("input",{type:"checkbox",role:"switch",id:u,ref:R,className:"gy-toggle__input",checked:r,disabled:g,"aria-checked":r,...v}),e.jsxs("div",{className:"gy-toggle__track",children:[a&&e.jsxs("div",{className:"gy-toggle__track-icons",children:[q(),W()]}),e.jsx("div",{className:"gy-toggle__thumb"})]})]}),s&&e.jsx("span",{className:"gy-toggle__label",children:s})]})});t.displayName="Toggle";t.__docgenInfo={description:"",methods:[],displayName:"Toggle",props:{label:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Text label displayed next to the toggle"},withIcon:{required:!1,tsType:{name:"boolean"},description:"Whether to show icons inside the toggle thumb/track",defaultValue:{value:"false",computed:!1}},icon:{required:!1,tsType:{name:"signature",type:"object",raw:`{\r
  on: React.ReactNode;\r
  off: React.ReactNode;\r
}`,signature:{properties:[{key:"on",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!0}},{key:"off",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!0}}]}},description:"Custom icons for the on and off states"},isDisabled:{required:!1,tsType:{name:"boolean"},description:"If true, the toggle will be disabled",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Custom class for the wrapper",defaultValue:{value:'""',computed:!1}}},composes:["Omit"]};const V={title:"Galyan UI/Toggle",component:t,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{withIcon:{control:"boolean",description:"Whether to show icons inside the toggle"},label:{control:"text",description:"Text label displayed next to the toggle"},checked:{control:"boolean",description:"Controlled checked state"},isDisabled:{control:"boolean",description:"If true, the toggle will be disabled"}}},d=s=>{const[r,a]=D.useState(s.checked||!1);return e.jsx(t,{...s,checked:s.checked!==void 0?s.checked:r,onChange:o=>a(o.target.checked)})},n={args:{label:"Enable notifications"},render:s=>e.jsx(d,{...s})},l={args:{label:"Dark mode",withIcon:!0},render:s=>e.jsx(d,{...s})},c={args:{label:"Custom Theme",withIcon:!0,icon:{on:e.jsx("span",{style:{fontSize:"0.65rem"},children:"🌙"}),off:e.jsx("span",{style:{fontSize:"0.65rem"},children:"☀️"})}},render:s=>e.jsx(d,{...s})},i={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"},children:[e.jsx(t,{label:"Disabled off",isDisabled:!0}),e.jsx(t,{label:"Disabled on",isDisabled:!0,checked:!0}),e.jsx(t,{label:"Disabled with icon",isDisabled:!0,checked:!0,withIcon:!0})]})};var p,m,f;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    label: "Enable notifications"
  },
  render: args => <InteractiveToggle {...args} />
}`,...(f=(m=n.parameters)==null?void 0:m.docs)==null?void 0:f.source}}};var h,b,x;l.parameters={...l.parameters,docs:{...(h=l.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    label: "Dark mode",
    withIcon: true
  },
  render: args => <InteractiveToggle {...args} />
}`,...(x=(b=l.parameters)==null?void 0:b.docs)==null?void 0:x.source}}};var y,j,_;c.parameters={...c.parameters,docs:{...(y=c.parameters)==null?void 0:y.docs,source:{originalSource:`{
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
}`,...(_=(j=c.parameters)==null?void 0:j.docs)==null?void 0:_.source}}};var k,I,w;i.parameters={...i.parameters,docs:{...(k=i.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "1rem"
  }}>\r
      <Toggle label="Disabled off" isDisabled />\r
      <Toggle label="Disabled on" isDisabled checked />\r
      <Toggle label="Disabled with icon" isDisabled checked withIcon />\r
    </div>
}`,...(w=(I=i.parameters)==null?void 0:I.docs)==null?void 0:w.source}}};const F=["Default","WithIcons","CustomIcons","Disabled"];export{c as CustomIcons,n as Default,i as Disabled,l as WithIcons,F as __namedExportsOrder,V as default};
