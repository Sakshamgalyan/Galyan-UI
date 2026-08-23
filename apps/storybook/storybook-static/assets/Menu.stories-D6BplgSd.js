import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as a}from"./index-CC0H-XIk.js";function s({items:i,orientation:t="vertical",size:r="md",variant:ie="bordered",onItemClick:j,activeItemId:se,collapsible:_=!0,defaultCollapsed:ae=!1,activeMenuItemColor:C,maxHeight:M,children:W,readOnly:re=!1,className:le=""}){const S=a.useRef(null),[oe,N]=a.useState(()=>{const n=new Set;return!ae&&t==="vertical"&&i.forEach(l=>{l.children&&n.add(l.id)}),n});a.useEffect(()=>{if(t!=="horizontal")return;const n=l=>{S.current&&!S.current.contains(l.target)&&N(new Set)};return document.addEventListener("mousedown",n),()=>document.removeEventListener("mousedown",n)},[t]);const de=["gy-nav-menu",`gy-nav-menu--${t}`,`gy-nav-menu--${r}`,`gy-nav-menu--${ie}`,le].filter(Boolean).join(" "),k={};M&&(k.maxHeight=M,k.overflowY="auto");const w=t==="horizontal",T=(n,l=0)=>{if(n.divider)return e.jsx("div",{className:"gy-nav-menu__divider"},n.id);const d=se===n.id,c=!!(n.children&&n.children.length>0),z=oe.has(n.id),A=l>0,ce=["gy-nav-menu__item",A?"gy-nav-menu__item--child":"",d?"gy-nav-menu__item--active":"",n.disabled?"gy-nav-menu__item--disabled":""].filter(Boolean).join(" "),me=L=>{re||n.disabled||(c&&_&&N(ue=>{const m=new Set(ue);if(m.has(n.id))m.delete(n.id);else{if(w)return new Set([n.id]);m.add(n.id)}return m}),j==null||j(n.id))},D={};return d&&C&&(D.backgroundColor=C),e.jsxs("div",{className:"gy-nav-menu__entry",children:[e.jsxs("button",{type:"button",className:ce,style:{paddingLeft:!w&&A?`${1+l*1.25}rem`:void 0,...D},onClick:me,disabled:n.disabled,"aria-current":d?"page":void 0,"aria-expanded":c?z:void 0,children:[d&&!A&&!w&&e.jsx("span",{className:"gy-nav-menu__accent-line"}),n.icon&&e.jsx("span",{className:"gy-nav-menu__icon",children:n.icon}),e.jsx("span",{className:"gy-nav-menu__label",children:n.label}),n.badge&&e.jsx("span",{className:"gy-nav-menu__badge",children:n.badge}),c&&_&&e.jsx("span",{className:`gy-nav-menu__chevron ${z?"gy-nav-menu__chevron--open":""}`,children:e.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("polyline",{points:"6 9 12 15 18 9"})})})]}),c&&z&&e.jsx("div",{className:"gy-nav-menu__children",children:n.children.map(L=>T(L,l+1))})]},n.id)};return e.jsxs("nav",{ref:S,className:de,style:k,children:[W&&e.jsx("div",{className:"gy-nav-menu__header",children:W}),e.jsx("div",{className:"gy-nav-menu__list",role:"menu",children:i.map(n=>T(n))})]})}s.__docgenInfo={description:"",methods:[],displayName:"Menu",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"MenuItem"}],raw:"MenuItem[]"},description:""},orientation:{required:!1,tsType:{name:"union",raw:'"vertical" | "horizontal"',elements:[{name:"literal",value:'"vertical"'},{name:"literal",value:'"horizontal"'}]},description:"",defaultValue:{value:'"vertical"',computed:!1}},size:{required:!1,tsType:{name:"union",raw:'"sm" | "md" | "lg"',elements:[{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'}]},description:"",defaultValue:{value:'"md"',computed:!1}},variant:{required:!1,tsType:{name:"union",raw:'"default" | "bordered" | "minimal"',elements:[{name:"literal",value:'"default"'},{name:"literal",value:'"bordered"'},{name:"literal",value:'"minimal"'}]},description:"",defaultValue:{value:'"bordered"',computed:!1}},onItemClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}}},description:""},activeItemId:{required:!1,tsType:{name:"string"},description:""},collapsible:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},defaultCollapsed:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},activeMenuItemColor:{required:!1,tsType:{name:"string"},description:""},maxHeight:{required:!1,tsType:{name:"string"},description:""},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},readOnly:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}}}};const x=()=>e.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"}),e.jsx("polyline",{points:"9 22 9 12 15 12 15 22"})]}),y=()=>e.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"}),e.jsx("circle",{cx:"12",cy:"7",r:"4"})]}),I=()=>e.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("circle",{cx:"12",cy:"12",r:"3"}),e.jsx("path",{d:"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68 1.65 1.65 0 0 0 10 3.17V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"})]}),ve=()=>e.jsx("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("path",{d:"M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"})}),pe={title:"Galyan UI/Menu",component:s,parameters:{layout:"centered"},tags:["autodocs"],decorators:[i=>e.jsx("div",{style:{width:"100%",maxWidth:680,minHeight:180},children:e.jsx(i,{})})],argTypes:{variant:{control:"select",options:["default","bordered","minimal"]},size:{control:"inline-radio",options:["sm","md","lg"]},collapsible:{control:"boolean"}}},o=[{id:"dashboard",label:"Dashboard",icon:e.jsx(x,{})},{id:"users",label:"Users",icon:e.jsx(y,{}),children:[{id:"all-users",label:"All Users"},{id:"roles",label:"Roles & Permissions"}]},{id:"settings",label:"Settings",icon:e.jsx(I,{}),children:[{id:"general",label:"General"},{id:"security",label:"Security"}]}],u={args:{variant:"bordered",size:"md",collapsible:!0},render:i=>{const[t,r]=a.useState("all-users");return e.jsx("div",{style:{width:300},children:e.jsx(s,{...i,items:o,activeItemId:t,onItemClick:r})})}},v={render:()=>{const[i,t]=a.useState("dashboard");return e.jsx("div",{style:{width:300},children:e.jsx(s,{variant:"minimal",items:o,activeItemId:i,onItemClick:t})})}},h={render:()=>{const[i,t]=a.useState("inbox"),r=[{id:"dashboard",label:"Dashboard",icon:e.jsx(x,{})},{id:"inbox",label:"Inbox",icon:e.jsx(y,{}),badge:"12"},{id:"notifications",label:"Notifications",badge:"NEW"},{id:"div1",label:"",divider:!0},{id:"settings",label:"Settings",icon:e.jsx(I,{}),badge:"Pro",children:[{id:"general",label:"General"},{id:"billing",label:"Billing & Plans",badge:"Up"}]}];return e.jsx("div",{style:{width:300},children:e.jsx(s,{variant:"bordered",items:r,activeItemId:i,onItemClick:t})})}},g={render:()=>{const[i,t]=a.useState("all-users");return e.jsx("div",{style:{width:300},children:e.jsx(s,{variant:"bordered",items:o,activeItemId:i,onItemClick:t,children:e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.75rem"},children:[e.jsx("div",{style:{width:36,height:36,borderRadius:"50%",background:"var(--gy-primary)",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"bold"},children:"SG"}),e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:600,fontSize:"0.875rem"},children:"Saksham Galyan"}),e.jsx("div",{style:{fontSize:"0.75rem",color:"var(--gy-text-subtle)"},children:"Admin Workspace"})]})]})})})}},p={render:()=>{const[i,t]=a.useState("dashboard"),r=[{id:"dashboard",label:"Dashboard",icon:e.jsx(x,{})},{id:"users",label:"Users",icon:e.jsx(y,{}),children:[{id:"all-users",label:"All Users"},{id:"roles",label:"Roles & Permissions"}]},{id:"settings",label:"Settings",icon:e.jsx(I,{}),children:[{id:"general",label:"General"},{id:"security",label:"Security"}]}];return e.jsx(s,{orientation:"horizontal",variant:"bordered",items:r,activeItemId:i,onItemClick:t})}},b={render:()=>{const[i,t]=a.useState("overview"),r=[{id:"overview",label:"Overview",icon:e.jsx(x,{})},{id:"projects",label:"Projects",icon:e.jsx(ve,{}),badge:"4"},{id:"team",label:"Team Members",icon:e.jsx(y,{})},{id:"settings",label:"Workspace Settings",icon:e.jsx(I,{})}];return e.jsx(s,{orientation:"horizontal",variant:"minimal",items:r,activeItemId:i,onItemClick:t})}},f={render:()=>{const[i,t]=a.useState("users");return e.jsxs("div",{style:{width:300,display:"flex",flexDirection:"column",gap:"1.5rem"},children:[e.jsxs("div",{children:[e.jsx("span",{style:{fontSize:"0.75rem",fontWeight:600,color:"#64748b"},children:"Small (sm)"}),e.jsx(s,{size:"sm",items:o.slice(0,2),activeItemId:i,onItemClick:t})]}),e.jsxs("div",{children:[e.jsx("span",{style:{fontSize:"0.75rem",fontWeight:600,color:"#64748b"},children:"Medium (md)"}),e.jsx(s,{size:"md",items:o.slice(0,2),activeItemId:i,onItemClick:t})]}),e.jsxs("div",{children:[e.jsx("span",{style:{fontSize:"0.75rem",fontWeight:600,color:"#64748b"},children:"Large (lg)"}),e.jsx(s,{size:"lg",items:o.slice(0,2),activeItemId:i,onItemClick:t})]})]})}};var H,q,U;u.parameters={...u.parameters,docs:{...(H=u.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    variant: "bordered",
    size: "md",
    collapsible: true
  },
  render: args => {
    const [active, setActive] = useState("all-users");
    return <div style={{
      width: 300
    }}>\r
        <Menu {...args} items={menuItems} activeItemId={active} onItemClick={setActive} />\r
      </div>;
  }
}`,...(U=(q=u.parameters)==null?void 0:q.docs)==null?void 0:U.source}}};var B,R,E;v.parameters={...v.parameters,docs:{...(B=v.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => {
    const [active, setActive] = useState("dashboard");
    return <div style={{
      width: 300
    }}>\r
        <Menu variant="minimal" items={menuItems} activeItemId={active} onItemClick={setActive} />\r
      </div>;
  }
}`,...(E=(R=v.parameters)==null?void 0:R.docs)==null?void 0:E.source}}};var V,G,P;h.parameters={...h.parameters,docs:{...(V=h.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: () => {
    const [active, setActive] = useState("inbox");
    const badgeItems = [{
      id: "dashboard",
      label: "Dashboard",
      icon: <DashboardIcon />
    }, {
      id: "inbox",
      label: "Inbox",
      icon: <UsersIcon />,
      badge: "12"
    }, {
      id: "notifications",
      label: "Notifications",
      badge: "NEW"
    }, {
      id: "div1",
      label: "",
      divider: true
    }, {
      id: "settings",
      label: "Settings",
      icon: <SettingsIcon />,
      badge: "Pro",
      children: [{
        id: "general",
        label: "General"
      }, {
        id: "billing",
        label: "Billing & Plans",
        badge: "Up"
      }]
    }];
    return <div style={{
      width: 300
    }}>\r
        <Menu variant="bordered" items={badgeItems} activeItemId={active} onItemClick={setActive} />\r
      </div>;
  }
}`,...(P=(G=h.parameters)==null?void 0:G.docs)==null?void 0:P.source}}};var O,$,F;g.parameters={...g.parameters,docs:{...(O=g.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: () => {
    const [active, setActive] = useState("all-users");
    return <div style={{
      width: 300
    }}>\r
        <Menu variant="bordered" items={menuItems} activeItemId={active} onItemClick={setActive}>\r
          <div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem"
        }}>\r
            <div style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "var(--gy-primary)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold"
          }}>\r
              SG\r
            </div>\r
            <div>\r
              <div style={{
              fontWeight: 600,
              fontSize: "0.875rem"
            }}>\r
                Saksham Galyan\r
              </div>\r
              <div style={{
              fontSize: "0.75rem",
              color: "var(--gy-text-subtle)"
            }}>\r
                Admin Workspace\r
              </div>\r
            </div>\r
          </div>\r
        </Menu>\r
      </div>;
  }
}`,...(F=($=g.parameters)==null?void 0:$.docs)==null?void 0:F.source}}};var Y,J,K;p.parameters={...p.parameters,docs:{...(Y=p.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  render: () => {
    const [active, setActive] = useState("dashboard");
    const horizontalItems = [{
      id: "dashboard",
      label: "Dashboard",
      icon: <DashboardIcon />
    }, {
      id: "users",
      label: "Users",
      icon: <UsersIcon />,
      children: [{
        id: "all-users",
        label: "All Users"
      }, {
        id: "roles",
        label: "Roles & Permissions"
      }]
    }, {
      id: "settings",
      label: "Settings",
      icon: <SettingsIcon />,
      children: [{
        id: "general",
        label: "General"
      }, {
        id: "security",
        label: "Security"
      }]
    }];
    return <Menu orientation="horizontal" variant="bordered" items={horizontalItems} activeItemId={active} onItemClick={setActive} />;
  }
}`,...(K=(J=p.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};var Q,X,Z;b.parameters={...b.parameters,docs:{...(Q=b.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  render: () => {
    const [active, setActive] = useState("overview");
    const navItems = [{
      id: "overview",
      label: "Overview",
      icon: <DashboardIcon />
    }, {
      id: "projects",
      label: "Projects",
      icon: <FolderIcon />,
      badge: "4"
    }, {
      id: "team",
      label: "Team Members",
      icon: <UsersIcon />
    }, {
      id: "settings",
      label: "Workspace Settings",
      icon: <SettingsIcon />
    }];
    return <Menu orientation="horizontal" variant="minimal" items={navItems} activeItemId={active} onItemClick={setActive} />;
  }
}`,...(Z=(X=b.parameters)==null?void 0:X.docs)==null?void 0:Z.source}}};var ee,ne,te;f.parameters={...f.parameters,docs:{...(ee=f.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  render: () => {
    const [active, setActive] = useState("users");
    return <div style={{
      width: 300,
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem"
    }}>\r
        <div>\r
          <span style={{
          fontSize: "0.75rem",
          fontWeight: 600,
          color: "#64748b"
        }}>\r
            Small (sm)\r
          </span>\r
          <Menu size="sm" items={menuItems.slice(0, 2)} activeItemId={active} onItemClick={setActive} />\r
        </div>\r
        <div>\r
          <span style={{
          fontSize: "0.75rem",
          fontWeight: 600,
          color: "#64748b"
        }}>\r
            Medium (md)\r
          </span>\r
          <Menu size="md" items={menuItems.slice(0, 2)} activeItemId={active} onItemClick={setActive} />\r
        </div>\r
        <div>\r
          <span style={{
          fontSize: "0.75rem",
          fontWeight: 600,
          color: "#64748b"
        }}>\r
            Large (lg)\r
          </span>\r
          <Menu size="lg" items={menuItems.slice(0, 2)} activeItemId={active} onItemClick={setActive} />\r
        </div>\r
      </div>;
  }
}`,...(te=(ne=f.parameters)==null?void 0:ne.docs)==null?void 0:te.source}}};const be=["Default","Minimal","WithBadgesAndDividers","WithCustomHeader","HorizontalMenu","HorizontalMinimalNavbar","Sizes"];export{u as Default,p as HorizontalMenu,b as HorizontalMinimalNavbar,v as Minimal,f as Sizes,h as WithBadgesAndDividers,g as WithCustomHeader,be as __namedExportsOrder,pe as default};
