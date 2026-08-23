import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as h}from"./index-CC0H-XIk.js";import{T as F}from"./Tooltip-Bp1IY3FH.js";import"./floating-ui.react-BUKrONLm.js";import"./index-DLSp3Bm_.js";import"./index-HBoXM-p9.js";const T=l=>{if(!l||l===0)return"0 B";const i=1024,u=["B","KB","MB","GB"],d=Math.floor(Math.log(l)/Math.log(i));return parseFloat((l/Math.pow(i,d)).toFixed(1))+" "+u[d]};function Q({onFilesSelected:l,onRemoveFile:i,onRetryFile:u,uploadedFiles:d,multiple:k=!1,accept:X,maxSize:c,maxFiles:P,disabled:m=!1,label:Z="Click or drag files to upload",helperText:_,simulateUpload:ee=!0,className:ae=""}){const[se,w]=h.useState(!1),[g,f]=h.useState(d??[]),M=h.useRef(null);h.useEffect(()=>{d&&f(d)},[d]);const te=a=>{let s=0;const n=setInterval(()=>{s+=Math.floor(Math.random()*25)+15,s>=100?(s=100,clearInterval(n),f(o=>o.map(t=>t.id===a.id?{...t,status:"completed",progress:100}:t))):f(o=>o.map(t=>t.id===a.id?{...t,status:"uploading",progress:s}:t))},200)},D=a=>{if(!a)return;const s=Array.from(a).filter(r=>!c||r.size<=c),n=s.map(r=>{if(ee){const p={id:`${r.name}-${Date.now()}-${Math.random()}`,name:r.name,size:r.size,type:r.type,status:"uploading",progress:0};return setTimeout(()=>te(p),50),p}return r}),o=k?[...g,...n]:n,t=P?o.slice(0,P):o;f(t),l==null||l(s)},N=a=>{a.preventDefault(),a.stopPropagation(),!m&&(a.type==="dragenter"||a.type==="dragover"?w(!0):a.type==="dragleave"&&w(!1))},re=a=>{a.preventDefault(),a.stopPropagation(),w(!1),!m&&D(a.dataTransfer.files)},le=a=>{const s=g[a],n=g.filter((o,t)=>t!==a);f(n),s&&(i==null||i(s,a))};return e.jsxs("div",{className:`gy-fileupload ${ae}`,children:[e.jsxs("div",{className:["gy-fileupload-zone",se?"gy-fileupload-zone--drag-active":"",m?"gy-fileupload-zone--disabled":""].filter(Boolean).join(" "),onClick:()=>{var a;return!m&&((a=M.current)==null?void 0:a.click())},onDragEnter:N,onDragLeave:N,onDragOver:N,onDrop:re,children:[e.jsx("input",{ref:M,type:"file",className:"gy-fileupload-input",multiple:k,accept:X,disabled:m,onChange:a=>D(a.target.files)}),e.jsx("div",{className:"gy-fileupload-zone-icon",children:e.jsxs("svg",{width:"28",height:"28",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),e.jsx("polyline",{points:"17 8 12 3 7 8"}),e.jsx("line",{x1:"12",y1:"3",x2:"12",y2:"15"})]})}),e.jsx("div",{className:"gy-fileupload-text",children:Z}),(_||c)&&e.jsxs("div",{className:"gy-fileupload-subtext",children:[_," ",c&&`(Max ${T(c)})`]})]}),g.length>0&&e.jsx("div",{className:"gy-fileupload-list",children:g.map((a,s)=>{const n=a instanceof File,o=a.name,t=a.size,r=n?"completed":a.status??"completed",p=n?100:a.progress??0;return e.jsxs("div",{className:`gy-fileupload-item gy-fileupload-item--${r}`,children:[e.jsx("div",{className:"gy-fileupload-item-icon",children:e.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"}),e.jsx("polyline",{points:"13 2 13 9 20 9"})]})}),e.jsxs("div",{className:"gy-fileupload-item-info",children:[e.jsx("div",{className:"gy-fileupload-item-top",children:e.jsx(F,{content:o,position:"top",maxWidth:300,children:e.jsx("span",{className:"gy-fileupload-item-name",children:o})})}),r==="uploading"?e.jsxs("div",{className:"gy-fileupload-progress-wrapper",children:[e.jsx("div",{className:"gy-fileupload-progress-bar",children:e.jsx("div",{className:"gy-fileupload-progress-fill",style:{width:`${p}%`}})}),e.jsxs("div",{className:"gy-fileupload-item-meta",children:[e.jsx("span",{className:"gy-fileupload-item-size",children:T(t)}),e.jsxs("span",{className:"gy-fileupload-item-progress-text",children:[p,"%"]})]})]}):e.jsx("div",{className:"gy-fileupload-item-meta",children:e.jsx("span",{className:"gy-fileupload-item-size",children:T(t)})})]}),e.jsxs("div",{className:"gy-fileupload-item-actions",children:[r==="completed"&&e.jsx("span",{className:"gy-fileupload-status-badge gy-fileupload-status-badge--success",children:"✓ Uploaded"}),r==="uploading"&&e.jsxs("span",{className:"gy-fileupload-status-badge gy-fileupload-status-badge--uploading",children:[p,"%"]}),r==="error"&&e.jsx("span",{className:"gy-fileupload-status-badge gy-fileupload-status-badge--error",children:"Failed"}),r==="error"&&e.jsx(F,{content:"Retry file upload",position:"top",children:e.jsxs("button",{type:"button",className:"gy-fileupload-item-retry",onClick:U=>{U.stopPropagation(),u==null||u(a,s)},"aria-label":"Retry upload",children:[e.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.25",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("polyline",{points:"23 4 23 10 17 10"}),e.jsx("path",{d:"M20.49 15a9 9 0 1 1-2.12-9.36L23 10"})]}),e.jsx("span",{children:"Retry"})]})}),e.jsx(F,{content:"Remove file",position:"top",children:e.jsx("button",{type:"button",className:"gy-fileupload-item-remove",onClick:U=>{U.stopPropagation(),le(s)},"aria-label":"Remove file",children:e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),e.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})})]})]},`${o}-${s}`)})})]})}Q.__docgenInfo={description:"",methods:[],displayName:"FileUpload",props:{onFilesSelected:{required:!1,tsType:{name:"signature",type:"function",raw:"(files: File[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"File"}],raw:"File[]"},name:"files"}],return:{name:"void"}}},description:""},onRemoveFile:{required:!1,tsType:{name:"signature",type:"function",raw:"(file: UploadedFileItem | File, index: number) => void",signature:{arguments:[{type:{name:"union",raw:"UploadedFileItem | File",elements:[{name:"UploadedFileItem"},{name:"File"}]},name:"file"},{type:{name:"number"},name:"index"}],return:{name:"void"}}},description:""},onRetryFile:{required:!1,tsType:{name:"signature",type:"function",raw:"(file: UploadedFileItem | File, index: number) => void",signature:{arguments:[{type:{name:"union",raw:"UploadedFileItem | File",elements:[{name:"UploadedFileItem"},{name:"File"}]},name:"file"},{type:{name:"number"},name:"index"}],return:{name:"void"}}},description:""},uploadedFiles:{required:!1,tsType:{name:"Array",elements:[{name:"unknown"}],raw:"(UploadedFileItem | File)[]"},description:""},multiple:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},accept:{required:!1,tsType:{name:"string"},description:""},maxSize:{required:!1,tsType:{name:"number"},description:""},maxFiles:{required:!1,tsType:{name:"number"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},label:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"Click or drag files to upload"',computed:!1}},helperText:{required:!1,tsType:{name:"string"},description:""},simulateUpload:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}}}};const ce={title:"Galyan UI/FileUpload",component:Q,parameters:{layout:"centered",docs:{description:{component:"Drag-and-drop file upload zone with real-time progress bars, upload completion indicators, size validation, and retry handlers."}}},tags:["autodocs"],decorators:[l=>e.jsx("div",{style:{width:540,padding:"1rem"},children:e.jsx(l,{})})],argTypes:{multiple:{control:"boolean"},disabled:{control:"boolean"},label:{control:"text"},helperText:{control:"text"},maxSize:{control:"number"},maxFiles:{control:"number"},accept:{control:"text"},simulateUpload:{control:"boolean"}}},x={args:{label:"Click or drag files to upload",helperText:"PNG, JPG, PDF up to 10MB (Drop files to see animated upload)",maxSize:10*1024*1024,multiple:!0,simulateUpload:!0}},y={args:{multiple:!1,accept:"image/png, image/jpeg, image/webp",label:"Upload Profile Picture",helperText:"JPEG, PNG, or WebP up to 2MB",maxSize:2*1024*1024}},v={args:{multiple:!0,label:"Document Processing Queue",helperText:"Showing active upload progress and completed items",uploadedFiles:[{name:"high_res_banner_asset.png",size:1024*4300,status:"uploading",progress:74},{name:"server_access_logs.tar.gz",size:1024*18500,status:"uploading",progress:32},{name:"quarterly_financial_report.pdf",size:1024*520,status:"completed"},{name:"corrupted_archive_data.bin",size:1024*12e3,status:"error"}],onRetryFile:(l,i)=>alert(`Retrying upload for ${l.name} at index ${i}`)}},b={args:{multiple:!0,label:"Uploaded Attachments",helperText:"Clean file list with truncated long names and size badges",uploadedFiles:[{name:"SAKSHAM_RESUME_YOP_2025 (3).pdf",size:1024*120,status:"completed"},{name:"beautiful-mountains-landscape.jpg",size:1024*2100,status:"completed"},{name:"snowy-mountain-peak-starry-galaxy-majestic-sunset-view.png",size:1024*5800,status:"completed"}]}},j={args:{multiple:!0,maxFiles:3,label:"Upload up to 3 attachments",helperText:"Max 3 files, up to 10MB each",maxSize:10*1024*1024}},z={args:{disabled:!0,label:"Upload is currently disabled",helperText:"You do not have write access to this bucket."}};var S,B,C;x.parameters={...x.parameters,docs:{...(S=x.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    label: "Click or drag files to upload",
    helperText: "PNG, JPG, PDF up to 10MB (Drop files to see animated upload)",
    maxSize: 10 * 1024 * 1024,
    multiple: true,
    simulateUpload: true
  }
}`,...(C=(B=x.parameters)==null?void 0:B.docs)==null?void 0:C.source}}};var q,A,L;y.parameters={...y.parameters,docs:{...(q=y.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    multiple: false,
    accept: "image/png, image/jpeg, image/webp",
    label: "Upload Profile Picture",
    helperText: "JPEG, PNG, or WebP up to 2MB",
    maxSize: 2 * 1024 * 1024
  }
}`,...(L=(A=y.parameters)==null?void 0:A.docs)==null?void 0:L.source}}};var $,E,I;v.parameters={...v.parameters,docs:{...($=v.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    multiple: true,
    label: "Document Processing Queue",
    helperText: "Showing active upload progress and completed items",
    uploadedFiles: [{
      name: "high_res_banner_asset.png",
      size: 1024 * 4300,
      status: "uploading",
      progress: 74
    }, {
      name: "server_access_logs.tar.gz",
      size: 1024 * 18500,
      status: "uploading",
      progress: 32
    }, {
      name: "quarterly_financial_report.pdf",
      size: 1024 * 520,
      status: "completed"
    }, {
      name: "corrupted_archive_data.bin",
      size: 1024 * 12000,
      status: "error"
    }],
    onRetryFile: (file, idx) => alert(\`Retrying upload for \${file.name} at index \${idx}\`)
  }
}`,...(I=(E=v.parameters)==null?void 0:E.docs)==null?void 0:I.source}}};var G,R,W;b.parameters={...b.parameters,docs:{...(G=b.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    multiple: true,
    label: "Uploaded Attachments",
    helperText: "Clean file list with truncated long names and size badges",
    uploadedFiles: [{
      name: "SAKSHAM_RESUME_YOP_2025 (3).pdf",
      size: 1024 * 120,
      status: "completed"
    }, {
      name: "beautiful-mountains-landscape.jpg",
      size: 1024 * 2100,
      status: "completed"
    }, {
      name: "snowy-mountain-peak-starry-galaxy-majestic-sunset-view.png",
      size: 1024 * 5800,
      status: "completed"
    }]
  }
}`,...(W=(R=b.parameters)==null?void 0:R.docs)==null?void 0:W.source}}};var V,H,J;j.parameters={...j.parameters,docs:{...(V=j.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    multiple: true,
    maxFiles: 3,
    label: "Upload up to 3 attachments",
    helperText: "Max 3 files, up to 10MB each",
    maxSize: 10 * 1024 * 1024
  }
}`,...(J=(H=j.parameters)==null?void 0:H.docs)==null?void 0:J.source}}};var Y,K,O;z.parameters={...z.parameters,docs:{...(Y=z.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    disabled: true,
    label: "Upload is currently disabled",
    helperText: "You do not have write access to this bucket."
  }
}`,...(O=(K=z.parameters)==null?void 0:K.docs)==null?void 0:O.source}}};const me=["Default","AvatarPhotoUpload","LiveUploadingProgress","UploadedDocuments","MultipleFilesConstraint","DisabledState"];export{y as AvatarPhotoUpload,x as Default,z as DisabledState,v as LiveUploadingProgress,j as MultipleFilesConstraint,b as UploadedDocuments,me as __namedExportsOrder,ce as default};
