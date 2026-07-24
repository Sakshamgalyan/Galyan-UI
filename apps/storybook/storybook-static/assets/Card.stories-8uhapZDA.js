import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{B as _}from"./Button-CIcEDTxP.js";import"./index-JhL3uwfD.js";function c({variant:t="default",size:r="md",hoverable:s=!1,className:a="",children:l,onClick:d,style:o}){return e.jsx("div",{className:["gy-card",t!=="default"?`gy-card--${t}`:"",r!=="md"?`gy-card--${r}`:"",s?"gy-card--hoverable":"",a].filter(Boolean).join(" "),onClick:d,style:o,role:d?"button":void 0,tabIndex:d?0:void 0,children:l})}function x({children:t,className:r="",style:s,...a}){return e.jsx("div",{className:`gy-card-header ${r}`,style:s,...a,children:t})}function N({children:t,size:r,className:s="",style:a,...l}){return e.jsx("div",{className:["gy-card-body",r?`gy-card-body--${r}`:"",s].filter(Boolean).join(" "),style:a,...l,children:t})}function C({children:t,className:r="",style:s,...a}){return e.jsx("div",{className:`gy-card-footer ${r}`,style:s,...a,children:t})}function u({title:t,value:r,icon:s,trend:a,footer:l,className:d="",style:o,...j}){const m=a?a.value>=0:null;return e.jsxs("div",{className:`gy-card-info ${d}`,style:o,...j,children:[e.jsxs("div",{className:"gy-card-info__header",children:[e.jsx("span",{className:"gy-card-info__title",children:t}),s&&e.jsx("span",{className:"gy-card-info__icon",children:s})]}),e.jsx("div",{className:"gy-card-info__value",children:r}),a&&e.jsx("div",{children:e.jsxs("span",{className:`gy-card-info__trend gy-card-info__trend--${m?"up":"down"}`,children:[m?"↑":"↓"," ",Math.abs(a.value),"%",a.label&&` ${a.label}`]})}),l&&e.jsx("div",{className:"gy-card-info__footer",children:l})]})}c.__docgenInfo={description:"",methods:[],displayName:"Card",props:{variant:{required:!1,tsType:{name:"union",raw:"'default' | 'elevated' | 'outlined' | 'filled'",elements:[{name:"literal",value:"'default'"},{name:"literal",value:"'elevated'"},{name:"literal",value:"'outlined'"},{name:"literal",value:"'filled'"}]},description:"",defaultValue:{value:"'default'",computed:!1}},size:{required:!1,tsType:{name:"union",raw:"'sm' | 'md' | 'lg'",elements:[{name:"literal",value:"'sm'"},{name:"literal",value:"'md'"},{name:"literal",value:"'lg'"}]},description:"",defaultValue:{value:"'md'",computed:!1}},hoverable:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},style:{required:!1,tsType:{name:"ReactCSSProperties",raw:"React.CSSProperties"},description:""}}};x.__docgenInfo={description:"",methods:[],displayName:"CardHeader",props:{children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},className:{defaultValue:{value:"''",computed:!1},required:!1}}};N.__docgenInfo={description:"",methods:[],displayName:"CardBody",props:{children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},size:{required:!1,tsType:{name:"union",raw:"'sm' | 'md' | 'lg'",elements:[{name:"literal",value:"'sm'"},{name:"literal",value:"'md'"},{name:"literal",value:"'lg'"}]},description:""},className:{defaultValue:{value:"''",computed:!1},required:!1}}};C.__docgenInfo={description:"",methods:[],displayName:"CardFooter",props:{children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},className:{defaultValue:{value:"''",computed:!1},required:!1}}};u.__docgenInfo={description:"",methods:[],displayName:"CardInfo",props:{title:{required:!0,tsType:{name:"string"},description:""},value:{required:!0,tsType:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]},description:""},icon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},trend:{required:!1,tsType:{name:"signature",type:"object",raw:"{ value: number; label?: string }",signature:{properties:[{key:"value",value:{name:"number",required:!0}},{key:"label",value:{name:"string",required:!1}}]}},description:""},footer:{required:!1,tsType:{name:"string"},description:""},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}}}};const T={title:"Components/Card",component:c,tags:["autodocs"]},i={render:()=>e.jsxs(c,{style:{maxWidth:"400px"},children:[e.jsx(x,{children:e.jsx("h3",{style:{margin:0},children:"Neumorphic Card"})}),e.jsx(N,{children:"Soft raised surface elevation built with Galyan design system neumorphism guidelines."}),e.jsx(C,{style:{display:"flex",justifyContent:"flex-end",gap:"0.5rem"},children:e.jsx(_,{variant:"solid",size:"sm",children:"Action"})})]})},n={render:()=>e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(240px, 1fr))",gap:"1rem",maxWidth:"800px"},children:[e.jsx(u,{title:"Total Revenue",value:"$45,231.89",trend:{value:12.5,label:"vs last month"}}),e.jsx(u,{title:"Active Users",value:"+2,350",trend:{value:-3.2,label:"vs last week"}})]})};var p,f,y;i.parameters={...i.parameters,docs:{...(p=i.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => <Card style={{
    maxWidth: '400px'
  }}>\r
      <CardHeader>\r
        <h3 style={{
        margin: 0
      }}>Neumorphic Card</h3>\r
      </CardHeader>\r
      <CardBody>\r
        Soft raised surface elevation built with Galyan design system neumorphism guidelines.\r
      </CardBody>\r
      <CardFooter style={{
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '0.5rem'
    }}>\r
        <Button variant="solid" size="sm">Action</Button>\r
      </CardFooter>\r
    </Card>
}`,...(y=(f=i.parameters)==null?void 0:f.docs)==null?void 0:y.source}}};var v,g,h;n.parameters={...n.parameters,docs:{...(v=n.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '1rem',
    maxWidth: '800px'
  }}>\r
      <CardInfo title="Total Revenue" value="$45,231.89" trend={{
      value: 12.5,
      label: 'vs last month'
    }} />\r
      <CardInfo title="Active Users" value="+2,350" trend={{
      value: -3.2,
      label: 'vs last week'
    }} />\r
    </div>
}`,...(h=(g=n.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};const w=["DefaultNeumorphic","CardInfoDemo"];export{n as CardInfoDemo,i as DefaultNeumorphic,w as __namedExportsOrder,T as default};
