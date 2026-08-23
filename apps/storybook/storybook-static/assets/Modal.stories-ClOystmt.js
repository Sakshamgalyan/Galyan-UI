import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as t}from"./index-CC0H-XIk.js";import{r as Oe}from"./index-DLSp3Bm_.js";import{B as m}from"./Button-BeMeJT-5.js";import{I as Ke}from"./Input-DxJFmKM0.js";import"./index-HBoXM-p9.js";function y({isOpen:n,onClose:r,size:s="md",position:a="center",variant:i="default",icon:o,title:w,subtitle:D,footer:B,cancelText:_,confirmText:I,onCancel:T,onConfirm:je,isConfirmLoading:ke=!1,children:be,showCloseButton:L=!0,closable:p=!0,preventBackdropClose:Ce=!1,customWidth:M,customHeight:P,customBackground:E,customBorderRadius:W,customHeader:A,animationDuration:F=200,disableAnimation:h=!1,className:Se=""}){const[N,we]=t.useState(!1),O=t.useRef(null);if(t.useEffect(()=>{we(!0)},[]),t.useEffect(()=>{var V;if(!n||!N)return;const l=document.activeElement;(V=O.current)==null||V.focus();const R=c=>{var $;if(c.key==="Escape"&&p&&(r==null||r()),c.key==="Tab"){const d=($=O.current)==null?void 0:$.querySelectorAll('a, button:not(:disabled), textarea, input, select, [tabindex]:not([tabindex="-1"])');if(!(d!=null&&d.length))return;const z=d[0],q=d[d.length-1];c.shiftKey&&document.activeElement===z?(c.preventDefault(),q.focus()):!c.shiftKey&&document.activeElement===q&&(c.preventDefault(),z.focus())}};return document.addEventListener("keydown",R),document.body.style.overflow="hidden",()=>{document.removeEventListener("keydown",R),document.body.style.overflow="",l==null||l.focus()}},[n,N,r,p]),!n||!N)return null;const De=l=>{l.target===l.currentTarget&&!Ce&&p&&(r==null||r())},_e={...M?{width:M,maxWidth:M}:{},...P?{height:P}:{},...E?{background:E}:{},...W?{borderRadius:W}:{},...h?{}:{animationDuration:`${F}ms`}},Ie=["gy-modal",`gy-modal--${s}`,`gy-modal--${i}`,h?"":"gy-modal--animated",Se].filter(Boolean).join(" "),Te=["gy-modal-backdrop",`gy-modal-backdrop--${a}`,i==="fullscreen"?"gy-modal-backdrop--fullscreen":"",h?"":"gy-modal-backdrop--animated"].filter(Boolean).join(" "),Me=()=>{T==null||T(),r==null||r()},G=()=>B||(_||I?e.jsxs("div",{className:"gy-modal__footer-actions",children:[_&&e.jsx(m,{variant:"secondary",onClick:Me,children:_}),I&&e.jsx(m,{variant:"primary",isLoading:ke,onClick:je,children:I})]}):null),Ne=e.jsx("div",{className:Te,onClick:De,"aria-modal":"true",style:h?{}:{animationDuration:`${F}ms`},children:e.jsxs("div",{ref:O,role:"dialog",className:Ie,style:_e,tabIndex:-1,children:[A?e.jsx("div",{className:"gy-modal__header",children:A}):w||D||o?e.jsxs("div",{className:"gy-modal__header",children:[e.jsxs("div",{className:"gy-modal__header-content",children:[o&&e.jsx("div",{className:"gy-modal__icon",children:o}),e.jsxs("div",{className:"gy-modal__titles",children:[w&&e.jsx("h2",{className:"gy-modal__title",children:w}),D&&e.jsx("p",{className:"gy-modal__subtitle",children:D})]})]}),L&&p&&e.jsx("button",{className:"gy-modal__close",onClick:r,"aria-label":"Close dialog",children:e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 16 16",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",children:[e.jsx("line",{x1:"2",y1:"2",x2:"14",y2:"14"}),e.jsx("line",{x1:"14",y1:"2",x2:"2",y2:"14"})]})})]}):L&&p?e.jsx("div",{className:"gy-modal__header gy-modal__header--close-only",children:e.jsx("button",{className:"gy-modal__close",onClick:r,"aria-label":"Close dialog",children:e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 16 16",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",children:[e.jsx("line",{x1:"2",y1:"2",x2:"14",y2:"14"}),e.jsx("line",{x1:"14",y1:"2",x2:"2",y2:"14"})]})})}):null,e.jsx("div",{className:"gy-modal__body",children:be}),G()&&e.jsx("div",{className:"gy-modal__footer",children:G()})]})});return Oe.createPortal(Ne,document.body)}const K=()=>e.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"}),e.jsx("line",{x1:"12",y1:"8",x2:"12",y2:"12"}),e.jsx("line",{x1:"12",y1:"16",x2:"12.01",y2:"16"})]}),Be=()=>e.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("polyline",{points:"3 6 5 6 21 6"}),e.jsx("path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"})]}),Le=()=>e.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14"}),e.jsx("polyline",{points:"22 4 12 14.01 9 11.01"})]}),Pe=()=>e.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M21 2l-2 2m-1.5 1.5L14 9l-3 3-2-2-4 4 2 2 2-2 3 3 5.5-5.5"}),e.jsx("circle",{cx:"7.5",cy:"16.5",r:"3.5"})]}),Ve={title:"Galyan UI/Modal",component:y,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{size:{control:"select",options:["sm","md","lg","xl"]},variant:{control:"select",options:["default","sidebar","compact","fullscreen"]},position:{control:"inline-radio",options:["center","top"]},title:{control:"text"},subtitle:{control:"text"},confirmText:{control:"text"},cancelText:{control:"text"},showCloseButton:{control:"boolean"},closable:{control:"boolean"},preventBackdropClose:{control:"boolean"}}},u=({variant:n="default",size:r="md",position:s="center",icon:a})=>{const[i,o]=t.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsxs(m,{variant:"primary",onClick:()=>o(!0),children:["Open ",n," modal ",a?"with Icon":""]}),e.jsx(y,{isOpen:i,onClose:()=>o(!1),icon:a,title:"Confirm Action",subtitle:"This action requires security verification.",size:r,variant:n,position:s,cancelText:"Cancel",confirmText:"Confirm & Proceed",onConfirm:()=>o(!1),children:e.jsx("p",{style:{margin:0,color:"var(--gy-text-muted)"},children:"Are you sure you want to proceed? This will permanently update the security policy across all linked environments."})})]})},x={render:()=>e.jsx(u,{})},f={render:()=>e.jsx(u,{icon:e.jsx(K,{})})},g={render:()=>{const[n,r]=t.useState(!1),[s,a]=t.useState("");return e.jsxs(e.Fragment,{children:[e.jsx(m,{variant:"primary",onClick:()=>r(!0),children:"Generate API Key"}),e.jsx(y,{isOpen:n,onClose:()=>r(!1),icon:e.jsx(Pe,{}),title:"Create New API Key",subtitle:"Generate a secret key to authenticate SDK requests.",cancelText:"Cancel",confirmText:"Generate Secret Key",onConfirm:()=>{alert(`Key Generated for: ${s||"Default Key"}`),r(!1)},children:e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"},children:e.jsx(Ke,{label:"Key Identifier",placeholder:"e.g. Production Backend Worker",value:s,onChange:i=>a(i.target.value),helperText:"A descriptive name to identify where this token is used."})})})]})}},v={render:()=>{const[n,r]=t.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(m,{variant:"danger",onClick:()=>r(!0),children:"Delete Repository"}),e.jsx(y,{isOpen:n,onClose:()=>r(!1),icon:e.jsx("div",{style:{color:"#ef4444"},children:e.jsx(Be,{})}),title:"Delete Project Repository",subtitle:"Permanently remove project files, git history, and secrets.",cancelText:"Cancel",confirmText:"Yes, Delete Repository",onConfirm:()=>r(!1),children:e.jsx("p",{style:{margin:0,color:"var(--gy-text-muted)"},children:"This action cannot be undone. All deployments, active domains, and collaborator permissions will be permanently purged."})})]})}},j={render:()=>{const[n,r]=t.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(m,{variant:"secondary",onClick:()=>r(!0),children:"Deploy Successful Modal"}),e.jsx(y,{isOpen:n,onClose:()=>r(!1),icon:e.jsx("div",{style:{color:"#16a34a"},children:e.jsx(Le,{})}),title:"Deployment Complete",subtitle:"Version 2.4.0 is now live in production.",confirmText:"View Dashboard",onConfirm:()=>r(!1),children:e.jsx("p",{style:{margin:0,color:"var(--gy-text-muted)"},children:"The build finished in 42s with zero warnings. Edge caching and SSL certificates have been successfully configured."})})]})}},k={render:()=>e.jsx(u,{variant:"sidebar"})},b={render:()=>e.jsx(u,{variant:"compact",size:"sm",icon:e.jsx(K,{})})},C={render:()=>e.jsx(u,{variant:"fullscreen"})},S={render:()=>e.jsx(u,{position:"top",icon:e.jsx(K,{})})};var Y,H,U;x.parameters={...x.parameters,docs:{...(Y=x.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  render: () => <ModalDemo />
}`,...(U=(H=x.parameters)==null?void 0:H.docs)==null?void 0:U.source}}};var J,Q,X;f.parameters={...f.parameters,docs:{...(J=f.parameters)==null?void 0:J.docs,source:{originalSource:`{
  render: () => <ModalDemo icon={<ShieldAlertIcon />} />
}`,...(X=(Q=f.parameters)==null?void 0:Q.docs)==null?void 0:X.source}}};var Z,ee,re;g.parameters={...g.parameters,docs:{...(Z=g.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    const [keyName, setKeyName] = useState("");
    return <>\r
        <Button variant="primary" onClick={() => setOpen(true)}>\r
          Generate API Key\r
        </Button>\r
        <Modal isOpen={open} onClose={() => setOpen(false)} icon={<KeyIcon />} title="Create New API Key" subtitle="Generate a secret key to authenticate SDK requests." cancelText="Cancel" confirmText="Generate Secret Key" onConfirm={() => {
        alert(\`Key Generated for: \${keyName || "Default Key"}\`);
        setOpen(false);
      }}>\r
          <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem"
        }}>\r
            <Input label="Key Identifier" placeholder="e.g. Production Backend Worker" value={keyName} onChange={e => setKeyName(e.target.value)} helperText="A descriptive name to identify where this token is used." />\r
          </div>\r
        </Modal>\r
      </>;
  }
}`,...(re=(ee=g.parameters)==null?void 0:ee.docs)==null?void 0:re.source}}};var ne,te,oe;v.parameters={...v.parameters,docs:{...(ne=v.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    return <>\r
        <Button variant="danger" onClick={() => setOpen(true)}>\r
          Delete Repository\r
        </Button>\r
        <Modal isOpen={open} onClose={() => setOpen(false)} icon={<div style={{
        color: "#ef4444"
      }}>\r
              <TrashIcon />\r
            </div>} title="Delete Project Repository" subtitle="Permanently remove project files, git history, and secrets." cancelText="Cancel" confirmText="Yes, Delete Repository" onConfirm={() => setOpen(false)}>\r
          <p style={{
          margin: 0,
          color: "var(--gy-text-muted)"
        }}>\r
            This action cannot be undone. All deployments, active domains, and\r
            collaborator permissions will be permanently purged.\r
          </p>\r
        </Modal>\r
      </>;
  }
}`,...(oe=(te=v.parameters)==null?void 0:te.docs)==null?void 0:oe.source}}};var se,ae,ie;j.parameters={...j.parameters,docs:{...(se=j.parameters)==null?void 0:se.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    return <>\r
        <Button variant="secondary" onClick={() => setOpen(true)}>\r
          Deploy Successful Modal\r
        </Button>\r
        <Modal isOpen={open} onClose={() => setOpen(false)} icon={<div style={{
        color: "#16a34a"
      }}>\r
              <CheckCircleIcon />\r
            </div>} title="Deployment Complete" subtitle="Version 2.4.0 is now live in production." confirmText="View Dashboard" onConfirm={() => setOpen(false)}>\r
          <p style={{
          margin: 0,
          color: "var(--gy-text-muted)"
        }}>\r
            The build finished in 42s with zero warnings. Edge caching and SSL\r
            certificates have been successfully configured.\r
          </p>\r
        </Modal>\r
      </>;
  }
}`,...(ie=(ae=j.parameters)==null?void 0:ae.docs)==null?void 0:ie.source}}};var le,ce,de;k.parameters={...k.parameters,docs:{...(le=k.parameters)==null?void 0:le.docs,source:{originalSource:`{
  render: () => <ModalDemo variant="sidebar" />
}`,...(de=(ce=k.parameters)==null?void 0:ce.docs)==null?void 0:de.source}}};var me,ue,pe;b.parameters={...b.parameters,docs:{...(me=b.parameters)==null?void 0:me.docs,source:{originalSource:`{
  render: () => <ModalDemo variant="compact" size="sm" icon={<ShieldAlertIcon />} />
}`,...(pe=(ue=b.parameters)==null?void 0:ue.docs)==null?void 0:pe.source}}};var ye,he,xe;C.parameters={...C.parameters,docs:{...(ye=C.parameters)==null?void 0:ye.docs,source:{originalSource:`{
  render: () => <ModalDemo variant="fullscreen" />
}`,...(xe=(he=C.parameters)==null?void 0:he.docs)==null?void 0:xe.source}}};var fe,ge,ve;S.parameters={...S.parameters,docs:{...(fe=S.parameters)==null?void 0:fe.docs,source:{originalSource:`{
  render: () => <ModalDemo position="top" icon={<ShieldAlertIcon />} />
}`,...(ve=(ge=S.parameters)==null?void 0:ge.docs)==null?void 0:ve.source}}};const $e=["Default","WithHeaderIcon","PromptFormModal","DeleteConfirmationWithIcon","SuccessConfirmationWithIcon","Sidebar","Compact","Fullscreen","TopPosition"];export{b as Compact,x as Default,v as DeleteConfirmationWithIcon,C as Fullscreen,g as PromptFormModal,k as Sidebar,j as SuccessConfirmationWithIcon,S as TopPosition,f as WithHeaderIcon,$e as __namedExportsOrder,Ve as default};
