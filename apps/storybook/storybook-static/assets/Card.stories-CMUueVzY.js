import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{S}from"./Skeleton-CYAW5Hss.js";import{B as y}from"./Button-BeMeJT-5.js";import{C as P}from"./Chips-9VuCc6c0.js";import"./index-CC0H-XIk.js";function i({variant:n="default",padding:t="md",shadow:a="sm",hoverEffect:r="none",bgColor:s,customPadding:l,border:g=!0,radius:v="lg",className:d="",isLoading:W=!1,skeletonLines:x=3,skeletonContent:j,children:F,onClick:o,style:O}){const C={...s?{backgroundColor:s}:{},...l?{padding:l}:{},...O},b=["gy-card",`gy-card--${n}`,t!=="none"?`gy-card--padding-${t}`:"",a!=="none"?`gy-card--shadow-${a}`:"",r!=="none"?`gy-card--hover-${r}`:"",g?"gy-card--bordered":"gy-card--no-border",`gy-card--radius-${v}`,o?"gy-card--clickable":"",d].filter(Boolean).join(" ");return W?e.jsx("div",{className:b,style:C,children:j||e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"0.75rem"},children:[e.jsx(S,{width:"40%",height:"1.25rem"}),Array.from({length:x}).map((G,w)=>e.jsx(S,{width:w===x-1?"70%":"100%",height:"0.875rem"},w))]})}):e.jsx("div",{className:b,style:C,onClick:o,role:o?"button":void 0,tabIndex:o?0:void 0,children:F})}function U({children:n,className:t="",style:a,...r}){return e.jsx("div",{className:`gy-card-header ${t}`,style:a,...r,children:n})}function M({children:n,className:t="",style:a,...r}){return e.jsx("div",{className:`gy-card-body ${t}`,style:a,...r,children:n})}function A({children:n,className:t="",style:a,...r}){return e.jsx("div",{className:`gy-card-footer ${t}`,style:a,...r,children:n})}function h({title:n,value:t,icon:a,trend:r,footer:s,className:l="",style:g,...v}){const d=r?r.value>=0:null;return e.jsxs("div",{className:`gy-card-info ${l}`,style:g,...v,children:[e.jsxs("div",{className:"gy-card-info__header",children:[e.jsx("span",{className:"gy-card-info__title",children:n}),a&&e.jsx("span",{className:"gy-card-info__icon",children:a})]}),e.jsx("div",{className:"gy-card-info__value",children:t}),r&&e.jsx("div",{children:e.jsxs("span",{className:`gy-card-info__trend gy-card-info__trend--${d?"up":"down"}`,children:[d?"↑":"↓"," ",Math.abs(r.value),"%",r.label&&` ${r.label}`]})}),s&&e.jsx("div",{className:"gy-card-info__footer",children:s})]})}i.__docgenInfo={description:"",methods:[],displayName:"Card",props:{variant:{required:!1,tsType:{name:"union",raw:'"default" | "elevated" | "outlined" | "filled"',elements:[{name:"literal",value:'"default"'},{name:"literal",value:'"elevated"'},{name:"literal",value:'"outlined"'},{name:"literal",value:'"filled"'}]},description:"",defaultValue:{value:'"default"',computed:!1}},padding:{required:!1,tsType:{name:"union",raw:'"none" | "sm" | "md" | "lg"',elements:[{name:"literal",value:'"none"'},{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'}]},description:"",defaultValue:{value:'"md"',computed:!1}},shadow:{required:!1,tsType:{name:"union",raw:'"none" | "sm" | "md" | "lg"',elements:[{name:"literal",value:'"none"'},{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'}]},description:"",defaultValue:{value:'"sm"',computed:!1}},hoverEffect:{required:!1,tsType:{name:"union",raw:'"none" | "lift" | "glow" | "border"',elements:[{name:"literal",value:'"none"'},{name:"literal",value:'"lift"'},{name:"literal",value:'"glow"'},{name:"literal",value:'"border"'}]},description:"",defaultValue:{value:'"none"',computed:!1}},bgColor:{required:!1,tsType:{name:"string"},description:""},customPadding:{required:!1,tsType:{name:"string"},description:""},border:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},radius:{required:!1,tsType:{name:"union",raw:'"none" | "sm" | "md" | "lg" | "xl" | "full"',elements:[{name:"literal",value:'"none"'},{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'},{name:"literal",value:'"xl"'},{name:"literal",value:'"full"'}]},description:"",defaultValue:{value:'"lg"',computed:!1}},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}},isLoading:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},skeletonLines:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"3",computed:!1}},skeletonContent:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(e: React.MouseEvent<HTMLDivElement>) => void",signature:{arguments:[{type:{name:"ReactMouseEvent",raw:"React.MouseEvent<HTMLDivElement>",elements:[{name:"HTMLDivElement"}]},name:"e"}],return:{name:"void"}}},description:""},style:{required:!1,tsType:{name:"ReactCSSProperties",raw:"React.CSSProperties"},description:""}}};U.__docgenInfo={description:"",methods:[],displayName:"CardHeader",props:{children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},className:{defaultValue:{value:'""',computed:!1},required:!1}}};M.__docgenInfo={description:"",methods:[],displayName:"CardBody",props:{children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},className:{defaultValue:{value:'""',computed:!1},required:!1}}};A.__docgenInfo={description:"",methods:[],displayName:"CardFooter",props:{children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},className:{defaultValue:{value:'""',computed:!1},required:!1}}};h.__docgenInfo={description:"",methods:[],displayName:"CardInfo",props:{title:{required:!0,tsType:{name:"string"},description:""},value:{required:!0,tsType:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]},description:""},icon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},trend:{required:!1,tsType:{name:"signature",type:"object",raw:"{ value: number; label?: string }",signature:{properties:[{key:"value",value:{name:"number",required:!0}},{key:"label",value:{name:"string",required:!1}}]}},description:""},footer:{required:!1,tsType:{name:"string"},description:""},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}}}};const Z={title:"Galyan UI/Card",component:i,parameters:{layout:"centered",docs:{description:{component:"Versatile container for grouping related content and actions."}}},tags:["autodocs"],decorators:[n=>e.jsx("div",{style:{width:440,padding:"1rem"},children:e.jsx(n,{})})],argTypes:{variant:{control:"select",options:["default","elevated","outlined","filled"]},padding:{control:"select",options:["none","sm","md","lg"]},shadow:{control:"select",options:["none","sm","md","lg"]},hoverEffect:{control:"select",options:["none","lift","glow","border"]},radius:{control:"select",options:["none","sm","md","lg","xl","full"]},border:{control:"boolean"},isLoading:{control:"boolean"},skeletonLines:{control:"number"}}},m={args:{variant:"default",padding:"md",shadow:"sm",hoverEffect:"none",radius:"xl",border:!0,isLoading:!1},render:n=>e.jsxs(i,{...n,children:[e.jsx(U,{children:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx("h3",{style:{margin:0,fontSize:"1.125rem"},children:"Project Overview"}),e.jsx(P,{size:"sm",variant:"success",children:"Active"})]})}),e.jsx(M,{children:e.jsx("p",{style:{margin:"0 0 1rem",color:"var(--gy-text-muted)",fontSize:"0.875rem",lineHeight:1.6},children:"This card displays essential project details, timeline milestones, and quick team summaries."})}),e.jsx(A,{children:e.jsxs("div",{style:{display:"flex",gap:"0.5rem",justifyContent:"flex-end"},children:[e.jsx(y,{size:"sm",variant:"ghost",children:"Dismiss"}),e.jsx(y,{size:"sm",variant:"primary",children:"View Details"})]})})]})},c={render:()=>e.jsx(i,{variant:"elevated",hoverEffect:"lift",padding:"md",onClick:()=>alert("Card clicked!"),children:e.jsxs("div",{style:{display:"flex",alignItems:"flex-start",gap:"1rem"},children:[e.jsx("div",{style:{width:44,height:44,borderRadius:"0.75rem",background:"color-mix(in srgb, var(--gy-primary) 15%, transparent)",color:"var(--gy-primary)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"bold",fontSize:"1.25rem",flexShrink:0},children:"⚡"}),e.jsxs("div",{style:{flex:1},children:[e.jsx("h4",{style:{margin:"0 0 0.25rem",fontSize:"1rem"},children:"Interactive Workflow"}),e.jsx("p",{style:{margin:0,fontSize:"0.85rem",color:"var(--gy-text-muted)"},children:"Hover over this card to preview the subtle 3D lift, border highlight, and elevation shadow."})]})]})})},u={render:()=>e.jsxs(i,{variant:"elevated",padding:"lg",shadow:"md",hoverEffect:"lift",children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"0.5rem"},children:[e.jsx("h3",{style:{margin:0,fontSize:"1.25rem"},children:"Professional"}),e.jsx(P,{variant:"solid",size:"sm",children:"POPULAR"})]}),e.jsxs("div",{style:{display:"flex",alignItems:"baseline",gap:"0.25rem",margin:"1rem 0"},children:[e.jsx("span",{style:{fontSize:"2.25rem",fontWeight:"800"},children:"$29"}),e.jsx("span",{style:{color:"var(--gy-text-muted)",fontSize:"0.875rem"},children:"/ user / month"})]}),e.jsx("p",{style:{color:"var(--gy-text-muted)",fontSize:"0.875rem",marginBottom:"1.5rem"},children:"Ideal for growing engineering teams needing advanced theming and zero-latency UI components."}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"0.625rem",marginBottom:"1.75rem",fontSize:"0.875rem"},children:[e.jsx("div",{children:"✓ Unlimited multi-brand roles"}),e.jsx("div",{children:"✓ Dark mode & custom color engine"}),e.jsx("div",{children:"✓ Storybook docs & Figma sync"})]}),e.jsx(y,{fullWidth:!0,variant:"primary",size:"md",children:"Get Started"})]})},p={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"},children:[e.jsx(i,{padding:"md",shadow:"sm",hoverEffect:"lift",children:e.jsx(h,{title:"Monthly Active Users",value:"48,290",trend:{value:14.2,label:"vs last month"},footer:"Updated 5 mins ago"})}),e.jsx(i,{padding:"md",shadow:"sm",hoverEffect:"lift",children:e.jsx(h,{title:"Server Error Rate",value:"0.04%",trend:{value:-42.8,label:"reduction"},footer:"All systems operating normally"})})]})},f={args:{isLoading:!0,padding:"md",skeletonLines:3}};var R,N,z;m.parameters={...m.parameters,docs:{...(R=m.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    variant: "default",
    padding: "md",
    shadow: "sm",
    hoverEffect: "none",
    radius: "xl",
    border: true,
    isLoading: false
  },
  render: args => <Card {...args}>\r
      <CardHeader>\r
        <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>\r
          <h3 style={{
          margin: 0,
          fontSize: "1.125rem"
        }}>Project Overview</h3>\r
          <Chip size="sm" variant="success">Active</Chip>\r
        </div>\r
      </CardHeader>\r
      <CardBody>\r
        <p style={{
        margin: "0 0 1rem",
        color: "var(--gy-text-muted)",
        fontSize: "0.875rem",
        lineHeight: 1.6
      }}>\r
          This card displays essential project details, timeline milestones, and quick team summaries.\r
        </p>\r
      </CardBody>\r
      <CardFooter>\r
        <div style={{
        display: "flex",
        gap: "0.5rem",
        justifyContent: "flex-end"
      }}>\r
          <Button size="sm" variant="ghost">Dismiss</Button>\r
          <Button size="sm" variant="primary">View Details</Button>\r
        </div>\r
      </CardFooter>\r
    </Card>
}`,...(z=(N=m.parameters)==null?void 0:N.docs)==null?void 0:z.source}}};var q,I,T;c.parameters={...c.parameters,docs:{...(q=c.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: () => <Card variant="elevated" hoverEffect="lift" padding="md" onClick={() => alert("Card clicked!")}>\r
      <div style={{
      display: "flex",
      alignItems: "flex-start",
      gap: "1rem"
    }}>\r
        <div style={{
        width: 44,
        height: 44,
        borderRadius: "0.75rem",
        background: "color-mix(in srgb, var(--gy-primary) 15%, transparent)",
        color: "var(--gy-primary)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        fontSize: "1.25rem",
        flexShrink: 0
      }}>\r
          ⚡\r
        </div>\r
        <div style={{
        flex: 1
      }}>\r
          <h4 style={{
          margin: "0 0 0.25rem",
          fontSize: "1rem"
        }}>Interactive Workflow</h4>\r
          <p style={{
          margin: 0,
          fontSize: "0.85rem",
          color: "var(--gy-text-muted)"
        }}>\r
            Hover over this card to preview the subtle 3D lift, border highlight, and elevation shadow.\r
          </p>\r
        </div>\r
      </div>\r
    </Card>
}`,...(T=(I=c.parameters)==null?void 0:I.docs)==null?void 0:T.source}}};var _,k,E;u.parameters={...u.parameters,docs:{...(_=u.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: () => <Card variant="elevated" padding="lg" shadow="md" hoverEffect="lift">\r
      <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "0.5rem"
    }}>\r
        <h3 style={{
        margin: 0,
        fontSize: "1.25rem"
      }}>Professional</h3>\r
        <Chip variant="solid" size="sm">POPULAR</Chip>\r
      </div>\r
      <div style={{
      display: "flex",
      alignItems: "baseline",
      gap: "0.25rem",
      margin: "1rem 0"
    }}>\r
        <span style={{
        fontSize: "2.25rem",
        fontWeight: "800"
      }}>$29</span>\r
        <span style={{
        color: "var(--gy-text-muted)",
        fontSize: "0.875rem"
      }}>/ user / month</span>\r
      </div>\r
      <p style={{
      color: "var(--gy-text-muted)",
      fontSize: "0.875rem",
      marginBottom: "1.5rem"
    }}>\r
        Ideal for growing engineering teams needing advanced theming and zero-latency UI components.\r
      </p>\r
      <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "0.625rem",
      marginBottom: "1.75rem",
      fontSize: "0.875rem"
    }}>\r
        <div>✓ Unlimited multi-brand roles</div>\r
        <div>✓ Dark mode & custom color engine</div>\r
        <div>✓ Storybook docs & Figma sync</div>\r
      </div>\r
      <Button fullWidth variant="primary" size="md">\r
        Get Started\r
      </Button>\r
    </Card>
}`,...(E=(k=u.parameters)==null?void 0:k.docs)==null?void 0:E.source}}};var B,D,L;p.parameters={...p.parameters,docs:{...(B=p.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "1rem"
  }}>\r
      <Card padding="md" shadow="sm" hoverEffect="lift">\r
        <CardInfo title="Monthly Active Users" value="48,290" trend={{
        value: 14.2,
        label: "vs last month"
      }} footer="Updated 5 mins ago" />\r
      </Card>\r
\r
      <Card padding="md" shadow="sm" hoverEffect="lift">\r
        <CardInfo title="Server Error Rate" value="0.04%" trend={{
        value: -42.8,
        label: "reduction"
      }} footer="All systems operating normally" />\r
      </Card>\r
    </div>
}`,...(L=(D=p.parameters)==null?void 0:D.docs)==null?void 0:L.source}}};var V,H,$;f.parameters={...f.parameters,docs:{...(V=f.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    isLoading: true,
    padding: "md",
    skeletonLines: 3
  }
}`,...($=(H=f.parameters)==null?void 0:H.docs)==null?void 0:$.source}}};const ee=["Default","InteractiveHoverCard","PricingCard","CardInfoMetric","LoadingSkeletonCard"];export{p as CardInfoMetric,m as Default,c as InteractiveHoverCard,f as LoadingSkeletonCard,u as PricingCard,ee as __namedExportsOrder,Z as default};
