import{j as n}from"./jsx-runtime-D_zvdyIk.js";import{B as r}from"./Button-BeMeJT-5.js";import"./index-CC0H-XIk.js";const Qn={title:"Galyan UI/Button",component:r,tags:["autodocs"],argTypes:{variant:{control:"select",options:["primary","secondary","tertiary","success","warning","danger","danger-soft","soft","ghost","link"],description:"Enterprise button variant preset",table:{type:{summary:"'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'danger-soft' | 'soft' | 'ghost' | 'link'"},defaultValue:{summary:"'primary'"}}},outline:{control:"boolean",description:"Render outlined styling for the selected variant",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},size:{control:"select",options:["xs","sm","md","lg","xl"],description:"Button size preset",table:{type:{summary:"'xs' | 'sm' | 'md' | 'lg' | 'xl'"},defaultValue:{summary:"'md'"}}},isLoading:{control:"boolean",description:"Show loading spinner state",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},disabled:{control:"boolean",description:"Disable button interactions",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},fullWidth:{control:"boolean",description:"Stretch to full width of parent container",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},className:{control:"text",description:"Additional CSS class names for custom styling override",table:{type:{summary:"string"}}},children:{control:"text",description:"Button label content",table:{type:{summary:"ReactNode"}}}}},a={args:{children:"Primary Action",variant:"primary",size:"md"}},t={args:{children:"Secondary Soft Action",variant:"secondary",size:"md"}},i={args:{children:"Tertiary Neutral Gray",variant:"tertiary",size:"md"}},s={args:{children:"Success Action",variant:"success",size:"md"}},o={args:{children:"Warning Action",variant:"warning",size:"md"}},l={args:{children:"Delete Account",variant:"danger",size:"md"}},d={args:{children:"Remove Item",variant:"danger-soft",size:"md"}},c={args:{children:"Primary Outlined",variant:"primary",outline:!0}},u={args:{children:"Secondary Outlined",variant:"secondary",outline:!0}},m={args:{children:"Success Outlined",variant:"success",outline:!0}},p={args:{children:"Warning Outlined",variant:"warning",outline:!0}},g={args:{children:"Danger Red Outlined",variant:"danger",outline:!0}},y={args:{children:"Danger Soft Outlined",variant:"danger-soft",outline:!0}},x={args:{children:"Soft Accent",variant:"soft"}},v={args:{children:"Ghost Action",variant:"ghost"}},h={args:{children:"Learn More",variant:"link"}},f={render:()=>n.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"2rem",padding:"1rem",width:"100%",alignItems:"center"},children:[n.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"0.75rem",alignItems:"center"},children:[n.jsx("h4",{style:{margin:0,fontSize:"0.9rem",color:"#64748b",textTransform:"uppercase",letterSpacing:"0.05em"},children:"Standard Filled Variants"}),n.jsxs("div",{style:{display:"flex",gap:"0.75rem",flexWrap:"wrap",justifyContent:"center"},children:[n.jsx(r,{variant:"primary",children:"Primary (Green)"}),n.jsx(r,{variant:"secondary",children:"Secondary (Teal Soft)"}),n.jsx(r,{variant:"tertiary",children:"Tertiary (Gray)"}),n.jsx(r,{variant:"success",children:"Success"}),n.jsx(r,{variant:"warning",children:"Warning"}),n.jsx(r,{variant:"danger",children:"Danger"}),n.jsx(r,{variant:"danger-soft",children:"Danger Soft"}),n.jsx(r,{variant:"soft",children:"Soft Tint"}),n.jsx(r,{variant:"ghost",children:"Ghost"}),n.jsx(r,{variant:"link",children:"Link"})]})]}),n.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"0.75rem",alignItems:"center"},children:[n.jsx("h4",{style:{margin:0,fontSize:"0.9rem",color:"#64748b",textTransform:"uppercase",letterSpacing:"0.05em"},children:"Context-Aware Outlined Variants (outline=true)"}),n.jsxs("div",{style:{display:"flex",gap:"0.75rem",flexWrap:"wrap",justifyContent:"center"},children:[n.jsx(r,{variant:"primary",outline:!0,children:"Primary Outline"}),n.jsx(r,{variant:"secondary",outline:!0,children:"Secondary Outline"}),n.jsx(r,{variant:"tertiary",outline:!0,children:"Tertiary Outline"}),n.jsx(r,{variant:"success",outline:!0,children:"Success Outline"}),n.jsx(r,{variant:"warning",outline:!0,children:"Warning Outline"}),n.jsx(r,{variant:"danger",outline:!0,children:"Danger Outline"}),n.jsx(r,{variant:"danger-soft",outline:!0,children:"Danger Soft Outline"}),n.jsx(r,{variant:"soft",outline:!0,children:"Soft Outline"})]})]})]})},S={args:{children:"Saving Changes...",variant:"primary",isLoading:!0,loadingText:"Saving..."}},b={render:()=>n.jsxs("div",{style:{display:"flex",gap:"0.75rem",alignItems:"center",justifyContent:"center",flexWrap:"wrap"},children:[n.jsx(r,{size:"xs",variant:"primary",children:"Extra Small"}),n.jsx(r,{size:"sm",variant:"primary",children:"Small"}),n.jsx(r,{size:"md",variant:"primary",children:"Medium"}),n.jsx(r,{size:"lg",variant:"primary",children:"Large"}),n.jsx(r,{size:"xl",variant:"primary",children:"Extra Large"})]})},B={args:{children:"Custom Gradient Button",className:"custom-btn-example"},render:O=>n.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"0.75rem",alignItems:"center",justifyContent:"center"},children:[n.jsx("style",{children:`
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
      `}),n.jsx(r,{...O}),n.jsxs("span",{style:{fontSize:"0.85rem",color:"#64748b"},children:["Custom styled using: ",n.jsx("code",{children:'className="custom-btn-example"'})]})]})},j={args:{children:"Tailwind Styled Button",className:"bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold rounded-full px-6 py-2 shadow-lg shadow-indigo-500/30 active:scale-95 transition-all duration-200"},render:O=>n.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"0.75rem",alignItems:"center",justifyContent:"center"},children:[n.jsx(r,{...O}),n.jsxs("span",{style:{fontSize:"0.85rem",color:"#64748b"},children:["Tailwind utility classes passed directly via ",n.jsx("code",{children:"className"})]})]})},e=()=>n.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:[n.jsx("line",{x1:"12",y1:"5",x2:"12",y2:"19"}),n.jsx("line",{x1:"5",y1:"12",x2:"19",y2:"12"})]}),w={render:()=>n.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem",alignItems:"center",justifyContent:"center"},children:[n.jsxs("div",{style:{display:"flex",gap:"0.75rem",alignItems:"center"},children:[n.jsx(r,{variant:"primary",leftIcon:n.jsx(e,{}),"aria-label":"Add item"}),n.jsx(r,{variant:"secondary",leftIcon:n.jsx(e,{}),"aria-label":"Add item"}),n.jsx(r,{variant:"tertiary",leftIcon:n.jsx(e,{}),"aria-label":"Add item"}),n.jsx(r,{variant:"danger",leftIcon:n.jsx(e,{}),"aria-label":"Add item"}),n.jsx(r,{variant:"primary",outline:!0,leftIcon:n.jsx(e,{}),"aria-label":"Add item"})]}),n.jsxs("span",{style:{fontSize:"0.85rem",color:"#64748b"},children:["Icon-only button rendered via"," ",n.jsx("code",{children:"<Button leftIcon={<Icon />} />"})," (without children)"]})]})},D={render:()=>n.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1.5rem"},children:[n.jsxs("div",{children:[n.jsx("h4",{style:{margin:"0 0 0.75rem",fontSize:"0.9rem",color:"#64748b"},children:"Loading with Custom Text (Hover to inspect wait cursor)"}),n.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:"0.75rem"},children:[n.jsx(r,{variant:"primary",isLoading:!0,loadingText:"Saving changes...",children:"Save Changes"}),n.jsx(r,{variant:"secondary",isLoading:!0,loadingText:"Processing...",children:"Process"}),n.jsx(r,{variant:"danger",isLoading:!0,loadingText:"Deleting record...",children:"Delete"}),n.jsx(r,{variant:"primary",outline:!0,isLoading:!0,loadingText:"Exporting...",children:"Export"}),n.jsx(r,{variant:"ghost",isLoading:!0,loadingText:"Refreshing...",children:"Refresh"})]})]}),n.jsxs("div",{children:[n.jsx("h4",{style:{margin:"0 0 0.75rem",fontSize:"0.9rem",color:"#64748b"},children:"Loading Spinner with Original Label"}),n.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:"0.75rem"},children:[n.jsx(r,{variant:"primary",isLoading:!0,size:"sm",children:"Small Button"}),n.jsx(r,{variant:"primary",isLoading:!0,size:"md",children:"Medium Button"}),n.jsx(r,{variant:"primary",isLoading:!0,size:"lg",children:"Large Button"})]})]})]})},z={render:()=>n.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"},children:[n.jsx("h4",{style:{margin:"0 0 0.5rem",fontSize:"0.9rem",color:"#64748b"},children:"Disabled State (Hover to inspect not-allowed cursor)"}),n.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:"0.75rem"},children:[n.jsx(r,{variant:"primary",disabled:!0,children:"Primary Disabled"}),n.jsx(r,{variant:"secondary",disabled:!0,children:"Secondary Disabled"}),n.jsx(r,{variant:"tertiary",disabled:!0,children:"Tertiary Disabled"}),n.jsx(r,{variant:"danger",disabled:!0,children:"Danger Disabled"}),n.jsx(r,{variant:"ghost",disabled:!0,children:"Ghost Disabled"}),n.jsx(r,{variant:"link",disabled:!0,children:"Link Disabled"})]})]})};var L,I,T;a.parameters={...a.parameters,docs:{...(L=a.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    children: "Primary Action",
    variant: "primary",
    size: "md"
  }
}`,...(T=(I=a.parameters)==null?void 0:I.docs)==null?void 0:T.source}}};var C,W,A;t.parameters={...t.parameters,docs:{...(C=t.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    children: "Secondary Soft Action",
    variant: "secondary",
    size: "md"
  }
}`,...(A=(W=t.parameters)==null?void 0:W.docs)==null?void 0:A.source}}};var P,k,G;i.parameters={...i.parameters,docs:{...(P=i.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    children: "Tertiary Neutral Gray",
    variant: "tertiary",
    size: "md"
  }
}`,...(G=(k=i.parameters)==null?void 0:k.docs)==null?void 0:G.source}}};var N,E,R;s.parameters={...s.parameters,docs:{...(N=s.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    children: "Success Action",
    variant: "success",
    size: "md"
  }
}`,...(R=(E=s.parameters)==null?void 0:E.docs)==null?void 0:R.source}}};var V,M,H;o.parameters={...o.parameters,docs:{...(V=o.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    children: "Warning Action",
    variant: "warning",
    size: "md"
  }
}`,...(H=(M=o.parameters)==null?void 0:M.docs)==null?void 0:H.source}}};var F,Y,_;l.parameters={...l.parameters,docs:{...(F=l.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    children: "Delete Account",
    variant: "danger",
    size: "md"
  }
}`,...(_=(Y=l.parameters)==null?void 0:Y.docs)==null?void 0:_.source}}};var U,q,J;d.parameters={...d.parameters,docs:{...(U=d.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    children: "Remove Item",
    variant: "danger-soft",
    size: "md"
  }
}`,...(J=(q=d.parameters)==null?void 0:q.docs)==null?void 0:J.source}}};var K,Q,X;c.parameters={...c.parameters,docs:{...(K=c.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    children: "Primary Outlined",
    variant: "primary",
    outline: true
  }
}`,...(X=(Q=c.parameters)==null?void 0:Q.docs)==null?void 0:X.source}}};var Z,$,nn;u.parameters={...u.parameters,docs:{...(Z=u.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  args: {
    children: "Secondary Outlined",
    variant: "secondary",
    outline: true
  }
}`,...(nn=($=u.parameters)==null?void 0:$.docs)==null?void 0:nn.source}}};var rn,en,an;m.parameters={...m.parameters,docs:{...(rn=m.parameters)==null?void 0:rn.docs,source:{originalSource:`{
  args: {
    children: "Success Outlined",
    variant: "success",
    outline: true
  }
}`,...(an=(en=m.parameters)==null?void 0:en.docs)==null?void 0:an.source}}};var tn,sn,on;p.parameters={...p.parameters,docs:{...(tn=p.parameters)==null?void 0:tn.docs,source:{originalSource:`{
  args: {
    children: "Warning Outlined",
    variant: "warning",
    outline: true
  }
}`,...(on=(sn=p.parameters)==null?void 0:sn.docs)==null?void 0:on.source}}};var ln,dn,cn;g.parameters={...g.parameters,docs:{...(ln=g.parameters)==null?void 0:ln.docs,source:{originalSource:`{
  args: {
    children: "Danger Red Outlined",
    variant: "danger",
    outline: true
  }
}`,...(cn=(dn=g.parameters)==null?void 0:dn.docs)==null?void 0:cn.source}}};var un,mn,pn;y.parameters={...y.parameters,docs:{...(un=y.parameters)==null?void 0:un.docs,source:{originalSource:`{
  args: {
    children: "Danger Soft Outlined",
    variant: "danger-soft",
    outline: true
  }
}`,...(pn=(mn=y.parameters)==null?void 0:mn.docs)==null?void 0:pn.source}}};var gn,yn,xn;x.parameters={...x.parameters,docs:{...(gn=x.parameters)==null?void 0:gn.docs,source:{originalSource:`{
  args: {
    children: "Soft Accent",
    variant: "soft"
  }
}`,...(xn=(yn=x.parameters)==null?void 0:yn.docs)==null?void 0:xn.source}}};var vn,hn,fn;v.parameters={...v.parameters,docs:{...(vn=v.parameters)==null?void 0:vn.docs,source:{originalSource:`{
  args: {
    children: "Ghost Action",
    variant: "ghost"
  }
}`,...(fn=(hn=v.parameters)==null?void 0:hn.docs)==null?void 0:fn.source}}};var Sn,bn,Bn;h.parameters={...h.parameters,docs:{...(Sn=h.parameters)==null?void 0:Sn.docs,source:{originalSource:`{
  args: {
    children: "Learn More",
    variant: "link"
  }
}`,...(Bn=(bn=h.parameters)==null?void 0:bn.docs)==null?void 0:Bn.source}}};var jn,wn,Dn;f.parameters={...f.parameters,docs:{...(jn=f.parameters)==null?void 0:jn.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    padding: "1rem",
    width: "100%",
    alignItems: "center"
  }}>\r
      <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "0.75rem",
      alignItems: "center"
    }}>\r
        <h4 style={{
        margin: 0,
        fontSize: "0.9rem",
        color: "#64748b",
        textTransform: "uppercase",
        letterSpacing: "0.05em"
      }}>\r
          Standard Filled Variants\r
        </h4>\r
        <div style={{
        display: "flex",
        gap: "0.75rem",
        flexWrap: "wrap",
        justifyContent: "center"
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
      display: "flex",
      flexDirection: "column",
      gap: "0.75rem",
      alignItems: "center"
    }}>\r
        <h4 style={{
        margin: 0,
        fontSize: "0.9rem",
        color: "#64748b",
        textTransform: "uppercase",
        letterSpacing: "0.05em"
      }}>\r
          Context-Aware Outlined Variants (outline=true)\r
        </h4>\r
        <div style={{
        display: "flex",
        gap: "0.75rem",
        flexWrap: "wrap",
        justifyContent: "center"
      }}>\r
          <Button variant="primary" outline>\r
            Primary Outline\r
          </Button>\r
          <Button variant="secondary" outline>\r
            Secondary Outline\r
          </Button>\r
          <Button variant="tertiary" outline>\r
            Tertiary Outline\r
          </Button>\r
          <Button variant="success" outline>\r
            Success Outline\r
          </Button>\r
          <Button variant="warning" outline>\r
            Warning Outline\r
          </Button>\r
          <Button variant="danger" outline>\r
            Danger Outline\r
          </Button>\r
          <Button variant="danger-soft" outline>\r
            Danger Soft Outline\r
          </Button>\r
          <Button variant="soft" outline>\r
            Soft Outline\r
          </Button>\r
        </div>\r
      </div>\r
    </div>
}`,...(Dn=(wn=f.parameters)==null?void 0:wn.docs)==null?void 0:Dn.source}}};var zn,On,Ln;S.parameters={...S.parameters,docs:{...(zn=S.parameters)==null?void 0:zn.docs,source:{originalSource:`{
  args: {
    children: "Saving Changes...",
    variant: "primary",
    isLoading: true,
    loadingText: "Saving..."
  }
}`,...(Ln=(On=S.parameters)==null?void 0:On.docs)==null?void 0:Ln.source}}};var In,Tn,Cn;b.parameters={...b.parameters,docs:{...(In=b.parameters)==null?void 0:In.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: "0.75rem",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap"
  }}>\r
      <Button size="xs" variant="primary">\r
        Extra Small\r
      </Button>\r
      <Button size="sm" variant="primary">\r
        Small\r
      </Button>\r
      <Button size="md" variant="primary">\r
        Medium\r
      </Button>\r
      <Button size="lg" variant="primary">\r
        Large\r
      </Button>\r
      <Button size="xl" variant="primary">\r
        Extra Large\r
      </Button>\r
    </div>
}`,...(Cn=(Tn=b.parameters)==null?void 0:Tn.docs)==null?void 0:Cn.source}}};var Wn,An,Pn;B.parameters={...B.parameters,docs:{...(Wn=B.parameters)==null?void 0:Wn.docs,source:{originalSource:`{
  args: {
    children: "Custom Gradient Button",
    className: "custom-btn-example"
  },
  render: args => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    alignItems: "center",
    justifyContent: "center"
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
      fontSize: "0.85rem",
      color: "#64748b"
    }}>\r
        Custom styled using: <code>className="custom-btn-example"</code>\r
      </span>\r
    </div>
}`,...(Pn=(An=B.parameters)==null?void 0:An.docs)==null?void 0:Pn.source}}};var kn,Gn,Nn;j.parameters={...j.parameters,docs:{...(kn=j.parameters)==null?void 0:kn.docs,source:{originalSource:`{
  args: {
    children: "Tailwind Styled Button",
    className: "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold rounded-full px-6 py-2 shadow-lg shadow-indigo-500/30 active:scale-95 transition-all duration-200"
  },
  render: args => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    alignItems: "center",
    justifyContent: "center"
  }}>\r
      <Button {...args} />\r
      <span style={{
      fontSize: "0.85rem",
      color: "#64748b"
    }}>\r
        Tailwind utility classes passed directly via <code>className</code>\r
      </span>\r
    </div>
}`,...(Nn=(Gn=j.parameters)==null?void 0:Gn.docs)==null?void 0:Nn.source}}};var En,Rn,Vn;w.parameters={...w.parameters,docs:{...(En=w.parameters)==null?void 0:En.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    alignItems: "center",
    justifyContent: "center"
  }}>\r
      <div style={{
      display: "flex",
      gap: "0.75rem",
      alignItems: "center"
    }}>\r
        <Button variant="primary" leftIcon={<PlusIcon />} aria-label="Add item" />\r
        <Button variant="secondary" leftIcon={<PlusIcon />} aria-label="Add item" />\r
        <Button variant="tertiary" leftIcon={<PlusIcon />} aria-label="Add item" />\r
        <Button variant="danger" leftIcon={<PlusIcon />} aria-label="Add item" />\r
        <Button variant="primary" outline leftIcon={<PlusIcon />} aria-label="Add item" />\r
      </div>\r
      <span style={{
      fontSize: "0.85rem",
      color: "#64748b"
    }}>\r
        Icon-only button rendered via{" "}\r
        <code>{"<Button leftIcon={<Icon />} />"}</code> (without children)\r
      </span>\r
    </div>
}`,...(Vn=(Rn=w.parameters)==null?void 0:Rn.docs)==null?void 0:Vn.source}}};var Mn,Hn,Fn;D.parameters={...D.parameters,docs:{...(Mn=D.parameters)==null?void 0:Mn.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem"
  }}>\r
      <div>\r
        <h4 style={{
        margin: "0 0 0.75rem",
        fontSize: "0.9rem",
        color: "#64748b"
      }}>\r
          Loading with Custom Text (Hover to inspect wait cursor)\r
        </h4>\r
        <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0.75rem"
      }}>\r
          <Button variant="primary" isLoading loadingText="Saving changes...">\r
            Save Changes\r
          </Button>\r
          <Button variant="secondary" isLoading loadingText="Processing...">\r
            Process\r
          </Button>\r
          <Button variant="danger" isLoading loadingText="Deleting record...">\r
            Delete\r
          </Button>\r
          <Button variant="primary" outline isLoading loadingText="Exporting...">\r
            Export\r
          </Button>\r
          <Button variant="ghost" isLoading loadingText="Refreshing...">\r
            Refresh\r
          </Button>\r
        </div>\r
      </div>\r
