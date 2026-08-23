import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as f,R as Jt}from"./index-CC0H-XIk.js";import{C as Ae}from"./Checkbox-B-VyznxO.js";import{S as C}from"./Skeleton-CYAW5Hss.js";import{T as _t}from"./Tooltip-Bp1IY3FH.js";import{B as Ie}from"./Button-BeMeJT-5.js";import"./floating-ui.react-BUKrONLm.js";import"./index-DLSp3Bm_.js";import"./index-HBoXM-p9.js";function Xt({dir:a}){return e.jsx("svg",{width:"12",height:"12",viewBox:"0 0 12 12",fill:"currentColor",className:`gy-table-sort-icon ${a?"gy-table-sort-icon--active":""}`,children:a==="asc"?e.jsx("path",{d:"M6 2L10 8H2L6 2z"}):a==="desc"?e.jsx("path",{d:"M6 10L2 4H10L6 10z"}):e.jsxs(e.Fragment,{children:[e.jsx("path",{d:"M6 1L9 5H3L6 1z",opacity:".5"}),e.jsx("path",{d:"M6 11L3 7H9L6 11z",opacity:".5"})]})})}function b({columns:a,data:s=[],rowKey:r,variant:D="default",size:q="md",hoverable:ne=!0,showHeader:re=!0,sortable:V=!0,emptyState:he,emptyStateLabel:wt="No data available",emptyStateMessage:xe,emptyStateIcon:ve,noBorder:St=!1,sortConfig:o,onSort:se,fixedLeftmost:v=!1,fixedRightmost:ie=!1,isRowSelection:jt=!1,selectable:kt=!1,selectedRows:Tt=[],onRowSelect:le,onSelectionChange:oe,onRowClick:L,pagination:w=!1,onPageChange:ce,nestedChildrenAccessor:W,nestedDefaultExpanded:fe=!1,isLoading:x=!1,skeletonRows:Pt=5,skeletonContent:be,showPaginationSkeleton:Nt=!0,paginationDisabled:S=!1,headerAlign:Dt="left",ellipsis:Qt=!0,showTooltip:ea=!0,paginationVariant:we="compact",pageSize:j=10,stickyHeader:de=!1,className:Rt=""}){const[B,At]=f.useState(null),[$,It]=f.useState("asc"),[Mt,Se]=f.useState(1),[me,Ct]=f.useState({}),k=jt||kt,T=Tt,ue=t=>{le==null||le(t),oe==null||oe(t)},zt=(t,l)=>r?r(t):t&&typeof t=="object"&&"id"in t?String(t.id):String(l),Et=t=>{if(W)return typeof W=="function"?W(t):t[W]},je=t=>me[t]!==void 0?me[t]:!!fe,qt=(t,l)=>{l.stopPropagation(),Ct(n=>({...n,[t]:!je(t)}))},Vt=t=>{if(!V)return;const l=o!==void 0;let n="asc";const c=l?o==null?void 0:o.key:B,m=l?o==null?void 0:o.direction:$;c===t&&(n=m==="asc"?"desc":"asc"),l?se==null||se(t,n):(At(t),It(n)),Se(1)},R=f.useMemo(()=>{const t=o!==void 0?o==null?void 0:o.key:B,l=o!==void 0?o==null?void 0:o.direction:$;if(!t||!V)return s;const n=a.find(c=>c.key===t);return n?[...s].sort((c,m)=>{const u=n.accessor(c),p=n.accessor(m),i=typeof u=="string"||typeof u=="number"?u:String(u??""),g=typeof p=="string"||typeof p=="number"?p:String(p??"");if(typeof i=="number"&&typeof g=="number")return l==="asc"?i-g:g-i;const N=String(i).localeCompare(String(g),void 0,{numeric:!0});return l==="asc"?N:-N}):s},[s,o,B,$,a,V]),z=!!w,I=typeof w=="object",d=I?w.currentPage:Mt,P=I?w.totalPages:Math.max(1,Math.ceil(R.length/j)),ke=f.useMemo(()=>!z||I?R:R.slice((d-1)*j,d*j),[R,z,I,d,j]),K=f.useMemo(()=>{const t=[],l=(n,c)=>{const m=zt(n,t.length),u=Et(n),p=!!(u&&u.length>0),i=je(m);t.push({row:n,depth:c,key:m,hasChildren:p,isExpanded:i}),p&&i&&u.forEach(g=>l(g,c+1))};return ke.forEach(n=>l(n,0)),t},[ke,me,fe]),E=f.useMemo(()=>K.map(t=>t.key),[K]),pe=E.length>0&&E.every(t=>T.includes(t)),Lt=E.some(t=>T.includes(t)),Wt=()=>{if(pe)ue(T.filter(t=>!E.includes(t)));else{const t=[...new Set([...T,...E])];ue(t)}},Bt=t=>{const l=T.includes(t)?T.filter(n=>n!==t):[...T,t];ue(l)},A=t=>{S||(I?ce==null||ce(t):Se(t))},$t=()=>he||e.jsxs("div",{className:"gy-table-empty-container",children:[ve&&e.jsx("div",{className:"gy-table-empty-icon",children:ve}),e.jsx("h4",{className:"gy-table-empty-label",children:wt}),xe&&e.jsx("p",{className:"gy-table-empty-message",children:xe})]}),Kt=()=>{const t=["60%","80%","70%","85%","75%"];return Array.from({length:Pt}).map((l,n)=>{const c=`skeleton-row-${n}`;return e.jsxs("tr",{className:"gy-table-tr gy-table-tr--skeleton",children:[k&&e.jsx("td",{className:`gy-table-td gy-table-td--checkbox ${v?"gy-table-td--fixed-left":""}`,style:{left:v?0:void 0},children:e.jsx(C,{variant:"rectangular",width:"16px",height:"16px",style:{borderRadius:"4px"}})}),a.map((m,u)=>{const p=v&&u===0,i=ie&&u===a.length-1,g=p?k?48:0:void 0,N=["gy-table-td",p?"gy-table-td--fixed-left":"",i?"gy-table-td--fixed-right":""].filter(Boolean).join(" ");return e.jsx("td",{className:N,style:{width:m.width,maxWidth:m.maxWidth||m.width,textAlign:m.align||"left",left:g!==void 0?`${g}px`:void 0,right:i?0:void 0,zIndex:p||i?2:void 0},children:be||e.jsx(C,{variant:"text",width:t[(n+u)%t.length],height:"16px"})},m.key)})]},c)})},Ot=f.useMemo(()=>{if(!z)return null;if(we==="compact")return e.jsxs("div",{className:"gy-table-pagination-controls gy-table-pagination-controls--compact",children:[e.jsx("button",{type:"button",className:"gy-table-pagination-btn",onClick:()=>A(1),disabled:d===1||S||x,"aria-label":"First page",title:"First page",children:"«"}),e.jsx("button",{type:"button",className:"gy-table-pagination-btn",onClick:()=>A(d-1),disabled:d===1||S||x,"aria-label":"Previous page",title:"Previous page",children:"‹"}),e.jsxs("span",{className:"gy-table-pagination-indicator",children:["Page ",d," of ",P]}),e.jsx("button",{type:"button",className:"gy-table-pagination-btn",onClick:()=>A(d+1),disabled:d===P||S||x,"aria-label":"Next page",title:"Next page",children:"›"}),e.jsx("button",{type:"button",className:"gy-table-pagination-btn",onClick:()=>A(P),disabled:d===P||S||x,"aria-label":"Last page",title:"Last page",children:"»"})]});const l=Array.from({length:P},(n,c)=>c+1).filter(n=>n===1||n===P||Math.abs(n-d)<=1);return e.jsxs("div",{className:"gy-table-pagination-controls",children:[e.jsx("button",{type:"button",className:"gy-table-pagination-btn",onClick:()=>A(d-1),disabled:d===1||S||x,"aria-label":"Previous page",children:"‹"}),l.map((n,c,m)=>e.jsxs(Jt.Fragment,{children:[c>0&&m[c-1]!==n-1&&e.jsx("span",{className:"gy-table-pagination-ellipsis",children:"…"}),e.jsx("button",{type:"button",className:`gy-table-pagination-btn ${d===n?"gy-table-pagination-btn--active":""}`,onClick:()=>A(n),disabled:S||x,"aria-label":`Page ${n}`,"aria-current":d===n?"page":void 0,children:n})]},n)),e.jsx("button",{type:"button",className:"gy-table-pagination-btn",onClick:()=>A(d+1),disabled:d===P||S||x,"aria-label":"Next page",children:"›"})]})},[d,P,z,S,x,we]),Te=o!==void 0?o==null?void 0:o.key:B,Pe=o!==void 0?o==null?void 0:o.direction:$,Ht=["gy-table-wrapper",St?"gy-table-wrapper--no-border":"",Rt].filter(Boolean).join(" "),Ft=["gy-table",`gy-table--${q}`,`gy-table--variant-${D}`,ne?"gy-table--hoverable":""].filter(Boolean).join(" ");return e.jsxs("div",{className:Ht,children:[e.jsx("div",{className:"gy-table-container",children:e.jsxs("table",{className:Ft,"aria-label":"Data table",children:[re&&e.jsx("thead",{className:`gy-table-header ${de?"gy-table-header--sticky":""}`,children:e.jsxs("tr",{children:[k&&e.jsx("th",{className:`gy-table-th gy-table-th--checkbox ${v?"gy-table-th--fixed-left":""}`,style:{left:v?0:void 0,zIndex:v?13:de?10:void 0},children:!x&&e.jsx(Ae,{checked:pe,indeterminate:!pe&&Lt,onChange:Wt,size:"sm",disabled:x})}),a.map((t,l)=>{const n=v&&l===0,c=ie&&l===a.length-1,m=n?k?48:0:void 0,u=t.align||Dt,p=V&&t.sortable!==!1,i=["gy-table-th",p?"gy-table-th--sortable":"",n?"gy-table-th--fixed-left":"",c?"gy-table-th--fixed-right":""].filter(Boolean).join(" ");return e.jsx("th",{className:i,style:{width:t.width,maxWidth:t.maxWidth||t.width,textAlign:u,left:m!==void 0?`${m}px`:void 0,right:c?0:void 0,zIndex:n||c?12:de?10:void 0},onClick:p?()=>Vt(t.key):void 0,"aria-sort":Te===t.key?Pe==="asc"?"ascending":"descending":void 0,children:e.jsxs("span",{className:"gy-table-th-inner",style:{justifyContent:u==="right"?"flex-end":u==="center"?"center":"flex-start"},children:[t.header,p&&e.jsx(Xt,{dir:Te===t.key?Pe:void 0})]})},t.key)})]})}),e.jsx("tbody",{children:x?Kt():K.length===0?e.jsx("tr",{children:e.jsx("td",{colSpan:a.length+(k?1:0),className:"gy-table-empty",children:$t()})}):K.map(({row:t,depth:l,key:n,hasChildren:c,isExpanded:m})=>{const u=T.includes(n),p=["gy-table-tr",u?"gy-table-tr--selected":"",c?"gy-table-tr--parent":"",l>0?"gy-table-tr--nested":""].filter(Boolean).join(" ");return e.jsxs("tr",{className:p,onClick:i=>L==null?void 0:L(t,i),style:{cursor:L?"pointer":void 0},"aria-selected":k?u:void 0,children:[k&&e.jsx("td",{className:`gy-table-td gy-table-td--checkbox ${v?"gy-table-td--fixed-left":""}`,style:{left:v?0:void 0,zIndex:v?3:void 0},onClick:i=>i.stopPropagation(),children:e.jsx(Ae,{checked:u,onChange:()=>Bt(n),size:"sm"})}),a.map((i,g)=>{const N=v&&g===0,ge=ie&&g===a.length-1,Ne=N?k?48:0:void 0,M=i.accessor(t),ye=typeof M=="string"||typeof M=="number",De=ye?String(M):void 0,Gt=["gy-table-td",ye?"gy-table-td--ellipsis":"",N?"gy-table-td--fixed-left":"",ge?"gy-table-td--fixed-right":""].filter(Boolean).join(" "),Re=ye?e.jsx("div",{className:"gy-table-cell-ellipsis",style:{maxWidth:i.maxWidth||i.width||void 0},children:De?e.jsx(_t,{content:De,position:"top",maxWidth:280,children:e.jsx("span",{className:"gy-table-cell-ellipsis-text",children:M})}):e.jsx("span",{className:"gy-table-cell-ellipsis-text",children:M})}):M;return e.jsx("td",{className:Gt,style:{width:i.width,maxWidth:i.maxWidth||i.width,textAlign:i.align||"left",left:Ne!==void 0?`${Ne}px`:void 0,right:ge?0:void 0,zIndex:N||ge?2:void 0},children:g===0?e.jsxs("div",{className:"gy-table-cell-first",style:{paddingLeft:`${l*20}px`},children:[c&&e.jsx("button",{type:"button",className:`gy-table-expand-btn ${m?"gy-table-expand-btn--expanded":""}`,onClick:Ut=>qt(n,Ut),"aria-label":m?"Collapse row":"Expand row",children:e.jsx("svg",{width:"10",height:"10",viewBox:"0 0 10 10",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("path",{d:"M3 1l4 4-4 4"})})}),!c&&l>0&&e.jsx("span",{className:"gy-table-expand-spacer"}),e.jsx("span",{className:"gy-table-cell-content",children:Re})]}):Re},i.key)})]},n)})})]})}),z&&e.jsx("div",{className:"gy-table-pagination",children:x&&Nt?e.jsxs(e.Fragment,{children:[e.jsx(C,{variant:"text",width:"120px",height:"16px"}),e.jsxs("div",{style:{display:"flex",gap:"4px"},children:[e.jsx(C,{variant:"rectangular",width:"32px",height:"32px",style:{borderRadius:"6px"}}),e.jsx(C,{variant:"rectangular",width:"32px",height:"32px",style:{borderRadius:"6px"}}),e.jsx(C,{variant:"rectangular",width:"32px",height:"32px",style:{borderRadius:"6px"}})]})]}):e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"gy-table-pagination-info",children:I?e.jsxs(e.Fragment,{children:["Showing"," ",w.totalItems===0?0:(d-1)*(w.itemsPerPage||j)+1," ","to"," ",Math.min(d*(w.itemsPerPage||j),w.totalItems||0)," ","of ",w.totalItems??0," entries"]}):e.jsxs(e.Fragment,{children:["Showing"," ",R.length===0?0:(d-1)*j+1," ","to ",Math.min(d*j,R.length)," of"," ",R.length," entries"]})}),Ot]})})]})}b.__docgenInfo={description:"",methods:[],displayName:"Table",props:{columns:{required:!0,tsType:{name:"Array",elements:[{name:"Column",elements:[{name:"T"}],raw:"Column<T>"}],raw:"Column<T>[]"},description:""},data:{required:!1,tsType:{name:"Array",elements:[{name:"T"}],raw:"T[]"},description:"",defaultValue:{value:"[]",computed:!1}},rowKey:{required:!1,tsType:{name:"signature",type:"function",raw:"(row: T) => string",signature:{arguments:[{type:{name:"T"},name:"row"}],return:{name:"string"}}},description:""},variant:{required:!1,tsType:{name:"union",raw:'"default" | "striped" | "simple" | "primary" | "secondary"',elements:[{name:"literal",value:'"default"'},{name:"literal",value:'"striped"'},{name:"literal",value:'"simple"'},{name:"literal",value:'"primary"'},{name:"literal",value:'"secondary"'}]},description:"",defaultValue:{value:'"default"',computed:!1}},size:{required:!1,tsType:{name:"union",raw:'"sm" | "md" | "lg"',elements:[{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'}]},description:"",defaultValue:{value:'"md"',computed:!1}},hoverable:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},showHeader:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},sortable:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},emptyState:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},emptyStateLabel:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"No data available"',computed:!1}},emptyStateMessage:{required:!1,tsType:{name:"string"},description:""},emptyStateIcon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},noBorder:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},sortConfig:{required:!1,tsType:{name:"union",raw:"{ key: string; direction: SortDirection } | null",elements:[{name:"signature",type:"object",raw:"{ key: string; direction: SortDirection }",signature:{properties:[{key:"key",value:{name:"string",required:!0}},{key:"direction",value:{name:"union",raw:'"asc" | "desc"',elements:[{name:"literal",value:'"asc"'},{name:"literal",value:'"desc"'}],required:!0}}]}},{name:"null"}]},description:""},onSort:{required:!1,tsType:{name:"signature",type:"function",raw:"(key: string, direction: SortDirection) => void",signature:{arguments:[{type:{name:"string"},name:"key"},{type:{name:"union",raw:'"asc" | "desc"',elements:[{name:"literal",value:'"asc"'},{name:"literal",value:'"desc"'}]},name:"direction"}],return:{name:"void"}}},description:""},fixedLeftmost:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},fixedRightmost:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},isRowSelection:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},selectable:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},selectedRows:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:"",defaultValue:{value:"[]",computed:!1}},onRowSelect:{required:!1,tsType:{name:"signature",type:"function",raw:"(keys: string[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"string"}],raw:"string[]"},name:"keys"}],return:{name:"void"}}},description:""},onSelectionChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(keys: string[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"string"}],raw:"string[]"},name:"keys"}],return:{name:"void"}}},description:""},onRowClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(row: T, event: React.MouseEvent) => void",signature:{arguments:[{type:{name:"T"},name:"row"},{type:{name:"ReactMouseEvent",raw:"React.MouseEvent"},name:"event"}],return:{name:"void"}}},description:""},pagination:{required:!1,tsType:{name:"union",raw:"boolean | TablePaginationConfig",elements:[{name:"boolean"},{name:"TablePaginationConfig"}]},description:"",defaultValue:{value:"false",computed:!1}},onPageChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(page: number) => void",signature:{arguments:[{type:{name:"number"},name:"page"}],return:{name:"void"}}},description:""},nestedChildrenAccessor:{required:!1,tsType:{name:"union",raw:"keyof T | ((row: T) => T[] | undefined)",elements:[{name:"T"},{name:"unknown"}]},description:""},nestedDefaultExpanded:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},isLoading:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},skeletonRows:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"5",computed:!1}},skeletonContent:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},showPaginationSkeleton:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},paginationDisabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},headerAlign:{required:!1,tsType:{name:"union",raw:'"left" | "center" | "right"',elements:[{name:"literal",value:'"left"'},{name:"literal",value:'"center"'},{name:"literal",value:'"right"'}]},description:"",defaultValue:{value:'"left"',computed:!1}},ellipsis:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},showTooltip:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},paginationVariant:{required:!1,tsType:{name:"union",raw:'"numbers" | "compact"',elements:[{name:"literal",value:'"numbers"'},{name:"literal",value:'"compact"'}]},description:"",defaultValue:{value:'"compact"',computed:!1}},pageSize:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"10",computed:!1}},stickyHeader:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}}}};const da={title:"Galyan UI/Table",component:b,tags:["autodocs"],parameters:{layout:"centered"},decorators:[a=>e.jsx("div",{style:{width:"100%",maxWidth:860,padding:"1rem"},children:e.jsx(a,{})})],argTypes:{variant:{control:"select",options:["default","striped","simple","primary","secondary"]},size:{control:"select",options:["sm","md","lg"]},hoverable:{control:"boolean"},showHeader:{control:"boolean"},sortable:{control:"boolean"},noBorder:{control:"boolean"},fixedLeftmost:{control:"boolean"},fixedRightmost:{control:"boolean"},isRowSelection:{control:"boolean"},isLoading:{control:"boolean"},skeletonRows:{control:"number"},paginationDisabled:{control:"boolean"},headerAlign:{control:"select",options:["left","center","right"]}}},y=[{key:"name",header:"Name",accessor:a=>a.name,sortable:!0},{key:"role",header:"Role",accessor:a=>a.role,sortable:!0},{key:"status",header:"Status",accessor:a=>e.jsx("span",{style:{display:"inline-flex",alignItems:"center",padding:"2px 8px",borderRadius:"9999px",fontSize:"0.75rem",fontWeight:600,background:a.status==="active"?"color-mix(in srgb, #10b981 14%, var(--gy-surface))":a.status==="pending"?"color-mix(in srgb, #f59e0b 14%, var(--gy-surface))":"color-mix(in srgb, #ef4444 14%, var(--gy-surface))",color:a.status==="active"?"#10b981":a.status==="pending"?"#f59e0b":"#ef4444"},children:a.status}),align:"center"},{key:"revenue",header:"Annual Revenue",accessor:a=>`$${a.revenue.toLocaleString()}`,align:"right",sortable:!0}],h=[{id:"1",name:"Sophia Martinez",role:"Software Engineer",status:"active",revenue:125e3,email:"sophia@example.com",department:"Engineering"},{id:"2",name:"Jackson Miller",role:"Product Manager",status:"active",revenue:142e3,email:"jackson@example.com",department:"Product"},{id:"3",name:"Olivia Garcia",role:"UI/UX Designer",status:"inactive",revenue:98e3,email:"olivia@example.com",department:"Design"},{id:"4",name:"Liam Johnson",role:"DevOps Specialist",status:"active",revenue:135e3,email:"liam@example.com",department:"Infrastructure"},{id:"5",name:"Emma Davis",role:"Marketing Director",status:"active",revenue:112e3,email:"emma@example.com",department:"Marketing"},{id:"6",name:"Noah Wilson",role:"Security Analyst",status:"inactive",revenue:118e3,email:"noah@example.com",department:"Security"},{id:"7",name:"Mia Thomas",role:"Customer Success Manager",status:"active",revenue:85e3,email:"mia@example.com",department:"Support"},{id:"8",name:"Lucas Anderson",role:"Frontend Lead",status:"active",revenue:148e3,email:"lucas@example.com",department:"Engineering"},{id:"9",name:"Amelia White",role:"Data Scientist",status:"pending",revenue:132e3,email:"amelia@example.com",department:"AI Lab"},{id:"10",name:"Benjamin Taylor",role:"Backend Developer",status:"active",revenue:119e3,email:"ben@example.com",department:"Engineering"},{id:"11",name:"Harper Clark",role:"QA Engineer",status:"active",revenue:92e3,email:"harper@example.com",department:"QA"},{id:"12",name:"James Walker",role:"Cloud Architect",status:"active",revenue:165e3,email:"james@example.com",department:"Infrastructure"},{id:"13",name:"Evelyn Hall",role:"Growth Marketer",status:"pending",revenue:104e3,email:"evelyn@example.com",department:"Marketing"},{id:"14",name:"Alexander Young",role:"Mobile Engineer",status:"active",revenue:128e3,email:"alex@example.com",department:"Mobile"}],O={args:{columns:y,data:h.slice(0,7),rowKey:a=>a.id,variant:"default",size:"md",hoverable:!0,showHeader:!0,sortable:!0}},H={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"},children:[e.jsx("div",{style:{fontSize:"0.875rem",color:"var(--gy-text-muted)"},children:"Client-side automatic pagination with 5 items per page across 14 records:"}),e.jsx(b,{columns:y,data:h,rowKey:a=>a.id,pagination:!0,pageSize:5,hoverable:!0,sortable:!0})]})},F={render:()=>{const[a,s]=f.useState(1),r=4,D=h.length,q=Math.ceil(D/r),ne=h.slice((a-1)*r,a*r);return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsxs("span",{style:{fontSize:"0.875rem",fontWeight:600,color:"var(--gy-text)"},children:["Server-side Controlled Pagination (Page ",a," of ",q,")"]}),e.jsxs("span",{style:{fontSize:"0.75rem",color:"var(--gy-text-muted)"},children:["Total ",D," entries"]})]}),e.jsx(b,{columns:y,data:ne,rowKey:re=>re.id,pagination:{currentPage:a,totalPages:q,totalItems:D,itemsPerPage:r},onPageChange:s,hoverable:!0,sortable:!0})]})}},G={render:()=>{const[a,s]=f.useState(["1","3"]);return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"0.75rem 1rem",background:"var(--gy-surface)",borderRadius:"0.5rem",border:"1px solid var(--gy-border)"},children:[e.jsxs("div",{style:{fontSize:"0.875rem",fontWeight:600,color:"var(--gy-text)"},children:["Selected: ",e.jsx("span",{style:{color:"var(--gy-primary)"},children:a.length})," / ",h.slice(0,6).length," items"]}),e.jsxs("div",{style:{display:"flex",gap:"0.5rem"},children:[e.jsx(Ie,{size:"xs",variant:"secondary",disabled:a.length===0,onClick:()=>alert(`Exporting ${a.length} rows`),children:"Export Selected"}),e.jsx(Ie,{size:"xs",variant:"danger",disabled:a.length===0,onClick:()=>{alert(`Deleting IDs: ${a.join(", ")}`),s([])},children:"Delete Selected"})]})]}),e.jsx(b,{columns:y,data:h.slice(0,6),rowKey:r=>r.id,isRowSelection:!0,selectedRows:a,onRowSelect:s,hoverable:!0})]})}},bt=()=>e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"currentColor",style:{opacity:.8},children:[e.jsx("circle",{cx:"12",cy:"5",r:"2"}),e.jsx("circle",{cx:"12",cy:"12",r:"2"}),e.jsx("circle",{cx:"12",cy:"19",r:"2"})]}),U={render:()=>{const a=[{key:"id",header:"ID",accessor:s=>`#${s.id}`,width:"70px"},{key:"name",header:"Full Name",accessor:s=>s.name,width:"180px",sortable:!0},{key:"email",header:"Email Address",accessor:s=>s.email??"-",width:"200px"},{key:"department",header:"Department",accessor:s=>s.department??"-",width:"150px"},{key:"role",header:"Role Title",accessor:s=>s.role,width:"180px"},{key:"status",header:"Status",accessor:s=>s.status,width:"110px",align:"center"},{key:"revenue",header:"Annual Revenue",accessor:s=>`$${s.revenue.toLocaleString()}`,width:"140px",align:"right"},{key:"actions",header:"ACTIONS",width:"90px",align:"center",accessor:s=>e.jsx("button",{type:"button",style:{display:"inline-flex",alignItems:"center",justifyContent:"center",width:"32px",height:"32px",borderRadius:"8px",border:"1.5px solid color-mix(in srgb, var(--gy-primary) 30%, var(--gy-border))",background:"var(--gy-surface)",color:"var(--gy-primary)",cursor:"pointer",transition:"all 0.15s ease"},onClick:r=>{r.stopPropagation(),alert(`Actions menu clicked for ${s.name}`)},"aria-label":"Row actions",children:e.jsx(bt,{})})}];return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"0.75rem"},children:[e.jsxs("div",{style:{fontSize:"0.875rem",color:"var(--gy-text-muted)"},children:["Horizontal scrolling table with ",e.jsx("strong",{children:"fixed left checkbox & ID"})," and ",e.jsx("strong",{children:"fixed right ACTIONS column"}),":"]}),e.jsx("div",{style:{maxWidth:640,overflowX:"auto"},children:e.jsx(b,{columns:a,data:h.slice(0,8),rowKey:s=>s.id,stickyHeader:!0,fixedLeftmost:!0,fixedRightmost:!0,isRowSelection:!0,hoverable:!0})})]})}},Zt=()=>e.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.75",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("rect",{x:"4",y:"2",width:"16",height:"20",rx:"2",ry:"2"}),e.jsx("path",{d:"M9 22v-4h6v4"}),e.jsx("path",{d:"M8 6h.01"}),e.jsx("path",{d:"M16 6h.01"}),e.jsx("path",{d:"M12 6h.01"}),e.jsx("path",{d:"M12 10h.01"}),e.jsx("path",{d:"M12 14h.01"}),e.jsx("path",{d:"M16 10h.01"}),e.jsx("path",{d:"M16 14h.01"}),e.jsx("path",{d:"M8 10h.01"}),e.jsx("path",{d:"M8 14h.01"})]}),J={render:()=>{const a=[{id:"1",name:"PRICOL LIMITED - PLANT 2",gst:"06AAGCP0139E1ZT",contactPerson:"NA",email:"dalbiryadav@pricol.com",phone:"-",address:"Plot No 34, 35, Sector 4, Innovation Park"},{id:"2",name:"Billion Engineers Pvt. Ltd.",gst:"06AAACB5289K",contactPerson:"Tiwari",email:"billionengineers@gmail.com",phone:"-",address:"Plot No 577, Sector 8, IMT Manesar Technology Hub"},{id:"3",name:"AISIN Automotive Haryana Ltd.",gst:"06AAACA0000A1Z5",contactPerson:"Rajesh Kumar (DGM Procurement)",email:"procurement@aisin-india.co.in",phone:"+91-124-4890100",address:"Plot 42, Sector 8, IMT Manesar Expressway"}],s=[{key:"company",header:"COMPANY NAME",width:"310px",accessor:r=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.875rem"},children:[e.jsx("div",{style:{width:36,height:36,borderRadius:"8px",background:"color-mix(in srgb, var(--gy-primary) 12%, var(--gy-surface))",color:"var(--gy-primary)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,border:"1px solid color-mix(in srgb, var(--gy-primary) 20%, transparent)"},children:e.jsx(Zt,{})}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"2px",minWidth:0},children:[e.jsx("span",{style:{fontWeight:700,fontSize:"0.85rem",color:"var(--gy-text)",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},children:r.name}),e.jsxs("span",{style:{fontSize:"0.7rem",color:"var(--gy-text-muted)",fontFamily:"monospace",letterSpacing:"0.03em"},children:["GST: ",r.gst]})]})]})},{key:"contact",header:"CONTACT PERSON",width:"210px",accessor:r=>e.jsx("span",{style:{color:"var(--gy-text)",fontSize:"0.85rem"},children:r.contactPerson})},{key:"email",header:"EMAIL",width:"230px",accessor:r=>e.jsx("span",{style:{color:"var(--gy-text)",fontSize:"0.85rem"},children:r.email})},{key:"phone",header:"PHONE",width:"140px",accessor:r=>e.jsx("span",{style:{color:"var(--gy-text)",fontSize:"0.85rem"},children:r.phone})},{key:"address",header:"ADDRESS",width:"220px",accessor:r=>r.address},{key:"actions",header:"ACTIONS",width:"80px",align:"center",accessor:r=>e.jsx("button",{type:"button",style:{display:"inline-flex",alignItems:"center",justifyContent:"center",width:"32px",height:"32px",borderRadius:"8px",border:"1.5px solid color-mix(in srgb, var(--gy-primary) 30%, var(--gy-border))",background:"var(--gy-surface)",color:"var(--gy-primary)",cursor:"pointer",transition:"all 0.15s ease"},onClick:D=>{D.stopPropagation(),alert(`Action for ${r.name}`)},"aria-label":"Actions menu",children:e.jsx(bt,{})})}];return e.jsx("div",{style:{width:"100%",maxWidth:"980px"},children:e.jsx(b,{columns:s,data:a,rowKey:r=>r.id,fixedRightmost:!0,pagination:!0,pageSize:3,paginationVariant:"compact",hoverable:!0})})}},_={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"2rem"},children:[e.jsxs("div",{children:[e.jsx("h4",{style:{margin:"0 0 0.5rem",color:"var(--gy-text)",fontSize:"0.875rem"},children:"Small (sm) - Compact Data Density"}),e.jsx(b,{columns:y,data:h.slice(0,3),size:"sm"})]}),e.jsxs("div",{children:[e.jsx("h4",{style:{margin:"0 0 0.5rem",color:"var(--gy-text)",fontSize:"0.875rem"},children:"Medium (md) - Standard Default"}),e.jsx(b,{columns:y,data:h.slice(0,3),size:"md"})]}),e.jsxs("div",{children:[e.jsx("h4",{style:{margin:"0 0 0.5rem",color:"var(--gy-text)",fontSize:"0.875rem"},children:"Large (lg) - Spacious Presentation"}),e.jsx(b,{columns:y,data:h.slice(0,3),size:"lg"})]})]})},X={args:{columns:y,data:h.slice(0,6),rowKey:a=>a.id,variant:"striped",hoverable:!0}},Z={args:{columns:y,data:h.slice(0,6),rowKey:a=>a.id,variant:"simple"}},Y={args:{columns:y,data:h.slice(0,6),rowKey:a=>a.id,variant:"primary",hoverable:!0}},Yt=[{id:"1",name:"Sophia Martinez",role:"VP Engineering",status:"active",revenue:25e4,subRows:[{id:"1-1",name:"Liam Johnson",role:"DevOps Lead",status:"active",revenue:165e3},{id:"1-2",name:"Olivia Garcia",role:"Design Manager",status:"active",revenue:155e3,subRows:[{id:"1-2-1",name:"Chloe Brown",role:"Junior Designer",status:"active",revenue:75e3}]}]},{id:"2",name:"Jackson Miller",role:"Director of Product",status:"active",revenue:195e3,subRows:[{id:"2-1",name:"Emma Davis",role:"Senior Product Manager",status:"inactive",revenue:142e3}]}],Q={args:{columns:y,data:Yt,rowKey:a=>a.id,nestedChildrenAccessor:"subRows",nestedDefaultExpanded:!0}},ee={args:{columns:y,data:[],isLoading:!0,skeletonRows:5}},te={render:()=>{const a=[{id:"1",name:"Sophia Martinez-Harding-Montgomery (Lead Staff Architect)",role:"Principal Infrastructure & Distributed Cloud Systems Engineer",status:"active",revenue:185e3},{id:"2",name:"Alexander Bartholomew Wellington III",role:"Senior Enterprise Product Strategy & Global Compliance Manager",status:"active",revenue:195e3},{id:"3",name:"Olivia-Genevieve Garcia-Vanderbilt",role:"Lead Creative Interaction & High-Fidelity UI/UX Design Specialist",status:"inactive",revenue:145e3}],s=[{key:"name",header:"Name (Width 160px)",accessor:r=>r.name,width:"160px"},{key:"role",header:"Role (Width 200px)",accessor:r=>r.role,width:"200px"},{key:"status",header:"Status",accessor:r=>r.status,width:"100px",align:"center"},{key:"revenue",header:"Revenue",accessor:r=>`$${r.revenue.toLocaleString()}`,width:"120px",align:"right"}];return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"},children:[e.jsxs("div",{style:{fontSize:"0.875rem",color:"var(--gy-text-muted)"},children:["Columns with constrained widths automatically truncate with ",e.jsx("strong",{children:"… (ellipsis)"})," and display the full text in a ",e.jsx("strong",{children:"soft connected Tooltip"})," on hover:"]}),e.jsx(b,{columns:s,data:a,rowKey:r=>r.id,hoverable:!0})]})}},ae={args:{columns:y,data:[],emptyStateLabel:"No customers match your criteria",emptyStateMessage:"Try adjusting your search query or reset active filters.",emptyStateIcon:e.jsxs("svg",{width:"36",height:"36",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",children:[e.jsx("circle",{cx:"11",cy:"11",r:"8"}),e.jsx("path",{d:"M21 21l-4.35-4.35"})]})}};var Me,Ce,ze;O.parameters={...O.parameters,docs:{...(Me=O.parameters)==null?void 0:Me.docs,source:{originalSource:`{
  args: {
    columns,
    data: sampleData.slice(0, 7),
    rowKey: row => row.id,
    variant: "default",
    size: "md",
    hoverable: true,
    showHeader: true,
    sortable: true
  }
}`,...(ze=(Ce=O.parameters)==null?void 0:Ce.docs)==null?void 0:ze.source}}};var Ee,qe,Ve;H.parameters={...H.parameters,docs:{...(Ee=H.parameters)==null?void 0:Ee.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "1rem"
  }}>\r
      <div style={{
      fontSize: "0.875rem",
      color: "var(--gy-text-muted)"
    }}>\r
        Client-side automatic pagination with 5 items per page across 14 records:\r
      </div>\r
      <Table columns={columns} data={sampleData} rowKey={row => row.id} pagination={true} pageSize={5} hoverable sortable />\r
    </div>
}`,...(Ve=(qe=H.parameters)==null?void 0:qe.docs)==null?void 0:Ve.source}}};var Le,We,Be;F.parameters={...F.parameters,docs:{...(Le=F.parameters)==null?void 0:Le.docs,source:{originalSource:`{
  render: () => {
    const [page, setPage] = useState(1);
    const pageSize = 4;
    const totalItems = sampleData.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const currentRows = sampleData.slice((page - 1) * pageSize, page * pageSize);
    return <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "1rem"
    }}>\r
        <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>\r
          <span style={{
          fontSize: "0.875rem",
          fontWeight: 600,
          color: "var(--gy-text)"
        }}>\r
            Server-side Controlled Pagination (Page {page} of {totalPages})\r
          </span>\r
          <span style={{
          fontSize: "0.75rem",
          color: "var(--gy-text-muted)"
        }}>\r
            Total {totalItems} entries\r
          </span>\r
        </div>\r
        <Table columns={columns} data={currentRows} rowKey={row => row.id} pagination={{
        currentPage: page,
        totalPages,
        totalItems,
        itemsPerPage: pageSize
      }} onPageChange={setPage} hoverable sortable />\r
      </div>;
  }
}`,...(Be=(We=F.parameters)==null?void 0:We.docs)==null?void 0:Be.source}}};var $e,Ke,Oe;G.parameters={...G.parameters,docs:{...($e=G.parameters)==null?void 0:$e.docs,source:{originalSource:`{
  render: () => {
    const [selected, setSelected] = useState<string[]>(["1", "3"]);
    return <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "1rem"
    }}>\r
        <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0.75rem 1rem",
        background: "var(--gy-surface)",
        borderRadius: "0.5rem",
        border: "1px solid var(--gy-border)"
      }}>\r
          <div style={{
          fontSize: "0.875rem",
          fontWeight: 600,
          color: "var(--gy-text)"
        }}>\r
            Selected: <span style={{
            color: "var(--gy-primary)"
          }}>{selected.length}</span> / {sampleData.slice(0, 6).length} items\r
          </div>\r
          <div style={{
          display: "flex",
          gap: "0.5rem"
        }}>\r
            <Button size="xs" variant="secondary" disabled={selected.length === 0} onClick={() => alert(\`Exporting \${selected.length} rows\`)}>\r
              Export Selected\r
            </Button>\r
            <Button size="xs" variant="danger" disabled={selected.length === 0} onClick={() => {
            alert(\`Deleting IDs: \${selected.join(", ")}\`);
            setSelected([]);
          }}>\r
              Delete Selected\r
            </Button>\r
          </div>\r
        </div>\r
\r
        <Table columns={columns} data={sampleData.slice(0, 6)} rowKey={row => row.id} isRowSelection selectedRows={selected} onRowSelect={setSelected} hoverable />\r
      </div>;
  }
}`,...(Oe=(Ke=G.parameters)==null?void 0:Ke.docs)==null?void 0:Oe.source}}};var He,Fe,Ge;U.parameters={...U.parameters,docs:{...(He=U.parameters)==null?void 0:He.docs,source:{originalSource:`{
  render: () => {
    const wideColumns: Column<User>[] = [{
      key: "id",
      header: "ID",
      accessor: r => \`#\${r.id}\`,
      width: "70px"
    }, {
      key: "name",
      header: "Full Name",
      accessor: r => r.name,
      width: "180px",
      sortable: true
    }, {
      key: "email",
      header: "Email Address",
      accessor: r => r.email ?? "-",
      width: "200px"
    }, {
      key: "department",
      header: "Department",
      accessor: r => r.department ?? "-",
      width: "150px"
    }, {
      key: "role",
      header: "Role Title",
      accessor: r => r.role,
      width: "180px"
    }, {
      key: "status",
      header: "Status",
      accessor: r => r.status,
      width: "110px",
      align: "center"
    }, {
      key: "revenue",
      header: "Annual Revenue",
      accessor: r => \`$\${r.revenue.toLocaleString()}\`,
      width: "140px",
      align: "right"
    }, {
      key: "actions",
      header: "ACTIONS",
      width: "90px",
      align: "center",
      accessor: r => <button type="button" style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "32px",
        height: "32px",
        borderRadius: "8px",
        border: "1.5px solid color-mix(in srgb, var(--gy-primary) 30%, var(--gy-border))",
        background: "var(--gy-surface)",
        color: "var(--gy-primary)",
        cursor: "pointer",
        transition: "all 0.15s ease"
      }} onClick={e => {
        e.stopPropagation();
        alert(\`Actions menu clicked for \${r.name}\`);
      }} aria-label="Row actions">\r
            <MoreVerticalIcon />\r
          </button>
    }];
    return <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "0.75rem"
    }}>\r
        <div style={{
        fontSize: "0.875rem",
        color: "var(--gy-text-muted)"
      }}>\r
          Horizontal scrolling table with <strong>fixed left checkbox & ID</strong> and <strong>fixed right ACTIONS column</strong>:\r
        </div>\r
        <div style={{
        maxWidth: 640,
        overflowX: "auto"
      }}>\r
          <Table columns={wideColumns} data={sampleData.slice(0, 8)} rowKey={r => r.id} stickyHeader fixedLeftmost fixedRightmost isRowSelection hoverable />\r
        </div>\r
      </div>;
  }
}`,...(Ge=(Fe=U.parameters)==null?void 0:Fe.docs)==null?void 0:Ge.source}}};var Ue,Je,_e;J.parameters={...J.parameters,docs:{...(Ue=J.parameters)==null?void 0:Ue.docs,source:{originalSource:`{
  render: () => {
    interface CompanyRecord {
      id: string;
      name: string;
      gst: string;
      contactPerson: string;
      email: string;
      phone: string;
      address: string;
    }
    const companyData: CompanyRecord[] = [{
      id: "1",
      name: "PRICOL LIMITED - PLANT 2",
      gst: "06AAGCP0139E1ZT",
      contactPerson: "NA",
      email: "dalbiryadav@pricol.com",
      phone: "-",
      address: "Plot No 34, 35, Sector 4, Innovation Park"
    }, {
      id: "2",
      name: "Billion Engineers Pvt. Ltd.",
      gst: "06AAACB5289K",
      contactPerson: "Tiwari",
      email: "billionengineers@gmail.com",
      phone: "-",
      address: "Plot No 577, Sector 8, IMT Manesar Technology Hub"
    }, {
      id: "3",
      name: "AISIN Automotive Haryana Ltd.",
      gst: "06AAACA0000A1Z5",
      contactPerson: "Rajesh Kumar (DGM Procurement)",
      email: "procurement@aisin-india.co.in",
      phone: "+91-124-4890100",
      address: "Plot 42, Sector 8, IMT Manesar Expressway"
    }];
    const enterpriseColumns: Column<CompanyRecord>[] = [{
      key: "company",
      header: "COMPANY NAME",
      width: "310px",
      accessor: r => <div style={{
        display: "flex",
        alignItems: "center",
        gap: "0.875rem"
      }}>\r
            <div style={{
          width: 36,
          height: 36,
          borderRadius: "8px",
          background: "color-mix(in srgb, var(--gy-primary) 12%, var(--gy-surface))",
          color: "var(--gy-primary)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          border: "1px solid color-mix(in srgb, var(--gy-primary) 20%, transparent)"
        }}>\r
              <BuildingIcon />\r
            </div>\r
            <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "2px",
          minWidth: 0
        }}>\r
              <span style={{
            fontWeight: 700,
            fontSize: "0.85rem",
            color: "var(--gy-text)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}>\r
                {r.name}\r
              </span>\r
              <span style={{
            fontSize: "0.7rem",
            color: "var(--gy-text-muted)",
            fontFamily: "monospace",
            letterSpacing: "0.03em"
          }}>\r
                GST: {r.gst}\r
              </span>\r
            </div>\r
          </div>
    }, {
      key: "contact",
      header: "CONTACT PERSON",
      width: "210px",
      accessor: r => <span style={{
        color: "var(--gy-text)",
        fontSize: "0.85rem"
      }}>\r
            {r.contactPerson}\r
          </span>
    }, {
      key: "email",
      header: "EMAIL",
      width: "230px",
      accessor: r => <span style={{
        color: "var(--gy-text)",
        fontSize: "0.85rem"
      }}>\r
            {r.email}\r
          </span>
    }, {
      key: "phone",
      header: "PHONE",
      width: "140px",
      accessor: r => <span style={{
        color: "var(--gy-text)",
        fontSize: "0.85rem"
      }}>\r
            {r.phone}\r
          </span>
    }, {
      key: "address",
      header: "ADDRESS",
      width: "220px",
      accessor: r => r.address
    }, {
      key: "actions",
      header: "ACTIONS",
      width: "80px",
      align: "center",
      accessor: r => <button type="button" style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "32px",
        height: "32px",
        borderRadius: "8px",
        border: "1.5px solid color-mix(in srgb, var(--gy-primary) 30%, var(--gy-border))",
        background: "var(--gy-surface)",
        color: "var(--gy-primary)",
        cursor: "pointer",
        transition: "all 0.15s ease"
      }} onClick={e => {
        e.stopPropagation();
        alert(\`Action for \${r.name}\`);
      }} aria-label="Actions menu">\r
            <MoreVerticalIcon />\r
          </button>
    }];
    return <div style={{
      width: "100%",
      maxWidth: "980px"
    }}>\r
        <Table columns={enterpriseColumns} data={companyData} rowKey={r => r.id} fixedRightmost pagination={true} pageSize={3} paginationVariant="compact" hoverable />\r
      </div>;
  }
}`,...(_e=(Je=J.parameters)==null?void 0:Je.docs)==null?void 0:_e.source}}};var Xe,Ze,Ye;_.parameters={..._.parameters,docs:{...(Xe=_.parameters)==null?void 0:Xe.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "2rem"
  }}>\r
      <div>\r
        <h4 style={{
        margin: "0 0 0.5rem",
        color: "var(--gy-text)",
        fontSize: "0.875rem"
      }}>\r
          Small (sm) - Compact Data Density\r
        </h4>\r
        <Table columns={columns} data={sampleData.slice(0, 3)} size="sm" />\r
      </div>\r
