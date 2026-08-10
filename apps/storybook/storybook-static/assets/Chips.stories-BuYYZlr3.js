import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as x}from"./index-CC0H-XIk.js";function n({children:r,variant:d="soft",size:c="md",removable:p=!1,onRemove:s,clickable:i=!1,selected:y=!1,onClick:t,icon:u,className:m=""}){return e.jsxs("span",{className:["gy-chip",`gy-chip--${d}`,`gy-chip--${c}`,i?"gy-chip--clickable":"",y?"gy-chip--selected":"",m].filter(Boolean).join(" "),role:i?"button":void 0,tabIndex:i?0:void 0,onClick:i?t:void 0,onKeyDown:i?l=>{(l.key==="Enter"||l.key===" ")&&(t==null||t())}:void 0,children:[u&&e.jsx("span",{"aria-hidden":"true",children:u}),r,p&&e.jsx("button",{type:"button",className:"gy-chip__remove",onClick:l=>{l.stopPropagation(),s==null||s()},"aria-label":"Remove",children:e.jsxs("svg",{width:"8",height:"8",viewBox:"0 0 8 8",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",children:[e.jsx("line",{x1:"1",y1:"1",x2:"7",y2:"7"}),e.jsx("line",{x1:"7",y1:"1",x2:"1",y2:"7"})]})})]})}function k({values:r,onChange:d,placeholder:c="Add a tag...",disabled:p=!1,maxItems:s,chipVariant:i="soft",className:y=""}){const[t,u]=x.useState(""),m=x.useRef(null),l=a=>{const o=a.trim();!o||r.includes(o)||s&&r.length>=s||(d([...r,o]),u(""))},C=a=>{d(r.filter((o,A)=>A!==a))},W=a=>{(a.key==="Enter"||a.key===",")&&(a.preventDefault(),l(t)),a.key==="Backspace"&&!t&&r.length>0&&C(r.length-1)};return e.jsxs("div",{className:`gy-chips-input ${y}`,onClick:()=>{var a;return(a=m.current)==null?void 0:a.focus()},children:[r.map((a,o)=>e.jsx(n,{variant:i,size:"sm",removable:!p,onRemove:()=>C(o),children:a},o)),(!s||r.length<s)&&e.jsx("input",{ref:m,className:"gy-chips-input__field",value:t,onChange:a=>u(a.target.value),onKeyDown:W,onBlur:()=>l(t),placeholder:r.length===0?c:"",disabled:p,"aria-label":c})]})}n.__docgenInfo={description:"",methods:[],displayName:"Chip",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},variant:{required:!1,tsType:{name:"union",raw:`| "solid"\r
| "soft"\r
| "outline"\r
| "success"\r
| "warning"\r
| "danger"\r
| "neutral"`,elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"soft"'},{name:"literal",value:'"outline"'},{name:"literal",value:'"success"'},{name:"literal",value:'"warning"'},{name:"literal",value:'"danger"'},{name:"literal",value:'"neutral"'}]},description:"",defaultValue:{value:'"soft"',computed:!1}},size:{required:!1,tsType:{name:"union",raw:'"sm" | "md" | "lg"',elements:[{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'}]},description:"",defaultValue:{value:'"md"',computed:!1}},removable:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},onRemove:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},clickable:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},selected:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},icon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}}}};k.__docgenInfo={description:"",methods:[],displayName:"ChipsInput",props:{values:{required:!0,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(values: string[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"string"}],raw:"string[]"},name:"values"}],return:{name:"void"}}},description:""},placeholder:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"Add a tag..."',computed:!1}},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},maxItems:{required:!1,tsType:{name:"number"},description:""},chipVariant:{required:!1,tsType:{name:"union",raw:`| "solid"\r
| "soft"\r
| "outline"\r
| "success"\r
| "warning"\r
| "danger"\r
| "neutral"`,elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"soft"'},{name:"literal",value:'"outline"'},{name:"literal",value:'"success"'},{name:"literal",value:'"warning"'},{name:"literal",value:'"danger"'},{name:"literal",value:'"neutral"'}]},description:"",defaultValue:{value:'"soft"',computed:!1}},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}}}};const B={title:"Galyan UI/Chip",component:n,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{variant:{control:"select",options:["solid","soft","outline","success","warning","danger","neutral"]},size:{control:"inline-radio",options:["sm","md","lg"]},removable:{control:"boolean"},clickable:{control:"boolean"},selected:{control:"boolean"}}},v={args:{children:"Interactive Chip",variant:"soft",size:"md",removable:!1,clickable:!0,selected:!1}},f={render:()=>e.jsxs("div",{style:{display:"flex",gap:"0.75rem",flexWrap:"wrap"},children:[e.jsx(n,{variant:"solid",children:"Solid"}),e.jsx(n,{variant:"soft",children:"Soft"}),e.jsx(n,{variant:"outline",children:"Outline"}),e.jsx(n,{variant:"success",children:"Success"}),e.jsx(n,{variant:"warning",children:"Warning"}),e.jsx(n,{variant:"danger",children:"Danger"}),e.jsx(n,{variant:"neutral",children:"Neutral"})]})},h={render:()=>e.jsxs("div",{style:{display:"flex",gap:"0.75rem"},children:[e.jsx(n,{variant:"soft",removable:!0,onRemove:()=>alert("Removed"),children:"React"}),e.jsx(n,{variant:"solid",removable:!0,onRemove:()=>alert("Removed"),children:"TypeScript"}),e.jsx(n,{variant:"outline",removable:!0,onRemove:()=>alert("Removed"),children:"Neumorphic"})]})},g={render:()=>{const[r,d]=x.useState(["React","TypeScript","UI Library"]);return e.jsx("div",{style:{maxWidth:"400px"},children:e.jsx(k,{values:r,onChange:d,placeholder:"Add technologies..."})})}};var b,R,j;v.parameters={...v.parameters,docs:{...(b=v.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    children: "Interactive Chip",
    variant: "soft",
    size: "md",
    removable: false,
    clickable: true,
    selected: false
  }
}`,...(j=(R=v.parameters)==null?void 0:R.docs)==null?void 0:j.source}}};var T,w,q;f.parameters={...f.parameters,docs:{...(T=f.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: "0.75rem",
    flexWrap: "wrap"
  }}>\r
      <Chip variant="solid">Solid</Chip>\r
      <Chip variant="soft">Soft</Chip>\r
      <Chip variant="outline">Outline</Chip>\r
      <Chip variant="success">Success</Chip>\r
      <Chip variant="warning">Warning</Chip>\r
      <Chip variant="danger">Danger</Chip>\r
      <Chip variant="neutral">Neutral</Chip>\r
    </div>
}`,...(q=(w=f.parameters)==null?void 0:w.docs)==null?void 0:q.source}}};var S,N,V;h.parameters={...h.parameters,docs:{...(S=h.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: "0.75rem"
  }}>\r
      <Chip variant="soft" removable onRemove={() => alert("Removed")}>\r
        React\r
      </Chip>\r
      <Chip variant="solid" removable onRemove={() => alert("Removed")}>\r
        TypeScript\r
      </Chip>\r
      <Chip variant="outline" removable onRemove={() => alert("Removed")}>\r
        Neumorphic\r
      </Chip>\r
    </div>
}`,...(V=(N=h.parameters)==null?void 0:N.docs)==null?void 0:V.source}}};var I,_,D;g.parameters={...g.parameters,docs:{...(I=g.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => {
    const [tags, setTags] = useState(["React", "TypeScript", "UI Library"]);
    return <div style={{
      maxWidth: "400px"
    }}>\r
        <ChipsInput values={tags} onChange={setTags} placeholder="Add technologies..." />\r
      </div>;
  }
}`,...(D=(_=g.parameters)==null?void 0:_.docs)==null?void 0:D.source}}};const K=["Default","Variants","Removable","ChipsInputDemo"];export{g as ChipsInputDemo,v as Default,h as Removable,f as Variants,K as __namedExportsOrder,B as default};
