import{j as w,F as ce,a as h,i as _,g as tt,h as rt,r as P,k as R,L as me}from"./vendor.9eb6cf8c.js";import{c as A,I as z,a as nt,r as it,b as at,e as ot,g as st,s as lt,u as Le,d as Me,h as ct,i as ut,l as ft,S as dt}from"./index.63c18d6c.js";function Br({children:e,page:t,setPage:r,isPreviousData:n}){return w(ce,{children:[e,w("div",{className:"flex justify-between items-center",children:[h("button",{className:"btn btn-accent",onClick:()=>{r(s=>Math.max(s-1,0)),window.scrollTo({top:0})},disabled:t===1,children:"Previous"}),h("p",{children:t}),h("button",{className:"btn btn-accent",onClick:()=>{n||(r(s=>s+1),window.scrollTo({top:0}))},disabled:n,children:"Next"})]})]})}const Vr=(e=1,t=5)=>_(["mainFeed",e],()=>{let n="/tweet/myfeed";return n+="?page="+e,n+="&limit="+t,A(n)},{keepPreviousData:!0});function Ur(e){return _(["fetchProfileOf",e],()=>A("/follow/"+e))}function Gr(){return _(["recommendedUsers"],()=>A("/follow/recommendations"))}function Xr(e,t,r,n,s,u){return _(["fetchTweetsOf",{handle:e,withReplies:t,onlyMedia:r,likedTweets:n,page:s,limit:u}],()=>{let a=`/tweet/user/${e}?page=${s||1}&limit=${u||20}`;return t&&(a+="&replies=1"),r&&(a+="&media=1"),n&&(a=`/tweet/favorites/${e}?page=${s||1}&limit=${u||20}`),A(a)},{keepPreviousData:!0})}function Wr(e,t=1,r=20){return _(["savedTweets",e,t,r],()=>{let s=`/tweet/saves?page=${t}&limit=${r}`;switch(e){case"tweets":break;case"replies":s+="&replies=1";break;case"media":s+="&media=1";break;case"likes":s+="&likes=1"}return A(s)},{keepPreviousData:!0})}function Yr({page:e=1,limit:t=20,searchTerm:r=""}){return _(["searchPeople",r,e,t],()=>{let s=`/user/search?page=${e}&limit=${t}`;return r&&(s+=`&search=${r}`),A(s)},{keepPreviousData:!0})}function Qr({searchType:e="top",page:t=1,limit:r=20,searchTerm:n=""}){return _(["searchTweets",e,n,t,r],()=>{let u="/tweet/search/";switch(e){case"latest":u+="latest";break;case"top":u+="top";break;case"media":u+="media"}return u+=`?page=${t}&limit=${r}`,n&&(u+=`&search=${n}`),A(u)},{keepPreviousData:!0})}function Zr(){const e=tt();return rt(r=>A("/tweet","post",r),{onSuccess:()=>{e.invalidateQueries("mainFeed")}})}function Jr(){return _("trends",()=>A("/tweet/trends"))}function Kr(e,t=1,r=20){return _(["tweetsByHashtag",e,t,r],()=>A(`/tweet/hashtag/${e}?page=${t}&limit=${r}`),{keepPreviousData:!0})}function pt(e){return h(z,{...e,children:h("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"})})}function je(e){return h(z,{...e,children:h("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"})})}function ht(e){return h(z,{...e,children:h("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"})})}function Fe(e){return h(z,{...e,children:h("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"})})}function mt(e){return h(z,{...e,children:h("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"})})}function vt(e){const[t,r]=P.exports.useState(e.retweeted),[n,s]=P.exports.useState(e.liked),[u,d]=P.exports.useState(e.saved);return w("div",{className:"grid grid-cols-4 gap-4 text-sm tweet-actions",children:[w("div",{className:"flex gap-1 justify-center items-center py-2 cursor-pointer comment hover:bg-base-300",children:[h(ht,{}),h("span",{children:"Comment"})]}),w("div",{className:`comment flex items-center justify-center gap-1 py-2 cursor-pointer hover:bg-base-300 ${t?"text-green-500":""}`,onClick:()=>(t?nt:it)(String(e.id)).then(m=>{r(T=>!T),console.log(m)}).catch(m=>console.log(m)),children:[h(je,{}),h("span",{children:t?"Retweeted":"Retweet"})]}),w("div",{className:`comment flex items-center justify-center gap-1 py-2 cursor-pointer hover:bg-base-300 ${n?"text-red-500":""}`,onClick:()=>{(n?at:ot)(String(e.id)).then(m=>{s(T=>!T),console.log(m)}).catch(m=>console.log(m))},children:[h(Fe,{}),h("span",{children:n?"Liked":"Like"})]}),w("div",{className:`comment flex items-center justify-center gap-1 py-2 cursor-pointer hover:bg-base-300 ${u?"text-blue-500":""}`,onClick:()=>{(u?st:lt)(String(e.id)).then(m=>{d(T=>!T),console.log(m)}).catch(m=>console.log(m))},children:[h(mt,{}),h("span",{children:u?"Saved":"Save"})]})]})}function gt({comments:e=[],commentLikeOrUnlike:t}){const{state:{user:r}}=Le();return h("div",{className:"m-2 comments",children:e.length?e.map(n=>h(yt,{comment:n,viewerId:r.id,commentLikeOrUnlike:t},n.id)):null})}function yt({comment:e,viewerId:t,commentLikeOrUnlike:r}){const n=P.exports.useMemo(()=>e.likedByUsers.findIndex(u=>u.id===t)>-1,[e.likedByUsers,t]);return w("div",{className:"flex gap-2 items-start mb-4 reply-wrapper",children:[h("div",{className:"overflow-hidden m-2 h-10 rounded-lg avatar",children:h("img",{src:e.author.avatar||Me,alt:"avatar"})}),w("div",{className:"p-1 w-full reply",children:[w("div",{className:"rounded reply-text bg-base-200",children:[w("div",{className:"flex gap-8 items-center",children:[h("span",{className:"font-medium custom-title",children:e.author.name}),h("span",{className:"text-sm text-base-content/70",children:new Date(e.createdAt).toLocaleDateString()})]}),h("div",{children:e.text})]}),w("div",{className:"flex gap-4 text-xs likes",children:[w("span",{className:`flex items-center gap-1 ${n?"text-red-500":""}`,onClick:()=>r(e.id,n),children:[h(Fe,{size:12})," ",n?" Liked":" Like"]}),w("span",{children:[e.likedByUsers.length," Likes"]})]})]})]},e.id)}var j={exports:{}},N={},X={},bt=0;X.SAME=bt;var xt=1;X.CAMELCASE=xt;X.possibleStandardNames={accept:0,acceptCharset:1,"accept-charset":"acceptCharset",accessKey:1,action:0,allowFullScreen:1,alt:0,as:0,async:0,autoCapitalize:1,autoComplete:1,autoCorrect:1,autoFocus:1,autoPlay:1,autoSave:1,capture:0,cellPadding:1,cellSpacing:1,challenge:0,charSet:1,checked:0,children:0,cite:0,class:"className",classID:1,className:1,cols:0,colSpan:1,content:0,contentEditable:1,contextMenu:1,controls:0,controlsList:1,coords:0,crossOrigin:1,dangerouslySetInnerHTML:1,data:0,dateTime:1,default:0,defaultChecked:1,defaultValue:1,defer:0,dir:0,disabled:0,disablePictureInPicture:1,disableRemotePlayback:1,download:0,draggable:0,encType:1,enterKeyHint:1,for:"htmlFor",form:0,formMethod:1,formAction:1,formEncType:1,formNoValidate:1,formTarget:1,frameBorder:1,headers:0,height:0,hidden:0,high:0,href:0,hrefLang:1,htmlFor:1,httpEquiv:1,"http-equiv":"httpEquiv",icon:0,id:0,innerHTML:1,inputMode:1,integrity:0,is:0,itemID:1,itemProp:1,itemRef:1,itemScope:1,itemType:1,keyParams:1,keyType:1,kind:0,label:0,lang:0,list:0,loop:0,low:0,manifest:0,marginWidth:1,marginHeight:1,max:0,maxLength:1,media:0,mediaGroup:1,method:0,min:0,minLength:1,multiple:0,muted:0,name:0,noModule:1,nonce:0,noValidate:1,open:0,optimum:0,pattern:0,placeholder:0,playsInline:1,poster:0,preload:0,profile:0,radioGroup:1,readOnly:1,referrerPolicy:1,rel:0,required:0,reversed:0,role:0,rows:0,rowSpan:1,sandbox:0,scope:0,scoped:0,scrolling:0,seamless:0,selected:0,shape:0,size:0,sizes:0,span:0,spellCheck:1,src:0,srcDoc:1,srcLang:1,srcSet:1,start:0,step:0,style:0,summary:0,tabIndex:1,target:0,title:0,type:0,useMap:1,value:0,width:0,wmode:0,wrap:0,about:0,accentHeight:1,"accent-height":"accentHeight",accumulate:0,additive:0,alignmentBaseline:1,"alignment-baseline":"alignmentBaseline",allowReorder:1,alphabetic:0,amplitude:0,arabicForm:1,"arabic-form":"arabicForm",ascent:0,attributeName:1,attributeType:1,autoReverse:1,azimuth:0,baseFrequency:1,baselineShift:1,"baseline-shift":"baselineShift",baseProfile:1,bbox:0,begin:0,bias:0,by:0,calcMode:1,capHeight:1,"cap-height":"capHeight",clip:0,clipPath:1,"clip-path":"clipPath",clipPathUnits:1,clipRule:1,"clip-rule":"clipRule",color:0,colorInterpolation:1,"color-interpolation":"colorInterpolation",colorInterpolationFilters:1,"color-interpolation-filters":"colorInterpolationFilters",colorProfile:1,"color-profile":"colorProfile",colorRendering:1,"color-rendering":"colorRendering",contentScriptType:1,contentStyleType:1,cursor:0,cx:0,cy:0,d:0,datatype:0,decelerate:0,descent:0,diffuseConstant:1,direction:0,display:0,divisor:0,dominantBaseline:1,"dominant-baseline":"dominantBaseline",dur:0,dx:0,dy:0,edgeMode:1,elevation:0,enableBackground:1,"enable-background":"enableBackground",end:0,exponent:0,externalResourcesRequired:1,fill:0,fillOpacity:1,"fill-opacity":"fillOpacity",fillRule:1,"fill-rule":"fillRule",filter:0,filterRes:1,filterUnits:1,floodOpacity:1,"flood-opacity":"floodOpacity",floodColor:1,"flood-color":"floodColor",focusable:0,fontFamily:1,"font-family":"fontFamily",fontSize:1,"font-size":"fontSize",fontSizeAdjust:1,"font-size-adjust":"fontSizeAdjust",fontStretch:1,"font-stretch":"fontStretch",fontStyle:1,"font-style":"fontStyle",fontVariant:1,"font-variant":"fontVariant",fontWeight:1,"font-weight":"fontWeight",format:0,from:0,fx:0,fy:0,g1:0,g2:0,glyphName:1,"glyph-name":"glyphName",glyphOrientationHorizontal:1,"glyph-orientation-horizontal":"glyphOrientationHorizontal",glyphOrientationVertical:1,"glyph-orientation-vertical":"glyphOrientationVertical",glyphRef:1,gradientTransform:1,gradientUnits:1,hanging:0,horizAdvX:1,"horiz-adv-x":"horizAdvX",horizOriginX:1,"horiz-origin-x":"horizOriginX",ideographic:0,imageRendering:1,"image-rendering":"imageRendering",in2:0,in:0,inlist:0,intercept:0,k1:0,k2:0,k3:0,k4:0,k:0,kernelMatrix:1,kernelUnitLength:1,kerning:0,keyPoints:1,keySplines:1,keyTimes:1,lengthAdjust:1,letterSpacing:1,"letter-spacing":"letterSpacing",lightingColor:1,"lighting-color":"lightingColor",limitingConeAngle:1,local:0,markerEnd:1,"marker-end":"markerEnd",markerHeight:1,markerMid:1,"marker-mid":"markerMid",markerStart:1,"marker-start":"markerStart",markerUnits:1,markerWidth:1,mask:0,maskContentUnits:1,maskUnits:1,mathematical:0,mode:0,numOctaves:1,offset:0,opacity:0,operator:0,order:0,orient:0,orientation:0,origin:0,overflow:0,overlinePosition:1,"overline-position":"overlinePosition",overlineThickness:1,"overline-thickness":"overlineThickness",paintOrder:1,"paint-order":"paintOrder",panose1:0,"panose-1":"panose1",pathLength:1,patternContentUnits:1,patternTransform:1,patternUnits:1,pointerEvents:1,"pointer-events":"pointerEvents",points:0,pointsAtX:1,pointsAtY:1,pointsAtZ:1,prefix:0,preserveAlpha:1,preserveAspectRatio:1,primitiveUnits:1,property:0,r:0,radius:0,refX:1,refY:1,renderingIntent:1,"rendering-intent":"renderingIntent",repeatCount:1,repeatDur:1,requiredExtensions:1,requiredFeatures:1,resource:0,restart:0,result:0,results:0,rotate:0,rx:0,ry:0,scale:0,security:0,seed:0,shapeRendering:1,"shape-rendering":"shapeRendering",slope:0,spacing:0,specularConstant:1,specularExponent:1,speed:0,spreadMethod:1,startOffset:1,stdDeviation:1,stemh:0,stemv:0,stitchTiles:1,stopColor:1,"stop-color":"stopColor",stopOpacity:1,"stop-opacity":"stopOpacity",strikethroughPosition:1,"strikethrough-position":"strikethroughPosition",strikethroughThickness:1,"strikethrough-thickness":"strikethroughThickness",string:0,stroke:0,strokeDasharray:1,"stroke-dasharray":"strokeDasharray",strokeDashoffset:1,"stroke-dashoffset":"strokeDashoffset",strokeLinecap:1,"stroke-linecap":"strokeLinecap",strokeLinejoin:1,"stroke-linejoin":"strokeLinejoin",strokeMiterlimit:1,"stroke-miterlimit":"strokeMiterlimit",strokeWidth:1,"stroke-width":"strokeWidth",strokeOpacity:1,"stroke-opacity":"strokeOpacity",suppressContentEditableWarning:1,suppressHydrationWarning:1,surfaceScale:1,systemLanguage:1,tableValues:1,targetX:1,targetY:1,textAnchor:1,"text-anchor":"textAnchor",textDecoration:1,"text-decoration":"textDecoration",textLength:1,textRendering:1,"text-rendering":"textRendering",to:0,transform:0,typeof:0,u1:0,u2:0,underlinePosition:1,"underline-position":"underlinePosition",underlineThickness:1,"underline-thickness":"underlineThickness",unicode:0,unicodeBidi:1,"unicode-bidi":"unicodeBidi",unicodeRange:1,"unicode-range":"unicodeRange",unitsPerEm:1,"units-per-em":"unitsPerEm",unselectable:0,vAlphabetic:1,"v-alphabetic":"vAlphabetic",values:0,vectorEffect:1,"vector-effect":"vectorEffect",version:0,vertAdvY:1,"vert-adv-y":"vertAdvY",vertOriginX:1,"vert-origin-x":"vertOriginX",vertOriginY:1,"vert-origin-y":"vertOriginY",vHanging:1,"v-hanging":"vHanging",vIdeographic:1,"v-ideographic":"vIdeographic",viewBox:1,viewTarget:1,visibility:0,vMathematical:1,"v-mathematical":"vMathematical",vocab:0,widths:0,wordSpacing:1,"word-spacing":"wordSpacing",writingMode:1,"writing-mode":"writingMode",x1:0,x2:0,x:0,xChannelSelector:1,xHeight:1,"x-height":"xHeight",xlinkActuate:1,"xlink:actuate":"xlinkActuate",xlinkArcrole:1,"xlink:arcrole":"xlinkArcrole",xlinkHref:1,"xlink:href":"xlinkHref",xlinkRole:1,"xlink:role":"xlinkRole",xlinkShow:1,"xlink:show":"xlinkShow",xlinkTitle:1,"xlink:title":"xlinkTitle",xlinkType:1,"xlink:type":"xlinkType",xmlBase:1,"xml:base":"xmlBase",xmlLang:1,"xml:lang":"xmlLang",xmlns:0,"xml:space":"xmlSpace",xmlnsXlink:1,"xmlns:xlink":"xmlnsXlink",xmlSpace:1,y1:0,y2:0,y:0,yChannelSelector:1,z:0,zoomAndPan:1};Object.defineProperty(N,"__esModule",{value:!0});function wt(e,t){return Tt(e)||Et(e,t)||kt(e,t)||St()}function Tt(e){if(Array.isArray(e))return e}function Et(e,t){var r=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(r!=null){var n=[],s=!0,u=!1,d,a;try{for(r=r.call(e);!(s=(d=r.next()).done)&&(n.push(d.value),!(t&&n.length===t));s=!0);}catch(o){u=!0,a=o}finally{try{!s&&r.return!=null&&r.return()}finally{if(u)throw a}}return n}}function kt(e,t){if(!!e){if(typeof e=="string")return ve(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);if(r==="Object"&&e.constructor&&(r=e.constructor.name),r==="Map"||r==="Set")return Array.from(e);if(r==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return ve(e,t)}}function ve(e,t){(t==null||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function St(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var He=0,L=1,W=2,Y=3,ue=4,$e=5,ze=6;function Ct(e){return k.hasOwnProperty(e)?k[e]:null}function S(e,t,r,n,s,u,d){this.acceptsBooleans=t===W||t===Y||t===ue,this.attributeName=n,this.attributeNamespace=s,this.mustUseProperty=r,this.propertyName=e,this.type=t,this.sanitizeURL=u,this.removeEmptyString=d}var k={},Nt=["children","dangerouslySetInnerHTML","defaultValue","defaultChecked","innerHTML","suppressContentEditableWarning","suppressHydrationWarning","style"];Nt.forEach(function(e){k[e]=new S(e,He,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=wt(e,2),r=t[0],n=t[1];k[r]=new S(r,L,!1,n,null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){k[e]=new S(e,W,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){k[e]=new S(e,W,!1,e,null,!1,!1)});["allowFullScreen","async","autoFocus","autoPlay","controls","default","defer","disabled","disablePictureInPicture","disableRemotePlayback","formNoValidate","hidden","loop","noModule","noValidate","open","playsInline","readOnly","required","reversed","scoped","seamless","itemScope"].forEach(function(e){k[e]=new S(e,Y,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){k[e]=new S(e,Y,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){k[e]=new S(e,ue,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){k[e]=new S(e,ze,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){k[e]=new S(e,$e,!1,e.toLowerCase(),null,!1,!1)});var fe=/[\-\:]([a-z])/g,de=function(t){return t[1].toUpperCase()};["accent-height","alignment-baseline","arabic-form","baseline-shift","cap-height","clip-path","clip-rule","color-interpolation","color-interpolation-filters","color-profile","color-rendering","dominant-baseline","enable-background","fill-opacity","fill-rule","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","glyph-name","glyph-orientation-horizontal","glyph-orientation-vertical","horiz-adv-x","horiz-origin-x","image-rendering","letter-spacing","lighting-color","marker-end","marker-mid","marker-start","overline-position","overline-thickness","paint-order","panose-1","pointer-events","rendering-intent","shape-rendering","stop-color","stop-opacity","strikethrough-position","strikethrough-thickness","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke-width","text-anchor","text-decoration","text-rendering","underline-position","underline-thickness","unicode-bidi","unicode-range","units-per-em","v-alphabetic","v-hanging","v-ideographic","v-mathematical","vector-effect","vert-adv-y","vert-origin-x","vert-origin-y","word-spacing","writing-mode","xmlns:xlink","x-height"].forEach(function(e){var t=e.replace(fe,de);k[t]=new S(t,L,!1,e,null,!1,!1)});["xlink:actuate","xlink:arcrole","xlink:role","xlink:show","xlink:title","xlink:type"].forEach(function(e){var t=e.replace(fe,de);k[t]=new S(t,L,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(fe,de);k[t]=new S(t,L,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){k[e]=new S(e,L,!1,e.toLowerCase(),null,!1,!1)});var Ot="xlinkHref";k[Ot]=new S("xlinkHref",L,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){k[e]=new S(e,L,!1,e.toLowerCase(),null,!0,!0)});var pe=X,Rt=pe.CAMELCASE,At=pe.SAME,ge=pe.possibleStandardNames,Pt=":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD",_t=Pt+"\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040",It=RegExp.prototype.test.bind(new RegExp("^(data|aria)-["+_t+"]*$")),Dt=Object.keys(ge).reduce(function(e,t){var r=ge[t];return r===At?e[t]=t:r===Rt?e[t.toLowerCase()]=t:e[t]=r,e},{});N.BOOLEAN=Y;N.BOOLEANISH_STRING=W;N.NUMERIC=$e;N.OVERLOADED_BOOLEAN=ue;N.POSITIVE_NUMERIC=ze;N.RESERVED=He;N.STRING=L;N.getPropertyInfo=Ct;N.isCustomAttribute=It;N.possibleStandardNames=Dt;var qe={},ye=/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,Lt=/\n/g,Mt=/^\s*/,jt=/^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/,Ft=/^:\s*/,Ht=/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/,$t=/^[;\s]*/,zt=/^\s+|\s+$/g,qt=`
`,be="/",xe="*",M="",Bt="comment",Vt="declaration",Ut=function(e,t){if(typeof e!="string")throw new TypeError("First argument must be a string");if(!e)return[];t=t||{};var r=1,n=1;function s(v){var p=v.match(Lt);p&&(r+=p.length);var E=v.lastIndexOf(qt);n=~E?v.length-E:n+v.length}function u(){var v={line:r,column:n};return function(p){return p.position=new d(v),f(),p}}function d(v){this.start=v,this.end={line:r,column:n},this.source=t.source}d.prototype.content=e;function a(v){var p=new Error(t.source+":"+r+":"+n+": "+v);if(p.reason=v,p.filename=t.source,p.line=r,p.column=n,p.source=e,!t.silent)throw p}function o(v){var p=v.exec(e);if(!!p){var E=p[0];return s(E),e=e.slice(E.length),p}}function f(){o(Mt)}function g(v){var p;for(v=v||[];p=m();)p!==!1&&v.push(p);return v}function m(){var v=u();if(!(be!=e.charAt(0)||xe!=e.charAt(1))){for(var p=2;M!=e.charAt(p)&&(xe!=e.charAt(p)||be!=e.charAt(p+1));)++p;if(p+=2,M===e.charAt(p-1))return a("End of comment missing");var E=e.slice(2,p-2);return n+=2,s(E),e=e.slice(p),n+=2,v({type:Bt,comment:E})}}function T(){var v=u(),p=o(jt);if(!!p){if(m(),!o(Ft))return a("property missing ':'");var E=o(Ht),I=v({type:Vt,property:we(p[0].replace(ye,M)),value:E?we(E[0].replace(ye,M)):M});return o($t),I}}function O(){var v=[];g(v);for(var p;p=T();)p!==!1&&(v.push(p),g(v));return v}return f(),O()};function we(e){return e?e.replace(zt,M):M}var Gt=Ut;function Xt(e,t){var r=null;if(!e||typeof e!="string")return r;for(var n,s=Gt(e),u=typeof t=="function",d,a,o=0,f=s.length;o<f;o++)n=s[o],d=n.property,a=n.value,u?t(d,a,n):a&&(r||(r={}),r[d]=a);return r}var Wt=Xt,Q={};Q.__esModule=!0;Q.camelCase=void 0;var Yt=/^--[a-zA-Z0-9-]+$/,Qt=/-([a-z])/g,Zt=/^[^-]+$/,Jt=/^-(webkit|moz|ms|o|khtml)-/,Kt=/^-(ms)-/,er=function(e){return!e||Zt.test(e)||Yt.test(e)},tr=function(e,t){return t.toUpperCase()},Te=function(e,t){return"".concat(t,"-")},rr=function(e,t){return t===void 0&&(t={}),er(e)?e:(e=e.toLowerCase(),t.reactCompat?e=e.replace(Kt,Te):e=e.replace(Jt,Te),e.replace(Qt,tr))};Q.camelCase=rr;(function(e){var t=R&&R.__importDefault||function(u){return u&&u.__esModule?u:{default:u}};e.__esModule=!0;var r=t(Wt),n=Q;function s(u,d){var a={};return!u||typeof u!="string"||(0,r.default)(u,function(o,f){o&&f&&(a[(0,n.camelCase)(o,d)]=f)}),a}e.default=s})(qe);var nr=P.exports,ir=qe.default;function ar(e,t){if(!e||typeof e!="object")throw new TypeError("First argument must be an object");var r,n,s=typeof t=="function",u={},d={};for(r in e){if(n=e[r],s&&(u=t(r,n),u&&u.length===2)){d[u[0]]=u[1];continue}typeof n=="string"&&(d[n]=r)}return d}function or(e,t){if(e.indexOf("-")===-1)return t&&typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var sr={reactCompat:!0};function lr(e,t){if(e!=null)try{t.style=ir(e,sr)}catch{t.style={}}}var cr=nr.version.split(".")[0]>=16,Be=new Set(["tr","tbody","thead","tfoot","colgroup","table","head","html","frameset"]);function ur(e){return!Be.has(e.name)}var Ve={PRESERVE_CUSTOM_ATTRIBUTES:cr,invertObject:ar,isCustomComponent:or,setStyleProp:lr,canTextBeChildOfNode:ur,elementsWithNoTextChildren:Be},$=N,Ee=Ve,Ue=function(t){t=t||{};var r={reset:!0,submit:!0},n,s,u,d,a,o={},f=t.type&&r[t.type];for(n in t){if(u=t[n],$.isCustomAttribute(n)){o[n]=u;continue}if(s=n.toLowerCase(),d=ke(s),d){switch(a=$.getPropertyInfo(d),(d==="checked"||d==="value")&&!f&&(d=ke("default"+s)),o[d]=u,a&&a.type){case $.BOOLEAN:o[d]=!0;break;case $.OVERLOADED_BOOLEAN:u===""&&(o[d]=!0);break}continue}Ee.PRESERVE_CUSTOM_ATTRIBUTES&&(o[n]=u)}return Ee.setStyleProp(t.style,o),o};function ke(e){return $.possibleStandardNames[e]}var fr=P.exports,dr=Ue,U=Ve,pr=U.setStyleProp,hr=U.canTextBeChildOfNode;function Ge(e,t){t=t||{};for(var r=t.library||fr,n=r.cloneElement,s=r.createElement,u=r.isValidElement,d=[],a,o,f=typeof t.replace=="function",g,m,T,O=t.trim,v=0,p=e.length;v<p;v++){if(a=e[v],f&&(g=t.replace(a),u(g))){p>1&&(g=n(g,{key:g.key||v})),d.push(g);continue}if(a.type==="text"){if(o=!a.data.trim().length,o&&a.parent&&!hr(a.parent)||O&&o)continue;d.push(a.data);continue}switch(m=a.attribs,mr(a)?pr(m.style,m):m&&(m=dr(m)),T=null,a.type){case"script":case"style":a.children[0]&&(m.dangerouslySetInnerHTML={__html:a.children[0].data});break;case"tag":a.name==="textarea"&&a.children[0]?m.defaultValue=a.children[0].data:a.children&&a.children.length&&(T=Ge(a.children,t));break;default:continue}p>1&&(m.key=v),d.push(s(a.name,m,T))}return d.length===1?d[0]:d}function mr(e){return U.PRESERVE_CUSTOM_ATTRIBUTES&&e.type==="tag"&&U.isCustomComponent(e.name,e.attribs)}var vr=Ge,Se="html",Ce="head",B="body",gr=/<([a-zA-Z]+[0-9]?)/,Ne=/<head[^]*>/i,Oe=/<body[^]*>/i,G=function(){throw new Error("This browser does not support `document.implementation.createHTMLDocument`")},se=function(){throw new Error("This browser does not support `DOMParser.prototype.parseFromString`")},Re=typeof window=="object"&&window.DOMParser;if(typeof Re=="function"){var yr=new Re,br="text/html";se=function(e,t){return t&&(e="<"+t+">"+e+"</"+t+">"),yr.parseFromString(e,br)},G=se}if(typeof document=="object"&&document.implementation){var V=document.implementation.createHTMLDocument();G=function(e,t){if(t){var r=V.documentElement.querySelector(t);return r.innerHTML=e,V}return V.documentElement.innerHTML=e,V}}var re=typeof document=="object"?document.createElement("template"):{},le;re.content&&(le=function(e){return re.innerHTML=e,re.content.childNodes});function xr(e){var t,r=e.match(gr);r&&r[1]&&(t=r[1].toLowerCase());var n,s,u;switch(t){case Se:return n=se(e),Ne.test(e)||(s=n.querySelector(Ce),s&&s.parentNode.removeChild(s)),Oe.test(e)||(s=n.querySelector(B),s&&s.parentNode.removeChild(s)),n.querySelectorAll(Se);case Ce:case B:return n=G(e),u=n.querySelectorAll(t),Oe.test(e)&&Ne.test(e)?u[0].parentNode.childNodes:u;default:return le?le(e):(s=G(e,B).querySelector(B),s.childNodes)}}var wr=xr,he={},ne={},ie={},Ae;function Xe(){return Ae||(Ae=1,function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.Doctype=e.CDATA=e.Tag=e.Style=e.Script=e.Comment=e.Directive=e.Text=e.Root=e.isTag=e.ElementType=void 0;var t;(function(n){n.Root="root",n.Text="text",n.Directive="directive",n.Comment="comment",n.Script="script",n.Style="style",n.Tag="tag",n.CDATA="cdata",n.Doctype="doctype"})(t=e.ElementType||(e.ElementType={}));function r(n){return n.type===t.Tag||n.type===t.Script||n.type===t.Style}e.isTag=r,e.Root=t.Root,e.Text=t.Text,e.Directive=t.Directive,e.Comment=t.Comment,e.Script=t.Script,e.Style=t.Style,e.Tag=t.Tag,e.CDATA=t.CDATA,e.Doctype=t.Doctype}(ie)),ie}var y={},Pe;function _e(){if(Pe)return y;Pe=1;var e=R&&R.__extends||function(){var i=function(l,c){return i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(b,x){b.__proto__=x}||function(b,x){for(var C in x)Object.prototype.hasOwnProperty.call(x,C)&&(b[C]=x[C])},i(l,c)};return function(l,c){if(typeof c!="function"&&c!==null)throw new TypeError("Class extends value "+String(c)+" is not a constructor or null");i(l,c);function b(){this.constructor=l}l.prototype=c===null?Object.create(c):(b.prototype=c.prototype,new b)}}(),t=R&&R.__assign||function(){return t=Object.assign||function(i){for(var l,c=1,b=arguments.length;c<b;c++){l=arguments[c];for(var x in l)Object.prototype.hasOwnProperty.call(l,x)&&(i[x]=l[x])}return i},t.apply(this,arguments)};Object.defineProperty(y,"__esModule",{value:!0}),y.cloneNode=y.hasChildren=y.isDocument=y.isDirective=y.isComment=y.isText=y.isCDATA=y.isTag=y.Element=y.Document=y.CDATA=y.NodeWithChildren=y.ProcessingInstruction=y.Comment=y.Text=y.DataNode=y.Node=void 0;var r=Xe(),n=function(){function i(){this.parent=null,this.prev=null,this.next=null,this.startIndex=null,this.endIndex=null}return Object.defineProperty(i.prototype,"parentNode",{get:function(){return this.parent},set:function(l){this.parent=l},enumerable:!1,configurable:!0}),Object.defineProperty(i.prototype,"previousSibling",{get:function(){return this.prev},set:function(l){this.prev=l},enumerable:!1,configurable:!0}),Object.defineProperty(i.prototype,"nextSibling",{get:function(){return this.next},set:function(l){this.next=l},enumerable:!1,configurable:!0}),i.prototype.cloneNode=function(l){return l===void 0&&(l=!1),K(this,l)},i}();y.Node=n;var s=function(i){e(l,i);function l(c){var b=i.call(this)||this;return b.data=c,b}return Object.defineProperty(l.prototype,"nodeValue",{get:function(){return this.data},set:function(c){this.data=c},enumerable:!1,configurable:!0}),l}(n);y.DataNode=s;var u=function(i){e(l,i);function l(){var c=i!==null&&i.apply(this,arguments)||this;return c.type=r.ElementType.Text,c}return Object.defineProperty(l.prototype,"nodeType",{get:function(){return 3},enumerable:!1,configurable:!0}),l}(s);y.Text=u;var d=function(i){e(l,i);function l(){var c=i!==null&&i.apply(this,arguments)||this;return c.type=r.ElementType.Comment,c}return Object.defineProperty(l.prototype,"nodeType",{get:function(){return 8},enumerable:!1,configurable:!0}),l}(s);y.Comment=d;var a=function(i){e(l,i);function l(c,b){var x=i.call(this,b)||this;return x.name=c,x.type=r.ElementType.Directive,x}return Object.defineProperty(l.prototype,"nodeType",{get:function(){return 1},enumerable:!1,configurable:!0}),l}(s);y.ProcessingInstruction=a;var o=function(i){e(l,i);function l(c){var b=i.call(this)||this;return b.children=c,b}return Object.defineProperty(l.prototype,"firstChild",{get:function(){var c;return(c=this.children[0])!==null&&c!==void 0?c:null},enumerable:!1,configurable:!0}),Object.defineProperty(l.prototype,"lastChild",{get:function(){return this.children.length>0?this.children[this.children.length-1]:null},enumerable:!1,configurable:!0}),Object.defineProperty(l.prototype,"childNodes",{get:function(){return this.children},set:function(c){this.children=c},enumerable:!1,configurable:!0}),l}(n);y.NodeWithChildren=o;var f=function(i){e(l,i);function l(){var c=i!==null&&i.apply(this,arguments)||this;return c.type=r.ElementType.CDATA,c}return Object.defineProperty(l.prototype,"nodeType",{get:function(){return 4},enumerable:!1,configurable:!0}),l}(o);y.CDATA=f;var g=function(i){e(l,i);function l(){var c=i!==null&&i.apply(this,arguments)||this;return c.type=r.ElementType.Root,c}return Object.defineProperty(l.prototype,"nodeType",{get:function(){return 9},enumerable:!1,configurable:!0}),l}(o);y.Document=g;var m=function(i){e(l,i);function l(c,b,x,C){x===void 0&&(x=[]),C===void 0&&(C=c==="script"?r.ElementType.Script:c==="style"?r.ElementType.Style:r.ElementType.Tag);var D=i.call(this,x)||this;return D.name=c,D.attribs=b,D.type=C,D}return Object.defineProperty(l.prototype,"nodeType",{get:function(){return 1},enumerable:!1,configurable:!0}),Object.defineProperty(l.prototype,"tagName",{get:function(){return this.name},set:function(c){this.name=c},enumerable:!1,configurable:!0}),Object.defineProperty(l.prototype,"attributes",{get:function(){var c=this;return Object.keys(this.attribs).map(function(b){var x,C;return{name:b,value:c.attribs[b],namespace:(x=c["x-attribsNamespace"])===null||x===void 0?void 0:x[b],prefix:(C=c["x-attribsPrefix"])===null||C===void 0?void 0:C[b]}})},enumerable:!1,configurable:!0}),l}(o);y.Element=m;function T(i){return(0,r.isTag)(i)}y.isTag=T;function O(i){return i.type===r.ElementType.CDATA}y.isCDATA=O;function v(i){return i.type===r.ElementType.Text}y.isText=v;function p(i){return i.type===r.ElementType.Comment}y.isComment=p;function E(i){return i.type===r.ElementType.Directive}y.isDirective=E;function I(i){return i.type===r.ElementType.Root}y.isDocument=I;function J(i){return Object.prototype.hasOwnProperty.call(i,"children")}y.hasChildren=J;function K(i,l){l===void 0&&(l=!1);var c;if(v(i))c=new u(i.data);else if(p(i))c=new d(i.data);else if(T(i)){var b=l?ee(i.children):[],x=new m(i.name,t({},i.attribs),b);b.forEach(function(et){return et.parent=x}),i.namespace!=null&&(x.namespace=i.namespace),i["x-attribsNamespace"]&&(x["x-attribsNamespace"]=t({},i["x-attribsNamespace"])),i["x-attribsPrefix"]&&(x["x-attribsPrefix"]=t({},i["x-attribsPrefix"])),c=x}else if(O(i)){var b=l?ee(i.children):[],C=new f(b);b.forEach(function(te){return te.parent=C}),c=C}else if(I(i)){var b=l?ee(i.children):[],D=new g(b);b.forEach(function(te){return te.parent=D}),i["x-mode"]&&(D["x-mode"]=i["x-mode"]),c=D}else if(E(i)){var q=new a(i.name,i.data);i["x-name"]!=null&&(q["x-name"]=i["x-name"],q["x-publicId"]=i["x-publicId"],q["x-systemId"]=i["x-systemId"]),c=q}else throw new Error("Not implemented yet: ".concat(i.type));return c.startIndex=i.startIndex,c.endIndex=i.endIndex,i.sourceCodeLocation!=null&&(c.sourceCodeLocation=i.sourceCodeLocation),c}y.cloneNode=K;function ee(i){for(var l=i.map(function(b){return K(b,!0)}),c=1;c<l.length;c++)l[c].prev=l[c-1],l[c-1].next=l[c];return l}return y}var Ie;function We(){return Ie||(Ie=1,function(e){var t=R&&R.__createBinding||(Object.create?function(a,o,f,g){g===void 0&&(g=f);var m=Object.getOwnPropertyDescriptor(o,f);(!m||("get"in m?!o.__esModule:m.writable||m.configurable))&&(m={enumerable:!0,get:function(){return o[f]}}),Object.defineProperty(a,g,m)}:function(a,o,f,g){g===void 0&&(g=f),a[g]=o[f]}),r=R&&R.__exportStar||function(a,o){for(var f in a)f!=="default"&&!Object.prototype.hasOwnProperty.call(o,f)&&t(o,a,f)};Object.defineProperty(e,"__esModule",{value:!0}),e.DomHandler=void 0;var n=Xe(),s=_e();r(_e(),e);var u={withStartIndices:!1,withEndIndices:!1,xmlMode:!1},d=function(){function a(o,f,g){this.dom=[],this.root=new s.Document(this.dom),this.done=!1,this.tagStack=[this.root],this.lastNode=null,this.parser=null,typeof f=="function"&&(g=f,f=u),typeof o=="object"&&(f=o,o=void 0),this.callback=o!=null?o:null,this.options=f!=null?f:u,this.elementCB=g!=null?g:null}return a.prototype.onparserinit=function(o){this.parser=o},a.prototype.onreset=function(){this.dom=[],this.root=new s.Document(this.dom),this.done=!1,this.tagStack=[this.root],this.lastNode=null,this.parser=null},a.prototype.onend=function(){this.done||(this.done=!0,this.parser=null,this.handleCallback(null))},a.prototype.onerror=function(o){this.handleCallback(o)},a.prototype.onclosetag=function(){this.lastNode=null;var o=this.tagStack.pop();this.options.withEndIndices&&(o.endIndex=this.parser.endIndex),this.elementCB&&this.elementCB(o)},a.prototype.onopentag=function(o,f){var g=this.options.xmlMode?n.ElementType.Tag:void 0,m=new s.Element(o,f,void 0,g);this.addNode(m),this.tagStack.push(m)},a.prototype.ontext=function(o){var f=this.lastNode;if(f&&f.type===n.ElementType.Text)f.data+=o,this.options.withEndIndices&&(f.endIndex=this.parser.endIndex);else{var g=new s.Text(o);this.addNode(g),this.lastNode=g}},a.prototype.oncomment=function(o){if(this.lastNode&&this.lastNode.type===n.ElementType.Comment){this.lastNode.data+=o;return}var f=new s.Comment(o);this.addNode(f),this.lastNode=f},a.prototype.oncommentend=function(){this.lastNode=null},a.prototype.oncdatastart=function(){var o=new s.Text(""),f=new s.CDATA([o]);this.addNode(f),o.parent=f,this.lastNode=o},a.prototype.oncdataend=function(){this.lastNode=null},a.prototype.onprocessinginstruction=function(o,f){var g=new s.ProcessingInstruction(o,f);this.addNode(g)},a.prototype.handleCallback=function(o){if(typeof this.callback=="function")this.callback(o,this.dom);else if(o)throw o},a.prototype.addNode=function(o){var f=this.tagStack[this.tagStack.length-1],g=f.children[f.children.length-1];this.options.withStartIndices&&(o.startIndex=this.parser.startIndex),this.options.withEndIndices&&(o.endIndex=this.parser.endIndex),f.children.push(o),g&&(o.prev=g,g.next=o),o.parent=f,this.lastNode=null},a}();e.DomHandler=d,e.default=d}(ne)),ne}var Ye={};Ye.CASE_SENSITIVE_TAG_NAMES=["animateMotion","animateTransform","clipPath","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussainBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","foreignObject","linearGradient","radialGradient","textPath"];var Z=We(),Tr=Ye,De=Tr.CASE_SENSITIVE_TAG_NAMES,Er=Z.Comment,kr=Z.Element,Sr=Z.ProcessingInstruction,Cr=Z.Text,Qe={},ae;for(var oe=0,Nr=De.length;oe<Nr;oe++)ae=De[oe],Qe[ae.toLowerCase()]=ae;function Or(e){return Qe[e]}function Ze(e){for(var t={},r,n=0,s=e.length;n<s;n++)r=e[n],t[r.name]=r.value;return t}function Rr(e){e=e.toLowerCase();var t=Or(e);return t||e}function Je(e,t,r){t=t||null;for(var n=[],s=0,u=e.length;s<u;s++){var d=e[s],a;switch(d.nodeType){case 1:a=new kr(Rr(d.nodeName),Ze(d.attributes)),a.children=Je(d.childNodes,a);break;case 3:a=new Cr(d.nodeValue);break;case 8:a=new Er(d.nodeValue);break;default:continue}var o=n[s-1]||null;o&&(o.next=a),a.parent=t,a.prev=o,a.next=null,n.push(a)}return r&&(a=new Sr(r.substring(0,r.indexOf(" ")).toLowerCase(),r),a.next=n[0]||null,a.parent=t,n.unshift(a),n[1]&&(n[1].prev=n[0])),n}he.formatAttributes=Ze;he.formatDOM=Je;var Ar=wr,Pr=he,_r=Pr.formatDOM,Ir=/<(![a-zA-Z\s]+)>/;function Dr(e){if(typeof e!="string")throw new TypeError("First argument must be a string");if(e==="")return[];var t=e.match(Ir),r;return t&&t[1]&&(r=t[1]),_r(Ar(e),null,r)}var Lr=Dr,Ke=vr,Mr=Ue,F=Lr;F=typeof F.default=="function"?F.default:F;var jr={lowerCaseAttributeNames:!1};function H(e,t){if(typeof e!="string")throw new TypeError("First argument must be a string");return e===""?[]:(t=t||{},Ke(F(e,t.htmlparser2||jr),t))}H.domToReact=Ke;H.htmlToDOM=F;H.attributesToProps=Mr;H.Element=We().Element;j.exports=H;j.exports.default=H;var Fr=j.exports.domToReact;j.exports.htmlToDOM;j.exports.attributesToProps;j.exports.Element;const Hr=j.exports;function $r({content:e,profilePageOf:t,withReplies:r}){const{dispatch:n}=Le(),[s,u]=P.exports.useState(""),[d,a]=P.exports.useState(e.comments),o=m=>{m.preventDefault(),ct(e.id,s).catch(T=>{console.log(T),n({type:"setAlert",payload:"Only followers can reply to this tweet!"})}).finally(()=>{u("")})},f=(m,T)=>{(T?ut:ft)(m).then(v=>{a(p=>{const E=[...p],I=d.findIndex(J=>J.id===m);return console.log(E),console.log(v),console.log(I),E[I]={...E[I],...v.comment},E})},v=>console.log(v))},g=(m,T)=>{if(!T)return m;let O=m;for(const p of T)O=O.replace(`#${p.text}`,`<a href="/#/trend/${p.id}" className='hashtag-link link link-hover link-primary'>#${p.text}</a>`);const v={replace:({attribs:p,children:E})=>{if(!!p&&p.class==="hashtag-link")return P.exports.createElement(me,{to:p.href},Fr(E,v))}};return Hr(O,v)};return w(ce,{children:[e.retweeted&&w("div",{className:"flex items-center text-sm retweeted",children:[h(je,{size:15}),w("span",{className:"text-base-content/70",children:["\xA0",t," retweeted"]})]}),h("div",{className:"mt-2 mb-4 bg-base-100 card bordered",children:w("div",{className:"p-2 card-body",children:[w("div",{className:"flex space-x-4 tweet-user",children:[h("img",{src:e.author.avatar||Me,width:"50",height:"50",className:"mask mask-squircle"}),w("div",{children:[h(me,{to:`/profile/${e.author.handle}`,children:h("p",{className:"text-lg font-bold custom-title",children:e.author.name})}),h("small",{className:"text-base-content/70",children:new Date(e.createdAt).toLocaleString()})]})]}),h("div",{className:"my-2 break-all tweet-text",children:g(e.text,e.hashtags)}),e.image&&h("div",{className:"tweet-image",children:h("img",{src:e.image,alt:"tweet-image",className:"w-full rounded-lg",style:{maxHeight:"300px",objectFit:"cover",objectPosition:"center"},loading:"lazy"})}),w("div",{className:"flex justify-end my-2 space-x-4 text-sm tweet-stats text-base-content/70",children:[w("span",{children:[e.commentCount||0," Comments"]}),w("span",{children:[e.retweetCount||0," Retweets"]}),w("span",{children:[e.savedCount||0," Saved"]})]}),h(vt,{id:e.id,retweeted:e.isRetweeted,liked:e.isFavorited,saved:e.isSaved}),w("div",{className:"flex items-center m-2 max-h-12 tweet-newreply",children:[h("div",{className:"p-1 w-12 h-12",children:h("img",{src:"https://picsum.photos/id/1005/200/200",height:"100%",className:"mask mask-squircle"})}),w("div",{className:"flex items-center m-1 w-full rounded-md reply-input bg-base-200",children:[h("div",{className:"m-2 w-full",children:h("form",{onSubmit:o,children:h("input",{type:"text",placeholder:"Tweet your reply",className:"p-1 w-full text-sm bg-transparent outline-none",value:s,onChange:m=>u(m.target.value)})})}),h("span",{className:"mx-2 cursor-pointer",children:h(pt,{})})]})]}),r&&h(gt,{commentLikeOrUnlike:f,comments:d})]})})]})}function en({tweets:e=[],withReplies:t=!1,profilePageOf:r="",loading:n}){return n?h(dt,{}):h(ce,{children:e.length?e.map(s=>h($r,{content:s,withReplies:t,profilePageOf:r},s.id)):h("h1",{children:"No Content Found"})})}export{pt as P,en as T,Vr as a,Gr as b,Br as c,Jr as d,Yr as e,Qr as f,Wr as g,Ur as h,Xr as i,Kr as j,Zr as u};
//# sourceMappingURL=Timeline.05d3842f.js.map