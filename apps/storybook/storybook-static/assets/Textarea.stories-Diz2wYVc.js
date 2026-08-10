import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as s}from"./index-CC0H-XIk.js";const a=s.forwardRef(function({label:o,helperText:r,size:P="md",fullWidth:Q=!0,variant:n="default",hasError:X,hasSuccess:Y,isDisabled:Z,isFocused:ee,required:S,maxCharCount:d,autoResize:c=!1,resize:q,disableBorderEffects:z=!1,borderRadius:w,error:D,disabled:ae,value:u,onChange:g,onFocus:y,onBlur:v,className:re="",id:le,...se},te){const oe=s.useId(),V=le??oe,ne=s.useRef(null),b=te??ne,F=Z||ae||n==="disabled",i=X||!!D||n==="error",E=Y||n==="success",ie=ee||n==="focused",[de,N]=s.useState(!1),ce=ie||de,C=typeof u=="string"?u.length:0,ue=d?C>d:!1,T=s.useCallback(()=>{const l=b.current;!l||!c||(l.style.height="auto",l.style.height=`${l.scrollHeight}px`)},[c,b]);s.useEffect(()=>{T()},[u,T]);const pe=l=>{T(),g==null||g(l)},me=l=>{N(!0),y==null||y(l)},fe=l=>{N(!1),v==null||v(l)},xe=["gy-textarea",`gy-textarea--${P}`,n==="filled"?"gy-textarea--filled":"",i?"gy-textarea--error":"",E?"gy-textarea--success":"",F?"gy-textarea--disabled":"",ce&&!z?"gy-textarea--focused":"",z?"gy-textarea--no-border-fx":"",c?"gy-textarea--auto-resize":""].filter(Boolean).join(" "),j={};w&&(j.borderRadius=w),q&&!c&&(j.resize=q);const M=D||(i&&r?r:void 0),he=!i&&r;return e.jsxs("div",{className:`gy-textarea-root ${Q?"":"gy-textarea-root--inline"} ${re}`,children:[o&&e.jsx("label",{className:`gy-textarea-label ${S?"gy-textarea-label--required":""}`,htmlFor:V,children:o}),e.jsx("textarea",{ref:b,id:V,className:xe,style:j,disabled:F,required:S,"aria-invalid":i||void 0,value:u,onChange:pe,onFocus:me,onBlur:fe,...se}),e.jsxs("div",{className:"gy-textarea-footer",children:[i&&M?e.jsx("span",{className:"gy-textarea-helper gy-textarea-helper--error",role:"alert",children:M}):E&&r?e.jsx("span",{className:"gy-textarea-helper gy-textarea-helper--success",children:r}):he?e.jsx("span",{className:"gy-textarea-helper",children:r}):e.jsx("span",{}),d!==void 0&&e.jsxs("span",{className:`gy-textarea-count ${ue?"gy-textarea-count--over":""}`,children:[C,"/",d]})]})]})});a.__docgenInfo={description:"",methods:[],displayName:"Textarea",props:{label:{required:!1,tsType:{name:"string"},description:""},helperText:{required:!1,tsType:{name:"string"},description:""},size:{required:!1,tsType:{name:"union",raw:'"sm" | "md" | "lg"',elements:[{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'}]},description:"",defaultValue:{value:'"md"',computed:!1}},fullWidth:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},variant:{required:!1,tsType:{name:"union",raw:`| "default"\r
| "filled"\r
| "focused"\r
| "error"\r
| "success"\r
| "disabled"`,elements:[{name:"literal",value:'"default"'},{name:"literal",value:'"filled"'},{name:"literal",value:'"focused"'},{name:"literal",value:'"error"'},{name:"literal",value:'"success"'},{name:"literal",value:'"disabled"'}]},description:"",defaultValue:{value:'"default"',computed:!1}},hasError:{required:!1,tsType:{name:"boolean"},description:""},hasSuccess:{required:!1,tsType:{name:"boolean"},description:""},isDisabled:{required:!1,tsType:{name:"boolean"},description:""},isFocused:{required:!1,tsType:{name:"boolean"},description:""},required:{required:!1,tsType:{name:"boolean"},description:""},maxCharCount:{required:!1,tsType:{name:"number"},description:""},autoResize:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},resize:{required:!1,tsType:{name:"union",raw:'"none" | "vertical" | "horizontal" | "both"',elements:[{name:"literal",value:'"none"'},{name:"literal",value:'"vertical"'},{name:"literal",value:'"horizontal"'},{name:"literal",value:'"both"'}]},description:""},disableBorderEffects:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},borderRadius:{required:!1,tsType:{name:"string"},description:""},error:{required:!1,tsType:{name:"string"},description:"Legacy error string"},className:{defaultValue:{value:'""',computed:!1},required:!1}}};const ve={title:"Galyan UI/Textarea",component:a,parameters:{layout:"centered"},tags:["autodocs"],decorators:[t=>e.jsx("div",{style:{width:400},children:e.jsx(t,{})})]},p={args:{label:"Message",placeholder:"Type your message…",helperText:"Max 500 characters"}},m={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1.5rem"},children:[e.jsx(a,{label:"Default",variant:"default",placeholder:"Default"}),e.jsx(a,{label:"Filled",variant:"filled",placeholder:"Filled"}),e.jsx(a,{label:"Focused",variant:"focused",placeholder:"Focused"}),e.jsx(a,{label:"Error",variant:"error",placeholder:"Error",helperText:"Something went wrong"}),e.jsx(a,{label:"Success",variant:"success",placeholder:"Success",helperText:"Looks good!",hasSuccess:!0}),e.jsx(a,{label:"Disabled",variant:"disabled",placeholder:"Disabled"})]})},f={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1.5rem"},children:[e.jsx(a,{label:"Small",size:"sm",placeholder:"Small textarea"}),e.jsx(a,{label:"Medium",size:"md",placeholder:"Medium textarea"}),e.jsx(a,{label:"Large",size:"lg",placeholder:"Large textarea"})]})},x={render:()=>{const[t,o]=s.useState("Hello world");return e.jsx(a,{label:"Bio",value:t,onChange:r=>o(r.target.value),maxCharCount:100,helperText:"Tell us about yourself"})}},h={render:()=>{const[t,o]=s.useState("");return e.jsx(a,{label:"Auto-resize",value:t,onChange:r=>o(r.target.value),autoResize:!0,placeholder:"This grows as you type…"})}};var R,L,$;p.parameters={...p.parameters,docs:{...(R=p.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    label: "Message",
    placeholder: "Type your message…",
    helperText: "Max 500 characters"
  }
}`,...($=(L=p.parameters)==null?void 0:L.docs)==null?void 0:$.source}}};var H,I,A;m.parameters={...m.parameters,docs:{...(H=m.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem"
  }}>\r
      <Textarea label="Default" variant="default" placeholder="Default" />\r
      <Textarea label="Filled" variant="filled" placeholder="Filled" />\r
      <Textarea label="Focused" variant="focused" placeholder="Focused" />\r
      <Textarea label="Error" variant="error" placeholder="Error" helperText="Something went wrong" />\r
      <Textarea label="Success" variant="success" placeholder="Success" helperText="Looks good!" hasSuccess />\r
      <Textarea label="Disabled" variant="disabled" placeholder="Disabled" />\r
    </div>
}`,...(A=(I=m.parameters)==null?void 0:I.docs)==null?void 0:A.source}}};var _,k,O;f.parameters={...f.parameters,docs:{...(_=f.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem"
  }}>\r
      <Textarea label="Small" size="sm" placeholder="Small textarea" />\r
      <Textarea label="Medium" size="md" placeholder="Medium textarea" />\r
      <Textarea label="Large" size="lg" placeholder="Large textarea" />\r
    </div>
}`,...(O=(k=f.parameters)==null?void 0:k.docs)==null?void 0:O.source}}};var B,G,U;x.parameters={...x.parameters,docs:{...(B=x.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => {
    const [val, setVal] = useState("Hello world");
    return <Textarea label="Bio" value={val} onChange={e => setVal(e.target.value)} maxCharCount={100} helperText="Tell us about yourself" />;
  }
}`,...(U=(G=x.parameters)==null?void 0:G.docs)==null?void 0:U.source}}};var W,J,K;h.parameters={...h.parameters,docs:{...(W=h.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: () => {
    const [val, setVal] = useState("");
    return <Textarea label="Auto-resize" value={val} onChange={e => setVal(e.target.value)} autoResize placeholder="This grows as you type…" />;
  }
}`,...(K=(J=h.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};const be=["Default","Variants","Sizes","CharCounter","AutoResize"];export{h as AutoResize,x as CharCounter,p as Default,f as Sizes,m as Variants,be as __namedExportsOrder,ve as default};
