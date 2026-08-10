import{j as y}from"./jsx-runtime-D_zvdyIk.js";const c={h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",h6:"h6",p:"p",span:"span",label:"label",small:"small"};function v({variant:a="p",weight:l,align:n,margin:e="none",textColor:r,bgColor:t,className:i="",children:s,as:m,style:o,...u}){const p=m??c[a]??"p",d=["gy-typography",`gy-typography--${a}`,l?`gy-typography--weight-${l}`:"",n?`gy-typography--align-${n}`:"",e&&e!=="none"?`gy-typography--margin-${e}`:"",i].filter(Boolean).join(" "),h={...r?{color:r}:{},...t?{backgroundColor:t}:{},...o};return y.jsx(p,{className:d,style:h,...u,children:s})}v.__docgenInfo={description:"",methods:[],displayName:"Typography",props:{variant:{required:!1,tsType:{name:"union",raw:`| "h1"\r
| "h2"\r
| "h3"\r
| "h4"\r
| "h5"\r
| "h6"\r
| "p"\r
| "span"\r
| "label"\r
| "small"`,elements:[{name:"literal",value:'"h1"'},{name:"literal",value:'"h2"'},{name:"literal",value:'"h3"'},{name:"literal",value:'"h4"'},{name:"literal",value:'"h5"'},{name:"literal",value:'"h6"'},{name:"literal",value:'"p"'},{name:"literal",value:'"span"'},{name:"literal",value:'"label"'},{name:"literal",value:'"small"'}]},description:"",defaultValue:{value:'"p"',computed:!1}},weight:{required:!1,tsType:{name:"union",raw:`| "light"\r
| "normal"\r
| "medium"\r
| "semibold"\r
| "bold"\r
| "extrabold"`,elements:[{name:"literal",value:'"light"'},{name:"literal",value:'"normal"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"semibold"'},{name:"literal",value:'"bold"'},{name:"literal",value:'"extrabold"'}]},description:""},align:{required:!1,tsType:{name:"union",raw:'"left" | "center" | "right" | "justify"',elements:[{name:"literal",value:'"left"'},{name:"literal",value:'"center"'},{name:"literal",value:'"right"'},{name:"literal",value:'"justify"'}]},description:""},margin:{required:!1,tsType:{name:"union",raw:'"none" | "xs" | "sm" | "md" | "lg" | "xl"',elements:[{name:"literal",value:'"none"'},{name:"literal",value:'"xs"'},{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'},{name:"literal",value:'"xl"'}]},description:"",defaultValue:{value:'"none"',computed:!1}},textColor:{required:!1,tsType:{name:"string"},description:""},bgColor:{required:!1,tsType:{name:"string"},description:""},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},as:{required:!1,tsType:{name:"ReactElementType",raw:"React.ElementType"},description:""},htmlFor:{required:!1,tsType:{name:"string"},description:""}}};export{v as T};
