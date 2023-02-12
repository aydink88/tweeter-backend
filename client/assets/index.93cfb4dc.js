import{h as F,i as k,c as L,T as P}from"./Timeline.79e7c7ba.js";import{T as O}from"./TimelineMenu.f8c3923a.js";import{a as e,j as o,F as y,L as C,r as d,l as j,g as T,h as f}from"./vendor.9eb6cf8c.js";import{I as $,d as w,j as A,k as S,f as Q,m as q}from"./index.15c81381.js";function z(t){return e($,{...t,children:e("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"})})}function I({children:t,classNames:s,label:c,modalAction:i,onLabelClick:a,modalId:l}){return o(y,{children:[e("label",{htmlFor:l,className:`cursor-pointer${s?" "+s:""}`,onClick:a,children:c}),e("input",{type:"checkbox",id:l,className:"modal-toggle"}),e("div",{className:"modal modal-bottom sm:modal-middle",children:o("div",{className:"modal-box",children:[e("label",{htmlFor:l,className:"absolute top-2 right-2 btn btn-ghost btn-sm btn-circle",children:"\u2715"}),t,e("div",{className:"modal-action",children:i})]})})]})}function h({list:t,username:s,onLabelClick:c,listType:i}){let a="";switch(i){case"followers":a=`${s} is followed by`;break;case"following":a=`${s} is following`;break}return o(I,{modalId:`${i}-list-modal`,label:i,onLabelClick:c,children:[e("h3",{className:"mb-4 font-semibold custom-title",children:a}),t.map(l=>o("div",{children:[e("hr",{}),o("div",{className:"flex items-start my-2",children:[o("div",{className:"my-2 follow-list-user",children:[o("div",{className:"flex follow-list-info",children:[e("div",{className:"p-2 w-16 h-16 avatar follow-list-avatar",children:e("img",{className:"mask mask-squircle",src:l.avatar||w,alt:l.name})}),o("div",{children:[e(C,{to:`/profile/${l.handle}`,children:e("h2",{className:"font-medium custom-title follow-list-name",children:l.name})}),o("div",{className:"text-sm text-base-content/70 follow-list-count",children:[l.followerCount," ",` ${i}`]})]})]}),e("div",{className:"p-2 text-sm text-base-content/70 follow-list-bio",children:l.bio})]}),e("div",{className:"ml-auto follow-list-button",children:e("button",{className:"btn btn-sm btn-primary",children:"Follow"})})]})]},l.id))]})}function M({user:t,toggleFollow:s}){const[c,i]=d.exports.useState([]),[a,l]=d.exports.useState([]),m=()=>{A(t.id).then(n=>i(n.followers)).catch(n=>console.log(n))},r=()=>{S(t.id).then(n=>l(n.following)).catch(n=>console.log(n))};return o("div",{className:"overflow-visible gap-x-4 p-4 -mt-12 w-full bg-base-100 card card-side bordered",children:[e("div",{className:"avatar",children:e("div",{className:"-mt-10 w-24 h-24 rounded border bg-base-100",children:e("img",{className:"p-1",src:w,alt:"avatar"})})}),o("div",{className:"w-full details",children:[o("div",{className:"flex justify-between items-center follow",children:[o("div",{className:"flex gap-x-4 follow-info",children:[e("h4",{className:"card-title",children:t.name}),o("div",{children:[o("span",{className:"font-bold",children:[t.followerCount," "]}),e(h,{listType:"followers",list:c,onLabelClick:m,username:t.name})]}),o("div",{children:[o("span",{className:"font-bold",children:[t.followingCount," "]}),e(h,{listType:"following",list:a,onLabelClick:r,username:t.name})]})]}),e("div",{className:"follow-button",children:o("button",{className:`btn btn-sm ${t.isFollowed?" btn-error":" btn-primary"}`,onClick:s,children:[e(z,{size:20}),"\xA0",t.isFollowed?"UnFollow":"Follow"]})})]}),e("div",{className:"bio",children:t.bio})]})]})}function E(){const{handle:t}=j(),[s,c]=d.exports.useState(1),[i,a]=d.exports.useState("tweets"),{data:l,isLoading:m}=F(t),{data:r,isLoading:n,isFetching:u,isPreviousData:p}=k(t,i==="replies",i==="media",i==="likes",s),g=[{text:"Tweets",id:"tweets"},{text:"Tweets & Replies",id:"replies"},{text:"Media",id:"media"},{text:"Likes",id:"likes"}],b=T(),v=f(Q),N=f(q),x=()=>{if(!l)return;(l.profile.isFollowed?N:v).mutate(l.profile.handle,{onSuccess:()=>{b.invalidateQueries("fetchProfileOf")}})};return o("div",{className:"profile",children:[e("div",{className:"overflow-hidden h-48 banner-bg",children:e("img",{className:"object-cover object-center w-full h-full",src:"https://images.pexels.com/photos/5589173/pexels-photo-5589173.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",alt:"banner"})}),l&&e(M,{user:l.profile,toggleFollow:x}),o("div",{className:"flex gap-x-12 items-start mt-8",children:[e("div",{className:"w-1/4",children:e(O,{options:g,activeOption:i,setActiveOption:a})}),e("div",{className:"w-3/4",children:e(L,{page:s,setPage:c,isPreviousData:p,children:e(P,{loading:m||n||u,tweets:r==null?void 0:r.tweets,withReplies:i==="replies",profilePageOf:l==null?void 0:l.profile.name})})})]})]})}export{E as default};
//# sourceMappingURL=index.93cfb4dc.js.map