\r
      <div>\r
        <h4 style={{
        margin: "0 0 0.75rem",
        fontSize: "0.9rem",
        color: "#64748b"
      }}>\r
          Loading Spinner with Original Label\r
        </h4>\r
        <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0.75rem"
      }}>\r
          <Button variant="primary" isLoading size="sm">\r
            Small Button\r
          </Button>\r
          <Button variant="primary" isLoading size="md">\r
            Medium Button\r
          </Button>\r
          <Button variant="primary" isLoading size="lg">\r
            Large Button\r
          </Button>\r
        </div>\r
      </div>\r
    </div>
}`,...(Fn=(Hn=D.parameters)==null?void 0:Hn.docs)==null?void 0:Fn.source}}};var Yn,_n,Un;z.parameters={...z.parameters,docs:{...(Yn=z.parameters)==null?void 0:Yn.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "1rem"
  }}>\r
      <h4 style={{
      margin: "0 0 0.5rem",
      fontSize: "0.9rem",
      color: "#64748b"
    }}>\r
        Disabled State (Hover to inspect not-allowed cursor)\r
      </h4>\r
      <div style={{
      display: "flex",
      flexWrap: "wrap",
      gap: "0.75rem"
    }}>\r
        <Button variant="primary" disabled>\r
          Primary Disabled\r
        </Button>\r
        <Button variant="secondary" disabled>\r
          Secondary Disabled\r
        </Button>\r
        <Button variant="tertiary" disabled>\r
          Tertiary Disabled\r
        </Button>\r
        <Button variant="danger" disabled>\r
          Danger Disabled\r
        </Button>\r
        <Button variant="ghost" disabled>\r
          Ghost Disabled\r
        </Button>\r
        <Button variant="link" disabled>\r
          Link Disabled\r
        </Button>\r
      </div>\r
    </div>
}`,...(Un=(_n=z.parameters)==null?void 0:_n.docs)==null?void 0:Un.source}}};const Xn=["Primary","Secondary","Tertiary","Success","Warning","Danger","DangerSoft","PrimaryOutline","SecondaryOutline","SuccessOutline","WarningOutline","DangerOutline","DangerSoftOutline","Soft","Ghost","Link","EnterpriseShowcase","Loading","Sizes","CustomStylingWithClassName","TailwindCSSStyling","IconOnly","LoadingStatesShowcase","DisabledStatesShowcase"];export{B as CustomStylingWithClassName,l as Danger,g as DangerOutline,d as DangerSoft,y as DangerSoftOutline,z as DisabledStatesShowcase,f as EnterpriseShowcase,v as Ghost,w as IconOnly,h as Link,S as Loading,D as LoadingStatesShowcase,a as Primary,c as PrimaryOutline,t as Secondary,u as SecondaryOutline,b as Sizes,x as Soft,s as Success,m as SuccessOutline,j as TailwindCSSStyling,i as Tertiary,o as Warning,p as WarningOutline,Xn as __namedExportsOrder,Qn as default};
