import{j as t}from"./jsx-runtime-D_zvdyIk.js";import{T as o}from"./Tooltip-Bp1IY3FH.js";import{B as n}from"./Button-BeMeJT-5.js";import"./index-CC0H-XIk.js";import"./floating-ui.react-BUKrONLm.js";import"./index-DLSp3Bm_.js";import"./index-HBoXM-p9.js";const b=()=>t.jsx("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:t.jsx("path",{d:"M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"})}),I=()=>t.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[t.jsx("rect",{x:"9",y:"9",width:"13",height:"13",rx:"2",ry:"2"}),t.jsx("path",{d:"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"})]}),z={title:"Galyan UI/Tooltip",component:o,tags:["autodocs"],parameters:{layout:"centered"},argTypes:{position:{control:"select",options:["top","bottom","left","right"],description:"Tooltip popup positioning relative to target"},variant:{control:"select",options:["default","dark","light","primary"],description:"Color style variant of the tooltip"},maxWidth:{control:"text",description:"Custom maximum width for wrapping longer multi-line text"},delay:{control:"number",description:"Delay in milliseconds before showing tooltip on hover"},shortcut:{control:"text",description:"Optional keyboard shortcut badge (e.g. ⌘K or Ctrl+S)"},content:{control:"text",description:"Content inside the tooltip popup"}}},r={args:{content:"Save document to cloud",position:"top",delay:120,shortcut:"⌘S",children:t.jsx(n,{variant:"primary",children:"Save Changes"})}},e={render:()=>t.jsx("div",{style:{padding:"3rem 2rem"},children:t.jsx(o,{maxWidth:220,position:"top",content:"This tooltip contains a longer explanation that wraps cleanly across multiple lines without text clipping.",children:t.jsx(n,{variant:"secondary",children:"Hover for Long Description (maxWidth 220px)"})})})},i={render:()=>t.jsxs("div",{style:{display:"flex",gap:"1.5rem",alignItems:"center",padding:"3rem 1.5rem"},children:[t.jsx(o,{content:"Adaptive theme tooltip",variant:"default",shortcut:"⌘D",children:t.jsx(n,{variant:"secondary",children:"Adaptive Default"})}),t.jsx(o,{content:"Clean frosted light tooltip",variant:"light",shortcut:"⌘L",children:t.jsx(n,{variant:"secondary",children:"Always Light"})}),t.jsx(o,{content:"Sleek soft dark tooltip",variant:"dark",shortcut:"⌘K",children:t.jsx(n,{variant:"secondary",children:"Always Dark"})}),t.jsx(o,{content:"Brand themed accent tooltip",variant:"primary",shortcut:"⌘P",children:t.jsx(n,{variant:"primary",children:"Primary Brand"})})]})},a={render:()=>t.jsxs("div",{style:{display:"flex",gap:"1rem",alignItems:"center",padding:"3rem 1.5rem"},children:[t.jsx(o,{content:"Copy link to clipboard",position:"top",shortcut:"⌘C",children:t.jsx(n,{variant:"secondary",size:"sm",children:t.jsx(I,{})})}),t.jsx(o,{content:"Bookmark this project",position:"top",shortcut:"⌘B",children:t.jsx(n,{variant:"secondary",size:"sm",children:t.jsx(b,{})})})]})},s={render:()=>t.jsxs("div",{style:{display:"flex",gap:"1.5rem",justifyContent:"center",padding:"4rem 2rem"},children:[t.jsx(o,{content:"Tooltip placed on top",position:"top",children:t.jsx(n,{variant:"secondary",children:"Hover Top"})}),t.jsx(o,{content:"Tooltip placed on bottom",position:"bottom",children:t.jsx(n,{variant:"secondary",children:"Hover Bottom"})}),t.jsx(o,{content:"Tooltip placed on left",position:"left",children:t.jsx(n,{variant:"secondary",children:"Hover Left"})}),t.jsx(o,{content:"Tooltip placed on right",position:"right",children:t.jsx(n,{variant:"secondary",children:"Hover Right"})})]})},c={render:()=>t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.5rem",padding:"2rem",color:"var(--gy-text)"},children:[t.jsx("span",{children:"Two-Factor Authentication"}),t.jsx(o,{content:"Enforces time-based OTP codes on every new login attempt",position:"right"})]})};var l,p,d;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    content: "Save document to cloud",
    position: "top",
    delay: 120,
    shortcut: "⌘S",
    children: <Button variant="primary">Save Changes</Button>
  }
}`,...(d=(p=r.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};var m,h,u;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: "3rem 2rem"
  }}>\r
      <Tooltip maxWidth={220} position="top" content="This tooltip contains a longer explanation that wraps cleanly across multiple lines without text clipping.">\r
        <Button variant="secondary">Hover for Long Description (maxWidth 220px)</Button>\r
      </Tooltip>\r
    </div>
}`,...(u=(h=e.parameters)==null?void 0:h.docs)==null?void 0:u.source}}};var v,y,g;i.parameters={...i.parameters,docs:{...(v=i.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: "1.5rem",
    alignItems: "center",
    padding: "3rem 1.5rem"
  }}>\r
      <Tooltip content="Adaptive theme tooltip" variant="default" shortcut="⌘D">\r
        <Button variant="secondary">Adaptive Default</Button>\r
      </Tooltip>\r
\r
      <Tooltip content="Clean frosted light tooltip" variant="light" shortcut="⌘L">\r
        <Button variant="secondary">Always Light</Button>\r
      </Tooltip>\r
\r
      <Tooltip content="Sleek soft dark tooltip" variant="dark" shortcut="⌘K">\r
        <Button variant="secondary">Always Dark</Button>\r
      </Tooltip>\r
\r
      <Tooltip content="Brand themed accent tooltip" variant="primary" shortcut="⌘P">\r
        <Button variant="primary">Primary Brand</Button>\r
      </Tooltip>\r
    </div>
}`,...(g=(y=i.parameters)==null?void 0:y.docs)==null?void 0:g.source}}};var x,j,T;a.parameters={...a.parameters,docs:{...(x=a.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: "1rem",
    alignItems: "center",
    padding: "3rem 1.5rem"
  }}>\r
      <Tooltip content="Copy link to clipboard" position="top" shortcut="⌘C">\r
        <Button variant="secondary" size="sm">\r
          <CopyIcon />\r
        </Button>\r
      </Tooltip>\r
\r
      <Tooltip content="Bookmark this project" position="top" shortcut="⌘B">\r
        <Button variant="secondary" size="sm">\r
          <BookmarkIcon />\r
        </Button>\r
      </Tooltip>\r
    </div>
}`,...(T=(j=a.parameters)==null?void 0:j.docs)==null?void 0:T.source}}};var f,B,k;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: "1.5rem",
    justifyContent: "center",
    padding: "4rem 2rem"
  }}>\r
      <Tooltip content="Tooltip placed on top" position="top">\r
        <Button variant="secondary">Hover Top</Button>\r
      </Tooltip>\r
      <Tooltip content="Tooltip placed on bottom" position="bottom">\r
        <Button variant="secondary">Hover Bottom</Button>\r
      </Tooltip>\r
      <Tooltip content="Tooltip placed on left" position="left">\r
        <Button variant="secondary">Hover Left</Button>\r
      </Tooltip>\r
      <Tooltip content="Tooltip placed on right" position="right">\r
        <Button variant="secondary">Hover Right</Button>\r
      </Tooltip>\r
    </div>
}`,...(k=(B=s.parameters)==null?void 0:B.docs)==null?void 0:k.source}}};var w,S,C;c.parameters={...c.parameters,docs:{...(w=c.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "2rem",
    color: "var(--gy-text)"
  }}>\r
      <span>Two-Factor Authentication</span>\r
      <Tooltip content="Enforces time-based OTP codes on every new login attempt" position="right" />\r
    </div>
}`,...(C=(S=c.parameters)==null?void 0:S.docs)==null?void 0:C.source}}};const K=["Default","MaxWidthMultiLine","Variants","WithKeyboardShortcuts","Positions","StandaloneInfoIcon"];export{r as Default,e as MaxWidthMultiLine,s as Positions,c as StandaloneInfoIcon,i as Variants,a as WithKeyboardShortcuts,K as __namedExportsOrder,z as default};
