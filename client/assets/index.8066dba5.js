import{P as s}from"./PageLayout.007c9f66.js";import{g as d,c as u,T as x}from"./Timeline.05d3842f.js";import{T as g}from"./TimelineMenu.f8c3923a.js";import{r as o,j as T,a as e}from"./vendor.9eb6cf8c.js";import"./index.63c18d6c.js";function O(){const[t,r]=o.exports.useState("tweets"),[a,n]=o.exports.useState(1),{data:i,isLoading:p,isFetching:l,isPreviousData:m}=d(t,a),c=[{text:"Tweets",id:"tweets"},{text:"Tweets & Replies",id:"replies"},{text:"Media",id:"media"},{text:"Likes",id:"likes"}];return o.exports.useEffect(()=>{n(1)},[t]),T(s,{children:[e(s.Side,{children:e(g,{options:c,activeOption:t,setActiveOption:r})}),e(s.Main,{children:e(u,{page:a,setPage:n,isPreviousData:m,children:e(x,{loading:p||l,tweets:i==null?void 0:i.savedTweets,withReplies:t==="replies"})})})]})}export{O as default};
//# sourceMappingURL=index.8066dba5.js.map
