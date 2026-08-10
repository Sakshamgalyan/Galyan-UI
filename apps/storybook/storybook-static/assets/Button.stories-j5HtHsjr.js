import{j as n}from"./jsx-runtime-D_zvdyIk.js";import{B as e}from"./Button-PdOFK0Ua.js";import"./index-CC0H-XIk.js";const Fn={title:"Galyan UI/Button",component:e,tags:["autodocs"],argTypes:{variant:{control:"select",options:["primary","secondary","tertiary","success","warning","danger","danger-soft","soft","ghost","link"],description:"Enterprise button variant preset",table:{type:{summary:"'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'danger-soft' | 'soft' | 'ghost' | 'link'"},defaultValue:{summary:"'primary'"}}},outline:{control:"boolean",description:"Render outlined styling for the selected variant",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},size:{control:"select",options:["xs","sm","md","lg","xl"],description:"Button size preset",table:{type:{summary:"'xs' | 'sm' | 'md' | 'lg' | 'xl'"},defaultValue:{summary:"'md'"}}},isLoading:{control:"boolean",description:"Show loading spinner state",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},disabled:{control:"boolean",description:"Disable button interactions",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},fullWidth:{control:"boolean",description:"Stretch to full width of parent container",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},className:{control:"text",description:"Additional CSS class names for custom styling override",table:{type:{summary:"string"}}},children:{control:"text",description:"Button label content",table:{type:{summary:"ReactNode"}}}}},t={args:{children:"Primary Action",variant:"primary",size:"md"}},a={args:{children:"Secondary Soft Action",variant:"secondary",size:"md"}},i={args:{children:"Tertiary Neutral Gray",variant:"tertiary",size:"md"}},s={args:{children:"Success Action",variant:"success",size:"md"}},o={args:{children:"Warning Action",variant:"warning",size:"md"}},l={args:{children:"Delete Account",variant:"danger",size:"md"}},c={args:{children:"Remove Item",variant:"danger-soft",size:"md"}},d={args:{children:"Primary Outlined",variant:"primary",outline:!0}},u={args:{children:"Secondary Outlined",variant:"secondary",outline:!0}},m={args:{children:"Success Outlined",variant:"success",outline:!0}},p={args:{children:"Warning Outlined",variant:"warning",outline:!0}},g={args:{children:"Danger Red Outlined",variant:"danger",outline:!0}},y={args:{children:"Danger Soft Outlined",variant:"danger-soft",outline:!0}},f={args:{children:"Soft Accent",variant:"soft"}},x={args:{children:"Ghost Action",variant:"ghost"}},v={args:{children:"Learn More",variant:"link"}},h={render:()=>n.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"2rem",padding:"1rem",width:"100%",alignItems:"center"},children:[n.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"0.75rem",alignItems:"center"},children:[n.jsx("h4",{style:{margin:0,fontSize:"0.9rem",color:"#64748b",textTransform:"uppercase",letterSpacing:"0.05em"},children:"Standard Filled Variants"}),n.jsxs("div",{style:{display:"flex",gap:"0.75rem",flexWrap:"wrap",justifyContent:"center"},children:[n.jsx(e,{variant:"primary",children:"Primary (Green)"}),n.jsx(e,{variant:"secondary",children:"Secondary (Teal Soft)"}),n.jsx(e,{variant:"tertiary",children:"Tertiary (Gray)"}),n.jsx(e,{variant:"success",children:"Success"}),n.jsx(e,{variant:"warning",children:"Warning"}),n.jsx(e,{variant:"danger",children:"Danger"}),n.jsx(e,{variant:"danger-soft",children:"Danger Soft"}),n.jsx(e,{variant:"soft",children:"Soft Tint"}),n.jsx(e,{variant:"ghost",children:"Ghost"}),n.jsx(e,{variant:"link",children:"Link"})]})]}),n.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"0.75rem",alignItems:"center"},children:[n.jsx("h4",{style:{margin:0,fontSize:"0.9rem",color:"#64748b",textTransform:"uppercase",letterSpacing:"0.05em"},children:"Context-Aware Outlined Variants (outline=true)"}),n.jsxs("div",{style:{display:"flex",gap:"0.75rem",flexWrap:"wrap",justifyContent:"center"},children:[n.jsx(e,{variant:"primary",outline:!0,children:"Primary Outline"}),n.jsx(e,{variant:"secondary",outline:!0,children:"Secondary Outline"}),n.jsx(e,{variant:"tertiary",outline:!0,children:"Tertiary Outline"}),n.jsx(e,{variant:"success",outline:!0,children:"Success Outline"}),n.jsx(e,{variant:"warning",outline:!0,children:"Warning Outline"}),n.jsx(e,{variant:"danger",outline:!0,children:"Danger Outline"}),n.jsx(e,{variant:"danger-soft",outline:!0,children:"Danger Soft Outline"}),n.jsx(e,{variant:"soft",outline:!0,children:"Soft Outline"})]})]})]})},S={args:{children:"Saving Changes...",variant:"primary",isLoading:!0,loadingText:"Saving..."}},j={render:()=>n.jsxs("div",{style:{display:"flex",gap:"0.75rem",alignItems:"center",justifyContent:"center",flexWrap:"wrap"},children:[n.jsx(e,{size:"xs",variant:"primary",children:"Extra Small"}),n.jsx(e,{size:"sm",variant:"primary",children:"Small"}),n.jsx(e,{size:"md",variant:"primary",children:"Medium"}),n.jsx(e,{size:"lg",variant:"primary",children:"Large"}),n.jsx(e,{size:"xl",variant:"primary",children:"Extra Large"})]})},b={args:{children:"Custom Gradient Button",className:"custom-btn-example"},render:w=>n.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"0.75rem",alignItems:"center",justifyContent:"center"},children:[n.jsx("style",{children:`
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
      `}),n.jsx(e,{...w}),n.jsxs("span",{style:{fontSize:"0.85rem",color:"#64748b"},children:["Custom styled using: ",n.jsx("code",{children:'className="custom-btn-example"'})]})]})},B={args:{children:"Tailwind Styled Button",className:"bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold rounded-full px-6 py-2 shadow-lg shadow-indigo-500/30 active:scale-95 transition-all duration-200"},render:w=>n.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"0.75rem",alignItems:"center",justifyContent:"center"},children:[n.jsx(e,{...w}),n.jsxs("span",{style:{fontSize:"0.85rem",color:"#64748b"},children:["Tailwind utility classes passed directly via ",n.jsx("code",{children:"className"})]})]})},r=()=>n.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:[n.jsx("line",{x1:"12",y1:"5",x2:"12",y2:"19"}),n.jsx("line",{x1:"5",y1:"12",x2:"19",y2:"12"})]}),O={render:()=>n.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem",alignItems:"center",justifyContent:"center"},children:[n.jsxs("div",{style:{display:"flex",gap:"0.75rem",alignItems:"center"},children:[n.jsx(e,{variant:"primary",leftIcon:n.jsx(r,{}),"aria-label":"Add item"}),n.jsx(e,{variant:"secondary",leftIcon:n.jsx(r,{}),"aria-label":"Add item"}),n.jsx(e,{variant:"tertiary",leftIcon:n.jsx(r,{}),"aria-label":"Add item"}),n.jsx(e,{variant:"danger",leftIcon:n.jsx(r,{}),"aria-label":"Add item"}),n.jsx(e,{variant:"primary",outline:!0,leftIcon:n.jsx(r,{}),"aria-label":"Add item"})]}),n.jsxs("span",{style:{fontSize:"0.85rem",color:"#64748b"},children:["Icon-only button rendered via"," ",n.jsx("code",{children:"<Button leftIcon={<Icon />} />"})," (without children)"]})]})};var I,z,D;t.parameters={...t.parameters,docs:{...(I=t.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    children: "Primary Action",
    variant: "primary",
    size: "md"
  }
}`,...(D=(z=t.parameters)==null?void 0:z.docs)==null?void 0:D.source}}};var C,A,T;a.parameters={...a.parameters,docs:{...(C=a.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    children: "Secondary Soft Action",
    variant: "secondary",
    size: "md"
  }
}`,...(T=(A=a.parameters)==null?void 0:A.docs)==null?void 0:T.source}}};var W,P,L;i.parameters={...i.parameters,docs:{...(W=i.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    children: "Tertiary Neutral Gray",
    variant: "tertiary",
    size: "md"
  }
}`,...(L=(P=i.parameters)==null?void 0:P.docs)==null?void 0:L.source}}};var k,G,N;s.parameters={...s.parameters,docs:{...(k=s.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    children: "Success Action",
    variant: "success",
    size: "md"
  }
}`,...(N=(G=s.parameters)==null?void 0:G.docs)==null?void 0:N.source}}};var V,E,R;o.parameters={...o.parameters,docs:{...(V=o.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    children: "Warning Action",
    variant: "warning",
    size: "md"
  }
}`,...(R=(E=o.parameters)==null?void 0:E.docs)==null?void 0:R.source}}};var M,F,Y;l.parameters={...l.parameters,docs:{...(M=l.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    children: "Delete Account",
    variant: "danger",
    size: "md"
  }
}`,...(Y=(F=l.parameters)==null?void 0:F.docs)==null?void 0:Y.source}}};var _,U,q;c.parameters={...c.parameters,docs:{...(_=c.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    children: "Remove Item",
    variant: "danger-soft",
    size: "md"
  }
}`,...(q=(U=c.parameters)==null?void 0:U.docs)==null?void 0:q.source}}};var H,J,K;d.parameters={...d.parameters,docs:{...(H=d.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    children: "Primary Outlined",
    variant: "primary",
    outline: true
  }
}`,...(K=(J=d.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};var Q,X,Z;u.parameters={...u.parameters,docs:{...(Q=u.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    children: "Secondary Outlined",
    variant: "secondary",
    outline: true
  }
}`,...(Z=(X=u.parameters)==null?void 0:X.docs)==null?void 0:Z.source}}};var $,nn,en;m.parameters={...m.parameters,docs:{...($=m.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    children: "Success Outlined",
    variant: "success",
    outline: true
  }
}`,...(en=(nn=m.parameters)==null?void 0:nn.docs)==null?void 0:en.source}}};var rn,tn,an;p.parameters={...p.parameters,docs:{...(rn=p.parameters)==null?void 0:rn.docs,source:{originalSource:`{
  args: {
    children: "Warning Outlined",
    variant: "warning",
    outline: true
  }
}`,...(an=(tn=p.parameters)==null?void 0:tn.docs)==null?void 0:an.source}}};var sn,on,ln;g.parameters={...g.parameters,docs:{...(sn=g.parameters)==null?void 0:sn.docs,source:{originalSource:`{
  args: {
    children: "Danger Red Outlined",
    variant: "danger",
    outline: true
  }
}`,...(ln=(on=g.parameters)==null?void 0:on.docs)==null?void 0:ln.source}}};var cn,dn,un;y.parameters={...y.parameters,docs:{...(cn=y.parameters)==null?void 0:cn.docs,source:{originalSource:`{
  args: {
    children: "Danger Soft Outlined",
    variant: "danger-soft",
    outline: true
  }
}`,...(un=(dn=y.parameters)==null?void 0:dn.docs)==null?void 0:un.source}}};var mn,pn,gn;f.parameters={...f.parameters,docs:{...(mn=f.parameters)==null?void 0:mn.docs,source:{originalSource:`{
  args: {
    children: "Soft Accent",
    variant: "soft"
  }
}`,...(gn=(pn=f.parameters)==null?void 0:pn.docs)==null?void 0:gn.source}}};var yn,fn,xn;x.parameters={...x.parameters,docs:{...(yn=x.parameters)==null?void 0:yn.docs,source:{originalSource:`{
  args: {
    children: "Ghost Action",
    variant: "ghost"
  }
}`,...(xn=(fn=x.parameters)==null?void 0:fn.docs)==null?void 0:xn.source}}};var vn,hn,Sn;v.parameters={...v.parameters,docs:{...(vn=v.parameters)==null?void 0:vn.docs,source:{originalSource:`{
  args: {
    children: "Learn More",
    variant: "link"
  }
}`,...(Sn=(hn=v.parameters)==null?void 0:hn.docs)==null?void 0:Sn.source}}};var jn,bn,Bn;h.parameters={...h.parameters,docs:{...(jn=h.parameters)==null?void 0:jn.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    padding: "1rem",
    width: "100%",
    alignItems: "center"
  }}>
      <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "0.75rem",
      alignItems: "center"
    }}>
        <h4 style={{
        margin: 0,
        fontSize: "0.9rem",
        color: "#64748b",
        textTransform: "uppercase",
        letterSpacing: "0.05em"
      }}>
          Standard Filled Variants
        </h4>
        <div style={{
        display: "flex",
        gap: "0.75rem",
        flexWrap: "wrap",
        justifyContent: "center"
      }}>
          <Button variant="primary">Primary (Green)</Button>
          <Button variant="secondary">Secondary (Teal Soft)</Button>
          <Button variant="tertiary">Tertiary (Gray)</Button>
          <Button variant="success">Success</Button>
          <Button variant="warning">Warning</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="danger-soft">Danger Soft</Button>
          <Button variant="soft">Soft Tint</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>

      <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "0.75rem",
      alignItems: "center"
    }}>
        <h4 style={{
        margin: 0,
        fontSize: "0.9rem",
        color: "#64748b",
        textTransform: "uppercase",
        letterSpacing: "0.05em"
      }}>
          Context-Aware Outlined Variants (outline=true)
        </h4>
        <div style={{
        display: "flex",
        gap: "0.75rem",
        flexWrap: "wrap",
        justifyContent: "center"
      }}>
          <Button variant="primary" outline>
            Primary Outline
          </Button>
          <Button variant="secondary" outline>
            Secondary Outline
          </Button>
          <Button variant="tertiary" outline>
            Tertiary Outline
          </Button>
          <Button variant="success" outline>
            Success Outline
          </Button>
          <Button variant="warning" outline>
            Warning Outline
          </Button>
          <Button variant="danger" outline>
            Danger Outline
          </Button>
          <Button variant="danger-soft" outline>
            Danger Soft Outline
          </Button>
          <Button variant="soft" outline>
            Soft Outline
          </Button>
        </div>
      </div>
    </div>
}`,...(Bn=(bn=h.parameters)==null?void 0:bn.docs)==null?void 0:Bn.source}}};var On,wn,In;S.parameters={...S.parameters,docs:{...(On=S.parameters)==null?void 0:On.docs,source:{originalSource:`{
  args: {
    children: "Saving Changes...",
    variant: "primary",
    isLoading: true,
    loadingText: "Saving..."
  }
}`,...(In=(wn=S.parameters)==null?void 0:wn.docs)==null?void 0:In.source}}};var zn,Dn,Cn;j.parameters={...j.parameters,docs:{...(zn=j.parameters)==null?void 0:zn.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: "0.75rem",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap"
  }}>
      <Button size="xs" variant="primary">
        Extra Small
      </Button>
      <Button size="sm" variant="primary">
        Small
      </Button>
      <Button size="md" variant="primary">
        Medium
      </Button>
      <Button size="lg" variant="primary">
        Large
      </Button>
      <Button size="xl" variant="primary">
        Extra Large
      </Button>
    </div>
}`,...(Cn=(Dn=j.parameters)==null?void 0:Dn.docs)==null?void 0:Cn.source}}};var An,Tn,Wn;b.parameters={...b.parameters,docs:{...(An=b.parameters)==null?void 0:An.docs,source:{originalSource:`{
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
  }}>
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
      \`}</style>
      <Button {...args} />
      <span style={{
      fontSize: "0.85rem",
      color: "#64748b"
    }}>
        Custom styled using: <code>className="custom-btn-example"</code>
      </span>
    </div>
}`,...(Wn=(Tn=b.parameters)==null?void 0:Tn.docs)==null?void 0:Wn.source}}};var Pn,Ln,kn;B.parameters={...B.parameters,docs:{...(Pn=B.parameters)==null?void 0:Pn.docs,source:{originalSource:`{
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
  }}>
      <Button {...args} />
      <span style={{
      fontSize: "0.85rem",
      color: "#64748b"
    }}>
        Tailwind utility classes passed directly via <code>className</code>
      </span>
    </div>
}`,...(kn=(Ln=B.parameters)==null?void 0:Ln.docs)==null?void 0:kn.source}}};var Gn,Nn,Vn;O.parameters={...O.parameters,docs:{...(Gn=O.parameters)==null?void 0:Gn.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    alignItems: "center",
    justifyContent: "center"
  }}>
      <div style={{
      display: "flex",
      gap: "0.75rem",
      alignItems: "center"
    }}>
        <Button variant="primary" leftIcon={<PlusIcon />} aria-label="Add item" />
        <Button variant="secondary" leftIcon={<PlusIcon />} aria-label="Add item" />
        <Button variant="tertiary" leftIcon={<PlusIcon />} aria-label="Add item" />
        <Button variant="danger" leftIcon={<PlusIcon />} aria-label="Add item" />
        <Button variant="primary" outline leftIcon={<PlusIcon />} aria-label="Add item" />
      </div>
      <span style={{
      fontSize: "0.85rem",
      color: "#64748b"
    }}>
        Icon-only button rendered via{" "}
        <code>{"<Button leftIcon={<Icon />} />"}</code> (without children)
      </span>
    </div>
}`,...(Vn=(Nn=O.parameters)==null?void 0:Nn.docs)==null?void 0:Vn.source}}};const Yn=["Primary","Secondary","Tertiary","Success","Warning","Danger","DangerSoft","PrimaryOutline","SecondaryOutline","SuccessOutline","WarningOutline","DangerOutline","DangerSoftOutline","Soft","Ghost","Link","EnterpriseShowcase","Loading","Sizes","CustomStylingWithClassName","TailwindCSSStyling","IconOnly"];export{b as CustomStylingWithClassName,l as Danger,g as DangerOutline,c as DangerSoft,y as DangerSoftOutline,h as EnterpriseShowcase,x as Ghost,O as IconOnly,v as Link,S as Loading,t as Primary,d as PrimaryOutline,a as Secondary,u as SecondaryOutline,j as Sizes,f as Soft,s as Success,m as SuccessOutline,B as TailwindCSSStyling,i as Tertiary,o as Warning,p as WarningOutline,Yn as __namedExportsOrder,Fn as default};