\r
      <div>\r
        <h4 style={{
        margin: "0 0 0.5rem",
        color: "var(--gy-text)",
        fontSize: "0.875rem"
      }}>\r
          Medium (md) - Standard Default\r
        </h4>\r
        <Table columns={columns} data={sampleData.slice(0, 3)} size="md" />\r
      </div>\r
\r
      <div>\r
        <h4 style={{
        margin: "0 0 0.5rem",
        color: "var(--gy-text)",
        fontSize: "0.875rem"
      }}>\r
          Large (lg) - Spacious Presentation\r
        </h4>\r
        <Table columns={columns} data={sampleData.slice(0, 3)} size="lg" />\r
      </div>\r
    </div>
}`,...(Ye=(Ze=_.parameters)==null?void 0:Ze.docs)==null?void 0:Ye.source}}};var Qe,et,tt;X.parameters={...X.parameters,docs:{...(Qe=X.parameters)==null?void 0:Qe.docs,source:{originalSource:`{
  args: {
    columns,
    data: sampleData.slice(0, 6),
    rowKey: row => row.id,
    variant: "striped",
    hoverable: true
  }
}`,...(tt=(et=X.parameters)==null?void 0:et.docs)==null?void 0:tt.source}}};var at,nt,rt;Z.parameters={...Z.parameters,docs:{...(at=Z.parameters)==null?void 0:at.docs,source:{originalSource:`{
  args: {
    columns,
    data: sampleData.slice(0, 6),
    rowKey: row => row.id,
    variant: "simple"
  }
}`,...(rt=(nt=Z.parameters)==null?void 0:nt.docs)==null?void 0:rt.source}}};var st,it,lt;Y.parameters={...Y.parameters,docs:{...(st=Y.parameters)==null?void 0:st.docs,source:{originalSource:`{
  args: {
    columns,
    data: sampleData.slice(0, 6),
    rowKey: row => row.id,
    variant: "primary",
    hoverable: true
  }
}`,...(lt=(it=Y.parameters)==null?void 0:it.docs)==null?void 0:lt.source}}};var ot,ct,dt;Q.parameters={...Q.parameters,docs:{...(ot=Q.parameters)==null?void 0:ot.docs,source:{originalSource:`{
  args: {
    columns,
    data: hierarchicalData,
    rowKey: row => row.id,
    nestedChildrenAccessor: "subRows",
    nestedDefaultExpanded: true
  }
}`,...(dt=(ct=Q.parameters)==null?void 0:ct.docs)==null?void 0:dt.source}}};var mt,ut,pt;ee.parameters={...ee.parameters,docs:{...(mt=ee.parameters)==null?void 0:mt.docs,source:{originalSource:`{
  args: {
    columns,
    data: [],
    isLoading: true,
    skeletonRows: 5
  }
}`,...(pt=(ut=ee.parameters)==null?void 0:ut.docs)==null?void 0:pt.source}}};var gt,yt,ht;te.parameters={...te.parameters,docs:{...(gt=te.parameters)==null?void 0:gt.docs,source:{originalSource:`{
  render: () => {
    const longTextData = [{
      id: "1",
      name: "Sophia Martinez-Harding-Montgomery (Lead Staff Architect)",
      role: "Principal Infrastructure & Distributed Cloud Systems Engineer",
      status: "active" as const,
      revenue: 185000
    }, {
      id: "2",
      name: "Alexander Bartholomew Wellington III",
      role: "Senior Enterprise Product Strategy & Global Compliance Manager",
      status: "active" as const,
      revenue: 195000
    }, {
      id: "3",
      name: "Olivia-Genevieve Garcia-Vanderbilt",
      role: "Lead Creative Interaction & High-Fidelity UI/UX Design Specialist",
      status: "inactive" as const,
      revenue: 145000
    }];
    const ellipsisColumns: Column<User>[] = [{
      key: "name",
      header: "Name (Width 160px)",
      accessor: r => r.name,
      width: "160px"
    }, {
      key: "role",
      header: "Role (Width 200px)",
      accessor: r => r.role,
      width: "200px"
    }, {
      key: "status",
      header: "Status",
      accessor: r => r.status,
      width: "100px",
      align: "center"
    }, {
      key: "revenue",
      header: "Revenue",
      accessor: r => \`$\${r.revenue.toLocaleString()}\`,
      width: "120px",
      align: "right"
    }];
    return <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "1rem"
    }}>\r
        <div style={{
        fontSize: "0.875rem",
        color: "var(--gy-text-muted)"
      }}>\r
          Columns with constrained widths automatically truncate with <strong>… (ellipsis)</strong> and display the full text in a <strong>soft connected Tooltip</strong> on hover:\r
        </div>\r
        <Table columns={ellipsisColumns} data={longTextData} rowKey={r => r.id} hoverable />\r
      </div>;
  }
}`,...(ht=(yt=te.parameters)==null?void 0:yt.docs)==null?void 0:ht.source}}};var xt,vt,ft;ae.parameters={...ae.parameters,docs:{...(xt=ae.parameters)==null?void 0:xt.docs,source:{originalSource:`{
  args: {
    columns,
    data: [],
    emptyStateLabel: "No customers match your criteria",
    emptyStateMessage: "Try adjusting your search query or reset active filters.",
    emptyStateIcon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">\r
        <circle cx="11" cy="11" r="8" />\r
        <path d="M21 21l-4.35-4.35" />\r
      </svg>
  }
}`,...(ft=(vt=ae.parameters)==null?void 0:vt.docs)==null?void 0:ft.source}}};const ma=["Default","PaginationInternal","ControlledServerPagination","RowSelectionWithBulkActions","StickyHeaderAndFixedColumns","EnterpriseCompanyDirectory","TableSizesShowcase","StripedVariant","SimpleVariant","PrimaryBrandVariant","TreeNestedGrid","LoadingSkeletonState","EllipsisWithTooltipOnOverflow","CustomEmptyState"];export{F as ControlledServerPagination,ae as CustomEmptyState,O as Default,te as EllipsisWithTooltipOnOverflow,J as EnterpriseCompanyDirectory,ee as LoadingSkeletonState,H as PaginationInternal,Y as PrimaryBrandVariant,G as RowSelectionWithBulkActions,Z as SimpleVariant,U as StickyHeaderAndFixedColumns,X as StripedVariant,_ as TableSizesShowcase,Q as TreeNestedGrid,ma as __namedExportsOrder,da as default};
