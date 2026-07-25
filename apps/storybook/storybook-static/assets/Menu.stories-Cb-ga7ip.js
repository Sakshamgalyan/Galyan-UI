import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as n}from"./index-JhL3uwfD.js";function s({items:a,orientation:i="vertical",size:r="md",variant:ee="bordered",onItemClick:j,activeItemId:te,collapsible:A=!0,defaultCollapsed:ae=!1,activeMenuItemColor:_,maxHeight:C,children:W,readOnly:ie=!1,className:se=""}){const[re,ne]=n.useState(()=>{const t=new Set;return ae||a.forEach(o=>{o.children&&t.add(o.id)}),t}),oe=["gy-nav-menu",`gy-nav-menu--${i}`,`gy-nav-menu--${r}`,`gy-nav-menu--${ee}`,se].filter(Boolean).join(" "),S={};C&&(S.maxHeight=C,S.overflowY="auto");const w=(t,o=0)=>{if(t.divider)return e.jsx("div",{className:"gy-nav-menu__divider"},t.id);const l=te===t.id,c=!!(t.children&&t.children.length>0),k=re.has(t.id),z=o>0,de=["gy-nav-menu__item",z?"gy-nav-menu__item--child":"",l?"gy-nav-menu__item--active":"",t.disabled?"gy-nav-menu__item--disabled":""].filter(Boolean).join(" "),le=M=>{ie||t.disabled||(c&&A&&ne(ce=>{const m=new Set(ce);return m.has(t.id)?m.delete(t.id):m.add(t.id),m}),j==null||j(t.id))},D={};return l&&_&&(D.backgroundColor=_),e.jsxs("div",{className:"gy-nav-menu__entry",children:[e.jsxs("button",{type:"button",className:de,style:{paddingLeft:z?`${1+o*1.25}rem`:"0.875rem",...D},onClick:le,disabled:t.disabled,"aria-current":l?"page":void 0,"aria-expanded":c?k:void 0,children:[l&&!z&&e.jsx("span",{className:"gy-nav-menu__accent-line"}),t.icon&&e.jsx("span",{className:"gy-nav-menu__icon",children:t.icon}),e.jsx("span",{className:"gy-nav-menu__label",children:t.label}),t.badge&&e.jsx("span",{className:"gy-nav-menu__badge",children:t.badge}),c&&A&&e.jsx("span",{className:`gy-nav-menu__chevron ${k?"gy-nav-menu__chevron--open":""}`,children:e.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("polyline",{points:"6 9 12 15 18 9"})})})]}),c&&k&&e.jsx("div",{className:"gy-nav-menu__children",children:t.children.map(M=>w(M,o+1))})]},t.id)};return e.jsxs("nav",{className:oe,style:S,children:[W&&e.jsx("div",{className:"gy-nav-menu__header",children:W}),e.jsx("div",{className:"gy-nav-menu__list",role:"menu",children:a.map(t=>w(t))})]})}s.__docgenInfo={description:"",methods:[],displayName:"Menu",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"MenuItem"}],raw:"MenuItem[]"},description:""},orientation:{required:!1,tsType:{name:"union",raw:"'vertical' | 'horizontal'",elements:[{name:"literal",value:"'vertical'"},{name:"literal",value:"'horizontal'"}]},description:"",defaultValue:{value:"'vertical'",computed:!1}},size:{required:!1,tsType:{name:"union",raw:"'sm' | 'md' | 'lg'",elements:[{name:"literal",value:"'sm'"},{name:"literal",value:"'md'"},{name:"literal",value:"'lg'"}]},description:"",defaultValue:{value:"'md'",computed:!1}},variant:{required:!1,tsType:{name:"union",raw:"'default' | 'bordered' | 'minimal'",elements:[{name:"literal",value:"'default'"},{name:"literal",value:"'bordered'"},{name:"literal",value:"'minimal'"}]},description:"",defaultValue:{value:"'bordered'",computed:!1}},onItemClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}}},description:""},activeItemId:{required:!1,tsType:{name:"string"},description:""},collapsible:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},defaultCollapsed:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},activeMenuItemColor:{required:!1,tsType:{name:"string"},description:""},maxHeight:{required:!1,tsType:{name:"string"},description:""},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},readOnly:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}}}};const x=()=>e.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"}),e.jsx("polyline",{points:"9 22 9 12 15 12 15 22"})]}),I=()=>e.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"}),e.jsx("circle",{cx:"12",cy:"7",r:"4"})]}),y=()=>e.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("circle",{cx:"12",cy:"12",r:"3"}),e.jsx("path",{d:"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68 1.65 1.65 0 0 0 10 3.17V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"})]}),ve={title:"Galyan UI/Menu",component:s,parameters:{layout:"centered"},tags:["autodocs"],decorators:[a=>e.jsx("div",{style:{width:300},children:e.jsx(a,{})})],argTypes:{variant:{control:"select",options:["default","bordered","minimal"]},size:{control:"inline-radio",options:["sm","md","lg"]},collapsible:{control:"boolean"}}},d=[{id:"dashboard",label:"Dashboard",icon:e.jsx(x,{})},{id:"users",label:"Users",icon:e.jsx(I,{}),children:[{id:"all-users",label:"All Users"},{id:"roles",label:"Roles & Permissions"}]},{id:"settings",label:"Settings",icon:e.jsx(y,{}),children:[{id:"general",label:"General"},{id:"security",label:"Security"}]}],u={args:{variant:"bordered",size:"md",collapsible:!0},render:a=>{const[i,r]=n.useState("all-users");return e.jsx(s,{...a,items:d,activeItemId:i,onItemClick:r})}},v={render:()=>{const[a,i]=n.useState("dashboard");return e.jsx(s,{variant:"minimal",items:d,activeItemId:a,onItemClick:i})}},b={render:()=>{const[a,i]=n.useState("inbox"),r=[{id:"dashboard",label:"Dashboard",icon:e.jsx(x,{})},{id:"inbox",label:"Inbox",icon:e.jsx(I,{}),badge:"12"},{id:"notifications",label:"Notifications",badge:"NEW"},{id:"div1",label:"",divider:!0},{id:"settings",label:"Settings",icon:e.jsx(y,{}),badge:"Pro",children:[{id:"general",label:"General"},{id:"billing",label:"Billing & Plans",badge:"Up"}]}];return e.jsx(s,{variant:"bordered",items:r,activeItemId:a,onItemClick:i})}},g={render:()=>{const[a,i]=n.useState("all-users");return e.jsx(s,{variant:"bordered",items:d,activeItemId:a,onItemClick:i,children:e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.75rem"},children:[e.jsx("div",{style:{width:36,height:36,borderRadius:"50%",background:"#22c55e",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"bold"},children:"SG"}),e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:600,fontSize:"0.875rem"},children:"Saksham Galyan"}),e.jsx("div",{style:{fontSize:"0.75rem",color:"#64748b"},children:"Admin Workspace"})]})]})})}},h={decorators:[a=>e.jsx("div",{style:{width:"100%",maxWidth:700},children:e.jsx(a,{})})],render:()=>{const[a,i]=n.useState("dashboard"),r=[{id:"dashboard",label:"Dashboard",icon:e.jsx(x,{})},{id:"users",label:"Users",icon:e.jsx(I,{})},{id:"settings",label:"Settings",icon:e.jsx(y,{})}];return e.jsx(s,{orientation:"horizontal",variant:"bordered",items:r,activeItemId:a,onItemClick:i})}},p={decorators:[a=>e.jsx("div",{style:{width:320,display:"flex",flexDirection:"column",gap:"2rem"},children:e.jsx(a,{})})],render:()=>{const[a,i]=n.useState("users");return e.jsxs(e.Fragment,{children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:"0.75rem",fontWeight:600,color:"#64748b",marginBottom:"0.5rem"},children:"Small Size (sm)"}),e.jsx(s,{size:"sm",variant:"bordered",items:d,activeItemId:a,onItemClick:i})]}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:"0.75rem",fontWeight:600,color:"#64748b",marginBottom:"0.5rem"},children:"Medium Size (md)"}),e.jsx(s,{size:"md",variant:"bordered",items:d,activeItemId:a,onItemClick:i})]}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:"0.75rem",fontWeight:600,color:"#64748b",marginBottom:"0.5rem"},children:"Large Size (lg)"}),e.jsx(s,{size:"lg",variant:"bordered",items:d,activeItemId:a,onItemClick:i})]})]})}},f={render:()=>{const[a,i]=n.useState("dashboard"),r=[{id:"dashboard",label:"Dashboard",icon:e.jsx(x,{})},{id:"analytics",label:"Analytics (Disabled)",icon:e.jsx(I,{}),disabled:!0},{id:"settings",label:"Settings",icon:e.jsx(y,{})}];return e.jsx(s,{variant:"bordered",items:r,activeItemId:a,onItemClick:i})}};var N,B,T;u.parameters={...u.parameters,docs:{...(N=u.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    variant: 'bordered',
    size: 'md',
    collapsible: true
  },
  render: args => {
    const [active, setActive] = useState('all-users');
    return <Menu {...args} items={menuItems} activeItemId={active} onItemClick={setActive} />;
  }
}`,...(T=(B=u.parameters)==null?void 0:B.docs)==null?void 0:T.source}}};var q,L,U;v.parameters={...v.parameters,docs:{...(q=v.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: () => {
    const [active, setActive] = useState('dashboard');
    return <Menu variant="minimal" items={menuItems} activeItemId={active} onItemClick={setActive} />;
  }
}`,...(U=(L=v.parameters)==null?void 0:L.docs)==null?void 0:U.source}}};var V,H,E;b.parameters={...b.parameters,docs:{...(V=b.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: () => {
    const [active, setActive] = useState('inbox');
    const badgeItems = [{
      id: 'dashboard',
      label: 'Dashboard',
      icon: <DashboardIcon />
    }, {
      id: 'inbox',
      label: 'Inbox',
      icon: <UsersIcon />,
      badge: '12'
    }, {
      id: 'notifications',
      label: 'Notifications',
      badge: 'NEW'
    }, {
      id: 'div1',
      label: '',
      divider: true
    }, {
      id: 'settings',
      label: 'Settings',
      icon: <SettingsIcon />,
      badge: 'Pro',
      children: [{
        id: 'general',
        label: 'General'
      }, {
        id: 'billing',
        label: 'Billing & Plans',
        badge: 'Up'
      }]
    }];
    return <Menu variant="bordered" items={badgeItems} activeItemId={active} onItemClick={setActive} />;
  }
}`,...(E=(H=b.parameters)==null?void 0:H.docs)==null?void 0:E.source}}};var G,R,P;g.parameters={...g.parameters,docs:{...(G=g.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: () => {
    const [active, setActive] = useState('all-users');
    return <Menu variant="bordered" items={menuItems} activeItemId={active} onItemClick={setActive}>
        <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem'
      }}>
          <div style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: '#22c55e',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold'
        }}>
            SG
          </div>
          <div>
            <div style={{
            fontWeight: 600,
            fontSize: '0.875rem'
          }}>Saksham Galyan</div>
            <div style={{
            fontSize: '0.75rem',
            color: '#64748b'
          }}>Admin Workspace</div>
          </div>
        </div>
      </Menu>;
  }
}`,...(P=(R=g.parameters)==null?void 0:R.docs)==null?void 0:P.source}}};var $,O,F;h.parameters={...h.parameters,docs:{...($=h.parameters)==null?void 0:$.docs,source:{originalSource:`{
  decorators: [Story => <div style={{
    width: '100%',
    maxWidth: 700
  }}><Story /></div>],
  render: () => {
    const [active, setActive] = useState('dashboard');
    const horizontalItems = [{
      id: 'dashboard',
      label: 'Dashboard',
      icon: <DashboardIcon />
    }, {
      id: 'users',
      label: 'Users',
      icon: <UsersIcon />
    }, {
      id: 'settings',
      label: 'Settings',
      icon: <SettingsIcon />
    }];
    return <Menu orientation="horizontal" variant="bordered" items={horizontalItems} activeItemId={active} onItemClick={setActive} />;
  }
}`,...(F=(O=h.parameters)==null?void 0:O.docs)==null?void 0:F.source}}};var Y,J,K;p.parameters={...p.parameters,docs:{...(Y=p.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  decorators: [Story => <div style={{
    width: 320,
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem'
  }}><Story /></div>],
  render: () => {
    const [active, setActive] = useState('users');
    return <>
        <div>
          <div style={{
          fontSize: '0.75rem',
          fontWeight: 600,
          color: '#64748b',
          marginBottom: '0.5rem'
        }}>Small Size (sm)</div>
          <Menu size="sm" variant="bordered" items={menuItems} activeItemId={active} onItemClick={setActive} />
        </div>
        <div>
          <div style={{
          fontSize: '0.75rem',
          fontWeight: 600,
          color: '#64748b',
          marginBottom: '0.5rem'
        }}>Medium Size (md)</div>
          <Menu size="md" variant="bordered" items={menuItems} activeItemId={active} onItemClick={setActive} />
        </div>
        <div>
          <div style={{
          fontSize: '0.75rem',
          fontWeight: 600,
          color: '#64748b',
          marginBottom: '0.5rem'
        }}>Large Size (lg)</div>
          <Menu size="lg" variant="bordered" items={menuItems} activeItemId={active} onItemClick={setActive} />
        </div>
      </>;
  }
}`,...(K=(J=p.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};var Q,X,Z;f.parameters={...f.parameters,docs:{...(Q=f.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  render: () => {
    const [active, setActive] = useState('dashboard');
    const itemsWithDisabled = [{
      id: 'dashboard',
      label: 'Dashboard',
      icon: <DashboardIcon />
    }, {
      id: 'analytics',
      label: 'Analytics (Disabled)',
      icon: <UsersIcon />,
      disabled: true
    }, {
      id: 'settings',
      label: 'Settings',
      icon: <SettingsIcon />
    }];
    return <Menu variant="bordered" items={itemsWithDisabled} activeItemId={active} onItemClick={setActive} />;
  }
}`,...(Z=(X=f.parameters)==null?void 0:X.docs)==null?void 0:Z.source}}};const be=["Default","Minimal","WithBadgesAndDividers","WithCustomHeader","HorizontalMenu","Sizes","DisabledItems"];export{u as Default,f as DisabledItems,h as HorizontalMenu,v as Minimal,p as Sizes,b as WithBadgesAndDividers,g as WithCustomHeader,be as __namedExportsOrder,ve as default};
