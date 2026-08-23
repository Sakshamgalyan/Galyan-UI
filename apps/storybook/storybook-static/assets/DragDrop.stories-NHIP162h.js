import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as b}from"./index-CC0H-XIk.js";function w({items:d,onReorder:m,keyExtractor:g,renderItem:p,className:i=""}){const[a,c]=b.useState(null),[u,o]=b.useState(null),y=(n,t)=>{c(n),t.dataTransfer.effectAllowed="move",t.dataTransfer.setData("text/plain",n.toString())},f=(n,t)=>{t.preventDefault(),t.dataTransfer.dropEffect="move",n!==u&&o(n)},x=(n,t)=>{t.preventDefault();const r=Number(t.dataTransfer.getData("text/plain"));if(r!==n){const s=[...d],[l]=s.splice(r,1);l!==void 0&&(s.splice(n,0,l),m(s))}c(null),o(null)};return e.jsx("div",{className:`gy-dnd-list ${i}`,children:d.map((n,t)=>{const r=a===t,s=u===t;return e.jsxs("div",{className:["gy-dnd-item",r?"gy-dnd-item--dragging":"",s&&!r?"gy-dnd-item--drag-over":""].filter(Boolean).join(" "),draggable:!0,onDragStart:l=>y(t,l),onDragOver:l=>f(t,l),onDragLeave:()=>o(null),onDrop:l=>x(t,l),onDragEnd:()=>{c(null),o(null)},children:[e.jsx("div",{className:"gy-dnd-handle","aria-hidden":"true",children:e.jsxs("svg",{width:"12",height:"16",viewBox:"0 0 12 16",fill:"currentColor",children:[e.jsx("circle",{cx:"4",cy:"4",r:"1.5"}),e.jsx("circle",{cx:"8",cy:"4",r:"1.5"}),e.jsx("circle",{cx:"4",cy:"8",r:"1.5"}),e.jsx("circle",{cx:"8",cy:"8",r:"1.5"}),e.jsx("circle",{cx:"4",cy:"12",r:"1.5"}),e.jsx("circle",{cx:"8",cy:"12",r:"1.5"})]})}),e.jsx("div",{className:"gy-dnd-item-content",children:p(n,r)})]},g(n))})})}function R({columns:d,onMove:m,keyExtractor:g,renderCard:p,className:i=""}){const[a,c]=b.useState(null),[u,o]=b.useState(null),y=(n,t,r,s)=>{c({key:t,colId:r,idx:s}),n.dataTransfer.effectAllowed="move",n.dataTransfer.setData("application/json",JSON.stringify({key:t,colId:r}))},f=(n,t)=>{n.preventDefault(),n.dataTransfer.dropEffect="move",u!==t&&o(t)},x=(n,t,r)=>{n.preventDefault(),o(null);try{const s=JSON.parse(n.dataTransfer.getData("application/json"));if(s.colId===t&&s.key===(a==null?void 0:a.key)&&r===(a==null?void 0:a.idx))return;m(s.key,s.colId,t,r)}catch{}c(null)};return e.jsx("div",{className:`gy-kanban ${i}`,children:d.map(n=>e.jsxs("div",{className:"gy-kanban-column",children:[e.jsxs("div",{className:"gy-kanban-column-header",children:[e.jsx("span",{className:"gy-kanban-column-title",children:n.title}),e.jsx("span",{className:"gy-kanban-column-count",children:n.items.length})]}),e.jsx("div",{className:`gy-kanban-drop-zone ${u===n.id?"gy-kanban-drop-zone--over":""}`,onDragOver:t=>f(t,n.id),onDragLeave:()=>o(null),onDrop:t=>x(t,n.id,n.items.length),children:n.items.map((t,r)=>{const s=g(t),l=(a==null?void 0:a.key)===s;return e.jsx("div",{className:`gy-kanban-card ${l?"gy-kanban-card--dragging":""}`,draggable:!0,onDragStart:h=>y(h,s,n.id,r),onDragEnd:()=>{c(null),o(null)},onDrop:h=>{h.stopPropagation(),x(h,n.id,r)},children:p(t,l)},s)})})]},n.id))})}w.__docgenInfo={description:"",methods:[],displayName:"ReorderList",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"T"}],raw:"T[]"},description:""},onReorder:{required:!0,tsType:{name:"signature",type:"function",raw:"(newItems: T[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"T"}],raw:"T[]"},name:"newItems"}],return:{name:"void"}}},description:""},keyExtractor:{required:!0,tsType:{name:"signature",type:"function",raw:"(item: T) => string",signature:{arguments:[{type:{name:"T"},name:"item"}],return:{name:"string"}}},description:""},renderItem:{required:!0,tsType:{name:"signature",type:"function",raw:"(item: T, isDragging: boolean) => React.ReactNode",signature:{arguments:[{type:{name:"T"},name:"item"},{type:{name:"boolean"},name:"isDragging"}],return:{name:"ReactReactNode",raw:"React.ReactNode"}}},description:""},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}}}};R.__docgenInfo={description:"",methods:[],displayName:"KanbanBoard",props:{columns:{required:!0,tsType:{name:"Array",elements:[{name:"KanbanColumnDef",elements:[{name:"T"}],raw:"KanbanColumnDef<T>"}],raw:"KanbanColumnDef<T>[]"},description:""},onMove:{required:!0,tsType:{name:"signature",type:"function",raw:`(\r
  itemKey: string,\r
  fromCol: string,\r
  toCol: string,\r
  toIndex: number,\r
) => void`,signature:{arguments:[{type:{name:"string"},name:"itemKey"},{type:{name:"string"},name:"fromCol"},{type:{name:"string"},name:"toCol"},{type:{name:"number"},name:"toIndex"}],return:{name:"void"}}},description:""},keyExtractor:{required:!0,tsType:{name:"signature",type:"function",raw:"(item: T) => string",signature:{arguments:[{type:{name:"T"},name:"item"}],return:{name:"string"}}},description:""},renderCard:{required:!0,tsType:{name:"signature",type:"function",raw:"(item: T, isDragging: boolean) => React.ReactNode",signature:{arguments:[{type:{name:"T"},name:"item"},{type:{name:"boolean"},name:"isDragging"}],return:{name:"ReactReactNode",raw:"React.ReactNode"}}},description:""},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}}}};const B={title:"Galyan UI/Drag & Drop",parameters:{layout:"padded"},tags:["autodocs"]},z=()=>e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("circle",{cx:"12",cy:"12",r:"10"}),e.jsx("polyline",{points:"12 6 12 12 16 14"})]}),N=({name:d,bg:m})=>e.jsx("div",{style:{width:"24px",height:"24px",borderRadius:"50%",background:m,color:"#ffffff",fontSize:"0.6875rem",fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},children:d}),v={render:()=>{const d=[{id:"task-1",title:"Implement smart floating position in dropdown & datepicker",category:"Frontend Architecture",priority:"high",estTime:"2 hrs"},{id:"task-2",title:"Integrate typography font-family customizer in ThemeProvider",category:"Design System",priority:"high",estTime:"1 hr"},{id:"task-3",title:"Update sticky column shadows and border-collapse in Table",category:"UI Polish",priority:"medium",estTime:"45 mins"},{id:"task-4",title:"Review automated test coverage across form inputs",category:"QA & Testing",priority:"low",estTime:"3 hrs"}],[m,g]=b.useState(d),p=i=>{const a={high:{bg:"rgba(239, 68, 68, 0.12)",text:"#ef4444",border:"rgba(239, 68, 68, 0.25)"},medium:{bg:"rgba(245, 158, 11, 0.12)",text:"#f59e0b",border:"rgba(245, 158, 11, 0.25)"},low:{bg:"rgba(16, 185, 129, 0.12)",text:"#10b981",border:"rgba(16, 185, 129, 0.25)"}}[i];return e.jsx("span",{style:{fontSize:"0.7rem",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.04em",padding:"2px 8px",borderRadius:"9999px",background:a.bg,color:a.text,border:`1px solid ${a.border}`},children:i})};return e.jsxs("div",{style:{maxWidth:640,margin:"0 auto",display:"flex",flexDirection:"column",gap:"1rem"},children:[e.jsxs("div",{children:[e.jsx("h3",{style:{margin:"0 0 4px",fontSize:"1.125rem",fontWeight:700,color:"var(--gy-text)"},children:"Sprint Priority Reorder List"}),e.jsx("p",{style:{margin:0,fontSize:"0.875rem",color:"var(--gy-text-muted)"},children:"Drag and drop items using the grab handle to reorder sprint priorities:"})]}),e.jsx(w,{items:m,onReorder:g,keyExtractor:i=>i.id,renderItem:(i,a)=>e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"1rem",width:"100%"},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"3px",minWidth:0},children:[e.jsx("span",{style:{fontSize:"0.875rem",fontWeight:600,color:"var(--gy-text)"},children:i.title}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.75rem",fontSize:"0.75rem",color:"var(--gy-text-muted)"},children:[e.jsx("span",{children:i.category}),e.jsx("span",{children:"•"}),e.jsxs("span",{style:{display:"inline-flex",alignItems:"center",gap:"3px"},children:[e.jsx(z,{})," ",i.estTime]})]})]}),e.jsx("div",{children:p(i.priority)})]})})]})}},k={render:()=>{const d=[{id:"backlog",title:"Backlog",items:[{id:"kb-1",title:"Dark mode color tokens audit",tag:"Design System",assignee:{name:"AL",bg:"#6366f1"},commentsCount:3},{id:"kb-2",title:"Global tooltip collision resolution",tag:"Overlay",assignee:{name:"RK",bg:"#ec4899"},commentsCount:1}]},{id:"in_progress",title:"In Progress",items:[{id:"kb-3",title:"Sticky column drop shadow and border separation",tag:"Table",assignee:{name:"JD",bg:"#10b981"},commentsCount:5},{id:"kb-4",title:"Smart positioning via Floating UI for pickers",tag:"Component",assignee:{name:"MG",bg:"#f59e0b"},commentsCount:2}]},{id:"review",title:"In Review",items:[{id:"kb-5",title:"Font family customization in ThemeProvider",tag:"Theme",assignee:{name:"AL",bg:"#6366f1"},commentsCount:4}]},{id:"done",title:"Done",items:[{id:"kb-6",title:"Button variant hover glows & brand palettes",tag:"Core UI",assignee:{name:"JD",bg:"#10b981"},commentsCount:7}]}],[m,g]=b.useState(d),p=(i,a,c,u)=>{g(o=>{const y=o.map(r=>({...r,items:[...r.items]})),f=y.find(r=>r.id===a),x=y.find(r=>r.id===c);if(!f||!x)return o;const n=f.items.findIndex(r=>r.id===i);if(n===-1)return o;const[t]=f.items.splice(n,1);return t?(x.items.splice(u,0,t),y):o})};return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"},children:[e.jsxs("div",{children:[e.jsx("h3",{style:{margin:"0 0 4px",fontSize:"1.125rem",fontWeight:700,color:"var(--gy-text)"},children:"Product Engineering Kanban Board"}),e.jsx("p",{style:{margin:0,fontSize:"0.875rem",color:"var(--gy-text-muted)"},children:"Drag cards between columns or reorder them within a column:"})]}),e.jsx(R,{columns:m,onMove:p,keyExtractor:i=>i.id,renderCard:(i,a)=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"0.625rem"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:[e.jsx("span",{style:{fontSize:"0.6875rem",fontWeight:600,padding:"2px 8px",borderRadius:"6px",background:"color-mix(in srgb, var(--gy-primary) 12%, var(--gy-surface))",color:"var(--gy-primary)"},children:i.tag}),e.jsxs("span",{style:{fontSize:"0.75rem",color:"var(--gy-text-muted)"},children:["💬 ",i.commentsCount]})]}),e.jsx("span",{style:{fontSize:"0.875rem",fontWeight:600,color:"var(--gy-text)",lineHeight:1.35},children:i.title}),e.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"flex-end"},children:e.jsx(N,{name:i.assignee.name,bg:i.assignee.bg})})]})})]})}};var T,D,j;v.parameters={...v.parameters,docs:{...(T=v.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => {
    interface TaskItem {
      id: string;
      title: string;
      category: string;
      priority: "high" | "medium" | "low";
      estTime: string;
    }
    const initialTasks: TaskItem[] = [{
      id: "task-1",
      title: "Implement smart floating position in dropdown & datepicker",
      category: "Frontend Architecture",
      priority: "high",
      estTime: "2 hrs"
    }, {
      id: "task-2",
      title: "Integrate typography font-family customizer in ThemeProvider",
      category: "Design System",
      priority: "high",
      estTime: "1 hr"
    }, {
      id: "task-3",
      title: "Update sticky column shadows and border-collapse in Table",
      category: "UI Polish",
      priority: "medium",
      estTime: "45 mins"
    }, {
      id: "task-4",
      title: "Review automated test coverage across form inputs",
      category: "QA & Testing",
      priority: "low",
      estTime: "3 hrs"
    }];
    const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);
    const getPriorityBadge = (p: TaskItem["priority"]) => {
      const colors = {
        high: {
          bg: "rgba(239, 68, 68, 0.12)",
          text: "#ef4444",
          border: "rgba(239, 68, 68, 0.25)"
        },
        medium: {
          bg: "rgba(245, 158, 11, 0.12)",
          text: "#f59e0b",
          border: "rgba(245, 158, 11, 0.25)"
        },
        low: {
          bg: "rgba(16, 185, 129, 0.12)",
          text: "#10b981",
          border: "rgba(16, 185, 129, 0.25)"
        }
      }[p];
      return <span style={{
        fontSize: "0.7rem",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.04em",
        padding: "2px 8px",
        borderRadius: "9999px",
        background: colors.bg,
        color: colors.text,
        border: \`1px solid \${colors.border}\`
      }}>\r
          {p}\r
        </span>;
    };
    return <div style={{
      maxWidth: 640,
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      gap: "1rem"
    }}>\r
        <div>\r
          <h3 style={{
          margin: "0 0 4px",
          fontSize: "1.125rem",
          fontWeight: 700,
          color: "var(--gy-text)"
        }}>\r
            Sprint Priority Reorder List\r
          </h3>\r
          <p style={{
          margin: 0,
          fontSize: "0.875rem",
          color: "var(--gy-text-muted)"
        }}>\r
            Drag and drop items using the grab handle to reorder sprint priorities:\r
          </p>\r
        </div>\r
\r
        <ReorderList items={tasks} onReorder={setTasks} keyExtractor={t => t.id} renderItem={(task, isDragging) => <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
        width: "100%"
      }}>\r
              <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "3px",
          minWidth: 0
        }}>\r
                <span style={{
            fontSize: "0.875rem",
            fontWeight: 600,
            color: "var(--gy-text)"
          }}>\r
                  {task.title}\r
                </span>\r
                <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            fontSize: "0.75rem",
            color: "var(--gy-text-muted)"
          }}>\r
                  <span>{task.category}</span>\r
                  <span>•</span>\r
                  <span style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "3px"
            }}>\r
                    <ClockIcon /> {task.estTime}\r
                  </span>\r
                </div>\r
              </div>\r
\r
              <div>{getPriorityBadge(task.priority)}</div>\r
            </div>} />\r
      </div>;
  }
}`,...(j=(D=v.parameters)==null?void 0:D.docs)==null?void 0:j.source}}};var C,I,S;k.parameters={...k.parameters,docs:{...(C=k.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => {
    interface KanbanTask {
      id: string;
      title: string;
      tag: string;
      assignee: {
        name: string;
        bg: string;
      };
      commentsCount: number;
    }
    const initialColumns: KanbanColumnDef<KanbanTask>[] = [{
      id: "backlog",
      title: "Backlog",
      items: [{
        id: "kb-1",
        title: "Dark mode color tokens audit",
        tag: "Design System",
        assignee: {
          name: "AL",
          bg: "#6366f1"
        },
        commentsCount: 3
      }, {
        id: "kb-2",
        title: "Global tooltip collision resolution",
        tag: "Overlay",
        assignee: {
          name: "RK",
          bg: "#ec4899"
        },
        commentsCount: 1
      }]
    }, {
      id: "in_progress",
      title: "In Progress",
      items: [{
        id: "kb-3",
        title: "Sticky column drop shadow and border separation",
        tag: "Table",
        assignee: {
          name: "JD",
          bg: "#10b981"
        },
        commentsCount: 5
      }, {
        id: "kb-4",
        title: "Smart positioning via Floating UI for pickers",
        tag: "Component",
        assignee: {
          name: "MG",
          bg: "#f59e0b"
        },
        commentsCount: 2
      }]
    }, {
      id: "review",
      title: "In Review",
      items: [{
        id: "kb-5",
        title: "Font family customization in ThemeProvider",
        tag: "Theme",
        assignee: {
          name: "AL",
          bg: "#6366f1"
        },
        commentsCount: 4
      }]
    }, {
      id: "done",
      title: "Done",
      items: [{
        id: "kb-6",
        title: "Button variant hover glows & brand palettes",
        tag: "Core UI",
        assignee: {
          name: "JD",
          bg: "#10b981"
        },
        commentsCount: 7
      }]
    }];
    const [columns, setColumns] = useState(initialColumns);
    const handleMove = (itemKey: string, fromColId: string, toColId: string, toIndex: number) => {
      setColumns(prev => {
        const next = prev.map(c => ({
          ...c,
          items: [...c.items]
        }));
        const sourceCol = next.find(c => c.id === fromColId);
        const targetCol = next.find(c => c.id === toColId);
        if (!sourceCol || !targetCol) return prev;
        const itemIdx = sourceCol.items.findIndex(it => it.id === itemKey);
        if (itemIdx === -1) return prev;
        const [movedItem] = sourceCol.items.splice(itemIdx, 1);
        if (!movedItem) return prev;
        targetCol.items.splice(toIndex, 0, movedItem);
        return next;
      });
    };
    return <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "1rem"
    }}>\r
        <div>\r
          <h3 style={{
          margin: "0 0 4px",
          fontSize: "1.125rem",
          fontWeight: 700,
          color: "var(--gy-text)"
        }}>\r
            Product Engineering Kanban Board\r
          </h3>\r
          <p style={{
          margin: 0,
          fontSize: "0.875rem",
          color: "var(--gy-text-muted)"
        }}>\r
            Drag cards between columns or reorder them within a column:\r
          </p>\r
        </div>\r
\r
        <KanbanBoard columns={columns} onMove={handleMove} keyExtractor={it => it.id} renderCard={(task, isDragging) => <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.625rem"
      }}>\r
              <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>\r
                <span style={{
            fontSize: "0.6875rem",
            fontWeight: 600,
            padding: "2px 8px",
            borderRadius: "6px",
            background: "color-mix(in srgb, var(--gy-primary) 12%, var(--gy-surface))",
            color: "var(--gy-primary)"
          }}>\r
                  {task.tag}\r
                </span>\r
                <span style={{
            fontSize: "0.75rem",
            color: "var(--gy-text-muted)"
          }}>\r
                  💬 {task.commentsCount}\r
                </span>\r
              </div>\r
\r
              <span style={{
          fontSize: "0.875rem",
          fontWeight: 600,
          color: "var(--gy-text)",
          lineHeight: 1.35
        }}>\r
                {task.title}\r
              </span>\r
\r
              <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end"
        }}>\r
                <UserAvatar name={task.assignee.name} bg={task.assignee.bg} />\r
              </div>\r
            </div>} />\r
      </div>;
  }
}`,...(S=(I=k.parameters)==null?void 0:I.docs)==null?void 0:S.source}}};const P=["ReorderableTaskList","KanbanSprintBoard"];export{k as KanbanSprintBoard,v as ReorderableTaskList,P as __namedExportsOrder,B as default};
