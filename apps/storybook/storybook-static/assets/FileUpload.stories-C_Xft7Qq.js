import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as f}from"./index-CC0H-XIk.js";const _=s=>{if(!s||s===0)return"0 B";const r=1024,d=["B","KB","MB","GB"],n=Math.floor(Math.log(s)/Math.log(r));return parseFloat((s/Math.pow(r,n)).toFixed(1))+" "+d[n]};function H({onFilesSelected:s,onRemoveFile:r,onRetryFile:d,uploadedFiles:n,multiple:k=!1,accept:J,maxSize:p,maxFiles:U,disabled:u=!1,label:O="Click or drag files to upload",helperText:N,className:Y=""}){const[K,j]=f.useState(!1),[c,b]=f.useState(n??[]),T=f.useRef(null);f.useEffect(()=>{n&&b(n)},[n]);const w=a=>{if(!a)return;const t=Array.from(a).filter(m=>!p||m.size<=p),l=k?[...c,...t]:t,i=U?l.slice(0,U):l;b(i),s==null||s(t)},F=a=>{a.preventDefault(),a.stopPropagation(),!u&&(a.type==="dragenter"||a.type==="dragover"?j(!0):a.type==="dragleave"&&j(!1))},Q=a=>{a.preventDefault(),a.stopPropagation(),j(!1),!u&&w(a.dataTransfer.files)},X=a=>{const t=c[a],l=c.filter((i,m)=>m!==a);b(l),t&&(r==null||r(t,a))};return e.jsxs("div",{className:`gy-fileupload ${Y}`,children:[e.jsxs("div",{className:["gy-fileupload-zone",K?"gy-fileupload-zone--drag-active":"",u?"gy-fileupload-zone--disabled":""].filter(Boolean).join(" "),onClick:()=>{var a;return!u&&((a=T.current)==null?void 0:a.click())},onDragEnter:F,onDragLeave:F,onDragOver:F,onDrop:Q,children:[e.jsx("input",{ref:T,type:"file",className:"gy-fileupload-input",multiple:k,accept:J,disabled:u,onChange:a=>w(a.target.files)}),e.jsxs("svg",{className:"gy-fileupload-icon",width:"32",height:"32",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),e.jsx("polyline",{points:"17 8 12 3 7 8"}),e.jsx("line",{x1:"12",y1:"3",x2:"12",y2:"15"})]}),e.jsx("div",{className:"gy-fileupload-text",children:O}),(N||p)&&e.jsxs("div",{className:"gy-fileupload-subtext",children:[N," ",p&&`(Max ${_(p)})`]})]}),c.length>0&&e.jsx("div",{className:"gy-fileupload-list",children:c.map((a,t)=>{const l=a instanceof File,i=a.name,m=a.size,o=l?"completed":a.status??"completed",M=l?void 0:a.progress??50;return e.jsxs("div",{className:`gy-fileupload-item gy-fileupload-item--${o}`,children:[e.jsx("div",{className:"gy-fileupload-item-icon",children:e.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"}),e.jsx("polyline",{points:"13 2 13 9 20 9"})]})}),e.jsxs("div",{className:"gy-fileupload-item-info",children:[e.jsxs("div",{className:"gy-fileupload-item-header",children:[e.jsx("span",{className:"gy-fileupload-item-name",title:i,children:i}),o==="completed"&&e.jsx("span",{className:"gy-fileupload-status-badge gy-fileupload-status-badge--success",children:"Uploaded"}),o==="uploading"&&e.jsxs("span",{className:"gy-fileupload-status-badge gy-fileupload-status-badge--uploading",children:[M,"%"]}),o==="error"&&e.jsx("span",{className:"gy-fileupload-status-badge gy-fileupload-status-badge--error",children:"Failed"})]}),o==="uploading"&&e.jsx("div",{className:"gy-fileupload-progress-bar",children:e.jsx("div",{className:"gy-fileupload-progress-fill",style:{width:`${M}%`}})}),e.jsx("span",{className:"gy-fileupload-item-size",children:_(m)})]}),o==="error"&&e.jsxs("button",{type:"button",className:"gy-fileupload-item-retry",onClick:z=>{z.stopPropagation(),d==null||d(a,t)},"aria-label":"Retry upload",children:[e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("polyline",{points:"23 4 23 10 17 10"}),e.jsx("path",{d:"M20.49 15a9 9 0 1 1-2.12-9.36L23 10"})]}),e.jsx("span",{children:"Retry"})]}),e.jsx("button",{type:"button",className:"gy-fileupload-item-remove",onClick:z=>{z.stopPropagation(),X(t)},"aria-label":"Remove file",children:e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),e.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]},`${i}-${t}`)})})]})}H.__docgenInfo={description:"",methods:[],displayName:"FileUpload",props:{onFilesSelected:{required:!1,tsType:{name:"signature",type:"function",raw:"(files: File[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"File"}],raw:"File[]"},name:"files"}],return:{name:"void"}}},description:""},onRemoveFile:{required:!1,tsType:{name:"signature",type:"function",raw:"(file: UploadedFileItem | File, index: number) => void",signature:{arguments:[{type:{name:"union",raw:"UploadedFileItem | File",elements:[{name:"UploadedFileItem"},{name:"File"}]},name:"file"},{type:{name:"number"},name:"index"}],return:{name:"void"}}},description:""},onRetryFile:{required:!1,tsType:{name:"signature",type:"function",raw:"(file: UploadedFileItem | File, index: number) => void",signature:{arguments:[{type:{name:"union",raw:"UploadedFileItem | File",elements:[{name:"UploadedFileItem"},{name:"File"}]},name:"file"},{type:{name:"number"},name:"index"}],return:{name:"void"}}},description:""},uploadedFiles:{required:!1,tsType:{name:"Array",elements:[{name:"unknown"}],raw:"(UploadedFileItem | File)[]"},description:""},multiple:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},accept:{required:!1,tsType:{name:"string"},description:""},maxSize:{required:!1,tsType:{name:"number"},description:""},maxFiles:{required:!1,tsType:{name:"number"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},label:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'Click or drag files to upload'",computed:!1}},helperText:{required:!1,tsType:{name:"string"},description:""},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}}}};const ae={title:"Galyan UI/FileUpload",component:H,parameters:{layout:"centered",docs:{description:{component:"Drag-and-drop file upload zone with file list, size validation, and uploaded file status badges."}}},tags:["autodocs"],decorators:[s=>e.jsx("div",{style:{width:500},children:e.jsx(s,{})})],argTypes:{multiple:{control:"boolean"},disabled:{control:"boolean"},label:{control:"text"},helperText:{control:"text"},maxSize:{control:"number"},maxFiles:{control:"number"},accept:{control:"text"}}},g={args:{label:"Click or drag file to upload",helperText:"PNG, JPG, PDF up to 5MB",maxSize:5*1024*1024}},x={args:{multiple:!0,label:"Upload additional documents",helperText:"Max 10MB per file",uploadedFiles:[{name:"invoice_july_2026.pdf",size:1024*450,status:"completed"},{name:"profile_avatar.png",size:1024*1200,status:"completed"},{name:"dataset_archive.zip",size:1024*8500,status:"uploading",progress:65}]}},h={args:{multiple:!0,label:"Upload report documents",helperText:"Click Retry on failed items",uploadedFiles:[{name:"financial_summary.pdf",size:1024*250,status:"completed"},{name:"large_dataset.csv",size:1024*15e3,status:"error"},{name:"contract_draft.docx",size:1024*800,status:"uploading",progress:35}],onRetryFile:(s,r)=>alert(`Retrying upload for ${s.name} at index ${r}`)}},y={args:{multiple:!0,maxFiles:5,label:"Upload document attachments",helperText:"Upload up to 5 files (Max 10MB each)",maxSize:10*1024*1024}},v={args:{disabled:!0,label:"Upload is disabled",helperText:"You do not have permission to upload files."}};var B,D,C;g.parameters={...g.parameters,docs:{...(B=g.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    label: 'Click or drag file to upload',
    helperText: 'PNG, JPG, PDF up to 5MB',
    maxSize: 5 * 1024 * 1024
  }
}`,...(C=(D=g.parameters)==null?void 0:D.docs)==null?void 0:C.source}}};var q,L,P;x.parameters={...x.parameters,docs:{...(q=x.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    multiple: true,
    label: 'Upload additional documents',
    helperText: 'Max 10MB per file',
    uploadedFiles: [{
      name: 'invoice_july_2026.pdf',
      size: 1024 * 450,
      status: 'completed'
    }, {
      name: 'profile_avatar.png',
      size: 1024 * 1200,
      status: 'completed'
    }, {
      name: 'dataset_archive.zip',
      size: 1024 * 8500,
      status: 'uploading',
      progress: 65
    }]
  }
}`,...(P=(L=x.parameters)==null?void 0:L.docs)==null?void 0:P.source}}};var S,$,I;h.parameters={...h.parameters,docs:{...(S=h.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    multiple: true,
    label: 'Upload report documents',
    helperText: 'Click Retry on failed items',
    uploadedFiles: [{
      name: 'financial_summary.pdf',
      size: 1024 * 250,
      status: 'completed'
    }, {
      name: 'large_dataset.csv',
      size: 1024 * 15000,
      status: 'error'
    }, {
      name: 'contract_draft.docx',
      size: 1024 * 800,
      status: 'uploading',
      progress: 35
    }],
    onRetryFile: (file, idx) => alert(\`Retrying upload for \${file.name} at index \${idx}\`)
  }
}`,...(I=($=h.parameters)==null?void 0:$.docs)==null?void 0:I.source}}};var R,W,G;y.parameters={...y.parameters,docs:{...(R=y.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    multiple: true,
    maxFiles: 5,
    label: 'Upload document attachments',
    helperText: 'Upload up to 5 files (Max 10MB each)',
    maxSize: 10 * 1024 * 1024
  }
}`,...(G=(W=y.parameters)==null?void 0:W.docs)==null?void 0:G.source}}};var A,E,V;v.parameters={...v.parameters,docs:{...(A=v.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    disabled: true,
    label: 'Upload is disabled',
    helperText: 'You do not have permission to upload files.'
  }
}`,...(V=(E=v.parameters)==null?void 0:E.docs)==null?void 0:V.source}}};const se=["Default","WithUploadedFiles","UploadFailedWithRetry","MultipleFiles","DisabledState"];export{g as Default,v as DisabledState,y as MultipleFiles,h as UploadFailedWithRetry,x as WithUploadedFiles,se as __namedExportsOrder,ae as default};
