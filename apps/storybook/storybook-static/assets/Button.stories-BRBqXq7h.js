import{a as r}from"./index-B5o1GRfj.js";import{R as e}from"./index-JhL3uwfD.js";import"./jsx-runtime-D_zvdyIk.js";import"./index-BPftEo5x.js";import"./index-hLVmTiZX.js";const Ye={title:"Galyan UI/Button",component:r,tags:["autodocs"],argTypes:{variant:{control:"select",options:["primary","secondary","tertiary","success","warning","danger","danger-soft","soft","ghost","link"],description:"Enterprise button variant preset",table:{type:{summary:"'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'danger-soft' | 'soft' | 'ghost' | 'link'"},defaultValue:{summary:"'primary'"}}},outline:{control:"boolean",description:"Render outlined styling for the selected variant",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},size:{control:"select",options:["xs","sm","md","lg","xl"],description:"Button size preset",table:{type:{summary:"'xs' | 'sm' | 'md' | 'lg' | 'xl'"},defaultValue:{summary:"'md'"}}},isLoading:{control:"boolean",description:"Show loading spinner state",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},disabled:{control:"boolean",description:"Disable button interactions",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},fullWidth:{control:"boolean",description:"Stretch to full width of parent container",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},className:{control:"text",description:"Additional CSS class names for custom styling override",table:{type:{summary:"string"}}},children:{control:"text",description:"Button label content",table:{type:{summary:"ReactNode"}}}}},n={args:{children:"Primary Action",variant:"primary",size:"md"}},a={args:{children:"Secondary Soft Action",variant:"secondary",size:"md"}},i={args:{children:"Tertiary Neutral Gray",variant:"tertiary",size:"md"}},o={args:{children:"Success Action",variant:"success",size:"md"}},s={args:{children:"Warning Action",variant:"warning",size:"md"}},l={args:{children:"Delete Account",variant:"danger",size:"md"}},c={args:{children:"Remove Item",variant:"danger-soft",size:"md"}},m={args:{children:"Primary Outlined",variant:"primary",outline:!0}},d={args:{children:"Secondary Outlined",variant:"secondary",outline:!0}},u={args:{children:"Success Outlined",variant:"success",outline:!0}},p={args:{children:"Warning Outlined",variant:"warning",outline:!0}},g={args:{children:"Danger Red Outlined",variant:"danger",outline:!0}},y={args:{children:"Danger Soft Outlined",variant:"danger-soft",outline:!0}},f={args:{children:"Soft Accent",variant:"soft"}},v={args:{children:"Ghost Action",variant:"ghost"}},S={args:{children:"Learn More",variant:"link"}},x={render:()=>e.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"2rem",padding:"1rem",width:"100%",alignItems:"center"}},e.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"0.75rem",alignItems:"center"}},e.createElement("h4",{style:{margin:0,fontSize:"0.9rem",color:"#64748b",textTransform:"uppercase",letterSpacing:"0.05em"}},"Standard Filled Variants"),e.createElement("div",{style:{display:"flex",gap:"0.75rem",flexWrap:"wrap",justifyContent:"center"}},e.createElement(r,{variant:"primary"},"Primary (Green)"),e.createElement(r,{variant:"secondary"},"Secondary (Teal Soft)"),e.createElement(r,{variant:"tertiary"},"Tertiary (Gray)"),e.createElement(r,{variant:"success"},"Success"),e.createElement(r,{variant:"warning"},"Warning"),e.createElement(r,{variant:"danger"},"Danger"),e.createElement(r,{variant:"danger-soft"},"Danger Soft"),e.createElement(r,{variant:"soft"},"Soft Tint"),e.createElement(r,{variant:"ghost"},"Ghost"),e.createElement(r,{variant:"link"},"Link"))),e.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"0.75rem",alignItems:"center"}},e.createElement("h4",{style:{margin:0,fontSize:"0.9rem",color:"#64748b",textTransform:"uppercase",letterSpacing:"0.05em"}},"Context-Aware Outlined Variants (outline=true)"),e.createElement("div",{style:{display:"flex",gap:"0.75rem",flexWrap:"wrap",justifyContent:"center"}},e.createElement(r,{variant:"primary",outline:!0},"Primary Outline"),e.createElement(r,{variant:"secondary",outline:!0},"Secondary Outline"),e.createElement(r,{variant:"tertiary",outline:!0},"Tertiary Outline"),e.createElement(r,{variant:"success",outline:!0},"Success Outline"),e.createElement(r,{variant:"warning",outline:!0},"Warning Outline"),e.createElement(r,{variant:"danger",outline:!0},"Danger Outline"),e.createElement(r,{variant:"danger-soft",outline:!0},"Danger Soft Outline"),e.createElement(r,{variant:"soft",outline:!0},"Soft Outline"))))},h={args:{children:"Saving Changes...",variant:"primary",isLoading:!0,loadingText:"Saving..."}},b={render:()=>e.createElement("div",{style:{display:"flex",gap:"0.75rem",alignItems:"center",justifyContent:"center",flexWrap:"wrap"}},e.createElement(r,{size:"xs",variant:"primary"},"Extra Small"),e.createElement(r,{size:"sm",variant:"primary"},"Small"),e.createElement(r,{size:"md",variant:"primary"},"Medium"),e.createElement(r,{size:"lg",variant:"primary"},"Large"),e.createElement(r,{size:"xl",variant:"primary"},"Extra Large"))},E={args:{children:"Custom Gradient Button",className:"custom-btn-example"},render:w=>e.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"0.75rem",alignItems:"center",justifyContent:"center"}},e.createElement("style",null,`
        .custom-btn-example {
          background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%) !important;
          color: #ffffff !important;
          border-radius: 9999px !important;
          padding: 0 2rem !important;
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4) !important;
          transition: all 0.2s ease-in-out !important;
        }
        .custom-btn-example:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 6px 20px rgba(99, 102, 241, 0.55) !important;
        }
      `),e.createElement(r,{...w}),e.createElement("span",{style:{fontSize:"0.85rem",color:"#64748b"}},"Custom styled using: ",e.createElement("code",null,'className="custom-btn-example"')))},B={args:{children:"Tailwind Styled Button",className:"bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold rounded-full px-6 py-2 shadow-lg shadow-indigo-500/30 active:scale-95 transition-all duration-200"},render:w=>e.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"0.75rem",alignItems:"center",justifyContent:"center"}},e.createElement(r,{...w}),e.createElement("span",{style:{fontSize:"0.85rem",color:"#64748b"}},"Tailwind utility classes passed directly via ",e.createElement("code",null,"className")))},t=()=>e.createElement("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round"},e.createElement("line",{x1:"12",y1:"5",x2:"12",y2:"19"}),e.createElement("line",{x1:"5",y1:"12",x2:"19",y2:"12"})),O={render:()=>e.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"1rem",alignItems:"center",justifyContent:"center"}},e.createElement("div",{style:{display:"flex",gap:"0.75rem",alignItems:"center"}},e.createElement(r,{variant:"primary",leftIcon:e.createElement(t,null),"aria-label":"Add item"}),e.createElement(r,{variant:"secondary",leftIcon:e.createElement(t,null),"aria-label":"Add item"}),e.createElement(r,{variant:"tertiary",leftIcon:e.createElement(t,null),"aria-label":"Add item"}),e.createElement(r,{variant:"danger",leftIcon:e.createElement(t,null),"aria-label":"Add item"}),e.createElement(r,{variant:"primary",outline:!0,leftIcon:e.createElement(t,null),"aria-label":"Add item"})),e.createElement("span",{style:{fontSize:"0.85rem",color:"#64748b"}},"Icon-only button rendered via ",e.createElement("code",null,"<Button leftIcon={<Icon />} />")," (without children)"))};var I,z,D;n.parameters={...n.parameters,docs:{...(I=n.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    children: 'Primary Action',
    variant: 'primary',
    size: 'md'
  }
}`,...(D=(z=n.parameters)==null?void 0:z.docs)==null?void 0:D.source}}};var C,A,T;a.parameters={...a.parameters,docs:{...(C=a.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    children: 'Secondary Soft Action',
    variant: 'secondary',
    size: 'md'
  }
}`,...(T=(A=a.parameters)==null?void 0:A.docs)==null?void 0:T.source}}};var W,P,L;i.parameters={...i.parameters,docs:{...(W=i.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    children: 'Tertiary Neutral Gray',
    variant: 'tertiary',
    size: 'md'
  }
}`,...(L=(P=i.parameters)==null?void 0:P.docs)==null?void 0:L.source}}};var k,G,N;o.parameters={...o.parameters,docs:{...(k=o.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    children: 'Success Action',
    variant: 'success',
    size: 'md'
  }
}`,...(N=(G=o.parameters)==null?void 0:G.docs)==null?void 0:N.source}}};var j,V,R;s.parameters={...s.parameters,docs:{...(j=s.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    children: 'Warning Action',
    variant: 'warning',
    size: 'md'
  }
}`,...(R=(V=s.parameters)==null?void 0:V.docs)==null?void 0:R.source}}};var M,F,Y;l.parameters={...l.parameters,docs:{...(M=l.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    children: 'Delete Account',
    variant: 'danger',
    size: 'md'
  }
}`,...(Y=(F=l.parameters)==null?void 0:F.docs)==null?void 0:Y.source}}};var _,U,q;c.parameters={...c.parameters,docs:{...(_=c.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    children: 'Remove Item',
    variant: 'danger-soft',
    size: 'md'
  }
}`,...(q=(U=c.parameters)==null?void 0:U.docs)==null?void 0:q.source}}};var H,J,K;m.parameters={...m.parameters,docs:{...(H=m.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    children: 'Primary Outlined',
    variant: 'primary',
    outline: true
  }
}`,...(K=(J=m.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};var Q,X,Z;d.parameters={...d.parameters,docs:{...(Q=d.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    children: 'Secondary Outlined',
    variant: 'secondary',
    outline: true
  }
}`,...(Z=(X=d.parameters)==null?void 0:X.docs)==null?void 0:Z.source}}};var $,ee,re;u.parameters={...u.parameters,docs:{...($=u.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    children: 'Success Outlined',
    variant: 'success',
    outline: true
  }
}`,...(re=(ee=u.parameters)==null?void 0:ee.docs)==null?void 0:re.source}}};var te,ne,ae;p.parameters={...p.parameters,docs:{...(te=p.parameters)==null?void 0:te.docs,source:{originalSource:`{
  args: {
    children: 'Warning Outlined',
    variant: 'warning',
    outline: true
  }
}`,...(ae=(ne=p.parameters)==null?void 0:ne.docs)==null?void 0:ae.source}}};var ie,oe,se;g.parameters={...g.parameters,docs:{...(ie=g.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  args: {
    children: 'Danger Red Outlined',
    variant: 'danger',
    outline: true
  }
}`,...(se=(oe=g.parameters)==null?void 0:oe.docs)==null?void 0:se.source}}};var le,ce,me;y.parameters={...y.parameters,docs:{...(le=y.parameters)==null?void 0:le.docs,source:{originalSource:`{
  args: {
    children: 'Danger Soft Outlined',
    variant: 'danger-soft',
    outline: true
  }
}`,...(me=(ce=y.parameters)==null?void 0:ce.docs)==null?void 0:me.source}}};var de,ue,pe;f.parameters={...f.parameters,docs:{...(de=f.parameters)==null?void 0:de.docs,source:{originalSource:`{
  args: {
    children: 'Soft Accent',
    variant: 'soft'
  }
}`,...(pe=(ue=f.parameters)==null?void 0:ue.docs)==null?void 0:pe.source}}};var ge,ye,fe;v.parameters={...v.parameters,docs:{...(ge=v.parameters)==null?void 0:ge.docs,source:{originalSource:`{
  args: {
    children: 'Ghost Action',
    variant: 'ghost'
  }
}`,...(fe=(ye=v.parameters)==null?void 0:ye.docs)==null?void 0:fe.source}}};var ve,Se,xe;S.parameters={...S.parameters,docs:{...(ve=S.parameters)==null?void 0:ve.docs,source:{originalSource:`{
  args: {
    children: 'Learn More',
    variant: 'link'
  }
}`,...(xe=(Se=S.parameters)==null?void 0:Se.docs)==null?void 0:xe.source}}};var he,be,Ee;x.parameters={...x.parameters,docs:{...(he=x.parameters)==null?void 0:he.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
    padding: '1rem',
    width: '100%',
    alignItems: 'center'
  }}>\r
      <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      alignItems: 'center'
    }}>\r
        <h4 style={{
        margin: 0,
        fontSize: '0.9rem',
        color: '#64748b',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      }}>\r
          Standard Filled Variants\r
        </h4>\r
        <div style={{
        display: 'flex',
        gap: '0.75rem',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>\r
          <Button variant="primary">Primary (Green)</Button>\r
          <Button variant="secondary">Secondary (Teal Soft)</Button>\r
          <Button variant="tertiary">Tertiary (Gray)</Button>\r
          <Button variant="success">Success</Button>\r
          <Button variant="warning">Warning</Button>\r
          <Button variant="danger">Danger</Button>\r
          <Button variant="danger-soft">Danger Soft</Button>\r
          <Button variant="soft">Soft Tint</Button>\r
          <Button variant="ghost">Ghost</Button>\r
          <Button variant="link">Link</Button>\r
        </div>\r
      </div>\r
\r
      <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      alignItems: 'center'
    }}>\r
        <h4 style={{
        margin: 0,
        fontSize: '0.9rem',
        color: '#64748b',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      }}>\r
          Context-Aware Outlined Variants (outline=true)\r
        </h4>\r
        <div style={{
        display: 'flex',
        gap: '0.75rem',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>\r
          <Button variant="primary" outline>Primary Outline</Button>\r
          <Button variant="secondary" outline>Secondary Outline</Button>\r
          <Button variant="tertiary" outline>Tertiary Outline</Button>\r
          <Button variant="success" outline>Success Outline</Button>\r
          <Button variant="warning" outline>Warning Outline</Button>\r
          <Button variant="danger" outline>Danger Outline</Button>\r
          <Button variant="danger-soft" outline>Danger Soft Outline</Button>\r
          <Button variant="soft" outline>Soft Outline</Button>\r
        </div>\r
      </div>\r
    </div>
}`,...(Ee=(be=x.parameters)==null?void 0:be.docs)==null?void 0:Ee.source}}};var Be,Oe,we;h.parameters={...h.parameters,docs:{...(Be=h.parameters)==null?void 0:Be.docs,source:{originalSource:`{
  args: {
    children: 'Saving Changes...',
    variant: 'primary',
    isLoading: true,
    loadingText: 'Saving...'
  }
}`,...(we=(Oe=h.parameters)==null?void 0:Oe.docs)==null?void 0:we.source}}};var Ie,ze,De;b.parameters={...b.parameters,docs:{...(Ie=b.parameters)==null?void 0:Ie.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '0.75rem',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap'
  }}>\r
      <Button size="xs" variant="primary">Extra Small</Button>\r
      <Button size="sm" variant="primary">Small</Button>\r
      <Button size="md" variant="primary">Medium</Button>\r
      <Button size="lg" variant="primary">Large</Button>\r
      <Button size="xl" variant="primary">Extra Large</Button>\r
    </div>
}`,...(De=(ze=b.parameters)==null?void 0:ze.docs)==null?void 0:De.source}}};var Ce,Ae,Te;E.parameters={...E.parameters,docs:{...(Ce=E.parameters)==null?void 0:Ce.docs,source:{originalSource:`{
  args: {
    children: 'Custom Gradient Button',
    className: 'custom-btn-example'
  },
  render: args => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    alignItems: 'center',
    justifyContent: 'center'
  }}>\r
      <style>{\`
        .custom-btn-example {
          background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%) !important;
          color: #ffffff !important;
          border-radius: 9999px !important;
          padding: 0 2rem !important;
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4) !important;
          transition: all 0.2s ease-in-out !important;
        }
        .custom-btn-example:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 6px 20px rgba(99, 102, 241, 0.55) !important;
        }
      \`}</style>\r
      <Button {...args} />\r
      <span style={{
      fontSize: '0.85rem',
      color: '#64748b'
    }}>\r
        Custom styled using: <code>className="custom-btn-example"</code>\r
      </span>\r
    </div>
}`,...(Te=(Ae=E.parameters)==null?void 0:Ae.docs)==null?void 0:Te.source}}};var We,Pe,Le;B.parameters={...B.parameters,docs:{...(We=B.parameters)==null?void 0:We.docs,source:{originalSource:`{
  args: {
    children: 'Tailwind Styled Button',
    className: 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold rounded-full px-6 py-2 shadow-lg shadow-indigo-500/30 active:scale-95 transition-all duration-200'
  },
  render: args => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    alignItems: 'center',
    justifyContent: 'center'
  }}>\r
      <Button {...args} />\r
      <span style={{
      fontSize: '0.85rem',
      color: '#64748b'
    }}>\r
        Tailwind utility classes passed directly via <code>className</code>\r
      </span>\r
    </div>
}`,...(Le=(Pe=B.parameters)==null?void 0:Pe.docs)==null?void 0:Le.source}}};var ke,Ge,Ne;O.parameters={...O.parameters,docs:{...(ke=O.parameters)==null?void 0:ke.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    alignItems: 'center',
    justifyContent: 'center'
  }}>\r
      <div style={{
      display: 'flex',
      gap: '0.75rem',
      alignItems: 'center'
    }}>\r
        <Button variant="primary" leftIcon={<PlusIcon />} aria-label="Add item" />\r
        <Button variant="secondary" leftIcon={<PlusIcon />} aria-label="Add item" />\r
        <Button variant="tertiary" leftIcon={<PlusIcon />} aria-label="Add item" />\r
        <Button variant="danger" leftIcon={<PlusIcon />} aria-label="Add item" />\r
        <Button variant="primary" outline leftIcon={<PlusIcon />} aria-label="Add item" />\r
      </div>\r
      <span style={{
      fontSize: '0.85rem',
      color: '#64748b'
    }}>\r
        Icon-only button rendered via <code>{'<Button leftIcon={<Icon />} />'}</code> (without children)\r
      </span>\r
    </div>
}`,...(Ne=(Ge=O.parameters)==null?void 0:Ge.docs)==null?void 0:Ne.source}}};const _e=["Primary","Secondary","Tertiary","Success","Warning","Danger","DangerSoft","PrimaryOutline","SecondaryOutline","SuccessOutline","WarningOutline","DangerOutline","DangerSoftOutline","Soft","Ghost","Link","EnterpriseShowcase","Loading","Sizes","CustomStylingWithClassName","TailwindCSSStyling","IconOnly"];export{E as CustomStylingWithClassName,l as Danger,g as DangerOutline,c as DangerSoft,y as DangerSoftOutline,x as EnterpriseShowcase,v as Ghost,O as IconOnly,S as Link,h as Loading,n as Primary,m as PrimaryOutline,a as Secondary,d as SecondaryOutline,b as Sizes,f as Soft,o as Success,u as SuccessOutline,B as TailwindCSSStyling,i as Tertiary,s as Warning,p as WarningOutline,_e as __namedExportsOrder,Ye as default};
