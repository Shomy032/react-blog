(this["webpackJsonpblog-ui"]=this["webpackJsonpblog-ui"]||[]).push([[0],{18:function(e,t,s){},32:function(e,t,s){},34:function(e,t,s){},35:function(e,t,s){},42:function(e,t,s){},43:function(e,t,s){},44:function(e,t,s){},45:function(e,t,s){},46:function(e,t,s){},47:function(e,t,s){},48:function(e,t,s){},67:function(e,t,s){},68:function(e,t,s){},72:function(e,t,s){},73:function(e,t,s){},74:function(e,t,s){},75:function(e,t,s){},76:function(e,t,s){},77:function(e,t,s){},78:function(e,t,s){},79:function(e,t,s){},80:function(e,t,s){},81:function(e,t,s){},82:function(e,t,s){"use strict";s.r(t);var r=s(1),n=s.n(r),c=s(19),a=s.n(c),o=(s(32),s(10)),i=s.n(o),l=s(13),u=(s(27),s(11)),d=s(2),j=(s(34),s(35),s(6)),h=s(0);var b=s(4);s(42),s(43),s(44);var p=function(e){var t=e.setResData,s=Object(r.useState)(""),n=Object(d.a)(s,2),c=n[0],a=n[1],o=function(e){if(e.preventDefault(),c){var s=c.replace(/[^A-Za-z0-9]/g," ").trim().split(" ").join("+");fetch("http://localhost:4002/posts/search?name=".concat(s),{method:"GET"}).then((function(e){return e.json()})).then((function(e){if(e.massage&&0==e.success){console.error("no resulst for that search","passing err");var s=new Error("no resulst for that search");t(s)}else t(e)})).catch((function(e){return console.error(e)}))}};return Object(h.jsxs)("form",{className:"Search",onSubmit:o,children:[Object(h.jsxs)("div",{className:"inputWraper",children:[Object(h.jsx)("input",{type:"text",name:"search",className:"effect-8",placeholder:"search for question...",autocomplete:"off",value:c,onChange:function(e){a(e.target.value)}}),Object(h.jsx)("span",{class:"focus-border",children:Object(h.jsx)("i",{})})]}),Object(h.jsx)("button",{type:"submit",onSubmit:o,children:Object(h.jsx)("i",{className:"fas fa-search"})})]})};s(45);var f=function(e){var t=e.addFilters,s=Object(r.useState)(!1),n=Object(d.a)(s,2),c=n[0],a=n[1],o=Object(r.useState)(0),i=Object(d.a)(o,2),u=(i[0],i[1]),j=Object(r.useState)(""),b=Object(d.a)(j,2),p=b[0],f=b[1],m=["html","css","js","react","redux","angular","node","go","dom","vue","php","pc","nosql","sql","database","c#",".net","express","java","oop","git","other","docker","graph","http1.1","http2.0","quic","ip","networking","algorithm","data","server","serverless","crypto","file","tls","tcp","udp","bash","ssh","telnet","security","password","xss","cors","jwt","cookie","md","scss","swift","ddos","limiting","status","c#","c++","linux","windows","mac","python"],O=Object(r.useState)([].concat(m)),x=Object(d.a)(O,2),g=x[0],v=x[1],w=Object(r.useRef)([]),N=Object(r.useState)([]),y=Object(d.a)(N,2),S=(y[0],y[1]),k=Object(r.useState)([]),C=Object(d.a)(k,2),P=C[0],T=C[1];return Object(h.jsxs)("div",{className:"Filter",children:[Object(h.jsx)(h.Fragment,{children:c?Object(h.jsxs)("div",{className:"sideBarOpen",children:[" ",Object(h.jsx)("button",{className:"btn",onClick:function(){t(w.current),console.log("click",w.current,"current filters")},children:"applay filters"}),"  ",Object(h.jsx)("i",{className:"fas fa-times",onClick:function(){S(w.current),a(!1)}})]}):Object(h.jsx)("button",{className:"btn",onClick:function(){S(w.current),a(!0)},children:"show filters"})}),c&&Object(h.jsxs)("div",{className:"wraper",children:[c&&Object(h.jsxs)("div",{className:"effectWraper",children:[Object(h.jsxs)("form",{onSubmit:function(e){e.preventDefault()},children:[" ",Object(h.jsx)("input",{value:p,onChange:function(e){f(e.target.value),v(Object(l.a)(m.filter((function(t){return t.includes(e.target.value)}))))},placeholder:"search for filter",className:"searchForFilters effect-8"})]}),Object(h.jsx)("span",{class:"focus-border",children:Object(h.jsx)("i",{})})]}),c&&Object(h.jsxs)("div",{className:"currentFilters",children:[Object(h.jsx)("p",{children:"current filters :"}),Object(h.jsx)("ul",{children:P&&P.map((function(e,t){return Object(h.jsx)("li",{className:"singleFilter "+e,onClick:function(e){return function(e){var t=P.indexOf(e.target.className.split(" ")[1]);-1!==t&&(P.splice(t,1),console.log("in removeTag ::","starting removing filters",w.current),w.current.splice(t,1),console.log("removing removed",w.current)),T(Object(l.a)(P))}(e)},children:e},t)}))})]}),c&&Object(h.jsxs)("div",{className:"allFiltersTags",children:[Object(h.jsx)("p",{children:"all filters :"}),Object(h.jsx)("ul",{children:g&&g.map((function(e,t){return Object(h.jsx)("li",{className:"singleFilter "+e,onClick:function(t){return function(e,t){if(u(Math.random()),w.current.includes(e)){console.log("starting removing filters",w.current);var s=w.current.indexOf(e);w.current.splice(s,1),console.log("removing removed",w.current);var r=P.indexOf(t.target.className.split(" ")[1]);-1!==r&&P.splice(r,1),T(Object(l.a)(P))}else w.current.push(e),T([].concat(Object(l.a)(P),[t.target.className.split(" ")[1]]))}(e,t)},children:e},t)}))})]})]})]})},m=Object(r.createContext)(null);var O=function(e){var t=e.sendDataToIndexThenToMain,s=e.setPopup,n=Object(b.g)(),c=Object(r.useState)([]),a=Object(d.a)(c,2),o=a[0],i=a[1],l=Object(r.useState)([]),u=Object(d.a)(l,2),j=(u[0],u[1]),O=Object(r.useState)(null),x=Object(d.a)(O,2),g=x[0],v=(x[1],Object(r.useContext)(m)),w=v.loger,N=(v.setLoger,Object(r.useRef)(""));return Object(r.useEffect)((function(){if(console.log("useEffect is called"),N.current=o.map((function(e,t,s){return s.length==t+1?"tag=".concat(e):"tag=".concat(e,"&")})).join(""),console.log("filters in effect",o,N.current),!N.current||0===o.length)return console.error("bad filters","returning"),function(){return console.log("returning , last else")};console.log("useEffect is fetching","http://localhost:4002/posts/filter?".concat(N.current)),fetch("http://localhost:4002/posts/filter?".concat(N.current),{method:"GET"}).then((function(e){if(e.ok||200==e.status)return e.json();throw new Error("fetch failed")})).then((function(e){return t(e)})).catch((function(e){return console.error(e)}))}),[JSON.stringify(o)]),Object(h.jsxs)("div",{className:"Header",children:[Object(h.jsxs)("div",{className:"authLinks",children:[Object(h.jsx)("h1",{className:"logo",onClick:function(){return n.push("/")},children:"OverflowStack"}),w?Object(h.jsx)("div",{className:"link",onClick:function(){return n.push("/profile")},children:"My Profile"}):Object(h.jsx)("div",{className:"link",onClick:function(){return s(!0)},children:"Sing up"})]}),Object(h.jsxs)("div",{className:"wraperHeader",style:{display:"flex",width:"auto"},children:[Object(h.jsx)(p,{setResData:j}),Object(h.jsx)(f,{addFilters:i}),g]})]})};s(18);var x=function(e){return Object(h.jsx)("div",{className:"tagsWraper",children:e.all&&e.all.map((function(t,s){return Object(h.jsx)(j.b,{to:"/posts/filter?tag=".concat(t),className:"tag",style:{backgroundColor:"hsl( ".concat(e.colors[s]," , 100%, 50%)")},children:t},s)}))})},g=function(e){var t=e.data,s=e.setPopup,n=Object(r.useState)(!1),c=Object(d.a)(n,2),a=c[0],o=c[1],l=Object(r.useState)(t.likes),j=Object(d.a)(l,2),b=j[0],p=j[1],f="http://localhost:4002/action/like";function m(e,t,s,r){return O.apply(this,arguments)}function O(){return(O=Object(u.a)(i.a.mark((function e(t,s,r,n){var c,a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch(t,{method:"POST",headers:new Headers({"Content-Type":"application/json"}),credentials:"same-origin",body:JSON.stringify({postId:r,postType:n,actionType:s})});case 3:if(c=e.sent,console.log(c.status,"data",c),403!==c.status||c.ok){e.next=9;break}return e.abrupt("return",{success:!1,redirect:!0,authorized:!1});case 9:if(400!=c.status||c.ok){e.next=11;break}throw new Error("invalid request");case 11:return e.next=13,c.json();case 13:return a=e.sent,console.log("data",a),e.abrupt("return",a);case 18:throw e.prev=18,e.t0=e.catch(0),console.log("err",e.t0,"sended","failed to",s),new Error("failed to"+s);case 22:case"end":return e.stop()}}),e,null,[[0,18]])})))).apply(this,arguments)}var x=function(){var e=Object(u.a)(i.a.mark((function e(){var r,n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(o(!a),e.prev=1,a){e.next=9;break}return e.next=5,m(f,"like",t._id,"post");case 5:1==(r=e.sent).success?p(b-1):0==r.success&&0==r.authorized&&1==r.redirect?(o(!1),s(!0)):o(!1),e.next=15;break;case 9:return console.log("dislike"),e.next=12,m(f,"dislike",t._id,"post");case 12:n=e.sent,console.log(n,"res in else (!like) !!!!"),1==n.success?(console.log("res is good"),p(b+1)):0==n.success&&0==n.authorized&&1==n.redirect?(o(!0),console.log("res is bad , unauthorized"),s(!0)):(console.log("res is just bad"),o(!0));case 15:e.next=20;break;case 17:e.prev=17,e.t0=e.catch(1),console.log("err from catch ::",e.t0);case 20:case"end":return e.stop()}}),e,null,[[1,17]])})));return function(){return e.apply(this,arguments)}}();return Object(h.jsxs)("div",{className:"likes",onClick:x,children:[Object(h.jsx)("p",{children:b}),a?Object(h.jsx)("i",{className:"fas fa-heart",style:{color:"red"}}):Object(h.jsx)("i",{className:"far fa-heart"})]})};var v=function(e){var t=e.setPopup,s=e.data,n=e.parsedName,c=Object(r.useState)(!1),a=Object(d.a)(c,2),o=(a[0],a[1]);Object(r.useEffect)((function(){s.tags&&s.tags.forEach((function(){i.current.push(359*Math.random()),o(!0)}))}),[]);var i=Object(r.useRef)([]);return Object(h.jsxs)("div",{className:"singlePost",children:["    ",Object(h.jsxs)(j.b,{className:"link",to:"/posts/".concat(n),children:["  ",s.name]}),Object(h.jsx)(x,{colors:i.current,all:s.tags}),Object(h.jsx)(g,{data:s,setPopup:t}),Object(h.jsxs)("div",{className:"comment",children:[Object(h.jsx)("span",{children:"".concat(s.comments.length," comments")})," ",Object(h.jsx)("i",{className:"fas fa-share"}),Object(h.jsx)("span",{children:function(e){var t=e.split("-");return t[2]=t[2].slice(0,2),t.join("_")}(s.date)})]})]})};s(46);s(47),s(48),s(24);var w=s(20),N=s.n(w),y=function(e){var t=e.setRedirectToFinish,s=e.setUser,n=e.dispatch,c=Object(r.useState)(""),a=Object(d.a)(c,2),o=a[0],i=a[1],l=Object(r.useState)(""),u=Object(d.a)(l,2),j=u[0],b=u[1],p=Object(r.useState)(!1),f=Object(d.a)(p,2),O=f[0],x=f[1],g=Object(r.useState)(!1),v=Object(d.a)(g,2),w=v[0],y=v[1],S=Object(r.useRef)(null),k=Object(r.useState)(!0),C=Object(d.a)(k,2),P=C[0],T=C[1],F=Object(r.useContext)(m).setLoger;function E(e){e.preventDefault(),y(!0),o&&j?fetch("http://localhost:4002/auth/login",{method:"POST",redirect:"follow",headers:new Headers({"Content-Type":"application/json"}),body:JSON.stringify({email:o,password:j})}).then((function(e){if(console.log("res",e),y(!1),e.ok)return x(!1),e.json();throw new Error("error with raw response")})).then((function(e){if(!0!==e.success)throw t(!1),new Error("error with response , login not accepted");n({title:"normal"}),s(e.username),F(!0),x(!1),t(!0)})).catch((function(e){x(!0),console.log(e)})):(x(!0),y(!1))}return w?Object(h.jsx)(N.a,{type:"Puff",color:"#00BFFF",width:50,height:50}):Object(h.jsx)(h.Fragment,{children:Object(h.jsx)("div",{className:"LoginForm",children:Object(h.jsxs)("form",{className:"formLogin",onSubmit:E,children:[Object(h.jsx)("div",{className:"wraper1",children:Object(h.jsx)("input",{className:"emailInput",value:o,onChange:function(e){i(e.target.value)},name:"email",type:"text",placeholder:"enter your email..."})}),Object(h.jsxs)("div",{className:"wraper2",children:[Object(h.jsx)("input",{ref:S,className:"passwordInput",value:j,onChange:function(e){b(e.target.value)},name:"password",type:"password",placeholder:"enter your password..."}),Object(h.jsx)("i",{className:"fas fa-eye-slash eye",onClick:function(){T(!P),S.current.type=P?"text":"password"}})]}),O&&Object(h.jsx)("p",{className:"loginError",children:"invalid credentials , please try again"}),Object(h.jsx)("button",{className:"submitButton",type:"submit",onClick:E,children:"submit"})]})})})},S=(s(67),function(e){var t=e.username,s=(e.setUser,e.email),n=e.setLoading,c=e.setRedirectToFinish,a=Object(r.useState)(""),o=Object(d.a)(a,2),i=o[0],l=o[1],u=Object(r.useState)(""),j=Object(d.a)(u,2),b=j[0],p=j[1],f=Object(r.useContext)(m).setLoger,O=function(e){e.preventDefault();n(!0),fetch("http://localhost:4002/auth/verifyregister",{method:"POST",headers:new Headers({"Content-Type":"application/json"}),body:JSON.stringify({code:i,email:s,username:t})}).then((function(e){return console.log(e),n(!1),e.json()})).then((function(e){e.success?(f(!0),n(!1),c(!0)):(n(!1),p(e.message))}))};return Object(h.jsx)("div",{className:"VerificationCode",children:Object(h.jsxs)("form",{onSubmit:O,children:[Object(h.jsx)("p",{className:"resetInfo",children:"Check your email , we are sending you 6 diget code , please enter it bellow"}),Object(h.jsx)("p",{className:"resetInfo",children:"If you didnt recieve our email please , contact us on ****"}),Object(h.jsx)("input",{className:"inputResetCode",value:i,name:"code",placeholder:"enter your code here...",type:"text",autoComplete:"off",onChange:function(e){l(e.target.value)}}),Object(h.jsx)("button",{className:"goBackButton",onSubmit:O,children:"submit"}),b&&Object(h.jsx)("p",{className:"errorReset",children:b})]})})}),k=(s(68),s(25));function C(e,t){switch(t.type){case"usernameLength":return{error:"username must be over 6 characters long"};case"usernameForm":return{error:"usernam cant start with number"};case"usernameUnique":return{error:"sorry that username is not avalible"};case"passwordForm":return{error:"password must be minimum 6 characters long"};case"passwordEqual":return{error:"passwords must be the same"};case"eamailInvalid":return{error:"please enter valid email"};case"emailUse":return{error:"sorry , that email is alredy in use"};case"CustomError":return{error:""};default:return{error:"there is a error"}}}var P=function(e){var t=e.setRedirectToFinish,s=(e.dispatchPopup,e.setUser),n=Object(r.useState)(""),c=Object(d.a)(n,2),a=c[0],o=c[1],i=Object(r.useState)(""),l=Object(d.a)(i,2),u=l[0],j=l[1],b=Object(r.useState)(""),p=Object(d.a)(b,2),f=p[0],m=p[1],O=Object(r.useState)(""),x=Object(d.a)(O,2),g=x[0],v=x[1],w=Object(r.useState)(""),N=Object(d.a)(w,2),y=N[0],P=N[1],T=Object(r.useState)(!1),F=Object(d.a)(T,2),E=F[0],I=F[1],R=Object(r.useState)(!1),M=Object(d.a)(R,2),A=M[0],D=M[1],B=Object(r.useReducer)(C,{error:""}),U=Object(d.a)(B,2),G=U[0],H=U[1],J="http://localhost:4002/auth/register";function L(e){e.preventDefault(),I(!0),function(e,t,s,r,n){var c=!0;return e.length<6?(n({type:"usernameLength"}),c=!1):"number"==typeof e[0]?(n({type:"usernameForm"}),c=!1):s!==r?(n({type:"passwordEqual"}),c=!1):s.length<6?(n({type:"passwordForm"}),c=!1):/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(t)||(n({type:"eamailInvalid"}),c=!1),c}(u,a,f,g,H)?a&&f&&g&&u?(P(""),console.log("before fetch","to",J),fetch(J,{method:"POST",headers:new Headers({"Content-Type":"application/json"}),body:JSON.stringify({username:u,email:a,password1:f,password2:g})}).then((function(e){return console.log("res",e),I(!1),e.ok?(P(!1),e.json()):e.json()})).then((function(e){console.log("data",e),I(!1),!0===e.success?(P(!1),s(e.username),D(!0)):(t(!1),P(e.message))})).catch((function(e){P("there is an err")}))):(H({type:"normal"}),P("there is an err")):(P("there is an error"),I(!1))}return E?Object(h.jsx)(h.Fragment,{children:Object(h.jsx)(k,{loaded:!1,options:{lines:13,length:10,width:10,radius:5,scale:1,corners:1,color:"rgb(111, 36, 141)",opacity:.25,rotate:0,direction:1,speed:1,trail:60,fps:20,zIndex:2e9,top:"50%",left:"50%",shadow:!1,hwaccel:!1,position:"absolute"},className:"spinner"})}):A?Object(h.jsx)(S,{setUser:s,setRedirectToFinish:t,email:a,setLoading:I}):Object(h.jsx)(h.Fragment,{children:Object(h.jsx)("div",{className:"RegisterForm",children:Object(h.jsxs)("form",{className:"formRegister",onSubmit:L,children:[Object(h.jsx)("input",{className:"emailInput",value:a,onChange:function(e){o(e.target.value)},name:"email",type:"text",placeholder:"enter your email..."}),Object(h.jsx)("input",{className:"usernameinput",value:u,onChange:function(e){j(e.target.value)},name:"username",type:"text",placeholder:"enter your username..."}),Object(h.jsx)("input",{className:"passwordInput",value:f,onChange:function(e){m(e.target.value)},name:"password",type:"password",placeholder:"enter your password..."}),Object(h.jsx)("input",{className:"passwordInput",value:g,onChange:function(e){v(e.target.value)},name:"password",type:"password",placeholder:"enter your password again..."}),y&&Object(h.jsx)("p",{className:"loginError",children:G.error||y}),Object(h.jsx)("button",{className:"submitButton",type:"submit",onClick:L,children:"submit"})]})})})},T=(s(72),s(73),function(e){var t=e.code,s=e.handleSubmitCode,r=e.handleChangeCode,n=e.state,c=e.stateError;return Object(h.jsxs)(h.Fragment,{children:[Object(h.jsxs)("form",{onSubmit:s,children:[Object(h.jsx)("input",{className:"inputResetCode",value:t,name:"code",placeholder:"enter your code here...",type:"text",autoComplete:"off",onChange:r}),Object(h.jsx)("button",{className:"goBackButton",onSubmit:s,children:"submit"}),n.error&&Object(h.jsx)("p",{className:"errorReset",children:n.errorMessage||c})]}),Object(h.jsx)("p",{className:"resetInfo",children:"Check your email , we are sending you 6 diget code , please enter it bellow"}),Object(h.jsx)("p",{className:"resetInfo",children:"If you didnt recieve our email please check your spam , or contact us on ******"})]})}),F=s(25),E=function(e,t){switch(t.type){case"CustomError":return{error:!0,errorMessage:"",status:!1,newPassword:!1,newPasswordIsAdded:!1};case"invalidEmail":case"emailNotInUse":return{error:!0,errorMessage:"please enter valid email",status:!1,newPassword:!1,newPasswordIsAdded:!1};case"responseGood":return{error:!1,errorMessage:"",status:!0,newPassword:!1,newPasswordIsAdded:!1};case"invalidCode":return{error:!0,errorMessage:"please enter valid code",status:!1,newPassword:!1,newPasswordIsAdded:!1};case"codeNotMatching":return{error:!0,errorMessage:"please enter your code",status:!1,newPassword:!1,newPasswordIsAdded:!1};case"codeIsGood":return{error:!1,errorMessage:"",status:!1,newPassword:!0,newPasswordIsAdded:!1};case"passwordsUnequal":return{error:!0,errorMessage:"passwords must be the same",status:!1,newPassword:!0,newPasswordIsAdded:!1};case"shortPassword":return{error:!0,errorMessage:"passwords must be longer then 6 characters",status:!1,newPassword:!0,newPasswordIsAdded:!1};case"resetPasswordBadResponse":return{error:!0,errorMessage:"there is error , pls try again",status:!1,newPassword:!0,newPasswordIsAdded:!1};case"passwordIsGood":return{error:!1,errorMessage:"",status:!1,newPassword:!1,newPasswordIsAdded:!0};default:return{error:!1,errorMessage:"",status:!1,newPassword:!1,newPasswordIsAdded:!1}}},I=function(){var e=Object(r.useState)(!1),t=Object(d.a)(e,2),s=t[0],n=t[1],c=Object(r.useState)(""),a=Object(d.a)(c,2),o=a[0],i=a[1],l=Object(r.useState)(""),u=Object(d.a)(l,2),j=u[0],b=u[1],p=Object(r.useState)(""),f=Object(d.a)(p,2),m=f[0],O=f[1],x=Object(r.useState)(""),g=Object(d.a)(x,2),v=g[0],w=g[1],N=Object(r.useState)(""),y=Object(d.a)(N,2),S=y[0],k=y[1],C=Object(r.useReducer)(E,{error:!1,errorMessage:"",status:!1,newPassword:!1}),P=Object(d.a)(C,2),I=P[0],R=P[1],M=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,A=function(e){e.preventDefault();M.test(o)?(n(!0),fetch("http://localhost:4002/auth/resetemail",{method:"POST",headers:new Headers({"Content-Type":"application/json"}),body:JSON.stringify({email:o})}).then((function(e){return console.log(e,"res"),n(!1),R({type:"responseGood"}),e.json()})).then((function(e){e.success?(k(""),n(!1),R({type:"responseGood"})):(R({type:"CustomError"}),n(!1),k(e.message))})).catch((function(e){console.log(e),R({type:"emailNotInUse"})}))):(n(!1),R({type:"invalidEmail"}))},D=function(e){if(e.preventDefault(),n(!0),j!==m)n(!1),R({type:"passwordsUnequal"});else if(j.length<6)n(!1),R({type:"shortPassword"});else{fetch("http://localhost:4002/auth/resetpassword",{method:"POST",headers:new Headers({"Content-Type":"application/json"}),body:JSON.stringify({password1:j,password2:m})}).then((function(){})).then((function(){})).catch((function(e){console.log(e),R({type:"codeNotMatching"})}))}};return Object(h.jsx)("div",{className:"ResetPassword",children:s?Object(h.jsx)(F,{loaded:!1,options:{lines:13,length:10,width:10,radius:5,scale:1,corners:1,color:"rgb(111, 36, 141)",opacity:.25,rotate:0,direction:1,speed:1,trail:60,fps:20,zIndex:2e9,top:"50%",left:"50%",shadow:!1,hwaccel:!1,position:"absolute"},className:"spinner"}):I.status?I.newPassword?Object(h.jsxs)("form",{onSubmit:D,children:[Object(h.jsx)("input",{className:"inputPassword1",value:j,name:"password1",placeholder:"enter new password here...",type:"text",autoComplete:"off",onChange:function(e){b(e.target.value)}}),Object(h.jsx)("input",{className:"inputResetCode",value:m,name:"password2",placeholder:"please repead your new password here...",type:"text",autoComplete:"off",onChange:function(e){O(e.target.value)}}),Object(h.jsx)("button",{className:"goBackButton",onSubmit:D,children:" // submit"}),I.error&&Object(h.jsx)("p",{className:"errorReset",children:I.errorMessage||S})]}):Object(h.jsx)(T,{stateError:S,code:v,handleSubmitCode:function(e){e.preventDefault();6!==v.length?(n(!0),fetch("http://localhost:4002/auth/resetcode",{method:"POST",headers:new Headers({"Content-Type":"application/json"}),body:JSON.stringify({code:v,email:o})}).then((function(e){if(e.ok)return n(!1),R({type:"responseGood"}),e.json();throw new Error("res is not ok")})).then((function(e){e.success&&(n(!1),R({type:"responseGood"}))})).catch((function(e){console.log(e),R({type:"codeNotMatching"})}))):(n(!1),R({type:"invalidCode"}))},handleChangeCode:function(e){w(e.target.value)},state:I}):Object(h.jsxs)("form",{onSubmit:A,children:[Object(h.jsx)("input",{className:"inputResetEmail",value:o,name:"email",placeholder:"enter your email here...",type:"text",autoComplete:"off",onChange:function(e){i(e.target.value)}}),Object(h.jsx)("button",{className:"goBackButton",onSubmit:A,children:"submit"}),I.error&&Object(h.jsx)("p",{className:"errorReset",children:I.errorMessage||S})]})})},R=(s(74),function(e){var t=e.user,s="Welcome ".concat(t," , you have succefully registred :)");return Object(h.jsx)("div",{className:"Finish",children:Object(h.jsx)("h1",{children:s})})});function M(e,t){switch(t.type){case"login":return{title:"Login"};case"register":return{title:"Register"};case"reset":return{title:"Reset Password"};default:return{title:""}}}var A=function(e){var t=e.setPopup,s=Object(r.useState)(!1),n=Object(d.a)(s,2),c=n[0],a=n[1],o=Object(r.useState)(!1),i=Object(d.a)(o,2),l=i[0],u=i[1],j=Object(r.useState)(!1),b=Object(d.a)(j,2),p=b[0],f=b[1],m=Object(r.useState)(""),O=Object(d.a)(m,2),x=O[0],g=O[1],v=Object(r.useReducer)(M,{title:""}),w=Object(d.a)(v,2),N=w[0],S=w[1],k=Object(r.useState)("Register"),C=Object(d.a)(k,2);return C[0],C[1],Object(h.jsx)("div",{className:"Popup",children:Object(h.jsxs)("div",{className:"real",children:[Object(h.jsx)("h2",{className:"formTitle",children:N.title}),Object(h.jsx)("h2",{className:"btnX",onClick:function(){t(!1)},children:"X"}),p?Object(h.jsx)(R,{user:x}):l?Object(h.jsx)(h.Fragment,{children:Object(h.jsx)(I,{})}):c?Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)(y,{dispatch:S,setRedirectToFinish:f,setUser:g}),Object(h.jsxs)("div",{className:"liksAuthSwitch",children:[Object(h.jsx)("p",{className:"link",onClick:function(){return S({type:"register"}),a(!c)},children:"Dont have account , click here to register"}),Object(h.jsx)("p",{className:"linkToResetPassword",onClick:function(){return S({type:"reset"}),u(!0)},children:"forget your password?"})]})]}):Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)(P,{dispatchPopup:S,setRedirectToFinish:f,setUser:g}),Object(h.jsx)("div",{className:"liksAuthSwitch",children:Object(h.jsx)("p",{className:"link",onClick:function(){return S({type:"login"}),a(!c)},children:"Alredy have account, click here to login"})})]})]})})};var D=function(e){var t=e.dataFromDashboard,s=e.setPopup,n=e.popup,c=Object(r.useState)(),a=Object(d.a)(c,2),o=a[0],l=a[1],j=Object(r.useState)(!1),p=Object(d.a)(j,2),f=p[0],m=p[1];return Object(r.useEffect)((function(){try{Object(u.a)(i.a.mark((function e(){var t,s;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("http://localhost:4002/posts/all");case 2:return t=e.sent,e.next=5,t.json();case 5:s=e.sent,l(s),m(!1);case 8:case"end":return e.stop()}}),e)})))()}catch(e){console.log(e),m(!0)}}),[]),Object(h.jsxs)(h.Fragment,{children:[n&&Object(h.jsx)(A,{setPopup:s}),f?Object(h.jsx)(b.a,{to:"/posts/404"}):Object(h.jsxs)("div",{className:"MainPosts",children:[o&&o.map((function(e,t){var r="id?_id="+e._id;return Object(h.jsx)(v,{data:e,parsedName:r,setPopup:s},t)})),0!==t.length&&t.map((function(e,t){var r="id?_id="+e._id;return Object(h.jsx)(v,{data:e,parsedName:r,setPopup:s},t)}))]})]})};s(75);var B=function(e){var t=e.sendDataToIndexThenToMain,s=Object(r.useState)([]),n=Object(d.a)(s,2),c=(n[0],n[1],Object(r.useState)([])),a=Object(d.a)(c,2),o=a[0],i=(a[1],Object(r.useRef)(""));return Object(r.useEffect)((function(){if(console.log("useEffect is called"),i.current=o.map((function(e,t,s){return s.length==t+1?"tag=".concat(e):"tag=".concat(e,"&")})).join(""),console.log("filters in effect",o,i.current),!i.current||0===o.length)return console.error("bad filters","returning"),function(){return console.log("returning , last else")};fetch("http://localhost:4002/posts/filter?".concat(i.current),{method:"GET"}).then((function(e){if(e.ok||200==e.status)return e.json();throw new Error("fetch failed")})).then((function(e){return t(e)})).catch((function(e){return console.error(e)}))}),[JSON.stringify(o)]),Object(h.jsx)(h.Fragment,{})},U=function(){return Object(h.jsx)("div",{className:"Profile",style:{minHeight:"90vh"},children:Object(h.jsx)("h1",{children:" Hello from profile "})})},G=(s(76),s(77),function(){var e=Object(r.useState)(""),t=Object(d.a)(e,2),s=t[0],n=t[1],c=function(e){e.preventDefault(),console.log("submit")};return Object(h.jsx)("div",{className:"AddComment",children:Object(h.jsxs)("form",{onSubmit:c,children:[Object(h.jsx)("textarea",{className:"textArea",placeholder:"enter your comment here...",value:s,onChange:function(e){n(e.target.value)}}),Object(h.jsx)("button",{className:"addCommentBtn",type:"submit",onClick:c,children:"add comment"})]})})}),H=function(e){var t=e.element;return Object(h.jsx)("div",{className:"singleComment",children:Object(h.jsx)("h1",{children:t.text})})},J=(s(78),function(){return Object(h.jsxs)("div",{className:"Empty",children:[Object(h.jsx)("i",{className:"far fa-folder-open"}),Object(h.jsx)("p",{className:"info",children:"There is no comments now , be first one to post here..."})]})}),L=function(e){var t=e.data,s=e.setPopup;console.log();var n=Object(r.useState)([]),c=Object(d.a)(n,2),a=c[0],o=c[1],i=Object(r.useState)(!1),l=Object(d.a)(i,2),u=(l[0],l[1],Object(r.useState)(!1)),j=Object(d.a)(u,2),b=j[0],p=j[1];Object(r.useEffect)((function(){console.log("from use effect"),console.log("from use effect , data :::",t),fetch("http://localhost:4002/getcomments",{method:"GET",headers:new Headers({"Content-Type":"application/json"}),body:JSON.stringify({postId:t._id})}).then((function(e){if(e.ok)return console.log("res is good"),e.json();throw console.log("response is bad"),new Error("response is bad")})).then((function(e){if(!e.success)throw console.log("no comments for this post"),new Error("no comments for this post");console.log("setting comments"),console.log("setting comments",e.comments),console.log(e),o(e.comments)})).catch((function(e){o([])}))}),[]);return Object(h.jsxs)("div",{className:"OneFullPost",children:[Object(h.jsxs)("div",{className:"OneFullPostAuthor",children:[Object(h.jsxs)("div",{className:"wraperOneFullPost",children:[Object(h.jsxs)("h1",{children:[t[0].name,t[0].edited&&Object(h.jsx)("span",{className:"edited",children:"( edited )"})]}),Object(h.jsx)("div",{className:"likes",children:Object(h.jsx)(g,{data:t[0],setPopup:s})})]}),Object(h.jsxs)("div",{className:"authorInfo",children:[Object(h.jsx)("p",{children:t[0].authorName}),Object(h.jsx)("p",{children:t[0].date.slice(0,10)})]}),Object(h.jsx)("h2",{children:t[0].text}),Object(h.jsxs)("div",{className:"commentInfo",children:[Object(h.jsxs)("div",{className:"numberOfComments",children:[Object(h.jsx)("p",{children:" comments "}),Object(h.jsx)("i",{className:"fas fa-share"}),Object(h.jsx)("span",{children:t[0].comments.length})]}),Object(h.jsx)("button",{className:"addCommentBtn",onClick:function(){p(!b)},children:b?"cancel comment":"leave a comment"})]}),b&&Object(h.jsx)(G,{})]}),Object(h.jsx)("div",{className:"allComments",children:0!==a.length?a.map((function(e,t){return Object(h.jsx)(H,{element:e},t)})):Object(h.jsx)(J,{})})]})},_=(s(79),function(e){var t=e.setPopup,s=Object(r.useState)(null),n=Object(d.a)(s,2),c=n[0],a=n[1],o=Object(b.h)(),i=Object(b.i)().variable;return Object(r.useEffect)((function(){switch(i){case"id":if("?_id"===o.search.split("=")[0]){var e="http://localhost:4002"+o.pathname+o.search;fetch(e,{method:"GET"}).then((function(e){if(e.ok)return e.json();throw new Error("bad response ".concat(e.status))})).then((function(e){a(Object(h.jsx)(L,{data:e,setPopup:t}))})).catch((function(e){a(Object(h.jsx)(b.a,{to:"/posts/404"}))}))}else a(Object(h.jsx)(b.a,{to:"/posts/404"}));break;case"search":case"filter":break;default:a(Object(h.jsx)(b.a,{to:"/posts/404"}))}}),[i]),c||Object(h.jsx)("div",{className:"RenderRouter"})}),z=(s(80),function(){return Object(h.jsxs)("div",{className:"FooterContact",children:[Object(h.jsxs)("ul",{className:"icons",children:[Object(h.jsxs)("li",{children:[Object(h.jsx)("a",{href:"https://github.com/Shomy032",target:"_blank",children:Object(h.jsx)("i",{className:"fab fa-github"})}),"  "]}),Object(h.jsxs)("li",{children:[" ",Object(h.jsxs)("a",{href:"https://twitter.com/Milos02880958",target:"_blank",children:[" ",Object(h.jsx)("i",{className:"fab fa-twitter"})," "]})," "]}),Object(h.jsxs)("li",{children:[" ",Object(h.jsxs)("a",{href:"mailto:milosmilic032@gmail.com",target:"_blank",children:[" ",Object(h.jsx)("i",{className:"fas fa-envelope"})," "]})," "]})]}),Object(h.jsxs)("ul",{className:"links",children:[Object(h.jsx)("li",{children:Object(h.jsx)("a",{children:"Contact"})}),Object(h.jsx)("li",{children:Object(h.jsx)("a",{children:"About"})}),Object(h.jsx)("li",{children:Object(h.jsx)("a",{children:"Source Code"})})]}),Object(h.jsx)("p",{className:"copyRight",children:" \xa9 2020 Milo\u0161 Mili\u0107"})]})});var q=function(){var e=Object(r.useState)([]),t=Object(d.a)(e,2),s=t[0],n=t[1],c=Object(r.useState)(!1),a=Object(d.a)(c,2),o=a[0],i=a[1],l=Object(r.useState)(!1),u=Object(d.a)(l,2),j=u[0],p=u[1],f=Object(r.useMemo)((function(){return{loger:j,setLoger:p}}),[j,p]);return Object(r.useEffect)((function(){fetch("http://localhost:4002/auth/isThereUser",{method:"POST",credentials:"same-origin"}).then((function(e){return e.json()})).then((function(e){if(console.log("dddaaatttaaa",e),!e.success)throw new Error("no user");p(!0)})).catch((function(){p(!1)}))}),[]),Object(h.jsx)("div",{className:"App",children:Object(h.jsxs)(m.Provider,{value:f,children:[Object(h.jsx)(O,{sendDataToIndexThenToMain:n,setPopup:i,popup:o}),Object(h.jsx)(B,{sendDataToIndexThenToMain:n}),o&&Object(h.jsx)(A,{setPopup:i}),Object(h.jsxs)(b.d,{children:[Object(h.jsx)(b.b,{exact:!0,path:"/",children:Object(h.jsx)(D,{dataFromDashboard:s,setPopup:i,popup:o})}),Object(h.jsx)(b.b,{exact:!0,path:"/profile",children:Object(h.jsx)(U,{})}),Object(h.jsx)(b.b,{exact:!0,path:"/posts",children:Object(h.jsx)(D,{dataFromDashboard:s,setPopup:i,popup:o})})," ",Object(h.jsx)(b.b,{exact:!0,path:"/posts/all",children:Object(h.jsx)(D,{dataFromDashboard:s})}),Object(h.jsx)(b.b,{path:"/posts/:variable",children:Object(h.jsx)(_,{setPopup:i})}),Object(h.jsx)(b.b,{exact:!0,path:"/posts/404",children:Object(h.jsx)("h1",{children:"404 item not found"})}),Object(h.jsx)(b.b,{path:"/",children:Object(h.jsx)("h1",{children:"404 that route dont exist"})}),Object(h.jsx)(b.b,{exact:!0,path:"/posts/404",children:Object(h.jsx)("h1",{children:"404 that route dont exist"})})]}),Object(h.jsx)(z,{})]})})};s(81);a.a.render(Object(h.jsx)(n.a.StrictMode,{children:Object(h.jsxs)(j.a,{children:[" ",Object(h.jsx)(q,{})]})}),document.getElementById("root"))}},[[82,1,2]]]);
//# sourceMappingURL=main.b769f532.chunk.js.map