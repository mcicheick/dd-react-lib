(this["webpackJsonpdd-react-lib-example"]=this["webpackJsonpdd-react-lib-example"]||[]).push([[0],{50:function(e,t,a){e.exports=a(72)},51:function(e,t,a){},71:function(e,t,a){},72:function(e,t,a){"use strict";a.r(t);a(51);var n=a(0),r=a.n(n),o=a(11),i=a.n(o),c=a(15),l=a(89),u=a(96),s=a(97),d=a(37),f=(a(66),a(67),a(38)),m=a.n(f),h=a(28),g="_3ybTi",p="_1cZp5",b="_29j6o",y=Object(l.a)((function(e){return{root:{width:"100%","& > * + *":{marginTop:e.spacing(2)}}}}));function v(e){var t=y(),a=Object(n.useState)("info"),o=a[0],i=a[1],c=Object(n.useState)(""),l=c[0],d=c[1],f=Object(n.useState)(""),m=f[0],h=f[1],g=Object(n.useState)(e.show),v=g[0],j=g[1],E=function(){var e=document.getElementById("DDAlert");e&&e.removeEventListener("dd-alert-event")},O=function(e){var t=e.detail;i(t.alert),d(t.title),h(t.message),j(!0),t.timeout>0&&setTimeout((function(){j(!1)}),t.timeout)};return Object(n.useEffect)((function(){var e=document.getElementById("DDAlert");return e&&(e.addEventListener("dd-alert-event",O),e.addEventListener("click",(function(){return j(!1)}))),E}),[]),r.a.createElement("div",{id:"DDAlert",className:p+(v?"":" "+b)},r.a.createElement("div",{className:t.root},r.a.createElement(u.a,{severity:o},r.a.createElement(s.a,null,l),r.a.createElement("div",{dangerouslySetInnerHTML:{__html:m}}))))}function j(e){var t=document.getElementById("DDAlert");t&&t.dispatchEvent(new CustomEvent(e.type,{detail:e}))}function E(e){j({type:"dd-alert-event",alert:"error",title:e.title,message:e.message,timeout:e.timeout})}function O(e){j({type:"dd-alert-event",alert:"info",title:e.title,message:e.message,timeout:e.timeout})}function C(){return(C=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}function w(e){var t=Object(n.useState)(null),a=t[0],o=t[1],i=function(t){if(e.dataPath){var a={id:t.data.id},n=t.value,r=t.colDef.field;a[r]=n,"object"===t.colDef.type&&(a[r]={id:1*n});var o="PUT";null===a.id&&(a=t.data,o="POST"),fetch(e.dataPath,{method:o,headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(a)}).then((function(e){return e.json()})).then((function(e){e.code&&e.code/100!==2?E({title:t.colDef.headerName,message:e.message}):(t.node.setData(e),t.api.refreshCells({force:!0,rowNodes:[t.node]}))})).catch((function(e){E({title:t.colDef.headerName,message:e.message||"Error on update"})}))}},c=function(t){return(t.schemes||[]).map((function(t){var a,n=(a=t.field,function(e){if(!e)return"";var t=a;return Array.isArray(e[t])?e[t].length+" element"+(e[t].length>1?"s":""):e[t]&&"object"===typeof e[t]?e[t].id:e[t]});return t.formatter=n,t.cellRenderer=function(e){return n(e.data)},e.columnMapper?e.columnMapper(t):t}))},l=function(e){var t="";if(e)for(var a in e)t=""===t?a+"="+e[a]:t+"&"+a+"="+e[a];return(""!==t?"?":"")+t},u=function(t,a,n){void 0===a&&(a=-1),void 0===n&&(n=-1);var r={};return r.page=""+a,r.perPage=""+n,function(t,a){var n=""+(e.dataSearchPath||e.dataPath),r="POST";a&&(n=""+n+l(a));e.dataSearchPath||(r="GET");var o={method:r};return"POST"===r&&(o.body=JSON.stringify(t),o.headers={"Content-Type":"application/json",Accept:"application/json"}),fetch(n,o).then((function(e){return e.json()}))}(t,r)},s=function(){return{getRows:function(t){var n=t.endRow/100,r=[],o=t.filterModel;for(var i in e.filterModel&&(o=Object.assign({},o,e.filterModel)),o)o.hasOwnProperty(i)&&r.push(i);var c={filterModel:o,sortModel:t.sortModel};(r.length||t.sortModel.length?u(c,n,100):function(t,a){void 0===t&&(t=-1),void 0===a&&(a=-1);var n=e.dataPath+"?page="+t+"&perPage="+a;return fetch(n,{headers:{Accept:"application/json"}}).then((function(e){return e.json()}))}(n,100)).then((function(e){console.log("page",e);var n=(e.page-1)*e.pageSize+(e.entities||[]).length;a&&a.setInfiniteRowCount(Math.max(n,e.totalEntityCount)),t.successCallback(e.entities||[],Math.max(n,e.totalEntityCount))})).catch((function(e){console.log(e),t.failCallback()}))}}};return Object(n.useEffect)((function(){e.columnsPath&&function(){if(a){var t=""+e.columnsPath+l();fetch(t,{headers:{Accept:"application/json"}}).then((function(e){return console.log(e),e.json()})).then((function(e){if(console.log("result",e),e.code&&e.code/100!==2)throw Error(e.message);var t=c(e);console.log("columns",t),a&&a.setColumnDefs(t)})).catch((function(e){console.log("error",e)}))}}()}),[a]),r.a.createElement("div",{className:"ag-theme-alpine",style:C({},e.style)},r.a.createElement(d.AgGridReact,{onGridReady:function(t){o(t.api),e.onGridReady&&e.onGridReady(t),t.api&&e.dataPath&&t.api.setDatasource(s())},rowData:e.rows,columnDefs:e.columns,animateRows:e.animateRows,enableCellChangeFlash:e.enableCellChangeFlash,enableColResize:e.enableColResize,rowModelType:e.rowModelType,onCellValueChanged:function(t){e.onCellValueChanged?e.onCellValueChanged(t):i(t)}}))}function M(e){var t=Object(n.useState)(null),a=t[0],o=t[1],i=Object(n.useRef)(null),c=function(){a&&a.destroy()},l=function(t){return"function"===typeof e.accumulator?e.accumulator(t):Array.isArray(t)?t.length:t},u=function(t,a){if("function"===typeof e.getLabelColor)return e.getLabelColor(t,a);if(Array.isArray(e.getLabelColor))return e.getLabelColor;if(a){var n={r:Math.ceil(255*Math.random()),g:Math.ceil(255*Math.random()),b:Math.ceil(255*Math.random()),a:.2};return t.map((function(e){return n}))}return t.map((function(e){return{r:Math.ceil(255*Math.random()),g:Math.ceil(255*Math.random()),b:Math.ceil(255*Math.random()),a:.2}}))};return Object(n.useEffect)((function(){var t=Object.assign({scales:{yAxes:[{ticks:{beginAtZero:!0}}]}},e.options||{}),a=Array.isArray(e.labelKey)?e.labelKey:[e.labelKey],n=e.data,r=a[0],s=function(t,a){if("function"===typeof e.getLabels)return e.getLabels(t);if(Array.isArray(e.getLabels))return e.getLabels;var n=h.a.groupBy(t,a);return Object.keys(n)}(n,r),d=[],f=function(t,n,o){var i=function(t,a,n){if("function"===typeof e.getData)return e.getData(t,a);if(Array.isArray(e.getData))return e.getData;var r=h.a.groupBy(t,a);return n?n.map((function(e){var t=r[e]||[];return l(t)})):Object.values(r).map(l)}(t,r,s),c=function(t){return t?t.map((function(t){return t.a=e.backgroundOpacity||.2,"rgba("+t.r+", "+t.g+", "+t.b+", "+t.a+")"})):t}(o),u=function(t){return t?t.map((function(t){return t.a=e.borderOpacity||1,"rgba("+t.r+", "+t.g+", "+t.b+", "+t.a+")"})):t}(o),d={label:(a[1]&&"string"===typeof a[1]?a[1]+" / ":"")+("string"===typeof n?n:"#"),data:i,borderWidth:e.borderWidth||1};return c&&(d.backgroundColor=c),u&&(d.borderColor=u),d};if(1===a.length){var g=u(s),p=f(n,r,g);d.push(p)}else{var b=a[1],y=h.a.groupBy(n,b);d=Object.keys(y).map((function(e){var t=u(s,e);return f(y[e],e,t)}))}console.log("--- datasets --- ",d);var v=new m.a(i.current,{type:e.type||"bar",data:{labels:s,datasets:d},options:t});return o(v),c}),[e.data]),r.a.createElement("canvas",{ref:i,height:e.height,width:e.width})}var D=function(e){var t=e.text;return r.a.createElement("div",{className:g},"Example Component: ",t)},A=a(92),S=a(94),k=a(95),P=a(43),L=a(93),R=a(27),T=a(26),N=a(31),I=(a(71),Object(l.a)((function(e){return{margin:{margin:e.spacing(1)}}}))),x=function(){var e=[{field:"col1",headerName:"Column 1",width:250},{field:"col2",headerName:"Column 2",width:150,resizable:!0}],t=[{id:1,col1:"Hello",col2:"World"},{id:2,col1:"XGrid",col2:"is Awesome"},{id:3,col1:"Material-UI",col2:"is Amazing"}],a=Object(n.useState)([]),o=Object(c.a)(a,2),i=o[0],l=o[1],u=Object(n.useState)(!0),s=Object(c.a)(u,2),d=s[0],f=s[1],m=Object(n.useState)(!0),h=Object(c.a)(m,2),g=h[0],p=h[1],b=Object(n.useState)(!0),y=Object(c.a)(b,2),E=y[0],C=y[1],x=Object(n.useState)(!0),B=Object(c.a)(x,2),G=B[0],z=B[1];Object(n.useEffect)((function(){O({title:"This is an info",message:"I'm the best for ever...",timeout:1e3}),fetch("/users.json").then((function(e){return e.json()})).then((function(e){return l(e.entities)}))}),[]);var J=Object(P.a)({palette:{primary:R.a,secondary:T.a}}),K=I();return r.a.createElement(A.a,null,r.a.createElement(v,{show:!0}),r.a.createElement(D,{text:"Djamma Dev React Library Example \ud83d\ude04"}),r.a.createElement(L.a,{theme:J},r.a.createElement(S.a,{variant:"contained",color:"secondary",className:K.margin,onClick:function(e){console.log("----"),O({title:"This is an info notification",message:"I'm the best for ever...",timeout:5e3})}},"Alert Info")),r.a.createElement(L.a,{theme:J},r.a.createElement(S.a,{variant:"contained",color:"primary",className:K.margin,onClick:function(e){var t;console.log("----"),j({type:"dd-alert-event",alert:"success",title:(t={title:"This is a success notification",message:"I'm the best for ever...",timeout:5e3}).title,message:t.message,timeout:t.timeout})}},"Alert Success")),r.a.createElement("h2",null,"Auto load data",r.a.createElement(k.a,{checked:d,value:d,onChange:function(e){return f(e.target.checked)}})),d&&r.a.createElement(w,{rowModelType:"infinite",columnsPath:"descriptions/user.json",dataPath:"users.json",columns:e,rows:t,columnMapper:function(e){var t=Object.assign({},e);return t.type={String:"text",Integer:"number",Short:"number",Long:"number",Double:"number",Date:"date",List:"array"}[t.type]||t.type,t},style:{height:300,width:"100%",marginBottom:20}}),r.a.createElement("h2",null,"Passing data from parent",r.a.createElement(k.a,{checked:g,value:g,onChange:function(e){return p(e.target.checked)}})),g&&r.a.createElement(w,{onGridReady:function(a){a.api.setRowData(t),a.api.setColumnDefs(e)},columns:e,rows:t,style:{height:300,width:"100%",marginBottom:20}}),r.a.createElement("h2",null,"Chart Js",r.a.createElement(k.a,{checked:E,value:E,onChange:function(e){return C(e.target.checked)}})),E&&r.a.createElement(M,{labelKey:"votes",getLabels:function(e){return["Red","Blue","Yellow","Green","Purple","Orange"]},getData:function(e){return[12,19,3,5,2,3]},getLabelColor:function(e){return[{r:255,g:99,b:132,a:.2},{r:54,g:162,b:235,a:.2},{r:255,g:206,b:86,a:.2},{r:75,g:192,b:192,a:.2},{r:153,g:102,b:255,a:.2},{r:255,g:159,b:64,a:.2}]},height:100,width:400}),r.a.createElement("h2",null,"Chart With Data",r.a.createElement(k.a,{checked:G,value:G,onChange:function(e){return z(e.target.checked)}})),G&&r.a.createElement(M,{type:"bar",labelKey:[function(e){return N(e.createDate).format("YYYY-MM-DD")||"Unknown"},function(e){return"MALE"===e.gender?"Male":"Female"}],backgroundOpacity:.4,borderOpacity:1,borderWidth:1,data:i,height:200,width:400}))};i.a.render(r.a.createElement(x,null),document.getElementById("root"))}},[[50,1,2]]]);
//# sourceMappingURL=main.19809247.chunk.js.map